import type { AdeganStory, Obj } from "./logika-story";
import { OWL, W, emo, judul, kartu, kotakBagianUtuh, nilaiPW, teks } from "./k2b2C-gambar";
import { bersih, idx, k, pilihKata, redamkan, sorotkan, tambah, ubah } from "./k2b2C-bantu";

export const NAMA_METODE_ID = ["Cerita Bagian–Utuh", "Model Batang Cerita", "Pilih Operasi"];
export const WARNA_METODE = [W.hijauMuda, W.langit, W.pink];

/** Kepala metode: kartu nama di bagian atas adegan konsep dan penerapan. */
export const kepala = (i: number): Obj[] => kartu("hd", 6, 26, 288, 22, WARNA_METODE[i], [`Metode ${i + 1}: ${NAMA_METODE_ID[i]}`], 8.8);
const ex = (isi: string, id = "ex", x = 245, y = 82, u = 14): Obj => teks(id, x, y, isi, u, W.merah);

/* ------------------------------ 1. Pembuka metode luar ------------------------------ */
const SUARA_O1 = "Guru di banyak negara memakai cara lain untuk menyelesaikan soal cerita. Di video ini kita lihat tiga metode dari luar.";
const SUARA_O2 = "Cara pertama bernama Cerita Bagian–Utuh. Cara kedua bernama Model Batang Cerita. Cara ketiga bernama Pilih Operasi.";
const SUARA_O3 = "Semua cara ini menjawab satu pertanyaan. Soal cerita ini kita tambah atau kita kurangi?";
const SUARA_O4 = "Kita memakai gambar di layar. Kamu cukup mengamati dengan teliti, lalu memilih jawabannya.";
const SUARA_O5 = "Semua contoh memakai bilangan sampai dua puluh. Siap? Ayo kita mulai dengan cara pertama.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Tiga metode dari luar untuk soal cerita",
  sumber: "Metode luar: pembuka",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_O1, tambah(0, judul("Tiga metode dari luar")), tambah("negara", emo("gl", 150, 110, "\u{1F30D}", 50)), tambah("tiga", ...kartu("pk", 50, 140, 200, 32, W.emas, ["tiga cara lain"], 11))),
    k(
      SUARA_O2,
      bersih(0),
      tambah(0, judul("Tiga metode")),
      tambah(idx(SUARA_O2, "pertama"), ...kartu("m0", 20, 40, 260, 38, WARNA_METODE[0], [`1. ${NAMA_METODE_ID[0]}`], 11)),
      tambah(idx(SUARA_O2, "kedua"), ...kartu("m1", 20, 88, 260, 38, WARNA_METODE[1], [`2. ${NAMA_METODE_ID[1]}`], 11)),
      tambah(idx(SUARA_O2, "ketiga"), ...kartu("m2", 20, 136, 260, 38, WARNA_METODE[2], [`3. ${NAMA_METODE_ID[2]}`], 11)),
    ),
    k(
      SUARA_O3,
      bersih(0),
      tambah(0, judul("Satu pertanyaan")),
      tambah("satu", emo("i1", 60, 84, "➕", 34), emo("i2", 150, 84, "❓", 34), emo("i3", 240, 84, "➖", 34)),
      tambah("Soal", ...kartu("iq", 20, 112, 260, 52, W.emas, ["tambah atau kurang?"], 14)),
    ),
    k(SUARA_O4, bersih(0), tambah(0, judul("Lihat dan pilih")), tambah("gambar", emo("la", 150, 100, "\u{1F4F1}", 50)), tambah("memilih", ...kartu("pl", 40, 130, 220, 34, W.hijauMuda, ["amati, lalu pilih jawabannya"], 10))),
    k(SUARA_O5, bersih(0), tambah(0, judul("Ayo mulai!")), tambah("dua", ...kartu("sb", 40, 60, 220, 40, W.krem, ["bilangan sampai 20"], 12)), tambah("Siap?", emo("ow", 150, 150, OWL, 40))),
  ],
};

/* ------------------------------ 2. Cerita Bagian–Utuh: konsep ------------------------------ */
const SUARA_P1 = "Cara pertama, Cerita Bagian–Utuh. Setiap cerita punya dua bagian dan satu utuh.";
const SUARA_P2 = "Kira punya delapan kue cokelat dan lima kue stroberi. Dua jenis kue itu adalah dua bagian.";
const SUARA_P3 = "Semua kue adalah utuh. Utuh dicari dengan menjumlahkan kedua bagian.";
const SUARA_P4 = "Delapan ditambah lima sama dengan tiga belas. Jadi utuhnya tiga belas.";
const SUARA_P5 = "Kita periksa. Tiga belas dikurangi lima sama dengan delapan. Hasilnya cocok.";

