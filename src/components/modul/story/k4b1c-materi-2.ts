import type { AdeganStory } from "./logika-story";
import { LATIHAN_DUA, LATIHAN_SATU, W, deret, emo, fmt, judul, kartu, kotak, selTabel, tabelNilai, teks } from "./k4b1c-gambar";
import { bersih, hapus, idx, k, sorotkan, tambah, ubah } from "./k4b1c-bantu";

/* ------------------------------ 5. Membandingkan dari ribuan (Buku Siswa hlm. 18; Panduan Guru hlm. 41) ------------------------------ */
const SUARA_R1 = "Setelah aktivitas tiga, perhatikan penjelasan buku. Bilangan delapan ribu tujuh ratus lima puluh kita tulis pada tabel nilai tempat: ribuan delapan, ratusan tujuh, puluhan lima, satuan nol.";
const SUARA_R2 = "Bilangan tujuh ribu lima ratus juga kita tulis pada tabel: ribuan tujuh, ratusan lima, puluhan nol, satuan nol.";
const SUARA_R3 = "Bandingkan angka pada tempat ribuan. Angka ribuan untuk delapan ribu tujuh ratus lima puluh adalah delapan, dan angka ribuan untuk tujuh ribu lima ratus adalah tujuh.";
const SUARA_R4 = "Karena delapan lebih dari tujuh, jadi delapan ribu tujuh ratus lima puluh lebih dari tujuh ribu lima ratus. Keterangan buku: tanda ini dibaca lebih dari.";

export const ADEGAN_RIBUAN: AdeganStory = {
  id: "ribuan",
  judul: "Membandingkan dua bilangan mulai dari ribuan",
  sumber: "Buku Siswa hlm. 18; Panduan Guru hlm. 41",
  latar: "#EFF6FF",
  kutipan: [
    "Setelah melakukan aktivitas 3, perhatikan penjelasan berikut dengan cermat.",
    "Bandingkan angka pada tempat ribuan.",
    "Angka pada tempat ribuan untuk 8.750 adalah 8.",
    "Karena 8 lebih dari 7. Jadi, 8.750 lebih dari 7.500.",
    "Dapat ditulis 8.750 > 7.500. Keterangan: untuk tanda",
    "melibatkan nilai tempat setiap angka dari bilangan cacah yang akan dibandingkan",
  ],
  ketukan: [
    k(
      SUARA_R1,
      tambah(0, judul("Tabel nilai tempat 8.750")),
      tambah("tabel", ...tabelNilai("ta", 14, 52, 8750, 28, 11)),
      ubah("ribuan", selTabel("ta", 0)),
      ubah("ratusan,", selTabel("ta", 1)),
      ubah("puluhan,", selTabel("ta", 2)),
      ubah("satuan", selTabel("ta", 3)),
    ),
    k(
      SUARA_R2,
      tambah("tabel:", ...tabelNilai("tb", 174, 52, 7500, 28, 11)),
      ubah("ribuan", selTabel("tb", 0, W.langit)),
      ubah("ratusan,", selTabel("tb", 1, W.langit)),
      ubah("puluhan", selTabel("tb", 2, W.langit)),
      ubah("satuan", selTabel("tb", 3, W.langit)),
    ),
    k(
      SUARA_R3,
      ubah(0, ...["ta", "tb"].flatMap((t) => [1, 2, 3].map((c) => selTabel(t, c, W.putih)))),
      ubah("ribuan", selTabel("ta", 0, W.arsir), selTabel("tb", 0, W.arsir)),
      tambah(idx(SUARA_R3, "delapan", 2), teks("ca", 70, 108, "ribuan: 8", 11, W.hijau)),
      tambah(idx(SUARA_R3, "tujuh", 3), teks("cb", 230, 108, "ribuan: 7", 11, W.hijau)),
    ),
    k(
      SUARA_R4,
      hapus(0, "ca", "cb"),
      tambah(0, teks("cm", 150, 124, "8 > 7", 20, W.merah)),
      tambah("jadi", teks("cs", 150, 154, "8.750 > 7.500", 20, W.merah)),
      tambah("Keterangan", ...kartu("ck", 40, 164, 220, 28, W.emas, ["tanda > dibaca lebih dari"], 9.6)),
    ),
  ],
};

