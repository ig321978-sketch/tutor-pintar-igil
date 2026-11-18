/**
 * Rapor Perkembangan Siswa (logika murni: tanpa React, tanpa jaringan). Diuji: scripts/uji-rapor-perkembangan.mjs.
 *
 * Menyusun bukti perkembangan nalar anak dari catatan yang SUDAH ada di perangkat:
 *  - capaian (src/lib/capaian.ts): Sub-Bab, Latihan (benar/salah, level, lama menjawab), Ujian (riwayat, stopwatch);
 *  - jejak tahap SMISCPA (src/lib/jejak-tahap.ts): tahap tertinggi yang terbuka di tiap Sub-Bab.
 *
 * Aturan yang dijaga:
 *  - Diagnosis tidak pernah membocorkan soal: hanya menunjuk Sub-Bab dan kartu tahap yang perlu diulang.
 *  - Tidak ada peringkat palsu: posisi di fase dihitung dari ketuntasan bab kelasnya sendiri.
 *  - Angka yang belum tercatat ditampilkan sebagai "belum tercatat", bukan ditebak.
 */
// Hanya impor tipe, supaya berkas ini bisa diuji langsung di Node tanpa bundler.
import type { CapaianBab, GudangCapaian, LevelSoal, PercobaanUjian } from "./capaian";
import type { JejakBab } from "./jejak-tahap";

/** Urutan 7 tahap Materi untuk tampilan rapor: 1 = Story ... 7 = Abstract. */
export const NAMA_TAHAP = ["Story", "Mind-map", "Infografis", "Simulasi", "Concrete", "Pictorial", "Abstract"] as const;
export const JUMLAH_TAHAP = NAMA_TAHAP.length;
export const NOMOR_TAHAP_SIMULASI = 4;
/** Banyak soal satu lembar Ujian (diundi server). */
export const JUMLAH_SOAL_UJIAN = 10;

/**
 * Nomor di jejak tahap (src/lib/jejak-tahap.ts) BERBEDA dengan urutan tampilan: Simulasi (3,5 di pemutar)
 * tidak punya nomor sendiri. Jejak: 1 Story, 2 Mind-map, 3 Infografis (Simulasi menyusul), 4 Concrete,
 * 5 Pictorial, 6 Abstract, 7 Sub-Bab selesai. Concrete baru terbuka setelah Simulasi selesai.
 */
export function tahapDariJejak(nomorJejak: number): number {
  const n = Math.min(7, Math.max(1, Math.round(nomorJejak)));
  return n <= 3 ? n : Math.min(JUMLAH_TAHAP, n + 1);
}

export const namaTahap = (nomor: number): string => NAMA_TAHAP[Math.min(JUMLAH_TAHAP, Math.max(1, nomor)) - 1];

/* ------------------------------ 1. Status penguasaan dan jejak SMISCPA ------------------------------ */

export type StatusBab = "lulus" | "mengulang" | "belajar" | "belum";

export const LABEL_STATUS: Record<StatusBab, string> = {
  lulus: "Lulus Tuntas",
  mengulang: "Mengulang",
  belajar: "Sedang Dipelajari",
  belum: "Belum Ditempuh",
};

export function statusBab(c: CapaianBab | undefined, jejak: JejakBab | undefined, lulus: boolean): StatusBab {
  if (lulus) return "lulus";
  if ((c?.ujian.percobaan ?? 0) > 0) return "mengulang";
  const adaJejak = jejak ? jejak.subSelesai.length > 0 || Object.values(jejak.tahap).some((n) => n > 1) : false;
  if ((c?.subBab.length ?? 0) > 0 || (c?.latihan.length ?? 0) > 0 || adaJejak) return "belajar";
  return "belum";
}

export type JejakSubBab = {
  huruf: string;
  /** Tahap tertinggi yang sudah terbuka, dalam urutan tampilan 7 tahap (1 Story sampai 7 Abstract). */
  tahapTerbuka: number;
  selesai: boolean;
  /** Simulasi sudah dijelajahi: Concrete terbuka, dan Concrete hanya terbuka setelah Simulasi selesai. */
  simulasiDibuka: boolean;
};

