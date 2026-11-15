import type { AdeganStory, Obj } from "./logika-story";
import { BIRU_BENDA, KUNING, W, bulat, deret, emo, garis, ikatan, judul, kartu, keranjang, teks, type Titik } from "./k1b1d-gambar";
import { bersih, hapus, hitungAksi, idx, k, sorotkan, tambah, ubah } from "./k1b1d-bantu";

const OWL = "\u{1F989}";

/* ------------------------------ 1. Bola Upe dan Wei digabungkan ------------------------------ */
const SUARA_G1 = "Upe membawa bola hijau. Kita hitung bola milik Upe. Satu, dua, tiga.";
const SUARA_G2 = "Wei membawa bola merah. Kita hitung bola milik Wei. Satu, dua, tiga, empat.";
const SUARA_G3 = "Sekarang Upe dan Wei memasukkan semua bolanya ke satu keranjang besar. Bolanya bergabung.";
const SUARA_G4 = "Tiga bola hijau dan empat bola merah digabung menjadi satu kelompok yang utuh.";
const SUARA_G5 = "Kita periksa dengan menghitung semuanya. Satu, dua, tiga, empat, lima, enam, tujuh. Ada tujuh bola.";
const SUARA_G6 = "Dua bagian bisa digabung menjadi satu bilangan utuh. Tiga dan empat menjadi tujuh.";
const PH: Titik[] = [40, 72, 104].map((x) => ({ x, y: 84 }));
const PR: Titik[] = [170, 200, 230, 260].map((x) => ({ x, y: 84 }));
const PK: Titik[] = Array.from({ length: 7 }, (_, i) => ({ x: 94 + 19 * i, y: 152 }));
const bolaH = (i: number): Obj => bulat(`bh${i}`, PH[i].x, PH[i].y, 11, W.hijau, W.biru, { tebal: 2 });
const bolaM = (i: number): Obj => bulat(`br${i}`, PR[i].x, PR[i].y, 11, W.merah, W.biru, { tebal: 2 });
const LABEL_G = [...[0, 1, 2].map((i) => `bhn${i}`), ...[0, 1, 2, 3].map((i) => `brn${i}`)];

export const ADEGAN_BOLA: AdeganStory = {
  id: "gabung-bola",
  judul: "Bola Upe dan Wei digabungkan",
  sumber: "Materi: bola Upe dan Wei",
  latar: "#F0F9FF",
  ketukan: [
    k(SUARA_G1, tambah(0, judul("Bola Upe dan Wei"), teks("nu", 72, 50, "bola Upe", 9, W.hijau), ...[0, 1, 2].map(bolaH)), ...hitungAksi(SUARA_G1, "bh", PH, "Upe.")),
    k(SUARA_G2, hapus(0, "tg"), tambah(0, teks("nw", 215, 50, "bola Wei", 9, W.merah), ...[0, 1, 2, 3].map(bolaM)), ...hitungAksi(SUARA_G2, "br", PR, "Wei.")),
    k(
      SUARA_G3,
      hapus(0, "tg", "nu", "nw", ...LABEL_G),
      tambah("keranjang", ...keranjang("kb", 80, 140, 140, 44, { z: -1 })),
      ubah("memasukkan", ...[0, 1, 2].map((i) => ({ id: `bh${i}`, x: PK[i].x, y: PK[i].y, r: 9 })), ...[0, 1, 2, 3].map((i) => ({ id: `br${i}`, x: PK[i + 3].x, y: PK[i + 3].y, r: 9 }))),
    ),
    k(SUARA_G4, tambah("Tiga", ...kartu("gk", 60, 34, 180, 28, W.emas, ["3 dan 4 jadi satu"], 11)), sorotkan("utuh.", "kb")),
    k(SUARA_G5, ubah("menghitung", { id: "gk-t0", isi: "3 dan 4 jadi 7" }), ...hitungAksi(SUARA_G5, "hk", PK, "semuanya.")),
    k(SUARA_G6, hapus(0, "tg", ...PK.map((_, i) => `hkn${i}`)), tambah("Dua", emo("ow", 262, 100, OWL, 30)), tambah("Tiga", teks("g7", 150, 108, "7", 34, W.merah))),
  ],
};

