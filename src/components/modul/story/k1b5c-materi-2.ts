import type { AdeganStory } from "./logika-story";
import { W, emo, judul, kartu, kartuAngka, kotak, kubus, teks } from "./k1b5c-gambar";
import { bersih, hapus, idx, k, redamkan, rumus, sorotkan, tambah, ubah } from "./k1b5c-bantu";

const ANAK = "\u{1F9D2}";

/* ------------------------------ 1. Membaca bilangan dua angka ------------------------------ */
/** Tiga bilangan yang dibaca: [bilangan, puluhan, satuan]. */
export const BACA: [number, number, number][] = [[12, 1, 2], [18, 1, 8], [17, 1, 7]];
const barisBaca = (i: number) => 40 + 46 * i;

const SUARA_F1 = "Sekarang kita belajar membaca bilangan dengan nilai tempat. Lihat bilangan dua belas.";
const SUARA_F2 = "Angka satu di kiri berarti satu puluhan. Angka dua di kanan berarti dua satuan. Jadi dua belas adalah satu puluhan dan dua satuan.";
const SUARA_F3 = "Sekarang bilangan delapan belas. Angka satu di kiri berarti satu puluhan, dan angka delapan di kanan berarti delapan satuan.";
const SUARA_F4 = "Bilangan tujuh belas juga begitu. Satu puluhan dan tujuh satuan. Ucapkan lagi mengikuti suara guru: tujuh belas.";
const uraian = (i: number) => teks(`bd${i}`, 190, barisBaca(i) + 24, `${BACA[i][1]} puluhan, ${BACA[i][2]} satuan`, 10.4, W.merah);

export const ADEGAN_BACA: AdeganStory = {
  id: "baca-angka",
  judul: "Membaca bilangan dua angka",
  sumber: "Materi: membaca bilangan dua angka",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_F1, bersih(0), tambah(0, judul("Membaca bilangan")), tambah("dua", ...kartuAngka("bn0", 24, barisBaca(0), "12", W.krem, 64, 36, 24))),
    k(SUARA_F2, sorotkan("Angka", "bn0-k"), redamkan("Jadi", "bn0-k"), tambah("Jadi", uraian(0))),
    k(SUARA_F3, tambah("delapan", ...kartuAngka("bn1", 24, barisBaca(1), "18", W.krem, 64, 36, 24)), tambah(idx(SUARA_F3, "satuan"), uraian(1))),
    k(SUARA_F4, tambah("tujuh", ...kartuAngka("bn2", 24, barisBaca(2), "17", W.krem, 64, 36, 24)), tambah("satuan.", uraian(2)), tambah("Ucapkan", emo("sg", 150, 190, "\u{1F50A}", 24))),
  ],
};

/* ------------------------------ 2. Angka sama, nilai berbeda ------------------------------ */
const SUARA_G1 = "Kira melihat bilangan sebelas. Ada dua angka satu yang berdampingan.";
const SUARA_G2 = "Tetapi dua angka satu itu nilainya berbeda! Perhatikan baik-baik, ya.";
const SUARA_G3 = "Angka satu di sebelah kiri berada di tempat puluhan, jadi nilainya sepuluh.";
const SUARA_G4 = "Angka satu di sebelah kanan berada di tempat satuan, jadi nilainya satu.";
const SUARA_G5 = "Angka yang sama bisa punya nilai berbeda, tergantung tempatnya. Sepuluh ditambah satu sama dengan sebelas.";

export const ADEGAN_SAMA: AdeganStory = {
  id: "angka-sama",
  judul: "Angka sama, nilai berbeda",
  sumber: "Materi: angka sama, nilai berbeda",
  latar: "#FDF4FF",
  ketukan: [
    k(
      SUARA_G1,
      bersih(0),
      tambah(0, judul("Angka yang sama")),
      tambah("Kira", emo("a-Kira", 36, 56, ANAK, 26), teks("n-Kira", 36, 70, "Kira", 8.4)),
      tambah("sebelas.", teks("d1", 115, 104, "1", 56, W.merah), teks("d2", 185, 104, "1", 56, W.merah)),
    ),
    k(SUARA_G2, sorotkan(0, "d1", "d2"), tambah("berbeda!", emo("tn", 150, 52, "\u{2753}", 26))),
    k(SUARA_G3, hapus(0, "tn"), redamkan(0, "d2"), tambah("puluhan,", ...kartu("kp", 40, 128, 100, 40, W.hijauMuda, ["puluhan", "bernilai 10"], 10))),
    k(SUARA_G4, redamkan(0, "d1"), sorotkan(0, "d2"), tambah("satuan,", ...kartu("ks", 160, 128, 100, 40, W.pink, ["satuan", "bernilai 1"], 10))),
    k(SUARA_G5, redamkan(0, "d2"), ...rumus(SUARA_G5, "rs", 190, 10, 1, undefined, 18)),
  ],
};

