import type { AdeganStory, Obj } from "./logika-story";
import { E, W, deret, emo, judul, kardus, karton, kotak, label, orang, poligon, segiEmpatRel, segitigaRel, semuaSisi, semuaSudut, sisiKe, sudutMutlak, teks, tutupKaleng, WARNA_BAHAN } from "./k1b4a-gambar";
import { bersih, hapus, hitungMainan, k, sorotkan, tambah, ubah, urutKata } from "./k1b4a-bantu";

/* Lanjutan "Bahan dari Gudang": sisi kardus segi empat, diputar tetap segitiga, lalu kartu bahan dengan kalimat. */

/* ------------------------------ 4. Sisi kardus segi empat ------------------------------ */
const SUARA_K1 = "Abang menunjuk sisi kardus. Sisi lurusnya satu, dua, tiga, empat. Sudutnya juga empat.";
const SUARA_K2 = "Bentuknya segi empat, cocok untuk badan. Kotak korek kecil juga segi empat, sama seperti kardus besar.";
const SUARA_K3 = "Abang menghitung kardus. Satu, dua, tiga, empat, lima. Ada lima kardus.";
const KD = sudutMutlak(150, 96, segiEmpatRel(120, 76));
const KK = sudutMutlak(256, 96, segiEmpatRel(34, 22));
const posK1 = urutKata(SUARA_K1, ["satu,", "dua,", "tiga,", "empat."], "lurusnya");
const LIMA = deret(5, 50, 50, 100);

export const ADEGAN_KARDUS: AdeganStory = {
  id: "sisi-kardus",
  judul: "Sisi kardus segi empat",
  sumber: "Materi: bentuk segi empat",
  latar: "#FEF3C7",
  ketukan: [
    k(
      SUARA_K1,
      tambah(0, judul("Sisi kardus"), ...orang("ab", 36, 168, E.abang, "Abang"), ...kardus("kd", 150, 96, 120, 76)),
      sorotkan("menunjuk", "kd"),
      ...posK1.map((p, i) => tambah(p, ...sisiKe("kd", KD, i))),
      tambah("Sudutnya", ...semuaSudut("kd", KD)),
      tambah("empat@2", teks("su", 252, 170, "4 sudut", 10, W.hijau)),
    ),
    k(
      SUARA_K2,
      hapus(0, "kd-a0", "kd-a1", "kd-a2", "kd-a3", "su"),
      tambah("segi", ...label("nm", 100, 148, 100, "segi empat", W.emas)),
      tambah("badan.", emo("bd", 252, 170, E.kardus, 18)),
      tambah("korek", ...kardus("kk", 256, 96, 34, 22), teks("kkn", 256, 122, "kotak korek", 8, W.coklat)),
      tambah("segi@2", ...semuaSudut("kk", KK)),
      tambah("sama", teks("kc", 256, 74, "kecil", 9, W.coklat), teks("bs", 150, 48, "besar", 9, W.coklat)),
      sorotkan("besar.", "kk"),
    ),
    k(
      SUARA_K3,
      bersih(0),
      tambah(0, judul("Lima kardus"), ...orang("ab", 36, 168, E.abang, "Abang")),
      tambah("kardus.", ...LIMA.flatMap((p, i) => kardus(`kd${i}`, p.x, p.y, 38, 30))),
      ...hitungMainan(SUARA_K3, "kd", LIMA, 22, "kardus."),
      tambah("kardus.@2", ...label("ld", 110, 148, 100, "5 kardus", W.emas)),
    ),
  ],
};

/* ------------------------------ 5. Diputar tetap segitiga ------------------------------ */
const SUARA_P1 = "Igil memutar karton segitiga, lalu membaliknya. Ujung runcingnya pindah tempat.";
const SUARA_P2 = "Kaka menghitung lagi. Tetap tiga sisi lurus dan tiga sudut.";
const SUARA_P3 = "Bentuk tidak berubah walau diputar, dibalik, atau berbeda ukuran. Segitiga tetap segitiga.";
const BALIK = sudutMutlak(150, 100, segitigaRel(44), 180);
const KECIL = sudutMutlak(256, 136, segitigaRel(14), 90);

