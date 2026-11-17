import type { AdeganStory, Obj } from "./logika-story";
import { E, KURANG, W, deret, deretEmo, emo, ikatan, judul, kalimatK, kartu, orang, teks } from "./k1b3b-gambar";
import { bersih, k, sorotkan, tambah, ubah } from "./k1b3b-bantu";

/* Video metode global Sub-Bab B "Pindah Kereta di Stasiun Besar": pembuka dan Number Bond (Bagan Pasangan). */

export const NAMA_METODE = ["Number Bond", "Number Line", "Make Ten"];
export const NAMA_METODE_ID = ["Bagan Pasangan", "Garis Bilangan", "Pasangan Sepuluh"];
export const WARNA_METODE = [W.langit, W.hijauMuda, W.emas];
export const kepala = (i: number): Obj[] => kartu("hd", 6, 26, 288, 22, WARNA_METODE[i], [`${NAMA_METODE[i]} · ${NAMA_METODE_ID[i]}`], 8.8);

/* ------------------------------ 1. Pembuka ------------------------------ */
const SUARA_O1 = "Semua sudah duduk di kereta lanjutan. Abang bercerita, anak-anak di negara lain juga punya cara cepat mengurangi. Kita lihat tiga metode global.";
const SUARA_O2 = "Tiga metode itu: Number Bond, Number Line, dan Make Ten.";
const SUARA_O3 = "Nama dalam bahasa Indonesia: Bagan Pasangan, Garis Bilangan, dan Pasangan Sepuluh.";
const SUARA_O4 = "Semua metode membantu kita mengurangi dengan cepat, tanpa menghitung satu per satu.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Tiga metode global untuk mengurangi cepat",
  sumber: "Metode global: pembuka",
  latar: "#EEF2FF",
  ketukan: [
    k(
      SUARA_O1,
      tambah(0, judul("Tiga metode global"), emo("kr", 150, 96, E.kereta, 40)),
      tambah("Abang", ...orang("ab", 40, 120, E.abang, "Abang")),
      tambah("negara", emo("gl", 250, 110, "\u{1F30D}", 44)),
      tambah("tiga", ...kartu("pk", 50, 146, 200, 32, W.emas, ["3 metode global"], 11)),
    ),
    k(SUARA_O2, bersih(0), tambah(0, judul("Tiga metode")), ...NAMA_METODE.map((m, i) => tambah(["Number", "Line,", "Ten."][i], ...kartu(`m${i}`, 20, 40 + i * 48, 260, 38, WARNA_METODE[i], [`${i + 1}. ${m}`], 11)))),
    k(SUARA_O3, bersih(0), tambah(0, judul("Nama dalam bahasa Indonesia")), ...NAMA_METODE_ID.map((m, i) => tambah(["Bagan", "Garis", "Pasangan@2"][i], ...kartu(`n${i}`, 20, 40 + i * 48, 260, 38, WARNA_METODE[i], [`${i + 1}. ${m}`], 11)))),
    k(
      SUARA_O4,
      bersih(0),
      tambah(0, judul("Satu tujuan")),
      tambah("cepat,", emo("jm", 150, 84, "\u{23F0}", 40)),
      tambah("satu", ...deretEmo(E.koper, "kp", deret(5, 90, 30, 150), 20)),
      tambah("satu@2", teks("tq", 150, 186, "tanpa menghitung satu per satu", 10, W.merah)),
    ),
  ],
};

/* ------------------------------ 2. Number Bond: konsep ------------------------------ */
const SUARA_A1 = "Metode pertama, Number Bond, atau Bagan Pasangan. Lingkaran atas berisi utuh.";
const SUARA_A2 = "Dua lingkaran bawah berisi bagian. Bagian dan bagian membentuk utuh.";
const SUARA_A3 = "Kalau utuh dikurangi satu bagian, hasilnya bagian yang lain.";
const SUARA_A4 = "Jadi, satu bagan memberi dua kalimat pengurangan.";

export const ADEGAN_LUAR_BAGAN: AdeganStory = {
  id: "luar-bagan",
  judul: "Number Bond: bagan pasangan",
  sumber: "Metode global: Number Bond",
  latar: "#EFF6FF",
  ketukan: [
    k(SUARA_A1, tambah("pertama,", ...kepala(0)), tambah("Lingkaran", ...ikatan("ik", 150, 80, "utuh", "?", "?")), sorotkan("utuh.", "ik-u")),
    k(SUARA_A2, ubah("bagian.", { id: "ik-ta", isi: "bagian", u: 10, warna: W.biru }, { id: "ik-tb", isi: "bagian", u: 10, warna: W.biru }), sorotkan("membentuk", "ik-a", "ik-b")),
    k(SUARA_A3, tambah("dikurangi", ...kartu("rm", 30, 160, 240, 26, W.emas, [`utuh ${KURANG} bagian = bagian lain`], 10))),
    k(SUARA_A4, tambah("dua", teks("dk", 150, 196, "satu bagan, dua kalimat", 10, W.ungu))),
  ],
};

/* ------------------------------ 3. Number Bond: terapan ------------------------------ */
const SUARA_B1 = "Di gerbong ada sembilan karcis. Enam karcis sudah diperiksa kondektur.";
const SUARA_B2 = "Buat bagan: sembilan di atas, enam di satu bagian. Bagian yang lain belum diketahui.";
const SUARA_B3 = "Sembilan dikurangi enam sama dengan tiga. Jadi tiga karcis belum diperiksa.";
const SUARA_B4 = "Kalimat kedua dari bagan yang sama: sembilan dikurangi tiga sama dengan enam.";
const KARCIS = deret(9, 30, 30, 70);

export const ADEGAN_LUAR_BAGAN_TERAPAN: AdeganStory = {
  id: "luar-bagan-terapan",
  judul: "Number Bond: karcis di gerbong",
  sumber: "Metode global: Number Bond, terapan",
  latar: "#EFF6FF",
  ketukan: [
    k(SUARA_B1, tambah(0, ...kepala(0)), tambah("sembilan", ...deretEmo(E.karcis, "kc", KARCIS, 20)), ubah("diperiksa", ...[0, 1, 2, 3, 4, 5].map((i) => ({ id: `kc${i}`, sorot: true }))), tambah("kondektur.", ...orang("kd", 150, 150, E.kondektur, "kondektur"))),
    k(SUARA_B2, bersih(0), tambah(0, ...kepala(0)), tambah("bagan:", ...ikatan("ik", 150, 74, "9", "6", "?")), sorotkan("enam", "ik-a"), sorotkan("diketahui.", "ik-tb")),
    k(SUARA_B3, tambah("dikurangi", ...kalimatK("kl", 150, 160, ["9", KURANG, "6", "=", "3"], 18, 26)), ubah("tiga.", { id: "ik-tb", isi: "3", warna: W.biru, sorot: false })),
    k(SUARA_B4, tambah("kedua", ...kalimatK("k2", 150, 190, ["9", KURANG, "3", "=", "6"], 18, 26))),
  ],
};
