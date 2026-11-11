/**
 * Logika murni alat simulasi Kelas 2 Bab 8 (Berbagai Diagram). Murni: tanpa React, tanpa jaringan.
 * Diuji di scripts/uji-lab-k2b8.mjs. Hanya `import type` dari berkas lain, jadi semua data ada di berkas ini.
 *
 * Isi:
 *  - SET: sepuluh kumpulan data (urutan kategori tetap, dipakai misi-k2bab8.ts).
 *  - Lab Data (Lab Turus dan Lab Diagram Gambar): satu model, banyak perwakilan (benda, turus, tabel, gambar, kalimat).
 *  - Lab Baca: membandingkan dua baris, paling banyak, paling sedikit, selisih.
 *  - Mesin Catat Turus (Sub-Bab A): Catat -> Hitung -> Baca -> Selesai.
 *  - Mesin Susun Diagram (Sub-Bab B): Judul -> Keterangan -> Gambar -> Baca -> Selesai.
 */

import type { KeadaanLabBaca, KeadaanLabGambar, KeadaanLabTurus } from "./misi-k2bab8";

export type IdSet = "buah" | "hewan" | "mainan" | "sayur" | "bunga" | "warna" | "permainan" | "kaleng" | "berangkat";
export type Lambang = "bintang" | "lingkaran" | "hati" | "senyum";
export type Kat = { id: string; nama: string; ikon: string; warna: string };
export type SetData = {
  id: IdSet;
  judul: string;
  satuan: string;
  /** Kalimat data: {n} diganti banyaknya. Tidak memuat nama jenis. */
  kalimat: (nama: string, n: number) => string;
  kategori: Kat[];
  /** Banyak data nyata tiap kategori (dipakai Lab Baca dan sebagai acuan misi). */
  nyata: number[];
};

const MERAH = "#DC2626";
const JINGGA = "#F0AB00";
const BIRU = "#1C01A5";
const HIJAU = "#16A34A";
const HITAM = "#27272A";
const BIRU_TERANG = "#2563EB";
const WARNA4 = [BIRU, JINGGA, MERAH, HIJAU];

const kat = (id: string, nama: string, ikon: string, i: number): Kat => ({ id, nama, ikon, warna: WARNA4[i] });

export const SET: Record<IdSet, SetData> = {
  buah: {
    id: "buah",
    judul: "Buah Kesukaan Teman",
    satuan: "anak",
    kalimat: (nama, n) => `${n} anak suka ${nama}.`,
    kategori: [kat("anggur", "anggur", "🍇", 0), kat("jeruk", "jeruk", "🍊", 1), kat("apel", "apel", "🍎", 2), kat("pisang", "pisang", "🍌", 3)],
    nyata: [2, 6, 4, 3],
  },
  hewan: {
    id: "hewan",
    judul: "Hewan Paman Halim",
    satuan: "ekor",
    kalimat: (nama, n) => `Ada ${n} ekor ${nama}.`,
    kategori: [kat("ayam", "ayam", "🐔", 0), kat("kambing", "kambing", "🐐", 1), kat("sapi", "sapi", "🐄", 2), kat("bebek", "bebek", "🦆", 3)],
    nyata: [10, 8, 6, 11],
  },
  mainan: {
    id: "mainan",
    judul: "Mainan Kira",
    satuan: "buah",
    kalimat: (nama, n) => `Ada ${n} ${nama}.`,
    kategori: [kat("mobil", "mobil", "🚗", 0), kat("boneka", "boneka", "🧸", 1), kat("kelereng", "kelereng", "🔵", 2), kat("balok", "balok", "🧱", 3)],
    nyata: [2, 4, 6, 7],
  },
  sayur: {
    id: "sayur",
    judul: "Sayur Malosi",
    satuan: "ikat",
    kalimat: (nama, n) => `Ada ${n} ikat ${nama}.`,
    kategori: [kat("brokoli", "brokoli", "🥦", 0), kat("bayam", "bayam", "🥬", 1), kat("wortel", "wortel", "🥕", 2), kat("jagung", "jagung", "🌽", 3)],
    nyata: [7, 4, 6, 3],
  },
  bunga: {
    id: "bunga",
    judul: "Bunga Kebun Tika",
    satuan: "tangkai",
    kalimat: (nama, n) => `Ada ${n} tangkai ${nama}.`,
    kategori: [kat("mawar", "mawar", "🌹", 0), kat("lili", "lili", "🌸", 1), kat("tulip", "tulip", "🌷", 2), kat("aster", "aster", "🌼", 3)],
    nyata: [7, 4, 5, 4],
  },
  warna: {
    id: "warna",
    judul: "Warna Kesukaan Teman",
    satuan: "anak",
    kalimat: (nama, n) => `${n} anak suka warna ${nama}.`,
    kategori: [
      { id: "merah", nama: "merah", ikon: "", warna: MERAH },
      { id: "kuning", nama: "kuning", ikon: "", warna: JINGGA },
      { id: "biru", nama: "biru", ikon: "", warna: BIRU_TERANG },
      { id: "hitam", nama: "hitam", ikon: "", warna: HITAM },
    ],
    nyata: [7, 3, 5, 2],
  },
  permainan: {
    id: "permainan",
    judul: "Permainan Tradisional",
    satuan: "anak",
    kalimat: (nama, n) => `${n} anak suka bermain ${nama}.`,
    kategori: [kat("karet", "karet", "", 0), kat("lompat", "lompat tali", "", 1), kat("petak", "petak umpet", "", 2), kat("benteng", "benteng", "", 3)],
    nyata: [4, 6, 5, 7],
  },
  kaleng: {
    id: "kaleng",
    judul: "Kaleng Bekas Tiap Kelompok",
    satuan: "kaleng",
    kalimat: (nama, n) => `${nama[0].toUpperCase()}${nama.slice(1)} mengumpulkan ${n} kaleng.`,
    kategori: [kat("ka", "kelompok A", "", 0), kat("kb", "kelompok B", "", 1), kat("kc", "kelompok C", "", 2), kat("kd", "kelompok D", "", 3)],
    nyata: [6, 4, 5, 3],
  },
  berangkat: {
    id: "berangkat",
    judul: "Cara Berangkat ke Sekolah",
    satuan: "anak",
    kalimat: (nama, n) => `${n} anak berangkat dengan ${nama}.`,
    kategori: [kat("sepeda", "sepeda", "", 0), kat("motor", "motor", "", 1), kat("jalan", "jalan kaki", "", 2), kat("mobil", "mobil", "", 3)],
    nyata: [4, 6, 7, 3],
  },
};

