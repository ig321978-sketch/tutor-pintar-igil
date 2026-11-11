/**
 * Misi simulasi Matematika Kelas 2 Bab 8 (Berbagai Diagram): Sub-Bab A (Diagram Turus) dan Sub-Bab B (Diagram Gambar).
 * Murni: hanya `import type` dari ./misi-simulasi. Logika alat ada di lab-data-k2b8.ts.
 * Urutan kategori tiap kumpulan data (dipakai misi) tetap dan ditulis di lab-data-k2b8.ts:
 *   buah = anggur, jeruk, apel, pisang; hewan = ayam, kambing, sapi, bebek; bunga = mawar, lili, tulip, aster;
 *   warna = merah, kuning, biru, hitam; permainan = karet, lompat tali, petak umpet, benteng.
 * Keadaan awal tiap alat tidak boleh langsung memenuhi misi apa pun.
 */

import type { DefMisi, KeadaanSelesai } from "./misi-simulasi";

/** Lab Turus: anak membuat data sendiri dan melihat turus, benda, tabel, kelompok lima. */
export type KeadaanLabTurus = {
  alat: "turus";
  set: string;
  n: number[];
  benda: boolean;
  turus: boolean;
  tabel: boolean;
  kelompok: boolean;
};

/** Lab Baca Turus: membandingkan dua baris dari data nyata. */
export type KeadaanLabBaca = {
  alat: "baca";
  set: string;
  a: string | null;
  b: string | null;
  paling: boolean;
  selisih: boolean;
};

/** Lab Diagram Gambar: anak membuat data sendiri dan melihat gambar, tabel, turus, judul dan keterangan. */
export type KeadaanLabGambar = {
  alat: "gambar";
  set: string;
  n: number[];
  lambang: string;
  /** Berapa kali lambang diganti saat sudah ada data. */
  ganti: number;
  gambar: boolean;
  tabel: boolean;
  turus: boolean;
  ket: boolean;
};

export type KeadaanK2Bab8 = KeadaanLabTurus | KeadaanLabBaca | KeadaanLabGambar | KeadaanSelesai;

const turus = (k: KeadaanK2Bab8): k is KeadaanLabTurus => k.alat === "turus";
const baca = (k: KeadaanK2Bab8): k is KeadaanLabBaca => k.alat === "baca";
const gambar = (k: KeadaanK2Bab8): k is KeadaanLabGambar => k.alat === "gambar";
const selesai = (k: KeadaanK2Bab8, id: string) => k.alat === "selesai" && k.id === id;

const sama = (a: number[], b: number[]) => a.length === b.length && a.every((x, i) => x === b[i]);
const pasang = (k: KeadaanLabBaca, x: string, y: string) => (k.a === x && k.b === y) || (k.a === y && k.b === x);
const jumlah = (n: number[]) => n.reduce((a, x) => a + x, 0);

