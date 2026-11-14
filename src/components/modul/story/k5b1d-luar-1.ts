import type { AdeganStory } from "./logika-story";
import { W, bulat, emo, judul, kalimat, kartu, kolomSusun, panah, susun, teks } from "./k5b1d-gambar";
import { bersih, k, tambah, ubah } from "./k5b1d-bantu";

/* ------------------------------ 1. Pembuka metode luar ------------------------------ */
export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Empat metode dari luar untuk operasi hitung bilangan besar",
  sumber: "Metode luar: pembuka; angka Buku Siswa hlm. 17–28",
  latar: "#FFF7ED",
  ketukan: [
    k(
      "Bagaimana kita menghitung penjumlahan, pengurangan, perkalian, dan pembagian bilangan besar? Guru di berbagai negara punya cara berbeda. Dalam video ini kita lihat empat metode dari luar, memakai angka buku.",
      tambah(0, judul("Empat metode dari luar")),
      tambah("berbagai", emo("gl", 150, 100, "🌍", 56)),
      tambah("empat", ...kartu("pa", 40, 140, 220, 34, W.krem, ["operasi bilangan sampai 100.000"], 9.6)),
    ),
    k(
      "Empat metode itu: Standard Algorithm, Regrouping, Estimate First, dan Inverse Check.",
      bersih(0),
      tambah(0, judul("Empat metode")),
      tambah("Standard", ...kartu("m1", 12, 34, 276, 30, W.hijauMuda, ["1. Standard Algorithm"], 9.6)),
      tambah("Regrouping,", ...kartu("m2", 12, 72, 276, 30, W.langit, ["2. Regrouping"], 9.6)),
      tambah("Estimate", ...kartu("m3", 12, 110, 276, 30, W.krem, ["3. Estimate First"], 9.6)),
      tambah("Inverse", ...kartu("m4", 12, 148, 276, 30, W.pink, ["4. Inverse Check"], 9.6)),
    ),
    k(
      "Semuanya menjawab dua pertanyaan: berapa hasilnya, dan apakah hasilnya benar? Caranya berbeda: hitung per kolom, tukar nilai tempat, perkirakan dulu, atau periksa dengan operasi kebalikan.",
      bersih(0),
      tambah(0, judul("Satu tujuan, empat cara")),
      tambah("kolom,", emo("i1", 45, 80, "🧮", 34), teks("i1t", 45, 112, "per kolom", 8.6, W.biru)),
      tambah("tukar", emo("i2", 112, 80, "🔁", 34), teks("i2t", 112, 112, "tukar", 8.6, W.biru)),
      tambah("perkirakan", emo("i3", 188, 80, "🎯", 34), teks("i3t", 188, 112, "perkiraan", 8.6, W.biru)),
      tambah("kebalikan.", emo("i4", 255, 80, "✅", 34), teks("i4t", 255, 112, "periksa", 8.6, W.biru)),
    ),
    k(
      "Angka-angkanya dari buku: uang bakti sosial Nisa, sisa uang Lukas, angpau Yohana, dan hitungan Uji Kompetensi. Semua berasal dari Eksplorasi satu titik empat sampai Uji Kompetensi.",
      bersih(0),
      tambah(0, judul("Angka dari buku")),
      tambah("bakti", ...kartu("a1", 20, 34, 260, 30, W.hijauMuda, ["57.500 + 22.000"], 10.4)),
      tambah("Lukas,", ...kartu("a2", 20, 72, 260, 30, W.merahMuda, ["47.900 − 45.750"], 10.4)),
      tambah("angpau", ...kartu("a3", 20, 110, 260, 30, W.krem, ["12 × 5.000 dan 64.000 ÷ 4"], 10.4)),
      tambah("Uji", ...kartu("a4", 20, 148, 260, 30, W.langit, ["76.598 + 12.456 dan 67.032 ÷ 147"], 10.4)),
    ),
  ],
};

