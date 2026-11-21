/**
 * Data Infografis (label kosong, papan diagram bazar) Kelas 4 Bab 6 Sub-Bab B "Diagram Batang Pak Dodi": DUA kartu, tiap kartu satu layar tanpa gulir.
 * Kartu 1 = diagram batang SUNGGUH dari data bersambung Sub-Bab A (jajanan Bu Rini pagi ini, satuan porsi, sumbu bertingkat lima): Risoles 30, Pisang goreng 20, Lemper 15, Es cincau 25, jumlah 90.
 * Tiap batang diberi label kosong "?" yang diketuk (banyaknya muncul dan dibacakan), dan tombol Putar mengubah diagram tegak menjadi mendatar dengan data yang sama.
 * Kartu 2 = kartu acuan membaca diagram: tingkat sumbu, telusuri garis, adu batang (selisih), jumlah, dan tegak atau mendatar sama datanya.
 * Semua gambar dan hitungan dari data (logika-data.ts). Digital saja: suara dan kanvas hanya di CPA. Diuji: scripts/uji-bazar-k4b6b.mjs.
 */
import { ucapkan as ucap } from "./logika-cpa";
import { garisBatang, jumlahBatang, selisihBatang, indeksTerbanyak, indeksTersedikit, type Diagram } from "./logika-data";

/** Ucapan tanpa digit yang diawali huruf kapital. */
const ucapkan = (t: string): string => {
  const u = ucap(t);
  return u.charAt(0).toUpperCase() + u.slice(1);
};

/** Data bersambung dari Sub-Bab A (kontrak data bab): skala satu ikon sama dengan lima porsi menjadi tingkat sumbu lima. */
export const DIAGRAM_RINI: Diagram = {
  id: "rini",
  judul: "Jajanan Bu Rini",
  satuan: "porsi",
  tingkat: 5,
  arah: "tegak",
  batang: [
    { nama: "Risoles", banyak: 30, ikon: "\u{1F95F}" },
    { nama: "Pisang goreng", banyak: 20, ikon: "\u{1F34C}" },
    { nama: "Lemper", banyak: 15, ikon: "\u{1F359}" },
    { nama: "Es cincau", banyak: 25, ikon: "\u{1F964}" },
  ],
};

export type BarisData = { nama: string; banyak: number; garis: number; suara: string };
export const BARIS_DATA: BarisData[] = DIAGRAM_RINI.batang.map((b, i) => ({
  nama: b.nama,
  banyak: b.banyak,
  garis: garisBatang(DIAGRAM_RINI, i),
  suara: ucapkan(`${b.nama}, batangnya berhenti di garis ke ${garisBatang(DIAGRAM_RINI, i)}, jadi ${b.banyak} ${DIAGRAM_RINI.satuan}.`),
}));
export const JUMLAH_RINI = jumlahBatang(DIAGRAM_RINI);
export const SELISIH_RINI = selisihBatang(DIAGRAM_RINI, indeksTerbanyak(DIAGRAM_RINI), indeksTersedikit(DIAGRAM_RINI));

/** Kartu 2: kartu acuan. Tiap baris: gambar, tulisan, dan ucapan (tanpa digit). */
export type BarisAcuan = { ikon: string; teks: string; suara: string };
export const KARTU_ACUAN: BarisAcuan[] = [
  { ikon: "\u{1F4CF}", teks: "sumbu naik 5 porsi tiap garis", suara: ucapkan("Periksa dulu tingkat sumbu. Pada diagram ini, sumbu naik 5 porsi tiap garis.") },
  { ikon: "\u{1F50D}", teks: "tarik garis dari ujung batang", suara: ucapkan("Telusuri garis dari ujung batang sampai bertemu angka pada sumbu.") },
  { ikon: "\u{1F94A}", teks: "adu: 30 - 15 = 15 porsi", suara: ucapkan(`Adu batang risoles dan lemper. Selisihnya ${DIAGRAM_RINI.batang[0].banyak} dikurangi ${DIAGRAM_RINI.batang[2].banyak} sama dengan ${SELISIH_RINI} porsi.`) },
  { ikon: "\u{2795}", teks: "jumlah semua: 90 porsi", suara: ucapkan(`Jumlah semua batang adalah ${DIAGRAM_RINI.batang.map((b) => b.banyak).join(" ditambah ")} sama dengan ${JUMLAH_RINI} porsi.`) },
  { ikon: "\u{1F504}", teks: "tegak atau mendatar: data sama", suara: ucapkan("Diagram tegak dan diagram mendatar menyatakan data yang sama, hanya arah bacanya yang berbeda.") },
];

export const JUDUL_INFO = "Papan Data Bazar";
export const PETUNJUK_INFO_1 = "Diagram batang jajanan Bu Rini. Ketuk tanda tanya di tiap batang untuk melihat banyaknya, lalu tekan Putar untuk mengubah arahnya.";
export const PETUNJUK_INFO_2 = "Kartu acuan membaca diagram batang. Ketuk tiap baris untuk mendengarnya.";
export const SELESAI_INFO_1 = "Diagram lengkap! Putar pun datanya sama, jumlahnya sembilan puluh porsi.";
export const PESAN_INFO_2 = "Periksa tingkat sumbu lebih dulu, lalu telusuri garis.";
export const PESAN_BELUM_PUTAR = "Tekan Putar untuk melihat diagram mendatar.";
