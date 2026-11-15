import type { AdeganStory } from "./logika-story";
import { OWL, W, duaBingkai, emo, garisBilangan, judul, kartu, lompat, teks, titikDua } from "./k1b6A-gambar";
import { hapus, idx, k, redamkan, sorotkan, tambah, ubah } from "./k1b6A-bantu";
import { GY, WARNA_METODE, kepala } from "./k1b6A-luar-1";
import { pilihanBil } from "./k1b6A-materi-4";

const sel = (id: string, dari: number, sampai: number): string[] => Array.from({ length: sampai - dari + 1 }, (_, q) => `${id}-c${dari + q}`);
const BY = 50;

/* ------------------------------ 4. Pasangan sampai 20: konsep ------------------------------ */
const SUARA_C1 = "Metode kedua bernama Pasangan sampai dua puluh. Dua bingkai penuh berisi dua puluh titik.";
const SUARA_C2 = "Isi dua belas titik. Bingkai pertama penuh, dan bingkai kedua berisi dua titik.";
const SUARA_C3 = "Titik yang masih kosong ada delapan. Dua belas dan delapan adalah pasangan yang membentuk dua puluh.";
const SUARA_C4 = "Dua belas ditambah delapan sama dengan dua puluh. Jadi selisih dua belas dan dua puluh adalah delapan.";
const SUARA_C5 = "Kalau kita ingat pasangan yang membentuk dua puluh, selisih ke dua puluh bisa langsung dilihat. Ucapkan lagi mengikuti suara guru.";

export const ADEGAN_LUAR_PASANGAN: AdeganStory = {
  id: "luar-pasangan",
  judul: "Pasangan sampai 20: dua bingkai berisi titik",
  sumber: "Metode luar: Pasangan sampai 20",
  latar: "#EFF6FF",
  ketukan: [
    k(SUARA_C1, tambah("kedua", ...kepala(1)), tambah("bingkai", ...duaBingkai("pb", BY)), tambah("titik.", teks("bl", 150, 134, "20", 22, W.merah))),
    k(SUARA_C2, tambah("titik.", ...titikDua("pb", BY, 12)), ubah("belas", { id: "bl", isi: "12" })),
    k(SUARA_C3, sorotkan("kosong", ...sel("pbb", 2, 9)), tambah("delapan.", teks("ks", 150, 116, "kosong: 8", 9.4, W.coklat))),
    k(SUARA_C4, hapus(0, "ks"), redamkan(0, ...sel("pbb", 2, 9)), tambah("Dua", ...kartu("pj", 70, 150, 160, 30, W.emas, ["12 + 8 = 20"], 13))),
    k(SUARA_C5, tambah("Ucapkan", emo("ucap", 262, 190, "\u{1F5E3}", 24))),
  ],
};

/* ------------------------------ 5. Pasangan sampai 20: terapan ------------------------------ */
const SUARA_D1 = "Terapkan pada lima belas. Isi lima belas titik di dua bingkai.";
const SUARA_D2 = "Bingkai pertama penuh, bingkai kedua berisi lima titik. Titik yang kosong tinggal lima.";
const SUARA_D3 = "Lima belas dan lima adalah pasangan yang membentuk dua puluh. Lima belas ditambah lima sama dengan dua puluh.";
const SUARA_D4 = "Berapa selisih lima belas dan dua puluh? Pilih: empat, lima, atau enam. Ketuk bilangan yang tepat.";

export const ADEGAN_LUAR_PASANGAN_TERAPAN: AdeganStory = {
  id: "luar-pasangan-terapan",
  judul: "Pasangan sampai 20: lima belas titik",
  sumber: "Metode luar: Pasangan sampai 20, terapan",
  latar: "#EFF6FF",
  ketukan: [
    k(SUARA_D1, tambah("Terapkan", ...kepala(1), ...duaBingkai("qb", BY)), tambah("Isi", ...titikDua("qb", BY, 15)), tambah("belas.", teks("bl", 150, 134, "15", 22, W.merah))),
    k(SUARA_D2, sorotkan("kosong", ...sel("qbb", 5, 9)), tambah("tinggal", teks("ks", 150, 116, "kosong: 5", 9.4, W.coklat))),
    k(SUARA_D3, hapus(0, "ks"), redamkan(0, ...sel("qbb", 5, 9)), tambah("Lima@2", ...kartu("qj", 70, 150, 160, 30, W.emas, ["15 + 5 = 20"], 13))),
    k(SUARA_D4, hapus(0, "qj-k", "qj-t0"), tambah("Pilih:", ...pilihanBil(146, ["4", "5", "6"])), sorotkan("lima,", "c2-k")),
  ],
};

/* ------------------------------ 6. Menjadikan Sepuluh: konsep ------------------------------ */
const SUARA_E1 = "Metode ketiga bernama Menjadikan Sepuluh. Kita melangkah ke sepuluh dulu, lalu melanjutkan sisanya.";
const SUARA_E2 = "Kita mau mencari selisih delapan dan empat belas. Mulai dari delapan. Lompat dulu ke sepuluh, ada dua langkah.";
const SUARA_E3 = "Dari sepuluh lanjut sampai empat belas. Satu, dua, tiga, empat. Ada empat langkah lagi.";
const SUARA_E4 = "Dua langkah dan empat langkah. Dua ditambah empat sama dengan enam. Jadi selisihnya enam.";
const SUARA_E5 = "Metode ini membuat kita menghitung lebih cepat, karena sepuluh mudah diingat. Ucapkan lagi mengikuti suara guru.";

