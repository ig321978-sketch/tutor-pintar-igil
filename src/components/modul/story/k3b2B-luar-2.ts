import type { AdeganStory, Obj } from "./logika-story";
import { E, W, bulat, busur, emo, garis, garisBil, judul, kartu, kotak, panah, tanah, teks, tokoh, xGaris } from "./k3b2B-gambar";
import { bersih, hapus, k, redamkan, sorotkan, tambah, ubah } from "./k3b2B-bantu";

/*
 * Cerita orisinal IGIL "Botol Air Pak Darto" (Kelas 3 Bab 2 Sub-Bab B), video metode global.
 * Naskah suara dari naskah/story-naskah-k3b2b.md. Bagian ini: Counting Up (Menghitung Naik), Number Line (Garis Bilangan), terapannya, dan ringkasan.
 */

const KUNING_KARTU = "#FEF3C7";

/** Garis bilangan tanpa angka dari x0 sampai x1 di tinggi y, dengan `n` tanda: garis `${id}-g`, tanda `${id}-t0`... */
const garisKosong = (id: string, x0: number, x1: number, y: number, n: number): Obj[] => [
  garis(`${id}-g`, x0, y, x1 - x0, 0, W.biru, 2),
  ...Array.from({ length: n + 1 }, (_, i) => garis(`${id}-t${i}`, Math.round(x0 + ((x1 - x0) * i) / n), y - 4, 0, 8, W.biru, 1.6)),
];

/* ------------------------------ Counting Up: konsep ------------------------------ */
const SUARA_N1 = "Cara kedua, Counting Up, atau Menghitung Naik.";
const SUARA_N2 = "Mulai dari bilangan yang kecil, lalu naik sampai ke bilangan yang besar.";
const SUARA_N3 = "Jarak yang dilalui adalah bilangan yang dicari.";
const SUARA_N4 = "Naik ke puluhan terdekat dulu supaya mudah.";

export const ADEGAN_LUAR_NAIK: AdeganStory = {
  id: "luar-naik",
  judul: "Counting Up atau Menghitung Naik",
  sumber: "Metode global: Menghitung Naik",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_N1,
      tambah(0, judul("Counting Up"), ...tanah("tn", 164), kotak("s1", 70, 140, 44, 24, "#FED7AA", W.coklat, { rx: 2 })),
      tambah("Counting", kotak("s2", 114, 120, 44, 44, "#FDBA74", W.coklat, { rx: 2 }), teks("nm", 240, 110, "Counting Up", 11, W.awal)),
      tambah("Menghitung", kotak("s3", 158, 100, 44, 64, "#FB923C", W.coklat, { rx: 2 }), panah("pn", 80, 130, 100, -50, W.hijau, 2.6), teks("nm2", 240, 130, "Menghitung Naik", 9, W.ungu)),
    ),
    k(
      SUARA_N2,
      bersih(0),
      tambah(0, judul("Mulai dari yang Kecil"), ...garisKosong("gl", 30, 270, 130, 12)),
      tambah("kecil,", bulat("mk", 50, 130, 6, W.bagA, W.biru), teks("lk", 50, 156, "kecil", 9, W.bagA)),
      tambah("naik", busur("bs", 50, 250, 130, 40, W.hijau)),
      tambah("besar.", bulat("mb", 250, 130, 6, W.awal, W.biru), teks("lb", 250, 156, "besar", 9, W.awal)),
    ),
    k(
      SUARA_N3,
      tambah("Jarak", teks("jr", 150, 74, "jarak", 10, W.ungu)),
      sorotkan("dilalui", "bs"),
      tambah("dicari.", teks("tq", 150, 100, "?", 22, W.merah)),
    ),
    k(
      SUARA_N4,
      hapus("Naik", "bs", "tq", "jr"),
      tambah("Naik", teks("pt", 90, 156, "puluhan", 9, W.ungu), bulat("mp", 90, 130, 5, W.emas, W.biru, { z: 2 })),
      sorotkan("puluhan", "pt"),
      tambah("terdekat", busur("b1", 50, 90, 130, 14, W.hijau)),
      tambah("dulu", busur("b2", 90, 250, 130, 36, W.hijau)),
      tambah("mudah.", emo("ok", 150, 96, E.benar, 24)),
    ),
  ],
};

