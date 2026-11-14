import type { AdeganStory } from "./logika-story";
import { PETA, W, emo, garis, idNomor, idSel, judul, kartu, kisiLatar, kotak, luasPeta, nomori, panah, penuh, sel, segitigaKisi, SEGITIGA_N3, teks } from "./k4b4a-gambar";
import { bersih, idx, k, sorotkan, tambah, ubah } from "./k4b4a-bantu";

/** Baris hitungan Ayo Berlatih (hlm. 114): banyak petak per baris bangun A sampai D. */
export const BERLATIH_PETAK = { A: [1, 1, 2, 3, 3, 3], B: [1, 2, 4, 5, 1], C: [1, 2, 4, 2, 2], D: [3, 2, 2, 2, 1, 5] } as const;
export const KUNCI_BERLATIH = { A: 13, B: 13, C: 11, D: 15 } as const;

const WARNA_BANGUN = { A: W.oranye, B: W.kuning, C: W.merahTua, D: W.biruMuda } as const;
type Huruf = "A" | "B" | "C" | "D";
const X4 = { A: 16, B: 70, C: 138, D: 206 } as const;
const jumlahBaris = (n: readonly number[]) => n.join(" + ");

/* ------------------------------ 9. Ayo Berlatih: luas bangun A sampai D (Buku Siswa hlm. 114–115; Panduan Guru hlm. 151) ------------------------------ */
const SUARA_R1 = "Ayo Berlatih. Slamet dan Helen punya mainan bongkar pasang berbentuk persegi. Tentukan luas bangun A, B, C, dan D.";
const SUARA_R2 = "Bangun A: baris dari atas berisi satu, satu, dua, tiga, tiga, dan tiga petak. Jadi luasnya tiga belas persegi satuan.";
const SUARA_R3 = "Bangun B: satu, dua, empat, lima, dan satu petak. Luasnya juga tiga belas persegi satuan.";
const SUARA_R4 = "Bangun C: satu, dua, empat, dua, dan dua petak. Jadi luasnya sebelas persegi satuan.";
const SUARA_R5 = "Bangun D: tiga, dua, dua, dua, satu, dan lima petak. Jadi luasnya lima belas persegi satuan.";
const SUARA_R6 = "Apakah ada bangun yang luasnya sama? Ada: bangun A dan B sama-sama tiga belas persegi satuan, walaupun bentuknya berbeda.";
const SUARA_R7 = "Catatan: kunci panduan guru bagian d menulis luas bangun A lima belas. Hitungan tadi menunjukkan yang lima belas bangun D, jadi itu salah ketik.";

const bangun4 = (huruf: Huruf) => [
  ...sel(`s${huruf}`, X4[huruf], 40, PETA[huruf], 11, WARNA_BANGUN[huruf]),
  teks(`h${huruf}`, X4[huruf] + (PETA[huruf][0].length * 11) / 2, 126, huruf, 11, W.biru),
];
const baris = (huruf: Huruf, n: number) => [
  teks(`bt${huruf}`, 24, 148 + n * 14, `bangun ${huruf}`, 8.6, W.coklat, { anchor: "start" }),
  teks(`bp${huruf}`, 92, 148 + n * 14, `${jumlahBaris(BERLATIH_PETAK[huruf])} = ${KUNCI_BERLATIH[huruf]}`, 9, W.hijau, { anchor: "start" }),
];