/** Jejak SMISCPA per Sub-Bab. Sub-Bab yang diketahui: dari jumlah resmi, jejak, dan catatan Sub-Bab selesai. */
export function jejakSmiscpa(c: CapaianBab | undefined, jejak: JejakBab | undefined, totalSubBab = 0): JejakSubBab[] {
  const huruf = new Set<string>([...(c?.subBab ?? []), ...(jejak?.subSelesai ?? []), ...Object.keys(jejak?.tahap ?? {})]);
  for (let i = 0; i < totalSubBab; i++) huruf.add("ABCDEFGHIJ"[i]);
  return [...huruf]
    .filter((h) => /^[A-Z]$/.test(h))
    .sort()
    .map((h) => {
      const selesai = Boolean(c?.subBab.includes(h) || jejak?.subSelesai.includes(h));
      const tahapTerbuka = selesai ? JUMLAH_TAHAP : tahapDariJejak(jejak?.tahap[h] ?? 1);
      return { huruf: h, tahapTerbuka, selesai, simulasiDibuka: tahapTerbuka > NOMOR_TAHAP_SIMULASI };
    });
}

/** Persen tahap SMISCPA yang sudah dijelajahi di seluruh Sub-Bab (tahap yang terbuka dihitung sudah dijelajah). */
export function persenEksplorasi(sub: readonly JejakSubBab[]): number {
  if (sub.length === 0) return 0;
  const jelajah = sub.reduce((n, s) => n + (s.selesai ? JUMLAH_TAHAP : s.tahapTerbuka - 1), 0);
  return Math.round((jelajah / (sub.length * JUMLAH_TAHAP)) * 100);
}

/* ------------------------------ 2. Telemetri Latihan dan Ujian ------------------------------ */

export type Kecepatan = "terburu" | "matang" | "teliti" | "belum";

export const LABEL_KECEPATAN: Record<Kecepatan, string> = {
  terburu: "Terlalu cepat, mungkin menebak",
  matang: "Matang dan lancar",
  teliti: "Teliti, perlu lebih lancar",
  belum: "Belum tercatat",
};

/** Batas detik per soal. Di bawah batas cepat = terlalu cepat untuk soal bernalar; di atas batas lambat = belum lancar. */
export const DETIK_CEPAT = 15;
export const DETIK_LAMBAT = 150;

export function kategoriKecepatan(detikPerSoal: number | null): Kecepatan {
  if (detikPerSoal === null) return "belum";
  if (detikPerSoal < DETIK_CEPAT) return "terburu";
  if (detikPerSoal > DETIK_LAMBAT) return "teliti";
  return "matang";
}

export type Tren = "naik" | "turun" | "stabil" | "satu" | "belum";

export function trenNilai(riwayat: readonly PercobaanUjian[]): Tren {
  if (riwayat.length === 0) return "belum";
  if (riwayat.length === 1) return "satu";
  const akhir = riwayat[riwayat.length - 1].nilai;
  const sebelum = riwayat[riwayat.length - 2].nilai;
  if (akhir - sebelum >= 10) return "naik";
  if (sebelum - akhir >= 10) return "turun";
  return "stabil";
}

function median(angka: readonly number[]): number | null {
  if (angka.length === 0) return null;
  const urut = [...angka].sort((a, b) => a - b);
  const t = Math.floor(urut.length / 2);
  return urut.length % 2 ? urut[t] : Math.round((urut[t - 1] + urut[t]) / 2);
}

export type Telemetri = {
  latihanTerjawab: number;
  latihanBenar: number;
  /** Median detik per soal Latihan (median supaya jeda istirahat tidak merusak angka). */
  detikLatihan: number | null;
  percobaanUjian: number;
  skorTerbaik: number | null;
  riwayat: PercobaanUjian[];
  /** Rata-rata detik per soal Ujian dari percobaan yang tercatat stopwatch-nya. */
  detikUjianPerSoal: number | null;
  kecepatan: Kecepatan;
  tren: Tren;
};

