/**
 * Misi dan tantangan bebas Bab 5 (Bilangan sampai 20). Murni: tanpa React, tanpa jaringan.
 * Diuji di scripts/uji-lab-kelas1.mjs.
 *
 * Simulasi bertahap: satu laboratorium bilangan yang alatnya bertambah per sub-bab
 * (A: kini Wadah Sekat Sepuluh, Misi Lapak Ikan bagian satu (ikan-k1b5a); dulu Lab Puluhan dan Satuan sampai 20; B: kini Rak Akuarium Bernomor, Misi Lapak Ikan bagian satu (rak-k1b5b); dulu Maju dan Mundur, Ulat dan Kisi; C: kini Meja Kemas (kemas-k1b5c); D: kini Lapak Ikan (lapak-k1b5d), penutup bab).
 */

// Hanya impor tipe: berkas ini diuji langsung di Node (tanpa pemaket), jadi tidak boleh mengimpor nilai dari berkas lain.
import type { DefMisi, KeadaanSelesai } from "./misi-simulasi";
import type { KeadaanIkan } from "./ikan-k1b5a/logika";
import type { KeadaanRak } from "./rak-k1b5b/logika";
import type { KeadaanKemas } from "./kemas-k1b5c/logika";
import type { KeadaanLapak } from "./lapak-k1b5d/logika";

export type KeadaanPuluhan = {
  alat: "puluhan";
  n: number;
  m: number;
  /** Sepuluh benda sedang diikat (hanya bila n sudah 10 atau lebih). */
  ikat: boolean;
  /** Bandingkan nilai tempat sedang menyala. */
  banding: boolean;
  benda: boolean;
  bingkai: boolean;
  kalimat: boolean;
  tabel: boolean;
  garis: boolean;
};

export type KeadaanDeret = {
  alat: "deret";
  /** Titik awal perjalanan. */
  awal: number;
  /** Bilangan sekarang. */
  n: number;
  maju: number;
  mundur: number;
  /** Bilangan sekarang sedang disembunyikan di ulat bilangan. */
  sembunyi: boolean;
  tetangga: boolean;
  kisi: boolean;
};

/** Jeruk Kira, Tika, dan Wei (dipakai juga Bab 6, bersama SimulasiBanding). */
export type KeadaanBandingJeruk = {
  alat: "banding";
  jumlah: number[];
  pas: number;
  pasang: boolean;
  tanda: boolean;
  selisih: boolean;
  batang: boolean;
  benda: boolean;
  paling: boolean;
  urut: boolean;
  garis: boolean;
};

export type KeadaanBab5 = KeadaanPuluhan | KeadaanDeret | KeadaanBandingJeruk | KeadaanSelesai | KeadaanIkan | KeadaanRak | KeadaanKemas | KeadaanLapak;


/** Indeks yang paling besar sendirian, atau -1 bila ada yang sama besar di puncak. */
export function puncakTunggal(a: number[]): number {
  const m = Math.max(...a);
  const di = a.flatMap((x, i) => (x === m ? [i] : []));
  return di.length === 1 ? di[0] : -1;
}

/**
 * Sub-Bab A: Misi Lapak Ikan bagian satu, wadah sekat sepuluh (Simulasi "Ikan Baru Datang", ikan-k1b5a). Banyak ikan tiap kantong sama dengan
 * KANTONG_SIM di ikan-k1b5a/data.ts (diuji di scripts/uji-ikan-k1b5a.mjs): ikan cupang dua belas, ikan molly enam belas, ikan buntal sembilan belas.
 */
