import type { AdeganStory } from "./logika-story";
import { W, batang, emo, judul, kartu, teks } from "./k5b3b-gambar";
import { bersih, k, tambah } from "./k5b3b-bantu";

/* ------------------------------ 1. Pembuka Subbab B (Panduan Guru hlm. 105 dan 106; Buku Siswa hlm. 76) ------------------------------ */
export const ADEGAN_PEMBUKA: AdeganStory = {
  id: "pembuka-b",
  judul: "Subbab B: Penjumlahan Bilangan Pecahan",
  sumber: "Panduan Guru hlm. 105–106; Buku Siswa hlm. 76",
  latar: "#EFF6FF",
  kutipan: [
    "B. Penjumlahan Bilangan Pecahan",
    "Sebelum memasuki materi tentang penjumlahan bilangan pecahan, guru",
    "diharapkan dapat menjelaskan pengalaman belajar",
    "melakukan penjumlahan pecahan berpenyebut sama dan",
    "melakukan penjumlahan pecahan dengan penyebut berbeda.",
  ],
  ketukan: [
    k(
      "Subbab B, Penjumlahan Bilangan Pecahan. Di subbab sebelumnya kita membandingkan dan mengurutkan pecahan. Sekarang dua pecahan kita gabungkan, kita jumlahkan.",
      tambah(0, judul("B. Penjumlahan Pecahan")),
      tambah("dua", ...kartu("p1", 18, 70, 82, 44, W.langit, ["pecahan"], 10)),
      tambah("gabungkan,", teks("pl", 118, 100, "+", 22, W.merah), ...kartu("p2", 136, 70, 82, 44, W.hijauMuda, ["pecahan"], 10)),
      tambah("jumlahkan.", teks("pq", 252, 100, "= ?", 20, W.merah), emo("pz", 150, 160, "🧩", 28)),
    ),
    k(
      "Sebelum mulai, guru menjelaskan pengalaman belajarnya. Setelah mempelajari bagian ini, peserta didik diharapkan dapat melakukan penjumlahan pecahan berpenyebut sama, dan penjumlahan pecahan dengan penyebut berbeda.",
      bersih(0),
      tambah(0, judul("Pengalaman belajar")),
      tambah("sama,", ...kartu("g1", 24, 48, 252, 42, W.hijauMuda, ["penjumlahan pecahan", "berpenyebut sama"], 9.4)),
      tambah("berbeda.", ...kartu("g2", 24, 108, 252, 42, W.pink, ["penjumlahan pecahan", "berpenyebut berbeda"], 9.4)),
    ),
    k(
      "Jadi subbab ini punya dua bagian. Bagian satu, penjumlahan pecahan berpenyebut sama. Bagian dua, penjumlahan pecahan berpenyebut berbeda.",
      bersih(0),
      tambah(0, judul("Dua bagian subbab")),
      tambah("satu,", teks("n1", 40, 76, "1", 30, W.hijau), ...kartu("h1", 66, 52, 210, 40, W.hijauMuda, ["penyebut sama"], 10)),
      tambah("dua@2", teks("n2", 40, 140, "2", 30, W.merah), ...kartu("h2", 66, 116, 210, 40, W.pink, ["penyebut berbeda"], 10)),
    ),
    k(
      "Kegiatannya diberi nama Eksplorasi tiga titik dua A sampai tiga titik dua E. Tiga yang pertama untuk penyebut sama, dua yang terakhir untuk penyebut berbeda.",
      bersih(0),
      tambah(0, judul("Lima eksplorasi")),
      tambah("tiga", ...kartu("e1", 14, 40, 84, 28, W.hijauMuda, ["Eksplorasi 3.2A"], 8.2), ...kartu("e2", 108, 40, 84, 28, W.hijauMuda, ["Eksplorasi 3.2B"], 8.2), ...kartu("e3", 202, 40, 84, 28, W.hijauMuda, ["Eksplorasi 3.2C"], 8.2)),
      tambah("sama,", teks("ts", 150, 88, "penyebut sama", 9.4, W.hijau)),
      tambah("terakhir", ...kartu("e4", 55, 112, 84, 28, W.pink, ["Eksplorasi 3.2D"], 8.2), ...kartu("e5", 161, 112, 84, 28, W.pink, ["Eksplorasi 3.2E"], 8.2)),
      tambah("berbeda.", teks("tb", 150, 160, "penyebut berbeda", 9.4, W.merah)),
    ),
  ],
};

