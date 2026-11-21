/**
 * Data Mind-map dan Infografis Kelas 5 Bab 2 Sub-Bab A "Lonceng Bu Marni" (komponen milik Sub-Bab ini, bukan PetaLabel/InfoKartu).
 * Mind-map = stan wedang Bu Marni dengan tali lonceng bersimpul: lima lonceng label kosong digantung sepanjang tali; diketuk, judul langkah muncul dan dibacakan Guru.
 * Infografis = dua kartu. Kartu 1 = pita jadwal lonceng: lonceng wedang tiap empat menit (empat sampai tiga puluh enam, sembilan bunyi) dan lonceng bakso tiap enam menit
 * (enam sampai tiga puluh enam, enam bunyi), tiap kotak (?) memuat kelipatan dan asalnya (bilangan bulat dikali empat atau enam), ditambah kotak nol (nol bukan kelipatan).
 * Kartu 2 = tabel bilangan satu sampai tiga puluh enam (enam kolom) yang diwarnai lewat dua kotak warna (kelipatan empat, kelipatan enam), ditambah tiga kotak cek dengan pembagian.
 * Kontrak data bersambung ke Sub-Bab B dan seterusnya: lonceng wedang tiap 4 menit, lonceng bakso tiap 6 menit. Semua angka SELALU dihitung dari bilangan lewat logika-data.ts. Suara tanpa digit.
 * Diuji: scripts/uji-lonceng-k5b2a.mjs.
 */
import { ejaK5B1 } from "../eja-k5b1";
import { adalahKelipatan, daftarKelipatan, hasilBagi, kata, sisaBagi } from "./logika-data";

export type LangkahPeta = { judul: string; arti: string; ikon: string };

/** Lima langkah Mind-map: lompat sama jarak, tulis hasil kali, jangan pakai nol, warnai tabel, cek dengan bagi. Arti dibacakan Guru (tanpa digit). */
export const LANGKAH_LONCENG: LangkahPeta[] = [
  {
    judul: "Lompat sama jarak",
    arti: "Langkah satu. Lompat sama jarak. Mulai dari bilangan itu sendiri, lalu tambahkan bilangan yang sama terus-menerus. Tiap pendaratan adalah satu kelipatan.",
    ikon: "\u{1F463}",
  },
  {
    judul: "Tulis hasil kali",
    arti: "Langkah dua. Tulis hasil kali. Kelipatan adalah bilangan bulat dikali bilangan itu: satu kali, dua kali, tiga kali, dan seterusnya.",
    ikon: "✖️",
  },
  {
    judul: "Jangan pakai nol",
    arti: "Langkah tiga. Jangan pakai nol. Nol dikali berapa pun hasilnya nol, tetapi nol bukan kelipatan, jadi daftar tidak dimulai dari nol.",
    ikon: "\u{1F6AB}",
  },
  {
    judul: "Warnai tabel",
    arti: "Langkah empat. Warnai tabel. Tulis bilangan satu sampai seratus di tabel, lalu warnai tiap kelipatan supaya semuanya terlihat dan tidak ada yang tertinggal.",
    ikon: "\u{1F3A8}",
  },
  {
    judul: "Cek dengan bagi",
    arti: "Langkah lima. Cek dengan bagi. Bagi bilangan itu. Kalau habis tanpa sisa, bilangan itu kelipatan. Kalau bersisa, bukan kelipatan.",
    ikon: "➗",
  },
];
export const JUDUL_PETA_LONCENG = "Tali Lonceng Bu Marni";
export const IKON_JUDUL_PETA_LONCENG = "\u{1F514}";
export const PETUNJUK_PETA_LONCENG = "Stan wedang Bu Marni. Ketuk lonceng kosong di tali untuk melihat langkahnya.";
export const SELESAI_PETA_LONCENG = "Tali penuh! Lima langkah sudah kamu buka.";