export const ADEGAN_BERLATIH_PERSEGI: AdeganStory = {
  id: "berlatih-persegi",
  judul: "Ayo Berlatih: luas bangun A, B, C, D",
  sumber: "Buku Siswa hlm. 114–115; Panduan Guru hlm. 151",
  latar: "#FFF7ED",
  kutipan: [
    "Ayo Berlatih",
    "Slamet dan Helen memiliki mainan bongkar pasang berbentuk persegi.",
    "tersebut dapat dibuat berbagai bentuk.",
    "Tentukan luas dari gambar A, B, C, D dengan menggunakan persegi satuan.",
    "Luas bangun A adalah",
    "persegi satuan",
    "Apakah ada bangun yang memiliki luas yang sama?",
    "Salinlah jawabanmu pada buku tulis.",
    "Pandu peserta didik untuk menentukan luas bangun A, B, C, dan D.",
    "Luas bangun A adalah 13 persegi satuan",
    "Luas bangun B adalah 13 persegi satuan",
    "Luas bangun C adalah 11 persegi satuan",
    "Luas bangun A adalah 15 persegi satuan",
    "Ada, luas bangun A dan bangun B adalah 13 persegi satuan.",
  ],
  ketukan: [
    k(
      SUARA_R1,
      tambah(0, judul("Ayo Berlatih: mainan bongkar pasang")),
      tambah("mainan", emo("mn", 150, 66, "🧩", 28)),
      tambah("bangun", ...bangun4("A")),
      tambah("B,", ...bangun4("B")),
      tambah("C,", ...bangun4("C")),
      tambah("D", ...bangun4("D")),
      tambah("Tentukan", teks("q", 150, 160, "luas A, B, C, D = ? persegi satuan", 9.4, W.merah)),
    ),
    k(
      SUARA_R2,
      bersih(0),
      tambah(0, judul("Luas bangun A"), ...bangun4("A"), ...bangun4("B"), ...bangun4("C"), ...bangun4("D")),
      sorotkan("Bangun", ...idSel("sA", PETA.A)),
      tambah("satu,", ...baris("A", 0)),
    ),
    k(
      SUARA_R3,
      ubah(0, ...idSel("sA", PETA.A).map((id) => ({ id, sorot: false }))),
      sorotkan("Bangun", ...idSel("sB", PETA.B)),
      tambah("satu,", ...baris("B", 1)),
    ),
    k(
      SUARA_R4,
      ubah(0, ...idSel("sB", PETA.B).map((id) => ({ id, sorot: false }))),
      sorotkan("Bangun", ...idSel("sC", PETA.C)),
      tambah("satu,", ...baris("C", 2)),
    ),
    k(
      SUARA_R5,
      ubah(0, ...idSel("sC", PETA.C).map((id) => ({ id, sorot: false }))),
      sorotkan("Bangun", ...idSel("sD", PETA.D)),
      tambah("tiga,", ...baris("D", 3)),
    ),
    k(
      SUARA_R6,
      ubah(0, ...idSel("sD", PETA.D).map((id) => ({ id, sorot: false }))),
      sorotkan("Ada:", ...idSel("sA", PETA.A), ...idSel("sB", PETA.B)),
      tambah("walaupun", teks("sm", 150, 138, "sama: A dan B, 13 persegi satuan", 8.8, W.biru)),
    ),
    k(
      SUARA_R7,
      bersih(0),
      tambah(0, judul("Catatan: kunci bagian d")),
      tambah("menulis", ...kartu("cn1", 14, 34, 272, 40, W.merahMuda, ["kunci tertulis:", "luas bangun A adalah 15"], 9)),
      tambah("Hitungan", ...kartu("cn2", 14, 88, 272, 40, W.hijauMuda, ["hitungan baris D:", "3 + 2 + 2 + 2 + 1 + 5 = 15"], 9)),
      tambah("salah", teks("cn3", 150, 160, "yang 15 adalah bangun D: salah ketik", 9.4, W.merah)),
    ),
  ],
};

/* ------------------------------ 10. Satuan baku: sentimeter persegi dan meter persegi (Buku Siswa hlm. 115–117; Panduan Guru hlm. 152) ------------------------------ */
const SUARA_S1 = "Pengukuran luas dengan satuan baku. Gambar a luasnya tiga belas persegi satuan, gambar b empat persegi satuan, jadi luasnya berbeda.";
const SUARA_S2 = "Tetapi ukuran persegi satuan pada gambar a dan b tidak sama. Karena satuannya berbeda ukuran, kita perlu satuan luas yang baku.";
const SUARA_S3 = "Satuan baku luas memakai persegi dengan sisi satu sentimeter. Luasnya satu sentimeter kali satu sentimeter, yaitu satu sentimeter persegi, ditulis singkat sentimeter pangkat dua.";
const SUARA_S4 = "Untuk luas yang lebih besar, misalnya lapangan bola, dipakai persegi satuan dengan sisi satu meter. Luasnya satu meter persegi, ditulis meter pangkat dua.";
const SUARA_S5 = "Panduan guru: ingatkan satuan baku panjang, yaitu kilometer, hektometer, dekameter, meter, desimeter, sentimeter, dan milimeter. Untuk luas, cukup ditulis dengan pangkat dua.";
const SATUAN_PANJANG = ["km", "hm", "dam", "m", "dm", "cm", "mm"];

