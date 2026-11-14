import type { AdeganStory } from "./logika-story";
import { W, emo, judul, kartu, panah, teks } from "./k5b1a-gambar";
import { bersih, k, sorotkan, tambah, ubah } from "./k5b1a-bantu";

/* ------------------------------ 1. Pembuka bab: tujuan (Buku Siswa hlm. 1; Panduan Guru hlm. 15) ------------------------------ */
const KATA_TUJUAN = ["membaca", "menuliskan", "menentukan", "membandingkan", "mengurutkan", "komposisi", "dekomposisi", "operasi bilangan", "memecahkan masalah"];
const WARNA_TUJUAN = [W.hijauMuda, W.hijauMuda, W.hijauMuda, W.langit, W.langit, W.krem, W.krem, W.pink, W.pink];
const chipTujuan = (i: number) => kartu(`tj${i}`, 8 + (i % 3) * 96, 34 + Math.floor(i / 3) * 36, 92, 28, WARNA_TUJUAN[i], [KATA_TUJUAN[i]], 8);
const GRUP = ["A: membaca, menulis, nilai tempat", "B: membandingkan, mengurutkan", "C: komposisi dan dekomposisi", "D: operasi hitung dan masalah"];
const WARNA_GRUP = [W.hijauMuda, W.langit, W.krem, W.pink];

export const ADEGAN_PEMBUKA: AdeganStory = {
  id: "pembuka-bab",
  judul: "Pembuka Bab 1: tujuan pembelajaran",
  sumber: "Buku Siswa hlm. 1; Panduan Guru hlm. 15–17",
  latar: "#FFF7ED",
  kutipan: [
    "Setelah mempelajari bab ini, diharapkan kalian dapat",
    "membaca, menuliskan, menentukan, membandingkan,",
    "dekomposisi, menghitung operasi bilangan, dan",
    "memecahkan masalah yang berkaitan dengan bilangan",
    "cacah sampai 100.000.",
    "Setelah mempelajari bab ini, peserta didik diharapkan dapat",
    "1.1 membaca bilangan cacah sampai 100.000,",
    "1.2 menuliskan bilangan cacah sampai 100.000,",
    "1.3 menentukan nilai tempat bilangan cacah sampai 100.000,",
    "1.9 memecahkan masalah yang berkaitan dengan bilangan cacah sampai",
    "Bab ini bertujuan untuk mengenalkan peserta didik pada bilangan cacah",
    "Bab ini diawali dengan kegiatan peserta didik mengingat",
  ],
  ketukan: [
    k(
      "Selamat datang di bab satu, Bilangan Cacah Sampai seratus ribu. Setelah mempelajari bab ini, kalian diharapkan dapat membaca, menuliskan, menentukan, membandingkan, mengurutkan, menyusun, menguraikan, menghitung operasi bilangan, dan memecahkan masalah.",
      tambah(0, judul("Bab 1: Bilangan Cacah")),
      tambah("seratus", ...kartu("bb", 40, 160, 220, 30, W.emas, ["Sampai 100.000"], 11)),
      tambah("membaca,", chipTujuan(0)),
      tambah("menuliskan,", chipTujuan(1)),
      tambah("menentukan,", chipTujuan(2)),
      tambah("membandingkan,", chipTujuan(3)),
      tambah("mengurutkan,", chipTujuan(4)),
      tambah("menyusun,", chipTujuan(5)),
      tambah("menguraikan,", chipTujuan(6)),
      tambah("menghitung", chipTujuan(7)),
      tambah("memecahkan", chipTujuan(8)),
    ),
    k(
      "Buku panduan guru merinci sembilan tujuan, lalu membaginya ke empat subbab. Subbab A memuat tiga tujuan pertama: membaca, menuliskan, dan menentukan nilai tempat.",
      bersih(0),
      tambah(0, judul("Sembilan tujuan, empat subbab")),
      tambah(7, ...kartu("g0", 14, 32, 272, 30, WARNA_GRUP[0], [GRUP[0]], 8.8)),
      tambah(8, ...kartu("g1", 14, 70, 272, 30, WARNA_GRUP[1], [GRUP[1]], 8.8)),
      tambah(9, ...kartu("g2", 14, 108, 272, 30, WARNA_GRUP[2], [GRUP[2]], 8.8)),
      tambah(10, ...kartu("g3", 14, 146, 272, 30, WARNA_GRUP[3], [GRUP[3]], 8.8)),
    ),
    k(
      "Di subbab A kita hanya mengerjakan tiga tujuan pertama. Tujuan yang lain menunggu giliran di subbab berikutnya.",
      sorotkan("hanya", "g0-k"),
      ubah("lain", { id: "g1-k", op: 0.35 }, { id: "g1-t0", op: 0.35 }, { id: "g2-k", op: 0.35 }, { id: "g2-t0", op: 0.35 }, { id: "g3-k", op: 0.35 }, { id: "g3-t0", op: 0.35 }),
    ),
    k(
      "Panduan guru juga menjelaskan, bab ini diawali dengan mengingat kembali, lalu mengenali benda yang memakai bilangan sampai seratus ribu, dan membaca bilangan yang sering kita temui sehari-hari.",
      bersih(0),
      tambah(0, judul("Gambaran umum bab")),
      tambah("mengingat", ...kartu("u1", 14, 34, 272, 32, W.hijauMuda, ["1. mengingat kembali"], 9.6)),
      tambah("mengenali", ...kartu("u2", 14, 76, 272, 32, W.langit, ["2. mengenali bilangan sampai 100.000"], 9.6)),
      tambah("membaca", ...kartu("u3", 14, 118, 272, 32, W.krem, ["3. membaca bilangan sehari-hari"], 9.6)),
      tambah("sehari-hari.", emo("ug", 150, 184, "📖", 28)),
    ),
  ],
};

