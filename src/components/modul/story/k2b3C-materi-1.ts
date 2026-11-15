import type { AdeganStory, Obj } from "./logika-story";
import { SISI_DATAR, W, bangunDatar, cocok, emo, judul, kartu, pojokDatar, ruang, teks, tidakCocok, OWL } from "./k2b3C-gambar";
import { bersih, hapus, idx, k, redamkan, sorotkan, tambah, ubah } from "./k2b3C-bantu";

/* ------------------------------ 1. Benda di layar ------------------------------ */
const SUARA_B1 = "Lihat layar. Ada topi ulang tahun, dadu, kaleng, dan bola.";
const SUARA_B2 = "Ada juga bentuk yang tipis. Ada segitiga, segi empat, dan lingkaran.";
const SUARA_B3 = "Bentuk yang tipis kita sebut bangun datar. Benda yang punya ruang kita sebut bangun ruang.";
const SUARA_B4 = "Hari ini kita belajar membedakan bangun datar dan bangun ruang. Kita juga mengenal nama-namanya.";

export const ADEGAN_BENDA_LAYAR: AdeganStory = {
  id: "benda-layar",
  judul: "Benda dan bentuk di layar",
  sumber: "Materi: bangun datar dan bangun ruang",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, judul("Bentuk benda")),
      tambah(idx(SUARA_B1, "topi"), ...ruang("kerucut", "kra", 45, 72, 26), teks("ob-kr", 45, 108, "topi", 9)),
      tambah(idx(SUARA_B1, "dadu"), ...ruang("kubus", "kba", 115, 72, 26), teks("ob-kb", 115, 108, "dadu", 9)),
      tambah(idx(SUARA_B1, "kaleng"), ...ruang("tabung", "tba", 185, 72, 26), teks("ob-tb", 185, 108, "kaleng", 9)),
      tambah(idx(SUARA_B1, "bola"), ...ruang("bola", "boa", 255, 72, 26), teks("ob-bo", 255, 108, "bola", 9)),
    ),
    k(
      SUARA_B2,
      tambah(idx(SUARA_B2, "tipis"), teks("rh-d", 150, 138, "bentuk yang tipis", 10, W.merah)),
      tambah(idx(SUARA_B2, "segitiga"), ...bangunDatar("segitiga", "a", 80, 166, 14, W.krem), teks("dta-nm", 80, 196, "segitiga", 9)),
      tambah(idx(SUARA_B2, "segi"), ...bangunDatar("segiempat", "b", 150, 166, 14, W.krem), teks("dtb-nm", 150, 196, "segi empat", 9)),
      tambah(idx(SUARA_B2, "lingkaran"), ...bangunDatar("lingkaran", "c", 220, 166, 14, W.krem), teks("dtc-nm", 220, 196, "lingkaran", 9)),
    ),
    k(SUARA_B3, ubah(idx(SUARA_B3, "datar"), { id: "rh-d", isi: "bangun datar", warna: W.biru }), tambah(idx(SUARA_B3, "ruang", 2), teks("lb-r", 150, 36, "bangun ruang", 11, W.hijau))),
    k(SUARA_B4, tambah(idx(SUARA_B4, "membedakan"), emo("ow", 266, 150, OWL, 30)), sorotkan(idx(SUARA_B4, "nama-namanya"), "lb-r", "rh-d")),
  ],
};

/* ------------------------------ 2. Bangun datar ------------------------------ */
const SUARA_D1 = "Sekarang kita lihat bangun datar lebih dekat. Bangun datar hanya punya satu permukaan.";
const SUARA_D2 = "Segitiga dibatasi tiga sisi lurus. Segi empat dibatasi empat sisi lurus. Lingkaran dibatasi garis lengkung.";
const SUARA_D3 = "Bangun datar itu tipis. Tidak ada ruang di dalamnya, jadi kita tidak bisa mengisinya.";
const SUARA_D4 = "Segitiga, segi empat, dan lingkaran semuanya bangun datar. Semuanya hanya punya satu permukaan.";
const SUARA_D5 = "Ingat, bangun datar tidak punya ruang di dalam dan tidak bisa diisi.";

