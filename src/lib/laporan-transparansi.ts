import type { KodePhase } from "./fase";

/**
 * Laporan penggunaan biaya langganan per bulan.
 * Semua angka di bawah adalah CONTOH sampai laporan tersambung ke Supabase (RPC read-only).
 * Bentuk datanya sengaja sama dengan yang nanti dikirim server, jadi UI tidak perlu berubah.
 * Semua angka turunan (kantong, surplus, sisa) dihitung di `hitungLaporan`, bukan diketik manual,
 * supaya hitungannya selalu cocok dan bisa diperiksa orang lain.
 */

export const URUTAN_FASE: readonly KodePhase[] = ["FASE_A", "FASE_B", "FASE_C"];

export const NAMA_FASE: Record<KodePhase, { huruf: string; kelas: string }> = {
  FASE_A: { huruf: "A", kelas: "Kelas 1–2" },
  FASE_B: { huruf: "B", kelas: "Kelas 3–4" },
  FASE_C: { huruf: "C", kelas: "Kelas 5–6" },
};

export type BiayaServer = { nama: string; keterangan: string; rupiah: number };

export type MasukanBulan = {
  id: string;
  label: string;
  status: "berjalan" | "ditutup";
  /** Tanggal penutupan atau keterangan periode, ditampilkan apa adanya. */
  keteranganPeriode: string;
  /** Pendapatan langganan yang benar-benar masuk, per fase. */
  pemasukan: Record<KodePhase, number>;
  /** Pelanggan aktif per fase, dasar pembagian surplus operasional. */
  pelangganAktif: Record<KodePhase, number>;
  biayaServer: BiayaServer[];
  /** Batas atas biaya hidup layak founder per bulan. */
  plafonFounder: number;
  /** Hanya untuk bulan yang sudah ditutup. */
  penyaluran?: {
    tanggal: string;
    penerima: Record<KodePhase, number>;
    disalurkan: Record<KodePhase, number>;
    rujukanBatch: string;
  };
  bukti: { label: string; nilai: string; catatan: string }[];
};

