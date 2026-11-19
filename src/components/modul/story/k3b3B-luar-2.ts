import type { AdeganStory } from "./logika-story";
import { E, W, bulat, emo, garis, garisBil, judul, kartu, kotak, panah, tanah, teks, tokoh } from "./k3b3B-gambar";
import { bersih, hapus, k, redamkan, sorotkan, tambah, ubah } from "./k3b3B-bantu";

/*
 * Cerita orisinal IGIL "Pita Pak Wayan" (Kelas 3 Bab 3 Sub-Bab B), video metode global.
 * Naskah suara dari naskah/story-naskah-k3b3b.md. Bagian ini: Number Line (Garis Bilangan), Split Strategy (Cara Memecah), terapannya, dan ringkasan.
 */

const PITA = "#FDE047";

/** Garis bilangan sentimeter 0 sampai 400: x(n) = 30 + 0.6 n. Tanda `${id}${i}-t` di i * 100. */
const gx = (n: number): number => Math.round((30 + 0.6 * n) * 10) / 10;
const tandaSeratus = (id: string, y: number) => [0, 1, 2, 3, 4].map((i) => garis(`${id}${i}`, gx(i * 100), y - 4, 0, 8, W.biru, 1.6));

/* ------------------------------ Number Line: konsep ------------------------------ */
const SUARA_G1 = "Cara kedua, Number Line, atau Garis Bilangan.";
const SUARA_G2 = "Garis meteran dari nol sampai empat meter, ditandai tiap seratus sentimeter.";
const SUARA_G3 = "Kita bisa melihat langsung bahwa dua meter ada di angka dua ratus sentimeter.";
const SUARA_G4 = "Kita juga bisa membandingkan dua ukuran dengan melihat mana yang lebih jauh dari nol.";

export const ADEGAN_LUAR_GARIS: AdeganStory = {
  id: "luar-garis",
  judul: "Number Line atau Garis Bilangan",
  sumber: "Metode global: Garis Bilangan",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_G1,
      tambah(0, judul("Number Line"), garisBil("gl", 30, 120, 240), ...tandaSeratus("gt", 120)),
      tambah("Number", teks("nm", 150, 56, "Number Line", 12, W.biru)),
      tambah("Garis", teks("nm2", 150, 166, "Garis Bilangan", 10, W.ungu)),
    ),
    k(
      SUARA_G2,
      tambah("nol", teks("b0", gx(0), 138, "0", 8, W.biru)),
      tambah("empat", teks("b4", gx(400), 100, "4 m", 10, W.meter)),
      sorotkan("ditandai", "gt1", "gt2", "gt3"),
      tambah("seratus", teks("b1", gx(100), 138, "100", 8, W.biru)),
    ),
    k(
      SUARA_G3,
      redamkan("melihat", "gt1", "gt2", "gt3"),
      tambah("melihat", panah("pa", gx(200), 70, 0, 42, W.merah, 2.4)),
      tambah("dua", teks("b2m", gx(200), 66, "2 m", 10, W.meter), bulat("mk2", gx(200), 120, 5, W.merah, W.biru, { z: 2 })),
      tambah("dua@2", teks("b2", gx(200), 138, "200", 8, W.biru)),
    ),
    k(
      SUARA_G4,
      tambah("membandingkan", teks("bq", 210, 100, "dua titik", 8.4, W.ungu)),
      tambah("dua", bulat("mk3", gx(350), 120, 5, W.hijau, W.biru, { z: 2 })),
      tambah("lebih", teks("lj", gx(350), 86, "lebih jauh", 8.6, W.hijauTua)),
      tambah("jauh", panah("pj", gx(0), 150, 210, 0, W.hijau, 2.6)),
      tambah("nol.", teks("ln", 150, 186, "jauh dari nol", 9, W.hijauTua)),
    ),
  ],
};

/* ------------------------------ Number Line: terapan ------------------------------ */
const SUARA_P1 = "Bima menandai seratus lima puluh sentimeter di garis.";
const SUARA_P2 = "Letaknya di antara satu meter dan dua meter, tepat di tengah.";
const SUARA_P3 = "Jadi seratus lima puluh sentimeter sama dengan satu meter lima puluh sentimeter.";
const SUARA_P4 = "Cocok untuk membandingkan ukuran, tetapi kurang cocok kalau ukurannya besar sekali karena garisnya jadi panjang.";

