import type { AdeganStory, Obj } from "./logika-story";
import { BENTUK_72A, W, bangun, bulat, garis, huruf, idDari, ide, kartu, kotak, poli, sama, sejajar, siku, teks, tegakLurus, titikSudut } from "./k5b7b-gambar";
import { bersih, hapus, k, tambah, ubah } from "./k5b7b-bantu";

/* ------------------------------ 1. Pembuka Sub-Bab B dan Eksplorasi 7.2A (hlm. 209–210) ------------------------------ */
const NAMA_ENAM: Array<[string, "sembarang" | "jajar" | "persegiPanjang" | "belahKetupat" | "persegi" | "layang", string]> = [
  ["trapesium", "sembarang", "trapesium"],
  ["jajargenjang", "jajar", "jajargenjang"],
  ["persegi panjang", "persegiPanjang", "persegi panjang"],
  ["belah ketupat", "belahKetupat", "belah ketupat"],
  ["persegi", "persegi", "persegi"],
  ["layang-layang", "layang", "layang-layang"],
];
const SEL = [
  { cx: 50, cy: 70 },
  { cx: 150, cy: 70 },
  { cx: 250, cy: 70 },
  { cx: 50, cy: 136 },
  { cx: 150, cy: 136 },
  { cx: 250, cy: 136 },
];
const enamBangun = (i: number): Obj[] => [bangun(`e${i}`, NAMA_ENAM[i][1], SEL[i].cx, SEL[i].cy, 14, W.hijauMuda), teks(`e${i}t`, SEL[i].cx, SEL[i].cy + 31, NAMA_ENAM[i][2], 8.2, W.biru)];

const KOL = [60, 150, 240];
const BAR = [60, 112, 164];
const HURUF_72A = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
const cx72 = (i: number) => KOL[i % 3];
const cy72 = (i: number) => BAR[Math.floor(i / 3)];
const sel72 = HURUF_72A.map((h, i) => kotak(`c${h}`, cx72(i) - 44, cy72(i) - 27, 88, 50, W.putih, W.abu, { rx: 4, tebal: 1 }));
const bentuk72 = HURUF_72A.map((h, i) => (h === "I" ? bulat("sI", cx72(i), cy72(i) + 2, 15, W.putih, W.biru, { tebal: 1.8 }) : poli(`s${h}`, cx72(i), cy72(i) + 2, BENTUK_72A[h], 11, W.putih, W.biru)));
const huruf72 = HURUF_72A.map((h, i) => teks(`l${h}`, cx72(i) - 38, cy72(i) - 17, h, 9, W.merah));
const catat72 = (h: string, isi: string) => {
  const i = HURUF_72A.indexOf(h);
  return teks(`n${h}`, cx72(i) + 8, cy72(i) - 18, isi, 7.4, W.merah);
};

