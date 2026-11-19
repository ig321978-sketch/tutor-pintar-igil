import type { AdeganStory, Obj } from "./logika-story";
import { E, W, batuApi, deretBotol, emo, judul, kaleng, kertas, kotak, garis, pindah, ransel, tanah, tanahMalam, teks, tokoh } from "./k3b2B-gambar";
import { bersih, k, redamkan, sorotkan, tambah, ubah } from "./k3b2B-bantu";

/*
 * Cerita orisinal IGIL "Botol Air Pak Darto" (Kelas 3 Bab 2 Sub-Bab B), video materi.
 * Naskah suara dari naskah/story-naskah-k3b2b.md. Bagian ini: salah langkah Raka (taruhan), banyak kemungkinan, dan penutup akhir cerita bab.
 */

const KUNING = "#FDE68A";

/* ------------------------------ 7. Salah langkah ------------------------------ */
const SUARA_S1 = "Raka berseru, gampang, empat puluh dikurangi dua puluh delapan, dua belas botol! Kalau salah, aku memikul semua ransel!";
const SUARA_S2 = "Salsa menggeleng. Botol yang dibagikan dan yang tersisa dulunya satu tumpukan, jadi harus digabung, bukan dikurangkan.";
const SUARA_S3 = "Bilangan awal dicari dengan menambahkan: empat puluh tambah dua puluh delapan sama dengan enam puluh delapan. Periksa: enam puluh delapan dikurangi empat puluh sama dengan dua puluh delapan.";

/** Dua kelompok botol dulunya satu tumpukan: merah dan hijau, lalu berdempetan. */
const BOTOL_MERAH = (x: number): Obj[] => deretBotol("gm", x, 118, 4, 9, 12, "#FCA5A5");
const BOTOL_HIJAU = (x: number): Obj[] => deretBotol("gh", x, 118, 4, 9, 12, "#86EFAC");

export const ADEGAN_SALAH_KURANG: AdeganStory = {
  id: "salah-kurang",
  judul: "Salah langkah dan taruhan Raka",
  sumber: "Materi: salah langkah mengurangkan",
  latar: "#FFF1F2",
  ketukan: [
    k(
      SUARA_S1,
      tambah(0, judul("Taruhan Raka"), ...tanah("tn", 150), ...tokoh("rk", 36, 184, "Raka")),
      tambah("gampang,", kertas("ks", 74, 38, 170, 64)),
      tambah("empat", teks("a40", 106, 80, "40", 20, W.bagA)),
      tambah("dikurangi", teks("mn", 132, 80, "−", 20, W.biru)),
      tambah("dua", teks("a28", 158, 80, "28", 20, W.bagB)),
      tambah("dua@2", teks("sm", 184, 80, "=", 20, W.biru), teks("r12", 214, 80, "12", 20, W.merah)),
      tambah("memikul", ...ransel("rn1", 252, 118), ...ransel("rn2", 274, 118)),
      tambah("ransel!", ...ransel("rn3", 262, 94)),
    ),
    k(
      SUARA_S2,
      tambah("Salsa", ...tokoh("sl", 92, 184, "Salsa")),
      ubah("menggeleng.", { id: "sl", isi: E.pikir }),
      tambah("dibagikan", ...BOTOL_MERAH(124)),
      tambah("tersisa", ...BOTOL_HIJAU(176)),
      tambah("satu", teks("n1", 154, 148, "1 tumpukan", 9, W.ungu)),
      ubah("satu", ...pindah(BOTOL_HIJAU(160))),
      tambah("digabung,", teks("pl", 154, 100, "+", 20, W.hijauTua), kotak("bk", 116, 106, 84, 32, undefined, W.ungu, { rx: 6, putus: true, z: 3 })),
      tambah("dikurangkan.", teks("mm", 236, 124, "−", 22, W.merah), emo("xs", 262, 124, E.salah, 22)),
    ),
    k(
      SUARA_S3,
      bersih(0),
      tambah(0, judul("Bilangan Awal Ditambah"), ...tanah("tn", 150), teks("la", 150, 44, "awal dicari", 9, W.ungu)),
      tambah("empat", teks("a40", 96, 78, "40", 20, W.bagA)),
      tambah("tambah", teks("pl", 128, 78, "+", 20, W.hijauTua)),
      tambah("dua", teks("a28", 160, 78, "28", 20, W.bagB)),
      tambah("sama", teks("sm", 192, 78, "=", 20, W.biru)),
      tambah("enam", teks("r68", 226, 78, "68", 20, W.hijauTua)),
      tambah("Periksa:", teks("lp", 150, 108, "periksa", 9, W.ungu)),
      tambah("dikurangi", teks("b68", 96, 134, "68", 20, W.hijauTua), teks("mn", 128, 134, "−", 20, W.biru), teks("b40", 160, 134, "40", 20, W.bagA)),
      tambah("sama@2", teks("sm2", 192, 134, "=", 20, W.biru)),
      tambah("dua@2", teks("b28", 226, 134, "28", 20, W.bagB)),
      tambah("delapan@4", emo("ok", 266, 134, E.benar, 24)),
    ),
  ],
};

