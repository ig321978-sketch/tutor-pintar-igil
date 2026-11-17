import type { AdeganStory } from "./logika-story";
import { E, W, emo, judul, kartu, kotak, label, orang, teks } from "./k1b2b-gambar";
import { bersih, hapus, k, sorotkan, tambah } from "./k1b2b-bantu";

/* Akhir "Panen Pertama dan Keranjang Sepuluh": panen siap dikirim, tetangga ingin memesan (jembatan ke Sub-Bab C), lalu penutup. */

/* ------------------------------ 6. Panen siap dikirim ------------------------------ */
const SUARA_H1 = "Keranjang Nenek penuh tepat sepuluh. Kantong untuk tetangga juga sudah rapi dan sama banyak.";
const SUARA_H2 = "Abang mencatat cara mereka: tukar tempat, hitung maju, kembar, dan pasangan sepuluh. Semua cara memberi hasil yang benar.";
const SUARA_H3 = "Tetangga melihat sayur Mamah yang segar. Mereka ingin memesan juga!";
const CARA = ["tukar tempat", "hitung maju", "kembar", "pasangan 10"];

export const ADEGAN_HASIL: AdeganStory = {
  id: "siap-kirim",
  judul: "Panen siap dikirim",
  sumber: "Materi: hasil dan pilihan cara",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_H1,
      tambah(0, judul("Siap dikirim")),
      tambah("Keranjang", emo("kj", 80, 110, E.keranjang, 40), teks("kjn", 80, 136, "10", 13, W.merah)),
      tambah("Kantong", emo("k1", 190, 110, E.kantong, 30), emo("k2", 236, 110, E.kantong, 30)),
      tambah("banyak.", teks("sb", 213, 136, "sama banyak", 9.4, W.coklat)),
    ),
    k(
      SUARA_H2,
      bersih(0),
      tambah(0, judul("Catatan Abang"), ...orang("ab", 34, 110, E.abang, "Abang")),
      ...CARA.map((c, i) => tambah(["tukar", "maju,", "kembar,", "pasangan"][i], ...label(`c${i}`, 78, 32 + i * 34, 200, c, [W.hijauMuda, W.langit, W.pink, W.emas][i], 10))),
      tambah("benar.", emo("ok", 262, 186, E.benar, 20)),
    ),
    k(
      SUARA_H3,
      bersih(0),
      tambah(0, judul("Tetangga ingin memesan"), kotak("pg", 10, 150, 280, 8, "#D6A15E", W.coklat, { rx: 3 })),
      tambah("Tetangga", emo("t1", 60, 110, E.rumah, 34), emo("t2", 240, 110, E.rumah, 34)),
      tambah("segar.", emo("sy", 150, 110, E.selada, 30)),
      tambah("memesan", ...kartu("ps", 90, 40, 120, 26, W.emas, ["pesan sayur!"], 10)),
    ),
  ],
};

/* ------------------------------ 7. Penutup ------------------------------ */
const SUARA_Z1 = "Ingat, menukar tempat tidak mengubah hasil. Tiga ditambah dua sama dengan dua ditambah tiga.";
const SUARA_Z2 = "Mulai dari bilangan pertama lalu melompat, pakai penjumlahan kembar, dan ingat pasangan sepuluh.";
const SUARA_Z3 = "Sampai jumpa! Besok Igil, Kaka, Abang, dan Mamah mengantar pesanan tetangga.";

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Penutup: banyak cara menjumlah",
  sumber: "Materi: ringkasan dan penutup",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_Z1, tambah(0, judul("Ingat, ya!")), tambah("menukar", ...kartu("p1", 14, 34, 272, 34, W.hijauMuda, ["tukar tempat, hasil sama"], 9.6)), tambah("Tiga", ...kartu("p2", 14, 76, 272, 34, W.langit, ["3 + 2 = 2 + 3"], 13))),
    k(
      SUARA_Z2,
      tambah("melompat,", ...kartu("p3", 14, 118, 132, 34, W.emas, ["hitung maju"], 9.6)),
      tambah("kembar,", ...kartu("p4", 154, 118, 132, 34, W.pink, ["4 + 4 = 8"], 12)),
      tambah("sepuluh.", ...kartu("p5", 14, 160, 272, 30, W.hijauMuda, ["pasangan 10: 9 dan 1, 8 dan 2, 7 dan 3"], 9)),
    ),
    k(
      SUARA_Z3,
      bersih(0),
      tambah(0, judul("Sampai jumpa!"), emo("tr", 150, 70, E.truk, 32)),
      tambah("Igil,", ...orang("ig", 45, 140, E.igil, "Igil")),
      tambah("Kaka,", ...orang("kk", 115, 140, E.kaka, "Kaka")),
      tambah("Abang,", ...orang("ab", 185, 140, E.abang, "Abang")),
      tambah("Mamah", ...orang("mm", 255, 140, E.mamah, "Mamah")),
      hapus("pesanan", "tr"),
      tambah("pesanan", emo("ps", 150, 186, E.surat, 24)),
      sorotkan("tetangga.", "ps"),
    ),
  ],
};