export const ADEGAN_DATAR: AdeganStory = {
  id: "bangun-datar",
  judul: "Bangun datar: satu permukaan",
  sumber: "Materi: bangun datar",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_D1,
      tambah(0, judul("Bangun datar")),
      tambah(idx(SUARA_D1, "lebih"), ...bangunDatar("segitiga", "a", 60, 76, 24, W.langit), ...bangunDatar("segiempat", "b", 150, 76, 24, W.hijauMuda), ...bangunDatar("lingkaran", "c", 240, 76, 24, W.pink)),
      tambah(idx(SUARA_D1, "satu"), teks("sp", 150, 140, "satu permukaan", 11, W.merah)),
    ),
    k(
      SUARA_D2,
      tambah(idx(SUARA_D2, "tiga"), ...pojokDatar("segitiga", "a", 60, 76, 24), teks("dta-ln", 60, 122, `${SISI_DATAR.segitiga} sisi`, 10, W.merah)),
      tambah(idx(SUARA_D2, "empat"), ...pojokDatar("segiempat", "b", 150, 76, 24), teks("dtb-ln", 150, 122, `${SISI_DATAR.segiempat} sisi`, 10, W.merah)),
      tambah(idx(SUARA_D2, "lengkung"), teks("dtc-ln", 240, 122, "lengkung", 10, W.merah)),
    ),
    k(SUARA_D3, bersih(0), tambah(0, judul("Tidak bisa diisi")), tambah(idx(SUARA_D3, "tipis"), ...bangunDatar("segiempat", "d", 150, 80, 28, W.hijauMuda)), tambah(idx(SUARA_D3, "ruang"), teks("tp", 150, 140, "tidak ada ruang di dalam", 10, W.merah)), tambah(idx(SUARA_D3, "mengisinya"), tidakCocok("tx", 150, 176, 26))),
    k(SUARA_D4, bersih(0), tambah(0, judul("Semuanya bangun datar")), tambah(idx(SUARA_D4, "Segitiga"), ...bangunDatar("segitiga", "a", 60, 76, 22, W.langit), cocok("ca", 60, 120, 18)), tambah(idx(SUARA_D4, "segi"), ...bangunDatar("segiempat", "b", 150, 76, 22, W.hijauMuda), cocok("cb", 150, 120, 18)), tambah(idx(SUARA_D4, "lingkaran"), ...bangunDatar("lingkaran", "c", 240, 76, 22, W.pink), cocok("cc", 240, 120, 18)), tambah(idx(SUARA_D4, "hanya"), teks("sp", 150, 164, "satu permukaan", 11, W.merah))),
    k(SUARA_D5, tambah(idx(SUARA_D5, "bisa"), ...kartu("rg", 40, 174, 220, 26, W.krem, ["datar: tidak bisa diisi"], 10.4))),
  ],
};

/* ------------------------------ 3. Bangun ruang ------------------------------ */
function ruangKosong(): Obj[] {
  return [{ id: "kt-kotak", t: "kotak", x: 70, y: 56, w: 160, h: 80, warna: "#FFFFFF", garis: W.biru, rx: 6, tebal: 2 }, teks("kt-nm", 150, 152, "kotak yang bisa diisi", 10, W.biru)];
}
const POS_ISI = [
  [100, 108],
  [130, 108],
  [160, 108],
  [190, 108],
  [145, 82],
];
function isian(i: number): Obj[] {
  return [{ id: `isi${i}`, t: "bulat", x: POS_ISI[i][0], y: POS_ISI[i][1], r: 10, warna: W.biruMuda, garis: W.biru, tebal: 1.5 }, teks(`isin${i}`, POS_ISI[i][0], POS_ISI[i][1] + 4, String(i + 1), 11, W.merah)];
}

const SUARA_R1 = "Sekarang bangun ruang. Bangun ruang punya ruang di dalamnya, jadi dapat diisi.";
const SUARA_R2 = "Lihat kotak ini. Kita isi dengan bola kecil. Satu, dua, tiga, empat, lima. Bola kecil muat di dalam kotak.";
const SUARA_R3 = "Kotak, kubus, topi, dan botol adalah bangun ruang. Semuanya punya ruang di dalam.";
const SUARA_R4 = "Bangun ruang punya beberapa permukaan. Dadu punya banyak permukaan, bukan hanya satu.";
const SUARA_R5 = "Jadi, benda yang bisa diisi adalah bangun ruang.";

