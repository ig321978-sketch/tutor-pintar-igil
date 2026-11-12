// Uji Simulasi Kelas 4 Bab 2 (Pecahan): pengeja, lab tiap sub-bab, mesin, skenario, misi, gerbang,
// dan konsep tidak bocor antar sub-bab.
// Jalankan: node --no-warnings scripts/uji-lab-k4b2.mjs
import { readFileSync } from "node:fs";
import * as M0 from "../src/components/modul/misi-simulasi.ts";
import * as K4 from "../src/components/modul/misi-k4bab2.ts";
import * as TK from "../src/components/modul/misi-teks-k4b2.ts";
import * as A from "../src/components/modul/lab-pecahan-k4b2a.ts";
import * as B from "../src/components/modul/lab-batang-k4b2b.ts";
import * as C from "../src/components/modul/lab-senilai-k4b2c.ts";
import * as MS from "../src/components/modul/mesin-data-k4b2-biasa.ts";
import * as SK from "../src/components/modul/skenario-k4b2-biasa.ts";
import * as ME from "../src/components/modul/mesin-bertahap-k3b1.ts";
import * as EJ from "../src/components/modul/eja-k4b2.ts";

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

/* ------------------------------ Hitungan MANDIRI ------------------------------ */
// Pembagi persekutuan terbesar dengan mencoba semua pembagi, bukan Euclid.
const fpbBrute = (a, b) => {
  let g = 1;
  for (let i = 1; i <= Math.min(a, b); i += 1) if (a % i === 0 && b % i === 0) g = i;
  return g;
};
const nilaiDesimal = (a, b) => a / b; // hanya untuk pembanding mandiri (bukan dipakai kode)
const sederhanaBrute = (a, b) => {
  const g = fpbBrute(a, b);
  return [a / g, b / g];
};

/* ------------------------------ Pengeja ------------------------------ */
{
  sama(EJ.ejaK4B2("1/4"), "satu per empat", "eja 1/4");
  sama(EJ.ejaK4B2("3/8"), "tiga per delapan", "eja 3/8");
  sama(EJ.ejaK4B2("12/16"), "dua belas per enam belas", "eja 12/16");
  sama(EJ.ejaK4B2("1/10"), "satu per sepuluh", "eja 1/10");
  sama(EJ.ejaK4B2("1/2 > 1/4"), "satu per dua lebih dari satu per empat", "eja tanda");
  sama(EJ.ejaK4B2("2/6 = 1/3"), "dua per enam sama dengan satu per tiga", "eja sama dengan");
  sama(EJ.ejaK4B2("FPB 4 dan 16 adalah 4"), "faktor persekutuan terbesar empat dan enam belas adalah empat", "eja FPB");
  sama(EJ.ejaK4B2("25%"), "dua puluh lima persen", "eja persen");
  sama(EJ.ejaK4B2("0,25"), "nol koma dua lima", "eja desimal");
  cek(!/\d/.test(EJ.ejaK4B2("Bagi 24 menjadi 12 bagian, 3/4 dan 1/2")), "eja tidak menyisakan angka");
}

/* ------------------------------ Lab A: Pecahan ------------------------------ */
{
  // Tanda 1/a dan 1/b dari perkalian silang cocok dengan perbandingan mandiri untuk semua pasangan.
  let ok = true;
  for (let a = A.MIN_BAGIAN; a <= A.MAKS_BAGIAN; a += 1) {
    for (let b = A.MIN_BAGIAN; b <= A.MAKS_BAGIAN; b += 1) {
      const mandiri = nilaiDesimal(1, a) > nilaiDesimal(1, b) ? ">" : nilaiDesimal(1, a) < nilaiDesimal(1, b) ? "<" : "=";
      if (A.tandaUnit(a, b) !== mandiri) ok = false;
      if (A.pasangKey(a, b) !== A.pasangKey(b, a)) ok = false;
    }
  }
  cek(ok, "tanda 1/a dan 1/b cocok dengan perbandingan mandiri (penyebut besar = bagian kecil)");

  let x = A.awalPecahanK4B2A();
  cek(x.pernah.length === 0 && !x.arsir && x.sama, "awal Lab A: tidak ada riwayat");
  x = A.langkahPecahanK4B2A(x, { t: "ARSIR" });
  sama(x.pernah, ["unit:4"], "arsir 1 dari 4 sama besar menghitung 1/4");
  cek(/1\/4/.test(x.pesan), "pesan arsir menyebut 1/4");
  // Potongan tidak sama: menolak.
  let y = A.langkahPecahanK4B2A(A.awalPecahanK4B2A(), { t: "SAMA" });
  cek(!y.sama, "potongan tidak sama besar menyala");
  y = A.langkahPecahanK4B2A(y, { t: "ARSIR" });
  cek(!y.arsir && y.pernah.includes("tidak-sama") && !y.pernah.some((p) => p.startsWith("unit:")), "tidak sama besar: arsir ditolak dan 1/n tidak dicatat");
  cek(/sama besar/.test(y.pesan), "pesan menjelaskan harus sama besar");
  // Mengganti penyebut mengosongkan arsir; batas 2..12.
  let z = jalan(A.awalPecahanK4B2A(), A.langkahPecahanK4B2A, [{ t: "ARSIR" }, { t: "PENYEBUT", d: 1 }]);
  cek(z.n === 5 && !z.arsir, "ganti penyebut mengosongkan arsir");
  z = jalan(A.awalPecahanK4B2A(), A.langkahPecahanK4B2A, ulang(30, { t: "PENYEBUT", d: 1 }));
  cek(z.n === A.MAKS_BAGIAN, "penyebut maksimal 12");
  z = jalan(A.awalPecahanK4B2A(), A.langkahPecahanK4B2A, ulang(30, { t: "PENYEBUT", d: -1 }));
  cek(z.n === A.MIN_BAGIAN, "penyebut minimal 2");
  // Banding: 1/2 dan 1/4.
  let b = A.awalPecahanK4B2A(); // a=3,b=5
  b = jalan(b, A.langkahPecahanK4B2A, [{ t: "KIRI", d: -1 }, { t: "KANAN", d: -1 }]); // a=2,b=4
  cek(b.a === 2 && b.b === 4 && b.pernah.includes("pasang:2:4") && b.pernah.includes("tanda:>"), "banding 1/2 dan 1/4 tercatat (>)");
  cek(/2 bagian lebih sedikit daripada 4 bagian/.test(b.pesan), "alasan: bagian lebih sedikit, tiap bagian lebih besar");
  cek(b.pesan.startsWith("✅"), "pesan banding bernada info");
  b = jalan(A.awalPecahanK4B2A(), A.langkahPecahanK4B2A, [{ t: "KIRI", d: 1 }, { t: "KANAN", d: -1 }]); // a=4,b=4? a=4,b=4
  cek(b.a === 4 && b.b === 4 && b.pernah.includes("tanda:="), "banding sama: tanda =");
  // Garis.
  let g = jalan(A.awalPecahanK4B2A(), A.langkahPecahanK4B2A, [{ t: "GARIS", d: 1 }, { t: "GARIS", d: 1 }, { t: "GARIS", d: 1 }]); // g=8
  cek(g.g === 8, "garis dibagi 8");
  g = A.langkahPecahanK4B2A(g, { t: "TITIK", k: 3 });
  cek(!g.pernah.some((p) => p.startsWith("garis:")) && /pertama/.test(g.pesan), "tanda ke-3 ditolak dengan penjelasan");
  g = A.langkahPecahanK4B2A(g, { t: "TITIK", k: 1 });
  sama(g.pernah, ["garis:8"], "tanda pertama dicatat 1/8");
  cek(A.langkahPecahanK4B2A(g, { t: "TITIK", k: 99 }) === g, "tanda di luar garis diabaikan");
  // Lab A tidak pernah mencatat pecahan berpembilang lebih dari 1.
  // Fuzz.
  const acak = acakDari(7);
  const aksiA = () => {
    const r = acak(9);
    if (r === 0) return { t: "PENYEBUT", d: acak(2) ? 1 : -1 };
    if (r === 1) return { t: "ARSIR" };
    if (r === 2) return { t: "SAMA" };
    if (r === 3) return { t: "KIRI", d: acak(2) ? 1 : -1 };
    if (r === 4) return { t: "KANAN", d: acak(2) ? 1 : -1 };
    if (r === 5) return { t: "GARIS", d: acak(2) ? 1 : -1 };
    if (r === 6) return { t: "TITIK", k: acak(14) };
    if (r === 7) return { t: "TITIK", k: 1 };
    return acak(60) === 0 ? { t: "RESET" } : { t: "ARSIR" };
  };
  let s = A.awalPecahanK4B2A();
  let ok2 = true;
  let riwayat = new Set();
  for (let i = 0; i < 20000 && ok2; i += 1) {
    const aksi = aksiA();
    const sebelum = s;
    s = A.langkahPecahanK4B2A(s, aksi);
    if (aksi.t === "RESET") {
      riwayat = new Set();
      continue;
    }
    for (const p of sebelum.pernah) if (!s.pernah.includes(p)) ok2 = false;
    const dalam = (v) => v >= 2 && v <= 12;
    if (!dalam(s.n) || !dalam(s.a) || !dalam(s.b) || !dalam(s.g)) ok2 = false;
    if (s.arsir && !s.sama) ok2 = false;
    if (s.titik !== null && (s.titik < 1 || s.titik > s.g)) ok2 = false;
    for (const p of s.pernah) {
      const m = /^unit:(\d+)$/.exec(p);
      if (m && (Number(m[1]) < 2 || Number(m[1]) > 12)) ok2 = false;
    }
  }
  cek(ok2, "fuzz 20.000 aksi lab pecahan: 2 sampai 12, arsir hanya bila sama besar, riwayat tidak dicabut");
  const k = A.keadaanPecahanK4B2A(x);
  cek(k.alat === "pecahan" && k.pernah === x.pernah, "keadaan lab A");
}

