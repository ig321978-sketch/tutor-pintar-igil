// Uji Simulasi Kelas 3 Bab 5 (Penyajian Data dalam Tabel): pengeja, Lab Data Kelompok, Lab Tabel, dua mesin,
// dua skenario, misi, gerbang, dan konsep tidak bocor antar sub-bab.
// Jalankan: node --no-warnings scripts/uji-lab-k3b5.mjs
import { readFileSync } from "node:fs";
import * as M0 from "../src/components/modul/misi-simulasi.ts";
import * as K5 from "../src/components/modul/misi-k3bab5.ts";
import * as TK from "../src/components/modul/misi-teks-k3b5.ts";
import * as D from "../src/components/modul/lab-data-k3b5.ts";
import * as T from "../src/components/modul/lab-tabel-k3b5.ts";
import * as ME from "../src/components/modul/mesin-bertahap-k3b1.ts";
import * as MD from "../src/components/modul/mesin-data-k3b5.ts";
import * as SK from "../src/components/modul/skenario-k3b5.ts";
import * as EJ from "../src/components/modul/eja-k3b5.ts";

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

/* ------------------------------ Hitungan MANDIRI (tidak memakai fungsi lab) ------------------------------ */
function kecilM(d) {
  let m = d[0];
  for (const v of d) if (v < m) m = v;
  return m;
}
function besarM(d) {
  let m = d[0];
  for (const v of d) if (v > m) m = v;
  return m;
}
function hitungM(d, v) {
  let n = 0;
  for (const x of d) if (x === v) n += 1;
  return n;
}
/** Urut sisip (stabil). */
function urutM(d, naik = true) {
  const a = [];
  for (const v of d) {
    let i = a.length;
    while (i > 0 && (naik ? a[i - 1] > v : a[i - 1] < v)) i -= 1;
    a.splice(i, 0, v);
  }
  return a;
}
/** Evaluasi "a − b = c" atau "a + b = c"; kembalikan {a, op, b, c, benar}. */
function rumus(t) {
  const m = t.match(/^(\d+) ([+−]) (\d+) = (\d+)$/);
  if (!m) return null;
  const a = Number(m[1]);
  const b = Number(m[3]);
  const c = Number(m[4]);
  return { a, op: m[2], b, c, benar: (m[2] === "+" ? a + b : a - b) === c };
}
/** Nilai teks turus "卌 卌 |||". */
const nilaiTurus = (t) => (t.match(/卌/g) ?? []).length * 5 + (t.match(/\|/g) ?? []).length;

/* ------------------------------ Pengeja suara ------------------------------ */
{
  sama(EJ.kataBilK3B5(0), "nol", "eja 0");
  sama(EJ.kataBilK3B5(11), "sebelas", "eja 11");
  sama(EJ.kataBilK3B5(13), "tiga belas", "eja 13");
  sama(EJ.kataBilK3B5(20), "dua puluh", "eja 20");
  sama(EJ.kataBilK3B5(100), "seratus", "eja 100");
  sama(EJ.kataBilK3B5(215), "dua ratus lima belas", "eja 215");
  sama(EJ.ejaK3B5("10 − 5 = 5"), "sepuluh dikurangi lima sama dengan lima", "eja jangkauan");
  sama(EJ.ejaK3B5("3 + 5 + 2 = 10"), "tiga ditambah lima ditambah dua sama dengan sepuluh", "eja jumlah");
  sama(EJ.ejaK3B5("Turusnya 卌 卌 |||."), "Turusnya dua kelompok lima dan tiga garis.", "eja turus kelompok lima");
  sama(EJ.ejaK3B5("Turus |||| saja"), "Turus empat garis saja", "eja turus tanpa kelompok");
  sama(EJ.ejaK3B5("9 − 4 = …"), "sembilan dikurangi empat sama dengan titik-titik", "eja titik-titik");
  let semua = true;
  for (let n = 0; n <= 20; n += 1) {
    const e = EJ.ejaK3B5(T.teksTurusK3B5(n));
    const k = Math.floor(n / 5);
    const s = n % 5;
    const harus = n === 0 ? "" : [k ? `${EJ.kataBilK3B5(k)} kelompok lima` : "", s ? `${EJ.kataBilK3B5(s)} garis` : ""].filter(Boolean).join(" dan ");
    if (e !== harus) semua = false;
  }
  cek(semua, "eja turus 0 sampai 20 sesuai kelompok lima dan sisanya");
  cek(!/\d/.test(EJ.ejaK3B5("Data 6, 3, 9, 4, 7 dan 12 benda")), "eja: tidak ada angka tersisa");
}

