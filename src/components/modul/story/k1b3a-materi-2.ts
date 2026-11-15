import type { AdeganStory, Aksi } from "./logika-story";
import { OWL, W, benda, bulat, emo, garis, judul, kartu, kotak, piring, tata, teks, type Titik } from "./k1b3a-gambar";
import { bersih, hapus, hitungAksi, k, sorotkan, tambah, ubah } from "./k1b3a-bantu";

/* ------------------------------ 1. Kue Ibu untuk Upe ------------------------------ */
const SUARA_K1 = "Ibu mempunyai enam kue di atas piring. Ibu ingin berbagi kue dengan Upe. Ayo kita hitung kuenya.";
const SUARA_K2 = "Satu, dua, tiga, empat, lima, enam. Ada enam kue. Itu bilangan mula-mula.";
const SUARA_K3 = "Sekarang Upe ingin makan satu kue. Ketuk satu kue, lalu seret kue itu ke Upe.";
const SUARA_K4 = "Upe memakan kue itu. Kue Ibu berkurang satu, dan sekarang Upe senang sekali.";
const SUARA_K5 = "Sekarang hitung kue yang masih ada di piring. Satu, dua, tiga, empat, lima. Sisa kue Ibu adalah lima.";
const SUARA_K6 = "Kita susun kalimatnya. Enam kurang satu hasilnya lima. Kita membacanya enam dikurangi satu sama dengan lima.";
const KUE = "\u{1F9C1}";
const KP: Titik[] = [{ x: 70, y: 100 }, { x: 100, y: 100 }, { x: 130, y: 100 }, { x: 70, y: 138 }, { x: 100, y: 138 }, { x: 130, y: 138 }];
const kue = (i: number) => emo(`ke${i}`, KP[i].x, KP[i].y, KUE, 24);

export const ADEGAN_KUE: AdeganStory = {
  id: "kue-ibu",
  judul: "Kue Ibu untuk Upe",
  sumber: "Materi: kue Ibu untuk Upe",
  latar: "#FFF1F2",
  ketukan: [
    k(
      SUARA_K1,
      tambah(0, judul("Kue Ibu"), piring("pr", 100, 122, 62, { z: -1 })),
      tambah("enam", ...KP.map((_, i) => kue(i))),
      tambah("Upe.", emo("up", 250, 100, "\u{1F9D2}", 30), teks("nu", 250, 124, "Upe", 9, W.ungu)),
    ),
    k(SUARA_K2, ...hitungAksi(SUARA_K2, "ke", KP)),
    k(
      SUARA_K3,
      hapus(0, "tg", "ken0", "ken1", "ken2", "ken3", "ken4", "ken5"),
      tambah("Ketuk", emo("tg", KP[5].x, KP[5].y + 30, "\u{1F446}", 22)),
      ubah("seret", { id: "ke5", x: 250, y: 158 }, { id: "tg", x: 250, y: 186 }),
    ),
    k(
      SUARA_K4,
      hapus("memakan", "ke5", "tg"),
      tambah("berkurang", ...kartu("br", 60, 30, 180, 24, W.merahMuda, ["Berkurang: 1 kue"], 11)),
      tambah("senang", emo("sn", 250, 158, "\u{1F60B}", 28)),
    ),
    k(
      SUARA_K5,
      hapus(0, "sn"),
      ...hitungAksi(SUARA_K5, "ke", KP.slice(0, 5), "piring."),
      tambah("Sisa", ...kartu("sa", 176, 150, 116, 28, W.langit, ["Sisa: 5 kue"], 11)),
    ),
    k(
      SUARA_K6,
      hapus(0, "tg", "ken0", "ken1", "ken2", "ken3", "ken4", "sa-k", "sa-t0"),
      tambah("Enam", ...kartu("kj", 176, 146, 116, 34, W.emas, ["6 − 1 = 5"], 15)),
      sorotkan("lima.", "ke0", "ke1", "ke2", "ke3", "ke4"),
    ),
  ],
};

