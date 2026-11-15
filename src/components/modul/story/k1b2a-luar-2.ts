import type { AdeganStory } from "./logika-story";
import { BIRU_BENDA, KUNING_MOBIL, MERAH_MOBIL, OWL, W, emo, ikatan, kartu, kepingBingkai, kotak, mobil, selBingkai, teks } from "./k1b2a-gambar";
import { bersih, hapus, k, redamkan, sorotkan, tambah, ubah } from "./k1b2a-bantu";
import { NAMA_METODE, NAMA_METODE_ID, WARNA_METODE, kepala } from "./k1b2a-luar-1";

/* ------------------------------ 1. Part-Part-Whole: terapan ------------------------------ */
const SUARA_Q1 = "Terapkan pada mobil Malosi. Empat mobil kuning dan empat mobil merah. Itu dua bagian yang sama banyak.";
const SUARA_Q2 = "Bagian pertama empat mobil kuning. Bagian kedua empat mobil merah.";
const SUARA_Q3 = "Gabungkan dua bagian itu. Jumlahnya delapan mobil.";
const SUARA_Q4 = "Empat ditambah empat sama dengan delapan. Dua bagian dan jumlahnya selalu cocok.";
const KIRI = [24, 60, 96, 132];
const KANAN = [168, 204, 240, 276];

export const ADEGAN_LUAR_BAGIAN_TERAPAN: AdeganStory = {
  id: "luar-bagian-terapan",
  judul: "Part-Part-Whole: mobil Malosi",
  sumber: "Metode luar: Part-Part-Whole, terapan",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_Q1,
      tambah("pada", ...kepala(1)),
      tambah("kuning", ...KIRI.flatMap((x, i) => mobil(`lm${i}`, x, 176, KUNING_MOBIL))),
      tambah("merah.", ...KANAN.flatMap((x, i) => mobil(`lm${i + 4}`, x, 176, MERAH_MOBIL))),
    ),
    k(SUARA_Q2, tambah("Bagian", ...ikatan("iq", 150, 78, ["?", "4", "4"], ["a", "b"]))),
    k(SUARA_Q3, tambah("Gabungkan", ...ikatan("iq", 150, 78, ["?", "4", "4"], ["u"])), ubah("delapan", { id: "iq-ut", isi: "8" })),
    k(SUARA_Q4, hapus(0, ...Array.from({ length: 8 }, (_, i) => `lm${i}`).flatMap((id) => [id, `${id}-x`, `${id}-r1`, `${id}-r2`])), tambah("Empat", ...kartu("qj", 70, 160, 160, 30, W.emas, ["4 + 4 = 8"], 14))),
  ],
};

/* ------------------------------ 2. Ten Frame Add: konsep ------------------------------ */
const SUARA_B1 = "Metode ketiga, Ten Frame Add, atau Jumlah di Bingkai Sepuluh. Gabungkan benda di bingkai.";
const SUARA_B2 = "Lima keping merah mengisi baris atas. Baris atas sudah penuh.";
const SUARA_B3 = "Tiga keping biru mengisi baris bawah. Lima ditambah tiga sama dengan delapan.";
const SUARA_B4 = "Delapan petak terisi dan dua petak masih kosong. Jadi jumlahnya delapan.";
const BX = 25;
const BY = 54;
const SEL = 50;

export const ADEGAN_LUAR_BINGKAI: AdeganStory = {
  id: "luar-bingkai",
  judul: "Ten Frame Add: bingkai sepuluh",
  sumber: "Metode luar: Ten Frame Add",
  latar: "#FDF4FF",
  ketukan: [
    k(SUARA_B1, tambah("ketiga,", ...kepala(2)), tambah("bingkai.", ...selBingkai("bk", BX, BY, SEL)), tambah("Sepuluh.", teks("b10", 150, 176, "10 petak", 11, W.ungu))),
    k(SUARA_B2, tambah("Lima", ...kepingBingkai("kb", BX, BY, 0, 5, W.merah, SEL))),
    k(SUARA_B3, hapus(0, "b10"), tambah("Tiga", ...kepingBingkai("kb", BX, BY, 5, 8, BIRU_BENDA, SEL)), tambah("Lima", ...kartu("bj", 80, 164, 140, 28, W.emas, ["5 + 3 = 8"], 13))),
    k(SUARA_B4, sorotkan("petak", "bk-c8", "bk-c9"), tambah("Jadi", emo("bo", 262, 196, OWL, 26))),
  ],
};