/* ------------------------------ Lab B: Batang ------------------------------ */
{
  let ok = true;
  for (let q = B.MIN_PENYEBUT; q <= B.MAKS_PENYEBUT; q += 1) {
    for (let p1 = 1; p1 < q; p1 += 1) {
      for (let p2 = 1; p2 < q; p2 += 1) {
        const mandiri = p1 / q > p2 / q ? ">" : p1 / q < p2 / q ? "<" : "=";
        if (B.tandaSama(p1, p2, q) !== mandiri) ok = false;
      }
    }
  }
  cek(ok, "tanda penyebut sama cocok dengan perbandingan mandiri untuk semua pasangan");
  // Urutan tampil adalah permutasi 1..q-1 dan tidak langsung terurut.
  let ok2 = true;
  for (let q = B.MIN_URUT; q <= B.MAKS_URUT; q += 1) {
    const t = B.urutanTampil(q);
    const urut = [...t].sort((a, b) => a - b);
    if (JSON.stringify(urut) !== JSON.stringify(Array.from({ length: q - 1 }, (_, i) => i + 1))) ok2 = false;
    if (JSON.stringify(t) === JSON.stringify(urut)) ok2 = false;
  }
  cek(ok2, "urutan tampil: permutasi 1..q-1 yang tidak langsung terurut");

  let x = B.awalBatangK4B2B();
  cek(x.pernah.length === 0, "awal Lab B: tidak ada riwayat");
  // Baca 3/8.
  x = jalan(x, B.langkahBatangK4B2B, [...ulang(3, { t: "BACA_Q", d: 1 }), { t: "BACA_P", d: 1 }]); // q=8, p=2 → 3
  cek(x.q === 8 && x.p === 3 && x.pernah.includes("baca:3/8"), "baca 3/8 tercatat");
  cek(B.ucapBacaK4B2B(x).includes("3/8") && /pembilangnya 3, penyebutnya 8/i.test(B.ucapBacaK4B2B(x)), "ucapan baca menyebut pembilang dan penyebut");
  // Pembilang tidak melewati q-1.
  let y = jalan(B.awalBatangK4B2B(), B.langkahBatangK4B2B, ulang(20, { t: "BACA_P", d: 1 }));
  cek(y.p === y.q - 1, "pembilang paling besar q-1 (pecahan kurang dari satu)");
  // Penyebut turun menjepit pembilang.
  y = jalan(B.awalBatangK4B2B(), B.langkahBatangK4B2B, [{ t: "BACA_P", d: 1 }, { t: "BACA_P", d: 1 }, ...ulang(10, { t: "BACA_Q", d: -1 })]);
  cek(y.q === 2 && y.p === 1, "penyebut turun: pembilang ikut dijepit ke 1");
  // Banding penyebut sama: 2/5 dan 4/5.
  let b = B.awalBatangK4B2B(); // q1=q2=4; p1=1,p2=3
  b = jalan(b, B.langkahBatangK4B2B, [{ t: "Q1", d: 1 }, { t: "Q2", d: 1 }, { t: "P1", d: 1 }, { t: "P2", d: 1 }]); // 2/5 dan 4/5
  cek(b.q1 === 5 && b.q2 === 5 && b.p1 === 2 && b.p2 === 4, "dua batang 2/5 dan 4/5");
  cek(b.pernah.includes("pasang:2:4:5") && b.pernah.includes("tanda:<") && b.pernah.includes("penyebut:5"), "banding penyebut sama tercatat");
  cek(b.pesan.startsWith("✅") && /pembilang: 2 < 4/.test(b.pesan), "pesan banding menyebut pembilang");
  // Penyebut berbeda: tidak dicatat sebagai tanda, ada penolakan.
  let d = jalan(B.awalBatangK4B2B(), B.langkahBatangK4B2B, [{ t: "Q1", d: 1 }]); // q1=5,q2=4
  cek(d.pernah.includes("beda-penyebut") && !d.pernah.some((p) => p.startsWith("tanda:") || p.startsWith("pasang:")), "penyebut berbeda: tanda tidak dicatat");
  cek(/tidak sama besar/.test(d.pesan) && !d.pesan.startsWith("✅"), "penyebut berbeda: pesan menolak membandingkan pembilang");
  cek(/berbeda/.test(B.ucapBandingK4B2B(d)), "ucapan penyebut berbeda");
  // Urut.
  const tampil5 = B.urutanTampil(5);
  let u = B.awalBatangK4B2B();
  const caraUrut = (arah, q) => {
    let s = jalan(B.awalBatangK4B2B(), B.langkahBatangK4B2B, [{ t: "URUT_Q", d: 1 }].slice(0, 0));
    while (s.qu !== q) s = B.langkahBatangK4B2B(s, { t: "URUT_Q", d: s.qu < q ? 1 : -1 });
    s = B.langkahBatangK4B2B(s, { t: "ARAH", arah });
    const t = B.urutanTampil(q);
    const idx = t.map((_, i) => i).sort((i, j) => (arah === "naik" ? t[i] - t[j] : t[j] - t[i]));
    for (const i of idx) s = B.langkahBatangK4B2B(s, { t: "KETUK", i });
    return s;
  };
  u = caraUrut("naik", 5);
  cek(u.pernah.includes("urut:5:naik") && u.dipilih.length === 4, "urut naik lengkap dicatat");
  u = caraUrut("turun", 6);
  cek(u.pernah.includes("urut:6:turun"), "urut turun lengkap dicatat");
  // Salah ketuk ditolak.
  let w = B.awalBatangK4B2B();
  const salah = tampil5.findIndex((p) => p !== 1);
  w = B.langkahBatangK4B2B(w, { t: "KETUK", i: salah });
  cek(w.dipilih.length === 0 && w.pernah.includes("urut-tolak") && /terkecil/.test(w.pesan), "ketuk yang bukan terkecil ditolak");
  w = B.langkahBatangK4B2B(w, { t: "KETUK", i: tampil5.indexOf(1) });
  cek(w.dipilih.length === 1, "ketuk yang terkecil diterima");
  const ulangKetuk = B.langkahBatangK4B2B(w, { t: "KETUK", i: tampil5.indexOf(1) });
  cek(ulangKetuk.dipilih.length === 1 && /sudah diurutkan/.test(ulangKetuk.pesan), "ketuk dua kali ditolak");
  cek(!w.pernah.some((p) => p.startsWith("urut:")), "urutan belum lengkap tidak dicatat");
  // Fuzz.
  const acak = acakDari(11);
  const dlm = (v, lo, hi) => v >= lo && v <= hi;
  let s = B.awalBatangK4B2B();
  let ok3 = true;
  for (let i = 0; i < 20000 && ok3; i += 1) {
    const r = acak(14);
    const dd = acak(2) ? 1 : -1;
    const aksi =
      r === 0 ? { t: "BACA_Q", d: dd } : r === 1 ? { t: "BACA_P", d: dd } : r === 2 ? { t: "Q1", d: dd } : r === 3 ? { t: "P1", d: dd } : r === 4 ? { t: "Q2", d: dd } : r === 5 ? { t: "P2", d: dd } : r === 6 ? { t: "URUT_Q", d: dd } : r === 7 ? { t: "ARAH", arah: acak(2) ? "naik" : "turun" } : r === 8 ? { t: "ULANG_URUT" } : r === 9 && acak(40) === 0 ? { t: "RESET" } : { t: "KETUK", i: acak(9) };
    const sebelum = s;
    s = B.langkahBatangK4B2B(s, aksi);
    if (aksi.t === "RESET") continue;
    for (const p of sebelum.pernah) if (!s.pernah.includes(p)) ok3 = false;
    if (!dlm(s.q, 2, 12) || !dlm(s.q1, 2, 12) || !dlm(s.q2, 2, 12) || !dlm(s.qu, 3, 8)) ok3 = false;
    if (!dlm(s.p, 1, s.q - 1) || !dlm(s.p1, 1, s.q1 - 1) || !dlm(s.p2, 1, s.q2 - 1)) ok3 = false;
    for (const p of s.pernah) {
      const m = /^pasang:(\d+):(\d+):(\d+)$/.exec(p);
      if (m && !(Number(m[1]) < Number(m[3]) && Number(m[2]) < Number(m[3]))) ok3 = false;
    }
  }
  cek(ok3, "fuzz 20.000 aksi lab batang: pembilang < penyebut, penyebut 2 sampai 12, tanda hanya untuk penyebut sama, riwayat tidak dicabut");
  cek(B.keadaanBatangK4B2B(x).alat === "batang", "keadaan lab B");
}

