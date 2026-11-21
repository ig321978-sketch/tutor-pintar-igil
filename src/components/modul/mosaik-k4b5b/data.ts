/**
 * Isi tahap Concrete, Pictorial, dan Abstract Kelas 4 Bab 5 Sub-Bab B "Mosaik Pak Rudi" (menyusun dan menguraikan bangun datar), akhir cerita Toko Keramik Bu Dewi.
 * Misi lanjutan "Misi Mosaik" (nomor misi berlanjut dari Simulasi). Data berbeda dari Story (dua segitiga siku-siku menjadi persegi, segienam beraturan dibelah enam, persegi panjang jadi dua persegi)
 * kecuali ruang jawaban yang sempit. Concrete memakai keping keramik berwarna di meja kerja, Pictorial memakai diagram polos bertanda (sisi sama, sudut siku-siku), Abstract memakai kartu kata dan angka.
 * Jawaban benar dihitung dari koordinat bangun (lihat logika-cpa.ts). Angka jawaban Tulis di kanvas per tahap: Concrete 5, 6, 8, 4; Pictorial 8, 6, 7, 4; Abstract 6, 8, 7, 3 (tidak kembar dalam satu tahap).
 * Diuji: scripts/uji-mosaik-k4b5b.mjs.
 */
import type { Cara, DasarSalah, Langkah, LangkahSalah, LangkahSoal, LBagi, LDiagonal, LKeping, LNama, LPasang, LSebut, LSisi, KataSebut, Rupa, SoalMisi, Varian } from "./logika-cpa";
import { URUT_METODE, instruksi, ucapkan } from "./logika-cpa";

export { MISI_MOSAIK_TEKS } from "./data-sim";

type S3 = [string, string, string];
const nama = (bangun: string, pil: S3): LNama => ({ tipe: "nama", bangun, pil });
const sisi = (n: number): LSisi => ({ tipe: "sisi", n });
const sebut = (kata: KataSebut): LSebut => ({ tipe: "sebut", kata });
const pasang = (varian: Varian, pil?: S3): LPasang => ({ tipe: "pasang", varian, ...(pil ? { pil } : {}) });
const keping = (kolom: number, baris: number): LKeping => ({ tipe: "keping", kolom, baris });
const bagi = (n: number, pil?: S3): LBagi => ({ tipe: "bagi", n, ...(pil ? { pil } : {}) });
const diagonal = (n: number, pil?: S3, bangun?: string): LDiagonal => ({ tipe: "diagonal", n, ...(bangun ? { bangun } : {}), ...(pil ? { pil } : {}) });
const salah = (dasar: DasarSalah, tokoh: string, kataTokoh: string, jawabTokoh: string, alasan: S3, benar: number, betul = false, posisi?: number): LangkahSalah => ({
  tipe: "salah",
  dasar,
  tokoh,
  kataTokoh,
  jawabTokoh,
  alasan,
  benar,
  ...(betul ? { betul } : {}),
  ...(posisi !== undefined ? { posisi } : {}),
});

/** Empat langkah satu misi, berurut metode: IGIL, Fit the Pieces, Cut Into Triangles, Many Ways Mosaic. */
const satuMisi =
  (rupa: Rupa) =>
  (nomor: number, cara: Cara, judul: string, cerita: string, isiMisi: [Langkah, Langkah, Langkah, Langkah]): SoalMisi => ({
    nomor,
    judul,
    cerita,
    cara,
    langkah: isiMisi.map((l, i): LangkahSoal => {
      const s = instruksi(l, rupa, cara, URUT_METODE[i]);
      return { metode: URUT_METODE[i], cara, judul: s, suara: s, langkah: l };
    }),
  });

