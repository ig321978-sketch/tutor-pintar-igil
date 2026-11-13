import type { AdeganStory } from "./logika-story";
import { SEPATU, W, barisTempat, bulat, emo, garis, kartu, kepalaTempat, kotak, teks } from "./k5b9b-gambar";
import { bersih, hapus, k, redamkan, sorotkan, tambah, ubah } from "./k5b9b-bantu";

/* ------------------------------ 4. Eksplorasi 9.2A pertanyaan 2 sampai 7: kolom demi kolom (hlm. 285) ------------------------------ */
const yB = (i: number) => 50 + i * 22;
const tabelSepatu = () => [kepalaTempat("kp", 32), barisTempat("r0", yB(0), SEPATU[0].angka, "Komang", W.krem), barisTempat("r1", yB(1), SEPATU[1].angka, "Lukas", W.hijauMuda), barisTempat("r2", yB(2), SEPATU[2].angka, "Nisa", W.muda)].flat();
const hasil = (id: string, y: number, isi: string, warna: string = W.biru) => teks(id, 40, y, isi, 8.4, warna, { anchor: "start" });

export const ADEGAN_SEPATU_KOLOM: AdeganStory = {
  id: "sepatu-kolom",
  judul: "Eksplorasi 9.2A pertanyaan 2 sampai 7: siapa terbesar di tiap kolom",
  sumber: "Buku Siswa hlm. 285",
  latar: "#F0FDF4",
  kutipan: ["Sepatu siapa yang menempati ratus ribuan termahal", "Sepatu siapa yang menempati puluh ribuan termahal", "Sepatu siapa yang menempati ribuan termahal", "Sepatu siapa yang menempati satuan termahal"],
  ketukan: [
    k(
      "Pertanyaan dua: sepatu siapa yang menempati ratus ribuan termahal, dan berapa nilainya? Lihat kolom pertama: 3, 4, dan 2.",
      tambah(0, teks("jud", 150, 18, "Siapa terbesar di tiap kolom?", 11, W.ungu), tabelSepatu()),
      sorotkan("pertama:", "r0c0", "r1c0", "r2c0"),
    ),
    k(
      "Angka 4 paling besar, milik sepatu Lukas. Nilainya 4 kali 100.000, yaitu 400.000.",
      redamkan("Angka", "r0c0", "r2c0"),
      tambah("Nilainya", hasil("l0", 130, "ratus ribuan: Lukas, 4 x 100.000 = 400.000", W.hijau)),
    ),
    k(
      "Pertanyaan tiga, kolom puluh ribuan: 4, 3, dan 3. Angka 4 terbesar milik sepatu Komang, jadi nilainya 40.000.",
      redamkan(0, "r1c0"),
      sorotkan("kolom", "r0c1", "r1c1", "r2c1"),
      redamkan("terbesar", "r1c1", "r2c1"),
      tambah("nilainya", hasil("l1", 142, "puluh ribuan: Komang, 4 x 10.000 = 40.000", W.merah)),
    ),
    k(
      "Pertanyaan empat, kolom ribuan: ketiganya 2. Jadi ribuannya sama besar, masing-masing 2.000, dan belum ada yang unggul.",
      redamkan(0, "r0c1"),
      sorotkan("kolom", "r0c2", "r1c2", "r2c2"),
      tambah("masing-masing", hasil("l2", 154, "ribuan: sama semua, 2 x 1.000 = 2.000", W.ungu)),
    ),
    k(
      "Pertanyaan lima, kolom ratusan: 2, 5, dan 2, jadi Lukas unggul dengan nilai 500. Pertanyaan enam, kolom puluhan: 3, 4, dan 3, Lukas lagi, nilainya 40.",
      redamkan(0, "r0c2", "r1c2", "r2c2"),
      sorotkan("ratusan:", "r1c3"),
      tambah("500.", hasil("l3", 166, "ratusan: Lukas, 5 x 100 = 500", W.hijau)),
      redamkan("puluhan:", "r1c3"),
      sorotkan("puluhan:", "r1c4"),
      tambah("40.", hasil("l4", 178, "puluhan: Lukas, 4 x 10 = 40", W.hijau)),
    ),
    k(
      "Pertanyaan tujuh, kolom satuan: 1, 3, dan 1. Lukas terbesar lagi, nilainya 3. Jadi Lukas menang di hampir semua kolom, kecuali puluh ribuan dan ribuan.",
      redamkan(0, "r1c4"),
      sorotkan("kolom", "r1c5"),
      tambah("nilainya", hasil("l5", 190, "satuan: Lukas, 3 x 1 = 3", W.hijau)),
    ),
  ],
};

