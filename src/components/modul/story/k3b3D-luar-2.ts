import type { AdeganStory, Obj } from "./logika-story";
import { E, W, bulat, emo, garis, garisBil, judul, kartu, lantai, panah, potongan, teks, tokoh } from "./k3b3D-gambar";
import { bersih, k, redamkan, sorotkan, tambah, ubah } from "./k3b3D-bantu";

/*
 * Cerita orisinal IGIL "Bandul Dokter Hana" (Kelas 3 Bab 3 Sub-Bab D), video metode global.
 * Naskah suara dari naskah/story-naskah-k3b3d.md. Bagian ini: Double Number Line (Garis Bilangan Ganda), Chunking (Pecah Seribu-Seribu), terapannya, dan ringkasan.
 */

/** Garis bilangan tanpa angka dari x0 sampai x1 di tinggi y, dengan `n` tanda: garis `${id}-g`, tanda `${id}-t0`... */
const garisKosong = (id: string, x0: number, x1: number, y: number, n: number, warna: string = W.biru): Obj[] => [
  garis(`${id}-g`, x0, y, x1 - x0, 0, warna, 2.2),
  ...Array.from({ length: n + 1 }, (_, i) => garis(`${id}-t${i}`, Math.round(x0 + ((x1 - x0) * i) / n), y - 4, 0, 8, warna, 1.6)),
];
const ribuanStr = (n: number): string => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".");

/* ------------------------------ Double Number Line: konsep ------------------------------ */
const SUARA_G1 = "Cara kedua, Double Number Line, atau Garis Bilangan Ganda.";
const SUARA_G2 = "Dua garis sejajar: garis atas untuk kilogram, garis bawah untuk gram.";
const SUARA_G3 = "Satu kilogram sejajar dengan seribu gram, dua kilogram dengan dua ribu gram.";
const SUARA_G4 = "Kita membaca pasangan ukuran yang sejajar, tanpa menghitung lagi.";

export const ADEGAN_LUAR_GARIS_GANDA: AdeganStory = {
  id: "luar-garis-ganda",
  judul: "Double Number Line atau Garis Bilangan Ganda",
  sumber: "Metode global: Garis Bilangan Ganda",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_G1,
      tambah(0, judul("Double Number Line")),
      tambah("Double", ...garisKosong("la", 30, 270, 76, 3, W.kg), ...garisKosong("lb", 30, 270, 132, 3, W.gr)),
      tambah("Line,", teks("nm", 150, 160, "Double Number Line", 12, W.kg)),
      tambah("Garis", teks("nm2", 150, 178, "Garis Bilangan Ganda", 9, W.ungu)),
    ),
    k(
      SUARA_G2,
      { at: 0, hapus: ["nm", "nm2"] },
      tambah("Dua", teks("n2", 250, 44, "2 garis", 10, W.ungu)),
      tambah("atas", teks("ta", 30, 56, "garis atas: kilogram", 10, W.kg, { anchor: "start" })),
      sorotkan("kilogram,", "la-g"),
      tambah("bawah", teks("tb", 30, 152, "garis bawah: gram", 10, W.gr, { anchor: "start" })),
      sorotkan(10, "lb-g"),
    ),
    k(
      SUARA_G3,
      { at: 0, hapus: ["ta", "tb", "n2"] },
      tambah("Satu", teks("a1", 110, 64, "1", 9, W.kg)),
      tambah("sejajar", garis("v1", 110, 76, 0, 56, W.ungu, 1.8)),
      tambah("seribu", teks("b1", 110, 148, "1.000", 8, W.gr)),
      tambah("dua", teks("a2", 190, 64, "2", 9, W.kg)),
      tambah("dengan@2", garis("v2", 190, 76, 0, 56, W.ungu, 1.8)),
      tambah("dua@2", teks("b2", 190, 148, "2.000", 8, W.gr)),
    ),
    k(
      SUARA_G4,
      tambah("pasangan", teks("a3", 270, 64, "3", 9, W.kg), garis("v3", 270, 76, 0, 56, W.ungu, 1.8), teks("b3", 270, 148, "3.000", 8, W.gr)),
      sorotkan("sejajar,", "v1", "v2", "v3"),
      tambah(8, emo("ok", 150, 108, E.benar, 26)),
    ),
  ],
};

