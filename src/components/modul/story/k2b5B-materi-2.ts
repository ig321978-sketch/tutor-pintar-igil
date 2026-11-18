import type { AdeganStory } from "./logika-story";
import { E, W, bedeng, bibit, emo, garis, judul, kartu, kotak, panah, rumput, teks, tokoh, tunas } from "./k2b5B-gambar";
import { hapus, idx, k, sorotkan, tambah, ubah } from "./k2b5B-bantu";
import { BD, slot } from "./k2b5B-materi-1";

/*
 * Cerita orisinal IGIL "Bibit untuk Dua Petak" (Kelas 2 Bab 5 Sub-Bab B, setengah dari kumpulan benda), tengah cerita Kebun Sekolah.
 * Naskah suara dari naskah/story-naskah-k2b5b.md. Bagian ini: bukan setengah, pola setengah (Bu Wati dan Dika), dan bilangan ganjil.
 */

/* ------------------------------ 4. Bukan setengah ------------------------------ */
const SUARA_4A = "Empat bibit dan dua bibit di petak tadi memang dua bagian, tetapi tidak sama banyak.";
const SUARA_4B = "Setengah selalu berarti dua bagian yang sama banyak.";
const SUARA_4C = "Dika menegaskan, kalau tidak sama banyak, itu bukan setengah.";
const KIRI4 = [
  { x: 62, y: 70 },
  { x: 86, y: 70 },
  { x: 62, y: 94 },
  { x: 86, y: 94 },
];
const KANAN2 = [
  { x: 218, y: 70 },
  { x: 218, y: 94 },
];

export const ADEGAN_BUKAN_SETENGAH: AdeganStory = {
  id: "bukan-setengah",
  judul: "Dua bagian yang tidak sama banyak",
  sumber: "Materi: bukan setengah",
  latar: "#FEF2F2",
  ketukan: [
    k(
      SUARA_4A,
      tambah(0, judul("Dua Bagian", W.merah), kotak("bl", 36, 48, 76, 68, "#F0FDF4", "#16A34A", { rx: 8, z: -1 }), kotak("br", 190, 48, 56, 68, "#F0FDF4", "#16A34A", { rx: 8, z: -1 })),
      tambah(idx(SUARA_4A, "Empat"), ...KIRI4.map((p, i) => tunas(`l${i}`, p.x, p.y, 7)), teks("ln", 74, 134, "4", 15, W.merah)),
      tambah(idx(SUARA_4A, "dua"), ...KANAN2.map((p, i) => tunas(`m${i}`, p.x, p.y, 7)), teks("rn", 218, 134, "2", 15, W.merah)),
      tambah(idx(SUARA_4A, "bagian,"), teks("d2", 150, 40, "2 bagian", 9.6, W.hijau)),
      tambah(idx(SUARA_4A, "tidak"), teks("tg", 150, 156, "tidak sama banyak", 10, W.merah)),
    ),
    k(
      SUARA_4B,
      hapus(0, "tg"),
      tambah(idx(SUARA_4B, "berarti"), garis("g0", 93, 70, 118, 0, W.hijau, 1.6, { putus: true, z: 2 }), garis("g1", 93, 94, 118, 0, W.hijau, 1.6, { putus: true, z: 2 })),
      sorotkan(idx(SUARA_4B, "dua"), "d2"),
      sorotkan(idx(SUARA_4B, "bagian"), "l0", "l2"),
      tambah(idx(SUARA_4B, "sama"), teks("sd", 150, 154, "sisa tanpa pasangan", 9.6, W.merah)),
    ),
    k(
      SUARA_4C,
      hapus(0, "sd", "g0", "g1"),
      tambah(0, ...tokoh("dk", 262, 176, "Dika")),
      tambah(idx(SUARA_4C, "tidak"), emo("x1", 150, 96, E.salah, 20)),
      tambah(idx(SUARA_4C, "sama"), teks("sb", 150, 148, "sama banyak", 10, W.hijau)),
      sorotkan(idx(SUARA_4C, "banyak,"), "sb"),
      tambah(idx(SUARA_4C, "bukan"), teks("bk", 150, 164, "bukan setengah", 10, W.merah)),
    ),
  ],
};

/* ------------------------------ 5. Pola setengah ------------------------------ */
const SUARA_5A = "Bu Wati membawa bibit lain. Setengah dari empat adalah dua, dan setengah dari enam adalah tiga.";
const SUARA_5B = "Setengah dari delapan adalah empat, dan setengah dari sepuluh adalah lima.";
const SUARA_5C = "Dika mencatat polanya: makin banyak bendanya, makin banyak setengahnya.";
const BARIS_Y = [48, 74, 100, 126];
const JUMLAH = [4, 6, 8, 10];
const barisKiri = (r: number) => [teks(`rl${r}`, 28, BARIS_Y[r] + 4, String(JUMLAH[r]), 12, W.merah), ...Array.from({ length: JUMLAH[r] }, (_, i) => tunas(`dl${r}${i}`, 46 + 9 * i, BARIS_Y[r], 3.6)), panah(`pr${r}`, 138, BARIS_Y[r], 22, 0, W.hijau, 1.8)];
const barisKanan = (r: number) => [teks(`rr${r}`, 236, BARIS_Y[r] + 4, String(JUMLAH[r] / 2), 12, W.merah), ...Array.from({ length: JUMLAH[r] / 2 }, (_, i) => tunas(`dr${r}${i}`, 170 + 9 * i, BARIS_Y[r], 3.6))];

