import type { AdeganStory } from "./logika-story";
import { W, emo, judul, kartu, kartuAngka, lidi, poli, roket, segiEmpat, segitigaSama, siku, teks } from "./k1b4c-gambar";
import { bersih, hapus, idx, k, rangkai, redamkan, sorotkan, tambah, tandaiSatuSatu, ubah } from "./k1b4c-bantu";

const ANAK = "\u{1F9D2}";
const IGIL = "\u{1F989}";
const MERAH = "#F87171";
const BIRU = "#60A5FA";

/* ------------------------------ 1. Susun roket di layar ------------------------------ */
const SUARA_M1 = "Sekarang giliranmu di layar. Kita susun sebuah roket dari lima keping. Keping-keping itu masih berserakan.";
const SUARA_M2 = "Ketuk keping segi empat, lalu seret ke tengah untuk menjadi badan roket.";
const SUARA_M3 = "Pasang tiga segitiga: satu untuk hidung, dan dua untuk sirip kanan dan kiri.";
const SUARA_M4 = "Terakhir, pasang bentuk lengkung sebagai jendela roket.";
const SUARA_M5 = "Roket sudah jadi! Ada satu segi empat, tiga segitiga, dan satu bentuk lengkung. Semuanya lima keping.";
const SEBAR: Record<string, { x: number; y: number }> = { rk0: { x: 24, y: 70 }, rk1: { x: 224, y: 56 }, rk2: { x: 70, y: 150 }, rk3: { x: 228, y: 142 }, rk4: { x: 150, y: 176 } };
const PAS: Record<string, { x: number; y: number }> = { rk0: { x: 130, y: 80 }, rk1: { x: 130, y: 50 }, rk2: { x: 106, y: 120 }, rk3: { x: 170, y: 120 }, rk4: { x: 150, y: 102 } };
const pindah = (...id: string[]) => id.map((i) => ({ id: i, x: PAS[i].x, y: PAS[i].y }));

export const ADEGAN_SUSUN: AdeganStory = {
  id: "susun-layar",
  judul: "Menyusun roket di layar",
  sumber: "Materi: menyusun roket di layar",
  latar: "#ECFEFF",
  ketukan: [
    k(SUARA_M1, bersih(0), tambah(0, judul("Susun roket di layar")), tambah("roket", ...roket().map((o) => ({ ...o, ...SEBAR[o.id] })))),
    k(SUARA_M2, sorotkan("Ketuk", "rk0"), redamkan("seret", "rk0"), ubah("seret", ...pindah("rk0"))),
    k(
      SUARA_M3,
      sorotkan("Pasang", "rk1", "rk2", "rk3"),
      ubah("hidung,", ...pindah("rk1")),
      ubah("sirip", ...pindah("rk2", "rk3")),
      redamkan("kiri.", "rk1", "rk2", "rk3"),
    ),
    k(SUARA_M4, sorotkan("lengkung", "rk4"), ubah("jendela", ...pindah("rk4")), redamkan("roket.", "rk4")),
    k(SUARA_M5, tambah("Roket", emo("ok", 252, 90, "\u{2705}", 26)), tambah("Semuanya", ...kartu("rj", 200, 154, 90, 30, W.emas, ["1 + 3 + 1 = 5"], 11))),
  ],
};

/* ------------------------------ 2. Pas atau tidak: pilih potongan ------------------------------ */
const SUARA_N1 = "Sekarang ada bangun yang kurang satu potongan. Lihat atap rumah ini, atapnya masih berlubang.";
const SUARA_N2 = "Ada tiga potongan. Potongan pertama berbentuk segitiga yang sama besar. Potongan kedua segitiga yang terlalu kecil. Potongan ketiga berbentuk segi empat.";
const SUARA_N3 = "Atap segitiga punya tiga sisi lurus. Hanya potongan pertama yang pas. Ketuk potongan pertama.";
const SUARA_N4 = "Pas! Potongan pertama kita pasang di atap. Atap rumahnya sudah lengkap.";
const CALON = (i: number) => kartu(`c${i}`, 140, 30 + 52 * i, 150, 46, W.putih, [["pertama", "kedua", "ketiga"][i]], 10);

