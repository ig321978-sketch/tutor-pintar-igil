import type { AdeganStory } from "./logika-story";
import { E, W, balok, bingkai, deretMainan, emo, judul, kartu, kartuAngka, kartuTitik, keranjang, orang, teks, tulisAngka, type Titik } from "./k1b1a-gambar";
import { KATA_ANGKA, bersih, hapus, k, sorotkan, tambah, ubah, urutKata } from "./k1b1a-bantu";

/* Lanjutan cerita "Merapikan Lemari Mainan Igil" (versi padat): melihat sekilas, sampai sepuluh, nol, serta membaca dan menulis angka. */

const idSemua = (id: string, n: number): string[] => Array.from({ length: n }, (_, i) => `${id}${i}`);

/* ------------------------------ 5. Melihat sekilas ------------------------------ */
const SUARA_E1 = "Abang menunjukkan bola. Tanpa menghitung, Igil langsung tahu ada tiga.";
const SUARA_E2 = "Titik dadu juga bisa dilihat sekilas. Ini lima titik.";
const SUARA_E3 = "Kalau bendanya banyak, kita hitung satu per satu.";
const BOLA3: Titik[] = [{ x: 124, y: 104 }, { x: 176, y: 104 }, { x: 150, y: 82 }];

export const ADEGAN_SEKILAS: AdeganStory = {
  id: "sekilas",
  judul: "Melihat banyaknya sekilas",
  sumber: "Materi: mengenali banyak sedikit sekilas",
  latar: "#FAF5FF",
  ketukan: [
    k(
      SUARA_E1,
      tambah(0, judul("Lihat sekilas"), ...orang("ab", 26, 178, E.abang, "Abang"), ...keranjang("kr", 90, 100, 120, 50, { z: -1 }), ...deretMainan(E.bola, "bs", BOLA3, 26)),
      tambah("Tanpa", emo("mt", 250, 130, E.mata, 28)),
      tambah("tiga.", ...orang("ig", 274, 178, E.igil, "Igil"), teks("a3", 150, 184, "3", 26, W.merah)),
    ),
    k(
      SUARA_E2,
      bersih(0),
      tambah(0, judul("Titik di dadu"), ...kartuTitik("dd", 110, 40, 5, 80)),
      sorotkan("sekilas.", ...idSemua("dd-t", 5)),
      tambah("lima", teks("a5", 150, 150, "5", 28, W.merah)),
    ),
    k(
      SUARA_E3,
      bersih(0),
      tambah(0, judul("Sedikit atau banyak?"), ...kartuTitik("sd", 30, 50, 3, 70), teks("sl", 65, 142, "sekilas", 9, W.hijau)),
      tambah("banyak,", ...kartuTitik("bn", 190, 46, 8, 80)),
      tambah("hitung", teks("bl", 230, 146, "hitung satu-satu", 8.6, W.merah)),
    ),
  ],
};

/* ------------------------------ 6. Laci balok sepuluh kotak ------------------------------ */
const SUARA_F1 = "Kaka membawa laci sepuluh kotak. Isi satu kotak dengan satu balok. Satu, dua, tiga, empat, lima.";
const SUARA_F2 = "Enam, tujuh, delapan, sembilan, sepuluh. Penuh!";
const SUARA_F3 = "Ada sepuluh balok. Sepuluh ditulis dengan angka satu dan nol.";
const LACI = { x: 85, y: 46, sel: 26 };
const pusatSel = (i: number): Titik => ({ x: LACI.x + (i % 5) * LACI.sel + LACI.sel / 2, y: LACI.y + Math.floor(i / 5) * LACI.sel + LACI.sel / 2 });
const LANTAI_BALOK: Titik[] = Array.from({ length: 10 }, (_, i) => ({ x: 34 + i * 26, y: 176 - (i % 2) * 8 }));
const isiLaci = (suara: string, kata: string[], dari: number, setelah?: string) => {
  const pos = urutKata(suara, kata, setelah);
  return pos.flatMap((p, n) => {
    const i = dari + n;
    const c = pusatSel(i);
    return [ubah(p, { id: `bb${i}`, x: c.x - 8, y: c.y - 8 }), i === 0 ? tambah(p, teks("hc", 150, 136, "1", 24, W.merah)) : ubah(p, { id: "hc", isi: String(i + 1) })];
  });
};

export const ADEGAN_SEPULUH: AdeganStory = {
  id: "sampai-sepuluh",
  judul: "Menghitung balok sampai sepuluh",
  sumber: "Materi: menghitung sampai sepuluh",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_F1,
      tambah(0, judul("Laci sepuluh kotak"), ...orang("kk", 40, 90, E.kaka, "Kaka"), ...LANTAI_BALOK.map((p, i) => balok(`bb${i}`, p.x, p.y, i, 16, { z: 1 }))),
      tambah("laci", ...bingkai("lc", LACI.x, LACI.y, 0, LACI.sel)),
      tambah("sepuluh", teks("t10", 252, 82, "10 kotak", 11, W.merah)),
      ...isiLaci(SUARA_F1, KATA_ANGKA.slice(0, 5), 0, "balok."),
    ),
    k(SUARA_F2, ...isiLaci(SUARA_F2, KATA_ANGKA.slice(5), 5)),
    k(
      SUARA_F3,
      hapus(0, "hc"),
      tambah("Ada", ...kartu("s10", 70, 126, 130, 30, W.emas, ["Ada 10 balok"], 12)),
      tambah("ditulis", teks("d10", 248, 146, "1 dan 0", 11, W.biru)),
      sorotkan("nol.", ...idSemua("bb", 10)),
    ),
  ],
};

