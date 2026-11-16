import type { AdeganStory } from "./logika-story";
import { W, deret, emo, judul, kartu, panah, papanIsi, papanKepala, papanKolom, teks, TEMPAT } from "./k4b1a-gambar";
import { bersih, idx, k, sorotkan, tambah } from "./k4b1a-bantu";

export const NAMA_METODE = ["Dienes Blocks", "Place-Value Chart", "Zero as Placeholder", "Say-Write-Show"];
export const NAMA_METODE_ID = ["Balok Dienes Empat Tingkat", "Papan Nilai Tempat", "Nol Penjaga Tempat", "Ucap, Tulis, Tunjuk"];
export const WARNA_METODE = [W.hijauMuda, W.langit, W.krem, W.pink];

/** Kepala metode: kartu nama di bagian atas adegan konsep dan penerapan. */
export const kepala = (i: number) => kartu("hd", 6, 26, 288, 22, WARNA_METODE[i], [`${NAMA_METODE[i]} · ${NAMA_METODE_ID[i]}`], 8.8);

/* ------------------------------ 1. Pembuka metode luar ------------------------------ */
const SUARA_O1 = "Bagaimana kita membaca dan menulis bilangan empat angka dengan benar? Guru di berbagai negara punya cara berbeda. Dalam video ini kita lihat empat metode dari luar, dengan angka yang sama seperti pelajaran kita.";
const SUARA_O2 = "Empat metode itu: Dienes Blocks, Place-Value Chart, Zero as Placeholder, dan Say-Write-Show.";
const SUARA_O3 = "Nama dalam bahasa Indonesia: Balok Dienes Empat Tingkat, Papan Nilai Tempat, Nol Penjaga Tempat, dan Ucap, Tulis, Tunjuk. Metode keempat cocok dipakai bersama kartu angka kita.";
const SUARA_O4 = "Semuanya menjawab satu pertanyaan: bagaimana menyebut dan menuliskan bilangan? Dengan membangun balok, mengisi papan, menjaga nol, dan melatih ucapan, tulisan, serta tunjukan kartu.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Empat metode dari luar untuk membaca dan menulis bilangan",
  sumber: "Metode luar: pembuka",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_O1,
      tambah(0, judul("Empat metode dari luar")),
      tambah("membaca", ...kartu("po1", 20, 40, 120, 40, W.putih, ["3.286"], 18), ...kartu("po2", 160, 40, 120, 40, W.putih, ["3.254"], 18)),
      tambah("berbagai", emo("gl", 245, 142, "🌍", 34)),
      tambah("empat", ...kartu("pk4", 20, 110, 180, 36, W.emas, ["4 metode dari luar"], 10)),
    ),
    k(
      SUARA_O2,
      bersih(0),
      tambah(0, judul("Empat metode")),
      ...NAMA_METODE.map((m, i) => tambah(["Dienes", "Place-Value", "Zero", "Say-Write-Show"][i], ...kartu(`m${i}`, 12, 34 + i * 38, 276, 30, WARNA_METODE[i], [`${i + 1}. ${m}`], 9.6))),
    ),
    k(
      SUARA_O3,
      bersih(0),
      tambah(0, judul("Nama dalam bahasa Indonesia")),
      ...NAMA_METODE_ID.map((m, i) => tambah(["Balok", "Papan", "Nol", "Ucap,"][i], ...kartu(`n${i}`, 12, 34 + i * 38, 276, 30, WARNA_METODE[i], [`${i + 1}. ${m}`], 9.6))),
      tambah("keempat", emo("n4", 268, 160, "⭐", 18)),
    ),
    k(
      SUARA_O4,
      bersih(0),
      tambah(0, judul("Satu pertanyaan, empat cara")),
      tambah("membangun", emo("i1", 45, 82, "🧱", 32), teks("i1t", 45, 112, "bangun balok", 8, W.biru)),
      tambah("mengisi", emo("i2", 112, 82, "📋", 32), teks("i2t", 112, 112, "isi papan", 8, W.biru)),
      tambah("menjaga", emo("i3", 188, 82, "0", 32), teks("i3t", 188, 112, "jaga nol", 8, W.biru)),
      tambah("melatih", emo("i4", 258, 82, "🗣", 32), teks("i4t", 258, 112, "ucap tulis tunjuk", 7.4, W.biru)),
      tambah("pertanyaan:", ...kartu("iq", 30, 136, 240, 30, W.emas, ["bagaimana menyebut dan menulis bilangan?"], 9)),
    ),
  ],
};

