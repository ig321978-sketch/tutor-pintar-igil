import type { AdeganStory, Obj } from "./logika-story";
import { E, W, bulat, deret, emo, garis, judul, kotak, panah, panggung, rakAngklung, tanah, teks, tokoh } from "./k4b3a-gambar";
import { bersih, hapus, k, sorotkan, tambah, ubah } from "./k4b3a-bantu";

/*
 * Cerita orisinal IGIL "Deret Angklung Bu Ratri" (Kelas 4 Bab 3 Sub-Bab A, pola gambar), awal cerita Orkestra Angklung Kampung Senandung.
 * Naskah suara dari naskah/story-naskah-k4b3a.md. Bagian ini: melanjutkan deret, deret ketujuh lewat tabel uraian, kotak kosong yang dilengkapi, pola mengecil sembilan sampai satu, berhenti di nol, penutup (jembatan ke Sub-Bab B).
 */

/** Ubin bilangan: kotak `${id}-k`, bilangan `${id}-t`, dan keterangan `${id}-l` di bawahnya. Pojok kiri-atas (x, y). */
const ubin = (id: string, x: number, y: number, w: number, isi: string, ket?: string, ukKet = 8): Obj[] => [
  kotak(`${id}-k`, x, y, w, 36, "#FEF3C7", W.bambuTua, { rx: 6, tebal: 1.6, z: 1 }),
  teks(`${id}-t`, x + w / 2, y + 25, isi, 16, W.biru, { z: 2 }),
  ...(ket ? [teks(`${id}-l`, x + w / 2, y + 50, ket, ukKet, W.coklat)] : []),
];

/* ------------------------------ 7. Melanjutkan deret ------------------------------ */
const SUARA_N1 = "Bu Ratri meminta deret angklung dilanjutkan, dua, empat, enam, delapan, lalu sepuluh.";
const SUARA_N2 = "Deret kelima berisi sepuluh angklung, dan Genta menyusunnya satu per satu.";
const SUARA_N3 = "Untuk pola mengecil, tujuh, lima, tiga, kita kurangi dua lagi sehingga tinggal satu.";

export const ADEGAN_LANJUT: AdeganStory = {
  id: "lanjut",
  judul: "Melanjutkan deret angklung",
  sumber: "Materi: melanjutkan deret",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_N1,
      tambah(0, judul("Deret Dilanjutkan"), ...tanah("tn", 150), ...tokoh("br", 40, 184, "Bu Ratri")),
      tambah("dua,", ...ubin("u1", 18, 50, 48, "2", "deret 1")),
      tambah("empat,", ...ubin("u2", 72, 50, 48, "4", "deret 2")),
      tambah("enam,", ...ubin("u3", 126, 50, 48, "6", "deret 3")),
      tambah("delapan,", ...ubin("u4", 180, 50, 48, "8", "deret 4")),
      tambah("sepuluh.", ...ubin("u5", 234, 50, 48, "10", "deret 5")),
    ),
    k(
      SUARA_N2,
      tambah("sepuluh", ...deret("d5", 70, 136, 10, 18, 20), teks("dl", 36, 130, "deret 5", 8.4, W.coklat)),
      tambah("Genta", ...tokoh("ge", 264, 184, "Genta")),
      sorotkan("menyusunnya", ...Array.from({ length: 10 }, (_, i) => `d5-c${i}`)),
      tambah("satu", teks("sp", 150, 162, "1 per 1", 10, W.hijauTua)),
    ),
    k(
      SUARA_N3,
      bersih(0),
      tambah(0, judul("Pola Mengecil Dilanjutkan"), ...tanah("tn", 150), ...tokoh("br", 40, 184, "Bu Ratri")),
      tambah("tujuh,", ...ubin("v1", 18, 50, 46, "7")),
      tambah("lima,", ...ubin("v2", 74, 50, 46, "5")),
      tambah("tiga,", ...ubin("v3", 130, 50, 46, "3")),
      tambah("kurangi", panah("ak", 182, 68, 34, 0, W.merah, 2.4), teks("kk", 200, 60, "−2", 11, W.merah)),
      tambah("satu.", ...ubin("v4", 222, 50, 56, "1"), ...deret("d6", 250, 134, 1, 14, 26)),
    ),
  ],
};

