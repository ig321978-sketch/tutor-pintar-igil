import type { AdeganStory } from "./logika-story";
import { W, anakDi, deretBilangan, emo, garis, judul, kartu, labelTs, tangga, teks } from "./k1b1c-gambar";
import { bersih, hapus, k, langkahTangga, sorotkan, tambah, ubah } from "./k1b1c-bantu";

const ANAK = "\u{1F9D2}";
const IGIL = "\u{1F989}";
const PESTA = "\u{1F389}";
const TANAH = () => garis("tanah", 14, 152, 272, 0, W.hijau, 3);
const SEMUA_LABEL = (dari: number, sampai: number) => Array.from({ length: sampai - dari + 1 }, (_, i) => labelTs(dari + i));

/* ------------------------------ 1. Cerita di taman ------------------------------ */
const SUARA_C1 = "Pagi ini Malosi, Kira, Upe, dan Wei bermain di taman bersama Igil, si burung hantu. Di taman ada tangga yang tinggi sekali.";
const SUARA_C2 = "Mereka gembira sekali. Igil mengajak mereka naik tangga dan turun lagi sambil menghitung. Ayo, kita ikut bermain sambil belajar.";
const SUARA_C3 = "Hari ini kita belajar menghitung maju, menghitung mundur, dan melengkapi bilangan yang hilang. Pelan-pelan saja, ya.";
const SUARA_C4 = "Tangga ini punya sepuluh anak tangga. Anak tangga paling bawah bernomor satu. Anak tangga paling atas bernomor sepuluh.";
const SUARA_C5 = "Upe berdiri di anak tangga paling bawah. Ayo, kita lihat cara menghitung maju dan cara menghitung mundur.";

const TEMAN: [string, number, string][] = [["Malosi", 40, "Malosi,"], ["Kira", 95, "Kira,"], ["Upe", 150, "Upe,"], ["Wei", 205, "Wei"]];

export const ADEGAN_CERITA: AdeganStory = {
  id: "cerita-tangga",
  judul: "Malosi, Kira, Upe, dan Wei di taman",
  sumber: "Materi: cerita di taman",
  latar: "#ECFCCB",
  ketukan: [
    k(
      SUARA_C1,
      tambah(0, judul("Di taman bermain"), TANAH()),
      ...TEMAN.map(([nama, x, pemicu]) => tambah(pemicu, emo(`a-${nama}`, x, 184, ANAK, 26), teks(`n-${nama}`, x, 197, nama, 8.4))),
      tambah("Igil,", emo("a-Igil", 262, 184, IGIL, 26), teks("n-Igil", 262, 197, "Igil", 8.4, W.ungu)),
      tambah("tangga", ...tangga()),
    ),
    k(
      SUARA_C2,
      tambah("gembira", emo("pesta", 150, 76, PESTA, 26)),
      tambah("mengajak", ...kartu("ig", 14, 34, 124, 26, W.krem, ["Igil: Ayo kita hitung!"], 9)),
      ubah("menghitung.", { id: "a-Upe", x: 33, y: 138 }),
    ),
    k(
      SUARA_C3,
      bersih(0),
      tambah(0, judul("Yang kita pelajari")),
      tambah("maju,", ...kartu("p1", 30, 34, 240, 34, W.hijauMuda, ["Menghitung maju"], 11), emo("e1", 48, 58, "➡️", 20)),
      tambah("mundur,", ...kartu("p2", 30, 78, 240, 34, W.langit, ["Menghitung mundur"], 11), emo("e2", 48, 102, "⬅️", 20)),
      tambah("melengkapi", ...kartu("p3", 30, 122, 240, 34, W.pink, ["Melengkapi bilangan"], 11), emo("e3", 48, 146, "\u{1F9E9}", 20)),
      tambah("Pelan-pelan", ...kartu("pp", 70, 168, 160, 26, W.krem, ["Pelan-pelan saja"], 9.4)),
    ),
    k(
      SUARA_C4,
      bersih(0),
      tambah(0, judul("Tangga sepuluh anak tangga"), TANAH()),
      tambah("sepuluh", ...tangga()),
      tambah("satu.", labelTs(1)),
      sorotkan("bawah", "ts0"),
      tambah("sepuluh@2", ...SEMUA_LABEL(2, 10)),
      sorotkan("atas", "ts9"),
    ),
    k(
      SUARA_C5,
      tambah("berdiri", anakDi(1)),
      tambah("maju", ...kartu("na", 14, 30, 110, 24, W.hijauMuda, ["naik = maju"], 9)),
      tambah("mundur.", ...kartu("tu", 14, 60, 110, 24, W.langit, ["turun = mundur"], 9)),
    ),
  ],
};

/* ------------------------------ 2. Menghitung maju ------------------------------ */
const SUARA_M1 = "Menghitung maju artinya menghitung dari bilangan kecil ke bilangan besar. Kita mulai dari bilangan satu.";
const SUARA_M2 = "Ayo ikut Upe naik tangga. Satu, dua, tiga, empat, lima.";
const SUARA_M3 = "Terus naik. Enam, tujuh, delapan, sembilan, sepuluh.";
const SUARA_M4 = "Upe sudah sampai di puncak tangga. Bilangan terakhir yang disebut adalah sepuluh.";
const SUARA_M5 = "Perhatikan, makin ke kanan, bilangannya makin besar. Setiap kali naik satu anak tangga, kita menyebut bilangan berikutnya.";
const SUARA_M6 = "Menghitung maju seperti berjalan ke kanan di deretan angka. Kita menyebut bilangan yang makin besar, satu demi satu.";
const SUARA_M7 = "Sekarang giliranmu. Ucapkan satu sampai sepuluh, sambil menunjuk tiap angka dengan jarimu. Pelan-pelan saja, ya.";

