import type { AdeganStory } from "./logika-story";
import { W, balon, emo, frac, garis, judul, kartu, kotak, panah, teks, tangki } from "./k6b1a-gambar";
import { bersih, k, tambah, warnai } from "./k6b1a-bantu";

/* ------------------------------ 1. Pembuka bab: Agam, Ayah, dan penampungan air (hlm. 1 sampai 3) ------------------------------ */
export const ADEGAN_PEMBUKA: AdeganStory = {
  id: "pembuka-air",
  judul: "Pembuka Bab: Agam dan penampungan air",
  sumber: "Buku Siswa hlm. 1–3",
  latar: "#ECFEFF",
  kutipan: [
    "Pecahan dan Desimal",
    "Agam menghampiri ayahnya yang sedang mengambil air di penampungan",
    "air untuk menyirami tanaman di kebunnya",
    "Tapi apakah persediaan air di",
    "Sekarang kan masih",
    "musim kemarau",
    "Wah syukurlah",
    "Seratus",
    "Ini juga sudah Agam",
    "Namanya pembagian",
    "membuang-buang air karena",
    "Agam akan menggunakan",
  ],
  ketukan: [
    k(
      "Bab 1 Pecahan dan Desimal dimulai di kebun. Agam menghampiri Ayah yang sedang mengambil air di penampungan untuk menyirami tanaman.",
      tambah(0, judul("Bab 1 Pecahan dan Desimal")),
      tambah("Agam", emo("ag", 50, 168, "👦", 32), teks("agt", 50, 184, "Agam", 8)),
      tambah("Ayah", emo("ay", 252, 168, "👨", 32), teks("ayt", 252, 184, "Ayah", 8)),
      tambah("penampungan", tangki("tk", 112, 44, 76, 100, 3, 0), teks("tkt", 150, 160, "penampungan air", 9, W.hijau)),
    ),
    k(
      "Agam bertanya apakah air masih banyak, sebab sekarang musim kemarau. Ayah menjawab, air masih cukup untuk hari ini.",
      tambah("bertanya", balon("bg", 62, 62, ["air masih banyak,", "Yah?"], 92, W.putih, 7.2)),
      tambah("kemarau", emo("mt", 262, 58, "☀", 30, { warna: W.emas })),
      tambah("menjawab", balon("by", 242, 100, ["masih cukup", "untuk hari ini"], 84, W.krem, 7.2)),
    ),
    k(
      "Menurut Ayah, masih dua per tiga bagian penampungan yang terisi.",
      bersih(0),
      tambah(0, judul("isi penampungan")),
      tambah(0, tangki("tk", 70, 38, 70, 120, 3, 0)),
      warnai("dua", W.air, "tk-r1", "tk-r2"),
      tambah("tiga", frac("f23", 200, 98, 2, 3, 22, W.biru), teks("ft", 200, 146, "bagian terisi", 9, W.hijau)),
    ),
    k(
      "Ayah bertanya, misalnya hari ini kita memakai satu per lima bagian dari sisa air itu. Berapa bagian air yang kita pakai?",
      bersih(0),
      tambah(0, emo("ay", 46, 100, "👨", 34), balon("by", 150, 30, ["berapa bagian air", "yang kita pakai?"], 130, W.krem, 7.4)),
      tambah("satu", frac("f15", 100, 150, 1, 5, 17, W.merah)),
      tambah("dari", teks("dr", 152, 154, "dari", 10, W.biru)),
      tambah("sisa", frac("f23", 205, 150, 2, 3, 17, W.biru)),
    ),
    k(
      "Agam menjawab, satu per lima dari dua per tiga bagian. Ayah memuji, seratus untuk Agam.",
      bersih(0),
      tambah(0, emo("ag", 52, 120, "👦", 34), balon("bg", 150, 28, ["satu per lima dari", "dua per tiga bagian"], 150, W.putih, 7.4)),
      tambah("menjawab", emo("bk", 250, 80, "📘", 30), teks("bkt", 250, 98, "perkalian pecahan", 8)),
      tambah("seratus", emo("sr", 150, 150, "💯", 34)),
    ),
    k(
      "Ayah bertanya lagi. Kalau dua per tiga bagian itu dipakai dalam 2 hari, setiap hari memakai berapa bagian?",
      bersih(0),
      tambah(0, judul("dipakai dalam 2 hari")),
      tambah("dua", frac("f23", 150, 76, 2, 3, 20, W.biru)),
      tambah("2", kotak("h1", 44, 128, 92, 40, W.krem, W.biru, { rx: 8 }), teks("h1t", 90, 152, "hari 1", 10), kotak("h2", 164, 128, 92, 40, W.krem, W.biru, { rx: 8 }), teks("h2t", 210, 152, "hari 2", 10)),
      tambah("berapa", teks("tn", 150, 192, "setiap hari berapa bagian?", 9, W.merah)),
    ),
    k(
      "Agam menjawab, tinggal dibagi 2 karena dipakai 2 hari. Itu pembagian pecahan, yang kita pelajari di Subbab B.",
      bersih(0),
      tambah(0, emo("ag", 46, 150, "👦", 32)),
      tambah("dibagi", ...frac("f23", 120, 90, 2, 3, 20, W.biru), teks("bg2", 164, 96, "dibagi 2", 13, W.merah)),
      tambah("pembagian", kartu("kp", 70, 140, 190, 36, "#DCFCE7", ["pembagian pecahan"], 10)),
      tambah("Subbab", teks("sb", 165, 192, "dipelajari di Subbab B", 8.6, W.ungu)),
    ),
    k(
      "Ayah mengingatkan, pakai air seperlunya sebab daerah lain kekurangan air. Agam berjanji memakai air dengan bijak.",
      bersih(0),
      tambah(0, judul("hemat air")),
      tambah("air", emo("tt", 150, 100, "💧", 44)),
      tambah("daerah", emo("ds", 60, 146, "🌍", 32), teks("dst", 60, 166, "daerah kekurangan air", 7.4)),
      tambah("berjanji", emo("ag", 246, 146, "👦", 32), balon("bj", 240, 46, ["Agam akan", "memakai air", "dengan bijak"], 90, W.putih, 7)),
    ),
    k(
      "Kita mulai dari perkalian bilangan asli dengan pecahan, bersama kebun Agam.",
      bersih(0),
      tambah(0, judul("Subbab A: Perkalian Pecahan")),
      tambah("perkalian", emo("kb", 150, 96, "🌱", 40)),
      tambah("bilangan", kartu("sa1", 30, 120, 110, 40, "#FEF9C3", ["bilangan asli", "kali pecahan"], 9)),
      tambah("kebun", kartu("sa2", 160, 120, 110, 40, "#DBEAFE", ["pecahan", "kali bilangan asli"], 9)),
    ),
  ],
};

