/**
 * Lab Data (Kelas 5 Bab 8, Sub-Bab A: Mengumpulkan Data): logika murni. Satu alat, tiga tampilan.
 *  Turus : jawaban mentah dicatat satu per satu, satu jawaban satu garis, dikelompokkan lima (empat tegak, satu miring)
 *          (Data Collection Cycle dan Tally Mark Protocol).
 *  Tabel : dari turus diisi frekuensi tiap kategori, lalu jumlah frekuensi harus sama dengan banyak data;
 *          rekap yang salah dicari lewat selisih jumlahnya (Frequency Table Construction).
 *  Mode  : frekuensi terbesar disebut mode, lalu dipakai untuk keputusan (Data-Informed Decision).
 * Data buatan sendiri mengikuti konteks Buku Siswa Kelas V Bab 8 Sub-Bab A (sayuran, donat Anggi, cara berangkat, sepatu, nilai).
 * Tidak membahas gambar data bersimbol atau diagram (itu Sub-Bab B dan C). Murni: tanpa React, tanpa jaringan, tanpa impor.
 * Diuji di scripts/uji-lab-k5b8.mjs.
 */

export const BANYAK_KATEGORI = 4;
export const KELOMPOK = 5;
export const BATAS_F = 30;

export type DataTurus = {
  nama: string;
  kategori: [string, string, string, string];
  /** Frekuensi yang benar tiap kategori. */
  f: [number, number, number, number];
  /** Urutan jawaban mentah (indeks kategori), disusun tetap dari f. */
  mentah: number[];
  /** Rekap teman yang salah: kategori ke-k lebih atau kurang satu. */
  salah: { k: number; selisih: 1 | -1 };
};

/** Susunan tetap: tiap kategori diulang f kali lalu ditukar dengan pengacak linear tetap. */
export function susunMentah(f: readonly number[], benih: number): number[] {
  const hasil: number[] = [];
  f.forEach((banyak, k) => {
    for (let n = 0; n < banyak; n += 1) hasil.push(k);
  });
  let s = benih >>> 0;
  for (let i = hasil.length - 1; i > 0; i -= 1) {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    const j = (s >>> 8) % (i + 1);
    [hasil[i], hasil[j]] = [hasil[j], hasil[i]];
  }
  return hasil;
}

const buat = (nama: string, kategori: DataTurus["kategori"], f: DataTurus["f"], benih: number, salah: DataTurus["salah"]): DataTurus => ({ nama, kategori, f, mentah: susunMentah(f, benih), salah });

export const DATA_TURUS: DataTurus[] = [
  buat("sayuran favorit", ["Bayam", "Wortel", "Kangkung", "Sawi"], [6, 5, 2, 1], 101, { k: 2, selisih: 1 }),
  buat("penjualan donat Anggi", ["Cokelat", "Keju", "Stroberi", "Kacang"], [6, 4, 3, 2], 202, { k: 0, selisih: -1 }),
  buat("cara berangkat sekolah", ["Jalan kaki", "Sepeda", "Angkot", "Motor"], [5, 5, 3, 1], 303, { k: 3, selisih: 1 }),
  buat("ukuran sepatu", ["Ukuran 33", "Ukuran 34", "Ukuran 35", "Ukuran 36"], [2, 6, 5, 3], 404, { k: 1, selisih: -1 }),
  buat("nilai ulangan", ["Nilai 60", "Nilai 70", "Nilai 80", "Nilai 90"], [3, 4, 7, 2], 505, { k: 2, selisih: 1 }),
  buat("olahraga favorit", ["Sepak bola", "Bulu tangkis", "Renang", "Voli"], [5, 3, 5, 2], 606, { k: 1, selisih: 1 }),
];

export const idLima = (i: number): string => `lima:${i}`;
export const idTurus = (i: number): string => `turus:${i}`;
export const idTabel = (i: number): string => `tabel:${i}`;
export const idSalah = (i: number): string => `salah:${i}`;
export const idMode = (i: number): string => `mode:${i}`;
export const idPutus = (i: number): string => `putus:${i}`;

const catat = (daftar: string[], ...id: string[]): string[] => id.reduce((a, v) => (a.includes(v) ? a : [...a, v]), daftar);
const sah = (i: number, n: number): boolean => Number.isInteger(i) && i >= 0 && i < n;

/* ------------------------------ Hitungan murni ------------------------------ */