/* ------------------------------ Double Number Line: terapan ------------------------------ */
const SUARA_H1 = "Salsa menandai tiga kilogram di garis atas.";
const SUARA_H2 = "Ia melihat garis bawah tepat di bawahnya, dan tertulis tiga ribu gram.";
const SUARA_H3 = "Cocok untuk melihat pasangan ukuran.";
const SUARA_H4 = "Kurang cocok kalau bilangannya besar sekali, karena garisnya harus sangat panjang.";

export const ADEGAN_LUAR_GARIS_GANDA_TERAPAN: AdeganStory = {
  id: "luar-garis-ganda-terapan",
  judul: "Salsa menandai tiga kilogram",
  sumber: "Metode global: terapan Garis Bilangan Ganda",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_H1,
      tambah(0, judul("Salsa Menandai Berat"), ...lantai("tn", 150), ...tokoh("sl", 36, 184, "Salsa")),
      tambah("tiga", ...garisBil("ga", 80, 76, 70, 0, 3, 1, W.kg, true, (n) => String(n), 9), teks("lk", 58, 80, "kg", 11, W.kg)),
      tambah("kilogram", bulat("m1", 290, 76, 5, "#F59E0B", W.biru, { z: 2 }), teks("m1t", 266, 50, "3 kg", 11, W.kg)),
    ),
    k(
      SUARA_H2,
      tambah("bawah", ...garisBil("gb", 80, 132, 70, 0, 3, 1, W.gr, false, (n) => (n === 0 ? "0" : ribuanStr(n * 1000)), 8), teks("lg", 58, 136, "g", 11, W.gr)),
      tambah("tepat", garis("cv", 290, 76, 0, 56, W.ungu, 1.8), bulat("m2", 290, 132, 5, "#F59E0B", W.biru, { z: 2 })),
      tambah("tiga", teks("m2t", 262, 170, "3.000 g", 14, W.hijauTua)),
    ),
    k(
      SUARA_H3,
      tambah("Cocok", emo("ok", 150, 106, E.benar, 26)),
      sorotkan("pasangan", "cv"),
    ),
    k(
      SUARA_H4,
      bersih(0),
      tambah(0, judul("Bilangan Sangat Besar")),
      tambah("bilangannya", teks("bb", 150, 56, "bilangan besar sekali", 11, W.merah)),
      tambah("garisnya", ...garisKosong("gl", 8, 292, 100, 28, W.biru)),
      tambah("sangat", teks("sp", 150, 132, "garis sangat panjang", 10, W.merah)),
      tambah("panjang.", emo("xs", 150, 172, E.salah, 26)),
    ),
  ],
};

/* ------------------------------ Chunking: konsep ------------------------------ */
const SUARA_C1 = "Cara ketiga, Chunking, atau Pecah Seribu-Seribu.";
const SUARA_C2 = "Bilangan gram dipecah menjadi potongan seribu-seribu dan sisanya.";
const SUARA_C3 = "Tiap seribu gram menjadi satu kilogram.";
const SUARA_C4 = "Sisa gram ditulis di belakang kilogram.";

