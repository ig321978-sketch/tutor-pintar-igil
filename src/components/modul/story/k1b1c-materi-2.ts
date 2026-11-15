import type { AdeganStory } from "./logika-story";
import { W, bulat, deretBilangan, emo, garis, judul, kartu, kartuAngka, teks } from "./k1b1c-gambar";
import { bersih, hapus, k, langkahDeret, redamkan, sorotkan, tambah, ubah, urutKata } from "./k1b1c-bantu";

const ANAK = "\u{1F9D2}";
const IGIL = "\u{1F989}";
const KATAK = "\u{1F438}";
const x = (v: number): number => 33 + 26 * (v - 1);

/* ------------------------------ 1. Mulai dari bilangan mana saja ------------------------------ */
const SUARA_A1 = "Kita boleh mulai menghitung dari bilangan mana saja. Misalnya, kita mulai dari bilangan empat.";
const SUARA_A2 = "Ayo menghitung maju dari empat. Empat, lima, enam, tujuh, delapan.";
const SUARA_A3 = "Bilangannya makin besar, sama seperti tadi. Hanya awalnya yang berbeda. Jadi kita tidak harus selalu mulai dari satu.";
const SUARA_A4 = "Sekarang kita menghitung mundur dari bilangan delapan. Delapan, tujuh, enam, lima, empat.";
const SUARA_A5 = "Bilangannya makin kecil, sama seperti turun tangga tadi. Kita bisa mulai dan berhenti di bilangan mana saja.";
const SUARA_A6 = "Yang penting, kita menyebut bilangan dengan urutan yang benar, tanpa ada yang terlewat.";

export const ADEGAN_MULAI: AdeganStory = {
  id: "mulai-mana-saja",
  judul: "Mulai dari bilangan mana saja",
  sumber: "Materi: mulai dari mana saja",
  latar: "#FEFCE8",
  ketukan: [
    k(
      SUARA_A1,
      tambah(0, judul("Mulai dari mana saja"), ...deretBilangan("dr", 80)),
      tambah("empat.", emo("up", x(4), 76, ANAK, 20)),
      sorotkan("empat.", "drk4"),
    ),
    k(SUARA_A2, ...langkahDeret(SUARA_A2, [4, 5, 6, 7, 8], "dr", 80, "empat.")),
    k(SUARA_A3, tambah("makin", ...kartu("m1", 40, 124, 220, 30, W.hijauMuda, ["maju dari 4: 4 5 6 7 8"], 10)), tambah("awalnya", emo("pn", 150, 184, "➡️", 24))),
    k(
      SUARA_A4,
      hapus(0, "m1-k", "m1-t0", "pn"),
      redamkan(0, "drk4", "drk5", "drk6", "drk7"),
      ...langkahDeret(SUARA_A4, [8, 7, 6, 5, 4], "dr", 80, "delapan."),
    ),
    k(
      SUARA_A5,
      tambah("makin", ...kartu("m2", 40, 124, 220, 30, W.langit, ["mundur dari 8: 8 7 6 5 4"], 10)),
      tambah("berhenti", emo("pm", 150, 184, "⬅️", 24)),
    ),
    k(SUARA_A6, tambah("urutan", emo("ok", 60, 184, "✅", 32)), tambah("terlewat.", teks("tl", 235, 190, "urutan benar", 10, W.hijau))),
  ],
};

/* ------------------------------ 2. Sebelum dan sesudah ------------------------------ */
const SUARA_B1 = "Lihat katak di atas batu bernomor enam. Katak ini suka melompat dari batu ke batu.";
const SUARA_B2 = "Katak melompat maju satu batu ke kanan. Sekarang katak ada di batu tujuh.";
const SUARA_B3 = "Katak kembali ke batu enam. Lalu katak melompat mundur satu batu ke kiri. Sekarang katak ada di batu lima.";
const SUARA_B4 = "Batu enam ada di antara batu lima dan batu tujuh. Batu lima ada di kirinya, dan batu tujuh ada di kanannya.";
const SUARA_B5 = "Bilangan di sebelah kiri disebut sebelum. Bilangan di sebelah kanan disebut sesudah.";
const SUARA_B6 = "Jadi, sebelum enam adalah lima, dan sesudah enam adalah tujuh. Ayo, ucapkan bersama-sama.";

