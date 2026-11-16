import { buatAcak } from "./acak";
import type { SpesifikasiSoal } from "./tipe";

/** Pengulangan berjarak (kotak Leitner sederhana) + pencampuran (interleaving) antarjenis soal. */
export const INTERVAL_HARI = [1, 3, 7, 14, 30];

export type KartuUlang = { gen: string; kotak: number; jatuhTempo: string; terakhir: string };

const HARI = 24 * 60 * 60 * 1000;

export function perbaruiKartu(kartu: KartuUlang[], gen: string, benar: boolean, sekarang: Date): KartuUlang[] {
  const lama = kartu.find((k) => k.gen === gen);
  const kotak = benar ? Math.min((lama?.kotak ?? -1) + 1, INTERVAL_HARI.length - 1) : 0;
  const baru: KartuUlang = {
    gen,
    kotak,
    terakhir: sekarang.toISOString(),
    jatuhTempo: new Date(sekarang.getTime() + INTERVAL_HARI[kotak] * HARI).toISOString(),
  };
  return [...kartu.filter((k) => k.gen !== gen), baru];
}

export function kartuJatuhTempo(kartu: KartuUlang[], sekarang: Date): KartuUlang[] {
  return kartu.filter((k) => new Date(k.jatuhTempo).getTime() <= sekarang.getTime());
}

/** Memilih spesifikasi soal untuk ulangan: kartu yang jatuh tempo lebih dulu, lalu dicampur acak. */
export function susunUlangan(kartu: KartuUlang[], bank: SpesifikasiSoal[], sekarang: Date, jumlah: number, benih: number): SpesifikasiSoal[] {
  const r = buatAcak(benih);
  const tempo = new Set(kartuJatuhTempo(kartu, sekarang).map((k) => k.gen));
  const prioritas = r.kocok(bank.filter((s) => tempo.has(s.gen)));
  const lain = r.kocok(bank.filter((s) => !tempo.has(s.gen)));
  const gen = new Set<string>();
  const hasil: SpesifikasiSoal[] = [];
  for (const s of [...prioritas, ...lain]) {
    if (hasil.length >= jumlah) break;
    if (gen.has(s.gen)) continue; // satu soal per jenis, agar tercampur
    gen.add(s.gen);
    hasil.push(s);
  }
  return r.kocok(hasil);
}
