import type { AdeganStory } from "./logika-story";
import { E, TEGAK_RINI, W, diagramTegak, emo, garis, judul, kotak, lantai, panah, papanData, satuanSumbu, teks, tokoh, ujungTegak } from "./k4b6b-gambar";
import { k, sorotkan, tambah } from "./k4b6b-bantu";

/*
 * Cerita orisinal IGIL "Diagram Batang Pak Dodi" (Kelas 4 Bab 6 Sub-Bab B), akhir cerita Bazar Kuliner Sekolah.
 * Naskah suara dari naskah/story-naskah-k4b6b.md. Bagian ini: cara membaca batang, salah langkah Satria (lupa tingkat lima), dan pemeriksaan Laras.
 */

const SERU = "\u{2757}";
const TELUNJUK = "\u{1F449}";
const DASAR = (judulAdegan: string) => [judul(judulAdegan), ...lantai("lt", 150), papanData(), ...diagramTegak("dg", TEGAK_RINI), satuanSumbu()];
const [, Y_ES] = ujungTegak(TEGAK_RINI, 3);
const [, Y_PG] = ujungTegak(TEGAK_RINI, 1);

/* ------------------------------ 4. Membaca batang ------------------------------ */
const SUARA_B1 = "Cara membaca, geser mata dari ujung batang lurus ke sumbu angka.";
const SUARA_B2 = "Batang es cincau berhenti tepat di garis dua puluh lima, jadi terjual dua puluh lima porsi.";
const SUARA_B3 = "Sumbu harus diberi judul dan satuan, supaya orang tahu angka itu menyatakan porsi.";

export const ADEGAN_BACA_BATANG: AdeganStory = {
  id: "baca-batang",
  judul: "Cara membaca batang",
  sumber: "Materi: membaca batang pada sumbu",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, ...DASAR("Membaca Batang")),
      tambah(0, ...tokoh("la", 36, 184, "Laras")),
      tambah("mata", emo("em", 274, 60, E.mata, 20)),
      sorotkan("ujung", "dg-b3"),
      tambah("sumbu", panah("pa", 202, Y_ES, -154, 0, W.merah, 2, { z: 6 })),
    ),
    k(
      SUARA_B2,
      sorotkan("cincau", "dg-b3", "dg-n3"),
      tambah("dua", teks("l25a", 274, 70, "2 puluh 5", 8, W.merah)),
      tambah("jadi", teks("l25b", 274, 82, "= 25 porsi", 8, W.hijauTua)),
    ),
    k(
      SUARA_B3,
      tambah("judul", teks("lj", 274, 100, "judul sumbu", 7.5, W.coklat)),
      sorotkan("satuan", "su"),
      tambah("porsi", teks("lp", 274, 114, "satuan: porsi", 7, W.coklat)),
    ),
  ],
};

/* ------------------------------ 5. Salah langkah: lupa tingkat ------------------------------ */
const SUARA_S1 = "Satria memandang batang pisang goreng yang berhenti di garis keempat dari bawah.";
const SUARA_S2 = "Ia berseru, empat tingkat berarti empat porsi, tidak mungkin salah!";
const SUARA_S3 = "Kalau aku salah, aku melipat semua taplak meja bazar, katanya sambil mengangkat tumpukan kain.";

export const ADEGAN_SALAH_SKALA: AdeganStory = {
  id: "salah-skala",
  judul: "Satria membaca terburu-buru",
  sumber: "Materi: salah langkah membaca tingkat",
  latar: "#FFF1F2",
  ketukan: [
    k(
      SUARA_S1,
      tambah(0, ...DASAR("Satria Membaca Batang")),
      tambah(0, ...tokoh("sa", 36, 184, "Satria")),
      sorotkan("pisang", "dg-b1", "dg-n1"),
      tambah("garis", garis("gb", 44, Y_PG, 190, 0, W.merah, 1.6, { putus: true, z: 4 }), teks("l4", 274, 66, "garis ke 4", 8, W.merah)),
    ),
    k(
      SUARA_S2,
      tambah("berseru", emo("sr", 36, 148, SERU, 14)),
      tambah("empat", teks("b4", 274, 84, "4 porsi?", 8, W.merah)),
      tambah("mungkin", emo("tk", 274, 108, E.tanya, 18)),
    ),
    k(
      SUARA_S3,
      tambah("salah", teks("tr", 274, 124, "taruhan", 8, W.merah)),
      tambah("taplak", kotak("tp0", 254, 150, 40, 5, "#FCA5A5", W.merah, { rx: 1, z: 3 }), kotak("tp1", 254, 145, 40, 5, "#93C5FD", W.biru, { rx: 1, z: 3 })),
      tambah("tumpukan", kotak("tp2", 254, 140, 40, 5, "#FDE047", W.coklat, { rx: 1, z: 3 }), emo("kn", 274, 136, E.kain, 14)),
    ),
  ],
};

/* ------------------------------ 6. Periksa: tiap tingkat lima porsi ------------------------------ */
const SUARA_P1 = "Laras menunjuk angka di sumbu tepat di sebelah garis keempat itu.";
const SUARA_P2 = "Angkanya dua puluh, karena tiap tingkat mewakili lima porsi, bukan satu porsi.";
const SUARA_P3 = "Satria melipat taplak sampai terlilit kain dari kepala sampai kaki, dan semua orang tertawa.";

export const ADEGAN_PERIKSA_SKALA: AdeganStory = {
  id: "periksa-skala",
  judul: "Laras memeriksa angka",
  sumber: "Materi: tiap tingkat lima porsi",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, ...DASAR("Laras Memeriksa Angka")),
      tambah(0, ...tokoh("la", 36, 184, "Laras")),
      sorotkan("angka", "dg-a4"),
      tambah("tepat", emo("pj", 16, 82, TELUNJUK, 13)),
      tambah("garis", garis("gb", 44, Y_PG, 190, 0, W.merah, 1.6, { putus: true, z: 4 })),
    ),
    k(
      SUARA_P2,
      tambah("dua", teks("l20", 274, 70, "20 = 2 puluh", 7, W.hijauTua)),
      tambah("lima", teks("l5", 274, 84, "tiap garis 5", 7.5, W.hijauTua)),
      tambah("satu", teks("l1", 274, 98, "bukan 1 porsi", 7, W.merah)),
    ),
    k(
      SUARA_P3,
      tambah("Satria", ...tokoh("sa", 84, 184, "Satria")),
      tambah("terlilit", kotak("kl", 70, 152, 28, 30, "#FCA5A5", W.merah, { rx: 6, z: 5, op: 0.85 })),
      tambah("tertawa", emo("tw1", 140, 168, E.tertawa, 22), emo("tw2", 190, 168, E.tertawa, 22)),
    ),
  ],
};
