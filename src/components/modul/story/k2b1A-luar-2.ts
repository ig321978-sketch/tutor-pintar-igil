import type { AdeganStory } from "./logika-story";
import { E, W, WK, emo, gs, judul, kartu, kotak, kueEmo, lantai, nampan, panah, teks, tokoh } from "./k2b1A-gambar";
import { bersih, hapus, k, tambah, ubah } from "./k2b1A-bantu";

/*
 * Cerita orisinal IGIL "Kue Kiriman dari Dapur" (Kelas 2 Bab 1 Sub-Bab A), video metode global.
 * Naskah suara dari naskah/story-naskah-k2b1a.md. Bagian ini: Skip Counting, Counting On, dan ringkasan.
 */

/* ------------------------------ Skip Counting: konsep ------------------------------ */
const SUARA_L1 = "Cara kedua, Skip Counting, atau Hitung Meloncat.";
const SUARA_L2 = "Kita menyebut bilangan dengan loncatan yang tetap, misalnya sepuluh-sepuluh.";
const SUARA_L3 = "Sepuluh, dua puluh, tiga puluh, empat puluh.";
const SUARA_L4 = "Setiap loncatan sama dengan satu kotak yang penuh.";

/** Titik garis bilangan: 0, 10, 20, 30, 40. */
const TX = [24, 84, 144, 204, 264];
const GARIS_Y = 132;

export const ADEGAN_LUAR_LONCAT: AdeganStory = {
  id: "luar-loncat",
  judul: "Skip Counting: Hitung Meloncat",
  sumber: "Metode global: Skip Counting (konsep)",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_L1,
      tambah(0, judul("Cara 2: Skip Counting"), lantai("lt", 168), gs("gl", 14, GARIS_Y, 286, GARIS_Y, W.biru, 3), ...TX.map((x, i) => gs(`tk${i}`, x, GARIS_Y - 5, x, GARIS_Y + 5, W.biru, 2))),
      tambah("Skip", emo("kt", TX[0], 122, "\u{1F438}", 22)),
      tambah("Hitung", teks("hm", 150, 164, "Hitung Meloncat", 12, W.ungu)),
      ubah("Meloncat.", { id: "kt", x: TX[1] }),
    ),
    k(
      SUARA_L2,
      ubah(0, { id: "kt", x: TX[0] }),
      tambah("loncatan", panah("h0", TX[0] + 8, 100, TX[1] - 8, 100, W.hijau), teks("j0", (TX[0] + TX[1]) / 2, 90, "+10", 10, W.hijau)),
      tambah("tetap,", panah("h1", TX[1] + 8, 100, TX[2] - 8, 100, W.hijau), teks("j1", (TX[1] + TX[2]) / 2, 90, "+10", 10, W.hijau)),
      tambah("misalnya", panah("h2", TX[2] + 8, 100, TX[3] - 8, 100, W.hijau), teks("j2", (TX[2] + TX[3]) / 2, 90, "+10", 10, W.hijau)),
      tambah("sepuluh-sepuluh.", panah("h3", TX[3] + 8, 100, TX[4] - 8, 100, W.hijau), teks("j3", (TX[3] + TX[4]) / 2, 90, "+10", 10, W.hijau)),
    ),
    k(
      SUARA_L3,
      tambah(0, teks("v-0", TX[0], 152, "0", 12, W.biru)),
      tambah("Sepuluh", teks("v1", TX[1], 152, "10", 12, W.merah)),
      ubah("Sepuluh", { id: "kt", x: TX[1] }),
      tambah("dua", teks("v2", TX[2], 152, "20", 12, W.merah)),
      ubah("dua", { id: "kt", x: TX[2] }),
      tambah("tiga", teks("v3", TX[3], 152, "30", 12, W.merah)),
      ubah("tiga", { id: "kt", x: TX[3] }),
      tambah("empat", teks("v4", TX[4], 152, "40", 12, W.merah)),
      ubah("empat", { id: "kt", x: TX[4] }),
    ),
    k(
      SUARA_L4,
      hapus(0, "hm"),
      tambah("kotak", ...[0, 1, 2, 3].flatMap((i) => [kotak(`bx${i}`, (TX[i] + TX[i + 1]) / 2 - 22, 166, 44, 20, WK.kotakKue, W.coklat, { rx: 3, tebal: 1.6 }), teks(`bxt${i}`, (TX[i] + TX[i + 1]) / 2, 180, "10", 11, W.biru)])),
      tambah("satu", teks("sk", 150, 196, "1 loncatan = 1 kotak", 9, W.ungu)),
      ubah("penuh.", ...[0, 1, 2, 3].map((i) => ({ id: `bx${i}`, sorot: true }))),
    ),
  ],
};