export const ADEGAN_PEMBUKA_B: AdeganStory = {
  id: "pembuka-b",
  judul: "Pembuka Sub-Bab B dan Eksplorasi 7.2A: segi empat",
  sumber: "Buku Siswa hlm. 209–210; Buku Panduan Guru hlm. 314–316",
  latar: "#EEF2FF",
  kutipan: ["B. Membandingkan Ciri-Ciri Segi Empat", "Ayo Mengingat Kembali Segi Empat", "Perhatikan gambar-gambar bangun datar berikut", "Manakah yang merupakan segi empat?", "Segi empat adalah bangun datar yang dibatasi oleh empat sisi", "A, B, F, dan H", "segi empat cekung", "convex quadrilateral"],
  ketukan: [
    k(
      "Selamat datang di Sub-Bab B, membandingkan ciri-ciri segi empat. Kita akan membahas trapesium, jajargenjang, persegi panjang, belah ketupat, persegi, dan layang-layang.",
      tambah(0, teks("jud", 150, 24, "Sub-Bab B: Segi Empat", 13, W.ungu)),
      tambah("trapesium,", enamBangun(0)),
      tambah("jajargenjang,", enamBangun(1)),
      tambah("panjang,", enamBangun(2)),
      tambah("belah", enamBangun(3)),
      tambah("persegi@2", enamBangun(4)),
      tambah("layang-layang.", enamBangun(5)),
    ),
    k(
      "Eksplorasi 7.2A, mengingat kembali segi empat. Perhatikan sembilan bangun datar berikut, yang diberi huruf A sampai I.",
      bersih(0),
      tambah(0, teks("jud", 150, 15, "Eksplorasi 7.2A", 11.5, W.ungu)),
      tambah("Perhatikan", sel72),
      tambah("sembilan", bentuk72),
      tambah("huruf", huruf72),
    ),
    k(
      "Manakah yang merupakan segi empat? Jawabannya A, B, F, dan H.",
      ubah(5, ...["C", "D", "E", "G", "I"].flatMap((h) => [{ id: `s${h}`, op: 0.35 }, { id: `l${h}`, op: 0.35 }])),
      ubah(6, { id: "sA", warna: W.hijauMuda }),
      ubah(7, { id: "sB", warna: W.hijauMuda }),
      ubah(8, { id: "sF", warna: W.hijauMuda }),
      ubah(10, { id: "sH", warna: W.hijauMuda }),
    ),
    k(
      "Bangun C hanya memiliki tiga sisi, D dan G memiliki lima sisi, E berbentuk bintang, dan I berupa lingkaran.",
      tambah(4, catat72("C", "3 sisi")),
      tambah(6, catat72("D", "5 sisi")),
      tambah(10, catat72("G", "5 sisi")),
      tambah(14, catat72("E", "bintang")),
      tambah(18, catat72("I", "lingkaran")),
    ),
    k(
      "Apakah bangun H bisa disebut segi empat? Menurut Buku Panduan Guru, H adalah segi empat cekung. Biasanya sekolah dasar mengajarkan segi empat cembung saja.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Apakah H segi empat?", 13, W.ungu)),
      tambah(0, poli("hb", 82, 104, BENTUK_72A.H, 34, W.hijauMuda, W.biru)),
      tambah(15, kartu("h1", 150, 52, 140, 38, W.krem, ["H = segi empat cekung"], 9)),
      tambah(16, garis("hd", 82 + 1.4 * 34, 104 - 0.1 * 34, -2.5 * 34, 1.1 * 34, W.merah, 1.6, { putus: true })),
      tambah(16, teks("hdt", 82, 168, "diagonal di luar bangun", 7.6, W.merah)),
      tambah(21, kartu("h2", 150, 100, 140, 38, W.muda, ["SD umumnya:", "segi empat cembung"], 8.4)),
    ),
    k(
      "Jadi, segi empat adalah bangun datar yang dibatasi oleh empat sisi. Sekarang kita mulai dari trapesium.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Segi empat", 13, W.ungu)),
      tambah("segi", poli("q", 150, 100, BENTUK_72A.A, 36, W.hijauMuda, W.biru)),
      tambah("empat", teks("q1", 150, 164, "dibatasi 4 sisi", 11, W.merah)),
      tambah("trapesium.", kartu("q2", 90, 174, 120, 22, W.krem, ["mulai dari trapesium"], 8.4)),
    ),
  ],
};

/* ------------------------------ 2. Eksplorasi 7.2B trapesium (hlm. 210–211) ------------------------------ */
const T = { cx: 150, cy: 106, s: 30 };
const tegakDE = tegakLurus("de", "sembarang", T.cx, T.cy, T.s, "D", "A", "B", "E");
const tegakCF = tegakLurus("cf", "sembarang", T.cx, T.cy, T.s, "C", "A", "B", "F");
const TRAPESIUM_DASAR = (): Obj[] => [bangun("tb", "sembarang", T.cx, T.cy, T.s, W.putih), ...huruf("th", "sembarang", T.cx, T.cy, T.s)];

