import type { Aksi, AdeganStory } from "./logika-story";
import { W, WARNA_SELAI, emo, idSel, judul, kartu, kisi, pecahan, roti, teks } from "./k4b2d-gambar";
import { bersih, idx, k, tambah, warnai } from "./k4b2d-bantu";

export const NAMA_METODE = ["Decimal Tenths Hundredths", "Decimal Grid", "Fraction–Decimal Link", "Place Value Chart"];
export const NAMA_METODE_ID = ["Desimal Persepuluhan Perseratusan", "Kisi Desimal", "Jembatan Pecahan–Desimal", "Tabel Nilai Tempat"];
export const WARNA_METODE = [W.hijauMuda, W.langit, W.krem, W.pink];
const IKON_METODE = ["🔢", "🔲", "🌉", "📋"];

/** Kepala metode: kartu dua baris (nama asing dan nama Indonesia) di bagian atas adegan konsep dan penerapan. */
export const kepala = (i: number): ReturnType<typeof kartu> => kartu("hd", 6, 25, 288, 30, WARNA_METODE[i], [NAMA_METODE[i], NAMA_METODE_ID[i]], 7.8);

/* ------------------------------ 1. Pembuka metode luar ------------------------------ */
const SUARA_O1 = "Bagaimana kita menghubungkan pecahan biasa dengan pecahan desimal? Guru di berbagai negara punya cara berbeda. Dalam video ini kita lihat empat metode dari luar, memakai angka yang sudah kita kenal.";
const SUARA_O2 = "Empat metode itu: Decimal Tenths Hundredths, Decimal Grid, Fraction–Decimal Link, dan Place Value Chart.";
const SUARA_O3 = "Nama dalam bahasa Indonesia: Desimal Persepuluhan Perseratusan, Kisi Desimal, Jembatan Pecahan–Desimal, dan Tabel Nilai Tempat.";
const SUARA_O4 = "Semuanya menjawab satu pertanyaan: pecahan dengan penyebut sepuluh atau seratus ditulis bagaimana dalam desimal? Dengan menghitung angka, mewarnai kisi, menyeberang jembatan, atau mengisi tabel.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Empat metode dari luar untuk pecahan desimal",
  sumber: "Metode luar: pembuka",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_O1,
      tambah(0, judul("Empat metode dari luar")),
      tambah("pecahan", ...pecahan("po", 60, 84, "1", "10", 20), teks("pp", 100, 92, "=", 18, W.biru), teks("pq", 140, 94, "0,1", 24, W.hijau)),
      tambah("berbagai", emo("gl", 232, 90, "🌍", 40)),
      tambah("empat", ...kartu("pk4", 60, 130, 180, 28, W.emas, ["4 metode dari luar"], 9.4)),
    ),
    k(
      SUARA_O2,
      bersih(0),
      tambah(0, judul("Empat metode")),
      ...NAMA_METODE.map((m, i) => tambah(["Tenths", "Grid", "Fraction", "Place"][i], ...kartu(`m${i}`, 12, 34 + i * 38, 276, 30, WARNA_METODE[i], [`${i + 1}. ${m}`], 9.6))),
    ),
    k(
      SUARA_O3,
      bersih(0),
      tambah(0, judul("Nama dalam bahasa Indonesia")),
      ...NAMA_METODE_ID.map((m, i) => tambah(idx(SUARA_O3, ["Persepuluhan", "Kisi", "Jembatan", "Tabel"][i]), ...kartu(`n${i}`, 12, 34 + i * 38, 276, 30, WARNA_METODE[i], [`${i + 1}. ${m}`], 9.2))),
    ),
    k(
      SUARA_O4,
      bersih(0),
      tambah(0, judul("Satu pertanyaan, empat cara")),
      tambah("menghitung", emo("i1", 45, 76, IKON_METODE[0], 32), teks("i1t", 45, 106, "hitung angka", 8, W.biru)),
      tambah("mewarnai", emo("i2", 112, 76, IKON_METODE[1], 32), teks("i2t", 112, 106, "warnai kisi", 8, W.biru)),
      tambah("menyeberang", emo("i3", 188, 76, IKON_METODE[2], 32), teks("i3t", 188, 106, "seberangi", 8, W.biru)),
      tambah("mengisi", emo("i4", 258, 76, IKON_METODE[3], 32), teks("i4t", 258, 106, "isi tabel", 8, W.biru)),
      tambah("desimal?", ...kartu("iq", 30, 130, 240, 30, W.emas, ["pecahan 10 atau 100: desimalnya?"], 9.2)),
    ),
  ],
};

