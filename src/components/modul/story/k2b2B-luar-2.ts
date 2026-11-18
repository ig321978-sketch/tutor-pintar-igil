import type { AdeganStory } from "./logika-story";
import { E, W, WK, bulat, emo, gs, jalurBilangan, judul, kartu, lantai, panah, teks, tokoh } from "./k2b2B-gambar";
import { bersih, hapus, k, sorotkan, tambah, ubah } from "./k2b2B-bantu";
import { NAMA_METODE_ID, WARNA_METODE, kepala } from "./k2b2B-luar-1";

/* Video metode global Sub-Bab B: Fact Family (Keluarga Bilangan), Subtract from Ten (Kurangi dari Sepuluh), dan ringkasan. */

/* ------------------------------ 4. Fact Family: konsep ------------------------------ */
const SUARA_F1 = "Cara kedua, Fact Family, atau Keluarga Bilangan.";
const SUARA_F2 = "Tiga bilangan yang berhubungan membentuk satu keluarga, misalnya delapan, tujuh, dan lima belas.";
const SUARA_F3 = "Dari satu keluarga ada dua penjumlahan dan dua pengurangan.";
const SUARA_F4 = "Kalau satu sudah dikenal, yang lain bisa dicari dari keluarganya.";

export const ADEGAN_LUAR_KELUARGA: AdeganStory = {
  id: "luar-keluarga",
  judul: "Fact Family: keluarga bilangan",
  sumber: "Metode global: Fact Family",
  latar: "#FEFCE8",
  ketukan: [
    k(
      SUARA_F1,
      tambah(0, ...kepala(1)),
      tambah("Fact", ...kartu("ep", 30, 70, 240, 40, W.krem, ["Fact Family"], 14)),
      tambah("Keluarga", ...kartu("bp", 30, 124, 240, 40, W.putih, ["Keluarga Bilangan"], 14)),
    ),
    k(
      SUARA_F2,
      hapus(0, "ep-k", "ep-t0", "bp-k", "bp-t0"),
      tambah("Tiga", ...kartu("k3", 14, 60, 80, 22, WK.puluhan, ["3 bilangan"], 9.2)),
      tambah("satu", ...kartu("k1", 206, 60, 80, 22, WK.satuan, ["1 keluarga"], 9.2)),
      tambah(8, gs("g1", 110, 118, 140, 90, W.biru, 1.6), gs("g2", 190, 118, 160, 90, W.biru, 1.6), gs("g3", 118, 134, 182, 134, W.biru, 1.6), bulat("n8", 100, 134, 15, WK.puluhan, W.biru, { tebal: 1.8 }), teks("n8t", 100, 140, "8", 15, W.biru, { z: 1 })),
      tambah(9, bulat("n7", 200, 134, 15, WK.satuan, W.biru, { tebal: 1.8 }), teks("n7t", 200, 140, "7", 15, W.biru, { z: 1 })),
      tambah(11, bulat("n15", 150, 76, 17, W.krem, W.biru, { tebal: 2 }), teks("n15t", 150, 82, "15", 15, W.merah, { z: 1 })),
    ),
    k(
      SUARA_F3,
      bersih(0),
      tambah(0, judul("1 keluarga: 4 kalimat")),
      tambah("dua", teks("la", 150, 44, "2 penjumlahan", 10, W.merah), ...kartu("fa", 14, 50, 130, 28, W.hijauMuda, ["8 + 7 = 15"], 11), ...kartu("fb", 156, 50, 130, 28, W.hijauMuda, ["7 + 8 = 15"], 11)),
      tambah("dua@2", teks("lb", 150, 100, "2 pengurangan", 10, W.merah), ...kartu("fc", 14, 106, 130, 28, W.merahMuda, ["15 − 7 = 8"], 11), ...kartu("fd", 156, 106, 130, 28, W.merahMuda, ["15 − 8 = 7"], 11)),
    ),
    k(
      SUARA_F4,
      sorotkan("satu", "fa-k"),
      tambah("dikenal,", emo("ok", 150, 168, E.benar, 24)),
      ubah("dicari", { id: "fb-t0", isi: "? + ? = ?" }, { id: "fc-t0", isi: "? − ? = ?" }, { id: "fd-t0", isi: "? − ? = ?" }),
      tambah("keluarganya.", emo("lp", 262, 168, E.lampu, 24)),
    ),
  ],
};