/* ------------------------------ 7b. Deret ketujuh, kotak kosong, mengecil dari sembilan ------------------------------ */
const SUARA_J1 = "Bu Ratri menulis tabel uraian sampai deret ketujuh, dua ditambah dua terus, jadi empat belas.";
const SUARA_J2 = "Genta menyusun empat kotak, satu kosong, lalu memilih gambar pelengkap.";
const SUARA_J3 = "Sembilan, tujuh, lima, tiga, satu: mengecil boleh dimulai dari angka besar.";
/** Kolom tabel uraian: urutan, banyak, uraian. Baris ke-i (mulai 1) berada di y 54 + 14 * (i - 1). */
const KOL = { urut: 90, banyak: 160, uraian: 236 };
const yBaris = (i: number): number => 54 + 14 * (i - 1);
const barisUraian = (i: number, banyak: string, uraian: string): Obj[] => [
  teks(`r${i}n`, KOL.urut, yBaris(i), String(i), 11, W.coklat, { z: 6 }),
  teks(`r${i}b`, KOL.banyak, yBaris(i), banyak, 11, banyak === "?" ? W.merah : W.biru, { z: 6 }),
  teks(`r${i}u`, KOL.uraian, yBaris(i), uraian, 11, uraian === "-" ? W.abu : W.hijauTua, { z: 6 }),
];
/** Kotak kumpulan `${id}` berisi n titik `${id}-c{i}` (kisi tiga kolom, jarak 12). Pojok kiri-atas (x, y), lebar 56, tinggi 46. */
const kumpulan = (id: string, x: number, y: number, n: number): Obj[] => [
  kotak(id, x, y, 56, 46, "#FEF3C7", W.bambuTua, { rx: 5, tebal: 1.6, z: 1 }),
  ...Array.from({ length: n }, (_, i) => bulat(`${id}-c${i}`, x + 28 + ((i % 3) - (Math.min(3, n) - 1) / 2) * 13, y + 23 + (Math.floor(i / 3) - (Math.ceil(n / 3) - 1) / 2) * 13, 4, W.bambu, W.bambuTua, { tebal: 1, z: 2 })),
];

