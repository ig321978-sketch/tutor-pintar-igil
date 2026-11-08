/**
 * Odometer Bilangan (Bab 5): simulasi mesin keadaan. Keadaan mesin adalah pasangan roda (puluhan, satuan),
 * bilangan 0 sampai 20. Roda satuan yang penuh (9) lalu naik: sepuluh satuan diikat menjadi satu puluhan dan
 * satuan kembali 0 (bawa). Roda satuan 0 lalu turun: satu puluhan dibuka menjadi sepuluh satuan (pinjam).
 * Mesin menolak langkah di luar 0 sampai 20 dan menyebutkan alasannya.
 *
 * Murni dan deterministik: tanpa React, tanpa jaringan. Diuji di scripts/uji-lab-kelas1.mjs.
 */

export const ODO_MAKS = 20;

export type MisiOdo = { awal: number; tujuan: number };

export const MISI_ODO: MisiOdo[] = [
  { awal: 7, tujuan: 13 },
  { awal: 13, tujuan: 8 },
  { awal: 8, tujuan: 20 },
];

export type Odo = {
  misi: number;
  n: number;
  tiba: boolean;
  selesai: boolean;
  langkah: number;
  riwayat: string[];
  /** Penolakan mesin. */
  pesan: string;
  /** Keterangan bawa atau pinjam. Bukan penolakan. */
  info: string;
  ditolak: number;
};

export type PeristiwaOdo = { t: "SATUAN"; d: 1 | -1 } | { t: "PULUHAN"; d: 1 | -1 } | { t: "LANJUT" } | { t: "ULANG" };

export const uraiOdo = (n: number) => ({ p: Math.floor(n / 10), s: n % 10 });

export const awalOdo = (misi = 0): Odo => ({ misi, n: MISI_ODO[misi].awal, tiba: false, selesai: false, langkah: 0, riwayat: [], pesan: "", info: "", ditolak: 0 });

const tolak = (o: Odo, pesan: string): Odo => ({ ...o, pesan, info: "", ditolak: o.ditolak + 1 });

function gerak(o: Odo, ke: number, nama: string, info: string): Odo {
  return {
    ...o,
    n: ke,
    tiba: ke === MISI_ODO[o.misi].tujuan,
    langkah: o.langkah + 1,
    riwayat: [...o.riwayat, `${nama}: ${o.n} → ${ke}`].slice(-8),
    pesan: "",
    info,
  };
}

export function langkahOdo(o: Odo, e: PeristiwaOdo): Odo {
  switch (e.t) {
    case "SATUAN": {
      if (o.selesai) return tolak(o, "Semua misi sudah selesai. Tekan Main lagi.");
      if (o.tiba) return tolak(o, "Mesin sudah tiba di angka tujuan. Tekan Misi berikutnya.");
      const { s } = uraiOdo(o.n);
      if (e.d > 0) {
        if (o.n >= ODO_MAKS) return tolak(o, `Angka paling besar di bab ini ${ODO_MAKS}. Roda tidak bisa naik lagi.`);
        const info = s === 9 ? "Satuan sudah 9. Sepuluh satuan diikat menjadi 1 puluhan, satuan kembali 0." : "";
        return gerak(o, o.n + 1, "Satuan naik", info);
      }
      if (o.n <= 0) return tolak(o, "Angka paling kecil adalah 0. Roda tidak bisa turun lagi.");
      const info = s === 0 ? "Satuan 0 tidak bisa dikurangi. 1 puluhan dibuka menjadi 10 satuan, lalu satuan turun menjadi 9." : "";
      return gerak(o, o.n - 1, "Satuan turun", info);
    }
    case "PULUHAN": {
      if (o.selesai) return tolak(o, "Semua misi sudah selesai. Tekan Main lagi.");
      if (o.tiba) return tolak(o, "Mesin sudah tiba di angka tujuan. Tekan Misi berikutnya.");
      if (e.d > 0) {
        if (o.n + 10 > ODO_MAKS) return tolak(o, `Puluhan naik berarti bilangan bertambah 10. ${o.n} + 10 melebihi ${ODO_MAKS}.`);
        return gerak(o, o.n + 10, "Puluhan naik", "");
      }
      if (o.n < 10) return tolak(o, "Puluhan sudah 0. Tidak ada puluhan yang bisa diturunkan.");
      return gerak(o, o.n - 10, "Puluhan turun", "");
    }
    case "LANJUT": {
      if (!o.tiba) return tolak(o, "Mesin belum tiba di angka tujuan.");
      if (o.misi + 1 >= MISI_ODO.length) return { ...o, selesai: true, tiba: false, pesan: "", info: "" };
      const baru = awalOdo(o.misi + 1);
      return { ...baru, ditolak: o.ditolak, langkah: o.langkah };
    }
    case "ULANG":
      return o.selesai ? awalOdo(0) : tolak(o, "Selesaikan dulu semua misi.");
  }
}

export function petunjukOdo(o: Odo): string {
  const m = MISI_ODO[o.misi];
  if (o.n === m.tujuan) return `Mesin tiba di angka ${m.tujuan}.`;
  return o.n < m.tujuan ? `Putar mesin sampai angka ${m.tujuan}. Angkanya harus bertambah.` : `Putar mesin sampai angka ${m.tujuan}. Angkanya harus berkurang.`;
}
