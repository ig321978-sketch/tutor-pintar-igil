// Uji misi hibrida Matematika Kelas 2 (mulai Bab 1).
// Jalankan: node --no-warnings scripts/uji-lab-kelas2.mjs
import * as M0 from "../src/components/modul/misi-simulasi.ts";
import * as K2B1 from "../src/components/modul/misi-k2bab1.ts";
import * as L from "../src/components/modul/lab-bilangan-k2b1.ts";
import * as K2B2 from "../src/components/modul/misi-k2bab2.ts";
import * as LC from "../src/components/modul/lab-cara-k2b2.ts";
import * as LK from "../src/components/modul/lab-cerita-k2b2.ts";
import * as K2B3 from "../src/components/modul/misi-k2bab3.ts";
import * as LB from "../src/components/modul/lab-bentuk-k2b3.ts";
import * as LU from "../src/components/modul/lab-urai-k2b3.ts";
import * as LP from "../src/components/modul/lab-pola-k2b3.ts";
import * as LR from "../src/components/modul/lab-ruang-k2b3.ts";
import * as LT from "../src/components/modul/lab-cetak-k2b3.ts";
import * as K2B4 from "../src/components/modul/misi-k2bab4.ts";
import * as LPo from "../src/components/modul/lab-posisi-k2b4.ts";
import * as LPe from "../src/components/modul/lab-petunjuk-k2b4.ts";
import * as LPb from "../src/components/modul/lab-pabrik-k2b4.ts";

let gagal = 0;
let lulus = 0;
const cek = (kondisi, pesan) => {
  if (kondisi) lulus += 1;
  else {
    gagal += 1;
    console.log("GAGAL:", pesan);
  }
};
const sama = (a, b, pesan) => cek(JSON.stringify(a) === JSON.stringify(b), `${pesan}: ${JSON.stringify(a)} != ${JSON.stringify(b)}`);

function ujiStruktur(nama, daftarFn, subs, awalSub) {
  for (const sub of subs) {
    const daftar = daftarFn(sub);
    const awal = awalSub[sub];
    cek(M0.misiBaru(daftar, awal, new Set()).length === 0, `${nama} ${sub}: keadaan awal tidak memenuhi misi`);
    cek(daftar.filter((m) => m.wajib).length >= 3 && daftar.some((m) => !m.wajib), `${nama} ${sub}: ada misi wajib dan tantangan bebas`);
    cek(new Set(daftar.map((m) => m.id)).size === daftar.length, `${nama} ${sub}: id unik`);
    cek(daftar.every((m) => m.teks.length > 10 && m.teks.length < 120), `${nama} ${sub}: teks misi ringkas`);
  }
}

/* --------------------------- Kelas 2 Bab 1: lab + misi --------------------------- */
sama(L.AWAL_N, 12, "awal n netral");
sama(L.AWAL_M, 18, "awal m netral");
cek(L.AWAL_N !== 26 && L.AWAL_N !== 40 && L.AWAL_N !== 50 && L.AWAL_N !== 30 && L.AWAL_N !== 11 && L.AWAL_N !== 35, "awal bukan target misi A/B");

{
  const kosong = new Set();
  const Lab = (o) => ({
    alat: "lab50",
    n: L.AWAL_N,
    m: L.AWAL_M,
    batang: true,
    tabel: false,
    kalimat: true,
    garis: true,
    banding: false,
    ...o,
  });
  const awalSub = {
    A: Lab({}),
    B: Lab({ tabel: true }),
    C: Lab({ tabel: true, banding: false }),
  };
  ujiStruktur("k2bab1", K2B1.daftarMisiK2Bab1, ["A", "B", "C"], awalSub);

  for (const sub of ["A", "B", "C"]) {
    const daftar = K2B1.daftarMisiK2Bab1(sub);
    cek(M0.misiBaru(daftar, awalSub[sub], kosong).length === 0, `k2bab1 ${sub}: ulang cek awal`);
  }

  const ada = (sub, k, id) => M0.misiBaru(K2B1.daftarMisiK2Bab1(sub), k, kosong).includes(id);
  const SEL = (id) => ({ alat: "selesai", id });

  // Sub-Bab A
  cek(ada("A", Lab({ n: 26 }), "a-26") && !ada("A", Lab({ n: 26, batang: false }), "a-26"), "k2bab1 A: 26 butuh batang");
  cek(ada("A", Lab({ n: 40 }), "a-40") && ada("A", Lab({ n: 50 }), "a-50"), "k2bab1 A: 40 dan 50");
  cek(ada("A", Lab({ n: 30 }), "a-garis") && !ada("A", Lab({ n: 30, garis: false }), "a-garis"), "k2bab1 A: garis 30");
  cek(ada("A", Lab({ n: 35 }), "a-kalimat") && !ada("A", Lab({ n: 35, kalimat: false }), "a-kalimat"), "k2bab1 A: kalimat");
  cek(ada("A", Lab({ n: 21 }), "a-21") && !ada("A", Lab({}), "a-21"), "k2bab1 A: 21 bebas");
  cek(!ada("A", Lab({}), "a-26") && !ada("A", Lab({}), "a-40") && !ada("A", Lab({}), "a-50"), "k2bab1 A: awal tidak memenuhi wajib");

  // Sub-Bab B
  const B = (o) => Lab({ tabel: true, ...o });
  cek(ada("B", B({ n: 26 }), "b-tabel-26") && !ada("B", Lab({ n: 26, tabel: false }), "b-tabel-26"), "k2bab1 B: tabel 26");
  cek(ada("B", B({ n: 11 }), "b-tabel-11") && ada("B", B({ n: 50 }), "b-tabel-50"), "k2bab1 B: 11 dan 50");
  cek(ada("B", SEL("tukar"), "b-tukar") && !ada("B", SEL("stoples"), "b-tukar"), "k2bab1 B: mesin tukar");
  cek(ada("B", B({ n: 34 }), "b-34") && ada("B", Lab({ n: 26, batang: true }), "b-ingat"), "k2bab1 B: bebas");
  cek(!ada("B", B({}), "b-tabel-26") && !ada("B", B({}), "b-tabel-11"), "k2bab1 B: awal tidak memenuhi tabel");

  // Sub-Bab C
  const C = (o) => Lab({ tabel: true, banding: true, ...o });
  cek(ada("C", C({ n: 32, m: 26 }), "c-puluhan") && ada("C", C({ n: 26, m: 32 }), "c-puluhan"), "k2bab1 C: puluhan");
  cek(!ada("C", Lab({ n: 32, m: 26, banding: false }), "c-puluhan"), "k2bab1 C: banding harus menyala");
  cek(ada("C", C({ n: 28, m: 25 }), "c-satuan") && ada("C", C({ n: 26, m: 26 }), "c-sama"), "k2bab1 C: satuan dan sama");
  cek(ada("C", SEL("stoples"), "c-stoples") && ada("C", SEL("tukar"), "c-ingat-tukar"), "k2bab1 C: stoples dan ingat");
  cek(ada("C", C({ n: 40, m: 10 }), "c-ujung") && !ada("C", C({ n: 25, m: 22 }), "c-ujung"), "k2bab1 C: selisih puluhan");
  cek(!ada("C", Lab({ tabel: true, banding: false }), "c-puluhan") && !ada("C", Lab({ tabel: true, banding: false }), "c-sama"), "k2bab1 C: awal tidak memenuhi banding");
}