export const ADEGAN_KETUJUH: AdeganStory = {
  id: "ketujuh",
  judul: "Deret ketujuh, kotak kosong, dan sembilan sampai satu",
  sumber: "Materi: deret ketujuh dan kotak kosong",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_J1,
      tambah(0, judul("Tabel Uraian Sampai Deret Ketujuh"), ...tanah("tn", 150), ...tokoh("br", 30, 184, "Bu Ratri"), kotak("tb", 64, 24, 222, 124, W.putih, W.coklat, { rx: 4, tebal: 1.8, z: 1 })),
      tambah("tabel", teks("h1", KOL.urut, 38, "deret", 11, W.coklat, { z: 6 }), teks("h2", KOL.banyak, 38, "banyak", 11, W.coklat, { z: 6 }), teks("h3", KOL.uraian, 38, "uraian", 11, W.coklat, { z: 6 })),
      tambah("uraian", ...barisUraian(1, "2", "-"), ...barisUraian(2, "4", "2 + 2"), ...barisUraian(3, "6", "4 + 2")),
      tambah("ketujuh,", ...barisUraian(4, "?", "? + 2"), ...barisUraian(5, "?", "? + 2"), ...barisUraian(6, "?", "? + 2"), ...barisUraian(7, "?", "? + 2")),
      sorotkan("ditambah", "r7u"),
      ubah("belas.", { id: "r7b", isi: "14", warna: W.hijauTua }),
    ),
    k(
      SUARA_J2,
      bersih(0),
      tambah(0, judul("Kotak yang Kosong"), ...tanah("tn", 150), ...tokoh("ge", 30, 184, "Genta")),
      tambah("kotak", ...kumpulan("q1", 16, 28, 2), ...kumpulan("q2", 82, 28, 4), ...kumpulan("q4", 214, 28, 8), teks("m1", 44, 90, "deret 1", 11, W.coklat), teks("m2", 110, 90, "deret 2", 11, W.coklat), teks("m4", 242, 90, "deret 4", 11, W.coklat)),
      tambah("kosong,", kotak("q3", 148, 28, 56, 46, undefined, W.merah, { rx: 5, tebal: 1.6, z: 1 }), teks("q3t", 176, 60, "?", 24, W.merah, { z: 6 }), teks("m3", 176, 90, "deret 3", 11, W.coklat)),
      tambah("memilih", ...kumpulan("o1", 70, 98, 5), ...kumpulan("o2", 134, 98, 6), ...kumpulan("o3", 198, 98, 7)),
      tambah("pelengkap.", kotak("pk", 130, 94, 64, 54, undefined, W.hijau, { rx: 6, tebal: 2.4, z: 4 }), emo("ok", 206, 140, E.benar, 20)),
    ),
    k(
      SUARA_J3,
      bersih(0),
      tambah(0, judul("Mengecil dari Sembilan"), ...tanah("tn", 150), ...tokoh("br", 30, 184, "Bu Ratri")),
      tambah("Sembilan,", ...ubin("w1", 24, 50, 44, "9", "deret 1", 11)),
      tambah("tujuh,", ...ubin("w2", 76, 50, 44, "7", "deret 2", 11)),
      tambah("lima,", ...ubin("w3", 128, 50, 44, "5", "deret 3", 11)),
      tambah("tiga,", ...ubin("w4", 180, 50, 44, "3", "deret 4", 11)),
      tambah("satu:", ...ubin("w5", 232, 50, 44, "1", "deret 5", 11)),
      tambah("mengecil", teks("mc", 150, 114, "mengecil −2", 11, W.merah)),
      tambah("besar.", teks("bs", 220, 140, "angka besar pun bisa", 11, W.hijauTua), emo("tp", 262, 174, E.tepuk, 20)),
    ),
  ],
};

/* ------------------------------ 8. Habis di nol ------------------------------ */
const SUARA_H1 = "Satria bertanya, kalau dikurangi dua lagi, hasilnya berapa?";
const SUARA_H2 = "Bu Ratri tersenyum, angklungnya sudah habis, jadi polanya berhenti di nol.";
const SUARA_H3 = "Pola mengecil tidak akan sampai di bawah nol, karena benda tidak bisa kurang dari tidak ada.";

export const ADEGAN_HABIS: AdeganStory = {
  id: "habis",
  judul: "Angklung habis di nol",
  sumber: "Materi: berhenti di nol",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_H1,
      tambah(0, judul("Dikurangi Dua Lagi?"), ...tanah("tn", 150), ...tokoh("sa", 60, 184, "Satria"), ...deret("b1", 120, 148, 1, 14, 28)),
      tambah("dikurangi", teks("bk", 190, 70, "1 − 2", 16, W.hijauTua)),
      tambah("hasilnya", teks("tq", 250, 112, "?", 30, W.merah)),
    ),
    k(
      SUARA_H2,
      hapus(0, "b1-c0", "bk", "tq"),
      tambah(0, ...tokoh("br", 240, 184, "Bu Ratri")),
      tambah("tersenyum,", emo("sn", 240, 146, E.senyum, 20)),
      tambah("habis,", ...rakAngklung("rh", 96, 60, 80, 60), teks("hb", 136, 52, "habis", 10, W.merah)),
      tambah("nol.", teks("n0", 136, 106, "0", 28, W.merah)),
    ),
    k(
      SUARA_H3,
      tambah(0, teks("pm", 236, 50, "pola mengecil", 9, W.hijauTua)),
      tambah("bawah", teks("bw", 236, 70, "tidak di bawah 0", 9, W.coklat)),
      tambah("nol,", emo("xs", 192, 72, E.salah, 18)),
      sorotkan("benda", "rh"),
      tambah("ada.", teks("td", 236, 90, "tidak ada", 9, W.merah)),
    ),
  ],
};

