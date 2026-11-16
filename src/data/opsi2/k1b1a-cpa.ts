import type { SoalSpec, Tahap } from "../../lib/opsi2/tipe";

/**
 * Katalog soal CPA Opsi 2: Kelas 1 Bab 1 Sub-Bab A (Apel di Keranjang: Hitung, Baca, Tulis Bilangan).
 * Tiap tahap tepat sepuluh soal bernomor 1 sampai 10, tiap nomor satu tindakan berbeda (naskah/aturan-kuis-cpa-opsi2.md bagian 6).
 * Dunia Kampung Cemara. Instruksi: kalimat paling banyak delapan kata; sisipan {n} diisi kata bilangan.
 *
 * Status per tahap:
 *  - "lengkap"       : semua tindakan terdaftar dan instruksi final (Concrete).
 *  - "belum-ditulis" : KERANGKA SEMENTARA. Nomor dan id tindakan mengikuti katalog bagian 6, tetapi tindakannya belum
 *                      didaftarkan dan instruksi masih kosong; diganti saat Picture dan Abstract dikerjakan.
 */
export type DaftarTahap = { status: "lengkap" | "belum-ditulis"; soal: SoalSpec[] };

const s = (nomor: number, tindakan: string, instruksi: string, param: SoalSpec["param"] = {}): SoalSpec => ({ nomor, tindakan, instruksi, param });

const CONCRETE: SoalSpec[] = [
  s(1, "c-ketuk-hitung", "Ketuk tiap apel sambil menghitung. Lalu pilih banyaknya.", { rentang: [4, 9], jumlahPilihan: 3 }),
  s(2, "c-geser-piring", "Geser apel ke piring satu per satu. Lalu pilih banyaknya.", { rentang: [3, 9], jumlahPilihan: 4 }),
  s(3, "c-seret-keranjang", "Seret {n} apel ke keranjang. Lalu tekan periksa.", { rentang: [3, 9] }),
  s(4, "c-melingkar-bendera", "Pasang bendera di satu apel. Hitung berkeliling, lalu pilih banyaknya.", { rentang: [5, 10], jumlahPilihan: 3 }),
  s(5, "c-sekilas", "Lihat apel sebentar. Berapa banyaknya?", { rentang: [1, 4], jumlahPilihan: 3 }),
  s(6, "c-pilah-apel", "Ketuk hanya apel, bukan jeruk. Lalu pilih banyaknya.", { rentangApel: [2, 6], jumlahPilihan: 4 }),
  s(7, "c-jejer-deret", "Jejerkan apel menjadi satu deret. Lalu hitung dan pilih banyaknya.", { rentang: [3, 10], jumlahPilihan: 3 }),
  s(8, "c-isi-nampan", "Isi nampan dengan {n} apel. Mulai dari kiri atas.", { rentang: [3, 10] }),
  s(9, "c-keranjang-kosong", "Mana keranjang yang kosong?"),
  s(10, "c-cari-terlewat", "Niko terlewat satu apel. Ketuk apel yang terlewat.", { rentang: [4, 9] }),
];

/** Picture: diagram polos saja (titik, petak bingkai sepuluh, turus, kartu lambang). Urutan bebas; sepuluh tindakan berbeda. */
const PICTURE: SoalSpec[] = [
  s(1, "p-warnai-bingkai", "Warnai {n} petak pada bingkai sepuluh.", { rentang: [3, 10] }),
  s(2, "p-tandai-titik", "Tandai {n} titik pada deret.", { rentang: [2, 9] }),
  s(3, "p-hubungkan-lambang", "Hubungkan titik dengan lambangnya. Tarik garis.", { rentang: [1, 10] }),
  s(4, "p-pilih-diagram", "Pilih kartu yang titiknya {n}.", { rentang: [2, 9] }),
  s(5, "p-lengkapi-turus", "Lengkapi turus sampai {n}.", { rentang: [4, 10] }),
  s(6, "p-titik-tersebar", "Tandai tiap titik sekali. Lalu pilih banyaknya.", { rentang: [4, 10], jumlahPilihan: 3 }),
  s(7, "p-salin-pola", "Salin pola contoh ke bingkai kosong.", { rentang: [2, 8] }),
  s(8, "p-ketuk-semua-diagram", "Ketuk semua kartu yang banyaknya {n}.", { rentang: [2, 9] }),
  s(9, "p-papan-lambang", "Pilih lambang untuk diagram ini.", { rentang: [0, 10] }),
  s(10, "p-titik-melingkar", "Tandai titik pertama. Hitung berkeliling, lalu pilih banyaknya.", { rentang: [5, 10], jumlahPilihan: 4 }),
];

/** Abstract: lambang dan kata saja (lambang bilangan, kata bilangan, kartu), tanpa gambar benda atau diagram. Sepuluh tindakan berbeda. */
const ABSTRACT: SoalSpec[] = [
  s(1, "a-dengar-pilih", "Dengar namanya. Pilih lambang yang cocok.", { rentang: [0, 10], jumlahPilihan: 3 }),
  s(2, "a-tulis-kanvas", "Tulis lambang {n}. Ikuti garis hijau.", { rentang: [0, 9] }),
  s(3, "a-jodohkan-kata", "Jodohkan kata dengan lambangnya. Tarik garis.", { rentang: [0, 10] }),
  s(4, "a-urut-goresan", "Ketuk goresan lambang {n} sesuai urutan menulis.", { rentang: [2, 9] }),
  s(5, "a-benar-salah", "Lambang ini dibaca {n}. Benar atau salah?", { rentang: [0, 10] }),
  s(6, "a-detektif-arah", "Niko menulis satu lambang {n} terbalik. Ketuk yang terbalik."),
  s(7, "a-memori-kata", "Buka dua kartu. Cocokkan lambang dengan katanya.", { rentang: [0, 10] }),
  s(8, "a-ketuk-semua-lambang", "Ketuk semua lambang yang dibaca {n}.", { rentang: [0, 10] }),
  s(9, "a-lengkapi-kalimat", "Lengkapi kalimatnya. Lambang yang hilang dibaca {n}.", { rentang: [0, 10], jumlahPilihan: 4 }),
  s(10, "a-tulis-sepuluh", "Tulis sepuluh. Dua lambang: satu, lalu nol."),
];

export const CPA_K1B1A: Record<Tahap, DaftarTahap> = {
  concrete: { status: "lengkap", soal: CONCRETE },
  picture: { status: "lengkap", soal: PICTURE },
  abstract: { status: "lengkap", soal: ABSTRACT },
};
