/**
 * Misi dan tantangan bebas Kelas 2 Bab 7 (Ayo Membilang sampai dengan 100). Murni: tanpa React, tanpa jaringan.
 * Diuji di scripts/uji-lab-k2b7.mjs.
 *
 * Simulasi bertahap per sub-bab (paling banyak tiga alat):
 *  A (Menghitung, membaca, menulis): Lab Seratus + Tabel Seratus + Mesin Tebak Banyak.
 *  B (Membandingkan, sub-bab akhir): Lab Garis Seratus + Lab Banding dan Urut + skenario Kelereng Kira,
 *     sekaligus pencapaian misi bab ini.
 */

// Hanya impor tipe: berkas ini diuji langsung di Node (tanpa pemaket), jadi tidak boleh mengimpor nilai dari berkas lain.
import type { DefMisi, KeadaanSelesai } from "./misi-simulasi";

export type ArahTabelMisi = "atas" | "bawah" | "kiri" | "kanan";
export type LangkahGarisMisi = { dari: number; ke: number; arah: "maju" | "mundur"; k: number };

export type KeadaanLabSeratus = {
  alat: "seratus";
  p: number;
  s: number;
  n: number;
  /** Satuan lepas kurang dari sepuluh, jadi papan nilai tempat dan pasangan bilangan jujur. */
  terikat: boolean;
  papan: boolean;
  pasangan: boolean;
  nama: boolean;
  benda: boolean;
  /** Bilangan (terikat) yang pernah ditampilkan. */
  pernah: number[];
  /** Berapa kali sepuluh satuan lepas diikat menjadi satu puluhan. */
  ikat: number;
  /** Berapa kali satu puluhan dibuka menjadi sepuluh satuan lepas. */
  buka: number;
};

export type KeadaanLabTabel = {
  alat: "tabel";
  n: number;
  tetangga: boolean;
  jejak: boolean;
  kolom: boolean;
  /** Lompatan turun berturut-turut terpanjang (tiap lompatan tambah sepuluh). */
  terbaikBawah: number;
  terbaikAtas: number;
  ketuk: number[];
  arah: ArahTabelMisi[];
};

export type KeadaanLabGaris = {
  alat: "garis";
  n: number;
  k: number;
  lengkung: boolean;
  papan: boolean;
  terakhir: LangkahGarisMisi | null;
  riwayat: LangkahGarisMisi[];
};

export type KeadaanLabBanding = {
  alat: "banding";
  mode: "banding" | "urut";
  a: number;
  b: number;
  batang: boolean;
  papan: boolean;
  aturan: boolean;
  tanda: boolean;
  /** Pasangan bilangan ("kecil|besar") yang pernah dibandingkan saat Aturan menyala. */
  pasang: string[];
  /** Urutan yang sudah benar: "id-himpunan|kecil" atau "id-himpunan|besar". */
  urutSelesai: string[];
};

export type KeadaanK2Bab7 = KeadaanLabSeratus | KeadaanLabTabel | KeadaanLabGaris | KeadaanLabBanding | KeadaanSelesai;

const seratus = (k: KeadaanK2Bab7): k is KeadaanLabSeratus => k.alat === "seratus";
const tabel = (k: KeadaanK2Bab7): k is KeadaanLabTabel => k.alat === "tabel";
const garis = (k: KeadaanK2Bab7): k is KeadaanLabGaris => k.alat === "garis";
const banding = (k: KeadaanK2Bab7): k is KeadaanLabBanding => k.alat === "banding";
const selesai = (k: KeadaanK2Bab7, id: string) => k.alat === "selesai" && k.id === id;

const puluhan = (n: number) => Math.floor(n / 10);
const kunciPasang = (x: number, y: number) => `${Math.min(x, y)}|${Math.max(x, y)}`;
/** Lompatan melewati puluhan: banyak puluhan sebelum dan sesudah berbeda. */
export const lintasPuluhan = (t: LangkahGarisMisi): boolean => puluhan(t.dari) !== puluhan(t.ke);

