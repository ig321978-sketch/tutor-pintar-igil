/**
 * Isi Poin Penting dan Refleksi penutup tahap Abstract, Kelas 1 Bab 1 Sub-Bab A (Apel di Keranjang).
 * Data murni (diuji di Node oleh scripts/uji-opsi2-abstract-k1a.mjs); tampilannya ada di components/modul/opsi2/poin-k1b1a.tsx.
 * Orisinal IGIL: empat langkah Metode IGIL (Tunjuk, Geser, Isi, Tulis), cara singkat, kegiatan di rumah, tiga refleksi.
 * TANPA penilaian. Semua yang dibacakan tanpa digit (bilangan dieja), kalimat paling banyak delapan kata.
 */

/** Ikon teks bukan emoji benda (semua di bawah U+1F300). */
export const IKON_POIN = { tunjuk: "☝️", geser: "➡️", isi: "⬜", tulis: "✏️" } as const;

/** Empat poin: `layar` boleh memuat lambang (digit); `suara` dibacakan tanpa digit. */
export const POIN_K1B1A: { nama: string; ikon: string; layar: string; suara: string }[] = [
  { nama: "Tunjuk", ikon: IKON_POIN.tunjuk, layar: "Tunjuk satu per satu. Yang terakhir disebut adalah banyaknya.", suara: "Tunjuk satu per satu. Yang terakhir disebut adalah banyaknya." },
  { nama: "Geser", ikon: IKON_POIN.geser, layar: "Benda yang sudah dihitung digeser ke samping.", suara: "Geser benda yang sudah dihitung. Supaya tidak terhitung dua kali." },
  { nama: "Isi", ikon: IKON_POIN.isi, layar: "Bingkai sepuluh: kosong berarti nol, penuh berarti sepuluh.", suara: "Isi bingkai sepuluh. Kosong berarti nol. Penuh berarti sepuluh." },
  {
    nama: "Tulis",
    ikon: IKON_POIN.tulis,
    layar: "Lambang 0 sampai 10 ditulis dengan gerak benar. 10 ditulis dua lambang: 1, lalu 0.",
    suara: "Tulis lambang nol sampai sepuluh. Ikuti gerak yang benar. Sepuluh ditulis dua lambang: satu, lalu nol.",
  },
];

export const CARA_K1B1A = {
  suara: "Hitung satu per satu. Yang terakhir adalah banyaknya.",
  potongan: [
    { teks: "Hitung satu per satu,", warna: "#DBEAFE" },
    { teks: "yang terakhir", warna: "#FEF9C3" },
    { teks: "adalah banyaknya.", warna: "#DCFCE7" },
  ],
};

export const RUMAH_K1B1A = "Di rumah, hitung sandal di dekat pintu. Tunjuk satu per satu. Sebut banyaknya, lalu tulis lambangnya di udara.";

export const REFLEKSI_K1B1A = ["Aku bisa menghitung satu per satu.", "Aku tahu nol artinya tidak ada.", "Aku bisa menulis lambang dengan gerak yang benar."];

export const SUARA_POIN_K1B1A = "Ini hal penting. Tunjuk, geser, isi, lalu tulis. Ketuk kartu untuk mendengarnya.";
