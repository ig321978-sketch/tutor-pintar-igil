import type { AdeganStory } from "./logika-story";
import { W, baris, batang, bulat, emo, garis, judul, kartu, kartuAngka, kotak, teks, type Titik } from "./k1b5d-gambar";
import { bersih, geserKartu, hapus, hitungMuncul, idx, k, redamkan, sorotkan, tambah, ubah } from "./k1b5d-bantu";

const JERUK = "#FDBA74";

/* ------------------------------ 1. Jeruk Kira, Tika, dan Wei ------------------------------ */
const SUARA_J1 = "Kira, Tika, dan Wei punya jeruk. Kira punya sepuluh jeruk. Kita hitung pelan-pelan: satu, dua, tiga, empat, lima, enam, tujuh, delapan, sembilan, sepuluh.";
const SUARA_J2 = "Tika punya jeruk juga. Kita hitung pelan-pelan: satu, dua, tiga, empat, lima, enam, tujuh, delapan, sembilan, sepuluh, sebelas, dua belas, tiga belas, empat belas. Tika punya empat belas jeruk.";
const SUARA_J3 = "Wei punya jeruk juga. Kita hitung pelan-pelan: satu, dua, tiga, empat, lima, enam, tujuh, delapan, sembilan, sepuluh, sebelas, dua belas. Wei punya dua belas jeruk.";
const SUARA_J4 = "Jeruk siapa yang paling banyak? Jeruk siapa yang paling sedikit? Kita lihat bilangannya: sepuluh, empat belas, dan dua belas.";
const SUARA_J5 = "Empat belas paling besar. Jadi Tika punya jeruk paling banyak.";
const SUARA_J6 = "Sepuluh paling kecil. Jadi Kira punya jeruk paling sedikit. Dan Wei punya jeruk yang di tengah.";
const KIRA: Titik[] = baris(10, 70, 36, 20);
const TIKA: Titik[] = baris(14, 112, 20, 19);
const WEI: Titik[] = baris(12, 154, 24, 19.5);
const jeruk = (id: string) => (i: number, p: Titik) => bulat(`${id}${i}`, p.x, p.y, 6.5, JERUK, W.coklat, { tebal: 1.3 });

export const ADEGAN_JERUK: AdeganStory = {
  id: "jeruk-tiga",
  judul: "Jeruk Kira, Tika, dan Wei",
  sumber: "Materi: jeruk Kira, Tika, dan Wei",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_J1,
      tambah(0, judul("Jeruk Kira, Tika, dan Wei"), teks("nk", 150, 48, "Kira", 10, W.ungu)),
      ...hitungMuncul(SUARA_J1, "k", KIRA, jeruk("kj"), "pelanpelan", true, 1, 12),
      ubah(idx(SUARA_J1, "sepuluh", 2), { id: "nk", isi: "Kira: 10 jeruk", warna: W.merah }),
    ),
    k(
      SUARA_J2,
      tambah(0, teks("nt", 150, 90, "Tika", 10, W.ungu)),
      ...hitungMuncul(SUARA_J2, "t", TIKA, jeruk("tj"), "pelanpelan", true, 1, 12),
      ubah(idx(SUARA_J2, "belas", 4), { id: "nt", isi: "Tika: 14 jeruk", warna: W.merah }),
    ),
    k(
      SUARA_J3,
      tambah(0, teks("nw", 150, 132, "Wei", 10, W.ungu)),
      ...hitungMuncul(SUARA_J3, "w", WEI, jeruk("wj"), "pelanpelan", true, 1, 12),
      ubah(idx(SUARA_J3, "belas", 2), { id: "nw", isi: "Wei: 12 jeruk", warna: W.merah }),
    ),
    k(SUARA_J4, tambah("banyak?", emo("q1", 276, 48, "\u{1F914}", 22)), sorotkan("sepuluh:", "nk"), sorotkan("empat", "nt"), sorotkan("dua", "nw")),
    k(SUARA_J5, hapus(0, "q1"), redamkan(0, "nk", "nw"), sorotkan("Tika", ...TIKA.map((_, i) => `tj${i}`)), tambah("banyak.", emo("pj", 284, 112, "\u{1F3C6}", 20))),
    k(
      SUARA_J6,
      redamkan(0, "nt", ...TIKA.map((_, i) => `tj${i}`)),
      sorotkan("Kira", ...KIRA.map((_, i) => `kj${i}`)),
      tambah("sedikit.", ...kartu("jb", 14, 174, 134, 24, W.hijauMuda, ["paling banyak: Tika"], 8.8), ...kartu("js", 152, 174, 134, 24, W.langit, ["paling sedikit: Kira"], 8.8)),
      sorotkan("tengah.", "nw"),
    ),
  ],
};

