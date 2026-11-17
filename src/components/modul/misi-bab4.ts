/**
 * Misi dan tantangan bebas Bab 4 (Bangun Datar). Murni: tanpa React, tanpa jaringan.
 * Diuji di scripts/uji-lab-kelas1.mjs.
 *
 * Simulasi bertahap: satu laboratorium bentuk yang alatnya bertambah per sub-bab
 * (A: kini Meja Periksa Bahan, Misi Festival bagian satu (bahan-k1b4a); dulu Ciri Bentuk + Papan Paku; B: kini Rak Teras (teras-k1b4b), dulu + Kelompok; C: kini Meja Rakit Mainan (susun-k1b4c), sekaligus penutup bab).
 */

// Hanya impor tipe: berkas ini diuji langsung di Node (tanpa pemaket), jadi tidak boleh mengimpor nilai dari berkas lain.
import type { DefMisi, KeadaanSelesai } from "./misi-simulasi";
import type { KeadaanBahan } from "./bahan-k1b4a/logika";
import type { KeadaanTeras } from "./teras-k1b4b/logika";
import type { KeadaanSusun } from "./susun-k1b4c/logika";

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

export type KeadaanBab4 = KeadaanCiri | KeadaanPaku | KeadaanKelompok | KeadaanBangun | KeadaanSelesai | KeadaanBahan | KeadaanTeras | KeadaanSusun;


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

/**
 * Sub-Bab C (akhir bab): Misi Festival bagian satu, meja rakit mainan (susun-k1b4c), sekaligus penutup bab. Banyak bagian tiap mainan
 * sama dengan MAINAN_SIM di susun-k1b4c/data.ts (diuji di scripts/uji-susun-k1b4c.mjs): robot enam bagian, mobil hias lima, pesawat enam.
 */
const rakit = (k: KeadaanBab4): k is KeadaanSusun => k.alat === "susun";
export const TOTAL_RAKIT_C: Record<string, number> = { robot: 6, mobil: 5, pesawat: 6 };
const ID_RAKIT = Object.keys(TOTAL_RAKIT_C);
const catatRakit = (k: KeadaanBab4, c: string) => rakit(k) && k.catat.includes(c);
export const MISI_C: DefMisi<KeadaanBab4>[] = [
  { id: "c-robot", teks: "Susun robot sampai lengkap, lalu baca kalimat tambahnya.", wajib: true, cek: (k) => catatRakit(k, "robot:lengkap") },
  { id: "c-roda", teks: "Lepas semua roda lengkung dari mobil hias yang sudah lengkap. Baca kalimat kurangnya.", wajib: true, cek: (k) => catatRakit(k, "mobil:kurang:lengkung") },
  { id: "c-semua", teks: "Susun ketiga mainan sampai lengkap.", wajib: true, cek: (k) => ID_RAKIT.every((id) => catatRakit(k, `${id}:lengkap`)) },
  { id: "c-juri", teks: "Penutup festival: bawa semua mainan ke panggung, lalu jawab pertanyaan juri tentang banyak bagiannya.", wajib: true, cek: (k) => rakit(k) && k.panggung && ID_RAKIT.every((id) => k.juri[id] === TOTAL_RAKIT_C[id]) },
  { id: "c-urai", teks: "Urai pesawat yang sudah lengkap sampai semua bagiannya lepas.", wajib: false, cek: (k) => catatRakit(k, "pesawat:kosong") },
  {
    id: "c-kembali",
    teks: "Lepas satu jenis bagian, lalu pasang lagi. Banyak bagiannya kembali sama.",
    wajib: false,
    cek: (k) =>
      rakit(k) &&
      ID_RAKIT.some((id) => {
        const kurang = k.catat.findIndex((c) => c.startsWith(`${id}:kurang:`));
        return kurang >= 0 && k.catat.lastIndexOf(`${id}:lengkap`) > kurang;
      }),
  },
];

export const daftarMisiBab4 = (sub: string): DefMisi<KeadaanBab4>[] => (sub === "B" ? MISI_B : sub === "C" ? MISI_C : MISI_A);
