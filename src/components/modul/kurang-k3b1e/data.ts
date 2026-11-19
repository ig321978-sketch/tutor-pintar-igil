/**
 * Isi tahap Concrete, Pictorial, dan Abstract Kelas 3 Bab 1 Sub-Bab E "Sisa Stok Pak Anto" (pengurangan sampai seratus).
 * Misi lanjutan "Misi Rak Sisa" (nomor misi berlanjut dari Simulasi). Jawaban tidak hanya angka: memilih hasil, memilih kata (satuan, puluhan, pinjam, tanpa pinjam, tambah),
 * menyusun langkah, satu angka di kanvas, dan satu kata atau bilangan pendek yang diucapkan. Metode global: Pengurangan Bersusun, Menghitung Naik, Pinjam Puluhan.
 * Angka jawaban per tahap (tidak kembar dalam satu tahap): Concrete klik 42, 12, kanvas 8, 4, 3, 5, suara 6, 7; Pictorial klik 5, 15, kanvas 7, 8, 4, 6, suara 3;
 * Abstract klik 78, 8, 13, kanvas 5, 4, 7, 2, suara 0, 6. Ruang jawaban satu angka sempit, jadi beberapa jawaban sama dengan angka pada data Story (tiga, enam, delapan, dua),
 * tetapi tidak kembar dalam satu tahap. Diuji: scripts/uji-kurang-k3b1e.mjs.
 */
import type { Cara, Klaim, Langkah, LangkahSalah, LangkahSoal, Rupa, SoalMisi } from "./logika-cpa";
import { URUT_METODE, instruksi } from "./logika-cpa";

export { MISI_SISA_TEKS } from "./data-sim";

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

/* ------------------------------ Concrete: rak mi dengan bungkus dan kardus beremoji ------------------------------ */
const C = misi("benda");
export const CONCRETE: SoalMisi[] = [
  C(2, "klik", "Misi Rak Sisa 2: rak mi Pak Anto", "Pak Anto menata mi di rak toko Pak Joko. Bantu menghitung sisa dan memeriksa langkahnya.", [
    salah(
      "Raka",
      { jenis: "balik", a: 64, b: 38, hasil: 34 },
      "Empat dikurangi delapan tidak bisa, jadi delapan dikurangi empat sama dengan empat. Enam dikurangi tiga sama dengan tiga. Jadi tiga puluh empat!",
      [
        "Raka benar, satuan yang kecil boleh dibalik supaya bisa dikurangi.",
        "Satuan empat lebih kecil dari delapan, jadi harus meminjam satu puluhan. Empat belas dikurangi delapan sama dengan enam, lalu puluhan tinggal lima dikurangi tiga sama dengan dua.",
        "Pengurangan boleh dimulai dari puluhan dulu, jadi hasilnya tetap sama.",
      ],
      1,
      "Satuan empat lebih kecil dari delapan, jadi tidak boleh dibalik. Pinjam satu puluhan: empat belas dikurangi delapan sama dengan enam, lalu lima dikurangi tiga sama dengan dua. Hasilnya dua puluh enam.",
    ),
    { tipe: "hasil", a: 87, b: 45 },
    { tipe: "naik", a: 91, b: 79, bagian: "total" },
    { tipe: "urut", ragam: "pinjam" },
  ]),
  C(3, "kanvas", "Misi Rak Sisa 3: catatan Salsa", "Salsa mencatat sisa mi dan kaleng di rak. Hitung, lalu tulis jawabanmu di kanvas.", [
    { tipe: "satuan", a: 95, b: 37 },
    { tipe: "puluhan", a: 72, b: 31 },
    { tipe: "naik", a: 93, b: 77, bagian: "satuan1" },
    { tipe: "sisapuluh", a: 62, b: 17 },
  ]),
  C(4, "suara", "Misi Rak Sisa 4: panggilan Pak Joko", "Pak Joko memanggil dari meja kasir. Jawab dengan suaramu.", [
    { tipe: "tempat", a: 73, b: 48, tanya: "dulu" },
    { tipe: "hasil", a: 67, b: 61 },
    { tipe: "naik", a: 95, b: 19, bagian: "puluh" },
    { tipe: "pinjam", a: 54, b: 29 },
  ]),
];

/* ------------------------------ Pictorial: diagram balok dan garis bilangan polos ------------------------------ */
const Pi = misi("diagram");
export const PICTORIAL: SoalMisi[] = [
  Pi(5, "klik", "Misi Rak Sisa 5: diagram balok", "Bima menggambar balok untuk sisa stok. Periksa gambarnya.", [
    salah(
      "Bima",
      { jenis: "benar", a: 84, b: 58, hasil: 26 },
      "Empat tidak cukup dikurangi delapan, jadi aku pinjam satu puluhan. Empat belas dikurangi delapan sama dengan enam, dan tujuh dikurangi lima sama dengan dua. Hasilnya dua puluh enam.",
      [
        "Bima salah, satuan empat harus dikurangi delapan tanpa pinjam.",
        "Bima salah, puluhan tidak boleh berkurang setelah meminjam.",
        "Bima benar, setelah meminjam satuan menjadi empat belas dan puluhan tinggal tujuh, dan hasilnya cocok.",
      ],
      2,
      "Jawaban Bima benar. Setelah meminjam satu puluhan, empat belas dikurangi delapan sama dengan enam, dan tujuh dikurangi lima sama dengan dua. Hasilnya dua puluh enam.",
    ),
    { tipe: "urut", ragam: "susun" },
    { tipe: "naik", a: 63, b: 58, bagian: "total" },
    { tipe: "satuanjadi", a: 75, b: 38 },
  ]),
  Pi(6, "kanvas", "Misi Rak Sisa 6: diagram Salsa", "Salsa menyusun diagram yang lebih lengkap. Hitung, lalu tulis jawabanmu di kanvas.", [
    { tipe: "cerita", a: 61, b: 54, benda: "kaleng sarden", aksi: "diambil" },
    { tipe: "satuan", a: 96, b: 48 },
    { tipe: "naik", a: 84, b: 67, bagian: "satuan2" },
    { tipe: "sisapuluh", a: 73, b: 29 },
  ]),
  Pi(7, "suara", "Misi Rak Sisa 7: lapor ke Pak Joko", "Bima melaporkan diagramnya kepada Pak Joko. Sebutkan jawabanmu.", [
    { tipe: "periksaop", a: 58, b: 23 },
    { tipe: "tempat", a: 46, b: 19, tanya: "lalu" },
    { tipe: "naik", a: 91, b: 47, bagian: "satuan1" },
    { tipe: "pinjam", a: 86, b: 32 },
  ]),
];

