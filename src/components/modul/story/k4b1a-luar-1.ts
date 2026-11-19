import type { AdeganStory } from "./logika-story";
import { E, K, W, angkaKartu, emo, judul, kartuKosong, kotak, namaKartu, panah, papanTulis, teras, teks, tokoh } from "./k4b1a-gambar";
import { bersih, hapus, k, sorotkan, tambah } from "./k4b1a-bantu";

/*
 * Cerita orisinal IGIL "Loket Tiket Bu Maya" (Kelas 4 Bab 1 Sub-Bab A), video metode global.
 * Naskah suara dari naskah/story-naskah-k4b1a.md. Bagian ini: pembuka (kotak pengumuman), Digit Cards (Kartu Angka), dan terapannya.
 */

export const NAMA_METODE = ["Digit Cards", "Chunk and Read", "Zero Check"] as const;
export const NAMA_METODE_ID = ["Kartu Angka", "Baca Per Bagian", "Periksa Nol"] as const;

const MALAM = "#312E81";
const KUNING_KARTU = "#FEF3C7";
/** Judul adegan malam berwarna krem supaya terbaca di latar gelap. */
const judulMalam = (isi: string) => judul(isi, W.krem);

/* ------------------------------ Pembuka ------------------------------ */
const SUARA_O1 = "Malam itu, di teras penginapan, Bu Maya membuka kotak pengumuman yang berisi banyak nomor tiket.";
const SUARA_O2 = "Di dalamnya ada tiga cara supaya bilangan besar selalu terbaca dan tertulis benar, tanpa angka yang hilang.";
const SUARA_O3 = "Tiga cara itu: Digit Cards, Chunk and Read, dan Zero Check.";
const SUARA_O4 = "Nama dalam bahasa Indonesia: Kartu Angka, Baca Per Bagian, dan Periksa Nol.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Kotak pengumuman Bu Maya",
  sumber: "Metode global: pembuka",
  latar: MALAM,
  ketukan: [
    k(
      SUARA_O1,
      tambah(0, judulMalam("Malam di Teras"), ...teras("tr", 150), emo("bl", 262, 40, "\u{1F319}", 26)),
      tambah("Bu", ...tokoh("bm", 60, 184, "Bu Maya")),
      tambah("kotak", kotak("kb", 170, 120, 84, 30, "#C99A63", W.coklat, { rx: 3, z: 1 }), kotak("kt", 166, 110, 92, 10, "#A16207", W.coklat, { rx: 3, z: 2 })),
      tambah("berisi", ...[0, 1, 2].map((i) => kotak(`ks${i}`, 178 + i * 24, 96 + (i % 2) * 4, 20, 14, KUNING_KARTU, W.coklat, { rx: 2, tebal: 1, z: 1 }))),
      tambah("nomor", teks("nt", 212, 86, "nomor tiket", 8, W.krem)),
    ),
    k(
      SUARA_O2,
      tambah("tiga", teks("n3", 110, 70, "3 cara", 12, W.krem)),
      tambah("cara", ...[0, 1, 2].map((i) => [kotak(`c${i}-k`, 96 + i * 34, 84, 28, 26, KUNING_KARTU, W.biru, { rx: 4 }), teks(`c${i}-t`, 110 + i * 34, 101, "cara", 6.4, W.biru)]).flat()),
      tambah("terbaca", emo("ok", 60, 100, E.benar, 18)),
      tambah("hilang.", emo("xs", 240, 80, E.salah, 18)),
    ),
    k(
      SUARA_O3,
      bersih(0),
      tambah(0, judulMalam("Tiga Cara"), teks("n3", 260, 40, "3 cara", 10, W.krem)),
      tambah("Digit", teks("m0", 112, 70, "1. Digit Cards", 10, W.krem), emo("i0", 30, 72, "\u{1F0CF}", 16)),
      tambah("Chunk", teks("m1", 112, 120, "2. Chunk and Read", 10, W.krem), emo("i1", 30, 122, "\u{1F5E3}", 16)),
      tambah("Zero", teks("m2", 112, 170, "3. Zero Check", 10, W.krem), emo("i2", 30, 172, "\u{1F50D}", 16)),
    ),
    k(
      SUARA_O4,
      tambah("Kartu", teks("g0", 236, 70, "Kartu Angka", 9, K.kapurMerah)),
      tambah("Baca", teks("g1", 236, 120, "Baca Per Bagian", 9, K.kapurMerah)),
      tambah("Periksa", teks("g2", 236, 170, "Periksa Nol", 9, K.kapurMerah)),
      tambah("Nol", kotak("z0-k", 266, 156, 24, 24, W.putih, W.merah, { rx: 12, z: 2 }), teks("z0", 278, 172, "0", 14, W.merah, { z: 3 })),
    ),
  ],
};

