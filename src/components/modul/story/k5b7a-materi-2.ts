import type { AdeganStory, Obj } from "./logika-story";
import { W, bulat, busur, garis, judul, kartu, sedotan, segitiga, tandaSiku, teks, titikSisi } from "./k5b7a-gambar";
import { bersih, k, tambah, warnai } from "./k5b7a-bantu";

/* ------------------------------ 4. Syarat tiga ruas garis membentuk segitiga (hlm. 197) ------------------------------ */
const NOMOR_X = [50, 100, 150, 200, 250];
const tandai = (at: string | number, i: number, bisa: boolean) => [
  warnai(at, bisa ? W.hijauMuda : W.merahMuda, `n${i}`),
  tambah(at, teks(`l${i}`, NOMOR_X[i], 116, bisa ? "bisa" : "tidak", 8.6, bisa ? W.hijau : W.merah)),
];

export const ADEGAN_SYARAT: AdeganStory = {
  id: "syarat-segitiga",
  judul: "Syarat tiga ruas garis membentuk segitiga",
  sumber: "Buku Siswa hlm. 197; Panduan Guru hlm. 296–297",
  latar: "#F0F9FF",
  kutipan: [
    "Apakah semua kelompok sedotan dapat dibuat segitiga?",
    "Kelompok nomor berapa saja yang dapat dibuat segitiga?",
    "Kelompok nomor berapa saja yang tidak dapat dibuat segitiga?",
    "Perhatikan jumlah panjang sisi-sisinya di kolom sebelah kanan.",
    "Tiga sisi dapat dibuat segitiga jika jumlah panjang",
    "dua sisi lebih dari panjang sisi ketiganya.",
  ],
  ketukan: [
    k(
      "Setelah mencoba, jawab pertanyaan. Apakah semua sedotan dapat dibuat segitiga? Tidak. Yang dapat: nomor satu, dua, dan lima. Nomor tiga dan empat tidak dapat.",
      tambah(0, judul("hasil percobaan sedotan")),
      tambah("semua", ...NOMOR_X.flatMap((x, i) => [bulat(`n${i}`, x, 80, 15, W.abu), teks(`nt${i}`, x, 84, String(i + 1), 11)])),
      ...tandai("satu,", 0, true),
      ...tandai("dua,", 1, true),
      ...tandai("lima.", 4, true),
      ...tandai(19, 2, false),
      ...tandai("empat", 3, false),
    ),
    k(
      "Perhatikan jumlah dua sisi. Pada nomor tiga, a tambah b hanya sembilan, padahal sisi ketiga, c, dua belas. Jumlah dua sisi tidak melebihi sisi ketiga.",
      bersih(0),
      tambah(0, judul("nomor 3: 5, 4, dan 12")),
      tambah("tiga,", teks("la", 26, 105, "a + b", 8.6), ...sedotan("sa", 44, 98, 5, W.jingga, 11), ...sedotan("sb", 99, 98, 4, W.langit, 11)),
      tambah("ketiga,", teks("lc", 26, 59, "c", 9), ...sedotan("sc", 44, 52, 12, W.hijauMuda, 11)),
      tambah("sembilan,", teks("e9", 230, 105, "5 + 4 = 9", 10, W.ungu)),
      tambah("belas.", teks("e12", 230, 59, "c = 12", 10, W.ungu)),
      tambah("melebihi", teks("ml", 150, 146, "9 lebih pendek dari 12", 10, W.merah)),
    ),
    k(
      "Pada nomor empat, sepuluh tambah lima sama dengan lima belas, sama dengan sisi ketiga. Kedua sedotan hanya rebah, jadi tidak membentuk segitiga.",
      bersih(0),
      tambah(0, judul("nomor 4: 10, 5, dan 15")),
      tambah("sepuluh", teks("la", 26, 105, "a + b", 8.6), ...sedotan("sa", 44, 98, 10, W.jingga, 10)),
      tambah("lima", ...sedotan("sb", 144, 98, 5, W.langit, 10)),
      tambah("belas,", teks("lc", 26, 59, "c", 9), ...sedotan("sc", 44, 52, 15, W.hijauMuda, 10), teks("eq", 150, 134, "10 + 5 = 15", 11, W.ungu)),
      tambah("rebah", teks("rb", 150, 156, "sama panjang: rebah, tidak jadi segitiga", 9, W.merah)),
    ),
    k(
      "Nomor satu: lima tambah enam sebelas, lebih dari tujuh. Enam tambah tujuh tiga belas, lebih dari lima. Lima tambah tujuh dua belas, lebih dari enam.",
      bersih(0),
      tambah(0, judul("nomor 1: 5, 6, dan 7")),
      tambah("satu,", segitiga("sg", 30, 150, titikSisi(5, 6, 7, 12), W.jingga)),
      tambah("sebelas,", teks("q1", 225, 70, "5 + 6 = 11 > 7", 9.4, W.hijau)),
      tambah("tiga", teks("q2", 225, 96, "6 + 7 = 13 > 5", 9.4, W.hijau)),
      tambah("dua", teks("q3", 225, 122, "5 + 7 = 12 > 6", 9.4, W.hijau)),
      tambah(24, teks("q4", 225, 152, "semua memenuhi", 9.4, W.ungu)),
    ),
    k(
      "Kesimpulannya, tiga sisi dapat dibuat segitiga jika jumlah dua sisi lebih dari sisi ketiganya. Panduan Guru mengingatkan: jangan mengira sembarang tiga ruas garis pasti menjadi segitiga.",
      bersih(0),
      tambah(0, judul("syarat membuat segitiga")),
      tambah("jika", ...kartu("rg", 20, 44, 260, 60, W.hijauMuda, ["jumlah panjang dua sisi", "lebih dari panjang sisi ketiga"], 11)),
      tambah("Panduan", ...kartu("ws", 20, 120, 260, 56, W.merahMuda, ["tidak sembarang 3 ruas garis", "pasti jadi segitiga"], 10)),
    ),
  ],
};

