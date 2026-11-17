import type { AdeganStory } from "./logika-story";
import {
  E,
  W,
  barang,
  barangDi,
  emo,
  judul,
  kartu,
  keranjangAnyam,
  letakAturan,
  orang,
  semuaKeranjang,
  slot,
  teks,
  tunjukKe,
  type Tempat,
} from "./k1b4b-gambar";
import { bersih, hapus, k, redamkan, sorotkan, tambah, ubah } from "./k1b4b-bantu";

/* Akhir "Teras Penuh Barang": satu aturan sekali, bahan rapi menurut bentuk, jembatan ke merakit mainan (Sub-Bab C), lalu penutup. Tanpa latihan. */

/* ------------------------------ 6. Satu aturan sekali ------------------------------ */
const SUARA_S1 = "Igil mencoba dua aturan sekaligus, bentuk dan warna. Karton segitiga merah ia pindahkan bolak-balik.";
const SUARA_S2 = "\"Masuk keranjang segitiga atau keranjang merah?\" tanya Igil, sampai kartonnya terlipat.";
const SUARA_S3 = "Mamah tersenyum, \"Pilih satu aturan dulu,\" katanya. Setelah selesai, baru boleh ganti aturan.";
const KIRI: Tempat = { x: 20, y: 118, w: 100, h: 56 };
const KANAN: Tempat = { x: 180, y: 118, w: 100, h: 56 };
const KR_MERAH = keranjangAnyam("k-merah", KANAN, "merah", W.merahMuda);
const DARI = { x: 150, y: 92 };

export const ADEGAN_SATU: AdeganStory = {
  id: "satu-aturan",
  judul: "Satu aturan sekali",
  sumber: "Materi: pilih satu aturan dulu",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_S1,
      tambah(0, judul("Satu aturan sekali"), ...orang("ig", 30, 80, E.igil, "Igil")),
      tambah("dua", ...kartu("da", 70, 30, 160, 20, W.merahMuda, ["2 aturan sekaligus?"], 9.5)),
      tambah("bentuk", ...keranjangAnyam("k-segitiga", KIRI, "segitiga", W.krem)),
      tambah("warna.", ...KR_MERAH),
      tambah("bolak-balik.", emo("pz", 54, 58, E.pusing, 16)),
    ),
    k(
      SUARA_S2,
      tambah("Karton", { ...barang(1, { x: 150, y: 76 }), sorot: true }),
      tambah("segitiga", tunjukKe("g0", DARI, { x: 70, y: 114 })),
      tambah("merah", tunjukKe("g1", DARI, { x: 230, y: 114 })),
      tambah("terlipat.", teks("tq", 150, 116, "?", 18, W.merah)),
    ),
    k(
      SUARA_S3,
      tambah("Mamah", ...orang("mm", 270, 80, E.mamah, "Mamah")),
      hapus("satu", "da-k", "da-t0", "pz"),
      tambah("satu", ...kartu("sa", 70, 30, 160, 20, W.hijauMuda, ["pilih 1 aturan dulu"], 9.5)),
      hapus("selesai,", ...KR_MERAH.map((o) => o.id), "g0", "g1", "tq"),
      ubah("selesai,", { id: "b1", ...slot(KIRI, 0), sorot: false }),
      tambah("ganti", emo("ok", 230, 146, E.benar, 26)),
    ),
  ],
};

/* ------------------------------ 7. Bahan rapi, besok merakit ------------------------------ */
const SUARA_H1 = "Akhirnya bahan disimpan menurut bentuk, karena mainan dirakit dari bentuk. Tiga keranjang rapi.";
const SUARA_H2 = "Igil butuh roda. Ia langsung mengambil tutup kaleng dari keranjang lengkung, tanpa membongkar.";
const SUARA_H3 = "Besok Igil, Kaka, Abang, dan Mamah akan merakit bahan ini menjadi mainan untuk festival.";
const RODA = letakAturan("bentuk")[6];

