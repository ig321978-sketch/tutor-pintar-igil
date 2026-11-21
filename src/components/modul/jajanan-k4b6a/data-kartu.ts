/**
 * Data Mind-map dan Infografis Kelas 4 Bab 6 Sub-Bab A "Piktogram Jajanan Bu Rini" (komponen milik Sub-Bab ini, bukan PetaLabel/InfoKartu).
 * Mind-map = tenda jajanan Bu Rini: awning dan lima baris papan, tiap baris punya label kosong; diketuk, judul langkah muncul dan dibacakan Guru.
 * Infografis = dua kartu. Kartu 1 = papan data bazar: tabel DATA jajanan dari cerita (gambar + kata, ikon digambar sungguh sebanyak data, banyak porsi, dan baris jumlah);
 * judul kolom tampil, isi sel kosong sampai diketuk. Kartu 2 = kartu acuan: skala satu dan skala lima untuk data yang sama, paling banyak dan paling sedikit, selisih, dan jumlah.
 * Kontrak data bersambung ke Sub-Bab B: risoles 30, pisang goreng 20, lemper 15, es cincau 25 porsi; satu ikon sama dengan lima porsi; jumlah 90 porsi.
 * Semua angka SELALU dihitung dari data lewat logika-data.ts. Suara tanpa digit. Diuji: scripts/uji-jajanan-k4b6a.mjs.
 */
import { ejaK4B6 } from "../eja-k4b6";
import { banyakIkon, indeksMaks, indeksMin, jumlahData, jumlahIkon, pik, selisihData, selisihIkon } from "./logika-data";

export type LangkahPeta = { judul: string; arti: string; ikon: string };

/** Lima langkah Mind-map: membaca keterangan, menghitung dan mengalikan, menggambar dari tabel, paling banyak dan paling sedikit, selisih dan jumlah. Arti dibacakan Guru (tanpa digit). */
export const LANGKAH_JAJANAN: LangkahPeta[] = [
  {
    judul: "Baca keterangan",
    arti: "Langkah satu. Baca keterangan di pojok papan lebih dulu. Keterangan memberi tahu berapa banyak yang diwakili satu ikon, bisa satu atau lebih dari satu.",
    ikon: "\u{1F50D}",
  },
  {
    judul: "Hitung lalu kalikan",
    arti: "Langkah dua. Hitung ikon pada tiap baris, lalu kalikan dengan keterangan untuk mendapat banyak data. Satuannya ikut ditulis.",
    ikon: "\u{1F522}",
  },
  {
    judul: "Gambar dari tabel",
    arti: "Langkah tiga. Untuk menggambar dari tabel, bagi banyak data dengan keterangan. Hasilnya banyak ikon, dan data harus habis dibagi.",
    ikon: "\u{1F4CB}",
  },
  {
    judul: "Paling banyak dan sedikit",
    arti: "Langkah empat. Bandingkan banyak ikon tiap baris. Ikon paling banyak berarti data paling banyak, dan ikon paling sedikit berarti data paling sedikit.",
    ikon: "\u{1F3C6}",
  },
  {
    judul: "Selisih dan jumlah",
    arti: "Langkah lima. Selisih dicari dengan mengurangkan ikon dua baris, lalu mengalikannya dengan keterangan. Jumlah dicari dengan menjumlah semua ikon, lalu mengalikannya dengan keterangan.",
    ikon: "\u{2795}",
  },
];
export const JUDUL_PETA_JAJANAN = "Tenda Bu Rini";
export const IKON_JUDUL_PETA_JAJANAN = "\u{1F362}";
export const PETUNJUK_PETA_JAJANAN = "Tenda jajanan Bu Rini. Ketuk tanda tanya di tiap baris papan untuk melihat langkahnya.";
export const SELESAI_PETA_JAJANAN = "Papan tenda penuh! Lima langkah sudah kamu buka.";

/** Data Story yang bersambung ke Sub-Bab B. */
export const DATA_INFO = pik("Jajanan Bu Rini pagi ini", "porsi", 5, [
  ["Risoles", "\u{1F950}", 30],
  ["Pisang goreng", "\u{1F34C}", 20],
  ["Lemper", "\u{1F359}", 15],
  ["Es cincau", "\u{1F964}", 25],
]);
export const KOLOM_INFO_JAJANAN = ["Jajanan", "Ikon", "Porsi"];
export const ikonInfo = (i: number): number => banyakIkon(DATA_INFO, i);
export const porsiInfo = (i: number): number => DATA_INFO.seri[i].banyak;
export const jumlahIkonInfo = (): number => jumlahIkon(DATA_INFO);
export const jumlahPorsiInfo = (): number => jumlahData(DATA_INFO);

