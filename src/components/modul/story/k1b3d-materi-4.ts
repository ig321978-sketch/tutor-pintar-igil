import type { AdeganStory } from "./logika-story";
import { W, benda, emo, judul, kartu, kartuAngka, teks, type Titik } from "./k1b3d-gambar";
import { bersih, hapus, k, rangkai, redamkan, tambah, ubah } from "./k1b3d-bantu";

const IGIL = "\u{1F989}";

/* ------------------------------ 1. Latihan 1: balon Wei ------------------------------ */
const SUARA_L1 = "Latihan satu. Wei punya delapan balon. Lalu tiga balon terbang. Tinggal berapa balon Wei?";
const SUARA_L2 = "Pikirkan dulu. Mula-mula ada delapan balon, yang pergi ada tiga. Kata petunjuknya, terbang.";
const SUARA_L3 = "Susun kalimat pengurangan. Delapan dikurangi tiga sama dengan lima. Jadi Wei punya lima balon.";
const SUARA_L4 = "Betul! Sisa balon Wei ada lima. Hebat sekali!";
const TITIK_BALON: Titik[] = Array.from({ length: 8 }, (_, i) => ({ x: 50 + (i % 5) * 50, y: i < 5 ? 64 : 100 }));

export const ADEGAN_LATIHAN_SATU: AdeganStory = {
  id: "latihan-satu",
  judul: "Latihan 1: balon Wei",
  sumber: "Materi: latihan balon Wei",
  latar: "#FFF1F2",
  ketukan: [
    k(
      SUARA_L1,
      tambah(0, judul("Latihan 1")),
      tambah("delapan", ...TITIK_BALON.flatMap((p, i) => benda("balon", `lb${i}`, p.x, p.y, 11, i))),
      ubah("terbang.", ...[5, 6, 7].flatMap((i) => [{ id: `lb${i}`, op: 0.3 }, { id: `lb${i}-x`, op: 0.3 }])),
      tambah("terbang.", ...[5, 6, 7].map((i) => emo(`lx${i}`, TITIK_BALON[i].x, TITIK_BALON[i].y, "❌", 14))),
      tambah("terbang.", ...kartu("lt", 90, 132, 120, 24, W.merahMuda, ["3 balon terbang"], 10)),
    ),
    k(SUARA_L2, tambah("delapan", ...kartuAngka("q1", 40, 160, "8", W.merahMuda, 40, 32, 20)), tambah("tiga.", ...kartuAngka("q2", 220, 160, "3", W.hijauMuda, 40, 32, 20)), tambah("petunjuknya,", ...kartu("qk", 90, 162, 120, 26, W.krem, ["kata: terbang"], 9))),
    k(
      SUARA_L3,
      hapus(0, "q1-k", "q1-t", "q2-k", "q2-t", "qk-k", "qk-t0", "lt-k", "lt-t0"),
      ...rangkai(SUARA_L3, "ls", 150, ["8", "−", "3", "=", "5"], ["Delapan", "dikurangi", "tiga", "sama", "lima."], "pengurangan."),
      tambah("Jadi", ...kartu("lj", 50, 168, 200, 26, W.hijauMuda, ["Wei punya 5 balon."], 10)),
    ),
    k(SUARA_L4, tambah("Betul!", emo("ok", 40, 196, "✅", 26)), tambah("Hebat", emo("ow", 262, 196, IGIL, 26))),
  ],
};

/* ------------------------------ 2. Latihan 2: kue Upe ------------------------------ */
const SUARA_M1 = "Latihan dua. Upe punya tujuh kue. Upe makan dua kue. Sisa kue Upe ada berapa?";
const SUARA_M2 = "Mana kalimat yang cocok? Ketuk pilihan di layar. Pilihan pertama, tujuh dikurangi dua. Pilihan kedua, tujuh dikurangi tiga.";
const SUARA_M3 = "Pilihan pertama cocok, karena Upe makan dua kue. Tujuh dikurangi dua sama dengan lima.";
const SUARA_M4 = "Kalimat jawabannya, sisa kue Upe ada lima. Betul, hebat!";
const KUE = "\u{1F370}";

export const ADEGAN_LATIHAN_DUA: AdeganStory = {
  id: "latihan-dua",
  judul: "Latihan 2: kue Upe",
  sumber: "Materi: latihan kue Upe",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_M1,
      tambah(0, judul("Latihan 2")),
      tambah("tujuh", ...[0, 1, 2, 3, 4, 5, 6].map((i) => emo(`ku${i}`, 32 + 38 * i, 76, KUE, 24))),
      tambah("makan", teks("un", 150, 112, "Upe makan 2 kue", 10, W.merah)),
    ),
    k(SUARA_M2, tambah("pertama,", ...kartu("o1", 20, 128, 125, 26, W.langit, ["7 − 2 = 5"], 11)), tambah("kedua,", ...kartu("o2", 155, 128, 125, 26, W.pink, ["7 − 3 = 4"], 11))),
    k(SUARA_M3, ubah("cocok,", { id: "o1-k", warna: W.emas }), tambah("lima.", emo("ok", 150, 176, "✅", 26)), redamkan(0, "o2-k")),
    k(SUARA_M4, hapus(0, "ok"), tambah("jawabannya,", ...kartu("jw", 40, 166, 220, 26, W.hijauMuda, ["Sisa kue Upe ada 5."], 10.4)), tambah("hebat!", emo("ow", 268, 190, IGIL, 24))),
  ],
};

