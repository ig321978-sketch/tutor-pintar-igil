/**
 * Logika murni Simulasi Pos Timbang Kelas 2 Bab 6 Sub-Bab A "Peralatan Lomba Pak Anton" (berat benda), awal cerita Hari Olahraga Sekolah.
 * Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-timbang-k2b6a.mjs. Eksplorasi bebas tanpa skor.
 * Tiga alat: Jungkat (menaruh dua benda di papan jungkat-jungkit dan melihat yang turun), Satuan (menimbang satu benda dengan satuan tidak baku sampai seimbang,
 * lalu mencatat hasil di tabel), dan Susun (mengetuk benda dari yang paling berat). Berat benda ada di data-peta.ts (berbeda dari Story) dan tidak ditulis di layar.
 */
import { BENDA_SIM, MAKS_SATUAN, SATUAN_SIM, SUSUN_SIM } from "./data-peta";

export type ModeTimbang = "jungkat" | "satuan" | "susun";

export type KeadaanTimbang = {
  alat: "timbang";
  mode: ModeTimbang;
  /** Benda di papan jungkat-jungkit (nomor dalam BENDA_SIM), -1 bila kosong. */
  kiri: number;
  kanan: number;
  /** Pasangan benda yang sudah ditimbang di papan, ditulis "kecil-besar" menurut nomor. */
  dibandingkan: string[];
  /** Pernah menimbang benda yang besar dan ternyata lebih ringan daripada benda lain. */
  besarRingan: boolean;
  /** Benda dan satuan yang dipilih (-1 bila belum), dan banyak satuan di piringan. */
  benda: number;
  satuan: number;
  jumlah: number;
  /** Hasil ukur yang seimbang dan yang sudah dicatat di tabel, ditulis "benda-satuan". */
  seimbang: string[];
  tabel: string[];
  /** Benda yang sudah diketuk pada urutan sekarang, dan banyak urutan yang benar. */
  susunPilih: number[];
  urutanBenar: number;
  /** Banyak percobaan yang keliru (hanya untuk petunjuk, bukan skor). */
  salahSusun: number;
};

export const awalTimbang = (): KeadaanTimbang => ({
  alat: "timbang",
  mode: "jungkat",
  kiri: -1,
  kanan: -1,
  dibandingkan: [],
  besarRingan: false,
  benda: -1,
  satuan: -1,
  jumlah: 0,
  seimbang: [],
  tabel: [],
  susunPilih: [],
  urutanBenar: 0,
  salahSusun: 0,
});
export const mulaiLagiTimbang = (): KeadaanTimbang => awalTimbang();

/* ------------------------------ Kata (tanpa digit) ------------------------------ */
const KATA = ["nol", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan", "sepuluh"] as const;
export const kata = (n: number): string => KATA[n] ?? String(n);
const besar = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);
export { besar as hurufBesar };

export const pilihModeTimbang = (k: KeadaanTimbang, mode: ModeTimbang): KeadaanTimbang => ({ ...k, mode });

