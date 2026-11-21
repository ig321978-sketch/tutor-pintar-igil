/**
 * Isi tahap Concrete, Pictorial, dan Abstract K4 Bab 2 Sub-Bab B "Bak Warna Pak Joyo" (membandingkan dan mengurutkan pecahan berpenyebut sama: pembilang, batang, garis pecahan),
 * cerita Sanggar Batik Kampung Mekar. Misi lanjutan "Misi Warna" (nomor misi berlanjut dari Simulasi). Data berbeda dari Story (bak biru 3/8, bak merah 6/8; 2/8, 5/8, 7/8; 5/7 dan 2/7; 1/8, 4/8, 7/8).
 * Concrete memakai benda sanggar beremoji (kaus, rok, pita, baju, palet) dengan bak pewarna berpetak, Pictorial memakai diagram polos (batang, kartu pecahan, garis pecahan) di kertas hitung,
 * Abstract memakai kartu kata dan angka di daftar Pak Joyo. Jawaban beragam: memilih tanda, pecahan, atau urutan, menulis satu angka di kanvas, dan mengucapkan satu kata.
 * Jawaban benar dihitung dari data. Angka jawaban Tulis di kanvas per tahap: Concrete 5, 6, 3, 4; Pictorial 8, 3, 2, 5; Abstract 4, 5, 3, 6 (tidak kembar dalam satu tahap).
 * Diuji: scripts/uji-warna-k4b2b.mjs.
 */
import type { Arah, Cara, Langkah, LangkahSalah, LangkahSoal, LBanding, LBatang, LGaris, LPembilang, Rupa, SoalMisi, Ujung } from "./logika-cpa";
import { URUT_METODE, instruksi, ucapkan } from "./logika-cpa";

export { MISI_WARNA_TEKS } from "./data-sim";

const banding = (benda: string, q: number, a: number, b: number): LBanding => ({ tipe: "banding", benda, q, a, b });
const pembilang = (benda: string, q: number, a: number, b: number, cari: Ujung): LPembilang => ({ tipe: "pembilang", benda, q, a, b, cari });
const batang = (benda: string, q: number, a: number, b: number): LBatang => ({ tipe: "batang", benda, q, a, b });
const garis = (benda: string, q: number, data: number[], arah: Arah, tandai: number): LGaris => ({ tipe: "garis", benda, q, data, arah, tandai });
const salah = (dasar: LBanding, tokoh: string, kataTokoh: string, jawabTokoh: string, alasan: [string, string, string], benar: number, keliru: string, betul = false): LangkahSalah => ({
  tipe: "salah",
  dasar,
  tokoh,
  kataTokoh,
  jawabTokoh,
  alasan,
  benar,
  keliru,
  ...(betul ? { betul } : {}),
});

/** Empat langkah satu misi, berurut metode: IGIL, Compare Numerators, Fraction Bars, Order on Line. */
const satuMisi =
  (rupa: Rupa) =>
  (nomor: number, cara: Cara, judul: string, cerita: string, isi: [Langkah, Langkah, Langkah, Langkah]): SoalMisi => ({
    nomor,
    judul,
    cerita,
    cara,
    langkah: isi.map((l, i): LangkahSoal => {
      const s = instruksi(l, rupa, cara, URUT_METODE[i]);
      return { metode: URUT_METODE[i], cara, judul: s, suara: s, langkah: l };
    }),
  });

