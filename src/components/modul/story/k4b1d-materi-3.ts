import type { AdeganStory } from "./logika-story";
import { E, W, emo, judul, kotak, panah, papanKecil, pasir, teks, tokoh, wadah } from "./k4b1d-gambar";
import { hapus, k, tambah, ubah } from "./k4b1d-bantu";

/*
 * Cerita orisinal IGIL "Kios Kelapa Pak Darwis" (Kelas 4 Bab 1 Sub-Bab D), Penginapan Pulau Karang Indah.
 * Naskah suara dari naskah/story-naskah-k4b1d.md. Bagian ini: cara lain menguraikan, menyusun balik, dan penutup (jembatan ke Sub-Bab E).
 */

/* ------------------------------ 7. Cara lain ------------------------------ */
const SUARA_L1 = "Pak Darwis bertanya, apakah ada cara lain menguraikan bilangan itu?";
const SUARA_L2 = "Laras menjawab, bisa empat ribu ditambah seribu dua ratus tujuh puluh.";
const SUARA_L3 = "Bilangan yang sama dapat diuraikan dengan lebih dari satu cara.";

export const ADEGAN_LAIN: AdeganStory = {
  id: "lain",
  judul: "Cara lain menguraikan",
  sumber: "Materi: lebih dari satu cara",
  latar: "#F5F3FF",
  ketukan: [
    k(
      SUARA_L1,
      tambah(0, judul("Ada Cara Lain?"), papanKecil("pb", 20, 30, 260, 100)),
      tambah("Pak", ...tokoh("pd", 250, 184, "Pak Darwis")),
      tambah("cara", emo("tq", 276, 152, E.tanya, 20)),
      tambah("bilangan", teks("b5", 150, 62, "5.270", 22, W.biru, { z: 2 })),
      tambah("menguraikan", teks("u1", 150, 96, "5.000 + 200 + 70", 15, W.coklat, { z: 2 })),
    ),
    k(
      SUARA_L2,
      tambah("Laras", ...tokoh("lr", 40, 184, "Laras")),
      tambah("menjawab,", emo("jr", 70, 160, E.jari, 18)),
      tambah("empat", teks("u2", 150, 120, "4.000", 15, W.hijauTua, { z: 2 })),
      ubah("seribu", { id: "u2", isi: "4.000 + 1.270" }),
    ),
    k(
      SUARA_L3,
      tambah("sama", teks("e1", 252, 96, "= 5.270", 12, W.merah, { z: 2 }), teks("e2", 252, 120, "= 5.270", 12, W.merah, { z: 2 })),
      tambah("satu", teks("lc", 150, 150, "lebih dari 1 cara", 12, W.merah)),
      tambah("cara.", emo("ok", 22, 56, E.benar, 20)),
    ),
  ],
};

/* ------------------------------ 8. Menyusun balik ------------------------------ */
const SUARA_U1 = "Genta menyusun balik, tiga ribu ditambah dua ribu dua ratus tujuh puluh.";
const SUARA_U2 = "Ia menggabungkannya dan mendapat lima ribu dua ratus tujuh puluh.";
const SUARA_U3 = "Menyusun dan menguraikan adalah dua arah dari bilangan yang sama.";

