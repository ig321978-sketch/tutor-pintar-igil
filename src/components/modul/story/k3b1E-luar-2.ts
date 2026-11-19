import type { AdeganStory } from "./logika-story";
import { E, W, barisButir, batang, bulat, emo, garis, judul, kapur, kartu, panah, papanKapur, teks, tokoh, tokoLatar } from "./k3b1E-gambar";
import { bersih, k, sorotkan, tambah } from "./k3b1E-bantu";

/*
 * Cerita orisinal IGIL "Sisa Stok Pak Anto" (Kelas 3 Bab 1 Sub-Bab E), video metode global.
 * Naskah suara dari naskah/story-naskah-k3b1e.md. Bagian ini: Counting Up (Menghitung Naik), Regrouping (Pinjam Puluhan), terapannya, dan ringkasan.
 */

/** Garis bilangan `${id}` dari x0 sampai x1 pada tinggi y, dengan tanda ujung `${id}-a` dan `${id}-b`. */
const garisBil = (id: string, x0: number, x1: number, y: number) => [
  garis(id, x0, y, x1 - x0, 0, W.biru, 2.4, { z: 2 }),
  garis(`${id}-a`, x0, y - 6, 0, 12, W.biru, 2, { z: 2 }),
  garis(`${id}-b`, x1, y - 6, 0, 12, W.biru, 2, { z: 2 }),
];

/* ------------------------------ Counting Up: konsep ------------------------------ */
const SUARA_C1 = "Cara kedua, Counting Up, atau Menghitung Naik.";
const SUARA_C2 = "Mulai dari bilangan yang dikurangi, naik sampai bilangan besar.";
const SUARA_C3 = "Jumlah semua langkah naik itulah selisihnya.";
const SUARA_C4 = "Cara ini sering lebih cepat kalau kedua bilangan berdekatan.";

export const ADEGAN_LUAR_NAIK: AdeganStory = {
  id: "luar-naik",
  judul: "Counting Up: Menghitung Naik",
  sumber: "Metode global: Counting Up (konsep)",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_C1,
      bersih(0),
      tambah(0, judul("Cara Kedua"), ...tokoLatar("tk")),
      tambah("Counting", ...kartu("nm", 50, 42, 200, 30, W.krem, ["Counting Up"], 13)),
      tambah("Menghitung", teks("nid", 150, 108, "Menghitung Naik", 12, W.ungu, { z: 2 })),
      tambah("Naik.", emo("ic", 150, 154, "\u{1F4C8}", 34)),
    ),
    k(
      SUARA_C2,
      bersih(0),
      tambah(0, judul("Naik dari Bilangan Kecil"), ...tokoLatar("tk")),
      tambah("bilangan", ...garisBil("gl", 30, 270, 120)),
      tambah("dikurangi,", bulat("t1", 30, 120, 6, W.merah, W.merahTua, { z: 3 }), teks("tk1", 30, 144, "kecil", 9, W.merahTua, { z: 3 })),
      tambah("sampai", panah("p1", 36, 100, 228, 0, W.ungu, 2.6)),
      tambah("besar.", bulat("t2", 270, 120, 6, W.hijau, W.hijauTua, { z: 3 }), teks("tk2", 270, 144, "besar", 9, W.hijauTua, { z: 3 })),
    ),
    k(
      SUARA_C3,
      tambah("langkah", ...[0, 1, 2].map((i) => garis(`hp${i}`, 30 + i * 80, 104, 0, -12, W.ungu, 2, { z: 3 })), teks("h1", 70, 84, "langkah", 8, W.ungu, { z: 3 }), teks("h2", 150, 84, "langkah", 8, W.ungu, { z: 3 }), teks("h3", 230, 84, "langkah", 8, W.ungu, { z: 3 })),
      tambah("itulah", ...kartu("kj", 70, 156, 160, 24, W.kuning, ["jumlah = selisih"], 11)),
      tambah("selisihnya.", emo("kl", 258, 166, E.kilau, 18)),
    ),
    k(
      SUARA_C4,
      bersih(0),
      tambah(0, judul("Cepat bila Berdekatan"), ...tokoLatar("tk")),
      tambah("cepat", emo("kt", 150, 70, "\u{26A1}", 30)),
      tambah("kedua", ...garisBil("gd", 100, 200, 128), bulat("d1", 100, 128, 5, W.merah, W.merahTua, { z: 3 })),
      tambah("berdekatan.", bulat("d2", 200, 128, 5, W.hijau, W.hijauTua, { z: 3 }), teks("dk", 150, 156, "dekat", 10, W.ungu, { z: 3 })),
    ),
  ],
};

