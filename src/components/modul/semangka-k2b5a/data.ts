/**
 * Isi tahap Concrete, Pictorial, dan Abstract Kelas 2 Bab 5 Sub-Bab A "Semangka Raksasa Pak Danu" (setengah dari benda utuh), awal cerita Kebun Sekolah.
 * Misi lanjutan "Misi Meja Bagi" (nomor misi berlanjut dari Simulasi). Benda berbeda dari Story (melon, pizza, roti tawar, cokelat batang, sandwich, wafel;
 * Pictorial memakai bangun polos berwarna; Abstract memakai kartu kata dengan banyak kotak). Jawaban bukan hanya angka: setengah atau bukan, dua, tiga, empat,
 * sama atau beda, mengetuk garis atau potongan pita, dan satu angka di kanvas. Luas bagian dihitung program dari bagian.ts.
 * Angka jawaban Tulis di kanvas per tahap: Concrete 3, 4, 2, 6; Pictorial 2, 3, 4, 8; Abstract 4, 2, 3, 7 (tidak kembar dalam satu tahap).
 * Diuji: scripts/uji-semangka-k2b5a.mjs.
 */
import type { Cara, Garis, Gbr, Langkah, LangkahSalah, LangkahSoal, Rupa, SoalMisi } from "./logika-cpa";
import { instruksi, kata, metodeLangkah } from "./logika-cpa";
import { datar, lewat, pojok, serong, tegak, titikSisi, type Bentuk } from "./bagian";

export { MISI_BAGI_TEKS } from "./data-peta";

const G = (b: Bentuk, g: Garis[], sisi: "kiri" | "kanan" | "atas" | "bawah", o?: number): Gbr => ({ b, g, w: titikSisi(b, sisi), ...(o === undefined ? {} : { o }) });
const salah = (dasar: Gbr, tokoh: string, kataTokoh: string, jawabTokoh: "setengah" | "bukan" | undefined, alasan: [string, string, string], benar: number, keliru: string, betul = false): LangkahSalah => ({
  tipe: "salah",
  dasar: { tipe: "igil", mode: "nilai", figs: [dasar] },
  tokoh,
  kataTokoh,
  ...(jawabTokoh === undefined ? {} : { jawabTokoh }),
  alasan,
  benar,
  keliru,
  ...(betul ? { betul: true } : {}),
});
const hitung = (figs: Gbr[]): Langkah => ({ tipe: "igil", mode: "hitung", figs });
const nilai = (f: Gbr): Langkah => ({ tipe: "igil", mode: "nilai", figs: [f] });
const adil = (b: Bentuk, garis: Garis[], o?: number): Langkah => ({ tipe: "adil", b, garis, ...(o === undefined ? {} : { o }) });
const cermin = (b: Bentuk, garis: Garis[], o?: number): Langkah => ({ tipe: "cermin", b, garis, ...(o === undefined ? {} : { o }) });
const pita = (n: number, potong: number[], o?: number): Langkah => ({ tipe: "pita", n, potong, ...(o === undefined ? {} : { o }) });

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

/* ------------------------------ Concrete: gerobak panen dengan makanan beremoji ------------------------------ */
// Benda: 0 melon, 1 pizza, 2 roti tawar, 3 cokelat batang, 4 sandwich, 5 wafel.
const C = kelompok("benda");
export const CONCRETE: SoalMisi[] = [
  C(2, "klik", "Misi Meja Bagi 2: gerobak panen", "Pak Danu menurunkan makanan dari gerobak panen. Bagi tiap benda dengan adil untuk dua orang.", [
    salah(
      { b: "lingkaran", o: 0, g: [[0.2, 0.1, 0.55, 0.95]], w: titikSisi("lingkaran", "kiri", 0.1) },
      "Chacha",
      "Melon ini dibelah jadi dua bagian, jadi kedua potongnya sama-sama setengah.",
      "setengah",
      [
        "Chacha benar, dua bagian saja sudah cukup untuk disebut setengah.",
        "Dua bagian melon itu tidak sama besar: potongan yang satu jauh lebih besar, jadi bukan setengah.",
        "Melon yang bulat tidak bisa dibagi menjadi setengah.",
      ],
      1,
      "Chacha hanya melihat banyak bagian. Setengah juga harus sama besar, dan kedua bagian melon ini tidak sama besar.",
    ),
    adil("panjang", [tegak("panjang", 0.25), tegak("panjang", 0.5), tegak("panjang", 0.68), serong("panjang", 0.1, 0.55)], 3),
    cermin("lingkaran", [tegak("lingkaran", 0.3), tegak("lingkaran", 0.5), datar("lingkaran", 0.72), tegak("lingkaran", 0.64)], 1),
    pita(10, [3, 5, 6, 4], 0),
  ]),
  C(3, "kanvas", "Misi Meja Bagi 3: catatan Dika", "Dika mencatat hasil bagi di papan kebun. Periksa gambarnya, lalu tulis jawabanmu di kanvas.", [
    hitung([
      G("lingkaran", [tegak("lingkaran", 0.5)], "kiri", 0),
      G("persegi", [tegak("persegi", 0.35)], "kiri", 2),
      G("lingkaran", [lewat("lingkaran", 0), lewat("lingkaran", 90)], "kiri", 1),
      G("panjang", [tegak("panjang", 0.5)], "kanan", 3),
      G("segitiga", [datar("segitiga", 0.5)], "bawah", 4),
      G("persegi", [pojok("persegi", 1)], "bawah", 5),
    ]),
    adil("persegi", [tegak("persegi", 0.5), datar("persegi", 0.5), pojok("persegi", 1), pojok("persegi", 2), tegak("persegi", 0.3)], 5),
    cermin("lingkaran", [tegak("lingkaran", 0.5), lewat("lingkaran", 30), tegak("lingkaran", 0.3), datar("lingkaran", 0.7), datar("lingkaran", 0.25)], 0),
    pita(12, [], 0),
  ]),
  C(4, "suara", "Misi Meja Bagi 4: panggilan Bu Sari", "Bu Sari memanggil dari pos kebun. Jawab dengan suaramu.", [
    nilai(G("segitiga", [tegak("segitiga", 0.5)], "kiri", 4)),
    adil("panjang", [tegak("panjang", 1 / 3), tegak("panjang", 2 / 3)], 3),
    cermin("persegi", [tegak("persegi", 0.3)], 2),
    pita(8, [3, 5], 0),
  ]),
];