/* ------------------------------ Lab Data Kelompok (A) ------------------------------ */
const dd = (x, ...a) => a.reduce((s, ak) => D.langkahDataK3B5(s, ak), x);
function setAnak(x, i, target) {
  let s = x;
  while (s.anak[i] < target) s = dd(s, { t: "UBAH", i, d: 1 });
  while (s.anak[i] > target) s = dd(s, { t: "UBAH", i, d: -1 });
  return s;
}
const setSemua = (x, data) => data.reduce((s, v, i) => setAnak(s, i, v), x);
const kd = D.keadaanDataK3B5;
const cacahSemua = (x, kecuali = -1) => x.ketuk.reduce((s, _b, k) => (k === kecuali ? s : dd(s, { t: "KARTU", k })), x);
{
  const a0 = D.awalDataK3B5();
  sama(a0.anak, [6, 3, 9, 4, 7], "data awal");
  cek(a0.anak[0] !== kecilM(a0.anak), "awal: anak pertama bukan yang terkecil");
  cek(besarM(a0.anak) - kecilM(a0.anak) !== 5 && besarM(a0.anak) - kecilM(a0.anak) !== 0, "awal: jangkauan bukan 5 dan bukan 0");
  cek(hitungM(a0.anak, besarM(a0.anak)) === 1, "awal: terbesar tunggal");
  cek(a0.pernah.length === 0 && !a0.diubah && a0.pilih.length === 0 && a0.ketuk.every((b) => !b), "awal: belum ada riwayat");
  cek(a0.anak.every((v) => v >= D.MIN_BENDA && v <= D.MAKS_BENDA), "awal dalam jangkauan 1 sampai 12");
  sama(D.NAMA_ANAK_K3B5, ["Alen", "Meutia", "Galih", "Alfa", "Andi"], "tokoh mengikuti Materi Bab 5");

  // Semua kombinasi kecil: lima anak bernilai 1 sampai 6 (7.776 data) dan semua nilai 1 sampai 12 untuk tiga anak.
  let okUrut = true;
  let okStabil = true;
  let okJangkauan = true;
  let okUjung = true;
  let banyakKombinasi = 0;
  const periksa = (d) => {
    banyakKombinasi += 1;
    for (const arah of ["kecil", "besar"]) {
      const idx = D.urutanIndeks(d, arah);
      const nilai = idx.map((i) => d[i]);
      if (JSON.stringify(nilai) !== JSON.stringify(urutM(d, arah === "kecil"))) okUrut = false;
      if (new Set(idx).size !== d.length) okUrut = false;
      for (let k = 1; k < idx.length; k += 1) if (nilai[k] === nilai[k - 1] && idx[k] < idx[k - 1]) okStabil = false;
    }
    if (D.jangkauanK3B5(d) !== besarM(d) - kecilM(d)) okJangkauan = false;
    const u = D.kalimatUjung(d);
    const namaKecil = d.map((v, i) => (v === kecilM(d) ? D.NAMA_ANAK_K3B5[i] : null)).filter(Boolean);
    const namaBesar = d.map((v, i) => (v === besarM(d) ? D.NAMA_ANAK_K3B5[i] : null)).filter(Boolean);
    if (!u.terkecil.startsWith(`Data terkecil ${kecilM(d)}: `) || !namaKecil.every((n) => u.terkecil.includes(n))) okUjung = false;
    if (!u.terbesar.startsWith(`Data terbesar ${besarM(d)}: `) || !namaBesar.every((n) => u.terbesar.includes(n))) okUjung = false;
    if (u.terkecil.includes("sama banyak") !== namaKecil.length > 1 || u.terbesar.includes("sama banyak") !== namaBesar.length > 1) okUjung = false;
    const lainK = D.NAMA_ANAK_K3B5.filter((n, i) => i < d.length && !namaKecil.includes(n));
    if (lainK.some((n) => u.terkecil.includes(n))) okUjung = false;
  };
  for (let a = 1; a <= 6; a += 1) for (let b = 1; b <= 6; b += 1) for (let c = 1; c <= 6; c += 1) for (let e = 1; e <= 6; e += 1) for (let f = 1; f <= 6; f += 1) periksa([a, b, c, e, f]);
  for (let a = 1; a <= 12; a += 1) for (let b = 1; b <= 12; b += 1) for (let c = 1; c <= 12; c += 1) periksa([a, b, c]);
  cek(okUrut, `urutan sama dengan urut sisip mandiri (${banyakKombinasi} kombinasi)`);
  cek(okStabil, "yang sama banyak tetap menurut urutan duduk");
  cek(okJangkauan, "jangkauan = terbesar − terkecil, dihitung mandiri");
  cek(okUjung, "terkecil dan terbesar: semua anak yang sama banyak disebut, yang lain tidak, dan diberi keterangan sama banyak");
  cek(D.kalimatJangkauan([6, 3, 9, 4, 7]) === "Jangkauan = 9 − 3 = 6", "kalimat jangkauan awal");
  cek(rumus(D.kalimatJangkauan([5, 5, 5, 5, 5]).replace("Jangkauan = ", "")).c === 0, "jangkauan semua sama = 0");

  // Bandingkan: semua pasangan 1 sampai 12.
  let okBanding = true;
  for (let p = 1; p <= 12; p += 1)
    for (let q = 1; q <= 12; q += 1) {
      let s = setSemua(a0, [p, q, 5, 5, 5]);
      s = dd(s, { t: "PILIH", i: 0 }, { t: "PILIH", i: 1 });
      const k = D.kalimatBanding(s);
      if (p === q) {
        if (!k.includes("sama banyak") || !k.includes("Selisihnya 0")) okBanding = false;
      } else {
        const r = rumus(k.match(/(\d+ − \d+ = \d+)/)[1]);
        if (!r.benar || r.c !== Math.abs(p - q) || r.a !== Math.max(p, q)) okBanding = false;
        const lebihNama = p > q ? "Alen" : "Meutia";
        if (!k.startsWith(`${lebihNama} punya ${Math.abs(p - q)} benda lebih banyak`)) okBanding = false;
      }
      if (!s.pernah.includes(`banding:${Math.abs(p - q)}`)) okBanding = false;
    }
  cek(okBanding, "bandingkan: 144 pasangan, selisih dan siapa yang lebih banyak dihitung benar");
  cek(D.kalimatBanding(dd(a0, { t: "PILIH", i: 0 })) === null, "satu anak belum dibandingkan");
  const tiga = dd(a0, { t: "PILIH", i: 0 }, { t: "PILIH", i: 1 }, { t: "PILIH", i: 2 });
  sama(tiga.pilih, [1, 2], "memilih anak ketiga menggeser pilihan tertua");
  sama(dd(tiga, { t: "PILIH", i: 1 }).pilih, [2], "ketuk lagi membatalkan pilihan");

  // Batas.
  const b1 = setAnak(a0, 1, 1);
  const tolakBawah = dd(b1, { t: "UBAH", i: 1, d: -1 });
  cek(tolakBawah.anak[1] === 1 && tolakBawah.pesan.length > 10, "tidak bisa kurang dari 1 benda, ada pesan");
  const b12 = setAnak(a0, 2, 12);
  const tolakAtas = dd(b12, { t: "UBAH", i: 2, d: 1 });
  cek(tolakAtas.anak[2] === 12 && tolakAtas.pesan.length > 10, "tidak bisa lebih dari 12 benda, ada pesan");

  // Cacah (nilai ulangan buku dan nilai kuis).
  const ul = D.CACAH_K3B5.ulangan.data;
  cek(ul.length === 20 && hitungM(ul, 9) === 5 && hitungM(ul, 10) === 2, "nilai ulangan: 20 data, nilai 9 lima kali, nilai 10 dua kali (sesuai cerita)");
  cek(kecilM(ul) === 5 && besarM(ul) === 10, "nilai ulangan: terkecil 5, terbesar 10");
  const kuis = D.CACAH_K3B5.kuis.data;
  cek(kecilM(kuis) === 6 && hitungM(kuis, 5) === 0, "nilai kuis: tidak ada nilai 5, terkecil 6");
  for (const id of D.DAFTAR_CACAH) {
    const d = D.CACAH_K3B5[id].data;
    cek(d.every((v) => D.BARIS_NILAI.includes(v)), `${id}: semua nilai ada di baris 5 sampai 10`);
    let s = dd(a0, { t: "CACAH", id });
    cek(s.ketuk.length === d.length && s.ketuk.every((b) => !b), `${id}: kartu belum dicacah`);
    sama(D.ringkasCacah(s).map((r) => r.banyak), D.BARIS_NILAI.map(() => 0), `${id}: semua baris 0 sebelum dicacah`);
    s = cacahSemua(s, 0);
    cek(!D.cacahLengkap(s) && !s.pernah.includes(`cacah:${id}`), `${id}: kurang satu kartu belum lengkap`);
    s = dd(s, { t: "KARTU", k: 0 });
    cek(D.cacahLengkap(s) && s.pernah.includes(`cacah:${id}`), `${id}: semua kartu lengkap tercatat`);
    sama(D.ringkasCacah(s).map((r) => r.banyak), D.BARIS_NILAI.map((v) => hitungM(d, v)), `${id}: banyak tiap nilai dihitung mandiri`);
    cek(D.ringkasCacah(s).reduce((t, r) => t + r.banyak, 0) === d.length, `${id}: jumlah turus sama dengan banyak kartu`);
    const dua = dd(s, { t: "KARTU", k: 3 });
    cek(dua.ketuk.filter(Boolean).length === d.length && dua.pesan.includes("sudah dicacah"), `${id}: kartu yang sama tidak dicacah dua kali`);
    const k = D.kalimatCacahLengkap(d);
    cek(k.includes(`Terkecil ${kecilM(d)}, terbesar ${besarM(d)}, jangkauan ${besarM(d)} − ${kecilM(d)} = ${besarM(d) - kecilM(d)}`), `${id}: ringkasan cacah benar`);
    const maks = Math.max(...D.BARIS_NILAI.map((v) => hitungM(d, v)));
    const sering = D.BARIS_NILAI.filter((v) => hitungM(d, v) === maks);
    cek(sering.every((v) => k.includes(`${v}`)) && (sering.length > 1) === k.includes("sama-sama"), `${id}: nilai paling sering ${sering.join(" dan ")} (${maks} kali)`);
    const ulang = dd(s, { t: "ULANG_CACAH" });
    cek(ulang.ketuk.every((b) => !b) && ulang.pernah.includes(`cacah:${id}`), `${id}: cacah lagi mengosongkan kartu tanpa mencabut riwayat`);
  }
  cek(D.kalimatCacahLengkap(ul).includes("nilai 7 dan 9 sama-sama paling sering"), "nilai ulangan: 7 dan 9 sama-sama paling sering (bukan hanya 9)");

  // Fuzz: invarian tetap terjaga.
  const acak = acakDari(5);
  const AKSI = [
    () => ({ t: "UBAH", i: acak(5), d: acak(2) ? 1 : -1 }),
    () => ({ t: "URUT", arah: ["asal", "kecil", "besar"][acak(3)] }),
    () => ({ t: "TOGGLE", rep: acak(2) ? "ujung" : "jangkauan" }),
    () => ({ t: "PILIH", i: acak(6) - 0 }),
    () => ({ t: "KARTU", k: acak(22) }),
    () => ({ t: "CACAH", id: D.DAFTAR_CACAH[acak(2)] }),
    () => ({ t: "ULANG_CACAH" }),
  ];
  let s = a0;
  let ok = true;
  const POLA = /^(urut-(kecil|besar)|ujung-acak|terbesar-sama|jangkauan:\d+|banding:\d+|cacah:(ulangan|kuis))$/;
  for (let n = 0; n < 20000; n += 1) {
    const sebelum = s;
    s = D.langkahDataK3B5(s, AKSI[acak(AKSI.length)]());
    if (s.anak.length !== 5 || s.anak.some((v) => !Number.isInteger(v) || v < 1 || v > 12)) ok = false;
    if (s.pilih.length > 2 || new Set(s.pilih).size !== s.pilih.length || s.pilih.some((i) => i < 0 || i > 4)) ok = false;
    if (s.ketuk.length !== D.CACAH_K3B5[s.cacah].data.length) ok = false;
    if (!sebelum.pernah.every((p) => s.pernah.includes(p))) ok = false;
    if (!s.pernah.every((p) => POLA.test(p))) ok = false;
    for (const p of s.pernah.filter((q) => q.startsWith("jangkauan:"))) if (Number(p.split(":")[1]) > 11) ok = false;
    if (D.jangkauanK3B5(s.anak) !== besarM(s.anak) - kecilM(s.anak)) ok = false;
  }
  cek(ok, "fuzz 20.000 aksi lab data: data 1 sampai 12, pilihan sah, riwayat tidak dicabut dan berformat benar");
  cek(dd(s, { t: "RESET" }).pernah.length === 0, "reset mengembalikan keadaan awal");
}