/* ------------------------------ 2. Dienes Blocks: konsep ------------------------------ */
const SUARA_S1 = "Metode pertama, Dienes Blocks, atau Balok Dienes Empat Tingkat. Bilangan disusun dari balok empat ukuran: peti, dus, bungkus, dan benda lepas.";
const SUARA_S2 = "Satu benda bernilai satu. Satu bungkus bernilai sepuluh. Satu dus bernilai seratus. Satu peti bernilai seribu.";
const SUARA_S3 = "Aturan tukar: sepuluh benda ditukar satu bungkus, dan sepuluh bungkus ditukar satu dus.";
const SUARA_S4 = "Sepuluh dus ditukar satu peti, jadi satu peti bernilai seribu. Karena itu tiap jenis balok tidak pernah lebih dari sembilan.";

export const ADEGAN_LUAR_DIENES: AdeganStory = {
  id: "luar-dienes",
  judul: "Dienes Blocks: peti, dus, bungkus, benda",
  sumber: "Metode luar: Dienes Blocks",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_S1,
      tambah(0, judul("Dienes Blocks")),
      tambah("pertama,", kepala(0)),
      tambah("peti,", ...deret("sa", "p", 40, 84, 1, 1), teks("sal", 48, 70, "peti", 8.6, W.biru)),
      tambah("dus,", ...deret("sa", "u", 110, 89, 1, 1), teks("sbl", 116, 70, "dus", 8.6, W.biru)),
      tambah("bungkus,", ...deret("sa", "b", 180, 84, 1, 1), teks("scl", 182, 70, "bungkus", 8.6, W.biru)),
      tambah("benda", ...deret("sa", "o", 244, 90, 1, 1), teks("sdl", 248, 70, "benda", 8.6, W.biru)),
    ),
    k(
      SUARA_S2,
      tambah("benda", teks("sv0", 248, 118, "1", 12, W.merah)),
      tambah("bungkus", teks("sv1", 182, 118, "10", 12, W.merah)),
      tambah("dus", teks("sv2", 116, 118, "100", 12, W.merah)),
      tambah("peti", teks("sv3", 48, 118, "1.000", 12, W.merah)),
    ),
    k(
      SUARA_S3,
      bersih(0),
      tambah(0, judul("Aturan tukar"), kepala(0)),
      tambah("sepuluh", ...deret("sb", "o", 20, 78, 10, 10), panah("sbp", 125, 83, 36, 0, W.biru, 2)),
      tambah("satu", ...deret("sb", "b", 180, 72, 1, 1), teks("sbt", 182, 106, "1 bungkus", 8, W.biru)),
      tambah("sepuluh@2", ...deret("sc", "b", 20, 130, 10, 10), panah("scp", 125, 140, 36, 0, W.biru, 2)),
      tambah("dus.", ...deret("sc", "u", 180, 133, 1, 1), teks("sct", 186, 160, "1 dus", 8, W.biru)),
    ),
    k(
      SUARA_S4,
      bersih(0),
      tambah(0, judul("Sepuluh dus, satu peti"), kepala(0)),
      tambah("Sepuluh", ...deret("sd", "u", 20, 74, 10, 5)),
      tambah("ditukar", panah("sdp", 112, 90, 40, 0, W.biru, 2)),
      tambah("peti", ...deret("sd", "p", 170, 80, 1, 1), teks("sdt", 180, 115, "1.000", 12, W.merah)),
      tambah("sembilan.", ...kartu("sdk", 30, 142, 240, 30, W.emas, ["tiap jenis balok: paling banyak 9"], 9.4)),
    ),
  ],
};

