/**
 * Lab Pola Gambar (Kelas 4 Bab 3, Sub-Bab A): logika murni. Satu alat, tiga tampilan.
 *  Lanjut : tiga kumpulan titik dari buku (jeruk 2, 4, 6; permen 9, 7, 5; ...). Anak menyusun kumpulan berikutnya
 *           dengan tombol −/+ lalu memeriksa. Kunci = kumpulan terakhir + selisih, dihitung dari data.
 *  Tabel  : tabel selisih. Baris baru masuk hanya bila banyaknya sama dengan baris terakhir + selisih.
 *           Pola mengecil berhenti di nol: banyak benda tidak bisa kurang dari nol.
 *  Buat   : anak memilih kumpulan pertama (0 sampai 10) dan selisih (−3 sampai +3), lab menggambar empat kumpulan
 *           dan menentukan jenisnya (membesar, mengecil, atau tetap) dengan membandingkan kumpulan berurutan.
 * Semua bilangan bulat. Murni: tanpa React, tanpa jaringan, tanpa impor. Diuji di scripts/uji-lab-k4b3.mjs.
 */

export type PolaGambar = { id: string; nama: string; benda: string; awal: number[] };

/** Pola dari buku. Selisih dihitung dari dua kumpulan pertama dan harus tetap (diuji). */
export const POLA_A: PolaGambar[] = [
  { id: "jeruk", nama: "Jeruk", benda: "jeruk", awal: [2, 4, 6] },
  { id: "permen", nama: "Permen", benda: "permen", awal: [9, 7, 5] },
  { id: "kotak", nama: "Kotak", benda: "kotak", awal: [3, 6, 9] },
  { id: "bintang", nama: "Bintang", benda: "bintang", awal: [12, 9, 6] },
  { id: "manik", nama: "Manik", benda: "manik", awal: [1, 3, 5] },
];
/** Pola yang dipakai di Tabel (indeks ke POLA_A). */
export const TABEL_A = [0, 1, 3];

export const MAKS_ISI = 20;
export const MAKS_BARIS = 10;
export const MIN_AWAL = 0;
export const MAKS_AWAL = 10;
export const MAKS_BEDA = 3;
export const BANYAK_BUAT = 4;

export const selisihA = (s: number[]): number => s[1] - s[0];
export const teksBeda = (d: number): string => (d > 0 ? `+${d}` : d < 0 ? `−${-d}` : "0");
export const jenisDari = (s: number[]): "membesar" | "mengecil" | "tetap" => (s[1] > s[0] ? "membesar" : s[1] < s[0] ? "mengecil" : "tetap");
export const berikutA = (s: number[]): number => s[s.length - 1] + selisihA(s);
export const kumpulanBuat = (awal: number, beda: number): number[] => Array.from({ length: BANYAK_BUAT }, (_, i) => awal + i * beda);

/* ------------------------------ Keadaan ------------------------------ */

export type StatePolaGambarK4B3A = {
  lp: number;
  isi: number;
  tp: number;
  baris: number[];
  nilai: number;
  awal: number;
  beda: number;
  pernah: string[];
  pesan: string;
};

export type AksiPolaGambarK4B3A =
  | { t: "L_POLA"; i: number }
  | { t: "L_ISI"; d: 1 | -1 }
  | { t: "L_CEK" }
  | { t: "T_POLA"; i: number }
  | { t: "T_NILAI"; d: 1 | -1 }
  | { t: "T_TAMBAH" }
  | { t: "B_AWAL"; d: 1 | -1 }
  | { t: "B_BEDA"; d: 1 | -1 }
  | { t: "B_CEK" }
  | { t: "PESAN_KOSONG" }
  | { t: "RESET" };

const polaTabel = (tp: number): PolaGambar => POLA_A[TABEL_A[tp]];

export const awalPolaGambarK4B3A = (): StatePolaGambarK4B3A => ({
  lp: 2,
  isi: 0,
  tp: 0,
  baris: [...polaTabel(0).awal],
  nilai: polaTabel(0).awal[2],
  awal: 2,
  beda: 1,
  pernah: [],
  pesan: "",
});

const tambah = (daftar: string[], id: string): string[] => (daftar.includes(id) ? daftar : [...daftar, id]);

function cekLanjut(x: StatePolaGambarK4B3A): StatePolaGambarK4B3A {
  const p = POLA_A[x.lp];
  const s = p.awal;
  const d = selisihA(s);
  const akhir = s[s.length - 1];
  const kunci = akhir + d;
  if (x.isi === kunci) {
    return {
      ...x,
      pernah: tambah(x.pernah, `lanjut:${p.id}`),
      pesan: `✅ ${akhir} ${d > 0 ? "+" : "−"} ${Math.abs(d)} = ${kunci}. Selisih tetap ${teksBeda(d)}, jadi pola ${p.benda} ${jenisDari(s)}.`,
    };
  }
  if (x.isi === akhir - d) return { ...x, pesan: `Arahnya terbalik. Dari ${s[0]} ke ${s[1]} banyaknya ${d > 0 ? "bertambah" : "berkurang"}, jadi kumpulan berikutnya juga ${d > 0 ? "bertambah" : "berkurang"}.` };
  return { ...x, pesan: `Belum pas. Hitung selisih dua kumpulan berurutan: ${s[1]} dan ${s[0]} berselisih ${Math.abs(d)}. Selisihnya selalu sama.` };
}