export const ADEGAN_TRAPESIUM: AdeganStory = {
  id: "trapesium",
  judul: "Eksplorasi 7.2B: mengingat kembali ciri-ciri trapesium",
  sumber: "Buku Siswa hlm. 210–211; Buku Panduan Guru hlm. 316–318",
  latar: "#FFF7ED",
  kutipan: ["Ayo Mengingat Kembali Ciri-Ciri Trapesium", "dinamakan trapesium", "tegak lurus ke", "Apakah DE = CF", "Trapesium sembarang", "Trapesium siku-siku", "Trapesium sama kaki"],
  ketukan: [
    k(
      "Eksplorasi 7.2B, mengingat kembali ciri-ciri trapesium. Di kelas empat kita belajar bahwa bangun ABCD ini dinamakan trapesium.",
      tambah(0, teks("jud", 150, 24, "Eksplorasi 7.2B", 13, W.ungu)),
      tambah("bangun", TRAPESIUM_DASAR().filter((o) => o.id === "tb")),
      tambah("ABCD", TRAPESIUM_DASAR().filter((o) => o.id !== "tb")),
    ),
    k(
      "Untuk memeriksa sisi sejajar, buat garis dari titik D tegak lurus ke alas AB, diperoleh titik E. Dari titik C diperoleh titik F.",
      tambah(9, tegakDE[0]),
      tambah(14, tegakDE[1], tegakDE[2]),
      tambah(18, tegakCF[0]),
      tambah(21, tegakCF[1], tegakCF[2]),
    ),
    k(
      "Ruas garis DE dan CF adalah jarak antara sisi DC ke sisi AB. Keduanya sama panjang, sehingga sisi DC sejajar dengan sisi AB.",
      tambah(14, teks("dc", 150, 176, "DE = CF", 11, W.hijau)),
      tambah(19, sejajar("sj1", "sembarang", T.cx, T.cy, T.s, "A", "B"), sejajar("sj2", "sembarang", T.cx, T.cy, T.s, "D", "C")),
    ),
    k(
      "Tidak ada sisi lain yang sejajar, dan tidak ada sisi yang sama panjang. Jadi ini trapesium sembarang.",
      hapus(0, "dc"),
      ubah(0, { id: "tb", warna: W.krem }),
      tambah("trapesium", kartu("jn", 60, 164, 180, 26, W.krem, ["trapesium sembarang"], 9.4)),
    ),
    k(
      "Pada trapesium ABCD ini, sisi DC dan AB sejajar, tidak ada sisi sama panjang, ada sudut sama besar yaitu 90 derajat, dan tidak punya sumbu simetri. Ini trapesium siku-siku.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Trapesium siku-siku", 13, W.ungu)),
      tambah(0, bangun("tk", "siku", T.cx, T.cy - 6, T.s, W.putih), huruf("tkh", "siku", T.cx, T.cy - 6, T.s)),
      tambah(8, sejajar("ks1", "siku", T.cx, T.cy - 6, T.s, "A", "B"), sejajar("ks2", "siku", T.cx, T.cy - 6, T.s, "D", "C")),
      tambah(19, siku("ka", "siku", T.cx, T.cy - 6, T.s, "A"), siku("kd", "siku", T.cx, T.cy - 6, T.s, "D"), teks("k90a", 126, T.cy - 12 + 22, "90°", 8, W.merah), teks("k90d", 126, T.cy - 6 - 22 + 12, "90°", 8, W.merah)),
      tambah(27, kartu("kj", 50, 164, 200, 26, W.krem, ["trapesium siku-siku"], 9.4)),
    ),
    k(
      "Trapesium PQRS ini punya sisi sejajar PQ dan SR, ada sisi sama panjang yaitu PS dan QR, dan sudut P sama dengan sudut Q. Ia punya sumbu simetri, jadi ini trapesium sama kaki.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Trapesium sama kaki", 13, W.ungu)),
      tambah(0, bangun("tp", "samaKaki", T.cx, T.cy - 6, T.s, W.putih), huruf("tph", "samaKaki", T.cx, T.cy - 6, T.s)),
      tambah(5, sejajar("ps1", "samaKaki", T.cx, T.cy - 6, T.s, "P", "Q"), sejajar("ps2", "samaKaki", T.cx, T.cy - 6, T.s, "S", "R")),
      tambah(12, sama("pt1", "samaKaki", T.cx, T.cy - 6, T.s, "S", "P"), sama("pt2", "samaKaki", T.cx, T.cy - 6, T.s, "Q", "R")),
      tambah(20, teks("psq", 150, T.cy + 38, "sudut P = sudut Q", 8.6, W.merah)),
      tambah(26, garis("sm", 150, T.cy - 6 - 0.9 * T.s - 6, 0, 1.8 * T.s + 12, W.ungu, 1.6, { putus: true })),
      tambah(30, kartu("pj", 50, 164, 200, 26, W.krem, ["trapesium sama kaki"], 9.4)),
    ),
  ],
};