/* ------------------------------ 3. Daftar bilangan sepuluh sampai dua puluh ------------------------------ */
const barisDaftar = (n: number) => teks(`rw${n}`, 150, 40 + 14 * (n - 10), `${n}: ${Math.floor(n / 10)} puluhan, ${n % 10} satuan`, 9, W.biru);

const SUARA_H1 = "Mari lihat bilangan dari sepuluh sampai dua puluh. Sepuluh adalah satu puluhan dan nol satuan. Sebelas adalah satu puluhan dan satu satuan.";
const SUARA_H2 = "Dua belas adalah satu puluhan dan dua satuan. Tiga belas adalah satu puluhan dan tiga satuan. Empat belas, lima belas, dan enam belas juga begitu.";
const SUARA_H3 = "Tujuh belas, delapan belas, dan sembilan belas juga begitu. Satu puluhan, dan satuannya bertambah satu demi satu.";
const SUARA_H4 = "Dua puluh adalah dua puluhan dan nol satuan. Pada dua puluh, angka dua ada di kiri, dan angka nol ada di kanan.";

export const ADEGAN_DAFTAR: AdeganStory = {
  id: "daftar-nilai",
  judul: "Bilangan sepuluh sampai dua puluh",
  sumber: "Materi: bilangan sepuluh sampai dua puluh",
  latar: "#EFF6FF",
  ketukan: [
    k(SUARA_H1, bersih(0), tambah(0, judul("Dari 10 sampai 20")), tambah("Sepuluh@2", barisDaftar(10)), tambah("Sebelas", barisDaftar(11))),
    k(
      SUARA_H2,
      tambah(idx(SUARA_H2, "dua"), barisDaftar(12)),
      tambah(idx(SUARA_H2, "tiga"), barisDaftar(13)),
      tambah(idx(SUARA_H2, "empat"), barisDaftar(14)),
      tambah(idx(SUARA_H2, "lima"), barisDaftar(15)),
      tambah(idx(SUARA_H2, "enam"), barisDaftar(16)),
    ),
    k(SUARA_H3, tambah(idx(SUARA_H3, "tujuh"), barisDaftar(17)), tambah(idx(SUARA_H3, "delapan"), barisDaftar(18)), tambah(idx(SUARA_H3, "sembilan"), barisDaftar(19))),
    k(SUARA_H4, tambah(0, barisDaftar(20)), sorotkan(0, "rw20")),
  ],
};

/* ------------------------------ 4. Tukar sepuluh kubus dengan satu batang ------------------------------ */
export const ID_KUBUS = Array.from({ length: 12 }, (_, i) => `kb${i}`);
export const letakKubus = (i: number): { x: number; y: number } => ({ x: 50 + 22 * (i % 6), y: 70 + 22 * Math.floor(i / 6) });

const SUARA_I1 = "Ada dua belas kubus kecil di layar. Setiap kubus kecil adalah satu satuan.";
const SUARA_I2 = "Kalau ada sepuluh kubus satuan, kita boleh menukarnya dengan satu batang puluhan. Ketuk sepuluh kubus itu.";
const SUARA_I3 = "Tukar! Sepuluh kubus satuan berubah menjadi satu batang puluhan. Lihat, batangnya muncul.";
const SUARA_I4 = "Sekarang ada satu batang puluhan dan dua kubus satuan. Satu puluhan dan dua satuan sama dengan dua belas.";
const SUARA_I5 = "Kita juga bisa menukar sebaliknya. Satu batang puluhan bisa menjadi sepuluh kubus satuan lagi. Nilainya tetap sama.";

