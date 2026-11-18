import type { AdeganStory, Obj } from "./logika-story";
import { E, W, WARNA_KEPING, P, bg, emo, garis, judul, kartu, namaBangun, persegi, teks, tokoh, type Titik } from "./k2b3B-gambar";
import { hapus, idx, k, tambah, ubah } from "./k2b3B-bantu";

/*
 * Cerita orisinal IGIL "Papan Puzzle yang Berantakan" (Kelas 2 Bab 3 Sub-Bab B), tengah cerita Taman Bermain Sekolah.
 * Naskah suara dari naskah/story-naskah-k2b3b.md. Bagian ini: mengurai persegi, menyusun dua segitiga, dan menyusun segi enam.
 */
const keping = (id: string, pts: Titik[], i: number, o: Partial<Obj> = {}): Obj => bg(id, pts, WARNA_KEPING[i % WARNA_KEPING.length], { z: 2, ...o });
const garisUrai = (id: string, a: Titik, b: Titik, warna: string = W.merah): Obj => garis(id, a.x, a.y, b.x - a.x, b.y - a.y, warna, 2.8, { gambar: true, z: 5 });

/* ------------------------------ 4. Mengurai persegi ------------------------------ */
const SUARA_U1 = "Mengurai artinya membagi satu bangun menjadi beberapa bentuk yang lebih kecil, kata Nia.";
const SUARA_U2 = "Ia menarik garis miring dari pojok ke pojok, dan persegi itu menjadi dua segitiga.";
const SUARA_U3 = "Garis lurus di tengah membuat dua segi empat. Cara berbeda, hasil berbeda!";
const KOTAK_U = persegi(110, 52, 80);

export const ADEGAN_URAI: AdeganStory = {
  id: "urai-persegi",
  judul: "Mengurai sebuah persegi",
  sumber: "Materi: arti mengurai",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_U1,
      tambah(0, judul("Mengurai Bangun"), ...tokoh("ni", 40, 150, "Nia")),
      tambah(idx(SUARA_U1, "Mengurai"), keping("ut", KOTAK_U, 0, { tebal: 2.4 })),
      tambah(idx(SUARA_U1, "satu"), teks("s1", 150, 160, "1 bangun", 11, W.merah)),
      tambah(idx(SUARA_U1, "beberapa"), ...kartu("ub", 190, 168, 100, 24, W.krem, ["jadi bagian kecil"], 9)),
    ),
    k(
      SUARA_U2,
      hapus(idx(SUARA_U2, "Ia"), "s1", "ub-k", "ub-t0"),
      tambah(idx(SUARA_U2, "garis"), garisUrai("ug0", P(110, 52), P(190, 132))),
      ubah(idx(SUARA_U2, "persegi"), { id: "ut", op: 0.25 }),
      tambah(idx(SUARA_U2, "menjadi"), keping("kp0", [P(110, 52), P(190, 52), P(190, 132)], 1, { x: 16, y: -2 }), keping("kp1", [P(110, 52), P(190, 132), P(110, 132)], 2, { x: -16, y: 2 })),
      tambah(idx(SUARA_U2, "dua"), teks("n0", 160, 160, "2 segitiga", 11, W.merah)),
    ),
    k(
      SUARA_U3,
      hapus(idx(SUARA_U3, "Garis"), "kp0", "kp1", "ug0", "n0"),
      ubah(idx(SUARA_U3, "Garis"), { id: "ut", op: 1 }),
      tambah(idx(SUARA_U3, "lurus"), garisUrai("ug1", P(150, 52), P(150, 132))),
      tambah(idx(SUARA_U3, "membuat"), keping("kq0", [P(110, 52), P(150, 52), P(150, 132), P(110, 132)], 3, { x: -14 }), keping("kq1", [P(150, 52), P(190, 52), P(190, 132), P(150, 132)], 4, { x: 14 })),
      tambah(idx(SUARA_U3, "dua"), teks("n1", 150, 160, "2 segi empat", 11, W.merah)),
      tambah(idx(SUARA_U3, "berbeda!"), emo("ds", 262, 120, E.lampu, 22)),
      hapus(idx(SUARA_U3, "membuat"), "ut"),
    ),
  ],
};

/* ------------------------------ 5. Menyusun dua segitiga ------------------------------ */
const SUARA_S1 = "Sekarang menyusun, artinya menggabungkan beberapa bangun menjadi satu bentuk baru.";
const SUARA_S2 = "Dika menempelkan sisi miring dua segitiga siku-siku yang sama, dan jadilah sebuah persegi.";
const SUARA_S3 = "Chacha menempelkan sisi pendeknya, dan jadilah segitiga yang lebih besar. Cara menyusun memengaruhi hasilnya!";
const SA = [P(110, 50), P(190, 50), P(110, 130)];
const SB = [P(190, 50), P(190, 130), P(110, 130)];

