// Uji Simulasi Kelas 4 Bab 4 (Pengukuran Luas dan Volume): pengeja, lab tiap sub-bab, mesin, skenario, misi,
// gerbang, dan konsep tidak bocor antar sub-bab.
// Jalankan: node --no-warnings scripts/uji-lab-k4b4.mjs
import { readFileSync } from "node:fs";
import * as M0 from "../src/components/modul/misi-simulasi.ts";
import * as K4 from "../src/components/modul/misi-k4bab4.ts";
import * as TK from "../src/components/modul/misi-teks-k4b4.ts";
import * as A from "../src/components/modul/lab-luas-k4b4a.ts";
import * as B from "../src/components/modul/lab-volume-k4b4b.ts";
import * as MS from "../src/components/modul/mesin-data-k4b4.ts";
import * as SK from "../src/components/modul/skenario-k4b4.ts";
import * as ME from "../src/components/modul/mesin-bertahap-k3b1.ts";
import * as EJ from "../src/components/modul/eja-k4b4.ts";
import { ejaK3 } from "../src/components/modul/lab-tempat-k3b1.ts";

let lulus = 0;
let gagal = 0;
const cek = (kondisi, pesan) => {
  if (kondisi) lulus += 1;
  else {
    gagal += 1;
    console.log("GAGAL:", pesan);
  }
};
const sama = (a, b, pesan) => cek(JSON.stringify(a) === JSON.stringify(b), `${pesan}: ${JSON.stringify(a)} != ${JSON.stringify(b)}`);
const sel = (id) => ({ alat: "selesai", id });
const acakDari = (seed0) => {
  let s = seed0 >>> 0;
  return (n) => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    return s % n;
  };
};
const jalan = (awal, langkah, aksi) => aksi.reduce((s, a) => langkah(s, a), awal);
const ulang = (n, a) => Array.from({ length: n }, () => a);
const tanpaAngka = (t) => !/\d/.test(EJ.ejaK4B4(t));
const tanpaAngkaK3 = (t) => !/\d/.test(ejaK3(t));
const angka = (t) => Number(String(t).replace(/\./g, ""));

/* ------------------------------ Hitungan MANDIRI ------------------------------ */
// Luas meja dibagi luas ubin (kode memasang ubin satu per satu dan menghitung yang terpasang).
const ubinMandiri = (u) => (A.MEJA_BARIS * A.MEJA_KOLOM) / (u.lebar * u.tinggi);
// Luas persegi panjang: baris × kolom (kode menghitung sel yang diarsir).
const ppMandiri = (b, k) => b * k;
// m² ke cm²: (100 × 100) × n, dari 1 m = 100 cm.
const cm2Mandiri = (m2) => m2 * (100 * 100);
// Banyak takaran = isi wadah dibagi isi takaran (kode menambah satu takaran tiap tuangan).
const takaranMandiri = (k) => k.besar / k.kecil;
// Volume kubus = baris × kolom × lapisan (kode menjumlah lapis demi lapis).
const volMandiri = (b, k, l) => b * k * l;

/* ------------------------------ Pengeja ------------------------------ */
{
  sama(EJ.ejaK4B4("1 m² = 10.000 cm²"), "satu meter persegi sama dengan sepuluh ribu sentimeter persegi", "eja m² dan cm²");
  sama(EJ.ejaK4B4("1 l = 1.000 ml"), "satu liter sama dengan seribu mililiter", "eja liter dan ml");
  sama(EJ.ejaK4B4("24 cm³"), "dua puluh empat sentimeter kubik", "eja cm³");
  sama(EJ.ejaK4B4("1 m³"), "satu meter kubik", "eja m³");
  sama(EJ.ejaK4B4("3 × 4 = 12"), "tiga kali empat sama dengan dua belas", "eja kali");
  sama(EJ.ejaK4B4("sisi 1 cm"), "sisi satu sentimeter", "eja cm");
  sama(EJ.ejaK4B4("60.000"), "enam puluh ribu", "eja enam puluh ribu");
  cek(tanpaAngka("Luas 13 cm², 30.000 cm² = 3 m², 950 ml + 50 ml."), "eja tidak menyisakan angka");
  let ok = true;
  for (let n = 0; n <= 100000; n += 7) if (/\d/.test(EJ.kataBilK4B4(n))) ok = false;
  cek(ok, "kata bilangan sampai seratus ribu tanpa angka");
}

