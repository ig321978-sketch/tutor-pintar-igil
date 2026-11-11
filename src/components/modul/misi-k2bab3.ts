/**
 * Misi dan tantangan bebas Kelas 2 Bab 3 (Bentuk di Sekitar Kita). Murni: tanpa React, tanpa jaringan.
 * Diuji di scripts/uji-lab-kelas2.mjs.
 *
 * Simulasi bertahap per sub-bab (paling banyak tiga alat):
 *  A: Lab Bentuk Datar (dengan uji Cetakan) + Mesin Tiga Pertanyaan.
 *  B: Bengkel Urai + Lab Pola Segitiga + Lab Bentuk Datar (alat Sub-Bab A, untuk mengingat).
 *  C (akhir): Lereng Gelinding + Lab Cetak Permukaan + skenario Toko Mainan Upe, sekaligus pencapaian misi bab ini.
 */

// Hanya impor tipe: berkas ini diuji langsung di Node (tanpa pemaket), jadi tidak boleh mengimpor nilai dari berkas lain.
import type { DefMisi, KeadaanSelesai } from "./misi-simulasi";

export type KeadaanBentuk = {
  alat: "bentuk";
  tipe: "segi" | "lengkung";
  /** Banyak sisi segi banyak (3 sampai 6). */
  n: number;
  jenis: "lingkaran" | "lonjong";
  /** Putaran dalam derajat, kelipatan 30. */
  putar: number;
  /** Indeks ukuran: 0 kecil, 1 sedang, 2 besar. */
  skala: number;
  /** Cetakan (garis putus-putus pada posisi awal) sedang tampil. */
  cetakan: boolean;
  /** Bentuk yang sedang diputar pas dengan cetakannya. */
  pas: boolean;
  /** Nomor sisi sedang tampil. */
  sisi: boolean;
};

export type KeadaanUrai = {
  alat: "urai";
  bentuk: "persegi" | "persegiPanjang" | "segienam";
  keping: number;
  segitiga: number;
  /** Tingkat renggang keping (0 = rapat). */
  renggang: number;
  /** Keping pernah direnggangkan lalu dirapatkan lagi (dan masih terurai). */
  rapatLagi: boolean;
};

export type KeadaanPola = {
  alat: "pola";
  n: number;
  cara: "pojok" | "tengah";
  /** Cara lain ditampilkan berdampingan. */
  banding: boolean;
  /** Tabel pola sedang tampil. */
  tabel: boolean;
};

export type KeadaanLereng = {
  alat: "lereng";
  ruang: "kubus" | "balok" | "tabung" | "kerucut" | "bola";
  posisi: "berdiri" | "rebah";
  /** Benda sudah dilepas di lereng. */
  meluncur: boolean;
  gerak: "diam" | "menggelinding" | "melingkar";
};

export type KeadaanCetak = {
  alat: "cetak";
  ruang: "kubus" | "balok" | "tabung" | "kerucut" | "bola";
  permukaan: string;
  /** Tombol Cetak sudah ditekan untuk permukaan ini. */
  dicetak: boolean;
  /** Bangun datar hasil cetakan, atau null bila permukaannya lengkung. */
  bentuk: "persegi" | "persegiPanjang" | "lingkaran" | null;
};

export type KeadaanK2Bab3 = KeadaanBentuk | KeadaanUrai | KeadaanPola | KeadaanLereng | KeadaanCetak | KeadaanSelesai;

const bentuk = (k: KeadaanK2Bab3): k is KeadaanBentuk => k.alat === "bentuk";
const urai = (k: KeadaanK2Bab3): k is KeadaanUrai => k.alat === "urai";
const pola = (k: KeadaanK2Bab3): k is KeadaanPola => k.alat === "pola";
const lereng = (k: KeadaanK2Bab3): k is KeadaanLereng => k.alat === "lereng";
const cetak = (k: KeadaanK2Bab3): k is KeadaanCetak => k.alat === "cetak";
const selesai = (k: KeadaanK2Bab3, id: string) => k.alat === "selesai" && k.id === id;

/** Sub-Bab A: sisi menentukan nama, lingkaran selalu pas, tiga pertanyaan detektif. */
export const MISI_A: DefMisi<KeadaanK2Bab3>[] = [
  { id: "a-lima", teks: "Buat segi lima. Nyalakan nomor sisi dan hitung sisinya sampai 5.", wajib: true, cek: (k) => bentuk(k) && k.tipe === "segi" && k.n === 5 && k.sisi },
  {
    id: "a-lingkaran",
    teks: "Pilih Bentuk lengkung, nyalakan Cetakan, lalu putar lingkaran. Selalu pas, ke arah mana pun.",
    wajib: true,
    cek: (k) => bentuk(k) && k.tipe === "lengkung" && k.jenis === "lingkaran" && k.cetakan && k.putar !== 0 && k.pas,
  },
  {
    id: "a-lonjong",
    teks: "Pilih bentuk lonjong, nyalakan Cetakan, lalu putar 30 derajat. Sekarang tidak pas lagi.",
    wajib: true,
    cek: (k) => bentuk(k) && k.tipe === "lengkung" && k.jenis === "lonjong" && k.cetakan && !k.pas,
  },
  { id: "a-mesin", teks: "Selesaikan Mesin Tiga Pertanyaan sampai semua bentuk misterius dikenali.", wajib: true, cek: (k) => selesai(k, "detektif") },
  {
    id: "a-ciri-tetap",
    teks: "Buat segi enam, putar, lalu pilih ukuran Besar. Lihat tabel: ciri tetap sama.",
    wajib: false,
    cek: (k) => bentuk(k) && k.tipe === "segi" && k.n === 6 && k.putar !== 0 && k.skala === 2,
  },
  { id: "a-segitiga", teks: "Kurangi sisi sampai 3. Segitiga punya 3 sisi dan 3 sudut.", wajib: false, cek: (k) => bentuk(k) && k.tipe === "segi" && k.n === 3 },
];