/* ------------------------------ 5. Fact Family: terapan ------------------------------ */
const SUARA_G1 = "Dika tahu tujuh ditambah delapan sama dengan lima belas. Jadi lima belas dikurangi tujuh sama dengan delapan.";
const SUARA_G2 = "Dan lima belas dikurangi delapan sama dengan tujuh.";
const SUARA_G3 = "Cocok kalau kamu sudah hafal penjumlahannya.";
const SUARA_G4 = "Kurang cocok kalau penjumlahan dasarnya belum dihafal, karena tidak ada yang bisa dipakai.";

export const ADEGAN_LUAR_KELUARGA_TERAPAN: AdeganStory = {
  id: "luar-keluarga-terapan",
  judul: "Keluarga bilangan: terapan",
  sumber: "Metode global: Fact Family (terapan)",
  latar: "#FEFCE8",
  ketukan: [
    k(
      SUARA_G1,
      tambah(0, ...kepala(1), lantai("tn", 150), ...tokoh("dk", 30, 184, E.dika, "Dika")),
      tambah("tujuh", teks("g1", 150, 78, "7", 22, W.biru)),
      ubah("ditambah", { id: "g1", isi: "7 +" }),
      ubah("delapan", { id: "g1", isi: "7 + 8" }),
      ubah("sama", { id: "g1", isi: "7 + 8 =" }),
      ubah("lima", { id: "g1", isi: "7 + 8 = 15" }),
      tambah("lima@2", teks("g2", 150, 118, "15", 22, W.merah)),
      ubah("dikurangi", { id: "g2", isi: "15 −" }),
      ubah("tujuh@2", { id: "g2", isi: "15 − 7" }),
      ubah("sama@2", { id: "g2", isi: "15 − 7 =" }),
      ubah("delapan@2", { id: "g2", isi: "15 − 7 = 8" }),
    ),
    k(
      SUARA_G2,
      tambah("lima", teks("g3", 150, 158, "15", 22, W.merah)),
      ubah("dikurangi", { id: "g3", isi: "15 −" }),
      ubah("delapan", { id: "g3", isi: "15 − 8" }),
      ubah("sama", { id: "g3", isi: "15 − 8 =" }),
      ubah("tujuh.", { id: "g3", isi: "15 − 8 = 7" }),
    ),
    k(
      SUARA_G3,
      hapus(0, "g1", "g2", "g3"),
      tambah("Cocok", emo("ok", 150, 96, E.benar, 30)),
      tambah("hafal", ...kartu("hf", 70, 112, 160, 26, W.hijauMuda, ["hafal 7 + 8"], 11)),
      tambah("penjumlahannya.", emo("lp", 262, 96, E.lampu, 26)),
    ),
    k(
      SUARA_G4,
      hapus(0, "ok", "lp"),
      tambah("Kurang", emo("sl", 150, 96, E.salah, 30)),
      ubah("dihafal,", { id: "hf-t0", isi: "7 + 8 = ?" }),
      tambah("tidak", emo("tq", 262, 96, E.tanya, 26)),
    ),
  ],
};

/* ------------------------------ 6. Subtract from Ten: konsep ------------------------------ */
const SUARA_H1 = "Cara ketiga, Subtract from Ten, atau Kurangi dari Sepuluh.";
const SUARA_H2 = "Kurangi dulu dari sepuluh, lalu tambahkan sisa yang tadi belum dipakai.";
const SUARA_H3 = "Cara ini enak dipakai kalau bilangan awalnya antara sebelas dan sembilan belas.";
const SUARA_H4 = "Sepuluh adalah patokan yang mudah dikurangi.";

const SEL = [11, 12, 13, 14, 15, 16, 17, 18, 19];