/* ------------------------------ Lab A: Luas ------------------------------ */
{
  const x0 = A.awalLuasK4B4A();
  cek(x0.pernah.length === 0 && x0.pesan === "" && x0.pasang.length === 0 && A.luasArsir(x0.arsir) === 0, "awal Lab A: kosong, tanpa riwayat dan pesan");

  // Tutup: menutup penuh memakai semua posisi kisi ubin; banyak ubin = luas meja : luas ubin (mandiri).
  for (let i = 0; i < A.UBIN.length; i += 1) {
    const u = A.UBIN[i];
    const aksi = [{ t: "T_UBIN", i }];
    for (let r = 0; r < A.MEJA_BARIS; r += u.tinggi) for (let c = 0; c < A.MEJA_KOLOM; c += u.lebar) aksi.push({ t: "T_TARUH", r, c });
    const penuh = jalan(x0, A.langkahLuasK4B4A, [...aksi, { t: "T_CEK" }]);
    cek(penuh.pasang.length === ubinMandiri(u) && penuh.pernah.includes(`tutup:${u.id}`) && penuh.pesan.startsWith("✅"), `Tutup ${u.id}: ${ubinMandiri(u)} ubin menutup meja`);
    cek(penuh.pesan.includes(`${ubinMandiri(u)} ${u.nama}`), `Tutup ${u.id}: pesan menyebut banyak ubin`);
    // Near-miss: satu ubin kurang berarti ada celah.
    const kurang = jalan(x0, A.langkahLuasK4B4A, [...aksi.slice(0, -1), { t: "T_CEK" }]);
    cek(!kurang.pernah.includes(`tutup:${u.id}`) && /celah/.test(kurang.pesan) && kurang.pesan.includes(`${u.lebar * u.tinggi} kotak`), `Tutup ${u.id}: celah ${u.lebar * u.tinggi} kotak ditolak`);
    // Bertumpuk ditolak.
    const tumpuk = jalan(x0, A.langkahLuasK4B4A, [aksi[0], aksi[1], aksi[1]]);
    cek(tumpuk.pasang.length === 1 && tumpuk.pernah.includes("tumpuk") && /Bertumpuk/.test(tumpuk.pesan), `Tutup ${u.id}: ubin bertumpuk ditolak`);
    if (u.lebar > 1) {
      const keluar = A.langkahLuasK4B4A(A.langkahLuasK4B4A(x0, { t: "T_UBIN", i }), { t: "T_TARUH", r: 0, c: A.MEJA_KOLOM - 1 });
      cek(keluar.pasang.length === 0 && /keluar/.test(keluar.pesan), `Tutup ${u.id}: ubin keluar meja ditolak`);
    }
  }
  sama(A.UBIN.map(ubinMandiri), [24, 12, 6], "kartu 24, uang kertas 12, origami 6");
  const dua = jalan(x0, A.langkahLuasK4B4A, [{ t: "T_UBIN", i: 1 }, ...[0, 1, 2, 3].flatMap((r) => [0, 2, 4].map((c) => ({ t: "T_TARUH", r, c }))), { t: "T_CEK" }, { t: "T_UBIN", i: 2 }, ...[0, 2].flatMap((r) => [0, 2, 4].map((c) => ({ t: "T_TARUH", r, c }))), { t: "T_CEK" }]);
  cek(/berbeda dengan uang kertas/.test(dua.pesan) && dua.pernah.includes("tutup:uang") && dua.pernah.includes("tutup:origami"), "Tutup: banyak berbeda dijelaskan saat dua ubin sudah dicoba");
  cek(A.langkahLuasK4B4A(x0, { t: "T_CEK" }).pesan.length > 0 && A.langkahLuasK4B4A(x0, { t: "T_CEK" }).pernah.length === 0, "Tutup: meja kosong tidak memenuhi");
  cek(A.langkahLuasK4B4A(x0, { t: "T_TARUH", r: 9, c: 0 }) === x0 && A.langkahLuasK4B4A(x0, { t: "T_UBIN", i: 7 }) === x0, "Tutup: aksi di luar batas diabaikan");

  // Kisi: semua persegi panjang dalam kisi, luas = baris × kolom (mandiri).
  const pp = (r0, c0, b, k) => {
    const aksi = [];
    for (let r = r0; r < r0 + b; r += 1) for (let c = c0; c < c0 + k; c += 1) aksi.push({ t: "K_SEL", r, c });
    return aksi;
  };
  let okPP = true;
  for (let b = 1; b <= A.KISI_BARIS; b += 1)
    for (let k = 1; k <= A.KISI_KOLOM; k += 1) {
      const x = jalan(x0, A.langkahLuasK4B4A, [...pp(0, 0, b, k), { t: "K_CEK" }]);
      if (!x.pernah.includes(`kisi:${ppMandiri(b, k)}`) || !x.pernah.includes(`pp:${b}x${k}`) || !x.pesan.includes(`${b} × ${k} = ${ppMandiri(b, k)}`)) okPP = false;
    }
  cek(okPP, "Kisi: semua persegi panjang dibaca baris × kolom dengan luas benar");
  // Bangun 13 (buku): baris 4, 4, 3, 2 dari kiri.
  const bangunA = [0, 1, 2, 3].flatMap((r) => Array.from({ length: [4, 4, 3, 2][r] }, (_, c) => ({ t: "K_SEL", r, c })));
  const bangunB = [0, 1, 2, 3].flatMap((r) => Array.from({ length: [2, 3, 4, 4][r] }, (_, c) => ({ t: "K_SEL", r, c })));
  const x13 = jalan(x0, A.langkahLuasK4B4A, [...bangunA, { t: "K_CEK" }]);
  cek(x13.pernah.includes("kisi:13") && !x13.pernah.some((p) => p.startsWith("pp:")) && x13.pesan.includes("13 cm²"), "Kisi: bangun 13 sel = 13 cm², bukan persegi panjang");
  const x13b = jalan(x13, A.langkahLuasK4B4A, [{ t: "K_BERSIH" }, ...bangunB, { t: "K_CEK" }]);
  cek(x13b.pernah.includes("kisi:13:beda") && /luasnya sama/.test(x13b.pesan), "Kisi: dua bangun berbeda bentuk, luas sama");
  const x13c = jalan(x13, A.langkahLuasK4B4A, [{ t: "K_BERSIH" }, ...bangunA.map((a) => ({ ...a, c: a.c + 1 })), { t: "K_CEK" }]);
  cek(!x13c.pernah.includes("kisi:13:beda"), "Kisi: bentuk sama yang digeser bukan bentuk berbeda");
  const pisah = jalan(x0, A.langkahLuasK4B4A, [{ t: "K_SEL", r: 0, c: 0 }, { t: "K_SEL", r: 2, c: 2 }, { t: "K_CEK" }]);
  cek(pisah.pernah.length === 0 && /menyatu/.test(pisah.pesan), "Kisi: sel terpisah ditolak");
  cek(jalan(x0, A.langkahLuasK4B4A, [{ t: "K_SEL", r: 0, c: 0 }, { t: "K_SEL", r: 0, c: 0 }]).arsir[0][0] === false, "Kisi: ketuk dua kali menghapus arsiran");

  // Ubah: kunci dan pengecoh dihitung mandiri.
  for (const arah of ["m2", "cm2"]) {
    for (let n = 1; n <= A.MAKS_UBAH; n += 1) {
      const opsi = A.opsiUbah(arah, n);
      const kunci = arah === "m2" ? cm2Mandiri(n) : cm2Mandiri(n) / 10000;
      cek(opsi.filter((o) => o === kunci).length === 1 && new Set(opsi).size === 3, `Ubah ${arah} ${n}: satu kunci, tiga pilihan unik`);
      const xs = { ...x0, arah, n };
      for (const o of opsi) {
        const h = A.langkahLuasK4B4A(xs, { t: "U_JAWAB", nilai: o });
        const id = `ubah:${arah}:${n}`;
        if (o === kunci) cek(h.pernah.includes(id) && h.pesan.startsWith("✅"), `Ubah ${arah} ${n}: ${o} diterima`);
        else cek(!h.pernah.includes(id) && !h.pesan.startsWith("✅"), `Ubah ${arah} ${n}: pengecoh ${o} ditolak`);
      }
      cek(A.langkahLuasK4B4A(xs, { t: "U_JAWAB", nilai: 7 }) === xs, `Ubah ${arah} ${n}: nilai di luar pilihan diabaikan`);
    }
  }
  cek(A.opsiUbah("m2", 1).indexOf(10000) !== A.opsiUbah("m2", 2).indexOf(20000), "Ubah: letak kunci berpindah");
  cek(A.langkahLuasK4B4A(x0, { t: "U_JAWAB", nilai: 100 }).pernah.includes("seratus"), "Ubah: jawaban 100 dijelaskan");

  // Fuzz.
  const acak = acakDari(41);
  let s = x0;
  let ok = true;
  const pesanSemua = new Set();
  for (let i = 0; i < 20000; i += 1) {
    const p = acak(12);
    const a =
      p === 0 ? { t: "T_UBIN", i: acak(4) } :
      p === 1 ? { t: "T_TARUH", r: acak(5), c: acak(7) } :
      p === 2 ? { t: "T_HAPUS" } :
      p === 3 ? { t: "T_CEK" } :
      p <= 5 ? { t: "K_SEL", r: acak(6), c: acak(7) } :
      p === 6 ? { t: "K_CEK" } :
      p === 7 ? { t: "U_ARAH", arah: acak(2) ? "m2" : "cm2" } :
      p === 8 ? { t: "U_N", d: acak(2) ? 1 : -1 } :
      p === 9 ? { t: "U_JAWAB", nilai: A.opsiUbah(s.arah, s.n)[acak(3)] } :
      p === 10 ? (acak(10) === 0 ? { t: "K_BERSIH" } : { t: "PESAN_KOSONG" }) : { t: "T_TARUH", r: acak(4), c: acak(6) };
    const t = A.langkahLuasK4B4A(s, a);
    if (!s.pernah.every((x) => t.pernah.includes(x))) ok = false;
    const peta = A.petaMeja(A.UBIN[t.ubin], t.pasang);
    const tertutup = peta.flat().filter((v) => v > 0).length;
    if (tertutup !== t.pasang.length * A.UBIN[t.ubin].lebar * A.UBIN[t.ubin].tinggi) ok = false;
    if (t.n < 1 || t.n > A.MAKS_UBAH) ok = false;
    for (const id of t.pernah) {
      const m = /^tutup:(\w+)$/.exec(id);
      if (m && !A.UBIN.some((u) => u.id === m[1])) ok = false;
    }
    if (t.pesan) pesanSemua.add(t.pesan);
    s = t;
  }
  cek(ok, "fuzz 20.000 aksi Lab Luas: tidak bertumpuk, batas terjaga, riwayat tidak dicabut");
  cek([...pesanSemua].every(tanpaAngka), "fuzz Lab Luas: semua pesan dieja menjadi kata");
  globalThis.__pesanA = [...pesanSemua];
}

