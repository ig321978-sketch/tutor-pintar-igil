/**
 * Isi tahap Concrete, Pictorial, dan Abstract Kelas 4 Bab 3 Sub-Bab A "Deret Angklung Bu Ratri" (pola gambar: deret membesar dan mengecil dengan selisih tetap, tabel selisih, melanjutkan deret, deret ke-n, susunan per lima),
 * awal cerita Orkestra Angklung Kampung Senandung. Misi lanjutan "Misi Deret" (nomor misi berlanjut dari Simulasi). Data berbeda dari Story (deret dua, empat, enam dan tujuh, lima, tiga),
 * kecuali seed Cari kesalahan dari alur (deret dua belas, sembilan, enam dilanjutkan dengan menambah). Concrete memakai angklung dan benda panggung beremoji di rak kayu, Pictorial memakai titik dan kotak polos di kertas pola,
 * Abstract memakai kartu kata dan angka di daftar Bu Ratri.
 * Jawaban beragam: memilih jenis pola, selisih, atau banyaknya, menulis satu angka di kanvas, dan mengucapkan satu kata atau bilangan. Jawaban benar dihitung dari data.
 * Angka jawaban Tulis di kanvas per tahap: Concrete 3, 7, 6, 2; Pictorial 3, 6, 2, 4; Abstract 7, 9, 8, 3 (tidak kembar dalam satu tahap).
 * Selaras buku (Pola Gambar hlm 86-101): misi Klik membuka dengan tugas Melengkapi pola (pilih gambar yang melengkapi kotak kosong; Concrete kotak ketiga, Pictorial kotak pertama, Abstract kartu kedua)
 * dan Tabel Selisih Klik berupa tabel uraian sampai deret ke-n (Concrete deret ketujuh 15, Pictorial deret kelima 1 dari sembilan, tujuh, lima, tiga, satu yang mengecil, Abstract deret ketujuh 6).
 * Diuji: scripts/uji-angklung-k4b3a.mjs.
 */
import type { Cara, Langkah, LangkahSalah, LangkahSoal, LGambar, LJenis, LLengkapi, LLima, LTabel, Rupa, SoalMisi } from "./logika-cpa";
import { URUT_METODE, instruksi, ucapkan } from "./logika-cpa";

export { MISI_ANGKLUNG_TEKS } from "./data-sim";