/* ------------------------------ 2. Standard Algorithm: konsep ------------------------------ */
const LA = susun("la", 150, 64, "+", 57500, 22000);
export const ADEGAN_LUAR_SA: AdeganStory = {
  id: "luar-sa",
  judul: "Metode 1: Standard Algorithm (algoritma bersusun)",
  sumber: "Metode luar: Standard Algorithm; angka Buku Siswa hlm. 17–18",
  latar: "#F0FDF4",
  ketukan: [
    k(
      "Metode pertama, Standard Algorithm atau algoritma bersusun. Tulis kedua bilangan lurus menurut nilai tempat, satuan di bawah satuan, puluhan di bawah puluhan, lalu hitung dari kolom paling kanan.",
      tambah(0, judul("Standard Algorithm")),
      tambah("Tulis", ...LA.atas, ...LA.bawah, ...LA.alat),
      tambah("satuan@2", teks("sat", 176, 124, "satuan", 8.4, W.coklat)),
    ),
    k(
      "Mulai dari satuan, lalu bergerak ke kiri satu kolom demi satu kolom. Setiap kolom hanya menghasilkan satu angka, jadi pekerjaan besar dipecah menjadi langkah kecil.",
      tambah("Mulai", panah("ar", 214, 140, -130, 0, W.merah, 2.2), teks("art", 150, 158, "mulai dari kanan", 9.4, W.merah)),
      tambah("kolom@3", teks("kl", 150, 180, "satu kolom, satu angka", 9.4, W.biru)),
    ),
    k(
      "Keuntungannya: angka yang dijumlahkan selalu sejajar dengan nilai tempatnya, sehingga mudah diperiksa. Cara yang sama berlaku untuk bilangan kecil maupun bilangan sampai seratus ribu.",
      bersih(0),
      tambah(0, judul("Mengapa bersusun?")),
      tambah("Keuntungannya:", ...kartu("k1", 20, 34, 260, 36, W.hijauMuda, ["angka sejajar nilai tempat"], 10)),
      tambah("mudah", ...kartu("k2", 20, 84, 260, 36, W.langit, ["mudah diperiksa"], 10)),
      tambah("seratus", ...kartu("k3", 20, 134, 260, 36, W.krem, ["berlaku sampai 100.000"], 10)),
    ),
    k(
      "Metode ini cocok untuk penjumlahan dan pengurangan, dan menjadi dasar perkalian dan pembagian bersusun. Syaratnya satu: rapikan kolom sebelum mulai menghitung.",
      bersih(0),
      tambah(0, judul("Dasar empat operasi")),
      tambah("penjumlahan", bulat("o1", 60, 90, 20, W.hijauMuda), teks("o1s", 60, 97.5, "+", 22, W.biru)),
      tambah("pengurangan,", bulat("o2", 120, 90, 20, W.merahMuda), teks("o2s", 120, 97.5, "−", 22, W.biru)),
      tambah("perkalian", bulat("o3", 180, 90, 20, W.krem), teks("o3s", 180, 97.5, "×", 22, W.biru)),
      tambah("pembagian", bulat("o4", 240, 90, 20, W.pink), teks("o4s", 240, 97.5, "÷", 22, W.biru)),
      tambah("rapikan", ...kartu("o5", 40, 138, 220, 34, W.jingga, ["rapikan kolom dulu"], 10)),
    ),
  ],
};