/** Sub-Bab A: diagram turus (membuat, mencatat, membaca). */
export const MISI_A: DefMisi<KeadaanK2Bab8>[] = [
  {
    id: "a-lima",
    teks: "Di Lab Turus, nyalakan Turus dan buat satu jenis tepat 5. Empat garis dicoret garis kelima: satu kelompok lima.",
    wajib: true,
    cek: (k) => turus(k) && k.turus && k.kelompok && k.n.some((x) => x === 5),
  },
  {
    id: "a-sepuluh",
    teks: "Buat satu jenis tepat 10. Turusnya dua kelompok lima.",
    wajib: true,
    cek: (k) => turus(k) && k.turus && k.kelompok && k.n.some((x) => x === 10),
  },
  {
    id: "a-buah",
    teks: "Nyalakan Tabel dan buat data buah kesukaan: anggur 2, jeruk 6, apel 4, pisang 3.",
    wajib: true,
    cek: (k) => turus(k) && k.set === "buah" && k.tabel && sama(k.n, [2, 6, 4, 3]),
  },
  { id: "a-catat", teks: "Selesaikan Mesin Catat Turus sampai semua data tercatat dan dibaca.", wajib: true, cek: (k) => selesai(k, "mesin-catat") },
  {
    id: "a-lebih",
    teks: "Di Lab Baca Turus, pilih data hewan, lalu bandingkan bebek dengan ayam. Bebek satu lebihnya dari ayam.",
    wajib: true,
    cek: (k) => baca(k) && k.set === "hewan" && pasang(k, "bebek", "ayam"),
  },
  {
    id: "a-paling",
    teks: "Nyalakan Paling banyak dan paling sedikit pada data hewan. Lihat baris terpanjang dan terpendek.",
    wajib: true,
    cek: (k) => baca(k) && k.set === "hewan" && k.paling,
  },
  {
    id: "a-sama",
    teks: "Pilih data bunga, lalu bandingkan lili dengan aster. Keduanya sama banyak.",
    wajib: false,
    cek: (k) => baca(k) && k.set === "bunga" && pasang(k, "lili", "aster"),
  },
  {
    id: "a-kambing",
    teks: "Pada data hewan, bandingkan kambing dengan sapi. Kambing dua lebihnya dari sapi.",
    wajib: false,
    cek: (k) => baca(k) && k.set === "hewan" && pasang(k, "kambing", "sapi"),
  },
  {
    id: "a-selisih",
    teks: "Nyalakan Selisih, lalu bandingkan dua baris yang berbeda banyak.",
    wajib: false,
    cek: (k) => baca(k) && k.selisih && k.a !== null && k.b !== null && k.a !== k.b,
  },
  {
    id: "a-benda",
    teks: "Di Lab Turus, nyalakan Benda dan lihat bendanya bertambah bersama turus.",
    wajib: false,
    cek: (k) => turus(k) && k.benda && jumlah(k.n) > 0,
  },
  {
    id: "a-matikan",
    teks: "Matikan Kelompok lima, lalu buat satu jenis tepat 9. Garis yang berjejer sulit dihitung.",
    wajib: false,
    cek: (k) => turus(k) && k.turus && !k.kelompok && k.n.some((x) => x === 9),
  },
];

/** Sub-Bab B (sub-bab akhir): diagram gambar. Sekaligus pencapaian misi bab ini. */
export const MISI_B: DefMisi<KeadaanK2Bab8>[] = [
  {
    id: "b-lambang",
    teks: "Di Lab Diagram Gambar, isi sedikit data, lalu ganti lambang. Banyaknya tetap sama, hanya gambarnya berubah.",
    wajib: true,
    cek: (k) => gambar(k) && k.gambar && k.ganti >= 1,
  },
  {
    id: "b-warna",
    teks: "Pilih data warna kesukaan, lalu buat merah 7 dan hitam 2. Merah lima lebihnya dari hitam.",
    wajib: true,
    cek: (k) => gambar(k) && k.set === "warna" && k.n[0] === 7 && k.n[3] === 2,
  },
  {
    id: "b-dua-cara",
    teks: "Nyalakan Turus dan Diagram gambar bersamaan, lalu buat satu jenis tepat 8. Banyaknya sama di keduanya.",
    wajib: true,
    cek: (k) => gambar(k) && k.gambar && k.turus && k.n.some((x) => x === 8),
  },
  { id: "b-susun", teks: "Selesaikan Mesin Susun Diagram: judul, keterangan, gambar, lalu baca.", wajib: true, cek: (k) => selesai(k, "susun-diagram") },
  { id: "b-skenario", teks: "Selesaikan skenario Survei Kira sampai adegan akhir.", wajib: true, cek: (k) => selesai(k, "survei-kira") },
  {
    id: "b-sama",
    teks: "Buat dua jenis yang sama banyak, misalnya empat dan empat. Barisnya sama panjang.",
    wajib: false,
    cek: (k) => gambar(k) && k.n.some((x, i) => x > 0 && k.n.some((y, j) => i !== j && y === x)),
  },
  {
    id: "b-maks",
    teks: "Isi satu baris sampai 12, batas lab ini. Lab menolak yang lebih dari itu.",
    wajib: false,
    cek: (k) => gambar(k) && k.n.some((x) => x === 12),
  },
  {
    id: "b-permainan",
    teks: "Pilih data permainan tradisional, lalu buat karet 4 dan benteng 7. Benteng tiga lebihnya dari karet.",
    wajib: false,
    cek: (k) => gambar(k) && k.set === "permainan" && k.n[0] === 4 && k.n[3] === 7,
  },
  {
    id: "b-jumlah",
    teks: "Buat jumlah semua gambar tepat 20. Hitung baris demi baris.",
    wajib: false,
    cek: (k) => gambar(k) && jumlah(k.n) === 20,
  },
];

export const daftarMisiK2Bab8 = (sub: string): DefMisi<KeadaanK2Bab8>[] => (sub === "B" ? MISI_B : MISI_A);
