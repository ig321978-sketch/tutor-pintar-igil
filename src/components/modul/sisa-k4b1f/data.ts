/**
 * Isi tahap Concrete, Pictorial, dan Abstract Kelas 4 Bab 1 Sub-Bab F "Papan Sisa Pak Usman" (pengurangan bersusun sampai seribu: dari satuan ke kiri, mengambil, hitung maju, periksa dengan tambah),
 * cerita Penginapan Pulau Karang Indah. Misi lanjutan "Misi Sisa" (nomor misi berlanjut dari Simulasi). Data berbeda dari Story (612 dikurangi 275, 430 dikurangi 158, 750 sampai 840, 520 dikurangi 345).
 * Concrete memakai balok cacah dan benda pulau wisata beremoji di papan dermaga kayu, Pictorial memakai balok polos, garis bilangan polos, dan kartu bilangan di kertas petak,
 * Abstract memakai kartu kata, angka, dan hitung susun tertulis di daftar jaga dermaga.
 * Selaras buku (cara susun panjang): tugas "susun" kedua misi Klik dan Kanvas memakai susun panjang (kedua bilangan terurai, mis. 758 = 700 + 50 + 8, dikurangkan tiap tempat),
 * Klik tanpa mengambil dan Kanvas dua kali mengambil; tugas susun pendek: Suara satu kali mengambil dan Cari kesalahan Satria (tanpa mengambil ada di Story). Bilangan contoh buku (265, 132, 133) hanya di Story. Jawaban beragam: memilih bilangan atau nama tempat angka, menulis satu angka di kanvas,
 * dan mengucapkan bilangan pendek atau satu kata (satuan, puluhan, ratusan, sama, berbeda). Jawaban benar dihitung dari data.
 * Angka jawaban Tulis di kanvas per tahap: Concrete 2, 7, 4, 5; Pictorial 1, 7, 3, 4; Abstract 1, 3, 5, 4 (tidak kembar dalam satu tahap).
 * Diuji: scripts/uji-sisa-k4b1f.mjs.
 */
import type { Cara, Langkah, LangkahSalah, LangkahSoal, LAmbil, LCek, LMaju, LSusun, Rupa, SoalMisi, Tempat } from "./logika-cpa";
import { URUT_METODE, instruksi, ucapkan } from "./logika-cpa";

export { MISI_SISA_TEKS } from "./data-sim";