/* ------------------------------ Jungkat ------------------------------ */
export const kunciPasang = (a: number, b: number): string => `${Math.min(a, b)}-${Math.max(a, b)}`;
export type Arah = "kiri" | "kanan" | "datar";
/** Sisi papan yang turun: yang lebih berat turun. Papan kosong sebelah dianggap datar. */
export function arahPapan(k: KeadaanTimbang): Arah {
  if (k.kiri < 0 || k.kanan < 0) return "datar";
  const a = BENDA_SIM[k.kiri].w;
  const b = BENDA_SIM[k.kanan].w;
  return a > b ? "kiri" : a < b ? "kanan" : "datar";
}
/** Tandai pasangan yang sedang di papan (bila kedua sisi terisi): tercatat sebagai sudah dibandingkan; benda besar yang lebih ringan dicatat. */
function catatPasangan(k: KeadaanTimbang): KeadaanTimbang {
  if (k.kiri < 0 || k.kanan < 0) return k;
  const id = kunciPasang(k.kiri, k.kanan);
  const sudah = k.dibandingkan.includes(id);
  const a = BENDA_SIM[k.kiri];
  const b = BENDA_SIM[k.kanan];
  const ringan = (x: (typeof BENDA_SIM)[number], y: (typeof BENDA_SIM)[number]) => !!x.besar && x.w < y.w;
  const besarRingan = k.besarRingan || ringan(a, b) || ringan(b, a);
  return sudah && besarRingan === k.besarRingan ? k : { ...k, dibandingkan: sudah ? k.dibandingkan : [...k.dibandingkan, id], besarRingan };
}
export function taruhKiri(k: KeadaanTimbang, i: number): KeadaanTimbang {
  if (i < 0 || i >= BENDA_SIM.length || i === k.kanan) return k;
  return catatPasangan({ ...k, kiri: i });
}
export function taruhKanan(k: KeadaanTimbang, i: number): KeadaanTimbang {
  if (i < 0 || i >= BENDA_SIM.length || i === k.kiri) return k;
  return catatPasangan({ ...k, kanan: i });
}
export const kosongkanPapan = (k: KeadaanTimbang): KeadaanTimbang => ({ ...k, kiri: -1, kanan: -1 });
/** Kalimat hasil perbandingan di papan (tanpa digit). */
export function kalimatPapan(k: KeadaanTimbang): string {
  if (k.kiri < 0 && k.kanan < 0) return "Ketuk satu benda untuk sisi kiri dan satu benda untuk sisi kanan papan.";
  if (k.kiri < 0) return "Pilih benda untuk sisi kiri papan.";
  if (k.kanan < 0) return "Pilih benda untuk sisi kanan papan.";
  const a = BENDA_SIM[k.kiri];
  const b = BENDA_SIM[k.kanan];
  const t = arahPapan(k);
  if (t === "datar") return `Papan datar. ${besar(a.nama)} dan ${b.nama} sama berat.`;
  const berat = t === "kiri" ? a : b;
  const ringan = t === "kiri" ? b : a;
  return `${besar(berat.nama)} turun, jadi ${berat.nama} lebih berat daripada ${ringan.nama}. ${besar(ringan.nama)} naik, jadi lebih ringan.`;
}
/** Kalimat khusus saat benda besar ternyata lebih ringan. */
export function kalimatBesarRingan(k: KeadaanTimbang): string {
  const a = BENDA_SIM[k.kiri];
  const b = BENDA_SIM[k.kanan];
  const besarItem = a?.besar ? a : b?.besar ? b : null;
  return besarItem ? `${besar(besarItem.nama)} lebih besar tetapi ternyata lebih ringan. Besar belum tentu berat.` : "";
}

/* ------------------------------ Satuan ------------------------------ */
export function pilihBendaSatuan(k: KeadaanTimbang, i: number): KeadaanTimbang {
  if (i < 0 || i >= BENDA_SIM.length) return k;
  return { ...k, benda: i, jumlah: 0 };
}
export function pilihSatuan(k: KeadaanTimbang, j: number): KeadaanTimbang {
  if (j < 0 || j >= SATUAN_SIM.length) return k;
  return { ...k, satuan: j, jumlah: 0 };
}
/** Papan satuan: berat benda lawan jumlah kali berat satuan. Kosong bila benda atau satuan belum dipilih. */
export function arahSatuan(k: KeadaanTimbang): Arah {
  if (k.benda < 0 || k.satuan < 0) return "datar";
  const b = BENDA_SIM[k.benda].w;
  const s = k.jumlah * SATUAN_SIM[k.satuan].w;
  return b > s ? "kiri" : b < s ? "kanan" : "datar";
}
export const seimbangSatuan = (k: KeadaanTimbang): boolean => k.benda >= 0 && k.satuan >= 0 && k.jumlah > 0 && arahSatuan(k) === "datar";
export const kunciHasil = (benda: number, satuan: number): string => `${benda}-${satuan}`;
/** Tambah (arah 1) atau kurangi (arah -1) satu satuan di piringan kanan. Seimbang tercatat otomatis. */
export function ubahJumlah(k: KeadaanTimbang, arah: 1 | -1): KeadaanTimbang {
  if (k.benda < 0 || k.satuan < 0) return k;
  const jumlah = k.jumlah + arah;
  if (jumlah < 0 || jumlah > MAKS_SATUAN) return k;
  const baru = { ...k, jumlah };
  if (!seimbangSatuan(baru)) return baru;
  const id = kunciHasil(k.benda, k.satuan);
  return k.seimbang.includes(id) ? baru : { ...baru, seimbang: [...k.seimbang, id] };
}
/** Banyak satuan yang membuat benda seimbang (benda dan satuan yang dipilih). */
export const jumlahSeimbang = (benda: number, satuan: number): number => BENDA_SIM[benda].w / SATUAN_SIM[satuan].w;
/** Catat hasil ukur yang sedang seimbang di tabel. Hanya yang seimbang yang dicatat. */
export function catatTabel(k: KeadaanTimbang): { k: KeadaanTimbang; ok: boolean } {
  if (!seimbangSatuan(k)) return { k, ok: false };
  const id = kunciHasil(k.benda, k.satuan);
  return { k: k.tabel.includes(id) ? k : { ...k, tabel: [...k.tabel, id] }, ok: true };
}
/** Benda yang sudah diukur dengan dua satuan berbeda dan keduanya tercatat di tabel. */
export const bendaDuaSatuan = (k: KeadaanTimbang): number[] => BENDA_SIM.map((_, i) => i).filter((i) => SATUAN_SIM.every((_, j) => k.tabel.includes(kunciHasil(i, j))));
export function kalimatSatuan(k: KeadaanTimbang): string {
  if (k.benda < 0) return "Ketuk satu benda yang akan ditimbang, lalu pilih satuannya.";
  const b = BENDA_SIM[k.benda];
  if (k.satuan < 0) return `Pilih satuan untuk menimbang ${b.nama}.`;
  const s = SATUAN_SIM[k.satuan];
  if (k.jumlah === 0) return `Tambah ${s.nama} di piringan kanan sampai papan seimbang.`;
  const t = arahSatuan(k);
  if (t === "datar") return `Seimbang! ${besar(b.nama)} sama berat dengan ${kata(k.jumlah)} ${s.nama}. Catat hasilnya di tabel.`;
  if (t === "kiri") return `${besar(b.nama)} masih lebih berat. Tambah ${s.nama} lagi.`;
  return `${besar(s.nama)} sudah terlalu banyak. Kurangi satu supaya seimbang.`;
}

