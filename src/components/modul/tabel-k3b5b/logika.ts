/**
 * Logika murni Simulasi Papan Tabel Kelas 3 Bab 5 Sub-Bab B "Tabel Bu Wulan", akhir cerita Bengkel Sepeda Pak Hasan.
 * Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-tabel-k3b5b.mjs. Eksplorasi bebas tanpa skor.
 * Empat alat: Cacah (ketuk jenis sesuai daftar; garis kelima otomatis menjadi bundel lima), Isi (isi kolom banyak sesuai turus), Urut (geser baris tabel sampai urut),
 * dan Baca (tekan Baca kolom banyak, alat menolak menjawab sebelum itu, lalu jawab pertanyaan: terbanyak, tersedikit, lebih dari, selisih). Data ada di data-sim.ts.
 */
import { MAKS_TURUS, TARGET_BACA, TARGET_CACAH, TARGET_ISI, TARGET_URUT } from "./data-sim";

export type ModeTabel = "cacah" | "isi" | "urut" | "baca";

export type KeadaanTabel = {
  alat: "tabel";
  mode: ModeTabel;
  /** Cacah: sasaran ke berapa, turus tiap jenis yang sudah diketuk, sasaran yang sudah benar. */
  cacahKe: number;
  cacah: number[];
  cacahBenar: number[];
  /** Isi: sasaran ke berapa, angka kolom banyak tiap baris, sasaran yang sudah benar. */
  isiKe: number;
  isi: number[];
  isiBenar: number[];
  /** Urut: sasaran ke berapa, urutan baris yang tampil (nomor baris data dari atas ke bawah), sasaran yang sudah benar. */
  urutKe: number;
  urut: number[];
  urutBenar: number[];
  /** Baca: sasaran ke berapa, sudah menekan Baca, pilihan (-1 bila belum), sasaran yang sudah benar, pernah mencoba menjawab sebelum membaca (ditolak). */
  bacaKe: number;
  sudahBaca: boolean;
  bacaPilih: number;
  bacaBenar: number[];
  tolak: boolean;
  /** Banyak percobaan yang keliru (hanya untuk petunjuk, bukan skor). */
  salah: number;
};

export const awalTabel = (): KeadaanTabel => ({
  alat: "tabel",
  mode: "cacah",
  cacahKe: 0,
  cacah: [0, 0, 0],
  cacahBenar: [],
  isiKe: 0,
  isi: [0, 0, 0],
  isiBenar: [],
  urutKe: 0,
  urut: [0, 1, 2],
  urutBenar: [],
  bacaKe: 0,
  sudahBaca: false,
  bacaPilih: -1,
  bacaBenar: [],
  tolak: false,
  salah: 0,
});
export const mulaiLagiTabel = (): KeadaanTabel => awalTabel();

/* ------------------------------ Kata (tanpa digit) ------------------------------ */
const SAT = ["nol", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan"] as const;
/** Nama bilangan 0 sampai 999 dalam kata. */
export function kata(n: number): string {
  if (n < 10) return SAT[n] ?? String(n);
  if (n === 10) return "sepuluh";
  if (n === 11) return "sebelas";
  if (n < 20) return `${SAT[n - 10]} belas`;
  if (n < 100) {
    const s = n % 10;
    return s === 0 ? `${SAT[Math.floor(n / 10)]} puluh` : `${SAT[Math.floor(n / 10)]} puluh ${SAT[s]}`;
  }
  const r = Math.floor(n / 100);
  const sisa = n % 100;
  const depan = r === 1 ? "seratus" : `${SAT[r]} ratus`;
  return sisa === 0 ? depan : `${depan} ${kata(sisa)}`;
}
const besar = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);
export { besar as hurufBesar };
export const pilihModeTabel = (k: KeadaanTabel, mode: ModeTabel): KeadaanTabel => ({ ...k, mode });

