/**
 * Misi dan tantangan bebas Bab 4 (Bangun Datar). Murni: tanpa React, tanpa jaringan.
 * Diuji di scripts/uji-lab-kelas1.mjs.
 *
 * Simulasi bertahap: satu laboratorium bentuk yang alatnya bertambah per sub-bab
 * (A: Ciri Bentuk + Papan Paku; B: + Kelompok; C: + menyusun bentuk, Bangun Gabungan, dan tab
 * Arsitek Cilik, sekaligus simulasi pencapaian misi bab ini).
 */

// Hanya impor tipe: berkas ini diuji langsung di Node (tanpa pemaket), jadi tidak boleh mengimpor nilai dari berkas lain.
import type { DefMisi, KeadaanSelesai } from "./misi-simulasi";

export type KeadaanCiri = {
  alat: "ciri";
  /** Bentuk yang dipilih: persegi, persegi-panjang, segitiga, lingkaran, setengah-lingkaran. */
  id: string;
  putar: number;
  skala: number;
  sisi: boolean;
  sudut: boolean;
  /** Bagian Menyusun ikut tersedia (Sub-Bab C). */
  menyusun: boolean;
  /** Susunan yang dipilih: dua-segitiga, dua-persegi, empat-persegi, dua-setengah. */
  idSusun: string;
  gabung: boolean;
};

export type KeadaanPaku = { alat: "paku"; tertutup: boolean; /** Nama bentuk dari karet yang sudah ditutup, atau null. */ bentuk: string | null };

export type KeadaanKelompok = { alat: "kelompok"; aturan: string; terpilih: number | null };

export type KeadaanBangun = { alat: "bangun"; id: string; urai: boolean; jenis: string | null; diambil: boolean };

export type KeadaanBab4 = KeadaanCiri | KeadaanPaku | KeadaanKelompok | KeadaanBangun | KeadaanSelesai;

const ciri = (k: KeadaanBab4): k is KeadaanCiri => k.alat === "ciri";
const paku = (k: KeadaanBab4, nama: string) => k.alat === "paku" && k.tertutup && k.bentuk === nama;
const kel = (k: KeadaanBab4): k is KeadaanKelompok => k.alat === "kelompok";
const ban = (k: KeadaanBab4): k is KeadaanBangun => k.alat === "bangun";
const selesai = (k: KeadaanBab4, id: string) => k.alat === "selesai" && k.id === id;

/** Sub-Bab A: ciri bentuk (sisi dan sudut tetap saat diputar dan dibesarkan) dan Papan Paku. */
export const MISI_A: DefMisi<KeadaanBab4>[] = [
  { id: "a-putar", teks: "Pilih persegi, lalu tekan Putar 90°. Sisinya tetap 4.", wajib: true, cek: (k) => ciri(k) && k.id === "persegi" && k.putar !== 0 },
  { id: "a-besar", teks: "Besarkan segitiga sampai ukuran 3. Sudutnya tetap 3.", wajib: true, cek: (k) => ciri(k) && k.id === "segitiga" && k.skala === 3 },
  { id: "a-lingkaran", teks: "Pilih lingkaran. Cari sisi lurus dan sudutnya.", wajib: true, cek: (k) => ciri(k) && k.id === "lingkaran" },
  { id: "a-segitiga", teks: "Papan Paku: pasang 3 paku, lalu tutup bentuk sampai jadi segitiga.", wajib: true, cek: (k) => paku(k, "Segitiga") },
  { id: "a-persegi", teks: "Papan Paku: buat persegi dengan 4 paku, lalu tutup bentuk.", wajib: true, cek: (k) => paku(k, "Persegi") },
  { id: "a-lengkung", teks: "Papan Paku: nyalakan bentuk lengkung, lalu tutup bentuk.", wajib: false, cek: (k) => paku(k, "Bentuk lengkung") },
  { id: "a-polos", teks: "Matikan Tampilkan sisi dan Tampilkan sudut. Kenali bentuknya saja.", wajib: false, cek: (k) => ciri(k) && !k.sisi && !k.sudut },
];

/** Sub-Bab B: mengelompokkan benda menurut satu aturan (bentuk, warna, ukuran). */
export const MISI_B: DefMisi<KeadaanBab4>[] = [
  { id: "b-warna", teks: "Kelompokkan balok menurut Warna. Lihat balok pindah nampan.", wajib: true, cek: (k) => kel(k) && k.aturan === "warna" },
  { id: "b-ukuran", teks: "Kelompokkan balok menurut Ukuran. Hitung tiap nampan.", wajib: true, cek: (k) => kel(k) && k.aturan === "ukuran" },
  { id: "b-blok", teks: "Ketuk satu balok. Lihat kelompoknya menurut bentuk, warna, dan ukuran.", wajib: true, cek: (k) => kel(k) && k.terpilih !== null },
  { id: "b-ganti", teks: "Pilih satu balok, lalu ganti aturannya. Lihat balok itu pindah kelompok.", wajib: true, cek: (k) => kel(k) && k.terpilih !== null && k.aturan !== "bentuk" },
  { id: "b-ingat-papan", teks: "Ingat Sub-Bab A: buat segitiga di Papan Paku.", wajib: false, cek: (k) => paku(k, "Segitiga") },
  { id: "b-ingat-putar", teks: "Ingat Sub-Bab A: putar persegi, sisinya tetap 4.", wajib: false, cek: (k) => ciri(k) && k.id === "persegi" && k.putar !== 0 },
];

/** Sub-Bab C (sub-bab akhir): menyusun dan menguraikan bentuk, sekaligus pencapaian misi bab ini. */
export const MISI_C: DefMisi<KeadaanBab4>[] = [
  { id: "c-segitiga", teks: "Pilih 2 segitiga, lalu gabungkan bagian. Bentuk apa yang lahir?", wajib: true, cek: (k) => ciri(k) && k.menyusun && k.idSusun === "dua-segitiga" && k.gabung },
  { id: "c-persegi", teks: "Pilih 2 persegi, lalu gabungkan bagian. Bentuk apa yang lahir?", wajib: true, cek: (k) => ciri(k) && k.menyusun && k.idSusun === "dua-persegi" && k.gabung },
  { id: "c-kereta", teks: "Uraikan kereta menjadi bagian-bagiannya.", wajib: true, cek: (k) => ban(k) && k.id === "kereta" && k.urai },
  { id: "c-lidi", teks: "Pilih Rumah dari lidi, lalu uraikan. Hitung lidi dinding dan lidi atap.", wajib: true, cek: (k) => ban(k) && k.id === "rumah-lidi" && k.urai },
  { id: "c-arsitek", teks: "Selesaikan skenario Arsitek Cilik sampai adegan akhir.", wajib: true, cek: (k) => selesai(k, "arsitek") },
  { id: "c-ambil", teks: "Uraikan sebuah bangun, pilih satu jenis bagian, lalu ambil. Baca kalimat kurangnya.", wajib: false, cek: (k) => ban(k) && k.urai && k.diambil },
  { id: "c-panjang", teks: "Ingat Sub-Bab A: buat persegi panjang di Papan Paku.", wajib: false, cek: (k) => paku(k, "Persegi panjang") },
  { id: "c-ingat-warna", teks: "Ingat Sub-Bab B: kelompokkan balok menurut Warna.", wajib: false, cek: (k) => kel(k) && k.aturan === "warna" },
];

export const daftarMisiBab4 = (sub: string): DefMisi<KeadaanBab4>[] => (sub === "B" ? MISI_B : sub === "C" ? MISI_C : MISI_A);
