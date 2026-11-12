/**
 * Lab Pola Bilangan (Kelas 4 Bab 3, Sub-Bab B): logika murni. Satu alat, tiga tampilan.
 *  Selisih : anak mengetuk tiap pasangan suku berurutan untuk melihat selisihnya, lalu menetapkan beda (−15 sampai +15).
 *            Beda dengan tanda terbalik ditolak dan dijelaskan.
 *  Aturan  : mesin fungsi. Masukan (suku terakhir) diproses aturan "tambah d" atau "kurang d" menjadi keluaran.
 *            Keluaran harus cocok dengan catatan buku, jadi rantai hanya tumbuh bila aturannya benar.
 *            Mengubah aturan memulai rantai lagi dari suku pertama.
 *  Tabel   : tabel nilai suku ke-n. Baris baru masuk hanya bila nilainya sama dengan suku terakhir + beda.
 * Semua bilangan bulat dan tidak kurang dari nol. Murni: tanpa React, tanpa jaringan, tanpa impor.
 * Diuji di scripts/uji-lab-k4b3.mjs.
 */

export type DeretB = { id: string; nama: string; suku: number[] };

/** Pola bilangan dari buku. Beda tetap (diuji). */
export const DERET_B: DeretB[] = [
  { id: "ganjil", nama: "3, 5, 7, 9, 11", suku: [3, 5, 7, 9, 11] },
  { id: "tiga", nama: "1, 4, 7, 10", suku: [1, 4, 7, 10] },
  { id: "lima", nama: "23, 18, 13, 8", suku: [23, 18, 13, 8] },
  { id: "empat", nama: "32, 28, 24, 20, 16", suku: [32, 28, 24, 20, 16] },
  { id: "dua-belas", nama: "7, 19, 31, 43", suku: [7, 19, 31, 43] },
];

export type CeritaB = { id: string; nama: string; satuan: string; catatan: number[] };

/** Mesin aturan: catatan buku (tiga suku pertama). */
export const ATURAN_B: CeritaB[] = [
  { id: "langkah", nama: "Lompat katak", satuan: "lompatan", catatan: [1, 4, 7] },
  { id: "telur", nama: "Telur peternak", satuan: "hari", catatan: [20, 28, 36] },
  { id: "tv", nama: "Produksi TV", satuan: "bulan", catatan: [70, 64, 58] },
];

/** Tabel nilai: tiga suku pertama dari cerita buku. */
export const TABEL_B: CeritaB[] = [
  { id: "kursi", nama: "Kursi gedung", satuan: "baris", catatan: [20, 23, 26] },
  { id: "rak", nama: "Rak buku", satuan: "rak", catatan: [5, 9, 13] },
  { id: "empat", nama: "Bilangan mengecil", satuan: "suku", catatan: [32, 28, 24] },
];

export const MAKS_BEDA = 15;
export const MAKS_RANTAI = 10;
export const MAKS_BARIS = 8;
export const MAKS_NILAI = 120;

export const bedaB = (s: number[]): number => s[1] - s[0];
export const teksBedaB = (d: number): string => (d > 0 ? `+${d}` : d < 0 ? `−${-d}` : "0");
export const teksAturan = (d: number): string => (d > 0 ? `tambah ${d}` : d < 0 ? `kurang ${-d}` : "tetap");
const operasi = (a: number, d: number): string => `${a} ${d >= 0 ? "+" : "−"} ${Math.abs(d)}`;

/* ------------------------------ Keadaan ------------------------------ */

export type StatePolaBilanganK4B3B = {
  sd: number;
  ketuk: boolean[];
  tebak: number;
  ap: number;
  aturan: number;
  rantai: number[];
  tb: number;
  baris: number[];
  nilai: number;
  pernah: string[];
  pesan: string;
};

export type AksiPolaBilanganK4B3B =
  | { t: "S_DERET"; i: number }
  | { t: "S_KETUK"; j: number }
  | { t: "S_BEDA"; d: 1 | -1 }
  | { t: "S_CEK" }
  | { t: "A_POLA"; i: number }
  | { t: "A_ATURAN"; d: 1 | -1 }
  | { t: "A_JALAN" }
  | { t: "N_POLA"; i: number }
  | { t: "N_NILAI"; d: 1 | -1 | 10 | -10 }
  | { t: "N_ISI" }
  | { t: "PESAN_KOSONG" }
  | { t: "RESET" };

const ketukKosong = (i: number): boolean[] => Array.from({ length: DERET_B[i].suku.length - 1 }, () => false);

