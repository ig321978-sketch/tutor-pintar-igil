/**
 * Misi dan tantangan bebas Bab 6 (Penjumlahan dan Pengurangan sampai 20). Murni: tanpa React, tanpa jaringan.
 * Diuji di scripts/uji-lab-kelas1.mjs.
 *
 * Simulasi bertahap: satu laboratorium garis bilangan yang alatnya bertambah per sub-bab
 * (A: Selisih Dua Kelompok + Garis Selisih; B: + Loncat Menjumlah, Jembatan Sepuluh, Belasan tambah;
 * C: + Loncat Mengurang, Belasan kurang, dan tab Loket Pasar Malam, sekaligus simulasi
 * pencapaian misi bab ini).
 */

// Hanya impor tipe: berkas ini diuji langsung di Node (tanpa pemaket), jadi tidak boleh mengimpor nilai dari berkas lain.
import type { DefMisi, KeadaanSelesai } from "./misi-simulasi";
import type { KeadaanBandingJeruk } from "./misi-bab5";
import type { KeadaanNampan } from "./nampan-k1b6a/logika";
import type { KeadaanKarcis } from "./karcis-k1b6b/logika";
import type { KeadaanTutup } from "./tutup-k1b6c/logika";

export type KeadaanLoncat = {
  alat: "loncat";
  op: "tambah" | "kurang" | "selisih";
  strategi: "satuan" | "sepuluh";
  a: number;
  b: number;
  /** Banyak lompatan bila meloncat satu-satu, dan bila meloncat lewat sepuluh. */
  satu: number;
  sepuluh: number;
};

export type KeadaanBelasan = {
  alat: "belasan";
  op: "tambah" | "kurang";
  a: number;
  b: number;
  benda: boolean;
  tabel: boolean;
  pecah: boolean;
  periksa: boolean;
};

export type KeadaanBab6 = KeadaanBandingJeruk | KeadaanLoncat | KeadaanBelasan | KeadaanSelesai | KeadaanNampan | KeadaanKarcis | KeadaanTutup;

/** Pasangan orang yang dibandingkan (sama dengan PASANGAN di lab-banding-bab5.ts; dicek di uji). */
export const PASANGAN_JERUK: [number, number][] = [
  [0, 1],
  [0, 2],
  [1, 2],
];

/** Selisih dua orang yang sedang dibandingkan. */
export const selisihPasang = (k: KeadaanBandingJeruk): number => {
  const [i, j] = PASANGAN_JERUK[k.pas] ?? PASANGAN_JERUK[0];
  return Math.abs(k.jumlah[i] - k.jumlah[j]);
};

const nam = (k: KeadaanBab6): k is KeadaanNampan => k.alat === "nampan";

/** Sub-Bab A: Misi Pasar Malam bagian satu, Meja Dua Nampan (nampan-k1b6a): pasangkan, batang, garis bilangan, dan menyamakan dua nampan. */
export const MISI_A: DefMisi<KeadaanBab6>[] = [
  { id: "a-pasang", teks: "Pilih dua nampan yang isinya beda, lalu pasangkan kuenya satu-satu sampai terlihat lebihnya dan kurangnya.", wajib: true, cek: (k) => nam(k) && k.pasangTuntas >= 1 },
  { id: "a-batang", teks: "Nyalakan Batang, lalu sorot kotak yang melebihi batang pendek untuk melihat selisihnya.", wajib: true, cek: (k) => nam(k) && k.batangTuntas >= 1 },
  { id: "a-garis", teks: "Di Garis, loncat dari bilangan kecil sampai bilangan besar, satu langkah tiap ketukan.", wajib: true, cek: (k) => nam(k) && k.garisTuntas >= 1 },
  { id: "a-samakan", teks: "Samakan dua nampan dengan menambah kue pada nampan yang lebih sedikit.", wajib: true, cek: (k) => nam(k) && k.tambahTuntas >= 1 },
  { id: "a-selisih", teks: "Pilih selisih yang tepat untuk dua nampan yang sudah dipasangkan.", wajib: false, cek: (k) => nam(k) && k.selisihBenar >= 1 },
  { id: "a-ambil", teks: "Samakan dua nampan dengan mengambil kue dari nampan yang lebih banyak.", wajib: false, cek: (k) => nam(k) && k.ambilTuntas >= 1 },
];

/**
 * Sub-Bab B: Misi Loket Karcis bagian satu (Simulasi Loket Karcis, karcis-k1b6b). Tiga rombongan tetap sama dengan ROMBONGAN_SIM di karcis-k1b6b/data.ts
 * (diuji di scripts/uji-karcis-k1b6b.mjs): merah sembilan dan enam, hijau dua belas dan lima, kuning delapan dan lima; rombongan keempat diatur sendiri.
 */