/** Sub-Bab B: mengurai, menyusun, pola banyak segitiga. */
export const MISI_B: DefMisi<KeadaanK2Bab3>[] = [
  { id: "b-diagonal", teks: "Pilih persegi dan nyalakan satu diagonal. Hasilnya dua segitiga.", wajib: true, cek: (k) => urai(k) && k.bentuk === "persegi" && k.keping === 2 && k.segitiga === 2 },
  { id: "b-tengah", teks: "Urai persegi yang sama dengan satu garis tengah. Hasilnya bukan segitiga: cara beda, hasil beda.", wajib: true, cek: (k) => urai(k) && k.bentuk === "persegi" && k.keping === 2 && k.segitiga === 0 },
  { id: "b-enam-pojok", teks: "Pilih segi enam dan urai dari satu titik. Hasilnya empat segitiga.", wajib: true, cek: (k) => urai(k) && k.bentuk === "segienam" && k.keping === 4 && k.segitiga === 4 },
  { id: "b-pola-lima", teks: "Di Lab Pola, pilih segi lima dari satu pojok. Banyak sisi dikurangi dua: 5 − 2 = 3 segitiga.", wajib: true, cek: (k) => pola(k) && k.n === 5 && k.cara === "pojok" },
  { id: "b-pola-tengah", teks: "Di Lab Pola, pilih segi tujuh dari titik tengah. Banyak segitiga sama dengan banyak sisi: 7.", wajib: true, cek: (k) => pola(k) && k.n === 7 && k.cara === "tengah" },
  { id: "b-rapat", teks: "Renggangkan keping persegi yang terurai, lalu rapatkan lagi. Bentuknya kembali seperti semula.", wajib: false, cek: (k) => urai(k) && k.keping >= 2 && k.rapatLagi },
  { id: "b-enam-tengah", teks: "Urai segi enam lewat titik tengah dan hitung enam segitiga di Bengkel.", wajib: false, cek: (k) => urai(k) && k.bentuk === "segienam" && k.keping === 6 && k.segitiga === 6 },
  { id: "b-banding", teks: "Nyalakan Bandingkan di Lab Pola untuk segi delapan. Dua cara beda dua segitiga.", wajib: false, cek: (k) => pola(k) && k.n === 8 && k.banding },
  { id: "b-ingat", teks: "Ingat Sub-Bab A: di Lab Bentuk Datar buat segi lima dan lihat lima sisinya.", wajib: false, cek: (k) => bentuk(k) && k.tipe === "segi" && k.n === 5 && k.sisi },
];

/** Sub-Bab C (sub-bab akhir): bangun ruang, sekaligus pencapaian misi bab ini. */
export const MISI_C: DefMisi<KeadaanK2Bab3>[] = [
  { id: "c-bola", teks: "Lepaskan bola di lereng. Seluruh permukaannya lengkung, jadi menggelinding.", wajib: true, cek: (k) => lereng(k) && k.ruang === "bola" && k.meluncur && k.gerak === "menggelinding" },
  { id: "c-tabung", teks: "Rebahkan tabung lalu lepaskan. Permukaan lengkung menyentuh lereng, jadi menggelinding.", wajib: true, cek: (k) => lereng(k) && k.ruang === "tabung" && k.posisi === "rebah" && k.meluncur && k.gerak === "menggelinding" },
  { id: "c-kerucut", teks: "Rebahkan kerucut lalu lepaskan. Ujungnya runcing, jadi geraknya melingkar.", wajib: true, cek: (k) => lereng(k) && k.ruang === "kerucut" && k.posisi === "rebah" && k.meluncur && k.gerak === "melingkar" },
  { id: "c-cetak-kubus", teks: "Di Lab Cetak, pilih kubus lalu tekan Cetak. Hasilnya segi empat yang sama sisinya.", wajib: true, cek: (k) => cetak(k) && k.ruang === "kubus" && k.dicetak && k.bentuk === "persegi" },
  { id: "c-skenario", teks: "Selesaikan skenario Toko Mainan Upe sampai adegan akhir.", wajib: true, cek: (k) => selesai(k, "toko-mainan") },
  { id: "c-kubus-diam", teks: "Lepaskan kubus di lereng. Permukaannya datar, jadi diam.", wajib: false, cek: (k) => lereng(k) && k.ruang === "kubus" && k.meluncur && k.gerak === "diam" },
  { id: "c-balok", teks: "Cetak sisi besar balok. Hasilnya segi empat yang sisinya berbeda.", wajib: false, cek: (k) => cetak(k) && k.ruang === "balok" && k.permukaan === "besar" && k.dicetak && k.bentuk === "persegiPanjang" },
  { id: "c-alas", teks: "Cetak alas tabung atau alas kerucut. Hasilnya lingkaran, bangun datar dari Sub-Bab A.", wajib: false, cek: (k) => cetak(k) && (k.ruang === "tabung" || k.ruang === "kerucut") && k.dicetak && k.bentuk === "lingkaran" },
];

export const daftarMisiK2Bab3 = (sub: string): DefMisi<KeadaanK2Bab3>[] => (sub === "B" ? MISI_B : sub === "C" ? MISI_C : MISI_A);