export const ADEGAN_LUAR_PECAH: AdeganStory = {
  id: "luar-pecah",
  judul: "Chunking atau Pecah Seribu-Seribu",
  sumber: "Metode global: Pecah Seribu-Seribu",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_C1,
      tambah(0, judul("Chunking")),
      tambah("Cara", ...potongan("c0", 30, 60, 70, 36, W.langit, W.kg, "1.000", 12)),
      tambah("ketiga,", ...potongan("c1", 110, 60, 70, 36, W.langit, W.kg, "1.000", 12)),
      tambah("atau", ...potongan("c2", 190, 60, 70, 36, W.langit, W.kg, "1.000", 12)),
      tambah("Chunking,", teks("nm", 150, 134, "Chunking", 14, W.kg)),
      tambah("Pecah", teks("nm2", 150, 158, "Pecah Seribu-Seribu", 10, W.ungu)),
    ),
    k(
      SUARA_C2,
      bersih(0),
      tambah(0, judul("Dipecah Seribu-Seribu")),
      tambah("gram", teks("tg", 150, 50, "bilangan gram", 11, W.biru)),
      tambah("dipecah", ...potongan("d0", 41, 64, 56, 40, W.langit, W.kg, "1.000", 12)),
      tambah("menjadi", ...potongan("d1", 99, 64, 56, 40, W.langit, W.kg, "1.000", 12)),
      tambah("potongan", ...potongan("d2", 157, 64, 56, 40, W.langit, W.kg, "1.000", 12)),
      sorotkan("seribu-seribu", "d0", "d1", "d2"),
      tambah("sisanya.", ...potongan("ds", 215, 64, 44, 40, W.krem, W.sisa, "sisa", 10)),
    ),
    k(
      SUARA_C3,
      tambah("menjadi", panah("q0", 69, 108, 0, 10, W.biru, 2), panah("q1", 127, 108, 0, 10, W.biru, 2), panah("q2", 185, 108, 0, 10, W.biru, 2)),
      tambah("satu", teks("k0", 69, 132, "1 kg", 11, W.kg), teks("k1", 127, 132, "1 kg", 11, W.kg), teks("k2", 185, 132, "1 kg", 11, W.kg)),
    ),
    k(
      SUARA_C4,
      sorotkan("Sisa", "ds"),
      tambah("gram", teks("sg", 237, 132, "sisa g", 11, W.sisa)),
      tambah("ditulis", teks("tl", 150, 166, "… kg … g", 20, W.hijauTua)),
      tambah(5, emo("ok", 262, 166, E.benar, 22)),
    ),
  ],
};

/* ------------------------------ Chunking: terapan ------------------------------ */
const SUARA_D1 = "Raka memecah tiga ribu delapan ratus gram.";
const SUARA_D2 = "Tiga ribu menjadi tiga kilogram, sisanya delapan ratus gram.";
const SUARA_D3 = "Jadi tiga kilogram delapan ratus gram.";
const SUARA_D4 = "Cocok untuk gram ke kilogram, tetapi kurang cocok untuk kilogram ke gram, karena arahnya terbalik.";

export const ADEGAN_LUAR_PECAH_TERAPAN: AdeganStory = {
  id: "luar-pecah-terapan",
  judul: "Raka memecah tiga ribu delapan ratus gram",
  sumber: "Metode global: terapan Pecah Seribu-Seribu",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_D1,
      tambah(0, judul("Raka Memecah Berat"), ...lantai("tn", 150), ...tokoh("rk", 36, 184, "Raka")),
      tambah("tiga", ...potongan("bar", 70, 52, 214, 28, W.langit, W.kg, "3.800 g", 14)),
    ),
    k(
      SUARA_D2,
      tambah("Tiga", teks("t3k", 146, 94, "3.000 g", 14, W.biru)),
      tambah("tiga@2", ...potongan("p0", 70, 100, 51, 28, W.langit, W.kg, "1.000", 10), ...potongan("p1", 123, 100, 51, 28, W.langit, W.kg, "1.000", 10), ...potongan("p2", 176, 100, 51, 28, W.langit, W.kg, "1.000", 10)),
      tambah("kilogram,", teks("t3", 146, 152, "3 kg", 14, W.kg)),
      tambah("delapan", ...potongan("ps", 229, 100, 41, 28, W.krem, W.sisa, "800 g", 10)),
    ),
    k(
      SUARA_D3,
      tambah("tiga", teks("hs", 150, 176, "3 kg", 22, W.hijauTua)),
      ubah("delapan", { id: "hs", isi: "3 kg 800 g" }),
      tambah(5, emo("ok", 262, 170, E.benar, 26)),
    ),
    k(
      SUARA_D4,
      bersih(0),
      tambah(0, judul("Arah yang Cocok")),
      tambah("gram", teks("a1", 56, 76, "g", 22, W.gr), panah("p1", 86, 72, 120, 0, W.hijau, 2.6), teks("a2", 244, 76, "kg", 22, W.kg)),
      tambah("kilogram,", emo("ok", 150, 50, E.benar, 22)),
      tambah("kilogram@2", teks("b1", 56, 136, "kg", 22, W.kg), panah("p2", 86, 132, 120, 0, W.merah, 2.6), teks("b2", 244, 136, "g", 22, W.gr)),
      tambah("terbalik.", teks("tb", 150, 170, "arahnya terbalik", 11, W.merah), emo("xs", 150, 112, E.salah, 22)),
    ),
  ],
};