/* ------------------------------ Concrete: meja pewarna dengan benda sanggar beremoji dan bak berpetak ------------------------------ */
const C = satuMisi("benda");
export const CONCRETE: SoalMisi[] = [
  C(2, "klik", "Misi Warna 2: bak pewarna", "Pak Joyo mengisi bak pewarna dengan takaran berbeda. Periksa gambarnya.", [
    salah(
      banding("kaus", 9, 4, 7),
      "Satria",
      "Kedua pecahan sama-sama berpenyebut sembilan, jadi menurutku sama besar.",
      "=",
      [
        "Satria benar: penyebut yang sama berarti kedua pecahan pasti sama besar.",
        "Satria keliru: penyebut yang sama hanya berarti bagiannya sama besar, sedangkan banyak bagian yang diambil ditunjukkan pembilang.",
        "Satria keliru: pecahan berpenyebut sama selalu lebih besar yang pembilangnya lebih kecil.",
      ],
      1,
      "Penyebut yang sama hanya memberi tahu ukuran tiap bagian. Banyak bagian yang diambil dilihat dari pembilang.",
    ),
    pembilang("pita", 6, 1, 4, "besar"),
    batang("rok", 7, 3, 5),
    garis("baju", 5, [3, 1, 4], "naik", 0),
  ]),
  C(3, "kanvas", "Misi Warna 3: catatan Laras", "Laras mencatat takaran pewarna pada kain. Periksa gambarnya, lalu tulis jawabanmu di kanvas.", [
    banding("kaus", 6, 5, 2),
    pembilang("pita", 9, 2, 8, "kecil"),
    batang("rok", 4, 1, 3),
    garis("baju", 6, [4, 1, 5], "naik", 0),
  ]),
  C(4, "suara", "Misi Warna 4: panggilan Pak Hendro", "Pak Hendro memanggil dari pintu halaman sambil meniup peluit. Jawab dengan suaramu.", [
    banding("palet", 5, 1, 4),
    pembilang("kaus", 9, 6, 3, "besar"),
    batang("pita", 6, 5, 2),
    garis("rok", 9, [7, 2, 5], "turun", 0),
  ]),
];

/* ------------------------------ Pictorial: kertas hitung dengan batang, kartu pecahan, dan garis pecahan polos ------------------------------ */
const Pi = satuMisi("diagram");
export const PICTORIAL: SoalMisi[] = [
  Pi(5, "klik", "Misi Warna 5: kertas hitung", "Genta menyalin takaran pewarna ke kertas hitung. Periksa gambarnya.", [
    salah(
      banding("kertas", 6, 5, 3),
      "Laras",
      "Penyebutnya sama, jadi aku lihat pembilangnya. Pembilang pecahan pertama lebih besar, jadi pecahan pertama lebih dari pecahan kedua.",
      ">",
      [
        "Laras keliru: pembilang yang lebih besar berarti pecahannya lebih kecil.",
        "Laras benar: kalau penyebut sama, pembilang yang lebih besar berarti pecahan yang lebih besar.",
        "Laras keliru: pembilang tidak ikut menentukan besar pecahan.",
      ],
      1,
      "Penyebut sama berarti bagiannya sama besar, jadi pembilang yang lebih besar menunjukkan pecahan yang lebih besar. Jawaban Laras benar.",
      true,
    ),
    pembilang("kertas", 9, 2, 7, "kecil"),
    batang("kertas", 6, 2, 4),
    garis("kertas", 7, [6, 1, 3], "naik", 0),
  ]),
  Pi(6, "kanvas", "Misi Warna 6: batang Genta", "Genta menggambar batang dan garis yang lebih rapi. Periksa gambarnya, lalu tulis jawabanmu di kanvas.", [
    banding("kertas", 9, 3, 8),
    pembilang("kertas", 7, 1, 4, "besar"),
    batang("kertas", 5, 4, 2),
    garis("kertas", 9, [3, 8, 5], "naik", 2),
  ]),
  Pi(7, "suara", "Misi Warna 7: lapor ke Pak Joyo", "Genta melaporkan hasil kertas hitung kepada Pak Joyo. Sebutkan jawabanmu.", [
    banding("kertas", 4, 1, 3),
    pembilang("kertas", 5, 2, 4, "besar"),
    batang("kertas", 9, 3, 7),
    garis("kertas", 6, [1, 5, 3], "naik", 0),
  ]),
];

