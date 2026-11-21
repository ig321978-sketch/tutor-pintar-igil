/**
 * Isi tahap Concrete, Pictorial, dan Abstract Kelas 4 Bab 4 Sub-Bab A "Lantai Ubin Bu Sinta" (pengukuran luas: satuan baku, menutup lantai dengan ubin, baris kali kolom, meter persegi dan sentimeter persegi),
 * awal cerita Kolam Renang Tirta Ceria. Misi lanjutan "Misi Ubin" (nomor misi berlanjut dari Simulasi). Data berbeda dari Story (tiga baris empat kolom, empat baris lima kolom, lima baris enam kolom, dua meter persegi),
 * kecuali seed Cari kesalahan dari alur (dua baris lima kolom dijumlah menjadi tujuh). Concrete memakai uang kertas, origami, dan ubin berwarna di tepi kolam, Pictorial memakai lembar, petak, dan tangga polos di kertas denah,
 * Abstract memakai kartu kata dan angka di daftar Bu Sinta.
 * Jawaban beragam: memilih luas, satuan, atau hasil perubahan (klik, selalu dengan satuan), menulis satu angka di kanvas, dan mengucapkan satu kata atau bilangan. Jawaban benar dihitung dari data.
 * Angka jawaban Tulis di kanvas per tahap: Concrete 2, 5, 9, 6; Pictorial 4, 3, 8, 7; Abstract 3, 7, 6, 4 (tidak kembar dalam satu tahap).
 * Diuji: scripts/uji-ubin-k4b4a.mjs.
 */
import type { Bangun, Cara, Kisi, Langkah, LangkahSalah, LangkahSoal, LBangun, LBaris, LSatuan, LTangga, LTidakBaku, Rupa, Satuan, SoalMisi } from "./logika-cpa";
import { URUT_METODE, instruksi, ucapkan } from "./logika-cpa";

export { MISI_UBIN_TEKS } from "./data-sim";