export const ADEGAN_RUANG: AdeganStory = {
  id: "bangun-ruang",
  judul: "Bangun ruang: punya ruang di dalam",
  sumber: "Materi: bangun ruang",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_R1, tambah(0, judul("Bangun ruang")), tambah(idx(SUARA_R1, "punya"), ...ruang("balok", "bla", 110, 84, 36)), tambah(idx(SUARA_R1, "diisi"), teks("rr", 110, 150, "ada ruang di dalam", 10.4, W.merah))),
    k(
      SUARA_R2,
      bersih(0),
      tambah(0, judul("Kita isi kotak")),
      tambah(idx(SUARA_R2, "Lihat"), ...ruangKosong()),
      ...[0, 1, 2, 3, 4].map((i) => tambah(idx(SUARA_R2, ["Satu", "dua", "tiga", "empat", "lima"][i]), ...isian(i))),
    ),
    k(
      SUARA_R3,
      bersih(0),
      tambah(0, judul("Semuanya bangun ruang")),
      tambah(idx(SUARA_R3, "Kotak"), ...ruang("balok", "bla", 45, 80, 18)),
      tambah(idx(SUARA_R3, "kubus"), ...ruang("kubus", "kba", 115, 80, 22)),
      tambah(idx(SUARA_R3, "topi"), ...ruang("kerucut", "kra", 185, 80, 22)),
      tambah(idx(SUARA_R3, "botol"), ...ruang("tabung", "tba", 250, 80, 22)),
      tambah(idx(SUARA_R3, "ruang", 2), ...[45, 115, 185, 250].map((x, i) => cocok(`cm${i}`, x, 140, 16))),
    ),
    k(
      SUARA_R4,
      tambah(idx(SUARA_R4, "beberapa"), teks("bp", 150, 168, "banyak permukaan", 11, W.merah)),
      sorotkan(idx(SUARA_R4, "Dadu"), "kba-fd", "kba-fa", "kba-fk"),
    ),
    k(SUARA_R5, redamkan(0, "kba-fd", "kba-fa", "kba-fk"), tambah(idx(SUARA_R5, "bisa"), ...kartu("rg", 40, 172, 220, 24, W.krem, ["bisa diisi: bangun ruang"], 10.4))),
  ],
};

/* ------------------------------ 4. Bisa diisi atau tidak? ------------------------------ */
const SUARA_T1 = "Untuk membedakan, Malosi bertanya satu hal. Apakah benda ini bisa diisi?";
const SUARA_T2 = "Kotak bisa diisi. Botol bisa diisi. Topi juga bisa diisi. Jadi ketiganya bangun ruang.";
const SUARA_T3 = "Sekarang lihat bentuk segi empat yang tipis ini. Apakah bisa diisi?";
const SUARA_T4 = "Tidak bisa, karena tidak ada ruang di dalamnya. Jadi itu bangun datar.";
const SUARA_T5 = "Pertanyaan ini membantu kita memilah dengan cepat. Bisa diisi berarti bangun ruang. Tidak bisa diisi berarti bangun datar.";

export const ADEGAN_BISA_DIISI: AdeganStory = {
  id: "bisa-diisi",
  judul: "Bisa diisi atau tidak?",
  sumber: "Materi: bisa diisi atau tidak",
  latar: "#FEFCE8",
  ketukan: [
    k(SUARA_T1, tambah(0, judul("Bisa diisi?")), tambah(idx(SUARA_T1, "bertanya"), emo("qq", 150, 90, "❓", 50)), tambah(idx(SUARA_T1, "diisi"), ...kartu("qk", 50, 130, 200, 34, W.emas, ["bisa diisi?"], 14))),
    k(
      SUARA_T2,
      bersih(0),
      tambah(0, judul("Bisa diisi")),
      tambah(idx(SUARA_T2, "Kotak"), ...ruang("balok", "bla", 55, 80, 20), cocok("c0", 55, 130, 16)),
      tambah(idx(SUARA_T2, "Botol"), ...ruang("tabung", "tba", 150, 80, 24), cocok("c1", 150, 130, 16)),
      tambah(idx(SUARA_T2, "Topi"), ...ruang("kerucut", "kra", 245, 80, 24), cocok("c2", 245, 130, 16)),
      tambah(idx(SUARA_T2, "ketiganya"), ...kartu("br", 60, 156, 180, 28, W.hijauMuda, ["bangun ruang"], 12)),
    ),
    k(SUARA_T3, bersih(0), tambah(0, judul("Bagaimana yang ini?")), tambah(idx(SUARA_T3, "segi"), ...bangunDatar("segiempat", "d", 150, 84, 30, W.langit)), tambah(idx(SUARA_T3, "diisi"), emo("qq", 150, 150, "❓", 34))),
    k(SUARA_T4, hapus(0, "qq"), tambah(idx(SUARA_T4, "Tidak"), tidakCocok("tx", 150, 150, 30)), tambah(idx(SUARA_T4, "datar"), ...kartu("bd", 60, 166, 180, 28, W.langit, ["bangun datar"], 12))),
    k(SUARA_T5, bersih(0), tambah(0, judul("Satu pertanyaan")), tambah(idx(SUARA_T5, "Bisa"), ...kartu("p1", 20, 50, 260, 44, W.hijauMuda, ["bisa diisi: bangun ruang"], 11)), tambah(idx(SUARA_T5, "Tidak"), ...kartu("p2", 20, 112, 260, 44, W.langit, ["tidak bisa diisi: bangun datar"], 11))),
  ],
};

