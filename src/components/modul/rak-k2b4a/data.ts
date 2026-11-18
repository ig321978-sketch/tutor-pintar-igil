/**
 * Isi tahap Concrete, Pictorial, dan Abstract Kelas 2 Bab 4 Sub-Bab A "Rak Pameran Pak Hasan" (posisi benda), awal cerita Pameran Kerajinan Sekolah.
 * Misi lanjutan "Misi Rak Pameran" (nomor misi berlanjut dari Simulasi). Benda berbeda dari Story (payung kertas, keranjang, topi anyaman, bunga kertas,
 * layang-layang, lonceng, kerang, kupu-kupu; Pictorial memakai bangun polos berwarna). Jawaban bukan hanya angka: kata posisi (pilih atau ucapkan),
 * mengetuk kotak kosong atau kotak harta, mengetuk benda yang cocok dengan dua petunjuk, dan satu angka di kanvas.
 * Angka jawaban Tulis di kanvas per tahap: Concrete 5, 4, 6, 7; Pictorial 6, 5, 4, 7; Abstract 4, 6, 5, 7 (tidak kembar dalam satu tahap).
 * Diuji: scripts/uji-rak-k2b4a.mjs.
 */
import type { Adegan, Arah, Cara, Kata, LAcuan, LPeta, LSekat, LSimon, Langkah, LangkahDasar, LangkahSalah, LangkahSoal, Petunjuk, Rupa, SoalMisi } from "./logika-cpa";
import { instruksi, kata, metodeLangkah } from "./logika-cpa";

export { MISI_RAK_TEKS } from "./data-peta";

type B = [number, number, number] | [number, number, number, 0 | 1];
/** Papan berpetak: tiap benda [kode, kolom, baris] atau [kode, kolom, baris, kedalaman]. */
const ad = (kol: number, bar: number, isi: B[]): Adegan => ({ kol, bar, isi: isi.map((b) => (b.length === 4 ? { k: b[0], kol: b[1], bar: b[2], dep: b[3] } : { k: b[0], kol: b[1], bar: b[2] })) });
const ac = (a: Adegan, t: number, acuan: number, tanya?: "t" | "a"): LAcuan => ({ tipe: "acuan", ad: a, t, a: acuan, ...(tanya ? { tanya } : {}) });
const sm = (a: Adegan, acuan: number, k: Arah, t: number): LSimon => ({ tipe: "simon", ad: a, a: acuan, kata: k, t });
const pt = (kol: number, bar: number, mulai: [number, number], arah: Arah[], hitung: "baris" | "kolom"): LPeta => ({ tipe: "peta", kol, bar, mulai, arah, hitung });
const rel = (k: Arah, a: number): Petunjuk => ({ j: "rel", kata: k, a });
const tgk = (bar: number): Petunjuk => ({ j: "tingkat", bar });
const sk = (a: Adegan, p1: Petunjuk, p2: Petunjuk, sasaran: number): LSekat => ({ tipe: "sekat", ad: a, petunjuk: [p1, p2], sasaran });
const salah = (dasar: LAcuan, tokoh: string, kataTokoh: string, jawabTokoh: Kata | undefined, alasan: [string, string, string], benar: number, keliru: string, betul = false): LangkahSalah => ({
  tipe: "salah",
  dasar,
  tokoh,
  kataTokoh,
  ...(jawabTokoh === undefined ? {} : { jawabTokoh }),
  alasan,
  benar,
  keliru,
  ...(betul ? { betul: true } : {}),
});

const kelompok =
  (rupa: Rupa) =>
  (nomor: number, cara: Cara, judul: string, cerita: string, isi: [Langkah, Langkah, Langkah, Langkah]): SoalMisi => ({
    nomor,
    judul,
    cerita,
    cara,
    langkah: isi.map((l): LangkahSoal => {
      const s = instruksi(l, rupa, cara);
      return { metode: metodeLangkah(l), cara, judul: s, suara: s, langkah: l };
    }),
  });
export type { LangkahDasar };