/* ------------------------------ 2. Peta konsep, kata kunci, dan skema (Buku Siswa hlm. 2; Panduan Guru hlm. 16–18) ------------------------------ */
const kotakPeta = (id: string, x: number, y: number, w: number, warna: string, isi: string) => kartu(id, x, y, w, 22, warna, [isi], 8);
const KATA_KUNCI = ["bilangan cacah", "nilai tempat", "komposisi", "dekomposisi", "operasi bilangan", "bilangan 100.000"];
const chipKunci = (i: number) => kartu(`kk${i}`, 8 + (i % 2) * 146, 36 + Math.floor(i / 2) * 44, 138, 32, [W.hijauMuda, W.langit, W.krem, W.pink, W.jingga, W.emas][i], [KATA_KUNCI[i]], 9);
/** Waktu tiap subbab (jam pelajaran) menurut Tabel 1.1 Panduan Guru hlm. 18. */
export const JP_SUBBAB = [
  { h: "A", nama: "membaca dan menulis", jp: 4, w: W.hijauMuda },
  { h: "B", nama: "membandingkan", jp: 2, w: W.langit },
  { h: "C", nama: "komposisi", jp: 2, w: W.krem },
  { h: "D", nama: "operasi hitung", jp: 8, w: W.pink },
];
export const SKALA_JP = 18;
const barJP = (i: number) => {
  const s = JP_SUBBAB[i];
  const y = 32 + i * 32;
  const w = s.jp * SKALA_JP;
  return [teks(`sh${i}`, 30, y + 16, s.h, 11, W.biru), kotak2(`sb${i}`, 52, y, w, s.w), teks(`sj${i}`, 52 + w / 2, y + 15, `${s.jp} JP`, 8.6, W.biru), teks(`sn${i}`, 52 + w + 6, y + 15, s.nama, 7.6, W.biru, { anchor: "start" })];
};
const kotak2 = (id: string, x: number, y: number, w: number, warna: string) => ({ id, t: "kotak" as const, x, y, w, h: 22, warna, garis: W.biru, rx: 4, tebal: 1.5 });