export const banyakData = (d: DataTurus): number => d.f.reduce((a, b) => a + b, 0);
export const jumlahF = (f: readonly number[]): number => f.reduce((a, b) => a + b, 0);
/** Banyak kelompok lima penuh dan sisa garis untuk satu turus. */
export const kelompokTurus = (jumlah: number): { penuh: number; sisa: number } => ({ penuh: Math.floor(jumlah / KELOMPOK), sisa: jumlah % KELOMPOK });
export const fTertinggi = (f: readonly number[]): number => Math.max(...f);
export const fTerendah = (f: readonly number[]): number => Math.min(...f);
/** Indeks kategori dengan frekuensi tertinggi (semua yang sama tinggi). */
export const indeksMode = (f: readonly number[]): number[] => f.flatMap((v, k) => (v === fTertinggi(f) ? [k] : []));
export const adaSeri = (f: readonly number[]): boolean => indeksMode(f).length > 1;
export const indeksTerendah = (f: readonly number[]): number => f.indexOf(fTerendah(f));
/** Rekap yang salah milik teman. */
export const rekapSalah = (d: DataTurus): number[] => d.f.map((v, k) => (k === d.salah.k ? v + d.salah.selisih : v));

export type PutusData = { opsi: [string, string, string]; benar: number };
const putar3 = (a: [string, string, string], k: number): [string, string, string] => [a[k % 3], a[(k + 1) % 3], a[(k + 2) % 3]];
/** Tiga pilihan keputusan. Letak jawaban benar berputar menurut nomor data. */
export function opsiPutus(i: number): PutusData {
  const d = DATA_TURUS[i];
  const mode = indeksMode(d.f);
  const benar = mode.length > 1 ? `Utamakan ${mode.map((k) => d.kategori[k]).join(" dan ")}` : `Utamakan ${d.kategori[mode[0]]}`;
  const sepi = mode.length > 1 ? `Utamakan ${d.kategori[indeksTerendah(d.f)]} saja` : `Utamakan ${d.kategori[indeksTerendah(d.f)]}`;
  const dasar: [string, string, string] = [benar, sepi, "Tidak perlu melihat tabel, cukup menebak"];
  const susun = putar3(dasar, i);
  return { opsi: susun, benar: susun.indexOf(benar) };
}

/* ------------------------------ Keadaan ------------------------------ */

export type StateDataK5B8A = {
  turus: { data: number; tally: number[]; titik: number };
  tabel: { data: number; f: number[] };
  mode: { data: number };
  pernah: string[];
  pesan: string;
};

export type AksiDataK5B8A =
  | { t: "R_DATA"; i: number }
  | { t: "R_CATAT"; k: number }
  | { t: "T_DATA"; i: number }
  | { t: "T_UBAH"; k: number; delta: number }
  | { t: "T_PERIKSA" }
  | { t: "T_TUNJUK"; k: number }
  | { t: "M_DATA"; i: number }
  | { t: "M_PILIH"; k: number }
  | { t: "M_SERI" }
  | { t: "M_PUTUS"; o: number }
  | { t: "PESAN_KOSONG" }
  | { t: "RESET" };

const nol = (): number[] => [0, 0, 0, 0];

export const awalDataK5B8A = (): StateDataK5B8A => ({
  turus: { data: 0, tally: nol(), titik: 0 },
  tabel: { data: 0, f: nol() },
  mode: { data: 0 },
  pernah: [],
  pesan: "",
});

export const dataTurus = (x: StateDataK5B8A): DataTurus => DATA_TURUS[x.turus.data];
export const dataTabel = (x: StateDataK5B8A): DataTurus => DATA_TURUS[x.tabel.data];
export const dataMode = (x: StateDataK5B8A): DataTurus => DATA_TURUS[x.mode.data];
/** Jawaban mentah berikutnya yang harus dicatat, atau null bila sudah habis. */
export const jawabanBerikut = (x: StateDataK5B8A): number | null => {
  const d = dataTurus(x);
  return x.turus.titik < d.mentah.length ? d.mentah[x.turus.titik] : null;
};