/* ------------------------------ 2. Paling banyak dan paling sedikit ------------------------------ */
const SUARA_S1 = "Kalau ada dua kumpulan, kita pakai kata lebih banyak dan lebih sedikit. Kalau ada tiga kumpulan atau lebih, kita pakai kata yang baru.";
const SUARA_S2 = "Kata barunya adalah paling banyak dan paling sedikit. Ini kita lihat dari batang jeruk Kira, Tika, dan Wei.";
const SUARA_S3 = "Batang yang paling panjang berarti paling banyak. Batang yang paling pendek berarti paling sedikit.";
const SUARA_S4 = "Jadi, untuk tiga kumpulan, empat belas paling banyak, sepuluh paling sedikit, dan dua belas ada di tengah.";
const BATANGAN = (a: number, b: number, c: number) => [
  teks("bn0", 12, 98, "Kira", 9, W.biru, { anchor: "start" }),
  batang("bt0", 50, 86, a, "#FDBA74"),
  teks("bl0", 58 + a * 12, 99, `${a} jeruk`, 9, W.merah, { anchor: "start" }),
  teks("bn1", 12, 128, "Tika", 9, W.biru, { anchor: "start" }),
  batang("bt1", 50, 116, b, "#FDBA74"),
  teks("bl1", 58 + b * 12, 129, `${b} jeruk`, 9, W.merah, { anchor: "start" }),
  teks("bn2", 12, 158, "Wei", 9, W.biru, { anchor: "start" }),
  batang("bt2", 50, 146, c, "#FDBA74"),
  teks("bl2", 58 + c * 12, 159, `${c} jeruk`, 9, W.merah, { anchor: "start" }),
];

export const ADEGAN_PALING: AdeganStory = {
  id: "paling-banyak",
  judul: "Paling banyak dan paling sedikit",
  sumber: "Materi: paling banyak dan paling sedikit",
  latar: "#F5F3FF",
  ketukan: [
    k(
      SUARA_S1,
      tambah(0, judul("Dua kumpulan atau lebih?")),
      tambah("dua", ...kartu("sa", 14, 40, 272, 34, W.langit, ["dua kumpulan: lebih banyak, lebih sedikit"], 9)),
      tambah("tiga", ...kartu("sb", 14, 90, 272, 34, W.pink, ["tiga atau lebih: kata yang baru"], 9.4)),
    ),
    k(SUARA_S2, bersih(0), tambah(0, judul("Batang jeruk")), tambah("Kata", ...kartu("sk", 40, 30, 220, 22, W.emas, ["paling banyak, paling sedikit"], 9.4)), tambah("batang", ...BATANGAN(10, 14, 12))),
    k(SUARA_S3, sorotkan("panjang", "bt1"), ubah("panjang", { id: "bt1", warna: "#4ADE80" }), ubah("pendek", { id: "bt0", warna: "#60A5FA" }), sorotkan("pendek", "bt0")),
    k(SUARA_S4, hapus(0, "sk-k", "sk-t0"), redamkan(0, "bt0", "bt1"), tambah("Jadi,", ...kartu("sc", 14, 176, 272, 22, W.krem, ["14 paling banyak, 10 paling sedikit"], 9.4)), tambah("tengah.", emo("pj", 276, 146, "\u{1F4CD}", 18))),
  ],
};

/* ------------------------------ 3. Mengurutkan dari terkecil ------------------------------ */
const KX = [32, 122, 212];
const SLOT_Y = 128;
const KARTU_Y = 44;

const SUARA_U1 = "Sekarang kita belajar mengurutkan bilangan. Mengurutkan artinya menyusun bilangan dengan urutan tertentu. Ada tiga kartu bilangan di layar.";
const SUARA_U2 = "Kita susun dari yang terkecil. Terkecil artinya paling kecil lebih dulu. Kita cari bilangan yang paling kecil.";
const SUARA_U3 = "Sepuluh paling kecil. Ketuk kartu sepuluh, lalu seret ke tempat pertama.";
const SUARA_U4 = "Sisanya, dua belas dan empat belas. Dua belas lebih kecil dari empat belas. Jadi dua belas ke tempat kedua.";
const SUARA_U5 = "Terakhir, empat belas ke tempat ketiga. Urutan dari terkecil adalah sepuluh, dua belas, empat belas.";
const SUARA_U6 = "Dari kiri ke kanan, bilangannya makin besar. Ucapkan lagi mengikuti suara guru: sepuluh, dua belas, empat belas.";
const TEMPAT = (nama: string[]) => [0, 1, 2].flatMap((i) => [kotak(`sl${i}`, KX[i], SLOT_Y, 56, 44, "#F1F5F9", W.biru, { rx: 6, tebal: 1.4 }), teks(`st${i}`, KX[i] + 28, 188, nama[i], 8.6, W.ungu)]);