export const SET_TURUS: IdSet[] = ["buah", "hewan", "mainan"];
export const SET_BACA: IdSet[] = ["hewan", "bunga", "sayur", "mainan"];
export const SET_GAMBAR: IdSet[] = ["warna", "permainan", "kaleng", "berangkat"];

export const LAMBANG: Record<Lambang, { glyph: string; nama: string }> = {
  bintang: { glyph: "★", nama: "bintang" },
  lingkaran: { glyph: "●", nama: "lingkaran" },
  hati: { glyph: "♥", nama: "hati" },
  senyum: { glyph: "☺", nama: "wajah senyum" },
};
export const DAFTAR_LAMBANG: Lambang[] = ["bintang", "lingkaran", "hati", "senyum"];

export const MAKS_TURUS = 15;
export const MAKS_GAMBAR = 12;

const jumlah = (n: number[]) => n.reduce((a, x) => a + x, 0);
export const kapital = (s: string) => (s ? s[0].toUpperCase() + s.slice(1) : s);

/** Satu kelompok lima: empat garis tegak dicoret satu garis miring. */
export const kelompokLima = (n: number): { penuh: number; sisa: number } => ({ penuh: Math.floor(n / 5), sisa: n % 5 });

export function teksKelompok(n: number): string {
  if (n <= 0) return "belum ada garis";
  const { penuh, sisa } = kelompokLima(n);
  if (penuh === 0) return `${sisa} garis`;
  const p = `${penuh} kelompok lima`;
  return sisa === 0 ? p : `${p} dan ${sisa} garis`;
}

const rotasi = <T,>(a: T[], k: number): T[] => a.map((_, i) => a[(i + k) % a.length]);

// ---------------------------------------------------------------------------------------------
// Lab Data: Lab Turus (Sub-Bab A) dan Lab Diagram Gambar (Sub-Bab B)
// ---------------------------------------------------------------------------------------------

export type JenisLab = "turus" | "gambar";
export type KunciTampil = "benda" | "turus" | "tabel" | "gambar" | "ket";

export type LabData = {
  jenis: JenisLab;
  set: IdSet;
  n: number[];
  benda: boolean;
  turus: boolean;
  tabel: boolean;
  gambar: boolean;
  ket: boolean;
  kelompok: boolean;
  lambang: Lambang;
  ganti: number;
  terakhir: number | null;
  catatan: string;
};

export const maksLab = (jenis: JenisLab): number => (jenis === "turus" ? MAKS_TURUS : MAKS_GAMBAR);
export const daftarSetLab = (jenis: JenisLab): IdSet[] => (jenis === "turus" ? SET_TURUS : SET_GAMBAR);

/** Keadaan awal: semua banyak nol. Lab Turus menyalakan Turus. Lab Gambar menyalakan Diagram gambar. */
export function awalLab(jenis: JenisLab): LabData {
  return {
    jenis,
    set: daftarSetLab(jenis)[0],
    n: [0, 0, 0, 0],
    benda: false,
    turus: jenis === "turus",
    tabel: false,
    gambar: jenis === "gambar",
    ket: false,
    kelompok: true,
    lambang: "bintang",
    ganti: 0,
    terakhir: null,
    catatan: "",
  };
}

export const totalLab = (l: LabData): number => jumlah(l.n);

