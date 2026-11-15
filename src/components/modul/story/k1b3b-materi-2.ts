import type { AdeganStory } from "./logika-story";
import { PX, W, bagan, emo, judul, kartu, petak, silang, teks } from "./k1b3b-gambar";
import { bersih, hapus, hitungAksi, idx, k, redamkan, sorotkan, tambah, ubah } from "./k1b3b-bantu";

const ANAK = "\u{1F9D2}";

/* ------------------------------ 1. Upe melompat mundur di garis bilangan ------------------------------ */
const SUARA_H1 = "Sekarang cara yang kedua, yaitu menghitung mundur. Ini garis bilangan dari nol sampai sepuluh.";
const SUARA_H2 = "Upe berdiri di angka tiga. Upe siap melompat ke belakang.";
const SUARA_H3 = "Melompat ke belakang berarti bergerak ke angka yang lebih kecil. Upe akan melompat dua langkah.";
const SUARA_H4 = "Lompatan pertama, Upe mendarat di dua. Lompatan kedua, Upe mendarat di satu. Itu dua langkah ke belakang.";
const SUARA_H5 = "Upe berhenti di angka satu. Tiga dikurangi dua sama dengan satu.";
const SUARA_H6 = "Menghitung mundur punya tiga langkah. Satu, tunjuk bilangan awal. Dua, lompat ke belakang sebanyak pengurang. Tiga, bilangan tempat mendarat adalah hasilnya.";
const SUARA_H7 = "Mari ucapkan lagi bersama suara guru. Tiga dikurangi dua sama dengan satu. Ucapkan pelan-pelan.";

export const ADEGAN_BATU: AdeganStory = {
  id: "mundur-batu",
  judul: "Upe melompat mundur di garis bilangan",
  sumber: "Materi: hitung mundur, Upe",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_H1, tambah(0, judul("Garis bilangan")), tambah("garis", ...petak()), sorotkan("sepuluh.", "pt10")),
    k(SUARA_H2, redamkan(0, "pt10"), tambah("Upe", emo("up", PX(3), 112, ANAK, 22), teks("un", PX(3), 86, "Upe", 8.6, W.ungu)), sorotkan("tiga.", "pt3")),
    k(
      SUARA_H3,
      redamkan(0, "pt3"),
      tambah("Melompat", { id: "ar", t: "panah", x: PX(3), y: 62, x2: -2 * 24, y2: 0, warna: W.ungu, tebal: 2.4 }),
      tambah("dua", teks("lg", 150, 52, "2 langkah ke belakang", 10, W.ungu)),
    ),
    k(
      SUARA_H4,
      hapus(0, "ar", "lg"),
      tambah("pertama,", teks("lm0", PX(2), 160, "1", 14, W.hijau)),
      ubah(idx(SUARA_H4, "dua", 1), { id: "up", x: PX(2) }, { id: "un", x: PX(2) }),
      tambah("kedua,", teks("lm1", PX(1), 160, "2", 14, W.hijau)),
      ubah(idx(SUARA_H4, "satu", 1), { id: "up", x: PX(1) }, { id: "un", x: PX(1) }),
    ),
    k(SUARA_H5, sorotkan("satu.", "pt1"), tambah("Tiga", teks("ds", 150, 196, "3 − 2 = 1", 20, W.hijau))),
    k(
      SUARA_H6,
      bersih(0),
      tambah(0, judul("Tiga langkah menghitung mundur")),
      tambah("Satu,", ...kartu("l1", 20, 36, 260, 32, W.langit, ["1. tunjuk bilangan awal"], 10)),
      tambah("Dua,", ...kartu("l2", 20, 80, 260, 32, W.hijauMuda, ["2. lompat ke belakang"], 10)),
      tambah(idx(SUARA_H6, "tiga", 2), ...kartu("l3", 20, 124, 260, 32, W.pink, ["3. mendarat: itu hasilnya"], 10)),
    ),
    k(
      SUARA_H7,
      bersih(0),
      tambah(0, judul("Ucapkan lagi"), emo("uc", 150, 70, "\u{1F4AC}", 40)),
      tambah("Tiga", ...kartu("e1", 40, 104, 220, 36, W.hijauMuda, ["3 − 2 = 1"], 18)),
      tambah("pelan-pelan.", emo("ow", 150, 176, "\u{1F989}", 30)),
    ),
  ],
};

/* ------------------------------ 2. Kira melompat mundur: lima dikurangi tiga ------------------------------ */
const SUARA_K1 = "Sekarang giliran Kira. Kira berdiri di angka lima.";
const SUARA_K2 = "Kira melompat tiga langkah ke belakang. Empat, tiga, dua.";
const SUARA_K3 = "Kira mendarat di angka dua. Lima dikurangi tiga sama dengan dua.";
const SUARA_K4 = "Menghitung mundur artinya menyebut angka dari yang besar ke yang kecil. Lima, empat, tiga, dua.";
const SUARA_K5 = "Ingat, bilangan awal tidak ikut dihitung. Kita menghitung tiga langkah saja: empat, tiga, dua.";
const KARTU_M = [0, 1, 2, 3].map((i) => 12 + i * 74);