const kar = (k: KeadaanBab6): k is KeadaanKarcis => k.alat === "karcis";
export const JUMLAH_ROMBONGAN_B = 3;
export const MISI_B: DefMisi<KeadaanBab6>[] = [
  { id: "b-maju", teks: "Pilih satu rombongan dan hitung karcisnya dengan hitung maju sampai hasilnya tercatat.", wajib: true, cek: (k) => kar(k) && k.catat.some((c) => c.includes("maju")) },
  { id: "b-genap", teks: "Genapkan sepuluh dulu untuk rombongan yang satu bilangannya hampir sepuluh, sampai tercatat.", wajib: true, cek: (k) => kar(k) && k.catat.some((c) => c.includes("genap")) },
  { id: "b-belasan", teks: "Jumlahkan belasan dengan satuan untuk satu rombongan: satuan dulu, puluhannya tetap.", wajib: true, cek: (k) => kar(k) && k.catat.some((c) => c.includes("belasan")) },
  { id: "b-semua", teks: "Catat hasil semua rombongan di papan catatan supaya karcis dan kursi komidi putar cukup.", wajib: true, cek: (k) => kar(k) && k.catat.slice(0, JUMLAH_ROMBONGAN_B).length === JUMLAH_ROMBONGAN_B && k.catat.slice(0, JUMLAH_ROMBONGAN_B).every((c) => c.length > 0) },
  { id: "b-dua", teks: "Hitung satu rombongan dengan dua cara yang berbeda dan lihat hasilnya sama.", wajib: false, cek: (k) => kar(k) && k.catat.some((c) => c.length >= 2) },
  { id: "b-sendiri", teks: "Buat rombongan sendiri: atur dua bilangan, lalu hitung dengan cara apa saja sampai tercatat.", wajib: false, cek: (k) => kar(k) && (k.catat[JUMLAH_ROMBONGAN_B]?.length ?? 0) > 0 },
];

/**
 * Sub-Bab C (sub-bab akhir, penutup bab): Misi Pasar Malam, Meja Tutup Lapak (Simulasi Meja Tutup Lapak, tutup-k1b6c). Empat lapak tetap sama dengan DAGANG_SIM
 * di tutup-k1b6c/data.ts (diuji di scripts/uji-tutup-k1b6c.mjs): sosis bakar tujuh belas terjual enam, jagung rebus lima belas terjual sembilan,
 * permen kapas sembilan belas terjual empat, donat gula dua belas terjual delapan. Lapak yang satuannya cukup bisa dikerjakan dengan Kurangi satuan,
 * lapak yang satuannya kurang dengan Lewat sepuluh.
 */
const tut = (k: KeadaanBab6): k is KeadaanTutup => k.alat === "tutup";
export const LAPAK_TUTUP_C: Record<string, { awal: number; jual: number }> = { sosis: { awal: 17, jual: 6 }, jagung: { awal: 15, jual: 9 }, permen: { awal: 19, jual: 4 }, donat: { awal: 12, jual: 8 } };
const pakai = (k: KeadaanTutup, cara: string) => Object.values(k.lapor).some((c) => c.includes(cara as KeadaanTutup["cara"]));
export const MISI_C: DefMisi<KeadaanBab6>[] = [
  { id: "c-mundur", teks: "Laporkan sisa satu lapak dengan cara Mundur: mundur satu langkah tiap ketukan sebanyak yang terjual.", wajib: true, cek: (k) => tut(k) && pakai(k, "mundur") },
  { id: "c-satuan", teks: "Laporkan sisa satu lapak dengan Kurangi satuan, di lapak yang satuannya cukup. Puluhannya tetap.", wajib: true, cek: (k) => tut(k) && pakai(k, "satuan") },
  { id: "c-lewat", teks: "Laporkan sisa satu lapak yang satuannya kurang, dengan cara Lewat sepuluh.", wajib: true, cek: (k) => tut(k) && pakai(k, "lewat") },
  {
    id: "c-tutup",
    teks: "Penutup bab: laporkan sisa keempat lapak, periksa tiap hasil dengan menambah, lalu tutup pasar malam.",
    wajib: true,
    cek: (k) => tut(k) && k.tutup && Object.keys(LAPAK_TUTUP_C).every((id) => (k.lapor[id] ?? []).length > 0 && k.periksa.includes(id)),
  },
  { id: "c-pikir", teks: "Cari sisa satu lapak dengan Pikir penjumlahan: tambah dari yang terjual sampai jumlah semula.", wajib: false, cek: (k) => tut(k) && pakai(k, "pikir") },
  { id: "c-dua", teks: "Laporkan satu lapak dengan dua cara yang berbeda dan lihat hasilnya sama.", wajib: false, cek: (k) => tut(k) && Object.values(k.lapor).some((c) => c.length >= 2) },
];

export const daftarMisiBab6 = (sub: string): DefMisi<KeadaanBab6>[] => (sub === "B" ? MISI_B : sub === "C" ? MISI_C : MISI_A);