export const ADEGAN_LUAR_SEPULUH: AdeganStory = {
  id: "luar-sepuluh",
  judul: "Menjadikan Sepuluh: ke sepuluh dulu",
  sumber: "Metode luar: Menjadikan Sepuluh",
  latar: "#FDF2F8",
  ketukan: [
    k(SUARA_E1, tambah("ketiga", ...kepala(2)), tambah(0, ...garisBilangan(GY)), sorotkan(idx(SUARA_E1, "sepuluh", 2), "gb-n10")),
    k(
      SUARA_E2,
      sorotkan(4, "gb-n8"),
      sorotkan(7, "gb-n14"),
      tambah(14, lompat("sa1", 8, 9, GY)),
      tambah(16, lompat("sa2", 9, 10, GY)),
    ),
    k(SUARA_E3, tambah(6, lompat("sb1", 10, 11, GY, W.ungu)), tambah(7, lompat("sb2", 11, 12, GY, W.ungu)), tambah(8, lompat("sb3", 12, 13, GY, W.ungu)), tambah(9, lompat("sb4", 13, 14, GY, W.ungu))),
    k(SUARA_E4, tambah("Dua@2", ...kartu("sj", 70, 150, 160, 30, W.emas, ["2 + 4 = 6"], 13))),
    k(SUARA_E5, tambah("Ucapkan", emo("ucap", 262, 190, "\u{1F5E3}", 24)), redamkan(0, "gb-n8", "gb-n14")),
  ],
};

/* ------------------------------ 7. Menjadikan Sepuluh: terapan ------------------------------ */
const SUARA_F1 = "Terapkan pada enam dan tiga belas. Berapa selisihnya? Kita ke sepuluh dulu.";
const SUARA_F2 = "Dari enam ke sepuluh ada empat langkah. Satu, dua, tiga, empat.";
const SUARA_F3 = "Dari sepuluh ke tiga belas ada tiga langkah. Satu, dua, tiga.";
const SUARA_F4 = "Empat ditambah tiga sama dengan tujuh. Jadi selisih enam dan tiga belas adalah tujuh.";

export const ADEGAN_LUAR_SEPULUH_TERAPAN: AdeganStory = {
  id: "luar-sepuluh-terapan",
  judul: "Menjadikan Sepuluh: enam dan tiga belas",
  sumber: "Metode luar: Menjadikan Sepuluh, terapan",
  latar: "#FDF2F8",
  ketukan: [
    k(SUARA_F1, tambah("Terapkan", ...kepala(2), ...garisBilangan(GY)), sorotkan("enam", "gb-n6"), sorotkan("belas?", "gb-n13")),
    k(SUARA_F2, tambah(7, lompat("ta1", 6, 7, GY)), tambah(8, lompat("ta2", 7, 8, GY)), tambah(9, lompat("ta3", 8, 9, GY)), tambah(10, lompat("ta4", 9, 10, GY))),
    k(SUARA_F3, tambah(8, lompat("tb1", 10, 11, GY, W.ungu)), tambah(9, lompat("tb2", 11, 12, GY, W.ungu)), tambah(10, lompat("tb3", 12, 13, GY, W.ungu))),
    k(SUARA_F4, tambah("Empat", ...kartu("tj", 70, 150, 160, 30, W.emas, ["4 + 3 = 7"], 13))),
  ],
};

/* ------------------------------ 8. Ringkasan ------------------------------ */
const SUARA_G1 = "Mari kita ringkas tiga metode dari luar. Semuanya membantu kita mencari selisih dua bilangan.";
const SUARA_G2 = "Maju dan Mundur: kita melangkah di garis bilangan. Maju untuk menambah, mundur untuk mengurangi.";
const SUARA_G3 = "Pasangan sampai dua puluh: kita lihat pasangan bilangan yang membentuk dua puluh.";
const SUARA_G4 = "Menjadikan Sepuluh: kita ke sepuluh dulu, lalu menghitung sisanya. Semua cara ini benar. Pilih yang paling cocok untukmu.";

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan tiga metode dari luar",
  sumber: "Metode luar: ringkasan",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_G1, tambah(0, judul("Ringkasan")), tambah("Semuanya", emo("ig", 70, 100, OWL, 44)), tambah("selisih", ...kartu("rg", 120, 74, 160, 40, W.emas, ["mencari selisih"], 11))),
    k(SUARA_G2, tambah("Maju", ...kartu("r1", 14, 122, 272, 24, WARNA_METODE[0], ["1. maju dan mundur di garis"], 9.4))),
    k(SUARA_G3, tambah("Pasangan", ...kartu("r2", 14, 150, 272, 24, WARNA_METODE[1], ["2. pasangan sampai 20"], 9.4))),
    k(SUARA_G4, tambah("Menjadikan", ...kartu("r3", 14, 178, 272, 20, WARNA_METODE[2], ["3. ke 10 dulu, lalu sisa"], 9.4))),
  ],
};