export const ADEGAN_SATUAN_BAKU: AdeganStory = {
  id: "satuan-baku",
  judul: "Satuan baku luas: cm² dan m²",
  sumber: "Buku Siswa hlm. 115–117; Panduan Guru hlm. 152",
  latar: "#F5F3FF",
  kutipan: [
    "Pengukuran luas dengan menggunakan satuan baku",
    "Gambar (a) memiliki",
    "luas adalah 13 persegi",
    "Gambar (b) memiliki",
    "luas adalah 4 persegi",
    "terdapat dua bangun yang memiliki luas yang berbeda.",
    "Amatilah apakah ukuran persegi satuan pada gambar",
    "ukuran perseginya tidak sama.",
    "Karena satuan luas memiliki ukuran yang tidak sama, sehingga kalian perlu",
    "mengetahui satuan luas yang baku.",
    "Sebuah persegi memiliki ukuran sisi 1 cm",
    "digunakan sebagai satuan baku.",
    "Satuan baku yang umumnya digunakan untuk mengukur luas adalah",
    "sentimeter persegi.",
    "Singkatnya, cm² dapat juga dinyatakan dengan cm persegi.",
    "Untuk mengukur luas yang lebih besar (misalnya lapangan",
    "bola) dapat menggunakan persegi satuan dengan sisi 1 m",
    "m² adalah satuan baku untuk mengukur luas.",
    "Peserta didik perlu diingatkan terkiat satuan baku panjang misalkan km,",
    "hm, dam, m, dm, cm, mm.",
    "Satuan baku untuk luas cukup menuliskan km2, hm2, dam2, m2, dm2, cm2,",
  ],
  ketukan: [
    k(
      SUARA_S1,
      tambah(0, judul("Gambar a dan gambar b")),
      tambah("Gambar", teks("ga", 52, 36, "(a)", 9.4, W.biru), ...sel("pa", 28, 44, PETA.A, 8, W.oranye), teks("la", 52, 126, "13 persegi satuan", 8.2, W.hijau)),
      tambah("b", teks("gb", 206, 36, "(b)", 9.4, W.biru), ...sel("pb", 170, 44, penuh(2, 2), 28, W.pink), teks("lb", 198, 126, "4 persegi satuan", 8.2, W.hijau)),
      tambah("berbeda.", teks("lc", 150, 160, "luasnya berbeda: 13 dan 4", 9.6, W.coklat)),
    ),
    k(
      SUARA_S2,
      sorotkan("tidak", "pa-c3-0", "pb-c0-0"),
      tambah("satuannya", teks("ld", 150, 178, "persegi satuan (a) lebih kecil dari (b)", 8.6, W.merah)),
    ),
    k(
      SUARA_S3,
      bersih(0),
      tambah(0, judul("Sentimeter persegi")),
      tambah("sisi", ...sel("u", 50, 54, penuh(1, 1), 56, W.kuning, W.coklat), teks("u1", 78, 46, "1 cm", 9, W.biru), teks("u2", 122, 86, "1 cm", 9, W.biru, { anchor: "start" })),
      tambah("Luasnya", ...kartu("us", 150, 56, 144, 50, W.krem, ["1 cm × 1 cm", "= 1 cm²"], 9.6)),
      tambah("singkat", teks("ut", 150, 150, "cm² dibaca: sentimeter persegi", 9.4, W.biru)),
    ),
    k(
      SUARA_S4,
      bersih(0),
      tambah(0, judul("Meter persegi")),
      tambah("lapangan", emo("lp", 60, 84, "⚽", 40), teks("lp2", 60, 108, "lapangan bola", 8.6, W.biru)),
      tambah("sisi", ...sel("m", 130, 48, penuh(1, 1), 64, W.hijauMuda, W.hijau), teks("m1", 162, 40, "1 m", 9, W.biru), teks("m2", 206, 84, "1 m", 9, W.biru, { anchor: "start" })),
      tambah("Luasnya", ...kartu("ms", 60, 130, 180, 34, W.krem, ["1 m × 1 m = 1 m²"], 9.6)),
    ),
    k(
      SUARA_S5,
      bersih(0),
      tambah(0, judul("Satuan panjang dan satuan luas")),
      ...SATUAN_PANJANG.map((s, i) => tambah(["kilometer,", "hektometer,", "dekameter,", "meter,", "desimeter,", "sentimeter,", "milimeter."][i], ...kartu(`sp${i}`, 8 + i * 41, 38, 38, 26, W.langit, [s], 8.4))),
      tambah("luas,", teks("sq", 150, 90, "untuk luas: pangkat dua", 9.4, W.merah)),
      ...SATUAN_PANJANG.map((s, i) => tambah(["pangkat"][0], ...kartu(`sl${i}`, 8 + i * 41, 104, 38, 26, W.krem, [`${s}²`], 8.4))),
    ),
  ],
};

/* ------------------------------ 11. Konversi satuan luas (Buku Siswa hlm. 117; Panduan Guru hlm. 152 dan 154) ------------------------------ */
const SUARA_V1 = "Bagaimana hubungan satuan sentimeter dan meter? Buku mengingatkan: satu meter sama dengan seratus sentimeter. Itu untuk panjang.";
const SUARA_V2 = "Untuk luas: satu meter persegi sama dengan sepuluh ribu sentimeter persegi. Sebaliknya, sepuluh ribu sentimeter persegi sama dengan satu meter persegi.";
const SUARA_V3 = "Mengapa sepuluh ribu? Persegi bersisi satu meter punya sisi seratus sentimeter. Jadi ada seratus baris dan seratus kolom, dan seratus kali seratus sama dengan sepuluh ribu.";
const SUARA_V4 = "Miskonsepsi di panduan guru: murid mengira meter persegi ke sentimeter persegi dikali seratus, seperti panjang. Seharusnya dikali seratus kali seratus.";
const SUARA_V5 = "Hitungan mandiri: dua meter persegi sama dengan dua puluh ribu sentimeter persegi, bukan dua ratus.";

