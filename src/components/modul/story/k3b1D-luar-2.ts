import type { AdeganStory } from "./logika-story";
import { W, emo, garisBil, kartu, pecah, teks } from "./k3b1D-gambar";
import { E, e, hapus, idx, k, idPilihan, pilihKata, redamkan, sorotkan, tambah, ubah } from "./k3b1D-bantu";
import { kepala } from "./k3b1D-luar-1";

const cap = (isi: string) => teks("cp", 150, 198, isi, 10.5, W.merah);

/* ------------------------------ 4. Pasangan Bilangan: konsep ------------------------------ */
const P1 = pecah(8, 6, 2, 84);
const SUARA_P1 = "Metode kedua bernama Pasangan Bilangan. Kita memecah bilangan supaya mudah dijumlahkan.";
const SUARA_P2 = `Misalnya ${e(8)} ditambah ${e(6)}. Kita ingin sampai ke sepuluh lebih dulu.`;
const SUARA_P3 = `Pecah ${e(6)} menjadi ${e(2)} dan ${e(4)}.`;
const SUARA_P4 = `Pasangannya ${e(8)} ditambah ${e(2)} sama dengan ${e(10)}.`;
const SUARA_P5 = `Lalu ${e(10)} ditambah ${e(4)} sama dengan ${e(14)}. Jadi ${e(8)} ditambah ${e(6)} sama dengan ${e(14)}.`;

export const ADEGAN_LUAR_PASANGAN: AdeganStory = {
  id: "luar-pasangan",
  judul: "Pasangan Bilangan: memecah bilangan",
  sumber: "Metode luar: Pasangan Bilangan",
  latar: "#ECFEFF",
  ketukan: [
    k(SUARA_P1, tambah(0, ...kepala(1)), tambah(idx(SUARA_P1, "memecah"), emo("pc", 150, 112, "\u{1F9E9}", 44))),
    k(SUARA_P2, hapus(0, "pc"), tambah(idx(SUARA_P2, "Misalnya"), ...P1.awal()), tambah(idx(SUARA_P2, "sepuluh"), teks("tj", 150, 128, "sampai sepuluh dulu", 11, W.ungu))),
    k(SUARA_P3, hapus(0, "tj"), tambah(idx(SUARA_P3, "Pecah"), ...P1.garis()), tambah(idx(SUARA_P3, "menjadi"), ...P1.bagian())),
    k(SUARA_P4, tambah(idx(SUARA_P4, "Pasangannya"), teks("eq-1", 150, 160, "8 + 2 = 10", 16, W.hijau))),
    k(SUARA_P5, tambah(idx(SUARA_P5, "Lalu"), teks("eq-2", 150, 182, "10 + 4 = 14", 16, W.hijau))),
  ],
};

/* ------------------------------ 5. Pasangan Bilangan: terapan ------------------------------ */
const P2 = pecah(49, 6, 1, 74);
const SUARA_Q1 = `Terapkan pada soal ini. Wei menjumlahkan ${e(49)} dan ${e(6)} dengan pasangan bilangan.`;
const SUARA_Q2 = "Berapa hasilnya? Ketuk jawaban yang tepat.";
const SUARA_Q3 = `Betul! Jawabannya adalah ${e(55)}. Mari kita periksa dengan pasangan bilangan.`;
const SUARA_Q4 = `Pecah ${e(6)} menjadi ${e(1)} dan ${e(5)}. ${E(49)} ditambah ${e(1)} sama dengan ${e(50)}.`;
const SUARA_Q5 = `Lalu ${e(50)} ditambah ${e(5)} sama dengan ${e(55)}. Pasangan sepuluh membuat bilangan mudah dijumlah.`;

export const ADEGAN_LUAR_PASANGAN_TERAPAN: AdeganStory = {
  id: "luar-pasangan-terapan",
  judul: "Pasangan Bilangan: soal Wei",
  sumber: "Metode luar: Pasangan Bilangan",
  latar: "#E0F2FE",
  ketukan: [
    k(SUARA_Q1, tambah(0, ...kepala(1)), tambah(idx(SUARA_Q1, "Wei"), ...P2.awal())),
    k(SUARA_Q2, tambah(idx(SUARA_Q2, "Berapa"), teks("tanya", 150, 100, "berapa hasilnya?", 12, W.ungu)), tambah(idx(SUARA_Q2, "jawaban"), ...pilihKata(110, ["54", "55", "56"], 16))),
    k(SUARA_Q3, sorotkan(idx(SUARA_Q3, "Betul!"), "c2-k"), tambah(idx(SUARA_Q3, "Jawabannya"), cap("49 + 6 = 55"))),
    k(
      SUARA_Q4,
      redamkan(0, "c2-k"),
      hapus(0, "tanya", ...idPilihan(3)),
      tambah(idx(SUARA_Q4, "Pecah"), ...P2.garis(), ...P2.bagian()),
      tambah(idx(SUARA_Q4, "Empat"), teks("eq-1", 150, 160, "49 + 1 = 50", 16, W.hijau)),
    ),
    k(SUARA_Q5, tambah(idx(SUARA_Q5, "Lalu"), teks("eq-2", 150, 182, "50 + 5 = 55", 16, W.hijau))),
  ],
};

