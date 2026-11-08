/**
 * Bus Sekolah (Bab 3): simulasi mesin keadaan. Keadaan bus: sedang di halte ke-h dengan isi tertentu.
 * Di tiap halte, penumpang turun dulu, baru yang lain naik, baru bus berangkat. Mesin menolak langkah yang
 * melanggar urutan, melebihi tugas halte, mengeluarkan penumpang dari bus kosong, atau menaikkan penumpang
 * ke bus penuh, dan menyebutkan alasannya.
 *
 * Murni dan deterministik: tanpa React, tanpa jaringan. Diuji di scripts/uji-lab-kelas1.mjs.
 */

export const KAPASITAS_BUS = 10;

export type Halte = { nama: string; turun: number; naik: number };
export type Rute = { nama: string; awal: number; halte: Halte[] };

export const RUTE: Rute[] = [
  {
    nama: "Rute Sekolah",
    awal: 9,
    halte: [
      { nama: "Pasar", turun: 4, naik: 0 },
      { nama: "Sekolah", turun: 0, naik: 3 },
      { nama: "Taman", turun: 6, naik: 0 },
    ],
  },
  {
    nama: "Rute Kota",
    awal: 7,
    halte: [
      { nama: "Masjid", turun: 2, naik: 0 },
      { nama: "Kantor", turun: 3, naik: 2 },
      { nama: "Stasiun", turun: 4, naik: 0 },
    ],
  },
];

export type Bus = {
  ronde: number;
  /** Nomor halte sekarang. Sama dengan banyak halte berarti rute selesai. */
  h: number;
  isi: number;
  isiMasuk: number;
  turunSisa: number;
  naikSisa: number;
  selesai: boolean;
  riwayat: string[];
  pesan: string;
  ditolak: number;
};

export type PeristiwaBus = { t: "TURUN" } | { t: "NAIK" } | { t: "BERANGKAT" } | { t: "ULANG" };

export const ruteRonde = (ronde: number) => RUTE[((ronde % RUTE.length) + RUTE.length) % RUTE.length];

export function awalBus(ronde = 0): Bus {
  const r = ruteRonde(ronde);
  return {
    ronde,
    h: 0,
    isi: r.awal,
    isiMasuk: r.awal,
    turunSisa: r.halte[0].turun,
    naikSisa: r.halte[0].naik,
    selesai: false,
    riwayat: [],
    pesan: "",
    ditolak: 0,
  };
}

const tolak = (b: Bus, pesan: string): Bus => ({ ...b, pesan, ditolak: b.ditolak + 1 });

/** Tugas halte sekarang sudah selesai dan bus boleh berangkat. */
export const bolehBerangkat = (b: Bus) => !b.selesai && b.turunSisa === 0 && b.naikSisa === 0;

export function langkahBus(b: Bus, e: PeristiwaBus): Bus {
  const r = ruteRonde(b.ronde);
  const halte = r.halte[b.h];
  switch (e.t) {
    case "TURUN": {
      if (b.selesai) return tolak(b, "Rute sudah selesai. Tekan Main lagi.");
      if (b.isi <= 0) return tolak(b, "Bus sudah kosong. Tidak ada lagi yang bisa turun.");
      if (b.turunSisa <= 0) return tolak(b, `Di halte ${halte.nama} tidak ada lagi yang turun.`);
      return { ...b, isi: b.isi - 1, turunSisa: b.turunSisa - 1, pesan: "" };
    }
    case "NAIK": {
      if (b.selesai) return tolak(b, "Rute sudah selesai. Tekan Main lagi.");
      if (b.turunSisa > 0) return tolak(b, "Biarkan penumpang turun dulu, baru yang lain naik.");
      if (b.naikSisa <= 0) return tolak(b, `Di halte ${halte.nama} tidak ada lagi yang naik.`);
      if (b.isi >= KAPASITAS_BUS) return tolak(b, `Bus penuh. Kursinya hanya ${KAPASITAS_BUS}.`);
      return { ...b, isi: b.isi + 1, naikSisa: b.naikSisa - 1, pesan: "" };
    }
    case "BERANGKAT": {
      if (b.selesai) return tolak(b, "Rute sudah selesai. Tekan Main lagi.");
      if (b.turunSisa > 0) return tolak(b, `Masih ada ${b.turunSisa} anak yang harus turun di halte ${halte.nama}.`);
      if (b.naikSisa > 0) return tolak(b, `Masih ada ${b.naikSisa} anak yang harus naik di halte ${halte.nama}.`);
      const catatan = `${halte.nama}: ${b.isiMasuk}${halte.turun ? ` − ${halte.turun}` : ""}${halte.naik ? ` + ${halte.naik}` : ""} = ${b.isi}`;
      const riwayat = [...b.riwayat, catatan].slice(-8);
      const berikut = b.h + 1;
      if (berikut >= r.halte.length) return { ...b, h: berikut, selesai: true, riwayat, pesan: "", turunSisa: 0, naikSisa: 0 };
      const hb = r.halte[berikut];
      return { ...b, h: berikut, isiMasuk: b.isi, turunSisa: hb.turun, naikSisa: hb.naik, riwayat, pesan: "" };
    }
    case "ULANG":
      if (!b.selesai) return tolak(b, "Selesaikan dulu rute ini.");
      return awalBus(b.ronde + 1);
  }
}

/** Kalimat tugas di halte sekarang. */
export function tugasHalte(b: Bus): string {
  const r = ruteRonde(b.ronde);
  if (b.selesai) return `Bus tiba di terminal dengan ${b.isi} penumpang.`;
  const h = r.halte[b.h];
  const bagian: string[] = [];
  if (h.turun) bagian.push(`${h.turun} anak turun`);
  if (h.naik) bagian.push(`${h.naik} anak naik`);
  return `Halte ${h.nama}: ${bagian.join(", lalu ")}.`;
}
