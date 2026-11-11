/**
 * Lab Neraca (Kelas 2 Bab 6, Sub-Bab A: Berat): model PhET + lab 2D.
 * Satu model (dua benda di dua piringan), banyak perwakilan: neraca (tiga cara), kalimat, catatan timbangan,
 * dan ukuran asli. Berat DIBANDINGKAN dengan menimbang, bukan ditebak dari ukuran: ada benda besar yang ringan
 * (balon, kelapa) dan benda kecil yang berat (batu). Dari catatan, anak menarik kesimpulan "paling berat" dan
 * "paling ringan" hanya bila rantai catatan memang menentukannya.
 * Murni: tanpa React, tanpa jaringan, tanpa impor nilai. Diuji di scripts/uji-lab-k2b6.mjs.
 */

import type { KeadaanLabNeraca } from "./misi-k2bab6";

export type BendaNeraca = "semangka" | "kelapa" | "batu" | "apel" | "jeruk" | "buku" | "pensil" | "anggur" | "balon";
export const URUT_BENDA_NERACA: BendaNeraca[] = ["semangka", "kelapa", "batu", "apel", "jeruk", "buku", "pensil", "anggur", "balon"];

export const NAMA_BENDA_NERACA: Record<BendaNeraca, string> = {
  semangka: "semangka",
  kelapa: "kelapa",
  batu: "batu",
  apel: "apel",
  jeruk: "jeruk",
  buku: "buku",
  pensil: "pensil",
  anggur: "anggur",
  balon: "balon",
};

/** Berat nyata (gram, pembulatan). Hanya dipakai untuk menggerakkan neraca, tidak pernah ditampilkan sebagai angka. */
export const BERAT_NERACA: Record<BendaNeraca, number> = {
  semangka: 1800,
  kelapa: 600,
  batu: 900,
  apel: 120,
  jeruk: 120,
  buku: 60,
  pensil: 10,
  anggur: 5,
  balon: 3,
};

/** Ukuran tampak (1 paling kecil sampai 5 paling besar). Sengaja tidak seiring dengan berat pada beberapa benda. */
export const UKURAN_NERACA: Record<BendaNeraca, number> = {
  semangka: 5,
  kelapa: 4,
  batu: 2,
  apel: 3,
  jeruk: 3,
  buku: 3,
  pensil: 2,
  anggur: 1,
  balon: 5,
};

export type CaraNeraca = "jungkat" | "gantung" | "tangan";
export const URUT_CARA_NERACA: CaraNeraca[] = ["jungkat", "gantung", "tangan"];
export const NAMA_CARA_NERACA: Record<CaraNeraca, string> = { jungkat: "Jungkat-jungkit", gantung: "Gantungan baju", tangan: "Dua tangan" };

export type RelBerat = "lebih berat" | "lebih ringan" | "sama berat";

/** Hubungan benda a terhadap benda b. */
export const relBeratNeraca = (a: BendaNeraca, b: BendaNeraca): RelBerat => {
  const x = BERAT_NERACA[a];
  const y = BERAT_NERACA[b];
  return x > y ? "lebih berat" : x < y ? "lebih ringan" : "sama berat";
};

export type Miring = -1 | 0 | 1;
/** -1: sisi kiri turun. 1: sisi kanan turun. 0: seimbang atau masih kosong. Piringan berisi turun bila lawannya kosong. */
export const miringNeraca = (kiri: BendaNeraca | null, kanan: BendaNeraca | null): Miring => {
  if (kiri && kanan) {
    const r = relBeratNeraca(kiri, kanan);
    return r === "lebih berat" ? -1 : r === "lebih ringan" ? 1 : 0;
  }
  if (kiri) return -1;
  if (kanan) return 1;
  return 0;
};

export type Catatan = { a: BendaNeraca; b: BendaNeraca; rel: RelBerat };

export type LabNeraca = {
  kiri: BendaNeraca | null;
  kanan: BendaNeraca | null;
  cara: CaraNeraca;
  ukuran: boolean;
  catatan: Catatan[];
  caraDipakai: CaraNeraca[];
};

export const awalNeraca = (): LabNeraca => ({ kiri: null, kanan: null, cara: "jungkat", ukuran: false, catatan: [], caraDipakai: [] });

const sama = (c: Catatan, a: BendaNeraca, b: BendaNeraca) => (c.a === a && c.b === b) || (c.a === b && c.b === a);