/* ------------------------------ Lab B: Volume ------------------------------ */
{
  const x0 = B.awalVolumeK4B4B();
  cek(x0.pernah.length === 0 && x0.pesan === "" && x0.tuang === 0 && x0.air === 0 && !x0.celup, "awal Lab B: kosong, tanpa riwayat dan pesan");
  // Tuang: banyak takaran = besar : kecil (mandiri), lalu tumpah.
  for (let i = 0; i < B.TUANG_B.length; i += 1) {
    const k = B.TUANG_B[i];
    const n = takaranMandiri(k);
    cek(Number.isInteger(n), `Tuang ${k.id}: takaran habis membagi wadah`);
    const kurang = jalan(x0, B.langkahVolumeK4B4B, [{ t: "V_KASUS", i }, ...ulang(n - 1, { t: "V_TUANG" })]);
    cek(!kurang.pernah.includes(`penuh:${k.id}`), `Tuang ${k.id}: ${n - 1} takaran belum penuh`);
    const penuh = B.langkahVolumeK4B4B(kurang, { t: "V_TUANG" });
    cek(penuh.tuang === n && penuh.pernah.includes(`penuh:${k.id}`) && penuh.pesan.includes(`${n} ${k.takar}`), `Tuang ${k.id}: penuh dengan ${n} ${k.takar}`);
    const lebih = B.langkahVolumeK4B4B(penuh, { t: "V_TUANG" });
    cek(lebih.tuang === n && lebih.pernah.includes("tumpah") && /Tumpah/.test(lebih.pesan), `Tuang ${k.id}: tuangan berikutnya tumpah`);
  }
  sama(B.TUANG_B.map(takaranMandiri), [4, 10, 8], "botol A = 4B = 10C; sanitizer 8 (buku)");
  cek(B.TUANG_B[0].besar === B.TUANG_B[1].besar, "Tuang: botol A sama untuk B dan C");

  // Kubus: semua alas dan lapisan; kunci = b × k × l (mandiri).
  let okK = true;
  for (let b = 1; b <= B.MAKS_ALAS; b += 1)
    for (let k = 1; k <= B.MAKS_ALAS; k += 1)
      for (let l = 1; l <= B.MAKS_LAPIS; l += 1) {
        const x = B.langkahVolumeK4B4B({ ...x0, baris: b, kolom: k, lapisan: l }, { t: "Q_CEK" });
        const v = volMandiri(b, k, l);
        if (B.hitungKubus(b, k, l) !== v || !x.pernah.includes(`vol:${v}:lapis:${l}`) || !x.pesan.includes(`${v} cm³`)) okK = false;
      }
  cek(okK, "Kubus: semua susunan dihitung benar");
  const v24 = B.langkahVolumeK4B4B({ ...x0, baris: 3, kolom: 4, lapisan: 2 }, { t: "Q_CEK" });
  cek(v24.pesan.includes("12 + 12 = 24") && v24.pesan.includes("24 cm³"), "Kubus: 3 × 4, 2 lapisan = 24 cm³ (buku)");
  cek(jalan(x0, B.langkahVolumeK4B4B, ulang(6, { t: "Q_LAPIS", d: 1 })).lapisan === B.MAKS_LAPIS, "Kubus: lapisan paling banyak 3");
  cek(B.langkahVolumeK4B4B(x0, { t: "Q_BARIS", d: -1 }).baris === 1, "Kubus: baris paling sedikit 1");

  // Takar: tepat 1.000 ml dengan beberapa cara; tumpah ditolak; celup = volume balok.
  const isi = (takar, n) => [{ t: "R_TAKAR", i: takar }, ...ulang(n, { t: "R_TUANG" })];
  const sepuluh = jalan(x0, B.langkahVolumeK4B4B, isi(1, 10));
  cek(sepuluh.air === 1000 && sepuluh.pernah.includes("liter") && sepuluh.pesan.includes("1 l"), "Takar: 10 gelas kecil = 1.000 ml = 1 l");
  const campur = jalan(x0, B.langkahVolumeK4B4B, [...isi(2, 4), ...isi(0, 8)]);
  cek(campur.air === 4 * 240 + 8 * 5 && campur.air === 1000 && campur.pernah.includes("liter"), "Takar: 4 cangkir + 8 sendok = 1.000 ml");
  const sembilan = jalan(x0, B.langkahVolumeK4B4B, isi(1, 9));
  cek(!sembilan.pernah.includes("liter"), "Takar: 900 ml belum 1 l");
  const tumpah = jalan(x0, B.langkahVolumeK4B4B, isi(2, 5));
  cek(tumpah.air === 960 && tumpah.pernah.includes("tumpah"), "Takar: cangkir kelima tumpah");
  const vb = volMandiri(B.BALOK.baris, B.BALOK.kolom, B.BALOK.lapisan);
  const celup = jalan(x0, B.langkahVolumeK4B4B, [...isi(1, 3), { t: "R_CELUP" }]);
  cek(celup.celup && celup.pernah.includes("celup") && celup.pesan.includes(`naik ${vb} ml`) && celup.pesan.includes(`${vb} cm³`), `Takar: balok ${vb} cm³ menaikkan air ${vb} ml`);
  cek(!jalan(x0, B.langkahVolumeK4B4B, [{ t: "R_CELUP" }]).celup, "Takar: celup ke gelas kosong ditolak");
  const celupPenuh = jalan(x0, B.langkahVolumeK4B4B, [...isi(1, 10), { t: "R_CELUP" }]);
  cek(!celupPenuh.celup && celupPenuh.pernah.includes("tumpah"), "Takar: celup ke gelas penuh tumpah");
  const celupDulu = jalan(x0, B.langkahVolumeK4B4B, [...isi(1, 5), { t: "R_CELUP" }, ...isi(1, 5)]);
  cek(!celupDulu.pernah.includes("liter") && celupDulu.air === 900, "Takar: air bersama balok tidak dihitung sebagai 1 l air");

  // Fuzz.
  const acak = acakDari(43);
  let s = x0;
  let ok = true;
  const pesanSemua = new Set();
  for (let i = 0; i < 20000; i += 1) {
    const p = acak(12);
    const a =
      p === 0 ? { t: "V_KASUS", i: acak(4) } :
      p <= 2 ? { t: "V_TUANG" } :
      p === 3 ? { t: "V_KOSONG" } :
      p === 4 ? { t: ["Q_BARIS", "Q_KOLOM", "Q_LAPIS"][acak(3)], d: acak(2) ? 1 : -1 } :
      p === 5 ? { t: "Q_CEK" } :
      p === 6 ? { t: "R_TAKAR", i: acak(4) } :
      p <= 8 ? { t: "R_TUANG" } :
      p === 9 ? { t: "R_CELUP" } :
      p === 10 ? (acak(5) === 0 ? { t: "R_BUANG" } : { t: "PESAN_KOSONG" }) : { t: "V_TUANG" };
    const t = B.langkahVolumeK4B4B(s, a);
    if (!s.pernah.every((x) => t.pernah.includes(x))) ok = false;
    const k = B.TUANG_B[t.kasus];
    if (B.isiTuang(k, t.tuang) > k.besar || B.isiTuang(k, t.tuang) !== t.tuang * k.kecil) ok = false;
    if (t.air < 0 || t.air + (t.celup ? B.volBalok() : 0) > B.GELAS_ML) ok = false;
    if (t.celup && t.air === 0) ok = false;
    if ([t.baris, t.kolom].some((v) => v < 1 || v > B.MAKS_ALAS) || t.lapisan < 1 || t.lapisan > B.MAKS_LAPIS) ok = false;
    if (t.pesan) pesanSemua.add(t.pesan);
    s = t;
  }
  cek(ok, "fuzz 20.000 aksi Lab Volume: tidak meluap, batas terjaga, riwayat tidak dicabut");
  cek([...pesanSemua].every(tanpaAngka), "fuzz Lab Volume: semua pesan dieja menjadi kata");
}