/* ------------------------------ 3. Standard Algorithm: penerapan ------------------------------ */
const SA1 = susun("sa", 108, 62, "+", 57500, 22000);
const SA2 = susun("sb", 108, 62, "+", 76598, 12456);
const LANGKAH_SA = ["0 + 0 = 0", "0 + 0 = 0", "5 + 0 = 5", "7 + 2 = 9", "5 + 2 = 7"];
export const ADEGAN_LUAR_SA_TERAPAN: AdeganStory = {
  id: "luar-sa-terapan",
  judul: "Standard Algorithm pada uang bakti sosial dan Uji Kompetensi 4a",
  sumber: "Metode luar: Standard Algorithm; angka Buku Siswa hlm. 17–18 dan hlm. 26",
  latar: "#ECFDF5",
  ketukan: [
    k(
      "Terapkan pada uang Nisa: lima puluh tujuh ribu lima ratus ditambah dua puluh dua ribu. Tulis lurus menurut nilai tempat: lima, tujuh, lima, nol, nol, dan dua, dua, nol, nol, nol.",
      tambah(0, judul("Uang bakti sosial Nisa")),
      tambah("Terapkan", kalimat("kal", 232, 100, 57500, "+", 22000, undefined, 6.4, W.hitam)),
      tambah("Tulis", ...SA1.atas, ...SA1.bawah, ...SA1.alat),
    ),
    k(
      "Satuan nol, puluhan nol, ratusan lima, ribuan tujuh ditambah dua, sembilan, puluh ribuan lima ditambah dua, tujuh. Tidak ada kolom yang melebihi sembilan, jadi tidak perlu menyimpan.",
      tambah("Satuan", ...kolomSusun(SA1, 0), teks("st", 232, 78, LANGKAH_SA[0], 9, W.merah)),
      tambah("puluhan", ...kolomSusun(SA1, 1)),
      ubah("puluhan", { id: "st", isi: LANGKAH_SA[1] }),
      tambah("ratusan", ...kolomSusun(SA1, 2)),
      ubah("ratusan", { id: "st", isi: LANGKAH_SA[2] }),
      tambah("ribuan@1", ...kolomSusun(SA1, 3)),
      ubah("ribuan@1", { id: "st", isi: LANGKAH_SA[3] }),
      tambah("ribuan@2", ...kolomSusun(SA1, 4)),
      ubah("ribuan@2", { id: "st", isi: LANGKAH_SA[4] }),
    ),
    k(
      "Hasilnya tujuh puluh sembilan ribu lima ratus rupiah, sama dengan hasil cara Yohana dan cara Lukas di buku.",
      ubah("Hasilnya", { id: "kal", isi: "57.500 + 22.000 = 79.500", warna: W.hijau, u: 6.6 }),
      tambah("sama", ...kartu("cy", 160, 140, 130, 26, W.merahMuda, ["cara Yohana: 79.500"], 8.4), ...kartu("cl", 160, 172, 130, 26, W.hijauMuda, ["cara Lukas: 79.500"], 8.4)),
    ),
    k(
      "Contoh kedua, Uji Kompetensi empat a: tujuh puluh enam ribu lima ratus sembilan puluh delapan ditambah dua belas ribu empat ratus lima puluh enam sama dengan delapan puluh sembilan ribu lima puluh empat. Angka merah kecil adalah simpanan.",
      bersih(0),
      tambah(0, judul("Uji Kompetensi 4a")),
      tambah(0, ...SA2.atas, ...SA2.bawah, ...SA2.alat),
      tambah("sama", ...kolomSusun(SA2, 0, 4)),
      tambah("delapan@2", kalimat("kb", 232, 100, 76598, "+", 12456, 89054, 6, W.hijau)),
    ),
  ],
};

/* ------------------------------ 4. Regrouping: konsep ------------------------------ */
export const ADEGAN_LUAR_RG: AdeganStory = {
  id: "luar-rg",
  judul: "Metode 2: Regrouping (menyimpan dan meminjam)",
  sumber: "Metode luar: Regrouping; angka Buku Siswa hlm. 17–19",
  latar: "#EFF6FF",
  ketukan: [
    k(
      "Metode kedua, Regrouping, menyimpan dan meminjam. Prinsipnya: sepuluh di satu tempat sama dengan satu di tempat berikutnya. Sepuluh satuan menjadi satu puluhan, sepuluh puluhan menjadi satu ratusan.",
      tambah(0, judul("Regrouping: tukar nilai tempat")),
      tambah("Sepuluh@2", ...kartu("g1", 14, 50, 110, 36, W.krem, ["10 satuan"], 10.4), panah("g1a", 128, 68, 44, 0, W.merah, 2), ...kartu("g2", 176, 50, 110, 36, W.hijauMuda, ["1 puluhan"], 10.4)),
      tambah("sepuluh@3", ...kartu("g3", 14, 110, 110, 36, W.krem, ["10 puluhan"], 10.4), panah("g3a", 128, 128, 44, 0, W.merah, 2), ...kartu("g4", 176, 110, 110, 36, W.hijauMuda, ["1 ratusan"], 10.4)),
    ),
    k(
      "Pada penjumlahan, kalau satu kolom berjumlah sepuluh atau lebih, tulis angka satuannya dan simpan satu ke kolom kiri. Contoh: delapan ditambah enam sama dengan empat belas, tulis empat, simpan satu.",
      bersih(0),
      tambah(0, judul("Menyimpan pada penjumlahan")),
      tambah("Contoh:", teks("rs", 150, 66, "8 + 6 = 14", 22, W.hitam)),
      tambah("tulis@2", ...kartu("rt", 20, 92, 120, 34, W.hijauMuda, ["tulis 4"], 11)),
      tambah("simpan@2", ...kartu("ry", 160, 92, 120, 34, W.merahMuda, ["simpan 1"], 11), panah("ry1", 220, 128, 0, 24, W.merah, 2)),
      tambah("kolom@2", teks("ryk", 220, 176, "ke kolom kiri", 9, W.merah)),
    ),
    k(
      "Pada pengurangan, kalau angka atas lebih kecil, pinjam satu dari kolom kiri. Satu di kiri menjadi sepuluh di kolom ini. Contoh: nol kurang lima, pinjam, sepuluh kurang lima sama dengan lima.",
      bersih(0),
      tambah(0, judul("Meminjam pada pengurangan")),
      tambah("Contoh:", teks("pa", 150, 62, "0 − 5 tidak cukup", 14, W.merah)),
      tambah("pinjam,", ...kartu("pb", 20, 84, 260, 32, W.krem, ["pinjam 1 dari kiri: jadi +10"], 10)),
      tambah("sepuluh@2", teks("pc", 150, 150, "10 − 5 = 5", 20, W.hijau)),
    ),
    k(
      "Menyimpan dan meminjam adalah pertukaran yang adil: nilai bilangan tidak berubah, hanya cara menuliskannya. Itu sebabnya hasil akhirnya tetap benar.",
      bersih(0),
      tambah(0, judul("Nilai tidak berubah")),
      tambah("pertukaran", emo("tu", 150, 70, "🔁", 36)),
      tambah("nilai", ...kartu("nv", 30, 90, 240, 34, W.langit, ["1 ratusan = 10 puluhan"], 10.4)),
      tambah("hasil", ...kartu("hv", 30, 138, 240, 34, W.hijauMuda, ["hasil akhir tetap benar"], 10.4)),
    ),
  ],
};