/* ------------------------------ Counting Up: terapan ------------------------------ */
const SUARA_T1 = "Salsa menghitung delapan puluh dua dikurangi tujuh puluh enam. Dari tujuh puluh enam naik empat ke delapan puluh, lalu dua ke delapan puluh dua.";
const SUARA_T2 = "Empat ditambah dua sama dengan enam. Selisihnya enam.";
const SUARA_T3 = "Cocok kalau kedua bilangan berdekatan.";
const SUARA_T4 = "Kurang cocok kalau selisihnya besar, karena langkah naik terlalu panjang.";

export const ADEGAN_LUAR_NAIK_TERAPAN: AdeganStory = {
  id: "luar-naik-terapan",
  judul: "Salsa menghitung naik dari tujuh puluh enam",
  sumber: "Metode global: Counting Up (terapan)",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_T1,
      bersih(0),
      tambah(0, judul("Salsa Menghitung Naik"), ...tokoLatar("tk"), ...tokoh("sl", 38, 172, "Salsa")),
      tambah("delapan", ...kartu("sk", 90, 38, 120, 26, W.kuning, ["82 - 76"], 13)),
      tambah("naik", ...garisBil("gl", 30, 270, 124), teks("l76", 30, 146, "76", 12, W.biru, { z: 3 })),
      tambah("empat", panah("a1", 32, 108, 156, 0, "#2563EB", 2.6), teks("p4", 110, 98, "+4", 12, "#2563EB", { z: 3 }), teks("l80", 190, 146, "80", 12, W.biru, { z: 3 })),
      tambah("dua@2", panah("a2", 192, 108, 76, 0, W.merah, 2.6), teks("p2", 232, 98, "+2", 12, W.merah, { z: 3 }), teks("l82", 270, 146, "82", 12, W.merahTua, { z: 3 })),
    ),
    k(
      SUARA_T2,
      tambah("ditambah", ...kartu("ju", 70, 160, 130, 24, W.hijauMuda, ["4 + 2 = 6"], 12)),
      tambah("sama", emo("ok", 216, 172, E.benar, 20)),
      tambah("Selisihnya", ...kartu("sl2", 100, 66, 100, 20, W.kuning, ["selisih 6"], 11)),
    ),
    k(
      SUARA_T3,
      bersih(0),
      tambah(0, judul("Kapan Cocok?"), ...tokoLatar("tk"), ...kartu("cc", 80, 38, 140, 26, W.hijauMuda, ["Cocok"], 13)),
      tambah("bilangan", ...garisBil("gd", 100, 200, 112), bulat("d1", 100, 112, 5, W.merah, W.merahTua, { z: 3 })),
      tambah("berdekatan.", bulat("d2", 200, 112, 5, W.hijau, W.hijauTua, { z: 3 }), emo("sy", 150, 150, E.senyum, 26)),
    ),
    k(
      SUARA_T4,
      bersih(0),
      tambah(0, judul("Kapan Kurang Cocok?"), ...tokoLatar("tk"), ...kartu("kc", 70, 38, 160, 26, W.merahMuda, ["Kurang cocok"], 13)),
      tambah("besar,", ...garisBil("gj", 20, 280, 116), teks("m12", 20, 138, "12", 11, W.biru, { z: 3 }), teks("m91", 280, 138, "91", 11, W.biru, { z: 3 })),
      tambah("langkah", ...Array.from({ length: 9 }, (_, i) => garis(`hp${i}`, 36 + i * 28, 104, 0, -10, W.ungu, 1.8, { z: 3 }))),
      tambah("panjang.", emo("lh", 150, 168, E.lelah, 26)),
    ),
  ],
};

/* ------------------------------ Regrouping: konsep ------------------------------ */
const SUARA_P1 = "Cara ketiga, Regrouping, atau Pinjam Puluhan.";
const SUARA_P2 = "Kalau satuan atas terlalu kecil, buka satu puluhan menjadi sepuluh satuan.";
const SUARA_P3 = "Puluhan berkurang satu, satuan bertambah sepuluh.";
const SUARA_P4 = "Setelah itu pengurangan bisa dilanjutkan seperti biasa.";