export const ADEGAN_DIPUTAR: AdeganStory = {
  id: "diputar-tetap",
  judul: "Diputar tetap segitiga",
  sumber: "Materi: bentuk tetap sama",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Diputar tetap segitiga"), ...orang("ig", 36, 168, E.igil, "Igil"), karton("bg", 150, 100, 44, { warna: "none", putus: true, op: 0.5, z: -1 }), karton("sg", 150, 100, 44)),
      ubah("memutar", { id: "sg", rot: 90 }),
      ubah("membaliknya.", { id: "sg", rot: 180 }),
      tambah("pindah", teks("pj", 240, 150, "ujung pindah", 9, W.ungu)),
    ),
    k(
      SUARA_P2,
      hapus(0, "pj"),
      tambah("Kaka", ...orang("kk", 264, 168, E.kaka, "Kaka")),
      tambah("sisi", ...semuaSisi("sg", BALIK), ...label("ls", 210, 38, 84, "3 sisi lurus", W.merahMuda, 9)),
      tambah("sudut.", ...semuaSudut("sg", BALIK), ...label("lu", 210, 64, 84, "3 sudut", W.hijauMuda, 9)),
    ),
    k(
      SUARA_P3,
      hapus(0, "kk", "kk-n", "kk-pita"),
      ubah("diputar,", { id: "bg", rot: 90 }),
      ubah("dibalik,", { id: "bg", rot: 180 }),
      tambah("ukuran.", karton("kc", 256, 136, 14, { rot: 90 }), ...semuaSudut("kc", KECIL), teks("kcn", 256, 166, "kecil", 8.4, W.ungu)),
      tambah("Segitiga", ...label("nm", 100, 160, 100, "tetap segitiga", W.emas)),
    ),
  ],
};

/* ------------------------------ 6. Kartu bahan ------------------------------ */
const SUARA_B1 = "Mamah mengajak membuat kartu bahan. Tiap bahan diceritakan dengan nama bentuk, banyak sisi lurus, dan banyak sudut.";
const SUARA_B2 = "Tutup kaleng berbentuk lengkung, tanpa sisi lurus dan tanpa sudut.";
const SUARA_B3 = "Karton berbentuk segitiga, dengan tiga sisi lurus dan tiga sudut.";
const SUARA_B4 = "Sisi kardus berbentuk segi empat, dengan empat sisi lurus dan empat sudut.";
const WARNA_BARIS = [W.langit, W.pink, W.hijauMuda];
const yBaris = (i: number): number => 34 + i * 54;
const bingkai = (i: number): Obj => kotak(`r${i}`, 14, yBaris(i), 272, 46, WARNA_BARIS[i], W.biru, { rx: 8, tebal: 1.6, z: -2 });
const nama = (i: number, isi: string): Obj => teks(`r${i}-a`, 70, yBaris(i) + 19, isi, 11, W.biru, { anchor: "start" });
const rinci = (i: number, isi: string): Obj => teks(`r${i}-b`, 70, yBaris(i) + 37, isi, 9, W.ungu, { anchor: "start" });
const IKON_SG = sudutMutlak(42, yBaris(1) + 25, segitigaRel(14));
const IKON_KD = sudutMutlak(42, yBaris(2) + 23, segiEmpatRel(32, 22));

export const ADEGAN_KARTU: AdeganStory = {
  id: "kartu-bahan",
  judul: "Kartu bahan",
  sumber: "Materi: mendeskripsikan bentuk",
  latar: "#FDF4FF",
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, judul("Kartu bahan"), ...orang("mm", 40, 110, E.mamah, "Mamah")),
      tambah("kartu", kotak("kb", 80, 36, 206, 150, W.putih, W.biru, { rx: 8, tebal: 2, z: -2 })),
      tambah("nama", ...label("c0", 96, 52, 174, "nama bentuk", W.emas)),
      tambah("sisi", ...label("c1", 96, 98, 174, "banyak sisi lurus", W.merahMuda)),
      tambah("sudut.", ...label("c2", 96, 144, 174, "banyak sudut", W.hijauMuda)),
    ),
    k(
      SUARA_B2,
      bersih(0),
      tambah(0, judul("Kartu bahan")),
      tambah("Tutup", bingkai(0), ...tutupKaleng("i0", 42, yBaris(0) + 23, 14)),
      tambah("lengkung,", nama(0, "lengkung")),
      tambah("sisi", rinci(0, "tanpa sisi lurus, tanpa sudut")),
    ),
    k(
      SUARA_B3,
      tambah("Karton", bingkai(1), poligon("i1", 42, yBaris(1) + 25, segitigaRel(14), WARNA_BAHAN.karton)),
      tambah("segitiga,", nama(1, "segitiga")),
      tambah("sisi", rinci(1, "3 sisi lurus, 3 sudut")),
      tambah("sudut.", ...semuaSudut("i1", IKON_SG)),
    ),
    k(
      SUARA_B4,
      tambah("kardus", bingkai(2), poligon("i2", 42, yBaris(2) + 23, segiEmpatRel(32, 22), WARNA_BAHAN.kardus)),
      tambah("segi", nama(2, "segi empat")),
      tambah("sisi@2", rinci(2, "4 sisi lurus, 4 sudut")),
      tambah("sudut.", ...semuaSudut("i2", IKON_KD)),
    ),
  ],
};
