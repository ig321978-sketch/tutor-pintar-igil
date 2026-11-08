/**
 * Katak Maju Mundur (Bab 1): simulasi mesin keadaan. Keadaan mesin adalah batu tempat katak berdiri
 * (0 sampai 10). Perpindahan: MAJU atau MUNDUR 1 atau 2 batu. Mesin menolak langkah yang keluar
 * dari sungai dan menyebutkan alasannya. Tiga misi berurutan; tiap misi harus tiba tepat di batu tujuan.
 *
 * Murni dan deterministik: tanpa React, tanpa jaringan. Diuji di scripts/uji-lab-kelas1.mjs.
 */

export const BATU_MAKS = 10;

export type Misi = { awal: number; tujuan: number };

export const MISI: Misi[] = [
  { awal: 3, tujuan: 7 },
  { awal: 7, tujuan: 2 },
  { awal: 2, tujuan: 9 },
];

export type Katak = {
  misi: number;
  pos: number;
  /** Katak sudah di batu tujuan dan menunggu misi berikutnya. */
  tiba: boolean;
  selesai: boolean;
  langkah: number;
  riwayat: string[];
  pesan: string;
  ditolak: number;
};

export type PeristiwaKatak = { t: "MAJU"; n: 1 | 2 } | { t: "MUNDUR"; n: 1 | 2 } | { t: "LANJUT" } | { t: "ULANG" };

export const awalKatak = (misi = 0): Katak => ({
  misi,
  pos: MISI[misi].awal,
  tiba: false,
  selesai: false,
  langkah: 0,
  riwayat: [],
  pesan: "",
  ditolak: 0,
});

const tolak = (k: Katak, pesan: string): Katak => ({ ...k, pesan, ditolak: k.ditolak + 1 });

function gerak(k: Katak, ke: number, nama: string): Katak {
  const riwayat = [...k.riwayat, `${nama}: ${k.pos} → ${ke}`].slice(-8);
  const tiba = ke === MISI[k.misi].tujuan;
  return { ...k, pos: ke, tiba, langkah: k.langkah + 1, riwayat, pesan: "" };
}

export function langkahKatak(k: Katak, p: PeristiwaKatak): Katak {
  switch (p.t) {
    case "MAJU": {
      if (k.selesai) return tolak(k, "Semua misi sudah selesai. Tekan Main lagi.");
      if (k.tiba) return tolak(k, "Katak sudah tiba di tujuan. Tekan Misi berikutnya.");
      const ke = k.pos + p.n;
      if (ke > BATU_MAKS) return tolak(k, `Batu paling ujung adalah ${BATU_MAKS}. Katak tidak bisa maju ${p.n} dari batu ${k.pos}.`);
      return gerak(k, ke, `Maju ${p.n}`);
    }
    case "MUNDUR": {
      if (k.selesai) return tolak(k, "Semua misi sudah selesai. Tekan Main lagi.");
      if (k.tiba) return tolak(k, "Katak sudah tiba di tujuan. Tekan Misi berikutnya.");
      const ke = k.pos - p.n;
      if (ke < 0) return tolak(k, `Batu paling awal adalah 0. Katak tidak bisa mundur ${p.n} dari batu ${k.pos}.`);
      return gerak(k, ke, `Mundur ${p.n}`);
    }
    case "LANJUT": {
      if (!k.tiba) return tolak(k, "Katak belum tiba di batu tujuan.");
      if (k.misi + 1 >= MISI.length) return { ...k, selesai: true, tiba: false, pesan: "" };
      const baru = awalKatak(k.misi + 1);
      return { ...baru, ditolak: k.ditolak, langkah: k.langkah };
    }
    case "ULANG":
      return k.selesai ? awalKatak(0) : tolak(k, "Selesaikan dulu semua misi.");
  }
}

/** Kalimat arah ke tujuan untuk petunjuk misi. */
export function petunjukMisi(k: Katak): string {
  const m = MISI[k.misi];
  if (k.pos === m.tujuan) return `Katak tiba di batu ${m.tujuan}.`;
  return k.pos < m.tujuan ? `Katak harus maju ke batu ${m.tujuan}.` : `Katak harus mundur ke batu ${m.tujuan}.`;
}
