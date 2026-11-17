import type { AdeganStory, Obj } from "./logika-story";
import { E, W, baris, bicara, deretMainan, emo, garis, judul, kado, kartu, orang, papanRak, teks, type Titik } from "./k1b1b-gambar";
import { hapus, hitungMainan, k, pasangAksi, sorotkan, tambah, ubah } from "./k1b1b-bantu";

/*
 * Cerita orisinal IGIL "Hadiah Nenek untuk Rak yang Lebih Sedikit" (Kelas 1 Bab 1 Sub-Bab B, membandingkan banyak benda),
 * lanjutan "Merapikan Lemari Mainan Igil". Tokoh: Igil, Kaka, Abang, Mamah. Masalah: hadiah Nenek hanya untuk rak yang
 * isinya lebih sedikit, dan Kaka tertipu barisan bonekanya yang rapat dan pendek.
 * Penyelesaian: memasangkan satu-satu, melihat yang bersisa, menghitung lalu membandingkan angkanya.
 */

/** Barisan utama: lima mobil Igil renggang (panjang) dan enam boneka Kaka rapat (pendek). Titik = pusat gambar emoji. */
export const MOBIL: Titik[] = baris(5, 64, 50, 76);
export const BONEKA: Titik[] = baris(6, 95, 22, 150);
const pusat = (p: Titik): Titik => ({ x: p.x, y: p.y - 8 });
const rakDua = (): Obj[] => [...papanRak("pa", 14, 54, 272, "Rak Igil"), ...papanRak("pb", 14, 126, 272, "Rak Kaka")];

/* ------------------------------ 1. Hadiah dari Nenek ------------------------------ */
const SUARA_H1 = "Lemari Igil sudah rapi. Ding dong! Kotak hadiah dari Nenek datang.";
const SUARA_H2 = "Ada surat dari Nenek. Hadiah ini untuk rak yang isinya lebih sedikit.";
const SUARA_H3 = "Kaka berseru, barisan bonekaku pendek, jadi bonekaku lebih sedikit. Hadiah untukku! Igil sedih.";

export const ADEGAN_HADIAH: AdeganStory = {
  id: "hadiah-nenek",
  judul: "Hadiah dari Nenek",
  sumber: "Materi: masalah hadiah untuk rak",
  latar: "#FEF3C7",
  ketukan: [
    k(
      SUARA_H1,
      tambah(0, judul("Hadiah dari Nenek"), ...papanRak("ra", 14, 40, 130, "Rak Igil"), ...papanRak("rb", 156, 40, 130, "Rak Kaka")),
      tambah(0, ...deretMainan(E.mobil, "ma", baris(5, 30, 24, 68), 16), ...deretMainan(E.boneka, "ba", baris(6, 178, 13, 68), 14)),
      tambah("Ding", teks("dd", 150, 112, "Ding dong!", 12, W.merah)),
      tambah("Kotak", kado("kd", 150, 160, 40), ...orang("ig", 40, 176, E.igil, "Igil"), ...orang("kk", 260, 176, E.kaka, "Kaka")),
    ),
    k(
      SUARA_H2,
      hapus(0, "dd"),
      tambah("surat", emo("srt", 108, 112, E.surat, 22), emo("nn", 200, 112, E.nenek, 24)),
      tambah("Hadiah", ...kartu("ps", 66, 118, 168, 24, W.krem, ["untuk rak yang lebih sedikit"], 8.8)),
      sorotkan("sedikit.", "ps-k"),
    ),
    k(
      SUARA_H3,
      hapus(0, "srt", "nn", "ps-k", "ps-t0"),
      tambah("berseru,", ...bicara("kkb", 150, 100, 134, "Hadiah untukku!", W.pink)),
      sorotkan("pendek,", "rb"),
      tambah("sedih.", emo("sd", 76, 150, E.sedih, 20)),
    ),
  ],
};

/* ------------------------------ 2. Barisan panjang, barisan pendek ------------------------------ */
const SUARA_B1 = "Lihat rak Igil. Lima mobil berjajar renggang, barisannya panjang.";
const SUARA_B2 = "Rak Kaka berisi enam boneka yang rapat, barisannya pendek.";
const SUARA_B3 = "Kata Abang, barisan panjang belum tentu lebih banyak. Ayo kita periksa!";