/* ------------------------------ Abstract: susunan angka dan tanda di kertas nota ------------------------------ */
const A = misi("lambang");
export const ABSTRACT: SoalMisi[] = [
  A(8, "klik", "Misi Rak Sisa 8: kartu catatan", "Kartu-kartu catatan hanya berisi angka dan tanda.", [
    salah(
      "Raka",
      { jenis: "lupa", a: 92, b: 47, hasil: 55 },
      "Dua tidak bisa dikurangi tujuh, jadi aku pinjam. Dua belas dikurangi tujuh sama dengan lima. Sembilan dikurangi empat sama dengan lima. Hasilnya lima puluh lima.",
      [
        "Raka benar, puluhan tidak berubah setelah meminjam.",
        "Setelah meminjam, puluhan tinggal delapan, bukan sembilan. Delapan dikurangi empat sama dengan empat, jadi hasilnya empat puluh lima.",
        "Raka benar, hasilnya sudah diperiksa dengan penjumlahan.",
      ],
      1,
      "Setelah meminjam satu puluhan, puluhan sembilan tinggal delapan. Delapan dikurangi empat sama dengan empat, jadi hasilnya empat puluh lima, bukan lima puluh lima.",
    ),
    { tipe: "balikjumlah", a: 78, b: 29 },
    { tipe: "naik", a: 94, b: 86, bagian: "total" },
    { tipe: "satuanjadi", a: 63, b: 39 },
  ]),
  A(9, "kanvas", "Misi Rak Sisa 9: tulis di nota", "Salsa meminta kamu menulis jawaban di kanvas.", [
    { tipe: "satuan", a: 81, b: 36 },
    { tipe: "puluhan", a: 65, b: 24 },
    { tipe: "naik", a: 97, b: 58, bagian: "satuan2" },
    { tipe: "sisapuluh", a: 32, b: 18 },
  ]),
  A(10, "suara", "Misi Rak Sisa 10: catatan penutup", "Catatan terakhir tentang sisa stok Pak Anto. Bacakan jawabannya.", [
    { tipe: "hasil", a: 36, b: 36 },
    { tipe: "tempat", a: 57, b: 24, tanya: "dulu" },
    { tipe: "naik", a: 89, b: 12, bagian: "puluh" },
    { tipe: "pinjam", a: 45, b: 18 },
  ]),
];

export const POIN_PENTING = [
  "Pada pengurangan bersusun, puluhan lurus dengan puluhan dan satuan lurus dengan satuan.",
  "Kurangi satuan lebih dulu, lalu puluhan.",
  "Bila satuan atas lebih kecil, pinjam satu puluhan. Satu puluhan sama dengan sepuluh satuan, dan puluhan berkurang satu.",
  "Pada susun panjang, bilangan diuraikan menjadi puluhan dan satuan, lalu tiap bagian dikurangi.",
  "Menghitung naik: dari bilangan kecil naik sampai bilangan besar. Jumlah semua langkah naik adalah selisihnya.",
  "Periksa pengurangan dengan penjumlahan. Hasil ditambah bilangan yang dikurangkan harus sama dengan bilangan awal.",
  "Bilangan yang sama saling dikurangi hasilnya nol. Cerita pengurangan menanyakan sisa atau selisih.",
];
/** Poin penting untuk suara (tanpa digit dan tanpa lambang). */
export const POIN_PENTING_SUARA = POIN_PENTING;

export const TEMA_KURANG = {
  concrete: { ikon: "\u{1F35C}", nama: "Concrete", cara: "Rak mi Pak Anto: bungkus mi dan kardus beremoji untuk dikurangi, dipinjam, dan diperiksa" },
  pictorial: { ikon: "\u{1F4D0}", nama: "Pictorial", cara: "Papan kapur toko: balok batang dan kotak polos dengan garis bilangan, tanpa gambar benda" },
  abstract: { ikon: "\u{1F9FE}", nama: "Abstract", cara: "Kertas nota kasir: susunan angka dan tanda saja, pilih, tulis, dan ucapkan" },
} as const;

/* Nama yang dipakai pemasang di IgilModulePlayer. */
export { CONCRETE as CONCRETE_KURANG, PICTORIAL as PICTORIAL_KURANG, ABSTRACT as ABSTRACT_KURANG };