export const ADEGAN_LUAR_KURANGI_SEPULUH: AdeganStory = {
  id: "luar-kurangi-sepuluh",
  judul: "Subtract from Ten: kurangi dari sepuluh",
  sumber: "Metode global: Subtract from Ten",
  latar: "#FDF2F8",
  ketukan: [
    k(
      SUARA_H1,
      tambah(0, ...kepala(2)),
      tambah("Subtract", ...kartu("ep", 30, 70, 240, 40, W.krem, ["Subtract from Ten"], 14)),
      tambah("Kurangi", ...kartu("bp", 30, 124, 240, 40, W.putih, ["Kurangi dari Sepuluh"], 14)),
      tambah("Sepuluh.", teks("t10", 258, 150, "10", 14, W.merah)),
    ),
    k(
      SUARA_H2,
      hapus(0, "ep-k", "ep-t0", "bp-k", "bp-t0", "t10"),
      tambah("Kurangi", ...kartu("u1", 24, 80, 120, 36, WK.puluhan, ["kurangi dari 10"], 9.6)),
      tambah("lalu", panah("pa", 146, 98, 156, 98, W.merah)),
      tambah("tambahkan", ...kartu("u2", 158, 80, 120, 36, WK.satuan, ["+ sisa"], 11)),
      tambah("belum", emo("tq", 218, 144, E.tanya, 26)),
    ),
    k(
      SUARA_H3,
      hapus(0, "u1-k", "u1-t0", "pa", "u2-k", "u2-t0", "tq"),
      tambah("bilangan", ...jalurBilangan("jb", 100, 10, 19, 30, 270)),
      sorotkan("sebelas", "jb-q11"),
      sorotkan("sembilan", ...SEL.map((n) => `jb-q${n}`)),
      tambah(11, ...kartu("rg", 80, 140, 140, 24, W.hijauMuda, ["11 sampai 19"], 10)),
    ),
    k(
      SUARA_H4,
      hapus(0, "rg-k", "rg-t0"),
      sorotkan("Sepuluh", "jb-q10"),
      tambah("Sepuluh", bulat("bk", 150, 74, 20, W.krem, W.biru, { tebal: 2.4 }), teks("bkt", 150, 81, "10", 18, W.merah, { z: 1 })),
      tambah("patokan", emo("pt", 262, 70, "\u{1F4CD}", 26)),
      tambah("mudah", emo("ok", 36, 70, E.benar, 24)),
    ),
  ],
};

/* ------------------------------ 7. Subtract from Ten: terapan ------------------------------ */
const SUARA_J1 = "Chacha menghitung empat belas dikurangi sembilan. Sepuluh dikurangi sembilan sama dengan satu.";
const SUARA_J2 = "Satu ditambah empat, yaitu sisa dari empat belas, sama dengan lima.";
const SUARA_J3 = "Cocok kalau yang dikurangkan hampir sepuluh, seperti sembilan atau delapan.";
const SUARA_J4 = "Kurang cocok kalau yang dikurangkan kecil, seperti dua.";

export const ADEGAN_LUAR_KURANGI_SEPULUH_TERAPAN: AdeganStory = {
  id: "luar-kurangi-sepuluh-terapan",
  judul: "Kurangi dari sepuluh: terapan",
  sumber: "Metode global: Subtract from Ten (terapan)",
  latar: "#FDF2F8",
  ketukan: [
    k(
      SUARA_J1,
      tambah(0, ...kepala(2), lantai("tn", 150), ...tokoh("ch", 30, 184, E.chacha, "Chacha")),
      tambah("belas", teks("j1", 150, 80, "14", 22, W.biru)),
      ubah("dikurangi", { id: "j1", isi: "14 −" }),
      ubah("sembilan.", { id: "j1", isi: "14 − 9" }),
      tambah("Sepuluh", teks("j2", 150, 124, "10", 22, W.merah)),
      ubah("dikurangi@2", { id: "j2", isi: "10 −" }),
      ubah("sembilan@2", { id: "j2", isi: "10 − 9" }),
      ubah("sama", { id: "j2", isi: "10 − 9 =" }),
      ubah("satu.", { id: "j2", isi: "10 − 9 = 1" }),
    ),
    k(
      SUARA_J2,
      hapus(0, "j1", "j2"),
      tambah(0, teks("j3", 150, 172, "1", 20, W.merah)),
      ubah("ditambah", { id: "j3", isi: "1 +" }),
      tambah("empat,", bulat("n4", 200, 122, 15, WK.satuan, W.biru, { tebal: 1.8 }), teks("n4t", 200, 128, "4", 15, W.biru, { z: 1 })),
      ubah("empat,", { id: "j3", isi: "1 + 4" }),
      sorotkan("sisa", "n4"),
      tambah("belas,", gs("l1", 142, 82, 108, 108, W.biru, 1.6), gs("l2", 158, 82, 192, 108, W.biru, 1.6), bulat("t14", 150, 68, 17, W.krem, W.biru, { tebal: 2 }), teks("t14t", 150, 74, "14", 15, W.merah, { z: 1 }), bulat("n10", 100, 122, 15, WK.puluhan, W.biru, { tebal: 1.8 }), teks("n10t", 100, 128, "10", 14, W.biru, { z: 1 })),
      ubah("sama", { id: "j3", isi: "1 + 4 =" }),
      ubah("lima.", { id: "j3", isi: "1 + 4 = 5" }),
    ),
    k(
      SUARA_J3,
      bersih(0),
      tambah(0, ...kepala(2), lantai("tn", 150)),
      tambah("Cocok", emo("ok", 262, 80, E.benar, 26)),
      tambah("delapan", ...kartu("c8", 20, 90, 60, 40, WK.satuan, ["8"], 20)),
      tambah("sembilan", ...kartu("c9", 90, 90, 60, 40, WK.satuan, ["9"], 20)),
      tambah("sepuluh,", ...kartu("c10", 160, 90, 60, 40, WK.puluhan, ["10"], 20)),
      sorotkan("sepuluh,", "c10-k"),
    ),
    k(
      SUARA_J4,
      hapus(0, "ok", "c8-k", "c8-t0", "c9-k", "c9-t0"),
      tambah("Kurang", emo("sl", 262, 80, E.salah, 26)),
      tambah("kecil,", ...kartu("c2", 20, 90, 60, 40, W.merahMuda, ["2"], 20)),
      tambah("dua.", panah("jh", 84, 110, 156, 110, W.merah), emo("jm", 120, 96, "\u{23F3}", 20)),
    ),
  ],
};

