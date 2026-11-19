import type { AdeganStory } from "./logika-story";
import { E, W, bulat, emo, garis, garisLompat, judul, kartu, kartuBil, panah, papanTulis, teks, tokoh } from "./k4b1f-gambar";
import { bersih, hapus, k, redamkan, sorotkan, tambah, ubah } from "./k4b1f-bantu";

/*
 * Cerita orisinal IGIL "Papan Sisa Pak Usman" (Kelas 4 Bab 1 Sub-Bab F), video metode global.
 * Naskah suara dari naskah/story-naskah-k4b1f.md. Bagian ini: Count Up (Hitung Maju) dan terapannya, Add Check (Periksa dengan Tambah) dan terapannya, ringkasan.
 */

/* ------------------------------ Count Up: konsep ------------------------------ */
const SUARA_M1 = "Cara kedua, Count Up, atau Hitung Maju.";
const SUARA_M2 = "Kita mulai dari bilangan yang kecil, lalu menghitung maju sampai bilangan yang besar.";
const SUARA_M3 = "Lompatannya dicatat, dan jumlah lompatan itulah selisihnya.";
const SUARA_M4 = "Cara ini cocok untuk dua bilangan yang berdekatan.";

export const ADEGAN_LUAR_MAJU: AdeganStory = {
  id: "luar-maju",
  judul: "Count Up: Hitung Maju",
  sumber: "Metode global: Count Up (konsep)",
  latar: "#FDF2F8",
  ketukan: [
    k(
      SUARA_M1,
      tambah(0, judul("Cara 2: Count Up"), ...papanTulis("pt", 8, 28, 284, 124)),
      tambah("Count", teks("nm", 150, 58, "Count Up", 16, W.kapurMerah)),
      tambah("Hitung", teks("ni", 150, 82, "Hitung Maju", 12, W.kapur)),
      tambah("Maju.", emo("ar", 150, 130, "\u{27A1}", 30)),
    ),
    k(
      SUARA_M2,
      bersih(0),
      tambah(0, judul("Dari Kecil ke Besar"), ...papanTulis("pt", 8, 28, 284, 124), garis("gl", 30, 100, 240, 0, W.kapur, 2.4, { z: 2 })),
      tambah("kecil,", bulat("d0", 40, 100, 6, "#FACC15", W.putih, { z: 4 }), teks("lk", 40, 124, "kecil", 9, W.kapur)),
      tambah("menghitung", panah("mj", 50, 82, 200, 0, W.kapurMerah, 2.6, { z: 4 })),
      tambah("besar.", bulat("d1", 260, 100, 6, "#FACC15", W.putih, { z: 4 }), teks("lb", 260, 124, "besar", 9, W.kapur)),
    ),
    k(
      SUARA_M3,
      tambah("Lompatannya", panah("j0", 40, 94, 60, 0, "#93C5FD", 2.2, { z: 3 }), panah("j1", 102, 94, 70, 0, "#93C5FD", 2.2, { z: 3 }), panah("j2", 174, 94, 80, 0, "#93C5FD", 2.2, { z: 3 })),
      tambah("jumlah", teks("jl", 150, 70, "jumlah lompat", 10, W.kapur)),
      tambah("selisihnya.", teks("sl", 150, 142, "= selisih", 12, W.kapurMerah)),
    ),
    k(
      SUARA_M4,
      hapus(0, "jl", "sl"),
      tambah("Cara", emo("ok", 262, 52, E.benar, 20)),
      tambah("dua", teks("n2", 60, 52, "2 bilangan", 10, W.kapur)),
      tambah("berdekatan.", teks("db", 150, 142, "berdekatan", 11, W.kapur), emo("jd", 150, 56, "\u{1F91D}", 16)),
    ),
  ],
};

