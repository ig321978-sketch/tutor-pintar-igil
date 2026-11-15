import type { AdeganStory } from "./logika-story";
import { W, barisKata, buatTb, emo, judul, kartu, teks } from "./k3b1A-gambar";
import { bersih, hapus, idPilihan, idx, k, pilihBaris, redamkan, sorotkan, tambah } from "./k3b1A-bantu";
import { kepala } from "./k3b1A-luar-1";

const cap = (isi: string) => teks("cp", 150, 198, isi, 10.5, W.merah);

/* ------------------------------ 4. Tabel Nilai Tempat: konsep ------------------------------ */
const TB = buatTb(56, 16, 32, 20);
const SUARA_T1 = "Metode kedua bernama Tabel Nilai Tempat. Tabel membagi bilangan menjadi tiga tempat.";
const SUARA_T2 = "Kita isi tabel dengan bilangan empat ratus delapan puluh dua. Tiap angka masuk ke tempatnya.";
const SUARA_T3 = "Empat di ratusan bernilai empat ratus. Delapan di puluhan bernilai delapan puluh. Dua di satuan bernilai dua.";
const SUARA_T4 = "Jadi bilangan ini dibaca empat ratus delapan puluh dua.";
const SUARA_T5 = "Itulah Tabel Nilai Tempat. Setiap angka punya tempat dan nilainya sendiri.";

export const ADEGAN_LUAR_TABEL: AdeganStory = {
  id: "luar-tabel",
  judul: "Tabel Nilai Tempat: angka pada tempatnya",
  sumber: "Metode luar: Tabel Nilai Tempat",
  latar: "#EFF6FF",
  ketukan: [
    k(SUARA_T1, tambah(0, ...kepala(1)), tambah(idx(SUARA_T1, "tiga"), emo("tp", 150, 120, "\u{1F4CB}", 44))),
    k(
      SUARA_T2,
      hapus(0, "tp"),
      tambah(idx(SUARA_T2, "tabel"), ...TB.kerangka()),
      tambah(idx(SUARA_T2, "empat"), TB.angka(0, 4)),
      tambah(idx(SUARA_T2, "delapan"), TB.angka(1, 8)),
      tambah(idx(SUARA_T2, "dua."), TB.angka(2, 2), TB.bil(482)),
    ),
    k(
      SUARA_T3,
      tambah(idx(SUARA_T3, "ratus."), TB.nilai(0, 400)),
      tambah(idx(SUARA_T3, "puluh."), TB.nilai(1, 80)),
      tambah(idx(SUARA_T3, "dua", 2), TB.nilai(2, 2)),
    ),
    k(SUARA_T4, tambah(idx(SUARA_T4, "empat"), ...TB.kata("empat ratus delapan puluh dua"))),
    k(SUARA_T5, bersih(0), tambah(0, judul("Angka punya tempat"), emo("tw", 150, 76, "\u{1F4CB}", 44)), tambah(idx(SUARA_T5, "Setiap"), ...kartu("tz", 30, 100, 240, 34, W.emas, ["tiap angka punya tempatnya"], 11)), tambah(idx(SUARA_T5, "nilainya"), emo("tk", 150, 164, "✅", 30))),
  ],
};

/* ------------------------------ 5. Tabel Nilai Tempat: terapan ------------------------------ */
const TBK = buatTb(54, 14, 24, 16);
const SUARA_U1 = "Terapkan pada soal ini. Wei mengisi tabel dengan angka enam, satu, dan delapan.";
const SUARA_U2 = "Bagaimana membaca bilangan di tabel ini? Ketuk jawaban yang tepat.";
const SUARA_U3 = "Betul! Enam ratus delapan belas. Angka satu dan angka delapan di dua tempat terakhir dibaca delapan belas.";
const SUARA_U4 = "Dengan tabel, setiap angka duduk di tempat yang benar.";

export const ADEGAN_LUAR_TABEL_TERAPAN: AdeganStory = {
  id: "luar-tabel-terapan",
  judul: "Tabel Nilai Tempat: tabel Wei",
  sumber: "Metode luar: Tabel Nilai Tempat",
  latar: "#DBEAFE",
  ketukan: [
    k(
      SUARA_U1,
      tambah(0, ...kepala(1), ...TBK.kerangka()),
      tambah(idx(SUARA_U1, "enam,"), TBK.angka(0, 6)),
      tambah(idx(SUARA_U1, "satu,"), TBK.angka(1, 1)),
      tambah(idx(SUARA_U1, "delapan."), TBK.angka(2, 8)),
    ),
    k(
      SUARA_U2,
      tambah(idx(SUARA_U2, "Bagaimana"), teks("tanya", 150, 108, "bagaimana membaca 618?", 11, W.ungu)),
      tambah(idx(SUARA_U2, "jawaban"), ...pilihBaris(114, ["enam ratus delapan puluh satu", "enam ratus delapan belas", "enam ratus delapan"], 10.5)),
    ),
    k(SUARA_U3, sorotkan(idx(SUARA_U3, "Betul!"), "c2-k"), tambah(idx(SUARA_U3, "Enam"), cap("600 + 18 = 618"))),
    k(SUARA_U4, redamkan(0, "c2-k"), hapus(0, "tanya", "cp", ...idPilihan(3)), tambah(idx(SUARA_U4, "setiap"), ...kartu("tt", 30, 118, 240, 34, W.emas, ["tiap angka di tempatnya"], 11))),
  ],
};