function catatTurus(x: StateDataK5B8A, k: number): StateDataK5B8A {
  if (!sah(k, BANYAK_KATEGORI)) return x;
  const d = dataTurus(x);
  const p = x.turus.titik;
  if (p >= d.mentah.length) return { ...x, pesan: `Semua ${d.mentah.length} jawaban sudah dicatat. Pilih data lain atau lanjut ke Tabel.` };
  const benar = d.mentah[p];
  if (k !== benar) {
    return { ...x, pesan: `Jawaban ke-${p + 1} adalah ${d.kategori[benar]}, bukan ${d.kategori[k]}. Satu jawaban dicatat satu kali di kategori yang tepat, supaya tidak ada yang terlewat atau terhitung dua kali.` };
  }
  const tally = x.turus.tally.map((v, j) => (j === k ? v + 1 : v));
  const titik = p + 1;
  let pernah = x.pernah;
  let pesan = `✅ Jawaban ke-${titik}: ${d.kategori[k]}. Turus ${d.kategori[k]} sekarang ${tally[k]}.`;
  if (tally[k] === KELOMPOK) {
    pernah = catat(pernah, idLima(x.turus.data));
    pesan += " Kelompok lima penuh: empat garis tegak dan satu garis miring.";
  }
  if (titik === d.mentah.length) {
    pernah = catat(pernah, idTurus(x.turus.data));
    pesan += ` Semua ${titik} jawaban sudah dicatat tanpa terlewat. Jumlah turus = ${jumlahF(tally)}.`;
  }
  return { ...x, turus: { ...x.turus, tally, titik }, pernah, pesan };
}

function ubahTabel(x: StateDataK5B8A, k: number, delta: number): StateDataK5B8A {
  if (!sah(k, BANYAK_KATEGORI) || (delta !== 1 && delta !== -1)) return x;
  const f = x.tabel.f.map((v, j) => (j === k ? Math.min(BATAS_F, Math.max(0, v + delta)) : v));
  return { ...x, tabel: { ...x.tabel, f }, pesan: "" };
}

function periksaTabel(x: StateDataK5B8A): StateDataK5B8A {
  const d = dataTabel(x);
  const jumlah = jumlahF(x.tabel.f);
  const n = banyakData(d);
  const salahKe = x.tabel.f.findIndex((v, k) => v !== d.f[k]);
  if (salahKe < 0) {
    return { ...x, pernah: catat(x.pernah, idTabel(x.tabel.data)), pesan: `✅ ${d.f.join(" + ")} = ${n}. Jumlah frekuensi sama dengan banyak data, jadi tidak ada yang terlewat atau terhitung dua kali.` };
  }
  const kepala = jumlah === n ? `Jumlah frekuensi sudah ${n}, tetapi ada kategori yang tertukar.` : `Jumlah frekuensimu ${jumlah}, padahal banyak data ${n}.`;
  return { ...x, pesan: `${kepala} Hitung lagi turus ${d.kategori[salahKe]} lima-lima.` };
}

function tunjukSalah(x: StateDataK5B8A, k: number): StateDataK5B8A {
  if (!sah(k, BANYAK_KATEGORI)) return x;
  const i = x.tabel.data;
  if (!x.pernah.includes(idTabel(i))) return { ...x, pesan: "Isi dan periksa tabelmu dulu, baru cari kesalahan rekap temanmu." };
  const d = DATA_TURUS[i];
  if (k === d.salah.k) {
    const arah = d.salah.selisih > 0 ? "lebih" : "kurang";
    return {
      ...x,
      pernah: catat(x.pernah, idSalah(i)),
      pesan: `✅ ${d.kategori[k]} salah: turusnya ${d.f[k]}, tetapi rekap menulis ${d.f[k] + d.salah.selisih}, ${arah} satu. Itu sebabnya jumlah rekap ${jumlahF(rekapSalah(d))}, bukan ${banyakData(d)}.`,
    };
  }
  return { ...x, pesan: `Frekuensi ${d.kategori[k]} di rekap sama dengan turusnya. Bandingkan tiap kategori dengan turusnya, lalu lihat jumlahnya.` };
}

function pilihMode(x: StateDataK5B8A, k: number): StateDataK5B8A {
  if (!sah(k, BANYAK_KATEGORI)) return x;
  const i = x.mode.data;
  const d = DATA_TURUS[i];
  const m = indeksMode(d.f);
  if (m.length > 1) {
    return { ...x, pesan: m.includes(k) ? `${d.kategori[k]} termasuk yang tertinggi, tetapi ada kategori lain yang frekuensinya sama besar. Periksa lagi.` : `${d.kategori[k]} bukan yang tertinggi. Cari frekuensi yang paling besar.` };
  }
  if (k === m[0]) {
    return {
      ...x,
      pernah: catat(x.pernah, idMode(i)),
      pesan: `✅ ${d.kategori[k]} paling sering muncul, frekuensinya ${d.f[k]}. Itulah mode. Selisih dengan yang terendah: ${fTertinggi(d.f)} − ${fTerendah(d.f)} = ${fTertinggi(d.f) - fTerendah(d.f)}.`,
    };
  }
  return { ...x, pesan: d.f[k] < fTertinggi(d.f) ? `${d.kategori[k]} frekuensinya ${d.f[k]}, masih ada yang lebih besar. Mode adalah frekuensi yang paling besar.` : "Periksa lagi frekuensinya." };
}