export const awalPolaBilanganK4B3B = (): StatePolaBilanganK4B3B => ({
  sd: 0,
  ketuk: ketukKosong(0),
  tebak: 0,
  ap: 0,
  aturan: 0,
  rantai: [ATURAN_B[0].catatan[0]],
  tb: 0,
  baris: [...TABEL_B[0].catatan],
  nilai: TABEL_B[0].catatan[2],
  pernah: [],
  pesan: "",
});

const tambah = (daftar: string[], id: string): string[] => (daftar.includes(id) ? daftar : [...daftar, id]);

function cekSelisih(x: StatePolaBilanganK4B3B): StatePolaBilanganK4B3B {
  const d = DERET_B[x.sd];
  if (x.ketuk.some((k) => !k)) return { ...x, pesan: "Ketuk dulu semua pasangan suku berurutan untuk melihat selisihnya." };
  const b = bedaB(d.suku);
  if (x.tebak === b) {
    const jenis = b > 0 ? "membesar" : "mengecil";
    return { ...x, pernah: tambah(x.pernah, `beda:${d.id}`), pesan: `✅ Beda ${teksBedaB(b)} pada semua pasangan. Beda ${b > 0 ? "lebih dari nol" : "berupa pengurangan"}, jadi pola ${jenis}.` };
  }
  if (b !== 0 && x.tebak === -b) {
    return {
      ...x,
      pernah: tambah(x.pernah, "tanda-salah"),
      pesan: `Tandanya terbalik. Dari ${d.suku[0]} ke ${d.suku[1]} bilangannya ${b > 0 ? "bertambah" : "berkurang"}, jadi bedanya ${teksBedaB(b)}, bukan ${teksBedaB(-b)}.`,
    };
  }
  return { ...x, pesan: `Belum pas. Lihat selisih yang muncul: ${operasi(d.suku[0], b)} = ${d.suku[1]}. Semua pasangan punya selisih yang sama.` };
}

function jalankan(x: StatePolaBilanganK4B3B): StatePolaBilanganK4B3B {
  const c = ATURAN_B[x.ap];
  const masukan = x.rantai[x.rantai.length - 1];
  const keluaran = masukan + x.aturan;
  if (x.aturan === 0) return { ...x, pesan: "Aturan tetap tidak mengubah masukan. Pilih aturan tambah atau kurang dulu." };
  if (x.rantai.length >= MAKS_RANTAI) return { ...x, pesan: `Rantai penuh: paling banyak ${MAKS_RANTAI} ${c.satuan}.` };
  if (keluaran < 0) return { ...x, pesan: `Keluaran akan kurang dari nol. Pola ini berhenti di ${masukan}.` };
  const ke = x.rantai.length;
  if (ke < c.catatan.length && keluaran !== c.catatan[ke]) {
    return {
      ...x,
      pesan: `Keluaran ${keluaran} tidak cocok dengan catatan ${c.catatan[ke]}. Periksa aturannya: selisih ${c.catatan[1]} dan ${c.catatan[0]} adalah ${Math.abs(bedaB(c.catatan))}.`,
    };
  }
  const rantai = [...x.rantai, keluaran];
  return {
    ...x,
    rantai,
    pernah: tambah(x.pernah, `aturan:${c.id}:${rantai.length}`),
    pesan: `✅ Masukan ${masukan}, aturan ${teksAturan(x.aturan)}, keluaran ${keluaran}. Itu nilai ${c.satuan} ke-${rantai.length}.`,
  };
}

function isiTabel(x: StatePolaBilanganK4B3B): StatePolaBilanganK4B3B {
  const c = TABEL_B[x.tb];
  const d = bedaB(c.catatan);
  const akhir = x.baris[x.baris.length - 1];
  const kunci = akhir + d;
  if (kunci < 0) return { ...x, pesan: `Suku berikutnya akan kurang dari nol. Pola berhenti di ${akhir}.` };
  if (x.baris.length >= MAKS_BARIS) return { ...x, pesan: `Tabel penuh: paling banyak ${MAKS_BARIS} baris.` };
  if (x.nilai !== kunci) return { ...x, pesan: `Belum pas. Beda tiap baris ${teksBedaB(d)}, jadi suku ke-${x.baris.length + 1} = ${operasi(akhir, d)}.` };
  const baris = [...x.baris, kunci];
  const n = baris.length;
  return {
    ...x,
    baris,
    pernah: tambah(x.pernah, `nilai:${c.id}:${n}`),
    pesan: `✅ Suku ke-${n} = ${kunci}: dari suku pertama ${c.catatan[0]}, ${teksAturan(d)} sebanyak ${n - 1} kali.`,
  };
}