/* ------------------------------ Lab Tabel (B) ------------------------------ */
const tt = (x, ...a) => a.reduce((s, ak) => T.langkahTabelK3B5(s, ak), x);
const kt = T.keadaanTabelK3B5;
function setTurus(x, n) {
  let s = x;
  while (s.turus < n) s = tt(s, { t: "TURUS", d: 1 });
  while (s.turus > n) s = tt(s, { t: "TURUS", d: -1 });
  return s;
}
function isiTabel(x, id, { kecuali = -1, geser = null } = {}) {
  let s = tt(x, { t: "TABEL", id });
  s.ketuk.forEach((_b, k) => {
    if (k !== kecuali) s = tt(s, { t: "KETUK", k });
  });
  const f = T.barisTabel(id).map((k) => hitungM(T.TABEL_K3B5[id].item, k));
  f.forEach((n, r) => {
    const target = geser && geser.r === r ? n + geser.d : n;
    for (let i = 0; i < target; i += 1) s = tt(s, { t: "ISI", r, d: 1 });
  });
  return s;
}
{
  const b0 = T.awalTabelK3B5();
  cek(b0.turus === 0 && b0.tabel === "manik" && b0.ketuk.every((b) => !b) && b0.isi.every((n) => n === 0) && b0.tanya === null && b0.pernah.length === 0, "lab tabel: awal kosong");
  cek(!T.tabelLengkap(b0), "lab tabel: awal belum lengkap");

  // Frekuensi dibandingkan hitungan mandiri.
  const harus = {
    manik: [["Merah", 6], ["Biru", 4], ["Hitam", 3]],
    statistika: [["S", 2], ["T", 3], ["A", 2], ["I", 2], ["K", 1]],
    matematika: [["M", 2], ["A", 3], ["T", 2], ["E", 1], ["I", 1], ["K", 1]],
    nilai: [["5", 1], ["6", 4], ["7", 5], ["8", 3], ["9", 5], ["10", 2]],
  };
  for (const id of T.DAFTAR_TABEL) {
    const t = T.TABEL_K3B5[id];
    sama(T.barisTabel(id).map((k, r) => [k, T.frekuensiTabel(id)[r]]), harus[id], `${id}: baris dan banyak`);
    sama(T.barisTabel(id).map((k) => hitungM(t.item, k)), T.frekuensiTabel(id), `${id}: banyak dihitung mandiri`);
    cek(T.frekuensiTabel(id).reduce((a, b) => a + b, 0) === t.item.length, `${id}: jumlah kolom banyak = banyak data`);
  }
  sama(T.TABEL_K3B5.statistika.item.join(""), "STATISTIKA", "kata STATISTIKA");
  sama(T.TABEL_K3B5.matematika.item.join(""), "MATEMATIKA", "kata MATEMATIKA");
  sama(T.TABEL_K3B5.nilai.item.map(Number), D.CACAH_K3B5.ulangan.data, "nilai ulangan sama di Sub-Bab A dan B");
  sama(T.barisTabel("nilai"), urutM(T.barisTabel("nilai").map(Number)).map(String), "baris nilai diurutkan dari terkecil");

  // Turus kelompok lima 0 sampai 20.
  let okTurus = true;
  for (let n = 0; n <= 20; n += 1) {
    const teks = T.teksTurusK3B5(n);
    if (nilaiTurus(teks) !== n) okTurus = false;
    if ((teks.match(/\|{5,}/g) ?? []).length > 0) okTurus = false;
    if ((teks.match(/卌/g) ?? []).length !== Math.floor(n / 5)) okTurus = false;
    const k = T.kalimatKelompok(n);
    if (n > 0) {
      const sisi = k.split(" = ");
      if (Number(sisi[sisi.length - 1]) !== n) okTurus = false;
      if (n >= 5) {
        const jumlah = sisi[sisi.length - 2].split(" + ").map(Number).reduce((a, b) => a + b, 0);
        if (jumlah !== n) okTurus = false;
      }
    }
  }
  cek(okTurus, "turus 0 sampai 20: tidak ada lima garis tegak berjajar, kelompok lima dan rumusnya benar");
  sama(T.kalimatKelompok(13), "2 kelompok lima dan 3 garis = 5 + 5 + 3 = 13", "kalimat turus 13");
  let s = setTurus(b0, 20);
  const tolak = tt(s, { t: "TURUS", d: 1 });
  cek(tolak.turus === 20 && tolak.pesan.length > 10, "turus paling banyak 20, ada pesan");
  const nol = tt(b0, { t: "TURUS", d: -1 });
  cek(nol.turus === 0 && nol.pesan.length > 5, "turus tidak bisa negatif");

  // Membaca tabel: semua tabel, semua pertanyaan, semua acuan 5 sampai 10, dibandingkan hitungan mandiri.
  let okBaca = true;
  let banyakBaca = 0;
  for (const id of T.DAFTAR_TABEL)
    for (const q of ["terbanyak", "tersedikit", "lebih", "kurang"])
      for (let acuan = T.ACUAN_MIN; acuan <= T.ACUAN_MAKS; acuan += 1) {
        banyakBaca += 1;
        const h = T.bacaTabel(id, q, acuan);
        const t = T.TABEL_K3B5[id];
        const kat = [...new Set(t.item)];
        if (q === "terbanyak" || q === "tersedikit") {
          const f = kat.map((k) => hitungM(t.item, k));
          const n = q === "terbanyak" ? besarM(f) : kecilM(f);
          const kunci = kat.filter((_, r) => f[r] === n);
          if (!h || !kunci.every((k) => h.jawab.includes(k)) || kat.filter((k) => !kunci.includes(k)).some((k) => h.jawab.split(/, dan |, | dan /).map((j) => j.replace("nilai ", "")).includes(k))) okBaca = false;
          if ((kunci.length > 1) !== h.kalimat.includes("sama banyak")) okBaca = false;
        } else if (!t.angka) {
          if (h !== null) okBaca = false;
        } else {
          const d = t.item.map(Number);
          const jumlah = d.filter((v) => (q === "lebih" ? v > acuan : v < acuan)).length;
          if (!h || Number(h.jawab) !== jumlah) okBaca = false;
          if (h && h.baris.some((r) => Number(T.barisTabel(id)[r]) === acuan)) okBaca = false;
          const r = h?.kalimat.match(/(\d+(?: \+ \d+)+ = \d+)/);
          if (r && r[1].split(" = ")[0].split(" + ").map(Number).reduce((a, b) => a + b, 0) !== jumlah) okBaca = false;
        }
      }
  cek(okBaca, `membaca tabel: ${banyakBaca} pertanyaan dihitung mandiri, nilai acuan tidak ikut, yang sama banyak disebut semua`);
  sama(T.bacaTabel("nilai", "lebih", 7).jawab, "10", "lebih dari 7 = 10 siswa (3 + 5 + 2)");
  sama(T.bacaTabel("nilai", "kurang", 7).jawab, "5", "kurang dari 7 = 5 siswa (1 + 4)");
  sama(T.bacaTabel("nilai", "lebih", 10).jawab, "0", "lebih dari 10 = 0 siswa");
  sama(T.bacaTabel("statistika", "terbanyak", 7).jawab, "T", "STATISTIKA: T terbanyak");
  sama(T.bacaTabel("statistika", "tersedikit", 7).jawab, "K", "STATISTIKA: K tersedikit");
  sama(T.bacaTabel("matematika", "tersedikit", 7).baris.length, 3, "MATEMATIKA: tiga huruf sama sedikit");
  sama(T.bacaTabel("matematika", "tersedikit", 7).jawab, "E, I, dan K", "daftar tiga huruf memakai koma sebelum dan");
  cek(D.kalimatUjung([2, 2, 2, 9, 9]).terkecil === "Data terkecil 2: Alen, Meutia, dan Galih (sama banyak)", "daftar tiga anak memakai koma sebelum dan");
  cek(T.bacaTabel("nilai", "terbanyak", 7).kalimat.includes("sama banyak"), "nilai ulangan: nilai 7 dan 9 sama banyak terbanyak");

  // Lengkap hanya bila semua turus dan semua angka benar.
  for (const id of T.DAFTAR_TABEL) {
    const lengkap = isiTabel(b0, id);
    cek(T.tabelLengkap(lengkap) && lengkap.pernah.includes(`lengkap:${id}`), `${id}: tabel lengkap tercatat`);
    const kurangSatu = isiTabel(b0, id, { kecuali: 0 });
    cek(!T.tabelLengkap(kurangSatu) && !kurangSatu.pernah.includes(`lengkap:${id}`), `${id}: angka benar tetapi satu belum dicacah: belum lengkap`);
    for (const d of [1, -1]) {
      const salah = isiTabel(b0, id, { geser: { r: 0, d } });
      cek(!T.tabelLengkap(salah) && !salah.pernah.includes(`lengkap:${id}`), `${id}: kolom banyak ${d > 0 ? "lebih" : "kurang"} satu: belum lengkap`);
    }
    const dua = tt(lengkap, { t: "KETUK", k: 0 });
    cek(dua.pesan.includes("sudah dicacah") && T.tabelLengkap(dua), `${id}: mengetuk dua kali ditolak`);
  }
  const salahManik = tt(isiTabel(b0, "manik"), { t: "TANYA", tanya: "lebih" });
  cek(salahManik.tanya === null && salahManik.pesan.includes("tabel nilai") && !salahManik.pernah.some((p) => p.startsWith("baca:manik:lebih")), "lebih dari tidak berlaku untuk tabel manik");
  const belumLengkap = tt(b0, { t: "TABEL", id: "statistika" }, { t: "TANYA", tanya: "terbanyak" });
  cek(!belumLengkap.pernah.some((p) => p.startsWith("baca:")) && belumLengkap.pesan.length > 10, "membaca tabel yang belum lengkap tidak tercatat");
  const ganti = tt(isiTabel(b0, "manik"), { t: "TABEL", id: "nilai" });
  cek(ganti.ketuk.every((b) => !b) && ganti.isi.every((n) => n === 0) && ganti.pernah.includes("lengkap:manik"), "ganti tabel mengosongkan tabel tanpa mencabut riwayat");

  // Fuzz.
  const acak = acakDari(55);
  const AKSI = [
    () => ({ t: "TURUS", d: acak(3) ? 1 : -1 }),
    () => ({ t: "TABEL", id: T.DAFTAR_TABEL[acak(4)] }),
    () => ({ t: "KETUK", k: acak(22) }),
    () => ({ t: "ISI", r: acak(7), d: acak(3) ? 1 : -1 }),
    () => ({ t: "TANYA", tanya: ["terbanyak", "tersedikit", "lebih", "kurang"][acak(4)] }),
    () => ({ t: "ACUAN", d: acak(2) ? 1 : -1 }),
  ];
  s = b0;
  let ok = true;
  const POLA = /^(turus:\d+|lengkap:(manik|statistika|matematika|nilai)|baca:(manik|statistika|matematika|nilai):(terbanyak|tersedikit)|baca:nilai:(lebih|kurang):\d+)$/;
  for (let n = 0; n < 20000; n += 1) {
    const sebelum = s;
    s = T.langkahTabelK3B5(s, AKSI[acak(AKSI.length)]());
    if (s.turus < 0 || s.turus > 20 || s.acuan < 5 || s.acuan > 10) ok = false;
    if (s.ketuk.length !== T.TABEL_K3B5[s.tabel].item.length || s.isi.length !== T.barisTabel(s.tabel).length) ok = false;
    if (s.isi.some((v) => v < 0 || v > 20)) ok = false;
    if (!sebelum.pernah.every((p) => s.pernah.includes(p))) ok = false;
    if (!s.pernah.every((p) => POLA.test(p))) ok = false;
    if (T.tabelLengkap(s) && !s.pernah.includes(`lengkap:${s.tabel}`)) ok = false;
    if ((s.tanya === "lebih" || s.tanya === "kurang") && !T.TABEL_K3B5[s.tabel].angka && T.tabelLengkap(s) && s.pernah.some((p) => p.startsWith(`baca:${s.tabel}:lebih`))) ok = false;
  }
  cek(ok, "fuzz 20.000 aksi lab tabel: batas terjaga, riwayat tidak dicabut dan berformat benar");
}