/** Sisipkan jawaban benar di tempat yang bukan pertama (deterministik). */
function sisip<T>(benar: T, lain: T[], geser: number): T[] {
  const p = 1 + (geser % lain.length);
  return [...lain.slice(0, p), benar, ...lain.slice(p)];
}
/** Banyak bundel lima penuh dan garis sisa dari `n` turus. */
export const bundelSim = (n: number): { bundel: number; sisa: number } => ({ bundel: Math.floor(n / 5), sisa: n % 5 });

/* ------------------------------ Cacah dengan turus berlima ------------------------------ */
export const targetCacah = (k: KeadaanTabel) => TARGET_CACAH[k.cacahKe % TARGET_CACAH.length];
/** Banyak data sebenarnya tiap jenis dalam daftar. */
export const hitungDaftar = (k: KeadaanTabel): number[] => {
  const t = targetCacah(k);
  return t.jenis.map((_, j) => t.daftar.filter((x) => x === j).length);
};
export const jumlahCacah = (k: KeadaanTabel): number => k.cacah.reduce((a, b) => a + b, 0);
/** Ketuk jenis `j`: menambah satu turus. Garis kelima pada jenis itu otomatis menjadi bundel (digambar oleh tampilan). Ditolak bila sudah dua puluh. */
export function ketukCacah(k: KeadaanTabel, j: number): { k: KeadaanTabel; ok: boolean } {
  if (j < 0 || j > 2 || k.cacah[j] >= MAKS_TURUS) return { k, ok: false };
  return { k: { ...k, cacah: k.cacah.map((x, i) => (i === j ? x + 1 : x)) }, ok: true };
}
export const hapusCacah = (k: KeadaanTabel): KeadaanTabel => ({ ...k, cacah: [0, 0, 0] });
export function periksaCacah(k: KeadaanTabel): { k: KeadaanTabel; ok: boolean } {
  const betul = hitungDaftar(k);
  if (k.cacah.every((x, i) => x === betul[i])) return { k: { ...k, cacahBenar: k.cacahBenar.includes(k.cacahKe) ? k.cacahBenar : [...k.cacahBenar, k.cacahKe], cacahKe: k.cacahKe + 1, cacah: [0, 0, 0] }, ok: true };
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukCacah(k: KeadaanTabel): string {
  const total = targetCacah(k).daftar.length;
  const n = jumlahCacah(k);
  if (n === 0) return "Belum ada turus. Ketuk nama jenis sesuai daftar untuk menambah turus satu per satu.";
  if (n < total) return `Baru ${kata(n)} dari ${kata(total)} data yang tercatat. Lanjutkan sampai semua data dalam daftar tercatat.`;
  if (n > total) return "Turus sudah lebih banyak dari daftar. Tekan Hapus turus, lalu hitung lagi dari daftar.";
  return "Jumlah turus sudah sama dengan daftar, tetapi ada jenis yang keliru. Hitung ulang tiap jenis dari daftar.";
}
export function kalimatCacah(k: KeadaanTabel): string {
  if (k.cacahBenar.length > 0 && jumlahCacah(k) === 0) return "Betul! Ada daftar berikutnya.";
  return "Baca daftar, ketuk jenisnya untuk menambah turus, lalu tekan Periksa.";
}
export const pesanBundel = (n: number): string => {
  const { bundel, sisa } = bundelSim(n);
  return sisa === 0 && bundel > 0 ? `Garis kelima mencoret miring, jadi ${kata(bundel)} bundel lima.` : `${kata(n)} turus.`;
};

/* ------------------------------ Isi kolom banyak ------------------------------ */
export const targetIsi = (k: KeadaanTabel) => TARGET_ISI[k.isiKe % TARGET_ISI.length];
/** Ubah angka kolom banyak baris `r` sebesar `delta`; paling kecil nol dan paling besar dua puluh. */
export function ubahIsi(k: KeadaanTabel, r: number, delta: number): { k: KeadaanTabel; ok: boolean } {
  if (r < 0 || r > 2) return { k, ok: false };
  const baru = k.isi[r] + delta;
  if (baru < 0 || baru > MAKS_TURUS) return { k, ok: false };
  return { k: { ...k, isi: k.isi.map((x, i) => (i === r ? baru : x)) }, ok: true };
}
export function periksaIsi(k: KeadaanTabel): { k: KeadaanTabel; ok: boolean } {
  const t = targetIsi(k);
  if (k.isi.every((x, i) => x === t.baris[i].n)) return { k: { ...k, isiBenar: k.isiBenar.includes(k.isiKe) ? k.isiBenar : [...k.isiBenar, k.isiKe], isiKe: k.isiKe + 1, isi: [0, 0, 0] }, ok: true };
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukIsi(k: KeadaanTabel): string {
  const t = targetIsi(k);
  if (k.isi.every((x) => x === 0)) return "Kolom banyak masih kosong. Hitung turus tiap baris, lalu isi kolom banyak dengan tombol tambah dan kurang.";
  const i = k.isi.findIndex((x, q) => x !== t.baris[q].n);
  return `Baris ${t.baris[i].nama} belum sama dengan turusnya. Hitung tiap bundel lima, lalu tambahkan garis sisa.`;
}
export function kalimatIsi(k: KeadaanTabel): string {
  return k.isiBenar.length > 0 && k.isi.every((x) => x === 0) ? "Betul! Ada tabel berikutnya." : "Hitung turus tiap baris, isi kolom banyak, lalu tekan Periksa.";
}

/* ------------------------------ Urutkan baris ------------------------------ */
export const targetUrut = (k: KeadaanTabel) => TARGET_URUT[k.urutKe % TARGET_URUT.length];
/** Nilai banyak baris menurut urutan yang tampil sekarang. */
export const banyakUrut = (k: KeadaanTabel): number[] => k.urut.map((i) => targetUrut(k).baris[i].n);
export const sudahUrut = (k: KeadaanTabel): boolean => {
  const v = banyakUrut(k);
  const naik = targetUrut(k).arah === "naik";
  return v.every((x, i) => i === 0 || (naik ? x > v[i - 1] : x < v[i - 1]));
};
/** Geser baris yang tampil di posisi `pos` ke atas (arah -1) atau ke bawah (arah 1) dengan menukar tempat dengan tetangganya. */
export function geserUrut(k: KeadaanTabel, pos: number, arah: -1 | 1): { k: KeadaanTabel; ok: boolean } {
  const tujuan = pos + arah;
  if (pos < 0 || pos > 2 || tujuan < 0 || tujuan > 2) return { k, ok: false };
  const u = [...k.urut];
  [u[pos], u[tujuan]] = [u[tujuan], u[pos]];
  return { k: { ...k, urut: u }, ok: true };
}
export function periksaUrut(k: KeadaanTabel): { k: KeadaanTabel; ok: boolean } {
  if (sudahUrut(k)) return { k: { ...k, urutBenar: k.urutBenar.includes(k.urutKe) ? k.urutBenar : [...k.urutBenar, k.urutKe], urutKe: k.urutKe + 1, urut: [0, 1, 2] }, ok: true };
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukUrut(k: KeadaanTabel): string {
  return targetUrut(k).arah === "naik"
    ? "Baris belum urut. Susun dari yang paling sedikit di atas sampai yang paling banyak di bawah, dengan membandingkan kolom banyak."
    : "Baris belum urut. Susun dari yang paling banyak di atas sampai yang paling sedikit di bawah, dengan membandingkan kolom banyak.";
}
export function kalimatUrut(k: KeadaanTabel): string {
  if (k.urutBenar.length > 0 && k.urut.every((x, i) => x === i)) return "Betul! Ada tabel berikutnya.";
  return targetUrut(k).arah === "naik" ? "Geser baris sampai yang paling sedikit di atas, lalu tekan Periksa." : "Geser baris sampai yang paling banyak di atas, lalu tekan Periksa.";
}

/* ------------------------------ Baca tabel ------------------------------ */
export const targetBaca = (k: KeadaanTabel) => TARGET_BACA[k.bacaKe % TARGET_BACA.length];
/** Jawaban benar sasaran: nama jenis (terbanyak, tersedikit, lebih dari) atau selisih (angka dalam teks). */
export function jawabanBaca(k: KeadaanTabel): string {
  const t = targetBaca(k);
  const urut = [...t.baris].sort((a, b) => a.n - b.n);
  if (t.soal === "terbanyak") return urut[2].nama;
  if (t.soal === "tersedikit") return urut[0].nama;
  if (t.soal === "lebih") return t.baris.filter((b) => b.n > t.acuan)[0].nama;
  return String(urut[2].n - urut[0].n);
}
export const pertanyaanBaca = (k: KeadaanTabel): string => {
  const t = targetBaca(k);
  return t.soal === "terbanyak" ? "Jenis mana yang terbanyak?" : t.soal === "tersedikit" ? "Jenis mana yang tersedikit?" : t.soal === "lebih" ? `Jenis mana yang lebih dari ${kata(t.acuan)}?` : "Berapa selisih terbanyak dan tersedikit?";
};
/** Tiga pilihan: yang benar tidak di tempat pertama. Untuk selisih, pengecoh berupa jumlah dan angka terbesar. */
export function pilihanBaca(k: KeadaanTabel): string[] {
  const t = targetBaca(k);
  const benar = jawabanBaca(k);
  if (t.soal === "selisih") {
    const n = Number(benar);
    const urut = [...t.baris].sort((a, b) => a.n - b.n);
    const lain = [urut[2].n, n + 2, n - 2].filter((x, i, a) => x >= 1 && x !== n && a.indexOf(x) === i).slice(0, 2);
    return sisip(benar, lain.map(String), n);
  }
  const lain = t.baris.map((b) => b.nama).filter((x) => x !== benar);
  return sisip(benar, lain, t.baris.length + k.bacaKe);
}
/** Tekan Baca: alat membaca kolom banyak tabel. */
export const bacaKolom = (k: KeadaanTabel): KeadaanTabel => ({ ...k, sudahBaca: true });
export function pilihBaca(k: KeadaanTabel, i: number): KeadaanTabel {
  return i < 0 || i >= 3 || !k.sudahBaca ? k : { ...k, bacaPilih: i };
}
/** Periksa jawaban. Ditolak (bukan percobaan keliru) bila kolom banyak belum dibaca. */
export function periksaBaca(k: KeadaanTabel): { k: KeadaanTabel; ok: boolean } {
  if (!k.sudahBaca) return { k: { ...k, tolak: true }, ok: false };
  if (k.bacaPilih >= 0 && pilihanBaca(k)[k.bacaPilih] === jawabanBaca(k)) {
    return { k: { ...k, bacaBenar: k.bacaBenar.includes(k.bacaKe) ? k.bacaBenar : [...k.bacaBenar, k.bacaKe], bacaKe: k.bacaKe + 1, sudahBaca: false, bacaPilih: -1 }, ok: true };
  }
  return { k: { ...k, salah: k.salah + 1 }, ok: false };
}
export function petunjukBaca(k: KeadaanTabel): string {
  if (!k.sudahBaca) return "Alat belum membaca tabel. Tekan Baca kolom banyak dulu, baru jawab pertanyaannya.";
  if (k.bacaPilih < 0) return "Pilih satu jawaban dulu.";
  const s = targetBaca(k).soal;
  return s === "terbanyak"
    ? "Terbanyak berarti angka paling besar pada kolom banyak. Bandingkan angka ketiga baris."
    : s === "tersedikit"
      ? "Tersedikit berarti angka paling kecil pada kolom banyak. Bandingkan angka ketiga baris."
      : s === "lebih"
        ? "Lebih dari berarti angkanya harus lebih besar dari acuan. Angka yang tepat sama dengan acuan belum lebih dari acuan."
        : "Kurangkan angka terkecil dari angka terbesar pada kolom banyak.";
}
export function kalimatBaca(k: KeadaanTabel): string {
  if (k.bacaBenar.length > 0 && !k.sudahBaca && k.bacaPilih < 0) return "Betul! Ada pertanyaan berikutnya.";
  return k.sudahBaca ? "Kolom banyak sudah terbaca. Pilih jawabannya, lalu tekan Periksa." : "Tekan Baca kolom banyak dulu supaya alat membaca tabelnya.";
}