/* ------------------------------ 3. Definisi trapesium dan Ayo Berpikir Kritis (hlm. 212) ------------------------------ */
export const ADEGAN_TRAPESIUM_DEF: AdeganStory = {
  id: "trapesium-def",
  judul: "Rangkuman trapesium dan Ayo Berpikir Kritis",
  sumber: "Buku Siswa hlm. 212; Buku Panduan Guru hlm. 318",
  latar: "#EEF2FF",
  kutipan: ["Trapesium adalah segi empat yang mempunyai setidaknya sepasang sisi sejajar", "Trapesium siku-siku adalah trapesium yang salah satu", "Trapesium sama kaki adalah trapesium yang memiliki satu simetri lipat", "Ayo Berpikir Kritis", "hanya memiliki sepasang sisi yang sejajar", "keduanya dapat dibenarkan", "kita bersepakat menggunakan pengertian yang"],
  ketukan: [
    k(
      "Inilah rangkuman buku. Trapesium adalah segi empat yang mempunyai setidaknya sepasang sisi sejajar. Trapesium siku-siku salah satu sudutnya siku-siku, dan trapesium sama kaki memiliki satu simetri lipat.",
      tambah(0, teks("jud", 150, 22, "Rangkuman trapesium", 13, W.ungu)),
      tambah(3, kartu("r1", 20, 34, 260, 36, W.hijauMuda, ["Trapesium", "segi empat dengan setidaknya sepasang sisi sejajar"], 8.2)),
      tambah(13, kartu("r2", 20, 80, 260, 36, W.muda, ["Trapesium siku-siku", "salah satu sudutnya siku-siku"], 8.2)),
      tambah(20, kartu("r3", 20, 126, 260, 36, W.krem, ["Trapesium sama kaki", "memiliki satu simetri lipat"], 8.2)),
    ),
    k(
      "Ayo berpikir kritis. Lukas bertanya, apakah trapesium boleh memiliki lebih dari sepasang sisi sejajar? Padahal di kelas empat kita belajar, trapesium hanya memiliki sepasang sisi sejajar.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Ayo Berpikir Kritis", 13, W.ungu)),
      tambah("Lukas", ide("lk", 14, 34, 272, 54, "Lukas", ["Apakah trapesium boleh memiliki", "lebih dari sepasang sisi sejajar?"], W.krem, 8.4)),
      tambah("Padahal", ide("lb", 14, 98, 272, 54, "Di kelas IV", ["trapesium hanya memiliki sepasang", "sisi yang sejajar."], W.muda, 8.4)),
    ),
    k(
      "Menurut buku, kedua pendapat dapat dibenarkan: setidaknya sepasang sisi sejajar, atau tepat sepasang sisi sejajar. Alasan keduanya sama kuat.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Dua pendapat", 13, W.ungu)),
      tambah("setidaknya", kartu("p1", 14, 44, 128, 70, W.hijauMuda, ["setidaknya", "sepasang sisi", "sejajar"], 9)),
      tambah("tepat", kartu("p2", 158, 44, 128, 70, W.muda, ["tepat", "sepasang sisi", "sejajar"], 9)),
      tambah("sama", teks("p3", 150, 146, "alasan sama kuat", 11, W.merah)),
    ),
    k(
      "Di buku ini kita bersepakat memakai pengertian yang pertama, supaya wawasanmu lebih luas.",
      ubah(0, { id: "p1-k", warna: W.emas }, { id: "p2-k", op: 0.45 }, { id: "p2-t0", op: 0.45 }, { id: "p2-t1", op: 0.45 }, { id: "p2-t2", op: 0.45 }),
      tambah("pertama,", teks("p4", 78, 134, "✓", 20, W.hijau), teks("p5", 150, 176, "dipakai di buku ini", 10.4, W.hijau)),
      hapus("pertama,", "p3"),
    ),
  ],
};

/* ------------------------------ 4. Eksplorasi 7.2C jajargenjang diperiksa (hlm. 213–214) ------------------------------ */
const J = { cx: 150, cy: 102, s: 30 };
const jDasar = (): Obj[] => [bangun("jb", "jajar", J.cx, J.cy, J.s, W.putih), ...huruf("jh", "jajar", J.cx, J.cy, J.s)];
const tegakE = tegakLurus("ge", "jajar", J.cx, J.cy, J.s, "D", "A", "B", "E");
const tegakF = tegakLurus("gf", "jajar", J.cx, J.cy, J.s, "B", "D", "C", "F");
const tegakG = tegakLurus("gg", "jajar", J.cx, J.cy, J.s, "B", "A", "D", "G");
const tegakH = tegakLurus("gh", "jajar", J.cx, J.cy, J.s, "D", "B", "C", "H");