/* ------------------------------ 6. Bila ribuan sama: puluhan dan satuan (Buku Siswa hlm. 19; Panduan Guru hlm. 42) ------------------------------ */
const SUARA_B1 = "Perhatikan empat ribu tiga ratus lima puluh dua dan empat ribu tiga ratus enam puluh lima. Pada tempat ribuan dan ratusan angkanya sama, yaitu empat dan tiga.";
const SUARA_B2 = "Karena ribuan dan ratusan sama, kita bandingkan puluhan: bilangan pertama lima, bilangan kedua enam.";
const SUARA_B3 = "Karena lima kurang dari enam, jadi empat ribu tiga ratus lima puluh dua kurang dari empat ribu tiga ratus enam puluh lima. Dapat ditulis dengan tanda kurang dari.";
const SUARA_B4 = "Sekarang empat ribu tiga ratus lima puluh dua dan empat ribu tiga ratus lima puluh lima. Ribuan, ratusan, dan puluhan sama, jadi kita bandingkan satuan.";
const SUARA_B5 = "Satuan bilangan pertama dua, bilangan kedua lima. Karena dua kurang dari lima, jadi empat ribu tiga ratus lima puluh dua kurang dari empat ribu tiga ratus lima puluh lima.";

export const ADEGAN_LANJUT: AdeganStory = {
  id: "lanjut",
  judul: "Ribuan sama: bandingkan puluhan atau satuan",
  sumber: "Buku Siswa hlm. 19; Panduan Guru hlm. 42",
  latar: "#FFFBEB",
  kutipan: [
    "Perhatikan bilangan 4.352 dan 4.365, selanjutnya kita bandingkan nilai tempat",
    "masing-masing adalah sama, maka kita bandingkan angka pada nilai tempat puluhan.",
    "Angka pada tempat puluhan untuk 4.352 adalah 5.",
    "Angka pada tempat puluhan untuk 4.365 adalah 6.",
    "Karena 5 kurang dari 6. Jadi, 4.352 kurang dari 4.365.",
    "Dapat ditulis 4.352 < 4.365. Keterangan: untuk tanda",
    "Perhatikan bilangan 4.352 dan 4.355",
    "Angka pada tempat satuan untuk 4.352 adalah 2.",
    "Angka pada tempat satuan untuk 4.355 adalah 5.",
    "Karena 2 kurang dari 5. Jadi, 4.352 kurang dari 4.355.",
    "Dapat ditulis 4.352 < 4.355.",
  ],
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, judul("4.352 dan 4.365")),
      tambah(idx(SUARA_B1, "dua", 1), ...tabelNilai("ta", 14, 52, 4352, 28, 11)),
      tambah(idx(SUARA_B1, "lima", 2), ...tabelNilai("tb", 174, 52, 4365, 28, 11)),
      ubah("ribuan", selTabel("ta", 0), selTabel("tb", 0)),
      ubah("ratusan", selTabel("ta", 1), selTabel("tb", 1)),
      tambah("sama,", teks("sm", 150, 118, "ribuan dan ratusan sama", 10, W.hijau)),
    ),
    k(
      SUARA_B2,
      hapus(0, "sm"),
      ubah(0, selTabel("ta", 0, W.putih), selTabel("tb", 0, W.putih), selTabel("ta", 1, W.putih), selTabel("tb", 1, W.putih)),
      ubah("puluhan", selTabel("ta", 2, W.arsir), selTabel("tb", 2, W.arsir)),
      tambah("pertama", teks("pa", 70, 108, "puluhan: 5", 11, W.hijau)),
      tambah("kedua", teks("pb", 230, 108, "puluhan: 6", 11, W.hijau)),
    ),
    k(
      SUARA_B3,
      hapus(0, "pa", "pb"),
      tambah(0, teks("p1", 150, 124, "5 < 6", 20, W.merah)),
      tambah("jadi", teks("p2", 150, 154, "4.352 < 4.365", 20, W.merah)),
      tambah("tanda", ...kartu("p3", 40, 164, 220, 28, W.emas, ["tanda < dibaca kurang dari"], 9.6)),
    ),
    k(
      SUARA_B4,
      bersih(0),
      tambah(0, judul("4.352 dan 4.355")),
      tambah(idx(SUARA_B4, "dua", 1), ...tabelNilai("ua", 14, 52, 4352, 28, 11)),
      tambah(idx(SUARA_B4, "lima", 2), ...tabelNilai("ub", 174, 52, 4355, 28, 11)),
      ubah("Ribuan,", selTabel("ua", 0, W.hijauMuda), selTabel("ub", 0, W.hijauMuda)),
      ubah("ratusan,", selTabel("ua", 1, W.hijauMuda), selTabel("ub", 1, W.hijauMuda)),
      ubah("puluhan", selTabel("ua", 2, W.hijauMuda), selTabel("ub", 2, W.hijauMuda)),
      ubah("satuan.", selTabel("ua", 3, W.arsir), selTabel("ub", 3, W.arsir)),
    ),
    k(
      SUARA_B5,
      tambah("pertama", teks("sa", 70, 108, "satuan: 2", 11, W.hijau)),
      tambah("kedua", teks("sb", 230, 108, "satuan: 5", 11, W.hijau)),
      tambah("Karena", teks("s1", 150, 138, "2 < 5", 20, W.merah)),
      tambah("jadi", teks("s2", 150, 168, "4.352 < 4.355", 20, W.merah)),
    ),
  ],
};