/** Garis bilangan terapan: x(n) = 40 + 0.6 n (0 sampai 400). */
const hx = (n: number): number => Math.round((40 + 0.6 * n) * 10) / 10;

export const ADEGAN_LUAR_GARIS_TERAPAN: AdeganStory = {
  id: "luar-garis-terapan",
  judul: "Bima menandai seratus lima puluh",
  sumber: "Metode global: terapan Garis Bilangan",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Bima Menandai Garis"), ...tokoh("bm", 28, 184, "Bima"), garis("hg", hx(0), 110, 240, 0, W.biru, 2), ...[0, 1, 2, 3, 4].map((i) => garis(`ht${i}`, hx(i * 100), 106, 0, 8, W.biru, 1.6))),
      tambah(0, ...[1, 2, 3].map((i) => teks(`hl${i}`, hx(i * 100), 128, String(i * 100), 8, W.biru))),
      tambah("seratus", bulat("mk", hx(150), 110, 6, W.senti, W.biru, { z: 2 })),
      tambah("sentimeter", teks("n150", hx(150), 92, "150 cm", 11, W.senti)),
    ),
    k(
      SUARA_P2,
      tambah("satu", teks("m1", hx(100), 70, "1 m", 10, W.meter)),
      tambah("dua", teks("m2", hx(200), 70, "2 m", 10, W.meter)),
      tambah("tepat", kotak("br", hx(100), 102, 60, 16, undefined, W.merah, { putus: true, z: 3 })),
      sorotkan("tengah.", "mk"),
      tambah("tengah.", emo("ok", 250, 96, E.benar, 22)),
    ),
    k(
      SUARA_P3,
      tambah("seratus", teks("q1", 70, 158, "150 cm", 14, W.senti, { anchor: "start" })),
      ubah("sama", { id: "q1", isi: "150 cm =" }),
      ubah("satu", { id: "q1", isi: "150 cm = 1 m" }),
      ubah("lima@2", { id: "q1", isi: "150 cm = 1 m 50 cm" }),
    ),
    k(
      SUARA_P4,
      bersih(0),
      tambah(0, judul("Cocok dan Kurang Cocok"), garis("sg", 40, 66, 120, 0, W.biru, 2), garis("sg0", 40, 62, 0, 8, W.biru, 1.6), garis("sg1", 100, 62, 0, 8, W.biru, 1.6), garis("sg2", 160, 62, 0, 8, W.biru, 1.6)),
      tambah("Cocok", emo("ok", 210, 68, E.benar, 24)),
      tambah("membandingkan", bulat("sm1", 70, 66, 5, W.hijau, W.biru, { z: 2 }), bulat("sm2", 130, 66, 5, W.senti, W.biru, { z: 2 })),
      tambah("tetapi", emo("xs", 150, 122, E.salah, 22)),
      tambah("besar", garis("lg", 8, 144, 288, 0, W.biru, 2), ...Array.from({ length: 13 }, (_, i) => garis(`lt${i}`, 8 + i * 24, 140, 0, 8, W.biru, 1.4))),
      tambah("panjang.", teks("pj", 150, 172, "sangat panjang", 10, W.merah)),
    ),
  ],
};

/* ------------------------------ Split Strategy: konsep ------------------------------ */
const SUARA_C1 = "Cara ketiga, Split Strategy, atau Cara Memecah.";
const SUARA_C2 = "Pecah ukuran menjadi bagian meter dan bagian sentimeter.";
const SUARA_C3 = "Hitung tiap bagian sendiri-sendiri, lalu gabungkan hasilnya.";
const SUARA_C4 = "Cara ini rapi untuk menjumlahkan dan mengurangkan.";

