/**
 * Data Infografis (pola label kosong) Kelas 4 Bab 5 Sub-Bab B "Mosaik Pak Rudi": DUA kartu, tiap kartu satu layar tanpa gulir.
 * Kartu 1 = tabel DATA bersambung dari Sub-Bab A (Persegi, Jajargenjang, Trapesium, Segienam beraturan): kolom Keramik (gambar), Dibelah, dan Segitiga.
 * Persegi dan jajargenjang dibelah dari satu sudut menjadi 2 segitiga, trapesium dibelah dari satu titik di alas menjadi 3 segitiga, segienam beraturan dibelah dari titik tengah menjadi 6 segitiga (sama dengan banyak sisinya).
 * Semua banyak segitiga DIHITUNG dari koordinat. Kartu 2 = kartu acuan. Digital saja: suara dan kanvas hanya di CPA.
 * Diuji: scripts/uji-mosaik-k4b5b.mjs.
 */
import { BANGUN, beraturanN, belahSudut, belahTengah, ucapkan as ucap, type Bidang } from "./logika-cpa";

/** Ucapan tanpa digit yang diawali huruf kapital. */
const ucapkan = (t: string): string => {
  const u = ucap(t);
  return u.charAt(0).toUpperCase() + u.slice(1);
};

/** Trapesium dibelah dari satu titik di tengah alas ke dua sudut atas: tiga segitiga. */
const belahAlas = (p: Bidang): Bidang[] => {
  const m: [number, number] = [(p[0][0] + p[1][0]) / 2, 0];
  return [[p[0], m, p[3]], [m, p[1], p[2]], [m, p[2], p[3]]];
};

export type KeramikInfo = { nama: string; bidang: Bidang; bagian: Bidang[]; cara: string };
export const KERAMIK_INFO: KeramikInfo[] = [
  { nama: "Persegi", bidang: BANGUN.persegi, bagian: belahSudut(BANGUN.persegi), cara: "dari sudut" },
  { nama: "Jajargenjang", bidang: BANGUN.jajargenjang, bagian: belahSudut(BANGUN.jajargenjang), cara: "dari sudut" },
  { nama: "Trapesium", bidang: BANGUN.trapesium, bagian: belahAlas(BANGUN.trapesium), cara: "dari alas" },
  { nama: "Segienam beraturan", bidang: beraturanN(6), bagian: belahTengah(beraturanN(6)), cara: "dari tengah" },
];

export const KOLOM_INFO = ["Keramik", "Dibelah", "Segitiga"];
export const GRID_INFO = "grid-cols-[5.6rem_1fr_1fr]";

export type BarisData = { nama: string; cara: string; banyak: number; banyakTeks: string; suaraNama: string; suaraCara: string; suaraBanyak: string };
export const BARIS_DATA: BarisData[] = KERAMIK_INFO.map((k) => {
  const banyak = k.bagian.length;
  return {
    nama: k.nama,
    cara: k.cara,
    banyak,
    banyakTeks: `${banyak} segitiga`,
    suaraNama: `${k.nama}.`,
    suaraCara: ucapkan(k.cara === "dari tengah" ? `${k.nama} dibelah dari titik tengah ke tiap sudut.` : k.cara === "dari alas" ? `${k.nama} dibelah dari satu titik di alas ke dua sudut atas.` : `${k.nama} dibelah dari satu sudut ke sudut yang berseberangan.`),
    suaraBanyak: ucapkan(`Hasilnya ${banyak} segitiga.`),
  };
});

/** Kartu 2: kartu acuan. Tiap baris: gambar, tulisan, dan ucapan (tanpa digit). */
export type BarisAcuan = { ikon: string; teks: string; suara: string };
export const KARTU_ACUAN: BarisAcuan[] = [
  { ikon: "\u{1F53A}", teks: "dari tengah: segitiga = sisi", suara: ucapkan("Dari titik tengah, banyak segitiga sama dengan banyak sisi bangun beraturan.") },
  { ikon: "\u{1F4D0}", teks: "dari sudut: sisi - 2", suara: ucapkan("Dari satu sudut, banyak segitiga adalah banyak sisi dikurangi dua.") },
  { ikon: "\u{1F9E9}", teks: "2 segitiga = persegi", suara: ucapkan("Dua segitiga siku-siku sama besar, dipasang pada sisi miring, menjadi sebuah persegi.") },
  { ikon: "\u{1F3A8}", teks: "satu bentuk, banyak cara", suara: ucapkan("Satu bentuk bisa disusun dengan banyak cara, dan tidak boleh ada celah.") },
];

export const PETUNJUK_INFO_1 = "Tabel keramik Pak Rudi. Bentuknya dari Sub-Bab sebelumnya. Ketuk tanda tanya di tiap kotak untuk melihat isinya.";
export const PETUNJUK_INFO_2 = "Kartu acuan. Ketuk tiap baris untuk mendengarnya.";
export const SELESAI_INFO_1 = "Tabel lengkap! Segienam beraturan punya enam sisi dan enam segitiga.";
export const PESAN_INFO_2 = "Tidak boleh ada celah dan tidak boleh ada tumpukan.";