/** Data Story yang bersambung ke Sub-Bab B dan seterusnya (satuan menit). */
export const SATUAN_INFO = "menit";
export const B_WEDANG = 4;
export const B_BAKSO = 6;
export const SAMPAI_INFO = 36;
export const kelipatanWedang: number[] = daftarKelipatan(B_WEDANG, SAMPAI_INFO);
export const kelipatanBakso: number[] = daftarKelipatan(B_BAKSO, SAMPAI_INFO);

/** Suara satu kotak pita (tanpa digit). `baris` 4 = wedang, 6 = bakso. */
export function suaraBunyi(b: number, i: number): string {
  const nama = b === B_WEDANG ? "wedang jahe Bu Marni" : "bakso Pak Tarno";
  return ejaK5B1(`Bunyi ke ${i} lonceng ${nama} jatuh pada menit ke ${b * i}, karena ${i} × ${b} = ${b * i}. Tiap bunyi menambah ${b} menit.`);
}
export const suaraNol = "Nol kali empat hasilnya nol, tetapi nol bukan kelipatan empat. Jadi daftar kelipatan tidak dimulai dari nol, melainkan dari empat.";

export const PETUNJUK1_INFO_LONCENG = "Pita jadwal lonceng. Ketuk tanda tanya di tiap kotak untuk melihat bunyinya.";
export const PETUNJUK2_INFO_LONCENG = "Tabel bilangan. Ketuk tanda tanya untuk mewarnai kelipatan dan untuk memeriksa dengan bagi.";
export const SELESAI1_INFO_LONCENG = "Pita lengkap! Tiap bunyi adalah bilangan bulat dikali jaraknya, dan nol tidak ikut.";
export const SELESAI2_INFO_LONCENG = "Tabel lengkap! Kelipatan terlihat semua, dan pembagian habis tanpa sisa menjadi pemeriksanya.";

/** Tabel bilangan kartu 2: satu sampai tiga puluh enam, enam kolom. */
export const KOLOM_INFO = 6;
export const selInfo: number[] = Array.from({ length: SAMPAI_INFO }, (_, i) => i + 1);

/** Kotak warna kartu 2: bilangan pengali dan banyak bilangan berwarna. */
export const KOTAK_WARNA = [
  { kunci: "w4", b: B_WEDANG, label: "warna 4" },
  { kunci: "w6", b: B_BAKSO, label: "warna 6" },
] as const;
export const banyakWarna = (b: number): number => daftarKelipatan(b, SAMPAI_INFO).length;
export function suaraWarna(b: number): string {
  return ejaK5B1(`Kelipatan ${b} diwarnai: ${daftarKelipatan(b, SAMPAI_INFO).join(", ")}. Jadi ada ${banyakWarna(b)} bilangan berwarna sampai ${SAMPAI_INFO}.`);
}

/** Tiga kotak cek dengan bagi: n dibagi b. */
export const KOTAK_CEK = [
  { kunci: "c1", n: 36, b: 4 },
  { kunci: "c2", n: 14, b: 4 },
  { kunci: "c3", n: 36, b: 6 },
] as const;
export const teksCek = (n: number, b: number): string => (sisaBagi(n, b) === 0 ? `${hasilBagi(n, b)}, habis` : `${hasilBagi(n, b)} sisa ${sisaBagi(n, b)}`);
export function suaraCek(n: number, b: number): string {
  return adalahKelipatan(n, b)
    ? ejaK5B1(`${n} dibagi ${b} sama dengan ${hasilBagi(n, b)} dan habis tanpa sisa, jadi ${n} adalah kelipatan ${b}.`)
    : ejaK5B1(`${n} dibagi ${b} sama dengan ${hasilBagi(n, b)} dan bersisa ${sisaBagi(n, b)}, jadi ${n} bukan kelipatan ${b}. Angka empat di dalam ${n} tidak menentukan apa pun.`);
}
export const teksKataBil = (n: number): string => kata(n);
