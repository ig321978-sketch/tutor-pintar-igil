import type { AdeganStory, Obj } from "./logika-story";
import { E, W, centangKolom, emo, halaman, judul, kartu, kartuAngka, kotak, papanKapur, papanTempat, sorotKolom, tanda, teks, tokoh, truk } from "./k3b1C-gambar";
import { bersih, k, tambah } from "./k3b1C-bantu";

/*
 * Cerita orisinal IGIL "Karung Pak Dodi" (Kelas 3 Bab 1 Sub-Bab C), video metode global.
 * Naskah suara dari naskah/story-naskah-k3b1c.md. Bagian ini: pembuka (tiga catatan lama di bak truk), Compare Placewise (Banding per Tempat), dan terapannya.
 */

export const NAMA_METODE = ["Compare Placewise", "Number Line", "Ordering"] as const;
export const NAMA_METODE_ID = ["Banding per Tempat", "Garis Bilangan Ratusan", "Mengurutkan"] as const;

/** Kartu nama metode `${id}` dengan dua baris (nama Inggris dan nama Indonesia) dipecah supaya bisa muncul bertahap: [kartu+baris1, baris2]. */
const kartuNama = (id: string, inggris: string, indonesia: string, y = 56): [Obj[], Obj[]] => {
  const s = kartu(id, 40, y, 220, 56, W.krem, [inggris, indonesia], 12);
  return [s.filter((o) => o.id !== `${id}-t1`), s.filter((o) => o.id === `${id}-t1`)];
};

/** Dua papan tiga tempat sama ukuran: kiri di (20, 46), kanan di (166, 46), lebar 114. */
const KIRI = [20, 46, 114] as const;
const KANAN = [166, 46, 114] as const;
const duaPapan = (a: [string, string, string], b: [string, string, string], na = "Bilangan A", nb = "Bilangan B") => ({
  kiri: papanTempat("pa", ...KIRI, na, a),
  kanan: papanTempat("pb", ...KANAN, nb, b),
});

/* ------------------------------ Pembuka ------------------------------ */
const SUARA_O1 = "Di bak truk, Bima menemukan tiga catatan lama milik sopir pengantar barang.";
const SUARA_O2 = "Pak Dodi berkata, itu cara membandingkan banyak barang dengan cepat dan tepat.";
const SUARA_O3 = "Tiga cara itu: Compare Placewise, Number Line, dan Ordering.";
const SUARA_O4 = "Nama dalam bahasa Indonesia: Banding per Tempat, Garis Bilangan Ratusan, dan Mengurutkan.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Tiga catatan lama di bak truk",
  sumber: "Metode global: pembuka",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_O1,
      bersih(0),
      tambah(0, judul("Bak Truk Pak Dodi"), ...halaman("hl")),
      tambah("truk,", ...truk("tr", 90, 98)),
      tambah("Bima", ...tokoh("bm", 40, 172, "Bima")),
      tambah("tiga", teks("n3", 240, 66, "3 catatan", 10, W.ungu, { z: 3 })),
      tambah("catatan", ...[0, 1, 2].flatMap((i) => kartu(`c${i}`, 96 + i * 24, 70, 20, 28, W.krem, ["?"], 8))),
    ),
    k(
      SUARA_O2,
      tambah("Dodi", ...tokoh("pd", 250, 172, "Pak Dodi")),
      tambah("berkata,", ...kartu("bb", 70, 144, 130, 22, W.hijauMuda, ["cepat dan tepat"], 9)),
      tambah("membandingkan", emo("kc", 214, 150, E.kaca, 20, { z: 3 })),
      tambah("tepat.", emo("ok", 206, 126, E.benar, 20, { z: 3 })),
    ),
    k(
      SUARA_O3,
      bersih(0),
      tambah(0, judul("Tiga Cara Tadi", W.kapur), ...papanKapur("pk")),
      tambah("Tiga", teks("n3", 252, 48, "3 cara", 10, W.kapur, { z: 3 })),
      tambah("Compare", teks("m0", 150, 76, "1. Compare Placewise", 13, W.kapur, { z: 3 })),
      tambah("Number", teks("m1", 150, 124, "2. Number Line", 13, W.kapur, { z: 3 })),
      tambah("Ordering.", teks("m2", 150, 172, "3. Ordering", 13, W.kapur, { z: 3 })),
    ),
    k(
      SUARA_O4,
      tambah("Nama", teks("in", 52, 48, "bahasa Indonesia", 8, W.emas, { z: 3 })),
      tambah("Banding", teks("q0", 150, 92, "Banding per Tempat", 10, W.emas, { z: 3 })),
      tambah("Garis", teks("q1", 150, 140, "Garis Bilangan Ratusan", 10, W.emas, { z: 3 })),
      tambah("Mengurutkan.", teks("q2", 150, 188, "Mengurutkan", 10, W.emas, { z: 3 })),
    ),
  ],
};