const jenis = (a: number, d: number): LJenis => ({ tipe: "jenis", p: { a, d } });
const gambar = (a: number, d: number): LGambar => ({ tipe: "gambar", p: { a, d } });
const tabel = (a: number, d: number, ke?: number): LTabel => ({ tipe: "tabel", p: { a, d }, ...(ke ? { ke } : {}) });
const lengkapi = (a: number, d: number, kosong: number): LLengkapi => ({ tipe: "lengkapi", p: { a, d }, kosong });
const lima = (a: number, d: number, k: number): LLima => ({ tipe: "lima", p: { a, d }, k });
const salah = (dasar: LGambar, tokoh: string, kataTokoh: string, jawabTokoh: string, alasan: [string, string, string], benar: number, keliru: string, betul = false): LangkahSalah => ({
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

/** Empat langkah satu misi, berurut metode: IGIL, Draw the Next, Difference Table, Group by Five. */
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

/* ------------------------------ Concrete: rak angklung dengan benda panggung beremoji ------------------------------ */
const C = satuMisi("benda");
export const CONCRETE: SoalMisi[] = [
  C(2, "klik", "Misi Deret 2: rak angklung", "Bu Ratri menata deret angklung di rak lapangan. Periksa gambarnya.", [
    lengkapi(2, 3, 3),
    salah(
      gambar(12, -3),
      "Satria",
      "Deret dua belas, sembilan, enam harus dilanjutkan menjadi sembilan lagi, karena tinggal menambah tiga.",
      "9",
      [
        "Satria benar, deret berikutnya selalu lebih banyak daripada deret sebelumnya.",
        "Satria keliru: deretnya makin sedikit, jadi selisihnya dikurangkan, bukan ditambahkan.",
        "Satria keliru, deret itu tidak punya selisih yang tetap.",
      ],
      1,
      "Deret yang makin sedikit dilanjutkan dengan mengurangi selisih yang sama, bukan menambahnya.",
    ),
    tabel(3, 2, 7),
    lima(3, 3, 4),
  ]),
  C(3, "kanvas", "Misi Deret 3: papan catatan", "Laras mencatat deret angklung di papan catatan. Periksa gambarnya, lalu tulis jawabanmu di kanvas.", [jenis(10, -3), gambar(1, 2), tabel(2, 1), lima(4, 4, 3)]),
  C(4, "suara", "Misi Deret 4: panggilan Bu Ratri", "Bu Ratri memanggil dari panggung kayu. Jawab dengan suaramu.", [jenis(5, 3), gambar(11, -2), tabel(9, -1), lima(3, 1, 4)]),
];

/* ------------------------------ Pictorial: kertas pola dengan titik, kotak, dan tabel polos ------------------------------ */
const Pi = satuMisi("diagram");
export const PICTORIAL: SoalMisi[] = [
  Pi(5, "klik", "Misi Deret 5: kertas pola", "Genta menyalin deret angklung ke kertas pola. Periksa gambarnya.", [
    lengkapi(12, -3, 1),
    salah(
      gambar(10, -2),
      "Genta",
      "Gambar sepuluh, delapan, enam makin sedikit, jadi deret berikutnya dilanjutkan dengan mengurangi selisih yang sama.",
      "4",
      [
        "Genta keliru, deret yang makin sedikit harus dilanjutkan dengan menambah selisih.",
        "Genta keliru, pola yang mengecil tidak boleh dilanjutkan.",
        "Genta benar: deret makin sedikit, jadi selisih yang sama dikurangkan lagi.",
      ],
      2,
      "Jawaban Genta benar: deret yang makin sedikit dilanjutkan dengan mengurangi selisih yang sama.",
      true,
    ),
    tabel(9, -2, 5),
    lima(2, 4, 4),
  ]),
  Pi(6, "kanvas", "Misi Deret 6: bagan Laras", "Laras menggambar bagan deret angklung. Periksa gambarnya, lalu tulis jawabanmu di kanvas.", [jenis(11, -3), gambar(3, 1), tabel(10, -2), lima(3, 3, 3)]),
  Pi(7, "suara", "Misi Deret 7: lapor ke Bu Ratri", "Genta melaporkan bagannya kepada Bu Ratri. Sebutkan jawabanmu.", [jenis(4, -1), gambar(2, 3), tabel(3, 4), lima(6, 1, 4)]),
];

/* ------------------------------ Abstract: daftar Bu Ratri dengan kartu kata dan angka ------------------------------ */
const A = satuMisi("lambang");
export const ABSTRACT: SoalMisi[] = [
  A(8, "klik", "Misi Deret 8: daftar Bu Ratri", "Daftar Bu Ratri hanya berisi kata dan angka.", [
    lengkapi(3, 3, 2),
    salah(
      gambar(11, -3),
      "Satria",
      "Deret sebelas, delapan, lima makin sedikit, tetapi aku tetap menambah tiga karena tiga itu angka kecil.",
      "8",
      [
        "Satria keliru: besar kecilnya angka tidak menentukan arah, deret yang makin sedikit harus dikurangi.",
        "Satria benar, angka kecil berarti selisihnya ditambahkan.",
        "Satria keliru, deret itu tidak bisa dilanjutkan.",
      ],
      0,
      "Arah pola ditentukan oleh perubahan banyaknya, bukan oleh besar angkanya.",
    ),
    tabel(36, -5, 7),
    lima(4, 5, 3),
  ]),
  A(9, "kanvas", "Misi Deret 9: tulis di daftar", "Laras meminta kamu menulis jawaban di kanvas.", [jenis(2, 7), gambar(3, 2), tabel(4, 1), lima(5, 4, 3)]),
  A(10, "suara", "Misi Deret 10: daftar akhir", "Daftar akhir deret untuk Bu Ratri. Ucapkan jawabannya.", [jenis(20, -5), gambar(6, 2), tabel(5, -2), lima(4, 1, 4)]),
];

export const POIN_PENTING = [
  "Pola gambar adalah susunan deret yang banyaknya berubah dengan selisih yang tetap.",
  "Kalau tiap deret bertambah dengan selisih yang sama, polanya membesar. Contoh: 2, 4, 6 dengan selisih +2.",
  "Kalau tiap deret berkurang dengan selisih yang sama, polanya mengecil. Contoh: 7, 5, 3 dengan selisih −2.",
  "Jenis pola ditentukan oleh arah perubahannya, bukan oleh besar kecilnya angka.",
  "Pola mengecil berhenti di nol, karena benda tidak bisa kurang dari tidak ada.",
  "Gambar Berikutnya, Tabel Selisih, dan Susun Per Lima membantu melanjutkan pola sampai deret ketujuh dan mengisi kotak yang kosong.",
];
/** Poin penting untuk suara (tanpa digit): bilangan dan tanda selisih menjadi kata. */
export const POIN_PENTING_SUARA = POIN_PENTING.map((p) => ucapkan(p));

/** Jembatan ke Sub-Bab B. */
export const PENUTUP_A = "Pak Gunawan, penata panggung, datang membawa gulungan meteran dan palu. Kursi penonton ternyata juga punya pola, tetapi kali ini hanya bilangan. Menurutmu, bagaimana menyusun kursi tanpa menggambar satu per satu?";

export const TEMA_ANGKLUNG = {
  concrete: { ikon: "\u{1F3B6}", nama: "Concrete", cara: "Rak angklung: angklung dan benda panggung beremoji ditata deret demi deret" },
  pictorial: { ikon: "\u{1F4CA}", nama: "Pictorial", cara: "Kertas pola: titik, kotak, dan tabel selisih polos" },
  abstract: { ikon: "\u{1F4DD}", nama: "Abstract", cara: "Daftar Bu Ratri: kartu kata dan angka, pilih, tulis, dan ucapkan" },
} as const;

/* Nama yang dipakai pemasang di IgilModulePlayer. */
export { CONCRETE as CONCRETE_ANGKLUNG, PICTORIAL as PICTORIAL_ANGKLUNG, ABSTRACT as ABSTRACT_ANGKLUNG };