/* ------------------------------ Mesin Bertahap ------------------------------ */
cek(MD.SEMUA_MESIN_K3B5.length === 2, "ada dua definisi mesin (satu per sub-bab)");
{
  const posisi = [];
  for (const def of MD.SEMUA_MESIN_K3B5) {
    cek(def.stasiun.length === 4 && def.kasus.length === 3, `${def.id}: 4 stasiun, 3 kasus`);
    cek(new Set(def.kasus.map((k) => k.id)).size === def.kasus.length, `${def.id}: id kasus unik`);
    const lokal = [];
    for (const kasus of def.kasus) {
      cek(kasus.langkah.length === def.stasiun.length, `${def.id}/${kasus.id}: satu langkah per stasiun`);
      kasus.langkah.forEach((l, i) => {
        cek(l.stasiun === def.stasiun[i].id, `${kasus.id}: stasiun ${i} bernama ${def.stasiun[i].id}`);
        cek(l.opsi.length === 3 && new Set(l.opsi).size === 3, `${kasus.id}/${l.stasiun}: tiga pilihan unik (${JSON.stringify(l.opsi)})`);
        cek(l.opsi.filter((o) => o === l.benar).length === 1, `${kasus.id}/${l.stasiun}: tepat satu kunci`);
        cek(l.petunjuk.length > 20 && l.tanya.length > 5, `${kasus.id}/${l.stasiun}: tanya dan petunjuk ada`);
        lokal.push(l.opsi.indexOf(l.benar));
      });
    }
    posisi.push(...lokal);
    cek(new Set(lokal).size === 3, `${def.id}: letak kunci bervariasi (${lokal.join("")})`);
    for (let st = 0; st < def.stasiun.length; st += 1) cek(new Set(def.kasus.map((k) => k.langkah[st].opsi.indexOf(k.langkah[st].benar))).size >= 2, `${def.id}: letak kunci stasiun ${def.stasiun[st].id} berubah antar kasus`);

    let x = ME.awalMesin(def);
    cek(ME.indeksStasiun(x) === 0 && x.ke === 0 && x.misi === 0 && !x.selesai, `${def.id}: awal di stasiun pertama`);
    for (let mi = 0; mi < def.kasus.length; mi += 1) {
      for (let i = 0; i < def.stasiun.length; i += 1) {
        const l = ME.langkahAktif(x);
        cek(l !== null && x.misi === mi && x.ke === i, `${def.id}: kasus ${mi} stasiun ${i} aktif`);
        const lompat = ME.langkahMesin(x, { t: "LOMPAT", ke: i + 1 });
        cek(lompat.ke === x.ke && lompat.ditolak === x.ditolak + 1 && lompat.pesan.length > 5, `${def.id}: lompat stasiun ditolak`);
        for (const salahJ of l.opsi.filter((o) => o !== l.benar)) {
          const t = ME.langkahMesin(x, { t: "JAWAB", nilai: salahJ });
          cek(t.ke === x.ke && t.misi === x.misi && t.pesan === l.petunjuk, `${def.id}: jawaban salah "${salahJ}" tinggal dengan petunjuk`);
        }
        x = ME.langkahMesin(x, { t: "JAWAB", nilai: l.benar });
      }
      cek(x.fase === "sudah", `${def.id}: kasus ${mi} selesai`);
      x = ME.langkahMesin(x, { t: "LANJUT" });
    }
    cek(x.selesai && x.fase === "selesai", `${def.id}: semua kasus selesai`);
    const baru = ME.langkahMesin(x, { t: "ULANG" });
    cek(!baru.selesai && baru.misi === 0 && baru.ke === 0 && baru.ditolak === 0, `${def.id}: main lagi kembali ke awal`);
  }
  cek(new Set(posisi).size === 3, `letak kunci bervariasi di semua mesin (${posisi.join("")})`);
  sama(MD.SEMUA_MESIN_K3B5.map((d) => d.selesaiId), Object.values(K5.ID_MESIN_K3B5), "selesaiId mesin sama dengan id misi");

  // Kunci Mesin Urut diperiksa mandiri; semua pengecoh dihitung ulang dan harus salah.
  MD.KASUS_URUT.forEach((k, idx) => {
    const [urut, ujung, jang, banyakL] = MD.MESIN_URUT.kasus[idx].langkah;
    const d = k.data;
    cek(d.every((v) => Number.isInteger(v) && v >= 1 && v <= 12), `${k.id}: data 1 sampai 12, tanpa negatif`);
    const harusUrut = urutM(d, k.arah === "kecil").join(", ");
    cek(urut.benar === harusUrut, `${k.id}: urutan dari ${k.arah === "kecil" ? "terkecil" : "terbesar"} ${harusUrut}`);
    for (const o of urut.opsi.filter((q) => q !== urut.benar)) cek(o.split(", ").map(Number).join(", ") !== harusUrut, `${k.id}: pengecoh urutan "${o}" memang salah`);
    cek(urut.opsi.includes(d.join(", ")), `${k.id}: pengecoh urutan asli (belum diurutkan)`);
    cek(ujung.benar === `terkecil ${kecilM(d)}, terbesar ${besarM(d)}`, `${k.id}: terkecil ${kecilM(d)}, terbesar ${besarM(d)}`);
    for (const o of ujung.opsi.filter((q) => q !== ujung.benar)) {
      const m = o.match(/^terkecil (\d+), terbesar (\d+)$/);
      cek(m && !(Number(m[1]) === kecilM(d) && Number(m[2]) === besarM(d)), `${k.id}: pengecoh ujung "${o}" memang salah`);
    }
    cek(d[0] !== kecilM(d), `${k.id}: data pertama bukan terkecil (pengecoh bermakna)`);
    const rb = rumus(jang.benar);
    cek(rb && rb.benar && rb.op === "−" && rb.a === besarM(d) && rb.b === kecilM(d), `${k.id}: jangkauan ${besarM(d)} − ${kecilM(d)}`);
    for (const o of jang.opsi.filter((q) => q !== jang.benar)) {
      const r = rumus(o);
      cek(r && r.c !== besarM(d) - kecilM(d) && !(r.op === "−" && r.a === besarM(d) && r.b === kecilM(d)), `${k.id}: pengecoh jangkauan "${o}" memang bukan jangkauan`);
    }
    cek(banyakL.benar === String(hitungM(d, k.nilai)) && hitungM(d, k.nilai) >= 2, `${k.id}: nilai ${k.nilai} muncul ${hitungM(d, k.nilai)} kali`);
    cek(banyakL.tanya.includes(String(k.nilai)), `${k.id}: tanya banyak menyebut nilai ${k.nilai}`);
    for (const o of banyakL.opsi.filter((q) => q !== banyakL.benar)) cek(Number(o) !== hitungM(d, k.nilai), `${k.id}: pengecoh banyak ${o} memang salah`);
  });
  cek(MD.KASUS_URUT.some((k) => k.arah === "kecil") && MD.KASUS_URUT.some((k) => k.arah === "besar"), "mesin urut: dari terkecil dan dari terbesar");

  // Kunci Mesin Tabel diperiksa mandiri.
  MD.KASUS_TABEL.forEach((k, idx) => {
    const [turus, banyakL, baca, banding] = MD.MESIN_TABEL.kasus[idx].langkah;
    const total = k.item.length;
    const turusTanya = turus.tanya.match(/Turusnya ([卌| ]+)\./);
    cek(turusTanya && nilaiTurus(turusTanya[1]) === total, `${k.id}: gambar turus di pertanyaan bernilai ${total}`);
    cek(turus.benar === String(total), `${k.id}: banyak semua data ${total}`);
    for (const o of turus.opsi.filter((q) => q !== turus.benar)) cek(Number(o) !== total, `${k.id}: pengecoh turus ${o} memang salah`);
    cek(banyakL.benar === String(hitungM(k.item, k.kat)), `${k.id}: ${k.kat} muncul ${hitungM(k.item, k.kat)} kali`);
    for (const o of banyakL.opsi.filter((q) => q !== banyakL.benar)) cek(Number(o) !== hitungM(k.item, k.kat), `${k.id}: pengecoh banyak ${o} memang salah`);
    const kat = [...new Set(k.item)];
    const f = kat.map((c) => hitungM(k.item, c));
    const n = k.baca === "terbanyak" ? besarM(f) : kecilM(f);
    const kunci = kat.filter((_, r) => f[r] === n);
    cek(kunci.length === 1, `${k.id}: ${k.baca} tunggal (${kunci.join(",")})`);
    cek(baca.benar.endsWith(` ${kunci[0]}`), `${k.id}: ${k.baca} ${kunci[0]}`);
    for (const o of baca.opsi.filter((q) => q !== baca.benar)) {
      const c = o.split(" ").slice(1).join(" ");
      cek(kat.includes(c) && hitungM(k.item, c) !== n, `${k.id}: pengecoh baca "${o}" memang bukan ${k.baca}`);
    }
    if (k.banding.jenis === "selisih") {
      const harusS = hitungM(k.item, k.banding.a) - hitungM(k.item, k.banding.b);
      cek(harusS > 0 && banding.benar === String(harusS), `${k.id}: selisih ${k.banding.a} dan ${k.banding.b} = ${harusS}`);
      for (const o of banding.opsi.filter((q) => q !== banding.benar)) cek(Number(o) !== harusS, `${k.id}: pengecoh selisih ${o} memang salah`);
    } else {
      const d = k.item.map(Number);
      const harusL = d.filter((v) => v > k.banding.acuan).length;
      cek(banding.benar === String(harusL), `${k.id}: lebih dari ${k.banding.acuan} = ${harusL}`);
      cek(banding.opsi.includes(String(d.filter((v) => v >= k.banding.acuan).length)), `${k.id}: pengecoh nilai acuan ikut dihitung`);
      for (const o of banding.opsi.filter((q) => q !== banding.benar)) cek(Number(o) !== harusL, `${k.id}: pengecoh lebih dari ${o} memang salah`);
    }
  });
  sama(MD.KASUS_TABEL.find((k) => k.id === "nilai").item.map(Number), D.CACAH_K3B5.ulangan.data, "mesin tabel memakai nilai ulangan buku yang sama");
  sama(MD.KASUS_TABEL.find((k) => k.id === "manik").item.map((w) => w[0].toUpperCase() + w.slice(1)), T.TABEL_K3B5.manik.item, "mesin tabel memakai manik yang sama dengan lab");
}