/* ------------------------------ Compare Placewise ------------------------------ */
const SUARA_P1 = "Cara pertama, Compare Placewise, atau Banding per Tempat.";
const SUARA_P2 = "Bandingkan angka pada tempat yang sama, mulai dari ratusan.";
const SUARA_P3 = "Kalau berbeda, berhenti. Bilangan dengan angka lebih besar di tempat itu yang lebih besar.";
const SUARA_P4 = "Kalau sama, turun ke puluhan, lalu satuan.";

const [NM0_A, NM0_B] = kartuNama("nm", "Compare Placewise", "Banding per Tempat");

export const ADEGAN_LUAR_TEMPAT: AdeganStory = {
  id: "luar-tempat",
  judul: "Compare Placewise, Banding per Tempat",
  sumber: "Metode global: Compare Placewise",
  latar: "#ECFDF5",
  ketukan: [
    k(
      SUARA_P1,
      bersih(0),
      tambah(0, judul("Cara Pertama", W.kapur), ...papanKapur("pk")),
      tambah("pertama,", teks("n1", 54, 150, "cara 1", 12, W.kapur, { z: 3 })),
      tambah("Compare", ...NM0_A),
      tambah("atau", ...NM0_B),
      tambah("Tempat.", emo("sb", 150, 150, "\u{2696}", 28, { z: 3 })),
    ),
    k(
      SUARA_P2,
      bersih(0),
      tambah(0, judul("Angka pada Tempat Sama", W.kapur), ...papanKapur("pk")),
      tambah("angka", ...duaPapan(["5", "2", "3"], ["5", "7", "1"]).kiri),
      tambah("pada", ...duaPapan(["5", "2", "3"], ["5", "7", "1"]).kanan),
      tambah("mulai", emo("tj", 150, 150, E.tunjuk, 22, { z: 3 })),
      tambah("ratusan.", sorotKolom("pa", ...KIRI, 0), sorotKolom("pb", ...KANAN, 0)),
    ),
    k(
      SUARA_P3,
      bersih(0),
      tambah(0, judul("Berbeda, Berhenti", W.kapur), ...papanKapur("pk"), ...duaPapan(["7", "2", "4"], ["4", "9", "8"]).kiri, ...duaPapan(["7", "2", "4"], ["4", "9", "8"]).kanan, sorotKolom("pa", ...KIRI, 0), sorotKolom("pb", ...KANAN, 0)),
      tambah("berhenti.", emo("st", 150, 98, "\u{1F6D1}", 26, { z: 4 })),
      tambah("angka", teks("g7", 77, 140, "7", 24, W.kapur, { z: 3 }), teks("g4", 223, 140, "4", 24, W.kapur, { z: 3 })),
      tambah("besar", ...tanda("tn", 150, 134, ">", W.emas)),
      tambah("besar@2", emo("pl", 77, 178, E.piala, 22, { z: 3 })),
    ),
    k(
      SUARA_P4,
      bersih(0),
      tambah(0, judul("Sama, Turun", W.kapur), ...papanKapur("pk"), ...duaPapan(["6", "3", "8"], ["6", "3", "2"]).kiri, ...duaPapan(["6", "3", "8"], ["6", "3", "2"]).kanan),
      tambah("turun", centangKolom("ca", ...KIRI, 0), centangKolom("cb", ...KANAN, 0), centangKolom("ca1", ...KIRI, 1), centangKolom("cb1", ...KANAN, 1)),
      tambah("puluhan,", sorotKolom("pa", ...KIRI, 1), sorotKolom("pb", ...KANAN, 1)),
      tambah("satuan.", sorotKolom("pa", ...KIRI, 2), sorotKolom("pb", ...KANAN, 2), teks("kt", 150, 150, "satuan menentukan", 10, W.kapur, { z: 3 })),
    ),
  ],
};