/* ------------------------------ Concrete: stan pameran dengan rak dan karya beremoji ------------------------------ */
// Kode benda: 0 payung kertas, 1 keranjang, 2 topi anyaman, 3 bunga kertas, 4 layang-layang, 5 lonceng, 6 kerang, 7 kupu-kupu.
const C = kelompok("benda");
export const CONCRETE: SoalMisi[] = [
  C(2, "klik", "Misi Rak Pameran 2: kartu denah baru", "Pak Hasan membawa kartu denah baru. Bantu Chacha menaruh karya tepat sesuai kartu.", [
    salah(
      ac(ad(3, 1, [[1, 0, 0], [0, 1, 0], [2, 2, 0]]), 1, 0),
      "Chacha",
      "Payung kertas ada di sebelah kiri keranjang, karena kiri keranjang itu sisi kirinya sendiri.",
      "kiri",
      [
        "Chacha benar, kanan dan kiri dihitung dari benda acuannya.",
        "Kanan dan kiri dihitung dari kita yang melihat gambar, jadi payung kertas ada di sebelah kanan keranjang.",
        "Payung kertas ada di atas keranjang, jadi tidak punya kanan atau kiri.",
      ],
      1,
      "Chacha menghitung kiri dari keranjang itu sendiri. Kanan dan kiri dihitung dari kita yang melihat gambar: payung kertas ada di sebelah kanan keranjang.",
    ),
    sm(ad(3, 2, [[0, 0, 0], [2, 1, 0], [1, 0, 1], [5, 2, 1], [7, 1, 1]]), 1, "bawah", 4),
    pt(4, 3, [0, 2], ["atas", "kanan", "kanan"], "baris"),
    sk(ad(3, 2, [[0, 0, 0], [2, 1, 0], [3, 2, 0], [1, 0, 1], [4, 1, 1], [5, 2, 1]]), tgk(0), rel("kanan", 1), 2),
  ]),
  C(3, "kanvas", "Misi Rak Pameran 3: catatan Dika", "Dika mencatat urutan karya di rak. Periksa papan, lalu tulis jawabanmu di kanvas.", [
    ac(ad(6, 1, [[3, 0, 0], [0, 1, 0], [2, 2, 0], [5, 3, 0], [4, 4, 0], [1, 5, 0]]), 4, 0),
    sm(ad(4, 2, [[0, 0, 0], [1, 1, 0], [2, 2, 0], [3, 3, 0], [4, 1, 1], [5, 3, 1]]), 4, "atas", 1),
    pt(6, 2, [2, 0], ["kanan", "bawah", "kanan", "kanan"], "kolom"),
    sk(ad(5, 2, [[0, 0, 0], [1, 1, 0], [2, 2, 0], [3, 3, 0], [4, 4, 0], [5, 2, 1], [6, 3, 1], [7, 4, 1]]), rel("kanan", 0), rel("kiri", 2), 1),
  ]),
  C(4, "suara", "Misi Rak Pameran 4: panggilan Bu Sari", "Bu Sari memanggil dari pos pameran. Jawab dengan suaramu.", [
    ac(ad(3, 1, [[0, 0, 0], [5, 1, 0, 1], [6, 1, 0, 0], [3, 2, 0]]), 2, 1),
    sm(ad(3, 1, [[2, 0, 0], [1, 1, 0], [4, 2, 0]]), 1, "kiri", 0),
    pt(3, 4, [1, 0], ["bawah", "bawah"], "baris"),
    sk(ad(3, 2, [[0, 0, 0], [2, 1, 0], [3, 2, 0], [1, 0, 1], [4, 1, 1], [5, 2, 1]]), tgk(1), rel("kiri", 4), 3),
  ]),
];

