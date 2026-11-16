import type { AdeganStory } from "./logika-story";
import { W, bibit, cemara, deret, emo, garis, kartu, kotak, panah, pucukMerah, teks } from "./k6b2a-gambar";
import { bersih, hapus, k, redamkan, sorotkan, tambah, ubah } from "./k6b2a-bantu";

/* ------------------------------ 4. Latihan bersama: membandingkan bibit mangga dan jambu ------------------------------ */
export const ADEGAN_EKSPLORASI21: AdeganStory = {
  id: "eksplorasi21-paket",
  judul: "Latihan bersama: bibit mangga dan jambu",
  sumber: "Materi: bibit mangga dan jambu",
  latar: "#FFFBEB",
  ketukan: [
    k(
      "Sekarang kita berlatih bersama. Artus, ketua kelas enam B, pergi ke toko bibit untuk membeli bibit yang akan ditanam di sekolah.",
      tambah(0, teks("jud", 150, 24, "Latihan bersama: membeli bibit", 11, W.ungu)),
      tambah("Artus", emo("ar", 60, 100, "👦", 34), teks("art", 60, 122, "Artus, kelas 6B", 8)),
      tambah("toko", emo("tk", 150, 100, "🏪", 40)),
      tambah("bibit", deret("bb", 200, 110, 3, 24, (id, x, y) => bibit(id, x, y))),
    ),
    k(
      "Di toko ada dua jenis bibit. Ada dua puluh bibit mangga dan dua belas bibit jambu. Artus ingin menuliskan perbandingan keduanya.",
      bersih(0),
      tambah("jenis", teks("j0", 150, 26, "dua jenis bibit", 12, W.ungu)),
      tambah("mangga", ...kartu("gm", 14, 44, 132, 64, "#FED7AA", ["20 bibit", "mangga"], 11), emo("em", 80, 146, "🥭", 36)),
      tambah("jambu", ...kartu("gj", 154, 44, 132, 64, "#DCFCE7", ["12 bibit", "jambu"], 11), emo("ej", 220, 146, "🍐", 36)),
      tambah("Artus", teks("aq", 150, 192, "Artus: tulis perbandingannya", 9.4, W.ungu)),
    ),
    k(
      "Pertanyaan a. Jenis bibit mana yang lebih banyak? Bibit mangga, karena dua puluh lebih banyak daripada dua belas.",
      hapus(0, "aq"),
      tambah("Pertanyaan", teks("qa", 150, 176, "a. jenis mana lebih banyak?", 9.4, W.ungu)),
      sorotkan("mangga", "gm-k"),
      tambah("karena", teks("ka", 150, 198, "20 lebih banyak dari 12", 9, W.hijau)),
    ),
    k(
      "Pertanyaan b. Tuliskan rasio bibit mangga terhadap bibit jambu. Kita sebut mangga dulu, jadi kita tulis dua puluh banding dua belas.",
      hapus(0, "qa", "ka"),
      redamkan(0, "gm-k"),
      tambah("Pertanyaan", teks("qb", 150, 176, "b. rasio mangga terhadap jambu", 9.4, W.ungu)),
      tambah("banding", teks("rb", 150, 200, "20 : 12", 18, W.biru)),
    ),
    k(
      "Rasio ini bisa disederhanakan. Faktor persekutuan terbesar dari dua puluh dan dua belas adalah empat, jadi kita bagi kedua angkanya dengan empat.",
      bersih(0),
      tambah("disederhanakan", teks("s0", 150, 28, "disederhanakan dengan FPB", 12, W.ungu)),
      tambah("Faktor", teks("s1", 85, 100, "20 : 12", 24, W.biru)),
      tambah("empat", teks("s2", 150, 150, "FPB dari 20 dan 12 adalah 4", 11, W.hijau)),
      tambah("bagi", teks("s3", 150, 70, "dibagi 4", 10, W.merah), panah("s4", 134, 108, 34, 0, W.merah, 2.5, { gambar: true })),
    ),
    k(
      "Dua puluh dibagi empat adalah lima, dan dua belas dibagi empat adalah tiga. Jadi rasio mangga terhadap jambu paling sederhana adalah lima banding tiga.",
      tambah("lima", teks("s5", 150, 174, "20 dibagi 4 = 5", 10, W.biru)),
      tambah("belas", teks("s6", 150, 192, "12 dibagi 4 = 3", 10, W.biru)),
      tambah("Jadi", teks("s7", 218, 100, "= 5 : 3", 24, W.hijau)),
    ),
    k(
      "Baca dengan bahasa sehari-hari: setiap lima bibit mangga ada tiga bibit jambu. Kalimat ini menjelaskan arti rasio lima banding tiga.",
      bersih(0),
      tambah(0, teks("b0", 150, 24, "dibaca dalam kalimat", 12, W.ungu)),
      tambah("setiap", balon0("bl", 150, 40, ["setiap 5 bibit mangga", "ada 3 bibit jambu"])),
      tambah("mangga", ...deret("bm", 24, 120, 5, 24, (id, x, y) => [emo(id, x, y, "🥭", 20)])),
      tambah("jambu", ...deret("bj", 176, 120, 3, 24, (id, x, y) => [emo(id, x, y, "🍐", 20)])),
      tambah("banding", teks("b9", 150, 182, "5 : 3", 28, W.biru)),
    ),
    k(
      "Sekarang coba kamu ucapkan sendiri kalimat itu dengan suara pelan. Kalau kalimatmu cocok dengan gambar bibitnya, berarti rasio yang kamu tulis sudah benar.",
      bersih(0),
      tambah(0, teks("u0", 150, 26, "periksa dengan gambar", 12, W.ungu)),
      tambah("ucapkan", emo("u1", 60, 100, "💬", 40)),
      tambah("gambar", ...deret("um", 40, 160, 5, 24, (id, x, y) => [emo(id, x, y, "🥭", 20)]), ...deret("uj", 180, 160, 3, 24, (id, x, y) => [emo(id, x, y, "🍐", 20)])),
      tambah("benar", emo("u3", 240, 100, "✅", 40)),
    ),
    k(
      "Pertanyaan c. Bagaimana kalau jambu disebut lebih dulu? Rasio jambu terhadap mangga adalah dua belas banding dua puluh, atau tiga banding lima.",
      bersih(0),
      tambah(0, teks("c0", 150, 26, "c. jambu terhadap mangga", 11, W.ungu)),
      tambah("jambu", emo("c3", 70, 160, "🍐", 30)),
      tambah("mangga", emo("c4", 230, 160, "🥭", 30)),
      tambah("Rasio", teks("c1", 150, 96, "12 : 20", 26, W.biru)),
      ubah("atau", { id: "c1", isi: "12 : 20  =  3 : 5", u: 22, warna: W.hijau }),
    ),
    k(
      "Perhatikan, lima banding tiga dan tiga banding lima punya arti yang berbeda. Yang disebut lebih dulu selalu ditulis di depan.",
      bersih(0),
      tambah(0, teks("d0", 150, 24, "arah rasio", 12, W.ungu)),
      tambah("lima", ...kartu("d1", 20, 40, 120, 54, "#FED7AA", ["5 : 3"], 24), teks("d1t", 80, 112, "mangga : jambu", 9, W.coklat)),
      tambah("tiga@2", ...kartu("d2", 160, 40, 120, 54, "#DCFCE7", ["3 : 5"], 24), teks("d2t", 220, 112, "jambu : mangga", 9, W.hijau)),
      tambah("berbeda", teks("d3", 150, 142, "berbeda arti", 13, W.merah)),
      tambah("depan", teks("d4", 150, 176, "disebut dulu, ditulis dulu", 11, W.biru)),
    ),
  ],
};

