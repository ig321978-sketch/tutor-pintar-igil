import type { AdeganStory, Obj } from "./logika-story";
import { E, W, balok, deret, deretMainan, emo, garis, judul, kartu, kartuTitik, keranjang, kotak, lemari, orang, tata, teks, tulisAngka, type Titik } from "./k1b1a-gambar";
import { bersih, hapus, hitungAksi, hitungMainan, k, sorotkan, tambah, urutKata } from "./k1b1a-bantu";

/* Akhir cerita "Merapikan Lemari Mainan Igil": mencatat dalam tabel, tiga latihan, dan penutup. */

const idSemua = (id: string, n: number): string[] => Array.from({ length: n }, (_, i) => `${id}${i}`);

/* ------------------------------ 10. Mencatat dalam tabel ------------------------------ */
const SUARA_J1 = "Abang mengambil kertas dan pensil. Kita catat semua mainan, supaya Mamah mudah melihatnya.";
const SUARA_J2 = "Kolom kiri untuk gambar mainan. Kolom kanan untuk banyaknya.";
const SUARA_J3 = "Mobil ada lima. Boneka ada empat. Bola ada tiga.";
const SUARA_J4 = "Balok ada sepuluh. Kereta api nol, karena kotaknya kosong.";
const SUARA_J5 = "Tabelnya selesai. Sekali lihat, kita tahu banyak tiap mainan.";

/** Tabel mainan: kolom kiri gambar, kolom kanan banyaknya. Baris: mobil 5, boneka 4, bola 3, balok 10, kereta 0. */
export const ISI_TABEL: { nama: string; banyak: number }[] = [
  { nama: "mobil", banyak: 5 },
  { nama: "boneka", banyak: 4 },
  { nama: "bola", banyak: 3 },
  { nama: "balok", banyak: 10 },
  { nama: "kereta", banyak: 0 },
];
const TB = { x: 84, y: 30, kiri: 110, kanan: 90, kepala: 20, baris: 28 };
const yBaris = (i: number) => TB.y + TB.kepala + i * TB.baris;
const gambarBaris = (i: number): Obj => {
  const cx = TB.x + TB.kiri / 2;
  const cy = yBaris(i) + 14;
  if (i === 3) return balok("gm3", cx, cy, 1, 16);
  const e = [E.mobil, E.boneka, E.bola, "", E.kereta][i];
  return emo(`gm${i}`, cx, cy + 7, e, 18);
};
const angkaBaris = (i: number): Obj => teks(`tv${i}`, TB.x + TB.kiri + TB.kanan / 2, yBaris(i) + 20, String(ISI_TABEL[i].banyak), 16, W.merah);

export const ADEGAN_TABEL: AdeganStory = {
  id: "catat-tabel",
  judul: "Mencatat mainan dalam tabel",
  sumber: "Materi: mendata banyak mainan",
  latar: "#F5F3FF",
  ketukan: [
    k(
      SUARA_J1,
      tambah(0, judul("Mencatat dalam tabel"), ...orang("ab", 34, 178, E.abang, "Abang")),
      tambah("kertas", emo("ct", 160, 112, E.catat, 56)),
      tambah("Mamah", emo("mm", 250, 150, E.mamah, 26)),
    ),
    k(
      SUARA_J2,
      hapus(0, "ct", "mm"),
      tambah(
        "kiri",
        kotak("th0", TB.x, TB.y, TB.kiri, TB.kepala, W.lavender),
        teks("th0t", TB.x + TB.kiri / 2, TB.y + 14, "Mainan", 9),
        ...ISI_TABEL.map((_, i) => kotak(`tc${i}a`, TB.x, yBaris(i), TB.kiri, TB.baris, W.putih)),
        ...ISI_TABEL.map((_, i) => gambarBaris(i)),
      ),
      tambah(
        "kanan",
        kotak("th1", TB.x + TB.kiri, TB.y, TB.kanan, TB.kepala, W.lavender),
        teks("th1t", TB.x + TB.kiri + TB.kanan / 2, TB.y + 14, "Banyaknya", 9),
        ...ISI_TABEL.map((_, i) => kotak(`tc${i}b`, TB.x + TB.kiri, yBaris(i), TB.kanan, TB.baris, W.putih)),
      ),
    ),
    k(SUARA_J3, tambah("lima.", angkaBaris(0)), tambah("empat.", angkaBaris(1)), tambah("tiga.", angkaBaris(2))),
    k(SUARA_J4, tambah("sepuluh.", angkaBaris(3)), tambah("nol,", angkaBaris(4)), sorotkan("kosong.", "tc4b")),
    k(SUARA_J5, sorotkan("selesai.", ...idSemua("tv", 5)), tambah("tahu", emo("jp", 34, 130, E.jempol, 24))),
  ],
};