export const ADEGAN_LUAR_PECAH: AdeganStory = {
  id: "luar-pecah",
  judul: "Split Strategy atau Cara Memecah",
  sumber: "Metode global: Cara Memecah",
  latar: "#FDF4FF",
  ketukan: [
    k(
      SUARA_C1,
      tambah(0, judul("Split Strategy")),
      tambah("Split", kotak("bar", 40, 70, 220, 20, PITA, W.kuningTua, { rx: 2, tebal: 1.6 })),
      tambah("Strategy,", garis("sp", 160, 60, 0, 40, W.merah, 2, { putus: true, z: 3 }), emo("gt", 160, 112, E.gunting, 18)),
      tambah("Memecah.", teks("nm", 150, 140, "Split Strategy", 12, W.biru), teks("nm2", 150, 160, "Cara Memecah", 10, W.ungu)),
    ),
    k(
      SUARA_C2,
      hapus(0, "nm", "nm2", "gt"),
      tambah("meter", kotak("pm", 40, 70, 120, 20, "#93C5FD", W.biru, { rx: 2, tebal: 1.6, z: 1 }), teks("lm", 100, 118, "bagian meter", 9, W.meter)),
      tambah("sentimeter.", kotak("ps", 160, 70, 100, 20, "#FDBA74", W.biru, { rx: 2, tebal: 1.6, z: 1 }), teks("ls", 210, 118, "bagian sentimeter", 9, W.senti)),
    ),
    k(
      SUARA_C3,
      tambah("Hitung", ...kartu("h1", 48, 134, 100, 24, "#DBEAFE", ["hitung meter"], 9)),
      tambah("sendiri-sendiri,", ...kartu("h2", 160, 134, 100, 24, "#FFEDD5", ["hitung sentimeter"], 9)),
      tambah("gabungkan", panah("pj1", 98, 160, 40, 14, W.ungu, 2.2), panah("pj2", 210, 160, -40, 14, W.ungu, 2.2)),
      tambah("hasilnya.", ...kartu("h3", 80, 176, 140, 20, "#DCFCE7", ["gabungkan hasilnya"], 9)),
    ),
    k(
      SUARA_C4,
      tambah("rapi", emo("ok", 280, 150, E.benar, 22)),
      tambah("menjumlahkan", teks("pl", 266, 56, "+", 20, W.hijauTua)),
      tambah("mengurangkan.", teks("mn", 288, 56, "−", 20, W.merah)),
    ),
  ],
};

/* ------------------------------ Split Strategy: terapan ------------------------------ */
const SUARA_Q1 = "Raka menjumlahkan dua meter tiga puluh sentimeter dan satu meter lima puluh sentimeter.";
const SUARA_Q2 = "Meter: dua tambah satu sama dengan tiga. Sentimeter: tiga puluh tambah lima puluh sama dengan delapan puluh.";
const SUARA_Q3 = "Hasilnya tiga meter delapan puluh sentimeter.";
const SUARA_Q4 = "Kurang cocok kalau sentimeternya lebih dari seratus, karena harus ditukar menjadi satu meter dulu.";

export const ADEGAN_LUAR_PECAH_TERAPAN: AdeganStory = {
  id: "luar-pecah-terapan",
  judul: "Raka menjumlahkan dengan Cara Memecah",
  sumber: "Metode global: terapan Cara Memecah",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_Q1,
      tambah(0, judul("Raka Menjumlahkan"), ...tanah("tn", 150), ...tokoh("rk", 36, 184, "Raka")),
      tambah("dua", kotak("pa", 60, 56, 100, 14, PITA, W.kuningTua, { rx: 1, tebal: 1.4 })),
      tambah("tiga", teks("la", 110, 88, "2 m 30 cm", 10, W.meter)),
      tambah("satu", kotak("pb", 60, 100, 65, 14, "#FDBA74", W.kuningTua, { rx: 1, tebal: 1.4 })),
      tambah("lima", teks("lb", 92, 132, "1 m 50 cm", 10, W.senti)),
    ),
    k(
      SUARA_Q2,
      tambah("dua", teks("e1", 190, 150, "2 + 1", 13, W.meter)),
      ubah("tiga.", { id: "e1", isi: "2 + 1 = 3 m" }),
      tambah("tiga@2", teks("e2", 190, 172, "30 + 50", 13, W.senti)),
      ubah("delapan", { id: "e2", isi: "30 + 50 = 80 cm" }),
    ),
    k(
      SUARA_Q3,
      hapus(0, "pa", "pb", "la", "lb", "e1", "e2"),
      tambah("tiga", kotak("pc", 60, 70, 165, 14, "#86EFAC", W.hijauTua, { rx: 1, tebal: 1.6 })),
      tambah("meter", teks("r1", 118, 112, "3 m", 20, W.meter)),
      tambah("puluh", teks("r2", 190, 112, "80 cm", 20, W.senti)),
    ),
    k(
      SUARA_Q4,
      bersih(0),
      tambah(0, judul("Kurang Cocok: Sentimeter Lebih"), emo("xs", 262, 50, E.salah, 22)),
      tambah("sentimeternya", teks("o1", 150, 72, "70 cm + 60 cm = 130 cm", 11, W.biru), kotak("ob", 60, 106, 180, 8, PITA, W.kuningTua, { rx: 1, tebal: 1.2 })),
      tambah("seratus", teks("o2", 150, 98, "130 cm lebih dari 100 cm", 10, W.merah)),
      tambah("ditukar", teks("o3", 150, 124, "tukar 100 cm", 10, W.ungu)),
      tambah("satu", teks("o4", 150, 144, "jadi 1 m", 10, W.ungu)),
    ),
  ],
};

