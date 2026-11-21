import type { AdeganStory } from "./logika-story";
import { E, TABEL, W, barisTabel, emo, garis, judul, kartu, kepalaTabel, panah, papan, rumput, teks, tokoh } from "./k5b1b-gambar";
import { bersih, hapus, k, sorotkan, tambah, warnai } from "./k5b1b-bantu";

/*
 * Cerita orisinal IGIL "Urutan Tribun Pak Hasto" (Kelas 5 Bab 1 Sub-Bab B), video metode global.
 * Naskah suara dari naskah/story-naskah-k5b1b.md. Bagian ini: pembuka (siang di stadion), Left First (Kiri Dulu), dan terapannya.
 */

export const NAMA_METODE = ["Left First", "Line It Up", "Pick a Marker"] as const;
export const NAMA_METODE_ID = ["Kiri Dulu", "Letakkan di Garis", "Pilih Patokan"] as const;

const SEL_B = [0, 1, 2, 3, 4].map((j) => `b-c${j}`);

/* ------------------------------ Pembuka ------------------------------ */
const SUARA_O1 = "Siang itu, Pak Hasto harus mengumumkan tribun paling ramai tanpa boleh salah sebut.";
const SUARA_O2 = "Ada tiga cara membandingkan dan mengurutkan bilangan besar dengan cepat dan tepat.";
const SUARA_O3 = "Tiga cara itu: Left First, Line It Up, dan Pick a Marker.";
const SUARA_O4 = "Nama dalam bahasa Indonesia: Kiri Dulu, Letakkan di Garis, dan Pilih Patokan.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Siang di stadion",
  sumber: "Metode global: pembuka",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_O1,
      tambah(0, judul("Siang di Stadion"), ...rumput("rp", 150)),
      tambah("Hasto", ...tokoh("ph", 262, 184, "Pak Hasto")),
      tambah("mengumumkan", emo("pg", 234, 142, E.pengeras, 20)),
      tambah("tribun", papan("pb", 20, 36, 200, 92), teks("pj", 120, 54, "Tribun paling ramai?", 10, W.coklat, { z: 3 })),
      tambah("ramai", ...["Timur", "Selatan", "Utara", "Barat"].flatMap((n, i) => kartu(`tk${i}`, 28 + i * 47, 70, 43, 40, W.krem, [n], 8))),
      tambah("salah", emo("sr", 250, 100, E.seru, 18)),
    ),
    k(
      SUARA_O2,
      tambah("tiga", teks("n3", 262, 36, "3 cara", 10, W.ungu, { z: 3 })),
      tambah("membandingkan", teks("b1", 262, 56, "banding", 8, W.hijauTua, { z: 3 })),
      tambah("mengurutkan", teks("b2", 262, 70, "urutkan", 8, W.hijauTua, { z: 3 })),
      tambah("cepat", emo("kl", 262, 94, E.kilau, 18)),
      tambah("tepat", emo("ok", 262, 118, E.benar, 20)),
    ),
    k(
      SUARA_O3,
      bersih(0),
      tambah(0, judul("Tiga Cara"), teks("n3", 260, 40, "3 cara", 10, W.ungu, { z: 3 })),
      tambah("Left", teks("m0", 118, 70, "1. Left First", 10, W.biru, { z: 3 }), emo("i0", 28, 72, E.kiri, 16)),
      tambah("Line", teks("m1", 118, 120, "2. Line It Up", 10, W.biru, { z: 3 }), emo("i1", 28, 122, E.penggaris, 16)),
      tambah("Pick", teks("m2", 118, 170, "3. Pick a Marker", 10, W.biru, { z: 3 }), emo("i2", 28, 172, E.bendera, 16)),
    ),
    k(
      SUARA_O4,
      tambah("Kiri", teks("g0", 244, 70, "Kiri Dulu", 8, W.ungu, { z: 3 }), garis("l0", 184, 74, 22, 0, W.ungu, 1)),
      tambah("Letakkan", teks("g1", 244, 120, "Letakkan di Garis", 8, W.ungu, { z: 3 }), garis("l1", 176, 124, 22, 0, W.ungu, 1)),
      tambah("Pilih", teks("g2", 244, 170, "Pilih Patokan", 8, W.ungu, { z: 3 }), garis("l2", 184, 174, 22, 0, W.ungu, 1)),
    ),
  ],
};

/* ------------------------------ Left First: konsep ------------------------------ */
const SUARA_C1 = "Cara pertama, Left First, atau Kiri Dulu.";
const SUARA_C2 = "Kita menyejajarkan dua bilangan, lalu membandingkan angka di kolom paling kiri lebih dulu.";
const SUARA_C3 = "Kalau angkanya sama, kita bergeser satu kolom ke kanan sampai ketemu angka yang berbeda.";
const SUARA_C4 = "Angka pertama yang berbeda itulah yang menentukan bilangan mana yang lebih besar.";