export function tambahData(l: LabData, i: number): LabData {
  if (i < 0 || i >= l.n.length) return l;
  const maks = maksLab(l.jenis);
  const nama = SET[l.set].kategori[i].nama;
  if (l.n[i] >= maks) return { ...l, terakhir: i, catatan: `Satu baris paling banyak ${maks} di lab ini. ${kapital(nama)} sudah penuh.` };
  const n = l.n.map((x, j) => (j === i ? x + 1 : x));
  const baru = n[i];
  let catatan = "";
  if (l.jenis === "turus" && l.turus && l.kelompok && baru % 5 === 0) catatan = `${baru}! Empat garis dicoret garis miring: satu kelompok lima.`;
  return { ...l, n, terakhir: i, catatan };
}

export function kurangData(l: LabData, i: number): LabData {
  if (i < 0 || i >= l.n.length) return l;
  const nama = SET[l.set].kategori[i].nama;
  if (l.n[i] <= 0) return { ...l, terakhir: i, catatan: `Belum ada data ${nama}.` };
  return { ...l, n: l.n.map((x, j) => (j === i ? x - 1 : x)), terakhir: i, catatan: "" };
}

/** Ganti kumpulan data. Banyaknya kembali ke nol karena datanya lain. Pilihan tampilan dipertahankan. */
export function pilihSetLab(l: LabData, id: IdSet): LabData {
  if (!daftarSetLab(l.jenis).includes(id) || id === l.set) return l;
  return { ...l, set: id, n: [0, 0, 0, 0], terakhir: null, catatan: "Data baru. Mulai dari nol lagi." };
}

export function nyalakanLab(l: LabData, kunci: KunciTampil, nyala: boolean): LabData {
  return { ...l, [kunci]: nyala, catatan: "" };
}

export function setKelompokLab(l: LabData, nyala: boolean): LabData {
  return { ...l, kelompok: nyala, catatan: "" };
}

/** Ganti lambang diagram gambar. Dihitung sebagai "ganti" hanya bila sudah ada data (banyaknya tidak berubah). */
export function pilihLambangLab(l: LabData, lambang: Lambang): LabData {
  if (lambang === l.lambang) return l;
  return { ...l, lambang, ganti: l.ganti + (totalLab(l) > 0 ? 1 : 0), catatan: totalLab(l) > 0 ? "Lambang berganti, banyaknya tetap sama." : "" };
}

export const resetLab = (l: LabData): LabData => awalLab(l.jenis);

/** Satu kalimat tentang data yang terakhir diubah. */
export function kalimatLab(l: LabData): string {
  const ds = SET[l.set];
  if (totalLab(l) === 0) return "Belum ada data. Tambah data pada tiap jenis.";
  const t = l.terakhir !== null ? l.terakhir : l.n.findIndex((x) => x > 0);
  const k = ds.kategori[t];
  const n = l.n[t];
  if (n === 0) return `Belum ada data ${k.nama}.`;
  const bagian = [ds.kalimat(k.nama, n)];
  if (l.jenis === "turus") {
    if (l.turus) bagian.push(l.kelompok ? `Turusnya ${teksKelompok(n)}.` : `Turusnya ${n} garis.`);
  } else {
    if (l.gambar) bagian.push(`Digambar ${n} ${LAMBANG[l.lambang].nama}.`);
    if (l.ket) bagian.push(`Satu ${LAMBANG[l.lambang].nama} mewakili satu ${ds.satuan}.`);
  }
  if (l.tabel) bagian.push(`Jumlah semuanya ${totalLab(l)}.`);
  return bagian.join(" ");
}

export function laporanTurus(l: LabData): KeadaanLabTurus {
  return { alat: "turus", set: l.set, n: [...l.n], benda: l.benda, turus: l.turus, tabel: l.tabel, kelompok: l.kelompok };
}

export function laporanGambar(l: LabData): KeadaanLabGambar {
  return { alat: "gambar", set: l.set, n: [...l.n], lambang: l.lambang, ganti: l.ganti, gambar: l.gambar, tabel: l.tabel, turus: l.turus, ket: l.ket };
}

// ---------------------------------------------------------------------------------------------
// Lab Baca: membandingkan dua baris dari data nyata
// ---------------------------------------------------------------------------------------------

export type LabBaca = {
  set: IdSet;
  a: string | null;
  b: string | null;
  paling: boolean;
  selisih: boolean;
};

export const awalBaca = (): LabBaca => ({ set: "hewan", a: null, b: null, paling: false, selisih: false });

export const banyakBaca = (set: IdSet, id: string): number => {
  const ds = SET[set];
  const i = ds.kategori.findIndex((k) => k.id === id);
  return i < 0 ? 0 : ds.nyata[i];
};

const namaBaca = (set: IdSet, id: string): string => SET[set].kategori.find((k) => k.id === id)?.nama ?? id;

/** Ketuk satu baris. Dua baris terpilih paling banyak. Ketukan ketiga memulai pilihan baru. Ketuk lagi untuk melepas. */
export function ketukBaca(l: LabBaca, id: string): LabBaca {
  if (!SET[l.set].kategori.some((k) => k.id === id)) return l;
  if (l.a === id) return { ...l, a: l.b, b: null };
  if (l.b === id) return { ...l, b: null };
  if (l.a === null) return { ...l, a: id };
  if (l.b === null) return { ...l, b: id };
  return { ...l, a: id, b: null };
}

