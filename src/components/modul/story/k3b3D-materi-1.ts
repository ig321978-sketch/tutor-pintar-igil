import type { AdeganStory } from "./logika-story";
import { E, W, bandulObj, barisBandul, emo, judul, labu, lantai, meja, teks, timbanganKodok, tokoh } from "./k3b3D-gambar";
import { bersih, k, redamkan, sorotkan, tambah, ubah } from "./k3b3D-bantu";

/*
 * Cerita orisinal IGIL "Bandul Dokter Hana" (Kelas 3 Bab 3 Sub-Bab D, hubungan kilogram, ons, dan gram), akhir cerita Kebun Binatang Mini.
 * Naskah suara dari naskah/story-naskah-k3b3d.md. Bagian ini: ruang pakan dan timbangan kodok tua, cara menimbang dengan bandul, dan berat labu dari jumlah bandul.
 */

/* ------------------------------ 1. Ruang pakan ------------------------------ */
const SUARA_R1 = "Sore itu Raka, Salsa, dan Bima membantu Dokter Hana, dokter hewan, di ruang pakan.";
const SUARA_R2 = "Dokter Hana punya timbangan kodok tua dengan lima bandul logam.";
const SUARA_R3 = "Bandulnya setengah ons, satu ons, dua ons, setengah kilogram, dan satu kilogram.";

export const ADEGAN_RUANG_PAKAN: AdeganStory = {
  id: "ruang-pakan",
  judul: "Ruang pakan dan periksa",
  sumber: "Materi: ruang pakan Dokter Hana",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_R1,
      tambah(0, judul("Ruang Pakan Dokter Hana"), ...lantai("tn", 150)),
      tambah("Raka,", ...tokoh("rk", 34, 184, "Raka")),
      tambah("Salsa,", ...tokoh("sl", 74, 184, "Salsa")),
      tambah("Bima", ...tokoh("bm", 114, 184, "Bima")),
      tambah("Hana,", ...tokoh("dh", 224, 184, "Dokter Hana")),
      tambah("ruang", ...meja("mj", 134, 112, 70)),
      tambah("pakan.", emo("kr", 152, 110, E.karung, 22), emo("kb", 184, 110, E.keranjang, 22)),
    ),
    k(
      SUARA_R2,
      bersih(0),
      tambah(0, judul("Timbangan Kodok Tua"), ...lantai("tn", 150), ...tokoh("dh", 40, 184, "Dokter Hana")),
      tambah("timbangan", ...timbanganKodok("tk", 170, 88)),
      tambah("lima", teks("n5", 150, 66, "5 bandul", 10, W.ungu)),
      tambah("bandul", ...barisBandul("bd", 77, 32)),
    ),
    k(
      SUARA_R3,
      sorotkan("setengah", "bd0"),
      redamkan("satu", "bd0"),
      sorotkan("satu", "bd1"),
      redamkan("dua", "bd1"),
      sorotkan("dua", "bd2"),
      redamkan("setengah@2", "bd2"),
      sorotkan("setengah@2", "bd3"),
      redamkan("satu@2", "bd3"),
      sorotkan("satu@2", "bd4"),
    ),
  ],
};

/* ------------------------------ 2. Timbangan kodok ------------------------------ */
const SUARA_K1 = "Benda diletakkan di satu sisi, bandul di sisi lain sampai timbangan seimbang.";
const SUARA_K2 = "Berat benda sama dengan jumlah berat bandul.";
const SUARA_K3 = "Satu ons sama dengan seratus gram, dan satu kilogram sama dengan sepuluh ons.";