export const ADEGAN_KONVERSI: AdeganStory = {
  id: "konversi",
  judul: "Konversi m² dan cm²",
  sumber: "Buku Siswa hlm. 117; Panduan Guru hlm. 152 dan 154",
  latar: "#FEF2F2",
  kutipan: [
    "Bagaimana hubungan satuan luas yaitu cm dan m?",
    "Ingat!",
    "1 m = 100 cm",
    "atau",
    "100 cm =1 m",
    "10.000 cm² = 1 m²",
    "Perlu ditekankan kepada peserta didik konversi dari setiap satuan baku.",
    "Peserta didik mengalami miskonsepsi pada saat konversi antara satuan",
    "baku misalkan m2 ke cm2. Jika mengingat konversi pada satuan panjang,",
    "maka m ke cm dikalikan 100. Ini sering terjadi kepada peserta didik m2",
    "ke cm2 dikalikan 100, seharusnya dikalikan 1002.",
  ],
  ketukan: [
    k(
      SUARA_V1,
      tambah(0, judul("Hubungan satuan")),
      tambah("sentimeter", garis("pj", 30, 70, 240, 0, W.biru, 5)),
      tambah("meter?", teks("pj1", 150, 56, "1 m", 11, W.biru)),
      tambah("seratus", ...kartu("pj2", 40, 92, 220, 34, W.krem, ["1 m = 100 cm"], 10)),
      tambah("panjang.", teks("pj3", 150, 156, "ini untuk panjang", 9.4, W.coklat)),
    ),
    k(
      SUARA_V2,
      bersih(0),
      tambah(0, judul("Hubungan satuan luas")),
      tambah("satu", ...kartu("lw1", 20, 40, 260, 40, W.hijauMuda, ["1 m² = 10.000 cm²"], 11)),
      tambah("Sebaliknya,", ...kartu("lw2", 20, 96, 260, 40, W.langit, ["10.000 cm² = 1 m²"], 11)),
    ),
    k(
      SUARA_V3,
      bersih(0),
      tambah(0, judul("Mengapa sepuluh ribu?")),
      tambah("Persegi", ...kisiLatar("kv", 24, 36, 10, 10, 8, W.hijauMuda, W.hijau), teks("kvs", 64, 130, "1 m = 100 cm", 8.6, W.biru)),
      tambah("baris", teks("kvb", 190, 70, "100 baris", 9.4, W.coklat)),
      tambah("kolom,", teks("kvk", 190, 88, "100 kolom", 9.4, W.coklat)),
      tambah("sepuluh@2", teks("kvh", 190, 118, "100 × 100", 11, W.hijau), teks("kvj", 190, 136, "= 10.000", 11, W.hijau)),
    ),
    k(
      SUARA_V4,
      bersih(0),
      tambah(0, judul("Miskonsepsi konversi")),
      tambah("dikali", ...kartu("mk1", 14, 36, 272, 40, W.merahMuda, ["m² ke cm²: dikali 100 (salah)"], 9.4)),
      tambah("Seharusnya", ...kartu("mk2", 14, 92, 272, 40, W.hijauMuda, ["m² ke cm²: dikali 100 × 100 (benar)"], 9.4)),
      tambah("seratus@3", teks("mk3", 150, 160, "100 × 100 = 10.000", 11, W.hijau)),
    ),
    k(
      SUARA_V5,
      bersih(0),
      tambah(0, judul("Hitungan mandiri")),
      tambah("dua", ...kartu("hm1", 14, 40, 272, 40, W.krem, ["2 m² = 2 × 10.000 cm²"], 10.4)),
      tambah("puluh", teks("hm2", 150, 112, "= 20.000 cm²", 13, W.hijau)),
      tambah("ratus.", teks("hm3", 150, 154, "bukan 200 cm²", 11, W.merah)),
    ),
  ],
};

/* ------------------------------ 12. Ayo Mencoba nomor 1: luas bangun (i) dan (ii) (Buku Siswa hlm. 117–118; Panduan Guru hlm. 152) ------------------------------ */
const SUARA_T1 = "Ayo Mencoba nomor satu: tentukan luas daerah berikut. Setiap persegi satuan berukuran satu sentimeter kali satu sentimeter, jadi luasnya satu sentimeter persegi.";
const SUARA_T2 = "Bangun pertama: petaknya dihitung berurutan dari satu sampai tiga belas. Luas bangun pertama adalah tiga belas sentimeter persegi.";
const SUARA_T3 = "Bangun kedua juga dinomori satu sampai tiga belas. Luasnya sama, tiga belas sentimeter persegi, seperti jawaban murid di buku.";
const SUARA_T4 = "Kedua bangun bentuknya berbeda, tetapi luasnya sama. Panduan guru meminta satu atau dua murid menjawab secara acak.";