/* ------------------------------ Mesin ------------------------------ */
{
  const posisi = [];
  for (const def of MS.SEMUA_MESIN_K4B4) {
    cek(def.stasiun.length === 4 && def.kasus.length === 3, `${def.id}: empat stasiun, tiga kasus`);
    const lokal = [];
    for (const kasus of def.kasus) {
      cek(kasus.langkah.length === 4, `${def.id}/${kasus.id}: empat langkah`);
      kasus.langkah.forEach((l, i) => {
        cek(l.stasiun === def.stasiun[i].id, `${kasus.id}: stasiun ${i} berurutan`);
        cek(l.opsi.length === 3 && new Set(l.opsi).size === 3 && l.opsi.filter((o) => o === l.benar).length === 1, `${kasus.id}/${l.stasiun}: tiga pilihan unik dengan satu kunci`);
        cek(l.petunjuk.length > 20 && l.tanya.length > 5, `${kasus.id}/${l.stasiun}: tanya dan petunjuk ada`);
        cek(tanpaAngkaK3(l.tanya) && !/[²³]/.test(l.tanya), `${kasus.id}/${l.stasiun}: tanya dapat dieja mesin`);
        lokal.push(l.opsi.indexOf(l.benar));
      });
      cek(tanpaAngkaK3(kasus.ringkas) && tanpaAngkaK3(kasus.nama) && !/[²³]/.test(kasus.ringkas + kasus.nama), `${def.id}/${kasus.id}: nama dan ringkas dieja menjadi kata`);
    }
    posisi.push(...lokal);
    cek(new Set(lokal).size === 3, `${def.id}: letak kunci bervariasi (${lokal.join("")})`);
    let x = ME.awalMesin(def);
    for (let mi = 0; mi < def.kasus.length; mi += 1) {
      for (let i = 0; i < 4; i += 1) {
        const l = ME.langkahAktif(x);
        const lompat = ME.langkahMesin(x, { t: "LOMPAT", ke: i + 1 });
        cek(lompat.ke === x.ke && lompat.ditolak === x.ditolak + 1, `${def.id}: lompat stasiun ditolak`);
        for (const s of l.opsi.filter((o) => o !== l.benar)) {
          const t = ME.langkahMesin(x, { t: "JAWAB", nilai: s });
          cek(t.ke === x.ke && t.pesan === l.petunjuk, `${def.id}: "${s}" ditolak dengan petunjuk`);
        }
        x = ME.langkahMesin(x, { t: "JAWAB", nilai: l.benar });
      }
      cek(x.fase === "sudah", `${def.id}: kasus ${mi} selesai`);
      x = ME.langkahMesin(x, { t: "LANJUT" });
    }
    cek(x.selesai, `${def.id}: semua kasus selesai`);
  }
  cek(new Set(posisi).size === 3, "letak kunci bervariasi di semua mesin");
  sama(MS.SEMUA_MESIN_K4B4.map((d) => d.selesaiId), ["A", "B"].map((h) => K4.ID_MESIN_K4B4[h]), "selesaiId mesin sama dengan id misi");

  const bandingM = (a, b) => (a === b ? "sama" : a > b ? "lebih besar" : "lebih kecil");
  // Mesin Luas: kunci dan SEMUA pengecoh dihitung ulang mandiri.
  for (const k of MS.KASUS_LUAS) {
    const kasus = MS.MESIN_LUAS.kasus.find((c) => c.id === k.id);
    const [satuan, hitung, luas, bd] = kasus.langkah;
    let n = 0;
    for (const v of k.baris) n += v; // mandiri: jumlah isi baris
    const pp = k.baris.every((v) => v === k.baris[0]);
    if (pp) cek(n === ppMandiri(k.baris.length, k.baris[0]), `A/${k.id}: jumlah baris = baris × kolom`);
    const lambang = k.sisi === "cm" ? "cm²" : "m²";
    cek(satuan.benar === lambang && satuan.opsi.every((o) => o === satuan.benar || o !== lambang), `A/${k.id}: satuan ${lambang}`);
    cek(satuan.opsi.includes(k.sisi), `A/${k.id}: pengecoh satuan panjang`);
    cek(Number(hitung.benar) === n && hitung.opsi.every((o) => o === hitung.benar || (Number(o) !== n && Number(o) >= 0)), `A/${k.id}: hitung ${n}; pengecoh salah`);
    cek(luas.benar === `${n} ${lambang}` && luas.opsi.every((o) => o === luas.benar || !o.endsWith(` ${lambang}`) || angka(o) !== n), `A/${k.id}: luas ${n} ${lambang}; pengecoh salah satuan`);
    const cm2 = k.sisi === "cm" ? n : cm2Mandiri(n);
    cek(bd.benar === bandingM(cm2, k.lawan.cm2) && bd.opsi.length === 3, `A/${k.id}: bandingkan ${bd.benar} (dihitung)`);
  }
  cek(MS.KASUS_LUAS.some((k) => !k.baris.every((v) => v === k.baris[0])) && MS.KASUS_LUAS.some((k) => k.sisi === "m"), "mesin A: ada bangun tak beraturan dan kasus m²");
  const teras = MS.MESIN_LUAS.kasus.find((c) => c.id === "teras");
  cek(teras.langkah[3].benar === "sama" && /60 ribu/.test(MS.KASUS_LUAS.find((k) => k.id === "teras").lawan.nama), "A/teras: 6 m² = 60.000 cm² (dihitung)");

  // Mesin Volume.
  for (const k of MS.KASUS_VOLUME) {
    const kasus = MS.MESIN_VOLUME.kasus.find((c) => c.id === k.id);
    const [satuan, hitung, ubah, bd] = kasus.langkah;
    if (k.jenis === "cair") {
      let ml = 0;
      for (let i = 0; i < k.tuang; i += 1) ml += k.takar;
      cek(satuan.benar === "ml" && Number(hitung.benar) === ml && hitung.opsi.every((o) => o === hitung.benar || Number(o) !== ml), `B/${k.id}: ${ml} ml; pengecoh salah`);
      cek(Number(ubah.benar) * 1000 === ml && ubah.opsi.every((o) => o === ubah.benar || Number(o) * 1000 !== ml), `B/${k.id}: ${ml} ml = ${ubah.benar} l; pengecoh salah`);
      cek(bd.benar === bandingM(ml, k.lawanMl), `B/${k.id}: bandingkan (dihitung)`);
    } else {
      const v = volMandiri(k.baris, k.kolom, k.lapisan);
      cek(Number(hitung.benar) === v && hitung.opsi.every((o) => o === hitung.benar || Number(o) !== v), `B/${k.id}: ${v} kubus; pengecoh salah`);
      cek(hitung.opsi.includes(String(k.baris * k.kolom)) || k.lapisan === 1, `B/${k.id}: pengecoh satu lapisan`);
      if (k.jenis === "pejal") {
        cek(satuan.benar === "cm³" && Number(ubah.benar) === v && ubah.opsi.every((o) => o === ubah.benar || Number(o) !== v), `B/${k.id}: ${v} cm³ = ${v} ml`);
        cek(bd.benar === bandingM(v, k.lawanMl), `B/${k.id}: bandingkan (dihitung)`);
      } else {
        cek(satuan.benar === "m³" && Number(ubah.benar) === v * 1000 && ubah.opsi.every((o) => o === ubah.benar || Number(o) !== v * 1000), `B/${k.id}: ${v} m³ = ${v * 1000} l`);
        cek(bd.benar === bandingM(v * 1000 * 1000, k.lawanMl), `B/${k.id}: bandingkan (dihitung)`);
      }
    }
  }
  cek(MS.MESIN_VOLUME.kasus.find((c) => c.id === "kubus").langkah[1].benar === "24", "B/kubus: bangun (i) buku 24 cm³");
}

