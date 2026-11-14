import type { AdeganStory, Aksi } from "./logika-story";
import { W, emo, garis, kartu, kotak, panah, teks, judul } from "./k5b2a-gambar";
import { bersih, k, redamkan, sebar, sorotkan, tambah, ubah } from "./k5b2a-bantu";

/* ------------------------------ 1. Pembuka bab: tujuan (Buku Siswa hlm. 29; Panduan Guru hlm. 43) ------------------------------ */
const TOPIK = ["kelipatan", "kelipatan persekutuan", "KPK", "faktor", "faktor persekutuan", "FPB", "aplikasi KPK dan FPB", "bilangan prima"];
const WARNA_TOPIK = [W.hijauMuda, W.langit, W.krem, W.pink, W.jingga, W.hijauMuda, W.langit, W.krem];
const chipTopik = (i: number) => kartu(`tp${i}`, 8 + (i % 2) * 146, 36 + Math.floor(i / 2) * 38, 138, 28, WARNA_TOPIK[i], [TOPIK[i]], 9);
const GRUP = [
  "2.1–2.3 kelipatan, persekutuan, KPK",
  "2.4–2.6 faktor, persekutuan, FPB",
  "2.7–2.10 prima, faktor prima, KPK dan FPB",
  "2.11–2.13 masalah, kesimpulan, evaluasi",
];
const WARNA_GRUP = [W.hijauMuda, W.langit, W.krem, W.pink];

const SUARA_P1 =
  "Selamat datang di bab dua, KPK dan FPB. Pada bab ini kalian akan belajar tentang kelipatan, kelipatan persekutuan, kelipatan persekutuan terkecil, faktor, faktor persekutuan, faktor persekutuan terbesar, aplikasi, dan juga bilangan prima.";

export const ADEGAN_PEMBUKA: AdeganStory = {
  id: "pembuka-bab",
  judul: "Pembuka Bab 2: tujuan pembelajaran",
  sumber: "Buku Siswa hlm. 29; Panduan Guru hlm. 43–44",
  latar: "#FFF7ED",
  kutipan: [
    "Pada bab ini kalian akan diajak untuk belajar tentang kelipatan,",
    "faktor persekutuan terbesar (FPB), aplikasi dari KPK dan FPB, dan juga bilangan prima.",
    "Setelah mempelajari bab ini, peserta didik diharapkan dapat",
    "2.1 menentukan kelipatan bilangan,",
    "2.2 menentukan kelipatan persekutuan dua bilangan atau lebih,",
    "2.4 menentukan faktor suatu bilangan,",
    "2.11 menyelesaikan masalah yang berkaitan dengan KPK dan FPB,",
    "Pada bab ini, materi dikemas berbasis aktivitas, termasuk melibatkan beberapa permainan.",
  ],
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Bab 2: KPK dan FPB")),
      tambah("kelipatan@1", chipTopik(0)),
      tambah("kelipatan@2", chipTopik(1)),
      tambah("terkecil,", chipTopik(2)),
      tambah("faktor@1", chipTopik(3)),
      tambah("faktor@2", chipTopik(4)),
      tambah("terbesar,", chipTopik(5)),
      tambah("aplikasi,", chipTopik(6)),
      tambah("prima.", chipTopik(7)),
    ),
    k(
      "Buku panduan guru merinci tiga belas tujuan dalam empat kelompok. Pertama, kelipatan, kelipatan persekutuan, dan KPK. Kedua, faktor, faktor persekutuan, dan FPB. Ketiga, bilangan prima, faktor prima, serta KPK dan FPB dengan bilangan prima. Keempat, masalah, kesimpulan, dan evaluasi.",
      bersih(0),
      tambah(0, judul("Tiga belas tujuan (Panduan Guru)")),
      tambah("Pertama,", ...kartu("g0", 14, 32, 272, 30, WARNA_GRUP[0], [GRUP[0]], 8.8)),
      tambah("Kedua,", ...kartu("g1", 14, 70, 272, 30, WARNA_GRUP[1], [GRUP[1]], 8.8)),
      tambah("Ketiga,", ...kartu("g2", 14, 108, 272, 30, WARNA_GRUP[2], [GRUP[2]], 8.8)),
      tambah("Keempat,", ...kartu("g3", 14, 146, 272, 30, WARNA_GRUP[3], [GRUP[3]], 8.8)),
    ),
    k(
      "Di subbab A kita hanya mengerjakan tujuan pertama, yaitu menentukan kelipatan bilangan. Tujuan yang lain menunggu giliran di subbab berikutnya.",
      sorotkan("hanya", "g0-k"),
      ubah("lain", { id: "g1-k", op: 0.35 }, { id: "g1-t0", op: 0.35 }, { id: "g2-k", op: 0.35 }, { id: "g2-t0", op: 0.35 }, { id: "g3-k", op: 0.35 }, { id: "g3-t0", op: 0.35 }),
    ),
    k(
      "Panduan guru juga menjelaskan, bab ini dikemas berbasis aktivitas dan permainan, supaya peserta didik belajar dengan nyaman dan senang.",
      bersih(0),
      tambah(0, judul("Belajar lewat permainan")),
      tambah("aktivitas", emo("dd", 70, 100, "🎲", 40)),
      tambah("permainan,", emo("ts", 150, 100, "👏", 40)),
      tambah("nyaman", emo("sn", 230, 100, "😊", 40)),
      tambah("senang.", ...kartu("gm", 50, 130, 200, 34, W.emas, ["kelipatan lewat tepuk"], 10)),
    ),
  ],
};