const ikan = (k: KeadaanBab5): k is KeadaanIkan => k.alat === "ikan";
export const TOTAL_IKAN_A: Record<string, number> = { cupang: 12, molly: 16, buntal: 19 };
const ID_IKAN = Object.keys(TOTAL_IKAN_A);
const habis = (k: KeadaanIkan, id: string) => k.pindah[id] === TOTAL_IKAN_A[id];
const labelPas = (k: KeadaanIkan, id: string) => habis(k, id) && k.angka[id] === TOTAL_IKAN_A[id] && k.nama[id] === TOTAL_IKAN_A[id];
export const MISI_A: DefMisi<KeadaanBab5>[] = [
  { id: "a-tebak", teks: "Pilih tebakan untuk satu kantong, lalu pindahkan semua ikannya satu per satu dengan jaring.", wajib: true, cek: (k) => ikan(k) && ID_IKAN.some((id) => k.tebak[id] !== null && habis(k, id)) },
  { id: "a-sepuluh", teks: "Penuhi wadah pertama sampai sepuluh sekat terisi, lalu mulai isi wadah kedua.", wajib: true, cek: (k) => ikan(k) && ID_IKAN.some((id) => k.pindah[id] > 10) },
  { id: "a-label", teks: "Pasang label angka dan label nama yang tepat pada satu kantong yang sudah dihitung.", wajib: true, cek: (k) => ikan(k) && ID_IKAN.some((id) => labelPas(k, id)) },
  { id: "a-semua", teks: "Hitung dan pasang label angka dan nama yang tepat pada ketiga kantong ikan.", wajib: true, cek: (k) => ikan(k) && ID_IKAN.every((id) => labelPas(k, id)) },
  { id: "a-dekat", teks: "Buat tebakan yang dekat dengan hasil hitung, lalu buktikan dengan menghitung.", wajib: false, cek: (k) => ikan(k) && ID_IKAN.some((id) => k.tebak[id] !== null && habis(k, id) && Math.abs((k.tebak[id] ?? 0) - TOTAL_IKAN_A[id]) <= 2) },
  { id: "a-ulang", teks: "Kembalikan satu ikan ke kantong, lalu hitung lagi sampai habis. Hasilnya tetap sama.", wajib: false, cek: (k) => ikan(k) && k.ulang.some((id) => habis(k, id)) },
];

/**
 * Sub-Bab B: Misi Lapak Ikan bagian satu, rak akuarium bernomor (Simulasi "Rak Akuarium Bernomor", rak-k1b5b). Label nomor yang jatuh sama dengan
 * HILANG_SIM di rak-k1b5b/data.ts (diuji di scripts/uji-rak-k1b5b.mjs): sembilan dan delapan belas, berbeda dari Story (tiga belas dan tujuh belas).
 */
const rak = (k: KeadaanBab5): k is KeadaanRak => k.alat === "rak";
export const HILANG_RAK_B = [9, 18] as const;
const pakanSekali = (k: KeadaanRak) => k.pakan.slice(1).every((p) => p === 1);
export const MISI_B: DefMisi<KeadaanBab5>[] = [
  { id: "b-maju", teks: "Pilih nomor mulai, lalu hitung maju: tekan Maju lima langkah berturut-turut.", wajib: true, cek: (k) => rak(k) && k.terbaikMaju >= 5 },
  { id: "b-mundur", teks: "Hitung mundur dari nomor lain: tekan Mundur lima langkah berturut-turut.", wajib: true, cek: (k) => rak(k) && k.terbaikMundur >= 5 },
  { id: "b-label", teks: "Pasang lagi dua label nomor yang jatuh. Lihat nomor sebelum dan sesudahnya.", wajib: true, cek: (k) => rak(k) && HILANG_RAK_B.every((n) => k.label[String(n)] === n) },
  { id: "b-pakan", teks: "Beri pakan semua akuarium rak cupang tepat sekali, tidak ada yang terlewat.", wajib: true, cek: (k) => rak(k) && pakanSekali(k) },
  { id: "b-tetangga", teks: "Nyalakan Tetangga, lalu berdiri di akuarium sembilan belas. Sebutkan sebelum dan sesudahnya.", wajib: false, cek: (k) => rak(k) && k.tetangga && k.posisi === 19 },
  { id: "b-kisi", teks: "Nyalakan Kisi, lalu turun satu tingkat. Nomor di bawahnya tambah sepuluh.", wajib: false, cek: (k) => rak(k) && k.kisi && k.turun >= 1 },
];

/**
 * Sub-Bab C: Misi Lapak Ikan bagian dua, meja kemas (Simulasi "Meja Kemas", kemas-k1b5c). Banyak tiap barang sama dengan BARANG_SIM di kemas-k1b5c/data.ts
 * (diuji di scripts/uji-kemas-k1b5c.mjs): jaring kecil empat belas, botol vitamin delapan belas, pot tanaman air dua belas.
 */