/* ------------------------------ Skenario ------------------------------ */
{
  const semua = [SK.SKENARIO_K4B4A, SK.SKENARIO_K4B4B];
  for (const def of semua) {
    cek(def.adegan.length >= 5 && def.adegan.length <= 8, `${def.id}: 5 sampai 8 adegan`);
    cek(def.adegan[0].jenis === "narasi" && def.adegan[def.adegan.length - 1].jenis === "akhir", `${def.id}: buka dan tutup`);
    cek(new Set(def.adegan.map((a) => a.jenis)).size >= 4, `${def.id}: paling sedikit empat jenis adegan`);
    for (const a of def.adegan.filter((x) => x.jenis === "soal")) for (const q of a.soal) cek(q.opsi.filter((o) => o !== q.jawaban).every((o) => angka(o) !== angka(q.jawaban)), `${def.id}/${a.id}: pengecoh salah (${q.teks})`);
    cek(def.adegan.every((a) => tanpaAngka(a.cerita)), `${def.id}: cerita dapat dieja`);
  }
  sama(semua.map((d) => d.id.replace(/-k4b4$/, "")), [K4.ID_SKENARIO_K4B4.A, K4.ID_SKENARIO_K4B4.B], "id skenario sesuai id misi");
  const adegan = (def, id) => def.adegan.find((a) => a.id === id);
  // A
  cek(adegan(SK.SKENARIO_K4B4A, "hitung").jumlah === ppMandiri(2, 3), "A: meja 2 baris × 3 uang kertas = 6 (dihitung)");
  cek(adegan(SK.SKENARIO_K4B4A, "kisi").target === ppMandiri(3, 4), "A: persegi panjang 3 × 4 = 12 cm² (dihitung)");
  const meter = adegan(SK.SKENARIO_K4B4A, "meter").soal;
  sama(meter.map((q) => angka(q.jawaban)), [cm2Mandiri(1), cm2Mandiri(3)], "A: 1 m² dan 3 m² dalam cm² (dihitung)");
  cek(/tanpa celah/.test(adegan(SK.SKENARIO_K4B4A, "susun").opsi.find((o) => o.benar).teks), "A: susun tanpa celah benar");
  cek(/lebih besar/.test(adegan(SK.SKENARIO_K4B4A, "buku").opsi.find((o) => o.benar).teks), "A: satuan tidak baku lebih besar butuh lebih sedikit");
  // B
  cek(/10\.000 cm²/.test(adegan(SK.SKENARIO_K4B4B, "taplak").opsi.find((o) => o.benar).teks) && cm2Mandiri(1) === 10000, "B: 1 m² = 10.000 cm² (dihitung)");
  cek(adegan(SK.SKENARIO_K4B4B, "botol").target === takaranMandiri(B.TUANG_B[0]), "B: botol A = 4 botol B (dari data lab)");
  sama(adegan(SK.SKENARIO_K4B4B, "takaran").soal.map((q) => Number(q.jawaban)), [takaranMandiri(B.TUANG_B[1]), takaranMandiri(B.TUANG_B[2])], "B: 10 botol C dan 8 botol kecil (dari data lab)");
  cek(adegan(SK.SKENARIO_K4B4B, "gula").jumlah === volMandiri(2, 3, 2), "B: kubus gula 2 lapisan × 2 × 3 = 12 (dihitung)");
  cek(/1 l = 1\.000 ml/.test(adegan(SK.SKENARIO_K4B4B, "susu").opsi.find((o) => o.benar).teks), "B: 1 l = 1.000 ml");
  sama(adegan(SK.SKENARIO_K4B4B, "ubah").soal.map((q) => angka(q.jawaban)), [volMandiri(2, 3, 2), 50, 1000], "B: 12 cm³ = 12 ml, naik 50 ml = 50 cm³, 1 m³ = 1.000 l");
}