/* ------------------------------ 2. Ikatan bilangan tujuh ------------------------------ */
const SUARA_I1 = "Sekarang kita gambar bola tadi dalam ikatan bilangan. Lingkaran bawah kiri untuk bola hijau, dan lingkaran bawah kanan untuk bola merah.";
const SUARA_I2 = "Kalau dua bagian itu digabung, kita mendapat lingkaran yang utuh. Tiga dan empat digabung menjadi tujuh.";
const SUARA_I3 = "Sekarang kita balik. Kita mulai dari yang utuh, yaitu tujuh. Tujuh dipisahkan menjadi dua bagian, yaitu tiga dan empat.";
const SUARA_I4 = "Ikatan ini bisa dibaca dari dua arah. Dari bawah ke atas, bagian digabung. Dari atas ke bawah, yang utuh dipisah.";
const SUARA_I5 = "Ikatan bilangan membantu kita melihat bagian dan yang utuh dengan cepat. Kamu hebat!";

export const ADEGAN_IKATAN: AdeganStory = {
  id: "ikatan-tujuh",
  judul: "Ikatan bilangan tujuh",
  sumber: "Materi: ikatan bilangan tujuh",
  latar: "#FAF5FF",
  ketukan: [
    k(
      SUARA_I1,
      tambah(0, judul("Ikatan bilangan")),
      tambah("hijau,", ...ikatan("it", 150, 62, ["7", "3", "4"], ["a"])),
      tambah("merah.", ...ikatan("it", 150, 62, ["7", "3", "4"], ["b"])),
    ),
    k(SUARA_I2, tambah("utuh.", ...ikatan("it", 150, 62, ["7", "3", "4"], ["u"])), sorotkan("digabung,", "it-a", "it-b")),
    k(SUARA_I3, sorotkan("utuh,", "it-u"), tambah("dipisahkan", ...kartu("ik", 50, 156, 200, 28, W.emas, ["7 jadi 3 dan 4"], 11))),
    k(
      SUARA_I4,
      tambah("bawah", { id: "pa", t: "panah", x: 258, y: 140, x2: 0, y2: -70, warna: W.hijau, tebal: 3 }, teks("pat", 258, 156, "gabung", 9, W.hijau)),
      tambah("atas", { id: "pb2", t: "panah", x: 42, y: 56, x2: 0, y2: 70, warna: W.merah, tebal: 3 }, teks("pbt", 42, 44, "pisah", 9, W.merah)),
    ),
    k(SUARA_I5, tambah("hebat!", emo("ow", 150, 190, OWL, 24))),
  ],
};

/* ------------------------------ 3. Delapan mobil, banyak pasangan ------------------------------ */
const SUARA_M1 = "Upe mempunyai delapan mobil-mobilan. Upe ingin memisahkannya menjadi dua kelompok.";
const SUARA_M2 = "Hitung dulu semuanya. Satu, dua, tiga, empat, lima, enam, tujuh, delapan.";
const SUARA_M3 = "Mula-mula Upe menaruh tiga mobil di kiri dan lima mobil di kanan.";
const SUARA_M4 = "Lalu Upe menemukan pasangan lain, yaitu dua dan enam. Garis pemisahnya digeser.";
const SUARA_M5 = "Ada lagi satu dan tujuh. Satu mobil di kiri, dan tujuh mobil di kanan.";
const SUARA_M6 = "Yang terakhir, empat dan empat. Kedua kelompoknya sama banyak.";
const SUARA_M7 = "Delapan mobil yang sama bisa dipisahkan dengan banyak cara. Pasangannya banyak, tetapi yang utuh tetap delapan.";
const SUARA_M8 = "Hebat! Kamu sudah menemukan empat pasangan bilangan delapan.";
const PM: Titik[] = Array.from({ length: 8 }, (_, i) => ({ x: 30 + 34 * i, y: 92 }));
const garisBagi = (a: number) => 30 + 34 * (a - 1) + 17;
const LABEL_M = Array.from({ length: 8 }, (_, i) => `mbn${i}`);
const pasangMobil = (a: number, b: number, kiri: string) => [
  ubah(kiri, { id: "dv", x: garisBagi(a) }, { id: "tl", x: (14 + garisBagi(a)) / 2, isi: String(a) }, { id: "tr", x: (garisBagi(a) + 286) / 2, isi: String(b) }),
];