/* ------------------------------ 3. Ten Frame Add: terapan ------------------------------ */
const SUARA_R1 = "Terapkan pada kelereng Upe. Ada tujuh kelereng biru di bingkai sepuluh.";
const SUARA_R2 = "Wei menambahkan tiga kelereng lagi. Ketuk tiga petak yang masih kosong di layar.";
const SUARA_R3 = "Tujuh ditambah tiga sama dengan sepuluh. Bingkainya penuh.";
const SUARA_R4 = "Cara ini cepat karena kita bisa melihat sepuluh petak sekilas. Bingkai yang penuh selalu berarti sepuluh.";

export const ADEGAN_LUAR_BINGKAI_TERAPAN: AdeganStory = {
  id: "luar-bingkai-terapan",
  judul: "Ten Frame Add: kelereng Upe",
  sumber: "Metode luar: Ten Frame Add, terapan",
  latar: "#FDF4FF",
  ketukan: [
    k(SUARA_R1, tambah("pada", ...kepala(2)), tambah("tujuh", ...selBingkai("rk", BX, BY, SEL), ...kepingBingkai("rg", BX, BY, 0, 7, BIRU_BENDA, SEL)), tambah("sepuluh.", teks("r10", 150, 176, "10 petak", 11, W.ungu))),
    k(SUARA_R2, tambah("tiga", ...kepingBingkai("rg", BX, BY, 7, 10, "#F472B6", SEL))),
    k(SUARA_R3, hapus(0, "r10"), tambah("Tujuh", ...kartu("rj", 70, 164, 160, 28, W.emas, ["7 + 3 = 10"], 13)), sorotkan("penuh.", ...Array.from({ length: 10 }, (_, i) => `rk-c${i}`))),
    k(SUARA_R4, redamkan(0, ...Array.from({ length: 10 }, (_, i) => `rk-c${i}`)), tambah("Bingkai", emo("ro", 262, 196, "✅", 28))),
  ],
};

/* ------------------------------ 4. Ringkasan tiga metode ------------------------------ */
const SUARA_Z1 = "Mari kita ringkas tiga metode dari luar tadi.";
const SUARA_Z2 = "Counting On: mulai dari bilangan pertama, lalu maju. Part-Part-Whole: dua bagian membentuk jumlah.";
const SUARA_Z3 = "Ten Frame Add: gabungkan benda di bingkai sampai penuh sepuluh.";
const SUARA_Z4 = "Tiga cara ini membantu kita menjumlahkan sampai sepuluh dengan cepat dan benar. Terima kasih sudah belajar.";
const DESKRIPSI = ["mulai dari bilangan pertama, lalu maju", "dua bagian membentuk jumlah", "gabung benda sampai 10"];
const kartuMetode = (i: number) => [
  kotak(`rm${i}-k`, 14, 34 + i * 54, 272, 46, WARNA_METODE[i], W.biru, { rx: 8, tebal: 1.5 }),
  teks(`rm${i}-n`, 150, 34 + i * 54 + 19, `${NAMA_METODE[i]} · ${NAMA_METODE_ID[i]}`, 8.6, W.biru),
];
const deskripsi = (i: number) => teks(`rm${i}-d`, 150, 34 + i * 54 + 36, DESKRIPSI[i], 8.8, W.merah);

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan tiga metode dari luar",
  sumber: "Ringkasan metode luar",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_Z1, tambah(0, teks("rj", 150, 20, "Tiga metode dari luar", 11, W.ungu)), tambah("ringkas", ...[0, 1, 2].flatMap(kartuMetode))),
    k(SUARA_Z2, tambah("Counting", deskripsi(0)), tambah("Part-Part-Whole:", deskripsi(1))),
    k(SUARA_Z3, tambah("Ten", deskripsi(2)), sorotkan("penuh", "rm2-k")),
    k(SUARA_Z4, bersih(0), tambah(0, teks("rj", 150, 20, "Terima kasih!", 12, W.ungu), emo("rs", 150, 110, OWL, 56)), tambah("sampai", teks("r10", 150, 170, "jumlah sampai 10", 12, W.merah))),
  ],
};