export const ADEGAN_PAS: AdeganStory = {
  id: "pas-potongan",
  judul: "Pas atau tidak?",
  sumber: "Materi: memilih potongan yang pas",
  latar: "#F7FEE7",
  ketukan: [
    k(
      SUARA_N1,
      bersih(0),
      tambah(0, judul("Pas atau tidak?")),
      tambah("bangun", segiEmpat("pw", 20, 96, 64, 50, W.krem)),
      tambah("atapnya", poli("ps", 20, 64, [[32, 0], [64, 32], [0, 32]], "none", { putus: true, tebal: 2 })),
      sorotkan("berlubang.", "ps"),
    ),
    k(
      SUARA_N2,
      redamkan(0, "ps"),
      tambah("pertama", ...CALON(0), segitigaSama("pc0", 168, 37, 64, 32, W.segitiga)),
      tambah("kedua", ...CALON(1), segitigaSama("pc1", 176, 102, 40, 20, W.segitiga)),
      tambah("ketiga", ...CALON(2), segiEmpat("pc2", 168, 141, 64, 32, W.segiEmpat)),
    ),
    k(SUARA_N3, tambah("tiga", teks("sl", 52, 168, "3 sisi lurus", 8.4, W.merah)), sorotkan("Ketuk", "c0-k")),
    k(
      SUARA_N4,
      redamkan(0, "c0-k"),
      ubah("pasang", { id: "pc0", x: 20, y: 64 }),
      ubah(0, { id: "pc1", op: 0.25 }, { id: "pc2", op: 0.25 }, { id: "c1-k", op: 0.25 }, { id: "c1-t0", op: 0.25 }, { id: "c2-k", op: 0.25 }, { id: "c2-t0", op: 0.25 }),
      tambah("Pas!", emo("ok", 112, 90, "\u{2705}", 26)),
      hapus("lengkap.", "ps", "sl"),
    ),
  ],
};

/* ------------------------------ 3. Latihan 1: dua segitiga digabung ------------------------------ */
const SUARA_P1 = "Latihan satu. Wei punya dua segitiga yang sama. Kalau dirapatkan pada sisi yang miring, bentuk apa yang muncul?";
const SUARA_P2 = "Pilihan jawabannya ada tiga: segitiga, segi empat, atau bentuk lengkung. Ketuk jawaban yang kamu pilih.";
const SUARA_P3 = "Betul! Dua segitiga yang dirapatkan pada sisi yang miring menjadi segi empat.";
const SUARA_P4 = "Sekarang coba dengan dua persegi yang sama. Kalau dirapatkan, hasilnya persegi panjang. Hebat!";
const JAWAB = (i: number, isi: string) => kartu(`a${i}`, 10 + 97 * i, 112, 86, 30, W.langit, [isi], 9.4);

export const ADEGAN_LATIHAN_SATU: AdeganStory = {
  id: "latihan-satu",
  judul: "Latihan 1: dua segitiga",
  sumber: "Materi: latihan dua segitiga",
  latar: "#FFF1F2",
  ketukan: [
    k(
      SUARA_P1,
      bersih(0),
      tambah(0, judul("Latihan 1")),
      tambah("Wei", emo("a-Wei", 150, 164, ANAK, 26), teks("n-Wei", 150, 180, "Wei", 8.4)),
      tambah("dua", siku("sa", 50, 46, 40, 50, "kiriBawah", MERAH), siku("sc", 210, 46, 40, 50, "kananAtas", BIRU)),
    ),
    k(
      SUARA_P2,
      tambah("segitiga,", ...JAWAB(0, "segitiga")),
      tambah("empat,", ...JAWAB(1, "segi empat")),
      tambah("lengkung.", ...JAWAB(2, "lengkung")),
      sorotkan("Ketuk", "a0-k", "a1-k", "a2-k"),
    ),
    k(
      SUARA_P3,
      redamkan(0, "a0-k", "a1-k", "a2-k"),
      ubah("dirapatkan", { id: "sa", x: 130 }, { id: "sc", x: 130 }),
      ubah("menjadi", { id: "a1-k", warna: W.emas }),
      tambah("Betul!", emo("ok", 252, 70, "\u{2705}", 26)),
    ),
    k(
      SUARA_P4,
      bersih(0),
      tambah(0, judul("Dua persegi")),
      tambah("persegi", segiEmpat("q1", 40, 80, 40, 40), segiEmpat("q2", 220, 80, 40, 40)),
      ubah("dirapatkan,", { id: "q1", x: 110 }, { id: "q2", x: 150 }),
      tambah("panjang.", teks("lq", 150, 144, "persegi panjang", 12, W.merah)),
      tambah("Hebat!", emo("ow", 150, 52, IGIL, 26)),
    ),
  ],
};

