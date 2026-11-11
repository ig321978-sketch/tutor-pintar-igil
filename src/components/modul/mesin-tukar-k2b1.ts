/**
 * Mesin Tukar Puluhan (Kelas 2 Bab 1): mesin keadaan untuk menulis ulang bilangan.
 * Sepuluh satuan diikat menjadi satu puluhan sampai bentuk ringkas (satuan < 10).
 * Murni dan deterministik: tanpa React, tanpa jaringan. Diuji di scripts/uji-lab-k2b1.mjs.
 */

export type KeadaanTukar = "mulai" | "tukar" | "ringkas" | "selesai";

export const URUT_TUKAR: KeadaanTukar[] = ["mulai", "tukar", "ringkas", "selesai"];

export const NAMA_TUKAR: Record<KeadaanTukar, string> = {
  mulai: "Mulai",
  tukar: "Tukar",
  ringkas: "Ringkas",
  selesai: "Selesai",
};

export const STASIUN_TUKAR = [
  { id: "mulai", nama: "Mulai", ikon: "📦" },
  { id: "tukar", nama: "Tukar", ikon: "🔁" },
  { id: "ringkas", nama: "Ringkas", ikon: "✨" },
  { id: "selesai", nama: "Selesai", ikon: "🏁" },
];

/** Misi: target bilangan, bentuk awal (boleh satuan ≥ 10). Jumlah selalu = target. */
export type MisiTukar = { target: number; puluhan: number; satuan: number };

export const MISI_TUKAR: MisiTukar[] = [
  { target: 26, puluhan: 0, satuan: 26 },
  { target: 34, puluhan: 1, satuan: 24 },
  { target: 48, puluhan: 2, satuan: 28 },
];

export type Tukar = {
  misi: number;
  keadaan: KeadaanTukar;
  puluhan: number;
  satuan: number;
  riwayat: string[];
  pesan: string;
  ditolak: number;
  selesai: boolean;
};

export type PeristiwaTukar =
  | { t: "BACA" }
  | { t: "IKAT" }
  | { t: "BUKA" }
  | { t: "LOMPAT"; ke: KeadaanTukar }
  | { t: "LANJUT" }
  | { t: "ULANG" };

export const nilai = (p: number, s: number) => p * 10 + s;

export const isRingkas = (s: number) => s < 10;

export const bentukKanonik = (target: number) => ({
  puluhan: Math.floor(target / 10),
  satuan: target % 10,
});

export const awalTukar = (misi = 0): Tukar => {
  const m = MISI_TUKAR[((misi % MISI_TUKAR.length) + MISI_TUKAR.length) % MISI_TUKAR.length];
  return {
    misi,
    keadaan: "mulai",
    puluhan: m.puluhan,
    satuan: m.satuan,
    riwayat: [],
    pesan: "",
    ditolak: 0,
    selesai: false,
  };
};

const indeks = (k: KeadaanTukar) => URUT_TUKAR.indexOf(k);

const tolak = (x: Tukar, pesan: string): Tukar => ({ ...x, pesan, ditolak: x.ditolak + 1 });

const pindah = (x: Tukar, ke: KeadaanTukar): Tukar => ({
  ...x,
  keadaan: ke,
  pesan: "",
  riwayat: [...x.riwayat, `${NAMA_TUKAR[x.keadaan]} → ${NAMA_TUKAR[ke]}`].slice(-10),
});

export function halanganTukar(x: Tukar): string | null {
  switch (x.keadaan) {
    case "mulai":
      return "Baca misi dulu. Tekan Mulai tukar.";
    case "tukar":
      return isRingkas(x.satuan)
        ? null
        : `Satuan masih ${x.satuan}. Ikat sepuluh satuan menjadi satu puluhan sampai satuan kurang dari 10.`;
    case "ringkas": {
      const k = bentukKanonik(MISI_TUKAR[x.misi].target);
      if (!isRingkas(x.satuan)) return "Bentuk belum ringkas. Kembali ke Tukar dan ikat lagi.";
      if (x.puluhan !== k.puluhan || x.satuan !== k.satuan) {
        return `Bentuk ringkas untuk ${MISI_TUKAR[x.misi].target} adalah ${k.puluhan} puluhan dan ${k.satuan} satuan.`;
      }
      return null;
    }
    case "selesai":
      return "Semua misi sudah selesai. Tekan Main lagi.";
  }
}

