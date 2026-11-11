/**
 * Misi dan tantangan bebas Bab 7 (Mengukur Panjang Benda). Murni: tanpa React, tanpa jaringan.
 * Diuji di scripts/uji-lab-kelas1.mjs.
 *
 * Simulasi bertahap: Sub-Bab A memakai laboratorium A, Sub-Bab B memakai laboratorium gabungan A dan B
 * dan menjadi simulasi pencapaian misi bab ini. Keadaan dilaporkan alat yang sedang dimainkan; misi yang
 * sudah tercapai tidak dicabut lagi (lihat misi-simulasi.ts).
 */

import type { DefMisi } from "./misi-simulasi";
import type { IdSatuan, StatusUkur } from "./lab-ukur-bab7";

export type KeadaanBanding = {
  alat: "banding";
  panjang: number[];
  sejajar: boolean;
  urut: boolean;
  dipilih: number[];
  satuan: string;
  angka: boolean;
};

export type KeadaanPosisi = { alat: "posisi"; tinggi: number[]; dipilih: number[] };

export type KeadaanUkur = { alat: "ukur"; id: IdSatuan; n: number; status: StatusUkur; tebak: number };

export type KeadaanBab7 = KeadaanBanding | KeadaanPosisi | KeadaanUkur;

const adaKembar = (a: number[]) => new Set(a).size < a.length;

/** Indeks yang paling besar sendirian, atau -1 bila ada yang sama besar di puncak. */
export function puncakTunggal(a: number[]): number {
  const m = Math.max(...a);
  const di = a.flatMap((x, i) => (x === m ? [i] : []));
  return di.length === 1 ? di[0] : -1;
}

const banding = (k: KeadaanBab7): k is KeadaanBanding => k.alat === "banding";
const posisi = (k: KeadaanBab7): k is KeadaanPosisi => k.alat === "posisi";
const ukur = (k: KeadaanBab7): k is KeadaanUkur => k.alat === "ukur";
const tepat = (k: KeadaanBab7, id: IdSatuan) => ukur(k) && k.id === id && k.status === "tepat";

/** Sub-Bab A: membandingkan dengan mata (tanpa angka). Pensil: Merah, Biru, Hijau, Kuning. Kupu-kupu: kuning, merah, hijau. */
export const MISI_A: DefMisi<KeadaanBab7>[] = [
  { id: "a-dua", teks: "Ketuk dua pensil. Baca siapa yang lebih panjang.", wajib: true, cek: (k) => banding(k) && k.dipilih.length === 2 },
  { id: "a-sejajar", teks: "Nyalakan Sejajarkan ujung kiri.", wajib: true, cek: (k) => banding(k) && k.sejajar },
  { id: "a-sama", teks: "Buat dua pensil sama panjang.", wajib: true, cek: (k) => banding(k) && adaKembar(k.panjang) },
  { id: "a-urut", teks: "Urutkan pensil dari terpendek.", wajib: true, cek: (k) => banding(k) && k.urut },
  { id: "a-kupu", teks: "Buat kupu-kupu kuning terbang lebih tinggi dari merah.", wajib: true, cek: (k) => posisi(k) && k.tinggi[0] > k.tinggi[1] },
  { id: "a-hijau", teks: "Buat pensil Hijau paling panjang sendirian.", wajib: false, cek: (k) => banding(k) && puncakTunggal(k.panjang) === 2 },
  { id: "a-puncak", teks: "Buat kupu-kupu kuning terbang paling tinggi.", wajib: false, cek: (k) => posisi(k) && puncakTunggal(k.tinggi) === 0 },
];

/**
 * Sub-Bab B (gabungan A dan B, simulasi pencapaian misi): mengukur dengan satuan.
 * Dua tantangan bebas memakai kembali hal dari A dan satu satuan lagi.
 */
export const MISI_B: DefMisi<KeadaanBab7>[] = [
  { id: "b-stik", teks: "Ukur pita dengan stik sampai pas di ujung.", wajib: true, cek: (k) => tepat(k, "stik") },
  { id: "b-tebak", teks: "Tebak tepat: tebakanmu sama dengan hasil ukur.", wajib: true, cek: (k) => ukur(k) && k.status === "tepat" && k.tebak === k.n },
  { id: "b-salah", teks: "Coba satu cara mengukur yang salah. Baca pesannya.", wajib: true, cek: (k) => ukur(k) && k.status === "salah-cara" },
  { id: "b-klip", teks: "Ukur pita yang sama dengan klip kecil sampai pas.", wajib: true, cek: (k) => tepat(k, "klip") },
  { id: "b-kotak", teks: "Buat pensil Hijau lebih panjang 2 kotak dari pensil Merah.", wajib: true, cek: (k) => banding(k) && k.angka && k.satuan === "kotak" && k.panjang[2] - k.panjang[0] === 2 },
  { id: "b-ingat", teks: "Ingat Sub-Bab A: sejajarkan, lalu urutkan dari terpendek.", wajib: false, cek: (k) => banding(k) && k.sejajar && k.urut },
  { id: "b-balok", teks: "Ukur pita dengan balok besar sampai pas.", wajib: false, cek: (k) => tepat(k, "balok") },
];

export const daftarMisiBab7 = (sub: string): DefMisi<KeadaanBab7>[] => (sub === "B" ? MISI_B : MISI_A);