export const ADEGAN_LUAR_PINJAM: AdeganStory = {
  id: "luar-pinjam",
  judul: "Regrouping: Pinjam Puluhan",
  sumber: "Metode global: Regrouping (konsep)",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_P1,
      bersih(0),
      tambah(0, judul("Cara Ketiga"), ...tokoLatar("tk")),
      tambah("Regrouping,", ...kartu("nm", 50, 42, 200, 30, W.krem, ["Regrouping"], 13)),
      tambah("Pinjam", teks("nid", 150, 108, "Pinjam Puluhan", 12, W.ungu, { z: 2 })),
      tambah("Puluhan.", emo("ic", 150, 154, E.kardus, 34)),
    ),
    k(
      SUARA_P2,
      bersih(0),
      tambah(0, judul("Satu Puluhan Dibuka"), ...tokoLatar("tk")),
      tambah("kecil,", ...kartu("sk", 16, 40, 110, 24, W.merahMuda, ["satuan atas kecil"], 9)),
      tambah("satu", ...batang("bt", 62, 78, 40), teks("lb1", 66, 128, "1 puluhan", 9, W.biru, { z: 3 })),
      tambah("menjadi", panah("pb", 100, 96, 50, 0, W.merah, 2.6)),
      tambah("satuan@2", ...barisButir("bu", 156, 90, 10, 13), teks("lb2", 222, 128, "10 satuan", 9, W.biru, { z: 3 })),
    ),
    k(
      SUARA_P3,
      tambah("satu,", ...kartu("mn", 40, 148, 100, 24, W.krem, ["puluhan -1"], 11)),
      tambah("bertambah", ...kartu("pl", 160, 148, 110, 24, W.hijauMuda, ["satuan +10"], 11)),
    ),
    k(
      SUARA_P4,
      tambah("pengurangan", panah("pk", 150, 70, 0, 14, W.hijau, 2.4)),
      tambah("seperti", emo("ok", 150, 54, E.benar, 20), emo("sy", 270, 150, E.senyum, 22)),
    ),
  ],
};

/* ------------------------------ Regrouping: terapan ------------------------------ */
const SUARA_Q1 = "Bima mengurangi enam puluh dua dengan tiga puluh delapan. Dua tidak cukup dikurangi delapan.";
const SUARA_Q2 = "Ia meminjam: enam puluh jadi lima puluh, dua jadi dua belas. Hasilnya dua puluh empat.";
const SUARA_Q3 = "Cocok kalau satuan atas lebih kecil dari satuan bawah.";
const SUARA_Q4 = "Kurang cocok kalau tidak perlu meminjam, karena langkahnya jadi lebih banyak.";

export const ADEGAN_LUAR_PINJAM_TERAPAN: AdeganStory = {
  id: "luar-pinjam-terapan",
  judul: "Bima mengurangi enam puluh dua dengan tiga puluh delapan",
  sumber: "Metode global: Regrouping (terapan)",
  latar: "#FEFCE8",
  ketukan: [
    k(
      SUARA_Q1,
      bersih(0),
      tambah(0, judul("Bima Mengurangi"), ...tokoLatar("tk"), ...papanKapur("pk", 14, 34, 150, 120), ...tokoh("bm", 246, 172, "Bima")),
      tambah("enam", kapur("sn-a", 112, 76, "62", 26, { anchor: "end" })),
      tambah("tiga", kapur("sn-m", 70, 106, "-", 26), kapur("sn-b", 112, 106, "38", 26, { anchor: "end" }), garis("sn-g", 58, 113, 64, 0, "#F8FAFC", 1.8, { z: 3 })),
      tambah("dua@2", ...kartu("k1", 176, 50, 118, 28, W.kuning, ["2 kurang dari 8"], 11)),
      tambah("cukup", emo("x1", 262, 100, E.salah, 22)),
    ),
    k(
      SUARA_Q2,
      tambah("lima", ...kartu("k2", 176, 90, 118, 28, W.hijauMuda, ["60 jadi 50"], 12)),
      tambah("jadi@2", ...kartu("k3", 176, 124, 118, 28, W.hijauMuda, ["2 jadi 12"], 12)),
      tambah("Hasilnya", kapur("hs", 112, 142, "24", 26, { anchor: "end", warna: "#FDE047" }), emo("ok", 262, 150, E.benar, 20)),
    ),
    k(
      SUARA_Q3,
      bersih(0),
      tambah(0, judul("Kapan Cocok?"), ...tokoLatar("tk"), ...kartu("cc", 80, 38, 140, 26, W.hijauMuda, ["Cocok"], 13)),
      tambah("satuan", ...kartu("ca", 40, 84, 100, 40, W.krem, ["satuan atas", "kecil"], 10)),
      tambah("lebih", teks("lk", 150, 108, "<", 24, W.merahTua, { z: 3 })),
      tambah("bawah.", ...kartu("cb", 160, 84, 100, 40, W.krem, ["satuan bawah", "besar"], 10), emo("sy", 150, 150, E.senyum, 26)),
    ),
    k(
      SUARA_Q4,
      bersih(0),
      tambah(0, judul("Kapan Kurang Cocok?"), ...tokoLatar("tk"), ...kartu("kc", 70, 38, 160, 26, W.merahMuda, ["Kurang cocok"], 13)),
      tambah("tidak", ...kartu("ct", 60, 84, 180, 30, W.krem, ["tidak perlu meminjam"], 11)),
      tambah("langkahnya", ...[0, 1, 2, 3].map((i) => bulat(`sl${i}`, 90 + i * 40, 140, 7, W.oranye, W.coklat, { z: 3 }))),
      tambah("banyak.", emo("lh", 150, 176, E.lelah, 24)),
    ),
  ],
};

