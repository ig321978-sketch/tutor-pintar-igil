/**
 * Isi tahap Concrete, Pictorial, dan Abstract Kelas 4 Bab 4 Sub-Bab A "Lantai Ubin Bu Sinta" (pengukuran luas: satuan baku, menutup lantai dengan ubin, baris kali kolom, meter persegi dan sentimeter persegi),
 * awal cerita Kolam Renang Tirta Ceria. Misi lanjutan "Misi Ubin" (nomor misi berlanjut dari Simulasi). Data berbeda dari Story (tiga baris empat kolom, empat baris lima kolom, lima baris enam kolom, dua meter persegi),
 * kecuali seed Cari kesalahan dari alur (dua baris lima kolom dijumlah menjadi tujuh). Concrete memakai ubin berwarna beremoji di tepi kolam, Pictorial memakai petak dan tangga polos di kertas denah,
 * Abstract memakai kartu kata dan angka di daftar Bu Sinta.
 * Jawaban beragam: memilih luas, satuan, atau hasil perubahan (klik, selalu dengan satuan), menulis satu angka di kanvas, dan mengucapkan satu kata atau bilangan. Jawaban benar dihitung dari data.
 * Angka jawaban Tulis di kanvas per tahap: Concrete 4, 5, 9, 3; Pictorial 5, 3, 8, 7; Abstract 3, 7, 6, 4 (tidak kembar dalam satu tahap).
 * Diuji: scripts/uji-ubin-k4b4a.mjs.
 */
import type { Cara, Kisi, Langkah, LangkahSalah, LangkahSoal, LBaris, LSatuan, LTangga, LTutup, Rupa, Satuan, SoalMisi } from "./logika-cpa";
import { URUT_METODE, instruksi, ucapkan } from "./logika-cpa";

export { MISI_UBIN_TEKS } from "./data-sim";