/* ------------------------------ Counting Up: terapan ------------------------------ */
const SUARA_P1 = "Salsa mencari botol yang dibagikan dari delapan puluh dengan sisa tiga puluh dua.";
const SUARA_P2 = "Dari tiga puluh dua ia naik delapan ke empat puluh, lalu naik empat puluh ke delapan puluh. Jadi empat puluh delapan botol.";
const SUARA_P3 = "Cocok kalau dua bilangan berdekatan, karena langkahnya sedikit.";
const SUARA_P4 = "Kurang cocok kalau jaraknya jauh, karena langkah naik jadi banyak dan mudah terlewat.";

/** Garis bilangan 30 sampai 80: x(n) = 30 + (n - 30) * 4.8. */
const GX0 = 30;
const GS = 4.8;
const gx = (n: number): number => xGaris(GX0, GS, 30, n);

export const ADEGAN_LUAR_NAIK_TERAPAN: AdeganStory = {
  id: "luar-naik-terapan",
  judul: "Menghitung naik dari tiga puluh dua",
  sumber: "Metode global: terapan Menghitung Naik",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Salsa Menghitung Naik"), ...tokoh("sl", 36, 184, "Salsa"), ...garisBil("gb", GX0, 140, GS, 30, 80, 10)),
      tambah("dibagikan", teks("tq", 150, 84, "?", 22, W.merah)),
      tambah("delapan", bulat("m80", gx(80), 140, 5, W.awal, W.biru, { z: 2 }), teks("n80", gx(80), 118, "80", 10, W.awal)),
      tambah("tiga", bulat("m32", gx(32), 140, 5, W.bagB, W.biru, { z: 2 }), teks("n32", gx(32), 118, "32", 10, W.bagB)),
    ),
    k(
      SUARA_P2,
      tambah("naik", busur("a1", gx(32), gx(40), 140, 18, W.hijau)),
      tambah("delapan", teks("p8", Math.round((gx(32) + gx(40)) / 2) + 6, 104, "+8", 9, W.hijauTua)),
      sorotkan("empat", "gb-l40"),
      tambah("naik@2", busur("a2", gx(40), gx(80), 140, 30, W.hijau)),
      tambah("empat@2", teks("p40", Math.round((gx(40) + gx(80)) / 2), 94, "+40", 10, W.hijauTua)),
      hapus("Jadi", "tq"),
      tambah("Jadi", ...kartu("hs", 108, 58, 84, 22, KUNING_KARTU, ["48 botol"], 10)),
    ),
    k(
      SUARA_P3,
      bersih(0),
      tambah(0, judul("Cocok: Dua Bilangan Berdekatan"), ...garisKosong("gl", 40, 260, 130, 10)),
      tambah("dua", teks("n2", 150, 70, "2 bilangan", 10, W.ungu), bulat("m1", 120, 130, 6, W.bagB, W.biru), bulat("m2", 160, 130, 6, W.awal, W.biru)),
      sorotkan("berdekatan,", "m1", "m2"),
      tambah("langkahnya", busur("a1", 120, 160, 130, 14, W.hijau)),
      tambah("sedikit.", emo("ok", 150, 168, E.benar, 24)),
    ),
    k(
      SUARA_P4,
      bersih(0),
      tambah(0, judul("Kurang Cocok: Jarak Jauh"), ...garisKosong("gl", 24, 276, 130, 24)),
      tambah("jauh,", bulat("m1", 24, 130, 6, W.bagB, W.biru), bulat("m2", 276, 130, 6, W.awal, W.biru)),
      tambah("langkah", ...Array.from({ length: 4 }, (_, i) => busur(`a${i}`, 24 + i * 21, 24 + (i + 1) * 21, 130, 12, W.hijau))),
      tambah("banyak", ...Array.from({ length: 8 }, (_, i) => busur(`a${i + 4}`, 108 + i * 21, 108 + (i + 1) * 21, 130, 12, W.hijau))),
      tambah("terlewat.", emo("xs", 150, 180, E.salah, 26), teks("tl", 150, 160, "mudah terlewat", 9, W.merah)),
    ),
  ],
};

/* ------------------------------ Number Line: konsep ------------------------------ */
const SUARA_G1 = "Cara ketiga, Number Line, atau Garis Bilangan.";
const SUARA_G2 = "Bilangan awal ditaruh di garis, lalu kita melompat mundur sebesar bilangan yang dikurangkan.";
const SUARA_G3 = "Tempat mendarat adalah sisanya.";
const SUARA_G4 = "Lompat puluhan dulu, baru satuan, supaya rapi.";

