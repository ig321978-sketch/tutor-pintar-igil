import type { AdeganStory } from "./logika-story";
import { PX, W, apem, barisApem, barisTomat, emo, garis, kartu, kotak, tabelPerBaris, teks, tomat } from "./k5b8b-gambar";
import { bersih, k, sorotkan, tambah } from "./k5b8b-bantu";
import { kutipanLokal } from "./kutipan-lokal";

const catatan = (id: string, x: number, y: number, isi: string) => teks(id, x, y, isi, 7.4, W.merah, { anchor: "start" });

/** Kotak kunci tomat: satu gambar tomat mewakili 2 kg. */
const kunciTomat = (id: string, x: number, y: number) => [kotak(`${id}-k`, x, y, 128, 20, W.putih, W.biru, { rx: 6 }), ...tomat(`${id}-g`, x + 14, y + 10, 6), teks(`${id}-t`, x + 74, y + 14, "mewakili 2 kg", 8, W.biru)];

/* ------------------------------ 9. Ayo Berlatih: data panen tomat (hlm. 251–252) ------------------------------ */
const TABEL_TOMAT = tabelPerBaris("tt", 20, 40, ["Minggu ke-", "Hasil Panen (kg)"], [["1", "10"], ["2", "14"], ["3", "20"], ["4", "12"], ["5", "4"]], 70, 84);

export const ADEGAN_TOMAT_DATA: AdeganStory = {
  id: "tomat-data",
  judul: "Tantangan: hasil panen tomat Pak Malosi",
  sumber: "Materi: tantangan panen tomat",
  latar: "#FEF2F2",
  kutipan: kutipanLokal("k5b8b-materi-3.ts:1"),
  ketukan: [
    k(
      "Sekarang ada Tantangan. Pak Malosi punya kebun sayuran, dan salah satunya tomat. Hasil panen lima minggu dicatat dalam sebuah tabel.",
      tambah(0, teks("jud", 150, 24, "Tantangan: tomat Pak Malosi", 12, W.ungu)),
      tambah("tomat.", emo("tm", 150, 96, "🍅", 44)),
      tambah("tabel.", teks("tb", 150, 142, "Hasil Panen Tomat Lima Minggu", 11, W.merah)),
    ),
    k(
      "Minggu ke-1 panen 10 kilogram, minggu ke-2 panen 14 kilogram, dan minggu ke-3 panen 20 kilogram.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Hasil Panen Tomat", 12, W.ungu)),
      tambah(0, TABEL_TOMAT[0]),
      tambah("ke-1", TABEL_TOMAT[1]),
      tambah("ke-2", TABEL_TOMAT[2]),
      tambah("ke-3", TABEL_TOMAT[3]),
    ),
    k(
      "Minggu ke-4 panen 12 kilogram, dan minggu ke-5 panen 4 kilogram.",
      tambah("ke-4", TABEL_TOMAT[4]),
      tambah("ke-5", TABEL_TOMAT[5]),
    ),
    k(
      "Pertanyaan a: buat piktogram. Kita pilih keterangan gambar, satu gambar tomat mewakili 2 kilogram, sebab semua data genap.",
      tambah("keterangan", kartu("kt", 184, 50, 100, 52, W.putih, ["1 gambar tomat", "mewakili 2 kg"], 8.4)),
      tambah("genap.", teks("gn", 234, 126, "semua data genap", 8.4, W.hijau)),
    ),
  ],
};

/* ------------------------------ 10. Piktogram tomat (hlm. 252; Buku Panduan Guru hlm. 362–363) ------------------------------ */
const Y_TOMAT = (i: number) => 46 + i * 22;