/* ------------------------------ 8. Banyak kemungkinan ------------------------------ */
const SUARA_M1 = "Pak Darto menyimpan seratus biskuit di pos. Sebagian sudah dimakan, sisanya disimpan.";
const SUARA_M2 = "Kalau hanya bilangan awal yang diketahui, ada banyak kemungkinan.";
const SUARA_M3 = "Empat puluh lima dimakan dan lima puluh lima tersisa, atau enam puluh dimakan dan empat puluh tersisa. Semuanya seratus.";

export const ADEGAN_BANYAK_KEMUNGKINAN: AdeganStory = {
  id: "banyak-kemungkinan",
  judul: "Banyak kemungkinan",
  sumber: "Materi: banyak kemungkinan pasangan",
  latar: "#FEFCE8",
  ketukan: [
    k(
      SUARA_M1,
      tambah(0, judul("Kaleng Biskuit"), ...tanah("tn", 150), ...tokoh("pd", 40, 184, "Pak Darto")),
      tambah("seratus", ...kaleng("kl", 108, 84, 84, 56, "100")),
      tambah("biskuit", emo("b1", 90, 120, E.biskuit, 18), emo("b2", 210, 110, E.biskuit, 18)),
      tambah("Sebagian", emo("b3", 250, 150, E.biskuit, 18)),
      tambah("dimakan,", emo("mk", 250, 124, E.senyum, 16)),
      tambah("sisanya", emo("b4", 150, 162, E.biskuit, 16)),
    ),
    k(
      SUARA_M2,
      bersih(0),
      tambah(0, judul("Hanya Awal yang Diketahui"), ...tanah("tn", 150)),
      tambah("bilangan", kotak("ba", 90, 44, 180, 30, W.awal, W.biru, { rx: 4, tebal: 1.6 }), teks("ba-t", 180, 65, "100", 16, W.putih, { z: 2 })),
      tambah("diketahui,", kotak("bd", 90, 86, 90, 30, W.bagA, W.biru, { rx: 4, tebal: 1.6 }), teks("bd-t", 135, 107, "?", 16, W.putih, { z: 2 }), kotak("bs", 180, 86, 90, 30, W.bagB, W.biru, { rx: 4, tebal: 1.6 }), teks("bs-t", 225, 107, "?", 16, W.putih, { z: 2 })),
      tambah("banyak", emo("t1", 80, 144, E.tanya, 20), emo("t2", 150, 144, E.tanya, 20)),
      tambah("kemungkinan.", teks("bk", 150, 178, "banyak kemungkinan", 10, W.ungu), emo("t3", 220, 144, E.tanya, 20)),
    ),
    k(
      SUARA_M3,
      bersih(0),
      tambah(0, judul("Dua Pasangan untuk Seratus"), ...tanah("tn", 150), kotak("kd", 54, 58, 76, 56, W.merahMuda, W.bagA, { rx: 8 }), kotak("ks", 170, 58, 76, 56, W.hijauMuda, W.bagB, { rx: 8 }), teks("ld", 92, 52, "dimakan", 8.4, W.bagA), teks("ls", 208, 52, "tersisa", 8.4, W.bagB)),
      tambah("Empat", teks("nd", 92, 96, "45", 26, W.bagA)),
      tambah("dan", teks("pl", 150, 94, "+", 20, W.biru)),
      tambah("lima@2", teks("ns", 208, 96, "55", 26, W.bagB)),
      ubah("enam", { id: "nd", isi: "60" }),
      ubah("empat@2", { id: "ns", isi: "40" }),
      tambah("seratus.", teks("tt", 150, 148, "100", 24, W.awal)),
    ),
  ],
};