/* ------------------------------ 5. Urutan harga dan banding dua sepatu (hlm. 285–286) ------------------------------ */
const bar = (id: string, y: number, w: number, nama: string, harga: string, warna: string) => [
  teks(`${id}-n`, 62, y + 15, nama, 9, W.biru, { anchor: "end" }),
  kotak(`${id}-k`, 70, y, w, 22, warna, W.biru, { rx: 4 }),
  teks(`${id}-h`, 76, y + 15, harga, 9.4, W.biru, { anchor: "start" }),
];

export const ADEGAN_SEPATU_URUT: AdeganStory = {
  id: "sepatu-urut",
  judul: "Eksplorasi 9.2A pertanyaan 8 sampai 12: urutan dan banding",
  sumber: "Buku Siswa hlm. 285–286",
  latar: "#FFFBEB",
  kutipan: ["Urutkanlah sepatu dari yang harganya termahal sampai", "Sepatu siapa yang harganya termahal", "Sepatu siapa yang harganya termurah", "Di antara sepatu Komang dan sepatu Nisa, mana yang lebih", "Di antara sepatu Lukas dan sepatu Komang, mana yang lebih"],
  ketukan: [
    k(
      "Kolom ratus ribuan menentukan hasilnya. Sepatu Lukas memiliki 4, Komang 3, dan Nisa 2. Jadi Lukas terbesar, lalu Komang, lalu Nisa.",
      tambah(0, teks("jud", 150, 22, "Kolom ratus ribuan", 12, W.ungu)),
      tambah("Lukas", bulat("c1", 70, 86, 18, W.hijauMuda), teks("c1t", 70, 93, "4", 20), teks("c1n", 70, 124, "Lukas", 9)),
      tambah("Komang", bulat("c2", 150, 86, 18, W.krem), teks("c2t", 150, 93, "3", 20), teks("c2n", 150, 124, "Komang", 9)),
      tambah("Nisa", bulat("c3", 230, 86, 18, W.muda), teks("c3t", 230, 93, "2", 20), teks("c3n", 230, 124, "Nisa", 9)),
      tambah("terbesar", teks("urt", 150, 164, "terbesar ke terkecil", 11, W.merah)),
    ),
    k(
      "Urutan dari termahal sampai termurah adalah sepatu Lukas, sepatu Komang, lalu sepatu Nisa. Tuliskan harganya: 432.543, 342.231, dan 232.231.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Urutan harga sepatu", 12, W.ungu)),
      tambah("Lukas,", bar("b1", 44, 173, "Lukas", "432.543", W.hijauMuda)),
      tambah("Komang,", bar("b2", 76, 137, "Komang", "342.231", W.krem)),
      tambah("Nisa.", bar("b3", 108, 93, "Nisa", "232.231", W.muda)),
      tambah("Tuliskan", teks("rt", 150, 160, "432.543 > 342.231 > 232.231", 12, W.ungu)),
    ),
    k(
      "Pertanyaan sembilan dan sepuluh. Sepatu termahal milik Lukas, dan sepatu termurah milik Nisa.",
      hapus(0, "rt"),
      tambah("termahal", teks("tm", 248, 60, "termahal", 8, W.hijau, { anchor: "start" })),
      sorotkan("termahal", "b1-k"),
      tambah("termurah", teks("tr", 168, 124, "termurah", 8, W.merah, { anchor: "start" })),
      redamkan("termurah", "b1-k"),
      sorotkan("termurah", "b3-k"),
    ),
    k(
      "Pertanyaan sebelas: sepatu Komang dan sepatu Nisa, mana yang lebih mahal? Ratus ribuannya 3 dan 2, jadi sepatu Komang lebih mahal.",
      redamkan(0, "b3-k"),
      hapus(0, "tm", "tr"),
      sorotkan("Komang", "b2-k", "b3-k"),
      tambah("Ratus", teks("cp", 150, 160, "ratus ribuan: 3 > 2, Komang lebih mahal", 10, W.ungu)),
    ),
    k(
      "Pertanyaan dua belas: sepatu Lukas dan sepatu Komang, mana yang lebih murah? Ratus ribuannya 4 dan 3, jadi sepatu Komang lebih murah.",
      redamkan(0, "b2-k", "b3-k"),
      sorotkan("Lukas", "b1-k", "b2-k"),
      ubah("Ratus", { id: "cp", isi: "ratus ribuan: 4 > 3, Komang lebih murah" }),
    ),
    k(
      "Aturannya: bandingkan kolom dari kiri. Kolom pertama yang angkanya berbeda menentukan bilangan mana yang lebih besar.",
      redamkan(0, "b1-k", "b2-k"),
      hapus(0, "cp"),
      tambah("Aturannya:", kartu("at", 24, 150, 252, 44, W.krem, ["bandingkan dari kolom paling kiri", "kolom pertama yang berbeda yang menentukan"], 9.4)),
    ),
  ],
};