/* ------------------------------ 2. Persiapan: sarana, apersepsi, pemanasan, persiapan guru (Panduan Guru hlm. 105 dan 106) ------------------------------ */
export const ADEGAN_PERSIAPAN: AdeganStory = {
  id: "persiapan-b",
  judul: "Sarana, apersepsi, dan pemanasan",
  sumber: "Panduan Guru hlm. 105–106",
  latar: "#FFFBEB",
  kutipan: [
    "Kebutuhan Sarana Prasarana dan Media Pembelajaran",
    "Alat tulis",
    "Penggaris",
    "Kertas karton",
    "Guru memulai materi ini dengan mengingatkan peserta didik pada materi",
    "mengingat tentang cara menyamakan penyebut",
    "Gunakan pertanyaan pada Ayo Mengingat Kembali dan materi",
    "Guru mengajak peserta didik melakukan penjumlahan pada bilangan cacah",
    "dilanjutkan dengan bilangan pecahan dengan penyebut berbeda.",
    "Membagi peserta didik menjadi beberapa kelompok.",
    "Berikan alat-alat yang akan digunakan oleh peserta didik",
  ],
  ketukan: [
    k(
      "Kebutuhan sarana dan media pembelajaran subbab ini sederhana: alat tulis, penggaris, dan kertas karton. Kertas karton berguna untuk membuat model pecahan.",
      tambah(0, judul("Sarana dan media")),
      tambah("alat", emo("sa", 60, 80, "📝", 30), ...kartu("sa2", 20, 94, 80, 28, W.langit, ["alat tulis"], 9)),
      tambah("penggaris,", emo("sb", 150, 80, "📏", 30), ...kartu("sb2", 110, 94, 80, 28, W.krem, ["penggaris"], 9)),
      tambah("karton.", emo("sc", 240, 80, "📁", 30), ...kartu("sc2", 200, 94, 80, 28, W.hijauMuda, ["kertas karton"], 9)),
      tambah("model", teks("sm", 150, 156, "membuat model pecahan", 9.8, W.hijau)),
    ),
    k(
      "Apersepsi. Guru memulai dengan mengingatkan materi sebelumnya. Peserta didik juga diajak mengingat cara menyamakan penyebut pecahan, memakai pertanyaan Ayo Mengingat Kembali.",
      bersih(0),
      tambah(0, judul("Apersepsi")),
      tambah("mengingatkan", ...kartu("ap1", 30, 40, 240, 34, W.langit, ["ingat materi sebelumnya"], 9.4)),
      tambah("menyamakan", ...kartu("ap2", 30, 88, 240, 34, W.hijauMuda, ["ingat cara menyamakan penyebut"], 9.4)),
      tambah("pertanyaan", ...kartu("ap3", 30, 136, 240, 34, W.krem, ["pertanyaan Ayo Mengingat Kembali"], 9.4)),
    ),
    k(
      "Pemanasan. Guru mengajak peserta didik menjumlahkan bilangan cacah dan melakukan perkalian. Lalu penjumlahan pecahan berpenyebut sama, dilanjutkan dengan pecahan berpenyebut berbeda.",
      bersih(0),
      tambah(0, judul("Pemanasan")),
      tambah("bilangan", ...kartu("pm1", 30, 38, 240, 32, W.krem, ["bilangan cacah dan perkalian"], 9.4)),
      tambah("berpenyebut", ...kartu("pm2", 30, 82, 240, 32, W.hijauMuda, ["pecahan berpenyebut sama"], 9.4)),
      tambah("dilanjutkan", ...kartu("pm3", 30, 126, 240, 32, W.pink, ["pecahan berpenyebut berbeda"], 9.4)),
      tambah("dilanjutkan", teks("pa", 150, 176, "dari yang mudah ke yang sulit", 9, W.coklat)),
    ),
    k(
      "Persiapan guru untuk Eksplorasi tiga titik dua. Pertama, membagi peserta didik menjadi beberapa kelompok. Kedua, memberikan alat-alat yang akan dipakai untuk eksplorasi.",
      bersih(0),
      tambah(0, judul("Persiapan guru")),
      tambah("Pertama,", teks("g1", 36, 70, "1", 26, W.hijau), ...kartu("pg1", 62, 50, 214, 40, W.langit, ["bagi menjadi kelompok"], 9.4)),
      tambah("Kedua,", teks("g2", 36, 134, "2", 26, W.merah), ...kartu("pg2", 62, 114, 214, 40, W.krem, ["bagikan alat eksplorasi"], 9.4)),
    ),
  ],
};

