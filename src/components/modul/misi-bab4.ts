/**
 * Misi dan tantangan bebas Bab 4 (Bangun Datar). Murni: tanpa React, tanpa jaringan.
 * Diuji di scripts/uji-lab-kelas1.mjs.
 *
 * Simulasi bertahap: satu laboratorium bentuk yang alatnya bertambah per sub-bab
 * (A: kini Meja Periksa Bahan, Misi Festival bagian satu (bahan-k1b4a); dulu Ciri Bentuk + Papan Paku; B: kini Rak Teras (teras-k1b4b), dulu + Kelompok; C: + menyusun bentuk, Bangun Gabungan, dan tab
 * Arsitek Cilik, sekaligus simulasi pencapaian misi bab ini).
 */

// Hanya impor tipe: berkas ini diuji langsung di Node (tanpa pemaket), jadi tidak boleh mengimpor nilai dari berkas lain.
import type { DefMisi, KeadaanSelesai } from "./misi-simulasi";
import type { KeadaanBahan } from "./bahan-k1b4a/logika";
import type { KeadaanTeras } from "./teras-k1b4b/logika";

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

export type KeadaanBab4 = KeadaanCiri | KeadaanPaku | KeadaanKelompok | KeadaanBangun | KeadaanSelesai | KeadaanBahan | KeadaanTeras;

const ciri = (k: KeadaanBab4): k is KeadaanCiri => k.alat === "ciri";
const paku = (k: KeadaanBab4, nama: string) => k.alat === "paku" && k.tertutup && k.bentuk === nama;
const kel = (k: KeadaanBab4): k is KeadaanKelompok => k.alat === "kelompok";
const ban = (k: KeadaanBab4): k is KeadaanBangun => k.alat === "bangun";
const selesai = (k: KeadaanBab4, id: string) => k.alat === "selesai" && k.id === id;

/**
 * Sub-Bab A: Misi Festival bagian satu, meja periksa bahan (Simulasi "Bahan dari Gudang"). Bahan dan bentuknya sama dengan BAHAN_SIM
 * di bahan-k1b4a/data.ts (diuji di scripts/uji-bahan-k1b4a.mjs): tutup botol dan piring kertas lengkung, bungkus roti lapis dan
 * potongan triplek segitiga, kotak teh dan kotak pasta gigi segi empat.
 */
const bahan = (k: KeadaanBab4): k is KeadaanBahan => k.alat === "bahan";
export const BENTUK_BAHAN_A: Record<string, "lengkung" | "segitiga" | "segiempat"> = { botol: "lengkung", piring: "lengkung", roti: "segitiga", triplek: "segitiga", teh: "segiempat", pasta: "segiempat" };
const LABEL_A = { lengkung: "roda", segitiga: "atap", segiempat: "badan" } as const;
export const MISI_A: DefMisi<KeadaanBab4>[] = [
  { id: "a-putar", teks: "Putar bahan segitiga, lalu tampilkan sudutnya. Sudutnya tetap tiga.", wajib: true, cek: (k) => bahan(k) && BENTUK_BAHAN_A[k.pilih] === "segitiga" && k.putar[k.pilih] !== 0 && k.sudut },
  { id: "a-gelinding", teks: "Gelindingkan bahan yang tepinya lengkung.", wajib: true, cek: (k) => bahan(k) && k.gelinding.some((id) => BENTUK_BAHAN_A[id] === "lengkung") },
  { id: "a-sudut", teks: "Coba gelindingkan bahan yang punya sudut. Apa yang terjadi?", wajib: true, cek: (k) => bahan(k) && k.gelinding.some((id) => BENTUK_BAHAN_A[id] !== "lengkung") },
  { id: "a-label", teks: "Beri label roda, atap, atau badan yang tepat pada semua bahan.", wajib: true, cek: (k) => bahan(k) && Object.keys(BENTUK_BAHAN_A).every((id) => k.label[id] === LABEL_A[BENTUK_BAHAN_A[id]]) },
  { id: "a-besar", teks: "Besarkan kotak teh sampai paling besar. Sisinya tetap empat.", wajib: false, cek: (k) => bahan(k) && k.skala.teh === 3 },
  { id: "a-sisi", teks: "Tampilkan sisi lurus piring kertas. Ada berapa?", wajib: false, cek: (k) => bahan(k) && k.pilih === "piring" && k.sisi },
];

/**
 * Sub-Bab B: Misi Festival bagian satu, rak teras (Simulasi "Teras Penuh Barang"). Keadaan dari teras-k1b4b/logika.ts
 * (diuji di scripts/uji-teras-k1b4b.mjs): aturan bentuk, warna, atau ukuran; barang terpilih; barang yang dicat atau diubah ukurannya.
 * Mula-mula aturan bentuk, belum ada barang terpilih, dan belum ada barang kuning.
 */
const teras = (k: KeadaanBab4): k is KeadaanTeras => k.alat === "teras";
export const MISI_B: DefMisi<KeadaanBab4>[] = [
  { id: "b-warna", teks: "Ganti aturan menjadi warna. Lihat barang pindah keranjang.", wajib: true, cek: (k) => teras(k) && k.aturan === "warna" },
  { id: "b-ukuran", teks: "Ganti aturan menjadi ukuran, lalu baca isi tiap keranjang.", wajib: true, cek: (k) => teras(k) && k.aturan === "ukuran" },
  { id: "b-pilih", teks: "Ketuk satu barang, lalu baca cirinya: bentuk, warna, dan ukuran.", wajib: true, cek: (k) => teras(k) && k.terpilih !== null },
  { id: "b-pindah", teks: "Pilih satu barang, lalu ganti aturannya. Lihat barang itu pindah keranjang.", wajib: true, cek: (k) => teras(k) && k.terpilih !== null && k.ikut.length >= 2 },
  { id: "b-kuning", teks: "Cat satu barang menjadi kuning. Keranjang kuning tidak kosong lagi.", wajib: false, cek: (k) => teras(k) && k.barang.some((b) => b.warna === "kuning") },
  { id: "b-sama", teks: "Pakai aturan ukuran. Ubah ukuran barang sampai keranjang besar dan kecil sama banyak.", wajib: false, cek: (k) => teras(k) && k.aturan === "ukuran" && k.barang.filter((b) => b.ukuran === "besar").length * 2 === k.barang.length },
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
