import type { AdeganStory } from "./logika-story";
import { W, batang, emo, garis, kartu, pai, panah, teks, judul } from "./k5b3a-gambar";
import { bersih, k, redamkan, sorotkan, tambah, ubah, warnai } from "./k5b3a-bantu";

/* ------------------------------ 1. Pembuka bab: tujuan (Buku Siswa hlm. 63; Panduan Guru hlm. 97) ------------------------------ */
const TUJUAN = ["1.1 mengurutkan bilangan pecahan", "1.2 membandingkan bilangan pecahan", "1.3 menentukan penjumlahan bilangan pecahan", "1.4 menentukan pengurangan bilangan pecahan"];
const WARNA_TUJUAN = [W.hijauMuda, W.langit, W.krem, W.pink];

export const ADEGAN_PEMBUKA: AdeganStory = {
  id: "pembuka-bab",
  judul: "Pembuka Bab 3: tujuan pembelajaran",
  sumber: "Buku Siswa hlm. 63; Panduan Guru hlm. 97",
  latar: "#FFF7ED",
  kutipan: [
    "Setelah mempelajari bab ini, diharapkan kalian dapat mengurutkan,",
    "membandingkan, serta melakukan operasi hitung penjumlahan",
    "dan pengurangan bilangan pecahan.",
    "Setelah mempelajari bab ini, peserta didik diharapkan dapat",
    "1.1 mengurutkan bilangan pecahan,",
    "1.2 membandingkan bilangan pecahan,",
    "1.3 menentukan penjumlahan bilangan pecahan, dan",
    "1.4 menentukan pengurangan bilangan pecahan.",
    "Bab ini diawali dengan mengajak peserta didik mengingat kembali materi",
  ],
  ketukan: [
    k(
      "Selamat datang di bab tiga, Bilangan Pecahan. Setelah mempelajari bab ini, kalian diharapkan dapat mengurutkan, membandingkan, serta melakukan operasi hitung penjumlahan dan pengurangan bilangan pecahan.",
      tambah(0, judul("Bab 3: Bilangan Pecahan")),
      tambah("tiga,", emo("kue", 150, 84, "🍰", 44)),
      tambah("mengurutkan,", ...kartu("a1", 20, 116, 126, 30, W.hijauMuda, ["mengurutkan"], 9)),
      tambah("membandingkan,", ...kartu("a2", 154, 116, 126, 30, W.langit, ["membandingkan"], 9)),
      tambah("penjumlahan", ...kartu("a3", 20, 156, 126, 30, W.krem, ["penjumlahan"], 9)),
      tambah("pengurangan", ...kartu("a4", 154, 156, 126, 30, W.pink, ["pengurangan"], 9)),
    ),
    k(
      "Buku panduan guru merinci empat tujuan. Satu, mengurutkan. Dua, membandingkan. Tiga, menentukan penjumlahan. Empat, menentukan pengurangan.",
      bersih(0),
      tambah(0, judul("Empat tujuan (Panduan Guru)")),
      tambah("Satu,", ...kartu("t0", 14, 32, 272, 30, WARNA_TUJUAN[0], [TUJUAN[0]], 8.8)),
      tambah("Dua,", ...kartu("t1", 14, 70, 272, 30, WARNA_TUJUAN[1], [TUJUAN[1]], 8.8)),
      tambah("Tiga,", ...kartu("t2", 14, 108, 272, 30, WARNA_TUJUAN[2], [TUJUAN[2]], 8.8)),
      tambah("Empat,@2", ...kartu("t3", 14, 146, 272, 30, WARNA_TUJUAN[3], [TUJUAN[3]], 8.8)),
    ),
    k(
      "Hari ini kita mengerjakan dua tujuan pertama, yaitu mengurutkan dan membandingkan bilangan pecahan. Penjumlahan dan pengurangan menunggu di subbab berikutnya.",
      sorotkan("mengerjakan", "t0-k", "t1-k"),
      ubah("Penjumlahan", { id: "t2-k", op: 0.35 }, { id: "t2-t0", op: 0.35 }, { id: "t3-k", op: 0.35 }, { id: "t3-t0", op: 0.35 }),
    ),
    k(
      "Bab ini dibuka dengan mengingat kembali pecahan dari kelas empat, lalu belajar dari makanan yang kita kenal, seperti jajanan pasar dan wingko babat.",
      bersih(0),
      tambah(0, judul("Belajar dari makanan")),
      tambah("kelas", emo("bk", 60, 92, "📚", 38), teks("bkt", 60, 114, "kelas IV", 8.6, W.biru)),
      tambah("jajanan", emo("jj", 150, 92, "🍡", 38), teks("jjt", 150, 114, "jajanan pasar", 8.6, W.biru)),
      tambah("wingko", emo("wk", 240, 92, "🍪", 38), teks("wkt", 240, 114, "wingko babat", 8.6, W.biru)),
    ),
  ],
};