/* ------------------------------ Skip Counting: terapan ------------------------------ */
const SUARA_M1 = "Nia menghitung kotak kue yang bertumpuk: sepuluh, dua puluh, tiga puluh, empat puluh.";
const SUARA_M2 = "Empat kotak, jadi ada empat puluh kue.";
const SUARA_M3 = "Cocok kalau semua kotak berisi sama banyak.";
const SUARA_M4 = "Kurang cocok kalau isi kotaknya berbeda-beda, karena loncatannya tidak tetap.";

const TUMPUK_Y = [128, 102, 76, 50];

export const ADEGAN_LUAR_LONCAT_TERAPAN: AdeganStory = {
  id: "luar-loncat-terapan",
  judul: "Skip Counting: kotak bertumpuk",
  sumber: "Metode global: Skip Counting (terapan)",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_M1,
      tambah(0, judul("Kotak Bertumpuk"), lantai("lt", 168)),
      tambah("Nia", ...tokoh("ni", 30, 178, "Nia")),
      tambah("kotak", ...TUMPUK_Y.map((y, i) => kotak(`tp${i}`, 75, y, 70, 24, WK.kotakKue, W.coklat, { rx: 3, tebal: 1.8 }))),
      tambah("sepuluh,", teks("cc0", 190, TUMPUK_Y[0] + 17, "10", 13, W.merah)),
      tambah("dua", teks("cc1", 190, TUMPUK_Y[1] + 17, "20", 13, W.merah)),
      tambah("tiga", teks("cc2", 190, TUMPUK_Y[2] + 17, "30", 13, W.merah)),
      tambah("empat", teks("cc3", 190, TUMPUK_Y[3] + 17, "40", 13, W.merah)),
    ),
    k(
      SUARA_M2,
      tambah("Empat", teks("n4", 246, 100, "4 kotak", 12, W.ungu)),
      tambah("empat@2", teks("n40", 246, 130, "40 kue", 14, W.merah)),
      ubah("kue.", ...TUMPUK_Y.map((_, i) => ({ id: `tp${i}`, sorot: true }))),
    ),
    k(
      SUARA_M3,
      hapus(0, "n4", "n40"),
      ubah(0, ...TUMPUK_Y.map((_, i) => ({ id: `tp${i}`, sorot: false }))),
      tambah("Cocok", emo("ok", 246, 70, E.benar, 28)),
      tambah("berisi", ...TUMPUK_Y.map((y, i) => teks(`ib${i}`, 110, y + 17, "10", 11, W.biru))),
      tambah("sama", ...kartu("sm", 206, 100, 84, 26, W.hijauMuda, ["sama banyak"], 9)),
    ),
    k(
      SUARA_M4,
      hapus(0, "ok", "sm-k", "sm-t0"),
      ubah("berbeda-beda,", ...["10", "7", "12", "9"].map((isi, i) => ({ id: `ib${3 - i}`, isi, warna: W.merah }))),
      tambah("loncatannya", ...kartu("tt", 206, 100, 84, 26, W.merahMuda, ["loncat tak tetap"], 8.6)),
      tambah("tidak", emo("xs", 246, 70, E.salah, 28)),
    ),
  ],
};

/* ------------------------------ Counting On: konsep ------------------------------ */
const SUARA_N1 = "Cara ketiga, Counting On, atau Hitung Lanjut.";
const SUARA_N2 = "Mulailah dari bilangan yang sudah diketahui, jangan dari awal.";
const SUARA_N3 = "Ucapkan bilangan besarnya dulu, lalu sambung menghitung sisanya.";
const SUARA_N4 = "Cara ini menghemat tenaga, apalagi kalau jumlah awalnya sudah pasti.";

