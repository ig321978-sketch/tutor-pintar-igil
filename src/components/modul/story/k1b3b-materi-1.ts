import type { AdeganStory } from "./logika-story";
import { W, ambil, bagan, balonW, emo, judul, kartu, kotak, silang, teks, telur } from "./k1b3b-gambar";
import { bersih, hapus, hitungAksi, idx, k, redamkan, sorotkan, tambah, ubah } from "./k1b3b-bantu";

/* ------------------------------ 1. Cerita di taman ------------------------------ */
const SUARA_C1 = "Pagi ini Malosi, Kira, Upe, dan Wei bermain di taman bersama Igil, si burung hantu. Kira punya sebuah piring.";
const SUARA_C2 = "Di atas piring ada enam telur. Empat telur masih utuh, dan dua telur pecah.";
const SUARA_C3 = "Igil bertanya, berapa telur yang masih utuh kalau dua telur pecah itu diambil dari piring? Bagaimana caramu mengurangkan?";
const SUARA_C4 = "Hari ini kita belajar tiga hal. Pertama, pasangan bilangan. Kedua, hitung mundur. Ketiga, pengurangan di bingkai.";
const SUARA_C5 = "Kita memakai bilangan yang kecil saja. Pelan-pelan, ya. Kalau bingung, kita ulangi lagi, tidak apa-apa.";

const ANAK: [string, number][] = [["Malosi", 40], ["Kira", 95], ["Upe", 150], ["Wei", 205]];
const PIRING = (id: string, y: number) => kotak(id, 14, y, 272, 10, W.krem, W.coklat, { rx: 4, tebal: 1.6 });

export const ADEGAN_CERITA: AdeganStory = {
  id: "cerita-taman",
  judul: "Kira dan telur di taman",
  sumber: "Materi: cerita di taman",
  latar: "#ECFCCB",
  ketukan: [
    k(
      SUARA_C1,
      tambah(0, judul("Di taman bermain"), { id: "tanah", t: "garis", x: 14, y: 142, x2: 272, y2: 0, warna: W.hijau, tebal: 3 }),
      ...ANAK.map(([nama, x]) => tambah(nama, emo(`a-${nama}`, x, 112, "\u{1F9D2}", 30), teks(`n-${nama}`, x, 132, nama, 8.6))),
      tambah("Igil,", emo("a-Igil", 262, 112, "\u{1F989}", 30), teks("n-Igil", 262, 132, "Igil", 8.6, W.ungu)),
      tambah("piring.", kotak("pz", 100, 160, 100, 10, W.krem, W.coklat, { rx: 4, tebal: 1.6 })),
    ),
    k(
      SUARA_C2,
      bersih(0),
      tambah(0, judul("Piring Kira"), PIRING("cpr", 120)),
      tambah("enam", ...[0, 1, 2, 3, 4, 5].map((i) => telur(`cu${i}`, 56 + i * 38, 100, i >= 4, 24))),
      tambah("utuh,", teks("cl1", 113, 150, "4 utuh", 10, W.hijau)),
      tambah("pecah.", teks("cl2", 227, 150, "2 pecah", 10, W.merah)),
    ),
    k(
      SUARA_C3,
      bersih(0),
      tambah(0, judul("Berapa yang utuh?"), emo("ig3", 150, 90, "\u{1F989}", 44)),
      tambah("Bagaimana", ...kartu("cq", 40, 130, 220, 30, W.emas, ["Bagaimana caramu?"], 10)),
    ),
    k(
      SUARA_C4,
      bersih(0),
      tambah(0, judul("Tiga hal hari ini")),
      tambah("Pertama,", ...kartu("h1", 20, 36, 260, 36, W.langit, ["Pasangan bilangan"], 10)),
      tambah("Kedua,", ...kartu("h2", 20, 82, 260, 36, W.hijauMuda, ["Hitung mundur"], 10)),
      tambah("Ketiga,", ...kartu("h3", 20, 128, 260, 36, W.pink, ["Pengurangan di bingkai"], 10)),
    ),
    k(
      SUARA_C5,
      bersih(0),
      tambah(0, judul("Pelan-pelan saja"), emo("kura", 150, 100, "\u{1F422}", 50)),
      tambah(idx(SUARA_C5, "ulangi"), ...kartu("ap", 60, 130, 180, 30, W.krem, ["tidak apa-apa"], 11)),
    ),
  ],
};