/* ------------------------------ 5. Eksplorasi 7.1B: jenis sudut dan segitiga lancip (hlm. 198 sampai 199) ------------------------------ */
/** Dua sinar dari titik sudut (x, y) membentuk sudut `derajat` ke atas, lengkap dengan busur. */
function sudutGambar(id: string, x: number, y: number, derajat: number, warna: string): Obj[] {
  const rad = (derajat * Math.PI) / 180;
  return [garis(`${id}-r1`, x, y, 40, 0, W.biru, 2.2), garis(`${id}-r2`, x, y, 40 * Math.cos(rad), -40 * Math.sin(rad), W.biru, 2.2), busur(`${id}-b`, x, y, 13, -derajat, 0, warna)];
}

export const ADEGAN_LANCIP: AdeganStory = {
  id: "ekspl-71b-lancip",
  judul: "Eksplorasi 7.1B: jenis sudut dan segitiga lancip",
  sumber: "Buku Siswa hlm. 198–199; Panduan Guru hlm. 297–299",
  latar: "#F5F3FF",
  kutipan: [
    "Eksplorasi 7.1 B",
    "Ayo Membandingkan Segitiga Berdasarkan Besar",
    "Berdasarkan besarnya, kalian juga telah mengenal berbagai macam",
    "Kita dapat memeriksa besar sudutnya dengan",
    "menggunakan sudut siku-siku dari lipatan kertas",
    "Segitiga yang ketiga sudutnya lancip, disebut segitiga lancip.",
    "Apakah segitiga PQR sama jenisnya",
  ],
  ketukan: [
    k(
      "Eksplorasi 7.1B membandingkan segitiga menurut besar sudutnya. Ingat jenis sudut: lancip kurang dari sembilan puluh derajat, siku-siku tepat sembilan puluh, tumpul lebih dari sembilan puluh derajat.",
      tambah(0, judul("Eksplorasi 7.1B: jenis sudut")),
      tambah("lancip", ...sudutGambar("sl", 20, 120, 45, W.hijau), teks("slt", 50, 146, "lancip", 8.6), teks("slu", 50, 160, "kurang dari 90°", 8.4, W.hijau)),
      tambah("siku-siku", ...sudutGambar("ss", 118, 120, 90, W.merah), tandaSiku("ssk", 118, 120, 9, 1, -1), teks("sst", 148, 146, "siku-siku", 8.6), teks("ssu", 148, 160, "tepat 90°", 8.4, W.merah)),
      tambah("tumpul", ...sudutGambar("st", 245, 120, 130, W.ungu), teks("stt", 240, 146, "tumpul", 8.6), teks("stu", 240, 160, "lebih dari 90°", 8.4, W.ungu)),
    ),
    k(
      "Ada juga sudut lurus seratus delapan puluh derajat, sudut refleks antara seratus delapan puluh dan tiga ratus enam puluh, dan putaran penuh tiga ratus enam puluh derajat.",
      bersih(0),
      tambah(0, judul("jenis sudut lainnya")),
      tambah("lurus", garis("ll", 15, 100, 70, 0, W.biru, 2.2), busur("lb", 50, 100, 13, -180, 0, W.hijau), teks("llt", 50, 146, "lurus", 8.6), teks("llu", 50, 160, "180°", 8.4, W.hijau)),
      tambah("refleks", ...sudutGambarRefleks(), teks("rft", 150, 146, "refleks", 8.6), teks("rfu", 150, 160, "180° sampai 360°", 8.4, W.ungu), teks("rfa", 150, 128, "335°", 8.4, W.ungu)),
      tambah("putaran", bulat("pp", 250, 100, 20, "none", W.merah, { tebal: 2 }), garis("ppr", 250, 100, 20, 0, W.merah, 2), teks("ppt", 250, 146, "putaran penuh", 8.6), teks("ppu", 250, 160, "360°", 8.4, W.merah)),
    ),
    k(
      "Sekarang segitiga ABC. Sudut A lancip, sudut B lancip, dan sudut C lancip. Karena ketiga sudutnya lancip, namanya segitiga lancip.",
      bersih(0),
      tambah(0, judul("segitiga ABC")),
      tambah("ABC.", segitiga("abc", 90, 165, [[0, 0], [110, 0], [60, -85]], W.hijauMuda), teks("tA", 80, 178, "A", 9.6), teks("tB", 212, 178, "B", 9.6), teks("tC", 150, 74, "C", 9.6)),
      tambah(4, busur("aA", 90, 165, 18, -54.8, 0, W.hijau)),
      tambah(7, busur("aB", 200, 165, 18, -180, -120.5, W.hijau)),
      tambah(11, busur("aC", 150, 80, 16, 59.5, 125.2, W.hijau)),
      tambah("namanya", teks("nm", 240, 120, "segitiga", 9.4, W.hijau), teks("nm2", 240, 133, "lancip", 9.4, W.hijau)),
    ),
    k(
      "Segitiga PQR juga sama jenisnya, karena sama-sama punya sudut lancip dan tidak ada sudut yang bukan lancip. Sudut bisa diperiksa dengan sudut siku-siku dari lipatan kertas.",
      bersih(0),
      tambah(0, judul("ABC dan PQR sama jenisnya")),
      tambah(0, segitiga("abc", 15, 125, [[0, 0], [55, 0], [30, -42.5]], W.hijauMuda), teks("abt", 42, 143, "ABC lancip", 8.4)),
      tambah("PQR", segitiga("pqr", 105, 125, [[0, 0], [57, 0], [18, -48]], W.hijauMuda), teks("pqt", 134, 143, "PQR lancip", 8.4)),
      tambah("sama-sama", teks("sm", 88, 172, "ketiga sudut lancip", 9, W.hijau)),
      tambah("lipatan", ...kartu("lp", 195, 80, 95, 56, W.krem, ["periksa dengan", "lipatan kertas", "(sudut siku-siku)"], 8.2)),
    ),
  ],
};