/* ------------------------------ 2. Peta konsep, kata kunci, dan skema (Buku Siswa hlm. 64; Panduan Guru hlm. 98 sampai 101) ------------------------------ */
const KATA_KUNCI = ["urutan", "perbandingan", "penjumlahan", "pengurangan", "pecahan"];
const WARNA_KUNCI = [W.krem, W.langit, W.hijauMuda, W.pink, W.jingga];
const chipKunci = (i: number) => kartu(`ch${i}`, 12 + (i % 3) * 96, 40 + Math.floor(i / 3) * 46, 90, 32, WARNA_KUNCI[i], [KATA_KUNCI[i]], 8.6);
const LANGKAH = ["1. ingat materi kelas IV", "2. pengertian pecahan", "3. pecahan biasa dan campuran", "4. banding dan urutkan"];
const SUBBAB = [
  { h: "A", baris: ["A. Membandingkan", "dan Mengurutkan", "Pecahan"], w: W.hijauMuda },
  { h: "B", baris: ["B. Penjumlahan", "Bilangan", "Pecahan"], w: W.langit },
  { h: "C", baris: ["C. Pengurangan", "Bilangan", "Pecahan"], w: W.krem },
];

export const ADEGAN_PETA: AdeganStory = {
  id: "peta-konsep",
  judul: "Peta konsep, kata kunci, dan skema tiga subbab",
  sumber: "Buku Siswa hlm. 64; Panduan Guru hlm. 98–101",
  latar: "#F5F3FF",
  kutipan: [
    "Peta Konsep",
    "Kata Kunci",
    "Urutan, perbandingan, penjumlahan, pengurangan, pecahan.",
    "Bab ini bertujuan untuk mengenalkan peserta didik pada bilangan pecahan.",
    "Bab ini diawali dengan mengajak peserta didik mengingat kembali materi",
    "Pada Subbab A, peserta didik diajak untuk membandingkan dan",
    "mengurutkan bilangan pecahan.",
    "Waktu merupakan saran rentang jam pelajaran.",
    "Problem Based Learning",
    "Tanya jawab",
  ],
  ketukan: [
    k(
      "Ini peta konsep bab tiga. Di tengah ada pecahan. Cabangnya mengurutkan, membandingkan, dan operasi bilangan. Operasi bilangan bercabang lagi menjadi menjumlahkan dan mengurangkan.",
      tambah(0, judul("Peta Konsep")),
      tambah("tengah", ...kartu("pu", 12, 88, 72, 30, W.emas, ["Pecahan"], 9.6)),
      tambah("mengurutkan,", garis("ga", 84, 103, 28, -57, W.biru, 1.6, { gambar: true }), ...kartu("ca", 112, 34, 104, 24, W.hijauMuda, ["Mengurutkan"], 8.6)),
      tambah("membandingkan,", garis("gb", 84, 103, 28, -9, W.biru, 1.6, { gambar: true }), ...kartu("cb", 112, 82, 104, 24, W.langit, ["Membandingkan"], 8.6)),
      tambah("operasi", garis("gc", 84, 103, 28, 39, W.biru, 1.6, { gambar: true }), ...kartu("cc", 112, 130, 104, 24, W.krem, ["Operasi Bilangan"], 8.6)),
      tambah("menjumlahkan", garis("gd", 216, 142, 10, -9, W.biru, 1.6, { gambar: true }), ...kartu("cd", 226, 120, 68, 22, W.pink, ["Menjumlahkan"], 7.4)),
      tambah("mengurangkan.", garis("ge", 216, 142, 10, 21, W.biru, 1.6, { gambar: true }), ...kartu("ce", 226, 152, 68, 22, W.jingga, ["Mengurangkan"], 7.4)),
    ),
    k(
      "Kata kuncinya lima: urutan, perbandingan, penjumlahan, pengurangan, dan pecahan.",
      bersih(0),
      tambah(0, judul("Kata Kunci")),
      tambah("urutan,", chipKunci(0)),
      tambah("perbandingan,", chipKunci(1)),
      tambah("penjumlahan,", chipKunci(2)),
      tambah("pengurangan,", chipKunci(3)),
      tambah("pecahan.", chipKunci(4)),
    ),
    k(
      "Panduan guru menjelaskan bahwa bab ini mengenalkan bilangan pecahan. Urutannya: mengingat kembali materi kelas sebelumnya, memahami pengertian pecahan, membedakan pecahan biasa dan campuran, lalu membandingkan dan mengurutkan.",
      bersih(0),
      tambah(0, judul("Alur bab menurut Panduan Guru")),
      tambah("mengingat", ...kartu("lk0", 30, 32, 240, 28, W.hijauMuda, [LANGKAH[0]], 8.8)),
      tambah("memahami", ...kartu("lk1", 30, 70, 240, 28, W.langit, [LANGKAH[1]], 8.8), panah("pl0", 150, 60, 0, 10, W.biru, 1.6)),
      tambah("membedakan", ...kartu("lk2", 30, 108, 240, 28, W.krem, [LANGKAH[2]], 8.8), panah("pl1", 150, 98, 0, 10, W.biru, 1.6)),
      tambah("membandingkan", ...kartu("lk3", 30, 146, 240, 28, W.pink, [LANGKAH[3]], 8.8), panah("pl2", 150, 136, 0, 10, W.biru, 1.6)),
    ),
    k(
      "Bab ini terdiri atas tiga subbab, tiap subbab disarankan empat jam pelajaran. Subbab A membandingkan dan mengurutkan pecahan. Subbab B penjumlahan. Subbab C pengurangan.",
      bersih(0),
      tambah(0, judul("Skema Pembelajaran")),
      tambah("tiga", ...SUBBAB.flatMap((s, i) => kartu(`sk${i}`, 10 + i * 96, 40, 92, 54, s.w, s.baris, 8))),
      tambah("empat", ...SUBBAB.map((_, i) => teks(`jp${i}`, 56 + i * 96, 114, "4 JP", 11, W.merah)), teks("cat", 150, 150, "JP = jam pelajaran (saran)", 8.8, W.ungu)),
      sorotkan("membandingkan", "sk0-k"),
      ...[
        { at: "penjumlahan.", dari: "sk0-k", ke: "sk1-k" },
        { at: "pengurangan.", dari: "sk1-k", ke: "sk2-k" },
      ].flatMap((g) => [redamkan(g.at, g.dari), sorotkan(g.at, g.ke)]),
    ),
    k(
      "Metode yang disarankan di subbab A adalah Problem Based Learning, eksplorasi, dan tanya jawab. Sekarang kita masuk ke subbab A.",
      bersih(0),
      tambah(0, judul("Subbab A")),
      tambah("Sekarang", ...kartu("ja", 20, 140, 260, 38, W.hijauMuda, ["A. Membandingkan dan", "Mengurutkan Pecahan"], 9.4)),
      tambah("Problem", ...kartu("m1", 14, 36, 272, 26, W.krem, ["Problem Based Learning"], 9)),
      tambah("eksplorasi,", ...kartu("m2", 14, 70, 272, 26, W.langit, ["Eksplorasi"], 9)),
      tambah("tanya", ...kartu("m3", 14, 104, 272, 26, W.pink, ["Tanya jawab"], 9)),
    ),
  ],
};

