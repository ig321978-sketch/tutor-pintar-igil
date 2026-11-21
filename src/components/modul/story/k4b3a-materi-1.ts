import type { AdeganStory } from "./logika-story";
import { E, W, deret, emo, garis, judul, kotak, panah, panggung, papanNama, rakAngklung, tanah, teks, tokoh } from "./k4b3a-gambar";
import { k, sorotkan, tambah, ubah } from "./k4b3a-bantu";

/*
 * Cerita orisinal IGIL "Deret Angklung Bu Ratri" (Kelas 4 Bab 3 Sub-Bab A, pola gambar), awal cerita Orkestra Angklung Kampung Senandung.
 * Naskah suara dari naskah/story-naskah-k4b3a.md. Bagian ini: lapangan, deret yang bertambah, dan tabel selisih.
 */

/* ------------------------------ 1. Lapangan ------------------------------ */
const SUARA_L1 = "Pak Hendro mengajak Satria, Laras, dan Genta ke lapangan Kampung Senandung untuk membantu Bu Ratri.";
const SUARA_L2 = "Di sana ada rak angklung bertingkat, dan panggung kayu yang masih kosong.";
const SUARA_L3 = "Bu Ratri memegang tongkat dirigen dan berkata, konser akhir pekan harus rapi, mulai dari deretan angklungnya.";

export const ADEGAN_LAPANGAN: AdeganStory = {
  id: "lapangan",
  judul: "Tiba di lapangan Kampung Senandung",
  sumber: "Materi: lapangan orkestra",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_L1,
      tambah(0, judul("Lapangan Kampung Senandung"), ...tanah("tn", 150)),
      tambah("Hendro", ...tokoh("ph", 28, 184, "Pak Hendro")),
      tambah("Satria,", ...tokoh("sa", 72, 184, "Satria")),
      tambah("Laras,", ...tokoh("lr", 108, 184, "Laras")),
      tambah("Genta", ...tokoh("ge", 144, 184, "Genta")),
      tambah("lapangan", ...papanNama("pn", 170, 40, 120)),
    ),
    k(
      SUARA_L2,
      tambah("rak", ...rakAngklung("rk", 176, 84, 108, 62)),
      tambah("bertingkat,", ...deret("ra", 192, 125, 4, 18), ...deret("rb", 190, 146, 5, 16)),
      tambah("panggung", ...panggung("pg", 14, 112, 140)),
      tambah("kosong.", teks("kk", 84, 104, "masih kosong", 8, W.coklat)),
    ),
    k(
      SUARA_L3,
      tambah(0, ...tokoh("br", 214, 184, "Bu Ratri")),
      sorotkan("tongkat", "br-tg"),
      tambah("berkata,", emo("bc", 244, 150, E.bicara, 18)),
      tambah("rapi,", teks("rp", 84, 90, "konser rapi", 8.4, W.hijauTua)),
      sorotkan("deretan", "rk"),
      tambah("angklungnya.", emo("mn", 232, 76, E.musik, 16)),
    ),
  ],
};

/* ------------------------------ 2. Deret yang bertambah ------------------------------ */
const SUARA_T1 = "Bu Ratri menata deret pertama dengan dua angklung, deret kedua dengan empat angklung, dan deret ketiga dengan enam angklung.";
const SUARA_T2 = "Laras melihat tiap deret bertambah dua angklung dari deret sebelumnya.";
const SUARA_T3 = "Selisih yang selalu sama inilah yang membuat susunan gambar menjadi sebuah pola.";
/** Tiga deret berundak: deret 1 (2 angklung), deret 2 (4), deret 3 (6). Dasar tabung di y 62, 92, 122. */
const DT = { x0: 104, dx: 24 };