/* ------------------------------ Count Up: terapan ------------------------------ */
const SUARA_N1 = "Genta menghitung dari tujuh ratus lima puluh sampai delapan ratus empat puluh.";
const SUARA_N2 = "Ia melompat ke delapan ratus, lalu empat puluh lagi, jadi lima puluh ditambah empat puluh sama dengan sembilan puluh.";
const SUARA_N3 = "Cocok untuk mencari selisih dua bilangan yang berdekatan.";
const SUARA_N4 = "Kurang cocok kalau jaraknya sangat jauh, karena lompatannya terlalu banyak.";
const GL = garisLompat("gl", 40, 100, 220, [750, 800, 840], W.kapurMerah, { z: 3 });
const dariGL = (ids: string[]) => GL.filter((o) => ids.includes(o.id));
const BANYAK = Array.from({ length: 12 }, (_, i) => panah(`bn${i}`, 30 + i * 20, 70, 16, 0, "#93C5FD", 1.8, { z: 3 }));

export const ADEGAN_LUAR_MAJU_TERAPAN: AdeganStory = {
  id: "luar-maju-terapan",
  judul: "Hitung Maju: kapan cocok",
  sumber: "Metode global: Count Up (terapan)",
  latar: "#FDF2F8",
  ketukan: [
    k(
      SUARA_N1,
      tambah(0, judul("Hitungan Genta"), ...papanTulis("pt", 8, 28, 284, 124), ...tokoh("ge", 40, 184, "Genta")),
      tambah("tujuh", ...dariGL(["gl-g", "gl-k0", "gl-n0"])),
      tambah("delapan", ...dariGL(["gl-k2", "gl-n2"])),
      tambah("menghitung", emo("ma", 72, 166, E.mata, 16)),
    ),
    k(
      SUARA_N2,
      tambah("melompat", ...dariGL(["gl-a0"])),
      tambah("delapan", ...dariGL(["gl-k1", "gl-n1"])),
      tambah("empat", ...dariGL(["gl-a1", "gl-j1"])),
      tambah("lima", ...dariGL(["gl-j0"])),
      tambah("sembilan", teks("eq", 150, 142, "50 + 40 = 90", 13, W.kapurMerah)),
    ),
    k(
      SUARA_N3,
      tambah("Cocok", emo("ok", 262, 52, E.benar, 20)),
      tambah("selisih", teks("sl", 150, 52, "selisih dekat", 10, W.kapur)),
      tambah("dua", teks("n2", 60, 52, "2 bilangan", 10, W.kapur)),
    ),
    k(
      SUARA_N4,
      hapus("Kurang", "ok", "sl", "n2", "eq"),
      tambah("jauh,", ...BANYAK.slice(0, 6)),
      tambah("lompatannya", ...BANYAK.slice(6)),
      tambah("banyak.", teks("tb", 150, 52, "terlalu banyak lompatan", 10, W.kapurMerah), emo("xs", 262, 52, E.salah, 20)),
    ),
  ],
};

/* ------------------------------ Add Check: konsep ------------------------------ */
const SUARA_P1 = "Cara ketiga, Add Check, atau Periksa dengan Tambah.";
const SUARA_P2 = "Setelah mengurangkan, kita menjumlahkan hasilnya dengan bilangan yang dikurangkan.";
const SUARA_P3 = "Hasil penjumlahan itu harus sama dengan bilangan awal.";
const SUARA_P4 = "Kalau tidak sama, ada langkah yang keliru dan kita hitung ulang.";

