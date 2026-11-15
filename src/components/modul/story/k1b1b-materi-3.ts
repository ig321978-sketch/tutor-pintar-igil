import type { AdeganStory } from "./logika-story";
import { W, emo, judul, kartu, kelompok, keranjang, pasang, teks } from "./k1b1b-gambar";
import { bersih, hapus, k, sebar, sorotkan, tambah, ubah, urutKata } from "./k1b1b-bantu";

/* ------------------------------ 1. Nol: keranjang kosong ------------------------------ */
const SUARA_N1 = "Igil membawa dua keranjang. Keranjang pertama berisi tiga apel. Keranjang kedua kosong.";
const SUARA_N2 = "Keranjang kedua tidak punya apel. Banyaknya apel di keranjang kedua adalah nol.";
const SUARA_N3 = "Kalau kita pasangkan, ketiga apel tidak punya pasangan. Semuanya bersisa.";
const SUARA_N4 = "Jadi keranjang pertama lebih banyak. Nol lebih sedikit dari tiga, dan nol adalah bilangan yang paling kecil.";
const SUARA_N5 = "Nol sering membuat anak bingung. Ingat, nol artinya tidak ada benda sama sekali. Tidak ada, ya nol.";

export const ADEGAN_NOL: AdeganStory = {
  id: "nol",
  judul: "Nol: keranjang yang kosong",
  sumber: "Materi: membandingkan dengan nol",
  latar: "#FFF1F2",
  ketukan: [
    k(
      SUARA_N1,
      tambah(0, judul("Dua keranjang"), emo("ig", 150, 66, "\u{1F989}", 30)),
      tambah("pertama", ...keranjang("ks1", 20, 100, 110, 44)),
      tambah("apel.", ...kelompok("apel", "np", 3, 86, 50, 30, 11)),
      tambah("kedua", ...keranjang("ks2", 170, 100, 110, 44)),
    ),
    k(SUARA_N2, sorotkan("kedua", "ks2"), tambah("nol.", teks("nl", 225, 90, "0", 36, W.merah))),
    k(SUARA_N3, sorotkan("bersisa.", "np0", "np1", "np2"), tambah("pasangan.", ...kartu("na", 30, 158, 240, 26, W.merahMuda, ["tidak ada pasangan"], 10))),
    k(
      SUARA_N4,
      hapus(0, "na-k", "na-t0"),
      tambah("Nol", ...kartu("nb", 100, 154, 100, 34, W.emas, ["0 < 3"], 18)),
    ),
    k(SUARA_N5, tambah("bingung.", emo("bg", 262, 60, "\u{1F914}", 30)), tambah("Ingat,", teks("nz", 14, 60, "nol = tidak ada", 9.4, W.ungu, { anchor: "start" }))),
  ],
};

/* ------------------------------ 2. Latihan 1: pensil Kira dan Malosi ------------------------------ */
const SUARA_L1 = "Latihan satu. Kira punya empat pensil dan Malosi punya lima pensil. Siapa yang punya lebih banyak?";
const SUARA_L2 = "Ayo pasangkan satu per satu. Setiap pensil Kira dipasangkan dengan satu pensil Malosi.";
const SUARA_L3 = "Satu pensil Malosi masih bersisa. Jadi, pensil siapa yang lebih banyak?";
const SUARA_L4 = "Pensil Malosi lebih banyak. Lima lebih besar dari empat. Pilih tandanya.";
const SUARA_L5 = "Mulut terbuka ke arah lima, jadi tandanya lebih besar. Betul, hebat sekali!";
const posGarisL = sebar(SUARA_L2, "Setiap", 4, 1);