/* ------------------------------ 3. Latihan 3: motor di tempat parkir ------------------------------ */
const SUARA_N1 = "Latihan tiga. Di tempat parkir ada sembilan motor. Empat motor pergi. Susun kalimat pengurangan dan kalimat jawabannya dari kartu.";
const SUARA_N2 = "Susun kalimat pengurangan. Sembilan, tanda kurang, empat, tanda sama dengan, lima.";
const SUARA_N3 = "Lalu susun kalimat jawaban. Sisa motor ada lima.";
const SUARA_N4 = "Betul! Sembilan motor, empat motor pergi, sisanya lima. Hebat sekali!";
const TITIK_MOTOR: Titik[] = Array.from({ length: 9 }, (_, i) => ({ x: i < 5 ? 50 + 50 * i : 75 + 50 * (i - 5), y: i < 5 ? 52 : 86 }));

export const ADEGAN_LATIHAN_TIGA: AdeganStory = {
  id: "latihan-tiga",
  judul: "Latihan 3: motor di tempat parkir",
  sumber: "Materi: latihan motor di tempat parkir",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_N1,
      tambah(0, judul("Latihan 3")),
      tambah("sembilan", ...TITIK_MOTOR.map((p, i) => emo(`mt${i}`, p.x, p.y, "\u{1F6F5}", 26))),
      ubah("pergi.", ...[5, 6, 7, 8].map((i) => ({ id: `mt${i}`, op: 0.3 }))),
      tambah("pergi.", ...[5, 6, 7, 8].map((i) => emo(`mx${i}`, TITIK_MOTOR[i].x, TITIK_MOTOR[i].y, "❌", 14))),
      tambah("pergi.", ...kartu("np", 90, 112, 120, 24, W.merahMuda, ["4 motor pergi"], 10)),
    ),
    k(SUARA_N2, hapus(0, "np-k", "np-t0"), ...rangkai(SUARA_N2, "qq", 140, ["9", "−", "4", "=", "5"], ["Sembilan,", "kurang,", "empat,", "sama", "lima."], "pengurangan.")),
    k(SUARA_N3, tambah("jawaban.", ...kartu("qj", 40, 160, 220, 28, W.hijauMuda, ["Sisa motor ada 5."], 10.4))),
    k(SUARA_N4, tambah("Betul!", emo("ok", 40, 196, "✅", 26)), tambah("Hebat", emo("ow", 262, 196, IGIL, 26))),
  ],
};

/* ------------------------------ 4. Penutup ------------------------------ */
const SUARA_Z1 = "Mari kita ingat lagi langkah mengerjakan soal cerita pengurangan. Pertama, baca ceritanya dan cari mula-mula dan yang pergi.";
const SUARA_Z2 = "Kedua, susun kalimat pengurangan dengan tanda kurang dan tanda sama dengan. Ketiga, jawab dengan kalimat lengkap.";
const SUARA_Z3 = "Keempat, periksa jawabanmu dengan tambah atau dengan cara lain. Kamu pasti bisa mengerjakan soal cerita pengurangan!";
const SUARA_Z4 = "Hebat sekali, anak-anak! Sampai jumpa di pelajaran berikutnya. Teruslah berlatih di layar, ya.";
const LANGKAH = (i: number, isi: string, warna: string) => kartu(`z${i}`, 14, 30 + i * 40, 272, 32, warna, [isi], 10);

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Penutup: mari ingat lagi",
  sumber: "Materi: ringkasan dan penutup",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_Z1, tambah(0, judul("Mari ingat lagi")), tambah("Pertama,", ...LANGKAH(0, "1. Baca dan cari mula-mula dan pergi", W.hijauMuda))),
    k(SUARA_Z2, tambah("Kedua,", ...LANGKAH(1, "2. Susun kalimat pengurangan", W.langit)), tambah("Ketiga,", ...LANGKAH(2, "3. Jawab dengan kalimat lengkap", W.pink))),
    k(SUARA_Z3, tambah("Keempat,", ...LANGKAH(3, "4. Periksa dengan tambah", W.krem))),
    k(SUARA_Z4, bersih(0), tambah(0, judul("Sampai jumpa!"), emo("sj", 150, 110, IGIL, 56)), tambah("anak-anak!", emo("pa", 80, 150, "\u{1F389}", 30), emo("pb", 220, 150, "\u{1F389}", 30))),
  ],
};