/* ------------------------------ 6. Eksplorasi 9.2B: data wisatawan (hlm. 286) ------------------------------ */
const TAHUN = ["2016", "2017", "2018", "2019", "2020"];
const NILAI = [355313, 397951, 416373, 433027, 69968];
const LABEL = ["355.313", "397.951", "416.373", "433.027", "69.968"];
const XT = [62, 116, 170, 224, 268];
const yNilai = (v: number) => Math.round((160 - (v / 500000) * 110) * 10) / 10;
const titikGrafik = (i: number) => [bulat(`gt${i}`, XT[i], yNilai(NILAI[i]), 3.6, W.merah, W.biru), teks(`gl${i}`, XT[i], i === 4 ? yNilai(NILAI[i]) + 15 : yNilai(NILAI[i]) - 7, LABEL[i], 7.8)];
const ruasGrafik = (i: number) => garis(`gr${i}`, XT[i - 1], yNilai(NILAI[i - 1]), XT[i] - XT[i - 1], yNilai(NILAI[i]) - yNilai(NILAI[i - 1]), W.merah, 2, { gambar: true });

export const ADEGAN_WISATAWAN_DATA: AdeganStory = {
  id: "wisatawan-data",
  judul: "Eksplorasi 9.2B: wisatawan mancanegara di Yogyakarta",
  sumber: "Buku Siswa hlm. 286",
  latar: "#F0F9FF",
  kutipan: ["Eksplorasi 9.2B", "Yogyakarta dikenal sebagai Kota Pelajar", "Berikut data wisatawan mancanegara", "Banyaknya Wisatawan Mancanegara yang Berkunjung ke Yogyakarta"],
  ketukan: [
    k(
      "Eksplorasi 9.2B. Yogyakarta dikenal sebagai Kota Pelajar, Kota Gudeg, Kota Seniman, dan Kota Wisata, karena banyak wisatawan datang berkunjung.",
      tambah(0, teks("jud", 150, 26, "Eksplorasi 9.2B", 13, W.ungu)),
      tambah("Pelajar,", emo("e1", 45, 96, "🎓", 30), teks("e1t", 45, 120, "Pelajar", 9)),
      tambah("Gudeg,", emo("e2", 115, 96, "🍛", 30), teks("e2t", 115, 120, "Gudeg", 9)),
      tambah("Seniman,", emo("e3", 185, 96, "🎨", 30), teks("e3t", 185, 120, "Seniman", 9)),
      tambah("Wisata,", emo("e4", 255, 96, "🧳", 30), teks("e4t", 255, 120, "Wisata", 9)),
    ),
    k(
      "Buku menyajikan data wisatawan mancanegara yang berkunjung ke Yogyakarta pada tahun 2016 sampai 2020, dalam grafik garis, Gambar 9.6.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Gambar 9.6: wisatawan mancanegara", 10.5, W.ungu)),
      tambah("tahun", garis("ax", 40, 160, 250, 0), garis("ay", 40, 160, 0, -115)),
      tambah("2016", TAHUN.map((t, i) => teks(`th${i}`, XT[i], 176, t, 8))),
    ),
    k(
      "Tahun 2016 ada 355.313 wisatawan, tahun 2017 ada 397.951 wisatawan, dan tahun 2018 ada 416.373 wisatawan.",
      tambah("355.313", titikGrafik(0)),
      tambah("397.951", ruasGrafik(1), titikGrafik(1)),
      tambah("416.373", ruasGrafik(2), titikGrafik(2)),
    ),
    k(
      "Tahun 2019 ada 433.027 wisatawan. Lalu tahun 2020 turun jauh menjadi 69.968 wisatawan saja.",
      tambah("433.027", ruasGrafik(3), titikGrafik(3)),
      tambah("69.968", ruasGrafik(4), titikGrafik(4)),
    ),
    k(
      "Perhatikan, 69.968 hanya punya lima angka, sedangkan empat bilangan lainnya punya enam angka. Bilangan dengan angka lebih sedikit pasti lebih kecil.",
      sorotkan("69.968", "gt4", "gl4"),
      tambah("lima", kartu("n5", 20, 178, 124, 18, W.merahMuda, ["69.968: 5 angka"], 8.6)),
      tambah("enam", kartu("n6", 156, 178, 124, 18, W.hijauMuda, ["lainnya: 6 angka"], 8.6)),
    ),
  ],
};