export const ADEGAN_TOMAT_PIKTOGRAM: AdeganStory = {
  id: "tomat-piktogram",
  judul: "Pertanyaan a: membuat piktogram hasil panen tomat",
  sumber: "Materi: piktogram panen tomat",
  latar: "#F0F9FF",
  kutipan: kutipanLokal("k5b8b-materi-3.ts:2"),
  ketukan: [
    k(
      "Inilah piktogram hasil panen tomat. Satu gambar tomat mewakili 2 kilogram. Minggu ke-1: 10 dibagi 2 sama dengan 5 gambar.",
      tambah(0, teks("jud", 150, 20, "Hasil Panen Tomat Pak Malosi", 11, W.ungu)),
      tambah(0, garis("ax", PX - 8, 34, 0, 110, W.hitam, 2, { gambar: true })),
      tambah("mewakili", kunciTomat("kn", 86, 160)),
      tambah("Minggu", barisTomat("t0", Y_TOMAT(0), "Minggu 1", 10, 2)),
      tambah("dibagi", catatan("c0", 212, Y_TOMAT(0) + 3, "10 : 2 = 5")),
    ),
    k(
      "Minggu ke-2: 14 dibagi 2 sama dengan 7 gambar. Minggu ke-3: 20 dibagi 2 sama dengan 10 gambar.",
      tambah("Minggu", barisTomat("t1", Y_TOMAT(1), "Minggu 2", 14, 2)),
      tambah("14", catatan("c1", 212, Y_TOMAT(1) + 3, "14 : 2 = 7")),
      tambah("ke-3:", barisTomat("t2", Y_TOMAT(2), "Minggu 3", 20, 2)),
      tambah("20", catatan("c2", 212, Y_TOMAT(2) + 3, "20 : 2 = 10")),
    ),
    k(
      "Minggu ke-4: 12 dibagi 2 sama dengan 6 gambar. Minggu ke-5: 4 dibagi 2 sama dengan 2 gambar.",
      tambah("Minggu", barisTomat("t3", Y_TOMAT(3), "Minggu 4", 12, 2)),
      tambah("12", catatan("c3", 212, Y_TOMAT(3) + 3, "12 : 2 = 6")),
      tambah("ke-5:", barisTomat("t4", Y_TOMAT(4), "Minggu 5", 4, 2)),
      tambah(11, catatan("c4", 212, Y_TOMAT(4) + 3, "4 : 2 = 2")),
    ),
    k(
      "Piktogram yang baik punya judul, label yang jelas, dan keterangan gambar. Keterangan lain juga boleh, asal gambarnya sesuai dengan keterangannya.",
      tambah("baik", teks("cl", 150, 192, "piktogram baik: judul, label, arti gambar", 9, W.hijau)),
      sorotkan("keterangannya.", "kn-k"),
    ),
  ],
};

/* ------------------------------ 11. Jawaban b sampai e (hlm. 252; Buku Panduan Guru hlm. 363) ------------------------------ */
export const ADEGAN_TOMAT_JAWAB: AdeganStory = {
  id: "tomat-jawab",
  judul: "Pertanyaan b sampai e: total, kenaikan, penurunan, dan selisih panen",
  sumber: "Materi: total, naik, turun, dan selisih",
  latar: "#F5F3FF",
  kutipan: kutipanLokal("k5b8b-materi-3.ts:3"),
  ketukan: [
    k(
      "Pertanyaan b: total panen lima minggu adalah 10 ditambah 14 ditambah 20 ditambah 12 ditambah 4, yaitu 60 kilogram.",
      tambah(0, teks("jud", 150, 22, "Pertanyaan b: total panen", 13, W.ungu)),
      tambah(9, teks("b1", 150, 54, "10 + 14 = 24", 12, W.biru)),
      tambah(11, teks("b2", 150, 78, "24 + 20 = 44", 12, W.biru)),
      tambah(13, teks("b3", 150, 102, "44 + 12 = 56", 12, W.biru)),
      tambah(15, teks("b4", 150, 126, "56 + 4 = 60", 12, W.biru)),
      tambah(17, teks("b5", 150, 166, "total 60 kg", 15, W.merah)),
    ),
    k(
      "Pertanyaan c: panen naik dari minggu ke-1 ke minggu ke-2, yaitu 10 menjadi 14, dan dari minggu ke-2 ke minggu ke-3, yaitu 14 menjadi 20.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Pertanyaan c: panen naik", 13, W.ungu)),
      tambah("ke-1", teks("n1", 150, 66, "minggu 1 ke 2: 10 menjadi 14", 11, W.hijau)),
      tambah("ke-3,", teks("n2", 150, 98, "minggu 2 ke 3: 14 menjadi 20", 11, W.hijau)),
      tambah("20.", teks("n3", 150, 140, "naik pada minggu 2 dan minggu 3", 10, W.merah)),
    ),
    k(
      "Pertanyaan d: panen turun dari minggu ke-3 ke minggu ke-4, yaitu 20 menjadi 12, turun 8 kilogram. Lalu dari minggu ke-4 ke minggu ke-5, yaitu 12 menjadi 4, turun 8 kilogram juga.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Pertanyaan d: panen turun", 13, W.ungu)),
      tambah("ke-3", teks("d1", 150, 60, "minggu 3 ke 4: 20 - 12 = 8", 11, W.merah)),
      tambah("Lalu", teks("d2", 150, 92, "minggu 4 ke 5: 12 - 4 = 8", 11, W.merah)),
    ),
    k(
      "Penurunan paling banyak terjadi pada minggu ke-4 dan minggu ke-5, yaitu 8 kilogram. Pertanyaan e: selisih tertinggi 20 dan terendah 4 adalah 16 kilogram.",
      tambah("Penurunan", teks("d3", 150, 124, "paling banyak: minggu 4 dan 5, 8 kg", 10, W.merah)),
      tambah("tertinggi", teks("e1", 150, 154, "tertinggi 20, terendah 4", 11, W.biru)),
      tambah("16", teks("e2", 150, 182, "20 - 4 = 16", 14, W.hijau)),
    ),
    k(
      "Ada cara lain untuk mencari selisih. Dari piktogram, 10 gambar dikurangi 2 gambar sama dengan 8 gambar, lalu 8 dikali 2 kilogram sama dengan 16 kilogram.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Selisih lewat gambar", 13, W.ungu)),
      tambah("Dari", teks("g1", 150, 66, "tertinggi 10 gambar, terendah 2 gambar", 9.6, W.biru)),
      tambah("dikurangi", teks("g2", 150, 96, "10 - 2 = 8 gambar", 12, W.merah)),
      tambah("dikali", teks("g3", 150, 130, "8 x 2 = 16 kg", 14, W.hijau)),
    ),
  ],
};