/* ------------------------------ 3. Dienes Blocks: penerapan ------------------------------ */
const SUARA_T1 = "Terapan dengan jarak rumah Helen, tiga ribu dua ratus delapan puluh enam meter. Kita bangun dengan balok. Mulai dari ribuan: tiga peti.";
const SUARA_T2 = "Ratusan: dua dus, yaitu dua ratus. Puluhan: delapan bungkus, yaitu delapan puluh. Satuan: enam benda lepas.";
const SUARA_T3 = "Baca balok dari kiri ke kanan: tiga ribu, dua ratus, delapan puluh, enam. Jadi dibaca tiga ribu dua ratus delapan puluh enam.";
const SUARA_T4 = "Contoh kedua, harga minuman enam ribu tujuh ratus lima puluh rupiah. Enam peti, tujuh dus, lima bungkus, dan tidak ada benda lepas karena satuannya nol.";

const kolomX = (i: number) => 10 + i * 72;
const judulKolom = (id: string, i: number, t: string) => teks(id, kolomX(i) + 30, 64, t, 8.6, W.biru);

export const ADEGAN_LUAR_DIENES_TERAPAN: AdeganStory = {
  id: "luar-dienes-terapan",
  judul: "Dienes Blocks: membangun 3.286 dan 6.750",
  sumber: "Metode luar: Dienes Blocks, terapan",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Dienes: 3.286 meter"), kepala(0)),
      tambah("peti", judulKolom("ta0", 0, "peti"), judulKolom("ta1", 1, "dus"), judulKolom("ta2", 2, "bungkus"), judulKolom("ta3", 3, "benda")),
      tambah("tiga@2", ...deret("ta", "p", kolomX(0), 74, 3, 3), teks("tb0", kolomX(0) + 30, 134, "3 peti = 3.000", 7.4, W.merah)),
    ),
    k(
      SUARA_T2,
      tambah("dua", ...deret("ta", "u", kolomX(1), 76, 2, 4), teks("tb1", kolomX(1) + 30, 134, "2 dus = 200", 7.4, W.merah)),
      tambah("delapan", ...deret("ta", "b", kolomX(2), 74, 8, 8), teks("tb2", kolomX(2) + 30, 134, "8 bungkus = 80", 7.4, W.merah)),
      tambah("enam", ...deret("ta", "o", kolomX(3), 76, 6, 6), teks("tb3", kolomX(3) + 30, 134, "6 benda = 6", 7.4, W.merah)),
    ),
    k(
      SUARA_T3,
      tambah("tiga", ...kartu("tc", 14, 150, 272, 40, W.emas, ["tiga ribu · dua ratus · delapan puluh · enam", "dibaca: 3.286"], 9)),
      sorotkan("Baca", "ta-p0", "ta-p1", "ta-p2"),
    ),
    k(
      SUARA_T4,
      bersih(0),
      tambah(0, judul("Dienes: Rp6.750"), kepala(0)),
      tambah("enam", judulKolom("td0", 0, "peti"), judulKolom("td1", 1, "dus"), judulKolom("td2", 2, "bungkus"), judulKolom("td3", 3, "benda")),
      tambah("enam@2", ...deret("tq", "p", kolomX(0), 74, 6, 3), teks("te0", kolomX(0) + 30, 134, "6 peti = 6.000", 7.4, W.merah)),
      tambah("tujuh@2", ...deret("tq", "u", kolomX(1), 76, 7, 4), teks("te1", kolomX(1) + 30, 134, "7 dus = 700", 7.4, W.merah)),
      tambah("lima@2", ...deret("tq", "b", kolomX(2), 74, 5, 8), teks("te2", kolomX(2) + 30, 134, "5 bungkus = 50", 7.4, W.merah)),
      tambah("nol.", teks("te3", kolomX(3) + 30, 100, "kosong", 8.6, W.coklat), teks("te4", kolomX(3) + 30, 134, "0 benda = 0", 7.4, W.merah)),
    ),
  ],
};

