import type { AdeganStory, Obj } from "./logika-story";
import { E, W, emo, ikan, judul, kartu, kotak, orang, rentang, teks } from "./k1b5c-gambar";
import { bersih, idx, k, sorotkan, tambah } from "./k1b5c-bantu";

/* Akhir "Kemas Pakan dan Kantong": kalimat puluhan dan satuan di papan, papan persediaan rapi (jembatan ke Sub-Bab D), lalu penutup. Tanpa latihan. */

const kiri = (id: string, x: number, y: number, isi: string, u = 10, warna: string = W.biru): Obj => teks(id, x, y, isi, u, warna, { anchor: "start" });
const kanan = (id: string, x: number, y: number, isi: string, u = 10, warna: string = W.ungu): Obj => teks(id, x, y, isi, u, warna, { anchor: "end" });

/* ------------------------------ 7. Kalimat di papan ------------------------------ */
const SUARA_K1 = "Mamah minta kalimatnya ditulis di papan.";
const SUARA_K2 = "Enam belas, satu puluhan dan enam satuan.";
const SUARA_K3 = "Dua puluh, dua puluhan dan nol satuan.";
const BARIS_Y = [72, 112];
/** Satu baris kalimat: bilangan `n{i}` (anchor akhir), bagian pertama `a{i}` dan bagian kedua `b{i}`. */
const nomor = (i: number, isi: string): Obj => kanan(`n${i}`, 88, BARIS_Y[i], isi, 14, W.merah);
const bagianA = (i: number, isi: string): Obj => kiri(`a${i}`, 100, BARIS_Y[i], isi);
const bagianB = (i: number, isi: string): Obj => kiri(`b${i}`, 156, BARIS_Y[i], isi);

export const ADEGAN_KALIMAT: AdeganStory = {
  id: "kalimat",
  judul: "Kalimat puluhan dan satuan di papan",
  sumber: "Materi: kalimat puluhan dan satuan",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_K1,
      tambah(0, judul("Kalimat di papan"), ...orang("mm", 24, 182, E.mamah, "Mamah")),
      tambah("kalimatnya", ...orang("ab", 276, 182, E.abang, "Abang")),
      tambah("papan.", kotak("pp", 30, 28, 240, 142, W.putih, W.coklat, { rx: 8, tebal: 2.4, z: -3 })),
    ),
    k(
      SUARA_K2,
      tambah(idx(SUARA_K2, "belas", 1), nomor(0, "16")),
      tambah(idx(SUARA_K2, "puluhan", 1), bagianA(0, "1 puluhan")),
      tambah(idx(SUARA_K2, "satuan", 1), bagianB(0, "dan 6 satuan")),
    ),
    k(
      SUARA_K3,
      tambah(idx(SUARA_K3, "puluh"), nomor(1, "20")),
      tambah(idx(SUARA_K3, "puluhan", 1), bagianA(1, "2 puluhan")),
      tambah(idx(SUARA_K3, "satuan", 1), bagianB(1, "dan 0 satuan")),
    ),
  ],
};

/* ------------------------------ 8. Papan persediaan rapi ------------------------------ */
const SUARA_P1 = "Papan persediaan kini rapi. Pakan enam belas, kantong ikan tiga belas, kerang sebelas, kerikil dua puluh. Pembeli bisa melihat persediaan sekali pandang.";
const SUARA_P2 = "Lalu Pak RT datang dan memesan ikan guppy. Akuarium mana yang isinya cukup, dan mana yang lebih banyak?";
const SUARA_P3 = "Mamah tersenyum lega.";
const Y_P = [72, 100, 128, 156];
const NAMA_P = ["pakan", "kantong ikan", "kerang", "kerikil"];
const ISI_P: [string, string, string][] = [["16", "1", "6"], ["13", "1", "3"], ["11", "1", "1"], ["20", "2", "0"]];
/** Baris persediaan ke-i: nama `pn{i}`, jumlah `pj{i}`, puluhan `pp{i}`, satuan `ps{i}`. */
const barisPersediaan = (i: number): Obj[] => [kiri(`pn${i}`, 26, Y_P[i], NAMA_P[i], 11, W.biru), teks(`pj${i}`, 150, Y_P[i], ISI_P[i][0], 14, W.merah), teks(`pp${i}`, 206, Y_P[i], ISI_P[i][1], 14, W.biru), teks(`ps${i}`, 254, Y_P[i], ISI_P[i][2], 14, W.biru)];
/** Akuarium kecil `${id}` berisi `n` ikan (empat tiap baris) di pojok (x, y). */
const akuariumIsi = (id: string, x: number, y: number, n: number, warna: string): Obj[] => [
  kotak(id, x, y, 100, 76, "#ECFEFF", "#0E7490", { rx: 6, tebal: 2.4, z: -3 }),
  kotak(`${id}-a`, x + 4, y + 12, 92, 60, "#A5F3FC", undefined, { rx: 4, z: -2 }),
  ...rentang(0, n - 1).flatMap((i) => ikan(`${id}f${i}`, x + 18 + (i % 4) * 22, y + 28 + Math.floor(i / 4) * 17, warna, 0.5)),
];