const kisi = (b: number, k: number, u: Satuan): Kisi => ({ b, k, u });
const satuan = (b: number, k: number, u: Satuan = "cm²"): LSatuan => ({ tipe: "satuan", g: kisi(b, k, u) });
const tutup = (b: number, k: number, p: number, u: Satuan = "cm²"): LTutup => ({ tipe: "tutup", g: kisi(b, k, u), p });
const baris = (b: number, k: number, u: Satuan = "cm²"): LBaris => ({ tipe: "baris", g: kisi(b, k, u) });
const tangga = (m: number, arah: "turun" | "naik"): LTangga => ({ tipe: "tangga", m, arah });
const salah = (dasar: LBaris | LTangga, tokoh: string, kataTokoh: string, jawabTokoh: string, alasan: [string, string, string], benar: number, keliru: string, betul = false): LangkahSalah => ({
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

/** Empat langkah satu misi, berurut metode: IGIL, Cover the Floor, Rows and Columns, Unit Square Ladder. */
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

/* ------------------------------ Concrete: ubin berwarna di lantai tepi kolam ------------------------------ */
const C = satuMisi("benda");
export const CONCRETE: SoalMisi[] = [
  C(2, "klik", "Misi Ubin 2: tepi kolam", "Bu Sinta memasang ubin di tepi kolam anak. Periksa gambarnya.", [
    satuan(2, 3),
    tutup(3, 3, 4),
    salah(
      baris(2, 5),
      "Satria",
      "Lantai dua baris lima kolom luasnya tujuh sentimeter persegi, karena dua ditambah lima.",
      "7 cm²",
      [
        "Satria benar, luas lantai dihitung dengan menjumlahkan baris dan kolom.",
        "Satria keliru: luas persegi panjang dihitung dengan mengalikan baris dengan kolom, bukan menjumlahkannya.",
        "Satria keliru, lantai berbentuk persegi panjang tidak punya luas.",
      ],
      1,
      "Luas lantai dihitung dengan baris kali kolom, bukan dengan menambahkan keduanya.",
    ),
    tangga(3, "turun"),
  ]),
  C(3, "kanvas", "Misi Ubin 3: papan jalan", "Bu Sinta mencatat ubin di papan jalannya. Periksa gambarnya, lalu tulis jawabanmu di kanvas.", [satuan(4, 2), tutup(2, 4, 3), baris(3, 3), tangga(3, "naik")]),
  C(4, "suara", "Misi Ubin 4: panggilan Bu Sinta", "Bu Sinta memanggil dari tepi kolam. Jawab dengan suaramu.", [satuan(2, 3), tutup(2, 4, 2), baris(2, 3), tangga(5, "turun")]),
];

/* ------------------------------ Pictorial: kertas denah dengan petak dan tangga polos ------------------------------ */
const Pi = satuMisi("diagram");
export const PICTORIAL: SoalMisi[] = [
  Pi(5, "klik", "Misi Ubin 5: denah Genta", "Genta menyalin lantai ke kertas denah. Periksa gambarnya.", [
    satuan(3, 2, "m²"),
    tutup(4, 2, 3),
    salah(
      baris(3, 5),
      "Genta",
      "Lantai tiga baris lima kolom luasnya lima belas sentimeter persegi, karena tiga kali lima sama dengan lima belas.",
      "15 cm²",
      [
        "Genta keliru, luas harus dihitung dengan menjumlahkan baris dan kolom.",
        "Genta keliru, satuan luas cukup sentimeter tanpa persegi.",
        "Genta benar: luas dihitung dengan baris kali kolom, dan satuannya sentimeter persegi.",
      ],
      2,
      "Jawaban Genta benar: luas dihitung dengan baris kali kolom, dan satuannya sentimeter persegi.",
      true,
    ),
    tangga(5, "naik"),
  ]),
  Pi(6, "kanvas", "Misi Ubin 6: bagan Laras", "Laras menggambar bagan lantai kolam. Periksa gambarnya, lalu tulis jawabanmu di kanvas.", [satuan(5, 2), tutup(3, 3, 6), baris(2, 4, "m²"), tangga(7, "naik")]),
  Pi(7, "suara", "Misi Ubin 7: lapor ke Bu Sinta", "Genta melaporkan denahnya kepada Bu Sinta. Sebutkan jawabanmu.", [satuan(2, 2), tutup(2, 3, 2), baris(4, 2, "m²"), tangga(4, "naik")]),
];

/* ------------------------------ Abstract: daftar Bu Sinta dengan kartu kata dan angka ------------------------------ */
const A = satuMisi("lambang");
export const ABSTRACT: SoalMisi[] = [
  A(8, "klik", "Misi Ubin 8: daftar Bu Sinta", "Daftar Bu Sinta hanya berisi kata dan angka.", [
    satuan(2, 3, "m²"),
    tutup(2, 7, 5),
    baris(4, 6),
    salah(
      tangga(3, "turun"),
      "Satria",
      "Satu meter persegi sama dengan seratus sentimeter persegi, jadi tiga meter persegi sama dengan tiga ratus sentimeter persegi.",
      "300 cm²",
      [
        "Satria keliru: sisi satu meter persegi adalah seratus sentimeter, jadi luasnya seratus kali seratus sentimeter persegi.",
        "Satria benar, karena satu meter sama dengan seratus sentimeter.",
        "Satria keliru, meter persegi tidak bisa diubah menjadi sentimeter persegi.",
      ],
      0,
      "Hubungan satuan luas tidak sama dengan hubungan satuan panjang, jadi periksa lagi langkah Satria.",
    ),
  ]),
  A(9, "kanvas", "Misi Ubin 9: tulis di daftar", "Bu Sinta meminta kamu menulis jawaban di kanvas.", [satuan(3, 6), tutup(3, 3, 2), baris(2, 3, "m²"), tangga(4, "naik")]),
  A(10, "suara", "Misi Ubin 10: daftar akhir", "Daftar akhir untuk Bu Sinta. Ucapkan jawabannya.", [satuan(5, 2, "m²"), tutup(3, 3, 5), baris(3, 2, "m²"), tangga(6, "naik")]),
];

export const POIN_PENTING = [
  "Luas adalah banyak ubin satuan yang menutupi seluruh lantai.",
  "Satuan tidak baku, seperti kertas lipat atau keping ubin, bisa memberi hasil yang berbeda.",
  "Satuan baku, yaitu sentimeter persegi dan meter persegi, memberi hasil yang sama untuk semua orang.",
  "Luas persegi panjang sama dengan banyak baris kali banyak kolom. Contoh: 3 × 4 = 12 cm².",
  "Rumusnya: 1 m² = 10.000 cm².",
  "Selalu tulis satuan di belakang bilangan luas.",
];
/** Poin penting untuk suara (tanpa digit): bilangan, tanda, dan satuan menjadi kata. */
export const POIN_PENTING_SUARA = POIN_PENTING.map((p) => ucapkan(p));

/** Jembatan ke Sub-Bab B. */
export const PENUTUP_A = "Pak Anto, petugas kolam, datang membawa ember dan gelas ukur. Ia ingin tahu berapa banyak air untuk mengisi kolam anak, bukan luasnya. Menurutmu, bagaimana kita mengukur banyaknya air?";

export const TEMA_UBIN = {
  concrete: { ikon: "\u{1F9F1}", nama: "Concrete", cara: "Tepi kolam: ubin berwarna dipasang baris demi baris di lantai" },
  pictorial: { ikon: "\u{1F4D0}", nama: "Pictorial", cara: "Kertas denah: petak, tabel, dan tangga satuan polos" },
  abstract: { ikon: "\u{1F4DD}", nama: "Abstract", cara: "Daftar Bu Sinta: kartu kata dan angka, pilih, tulis, dan ucapkan" },
} as const;

/* Nama yang dipakai pemasang di IgilModulePlayer. */
export { CONCRETE as CONCRETE_UBIN, PICTORIAL as PICTORIAL_UBIN, ABSTRACT as ABSTRACT_UBIN };