export const ADEGAN_BARISAN: AdeganStory = {
  id: "barisan",
  judul: "Barisan panjang, barisan pendek",
  sumber: "Materi: panjang barisan menipu",
  latar: "#EEF2FF",
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, judul("Barisan panjang, barisan pendek"), ...papanRak("pa", 14, 54, 272, "Rak Igil")),
      tambah("Lima", ...deretMainan(E.mobil, "mb", MOBIL, 22)),
      tambah("panjang.", garis("pj", 52, 102, 224, 0, W.merah, 3), teks("pjt", 150, 116, "panjang", 9, W.merah)),
    ),
    k(
      SUARA_B2,
      tambah(0, ...papanRak("pb", 14, 126, 272, "Rak Kaka")),
      tambah("enam", ...deretMainan(E.boneka, "bn", BONEKA, 22)),
      tambah("pendek.", garis("pd", 83, 174, 134, 0, W.ungu, 3), teks("pdt", 150, 188, "pendek", 9, W.ungu)),
    ),
    k(
      SUARA_B3,
      hapus(0, "jud"),
      tambah("Abang,", emo("ab", 20, 26, E.abang, 22)),
      tambah("belum", ...kartu("bt", 44, 8, 212, 24, W.emas, ["panjang belum tentu banyak"], 9)),
      tambah("periksa!", emo("lup", 278, 26, "\u{1F50D}", 20)),
    ),
  ],
};

/* ------------------------------ 3. Memasangkan satu-satu ------------------------------ */
const SUARA_P1 = "Abang memasangkan satu mobil dengan satu boneka. Satu garis untuk satu pasang.";
const SUARA_P2 = "Garis pertama, kedua, ketiga, keempat, kelima. Mobil sudah habis.";
const SUARA_P3 = "Masih ada satu boneka tanpa pasangan. Yang bersisa lebih banyak. Jadi boneka lebih banyak, mobil lebih sedikit.";

export const ADEGAN_PASANGKAN: AdeganStory = {
  id: "pasangkan",
  judul: "Memasangkan satu-satu",
  sumber: "Materi: pasangkan dan lihat sisanya",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Pasangkan satu-satu"), ...rakDua(), ...deretMainan(E.mobil, "mb", MOBIL, 22), ...deretMainan(E.boneka, "bn", BONEKA, 22)),
      ...pasangAksi(SUARA_P1, "ps", [pusat(MOBIL[0])], [pusat(BONEKA[0])], ["garis"]),
    ),
    k(
      SUARA_P2,
      ...pasangAksi(SUARA_P2, "ps", MOBIL.map(pusat), BONEKA.map(pusat), ["pertama,", "kedua,", "ketiga,", "keempat,", "kelima."]),
      sorotkan("habis.", "mb0", "mb1", "mb2", "mb3", "mb4"),
    ),
    k(
      SUARA_P3,
      sorotkan("satu", "bn5"),
      tambah("tanpa", teks("ss", 244, 146, "sisa 1", 9, W.merah, { anchor: "start" })),
      tambah("Jadi", ...kartu("k1", 10, 178, 136, 22, W.hijauMuda, ["boneka lebih banyak"], 8.6)),
      tambah("mobil", ...kartu("k2", 154, 178, 136, 22, W.merahMuda, ["mobil lebih sedikit"], 8.6)),
    ),
  ],
};

/* ------------------------------ 4. Menghitung lalu membandingkan angka ------------------------------ */
const SUARA_C1 = "Igil menghitung mobil. Satu, dua, tiga, empat, lima.";
const SUARA_C2 = "Kaka menghitung boneka. Satu, dua, tiga, empat, lima, enam.";
const SUARA_C3 = "Enam disebut sesudah lima. Jadi enam lebih banyak dari lima, dan lima lebih sedikit dari enam.";

export const ADEGAN_HITUNG: AdeganStory = {
  id: "hitung-banding",
  judul: "Menghitung lalu membandingkan",
  sumber: "Materi: bandingkan angkanya",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_C1, tambah(0, judul("Hitung, lalu bandingkan"), ...rakDua(), ...deretMainan(E.mobil, "mb", MOBIL, 22), ...deretMainan(E.boneka, "bn", BONEKA, 22)), ...hitungMainan(SUARA_C1, "mb", MOBIL, 22, "mobil.")),
    k(SUARA_C2, ...hitungMainan(SUARA_C2, "bn", BONEKA, 22, "boneka.", undefined, true)),
    k(
      SUARA_C3,
      hapus(0, "tg"),
      sorotkan("Enam", "bn5"),
      sorotkan("lima.", "mb4"),
      tambah("Jadi", ...kartu("c1", 10, 178, 136, 22, W.hijauMuda, ["6 lebih banyak dari 5"], 8.6)),
      tambah("dan", ...kartu("c2", 154, 178, 136, 22, W.merahMuda, ["5 lebih sedikit dari 6"], 8.6)),
    ),
  ],
};

/** Ekspor untuk uji: letak barisan dan ubah posisi (dipakai adegan sama banyak). */
export const pusatMainan = pusat;
export const pindahKe = (id: string, pts: Titik[]) => pts.map((p, i) => ({ id: `${id}${i}`, x: p.x, y: p.y }));
export { ubah };
