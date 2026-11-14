import type { AdeganStory, Obj } from "./logika-story";
import { W, baris, busurDerajat, busurSudut, emo, garis, ide, juring, kartu, panah, sinar, sudut, teks, titikSudut, ujung } from "./k5b6d-gambar";
import { bersih, hapus, k, tambah, ubah } from "./k5b6d-bantu";

const jud = (isi: string, y = 20, u = 12): Obj => teks("jud", 150, y, isi, u, W.ungu);
const ids = (a: Obj[]): string[] => a.map((o) => o.id);

/* ------------------------------ 1. Pembuka Sub-Bab D (hlm. 183; Panduan Guru hlm. 269) ------------------------------ */
export const ADEGAN_PEMBUKA_D: AdeganStory = {
  id: "pembuka-d",
  judul: "Pembuka Sub-Bab D: melukis sudut",
  sumber: "Buku Siswa hlm. 183; Buku Panduan Guru hlm. 269",
  latar: "#EEF2FF",
  kutipan: ["D. Melukis Sudut", "melukis sudut dengan ukuran tertentu", "memecahkan masalah yang berkaitan dengan sudut", "membuat rancangan peta kota dengan menggunakan konsep sudut", "Alat tulis", "Penggaris", "Busur derajat", "menjelaskan pengalaman belajar"],
  ketukan: [
    k(
      "Selamat datang di Sub-Bab D, melukis sudut. Ini bagian terakhir dari Bab 6, Sudut. Di sini kita belajar membuat sudut dengan ukuran tertentu.",
      tambah(0, jud("Sub-Bab D: Melukis Sudut", 28, 12.5)),
      tambah("Bab", teks("bab", 150, 52, "Bab 6: Sudut", 9.5)),
      tambah("membuat", sudut("s", 100, 160, 0, 60, 90, 22)),
      tambah("tertentu.", teks("sL", 150, 140, "60°", 11, W.merah)),
    ),
    k(
      "Setelah belajar bagian ini, kita bisa melukis sudut dengan ukuran tertentu, memecahkan masalah sudut, dan membuat rancangan peta kota dengan konsep sudut.",
      bersih(0),
      tambah(0, jud("Tujuan Sub-Bab D")),
      tambah("melukis", kartu("t1", 30, 36, 240, 38, W.hijauMuda, ["melukis sudut dengan ukuran tertentu"], 8.6)),
      tambah("memecahkan", kartu("t2", 30, 84, 240, 38, W.krem, ["memecahkan masalah tentang sudut"], 8.6)),
      tambah("rancangan", kartu("t3", 30, 132, 240, 38, W.muda, ["membuat rancangan peta kota"], 8.6)),
    ),
    k(
      "Alat yang disiapkan: alat tulis, penggaris, dan busur derajat. Guru memastikan setiap siswa punya penggaris dan busur derajat.",
      bersih(0),
      tambah(0, jud("Alat yang disiapkan")),
      tambah("tulis,", emo("a1", 60, 100, "✏️", 36), teks("a1t", 60, 128, "alat tulis", 9)),
      tambah("penggaris,", emo("a2", 150, 100, "📏", 36), teks("a2t", 150, 128, "penggaris", 9)),
      tambah("busur", emo("a3", 240, 100, "📐", 36), teks("a3t", 240, 128, "busur derajat", 9, W.merah)),
    ),
    k(
      "Sebelum mulai, ingat tiga hal dari sub-bab sebelumnya. Sudut siku-siku besarnya 90 derajat, sudut lancip lebih kecil dari siku-siku, dan sudut tumpul lebih besar.",
      bersih(0),
      tambah(0, jud("Ingat dulu")),
      tambah("90", sudut("i1", 30, 140, 0, 90, 44, 12), teks("i1t", 52, 164, "siku-siku 90°", 8.4, W.biru)),
      tambah("lancip", sudut("i2", 120, 140, 0, 45, 44, 14), teks("i2t", 148, 164, "lancip", 8.4, W.hijau)),
      tambah("tumpul", sudut("i3", 215, 140, 0, 130, 44, 14), teks("i3t", 245, 164, "tumpul", 8.4, W.merah)),
    ),
  ],
};