/* ------------------------------ Skenario (kunci dihitung mandiri) ------------------------------ */
{
  const A = SK.SKENARIO_K3B5A;
  const B = SK.SKENARIO_K3B5B;
  for (const s of [A, B]) {
    cek(s.adegan.length >= 5 && s.adegan.length <= 8, `${s.id}: 5 sampai 8 adegan`);
    cek(new Set(s.adegan.map((a) => a.jenis)).size >= 4, `${s.id}: minimal 4 jenis adegan`);
    cek(s.adegan[0].jenis === "narasi" && s.adegan[s.adegan.length - 1].jenis === "akhir", `${s.id}: mulai narasi, berakhir akhir`);
    for (const a of s.adegan.filter((q) => q.jenis === "pilih")) cek(a.opsi.length === 3 && a.opsi.filter((o) => o.benar).length === 1, `${s.id}/${a.id}: tiga pilihan, satu benar`);
  }
  const suara = { Alen: 7, Citra: 4, Beni: 9, Dewi: 5 };
  const v = Object.values(suara);
  const adA = (id) => A.adegan.find((a) => a.id === id);
  cek(adA("suara-beni").jumlah === suara.Beni, "A: stik suara Beni = 9");
  const [s1, s2, s3] = adA("urut").soal;
  cek(s1.jawaban === String(urutM(v)[3]) && s1.teks.includes(urutM(v).slice(0, 3).join(", ")), "A: urutan dari terkecil 4, 5, 7, 9");
  cek(s2.jawaban === String(kecilM(v)), "A: suara paling sedikit 4");
  cek(s3.jawaban === String(besarM(v) - kecilM(v)) && s3.teks.includes(`${besarM(v)} − ${kecilM(v)}`), "A: jangkauan 9 − 4 = 5");
  for (const so of [s1, s2, s3]) cek(so.opsi.length === 3 && new Set(so.opsi).size === 3 && so.opsi.filter((o) => o === so.jawaban).length === 1, `A: soal "${so.teks}" tiga pilihan, satu kunci`);
  const ketua = adA("ketua").opsi.find((o) => o.benar);
  const terbanyak = Object.keys(suara).find((n) => suara[n] === besarM(v));
  cek(ketua.teks.startsWith(terbanyak), `A: ketua kelas ${terbanyak} (suara terbanyak)`);
  const jSalah = adA("jangkauan-salah").opsi;
  for (const o of jSalah) {
    const r = o.teks.match(/(\d+) ([+−]) (\d+) = (\d+)/);
    if (r && o.benar) cek(Number(r[1]) === besarM(v) && Number(r[3]) === kecilM(v) && r[2] === "−", "A: pilihan benar jangkauan 9 − 4");
  }
  cek(jSalah.filter((o) => !o.benar).every((o) => !o.teks.includes(`${besarM(v)} − ${kecilM(v)}`)), "A: pengecoh jangkauan bukan 9 − 4");
  cek(adA("selisih").target === suara.Beni - suara.Citra && adA("selisih").target <= adA("selisih").maks && adA("selisih").maks <= 20, "A: selisih Beni dan Citra = 5");

  const ul = D.CACAH_K3B5.ulangan.data;
  const adB = (id) => B.adegan.find((a) => a.id === id);
  const [u1, u2, u3] = adB("ujung").soal;
  cek(u1.jawaban === String(kecilM(ul)) && u2.jawaban === String(besarM(ul)) && u3.jawaban === String(besarM(ul) - kecilM(ul)), "B: terkecil 5, terbesar 10, jangkauan 5 dari data ulangan");
  cek(adB("turus-9").jumlah === hitungM(ul, 9), "B: stik nilai 9 = 5");
  cek(adB("kelima").opsi.find((o) => o.benar).teks.includes("miring"), "B: garis kelima dicoret miring");
  const [t1, t2, t3] = adB("tabel").soal;
  cek(t1.jawaban === String(nilaiTurus(t1.teks.match(/Turus ([卌| ]+) menyatakan/)[1])), "B: nilai turus di soal dihitung mandiri (13)");
  cek(t2.jawaban === "banyak", "B: kolom ketiga berisi banyak");
  cek(t3.jawaban === String(hitungM([..."STATISTIKA"], "T")), "B: T pada STATISTIKA = 3");
  for (const so of [u1, u2, u3, t1, t2, t3]) cek(so.opsi.length === 3 && new Set(so.opsi).size === 3 && so.opsi.filter((o) => o === so.jawaban).length === 1, `B: soal "${so.teks}" tiga pilihan, satu kunci`);
  const lebih = adB("lebih-7");
  const harusLebih = ul.filter((x) => x > 7).length;
  const benarL = lebih.opsi.find((o) => o.benar);
  {
    const m = benarL.teks.match(/^(\d+) siswa: nilai (.+)$/);
    const nilaiDisebut = m ? m[2].split(/, dan |, | dan /).map(Number) : [];
    cek(m && Number(m[1]) === harusLebih, "B: pilihan benar 10 siswa dihitung ulang");
    sama(nilaiDisebut, [8, 9, 10], "B: pilihan benar menyebut nilai 8, 9, dan 10 saja (tanpa 7)");
    const salah15 = lebih.opsi.find((o) => o.teks.startsWith("15 siswa"));
    cek(salah15 && !salah15.benar && ul.filter((x) => x >= 7).length === 15, "B: pengecoh 15 = nilai 7 ikut dihitung");
    cek(benarL.umpan.includes(`${[8, 9, 10].map((n) => hitungM(ul, n)).join(" + ")} = ${harusLebih}`), "B: umpan menunjukkan 3 + 5 + 2 = 10");
  }
  cek(lebih.opsi.filter((o) => !o.benar).every((o) => !o.teks.includes(`${harusLebih} siswa`)), "B: pengecoh lebih dari 7 bukan 10");
  for (const n of [7, 8, 9, 10]) cek(lebih.cerita.includes(`nilai ${n} ada ${hitungM(ul, n)}`), `B: cerita lebih dari 7 memuat banyak nilai ${n} yang benar`);
  const kurang = adB("kurang-7");
  cek(kurang.target === ul.filter((x) => x < 7).length && kurang.target <= kurang.maks && kurang.maks <= 20, "B: kurang dari 7 = 5");
  cek(kurang.cerita.includes(`nilai 5 ada ${hitungM(ul, 5)}`) && kurang.cerita.includes(`nilai 6 ada ${hitungM(ul, 6)}`), "B: cerita kurang dari 7 benar");
}

