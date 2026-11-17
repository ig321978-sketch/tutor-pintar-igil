import type { AdeganStory } from "./logika-story";
import { E, W, deret, emo, judul, kardus, karton, kartu, kotak, orang, poligon, segiEmpatRel, teks, teras, tutupKaleng, WARNA_BAHAN } from "./k1b4a-gambar";
import { bersih, hapus, k, sorotkan, tambah } from "./k1b4a-bantu";

/* Akhir "Bahan dari Gudang": bahan siap tetapi teras berantakan (jembatan ke Sub-Bab B), lalu penutup. Tanpa latihan. */

/* ------------------------------ 7. Bahan siap, teras berantakan ------------------------------ */
const SUARA_H1 = "Bahan siap! Ada empat roda, dua atap, dan lima badan mainan.";
const SUARA_H2 = "Tetapi teras jadi penuh barang bekas. Botol, tali, dan potongan karton bercampur.";
const SUARA_H3 = "Mamah berkata, besok barang di teras harus dipilah supaya bahan mudah dicari.";
const RODA = deret(4, 30, 26, 56);
const ATAP = deret(2, 136, 28, 58);
const BADAN = deret(5, 206, 20, 56);

export const ADEGAN_HASIL: AdeganStory = {
  id: "bahan-siap",
  judul: "Bahan siap, teras berantakan",
  sumber: "Materi: hasil dan masalah berikutnya",
  latar: "#ECFDF5",
  ketukan: [
    k(
      SUARA_H1,
      tambah(0, judul("Bahan siap")),
      tambah("siap!", emo("ok", 272, 22, E.benar, 14)),
      tambah("roda,", ...RODA.flatMap((p, i) => tutupKaleng(`rd${i}`, p.x, p.y, 10)), teks("rdn", 69, 84, "4 roda", 10, W.biru)),
      tambah("atap,", ...ATAP.map((p, i) => karton(`at${i}`, p.x, p.y, 12)), teks("atn", 150, 84, "2 atap", 10, W.biru)),
      tambah("badan", ...BADAN.flatMap((p, i) => kardus(`bd${i}`, p.x, p.y, 16, 14)), teks("bdn", 246, 84, "5 badan", 10, W.biru)),
    ),
    k(
      SUARA_H2,
      tambah("teras", ...teras("ts", 10, 98, 280, 74), teks("tsn", 150, 186, "teras", 9, W.coklat)),
      tambah("penuh", ...tutupKaleng("x0", 78, 122, 10), poligon("x1", 226, 150, segiEmpatRel(30, 20), WARNA_BAHAN.kardus, { rot: 20 })),
      tambah("Botol,", emo("x2", 124, 146, E.botol, 20)),
      tambah("tali,", emo("x3", 180, 128, E.tali, 20)),
      tambah("karton", karton("x4", 262, 120, 12, { rot: 160 }), karton("x5", 96, 156, 10, { rot: 60 })),
    ),
    k(
      SUARA_H3,
      hapus(0, "tsn"),
      tambah("Mamah,", ...orang("mm", 36, 130, E.mamah, "Mamah")),
      tambah("besok", ...kartu("bs", 60, 176, 230, 20, W.pink, ["besok: pilah barang di teras"], 9)),
      sorotkan("dicari.", "ts"),
    ),
  ],
};

/* ------------------------------ 8. Penutup ------------------------------ */
const SUARA_Q1 = "Bentuk lengkung tanpa sisi lurus dan sudut, jadi bisa menggelinding.";
const SUARA_Q2 = "Segitiga punya tiga sisi lurus dan tiga sudut. Segi empat punya empat sisi lurus dan empat sudut.";
const SUARA_Q3 = "Coba pikirkan: kalau kamu memilah barang di teras, aturan apa yang kamu pakai?";
const baris = (i: number, warna: string) => kotak(`p${i}`, 14, 32 + i * 50, 272, 42, warna, W.biru, { rx: 8, tebal: 1.6, z: -2 });

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Penutup: ingat bentuk benda",
  sumber: "Materi: ringkasan dan penutup",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_Q1,
      tambah(0, judul("Ingat, ya!")),
      tambah("lengkung", baris(0, W.langit), ...tutupKaleng("p0i", 40, 53, 13), teks("p0a", 64, 50, "lengkung: tanpa sisi lurus dan sudut", 9.4, W.biru, { anchor: "start" })),
      tambah("menggelinding.", teks("p0b", 64, 66, "bisa menggelinding", 8.6, W.ungu, { anchor: "start" })),
    ),
    k(
      SUARA_Q2,
      tambah("Segitiga", baris(1, W.pink), karton("p1i", 40, 104, 13), teks("p1a", 64, 107, "segitiga: 3 sisi lurus, 3 sudut", 9.4, W.biru, { anchor: "start" })),
      tambah("Segi@2", baris(2, W.hijauMuda), poligon("p2i", 40, 153, segiEmpatRel(28, 20), WARNA_BAHAN.kardus), teks("p2a", 64, 157, "segi empat: 4 sisi lurus, 4 sudut", 9.4, W.biru, { anchor: "start" })),
    ),
    k(
      SUARA_Q3,
      bersih(0),
      tambah(0, judul("Coba pikirkan")),
      tambah(0, ...tutupKaleng("q0", 96, 64, 16), karton("q1", 150, 68, 18, { rot: 180 }), poligon("q2", 206, 66, segiEmpatRel(32, 24), WARNA_BAHAN.kardus, { rot: 30 })),
      tambah(0, teks("tt", 150, 104, "tetap sama walau diputar", 10, W.ungu)),
      tambah("pikirkan:", ...orang("ig", 45, 160, E.igil, "Igil"), ...orang("kk", 255, 160, E.kaka, "Kaka")),
      tambah("teras,", emo("tr", 150, 150, E.keranjang, 26)),
      tambah("pakai?", ...kartu("pt", 70, 120, 160, 20, W.emas, ["aturan apa yang kamu pakai?"], 9)),
    ),
  ],
};