export const ADEGAN_LUAR_GARIS: AdeganStory = {
  id: "luar-garis",
  judul: "Number Line atau Garis Bilangan",
  sumber: "Metode global: Garis Bilangan",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_G1,
      tambah(0, judul("Number Line"), ...garisKosong("gl", 30, 270, 120, 12)),
      tambah("Number", teks("nm", 150, 40, "Number Line", 12, W.awal)),
      tambah("Garis", teks("nm2", 150, 170, "Garis Bilangan", 10, W.ungu)),
    ),
    k(
      SUARA_G2,
      tambah("Bilangan", teks("la", 250, 150, "awal", 9, W.awal)),
      tambah("ditaruh", bulat("ma", 250, 120, 6, W.awal, W.biru, { z: 2 })),
      tambah("melompat", busur("bs", 130, 250, 120, 36, W.merah)),
      tambah("mundur", panah("pm", 190, 92, -60, 0, W.merah, 2.4), teks("lm", 160, 78, "mundur", 10, W.merah)),
      tambah("dikurangkan.", teks("ld", 190, 56, "dikurangkan", 9, W.bagA)),
    ),
    k(
      SUARA_G3,
      tambah("Tempat", bulat("md", 130, 120, 6, W.bagB, W.biru, { z: 2 })),
      tambah("mendarat", teks("ls", 130, 150, "sisa", 9, W.bagB), emo("tn", 130, 100, E.tenda, 20)),
      sorotkan("sisanya.", "md", "ls"),
    ),
    k(
      SUARA_G4,
      hapus("Lompat", "bs", "pm", "lm", "ld", "md", "ls", "tn"),
      tambah("Lompat", busur("b1", 190, 250, 120, 26, W.merah), busur("b2", 130, 190, 120, 26, W.merah)),
      tambah("puluhan", teks("pl", 220, 90, "puluhan", 9, W.merah)),
      tambah("satuan,", busur("b3", 118, 130, 120, 10, W.hijau), teks("st", 124, 100, "satuan", 8, W.hijauTua), bulat("md2", 118, 120, 6, W.bagB, W.biru, { z: 2 })),
      tambah("rapi.", emo("ok", 60, 90, E.benar, 24)),
    ),
  ],
};

/* ------------------------------ Number Line: terapan ------------------------------ */
const SUARA_R1 = "Raka mulai dari seratus di garis dan melompat mundur lima puluh ke lima puluh.";
const SUARA_R2 = "Lalu ia mundur lima lagi ke empat puluh lima.";
const SUARA_R3 = "Jadi seratus dikurangi lima puluh lima sama dengan empat puluh lima.";
const SUARA_R4 = "Cocok untuk melihat lompatannya, tetapi kurang cocok kalau garisnya harus digambar sangat panjang.";

/** Garis bilangan 40 sampai 100: x(n) = 30 + (n - 40) * 4. */
const RS = 4;
const rx = (n: number): number => xGaris(30, RS, 40, n);