export const ADEGAN_DERET_TUMBUH: AdeganStory = {
  id: "deret-tumbuh",
  judul: "Deret yang bertambah dua",
  sumber: "Materi: deret bertambah",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Deret Pertama, Kedua, Ketiga"), ...tanah("tn", 150), ...tokoh("br", 40, 184, "Bu Ratri")),
      tambah("dua", ...deret("d1", DT.x0, 62, 2, DT.dx), teks("l1", 58, 58, "deret 1", 9, W.coklat), teks("n1", 250, 58, "2", 12, W.merah)),
      tambah("empat", ...deret("d2", DT.x0, 92, 4, DT.dx), teks("l2", 58, 88, "deret 2", 9, W.coklat), teks("n2", 250, 88, "4", 12, W.merah)),
      tambah("enam", ...deret("d3", DT.x0, 122, 6, DT.dx), teks("l3", 58, 118, "deret 3", 9, W.coklat), teks("n3", 250, 118, "6", 12, W.merah)),
    ),
    k(
      SUARA_T2,
      tambah(0, ...tokoh("lr", 130, 184, "Laras")),
      tambah("bertambah", panah("a1", 278, 70, 0, 14, W.hijau, 2), teks("s1", 286, 80, "+2", 10, W.hijauTua)),
      tambah("dua", panah("a2", 278, 100, 0, 14, W.hijau, 2), teks("s2", 286, 110, "+2", 10, W.hijauTua)),
      sorotkan("angklung", "d2-c2", "d2-c3", "d3-c4", "d3-c5"),
    ),
    k(
      SUARA_T3,
      tambah(0, teks("tp", 150, 142, "selisih sama", 10, W.hijauTua)),
      tambah("susunan", kotak("bg", 54, 40, 232, 96, undefined, W.hijau, { rx: 6, tebal: 1.6, z: 3 })),
      tambah("pola.", teks("pl", 232, 172, "pola", 13, W.merah), emo("ok", 262, 170, E.benar, 20)),
    ),
  ],
};

/* ------------------------------ 3. Tabel selisih ------------------------------ */
const SUARA_B1 = "Laras membuat tabel selisih di kertas sakunya, dua, empat, enam, dan tiap langkah ditulis tambah dua.";
const SUARA_B2 = "Deret keempat pasti delapan angklung, karena enam ditambah dua.";
const SUARA_B3 = "Karena pola ini makin lama makin banyak, kita menyebutnya pola membesar.";

export const ADEGAN_TABEL: AdeganStory = {
  id: "tabel",
  judul: "Tabel selisih di kertas saku",
  sumber: "Materi: tabel selisih",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, judul("Tabel di Kertas Saku"), ...tanah("tn", 150), ...tokoh("lr", 40, 184, "Laras")),
      tambah("kertas", kotak("kt", 78, 40, 200, 88, W.putih, W.coklat, { rx: 4, tebal: 1.8, z: 1 }), garis("kg", 78, 74, 200, 0, W.abu, 1.2, { z: 2 })),
      tambah("dua,", teks("c1", 110, 66, "2", 16, W.biru, { z: 6 })),
      tambah("empat,", teks("c2", 170, 66, "4", 16, W.biru, { z: 6 })),
      tambah("enam,", teks("c3", 230, 66, "6", 16, W.biru, { z: 6 })),
      tambah("tambah", teks("e1", 140, 100, "+2", 12, W.hijauTua, { z: 6 }), teks("e2", 200, 100, "+2", 12, W.hijauTua, { z: 6 })),
    ),
    k(
      SUARA_B2,
      tambah(0, teks("c4", 262, 66, "?", 16, W.merah, { z: 6 }), kotak("sk", 244, 44, 32, 30, undefined, W.merah, { rx: 3, tebal: 1.6, z: 3 })),
      ubah("delapan", { id: "c4", isi: "8" }),
      tambah("enam", teks("fs", 120, 124, "6 + 2 = 8", 11, W.coklat, { z: 6 })),
      tambah("ditambah", teks("e3", 260, 100, "+2", 12, W.hijauTua, { z: 6 })),
      sorotkan("dua", "e3"),
    ),
    k(
      SUARA_B3,
      tambah("pola", teks("pm", 150, 146, "makin banyak", 10, W.hijauTua)),
      tambah("banyak,", panah("pa", 96, 136, 120, 0, W.hijau, 2.4)),
      tambah("membesar.", teks("mb", 232, 172, "membesar", 13, W.merah), emo("tp", 266, 148, E.tepuk, 20)),
    ),
  ],
};