export const ADEGAN_MENCOBA_SATU: AdeganStory = {
  id: "mencoba-satu",
  judul: "Ayo Mencoba 1: dua bangun, luas 13 cm²",
  sumber: "Buku Siswa hlm. 117–118; Panduan Guru hlm. 152",
  latar: "#FFFBEB",
  kutipan: [
    "Ayo Mencoba",
    "Tentukan luas daerah berikut dengan cermat.",
    "Apakah kalian dapat menjawab permasalahan nomor 1?",
    "Luas bangun (ii) pun",
    "Minta peserta didik untuk mengamati Latihan soal berikut.",
    "ukuran 1 persegian satuan yang",
    "digunakan 1 cm x 1 cm.",
    "Pandu peserta didik untuk",
    "menentukan luas bangun (i) dan (ii).",
    "Luas bangun (i) adalah 13 cm2 dan",
    "luas bangun (ii) adalah 13 cm2.",
    "Tunjuk 1-2 peserta didik untuk",
  ],
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Ayo Mencoba 1")),
      tambah("persegi", ...sel("w", 70, 52, penuh(1, 1), 40, W.kuning, W.coklat), teks("w1", 90, 44, "1 cm", 9, W.biru), teks("w2", 118, 76, "1 cm", 9, W.biru, { anchor: "start" })),
      tambah("luasnya", ...kartu("wl", 160, 50, 130, 44, W.krem, ["luas 1 petak:", "1 cm²"], 9.4)),
      tambah("daerah", teks("wq", 150, 150, "tentukan luas daerah (i) dan (ii)", 9.4, W.merah)),
    ),
    k(
      SUARA_T2,
      bersih(0),
      tambah(0, judul("Bangun (i)")),
      tambah("petaknya", ...sel("i", 100, 34, PETA.A, 20, W.oranye)),
      tambah("urutan", ...nomori("i", 100, 34, PETA.A, 20, 8)),
      tambah("Luas", teks("il", 220, 100, "13 cm²", 14, W.hijau)),
    ),
    k(
      SUARA_T3,
      bersih(0),
      tambah(0, judul("Bangun (ii)")),
      tambah("kedua", ...sel("ii", 100, 34, PETA.II, 20, W.kuning)),
      tambah("dinomori", ...nomori("ii", 100, 34, PETA.II, 20, 8)),
      tambah("Luasnya", teks("iil", 150, 160, "luas (ii) = 13 cm²", 13, W.hijau)),
    ),
    k(
      SUARA_T4,
      bersih(0),
      tambah(0, judul("Bentuk beda, luas sama")),
      tambah("Kedua", ...sel("a", 20, 50, PETA.A, 14, W.oranye), teks("at", 41, 150, "(i)", 9.4, W.biru), ...sel("b", 150, 50, PETA.B, 14, W.kuning), teks("bt", 185, 150, "(ii)", 9.4, W.biru)),
      tambah("sama.", ...kartu("sm", 60, 160, 180, 30, W.emas, ["sama-sama 13 cm²"], 9.6)),
    ),
  ],
};

/* ------------------------------ 13. Ayo Mencoba nomor 2: bangun dengan luas 9 cm² (Buku Siswa hlm. 119; Panduan Guru hlm. 152–153) ------------------------------ */
const SUARA_U1 = "Ayo Mencoba nomor dua: gambarlah sembarang bentuk pada kisi dengan luas sembilan sentimeter persegi. Setiap persegi pada kisi berukuran satu sentimeter kali satu sentimeter.";
const SUARA_U2 = "Bangun pertama di buku: satu kolom berisi delapan petak, ditambah satu petak di bawahnya. Delapan ditambah satu sama dengan sembilan.";
const SUARA_U3 = "Bapak bertanya, apakah jawabannya hanya satu bangun? Murid menjawab, tidak. Bangun kedua: dua, tiga, tiga, dan satu petak, juga sembilan.";
const SUARA_U4 = "Jika luas bidang diketahui, bentuknya bisa lebih dari satu, asalkan persegi satuannya sama. Soal seperti ini disebut open ended, yang punya banyak jawaban.";
const SUARA_U5 = "Catatan: soal menulis setiap sisi persegi adalah satu sentimeter persegi. Padahal panjang sisinya satu sentimeter; yang satu sentimeter persegi adalah luasnya.";