export const ADEGAN_PETA: AdeganStory = {
  id: "peta-konsep",
  judul: "Peta konsep, kata kunci, dan skema empat subbab",
  sumber: "Buku Siswa hlm. 2; Panduan Guru hlm. 16–18",
  latar: "#F5F3FF",
  kutipan: [
    "Peta Konsep",
    "Kata Kunci",
    "Bilangan cacah, nilai tempat, komposisi, dekomposisi, operasi",
    "bilangan, bilangan 100.000.",
    "Kalimat Matematika",
    "Penjumlahan Perkalian",
    "Tabel 1.1 Skema Pembelajaran Bab 1",
    "Waktu merupakan saran rentang jam pelajaran.",
  ],
  ketukan: [
    k(
      "Peta konsep bab ini berpusat pada bilangan. Dari bilangan bercabang nilai tempat, lalu komposisi dan dekomposisi.",
      tambah(0, judul("Peta konsep Bab 1")),
      tambah("berpusat", ...kotakPeta("pb", 100, 30, 100, W.emas, "Bilangan")),
      tambah("nilai", ...kotakPeta("pn", 100, 62, 100, W.hijauMuda, "Nilai Tempat"), panah("a1", 150, 52, 0, 10, W.biru, 1.4)),
      tambah("komposisi", ...kotakPeta("pk", 20, 98, 100, W.krem, "Komposisi"), panah("a2", 135, 84, -40, 14, W.biru, 1.4)),
      tambah("dekomposisi.", ...kotakPeta("pd", 180, 98, 100, W.pink, "Dekomposisi"), panah("a3", 165, 84, 40, 14, W.biru, 1.4)),
    ),
    k(
      "Ada pula operasi, yang punya empat bagian: penjumlahan, pengurangan, perkalian, dan pembagian. Satu cabang lagi adalah kalimat matematika.",
      tambah("operasi,", ...kotakPeta("po", 20, 132, 100, W.jingga, "Operasi")),
      tambah("penjumlahan,", ...kotakPeta("o1", 4, 168, 68, W.langit, "Penjumlahan")),
      tambah("pengurangan,", ...kotakPeta("o2", 77, 168, 68, W.langit, "Pengurangan")),
      tambah("perkalian,", ...kotakPeta("o3", 150, 168, 68, W.langit, "Perkalian")),
      tambah("pembagian.", ...kotakPeta("o4", 223, 168, 68, W.langit, "Pembagian")),
      tambah("kalimat", ...kotakPeta("pm", 180, 132, 100, W.hijauMuda, "Kalimat Matematika")),
    ),
    k(
      "Kata kunci bab ini: bilangan cacah, nilai tempat, komposisi, dekomposisi, operasi bilangan, dan bilangan seratus ribu.",
      bersih(0),
      tambah(0, judul("Kata kunci")),
      tambah("cacah,", chipKunci(0)),
      tambah("tempat,", chipKunci(1)),
      tambah("komposisi,", chipKunci(2)),
      tambah("dekomposisi,", chipKunci(3)),
      tambah("operasi", chipKunci(4)),
      tambah("seratus", chipKunci(5)),
    ),
    k(
      "Menurut skema panduan guru, subbab A empat jam pelajaran, B dua, C dua, dan D delapan, jadi enam belas jam pelajaran.",
      bersih(0),
      tambah(0, judul("Skema waktu Bab 1")),
      tambah(5, ...barJP(0)),
      tambah(9, ...barJP(1)),
      tambah(11, ...barJP(2)),
      tambah(14, ...barJP(3)),
      tambah(17, ...kartu("tt", 60, 164, 180, 26, W.emas, ["total 16 JP"], 10)),
    ),
  ],
};

