import type { AdeganStory } from "./logika-story";
import { E, W, bulat, emo, garis, judul, kainBar, kartu, kotak, kotakKancing, meja, mesinJahit, pecahan, teks, tokoh } from "./k4b2c-gambar";
import { bersih, k, sorotkan, tambah, ubah } from "./k4b2c-bantu";

/*
 * Cerita orisinal IGIL "Meja Jahit Kak Sekar" (Kelas 4 Bab 2 Sub-Bab C), cerita Sanggar Batik Kampung Mekar.
 * Naskah suara dari naskah/story-naskah-k4b2c.md. Bagian ini: salah langkah (menambah), memeriksa dengan menumpuk, taruhan menjahit kancing.
 */

/* ------------------------------ 4. Salah langkah: menambah ------------------------------ */
const SUARA_A1 = "Satria mau mengubah satu per dua dengan menambah dua pada pembilang dan penyebut.";
const SUARA_A2 = "Ia menulis tiga per empat dan berkata, mudah sekali, tinggal ditambah!";
const SUARA_A3 = "Kalau aku salah, aku menjahit semua kancing baju di meja ini, katanya sambil menyibak lengan baju.";
const PC_ASAL = pecahan("pa", 100, 84, 1, 2, 24);
const PC_HASIL = pecahan("pb", 230, 84, 3, 4, 24);

export const ADEGAN_SALAH_TAMBAH: AdeganStory = {
  id: "salah-tambah",
  judul: "Satria menambah angka",
  sumber: "Materi: salah langkah, menambah",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_A1,
      tambah(0, judul("Menambah Angka"), ...tokoh("st", 40, 184, "Satria")),
      tambah("satu", PC_ASAL[0]),
      tambah("dua", PC_ASAL[1], PC_ASAL[2]),
      tambah("pembilang", teks("t1", 138, 77, "+2", 12, W.merah)),
      tambah("penyebut.", teks("t2", 138, 103, "+2", 12, W.merah)),
    ),
    k(
      SUARA_A2,
      tambah("menulis", emo("pn", 80, 160, E.pensil, 16)),
      tambah("tiga", PC_HASIL[0]),
      tambah("empat", PC_HASIL[1], PC_HASIL[2]),
      tambah("mudah", teks("md", 150, 140, "mudah sekali!", 11, W.ungu)),
    ),
    k(
      SUARA_A3,
      bersih(0),
      tambah(0, judul("Taruhan Satria"), ...tokoh("st", 40, 184, "Satria"), ...meja("mj", 96, 120, 148, 22)),
      tambah("salah,", emo("xs", 80, 100, E.salah, 18)),
      tambah("menjahit", ...mesinJahit("ms", 100, 96)),
      tambah("kancing", ...kotakKancing("kk", 196, 98, 4)),
      tambah("baju", emo("b1", 156, 118, E.baju, 22), emo("b2", 180, 118, E.baju, 22)),
      tambah("menyibak", emo("sb", 72, 160, E.tangan, 16)),
    ),
  ],
};

/* ------------------------------ 5. Memeriksa: menumpuk potongan ------------------------------ */
const SUARA_P1 = "Laras menaruh potongan tiga per empat di atas potongan satu per dua.";
const SUARA_P2 = "Potongan tiga per empat tampak lebih panjang, jadi besarnya tidak sama.";
const SUARA_P3 = "Menambah angka yang sama tidak menjaga besar pecahan; yang menjaganya adalah mengalikan.";
const PC_ATAS = pecahan("pa", 52, 66, 3, 4, 16);
const PC_BAWAH = pecahan("pb", 52, 100, 1, 2, 16);

export const ADEGAN_PERIKSA: AdeganStory = {
  id: "periksa",
  judul: "Potongan ditumpuk",
  sumber: "Materi: memeriksa dengan menumpuk",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Ditumpuk"), ...tokoh("lr", 40, 184, "Laras")),
      tambah("tiga", ...kainBar("ta", 90, 50, 160, 24, 4, 3), PC_ATAS[0]),
      tambah("empat", PC_ATAS[1], PC_ATAS[2]),
      tambah("satu", ...kainBar("tb", 90, 84, 160, 24, 2, 1), PC_BAWAH[0]),
      tambah("dua.", PC_BAWAH[1], PC_BAWAH[2]),
    ),
    k(
      SUARA_P2,
      tambah("tampak", garis("gv", 170, 44, 0, 68, W.merah, 1.8, { putus: true, z: 5 })),
      sorotkan("lebih", "ta-c2"),
      tambah("panjang,", teks("lp", 212, 44, "lebih panjang", 8, W.merah)),
      tambah("tidak", teks("ts", 150, 132, "tidak sama", 12, W.merah)),
    ),
    k(
      SUARA_P3,
      bersih(0),
      tambah(0, judul("Ditumpuk"), ...tokoh("lr", 40, 184, "Laras"), ...kartu("kt", 20, 50, 120, 50, "#FEE2E2", ["menambah", "tidak menjaga"], 9)),
      tambah("tidak", emo("xs", 80, 124, E.salah, 20)),
      tambah("menjaganya", ...kartu("kl", 160, 50, 120, 50, "#DCFCE7", ["mengalikan", "menjaga besar"], 9)),
      tambah("mengalikan.", emo("ok", 220, 124, E.benar, 20)),
    ),
  ],
};

/* ------------------------------ 6. Menjahit kancing ------------------------------ */
const SUARA_K1 = "Satria menepati taruhannya dan menjahit kancing satu per satu.";
const SUARA_K2 = "Jarumnya menusuk jarinya dua kali, dan ia berseru aduh dengan wajah masam.";
const SUARA_K3 = "Kak Sekar tertawa dan menempelkan plester kecil di jari Satria.";

export const ADEGAN_KANCING: AdeganStory = {
  id: "kancing",
  judul: "Menjahit semua kancing",
  sumber: "Materi: menepati taruhan",
  latar: "#FEF3C7",
  ketukan: [
    k(
      SUARA_K1,
      tambah(0, judul("Menepati Taruhan"), ...tokoh("st", 40, 184, "Satria")),
      tambah("menjahit", emo("bj", 150, 96, E.baju, 44)),
      tambah("kancing", bulat("kc0", 150, 66, 3.5, "#EF4444", W.biru, { tebal: 0.8, z: 3 })),
      tambah("satu", bulat("kc1", 150, 80, 3.5, "#3B82F6", W.biru, { tebal: 0.8, z: 3 }), teks("c1", 176, 70, "1", 12, W.biru)),
      tambah("satu@2", bulat("kc2", 150, 94, 3.5, "#22C55E", W.biru, { tebal: 0.8, z: 3 })),
    ),
    k(
      SUARA_K2,
      tambah("Jarumnya", garis("jr", 196, 118, -18, -22, "#475569", 2, { z: 4 })),
      tambah("dua", teks("n2", 222, 70, "2 kali", 12, W.merah)),
      ubah("aduh", { id: "st", isi: E.meringis }),
      tambah("aduh", teks("ad", 96, 144, "aduh!", 12, W.merah)),
    ),
    k(
      SUARA_K3,
      tambah("Kak", ...tokoh("ks", 236, 184, "Kak Sekar")),
      tambah("tertawa", emo("tw", 272, 148, E.tawa, 18)),
      ubah("plester", { id: "st", isi: E.satria }),
      tambah("plester", kotak("pl", 40, 170, 12, 5, "#FCD34D", W.coklat, { rx: 1, tebal: 0.8, z: 5 })),
      tambah("kecil", teks("pt", 92, 166, "plester", 9, W.coklat)),
    ),
  ],
};