/* ------------------------------ 2. Peta konsep, kata kunci, dan skema (Buku Siswa hlm. 30; Panduan Guru hlm. 44 dan 46) ------------------------------ */
export const KOLOM_PETA = [8, 104, 200];
const peta = (id: string, kol: number, y: number, h: number, warna: string, baris: string[]) => kartu(id, KOLOM_PETA[kol], y, 92, h, warna, baris, 8);
const KATA_KUNCI = ["kelipatan", "kelipatan persekutuan", "KPK", "faktor", "faktor persekutuan", "FPB", "bilangan prima", "saringan Eratosthenes"];
const chipKunci = (i: number) => kartu(`kk${i}`, 8 + (i % 2) * 146, 36 + Math.floor(i / 2) * 38, 138, 28, WARNA_TOPIK[i], [KATA_KUNCI[i]], 9);
/** Waktu tiap subbab (jam pelajaran) menurut Tabel 2.1 Panduan Guru hlm. 46. */
export const JP_SUBBAB = [
  { h: "A", nama: ["Kelipatan"], jp: 2, w: W.hijauMuda },
  { h: "B", nama: ["Kelipatan Persekutuan"], jp: 6, w: W.langit },
  { h: "C", nama: ["Faktor"], jp: 2, w: W.krem },
  { h: "D", nama: ["Faktor Persekutuan"], jp: 6, w: W.pink },
  { h: "E", nama: ["KPK dan FPB", "dengan faktor prima"], jp: 8, w: W.jingga },
];
export const SKALA_JP = 18;
const SUARA_KUNCI = "Kata kunci bab ini ada delapan: kelipatan, kelipatan persekutuan, KPK, faktor, faktor persekutuan, FPB, bilangan prima, dan saringan Eratosthenes.";
const barJP = (i: number) => {
  const s = JP_SUBBAB[i];
  const y = 30 + i * 32;
  const w = s.jp * SKALA_JP;
  return [
    teks(`sh${i}`, 30, y + 16, s.h, 11, W.biru),
    kotak(`sb${i}`, 52, y, w, 22, s.w, W.biru, { rx: 4 }),
    teks(`sj${i}`, 52 + w / 2, y + 15, `${s.jp} JP`, 8.6, W.biru),
    ...s.nama.map((n, j) => teks(`sn${i}-${j}`, 52 + w + 5, y + (s.nama.length === 1 ? 15 : 10 + j * 10), n, 7.6, W.biru, { anchor: "start" as const })),
  ];
};