export function pilihSetBaca(l: LabBaca, id: IdSet): LabBaca {
  if (!SET_BACA.includes(id) || id === l.set) return l;
  return { ...l, set: id, a: null, b: null };
}

export const nyalakanBaca = (l: LabBaca, kunci: "paling" | "selisih", nyala: boolean): LabBaca => ({ ...l, [kunci]: nyala });
export const resetBaca = (): LabBaca => awalBaca();

/** Baris paling banyak atau paling sedikit. `tunggal` null bila beberapa baris sama (tidak ada satu pun yang "paling"). */
export function palingBaca(set: IdSet, arah: "banyak" | "sedikit"): { tunggal: string | null; sama: string[]; n: number } {
  const ds = SET[set];
  const nilai = ds.nyata;
  const target = arah === "banyak" ? Math.max(...nilai) : Math.min(...nilai);
  const sama = ds.kategori.filter((_, i) => nilai[i] === target).map((k) => k.id);
  return { tunggal: sama.length === 1 ? sama[0] : null, sama, n: target };
}

export function kalimatBaca(l: LabBaca): string {
  const ds = SET[l.set];
  const bagian: string[] = [];
  if (l.a === null) {
    bagian.push("Ketuk dua baris untuk dibandingkan.");
  } else if (l.b === null) {
    bagian.push(`${kapital(namaBaca(l.set, l.a))}: ${banyakBaca(l.set, l.a)} ${ds.satuan}. Ketuk satu baris lagi.`);
  } else {
    const na = banyakBaca(l.set, l.a);
    const nb = banyakBaca(l.set, l.b);
    const A = namaBaca(l.set, l.a);
    const B = namaBaca(l.set, l.b);
    if (na === nb) bagian.push(`Banyak ${A} dan banyak ${B} sama, yaitu ${na}.`);
    else {
      const [besar, kecil, nbesar, nkecil] = na > nb ? [A, B, na, nb] : [B, A, nb, na];
      bagian.push(`Banyak ${besar} ${nbesar - nkecil} lebihnya dari banyak ${kecil}. Banyak ${kecil} ${nbesar - nkecil} kurangnya dari banyak ${besar}.`);
      if (l.selisih) bagian.push(`Selisihnya ${nbesar} dikurangi ${nkecil} sama dengan ${nbesar - nkecil}.`);
    }
  }
  if (l.paling) {
    const mx = palingBaca(l.set, "banyak");
    const mn = palingBaca(l.set, "sedikit");
    bagian.push(mx.tunggal ? `Paling banyak: ${namaBaca(l.set, mx.tunggal)}, ${mx.n}.` : `Paling banyak: tidak ada satu, ${mx.sama.map((x) => namaBaca(l.set, x)).join(" dan ")} sama banyak.`);
    bagian.push(mn.tunggal ? `Paling sedikit: ${namaBaca(l.set, mn.tunggal)}, ${mn.n}.` : `Paling sedikit: tidak ada satu, ${mn.sama.map((x) => namaBaca(l.set, x)).join(" dan ")} sama banyak.`);
  }
  return bagian.join(" ");
}

export const laporanBaca = (l: LabBaca): KeadaanLabBaca => ({ alat: "baca", set: l.set, a: l.a, b: l.b, paling: l.paling, selisih: l.selisih });

// ---------------------------------------------------------------------------------------------
// Mesin Catat Turus (Sub-Bab A)
// ---------------------------------------------------------------------------------------------

export type KeadaanMesinCatat = "catat" | "hitung" | "baca" | "sudah" | "selesai";

export type DefCatat = { id: string; set: IdSet; ids: [string, string, string]; n: [number, number, number] };

/** Tiga ronde. Tiap ronde sembilan data dan satu jenis paling banyak (tidak seri). */
export const KASUS_CATAT: DefCatat[] = [
  { id: "buah", set: "buah", ids: ["anggur", "jeruk", "apel"], n: [2, 4, 3] },
  { id: "hewan", set: "hewan", ids: ["ayam", "kambing", "bebek"], n: [3, 2, 4] },
  { id: "mainan", set: "mainan", ids: ["mobil", "boneka", "kelereng"], n: [4, 2, 3] },
];

export const STASIUN_MESIN_CATAT = [
  { id: "catat", nama: "Catat", ikon: "✏️" },
  { id: "hitung", nama: "Hitung", ikon: "🔢" },
  { id: "baca", nama: "Baca", ikon: "👀" },
  { id: "selesai", nama: "Selesai", ikon: "🏁" },
];

export const NAMA_KEADAAN_CATAT: Record<KeadaanMesinCatat, string> = { catat: "Catat", hitung: "Hitung", baca: "Baca", sudah: "Selesai", selesai: "Selesai" };