/* ------------------------------ 4. Place-Value Chart: konsep ------------------------------ */
const SUARA_P1 = "Metode kedua, Place-Value Chart, atau Papan Nilai Tempat. Papan punya empat kolom: ribuan, ratusan, puluhan, dan satuan. Setiap angka menempati satu kolom.";
const SUARA_P2 = "Angka yang sama dibaca berbeda menurut kolomnya. Lima di satuan dibaca lima, di puluhan lima puluh, di ratusan lima ratus, dan di ribuan lima ribu.";
const SUARA_P3 = "Cara memakai papan: taruh tiap angka di kolomnya, lalu baca dari kiri ke kanan, setiap angka diikuti nama kolomnya.";
const SUARA_P4 = "Papan juga membantu menulis: dengar nama bilangan, isi kolomnya satu per satu, lalu baca isi papan dari kiri ke kanan sebagai satu bilangan.";

export const ADEGAN_LUAR_PAPAN: AdeganStory = {
  id: "luar-papan",
  judul: "Place-Value Chart: empat kolom",
  sumber: "Metode luar: Place-Value Chart",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Place-Value Chart")),
      tambah("kedua,", kepala(1)),
      tambah("empat", ...papanKepala("pa", 30, 66, 240, TEMPAT, 8.4, 18)),
      tambah("Setiap", ...[0, 1, 2, 3].flatMap((i) => [{ id: `pa-d${i}`, t: "kotak" as const, x: 30 + i * 60, y: 84, w: 60, h: 36, warna: W.putih, garis: W.biru, rx: 0, tebal: 1.2 }])),
    ),
    k(
      SUARA_P2,
      bersih(0),
      tambah(0, judul("Angka yang sama, kolom berbeda"), kepala(1)),
      tambah("satuan", ...kartu("pb0", 20, 56, 260, 24, W.krem, ["5 di satuan: lima"], 9)),
      tambah("puluhan", ...kartu("pb1", 20, 86, 260, 24, W.hijauMuda, ["5 di puluhan: lima puluh (50)"], 9)),
      tambah("ratusan", ...kartu("pb2", 20, 116, 260, 24, W.langit, ["5 di ratusan: lima ratus (500)"], 9)),
      tambah("ribuan", ...kartu("pb3", 20, 146, 260, 24, W.merahMuda, ["5 di ribuan: lima ribu (5.000)"], 9)),
    ),
    k(
      SUARA_P3,
      bersih(0),
      tambah(0, judul("Papan: contoh 2.634"), kepala(1)),
      tambah("taruh", ...papanKepala("pc", 30, 62, 240, TEMPAT, 8.4, 18), ...papanIsi("pc", 30, 80, 240, "2634", 30, 20)),
      tambah("baca", panah("pcp", 40, 130, 220, 0, W.biru, 3), teks("pcl", 40, 146, "kiri", 9, W.coklat), teks("pcr", 260, 146, "kanan", 9, W.coklat)),
    ),
    k(
      SUARA_P4,
      bersih(0),
      tambah(0, judul("Papan untuk menulis"), kepala(1)),
      tambah("dengar", ...kartu("pd1", 20, 58, 260, 26, W.krem, ["1. dengar nama bilangan"], 9.4)),
      tambah("isi", ...kartu("pd2", 20, 90, 260, 26, W.hijauMuda, ["2. isi kolom satu per satu"], 9.4)),
      tambah("baca", ...kartu("pd3", 20, 122, 260, 26, W.langit, ["3. baca papan dari kiri ke kanan"], 9.4)),
      tambah(idx(SUARA_P4, "bilangan", 2), emo("pd4", 150, 180, "✅", 22)),
    ),
  ],
};