export function langkahPolaBilanganK4B3B(x: StatePolaBilanganK4B3B, a: AksiPolaBilanganK4B3B): StatePolaBilanganK4B3B {
  switch (a.t) {
    case "S_DERET":
      if (!Number.isInteger(a.i) || a.i < 0 || a.i >= DERET_B.length) return x;
      return { ...x, sd: a.i, ketuk: ketukKosong(a.i), tebak: 0, pesan: "" };
    case "S_KETUK": {
      if (!Number.isInteger(a.j) || a.j < 0 || a.j >= x.ketuk.length) return x;
      const s = DERET_B[x.sd].suku;
      const ketuk = x.ketuk.map((k, i) => k || i === a.j);
      const d = s[a.j + 1] - s[a.j];
      return { ...x, ketuk, pesan: `✅ Dari ${s[a.j]} ke ${s[a.j + 1]}: ${teksAturan(d)}, selisihnya ${teksBedaB(d)}.` };
    }
    case "S_BEDA": {
      const v = x.tebak + a.d;
      if (v < -MAKS_BEDA || v > MAKS_BEDA) return { ...x, pesan: `Beda −${MAKS_BEDA} sampai +${MAKS_BEDA}.` };
      return { ...x, tebak: v, pesan: "" };
    }
    case "S_CEK":
      return cekSelisih(x);
    case "A_POLA":
      if (!Number.isInteger(a.i) || a.i < 0 || a.i >= ATURAN_B.length) return x;
      return { ...x, ap: a.i, aturan: 0, rantai: [ATURAN_B[a.i].catatan[0]], pesan: "" };
    case "A_ATURAN": {
      const v = x.aturan + a.d;
      if (v < -MAKS_BEDA || v > MAKS_BEDA) return { ...x, pesan: `Aturan kurang ${MAKS_BEDA} sampai tambah ${MAKS_BEDA}.` };
      const mulai = x.rantai.length > 1;
      return { ...x, aturan: v, rantai: [ATURAN_B[x.ap].catatan[0]], pesan: mulai ? "✅ Aturan berubah, rantai mulai lagi dari suku pertama." : "" };
    }
    case "A_JALAN":
      return jalankan(x);
    case "N_POLA":
      if (!Number.isInteger(a.i) || a.i < 0 || a.i >= TABEL_B.length) return x;
      return { ...x, tb: a.i, baris: [...TABEL_B[a.i].catatan], nilai: TABEL_B[a.i].catatan[2], pesan: "" };
    case "N_NILAI": {
      const v = x.nilai + a.d;
      if (v < 0 || v > MAKS_NILAI) return { ...x, pesan: `Nilai 0 sampai ${MAKS_NILAI}.` };
      return { ...x, nilai: v, pesan: "" };
    }
    case "N_ISI":
      return isiTabel(x);
    case "PESAN_KOSONG":
      return { ...x, pesan: "" };
    case "RESET":
      return awalPolaBilanganK4B3B();
  }
}

/* ------------------------------ Laporan dan ucapan ------------------------------ */

export type KeadaanPolaBilanganK4B3B = { alat: "pola-bilangan"; pernah: string[] };
export const keadaanPolaBilanganK4B3B = (x: StatePolaBilanganK4B3B): KeadaanPolaBilanganK4B3B => ({ alat: "pola-bilangan", pernah: x.pernah });

export const ucapSelisihK4B3B = (x: StatePolaBilanganK4B3B): string =>
  `Pola bilangan ${DERET_B[x.sd].nama}. Ketuk tiap pasangan untuk melihat selisihnya. Beda yang kamu pilih ${teksBedaB(x.tebak)}.`;
export const ucapAturanK4B3B = (x: StatePolaBilanganK4B3B): string => {
  const c = ATURAN_B[x.ap];
  return `${c.nama}. Catatan: ${c.catatan.join(", ")}. Aturan ${teksAturan(x.aturan)}. Rantai: ${x.rantai.join(", ")}.`;
};
export const ucapTabelK4B3B = (x: StatePolaBilanganK4B3B): string => {
  const c = TABEL_B[x.tb];
  return `${c.nama}. Tabel nilai: ${x.baris.join(", ")}. Isi suku ke-${x.baris.length + 1}. Nilai yang kamu pilih ${x.nilai}.`;
};
