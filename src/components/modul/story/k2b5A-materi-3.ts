import type { AdeganStory } from "./logika-story";
import { E, W, WK, biji, bulat, emo, garis, judul, kotak, pagar, papanCatat, potongBulat, rumput, teks, tokoh } from "./k2b5A-gambar";
import { bersih, hapus, k, tambah } from "./k2b5A-bantu";

/*
 * Cerita orisinal IGIL "Semangka Raksasa Pak Danu" (Kelas 2 Bab 5 Sub-Bab A, setengah dari benda utuh), awal cerita Kebun Sekolah.
 * Naskah suara dari naskah/story-naskah-k2b5a.md. Bagian ini: lingkaran di tanah, gambar A dan gambar B, penutup.
 */

const TANAH = kotak("tn", 2, 118, 296, 82, "#E7C99A", undefined, { rx: 0, tebal: 0, z: -3 });

/* ------------------------------ 7. Lingkaran di tanah ------------------------------ */
const SUARA_G1 = "Nia menggambar lingkaran di tanah dengan ranting, lalu membaginya dengan garis lewat titik tengah.";
const SUARA_G2 = "Garisnya boleh tegak, mendatar, atau miring, asalkan lewat titik tengah.";
const SUARA_G3 = "Kedua bagian pasti sama besar, jadi masing-masing setengah.";

export const ADEGAN_LINGKARAN: AdeganStory = {
  id: "lingkaran",
  judul: "Lingkaran di tanah",
  sumber: "Materi: lingkaran di tanah",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_G1,
      tambah(0, judul("Lingkaran di Tanah"), TANAH),
      tambah("Nia", ...tokoh("ni", 46, 180, "Nia")),
      tambah("lingkaran", bulat("lk", 178, 150, 38, undefined, "#78350F", { tebal: 2.6, z: 1 })),
      tambah("ranting,", garis("rt", 72, 174, 34, -22, "#78350F", 3, { z: 2 })),
      tambah("garis", garis("gl", 140, 150, 76, 0, W.hijau, 2.4, { z: 3 })),
      tambah("titik", bulat("tt", 178, 150, 3.2, W.merah, undefined, { tebal: 0, z: 4 })),
      tambah("tengah.", teks("lbl", 262, 150, "titik tengah", 9, W.merah), garis("pt", 230, 150, -46, 0, W.merah, 1.6, { z: 4 })),
    ),
    k(
      SUARA_G2,
      hapus(0, "gl"),
      tambah("tegak,", garis("g1", 178, 112, 0, 76, W.hijau, 2.4, { z: 3 })),
      tambah("mendatar,", garis("g2", 140, 150, 76, 0, "#2563EB", 2.4, { z: 3 })),
      tambah("miring,", garis("g3", 151, 123, 54, 54, W.ungu, 2.4, { z: 3 })),
      tambah("lewat", emo("ok", 252, 118, E.benar, 20)),
    ),
    k(
      SUARA_G3,
      hapus(0, "g2", "g3", "ok"),
      tambah("Kedua", potongBulat("c1", 178, 150, 36, 90, 270, "#BFDBFE", undefined, { tebal: 0, z: 0 }), potongBulat("c2", 178, 150, 36, -90, 90, "#FDE68A", undefined, { tebal: 0, z: 0 })),
      tambah("sama", teks("t1", 252, 108, "sama besar", 10, W.hijau)),
      tambah("masing-masing", teks("s1", 158, 156, "setengah", 8, W.hijau), teks("s2", 198, 156, "setengah", 8, W.hijau)),
    ),
  ],
};

/* ------------------------------ 8. Gambar A dan gambar B ------------------------------ */
const SUARA_D1 = "Dika menggambar dua papan di tanah, gambar A dan gambar B.";
const SUARA_D2 = "Gambar A terbelah dua sama besar, jadi menunjukkan setengah. Gambar B terbelah tidak sama besar, jadi bukan setengah.";
const SUARA_D3 = "Dika menulis tiga pertanyaan: dibagi dua bagian? sama besar? satu bagian yang ditunjuk? Ketiganya harus ya.";