/* ------------------------------ 7. Bilangan sama dan aturan membandingkan (Buku Siswa hlm. 20; Panduan Guru hlm. 40) ------------------------------ */
const SUARA_S1 = "Perhatikan empat ribu tiga ratus lima puluh dua dan empat ribu tiga ratus lima puluh dua. Angka pada ribuan, ratusan, puluhan, dan satuan semuanya sama.";
const SUARA_S2 = "Jadi empat ribu tiga ratus lima puluh dua sama dengan empat ribu tiga ratus lima puluh dua. Dapat ditulis dengan tanda sama dengan.";
const SUARA_S3 = "Sekarang kalian sudah membandingkan dua bilangan memakai tiga notasi buku: lebih dari, kurang dari, dan sama dengan.";
const SUARA_S4 = "Aturannya: bandingkan ribuan dulu. Jika sama, bandingkan ratusan. Jika sama, bandingkan puluhan. Jika puluhan sama pula, bandingkan satuan.";

export const ADEGAN_SAMA: AdeganStory = {
  id: "sama",
  judul: "Bilangan sama dan aturan membandingkan",
  sumber: "Buku Siswa hlm. 20; Panduan Guru hlm. 40",
  latar: "#F5F3FF",
  kutipan: [
    "Perhatikan bilangan 4.352 dan 4.352, selanjutnya kita bandingkan nilai tempat",
    "Angka pada nilai tempat ribuan, ratusan, puluhan dan satuan adalah sama.",
    "Jadi, 4.352 sama dengan 4.352.",
    "Dapat ditulis 4.352 = 4.352.",
    "Kalian sudah membandingkan dua bilangan menggunakan notasi",
    "Jadi, untuk membandingkan bilangan empat angka, pertama kita",
    "bandingkan angka pada nilai tempat ribuan. Jika angka pada nilai tempat",
    "ribuan adalah sama, maka kita bandingkan angka pada nilai tempat ratusan.",
    "Untuk membandingkan bilangan empat angka, pertama kita bandingkan",
  ],
  ketukan: [
    k(
      SUARA_S1,
      tambah(0, judul("4.352 dan 4.352")),
      tambah(idx(SUARA_S1, "dua", 1), ...tabelNilai("ta", 14, 52, 4352, 28, 11)),
      tambah(idx(SUARA_S1, "dua", 2), ...tabelNilai("tb", 174, 52, 4352, 28, 11)),
      ubah("semuanya", ...[0, 1, 2, 3].flatMap((c) => [selTabel("ta", c, W.hijauMuda), selTabel("tb", c, W.hijauMuda)])),
    ),
    k(
      SUARA_S2,
      tambah(0, teks("s1", 150, 124, "4.352 = 4.352", 22, W.merah)),
      tambah("Dapat", ...kartu("s2", 40, 144, 220, 30, W.emas, ["tanda = dibaca sama dengan"], 9.6)),
    ),
    k(
      SUARA_S3,
      bersih(0),
      tambah(0, judul("Tiga notasi perbandingan")),
      tambah("lebih", ...kartu("n1", 14, 44, 84, 74, W.merahMuda, [">", "lebih dari"], 12)),
      tambah("kurang", ...kartu("n2", 108, 44, 84, 74, W.langit, ["<", "kurang dari"], 12)),
      tambah("sama", ...kartu("n3", 202, 44, 84, 74, W.hijauMuda, ["=", "sama dengan"], 12)),
    ),
    k(
      SUARA_S4,
      bersih(0),
      tambah(0, judul("Aturan: dari kiri ke kanan")),
      tambah("ribuan", ...kartu("a1", 20, 34, 260, 30, W.merahMuda, ["1. bandingkan ribuan"], 10)),
      tambah("ratusan.", ...kartu("a2", 20, 70, 260, 30, W.jingga, ["2. jika sama, ratusan"], 10)),
      tambah("puluhan.", ...kartu("a3", 20, 106, 260, 30, W.krem, ["3. jika sama, puluhan"], 10)),
      tambah("satuan.", ...kartu("a4", 20, 142, 260, 30, W.hijauMuda, ["4. jika sama pula, satuan"], 10)),
    ),
  ],
};