export const ADEGAN_MENCOBA_DUA: AdeganStory = {
  id: "mencoba-dua",
  judul: "Ayo Mencoba 2: bangun dengan luas 9 cm²",
  sumber: "Buku Siswa hlm. 119; Panduan Guru hlm. 152–153",
  latar: "#ECFDF5",
  kutipan: [
    "Gambarlah sembarang bentuk pada bidang berikut dengan luas 9",
    "setiap sisi persegi adalah 1",
    "Selesaikan permasalahan pada nomor 2.",
    "Bangun yang dapat",
    "saya buat seperti ini.",
    "Apakah jawabannya hanya satu bangun saja?",
    "Tidak. Masih",
    "terdapat bentuk",
    "lainnya, Pak.",
    "silahkan kalian buat bangun baru",
    "Jika diketahui ukuran luas dari sebuah bidang, maka bentuk bidangnya lebih",
    "dari satu. Dengan syarat, ukuran persegi satuan sama.",
    "Soal tersebut merupakan tipe soal open ended.",
    "Soal open ended merupakan soal yang memiliki banyak jawaban dan",
    "Guru harus menyediakan jawaban alternatif dari peserta didik.",
  ],
  ketukan: [
    k(
      SUARA_U1,
      tambah(0, judul("Ayo Mencoba 2: luas 9 cm²")),
      tambah("gambarlah", ...kisiLatar("g", 106, 34, 8, 8, 11, W.abu, W.putih)),
      tambah("sembilan", teks("gt", 56, 80, "luas 9 cm²", 11, W.hijau), teks("gt2", 56, 98, "tanpa kunci tunggal", 8, W.coklat)),
      tambah("kisi", teks("gu", 56, 150, "1 petak = 1 cm²", 8.6, W.biru)),
    ),
    k(
      SUARA_U2,
      ubah(0, { id: "gt", op: 0 }, { id: "gt2", op: 0 }),
      tambah("satu", ...sel("l1", 106, 34, PETA.L1, 11, W.kuning)),
      tambah("Delapan", teks("l1t", 56, 120, "8 + 1 = 9", 11, W.hijau)),
    ),
    k(
      SUARA_U3,
      bersih(0),
      tambah(0, judul("Bangunnya tidak hanya satu")),
      tambah("Bapak", ...kisiLatar("g1", 14, 34, 8, 8, 11, W.abu, W.putih), ...sel("l1", 14, 34, PETA.L1, 11, W.kuning)),
      tambah("Murid", ...kisiLatar("g2", 160, 34, 8, 8, 11, W.abu, W.putih)),
      tambah("kedua:", ...sel("l2", 160, 34, PETA.L2, 11, W.kuning)),
      tambah("tiga,", teks("u1", 58, 142, "8 + 1 = 9", 10, W.hijau), teks("u2", 204, 142, "2 + 3 + 3 + 1 = 9", 10, W.hijau)),
    ),
    k(
      SUARA_U4,
      bersih(0),
      tambah(0, judul("Soal open ended")),
      tambah("luas", ...kartu("o1", 14, 36, 272, 44, W.hijauMuda, ["luas bidang diketahui:", "bentuknya bisa lebih dari satu"], 9)),
      tambah("asalkan", ...kartu("o2", 14, 92, 272, 32, W.krem, ["syarat: persegi satuan sama"], 9)),
      tambah("open", ...kartu("o3", 14, 136, 272, 32, W.langit, ["open ended: banyak jawaban"], 9)),
    ),
    k(
      SUARA_U5,
      bersih(0),
      tambah(0, judul("Catatan satuan")),
      tambah("menulis", ...kartu("n1", 14, 34, 272, 40, W.merahMuda, ["soal: sisi persegi 1 cm²", "(satuan luas untuk panjang)"], 9)),
      tambah("Padahal", ...kartu("n2", 14, 90, 272, 40, W.hijauMuda, ["panjang sisi: 1 cm", "luasnya: 1 cm²"], 9)),
    ),
  ],
};

/* ------------------------------ 14. Ayo Berlatih (satuan baku): nomor 1 sampai 3 (Buku Siswa hlm. 120–121; Panduan Guru hlm. 153) ------------------------------ */
const SUARA_Y1 = "Ayo Berlatih nomor satu: hubungkan gambar dengan satuan luasnya, sentimeter persegi atau meter persegi. Gambarnya lapangan bola, kolam renang, bingkai cermin, dan buku tulis.";
const SUARA_Y2 = "Buku tidak memberi kunci nomor satu. Menurut penalaran mandiri, lapangan dan kolam renang luas, jadi meter persegi. Bingkai dan buku kecil, jadi sentimeter persegi.";
const SUARA_Y3 = "Nomor dua, bangun yang diarsir. Baris pertama enam petak, baris kedua dua petak, baris ketiga empat petak, jadi dua belas sentimeter persegi, sesuai kunci.";
const SUARA_Y4 = "Nomor tiga, segitiga pada kisi. Alasnya enam petak dan tingginya tiga petak. Hitungan mandiri: enam petak penuh dan enam setengah petak, yaitu enam ditambah tiga, jadi sembilan sentimeter persegi, sesuai kunci.";

