/**
 * Logika murni Simulasi Papan Urut Kelas 3 Bab 1 Sub-Bab C "Karung Pak Dodi" (membandingkan dan mengurutkan bilangan).
 * Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-urut-k3b1c.mjs. Eksplorasi bebas tanpa skor.
 * Empat alat: Tempat (pilih tempat pertama yang berbeda), Tanda (pilih tanda lebih, kurang, atau sama), Garis (letakkan bilangan di antara dua ratusan),
 * Urut (ketuk kartu menurut urutan naik atau turun).
 */
import { GARIS_TUGAS, PASANGAN, URUT_TUGAS } from "./data-sim";
import { angkaTempat, kata, tandaDari, tempatPenentu, urutanIndeks, type Tanda, type Tempat } from "./logika-cpa";

export type ModeUrutan = "tempat" | "tanda" | "garis" | "urut";
export const URUT_MODE: ModeUrutan[] = ["tempat", "tanda", "garis", "urut"];
export type ArahUrut = "naik" | "turun";

export type KeadaanUrutan = {
  alat: "urutan";
  mode: ModeUrutan;
  /** Tempat: indeks pasangan, pilihan (-1 belum, 0 ratusan, 1 puluhan, 2 satuan, 3 sama), dan pasangan yang sudah benar. */
  tempatIndeks: number;
  tempatPilih: number;
  tempatBenar: number[];
  /** Tanda: indeks pasangan, tanda yang dipilih (atau kosong), pasangan yang sudah benar, dan apakah pasangan sama besar sudah ditemukan. */
  tandaIndeks: number;
  tandaPilih: Tanda | "";
  tandaBenar: number[];
  samaTemu: boolean;
  /** Garis: indeks tugas, ratusan yang dipilih (0 belum), dan tugas yang sudah benar. */
  garisIndeks: number;
  garisPilih: number;
  garisBenar: number[];
  /** Urut: indeks tugas, arah, kartu yang sudah diketuk (berurutan), dan tugas naik dan turun yang sudah benar. */
  urutIndeks: number;
  urutArah: ArahUrut;
  urutSudah: number[];
  urutNaikBenar: number[];
  urutTurunBenar: number[];
  /** Percobaan keliru (hanya untuk petunjuk, bukan skor). */
  salah: number;
};

export const awalUrutan = (): KeadaanUrutan => ({
  alat: "urutan",
  mode: "tempat",
  tempatIndeks: 0,
  tempatPilih: -1,
  tempatBenar: [],
  tandaIndeks: 0,
  tandaPilih: "",
  tandaBenar: [],
  samaTemu: false,
  garisIndeks: 0,
  garisPilih: 0,
  garisBenar: [],
  urutIndeks: 0,
  urutArah: "naik",
  urutSudah: [],
  urutNaikBenar: [],
  urutTurunBenar: [],
  salah: 0,
});
export const mulaiLagiUrutan = (): KeadaanUrutan => awalUrutan();
export const pilihModeUrutan = (k: KeadaanUrutan, mode: ModeUrutan): KeadaanUrutan => ({ ...k, mode });

export type Hasil = { k: KeadaanUrutan; ok: boolean; pesan: string };

const tambahUnik = (daftar: number[], x: number): number[] => (daftar.includes(x) ? daftar : [...daftar, x]);

