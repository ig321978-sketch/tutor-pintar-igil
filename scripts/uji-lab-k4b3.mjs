// Uji Simulasi Kelas 4 Bab 3 (Pola Gambar dan Pola Bilangan): pengeja, lab tiap sub-bab, mesin, skenario, misi,
// gerbang, dan konsep tidak bocor antar sub-bab.
// Jalankan: node --no-warnings scripts/uji-lab-k4b3.mjs
import { readFileSync } from "node:fs";
import * as M0 from "../src/components/modul/misi-simulasi.ts";
import * as K4 from "../src/components/modul/misi-k4bab3.ts";
import * as TK from "../src/components/modul/misi-teks-k4b3.ts";
import * as A from "../src/components/modul/lab-pola-gambar-k4b3a.ts";
import * as B from "../src/components/modul/lab-pola-bilangan-k4b3b.ts";
import * as MS from "../src/components/modul/mesin-data-k4b3.ts";
import * as SK from "../src/components/modul/skenario-k4b3.ts";
import * as ME from "../src/components/modul/mesin-bertahap-k3b1.ts";
import * as EJ from "../src/components/modul/eja-k4b3.ts";

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
const tanpaAngka = (t) => !/\d/.test(EJ.ejaK4B3(t));

/* ------------------------------ Hitungan MANDIRI ------------------------------ */
// Beda dari suku pertama dan terakhir (bukan dari dua suku pertama), dan semua selisih berurutan harus sama.
const bedaMandiri = (s) => {
  const d = (s[s.length - 1] - s[0]) / (s.length - 1);
  for (let i = 1; i < s.length; i += 1) if (s[i] - s[i - 1] !== d) return NaN;
  return d;
};
// Suku ke-n dengan rumus a + (n − 1) × d (kode memakai penjumlahan langkah demi langkah).
const sukuKe = (s, n) => s[0] + (n - 1) * bedaMandiri(s);
// Jenis pola dari jumlah semua selisih (bukan dari dua suku pertama).
const jenisMandiri = (s) => {
  let t = 0;
  for (let i = 1; i < s.length; i += 1) t += s[i] - s[i - 1];
  return t > 0 ? "membesar" : t < 0 ? "mengecil" : "tetap";
};
const tandaMandiri = (d) => (d === 0 ? "0" : `${d > 0 ? "+" : "−"}${Math.abs(d)}`);

/* ------------------------------ Pengeja ------------------------------ */
{
  sama(EJ.ejaK4B3("+2"), "tambah dua", "eja +2");
  sama(EJ.ejaK4B3("selisih −5"), "selisih kurang lima", "eja −5");
  sama(EJ.ejaK4B3("kumpulan ke-7"), "kumpulan ketujuh", "eja ke-7");
  sama(EJ.ejaK4B3("kumpulan ke-1"), "kumpulan pertama", "eja ke-1");
  sama(EJ.ejaK4B3("suku ke-12"), "suku kedua belas", "eja ke-12");
  sama(EJ.ejaK4B3("6 + 2 = 8"), "enam ditambah dua sama dengan delapan", "eja tambah");
  sama(EJ.ejaK4B3("16 − 4 = 12"), "enam belas dikurangi empat sama dengan dua belas", "eja kurang");
  sama(EJ.ejaK4B3("23, 18, 13, …"), "dua puluh tiga, delapan belas, tiga belas, titik-titik", "eja deret");
  cek(tanpaAngka("Selisih −3 sampai +3. Kumpulan ke-10 berisi 120."), "eja tidak menyisakan angka");
  let ok = true;
  for (let n = 0; n <= 200; n += 1) if (/\d/.test(EJ.kataBilK4B3(n))) ok = false;
  cek(ok, "kata bilangan 0 sampai 200 tanpa angka");
}