export function petunjukTukar(x: Tukar): string {
  const m = MISI_TUKAR[x.misi];
  if (x.selesai) return "Semua misi selesai.";
  if (x.keadaan === "mulai") return `Misi ${x.misi + 1}: ubah bentuk ${x.puluhan} puluhan dan ${x.satuan} satuan menjadi bentuk ringkas bilangan ${m.target}.`;
  if (x.keadaan === "tukar") {
    if (!isRingkas(x.satuan)) return `Ikat sepuluh satuan. Sekarang ${x.puluhan} puluhan dan ${x.satuan} satuan.`;
    return "Sudah ringkas. Maju ke stasiun Ringkas.";
  }
  if (x.keadaan === "ringkas") return `Periksa: ${x.puluhan} puluhan dan ${x.satuan} satuan = ${m.target}. Tekan Misi berikutnya bila sudah benar.`;
  return "";
}

export function langkahTukar(x: Tukar, p: PeristiwaTukar): Tukar {
  const m = MISI_TUKAR[x.misi];

  switch (p.t) {
    case "BACA":
      if (x.keadaan !== "mulai") return tolak(x, "Misi sudah dibaca. Lanjut di stasiun Tukar.");
      return pindah(x, "tukar");

    case "IKAT": {
      if (x.keadaan !== "tukar") return tolak(x, `Mengikat hanya di stasiun Tukar, bukan di ${NAMA_TUKAR[x.keadaan]}.`);
      if (x.satuan < 10) return tolak(x, "Satuan kurang dari 10. Tidak ada sepuluh satuan untuk diikat.");
      const puluhan = x.puluhan + 1;
      const satuan = x.satuan - 10;
      return {
        ...x,
        puluhan,
        satuan,
        pesan: "",
        riwayat: [...x.riwayat, `Ikat: ${x.puluhan}p ${x.satuan}s → ${puluhan}p ${satuan}s`].slice(-10),
      };
    }

    case "BUKA": {
      if (x.keadaan !== "tukar") return tolak(x, `Membuka hanya di stasiun Tukar, bukan di ${NAMA_TUKAR[x.keadaan]}.`);
      if (x.puluhan < 1) return tolak(x, "Puluhan sudah 0. Tidak ada batang yang bisa dibuka.");
      if (x.satuan + 10 > m.target) return tolak(x, `Membuka akan membuat satuan melebihi ${m.target}.`);
      const puluhan = x.puluhan - 1;
      const satuan = x.satuan + 10;
      return {
        ...x,
        puluhan,
        satuan,
        pesan: "",
        riwayat: [...x.riwayat, `Buka: ${x.puluhan}p ${x.satuan}s → ${puluhan}p ${satuan}s`].slice(-10),
      };
    }

    case "LOMPAT": {
      const dari = indeks(x.keadaan);
      const ke = indeks(p.ke);
      if (ke === dari) return x;
      if (x.selesai) return tolak(x, "Semua misi sudah selesai. Tekan Main lagi.");
      if (ke < dari) {
        // Mundur: boleh, data tetap.
        return pindah(x, p.ke);
      }
      if (ke > dari + 1) return tolak(x, `Mesin tidak bisa melompat ke ${NAMA_TUKAR[p.ke]}. Selesaikan stasiun ${NAMA_TUKAR[x.keadaan]} dulu.`);
      const halangan = halanganTukar(x);
      if (halangan) return tolak(x, halangan);
      if (p.ke === "selesai") {
        // Selesai stasiun hanya lewat LANJUT misi.
        return tolak(x, "Tekan Misi berikutnya atau Selesai di stasiun Ringkas.");
      }
      return pindah(x, p.ke);
    }

    case "LANJUT": {
      if (x.keadaan === "mulai") return langkahTukar(x, { t: "BACA" });
      if (x.keadaan === "tukar") {
        const h = halanganTukar(x);
        if (h) return tolak(x, h);
        return pindah(x, "ringkas");
      }
      if (x.keadaan === "ringkas") {
        const h = halanganTukar(x);
        if (h) return tolak(x, h);
        if (x.misi + 1 >= MISI_TUKAR.length) {
          return {
            ...pindah(x, "selesai"),
            selesai: true,
            riwayat: [...x.riwayat, "Ringkas → Selesai"].slice(-10),
          };
        }
        const berikutnya = awalTukar(x.misi + 1);
        return {
          ...berikutnya,
          riwayat: [...x.riwayat, `Misi ${x.misi + 1} selesai → misi ${x.misi + 2}`].slice(-10),
          ditolak: x.ditolak,
        };
      }
      return tolak(x, "Semua misi sudah selesai. Tekan Main lagi.");
    }

    case "ULANG":
      return awalTukar(0);
  }
}

/** Invarian: nilai bentuk selalu sama dengan target misi. */
export function konsisten(x: Tukar): boolean {
  return nilai(x.puluhan, x.satuan) === MISI_TUKAR[x.misi].target;
}
