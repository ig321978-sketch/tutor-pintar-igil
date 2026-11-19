/**
 * Logika murni Simulasi Papan Pengumuman Kelas 2 Bab 7 Sub-Bab B "Pengumuman Bu Lia" (membandingkan dan mengurutkan bilangan), akhir cerita Bank Sampah Sekolah.
 * Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-papan-k2b7b.mjs. Eksplorasi bebas tanpa skor.
 * Empat alat: Tali (geser katak maju atau mundur di tali garis angka lalu periksa), Banding (pilih kata untuk dua bilangan), Urut (ketuk kartu dari yang paling kecil),
 * Kartu (pasang dua kartu angka menjadi bilangan terbesar atau terkecil).
 */
import { BANDING_PASANG, GARIS_TUGAS, KARTU_ANGKA, URUT_SET } from "./data-sim";
import { bentukKartu, kata, namaBanding, urutanBenar } from "./logika-cpa";

export type ModePapan = "garis" | "banding" | "urut" | "kartu";
export const URUT_MODE: ModePapan[] = ["garis", "banding", "urut", "kartu"];

export type KeadaanPapan = {
  alat: "papan";
  mode: ModePapan;
  /** Tali: indeks tugas, bilangan tempat katak berdiri, tugas yang sudah benar, dan apakah ada tugas mundur yang sudah benar. */
  garisIndeks: number;
  pos: number;
  garisBenar: number[];
  mundurBenar: boolean;
  /** Banding: indeks pasangan, pasangan yang sudah dijawab benar, dan apakah pasangan sama besar sudah dijawab benar. */
  bandingIndeks: number;
  bandingBenar: number[];
  tandaSama: boolean;
  /** Urut: indeks kumpulan kartu, kartu (indeks) yang sudah diketuk benar, dan kumpulan yang sudah selesai. */
  urutIndeks: number;
  urutKetuk: number[];
  urutBenar: number[];
  /** Kartu: indeks pasangan kartu, angka yang dipasang di tempat puluhan (atau kosong), dan pasangan yang sudah benar. */
  kartuIndeks: number;
  kartuPuluhan: number | null;
  kartuBenar: number[];
  /** Percobaan keliru (hanya untuk petunjuk, bukan skor). */
  salah: number;
};

export const awalPapan = (): KeadaanPapan => ({
  alat: "papan",
  mode: "garis",
  garisIndeks: 0,
  pos: GARIS_TUGAS[0].mulai,
  garisBenar: [],
  mundurBenar: false,
  bandingIndeks: 0,
  bandingBenar: [],
  tandaSama: false,
  urutIndeks: 0,
  urutKetuk: [],
  urutBenar: [],
  kartuIndeks: 0,
  kartuPuluhan: null,
  kartuBenar: [],
  salah: 0,
});
export const mulaiLagiPapan = (): KeadaanPapan => awalPapan();
export const pilihModePapan = (k: KeadaanPapan, mode: ModePapan): KeadaanPapan => ({ ...k, mode });

export type Hasil = { k: KeadaanPapan; ok: boolean; pesan: string };

/* ------------------------------ Tali ------------------------------ */
export const tugasGaris = (k: KeadaanPapan) => GARIS_TUGAS[k.garisIndeks % GARIS_TUGAS.length];
export const targetGaris = (k: KeadaanPapan): number => {
  const t = tugasGaris(k);
  return t.arah === "maju" ? t.mulai + t.langkah : t.mulai - t.langkah;
};
/** Geser katak satu bilangan ke kanan (delta satu) atau ke kiri (delta minus satu), tetap di dalam tali. */
export function geserKatak(k: KeadaanPapan, delta: 1 | -1): Hasil {
  const t = tugasGaris(k);
  const pos = Math.max(t.dari, Math.min(t.sampai, k.pos + delta));
  if (pos === k.pos) return { k, ok: false, pesan: "Katak sudah di ujung tali. Geser ke arah lain." };
  return { k: { ...k, pos }, ok: true, pesan: `Katak di ${kata(pos)}. ${delta === 1 ? "Ke kanan bilangannya lebih besar." : "Ke kiri bilangannya lebih kecil."}` };
}
export function periksaGaris(k: KeadaanPapan): Hasil {
  const t = tugasGaris(k);
  const target = targetGaris(k);
  if (k.pos === target) {
    const garisBenar = k.garisBenar.includes(k.garisIndeks % GARIS_TUGAS.length) ? k.garisBenar : [...k.garisBenar, k.garisIndeks % GARIS_TUGAS.length];
    const lanjut = (k.garisIndeks + 1) % GARIS_TUGAS.length;
    return {
      k: { ...k, garisBenar, mundurBenar: k.mundurBenar || t.arah === "mundur", garisIndeks: lanjut, pos: GARIS_TUGAS[lanjut].mulai },
      ok: true,
      pesan: `Tepat! ${kata(t.mulai)} ${t.arah === "maju" ? "maju" : "mundur"} ${kata(t.langkah)} langkah sampai ${kata(target)}. Awalnya tidak dihitung.`,
    };
  }
  return {
    k: { ...k, salah: k.salah + 1 },
    ok: false,
    pesan: `Belum tepat. Katak mulai dari ${kata(t.mulai)} dan ${t.arah === "maju" ? "maju ke kanan" : "mundur ke kiri"} ${kata(t.langkah)} langkah. Awalnya tidak dihitung.`,
  };
}