/* ------------------------------ 3. Ayo Menyimak: Pasar Sukawati dan Covid (Buku Siswa hlm. 2 sampai 5; Panduan Guru hlm. 21) ------------------------------ */
export const ADEGAN_MENYIMAK: AdeganStory = {
  id: "ayo-menyimak",
  judul: "Ayo Menyimak: Pasar Sukawati dan bilangan lima angka",
  sumber: "Buku Siswa hlm. 2–5; Panduan Guru hlm. 21",
  latar: "#FFF1F2",
  kutipan: [
    "Gambar 1.1 Beberapa Barang Dagangan di Pasar Sukawati",
    "Pasar Sukawati di Bali menjual berbagai jenis oleh-oleh, seperti",
    "pakaian, lukisan, dan berbagai jenis oleh-oleh lain.",
    "Apakah kalian pernah berwisata di Bali?",
    "Jika belum, apakah kalian pernah berwisata ke tempat wisata lain",
    "Dapatkah kalian menentukan mana yang lebih murah?",
    "Menjelang akhir tahun 2019, muncul Virus Corona (Covid-19)",
    "per tanggal 14 Agustus 2020.",
    "Ayo temukan, di manakah letak bilangan",
    "dengan lima angka?",
    "b. Guru mengajak peserta didik untuk bersama-sama mencari",
  ],
  ketukan: [
    k(
      "Ayo menyimak. Gambar pertama menunjukkan barang dagangan di Pasar Sukawati, Bali: pakaian, lukisan, dan berbagai oleh-oleh lain.",
      tambah(0, judul("Pasar Sukawati, Bali")),
      tambah("pakaian,", emo("e1", 60, 92, "👗", 36), teks("t1", 60, 112, "pakaian", 9, W.biru)),
      tambah("lukisan,", emo("e2", 150, 92, "🎨", 36), teks("t2", 150, 112, "lukisan", 9, W.biru)),
      tambah("oleh-oleh", emo("e3", 240, 92, "🎁", 36), teks("t3", 240, 112, "oleh-oleh", 9, W.biru)),
      tambah("Bali:", ...kartu("pb", 50, 140, 200, 30, W.krem, ["Gambar 1.1: Pasar Sukawati"], 9.6)),
    ),
    k(
      "Di sana kita bisa membeli barang baru sampai barang bekas, dan makanan khas Bali. Buku bertanya, pernahkah kalian berwisata di Bali, atau di tempat wisata lain?",
      bersih(0),
      tambah(0, judul("Pernah berwisata?")),
      tambah("baru", ...kartu("w1", 14, 34, 272, 30, W.hijauMuda, ["barang baru sampai barang bekas"], 9.6)),
      tambah("makanan", ...kartu("w2", 14, 74, 272, 30, W.langit, ["makanan khas Bali"], 9.6)),
      tambah("pernahkah", emo("wm", 90, 160, "🌴", 40)),
      tambah("tempat", emo("wn", 210, 160, "🗺", 40)),
    ),
    k(
      "Saat berwisata, kita sering membeli oleh-oleh. Buku bertanya, apakah kalian membandingkan harga dulu, dan dapatkah menentukan mana yang lebih murah? Pertanyaan itu menunggu giliran di subbab berikutnya.",
      bersih(0),
      tambah(0, judul("Pertanyaan untuk nanti")),
      tambah("oleh-oleh.", emo("ol", 150, 80, "🛍", 44)),
      tambah("membandingkan", ...kartu("pq", 30, 100, 240, 30, W.krem, ["membandingkan harga dulu?"], 9.6)),
      tambah("lebih", ...kartu("pr", 30, 140, 240, 30, W.pink, ["mana yang lebih murah?"], 9.6)),
    ),
    k(
      "Berikutnya Gambar kedua tentang orang yang terpapar Covid tanggal empat belas Agustus dua ribu dua puluh. Buku bertanya, di mana letak bilangan dengan lima angka, dan bisakah kalian membacanya?",
      bersih(0),
      tambah(0, judul("Gambar 1.2: Covid-19")),
      tambah("Covid", emo("cv", 150, 80, "😷", 44)),
      tambah("tanggal", ...kartu("cd", 60, 98, 180, 28, W.merahMuda, ["14 Agustus 2020"], 10)),
      tambah("lima", ...kartu("cl", 30, 138, 240, 30, W.emas, ["di mana bilangan lima angka?"], 9.6)),
    ),
    k(
      "Panduan guru menyarankan, berdiskusilah dengan teman sebangku untuk mengenali gambar itu, lalu bersama-sama mencari bilangan yang terdiri atas empat angka, lima angka, dan enam angka.",
      bersih(0),
      tambah(0, judul("Saran panduan guru")),
      tambah("teman", emo("tm", 150, 70, "👫", 40)),
      tambah("empat", ...kartu("a4", 14, 100, 86, 34, W.hijauMuda, ["4 angka"], 10)),
      tambah("lima", ...kartu("a5", 107, 100, 86, 34, W.langit, ["5 angka"], 10)),
      tambah("enam", ...kartu("a6", 200, 100, 86, 34, W.krem, ["6 angka"], 10)),
    ),
  ],
};