export const ADEGAN_DUA_GAMBAR: AdeganStory = {
  id: "dua-gambar",
  judul: "Gambar A dan gambar B",
  sumber: "Materi: gambar A dan gambar B",
  latar: "#F5F3FF",
  ketukan: [
    k(
      SUARA_D1,
      tambah(0, judul("Gambar A dan Gambar B"), TANAH),
      tambah("Dika", ...tokoh("dk", 150, 184, "Dika")),
      tambah("dua", teks("n2", 150, 44, "2 papan", 10, W.ungu)),
      tambah("papan", kotak("pa", 36, 62, 100, 56, W.putih, W.biru, { rx: 3, tebal: 2.4 }), kotak("pb", 164, 62, 100, 56, W.putih, W.biru, { rx: 3, tebal: 2.4 })),
      tambah(7, teks("ta", 86, 134, "A", 14, W.merah)),
      tambah(10, teks("tb", 214, 134, "B", 14, W.merah)),
    ),
    k(
      SUARA_D2,
      tambah("terbelah", garis("ga", 86, 62, 0, 56, W.merah, 2.4, { z: 2 })),
      tambah("sama", teks("sa", 86, 150, "sama besar", 8.6, W.hijau)),
      tambah("setengah.", emo("oka", 86, 96, E.benar, 20, { z: 3 })),
      tambah("terbelah@2", garis("gb", 190, 62, 0, 56, W.merah, 2.4, { z: 2 })),
      tambah("tidak", teks("sb", 214, 150, "tidak sama", 8.6, W.merah)),
      tambah("bukan", emo("xb", 228, 96, E.salah, 20, { z: 3 })),
    ),
    k(
      SUARA_D3,
      bersih(0),
      tambah(0, judul("Tiga Pertanyaan"), TANAH, ...papanCatat("pc", 40, 32, 220, 112)),
      tambah("Dika", ...tokoh("dk", 150, 184, "Dika")),
      tambah("tiga", teks("h3", 150, 54, "3 pertanyaan", 11, W.ungu)),
      tambah("dibagi", teks("q1", 150, 78, "dibagi 2 bagian?", 10)),
      tambah("sama", teks("q2", 150, 98, "sama besar?", 10)),
      tambah("satu", teks("q3", 150, 118, "1 bagian ditunjuk?", 10)),
      tambah("ya.", emo("c1", 236, 76, E.benar, 16), emo("c2", 236, 96, E.benar, 16), emo("c3", 236, 116, E.benar, 16)),
    ),
  ],
};

/* ------------------------------ 9. Penutup ------------------------------ */
const SUARA_N1 = "Dua regu menikmati semangka dengan puas, dan tidak ada yang kecewa.";
const SUARA_N2 = "Dika merangkum. Setengah berarti satu benda dibagi menjadi dua bagian yang sama besar.";
const SUARA_N3 = "Dari pagar, Bu Wati melambai membawa keranjang bibit. Menurutmu, kalau ada banyak bibit, bagaimana membaginya sama banyak? Terima kasih, Chacha, Dika, Nia, Bu Sari, dan Pak Danu!";

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Semua puas",
  sumber: "Materi: semua puas",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_N1,
      tambah(0, judul("Semua Puas"), rumput("rm", 134), ...pagar("pg", 8, 94, 284)),
      tambah("Dua", teks("n2", 150, 60, "2 regu", 10, W.ungu), emo("rk1", 70, 176, E.anak, 24), emo("rk2", 230, 176, E.anak, 24)),
      tambah("semangka", potongBulat("h1", 108, 156, 18, 90, 270, WK.daging, WK.kulit), ...biji("sa", 102, 156), potongBulat("h2", 192, 156, 18, -90, 90, WK.daging, WK.kulit), ...biji("sb", 198, 156)),
      tambah("puas,", emo("sm1", 70, 150, E.senyum, 20), emo("sm2", 230, 150, E.senyum, 20)),
      tambah("kecewa.", emo("ok", 196, 58, E.benar, 24)),
    ),
    k(
      SUARA_N2,
      hapus(0, "n2", "ok"),
      tambah("Dika", ...tokoh("dk", 150, 186, "Dika")),
      tambah("merangkum.", ...papanCatat("pc", 80, 40, 140, 70)),
      tambah("Setengah", teks("r1", 150, 62, "setengah", 11, W.hijau)),
      tambah("satu", teks("r2", 150, 78, "1 benda", 10)),
      tambah("dua", teks("r3", 150, 94, "2 bagian sama besar", 9, W.ungu)),
    ),
    k(
      SUARA_N3,
      bersih(0),
      tambah(0, judul("Sampai Jumpa"), rumput("rm", 134), ...pagar("pg", 8, 94, 284)),
      tambah("Wati", ...tokoh("bw", 268, 128, "Bu Wati")),
      tambah("melambai", emo("lb", 244, 112, E.lambai, 18)),
      tambah("keranjang", emo("kj", 232, 134, E.keranjang, 26)),
      tambah("bibit.", emo("bb1", 212, 120, E.tunas, 14), emo("bb2", 214, 142, E.tunas, 14)),
      tambah("Menurutmu,", emo("tq", 150, 76, E.tanya, 30)),
      tambah("Chacha,", ...tokoh("ch", 36, 182, "Chacha")),
      tambah("Dika,", ...tokoh("dk", 84, 182, "Dika")),
      tambah("Nia,", ...tokoh("ni", 132, 182, "Nia")),
      tambah("Sari,", ...tokoh("bs", 180, 182, "Bu Sari")),
      tambah("Danu!", ...tokoh("pd", 228, 182, "Pak Danu")),
    ),
  ],
};
