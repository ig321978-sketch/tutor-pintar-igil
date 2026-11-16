import type { AdeganStory } from "./logika-story";
import { W, bagan, emo, judul, kartu, kalimat, tabel, teks } from "./k3b2B-gambar";
import { bersih, idx, k, redamkan, sorotkan, tambah, ubah } from "./k3b2B-bantu";

/* ------------------------------ 7. Tabel ayam ------------------------------ */
const TA = tabel("ta", ["Mula-mula", "Dijual", "Sisa"], [["80", "?", "45"]], { y: 32 });
const SUARA_A1 = "Kita buat tabel. Ayam mula-mula delapan puluh ekor, yang dijual belum diketahui, dan sisanya empat puluh lima ekor.";
const SUARA_A2 = "Kalimat Matematikanya adalah delapan puluh kurang titik-titik sama dengan empat puluh lima.";
const SUARA_A3 = "Kita ingat bahwa delapan puluh kurang tiga puluh lima sama dengan empat puluh lima.";
const SUARA_A4 = "Bagaimana cara mendapatkan bilangan tiga puluh lima itu?";

export const ADEGAN_TABEL_AYAM: AdeganStory = {
  id: "tabel-ayam",
  judul: "Tabel ayam",
  sumber: "Materi: tabel ayam",
  latar: "#FEFCE8",
  ketukan: [
    k(
      SUARA_A1,
      tambah(0, judul("Tabel ayam")),
      tambah(idx(SUARA_A1, "delapan"), ...TA.kepala.slice(0, 2), ...TA.sel(0, 0)),
      tambah("dijual", ...TA.kepala.slice(2, 4), ...TA.sel(0, 1)),
      tambah("sisanya", ...TA.kepala.slice(4, 6), ...TA.sel(0, 2)),
    ),
    k(SUARA_A2, tambah("delapan", kalimat("k1", 116, "80 − … = 45", 30))),
    k(SUARA_A3, tambah("ingat", kalimat("k2", 158, "80 − 35 = 45", 24, W.hijau)), sorotkan("tiga", "k2")),
    k(SUARA_A4, redamkan(0, "k2"), tambah("Bagaimana", emo("tn", 150, 196, "❓", 26))),
  ],
};

/* ------------------------------ 8. Bagan ayam ------------------------------ */
const BG = bagan("bg", { y: 36, atas: "80", a: "?", b: "45", fa: 35 / 80 });
const SUARA_B1 = "Ini bagannya. Batang atas adalah seluruh ayam, yaitu delapan puluh.";
const SUARA_B2 = "Batang kecil di kanan adalah sisa ayam, yaitu empat puluh lima.";
const SUARA_B3 = "Batang kiri adalah ayam yang dijual, dan jumlahnya belum diketahui.";
const SUARA_B4 = "Untuk mencari ayam yang dijual, kurangi ayam mula-mula dengan sisa ayam.";
const SUARA_B5 = "Kita hitung delapan puluh kurang empat puluh lima sama dengan tiga puluh lima.";
const SUARA_B6 = "Jadi, ayam yang dijual ada tiga puluh lima ekor.";

export const ADEGAN_BAGAN_AYAM: AdeganStory = {
  id: "bagan-ayam",
  judul: "Bagan ayam",
  sumber: "Materi: bagan ayam",
  latar: "#F0F9FF",
  ketukan: [
    k(SUARA_B1, tambah(0, judul("Bagan ayam")), tambah("seluruh", ...BG.atas), tambah("Ini", emo("ay", 40, 152, "\u{1F414}", 30))),
    k(SUARA_B2, tambah("kanan", ...BG.b), sorotkan("empat", "bg_B")),
    k(SUARA_B3, redamkan(0, "bg_B"), tambah("kiri", ...BG.a), sorotkan("dijual,", "bg_A")),
    k(SUARA_B4, redamkan(0, "bg_A"), tambah("kurangi", ...kartu("rm", 50, 128, 200, 22, W.emas, ["awal − sisa"], 11))),
    k(SUARA_B5, tambah("hitung", kalimat("hit", 174, "80 − 45 = 35", 22, W.merah)), ubah("tiga", { id: "bg_An", isi: "35", warna: W.biru })),
    k(SUARA_B6, sorotkan("tiga", "bg_A"), tambah("ekor.", ...kartu("jw", 60, 180, 180, 20, W.hijauMuda, ["dijual: 35 ekor"], 10))),
  ],
};

/* ------------------------------ 9. Memeriksa jawaban ------------------------------ */
const SUARA_C1 = "Setelah dapat jawaban, kita periksa dengan mengurangkan lagi.";
const SUARA_C2 = "Ayam mula-mula delapan puluh, dan ayam yang dijual tiga puluh lima.";
const SUARA_C3 = "Delapan puluh kurang tiga puluh lima hasilnya empat puluh lima.";
const SUARA_C4 = "Hasilnya sama dengan sisa ayam di cerita. Jadi jawaban tiga puluh lima sudah benar.";

export const ADEGAN_PERIKSA_AYAM: AdeganStory = {
  id: "periksa-ayam",
  judul: "Memeriksa jawaban",
  sumber: "Materi: memeriksa jawaban",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_C1, tambah(0, judul("Memeriksa jawaban"), emo("lp", 150, 80, "\u{1F50D}", 44)), tambah("periksa", ...kartu("pm", 50, 110, 200, 30, W.emas, ["kurangkan lagi"], 12))),
    k(
      SUARA_C2,
      bersih(0),
      tambah(0, judul("Memeriksa jawaban")),
      tambah(idx(SUARA_C2, "delapan"), emo("a1", 90, 80, "\u{1F414}", 30), teks("n1", 90, 104, "80", 16, W.merah)),
      tambah("dijual", emo("a2", 210, 80, "\u{1F6D2}", 30), teks("n2", 210, 104, "35", 16, W.merah)),
    ),
    k(SUARA_C3, tambah("hasilnya", kalimat("hs", 156, "80 − 35 = 45", 26, W.biru))),
    k(SUARA_C4, tambah("Hasilnya", emo("ok", 262, 156, "✅", 26)), sorotkan("sama", "hs")),
  ],
};
