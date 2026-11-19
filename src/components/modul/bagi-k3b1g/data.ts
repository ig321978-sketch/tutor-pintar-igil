/**
 * Isi tahap Concrete, Pictorial, dan Abstract Kelas 3 Bab 1 Sub-Bab G "Pesta Hari Jadi Toko" (pembagian sampai seratus), akhir cerita Toko Kelontong Pak Joko.
 * Misi lanjutan "Misi Meja Bingkisan" (nomor misi berlanjut dari Simulasi). Jawaban tidak hanya angka: memilih angka atau kata, mengetuk hasil tiap pengurangan berurutan,
 * menyusun langkah membagi rata, memilih alasan, satu angka di kanvas, dan satu kata atau bilangan yang diucapkan. Tanpa sisa pembagian.
 * Angka jawaban per tahap (tidak kembar dalam satu tahap): Concrete klik 15, kanvas 3, 8, 7, 4, suara 6, 2; Pictorial klik 12, kanvas 5, 9, 2, 6, suara 4, 3;
 * Abstract klik 15, 6, kanvas 8, 7, 5, 9, suara 2, 4. Ruang jawaban sempit (angka satu sampai sembilan): beberapa jawaban sama dengan angka pada data Story
 * (empat, lima, enam, tujuh), tetapi tidak kembar dalam satu tahap dan memakai bilangan lain.
 * Diuji: scripts/uji-bagi-k3b1g.mjs.
 */
import type { Cara, Klaim, Langkah, LangkahSalah, LangkahSoal, Rupa, SoalMisi } from "./logika-cpa";
import { URUT_METODE, instruksi } from "./logika-cpa";

export { MISI_BAGI_TEKS } from "./data-sim";

const salah = (tokoh: string, klaim: Klaim, kataTokoh: string, alasan: [string, string, string], benar: number, keliru: string): LangkahSalah => ({ tipe: "salah", tokoh, klaim, kataTokoh, alasan, benar, keliru });

const misi =
  (rupa: Rupa) =>
  (nomor: number, cara: Cara, judul: string, cerita: string, isi: [Langkah, Langkah, Langkah, Langkah]): SoalMisi => ({
    nomor,
    judul,
    cerita,
    cara,
    langkah: isi.map((l, i): LangkahSoal => {
      const s = instruksi(l, rupa, cara);
      return { metode: URUT_METODE[i], cara, judul: s, suara: s, langkah: l };
    }),
  });

const KUE = "\u{1F36A}";
const PERMEN = "\u{1F36C}";
const APEL = "\u{1F34E}";
const TELUR = "\u{1F95A}";

/* ------------------------------ Concrete: meja pesta dengan bingkisan dan benda beremoji ------------------------------ */
const C = misi("benda");
export const CONCRETE: SoalMisi[] = [
  C(2, "klik", "Misi Meja Bingkisan 2: meja pesta", "Pak Joko menata meja pesta dengan kue, permen, dan telur. Bantu membagi dan memeriksanya.", [
    salah(
      "Raka",
      { jenis: "hasil", n: 32, g: 4, dikira: 28, ikon: KUE },
      "Tiga puluh dua kue dibagi empat keranjang, tinggal kurangi empat, jadi tiap keranjang dua puluh delapan!",
      [
        "Raka benar, mengurangi empat sekali saja sudah menemukan hasil bagi.",
        "Pembagian harus diteruskan sampai habis. Tiap keranjang mendapat delapan kue, karena delapan kali empat sama dengan tiga puluh dua.",
        "Hasil bagi selalu sama dengan bilangan yang dibagi dikurangi pembagi.",
      ],
      1,
      "Mengurangi sekali saja belum selesai. Tiga puluh dua dibagi empat sama dengan delapan, jadi tiap keranjang berisi delapan kue, bukan dua puluh delapan.",
    ),
    { tipe: "bagi", n: 30, g: 2, ikon: PERMEN },
    { tipe: "deret", n: 16, g: 4, ikon: APEL },
    { tipe: "periksa", n: 27, g: 3, dikira: 9, ikon: TELUR },
  ]),
  C(3, "kanvas", "Misi Meja Bingkisan 3: catatan Salsa", "Salsa mencatat pembagian barang di meja pesta. Hitung, lalu tulis jawabanmu di kanvas.", [
    { tipe: "bagi", n: 18, g: 6, ikon: KUE },
    { tipe: "isi", n: 24, q: 3, ikon: APEL },
    { tipe: "kurang", n: 14, g: 2, ikon: PERMEN },
    { tipe: "pasang", g: 4, n: 16, ikon: TELUR },
  ]),
  C(4, "suara", "Misi Meja Bingkisan 4: panggilan Pak Joko", "Pak Joko memanggil dari balik meja kasir. Jawab dengan suaramu.", [
    { tipe: "istilah", n: 12, g: 3, sorot: "pembagi" },
    { tipe: "bagi", n: 12, g: 2, ikon: PERMEN },
    { tipe: "kurang", n: 10, g: 5, ikon: APEL },
    { tipe: "periksa", n: 20, g: 4, dikira: 6, ikon: TELUR },
  ]),
];