/* ------------------------------ 9. Penutup ------------------------------ */
const SUARA_P1 = "Pak Gunawan, penata panggung, datang membawa gulungan meteran dan palu.";
const SUARA_P2 = "Ia ingin menata kursi penonton dengan pola, tetapi kali ini hanya memakai bilangan.";
const SUARA_P3 = "Menurutmu, bagaimana caranya menyusun kursi tanpa menggambar satu per satu? Terima kasih, Satria, Laras, Genta, Pak Hendro, dan Bu Ratri!";
/** Kursi penonton: dudukan `${id}-d` dan sandaran `${id}-s`. Dudukan berpusat di x, sisi atasnya di y. */
const kursi = (id: string, x: number, y: number): Obj[] => [
  kotak(`${id}-d`, x - 9, y, 18, 10, W.kayu, W.kayuTua, { rx: 2, tebal: 1.2, z: 2 }),
  kotak(`${id}-s`, x - 9, y - 12, 18, 4, W.kayu, W.kayuTua, { rx: 1, tebal: 1.2, z: 2 }),
];

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Pak Gunawan datang",
  sumber: "Materi: penutup dan jembatan",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Pak Gunawan Datang"), ...tanah("tn", 150), ...tokoh("pg", 40, 184, "Pak Gunawan")),
      tambah("panggung,", ...panggung("pgg", 150, 118, 130)),
      tambah("gulungan", bulat("mt", 90, 160, 7, "#FACC15", W.coklat, { z: 2 }), teks("tm", 112, 152, "meteran", 8, W.coklat)),
      tambah("palu.", garis("pl", 118, 176, 12, -12, W.kayuTua, 2.5, { z: 2 }), kotak("pk", 126, 160, 10, 6, "#9CA3AF", "#374151", { rx: 1, tebal: 1, z: 3 }), teks("tpl", 150, 180, "palu", 8, W.coklat)),
    ),
    k(
      SUARA_P2,
      tambah("kursi", ...kursi("c1", 170, 108), ...kursi("c2", 210, 108), ...kursi("c3", 250, 108)),
      tambah("pola,", teks("pl2", 210, 62, "pola kursi", 10, W.hijauTua)),
      tambah("bilangan.", teks("bl", 210, 82, "3, 6, 9", 14, W.merah)),
    ),
    k(
      SUARA_P3,
      bersih(0),
      tambah(0, judul("Kursi Penonton"), ...tanah("tn", 150), ...tokoh("pg", 24, 184, "Pak Gunawan")),
      tambah("kursi", ...kursi("c1", 100, 104), ...kursi("c2", 140, 104), ...kursi("c3", 180, 104), ...kursi("c4", 220, 104), teks("m1", 100, 82, "1", 12, W.biru), teks("m2", 140, 82, "2", 12, W.biru), teks("m3", 180, 82, "3", 12, W.biru)),
      tambah("menggambar", teks("tq", 220, 86, "?", 22, W.merah)),
      tambah("Satria,", ...tokoh("sa", 70, 184, "Satria")),
      tambah("Laras,", ...tokoh("lr", 112, 184, "Laras")),
      tambah("Genta,", ...tokoh("ge", 152, 184, "Genta")),
      tambah("Hendro,", ...tokoh("ph", 204, 184, "Pak Hendro")),
      tambah("Ratri!", ...tokoh("br", 258, 184, "Bu Ratri"), emo("lb", 258, 140, E.lambai, 20)),
    ),
  ],
};