/* ------------------------------ Pictorial: lembar denah biru dengan bangun polos ------------------------------ */
const Pi = kelompok("diagram");
export const PICTORIAL: SoalMisi[] = [
  Pi(5, "klik", "Misi Rak Pameran 5: lembar denah", "Nia menggambar lembar denah berpetak dengan bangun polos. Periksa letaknya.", [
    salah(
      ac(ad(3, 2, [[4, 1, 0], [3, 1, 1], [2, 0, 0], [1, 2, 1]]), 1, 0),
      "Dika",
      "Lingkaran kuning ada di bawah persegi biru.",
      undefined,
      [
        "Dika benar, lingkaran kuning ada di kolom yang sama dengan persegi biru dan berada di baris yang lebih bawah.",
        "Dika keliru, bawah artinya di sebelah kiri.",
        "Dika keliru, yang berada di baris bawah selalu bernama lawan atas, jadi ada di atas.",
      ],
      0,
      "Dika benar. Lingkaran kuning dan persegi biru ada di kolom yang sama, dan lingkaran kuning berada di baris yang lebih bawah, jadi letaknya di bawah persegi biru.",
      true,
    ),
    sm(ad(4, 2, [[0, 0, 0], [1, 1, 0], [2, 3, 0], [5, 2, 1], [6, 0, 1], [7, 2, 0]]), 1, "kanan", 5),
    pt(5, 3, [4, 2], ["atas", "kiri", "kiri"], "baris"),
    sk(ad(3, 2, [[0, 0, 0], [3, 1, 0], [4, 2, 0], [5, 0, 1], [6, 1, 1], [7, 2, 1]]), rel("kanan", 1), rel("bawah", 0), 5),
  ]),
  Pi(6, "kanvas", "Misi Rak Pameran 6: lembar Dika", "Dika menyusun lembar denah yang lebih besar. Periksa papan, lalu tulis jawabanmu di kanvas.", [
    ac(ad(6, 1, [[7, 0, 0], [3, 1, 0], [1, 2, 0], [6, 3, 0], [2, 4, 0], [0, 5, 0]]), 5, 0),
    sm(ad(5, 2, [[0, 0, 0], [1, 1, 0], [2, 2, 0], [3, 3, 0], [4, 4, 0], [5, 2, 1]]), 5, "atas", 2),
    pt(3, 4, [0, 0], ["bawah", "bawah", "kanan", "bawah"], "baris"),
    sk(ad(5, 2, [[0, 0, 0], [1, 1, 0], [2, 2, 0], [3, 3, 0], [4, 0, 1], [5, 1, 1], [6, 2, 1], [7, 4, 1]]), rel("kiri", 7), rel("kanan", 2), 3),
  ]),
  Pi(7, "suara", "Misi Rak Pameran 7: lapor ke Bu Sari", "Nia melaporkan lembar denahnya kepada Bu Sari. Sebutkan jawabanmu.", [
    ac(ad(3, 2, [[1, 0, 0], [6, 0, 1], [2, 1, 0], [7, 2, 1]]), 0, 1),
    sm(ad(3, 1, [[4, 0, 0], [2, 1, 0], [5, 2, 0]]), 0, "kanan", 1),
    pt(3, 4, [1, 3], ["atas", "atas"], "baris"),
    sk(ad(3, 2, [[0, 0, 0], [3, 1, 0], [4, 2, 0], [5, 0, 1], [6, 1, 1], [7, 2, 1]]), tgk(1), rel("kanan", 4), 5),
  ]),
];