/* ------------------------------ Pictorial: kertas pembungkus dengan diagram polos ------------------------------ */
const Pi = misi("diagram");
export const PICTORIAL: SoalMisi[] = [
  Pi(5, "klik", "Misi Meja Bingkisan 5: kertas pembungkus", "Bima menggambar pembagian di kertas pembungkus. Periksa gambarnya.", [
    { tipe: "urutlangkah", n: 30, g: 5 },
    { tipe: "bagi", n: 36, g: 3 },
    { tipe: "deret", n: 32, g: 8 },
    salah(
      "Salsa",
      { jenis: "hasil", n: 40, g: 5, dikira: 5 },
      "Empat puluh dibagi lima sama dengan lima!",
      [
        "Salsa benar, hasil bagi sama dengan pembagi.",
        "Hasil bagi adalah isi tiap bagian, bukan pembagi. Lima kali delapan sama dengan empat puluh, jadi hasil baginya delapan.",
        "Hasil bagi selalu lebih kecil daripada pembagi.",
      ],
      1,
      "Lima adalah pembagi, yaitu banyak bagian. Hasil baginya delapan, karena lima kali delapan sama dengan empat puluh.",
    ),
  ]),
  Pi(6, "kanvas", "Misi Meja Bingkisan 6: gambar Bima", "Bima menyusun gambar yang lebih lengkap. Hitung, lalu tulis jawabanmu di kanvas.", [
    { tipe: "bagi", n: 30, g: 6 },
    { tipe: "isi", n: 27, q: 3 },
    { tipe: "kurang", n: 12, g: 6 },
    { tipe: "pasang", g: 7, n: 42 },
  ]),
  Pi(7, "suara", "Misi Meja Bingkisan 7: lapor ke Pak Joko", "Bima melaporkan gambarnya kepada Pak Joko. Sebutkan jawabanmu.", [
    { tipe: "istilah", n: 42, g: 6, sorot: "hasil" },
    { tipe: "bagi", n: 16, g: 4 },
    { tipe: "kurang", n: 15, g: 5 },
    { tipe: "periksa", n: 35, g: 5, dikira: 7 },
  ]),
];