export const ADEGAN_PAPAN_RAPI: AdeganStory = {
  id: "papan-rapi",
  judul: "Papan persediaan rapi",
  sumber: "Materi: hasil dan masalah berikutnya",
  latar: "#ECFDF5",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Papan persediaan"), kotak("pp", 14, 28, 272, 146, W.putih, W.coklat, { rx: 8, tebal: 2.4, z: -3 })),
      tambah(0, kiri("hn", 26, 50, "barang", 9.4, W.ungu), teks("hj", 150, 50, "jumlah", 9.4, W.ungu), teks("hp", 206, 50, "puluhan", 9.4, W.ungu), teks("hs", 254, 50, "satuan", 9.4, W.ungu)),
      tambah("Pakan", kiri("pn0", 26, Y_P[0], NAMA_P[0], 11, W.biru)),
      tambah(idx(SUARA_P1, "belas", 1), barisPersediaan(0).slice(1)),
      tambah("kantong", kiri("pn1", 26, Y_P[1], NAMA_P[1], 11, W.biru)),
      tambah(idx(SUARA_P1, "belas", 2), barisPersediaan(1).slice(1)),
      tambah("kerang", kiri("pn2", 26, Y_P[2], NAMA_P[2], 11, W.biru)),
      tambah("sebelas,", barisPersediaan(2).slice(1)),
      tambah("kerikil", kiri("pn3", 26, Y_P[3], NAMA_P[3], 11, W.biru)),
      tambah("puluh.", barisPersediaan(3).slice(1)),
      tambah("Pembeli", emo("pb", 276, 184, E.pembeli, 22)),
      sorotkan("melihat", "pp"),
      tambah("sekali", teks("sk", 150, 190, "sekali pandang", 10, W.hijau)),
    ),
    k(
      SUARA_P2,
      bersih(0),
      tambah(0, judul("Pak RT memesan ikan guppy")),
      tambah("Pak", ...orang("pk", 150, 182, E.pakRT, "Pak RT")),
      tambah("guppy.", ...kartu("gp", 100, 34, 100, 20, W.krem, ["ikan guppy"], 9.4)),
      tambah("Akuarium", ...akuariumIsi("ta", 30, 62, 7, "#FB923C"), ...akuariumIsi("tb", 170, 62, 12, "#F59E0B")),
      tambah("cukup,", teks("tc", 80, 152, "cukup?", 10, W.merah)),
      tambah("lebih", teks("tl", 220, 152, "lebih banyak?", 10, W.merah)),
    ),
    k(
      SUARA_P3,
      tambah("Mamah", ...orang("mm", 24, 182, E.mamah, "Mamah")),
      tambah("tersenyum", emo("jp", 58, 182, E.jempol, 20)),
      tambah("lega.", emo("ok", 100, 180, E.benar, 16)),
    ),
  ],
};

/* ------------------------------ 9. Penutup ------------------------------ */
const SUARA_Q1 = "Ingat, ya. Tiap sepuluh diikat jadi satu puluhan, sisanya satuan.";
const SUARA_Q2 = "Angka kiri artinya puluhan, angka kanan artinya satuan. Angka yang sama bisa berarti beda.";
const SUARA_Q3 = "Menurutmu, bagaimana kita memutuskan akuarium mana yang lebih banyak isinya? Terima kasih, Igil, Kaka, Abang, dan Mamah!";
const baris = (i: number, y: number, warna: string): Obj => kotak(`q${i}`, 14, y, 272, 40, warna, W.biru, { rx: 8, tebal: 1.6, z: -2 });

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Penutup: ingat puluhan dan satuan",
  sumber: "Materi: ringkasan dan penutup",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_Q1,
      tambah(0, judul("Ingat, ya!")),
      tambah("Tiap", baris(0, 32, W.hijauMuda)),
      tambah("sepuluh", kiri("q0a", 24, 56, "tiap 10 diikat jadi 1 puluhan", 9.4, W.biru)),
      tambah("sisanya", kanan("q0b", 278, 56, "sisa: satuan", 9, W.hijau)),
    ),
    k(
      SUARA_Q2,
      tambah("Angka", baris(1, 78, W.lavender)),
      tambah("kiri", kiri("q1a", 24, 102, "angka kiri: puluhan", 9.4, W.biru)),
      tambah("kanan", kanan("q1b", 278, 102, "angka kanan: satuan", 9, W.ungu)),
      tambah(idx(SUARA_Q2, "Angka", 3), baris(2, 124, W.krem), teks("q2a", 150, 148, "angka sama, tempat beda", 10, W.merah)),
    ),
    k(
      SUARA_Q3,
      bersih(0),
      tambah(0, judul("Terima kasih!")),
      tambah("bagaimana", emo("mk", 150, 62, "\u{1F914}", 30)),
      tambah("akuarium", ...kartu("qa", 60, 82, 180, 22, W.emas, ["akuarium mana lebih banyak?"], 9)),
      tambah("Igil,", ...orang("ig", 45, 168, E.igil, "Igil")),
      tambah("Kaka,", ...orang("kk", 115, 168, E.kaka, "Kaka")),
      tambah("Abang,", ...orang("ab", 185, 168, E.abang, "Abang")),
      tambah("Mamah!", ...orang("mm", 255, 168, E.mamah, "Mamah")),
    ),
  ],
};