const kisi = (b: number, k: number, u: Satuan): Kisi => ({ b, k, u });
const satuan = (b: number, k: number, u: Satuan = "cm²"): LSatuan => ({ tipe: "satuan", g: kisi(b, k, u) });
const tb = (r: number, k: number, nama: [string, string]): LTidakBaku => ({ tipe: "tidakbaku", r, k, nama });
const bangun = (a: Bangun, b: Bangun, u: Satuan = "cm²"): LBangun => ({ tipe: "bangun", a, b, u });
const baris = (b: number, k: number, u: Satuan = "cm²", duga = false, benda?: string): LBaris => ({ tipe: "baris", g: kisi(b, k, u), ...(duga ? { duga } : {}), ...(benda ? { benda } : {}) });
/** Satuan tidak baku: [satuan kecil, satuan besar]; satu satuan besar sama dengan dua satuan kecil. Concrete dan Abstract memakai uang kertas dan kertas origami, Pictorial memakai lembar polos. */
const NAMA_BENDA: [string, string] = ["uang kertas", "origami"];
const NAMA_POLOS: [string, string] = ["lembar kecil", "lembar besar"];
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
  C(2, "klik", "Misi Ubin 2: tepi kolam", "Bu Sinta mengukur meja kolam dan lantai tepi kolam. Periksa gambarnya.", [
    tb(1, 4, NAMA_BENDA),
    bangun(["XXX", "XXX"], ["XXXX", "XX.."]),
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
  C(3, "kanvas", "Misi Ubin 3: papan jalan", "Bu Sinta mencatat ubin di papan jalannya. Periksa gambarnya, lalu tulis jawabanmu di kanvas.", [tb(1, 2, NAMA_BENDA), bangun(["XXX", "XXX"], ["XXX", "Xoo", "ooo"]), baris(3, 3, "cm²", true, "kuku jari"), tangga(6, "naik")]),
  C(4, "suara", "Misi Ubin 4: panggilan Bu Sinta", "Bu Sinta memanggil dari tepi kolam. Jawab dengan suaramu.", [satuan(2, 3), bangun(["XXX", "XXX", "XXX"], ["XXXXXX", "XXX..."]), baris(2, 3), tangga(5, "turun")]),
];

/* ------------------------------ Pictorial: kertas denah dengan petak dan tangga polos ------------------------------ */
const Pi = satuMisi("diagram");
export const PICTORIAL: SoalMisi[] = [
  Pi(5, "klik", "Misi Ubin 5: denah Genta", "Genta menyalin lantai ke kertas denah. Periksa gambarnya.", [
    tb(3, 3, NAMA_POLOS),
    bangun(["XXXX", "XXXX"], ["XXX", "XXX", "XX."]),
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
  Pi(6, "kanvas", "Misi Ubin 6: bagan Laras", "Laras menggambar bagan lantai kolam. Periksa gambarnya, lalu tulis jawabanmu di kanvas.", [tb(1, 4, NAMA_POLOS), bangun(["XXXX", "XXXX"], ["XXXX", "XXoo", "Xo.."]), baris(2, 4, "m²", true), tangga(7, "naik")]),
  Pi(7, "suara", "Misi Ubin 7: lapor ke Bu Sinta", "Genta melaporkan denahnya kepada Bu Sinta. Sebutkan jawabanmu.", [satuan(2, 2), bangun(["XXX", "XXX"], ["XXXX", "XXX."]), baris(4, 2, "m²"), tangga(4, "naik")]),
];

/* ------------------------------ Abstract: daftar Bu Sinta dengan kartu kata dan angka ------------------------------ */
const A = satuMisi("lambang");
export const ABSTRACT: SoalMisi[] = [
  A(8, "klik", "Misi Ubin 8: daftar Bu Sinta", "Daftar Bu Sinta hanya berisi kata dan angka.", [
    tb(2, 3, NAMA_BENDA),
    bangun(["XXX", "XXX", "XXX"], ["XXXXX", "XXXX."]),
    baris(4, 6, "cm²", true),
    salah(
      tangga(8, "turun"),
      "Satria",
      "Satu meter persegi sama dengan seratus sentimeter persegi, jadi delapan meter persegi sama dengan delapan ratus sentimeter persegi.",
      "800 cm²",
      [
        "Satria keliru: sisi satu meter persegi adalah seratus sentimeter, jadi luasnya seratus kali seratus sentimeter persegi.",
        "Satria benar, karena satu meter sama dengan seratus sentimeter.",
        "Satria keliru, meter persegi tidak bisa diubah menjadi sentimeter persegi.",
      ],
      0,
      "Hubungan satuan luas tidak sama dengan hubungan satuan panjang, jadi periksa lagi langkah Satria.",
    ),
  ]),
  A(9, "kanvas", "Misi Ubin 9: tulis di daftar", "Bu Sinta meminta kamu menulis jawaban di kanvas.", [tb(1, 3, NAMA_BENDA), bangun(["XXX", "XXX"], ["XXXXX", "ooooo", "oo..."]), baris(2, 3, "m²"), tangga(4, "naik")]),
  A(10, "suara", "Misi Ubin 10: daftar akhir", "Daftar akhir untuk Bu Sinta. Ucapkan jawabannya.", [satuan(5, 2, "m²"), bangun(["XXXX", "XXXX", "X..."], ["XXX", "XXX", "XXX"]), baris(3, 2, "m²"), tangga(6, "naik")]),
];

export const POIN_PENTING = [
  "Luas adalah banyak satuan luas, yaitu persegi satuan, yang menutupi permukaan tanpa celah.",
  "Satuan tidak baku, seperti uang kertas, kertas origami, atau keping ubin, bisa memberi hasil yang berbeda untuk permukaan yang sama.",
  "Satuan baku, yaitu sentimeter persegi dan meter persegi, memberi hasil yang sama untuk semua orang.",
  "Makin kecil persegi satuannya, makin banyak jumlahnya untuk luas yang sama.",
  "Baris kali kolom adalah cara cepat menghitung persegi satuan yang berderet rapi. Contoh: 3 × 4 = 12 cm².",
  "Rumusnya: 1 m² = 10.000 cm².",
  "Bangun yang berbeda bentuk bisa memiliki luas yang sama, asalkan persegi satuannya sama besar.",
  "Menduga luas: bandingkan dengan satuan acuan, misalnya kuku jari kira-kira 1 cm² dan pintu lemari kira-kira 1 m², lalu periksa dengan menghitung.",
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