export const ADEGAN_PETA: AdeganStory = {
  id: "peta-konsep",
  judul: "Peta konsep, kata kunci, dan skema lima subbab",
  sumber: "Buku Siswa hlm. 30; Panduan Guru hlm. 44, 46",
  latar: "#F5F3FF",
  kutipan: [
    "Peta Konsep",
    "Kata Kunci",
    "Kelipatan, kelipatan persekutuan, kelipatan persekutuan terkecil (KPK), faktor, faktor persekutuan, faktor persekutuan terbesar (FPB),",
    "Peserta didik SD kelas V pada dasarnya masih menyukai kegiatan yang melibatkan permainan.",
    "Tabel 2.1 Skema Pembelajaran Bab 2",
    "A. Kelipatan",
    "Menentukan kelipatan bilangan.",
  ],
  ketukan: [
    k(
      "Peta konsep bab ini bercabang tiga dari KPK dan FPB, yaitu kelipatan, faktor, dan bilangan prima.",
      tambah(0, judul("Peta konsep Bab 2")),
      tambah("Peta", ...kartu("pr", 90, 28, 120, 24, W.emas, ["KPK dan FPB"], 9.6)),
      tambah("kelipatan,", ...peta("pa", 0, 62, 24, W.hijauMuda, ["Kelipatan"]), garis("ca", 150, 52, -96, 10, W.biru, 1.4)),
      tambah("faktor,", ...peta("pb", 1, 62, 24, W.langit, ["Faktor"]), garis("cb", 150, 52, 0, 10, W.biru, 1.4)),
      tambah("prima.", ...peta("pc", 2, 62, 24, W.pink, ["Bilangan Prima"]), garis("cc", 150, 52, 96, 10, W.biru, 1.4)),
    ),
    k(
      "Cabang kelipatan berlanjut ke kelipatan persekutuan, lalu kelipatan persekutuan terkecil atau KPK, dan berakhir di aplikasi KPK.",
      sorotkan(0, "pa-k"),
      tambah("persekutuan@1", ...peta("pa2", 0, 92, 28, W.hijauMuda, ["Kelipatan", "Persekutuan"])),
      tambah("terkecil", ...peta("pa3", 0, 124, 24, W.hijauMuda, ["KPK"])),
      tambah("aplikasi", ...peta("pa4", 0, 152, 24, W.hijauMuda, ["Aplikasi KPK"])),
    ),
    k(
      "Cabang faktor berlanjut ke faktor persekutuan, lalu faktor persekutuan terbesar atau FPB, dan berakhir di aplikasi FPB.",
      redamkan(0, "pa-k"),
      sorotkan(0, "pb-k"),
      tambah("persekutuan@1", ...peta("pb2", 1, 92, 28, W.langit, ["Faktor", "Persekutuan"])),
      tambah("terbesar", ...peta("pb3", 1, 124, 24, W.langit, ["FPB"])),
      tambah("aplikasi", ...peta("pb4", 1, 152, 24, W.langit, ["Aplikasi FPB"])),
    ),
    k(
      "Cabang bilangan prima berlanjut ke faktorisasi prima, lalu menentukan KPK dan FPB dengan faktorisasi prima.",
      redamkan(0, "pb-k"),
      sorotkan(0, "pc-k"),
      tambah("faktorisasi@1", ...peta("pc2", 2, 92, 28, W.pink, ["Faktorisasi", "Prima"])),
      tambah("menentukan", ...peta("pc3", 2, 124, 28, W.pink, ["KPK dan FPB dengan", "faktorisasi prima"])),
    ),
    k(
      SUARA_KUNCI,
      bersih(0),
      tambah(0, judul("Kata kunci")),
      ...KATA_KUNCI.map((_, i) => tambah(sebar(SUARA_KUNCI, 8, 5)[i], chipKunci(i))),
    ),
    k(
      "Skema pembelajaran di panduan guru membagi waktu: subbab A dua jam pelajaran, B enam, C dua, D enam, dan E delapan, jadi dua puluh empat jam pelajaran.",
      bersih(0),
      tambah(0, judul("Skema waktu (JP)")),
      tambah(9, barJP(0)),
      tambah(13, barJP(1)),
      tambah(15, barJP(2)),
      tambah(17, barJP(3)),
      tambah(20, barJP(4)),
      tambah(21, teks("tot", 150, 196, "Total 24 JP", 9.6, W.merah)),
    ),
  ],
};