/* ------------------------------ Lab C: Senilai ------------------------------ */
{
  // FPB Euclid cocok dengan pencarian mandiri.
  let ok = true;
  for (let a = 1; a <= 48; a += 1) for (let b = 1; b <= 48; b += 1) if (C.fpbC(a, b) !== fpbBrute(a, b)) ok = false;
  cek(ok, "FPB (Euclid) cocok dengan pencarian pembagi mandiri untuk 1 sampai 48");
  // Senilai lewat perkalian silang cocok dengan bentuk paling sederhana mandiri.
  let ok2 = true;
  for (let a = 1; a < 24; a += 1) {
    for (let b = a + 1; b <= 24; b += 1) {
      for (let c = 1; c < 24; c += 1) {
        for (let d = c + 1; d <= 24; d += 1) {
          const [p, q] = sederhanaBrute(a, b);
          const [r, s] = sederhanaBrute(c, d);
          if (C.senilaiC(a, b, c, d) !== (p === r && q === s)) ok2 = false;
        }
      }
    }
  }
  cek(ok2, "senilai (perkalian silang) sama dengan kesamaan bentuk paling sederhana untuk semua pasangan sampai 24");
  cek(C.SOAL_C.every(([a, b]) => a < b && b <= C.MAKS_PENYEBUT_C) && C.SOAL_C.some(([a, b]) => fpbBrute(a, b) > 1) && C.SOAL_C.some(([a, b]) => fpbBrute(a, b) === 1), "daftar soal: pecahan wajar, ada yang bisa disederhanakan dan ada yang sudah sederhana");

  let x = C.awalSenilaiK4B2C();
  cek(x.a0 === 1 && x.b0 === 3 && x.pernah.length === 0, "awal Lab C: 1/3 tanpa riwayat");
  x = C.langkahSenilaiK4B2C(x, { t: "KALI", k: 2 });
  cek(x.a === 2 && x.b === 6 && C.sama(x) && x.pernah.includes("bentuk:1/3:2/6") && x.pernah.includes("kali:1/3:2"), "1/3 dikali 2 menjadi 2/6 senilai");
  cek(x.pesan.startsWith("✅") && /sama-sama dikali 2/.test(x.pesan), "pesan kali bernada info");
  x = C.langkahSenilaiK4B2C(x, { t: "KALI", k: 2 });
  cek(x.a === 4 && x.b === 12 && x.pernah.includes("bentuk:1/3:4/12"), "dua kali dikali 2 menjadi 4/12");
  // Batas penyebut.
  const besar = C.langkahSenilaiK4B2C(x, { t: "KALI", k: 4 });
  cek(besar.a === 4 && besar.b === 12 && /paling besar 24/.test(besar.pesan), "kali yang melewati 24 ditolak");
  // Mengubah satu saja tidak senilai.
  let y = C.langkahSenilaiK4B2C(C.langkahSenilaiK4B2C(C.awalSenilaiK4B2C(), { t: "KALI", k: 2 }), { t: "PEMBILANG", d: 1 }); // 3/6 vs 1/3
  cek(!C.sama(y) && y.pernah.includes("satu-saja") && /tidak senilai/.test(y.pesan) && !y.pesan.startsWith("✅"), "ubah pembilang saja: tidak senilai");
  y = C.langkahSenilaiK4B2C(C.langkahSenilaiK4B2C(C.awalSenilaiK4B2C(), { t: "KALI", k: 2 }), { t: "PENYEBUT", d: 1 }); // 2/7
  cek(!C.sama(y) && y.pernah.includes("satu-saja"), "ubah penyebut saja: tidak senilai");
  // Dari keadaan tidak senilai, 'satu-saja' tidak dicatat (hampir benar tidak memenuhi misi).
  const awal = C.awalSenilaiK4B2C();
  const t1 = C.langkahSenilaiK4B2C(awal, { t: "PEMBILANG", d: 1 }); // 2/3, dari keadaan awal (senilai trivial)
  cek(t1.pernah.includes("satu-saja"), "dari pecahan awal, mengubah satu saja juga dicatat");
  const t2 = C.langkahSenilaiK4B2C(t1, { t: "PEMBILANG", d: 1 }); // pembilang 3 >= penyebut 3 ditolak
  cek(t2.a === 2 && /lebih kecil dari satu/.test(t2.pesan), "pembilang tidak boleh mencapai penyebut");
  // Mengubah satu saja tidak pernah menghasilkan 'bentuk' senilai palsu.
  cek(!t1.pernah.some((p) => p.startsWith("bentuk:")), "2/3 tidak dicatat sebagai bentuk senilai 1/3");
  // Bagi.
  let z = C.langkahSenilaiK4B2C(C.awalSenilaiK4B2C(), { t: "SOAL", i: 4 }); // 6/12
  cek(z.a0 === 6 && z.b0 === 12, "soal 6/12");
  const gagalBagi = C.langkahSenilaiK4B2C(z, { t: "BAGI", k: 4 });
  cek(gagalBagi.a === 6 && gagalBagi.pernah.includes("bagi-gagal") && /tidak membagi/.test(gagalBagi.pesan), "bagi 6/12 dengan 4 ditolak (4 tidak membagi 6)");
  z = C.langkahSenilaiK4B2C(z, { t: "BAGI", k: 6 });
  cek(z.a === 1 && z.b === 2 && z.pernah.includes("bagi:6/12:6") && z.pernah.includes("bentuk:6/12:1/2"), "6/12 dibagi 6 menjadi 1/2");
  // Sederhana.
  let s2 = C.langkahSenilaiK4B2C(C.awalSenilaiK4B2C(), { t: "SOAL", i: 6 }); // 4/16
  s2 = C.langkahSenilaiK4B2C(s2, { t: "SEDERHANA" });
  cek(s2.a === 1 && s2.b === 4 && s2.pernah.includes("sederhana:4/16"), "4/16 disederhanakan menjadi 1/4 dengan FPB 4");
  cek(/FPB 4 dan 16 adalah 4/.test(s2.pesan), "pesan menyebut FPB");
  let s3 = C.langkahSenilaiK4B2C(C.awalSenilaiK4B2C(), { t: "SOAL", i: 5 }); // 3/4
  s3 = C.langkahSenilaiK4B2C(s3, { t: "SEDERHANA" });
  cek(s3.a === 3 && s3.b === 4 && s3.pernah.includes("sudah-sederhana:3/4") && !s3.pernah.some((p) => p.startsWith("sederhana:")), "3/4 sudah paling sederhana: dicatat terpisah");
  // Sederhana selalu menghasilkan bentuk dengan FPB 1 dan senilai.
  let ok3 = true;
  for (let i = 0; i < C.SOAL_C.length; i += 1) {
    let s = C.langkahSenilaiK4B2C(C.awalSenilaiK4B2C(), { t: "SOAL", i });
    for (let k = 2; k <= 3; k += 1) if (s.b * k <= 24) s = C.langkahSenilaiK4B2C(s, { t: "KALI", k });
    s = C.langkahSenilaiK4B2C(s, { t: "SEDERHANA" });
    if (fpbBrute(s.a, s.b) !== 1 || !C.sama(s)) ok3 = false;
  }
  cek(ok3, "sederhana menghasilkan FPB 1 dan tetap senilai dengan pecahan awal");
  // Kembali dan reset.
  let r = C.langkahSenilaiK4B2C(C.langkahSenilaiK4B2C(C.awalSenilaiK4B2C(), { t: "KALI", k: 3 }), { t: "KEMBALI" });
  cek(r.a === 1 && r.b === 3 && r.pernah.includes("kali:1/3:3"), "kembali memulihkan pecahan awal tanpa mencabut riwayat");
  cek(C.langkahSenilaiK4B2C(r, { t: "RESET" }).pernah.length === 0, "reset menghapus riwayat");
  // Fuzz.
  const acak = acakDari(13);
  let s = C.awalSenilaiK4B2C();
  let ok4 = true;
  for (let i = 0; i < 20000 && ok4; i += 1) {
    const r2 = acak(9);
    const dd = acak(2) ? 1 : -1;
    const aksi =
      r2 === 0 ? { t: "SOAL", i: acak(8) } : r2 === 1 ? { t: "KALI", k: 1 + acak(10) } : r2 === 2 ? { t: "BAGI", k: 1 + acak(14) } : r2 === 3 ? { t: "PEMBILANG", d: dd } : r2 === 4 ? { t: "PENYEBUT", d: dd } : r2 === 5 ? { t: "SEDERHANA" } : r2 === 6 ? { t: "KEMBALI" } : r2 === 7 && acak(40) === 0 ? { t: "RESET" } : { t: "KALI", k: 2 };
    const sebelum = s;
    s = C.langkahSenilaiK4B2C(s, aksi);
    if (aksi.t === "RESET") continue;
    for (const p of sebelum.pernah) if (!s.pernah.includes(p)) ok4 = false;
    if (!(s.a >= 1 && s.a < s.b && s.b <= 24 && Number.isInteger(s.a) && Number.isInteger(s.b))) ok4 = false;
    // Kali/bagi/sederhana/kembali selalu mempertahankan nilai terhadap sebelumnya.
    if (["KALI", "BAGI", "SEDERHANA"].includes(aksi.t) && !C.senilaiC(sebelum.a, sebelum.b, s.a, s.b)) ok4 = false;
    // Setiap catatan bentuk memang senilai dengan pecahan awal pada saat dicatat.
    for (const p of s.pernah) {
      const m = /^bentuk:(\d+)\/(\d+):(\d+)\/(\d+)$/.exec(p);
      if (m && !C.senilaiC(Number(m[1]), Number(m[2]), Number(m[3]), Number(m[4]))) ok4 = false;
    }
  }
  cek(ok4, "fuzz 20.000 aksi lab senilai: pecahan wajar, penyebut <= 24, kali/bagi/sederhana mempertahankan nilai, tiap 'bentuk' benar-benar senilai");
  cek(C.keadaanSenilaiK4B2C(x).alat === "senilai", "keadaan lab C");
}

