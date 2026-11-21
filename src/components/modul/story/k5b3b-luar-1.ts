import type { AdeganStory } from "./logika-story";
import { E, W, bar, campur, emo, judul, kartu, lantai, pec, teks, tokoh } from "./k5b3b-gambar";
import { bersih, k, tambah, ubah } from "./k5b3b-bantu";

/*
 * Video metode global Kelas 5 Bab 3 Sub-Bab B "Roti Isi Pak Seno" (penjumlahan pecahan): tiga metode global Add the Tops (Jumlahkan Pembilang),
 * Match the Bottoms (Samakan Penyebut), Whole Then Part (Bulat Lalu Pecahan). Naskah suara dari naskah/story-naskah-k5b3b.md.
 * Bagian ini: pembuka dan metode Add the Tops (konsep dan terapan).
 */
export const NAMA_METODE = ["Add the Tops", "Match the Bottoms", "Whole Then Part"] as const;
export const NAMA_METODE_ID = ["Jumlahkan Pembilang", "Samakan Penyebut", "Bulat Lalu Pecahan"] as const;

/* ------------------------------ Pembuka ------------------------------ */
const SUARA_P1 = "Pak Seno punya banyak pesanan, dan potongan-potongan roti harus dijumlahkan tanpa keliru.";
const SUARA_P2 = "Ada tiga cara menjumlahkan pecahan, dan masing-masing cocok untuk keadaan yang berbeda.";
const SUARA_P3 = "Tiga cara itu: Add the Tops, Match the Bottoms, dan Whole Then Part.";
const SUARA_P4 = "Nama dalam bahasa Indonesia: Jumlahkan Pembilang, Samakan Penyebut, dan Bulat Lalu Pecahan.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Tiga cara menjumlahkan",
  sumber: "Metode global: pembuka",
  latar: "#F8FAFC",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Banyak pesanan"), ...lantai("lt", 150)),
      tambah("Seno", ...tokoh("ps", 40, 184, "Pak Seno")),
      tambah("pesanan", ...bar("o1", 100, 50, 8, 3, { lebar: 120, h: 16 }), teks("o1t", 250, 62, "3/8", 12, W.rotiTua, { z: 3 })),
      tambah("potongan", ...bar("o2", 100, 78, 6, 2, { lebar: 120, h: 16, warna: W.biruMuda, garis: W.biruGaris }), teks("o2t", 250, 90, "2/6", 12, W.biruGaris, { z: 3 })),
      tambah("dijumlahkan", teks("o3", 150, 124, "+ = ?", 18, W.merah, { z: 3 })),
    ),
    k(
      SUARA_P2,
      bersih(0),
      tambah(0, judul("Tiga cara"), teks("n3", 150, 70, "3 cara", 30, W.merah, { z: 3 })),
      tambah("masing-masing", ...kartu("q0", 14, 100, 84, 40, W.kapur, "cara 1", 14), ...kartu("q1", 108, 100, 84, 40, W.langit, "cara 2", 14), ...kartu("q2", 202, 100, 84, 40, W.pink, "cara 3", 14)),
      tambah("keadaan", teks("kd", 150, 166, "tiap cara punya saat yang tepat", 11, W.hijauTua, { z: 3 })),
    ),
    k(
      SUARA_P3,
      bersih(0),
      tambah(0, judul("Tiga cara itu")),
      tambah("Add", ...kartu("e0", 14, 44, 130, 36, W.kapur, "Add the Tops", 11)),
      tambah("Match", ...kartu("e1", 14, 90, 130, 36, W.langit, "Match the Bottoms", 10.5)),
      tambah("Whole", ...kartu("e2", 14, 136, 130, 36, W.pink, "Whole Then Part", 11)),
    ),
    k(
      SUARA_P4,
      tambah("Jumlahkan", ...kartu("i0", 156, 44, 130, 36, W.kapur, "Jumlahkan Pembilang", 10)),
      tambah("Samakan", ...kartu("i1", 156, 90, 130, 36, W.langit, "Samakan Penyebut", 10)),
      tambah("Bulat", ...kartu("i2", 156, 136, 130, 36, W.pink, "Bulat Lalu Pecahan", 10)),
    ),
  ],
};

/* ------------------------------ Add the Tops: konsep ------------------------------ */
const SUARA_A1 = "Cara pertama, Add the Tops, atau Jumlahkan Pembilang.";
const SUARA_A2 = "Kalau penyebutnya sudah sama, kita hanya menjumlahkan angka di atas.";
const SUARA_A3 = "Angka di bawah tidak berubah, karena ukuran potongannya tetap sama.";
const SUARA_A4 = "Kalau hasilnya lebih dari satu, ubah menjadi pecahan campuran.";

const L5 = campur("lw", 30, 46, 1, 1, 4, { lebar: 100, h: 16 });

