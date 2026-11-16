import type { AdeganStory } from "./logika-story";
import { W, emo, judul, kartu, kotak, panah, penggaris, poligon, tandaSama, teks, titikSegitiga } from "./k5b4b-gambar";
import { bersih, k, tambah } from "./k5b4b-bantu";

/* ------------------------------ 1. Pembuka Subbab B (Panduan Guru hlm. 116 dan 128) ------------------------------ */
const P6 = titikSegitiga(6, 3, 5, 18);

export const ADEGAN_PEMBUKA: AdeganStory = {
  id: "pembuka-b",
  judul: "Subbab B: Keliling Segitiga",
  sumber: "Panduan Guru hlm. 116 dan 128",
  latar: "#EFF6FF",
  kutipan: [
    "B. Keliling Segitiga",
    "Menemukan keliling berbagai jenis segitiga",
    "(segitiga sembarang, segitiga sama sisi,",
    "dan segitiga sama kaki).",
    "Pada Subbab B ini, peserta didik diberi pengalaman belajar berupa penemuan",
    "terbimbing terhadap cara-cara menemukan keliling segitiga.",
    "peserta didik langsung mengukur panjang sisi-sisi segitiga yang ada pada",
    "buku dan menjumlahkannya untuk memperoleh keliling segitiga tersebut.",
    "mula-mula diminta menemukan rumus",
    "keliling segitiga sembarang. Selanjutnya, kegiatan penemuan dikembangkan",
    "untuk segitiga sama sisi dan sama kaki.",
    "peserta didik ditantang",
    "untuk menggeneralisasi rumus umum dari keliling segitiga tersebut.",
  ],
  ketukan: [
    k(
      "Subbab B, Keliling Segitiga. Di Subbab A kita sudah tahu bahwa keliling adalah panjang jalur yang mengelilingi tepi bangun datar. Sekarang gagasan itu kita pakai pada segitiga.",
      tambah(0, judul("B. Keliling Segitiga")),
      tambah("tepi", poligon("tg", 24, 74, P6, W.langit, W.biru, { tebal: 2.4 })),
      tambah("Sekarang", emo("e1", 215, 108, "🔺", 30)),
      tambah("segitiga.", teks("kt", 215, 146, "keliling segitiga", 9.4, W.hijau)),
    ),
    k(
      "Menurut skema pembelajaran, subbab ini mendapat waktu empat jam pelajaran. Tujuannya menemukan keliling tiga jenis segitiga: segitiga sembarang, segitiga sama sisi, dan segitiga sama kaki.",
      bersih(0),
      tambah(0, judul("Waktu dan tujuan")),
      tambah("waktu", ...kartu("wk", 90, 32, 120, 28, W.emas, ["waktu: 4 JP"], 10)),
      tambah("sembarang,", ...kartu("j1", 30, 70, 240, 30, W.langit, ["segitiga sembarang"], 9.4)),
      tambah("sisi,", ...kartu("j2", 30, 108, 240, 30, W.hijauMuda, ["segitiga sama sisi"], 9.4)),
      tambah("kaki.", ...kartu("j3", 30, 146, 240, 30, W.pink, ["segitiga sama kaki"], 9.4)),
    ),
    k(
      "Pengalaman belajarnya penemuan terbimbing, berbentuk hands-on activity. Peserta didik langsung mengukur panjang sisi-sisi segitiga yang ada di buku, lalu menjumlahkannya.",
      bersih(0),
      tambah(0, judul("Hands-on activity")),
      tambah("terbimbing,", teks("tb", 150, 40, "penemuan terbimbing", 9.4, W.hijau)),
      tambah("mengukur", emo("rg", 40, 100, "📏", 30), ...kartu("uk", 66, 76, 90, 40, W.langit, ["ukur sisi"], 9.4)),
      tambah("lalu", panah("pa", 160, 96, 34, 0, W.biru, 2.4, { gambar: true })),
      tambah("menjumlahkannya.", ...kartu("jm", 200, 76, 90, 40, W.krem, ["jumlahkan"], 9.4)),
    ),
    k(
      "Polanya berjenjang. Mula-mula peserta didik menemukan rumus keliling segitiga sembarang. Lalu penemuan dikembangkan untuk segitiga sama sisi, dan terakhir segitiga sama kaki.",
      bersih(0),
      tambah(0, judul("Polanya berjenjang")),
      tambah("Mula-mula", ...kartu("p1", 30, 34, 240, 34, W.langit, ["1. segitiga sembarang"], 9.4)),
      tambah("Lalu", ...kartu("p2", 30, 80, 240, 34, W.hijauMuda, ["2. segitiga sama sisi"], 9.4)),
      tambah("terakhir", ...kartu("p3", 30, 126, 240, 34, W.pink, ["3. segitiga sama kaki"], 9.4)),
    ),
    k(
      "Di akhir sesi, peserta didik ditantang menggeneralisasi rumus umum keliling segitiga. Jadi kita tidak diberi rumus. Kita yang menemukannya, lalu menuliskannya dengan kata-kata.",
      bersih(0),
      tambah(0, judul("Menemukan rumus umum")),
      tambah("ditantang", teks("tq", 70, 110, "?", 50, W.merah)),
      tambah("rumus", ...kartu("ru", 110, 70, 170, 40, W.krem, ["rumus umum", "keliling segitiga"], 9.4)),
      tambah("menemukannya,", emo("bl", 195, 150, "💡", 28)),
      tambah("kata-kata.", teks("kk", 150, 192, "ditulis dengan kata-kata", 9.4, W.hijau)),
    ),
  ],
};