export const ADEGAN_SUSUN: AdeganStory = {
  id: "susun",
  judul: "Menyusun balik",
  sumber: "Materi: menyusun balik",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_U1,
      tambah(0, judul("Menyusun Balik"), ...tokoh("gn", 40, 184, "Genta")),
      tambah("tiga", ...wadah("w1", 60, 70, 76, 56), teks("a1", 98, 102, "3.000", 16, W.biru, { z: 4 })),
      tambah("ditambah", teks("pl", 150, 104, "+", 22, W.merah)),
      tambah("dua", ...wadah("w2", 170, 70, 76, 56), teks("a2", 208, 102, "2.270", 16, W.biru, { z: 4 })),
    ),
    k(
      SUARA_U2,
      ubah("menggabungkannya", { id: "w1-k", x: 96 }, { id: "w1-h", x: 111 }, { id: "a1", x: 134 }, { id: "w2-k", x: 150 }, { id: "w2-h", x: 165 }, { id: "a2", x: 188 }),
      hapus("mendapat", "w1-k", "w1-h", "a1", "pl", "w2-k", "w2-h", "a2"),
      tambah("mendapat", ...wadah("w3", 90, 62, 120, 76)),
      tambah("lima", teks("a3", 150, 108, "5.270", 28, W.merah, { z: 4 })),
    ),
    k(
      SUARA_U3,
      tambah("Menyusun", panah("pn1", 170, 162, 0, -18, W.hijauTua, 3), teks("lu", 200, 158, "susun", 10, W.hijauTua)),
      tambah("menguraikan", panah("pn2", 120, 142, 0, 14, W.merah, 3), teks("ld", 96, 158, "urai", 10, W.merah)),
      tambah("dua", teks("a2x", 190, 186, "2 arah", 12, W.ungu)),
    ),
  ],
};

/* ------------------------------ 9. Penutup ------------------------------ */
const SUARA_T1 = "Kelapa sudah rapi dalam keranjang, dan Pak Darwis berterima kasih.";
const SUARA_T2 = "Bu Rina, petugas resepsi, datang membawa daftar tamu pagi dan siang yang harus dijumlahkan.";
const SUARA_T3 = "Menurutmu, bagaimana cara menjumlahkan dua bilangan besar dengan tepat? Terima kasih, Satria, Laras, Genta, Pak Hendro, dan Pak Darwis!";
const RAK = [0, 1, 2, 3].map((i) => [...wadah(`r${i}`, 24 + i * 62, 104, 54, 40), emo(`r${i}a`, 38 + i * 62, 100, E.kelapa, 14, { z: 4 }), emo(`r${i}b`, 58 + i * 62, 100, E.kelapa, 14, { z: 4 })]);

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Kelapa rapi dan tamu berikutnya",
  sumber: "Materi: penutup dan jembatan",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Kelapa Sudah Rapi"), ...pasir("ps", 150)),
      tambah("keranjang,", ...RAK.flat()),
      tambah("Pak", ...tokoh("pd", 250, 184, "Pak Darwis")),
      tambah("berterima", emo("tm", 276, 160, E.terima, 18)),
    ),
    k(
      SUARA_T2,
      tambah("Bu", ...tokoh("br", 200, 184, "Bu Rina")),
      tambah("daftar", kotak("dt-k", 110, 30, 110, 62, W.putih, W.biru, { rx: 8 }), teks("dt-t0", 165, 44, "daftar tamu", 9, W.biru)),
      tambah("pagi", teks("pg", 140, 62, "pagi", 9, W.coklat)),
      tambah("siang", teks("sg", 184, 82, "siang", 9, W.coklat)),
    ),
    k(
      SUARA_T3,
      tambah("menjumlahkan", teks("pt", 40, 62, "+", 30, W.merah), emo("tq", 70, 62, E.tanya, 26)),
      tambah("dua", teks("d2", 62, 92, "2 bilangan", 11, W.merah)),
      tambah("Satria,", ...tokoh("st", 24, 184, "Satria"), emo("w1", 46, 152, E.lambai, 16)),
      tambah("Laras,", ...tokoh("lr", 62, 184, "Laras"), emo("w2", 82, 152, E.lambai, 16)),
      tambah("Genta,", ...tokoh("gn", 100, 184, "Genta"), emo("w3", 118, 152, E.lambai, 16)),
      tambah("Hendro,", ...tokoh("ph", 138, 184, "Pak Hendro"), emo("w4", 156, 152, E.lambai, 16)),
      tambah("Darwis!", emo("w5", 232, 152, E.lambai, 16), emo("w6", 178, 152, E.lambai, 16)),
    ),
  ],
};
