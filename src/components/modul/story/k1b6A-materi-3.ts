import type { AdeganStory, Obj } from "./logika-story";
import { E, W, cubit, deretKue, emo, esLilin, judul, kartu, kisi, kotak, loket, nampan, orang, pukis, teks, type Titik } from "./k1b6A-gambar";
import { bersih, hapus, k, sorotkan, tambah, ubah } from "./k1b6A-bantu";

/*
 * Akhir cerita "Dua Nampan Kue" (Kelas 1 Bab 6 Sub-Bab A): bilangan yang belum diketahui (lebihnya menambah, kurangnya mengurangi),
 * kedua nampan sama banyak dan loket karcis (jembatan ke Sub-Bab B), serta ringkasan.
 */

/* ------------------------------ 7. Es lilin: bilangan belum diketahui ------------------------------ */
const SUARA_E1 = "Penjual es lilin punya enam es cokelat. Es stroberi lima lebihnya dari es cokelat. Berapa es stroberi?";
const SUARA_E2 = "Lebihnya sudah diketahui, jadi kita menambah. Enam ditambah lima sama dengan sebelas.";
const SUARA_E3 = "Kalau yang diketahui kurangnya, kita mengurangi.";
const XE = (i: number): number => 34 + i * 24;

export const ADEGAN_ES_LILIN: AdeganStory = {
  id: "es-lilin",
  judul: "Es lilin: lebihnya diketahui",
  sumber: "Materi: bilangan yang belum diketahui",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_E1,
      tambah(0, judul("Es lilin"), kotak("rk", 14, 74, 272, 76, "#FEF3C7", W.coklat, { rx: 6, tebal: 2, z: -2 })),
      tambah("Penjual", ...orang("pj", 36, 172, E.pembeli, "Penjual")),
      tambah("enam", ...Array.from({ length: 6 }, (_, i) => esLilin(`ec${i}`, XE(i), 100, "#92400E")).flat(), teks("lc", 100, 140, "cokelat: 6", 10, W.coklat)),
      tambah("stroberi", teks("ls", 232, 92, "stroberi ?", 10, W.merah)),
      tambah("lima", ...kartu("lm", 192, 104, 88, 24, W.emas, ["lebihnya 5"], 9.4)),
      tambah("Berapa", teks("bq", 160, 176, "berapa stroberi?", 11, W.merah)),
    ),
    k(
      SUARA_E2,
      hapus(0, "ls", "lm-k", "lm-t0", "bq"),
      tambah("menambah", ...Array.from({ length: 5 }, (_, i) => esLilin(`es${i}`, XE(6 + i), 100, "#F472B6")).flat(), teks("lp", 205, 140, "stroberi: 5", 10, W.merah)),
      tambah("Enam", teks("e6", 90, 172, "6", 20, W.coklat)),
      tambah("ditambah", teks("e7", 118, 172, "+", 20, W.biru)),
      tambah("lima", teks("e5", 146, 172, "5", 20, W.merah)),
      tambah("sama", teks("e8", 174, 172, "=", 20, W.biru)),
      tambah("sebelas.", teks("e11", 206, 172, "11", 20, W.hijau)),
    ),
    k(
      SUARA_E3,
      bersih(0),
      tambah(0, judul("Menambah atau mengurangi"), ...kartu("t1", 20, 44, 260, 34, W.hijauMuda, ["lebihnya diketahui → menambah"], 10.4)),
      tambah("kurangnya,", ...kartu("t2", 20, 96, 260, 34, W.merahMuda, ["kurangnya diketahui → mengurangi"], 10.4)),
      sorotkan("mengurangi.", "t2-k"),
    ),
  ],
};

/* ------------------------------ 8. Loket karcis (jembatan ke Sub-Bab B) ------------------------------ */
const SUARA_O1 = "Kedua nampan kini sama banyak, dan pembeli mengantre dengan senang.";
const SUARA_O2 = "Di seberang, Abang membuka loket karcis permainan. Rombongan anak datang bergelombang.";
const SUARA_O3 = "Mamah tersenyum. Sekarang kita butuh cara cepat untuk menggabungkan semuanya.";
const TCO: Titik[] = kisi(12, 24, 74, 6, 18, 18);
const TPO: Titik[] = kisi(12, 180, 74, 6, 18, 18);
const ANAK_X = [30, 54, 78, 102];
const ANAK_X2 = [62, 84, 106, 128];
const anak = (i: number, x: number): Obj => emo(`an${i}`, x, 152, E.anak, 22);