/** Mencatat hasil timbangan bila dua benda berbeda sudah terpasang, dan cara yang dipakai. */
function catat(l: LabNeraca): LabNeraca {
  if (!l.kiri || !l.kanan || l.kiri === l.kanan) return l;
  const caraDipakai = l.caraDipakai.includes(l.cara) ? l.caraDipakai : [...l.caraDipakai, l.cara];
  const ada = l.catatan.some((c) => sama(c, l.kiri as BendaNeraca, l.kanan as BendaNeraca));
  const catatan = ada ? l.catatan : [...l.catatan, { a: l.kiri, b: l.kanan, rel: relBeratNeraca(l.kiri, l.kanan) }];
  return { ...l, catatan, caraDipakai };
}

/** Menaruh satu benda di satu piringan. Satu benda hanya ada satu: bila sudah ada di piringan lain, ia pindah. */
export function taruh(l: LabNeraca, sisi: "kiri" | "kanan", benda: BendaNeraca): LabNeraca {
  const lawan = sisi === "kiri" ? "kanan" : "kiri";
  const baru: LabNeraca = { ...l, [sisi]: benda, [lawan]: l[lawan] === benda ? null : l[lawan] };
  return catat(baru);
}

export const ambil = (l: LabNeraca, sisi: "kiri" | "kanan"): LabNeraca => ({ ...l, [sisi]: null });
export const kosongkan = (l: LabNeraca): LabNeraca => ({ ...l, kiri: null, kanan: null });
export const pilihCara = (l: LabNeraca, cara: CaraNeraca): LabNeraca => catat({ ...l, cara });
export const nyalakanUkuran = (l: LabNeraca, nyala: boolean): LabNeraca => ({ ...l, ukuran: nyala });
export const tukarSisi = (l: LabNeraca): LabNeraca => ({ ...l, kiri: l.kanan, kanan: l.kiri });

export const hubungan = (l: LabNeraca): RelBerat | null => (l.kiri && l.kanan ? relBeratNeraca(l.kiri, l.kanan) : null);

/** Benda yang lebih besar justru lebih ringan. Hanya bila dua benda terpasang dan ukurannya berbeda. */
export function kontraUkuran(kiri: BendaNeraca | null, kanan: BendaNeraca | null): boolean {
  if (!kiri || !kanan || kiri === kanan) return false;
  const uk = UKURAN_NERACA[kiri] - UKURAN_NERACA[kanan];
  const br = BERAT_NERACA[kiri] - BERAT_NERACA[kanan];
  return (uk > 0 && br < 0) || (uk < 0 && br > 0);
}

/** Semua pasangan benda yang menjadi "besar tapi ringan". */
export function semuaKontra(): [BendaNeraca, BendaNeraca][] {
  const hasil: [BendaNeraca, BendaNeraca][] = [];
  for (const a of URUT_BENDA_NERACA) {
    for (const b of URUT_BENDA_NERACA) {
      if (a < b && kontraUkuran(a, b)) hasil.push([a, b]);
    }
  }
  return hasil;
}

export type Ekstrem = { berat: BendaNeraca; ringan: BendaNeraca };

/**
 * Dari catatan timbangan saja: adakah satu benda yang pasti paling berat dan satu yang pasti paling ringan di antara
 * benda-benda yang saling terhubung (paling sedikit tiga benda)? Benda yang sama berat dianggap satu kelas, dan
 * kelas yang berisi lebih dari satu benda tidak bisa menjadi satu-satunya paling berat atau paling ringan.
 */
export function tentukanEkstrem(catatan: readonly Catatan[]): Ekstrem | null {
  const benda = Array.from(new Set(catatan.flatMap((c) => [c.a, c.b])));
  if (benda.length < 3) return null;
  // Kelas sama berat (union-find sederhana).
  const induk = new Map<BendaNeraca, BendaNeraca>(benda.map((b) => [b, b]));
  const cari = (x: BendaNeraca): BendaNeraca => {
    let r = x;
    while (induk.get(r) !== r) r = induk.get(r) as BendaNeraca;
    return r;
  };
  for (const c of catatan) if (c.rel === "sama berat") induk.set(cari(c.a), cari(c.b));
  const kelas = Array.from(new Set(benda.map(cari)));
  const anggota = (k: BendaNeraca) => benda.filter((b) => cari(b) === k);
  // Jangkauan "lebih berat dari" antar kelas.
  const lebih = new Map<BendaNeraca, Set<BendaNeraca>>(kelas.map((k) => [k, new Set<BendaNeraca>()]));
  for (const c of catatan) {
    if (c.rel === "lebih berat") lebih.get(cari(c.a))?.add(cari(c.b));
    if (c.rel === "lebih ringan") lebih.get(cari(c.b))?.add(cari(c.a));
  }
  const jangkau = (dari: BendaNeraca): Set<BendaNeraca> => {
    const lihat = new Set<BendaNeraca>();
    const tumpuk = [dari];
    while (tumpuk.length) {
      const k = tumpuk.pop() as BendaNeraca;
      for (const t of lebih.get(k) ?? []) {
        if (!lihat.has(t)) {
          lihat.add(t);
          tumpuk.push(t);
        }
      }
    }
    return lihat;
  };
  const jangkauan = new Map(kelas.map((k) => [k, jangkau(k)]));
  const teratas = kelas.filter((k) => kelas.every((o) => o === k || jangkauan.get(k)?.has(o)));
  const terbawah = kelas.filter((k) => kelas.every((o) => o === k || jangkauan.get(o)?.has(k)));
  if (teratas.length !== 1 || terbawah.length !== 1) return null;
  const a = anggota(teratas[0]);
  const b = anggota(terbawah[0]);
  if (a.length !== 1 || b.length !== 1) return null;
  return { berat: a[0], ringan: b[0] };
}