/** Sub-Bab A: puluhan dan satuan sampai seratus, tabel seratus, dan menebak banyak benda. */
export const MISI_A: DefMisi<KeadaanK2Bab7>[] = [
  {
    id: "a-seratus",
    teks: "Buat seratus: sepuluh puluhan penuh dan nol satuan.",
    wajib: true,
    cek: (k) => seratus(k) && k.p === 10 && k.s === 0,
  },
  {
    id: "a-ikat",
    teks: "Tambah satuan sampai ada sepuluh yang lepas, lalu ikat sepuluh itu menjadi satu puluhan.",
    wajib: true,
    cek: (k) => seratus(k) && k.ikat >= 1,
  },
  {
    id: "a-lima-tiga",
    teks: "Nyalakan Papan nilai tempat dan buat 53: lima puluhan dan tiga satuan.",
    wajib: true,
    cek: (k) => seratus(k) && k.papan && k.terikat && k.p === 5 && k.s === 3,
  },
  {
    id: "a-tertukar",
    teks: "Buat 62, lalu buat 26. Angkanya sama, tempatnya beda, nilainya beda.",
    wajib: true,
    cek: (k) => seratus(k) && k.pernah.includes(62) && k.pernah.includes(26),
  },
  {
    id: "a-lompat",
    teks: "Di Tabel Seratus, lompat turun empat kali berturut-turut. Tiap lompatan menambah sepuluh.",
    wajib: true,
    cek: (k) => tabel(k) && k.terbaikBawah >= 4,
  },
  { id: "a-tebak", teks: "Selesaikan Mesin Tebak Banyak sampai semua kumpulan dihitung.", wajib: true, cek: (k) => selesai(k, "tebak-banyak") },
  {
    id: "a-pasangan",
    teks: "Nyalakan Pasangan dan buat 67. Enam puluh ditambah tujuh.",
    wajib: false,
    cek: (k) => seratus(k) && k.pasangan && k.terikat && k.p === 6 && k.s === 7,
  },
  {
    id: "a-nama",
    teks: "Nyalakan Nama bilangan dan buat 90. Baca namanya dengan suara guru.",
    wajib: false,
    cek: (k) => seratus(k) && k.nama && k.terikat && k.n === 90,
  },
  {
    id: "a-buka",
    teks: "Buka satu puluhan menjadi sepuluh satuan lepas. Banyaknya tetap sama.",
    wajib: false,
    cek: (k) => seratus(k) && k.buka >= 1,
  },
  {
    id: "a-tetangga",
    teks: "Nyalakan Tetangga dan pilih kotak 55. Lihat bilangan di atas, bawah, kiri, dan kanannya.",
    wajib: false,
    cek: (k) => tabel(k) && k.tetangga && k.n === 55,
  },
  {
    id: "a-kolom",
    teks: "Nyalakan Kolom dan pilih kotak 47. Bilangan sekolom satuannya sama.",
    wajib: false,
    cek: (k) => tabel(k) && k.kolom && k.n === 47,
  },
];

/** Sub-Bab B (sub-bab akhir): garis bilangan, membandingkan, mengurutkan. Sekaligus pencapaian misi bab ini. */
export const MISI_B: DefMisi<KeadaanK2Bab7>[] = [
  {
    id: "b-maju",
    teks: "Atur kupu-kupu di 58, lalu maju dua langkah. Dua lebihnya dari 58 adalah 60.",
    wajib: true,
    cek: (k) => garis(k) && k.riwayat.some((t) => t.dari === 58 && t.ke === 60 && t.arah === "maju" && t.k === 2),
  },
  {
    id: "b-mundur",
    teks: "Atur penanda di 75, lalu mundur tiga langkah. Tiga kurangnya dari 75 adalah 72.",
    wajib: true,
    cek: (k) => garis(k) && k.riwayat.some((t) => t.dari === 75 && t.ke === 72 && t.arah === "mundur" && t.k === 3),
  },
  {
    id: "b-lintas",
    teks: "Nyalakan Papan nilai tempat, lalu maju sampai melewati puluhan penuh, misalnya dari 58 ke 62. Lihat puluhannya berubah.",
    wajib: true,
    cek: (k) => garis(k) && k.papan && k.terakhir !== null && k.terakhir.arah === "maju" && lintasPuluhan(k.terakhir),
  },
  {
    id: "b-puluhan",
    teks: "Nyalakan Aturan dan bandingkan 56 dengan 65. Puluhan yang menentukan.",
    wajib: true,
    cek: (k) => banding(k) && k.pasang.includes(kunciPasang(56, 65)),
  },
  {
    id: "b-satuan",
    teks: "Bandingkan 54 dengan 58. Puluhannya sama, jadi satuan yang menentukan.",
    wajib: true,
    cek: (k) => banding(k) && k.pasang.includes(kunciPasang(54, 58)),
  },
  {
    id: "b-urut",
    teks: "Di Urutkan, susun 57, 76, dan 83 dari yang paling kecil.",
    wajib: true,
    cek: (k) => banding(k) && k.urutSelesai.includes("tiga|kecil"),
  },
  { id: "b-skenario", teks: "Selesaikan skenario Kelereng Kira sampai adegan akhir.", wajib: true, cek: (k) => selesai(k, "kelereng-kira") },
  {
    id: "b-jebakan",
    teks: "Nyalakan Aturan dan bandingkan 59 dengan 61. Satuan 9 lebih besar dari 1, tetapi 61 tetap lebih besar.",
    wajib: false,
    cek: (k) => banding(k) && k.pasang.includes(kunciPasang(59, 61)),
  },
  {
    id: "b-sama",
    teks: "Buat dua bilangan yang sama besar, misalnya 44 dan 44.",
    wajib: false,
    cek: (k) => banding(k) && k.mode === "banding" && k.a === k.b && k.a > 0,
  },
  {
    id: "b-tanda",
    teks: "Nyalakan Tanda dan bandingkan 91 dengan 19. Tanda terbuka ke arah bilangan yang lebih besar.",
    wajib: false,
    cek: (k) => banding(k) && k.tanda && k.mode === "banding" && ((k.a === 91 && k.b === 19) || (k.a === 19 && k.b === 91)),
  },
  {
    id: "b-besar",
    teks: "Urutkan satu himpunan bilangan dari yang paling besar.",
    wajib: false,
    cek: (k) => banding(k) && k.urutSelesai.some((x) => x.endsWith("|besar")),
  },
  {
    id: "b-lima",
    teks: "Urutkan lima bilangan dari yang paling kecil.",
    wajib: false,
    cek: (k) => banding(k) && k.urutSelesai.includes("lima|kecil"),
  },
];

export const daftarMisiK2Bab7 = (sub: string): DefMisi<KeadaanK2Bab7>[] => (sub === "B" ? MISI_B : MISI_A);