/* ------------------------------ 3. Latihan Renang (Buku Siswa hlm. 31; Panduan Guru hlm. 48) ------------------------------ */
export const ADEGAN_RENANG: AdeganStory = {
  id: "latihan-renang",
  judul: "Latihan Renang: cerita pembuka bab",
  sumber: "Buku Siswa hlm. 31; Panduan Guru hlm. 48",
  latar: "#E0F2FE",
  kutipan: [
    "Nisa dan Yohana latihan berenang di tempat yang sama.",
    "Nisa berlatih",
    "Hari ini, tanggal 3 Agustus, Nisa dan Yohana latihan renang bersama-sama.",
    "Kapan mereka akan latihan renang bersama kembali?",
    "Masalah terkait jadwal latihan renang Nisa dan Yohana dapat kita selesaikan dengan menggunakan KPK.",
    "Perkenalkan bab ini dengan menyimak cerita tentang jadwal latihan renang",
  ],
  ketukan: [
    k(
      "Bab ini dibuka dengan cerita Latihan Renang. Nisa dan Yohana berlatih berenang di tempat yang sama.",
      tambah(0, judul("Latihan Renang")),
      tambah("Nisa", emo("sn", 90, 92, "🏊", 42), teks("snt", 90, 122, "Nisa", 10, W.biru)),
      tambah("Yohana", emo("sy", 210, 92, "🏊", 42), teks("syt", 210, 122, "Yohana", 10, W.merah)),
      tambah("tempat", teks("tmp", 150, 168, "di tempat yang sama", 10, W.hijau)),
    ),
    k(
      "Nisa berlatih setiap tiga hari sekali, dan Yohana berlatih setiap empat hari sekali.",
      bersih(0),
      tambah(0, judul("Jadwal latihan")),
      tambah("tiga", ...kartu("jn", 14, 60, 128, 64, W.langit, ["Nisa", "3 hari sekali"], 10)),
      tambah("empat", ...kartu("jy", 158, 60, 128, 64, W.merahMuda, ["Yohana", "4 hari sekali"], 10)),
    ),
    k(
      "Hari ini, tanggal tiga Agustus, Nisa dan Yohana berlatih bersama-sama.",
      bersih(0),
      tambah(0, judul("Hari ini")),
      tambah("Hari", emo("kal", 150, 84, "📅", 44)),
      tambah("tiga", ...kartu("tg", 80, 104, 140, 30, W.emas, ["3 Agustus"], 11)),
      tambah("bersama-sama.", ...kartu("bs", 30, 146, 240, 30, W.hijauMuda, ["Nisa dan Yohana latihan bersama"], 9.4)),
    ),
    k(
      "Pertanyaannya, kapan mereka akan latihan renang bersama kembali?",
      bersih(0),
      tambah(0, judul("Pertanyaan")),
      tambah("Pertanyaannya,", teks("tn", 150, 112, "?", 70, W.merah)),
      tambah("kapan", ...kartu("kp", 30, 140, 240, 34, W.krem, ["Kapan latihan bersama lagi?"], 10)),
    ),
    k(
      "Menurut buku, masalah jadwal ini dapat diselesaikan dengan KPK. Panduan guru meminta kita belajar kelipatan dan kelipatan persekutuan dulu, jadi jawabannya kita tunggu di subbab berikutnya.",
      bersih(0),
      tambah(0, judul("Jawabannya menunggu")),
      tambah("jadwal", ...kartu("w1", 8, 70, 84, 40, W.langit, ["jadwal", "renang"], 9)),
      tambah("KPK.", panah("pw1", 94, 90, 18, 0, W.biru, 2), ...kartu("w2", 116, 70, 68, 40, W.emas, ["KPK"], 11)),
      tambah("kelipatan", panah("pw2", 186, 90, 18, 0, W.biru, 2), ...kartu("w3", 208, 70, 84, 40, W.hijauMuda, ["belajar", "kelipatan dulu"], 8.4)),
    ),
  ],
};

/* ------------------------------ 4. Ayo Mengingat Kembali (Buku Siswa hlm. 32; Panduan Guru hlm. 48) ------------------------------ */
const SOAL_INGAT = ["1. kelipatan 2", "2. kelipatan 4", "3. kelipatan 6", "4. faktor dari 6", "5. faktor dari 10"];
const SUARA_I1 = "Sebelum mulai, ayo mengingat kembali. Di kelas sebelumnya kalian sudah belajar tentang kelipatan dan faktor. Ada lima pertanyaan.";
/** Label baris angka di kiri. Id `${id}-l`. */
export const labelBaris = (id: string, y: number, label: string) => teks(`${id}-l`, 8, y + 16, label, 9, W.biru, { anchor: "start" as const });
/** Satu kotak angka dalam baris. Id `${id}-b{i}` (kotak) dan `${id}-a{i}` (angka). */
export const selAngka = (id: string, y: number, i: number, a: number, warna: string = W.krem) => [kotak(`${id}-b${i}`, 88 + i * 42, y, 36, 24, warna, W.biru, { rx: 5 }), teks(`${id}-a${i}`, 106 + i * 42, y + 16, String(a), 10, W.biru)];
/** Satu baris kotak angka yang muncul satu demi satu mengikuti kata dalam kalimat `suara`. */
const rentetan = (id: string, y: number, label: string, angka: number[], warna: string, suara: string, dari: number): Aksi[] => {
  const pos = sebar(suara, angka.length, dari);
  return angka.map((a, i) => tambah(pos[i], ...(i === 0 ? [labelBaris(id, y, label)] : []), ...selAngka(id, y, i, a, warna)));
};
const SUARA_I2 = "Kelipatan dua adalah dua, empat, enam, delapan, sepuluh. Kelipatan empat adalah empat, delapan, dua belas, enam belas, dua puluh.";
const SUARA_I3 = "Nomor tiga: kelipatan enam adalah enam, dua belas, delapan belas, dua puluh empat, tiga puluh.";
const SUARA_I4 = "Faktor dari enam adalah satu, dua, tiga, dan enam, karena satu kali enam dan dua kali tiga sama dengan enam.";
const SUARA_I5 = "Faktor dari sepuluh adalah satu, dua, lima, dan sepuluh, karena satu kali sepuluh dan dua kali lima sama dengan sepuluh.";