/* ------------------------------ Digit Cards: konsep ------------------------------ */
const SUARA_C1 = "Cara pertama, Digit Cards, atau Kartu Angka.";
const SUARA_C2 = "Setiap angka kita taruh pada satu kartu, lalu kartu-kartu itu disusun dari ribuan sampai satuan.";
const SUARA_C3 = "Urutan kartu menunjukkan tempat tiap angka, sehingga tidak ada angka yang tertukar.";
const SUARA_C4 = "Dengan kartu, kita bisa melihat dan memegang bilangan itu bagian demi bagian.";
const CONTOH = ["7", "0", "2", "5"];

export const ADEGAN_LUAR_KARTU: AdeganStory = {
  id: "luar-kartu",
  judul: "Digit Cards: Kartu Angka",
  sumber: "Metode global: Digit Cards (konsep)",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_C1,
      tambah(0, judul("Cara 1: Digit Cards"), ...papanTulis("pt", 8, 28, 284, 132)),
      tambah("Digit", teks("nm", 150, 56, "Digit Cards", 13, K.kapurMerah)),
      tambah("Kartu", teks("ni", 150, 76, "Kartu Angka", 11, K.kapur)),
      tambah("Angka.", ...[0, 1, 2, 3].map((i) => kartuKosong("c", i))),
    ),
    k(
      SUARA_C2,
      tambah("angka", teks("s1", 150, 94, "1 angka = 1 kartu", 10, K.kapur)),
      tambah("kartu,", ...CONTOH.map((n, i) => angkaKartu("c", i, n))),
      sorotkan("disusun", "ck0", "ck1", "ck2", "ck3"),
      tambah("ribuan", namaKartu("c", 0)),
      tambah("sampai", namaKartu("c", 1), namaKartu("c", 2)),
      tambah("satuan", namaKartu("c", 3)),
    ),
    k(
      SUARA_C3,
      hapus(0, "s1"),
      tambah("menunjukkan", panah("ur", 55, 96, 196, 0, K.kapurMerah, 2)),
      tambah("tempat", teks("tp", 150, 92, "tiap angka ada tempatnya", 9, K.kapur)),
      tambah("tertukar", emo("xs", 28, 120, E.salah, 18)),
      tambah("tertukar", teks("tk", 270, 120, "tidak", 8, K.kapurMerah)),
    ),
    k(
      SUARA_C4,
      hapus(0, "tp", "xs", "tk"),
      tambah("melihat", emo("my", 28, 110, E.mata, 18)),
      tambah("memegang", emo("mg", 272, 110, E.tangan, 18)),
      sorotkan("bagian", "ck0"),
      sorotkan("bagian@2", "ck1", "ck2", "ck3"),
    ),
  ],
};

/* ------------------------------ Digit Cards: terapan ------------------------------ */
const SUARA_D1 = "Laras menyusun kartu tiga, empat, nol, dan enam dari kiri ke kanan.";
const SUARA_D2 = "Hasilnya bilangan tiga ribu empat ratus enam, lengkap dengan kartu nol di puluhan.";
const SUARA_D3 = "Cocok untuk menulis bilangan dari ucapan, karena tiap angka punya kartu dan tempatnya.";
const SUARA_D4 = "Kurang cocok kalau kita hanya punya sedikit waktu, karena menyiapkan kartunya agak lama.";
const TERAPAN = ["3", "4", "0", "6"];

export const ADEGAN_LUAR_KARTU_TERAPAN: AdeganStory = {
  id: "luar-kartu-terapan",
  judul: "Kartu Angka: kapan cocok",
  sumber: "Metode global: Digit Cards (terapan)",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_D1,
      tambah(0, judul("Kartu Angka Laras"), ...papanTulis("pt", 8, 28, 284, 132), ...tokoh("lr", 40, 184, "Laras"), ...[0, 1, 2, 3].map((i) => kartuKosong("c", i))),
      tambah("tiga,", angkaKartu("c", 0, TERAPAN[0])),
      tambah("empat,", angkaKartu("c", 1, TERAPAN[1])),
      tambah("nol,", angkaKartu("c", 2, TERAPAN[2])),
      tambah("enam", angkaKartu("c", 3, TERAPAN[3])),
    ),
    k(
      SUARA_D2,
      tambah("bilangan", ...[0, 1, 2, 3].map((i) => namaKartu("c", i))),
      tambah("enam,", teks("hs", 150, 80, "3.406", 30, K.kapur)),
      sorotkan("nol", "ck2"),
      sorotkan("puluhan", "ck2"),
    ),
    k(
      SUARA_D3,
      hapus(0, "hs"),
      tambah("Cocok", emo("ok", 28, 52, E.benar, 20)),
      tambah("ucapan,", teks("uc", 150, 76, "tulis dari ucapan", 11, K.kapur), emo("mf", 262, 52, E.megafon, 18)),
      sorotkan("kartu", "ck0", "ck1", "ck2", "ck3"),
    ),
    k(
      SUARA_D4,
      hapus("Kurang", "ok", "uc", "mf"),
      tambah("Kurang", emo("xs", 28, 52, E.salah, 20)),
      tambah("sedikit", emo("jm", 262, 52, "\u{23F0}", 18)),
      tambah("agak", teks("lm", 150, 76, "agak lama", 11, K.kapurMerah)),
    ),
  ],
};
