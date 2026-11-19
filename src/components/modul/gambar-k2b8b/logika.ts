/**
 * Logika murni Simulasi Papan Layar Kelas 2 Bab 8 Sub-Bab B "Bintang Bu Maya" (diagram gambar), akhir cerita Pentas Seni Sekolah.
 * Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-gambar-k2b8b.mjs. Eksplorasi bebas tanpa skor.
 * Empat alat: Tempel (tempel lambang pada tiap baris sesuai tabel, ukuran selalu sama, lambang boleh diganti), Judul (pilih judul dan keterangan yang tepat),
 * Banding (pilih kata dan lebihnya untuk dua baris), Jumlah (jumlahkan banyak gambar pada baris yang ditandai).
 */
import { BANDING_TUGAS, BATAS_BARIS, JUDUL_PILIHAN, JUMLAH_TUGAS, LAMBANG_AWAL, TEMPEL_TUGAS } from "./data-sim";
import { kata, namaBanding, type Lambang } from "./logika-cpa";

export type ModeLayar = "tempel" | "judul" | "banding" | "jumlah";
export const URUT_MODE: ModeLayar[] = ["tempel", "judul", "banding", "jumlah"];
export type KataBanding = "lebih" | "kurang" | "sama";

export type KeadaanLayar = {
  alat: "layar";
  mode: ModeLayar;
  /** Tempel: indeks tabel, banyak lambang yang sudah ditempel pada tiap barisnya, lambang yang dipakai, apakah lambang pernah diganti, dan tabel yang sudah benar. */
  tempelIndeks: number;
  tempel: number[];
  lambang: Lambang;
  lambangGanti: boolean;
  tempelBenar: number[];
  /** Judul: indeks tabel, pilihan judul dan keterangan (atau kosong), dan tabel yang sudah benar. */
  judulIndeks: number;
  judulPilih: number | null;
  ketPilih: number | null;
  judulBenar: number[];
  /** Banding: indeks pasangan, kata yang dipilih, lebihnya yang dipilih, dan pasangan yang sudah benar. */
  bandingIndeks: number;
  bandingKata: KataBanding | null;
  bandingSelisih: number;
  bandingBenar: number[];
  /** Jumlah: indeks tugas, jumlah yang dipilih, dan tugas yang sudah benar. */
  jumlahIndeks: number;
  jumlahPilih: number;
  jumlahBenar: number[];
  /** Percobaan keliru (hanya untuk petunjuk, bukan skor). */
  salah: number;
};

const nol = (t: number): number[] => TEMPEL_TUGAS[t % TEMPEL_TUGAS.length].baris.map(() => 0);

export const awalLayar = (): KeadaanLayar => ({
  alat: "layar",
  mode: "tempel",
  tempelIndeks: 0,
  tempel: nol(0),
  lambang: LAMBANG_AWAL,
  lambangGanti: false,
  tempelBenar: [],
  judulIndeks: 0,
  judulPilih: null,
  ketPilih: null,
  judulBenar: [],
  bandingIndeks: 0,
  bandingKata: null,
  bandingSelisih: 0,
  bandingBenar: [],
  jumlahIndeks: 0,
  jumlahPilih: 0,
  jumlahBenar: [],
  salah: 0,
});
export const mulaiLagiLayar = (): KeadaanLayar => awalLayar();
export const pilihModeLayar = (k: KeadaanLayar, mode: ModeLayar): KeadaanLayar => ({ ...k, mode });

export type Hasil = { k: KeadaanLayar; ok: boolean; pesan: string };