export const ADEGAN_LUAR_PERIKSA: AdeganStory = {
  id: "luar-periksa",
  judul: "Add Check: Periksa dengan Tambah",
  sumber: "Metode global: Add Check (konsep)",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Cara 3: Add Check"), ...papanTulis("pt", 8, 28, 284, 124)),
      tambah("Add", teks("nm", 150, 58, "Add Check", 16, W.kapurMerah)),
      tambah("Periksa", teks("ni", 150, 82, "Periksa dengan Tambah", 11, W.kapur)),
      tambah("Tambah.", emo("ok", 150, 130, E.benar, 30)),
    ),
    k(
      SUARA_P2,
      bersih(0),
      tambah(0, judul("Hasil + Dikurangkan"), ...papanTulis("pt", 8, 28, 284, 124)),
      tambah("menjumlahkan", teks("pl", 106, 92, "+", 24, W.kapur)),
      tambah("hasilnya", ...kartu("hs", 18, 70, 76, 36, "#BBF7D0", ["hasil"], 10, { z: 2 })),
      tambah("dikurangkan.", ...kartu("dk", 118, 70, 84, 36, "#FECACA", ["dikurangkan"], 10, { z: 2 }), teks("sm", 214, 92, "=", 24, W.kapur), ...kartu("qq", 226, 70, 56, 36, "#FFFFFF", ["?"], 16, { z: 2 })),
    ),
    k(
      SUARA_P3,
      sorotkan("Hasil", "hs-k", "dk-k"),
      ubah("sama", { id: "qq-t0", isi: "awal", u: 11 }),
      tambah("dengan", emo("ok", 262, 52, E.benar, 20)),
      sorotkan("awal.", "qq-k"),
    ),
    k(
      SUARA_P4,
      hapus("Kalau", "ok"),
      redamkan("Kalau", "hs-k", "dk-k", "qq-k"),
      tambah("sama,", emo("xs", 262, 52, E.salah, 20)),
      tambah("keliru", teks("hu", 150, 136, "hitung ulang", 11, W.kapurMerah)),
      tambah("ulang.", emo("ul", 150, 56, E.ulang, 18)),
    ),
  ],
};

/* ------------------------------ Add Check: terapan ------------------------------ */
const SUARA_Q1 = "Satria mengurangkan lima ratus dua puluh dikurangi tiga ratus empat puluh lima, hasilnya seratus tujuh puluh lima.";
const SUARA_Q2 = "Ia menjumlahkan seratus tujuh puluh lima dan tiga ratus empat puluh lima, hasilnya lima ratus dua puluh.";
const SUARA_Q3 = "Cocok untuk menangkap kesalahan, seperti membalik pengurangan tiap tempat.";
const SUARA_Q4 = "Kurang cocok untuk mencari hasil awal, karena cara ini hanya memeriksa.";

export const ADEGAN_LUAR_PERIKSA_TERAPAN: AdeganStory = {
  id: "luar-periksa-terapan",
  judul: "Periksa dengan Tambah: kapan cocok",
  sumber: "Metode global: Add Check (terapan)",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_Q1,
      tambah(0, judul("Hitungan Satria"), ...papanTulis("pt", 8, 28, 284, 124), ...tokoh("sa", 40, 184, "Satria")),
      tambah("lima", ...kartuBil("a", 18, 60, 520, "#FFFFFF", 70, 36), teks("mn", 100, 88, "−", 24, W.kapur)),
      tambah("tiga", ...kartuBil("b", 112, 60, 345, "#FFFFFF", 70, 36), teks("sm", 194, 88, "=", 24, W.kapur)),
      tambah("seratus", ...kartuBil("c", 208, 60, 175, "#BBF7D0", 70, 36)),
    ),
    k(
      SUARA_Q2,
      bersih(0),
      tambah(0, judul("Periksa dengan Tambah"), ...papanTulis("pt", 8, 28, 284, 124), ...tokoh("sa", 40, 184, "Satria")),
      tambah("seratus", ...kartuBil("c", 18, 60, 175, "#BBF7D0", 70, 36), teks("pl", 100, 88, "+", 24, W.kapur)),
      tambah("tiga", ...kartuBil("b", 112, 60, 345, "#FFFFFF", 70, 36), teks("sm", 194, 88, "=", 24, W.kapur)),
      tambah("hasilnya", ...kartuBil("a", 208, 60, 520, "#FFFFFF", 70, 36)),
      tambah(16, emo("ok", 262, 52, E.benar, 20)),
    ),
    k(
      SUARA_Q3,
      tambah("Cocok", emo("ma", 40, 52, E.mata, 18)),
      tambah("kesalahan,", teks("ks", 150, 128, "salah langsung ketahuan", 10, W.kapur)),
      tambah("membalik", panah("fl1", 120, 112, 0, -14, W.kapurMerah, 2), panah("fl2", 134, 98, 0, 14, W.kapurMerah, 2)),
    ),
    k(
      SUARA_Q4,
      hapus("Kurang", "ma", "ks", "fl1", "fl2", "ok"),
      tambah("mencari", emo("xs", 262, 52, E.salah, 20)),
      tambah("awal,", teks("tm", 150, 128, "bukan untuk mencari", 10, W.kapurMerah)),
      tambah("memeriksa.", teks("hm", 150, 144, "hanya memeriksa", 10, W.kapur)),
    ),
  ],
};

