import type { AdeganStory, Obj } from "./logika-story";
import { E, W, deret, deretEmo, emo, ikatan, judul, kartu, orang, panahObj, teks } from "./k1b1d-gambar";
import { bersih, k, sorotkan, tambah, ubah, urutKata } from "./k1b1d-bantu";

/* Video metode global Sub-Bab D "Pesta Rumah Rapi": pembuka dan Number Bond (Ikatan Bilangan). */

export const NAMA_METODE = ["Number Bond", "Bar Model", "Rekenrek"];
export const NAMA_METODE_ID = ["Ikatan Bilangan", "Model Batang", "Rak Manik"];
export const WARNA_METODE = [W.hijauMuda, W.langit, W.pink];
export const kepala = (i: number): Obj[] => kartu("hd", 6, 26, 288, 22, WARNA_METODE[i], [`${NAMA_METODE[i]} · ${NAMA_METODE_ID[i]}`], 8.8);

/* ------------------------------ 1. Pembuka ------------------------------ */
const SUARA_O1 = "Pesta sudah selesai. Kaka bercerita, anak-anak di negara lain juga belajar pasangan bilangan. Kita lihat tiga metode global.";
const SUARA_O2 = "Tiga metode itu: Number Bond, Bar Model, dan Rekenrek.";
const SUARA_O3 = "Nama dalam bahasa Indonesia: Ikatan Bilangan, Model Batang, dan Rak Manik.";
const SUARA_O4 = "Semua metode menjawab pertanyaan Igil: satu bilangan bisa dibagi menjadi bagian berapa saja?";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Tiga metode global untuk pasangan bilangan",
  sumber: "Metode global: pembuka",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_O1, tambah(0, judul("Tiga metode global"), emo("kd", 150, 96, E.balon, 40)), tambah("Kaka", ...orang("kk", 40, 120, E.kaka, "Kaka")), tambah("negara", emo("gl", 250, 110, "\u{1F30D}", 44)), tambah("tiga", ...kartu("pk", 50, 146, 200, 32, W.emas, ["3 metode global"], 11))),
    k(SUARA_O2, bersih(0), tambah(0, judul("Tiga metode")), ...NAMA_METODE.map((m, i) => tambah(["Bond,", "Model,", "Rekenrek."][i], ...kartu(`m${i}`, 20, 40 + i * 48, 260, 38, WARNA_METODE[i], [`${i + 1}. ${m}`], 11)))),
    k(SUARA_O3, bersih(0), tambah(0, judul("Nama dalam bahasa Indonesia")), ...NAMA_METODE_ID.map((m, i) => tambah(["Ikatan", "Batang,", "Manik."][i], ...kartu(`n${i}`, 20, 40 + i * 48, 260, 38, WARNA_METODE[i], [`${i + 1}. ${m}`], 11)))),
    k(SUARA_O4, bersih(0), tambah(0, judul("Satu pertanyaan"), emo("i2", 150, 80, E.igil, 40)), tambah("dibagi", ...ikatan("q", 150, 104, "?", "?", "?", 50, 15))),
  ],
};

/* ------------------------------ 2. Number Bond: konsep ------------------------------ */
const SUARA_N1 = "Metode pertama, Number Bond, atau Ikatan Bilangan. Lingkaran atas adalah utuh, dua lingkaran bawah adalah bagian.";
const SUARA_N2 = "Garis lurus menghubungkan lingkaran utuh dengan kedua bagiannya.";
const SUARA_N3 = "Kalau satu bagian belum diketahui, kita cari dari utuh dan bagian lainnya.";
const SUARA_N4 = "Ikatan bilangan menunjukkan memisah dan menggabung sekaligus.";

export const ADEGAN_LUAR_IKATAN: AdeganStory = {
  id: "luar-ikatan",
  judul: "Number Bond: ikatan bilangan",
  sumber: "Metode global: Number Bond",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_N1, tambah("pertama,", ...kepala(0)), tambah("utuh,", ...ikatan("ik", 150, 74, "utuh", "", "", 60, 20)), tambah("bagian.", teks("ba", 90, 154, "bagian", 9, W.biru), teks("bb", 210, 154, "bagian", 9, W.biru))),
    k(SUARA_N2, sorotkan("Garis", "ik-ga", "ik-gb"), tambah("bagiannya.", teks("gt", 150, 172, "utuh terikat dengan bagian", 9, W.ungu))),
    k(SUARA_N3, ubah("bagian", { id: "ik-ta", isi: "?", warna: W.merah }), ubah("utuh", { id: "ik-tb", isi: "bagian", u: 9 }), sorotkan("cari", "ik-a")),
    k(SUARA_N4, tambah("memisah", panahObj("p1", 120, 96, -20, 24, W.hijau)), tambah("menggabung", panahObj("p2", 190, 120, -20, -24, W.merah)), tambah("sekaligus.", emo("ok", 150, 196, "\u{2705}", 20))),
  ],
};

/* ------------------------------ 3. Number Bond: terapan ------------------------------ */
const SUARA_T1 = "Di dapur masih ada delapan kue untuk dibawa pulang tamu.";
const SUARA_T2 = "Lima kue untuk tamu dari meja dalam. Sisanya untuk tamu dari meja teras.";
const SUARA_T3 = "Hitung lanjut dari lima sampai delapan: enam, tujuh, delapan. Jadi tiga kue.";
const SUARA_T4 = "Ikatan bilangannya: utuh delapan, bagiannya lima dan tiga.";
const KUE = deret(8, 40, 30, 74);
const posT3 = urutKata(SUARA_T3, ["enam,", "tujuh,", "delapan."], "delapan:");

export const ADEGAN_LUAR_IKATAN_TERAPAN: AdeganStory = {
  id: "luar-ikatan-terapan",
  judul: "Number Bond: delapan kue",
  sumber: "Metode global: Number Bond, terapan",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_T1, tambah(0, ...kepala(0)), tambah("delapan", ...deretEmo(E.kue, "ku", KUE, 22))),
    k(SUARA_T2, tambah("Lima", ...ikatan("ik", 150, 110, "8", "5", "?", 60)), sorotkan("Lima", "ku0", "ku1", "ku2", "ku3", "ku4")),
    k(SUARA_T3, ...posT3.map((p, i) => tambah(p, teks(`hn${i}`, KUE[5 + i].x, 52, String(6 + i), 11, W.merah))), ubah("tiga", { id: "ik-tb", isi: "3", warna: W.biru })),
    k(SUARA_T4, sorotkan("utuh", "ik-u"), sorotkan("bagiannya", "ik-a", "ik-b")),
  ],
};