export const ADEGAN_LOKET: AdeganStory = {
  id: "loket",
  judul: "Kedua nampan sama, loket karcis dibuka",
  sumber: "Materi: hasil dan jembatan ke karcis",
  latar: "#FFF1F2",
  ketukan: [
    k(
      SUARA_O1,
      tambah(0, judul("Kedua nampan sama banyak")),
      tambah("nampan", ...nampan("na", 12, 60, 120, 46), ...nampan("nb", 168, 60, 120, 46), ...deretKue("cubit", "c", TCO), ...deretKue("pukis", "k", TPO)),
      tambah("sama", ...kartu("sm", 90, 114, 120, 22, W.emas, ["12 dan 12: sama"], 10)),
      tambah("pembeli", emo("pb0", 80, 170, E.pembeli, 24), emo("pb1", 114, 170, E.pembeli, 24), emo("pb2", 148, 170, E.pembeli, 24)),
      tambah("senang.", emo("sn", 190, 170, E.senyum, 26)),
    ),
    k(
      SUARA_O2,
      hapus(0, "pb0", "pb1", "pb2", "sn", "sm-k", "sm-t0"),
      tambah("Abang", ...orang("ab", 196, 148, E.abang, "Abang")),
      tambah("loket", ...loket("lk", 218, 116, 70, 60)),
      tambah("Rombongan", ...ANAK_X.map((x, i) => anak(i, x))),
      ubah("datang", ...ANAK_X2.map((x, i) => ({ id: `an${i}`, x: x - 12 }))),
      ubah("bergelombang.", ...ANAK_X2.map((x, i) => ({ id: `an${i}`, x }))),
    ),
    k(
      SUARA_O3,
      tambah("Mamah", ...orang("mm", 26, 130, E.mamah, "Mamah")),
      tambah("tersenyum.", emo("sy", 52, 128, E.senyum, 18)),
      tambah("cara", ...kartu("cr", 40, 174, 220, 22, W.emas, ["cara cepat menggabungkan"], 10)),
    ),
  ],
};

/* ------------------------------ 9. Penutup ------------------------------ */
const SUARA_Q1 = "Ingat, ya. Pasangkan satu-satu, yang tidak punya pasangan adalah lebihnya.";
const SUARA_Q2 = "Selisih dicari dengan mengurangi bilangan besar dengan bilangan kecil.";
const SUARA_Q3 = "Menurutmu, kalau dua rombongan datang membeli karcis, bagaimana menghitung semuanya dengan cepat? Terima kasih, Igil, Kaka, Abang, dan Mamah!";
const baris = (i: number, warna: string): Obj => kotak(`p${i}`, 14, 32 + i * 50, 272, 42, warna, W.biru, { rx: 8, tebal: 1.6, z: -2 });
const tulis = (id: string, y: number, isi: string, u = 9.4, warna: string = W.biru): Obj => teks(id, 66, y, isi, u, warna, { anchor: "start" });

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Penutup: ingat cara mencari selisih",
  sumber: "Materi: ringkasan dan penutup",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_Q1,
      tambah(0, judul("Ingat, ya!")),
      tambah("Pasangkan", baris(0, W.langit), cubit("p0i", 30, 53, 0.9), pukis("p0j", 48, 53, 0.9), tulis("p0a", 50, "pasangkan 1 – 1")),
      tambah("lebihnya.", tulis("p0b", 66, "yang tanpa pasangan = lebihnya", 8.6, W.ungu)),
    ),
    k(
      SUARA_Q2,
      tambah("Selisih", baris(1, W.hijauMuda), tulis("p1a", 100, "selisih = besar – kecil")),
      tambah("kecil.", tulis("p1b", 116, "12 – 8 = 4", 8.6, W.ungu)),
    ),
    k(
      SUARA_Q3,
      tambah("dua", baris(2, W.pink), tulis("p2a", 150, "2 rombongan beli karcis"), tulis("p2b", 166, "hitung dengan cepat?", 8.6, W.ungu)),
      bersih("Terima"),
      tambah("Terima", judul("Terima kasih!")),
      tambah("Igil,", ...orang("ig", 45, 120, E.igil, "Igil")),
      tambah("Kaka,", ...orang("kk", 115, 120, E.kaka, "Kaka")),
      tambah("Abang,", ...orang("ab", 185, 120, E.abang, "Abang")),
      tambah("Mamah!", ...orang("mm", 255, 120, E.mamah, "Mamah")),
    ),
  ],
};