export const ADEGAN_RAPI: AdeganStory = {
  id: "bahan-rapi",
  judul: "Bahan rapi, besok merakit mainan",
  sumber: "Materi: hasil dan jembatan merakit",
  latar: "#ECFDF5",
  ketukan: [
    k(
      SUARA_H1,
      tambah(0, judul("Bahan rapi di teras"), ...semuaKeranjang("bentuk"), ...barangDi(letakAturan("bentuk"))),
      tambah("Tiga", teks("tk", 150, 100, "3 keranjang rapi", 10, W.hijau)),
      tambah("rapi", emo("ok", 214, 98, E.benar, 16)),
    ),
    k(
      SUARA_H2,
      tambah("Igil", ...orang("ig", 40, 82, E.igil, "Igil")),
      tambah("roda.", emo("rd", 112, 70, E.roda, 16)),
      ubah("mengambil", { id: "b6", x: 82, y: 84 }),
      sorotkan("lengkung,", "k-lengkung"),
      tambah("tanpa", teks("cp", 210, 64, "cepat, tanpa membongkar", 9.5, W.hijau)),
    ),
    k(
      SUARA_H3,
      hapus(0, "rd", "cp", "tk", "ok"),
      ubah(0, { id: "b6", ...RODA }),
      redamkan(0, "k-lengkung"),
      tambah("Kaka,", ...orang("kk", 100, 82, E.kaka, "Kaka")),
      tambah("Abang,", ...orang("ab", 160, 82, E.abang, "Abang")),
      tambah("Mamah", ...orang("mm", 220, 82, E.mamah, "Mamah")),
      tambah("merakit", ...kartu("bs", 70, 24, 160, 18, W.emas, ["besok: merakit mainan"], 9.5)),
      tambah("festival.", emo("td", 272, 78, E.tenda, 24)),
    ),
  ],
};

/* ------------------------------ 8. Penutup ------------------------------ */
const SUARA_Z1 = "Pilih satu aturan dulu, misalnya bentuk, warna, atau ukuran.";
const SUARA_Z2 = "Periksa tiap barang, taruh di keranjangnya, lalu beri nama dan hitung isinya.";
const SUARA_Z3 = "Kalau aturan diganti, barang yang sama bisa pindah keranjang. Coba pikirkan, bentuk apa saja yang kamu perlukan untuk membuat mobil mainan?";

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Penutup: ingat cara memilah",
  sumber: "Materi: ringkasan dan penutup",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_Z1,
      tambah(0, judul("Ingat, ya!")),
      tambah("satu", ...kartu("p1", 14, 32, 272, 30, W.langit, ["pilih 1 aturan dulu"], 10.5)),
      tambah("bentuk,", ...kartu("c0", 20, 74, 80, 22, W.krem, ["bentuk"], 10)),
      tambah("warna,", ...kartu("c1", 110, 74, 80, 22, W.merahMuda, ["warna"], 10)),
      tambah("ukuran.", ...kartu("c2", 200, 74, 80, 22, W.lavender, ["ukuran"], 10)),
    ),
    k(
      SUARA_Z2,
      tambah("Periksa", ...kartu("p2", 14, 108, 272, 26, W.hijauMuda, ["periksa tiap barang, taruh di keranjang"], 9.4)),
      tambah("nama", ...kartu("p3", 14, 142, 272, 26, W.emas, ["beri nama, hitung isinya"], 10)),
    ),
    k(
      SUARA_Z3,
      bersih(0),
      tambah(0, judul("Coba pikirkan")),
      tambah("aturan", ...kartu("p4", 30, 32, 240, 26, W.lavender, ["ganti aturan, barang bisa pindah"], 9.5), barang(1, { x: 150, y: 84 })),
      tambah(
        "Coba",
        ...orang("ig", 45, 150, E.igil, "Igil"),
        ...orang("kk", 115, 150, E.kaka, "Kaka"),
        ...orang("ab", 185, 150, E.abang, "Abang"),
        ...orang("mm", 255, 150, E.mamah, "Mamah"),
      ),
      tambah("mainan?", teks("tq", 150, 116, "bentuk apa untuk mobil mainan?", 9.4, W.merah)),
    ),
  ],
};