/* ------------------------------ Concrete: keping keramik berwarna di meja kerja Pak Rudi ------------------------------ */
const C = satuMisi("benda");
export const CONCRETE: SoalMisi[] = [
  C(2, "klik", "Misi Mosaik 2: meja kerja", "Pak Rudi menata keping keramik di meja kerjanya. Periksa kepingnya.", [
    nama("trapesium", ["jajargenjang", "trapesium", "layang-layang"]),
    pasang("belah ketupat", ["persegi panjang", "trapesium", "belah ketupat"]),
    bagi(7, ["6 segitiga", "7 segitiga", "8 segitiga"]),
    salah(
      diagonal(4, ["3 segitiga", "2 segitiga", "4 segitiga"], "persegi panjang"),
      "Satria",
      "Keramik persegi panjang dibelah dari sudut ke sudut, jadi ada tiga segitiga.",
      "3 segitiga",
      [
        "Tiap sisi persegi panjang melahirkan satu segitiga baru.",
        "Dari satu sudut hanya bisa ditarik satu garis ke sudut yang tidak bersebelahan, jadi bangun terbelah menjadi dua segitiga.",
        "Belahan dari sudut ke sudut selalu menghasilkan segiempat.",
      ],
      1,
      false,
      0,
    ),
  ]),
  C(3, "kanvas", "Misi Mosaik 3: catatan Laras", "Laras mencatat keping di meja kerja. Periksa kepingnya, lalu tulis jawabanmu di kanvas.", [sisi(5), keping(3, 2), bagi(8), diagonal(6)]),
  C(4, "suara", "Misi Mosaik 4: panggilan Pak Rudi", "Pak Rudi memanggil dari meja kerja. Jawab dengan suaramu.", [sebut("jajargenjang"), pasang("segitiga"), bagi(9), diagonal(7)]),
];

/* ------------------------------ Pictorial: kertas diagram polos dengan tanda sisi sama dan sudut siku-siku ------------------------------ */
const Pi = satuMisi("diagram");
export const PICTORIAL: SoalMisi[] = [
  Pi(5, "klik", "Misi Mosaik 5: kertas diagram", "Genta menggambar keping di kertas diagram. Periksa gambarnya.", [
    nama("layang-layang", ["belah ketupat", "layang-layang", "trapesium"]),
    salah(
      pasang("jajargenjang", ["persegi", "jajargenjang", "segitiga"]),
      "Laras",
      "Dua segitiga sama besar bisa disusun menjadi jajargenjang.",
      "jajargenjang",
      [
        "Dua segitiga sama besar selalu membentuk persegi, apa pun sisi yang dipertemukan.",
        "Dua segitiga tidak bisa membentuk bangun bersisi empat karena hanya punya tiga sisi.",
        "Dua segitiga sama besar dipasang pada sisi yang sama panjang, salah satunya diputar, sehingga terbentuk bangun bersisi empat dengan dua pasang sisi sejajar.",
      ],
      2,
      true,
      2,
    ),
    bagi(5, ["4 segitiga", "5 segitiga", "6 segitiga"]),
    diagonal(7, ["7 segitiga", "6 segitiga", "5 segitiga"]),
  ]),
  Pi(6, "kanvas", "Misi Mosaik 6: diagram Genta", "Genta membuat diagram yang lebih lengkap. Periksa gambarnya, lalu tulis jawabanmu di kanvas.", [sisi(8), keping(3, 2), bagi(7), diagonal(6)]),
  Pi(7, "suara", "Misi Mosaik 7: lapor ke Bu Dewi", "Genta melaporkan diagramnya kepada Bu Dewi. Sebutkan jawabanmu.", [sebut("persegi"), pasang("persegi"), bagi(9), diagonal(8)]),
];