export const ADEGAN_MOBIL: AdeganStory = {
  id: "mobil-upe",
  judul: "Delapan mobil Upe dan banyak pasangan",
  sumber: "Materi: delapan mobil Upe",
  latar: "#FEFCE8",
  ketukan: [
    k(SUARA_M1, tambah(0, judul("Delapan mobil Upe")), tambah("mobil-mobilan.", ...PM.map((p, i) => emo(`mb${i}`, p.x, p.y, "\u{1F697}", 22)))),
    k(SUARA_M2, ...hitungAksi(SUARA_M2, "mb", PM, "semuanya.")),
    k(
      SUARA_M3,
      hapus(0, "tg", ...LABEL_M),
      tambah("menaruh", garis("dv", garisBagi(3), 58, 0, 80, W.biru, 3)),
      tambah("tiga", teks("tl", 64, 156, "3", 20, W.merah)),
      tambah("lima", teks("tr", 200, 156, "5", 20, W.merah)),
      tambah("kanan.", teks("p1", 40, 188, "3 dan 5", 9, W.ungu)),
    ),
    k(SUARA_M4, ...pasangMobil(2, 6, "digeser."), tambah("enam.", teks("p2", 110, 188, "2 dan 6", 9, W.ungu))),
    k(SUARA_M5, ...pasangMobil(1, 7, "tujuh."), tambah("tujuh.", teks("p3", 180, 188, "1 dan 7", 9, W.ungu))),
    k(SUARA_M6, ...pasangMobil(4, 4, "terakhir,"), tambah("empat.", teks("p4", 250, 188, "4 dan 4", 9, W.ungu))),
    k(SUARA_M7, tambah("utuh", ...kartu("m7", 50, 28, 200, 24, W.emas, ["yang utuh tetap 8"], 10))),
    k(SUARA_M8, tambah("Hebat!", emo("ow", 262, 140, OWL, 28)), sorotkan("empat", "p1", "p2", "p3", "p4")),
  ],
};

/* ------------------------------ 4. Pasangan bilangan enam ------------------------------ */
const SUARA_E1 = "Sekarang ada enam kancing di atas meja. Satu, dua, tiga, empat, lima, enam.";
const SUARA_E2 = "Kita pisahkan kancing menurut warna. Satu kancing biru dan lima kancing kuning.";
const SUARA_E3 = "Dua kancing biru dan empat kancing kuning. Enam tetap enam.";
const SUARA_E4 = "Tiga kancing biru dan tiga kancing kuning. Kedua bagiannya sama banyak.";
const SUARA_E5 = "Empat kancing biru dan dua kancing kuning juga pasangan enam. Urutannya boleh dibalik.";
const SUARA_E6 = "Jadi enam punya banyak pasangan, yaitu satu dan lima, dua dan empat, tiga dan tiga.";
const PC: Titik[] = Array.from({ length: 6 }, (_, i) => ({ x: 45 + 42 * i, y: 90 }));
const warnaKancing = (a: number) => PC.map((_, i) => ({ id: `kc${i}`, warna: i < a ? BIRU_BENDA : KUNING }));
const LABEL_E = PC.map((_, i) => `kcn${i}`);

export const ADEGAN_ENAM: AdeganStory = {
  id: "pasangan-enam",
  judul: "Pasangan bilangan enam",
  sumber: "Materi: pasangan bilangan enam",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_E1, tambah(0, judul("Enam kancing"), ...PC.map((p, i) => bulat(`kc${i}`, p.x, p.y, 13, KUNING, W.biru, { tebal: 2 }))), ...hitungAksi(SUARA_E1, "kc", PC, "meja.")),
    k(SUARA_E2, hapus(0, "tg", ...LABEL_E), ubah("warna.", ...warnaKancing(1)), tambah("Satu", teks("pe", 150, 150, "1 dan 5", 22, W.merah))),
    k(SUARA_E3, ubah("Dua", ...warnaKancing(2), { id: "pe", isi: "2 dan 4" })),
    k(SUARA_E4, ubah("Tiga", ...warnaKancing(3), { id: "pe", isi: "3 dan 3" }), sorotkan("sama", "kc0", "kc1", "kc2", "kc3", "kc4", "kc5")),
    k(SUARA_E5, ubah("Empat", ...warnaKancing(4), { id: "pe", isi: "4 dan 2" })),
    k(
      SUARA_E6,
      hapus(0, "pe"),
      tambah(idx(SUARA_E6, "lima"), teks("e1", 70, 140, "1 dan 5", 14, W.ungu)),
      tambah(idx(SUARA_E6, "empat"), teks("e2", 150, 140, "2 dan 4", 14, W.ungu)),
      tambah(idx(SUARA_E6, "tiga", 2), teks("e3", 230, 140, "3 dan 3", 14, W.ungu)),
    ),
  ],
};

