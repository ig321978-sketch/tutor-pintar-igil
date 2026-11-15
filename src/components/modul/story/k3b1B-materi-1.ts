import type { AdeganStory } from "./logika-story";
import { W, blok, idBlok, judul, kartu, papan, teks } from "./k3b1B-gambar";
import { idx, k, redamkan, sorotkan, tambah } from "./k3b1B-bantu";

/* ------------------------------ 1. Tiga tempat pada papan ------------------------------ */
const PA = papan("pa", "472");
const SUARA_A1 = "Hari ini kita belajar nilai tempat. Bilangan tiga angka punya tiga tempat.";
const SUARA_A2 = "Tempat pertama, di sebelah kiri, bernama ratusan. Warnanya hijau.";
const SUARA_A3 = "Tempat di tengah bernama puluhan, warnanya biru. Tempat di sebelah kanan bernama satuan, warnanya merah.";
const SUARA_A4 = "Sekarang Upe meletakkan satu bilangan di papan. Bilangan empat ratus tujuh puluh dua.";
const SUARA_A5 = "Angka empat berada di ratusan. Angka tujuh berada di puluhan. Angka dua berada di satuan.";
const SUARA_A6 = "Jadi setiap angka punya tempat sendiri. Tempat itu menentukan nilai angka.";

export const ADEGAN_TIGA_TEMPAT: AdeganStory = {
  id: "tiga-tempat",
  judul: "Tiga tempat pada papan",
  sumber: "Materi: tiga tempat pada papan",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_A1, tambah(0, judul("Tiga tempat")), tambah("tiga@2", PA.kolom(0), PA.kolom(1), PA.kolom(2))),
    k(SUARA_A2, tambah("ratusan.", PA.kepala(0))),
    k(SUARA_A3, tambah("puluhan,", PA.kepala(1)), tambah("satuan,", PA.kepala(2))),
    k(SUARA_A4, tambah(idx(SUARA_A4, "empat"), PA.digit(0)), tambah(idx(SUARA_A4, "tujuh"), PA.digit(1)), tambah(idx(SUARA_A4, "dua"), PA.digit(2))),
    k(SUARA_A5, sorotkan("empat", "pa_d0"), redamkan("tujuh", "pa_d0"), sorotkan("tujuh", "pa_d1"), redamkan("dua", "pa_d1"), sorotkan("dua", "pa_d2")),
    k(SUARA_A6, redamkan(0, "pa_d2"), tambah("menentukan", ...kartu("tn", 30, 130, 240, 34, W.emas, ["tempat menentukan nilai"], 11))),
  ],
};

/* ------------------------------ 2. Nilai tiap angka pada 251 ------------------------------ */
const PB = papan("pb", "251", { nilaiY: 122 });
const SUARA_B1 = "Sekarang kita baca bilangan ini. Dua ratus lima puluh satu.";
const SUARA_B2 = "Angka dua ada di ratusan, jadi nilainya dua ratus.";
const SUARA_B3 = "Angka lima ada di puluhan, jadi nilainya lima puluh.";
const SUARA_B4 = "Angka satu ada di satuan, jadi nilainya satu.";
const SUARA_B5 = "Jadi dua ratus, lima puluh, dan satu membentuk bilangan itu. Nilai tiap angka bergantung pada tempatnya.";

export const ADEGAN_NILAI_251: AdeganStory = {
  id: "nilai-251",
  judul: "Nilai tiap angka pada dua ratus lima puluh satu",
  sumber: "Materi: nilai tiap angka",
  latar: "#FFFBEB",
  ketukan: [
    k(SUARA_B1, tambah(0, judul("Membaca bilangan"), ...PB.dasar), tambah("Dua", PB.digit(0)), tambah("lima", PB.digit(1)), tambah("satu.", PB.digit(2))),
    k(SUARA_B2, sorotkan("Angka", "pb_d0"), tambah("nilainya", PB.nilai(0))),
    k(SUARA_B3, redamkan(0, "pb_d0"), sorotkan("Angka", "pb_d1"), tambah("nilainya", PB.nilai(1))),
    k(SUARA_B4, redamkan(0, "pb_d1"), sorotkan("Angka", "pb_d2"), tambah("nilainya", PB.nilai(2))),
    k(SUARA_B5, redamkan(0, "pb_d2"), tambah("membentuk", PB.utuh(160, 22)), tambah("bergantung", ...kartu("bt", 40, 172, 220, 24, W.emas, ["nilai bergantung pada tempat"], 10))),
  ],
};

/* ------------------------------ 3. Bilangan dilihat dengan blok ------------------------------ */
const PC = papan("pc", "251", { y0: 38, h: 40, u: 26, nilaiY: 172 });
const BLOK_C = blok(PC, 90);
const bl = (i: number) => BLOK_C.filter((o) => idBlok("pc", "251", i).includes(o.id));
const label = (id: string, x: number, isi: string) => teks(id, x, 150, isi, 8.4, W.coklat);
const SUARA_C1 = "Kita lihat bilangan itu dengan model blok. Ada dua ratusan, lima puluhan, dan satu satuan.";
const SUARA_C2 = "Di tempat ratusan ada dua blok besar. Satu blok besar bernilai seratus.";
const SUARA_C3 = "Di tempat puluhan ada lima batang. Satu batang bernilai sepuluh.";
const SUARA_C4 = "Di tempat satuan ada satu kotak kecil. Satu kotak kecil bernilai satu.";
const SUARA_C5 = "Dua blok besar jadi dua ratus. Lima batang jadi lima puluh. Satu kotak kecil jadi satu.";
const SUARA_C6 = "Semua nilai itu digabung menjadi dua ratus lima puluh satu.";

export const ADEGAN_BLOK_251: AdeganStory = {
  id: "blok-251",
  judul: "Bilangan dengan model blok",
  sumber: "Materi: model blok per tempat",
  latar: "#F0F9FF",
  ketukan: [
    k(SUARA_C1, tambah(0, judul("Bilangan dengan blok"), ...PC.dasar, PC.digit(0), PC.digit(1), PC.digit(2))),
    k(SUARA_C2, tambah("dua", ...bl(0)), tambah("seratus.", label("lb0", PC.xPusat(0), "1 blok = 100"))),
    k(SUARA_C3, tambah("lima", ...bl(1)), tambah("sepuluh.", label("lb1", PC.xPusat(1), "1 batang = 10"))),
    k(SUARA_C4, tambah(idx(SUARA_C4, "satu", 1), ...bl(2)), tambah(idx(SUARA_C4, "satu", 3), label("lb2", PC.xPusat(2), "1 kotak = 1"))),
    k(SUARA_C5, tambah("ratus.", PC.nilai(0)), tambah("puluh.", PC.nilai(1)), tambah(idx(SUARA_C5, "satu", 2), PC.nilai(2))),
    k(SUARA_C6, tambah("menjadi", PC.utuh(196, 20))),
  ],
};