export const ADEGAN_SUSUN: AdeganStory = {
  id: "susun-segitiga",
  judul: "Menyusun dua segitiga",
  sumber: "Materi: arti menyusun",
  latar: "#FFF1F2",
  ketukan: [
    k(
      SUARA_S1,
      tambah(0, judul("Menyusun Bangun")),
      tambah(idx(SUARA_S1, "menyusun,"), keping("kp0", SA, 0, { x: -50 }), keping("kp1", SB, 1, { x: 50 })),
      tambah(idx(SUARA_S1, "menggabungkan"), ...kartu("sk", 40, 160, 220, 26, W.emas, ["banyak bangun, 1 bentuk baru"], 9.4)),
      ubah(idx(SUARA_S1, "satu"), { id: "kp0", x: -22 }, { id: "kp1", x: 22 }),
    ),
    k(
      SUARA_S2,
      hapus(idx(SUARA_S2, "Dika"), "sk-k", "sk-t0"),
      tambah(idx(SUARA_S2, "Dika"), ...tokoh("dk", 40, 170, "Dika")),
      ubah(idx(SUARA_S2, "menempelkan"), { id: "kp0", x: 0 }, { id: "kp1", x: 0 }),
      tambah(idx(SUARA_S2, "dua"), teks("d2", 150, 36, "2 segitiga", 10, W.merah)),
      tambah(idx(SUARA_S2, "persegi."), bg("ht", persegi(110, 50, 80), "none", { tebal: 2.6, z: 5 }), namaBangun("ht", 150, 156, "persegi", 11)),
    ),
    k(
      SUARA_S3,
      hapus(idx(SUARA_S3, "Chacha"), "dk", "dk-n", "d2", "ht", "ht-nm"),
      tambah(idx(SUARA_S3, "Chacha"), ...tokoh("ch", 40, 170, "Chacha")),
      ubah(idx(SUARA_S3, "menempelkan"), { id: "kp0", x: -20, y: 20 }, { id: "kp1", x: 20, y: 20 }),
      ubah(idx(SUARA_S3, "pendeknya,"), { id: "kp0", x: -50, y: 20 }, { id: "kp1", x: -16, y: 20 }),
      tambah(idx(SUARA_S3, "segitiga"), bg("hs2", [P(70, 150), P(150, 150), P(110, 110)], "none", { tebal: 2.6, z: 5 }), namaBangun("hs2", 110, 176, "segitiga besar", 10)),
      tambah(idx(SUARA_S3, "memengaruhi"), emo("pk", 262, 100, E.pikir, 24)),
    ),
  ],
};

/* ------------------------------ 6. Segi enam ------------------------------ */
const SUARA_E1 = "Bagian papan yang hilang berbentuk segi enam yang memanjang.";
const SUARA_E2 = "Chacha menyusun dua segitiga di kiri dan kanan sebuah segi empat, dan pas sekali.";
const SUARA_E3 = "Nia punya cara lain: segitiga di atas dan di bawah segi empat, tetap segi enam.";
const ENAM_LUAR = [P(70, 90), P(110, 60), P(190, 60), P(230, 90), P(190, 120), P(110, 120)];
const SEGIEMPAT = [P(110, 60), P(190, 60), P(190, 120), P(110, 120)];
const TKIRI = [P(110, 60), P(110, 120), P(70, 90)];
const TKANAN = [P(190, 60), P(230, 90), P(190, 120)];

export const ADEGAN_SEGIENAM: AdeganStory = {
  id: "segi-enam",
  judul: "Mengisi lubang segi enam",
  sumber: "Materi: menyusun segi enam",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_E1,
      tambah(0, judul("Lubang Segi Enam"), bg("lb", ENAM_LUAR, "#E2E8F0", { z: 1, putus: true, tebal: 1.8 })),
      tambah(idx(SUARA_E1, "enam"), teks("e6", 150, 150, "6 sisi", 12, W.merah)),
      tambah(idx(SUARA_E1, "memanjang."), garis("pj", 70, 140, 160, 0, W.ungu, 2, { gambar: true, z: 3 }), teks("pjt", 150, 174, "segi enam memanjang", 9, W.ungu)),
    ),
    k(
      SUARA_E2,
      hapus(idx(SUARA_E2, "Chacha"), "pj", "pjt", "e6"),
      tambah(idx(SUARA_E2, "Chacha"), ...tokoh("ch", 40, 166, "Chacha")),
      tambah(idx(SUARA_E2, "dua"), keping("a0", TKIRI, 0, { x: -30 }), keping("a1", TKANAN, 1, { x: 30 }), teks("d2", 240, 150, "2 segitiga", 10, W.merah)),
      tambah(idx(SUARA_E2, "sebuah"), keping("a2", SEGIEMPAT, 2, { y: 40 }), teks("d1", 150, 190, "1 segi empat", 10, W.merah)),
      ubah(idx(SUARA_E2, "pas"), { id: "a0", x: 0 }, { id: "a1", x: 0 }, { id: "a2", y: 0 }),
      tambah(idx(SUARA_E2, "sekali."), emo("ok", 262, 56, E.benar, 20)),
    ),
    k(
      SUARA_E3,
      hapus(idx(SUARA_E3, "Nia"), "ch", "ch-n", "a0", "a1", "a2", "d2", "d1", "ok", "lb"),
      tambah(idx(SUARA_E3, "Nia"), ...tokoh("ni", 40, 166, "Nia"), bg("lb2", [P(150, 46), P(200, 78), P(200, 126), P(150, 158), P(100, 126), P(100, 78)], "#E2E8F0", { z: 1, putus: true, tebal: 1.8 })),
      tambah(idx(SUARA_E3, "atas"), keping("b0", [P(100, 78), P(200, 78), P(150, 46)], 3)),
      tambah(idx(SUARA_E3, "bawah"), keping("b1", [P(100, 126), P(200, 126), P(150, 158)], 4)),
      tambah(idx(SUARA_E3, "segi"), keping("b2", [P(100, 78), P(200, 78), P(200, 126), P(100, 126)], 2)),
      tambah(idx(SUARA_E3, "enam."), namaBangun("b", 150, 180, "tetap segi enam", 10), teks("b6", 250, 100, "6 sisi", 11, W.merah)),
    ),
  ],
};
