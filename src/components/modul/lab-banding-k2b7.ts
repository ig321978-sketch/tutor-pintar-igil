/**
 * Lab Banding dan Urut (Kelas 2 Bab 7, Sub-Bab B): lab 2D di kanvas.
 * Dua mode. Banding: dua bilangan (1 sampai 100) dibandingkan lewat batang puluhan dan satuan, papan nilai tempat,
 * aturan "puluhan dulu, satuan bila puluhan sama", dan tanda. Urut: sebuah himpunan bilangan diketuk satu per satu
 * dari yang paling kecil atau paling besar, lalu diperiksa. Urutan yang keliru tetap tampil bersama penjelasannya
 * sampai anak menekan "Ulang urutan" atau "Hapus terakhir". Urutan acak himpunan tetap dan tidak pernah diurutkan
 * oleh mesin sebelum anak menyusunnya.
 * Murni: tanpa React, tanpa jaringan, tanpa impor nilai. Diuji di scripts/uji-lab-k2b7.mjs.
 */

import type { KeadaanLabBanding } from "./misi-k2bab7";

export const MIN_BANDING = 1;
export const MAKS_BANDING = 100;

export type ModeBanding = "banding" | "urut";
export type ArahUrut = "kecil" | "besar";
export type HimpunanUrut = { id: string; nama: string; angka: number[] };

/** Himpunan bilangan. Urutan angka sengaja acak (tidak terurut). */
export const HIMPUNAN_URUT: HimpunanUrut[] = [
  { id: "tiga", nama: "3 bilangan", angka: [76, 57, 83] },
  { id: "empat", nama: "4 bilangan", angka: [62, 26, 84, 48] },
  { id: "lima", nama: "5 bilangan", angka: [34, 90, 28, 65, 47] },
];

export const himpunanDari = (id: string): HimpunanUrut => HIMPUNAN_URUT.find((h) => h.id === id) ?? HIMPUNAN_URUT[0];

export const puluhanBanding = (n: number): number => Math.floor(n / 10);
export const satuanBanding = (n: number): number => n % 10;

export type HasilBanding = "lebih" | "kurang" | "sama";
export type PenentuBanding = "puluhan" | "satuan" | "sama";

export type AlasanBanding = { hasil: HasilBanding; penentu: PenentuBanding; kalimat: string };

/** Membandingkan a dengan b: hasil, apa yang menentukan, dan kalimat alasan. Puluhan dulu, satuan hanya bila puluhan sama. */
export function alasanBanding(a: number, b: number): AlasanBanding {
  const pa = puluhanBanding(a);
  const pb = puluhanBanding(b);
  const sa = satuanBanding(a);
  const sb = satuanBanding(b);
  if (a === b) return { hasil: "sama", penentu: "sama", kalimat: `${a} sama dengan ${b}. Puluhannya sama dan satuannya sama.` };
  if (pa !== pb) {
    const hasil: HasilBanding = pa > pb ? "lebih" : "kurang";
    const besar = pa > pb ? a : b;
    const kecil = pa > pb ? b : a;
    const dasar = `Puluhan ${a} ada ${pa}, puluhan ${b} ada ${pb}. ${besar} punya puluhan lebih banyak, jadi ${besar} lebih besar dari ${kecil}.`;
    // Jebakan: satuan bilangan yang lebih kecil justru lebih besar. Puluhan tetap menentukan.
    const satuanBesar = pa > pb ? sa : sb;
    const satuanKecil = pa > pb ? sb : sa;
    const jebakan = satuanKecil > satuanBesar ? ` Satuan ${kecil} (${satuanKecil}) lebih besar dari satuan ${besar} (${satuanBesar}), tetapi puluhan yang menentukan.` : "";
    return { hasil, penentu: "puluhan", kalimat: dasar + jebakan };
  }
  const hasil: HasilBanding = sa > sb ? "lebih" : "kurang";
  const besar = sa > sb ? a : b;
  const kecil = sa > sb ? b : a;
  return { hasil, penentu: "satuan", kalimat: `Puluhan ${a} dan ${b} sama, yaitu ${pa}. Satuan menentukan: ${sa > sb ? sa : sb} lebih besar dari ${sa > sb ? sb : sa}, jadi ${besar} lebih besar dari ${kecil}.` };
}

export const tandaBanding = (a: number, b: number): ">" | "<" | "=" => (a > b ? ">" : a < b ? "<" : "=");

export const kataBanding = (a: number, b: number): string => {
  const h = alasanBanding(a, b).hasil;
  return h === "sama" ? `${a} sama dengan ${b}` : h === "lebih" ? `${a} lebih besar dari ${b}` : `${a} lebih kecil dari ${b}`;
};

export const kunciPasangan = (x: number, y: number): string => `${Math.min(x, y)}|${Math.max(x, y)}`;

export type LabBanding = {
  mode: ModeBanding;
  a: number;
  b: number;
  batang: boolean;
  papan: boolean;
  aturan: boolean;
  tanda: boolean;
  pasang: string[];
  himpunan: string;
  arah: ArahUrut;
  isi: number[];
  gagal: string | null;
  urutSelesai: string[];
  catatan: string;
};

export const awalBanding = (): LabBanding => ({
  mode: "banding",
  a: 47,
  b: 38,
  batang: true,
  papan: false,
  aturan: false,
  tanda: false,
  pasang: [],
  himpunan: "tiga",
  arah: "kecil",
  isi: [],
  gagal: null,
  urutSelesai: [],
  catatan: "",
});

