/**
 * Data Mind-map Kelas 4 Bab 2 Sub-Bab C "Meja Jahit Kak Sekar": meja jahit dengan lima kelompok potongan kain yang digambar sungguhan
 * (tiga potongan sama besar ditumpuk, potongan yang tidak sama karena ditambah, rantai kali dua, enam per delapan dibagi dua, pecahan paling sederhana).
 * Tiap kelompok punya label kosong yang diketuk; judul langkah muncul dan dibacakan guru. Isi = LANGKAH rangkuman semua metode Story C
 * (Cocokkan Daerah, jangan menambah, Kali Bentuk Satu, Bagi Keduanya, berhenti di pecahan sederhana). Angka gambar dari Story: satu per dua, dua per empat,
 * empat per delapan, tiga per empat dari tambah dua, enam per delapan dibagi dua. Diuji: scripts/uji-jahit-k4b2c.mjs.
 */
export type Pecah = { p: number; q: number };
export type LangkahPeta = { id: "tumpuk" | "tambah" | "kali" | "bagi" | "henti"; judul: string; arti: string };

/** Potongan kain yang ditumpuk (Story: satu per dua, dua per empat, empat per delapan); semuanya sama besar. */
export const TUMPUKAN: Pecah[] = [
  { p: 1, q: 2 },
  { p: 2, q: 4 },
  { p: 4, q: 8 },
];
/** Salah Satria: satu per dua ditambah dua pada pembilang dan penyebut. */
export const SALAH_TAMBAH = { awal: { p: 1, q: 2 }, tambah: 2 } as const;
export const hasilTambah = (): Pecah => ({ p: SALAH_TAMBAH.awal.p + SALAH_TAMBAH.tambah, q: SALAH_TAMBAH.awal.q + SALAH_TAMBAH.tambah });
/** Rantai kali: satu per dua dikali dua (dua per empat) lalu dikali dua lagi (empat per delapan). */
export const RANTAI_KALI = { dari: { p: 1, q: 2 }, pengali: 2, langkah: 2 } as const;
export const rantaiKali = (): Pecah[] => Array.from({ length: RANTAI_KALI.langkah + 1 }, (_, i) => ({ p: RANTAI_KALI.dari.p * RANTAI_KALI.pengali ** i, q: RANTAI_KALI.dari.q * RANTAI_KALI.pengali ** i }));
/** Enam per delapan dibagi dua menjadi tiga per empat. */
export const BAGI_DUA = { dari: { p: 6, q: 8 }, pembagi: 2 } as const;
export const hasilBagi = (): Pecah => ({ p: BAGI_DUA.dari.p / BAGI_DUA.pembagi, q: BAGI_DUA.dari.q / BAGI_DUA.pembagi });
export const fpbPeta = (a: number, b: number): number => (b === 0 ? a : fpbPeta(b, a % b));

export const LANGKAH_JAHIT: LangkahPeta[] = [
  { id: "tumpuk", judul: "Tumpuk: Cocokkan Daerah", arti: "Langkah satu. Cocokkan Daerah: tumpuk dua potongan kain. Kalau ujung arsirannya sama, pecahannya sama besar." },
  { id: "tambah", judul: "Jangan menambah", arti: "Langkah dua. Menambah bilangan yang sama pada pembilang dan penyebut membuat besar pecahan berubah, jadi cara itu keliru." },
  { id: "kali", judul: "Kali Bentuk Satu", arti: "Langkah tiga. Kali Bentuk Satu: kalikan pembilang dan penyebut dengan bilangan yang sama, dan besar pecahan tetap." },
  { id: "bagi", judul: "Bagi Keduanya", arti: "Langkah empat. Bagi Keduanya: bagi pembilang dan penyebut dengan bilangan yang sama, angkanya makin kecil dan besar pecahan tetap." },
  { id: "henti", judul: "Berhenti di sederhana", arti: "Langkah lima. Berhenti kalau tidak ada bilangan lain yang membagi habis keduanya. Itulah pecahan paling sederhana." },
];

export const JUDUL_PETA = "Meja Jahit Kak Sekar";
export const IKON_JUDUL_PETA = "\u{1F9F5}";
export const PETUNJUK_PETA = "Ketuk tanda tanya di tiap potongan untuk melihat langkahnya.";
export const SELESAI_PETA = "Meja jahit rapi! Lima langkah sudah kamu buka.";
