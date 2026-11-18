import type { AdeganStory } from "./logika-story";
import { E, W, WK, deretKue, emo, judul, karcis, kapur, kotak, kotakKue, lantai, panah, papan, teks, tokoh } from "./k2b1A-gambar";
import { hapus, k, tambah, ubah } from "./k2b1A-bantu";

/*
 * Cerita orisinal IGIL "Kue Kiriman dari Dapur" (Kelas 2 Bab 1 Sub-Bab A), awal cerita Kue di Kantin Sekolah.
 * Naskah suara dari naskah/story-naskah-k2b1a.md. Bagian ini: kotak kue isi sepuluh, membaca dan menulis (puluhan dan satuan), dan nomor antrean maju dan mundur.
 */

/** Mengisi lubang kue c0 sampai c{n-1} sebuah kotak kue. */
const isiLubang = (id: string, dari: number, sampai: number) =>
  Array.from({ length: sampai - dari }, (_, i) => ({ id: `${id}-c${dari + i}`, warna: WK.lapis, garis: WK.lapisGaris }));

/* ------------------------------ 4. Kotak kue isi sepuluh ------------------------------ */
const SUARA_K1 = "Nia mengeluarkan kotak kue yang muat tepat sepuluh kue.";
const SUARA_K2 = "Satu kotak penuh disebut satu puluhan. Tiga kotak penuh berarti tiga puluh.";
const SUARA_K3 = "Tinggal enam kue lepas. Tiga puluh ditambah enam sama dengan tiga puluh enam, persis hitungan Dika!";

const PUSAT_KOTAK = [52, 130, 208];

export const ADEGAN_KOTAK: AdeganStory = {
  id: "kotak-sepuluh",
  judul: "Kotak kue isi sepuluh",
  sumber: "Materi: kotak isi sepuluh, puluhan",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_K1,
      tambah(0, judul("Kotak Kue Isi Sepuluh"), lantai("lt", 168)),
      tambah("Nia", ...tokoh("ni", 30, 178, "Nia")),
      tambah("kotak", ...kotakKue("b0", PUSAT_KOTAK[0], 62, false)),
      ubah("muat", ...isiLubang("b0", 0, 5)),
      ubah("tepat", ...isiLubang("b0", 5, 10)),
      tambah("sepuluh", teks("l0", PUSAT_KOTAK[0], 92, "10", 11, W.merah)),
    ),
    k(
      SUARA_K2,
      tambah("Satu", teks("e1", 52, 112, "1 kotak", 9, W.ungu)),
      tambah("puluhan.", teks("e2", 52, 126, "1 puluhan", 9, W.biru)),
      tambah("Tiga", teks("e3", 169, 112, "3 kotak", 9, W.ungu)),
      tambah("berarti", ...kotakKue("b1", PUSAT_KOTAK[1], 62, true), ...kotakKue("b2", PUSAT_KOTAK[2], 62, true), teks("l1", PUSAT_KOTAK[1], 92, "10", 11, W.merah), teks("l2", PUSAT_KOTAK[2], 92, "10", 11, W.merah)),
      tambah("puluh@2", teks("e30", 150, 152, "3 puluhan = 30", 13, W.merah)),
    ),
    k(
      SUARA_K3,
      hapus(0, "e1", "e2", "e3", "e30"),
      tambah("kue", ...deretKue("lp", 6, 70, 24, 118)),
      tambah("lepas.", teks("e6", 230, 122, "6 lepas", 9, W.ungu)),
      tambah("Tiga", teks("f30", 70, 160, "30", 16, W.biru)),
      tambah("ditambah", teks("fp", 96, 160, "+", 16, W.biru)),
      tambah("enam@2", teks("f6", 118, 160, "6", 16, W.merah)),
      tambah("sama", teks("fs", 140, 160, "=", 16, W.biru)),
      tambah("enam@3", teks("f36", 170, 160, "36", 16, W.hijau)),
    ),
  ],
};

/* ------------------------------ 5. Membaca dan menulis: puluhan dan satuan ------------------------------ */
const SUARA_B1 = "Bu Sari menuliskan banyak kue di papan catatan, tiga puluh enam.";
const SUARA_B2 = "Angka di kiri menunjukkan puluhan, angka di kanan menunjukkan satuan.";
const SUARA_B3 = "Jadi tiga puluh enam itu tiga puluhan dan enam satuan.";

