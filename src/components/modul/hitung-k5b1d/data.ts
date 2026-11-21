/**
 * Isi tahap Concrete, Pictorial, dan Abstract Kelas 5 Bab 1 Sub-Bab D "Hitungan Penonton Pak Darmo" (jumlah dan kurang bersusun, perkalian dengan memisah pengali, pembagian per kolom,
 * dan cek dengan operasi kebalikan), akhir cerita Hari Pertandingan di Stadion Kota. Mengikuti rujukan hlm. 18-23; tanpa pembulatan dan perkiraan.
 * Misi lanjutan "Misi Hitung" (nomor misi berlanjut dari Simulasi). Data berbeda dari Story (penonton empat tribun, 12 kotak air minum, uang kas) dan dari Infografis: tugas memakai tiket kategori,
 * kios makanan, parkir, dan kursi stadion. Concrete memakai papan hitung stadion (kartu bernada stadion dengan emoji lama), Pictorial memakai diagram polos (kolom hitung),
 * Abstract memakai kartu kata dan angka bercap panitia. Jawaban benar dihitung dari logika-data.ts (lihat logika-cpa.ts).
 * Angka jawaban Tulis di kanvas per tahap: Concrete 1, 7, 5, 2; Pictorial 2, 5, 3, 8; Abstract 3, 4, 8, 7 (tidak kembar dalam satu tahap).
 * Diuji: scripts/uji-hitung-k5b1d.mjs.
 */
import type { Cara, Data, DasarSalah, Langkah, LangkahSalah, LangkahSoal, LBagi, LCek, LJumlah, LKali, LKurang, LRencana, Rupa, SoalMisi } from "./logika-cpa";
import { URUT_METODE, instruksi, suaraTugas, ucapkan } from "./logika-cpa";
import type { OpCek } from "./logika-data";

export { MISI_HITUNG_TEKS } from "./data-sim";

type S3 = [string, string, string];
const rencana = (r: number, pil?: S3): LRencana => ({ tipe: "rencana", r, ...(pil ? { pil } : {}) });
const jumlah = (d: Data, hasil: LJumlah["hasil"], kol?: number, pil?: S3): LJumlah => ({ tipe: "jumlah", d, hasil, ...(kol !== undefined ? { kol } : {}), ...(pil ? { pil } : {}) });
const kurang = (d: Data, hasil: LKurang["hasil"], kol?: number, pil?: S3): LKurang => ({ tipe: "kurang", d, hasil, ...(kol !== undefined ? { kol } : {}), ...(pil ? { pil } : {}) });
const kali = (d: Data, hasil: LKali["hasil"], kol?: number, pil?: S3): LKali => ({ tipe: "kali", d, hasil, ...(kol !== undefined ? { kol } : {}), ...(pil ? { pil } : {}) });
const bagi = (d: Data, hasil: LBagi["hasil"], kol?: number, pil?: S3): LBagi => ({ tipe: "bagi", d, hasil, ...(kol !== undefined ? { kol } : {}), ...(pil ? { pil } : {}) });
const cek = (d: Data, op: OpCek, hasil: LCek["hasil"], o: { kol?: number; klaim?: number } = {}): LCek => ({ tipe: "cek", d, op, hasil, ...(o.kol !== undefined ? { kol: o.kol } : {}), ...(o.klaim !== undefined ? { klaim: o.klaim } : {}) });
const data = (satuan: string, nama: [string, string], a: number, b: number): Data => ({ satuan, nama, a, b });
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

/** Empat langkah satu misi, berurut metode: IGIL, Round and Guess, Stack and Trade, Undo to Check. */
const satuMisi =
  (rupa: Rupa) =>
  (nomor: number, cara: Cara, judul: string, cerita: string, isiMisi: [Langkah, Langkah, Langkah, Langkah]): SoalMisi => ({
    nomor,
    judul,
    cerita,
    cara,
    langkah: isiMisi.map((l, i): LangkahSoal => ({ metode: URUT_METODE[i], cara, judul: instruksi(l, rupa, cara, URUT_METODE[i]), suara: suaraTugas(l, rupa, cara, URUT_METODE[i]), langkah: l })),
  });

