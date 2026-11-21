/**
 * Data Mind-map dan Infografis Kelas 4 Bab 2 Sub-Bab E "Papan Pameran Bu Tuti", dirancang dari isi Story E dan Sub-Bab E menurut kurikulum (pecahan desimal perseratusan dan persen).
 * Mind-map = enam LANGKAH (persen per seratus, desimal lewat pecahan menjadi persen, penyebut disamakan seratus, kali seratus persen atau geser koma, persen ke desimal,
 * persen di atas seratus); tiap langkah punya gambar sendiri dan label kosong yang diketuk. Jumlah label mengikuti isi (enam), bukan cetakan bersama.
 * Infografis = DATA Story dalam dua kartu: kartu 1 tabel papan pameran (empat baris: nol koma tujuh lima, nol koma enam, nol koma empat, satu koma dua; kolom desimal, pecahan, persen),
 * kartu 2 kotak aturan (dua puluh dari lima puluh, lima persen, kali seratus persen, satu koma dua). Isi kotak tertutup sampai diketuk; digital saja.
 * Label, arti, dan suara tanpa kata terlarang; ucapan memakai kata (ucapkan). Diuji: scripts/uji-pameran-k4b2e.mjs.
 */
import { ucapkan as ucap } from "./logika-cpa";

/** Ucapan tanpa digit yang diawali huruf kapital. */
const ucapkan = (t: string): string => {
  const u = ucap(t.replace(/ = /g, " sama dengan "));
  return u.charAt(0).toUpperCase() + u.slice(1);
};

/* ------------------------------ Mind-map: enam langkah ------------------------------ */
export type GambarPeta = "persen" | "ke-persen" | "lain" | "geser" | "kembali" | "lebih";
export type LangkahPeta = { gambar: GambarPeta; judul: string; arti: string };

export const LANGKAH_PAMERAN: readonly LangkahPeta[] = [
  { gambar: "persen", judul: "Persen: per seratus", arti: ucapkan("Langkah satu. Persen berarti per seratus bagian. 5% artinya 5/100, dan 75% artinya 75 bagian dari 100 bagian.") },
  { gambar: "ke-persen", judul: "Desimal, pecahan, persen", arti: ucapkan("Langkah dua. Desimal perseratus ditulis menjadi pecahan per seratus, lalu menjadi persen: 0,75 = 75/100 = 75%.") },
  { gambar: "lain", judul: "Penyebut jadi seratus", arti: ucapkan("Langkah tiga. Pecahan berpenyebut lain disamakan menjadi per seratus. Kalikan pembilang dan penyebut dengan bilangan yang sama: 20/50 = 40/100 = 40%.") },
  { gambar: "geser", judul: "Kali 100%, geser koma", arti: ucapkan("Langkah empat. Cara langsung: kalikan desimal dengan 100%. Hasilnya sama dengan menggeser koma dua tempat ke kanan: 0,6 menjadi 60%.") },
  { gambar: "kembali", judul: "Persen ke desimal", arti: ucapkan("Langkah lima. Dari persen ke desimal, hilangkan tanda persen lalu geser koma dua tempat ke kiri: 40% menjadi 0,40, sama dengan 0,4.") },
  { gambar: "lebih", judul: "Lebih dari seratus persen", arti: ucapkan("Langkah enam. Persen boleh lebih dari 100%. Satu kisi penuh ditambah 20 kotak berarti 1,2 sama dengan 120%.") },
];

export const JUDUL_PETA = "Papan Pameran Bu Tuti";
export const IKON_JUDUL_PETA = "\u{1F3A8}";
export const PETUNJUK_PETA = "Ketuk tanda tanya di bawah gambar.";
export const SELESAI_PETA = "Papan pameran lengkap! Enam langkah sudah kamu buka.";

/* ------------------------------ Infografis kartu 1: tabel papan pameran ------------------------------ */
/** Satu baris tabel: persen dari Story (75, 60, 40, 120). Desimal dan pecahan dihitung dari persen; gambar batang terisi sebanyak persennya (di atas seratus persen ada batang kedua). */
export type BarisTabel = { id: string; p: number; desimal: string; pecahan: string; persen: string; suara: [string, string, string]; asal: string };
const baris = (id: string, p: number, desimal: string, asal: string): BarisTabel => ({
  id,
  p,
  desimal,
  pecahan: `${p}/100`,
  persen: `${p}%`,
  asal,
  suara: [ucapkan(`Desimalnya ${desimal}.`), ucapkan(`${desimal} sama dengan ${p}/100.`), ucapkan(`${p}/100 sama dengan ${p}%.`)],
});
export const TABEL_PAMERAN: readonly BarisTabel[] = [baris("t75", 75, "0,75", "papan pameran"), baris("t60", 60, "0,60", "kisi Genta"), baris("t40", 40, "0,40", "Bu Tuti"), baris("t120", 120, "1,20", "kisi penuh")];
export const KOLOM_TABEL = ["Desimal", "Pecahan", "Persen"] as const;

/* ------------------------------ Infografis kartu 2: kotak aturan ------------------------------ */
/** Kotak aturan: `label` terlihat, `isi` tertutup sampai diketuk. */
export type KotakAturan = { id: string; label: string; isi: string; suara: string };
export const KOTAK_ATURAN: readonly KotakAturan[] = [
  { id: "bilang", label: "20/50, dikali 2: pembilang", isi: "40", suara: ucapkan("20 dikali 2 sama dengan 40, jadi pembilang barunya 40.") },
  { id: "peny", label: "50 dikali 2: penyebut", isi: "100", suara: ucapkan("50 dikali 2 sama dengan 100, jadi penyebut barunya 100.") },
  { id: "hasil", label: "40/100 sama dengan", isi: "40%", suara: ucapkan("40/100 sama dengan 40%.") },
  { id: "lima", label: "5% artinya", isi: "5/100", suara: ucapkan("5% artinya 5/100, lima bagian dari seratus bagian.") },
  { id: "kali", label: "0,6 × 100%", isi: "60%", suara: ucapkan("0,6 dikali 100% sama dengan 60%, sama dengan menggeser koma dua tempat ke kanan.") },
  { id: "lebih", label: "1,2 sama dengan", isi: "120%", suara: ucapkan("1,2 sama dengan 120%. Persen boleh lebih dari 100%.") },
];

export const PETUNJUK_INFO_1 = "Tabel papan pameran. Ketuk tanda tanya untuk melihat desimal, pecahan, dan persennya.";
export const PETUNJUK_INFO_2 = "Kotak aturan. Ketuk tanda tanya untuk melihat jawabannya.";
export const SELESAI_INFO_1 = "Tabel lengkap! Desimal, pecahan, dan persen sama besar.";
export const SELESAI_INFO_2 = "Aturan lengkap! Siap melanjutkan.";
export const PESAN_INFO_2 = "Persen berarti per seratus, dan boleh lebih dari seratus.";