/* ------------------------------ 8. Ayo Berlatih nomor 1: mana yang lebih besar (Buku Siswa hlm. 20; Panduan Guru hlm. 42) ------------------------------ */
const SUARA_T1 = "Ayo Berlatih nomor satu: bandingkan bilangan berikut dan temukan yang lebih besar. Soal a, lima ribu tujuh ratus tiga puluh empat dan empat ribu tiga ratus dua belas.";
const SUARA_T2 = "Ribuannya lima lawan empat, jadi yang lebih besar adalah lima ribu tujuh ratus tiga puluh empat, sesuai kunci. Soal b: lima ribu enam ratus empat belas dan lima ribu tiga ratus enam puluh delapan.";
const SUARA_T3 = "Ribuannya sama, ratusannya enam lawan tiga, jadi yang lebih besar adalah lima ribu enam ratus empat belas. Soal c: tujuh ribu seratus dua puluh empat dan tujuh ribu seratus sembilan puluh tujuh.";
const SUARA_T4 = "Ribuan dan ratusan sama, puluhannya dua lawan sembilan, jadi tujuh ribu seratus sembilan puluh tujuh lebih besar. Ketiga jawaban ini sama dengan kunci panduan guru.";

/** Dua deret angka (soal a, b, atau c) pada satu bidang: bilangan pertama di y1, kedua di y2, kolom paling kiri di x 108. Huruf soal `${id}h`. */
const LATIH_X0 = 108;
const pasang = (id: string, huruf: string, a: number, b: number, y1: number, y2: number) => [...deret(`${id}a`, LATIH_X0, y1, a, 24, 20), ...deret(`${id}b`, LATIH_X0, y2, b, 24, 20), teks(`${id}h`, 40, (y1 + y2) / 2 + 6, huruf, 14, W.hijau), teks(`${id}c`, 232, y1, fmt(a), 10, W.hijau), teks(`${id}d`, 232, y2, fmt(b), 10, W.hijau)];
/** Tanda centang di baris bilangan yang lebih besar. Id `${id}w`. */
const menang = (id: string, a: number, b: number, y1: number, y2: number) => emo(`${id}w`, 268, a > b ? y1 : y2, "✅", 16);
/** Kotak sorot setinggi dua deret di kolom `c`. */
const sorotPasang = (id: string, c: number, y1: number, y2: number) => kotak(id, LATIH_X0 + c * 24 - 12, y1 - 18, 24, y2 - y1 + 24, W.arsir, W.merah, { rx: 4, tebal: 1.4, z: -1 });
const [A, B, C] = LATIHAN_SATU;

export const ADEGAN_LATIH_SATU: AdeganStory = {
  id: "latih-satu",
  judul: "Ayo Berlatih nomor 1: temukan yang lebih besar",
  sumber: "Buku Siswa hlm. 20; Panduan Guru hlm. 42",
  latar: "#FFF7ED",
  kutipan: [
    "Ayo Berlatih",
    "Salin dan jawablah soal berikut pada buku tulis kalian.",
    "1. Bandingkan bilangan berikut dan temukan yang lebih besar!",
    "a. 5.734 dan 4.312",
    "b. 5.614 dan 5.368",
    "c. 7.124 dan 7.197",
    "a. 5.734 dan 4.312? 5.734",
    "b. 5.614 dan 5.368? 5.614",
    "c. 7.124 dan 7.197? 7.197",
  ],
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Nomor 1: mana yang lebih besar?")),
      tambah(idx(SUARA_T1, "empat", 2), ...pasang("n1", "a.", A.a, A.b, 44, 70)),
      tambah(idx(SUARA_T1, "belas", 1), sorotPasang("n1s", 0, 44, 70)),
    ),
    k(
      SUARA_T2,
      tambah(0, menang("n1", A.a, A.b, 44, 70)),
      tambah("Soal", ...pasang("n2", "b.", B.a, B.b, 100, 126)),
    ),
    k(
      SUARA_T3,
      tambah(0, sorotPasang("n2s", 1, 100, 126)),
      tambah("lebih", menang("n2", B.a, B.b, 100, 126)),
      tambah("Soal", ...pasang("n3", "c.", C.a, C.b, 156, 182)),
    ),
    k(
      SUARA_T4,
      tambah(0, sorotPasang("n3s", 2, 156, 182)),
      tambah(idx(SUARA_T4, "tujuh", 2), menang("n3", C.a, C.b, 156, 182)),
      ubah("Kunci", { id: "jud", isi: "Kunci: 5.734; 5.614; 7.197", warna: W.merah }),
    ),
  ],
};

