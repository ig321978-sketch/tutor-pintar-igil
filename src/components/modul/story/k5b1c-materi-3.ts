import type { AdeganStory } from "./logika-story";
import { E, W, angkaSlot, bundel, emo, idKartu, judul, kartu, kotak, lantai, panah, slotKolom, teks, tokoh } from "./k5b1c-gambar";
import { bersih, hapus, k, sorotkan, tambah } from "./k5b1c-bantu";

/*
 * Cerita orisinal IGIL "Bundel Tiket Bu Lestari" (Kelas 5 Bab 1 Sub-Bab C), lanjutan: tukar bundel, banyak cara menyusun, menyusun kembali dengan nol, dan jembatan ke Sub-Bab D.
 * Naskah suara dari naskah/story-naskah-k5b1c.md.
 */

/* ------------------------------ 6. Tukar bundel ------------------------------ */
const SUARA_T1 = "Satu dus seribu bisa ditukar dengan sepuluh pak seratusan, dan jumlah tiketnya tetap sama.";
const SUARA_T2 = "Bima menukar satu dari empat dus, sehingga ia punya tiga dus dan tiga belas pak.";
const SUARA_T3 = "Aturannya sederhana: sepuluh di satu kolom sama dengan satu di kolom sebelah kirinya.";

export const ADEGAN_TUKAR: AdeganStory = {
  id: "tukar",
  judul: "Tukar dus dengan pak",
  sumber: "Materi: tukar bundel",
  latar: "#F1F5F9",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Tukar dus dengan pak"), ...lantai("lt", 150), ...bundel("d", 50, 70, "dus", 1), teks("t1", 50, 98, "1 dus", 10, W.coklat, { z: 3 }), teks("t2", 50, 112, "1.000", 10, W.merah, { z: 3 })),
      tambah("ditukar", panah("ar", 90, 84, 52, 0, W.biru, 2.4, { z: 2 })),
      tambah("sepuluh", ...bundel("pa", 176, 66, "pak", 5, 16), ...bundel("pb", 176, 82, "pak", 5, 16), teks("t3", 210, 106, "10 pak", 10, W.coklat, { z: 3 }), teks("t4", 210, 120, "1.000", 10, W.merah, { z: 3 })),
      tambah("tetap", teks("tp", 150, 142, "jumlah tetap sama", 9, W.hijauTua, { z: 3 })),
      tambah("sama", emo("ok", 262, 142, E.benar, 18, { z: 3 })),
    ),
    k(
      SUARA_T2,
      bersih(0),
      tambah(0, judul("Bima menukar bundel"), ...lantai("lt", 150), ...tokoh("bm", 36, 184, "Bima")),
      tambah("satu", teks("tk", 150, 80, "tukar 1 dus", 9, W.merah, { z: 3 }), panah("ar", 150, 62, 0, 28, W.merah, 2, { z: 2 })),
      tambah("empat", ...bundel("ta", 118, 52, "dus", 4, 20), ...bundel("tb", 200, 52, "pak", 3, 14), teks("l1", 58, 56, "4 dus + 3 pak", 9.4, W.coklat, { z: 3 })),
      tambah("tiga", ...bundel("ba", 118, 106, "dus", 3, 20)),
      tambah("belas", ...bundel("bb", 188, 102, "pak", 7, 14), ...bundel("bc", 188, 116, "pak", 6, 14), teks("l2", 58, 110, "3 dus + 13 pak", 9.4, W.coklat, { z: 3 })),
    ),
    k(
      SUARA_T3,
      bersih(0),
      tambah(0, judul("Aturan tukar bundel"), ...lantai("lt", 150)),
      tambah("sepuluh", kotak("ka", 176, 60, 100, 64, W.krem, W.merah, { rx: 6, tebal: 1.6, z: 1 }), teks("ka-c", 226, 76, "kolom kanan", 8, W.coklat, { z: 3 }), teks("ka-n", 226, 110, "10", 24, W.biru, { z: 3 })),
      tambah("sama", teks("sm", 150, 100, "=", 18, W.merah, { z: 3 })),
      tambah("kirinya", kotak("ki", 24, 60, 100, 64, W.rumput, W.hijau, { rx: 6, tebal: 1.6, z: 1 }), teks("ki-c", 74, 76, "kolom kiri", 8, W.coklat, { z: 3 }), teks("ki-n", 74, 110, "1", 24, W.biru, { z: 3 })),
    ),
  ],
};

