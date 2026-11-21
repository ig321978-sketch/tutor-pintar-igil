/**
 * Data Mind-map (pola label kosong) Kelas 4 Bab 5 Sub-Bab B "Mosaik Pak Rudi": gambar MEJA KERJA Pak Rudi dengan sebuah mosaik dari keping bangun sungguhan (dari koordinat) dan tiga label kosong yang menempel pada bagian mosaik yang diketuk, satu untuk tiap metode.
 * Isi = LANGKAH rangkuman semua metode Sub-Bab B (Pasang Keping, Bagi Jadi Segitiga, dan Mosaik Banyak Cara).
 * Diuji: scripts/uji-mosaik-k4b5b.mjs.
 */
import { beraturan, belahTengah, SUSUNAN, type Bidang } from "./logika-cpa";

export type LangkahPeta = { judul: string; arti: string; ikon: string };

export const LANGKAH_MOSAIK: LangkahPeta[] = [
  { judul: "Pasang keping", arti: "Langkah satu. Pertemukan sisi yang sama panjang dari dua keping, tanpa celah dan tanpa tumpukan, lalu lihat bangun baru yang lahir.", ikon: "\u{1F9E9}" },
  { judul: "Bagi jadi segitiga", arti: "Langkah dua. Tarik garis dari titik tengah ke tiap sudut, atau dari satu sudut ke sudut yang tidak bersebelahan, sampai bangun terbagi menjadi segitiga.", ikon: "\u{1F53A}" },
  { judul: "Mosaik banyak cara", arti: "Langkah tiga. Satu bangun bisa disusun dengan banyak cara, dan hasilnya tetap sama besar. Periksa bahwa tidak ada celah.", ikon: "\u{1F3A8}" },
];

export const JUDUL_PETA = "Tangga Mosaik Pak Rudi";
export const IKON_JUDUL_PETA = "\u{1F9E9}";
export const PETUNJUK_PETA = "Tangga mosaik Pak Rudi. Ketuk tanda tanya di tiap anak tangga untuk melihat langkahnya.";
export const SELESAI_PETA = "Tangga mosaik rapi! Tiga langkah sudah kamu buka.";

/**
 * Bagian mosaik di meja kerja (koordinat sungguhan): (1) dua keping segitiga siku-siku yang akan dipasang menjadi persegi, (2) segienam beraturan yang dibelah dari titik tengah menjadi enam segitiga,
 * (3) deret tiga segitiga sama sisi (dua menghadap atas, satu menghadap bawah) yang menyusun sebuah trapesium. Semua dipakai oleh PetaMosaik dan diuji.
 */
export const MEJA = {
  keping: SUSUNAN.persegi.keping as [Bidang, Bidang],
  segienam: beraturan(6, 1),
  deret: (() => {
    const s = 2;
    const h = s * Math.sin(Math.PI / 3);
    return [
      [[0, h], [s, h], [s / 2, 0]],
      [[s / 2, 0], [(3 * s) / 2, 0], [s, h]],
      [[s, h], [2 * s, h], [(3 * s) / 2, 0]],
    ] as Bidang[];
  })(),
};
export const BELAHAN_SEGIENAM: Bidang[] = belahTengah(MEJA.segienam);
/** Titik sudut trapesium hasil deret segitiga (urut berputar). */
export const HASIL_DERET: Bidang = (() => {
  const s = 2;
  const h = s * Math.sin(Math.PI / 3);
  return [[0, h], [2 * s, h], [(3 * s) / 2, 0], [s / 2, 0]];
})();