/* ------------------------------ Misi ------------------------------ */
const keadaanAwal = [kd(D.awalDataK3B5()), kt(T.awalTabelK3B5())];
const SEMUA_ID = [...Object.values(K5.ID_MESIN_K3B5), ...Object.values(K5.ID_SKENARIO_K3B5), "x", "mesin-ruas", "peta-alfa"];
for (const h of ["A", "B"]) {
  const daftar = K5.daftarMisiK3Bab5(h);
  const wajib = daftar.filter((m) => m.wajib);
  cek(wajib.length >= 3, `sub-bab ${h}: minimal 3 misi wajib (${wajib.length})`);
  cek(daftar.some((m) => !m.wajib), `sub-bab ${h}: ada tantangan bebas`);
  const idMisi = new Set();
  for (const m of daftar) {
    cek(!idMisi.has(m.id), `misi ${m.id}: id unik`);
    idMisi.add(m.id);
    cek(m.id.startsWith(`${h.toLowerCase()}-`), `misi ${m.id}: berawalan huruf sub-bab`);
    cek(m.teks.length >= 10 && m.teks.length <= 170, `misi ${m.id}: panjang teks ${m.teks.length}`);
    for (const ke of keadaanAwal) cek(!m.cek(ke), `misi ${m.id}: keadaan awal ${ke.alat} tidak memenuhinya`);
  }
  cek(!M0.wajibSelesai(M0.tampilMisi(daftar), new Set()), `sub-bab ${h}: gerbang tertutup di awal`);
  for (const m of daftar.filter((x) => x.id.endsWith("mesin") || x.id.endsWith("skenario"))) {
    const idBenar = m.id.endsWith("mesin") ? K5.ID_MESIN_K3B5[h] : K5.ID_SKENARIO_K3B5[h];
    cek(m.cek(sel(idBenar)), `misi ${m.id}: tercapai oleh ${idBenar}`);
    for (const lain of SEMUA_ID.filter((v) => v !== idBenar)) cek(!m.cek(sel(lain)), `misi ${m.id}: tidak boleh tercapai oleh ${lain}`);
  }
  for (const m of daftar.filter((x) => !x.id.endsWith("mesin") && !x.id.endsWith("skenario"))) for (const id of SEMUA_ID) cek(!m.cek(sel(id)), `misi ${m.id}: tidak tercapai oleh selesai ${id}`);
  sama(MD.SEMUA_MESIN_K3B5["AB".indexOf(h)].selesaiId, K5.ID_MESIN_K3B5[h], `selesaiId mesin ${h}`);
  cek(TK.MISI_K3B5[h].length > 60 && TK.NAMA_SIM_K3B5[h].length > 10 && TK.misiAwalK3Bab5(h).startsWith("Simulasi 1. Misi:"), `teks misi ${h}`);
}
cek(TK.hurufK3B5("B") === "B" && TK.hurufK3B5("Z") === "A" && TK.hurufK3B5("A") === "A", "hurufK3B5 jatuh ke A bila tak dikenal");

const misiDi = (h, id) => K5.daftarMisiK3Bab5(h).find((m) => m.id === id);
const penuh = (h, id, ke) => cek(misiDi(h, id).cek(ke), `misi ${id} tercapai`);
const belum = (h, id, ke, ket) => cek(!misiDi(h, id).cek(ke), `misi ${id} belum tercapai: ${ket}`);