/* ------------------------------ Banding ------------------------------ */
export const pasangBanding = (k: KeadaanPapan): readonly [number, number] => BANDING_PASANG[k.bandingIndeks % BANDING_PASANG.length];
const KATA_TANDA = { besar: "lebih besar dari", kecil: "lebih kecil dari", sama: "sama dengan" } as const;
export function pilihTanda(k: KeadaanPapan, tanda: "besar" | "kecil" | "sama"): Hasil {
  const [a, b] = pasangBanding(k);
  const benar = namaBanding(a, b);
  if (tanda === benar) {
    const idx = k.bandingIndeks % BANDING_PASANG.length;
    return {
      k: { ...k, bandingBenar: k.bandingBenar.includes(idx) ? k.bandingBenar : [...k.bandingBenar, idx], tandaSama: k.tandaSama || benar === "sama", bandingIndeks: (k.bandingIndeks + 1) % BANDING_PASANG.length },
      ok: true,
      pesan: `Tepat! ${kata(a)} ${KATA_TANDA[benar]} ${kata(b)}.`,
    };
  }
  return { k: { ...k, salah: k.salah + 1 }, ok: false, pesan: "Belum tepat. Lihat puluhannya dulu. Bila puluhannya sama, lihat satuannya. Tanda terbuka ke arah bilangan yang lebih besar." };
}

/* ------------------------------ Urut ------------------------------ */
export const kumpulanUrut = (k: KeadaanPapan): readonly number[] => URUT_SET[k.urutIndeks % URUT_SET.length];
export function ketukUrut(k: KeadaanPapan, i: number): Hasil {
  const item = kumpulanUrut(k);
  if (k.urutKetuk.includes(i)) return { k, ok: false, pesan: "Kartu itu sudah di tempatnya. Ketuk kartu berikutnya." };
  const benar = urutanBenar(item);
  if (i === benar[k.urutKetuk.length]) {
    const urutKetuk = [...k.urutKetuk, i];
    if (urutKetuk.length === item.length) {
      const idx = k.urutIndeks % URUT_SET.length;
      return {
        k: { ...k, urutKetuk: [], urutBenar: k.urutBenar.includes(idx) ? k.urutBenar : [...k.urutBenar, idx], urutIndeks: (k.urutIndeks + 1) % URUT_SET.length },
        ok: true,
        pesan: `Tepat! Dari yang paling kecil: ${benar.map((j) => kata(item[j])).join(", ")}. Ada kumpulan kartu baru.`,
      };
    }
    return { k: { ...k, urutKetuk }, ok: true, pesan: "Betul! Sekarang ketuk kartu yang paling kecil berikutnya." };
  }
  return { k: { ...k, salah: k.salah + 1 }, ok: false, pesan: `${kata(item[i])} belum yang paling kecil. Lihat puluhannya dulu, lalu satuannya.` };
}

/* ------------------------------ Kartu ------------------------------ */
export const pasangKartu = (k: KeadaanPapan) => KARTU_ANGKA[k.kartuIndeks % KARTU_ANGKA.length];
export function pasangPuluhan(k: KeadaanPapan, angka: number): KeadaanPapan {
  return { ...k, kartuPuluhan: k.kartuPuluhan === angka ? null : angka };
}
export function periksaKartu(k: KeadaanPapan): Hasil {
  const p = pasangKartu(k);
  if (k.kartuPuluhan === null) return { k, ok: false, pesan: "Ketuk dulu satu kartu untuk dipasang di tempat puluhan." };
  const satuan = p.a + p.b - k.kartuPuluhan;
  const bentuk = bentukKartu(k.kartuPuluhan, satuan);
  const sasaran = p.target === "besar" ? Math.max(bentukKartu(p.a, p.b), bentukKartu(p.b, p.a)) : Math.min(bentukKartu(p.a, p.b), bentukKartu(p.b, p.a));
  if (bentuk === sasaran) {
    const idx = k.kartuIndeks % KARTU_ANGKA.length;
    return {
      k: { ...k, kartuBenar: k.kartuBenar.includes(idx) ? k.kartuBenar : [...k.kartuBenar, idx], kartuIndeks: (k.kartuIndeks + 1) % KARTU_ANGKA.length, kartuPuluhan: null },
      ok: true,
      pesan: `Tepat! Bilangan ${p.target === "besar" ? "terbesar" : "terkecil"} adalah ${kata(bentuk)}. Ada pasangan kartu baru.`,
    };
  }
  return {
    k: { ...k, salah: k.salah + 1 },
    ok: false,
    pesan: `Terbentuk ${kata(bentuk)}, tetapi belum bilangan ${p.target === "besar" ? "terbesar" : "terkecil"}. ${p.target === "besar" ? "Pasang angka yang lebih besar di tempat puluhan." : "Pasang angka yang lebih kecil di tempat puluhan."}`,
  };
}

/** Ucapan awal tiap alat (tanpa digit). */
export const SUARA_MODE: Record<ModePapan, string> = {
  garis: "Geser katak ke kanan atau ke kiri di tali, sesuai tugas, lalu tekan Periksa. Awalnya tidak dihitung.",
  banding: "Lihat dua bilangan. Pilih kata yang tepat: lebih besar dari, lebih kecil dari, atau sama dengan.",
  urut: "Ketuk kartu bilangan dari yang paling kecil sampai yang paling besar.",
  kartu: "Ketuk kartu yang dipasang di tempat puluhan supaya terbentuk bilangan yang diminta, lalu tekan Periksa.",
};
export function kalimatPapan(k: KeadaanPapan): string {
  if (k.mode === "garis") {
    const t = tugasGaris(k);
    return `Katak mulai dari ${kata(t.mulai)} lalu ${t.arah} ${kata(t.langkah)} langkah. Sekarang katak di ${kata(k.pos)}.`;
  }
  return SUARA_MODE[k.mode];
}