/** Urutan data yang datang (indeks kategori 0..2). Acak tetap: tiap indeks tepat sebanyak n. */
export function aliranCatat(d: DefCatat, misi: number): number[] {
  const dasar: number[] = [];
  d.n.forEach((c, i) => {
    for (let k = 0; k < c; k++) dasar.push(i);
  });
  const total = dasar.length;
  return dasar.map((_, k) => dasar[(k * 5 + misi * 2) % total]);
}

export const namaCatat = (d: DefCatat, i: number): string => SET[d.set].kategori.find((k) => k.id === d.ids[i])?.nama ?? d.ids[i];
export const ikonCatat = (d: DefCatat, i: number): string => SET[d.set].kategori.find((k) => k.id === d.ids[i])?.ikon ?? "";
export const totalCatat = (d: DefCatat): number => d.n[0] + d.n[1] + d.n[2];
export const terbanyakCatat = (d: DefCatat): number => d.n.indexOf(Math.max(...d.n));

export type MesinCatat = {
  daftar: DefCatat[];
  misi: number;
  keadaan: KeadaanMesinCatat;
  /** Berapa data yang sudah dicatat pada ronde ini. */
  posisi: number;
  /** Turus per kategori yang sudah ditulis. */
  turus: [number, number, number];
  salahRonde: number;
  riwayat: string[];
  pesan: string;
  ditolak: number;
  /** Ronde yang dicatat tanpa satu pun salah baris. */
  tepat: number;
  selesai: boolean;
};

export type PeristiwaMesinCatat =
  | { t: "CATAT"; i: number }
  | { t: "JUMLAH"; nilai: number }
  | { t: "PALING"; i: number }
  | { t: "LANJUT" }
  | { t: "LOMPAT"; ke: number }
  | { t: "ULANG" };

export const awalMesinCatat = (daftar: DefCatat[] = KASUS_CATAT): MesinCatat => ({
  daftar,
  misi: 0,
  keadaan: "catat",
  posisi: 0,
  turus: [0, 0, 0],
  salahRonde: 0,
  riwayat: [],
  pesan: "",
  ditolak: 0,
  tepat: 0,
  selesai: false,
});

export const kasusCatat = (x: MesinCatat): DefCatat => x.daftar[x.misi];
export const indeksStasiunCatat = (k: KeadaanMesinCatat): number => ({ catat: 0, hitung: 1, baca: 2, sudah: 3, selesai: 3 })[k];

/** Data yang sedang datang (indeks kategori), atau null bila semua sudah dicatat. */
export const dataBerikutCatat = (x: MesinCatat): number | null => {
  const a = aliranCatat(kasusCatat(x), x.misi);
  return x.posisi < a.length ? a[x.posisi] : null;
};

/** Tiga pilihan jumlah semua data: benar, satu kurangnya, satu lebihnya. Urutannya berputar menurut ronde. */
export function opsiJumlahCatat(d: DefCatat, misi: number): number[] {
  const t = totalCatat(d);
  return rotasi([t, t - 1, t + 1], (misi + 1) % 3);
}

/** Tiga pilihan jenis (indeks 0..2) untuk "paling banyak". Urutannya berputar menurut ronde. */
export const opsiPalingCatat = (misi: number): number[] => rotasi([0, 1, 2], (misi * 2) % 3);

const tolakC = (x: MesinCatat, pesan: string, salah = false): MesinCatat => ({ ...x, pesan, ditolak: x.ditolak + 1, salahRonde: x.salahRonde + (salah ? 1 : 0) });
const pindahC = (x: MesinCatat, ke: KeadaanMesinCatat, tambah: Partial<MesinCatat> = {}): MesinCatat => ({
  ...x,
  ...tambah,
  keadaan: ke,
  pesan: "",
  riwayat: [...x.riwayat, `${NAMA_KEADAAN_CATAT[x.keadaan]} → ${NAMA_KEADAAN_CATAT[ke]}`].slice(-10),
});

export function ringkasCatat(d: DefCatat): string {
  const bagian = d.n.map((c, i) => `${namaCatat(d, i)} ${c}`).join(", ");
  const mx = terbanyakCatat(d);
  return `Hasil turus: ${bagian}. Jumlah semuanya ${totalCatat(d)}. Paling banyak: ${namaCatat(d, mx)}.`;
}

export function petunjukMesinCatat(x: MesinCatat): string {
  const d = kasusCatat(x);
  switch (x.keadaan) {
    case "catat": {
      const b = dataBerikutCatat(x);
      return b === null ? "Semua data sudah dicatat." : `Data ke-${x.posisi + 1} dari ${totalCatat(d)}: ${namaCatat(d, b)}. Ketuk baris ${namaCatat(d, b)} untuk menambah satu garis.`;
    }
    case "hitung":
      return `Semua ${totalCatat(d)} data sudah dicatat. Ada berapa data seluruhnya?`;
    case "baca":
      return "Lihat turusnya. Jenis apa yang paling banyak?";
    case "sudah":
      return `Betul! ${ringkasCatat(d)}`;
    default:
      return "Semua ronde sudah dicatat.";
  }
}