/* ---- Bukti tiap misi bisa dicapai dari alat sebenarnya, lewat tombol, dan near-miss ---- */
{
  const a0 = D.awalDataK3B5();
  penuh("A", "a-urut", kd(dd(a0, { t: "UBAH", i: 2, d: 1 }, { t: "URUT", arah: "kecil" }, { t: "URUT", arah: "besar" })));
  belum("A", "a-urut", kd(dd(a0, { t: "URUT", arah: "kecil" }, { t: "URUT", arah: "besar" })), "data belum diubah");
  belum("A", "a-urut", kd(dd(a0, { t: "UBAH", i: 2, d: 1 }, { t: "URUT", arah: "kecil" })), "baru dari terkecil");
  penuh("A", "a-urut", kd(dd(a0, { t: "URUT", arah: "kecil" }, { t: "UBAH", i: 0, d: -1 }, { t: "URUT", arah: "besar" })));
  penuh("A", "a-ujung", kd(dd(a0, { t: "TOGGLE", rep: "ujung" })));
  belum("A", "a-ujung", kd(dd(a0, { t: "URUT", arah: "kecil" }, { t: "TOGGLE", rep: "ujung" })), "data sudah diurutkan");
  belum("A", "a-ujung", kd(dd(setAnak(a0, 0, 2), { t: "TOGGLE", rep: "ujung" })), "anak pertama memang terkecil");
  belum("A", "a-ujung", kd(a0), "Terkecil dan Terbesar belum menyala");
  const j5 = setAnak(a0, 2, 8);
  cek(besarM(j5.anak) - kecilM(j5.anak) === 5, "data [6,3,8,4,7] berjangkauan 5");
  penuh("A", "a-jangkauan", kd(dd(j5, { t: "TOGGLE", rep: "jangkauan" })));
  belum("A", "a-jangkauan", kd(j5), "Jangkauan belum menyala");
  belum("A", "a-jangkauan", kd(dd(a0, { t: "TOGGLE", rep: "jangkauan" })), "jangkauan 6");
  belum("A", "a-jangkauan", kd(dd(setAnak(a0, 2, 7), { t: "TOGGLE", rep: "jangkauan" })), "jangkauan 4");
  penuh("A", "a-jangkauan", kd(dd(a0, { t: "TOGGLE", rep: "jangkauan" }, { t: "UBAH", i: 2, d: -1 })));
  penuh("A", "a-banding", kd(dd(a0, { t: "PILIH", i: 1 }, { t: "PILIH", i: 4 })));
  belum("A", "a-banding", kd(dd(a0, { t: "PILIH", i: 1 }, { t: "PILIH", i: 3 })), "selisih 1");
  belum("A", "a-banding", kd(dd(a0, { t: "PILIH", i: 0 }, { t: "PILIH", i: 2 })), "selisih 3");
  belum("A", "a-banding", kd(dd(a0, { t: "PILIH", i: 1 })), "baru satu anak");
  penuh("A", "a-cacah", kd(cacahSemua(a0)));
  belum("A", "a-cacah", kd(cacahSemua(a0, 19)), "kurang satu kartu");
  belum("A", "a-cacah", kd(cacahSemua(dd(a0, { t: "CACAH", id: "kuis" }))), "kartu kuis bukan nilai ulangan");
  penuh("A", "a-kuis", kd(cacahSemua(dd(a0, { t: "CACAH", id: "kuis" }))));
  belum("A", "a-kuis", kd(cacahSemua(a0)), "nilai ulangan bukan kuis");
  const lima = setSemua(a0, [5, 5, 5, 5, 5]);
  penuh("A", "a-nol", kd(dd(lima, { t: "TOGGLE", rep: "jangkauan" })));
  belum("A", "a-nol", kd(dd(setAnak(lima, 4, 6), { t: "TOGGLE", rep: "jangkauan" })), "satu anak 6");
  belum("A", "a-nol", kd(lima), "Jangkauan belum menyala");
  penuh("A", "a-sama", kd(dd(setAnak(a0, 3, 9), { t: "TOGGLE", rep: "ujung" })));
  belum("A", "a-sama", kd(dd(a0, { t: "TOGGLE", rep: "ujung" })), "terbesar tunggal");
  belum("A", "a-sama", kd(dd(setAnak(a0, 0, 3), { t: "TOGGLE", rep: "ujung" })), "dua anak sama-sama terkecil, bukan terbesar");
  for (const m of K5.MISI_A) belum("A", m.id, kt(isiTabel(setTurus(T.awalTabelK3B5(), 13), "statistika")), "alat tabel bukan lab data");
}
{
  const b0 = T.awalTabelK3B5();
  penuh("B", "b-turus", kt(setTurus(b0, 13)));
  belum("B", "b-turus", kt(setTurus(b0, 12)), "turus 12");
  belum("B", "b-turus", kt(setTurus(setTurus(b0, 12), 0)), "naik sampai 12 lalu dihapus semua");
  penuh("B", "b-turus", kt(setTurus(setTurus(b0, 15), 13)));
  penuh("B", "b-dua-puluh", kt(setTurus(b0, 20)));
  belum("B", "b-dua-puluh", kt(setTurus(b0, 19)), "turus 19");
  penuh("B", "b-manik", kt(isiTabel(b0, "manik")));
  belum("B", "b-manik", kt(isiTabel(b0, "manik", { geser: { r: 1, d: 1 } })), "banyak biru lebih satu");
  belum("B", "b-manik", kt(isiTabel(b0, "manik", { kecuali: 5 })), "satu manik belum dicacah");
  belum("B", "b-manik", kt(isiTabel(b0, "statistika")), "tabel huruf bukan manik");
  penuh("B", "b-huruf", kt(isiTabel(b0, "statistika")));
  belum("B", "b-huruf", kt(isiTabel(b0, "matematika")), "MATEMATIKA bukan STATISTIKA");
  belum("B", "b-huruf", kt(isiTabel(b0, "statistika", { geser: { r: 1, d: -1 } })), "banyak T kurang satu");
  const st = isiTabel(b0, "statistika");
  penuh("B", "b-paling", kt(tt(st, { t: "TANYA", tanya: "terbanyak" }, { t: "TANYA", tanya: "tersedikit" })));
  belum("B", "b-paling", kt(tt(st, { t: "TANYA", tanya: "terbanyak" })), "baru terbanyak");
  belum("B", "b-paling", kt(tt(b0, { t: "TABEL", id: "statistika" }, { t: "TANYA", tanya: "terbanyak" }, { t: "TANYA", tanya: "tersedikit" })), "tabel belum lengkap");
  belum("B", "b-paling", kt(tt(isiTabel(b0, "matematika"), { t: "TANYA", tanya: "terbanyak" }, { t: "TANYA", tanya: "tersedikit" })), "tabel MATEMATIKA");
  const ni = isiTabel(b0, "nilai");
  penuh("B", "b-lebih", kt(tt(ni, { t: "TANYA", tanya: "lebih" })));
  belum("B", "b-lebih", kt(tt(isiTabel(tt(b0, { t: "ACUAN", d: 1 }), "nilai"), { t: "TANYA", tanya: "lebih" })), "lebih dari 8");
  belum("B", "b-lebih", kt(tt(ni, { t: "TANYA", tanya: "kurang" })), "kurang dari 7");
  belum("B", "b-lebih", kt(tt(isiTabel(b0, "nilai", { geser: { r: 2, d: 1 } }), { t: "TANYA", tanya: "lebih" })), "tabel nilai belum benar");
  penuh("B", "b-kurang", kt(tt(ni, { t: "TANYA", tanya: "kurang" })));
  belum("B", "b-kurang", kt(tt(isiTabel(tt(b0, { t: "ACUAN", d: -1 }), "nilai"), { t: "TANYA", tanya: "kurang" })), "kurang dari 6");
  penuh("B", "b-sama", kt(tt(isiTabel(b0, "matematika"), { t: "TANYA", tanya: "tersedikit" })));
  belum("B", "b-sama", kt(tt(isiTabel(b0, "matematika"), { t: "TANYA", tanya: "terbanyak" })), "terbanyak bukan tersedikit");
  for (const m of K5.MISI_B) belum("B", m.id, kd(cacahSemua(dd(D.awalDataK3B5(), { t: "TOGGLE", rep: "jangkauan" }))), "alat data bukan lab tabel");
}