/* ------------------------------ 2. Apersepsi: dua pasang sudut (Panduan Guru hlm. 269–270) ------------------------------ */
export const ADEGAN_APERSEPSI_D: AdeganStory = {
  id: "apersepsi-d",
  judul: "Apersepsi: panjang kaki tidak memengaruhi besar sudut",
  sumber: "Buku Panduan Guru hlm. 269–270",
  latar: "#FFF7ED",
  kutipan: ["Sudut manakah yang lebih besar?", "Pasangan sudut 1", "Pasangan sudut 2", "jarak antara ujung kaki sudut tidak memengaruhi besar sudut", "mengukur setiap sudut dengan menggunakan busur derajat", "sudut B lebih besar daripada sudut A", "mengulang materi sebelumnya tentang mengukur dan membandingkan ukuran sudut"],
  ketukan: [
    k(
      "Guru memulai dengan mengulang materi mengukur dan membandingkan sudut, lalu menunjukkan dua pasang gambar sudut dan bertanya: sudut manakah yang lebih besar?",
      tambah(0, jud("Sudut manakah yang lebih besar?", 24, 11)),
      tambah("dua", kartu("p1", 30, 60, 110, 60, W.krem, ["Pasangan 1"], 11)),
      tambah("pasang", kartu("p2", 160, 60, 110, 60, W.muda, ["Pasangan 2"], 11)),
      tambah("sudut@3", teks("tn", 150, 160, "A atau B?", 14, W.merah)),
    ),
    k(
      "Pasangan 1: sudut A berkaki pendek, sudut B berkaki panjang. Sekilas, sudut B terlihat lebih besar.",
      bersih(0),
      tambah(0, jud("Pasangan 1")),
      tambah("sudut", sudut("a", 30, 150, 0, 38, 50, 16), teks("at", 50, 176, "Sudut A", 9)),
      tambah("sudut@2", sudut("b", 140, 150, 0, 38, 120, 16), teks("bt", 190, 176, "Sudut B", 9)),
      tambah("terlihat", teks("kes", 150, 54, "B tampak lebih besar?", 9, W.merah)),
    ),
    k(
      "Padahal bukaan kedua sudut sama. Jadi pada pasangan 1, kedua sudut sama besar. Panjang kaki tidak mengubah besar sudut.",
      ubah("bukaan", { id: "aa", warna: W.hijau, tebal: 2.4 }, { id: "ba", warna: W.hijau, tebal: 2.4 }),
      ubah("bukaan", { id: "kes", op: 0 }),
      tambah("kedua", teks("sm", 150, 54, "kedua sudut sama besar", 10, W.hijau)),
      tambah("Panjang", teks("sm2", 150, 196, "panjang kaki tidak berpengaruh", 8.6, W.ungu)),
    ),
    k(
      "Pasangan 2: sudut A berkaki panjang dan sudut B berkaki pendek. Namun bukaan sudut B lebih lebar, jadi sudut B lebih besar daripada sudut A.",
      bersih(0),
      tambah(0, jud("Pasangan 2")),
      tambah("sudut", sudut("a", 75, 150, 50, 130, 64, 16), teks("at", 75, 176, "Sudut A", 9)),
      tambah("sudut@2", sudut("b", 230, 150, 25, 155, 36, 16), teks("bt", 230, 176, "Sudut B", 9)),
      tambah("lebar,", teks("sm", 150, 54, "bukaan B lebih lebar", 10, W.merah)),
    ),
    k(
      "Jarak antara ujung kaki sudut tidak memengaruhi besar sudut. Cara yang akurat adalah mengukur setiap sudut dengan busur derajat.",
      bersih(0),
      tambah(0, jud("Cara yang akurat")),
      tambah("Jarak", kartu("r1", 20, 40, 260, 42, W.hijauMuda, ["panjang kaki tidak memengaruhi", "besar sudut"], 8.8)),
      tambah("mengukur", emo("rb", 90, 140, "📐", 40), kartu("r2", 130, 110, 150, 42, W.krem, ["ukur setiap sudut", "dengan busur derajat"], 8.8)),
    ),
  ],
};

/* ------------------------------ 3. Ayo Menyimak: kipas Lukas, langkah 1 sampai 2 (hlm. 183) ------------------------------ */
const VX = 105;
const VY = 140;
const R = 78;
const bd = (dua = false) => busurDerajat("bd", VX, VY, R, "kanan", dua, { z: 1 });

