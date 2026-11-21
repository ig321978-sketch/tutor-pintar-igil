/**
 * Data Infografis (rancangan bebas: PAPAN POTONG) Kelas 4 Bab 5 Sub-Bab B "Mosaik Pak Rudi": DUA kartu, tiap kartu satu layar tanpa gulir.
 * Kartu 1 = papan potong: DATA bersambung dari Sub-Bab A (Persegi, Jajargenjang, Trapesium, Segienam beraturan), tiap bangun digambar besar dengan garis belahnya, banyak segitiga tertutup sampai diketuk, ditambah segitiga sebagai bagian paling sederhana.
 * Persegi dan jajargenjang dibelah dari satu sudut menjadi 2 segitiga, trapesium dibelah dari satu titik di alas menjadi 3 segitiga, segienam beraturan dibelah dari titik tengah menjadi 6 segitiga (sama dengan banyak sisinya).
 * Semua banyak segitiga DIHITUNG dari koordinat. Kartu 2 = mosaik banyak cara: dua keping segitiga siku-siku yang sama disusun menjadi tiga bangun berbeda. Digital saja: suara dan kanvas hanya di CPA.
 * Diuji: scripts/uji-mosaik-k4b5b.mjs.
 */
import { BANGUN, beraturanN, belahSudut, belahTengah, namaBangun, panjangSisi, ucapkan as ucap, type Bidang } from "./logika-cpa";

/** Segitiga sama sisi: ketiga sisinya sama panjang (dihitung dari koordinat). */
const semuaSisiSama = (t: Bidang): boolean => panjangSisi(t).every((x) => Math.abs(x - panjangSisi(t)[0]) < 1e-6);

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
    suaraBanyak: ucapkan(`Hasilnya ${banyak} segitiga${k.bagian.every(semuaSisiSama) ? " sama sisi" : ""}.`),
  };
});

/** Segitiga sebagai bagian paling sederhana (kotak kelima Kartu 1): segitiga sama sisi, tidak bisa dibagi lagi dengan cara yang sama. */
export const SEGITIGA_INFO = {
  bidang: [[0, 0], [4, 0], [2, 4 * Math.sin(Math.PI / 3)]] as Bidang,
  teks: "bagian paling sederhana",
  suara: ucapkan("Segitiga adalah bagian paling sederhana, karena tiap bangun bisa dibagi menjadi segitiga."),
};

/** Kartu 2: dua keping segitiga siku-siku sama kaki yang SAMA, disusun dengan tiga cara. `hasil` dan nama bangun dihitung dari koordinat. */
const A: Bidang = [[0, 0], [3, 0], [0, 3]];
const SUSUN_SAMA: { keping: [Bidang, Bidang]; hasil: Bidang; sisi: string }[] = [
  { keping: [A, [[3, 0], [3, 3], [0, 3]]], hasil: [[0, 0], [3, 0], [3, 3], [0, 3]], sisi: "sisi miring" },
  { keping: [A, [[0, 0], [-3, 0], [0, 3]]], hasil: [[-3, 0], [3, 0], [0, 3]], sisi: "sisi tegak, dicerminkan" },
  { keping: [A, [[0, 3], [-3, 3], [0, 0]]], hasil: [[-3, 3], [0, 3], [3, 0], [0, 0]], sisi: "sisi tegak, diputar" },
];
export type SusunSama = { keping: [Bidang, Bidang]; hasil: Bidang; nama: string; suara: string };
export const SUSUNAN_SAMA: SusunSama[] = SUSUN_SAMA.map((s) => {
  const nama = namaBangun(s.hasil);
  return { keping: s.keping, hasil: s.hasil, nama, suara: ucapkan(`Dua keping yang sama dipasang pada ${s.sisi}, hasilnya ${nama}.`) };
});

export const PETUNJUK_INFO_1 = "Papan potong Pak Rudi. Tiap keramik sudah digaris belahannya. Ketuk kotak tanda tanya untuk melihat banyak segitiganya.";
export const PETUNJUK_INFO_2 = "Mosaik banyak cara. Dua keping yang sama bisa disusun dengan cara berbeda. Ketuk kotak tanda tanya untuk melihat bangunnya.";
export const SELESAI_INFO_1 = "Papan lengkap! Segienam beraturan punya enam sisi dan enam segitiga.";
export const PESAN_INFO_2 = "Tidak boleh ada celah dan tidak boleh ada tumpukan.";