/* ------------------------------ 2. Telur utuh dan telur pecah: gabungan dan sebagian ------------------------------ */
const P6 = Array.from({ length: 6 }, (_, i) => ({ x: 36 + i * 46, y: 96 }));
const IDS6 = [0, 1, 2, 3, 4, 5].map((i) => `te${i}`);
const SUARA_T1 = "Ini piring Kira. Satu, dua, tiga, empat, lima, enam. Semuanya ada enam telur.";
const SUARA_T2 = "Empat telur masih utuh. Dua telur pecah, dan kita beri tanda.";
const SUARA_T3 = "Semua telur itu kita sebut gabungan. Gabungan adalah seluruh telur sebelum dipisah.";
const SUARA_T4 = "Empat telur utuh dan dua telur pecah disebut sebagian. Jadi ada dua sebagian.";
const SUARA_T5 = "Kalau empat dan dua digabung, jadinya enam. Enam adalah gabungan, empat dan dua adalah sebagian.";
const SUARA_T6 = "Sekarang dua telur yang pecah kita ambil dari piring. Telur pecah itu pergi dari piring.";
const SUARA_T7 = "Tersisa empat telur yang utuh. Enam dikurangi dua sama dengan empat.";

export const ADEGAN_TELUR: AdeganStory = {
  id: "telur",
  judul: "Telur utuh dan telur pecah",
  sumber: "Materi: gabungan dan sebagian",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Telur Kira"), PIRING("pr", 118), ...P6.map((p, i) => telur(`te${i}`, p.x, p.y))),
      ...hitungAksi(SUARA_T1, "te", P6, "Kira."),
      tambah("Semuanya", teks("tt", 150, 160, "6 telur", 14, W.ungu)),
    ),
    k(
      SUARA_T2,
      hapus(0, "tg", "tt", ...IDS6.map((id) => id.replace("te", "ten"))),
      tambah("Empat", teks("lu", 90, 144, "4 utuh", 10, W.hijau)),
      ubah("pecah,", { id: "te4", isi: "\u{1F373}" }, { id: "te5", isi: "\u{1F373}" }),
      tambah("pecah,", teks("lp", 243, 144, "2 pecah", 10, W.merah)),
    ),
    k(
      SUARA_T3,
      tambah("gabungan.", ...kartu("gb", 20, 34, 260, 22, W.emas, ["gabungan: 6 telur"], 10)),
      sorotkan("sebelum", ...IDS6),
    ),
    k(
      SUARA_T4,
      redamkan(0, ...IDS6),
      tambah("sebagian.", ...kartu("s1", 26, 156, 140, 22, W.hijauMuda, ["sebagian: 4 telur"], 9.6), ...kartu("s2", 174, 156, 100, 22, W.pink, ["sebagian: 2"], 9.6)),
      sorotkan(idx(SUARA_T4, "dua", 2), "s1-k", "s2-k"),
    ),
    k(
      SUARA_T5,
      redamkan(0, "s1-k", "s2-k"),
      tambah("digabung,", teks("tj", 150, 196, "4 dan 2 jadi 6", 13, W.ungu)),
      sorotkan("Enam", "gb-k"),
    ),
    k(
      SUARA_T6,
      tambah("pecah", ...silang("cx4", P6[4].x, P6[4].y, 10), ...silang("cx5", P6[5].x, P6[5].y, 10)),
      ubah("pergi", { id: "te4", op: 0.3 }, { id: "te5", op: 0.3 }),
    ),
    k(SUARA_T7, hapus(0, "tj"), sorotkan("Tersisa", "te0", "te1", "te2", "te3"), tambah("Enam", teks("sk", 150, 196, "6 − 2 = 4", 24, W.hijau))),
  ],
};