export const ADEGAN_KIPAS_LANGKAH: AdeganStory = {
  id: "kipas-langkah",
  judul: "Ayo Menyimak: kipas Lukas dan langkah satu sampai dua",
  sumber: "Buku Siswa hlm. 183; Buku Panduan Guru hlm. 270",
  latar: "#F0FDF4",
  kutipan: ["Halo Lukas, kamu sedang apa?", "Aku sedang membuat gambar kipas untuk tugas prakarya", "membentuk sudut dengan ukuran", "Buat titik sudut dan satu kaki sudut", "Letakkan pusat busur derajat pada titik sudut", "Pastikan dasar busur derajat berimpit dengan kaki sudut", "Ayo Menyimak", "Ayo, kita bantu Lukas dan teman-temannya"],
  ketukan: [
    k(
      "Nisa menyapa Lukas: halo Lukas, kamu sedang apa? Lukas menjawab, ia sedang membuat gambar kipas untuk tugas prakarya.",
      tambah(0, jud("Ayo Menyimak")),
      tambah("Nisa", ide("n", 14, 38, 150, 48, "Nisa", ["Halo Lukas,", "kamu sedang apa?"], W.langitMuda)),
      tambah("menjawab,", ide("l", 136, 96, 150, 64, "Lukas", ["Aku sedang membuat", "gambar kipas untuk", "tugas prakarya."], W.krem)),
      tambah("prakarya.", emo("ke", 40, 150, "🎨", 30)),
    ),
    k(
      "Kipas Lukas harus membentuk sudut 150 derajat. Bagaimana caranya? Teman-temannya mengajak membuka buku dan mempelajari langkah melukis sudut bersama.",
      bersih(0),
      tambah(0, jud("Kipas harus membentuk sudut 150°", 20, 11)),
      tambah("150", juring("kj", 100, 168, 15, 165, 80, W.krem, W.biru), sudut("kp", 100, 168, 15, 165, 80, 22)),
      tambah("derajat.", teks("kpL", 100, 128, "150°", 12, W.merah)),
      tambah("caranya?", teks("kc", 235, 100, "Bagaimana caranya?", 9, W.ungu, { op: 1 })),
    ),
    k(
      "Langkah satu: buat titik sudut dan satu kaki sudut. Kaki sudut boleh mendatar ke kanan atau ke kiri, seperti dua gambar di buku.",
      bersih(0),
      tambah(0, jud("Langkah 1: titik sudut dan satu kaki")),
      tambah("titik", titikSudut("v", VX, VY, W.biru, 3.2, { z: 5 }), teks("vt", VX, VY + 16, "titik sudut", 8, W.ungu)),
      tambah("kaki", sinar("r1", VX, VY, 0, R, W.biru, 2.4, { z: 5, gambar: true }), teks("r1t", VX + 40, VY - 8, "kaki sudut", 8, W.ungu)),
      tambah("kiri,", sinar("rb", VX, VY, 180, 60, W.abu, 2, { z: 4, putus: true }), teks("rbt", 40, VY - 8, "atau", 8, W.abu)),
    ),
    k(
      "Langkah dua: letakkan pusat busur derajat tepat pada titik sudut yang sudah dibuat.",
      ubah(0, { id: "jud", isi: "Langkah 2: pusat busur di titik sudut" }),
      tambah("busur", bd()),
      tambah("pusat", panah("pp", 225, 160, -30, -16, W.merah, 1.6), teks("ppt", 252, 168, "pusat busur", 8, W.merah)),
    ),
    k(
      "Pastikan dasar busur derajat berimpit dengan kaki sudut yang sudah dibuat.",
      hapus(0, "pp", "ppt"),
      tambah("dasar", garis("dsr", VX - R, VY, 2 * R, 0, W.hijau, 3.4, { z: 6 })),
      tambah("berimpit", teks("dst", 150, 188, "dasar busur berimpit dengan kaki sudut", 8.6, W.hijau)),
    ),
    k(
      "Jadi pusat busur ada di titik sudut dan dasar busur berimpit dengan kaki sudut. Dua syarat ini harus benar sebelum menandai angka.",
      hapus(0, "dst"),
      tambah("pusat", baris("c1", 192, 70, 102, "✓ pusat di titik sudut", W.hijauMuda, 7.2)),
      tambah("dasar", baris("c2", 192, 94, 102, "✓ dasar di kaki sudut", W.hijauMuda, 7.2)),
    ),
  ],
};

/* ------------------------------ 4. Ayo Menyimak: langkah 3 sampai 5 (hlm. 184) ------------------------------ */
const bdKipas = (dua = false): Obj[] => busurDerajat("bd", VX, VY, R, "kanan", dua, { z: 1 });
const TITIK150 = ujung(VX, VY, 150, R - 2);
const kipasRusuk = [15, 52.5, 90, 127.5, 165];