export const ADEGAN_LUAR_ATAS: AdeganStory = {
  id: "luar-atas",
  judul: "Add the Tops",
  sumber: "Metode global: Add the Tops",
  latar: "#F8FAFC",
  ketukan: [
    k(
      SUARA_A1,
      tambah(0, judul("Add the Tops"), emo("rt", 150, 150, E.roti, 30, { z: 3 })),
      tambah("Add", ...kartu("m1", 20, 40, 260, 34, W.kapur, "Add the Tops", 14)),
      tambah("Jumlahkan", ...kartu("m2", 20, 84, 260, 34, W.langit, "Jumlahkan Pembilang", 14)),
    ),
    k(
      SUARA_A2,
      bersih(0),
      tambah(0, judul("Jumlahkan angka di atas")),
      tambah("penyebutnya", ...pec("fa", 80, 76, "3", "10", 18, W.rotiTua), ...pec("fb", 170, 76, "4", "10", 18, W.biruGaris)),
      tambah("menjumlahkan", teks("pl", 125, 82, "+", 18, W.merah, { z: 3 })),
      ubah("angka", { id: "fa-a", sorot: true }, { id: "fb-a", sorot: true }),
    ),
    k(
      SUARA_A3,
      ubah("bawah", { id: "fa-b", sorot: true }, { id: "fb-b", sorot: true }),
      tambah("tidak", teks("sm", 212, 82, "=", 18, W.merah, { z: 3 }), ...pec("fr", 250, 76, "7", "10", 18, W.hijauTua)),
      tambah("tetap", teks("tt", 150, 140, "angka di bawah tetap 10", 12, W.merah, { z: 3 })),
    ),
    k(
      SUARA_A4,
      bersih(0),
      tambah(0, judul("Lebih dari satu"), ...L5.objs),
      tambah("hasilnya", teks("h1", 200, 60, "5/4", 20, W.merah, { z: 3 })),
      tambah("campuran", teks("h2", 200, 96, "= 1 1/4", 20, W.hijauTua, { z: 3 })),
    ),
  ],
};

/* ------------------------------ Add the Tops: terapan ------------------------------ */
const SUARA_T1 = "Citra menjumlahkan tiga per sepuluh dan empat per sepuluh, hasilnya tujuh per sepuluh.";
const SUARA_T2 = "Ia menggambar sepuluh kotak dan mengarsir tujuh kotak untuk memeriksanya.";
const SUARA_T3 = "Cocok untuk pecahan berpenyebut sama, karena langkahnya sangat singkat.";
const SUARA_T4 = "Kurang cocok kalau penyebutnya berbeda, karena potongannya tidak sama besar.";

export const ADEGAN_LUAR_ATAS_TERAPAN: AdeganStory = {
  id: "luar-atas-terapan",
  judul: "Add the Tops: terapan",
  sumber: "Metode global: Add the Tops",
  latar: "#F8FAFC",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Citra menjumlahkan"), ...lantai("lt", 150)),
      tambah("Citra", ...tokoh("ct", 40, 184, "Citra")),
      tambah("tiga", teks("a1", 90, 70, "3/10", 16, W.rotiTua, { z: 3 })),
      tambah("empat", teks("pl", 130, 70, "+", 16, W.merah, { z: 3 }), teks("a2", 170, 70, "4/10", 16, W.biruGaris, { z: 3 })),
      tambah("tujuh", teks("sm", 210, 70, "=", 16, W.merah, { z: 3 }), teks("a3", 250, 70, "7/10", 16, W.hijauTua, { z: 3 })),
    ),
    k(
      SUARA_T2,
      tambah("sepuluh", ...bar("g", 30, 100, 10, 0, { lebar: 240, h: 26 })),
      ubah("mengarsir", ...[0, 1, 2, 3, 4, 5, 6].map((i) => ({ id: `g${i}`, warna: W.hijau, garis: W.hijauTua, putus: false }))),
      tambah("tujuh", teks("tk", 150, 142, "7 dari 10 kotak diarsir", 11, W.hijauTua, { z: 3 })),
    ),
    k(
      SUARA_T3,
      tambah("Cocok", emo("ok", 270, 124, E.benar, 20, { z: 3 })),
      tambah("langkahnya", teks("cc", 190, 40, "penyebut sama: cocok", 11, W.hijauTua, { z: 3 })),
    ),
    k(
      SUARA_T4,
      bersih(0),
      tambah(0, judul("Penyebut berbeda")),
      tambah("Kurang", ...bar("d1", 60, 56, 3, 1, { lebar: 150, h: 22 }), teks("d1t", 250, 72, "1/3", 14, W.rotiTua, { z: 3 })),
      tambah("penyebutnya", ...bar("d2", 60, 92, 4, 1, { lebar: 150, h: 22, warna: W.biruMuda, garis: W.biruGaris }), teks("d2t", 250, 108, "1/4", 14, W.biruGaris, { z: 3 })),
      tambah("potongannya", teks("kk", 150, 146, "potongan beda ukuran", 12, W.merah, { z: 3 }), emo("xx", 150, 172, E.salah, 22, { z: 3 })),
    ),
  ],
};