/* ------------------------------ Abstract: daftar Pak Joyo dengan kartu kata dan angka ------------------------------ */
const A = satuMisi("lambang");
export const ABSTRACT: SoalMisi[] = [
  A(8, "klik", "Misi Warna 8: daftar Pak Joyo", "Daftar Pak Joyo hanya berisi kata dan angka.", [
    salah(
      banding("catatan", 7, 1, 6),
      "Satria",
      "Aku tidak perlu melihat pembilang. Penyebutnya sama, jadi pecahan itu pasti sama besar.",
      "=",
      [
        "Satria keliru: pecahan berpenyebut sama dibandingkan lewat pembilangnya, karena bagiannya sudah sama besar.",
        "Satria benar: kalau penyebut sama, tidak ada yang perlu dibandingkan lagi.",
        "Satria keliru: yang dibandingkan harus penyebutnya, bukan pembilangnya.",
      ],
      0,
      "Penyebut yang sama menunjukkan bagiannya sama besar. Yang berbeda ada pada pembilang, jadi lihat pembilangnya.",
    ),
    pembilang("catatan", 9, 7, 2, "besar"),
    batang("catatan", 5, 2, 3),
    garis("catatan", 6, [5, 2, 4], "naik", 0),
  ]),
  A(9, "kanvas", "Misi Warna 9: tulis di daftar", "Satria meminta kamu menulis jawaban di kanvas.", [
    banding("catatan", 5, 4, 1),
    pembilang("catatan", 9, 3, 8, "kecil"),
    batang("catatan", 7, 5, 3),
    garis("catatan", 9, [6, 2, 5], "naik", 0),
  ]),
  A(10, "suara", "Misi Warna 10: daftar akhir", "Daftar akhir takaran pewarna untuk Pak Joyo. Ucapkan jawabannya.", [
    banding("catatan", 9, 4, 4),
    pembilang("catatan", 7, 3, 6, "kecil"),
    batang("catatan", 9, 6, 2),
    garis("catatan", 5, [3, 1, 4], "naik", 2),
  ]),
];

/** Poin penting: teks tampil dan teks suara (lambang diganti kata). */
const POIN: [string, string][] = [
  ["Penyebut menunjukkan banyak bagian seluruhnya, dan pembilang menunjukkan banyak bagian yang diambil.", "Penyebut menunjukkan banyak bagian seluruhnya, dan pembilang menunjukkan banyak bagian yang diambil."],
  ["Pecahan berpenyebut sama punya bagian yang sama besar, jadi cukup membandingkan pembilangnya.", "Pecahan berpenyebut sama punya bagian yang sama besar, jadi cukup membandingkan pembilangnya."],
  ["Pembilang yang lebih besar berarti pecahan yang lebih besar.", "Pembilang yang lebih besar berarti pecahan yang lebih besar."],
  ["Tanda < dibaca kurang dari, tanda > dibaca lebih dari, dan tanda = dibaca sama dengan. Sisi tanda yang terbuka menghadap pecahan yang lebih besar.", "Tanda kurang dari, tanda lebih dari, dan tanda sama dengan punya lambang sendiri. Mulut tanda menghadap pecahan yang lebih besar."],
  ["Pecahan berpenyebut sama bisa diurutkan lewat pembilangnya, dari yang terkecil atau dari yang terbesar.", "Pecahan berpenyebut sama bisa diurutkan lewat pembilangnya, dari yang terkecil atau dari yang terbesar."],
  ["Pada garis dari 0 sampai 1, pecahan yang lebih besar ada lebih ke kanan.", "Pada garis dari nol sampai satu, pecahan yang lebih besar ada lebih ke kanan."],
  ["Banding Pembilang, Batang Pecahan, dan Urut di Garis membantu membandingkan dan mengurutkan pecahan tanpa tertukar.", "Banding Pembilang, Batang Pecahan, dan Urut di Garis membantu membandingkan dan mengurutkan pecahan tanpa tertukar."],
];
export const POIN_PENTING = POIN.map(([tampil]) => tampil);
/** Poin penting untuk suara (tanpa digit dan tanpa lambang). */
export const POIN_PENTING_SUARA = POIN.map(([, suara]) => ucapkan(suara));

/** Jembatan ke Sub-Bab C. */
export const PENUTUP_B = "Kak Sekar, penjahit sanggar, datang membawa potongan kain yang bagiannya berbeda tetapi sama besar. Menurutmu, mungkinkah satu per dua sama besar dengan dua per empat?";

export const TEMA_WARNA = {
  concrete: { ikon: "\u{1F3A8}", nama: "Concrete", cara: "Meja pewarna: benda sanggar beremoji dan bak berpetak, dibandingkan lewat pembilang" },
  pictorial: { ikon: "\u{1F4CA}", nama: "Pictorial", cara: "Kertas hitung: batang, kartu pecahan, dan garis pecahan polos" },
  abstract: { ikon: "\u{1F4DD}", nama: "Abstract", cara: "Daftar Pak Joyo: kartu kata dan angka di kertas bergaris, pilih, tulis, dan ucapkan" },
} as const;

/* Nama yang dipakai pemasang di IgilModulePlayer. */
export { CONCRETE as CONCRETE_WARNA, PICTORIAL as PICTORIAL_WARNA, ABSTRACT as ABSTRACT_WARNA };
