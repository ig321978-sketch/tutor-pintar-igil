import type { AdeganStory } from "./logika-story";
import { W, arah, emo, judul, kartu, kartuBil, panah, teks } from "./k3b1C-gambar";
import { hapus, idKartu, idx, k, pindah, redamkan, slotX, sorotkan, tambah, ubah } from "./k3b1C-bantu";


/* ------------------------------ 12. Mengurutkan tiga bilangan ------------------------------ */
const SUARA_O1 = "Sekarang Upe punya tiga kartu bilangan, yaitu tujuh ratus dua puluh, enam ratus tiga puluh sembilan, dan tujuh ratus sembilan.";
const SUARA_O2 = "Kita cari yang paling kecil. Enam ratusan paling kecil, jadi enam ratus tiga puluh sembilan paling kecil.";
const SUARA_O3 = "Sisanya sama-sama tujuh ratusan, jadi kita lihat puluhannya. Nol kurang dari dua, jadi tujuh ratus sembilan kurang dari tujuh ratus dua puluh.";
const SUARA_O4 = "Sekarang urutannya jelas. Dari yang terkecil, enam ratus tiga puluh sembilan, tujuh ratus sembilan, lalu tujuh ratus dua puluh.";

export const ADEGAN_URUT_TIGA: AdeganStory = {
  id: "urut-tiga",
  judul: "Urutan tiga bilangan",
  sumber: "Materi: urutan tiga bilangan",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_O1,
      tambah(0, judul("Kartu bilangan Upe")),
      tambah(idx(SUARA_O1, "tujuh"), ...kartuBil(0, slotX(0), 60, 720)),
      tambah(idx(SUARA_O1, "enam"), ...kartuBil(1, slotX(1), 60, 639)),
      tambah(idx(SUARA_O1, "tujuh", 2), ...kartuBil(2, slotX(2), 60, 709)),
    ),
    k(SUARA_O2, sorotkan(idx(SUARA_O2, "Enam"), "bk1-k"), tambah(idx(SUARA_O2, "jadi"), emo("kc", 150, 140, "\u{1F50E}", 40))),
    k(
      SUARA_O3,
      hapus(0, "kc"),
      redamkan(0, "bk1-k"),
      sorotkan(idx(SUARA_O3, "Sisanya"), "bk0-k", "bk2-k"),
      tambah(idx(SUARA_O3, "jadi", 2), teks("cp", 150, 140, "709 < 720", 14, W.merah)),
    ),
    k(
      SUARA_O4,
      hapus(0, "cp"),
      redamkan(0, "bk0-k", "bk2-k"),
      pindah(idx(SUARA_O4, "enam"), 1, slotX(0)),
      pindah(idx(SUARA_O4, "tujuh"), 2, slotX(1)),
      pindah(idx(SUARA_O4, "tujuh", 2), 0, slotX(2)),
      tambah(idx(SUARA_O4, "dua"), arah("urutan naik", 130)),
    ),
  ],
};

/* ------------------------------ 13. Dua arah urutan ------------------------------ */
const SUARA_D1 = "Urutan naik dimulai dari yang terkecil, misalnya enam ratus tiga puluh sembilan, tujuh ratus sembilan, lalu tujuh ratus dua puluh.";
const SUARA_D2 = "Sekarang kita balik. Urutan turun dimulai dari yang terbesar.";
const SUARA_D3 = "Jadi urutan turunnya tujuh ratus dua puluh, tujuh ratus sembilan, lalu enam ratus tiga puluh sembilan.";
const SUARA_D4 = "Naik atau turun, kita tetap membandingkan bilangan dengan cara yang sama. Hanya arah urutannya yang berbeda.";
const SUARA_D5 = "Pakai urutan naik bila diminta dari yang terkecil, dan urutan turun bila diminta dari yang terbesar.";

export const ADEGAN_URUT_TURUN: AdeganStory = {
  id: "urut-turun",
  judul: "Urutan naik dan urutan turun",
  sumber: "Materi: urutan naik dan turun",
  latar: "#F5F3FF",
  ketukan: [
    k(
      SUARA_D1,
      tambah(0, judul("Urutan naik")),
      tambah(idx(SUARA_D1, "naik"), arah("urutan naik", 130), panah("or-pn", 50, 112, 200, 0, W.hijau)),
      tambah(idx(SUARA_D1, "enam"), ...kartuBil(0, slotX(0), 60, 639)),
      tambah(idx(SUARA_D1, "tujuh"), ...kartuBil(1, slotX(1), 60, 709)),
      tambah(idx(SUARA_D1, "tujuh", 2), ...kartuBil(2, slotX(2), 60, 720)),
    ),
    k(
      SUARA_D2,
      ubah(idx(SUARA_D2, "Urutan"), { id: "or-arah", isi: "urutan turun" }),
      ubah(idx(SUARA_D2, "Urutan"), { id: "or-pn", x: 250, x2: -200, warna: W.merah }),
      pindah(idx(SUARA_D2, "turun"), 2, slotX(0)),
      pindah(idx(SUARA_D2, "turun"), 0, slotX(2)),
    ),
    k(
      SUARA_D3,
      sorotkan(idx(SUARA_D3, "tujuh"), "bk2-k"),
      redamkan(idx(SUARA_D3, "tujuh", 2), "bk2-k"),
      sorotkan(idx(SUARA_D3, "tujuh", 2), "bk1-k"),
      redamkan(idx(SUARA_D3, "enam"), "bk1-k"),
      sorotkan(idx(SUARA_D3, "enam"), "bk0-k"),
    ),
    k(SUARA_D4, redamkan(0, "bk0-k"), tambah(idx(SUARA_D4, "cara"), ...kartu("cr", 40, 150, 220, 28, W.emas, ["cara membandingkan sama"], 11))),
    k(SUARA_D5, hapus(0, ...idKartu("cr")), tambah(idx(SUARA_D5, "naik"), emo("ik", 80, 176, "\u{1F4C8}", 34)), tambah(idx(SUARA_D5, "turun"), emo("ib", 220, 176, "\u{1F4C9}", 34))),
  ],
};
