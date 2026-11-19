/**
 * Data Simulasi Gudang Timbang Kelas 3 Bab 3 Sub-Bab C "Pakan Bu Lastri" (mengukur berat dengan satuan baku), tema Kebun Binatang Mini.
 * Berat dan benda berbeda dari Story (wortel 250 g, karung pakan 4 kg, pakan beo 100 g dan 500 g, kantong jagung 500 g, biji 200 g, sepuluh kantong gula, karung 11 kg,
 * layar 10 g, pakan 150 g, jarum di 1) dan dari tugas CPA. Mind-map dan Infografis memakai data kartu (data-kartu.ts). Diuji: scripts/uji-timbang-k3b3c.mjs.
 */
export type SatuanBerat = "g" | "kg";
export type AlatTimbang = "digital" | "duduk";

/** Awal timbangan: jarum timbangan duduk menunjuk 3 (kg) dan layar timbangan digital menunjuk 40 (g); keduanya belum di nol. */
export const JARUM_AWAL = 3;
export const LAYAR_AWAL = 40;
/** Jarum berputar 0 sampai 9 (kg); layar bergeser per 10 g sampai 90 g. */
export const JARUM_MAKS = 9;
export const LAYAR_LANGKAH = 10;
export const LAYAR_MAKS = 90;

/** Menimbang: benda dengan timbangan yang cocok dan beratnya. Timbangan harus di nol dulu. */
export type TargetTimbang = { benda: string; emoji: string; alat: AlatTimbang; angka: number; satuan: SatuanBerat };
export const TARGET_TIMBANG: readonly TargetTimbang[] = [
  { benda: "apel", emoji: "\u{1F34E}", alat: "digital", angka: 180, satuan: "g" },
  { benda: "karung jagung", emoji: "\u{1F6CD}\u{FE0F}", alat: "duduk", angka: 6, satuan: "kg" },
  { benda: "kaleng pakan", emoji: "\u{1F96B}", alat: "digital", angka: 450, satuan: "g" },
  { benda: "keranjang apel", emoji: "\u{1F9FA}", alat: "duduk", angka: 3, satuan: "kg" },
];

/** Memilih timbangan: tiga jenis timbangan, dan satuan g atau kg. */
export type JenisTimbang = "digital" | "duduk" | "badan";
export const NAMA_JENIS: readonly string[] = ["timbangan digital", "timbangan duduk", "timbangan badan"];
export const JENIS: readonly JenisTimbang[] = ["digital", "duduk", "badan"];
export type TargetPilih = { benda: string; emoji: string; jenis: JenisTimbang; satuan: SatuanBerat };
export const TARGET_PILIH: readonly TargetPilih[] = [
  { benda: "sebuah pensil", emoji: "\u{270F}\u{FE0F}", jenis: "digital", satuan: "g" },
  { benda: "sekarung jagung", emoji: "\u{1F6CD}\u{FE0F}", jenis: "duduk", satuan: "kg" },
  { benda: "seekor anak rusa", emoji: "\u{1F98C}", jenis: "badan", satuan: "kg" },
  { benda: "sebuah apel", emoji: "\u{1F34E}", jenis: "digital", satuan: "g" },
];

/** Selisih dua berat: yang berat dikurangi yang ringan. */
export type TargetSelisih = { na: string; wa: number; nb: string; wb: number; satuan: SatuanBerat };
export const TARGET_SELISIH: readonly TargetSelisih[] = [
  { na: "keranjang apel", wa: 9, nb: "keranjang jagung", wb: 3, satuan: "kg" },
  { na: "kantong biji", wa: 780, nb: "kantong dedak", wb: 230, satuan: "g" },
  { na: "karung wortel", wa: 7, nb: "karung kentang", wb: 2, satuan: "kg" },
];

export const MISI_TIMBANG_TEKS = "Setel timbangan ke nol, letakkan benda, baca beratnya, pilih timbangan, lalu cari selisih dua berat. Urutannya bebas.";