/** Suara satu sel tabel (tanpa digit): angka dieja. kol 0 = jajanan, 1 = ikon, 2 = porsi. */
export function suaraSel(i: number, kol: 0 | 1 | 2): string {
  const nama = DATA_INFO.seri[i].nama.toLowerCase();
  return kol === 0
    ? `Inilah jajanan ${nama}.`
    : kol === 1
      ? ejaK4B6(`Ikon ${nama} ada ${ikonInfo(i)}, dan tiap ikon mewakili ${DATA_INFO.skala} porsi.`)
      : ejaK4B6(`${nama.charAt(0).toUpperCase()}${nama.slice(1)} terjual ${porsiInfo(i)} porsi, karena ${ikonInfo(i)} kali ${DATA_INFO.skala} sama dengan ${porsiInfo(i)}.`);
}
/** Suara baris jumlah. */
export function suaraJumlah(kol: 0 | 1 | 2): string {
  return kol === 0
    ? "Ini jumlah semuanya."
    : kol === 1
      ? ejaK4B6(`Seluruh ikon ada ${jumlahIkonInfo()}.`)
      : ejaK4B6(`Jumlahnya ${jumlahPorsiInfo()} porsi, karena ${jumlahIkonInfo()} kali ${DATA_INFO.skala} sama dengan ${jumlahPorsiInfo()}.`);
}

export const PETUNJUK1_INFO_JAJANAN = "Papan data bazar. Ketuk tanda tanya di tiap kotak untuk melihat isinya.";
export const PETUNJUK2_INFO_JAJANAN = "Kartu acuan. Ketuk kalimat hijau untuk mendengar cara membaca piktogram.";
export const SELESAI1_INFO_JAJANAN = "Papan lengkap! Ikon dikali keterangan sama dengan banyak porsi.";
export const PESAN2_INFO_JAJANAN = "Ketuk kalimat hijau untuk mendengarnya.";

/** Data lemper dengan keterangan satu ikon sama dengan satu porsi (skala satu) dan lima porsi (skala lebih dari satu): data sama, ikon berbeda. */
export const LEMPER_I = 2;
export const IKON_LEMPER_SKALA_SATU = (): number => DATA_INFO.seri[LEMPER_I].banyak;
export const IKON_LEMPER_SKALA_LIMA = (): number => ikonInfo(LEMPER_I);

/** Kartu acuan: enam kalimat, mencakup skala satu, skala lima, gambar dari tabel, banyak data, paling banyak dan paling sedikit, selisih, dan jumlah. */
export function kalimatAcuan(): { teks: string; suara: string }[] {
  const mx = indeksMaks(DATA_INFO);
  const mn = indeksMin(DATA_INFO);
  const d = DATA_INFO;
  return [
    {
      teks: `Skala satu: ${IKON_LEMPER_SKALA_SATU()} ikon lemper = ${d.seri[LEMPER_I].banyak} porsi`,
      suara: ejaK4B6(`Kalau satu ikon mewakili satu porsi, lemper perlu ${IKON_LEMPER_SKALA_SATU()} ikon untuk ${d.seri[LEMPER_I].banyak} porsi.`),
    },
    {
      teks: `Skala lima: ${IKON_LEMPER_SKALA_LIMA()} ikon × ${d.skala} = ${d.seri[LEMPER_I].banyak} porsi`,
      suara: ejaK4B6(`Kalau satu ikon mewakili ${d.skala} porsi, lemper cukup ${IKON_LEMPER_SKALA_LIMA()} ikon. Lebih ringkas, dan hasilnya sama.`),
    },
    {
      teks: `Dari tabel: ${d.seri[LEMPER_I].banyak} : ${d.skala} = ${IKON_LEMPER_SKALA_LIMA()} ikon`,
      suara: ejaK4B6(`Menggambar dari tabel: ${d.seri[LEMPER_I].banyak} porsi dibagi ${d.skala} sama dengan ${IKON_LEMPER_SKALA_LIMA()} ikon. Jadi banyak data dibagi keterangan sama dengan banyak ikon.`),
    },
    {
      teks: `Paling banyak: ${d.seri[mx].nama.toLowerCase()}. Paling sedikit: ${d.seri[mn].nama.toLowerCase()}`,
      suara: `Ikon paling banyak dimiliki ${d.seri[mx].nama.toLowerCase()}, jadi paling laris. Ikon paling sedikit dimiliki ${d.seri[mn].nama.toLowerCase()}.`,
    },
    {
      teks: `Selisih: ${selisihIkon(d, mx, mn)} ikon × ${d.skala} = ${selisihData(d, mx, mn)} porsi`,
      suara: ejaK4B6(`Selisih ${d.seri[mx].nama.toLowerCase()} dan ${d.seri[mn].nama.toLowerCase()} adalah ${selisihIkon(d, mx, mn)} ikon, yaitu ${selisihData(d, mx, mn)} porsi.`),
    },
    {
      teks: `Jumlah: ${jumlahIkon(d)} ikon × ${d.skala} = ${jumlahData(d)} porsi`,
      suara: ejaK4B6(`Jumlah semua ikon ${jumlahIkon(d)}, dikali ${d.skala} sama dengan ${jumlahData(d)} porsi.`),
    },
  ];
}