/* ------------------------------ 2. Persiapan: sarana, apersepsi, pemanasan (Panduan Guru hlm. 128 dan 129) ------------------------------ */
const T_KAKI = titikSegitiga(4, 6, 6, 10);
const T_SAMA = titikSegitiga(5, 5, 5, 10);
const T_BEBAS = titikSegitiga(6, 3, 5, 10);
const T_UKUR = titikSegitiga(7, 4, 5, 14);

export const ADEGAN_PERSIAPAN: AdeganStory = {
  id: "persiapan",
  judul: "Sarana, apersepsi, dan pemanasan",
  sumber: "Panduan Guru hlm. 128–129",
  latar: "#FFF7ED",
  kutipan: [
    "Alat tulis: pulpen, pensil, penggaris, spidol.",
    "LCD Projector dan Power Point Presentation Slide (PPT) yang menampilkan",
    "gambar-gambar segitiga sebagaimana tercantum di buku siswa.",
    "Jika sekolah tidak memiliki sarana tersebut,",
    "dapat menggunakan gambar-gambar cetak yang ditempel di papan tulis.",
    "Guru menyiapkan penggaris cadangan untuk mengantisipasi jika ada",
    "peserta didik yang lupa membawa penggaris.",
    "Apersepsi",
    "peserta didik harus sudah mampu membedakan segitiga berdasarkan panjang",
    "sisinya.",
    "tanya jawab mengenai jenis segitiga yang disajikan pada buku siswa.",
    "Untuk dapat menjawabnya, peserta didik juga diminta langsung mengukur panjang sisi-",
    "sisinya dengan menggunakan penggaris.",
    "Kegiatan mengukur panjang sisi-sisi segitiga pada Eksplorasi 4.3 secara",
    "langsung dengan menggunakan penggaris dapat menjadi sebuah aktivitas",
    "pemanasan.",
  ],
  ketukan: [
    k(
      "Sarana yang dibutuhkan: alat tulis berupa pulpen, pensil, penggaris, dan spidol. Ditambah LCD projector dan slide yang menampilkan gambar segitiga seperti di buku siswa.",
      tambah(0, judul("Sarana dan media")),
      tambah("alat", ...kartu("a1", 14, 34, 128, 34, W.langit, ["alat tulis"], 9.4)),
      tambah("penggaris,", ...kartu("a2", 158, 34, 128, 34, W.hijauMuda, ["penggaris"], 9.4)),
      tambah("projector", ...kartu("a3", 14, 80, 272, 34, W.krem, ["LCD projector dan slide segitiga"], 9.4)),
      tambah("gambar", emo("m1", 70, 160, "✏", 30), emo("m2", 150, 160, "📏", 30), emo("m3", 230, 160, "📽", 30)),
    ),
    k(
      "Kalau sekolah tidak punya projector, gambar segitiga dicetak lalu ditempel di papan tulis. Guru juga menyiapkan penggaris cadangan untuk peserta didik yang lupa membawa penggaris.",
      bersih(0),
      tambah(0, judul("Kalau tidak ada projector")),
      tambah("dicetak", kotak("pb", 20, 34, 170, 130, W.hijauMuda, W.coklat, { rx: 4, tebal: 2 }), teks("pbt", 105, 156, "papan tulis", 8.6, W.coklat)),
      tambah("ditempel", poligon("pt", 52, 80, titikSegitiga(6, 3, 5, 18), W.langit, W.biru)),
      tambah("cadangan", ...penggaris("pg", 206, 96, 6, 12), teks("pgt", 245, 128, "cadangan", 9, W.hijau)),
    ),
    k(
      "Apersepsi: peserta didik harus sudah mampu membedakan segitiga berdasarkan panjang sisinya. Guru mengajak tanya jawab tentang jenis segitiga yang disajikan di buku.",
      bersih(0),
      tambah(0, judul("Apersepsi")),
      tambah("membedakan", poligon("a1", 20, 100, T_BEBAS, W.langit), poligon("a2", 112, 87, T_SAMA, W.hijauMuda), poligon("a3", 204, 73, T_KAKI, W.pink), ...tandaSama("a2", 112, 87, T_SAMA, [0, 1, 2]), ...tandaSama("a3", 204, 73, T_KAKI, [1, 2])),
      tambah("sisinya.", teks("n1", 50, 150, "sembarang", 8.6), teks("n2", 142, 150, "sama sisi", 8.6), teks("n3", 224, 150, "sama kaki", 8.6)),
      tambah("jenis", teks("o1", 50, 166, "semua beda", 8), teks("o2", 142, 166, "ketiga sama", 8), teks("o3", 224, 166, "dua sama", 8)),
    ),
    k(
      "Untuk menjawabnya, peserta didik mengukur panjang sisi-sisinya langsung dengan penggaris. Kegiatan mengukur itu juga menjadi pemanasan.",
      bersih(0),
      tambah(0, judul("Pemanasan: mengukur sisi")),
      tambah("mengukur", poligon("ps", 24, 50, T_UKUR, W.langit, W.biru)),
      tambah("langsung", ...penggaris("pr", 24, 118, 7, 14)),
      tambah("pemanasan.", ...kartu("pm", 160, 52, 128, 56, W.krem, ["pemanasan:", "mengukur sisi"], 9.4)),
    ),
    k(
      "Catatan guru: Panduan Guru menyebut pemanasan ini pada Eksplorasi empat titik tiga, padahal kegiatan mengukur sisi segitiga ada pada Eksplorasi empat titik dua.",
      bersih(0),
      tambah(0, judul("Catatan guru", W.merah)),
      tambah("tiga,", ...kartu("c1", 30, 40, 240, 44, W.merahMuda, ["tertulis di Panduan Guru:", "Eksplorasi 4.3"], 9.4)),
      tambah("padahal", emo("c1e", 150, 106, "❌", 18)),
      tambah("dua.", ...kartu("c2", 30, 120, 240, 44, W.hijauMuda, ["seharusnya:", "Eksplorasi 4.2"], 9.4), emo("c2e", 150, 186, "✅", 16)),
    ),
  ],
};