/* ---- Gerbang bekerja ---- */
for (const h of ["A", "B"]) {
  const daftar = K5.daftarMisiK3Bab5(h);
  const tampil = M0.tampilMisi(daftar);
  const sudah = new Set();
  const catat = (keadaan) => {
    for (const id of M0.misiBaru(daftar, keadaan, sudah)) sudah.add(id);
  };
  const urut = daftar.filter((m) => m.wajib).map((m) => m.id);
  if (h === "A") {
    let s = dd(D.awalDataK3B5(), { t: "TOGGLE", rep: "ujung" });
    catat(kd(s));
    s = dd(s, { t: "UBAH", i: 2, d: -1 }, { t: "URUT", arah: "kecil" }, { t: "URUT", arah: "besar" }, { t: "TOGGLE", rep: "jangkauan" });
    catat(kd(s));
    s = dd(s, { t: "PILIH", i: 1 }, { t: "PILIH", i: 4 });
    catat(kd(s));
    s = cacahSemua(s);
    catat(kd(s));
  } else {
    let s = setTurus(T.awalTabelK3B5(), 13);
    catat(kt(s));
    s = isiTabel(s, "manik");
    catat(kt(s));
    s = tt(isiTabel(s, "statistika"), { t: "TANYA", tanya: "terbanyak" }, { t: "TANYA", tanya: "tersedikit" });
    catat(kt(s));
    s = tt(isiTabel(s, "nilai"), { t: "TANYA", tanya: "lebih" });
    catat(kt(s));
  }
  cek(!M0.wajibSelesai(tampil, sudah) && sudah.size >= 3, `gerbang ${h}: masih tertutup setelah misi alat saja (${[...sudah].join(",")})`);
  catat(sel(K5.ID_MESIN_K3B5[h]));
  cek(!M0.wajibSelesai(tampil, sudah), `gerbang ${h}: tertutup tanpa skenario`);
  catat(sel(K5.ID_SKENARIO_K3B5[h]));
  cek(M0.wajibSelesai(tampil, sudah), `gerbang ${h}: terbuka setelah semua misi wajib (belum: ${urut.filter((id) => !sudah.has(id)).join(",")})`);
  catat(keadaanAwal[0]);
  catat(keadaanAwal[1]);
  cek(M0.wajibSelesai(tampil, sudah), `gerbang ${h}: tetap terbuka setelah alat diubah`);
}
{
  const tampil = M0.tampilMisi(K5.daftarMisiK3Bab5("A"));
  const o = { adaMisi: true, wajibSelesai: M0.wajibSelesai(tampil, new Set()), dilewati: false, disentuh: false };
  cek(!M0.bolehLanjut(o) && !M0.bolehLewati(o), "belum menyentuh: tidak boleh lanjut dan belum boleh lewati");
  cek(M0.bolehLewati({ ...o, disentuh: true }) && !M0.bolehLanjut({ ...o, disentuh: true }), "setelah menyentuh: boleh melewati misi");
  cek(M0.bolehLanjut({ ...o, disentuh: true, dilewati: true }), "setelah melewati: boleh lanjut");
}

/* ---- Konsep sub-bab berikutnya tidak dipakai di sub-bab sebelumnya ---- */
{
  const bocorA = /(tabel|kolom|kelompok lima|卌|huruf|manik|lidi|STATISTIKA|MATEMATIKA|lebih dari|kurang dari)/i;
  const teksMisiA = [TK.MISI_K3B5.A, TK.NAMA_SIM_K3B5.A, ...K5.MISI_A.map((m) => m.teks)].join(" ");
  cek(!bocorA.test(teksMisiA), `misi Sub-Bab A tidak memakai tabel, kelompok lima, huruf, manik, atau lebih/kurang dari (${teksMisiA.match(bocorA)?.[0]})`);
  cek(!bocorA.test(JSON.stringify(SK.SKENARIO_K3B5A)), `skenario A bebas konsep B (${JSON.stringify(SK.SKENARIO_K3B5A).match(bocorA)?.[0]})`);
  cek(!bocorA.test(JSON.stringify(MD.MESIN_URUT)), `mesin A bebas konsep B (${JSON.stringify(MD.MESIN_URUT).match(bocorA)?.[0]})`);
  // Semua teks yang bisa tampil atau terucap di lab A, dari banyak keadaan acak.
  const acak = acakDari(9);
  let s = D.awalDataK3B5();
  let bocor = "";
  for (let n = 0; n < 4000; n += 1) {
    const aksi = [
      { t: "UBAH", i: acak(5), d: acak(2) ? 1 : -1 },
      { t: "URUT", arah: ["asal", "kecil", "besar"][acak(3)] },
      { t: "TOGGLE", rep: acak(2) ? "ujung" : "jangkauan" },
      { t: "PILIH", i: acak(5) },
      { t: "KARTU", k: acak(20) },
      { t: "CACAH", id: D.DAFTAR_CACAH[acak(2)] },
    ][acak(6)];
    s = D.langkahDataK3B5(s, aksi);
    const u = D.kalimatUjung(s.anak);
    const semua = [s.pesan, D.ucapKumpul(s), D.ucapBanding(s), D.ucapCacah(s), u.terkecil, u.terbesar, D.kalimatJangkauan(s.anak), D.kalimatBanding(s) ?? ""].join(" ");
    if (!bocor && bocorA.test(semua)) bocor = semua;
  }
  cek(!bocor, `teks dan ucapan lab A bebas konsep B ${bocor}`);
  // Teks tampilan komponen lab A (komentar dibuang).
  const sumber = readFileSync(new URL("../src/components/modul/SimulasiLabDataK3.tsx", import.meta.url), "utf8")
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/^\s*\/\/.*$/gm, "");
  cek(!bocorA.test(sumber), `komponen Lab Data Kelompok bebas konsep B (${sumber.match(bocorA)?.[0]})`);
  // Sub-Bab B adalah pencapaian bab: skenario B mengulang konsep A dan B.
  const jsonB = JSON.stringify(SK.SKENARIO_K3B5B);
  cek(/terkecil/.test(jsonB) && /terbesar/.test(jsonB) && /jangkauan/.test(jsonB) && /10 − 5/.test(jsonB), "skenario B mengulang terkecil, terbesar, dan jangkauan (konsep A)");
  cek(/kelompok lima/.test(jsonB) && /tabel/i.test(jsonB) && /lebih dari 7/.test(jsonB) && /kurang dari 7/.test(jsonB), "skenario B memuat kelompok lima, tabel, lebih dari, dan kurang dari (konsep B)");
}

/* ---- Data ringkas bab ini ---- */
{
  const r = JSON.parse(readFileSync(new URL("../src/data/kelas3-bab5-ringkas.json", import.meta.url), "utf8"));
  cek(r.chapter_id === "mtk-3-bab5" && r.phase_code === "FASE_B" && r.grade === 3, "ringkas: identitas bab");
  sama(Object.keys(r.subBab), ["A", "B"], "ringkas: sub-bab A dan B");
  const manik = r.subBab.B.infografis.panel.find((p) => p.id === "b-tabel").butir.find((b) => b.id === "manik").visual.baris;
  sama(manik, T.barisTabel("manik").map((k, i) => [k, T.frekuensiTabel("manik")[i]]), "ringkas: tabel manik sama dengan lab");
  const lk = r.subBab.B.infografis.panel.find((p) => p.id === "b-lebih-kurang");
  const ul = D.CACAH_K3B5.ulangan.data;
  sama(lk.sisi[0].visual.baris, [8, 9, 10].map((n) => [String(n), hitungM(ul, n)]), "ringkas: baris lebih dari 7");
  sama(lk.sisi[1].visual.baris, [5, 6].map((n) => [String(n), hitungM(ul, n)]), "ringkas: baris kurang dari 7");
  cek(!bocorRingkas(r.subBab.A), "ringkas A tidak memakai tabel, kelompok lima, huruf, atau manik");
}
function bocorRingkas(sub) {
  return /(tabel|kolom|kelompok lima|卌|huruf|manik|STATISTIKA)/i.test(JSON.stringify(sub));
}

console.log(`Lulus ${lulus}, gagal ${gagal}`);
process.exit(gagal ? 1 : 0);