const susun = (benda: string, a: number, b: number, tempat: Tempat = "puluhan"): LSusun => ({ tipe: "susun", benda, a, b, tempat });
/** Susun panjang: kedua bilangan terurai (ratusan + puluhan + satuan) dan dikurangkan tiap tempat. */
const panjang = (benda: string, a: number, b: number, tempat: Tempat = "puluhan"): LSusun => ({ tipe: "susun", benda, a, b, tempat, panjang: true });
const ambil = (benda: string, a: number, b: number): LAmbil => ({ tipe: "ambil", benda, a, b });
const maju = (benda: string, a: number, b: number): LMaju => ({ tipe: "maju", benda, a, b });
const cek = (benda: string, a: number, b: number, klaim: number, tempat: Tempat = "ratusan"): LCek => ({ tipe: "cek", benda, a, b, klaim, tempat });
const salah = (dasar: LSusun | LCek, tokoh: string, kataTokoh: string, jawabTokoh: string, alasan: [string, string, string], benar: number, keliru: string, betul = false): LangkahSalah => ({
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

/** Empat langkah satu misi, berurut metode: IGIL, Column Subtract, Count Up, Add Check. */
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

/* ------------------------------ Concrete: papan dermaga kayu dengan balok cacah dan benda pulau ------------------------------ */
const C = satuMisi("benda");
export const CONCRETE: SoalMisi[] = [
  C(2, "klik", "Misi Sisa 2: dermaga sore", "Pak Usman menata balok cacah di papan dermaga kayu. Periksa gambarnya.", [
    salah(
      susun("sandal", 423, 186),
      "Satria",
      "Aku mengurangkan tiap tempat dengan menaruh angka besar di atas angka kecil, jadi hasilnya tiga ratus enam puluh tiga.",
      "363",
      [
        "Satria keliru: kalau angka di atas lebih kecil, ia harus mengambil satu dari tempat di kirinya, bukan membalik angka.",
        "Satria benar, mengurangkan angka besar dengan angka kecil di tiap tempat selalu boleh.",
        "Satria keliru, hasil pengurangan selalu lebih besar daripada bilangan awal.",
      ],
      0,
      "Angka di atas yang lebih kecil tidak boleh dibalik. Ambil satu dari tempat di kirinya, lalu kurangkan dari satuan ke kiri.",
    ),
    panjang("koper", 758, 324),
    maju("kelapa", 372, 348),
    cek("kerang", 640, 255, 385),
  ]),
  C(3, "kanvas", "Misi Sisa 3: papan sisa", "Laras mencatat sisa barang di papan sisa. Periksa gambarnya, lalu tulis jawabanmu di kanvas.", [
    ambil("lentera", 534, 279),
    panjang("keranjang", 843, 376, "satuan"),
    maju("nanas", 523, 496),
    cek("semangka", 912, 368, 534, "ratusan"),
  ]),
  C(4, "suara", "Misi Sisa 4: panggilan Pak Hendro", "Pak Hendro memanggil dari ujung dermaga. Jawab dengan suaramu.", [
    ambil("sandal", 532, 271),
    susun("koper", 647, 218),
    maju("kelapa", 815, 767),
    cek("kerang", 730, 285, 455),
  ]),
];

/* ------------------------------ Pictorial: kertas petak dengan balok polos, garis bilangan, dan kartu bilangan ------------------------------ */
const Pi = satuMisi("diagram");
export const PICTORIAL: SoalMisi[] = [
  Pi(5, "klik", "Misi Sisa 5: kertas petak", "Genta menyalin hitungan ke kertas petak biru muda. Periksa gambarnya.", [
    salah(
      cek("hitungan", 724, 358, 366),
      "Genta",
      "Hasil pengurangan boleh diperiksa dengan menambah: hasilnya ditambah bilangan yang dikurangkan harus kembali ke bilangan awal.",
      "724",
      [
        "Genta benar: hasil pengurangan ditambah bilangan yang dikurangkan harus sama dengan bilangan awal.",
        "Genta keliru: hasil pengurangan harus dikurangkan lagi, bukan ditambah.",
        "Genta keliru: pemeriksaan tidak diperlukan karena hasil pengurangan selalu benar.",
      ],
      0,
      "Menjumlahkan hasil dengan bilangan yang dikurangkan memang cara memeriksa pengurangan, jadi jawaban Genta benar.",
      true,
    ),
    panjang("hitungan", 978, 536),
    maju("hitungan", 704, 679),
    cek("hitungan", 915, 478, 447),
  ]),
  Pi(6, "kanvas", "Misi Sisa 6: kapur Laras", "Laras menggambar hitungan yang lebih besar. Periksa gambarnya, lalu tulis jawabanmu di kanvas.", [
    ambil("hitungan", 462, 137),
    panjang("hitungan", 953, 478, "puluhan"),
    maju("hitungan", 905, 887),
    cek("hitungan", 861, 392, 479, "ratusan"),
  ]),
  Pi(7, "suara", "Misi Sisa 7: lapor ke Pak Usman", "Genta melaporkan hitungannya kepada Pak Usman. Sebutkan jawabanmu.", [
    ambil("hitungan", 823, 559),
    susun("hitungan", 574, 318),
    maju("hitungan", 864, 837),
    cek("hitungan", 815, 367, 448),
  ]),
];

/* ------------------------------ Abstract: daftar jaga dermaga dengan kartu kata, angka, dan hitung susun tertulis ------------------------------ */
const A = satuMisi("lambang");
export const ABSTRACT: SoalMisi[] = [
  A(8, "klik", "Misi Sisa 8: daftar jaga", "Daftar jaga Pak Usman hanya berisi kata dan angka.", [
    salah(
      susun("hitungan", 462, 138),
      "Satria",
      "Setelah mengambil satu puluhan, aku tidak mencoret puluhannya, jadi enam dikurangi tiga sama dengan tiga dan hasilnya tiga ratus tiga puluh empat.",
      "334",
      [
        "Satria keliru: tempat yang diambil harus dicoret dan tinggal satu lebih kecil sebelum puluhan dikurangkan.",
        "Satria benar, tempat yang sudah diambil tidak perlu dicoret.",
        "Satria keliru, setelah mengambil hasilnya selalu nol.",
      ],
      0,
      "Tempat yang diambil tinggal satu lebih kecil. Coret angkanya dan tulis angka baru sebelum mengurangkan puluhan.",
    ),
    panjang("hitungan", 897, 514),
    maju("hitungan", 802, 756),
    cek("hitungan", 934, 567, 377, "puluhan"),
  ]),
  A(9, "kanvas", "Misi Sisa 9: tulis di daftar", "Satria meminta kamu menulis jawaban di kanvas.", [
    ambil("hitungan", 745, 382),
    panjang("hitungan", 832, 457, "ratusan"),
    maju("hitungan", 701, 685),
    cek("hitungan", 718, 259, 469, "ratusan"),
  ]),
  A(10, "suara", "Misi Sisa 10: daftar akhir", "Daftar akhir hitungan untuk Pak Usman. Ucapkan jawabannya.", [
    ambil("hitungan", 642, 371),
    susun("hitungan", 726, 418, "satuan"),
    maju("hitungan", 941, 896),
    cek("hitungan", 873, 496, 377),
  ]),
];

export const POIN_PENTING = [
  "Susun panjang menguraikan bilangan, misalnya 265 = 200 + 60 + 5 dan 132 = 100 + 30 + 2, lalu mengurangkan tiap tempat. Susun pendek menulis bilangan ke bawah dan mengurangkan dari satuan ke kiri, hasilnya sama.",
  "Kalau angka di atas lebih kecil, ambil satu dari tempat di kirinya, dan satu itu menjadi sepuluh di tempat kanan.",
  "Tempat yang diambil tinggal satu lebih kecil, jadi coret angkanya dan tulis angka barunya.",
  "Contoh: 612 − 275 = 337, dengan mengambil di satuan dan di puluhan.",
  "Hitung Maju: mulai dari bilangan kecil, lompat ke puluhan bulat dan ratusan bulat, lalu ke bilangan besar. Jumlah lompatan sama dengan selisih.",
  "Periksa dengan Tambah: hasil ditambah bilangan yang dikurangkan harus sama dengan bilangan awal, misalnya 337 + 275 = 612.",
  "Susun dan Pinjam, Hitung Maju, dan Periksa dengan Tambah membantu mengurangkan tanpa keliru.",
];
/** Poin penting untuk suara (tanpa digit): angka menjadi kata dan lambang dibaca lengkap. */
export const POIN_PENTING_SUARA = POIN_PENTING.map((p) => ucapkan(p));

/** Jembatan ke Sub-Bab G. */
export const PENUTUP_F =
  "Malam sudah dekat, dan Bu Marni menyiapkan perahu wisata. Besok banyak tamu akan berkeliling pulau naik perahu, dan penumpangnya harus dihitung. Menurutmu, bagaimana cara menghitung penumpang beberapa perahu sekaligus?";

export const TEMA_SISA = {
  concrete: { ikon: "\u{2693}", nama: "Concrete", cara: "Papan dermaga kayu: balok cacah dan benda pulau wisata beremoji, hitung dan pilih jawabannya" },
  pictorial: { ikon: "\u{1F4CA}", nama: "Pictorial", cara: "Kertas petak: balok polos, garis bilangan, dan kartu bilangan tanpa gambar benda" },
  abstract: { ikon: "\u{1F4DD}", nama: "Abstract", cara: "Daftar jaga dermaga: kartu kata, angka, dan hitung susun tertulis, pilih, tulis, dan ucapkan" },
} as const;

/* Nama yang dipakai pemasang di IgilModulePlayer. */
export { CONCRETE as CONCRETE_SISA, PICTORIAL as PICTORIAL_SISA, ABSTRACT as ABSTRACT_SISA };