/* ------------------------------ 5. Place-Value Chart: penerapan ------------------------------ */
const SUARA_Q1 = "Terapan dengan bilangan dua ribu enam ratus tiga puluh empat. Isi papan: ribuan dua, ratusan enam, puluhan tiga, satuan empat.";
const SUARA_Q2 = "Baca kolom demi kolom: ribuan dua dibaca dua ribu, ratusan enam dibaca enam ratus, puluhan tiga dibaca tiga puluh, dan satuan empat dibaca empat.";
const SUARA_Q3 = "Sekarang menulis: nama bilangan tiga ribu dua ratus lima puluh empat. Dengar ribu, tiga. Ratus, dua. Puluh, lima. Sisanya empat.";
const SUARA_Q4 = "Isi papan dari kiri ke kanan menghasilkan tiga, dua, lima, empat. Baca papan: tiga ribu dua ratus lima puluh empat, cocok dengan nama tadi.";

export const ADEGAN_LUAR_PAPAN_TERAPAN: AdeganStory = {
  id: "luar-papan-terapan",
  judul: "Place-Value Chart: membaca 2.634 dan menulis 3.254",
  sumber: "Metode luar: Place-Value Chart, terapan",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_Q1,
      tambah(0, judul("Membaca 2.634"), kepala(1)),
      tambah(0, ...papanKepala("qa", 30, 62, 240, TEMPAT, 8.4, 18)),
      tambah("ribuan", ...papanKolom("qa", 30, 80, 240, 0, "2", 30, 20)),
      tambah("ratusan", ...papanKolom("qa", 30, 80, 240, 1, "6", 30, 20)),
      tambah("puluhan", ...papanKolom("qa", 30, 80, 240, 2, "3", 30, 20)),
      tambah("satuan", ...papanKolom("qa", 30, 80, 240, 3, "4", 30, 20)),
    ),
    k(
      SUARA_Q2,
      tambah("ribuan", teks("qb0", 60, 128, "dua ribu", 8.6, W.hijau), teks("qv0", 60, 140, "2.000", 8.6, W.coklat)),
      tambah("ratusan", teks("qb1", 120, 128, "enam ratus", 8.6, W.hijau), teks("qv1", 120, 140, "600", 8.6, W.coklat)),
      tambah("puluhan", teks("qb2", 180, 128, "tiga puluh", 8.6, W.hijau), teks("qv2", 180, 140, "30", 8.6, W.coklat)),
      tambah("satuan", teks("qb3", 240, 128, "empat", 8.6, W.hijau), teks("qv3", 240, 140, "4", 8.6, W.coklat)),
      tambah("dan", ...kartu("qb4", 14, 154, 272, 34, W.emas, ["dua ribu enam ratus tiga puluh empat"], 10)),
    ),
    k(
      SUARA_Q3,
      bersih(0),
      tambah(0, judul("Menulis 3.254"), kepala(1)),
      tambah(0, ...papanKepala("qc", 30, 62, 240, TEMPAT, 8.4, 18)),
      tambah(idx(SUARA_Q3, "tiga", 2), ...papanKolom("qc", 30, 80, 240, 0, "3", 30, 20)),
      tambah(idx(SUARA_Q3, "dua", 2), ...papanKolom("qc", 30, 80, 240, 1, "2", 30, 20)),
      tambah(idx(SUARA_Q3, "lima", 2), ...papanKolom("qc", 30, 80, 240, 2, "5", 30, 20)),
      tambah(idx(SUARA_Q3, "empat", 2), ...papanKolom("qc", 30, 80, 240, 3, "4", 30, 20)),
      tambah(idx(SUARA_Q3, "ribu", 2), teks("qc-r", 150, 130, "ribu = 1.000", 8.6, W.coklat)),
    ),
    k(
      SUARA_Q4,
      tambah("Isi", panah("qd", 40, 126, 220, 0, W.biru, 3)),
      tambah("Baca", ...kartu("qe", 14, 140, 272, 40, W.emas, ["3.254", "tiga ribu dua ratus lima puluh empat"], 10)),
      tambah("cocok", emo("qf", 262, 176, "✅", 22)),
    ),
  ],
};