export const DATA_LAPORAN: MasukanBulan[] = [
  {
    id: "2026-11",
    label: "November 2026",
    status: "berjalan",
    keteranganPeriode: "Berjalan sampai 7 November 2026. Angka bertambah sampai akhir bulan.",
    pemasukan: { FASE_A: 7_200_000, FASE_B: 6_100_000, FASE_C: 4_900_000 },
    pelangganAktif: { FASE_A: 192, FASE_B: 160, FASE_C: 128 },
    biayaServer: [
      { nama: "Hosting & jaringan", keterangan: "Menyajikan halaman dan berkas bab", rupiah: 62_000 },
      { nama: "Database & akun", keterangan: "Menyimpan progres dan Poin Kualifikasi", rupiah: 48_000 },
      { nama: "Domain", keterangan: "igiligil.xyz", rupiah: 12_000 },
      { nama: "Penilaian AI Praktikum", keterangan: "1 panggilan per penyerahan Praktikum", rupiah: 9_000 },
    ],
    plafonFounder: 2_200_000,
    bukti: [
      { label: "Bab terbit", nilai: "5 bab", catatan: "Matematika Kelas 1 bab 1–5" },
      { label: "Siswa aktif", nilai: "480 siswa", catatan: "Belajar minimal sekali dalam 30 hari" },
      { label: "Panggilan AI saat siswa belajar", nilai: "0 kali", catatan: "Materi, Latihan, dan Ujian tanpa AI" },
    ],
  },
  {
    id: "2026-10",
    label: "Oktober 2026",
    status: "ditutup",
    keteranganPeriode: "Ditutup 31 Oktober 2026 pukul 23:59 WIB",
    pemasukan: { FASE_A: 18_000_000, FASE_B: 15_000_000, FASE_C: 12_000_000 },
    pelangganAktif: { FASE_A: 180, FASE_B: 150, FASE_C: 120 },
    biayaServer: [
      { nama: "Hosting & jaringan", keterangan: "Menyajikan halaman dan berkas bab", rupiah: 140_000 },
      { nama: "Database & akun", keterangan: "Menyimpan progres dan Poin Kualifikasi", rupiah: 110_000 },
      { nama: "Domain", keterangan: "igiligil.xyz", rupiah: 12_000 },
      { nama: "Penilaian AI Praktikum", keterangan: "1 panggilan per penyerahan Praktikum", rupiah: 38_000 },
    ],
    plafonFounder: 2_200_000,
    penyaluran: {
      tanggal: "31 Oktober 2026",
      penerima: { FASE_A: 30, FASE_B: 30, FASE_C: 25 },
      disalurkan: { FASE_A: 17_000_000, FASE_B: 14_166_667, FASE_C: 11_333_333 },
      rujukanBatch: "BEASISWA-IGIL-2026-10",
    },
    bukti: [
      { label: "Bab terbit", nilai: "5 bab", catatan: "Matematika Kelas 1 bab 1–5" },
      { label: "Siswa aktif", nilai: "450 siswa", catatan: "Belajar minimal sekali dalam 30 hari" },
      { label: "Panggilan AI saat siswa belajar", nilai: "0 kali", catatan: "Materi, Latihan, dan Ujian tanpa AI" },
      { label: "Uji lisan 2 menit", nilai: "96 panggilan", catatan: "85 anak lolos, 11 tidak lolos" },
      { label: "Rekaman panggilan", nilai: "0 berkas", catatan: "Panggilan tidak direkam" },
    ],
  },
  {
    id: "2026-09",
    label: "September 2026",
    status: "ditutup",
    keteranganPeriode: "Ditutup 30 September 2026 pukul 23:59 WIB",
    pemasukan: { FASE_A: 11_000_000, FASE_B: 9_000_000, FASE_C: 7_000_000 },
    pelangganAktif: { FASE_A: 110, FASE_B: 90, FASE_C: 70 },
    biayaServer: [
      { nama: "Hosting & jaringan", keterangan: "Menyajikan halaman dan berkas bab", rupiah: 120_000 },
      { nama: "Database & akun", keterangan: "Menyimpan progres dan Poin Kualifikasi", rupiah: 95_000 },
      { nama: "Domain", keterangan: "igiligil.xyz", rupiah: 12_000 },
      { nama: "Penilaian AI Praktikum", keterangan: "1 panggilan per penyerahan Praktikum", rupiah: 21_000 },
    ],
    plafonFounder: 2_200_000,
    penyaluran: {
      tanggal: "30 September 2026",
      penerima: { FASE_A: 20, FASE_B: 18, FASE_C: 15 },
      disalurkan: { FASE_A: 10_002_667, FASE_B: 8_184_000, FASE_C: 6_365_333 },
      rujukanBatch: "BEASISWA-IGIL-2026-09",
    },
    bukti: [
      { label: "Bab terbit", nilai: "4 bab", catatan: "Matematika Kelas 1 bab 1–4" },
      { label: "Siswa aktif", nilai: "270 siswa", catatan: "Belajar minimal sekali dalam 30 hari" },
      { label: "Panggilan AI saat siswa belajar", nilai: "0 kali", catatan: "Materi, Latihan, dan Ujian tanpa AI" },
      { label: "Uji lisan 2 menit", nilai: "61 panggilan", catatan: "53 anak lolos, 8 tidak lolos" },
      { label: "Rekaman panggilan", nilai: "0 berkas", catatan: "Panggilan tidak direkam" },
    ],
  },
];