export const ADEGAN_INGAT: AdeganStory = {
  id: "mengingat-kembali",
  judul: "Ayo Mengingat Kembali: kelipatan dan faktor kelas sebelumnya",
  sumber: "Buku Siswa hlm. 32; Panduan Guru hlm. 48",
  latar: "#FFF1F2",
  kutipan: [
    "Ayo Mengingat Kembali",
    "Di kelas sebelumnya, kalian sudah belajar tentang kelipatan dan faktor.",
    "1. Sebutkan bilangan kelipatan 2.",
    "2. Sebutkan bilangan kelipatan 4.",
    "3. Sebutkan bilangan kelipatan 6.",
    "4. Tuliskan semua faktor dari 6.",
    "5. Tuliskan semua faktor dari 10.",
    "Mintalah peserta didik untuk mencoba mengerjakan bagian Ayo Mengingat Kembali.",
  ],
  ketukan: [
    k(
      SUARA_I1,
      tambah(0, judul("Ayo Mengingat Kembali")),
      ...SOAL_INGAT.map((s, i) => tambah(sebar(SUARA_I1, 5, 10)[i], ...kartu(`si${i}`, 40, 30 + i * 31, 220, 24, i < 3 ? W.hijauMuda : W.langit, [s], 9.4))),
    ),
    k(
      SUARA_I2,
      bersih(0),
      tambah(0, judul("Kelipatan 2 dan kelipatan 4")),
      ...rentetan("k2", 52, "Kelipatan 2:", [2, 4, 6, 8, 10], W.krem, SUARA_I2, 3),
      ...rentetan("k4", 112, "Kelipatan 4:", [4, 8, 12, 16, 20], W.langit, SUARA_I2, 13),
    ),
    k(
      SUARA_I3,
      bersih(0),
      tambah(0, judul("Kelipatan 6")),
      ...rentetan("k6", 82, "Kelipatan 6:", [6, 12, 18, 24, 30], W.pink, SUARA_I3, 5),
    ),
    k(
      SUARA_I4,
      bersih(0),
      tambah(0, judul("Faktor dari 6")),
      tambah("satu,", ...kartu("f6a", 20, 40, 120, 32, W.krem, ["1 × 6 = 6"], 10.4)),
      tambah("kali@2", ...kartu("f6b", 160, 40, 120, 32, W.krem, ["2 × 3 = 6"], 10.4)),
      ...[1, 2, 3, 6].map((a, i) => tambah(sebar(SUARA_I4, 4, 4)[i], ...kartu(`fa${i}`, 20 + i * 66, 100, 54, 34, W.hijauMuda, [String(a)], 12))),
      tambah("enam.", teks("fs", 150, 164, "faktor dari 6", 10, W.ungu)),
    ),
    k(
      SUARA_I5,
      bersih(0),
      tambah(0, judul("Faktor dari 10")),
      tambah("satu,", ...kartu("g10a", 20, 40, 120, 32, W.krem, ["1 × 10 = 10"], 10.4)),
      tambah("kali@2", ...kartu("g10b", 160, 40, 120, 32, W.krem, ["2 × 5 = 10"], 10.4)),
      ...[1, 2, 5, 10].map((a, i) => tambah(sebar(SUARA_I5, 4, 4)[i], ...kartu(`fb${i}`, 20 + i * 66, 100, 54, 34, W.pink, [String(a)], 12))),
      tambah("sepuluh.", teks("fs2", 150, 164, "faktor dari 10", 10, W.ungu)),
    ),
    k(
      "Buku tidak memberi kunci untuk lima pertanyaan ini, jadi jawaban tadi adalah hitungan mandiri kita.",
      bersih(0),
      tambah(0, judul("Tentang kunci")),
      tambah("tidak", emo("kc", 150, 90, "🧮", 44)),
      tambah("kunci", ...kartu("kn", 40, 112, 220, 28, W.merahMuda, ["buku: tanpa kunci"], 9.6)),
      tambah("hitungan", ...kartu("hm", 40, 148, 220, 28, W.hijauMuda, ["jawaban: hitungan mandiri"], 9.6)),
    ),
  ],
};