/* ------------------------------ Misi ------------------------------ */
{
  const huruf = ["A", "B"];
  sama(Object.keys(TK.MISI_K4B4), huruf, "teks misi untuk A dan B");
  sama(Object.keys(TK.NAMA_SIM_K4B4), huruf, "nama simulasi untuk A dan B");
  cek(TK.hurufK4B4("Z") === "A" && TK.hurufK4B4("B") === "B", "huruf tak dikenal jatuh ke A");
  cek(TK.misiAwalK4Bab4("B").startsWith("Simulasi 1. Misi: ") && tanpaAngka(TK.misiAwalK4Bab4("A")) && tanpaAngka(TK.misiAwalK4Bab4("B")), "misi awal dan dapat dieja");
  for (const h of huruf) {
    const daftar = K4.daftarMisiK4Bab4(h);
    cek(daftar.filter((m) => m.wajib).length === 7 && daftar.filter((m) => !m.wajib).length === 3, `${h}: tujuh misi wajib dan tiga tantangan bebas`);
    cek(new Set(daftar.map((m) => m.id)).size === 10 && daftar.every((m) => m.id.startsWith(`${h.toLowerCase()}-`)), `${h}: id misi unik berawalan huruf`);
    const kosong = [{ alat: "luas", pernah: [] }, { alat: "volume", pernah: [] }, sel("tidak-ada"), A.keadaanLuasK4B4A(A.awalLuasK4B4A()), B.keadaanVolumeK4B4B(B.awalVolumeK4B4B())];
    cek(kosong.every((k) => M0.misiBaru(daftar, k, new Set()).length === 0), `${h}: keadaan awal alat tidak memenuhi misi mana pun`);
    cek(daftar.every((m) => m.teks.length > 20 && tanpaAngka(m.teks)), `${h}: teks misi jelas dan dapat dieja`);
    const baru = (k) => M0.misiBaru(daftar, k, new Set());
    for (const lain of huruf.filter((l) => l !== h)) cek(baru(sel(K4.ID_MESIN_K4B4[lain])).length === 0 && baru(sel(K4.ID_SKENARIO_K4B4[lain])).length === 0, `${h}: id mesin/skenario ${lain} tidak memenuhi misi ${h}`);
    cek(baru(sel(K4.ID_MESIN_K4B4[h])).join() === `${h.toLowerCase()}-mesin` && baru(sel(K4.ID_SKENARIO_K4B4[h])).join() === `${h.toLowerCase()}-skenario`, `${h}: id mesin dan skenario memenuhi misinya`);
  }
  cek(M0.misiBaru(K4.MISI_A, { alat: "volume", pernah: ["tutup:uang", "kisi:13"] }, new Set()).length === 0, "A: riwayat lab B tidak memenuhi misi A");
  cek(M0.misiBaru(K4.MISI_B, { alat: "luas", pernah: ["penuh:b", "liter"] }, new Set()).length === 0, "B: riwayat lab A tidak memenuhi misi B");

  // Lab A: jalur nyata dan near-miss.
  const capaiA = (aksi) => M0.misiBaru(K4.MISI_A, A.keadaanLuasK4B4A(jalan(A.awalLuasK4B4A(), A.langkahLuasK4B4A, aksi)), new Set());
  const tutupPenuh = (i, kurangi = 0) => {
    const u = A.UBIN[i];
    const aksi = [{ t: "T_UBIN", i }];
    for (let r = 0; r < A.MEJA_BARIS; r += u.tinggi) for (let c = 0; c < A.MEJA_KOLOM; c += u.lebar) aksi.push({ t: "T_TARUH", r, c });
    return [...aksi.slice(0, aksi.length - kurangi), { t: "T_CEK" }];
  };
  cek(capaiA(tutupPenuh(1)).includes("a-uang") && !capaiA(tutupPenuh(1, 1)).includes("a-uang"), "A: uang kertas penuh memenuhi, satu celah tidak");
  cek(capaiA(tutupPenuh(2)).includes("a-origami") && !capaiA(tutupPenuh(2, 1)).includes("a-origami") && !capaiA(tutupPenuh(0)).includes("a-origami"), "A: origami penuh memenuhi; celah atau kartu tidak");
  cek(capaiA([{ t: "T_TARUH", r: 0, c: 0 }, { t: "T_TARUH", r: 0, c: 0 }]).join() === "a-tumpuk", "A: tantangan bertumpuk");
  const kisi = (cells) => [...cells.map(([r, c]) => ({ t: "K_SEL", r, c })), { t: "K_CEK" }];
  const baris = (isi, geser = 0) => isi.flatMap((n, r) => Array.from({ length: n }, (_, c) => [r, c + geser]));
  cek(capaiA(kisi(baris([4, 4, 3, 2]))).includes("a-tiga-belas") && !capaiA(kisi(baris([4, 4, 3, 1]))).includes("a-tiga-belas") && !capaiA(kisi(baris([4, 4, 3, 3]))).includes("a-tiga-belas"), "A: 13 sel memenuhi, 12 dan 14 tidak");
  cek(!capaiA(kisi([...baris([4, 4, 3, 1]), [4, 5]])).includes("a-tiga-belas"), "A: 13 sel yang terpisah tidak memenuhi");
  cek(capaiA(kisi(baris([4, 4, 4]))).includes("a-pp") && !capaiA(kisi(baris([3, 3, 3, 3]))).includes("a-pp") && !capaiA(kisi(baris([4, 4, 3]))).includes("a-pp"), "A: 3 baris × 4 memenuhi; 4 × 3 atau tidak penuh tidak");
  cek(capaiA([...kisi(baris([4, 4, 3, 2])), { t: "K_BERSIH" }, ...kisi(baris([2, 3, 4, 4]))]).includes("a-sama-luas") && !capaiA([...kisi(baris([4, 4, 3, 2])), { t: "K_BERSIH" }, ...kisi(baris([4, 4, 3, 2], 1))]).includes("a-sama-luas"), "A: dua bentuk berbeda 13 memenuhi; bentuk sama digeser tidak");
  const ubah = (arah, n, nilai) => [{ t: "U_ARAH", arah }, ...ulang(n - 1, { t: "U_N", d: 1 }), { t: "U_JAWAB", nilai }];
  cek(capaiA(ubah("m2", 2, 20000)).includes("a-ubah") && !capaiA(ubah("m2", 2, 200)).includes("a-ubah") && !capaiA(ubah("m2", 3, 30000)).includes("a-ubah"), "A: 2 m² = 20.000 memenuhi; 200 atau 3 m² tidak");
  cek(capaiA(ubah("cm2", 3, 3)).includes("a-balik") && !capaiA(ubah("cm2", 3, 300)).includes("a-balik"), "A: tantangan 30.000 cm² = 3 m²");

  // Lab B.
  const capaiB = (aksi) => M0.misiBaru(K4.MISI_B, B.keadaanVolumeK4B4B(jalan(B.awalVolumeK4B4B(), B.langkahVolumeK4B4B, aksi)), new Set());
  const tuang = (i, n) => [{ t: "V_KASUS", i }, ...ulang(n, { t: "V_TUANG" })];
  cek(capaiB(tuang(0, 4)).includes("b-empat") && !capaiB(tuang(0, 3)).includes("b-empat"), "B: 4 botol B memenuhi, 3 tidak");
  cek(capaiB(tuang(1, 10)).includes("b-sepuluh") && !capaiB(tuang(1, 9)).includes("b-sepuluh"), "B: 10 botol C memenuhi, 9 tidak");
  cek(capaiB(tuang(2, 8)).includes("b-sanitizer") && !capaiB(tuang(2, 7)).includes("b-sanitizer"), "B: tantangan sanitizer 8");
  cek(capaiB(tuang(0, 5)).includes("b-tumpah") && !capaiB(tuang(0, 4)).includes("b-tumpah"), "B: tantangan tumpah");
  const kubus = (b, k, l) => [...ulang(b - 2, { t: "Q_BARIS", d: 1 }), ...ulang(k - 2, { t: "Q_KOLOM", d: 1 }), ...ulang(l - 1, { t: "Q_LAPIS", d: 1 }), { t: "Q_CEK" }];
  cek(capaiB(kubus(3, 4, 2)).includes("b-dua-puluh-empat") && capaiB(kubus(4, 3, 2)).includes("b-dua-puluh-empat"), "B: alas 12 dua lapisan memenuhi");
  cek(!capaiB(kubus(2, 4, 3)).includes("b-dua-puluh-empat") && !capaiB(kubus(3, 4, 1)).includes("b-dua-puluh-empat") && !capaiB(kubus(3, 3, 2)).includes("b-dua-puluh-empat"), "B: 24 tiga lapisan, 12 satu lapisan, atau 18 tidak memenuhi");
  cek(capaiB(kubus(3, 3, 1)).includes("b-sembilan") && !capaiB(kubus(3, 3, 2)).includes("b-sembilan") && !capaiB(kubus(2, 4, 1)).includes("b-sembilan"), "B: 3 × 3 satu lapisan memenuhi; dua lapisan atau 8 tidak");
  cek(capaiB([{ t: "R_TAKAR", i: 1 }, ...ulang(10, { t: "R_TUANG" })]).includes("b-liter") && !capaiB([{ t: "R_TAKAR", i: 1 }, ...ulang(9, { t: "R_TUANG" })]).includes("b-liter"), "B: 1.000 ml memenuhi, 900 tidak");
  cek(capaiB([{ t: "R_TAKAR", i: 1 }, { t: "R_TUANG" }, { t: "R_CELUP" }]).includes("b-celup") && !capaiB([{ t: "R_CELUP" }]).includes("b-celup"), "B: tantangan celup hanya bila ada air");
  cek(capaiB(kubus(2, 2, 1)).length === 0, "B: susunan awal (2 × 2, 1 lapisan) tidak memenuhi misi mana pun");

  // Gerbang.
  for (const h of huruf) {
    const daftar = M0.tampilMisi(K4.daftarMisiK4Bab4(h));
    const wajibIds = daftar.filter((m) => m.wajib).map((m) => m.id);
    cek(!M0.wajibSelesai(daftar, new Set(wajibIds.slice(0, 6))), `${h}: enam dari tujuh wajib belum membuka gerbang`);
    cek(M0.wajibSelesai(daftar, new Set(wajibIds)), `${h}: tujuh wajib membuka gerbang`);
    cek(M0.bolehLanjut({ adaMisi: true, wajibSelesai: false, dilewati: true, disentuh: true }) && !M0.bolehLanjut({ adaMisi: true, wajibSelesai: false, dilewati: true, disentuh: false }), "lewati hanya setelah disentuh");
  }
}