/* ------------------------------ 5. Regrouping: penerapan ------------------------------ */
const RA = susun("ra", 108, 62, "+", 76598, 12456);
const RB = susun("rb", 108, 62, "−", 70000, 53000);
export const ADEGAN_LUAR_RG_TERAPAN: AdeganStory = {
  id: "luar-rg-terapan",
  judul: "Regrouping pada Uji Kompetensi 4a dan uang Zafran dan Ula",
  sumber: "Metode luar: Regrouping; angka Buku Siswa hlm. 26–28",
  latar: "#F0F9FF",
  ketukan: [
    k(
      "Terapkan pada tujuh puluh enam ribu lima ratus sembilan puluh delapan ditambah dua belas ribu empat ratus lima puluh enam. Satuan delapan tambah enam empat belas: tulis empat, simpan satu.",
      tambah(0, judul("Menyimpan: 76.598 + 12.456")),
      tambah(0, ...RA.atas, ...RA.bawah, ...RA.alat),
      tambah("Satuan", ...kolomSusun(RA, 0), teks("ls", 232, 78, "8 + 6 = 14", 9, W.merah)),
    ),
    k(
      "Puluhan sembilan tambah lima tambah satu simpanan lima belas: tulis lima, simpan satu. Ratusan lima tambah empat tambah satu sepuluh: tulis nol, simpan satu.",
      tambah("Puluhan", ...kolomSusun(RA, 1)),
      ubah("Puluhan", { id: "ls", isi: "9 + 5 + 1 = 15" }),
      tambah("Ratusan", ...kolomSusun(RA, 2)),
      ubah("Ratusan", { id: "ls", isi: "5 + 4 + 1 = 10" }),
    ),
    k(
      "Ribuan enam tambah dua tambah satu sembilan, puluh ribuan tujuh tambah satu delapan. Jumlahnya delapan puluh sembilan ribu lima puluh empat, dengan tiga kali menyimpan.",
      tambah("Ribuan", ...kolomSusun(RA, 3)),
      ubah("Ribuan", { id: "ls", isi: "6 + 2 + 1 = 9" }),
      tambah("ribuan@2", ...kolomSusun(RA, 4)),
      ubah("ribuan@2", { id: "ls", isi: "7 + 1 = 8" }),
      tambah("Jumlahnya", kalimat("lk", 232, 130, 76598, "+", 12456, 89054, 6, W.hijau)),
    ),
    k(
      "Sekarang meminjam: tujuh puluh ribu dikurangi lima puluh tiga ribu. Ribuan nol kurang tiga tidak cukup, pinjam satu puluh ribuan: sepuluh kurang tiga tujuh, lalu enam kurang lima satu. Hasilnya tujuh belas ribu.",
      bersih(0),
      tambah(0, judul("Meminjam: 70.000 − 53.000")),
      tambah(0, ...RB.atas, ...RB.bawah, ...RB.alat),
      tambah("Ribuan", ...kolomSusun(RB, 0, 2), ...kolomSusun(RB, 3), teks("lp", 232, 78, "10 − 3 = 7", 9, W.merah)),
      tambah("lalu", ...kolomSusun(RB, 4)),
      ubah("lalu", { id: "lp", isi: "7 − 1 − 5 = 1" }),
      tambah("Hasilnya", kalimat("lq", 232, 130, 70000, "−", 53000, 17000, 6, W.hijau)),
    ),
  ],
};