/* ------------------------------ 2. Mobil kosong ------------------------------ */
const SUARA_M1 = "Mula-mula ada tiga orang di dalam mobil. Mobilnya sedang berhenti di pinggir jalan.";
const SUARA_M2 = "Kita hitung orang di dalam mobil. Satu, dua, tiga. Mula-mula ada tiga orang.";
const SUARA_M3 = "Sampai di rumah, semua orang turun dari mobil. Ketuk tiap orang, lalu mereka turun satu per satu.";
const SUARA_M4 = "Sekarang tidak ada orang di dalam mobil. Mobilnya kosong. Tidak ada yang tersisa.";
const SUARA_M5 = "Tiga dikurangi tiga hasilnya nol. Nol artinya tidak ada yang tersisa. Tidak ada satu pun yang tinggal di dalam mobil.";
const SUARA_M6 = "Jadi kalau semua benda pergi, sisanya nol. Hebat, kamu sudah mengerti sisa nol sekarang.";
const ORANG = "\u{1F9D1}";
const PO: Titik[] = [{ x: 65, y: 108 }, { x: 105, y: 108 }, { x: 145, y: 108 }];
const orang = (i: number) => emo(`or${i}`, PO[i].x, PO[i].y, ORANG, 28);
const TURUN: Titik[] = [{ x: 212, y: 150 }, { x: 246, y: 150 }, { x: 280, y: 150 }];

export const ADEGAN_MOBIL: AdeganStory = {
  id: "mobil-kosong",
  judul: "Mobil kosong: tiga orang turun",
  sumber: "Materi: mobil kosong",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_M1,
      tambah(
        0,
        judul("Mobil di jalan"),
        garis("jl", 14, 154, 272, 0, W.abu, 3),
        kotak("bs", 30, 62, 160, 70, "#FACC15", W.biru, { rx: 10, tebal: 1.8, z: -1 }),
        bulat("w1", 65, 138, 10, W.biru, W.biru),
        bulat("w2", 155, 138, 10, W.biru, W.biru),
      ),
      tambah("tiga", ...PO.map((_, i) => orang(i))),
    ),
    k(SUARA_M2, ...hitungAksi(SUARA_M2, "or", PO, "mobil.")),
    k(
      SUARA_M3,
      hapus(0, "orn0", "orn1", "orn2", "tg"),
      tambah("Ketuk", emo("tg", PO[0].x, 146, "\u{1F446}", 22)),
      ubah("turun@2", { id: "or0", x: TURUN[0].x, y: TURUN[0].y }, { id: "or1", x: TURUN[1].x, y: TURUN[1].y }, { id: "or2", x: TURUN[2].x, y: TURUN[2].y }),
      hapus("turun@2", "tg"),
    ),
    k(SUARA_M4, sorotkan("kosong.", "bs"), tambah("kosong.", teks("nol", 110, 118, "0", 44, W.merah))),
    k(SUARA_M5, tambah("Tiga", ...kartu("mj", 60, 166, 180, 28, W.emas, ["3 − 3 = 0"], 13))),
    k(SUARA_M6, sorotkan("semua", "or0", "or1", "or2"), tambah("Hebat,", emo("ow", 262, 50, OWL, 30))),
  ],
};

/* ------------------------------ 3. Kupu-kupu terbang ------------------------------ */
const SUARA_Q1 = "Ada enam kupu-kupu di atas bunga. Mereka hinggap sambil mengepakkan sayap. Cantik sekali, ya.";
const SUARA_Q2 = "Ayo kita hitung kupu-kupunya. Satu, dua, tiga, empat, lima, enam. Ada enam kupu-kupu.";
const SUARA_Q3 = "Lalu dua kupu-kupu terbang pergi. Ketuk dua kupu-kupu itu di layar, lalu lihat mereka terbang.";
const SUARA_Q4 = "Sekarang dua kupu-kupu sudah terbang pergi. Jadi kupu-kupu di bunga berkurang dua.";
const SUARA_Q5 = "Sekarang hitung kupu-kupu yang masih ada di bunga. Satu, dua, tiga, empat. Sisanya empat kupu-kupu.";
const SUARA_Q6 = "Enam dikurangi dua sama dengan empat. Cerita kupu-kupu ini kita susun dengan tanda kurang dan sama dengan.";
const PK: Titik[] = [{ x: 90, y: 70 }, { x: 150, y: 70 }, { x: 210, y: 70 }, { x: 90, y: 112 }, { x: 150, y: 112 }, { x: 210, y: 112 }];
const kupu = (i: number) => emo(`kp${i}`, PK[i].x, PK[i].y, "\u{1F98B}", 26);