export const ADEGAN_LATIHAN_SATU: AdeganStory = {
  id: "latihan-satu",
  judul: "Latihan 1: pensil Kira dan Malosi",
  sumber: "Materi: latihan memasangkan",
  latar: "#FDF2F8",
  ketukan: [
    k(
      SUARA_L1,
      tambah(0, judul("Latihan 1")),
      tambah("empat", teks("lk", 30, 46, "Kira", 9.4, W.ungu, { anchor: "start" }), ...kelompok("pensil", "pk", 4, 70, 78, 36, 11)),
      tambah("lima", teks("lm", 30, 104, "Malosi", 9.4, W.ungu, { anchor: "start" }), ...kelompok("pensil", "pm", 5, 130, 78, 36, 11)),
    ),
    k(SUARA_L2, ...posGarisL.map((p, i) => tambah(p, pasang("lg", i, 78 + i * 36, 88, 78 + i * 36, 116)))),
    k(SUARA_L3, sorotkan("bersisa.", "pm4"), tambah("bersisa.", teks("ls", 222, 156, "sisa", 9.4, W.merah))),
    k(SUARA_L4, tambah("Pilih", teks("lt", 150, 186, "5 ? 4", 26, W.ungu))),
    k(SUARA_L5, ubah("tandanya", { id: "lt", isi: "5 > 4", warna: W.hijau }), tambah("hebat", emo("ow", 250, 190, "\u{1F989}", 26))),
  ],
};

/* ------------------------------ 3. Latihan 2: pilih tanda ------------------------------ */
const SUARA_D1 = "Latihan dua. Pilih tanda yang tepat. Pertama, tujuh dan tiga. Mana yang lebih banyak?";
const SUARA_D2 = "Tujuh lebih banyak dari tiga. Mulut buaya terbuka ke arah tujuh.";
const SUARA_D3 = "Jadi tandanya lebih besar. Tujuh lebih besar dari tiga.";
const SUARA_D4 = "Sekarang yang kedua, dua dan sembilan. Mana yang lebih banyak? Pikirkan dulu.";
const SUARA_D5 = "Sembilan lebih banyak, dan dua lebih sedikit. Ujung tanda yang runcing ke dua. Jadi tandanya lebih kecil.";
const SUARA_D6 = "Hebat! Kamu pandai memilih tanda. Mulut buaya selalu terbuka ke yang lebih banyak.";

export const ADEGAN_LATIHAN_DUA: AdeganStory = {
  id: "latihan-dua",
  judul: "Latihan 2: memilih tanda",
  sumber: "Materi: latihan memilih tanda",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_D1, tambah(0, judul("Latihan 2")), tambah("Pertama,", teks("d1", 150, 110, "7 ? 3", 48, W.ungu))),
    k(SUARA_D2, sorotkan("Tujuh", "d1"), tambah("buaya", emo("db", 150, 170, "\u{1F40A}", 40))),
    k(SUARA_D3, ubah("tandanya", { id: "d1", isi: "7 > 3", warna: W.hijau })),
    k(SUARA_D4, bersih(0), tambah(0, judul("Latihan 2")), tambah("kedua,", teks("d2", 150, 110, "2 ? 9", 48, W.ungu))),
    k(SUARA_D5, sorotkan("runcing", "d2"), ubah("tandanya", { id: "d2", isi: "2 < 9", warna: W.hijau })),
    k(SUARA_D6, bersih(0), tambah(0, judul("Hebat!"), emo("ow", 150, 100, "\u{1F989}", 56)), tambah("buaya", emo("db", 150, 160, "\u{1F40A}", 36))),
  ],
};

/* ------------------------------ 4. Latihan 3: sama banyak ------------------------------ */
const SUARA_G1 = "Latihan tiga. Ada dua kelompok kelereng. Satu kelompok punya empat kelereng, kelompok yang lain juga empat.";
const SUARA_G2 = "Mari kita pasangkan satu per satu. Satu, dua, tiga, empat pasangan.";
const SUARA_G3 = "Semua kelereng punya pasangan dan tidak ada sisa. Jadi kedua kelompok sama banyak.";
const SUARA_GX = "Ingat, benda yang dibandingkan boleh berbeda. Empat kelereng dan empat bola juga sama banyak, asal semuanya berpasangan.";
const SUARA_G4 = "Tanda yang tepat adalah sama dengan. Empat sama dengan empat. Hebat sekali!";
const posGarisG = urutKata(SUARA_G2, ["satu", "dua", "tiga", "empat"], "per");

