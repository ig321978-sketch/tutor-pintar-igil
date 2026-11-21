/**
 * Data Mind-map Kelas 4 Bab 3 Sub-Bab B "Barisan Kursi Pak Gunawan": denah kursi penonton dilihat dari panggung, lima baris yang digambar sungguhan
 * (dua belas, lima belas, delapan belas, dua puluh satu, dua puluh empat kursi; beda tambah tiga) dan papan nomor tampil (empat puluh, tiga puluh lima, tiga puluh; beda kurang lima).
 * Enam label kosong menempel pada baris yang cocok (baris satu sampai lima dan papan nomor); ketuk satu per satu, judul langkah muncul dan dibacakan guru.
 * Isi = LANGKAH rangkuman Story B dan materi (selisih dua bilangan berurutan, beda sama pada semua pasangan, pola membesar, bilangan berikutnya, bilangan pada urutan ke-n lewat lompatan, pola mengecil).
 * Diuji: scripts/uji-kursi-k4b3b.mjs.
 */
import { ejaK4B3 } from "../eja-k4b3";
import { aturanTeks, polaSuku } from "./logika-cpa";

/** Angka Story B. Kursi: baris pertama dua belas, beda tambah tiga. Nomor tampil: empat puluh, beda kurang lima. */
export const AWAL_KURSI = 12;
export const BEDA_KURSI = 3;
export const BANYAK_BARIS = 5;
export const AWAL_NOMOR = 40;
export const BEDA_NOMOR = 5;
export const BANYAK_NOMOR = 3;

/** Lima baris kursi (12, 15, 18, 21, 24) dan tiga nomor tampil di papan (40, 35, 30), dihitung dari awal dan beda. */
export const KURSI_BARIS: number[] = polaSuku(AWAL_KURSI, BEDA_KURSI, "naik", BANYAK_BARIS);
export const NOMOR_PAPAN: number[] = polaSuku(AWAL_NOMOR, BEDA_NOMOR, "turun", BANYAK_NOMOR);
export const TAMBAH_TEKS = aturanTeks(BEDA_KURSI, "naik");
export const KURANG_TEKS = aturanTeks(BEDA_NOMOR, "turun");

const hurufBesar = (t: string): string => t.charAt(0).toUpperCase() + t.slice(1);
const u = (t: string): string => hurufBesar(ejaK4B3(t));

/** `baris` = nomor baris kursi (0 sampai 4) tempat label menempel, atau "papan" untuk papan nomor tampil. */
export type LangkahPeta = { judul: string; arti: string; baris: number | "papan" };

export const LANGKAH_KURSI: LangkahPeta[] = [
  { judul: "Cari beda", arti: u(`Langkah satu. Cari beda, yaitu selisih dua bilangan yang berurutan. Dari ${KURSI_BARIS[0]} ke ${KURSI_BARIS[1]} bertambah ${BEDA_KURSI}, jadi bedanya ${BEDA_KURSI}.`), baris: 0 },
  { judul: "Periksa tiap pasangan", arti: u(`Langkah dua. Periksa tiap pasangan yang berurutan, beda harus sama. Dari ${KURSI_BARIS[1]} ke ${KURSI_BARIS[2]} juga ${TAMBAH_TEKS}. Jangan menghitung dari dua bilangan yang berjauhan.`), baris: 1 },
  { judul: "Beda tambah: membesar", arti: u("Langkah tiga. Kalau bedanya tambah, bilangan makin besar. Pola seperti itu disebut pola membesar."), baris: 2 },
  { judul: "Tambah beda lagi", arti: u(`Langkah empat. Untuk bilangan berikutnya, tambahkan beda lagi pada bilangan terakhir: ${KURSI_BARIS[2]} ${TAMBAH_TEKS} menjadi ${KURSI_BARIS[3]}.`), baris: 3 },
  { judul: "Hitung lompatan", arti: u(`Langkah lima. Untuk baris yang jauh, hitung lompatan. Banyak lompatan satu kurang dari nomor barisnya, jadi baris kelima punya ${BANYAK_BARIS - 1} lompatan: ${KURSI_BARIS[0]} ditambah ${BEDA_KURSI} sebanyak ${BANYAK_BARIS - 1} kali sama dengan ${KURSI_BARIS[4]}.`), baris: 4 },
  { judul: "Beda kurang: mengecil", arti: u(`Langkah enam. Kalau bedanya kurang, bilangan makin kecil, dan pola itu disebut pola mengecil. Nomor tampil ${NOMOR_PAPAN.join(", ")} berbeda ${KURANG_TEKS}, jadi berikutnya ${NOMOR_PAPAN[2] - BEDA_NOMOR}. Terus kurangi selama bilangannya belum habis, dan berhenti di nol.`), baris: "papan" },
];

export const JUDUL_PETA = "Denah Kursi Pak Gunawan";
export const IKON_JUDUL_PETA = "\u{1F3AD}";
export const PETUNJUK_PETA = "Ketuk tanda tanya di tiap baris untuk melihat langkahnya.";
export const SELESAI_PETA = "Denah kursi lengkap! Enam langkah sudah kamu buka.";
