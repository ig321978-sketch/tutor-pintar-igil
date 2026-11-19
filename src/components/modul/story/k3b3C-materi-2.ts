import type { AdeganStory } from "./logika-story";
import { E, W, bulat, emo, garis, judul, karung, lantai, pindahKarung, putarJarum, teks, timbDigital, timbDuduk, tokoh } from "./k3b3C-gambar";
import { hapus, k, sorotkan, tambah, ubah } from "./k3b3C-bantu";

/*
 * Cerita orisinal IGIL "Pakan Bu Lastri" (Kelas 3 Bab 3 Sub-Bab C), cerita Kebun Binatang Mini.
 * Naskah suara dari naskah/story-naskah-k3b3c.md. Bagian ini: salah langkah (jarum belum di nol), mulai dari nol, dan selisih dua berat.
 */

/* ------------------------------ 5. Salah langkah: jarum belum di nol ------------------------------ */
const SUARA_S1 = "Raka menimbang karung pakan dengan timbangan duduk, padahal jarumnya sudah menunjuk angka satu sebelum karung diletakkan.";
const SUARA_S2 = "Setelah karung diletakkan, jarum menunjuk angka lima, dan Raka berseru, lima kilogram! Kalau salah, aku menyuapi semua burung beo!";
const SUARA_S3 = "Salsa menggeleng. Sebelum menimbang, jarum harus tepat di angka nol.";

export const ADEGAN_SALAH_NOL: AdeganStory = {
  id: "salah-nol",
  judul: "Jarum belum di angka nol",
  sumber: "Materi: jarum belum di nol",
  latar: "#FEE2E2",
  ketukan: [
    k(
      SUARA_S1,
      tambah(0, judul("Salah Langkah", W.merah), ...lantai("lt", 150), ...tokoh("rk", 40, 184, "Raka")),
      tambah("karung", ...karung("kr", 236, 118, 28, 34)),
      tambah("timbangan", ...timbDuduk("td", 150, 100, 28, 1)),
      tambah("satu", teks("n1", 150, 152, "jarum: 1", 10, W.merah)),
      tambah("sebelum", emo("bo", 276, 112, E.beo, 22)),
    ),
    k(
      SUARA_S2,
      hapus(0, "n1"),
      ubah("diletakkan,", ...pindahKarung("kr", 136, 28, 28)),
      tambah("lima", teks("n5", 150, 152, "jarum: 5", 10, W.merah)),
      ubah("lima", putarJarum("td", 28, 5)),
      tambah("lima@2", teks("sr", 40, 118, "5 kg!", 12, W.merah)),
      sorotkan("burung", "bo"),
    ),
    k(
      SUARA_S3,
      ubah(0, ...pindahKarung("kr", 236, 118, 28)),
      tambah("Salsa", ...tokoh("sl", 96, 184, "Salsa")),
      tambah("menimbang,", emo("xs", 196, 92, E.salah, 22)),
      ubah("harus", putarJarum("td", 28, 0)),
      hapus("tepat", "n5"),
      tambah("tepat", teks("n0", 150, 152, "jarum: 0", 10, W.hijauTua)),
      sorotkan("nol.", "td-l0"),
    ),
  ],
};

/* ------------------------------ 6. Mulai dari nol ------------------------------ */
const SUARA_N1 = "Salsa memutar tombol penyetel sampai jarum tepat di angka nol.";
const SUARA_N2 = "Karung diletakkan lagi, dan sekarang jarum menunjuk angka empat.";
const SUARA_N3 = "Jadi berat karung empat kilogram, bukan lima.";

export const ADEGAN_MULAI_NOL: AdeganStory = {
  id: "mulai-nol",
  judul: "Mulai dari angka nol",
  sumber: "Materi: mulai dari nol",
  latar: "#DCFCE7",
  ketukan: [
    k(
      SUARA_N1,
      tambah(0, judul("Mulai dari Nol", W.hijauTua), ...lantai("lt", 150), ...tokoh("sl", 60, 184, "Salsa"), ...timbDuduk("td", 150, 100, 28, 1), teks("n1", 150, 152, "jarum: 1", 10, W.merah)),
      tambah("tombol", bulat("kn", 196, 122, 6, "#F59E0B", W.biru)),
      sorotkan("memutar", "kn"),
      hapus("nol.", "n1"),
      ubah("nol.", putarJarum("td", 28, 0)),
      tambah("nol.", teks("n0", 150, 152, "jarum: 0", 10, W.hijauTua)),
    ),
    k(
      SUARA_N2,
      tambah("Karung", ...karung("kr", 236, 118, 28, 34)),
      ubah("lagi,", ...pindahKarung("kr", 136, 28, 28)),
      hapus("empat.", "n0"),
      ubah("empat.", putarJarum("td", 28, 4)),
      tambah("empat.", teks("n4", 150, 152, "jarum: 4", 10, W.hijauTua)),
    ),
    k(
      SUARA_N3,
      tambah("empat", teks("h4", 60, 50, "4 kg", 16, W.hijauTua)),
      tambah("lima.", teks("h5", 240, 50, "5 kg", 16, W.merah), garis("cr", 222, 52, 36, -14, W.merah, 2.4)),
    ),
  ],
};

/* ------------------------------ 7. Selisih dua berat ------------------------------ */
const SUARA_B1 = "Bu Lastri menimbang pakan burung beo: pagi seratus gram, sore lima ratus gram.";
const SUARA_B2 = "Tambahannya didapat dari lima ratus dikurangi seratus.";
const SUARA_B3 = "Jadi pakan tambahan beratnya empat ratus gram.";

export const ADEGAN_SELISIH: AdeganStory = {
  id: "selisih",
  judul: "Selisih dua berat pakan",
  sumber: "Materi: selisih dua berat",
  latar: "#EDE9FE",
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, judul("Pakan Burung Beo"), ...lantai("lt", 150), ...tokoh("bl", 150, 184, "Bu Lastri")),
      tambah("pagi", ...timbDigital("d1", 30, 80, "0", 60), teks("lp", 60, 68, "pagi", 9, W.ungu)),
      ubah("seratus", { id: "d1-t", isi: "100 g" }),
      tambah("sore", ...timbDigital("d2", 210, 80, "0", 60), teks("ls", 240, 68, "sore", 9, W.ungu)),
      ubah("lima", { id: "d2-t", isi: "500 g" }),
    ),
    k(
      SUARA_B2,
      tambah("lima", teks("k5", 118, 110, "500", 16, W.biru)),
      tambah("dikurangi", teks("km", 150, 110, "−", 16, W.merah)),
      tambah("seratus.", teks("k1", 182, 110, "100", 16, W.biru)),
    ),
    k(
      SUARA_B3,
      tambah("tambahan", teks("tb", 150, 80, "pakan tambahan", 10, W.ungu)),
      tambah("beratnya", emo("bo", 262, 152, E.beo, 22), emo("mk", 232, 152, E.mangkuk, 18)),
      tambah("empat", teks("eq", 150, 134, "= 400 g", 18, W.hijauTua)),
    ),
  ],
};