/* ------------------------------ 4. Latihan 2: hitung keping ------------------------------ */
const SUARA_Q1 = "Latihan dua. Kira menyusun pesawat dari keping. Ada tiga keping segitiga dan tiga keping segi empat.";
const SUARA_Q2 = "Berapa semua kepingnya? Ketuk angka jawabannya. Tiga ditambah tiga sama dengan berapa?";
const SUARA_Q3 = "Tiga ditambah tiga sama dengan enam. Jadi ada enam keping. Ketuk angka enam.";
const SUARA_Q4 = "Sekarang ada delapan keping di pesawat besar. Kira melepas tiga keping. Ketuk tiga keping itu: satu, dua, tiga.";
const SUARA_Q5 = "Delapan kurang tiga sama dengan lima. Tinggal lima keping. Cocok!";

export const ADEGAN_LATIHAN_DUA: AdeganStory = {
  id: "latihan-dua",
  judul: "Latihan 2: hitung keping",
  sumber: "Materi: latihan hitung keping",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_Q1,
      bersih(0),
      tambah(0, judul("Latihan 2")),
      tambah("Kira", emo("a-Kira", 150, 120, ANAK, 26), teks("n-Kira", 150, 136, "Kira", 8.4)),
      tambah(idx(SUARA_Q1, "tiga", 1), ...[0, 1, 2].map((i) => segitigaSama(`pt${i}`, 40 + 45 * i, 56, 30, 26, W.segitiga))),
      tambah(idx(SUARA_Q1, "tiga", 2), ...[0, 1, 2].map((i) => segiEmpat(`ps${i}`, 170 + 45 * i, 56, 26, 26, W.segiEmpat))),
    ),
    k(
      SUARA_Q2,
      hapus(0, "a-Kira", "n-Kira"),
      tambah("angka", ...[5, 6, 7].flatMap((v, i) => kartuAngka(`ca${v}`, 70 + 60 * i, 140, String(v), W.krem, 40, 34, 20))),
      ...rangkai(SUARA_Q2, "qa", 112, ["3", "+", "3", "=", "?"], ["Tiga", "ditambah", "tiga", "sama", "berapa?"], "jawabannya.", 20),
    ),
    k(SUARA_Q3, ubah("enam.", { id: "qa4", isi: "6" }), sorotkan("Ketuk", "ca6-k")),
    k(
      SUARA_Q4,
      bersih(0),
      tambah(0, judul("Lepas tiga keping")),
      tambah("delapan", ...[0, 1, 2, 3, 4, 5, 6, 7].map((i) => segiEmpat(`pk${i}`, 66 + 40 * (i % 4), i < 4 ? 50 : 96, 30, 30, W.segiEmpat))),
      ...tandaiSatuSatu(SUARA_Q4, ["pk7", "pk6", "pk5"], { op: 0.25 }, "itu:"),
    ),
    k(
      SUARA_Q5,
      ...rangkai(SUARA_Q5, "qb", 160, ["8", "−", "3", "=", "5"], ["Delapan", "kurang", "tiga", "sama", "lima."], undefined, 20),
      tambah("Cocok!", emo("ok", 252, 160, "\u{2705}", 26)),
    ),
  ],
};

/* ------------------------------ 5. Latihan 3: lidi untuk rumah ------------------------------ */
const SUARA_R1 = "Latihan tiga. Upe membuat rumah dari lidi. Dindingnya segi empat, dan atapnya segitiga. Berapa lidi untuk rumah itu?";
const SUARA_R2 = "Dinding memakai empat lidi. Atap memakai dua lidi lagi. Empat ditambah dua sama dengan berapa?";
const SUARA_R3 = "Ketuk jawabannya di layar: lima, enam, atau tujuh.";
const SUARA_R4 = "Betul! Empat ditambah dua sama dengan enam. Rumah itu memakai enam lidi. Hebat sekali!";
const LIDI_RUMAH: [number, number, number, number][] = [[120, 160, 180, 160], [120, 160, 120, 100], [180, 160, 180, 100], [120, 100, 180, 100], [120, 100, 150, 48], [180, 100, 150, 48]];