/* ------------------------------ 3. Ayo Menyimak: Jajanan Pasar (Buku Siswa hlm. 64 dan 65) ------------------------------ */
export const ADEGAN_MENYIMAK: AdeganStory = {
  id: "ayo-menyimak",
  judul: "Ayo Menyimak: Jajanan Pasar",
  sumber: "Buku Siswa hlm. 64–65",
  latar: "#FFFBEB",
  kutipan: [
    "Indonesia merupakan negara yang kaya dengan makanan khas,",
    "salah satunya jajanan pasar.",
    "yang berbahan tepung, jagung, ketan, beras, dan lain-lain.",
    "untuk menjamu tamu",
    "Pernahkah kalian diminta Ibu untuk mengantar atau",
    "membagikan jajanan pasar ke saudara atau tetangga?",
    "bagiankah yang akan kalian bagikan?",
    "empat potong makanan dan kalian makan dua potong di antaranya,",
    "bagaimana kalian akan menuliskannya dalam kalimat matematika?",
    "memotong roti dalam sebuah piring menjadi tiga",
    "bagian sama besar, berapa bagian yang kalian dapatkan?",
    "Pada bab ini, kalian akan belajar terkait materi pecahan.",
    "materi ini dengan baik.",
  ],
  ketukan: [
    k(
      "Ayo Menyimak: Jajanan Pasar. Indonesia kaya makanan khas, salah satunya jajanan pasar, yang berbahan tepung, jagung, ketan, beras, dan lain-lain. Biasanya dipakai Ibu untuk menjamu tamu.",
      tambah(0, judul("Ayo Menyimak: Jajanan Pasar")),
      tambah("Jajanan", emo("e1", 60, 70, "🍡", 34)),
      tambah("makanan", emo("e2", 150, 70, "🥮", 34)),
      tambah("salah", emo("e3", 240, 70, "🍘", 34)),
      tambah("tepung,", ...kartu("b0", 10, 112, 66, 26, W.krem, ["tepung"], 8.6)),
      tambah("jagung,", ...kartu("b1", 82, 112, 66, 26, W.hijauMuda, ["jagung"], 8.6)),
      tambah("ketan,", ...kartu("b2", 154, 112, 66, 26, W.pink, ["ketan"], 8.6)),
      tambah("beras,", ...kartu("b3", 226, 112, 64, 26, W.langit, ["beras"], 8.6)),
      tambah("Ibu", emo("ib", 150, 170, "🍵", 26), teks("ibt", 150, 188, "menjamu tamu", 8.6, W.coklat)),
    ),
    k(
      "Ibu sering meminta kalian mengantar jajanan pasar ke saudara atau tetangga. Dari semua makanan yang ada, berapa bagiankah yang akan kalian bagikan?",
      bersih(0),
      tambah(0, judul("Membagikan jajanan")),
      tambah("Ibu", emo("r1", 44, 90, "🏠", 34)),
      tambah("mengantar", panah("pa", 70, 88, 34, 0, W.biru, 2, { gambar: true }), emo("r2", 150, 90, "📦", 34)),
      tambah("tetangga.", panah("pb", 176, 88, 34, 0, W.biru, 2, { gambar: true }), emo("r3", 256, 90, "🏡", 34)),
      tambah("berapa", teks("tn", 150, 160, "berapa bagian?", 14, W.merah)),
    ),
    k(
      "Soal pertama. Di dalam kardus ada empat potong makanan, dan kalian makan dua potong di antaranya. Bagaimana menuliskannya dalam kalimat matematika?",
      bersih(0),
      tambah(0, judul("Soal pertama")),
      tambah("kardus", ...batang("kd", 60, 60, 180, 36, 4, 0, W.karang)),
      tambah("empat", teks("k4", 150, 112, "4 potong makanan", 10, W.biru)),
      warnai("dua", W.karang, "kd-c0", "kd-c1"),
      tambah("dua", teks("k2", 150, 132, "2 dimakan", 10, W.merah)),
      tambah("Bagaimana", ...kartu("km", 40, 148, 220, 32, W.krem, ["kalimat matematikanya?"], 9.6)),
    ),
    k(
      "Soal kedua. Sebuah roti di piring dipotong menjadi tiga bagian sama besar. Berapa bagian yang kalian dapatkan? Kalian akan bisa menjawabnya jika menguasai materi pecahan dengan baik.",
      bersih(0),
      tambah(0, judul("Soal kedua")),
      tambah("tiga", ...pai("ro", 150, 86, 44, 3, 0)),
      tambah("Berapa", teks("tq", 150, 150, "berapa bagian?", 12, W.merah)),
      tambah("menguasai", emo("tg", 150, 184, "🎯", 24), teks("tgt", 214, 184, "belajar pecahan", 8.6, W.hijau)),
    ),
  ],
};
