/**
 * Data Simulasi Isi Kotak Kelas 5 Bab 2 Sub-Bab D "Kotak Bingkisan Pak Joko" (Pasar Kuliner Malam).
 * Data berbeda dari Story (kue 24 dan 18, 8 dan 20, 36 dan 48, 12 dan 28, 12 dan 42, 15 dan 35), Infografis (24 dan 18, 8 dan 20, 12 dan 18, 12 18 24), dan tugas CPA.
 * Eksplorasi bebas tanpa skor. Diuji: scripts/uji-kotak-k5b2d.mjs.
 */
export type SasaranKotak = { bil: number[]; satuan: string; nama: string[] };

/** Congklak faktor: dua bilangan paling banyak 30 (papan lubang 1 sampai 30). Lubang berisi dua biji adalah faktor persekutuan. */
export const CONGKLAK_SIM: readonly SasaranKotak[] = [
  { bil: [16, 20], satuan: "biji", nama: ["Biji merah", "Biji putih"] },
  { bil: [14, 28], satuan: "biji", nama: ["Biji merah", "Biji putih"] },
  { bil: [10, 25], satuan: "biji", nama: ["Biji merah", "Biji putih"] },
  { bil: [20, 30], satuan: "biji", nama: ["Biji merah", "Biji putih"] },
];
/** Isi kotak dua jenis kue: kotak sebanyak-banyaknya dengan isi sama dan semua kue terpakai. */
export const KOTAK_SIM: readonly SasaranKotak[] = [
  { bil: [20, 50], satuan: "buah", nama: ["Lemper", "Risoles"] },
  { bil: [28, 42], satuan: "buah", nama: ["Pastel", "Lumpia"] },
  { bil: [27, 45], satuan: "buah", nama: ["Dadar gulung", "Kue lapis"] },
  { bil: [32, 40], satuan: "buah", nama: ["Wajik", "Dodol"] },
];
/** Isi kotak tiga jenis kue: FPB tiga bilangan. */
export const TIGA_SIM: readonly SasaranKotak[] = [
  { bil: [18, 30, 42], satuan: "buah", nama: ["Bakpao", "Kroket", "Lontong"] },
  { bil: [20, 30, 50], satuan: "buah", nama: ["Sosis", "Tahu", "Tempe"] },
  { bil: [24, 36, 60], satuan: "buah", nama: ["Bolu", "Cucur", "Apem"] },
  { bil: [16, 28, 40], satuan: "buah", nama: ["Getuk", "Cenil", "Tiwul"] },
];
/** Terbesar yang sama: dua bilangan, faktor persekutuan ditampilkan dan FPB dipilih. */
export const BESAR_SIM: readonly SasaranKotak[] = [
  { bil: [18, 42], satuan: "buah", nama: ["Tahu isi", "Tempe mendoan"] },
  { bil: [24, 36], satuan: "buah", nama: ["Pisang goreng", "Ubi goreng"] },
  { bil: [30, 75], satuan: "buah", nama: ["Sate usus", "Sate telur"] },
  { bil: [40, 56], satuan: "buah", nama: ["Cilok", "Siomay"] },
];

export const MISI_KOTAK_TEKS = "Tandai lubang congklak yang berisi dua biji, isi kotak sebanyak-banyaknya, dan pilih FPB. Urutannya bebas.";