/* ---------------- Kelas 2 Bab 2: lab cara hitung, lab cerita, mesin, skenario ---------------- */
{
  const kosong = new Set();
  const Cara = (o) => ({ alat: "cara", op: "tambah", a: LC.AWAL_A, b: LC.AWAL_B, garis: true, pasangan: true, susun: true, selisih: false, periksa: false, pas: false, ...o });
  const Kur = (a, b, o) => Cara({ op: "kurang", a, b, ...o });
  const Cer = (o) => ({ alat: "cerita", ...LK.AWAL_CERITA, batang: true, langkah: true, ...o });
  const SEL = (id) => ({ alat: "selesai", id });

  // Keadaan awal tiap alat: A memakai Lab tambah, B memakai Lab kurang (15 − 7), C memakai Lab cerita dan Lab penuh.
  const awalCara = Cara({});
  const awalKurang = Kur(LC.AWAL_KURANG.a, LC.AWAL_KURANG.b);
  const awalCerita = Cer({});
  const awalSub = { A: awalCara, B: awalKurang, C: awalCerita };
  ujiStruktur("k2bab2", K2B2.daftarMisiK2Bab2, ["A", "B", "C"], awalSub);

  // Tidak ada keadaan awal alat mana pun, di sub-bab mana pun, yang langsung memenuhi misi.
  for (const sub of ["A", "B", "C"]) {
    for (const [nama, awal] of [["lab tambah", awalCara], ["lab kurang", awalKurang], ["lab cerita", awalCerita]]) {
      cek(M0.misiBaru(K2B2.daftarMisiK2Bab2(sub), awal, kosong).length === 0, `k2bab2 ${sub}: awal ${nama} tidak memenuhi misi`);
    }
  }
  sama(LC.AWAL_KURANG, { a: 15, b: 7 }, "awal kurang netral");
  cek(awalKurang.a - awalKurang.b === 8 && LC.rapikan({ a: 15, b: 7 }, "kurang").a === 15, "awal kurang sah");

  const ada = (sub, k, id) => M0.misiBaru(K2B2.daftarMisiK2Bab2(sub), k, kosong).includes(id);

  // Sub-Bab A
  cek(ada("A", Cara({ a: 12, b: 6 }), "a-12-6") && !ada("A", Cara({ a: 12, b: 6, garis: false }), "a-12-6") && !ada("A", Kur(12, 6), "a-12-6"), "k2bab2 A: 12 + 6 butuh garis dan tambah");
  cek(ada("A", Cara({ a: 9, b: 7 }), "a-9-7") && !ada("A", Cara({ a: 9, b: 7, pasangan: false }), "a-9-7"), "k2bab2 A: 9 + 7 butuh pasangan");
  cek(ada("A", Cara({ a: 18, b: 2 }), "a-18-2") && !ada("A", Cara({ a: 18, b: 2, susun: false }), "a-18-2"), "k2bab2 A: 18 + 2 butuh bersusun");
  cek(ada("A", SEL("simpan"), "a-mesin") && !ada("A", SEL("urai"), "a-mesin") && !ada("A", SEL("jambu-burung"), "a-mesin"), "k2bab2 A: hanya Mesin Simpan");
  cek(ada("A", Cara({ a: 14, b: 6 }), "a-20") && !ada("A", Cara({ a: 18, b: 2 }), "a-20") && !ada("A", Kur(20, 0), "a-20") && !ada("A", Cara({ a: 14, b: 5 }), "a-20"), "k2bab2 A: hasil 20 selain 18 + 2");
  cek(ada("A", Cara({ a: 13, b: 7, garis: false, pasangan: false }), "a-susun-saja") && !ada("A", Cara({ a: 13, b: 7, garis: false }), "a-susun-saja") && !ada("A", Cara({ a: 13, b: 7, garis: false, pasangan: false, susun: false }), "a-susun-saja"), "k2bab2 A: bersusun saja");
  cek(!ada("A", Cara({}), "a-12-6") && !ada("A", Cara({}), "a-9-7") && !ada("A", Cara({}), "a-18-2"), "k2bab2 A: awal tidak memenuhi wajib");

  // Sub-Bab B
  cek(ada("B", Kur(18, 12), "b-mundur") && !ada("B", Kur(18, 12, { pas: true }), "b-mundur") && !ada("B", Kur(18, 12, { garis: false }), "b-mundur") && !ada("B", Cara({ a: 18, b: 12 }), "b-mundur"), "k2bab2 B: mundur butuh garis tanpa pas dan kurang");
  cek(ada("B", Kur(16, 9, { selisih: true }), "b-selisih") && !ada("B", Kur(16, 9), "b-selisih") && !ada("B", Kur(16, 9, { selisih: true }), "b-mundur"), "k2bab2 B: selisih harus dinyalakan");
  cek(ada("B", Kur(12, 8), "b-urai") && !ada("B", Kur(12, 8, { susun: false }), "b-urai"), "k2bab2 B: urai butuh bersusun");
  cek(ada("B", Kur(14, 6, { periksa: true }), "b-periksa") && !ada("B", Kur(14, 6), "b-periksa"), "k2bab2 B: periksa harus dinyalakan");
  cek(ada("B", SEL("urai"), "b-mesin") && !ada("B", SEL("simpan"), "b-mesin"), "k2bab2 B: hanya Mesin Urai");
  cek(ada("B", Kur(18, 12, { pas: true }), "b-pas") && !ada("B", Kur(18, 12), "b-pas") && !ada("B", Kur(18, 12, { pas: true, garis: false }), "b-pas"), "k2bab2 B: tambah sampai pas");
  cek(ada("B", Kur(20, 6), "b-20") && ada("B", Cara({ a: 18, b: 2 }), "b-ingat") && !ada("B", Kur(18, 2), "b-ingat"), "k2bab2 B: bebas dan ingat");
  cek(!ada("B", awalKurang, "b-mundur") && !ada("B", awalKurang, "b-urai") && !ada("B", awalKurang, "b-selisih") && !ada("B", awalKurang, "b-periksa"), "k2bab2 B: awal tidak memenuhi wajib");

  // Sub-Bab C
  cek(ada("C", Cer({ jenis: "lebihnya", x: 12, y: 6 }), "c-lebih") && !ada("C", Cer({ jenis: "lebihnya", x: 12, y: 6, batang: false }), "c-lebih") && !ada("C", Cer({ jenis: "kurangnya", x: 12, y: 6 }), "c-lebih"), "k2bab2 C: lebihnya 12,6 dengan batang");
  cek(ada("C", Cer({ jenis: "selisih", x: 12, y: 18 }), "c-selisih") && ada("C", Cer({ jenis: "selisih", x: 18, y: 12 }), "c-selisih") && !ada("C", Cer({ jenis: "selisih", x: 12, y: 18, batang: false }), "c-selisih") && !ada("C", Cer({ jenis: "jumlah", x: 12, y: 18 }), "c-selisih"), "k2bab2 C: selisih 12 dan 18 urutan bebas");
  cek(ada("C", Cer({ jenis: "kurangnya", x: 12, y: 5 }), "c-kurang") && !ada("C", Cer({ jenis: "lebihnya", x: 12, y: 5 }), "c-kurang"), "k2bab2 C: kurangnya 12,5");
  cek(ada("C", Cer({ jenis: "awal", x: 12, y: 4 }), "c-awal") && !ada("C", Cer({ jenis: "awal", x: 12, y: 4, langkah: false }), "c-awal"), "k2bab2 C: awal butuh langkah");
  cek(ada("C", SEL("jambu-burung"), "c-skenario") && !ada("C", SEL("simpan"), "c-skenario"), "k2bab2 C: skenario Jambu dan Burung");
  cek(ada("C", Cer({ jenis: "tiga", x: 5, y: 7, z: 8 }), "c-tiga") && !ada("C", Cer({ jenis: "tiga", x: 5, y: 7, z: 7 }), "c-tiga"), "k2bab2 C: tiga bilangan 5,7,8");
  cek(ada("C", Cer({ jenis: "tiga", x: 4, y: 6, z: 1 }), "c-sepuluh") && !ada("C", Cer({ jenis: "tiga", x: 4, y: 6, z: 0 }), "c-sepuluh") && !ada("C", Cer({ jenis: "tiga", x: 5, y: 6, z: 1 }), "c-sepuluh") && !ada("C", Cer({ jenis: "jumlah", x: 4, y: 6, z: 1 }), "c-sepuluh"), "k2bab2 C: dua bilangan berjumlah 10");
  cek(ada("C", Kur(12, 8), "c-ingat-urai") && !ada("C", Kur(12, 8, { susun: false }), "c-ingat-urai"), "k2bab2 C: ingat urai dari Lab Cara Hitung");
  cek(!ada("C", awalCerita, "c-lebih") && !ada("C", awalCerita, "c-kurang") && !ada("C", awalCerita, "c-awal"), "k2bab2 C: awal tidak memenuhi wajib");

  // Setiap target misi bisa dicapai di dalam batas alatnya (tidak ada misi yang mustahil).
  const sah = (k) =>
    k.alat === "cerita"
      ? JSON.stringify(LK.rapikanCerita({ jenis: k.jenis, x: k.x, y: k.y, z: k.z })) === JSON.stringify({ jenis: k.jenis, x: k.x, y: k.y, z: k.z })
      : k.alat === "cara"
        ? JSON.stringify(LC.rapikan({ a: k.a, b: k.b }, k.op)) === JSON.stringify({ a: k.a, b: k.b })
        : true;
  const target = [
    Cara({ a: 12, b: 6 }), Cara({ a: 9, b: 7 }), Cara({ a: 18, b: 2 }), Cara({ a: 14, b: 6 }), Cara({ a: 13, b: 7 }),
    Kur(18, 12), Kur(16, 9), Kur(12, 8), Kur(14, 6), Kur(20, 6),
    Cer({ jenis: "lebihnya", x: 12, y: 6 }), Cer({ jenis: "selisih", x: 12, y: 18 }), Cer({ jenis: "selisih", x: 18, y: 12 }),
    Cer({ jenis: "kurangnya", x: 12, y: 5 }), Cer({ jenis: "awal", x: 12, y: 4 }), Cer({ jenis: "tiga", x: 5, y: 7, z: 8 }), Cer({ jenis: "tiga", x: 4, y: 6, z: 1 }),
  ];
  cek(target.every(sah), "k2bab2: semua target misi ada di dalam batas alatnya");

  // Alat A tidak punya Selisih dan Periksa, jadi misi Sub-Bab A tidak boleh mensyaratkannya.
  const butuhExtra = K2B2.MISI_A.some((m) => ["selisih", "periksa", "pas"].some((f) => m.cek(Cara({ a: 12, b: 6, [f]: true })) !== m.cek(Cara({ a: 12, b: 6 }))));
  cek(!butuhExtra, "k2bab2 A: misi tidak mensyaratkan perwakilan yang belum ada di Sub-Bab A");
}