/* ------------------------------ Tempel ------------------------------ */
export const tugasTempel = (k: KeadaanLayar) => TEMPEL_TUGAS[k.tempelIndeks % TEMPEL_TUGAS.length];
/** Tambah (delta satu) atau kurangi (delta minus satu) satu lambang pada baris i, antara nol dan batas baris. */
export function tempelLambang(k: KeadaanLayar, i: number, delta: 1 | -1): Hasil {
  const baru = Math.max(0, Math.min(BATAS_BARIS, (k.tempel[i] ?? 0) + delta));
  if (baru === (k.tempel[i] ?? 0)) return { k, ok: false, pesan: delta === 1 ? "Baris itu sudah penuh. Satu baris paling banyak sembilan gambar." : "Baris itu sudah kosong." };
  const tempel = k.tempel.map((n, j) => (j === i ? baru : n));
  return { k: { ...k, tempel }, ok: true, pesan: `Baris ${tugasTempel(k).baris[i].nama.toLowerCase()} punya ${kata(baru)} gambar. Semua gambar sama bentuk dan ukurannya.` };
}
export const gantiLambang = (k: KeadaanLayar, lambang: Lambang): KeadaanLayar => ({ ...k, lambang });
export function periksaTempel(k: KeadaanLayar): Hasil {
  const t = tugasTempel(k);
  const cocok = t.baris.every((b, i) => b.n === (k.tempel[i] ?? 0));
  if (cocok) {
    const idx = k.tempelIndeks % TEMPEL_TUGAS.length;
    const lanjut = (k.tempelIndeks + 1) % TEMPEL_TUGAS.length;
    return {
      k: {
        ...k,
        tempelBenar: k.tempelBenar.includes(idx) ? k.tempelBenar : [...k.tempelBenar, idx],
        lambangGanti: k.lambangGanti || k.lambang !== LAMBANG_AWAL,
        tempelIndeks: lanjut,
        tempel: nol(lanjut),
      },
      ok: true,
      pesan: `Tepat! Diagram ${t.judul.toLowerCase()} sudah sesuai tabel. Ada tabel baru.`,
    };
  }
  const kurang = t.baris.findIndex((b, i) => b.n !== (k.tempel[i] ?? 0));
  return {
    k: { ...k, salah: k.salah + 1 },
    ok: false,
    pesan: `Belum tepat. Baris ${t.baris[kurang].nama.toLowerCase()} harus punya ${kata(t.baris[kurang].n)} gambar, satu gambar untuk satu benda.`,
  };
}
export const ulangTempel = (k: KeadaanLayar): KeadaanLayar => ({ ...k, tempel: nol(k.tempelIndeks) });

/* ------------------------------ Judul ------------------------------ */
export const pilihanJudul = (k: KeadaanLayar) => JUDUL_PILIHAN[k.judulIndeks % JUDUL_PILIHAN.length];
export const pilihJudul = (k: KeadaanLayar, i: number): KeadaanLayar => ({ ...k, judulPilih: k.judulPilih === i ? null : i });
export const pilihKet = (k: KeadaanLayar, i: number): KeadaanLayar => ({ ...k, ketPilih: k.ketPilih === i ? null : i });
export function periksaJudul(k: KeadaanLayar): Hasil {
  const p = pilihanJudul(k);
  if (k.judulPilih === null || k.ketPilih === null) return { k, ok: false, pesan: "Pilih dulu satu judul dan satu keterangan, lalu tekan Periksa." };
  if (k.judulPilih === p.benarJudul && k.ketPilih === p.benarKet) {
    const idx = k.judulIndeks % JUDUL_PILIHAN.length;
    return {
      k: { ...k, judulBenar: k.judulBenar.includes(idx) ? k.judulBenar : [...k.judulBenar, idx], judulIndeks: (k.judulIndeks + 1) % JUDUL_PILIHAN.length, judulPilih: null, ketPilih: null },
      ok: true,
      pesan: "Tepat! Judul menyebut isi diagram, dan keterangan menyebut arti satu gambar. Ada diagram baru.",
    };
  }
  return {
    k: { ...k, salah: k.salah + 1 },
    ok: false,
    pesan: k.judulPilih !== p.benarJudul ? "Judul belum tepat. Judul menyebut isi diagram, sesuai tabelnya." : "Keterangan belum tepat. Keterangan menyebut satu gambar mewakili berapa dan apa.",
  };
}