/* ------------------------------ Concrete: papan hitung stadion beremoji ------------------------------ */
const C = satuMisi("benda");
export const CONCRETE: SoalMisi[] = [
  C(2, "klik", "Misi Hitung 2: papan Pak Darmo", "Pak Darmo menata papan hitung di ruang panitia. Periksa papannya.", [
    rencana(1, ["Susun dan Tukar", "Pisah dan Kali", "Bagi dan Cek"]),
    jumlah(data("tiket", ["Tiket VIP", "Tiket biasa"], 27465, 38280), "total"),
    salah(
      kali(data("rupiah", ["Kotak air minum", "Banyak"], 4000, 12), "total", undefined, ["4.800 rupiah", "48.000 rupiah", "40.000 rupiah"]),
      "Fajar",
      "12 × 4.000 sama dengan 4.800 rupiah.",
      "4.800 rupiah",
      [
        "10 × 4.000 = 40.000, jadi hasilnya pasti lebih dari 40.000.",
        "Perkalian dengan pengali dua angka harus dikerjakan dari kiri tanpa memisah pengali.",
        "Hasil kali selalu lebih kecil dari bilangan yang dikalikan, jadi 4.800 wajar.",
      ],
      0,
      false,
      2,
    ),
    cek(data("porsi", ["Kios sate", "Kios bakso"], 7500, 6), "kali", "kembali"),
  ]),
  C(3, "kanvas", "Misi Hitung 3: catatan Citra", "Citra mencatat di papan hitung. Periksa papannya, lalu tulis jawabanmu di kanvas.", [
    rencana(3),
    jumlah(data("tiket", ["Tiket VIP", "Tiket biasa"], 36190, 25480), "tulis", 1),
    kali(data("rupiah", ["Bendera klub", "Banyak"], 2500, 13), "tulis", 2),
    bagi(data("rupiah", ["Uang kas", "Bagian"], 72000, 6), "digit", 3),
  ]),
  C(4, "suara", "Misi Hitung 4: panggilan Pak Arif", "Pak Arif memanggil lewat pengeras suara. Jawab dengan suaramu.", [
    rencana(2),
    kurang(data("tiket", ["Tiket dicetak", "Tiket terjual"], 40000, 15230), "sumber", 1),
    kali(data("rupiah", ["Peluit", "Banyak"], 3600, 14), "pisah"),
    cek(data("rupiah", ["Uang kas", "Bagian"], 24000, 4), "bagi", "operasi"),
  ]),
];

/* ------------------------------ Pictorial: diagram polos ------------------------------ */
const Pi = satuMisi("diagram");
export const PICTORIAL: SoalMisi[] = [
  Pi(5, "klik", "Misi Hitung 5: diagram Bima", "Bima menggambar kolom hitung untuk panitia. Periksa diagramnya.", [
    rencana(0, ["Bagi dan Cek", "Pisah dan Kali", "Susun dan Tukar"]),
    kurang(data("kursi", ["Kursi tersedia", "Kursi terpakai"], 70300, 24150), "total"),
    kali(data("rupiah", ["Lampu sorot", "Banyak"], 4500, 14), "total"),
    salah(
      bagi(data("rupiah", ["Uang kas", "Tribun"], 48000, 6), "total", undefined, ["800 rupiah", "8.000 rupiah", "80.000 rupiah"]),
      "Citra",
      "48.000 : 6 sama dengan 8.000 rupiah.",
      "8.000 rupiah",
      [
        "Dicek dengan mengalikan kembali: 8.000 × 6 kembali ke 48.000, jadi hasil bagi benar.",
        "Membagi bilangan besar selalu menghasilkan sisa, jadi 8.000 pasti perlu ditulis bersama sisa pembagian.",
        "Hasil bagi harus lebih besar dari bilangan yang dibagi.",
      ],
      0,
      true,
      0,
    ),
  ]),
  Pi(6, "kanvas", "Misi Hitung 6: kolom Fajar", "Fajar membuat kolom hitung yang lebih lengkap. Periksa diagramnya, lalu tulis jawabanmu di kanvas.", [
    rencana(4),
    kurang(data("kursi", ["Kursi tersedia", "Kursi terpakai"], 80300, 24150), "tulis", 4),
    kali(data("rupiah", ["Bendera", "Banyak"], 6000, 13), "bagian"),
    cek(data("porsi", ["Kios roti", "Kios teh"], 12850, 36570), "jumlah", "digit", { kol: 2 }),
  ]),
  Pi(7, "suara", "Misi Hitung 7: lapor ke Pak Darmo", "Bima melaporkan kolom hitungnya kepada Pak Darmo. Sebutkan jawabanmu.", [
    rencana(1),
    jumlah(data("porsi", ["Kios mie", "Kios nasi"], 41735, 28640), "simpan", 2),
    kali(data("rupiah", ["Balon", "Banyak"], 6500, 15), "gabung"),
    cek(data("rupiah", ["Kios kopi", "Banyak"], 3500, 12), "kali", "klaim", { klaim: 4200 }),
  ]),
];

