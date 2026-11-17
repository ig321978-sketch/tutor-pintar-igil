import type { AdeganStory } from "./logika-story";
import { E, W, bulat, deret, emo, garis, judul, kardus, karton, kartu, label, lapangan, orang, poligon, segiEmpatRel, segitigaRel, semuaSudut, sisiKe, sudutKe, sudutMutlak, teks, tutupKaleng, WARNA_BAHAN } from "./k1b4a-gambar";
import { bersih, hapus, k, sorotkan, tambah, ubah, urutKata } from "./k1b4a-bantu";

/*
 * Cerita orisinal IGIL "Bahan dari Gudang" (Kelas 1 Bab 4 Sub-Bab A, mengenal bentuk), awal cerita Festival Mainan Kardus.
 * Masalah: kampung mengadakan festival mainan; barang bekas dari gudang bercampur, padahal mainan butuh roda, atap, dan badan.
 * Taruhan: salah pilih bahan membuat mainan macet dan tidak bisa ikut lomba.
 * Salah langkah (pedoman mutu modul): Igil terburu-buru memakai sisi kardus sebagai roda; sudutnya membuat roda tersangkut.
 * Penyelesaian: amati tepi benda, hitung sisi lurus dan sudut, beri nama bentuk (lengkung, segitiga, segi empat).
 */

/* ------------------------------ 1. Pengumuman festival ------------------------------ */
const SUARA_N1 = "Festival mainan kardus hari Sabtu! Pak RT mengumumkannya di lapangan kampung. Igil, Kaka, Abang, dan Mamah ingin ikut.";
const SUARA_N2 = "Abang menumpahkan sekeranjang barang bekas dari gudang. Tutup kaleng, potongan karton, dan kardus bercampur aduk.";
const SUARA_N3 = "Mainan butuh roda, atap, dan badan. Kalau salah pilih bahan, mainan macet dan tidak bisa ikut lomba.";

export const ADEGAN_FESTIVAL: AdeganStory = {
  id: "pengumuman-festival",
  judul: "Pengumuman festival mainan",
  sumber: "Materi: masalah bahan festival",
  latar: "#ECFEFF",
  ketukan: [
    k(
      SUARA_N1,
      tambah(0, judul("Festival mainan kardus"), lapangan("lp", 128)),
      tambah("Sabtu!", ...kartu("pg", 96, 34, 190, 40, W.emas, ["Festival Mainan Kardus", "hari Sabtu"], 9.4)),
      tambah("RT", ...orang("rt", 36, 66, E.pakRT, "Pak RT")),
      tambah("mengumumkannya", emo("toa", 74, 58, E.toa, 16)),
      tambah("lapangan", emo("tn", 262, 118, E.tenda, 30)),
      tambah("Igil,", ...orang("ig", 50, 168, E.igil, "Igil")),
      tambah("Kaka,", ...orang("kk", 110, 168, E.kaka, "Kaka")),
      tambah("Abang,", ...orang("ab", 170, 168, E.abang, "Abang")),
      tambah("Mamah", ...orang("mm", 230, 168, E.mamah, "Mamah")),
    ),
    k(
      SUARA_N2,
      bersih(0),
      tambah(0, judul("Bahan dari gudang"), emo("gd", 44, 84, E.gudang, 38), teks("gdn", 44, 100, "gudang", 8.4, W.coklat)),
      tambah("Abang", ...orang("ab", 44, 160, E.abang, "Abang")),
      tambah("sekeranjang", emo("kr", 112, 150, E.keranjang, 34)),
      tambah("Tutup", ...tutupKaleng("c0", 190, 72, 16)),
      tambah("karton,", karton("t0", 240, 76, 16)),
      tambah("kardus", ...kardus("d0", 215, 112, 50, 30)),
      tambah("aduk.", ...tutupKaleng("c1", 272, 118, 11), karton("t1", 166, 120, 12, { rot: 200 }), ...kardus("d1", 278, 80, 24, 18)),
    ),
    k(
      SUARA_N3,
      hapus(0, "ab", "ab-n", "kr"),
      tambah("roda,", ...tutupKaleng("ir", 56, 148, 8), ...label("nr", 14, 162, 84, "roda", W.langit)),
      tambah("atap,", emo("ia", 150, 154, E.rumah, 18), ...label("na", 108, 162, 84, "atap", W.pink)),
      tambah("badan.", emo("ib", 244, 154, E.kardus, 18), ...label("nb", 202, 162, 84, "badan", W.hijauMuda)),
      tambah("salah", teks("tq", 150, 42, "salah pilih bahan?", 10, W.merah)),
      ubah("macet", { id: "tq", isi: "mainan macet!" }),
      tambah("lomba.", emo("kc", 118, 84, E.kaca, 22), teks("tk", 196, 84, "kenali bentuknya", 9, W.ungu)),
    ),
  ],
};