export const ADEGAN_MAJU: AdeganStory = {
  id: "hitung-maju",
  judul: "Menghitung maju: naik tangga",
  sumber: "Materi: menghitung maju",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_M1,
      tambah(0, judul("Menghitung maju"), TANAH(), ...tangga()),
      tambah("kecil", ...kartu("kb", 14, 30, 120, 24, W.hijauMuda, ["dari kecil ke besar"], 9)),
      tambah("satu.", anakDi(1), labelTs(1)),
      sorotkan("satu.", "ts0"),
    ),
    k(SUARA_M2, ...langkahTangga(SUARA_M2, [1, 2, 3, 4, 5], "tangga.")),
    k(SUARA_M3, ...langkahTangga(SUARA_M3, [6, 7, 8, 9, 10], "naik.")),
    k(
      SUARA_M4,
      ubah("puncak", { id: "kb-t0", isi: "sampai di puncak: 10" }, { id: "kb-k", warna: W.emas }),
      tambah("sepuluh.", emo("pesta", 60, 92, PESTA, 26)),
    ),
    k(
      SUARA_M5,
      tambah("kanan,", emo("kn", 50, 180, "➡️", 24)),
      tambah("bilangannya", ...kartu("kt", 80, 160, 190, 26, W.krem, ["makin ke kanan, makin besar"], 9)),
    ),
    k(
      SUARA_M6,
      bersih(0),
      tambah(0, judul("Deretan angka"), ...deretBilangan("dr", 70)),
      tambah("berjalan", emo("up", 33, 66, ANAK, 20)),
      ubah("kanan", { id: "up", x: 273 }),
      tambah("makin", ...kartu("ar", 50, 116, 200, 30, W.emas, ["1 2 3 ... 10: makin besar"], 10), emo("pn", 262, 170, "➡️", 24)),
    ),
    k(
      SUARA_M7,
      tambah("Ucapkan", emo("jr", 33, 106, "\u{1F446}", 24)),
      ubah("sepuluh,", { id: "jr", x: 273 }),
      tambah("jarimu.", emo("ig", 150, 190, IGIL, 30)),
    ),
  ],
};

/* ------------------------------ 3. Menghitung mundur ------------------------------ */
const SUARA_D1 = "Sekarang kita menghitung mundur. Menghitung mundur artinya menghitung dari bilangan besar ke bilangan kecil.";
const SUARA_D2 = "Upe mulai dari puncak tangga. Upe turun pelan-pelan. Sepuluh, sembilan, delapan, tujuh, enam.";
const SUARA_D3 = "Terus turun. Lima, empat, tiga, dua, satu.";
const SUARA_D4 = "Upe sudah sampai di anak tangga paling bawah. Bilangan terakhir yang disebut adalah satu.";
const SUARA_D5 = "Perhatikan, makin turun ke kiri, bilangannya makin kecil. Setiap kali turun satu anak tangga, kita menyebut bilangan sebelumnya.";
const SUARA_D6 = "Menghitung mundur seperti berjalan ke kiri di deretan angka. Kita menyebut bilangan yang makin kecil, satu demi satu.";
const SUARA_D7 = "Menghitung mundur sering dipakai saat bermain petak umpet. Sepuluh, sembilan, delapan, terus sampai satu, lalu cari temanmu!";

export const ADEGAN_MUNDUR: AdeganStory = {
  id: "hitung-mundur",
  judul: "Menghitung mundur: turun tangga",
  sumber: "Materi: menghitung mundur",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_D1,
      tambah(0, judul("Menghitung mundur"), TANAH(), ...tangga(), labelTs(10), anakDi(10)),
      tambah("besar", ...kartu("kb", 14, 30, 120, 24, W.langit, ["dari besar ke kecil"], 9)),
      sorotkan("kecil.", "ts9"),
    ),
    k(SUARA_D2, ...langkahTangga(SUARA_D2, [10, 9, 8, 7, 6], "pelan-pelan.")),
    k(SUARA_D3, ...langkahTangga(SUARA_D3, [5, 4, 3, 2, 1], "turun.")),
    k(
      SUARA_D4,
      ubah("paling", { id: "kb-t0", isi: "sampai di bawah: 1" }, { id: "kb-k", warna: W.emas }),
      tambah("satu.", emo("pesta", 230, 176, PESTA, 26)),
    ),
    k(
      SUARA_D5,
      tambah("kiri,", emo("kr", 250, 180, "⬅️", 24)),
      tambah("bilangannya", ...kartu("kt", 20, 160, 190, 26, W.krem, ["makin ke kiri, makin kecil"], 9)),
    ),
    k(
      SUARA_D6,
      bersih(0),
      tambah(0, judul("Deretan angka"), ...deretBilangan("dm", 70)),
      tambah("berjalan", emo("up", 273, 66, ANAK, 20)),
      ubah("kiri", { id: "up", x: 33 }),
      tambah("makin", ...kartu("ar", 50, 116, 200, 30, W.emas, ["10 9 8 ... 1: makin kecil"], 10), emo("pn", 40, 170, "⬅️", 24)),
    ),
    k(
      SUARA_D7,
      bersih(0),
      tambah(0, judul("Petak umpet")),
      tambah("petak", emo("pu", 150, 100, "\u{1F648}", 50)),
      tambah("Sepuluh,", ...kartu("pm", 30, 124, 240, 34, W.emas, ["10, 9, 8, ... 1"], 14)),
      tambah("cari", teks("cr", 150, 184, "lalu cari temanmu!", 11, W.ungu)),
      hapus("lalu", "pu"),
      tambah("lalu", emo("pu2", 150, 96, "\u{1F440}", 40)),
    ),
  ],
};