/* ------------------------------ 4. Ayo Mengingat Kembali (Buku Siswa hlm. 3; Panduan Guru hlm. 20) ------------------------------ */
export const ADEGAN_INGAT: AdeganStory = {
  id: "mengingat-kembali",
  judul: "Ayo Mengingat Kembali: empat pertanyaan",
  sumber: "Buku Siswa hlm. 3; Panduan Guru hlm. 20",
  latar: "#FAF5FF",
  kutipan: [
    "Apakah kalian ingat tentang cara membaca dan menulis suatu",
    "bilangan serta menentukan nilai tempatnya?",
    "1. Bagaimana membaca 3.456?",
    "2. Bagaimana menuliskan bilangan",
    "3. Sebutkan nilai tempat 2 pada bilangan 2.345?",
    "4. Berapakah hasil 56 + 75?",
    "cara bersusun panjang dan bagaimana menggunakan cara",
    "bersusun pendek?",
    "Di kelas sebelumnya, kalian sudah pernah belajar tentang nilai",
    "tempat, membaca bilangan, dan melakukan operasi bilangan,",
    "Di kelas IV, peserta didik sudah mempelajari materi tentang membaca dan",
    "menulis bilangan cacah sampai 10.000 dan menentukan nilai tempat.",
  ],
  ketukan: [
    k(
      "Ayo mengingat kembali. Menurut panduan guru, di kelas empat kalian sudah belajar membaca dan menulis bilangan sampai sepuluh ribu, serta menentukan nilai tempat. Ada empat pertanyaan.",
      tambah(0, judul("Ayo mengingat kembali")),
      tambah("kelas", ...kartu("kl4", 14, 40, 272, 32, W.hijauMuda, ["kelas IV: sampai 10.000"], 10)),
      tambah("sampai", panah("ka", 150, 76, 0, 14, W.biru, 1.6)),
      tambah("Ada", ...kartu("kl5", 14, 94, 272, 32, W.emas, ["kelas V: sampai 100.000"], 10)),
      tambah("pertanyaan.", emo("kg", 150, 168, "🧠", 30)),
    ),
    k(
      "Pertanyaan pertama: cara membaca bilangan yang tampak di layar. Dibaca tiga ribu empat ratus lima puluh enam. Empat angka, dengan titik setelah angka tiga.",
      bersih(0),
      tambah(0, judul("Pertanyaan 1: membaca")),
      tambah("bilangan", teks("q1", 150, 70, "3.456", 30, W.merah)),
      tambah("Dibaca", teks("q1b", 150, 118, "tiga ribu empat ratus", 10, W.biru), teks("q1c", 150, 134, "lima puluh enam", 10, W.biru)),
      tambah("titik", ...kartu("q1d", 70, 150, 160, 28, W.krem, ["titik setelah angka 3"], 9)),
    ),
    k(
      "Pertanyaan kedua: menuliskan tiga ribu tiga ratus dua puluh rupiah. Angka tiga di ribuan, tiga di ratusan, dua di puluhan, dan nol di satuan, sehingga tertulis seperti di layar.",
      bersih(0),
      tambah(0, judul("Pertanyaan 2: menulis")),
      tambah("tiga@1", teks("q2a", 150, 52, "tiga ribu tiga ratus dua puluh", 10, W.biru)),
      tambah("ribuan,", teks("q2d", 66, 90, "3", 18, W.merah), teks("q2dl", 66, 106, "ribuan", 8, W.biru)),
      tambah("ratusan,", teks("q2e", 118, 90, "3", 18, W.merah), teks("q2el", 118, 106, "ratusan", 8, W.biru)),
      tambah("puluhan,", teks("q2f", 182, 90, "2", 18, W.merah), teks("q2fl", 182, 106, "puluhan", 8, W.biru)),
      tambah("satuan,", teks("q2g", 236, 90, "0", 18, W.merah), teks("q2gl", 236, 106, "satuan", 8, W.biru)),
      tambah("sehingga", ...kartu("q2h", 70, 130, 160, 34, W.emas, ["3.320"], 16)),
    ),
    k(
      "Pertanyaan ketiga: nilai tempat angka dua pada bilangan dua ribu tiga ratus empat puluh lima. Angka dua ada di paling kiri, yaitu tempat ribuan.",
      bersih(0),
      tambah(0, judul("Pertanyaan 3: nilai tempat")),
      tambah("bilangan", teks("q3", 150, 76, "2.345", 30, W.biru)),
      tambah("paling", ...kartu("q3b", 40, 100, 90, 28, W.merahMuda, ["angka 2"], 10), panah("q3p", 100, 130, 22, 22, W.merah, 1.6)),
      tambah("ribuan.", ...kartu("q3c", 60, 160, 180, 30, W.emas, ["tempat ribuan"], 10)),
    ),
    k(
      "Pertanyaan keempat: lima puluh enam ditambah tujuh puluh lima. Buku tidak memberi kunci. Hitungan mandiri: seratus tiga puluh satu, dengan cara bersusun panjang maupun pendek.",
      bersih(0),
      tambah(0, judul("Pertanyaan 4: hasil")),
      tambah("lima", teks("q4a", 150, 70, "56 + 75", 26, W.biru)),
      tambah("hitungan", teks("q4b", 150, 118, "= 131", 26, W.merah)),
      tambah("bersusun", ...kartu("q4c", 40, 138, 220, 34, W.krem, ["bersusun panjang atau pendek"], 9.6)),
    ),
  ],
};