export const ADEGAN_LUAR_KIRI: AdeganStory = {
  id: "luar-kiri",
  judul: "Left First: Kiri Dulu",
  sumber: "Metode global: Left First (konsep)",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_C1,
      tambah(0, judul("Cara 1: Left First"), ...rumput("rp", 150)),
      tambah("Left", emo("pg", 110, 112, E.kiri, 40)),
      tambah("Kiri", teks("nm", 150, 140, "Kiri Dulu", 13, W.ungu, { z: 3 }), emo("kl", 190, 104, E.kilau, 28)),
    ),
    k(
      SUARA_C2,
      hapus(0, "pg", "nm", "kl"),
      tambah("dua", ...barisTabel("a", TABEL, 0, "", 52340), teks("n2", 270, 70, "2 bilangan", 8, W.merah, { z: 3 })),
      tambah("bilangan", ...barisTabel("b", TABEL, 1, "", 52410)),
      tambah("kolom", ...kepalaTabel("kh")),
      warnai("kiri", W.emasMuda, ...["a-c0", "b-c0"]),
      tambah("kiri", panah("pa", 114, 124, 0, -14, W.merah, 2.4, { z: 6 }), teks("kd", 114, 136, "kiri dulu", 8, W.merah, { z: 3 })),
    ),
    k(
      SUARA_C3,
      hapus(0, "n2", "pa", "kd"),
      warnai("sama", W.hijauMuda, "a-c0", "b-c0"),
      tambah("bergeser", panah("pg", 114, 124, 28, 0, W.merah, 2.4, { z: 6 })),
      tambah("satu", teks("s1", 270, 70, "1 kolom", 8, W.merah, { z: 3 })),
      warnai("kolom", W.hijauMuda, "a-c1", "b-c1"),
      tambah("kanan", panah("pg2", 142, 124, 28, 0, W.merah, 2.4, { z: 6 })),
      warnai("berbeda", W.merahMuda, "a-c2", "b-c2"),
    ),
    k(
      SUARA_C4,
      hapus(0, "s1", "pg", "pg2"),
      sorotkan("berbeda", "a-d2", "b-d2"),
      tambah("menentukan", teks("lt", 270, 70, "4 > 3", 11, W.merah, { z: 3 })),
      warnai("mana", W.hijauMuda, ...SEL_B),
      tambah("besar", teks("lb1", 270, 96, "52.410", 8, W.hijauTua, { z: 3 }), teks("lb2", 270, 106, "lebih besar", 8, W.hijauTua, { z: 3 }), emo("jp", 270, 128, E.jempol, 18)),
    ),
  ],
};

/* ------------------------------ Left First: terapan ------------------------------ */
const SUARA_T1 = "Citra membandingkan lima puluh empat ribu dua ratus tiga dengan lima puluh empat ribu tiga ratus dua.";
const SUARA_T2 = "Lima dan empat sama, tetapi di ratusan dua lebih kecil dari tiga, jadi bilangan kedua lebih besar.";
const SUARA_T3 = "Cocok untuk dua bilangan yang mirip, karena angka penentunya cepat ketemu.";
const SUARA_T4 = "Kurang cocok untuk banyak bilangan sekaligus, karena kita harus membandingkan pasangan demi pasangan.";

export const ADEGAN_LUAR_KIRI_TERAPAN: AdeganStory = {
  id: "luar-kiri-terapan",
  judul: "Left First: terapan",
  sumber: "Metode global: Left First (terapan)",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Citra Membandingkan"), ...rumput("rp", 150), ...tokoh("ci", 36, 184, "Citra"), ...kepalaTabel("kh")),
      tambah("lima", ...barisTabel("r0", TABEL, 0, "Pertama", 54203)),
      tambah("dengan", ...barisTabel("r1", TABEL, 1, "Kedua", 54302)),
    ),
    k(
      SUARA_T2,
      warnai("Lima", W.hijauMuda, "r0-c0", "r1-c0"),
      warnai("empat", W.hijauMuda, "r0-c1", "r1-c1"),
      tambah("sama", teks("sm", 270, 70, "sama", 9, W.hijauTua, { z: 3 })),
      warnai("ratusan", W.merahMuda, "r0-c2", "r1-c2"),
      sorotkan("dua", "r0-d2"),
      sorotkan("tiga", "r1-d2"),
      tambah("kedua", teks("bb", 270, 96, "Kedua", 8, W.hijauTua, { z: 3 }), teks("bb2", 270, 106, "lebih besar", 8, W.hijauTua, { z: 3 })),
    ),
    k(
      SUARA_T3,
      hapus(0, "sm", "bb", "bb2"),
      tambah("Cocok", emo("jp", 270, 56, E.jempol, 22)),
      tambah("dua", teks("n2", 270, 84, "2 bilangan", 8, W.merah, { z: 3 })),
      tambah("mirip", teks("mr", 270, 96, "mirip", 8, W.hijauTua, { z: 3 })),
      sorotkan("penentunya", "r0-d2", "r1-d2"),
      tambah("cepat", emo("kl", 270, 124, E.kilau, 18)),
    ),
    k(
      SUARA_T4,
      hapus(0, "jp", "n2", "mr", "kl"),
      tambah("Kurang", emo("xs", 270, 56, E.salah, 22)),
      tambah("banyak", ...barisTabel("r2", TABEL, 2, "Ketiga", 54230)),
      tambah("harus", teks("hs", 270, 84, "banyak", 8, W.merah, { z: 3 }), teks("hs2", 270, 94, "pasangan", 8, W.merah, { z: 3 })),
      tambah("pasangan", panah("pa1", 246, 67, 0, 26, W.merah, 2, { z: 6 })),
      tambah("pasangan@2", panah("pa2", 246, 93, 0, 26, W.merah, 2, { z: 6 })),
    ),
  ],
};