export const ADEGAN_LATIHAN_TIGA: AdeganStory = {
  id: "latihan-tiga",
  judul: "Latihan 3: sama banyak",
  sumber: "Materi: latihan sama banyak",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_G1,
      tambah(0, judul("Latihan 3")),
      tambah("Satu", ...kelompok("kelereng", "ga", 4, 66, 90, 40, 17)),
      tambah("juga", ...kelompok("kelereng", "gb", 4, 122, 90, 40, 17)),
    ),
    k(SUARA_G2, ...posGarisG.map((p, i) => tambah(p, pasang("gg", i, 90 + i * 40, 78, 90 + i * 40, 110)))),
    k(SUARA_G3, sorotkan("Semua", "ga0", "ga1", "ga2", "ga3", "gb0", "gb1", "gb2", "gb3"), tambah("sama", ...kartu("gs", 70, 152, 160, 28, W.emas, ["Sama banyak"], 12))),
    k(SUARA_GX, tambah("berbeda.", emo("gx1", 50, 188, "\u{1F535}", 22)), tambah("bola", emo("gx2", 250, 188, "\u{26BD}", 22))),
    k(SUARA_G4, hapus(0, "gs-k", "gs-t0"), tambah("sama", teks("g4", 150, 170, "4 = 4", 34, W.hijau)), tambah("Hebat", emo("ow", 252, 176, "\u{1F989}", 30))),
  ],
};

/* ------------------------------ 5. Penutup ------------------------------ */
const SUARA_P1 = "Mari kita ingat lagi. Pasangkan benda satu dengan satu. Kelompok yang bersisa adalah yang lebih banyak.";
const SUARA_P2 = "Kelompok yang habis lebih dulu adalah yang lebih sedikit. Kalau tidak ada sisa, keduanya sama banyak.";
const SUARA_P3 = "Tanda mulut buaya selalu terbuka ke kelompok yang lebih banyak. Kita juga sudah mengenal tanda sama dengan.";
const SUARA_PR = "Di rumah, coba bandingkan sendok dan piring di meja makan. Pasangkan satu dengan satu, lalu katakan mana yang lebih banyak.";
const SUARA_P4 = "Hebat sekali, anak-anak! Sampai jumpa di pelajaran berikutnya.";

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Penutup: mari ingat lagi",
  sumber: "Materi: ringkasan dan penutup",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_P1, tambah(0, judul("Mari ingat lagi")), tambah("Pasangkan", ...kartu("p1", 14, 34, 272, 34, W.hijauMuda, ["pasangkan satu dengan satu"], 9.6)), tambah("bersisa", ...kartu("p2", 14, 78, 272, 34, W.emas, ["bersisa = lebih banyak"], 9.6))),
    k(SUARA_P2, tambah("habis", ...kartu("p3", 14, 122, 272, 34, W.langit, ["habis dulu = lebih sedikit"], 9.6)), tambah("keduanya", ...kartu("p4", 14, 166, 272, 28, W.krem, ["tanpa sisa = sama banyak"], 9.6))),
    k(SUARA_P3, bersih(0), tambah(0, judul("Tiga tanda")), tambah("buaya", teks("q1", 60, 100, ">", 50, W.hijau)), tambah("lebih", teks("q2", 150, 100, "<", 50, W.hijau)), tambah("sama", teks("q3", 240, 100, "=", 50, W.hijau))),
    k(
      SUARA_PR,
      bersih(0),
      tambah(0, judul("Coba di rumah")),
      tambah("sendok", emo("rs", 80, 100, "\u{1F944}", 40)),
      tambah("piring", emo("rp", 220, 100, "\u{1F37D}", 40)),
      tambah("Pasangkan", ...kartu("rk", 50, 128, 200, 30, W.krem, ["pasangkan, lalu bandingkan"], 10)),
    ),
    k(SUARA_P4, bersih(0), tambah(0, judul("Sampai jumpa!"), emo("sj", 150, 110, "\u{1F989}", 56)), tambah("anak-anak!", emo("pa", 80, 150, "\u{1F389}", 30), emo("pb", 220, 150, "\u{1F389}", 30))),
  ],
};