/* ---------------- Kelas 2 Bab 3: bentuk datar, mengurai, pola segitiga, bangun ruang ---------------- */
{
  const kosong = new Set();
  const Bt = (o) => ({ alat: "bentuk", tipe: "segi", n: LB.AWAL_SISI, jenis: "lingkaran", putar: 0, skala: 1, cetakan: false, pas: true, sisi: true, ...o });
  const Ur = (o) => ({ alat: "urai", bentuk: "persegi", keping: 1, segitiga: 0, renggang: 0, rapatLagi: false, ...o });
  const Po = (o) => ({ alat: "pola", n: LP.AWAL_N, cara: "pojok", banding: false, tabel: true, ...o });
  const Le = (o) => ({ alat: "lereng", ruang: "bola", posisi: "berdiri", meluncur: false, gerak: LR.lepas("bola", "berdiri").gerak, ...o });
  const Ce = (o) => ({ alat: "cetak", ruang: "kubus", permukaan: LT.awalPermukaan("kubus"), dicetak: false, bentuk: LT.cetak("kubus", LT.awalPermukaan("kubus")).bentuk, ...o });
  const SEL = (id) => ({ alat: "selesai", id });

  // Keadaan awal tiap alat, dipakai di sub-bab mana pun alat itu muncul.
  const awalAlat = [["lab bentuk", Bt({})], ["bengkel urai", Ur({})], ["lab pola", Po({})], ["lereng", Le({})], ["lab cetak", Ce({})]];
  const awalSub = { A: Bt({}), B: Ur({}), C: Le({}) };
  ujiStruktur("k2bab3", K2B3.daftarMisiK2Bab3, ["A", "B", "C"], awalSub);
  for (const sub of ["A", "B", "C"]) {
    for (const [nama, awal] of awalAlat) cek(M0.misiBaru(K2B3.daftarMisiK2Bab3(sub), awal, kosong).length === 0, `k2bab3 ${sub}: awal ${nama} tidak memenuhi misi`);
  }
  sama([LB.AWAL_SISI, LP.AWAL_N], [6, 4], "awal bentuk dan pola netral");

  const ada = (sub, k, id) => M0.misiBaru(K2B3.daftarMisiK2Bab3(sub), k, kosong).includes(id);

  // Keadaan Bt yang sama dengan hasil hitung lab (pas diambil dari lab, bukan ditulis tangan).
  const BtLab = (b, putar, o = {}) => Bt({ tipe: b.tipe, n: b.tipe === "segi" ? b.n : LB.AWAL_SISI, jenis: b.tipe === "lengkung" ? b.jenis : "lingkaran", putar, pas: LB.pasDenganCetakan(b, putar), ...o });

  // Sub-Bab A
  cek(ada("A", Bt({ n: 5 }), "a-lima") && !ada("A", Bt({ n: 5, sisi: false }), "a-lima") && !ada("A", Bt({ n: 4 }), "a-lima") && !ada("A", Bt({ tipe: "lengkung", n: 5 }), "a-lima"), "k2bab3 A: segi lima butuh nomor sisi");
  const lg = { tipe: "lengkung", jenis: "lingkaran" };
  const lj = { tipe: "lengkung", jenis: "lonjong" };
  cek(ada("A", BtLab(lg, 60, { cetakan: true }), "a-lingkaran") && !ada("A", BtLab(lg, 60), "a-lingkaran") && !ada("A", BtLab(lg, 0, { cetakan: true }), "a-lingkaran") && !ada("A", BtLab(lj, 60, { cetakan: true }), "a-lingkaran"), "k2bab3 A: lingkaran diputar dengan cetakan menyala");
  cek(ada("A", BtLab(lj, 30, { cetakan: true }), "a-lonjong") && !ada("A", BtLab(lj, 180, { cetakan: true }), "a-lonjong") && !ada("A", BtLab(lj, 30), "a-lonjong") && !ada("A", BtLab(lg, 30, { cetakan: true }), "a-lonjong"), "k2bab3 A: lonjong 30 tidak pas, 180 pas (tidak dihitung)");
  cek(!ada("A", BtLab({ tipe: "segi", n: 6 }, 30, { cetakan: true }), "a-lonjong") && !ada("A", BtLab({ tipe: "segi", n: 6 }, 30, { cetakan: true }), "a-lingkaran"), "k2bab3 A: segi banyak tidak memenuhi misi lengkung");
  cek(ada("A", SEL("detektif"), "a-mesin") && !ada("A", SEL("toko-mainan"), "a-mesin"), "k2bab3 A: mesin detektif");
  cek(ada("A", Bt({ n: 6, putar: 30, skala: 2 }), "a-ciri-tetap") && !ada("A", Bt({ n: 6, putar: 0, skala: 2 }), "a-ciri-tetap") && !ada("A", Bt({ n: 6, putar: 30, skala: 1 }), "a-ciri-tetap") && !ada("A", Bt({ n: 5, putar: 30, skala: 2 }), "a-ciri-tetap"), "k2bab3 A: ciri tetap saat diputar dan dibesarkan");
  cek(ada("A", Bt({ n: 3 }), "a-segitiga") && !ada("A", Bt({ tipe: "lengkung", n: 3 }), "a-segitiga"), "k2bab3 A: segitiga");
  cek(!ada("A", Bt({}), "a-lima") && !ada("A", Bt({}), "a-lingkaran") && !ada("A", Bt({}), "a-lonjong"), "k2bab3 A: awal tidak memenuhi wajib");

  // Sub-Bab B: nilai keping dan segitiga diambil dari Bengkel Urai yang sebenarnya.
  const dariBengkel = (bentuk, garis, o = {}) => {
    const k = LU.uraikan(bentuk, garis);
    return Ur({ bentuk, keping: k.length, segitiga: k.filter((x) => x.nama === "Segitiga").length, ...o });
  };
  cek(ada("B", dariBengkel("persegi", ["d1"]), "b-diagonal") && !ada("B", dariBengkel("persegi", ["d1", "d2"]), "b-diagonal") && !ada("B", dariBengkel("persegiPanjang", ["d1"]), "b-diagonal"), "k2bab3 B: persegi satu diagonal = dua segitiga");
  cek(ada("B", dariBengkel("persegi", ["tegak"]), "b-tengah") && ada("B", dariBengkel("persegi", ["datar"]), "b-tengah") && !ada("B", dariBengkel("persegi", ["d1"]), "b-tengah") && !ada("B", dariBengkel("persegiPanjang", ["tegak"]), "b-tengah"), "k2bab3 B: persegi satu garis tengah = dua keping bukan segitiga");
  cek(ada("B", dariBengkel("segienam", ["AC", "AD", "AE"]), "b-enam-pojok") && !ada("B", dariBengkel("segienam", ["AD", "BE", "CF"]), "b-enam-pojok"), "k2bab3 B: segi enam dari satu titik = empat segitiga");
  cek(ada("B", dariBengkel("segienam", ["AD", "BE", "CF"]), "b-enam-tengah") && !ada("B", dariBengkel("segienam", ["AC", "AD", "AE"]), "b-enam-tengah"), "k2bab3 B: segi enam lewat tengah = enam segitiga");
  cek(ada("B", dariBengkel("persegi", ["d1", "d2"], { renggang: 0, rapatLagi: true }), "b-rapat") && !ada("B", dariBengkel("persegi", ["d1", "d2"], { renggang: 2, rapatLagi: false }), "b-rapat") && !ada("B", dariBengkel("persegi", [], { rapatLagi: true }), "b-rapat"), "k2bab3 B: renggang lalu rapat butuh keping terurai");
  cek(ada("B", Po({ n: 5, cara: "pojok" }), "b-pola-lima") && !ada("B", Po({ n: 5, cara: "tengah" }), "b-pola-lima") && !ada("B", Po({ n: 4, cara: "pojok" }), "b-pola-lima"), "k2bab3 B: segi lima dari satu pojok");
  cek(ada("B", Po({ n: 7, cara: "tengah" }), "b-pola-tengah") && !ada("B", Po({ n: 7, cara: "pojok" }), "b-pola-tengah"), "k2bab3 B: segi tujuh dari titik tengah");
  cek(ada("B", Po({ n: 8, banding: true }), "b-banding") && !ada("B", Po({ n: 8, banding: false }), "b-banding") && !ada("B", Po({ n: 7, banding: true }), "b-banding"), "k2bab3 B: banding segi delapan");
  cek(ada("B", Bt({ n: 5 }), "b-ingat") && !ada("B", Bt({ n: 5, sisi: false }), "b-ingat"), "k2bab3 B: ingat Sub-Bab A");
  cek(!ada("B", Ur({}), "b-diagonal") && !ada("B", Po({}), "b-pola-lima") && !ada("B", Po({}), "b-pola-tengah"), "k2bab3 B: awal tidak memenuhi wajib");

  // Sub-Bab C: gerak dan cetakan diambil dari lab yang sebenarnya.
  const lepasLab = (ruang, posisi, meluncur = true) => Le({ ruang, posisi, meluncur, gerak: LR.lepas(ruang, posisi).gerak });
  const cetakLab = (ruang, permukaan, dicetak = true) => Ce({ ruang, permukaan, dicetak, bentuk: LT.cetak(ruang, permukaan).bentuk });
  cek(ada("C", lepasLab("bola", "berdiri"), "c-bola") && !ada("C", lepasLab("bola", "berdiri", false), "c-bola") && !ada("C", lepasLab("kubus", "berdiri"), "c-bola"), "k2bab3 C: bola harus dilepas");
  cek(ada("C", lepasLab("tabung", "rebah"), "c-tabung") && !ada("C", lepasLab("tabung", "berdiri"), "c-tabung") && !ada("C", lepasLab("tabung", "rebah", false), "c-tabung"), "k2bab3 C: tabung rebah");
  cek(ada("C", lepasLab("kerucut", "rebah"), "c-kerucut") && !ada("C", lepasLab("kerucut", "berdiri"), "c-kerucut") && !ada("C", lepasLab("tabung", "rebah"), "c-kerucut"), "k2bab3 C: kerucut rebah melingkar");
  cek(ada("C", cetakLab("kubus", "sisi"), "c-cetak-kubus") && !ada("C", cetakLab("kubus", "sisi", false), "c-cetak-kubus") && !ada("C", cetakLab("balok", "besar"), "c-cetak-kubus"), "k2bab3 C: cetak kubus harus ditekan");
  cek(ada("C", SEL("toko-mainan"), "c-skenario") && !ada("C", SEL("detektif"), "c-skenario"), "k2bab3 C: skenario Toko Mainan");
  cek(ada("C", lepasLab("kubus", "berdiri"), "c-kubus-diam") && ada("C", lepasLab("kubus", "rebah"), "c-kubus-diam") && !ada("C", lepasLab("kubus", "berdiri", false), "c-kubus-diam"), "k2bab3 C: kubus diam");
  cek(ada("C", cetakLab("balok", "besar"), "c-balok") && !ada("C", cetakLab("balok", "kecil"), "c-balok") && !ada("C", cetakLab("kubus", "sisi"), "c-balok"), "k2bab3 C: cetak balok");
  cek(ada("C", cetakLab("tabung", "alas"), "c-alas") && ada("C", cetakLab("kerucut", "alas"), "c-alas") && !ada("C", cetakLab("tabung", "selimut"), "c-alas") && !ada("C", cetakLab("bola", "kulit"), "c-alas"), "k2bab3 C: cetak alas lingkaran");
  cek(!ada("C", Le({}), "c-bola") && !ada("C", Le({}), "c-tabung") && !ada("C", Le({}), "c-kerucut") && !ada("C", Ce({}), "c-cetak-kubus"), "k2bab3 C: awal tidak memenuhi wajib");

  // Setiap misi wajib bisa dicapai: semua gerak dan cetakan yang disyaratkan memang dihasilkan lab.
  sama([LR.lepas("bola", "berdiri").gerak, LR.lepas("tabung", "rebah").gerak, LR.lepas("kerucut", "rebah").gerak, LR.lepas("kubus", "berdiri").gerak], ["menggelinding", "menggelinding", "melingkar", "diam"], "k2bab3: gerak lereng sesuai misi");
  sama([LT.cetak("kubus", "sisi").bentuk, LT.cetak("balok", "besar").bentuk, LT.cetak("tabung", "alas").bentuk], ["persegi", "persegiPanjang", "lingkaran"], "k2bab3: cetakan sesuai misi");
  cek(LB.putaranPas(lj).indexOf(30) < 0 && LB.putaranPas(lg).includes(60), "k2bab3: putaran 30 membuat lonjong tidak pas dan 60 membuat lingkaran pas");

  // Alat Sub-Bab A tidak punya Cetakan di Sub-Bab B/C, jadi misi B dan C tidak boleh mensyaratkan Cetakan.
  cek(K2B3.MISI_B.every((m) => m.cek(Bt({ n: 5, cetakan: true })) === m.cek(Bt({ n: 5, cetakan: false }))), "k2bab3 B: misi bentuk tidak mensyaratkan cetakan");
  // Alat yang belum ada di sub-bab itu tidak dilibatkan: misi A hanya memakai lab bentuk dan mesin detektif.
  cek(K2B3.MISI_A.every((m) => !m.cek(Po({ n: 5 })) && !m.cek(Ur({ keping: 2, segitiga: 2 })) && !m.cek(Le({ meluncur: true })) && !m.cek(Ce({ dicetak: true }))), "k2bab3 A: misi hanya memakai alat Sub-Bab A");
  cek(K2B3.MISI_C.every((m) => !m.cek(Bt({ n: 5 })) && !m.cek(Po({ n: 5 })) && !m.cek(Ur({ keping: 2, segitiga: 2 }))), "k2bab3 C: misi hanya memakai alat Sub-Bab C");
}