export const ADEGAN_KIRA: AdeganStory = {
  id: "mundur-kira",
  judul: "Kira melompat mundur: lima dikurangi tiga",
  sumber: "Materi: hitung mundur, Kira",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_K1,
      tambah(0, judul("Giliran Kira"), ...petak()),
      tambah("berdiri", emo("kr", PX(5), 112, ANAK, 22), teks("kk", PX(5), 86, "Kira", 8.6, W.ungu)),
      sorotkan("lima.", "pt5"),
    ),
    k(
      SUARA_K2,
      redamkan(0, "pt5"),
      tambah("langkah", teks("lg", 150, 52, "3 langkah ke belakang", 10, W.ungu)),
      ubah("Empat,", { id: "kr", x: PX(4) }, { id: "kk", x: PX(4) }),
      tambah("Empat,", teks("lm0", PX(4), 160, "1", 14, W.hijau)),
      ubah(idx(SUARA_K2, "tiga", 2), { id: "kr", x: PX(3) }, { id: "kk", x: PX(3) }),
      tambah(idx(SUARA_K2, "tiga", 2), teks("lm1", PX(3), 160, "2", 14, W.hijau)),
      ubah("dua.", { id: "kr", x: PX(2) }, { id: "kk", x: PX(2) }),
      tambah("dua.", teks("lm2", PX(2), 160, "3", 14, W.hijau)),
    ),
    k(SUARA_K3, sorotkan("dua.", "pt2"), tambah("Lima", teks("ks", 150, 196, "5 − 3 = 2", 20, W.hijau))),
    k(
      SUARA_K4,
      bersih(0),
      tambah(0, judul("Dari besar ke kecil")),
      ...["5", "4", "3", "2"].map((a, i) => tambah(["Lima,", "empat,", "tiga,", "dua."][i], ...kartu(`m${i}`, KARTU_M[i], 70, 62, 50, i === 0 ? W.krem : W.langit, [a], 26))),
      ...[0, 1, 2].map((i) => tambah(["empat,", "tiga,", "dua."][i], teks(`pm${i}`, KARTU_M[i] + 68, 100, "\u{2192}", 14, W.ungu))),
      tambah("kecil.", ...kartu("kz", 50, 146, 200, 26, W.krem, ["angkanya makin kecil"], 10)),
    ),
    k(
      SUARA_K5,
      ubah(0, { id: "m0-k", op: 0.4 }, { id: "m0-t0", op: 0.4 }),
      tambah("awal", teks("aw", KARTU_M[0] + 31, 134, "awal", 9, W.ungu)),
      sorotkan("empat,", "m1-k", "m2-k", "m3-k"),
      tambah("saja:", emo("ow", 150, 192, "\u{1F989}", 26)),
    ),
  ],
};

/* ------------------------------ 3. Wei: sembilan dikurangi empat, lalu diperiksa ------------------------------ */
const SUARA_L1 = "Sekarang Wei berdiri di angka sembilan. Wei akan melompat empat langkah ke belakang.";
const SUARA_L2 = "Delapan, tujuh, enam, lima. Wei mendarat di angka lima.";
const SUARA_L3 = "Sembilan dikurangi empat sama dengan lima. Kita sudah dapat hasilnya.";
const SUARA_L4 = "Kita bisa memeriksa hasilnya. Lima dan empat jika digabung menjadi sembilan, jadi hasilnya benar.";
const SUARA_L5 = "Ayo ucapkan lagi bersama suara guru. Sembilan dikurangi empat sama dengan lima.";

export const ADEGAN_LAIN: AdeganStory = {
  id: "mundur-lain",
  judul: "Wei: sembilan dikurangi empat",
  sumber: "Materi: hitung mundur, Wei",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_L1,
      tambah(0, judul("Giliran Wei"), ...petak()),
      tambah("berdiri", emo("wr", PX(9), 112, ANAK, 22), teks("wk", PX(9), 86, "Wei", 8.6, W.ungu)),
      sorotkan("sembilan.", "pt9"),
      tambah("empat", teks("lg", 150, 52, "4 langkah ke belakang", 10, W.ungu)),
    ),
    k(
      SUARA_L2,
      redamkan(0, "pt9"),
      ...["Delapan,", "tujuh,", "enam,", "lima."].flatMap((kata, i) => [ubah(kata, { id: "wr", x: PX(8 - i) }, { id: "wk", x: PX(8 - i) }), tambah(kata, teks(`lm${i}`, PX(8 - i), 160, String(i + 1), 14, W.hijau))]),
    ),
    k(SUARA_L3, sorotkan("lima.", "pt5"), tambah("Sembilan", teks("ls", 150, 196, "9 − 4 = 5", 20, W.hijau))),
    k(
      SUARA_L4,
      bersih(0),
      tambah(0, judul("Periksa dengan menggabungkan"), ...bagan("pk", 150, 44, "9", "5", "4")),
      tambah("benar.", emo("cb", 150, 188, "\u{2705}", 30)),
    ),
    k(
      SUARA_L5,
      bersih(0),
      tambah(0, judul("Ucapkan lagi"), emo("uc", 150, 70, "\u{1F4AC}", 40)),
      tambah("Sembilan", ...kartu("e1", 40, 104, 220, 36, W.hijauMuda, ["9 − 4 = 5"], 18)),
    ),
  ],
};

