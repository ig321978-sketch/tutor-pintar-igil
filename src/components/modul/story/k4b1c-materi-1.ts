import type { AdeganStory } from "./logika-story";
import { E, bulat, dayung, dermaga, emo, judul, laut, panah, papanDermaga, perahu, teks, tempatAngka, tokoh, W } from "./k4b1c-gambar";
import { hapus, k, sorotkan, tambah, ubah } from "./k4b1c-bantu";

/*
 * Cerita orisinal IGIL "Papan Dermaga Kak Tiara" (K4 Bab 1 Sub-Bab C, membandingkan dan mengurutkan bilangan sampai sepuluh ribu), cerita Penginapan Pulau Karang Indah.
 * Naskah suara dari naskah/story-naskah-k4b1c.md. Bagian ini: dermaga, papan catatan tiga pantai, salah langkah Satria (membandingkan dari satuan).
 */

/* ------------------------------ 1. Dermaga ------------------------------ */
const SUARA_D1 = "Pagi berikutnya Kak Tiara menunggu di dermaga kayu sambil membawa papan besar.";
const SUARA_D2 = "Papan itu mencatat banyak pengunjung tiga pantai di pulau selama seminggu.";
const SUARA_D3 = "Ia ingin tahu pantai mana yang lebih ramai, supaya perahunya diatur sesuai.";

export const ADEGAN_DERMAGA: AdeganStory = {
  id: "dermaga",
  judul: "Dermaga Kak Tiara",
  sumber: "Materi: dermaga dan papan",
  latar: "#E0F2FE",
  ketukan: [
    k(
      SUARA_D1,
      tambah(0, judul("Dermaga Kak Tiara"), ...laut("lt", 104)),
      tambah("Kak", ...tokoh("kt", 266, 184, "Kak Tiara")),
      tambah("dermaga", ...dermaga("dk", 2, 172, 296)),
      tambah("kayu", ...perahu("pr", 60, 134)),
      tambah("sambil", ...tokoh("ph", 34, 184, "Pak Hendro"), ...tokoh("st", 84, 184, "Satria"), ...tokoh("lr", 124, 184, "Laras"), ...tokoh("gt", 160, 184, "Genta")),
      tambah("papan", ...papanDermaga("pd", 186, 70, 70, 80)),
    ),
    k(
      SUARA_D2,
      tambah("mencatat", teks("pj", 221, 90, "pengunjung", 7, W.tinta)),
      tambah("tiga", teks("n3", 221, 108, "3 pantai", 10, W.merah)),
      tambah("pantai", emo("pa", 60, 98, E.pulau, 20), emo("pb", 110, 98, E.payung, 20), emo("pc", 160, 98, E.kerang, 20)),
      tambah("seminggu", teks("mg", 221, 126, "1 minggu", 8, W.tinta)),
    ),
    k(
      SUARA_D3,
      tambah("ingin", emo("tq", 266, 138, E.tanya, 18)),
      tambah("ramai,", teks("rm", 150, 46, "mana yang lebih ramai?", 10, W.merah)),
      tambah("perahunya", ...perahu("pq", 112, 148, "#2563EB")),
      tambah("diatur", panah("ar", 134, 146, 30, 0, W.merah, 2)),
    ),
  ],
};

/* ------------------------------ 2. Catatan dua pantai ------------------------------ */
const SUARA_C1 = "Pantai Barat dikunjungi empat ribu tiga ratus lima puluh delapan orang.";
const SUARA_C2 = "Pantai Timur dikunjungi empat ribu tiga ratus delapan puluh lima orang.";
const SUARA_C3 = "Keduanya mirip sekali, jadi sulit dilihat mana yang lebih banyak.";

export const ADEGAN_CATATAN: AdeganStory = {
  id: "catatan",
  judul: "Catatan dua pantai",
  sumber: "Materi: catatan pengunjung",
  latar: "#ECFDF5",
  ketukan: [
    k(
      SUARA_C1,
      tambah(0, judul("Papan Dermaga"), ...papanDermaga("pd", 20, 32, 260, 100), ...dermaga("dk", 2, 172, 296)),
      tambah("Pantai", teks("lb", 70, 64, "BARAT", 13, W.tinta)),
      tambah("dikunjungi", ...tokoh("kt", 36, 184, "Kak Tiara")),
      tambah("delapan", teks("b1", 200, 64, "4.358", 20, W.merah)),
      tambah("orang", teks("or", 200, 80, "orang", 8, W.tinta)),
    ),
    k(
      SUARA_C2,
      tambah("Timur", teks("lt", 70, 108, "TIMUR", 13, W.tinta)),
      tambah("lima", teks("bt", 200, 108, "4.385", 20, W.merah)),
      tambah("orang", teks("ot", 200, 124, "orang", 8, W.tinta)),
    ),
    k(
      SUARA_C3,
      tambah("mirip", emo("pk", 60, 160, E.pikir, 18)),
      ubah("sekali,", { id: "b1", warna: W.hijau }, { id: "bt", warna: W.hijau }),
      sorotkan("sulit", "b1", "bt"),
      tambah("banyak.", teks("qq", 220, 150, "mana lebih banyak?", 9, W.merah)),
    ),
  ],
};

/* ------------------------------ 3. Salah langkah: dari angka paling kanan ------------------------------ */
const SUARA_S1 = "Satria melihat angka paling kanan, delapan dan lima, lalu berseru, delapan lebih besar, jadi Barat lebih banyak!";
const SUARA_S2 = "Laras menggeleng pelan sambil memegang kertas sakunya.";
const SUARA_S3 = "Kalau aku salah, aku mendayung perahu sendirian ke seberang, kata Satria.";

export const ADEGAN_SALAH_KANAN: AdeganStory = {
  id: "salah-kanan",
  judul: "Dari angka paling kanan",
  sumber: "Materi: salah langkah dari kanan",
  latar: "#FEE2E2",
  ketukan: [
    k(
      SUARA_S1,
      tambah(0, judul("Kata Satria"), ...tokoh("st", 40, 184, "Satria")),
      tambah("angka", ...tempatAngka("p1", 100, 36, 4358), ...tempatAngka("p2", 100, 84, 4385), teks("lb", 52, 58, "BARAT", 11, W.tinta), teks("lt", 52, 106, "TIMUR", 11, W.tinta)),
      tambah("kanan,", bulat("c1", 217, 53, 19, undefined, W.merah, { tebal: 2.6, z: 5 }), bulat("c2", 217, 101, 19, undefined, W.merah, { tebal: 2.6, z: 5 })),
      tambah("besar,", teks("jg", 268, 82, ">", 24, W.merah)),
      tambah("banyak!", teks("kl", 150, 142, "kata Satria: Barat lebih banyak", 8.4, W.merah)),
    ),
    k(
      SUARA_S2,
      tambah("Laras", ...tokoh("lr", 268, 184, "Laras")),
      tambah("pelan", emo("gl", 236, 160, E.gelengan, 20)),
      tambah("kertas", teks("ks", 196, 160, "kertas saku", 7.4, W.ungu)),
      sorotkan("sakunya.", "lr-ks"),
    ),
    k(
      SUARA_S3,
      hapus("Kalau", "kl"),
      tambah("salah,", teks("tr", 150, 142, "taruhan!", 12, W.merah)),
      tambah("mendayung", dayung("dy", 76, 174)),
      tambah("sendirian", emo("sd", 100, 160, E.cemberut, 18)),
      tambah("seberang,", panah("ap", 190, 128, 40, 0, W.merah, 2.4)),
    ),
  ],
};