export const ADEGAN_POLA_SETENGAH: AdeganStory = {
  id: "pola-setengah",
  judul: "Pola setengah dari bilangan",
  sumber: "Materi: pola setengah",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_5A,
      tambah(0, judul("Pola Setengah"), teks("hk", 84, 34, "banyak benda", 8, W.ungu), teks("hs", 200, 34, "setengahnya", 8, W.ungu)),
      tambah(idx(SUARA_5A, "Wati"), ...tokoh("bw", 40, 176, "Bu Wati")),
      tambah(idx(SUARA_5A, "empat"), ...barisKiri(0)),
      tambah(idx(SUARA_5A, "dua,"), ...barisKanan(0)),
      tambah(idx(SUARA_5A, "enam"), ...barisKiri(1)),
      tambah(idx(SUARA_5A, "tiga."), ...barisKanan(1)),
    ),
    k(
      SUARA_5B,
      tambah(idx(SUARA_5B, "delapan"), ...barisKiri(2)),
      tambah(idx(SUARA_5B, "empat,"), ...barisKanan(2)),
      tambah(idx(SUARA_5B, "sepuluh"), ...barisKiri(3)),
      tambah(idx(SUARA_5B, "lima."), ...barisKanan(3)),
    ),
    k(
      SUARA_5C,
      tambah(0, ...tokoh("dk", 262, 176, "Dika")),
      tambah(idx(SUARA_5C, "polanya:"), ...kartu("pl", 84, 148, 136, 36, W.krem, ["makin banyak benda,", "makin banyak setengah"], 8.6)),
      tambah(idx(SUARA_5C, "makin"), panah("pk", 286, 132, 0, -88, W.merah, 3)),
      sorotkan(idx(SUARA_5C, "bendanya,"), "rl0", "rl1", "rl2", "rl3"),
      sorotkan(idx(SUARA_5C, "setengahnya."), "rr0", "rr1", "rr2", "rr3"),
    ),
  ],
};

/* ------------------------------ 6. Bilangan ganjil ------------------------------ */
const SUARA_6A = "Ada satu bibit lagi, jadi semuanya lima. Nia membaginya satu-satu.";
const SUARA_6B = "Setiap petak mendapat dua, dan tersisa satu bibit yang tidak punya pasangan.";
const SUARA_6C = "Bibit tidak boleh dipecah, jadi lima tidak bisa dibagi dua sama banyak dan tidak punya setengah utuh.";
const AWAL5 = [0, 1, 2, 3, 4].map((i) => ({ x: 24 + 15 * i, y: 148 }));

export const ADEGAN_GANJIL: AdeganStory = {
  id: "ganjil",
  judul: "Lima bibit tersisa satu",
  sumber: "Materi: bilangan ganjil",
  latar: "#FAF5FF",
  ketukan: [
    k(
      SUARA_6A,
      tambah(0, judul("Lima Bibit", W.ungu), rumput("rm", 118), ...bedeng("bd", BD.x, BD.y, BD.w, BD.h), ...AWAL5.slice(0, 4).map((p, i) => bibit(`r${i}`, p.x, p.y))),
      tambah(idx(SUARA_6A, "satu"), bibit("r4", AWAL5[4].x, AWAL5[4].y), teks("p1", 70, 130, "1 bibit lagi", 8.6, W.merah)),
      tambah(idx(SUARA_6A, "lima."), teks("n5", 150, 42, "5 bibit", 9.6, W.merah)),
      tambah(idx(SUARA_6A, "Nia"), ...tokoh("ni", 252, 176, "Nia")),
      ubah(idx(SUARA_6A, "satu-satu."), { id: "r0", x: slot(0, 0).x, y: slot(0, 0).y }, { id: "r1", x: slot(1, 0).x, y: slot(1, 0).y }),
      tambah(idx(SUARA_6A, "satu-satu."), teks("cl", 110, 124, "1", 14, W.merah), teks("cr", 190, 124, "1", 14, W.merah)),
    ),
    k(
      SUARA_6B,
      hapus(0, "p1"),
      ubah(0, { id: "r2", x: slot(0, 1).x, y: slot(0, 1).y }, { id: "r3", x: slot(1, 1).x, y: slot(1, 1).y }, { id: "cl", isi: "2" }, { id: "cr", isi: "2" }),
      ubah(idx(SUARA_6B, "tersisa"), { id: "r4", x: 150, y: 136, u: 18 }),
      tambah(idx(SUARA_6B, "tersisa"), emo("qm", 176, 134, E.tanya, 16)),
      tambah(idx(SUARA_6B, "satu"), teks("sx", 150, 156, "1 sisa", 9.6, W.merah)),
      tambah(idx(SUARA_6B, "pasangan."), teks("pp", 150, 170, "tanpa pasangan", 9, W.ungu)),
    ),
    k(
      SUARA_6C,
      hapus(0, "sx", "pp", "qm"),
      tambah(idx(SUARA_6C, "dipecah,"), emo("gt", 120, 142, E.gunting, 18), emo("x1", 180, 142, E.salah, 18)),
      sorotkan(idx(SUARA_6C, "lima"), "r4"),
      ubah(idx(SUARA_6C, "banyak"), { id: "n5", isi: "5 tidak bisa dibagi 2 sama banyak", u: 8.6 }),
      tambah(idx(SUARA_6C, "utuh."), ...kartu("lb", 70, 156, 160, 24, W.krem, ["tidak punya setengah utuh"], 9.4)),
    ),
  ],
};