/* ------------------------------ Abstract: spanduk pesta dengan kata dan lambang ------------------------------ */
const A = misi("lambang");
export const ABSTRACT: SoalMisi[] = [
  A(8, "klik", "Misi Meja Bingkisan 8: kartu ucapan", "Kartu-kartu ucapan hanya berisi kata dan lambang.", [
    salah(
      "Bima",
      { jenis: "periksa", n: 54, g: 6, dikira: 8, bilang: "cocok" },
      "Lima puluh empat dibagi enam sama dengan delapan. Periksa dengan kali: enam kali delapan cocok dengan lima puluh empat.",
      [
        "Bima benar, enam kali delapan sama dengan lima puluh empat.",
        "Enam kali delapan sama dengan empat puluh delapan, bukan lima puluh empat. Hasil baginya yang benar sembilan.",
        "Pembagian tidak perlu diperiksa dengan perkalian.",
      ],
      1,
      "Enam kali delapan sama dengan empat puluh delapan, bukan lima puluh empat, jadi hasil baginya belum cocok. Yang benar enam kali sembilan sama dengan lima puluh empat.",
    ),
    { tipe: "bagi", n: 90, g: 6 },
    { tipe: "deret", n: 35, g: 7 },
    { tipe: "balik", a: 9, b: 6 },
  ]),
  A(9, "kanvas", "Misi Meja Bingkisan 9: tulis di spanduk", "Salsa meminta kamu menulis jawaban di kanvas.", [
    { tipe: "bagi", n: 64, g: 8 },
    { tipe: "isi", n: 63, q: 9 },
    { tipe: "kurang", n: 40, g: 8 },
    { tipe: "pasang", g: 4, n: 36 },
  ]),
  A(10, "suara", "Misi Meja Bingkisan 10: ucapan penutup", "Ucapan terakhir pesta hari jadi toko. Bacakan jawabannya.", [
    { tipe: "istilah", n: 56, g: 8, sorot: "dibagi" },
    { tipe: "bagi", n: 16, g: 8 },
    { tipe: "kurang", n: 12, g: 3 },
    { tipe: "periksa", n: 48, g: 6, dikira: 9 },
  ]),
];

export const POIN_PENTING = [
  "Membagi berarti membagikan benda sama banyak ke beberapa bagian. Semua bagian harus sama banyak.",
  "Pembagian adalah pengurangan berulang sampai habis. Banyak pengurangan sama dengan hasil bagi.",
  "Pembagian ditulis dengan tanda titik dua: bilangan yang dibagi, pembagi, sama dengan, hasil bagi.",
  "Pembagi adalah banyak bagian. Hasil bagi adalah isi tiap bagian.",
  "Perkalian dan pembagian berkaitan. Hasil bagi dikali pembagi sama dengan bilangan yang dibagi.",
  "Tiga bilangan yang sama membentuk keluarga fakta: dua perkalian dan dua pembagian.",
  "Bilangan dibagi satu hasilnya bilangan itu sendiri, dan bilangan dibagi bilangan yang sama hasilnya satu.",
  "Periksa pembagian dengan perkalian, supaya hasilnya yakin benar.",
];
/** Poin penting untuk suara (tanpa digit dan tanpa lambang). */
export const POIN_PENTING_SUARA = POIN_PENTING;

/** Perayaan akhir cerita bab dan pertanyaan penutup. */
export const PENUTUP_G = "Pesta hari jadi Toko Pak Joko pun dimulai, dan semua pelanggan pulang membawa bingkisan. Menurutmu, di mana lagi kamu bisa memakai pembagian?";

export const TEMA_BAGI = {
  concrete: { ikon: "\u{1F381}", nama: "Concrete", cara: "Meja pesta: bingkisan, kue, permen, dan telur beremoji untuk dibagi, dikurangi berulang, dan diperiksa dengan kali" },
  pictorial: { ikon: "\u{1F4CA}", nama: "Pictorial", cara: "Kertas pembungkus: titik, kotak, dan garis bilangan polos untuk membagi, mengurangi berulang, dan memeriksa, tanpa gambar benda" },
  abstract: { ikon: "\u{1F389}", nama: "Abstract", cara: "Spanduk pesta: kalimat bagi dan kali dari kata dan lambang saja, pilih, tulis, dan ucapkan" },
} as const;

/* Nama yang dipakai pemasang di IgilModulePlayer. */
export { CONCRETE as CONCRETE_BAGI, PICTORIAL as PICTORIAL_BAGI, ABSTRACT as ABSTRACT_BAGI };