const sebutBenda = (b: BendaNeraca) => NAMA_BENDA_NERACA[b];
const Kap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/** Kalimat yang menyertai neraca. Memakai kata benda, bukan angka berat. */
export function kalimatNeraca(l: LabNeraca): string {
  const { kiri, kanan } = l;
  if (!kiri && !kanan) return "Dua piringan masih kosong. Pilih benda untuk ditimbang.";
  if (kiri && !kanan) return `${Kap(sebutBenda(kiri))} ada di piringan kiri, jadi sisi kiri turun. Taruh benda kedua di kanan.`;
  if (!kiri && kanan) return `${Kap(sebutBenda(kanan))} ada di piringan kanan, jadi sisi kanan turun. Taruh benda kedua di kiri.`;
  const a = kiri as BendaNeraca;
  const b = kanan as BendaNeraca;
  const r = relBeratNeraca(a, b);
  let teks: string;
  if (r === "sama berat") teks = `Seimbang. ${Kap(sebutBenda(a))} sama berat dengan ${sebutBenda(b)}.`;
  else if (r === "lebih berat") teks = `Sisi ${sebutBenda(a)} turun. ${Kap(sebutBenda(a))} lebih berat dari ${sebutBenda(b)}.`;
  else teks = `Sisi ${sebutBenda(b)} turun. ${Kap(sebutBenda(a))} lebih ringan dari ${sebutBenda(b)}.`;
  return teks;
}

/** Kalimat tambahan saat Ukuran asli menyala. Menjaga kejujuran konsep: besar belum tentu berat. */
export function kalimatUkuran(l: LabNeraca): string {
  const { kiri, kanan } = l;
  if (!l.ukuran || !kiri || !kanan || kiri === kanan) return "";
  if (kontraUkuran(kiri, kanan)) {
    const besar = UKURAN_NERACA[kiri] > UKURAN_NERACA[kanan] ? kiri : kanan;
    const kecil = besar === kiri ? kanan : kiri;
    return `${Kap(sebutBenda(besar))} lebih besar, tetapi lebih ringan dari ${sebutBenda(kecil)}. Besar belum tentu berat.`;
  }
  if (UKURAN_NERACA[kiri] === UKURAN_NERACA[kanan]) return "Ukuran keduanya hampir sama, jadi hanya neraca yang bisa memutuskan.";
  return "Kali ini benda yang lebih besar juga lebih berat. Itu kebetulan, jangan jadikan aturan. Timbang dulu.";
}

/** Laporan keadaan ke papan misi. */
export const laporanNeraca = (l: LabNeraca): KeadaanLabNeraca => ({
  alat: "neraca",
  kiri: l.kiri,
  kanan: l.kanan,
  hubungan: hubungan(l),
  cara: l.cara,
  ukuran: l.ukuran,
  kontra: kontraUkuran(l.kiri, l.kanan),
  ekstrem: tentukanEkstrem(l.catatan) !== null,
  caraDipakai: l.caraDipakai,
});

/** Kalimat catatan untuk satu baris. */
export const kalimatCatatan = (c: Catatan): string =>
  c.rel === "sama berat" ? `${Kap(sebutBenda(c.a))} sama berat dengan ${sebutBenda(c.b)}` : `${Kap(sebutBenda(c.a))} ${c.rel} dari ${sebutBenda(c.b)}`;

export const kalimatEkstrem = (e: Ekstrem): string => `Dari catatanmu: ${sebutBenda(e.berat)} paling berat dan ${sebutBenda(e.ringan)} paling ringan.`;