export const ADEGAN_KIPAS_LANGKAH2: AdeganStory = {
  id: "kipas-langkah2",
  judul: "Ayo Menyimak: langkah tiga sampai lima, sudut 150 derajat",
  sumber: "Buku Siswa hlm. 184; Buku Panduan Guru hlm. 271",
  latar: "#FFFBEB",
  kutipan: ["Misalkan kita akan membuat sudut", "Buat titik pada", "di busur derajat", "kaki sudut yang berimpit dengan dasar busur derajat selalu menunjukkan 0", "Jangan sampai salah membaca skala pada busur derajat", "Angkat busur derajat, lalu hubungkan titik sudut", "dengan sebuah garis lurus", "Kalian dapat memastikan ukuran sudut yang sudah kalian buat", "Terima kasih, teman-teman", "Sekarang aku bisa membuat gambar kipas yang aku mau"],
  ketukan: [
    k(
      "Langkah tiga: karena kita ingin sudut 150 derajat, buat sebuah titik pada angka 150 di busur derajat.",
      tambah(0, jud("Langkah 3: titik pada angka 150")),
      tambah(0, titikSudut("v", VX, VY, W.biru, 3.2, { z: 5 }), sinar("r1", VX, VY, 0, R, W.biru, 2.4, { z: 5 })),
      tambah("karena", bdKipas()),
      tambah("titik", titikSudut("tt", TITIK150[0], TITIK150[1], W.merah, 3.4, { z: 7 })),
      tambah("angka", teks("t150", 30, 90, "150°", 10, W.merah)),
    ),
    k(
      "Ingat, kaki sudut yang berimpit dengan dasar busur selalu menunjukkan nol derajat. Hitungan dimulai dari nol di kaki sudut itu.",
      ubah("nol", { id: "bdn0", warna: W.merah, u: 9 }),
      tambah("Hitungan", panah("p0", 232, 134, -42, 3, W.merah, 1.8), teks("p0t", 252, 128, "mulai dari 0", 8.2, W.merah)),
    ),
    k(
      "Jangan sampai salah membaca skala. Ada dua deret angka, jadi mulailah dari deret yang angka nolnya ada di kaki sudut.",
      hapus(0, "p0", "p0t"),
      tambah("Ada", bdKipas(true)),
      ubah("Ada", { id: "bdn0", warna: W.biru, u: 6 }),
      tambah("deret", teks("sl1", 240, 66, "deret luar: 0 di kanan", 7.8, W.biru), teks("sl2", 240, 82, "deret dalam: 0 di kiri", 7.8, W.merah)),
      tambah("kaki", teks("sl3", 240, 104, "pakai deret luar", 8.6, W.hijau)),
    ),
    k(
      "Langkah empat: angkat busur derajat, lalu hubungkan titik sudut dan titik tadi dengan garis lurus.",
      ubah(0, { id: "jud", isi: "Langkah 4: hubungkan dengan garis lurus" }),
      hapus("angkat", ids(bdKipas(true)), "sl1", "sl2", "sl3"),
      tambah("hubungkan", sinar("r2", VX, VY, 150, R, W.biru, 2.4, { z: 5, gambar: true })),
      tambah("garis", busurSudut("ar", VX, VY, 0, 150, 20, W.merah, 1.8, { z: 6 })),
    ),
    k(
      "Hasilnya sudut 150 derajat, sebuah sudut tumpul yang lebar, karena lebih besar dari sudut siku-siku.",
      tambah("Hasilnya", teks("rL", 123, 118, "150°", 10, W.merah)),
      tambah("tumpul", kartu("tp", 205, 48, 80, 30, W.merahMuda, ["sudut tumpul"], 8.6)),
      tambah("siku-siku.", garis("sk", VX, VY, 0, -62, W.abu, 1.4, { putus: true, z: 3 }), teks("skt", VX + 4, VY - 66, "90°", 7.6, W.abu, { anchor: "start" })),
    ),
    k(
      "Langkah lima: pastikan ukurannya dengan mengukur sudut itu lagi memakai busur derajat. Garis kaki kedua harus tepat di angka 150.",
      ubah(0, { id: "jud", isi: "Langkah 5: periksa dengan busur" }),
      tambah("mengukur", bdKipas()),
      tambah("tepat", baris("ck", 196, 84, 98, "✓ tepat di 150", W.hijauMuda, 7.6)),
    ),
    k(
      "Lukas berterima kasih dan sekarang bisa membuat gambar kipas yang ia mau.",
      bersih(0),
      tambah(0, jud("Kipas Lukas jadi!")),
      tambah("sekarang", juring("fj", 150, 180, 15, 165, 100, W.krem, W.biru)),
      tambah("sekarang", kipasRusuk.map((a, i) => sinar(`fr${i}`, 150, 180, a, 100, W.biru, 1.6))),
      tambah("membuat", emo("fe", 150, 70, "🎉", 26), teks("ft", 150, 190, "Terima kasih, teman-teman", 8.6, W.ungu)),
    ),
  ],
};