export const ADEGAN_BACA: AdeganStory = {
  id: "baca-tulis",
  judul: "Membaca dan menulis bilangan",
  sumber: "Materi: membaca dan menulis, puluhan dan satuan",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, judul("Papan Catatan"), lantai("lt", 168)),
      tambah("Sari", ...tokoh("bs", 30, 178, "Bu Sari")),
      tambah("menuliskan", papan("pk", 50, 30, 200, 104)),
      tambah("banyak", kapur("bb", 150, 52, "banyak kue", 9.4)),
      tambah("tiga", kapur("w36", 150, 108, "36", 56)),
      ubah("enam.", { id: "w36", sorot: true }),
    ),
    k(
      SUARA_B2,
      hapus(0, "w36"),
      tambah(0, kapur("d3", 134, 108, "3", 56), kapur("d6", 166, 108, "6", 56)),
      ubah("kiri", { id: "d3", warna: "#93C5FD", sorot: true }),
      tambah("puluhan,", kapur("lp", 124, 128, "puluhan", 9, { warna: "#93C5FD" })),
      ubah("kanan", { id: "d6", warna: "#FCA5A5", sorot: true }, { id: "d3", sorot: false }),
      tambah("satuan.", kapur("ls", 178, 128, "satuan", 9, { warna: "#FCA5A5" })),
    ),
    k(
      SUARA_B3,
      tambah("Jadi", teks("g36", 76, 162, "36", 13, W.hijau)),
      tambah("itu", teks("gs", 96, 162, "=", 13, W.biru)),
      tambah("puluhan", teks("g3", 142, 162, "3 puluhan", 13, W.biru)),
      ubah("puluhan", { id: "d3", sorot: true }, { id: "d6", sorot: false }),
      tambah("dan", teks("gp", 188, 162, "+", 13, W.biru)),
      tambah("satuan.", teks("g6", 226, 162, "6 satuan", 13, W.merah)),
      ubah("satuan.", { id: "d6", sorot: true }, { id: "d3", sorot: false }),
    ),
  ],
};

/* ------------------------------ 6. Nomor antrean maju dan mundur ------------------------------ */
const SUARA_A1 = "Bel berbunyi, dan anak-anak mengantre membawa nomor antrean.";
const SUARA_A2 = "Bu Sari memanggil maju, tiga puluh empat, tiga puluh lima, tiga puluh enam. Makin maju, makin besar.";
const SUARA_A3 = "Dika menghitung mundur, tiga puluh enam, tiga puluh lima, tiga puluh empat. Makin mundur, makin kecil.";

const KID_X = [70, 150, 230];
const NOMOR = ["34", "35", "36"];
const sorotNomor = (at: string | number, nyala: number) => ubah(at, ...[0, 1, 2].flatMap((i) => [{ id: `p${i}`, sorot: i === nyala }, { id: `p${i}t`, sorot: i === nyala }]));

export const ADEGAN_ANTREAN: AdeganStory = {
  id: "antrean",
  judul: "Antrean maju dan mundur",
  sumber: "Materi: nomor antrean, maju dan mundur",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_A1,
      tambah(0, judul("Antrean di Jendela Kantin"), kotak("jn", 14, 30, 272, 62, WK.kaca, WK.kacaGaris, { rx: 6, tebal: 2.4, z: -1 }), kotak("sl", 14, 92, 272, 8, WK.kayu, W.coklat, { rx: 2, z: -1 })),
      tambah("Bel", emo("bl", 150, 62, E.bel, 22)),
      ubah("berbunyi,", { id: "bl", rot: 24 }),
      tambah("anak-anak", ...KID_X.map((x, i) => emo(`a${i}`, x, 154, E.anak, 26))),
      tambah("nomor", ...KID_X.flatMap((x, i) => karcis(`p${i}`, x - 20, 106, NOMOR[i], 40, 22))),
    ),
    k(
      SUARA_A2,
      tambah("Sari", ...tokoh("bs", 258, 74, "Bu Sari")),
      tambah("maju,", panah("mj", 50, 174, 250, 174, W.hijau)),
      sorotNomor("empat,", 0),
      sorotNomor("lima,", 1),
      sorotNomor("enam.", 2),
      tambah("Makin", teks("lb", 150, 190, "maju: makin besar", 9.4, W.hijau)),
    ),
    k(
      SUARA_A3,
      hapus(0, "mj", "lb", "bs", "bs-ap", "bs-n"),
      sorotNomor(0, 5),
      tambah("Dika", ...tokoh("dk", 28, 74, "Dika")),
      tambah("mundur,", panah("mn", 250, 174, 50, 174, W.merah)),
      sorotNomor("enam,", 2),
      sorotNomor("lima,", 1),
      sorotNomor("empat.", 0),
      tambah("Makin", teks("lb2", 150, 190, "mundur: makin kecil", 9.4, W.merah)),
    ),
  ],
};