function pilihSeri(x: StateDataK5B8A): StateDataK5B8A {
  const i = x.mode.data;
  const d = DATA_TURUS[i];
  const m = indeksMode(d.f);
  if (m.length > 1) {
    return { ...x, pernah: catat(x.pernah, idMode(i)), pesan: `✅ ${m.map((k) => d.kategori[k]).join(" dan ")} sama-sama tertinggi, masing-masing ${fTertinggi(d.f)}. Datanya punya dua mode.` };
  }
  return { ...x, pesan: `Hanya ${d.kategori[m[0]]} yang tertinggi, tidak ada yang sama besar. Tunjuk kategorinya.` };
}

function putus(x: StateDataK5B8A, o: number): StateDataK5B8A {
  if (!sah(o, 3)) return x;
  const i = x.mode.data;
  if (!x.pernah.includes(idMode(i))) return { ...x, pesan: "Tentukan dulu mode-nya, baru ambil keputusan." };
  const p = opsiPutus(i);
  if (o === p.benar) return { ...x, pernah: catat(x.pernah, idPutus(i)), pesan: `✅ Keputusan berdasarkan data: ${p.opsi[o].toLowerCase()}, karena frekuensinya paling besar. Data menjadi alasan, bukan tebakan.` };
  return { ...x, pesan: p.opsi[o].startsWith("Tidak") ? "Tanpa melihat tabel kita hanya menebak. Data ada supaya keputusan punya alasan." : "Lihat frekuensinya. Keputusan yang baik mengikuti frekuensi yang paling besar." };
}

export function langkahDataK5B8A(x: StateDataK5B8A, a: AksiDataK5B8A): StateDataK5B8A {
  switch (a.t) {
    case "R_DATA":
      return sah(a.i, DATA_TURUS.length) ? { ...x, turus: { data: a.i, tally: nol(), titik: 0 }, pesan: "" } : x;
    case "R_CATAT":
      return catatTurus(x, a.k);
    case "T_DATA":
      return sah(a.i, DATA_TURUS.length) ? { ...x, tabel: { data: a.i, f: nol() }, pesan: "" } : x;
    case "T_UBAH":
      return ubahTabel(x, a.k, a.delta);
    case "T_PERIKSA":
      return periksaTabel(x);
    case "T_TUNJUK":
      return tunjukSalah(x, a.k);
    case "M_DATA":
      return sah(a.i, DATA_TURUS.length) ? { ...x, mode: { data: a.i }, pesan: "" } : x;
    case "M_PILIH":
      return pilihMode(x, a.k);
    case "M_SERI":
      return pilihSeri(x);
    case "M_PUTUS":
      return putus(x, a.o);
    case "PESAN_KOSONG":
      return { ...x, pesan: "" };
    case "RESET":
      return awalDataK5B8A();
  }
}

/* ------------------------------ Laporan dan ucapan ------------------------------ */

export type KeadaanDataK5B8A = { alat: "data"; pernah: string[] };
export const keadaanDataK5B8A = (x: StateDataK5B8A): KeadaanDataK5B8A => ({ alat: "data", pernah: x.pernah });

export const ucapTurusK5B8A = (x: StateDataK5B8A): string => {
  const d = dataTurus(x);
  const b = jawabanBerikut(x);
  return b === null
    ? `Data ${d.nama} sudah dicatat semuanya. Ada ${d.mentah.length} jawaban.`
    : `Data ${d.nama}. Jawaban ke-${x.turus.titik + 1} dari ${d.mentah.length} adalah ${d.kategori[b]}. Catat satu garis turus pada kategori yang tepat. Empat garis tegak dan satu garis miring menjadi satu kelompok lima.`;
};
export const ucapTabelK5B8A = (x: StateDataK5B8A): string => {
  const d = dataTabel(x);
  return `Tabel frekuensi ${d.nama}. Hitung turus tiap kategori lima-lima, isi frekuensinya, lalu jumlahkan. Jumlah frekuensi harus sama dengan banyak data, yaitu ${banyakData(d)}.`;
};
export const ucapModeK5B8A = (x: StateDataK5B8A): string => {
  const d = dataMode(x);
  return `Tabel ${d.nama}: ${d.kategori.map((k, j) => `${k} ${d.f[j]}`).join(", ")}. Cari frekuensi yang paling besar. Itu mode, dan mode membantu mengambil keputusan.`;
};