export const ADEGAN_BERLATIH_BAKU: AdeganStory = {
  id: "berlatih-baku",
  judul: "Ayo Berlatih: satuan baku, nomor 1 sampai 3",
  sumber: "Buku Siswa hlm. 120–121; Panduan Guru hlm. 153",
  latar: "#F0F9FF",
  kutipan: [
    "Ayo Berlatih",
    "Hubungkan gambar dengan satuan luasnya berikut ini dengan cermat!",
    "Sentimeter persegi",
    "Meter persegi",
    "Tentukan luas bangun yang diarsir pada bidang persegi berukuran 1 cm ×",
    "1 cm.",
    "Soal nomor 1.",
    "Guru mengarahkan peserta didik untuk mencocok gambar bagian kanan dan",
    "Soal nomor 2.",
    "Luas bangun yang di arsir pada nomor 2 adalah 12 cm2.",
    "Soal nomor 3.",
    "Luas bangun yang di arsir pada nomor 3 adalah 9 cm2.",
  ],
  ketukan: [
    k(
      SUARA_Y1,
      tambah(0, judul("Hubungkan gambar dan satuan")),
      tambah("lapangan", emo("y1", 36, 60, "⚽", 30), teks("y1t", 36, 80, "lapangan", 8, W.biru)),
      tambah("kolam", emo("y2", 36, 120, "🏊", 30), teks("y2t", 36, 140, "kolam renang", 8, W.biru)),
      tambah("bingkai", emo("y3", 36, 176, "🖼", 30), teks("y3t", 36, 196, "bingkai", 8, W.biru)),
      tambah("buku", emo("y4", 100, 176, "📓", 30), teks("y4t", 100, 196, "buku", 8, W.biru)),
      tambah("sentimeter", ...kartu("yc", 190, 44, 100, 30, W.krem, ["cm²"], 10)),
      tambah(idx(SUARA_Y1, "meter"), ...kartu("ym", 190, 100, 100, 30, W.hijauMuda, ["m²"], 10)),
    ),
    k(
      SUARA_Y2,
      tambah("lapangan", panah("pa1", 66, 58, 120, 56, W.hijau, 1.8)),
      tambah("kolam", panah("pa2", 66, 118, 120, 0, W.hijau, 1.8)),
      tambah("Bingkai", panah("pa3", 60, 170, 126, -100, W.coklat, 1.8)),
      tambah("buku@2", panah("pa4", 124, 170, 64, -94, W.coklat, 1.8)),
    ),
    k(
      SUARA_Y3,
      bersih(0),
      tambah(0, judul("Nomor 2: bangun yang diarsir")),
      tambah("diarsir.", ...kisiLatar("n2g", 78, 34, 8, 5, 18, W.putih, W.abu), ...sel("n2", 78, 34, PETA.N2, 18, W.emas, W.coklat)),
      tambah("pertama", teks("n2a", 150, 140, "6 + 2 + 4 = 12", 12, W.hijau)),
      tambah("belas", teks("n2b", 150, 160, "luas 12 cm²", 10.4, W.hijau)),
    ),
    k(
      SUARA_Y4,
      bersih(0),
      tambah(0, judul("Nomor 3: segitiga pada kisi")),
      tambah("segitiga", ...kisiLatar("n3g", 78, 34, 8, 5, 18, W.putih, W.abu), segitigaKisi("n3", 78, 34, SEGITIGA_N3, 18, "#A3D154")),
      tambah("Alasnya", teks("n3a", 150, 140, "alas 6 petak, tinggi 3 petak", 8.8, W.biru)),
      tambah("penuh", teks("n3b", 150, 158, "6 petak penuh + 6 setengah petak", 8.8, W.coklat)),
      tambah("sembilan", teks("n3c", 150, 178, "6 + 3 = 9 cm²", 12, W.hijau)),
    ),
  ],
};

/* ------------------------------ 15. Miskonsepsi, diferensiasi, dan metode (Panduan Guru hlm. 153–154) ------------------------------ */
const SUARA_Z1 = "Miskonsepsi pertama dan kedua di panduan guru: murid mengukur dengan satuan tidak baku yang berbeda atau dicampur. Padahal satuannya harus sejenis dan seragam, menutupi daerah tanpa celah.";
const SUARA_Z2 = "Miskonsepsi ketiga menulis bahwa ukuran persegi satuan harus berbeda-beda. Itu bertentangan dengan seluruh subbab yang menuntut satuan seragam, jadi maksudnya tentu sama.";
const SUARA_Z3 = "Murid yang cepat diberi latihan tanpa bantuan dan soal tambahan. Kesulitan umum: hasil ukur berbeda bila satuan berbeda, sulit memilih satuan, dan lupa menutupi tanpa celah.";
const SUARA_Z4 = "Metode yang disarankan adalah diskusi dan tanya jawab, dengan kelompok yang beragam dan ketua berkemampuan tinggi.";
const SUARA_Z5 = "Ringkasnya, luas adalah banyaknya satuan yang menutupi tanpa celah. Hasilnya bergantung pada satuan, dan satuan baku seperti sentimeter persegi dan meter persegi membuatnya sama bagi semua orang.";