export const ADEGAN_SEBELUM: AdeganStory = {
  id: "sebelum-sesudah",
  judul: "Sebelum dan sesudah: katak di batu",
  sumber: "Materi: sebelum dan sesudah",
  latar: "#ECFEFF",
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, judul("Katak di batu enam"), ...deretBilangan("bt", 80)),
      tambah("katak", emo("kt", x(6), 76, KATAK, 22)),
      sorotkan("enam.", "btk6"),
    ),
    k(
      SUARA_B2,
      ubah("melompat", { id: "kt", x: x(7) }),
      sorotkan("tujuh.", "btk7"),
      redamkan("tujuh.", "btk6"),
      tambah("maju", ...kartu("lm", 40, 124, 220, 30, W.hijauMuda, ["maju satu: dari 6 ke 7"], 10)),
    ),
    k(
      SUARA_B3,
      hapus(0, "lm-k", "lm-t0"),
      ubah("kembali", { id: "kt", x: x(6) }),
      ubah("lima.", { id: "kt", x: x(5) }),
      sorotkan("lima.", "btk5"),
      redamkan("kembali", "btk7"),
      tambah("mundur", ...kartu("lk", 40, 124, 220, 30, W.langit, ["mundur satu: dari 6 ke 5"], 10)),
    ),
    k(
      SUARA_B4,
      hapus(0, "lk-k", "lk-t0"),
      ubah("enam", { id: "kt", x: x(6) }),
      tambah("lima", teks("lb", x(5), 64, "sebelum", 8, W.merah)),
      tambah("tujuh.", teks("ld", x(7), 64, "sesudah", 8, W.hijau)),
      sorotkan("tujuh.", "btk7"),
    ),
    k(
      SUARA_B5,
      redamkan(0, "btk5", "btk7"),
      tambah("kiri", ...kartu("sb", 14, 120, 134, 30, W.merahMuda, ["sebelum 6 itu 5"], 10)),
      tambah("kanan", ...kartu("ss", 152, 120, 134, 30, W.hijauMuda, ["sesudah 6 itu 7"], 10)),
    ),
    k(SUARA_B6, sorotkan("sebelum", "sb-k"), sorotkan("sesudah", "ss-k"), tambah("bersama-sama.", emo("ig", 150, 184, IGIL, 30))),
  ],
};

/* ------------------------------ 3. Hitung berantai ------------------------------ */
const SUARA_R1 = "Upe, Kira, Malosi, dan Wei bermain hitung berantai di taman. Mereka berdiri berbaris.";
const SUARA_R2 = "Upe menyebut bilangan tiga. Kartu angka tiga ada di depan Upe.";
const SUARA_R3 = "Kira melanjutkan dengan menyebut empat. Bilangan sesudah tiga adalah empat.";
const SUARA_R4 = "Malosi menyebut lima. Lalu Wei menyebut enam.";
const SUARA_R5 = "Hebat! Hitung berantai berjalan lancar. Setiap anak menyebut bilangan sesudah temannya, tanpa ada yang terlewat.";
const SUARA_R6 = "Sesudah enam datang tujuh. Sesudah tujuh datang delapan. Hitung berantai bisa terus berlanjut.";
const KIDS: [string, number, string][] = [["Upe", 45, "Upe,"], ["Kira", 115, "Kira,"], ["Malosi", 185, "Malosi,"], ["Wei", 255, "Wei"]];

