import type { AdeganStory, Obj } from "./logika-story";
import { W, bulat, emo, garis, judul, kartu, kotak, teks } from "./k1b1b-gambar";
import { bersih, idx, k, sorotkan, tambah, ubah } from "./k1b1b-bantu";
import { NAMA_METODE, NAMA_METODE_ID, WARNA_METODE, kepala } from "./k1b1b-luar-1";

/** Garis bilangan nol sampai sepuluh: garis lurus, 11 garis tanda (`gk{i}`), dan 11 angka (`gl{i}`). Bilangan ke-i berada di x = 20 + 26 * i. */
const GX = (i: number): number => 20 + 26 * i;
const sumbu = (): Obj[] => [garis("gs", 14, 100, 272, 0, W.biru, 2.5)];
const tandaGaris = (): Obj[] => Array.from({ length: 11 }, (_, i) => i).flatMap((i) => [garis(`gk${i}`, GX(i), 93, 0, 14, W.biru, 1.8), teks(`gl${i}`, GX(i), 124, String(i), 9, W.merah)]);

/* ------------------------------ 1. Number Line Mini: konsep ------------------------------ */
const SUARA_E1 = "Metode ketiga, Number Line Mini, atau Garis Bilangan Kecil. Bilangan disusun berurutan pada sebuah garis.";
const SUARA_E2 = "Kita mulai dari nol di sebelah kiri. Makin ke kanan, bilangannya makin besar, sampai sepuluh.";
const SUARA_E3 = "Bilangan yang letaknya lebih ke kiri lebih sedikit, dan yang lebih ke kanan lebih banyak.";
const SUARA_E4 = "Garis ini membantu kita membayangkan urutan bilangan dengan jelas.";

export const ADEGAN_LUAR_GARIS: AdeganStory = {
  id: "luar-garis",
  judul: "Number Line Mini: bilangan di garis",
  sumber: "Metode luar: Number Line Mini",
  latar: "#FAF5FF",
  ketukan: [
    k(SUARA_E1, tambah("ketiga,", ...kepala(2)), tambah("pada", ...sumbu()), tambah(idx(SUARA_E1, "garis", 2), ...tandaGaris())),
    k(SUARA_E2, sorotkan("nol", "gl0"), sorotkan("sepuluh.", "gl10")),
    k(
      SUARA_E3,
      tambah("kiri", teks("gq", 60, 160, "kiri: sedikit", 10, W.biru)),
      tambah("kanan", teks("gr", 240, 160, "kanan: banyak", 10, W.hijau)),
    ),
    k(SUARA_E4, tambah("membantu", emo("ow", 150, 190, "\u{1F989}", 26)), tambah("urutan", teks("gu", 60, 188, "urutan bilangan", 9.6, W.ungu))),
  ],
};

/* ------------------------------ 2. Number Line Mini: terapan ------------------------------ */
const SUARA_F1 = "Sekarang kita letakkan lima dan delapan pada garis. Kita taruh seekor katak di angka lima.";
const SUARA_F2 = "Katak melompat ke kanan: enam, tujuh, delapan. Katak berhenti di angka delapan.";
const SUARA_F3 = "Delapan ada di sebelah kanan lima, jadi delapan lebih banyak dari lima.";
const SUARA_F4 = "Sebaliknya, lima ada di sebelah kiri, jadi lima lebih sedikit dari delapan.";

export const ADEGAN_LUAR_GARIS_TERAPAN: AdeganStory = {
  id: "luar-garis-terapan",
  judul: "Number Line Mini: katak melompat",
  sumber: "Metode luar: Number Line Mini, terapan",
  latar: "#FAF5FF",
  ketukan: [
    k(
      SUARA_F1,
      tambah(0, ...kepala(2), ...sumbu(), ...tandaGaris()),
      tambah(idx(SUARA_F1, "lima", 2), bulat("p5", GX(5), 100, 5, W.merah, W.merah), emo("ktk", GX(5), 82, "\u{1F438}", 26)),
      sorotkan(idx(SUARA_F1, "lima", 2), "gl5"),
    ),
    k(
      SUARA_F2,
      ubah("enam,", { id: "ktk", x: GX(6) }),
      ubah("tujuh,", { id: "ktk", x: GX(7) }),
      ubah(idx(SUARA_F2, "delapan.", 1), { id: "ktk", x: GX(8) }),
      tambah(idx(SUARA_F2, "delapan.", 2), bulat("p8", GX(8), 100, 5, W.hijau, W.hijau)),
    ),
    k(SUARA_F3, tambah("jadi", ...kartu("f1", 50, 146, 200, 22, W.emas, ["8 lebih banyak dari 5"], 10))),
    k(SUARA_F4, tambah("jadi", ...kartu("f2", 50, 174, 200, 22, W.langit, ["5 lebih sedikit dari 8"], 10))),
  ],
};

/* ------------------------------ 3. Ringkasan tiga metode ------------------------------ */
const SUARA_R1 = "Mari kita ringkas tiga metode dari luar tadi.";
const SUARA_R2 = "Number Names: ucapkan nama bilangan dan tulis lambangnya.";
const SUARA_R3 = "Ten Frame: isi titik pada bingkai sepuluh kotak. Number Line Mini: makin ke kanan, makin banyak.";
const SUARA_R4 = "Ketiganya membantu kita membandingkan banyak benda dengan benar. Terima kasih sudah belajar.";
const DESKRIPSI = ["ucapkan nama, tulis lambang", "10 kotak, isi titik", "makin ke kanan, makin banyak"];
const kartuMetode = (i: number): Obj[] => [kotak(`rm${i}-k`, 14, 34 + i * 54, 272, 46, WARNA_METODE[i], W.biru, { rx: 8, tebal: 1.5 }), teks(`rm${i}-n`, 150, 34 + i * 54 + 19, `${NAMA_METODE[i]} · ${NAMA_METODE_ID[i]}`, 10, W.biru)];
const deskripsi = (i: number): Obj => teks(`rm${i}-d`, 150, 34 + i * 54 + 36, DESKRIPSI[i], 8.8, W.merah);

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan tiga metode dari luar",
  sumber: "Ringkasan metode luar",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_R1, tambah(0, judul("Ringkasan")), tambah("ringkas", ...kartuMetode(0)), tambah("tiga", ...kartuMetode(1)), tambah("luar", ...kartuMetode(2))),
    k(SUARA_R2, sorotkan("Names:", "rm0-k"), tambah("ucapkan", deskripsi(0))),
    k(SUARA_R3, sorotkan("Frame:", "rm1-k"), tambah("titik", deskripsi(1)), tambah("Line", deskripsi(2)), sorotkan("Mini:", "rm2-k")),
    k(
      SUARA_R4,
      bersih(0),
      tambah(0, judul("Terima kasih"), emo("ow", 150, 100, "\u{1F989}", 54)),
      tambah("membantu", ...kartu("rz", 60, 124, 180, 34, W.emas, ["membandingkan benda"], 11)),
      tambah("Terima", teks("rt", 150, 184, "Sampai jumpa!", 12, W.ungu)),
    ),
  ],
};