/* ------------------------------ Ringkasan ------------------------------ */
const SUARA_G1 = "Tiga cara sudah kita lihat bersama Pak Usman. Mana yang pas tergantung keadaan.";
const SUARA_G2 = "Ingin cara yang rapi, pakai Susun dan Pinjam. Ingin mencari selisih yang dekat, pakai Hitung Maju.";
const SUARA_G3 = "Ingin memastikan hasil, pakai Periksa dengan Tambah. Apa pun caranya, jangan lupa memeriksa.";
const SUARA_G4 = "Menurutmu, untuk mengurangkan dua bilangan yang selisihnya kecil, cara mana yang paling pas?";

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan tiga cara",
  sumber: "Metode global: ringkasan",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_G1,
      tambah(0, judul("Tiga Cara, Pilih yang Pas"), ...kartu("r0", 14, 38, 170, 30, "#BFDBFE", ["Susun dan Pinjam"], 11), ...kartu("r1", 14, 78, 170, 30, "#FDE68A", ["Hitung Maju"], 11), ...kartu("r2", 14, 118, 170, 30, "#BBF7D0", ["Periksa dengan Tambah"], 10)),
      tambah(0, emo("e0", 202, 60, E.catat, 20), emo("e1", 202, 100, E.ulang, 20), emo("e2", 202, 140, E.benar, 20), teks("n3", 254, 90, "3 cara", 11, W.ungu)),
      tambah("Usman.", ...tokoh("pu", 254, 184, "Pak Usman")),
      tambah("pas", emo("tq", 254, 130, E.tanya, 20)),
    ),
    k(
      SUARA_G2,
      sorotkan("rapi,", "r0-k"),
      tambah("Pinjam.", emo("ok", 228, 58, E.benar, 20)),
      redamkan("mencari", "r0-k"),
      sorotkan("dekat,", "r1-k"),
      hapus("Maju.", "ok"),
      tambah("Maju.", emo("ok2", 228, 98, E.benar, 20)),
    ),
    k(
      SUARA_G3,
      redamkan("memastikan", "r1-k"),
      sorotkan("memastikan", "r2-k"),
      tambah("Tambah.", emo("ok3", 228, 138, E.benar, 20)),
      tambah("jangan", teks("ps", 254, 110, "periksa", 10, W.merah)),
      tambah("memeriksa.", emo("mt", 262, 58, E.mata, 20)),
    ),
    k(
      SUARA_G4,
      hapus("Menurutmu,", "n3", "ps", "tq", "ok2", "ok3", "mt"),
      redamkan("Menurutmu,", "r2-k"),
      tambah("Menurutmu,", teks("tq2", 254, 96, "?", 36, W.merah)),
      tambah("dua", teks("n2", 254, 128, "2 bilangan", 9, W.ungu)),
      tambah("pas?", emo("kc", 254, 150, E.pikir, 20)),
    ),
  ],
};