export const ADEGAN_KUPU: AdeganStory = {
  id: "kupu-terbang",
  judul: "Kupu-kupu di atas bunga",
  sumber: "Materi: kupu-kupu terbang",
  latar: "#FDF4FF",
  ketukan: [
    k(SUARA_Q1, tambah(0, judul("Kupu-kupu di bunga"), emo("bg", 250, 180, "\u{1F33B}", 40)), tambah("enam", ...PK.map((_, i) => kupu(i)))),
    k(SUARA_Q2, ...hitungAksi(SUARA_Q2, "kp", PK, "kupu-kupunya.")),
    k(
      SUARA_Q3,
      hapus(0, "tg", "kpn0", "kpn1", "kpn2", "kpn3", "kpn4", "kpn5"),
      tambah("Ketuk", emo("tg", PK[4].x, PK[4].y + 33, "\u{1F446}", 22)),
      ubah("terbang@2", { id: "kp4", x: 252, y: 44 }, { id: "kp5", x: 282, y: 78 }),
      hapus("terbang@2", "tg"),
    ),
    k(SUARA_Q4, tambah("berkurang", ...kartu("br", 14, 160, 150, 26, W.merahMuda, ["Berkurang: 2 kupu-kupu"], 9.4))),
    k(SUARA_Q5, ...hitungAksi(SUARA_Q5, "kp", PK.slice(0, 4), "bunga."), sorotkan("Sisanya", "kp0", "kp1", "kp2", "kp3")),
    k(SUARA_Q6, hapus(0, "tg", "kpn0", "kpn1", "kpn2", "kpn3", "br-k", "br-t0"), tambah("Enam", ...kartu("kj", 14, 150, 150, 34, W.emas, ["6 − 2 = 4"], 15))),
  ],
};

/* ------------------------------ 4. Kelereng Kira ------------------------------ */
const SUARA_L1 = "Ayo bermain! Kira menaruh lima kelereng di atas piring. Kira ingin memindahkan satu kelereng dari piring.";
const SUARA_L2 = "Sebelum dipindahkan, tebak dulu sisanya. Berapa kelereng yang tinggal di piring? Pilih jawabanmu di layar.";
const SUARA_L3 = "Sekarang kita periksa. Kira memindahkan satu kelereng ke kantong. Ketuk kelerengnya di layar.";
const SUARA_L4 = "Kita hitung kelereng yang tinggal di piring. Satu, dua, tiga, empat. Sisanya empat kelereng.";
const SUARA_L5 = "Tebakanmu tadi tepat atau belum? Empat kelereng tersisa, jadi lima kurang satu sama dengan empat. Kamu hebat!";
const KL: Titik[] = [{ x: 80, y: 95 }, { x: 120, y: 95 }, { x: 70, y: 125 }, { x: 110, y: 130 }, { x: 150, y: 125 }];
const WARNA_KL = ["#38BDF8", "#F472B6", "#A3E635", "#FB923C", "#818CF8"];
const kel = (i: number) => bulat(`kl${i}`, KL[i].x, KL[i].y, 9, WARNA_KL[i], W.biru, { tebal: 2 });
const pilihanKl = ["3", "4", "5"].flatMap((n, i) => [
  kotak(`o${n}-k`, 178 + i * 38, 100, 32, 36, W.krem, W.biru, { rx: 6, tebal: 1.6 }),
  teks(`o${n}-t`, 194 + i * 38, 100 + 18 + 7.7, n, 22, W.merah),
]);

export const ADEGAN_KELERENG: AdeganStory = {
  id: "kelereng-kira",
  judul: "Kelereng Kira di atas piring",
  sumber: "Materi: tebak sisa kelereng",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_L1,
      tambah(0, judul("Kelereng Kira"), piring("pl", 110, 118, 62, { z: -1 })),
      tambah("lima", ...KL.map((_, i) => kel(i))),
      tambah("Kira", teks("nkr", 110, 194, "Kira", 10, W.ungu)),
    ),
    k(SUARA_L2, tambah("Berapa", emo("tn", 232, 66, "❓", 36)), tambah("Pilih", ...pilihanKl)),
    k(
      SUARA_L3,
      hapus(0, "tn", "o3-k", "o3-t", "o4-k", "o4-t", "o5-k", "o5-t"),
      tambah("kantong.", kotak("kt", 200, 70, 90, 60, "#FDE68A", W.coklat, { rx: 8, tebal: 2, z: -1 }), teks("kt-t", 245, 84, "kantong", 9, W.coklat)),
      tambah("Ketuk", emo("tg", KL[4].x, KL[4].y + 33, "\u{1F446}", 22)),
      ubah("kelerengnya", { id: "kl4", x: 245, y: 112 }, { id: "tg", x: 245, y: 146 }),
    ),
    k(SUARA_L4, hapus(0, "tg"), ...hitungAksi(SUARA_L4, "kl", KL.slice(0, 4), "piring.")),
    k(
      SUARA_L5,
      hapus(0, "tg", "kln0", "kln1", "kln2", "kln3"),
      tambah("Empat", ...kartu("kj", 176, 146, 116, 34, W.emas, ["5 − 1 = 4"], 15)),
      sorotkan("hebat!", "kl0", "kl1", "kl2", "kl3"),
    ),
  ],
};