/* ---------------- Kelas 2 Bab 4: posisi benda (A) dan pola (B) ---------------- */
{
  const kosong = new Set();
  const SEL = (id) => ({ alat: "selesai", id });
  // Keadaan dibangun dari lab yang sebenarnya, bukan ditulis tangan.
  const Po = (o) => ({ alat: "posisi", acuan: LPo.AWAL_ACUAN, benda: LPo.AWAL_BENDA, kata: null, lawan: false, peta: false, anak: false, tabel: false, sudah: [], ...o });
  const Pet = (papan, mode, target, daftar) => ({ alat: "petunjuk", papan, mode, target, petunjuk: daftar.length, sisa: LPe.kandidat(papan, mode, daftar).length });
  const Pab = (atur, o = {}) => {
    const a = LPb.rapikanPabrik(atur);
    const st = LPb.statusPabrik(a.satuan, a.ulang);
    return { alat: "pabrik", jenis: a.jenis, n: a.satuan.length, kodeSatuan: st.kodeSatuan, ulang: a.ulang, terpendek: st.terpendek, pola: st.pola, kode: true, tanda: false, lanjut: false, didengar: false, ...o };
  };

  const awalPosisi = Po({});
  const awalPetunjuk = Pet("kamar", "mana", null, []);
  const awalPabrik = Pab(LPb.awalPabrik());
  sama(awalPetunjuk.sisa, 9, "k2bab4: awal petunjuk 9 benda cocok");

  // Struktur untuk dua sub-bab, dengan keadaan awal tiap alat.
  ujiStruktur("k2bab4", K2B4.daftarMisiK2Bab4, ["A", "B"], { A: awalPosisi, B: awalPabrik });
  for (const sub of ["A", "B"]) {
    for (const [nama, awal] of [["lab posisi", awalPosisi], ["lab petunjuk", awalPetunjuk], ["pabrik pola", awalPabrik]]) {
      cek(M0.misiBaru(K2B4.daftarMisiK2Bab4(sub), awal, kosong).length === 0, `k2bab4 ${sub}: awal ${nama} tidak memenuhi misi`);
    }
  }
  cek(K2B4.daftarMisiK2Bab4("A") === K2B4.MISI_A && K2B4.daftarMisiK2Bab4("B") === K2B4.MISI_B && K2B4.daftarMisiK2Bab4("Z") === K2B4.MISI_A, "k2bab4: daftar per sub-bab");
  const ada = (sub, k, id) => M0.misiBaru(K2B4.daftarMisiK2Bab4(sub), k, kosong).includes(id);

  // Alat awal sah menurut lab.
  sama([awalPabrik.kodeSatuan, awalPabrik.n, awalPabrik.didengar, awalPabrik.lanjut], ["AB", 2, false, false], "k2bab4: awal pabrik netral");

  // ---------------- Sub-Bab A: Lab Posisi ----------------
  cek(ada("A", Po({ kata: "atas", lawan: true }), "a-atas") && !ada("A", Po({ kata: "atas" }), "a-atas") && !ada("A", Po({ kata: "bawah", lawan: true }), "a-atas"), "k2bab4 A: atas butuh Lawan");
  cek(ada("A", Po({ kata: "depan", lawan: true }), "a-depan") && !ada("A", Po({ kata: "depan" }), "a-depan") && !ada("A", Po({ kata: "belakang", lawan: true }), "a-depan"), "k2bab4 A: depan butuh Lawan");
  cek(ada("A", Po({ kata: "kanan", anak: true }), "a-kanan") && !ada("A", Po({ kata: "kanan" }), "a-kanan") && !ada("A", Po({ kata: "kiri", anak: true }), "a-kanan"), "k2bab4 A: kanan butuh Anak");
  cek(ada("A", Po({ kata: "kiri", peta: true }), "a-peta") && !ada("A", Po({ kata: "kiri" }), "a-peta") && !ada("A", Po({ kata: "kanan", peta: true }), "a-peta"), "k2bab4 A: peta kotak, kiri");
  cek(ada("A", Po({ kata: "atas", sudah: LPo.URUT_KATA }), "a-enam") && !ada("A", Po({ kata: "atas", sudah: LPo.URUT_KATA.slice(0, 5) }), "a-enam"), "k2bab4 A: enam kata dicoba");
  cek(!ada("A", Po({ kata: "atas" }), "a-enam") && !ada("A", Po({}), "a-enam"), "k2bab4 A: satu kata bukan enam");
  // Ganti benda dan acuan tidak mengubah misi (misi tentang kata posisi, bukan benda tertentu).
  for (const acuan of LPo.URUT_ACUAN) for (const benda of LPo.URUT_BENDA) cek(ada("A", Po({ acuan, benda, kata: "atas", lawan: true }), "a-atas"), `k2bab4 A: atas lawan dengan ${benda} dan ${acuan}`);
  cek(LPo.URUT_KATA.every((k) => !ada("A", Po({ kata: k }), "a-atas") && !ada("A", Po({ kata: k }), "a-depan") && !ada("A", Po({ kata: k }), "a-kanan") && !ada("A", Po({ kata: k }), "a-peta")), "k2bab4 A: tanpa pengatur tidak ada misi posisi tercapai");

  // ---------------- Sub-Bab A: Lab Petunjuk Ganda ----------------
  const satu = [{ kata: "atas", acuan: "boneka" }];
  const duaJam = [{ kata: "atas", acuan: "boneka" }, { kata: "kiri", acuan: "buku" }];
  cek(ada("A", Pet("kamar", "mana", "jam", satu), "a-satu") && Pet("kamar", "mana", "jam", satu).sisa === 3, "k2bab4 A: satu petunjuk menyisakan banyak benda");
  cek(!ada("A", Pet("kamar", "mana", "jam", duaJam), "a-satu") && !ada("A", Pet("kamar", "mana", null, []), "a-satu") && !ada("A", Pet("kamar", "tepat", "kotak", [{ kata: "atas", acuan: "bola" }]), "a-satu"), "k2bab4 A: a-satu tidak tercapai oleh dua petunjuk, tanpa petunjuk, atau cara Tepat (sisa 1)");
  cek(ada("A", Pet("kamar", "mana", "jam", duaJam), "a-dua") && Pet("kamar", "mana", "jam", duaJam).sisa === 1, "k2bab4 A: dua petunjuk menyisakan satu");
  cek(!ada("A", Pet("kamar", "mana", "jam", satu), "a-dua"), "k2bab4 A: satu petunjuk belum cukup untuk a-dua");
  cek(!ada("A", Pet("kamar", "tepat", "kotak", [{ kata: "atas", acuan: "bola" }, { kata: "kiri", acuan: "pensil" }]), "a-dua"), "k2bab4 A: a-dua butuh cara Di mana saja");
  const tengah4 = [{ kata: "atas", acuan: "bola" }, { kata: "bawah", acuan: "buku" }, { kata: "kanan", acuan: "boneka" }, { kata: "kiri", acuan: "pensil" }];
  cek(ada("A", Pet("kamar", "mana", "kotak", tengah4), "a-dua"), "k2bab4 A: empat petunjuk untuk benda tengah menyisakan satu");
  cek(ada("A", Pet("kamar", "tepat", "kotak", [{ kata: "atas", acuan: "bola" }]), "a-tepat") && !ada("A", Pet("kamar", "mana", "kotak", [{ kata: "atas", acuan: "bola" }]), "a-tepat") && !ada("A", Pet("kamar", "tepat", "kotak", []), "a-tepat"), "k2bab4 A: cara Tepat satu petunjuk cukup");
  const tamanJauh = [{ kata: "atas", acuan: "rumput" }, { kata: "kiri", acuan: "burung" }];
  cek(ada("A", Pet("taman", "mana", "kupu", tamanJauh), "a-taman") && !ada("A", Pet("kamar", "mana", "jam", duaJam), "a-taman") && !ada("A", Pet("taman", "mana", "kupu", [tamanJauh[0]]), "a-taman"), "k2bab4 A: papan taman dengan dua petunjuk");

  // Alat tidak saling mencampuri.
  cek(K2B4.MISI_A.every((m) => !m.cek(awalPabrik) && !m.cek(Pab(LPb.awalPabrik(), { lanjut: true }))), "k2bab4 A: misi A tidak memakai Pabrik Pola");
  cek(K2B4.MISI_B.every((m) => !m.cek(Po({ kata: "atas", lawan: true, anak: true, peta: true })) && !m.cek(Pet("kamar", "mana", "jam", duaJam))), "k2bab4 B: misi B tidak memakai alat Sub-Bab A");

  // ---------------- Skenario dan mesin ----------------
  cek(ada("A", SEL("sawah"), "a-sawah") && !ada("A", SEL("pesta-pola"), "a-sawah") && !ada("A", SEL("mesin-pola"), "a-sawah"), "k2bab4 A: skenario Panen di Sawah Paman");
  cek(ada("B", SEL("pesta-pola"), "b-pesta") && !ada("B", SEL("sawah"), "b-pesta") && !ada("B", SEL("mesin-pola"), "b-pesta"), "k2bab4 B: skenario Pesta Pola");
  cek(ada("B", SEL("mesin-pola"), "b-mesin") && !ada("B", SEL("pesta-pola"), "b-mesin") && !ada("B", SEL("sawah"), "b-mesin"), "k2bab4 B: mesin tiga pemeriksaan");

  // ---------------- Sub-Bab B: Pabrik Pola ----------------
  cek(ada("B", Pab({ jenis: "warna", satuan: ["merah", "merah", "biru"], ulang: 3 }), "b-aab") && ada("B", Pab({ jenis: "bentuk", satuan: ["segitiga", "segitiga", "persegi"], ulang: 5 }), "b-aab"), "k2bab4 B: A A B pada warna dan bentuk");
  cek(!ada("B", Pab({ jenis: "warna", satuan: ["merah", "merah", "biru"], ulang: 2 }), "b-aab") && !ada("B", Pab({ jenis: "warna", satuan: ["merah", "biru", "merah"], ulang: 3 }), "b-aab") && !ada("B", Pab(LPb.awalPabrik()), "b-aab"), "k2bab4 B: A A B butuh ulang tiga kali dan kode yang tepat");
  cek(ada("B", Pab({ jenis: "warna", satuan: ["merah", "merah"], ulang: 3 }), "b-bukan") && ada("B", Pab({ jenis: "bentuk", satuan: ["persegi", "persegi", "persegi"], ulang: 3 }), "b-bukan"), "k2bab4 B: unsur sama saja bukan pola");
  cek(!ada("B", Pab({ jenis: "warna", satuan: ["merah"], ulang: 3 }), "b-bukan") && !ada("B", Pab(LPb.awalPabrik()), "b-bukan") && !ada("B", Pab({ jenis: "warna", satuan: ["merah", "merah", "biru"], ulang: 3 }), "b-bukan"), "k2bab4 B: satu unsur atau pola sungguhan bukan b-bukan");
  cek(ada("B", Pab({ jenis: "warna", satuan: ["merah", "biru", "merah", "biru"], ulang: 2 }), "b-pendek") && ada("B", Pab({ jenis: "gerakan", satuan: ["berdiri", "tanganNaik", "berdiri", "tanganNaik"], ulang: 3 }), "b-pendek"), "k2bab4 B: satuan empat unsur, terpendek dua");
  cek(!ada("B", Pab({ jenis: "warna", satuan: ["merah", "biru", "kuning", "merah"], ulang: 2 }), "b-pendek") && !ada("B", Pab({ jenis: "warna", satuan: ["merah", "merah", "biru", "biru"], ulang: 2 }), "b-pendek") && !ada("B", Pab(LPb.awalPabrik()), "b-pendek"), "k2bab4 B: terpendek dua butuh kode A B A B");
  const suara = { jenis: "suara", satuan: ["keras", "pelan", "diam"], ulang: 3 };
  cek(ada("B", Pab(suara, { didengar: true }), "b-suara") && !ada("B", Pab(suara), "b-suara") && !ada("B", Pab({ jenis: "warna", satuan: ["merah", "biru", "kuning"], ulang: 3 }, { didengar: true }), "b-suara") && !ada("B", Pab({ jenis: "suara", satuan: ["keras", "pelan"], ulang: 3 }, { didengar: true }), "b-suara"), "k2bab4 B: suara harus didengarkan, tiga unsur");
  cek(ada("B", Pab({ jenis: "bentuk", satuan: ["lingkaran", "persegi", "segitiga"], ulang: 3 }), "b-bentuk") && !ada("B", Pab({ jenis: "warna", satuan: ["merah", "biru", "kuning"], ulang: 3 }), "b-bentuk") && !ada("B", Pab({ jenis: "bentuk", satuan: ["lingkaran", "persegi"], ulang: 3 }), "b-bentuk"), "k2bab4 B: tiga bentuk berbeda");
  cek(ada("B", Pab(LPb.awalPabrik(), { lanjut: true }), "b-lanjut") && !ada("B", Pab(LPb.awalPabrik()), "b-lanjut") && !ada("B", Pab({ jenis: "warna", satuan: ["merah", "merah"], ulang: 3 }, { lanjut: true }), "b-lanjut"), "k2bab4 B: lanjutan hanya berarti pada pola");
  cek(ada("B", Pab({ jenis: "gerakan", satuan: ["berdiri", "tanganNaik"], ulang: 3 }), "b-gerak") && !ada("B", Pab(LPb.awalPabrik()), "b-gerak") && !ada("B", Pab({ jenis: "gerakan", satuan: ["berdiri", "berdiri"], ulang: 3 }), "b-gerak"), "k2bab4 B: pola gerakan");

  // Setiap misi wajib Sub-Bab B tercapai dari susunan yang memang bisa dibuat lab (palet dan batas).
  for (const m of K2B4.MISI_B.filter((x) => x.wajib && !x.id.startsWith("b-mesin") && !x.id.startsWith("b-pesta"))) {
    let bisa = false;
    for (const j of LPb.URUT_JENIS) {
      const palet = LPb.PALET[j];
      const bangun = (n, dasar) => (n === 0 ? [dasar] : palet.flatMap((t) => bangun(n - 1, [...dasar, t])));
      for (let n = 1; n <= 4; n += 1)
        for (const satuan of bangun(n, []))
          for (let u = LPb.MIN_ULANG; u <= LPb.maksUlang(n); u += 1) if (m.cek(Pab({ jenis: j, satuan, ulang: u }, { didengar: true }))) bisa = true;
    }
    cek(bisa, `k2bab4 B: misi ${m.id} bisa dicapai di lab`);
  }
  // Setiap misi wajib Sub-Bab A (petunjuk dan posisi) bisa dicapai dari lab sebenarnya.
  {
    let dua = false;
    let satuOk = false;
    for (const papan of LPe.URUT_PAPAN) {
      const semuaQ = [];
      for (const acuan of LPe.semuaNama(papan)) for (const kata of LPe.URUT_ARAH) semuaQ.push({ kata, acuan });
      for (const target of LPe.semuaNama(papan)) {
        const benar = semuaQ.filter((q) => LPe.kandidat(papan, "mana", [q]).includes(target));
        for (const q of benar) if (M0.misiBaru(K2B4.MISI_A, Pet(papan, "mana", target, [q]), kosong).includes("a-satu")) satuOk = true;
        for (const q1 of benar) for (const q2 of benar) if (q1 !== q2 && M0.misiBaru(K2B4.MISI_A, Pet(papan, "mana", target, [q1, q2]), kosong).includes("a-dua")) dua = true;
      }
    }
    cek(satuOk && dua, "k2bab4 A: a-satu dan a-dua bisa dicapai di lab petunjuk");
  }
}

console.log(gagal === 0 ? `SEMUA LULUS (${lulus} cek)` : `GAGAL ${gagal} dari ${lulus + gagal}`);
process.exit(gagal === 0 ? 0 : 1);