/* ------------------------------ 2. Decimal Tenths Hundredths: konsep ------------------------------ */
const SUARA_R1 = "Metode pertama, Decimal Tenths Hundredths, atau Desimal Persepuluhan Perseratusan. Di sini ada dua jenis: persepuluhan untuk penyebut sepuluh, dan perseratusan untuk penyebut seratus.";
const SUARA_R2 = "Langkah pertama: lihat penyebutnya. Sepuluh berarti persepuluhan, seratus berarti perseratusan. Langkah kedua: tulis pembilangnya di belakang koma.";
const SUARA_R3 = "Banyak angka di belakang koma sama dengan banyak nol pada penyebut. Sepuluh punya satu nol, jadi satu angka. Seratus punya dua nol, jadi dua angka.";
const SUARA_R4 = "Nol koma satu dan nol koma nol satu berbeda, karena satu per sepuluh dan satu per seratus berbeda ukurannya. Menyebut jenisnya membantu memilih penyebut yang benar.";

export const ADEGAN_LUAR_TENTHS: AdeganStory = {
  id: "luar-persepuluhan",
  judul: "Decimal Tenths Hundredths: jenis menurut penyebut",
  sumber: "Metode luar: Decimal Tenths Hundredths",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_R1,
      tambah(0, judul("Decimal Tenths Hundredths")),
      tambah("pertama,", kepala(0)),
      tambah("persepuluhan", ...kartu("ra", 14, 66, 128, 50, W.hijauMuda, ["persepuluhan", "penyebut 10"], 9.4)),
      tambah("perseratusan,", ...kartu("rb", 158, 66, 128, 50, W.langit, ["perseratusan", "penyebut 100"], 9.4)),
      tambah("seratus.", teks("rc", 150, 150, "dua jenis, dua penyebut", 10, W.coklat)),
    ),
    k(
      SUARA_R2,
      bersih(0),
      tambah(0, judul("Dua langkah")),
      tambah("pertama:", ...kartu("rd", 14, 34, 272, 40, W.krem, ["1. lihat penyebutnya"], 10.4)),
      tambah("Sepuluh", ...kartu("re", 14, 80, 130, 36, W.hijauMuda, ["10 = persepuluhan"], 8.6), ...kartu("rf", 156, 80, 130, 36, W.langit, ["100 = perseratusan"], 8.6)),
      tambah("kedua:", ...kartu("rg", 14, 124, 272, 40, W.emas, ["2. tulis pembilang di belakang koma"], 9.6)),
    ),
    k(
      SUARA_R3,
      bersih(0),
      tambah(0, judul("Angka sama dengan nol")),
      tambah("Banyak", teks("rh", 150, 44, "angka di belakang koma = banyak nol penyebut", 8.4, W.coklat)),
      tambah("Sepuluh", ...kartu("ri", 14, 56, 272, 44, W.hijauMuda, ["10  →  1 nol  →  1 angka"], 11)),
      tambah("Seratus", ...kartu("rj", 14, 110, 272, 44, W.langit, ["100  →  2 nol  →  2 angka"], 11)),
    ),
    k(
      SUARA_R4,
      bersih(0),
      tambah(0, judul("Jenis memilih penyebut")),
      tambah("Nol", ...kartu("rk", 14, 34, 128, 56, W.hijauMuda, ["0,1", "= 1/10", "persepuluhan"], 9.6)),
      tambah("nol@3", ...kartu("rl", 158, 34, 128, 56, W.langit, ["0,01", "= 1/100", "perseratusan"], 9.6)),
      tambah("berbeda,", teks("rm", 150, 112, "ukurannya berbeda", 10, W.merah)),
      tambah("Menyebut", ...kartu("rn", 30, 128, 240, 36, W.emas, ["sebut jenisnya, pilih penyebut"], 9.4)),
    ),
  ],
};

/* ------------------------------ 3. Decimal Tenths Hundredths: penerapan pada roti, biskuit, contoh, telur (Buku Siswa hlm. 71–74) ------------------------------ */
const SUARA_A1 = "Terapkan pada roti tadi. Satu dari sepuluh roti berselai. Penyebutnya sepuluh, jadi persepuluhan, satu angka di belakang koma: nol koma satu.";
const SUARA_A2 = "Biskuit tadi: satu dari seratus. Penyebutnya seratus, jadi perseratusan, dua angka di belakang koma: nol koma nol satu.";
const SUARA_A3 = "Contoh lain: nol koma dua lima punya dua angka, jadi penyebutnya seratus, yaitu dua puluh lima per seratus. Tujuh per seratus ditulis nol koma nol tujuh, dengan satu nol di depan agar tetap dua angka.";
const SUARA_A4 = "Telur tadi: empat per sepuluh adalah persepuluhan, jadi nol koma empat. Lima belas per seratus adalah perseratusan, jadi nol koma satu lima.";