/* ------------------------------ 3. Masalah Lukas dan syarat penjumlahan (Buku Siswa hlm. 76) ------------------------------ */
export const ADEGAN_MASALAH: AdeganStory = {
  id: "masalah-lukas",
  judul: "Masalah Lukas dan syarat penjumlahan",
  sumber: "Buku Siswa hlm. 76",
  latar: "#FFF7ED",
  kutipan: [
    "Masalah Lukas",
    "bagian wingko, sedangkan Komang",
    "bagian wingko. Apabila kedua bagian wingko",
    "tersebut digabungkan, berapakah hasilnya?",
    "Syarat melakukan penjumlahan pecahan adalah penyebutnya harus",
    "Jika penyebut belum sama, perlu disamakan dahulu.",
    "Jika penyebutnya sudah sama, jumlahkan pembilangnya.",
  ],
  ketukan: [
    k(
      "Masalah Lukas. Lukas punya satu per dua bagian wingko, sedangkan Komang punya satu per tiga bagian wingko. Kalau kedua bagian itu digabungkan, berapa hasilnya?",
      tambah(0, judul("Masalah Lukas")),
      tambah("Lukas", teks("lk", 75, 52, "Lukas", 10, W.biru), ...batang("wl", 25, 62, 100, 26, 2, [[0, 1, W.jingga]]), teks("fl", 75, 112, "1/2", 13, W.hitam)),
      tambah("Komang", teks("km", 225, 52, "Komang", 10, W.biru), ...batang("wk", 175, 62, 100, 26, 3, [[0, 1, W.jingga]]), teks("fk", 225, 112, "1/3", 13, W.hitam)),
      tambah("digabungkan,", teks("pl", 150, 80, "+", 18, W.merah), teks("gq", 150, 160, "hasilnya = ?", 14, W.merah)),
    ),
    k(
      "Sebelum menjawab, buku memberi syarat. Syarat melakukan penjumlahan pecahan adalah penyebutnya harus sama.",
      bersih(0),
      tambah(0, judul("Syarat penjumlahan")),
      tambah("syarat.", ...kartu("sy", 30, 50, 240, 50, W.krem, ["penyebut harus sama"], 12, { garis: W.merah })),
      tambah("harus", teks("sm1", 90, 140, "4/7", 18, W.hitam), teks("sm2", 150, 140, "+", 18, W.merah), teks("sm3", 210, 140, "2/7", 18, W.hitam)),
      tambah("sama.", emo("ok", 150, 182, "✅", 20)),
    ),
    k(
      "Jika penyebut belum sama, perlu disamakan dahulu. Jika penyebutnya sudah sama, jumlahkan pembilangnya.",
      bersih(0),
      tambah(0, judul("Dua keadaan")),
      tambah("belum", ...kartu("b1", 20, 44, 260, 46, W.pink, ["belum sama", "samakan dahulu"], 9.8)),
      tambah("sudah", ...kartu("b2", 20, 108, 260, 46, W.hijauMuda, ["sudah sama", "jumlahkan pembilangnya"], 9.8)),
    ),
    k(
      "Penyebut satu per dua dan satu per tiga adalah dua dan tiga, belum sama. Jadi masalah wingko Lukas kita simpan dulu, dan kita mulai dari penyebut yang sudah sama.",
      bersih(0),
      tambah(0, judul("Wingko Lukas disimpan dulu")),
      tambah("dua", teks("w1", 90, 80, "1/2", 20, W.hitam), teks("wp", 150, 80, "+", 20, W.merah), teks("w2", 210, 80, "1/3", 20, W.hitam)),
      tambah("belum", teks("wb", 150, 114, "penyebut 2 dan 3", 10, W.merah)),
      tambah("simpan", emo("sv", 70, 160, "📌", 26)),
      tambah("mulai", ...kartu("mu", 120, 140, 160, 34, W.hijauMuda, ["mulai: penyebut sama"], 9.4)),
    ),
  ],
};