/* ------------------------------ 2. Roda pertama: salah pilih, lalu tutup kaleng ------------------------------ */
const SUARA_T1 = "Igil terburu-buru mengambil sisi kardus. \"Ini rodanya!\" serunya, lalu mendorongnya.";
const SUARA_T2 = "Buk! Kardus itu terguling sekali lalu diam. \"Sudutnya membuat roda tersangkut, Gil,\" kata Kaka sambil tertawa.";
const SUARA_T3 = "Igil meraba tepi tutup kaleng. Tepinya melengkung terus, tanpa sisi lurus dan tanpa sudut. Didorong, tutup kaleng menggelinding jauh.";
const SUARA_T4 = "Mamah bertanya, \"Kenapa yang ini menggelinding?\" Igil menjawab, \"Karena tidak punya sudut!\" Ada empat tutup kaleng untuk roda.";
const RODA_SALAH = sudutMutlak(176, 104, segiEmpatRel(56, 56));
const KALENG = deret(4, 115, 40, 104);

export const ADEGAN_KALENG: AdeganStory = {
  id: "tutup-kaleng",
  judul: "Roda pertama",
  sumber: "Materi: bentuk lengkung",
  latar: "#F1F5F9",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Roda pertama"), ...orang("ig", 36, 168, E.igil, "Igil")),
      tambah("kardus.", poligon("rk", 120, 104, segiEmpatRel(56, 56), WARNA_BAHAN.kardus)),
      tambah("rodanya!", ...kartu("ir", 150, 32, 120, 22, W.emas, ["ini rodanya!"], 10)),
      tambah("mendorongnya.", emo("tg", 76, 104, "\u{1F449}", 22)),
    ),
    k(
      SUARA_T2,
      hapus(0, "ir-k", "ir-t0", "tg"),
      tambah("Buk!", emo("bk", 214, 66, "\u{1F4A5}", 24)),
      ubah("terguling", { id: "rk", x: 176, rot: 90 }),
      tambah("Kaka", ...orang("kk", 264, 168, E.kaka, "Kaka")),
      tambah("tertawa.", emo("tw", 264, 128, "\u{1F606}", 18)),
      tambah("Sudutnya", ...semuaSudut("rk", RODA_SALAH)),
      tambah("tersangkut.", ...label("ts", 96, 150, 140, "sudut: tersangkut", W.merahMuda)),
    ),
    k(
      SUARA_T3,
      bersih(0),
      tambah(0, judul("Tutup kaleng"), ...orang("ig", 36, 168, E.igil, "Igil"), ...tutupKaleng("bt", 120, 90, 38)),
      sorotkan("melengkung", "bt"),
      tambah("melengkung", bulat("bt-o", 120, 90, 44, "none", W.merah, { tebal: 2, putus: true })),
      tambah("sisi", teks("ts", 240, 72, "tanpa sisi lurus", 9, W.merah)),
      tambah("sudut.", teks("tu", 240, 94, "tanpa sudut", 9, W.merah)),
      tambah("Didorong,", ...label("nm", 78, 146, 84, "lengkung", W.langit), garis("jl", 120, 134, 110, 0, W.abu, 2, { putus: true, z: -1 })),
      ubah("menggelinding", { id: "bt", x: 230 }, { id: "bt-d", x: 230 }, { id: "bt-o", x: 230 }),
    ),
    k(
      SUARA_T4,
      bersih(0),
      tambah(0, judul("Empat roda")),
      tambah("Mamah", ...orang("mm", 36, 168, E.mamah, "Mamah")),
      tambah("menggelinding?", ...kartu("tn", 70, 30, 160, 22, W.langit, ["kenapa menggelinding?"], 9.4)),
      tambah("Igil", ...orang("ig", 264, 168, E.igil, "Igil")),
      tambah("sudut!", ...kartu("jw", 70, 58, 160, 22, W.emas, ["tidak punya sudut!"], 9.4)),
      tambah("empat", ...KALENG.flatMap((p, i) => tutupKaleng(`tk${i}`, p.x, p.y, 16))),
      tambah("roda.", ...label("rd", 110, 140, 100, "4 roda", W.emas)),
    ),
  ],
};