const tambahUnik = (a: string[], x: string): string[] => (a.includes(x) ? a : [...a, x]);

/** Pasangan dicatat hanya saat Aturan menyala dan kedua bilangan berbeda atau sama (aturan terbaca). */
function catatPasangan(l: LabBanding): LabBanding {
  return l.aturan ? { ...l, pasang: tambahUnik(l.pasang, kunciPasangan(l.a, l.b)) } : l;
}

export type SisiBanding = "a" | "b";

/** Mengubah salah satu bilangan sebesar delta (satuan: 1, puluhan: 10). Berhenti di 1 dan 100. */
export function ubahBanding(l: LabBanding, sisi: SisiBanding, delta: number): LabBanding {
  const lama = sisi === "a" ? l.a : l.b;
  const baru = Math.max(MIN_BANDING, Math.min(MAKS_BANDING, lama + delta));
  if (baru === lama) return { ...l, catatan: delta > 0 ? "Lab ini berhenti di 100." : "Lab ini mulai dari 1." };
  return catatPasangan({ ...l, [sisi]: baru, catatan: "" });
}

export type TampilBanding = "batang" | "papan" | "aturan" | "tanda";
export function nyalakanBanding(l: LabBanding, kunci: TampilBanding, nyala: boolean): LabBanding {
  const x = { ...l, [kunci]: nyala };
  return kunci === "aturan" && nyala ? catatPasangan(x) : x;
}

export const ubahModeBanding = (l: LabBanding, mode: ModeBanding): LabBanding => ({ ...l, mode, catatan: "" });

export const pilihHimpunan = (l: LabBanding, id: string): LabBanding => ({ ...l, himpunan: himpunanDari(id).id, isi: [], gagal: null, catatan: "" });
export const pilihArahUrut = (l: LabBanding, arah: ArahUrut): LabBanding => ({ ...l, arah, isi: [], gagal: null, catatan: "" });

/** Urutan yang benar untuk himpunan dan arah (dihitung baru, tidak pernah disimpan di tampilan awal). */
export function urutanBenar(angka: number[], arah: ArahUrut): number[] {
  return [...angka].sort((x, y) => (arah === "kecil" ? x - y : y - x));
}

export const urutSelesaiAktif = (l: LabBanding): boolean => l.urutSelesai.includes(`${l.himpunan}|${l.arah}`) && l.isi.length === himpunanDari(l.himpunan).angka.length && l.gagal === null;

/** Mengetuk satu bilangan untuk ditaruh di tempat berikutnya. Bila penuh, urutan diperiksa. */
export function pilihUrut(l: LabBanding, n: number): LabBanding {
  const h = himpunanDari(l.himpunan);
  if (!h.angka.includes(n)) return l;
  if (l.isi.includes(n)) return { ...l, catatan: `${n} sudah ditaruh. Hapus terakhir bila ingin mengganti.` };
  if (l.isi.length >= h.angka.length) return { ...l, catatan: "Urutan sudah penuh. Tekan Ulang urutan untuk mencoba lagi." };
  const isi = [...l.isi, n];
  if (isi.length < h.angka.length) return { ...l, isi, catatan: "" };
  const benar = urutanBenar(h.angka, l.arah);
  const salah = isi.findIndex((x, i) => x !== benar[i]);
  if (salah === -1) {
    return { ...l, isi, gagal: null, urutSelesai: tambahUnik(l.urutSelesai, `${l.himpunan}|${l.arah}`), catatan: `Urutan benar: ${isi.join(", ")}.` };
  }
  const arahKata = l.arah === "kecil" ? "paling kecil" : "paling besar";
  return {
    ...l,
    isi,
    gagal: `Belum tepat. Di tempat ke-${salah + 1} seharusnya ${benar[salah]} (yang ${arahKata} berikutnya), bukan ${isi[salah]}. ${alasanBanding(benar[salah], isi[salah]).kalimat}`,
    catatan: "",
  };
}

export function hapusTerakhirUrut(l: LabBanding): LabBanding {
  if (l.isi.length === 0) return l;
  return { ...l, isi: l.isi.slice(0, -1), gagal: null, catatan: "" };
}

export const ulangUrut = (l: LabBanding): LabBanding => ({ ...l, isi: [], gagal: null, catatan: "" });

/** Mengembalikan model dan semua pilihan tampilan ke awal. */
export const resetBanding = (): LabBanding => awalBanding();

/** Kalimat mode Banding, ditambah alasan bila Aturan menyala dan tanda bila Tanda menyala. */
export function kalimatBanding(l: LabBanding): string {
  let t = `${kataBanding(l.a, l.b)}.`;
  if (l.tanda) t += ` ${l.a} ${tandaBanding(l.a, l.b)} ${l.b}.`;
  if (l.aturan) t += ` ${alasanBanding(l.a, l.b).kalimat}`;
  return t;
}

/** Laporan keadaan ke papan misi. */
export const laporanBanding = (l: LabBanding): KeadaanLabBanding => ({
  alat: "banding",
  mode: l.mode,
  a: l.a,
  b: l.b,
  batang: l.batang,
  papan: l.papan,
  aturan: l.aturan,
  tanda: l.tanda,
  pasang: l.pasang,
  urutSelesai: l.urutSelesai,
});