/* ------------------------------ 12. Hati-hati, tantangan, dan renungan ------------------------------ */
export const ADEGAN_KESALAHAN_REFLEKSI: AdeganStory = {
  id: "kesalahan-refleksi",
  judul: "Hati-hati, tantangan, dan renungan",
  sumber: "Materi: hati-hati dan renungan",
  latar: "#EEF2FF",
  kutipan: kutipanLokal("k5b8b-materi-3.ts:4"),
  ketukan: [
    k(
      "Hati-hati saat membaca piktogram: jangan lupa memperhatikan keterangan gambar. Sepuluh gambar apem pada hari Senin bukan 10 kue, tetapi 40 kue.",
      tambah(0, teks("jud", 150, 22, "Hati-hati membaca piktogram", 12, W.ungu)),
      tambah("Sepuluh", barisApem("sn", 62, "Senin", 40)),
      tambah("bukan", teks("kb", 150, 100, "bukan 10 kue", 11, W.merah)),
      tambah("40", teks("kh", 150, 130, "10 x 4 = 40 kue", 12, W.hijau)),
    ),
    k(
      "Hati-hati saat membuat piktogram: gambar untuk nilai yang sama jangan dibuat dengan ukuran berbeda. Semua gambar untuk nilai sama harus berukuran sama.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Ukuran gambar harus sama", 12, W.ungu)),
      tambah("berbeda.", ...apem("s1", 110, 66, 4, 5), ...apem("s2", 150, 66, 4, 11), ...apem("s3", 190, 66, 4, 7), teks("st", 150, 96, "salah: ukuran berbeda", 10, W.merah)),
      tambah("harus", ...apem("b1", 110, 134, 4, 8), ...apem("b2", 150, 134, 4, 8), ...apem("b3", 190, 134, 4, 8), teks("bt", 150, 164, "benar: ukuran sama", 10, W.hijau)),
    ),
    k(
      "Hati-hati juga dengan potongan: setengah gambar mewakili setengah nilai. Jika satu gambar mewakili 4, setengah gambar mewakili 2.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Setengah gambar", 13, W.ungu)),
      tambah("satu", apem("h1", 90, 80, 4, 16), teks("h1t", 90, 118, "1 gambar = 4", 10, W.biru)),
      tambah("setengah@3", apem("h2", 210, 80, 2, 16), teks("h2t", 210, 118, "setengah = 2", 10, W.merah)),
      tambah("mewakili@3", teks("h3", 150, 160, "4 : 2 = 2", 14, W.hijau)),
    ),
    k(
      "Tantangan untukmu: kumpulkan data sendiri, misalnya banyak jeruk di rumah tiap hari, lalu buat piktogramnya. Pilih keterangan gambar yang pas, dan periksa tiap barisnya.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Tantangan", 13, W.ungu)),
      tambah("kumpulkan", kartu("p1", 20, 48, 124, 60, W.hijauMuda, ["kumpulkan", "data sendiri"], 9.4)),
      tambah("jeruk", emo("pg", 150, 150, "🍊", 32)),
      tambah("buat", kartu("p2", 156, 48, 124, 60, W.krem, ["buat", "piktogramnya"], 9.4)),
      sorotkan("periksa", "p1-k", "p2-k"),
    ),
    k(
      "Sekarang waktunya Renungan. Tanyakan pada dirimu: apakah aku dapat membuat piktogram, membaca data dari piktogram, dan menganalisis data dari piktogram?",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Renungan", 13, W.ungu)),
      tambah("membuat", kartu("r1", 14, 46, 272, 28, W.hijauMuda, ["Aku dapat membuat piktogram"], 9)),
      tambah("membaca", kartu("r2", 14, 84, 272, 28, W.muda, ["Aku dapat membaca data dari piktogram"], 9)),
      tambah("menganalisis", kartu("r3", 14, 122, 272, 28, W.krem, ["Aku dapat menganalisis data dari piktogram"], 8.4)),
    ),
    k(
      "Kalau belum yakin, ulangi bagian yang kurang, lalu lanjutkan ke video berikutnya.",
      tambah("yakin,", teks("yt", 150, 176, "belum yakin? ulangi dulu", 11, W.merah)),
      sorotkan("ulangi", "r1-k", "r2-k", "r3-k"),
    ),
  ],
};
