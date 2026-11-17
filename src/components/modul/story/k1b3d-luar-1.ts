import type { AdeganStory, Obj } from "./logika-story";
import { E, KURANG, W, deret, deretEmo, emo, judul, kalimatC, kartu, modelBatang, orang, teks } from "./k1b3d-gambar";
import { bersih, k, sorotkan, tambah, ubah } from "./k1b3d-bantu";

/* Video metode global Sub-Bab D "Tiba di Rumah Nenek": pembuka dan Bar Model (Model Batang). */

export const NAMA_METODE = ["Bar Model", "CUBES", "Draw a Picture"];
export const NAMA_METODE_ID = ["Model Batang", "Langkah CUBES", "Gambar Sketsa"];
export const WARNA_METODE = [W.emas, W.hijauMuda, W.langit];
export const kepala = (i: number): Obj[] => kartu("hd", 6, 26, 288, 22, WARNA_METODE[i], [`${NAMA_METODE[i]} · ${NAMA_METODE_ID[i]}`], 8.8);

/* ------------------------------ 1. Pembuka ------------------------------ */
const SUARA_O1 = "Malam itu, sepupu dari kota menunjukkan cara membaca cerita hitungan yang ia pelajari dari negara lain. Kita lihat tiga metode global.";
const SUARA_O2 = "Tiga metode itu: Bar Model, CUBES, dan Draw a Picture.";
const SUARA_O3 = "Nama dalam bahasa Indonesia: Model Batang, Langkah CUBES, dan Gambar Sketsa.";
const SUARA_O4 = "Semua metode membantu kita memahami cerita sebelum menghitung.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Tiga metode global untuk cerita hitungan",
  sumber: "Metode global: pembuka",
  latar: "#FEF9C3",
  ketukan: [
    k(
      SUARA_O1,
      tambah(0, judul("Tiga metode global"), emo("rm", 150, 96, E.rumah, 40)),
      tambah("sepupu", ...orang("sp", 40, 120, "🧒", "sepupu")),
      tambah("negara", emo("gl", 250, 110, "\u{1F30D}", 44)),
      tambah("tiga", ...kartu("pk", 50, 146, 200, 32, W.emas, ["3 metode global"], 11)),
    ),
    k(SUARA_O2, bersih(0), tambah(0, judul("Tiga metode")), ...NAMA_METODE.map((m, i) => tambah(["Bar", "CUBES,", "Draw"][i], ...kartu(`m${i}`, 20, 40 + i * 48, 260, 38, WARNA_METODE[i], [`${i + 1}. ${m}`], 11)))),
    k(SUARA_O3, bersih(0), tambah(0, judul("Nama dalam bahasa Indonesia")), ...NAMA_METODE_ID.map((m, i) => tambah(["Model", "Langkah", "Gambar"][i], ...kartu(`n${i}`, 20, 40 + i * 48, 260, 38, WARNA_METODE[i], [`${i + 1}. ${m}`], 11)))),
    k(SUARA_O4, bersih(0), tambah(0, judul("Pahami dulu")), tambah("memahami", emo("bc", 110, 96, E.baca, 40)), tambah("menghitung.", emo("ot", 190, 96, "\u{1F9E0}", 40), teks("tt", 150, 150, "pahami, lalu hitung", 12, W.ungu))),
  ],
};

/* ------------------------------ 2. Bar Model: konsep ------------------------------ */
const SUARA_A1 = "Metode pertama, Bar Model, atau Model Batang. Batang panjang menunjukkan semuanya.";
const SUARA_A2 = "Batang itu dibagi dua: bagian yang pergi dan bagian yang tersisa.";
const SUARA_A3 = "Bagian yang belum diketahui diberi tanda tanya.";
const SUARA_A4 = "Semuanya dikurangi bagian yang diketahui sama dengan bagian yang ditanya.";

export const ADEGAN_LUAR_BATANG: AdeganStory = {
  id: "luar-batang",
  judul: "Bar Model: model batang",
  sumber: "Metode global: Bar Model",
  latar: "#FFFBEB",
  ketukan: [
    k(SUARA_A1, tambah("pertama,", ...kepala(0)), tambah("Batang@2", ...modelBatang("mb", 40, 70, 220, 110, "semua", "pergi", "sisa")), sorotkan("semuanya.", "mb-u")),
    k(SUARA_A2, sorotkan("pergi", "mb-a"), sorotkan("tersisa.", "mb-b")),
    k(SUARA_A3, ubah("tanda", { id: "mb-tb", isi: "?", warna: W.merah })),
    k(SUARA_A4, tambah("dikurangi", ...kartu("rm", 30, 150, 240, 28, W.emas, [`semua ${KURANG} diketahui = ?`], 11))),
  ],
};

/* ------------------------------ 3. Bar Model: terapan ------------------------------ */
const SUARA_B1 = "Nenek menggoreng sembilan pisang. Tiga pisang dimakan Abang. Berapa pisang yang tersisa?";
const SUARA_B2 = "Gambar batang sembilan. Satu bagian tiga, bagian lain bertanda tanya.";
const SUARA_B3 = "Sembilan dikurangi tiga sama dengan enam.";
const SUARA_B4 = "Jadi, tersisa enam pisang goreng. Batangnya terisi lengkap.";
const PISANG = deret(9, 30, 30, 70);

export const ADEGAN_LUAR_BATANG_TERAPAN: AdeganStory = {
  id: "luar-batang-terapan",
  judul: "Bar Model: pisang goreng Nenek",
  sumber: "Metode global: Bar Model, terapan",
  latar: "#FFFBEB",
  ketukan: [
    k(SUARA_B1, tambah(0, ...kepala(0)), tambah("sembilan", ...deretEmo(E.pisangGoreng, "ps", PISANG, 20)), ubah("dimakan", ...[6, 7, 8].map((i) => ({ id: `ps${i}`, op: 0.3 }))), tambah("tersisa?", teks("tq", 150, 98, "berapa yang tersisa?", 10, W.merah))),
    k(SUARA_B2, bersih(0), tambah(0, ...kepala(0)), tambah("batang", ...modelBatang("mb", 40, 66, 220, 73, "9", "3", "?"))),
    k(SUARA_B3, tambah("Sembilan", ...kalimatC("kl", 150, 150, ["9", KURANG, "3", "=", "6"], 18, 26))),
    k(SUARA_B4, ubah("enam", { id: "mb-tb", isi: "6", warna: W.biru }), tambah("lengkap.", ...kartu("ok", 80, 172, 140, 22, W.hijauMuda, ["tersisa 6 pisang"], 10))),
  ],
};