/* ------------------------------ 5. Sisa nol dan tidak ada yang berkurang ------------------------------ */
const SUARA_N1 = "Sekarang kita lihat lima balon. Semua balon itu akan terbang ke langit. Ketuk balonnya satu per satu.";
const SUARA_N2 = "Satu balon terbang. Dua balon terbang. Tiga, empat, lima balon terbang. Semua balon sudah pergi.";
const SUARA_N3 = "Lima dikurangi lima hasilnya nol. Nol artinya tidak ada yang tersisa. Tidak ada balon yang tinggal sama sekali.";
const SUARA_N4 = "Sekarang tujuh balon di awan. Tidak ada balon yang terbang. Tidak ada yang berkurang.";
const SUARA_N5 = "Tujuh dikurangi nol hasilnya tujuh. Kalau tidak ada yang pergi, sisanya tetap sama seperti mula-mula.";
const SUARA_N6 = "Ingat, sisa nol artinya semua pergi. Tidak berkurang artinya sisanya sama dengan mula-mula. Hebat sekali.";
const P5 = tata(5, 96);
const balon5 = (i: number) => benda("balon", `bn${i}`, P5[i].x, P5[i].y, 12, i);
const P7 = tata(7);
const balon7 = (i: number) => benda("balon", `bm${i}`, P7[i].x, P7[i].y, 12, i);
/** Balon ke-i terbang (hilang) pada kata nomor `at`, penghitung sisa `sn` berganti. */
const terbang = (at: number, i: number, sisa: string): Aksi[] => [{ at, hapus: [`bn${i}`, `bn${i}-x`] }, ubah(at, { id: "sn", isi: sisa })];

export const ADEGAN_SISA_NOL: AdeganStory = {
  id: "sisa-nol",
  judul: "Sisa nol dan tidak ada yang berkurang",
  sumber: "Materi: sisa nol dan tidak berkurang",
  latar: "#F0FDFA",
  ketukan: [
    k(SUARA_N1, tambah(0, judul("Lima balon"), teks("sn", 150, 170, "5", 30, W.merah)), tambah("lima", ...[0, 1, 2, 3, 4].flatMap(balon5)), tambah("Ketuk", emo("tg", P5[4].x, P5[4].y + 40, "\u{1F446}", 22))),
    k(
      SUARA_N2,
      hapus(0, "tg"),
      ...terbang(0, 4, "4"),
      ...terbang(3, 3, "3"),
      ...terbang(6, 2, "2"),
      ...terbang(7, 1, "1"),
      ...terbang(8, 0, "0"),
    ),
    k(SUARA_N3, tambah("Lima", ...kartu("nj", 70, 40, 160, 32, W.emas, ["5 − 5 = 0"], 14)), sorotkan("tersisa.", "sn")),
    k(SUARA_N4, bersih(0), tambah(0, judul("Tidak ada yang pergi")), tambah("tujuh", ...[0, 1, 2, 3, 4, 5, 6].flatMap(balon7))),
    k(SUARA_N5, tambah("Tujuh", ...kartu("nk", 70, 168, 160, 30, W.emas, ["7 − 0 = 7"], 14))),
    k(
      SUARA_N6,
      bersih(0),
      tambah(0, judul("Dua hal penting"), emo("ow", 262, 190, OWL, 26)),
      tambah("nol", ...kartu("i1", 20, 40, 260, 40, W.merahMuda, ["semua pergi, sisanya nol"], 10.5)),
      tambah("berkurang", ...kartu("i2", 20, 96, 260, 40, W.hijauMuda, ["tidak pergi, sisanya sama"], 10.5)),
    ),
  ],
};
