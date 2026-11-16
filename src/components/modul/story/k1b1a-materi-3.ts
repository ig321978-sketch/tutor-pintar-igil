import type { AdeganStory, Obj } from "./logika-story";
import { E, W, balok, emo, garis, judul, kartu, kotak, lemari, orang, teks } from "./k1b1a-gambar";
import { bersih, k, sorotkan, tambah } from "./k1b1a-bantu";

/* Akhir cerita "Merapikan Lemari Mainan Igil" (versi padat): mencatat dalam tabel dan penutup. Tanpa latihan (latihan ada di tahap lain). */

/* ------------------------------ 9. Mencatat dalam tabel ------------------------------ */
const SUARA_J1 = "Abang mencatat dalam tabel. Kolom kiri gambar mainan, kolom kanan banyaknya.";
const SUARA_J2 = "Mobil lima. Boneka empat. Bola tiga.";
const SUARA_J3 = "Balok sepuluh. Kereta api nol, karena kotaknya kosong.";

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
    k(SUARA_J2, tambah("lima.", angkaBaris(0)), tambah("empat.", angkaBaris(1)), tambah("tiga.", angkaBaris(2))),
    k(SUARA_J3, tambah("sepuluh.", angkaBaris(3)), tambah("nol,", angkaBaris(4)), sorotkan("kosong.", "tc4b"), tambah("kosong.", emo("jp", 34, 130, E.jempol, 24))),
  ],
};

/* ------------------------------ 10. Penutup: kamar rapi ------------------------------ */
const SUARA_N1 = "Mamah masuk. Wah, lemarinya rapi, dan ada tabel mainan!";
const SUARA_N2 = "Ingat, tunjuk satu, sebut satu angka. Angka terakhir adalah banyaknya. Tidak ada berarti nol.";
const SUARA_N3 = "Terima kasih, Igil, Kaka, dan Abang. Sampai jumpa!";
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
      tambah("tabel", kotak("tbl", 238, 60, 50, 64, W.putih, W.biru, { rx: 4 }), emo("tbe", 263, 100, E.catat, 24)),
    ),
    k(
      SUARA_N2,
      bersih(0),
      tambah(0, judul("Ingat, ya!")),
      tambah("tunjuk", ...kartu("p1", 14, 36, 272, 34, W.hijauMuda, ["tunjuk satu, sebut satu angka"], 9.6)),
      tambah("terakhir", ...kartu("p2", 14, 80, 272, 34, W.langit, ["angka terakhir = banyaknya"], 9.6)),
      tambah("Tidak", ...kartu("p3", 14, 124, 272, 34, W.krem, ["tidak ada: banyaknya nol"], 9.6)),
    ),
    k(
      SUARA_N3,
      bersih(0),
      tambah(0, judul("Terima kasih!"), ...orang("mm", 45, 120, E.mamah, "Mamah"), emo("ht", 150, 66, E.hati, 30)),
      tambah("Igil,", ...orang("ig", 115, 120, E.igil, "Igil")),
      tambah("Kaka,", ...orang("kk", 185, 120, E.kaka, "Kaka")),
      tambah("Abang.", ...orang("ab", 255, 120, E.abang, "Abang")),
      tambah("Sampai", emo("pa", 80, 176, E.pesta, 30), emo("pb", 220, 176, E.pesta, 30)),
    ),
  ],
};