/* ------------------------------ Pictorial: lembar kisi putih dengan bangun polos ------------------------------ */
const Pi = kelompok("diagram");
export const PICTORIAL: SoalMisi[] = [
  Pi(5, "klik", "Misi Meja Bagi 5: lembar kisi", "Nia menggambar bangun polos di lembar kisi. Periksa pembagiannya.", [
    salah(
      G("persegi", [tegak("persegi", 1 / 3), tegak("persegi", 2 / 3)], "kiri"),
      "Nia",
      "Aku mewarnai satu bagian saja, jadi bagian yang diwarnai ini setengah.",
      "setengah",
      [
        "Nia benar, mewarnai satu bagian berarti setengah.",
        "Persegi itu dibagi menjadi tiga bagian sama besar, padahal setengah harus berasal dari dua bagian sama besar.",
        "Bagian yang diwarnai terlalu kecil untuk dihitung.",
      ],
      1,
      "Nia hanya melihat satu bagian yang diwarnai. Persegi itu dibagi menjadi tiga bagian, padahal setengah harus berasal dari dua bagian sama besar.",
    ),
    adil("lingkaran", [tegak("lingkaran", 0.3), lewat("lingkaran", 60), datar("lingkaran", 0.7), tegak("lingkaran", 0.62)]),
    cermin("segitiga", [datar("segitiga", 0.5), tegak("segitiga", 0.5), tegak("segitiga", 0.3), datar("segitiga", 0.75)]),
    pita(12, [4, 7, 6, 5]),
  ]),
  Pi(6, "kanvas", "Misi Meja Bagi 6: lembar Dika", "Dika menyusun lembar kisi yang lebih besar. Periksa gambarnya, lalu tulis jawabanmu di kanvas.", [
    hitung([
      G("persegi", [datar("persegi", 0.5)], "atas"),
      G("panjang", [tegak("panjang", 0.4)], "kiri"),
      G("lingkaran", [lewat("lingkaran", 45)], "kiri"),
      G("segitiga", [datar("segitiga", 0.5)], "bawah"),
      G("persegi", [tegak("persegi", 1 / 3), tegak("persegi", 2 / 3)], "kiri"),
      G("lingkaran", [datar("lingkaran", 0.4)], "atas"),
    ]),
    adil("panjang", [tegak("panjang", 0.5), datar("panjang", 0.5), pojok("panjang", 1), tegak("panjang", 0.3), datar("panjang", 0.3)]),
    cermin("persegi", [tegak("persegi", 0.5), datar("persegi", 0.5), pojok("persegi", 1), pojok("persegi", 2), tegak("persegi", 0.35)]),
    pita(16, []),
  ]),
  Pi(7, "suara", "Misi Meja Bagi 7: lapor ke Bu Sari", "Nia melaporkan lembar kisinya kepada Bu Sari. Sebutkan jawabanmu.", [
    nilai(G("lingkaran", [[0.2, 0.1, 0.6, 0.95]], "kanan")),
    adil("persegi", [tegak("persegi", 0.5), datar("persegi", 0.5)]),
    cermin("lingkaran", [lewat("lingkaran", 60)]),
    pita(10, [5, 5]),
  ]),
];