function tolakSalahTempatC(x: MesinCatat, p: PeristiwaMesinCatat): MesinCatat {
  const d = kasusCatat(x);
  switch (x.keadaan) {
    case "catat": {
      if (p.t === "JUMLAH") return tolakC(x, `Catat semua data dulu. Masih ada ${totalCatat(d) - x.posisi} data yang belum dicatat.`);
      return tolakC(x, "Hitung jumlah semuanya dulu, baru membaca. Catat dulu semua datanya.");
    }
    case "hitung":
      return tolakC(x, p.t === "CATAT" ? "Semua data sudah dicatat. Sekarang hitung jumlah semuanya." : "Hitung jumlah semua data dulu, baru mencari yang paling banyak.");
    case "baca":
      return tolakC(x, p.t === "CATAT" ? "Semua data sudah dicatat. Sekarang baca turusnya." : "Jumlah sudah dihitung. Sekarang cari yang paling banyak.");
    case "sudah":
      return tolakC(x, "Ronde ini sudah selesai. Tekan lanjut ke ronde berikutnya.");
    default:
      return tolakC(x, "Semua ronde sudah selesai. Main lagi kalau mau.");
  }
}

/** Satu langkah mesin. Selalu mengembalikan objek baru. */
export function langkahMesinCatat(x: MesinCatat, p: PeristiwaMesinCatat): MesinCatat {
  const d = kasusCatat(x);
  switch (p.t) {
    case "CATAT": {
      if (x.keadaan !== "catat") return tolakSalahTempatC(x, p);
      const b = dataBerikutCatat(x);
      if (b === null) return x;
      if (p.i < 0 || p.i > 2) return tolakC(x, "Pilih salah satu baris.");
      if (p.i !== b) return tolakC(x, `Data ini ${namaCatat(d, b)}, bukan ${namaCatat(d, p.i)}. Satu garis ditulis di baris ${namaCatat(d, b)}.`, true);
      const turus: [number, number, number] = [x.turus[0], x.turus[1], x.turus[2]];
      turus[b] += 1;
      const posisi = x.posisi + 1;
      if (posisi >= totalCatat(d)) return pindahC(x, "hitung", { posisi, turus });
      return { ...x, posisi, turus, pesan: "" };
    }
    case "JUMLAH": {
      if (x.keadaan !== "hitung") return tolakSalahTempatC(x, p);
      const t = totalCatat(d);
      if (p.nilai !== t) return tolakC(x, `Belum tepat. Jumlahkan banyak turus tiap baris: ${d.n.join(" + ")}.`);
      return pindahC(x, "baca");
    }
    case "PALING": {
      if (x.keadaan !== "baca") return tolakSalahTempatC(x, p);
      const mx = terbanyakCatat(d);
      if (p.i !== mx) return tolakC(x, `${kapital(namaCatat(d, p.i))} hanya ${d.n[p.i]}. Cari baris yang turusnya paling panjang.`);
      return pindahC(x, "sudah", { tepat: x.tepat + (x.salahRonde === 0 ? 1 : 0) });
    }
    case "LANJUT": {
      if (x.keadaan !== "sudah") return tolakSalahTempatC(x, p);
      if (x.misi + 1 < x.daftar.length) return pindahC(x, "catat", { misi: x.misi + 1, posisi: 0, turus: [0, 0, 0], salahRonde: 0 });
      return pindahC(x, "selesai", { selesai: true });
    }
    case "LOMPAT": {
      if (p.ke === indeksStasiunCatat(x.keadaan)) return x;
      return tolakC(x, "Mesin berjalan berurutan: catat, hitung, baca. Selesaikan stasiun yang sekarang dulu.");
    }
    case "ULANG":
      return x.selesai ? awalMesinCatat(x.daftar) : x;
  }
}

// ---------------------------------------------------------------------------------------------
// Mesin Susun Diagram (Sub-Bab B)
// ---------------------------------------------------------------------------------------------

export type KeadaanMesinSusun = "judul" | "ket" | "isi" | "baca" | "sudah" | "selesai";

export type DefSusun = { id: string; set: IdSet; n: [number, number, number, number]; lambang: Lambang };

/** Tiga ronde. Tiap ronde punya satu baris paling banyak (tidak seri). */
export const KASUS_SUSUN: DefSusun[] = [
  { id: "warna", set: "warna", n: [7, 3, 5, 2], lambang: "bintang" },
  { id: "permainan", set: "permainan", n: [4, 6, 5, 7], lambang: "hati" },
  { id: "berangkat", set: "berangkat", n: [4, 6, 7, 3], lambang: "lingkaran" },
];

export const STASIUN_MESIN_SUSUN = [
  { id: "judul", nama: "Judul", ikon: "🏷️" },
  { id: "ket", nama: "Keterangan", ikon: "📝" },
  { id: "isi", nama: "Gambar", ikon: "🖍️" },
  { id: "baca", nama: "Baca", ikon: "👀" },
  { id: "selesai", nama: "Selesai", ikon: "🏁" },
];

export const NAMA_KEADAAN_SUSUN: Record<KeadaanMesinSusun, string> = { judul: "Judul", ket: "Keterangan", isi: "Gambar", baca: "Baca", sudah: "Selesai", selesai: "Selesai" };

