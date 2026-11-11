/**
 * Misi dan tantangan bebas Kelas 2 Bab 2 (Penjumlahan dan Pengurangan sampai 20). Murni: tanpa React, tanpa jaringan.
 * Diuji di scripts/uji-lab-kelas2.mjs.
 *
 * Simulasi bertahap per sub-bab (paling banyak tiga alat):
 *  A: Lab Cara Hitung (tambah: garis, pasangan, bersusun) + Mesin Simpan.
 *  B: Lab Cara Hitung (+ kurang, Selisih, Periksa, Tambah sampai pas) + Mesin Urai.
 *  C (akhir): Lab Soal Cerita + Lab Cara Hitung penuh + skenario Jambu dan Burung, sekaligus pencapaian misi bab ini.
 */

// Hanya impor tipe: berkas ini diuji langsung di Node (tanpa pemaket), jadi tidak boleh mengimpor nilai dari berkas lain.
import type { DefMisi, KeadaanSelesai } from "./misi-simulasi";

export type KeadaanCara = {
  alat: "cara";
  op: "tambah" | "kurang";
  a: number;
  b: number;
  /** Garis bilangan sedang tampil. */
  garis: boolean;
  /** Bagan pasangan sedang tampil. */
  pasangan: boolean;
  /** Tabel bersusun sedang tampil. */
  susun: boolean;
  /** Pasang satu-satu (hanya pengurangan) sedang tampil. */
  selisih: boolean;
  /** Pemeriksaan dengan operasi lawan sedang tampil. */
  periksa: boolean;
  /** Garis memakai Tambah sampai pas (hanya pengurangan). */
  pas: boolean;
};

export type KeadaanCerita = {
  alat: "cerita";
  jenis: "jumlah" | "selisih" | "lebihnya" | "kurangnya" | "awal" | "tiga";
  x: number;
  y: number;
  z: number;
  /** Model batang sedang tampil. */
  batang: boolean;
  /** Empat langkah (Diketahui, Ditanya, Solusi, Kesimpulan) sedang tampil. */
  langkah: boolean;
};

export type KeadaanK2Bab2 = KeadaanCara | KeadaanCerita | KeadaanSelesai;

const cara = (k: KeadaanK2Bab2): k is KeadaanCara => k.alat === "cara";
const cerita = (k: KeadaanK2Bab2): k is KeadaanCerita => k.alat === "cerita";
const selesai = (k: KeadaanK2Bab2, id: string) => k.alat === "selesai" && k.id === id;

const tambah = (k: KeadaanK2Bab2, a: number, b: number): k is KeadaanCara => cara(k) && k.op === "tambah" && k.a === a && k.b === b;
const kurang = (k: KeadaanK2Bab2, a: number, b: number): k is KeadaanCara => cara(k) && k.op === "kurang" && k.a === a && k.b === b;

/** Sub-Bab A: tiga cara menjumlahkan dan menyimpan sepuluh satuan. */
export const MISI_A: DefMisi<KeadaanK2Bab2>[] = [
  { id: "a-12-6", teks: "Buat 12 + 6 seperti jambu Kira. Hitung 6 lompatan maju di garis.", wajib: true, cek: (k) => tambah(k, 12, 6) && k.garis },
  { id: "a-9-7", teks: "Buat 9 + 7. Baca bagan pasangan: 16 terdiri dari 9 dan 7.", wajib: true, cek: (k) => tambah(k, 9, 7) && k.pasangan },
  { id: "a-18-2", teks: "Buat 18 + 2. Di bersusun, satuan 8 + 2 = 10 dan harus disimpan.", wajib: true, cek: (k) => tambah(k, 18, 2) && k.susun },
  { id: "a-mesin", teks: "Selesaikan Mesin Simpan sampai semua misi mesin selesai.", wajib: true, cek: (k) => selesai(k, "simpan") },
  { id: "a-20", teks: "Buat penjumlahan lain yang hasilnya tepat 20, selain 18 + 2.", wajib: false, cek: (k) => cara(k) && k.op === "tambah" && k.a + k.b === 20 && !(k.a === 18 && k.b === 2) },
  { id: "a-susun-saja", teks: "Matikan Garis dan Pasangan, lalu hitung 13 + 7 hanya dengan bersusun.", wajib: false, cek: (k) => tambah(k, 13, 7) && !k.garis && !k.pasangan && k.susun },
];