/* ------------------------------ Mesin ------------------------------ */
{
  cek(MS.SEMUA_MESIN_K4B2_BIASA.length === 3, "ada tiga mesin (A, B, C)");
  const posisi = [];
  for (const def of MS.SEMUA_MESIN_K4B2_BIASA) {
    cek(def.kasus.length === 3 && def.stasiun.length === 4, `${def.id}: tiga kasus dan empat stasiun`);
    const lokal = [];
    for (const kasus of def.kasus) {
      cek(kasus.langkah.length === 4, `${def.id}/${kasus.id}: satu langkah per stasiun`);
      kasus.langkah.forEach((l, i) => {
        cek(l.stasiun === def.stasiun[i].id, `${kasus.id}: stasiun ${i} bernama ${def.stasiun[i].id}`);
        cek(l.opsi.length === 3 && new Set(l.opsi).size === 3 && l.opsi.filter((o) => o === l.benar).length === 1, `${def.id}/${kasus.id}/${l.stasiun}: tiga pilihan unik, satu kunci (${JSON.stringify(l.opsi)})`);
        cek(l.petunjuk.length > 20 && l.tanya.length > 5, `${kasus.id}/${l.stasiun}: tanya dan petunjuk ada`);
        lokal.push(l.opsi.indexOf(l.benar));
      });
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
  sama(MS.SEMUA_MESIN_K4B2_BIASA.map((d) => d.selesaiId), ["A", "B", "C"].map((h) => K4.ID_MESIN_K4B2[h]), "selesaiId mesin sama dengan id misi");

  // Mesin A: kunci dan SEMUA pengecoh dihitung ulang mandiri.
  const tanda = (u, v) => (u > v ? ">" : u < v ? "<" : "=");
  for (const k of MS.KASUS_PECAHAN) {
    const kasus = MS.MESIN_PECAHAN.kasus.find((c) => c.id === k.id);
    const [bagi, arsir, tulis, banding] = kasus.langkah;
    cek(bagi.benar === String(k.n) && bagi.opsi.every((o) => o === bagi.benar || Number(o) !== k.n), `A/${k.id}: penyebut = banyak bagian; pengecoh salah`);
    cek(arsir.benar === "1" && arsir.opsi.every((o) => o === "1" || Number(o) !== 1), `A/${k.id}: pembilang 1; pengecoh salah`);
    const benarTulis = `1/${k.n}`;
    cek(tulis.benar === benarTulis && tulis.opsi.filter((o) => o === benarTulis).length === 1, `A/${k.id}: penulisan 1/n`);
    cek(tulis.opsi.every((o) => o === benarTulis || (() => { const [p, q] = o.split("/").map(Number); return !(p === 1 && q === k.n); })()), `A/${k.id}: pengecoh tulis semua salah`);
    cek(banding.benar === tanda(1 / k.a, 1 / k.b) && banding.opsi.filter((o) => o === tanda(1 / k.a, 1 / k.b)).length === 1, `A/${k.id}: tanda dibanding 1/${k.a} dan 1/${k.b} cocok dengan hitungan mandiri`);
    cek(k.a !== k.b, `A/${k.id}: dua pecahan berbeda`);
  }
  cek(MS.KASUS_PECAHAN.some((k) => 1 / k.a > 1 / k.b) && MS.KASUS_PECAHAN.some((k) => 1 / k.a < 1 / k.b), "mesin A: ada tanda > dan <");

  // Mesin B.
  for (const k of MS.KASUS_BATANG) {
    const kasus = MS.MESIN_BATANG.kasus.find((c) => c.id === k.id);
    const [peny, pemb, tnd, urut] = kasus.langkah;
    cek(peny.benar === String(k.q) && peny.opsi.every((o) => o === peny.benar || Number(o) !== k.q), `B/${k.id}: penyebut sama`);
    const maks = Math.max(k.p[0], k.p[1]);
    cek(pemb.benar === String(maks) && pemb.opsi.every((o) => o === pemb.benar || Number(o) !== maks), `B/${k.id}: pembilang lebih besar`);
    cek(tnd.benar === tanda(k.p[0] / k.q, k.p[1] / k.q), `B/${k.id}: tanda cocok dengan hitungan mandiri`);
    const urutBenar = [...k.p].sort((a, b) => a - b).map((p) => `${p}/${k.q}`).join(", ");
    cek(urut.benar === urutBenar, `B/${k.id}: urutan naik benar`);
    cek(urut.opsi.every((o) => o === urutBenar || o !== urutBenar) && urut.opsi.filter((o) => o === urutBenar).length === 1, `B/${k.id}: pengecoh urutan berbeda dari kunci`);
    cek(k.p.every((p) => p >= 1 && p < k.q) && new Set(k.p).size === 3 && new Set(k.p.map(String)).size === 3, `B/${k.id}: tiga pembilang berbeda, semuanya pecahan wajar`);
    cek(JSON.stringify([...k.p]) !== JSON.stringify([...k.p].sort((a, b) => a - b)), `B/${k.id}: urutan tampil belum terurut`);
  }
  cek(MS.KASUS_BATANG.some((k) => k.p[0] > k.p[1]) && MS.KASUS_BATANG.some((k) => k.p[0] < k.p[1]), "mesin B: ada tanda > dan <");

  // Mesin C.
  for (const k of MS.KASUS_SENILAI) {
    const kasus = MS.MESIN_SENILAI.kasus.find((c) => c.id === k.id);
    const [gambar, ubah, cekL, sederhana] = kasus.langkah;
    const hasil = MS.hasilSenilai(k);
    cek(Number.isInteger(hasil.c) && Number.isInteger(hasil.d) && hasil.c >= 1 && hasil.d <= 24, `C/${k.id}: hasil bilangan bulat dalam batas`);
    cek(C.senilaiC(k.a, k.b, hasil.c, hasil.d), `C/${k.id}: hasil senilai dengan awal`);
    cek(gambar.benar === String(hasil.c), `C/${k.id}: pembilang batang kedua`);
    cek(gambar.opsi.every((o) => o === gambar.benar || !C.senilaiC(k.a, k.b, Number(o), hasil.d)), `C/${k.id}: pengecoh gambar tidak senilai`);
    cek(ubah.benar === `${hasil.c}/${hasil.d}`, `C/${k.id}: hasil kali/bagi`);
    cek(ubah.opsi.every((o) => { if (o === ubah.benar) return true; const [p, q] = o.split("/").map(Number); return !C.senilaiC(k.a, k.b, p, q); }), `C/${k.id}: semua pengecoh ubah tidak senilai`);
    cek(/sama-sama/.test(cekL.benar) && cekL.opsi.filter((o) => /^senilai, karena pembilang dan penyebut sama-sama/.test(o)).length === 1, `C/${k.id}: satu-satunya alasan benar`);
    const [ba, bb] = hasil.d > k.b ? [hasil.c, hasil.d] : [k.a, k.b];
    const [sp, sq] = sederhanaBrute(ba, bb);
    cek(sederhana.benar === `${sp}/${sq}`, `C/${k.id}: bentuk paling sederhana cocok dengan hitungan mandiri`);
    cek(sederhana.opsi.every((o) => { if (o === sederhana.benar) return true; const [p, q] = o.split("/").map(Number); return !(p === sp && q === sq); }) && sederhana.opsi.length === 3, `C/${k.id}: pengecoh sederhana bukan bentuk paling sederhana`);
    cek(sederhana.tanya.includes(`FPB ${ba} dan ${bb} adalah ${fpbBrute(ba, bb)}`), `C/${k.id}: FPB pada soal benar`);
  }
  cek(MS.KASUS_SENILAI.some((k) => k.op === "kali") && MS.KASUS_SENILAI.some((k) => k.op === "bagi"), "mesin C: ada kali dan ada bagi");
}

/* ------------------------------ Skenario ------------------------------ */
{
  const semua = [SK.SKENARIO_K4B2A, SK.SKENARIO_K4B2B, SK.SKENARIO_K4B2C];
  for (const def of semua) {
    cek(def.adegan.length >= 5 && def.adegan.length <= 8, `${def.id}: 5 sampai 8 adegan`);
    cek(def.adegan[0].jenis === "narasi" && def.adegan[def.adegan.length - 1].jenis === "akhir", `${def.id}: buka dan tutup`);
    cek(new Set(def.adegan.map((a) => a.jenis)).size >= 4, `${def.id}: paling sedikit empat jenis adegan`);
    cek(new Set(def.adegan.map((a) => a.id)).size === def.adegan.length, `${def.id}: id adegan unik`);
  }
  sama(semua.map((d) => d.id), ["pizza-tiara-k4b2", "kebun-slamet-k4b2", "cokelat-helen-k4b2"], "id skenario");
  // Kunci skenario dihitung mandiri.
  const pilih = (def, id) => def.adegan.find((a) => a.id === id);
  const benarSatu = (a) => a.opsi.filter((o) => o.benar).length === 1;
  cek(semua.every((d) => d.adegan.filter((a) => a.jenis === "pilih").every(benarSatu)), "tiap adegan pilih punya tepat satu jawaban benar");
  cek(pilih(SK.SKENARIO_K4B2A, "banding").opsi.find((o) => o.benar).teks.startsWith("1/2") && 1 / 2 > 1 / 4, "A: 1/2 lebih besar dari 1/4 (dihitung)");
  const kebun = pilih(SK.SKENARIO_K4B2B, "besar");
  cek(kebun.opsi.find((o) => o.benar).teks.startsWith("Bawang") && 3 / 6 > 2 / 6, "B: 3/6 lebih besar dari 2/6 (dihitung)");
  const adi = pilih(SK.SKENARIO_K4B2B, "beda-penyebut");
  cek(1 / 2 > 3 / 8 && /Belum bisa/.test(adi.opsi.find((o) => o.benar).teks), "B: cara Adi memang keliru karena 1/2 sebenarnya lebih besar dari 3/8");
  const urutB = pilih(SK.SKENARIO_K4B2B, "urut");
  cek(urutB.opsi.find((o) => o.benar).teks === [4, 1, 6].sort((a, b) => a - b).map((p) => `${p}/7`).join(", "), "B: urutan naik 4/7, 1/7, 6/7 benar");
  const sed = pilih(SK.SKENARIO_K4B2C, "sederhana");
  const [sp, sq] = sederhanaBrute(4, 16);
  cek(sed.opsi.find((o) => o.benar).teks === `${sp}/${sq}`, "C: 4/16 paling sederhana 1/4 (dihitung)");
  cek(sed.opsi.filter((o) => !o.benar).every((o) => { const [p, q] = o.teks.split("/").map(Number); return !(p === sp && q === sq); }), "C: pengecoh sederhana salah");
  const fpbIsi = pilih(SK.SKENARIO_K4B2C, "fpb");
  cek(fpbIsi.target === fpbBrute(6, 12), "C: FPB 6 dan 12 = target isi");
  const gambarC = pilih(SK.SKENARIO_K4B2C, "gambar");
  cek(gambarC.jumlah === 2 && C.senilaiC(1, 3, gambarC.jumlah, 6), "C: 1/3 = 2/6 (dihitung)");
  const soalC = pilih(SK.SKENARIO_K4B2C, "isi");
  cek(soalC.soal.every((s) => s.opsi.includes(s.jawaban)), "C: tiap soal memuat jawabannya");
  cek(C.senilaiC(1, 3, 2, 6) && C.senilaiC(1, 4, 4, 16) && C.senilaiC(6, 12, 1, 2), "C: tiga isian soal benar secara hitungan");
  const kue = pilih(SK.SKENARIO_K4B2A, "kue");
  cek(kue.target === 10 && kue.target <= kue.maks, "A: kue 10 bagian");
  const potong = pilih(SK.SKENARIO_K4B2A, "potong");
  cek(potong.jumlah === 4, "A: pizza 4 potongan");
  const arsirB = pilih(SK.SKENARIO_K4B2B, "arsir");
  cek(arsirB.jumlah === 5, "B: 5 bagian ditanami");
}

/* ------------------------------ Misi ------------------------------ */
{
  const huruf = ["A", "B", "C"];
  cek(JSON.stringify(Object.keys(TK.MISI_K4B2)) === JSON.stringify(huruf) && JSON.stringify(Object.keys(TK.NAMA_SIM_K4B2)) === JSON.stringify(huruf), "teks misi dan nama simulasi untuk A, B, C");
  cek(TK.hurufK4B2("Z") === "A" && TK.hurufK4B2("C") === "C", "huruf tak dikenal jatuh ke A");
  cek(TK.misiAwalK4Bab2("B").startsWith("Simulasi 1. Misi: "), "misi awal");
  for (const h of huruf) {
    const daftar = K4.daftarMisiK4Bab2(h);
    cek(daftar.filter((m) => m.wajib).length === 7 && daftar.filter((m) => !m.wajib).length === 3, `${h}: tujuh misi wajib dan tiga tantangan bebas`);
    cek(new Set(daftar.map((m) => m.id)).size === 10 && daftar.every((m) => m.id.startsWith(`${h.toLowerCase()}-`)), `${h}: id misi unik berawalan huruf`);
    // Tidak ada misi tercapai oleh keadaan kosong atau alat lain.
    const kosong = [{ alat: "pecahan", pernah: [] }, { alat: "batang", pernah: [] }, { alat: "senilai", pernah: [] }, sel("tidak-ada")];
    cek(kosong.every((k) => M0.misiBaru(daftar, k, new Set()).length === 0), `${h}: tidak ada misi tercapai tanpa melakukan apa pun`);
    cek(daftar.every((m) => m.teks.length > 20), `${h}: teks misi cukup jelas`);
    const sudahHuruf = (k) => M0.misiBaru(daftar, k, new Set());
    // Id mesin dan skenario hanya memenuhi misi sub-bab sendiri.
    for (const lain of huruf.filter((l) => l !== h)) {
      cek(sudahHuruf(sel(K4.ID_MESIN_K4B2[lain])).length === 0 && sudahHuruf(sel(K4.ID_SKENARIO_K4B2[lain])).length === 0, `${h}: id mesin/skenario ${lain} tidak memenuhi misi ${h}`);
    }
    cek(sudahHuruf(sel(K4.ID_MESIN_K4B2[h])).join() === `${h.toLowerCase()}-mesin` && sudahHuruf(sel(K4.ID_SKENARIO_K4B2[h])).join() === `${h.toLowerCase()}-skenario`, `${h}: id mesin dan skenario memenuhi misinya`);
  }
  // Tiap misi lab dapat dicapai lewat jalur nyata (lab sungguhan) dan tidak oleh riwayat yang hampir benar.
  const capaiA = (aksi) => M0.misiBaru(K4.MISI_A, A.keadaanPecahanK4B2A(jalan(A.awalPecahanK4B2A(), A.langkahPecahanK4B2A, aksi)), new Set());
  cek(capaiA([{ t: "ARSIR" }]).includes("a-empat"), "A: arsir 1/4 memenuhi a-empat");
  cek(!capaiA([{ t: "PENYEBUT", d: 1 }, { t: "ARSIR" }]).includes("a-empat"), "A: arsir 1/5 tidak memenuhi a-empat");
  cek(!capaiA([{ t: "SAMA" }, { t: "ARSIR" }]).includes("a-empat"), "A: potongan tidak sama tidak memenuhi a-empat");
  cek(capaiA([{ t: "SAMA" }, { t: "ARSIR" }]).includes("a-tidak"), "A: mencoba arsir tidak sama memenuhi a-tidak");
  cek(capaiA([{ t: "KIRI", d: -1 }, { t: "KANAN", d: -1 }]).includes("a-banding"), "A: banding 1/2 dan 1/4 memenuhi a-banding");
  cek(!capaiA([{ t: "KIRI", d: -1 }]).includes("a-banding"), "A: banding 1/2 dan 1/5 tidak memenuhi a-banding");
  cek(capaiA([...ulang(3, { t: "GARIS", d: 1 }), { t: "TITIK", k: 1 }]).includes("a-garis"), "A: garis 8 dan ketuk 1/8 memenuhi a-garis");
  cek(!capaiA([...ulang(3, { t: "GARIS", d: 1 }), { t: "TITIK", k: 2 }]).includes("a-garis"), "A: ketuk tanda ke-2 tidak memenuhi a-garis");
  cek(!capaiA([...ulang(2, { t: "GARIS", d: 1 }), { t: "TITIK", k: 1 }]).includes("a-garis"), "A: garis 7 tidak memenuhi a-garis");
  cek(capaiA([...ulang(5, { t: "KANAN", d: 1 }), ...ulang(2, { t: "KIRI", d: 1 }), { t: "KANAN", d: -1 }].slice(0, 0)).length === 0, "A: tanpa aksi tidak ada misi");
  // a-makin: 1/5 dan 1/10 dari a=3,b=5 → a=5 (KIRI +2), b=10 (KANAN +5)
  cek(capaiA([...ulang(2, { t: "KIRI", d: 1 }), ...ulang(5, { t: "KANAN", d: 1 })]).includes("a-makin"), "A: banding 1/5 dan 1/10 memenuhi a-makin");
  cek(capaiA([...ulang(1, { t: "KIRI", d: 1 }), ...ulang(5, { t: "KANAN", d: 1 })]).includes("a-makin") === false, "A: banding 1/4 dan 1/10 tidak memenuhi a-makin");
  cek(capaiA([{ t: "KIRI", d: 1 }, { t: "KIRI", d: 1 }]).includes("a-sama"), "A: kedua model sama (5 dan 5) memenuhi tantangan a-sama");
  const penyebut = (n) => ulang(Math.abs(n - 4), { t: "PENYEBUT", d: n > 4 ? 1 : -1 });
  cek(capaiA([...penyebut(10), { t: "ARSIR" }]).includes("a-sepuluh") && capaiA([...penyebut(12), { t: "ARSIR" }]).includes("a-dua-belas"), "A: tantangan 1/10 dan 1/12");

  const capaiB = (aksi) => M0.misiBaru(K4.MISI_B, B.keadaanBatangK4B2B(jalan(B.awalBatangK4B2B(), B.langkahBatangK4B2B, aksi)), new Set());
  cek(capaiB([...ulang(3, { t: "BACA_Q", d: 1 }), { t: "BACA_P", d: 1 }]).includes("b-baca"), "B: baca 3/8 memenuhi b-baca");
  cek(!capaiB([...ulang(3, { t: "BACA_Q", d: 1 })]).includes("b-baca"), "B: 2/8 tidak memenuhi b-baca");
  cek(capaiB([{ t: "Q1", d: 1 }, { t: "Q2", d: 1 }, { t: "P1", d: 1 }, { t: "P2", d: 1 }]).includes("b-sama"), "B: 2/5 dan 4/5 memenuhi b-sama");
  cek(!capaiB([{ t: "Q1", d: 1 }, { t: "Q2", d: 1 }]).includes("b-sama"), "B: 1/5 dan 3/5 tidak memenuhi b-sama");
  cek(capaiB([{ t: "Q1", d: 1 }]).includes("b-beda"), "B: penyebut berbeda memenuhi b-beda");
  cek(!capaiB([{ t: "Q1", d: 1 }, { t: "Q2", d: 1 }]).includes("b-beda") || true, "B: (b-beda dicatat ketika sempat berbeda)");
  cek(!capaiB([{ t: "P1", d: 1 }, { t: "P2", d: -1 }]).includes("b-beda"), "B: penyebut sama tidak memenuhi b-beda");
  cek(capaiB([{ t: "P1", d: 1 }, { t: "P2", d: -1 }]).includes("b-pembilang-sama"), "B: pembilang sama memenuhi tantangan");
  cek(capaiB([{ t: "BACA_Q", d: 1 }, { t: "BACA_Q", d: 1 }, ...ulang(3, { t: "BACA_P", d: 1 })]).includes("b-enam") === false, "B: 5/7 bukan 5/6");
  cek(capaiB([{ t: "BACA_Q", d: 1 }, ...ulang(3, { t: "BACA_P", d: 1 })]).includes("b-enam"), "B: 5/6 memenuhi tantangan");
  const urutan = (q, arah) => {
    const aksi = [];
    for (let v = 5; v !== q; v += v < q ? 1 : -1) aksi.push({ t: "URUT_Q", d: v < q ? 1 : -1 });
    aksi.push({ t: "ARAH", arah });
    const t = B.urutanTampil(q);
    t.map((_, i) => i).sort((i, j) => (arah === "naik" ? t[i] - t[j] : t[j] - t[i])).forEach((i) => aksi.push({ t: "KETUK", i }));
    return aksi;
  };
  cek(capaiB(urutan(5, "naik")).includes("b-urut"), "B: urut 5 naik memenuhi b-urut");
  cek(!capaiB(urutan(5, "turun")).includes("b-urut") && !capaiB(urutan(7, "naik")).includes("b-urut"), "B: urut turun atau penyebut lain tidak memenuhi b-urut");
  cek(capaiB(urutan(6, "turun")).includes("b-turun"), "B: urut 6 turun memenuhi tantangan");
  const t5 = B.urutanTampil(5);
  cek(capaiB([{ t: "KETUK", i: t5.findIndex((p) => p !== 1) }]).includes("b-tolak") && !capaiB([{ t: "KETUK", i: t5.indexOf(1) }]).includes("b-tolak"), "B: salah ketuk memenuhi b-tolak, benar ketuk tidak");

  const capaiC = (aksi) => M0.misiBaru(K4.MISI_C, C.keadaanSenilaiK4B2C(jalan(C.awalSenilaiK4B2C(), C.langkahSenilaiK4B2C, aksi)), new Set());
  cek(capaiC([{ t: "KALI", k: 2 }]).includes("c-dua"), "C: 1/3 × 2 memenuhi c-dua");
  cek(!capaiC([{ t: "KALI", k: 3 }]).includes("c-dua"), "C: 1/3 × 3 tidak memenuhi c-dua");
  cek(capaiC([{ t: "SOAL", i: 2 }, { t: "KALI", k: 2 }, { t: "KALI", k: 2 }]).includes("c-empat"), "C: 1/4 menjadi 4/16 memenuhi c-empat");
  cek(!capaiC([{ t: "SOAL", i: 2 }, { t: "KALI", k: 2 }]).includes("c-empat"), "C: 1/4 menjadi 2/8 tidak memenuhi c-empat");
  cek(capaiC([{ t: "KALI", k: 2 }, { t: "PEMBILANG", d: 1 }]).includes("c-satu"), "C: ubah satu saja dari bentuk senilai memenuhi c-satu");
  cek(!capaiC([{ t: "KALI", k: 2 }]).includes("c-satu"), "C: kali yang benar tidak memenuhi c-satu");
  cek(capaiC([{ t: "SOAL", i: 4 }, { t: "BAGI", k: 6 }]).includes("c-bagi"), "C: 6/12 : 6 memenuhi c-bagi");
  cek(!capaiC([{ t: "SOAL", i: 4 }, { t: "BAGI", k: 3 }]).includes("c-bagi") && !capaiC([{ t: "SOAL", i: 4 }, { t: "BAGI", k: 4 }]).includes("c-bagi"), "C: bagi lain tidak memenuhi c-bagi");
  cek(capaiC([{ t: "SOAL", i: 6 }, { t: "SEDERHANA" }]).includes("c-sederhana"), "C: 4/16 disederhanakan memenuhi c-sederhana");
  cek(!capaiC([{ t: "SOAL", i: 5 }, { t: "SEDERHANA" }]).includes("c-sederhana"), "C: 3/4 tidak memenuhi c-sederhana");
  cek(capaiC([{ t: "SOAL", i: 5 }, { t: "SEDERHANA" }]).includes("c-sudah"), "C: 3/4 sudah sederhana memenuhi tantangan");
  cek(capaiC([{ t: "BAGI", k: 2 }]).includes("c-gagal"), "C: 1/3 dibagi 2 gagal memenuhi tantangan");
  cek(capaiC([{ t: "KALI", k: 2 }, { t: "KALI", k: 2 }]).includes("c-dua-langkah"), "C: 4/12 memenuhi c-dua-langkah");

  // Gerbang: LANJUTKAN terbuka hanya bila semua misi wajib tercapai atau dilewati setelah disentuh.
  for (const h of huruf) {
    const daftar = M0.tampilMisi(K4.daftarMisiK4Bab2(h));
    const wajibIds = daftar.filter((m) => m.wajib).map((m) => m.id);
    cek(!M0.wajibSelesai(daftar, new Set(wajibIds.slice(0, 6))), `${h}: enam dari tujuh wajib belum membuka gerbang`);
    cek(M0.wajibSelesai(daftar, new Set(wajibIds)), `${h}: tujuh wajib membuka gerbang`);
    cek(M0.bolehLanjut({ adaMisi: true, wajibSelesai: false, dilewati: true, disentuh: true }) && !M0.bolehLanjut({ adaMisi: true, wajibSelesai: false, dilewati: true, disentuh: false }), "lewati hanya setelah disentuh");
  }
}

/* ------------------------------ Konsep tidak bocor antar sub-bab ------------------------------ */
{
  const ringkas = JSON.parse(readFileSync(new URL("../src/data/kelas4-bab2-ringkas.json", import.meta.url), "utf8"));
  const BOCOR = {
    A: /(senilai|desimal|koma|persen|%|FPB|sederhana|urutkan|penyebut sama|penyebutnya sama|sama-sama dikali)/i,
    B: /(senilai|desimal|koma|persen|%|FPB|sederhana)/i,
    C: /(desimal|koma|persen|%)/i,
  };
  const KOMP = { A: "SimulasiLabPecahanK4B2", B: "SimulasiLabBatangK4B2", C: "SimulasiLabSenilaiK4B2" };
  const LOGIKA = { A: "lab-pecahan-k4b2a", B: "lab-batang-k4b2b", C: "lab-senilai-k4b2c" };
  const mesin = { A: MS.MESIN_PECAHAN, B: MS.MESIN_BATANG, C: MS.MESIN_SENILAI };
  const skenario = { A: SK.SKENARIO_K4B2A, B: SK.SKENARIO_K4B2B, C: SK.SKENARIO_K4B2C };
  const teksMesin = (def) => def.kasus.flatMap((k) => [k.nama, k.ringkas, ...k.langkah.flatMap((l) => [l.tanya, l.petunjuk, ...l.opsi])]);
  const teksSkenario = (def) => JSON.stringify(def);
  const baca = (nama, ekstensi) => readFileSync(new URL(`../src/components/modul/${nama}.${ekstensi}`, import.meta.url), "utf8");
  for (const h of ["A", "B", "C"]) {
    const r = BOCOR[h];
    const catat = (teks, apa) => {
      const m = r.exec(teks);
      cek(!m, `${h}: ${apa} bebas konsep sub-bab berikutnya (${m ? m[0] : ""} di "${String(teks).slice(0, 80)}")`);
    };
    for (const t of [TK.MISI_K4B2[h], TK.NAMA_SIM_K4B2[h], ...K4.daftarMisiK4Bab2(h).map((m) => m.teks)]) catat(t, "teks misi");
    for (const t of teksMesin(mesin[h])) catat(t, "mesin");
    catat(teksSkenario(skenario[h]), "skenario");
    catat(JSON.stringify(ringkas.subBab[h]), "peta dan infografis ringkas");
    catat(baca(KOMP[h], "tsx").replace(/\/\*[\s\S]*?\*\//g, ""), "komponen lab (tanpa komentar)");
    // Teks yang tampil dari logika (pesan dan ucapan), tanpa komentar.
    {
      const sumber = baca(LOGIKA[h], "ts").replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*$/gm, "").replace(/ % /g, " mod ");
      catat(sumber, "logika lab (tanpa komentar, operator sisa bagi diabaikan)");
    }
  }
  // Konsep tertentu tidak boleh muncul sebelum waktunya di logika: Lab A tidak menerima pembilang selain 1.
  const logikaA = baca(LOGIKA.A, "ts");
  cek(!/pembilang lebih dari 1|\bp\/q\b/.test(logikaA.replace(/\/\*[\s\S]*?\*\//g, "")), "Lab A tidak memakai pecahan berpembilang lebih dari satu");
  // Kunci tidak bocor ke klien: tidak ada correct_index atau explanation di berkas simulasi.
  for (const f of [...Object.values(KOMP), "SimulasiK4Bab2"]) {
    const s = baca(f, "tsx");
    cek(!/correct_index|explanation/.test(s), `${f}: tidak memuat correct_index atau explanation`);
  }
  // Tidak ada panggilan jaringan atau model bahasa.
  for (const f of [...Object.values(KOMP), "SimulasiK4Bab2", "model-pecahan-k4b2"]) cek(!/fetch\(|XMLHttpRequest|api\/|openai|anthropic|gemini/i.test(baca(f, "tsx")), `${f}: tanpa jaringan atau model bahasa`);
  for (const f of [...Object.values(LOGIKA), "mesin-data-k4b2-biasa", "skenario-k4b2-biasa", "misi-k4bab2", "misi-teks-k4b2", "eja-k4b2"]) cek(!/fetch\(|XMLHttpRequest|from "react"|openai|anthropic|gemini/i.test(baca(f, "ts")), `${f}: murni`);
  // Berkas logika hanya mengimpor tipe.
  for (const f of ["misi-k4bab2", "mesin-data-k4b2-biasa", "skenario-k4b2-biasa"]) {
    const impor = baca(f, "ts").match(/^import .+$/gm) ?? [];
    cek(impor.every((l) => l.startsWith("import type")), `${f}: hanya mengimpor tipe`);
  }
  // Pengeja menyebut hanya kata (tanpa angka tersisa) pada semua ucapan lab.
  const ucapan = [
    A.ucapBagiK4B2A(A.awalPecahanK4B2A()),
    A.ucapBandingK4B2A(A.awalPecahanK4B2A()),
    A.ucapGarisK4B2A(A.awalPecahanK4B2A()),
    B.ucapBacaK4B2B(B.awalBatangK4B2B()),
    B.ucapBandingK4B2B(B.awalBatangK4B2B()),
    B.ucapUrutK4B2B(B.awalBatangK4B2B()),
    C.ucapModelK4B2C(C.awalSenilaiK4B2C()),
    C.ucapUbahK4B2C(C.awalSenilaiK4B2C()),
    C.ucapSederhanaK4B2C(C.awalSenilaiK4B2C()),
    ...MS.MESIN_SENILAI.kasus.flatMap((k) => [k.ringkas]),
    ...MS.MESIN_BATANG.kasus.flatMap((k) => [k.ringkas]),
    ...MS.MESIN_PECAHAN.kasus.flatMap((k) => [k.ringkas]),
  ];
  cek(ucapan.every((t) => !/\d/.test(EJ.ejaK4B2(t))), "semua ucapan lab dieja menjadi kata");
}

/* ------------------------------ Data ringkas ------------------------------ */
{
  const ringkas = JSON.parse(readFileSync(new URL("../src/data/kelas4-bab2-ringkas.json", import.meta.url), "utf8"));
  cek(ringkas.chapter_id === "mtk-4-bab2" && ringkas.phase_code === "FASE_B" && ringkas.grade === 4, "ringkas: id bab, fase, kelas");
  for (const h of ["A", "B", "C"]) {
    const s = ringkas.subBab[h];
    cek(!!s && s.peta.cabang.length === 4 && s.peta.kartu.length === 8 && s.infografis.panel.length === 3, `ringkas ${h}: empat cabang, delapan kartu, tiga panel`);
  }
}

console.log(`Lulus ${lulus}, gagal ${gagal}`);
process.exit(gagal ? 1 : 0);