export const ketBenarSusun = (d: DefSusun): string => `Satu ${LAMBANG[d.lambang].nama} mewakili satu ${SET[d.set].satuan}.`;
export const terbanyakSusun = (d: DefSusun): number => d.n.indexOf(Math.max(...d.n));

/** Tiga judul: milik data ini dan dua milik data lain. Urutannya berputar menurut ronde. */
export function opsiJudulSusun(daftar: DefSusun[], misi: number): string[] {
  const lain = daftar.filter((_, i) => i !== misi).map((d) => SET[d.set].judul);
  return rotasi([SET[daftar[misi].set].judul, ...lain], (misi + 1) % 3);
}

/** Tiga keterangan: satu, dua, atau lima. Hanya "satu" yang cocok dengan diagram bab ini. */
export function opsiKetSusun(d: DefSusun, misi: number): string[] {
  const l = LAMBANG[d.lambang].nama;
  const s = SET[d.set].satuan;
  return rotasi([`Satu ${l} mewakili satu ${s}.`, `Satu ${l} mewakili dua ${s}.`, `Satu ${l} mewakili lima ${s}.`], misi % 3);
}

/** Tiga pilihan baris (indeks 0..3) untuk "paling banyak": yang terbanyak dan dua lainnya. Urutannya berputar. */
export function opsiBacaSusun(d: DefSusun, misi: number): number[] {
  const mx = terbanyakSusun(d);
  const lain = [0, 1, 2, 3].filter((i) => i !== mx).slice(0, 2);
  return rotasi([mx, ...lain], (misi + 2) % 3);
}

export type MesinSusun = {
  daftar: DefSusun[];
  misi: number;
  keadaan: KeadaanMesinSusun;
  n: number[];
  riwayat: string[];
  pesan: string;
  ditolak: number;
  salahRonde: number;
  /** Ronde yang selesai tanpa satu pun kiriman yang ditolak. */
  tepat: number;
  selesai: boolean;
};

export type PeristiwaMesinSusun =
  | { t: "JUDUL"; nilai: string }
  | { t: "KET"; nilai: string }
  | { t: "TAMBAH"; i: number }
  | { t: "KURANG"; i: number }
  | { t: "PERIKSA" }
  | { t: "JAWAB"; i: number }
  | { t: "LANJUT" }
  | { t: "LOMPAT"; ke: number }
  | { t: "ULANG" };

export const awalMesinSusun = (daftar: DefSusun[] = KASUS_SUSUN): MesinSusun => ({
  daftar,
  misi: 0,
  keadaan: "judul",
  n: [0, 0, 0, 0],
  riwayat: [],
  pesan: "",
  ditolak: 0,
  salahRonde: 0,
  tepat: 0,
  selesai: false,
});

export const kasusSusun = (x: MesinSusun): DefSusun => x.daftar[x.misi];
export const indeksStasiunSusun = (k: KeadaanMesinSusun): number => ({ judul: 0, ket: 1, isi: 2, baca: 3, sudah: 4, selesai: 4 })[k];

const tolakS = (x: MesinSusun, pesan: string): MesinSusun => ({ ...x, pesan, ditolak: x.ditolak + 1, salahRonde: x.salahRonde + 1 });
const pindahS = (x: MesinSusun, ke: KeadaanMesinSusun, tambah: Partial<MesinSusun> = {}): MesinSusun => ({
  ...x,
  ...tambah,
  keadaan: ke,
  pesan: "",
  riwayat: [...x.riwayat, `${NAMA_KEADAAN_SUSUN[x.keadaan]} → ${NAMA_KEADAAN_SUSUN[ke]}`].slice(-10),
});

/** Baris pertama yang banyak gambarnya belum sama dengan tabel, atau -1 bila semua cocok. */
export const barisBeda = (x: MesinSusun): number => kasusSusun(x).n.findIndex((c, i) => c !== x.n[i]);

export function ringkasSusun(d: DefSusun): string {
  const ds = SET[d.set];
  const mx = terbanyakSusun(d);
  return `Diagram "${ds.judul}" lengkap: judul, keterangan, dan gambar. Paling banyak: ${ds.kategori[mx].nama}, ${d.n[mx]}.`;
}

export function petunjukMesinSusun(x: MesinSusun): string {
  const d = kasusSusun(x);
  const ds = SET[d.set];
  switch (x.keadaan) {
    case "judul":
      return "Diagram dimulai dari judul. Pilih judul yang cocok dengan tabel data.";
    case "ket":
      return `Judulnya sudah. Sekarang tulis keterangan: satu ${LAMBANG[d.lambang].nama} mewakili berapa?`;
    case "isi":
      return `Gambar tiap baris sesuai tabel, memakai ${LAMBANG[d.lambang].nama}. Setelah selesai, tekan Periksa.`;
    case "baca":
      return `Diagramnya benar. Baca diagramnya: ${ds.satuan === "anak" ? "mana" : "apa"} yang paling banyak?`;
    case "sudah":
      return `Betul! ${ringkasSusun(d)}`;
    default:
      return "Semua diagram sudah tersusun.";
  }
}