/* ------------------------------ Ringkasan ------------------------------ */
const SUARA_R1 = "Tiga cara sudah kita lihat. Mana yang pas tergantung kebutuhan.";
const SUARA_R2 = "Ingin angka yang rapi, pakai Tabel Tempat Angka. Ingin melihat pasangan ukuran, pakai Garis Bilangan Ganda.";
const SUARA_R3 = "Ingin mengubah gram ke kilogram, pakai Pecah Seribu-Seribu. Apa pun caranya, satuan yang sama dihitung bersama.";
const SUARA_R4 = "Menurutmu, untuk mengubah tiga kilogram menjadi gram, cara mana yang paling cepat?";

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan tiga cara",
  sumber: "Ringkasan: tiga cara mengubah satuan berat",
  latar: "#FEFCE8",
  ketukan: [
    k(
      SUARA_R1,
      tambah(0, judul("Mana yang Pas?"), teks("n3", 252, 44, "3 cara", 10, W.ungu)),
      tambah("cara", ...kartu("r0", 14, 60, 88, 46, W.langit, ["Tabel", "Tempat Angka"], 9), ...kartu("r1", 106, 60, 88, 46, W.hijauMuda, ["Garis", "Bilangan Ganda"], 9), ...kartu("r2", 198, 60, 88, 46, W.krem, ["Pecah", "Seribu-Seribu"], 9)),
      tambah("Mana", emo("tq", 150, 150, E.tanya, 30)),
    ),
    k(
      SUARA_R2,
      { at: 0, hapus: ["tq"] },
      sorotkan("Tabel", "r0-k"),
      tambah("rapi,", teks("g0", 58, 128, "rapi", 10, W.hijauTua)),
      redamkan("Ingin@2", "r0-k"),
      sorotkan("Garis", "r1-k"),
      tambah("pasangan", teks("g1", 150, 128, "pasangan ukuran", 9, W.hijauTua)),
    ),
    k(
      SUARA_R3,
      redamkan("Ingin", "r1-k"),
      sorotkan("Pecah", "r2-k"),
      tambah("gram", teks("g2", 242, 128, "1.000 g = 1 kg", 10, W.hijauTua)),
      tambah("satuan", teks("ss", 150, 172, "satuan sama, dihitung bersama", 10, W.ungu)),
    ),
    k(
      SUARA_R4,
      bersih(0),
      tambah(0, judul("Cara yang Paling Cepat?"), ...lantai("tn", 150), ...tokoh("dh", 40, 184, "Dokter Hana")),
      tambah("tiga", teks("q1", 150, 84, "3 kg", 26, W.kg)),
      tambah("menjadi", panah("pq", 150, 94, 0, 22, W.biru, 2.6)),
      tambah(6, teks("q2", 150, 146, "? g", 26, W.merah)),
      tambah("cara", emo("tq", 250, 100, E.tanya, 34)),
    ),
  ],
};
