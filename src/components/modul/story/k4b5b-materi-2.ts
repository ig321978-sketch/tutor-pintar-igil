import type { AdeganStory } from "./logika-story";
import { E, G, W, emo, garisKeSudut, idIrisan, irisan, judul, kartu, kotak, lantai, meja, papanNama, poli, serpih, tanda, teks, titikBeraturan, titikPusat, tokoh, type Tt } from "./k4b5b-gambar";
import { hapus, k, sorotkan, tambah, ubah } from "./k4b5b-bantu";

/*
 * Cerita orisinal IGIL "Mosaik Pak Rudi" (Kelas 4 Bab 5 Sub-Bab B), akhir cerita Toko Keramik Bu Dewi.
 * Naskah suara dari naskah/story-naskah-k4b5b.md. Bagian ini: salah langkah Satria (segienam beraturan dibelah dari tengah menjadi lima segitiga),
 * Laras menarik enam garis dari titik tengah dan mendapat enam segitiga sama sisi, dan Satria menyapu toko (taruhan).
 */

const PUSAT: Tt = [150, 86];
export const SEGIENAM: Tt[] = titikBeraturan(PUSAT[0], PUSAT[1], 30, 6, 0);

/* ------------------------------ 4. Salah segienam ------------------------------ */
const SUARA_S1 = "Pak Rudi menunjukkan keramik segienam beraturan dan meminta anak-anak membaginya menjadi segitiga.";
const SUARA_S2 = "Satria berseru, dibelah dari tengah jadinya lima segitiga!";
const SUARA_S3 = "Kalau aku salah, aku menyapu seluruh toko, katanya sambil mengangkat sapu.";

export const ADEGAN_SALAH_SEGIENAM: AdeganStory = {
  id: "salah-segienam",
  judul: "Satria bilang lima segitiga",
  sumber: "Materi: salah langkah dan taruhan",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_S1,
      tambah(0, judul("Satria Salah Hitung"), ...lantai("lt", 150), ...meja("mj", 14, 232)),
      tambah("Rudi", ...tokoh("pr", 262, 184, "Pak Rudi")),
      tambah("segienam", poli("hx", SEGIENAM, G.hijau)),
      tambah("segitiga", emo("q", 150, 48, E.tanya, 20)),
    ),
    k(
      SUARA_S2,
      tambah("Satria", ...tokoh("sa", 36, 184, "Satria")),
      tambah("berseru", emo("sr", 112, 50, E.seru, 20)),
      tambah("tengah", titikPusat("ct", PUSAT)),
      tambah("lima", teks("n5", 62, 76, "5 segitiga?", 12, W.merah)),
    ),
    k(
      SUARA_S3,
      tambah("salah", teks("tr", 62, 102, "taruhan : menyapu toko", 8, W.merah)),
      tambah("sapu", emo("sp", 68, 170, E.sapu, 22)),
    ),
  ],
};

/* ------------------------------ 5. Hitung segitiga ------------------------------ */
const SUARA_H1 = "Laras menarik garis dari titik tengah ke setiap sudut segienam itu.";
const SUARA_H2 = "Segienam punya enam sudut, jadi garis yang ditarik ada enam, dan segitiganya juga ada enam.";
const SUARA_H3 = "Semua segitiganya sama sisi dan sama besar, bukan lima seperti kata Satria.";
const GARIS_KE_SUDUT = garisKeSudut("g", PUSAT, SEGIENAM);

export const ADEGAN_HITUNG_SEGITIGA: AdeganStory = {
  id: "hitung-segitiga",
  judul: "Laras menghitung segitiga",
  sumber: "Materi: segienam dibelah dari titik tengah",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_H1,
      tambah(0, judul("Laras Menghitung Segitiga"), ...lantai("lt", 150), ...meja("mj", 14, 232), poli("hx", SEGIENAM, G.hijau)),
      tambah("Laras", ...tokoh("la", 36, 184, "Laras")),
      tambah("tengah", titikPusat("ct", PUSAT)),
      tambah("setiap", ...GARIS_KE_SUDUT.slice(0, 3)),
      tambah("sudut", ...GARIS_KE_SUDUT.slice(3)),
    ),
    k(
      SUARA_H2,
      tambah("enam@2", teks("a6", 72, 64, "6 sudut", 11, W.merah)),
      tambah("enam@3", teks("b6", 72, 92, "6 garis", 11, W.merah)),
      hapus("segitiganya", "hx"),
      tambah("segitiganya", ...irisan("t", PUSAT, SEGIENAM)),
      tambah("enam@4", teks("c6", 228, 64, "6 segitiga", 11, W.merah)),
    ),
    k(
      SUARA_H3,
      sorotkan("Semua", ...idIrisan("t", 6)),
      tambah("sisi", tanda("tk0", PUSAT, SEGIENAM[0]), tanda("tk1", SEGIENAM[0], SEGIENAM[1]), tanda("tk2", SEGIENAM[1], PUSAT)),
      tambah("bukan", teks("n5", 70, 40, "bukan 5", 12, W.merah), emo("x5", 112, 40, E.salah, 18)),
      tambah("Satria", ...tokoh("sa", 84, 184, "Satria")),
    ),
  ],
};

/* ------------------------------ 6. Menyapu ------------------------------ */
const SUARA_Y1 = "Satria menepati taruhannya dan mulai menyapu seluruh toko yang penuh serpihan keramik.";
const SUARA_Y2 = "Ia menyapu sambil bersenandung, sampai sapunya menyenggol kotak keping dan semuanya berhamburan.";
const SUARA_Y3 = "Genta mencatat, banyak segitiga hasil belahan dari titik tengah sama dengan banyak sisinya.";
const MINI: Tt[] = titikBeraturan(236, 56, 16, 6, 0);

export const ADEGAN_MENYAPU: AdeganStory = {
  id: "menyapu",
  judul: "Satria menyapu toko",
  sumber: "Materi: taruhan menyapu seluruh toko",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_Y1,
      tambah(0, judul("Satria Menyapu Toko"), ...lantai("lt", 150), ...meja("mj", 190, 100), kotak("kp", 212, 92, 56, 20, "#C99A63", W.coklat, { rx: 3, z: 1 }), kotak("kt", 208, 86, 64, 8, "#A16207", W.coklat, { rx: 3, z: 2 })),
      tambah("Satria", ...tokoh("sa", 60, 184, "Satria")),
      tambah("menyapu", emo("sp", 92, 172, E.sapu, 24)),
      tambah("toko", ...papanNama("pp", 100, 28, 100)),
      tambah("serpihan", ...serpih("fl", 108, 154, 3, 26, { z: -1, tebal: 1.6 }, 1.8)),
    ),
    k(
      SUARA_Y2,
      tambah("bersenandung", emo("ms", 96, 140, E.musik, 18)),
      hapus("menyenggol", "kt"),
      ubah("menyenggol", { id: "kp", rot: 20, x: 226, y: 88 }),
      tambah("menyenggol", emo("tb", 214, 80, E.tabrak, 22)),
      tambah("berhamburan", ...serpih("fb", 196, 154, 4, 24, { z: -1, tebal: 1.6 }, 1.6)),
    ),
    k(
      SUARA_Y3,
      tambah("Genta", ...tokoh("ge", 150, 184, "Genta")),
      tambah("mencatat", emo("ct", 178, 168, E.catat, 20)),
      tambah("segitiga", ...kartu("kc", 90, 50, 112, 26, W.krem, ["segitiga = sisi"], 10)),
      tambah("belahan", ...irisan("mh", [236, 56], MINI)),
    ),
  ],
};