/* ------------------------------ Lab A: Pola Gambar ------------------------------ */
{
  // Data pola: selisih tetap (hitungan mandiri), nilai paling banyak 20, selisih paling besar 3.
  for (const p of A.POLA_A) {
    const d = bedaMandiri(p.awal);
    cek(Number.isInteger(d) && d !== 0, `${p.id}: selisih tetap dan bukan nol (${d})`);
    cek(A.selisihA(p.awal) === d, `${p.id}: selisih lab sama dengan hitungan mandiri`);
    cek(A.jenisDari(p.awal) === jenisMandiri(p.awal), `${p.id}: jenis lab sama dengan hitungan mandiri`);
    cek(A.berikutA(p.awal) === sukuKe(p.awal, p.awal.length + 1), `${p.id}: kumpulan berikutnya = a + n × d`);
    cek(p.awal.every((v) => v >= 0 && v <= 20) && Math.abs(d) <= 3, `${p.id}: nilai 0 sampai 20, selisih paling besar 3`);
    cek(A.teksBeda(d) === tandaMandiri(d), `${p.id}: teks selisih bertanda`);
  }
  cek(A.POLA_A.some((p) => bedaMandiri(p.awal) > 0) && A.POLA_A.some((p) => bedaMandiri(p.awal) < 0), "ada pola membesar dan mengecil");
  sama(A.POLA_A.find((p) => p.id === "jeruk").awal, [2, 4, 6], "jeruk dari buku");
  sama(A.POLA_A.find((p) => p.id === "permen").awal, [9, 7, 5], "permen dari buku");

  const x0 = A.awalPolaGambarK4B3A();
  cek(x0.pernah.length === 0 && x0.pesan === "", "awal Lab A: tanpa riwayat dan tanpa pesan");
  // Lanjut: kunci dihitung, near-miss dan arah terbalik ditolak.
  for (let i = 0; i < A.POLA_A.length; i += 1) {
    const p = A.POLA_A[i];
    const kunci = sukuKe(p.awal, 4);
    const isi = (n) => jalan(x0, A.langkahPolaGambarK4B3A, [{ t: "L_POLA", i }, ...ulang(n, { t: "L_ISI", d: 1 }), { t: "L_CEK" }]);
    const benar = isi(kunci);
    cek(benar.pernah.includes(`lanjut:${p.id}`) && benar.pesan.startsWith("✅"), `Lanjut ${p.id}: ${kunci} diterima`);
    for (const salah of [kunci - 1, kunci + 1, kunci - 2 * bedaMandiri(p.awal)]) {
      if (salah < 0 || salah > A.MAKS_ISI) continue;
      const t = isi(salah);
      cek(!t.pernah.includes(`lanjut:${p.id}`) && !t.pesan.startsWith("✅"), `Lanjut ${p.id}: ${salah} ditolak`);
    }
    const terbalik = isi(p.awal[2] - bedaMandiri(p.awal));
    cek(/terbalik/.test(terbalik.pesan), `Lanjut ${p.id}: arah terbalik dijelaskan`);
  }
  cek(jalan(x0, A.langkahPolaGambarK4B3A, ulang(25, { t: "L_ISI", d: 1 })).isi === A.MAKS_ISI, "isi paling banyak 20");
  cek(A.langkahPolaGambarK4B3A(x0, { t: "L_ISI", d: -1 }).isi === 0, "isi tidak kurang dari nol");
  cek(A.langkahPolaGambarK4B3A(x0, { t: "L_POLA", i: 9 }) === x0, "pola di luar daftar diabaikan");

  // Tabel: tiap baris sama dengan a + (n − 1) × d; pola mengecil berhenti sebelum kurang dari nol.
  for (let tp = 0; tp < A.TABEL_A.length; tp += 1) {
    const p = A.POLA_A[A.TABEL_A[tp]];
    let x = A.langkahPolaGambarK4B3A(x0, { t: "T_POLA", i: tp });
    let langkah = 0;
    while (langkah < 20) {
      langkah += 1;
      const kunci = sukuKe(p.awal, x.baris.length + 1);
      if (kunci < 0 || x.baris.length >= A.MAKS_BARIS) break;
      // Nilai salah ditolak lebih dulu.
      const salah = A.langkahPolaGambarK4B3A({ ...x, nilai: kunci + 1 }, { t: "T_TAMBAH" });
      cek(salah.baris.length === x.baris.length && !salah.pesan.startsWith("✅"), `Tabel ${p.id}: nilai ${kunci + 1} ditolak`);
      x = A.langkahPolaGambarK4B3A({ ...x, nilai: kunci }, { t: "T_TAMBAH" });
    }
    cek(x.baris.every((v, i) => v === sukuKe(p.awal, i + 1)), `Tabel ${p.id}: semua baris cocok dengan rumus mandiri`);
    if (bedaMandiri(p.awal) < 0) {
      const h = A.langkahPolaGambarK4B3A(x, { t: "T_TAMBAH" });
      cek(h.pernah.includes(`habis:${p.id}`) && /kurang dari nol/.test(h.pesan) && h.baris.length === x.baris.length, `Tabel ${p.id}: berhenti saat benda habis`);
      cek(x.baris[x.baris.length - 1] >= 0 && x.baris[x.baris.length - 1] + bedaMandiri(p.awal) < 0, `Tabel ${p.id}: baris terakhir tidak negatif`);
    } else cek(x.baris.length === A.MAKS_BARIS, `Tabel ${p.id}: tabel penuh di ${A.MAKS_BARIS}`);
  }
  const jeruk7 = jalan(x0, A.langkahPolaGambarK4B3A, ulang(4, 0).flatMap(() => [{ t: "T_NILAI", d: 1 }, { t: "T_NILAI", d: 1 }, { t: "T_TAMBAH" }]));
  cek(jeruk7.baris[6] === 14 && jeruk7.pernah.includes("tabel:jeruk:7"), "jeruk kumpulan ke-7 = 14 (buku)");
  const permenTabel = (n) => jalan(x0, A.langkahPolaGambarK4B3A, [{ t: "T_POLA", i: 1 }, ...Array.from({ length: n }, () => [{ t: "T_NILAI", d: -1 }, { t: "T_NILAI", d: -1 }, { t: "T_TAMBAH" }]).flat()]);
  cek(permenTabel(2).baris[4] === 1 && permenTabel(2).pernah.includes("tabel:permen:5"), "permen kumpulan ke-5 = 1 (buku)");

  // Buat: jenis dan penolakan dihitung mandiri untuk semua pasangan awal dan selisih.
  let okBuat = true;
  for (let awal = A.MIN_AWAL; awal <= A.MAKS_AWAL; awal += 1) {
    for (let beda = -A.MAKS_BEDA; beda <= A.MAKS_BEDA; beda += 1) {
      const s = A.kumpulanBuat(awal, beda);
      const x = A.langkahPolaGambarK4B3A({ ...x0, awal, beda }, { t: "B_CEK" });
      const negatif = awal + 3 * beda < 0;
      const j = jenisMandiri(s);
      if (negatif) {
        if (x.pernah.length !== 0 || x.pesan.startsWith("✅")) okBuat = false;
      } else if (j === "tetap") {
        if (!x.pernah.includes("buat:tetap")) okBuat = false;
      } else if (!x.pernah.includes(`buat:${j}:${beda}`) || !x.pesan.includes(j)) okBuat = false;
      if (s.some((v) => v > 20)) okBuat = false;
    }
  }
  cek(okBuat, "Buat: jenis cocok dengan hitungan mandiri, kurang dari nol ditolak, nilai paling banyak 20");

  // Fuzz.
  const acak = acakDari(31);
  let s = A.awalPolaGambarK4B3A();
  let ok = true;
  let pesanSemua = new Set();
  for (let i = 0; i < 20000 && ok; i += 1) {
    const r = acak(11);
    const dd = acak(2) ? 1 : -1;
    const aksi =
      r === 0 ? { t: "L_POLA", i: acak(7) - 1 } : r === 1 ? { t: "L_ISI", d: dd } : r === 2 ? { t: "L_CEK" } : r === 3 ? { t: "T_POLA", i: acak(5) - 1 } : r === 4 ? { t: "T_NILAI", d: dd } : r === 5 ? { t: "T_TAMBAH" } : r === 6 ? { t: "B_AWAL", d: dd } : r === 7 ? { t: "B_BEDA", d: dd } : r === 8 ? { t: "B_CEK" } : acak(60) === 0 ? { t: "RESET" } : { t: "PESAN_KOSONG" };
    const sebelum = s;
    s = A.langkahPolaGambarK4B3A(s, aksi);
    if (s.pesan) pesanSemua.add(s.pesan);
    if (aksi.t === "RESET") continue;
    for (const p of sebelum.pernah) if (!s.pernah.includes(p)) ok = false;
    if (!(s.isi >= 0 && s.isi <= A.MAKS_ISI && s.nilai >= 0 && s.awal >= A.MIN_AWAL && s.awal <= A.MAKS_AWAL && Math.abs(s.beda) <= A.MAKS_BEDA)) ok = false;
    const pt = A.POLA_A[A.TABEL_A[s.tp]];
    if (!s.baris.every((v, k) => v === sukuKe(pt.awal, k + 1) && v >= 0) || s.baris.length > A.MAKS_BARIS) ok = false;
    for (const p of s.pernah) {
      const m = /^tabel:([a-z]+):(\d+)$/.exec(p);
      if (m && !(Number(m[2]) >= 4 && Number(m[2]) <= A.MAKS_BARIS && sukuKe(A.POLA_A.find((q) => q.id === m[1]).awal, Number(m[2])) >= 0)) ok = false;
    }
  }
  cek(ok, "fuzz 20.000 aksi Lab Pola Gambar: batas terjaga, tabel selalu cocok rumus, riwayat tidak dicabut");
  cek([...pesanSemua].every(tanpaAngka), `semua pesan Lab A dieja menjadi kata (${pesanSemua.size} pesan)`);
  globalThis.__pesanA = [...pesanSemua];
  cek(A.keadaanPolaGambarK4B3A(x0).alat === "pola-gambar", "keadaan Lab A");
}