/* ------------------------------ 2. Gambar 1.1, tujuan, pertanyaan pemantik, kata kunci, peta konsep (hlm. 4 dan 5) ------------------------------ */
const kartuTujuan = (id: string, y: number, nomor: string, baris: string[]) => [
  kotak(`${id}-k`, 14, y, 272, 40, W.krem, W.biru, { rx: 10 }),
  teks(`${id}-nt`, 34, y + 26, nomor, 14, W.ungu),
  ...baris.map((b, i) => teks(`${id}-b${i}`, 170, y + (baris.length === 1 ? 24 : 17 + i * 12), b, 8.6)),
];

export const ADEGAN_TUJUAN: AdeganStory = {
  id: "tujuan-peta",
  judul: "Gambar 1.1, tujuan, pertanyaan pemantik, kata kunci, peta konsep",
  sumber: "Buku Siswa hlm. 4–5",
  latar: "#FFF7ED",
  kutipan: [
    "Gambar 1.1 Pecahan dan Desimal dalam Kehidupan Sehari-hari",
    "memahami perkalian pecahan dengan bilangan asli dan menghitung",
    "memahami pembagian pecahan dengan bilangan asli, dan menghitung",
    "mengubah pecahan menjadi desimal, serta membandingkan dan",
    "mengurutkan bilangan desimal (satu angka di belakang koma)",
    "Bagaimana mengalikan pecahan dengan bilangan asli dan sebaliknya?",
    "Bagaimana cara membagi pecahan dengan bilangan asli dan sebaliknya?",
    "Bagaimana mengubah bentuk pecahan menjadi desimal dan sebaliknya?",
    "Pecahan, desimal, perkalian pecahan, pembagian pecahan, bilangan",
    "Peta Konsep",
    "Bentuk Bilangan",
  ],
  ketukan: [
    k(
      "Gambar 1.1 menunjukkan pecahan dan desimal dalam kehidupan sehari-hari. Ada timbangan, label diskon setengah, kue yang dipotong, dan kemasan dengan informasi nilai gizi.",
      tambah(0, judul("Gambar 1.1: pecahan dan desimal sehari-hari")),
      tambah("timbangan", emo("tb", 60, 76, "⚖", 40), teks("tbt", 60, 94, "timbangan", 8)),
      tambah("label", ...kartu("lb", 118, 48, 62, 44, "#BFDBFE", ["1/2", "OFF"], 10)),
      tambah("kue", emo("ke", 222, 78, "🍰", 36), teks("ket", 222, 94, "kue dipotong", 8)),
      tambah("kemasan", ...kartu("gz", 100, 118, 100, 52, "#FEF3C7", ["Informasi", "Nilai Gizi"], 9)),
    ),
    k(
      "Tujuan pembelajaran Bab 1 ada tiga. Pertama, memahami perkalian pecahan dengan bilangan asli dan menghitung hasilnya.",
      bersih(0),
      tambah(0, judul("Tujuan Pembelajaran", W.ungu)),
      tambah("Pertama", kartuTujuan("t1", 40, "1", ["perkalian pecahan dengan", "bilangan asli"])),
    ),
    k(
      "Kedua, memahami pembagian pecahan dengan bilangan asli dan menghitung hasilnya. Ketiga, mengubah pecahan menjadi desimal, lalu membandingkan dan mengurutkan desimal dengan satu angka di belakang koma.",
      tambah("Kedua", kartuTujuan("t2", 88, "2", ["pembagian pecahan dengan", "bilangan asli"])),
      tambah("Ketiga", kartuTujuan("t3", 136, "3", ["pecahan menjadi desimal,", "banding dan urut desimal"])),
    ),
    k(
      "Ada lima pertanyaan pemantik: cara mengalikan pecahan dan bilangan asli, cara membaginya, apakah penyebut harus disamakan dahulu, dan cara mengubah pecahan menjadi desimal.",
      bersih(0),
      tambah(0, judul("Pertanyaan Pemantik")),
      tambah("mengalikan", ...kartu("p1", 20, 30, 260, 26, "#DBEAFE", ["cara mengalikan pecahan dan bilangan asli"], 8.4)),
      tambah("membaginya,", ...kartu("p2", 20, 62, 260, 26, "#DCFCE7", ["cara membagi pecahan dan bilangan asli"], 8.4)),
      tambah("penyebut", ...kartu("p3", 20, 94, 260, 26, "#FEF3C7", ["apakah penyebut harus disamakan dahulu?"], 8.4)),
      tambah("mengubah", ...kartu("p4", 20, 126, 260, 26, "#FCE7F3", ["cara mengubah pecahan menjadi desimal"], 8.4)),
      tambah("desimal.", emo("pq", 150, 186, "❓", 26)),
    ),
    k(
      "Kata kuncinya adalah pecahan, desimal, perkalian pecahan, pembagian pecahan, bilangan kebalikan, dan bilangan asli.",
      bersih(0),
      tambah(0, judul("Kata Kunci")),
      tambah("pecahan,", ...kartu("kk1", 30, 38, 110, 28, "#FED7AA", ["pecahan"], 9)),
      tambah("desimal,", ...kartu("kk2", 160, 38, 110, 28, "#FED7AA", ["desimal"], 9)),
      tambah("perkalian", ...kartu("kk3", 30, 78, 110, 28, "#FED7AA", ["perkalian pecahan"], 8.4)),
      tambah("pembagian", ...kartu("kk4", 160, 78, 110, 28, "#FED7AA", ["pembagian pecahan"], 8.4)),
      tambah("kebalikan,", ...kartu("kk5", 30, 118, 110, 28, "#FED7AA", ["bilangan kebalikan"], 8.4)),
      tambah("asli.", ...kartu("kk6", 160, 118, 110, 28, "#FED7AA", ["bilangan asli"], 9)),
    ),
    k(
      "Peta konsepnya bermula dari bentuk bilangan, bercabang ke pecahan dan desimal. Pecahan berisi perkalian dan pembagian. Desimal berisi notasi, membandingkan, dan mengurutkan.",
      bersih(0),
      tambah(0, judul("Peta Konsep")),
      tambah("bermula", ...kartu("pk0", 100, 30, 100, 26, "#C4B5FD", ["Bentuk Bilangan"], 8.6)),
      tambah("bercabang", garis("pg1", 150, 56, -75, 22, W.biru, 1.6, { gambar: true }), garis("pg2", 150, 56, 75, 22, W.biru, 1.6, { gambar: true }), ...kartu("pk1", 40, 78, 70, 24, "#6EE7B7", ["Pecahan"], 8.6), ...kartu("pk2", 190, 78, 70, 24, "#6EE7B7", ["Desimal"], 8.6)),
      tambah("Pecahan@2", garis("pg3", 75, 102, -34, 28, W.biru, 1.4, { gambar: true }), garis("pg4", 75, 102, 34, 28, W.biru, 1.4, { gambar: true }), ...kartu("pk3", 12, 130, 58, 34, "#93C5FD", ["Perkalian", "Pecahan"], 7), ...kartu("pk4", 80, 130, 58, 34, "#93C5FD", ["Pembagian", "Pecahan"], 7)),
      tambah("Desimal@2", garis("pg5", 225, 102, -50, 28, W.biru, 1.4, { gambar: true }), garis("pg6", 225, 102, 2, 28, W.biru, 1.4, { gambar: true }), garis("pg7", 225, 102, 51, 28, W.biru, 1.4, { gambar: true }), ...kartu("pk5", 152, 130, 46, 34, "#93C5FD", ["Notasi", "Desimal"], 6.4), ...kartu("pk6", 204, 130, 46, 34, "#93C5FD", ["Banding", "Desimal"], 6.4), ...kartu("pk7", 256, 130, 40, 34, "#93C5FD", ["Urut", "Desimal"], 6.4)),
    ),
  ],
};