/* ------------------------------ 3. Bagan pasangan bilangan ------------------------------ */
const BG = bagan("b", 150, 46, "6", "4", "2");
const SUARA_B1 = "Kita buat bagan untuk telur Kira. Gabungannya enam, jadi enam ada di lingkaran besar.";
const SUARA_B2 = "Dua lingkaran kecil adalah sebagian. Telur utuh ada empat, telur pecah ada dua.";
const SUARA_B3 = "Dari bagan ini kita bisa membaca dua pengurangan. Pertama, enam dikurangi dua sama dengan empat.";
const SUARA_B4 = "Kedua, enam dikurangi empat sama dengan dua. Sekarang yang pergi adalah empat telur utuh.";
const SUARA_B5 = "Satu bagan, dua pengurangan. Gabungan selalu paling besar, dan gabungan disebut lebih dulu.";
const SUARA_B6 = "Ayo ucapkan lagi bersama suara guru. Enam dikurangi dua sama dengan empat. Enam dikurangi empat sama dengan dua.";

export const ADEGAN_BAGAN: AdeganStory = {
  id: "bagan",
  judul: "Bagan pasangan bilangan",
  sumber: "Materi: bagan pasangan bilangan",
  latar: "#F0F9FF",
  ketukan: [
    k(SUARA_B1, tambah(0, judul("Bagan pasangan bilangan")), tambah("Gabungannya", ...ambil(BG, "bwh", "bwh-t")), tambah("lingkaran", teks("gl", 215, 52, "gabungan", 10, W.ungu))),
    k(
      SUARA_B2,
      tambah("lingkaran", ...ambil(BG, "bga", "bpa", "bpa-t")),
      tambah("sebagian.", ...ambil(BG, "bgb", "bpb", "bpb-t")),
      tambah("utuh", teks("lu2", 94, 144, "utuh", 9.4, W.hijau)),
      tambah(idx(SUARA_B2, "pecah", 1), teks("lp2", 206, 144, "pecah", 9.4, W.merah)),
    ),
    k(SUARA_B3, sorotkan(idx(SUARA_B3, "dua", 2), "bpb"), tambah("Pertama,", teks("q1", 150, 192, "6 − 2 = 4", 20, W.hijau))),
    k(
      SUARA_B4,
      redamkan(0, "bpb"),
      ubah(0, { id: "q1", x: 80, u: 15 }),
      tambah("Kedua,", teks("q2", 220, 192, "6 − 4 = 2", 15, W.hijau)),
      sorotkan(idx(SUARA_B4, "empat", 1), "bpa"),
    ),
    k(
      SUARA_B5,
      redamkan(0, "bpa"),
      sorotkan("Gabungan", "bwh"),
      tambah("besar,", ...kartu("gc", 60, 152, 180, 24, W.krem, ["gabungan paling besar"], 10)),
    ),
    k(
      SUARA_B6,
      bersih(0),
      tambah(0, judul("Ucapkan lagi"), emo("uc", 150, 70, "\u{1F4AC}", 40)),
      tambah("Enam", ...kartu("e1", 40, 100, 220, 32, W.hijauMuda, ["6 − 2 = 4"], 16)),
      tambah(idx(SUARA_B6, "enam", 2), ...kartu("e2", 40, 146, 220, 32, W.pink, ["6 − 4 = 2"], 16)),
    ),
  ],
};

