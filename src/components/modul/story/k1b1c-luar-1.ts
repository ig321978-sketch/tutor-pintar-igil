import type { AdeganStory, Obj } from "./logika-story";
import { E, W, emo, jalur, judul, kartu, kotak, orang, panahObj, tengahPetak, teks } from "./k1b1c-materi-gambar";
import { bersih, k, sorotkan, tambah, ubah } from "./k1b1c-bantu";

/* Video metode global Sub-Bab C "Tangga Gudang Loteng": pembuka dan Number Track (Jalur Angka). */

export const NAMA_METODE = ["Number Track", "Counting On", "Counting Stick"];
export const NAMA_METODE_ID = ["Jalur Angka", "Hitung Lanjut", "Tongkat Hitung"];
export const WARNA_METODE = [W.hijauMuda, W.langit, W.pink];
export const kepala = (i: number): Obj[] => kartu("hd", 6, 26, 288, 22, WARNA_METODE[i], [`${NAMA_METODE[i]} · ${NAMA_METODE_ID[i]}`], 8.8);

/* ------------------------------ 1. Pembuka ------------------------------ */
const SUARA_O1 = "Gudang loteng sudah rapi. Kaka bercerita, anak-anak di negara lain juga belajar menghitung maju dan mundur. Kita lihat tiga metode global.";
const SUARA_O2 = "Tiga metode itu: Number Track, Counting On, dan Counting Stick.";
const SUARA_O3 = "Nama dalam bahasa Indonesia: Jalur Angka, Hitung Lanjut, dan Tongkat Hitung.";
const SUARA_O4 = "Semua metode menjawab pertanyaan Igil: angka berapa sesudahnya, dan angka berapa sebelumnya?";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Tiga metode global untuk maju dan mundur",
  sumber: "Metode global: pembuka",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_O1, tambah(0, judul("Tiga metode global"), emo("kd", 150, 96, E.kardus, 40)), tambah("Kaka", ...orang("kk", 40, 120, E.kaka, "Kaka")), tambah("negara", emo("gl", 250, 110, "\u{1F30D}", 44)), tambah("tiga", ...kartu("pk", 50, 146, 200, 32, W.emas, ["3 metode global"], 11))),
    k(SUARA_O2, bersih(0), tambah(0, judul("Tiga metode")), ...NAMA_METODE.map((m, i) => tambah(["Track,", "On,", "Stick."][i], ...kartu(`m${i}`, 20, 40 + i * 48, 260, 38, WARNA_METODE[i], [`${i + 1}. ${m}`], 11)))),
    k(SUARA_O3, bersih(0), tambah(0, judul("Nama dalam bahasa Indonesia")), ...NAMA_METODE_ID.map((m, i) => tambah(["Jalur", "Lanjut,", "Tongkat"][i], ...kartu(`n${i}`, 20, 40 + i * 48, 260, 38, WARNA_METODE[i], [`${i + 1}. ${m}`], 11)))),
    k(SUARA_O4, bersih(0), tambah(0, judul("Satu pertanyaan"), emo("i2", 150, 90, E.igil, 40)), tambah("sesudahnya,", ...kartu("q1", 156, 120, 130, 34, W.hijauMuda, ["sesudahnya?"], 10)), tambah("sebelumnya?", ...kartu("q2", 14, 120, 130, 34, W.merahMuda, ["sebelumnya?"], 10))),
  ],
};

/* ------------------------------ 2. Number Track: konsep ------------------------------ */
const SUARA_J1 = "Metode pertama, Number Track, atau Jalur Angka. Petak bernomor satu sampai sepuluh berjajar seperti jalan.";
const SUARA_J2 = "Maju berarti pindah ke petak sesudahnya. Mundur berarti pindah ke petak sebelumnya.";
const SUARA_J3 = "Setiap petak punya tetangga di kiri dan tetangga di kanan.";
const SUARA_J4 = "Jadi jalur angka membantu kita melihat angka sebelum dan sesudah.";
const JX = 20;
const JY = 96;

export const ADEGAN_LUAR_JALUR: AdeganStory = {
  id: "luar-jalur",
  judul: "Number Track: jalur angka",
  sumber: "Metode global: Number Track",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_J1, tambah("pertama,", ...kepala(0)), tambah("Petak", ...jalur("jp", JX, JY))),
    k(SUARA_J2, tambah("Maju", panahObj("pm", 160, 84, 60, 0, W.hijau), teks("pmt", 190, 76, "maju", 9, W.hijau)), tambah("Mundur", panahObj("pd", 140, 84, -60, 0, W.merah), teks("pdt", 110, 76, "mundur", 9, W.merah))),
    k(SUARA_J3, sorotkan("tetangga", "jp3"), sorotkan("kiri", "jp4"), sorotkan("kanan.", "jp5"), tambah("Setiap", teks("t5", tengahPetak(JX, JY, 4).x, 140, "tetangga 5: 4 dan 6", 9, W.ungu))),
    k(SUARA_J4, tambah("sebelum", ...kartu("js", 30, 156, 110, 24, W.merahMuda, ["sebelum"], 9.4)), tambah("sesudah.", ...kartu("ju", 160, 156, 110, 24, W.hijauMuda, ["sesudah"], 9.4))),
  ],
};

/* ------------------------------ 3. Number Track: terapan ------------------------------ */
const SUARA_P1 = "Kardus Igil berdiri di petak nomor empat.";
const SUARA_P2 = "Maju satu petak, kardus sampai di lima. Lima adalah angka sesudah empat.";
const SUARA_P3 = "Kembali ke empat, lalu mundur satu petak, kardus sampai di tiga. Tiga adalah angka sebelum empat.";
const SUARA_P4 = "Jadi sebelum empat adalah tiga, dan sesudah empat adalah lima.";
const atas = (i: number) => ({ x: tengahPetak(JX, JY, i).x, y: JY - 6 });

export const ADEGAN_LUAR_JALUR_TERAPAN: AdeganStory = {
  id: "luar-jalur-terapan",
  judul: "Number Track: kardus di jalur angka",
  sumber: "Metode global: Number Track, terapan",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_P1, tambah(0, ...kepala(0), ...jalur("jp", JX, JY)), tambah("Kardus", emo("kd", atas(3).x, atas(3).y, E.kardus, 20)), sorotkan("empat.", "jp3")),
    k(SUARA_P2, ubah("Maju", { id: "kd", x: atas(4).x }), sorotkan("lima.", "jp4"), tambah("sesudah", teks("su", atas(4).x, 140, "sesudah", 9, W.hijau))),
    k(SUARA_P3, ubah("Kembali", { id: "kd", x: atas(3).x }), ubah("mundur", { id: "kd", x: atas(2).x }), sorotkan("tiga.", "jp2"), tambah("sebelum", teks("sb", atas(2).x, 156, "sebelum", 9, W.merah))),
    k(SUARA_P4, tambah("Jadi", ...kartu("jj", 40, 166, 220, 24, W.emas, ["3, lalu 4, lalu 5"], 10)), tambah("empat", kotak("fk", JX + 3 * 26 - 2, JY - 2, 30, 30, "#FFFFFF00", W.merah, { tebal: 2.5, rx: 4 }))),
  ],
};