/* ------------------------------ 3. Ayo Mengingat Kembali (hlm. 5 dan 6) ------------------------------ */
const kantong = (id: string, x: number) => [kotak(`${id}-k`, x, 52, 56, 52, "#FFF7ED", W.coklat, { rx: 6 }), teks(`${id}-t`, x + 28, 76, "🍬🍬🍬", 11), teks(`${id}-u`, x + 28, 94, "🍬🍬🍬", 11)];
const jerukSel = (id: string) => Array.from({ length: 12 }, (_, i) => emo(`${id}${i}`, 74 + (i % 4) * 44, 70 + Math.floor(i / 4) * 40, "🍊", 26));

export const ADEGAN_MENGINGAT: AdeganStory = {
  id: "mengingat-kembali",
  judul: "Ayo Mengingat Kembali",
  sumber: "Buku Siswa hlm. 5–6",
  latar: "#FDF2F8",
  kutipan: [
    "Ayo Mengingat Kembali",
    "Perkalian dua bilangan asli",
    "Perhatikan beberapa kantong permen berikut ini",
    "Berapakah banyak permen seluruhnya",
    "Pembagian dua bilangan asli",
    "Terdapat 20 permen yang akan dibagikan kepada 5 orang anak",
    "Berapa banyak permen yang diperoleh setiap anak",
    "Pecahan sebagai bagian dari keseluruhan",
    "Gambar yang manakah yang",
    "Bagian pizza yang dilingkari",
    "Bagian jeruk yang diberi tanda",
  ],
  ketukan: [
    k(
      "Ayo mengingat kembali. Ada 4 kantong permen, tiap kantong berisi 6 permen. Berapa permen seluruhnya?",
      tambah(0, judul("perkalian dua bilangan asli")),
      tambah("kantong", kantong("q1", 20), kantong("q2", 86), kantong("q3", 152), kantong("q4", 218)),
      tambah("4", teks("c4", 150, 128, "4 kantong, tiap kantong 6 permen", 10, W.ungu)),
    ),
    k(
      "Ada 4 kelompok dengan isi 6, jadi banyak permen adalah 4 kali 6, yaitu 24 permen.",
      tambah("4@2", teks("rm", 150, 170, "4 × 6 = 24 permen", 14, W.merah)),
    ),
    k(
      "Kedua, 20 permen dibagikan kepada 5 anak. Setiap anak mendapat 20 dibagi 5, yaitu 4 permen.",
      bersih(0),
      tambah(0, judul("pembagian dua bilangan asli")),
      tambah("permen", teks("pm", 150, 56, "🍬🍬🍬🍬🍬🍬🍬🍬🍬🍬", 14), teks("pm2", 150, 78, "🍬🍬🍬🍬🍬🍬🍬🍬🍬🍬", 14), teks("pmt", 150, 98, "20 permen", 10, W.ungu)),
      tambah("5", teks("an", 150, 128, "👦👧👦👧👦", 18), teks("ant", 150, 144, "5 anak", 10, W.ungu)),
      tambah("4", teks("rd", 150, 182, "20 ÷ 5 = 4 permen", 14, W.merah)),
    ),
    k(
      "Ketiga, pecahan sebagai bagian dari keseluruhan. Manakah gambar yang menunjukkan dua per tiga? Gambar pertama, pita dengan 10 kotak yang 6 kotaknya diwarnai.",
      bersih(0),
      tambah(0, judul("manakah yang menunjukkan dua per tiga?")),
      tambah("pertama", ...Array.from({ length: 10 }, (_, i) => kotak(`pt${i}`, 30 + i * 24, 60, 24, 24, i < 6 ? "#93C5FD" : W.putih, W.biru, { rx: 0, tebal: 1.2 })), teks("ptt", 150, 106, "6 dari 10 kotak", 11, W.ungu)),
      tambah("dua", ...frac("tgt", 150, 150, 2, 3, 18, W.merah)),
    ),
    k(
      "Gambar kedua, pizza. Pizza dibagi 6 potong dan 2 potong dilingkari. Itu dua per enam, sama dengan satu per tiga, bukan dua per tiga.",
      bersih(0),
      tambah(0, judul("gambar kedua: pizza")),
      tambah("pizza", emo("pz", 90, 104, "🍕", 66)),
      tambah("6", teks("pzt", 90, 150, "6 potong, 2 dilingkari", 9, W.ungu)),
      tambah("dua", ...frac("pz26", 215, 80, 2, 6, 18, W.biru)),
      tambah("satu", teks("pzs", 215, 124, "= 1/3", 14, W.biru), emo("pzx", 215, 152, "❌", 28)),
    ),
    k(
      "Gambar ketiga, jeruk. Ada 12 jeruk, 8 dilingkari. Delapan per dua belas sama dengan dua per tiga, sebab 8 dan 12 habis dibagi 4.",
      bersih(0),
      tambah(0, judul("gambar ketiga: jeruk")),
      tambah("12", ...jerukSel("jr")),
      tambah("8", kotak("jl1", 56, 42, 168, 76, "none", W.merah, { rx: 8, tebal: 2 }), teks("jlt", 150, 170, "8 dari 12 jeruk = 2/3", 12, W.merah)),
      tambah("sebab", teks("jlb", 150, 190, "8 ÷ 4 = 2 dan 12 ÷ 4 = 3", 10, W.hijau)),
    ),
    k(
      "Jadi hanya gambar jeruk yang menunjukkan dua per tiga. Kini kita siap belajar perkalian.",
      bersih(0),
      tambah(0, judul("hanya jeruk yang dua per tiga")),
      tambah("hanya", emo("ok", 150, 100, "✅", 54)),
      tambah("jeruk", ...frac("ak", 80, 150, 2, 3, 20, W.hijau)),
      tambah("siap", panah("sp", 130, 160, 80, 0, W.hijau, 3, { gambar: true }), ...kartu("kx", 200, 140, 90, 34, "#DCFCE7", ["bilangan asli", "kali pecahan"], 8.4)),
    ),
  ],
};