/* ------------------------------ Banding ------------------------------ */
export const pasangBanding = (k: KeadaanLayar) => BANDING_TUGAS[k.bandingIndeks % BANDING_TUGAS.length];
/** Banyak gambar dua baris yang dibandingkan. */
export function angkaBanding(k: KeadaanLayar): readonly [number, number] {
  const p = pasangBanding(k);
  const t = TEMPEL_TUGAS[p.t];
  return [t.baris[p.a].n, t.baris[p.b].n];
}
export const pilihKataBanding = (k: KeadaanLayar, kataBanding: KataBanding): KeadaanLayar => ({ ...k, bandingKata: k.bandingKata === kataBanding ? null : kataBanding });
export const ubahSelisih = (k: KeadaanLayar, delta: 1 | -1): KeadaanLayar => ({ ...k, bandingSelisih: Math.max(0, Math.min(BATAS_BARIS, k.bandingSelisih + delta)) });
export function periksaBanding(k: KeadaanLayar): Hasil {
  const [a, b] = angkaBanding(k);
  const benar = namaBanding(a, b);
  if (k.bandingKata === null) return { k, ok: false, pesan: "Pilih dulu kata untuk baris pertama dibanding baris kedua, lalu tekan Periksa." };
  if (k.bandingKata !== benar) {
    return { k: { ...k, salah: k.salah + 1 }, ok: false, pesan: "Kata belum tepat. Bandingkan panjang dua baris dari garis yang sama: yang lebih panjang lebih banyak, dan yang sama panjang sama banyak." };
  }
  if (k.bandingSelisih !== Math.abs(a - b)) {
    return { k: { ...k, salah: k.salah + 1 }, ok: false, pesan: "Kata sudah tepat, tetapi lebihnya belum. Lebihnya adalah selisih banyak gambar dua baris." };
  }
  const idx = k.bandingIndeks % BANDING_TUGAS.length;
  const lanjut = (k.bandingIndeks + 1) % BANDING_TUGAS.length;
  return {
    k: { ...k, bandingBenar: k.bandingBenar.includes(idx) ? k.bandingBenar : [...k.bandingBenar, idx], bandingIndeks: lanjut, bandingKata: null, bandingSelisih: 0 },
    ok: true,
    pesan: benar === "sama" ? "Tepat! Dua baris itu sama panjang, jadi sama banyak. Ada pasangan baris baru." : `Tepat! Selisihnya ${kata(Math.abs(a - b))}. Ada pasangan baris baru.`,
  };
}

/* ------------------------------ Jumlah ------------------------------ */
export const tugasJumlah = (k: KeadaanLayar) => JUMLAH_TUGAS[k.jumlahIndeks % JUMLAH_TUGAS.length];
/** Jumlah banyak gambar pada baris-baris yang ditandai. */
export function jumlahSasaran(k: KeadaanLayar): number {
  const t = tugasJumlah(k);
  return t.idx.reduce((s, i) => s + TEMPEL_TUGAS[t.t].baris[i].n, 0);
}
export const ubahJumlah = (k: KeadaanLayar, delta: 1 | -1): KeadaanLayar => ({ ...k, jumlahPilih: Math.max(0, Math.min(30, k.jumlahPilih + delta)) });
export function periksaJumlah(k: KeadaanLayar): Hasil {
  const benar = jumlahSasaran(k);
  if (k.jumlahPilih === benar) {
    const idx = k.jumlahIndeks % JUMLAH_TUGAS.length;
    const lanjut = (k.jumlahIndeks + 1) % JUMLAH_TUGAS.length;
    return {
      k: { ...k, jumlahBenar: k.jumlahBenar.includes(idx) ? k.jumlahBenar : [...k.jumlahBenar, idx], jumlahIndeks: lanjut, jumlahPilih: 0 },
      ok: true,
      pesan: `Tepat! Jumlahnya ${kata(benar)}. Ada tugas jumlah yang baru.`,
    };
  }
  return {
    k: { ...k, salah: k.salah + 1 },
    ok: false,
    pesan: `Belum tepat. Hitung gambar pada tiap baris yang ditandai, lalu tambahkan. ${k.jumlahPilih < benar ? "Jumlahmu masih kurang." : "Jumlahmu terlalu banyak."}`,
  };
}

/** Ucapan awal tiap alat (tanpa digit). */
export const SUARA_MODE: Record<ModeLayar, string> = {
  tempel: "Tempel lambang pada tiap baris sampai banyaknya sama dengan tabel, lalu tekan Periksa. Satu gambar untuk satu benda.",
  judul: "Pilih judul dan keterangan yang tepat untuk diagramnya, lalu tekan Periksa.",
  banding: "Lihat dua baris. Pilih kata, lalu atur lebihnya, dan tekan Periksa.",
  jumlah: "Hitung gambar pada baris yang ditandai, atur jumlahnya, lalu tekan Periksa.",
};
export function kalimatLayar(k: KeadaanLayar): string {
  if (k.mode === "tempel") return `Tabel ${tugasTempel(k).judul.toLowerCase()}. ${SUARA_MODE.tempel}`;
  return SUARA_MODE[k.mode];
}