export const ADEGAN_URUT_KECIL: AdeganStory = {
  id: "urut-kecil",
  judul: "Mengurutkan dari terkecil",
  sumber: "Materi: mengurutkan dari terkecil",
  latar: "#FEFCE8",
  ketukan: [
    k(
      SUARA_U1,
      tambah(0, judul("Mengurutkan bilangan")),
      tambah("kartu", ...kartuAngka("c14", KX[0], KARTU_Y, "14", W.pink, 56, 44, 24), ...kartuAngka("c10", KX[1], KARTU_Y, "10", W.krem, 56, 44, 24), ...kartuAngka("c12", KX[2], KARTU_Y, "12", W.hijauMuda, 56, 44, 24)),
    ),
    k(SUARA_U2, tambah("terkecil.", ...TEMPAT(["pertama", "kedua", "ketiga"])), tambah("Terkecil", emo("pnl", 150, 112, "\u{1F4C9}", 18))),
    k(SUARA_U3, hapus(0, "pnl"), sorotkan("Sepuluh", "c10-k"), geserKartu("pertama.", "c10", KX[0], SLOT_Y), tambah("Ketuk", emo("tg", 150, 100, "\u{1F446}", 24))),
    k(SUARA_U4, redamkan(0, "c10-k"), ubah("kecil", { id: "tg", x: KX[2] + 28, y: 108 }), sorotkan("empat", "c14-k"), geserKartu("kedua.", "c12", KX[1], SLOT_Y), redamkan("kedua.", "c14-k")),
    k(SUARA_U5, geserKartu("ketiga.", "c14", KX[2], SLOT_Y), hapus("ketiga.", "tg"), tambah("Urutan", ...kartu("hu", 60, 52, 180, 26, W.emas, ["10, 12, 14"], 13))),
    k(
      SUARA_U6,
      hapus(0, "hu-k", "hu-t0"),
      tambah("kanan,", garis("pn", 40, 118, 220, 0, W.merah, 3), garis("pn2", 252, 118, -12, -6, W.merah, 3), garis("pn3", 252, 118, -12, 6, W.merah, 3)),
      tambah("besar.", teks("mb", 150, 112, "makin besar", 9.6, W.merah)),
    ),
  ],
};

/* ------------------------------ 4. Mengurutkan dari terbesar ------------------------------ */
const SUARA_B1 = "Sekarang kita susun dari yang terbesar. Terbesar artinya paling besar lebih dulu. Ada tiga kartu: sebelas, delapan belas, dan lima belas.";
const SUARA_B2 = "Kita cari bilangan yang paling besar. Delapan belas paling besar, jadi delapan belas ke tempat pertama.";
const SUARA_B3 = "Berikutnya, lima belas dan sebelas. Lima belas lebih besar dari sebelas. Jadi lima belas ke tempat kedua.";
const SUARA_B4 = "Terakhir, sebelas ke tempat ketiga. Urutan dari terbesar adalah delapan belas, lima belas, sebelas.";
const SUARA_B5 = "Dari kiri ke kanan, bilangannya makin kecil. Ucapkan lagi mengikuti suara guru: delapan belas, lima belas, sebelas.";

export const ADEGAN_URUT_BESAR: AdeganStory = {
  id: "urut-besar",
  judul: "Mengurutkan dari terbesar",
  sumber: "Materi: mengurutkan dari terbesar",
  latar: "#F0FDFA",
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, judul("Dari yang terbesar")),
      tambah("tiga", ...TEMPAT(["pertama", "kedua", "ketiga"])),
      tambah("sebelas,", ...kartuAngka("c11", KX[0], KARTU_Y, "11", W.langit, 56, 44, 24)),
      tambah("delapan", ...kartuAngka("c18", KX[1], KARTU_Y, "18", W.pink, 56, 44, 24)),
      tambah("lima", ...kartuAngka("c15", KX[2], KARTU_Y, "15", W.hijauMuda, 56, 44, 24)),
    ),
    k(SUARA_B2, sorotkan("besar.", "c18-k"), geserKartu("pertama.", "c18", KX[0], SLOT_Y), tambah("Kita", emo("tg", 150, 100, "\u{1F446}", 24))),
    k(SUARA_B3, redamkan(0, "c18-k"), ubah("sebelas.", { id: "tg", x: KX[2] + 28, y: 108 }), sorotkan("Lima", "c15-k"), geserKartu("kedua.", "c15", KX[1], SLOT_Y), redamkan("kedua.", "c15-k")),
    k(SUARA_B4, geserKartu("ketiga.", "c11", KX[2], SLOT_Y), hapus("ketiga.", "tg"), tambah("Urutan", ...kartu("hu", 60, 52, 180, 26, W.emas, ["18, 15, 11"], 13))),
    k(
      SUARA_B5,
      hapus(0, "hu-k", "hu-t0"),
      tambah("kanan,", garis("pn", 40, 118, 220, 0, W.merah, 3), garis("pn2", 252, 118, -12, -6, W.merah, 3), garis("pn3", 252, 118, -12, 6, W.merah, 3)),
      tambah("kecil.", teks("mb", 150, 112, "makin kecil", 9.6, W.merah)),
    ),
  ],
};