export const ADEGAN_LUAR_TENTHS_TERAPAN: AdeganStory = {
  id: "luar-persepuluhan-terapan",
  judul: "Decimal Tenths Hundredths pada roti, biskuit, dan telur",
  sumber: "Metode luar: Tenths Hundredths",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_A1,
      tambah(0, judul("Roti: persepuluhan")),
      tambah("roti", ...roti("ta", 30, 74)),
      warnai("berselai.", WARNA_SELAI, "ta-o0"),
      tambah("sepuluh,", ...pecahan("tb", 224, 84, "1", "10", 20), teks("tc", 224, 120, "persepuluhan", 8.6, W.hijau)),
      tambah("nol", teks("td", 224, 150, "0,1", 26, W.hijau)),
      tambah("angka", teks("te", 100, 140, "1 angka di belakang koma", 8.6, W.coklat)),
    ),
    k(
      SUARA_A2,
      bersih(0),
      tambah(0, judul("Biskuit: perseratusan")),
      tambah("seratus.", ...pecahan("tf", 80, 84, "1", "100", 22)),
      tambah("perseratusan,", ...kartu("tg", 130, 62, 156, 32, W.langit, ["perseratusan"], 10)),
      tambah("dua", ...kartu("th", 30, 128, 240, 32, W.krem, ["2 angka di belakang koma"], 10)),
      tambah("nol@2", teks("ti", 150, 188, "0,01", 26, W.hijau)),
    ),
    k(
      SUARA_A3,
      bersih(0),
      tambah(0, judul("Contoh lain")),
      tambah("Contoh", ...kartu("tj", 14, 34, 272, 40, W.hijauMuda, ["0,25  →  2 angka  →  25/100"], 10.4)),
      tambah("Tujuh", ...kartu("tk", 14, 86, 272, 40, W.langit, ["7/100  →  0,07  (satu nol di depan)"], 10.4)),
      tambah("tetap", ...kartu("tl", 40, 138, 220, 30, W.emas, ["tetap 2 angka di belakang koma"], 9)),
    ),
    k(
      SUARA_A4,
      bersih(0),
      tambah(0, judul("Telur dan seratus kotak")),
      tambah("Telur", ...kartu("tm", 14, 34, 272, 44, W.hijauMuda, ["4/10  persepuluhan", "0,4"], 10.4)),
      tambah("Lima", ...kartu("tn", 14, 90, 272, 44, W.langit, ["15/100  perseratusan", "0,15"], 10.4)),
      tambah("satu", emo("to", 150, 170, "✅", 26)),
    ),
  ],
};

/* ------------------------------ 4. Decimal Grid: konsep ------------------------------ */
const SUARA_G1 = "Metode kedua, Decimal Grid, atau Kisi Desimal. Kisi berisi seratus kotak sama besar, sepuluh kolom dan sepuluh baris. Seluruh kisi adalah satu utuh.";
const SUARA_G2 = "Satu kolom berisi sepuluh kotak, yaitu satu per sepuluh atau nol koma satu. Dua kolom adalah dua per sepuluh, atau nol koma dua.";
const SUARA_G3 = "Satu kotak saja adalah satu per seratus, atau nol koma nol satu. Sepuluh kotak kecil sama dengan satu kolom, jadi sepuluh per seratus sama dengan satu per sepuluh.";
const SUARA_G4 = "Cara membaca kisi: hitung kolom penuh per sepuluh, lalu tambahkan kotak sisanya. Tiga kolom penuh dan empat kotak berarti tiga puluh empat dari seratus.";