export const ADEGAN_LUAR_LANJUT: AdeganStory = {
  id: "luar-lanjut",
  judul: "Counting On: Hitung Lanjut",
  sumber: "Metode global: Counting On (konsep)",
  latar: "#FDF4FF",
  ketukan: [
    k(
      SUARA_N1,
      tambah(0, judul("Cara 3: Counting On"), lantai("lt", 168)),
      tambah("Counting", ...kartu("ck", 100, 50, 100, 44, W.krem, ["Counting On"], 14)),
      tambah("Hitung", ...kartu("hl", 70, 108, 160, 30, W.hijauMuda, ["Hitung Lanjut"], 14)),
      tambah("Lanjut.", panah("pl", 100, 160, 200, 160, W.hijau)),
    ),
    k(
      SUARA_N2,
      hapus(0, "ck-k", "ck-t0", "hl-k", "hl-t0", "pl"),
      tambah("Mulailah", ...kartu("st", 60, 60, 80, 50, W.krem, ["25"], 28), emo("fg", 68, 58, "\u{1F6A9}", 20)),
      tambah("diketahui,", teks("dk2", 100, 128, "sudah diketahui", 10, W.hijau)),
      tambah("jangan", teks("ml", 205, 92, "1, 2, 3, 4 ...", 14, W.merah), emo("xx", 270, 86, E.salah, 22)),
      ubah("awal.", { id: "ml", sorot: true }),
    ),
    k(
      SUARA_N3,
      hapus(0, "ml", "xx", "dk2"),
      tambah("Ucapkan", emo("bc", 100, 140, "\u{1F4AC}", 24)),
      tambah("sambung", panah("sp", 146, 86, 178, 86, W.hijau)),
      tambah("menghitung", teks("sg", 232, 90, "26, 27 ...", 12, W.hijau)),
      ubah("sisanya.", { id: "sg", sorot: true }, { id: "st-k", sorot: true }),
    ),
    k(
      SUARA_N4,
      hapus(0, "bc"),
      tambah("menghemat", emo("tn", 236, 150, E.kuat, 26)),
      tambah("jumlah", teks("ja", 100, 150, "jumlah awal: 25", 10, W.ungu)),
      tambah("pasti.", emo("ok", 150, 182, E.benar, 24)),
    ),
  ],
};

/* ------------------------------ Counting On: terapan ------------------------------ */
const SUARA_P1 = "Chacha tahu nampan pertama berisi dua puluh lima kue, lalu ada tiga kue lepas.";
const SUARA_P2 = "Ia menyambung dari dua puluh lima: dua puluh enam, dua puluh tujuh, dua puluh delapan.";
const SUARA_P3 = "Cocok kalau sebagian jumlahnya sudah diketahui.";
const SUARA_P4 = "Kurang cocok kalau belum ada jumlah awal yang bisa dipakai.";

const KX = [200, 226, 252];

export const ADEGAN_LUAR_LANJUT_TERAPAN: AdeganStory = {
  id: "luar-lanjut-terapan",
  judul: "Counting On: menyambung hitungan",
  sumber: "Metode global: Counting On (terapan)",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Dua Puluh Lima dan Tiga"), lantai("lt", 168)),
      tambah("Chacha", ...tokoh("ch", 30, 178, "Chacha")),
      tambah("nampan", nampan("nt", 30, 70, 130, 60, { z: -1 })),
      tambah("lima", teks("l25", 95, 108, "25", 30, W.merah)),
      tambah("tiga", teks("l3", 226, 128, "3 lepas", 10, W.ungu)),
      tambah("lepas.", ...KX.map((x, i) => kueEmo(`kl${i}`, x, 96, 18))),
    ),
    k(
      SUARA_P2,
      tambah("menyambung", panah("pn", 166, 100, 186, 96, W.hijau)),
      ubah("lima:", { id: "l25", sorot: true }),
      tambah("enam,", teks("c26", KX[0], 70, "26", 12, W.merah)),
      tambah("tujuh,", teks("c27", KX[1], 70, "27", 12, W.merah)),
      tambah("delapan.", teks("c28", KX[2], 70, "28", 12, W.merah)),
      ubah("delapan.", ...KX.map((_, i) => ({ id: `kl${i}`, sorot: true }))),
    ),
    k(
      SUARA_P3,
      bersih(0),
      tambah(0, judul("Kapan Cocok?")),
      tambah("Cocok", emo("ok", 150, 76, E.benar, 28)),
      tambah("sebagian", ...kartu("sb", 50, 96, 200, 28, W.hijauMuda, ["sebagian jumlah sudah tahu"], 10)),
      tambah("diketahui.", ...kartu("ds", 100, 136, 100, 26, W.krem, ["25 + 3"], 14)),
    ),
    k(
      SUARA_P4,
      bersih(0),
      tambah(0, judul("Kapan Kurang Cocok?")),
      tambah("Kurang", emo("xs", 150, 70, E.salah, 28)),
      tambah("belum", ...kartu("tq", 100, 100, 100, 44, W.merahMuda, ["?"], 26)),
      tambah("awal", teks("ta", 150, 166, "tidak ada jumlah awal", 10, W.merah)),
      ubah("dipakai.", { id: "tq-k", sorot: true }),
    ),
  ],
};

