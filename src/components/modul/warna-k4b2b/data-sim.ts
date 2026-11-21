/**
 * Data Simulasi Bak Warna K4 Bab 2 Sub-Bab B "Bak Warna Pak Joyo", cerita Sanggar Batik Kampung Mekar.
 * Data berbeda dari Story (bak biru 3/8, bak merah 6/8; 2/8, 5/8, 7/8) dan dari tugas CPA; tidak memakai penyebut delapan sama sekali.
 * Empat alat: Banding (hitung isi kedua bak, lalu pilih tanda), Isi (ketuk bagian bak sebanyak pembilang), Urut (geser kartu pecahan sampai berurutan naik atau turun),
 * Garis (pasang titik pada garis dari nol sampai satu). Semua pecahan berpenyebut sama dalam satu sasaran. Pecahan tampil bertingkat, suara mengeja kata.
 * Diuji: scripts/uji-warna-k4b2b.mjs.
 */
export type Arah = "naik" | "turun";

/** Banding: dua bak berpenyebut sama `q`, terisi `a` dan `b` bagian; sasaran ketiga sama persis (tanda sama dengan). */
export type TargetBanding = { benda: string; q: number; a: number; b: number };
export const TARGET_BANDING: readonly TargetBanding[] = [
  { benda: "bak hijau dan bak ungu", q: 6, a: 1, b: 4 },
  { benda: "bak kuning dan bak jingga", q: 9, a: 7, b: 2 },
  { benda: "bak merah muda dan bak biru muda", q: 5, a: 3, b: 3 },
];

/** Isi: bak kosong dengan `q` bagian sama besar; anak mengetuk bagian sampai terisi `p` bagian. */
export type TargetIsi = { benda: string; q: number; p: number };
export const TARGET_ISI: readonly TargetIsi[] = [
  { benda: "bak hijau", q: 5, p: 2 },
  { benda: "bak ungu", q: 9, p: 4 },
  { benda: "bak kuning", q: 6, p: 5 },
];

/** Urut: kartu pecahan (hanya pembilangnya tertulis acak; penyebut `q` sama); anak menggesernya sampai berurutan (naik = terkecil ke terbesar, turun = sebaliknya). */
export type TargetUrut = { benda: string; q: number; data: number[]; arah: Arah };
export const TARGET_URUT: readonly TargetUrut[] = [
  { benda: "bak pagi", q: 6, data: [5, 1, 3], arah: "naik" },
  { benda: "bak siang", q: 9, data: [6, 2, 8, 4], arah: "turun" },
  { benda: "bak sore", q: 5, data: [4, 1, 3], arah: "naik" },
];

/** Garis: pasang titik pada garis dari nol sampai satu yang dibagi `q` bagian sama besar, di pecahan `p` per `q`. */
export type TargetGaris = { benda: string; q: number; p: number };
export const TARGET_GARIS: readonly TargetGaris[] = [
  { benda: "tali jemuran pagi", q: 5, p: 3 },
  { benda: "tali jemuran siang", q: 9, p: 7 },
  { benda: "tali jemuran sore", q: 6, p: 2 },
];

export const MISI_WARNA_TEKS = "Hitung isi dua bak lalu pilih tandanya, isi bak, urutkan kartu, dan pasang titik pada garis. Urutannya bebas.";