/* ------------------------------ Tempat ------------------------------ */
export const pasanganTempat = (k: KeadaanUrutan) => PASANGAN[k.tempatIndeks % PASANGAN.length];
export const pilihTempat = (k: KeadaanUrutan, i: number): KeadaanUrutan => ({ ...k, tempatPilih: k.tempatPilih === i ? -1 : i });
export function periksaTempat(k: KeadaanUrutan): Hasil {
  const p = pasanganTempat(k);
  if (k.tempatPilih < 0) return { k, ok: false, pesan: "Pilih dulu satu tempat, lalu tekan Periksa." };
  const benar = tempatPenentu(p.a, p.b) < 0 ? 3 : tempatPenentu(p.a, p.b);
  if (k.tempatPilih === benar) {
    const idx = k.tempatIndeks % PASANGAN.length;
    const lanjut = (k.tempatIndeks + 1) % PASANGAN.length;
    const pesan =
      benar === 3
        ? "Tepat! Semua tempat sama, jadi tidak ada tempat yang menentukan. Ada pasangan baru."
        : `Tepat! Tempat ${["ratusan", "puluhan", "satuan"][benar]} yang pertama berbeda: ${kata(angkaTempat(p.a, benar as Tempat))} dan ${kata(angkaTempat(p.b, benar as Tempat))}. Ada pasangan baru.`;
    return { k: { ...k, tempatBenar: tambahUnik(k.tempatBenar, idx), tempatIndeks: lanjut, tempatPilih: -1 }, ok: true, pesan };
  }
  return {
    k: { ...k, salah: k.salah + 1 },
    ok: false,
    pesan: "Belum tepat. Mulai dari ratusan. Bila sama, lihat puluhan, lalu satuan. Tempat pertama yang berbeda yang menentukan.",
  };
}

/* ------------------------------ Tanda ------------------------------ */
export const pasanganTanda = (k: KeadaanUrutan) => PASANGAN[k.tandaIndeks % PASANGAN.length];
export const pilihTanda = (k: KeadaanUrutan, t: Tanda): KeadaanUrutan => ({ ...k, tandaPilih: k.tandaPilih === t ? "" : t });
export function periksaTanda(k: KeadaanUrutan): Hasil {
  const p = pasanganTanda(k);
  if (k.tandaPilih === "") return { k, ok: false, pesan: "Pilih dulu satu tanda, lalu tekan Periksa." };
  if (k.tandaPilih === tandaDari(p.a, p.b)) {
    const idx = k.tandaIndeks % PASANGAN.length;
    const lanjut = (k.tandaIndeks + 1) % PASANGAN.length;
    return {
      k: { ...k, tandaBenar: tambahUnik(k.tandaBenar, idx), samaTemu: k.samaTemu || p.a === p.b, tandaIndeks: lanjut, tandaPilih: "" },
      ok: true,
      pesan: p.a === p.b ? "Tepat! Kedua bilangan sama besar, jadi tandanya sama dengan. Ada pasangan baru." : "Tepat! Mulut tanda menghadap bilangan yang lebih besar. Ada pasangan baru.",
    };
  }
  return {
    k: { ...k, salah: k.salah + 1 },
    ok: false,
    pesan: "Belum tepat. Bandingkan dari ratusan, lalu puluhan, lalu satuan. Mulut tanda menghadap bilangan yang lebih besar, dan tanda sama dengan untuk bilangan yang sama.",
  };
}

/* ------------------------------ Garis ------------------------------ */
export const tugasGaris = (k: KeadaanUrutan) => GARIS_TUGAS[k.garisIndeks % GARIS_TUGAS.length];
/** Atur ratusan yang dipilih (satu sampai sembilan, nol berarti belum memilih). Tekan tambah pertama kali mulai dari tanda ratusan pertama. */
export const ubahGaris = (k: KeadaanUrutan, delta: 1 | -1): KeadaanUrutan => {
  if (k.garisPilih === 0) return { ...k, garisPilih: delta === 1 ? Math.floor(tugasGaris(k).awal / 100) : 0 };
  return { ...k, garisPilih: Math.max(1, Math.min(9, k.garisPilih + delta)) };
};
export function periksaGaris(k: KeadaanUrutan): Hasil {
  const t = tugasGaris(k);
  if (k.garisPilih === 0) return { k, ok: false, pesan: "Atur dulu ratusan di sebelah kiri titik, lalu tekan Periksa." };
  const benar = Math.floor(t.n / 100);
  if (k.garisPilih === benar) {
    const idx = k.garisIndeks % GARIS_TUGAS.length;
    const lanjut = (k.garisIndeks + 1) % GARIS_TUGAS.length;
    return {
      k: { ...k, garisBenar: tambahUnik(k.garisBenar, idx), garisIndeks: lanjut, garisPilih: 0 },
      ok: true,
      pesan: `Tepat! Titik itu di antara ${kata(benar * 100)} dan ${kata(benar * 100 + 100)}. Ada titik baru.`,
    };
  }
  return {
    k: { ...k, salah: k.salah + 1 },
    ok: false,
    pesan: `Belum tepat. Cari dua tanda ratusan yang mengapit titik. ${k.garisPilih < benar ? "Pilihanmu masih terlalu kecil." : "Pilihanmu terlalu besar."}`,
  };
}