export const ADEGAN_JAJAR_PERIKSA: AdeganStory = {
  id: "jajar-periksa",
  judul: "Eksplorasi 7.2C: Nisa dan Komang memeriksa jajargenjang",
  sumber: "Buku Siswa hlm. 213–214; Buku Panduan Guru hlm. 319–321",
  latar: "#FDF2F8",
  kutipan: ["Ayo Mengingat Kembali Jajargenjang", "Nisa dan Komang bersama-", "sama memeriksa ciri-ciri jajar-", "genjang ABCD di samping", "Dengan menggunakan busur", "Coba ukurlah panjang DE dan FB", "Coba ukurlah panjang GB dan DH", "Pasangan sudut mana saja yang", "sama besar? A = C dan B = D"],
  ketukan: [
    k(
      "Eksplorasi 7.2C, mengingat kembali jajargenjang. Nisa dan Komang bersama-sama memeriksa ciri-ciri jajargenjang ABCD.",
      tambah(0, teks("jud", 150, 24, "Eksplorasi 7.2C", 13, W.ungu)),
      tambah("jajargenjang", jDasar().filter((o) => o.id === "jb")),
      tambah("ABCD.", jDasar().filter((o) => o.id !== "jb")),
    ),
    k(
      "Dengan busur derajat, dibuat garis dari D tegak lurus AB di titik E, dan dari B tegak lurus DC di titik F.",
      tambah(4, tegakE[0]),
      tambah(12, tegakE[1], tegakE[2]),
      tambah(14, tegakF[0]),
      tambah(20, tegakF[1], tegakF[2]),
    ),
    k(
      "Ukur panjang DE dan FB. Hasilnya sama, dengan demikian sisi AB sejajar dengan sisi DC.",
      tambah("sama,", teks("de", 150, 176, "DE = FB", 11, W.hijau)),
      tambah("sejajar", sejajar("s1", "jajar", J.cx, J.cy, J.s, "A", "B"), sejajar("s2", "jajar", J.cx, J.cy, J.s, "D", "C")),
    ),
    k(
      "Dibuat garis dari B tegak lurus AD di titik G, dan dari D tegak lurus BC di titik H. Panjang GB dan DH sama, jadi AD sejajar BC.",
      hapus(0, idDari(tegakE, tegakF), "de"),
      tambah(1, tegakG[0]),
      tambah(8, tegakG[1], tegakG[2]),
      tambah(11, tegakH[0]),
      tambah(17, tegakH[1], tegakH[2]),
      tambah(23, sejajar("s3", "jajar", J.cx, J.cy, J.s, "A", "D", W.merah), sejajar("s4", "jajar", J.cx, J.cy, J.s, "B", "C", W.merah)),
    ),
    k(
      "Ketiga, periksa panjang sisi dengan penggaris. Sisi AB sama dengan DC, dan sisi AD sama dengan BC. Jadi sisi yang berhadapan sama panjang.",
      hapus(0, idDari(tegakG, tegakH)),
      tambah(6, sama("t1", "jajar", J.cx, J.cy, J.s, "A", "B", 1, W.hijau), sama("t2", "jajar", J.cx, J.cy, J.s, "D", "C", 1, W.hijau)),
      tambah(11, sama("t3", "jajar", J.cx, J.cy, J.s, "A", "D", 2, W.merah), sama("t4", "jajar", J.cx, J.cy, J.s, "B", "C", 2, W.merah)),
      tambah(17, teks("tk", 150, 176, "sisi berhadapan sama panjang", 9.6, W.hijau)),
    ),
    k(
      "Sudut A sama dengan sudut C, dan sudut B sama dengan sudut D. Sudut A tidak sama dengan sudut B.",
      hapus(0, "tk"),
      tambah(2, titikSudut("tdA", "jajar", J.cx, J.cy, J.s, "A", W.merah), titikSudut("tdC", "jajar", J.cx, J.cy, J.s, "C", W.merah)),
      tambah(9, titikSudut("tdB", "jajar", J.cx, J.cy, J.s, "B", W.ungu), titikSudut("tdD", "jajar", J.cx, J.cy, J.s, "D", W.ungu)),
      tambah(15, teks("sa", 150, 176, "A = C, B = D, tetapi A ≠ B", 9.6, W.merah)),
    ),
  ],
};