/* ------------------------------ 7. Nol: kotak kereta kosong ------------------------------ */
const SUARA_G1 = "Igil membuka kotak kereta api. Lho, kotaknya kosong!";
const SUARA_G2 = "Keretanya sedang diperbaiki Ayah. Tidak ada kereta, jadi banyaknya nol.";
const SUARA_G3 = "Nol artinya tidak ada. Angka nol ditulis bulat seperti telur.";

export const ADEGAN_NOL: AdeganStory = {
  id: "nol",
  judul: "Nol: kotak yang kosong",
  sumber: "Materi: bilangan nol",
  latar: "#FFF1F2",
  ketukan: [
    k(
      SUARA_G1,
      tambah(0, judul("Kotak kereta api"), ...orang("ig", 40, 150, E.igil, "Igil")),
      tambah("kotak", ...keranjang("kb", 110, 90, 120, 60), emo("stk", 214, 144, E.kereta, 14)),
      tambah("kosong!", teks("ko", 170, 80, "kosong", 12, W.merah), emo("tn", 64, 116, E.tanya, 18)),
    ),
    k(
      SUARA_G2,
      hapus(0, "tn"),
      tambah("Keretanya", emo("kt", 208, 60, E.kereta, 24)),
      tambah("diperbaiki", emo("al", 244, 60, E.alat, 22)),
      sorotkan("Tidak", "kb"),
      tambah("nol.", teks("nl", 170, 136, "0", 30, W.merah)),
    ),
    k(
      SUARA_G3,
      hapus(0, "kt", "al"),
      tambah("artinya", ...kartu("na", 70, 172, 160, 22, W.emas, ["nol = tidak ada"], 10)),
      tambah("ditulis", ...tulisAngka("z", 20, 36, "0", 1)),
      tambah("telur.", emo("tl", 70, 66, "\u{1F95A}", 24)),
    ),
  ],
};

/* ------------------------------ 8. Membaca dan menulis angka ------------------------------ */
const SUARA_H1 = "Kaka membuat kartu angka. Nol, satu, dua, tiga, empat, lima.";
const SUARA_H2 = "Lalu enam, tujuh, delapan, sembilan, sepuluh.";
const SUARA_I1 = "Igil menulis angka untuk rak mobil. Angka lima: garis atas, turun, lalu melengkung.";
const SUARA_I2 = "Rak boneka diberi angka empat: garis tegak, miring, lalu mendatar.";
const SUARA_I3 = "Laci balok diberi angka sepuluh. Satu di depan, nol di belakang.";
const NAMA = ["nol", ...KATA_ANGKA];
const WARNA_KARTU = [W.merahMuda, W.langit, W.hijauMuda, W.krem, W.pink, W.lavender];
const posisiKartu = (i: number) => (i < 6 ? { x: 12 + i * 46, y: 32 } : { x: 12 + (i - 6) * 46, y: 102 });
const kartuKe = (i: number) => kartuAngka(`r${i}`, posisiKartu(i).x, posisiKartu(i).y, String(i), WARNA_KARTU[i % 6], 40, 36, 22);
const namaKe = (i: number) => teks(`rn${i}`, posisiKartu(i).x + 20, posisiKartu(i).y + 48, NAMA[i], 8, W.biru);
const pos1 = urutKata(SUARA_H1, NAMA.slice(0, 6), "angka.");
const pos2 = urutKata(SUARA_H2, NAMA.slice(6));

export const ADEGAN_BACA_TULIS: AdeganStory = {
  id: "baca-tulis",
  judul: "Membaca dan menulis angka",
  sumber: "Materi: membaca dan menulis angka",
  latar: "#FFFBEB",
  ketukan: [
    k(SUARA_H1, tambah(0, judul("Kartu angka nol sampai sepuluh")), ...pos1.map((p, i) => tambah(p, ...kartuKe(i), namaKe(i)))),
    k(SUARA_H2, ...pos2.map((p, i) => tambah(p, ...kartuKe(i + 6), namaKe(i + 6))), tambah("sepuluh.", emo("kk", 270, 140, E.kaka, 26))),
    k(
      SUARA_I1,
      bersih(0),
      tambah(0, judul("Angka lima"), ...deretMainan(E.mobil, "wm", [50, 100, 150, 200, 250].map((x) => ({ x, y: 56 })), 20)),
      tambah("lima:", ...tulisAngka("w", 132, 78, "5", 1.6)),
      tambah("melengkung.", teks("wt", 150, 178, "lima", 14, W.ungu)),
    ),
    k(
      SUARA_I2,
      bersih(0),
      tambah(0, judul("Angka empat"), ...deretMainan(E.boneka, "wo", [75, 125, 175, 225].map((x) => ({ x, y: 56 })), 20)),
      tambah("empat:", ...tulisAngka("w", 128, 78, "4", 1.6)),
      tambah("mendatar.", teks("wt", 150, 178, "empat", 14, W.ungu)),
    ),
    k(
      SUARA_I3,
      bersih(0),
      tambah(0, judul("Angka sepuluh"), ...Array.from({ length: 10 }, (_, i) => balok(`wb${i}`, 33 + i * 26, 50, i, 14))),
      tambah("sepuluh.", ...tulisAngka("w", 112, 74, "10", 1.6)),
      tambah("belakang.", teks("wt", 150, 178, "10 dibaca sepuluh", 13, W.ungu)),
    ),
  ],
};