/** Sub-Bab B: mengurangi, selisih, mengurai, memeriksa. */
export const MISI_B: DefMisi<KeadaanK2Bab2>[] = [
  { id: "b-mundur", teks: "Buat 18 − 12 dan hitung mundur di garis: 12 lompatan sampai 6.", wajib: true, cek: (k) => kurang(k, 18, 12) && k.garis && !k.pas },
  { id: "b-selisih", teks: "Nyalakan Selisih. Buat 16 − 9: pasangkan satu-satu, sisanya selisih.", wajib: true, cek: (k) => kurang(k, 16, 9) && k.selisih },
  { id: "b-urai", teks: "Buat 12 − 8. Di bersusun, satuan 2 tidak cukup, jadi urai satu puluhan.", wajib: true, cek: (k) => kurang(k, 12, 8) && k.susun },
  { id: "b-periksa", teks: "Nyalakan Periksa. Buat 14 − 6 lalu cek dengan penjumlahan: 8 + 6 = 14.", wajib: true, cek: (k) => kurang(k, 14, 6) && k.periksa },
  { id: "b-mesin", teks: "Selesaikan Mesin Urai sampai semua misi mesin selesai.", wajib: true, cek: (k) => selesai(k, "urai") },
  { id: "b-pas", teks: "Pilih Tambah sampai pas di garis untuk 18 − 12. Hitung lompatan majunya.", wajib: false, cek: (k) => kurang(k, 18, 12) && k.garis && k.pas },
  { id: "b-20", teks: "Buat 20 − 6. Satuan 0 tidak cukup, urai satu puluhan menjadi 14.", wajib: false, cek: (k) => kurang(k, 20, 6) && k.susun },
  { id: "b-ingat", teks: "Ingat Sub-Bab A: buat 18 + 2 dan lihat satuannya disimpan.", wajib: false, cek: (k) => tambah(k, 18, 2) && k.susun },
];

/** Sub-Bab C (sub-bab akhir): soal cerita, sekaligus pencapaian misi bab ini. */
export const MISI_C: DefMisi<KeadaanK2Bab2>[] = [
  { id: "c-lebih", teks: "Pilih Lebihnya: Tika 12 donat, Kira 6 lebihnya. Lihat batang Kira makin panjang.", wajib: true, cek: (k) => cerita(k) && k.jenis === "lebihnya" && k.x === 12 && k.y === 6 && k.batang },
  { id: "c-selisih", teks: "Pilih Selisih: jambu 12 dan 18. Lihat bagian batang yang tidak berpasangan.", wajib: true, cek: (k) => cerita(k) && k.jenis === "selisih" && Math.min(k.x, k.y) === 12 && Math.max(k.x, k.y) === 18 && k.batang },
  { id: "c-kurang", teks: "Pilih Kurangnya: donat Tika 12, donat Malosi 5 kurangnya. Hasilnya berapa?", wajib: true, cek: (k) => cerita(k) && k.jenis === "kurangnya" && k.x === 12 && k.y === 5 },
  { id: "c-awal", teks: "Pilih Bilangan awal: sisa 12, diberikan 4. Balik operasinya untuk mencari 16.", wajib: true, cek: (k) => cerita(k) && k.jenis === "awal" && k.x === 12 && k.y === 4 && k.langkah },
  { id: "c-skenario", teks: "Selesaikan skenario Jambu dan Burung sampai adegan akhir.", wajib: true, cek: (k) => selesai(k, "jambu-burung") },
  { id: "c-tiga", teks: "Pilih Tiga bilangan: boneka 5, 7, dan 8. Jumlahkan dua dulu, lalu yang ketiga.", wajib: false, cek: (k) => cerita(k) && k.jenis === "tiga" && k.x === 5 && k.y === 7 && k.z === 8 },
  { id: "c-sepuluh", teks: "Pilih Tiga bilangan yang dua pertamanya berjumlah 10, lalu tambahkan yang ketiga.", wajib: false, cek: (k) => cerita(k) && k.jenis === "tiga" && k.x + k.y === 10 && k.z >= 1 },
  { id: "c-ingat-urai", teks: "Ingat Sub-Bab B: di Lab Cara Hitung buat 12 − 8 dan lihat bersusun.", wajib: false, cek: (k) => kurang(k, 12, 8) && k.susun },
];

export const daftarMisiK2Bab2 = (sub: string): DefMisi<KeadaanK2Bab2>[] => (sub === "B" ? MISI_B : sub === "C" ? MISI_C : MISI_A);