/* ------------------------------ 4. Balon dua warna ------------------------------ */
const P7 = Array.from({ length: 7 }, (_, i) => ({ x: 30 + i * 40, y: 90 }));
const IDS_MERAH = [0, 1, 2, 3, 4].map((i) => `bl${i}`);
const IDS_KUNING = [5, 6].map((i) => `bl${i}`);
const talinya = (...ids: string[]) => ids.map((id) => `${id}-x`);
const SUARA_A1 = "Kira punya tujuh balon. Satu, dua, tiga, empat, lima, enam, tujuh. Semua balonnya ada tujuh.";
const SUARA_A2 = "Lima balon berwarna merah. Dua balon berwarna kuning. Lima dan dua adalah sebagian.";
const SUARA_A3 = "Tujuh adalah gabungan. Lima dan dua jika digabung menjadi tujuh.";
const SUARA_A4 = "Dua balon kuning terbang pergi. Tinggal lima balon merah. Tujuh dikurangi dua sama dengan lima.";
const SUARA_A5 = "Sekarang lima balon merah yang pergi. Tinggal dua balon kuning. Tujuh dikurangi lima sama dengan dua.";
const SUARA_A6 = "Lagi, satu bagan dan dua pengurangan. Tujuh dikurangi lima sama dengan dua, dan tujuh dikurangi dua sama dengan lima.";
const BG7 = bagan("c", 150, 40, "7", "5", "2");

export const ADEGAN_BALON: AdeganStory = {
  id: "balon",
  judul: "Balon merah dan balon kuning",
  sumber: "Materi: pasangan bilangan, balon",
  latar: "#FEF2F2",
  ketukan: [
    k(
      SUARA_A1,
      tambah(0, judul("Balon Kira"), ...P7.flatMap((p, i) => balonW(`bl${i}`, p.x, p.y, i < 5 ? "#F87171" : "#FACC15"))),
      ...hitungAksi(SUARA_A1, "bl", P7, "balon."),
    ),
    k(
      SUARA_A2,
      hapus(0, "tg", ...[0, 1, 2, 3, 4, 5, 6].map((i) => `bln${i}`)),
      sorotkan("merah.", ...IDS_MERAH),
      tambah("merah.", teks("lm", 110, 140, "5 merah", 10, W.merah)),
      redamkan("kuning.", ...IDS_MERAH),
      sorotkan("kuning.", ...IDS_KUNING),
      tambah("kuning.", teks("lk", 250, 140, "2 kuning", 10, "#B45309")),
    ),
    k(
      SUARA_A3,
      redamkan(0, ...IDS_KUNING),
      tambah("gabungan.", ...kartu("gb", 20, 32, 260, 22, W.emas, ["gabungan: 7 balon"], 10)),
      tambah(idx(SUARA_A3, "tujuh", 2), teks("g7", 150, 190, "5 dan 2 jadi 7", 14, W.ungu)),
    ),
    k(
      SUARA_A4,
      hapus(0, "g7"),
      tambah("terbang", ...silang("bx5", P7[5].x, P7[5].y, 10), ...silang("bx6", P7[6].x, P7[6].y, 10)),
      ubah("pergi.", ...IDS_KUNING.flatMap((id) => [{ id, op: 0.3 }, { id: `${id}-x`, op: 0.3 }])),
      tambah("Tujuh", teks("s1", 150, 190, "7 − 2 = 5", 20, W.hijau)),
    ),
    k(
      SUARA_A5,
      hapus(0, "bx5a", "bx5b", "bx6a", "bx6b"),
      ubah(0, ...IDS_KUNING.flatMap((id) => [{ id, op: 1 }, { id: `${id}-x`, op: 1 }]), { id: "s1", x: 80, u: 15 }),
      tambah("merah", ...IDS_MERAH.flatMap((id, i) => silang(`bx${i}`, P7[i].x, P7[i].y, 10))),
      ubah("pergi.", ...[...IDS_MERAH, ...talinya(...IDS_MERAH)].map((id) => ({ id, op: 0.3 }))),
      tambah("Tujuh", teks("s2", 220, 190, "7 − 5 = 2", 15, W.hijau)),
    ),
    k(
      SUARA_A6,
      bersih(0),
      tambah(0, judul("Satu bagan, dua pengurangan"), ...BG7),
      tambah("Tujuh", teks("r1", 80, 190, "7 − 5 = 2", 16, W.hijau)),
      tambah(idx(SUARA_A6, "tujuh", 2), teks("r2", 220, 190, "7 − 2 = 5", 16, W.hijau)),
    ),
  ],
};