/* ------------------------------ Susun ------------------------------ */
/** Urutan benar benda susun: dari paling berat (nomor dalam BENDA_SIM). */
export const urutanSusun = (): number[] => [...SUSUN_SIM].sort((p, q) => BENDA_SIM[q].w - BENDA_SIM[p].w);
export function ketukSusun(k: KeadaanTimbang, i: number): { k: KeadaanTimbang; ok: boolean; selesai: boolean } {
  if (!SUSUN_SIM.includes(i) || k.susunPilih.includes(i)) return { k, ok: false, selesai: false };
  const harusnya = urutanSusun()[k.susunPilih.length];
  if (harusnya === undefined) return { k, ok: false, selesai: false };
  if (i !== harusnya) return { k: { ...k, salahSusun: k.salahSusun + 1 }, ok: false, selesai: false };
  const susunPilih = [...k.susunPilih, i];
  const selesai = susunPilih.length === SUSUN_SIM.length;
  return { k: { ...k, susunPilih, urutanBenar: selesai ? k.urutanBenar + 1 : k.urutanBenar }, ok: true, selesai };
}
export const susunLagi = (k: KeadaanTimbang): KeadaanTimbang => ({ ...k, susunPilih: [] });
export function petunjukSusun(k: KeadaanTimbang, i: number): string {
  const harusnya = urutanSusun()[k.susunPilih.length];
  const lebihRingan = BENDA_SIM[i].w < BENDA_SIM[harusnya].w;
  return lebihRingan ? `${besar(BENDA_SIM[i].nama)} masih lebih ringan daripada benda lain yang tersisa. Ketuk yang paling berat dulu. Timbang di papan jungkat-jungkit bila perlu.` : `${besar(BENDA_SIM[i].nama)} sudah lebih berat, tetapi ada benda yang lebih berat lagi di antara yang tersisa. Timbang di papan jungkat-jungkit bila perlu.`;
}
export function kalimatSusun(k: KeadaanTimbang): string {
  if (k.susunPilih.length === SUSUN_SIM.length) return "Urutan benar! Benda paling berat ditaruh paling bawah, lalu yang lebih ringan di atasnya.";
  if (k.susunPilih.length === 0) return "Ketuk benda yang paling berat lebih dulu. Papan jungkat-jungkit boleh dipakai untuk memeriksa.";
  return "Betul. Sekarang ketuk benda berikutnya yang paling berat.";
}
