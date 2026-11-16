/** Tipe soal bersama semua pelabuhan Pasar Terapung. Murni, tanpa React. */
export type Bentuk = "benda" | "diagram" | "lambang";

/** `label` dipakai bila pilihan berupa kalimat (bukan bilangan); kunci selalu pilihan tanpa miskonsepsi. */
export type Pilihan = { id: string; nilai: number; miskonsepsi: string | null; label?: string };

export type Soal = {
  skillId: string;
  bentuk: Bentuk;
  a: number;
  b: number;
  kunci: number;
  pilihan: Pilihan[];
  /** Cara menggambar soal. Bawaan "kelompok" (dua kelompok benda atau titik). */
  tampil?: "kelompok" | "garis" | "bingkai" | "bagan" | "teks";
  /** Gambar benda (emoji) untuk bentuk benda; bawaan apel. `ikon2` untuk kelompok kedua. */
  ikon?: string;
  ikon2?: string;
  /** Mengganti jumlah yang digambar (mis. roda dari jumlah kendaraan). */
  jumlahA?: number;
  jumlahB?: number;
  /** Kalimat tanya tambahan, mis. "4 + 3 = ?". */
  tanya?: string;
  /** Kalimat penjumlahan yang ditampilkan (bentuk lambang pada skill kalimat), mis. "3 + 4 = 7". */
  kalimat?: string;
  /** Kalimat tanya dan suara: tanpa digit, tiap kalimat paling banyak delapan kata. */
  suara: string;
};

export type Hasil = { benar: boolean; miskonsepsi: string | null };

export type PetaMiskonsepsi = Record<string, { deskripsi: string; pesan: string }>;