/* ------------------------------ Abstract: kartu kata dan angka bercap panitia ------------------------------ */
const A = satuMisi("lambang");
export const ABSTRACT: SoalMisi[] = [
  A(8, "klik", "Misi Hitung 8: lembar panitia", "Lembar panitia stadion hanya berisi kata dan angka.", [
    rencana(5, ["Susun dan Tukar", "Bagi dan Cek", "Pisah dan Kali"]),
    salah(
      jumlah(data("orang", ["Tribun Selatan", "Tribun Barat"], 36480, 27570), "total", undefined, ["53.950 orang", "64.050 orang", "63.050 orang"]),
      "Fajar",
      "Tiap kolom ditulis angka satuannya saja, jadi hasilnya 53.950 orang.",
      "53.950 orang",
      [
        "Tiap kolom cukup ditulis angka satuan dari jumlahnya, jadi simpanan tidak perlu dibawa ke kolom kiri.",
        "Jumlah kolom lebih dari sembilan harus disimpan ke kolom kiri, dan Fajar lupa.",
        "Penjumlahan bersusun dimulai dari kolom paling kiri.",
      ],
      1,
      false,
      1,
    ),
    kali(data("rupiah", ["Spanduk", "Banyak"], 2600, 15), "total"),
    bagi(data("rupiah", ["Uang kas", "Tribun"], 56000, 7), "total"),
  ]),
  A(9, "kanvas", "Misi Hitung 9: tulis di lembar", "Bu Lestari meminta kamu menulis jawaban di kanvas.", [
    rencana(2),
    jumlah(data("orang", ["Pengunjung pagi", "Pengunjung sore"], 33680, 40750), "tulis", 3),
    kali(data("rupiah", ["Bola", "Banyak"], 1800, 16), "tulis", 3),
    bagi(data("rupiah", ["Hadiah", "Pemain"], 63000, 9), "digit", 3),
  ]),
  A(10, "suara", "Misi Hitung 10: laporan akhir", "Laporan akhir hari pertandingan untuk Pak Darmo. Ucapkan jawabannya.", [
    rencana(3),
    kurang(data("tiket", ["Tiket dicetak", "Tiket dipakai"], 52300, 17640), "sumber", 1),
    kali(data("rupiah", ["Topi suporter", "Banyak"], 2000, 17), "pisah"),
    cek(data("porsi", ["Porsi pagi", "Porsi sore"], 18700, 22350), "jumlah", "operasi"),
  ]),
];

export const POIN_PENTING = [
  "Jumlah bersusun: sejajarkan bilangan, jumlahkan dari kanan, tulis satu angka dan simpan sisanya ke kolom kiri.",
  "Kurang bersusun: kurangkan dari kanan, dan bila angka atas lebih kecil, pinjam dari kolom kiri yang tidak nol.",
  "Pinjaman bisa bergulir melewati kolom nol, dan kolom nol yang dilewati menjadi sembilan.",
  "Kali dengan memisah pengali: 12 menjadi 10 dan 2, tiap bagian dikalikan, lalu hasilnya dijumlahkan.",
  "Kali bersusun mengalikan angka demi angka, lalu menjumlahkan barisnya dengan kolom yang lurus.",
  "Bagi per kolom dari kiri, dan sisa di satu kolom ditukar menjadi sepuluh di kolom sebelah kanannya.",
  "Cek dengan operasi kebalikan: tambah dengan kurang, kali dengan bagi, dan hasilnya harus kembali ke bilangan awal.",
];
/** Poin penting untuk suara (tanpa digit): angka dan tanda menjadi kata. */
export const POIN_PENTING_SUARA = POIN_PENTING.map((p) => ucapkan(p));

/** Perayaan akhir cerita bab (diucapkan setelah Poin Penting): keempat tamu dan semua tokoh hadir. */
export const PENUTUP_D =
  "Bu Ningsih, Pak Hasto, Bu Lestari, Pak Darmo, Pak Arif, Bima, Citra, dan Fajar merayakan Hari Pertandingan Stadion Kota. Spanduk terpasang, bendera klub berkibar, balon naik, dan peluit mulai pertandingan berbunyi. Terima kasih sudah belajar bersama, sampai jumpa di bab berikutnya!";

export const TEMA_HITUNG = {
  concrete: { ikon: "\u{1F3AB}", nama: "Concrete", cara: "Papan hitung stadion: kartu bilangan bernada stadion yang dilihat, dihitung, dan dicek" },
  pictorial: { ikon: "\u{1F4D0}", nama: "Pictorial", cara: "Kertas kolom hitung panitia: diagram kolom polos yang dibaca" },
  abstract: { ikon: "\u{1F4DC}", nama: "Abstract", cara: "Lembar hitung panitia stadion: kartu kata dan angka bercap, pilih, tulis, dan ucapkan" },
} as const;

/* Nama yang dipakai pemasang di IgilModulePlayer. */
export { CONCRETE as CONCRETE_HITUNG, PICTORIAL as PICTORIAL_HITUNG, ABSTRACT as ABSTRACT_HITUNG };