export const ADEGAN_LUAR_KISI: AdeganStory = {
  id: "luar-kisi",
  judul: "Decimal Grid: seratus kotak sama besar",
  sumber: "Metode luar: Decimal Grid",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_G1,
      tambah(0, judul("Decimal Grid")),
      tambah("kedua,", kepala(1)),
      tambah("seratus", ...kisi("ga", 20, 62, 11, 0)),
      tambah("Seluruh", teks("gb", 225, 100, "1 utuh", 16, W.hijau), teks("gc", 225, 124, "100 kotak (10 kolom, 10 baris)", 8, W.coklat)),
    ),
    k(
      SUARA_G2,
      warnai("Satu", W.hijau, ...idSel("ga", 0, 10)),
      tambah("sepuluh", teks("gd", 225, 150, "1 kolom = 10 kotak", 8.6, W.biru)),
      tambah("nol", teks("ge", 225, 170, "0,1", 18, W.hijau)),
      warnai("Dua", W.biruMuda, ...idSel("ga", 10, 20)),
      tambah("dua@2", teks("gf", 225, 186, "2 kolom: 0,2", 8.6, W.biru)),
    ),
    k(
      SUARA_G3,
      bersih(0),
      tambah(0, judul("Satu kotak dan satu kolom")),
      tambah("kotak", ...kisi("gg", 20, 40, 12, 1)),
      tambah("seratus,", teks("gh", 225, 76, "1 kotak", 10, W.coklat), teks("gi", 225, 98, "0,01", 20, W.hijau)),
      warnai("Sepuluh", W.hijau, ...idSel("gg", 0, 10)),
      tambah("kolom,", teks("gj", 225, 128, "1 kolom", 10, W.coklat), teks("gk", 225, 150, "0,1", 20, W.hijau)),
      tambah("sepuluh@3", ...kartu("gl", 150, 164, 140, 26, W.emas, ["10/100 = 1/10"], 9.6)),
    ),
    k(
      SUARA_G4,
      bersih(0),
      tambah(0, judul("Membaca kisi")),
      tambah("hitung", ...kisi("gm", 20, 38, 12, 34)),
      tambah("kolom", teks("gn", 225, 74, "3 kolom penuh: 10 + 10 + 10", 8.4, W.biru)),
      tambah("tambahkan", teks("go", 225, 94, "+ 4 kotak", 9.4, W.biru)),
      tambah("puluh", teks("gp", 225, 124, "34", 26, W.hijau), teks("gq", 225, 146, "dari 100", 9.4, W.coklat)),
    ),
  ],
};

/* ------------------------------ 5. Decimal Grid: penerapan pada telur dan Ayo Berlatih nomor 3 (Buku Siswa hlm. 74–75) ------------------------------ */
const SUARA_T1 = "Telur tadi: empat dari sepuluh. Di kisi seratus, itu empat kolom penuh, yaitu empat puluh kotak, sama dengan nol koma empat.";
const SUARA_T2 = "Lima belas per seratus: satu kolom penuh dan lima kotak. Ada lima belas kotak berwarna, jadi nol koma satu lima.";
const SUARA_T3 = "Enam puluh dua per seratus: enam kolom penuh dan dua kotak, jadi nol koma enam dua.";
const SUARA_T4 = "Delapan puluh satu per seratus: delapan kolom penuh dan satu kotak, jadi nol koma delapan satu. Sisanya sembilan belas kotak kosong.";

/** Satu penerapan kisi: kisi di kiri, pecahan dan desimal di kanan, keterangan di bawah. */
const bacaKisi = (id: string, n: number, atas: string, bawah: string, des: string, cap: string, at: [string, string, string]): Aksi[] => [
  bersih(0),
  tambah(0, judul("Decimal Grid")),
  tambah(0, kepala(1)),
  tambah(at[0], ...kisi(`${id}g`, 20, 62, 11, n)),
  tambah(at[1], ...pecahan(`${id}f`, 225, 96, atas, bawah, 20)),
  tambah(at[2], teks(`${id}e`, 225, 140, "=", 16, W.biru), teks(`${id}d`, 225, 170, des, 24, W.hijau)),
  tambah(at[0], teks(`${id}c`, 75, 188, cap, 9, W.coklat)),
];

export const ADEGAN_LUAR_KISI_TERAPAN: AdeganStory = {
  id: "luar-kisi-terapan",
  judul: "Decimal Grid pada telur dan tiga soal perseratusan",
  sumber: "Metode luar: Decimal Grid",
  latar: "#EFF6FF",
  ketukan: [
    k(SUARA_T1, ...bacaKisi("ka", 40, "4", "10", "0,4", "4 kolom = 40 dari 100 kotak", ["kolom", "sepuluh.", "nol"])),
    k(SUARA_T2, ...bacaKisi("kb", 15, "15", "100", "0,15", "1 kolom + 5 = 15 kotak", ["kolom", "seratus:", "nol"])),
    k(SUARA_T3, ...bacaKisi("kc", 62, "62", "100", "0,62", "6 kolom + 2 = 62 kotak", ["kolom", "seratus:", "nol"])),
    k(SUARA_T4, ...bacaKisi("kd", 81, "81", "100", "0,81", "8 kolom + 1 = 81; kosong 19", ["kolom", "seratus:", "nol"])),
  ],
};