/* ------------------------------ 5. Pohon pasangan dua tingkat ------------------------------ */
const SUARA_P1 = "Malosi mempunyai delapan kelereng. Kita hitung dulu. Satu, dua, tiga, empat, lima, enam, tujuh, delapan.";
const SUARA_P2 = "Malosi memisahkan kelerengnya menjadi kelompok lima dan kelompok tiga.";
const SUARA_P3 = "Kita gambar dengan pohon pasangan. Pohon ini dimulai dari bilangan yang utuh, yaitu delapan.";
const SUARA_P4 = "Delapan bercabang menjadi dua bagian, yaitu lima dan tiga.";
const SUARA_P5 = "Malosi memisahkan lagi kelompok lima. Lima menjadi dua dan tiga.";
const SUARA_P6 = "Lalu kelompok tiga dipisahkan lagi. Tiga menjadi dua dan satu.";
const SUARA_P7 = "Igil memuji Malosi yang teliti. Pohon pasangan dua tingkat sudah selesai. Hebat!";
const PL: Titik[] = Array.from({ length: 8 }, (_, i) => ({ x: 30 + 34 * i, y: 84 }));
const LABEL_P = PL.map((_, i) => `kln${i}`);
const simpul = (id: string, x: number, y: number, isi: string, warna: string = W.krem): Obj[] => [bulat(id, x, y, 16, warna, W.biru, { tebal: 2 }), teks(`${id}t`, x, y + 7, isi, 20, W.merah)];
const cabang = (id: string, x1: number, y1: number, x2: number, y2: number): Obj => garis(id, x1, y1 + 15, x2 - x1, y2 - y1 - 30, W.biru, 2);

export const ADEGAN_POHON: AdeganStory = {
  id: "pohon-pasangan",
  judul: "Pohon pasangan dua tingkat",
  sumber: "Materi: pohon pasangan kelereng",
  latar: "#F5F3FF",
  ketukan: [
    k(SUARA_P1, tambah(0, judul("Kelereng Malosi"), ...deret("kelereng", "kl", PL, 18)), ...hitungAksi(SUARA_P1, "kl", PL, "dulu.")),
    k(
      SUARA_P2,
      hapus(0, "tg", ...LABEL_P),
      tambah("memisahkan", garis("dv", 183, 56, 0, 64, W.biru, 3)),
      tambah("lima", teks("p5", 98, 150, "5", 22, W.merah)),
      tambah("tiga.", teks("p3", 234, 150, "3", 22, W.merah)),
    ),
    k(SUARA_P3, bersih(0), tambah(0, judul("Pohon pasangan")), tambah("delapan.", ...simpul("t8", 150, 46, "8", W.emas))),
    k(SUARA_P4, tambah("bercabang", cabang("c1", 150, 46, 80, 104), cabang("c2", 150, 46, 220, 104)), tambah("lima", ...simpul("t5", 80, 104, "5", W.hijauMuda)), tambah("tiga.", ...simpul("t3", 220, 104, "3", W.merahMuda))),
    k(SUARA_P5, tambah("memisahkan", cabang("c3", 80, 104, 40, 162), cabang("c4", 80, 104, 120, 162)), tambah("dua", ...simpul("t2a", 40, 162, "2")), tambah("tiga.", ...simpul("t3a", 120, 162, "3"))),
    k(SUARA_P6, tambah("dipisahkan", cabang("c5", 220, 104, 180, 162), cabang("c6", 220, 104, 260, 162)), tambah("dua", ...simpul("t2b", 180, 162, "2")), tambah("satu.", ...simpul("t1b", 260, 162, "1"))),
    k(SUARA_P7, tambah("Igil", emo("ow", 150, 186, OWL, 28)), sorotkan("selesai.", "t8", "t5", "t3")),
  ],
};