/* ------------------------------ Ringkasan ------------------------------ */
const SUARA_R1 = "Kita sudah melihat tiga cara. Mana yang pas? Itu tergantung kuenya.";
const SUARA_R2 = "Kuenya rapi dan sedikit, pakai Bingkai Sepuluh. Semua kotak sama isi, pakai Hitung Meloncat.";
const SUARA_R3 = "Sebagian jumlahnya sudah diketahui, pakai Hitung Lanjut. Apa pun caranya, jangan sampai ada yang terlewat atau terhitung dua kali.";
const SUARA_R4 = "Menurutmu, untuk menghitung empat kotak penuh dan tiga kue lepas, kamu pilih cara yang mana?";

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan tiga cara",
  sumber: "Metode global: ringkasan",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_R1,
      tambah(0, judul("Tiga Cara, Mana yang Pas?")),
      tambah("tiga", teks("t3", 150, 152, "3 cara", 14, W.ungu)),
      tambah("cara.", ...kartu("r0", 60, 34, 180, 26, W.langit, ["1. Ten Frame"], 11), ...kartu("r1", 60, 68, 180, 26, W.krem, ["2. Skip Counting"], 11), ...kartu("r2", 60, 102, 180, 26, W.hijauMuda, ["3. Counting On"], 11)),
      tambah("pas?", emo("qq", 150, 186, E.tanya, 24)),
      tambah("kuenya.", kueEmo("kq", 226, 160, 24)),
    ),
    k(
      SUARA_R2,
      bersih(0),
      tambah(0, judul("Pilih Cara Menurut Kue")),
      tambah("rapi", ...kartu("q0a", 14, 44, 120, 30, W.krem, ["kue rapi, sedikit"], 9)),
      tambah("Bingkai", ...kartu("q0b", 150, 44, 136, 30, W.langit, ["Bingkai Sepuluh (10)"], 8.6)),
      tambah("Semua", ...kartu("q1a", 14, 92, 120, 30, W.krem, ["kotak sama isi"], 9)),
      tambah("Hitung", ...kartu("q1b", 150, 92, 136, 30, W.hijauMuda, ["Hitung Meloncat"], 9)),
    ),
    k(
      SUARA_R3,
      tambah("Sebagian", ...kartu("q2a", 14, 140, 120, 30, W.krem, ["sebagian sudah tahu"], 9)),
      tambah("Hitung", ...kartu("q2b", 150, 140, 136, 30, W.lavender, ["Hitung Lanjut"], 9)),
      tambah("jangan", ...kartu("jg", 30, 172, 240, 22, W.merahMuda, ["jangan terlewat, jangan 2 kali"], 9)),
    ),
    k(
      SUARA_R4,
      bersih(0),
      tambah("Menurutmu,", judul("Pilih Caramu")),
      tambah("empat", ...[0, 1, 2, 3].flatMap((i) => [kotak(`bo${i}`, 18 + i * 68, 44, 56, 26, WK.kotakKue, W.coklat, { rx: 3, tebal: 1.6 }), teks(`bot${i}`, 46 + i * 68, 61, "10", 12, W.biru)]), teks("e4", 150, 90, "4 kotak penuh", 10, W.ungu)),
      tambah("tiga", ...[0, 1, 2].map((i) => kueEmo(`kk${i}`, 120 + i * 30, 112, 18)), teks("e3", 150, 136, "3 kue lepas", 10, W.ungu)),
      tambah("pilih", ...kartu("o0", 14, 150, 86, 24, W.langit, ["Ten Frame"], 8.4), ...kartu("o1", 107, 150, 86, 24, W.krem, ["Skip Counting"], 8.4), ...kartu("o2", 200, 150, 86, 24, W.hijauMuda, ["Counting On"], 8.4)),
      tambah("mana?", emo("qq", 150, 190, E.tanya, 22)),
    ),
  ],
};