/* ------------------------------ Lab B: Pola Bilangan ------------------------------ */
{
  for (const d of B.DERET_B) {
    const b = bedaMandiri(d.suku);
    cek(Number.isInteger(b) && b !== 0 && B.bedaB(d.suku) === b, `${d.id}: beda tetap ${b} cocok dengan hitungan mandiri`);
    cek(d.nama === d.suku.join(", "), `${d.id}: nama sama dengan suku`);
  }
  for (const c of [...B.ATURAN_B, ...B.TABEL_B]) cek(Number.isInteger(bedaMandiri(c.catatan)) && bedaMandiri(c.catatan) !== 0, `${c.id}: catatan berbeda tetap`);
  sama(B.DERET_B.map((d) => d.suku), [[3, 5, 7, 9, 11], [1, 4, 7, 10], [23, 18, 13, 8], [32, 28, 24, 20, 16], [7, 19, 31, 43]], "deret dari buku");

  const x0 = B.awalPolaBilanganK4B3B();
  cek(x0.pernah.length === 0 && x0.pesan === "", "awal Lab B: tanpa riwayat dan tanpa pesan");
  // Selisih: harus ketuk semua pasangan dulu; beda benar diterima, tanda terbalik dan near-miss ditolak.
  for (let i = 0; i < B.DERET_B.length; i += 1) {
    const d = B.DERET_B[i];
    const b = bedaMandiri(d.suku);
    const atur = (v) => ulang(Math.abs(v), { t: "S_BEDA", d: v > 0 ? 1 : -1 });
    const ketukSemua = d.suku.slice(1).map((_, j) => ({ t: "S_KETUK", j }));
    const tanpaKetuk = jalan(x0, B.langkahPolaBilanganK4B3B, [{ t: "S_DERET", i }, ...atur(b), { t: "S_CEK" }]);
    cek(!tanpaKetuk.pernah.includes(`beda:${d.id}`) && /Ketuk dulu/.test(tanpaKetuk.pesan), `Selisih ${d.id}: belum mengetuk semua pasangan ditolak`);
    const kurangSatu = jalan(x0, B.langkahPolaBilanganK4B3B, [{ t: "S_DERET", i }, ...ketukSemua.slice(1), ...atur(b), { t: "S_CEK" }]);
    cek(!kurangSatu.pernah.includes(`beda:${d.id}`), `Selisih ${d.id}: satu pasangan belum diketuk ditolak`);
    const benar = jalan(x0, B.langkahPolaBilanganK4B3B, [{ t: "S_DERET", i }, ...ketukSemua, ...atur(b), { t: "S_CEK" }]);
    cek(benar.pernah.includes(`beda:${d.id}`) && benar.pesan.includes(jenisMandiri(d.suku)), `Selisih ${d.id}: beda ${b} diterima, jenis ${jenisMandiri(d.suku)}`);
    const balik = jalan(x0, B.langkahPolaBilanganK4B3B, [{ t: "S_DERET", i }, ...ketukSemua, ...atur(-b), { t: "S_CEK" }]);
    cek(balik.pernah.includes("tanda-salah") && !balik.pernah.includes(`beda:${d.id}`) && /terbalik/.test(balik.pesan), `Selisih ${d.id}: tanda terbalik ditolak dan dijelaskan`);
    for (const v of [b + 1, b - 1, 2 * b]) {
      if (Math.abs(v) > B.MAKS_BEDA) continue;
      const t = jalan(x0, B.langkahPolaBilanganK4B3B, [{ t: "S_DERET", i }, ...ketukSemua, ...atur(v), { t: "S_CEK" }]);
      cek(!t.pernah.includes(`beda:${d.id}`) && !t.pernah.includes("tanda-salah"), `Selisih ${d.id}: ${v} bukan beda dan bukan tanda terbalik`);
    }
    const tk = B.langkahPolaBilanganK4B3B(B.langkahPolaBilanganK4B3B(x0, { t: "S_DERET", i }), { t: "S_KETUK", j: 0 });
    cek(tk.pesan.includes(tandaMandiri(d.suku[1] - d.suku[0])), `Selisih ${d.id}: ketuk pasangan menampilkan selisihnya`);
  }

  // Aturan: rantai hanya tumbuh dengan aturan yang cocok; hasil = a + (n − 1) × d.
  for (let i = 0; i < B.ATURAN_B.length; i += 1) {
    const c = B.ATURAN_B[i];
    const b = bedaMandiri(c.catatan);
    const atur = (v) => ulang(Math.abs(v), { t: "A_ATURAN", d: v > 0 ? 1 : -1 });
    const salah = jalan(x0, B.langkahPolaBilanganK4B3B, [{ t: "A_POLA", i }, ...atur(b + 1), { t: "A_JALAN" }]);
    cek(salah.rantai.length === 1 && /tidak cocok/.test(salah.pesan), `Aturan ${c.id}: aturan ${b + 1} ditolak`);
    const terbalik = jalan(x0, B.langkahPolaBilanganK4B3B, [{ t: "A_POLA", i }, ...atur(-b), { t: "A_JALAN" }]);
    cek(terbalik.rantai.length === 1, `Aturan ${c.id}: aturan terbalik ditolak`);
    let x = jalan(x0, B.langkahPolaBilanganK4B3B, [{ t: "A_POLA", i }, ...atur(b), ...ulang(12, { t: "A_JALAN" })]);
    cek(x.rantai.every((v, k) => v === sukuKe(c.catatan, k + 1) && v >= 0), `Aturan ${c.id}: rantai cocok dengan rumus mandiri`);
    cek(x.rantai.length === B.MAKS_RANTAI || sukuKe(c.catatan, x.rantai.length + 1) < 0, `Aturan ${c.id}: berhenti di batas atau sebelum kurang dari nol`);
    const ubah = B.langkahPolaBilanganK4B3B(x, { t: "A_ATURAN", d: 1 });
    cek(ubah.rantai.length === 1 && ubah.rantai[0] === c.catatan[0], `Aturan ${c.id}: mengubah aturan memulai rantai lagi`);
    cek(B.langkahPolaBilanganK4B3B(B.langkahPolaBilanganK4B3B(x0, { t: "A_POLA", i }), { t: "A_JALAN" }).rantai.length === 1, `Aturan ${c.id}: aturan tetap tidak menjalankan rantai`);
  }
  const telur = jalan(x0, B.langkahPolaBilanganK4B3B, [{ t: "A_POLA", i: 1 }, ...ulang(8, { t: "A_ATURAN", d: 1 }), ...ulang(4, { t: "A_JALAN" })]);
  cek(telur.rantai[4] === 52 && telur.pernah.includes("aturan:telur:5"), "telur hari ke-5 = 52 (buku)");
  const tv = jalan(x0, B.langkahPolaBilanganK4B3B, [{ t: "A_POLA", i: 2 }, ...ulang(6, { t: "A_ATURAN", d: -1 }), ...ulang(5, { t: "A_JALAN" })]);
  cek(tv.rantai[5] === 40 && tv.pernah.includes("aturan:tv:6"), "TV bulan ke-6 (Juni) = 40 (buku)");

  // Tabel nilai.
  for (let i = 0; i < B.TABEL_B.length; i += 1) {
    const c = B.TABEL_B[i];
    let x = B.langkahPolaBilanganK4B3B(x0, { t: "N_POLA", i });
    for (let k = 0; k < 10; k += 1) {
      const kunci = sukuKe(c.catatan, x.baris.length + 1);
      if (kunci < 0 || x.baris.length >= B.MAKS_BARIS) break;
      const salah = B.langkahPolaBilanganK4B3B({ ...x, nilai: kunci - 1 }, { t: "N_ISI" });
      cek(salah.baris.length === x.baris.length, `Tabel ${c.id}: nilai ${kunci - 1} ditolak`);
      x = B.langkahPolaBilanganK4B3B({ ...x, nilai: kunci }, { t: "N_ISI" });
      cek(x.pesan.includes(`sebanyak ${x.baris.length - 1} kali`), `Tabel ${c.id}: suku ke-${x.baris.length} dijelaskan dengan ${x.baris.length - 1} langkah`);
    }
    cek(x.baris.every((v, k) => v === sukuKe(c.catatan, k + 1) && v >= 0), `Tabel ${c.id}: baris cocok dengan rumus mandiri`);
  }
  const keNilai = (i, nilai) => jalan(x0, B.langkahPolaBilanganK4B3B, [{ t: "N_POLA", i }, ...nilai.flatMap((v, k) => {
    const dari = k === 0 ? B.TABEL_B[i].catatan[2] : nilai[k - 1];
    return [...ulang(Math.abs(v - dari), { t: "N_NILAI", d: v > dari ? 1 : -1 }), { t: "N_ISI" }];
  })]);
  cek(keNilai(1, [17, 21]).pernah.includes("nilai:rak:5") && keNilai(1, [17, 21]).baris[4] === 21, "rak ke-5 = 21 (buku)");
  cek(keNilai(0, [29, 32]).baris[4] === 32, "kursi baris ke-5 = 32 (buku)");

  // Fuzz.
  const acak = acakDari(47);
  let s = B.awalPolaBilanganK4B3B();
  let ok = true;
  const pesanSemua = new Set();
  for (let i = 0; i < 20000 && ok; i += 1) {
    const r = acak(12);
    const dd = acak(2) ? 1 : -1;
    const aksi =
      r === 0 ? { t: "S_DERET", i: acak(7) - 1 } : r === 1 ? { t: "S_KETUK", j: acak(6) - 1 } : r === 2 ? { t: "S_BEDA", d: dd } : r === 3 ? { t: "S_CEK" } : r === 4 ? { t: "A_POLA", i: acak(5) - 1 } : r === 5 ? { t: "A_ATURAN", d: dd } : r === 6 ? { t: "A_JALAN" } : r === 7 ? { t: "N_POLA", i: acak(5) - 1 } : r === 8 ? { t: "N_NILAI", d: acak(2) ? dd : dd * 10 } : r === 9 ? { t: "N_ISI" } : acak(60) === 0 ? { t: "RESET" } : { t: "PESAN_KOSONG" };
    const sebelum = s;
    s = B.langkahPolaBilanganK4B3B(s, aksi);
    if (s.pesan) pesanSemua.add(s.pesan);
    if (aksi.t === "RESET") continue;
    for (const p of sebelum.pernah) if (!s.pernah.includes(p)) ok = false;
    if (!(Math.abs(s.tebak) <= B.MAKS_BEDA && Math.abs(s.aturan) <= B.MAKS_BEDA && s.nilai >= 0 && s.nilai <= B.MAKS_NILAI)) ok = false;
    if (s.ketuk.length !== B.DERET_B[s.sd].suku.length - 1) ok = false;
    const ca = B.ATURAN_B[s.ap];
    if (!s.rantai.every((v, k) => v === sukuKe(ca.catatan, k + 1) && v >= 0) || s.rantai.length > B.MAKS_RANTAI) ok = false;
    const ct = B.TABEL_B[s.tb];
    if (!s.baris.every((v, k) => v === sukuKe(ct.catatan, k + 1) && v >= 0) || s.baris.length > B.MAKS_BARIS) ok = false;
    for (const p of s.pernah) {
      const m = /^beda:(.+)$/.exec(p);
      if (m && !B.DERET_B.some((d) => d.id === m[1])) ok = false;
    }
  }
  cek(ok, "fuzz 20.000 aksi Lab Pola Bilangan: rantai dan tabel selalu cocok rumus, tidak negatif, riwayat tidak dicabut");
  cek([...pesanSemua].every(tanpaAngka), `semua pesan Lab B dieja menjadi kata (${pesanSemua.size} pesan)`);
  cek(B.keadaanPolaBilanganK4B3B(x0).alat === "pola-bilangan", "keadaan Lab B");
}