const kemas = (k: KeadaanBab5): k is KeadaanKemas => k.alat === "kemas";
export const TOTAL_KEMAS_C: Record<string, number> = { jaring: 14, botol: 18, pot: 12 };
const ID_KEMAS = Object.keys(TOTAL_KEMAS_C);
const rapi = (k: KeadaanKemas, id: string) => k.ikat[id] === Math.floor(TOTAL_KEMAS_C[id] / 10);
const tabelPas = (k: KeadaanKemas, id: string) => rapi(k, id) && k.puluhan[id] === Math.floor(TOTAL_KEMAS_C[id] / 10) && k.satuan[id] === TOTAL_KEMAS_C[id] % 10;
export const MISI_C: DefMisi<KeadaanBab5>[] = [
  { id: "c-ikat", teks: "Kumpulkan sepuluh barang, lalu ikat dengan karet menjadi satu puluhan.", wajib: true, cek: (k) => kemas(k) && ID_KEMAS.some((id) => k.ikat[id] >= 1) },
  { id: "c-rapi", teks: "Ikat semua sepuluhan pada satu barang sampai sisanya kurang dari sepuluh.", wajib: true, cek: (k) => kemas(k) && ID_KEMAS.some((id) => rapi(k, id)) },
  { id: "c-tabel", teks: "Isi tabel puluhan dan satuan yang tepat untuk satu barang yang sudah diikat.", wajib: true, cek: (k) => kemas(k) && ID_KEMAS.some((id) => tabelPas(k, id)) },
  { id: "c-semua", teks: "Ikat dan isi tabel yang tepat untuk ketiga barang di meja kemas.", wajib: true, cek: (k) => kemas(k) && ID_KEMAS.every((id) => tabelPas(k, id)) },
  { id: "c-lepas", teks: "Lepas satu ikatan, lalu ikat lagi. Banyak barangnya tetap sama.", wajib: false, cek: (k) => kemas(k) && k.lepas.some((id) => rapi(k, id)) },
  { id: "c-kalimat", teks: "Nyalakan Kalimat, lalu baca puluhan dan satuan barang yang tabelnya tepat.", wajib: false, cek: (k) => kemas(k) && k.kalimat && tabelPas(k, k.pilih) },
];

/**
 * Sub-Bab D (penutup bab): Lapak Ikan Dibuka (Simulasi Lapak Ikan, lapak-k1b5d). Isi akuarium dan pesanan sama dengan AKUARIUM_SIM dan PEMBELI_SIM di lapak-k1b5d/data.ts
 * (diuji di scripts/uji-lapak-k1b5d.mjs).
 */
const lapak = (k: KeadaanBab5): k is KeadaanLapak => k.alat === "lapak";
/** Isi akuarium di lapak (berbeda dari Story): paling banyak buntal, paling sedikit udang. */
export const ISI_LAPAK_D: Record<string, number> = { cupang: 14, molly: 11, buntal: 17, udang: 6, siput: 11 };
export const PESANAN_LAPAK_D = [10, 17, 7] as const;
const ID_LAPAK = Object.keys(ISI_LAPAK_D);
const palingId = (banyak: boolean) => ID_LAPAK.reduce((a, b) => ((banyak ? ISI_LAPAK_D[b] > ISI_LAPAK_D[a] : ISI_LAPAK_D[b] < ISI_LAPAK_D[a]) ? b : a));

export const MISI_D: DefMisi<KeadaanBab5>[] = [
  { id: "d-pasang", teks: "Pilih dua akuarium yang isinya berbeda, lalu pasangkan ikannya satu-satu sampai terlihat sisanya.", wajib: true, cek: (k) => lapak(k) && k.pasangTuntas >= 1 },
  { id: "d-paling", teks: "Tandai akuarium yang paling banyak dan akuarium yang paling sedikit isinya.", wajib: true, cek: (k) => lapak(k) && k.palingBanyak === palingId(true) && k.palingSedikit === palingId(false) },
  { id: "d-urut", teks: "Pindahkan semua akuarium ke rak lapak, urut dari yang paling sedikit sampai yang paling banyak.", wajib: true, cek: (k) => lapak(k) && k.urutNaik },
  {
    id: "d-buka",
    teks: "Penutup bab: layani pembeli berurutan dengan akuarium yang cukup, lalu buka lapak ikan Abang.",
    wajib: true,
    cek: (k) => lapak(k) && k.buka && k.layani.length === PESANAN_LAPAK_D.length && k.layani.every((id, i) => id !== null && ISI_LAPAK_D[id] >= PESANAN_LAPAK_D[i]),
  },
  { id: "d-sama", teks: "Pasangkan dua akuarium yang isinya sama banyak sampai tidak ada sisa.", wajib: false, cek: (k) => lapak(k) && k.samaTuntas >= 1 },
  { id: "d-turun", teks: "Susun lagi semua akuarium dari yang paling banyak sampai yang paling sedikit.", wajib: false, cek: (k) => lapak(k) && k.urutTurun },
];

export const daftarMisiBab5 = (sub: string): DefMisi<KeadaanBab5>[] => (sub === "B" ? MISI_B : sub === "C" ? MISI_C : sub === "D" ? MISI_D : MISI_A);