/* ------------------------------ Konsep tidak bocor antar sub-bab ------------------------------ */
{
  const ringkas = JSON.parse(readFileSync(new URL("../src/data/kelas4-bab4-ringkas.json", import.meta.url), "utf8"));
  const baca = (nama, ekstensi) => readFileSync(new URL(`../src/components/modul/${nama}.${ekstensi}`, import.meta.url), "utf8");
  const tanpaKomentar = (s) => s.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");
  // Sub-Bab A (luas) tidak memakai istilah volume.
  const BOCOR_A = /(volume|kubus|kubik|cm³|m³|\bml\b|mililiter|liter|lapisan|botol|\btuang|\btakar|isi ruang|pejal|celup)/i;
  const catat = (teks, apa) => {
    const m = BOCOR_A.exec(teks);
    cek(!m, `A: ${apa} bebas konsep Sub-Bab B (${m ? m[0] : ""} di "${String(teks).slice(Math.max(0, (m?.index ?? 0) - 30), (m?.index ?? 0) + 40)}")`);
  };
  for (const t of [TK.MISI_K4B4.A, TK.NAMA_SIM_K4B4.A, ...K4.MISI_A.map((m) => m.teks)]) catat(t, "teks misi");
  catat(JSON.stringify(MS.MESIN_LUAS), "mesin");
  catat(JSON.stringify(SK.SKENARIO_K4B4A), "skenario");
  catat(JSON.stringify(ringkas.subBab.A), "peta dan infografis ringkas");
  catat(tanpaKomentar(baca("SimulasiLabLuasK4B4", "tsx")), "komponen lab (tanpa komentar)");
  catat(tanpaKomentar(baca("lab-luas-k4b4a", "ts")), "logika lab (tanpa komentar)");
  for (const p of globalThis.__pesanA) catat(p, "pesan lab dari fuzz");
  const xA = A.awalLuasK4B4A();
  for (const u of [A.ucapTutupK4B4A(xA), A.ucapKisiK4B4A(xA), A.ucapUbahK4B4A(xA)]) catat(u, "ucapan lab");

  // Kunci tidak bocor ke klien.
  const KOMP = ["SimulasiLabLuasK4B4", "SimulasiLabVolumeK4B4", "SimulasiK4Bab4", "model-ukur-k4b4"];
  for (const f of KOMP) {
    const s = baca(f, "tsx");
    cek(!/correct_index|explanation/.test(s), `${f}: tidak memuat correct_index atau explanation`);
    cek(!/fetch\(|XMLHttpRequest|api\/|openai|anthropic|gemini/i.test(s), `${f}: tanpa jaringan atau model bahasa`);
  }
  const LOGIKA = ["lab-luas-k4b4a", "lab-volume-k4b4b", "mesin-data-k4b4", "skenario-k4b4", "misi-k4bab4", "misi-teks-k4b4", "eja-k4b4"];
  for (const f of LOGIKA) {
    const s = baca(f, "ts");
    cek(!/fetch\(|XMLHttpRequest|from "react"|openai|anthropic|gemini|correct_index|explanation/i.test(s), `${f}: murni`);
    const impor = s.match(/^import .+$/gm) ?? [];
    cek(impor.every((l) => l.startsWith("import type")), `${f}: hanya mengimpor tipe`);
  }
  for (const f of ["SimulasiLabLuasK4B4", "SimulasiLabVolumeK4B4"]) {
    const s = baca(f, "tsx");
    cek(/useEffect\(\(\) => \{\s*onKeadaan\?\.\(keadaan\w+\(x\)\);\s*\}, \[onKeadaan, x\]\);/.test(s), `${f}: lapor keadaan lewat useEffect`);
    cek(/setLihat\(v\);\s*kirim\(\{ t: "PESAN_KOSONG" \}\);/.test(s), `${f}: ganti tampilan mengosongkan pesan`);
  }
  // Semua ucapan lab dieja menjadi kata.
  const xB = B.awalVolumeK4B4B();
  const ucapan = [
    A.ucapTutupK4B4A(xA),
    A.ucapKisiK4B4A(xA),
    A.ucapUbahK4B4A(xA),
    A.ucapUbahK4B4A({ ...xA, arah: "cm2", n: 5 }),
    B.ucapTuangK4B4B(xB),
    B.ucapKubusK4B4B(xB),
    B.ucapTakarK4B4B(xB),
    B.ucapTakarK4B4B({ ...xB, air: 950, celup: true }),
  ];
  cek(ucapan.every(tanpaAngka), "semua ucapan lab dieja menjadi kata");
  // Teks Coba ini dan petunjuk mesin di pembungkus dapat dieja mesin.
  const pembungkus = baca("SimulasiK4Bab4", "tsx");
  const coba = [...pembungkus.matchAll(/"([^"]*\?)"/g)].map((m) => m[1]);
  cek(coba.length >= 6 && coba.every((t) => tanpaAngkaK3(t) && !/[²³]/.test(t)), "Coba ini mesin dapat dieja");
}

/* ------------------------------ Data ringkas ------------------------------ */
{
  const ringkas = JSON.parse(readFileSync(new URL("../src/data/kelas4-bab4-ringkas.json", import.meta.url), "utf8"));
  cek(ringkas.chapter_id === "mtk-4-bab4" && ringkas.phase_code === "FASE_B" && ringkas.grade === 4, "ringkas: id bab, fase, kelas");
  for (const h of ["A", "B"]) {
    const s = ringkas.subBab[h];
    cek(!!s && s.peta.cabang.length === 4 && s.peta.kartu.length === 8 && s.infografis.panel.length === 3, `ringkas ${h}: empat cabang, delapan kartu, tiga panel`);
    const suara = [];
    JSON.stringify(s, (k, v) => {
      if (k === "suara") suara.push(v);
      return v;
    });
    cek(suara.every((t) => !/\d/.test(t)), `ringkas ${h}: semua teks suara berupa kata`);
  }
  cek(Object.keys(ringkas.subBab).join() === "A,B", "ringkas: hanya sub-bab A dan B");
}

console.log(`Lulus ${lulus}, gagal ${gagal}`);
process.exit(gagal ? 1 : 0);
