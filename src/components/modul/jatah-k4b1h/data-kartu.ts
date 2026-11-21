/**
 * Data Mind-map dan Infografis Kelas 4 Bab 1 Sub-Bab H "Papan Jatah Bu Ratna" (dirancang ulang, tanpa komponen kartu bersama).
 * Mind-map: papan tulis hijau Bu Ratna berisi pembagian bersusun 56 : 4 baris demi baris (pintu kamar, bagi puluhan, turun satuan, bagi lagi, periksa kali, sisa 59 : 4);
 * tiap baris papan punya label kosong berupa kertas tempel yang diketuk: judul langkah muncul dan dibacakan Guru.
 * Infografis: dua kartu dari angka Story. Kartu 1 = lorong kamar (56 : 4 = 14, 59 : 4 = 14 sisa 3 ke aula dari materi, 24 : 6 = 4 dari metode global), tamu digambar sebanyak hasil baginya;
 * kartu 2 = kartu periksa dan sisa (14 x 4 = 56, sisa 3 kurang dari 4, salah Satria 11 karena angka 6 lupa diturunkan). Digital saja.
 * Suara tanpa digit (kata bilangan dari logika-cpa.ts folder ini). Diuji: scripts/uji-visual-k4b1ghi.mjs.
 */
import { kata } from "./logika-cpa";

export type LangkahPeta = { judul: string; arti: string };

/** Enam langkah Mind-map: Equal Sharing, Long Division (puluhan, turun satuan, bagi lagi), periksa dengan kali, dan sisa. Arti dibacakan Guru (tanpa digit). */
export const LANGKAH_JATAH: LangkahPeta[] = [
  {
    judul: "Bagi tamu sama banyak",
    arti: "Langkah satu. Bagi tamu sama banyak ke tiap kamar. Lima puluh enam tamu dibagi ke empat kamar, ditulis lima puluh enam dibagi empat.",
  },
  {
    judul: "Bagi puluhan dulu",
    arti: "Langkah dua. Mulai dari puluhan. Lima dibagi empat sama dengan satu, sisa satu.",
  },
  {
    judul: "Turunkan, bagi lagi",
    arti: "Langkah tiga. Turunkan angka satuan di samping sisa. Angka enam turun, sisa satu menjadi enam belas. Enam belas dibagi empat sama dengan empat, jadi hasilnya empat belas tamu tiap kamar.",
  },
  {
    judul: "Periksa dengan kali",
    arti: "Langkah empat. Periksa dengan perkalian. Empat belas kali empat sama dengan lima puluh enam, sama dengan jumlah tamu, jadi pembagiannya benar.",
  },
  {
    judul: "Sisa kurang dari pembagi",
    arti: "Langkah lima. Kalau ada sisa, sisanya selalu lebih kecil daripada pembagi. Lima puluh sembilan dibagi empat, hasilnya empat belas sisa tiga.",
  },
];
/** Isi papan tulis tiap baris (dua baris tulisan kapur). Angka cocok dengan Story H. */
export const KAPUR_JATAH: [string, string][] = [
  ["56 : 4", "tamu ke 4 kamar"],
  ["5 : 4 = 1", "sisa 1"],
  ["16 : 4 = 4", "hasil 14"],
  ["14 × 4 = 56", "= jumlah tamu"],
  ["59 : 4 = 14", "sisa 3, ke aula"],
];
export const JUDUL_PETA_JATAH = "Papan Tulis Bu Ratna";
export const IKON_JUDUL_PETA_JATAH = "\u{1F6AA}";
export const PETUNJUK_PETA_JATAH = "Ketuk kertas tempel di samping tiap baris papan.";
export const SELESAI_PETA_JATAH = "Papan tulis penuh! Lima langkah sudah kamu buka.";

/* ------------------------------ Infografis kartu 1: lorong kamar ------------------------------ */
export type SelInfo = { label: string; isi: string; suara: string };
export type BarisKamar = { kunci: string; nama: string; wadah: string; dibagi: number; pembagi: number; hasil: number; sisa: number; sel: [SelInfo, SelInfo] };

const baris = (kunci: string, nama: string, wadah: string, benda: string, dibagi: number, pembagi: number): BarisKamar => {
  const hasil = Math.floor(dibagi / pembagi);
  const sisa = dibagi % pembagi;
  return {
    kunci,
    nama,
    wadah,
    dibagi,
    pembagi,
    hasil,
    sisa,
    sel: [
      { label: `Tiap ${wadah}`, isi: `${hasil}`, suara: `Tiap ${wadah} mendapat ${kata(hasil)} ${benda}, karena ${kata(dibagi)} dibagi ${kata(pembagi)} sama dengan ${kata(hasil)}.` },
      sisa === 0
        ? { label: "Sisa", isi: "0, habis", suara: "Sisanya nol, jadi semuanya habis terbagi." }
        : { label: "Sisa", isi: `${sisa}, ke aula`, suara: `Sisanya ${kata(sisa)}, karena ${kata(sisa)} lebih kecil daripada ${kata(pembagi)}. Mereka ditempatkan di aula.` },
    ],
  };
};
/** Tiga baris dari Story: 56 tamu ke 4 kamar, 59 tamu ke 4 kamar (sisa ke aula), dan 24 kartu ke 6 kotak (metode global). */
export const KAMAR_JATAH: BarisKamar[] = [baris("tamu", "56 tamu dibagi ke 4 kamar", "kamar", "tamu", 56, 4), baris("sisa", "59 tamu dibagi ke 4 kamar", "kamar", "tamu", 59, 4), baris("kartu", "24 kartu dibagi ke 6 kotak", "kotak", "kartu", 24, 6)];
export const JUDUL_LORONG_JATAH = "Lorong kamar";
export const PETUNJUK1_INFO_JATAH = "Ketuk tanda tanya untuk melihat hasil bagi dan sisa tiap kamar.";
export const SELESAI1_INFO_JATAH = "Lorong kamar lengkap! Hasil bagi tiap kamar dan sisanya sudah terbuka.";

/* ------------------------------ Infografis kartu 2: kartu periksa dan sisa ------------------------------ */
export type KotakPeriksa = { kunci: string; caption: string; isi: string; suara: string };
export const PERIKSA_JATAH: KotakPeriksa[] = [
  { kunci: "kali", caption: "Periksa: hasil bagi dikali pembagi", isi: "14 × 4 = 56", suara: "Empat belas dikali empat sama dengan lima puluh enam." },
  { kunci: "sama", caption: "Hasilnya harus sama dengan", isi: "56, jumlah tamu", suara: "Hasilnya harus sama dengan yang dibagi, yaitu lima puluh enam tamu." },
  { kunci: "sisa", caption: "Sisa dari 59 : 4 adalah", isi: "3 tamu", suara: "Lima puluh sembilan dibagi empat, hasilnya empat belas sisa tiga tamu." },
  { kunci: "kecil", caption: "Sisa harus lebih kecil dari", isi: "pembagi, yaitu 4", suara: "Sisa harus lebih kecil daripada pembagi, yaitu empat." },
  { kunci: "salah", caption: "Angka 6 lupa diturunkan jadi", isi: "11, keliru", suara: "Kalau angka enam lupa diturunkan, hasilnya hanya sebelas. Itu keliru, karena seharusnya empat belas." },
];
export const PETUNJUK2_INFO_JATAH = "Ketuk tanda tanya untuk melihat isi tiap kertas.";
export const SELESAI2_INFO_JATAH = "Kartu periksa lengkap! Selalu periksa dengan perkalian.";