/* ------------------------------ Abstract: papan kartu kata ------------------------------ */
const A = kelompok("lambang");
export const ABSTRACT: SoalMisi[] = [
  A(8, "klik", "Misi Rak Pameran 8: papan kartu kata", "Papan kartu kata hanya berisi kata dan lambang.", [
    salah(
      ac(ad(2, 2, [[0, 0, 0], [1, 0, 1], [2, 1, 0], [3, 1, 1]]), 0, 1, "a"),
      "Dika",
      "Kalau payung kertas di atas keranjang, berarti keranjang di atas payung kertas.",
      "atas",
      [
        "Dika benar, kalau satu benda di atas, benda yang lain juga di atas.",
        "Atas dan bawah saling berlawanan: payung kertas di atas keranjang, jadi keranjang di bawah payung kertas.",
        "Keranjang tidak punya letak terhadap payung kertas.",
      ],
      1,
      "Dika lupa memakai kata lawan. Atas dan bawah saling berlawanan: kalau payung kertas di atas keranjang, keranjang ada di bawah payung kertas.",
    ),
    sm(ad(4, 2, [[5, 2, 1], [6, 1, 1], [0, 0, 1], [3, 0, 0], [2, 3, 1]]), 0, "kiri", 1),
    pt(4, 3, [3, 0], ["bawah", "kiri", "kiri"], "baris"),
    sk(ad(3, 2, [[0, 0, 0], [3, 1, 0], [4, 2, 0], [5, 0, 1], [6, 1, 1], [7, 2, 1]]), rel("kiri", 1), rel("bawah", 0), 3),
  ]),
  A(9, "kanvas", "Misi Rak Pameran 9: tulis di papan", "Chacha meminta kamu menulis jawaban di kanvas.", [
    ac(ad(5, 1, [[6, 0, 0], [3, 1, 0], [0, 2, 0], [5, 3, 0], [2, 4, 0]]), 3, 0),
    sm(ad(4, 2, [[4, 0, 0], [0, 1, 0], [1, 2, 0], [2, 3, 0], [3, 1, 1], [5, 2, 1], [6, 3, 1]]), 0, "kanan", 1),
    pt(5, 2, [1, 0], ["kanan", "bawah", "kanan", "kanan"], "kolom"),
    sk(ad(5, 2, [[0, 2, 0], [1, 3, 0], [2, 4, 0], [3, 0, 1], [4, 1, 1], [5, 2, 1], [6, 3, 1], [7, 4, 1]]), rel("kanan", 3), rel("kiri", 5), 4),
  ]),
  A(10, "suara", "Misi Rak Pameran 10: pengumuman Bu Sari", "Pengumuman terakhir untuk rak pameran. Bacakan jawabannya.", [
    ac(ad(3, 1, [[0, 0, 0], [5, 1, 0, 1], [6, 1, 0, 0], [2, 2, 0]]), 1, 2),
    sm(ad(2, 2, [[3, 0, 0], [4, 0, 1], [0, 1, 0], [1, 1, 1]]), 0, "bawah", 1),
    pt(4, 2, [3, 0], ["kiri", "kiri"], "kolom"),
    sk(ad(3, 2, [[0, 0, 0], [3, 1, 0], [4, 2, 0], [5, 0, 1], [6, 1, 1], [7, 2, 1]]), rel("kiri", 1), rel("atas", 3), 0),
  ]),
];

export const POIN_PENTING = [
  "Kata posisi ada enam: atas, bawah, depan, belakang, kanan, dan kiri.",
  "Setiap kata posisi punya lawan: atas dengan bawah, depan dengan belakang, kanan dengan kiri.",
  "Kalimat posisi punya tiga bagian: benda yang diceritakan, kata posisi, dan benda acuan.",
  "Kanan dan kiri dihitung dari kita yang melihat gambar, bukan dari benda acuannya.",
  "Benda yang menutupi ada di depan, dan benda yang tertutup ada di belakang.",
  "Dua petunjuk posisi bisa digabung sampai tinggal satu benda yang cocok.",
];
/** Poin penting untuk suara (tanpa digit). */
export const POIN_PENTING_SUARA = POIN_PENTING.map((p) => p.replace(/\d+/g, (d) => kata(Number(d))));

/** Jembatan ke Sub-Bab B. */
export const PENUTUP_A = "Semua karya sudah di tempat yang tepat. Besok Bu Mira datang membawa manik-manik. Menurutmu, kalau manik merah, biru, merah, biru, manik berikutnya warna apa?";

export const TEMA_RAK = {
  concrete: { ikon: "\u{1F3EA}", nama: "Concrete", cara: "Stan pameran: rak kayu dengan karya berwarna dan beremoji untuk ditentukan letaknya" },
  pictorial: { ikon: "\u{1F4D0}", nama: "Pictorial", cara: "Lembar denah: petak dengan bangun polos berwarna, peta kotak, dan petunjuk digabung" },
  abstract: { ikon: "\u{1F4DD}", nama: "Abstract", cara: "Papan kartu kata: kartu kata dan lambang saja, pilih, tulis, dan ucapkan" },
} as const;

/* Nama yang dipakai pemasang di IgilModulePlayer. */
export { CONCRETE as CONCRETE_RAK, PICTORIAL as PICTORIAL_RAK, ABSTRACT as ABSTRACT_RAK };