/** Membagi `total` rupiah menurut bobot tanpa sisa pembulatan (metode sisa terbesar). */
export function bagiProporsional(total: number, bobot: number[]): number[] {
  const jumlahBobot = bobot.reduce((a, b) => a + b, 0);
  if (jumlahBobot <= 0) return bobot.map(() => 0);
  const kasar = bobot.map((b) => (total * b) / jumlahBobot);
  const hasil = kasar.map(Math.floor);
  let sisa = total - hasil.reduce((a, b) => a + b, 0);
  const urutan = kasar
    .map((v, i) => ({ i, pecahan: v - Math.floor(v) }))
    .sort((x, y) => y.pecahan - x.pecahan);
  for (const { i } of urutan) {
    if (sisa <= 0) break;
    hasil[i] += 1;
    sisa -= 1;
  }
  return hasil;
}

export type PerFase<T> = Record<KodePhase, T>;

export type HasilLaporan = {
  masukan: MasukanBulan;
  totalPemasukan: number;
  beasiswa90: number;
  operasional10: number;
  totalBiayaServer: number;
  /** Biaya hidup layak founder yang diambil, tidak pernah melebihi plafon. */
  plafonDiambil: number;
  surplus: number;
  /** Bagian 90% tiap fase (= pemasukan fase × 90%). */
  kantong90: PerFase<number>;
  /** Limpahan surplus per fase, proporsional jumlah pelanggan aktif. */
  limpahan: PerFase<number>;
  kantongAkhir: PerFase<number>;
  totalKantongAkhir: number;
  penyaluran: null | {
    tanggal: string;
    rujukanBatch: string;
    penerima: PerFase<number>;
    disalurkan: PerFase<number>;
    sisaBawaBulanDepan: PerFase<number>;
    totalDisalurkan: number;
    totalPenerima: number;
    totalSisa: number;
  };
  cekHitung: { label: string; cocok: boolean; rumus: string }[];
};

export function hitungLaporan(m: MasukanBulan): HasilLaporan {
  const totalPemasukan = URUTAN_FASE.reduce((n, f) => n + m.pemasukan[f], 0);
  const beasiswa90 = Math.round(totalPemasukan * 0.9);
  const operasional10 = totalPemasukan - beasiswa90;
  const totalBiayaServer = m.biayaServer.reduce((n, b) => n + b.rupiah, 0);

  const tersedia = Math.max(0, operasional10 - totalBiayaServer);
  const tutup = m.status === "ditutup";
  const plafonDiambil = tutup ? Math.min(m.plafonFounder, tersedia) : 0;
  const surplus = tutup ? tersedia - plafonDiambil : 0;

  const kantong90 = {} as PerFase<number>;
  const bagian90 = bagiProporsional(
    beasiswa90,
    URUTAN_FASE.map((f) => m.pemasukan[f]),
  );
  URUTAN_FASE.forEach((f, i) => {
    kantong90[f] = bagian90[i];
  });

  const limpahan = {} as PerFase<number>;
  const bagianSurplus = bagiProporsional(
    surplus,
    URUTAN_FASE.map((f) => m.pelangganAktif[f]),
  );
  URUTAN_FASE.forEach((f, i) => {
    limpahan[f] = bagianSurplus[i];
  });

  const kantongAkhir = {} as PerFase<number>;
  for (const f of URUTAN_FASE) kantongAkhir[f] = kantong90[f] + limpahan[f];
  const totalKantongAkhir = URUTAN_FASE.reduce((n, f) => n + kantongAkhir[f], 0);

  let penyaluran: HasilLaporan["penyaluran"] = null;
  if (m.penyaluran) {
    const sisa = {} as PerFase<number>;
    for (const f of URUTAN_FASE) sisa[f] = kantongAkhir[f] - m.penyaluran.disalurkan[f];
    penyaluran = {
      tanggal: m.penyaluran.tanggal,
      rujukanBatch: m.penyaluran.rujukanBatch,
      penerima: m.penyaluran.penerima,
      disalurkan: m.penyaluran.disalurkan,
      sisaBawaBulanDepan: sisa,
      totalDisalurkan: URUTAN_FASE.reduce((n, f) => n + m.penyaluran!.disalurkan[f], 0),
      totalPenerima: URUTAN_FASE.reduce((n, f) => n + m.penyaluran!.penerima[f], 0),
      totalSisa: URUTAN_FASE.reduce((n, f) => n + sisa[f], 0),
    };
  }

  const cekHitung: HasilLaporan["cekHitung"] = [
    {
      label: "90% + 10% sama dengan seluruh pemasukan",
      cocok: beasiswa90 + operasional10 === totalPemasukan,
      rumus: "Kantong Beasiswa + Kolam Operasional = Pemasukan Langganan",
    },
  ];
  if (tutup) {
    cekHitung.push(
      {
        label: "Pemakaian Kolam Operasional habis terbagi",
        cocok: totalBiayaServer + plafonDiambil + surplus === operasional10 || tersedia === 0,
        rumus: "Biaya server + biaya hidup founder + surplus = Kolam Operasional",
      },
      {
        label: "Biaya hidup founder tidak melewati plafon",
        cocok: plafonDiambil <= m.plafonFounder,
        rumus: "Biaya hidup founder ≤ plafon bulanan",
      },
      {
        label: "Seluruh kantong fase = 90% + surplus",
        cocok: totalKantongAkhir === beasiswa90 + surplus,
        rumus: "Kantong A + B + C = 90% + surplus yang dilimpahkan",
      },
    );
    if (penyaluran) {
      cekHitung.push({
        label: "Dana disalurkan + sisa sama dengan kantong",
        cocok: penyaluran.totalDisalurkan + penyaluran.totalSisa === totalKantongAkhir,
        rumus: "Disalurkan + sisa bawa ke bulan depan = Kantong akhir",
      });
    }
  }

  return {
    masukan: m,
    totalPemasukan,
    beasiswa90,
    operasional10,
    totalBiayaServer,
    plafonDiambil,
    surplus,
    kantong90,
    limpahan,
    kantongAkhir,
    totalKantongAkhir,
    penyaluran,
    cekHitung,
  };
}