/* ------------------------------ 11. Latihan 1: kelereng di bawah kasur ------------------------------ */
const SUARA_K1 = "Latihan satu. Igil menemukan kelereng di bawah kasur. Ayo bantu Igil menghitungnya.";
const SUARA_K2 = "Tunjuk tiap kelereng. Satu, dua, tiga, empat, lima, enam, tujuh.";
const SUARA_K3 = "Angka terakhirnya tujuh. Jadi, ada tujuh kelereng. Coba tulis angka tujuh.";
const SUARA_K4 = "Betul! Igil menulis tujuh di tabel. Kelereng pun masuk ke kotaknya.";
const P7 = tata(7);

export const ADEGAN_LATIHAN_SATU: AdeganStory = {
  id: "latihan-satu",
  judul: "Latihan 1: kelereng di bawah kasur",
  sumber: "Materi: latihan menghitung dan menulis",
  latar: "#FDF2F8",
  ketukan: [
    k(SUARA_K1, tambah(0, judul("Latihan 1")), tambah("kelereng", ...deret("kelereng", "kl", P7, 17)), tambah("bantu", emo("ig", 274, 186, E.igil, 22))),
    k(SUARA_K2, ...hitungAksi(SUARA_K2, "kl", P7, "kelereng.")),
    k(
      SUARA_K3,
      bersih(0),
      tambah(0, judul("Latihan 1")),
      tambah("Jadi,", teks("lt", 150, 176, "7 kelereng", 13, W.hijau)),
      tambah("tulis", ...tulisAngka("w", 128, 44, "7", 2)),
    ),
    k(
      SUARA_K4,
      tambah("Betul!", emo("ok", 60, 100, E.benar, 36)),
      tambah("tabel.", ...kartu("tb", 200, 70, 86, 28, W.krem, ["kelereng: 7"], 10)),
      tambah("kotaknya.", emo("ig", 240, 140, E.igil, 30)),
    ),
  ],
};

/* ------------------------------ 12. Latihan 2: dinosaurus dan pesawat ------------------------------ */
const SUARA_L1 = "Latihan dua. Ada dua kotak mainan. Kotak pertama berisi dinosaurus. Kotak kedua untuk pesawat.";
const SUARA_L2 = "Hitung dinosaurusnya. Satu, dua, tiga, empat, lima, enam.";
const SUARA_L3 = "Kotak kedua tidak berisi apa-apa. Berapa banyak pesawatnya?";
const SUARA_L4 = "Tidak ada pesawat, jadi banyaknya nol. Jawabannya enam dan nol.";
const PD: Titik[] = [44, 89, 134].flatMap((x) => [{ x, y: 108 }]).concat([44, 89, 134].map((x) => ({ x, y: 150 })));

export const ADEGAN_LATIHAN_DUA: AdeganStory = {
  id: "latihan-dua",
  judul: "Latihan 2: dua kotak mainan",
  sumber: "Materi: latihan nol",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_L1,
      tambah(0, judul("Latihan 2")),
      tambah("pertama", ...keranjang("k1", 14, 80, 150, 84, { z: -1 }), ...deretMainan(E.dino, "ds", PD, 22), teks("ld", 89, 70, "dinosaurus", 9, W.ungu)),
      tambah("kedua", ...keranjang("k2", 186, 80, 100, 84, { z: -1 }), teks("lp", 236, 70, "pesawat", 9, W.ungu)),
    ),
    k(SUARA_L2, ...hitungMainan(SUARA_L2, "ds", PD, 22, "dinosaurusnya.")),
    k(SUARA_L3, hapus(0, "tg"), sorotkan("kedua", "k2"), tambah("Berapa", emo("tn", 236, 132, E.tanya, 26))),
    k(
      SUARA_L4,
      hapus(0, "tn"),
      tambah("nol.", teks("p0", 236, 136, "0", 30, W.merah)),
      tambah("enam", teks("d6", 89, 192, "6", 20, W.merah)),
      tambah("nol.@2", teks("p0b", 236, 192, "0", 20, W.merah)),
    ),
  ],
};

/* ------------------------------ 13. Latihan 3: dadu mainan ------------------------------ */
const SUARA_M1 = "Latihan tiga. Abang melempar dadu mainan. Lihat sekilas, ada berapa titik?";
const SUARA_M2 = "Jangan dihitung dulu. Cukup lihat polanya, seperti empat sudut kotak.";
const SUARA_M3 = "Empat! Sekarang kita cek dengan menghitung. Satu, dua, tiga, empat.";
const SUARA_M4 = "Betul, ada empat titik. Igil hebat sekali!";
const cekPos = urutKata(SUARA_M3, ["satu", "dua", "tiga", "empat"], "menghitung.");