function tolakSalahTempatS(x: MesinSusun, p: PeristiwaMesinSusun): MesinSusun {
  switch (x.keadaan) {
    case "judul":
      if (p.t === "TAMBAH" || p.t === "KURANG" || p.t === "PERIKSA") return tolakS(x, "Tulis judul dan keterangan dulu. Diagram tanpa judul membuat pembaca bingung data apa ini.");
      return tolakS(x, "Judul dulu, baru keterangan.");
    case "ket":
      if (p.t === "TAMBAH" || p.t === "KURANG" || p.t === "PERIKSA") return tolakS(x, "Tulis keterangan dulu. Pembaca perlu tahu satu gambar mewakili berapa.");
      return tolakS(x, "Judul sudah. Sekarang pilih keterangannya.");
    case "isi":
      return tolakS(x, p.t === "JAWAB" ? "Selesaikan gambarnya dulu, lalu tekan Periksa." : "Judul dan keterangan sudah. Sekarang gambar tiap baris.");
    case "baca":
      return tolakS(x, "Diagramnya sudah benar. Sekarang baca diagramnya.");
    case "sudah":
      return tolakS(x, "Diagram ini sudah selesai. Tekan lanjut ke diagram berikutnya.");
    default:
      return tolakS(x, "Semua diagram sudah selesai. Main lagi kalau mau.");
  }
}

/** Satu langkah mesin. Selalu mengembalikan objek baru. */
export function langkahMesinSusun(x: MesinSusun, p: PeristiwaMesinSusun): MesinSusun {
  const d = kasusSusun(x);
  const ds = SET[d.set];
  switch (p.t) {
    case "JUDUL": {
      if (x.keadaan !== "judul") return tolakSalahTempatS(x, p);
      if (p.nilai !== ds.judul) return tolakS(x, `Judul itu milik data lain. Lihat tabel: ini data "${ds.judul}".`);
      return pindahS(x, "ket");
    }
    case "KET": {
      if (x.keadaan !== "ket") return tolakSalahTempatS(x, p);
      if (p.nilai !== ketBenarSusun(d)) return tolakS(x, `Belum cocok. Pada diagram ini tiap ${LAMBANG[d.lambang].nama} mewakili satu ${ds.satuan}.`);
      return pindahS(x, "isi", { n: [0, 0, 0, 0] });
    }
    case "TAMBAH": {
      if (x.keadaan !== "isi") return tolakSalahTempatS(x, p);
      if (p.i < 0 || p.i > 3) return x;
      if (x.n[p.i] >= MAKS_GAMBAR) return tolakS(x, `Satu baris paling banyak ${MAKS_GAMBAR} gambar.`);
      return { ...x, n: x.n.map((c, i) => (i === p.i ? c + 1 : c)), pesan: "" };
    }
    case "KURANG": {
      if (x.keadaan !== "isi") return tolakSalahTempatS(x, p);
      if (p.i < 0 || p.i > 3) return x;
      if (x.n[p.i] <= 0) return { ...x, pesan: `Baris ${ds.kategori[p.i].nama} belum punya gambar.` };
      return { ...x, n: x.n.map((c, i) => (i === p.i ? c - 1 : c)), pesan: "" };
    }
    case "PERIKSA": {
      if (x.keadaan !== "isi") return tolakSalahTempatS(x, p);
      const b = barisBeda(x);
      if (b >= 0) {
        const nama = ds.kategori[b].nama;
        const sel = d.n[b] - x.n[b];
        return tolakS(x, `Baris ${nama}: tabel ${d.n[b]}, gambarmu ${x.n[b]}. ${sel > 0 ? `Tambah ${sel} gambar.` : `Kurangi ${-sel} gambar.`}`);
      }
      return pindahS(x, "baca");
    }
    case "JAWAB": {
      if (x.keadaan !== "baca") return tolakSalahTempatS(x, p);
      const mx = terbanyakSusun(d);
      if (p.i !== mx) return tolakS(x, `${kapital(ds.kategori[p.i].nama)} hanya ${d.n[p.i]}. Cari baris yang gambarnya paling panjang.`);
      return pindahS(x, "sudah", { tepat: x.tepat + (x.salahRonde === 0 ? 1 : 0) });
    }
    case "LANJUT": {
      if (x.keadaan !== "sudah") return tolakSalahTempatS(x, p);
      if (x.misi + 1 < x.daftar.length) return pindahS(x, "judul", { misi: x.misi + 1, n: [0, 0, 0, 0], salahRonde: 0 });
      return pindahS(x, "selesai", { selesai: true });
    }
    case "LOMPAT": {
      if (p.ke === indeksStasiunSusun(x.keadaan)) return x;
      return tolakS(x, "Mesin berjalan berurutan: judul, keterangan, gambar, baca. Selesaikan stasiun yang sekarang dulu.");
    }
    case "ULANG":
      return x.selesai ? awalMesinSusun(x.daftar) : x;
  }
}