/* ------------------------------ Abstract: lembar katalog dengan kartu kata dan angka ------------------------------ */
const A = satuMisi("lambang");
export const ABSTRACT: SoalMisi[] = [
  A(8, "klik", "Misi Mosaik 8: lembar katalog", "Lembar katalog toko hanya berisi kata dan angka.", [
    nama("persegi panjang", ["persegi", "persegi panjang", "jajargenjang"]),
    pasang("persegi", ["segitiga", "trapesium", "persegi"]),
    salah(
      bagi(5, ["6 segitiga", "5 segitiga", "4 segitiga"]),
      "Satria",
      "Garis ditarik dari titik tengah ke tiap sudut, lalu segitiganya satu lebih banyak dari banyak sisi.",
      "6 segitiga",
      [
        "Garis dari titik tengah ke tiap sudut menambah satu segitiga lagi di tengah.",
        "Garis dari titik tengah ke tiap sudut melahirkan tepat satu segitiga untuk tiap sisi, jadi banyak segitiga sama dengan banyak sisi.",
        "Banyak segitiga selalu dua lebih sedikit dari banyak sisi.",
      ],
      1,
      false,
      1,
    ),
    diagonal(6, ["6 segitiga", "5 segitiga", "4 segitiga"]),
  ]),
  A(9, "kanvas", "Misi Mosaik 9: tulis di lembar", "Laras meminta kamu menulis jawaban di kanvas.", [sisi(6), keping(4, 2), bagi(7), diagonal(5)]),
  A(10, "suara", "Misi Mosaik 10: laporan akhir", "Laporan akhir mosaik Pak Rudi untuk Bu Dewi. Ucapkan jawabannya.", [sebut("beraturan"), pasang("jajargenjang"), bagi(4), diagonal(9)]),
];

export const POIN_PENTING = [
  "Menyusun adalah menggabungkan bagian-bagian menjadi satu bangun utuh tanpa celah dan tanpa tumpukan.",
  "Menguraikan adalah membelah satu bangun menjadi bagian-bagiannya.",
  "Dua segitiga sama besar bisa membentuk persegi, jajargenjang, atau belah ketupat, bergantung pada sisi yang dipertemukan.",
  "Dari titik tengah, banyak segitiga sama dengan banyak sisi bangun beraturan.",
  "Dari satu sudut, bangun dengan n sisi terbagi menjadi n - 2 segitiga.",
  "Satu bangun bisa disusun dengan banyak cara, dan hasilnya tetap sama besar.",
  "Pasang Keping, Bagi Jadi Segitiga, dan Mosaik Banyak Cara membantu menyusun dan menguraikan bangun dengan teliti.",
];
/** Poin penting untuk suara (tanpa digit): angka dan tanda menjadi kata. */
export const POIN_PENTING_SUARA = POIN_PENTING.map((p) => ucapkan(p.replace(/\bn - 2\b/g, "n kurang dua").replace(/\bn\b/g, "banyak")));

/** Perayaan akhir cerita bab (diucapkan setelah Poin Penting): kedua tamu dan semua tokoh hadir. */
export const PENUTUP_B =
  "Satria, Laras, Genta, Pak Hendro, Bu Dewi, dan Pak Rudi merayakan akhir bab di Pameran Mosaik Toko Keramik. Spanduk terpasang, mosaik besar berkilau, balon naik, dan lampu hias menyala. Terima kasih sudah belajar bersama, sampai jumpa di bab berikutnya!";

export const TEMA_MOSAIK = {
  concrete: { ikon: "\u{1F9E9}", nama: "Concrete", cara: "Meja kerja Pak Rudi: keping keramik berwarna yang dilihat, dihitung, dan dipasang" },
  pictorial: { ikon: "\u{1F4D0}", nama: "Pictorial", cara: "Kertas diagram: bangun polos bertanda sisi sama dan sudut siku-siku yang digambar" },
  abstract: { ikon: "\u{1F4DC}", nama: "Abstract", cara: "Lembar katalog Bu Dewi: kartu kata dan angka di kertas krem, pilih, tulis, dan ucapkan" },
} as const;

/* Nama yang dipakai pemasang di IgilModulePlayer. */
export { CONCRETE as CONCRETE_MOSAIK, PICTORIAL as PICTORIAL_MOSAIK, ABSTRACT as ABSTRACT_MOSAIK };