function sudutGambarRefleks(): Obj[] {
  return [garis("rf1", 150, 100, 36, 0, W.biru, 2.2), garis("rf2", 150, 100, 36 * Math.cos((25 * Math.PI) / 180), -36 * Math.sin((25 * Math.PI) / 180), W.biru, 2.2), busur("rfb", 150, 100, 14, 0, 335, W.ungu)];
}

/* ------------------------------ 6. Segitiga siku-siku dan tumpul (hlm. 199 sampai 201) ------------------------------ */
export const ADEGAN_SIKU_TUMPUL: AdeganStory = {
  id: "ekspl-71b-siku-tumpul",
  judul: "Segitiga siku-siku dan segitiga tumpul",
  sumber: "Buku Siswa hlm. 199–201; Panduan Guru hlm. 299–301",
  latar: "#FFF1F2",
  kutipan: [
    "Ada berapa sudut siku-sikunya?",
    "Apakah segitiga KLM sama jenisnya",
    "Segitiga yang salah satu sudutnya siku-siku,",
    "disebut segitiga siku-siku.",
    "Ada berapa sudut tumpulnya?",
    "Segitiga yang salah satu sudutnya tumpul, disebut",
    "segitiga tumpul.",
    "Hanya salah satu saja, ya.",
    "Apakah mungkin dalam satu",
    "terdapat lebih dari satu sudut tumpul?",
  ],
  ketukan: [
    k(
      "Segitiga DEF. Sudut D lancip, sudut E siku-siku, dan sudut F lancip. Ada satu sudut siku-siku, jadi namanya segitiga siku-siku.",
      tambah(0, judul("segitiga DEF")),
      tambah("DEF.", segitiga("def", 80, 150, [[0, -70], [0, 0], [95, 0]], W.langit), teks("tD", 72, 78, "D", 9.6), teks("tE", 72, 164, "E", 9.6), teks("tF", 184, 164, "F", 9.6)),
      tambah(4, busur("aD", 80, 80, 16, 36.4, 90, W.hijau)),
      tambah(7, tandaSiku("aE", 80, 150, 11, 1, -1)),
      tambah(11, busur("aF", 175, 150, 16, -180, -143.6, W.hijau)),
      tambah("satu", teks("ds", 235, 60, "1 sudut", 9.4, W.merah), teks("ds2", 235, 73, "siku-siku", 9.4, W.merah)),
    ),
    k(
      "Segitiga KLM sama jenisnya dengan DEF, karena sama-sama memiliki sudut siku-siku, dan hanya satu. Segitiga yang salah satu sudutnya siku-siku disebut segitiga siku-siku.",
      tambah("KLM", segitiga("klm", 200, 150, [[0, 0], [80, 0], [80, -60]], W.krem), tandaSiku("aK", 280, 150, 10, -1, -1), teks("tM", 196, 164, "M", 9.6), teks("tK", 288, 164, "K", 9.6), teks("tL", 288, 86, "L", 9.6)),
      tambah("Segitiga@2", teks("ru", 150, 190, "salah satu sudutnya siku-siku: segitiga siku-siku", 8.6, W.merah)),
    ),
    k(
      "Segitiga HIJ. Sudut H lancip, sudut I tumpul, dan sudut J lancip. Ada satu sudut tumpul, jadi namanya segitiga tumpul.",
      bersih(0),
      tambah(0, judul("segitiga HIJ")),
      tambah("HIJ.", segitiga("hij", 15, 150, [[0, 0], [110, 0], [30, -25]], W.merahMuda), teks("tH", 7, 164, "H", 9.6), teks("tJ", 133, 164, "J", 9.6), teks("tI", 45, 118, "I", 9.6)),
      tambah(4, busur("aH", 15, 150, 16, -39.8, 0, W.hijau)),
      tambah(7, busur("aI", 45, 125, 11, 17.4, 140.2, W.merah)),
      tambah(11, busur("aJ", 125, 150, 16, -180, -162.6, W.hijau)),
      tambah("satu", teks("ds", 215, 60, "1 sudut", 9.4, W.merah), teks("ds2", 215, 73, "tumpul", 9.4, W.merah)),
    ),
    k(
      "Segitiga XYZ juga tumpul, karena hanya memiliki satu sudut tumpul. Segitiga yang salah satu sudutnya tumpul disebut segitiga tumpul.",
      tambah("XYZ", segitiga("xyz", 170, 150, [[0, 0], [95, 0], [70, -30]], W.merahMuda), teks("tX", 162, 164, "X", 9.6), teks("tZ", 273, 164, "Z", 9.6), teks("tY", 240, 114, "Y", 9.6)),
      tambah("Segitiga@2", teks("ru", 150, 190, "salah satu sudutnya tumpul: segitiga tumpul", 8.6, W.merah)),
    ),
    k(
      "Nisa bertanya: mungkinkah satu segitiga siku-siku punya dua sudut siku-siku? Atau segitiga tumpul punya dua sudut tumpul? Kita jawab di Eksplorasi 7.1C.",
      bersih(0),
      tambah(0, judul("pertanyaan Nisa")),
      tambah("mungkinkah", ...kartu("pn1", 20, 40, 260, 44, W.krem, ["Mungkin 2 sudut siku-siku", "dalam 1 segitiga siku-siku?"], 9.4)),
      tambah("Atau", ...kartu("pn2", 20, 96, 260, 44, W.hijauMuda, ["Mungkin 2 sudut tumpul", "dalam 1 segitiga tumpul?"], 9.4)),
      tambah("Kita", teks("pn3", 150, 170, "dijawab di Eksplorasi 7.1C", 10, W.ungu)),
    ),
  ],
};