export const ADEGAN_KODOK: AdeganStory = {
  id: "kodok",
  judul: "Timbangan kodok seimbang",
  sumber: "Materi: timbangan kodok dan bandul",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_K1,
      tambah(0, judul("Timbangan Seimbang"), ...lantai("tn", 150), ...meja("mj", 90, 122, 120), ...tokoh("dh", 36, 184, "Dokter Hana"), ...timbanganKodok("tk", 150, 64)),
      tambah("Benda", ...labu("lb", 96, 93, 11)),
      tambah("satu", teks("tl", 96, 119, "benda", 8.4, W.coklat)),
      tambah("bandul", ...bandulObj("b1", 187, 88, "1 kg")),
      tambah("lain", ...bandulObj("b2", 190, 72, "1 ons"), teks("tb", 204, 119, "bandul", 8.4, W.coklat)),
      tambah("seimbang.", emo("ok", 150, 40, E.benar, 22)),
    ),
    k(
      SUARA_K2,
      { at: 0, hapus: ["ok"] },
      tambah("benda", teks("t1", 64, 44, "berat benda", 9, W.coklat)),
      sorotkan("benda", "lb"),
      tambah("sama", teks("t2", 150, 44, "=", 16, W.biru)),
      tambah("jumlah", teks("t3", 236, 44, "jumlah bandul", 9, W.ungu)),
      sorotkan("bandul", "b1", "b2"),
    ),
    k(
      SUARA_K3,
      bersih(0),
      tambah(0, judul("Ons, Gram, dan Kilogram"), ...lantai("tn", 150), ...tokoh("dh", 40, 184, "Dokter Hana")),
      tambah("Satu", ...bandulObj("o1", 28, 60, "1 ons"), teks("r1", 76, 76, "1 ons", 16, W.biru, { anchor: "start" })),
      ubah("sama", { id: "r1", isi: "1 ons =" }),
      ubah("seratus", { id: "r1", isi: "1 ons = 100 g" }),
      tambah("satu@2", ...bandulObj("k1", 28, 108, "1 kg"), teks("r2", 76, 124, "1 kg", 16, W.biru, { anchor: "start" })),
      ubah("sama@2", { id: "r2", isi: "1 kg =" }),
      ubah("sepuluh", { id: "r2", isi: "1 kg = 10 ons" }),
    ),
  ],
};

/* ------------------------------ 3. Rakit bandul ------------------------------ */
const SUARA_B1 = "Dokter Hana menimbang sepotong labu, dan timbangan seimbang dengan bandul satu kilogram dan dua ons.";
const SUARA_B2 = "Satu kilogram seribu gram, dua ons dua ratus gram, jumlahnya seribu dua ratus gram.";
const SUARA_B3 = "Jadi sepotong labu itu beratnya seribu dua ratus gram, atau satu kilogram dua ratus gram.";

export const ADEGAN_RAKIT_BANDUL: AdeganStory = {
  id: "rakit-bandul",
  judul: "Merakit bandul untuk labu",
  sumber: "Materi: berat labu dari bandul",
  latar: "#FEFCE8",
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, judul("Menimbang Sepotong Labu"), ...lantai("tn", 150), ...meja("mj", 90, 122, 120), ...tokoh("dh", 36, 184, "Dokter Hana")),
      tambah("menimbang", ...timbanganKodok("tk", 150, 64)),
      tambah("labu,", ...labu("lb", 96, 93, 11)),
      tambah("satu", ...bandulObj("b1", 187, 88, "1 kg")),
      tambah("dua", ...bandulObj("b2", 190, 72, "2 ons")),
      tambah("ons.", emo("ok", 150, 40, E.benar, 22)),
    ),
    k(
      SUARA_B2,
      bersih(0),
      tambah(0, judul("Menjumlahkan Bandul"), ...lantai("tn", 150), ...tokoh("dh", 40, 184, "Dokter Hana")),
      tambah("Satu", teks("r1", 24, 58, "1 kg", 16, W.biru, { anchor: "start" }), ...bandulObj("b1", 232, 44, "1 kg")),
      ubah("seribu", { id: "r1", isi: "1 kg = 1.000 g" }),
      tambah("dua", teks("r2", 24, 98, "2 ons", 16, W.biru, { anchor: "start" }), ...bandulObj("b2", 232, 86, "2 ons")),
      ubah("ratus", { id: "r2", isi: "2 ons = 200 g" }),
      tambah("jumlahnya", teks("r3", 24, 136, "1.000 + 200", 16, W.hijauTua, { anchor: "start" })),
      ubah("ratus@2", { id: "r3", isi: "1.000 + 200 = 1.200 g" }),
    ),
    k(
      SUARA_B3,
      bersih(0),
      tambah(0, judul("Berat Sepotong Labu"), ...lantai("tn", 150), ...tokoh("dh", 40, 184, "Dokter Hana")),
      tambah("labu", ...labu("lb", 62, 100, 22)),
      tambah("seribu", teks("t1", 196, 80, "1.200 g", 22, W.hijauTua)),
      tambah("atau", teks("at", 196, 106, "atau", 10, W.ungu)),
      tambah("satu", teks("t2", 196, 134, "1 kg 200 g", 20, W.biru)),
    ),
  ],
};
