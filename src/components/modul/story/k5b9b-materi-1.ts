import type { AdeganStory } from "./logika-story";
import { SEPATU, W, barisTempat, emo, kartu, kartuSepatu, kepalaTempat, kotak, panah, teks } from "./k5b9b-gambar";
import { bersih, hapus, k, redamkan, sorotkan, tambah, ubah } from "./k5b9b-bantu";

function kartuAngkaPapan(id: string, x: number, isi: string, nama: string) {
  return [kotak(`${id}-k`, x, 64, 94, 56, W.putih, W.biru, { rx: 8 }), teks(`${id}-n`, x + 47, 82, nama, 7.6, W.ungu), teks(`${id}-t`, x + 47, 108, isi, 16)];
}

/* ------------------------------ 1. Pembuka Sub-Bab B (hlm. 284) ------------------------------ */
export const ADEGAN_PEMBUKA_B: AdeganStory = {
  id: "pembuka-b",
  judul: "Pembuka Sub-Bab B: membandingkan dan mengurutkan",
  sumber: "Buku Siswa hlm. 284; Buku Panduan Guru hlm. 404–405",
  latar: "#EEF2FF",
  kutipan: ["Mengurutkan dan Membandingkan Bilangan Sampai"],
  ketukan: [
    k(
      "Selamat datang di Sub-Bab B. Di sini kita belajar membandingkan dua bilangan dan mengurutkan bilangan sampai 1.000.000.",
      tambah(0, teks("jud", 150, 26, "Sub-Bab B", 13, W.ungu)),
      tambah("membandingkan", kartu("c1", 20, 54, 120, 56, W.hijauMuda, ["membandingkan", "dua bilangan"], 9)),
      tambah("mengurutkan", kartu("c2", 160, 54, 120, 56, W.muda, ["mengurutkan", "beberapa bilangan"], 9)),
      tambah("1.000.000", teks("jt", 150, 150, "sampai 1.000.000", 14, W.merah)),
    ),
    k(
      "Sebelum membandingkan, ingat dulu nilai tempat. Dari kiri ke kanan: ratus ribuan, puluh ribuan, ribuan, ratusan, puluhan, dan satuan.",
      bersih(0),
      tambah(0, teks("jud", 150, 26, "Ingat nilai tempat", 13, W.ungu)),
      tambah("Dari", kepalaTempat("kp", 52), barisTempat("ct", 72, "599198", "contoh")),
      tambah("kiri", panah("pk", 56, 112, 232, 0, W.merah, 2, { gambar: true }), teks("pkt", 172, 130, "dari kiri nilainya paling besar", 8.6, W.merah)),
      sorotkan(10, "kpk0"),
      redamkan(12, "kpk0"),
      sorotkan(12, "kpk1"),
      redamkan(14, "kpk1"),
      sorotkan(14, "kpk2"),
      redamkan(15, "kpk2"),
      sorotkan(15, "kpk3"),
      redamkan(16, "kpk3"),
      sorotkan(16, "kpk4"),
      redamkan(18, "kpk4"),
      sorotkan(18, "kpk5"),
    ),
    k(
      "Apersepsi dari Buku Panduan Guru: guru menulis dua bilangan lima angka di papan tulis, lalu bertanya, bilangan mana yang lebih besar dan mana yang lebih kecil?",
      bersih(0),
      tambah(0, teks("jud", 150, 26, "Pemanasan di papan tulis", 13, W.ungu)),
      tambah("papan", kotak("pp", 24, 44, 252, 120, "#14532D", W.coklat, { tebal: 3, rx: 6 }), emo("gu", 262, 190, "👩", 26)),
      tambah("dua", kartuAngkaPapan("n1", 44, "98.765", "contoh 1"), kartuAngkaPapan("n2", 162, "98.675", "contoh 2")),
      tambah("lebih", teks("pq", 150, 150, "mana yang lebih besar?", 12, W.emas)),
    ),
    k(
      "Tujuan kita: membandingkan dua bilangan cacah sampai 1.000.000, lalu mengurutkan beberapa bilangan cacah dari yang terkecil atau dari yang terbesar.",
      bersih(0),
      tambah(0, teks("jud", 150, 26, "Tujuan Sub-Bab B", 13, W.ungu)),
      tambah("membandingkan", kartu("t1", 30, 54, 240, 40, W.hijauMuda, ["bandingkan dua bilangan", "sampai 1.000.000"], 9.4)),
      tambah("mengurutkan", kartu("t2", 30, 108, 240, 44, W.muda, ["urutkan beberapa bilangan", "kecil ke besar atau besar ke kecil"], 9.4)),
    ),
  ],
};