/* ------------------------------ Ringkasan ------------------------------ */
const SUARA_M1 = "Tiga cara sudah kita lihat. Mana yang pas tergantung kebutuhan.";
const SUARA_M2 = "Mengubah banyak ukuran sekaligus, pakai Tabel Perbandingan. Melihat dan membandingkan, pakai Garis Bilangan.";
const SUARA_M3 = "Menjumlah atau mengurangkan ukuran gabungan, pakai Cara Memecah. Apa pun caranya, satuan yang sama dihitung bersama.";
const SUARA_M4 = "Menurutmu, untuk menyambung dua pita, cara mana yang paling pas?";

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan tiga cara",
  sumber: "Ringkasan: tiga cara",
  latar: "#FDF4FF",
  ketukan: [
    k(
      SUARA_M1,
      tambah(0, judul("Tiga Cara, Satu Tujuan"), teks("n3", 150, 44, "3 cara", 10, W.ungu)),
      tambah("sudah", ...kartu("r0", 16, 58, 84, 44, "#DBEAFE", ["Tabel Perbandingan"], 7.4), ...kartu("r1", 108, 58, 84, 44, "#DCFCE7", ["Garis Bilangan"], 7.6), ...kartu("r2", 200, 58, 84, 44, "#FEE2E2", ["Cara Memecah"], 7.6)),
      tambah("Mana", emo("tq", 150, 150, E.tanya, 30)),
      tambah("kebutuhan.", teks("kk", 150, 178, "pilih sesuai kebutuhan", 9, W.ungu)),
    ),
    k(
      SUARA_M2,
      hapus(0, "kk"),
      sorotkan("Tabel", "r0-k"),
      tambah("banyak", teks("g0", 58, 124, "banyak ukuran", 8.4, W.biru)),
      redamkan("Melihat", "r0-k"),
      sorotkan("Garis", "r1-k"),
      tambah("membandingkan,", teks("g1", 150, 124, "membandingkan", 8.4, W.hijauTua)),
    ),
    k(
      SUARA_M3,
      redamkan("Menjumlah", "r1-k"),
      tambah("gabungan,", teks("g2", 242, 124, "ukuran gabungan", 8.4, W.merah)),
      sorotkan("Cara", "r2-k"),
      tambah("Apa", emo("pk", 150, 176, E.benar, 22)),
      tambah("satuan", teks("pr", 150, 192, "satuan sama dihitung bersama", 9, W.hijauTua)),
    ),
    k(
      SUARA_M4,
      redamkan("Menurutmu,", "r2-k"),
      hapus("Menurutmu,", "g0", "g1", "g2", "pr", "pk", "tq"),
      tambah("menyambung", teks("n2", 150, 160, "2 pita", 10, W.ungu)),
      tambah("pita,", kotak("pa", 70, 130, 70, 10, PITA, W.kuningTua, { rx: 1, tebal: 1.2 }), kotak("pb", 144, 130, 86, 10, "#FDBA74", W.kuningTua, { rx: 1, tebal: 1.2 })),
      tambah("cara", emo("t1", 58, 114, E.tanya, 18), emo("t2", 150, 114, E.tanya, 18), emo("t3", 242, 114, E.tanya, 18)),
      tambah("pas?", emo("pk2", 262, 176, E.pikir, 26)),
    ),
  ],
};