/* ------------------------------ Ringkasan ------------------------------ */
const SUARA_R1 = "Tiga cara sudah kita lihat. Mana yang pas tergantung bilangannya.";
const SUARA_R2 = "Biasa saja, pakai Pengurangan Bersusun. Dua bilangan berdekatan, pakai Menghitung Naik.";
const SUARA_R3 = "Satuan atas terlalu kecil, pakai Pinjam Puluhan. Apa pun caranya, periksa dengan penjumlahan.";
const SUARA_R4 = "Menurutmu, untuk mengurangi seratus dengan sembilan puluh sembilan, cara mana yang paling cepat?";

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan tiga cara mengurangi",
  sumber: "Ringkasan: tiga cara mengurangi",
  latar: "#FEF9C3",
  ketukan: [
    k(
      SUARA_R1,
      bersih(0),
      tambah(0, judul("Tiga Cara"), ...tokoLatar("tk"), teks("n3", 252, 44, "3 cara", 10, W.ungu, { z: 2 })),
      tambah("sudah", ...kartu("r0", 14, 70, 88, 50, W.kuning, ["Pengurangan", "Bersusun"], 8.6)),
      tambah("Mana", ...kartu("r1", 106, 70, 88, 50, W.hijauMuda, ["Menghitung", "Naik"], 8.6)),
      tambah("bilangannya.", ...kartu("r2", 198, 70, 88, 50, W.merahMuda, ["Pinjam", "Puluhan"], 8.6)),
    ),
    k(
      SUARA_R2,
      sorotkan("Pengurangan", "r0-k"),
      tambah("Pengurangan", teks("ls0", 58, 140, "biasa saja", 9, W.coklat, { z: 3 })),
      tambah("Dua", teks("ls1", 150, 140, "2 bilangan dekat", 9, W.coklat, { z: 3 })),
      sorotkan("Menghitung", "r1-k"),
    ),
    k(
      SUARA_R3,
      tambah("kecil,", teks("ls2", 242, 140, "satuan atas kecil", 8, W.coklat, { z: 3 })),
      sorotkan("Pinjam", "r2-k"),
      tambah("periksa", ...kartu("pr", 70, 152, 160, 24, W.putih, ["periksa dengan tambah"], 10)),
      tambah("penjumlahan.", emo("ok", 252, 166, E.benar, 20)),
    ),
    k(
      SUARA_R4,
      bersih(0),
      tambah(0, judul("Mana Paling Cepat?"), ...tokoLatar("tk")),
      tambah("seratus", ...kartu("s1", 40, 54, 100, 40, W.kuning, ["100"], 22)),
      tambah("sembilan", ...kartu("s2", 160, 54, 100, 40, W.hijauMuda, ["99"], 22), teks("mn", 150, 80, "-", 22, W.biru, { z: 3 })),
      tambah("mana", emo("q0", 70, 130, E.tanya, 22), emo("q1", 150, 130, E.tanya, 22), emo("q2", 230, 130, E.tanya, 22)),
      tambah("cepat?", emo("pk", 150, 168, E.pikir, 30)),
    ),
  ],
};