/* ------------------------------ 8. Ringkasan ------------------------------ */
const SUARA_R1 = "Kita sudah melihat tiga cara. Mana yang pas? Itu tergantung bilangannya.";
const SUARA_R2 = "Hafal penjumlahannya, pakai Keluarga Bilangan. Selisihnya kecil, pakai Berpikir Penjumlahan. Yang dikurangkan hampir sepuluh, pakai Kurangi dari Sepuluh.";
const SUARA_R3 = "Apa pun caranya, periksa dengan penjumlahan.";
const SUARA_R4 = "Menurutmu, untuk tiga belas dikurangi delapan, kamu pilih cara yang mana?";

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan tiga metode global",
  sumber: "Metode global: ringkasan",
  latar: "#EEF2FF",
  ketukan: [
    k(
      SUARA_R1,
      tambah(0, judul("3 cara, pilih yang pas")),
      tambah("tiga", ...kartu("s0", 20, 36, 260, 34, WARNA_METODE[0], [`1. ${NAMA_METODE_ID[0]}`], 10.4)),
      tambah("cara.", ...kartu("s1", 20, 80, 260, 34, WARNA_METODE[1], [`2. ${NAMA_METODE_ID[1]}`], 10.4)),
      tambah("pas?", ...kartu("s2", 20, 124, 260, 34, WARNA_METODE[2], [`3. ${NAMA_METODE_ID[2]}`], 10.4)),
      tambah("tergantung", emo("tq", 150, 188, E.tanya, 24)),
    ),
    k(
      SUARA_R2,
      bersih(0),
      tambah(0, judul("Pilih sesuai bilangan")),
      tambah("Hafal", ...kartu("y0", 14, 36, 272, 34, WARNA_METODE[1], ["hafal tambah: Keluarga Bilangan"], 9.2)),
      tambah("Selisihnya", ...kartu("y1", 14, 82, 272, 34, WARNA_METODE[0], ["selisih kecil: Berpikir Penjumlahan"], 9.2)),
      tambah("Yang", ...kartu("y2", 14, 128, 272, 34, WARNA_METODE[2], ["hampir 10: Kurangi dari Sepuluh"], 9.2)),
    ),
    k(
      SUARA_R3,
      hapus(0, "y0-k", "y0-t0", "y1-k", "y1-t0", "y2-k", "y2-t0"),
      tambah("periksa", emo("kc", 150, 80, E.kaca, 34)),
      tambah("dengan", ...kartu("pe", 60, 110, 180, 34, W.hijauMuda, ["periksa dengan tambah"], 11)),
      tambah("penjumlahan.", emo("ok", 262, 80, E.benar, 28)),
    ),
    k(
      SUARA_R4,
      bersih(0),
      tambah(0, judul("Pilih satu cara")),
      tambah("belas", teks("e", 150, 64, "13", 24, W.merah)),
      ubah("dikurangi", { id: "e", isi: "13 −" }),
      ubah("delapan,", { id: "e", isi: "13 − 8" }),
      ubah("pilih", { id: "e", isi: "13 − 8 = ?" }),
      tambah("cara", ...kartu("o0", 8, 100, 88, 44, WARNA_METODE[0], ["Berpikir", "Penjumlahan"], 8.4), ...kartu("o1", 106, 100, 88, 44, WARNA_METODE[1], ["Keluarga", "Bilangan"], 8.4), ...kartu("o2", 204, 100, 88, 44, WARNA_METODE[2], ["Kurangi dari", "Sepuluh"], 8.4)),
      tambah("mana?", emo("tq", 150, 178, E.tanya, 30)),
    ),
  ],
};