export const ADEGAN_BERANTAI: AdeganStory = {
  id: "hitung-berantai",
  judul: "Hitung berantai di taman",
  sumber: "Materi: hitung berantai",
  latar: "#F5F3FF",
  ketukan: [
    k(
      SUARA_R1,
      tambah(0, judul("Hitung berantai")),
      ...KIDS.map(([nama, px, pemicu]) => tambah(pemicu, emo(`h-${nama}`, px, 130, ANAK, 30), teks(`hn-${nama}`, px, 146, nama, 8.4))),
      tambah("berbaris.", emo("ig", 150, 66, IGIL, 30)),
    ),
    k(SUARA_R2, tambah("tiga.", ...kartuAngka("k3", 25, 156, "3", W.merahMuda, 40, 36, 22)), sorotkan("Upe.", "h-Upe")),
    k(SUARA_R3, tambah("empat.", ...kartuAngka("k4", 95, 156, "4", W.langit, 40, 36, 22)), tambah("sesudah", emo("a1", 80, 126, "➡️", 18))),
    k(SUARA_R4, tambah("lima.", ...kartuAngka("k5", 165, 156, "5", W.hijauMuda, 40, 36, 22)), tambah("enam.", ...kartuAngka("k6", 235, 156, "6", W.krem, 40, 36, 22))),
    k(SUARA_R5, tambah("Hebat!", teks("hb", 150, 98, "Hebat!", 14, W.hijau)), tambah("sesudah", emo("a2", 150, 126, "➡️", 18), emo("a3", 220, 126, "➡️", 18))),
    k(
      SUARA_R6,
      bersih(0),
      tambah(0, judul("Terus berlanjut")),
      tambah("enam.", ...kartuAngka("e6", 30, 70, "6", W.krem, 60, 60, 34)),
      tambah("tujuh.", ...kartuAngka("e7", 120, 70, "7", W.langit, 60, 60, 34), emo("f1", 105, 108, "➡️", 22)),
      tambah("delapan.", ...kartuAngka("e8", 210, 70, "8", W.hijauMuda, 60, 60, 34), emo("f2", 195, 108, "➡️", 22)),
    ),
  ],
};

/* ------------------------------ 4. Hubungkan titik ------------------------------ */
const SUARA_T1 = "Kira punya kertas bergambar titik-titik. Setiap titik punya nomor, dari satu sampai sepuluh.";
const SUARA_T2 = "Mulai dari satu, tarik garis ke dua, tiga, empat, lima.";
const SUARA_T3 = "Terus berurutan: enam, tujuh, delapan, sembilan, sampai sepuluh.";
const SUARA_T4 = "Lihat! Garis-garis itu membentuk perahu layar yang bagus sekali. Wah, Kira pasti sangat senang.";
const SUARA_T5 = "Menghubungkan titik secara berurutan melatih kita menghitung maju, dari satu sampai sepuluh, tanpa ada yang terlewat.";
const TITIK: [number, number, number, number][] = [
  [40, 125, 28, 121],
  [65, 155, 53, 160],
  [110, 170, 110, 184],
  [170, 170, 170, 184],
  [225, 155, 237, 160],
  [255, 125, 267, 121],
  [150, 125, 138, 137],
  [150, 50, 161, 48],
  [215, 100, 227, 100],
  [150, 100, 138, 98],
];
const pos2 = urutKata(SUARA_T2, ["dua", "tiga", "empat", "lima"], "satu,");
const pos3 = urutKata(SUARA_T3, ["enam", "tujuh", "delapan", "sembilan", "sepuluh"], "berurutan:");
const garisKe = (i: number) => garis(`tg${i}`, TITIK[i - 1][0], TITIK[i - 1][1], TITIK[i][0] - TITIK[i - 1][0], TITIK[i][1] - TITIK[i - 1][1], W.merah, 2.4, { gambar: true });

export const ADEGAN_TITIK: AdeganStory = {
  id: "hubungkan-titik",
  judul: "Menghubungkan titik berurutan",
  sumber: "Materi: hubungkan titik",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Hubungkan titik")),
      tambah("titik-titik.", ...TITIK.flatMap(([px, py, lx, ly], i) => [bulat(`tt${i}`, px, py, 4, W.biru, undefined), teks(`tn${i}`, lx, ly, String(i + 1), 9, W.biru)])),
    ),
    k(SUARA_T2, ...pos2.map((p, i) => tambah(p, garisKe(i + 1)))),
    k(SUARA_T3, ...pos3.map((p, i) => tambah(p, garisKe(i + 5)))),
    k(SUARA_T4, tambah("perahu", emo("pr", 100, 92, "⛵", 30)), tambah("bagus", teks("bg", 70, 60, "Bagus sekali!", 11, W.hijau))),
    k(
      SUARA_T5,
      bersih(0),
      tambah(0, judul("Maju dari satu sampai sepuluh")),
      tambah("Menghubungkan", ...kartu("tk", 40, 64, 220, 34, W.krem, ["1, 2, 3, 4, 5, 6, 7, 8, 9, 10"], 11)),
      tambah("tanpa", emo("ow", 150, 150, IGIL, 40)),
    ),
  ],
};