export function telemetriBab(c: CapaianBab | undefined): Telemetri {
  const latihan = c?.latihan ?? [];
  const riwayat = c?.ujian.riwayat ?? [];
  const detikLatihan = median(latihan.flatMap((j) => (j.detik !== undefined ? [j.detik] : [])));
  const lembarBerwaktu = riwayat.flatMap((p) => (p.detik !== undefined ? [p.detik] : []));
  const detikUjianPerSoal = lembarBerwaktu.length
    ? Math.round(lembarBerwaktu.reduce((a, b) => a + b, 0) / lembarBerwaktu.length / JUMLAH_SOAL_UJIAN)
    : null;
  return {
    latihanTerjawab: latihan.length,
    latihanBenar: latihan.filter((j) => j.benar).length,
    detikLatihan,
    percobaanUjian: c?.ujian.percobaan ?? 0,
    skorTerbaik: c?.ujian.terbaik ?? null,
    riwayat: [...riwayat],
    detikUjianPerSoal,
    kecepatan: kategoriKecepatan(detikUjianPerSoal ?? detikLatihan),
    tren: trenNilai(riwayat),
  };
}

/* ------------------------------ Diagnosis kelemahan konsep ------------------------------ */

/** Level soal Latihan yang salah menunjuk kartu tahap yang melatih kemampuan itu. */
export const TAHAP_UNTUK_LEVEL: Record<LevelSoal, number> = { LOTS: 5, MOTS: 6, HOTS: 7 };

export type SaranUlang = { subBab: string | null; tahap: number; alasan: string };

/**
 * Kartu tahap yang perlu dipelajari ulang. Kosong bila bab sudah lulus.
 * Urutan: Sub-Bab yang tahapnya belum tuntas, lalu level Latihan yang paling banyak salah.
 */
export function diagnosisBab(c: CapaianBab | undefined, sub: readonly JejakSubBab[], lulus: boolean): SaranUlang[] {
  if (lulus) return [];
  const saran: SaranUlang[] = [];
  for (const s of sub) {
    if (s.selesai) continue;
    saran.push({ subBab: s.huruf, tahap: s.tahapTerbuka, alasan: `Tahap ${namaTahap(s.tahapTerbuka)} di Sub-Bab ${s.huruf} belum dituntaskan.` });
  }
  const salah: Record<LevelSoal, number> = { LOTS: 0, MOTS: 0, HOTS: 0 };
  for (const j of c?.latihan ?? []) if (!j.benar && j.level) salah[j.level] += 1;
  const levelLemah = (Object.keys(salah) as LevelSoal[]).filter((l) => salah[l] > 0).sort((a, b) => salah[b] - salah[a]);
  for (const l of levelLemah) {
    const tahap = TAHAP_UNTUK_LEVEL[l];
    if (saran.some((x) => x.subBab === null && x.tahap === tahap)) continue;
    saran.push({ subBab: null, tahap, alasan: `${salah[l]} soal Latihan ${l} belum tepat.` });
  }
  const sudahMencoba = (c?.ujian.percobaan ?? 0) > 0;
  if (saran.length === 0 && sudahMencoba) {
    saran.push({ subBab: null, tahap: 6, alasan: "Ujian belum 100%. Kuatkan lagi gambar dan langkah berpikirnya." });
    saran.push({ subBab: null, tahap: 7, alasan: "Latih menulis kalimat matematikanya sendiri." });
  }
  return saran.slice(0, 3);
}

/* ------------------------------ 3. Praktikum (penilaian tersembunyi) ------------------------------ */

export const PARAMETER_PRAKTIKUM = [
  { kode: "akurasi", nama: "Akurasi Solusi", bobot: 30, arti: "Ketepatan perhitungan dan hasil akhir pada skenario masalah." },
  { kode: "sintesis", nama: "Sintesis Lintas-Bab", bobot: 25, arti: "Menggabungkan konsep dari bab yang sudah lulus untuk satu kasus terpadu." },
  { kode: "penalaran", nama: "Penalaran & Penjelasan", bobot: 25, arti: "Keruntutan kalimat saat menjelaskan alasan cara yang dipilih." },
  { kode: "kemandirian", nama: "Indeks Kemandirian Murni", bobot: 20, arti: "Bukti jawaban dikerjakan sendiri, lolos verifikasi server." },
] as const;

/** Nilai Praktikum terbuka setelah bulan pengirimannya berakhir (pengumuman akhir bulan). */
export function praktikumTerbuka(bulanKirim: string, bulanSekarang: string): boolean {
  return bulanSekarang > bulanKirim;
}

/* ------------------------------ 5. Fase, lencana, dan panduan rumah ------------------------------ */

export type Fase = "A" | "B" | "C";
export const faseKelas = (kelas: number): Fase => (kelas <= 2 ? "A" : kelas <= 4 ? "B" : "C");