/* ------------------------------ 7. Banyak cara menyusun ------------------------------ */
const SUARA_C1 = "Citra menunjukkan bahwa tiket Tribun Utara bisa disusun dengan banyak cara.";
const SUARA_C2 = "Misalnya dua puluh empat dus, tiga pak, dan lima ikat, atau dua ratus empat puluh tiga pak dan lima ikat.";
const SUARA_C3 = "Susunannya berbeda, tetapi jumlah tiketnya selalu sama.";

export const ADEGAN_SUSUN_LAIN: AdeganStory = {
  id: "susun-lain",
  judul: "Banyak cara menyusun",
  sumber: "Materi: banyak cara menyusun",
  latar: "#F1F5F9",
  ketukan: [
    k(
      SUARA_C1,
      tambah(0, judul("Banyak cara menyusun"), ...lantai("lt", 150), ...tokoh("ct", 40, 184, "Citra")),
      tambah("Tribun", ...kartu("tu", 40, 32, 220, 28, W.krem, "Tribun Utara: 24.350", 10, W.merah)),
      tambah("banyak", ...kartu("c0", 10, 70, 88, 40, W.langit, "cara 1", 9), ...kartu("c1", 106, 70, 88, 40, W.rumput, "cara 2", 9), ...kartu("c2", 202, 70, 88, 40, W.pink, "cara 3", 9)),
    ),
    k(
      SUARA_C2,
      hapus(0, ...idKartu("c0"), ...idKartu("c1"), ...idKartu("c2")),
      tambah("dua", kotak("s1", 10, 70, 210, 30, W.langit, W.biru, { rx: 6, tebal: 1.4, z: 1 })),
      tambah("tiga", teks("x1", 115, 89, "24 dus + 3 pak + 5 ikat", 9.4, W.biru, { z: 3 })),
      tambah("atau", kotak("s2", 10, 106, 210, 30, W.rumput, W.hijau, { rx: 6, tebal: 1.4, z: 1 })),
      tambah("lima@2", teks("x2", 115, 125, "243 pak + 5 ikat", 9.4, W.hijauTua, { z: 3 })),
    ),
    k(
      SUARA_C3,
      tambah("berbeda", teks("bd", 150, 150, "susunan berbeda", 9, W.coklat, { z: 3 })),
      tambah("jumlah", teks("r1", 258, 89, "24.350", 10, W.merah, { z: 3 }), teks("r2", 258, 125, "24.350", 10, W.merah, { z: 3 })),
      tambah("sama", emo("ok", 150, 176, E.benar, 20, { z: 3 })),
    ),
  ],
};

/* ------------------------------ 8. Menyusun kembali ------------------------------ */
const SUARA_K1 = "Bu Lestari memberi uraian Tribun Barat: tiga puluh ribu ditambah empat ratus ditambah dua.";
const SUARA_K2 = "Bima menyusunnya kembali: tiga di puluh ribuan, empat di ratusan, dan dua di satuan.";
const SUARA_K3 = "Kolom ribuan dan puluhan kosong, jadi diisi nol, sehingga hasilnya tiga puluh ribu empat ratus dua.";