/* ------------------------------ Compare Placewise, terapan ------------------------------ */
const SUARA_Q1 = "Salsa membandingkan tujuh ratus dua puluh delapan dan tujuh ratus dua puluh satu. Ratusan dan puluhan sama, satuan delapan lebih besar dari satu.";
const SUARA_Q2 = "Jadi yang pertama lebih besar.";
const SUARA_Q3 = "Cocok untuk bilangan yang mirip, karena langkahnya jelas.";
const SUARA_Q4 = "Kurang cocok kalau bilangannya jauh berbeda, karena sering cukup melihat ratusan saja.";

export const ADEGAN_LUAR_TEMPAT_TERAPAN: AdeganStory = {
  id: "luar-tempat-terapan",
  judul: "Salsa membandingkan dua bilangan mirip",
  sumber: "Metode global: terapan Banding per Tempat",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_Q1,
      bersih(0),
      tambah(0, judul("Dua Bilangan Mirip", W.kapur), ...papanKapur("pk"), ...tokoh("sl", 150, 182, "Salsa")),
      tambah("delapan", ...papanTempat("pa", ...KIRI, "728", ["7", "2", "8"])),
      tambah("satu", ...papanTempat("pb", ...KANAN, "721", ["7", "2", "1"])),
      tambah("sama", centangKolom("ca", ...KIRI, 0), centangKolom("cb", ...KANAN, 0), centangKolom("ca1", ...KIRI, 1), centangKolom("cb1", ...KANAN, 1)),
      tambah("lebih", sorotKolom("pa", ...KIRI, 2), sorotKolom("pb", ...KANAN, 2)),
    ),
    k(
      SUARA_Q2,
      tambah("pertama", emo("tj", 77, 128, E.tunjuk, 20, { z: 3 })),
      tambah("lebih", ...tanda("tn", 150, 100, ">", W.emas)),
      tambah("besar.", teks("rs", 77, 146, "728 > 721", 12, W.emas, { z: 3 }), emo("pl", 150, 130, E.piala, 20, { z: 3 })),
    ),
    k(
      SUARA_Q3,
      bersih(0),
      tambah(0, judul("Cocok", W.kapur), ...papanKapur("pk"), ...kartu("cc", 50, 44, 200, 30, W.hijauMuda, ["Cocok: bilangan mirip"], 11)),
      tambah("bilangan", ...kartuAngka("m1", 60, 92, 70, 40, "728"), ...kartuAngka("m2", 170, 92, 70, 40, "721")),
      tambah("mirip,", teks("mr", 150, 156, "ratusan dan puluhan sama", 9, W.kapur, { z: 3 })),
      tambah("jelas.", emo("ok", 262, 58, E.benar, 22, { z: 3 })),
    ),
    k(
      SUARA_Q4,
      bersih(0),
      tambah(0, judul("Kurang Cocok", W.kapur), ...papanKapur("pk"), ...kartu("kc", 50, 44, 200, 30, W.merahMuda, ["Kurang cocok: jauh berbeda"], 10)),
      tambah("jauh", ...kartuAngka("m1", 60, 92, 70, 40, "905"), ...kartuAngka("m2", 170, 92, 70, 40, "112")),
      tambah("cukup", kotak("hl", 80, 96, 11, 32, "#FDE047", W.merah, { rx: 2, tebal: 1.4, op: 0.6, z: 0 })),
      tambah("ratusan", teks("rt", 150, 156, "cukup lihat ratusan: 9 dan 1", 10, W.kapur, { z: 3 })),
      tambah("saja.", emo("pm", 262, 58, E.pikir, 22, { z: 3 })),
    ),
  ],
};

