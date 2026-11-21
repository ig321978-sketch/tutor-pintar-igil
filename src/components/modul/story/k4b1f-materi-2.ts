import type { AdeganStory } from "./logika-story";
import { E, W, emo, ember, garis, idSel, isiSel, judul, panah, papanSusun, teks, tokoh } from "./k4b1f-gambar";
import { k, sorotkan, tambah, ubah } from "./k4b1f-bantu";

/*
 * Cerita orisinal IGIL "Papan Sisa Pak Usman" (Kelas 4 Bab 1 Sub-Bab F), cerita Penginapan Pulau Karang Indah.
 * Naskah suara dari naskah/story-naskah-k4b1f.md. Bagian ini: mengambil satu puluhan, mengambil satu ratusan, dan hasilnya.
 */
const PX = 76;
const PY = 44;
const A2 = idSel("ps", "a", 2);
const A1 = idSel("ps", "a", 1);
const A0 = idSel("ps", "a", 0);
const B2 = idSel("ps", "b", 2);
const B1 = idSel("ps", "b", 1);

/* ------------------------------ 4. Mengambil satu puluhan ------------------------------ */
const SUARA_A1 = "Genta menggeleng, di satuan dua tidak cukup untuk dikurangi lima.";
const SUARA_A2 = "Kita mengambil satu puluhan sebagai mengambil pertama, lalu satuan menjadi dua belas.";
const SUARA_A3 = "Dua belas dikurangi lima sama dengan tujuh.";

export const ADEGAN_AMBIL: AdeganStory = {
  id: "ambil",
  judul: "Mengambil satu puluhan",
  sumber: "Materi: mengambil puluhan",
  latar: "#E0E7FF",
  ketukan: [
    k(
      SUARA_A1,
      tambah(0, judul("Mengambil Puluhan"), ...papanSusun("ps", PX, PY, ["6", "1", "2"], ["2", "7", "5"]), ...tokoh("ge", 40, 184, "Genta")),
      tambah("menggeleng,", emo("gl", 72, 166, E.gelengan, 16)),
      sorotkan("satuan", A2),
      tambah("tidak", teks("bd", 254, 96, "2 < 5", 11, W.merah)),
      sorotkan("lima.", B2),
    ),
    k(
      SUARA_A2,
      tambah("mengambil", panah("pj", 142, 36, 40, 0, W.merah, 2.4), teks("am", 162, 30, "ambil 1", 8.4, W.merah)),
      ubah("satu", { id: A1, isi: "0", warna: W.merah }),
      ubah("satuan", { id: A2, isi: "12", warna: W.merah }),
      tambah("dua", teks("p10", 254, 66, "+10", 12, W.merah)),
    ),
    k(
      SUARA_A3,
      sorotkan("belas", A2),
      sorotkan("lima", B2),
      tambah("sama", isiSel("ps", PX, PY, 2, 2, "7", 13, W.hijau)),
      tambah("tujuh.", teks("e1", 150, 160, "12 − 5 = 7", 14, W.hijau)),
    ),
  ],
};

/* ------------------------------ 5. Mengambil satu ratusan ------------------------------ */
const SUARA_R1 = "Di puluhan, nol tidak cukup untuk dikurangi tujuh.";
const SUARA_R2 = "Kita mengambil satu ratusan sebagai mengambil kedua, sehingga puluhan menjadi sepuluh.";
const SUARA_R3 = "Sepuluh dikurangi tujuh sama dengan tiga, dan ratusan tinggal lima dikurangi dua sama dengan tiga.";

export const ADEGAN_RATUSAN: AdeganStory = {
  id: "ratusan",
  judul: "Mengambil satu ratusan",
  sumber: "Materi: mengambil ratusan",
  latar: "#E0E7FF",
  ketukan: [
    k(
      SUARA_R1,
      tambah(0, judul("Mengambil Ratusan"), ...papanSusun("ps", PX, PY, ["6", "0", "12"], ["2", "7", "5"], ["", "", "7"]), ...tokoh("ge", 40, 184, "Genta")),
      sorotkan("nol", A1),
      tambah("tidak", teks("bd", 254, 96, "0 < 7", 11, W.merah)),
      sorotkan("tujuh.", B1),
    ),
    k(
      SUARA_R2,
      tambah("mengambil", panah("pr", 98, 36, 44, 0, W.merah, 2.4), teks("am", 120, 30, "ambil 1", 8.4, W.merah)),
      ubah("ratusan,", { id: A0, isi: "5", warna: W.merah }),
      ubah("sehingga", { id: A1, isi: "10", warna: W.merah }),
      tambah("sepuluh.", teks("p10", 254, 66, "+10", 12, W.merah)),
    ),
    k(
      SUARA_R3,
      sorotkan("Sepuluh", A1),
      tambah("sama", teks("e1", 150, 156, "10 − 7 = 3", 12, W.hijau)),
      tambah("tiga,", isiSel("ps", PX, PY, 2, 1, "3", 13, W.hijau)),
      sorotkan("ratusan", A0),
      tambah("dua", teks("e2", 150, 172, "5 − 2 = 3", 12, W.hijau)),
      tambah("tiga.", isiSel("ps", PX, PY, 2, 0, "3", 13, W.hijau), teks("n337", 254, 126, "337", 16, W.hijau)),
    ),
  ],
};

/* ------------------------------ 6. Hasil ------------------------------ */
const SUARA_H1 = "Hasilnya tiga ratus tiga puluh tujuh tamu masih menginap.";
const SUARA_H2 = "Hasil Satria, empat ratus enam puluh tiga, ternyata terlalu besar.";
const SUARA_H3 = "Satria mendesah dan mengambil ember sandal.";
const SANDAL = Array.from({ length: 6 }, (_, i) => emo(`sd${i}`, 196 + (i % 3) * 14, i < 3 ? 138 : 152, E.sandal, 12));

export const ADEGAN_HASIL: AdeganStory = {
  id: "hasil",
  judul: "Hasil pengurangan dan hasil Satria",
  sumber: "Materi: hasil pengurangan",
  latar: "#DCFCE7",
  ketukan: [
    k(
      SUARA_H1,
      tambah(0, judul("Sisa Tamu"), ...tokoh("pu", 240, 184, "Pak Usman")),
      tambah("ratus", teks("n337", 90, 100, "337", 40, W.hijau)),
      tambah("tamu", teks("lb", 90, 124, "tamu masih menginap", 9, W.ungu)),
      tambah("menginap.", emo("kp1", 66, 150, E.koper, 16), emo("kp2", 90, 150, E.koper, 16), emo("kp3", 114, 150, E.koper, 16)),
    ),
    k(
      SUARA_H2,
      tambah("Satria", ...tokoh("sa", 40, 184, "Satria")),
      tambah("empat", teks("n463", 210, 100, "463", 40, W.merah)),
      tambah("ternyata", garis("cr", 176, 110, 68, -28, W.merah, 3.2, { z: 5 })),
      tambah("besar", teks("lb2", 210, 126, "terlalu besar", 9, W.merah)),
    ),
    k(
      SUARA_H3,
      tambah("mendesah", emo("ms", 72, 166, E.mendesah, 16)),
      tambah("mengambil", ...ember("eb", 190, 150)),
      tambah("sandal.", ...SANDAL),
      ubah("sandal.", { id: "n463", op: 0.35 }),
    ),
  ],
};