/* ------------------------------ 9. Ayo Berlatih nomor 2: isi tanda (Buku Siswa hlm. 20-21; Panduan Guru hlm. 42) ------------------------------ */
const SUARA_U1 = "Nomor dua: isi kotak dengan tanda lebih dari, kurang dari, atau sama dengan. Soal a, empat ribu empat ratus tiga puluh lima dan tiga ribu tiga ratus empat puluh lima. Ribuan empat lebih dari tiga, jadi lebih dari.";
const SUARA_U2 = "Soal b: sembilan ribu sembilan ratus sembilan puluh sembilan dan sembilan ribu sembilan ratus sembilan puluh delapan. Tiga angka pertama sama, dan satuan sembilan lebih dari delapan, jadi lebih dari.";
const SUARA_U3 = "Soal c: seribu satu dan seribu dua. Satuan satu kurang dari dua, jadi kurang dari. Soal d: delapan ribu tujuh ratus enam puluh lima dan bilangan yang sama persis, jadi sama dengan.";
const SUARA_U4 = "Soal e: empat ribu lima ratus enam puluh tujuh dan lima ribu tujuh ratus delapan puluh tujuh, ribuan kurang dari. Soal f: tujuh ribu enam ratus lima puluh empat dan tujuh ribu tujuh ratus tujuh puluh tujuh, ratusan kurang dari.";

const YU = [44, 70, 96, 122, 148, 174] as const;
const HURUF = ["a.", "b.", "c.", "d.", "e.", "f."] as const;
/** Satu baris soal nomor 2: huruf `u{i}-l`, bilangan kiri `u{i}-a`, tanda `u{i}-s` (? sampai terisi), bilangan kanan `u{i}-b`. */
const barisU = (i: number) => [teks(`u${i}-l`, 22, YU[i], HURUF[i], 11, W.hijau), teks(`u${i}-a`, 118, YU[i], fmt(LATIHAN_DUA[i].a), 13, W.biru, { anchor: "end" }), teks(`u${i}-s`, 150, YU[i], "?", 14, W.merah), teks(`u${i}-b`, 182, YU[i], fmt(LATIHAN_DUA[i].b), 13, W.biru, { anchor: "start" })];
const isiTanda = (at: string | number, i: number) => ubah(at, { id: `u${i}-s`, isi: LATIHAN_DUA[i].tanda });

export const ADEGAN_LATIH_DUA: AdeganStory = {
  id: "latih-dua",
  judul: "Ayo Berlatih nomor 2: isi tanda perbandingan",
  sumber: "Buku Siswa hlm. 20–21; Panduan Guru hlm. 42",
  latar: "#FEF2F2",
  kutipan: [
    "2. Isilah dengan tanda",
    "pada kotak berikut ini!",
    "4.435",
    "3.345",
    "9.999",
    "9.998",
    "1.001",
    "1.002",
    "8.765",
    "4.567",
    "5.787",
    "7.654",
    "7.777",
    "a. 4.435 > 3.345",
    "b. 9.999 > 9.998",
    "c. 1.001 < 1.002",
    "d. 8.765 = 8.765",
    "e. 4.567 < 5.787",
  ],
  ketukan: [
    k(SUARA_U1, tambah(0, judul("Nomor 2: tanda > < =")), tambah(idx(SUARA_U1, "lima", 2), ...barisU(0)), isiTanda("jadi", 0)),
    k(SUARA_U2, tambah(idx(SUARA_U2, "delapan", 1), ...barisU(1)), isiTanda("jadi", 1)),
    k(SUARA_U3, tambah(idx(SUARA_U3, "dua", 1), ...barisU(2)), isiTanda(idx(SUARA_U3, "jadi", 1), 2), tambah(idx(SUARA_U3, "lima", 1), ...barisU(3)), isiTanda(idx(SUARA_U3, "jadi", 2), 3)),
    k(SUARA_U4, tambah(idx(SUARA_U4, "tujuh", 3), ...barisU(4)), isiTanda(idx(SUARA_U4, "kurang", 1), 4), tambah(idx(SUARA_U4, "tujuh", 8), ...barisU(5)), isiTanda(idx(SUARA_U4, "kurang", 2), 5), sorotkan(idx(SUARA_U4, "kurang", 2), "u5-s")),
  ],
};