export const ADEGAN_MISKONSEPSI: AdeganStory = {
  id: "miskonsepsi",
  judul: "Miskonsepsi, kesulitan, metode, dan ringkasan",
  sumber: "Panduan Guru hlm. 153–154",
  latar: "#FFF7ED",
  kutipan: [
    "Miskonsepsi",
    "Miskonsepsi yang sering terjadi dalam pengukuran luas, yaitu",
    "Peserta didik mengukur luas daerah menggunakan satuan tidak baku",
    "yang berbeda-beda atau dicampur.",
    "Mengukur luas daerah harus menggunakan jenis satuan tidak baku",
    "digunakan harus menutupi seluruh daerah tanpa celah.",
    "Mengukur luas dengan persegi satuan, harus ditekankan ukuran",
    "persegi satuan berbeda-beda.",
    "Diferensiasi",
    "mengerjakan latihan tanpa bantuan.",
    "Kesulitan yang dialami peserta didik dalam memahami konsep luas",
    "Peserta didik mengalami kesulitan dalam menentukan satuan tidak",
    "Peserta didik belum memahami bahwa luas suatu daerah harus ditutupi",
    "pembelajaran yang disarankan untuk subbab luas adalah Diskusi dan",
    "Tanya Jawab",
    "kelompok adalah peserta didik dengan tingkat kemampuan tinggi",
  ],
  ketukan: [
    k(
      SUARA_Z1,
      tambah(0, judul("Miskonsepsi 1 dan 2")),
      tambah("dicampur.", ...sel("z1", 20, 44, penuh(4, 2), 16, "#86EFAC"), teks("z1x", 52, 88, "dicampur: salah", 8.8, W.merah)),
      ...[0, 1, 2].map((i) => tambah("dicampur.", kotak(`z1c${i}`, 28 + i * 20, 52, 14, 14, W.pink, W.biru, { rx: 0 }))),
      tambah("seragam,", ...sel("z2", 180, 44, penuh(4, 2), 16, W.pink), teks("z2x", 212, 88, "seragam: benar", 8.8, W.hijau)),
      tambah("celah.", teks("z3", 150, 132, "menutupi seluruh daerah tanpa celah", 9.4, W.coklat)),
    ),
    k(
      SUARA_Z2,
      bersih(0),
      tambah(0, judul("Miskonsepsi 3: tidak masuk akal")),
      tambah("menulis", ...kartu("zm1", 14, 36, 272, 40, W.merahMuda, ["buku: persegi satuan", "harus berbeda-beda"], 9)),
      tambah("bertentangan", ...kartu("zm2", 14, 90, 272, 40, W.hijauMuda, ["subbab menuntut persegi", "satuan yang seragam"], 9)),
      tambah("tentu", teks("zm3", 150, 160, "maksudnya: persegi satuan sama", 9.4, W.merah)),
    ),
    k(
      SUARA_Z3,
      bersih(0),
      tambah(0, judul("Diferensiasi dan kesulitan")),
      tambah("cepat,", ...kartu("zd1", 14, 34, 272, 32, W.krem, ["murid cepat: latihan tanpa bantuan"], 8.8)),
      tambah("berbeda@2", ...kartu("zd2", 14, 74, 272, 28, W.langit, ["hasil berbeda bila satuan berbeda"], 8.8)),
      tambah("memilih", ...kartu("zd3", 14, 108, 272, 28, W.pink, ["sulit memilih satuan"], 8.8)),
      tambah("lupa", ...kartu("zd4", 14, 142, 272, 28, W.hijauMuda, ["lupa menutupi tanpa celah"], 8.8)),
    ),
    k(
      SUARA_Z4,
      bersih(0),
      tambah(0, judul("Metode pembelajaran")),
      tambah("diskusi", ...kartu("zk1", 14, 38, 272, 36, W.langit, ["diskusi dan tanya jawab"], 9.4)),
      tambah("Kelompok", ...kartu("zk2", 14, 88, 272, 36, W.hijauMuda, ["kelompok menurut keberagaman"], 9.4)),
      tambah("ketua", ...kartu("zk3", 14, 138, 272, 36, W.krem, ["ketua: kemampuan tinggi"], 9.4)),
    ),
    k(
      SUARA_Z5,
      bersih(0),
      tambah(0, judul("Ringkasan subbab A")),
      tambah("luas", ...kartu("zr1", 14, 34, 272, 36, W.hijauMuda, ["luas = banyak satuan menutupi tanpa celah"], 8.6)),
      tambah("bergantung", ...kartu("zr2", 14, 78, 272, 36, W.langit, ["hasil bergantung pada satuannya"], 9)),
      tambah("baku", ...kartu("zr3", 14, 122, 272, 36, W.krem, ["satuan baku: cm² dan m²"], 9.4)),
      tambah("semua", emo("zr4", 150, 184, "✅", 22)),
    ),
  ],
};

/** Id nomor sel bangun (i) dan (ii) pada Ayo Mencoba 1, dipakai uji. */
export const SEMUA_ID_NOMOR = { i: idNomor("i", luasPeta(PETA.A)), ii: idNomor("ii", luasPeta(PETA.II)) };