/* ------------------------------ 2. Eksplorasi 9.2A: tiga harga sepatu (hlm. 284) ------------------------------ */
export const ADEGAN_SEPATU_HARGA: AdeganStory = {
  id: "sepatu-harga",
  judul: "Eksplorasi 9.2A: harga sepatu Komang, Lukas, dan Nisa",
  sumber: "Buku Siswa hlm. 284",
  latar: "#FFF7ED",
  kutipan: ["Eksplorasi 9.2A", "Harga Sepatu Komang", "Rp342.231,00", "Rp432.543,00", "Rp232.231,00", "Bagaimana caramu mengurutkan harga dari yang termahal", "sampai yang termurah? Ayo kita selidiki!"],
  ketukan: [
    k(
      "Eksplorasi 9.2A. Tiga anak membeli sepatu. Harga sepatu Komang 342.231 rupiah, sepatu Lukas 432.543 rupiah, dan sepatu Nisa 232.231 rupiah.",
      tambah(0, teks("jud", 150, 24, "Eksplorasi 9.2A", 13, W.ungu)),
      tambah("Komang", kartuSepatu("s1", 10, 48, "Komang", "342.231", W.krem)),
      tambah("Lukas", kartuSepatu("s2", 107, 48, "Lukas", "432.543", W.hijauMuda)),
      tambah("Nisa", kartuSepatu("s3", 204, 48, "Nisa", "232.231", W.muda)),
    ),
    k(
      "Pertanyaan pertama: bagaimana caramu mengurutkan harga dari yang termahal sampai yang termurah? Ayo kita selidiki!",
      tambah("bagaimana", teks("q1", 150, 150, "urutkan dari termahal sampai termurah", 11, W.merah)),
      sorotkan("selidiki!", "s1-k", "s2-k", "s3-k"),
    ),
    k(
      "Ketiga harga ini tampak mirip, sebab semuanya terdiri atas enam angka. Karena itu kita bandingkan angka demi angka pada tiap nilai tempat.",
      hapus(0, "q1"),
      ubah(0, { id: "s1-k", sorot: false }, { id: "s2-k", sorot: false }, { id: "s3-k", sorot: false }),
      tambah("enam", teks("e1", 53, 142, "6 angka", 8, W.hijau), teks("e2", 150, 142, "6 angka", 8, W.hijau), teks("e3", 247, 142, "6 angka", 8, W.hijau)),
      tambah("angka", teks("q2", 150, 176, "bandingkan angka demi angka", 11, W.ungu)),
    ),
    k(
      "Langkah berikutnya, tuliskan ketiga harga itu pada tabel nilai tempat, satu angka untuk satu kolom, supaya perbedaannya mudah terlihat.",
      hapus("langkah", "e1", "e2", "e3", "q2"),
      tambah("tuliskan", panah("pa", 150, 146, 0, 26, W.merah, 3, { gambar: true })),
      tambah("tabel", kartu("tb", 70, 178, 160, 26, W.krem, ["tabel nilai tempat"], 10)),
    ),
  ],
};

/* ------------------------------ 3. Tabel nilai tempat tiga sepatu (hlm. 285) ------------------------------ */
const Y_TABEL = 56;
const yBaris = (i: number) => Y_TABEL + 18 + i * 22;

export const ADEGAN_SEPATU_TABEL: AdeganStory = {
  id: "sepatu-tabel",
  judul: "Eksplorasi 9.2A: mengisi tabel nilai tempat tiga sepatu",
  sumber: "Buku Siswa hlm. 285",
  latar: "#FEFCE8",
  kutipan: ["Harga sepatu Komang", "Harga sepatu Lukas", "Harga sepatu Nisa", "Ribuan Ratusan Puluhan Satuan"],
  ketukan: [
    k(
      "Kita isi tabelnya. Sepatu Komang 342.231: ratus ribuan 3, puluh ribuan 4, ribuan 2, ratusan 2, puluhan 3, dan satuan 1.",
      tambah(0, teks("jud", 150, 22, "Tabel nilai tempat", 12, W.ungu), teks("cap", 150, 44, "Komang: 342.231", 11, W.merah)),
      tambah(0, kepalaTempat("kp", Y_TABEL)),
      tambah("Komang", barisTempat("r0", yBaris(0), SEPATU[0].angka, "Komang", W.krem)),
    ),
    k(
      "Sepatu Lukas 432.543: ratus ribuan 4, puluh ribuan 3, ribuan 2, ratusan 5, puluhan 4, dan satuan 3.",
      ubah(0, { id: "cap", isi: "Lukas: 432.543" }),
      tambah("Lukas", barisTempat("r1", yBaris(1), SEPATU[1].angka, "Lukas", W.hijauMuda)),
    ),
    k(
      "Sepatu Nisa 232.231: ratus ribuan 2, puluh ribuan 3, ribuan 2, ratusan 2, puluhan 3, dan satuan 1.",
      ubah(0, { id: "cap", isi: "Nisa: 232.231" }),
      tambah("Nisa", barisTempat("r2", yBaris(2), SEPATU[2].angka, "Nisa", W.muda)),
    ),
    k(
      "Perhatikan, angka ketiga sepatu tampak mirip, tetapi nilainya berbeda. Yang kita lihat adalah angka pada tiap kolom, mulai dari kiri.",
      ubah(0, { id: "cap", isi: "bandingkan tiap kolom" }),
      sorotkan("kiri.", "r0c0", "r1c0", "r2c0"),
      tambah("kiri.", teks("hint", 150, 180, "mulai dari kolom paling kiri", 11, W.merah)),
    ),
  ],
};