export const ADEGAN_LATIHAN_TIGA: AdeganStory = {
  id: "latihan-tiga",
  judul: "Latihan 3: lihat sekilas",
  sumber: "Materi: latihan melihat sekilas",
  latar: "#FFFBEB",
  ketukan: [
    k(SUARA_M1, tambah(0, judul("Latihan 3")), tambah("dadu", ...kartuTitik("lk", 110, 44, 4, 80)), tambah("berapa", emo("tn", 150, 172, E.tanya, 28))),
    k(SUARA_M2, hapus(0, "tn"), tambah("Jangan", emo("mt", 150, 172, E.mata, 30)), sorotkan("sudut", ...idSemua("lk-t", 4))),
    k(
      SUARA_M3,
      hapus(0, "mt"),
      ...cekPos.map((p, i) => tambah(p, teks(`ck${i}`, 96 + i * 36, 152, String(i + 1), 18, W.merah))),
      ...cekPos.map((p, i) => sorotkan(p, `lk-t${i}`)),
    ),
    k(SUARA_M4, tambah("Betul,", teks("jw", 244, 100, "4", 44, W.hijau)), tambah("Igil", emo("ig", 56, 100, E.igil, 34))),
  ],
};

/* ------------------------------ 14. Penutup: kamar rapi ------------------------------ */
const SUARA_N1 = "Mamah masuk ke kamar. Wah, lemarinya rapi sekali! Tabel mainan tertempel di pintu lemari.";
const SUARA_N2 = "Igil bercerita. Kami pisahkan mainannya, kami hitung satu per satu, lalu kami catat.";
const SUARA_N3 = "Ingat, sentuh satu benda, sebut satu angka. Angka terakhir adalah banyaknya. Kalau tidak ada, banyaknya nol.";
const SUARA_N4 = "Mamah memeluk Igil, Kaka, dan Abang. Terima kasih, anak-anak hebat! Sampai jumpa lagi.";
const LM = { x: 104, y: 36, w: 120, h: 132 };
const isiRak = (): Obj[] => [
  ...[0, 1, 2, 3, 4].map((i) => emo(`rm${i}`, 122 + i * 21, 76, E.mobil, 16)),
  ...[0, 1, 2, 3].map((i) => emo(`rb${i}`, 130 + i * 24, 120, E.boneka, 16)),
  ...[0, 1, 2].map((i) => emo(`rl${i}`, 126 + i * 22, 164, E.bola, 16)),
  ...[0, 1, 2].map((i) => balok(`rk${i}`, 196 + (i % 2) * 12, 158 - Math.floor(i / 2) * 12, i, 11)),
];

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Penutup: kamar sudah rapi",
  sumber: "Materi: ringkasan dan penutup",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_N1,
      tambah(0, judul("Kamar sudah rapi"), garis("lantai", 10, 172, 280, 0, W.coklat, 2.5), ...orang("mm", 50, 150, E.mamah, "Mamah")),
      tambah("lemarinya", ...lemari("lm", LM.x, LM.y, LM.w, LM.h, 3), ...isiRak()),
      tambah("Tabel", kotak("tbl", 238, 60, 50, 64, W.putih, W.biru, { rx: 4 }), emo("tbe", 263, 100, E.catat, 24)),
    ),
    k(
      SUARA_N2,
      bersih(0),
      tambah(0, judul("Cara kami merapikan")),
      tambah("pisahkan", ...kartu("l1", 14, 36, 272, 34, W.langit, ["Pisahkan yang sejenis"], 10)),
      tambah("hitung", ...kartu("l2", 14, 80, 272, 34, W.krem, ["Hitung satu per satu"], 10)),
      tambah("catat.", ...kartu("l3", 14, 124, 272, 34, W.hijauMuda, ["Catat dalam tabel"], 10)),
    ),
    k(
      SUARA_N3,
      bersih(0),
      tambah(0, judul("Ingat, ya!")),
      tambah("sentuh", ...kartu("p1", 14, 36, 272, 34, W.hijauMuda, ["sentuh satu, sebut satu angka"], 9.6)),
      tambah("terakhir", ...kartu("p2", 14, 80, 272, 34, W.langit, ["angka terakhir = banyaknya"], 9.6)),
      tambah("Kalau", ...kartu("p3", 14, 124, 272, 34, W.krem, ["tidak ada: banyaknya nol"], 9.6)),
    ),
    k(
      SUARA_N4,
      bersih(0),
      tambah(0, judul("Terima kasih!"), ...orang("mm", 45, 120, E.mamah, "Mamah")),
      tambah("Igil,", ...orang("ig", 115, 120, E.igil, "Igil")),
      tambah("Kaka,", ...orang("kk", 185, 120, E.kaka, "Kaka")),
      tambah("Abang.", ...orang("ab", 255, 120, E.abang, "Abang")),
      tambah("memeluk", emo("ht", 150, 66, E.hati, 30)),
      tambah("Sampai", emo("pa", 80, 176, E.pesta, 30), emo("pb", 220, 176, E.pesta, 30)),
    ),
  ],
};
