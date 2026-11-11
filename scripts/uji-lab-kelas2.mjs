// Uji misi hibrida Matematika Kelas 2 (mulai Bab 1).
// Jalankan: node --no-warnings scripts/uji-lab-kelas2.mjs
import * as M0 from "../src/components/modul/misi-simulasi.ts";
import * as K2B1 from "../src/components/modul/misi-k2bab1.ts";
import * as L from "../src/components/modul/lab-bilangan-k2b1.ts";
import * as K2B2 from "../src/components/modul/misi-k2bab2.ts";
import * as LC from "../src/components/modul/lab-cara-k2b2.ts";
import * as LK from "../src/components/modul/lab-cerita-k2b2.ts";

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

console.log(gagal === 0 ? `SEMUA LULUS (${lulus} cek)` : `GAGAL ${gagal} dari ${lulus + gagal}`);
process.exit(gagal === 0 ? 0 : 1);