/* ------------------------------ 7. Eksplorasi 9.2B pertanyaan 1 sampai 3 (hlm. 287) ------------------------------ */
const ANGKA_TAHUN = ["355313", "397951", "416373", "433027", " 69968"];
const yT = (i: number) => 58 + i * 20;
const tabelTahun = () => [kepalaTempat("kp", 40), ...TAHUN.flatMap((t, i) => barisTempat(`t${i}`, yT(i), ANGKA_TAHUN[i], t, W.putih))].flat();

export const ADEGAN_WISATAWAN_URUT: AdeganStory = {
  id: "wisatawan-urut",
  judul: "Eksplorasi 9.2B pertanyaan 1 sampai 3: paling sedikit dan urutan",
  sumber: "Buku Siswa hlm. 287",
  latar: "#ECFEFF",
  kutipan: ["Pada tahun berapa jumlah kunjungan tamu mancanegara paling", "urutan dari yang terbesar", "yang dimulai dari yang terkecil"],
  ketukan: [
    k(
      "Tabel nilai tempat membantu kita. Tuliskan lima bilangan tadi, satu angka untuk satu kolom. Untuk 69.968, kolom ratus ribuan dibiarkan kosong.",
      tambah(0, teks("jud", 150, 18, "Lima bilangan pada tabel", 11, W.ungu)),
      tambah("Tuliskan", tabelTahun()),
      tambah("Untuk", teks("c1", 150, 180, "69.968: ratus ribuan kosong", 10, W.merah)),
    ),
    k(
      "Pertanyaan satu: pada tahun berapa kunjungan paling sedikit? Pada kolom ratus ribuan, tahun 2020 kosong, jadi bilangannya paling kecil. Jawabannya tahun 2020.",
      ubah(0, { id: "c1", isi: "Pertanyaan 1: tahun paling sedikit?" }),
      sorotkan("kosong,", "t4c0", "t4n"),
      tambah("Jawabannya", teks("c2", 150, 195, "jawaban: tahun 2020", 10, W.hijau)),
    ),
    k(
      "Pertanyaan dua: urutkan dari yang terbesar. Ratus ribuan 4 ada pada tahun 2018 dan 2019. Puluh ribuannya 1 dan 3, jadi 433.027 lebih besar daripada 416.373.",
      redamkan(0, "t4c0", "t4n"),
      ubah(0, { id: "c1", isi: "ratus ribuan 4: tahun 2018 dan 2019" }),
      ubah(0, { id: "c2", isi: "puluh ribuan 1 < 3, jadi 433.027 > 416.373" }),
      sorotkan("Puluh", "t2c1", "t3c1"),
    ),
    k(
      "Dua bilangan lain punya ratus ribuan 3, yaitu tahun 2016 dan 2017. Puluh ribuannya 5 dan 9, jadi 397.951 lebih besar daripada 355.313.",
      redamkan(0, "t2c1", "t3c1"),
      ubah(0, { id: "c1", isi: "ratus ribuan 3: tahun 2016 dan 2017" }),
      ubah(0, { id: "c2", isi: "puluh ribuan 5 < 9, jadi 397.951 > 355.313" }),
      sorotkan("Puluh", "t0c1", "t1c1"),
    ),
    k(
      "Urutan dari terbesar: 433.027, 416.373, 397.951, 355.313, lalu 69.968. Dari terkecil tinggal dibalik: 69.968, 355.313, 397.951, 416.373, dan 433.027.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Urutan bilangan wisatawan", 12, W.ungu)),
      tambah("Urutan", teks("u1", 150, 64, "dari terbesar", 10, W.merah), teks("u2", 150, 84, "433.027 > 416.373 > 397.951 > 355.313 > 69.968", 8.6)),
      tambah("terkecil", teks("u3", 150, 128, "dari terkecil", 10, W.hijau), teks("u4", 150, 148, "69.968 < 355.313 < 397.951 < 416.373 < 433.027", 8.6)),
    ),
  ],
};