/* ------------------------------ 9. Penutup (akhir cerita bab) ------------------------------ */
const SUARA_T1 = "Raka menepati taruhannya dan memikul semua ransel ke tenda sambil terengah-engah.";
const SUARA_T2 = "Malam itu api unggun dari lima puluh batang kayu menyala, dan Kak Rina, Pak Darto, serta Pak Joko bernyanyi bersama.";
const SUARA_T3 = "Menurutmu, apa lagi yang bisa kita cari dengan kalimat Matematika? Terima kasih, Raka, Salsa, Bima, Pak Joko, Kak Rina, dan Pak Darto!";

const bintang = (id: string, x: number, y: number, u = 14): Obj => emo(id, x, y, E.bintang, u, { z: -1 });

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Penutup akhir cerita bab",
  sumber: "Materi: penutup perkemahan akhir pekan",
  latar: "#E0F2FE",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Taruhan Raka Ditepati"), ...tanah("tn", 150)),
      tambah("Raka", ...tokoh("rk", 70, 184, "Raka")),
      tambah("memikul", ...ransel("rn1", 50, 116), ...ransel("rn2", 70, 108), ...ransel("rn3", 90, 116)),
      tambah("tenda", emo("td", 240, 138, E.tenda, 28)),
      tambah("terengah-engah.", emo("gr", 108, 146, E.gerutu, 16), emo("kr", 28, 140, "\u{1F4A6}", 14)),
    ),
    k(
      SUARA_T2,
      bersih(0),
      tambah(0, judul("Api Unggun Menyala", KUNING), ...tanahMalam("tn", 150), emo("bl", 36, 44, E.bulan, 22), bintang("b1", 90, 52), bintang("b2", 150, 38, 12), bintang("b3", 214, 50), bintang("b4", 264, 36, 12)),
      tambah("api", ...batuApi("ba", 150, 160, 22, 7)),
      tambah("batang", garis("kyA", 138, 164, 24, -12, "#92400E", 3, { z: 1 }), garis("kyB", 138, 152, 24, 12, "#78350F", 3, { z: 1 })),
      tambah("lima", teks("n50", 150, 188, "50 batang", 9, KUNING)),
      tambah("menyala,", emo("ap", 150, 156, E.api, 34, { z: 2 }), emo("pc", 176, 132, E.percik, 14)),
      tambah("Kak", ...tokoh("kr", 54, 184, "Kak Rina", 30, KUNING)),
      tambah("Darto,", ...tokoh("pd", 100, 184, "Pak Darto", 30, KUNING)),
      tambah("Joko", ...tokoh("pj", 236, 184, "Pak Joko", 30, KUNING)),
      tambah("bernyanyi", emo("m1", 68, 120, E.musik, 18), emo("m2", 244, 120, E.musik, 18)),
    ),
    k(
      SUARA_T3,
      bersih(0),
      tambah(0, judul("Terima Kasih!", KUNING), ...tanahMalam("tn", 150), bintang("b1", 40, 50), bintang("b2", 260, 50), bintang("b3", 150, 42, 12)),
      tambah("Menurutmu,", emo("tq", 150, 84, E.tanya, 34)),
      tambah("kalimat", teks("kt", 150, 118, "kalimat Matematika", 10, KUNING)),
      tambah("Terima", emo("s1", 60, 86, E.sorak, 20), emo("s2", 240, 86, E.sorak, 20)),
      tambah("Raka,", ...tokoh("rk", 28, 184, "Raka", 30, KUNING)),
      tambah("Salsa,", ...tokoh("sl", 76, 184, "Salsa", 30, KUNING)),
      tambah("Bima,", ...tokoh("bm", 124, 184, "Bima", 30, KUNING)),
      tambah("Pak", ...tokoh("pj", 174, 184, "Pak Joko", 30, KUNING)),
      tambah("Kak", ...tokoh("kr", 222, 184, "Kak Rina", 30, KUNING)),
      tambah("Pak@2", ...tokoh("pd", 270, 184, "Pak Darto", 30, KUNING)),
      sorotkan("Darto!", "tq"),
      redamkan("Darto!", "kt"),
    ),
  ],
};