/* ------------------------------ 4. Mobil kosong: dikurangi nol dan bilangan yang sama ------------------------------ */
const P3 = [100, 150, 200].map((x) => ({ x, y: 90 }));
const MOBIL = emo("mb", 150, 170, "\u{1F697}", 60);
const orang = () => P3.map((p, i) => emo(`or${i}`, p.x, p.y + 8, ANAK, 26));
const SUARA_N1 = "Mula-mula ada tiga orang di dalam mobil. Satu, dua, tiga.";
const SUARA_N2 = "Tiga orang itu turun dari mobil. Sekarang tidak ada orang di dalam mobil.";
const SUARA_N3 = "Tiga dikurangi tiga sama dengan nol. Kalau semuanya pergi, yang tersisa adalah nol.";
const SUARA_N4 = "Sekarang cerita yang lain. Tiga orang di dalam mobil, dan tidak ada yang turun. Tiga dikurangi nol sama dengan tiga.";
const SUARA_N5 = "Ingat dua hal. Bilangan dikurangi nol, hasilnya tetap sama. Bilangan dikurangi bilangan yang sama, hasilnya nol.";
const SUARA_N6 = "Di garis bilangan, nol langkah berarti kita tidak pindah. Tiga langkah dari tiga, kita sampai di nol.";

export const ADEGAN_NOL: AdeganStory = {
  id: "nol",
  judul: "Mobil kosong: dikurangi nol",
  sumber: "Materi: pengurangan dengan nol",
  latar: "#FEFCE8",
  ketukan: [
    k(SUARA_N1, tambah(0, judul("Tiga orang di mobil"), MOBIL, ...orang()), ...hitungAksi(SUARA_N1, "or", P3.map((p) => ({ x: p.x, y: p.y })), "mobil.")),
    k(
      SUARA_N2,
      hapus(0, "tg", "orn0", "orn1", "orn2"),
      tambah("turun", ...[0, 1, 2].flatMap((i) => silang(`nx${i}`, P3[i].x, P3[i].y, 11))),
      ubah("turun", { id: "or0", op: 0.25 }, { id: "or1", op: 0.25 }, { id: "or2", op: 0.25 }),
      tambah("Sekarang", teks("nl", 150, 196, "0 orang", 18, W.merah)),
    ),
    k(
      SUARA_N3,
      hapus(0, "nl"),
      tambah("Tiga", teks("n3", 150, 196, "3 − 3 = 0", 22, W.hijau)),
      tambah(idx(SUARA_N3, "nol", 2), teks("n0", 250, 60, "0", 40, W.merah)),
    ),
    k(
      SUARA_N4,
      bersih(0),
      tambah(0, judul("Tidak ada yang turun"), MOBIL, ...orang()),
      tambah("turun", teks("tt", 150, 52, "tidak ada yang turun", 10, W.ungu)),
      tambah(idx(SUARA_N4, "tiga", 2), teks("n4", 150, 196, "3 − 0 = 3", 22, W.hijau)),
    ),
    k(
      SUARA_N5,
      bersih(0),
      tambah(0, judul("Ingat dua hal")),
      tambah("Bilangan", ...kartu("a1", 20, 44, 260, 52, W.hijauMuda, ["3 − 0 = 3", "hasilnya tetap sama"], 12)),
      tambah(idx(SUARA_N5, "bilangan", 2), ...kartu("a2", 20, 112, 260, 52, W.pink, ["3 − 3 = 0", "hasilnya nol"], 12)),
    ),
    k(
      SUARA_N6,
      bersih(0),
      tambah(0, judul("Di garis bilangan"), ...petak(), emo("nu", PX(3), 112, ANAK, 22)),
      tambah("nol", teks("nz", 150, 56, "0 langkah: tetap di 3", 10, W.ungu)),
      ubah("Tiga", { id: "nz", isi: "3 langkah: sampai di 0" }),
      ubah(idx(SUARA_N6, "nol", 2), { id: "nu", x: PX(0) }),
    ),
  ],
};