export const ADEGAN_KEMBALI: AdeganStory = {
  id: "kembali",
  judul: "Menyusun kembali",
  sumber: "Materi: bentuk lazim",
  latar: "#F1F5F9",
  ketukan: [
    k(
      SUARA_K1,
      tambah(0, judul("Menyusun kembali"), ...lantai("lt", 150), ...tokoh("bu", 40, 184, "Bu Lestari")),
      tambah("Tribun", teks("tb", 170, 36, "Tribun Barat", 9, W.coklat, { z: 3 })),
      tambah("tiga", teks("u1", 100, 58, "30.000", 13, W.biru, { z: 3 })),
      tambah("empat", teks("u2", 160, 58, "+ 400", 13, W.biru, { z: 3 })),
      tambah("dua", teks("u3", 212, 58, "+ 2", 13, W.biru, { z: 3 })),
    ),
    k(
      SUARA_K2,
      tambah(0, ...tokoh("bm", 268, 184, "Bima"), ...slotKolom("sl", 72)),
      tambah("tiga", angkaSlot("sl", 0, 72, "3")),
      tambah("empat", angkaSlot("sl", 2, 72, "4")),
      tambah("dua", angkaSlot("sl", 4, 72, "2")),
    ),
    k(
      SUARA_K3,
      sorotkan(0, "sl1-k", "sl3-k"),
      tambah("nol", angkaSlot("sl", 1, 72, "0", W.hijauTua), angkaSlot("sl", 3, 72, "0", W.hijauTua)),
      tambah("tiga", teks("hs", 150, 142, "= 30.402", 16, W.biru, { z: 3 })),
    ),
  ],
};

/* ------------------------------ 9. Penutup: Pak Darmo datang ------------------------------ */
const SUARA_P1 = "Pak Darmo, ketua panitia pertandingan, datang membawa papan jepit dan pulpen.";
const SUARA_P2 = "Ia ingin tahu jumlah semua penonton keempat tribun, dan berapa kursi yang masih kosong.";
const SUARA_P3 = "Menurutmu, bagaimana menjumlahkan empat bilangan sebesar itu? Terima kasih, Bima, Citra, Fajar, Pak Arif, dan Bu Lestari!";
const NAMA_TRIBUN = ["Timur", "Selatan", "Utara", "Barat"];

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Pak Darmo datang",
  sumber: "Materi: jembatan ke Sub-Bab D",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Pak Darmo datang"), ...lantai("lt", 150), teks("sp", 220, 50, "STADION KOTA", 14, W.merah, { z: 3 })),
      tambah("Darmo", ...tokoh("pd", 60, 184, "Pak Darmo")),
      tambah("papan", emo("pj", 170, 112, E.papan, 34, { z: 3 })),
      tambah("pulpen", emo("pl", 226, 112, "\u{1F58A}", 30, { z: 3 })),
    ),
    k(
      SUARA_P2,
      tambah("penonton", ...NAMA_TRIBUN.flatMap((n, i) => [kotak(`tr${i}-k`, 6 + i * 73, 66, 66, 40, W.krem, W.merah, { rx: 6, tebal: 1.4, z: 1 }), teks(`tr${i}-n`, 39 + i * 73, 82, n, 8.6, W.coklat, { z: 3 }), teks(`tr${i}-q`, 39 + i * 73, 100, "?", 14, W.merah, { z: 3 })])),
      tambah("kursi", teks("tj", 190, 126, "jumlah penonton = ?", 10, W.biru, { z: 3 })),
      tambah("kosong", teks("kk", 190, 142, "kursi kosong = ?", 10, W.biru, { z: 3 })),
    ),
    k(
      SUARA_P3,
      bersih(0),
      tambah(0, judul("Terima kasih!"), ...lantai("lt", 150)),
      tambah("empat", teks("em", 150, 50, "4 bilangan besar", 13, W.biru, { z: 3 })),
      tambah("itu", teks("qq", 150, 100, "?", 30, W.merah, { z: 3 })),
      tambah("Terima", ...tokoh("pd", 30, 184, "Pak Darmo")),
      tambah("Bima", ...tokoh("bm", 72, 184, "Bima")),
      tambah("Citra", ...tokoh("ct", 114, 184, "Citra")),
      tambah("Fajar", ...tokoh("fj", 156, 184, "Fajar")),
      tambah("Arif", ...tokoh("pa", 198, 184, "Pak Arif")),
      tambah("Lestari", ...tokoh("bu", 252, 184, "Bu Lestari")),
    ),
  ],
};