/** Balon sederhana dua baris, dipakai sekali di adegan ini. */
function balon0(id: string, cx: number, y: number, baris: string[]) {
  return [kotak(`${id}-k`, cx - 110, y, 220, baris.length * 18 + 10, W.krem, W.biru, { rx: 8 }), ...baris.map((b, i) => teks(`${id}-t${i}`, cx, y + 17 + i * 18, b, 10.5))];
}

/* ------------------------------ 5. Menanam pohon di kebun sekolah ------------------------------ */
const PM = [30, 55, 80, 105];
const CM = [160, 182, 204, 226, 248, 270];
const pm = (i: number) => pucukMerah(`pm${i}`, PM[i], 150);
const cm = (i: number) => cemara(`cm${i}`, CM[i], 150);

export const ADEGAN_EKSPLORASI22: AdeganStory = {
  id: "eksplorasi22-kebun",
  judul: "Menanam pohon di kebun sekolah",
  sumber: "Materi: menanam pohon di kebun",
  latar: "#F0FDF4",
  ketukan: [
    k(
      "Pak Malosi mengajak siswa menanam pohon di kebun sekolah. Di sisi kiri kebun ditanam pohon pucuk merah, dan di sisi kanan ditanam pohon cemara.",
      tambah(0, teks("jud", 150, 24, "Kebun sekolah", 12, W.ungu), kotak("tanah", 0, 152, 300, 22, "#A16207", "#78350F", { rx: 0 })),
      tambah("kiri", pm(3), teks("lk", 68, 190, "kiri: pucuk merah", 8.6, W.merah)),
      tambah("kanan", cm(0), teks("lr", 225, 190, "kanan: cemara", 8.6, W.hijau)),
    ),
    k(
      "Pohon pucuk merah tumbuh besar dan butuh lahan lebih luas. Karena itu, untuk setiap dua pohon pucuk merah, ditanam tiga pohon cemara.",
      sorotkan("besar", "pm3-m"),
      redamkan("setiap", "pm3-m"),
      tambah("dua", pm(2), teks("n2", 92, 112, "2", 20, W.merah)),
      tambah("tiga", cm(1), cm(2), teks("n3", 182, 112, "3", 20, W.hijau)),
    ),
    k(
      "Pertanyaan a. Jenis pohon apa yang lebih banyak ditanam? Kalau kita lihat gambarnya, pohon cemara lebih banyak.",
      hapus(0, "n2", "n3"),
      tambah("gambarnya", pm(0), pm(1)),
      tambah("cemara", cm(3), cm(4), cm(5)),
      sorotkan("banyak@2", "cm0-c", "cm1-c", "cm2-c", "cm3-c", "cm4-c", "cm5-c"),
    ),
    k(
      "Hitung satu per satu. Pohon pucuk merah ada empat, dan pohon cemara ada enam.",
      redamkan(0, "cm0-c", "cm1-c", "cm2-c", "cm3-c", "cm4-c", "cm5-c"),
      tambah("pucuk", teks("c4", 68, 112, "4", 30, W.merah)),
      tambah("cemara", teks("c6", 220, 112, "6", 30, W.hijau)),
    ),
    k(
      "Perbandingan dua besaran yang sejenis disebut rasio. Rasio pucuk merah terhadap cemara adalah empat banding enam, ditulis empat titik dua enam.",
      hapus(0, "c4", "c6"),
      tambah("rasio.", teks("r1", 150, 44, "rasio", 11, W.ungu)),
      tambah("ditulis", teks("r46", 110, 82, "4 : 6", 22, W.biru)),
    ),
    k(
      "Perhatikan, rasio ini membandingkan banyak pohon pucuk merah dengan banyak pohon cemara. Angka empat dan enam adalah banyak pohon yang kita hitung satu per satu.",
      tambah("pucuk", teks("bn1", 68, 128, "4 pohon", 9, W.merah)),
      tambah("cemara", teks("bn2", 220, 128, "6 pohon", 9, W.hijau)),
    ),
    k(
      "Rasio empat banding enam artinya setiap empat pucuk merah ada enam cemara. Rasio ini bisa disederhanakan dengan faktor persekutuan terbesar, atau FPB, yaitu dua. Jadi hasilnya dua banding tiga.",
      hapus(0, "lk", "lr", "bn1", "bn2"),
      tambah("setiap", teks("bt", 150, 190, "setiap 4 pucuk merah ada 6 cemara", 8.4, W.biru)),
      tambah("FPB", teks("bg", 150, 58, "FPB dari 4 dan 6 adalah 2", 9, W.merah)),
      tambah("hasilnya", teks("r23", 205, 82, "= 2 : 3", 22, W.hijau)),
    ),
    k(
      "Sekarang kita balik urutannya. Rasio cemara terhadap pucuk merah adalah enam banding empat, atau tiga banding dua. Jadi rasio a banding b tidak sama artinya dengan b banding a.",
      hapus(0, "r46", "r23", "bg", "bt", "r1"),
      tambah("Rasio", teks("c7a", 150, 44, "cemara terhadap pucuk merah", 9, W.ungu)),
      tambah("enam", teks("c7b", 100, 82, "6 : 4", 22, W.biru)),
      tambah("tiga", teks("c7c", 200, 82, "= 3 : 2", 22, W.hijau)),
      tambah("sama", teks("c7d", 150, 116, "a : b tidak sama dengan b : a", 9, W.merah)),
    ),
    k(
      "Rasio dapat ditulis dengan titik dua, atau sebagai pecahan a per b. Keduanya dibaca rasio a terhadap b, dan kita cukup menulis angkanya saja.",
      hapus(0, "c7a", "c7b", "c7c", "c7d"),
      tambah("titik", teks("w1", 80, 70, "a : b", 22, W.biru)),
      tambah("pecahan", teks("w2", 200, 62, "a", 20, W.biru), garis("w3", 186, 68, 28, 0, W.biru, 2), teks("w4", 200, 90, "b", 20, W.biru)),
      tambah("Keduanya", teks("w5", 150, 116, "dibaca: a terhadap b", 10, W.hijau)),
      tambah("angkanya", teks("w6", 150, 40, "cukup tulis angkanya", 9, W.ungu)),
    ),
    k(
      "Mari kita coba bersama. Bagaimana kalau di kebun ada enam pucuk merah dan sembilan cemara? Rasionya enam banding sembilan, dan FPB dari enam dan sembilan adalah tiga, jadi hasilnya dua banding tiga.",
      bersih(0),
      tambah(0, teks("t0", 150, 24, "coba bersama", 12, W.ungu)),
      tambah("enam", ...deret("tp", 40, 100, 6, 18, (id, x, y) => pucukMerah(id, x, y)), teks("tpt", 80, 122, "6 pucuk merah", 8.6, W.merah)),
      tambah("sembilan", ...deret("tc", 160, 100, 9, 14, (id, x, y) => cemara(id, x, y)), teks("tct", 216, 122, "9 cemara", 8.6, W.hijau)),
      tambah("banding", teks("t1", 80, 172, "6 : 9", 22, W.biru)),
      tambah("FPB", teks("t2", 150, 146, "FPB dari 6 dan 9 adalah 3", 9, W.merah)),
      tambah("hasilnya", teks("t3", 220, 172, "= 2 : 3", 22, W.hijau)),
    ),
    k(
      "Kita simpulkan, setiap dua pucuk merah selalu ada tiga cemara. Rasio paling sederhana membuat perbandingan itu mudah dibaca dan diingat.",
      bersih(0),
      tambah(0, teks("s0", 150, 28, "kesimpulan kebun kita", 11, W.ungu)),
      tambah("setiap", ...deret("sp", 90, 110, 2, 30, (id, x, y) => pucukMerah(id, x, y)), ...deret("sc", 170, 110, 3, 26, (id, x, y) => cemara(id, x, y))),
      tambah("tiga", teks("s1", 150, 146, "setiap 2 pucuk merah ada 3 cemara", 9.4, W.biru)),
      tambah("sederhana", kotak("s2", 70, 158, 160, 34, W.krem, W.ungu, { rx: 10 }), teks("s3", 150, 180, "rasio sederhana: 2 : 3", 11, W.ungu)),
    ),
  ],
};