function tambahBaris(x: StatePolaGambarK4B3A): StatePolaGambarK4B3A {
  const p = polaTabel(x.tp);
  const d = selisihA(p.awal);
  const akhir = x.baris[x.baris.length - 1];
  const kunci = akhir + d;
  if (kunci < 0) return { ...x, pernah: tambah(x.pernah, `habis:${p.id}`), pesan: `Kumpulan berikutnya akan kurang dari nol. ${p.nama} sudah habis, jadi pola berhenti di kumpulan ke-${x.baris.length}.` };
  if (x.baris.length >= MAKS_BARIS) return { ...x, pesan: `Tabel penuh: paling banyak ${MAKS_BARIS} kumpulan.` };
  if (x.nilai !== kunci) {
    return { ...x, pesan: `Belum pas. Selisih tiap baris ${teksBeda(d)}. Kumpulan ke-${x.baris.length + 1} = ${akhir} ${d > 0 ? "+" : "−"} ${Math.abs(d)}.` };
  }
  const baris = [...x.baris, kunci];
  return {
    ...x,
    baris,
    pernah: tambah(x.pernah, `tabel:${p.id}:${baris.length}`),
    pesan: `✅ Kumpulan ke-${baris.length} berisi ${kunci} ${p.benda}. Selisihnya tetap ${teksBeda(d)}.`,
  };
}

function cekBuat(x: StatePolaGambarK4B3A): StatePolaGambarK4B3A {
  const s = kumpulanBuat(x.awal, x.beda);
  const kurang = s.findIndex((v) => v < 0);
  if (kurang >= 0) return { ...x, pesan: `Kumpulan ke-${kurang + 1} akan kurang dari nol. Banyak benda tidak bisa kurang dari nol. Besarkan kumpulan pertama.` };
  const j = jenisDari(s);
  if (j === "tetap") return { ...x, pernah: tambah(x.pernah, "buat:tetap"), pesan: `✅ ${s.join(", ")}. Selisih 0: banyaknya tetap, jadi pola ini tidak membesar dan tidak mengecil.` };
  return {
    ...x,
    pernah: tambah(x.pernah, `buat:${j}:${x.beda}`),
    pesan: `✅ ${s.join(", ")}. Selisih tetap ${teksBeda(x.beda)}, jadi pola ${j}: benda ${j === "membesar" ? "bertambah" : "berkurang"}.`,
  };
}

export function langkahPolaGambarK4B3A(x: StatePolaGambarK4B3A, a: AksiPolaGambarK4B3A): StatePolaGambarK4B3A {
  switch (a.t) {
    case "L_POLA":
      if (!Number.isInteger(a.i) || a.i < 0 || a.i >= POLA_A.length) return x;
      return { ...x, lp: a.i, isi: 0, pesan: "" };
    case "L_ISI": {
      const v = x.isi + a.d;
      if (v < 0 || v > MAKS_ISI) return { ...x, pesan: `Kumpulan berisi 0 sampai ${MAKS_ISI} titik.` };
      return { ...x, isi: v, pesan: "" };
    }
    case "L_CEK":
      return cekLanjut(x);
    case "T_POLA": {
      if (!Number.isInteger(a.i) || a.i < 0 || a.i >= TABEL_A.length) return x;
      const s = polaTabel(a.i).awal;
      return { ...x, tp: a.i, baris: [...s], nilai: s[s.length - 1], pesan: "" };
    }
    case "T_NILAI": {
      const v = x.nilai + a.d;
      if (v < 0 || v > MAKS_ISI + 10) return { ...x, pesan: `Banyak benda 0 sampai ${MAKS_ISI + 10}.` };
      return { ...x, nilai: v, pesan: "" };
    }
    case "T_TAMBAH":
      return tambahBaris(x);
    case "B_AWAL": {
      const v = x.awal + a.d;
      if (v < MIN_AWAL || v > MAKS_AWAL) return { ...x, pesan: `Kumpulan pertama ${MIN_AWAL} sampai ${MAKS_AWAL}.` };
      return { ...x, awal: v, pesan: "" };
    }
    case "B_BEDA": {
      const v = x.beda + a.d;
      if (v < -MAKS_BEDA || v > MAKS_BEDA) return { ...x, pesan: `Selisih −${MAKS_BEDA} sampai +${MAKS_BEDA}.` };
      return { ...x, beda: v, pesan: "" };
    }
    case "B_CEK":
      return cekBuat(x);
    case "PESAN_KOSONG":
      return { ...x, pesan: "" };
    case "RESET":
      return awalPolaGambarK4B3A();
  }
}

/* ------------------------------ Laporan dan ucapan ------------------------------ */

export type KeadaanPolaGambarK4B3A = { alat: "pola-gambar"; pernah: string[] };
export const keadaanPolaGambarK4B3A = (x: StatePolaGambarK4B3A): KeadaanPolaGambarK4B3A => ({ alat: "pola-gambar", pernah: x.pernah });

export const ucapLanjutK4B3A = (x: StatePolaGambarK4B3A): string => {
  const p = POLA_A[x.lp];
  return `Pola ${p.benda}: ${p.awal.join(", ")}. Kumpulan berikutnya kamu isi ${x.isi} titik. Lihat selisih dua kumpulan berurutan.`;
};
export const ucapTabelK4B3A = (x: StatePolaGambarK4B3A): string => {
  const p = polaTabel(x.tp);
  return `Tabel ${p.benda}: ${x.baris.join(", ")}. Selisih tiap baris ${teksBeda(selisihA(p.awal))}. Isi kumpulan ke-${x.baris.length + 1}.`;
};
export const ucapBuatK4B3A = (x: StatePolaGambarK4B3A): string => {
  const s = kumpulanBuat(x.awal, x.beda);
  const isi = s.some((v) => v < 0) ? "ada kumpulan yang kurang dari nol" : s.join(", ");
  return `Kumpulan pertama ${x.awal}, selisih ${teksBeda(x.beda)}. Empat kumpulan: ${isi}.`;
};