export const ADEGAN_LUAR_GARIS_TERAPAN: AdeganStory = {
  id: "luar-garis-terapan",
  judul: "Lompat mundur dari seratus",
  sumber: "Metode global: terapan Garis Bilangan",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_R1,
      tambah(0, judul("Raka Melompat Mundur"), ...tokoh("rk", 36, 184, "Raka"), ...garisBil("gb", 30, 140, RS, 40, 100, 10)),
      tambah("seratus", bulat("m100", rx(100), 140, 5, W.awal, W.biru, { z: 2 }), teks("n100", rx(100), 118, "100", 10, W.awal)),
      tambah("melompat", busur("a1", rx(50), rx(100), 140, 30, W.merah)),
      tambah("lima", teks("p50", Math.round((rx(50) + rx(100)) / 2), 94, "−50", 10, W.merah)),
      tambah("lima@2", bulat("m50", rx(50), 140, 5, W.bagB, W.biru, { z: 2 }), teks("n50", rx(50), 118, "50", 10, W.bagB)),
    ),
    k(
      SUARA_R2,
      tambah("mundur", busur("a2", rx(45), rx(50), 140, 14, W.merah)),
      tambah("lima", teks("p5", Math.round((rx(45) + rx(50)) / 2), 104, "−5", 9, W.merah)),
      tambah("empat", bulat("m45", rx(45), 140, 5, W.bagB, W.biru, { z: 2 }), teks("n45", rx(45) - 4, 90, "45", 10, W.bagB)),
    ),
    k(
      SUARA_R3,
      tambah("Jadi", teks("q1", 96, 62, "100", 16, W.awal, { anchor: "start" })),
      ubah("dikurangi", { id: "q1", isi: "100 − 55" }),
      ubah("sama", { id: "q1", isi: "100 − 55 = 45" }),
      sorotkan("empat", "m45"),
    ),
    k(
      SUARA_R4,
      bersih(0),
      tambah(0, judul("Garis Bilangan yang Panjang"), ...garisKosong("gl", 8, 292, 120, 40)),
      tambah("Cocok", emo("ok", 40, 160, E.benar, 24)),
      tambah("melihat", busur("a1", 100, 130, 120, 12, W.merah), busur("a2", 130, 160, 120, 12, W.merah)),
      tambah("tetapi", emo("xs", 260, 160, E.salah, 24)),
      tambah("sangat", teks("pj", 150, 90, "sangat panjang", 10, W.merah)),
    ),
  ],
};

/* ------------------------------ Ringkasan ------------------------------ */
const SUARA_M1 = "Tiga cara sudah kita lihat. Mana yang pas tergantung apa yang ingin kamu lakukan.";
const SUARA_M2 = "Ingin memeriksa dan memilih tambah atau kurang, pakai Keluarga Fakta. Ingin mencari jarak dua bilangan yang dekat, pakai Menghitung Naik.";
const SUARA_M3 = "Ingin melihat lompatannya, pakai Garis Bilangan. Apa pun caranya, hasilnya diperiksa lagi.";
const SUARA_M4 = "Menurutmu, untuk mencari bilangan awal yang hilang, cara mana yang paling meyakinkan?";

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan tiga cara",
  sumber: "Ringkasan: tiga cara",
  latar: "#FDF4FF",
  ketukan: [
    k(
      SUARA_M1,
      tambah(0, judul("Tiga Cara, Satu Tujuan"), teks("n3", 150, 44, "3 cara", 10, W.ungu)),
      tambah("sudah", ...kartu("r0", 16, 58, 84, 44, "#DBEAFE", ["Keluarga Fakta"], 7.6), ...kartu("r1", 108, 58, 84, 44, "#DCFCE7", ["Menghitung Naik"], 7.6), ...kartu("r2", 200, 58, 84, 44, "#FEE2E2", ["Garis Bilangan"], 7.6)),
      tambah("Mana", emo("tq", 150, 150, E.tanya, 30)),
      tambah("lakukan.", teks("kk", 150, 178, "pilih sesuai kebutuhan", 9, W.ungu)),
    ),
    k(
      SUARA_M2,
      hapus("Ingin", "kk"),
      sorotkan("Keluarga", "r0-k"),
      tambah("memeriksa", teks("g0", 58, 124, "periksa", 9, W.awal)),
      tambah("dua", teks("n2", 150, 176, "2 bilangan", 9, W.ungu), teks("g1", 150, 124, "jarak dekat", 9, W.hijauTua)),
      redamkan("Ingin@2", "r0-k"),
      sorotkan("Menghitung", "r1-k"),
    ),
    k(
      SUARA_M3,
      redamkan("Ingin", "r1-k"),
      sorotkan("Garis", "r2-k"),
      tambah("melihat", teks("g2", 242, 124, "lompatan", 9, W.merah)),
      tambah("Apa", emo("pk", 150, 178, E.benar, 22)),
      tambah("diperiksa", teks("pr", 150, 192, "diperiksa lagi", 9, W.hijauTua)),
    ),
    k(
      SUARA_M4,
      redamkan("Menurutmu,", "r2-k"),
      hapus("Menurutmu,", "n2", "tq"),
      tambah("mencari", teks("la", 150, 150, "awal hilang", 10, W.bagA)),
      tambah("hilang,", emo("t1", 58, 112, E.tanya, 18), emo("t2", 150, 112, E.tanya, 18), emo("t3", 242, 112, E.tanya, 18)),
      tambah("meyakinkan?", emo("pk", 262, 176, E.pikir, 26)),
    ),
  ],
};