export function kelasDariTeks(teks: string): number | null {
  const m = /(\d)/.exec(teks);
  const k = m ? Number(m[1]) : NaN;
  return k >= 1 && k <= 6 ? k : null;
}

export type Lencana = { kode: "kapten-sebaya" | "penjelajah-tekun"; ikon: string; nama: string; alasan: string };

export function lencanaSiswa(opsi: { babLulus: number; babKelas: number; lulusPertama: number; percobaanTotal: number; adaAktivitas: boolean }): Lencana[] {
  const hasil: Lencana[] = [];
  const separuh = opsi.babKelas > 0 && opsi.babLulus * 2 >= opsi.babKelas;
  if (opsi.lulusPertama > 0 || separuh) {
    hasil.push({
      kode: "kapten-sebaya",
      ikon: "🧭",
      nama: "Kapten Sebaya",
      alasan: opsi.lulusPertama > 0 ? `${opsi.lulusPertama} bab lulus 100% di percobaan pertama.` : "Separuh bab kelasnya sudah tuntas.",
    });
  }
  if (opsi.adaAktivitas) {
    hasil.push({
      kode: "penjelajah-tekun",
      ikon: "🥾",
      nama: "Penjelajah Tekun",
      alasan: opsi.percobaanTotal > 1 ? `Pantang menyerah: ${opsi.percobaanTotal} kali menguji diri.` : "Rajin menjelajah tahap-tahap materi.",
    });
  }
  return hasil;
}

export type BabKelas = { kode: string; nomor: number; judul: string };
export type KeadaanBab = { bab: BabKelas; status: StatusBab; saran: SaranUlang[] };

/** Satu kalimat untuk orang tua: bab yang diulang atau ditantang bulan depan. */
export function panduanRumah(daftar: readonly KeadaanBab[], kelas: number): string {
  const ulang = daftar.find((d) => d.status === "mengulang");
  if (ulang) {
    const s = ulang.saran[0];
    const tempat = s ? `mulai dari kartu ${namaTahap(s.tahap)}${s.subBab ? ` di Sub-Bab ${s.subBab}` : ""}` : "mulai dari kartu Pictorial";
    return `Dampingi Ananda mengulang Bab ${ulang.bab.nomor} (${ulang.bab.judul}) ${tempat}, lalu biarkan ia mencoba Ujian lagi sendiri.`;
  }
  const belajar = daftar.find((d) => d.status === "belajar");
  if (belajar) {
    return `Temani Ananda menuntaskan Bab ${belajar.bab.nomor} (${belajar.bab.judul}) sampai Ujian; 15 menit sehari sudah cukup.`;
  }
  const berikut = daftar.find((d) => d.status === "belum");
  const adaLulus = daftar.some((d) => d.status === "lulus");
  if (berikut && adaLulus) {
    return `Tantang Ananda membuka Bab ${berikut.bab.nomor} (${berikut.bab.judul}) bulan depan, dan minta ia menceritakan cara berpikirnya kepada Anda.`;
  }
  if (berikut) {
    return `Mulai bersama dari Bab ${berikut.bab.nomor} (${berikut.bab.judul}): tonton Story-nya berdua, lalu biarkan Ananda mencoba sendiri.`;
  }
  if (daftar.length > 0) {
    return kelas < 6
      ? `Semua bab Kelas ${kelas} sudah tuntas: tantang Ananda mencoba bab Kelas ${kelas + 1} bulan depan.`
      : "Semua bab Kelas 6 sudah tuntas: minta Ananda mengajarkan satu bab favoritnya kepada adik atau teman.";
  }
  return "Mulai dari Ruang Belajar: pilih satu bab dan temani Ananda menonton Story-nya.";
}

/** Ringkas untuk menghitung lencana dari seluruh gudang (semua kelas yang pernah disentuh). */
export function hitungAktivitas(g: GudangCapaian): { lulusPertama: number; percobaanTotal: number; adaAktivitas: boolean } {
  const isi = Object.values(g);
  return {
    lulusPertama: isi.filter((c) => c.ujian.lulusPertama).length,
    percobaanTotal: isi.reduce((n, c) => n + c.ujian.percobaan, 0),
    adaAktivitas: isi.some((c) => c.subBab.length > 0 || c.latihan.length > 0 || c.ujian.percobaan > 0),
  };
}