/* ------------------------------ 6. Nama Bilangan: konsep ------------------------------ */
const SUARA_N1 = "Metode ketiga bernama Nama Bilangan. Metode ini melatih cara menyebut bilangan dengan benar.";
const SUARA_N2 = "Kita pecah bilangan tiga ratus empat puluh lima menjadi tiga bagian. Ratusannya tiga ratus, puluhannya empat puluh, satuannya lima.";
const SUARA_N3 = "Sekarang sebut berurutan dari ratusan, yaitu tiga ratus empat puluh lima.";
const SUARA_N4 = "Perhatikan kata istimewa. Satu ratusan dibaca seratus, bukan satu ratus. Contohnya seratus lima belas.";
const SUARA_N5 = "Itulah Nama Bilangan. Sebut ratusan lebih dulu, lalu puluhan, lalu satuan.";

export const ADEGAN_LUAR_NAMA: AdeganStory = {
  id: "luar-nama",
  judul: "Nama Bilangan: sebut dari ratusan",
  sumber: "Metode luar: Nama Bilangan",
  latar: "#FDF2F8",
  ketukan: [
    k(SUARA_N1, tambah(0, ...kepala(2)), tambah(idx(SUARA_N1, "menyebut"), emo("nb0", 150, 120, "\u{1F4AC}", 44))),
    k(
      SUARA_N2,
      hapus(0, "nb0"),
      tambah(idx(SUARA_N2, "Ratusannya"), ...barisKata(0, "", 300, "tiga ratus", 54, 26)),
      tambah(idx(SUARA_N2, "puluhannya"), ...barisKata(1, "", 40, "empat puluh", 54, 26)),
      tambah(idx(SUARA_N2, "satuannya"), ...barisKata(2, "", 5, "lima", 54, 26)),
    ),
    k(SUARA_N3, tambah(idx(SUARA_N3, "Sekarang"), teks("nb", 150, 192, "345", 15, W.merah)), tambah(idx(SUARA_N3, "tiga"), ...kartu("nm", 20, 134, 260, 26, W.emas, ["tiga ratus empat puluh lima"], 10.5))),
    k(
      SUARA_N4,
      bersih(0),
      tambah(0, ...kepala(2)),
      tambah(idx(SUARA_N4, "seratus,"), ...barisKata(0, "", 100, "seratus", 54, 26)),
      tambah(idx(SUARA_N4, "Contohnya"), ...barisKata(1, "", 115, "seratus lima belas", 54, 26)),
    ),
    k(SUARA_N5, tambah(idx(SUARA_N5, "Itulah"), ...kartu("nz", 30, 126, 240, 34, W.emas, ["ratusan, puluhan, satuan"], 11)), tambah(idx(SUARA_N5, "satuan."), emo("nk", 150, 184, "✅", 26))),
  ],
};

/* ------------------------------ 7. Nama Bilangan: terapan ------------------------------ */
const SUARA_M1 = "Terapkan pada soal ini. Upe melihat bilangan enam ratus tiga belas di layar.";
const SUARA_M2 = "Bagaimana menyebut bilangan ini? Ketuk jawaban yang tepat.";
const SUARA_M3 = "Betul! Enam ratus tiga belas. Tiga belas punya nama sendiri.";
const SUARA_M4 = "Ingat, sebut ratusannya dahulu, lalu sambung dengan dua angka terakhir.";

export const ADEGAN_LUAR_NAMA_TERAPAN: AdeganStory = {
  id: "luar-nama-terapan",
  judul: "Nama Bilangan: bilangan Upe",
  sumber: "Metode luar: Nama Bilangan",
  latar: "#FCE7F3",
  ketukan: [
    k(SUARA_M1, tambah(0, ...kepala(2)), tambah(idx(SUARA_M1, "bilangan"), teks("bn", 150, 90, "613", 34, W.merah))),
    k(SUARA_M2, tambah(idx(SUARA_M2, "Bagaimana"), teks("tanya", 150, 108, "bagaimana menyebut 613?", 11, W.ungu)), tambah(idx(SUARA_M2, "jawaban"), ...pilihBaris(114, ["enam ratus tiga puluh", "enam ratus tiga belas", "enam puluh tiga"], 11))),
    k(SUARA_M3, sorotkan(idx(SUARA_M3, "Betul!"), "c2-k"), tambah(idx(SUARA_M3, "Tiga"), cap("600 + 13 = 613"))),
    k(SUARA_M4, redamkan(0, "c2-k"), hapus(0, "tanya", "cp", ...idPilihan(3)), tambah(idx(SUARA_M4, "sebut"), ...kartu("nu", 30, 130, 240, 40, W.emas, ["sebut ratusan dahulu", "lalu dua angka terakhir"], 10.5))),
  ],
};