/* ------------------------------ Abstract: papan kapur hijau dengan kartu kata ------------------------------ */
const A = kelompok("lambang");
export const ABSTRACT: SoalMisi[] = [
  A(8, "klik", "Misi Meja Bagi 8: papan kapur", "Papan kapur hanya berisi kata dan angka.", [
    salah(
      G("persegi", [pojok("persegi", 1)], "bawah"),
      "Dika",
      "Persegi ini dibagi dua bagian sama besar oleh garis miring, jadi bagian yang ditunjuk adalah setengah.",
      "setengah",
      [
        "Dika salah, garis miring tidak pernah membuat setengah.",
        "Dika benar: ada dua bagian, kedua bagian sama besar, dan yang ditunjuk satu bagian.",
        "Dika salah, setengah hanya boleh dibuat dengan garis tegak.",
      ],
      1,
      "Dika benar. Garis miring dari pojok ke pojok membagi persegi menjadi dua bagian sama besar, dan yang ditunjuk satu bagian.",
      true,
    ),
    adil("persegi", [tegak("persegi", 0.25), tegak("persegi", 0.5), datar("persegi", 0.75), tegak("persegi", 0.75)]),
    cermin("panjang", [tegak("panjang", 0.25), tegak("panjang", 0.5), tegak("panjang", 1 / 3), datar("panjang", 0.25)]),
    pita(16, [6, 8, 10, 4]),
  ]),
  A(9, "kanvas", "Misi Meja Bagi 9: tulis di papan", "Chacha meminta kamu menulis jawaban di kanvas.", [
    hitung([
      G("persegi", [tegak("persegi", 0.5)], "kiri"),
      G("panjang", [tegak("panjang", 0.25)], "kiri"),
      G("persegi", [pojok("persegi", 1)], "bawah"),
      G("panjang", [datar("panjang", 0.5)], "atas"),
      G("persegi", [tegak("persegi", 0.25), tegak("persegi", 0.75)], "kiri"),
      G("panjang", [tegak("panjang", 0.5)], "kanan"),
    ]),
    adil("persegi", [tegak("persegi", 0.5), datar("persegi", 0.5), tegak("persegi", 0.25), datar("persegi", 0.25), tegak("persegi", 0.75)]),
    cermin("persegi", [tegak("persegi", 0.5), datar("persegi", 0.5), pojok("persegi", 1), tegak("persegi", 0.25), datar("persegi", 0.75)]),
    pita(14, []),
  ]),
  A(10, "suara", "Misi Meja Bagi 10: pengumuman Bu Sari", "Pengumuman terakhir untuk meja bagi. Bacakan jawabannya.", [
    nilai(G("panjang", [tegak("panjang", 0.5)], "kiri")),
    adil("persegi", [tegak("persegi", 0.5)]),
    cermin("panjang", [tegak("panjang", 0.25)]),
    pita(12, [5, 7]),
  ]),
];

export const POIN_PENTING = [
  "Setengah adalah satu dari dua bagian yang sama besar.",
  "Adil berarti sama besar. Dua bagian yang tidak sama besar bukan setengah.",
  "Tiga pertanyaan Dika: dibagi dua bagian? sama besar? satu bagian yang ditunjuk?",
  "Garis yang lewat titik tengah membagi lingkaran menjadi dua bagian sama besar.",
  "Kertas persegi bisa dilipat tegak, mendatar, atau miring dari pojok ke pojok, dan hasilnya setengah.",
  "Dua setengah disatukan kembali menjadi satu benda utuh.",
];
/** Poin penting untuk suara (tanpa digit). */
export const POIN_PENTING_SUARA = POIN_PENTING.map((p) => p.replace(/\d+/g, (d) => kata(Number(d))));

/** Jembatan ke Sub-Bab B. */
export const PENUTUP_A = "Dua regu puas dengan bagian yang adil. Sekarang Bu Wati datang membawa sekeranjang bibit. Menurutmu, bagaimana membagi banyak bibit sama banyak untuk dua petak?";

export const TEMA_SEMANGKA = {
  concrete: { ikon: "\u{1F9FA}", nama: "Concrete", cara: "Gerobak panen: makanan berwarna dan beremoji untuk dibagi adil" },
  pictorial: { ikon: "\u{1F4D0}", nama: "Pictorial", cara: "Lembar kisi putih: bangun polos berwarna, garis pembagi, dan pita kotak" },
  abstract: { ikon: "\u{1F4DD}", nama: "Abstract", cara: "Papan kapur hijau: kartu kata dengan banyak kotak, pilih, tulis, dan ucapkan" },
} as const;

/* Nama yang dipakai pemasang di IgilModulePlayer. */
export { CONCRETE as CONCRETE_SEMANGKA, PICTORIAL as PICTORIAL_SEMANGKA, ABSTRACT as ABSTRACT_SEMANGKA };