/* ------------------------------ 3. Karton segitiga untuk atap ------------------------------ */
const SUARA_S1 = "Kaka menyusuri tepi karton. \"Sisi lurusnya satu, dua, tiga,\" katanya sambil mencatat.";
const SUARA_S2 = "Lalu ia menghitung sudut, tempat dua sisi lurus bertemu. Satu, dua, tiga.";
const SUARA_S3 = "Tiga sisi lurus dan tiga sudut, bentuknya segitiga. Abang langsung menggambar atap rumah. Ada dua karton segitiga.";
const SG = sudutMutlak(140, 102, segitigaRel(48));
const posS1 = urutKata(SUARA_S1, ["satu,", "dua,", "tiga,"], "lurusnya");
const posS2 = urutKata(SUARA_S2, ["satu,", "dua,", "tiga."], "bertemu.");

export const ADEGAN_KARTON: AdeganStory = {
  id: "karton-segitiga",
  judul: "Karton segitiga untuk atap",
  sumber: "Materi: bentuk segitiga",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_S1,
      tambah(0, judul("Karton segitiga"), ...orang("kk", 36, 168, E.kaka, "Kaka"), karton("sg", 140, 102, 48)),
      sorotkan("menyusuri", "sg"),
      ...posS1.map((p, i) => tambah(p, ...sisiKe("sg", SG, i))),
      tambah("mencatat.", emo("ct", 252, 150, "\u{1F4DD}", 20)),
    ),
    k(
      SUARA_S2,
      hapus(0, "sg-a0", "sg-a1", "sg-a2", "ct"),
      tambah("sudut,", teks("ts", 250, 60, "sudut: sisi bertemu", 8.4, W.hijau), teks("t2", 250, 76, "2 sisi lurus", 8.4, W.hijau)),
      ...posS2.map((p, i) => tambah(p, ...sudutKe("sg", SG, i))),
    ),
    k(
      SUARA_S3,
      hapus(0, "ts", "t2", "sg-b0", "sg-b1", "sg-b2"),
      tambah("Tiga", ...label("ls", 210, 38, 84, "3 sisi lurus", W.merahMuda, 9)),
      tambah("sudut,", ...label("lu", 210, 64, 84, "3 sudut", W.hijauMuda, 9)),
      tambah("bentuknya", ...label("nm", 98, 160, 84, "segitiga", W.emas)),
      tambah("Abang", ...orang("ab", 252, 108, E.abang, "Abang")),
      tambah("menggambar", emo("ap", 252, 152, E.rumah, 20)),
      tambah("dua", karton("kt0", 196, 112, 12), karton("kt1", 196, 140, 12), teks("l2", 196, 166, "2 atap", 10, W.ungu)),
    ),
  ],
};