/* ------------------------------ Mesin ------------------------------ */
{
  cek(MS.SEMUA_MESIN_K4B3.length === 2, "ada dua mesin (A, B)");
  const posisi = [];
  for (const def of MS.SEMUA_MESIN_K4B3) {
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
      cek(tanpaAngka(kasus.ringkas) && tanpaAngka(kasus.nama), `${def.id}/${kasus.id}: ringkas dieja menjadi kata`);
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
  sama(MS.SEMUA_MESIN_K4B3.map((d) => d.selesaiId), ["A", "B"].map((h) => K4.ID_MESIN_K4B3[h]), "selesaiId mesin sama dengan id misi");

  const nilaiBeda = (o) => (o === "0" ? 0 : (o.startsWith("−") ? -1 : 1) * Number(o.slice(1)));
  // Mesin A: kunci dan SEMUA pengecoh dihitung ulang mandiri.
  for (const k of MS.KASUS_POLA_GAMBAR) {
    const kasus = MS.MESIN_POLA_GAMBAR.kasus.find((c) => c.id === k.id);
    const [hitung, selisih, jenis, lanjut] = kasus.langkah;
    const d = bedaMandiri(k.s);
    const m = /: (\d+) di baris atas dan (\d+) di baris bawah/.exec(hitung.tanya);
    cek(!!m && Number(m[1]) + Number(m[2]) === k.s[1] && hitung.benar === String(k.s[1]), `A/${k.id}: hitung dua baris = kumpulan ke-2`);
    cek(hitung.opsi.every((o) => o === hitung.benar || Number(o) !== k.s[1]), `A/${k.id}: pengecoh hitung salah`);
    cek(nilaiBeda(selisih.benar) === d && selisih.opsi.every((o) => o === selisih.benar || nilaiBeda(o) !== d), `A/${k.id}: selisih ${d}; pengecoh bukan selisih`);
    cek(jenis.benar === jenisMandiri(k.s) && jenis.opsi.every((o) => o === jenis.benar || o !== jenisMandiri(k.s)), `A/${k.id}: jenis cocok`);
    const ke4 = sukuKe(k.s, 4);
    cek(lanjut.benar === String(ke4) && lanjut.opsi.every((o) => o === lanjut.benar || (Number(o) !== ke4 && Number(o) >= 0)), `A/${k.id}: kumpulan ke-4 = ${ke4}; pengecoh salah dan tidak negatif`);
    cek(k.s.every((v) => v <= 20) && Math.abs(d) <= 3, `A/${k.id}: nilai kecil (pola gambar)`);
  }
  cek(MS.KASUS_POLA_GAMBAR.some((k) => bedaMandiri(k.s) > 0) && MS.KASUS_POLA_GAMBAR.some((k) => bedaMandiri(k.s) < 0), "mesin A: ada membesar dan mengecil");
  // Mesin B.
  for (const k of MS.KASUS_POLA_BILANGAN) {
    const kasus = MS.MESIN_POLA_BILANGAN.kasus.find((c) => c.id === k.id);
    const [selisih, jenis, lanjut, dua] = kasus.langkah;
    const d = bedaMandiri(k.s);
    const n = k.s.length;
    cek(nilaiBeda(selisih.benar) === d && selisih.opsi.every((o) => o === selisih.benar || nilaiBeda(o) !== d), `B/${k.id}: beda ${d}; pengecoh bukan beda`);
    cek(jenis.benar === jenisMandiri(k.s), `B/${k.id}: jenis cocok`);
    cek(lanjut.benar === String(sukuKe(k.s, n + 1)) && lanjut.opsi.every((o) => o === lanjut.benar || Number(o) !== sukuKe(k.s, n + 1)), `B/${k.id}: suku ke-${n + 1}; pengecoh salah`);
    cek(dua.benar === String(sukuKe(k.s, n + 2)) && dua.opsi.every((o) => o === dua.benar || Number(o) !== sukuKe(k.s, n + 2)), `B/${k.id}: suku ke-${n + 2}; pengecoh salah`);
    cek([...lanjut.opsi, ...dua.opsi].every((o) => Number(o) >= 0), `B/${k.id}: semua pilihan tidak negatif`);
    cek(lanjut.tanya.includes(`ke-${n + 1}`) && dua.tanya.includes(`ke-${n + 2}`), `B/${k.id}: urutan suku pada soal benar`);
  }
  cek(MS.KASUS_POLA_BILANGAN.some((k) => bedaMandiri(k.s) > 0) && MS.KASUS_POLA_BILANGAN.some((k) => bedaMandiri(k.s) < 0), "mesin B: ada membesar dan mengecil");
}

/* ------------------------------ Skenario ------------------------------ */
{
  const semua = [SK.SKENARIO_K4B3A, SK.SKENARIO_K4B3B];
  for (const def of semua) {
    cek(def.adegan.length >= 5 && def.adegan.length <= 8, `${def.id}: 5 sampai 8 adegan`);
    cek(def.adegan[0].jenis === "narasi" && def.adegan[def.adegan.length - 1].jenis === "akhir", `${def.id}: buka dan tutup`);
    cek(new Set(def.adegan.map((a) => a.jenis)).size >= 4, `${def.id}: paling sedikit empat jenis adegan`);
  }
  sama(semua.map((d) => d.id), ["jeruk-permen-k4b3", "pameran-pola-k4b3"], "id skenario");
  const adegan = (def, id) => def.adegan.find((a) => a.id === id);
  const jeruk = [2, 4, 6];
  const permen = [9, 7, 5];
  // A
  cek(adegan(SK.SKENARIO_K4B3A, "hitung").jumlah === jeruk[2], "A: kumpulan ketiga 6 jeruk");
  cek(/Bertambah 2/.test(adegan(SK.SKENARIO_K4B3A, "selisih").opsi.find((o) => o.benar).teks) && bedaMandiri(jeruk) === 2, "A: selisih jeruk +2 (dihitung)");
  cek(adegan(SK.SKENARIO_K4B3A, "empat").target === sukuKe(jeruk, 4), "A: kumpulan keempat = 8 (dihitung)");
  const tabelA = adegan(SK.SKENARIO_K4B3A, "tabel");
  sama(tabelA.soal.map((q) => Number(q.jawaban)), [5, 6, 7].map((n) => sukuKe(jeruk, n)), "A: kumpulan kelima sampai ketujuh (dihitung)");
  cek(tabelA.soal.every((q) => q.opsi.filter((o) => o === q.jawaban).length === 1), "A: tiap soal tabel punya satu kunci");
  cek(/Mengecil/.test(adegan(SK.SKENARIO_K4B3A, "permen").opsi.find((o) => o.benar).teks) && jenisMandiri(permen) === "mengecil", "A: permen mengecil (dihitung)");
  cek(adegan(SK.SKENARIO_K4B3A, "habis").target === sukuKe(permen, 5) && sukuKe(permen, 6) < 0, "A: permen kumpulan kelima = 1, lalu habis (dihitung)");
  // B
  cek(/^8 jeruk/.test(adegan(SK.SKENARIO_K4B3B, "gambar").opsi.find((o) => o.benar).teks) && sukuKe(jeruk, 4) === 8, "B: rekap pola gambar 8 (dihitung)");
  const lanjutB = adegan(SK.SKENARIO_K4B3B, "lanjut");
  sama(lanjutB.soal.map((q) => Number(q.jawaban)), [sukuKe([3, 5, 7, 9, 11], 6), sukuKe([23, 18, 13, 8], 5)], "B: suku berikutnya (dihitung)");
  cek(/Tambah 3/.test(adegan(SK.SKENARIO_K4B3B, "beda").opsi.find((o) => o.benar).teks) && bedaMandiri([1, 4, 7, 10]) === 3, "B: beda 1, 4, 7, 10 = +3 (dihitung)");
  cek(adegan(SK.SKENARIO_K4B3B, "isi").target === sukuKe([32, 28, 24, 20, 16], 6), "B: 32, 28, ..., 16 lalu 12 (dihitung)");
  const ceritaB = adegan(SK.SKENARIO_K4B3B, "cerita");
  sama(ceritaB.soal.map((q) => Number(q.jawaban)), [sukuKe([20, 28, 36], 5), sukuKe([70, 64, 58], 6)], "B: telur hari ke-5 dan TV bulan ke-6 (dihitung)");
  for (const def of semua) for (const a of def.adegan.filter((x) => x.jenis === "soal")) for (const q of a.soal) cek(q.opsi.filter((o) => o !== q.jawaban).every((o) => Number(o) !== Number(q.jawaban)), `${def.id}/${a.id}: pengecoh salah (${q.teks})`);
  cek(/mengecil/.test(adegan(SK.SKENARIO_K4B3B, "simpul").opsi.find((o) => o.benar).teks) && jenisMandiri([70, 64, 58]) === "mengecil", "B: TV mengecil (dihitung)");
}

/* ------------------------------ Misi ------------------------------ */
{
  const huruf = ["A", "B"];
  sama(Object.keys(TK.MISI_K4B3), huruf, "teks misi untuk A dan B");
  sama(Object.keys(TK.NAMA_SIM_K4B3), huruf, "nama simulasi untuk A dan B");
  cek(TK.hurufK4B3("Z") === "A" && TK.hurufK4B3("B") === "B", "huruf tak dikenal jatuh ke A");
  cek(TK.misiAwalK4Bab3("B").startsWith("Simulasi 1. Misi: ") && tanpaAngka(TK.misiAwalK4Bab3("A")) && tanpaAngka(TK.misiAwalK4Bab3("B")), "misi awal dan dapat dieja");
  for (const h of huruf) {
    const daftar = K4.daftarMisiK4Bab3(h);
    cek(daftar.filter((m) => m.wajib).length === 7 && daftar.filter((m) => !m.wajib).length === 3, `${h}: tujuh misi wajib dan tiga tantangan bebas`);
    cek(new Set(daftar.map((m) => m.id)).size === 10 && daftar.every((m) => m.id.startsWith(`${h.toLowerCase()}-`)), `${h}: id misi unik berawalan huruf`);
    const kosong = [{ alat: "pola-gambar", pernah: [] }, { alat: "pola-bilangan", pernah: [] }, sel("tidak-ada"), A.keadaanPolaGambarK4B3A(A.awalPolaGambarK4B3A()), B.keadaanPolaBilanganK4B3B(B.awalPolaBilanganK4B3B())];
    cek(kosong.every((k) => M0.misiBaru(daftar, k, new Set()).length === 0), `${h}: keadaan awal alat tidak memenuhi misi mana pun`);
    cek(daftar.every((m) => m.teks.length > 20 && tanpaAngka(m.teks)), `${h}: teks misi jelas dan dapat dieja`);
    const baru = (k) => M0.misiBaru(daftar, k, new Set());
    for (const lain of huruf.filter((l) => l !== h)) cek(baru(sel(K4.ID_MESIN_K4B3[lain])).length === 0 && baru(sel(K4.ID_SKENARIO_K4B3[lain])).length === 0, `${h}: id mesin/skenario ${lain} tidak memenuhi misi ${h}`);
    cek(baru(sel(K4.ID_MESIN_K4B3[h])).join() === `${h.toLowerCase()}-mesin` && baru(sel(K4.ID_SKENARIO_K4B3[h])).join() === `${h.toLowerCase()}-skenario`, `${h}: id mesin dan skenario memenuhi misinya`);
  }
  sama([SK.SKENARIO_K4B3A, SK.SKENARIO_K4B3B].map((d) => d.id.replace(/-k4b3$/, "")), [K4.ID_SKENARIO_K4B3.A, K4.ID_SKENARIO_K4B3.B], "id skenario sesuai id misi");
  // Riwayat alat lain tidak memenuhi misi.
  cek(M0.misiBaru(K4.MISI_A, { alat: "pola-bilangan", pernah: ["lanjut:jeruk", "tabel:jeruk:7"] }, new Set()).length === 0, "A: riwayat lab B tidak memenuhi misi A");

  // Lab A: jalur nyata dan near-miss.
  const capaiA = (aksi) => M0.misiBaru(K4.MISI_A, A.keadaanPolaGambarK4B3A(jalan(A.awalPolaGambarK4B3A(), A.langkahPolaGambarK4B3A, aksi)), new Set());
  const lanjut = (i, n) => [{ t: "L_POLA", i }, ...ulang(n, { t: "L_ISI", d: 1 }), { t: "L_CEK" }];
  cek(capaiA(lanjut(0, 8)).includes("a-jeruk") && !capaiA(lanjut(0, 7)).includes("a-jeruk") && !capaiA(lanjut(0, 9)).includes("a-jeruk"), "A: jeruk 8 memenuhi, 7 dan 9 tidak");
  cek(capaiA(lanjut(1, 3)).includes("a-permen") && !capaiA(lanjut(1, 7)).includes("a-permen") && !capaiA(lanjut(1, 4)).includes("a-permen"), "A: permen 3 memenuhi, 7 (arah terbalik) dan 4 tidak");
  cek(capaiA(lanjut(3, 3)).includes("a-bintang") && !capaiA(lanjut(3, 9)).includes("a-bintang"), "A: tantangan bintang 3");
  cek(capaiA(lanjut(2, 12)).length === 0, "A: pola kotak awal (3, 6, 9) tidak memenuhi misi mana pun");
  const tabel = (tp, nilai) => {
    const awal = A.POLA_A[A.TABEL_A[tp]].awal;
    let dari = awal[2];
    const aksi = [{ t: "T_POLA", i: tp }];
    for (const v of nilai) {
      aksi.push(...ulang(Math.abs(v - dari), { t: "T_NILAI", d: v > dari ? 1 : -1 }), { t: "T_TAMBAH" });
      dari = v;
    }
    return aksi;
  };
  cek(capaiA(tabel(0, [8, 10, 12, 14])).includes("a-tabel-jeruk") && !capaiA(tabel(0, [8, 10, 12])).includes("a-tabel-jeruk"), "A: tabel jeruk sampai ke-7 memenuhi, ke-6 tidak");
  cek(!capaiA(tabel(0, [8, 10, 12, 15])).includes("a-tabel-jeruk"), "A: tabel jeruk dengan 15 di ke-7 tidak memenuhi");
  cek(capaiA(tabel(1, [3, 1])).includes("a-tabel-permen") && !capaiA(tabel(1, [3])).includes("a-tabel-permen"), "A: tabel permen sampai ke-5 memenuhi, ke-4 tidak");
  cek(capaiA([...tabel(1, [3, 1]), { t: "T_TAMBAH" }]).includes("a-habis") && !capaiA(tabel(1, [3, 1])).includes("a-habis"), "A: tantangan habis hanya setelah melanjutkan dari 1");
  // Berawal dari keadaan awal lab (2, +1) atau dari pasangan sebelumnya.
  const buat = (awal, beda, dari = [A.awalPolaGambarK4B3A().awal, A.awalPolaGambarK4B3A().beda]) => [
    ...ulang(Math.abs(awal - dari[0]), { t: "B_AWAL", d: awal > dari[0] ? 1 : -1 }),
    ...ulang(Math.abs(beda - dari[1]), { t: "B_BEDA", d: beda > dari[1] ? 1 : -1 }),
    { t: "B_CEK" },
  ];
  cek(capaiA([...buat(1, 3), ...buat(9, -2, [1, 3])]).includes("a-buat"), "A: membesar +3 dan mengecil memenuhi a-buat");
  cek(!capaiA(buat(1, 3)).includes("a-buat") && !capaiA([...buat(1, 2), ...buat(9, -2, [1, 2])]).includes("a-buat") && !capaiA(buat(9, -2)).includes("a-buat"), "A: hanya membesar +3, membesar +2, atau hanya mengecil tidak memenuhi a-buat");
  cek(!capaiA([...buat(1, 3), ...buat(2, -3, [1, 3])]).includes("a-buat"), "A: pola mengecil yang kurang dari nol ditolak, tidak memenuhi a-buat");
  cek(capaiA(buat(4, 0)).includes("a-tetap") && !capaiA(buat(4, 1)).includes("a-tetap"), "A: tantangan selisih 0");

  // Lab B.
  const capaiB = (aksi) => M0.misiBaru(K4.MISI_B, B.keadaanPolaBilanganK4B3B(jalan(B.awalPolaBilanganK4B3B(), B.langkahPolaBilanganK4B3B, aksi)), new Set());
  const selisih = (i, v, ketuk = true) => [{ t: "S_DERET", i }, ...(ketuk ? B.DERET_B[i].suku.slice(1).map((_, j) => ({ t: "S_KETUK", j })) : []), ...ulang(Math.abs(v), { t: "S_BEDA", d: v > 0 ? 1 : -1 }), { t: "S_CEK" }];
  cek(capaiB(selisih(1, 3)).includes("b-tiga") && !capaiB(selisih(1, 3, false)).includes("b-tiga") && !capaiB(selisih(1, 4)).includes("b-tiga"), "B: beda +3 memenuhi; tanpa ketuk atau +4 tidak");
  cek(capaiB(selisih(2, -5)).includes("b-lima") && !capaiB(selisih(2, -4)).includes("b-lima"), "B: beda −5 memenuhi, −4 tidak");
  cek(capaiB(selisih(2, 5)).includes("b-tanda") && !capaiB(selisih(2, 5)).includes("b-lima") && !capaiB(selisih(2, 6)).includes("b-tanda"), "B: +5 untuk pola mengecil memenuhi b-tanda saja; +6 tidak");
  cek(capaiB(selisih(4, 12)).includes("b-dua-belas") && !capaiB(selisih(4, 11)).includes("b-dua-belas"), "B: tantangan +12");
  cek(capaiB(selisih(0, 2)).length === 0, "B: pola awal (3, 5, 7, 9, 11) tidak memenuhi misi mana pun");
  const aturan = (i, v, n) => [{ t: "A_POLA", i }, ...ulang(Math.abs(v), { t: "A_ATURAN", d: v > 0 ? 1 : -1 }), ...ulang(n, { t: "A_JALAN" })];
  cek(capaiB(aturan(1, 8, 4)).includes("b-telur") && !capaiB(aturan(1, 8, 3)).includes("b-telur") && !capaiB(aturan(1, 9, 4)).includes("b-telur"), "B: telur sampai ke-5 memenuhi; ke-4 atau aturan +9 tidak");
  cek(capaiB(aturan(2, -6, 5)).includes("b-tv") && !capaiB(aturan(2, -6, 4)).includes("b-tv"), "B: tantangan TV sampai ke-6");
  const nilai = (i, vs) => {
    let dari = B.TABEL_B[i].catatan[2];
    const aksi = [{ t: "N_POLA", i }];
    for (const v of vs) {
      aksi.push(...ulang(Math.abs(v - dari), { t: "N_NILAI", d: v > dari ? 1 : -1 }), { t: "N_ISI" });
      dari = v;
    }
    return aksi;
  };
  cek(capaiB(nilai(1, [17, 21])).includes("b-rak") && !capaiB(nilai(1, [17])).includes("b-rak") && !capaiB(nilai(1, [17, 22])).includes("b-rak"), "B: rak ke-5 = 21 memenuhi; ke-4 atau 22 tidak");
  cek(capaiB(nilai(0, [29, 32])).includes("b-kursi") && !capaiB(nilai(0, [29, 31])).includes("b-kursi"), "B: tantangan kursi");

  // Gerbang.
  for (const h of huruf) {
    const daftar = M0.tampilMisi(K4.daftarMisiK4Bab3(h));
    const wajibIds = daftar.filter((m) => m.wajib).map((m) => m.id);
    cek(!M0.wajibSelesai(daftar, new Set(wajibIds.slice(0, 6))), `${h}: enam dari tujuh wajib belum membuka gerbang`);
    cek(M0.wajibSelesai(daftar, new Set(wajibIds)), `${h}: tujuh wajib membuka gerbang`);
    cek(M0.bolehLanjut({ adaMisi: true, wajibSelesai: false, dilewati: true, disentuh: true }) && !M0.bolehLanjut({ adaMisi: true, wajibSelesai: false, dilewati: true, disentuh: false }), "lewati hanya setelah disentuh");
  }
}

/* ------------------------------ Konsep tidak bocor antar sub-bab ------------------------------ */
{
  const ringkas = JSON.parse(readFileSync(new URL("../src/data/kelas4-bab3-ringkas.json", import.meta.url), "utf8"));
  const baca = (nama, ekstensi) => readFileSync(new URL(`../src/components/modul/${nama}.${ekstensi}`, import.meta.url), "utf8");
  const tanpaKomentar = (s) => s.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");
  // Sub-Bab A (pola gambar) tidak memakai istilah pola bilangan: suku, barisan, beda bertanda, mesin aturan, tabel nilai.
  const BOCOR_A = /(pola bilangan|barisan|\bsuku\b|aturan|masukan|keluaran|mesin fungsi|tabel nilai)/i;
  const catat = (teks, apa) => {
    const m = BOCOR_A.exec(teks);
    cek(!m, `A: ${apa} bebas konsep Sub-Bab B (${m ? m[0] : ""} di "${String(teks).slice(Math.max(0, (m?.index ?? 0) - 30), (m?.index ?? 0) + 40)}")`);
  };
  for (const t of [TK.MISI_K4B3.A, TK.NAMA_SIM_K4B3.A, ...K4.MISI_A.map((m) => m.teks)]) catat(t, "teks misi");
  catat(JSON.stringify(MS.MESIN_POLA_GAMBAR), "mesin");
  catat(JSON.stringify(SK.SKENARIO_K4B3A), "skenario");
  catat(JSON.stringify(ringkas.subBab.A), "peta dan infografis ringkas");
  catat(tanpaKomentar(baca("SimulasiLabPolaGambarK4B3", "tsx")).replace(/\bPengatur\w*/g, ""), "komponen lab (tanpa komentar)");
  catat(tanpaKomentar(baca("lab-pola-gambar-k4b3a", "ts")), "logika lab (tanpa komentar)");
  for (const p of globalThis.__pesanA) catat(p, "pesan lab dari fuzz");
  const xA = A.awalPolaGambarK4B3A();
  for (const u of [A.ucapLanjutK4B3A(xA), A.ucapTabelK4B3A(xA), A.ucapBuatK4B3A(xA)]) catat(u, "ucapan lab");
  // Nilai pola gambar tetap kecil: titik bisa dihitung.
  cek(JSON.stringify(SK.SKENARIO_K4B3A).match(/\d+/g).every((d) => Number(d) <= 20), "A: bilangan di skenario paling besar 20");

  // Kunci tidak bocor ke klien.
  const KOMP = ["SimulasiLabPolaGambarK4B3", "SimulasiLabPolaBilanganK4B3", "SimulasiK4Bab3", "model-pola-k4b3"];
  for (const f of KOMP) {
    const s = baca(f, "tsx");
    cek(!/correct_index|explanation/.test(s), `${f}: tidak memuat correct_index atau explanation`);
    cek(!/fetch\(|XMLHttpRequest|api\/|openai|anthropic|gemini/i.test(s), `${f}: tanpa jaringan atau model bahasa`);
  }
  const LOGIKA = ["lab-pola-gambar-k4b3a", "lab-pola-bilangan-k4b3b", "mesin-data-k4b3", "skenario-k4b3", "misi-k4bab3", "misi-teks-k4b3", "eja-k4b3"];
  for (const f of LOGIKA) {
    const s = baca(f, "ts");
    cek(!/fetch\(|XMLHttpRequest|from "react"|openai|anthropic|gemini|correct_index|explanation/i.test(s), `${f}: murni`);
    const impor = s.match(/^import .+$/gm) ?? [];
    cek(impor.every((l) => l.startsWith("import type")), `${f}: hanya mengimpor tipe`);
  }
  // Lab melapor lewat useEffect yang hanya memanggil callback, dan mengosongkan pesan saat ganti tampilan.
  for (const f of ["SimulasiLabPolaGambarK4B3", "SimulasiLabPolaBilanganK4B3"]) {
    const s = baca(f, "tsx");
    cek(/useEffect\(\(\) => \{\s*onKeadaan\?\.\(keadaan\w+\(x\)\);\s*\}, \[onKeadaan, x\]\);/.test(s), `${f}: lapor keadaan lewat useEffect`);
    cek(/setLihat\(v\);\s*kirim\(\{ t: "PESAN_KOSONG" \}\);/.test(s), `${f}: ganti tampilan mengosongkan pesan`);
  }
  // Semua ucapan lab dieja menjadi kata.
  const xB = B.awalPolaBilanganK4B3B();
  const ucapan = [
    A.ucapLanjutK4B3A(xA),
    A.ucapTabelK4B3A(xA),
    A.ucapBuatK4B3A(xA),
    A.ucapBuatK4B3A({ ...xA, awal: 0, beda: -2 }),
    B.ucapSelisihK4B3B(xB),
    B.ucapSelisihK4B3B({ ...xB, tebak: -5 }),
    B.ucapAturanK4B3B(xB),
    B.ucapTabelK4B3B(xB),
    ...[SK.SKENARIO_K4B3A, SK.SKENARIO_K4B3B].flatMap((d) => d.adegan.map((a) => a.cerita)),
  ];
  cek(ucapan.every(tanpaAngka), "semua ucapan lab dieja menjadi kata");
}

/* ------------------------------ Data ringkas ------------------------------ */
{
  const ringkas = JSON.parse(readFileSync(new URL("../src/data/kelas4-bab3-ringkas.json", import.meta.url), "utf8"));
  cek(ringkas.chapter_id === "mtk-4-bab3" && ringkas.phase_code === "FASE_B" && ringkas.grade === 4, "ringkas: id bab, fase, kelas");
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