export const ADEGAN_LATIHAN_TIGA: AdeganStory = {
  id: "latihan-tiga",
  judul: "Latihan 3: lidi untuk rumah",
  sumber: "Materi: latihan lidi untuk rumah",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_R1,
      bersih(0),
      tambah(0, judul("Latihan 3")),
      tambah("Upe", emo("a-Upe", 40, 70, ANAK, 26), teks("n-Upe", 40, 84, "Upe", 8.4)),
      tambah("rumah", ...LIDI_RUMAH.map(([a, b, c, d], i) => lidi(`rl${i}`, a, b, c, d))),
      tambah("Berapa", emo("tn", 240, 110, "\u{2753}", 30)),
    ),
    k(
      SUARA_R2,
      hapus(0, "tn"),
      sorotkan("Dinding", "rl0", "rl1", "rl2", "rl3"),
      redamkan("Atap", "rl0", "rl1", "rl2", "rl3"),
      sorotkan("Atap", "rl4", "rl5"),
      ...rangkai(SUARA_R2, "rr", 188, ["4", "+", "2", "=", "?"], ["Empat", "ditambah", "dua", "sama", "berapa?"], "lagi.", 20),
    ),
    k(
      SUARA_R3,
      redamkan(0, "rl4", "rl5"),
      tambah("lima,", ...kartuAngka("jr5", 230, 40, "5", W.krem, 40, 34, 20)),
      tambah("enam,", ...kartuAngka("jr6", 230, 84, "6", W.krem, 40, 34, 20)),
      tambah("tujuh.", ...kartuAngka("jr7", 230, 128, "7", W.krem, 40, 34, 20)),
    ),
    k(SUARA_R4, ubah("enam.", { id: "rr4", isi: "6" }), ubah("enam.", { id: "jr6-k", warna: W.emas }), tambah("Betul!", emo("ok", 40, 140, "\u{2705}", 28))),
  ],
};

/* ------------------------------ 6. Penutup ------------------------------ */
const SUARA_Z1 = "Mari kita ingat lagi. Menyusun artinya menggabungkan beberapa bentuk menjadi bangun yang baru.";
const SUARA_Z2 = "Mengurai artinya memisahkan bangun menjadi bagian-bagiannya. Kita bisa menyebut jenis dan banyak tiap bagian.";
const SUARA_Z3 = "Menyusun kita hitung dengan tambah. Mengurai kita hitung dengan kurang.";
const SUARA_Z4 = "Hebat sekali, anak-anak! Sampai jumpa di pelajaran berikutnya. Teruslah berlatih di layar, ya.";
const LANGKAH = (i: number, isi: string, warna: string) => kartu(`z${i}`, 14, 30 + i * 40, 272, 32, warna, [isi], 10);

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Penutup: mari ingat lagi",
  sumber: "Materi: ringkasan dan penutup",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_Z1, tambah(0, judul("Mari ingat lagi")), tambah("Menyusun", ...LANGKAH(0, "1. Menyusun: menggabung bentuk", W.hijauMuda))),
    k(SUARA_Z2, tambah("Mengurai", ...LANGKAH(1, "2. Mengurai: memisahkan bangun", W.langit)), tambah("jenis", ...LANGKAH(2, "3. Sebut jenis dan banyak bagian", W.pink))),
    k(SUARA_Z3, tambah("tambah.", ...LANGKAH(3, "4. Susun: tambah, urai: kurang", W.krem))),
    k(SUARA_Z4, bersih(0), tambah(0, judul("Sampai jumpa!"), emo("sj", 150, 110, IGIL, 56)), tambah("anak-anak!", emo("pa", 80, 150, "\u{1F389}", 30), emo("pb", 220, 150, "\u{1F389}", 30))),
  ],
};