/* ------------------------------ 6. Menghitung Maju: konsep ------------------------------ */
const G1 = garisBil(25, 28, 112);
const SUARA_M1 = "Metode ketiga bernama Menghitung Maju. Kita mulai dari bilangan yang lebih besar, lalu maju.";
const SUARA_M2 = `Misalnya ${e(3)} ditambah ${e(25)}. Bilangan yang lebih besar adalah ${e(25)}, jadi kita mulai dari sana.`;
const SUARA_M3 = `Maju ${e(3)} langkah: ${e(26)}, ${e(27)}, ${e(28)}.`;
const SUARA_M4 = `Jadi ${e(3)} ditambah ${e(25)} sama dengan ${e(28)}.`;
const SUARA_M5 = "Mulai dari bilangan yang besar membuat langkah yang kita ambil lebih sedikit.";

export const ADEGAN_LUAR_MAJU: AdeganStory = {
  id: "luar-maju",
  judul: "Menghitung Maju: mulai dari yang besar",
  sumber: "Metode luar: Menghitung Maju",
  latar: "#FDF2F8",
  ketukan: [
    k(SUARA_M1, tambah(0, ...kepala(2)), tambah(idx(SUARA_M1, "mulai"), emo("mj", 150, 112, "\u{1F3C3}", 44))),
    k(
      SUARA_M2,
      hapus(0, "mj"),
      tambah(idx(SUARA_M2, "Misalnya"), teks("soal", 150, 66, "3 + 25 = ?", 20, W.ungu)),
      tambah(idx(SUARA_M2, "Bilangan"), ...G1.sumbu(), ...G1.tanda()),
      tambah(idx(SUARA_M2, "sana."), G1.mulai(25)),
    ),
    k(
      SUARA_M3,
      tambah(idx(SUARA_M3, "enam,"), ...G1.loncat(1, 25)),
      tambah(idx(SUARA_M3, "tujuh,"), ...G1.loncat(2, 26)),
      tambah(idx(SUARA_M3, "delapan."), ...G1.loncat(3, 27), G1.akhir(28)),
    ),
    k(SUARA_M4, ubah(idx(SUARA_M4, "Jadi"), { id: "soal", isi: "3 + 25 = 28" })),
    k(SUARA_M5, tambah(idx(SUARA_M5, "Mulai"), ...kartu("mb", 40, 150, 220, 36, W.emas, ["mulai dari yang besar", "langkah lebih sedikit"], 10))),
  ],
};

/* ------------------------------ 7. Menghitung Maju: terapan ------------------------------ */
const G2 = garisBil(36, 40, 104);
const SUARA_N1 = `Terapkan pada soal ini. Upe menjumlahkan ${e(4)} dan ${e(36)} dengan menghitung maju.`;
const SUARA_N2 = "Berapa hasilnya? Ketuk jawaban yang tepat.";
const SUARA_N3 = `Betul! Mulai dari ${e(36)}, maju ${e(4)} langkah sampai ${e(40)}.`;
const SUARA_N4 = `Jadi ${e(4)} ditambah ${e(36)} sama dengan ${e(40)}. Menghitung maju mudah kalau langkahnya sedikit.`;

export const ADEGAN_LUAR_MAJU_TERAPAN: AdeganStory = {
  id: "luar-maju-terapan",
  judul: "Menghitung Maju: soal Upe",
  sumber: "Metode luar: Menghitung Maju",
  latar: "#FFF1F2",
  ketukan: [
    k(
      SUARA_N1,
      tambah(0, ...kepala(2)),
      tambah(idx(SUARA_N1, "Upe"), teks("soal", 150, 62, "4 + 36 = ?", 20, W.ungu)),
      tambah(idx(SUARA_N1, "dengan"), ...G2.sumbu(), ...G2.tanda(), G2.mulai(36)),
    ),
    k(SUARA_N2, tambah(idx(SUARA_N2, "Berapa"), teks("tanya", 150, 140, "berapa hasilnya?", 12, W.ungu)), tambah(idx(SUARA_N2, "jawaban"), ...pilihKata(146, ["39", "40", "41"], 16))),
    k(
      SUARA_N3,
      sorotkan(idx(SUARA_N3, "Betul!"), "c2-k"),
      tambah(idx(SUARA_N3, "maju"), ...G2.loncat(1, 36)),
      tambah(idx(SUARA_N3, "empat"), ...G2.loncat(2, 37)),
      tambah(idx(SUARA_N3, "langkah"), ...G2.loncat(3, 38)),
      tambah(idx(SUARA_N3, "sampai"), ...G2.loncat(4, 39), G2.akhir(40)),
    ),
    k(SUARA_N4, redamkan(0, "c2-k"), hapus(0, "tanya", ...idPilihan(3)), ubah(idx(SUARA_N4, "Jadi"), { id: "soal", isi: "4 + 36 = 40" }), tambah(idx(SUARA_N4, "Menghitung"), cap("36 + 4 = 40"))),
  ],
};