/* ------------------------------ Urut ------------------------------ */
export const tugasUrut = (k: KeadaanUrutan) => URUT_TUGAS[k.urutIndeks % URUT_TUGAS.length];
export const gantiArahUrut = (k: KeadaanUrutan, arah: ArahUrut): KeadaanUrutan => ({ ...k, urutArah: arah, urutSudah: [] });
export const ulangUrut = (k: KeadaanUrutan): KeadaanUrutan => ({ ...k, urutSudah: [] });
/** Ketuk kartu ke-i: benar bila kartu itu yang berikutnya menurut urutan. Setelah semua kartu terketuk, tugas dihitung dan ada tugas baru. */
export function ketukUrut(k: KeadaanUrutan, i: number): Hasil {
  const t = tugasUrut(k);
  if (k.urutSudah.includes(i)) return { k, ok: false, pesan: "Kartu itu sudah diketuk." };
  const benar = urutanIndeks(t.angka, k.urutArah);
  if (i !== benar[k.urutSudah.length]) {
    return {
      k: { ...k, salah: k.salah + 1 },
      ok: false,
      pesan: `Kartu itu belum yang paling ${k.urutArah === "naik" ? "kecil" : "besar"}. Bandingkan ratusannya dulu, lalu puluhan, lalu satuan.`,
    };
  }
  const sudah = [...k.urutSudah, i];
  if (sudah.length < t.angka.length) return { k: { ...k, urutSudah: sudah }, ok: true, pesan: `Betul! Kartu berikutnya yang paling ${k.urutArah === "naik" ? "kecil" : "besar"} yang mana?` };
  const idx = k.urutIndeks % URUT_TUGAS.length;
  const lanjut = (k.urutIndeks + 1) % URUT_TUGAS.length;
  return {
    k: {
      ...k,
      urutSudah: [],
      urutIndeks: lanjut,
      urutNaikBenar: k.urutArah === "naik" ? tambahUnik(k.urutNaikBenar, idx) : k.urutNaikBenar,
      urutTurunBenar: k.urutArah === "turun" ? tambahUnik(k.urutTurunBenar, idx) : k.urutTurunBenar,
    },
    ok: true,
    pesan: `Tepat! Semua kartu sudah berurutan ${k.urutArah === "naik" ? "naik" : "turun"}. Ada kartu baru.`,
  };
}

/** Ucapan awal tiap alat (tanpa digit). */
export const SUARA_MODE: Record<ModeUrutan, string> = {
  tempat: "Lihat dua bilangan. Pilih tempat pertama yang berbeda, dari kiri, lalu tekan Periksa.",
  tanda: "Lihat dua bilangan. Pilih tanda yang tepat, lalu tekan Periksa.",
  garis: "Lihat titik pada garis bilangan. Atur ratusan di sebelah kiri titik, lalu tekan Periksa.",
  urut: "Ketuk kartu satu per satu menurut urutan yang dipilih. Kamu boleh mengganti urutan naik atau turun.",
};
export const kalimatUrutan = (k: KeadaanUrutan): string => SUARA_MODE[k.mode];