export const ADEGAN_LUAR_BAGIAN: AdeganStory = {
  id: "luar-bagian",
  judul: "Cerita Bagian–Utuh: dua bagian jadi satu utuh",
  sumber: "Metode luar: Cerita Bagian–Utuh",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_P1, tambah(0, ...kepala(0)), tambah(idx(SUARA_P1, "dua"), ...kotakBagianUtuh())),
    k(
      SUARA_P2,
      tambah(idx(SUARA_P2, "delapan"), nilaiPW("a", "8"), teks("la", 75, 184, "kue cokelat", 9, W.biru)),
      tambah(idx(SUARA_P2, "lima"), nilaiPW("b", "5"), teks("lb", 225, 184, "kue stroberi", 9, W.biru)),
    ),
    k(SUARA_P3, tambah(idx(SUARA_P3, "utuh"), nilaiPW("u", "?")), sorotkan(idx(SUARA_P3, "menjumlahkan"), "pwu-k")),
    k(SUARA_P4, redamkan(0, "pwu-k"), tambah(idx(SUARA_P4, "Delapan"), ex("8 + 5 = 13")), ubah(idx(SUARA_P4, "utuhnya"), { id: "pwu-t", isi: "13" })),
    k(SUARA_P5, ubah(idx(SUARA_P5, "Tiga"), { id: "ex", isi: "13 − 5 = 8" }), tambah(idx(SUARA_P5, "cocok"), emo("ok", 262, 112, "✅", 18))),
  ],
};

/* ------------------------------ 3. Cerita Bagian–Utuh: penerapan ------------------------------ */
const SUARA_Q1 = "Ayo coba. Upe punya lima belas kue. Enam kue di antaranya rasa keju. Berapa kue yang bukan rasa keju?";
const SUARA_Q2 = "Utuhnya lima belas. Satu bagian sudah diketahui, yaitu enam. Bagian yang lain belum diketahui.";
const SUARA_Q3 = "Untuk mencari bagian, kita kurangi utuh dengan bagian yang diketahui. Pilih jawabannya.";
const SUARA_Q4 = "Lima belas dikurangi enam sama dengan sembilan. Jawabannya pilihan pertama.";
const SUARA_Q5 = "Kita periksa. Sembilan ditambah enam sama dengan lima belas. Cocok!";

export const ADEGAN_LUAR_BAGIAN_TERAPAN: AdeganStory = {
  id: "luar-bagian-terapan",
  judul: "Cerita Bagian–Utuh: mencari bagian",
  sumber: "Metode luar: Cerita Bagian–Utuh, terapan",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_Q1,
      tambah(0, ...kepala(0), ...kotakBagianUtuh()),
      tambah(idx(SUARA_Q1, "lima"), nilaiPW("u", "15")),
      tambah(idx(SUARA_Q1, "Enam"), nilaiPW("a", "6")),
      tambah(idx(SUARA_Q1, "Berapa"), nilaiPW("b", "?")),
    ),
    k(SUARA_Q2, sorotkan(idx(SUARA_Q2, "Utuhnya"), "pwu-k"), redamkan(idx(SUARA_Q2, "Satu"), "pwu-k"), sorotkan(idx(SUARA_Q2, "Satu"), "pwa-k"), redamkan(idx(SUARA_Q2, "Bagian", 2), "pwa-k"), sorotkan(idx(SUARA_Q2, "Bagian", 2), "pwb-k")),
    k(SUARA_Q3, redamkan(0, "pwb-k"), tambah(idx(SUARA_Q3, "Pilih"), ...pilihKata(170, ["9", "11", "10"], 14))),
    k(SUARA_Q4, tambah(idx(SUARA_Q4, "Lima"), ex("15 − 6 = 9")), ubah(idx(SUARA_Q4, "sembilan"), { id: "pwb-t", isi: "9" }), sorotkan(idx(SUARA_Q4, "pertama"), "c1-k", "c1-t")),
    k(SUARA_Q5, redamkan(0, "c1-k", "c1-t"), ubah(idx(SUARA_Q5, "Sembilan"), { id: "ex", isi: "9 + 6 = 15" }), tambah(idx(SUARA_Q5, "Cocok!"), emo("ok", 262, 112, "✅", 18))),
  ],
};
