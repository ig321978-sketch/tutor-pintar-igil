/**
 * Data Mind-map dan Infografis Kelas 4 Bab 2 Sub-Bab B "Bak Warna Pak Joyo" (dirancang sendiri, tanpa komponen kartu bersama).
 * Mind-map "Halaman Bak Pak Joyo": bak biru (tiga per delapan) dan bak merah (enam per delapan) berdampingan, tiga bak kecil (dua, lima, tujuh per delapan) di bawahnya, dan garis pecahan per delapan.
 * Tiap bak digambar sungguh delapan lapis, terisi sebanyak pembilangnya. Lima label kosong menempel pada gambar yang cocok; diketuk, judul langkah muncul dan dibacakan Guru.
 * Infografis dua kartu dari Story: kartu 1 = papan takaran (dua bak yang dibandingkan dan tiga bak yang diurutkan, pecahan dan tanda kosong sampai diketuk),
 * kartu 2 = kartu aturan Pak Joyo (penyebut sama, pembilang, tanda banding, garis pecahan; empat kartu kecil).
 * Suara tanpa digit: bilangan dan pecahan dieja lewat eja-k4b2.ts. Diuji: scripts/uji-visual-k4b2ab.mjs.
 */
import { ejaK4B2 } from "../eja-k4b2";

export type LangkahPeta = { judul: string; arti: string };

/** Lima langkah Mind-map: penyebut sama, Compare Numerators, tanda banding, mengurutkan, Order on Line. Arti dibacakan Guru. */
export const LANGKAH_WARNA: LangkahPeta[] = [
  { judul: "Lihat penyebut", arti: "Langkah satu. Lihat penyebutnya dulu. Kalau penyebutnya sama, semua bagian sama besar." },
  { judul: "Banding pembilang", arti: "Langkah dua. Banding pembilangnya saja. Pembilang lebih besar berarti pecahan lebih besar." },
  { judul: "Pilih tanda", arti: "Langkah tiga. Tulis tanda lebih dari atau kurang dari. Sisi tanda yang terbuka selalu menghadap pecahan yang lebih besar, ujung runcingnya ke yang lebih kecil." },
  { judul: "Urutkan pembilang", arti: "Langkah empat. Untuk banyak pecahan, urutkan pembilangnya dari yang terkecil sampai yang terbesar." },
  { judul: "Taruh di garis", arti: "Langkah lima. Taruh pecahan pada garis dari nol sampai satu. Makin ke kanan, makin besar pecahannya." },
];

/** Banyak lapis tiap bak (penyebut delapan, seperti di Story). */
export const LAPIS_BAK = 8;
export type BakInfo = { kunci: string; nama: string; isi: number; warna: string };
/** Dua bak yang dibandingkan (Story: bak biru tiga per delapan, bak merah enam per delapan). */
export const BAK_PASANG: readonly BakInfo[] = [
  { kunci: "biru", nama: "Bak biru", isi: 3, warna: "#3B82F6" },
  { kunci: "merah", nama: "Bak merah", isi: 6, warna: "#EF4444" },
];
/** Tiga bak yang diurutkan (Story: dua, lima, tujuh per delapan). */
export const BAK_URUT: readonly BakInfo[] = [
  { kunci: "dua", nama: "Bak pertama", isi: 2, warna: "#14B8A6" },
  { kunci: "lima", nama: "Bak kedua", isi: 5, warna: "#14B8A6" },
  { kunci: "tujuh", nama: "Bak ketiga", isi: 7, warna: "#14B8A6" },
];

export const JUDUL_PETA_WARNA = "Halaman Bak Pak Joyo";
export const IKON_JUDUL_PETA_WARNA = "\u{1F3A8}";
export const PETUNJUK_PETA_WARNA = "Ketuk tanda tanya di bak dan garis untuk melihat langkahnya.";
export const SELESAI_PETA_WARNA = "Semua bak sudah terbaca! Lima langkah sudah kamu buka.";

/* ------------------------------ Infografis kartu 1: papan takaran ------------------------------ */
export const suaraBak = (b: BakInfo): string => ejaK4B2(`${b.nama} dibagi ${LAPIS_BAK} bagian sama besar, ${b.isi} bagian terisi: ${b.isi}/${LAPIS_BAK}.`);
export const TEKS_TANDA_PASANG = `${BAK_PASANG[0].isi}/${LAPIS_BAK} < ${BAK_PASANG[1].isi}/${LAPIS_BAK}`;
export const SUARA_TANDA_PASANG = ejaK4B2(`${TEKS_TANDA_PASANG}. Penyebutnya sama, jadi cukup banding pembilang: ${BAK_PASANG[0].isi} lebih kecil dari ${BAK_PASANG[1].isi}. Keduanya tidak sama besar.`);
export const TEKS_URUT = `${BAK_URUT[0].isi}/${LAPIS_BAK} < ${BAK_URUT[1].isi}/${LAPIS_BAK} < ${BAK_URUT[2].isi}/${LAPIS_BAK}`;
export const SUARA_URUT = ejaK4B2(`${TEKS_URUT}. Urutan dari yang paling sedikit isinya, sama dengan urutan pembilang: ${BAK_URUT[0].isi}, ${BAK_URUT[1].isi}, ${BAK_URUT[2].isi}.`);
export const JUDUL_INFO_TAKARAN = "Papan Takaran Pak Joyo";
export const PETUNJUK1_INFO_WARNA = "Ketuk tanda tanya untuk melihat pecahan dan tanda tiap bak.";
export const SELESAI1_INFO_WARNA = "Papan lengkap! Penyebut sama, jadi pembilang yang menentukan.";

/* ------------------------------ Infografis kartu 2: kartu aturan ------------------------------ */
export type AturanWarna = { kunci: string; sebut: string; isi: string; suara: string };
export const ATURAN_WARNA: readonly AturanWarna[] = [
  { kunci: "sama", sebut: "penyebut sama", isi: "Bagian sama besar", suara: "Kalau penyebutnya sama, semua bagian sama besar." },
  { kunci: "bilang", sebut: "banding pembilang", isi: "Pembilang besar, pecahan besar", suara: "Banding pembilangnya. Pembilang yang lebih besar berarti pecahan yang lebih besar." },
  { kunci: "tanda", sebut: "tanda banding", isi: "Sisi terbuka ke yang besar", suara: "Sisi tanda banding yang terbuka selalu menghadap pecahan yang lebih besar, ujung runcingnya ke yang lebih kecil." },
  { kunci: "garis", sebut: "garis pecahan", isi: "Kanan lebih besar", suara: "Pada garis pecahan, makin ke kanan makin besar pecahannya." },
];
export const JUDUL_INFO_ATURAN_WARNA = "Kartu Aturan Pak Joyo";
export const PETUNJUK2_INFO_WARNA = "Ketuk tanda tanya untuk melihat aturan Pak Joyo.";
export const SELESAI2_INFO_WARNA = "Kartu lengkap! Lihat penyebut, banding pembilang, lalu pilih tanda.";