/** Isi berkas CSV laporan satu bulan, dibuat sepenuhnya di perangkat. */
export function buatCsvLaporan(h: HasilLaporan): string {
  const baris: (string | number)[][] = [
    ["Laporan transparansi IGIL", h.masukan.label, h.masukan.status],
    [],
    ["Bagian", "Rincian", "Rupiah"],
    ["Pemasukan", "Total langganan", h.totalPemasukan],
  ];
  for (const f of URUTAN_FASE) baris.push(["Pemasukan", NAMA_FASE[f].kelas, h.masukan.pemasukan[f]]);
  baris.push(["Pembagian", "Kantong Beasiswa 90%", h.beasiswa90], ["Pembagian", "Kolam Operasional 10%", h.operasional10]);
  for (const b of h.masukan.biayaServer) baris.push(["Biaya server", b.nama, b.rupiah]);
  baris.push(
    ["Operasional", "Total biaya server", h.totalBiayaServer],
    ["Operasional", "Biaya hidup layak founder (plafon " + h.masukan.plafonFounder + ")", h.plafonDiambil],
    ["Operasional", "Surplus dilimpahkan ke beasiswa", h.surplus],
  );
  for (const f of URUTAN_FASE) {
    baris.push(["Kantong akhir", NAMA_FASE[f].kelas, h.kantongAkhir[f]]);
  }
  if (h.penyaluran) {
    for (const f of URUTAN_FASE) {
      baris.push(["Disalurkan", NAMA_FASE[f].kelas + " (" + h.penyaluran.penerima[f] + " penerima)", h.penyaluran.disalurkan[f]]);
    }
    baris.push(["Disalurkan", "Sisa bawa ke bulan depan", h.penyaluran.totalSisa]);
  }
  const esc = (v: string | number) => {
    const s = String(v);
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  return baris.map((r) => r.map(esc).join(",")).join("\r\n");
}