export const ADEGAN_TUKAR: AdeganStory = {
  id: "tukar-sepuluh",
  judul: "Tukar sepuluh kubus",
  sumber: "Materi: tukar sepuluh kubus",
  latar: "#ECFEFF",
  ketukan: [
    k(SUARA_I1, bersih(0), tambah(0, judul("Tukar sepuluh")), tambah("kubus", ...ID_KUBUS.map((id, i) => kubus(id, letakKubus(i).x, letakKubus(i).y)))),
    k(SUARA_I2, tambah("sepuluh", teks("t10", 100, 52, "10", 12, W.merah)), sorotkan("Ketuk", ...ID_KUBUS.slice(0, 10))),
    k(
      SUARA_I3,
      hapus("berubah", "t10", ...ID_KUBUS.slice(0, 10)),
      tambah("batang", kotak("bt", 224, 58, 20, 92, W.hijauMuda, W.biru, { rx: 3, tebal: 1.8 }), teks("bt-t", 234, 112, "10", 14, W.biru)),
    ),
    k(
      SUARA_I4,
      tambah("puluhan", teks("l1", 234, 166, "1 puluhan", 10, W.merah)),
      tambah(idx(SUARA_I4, "satuan", 1), teks("l2", 149, 118, "2 satuan", 10, W.merah)),
      sorotkan("batang", "bt"),
      redamkan("Satu@2", "bt"),
    ),
    k(
      SUARA_I5,
      bersih(0),
      tambah(0, judul("Tukar bolak-balik")),
      tambah("sebaliknya.", emo("sw", 150, 100, "\u{1F501}", 30)),
      tambah("Nilainya", ...kartu("kz", 20, 150, 260, 30, W.krem, ["1 batang puluhan = 10 kubus satuan"], 9.4)),
    ),
  ],
};

/* ------------------------------ 5. Dua puluh ------------------------------ */
export const ID_KUBUS20 = Array.from({ length: 20 }, (_, i) => `ku${i}`);
export const letakKubus20 = (i: number): { x: number; y: number } => ({ x: 40 + 22 * (i % 10), y: 70 + 34 * Math.floor(i / 10) });

const SUARA_J1 = "Sekarang ada dua puluh kubus. Kita hitung sepuluh kubus dulu. Itu satu puluhan.";
const SUARA_J2 = "Ada lagi sepuluh kubus. Itu satu puluhan yang kedua. Jadi ada dua puluhan.";
const SUARA_J3 = "Tidak ada kubus yang tersisa, jadi satuannya nol. Sepuluh ditambah sepuluh sama dengan dua puluh.";
const SUARA_J4 = "Perhatikan, saat satuannya sudah sepuluh, kita gabung menjadi satu puluhan baru. Itu sebabnya setelah sembilan belas datang dua puluh.";

export const ADEGAN_DUA_PULUH: AdeganStory = {
  id: "dua-puluh",
  judul: "Dua puluh kubus",
  sumber: "Materi: dua puluh kubus",
  latar: "#FFF1F2",
  ketukan: [
    k(
      SUARA_J1,
      bersih(0),
      tambah(0, judul("Dua puluh kubus")),
      tambah("kubus.", ...ID_KUBUS20.map((id, i) => kubus(id, letakKubus20(i).x, letakKubus20(i).y))),
      tambah("sepuluh", teks("t10", 145, 60, "10", 12, W.merah)),
      sorotkan("sepuluh", ...ID_KUBUS20.slice(0, 10)),
      tambah("puluhan.", teks("p1", 145, 94, "1 puluhan", 9, W.merah)),
    ),
    k(
      SUARA_J2,
      redamkan(0, ...ID_KUBUS20.slice(0, 10)),
      sorotkan("sepuluh", ...ID_KUBUS20.slice(10)),
      tambah("puluhan", teks("p2", 145, 128, "1 puluhan lagi", 9, W.merah)),
      tambah(idx(SUARA_J2, "dua"), teks("p3", 150, 152, "2 puluhan", 14, W.merah)),
    ),
    k(SUARA_J3, hapus(0, "t10", "p1", "p2"), redamkan(0, ...ID_KUBUS20.slice(10)), ubah("nol.", { id: "p3", isi: "2 puluhan, 0 satuan", u: 12 }), ...rumus(SUARA_J3, "rd", 182, 10, 10, "nol.")),
    k(
      SUARA_J4,
      bersih(0),
      tambah(0, judul("Setelah sembilan belas")),
      tambah("sembilan", ...kartuAngka("a19", 60, 60, "19", W.krem, 60, 40, 26), teks("u19", 90, 124, "1 puluhan, 9 satuan", 9.4, W.merah)),
      tambah("datang", emo("pk", 150, 90, "\u{27A1}\u{FE0F}", 30), ...kartuAngka("a20", 180, 60, "20", W.hijauMuda, 60, 40, 26), teks("u20", 210, 124, "2 puluhan, 0 satuan", 9.4, W.merah)),
    ),
  ],
};
