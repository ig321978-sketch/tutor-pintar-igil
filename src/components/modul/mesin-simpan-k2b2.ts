/**
 * Mesin Simpan dan Urai (Kelas 2 Bab 2): mesin keadaan.
 * Tambah: sepuluh satuan disimpan jadi satu puluhan.
 * Kurang: satu puluhan diurai jadi sepuluh satuan bila satuan kurang.
 * Murni: tanpa React, tanpa jaringan. Diuji di scripts/uji-lab-k2b2.mjs.
 */

export type OpSimpan = "tambah" | "kurang";
export type KeadaanSimpan = "soal" | "susun" | "tukar" | "hasil" | "selesai";

export const URUT_SIMPAN: KeadaanSimpan[] = ["soal", "susun", "tukar", "hasil", "selesai"];

export const NAMA_SIMPAN: Record<KeadaanSimpan, string> = {
  soal: "Soal",
  susun: "Susun",
  tukar: "Tukar",
  hasil: "Hasil",
  selesai: "Selesai",
};

export const STASIUN_SIMPAN = [
  { id: "soal", nama: "Soal", ikon: "📜" },
  { id: "susun", nama: "Susun", ikon: "🧱" },
  { id: "tukar", nama: "Tukar", ikon: "🔁" },
  { id: "hasil", nama: "Hasil", ikon: "✅" },
  { id: "selesai", nama: "Selesai", ikon: "🏁" },
];

export type MisiSimpan = { a: number; b: number; op: OpSimpan };

export const MISI_SIMPAN: MisiSimpan[] = [
  { a: 8, b: 5, op: "tambah" },
  { a: 14, b: 6, op: "kurang" },
  { a: 9, b: 7, op: "tambah" },
];

/** Sub-Bab A: hanya penjumlahan. Satu soal tidak perlu menyimpan supaya anak tahu kapan simpan dipakai. */
export const MISI_SIMPAN_TAMBAH: MisiSimpan[] = [
  { a: 8, b: 5, op: "tambah" },
  { a: 12, b: 6, op: "tambah" },
  { a: 18, b: 2, op: "tambah" },
];

/** Sub-Bab B: hanya pengurangan. Satu soal tidak perlu mengurai. */
export const MISI_SIMPAN_KURANG: MisiSimpan[] = [
  { a: 18, b: 12, op: "kurang" },
  { a: 12, b: 8, op: "kurang" },
  { a: 20, b: 6, op: "kurang" },
];

export type RagamSimpan = "campur" | "tambah" | "kurang";

export const daftarSimpan = (ragam: RagamSimpan): MisiSimpan[] =>
  ragam === "tambah" ? MISI_SIMPAN_TAMBAH : ragam === "kurang" ? MISI_SIMPAN_KURANG : MISI_SIMPAN;

export const hasilMisi = (m: MisiSimpan) => (m.op === "tambah" ? m.a + m.b : m.a - m.b);

export const perluSimpan = (m: MisiSimpan) => m.op === "tambah" && (m.a % 10) + (m.b % 10) >= 10;

export const perluUrai = (m: MisiSimpan) => m.op === "kurang" && m.a % 10 < m.b % 10;

export const perluTukar = (m: MisiSimpan) => perluSimpan(m) || perluUrai(m);

export type Simpan = {
  /** Daftar misi yang sedang dikerjakan (menurut sub-bab). */
  daftar: MisiSimpan[];
  misi: number;
  keadaan: KeadaanSimpan;
  sudahTukar: boolean;
  riwayat: string[];
  pesan: string;
  ditolak: number;
  selesai: boolean;
};

export type PeristiwaSimpan =
  | { t: "BACA" }
  | { t: "LANJUT" }
  | { t: "TUKAR" }
  | { t: "JAWAB"; nilai: number }
  | { t: "LOMPAT"; ke: KeadaanSimpan }
  | { t: "ULANG" };

export const awalSimpan = (misi = 0, daftar: MisiSimpan[] = MISI_SIMPAN): Simpan => ({
  daftar,
  misi: ((misi % daftar.length) + daftar.length) % daftar.length,
  keadaan: "soal",
  sudahTukar: false,
  riwayat: [],
  pesan: "",
  ditolak: 0,
  selesai: false,
});

const indeks = (k: KeadaanSimpan) => URUT_SIMPAN.indexOf(k);
const tolak = (x: Simpan, pesan: string): Simpan => ({ ...x, pesan, ditolak: x.ditolak + 1 });
const pindah = (x: Simpan, ke: KeadaanSimpan): Simpan => ({
  ...x,
  keadaan: ke,
  pesan: "",
  riwayat: [...x.riwayat, `${NAMA_SIMPAN[x.keadaan]} → ${NAMA_SIMPAN[ke]}`].slice(-10),
});

export function misiAktif(x: Simpan): MisiSimpan {
  return x.daftar[x.misi];
}

export function halanganSimpan(x: Simpan): string | null {
  const m = misiAktif(x);
  switch (x.keadaan) {
    case "soal":
      return "Baca soalnya dulu. Tekan Baca soal.";
    case "susun":
      return null;
    case "tukar":
      if (!perluTukar(m)) return null;
      return x.sudahTukar
        ? null
        : perluSimpan(m)
          ? "Tekan Simpan dulu. Satuan sudah sepuluh atau lebih."
          : "Tekan Urai dulu. Satuan atas kurang dari satuan bawah.";
    case "hasil":
      return "Pilih hasil akhirnya dulu.";
    case "selesai":
      return "Semua misi sudah selesai. Tekan Main lagi.";
  }
}

export function petunjukSimpan(x: Simpan): string {
  const m = misiAktif(x);
  const tanda = m.op === "tambah" ? "+" : "−";
  if (x.selesai) return "Semua misi selesai.";
  if (x.keadaan === "soal") return `Misi ${x.misi + 1}: ${m.a} ${tanda} ${m.b}. Baca soalnya.`;
  if (x.keadaan === "susun") return `Susun ${m.a} dan ${m.b} di tabel nilai tempat, lalu lanjut.`;
  if (x.keadaan === "tukar") {
    if (!perluTukar(m)) return "Tidak perlu menukar. Lanjut ke Hasil.";
    if (x.sudahTukar) return "Sudah ditukar. Lanjut ke Hasil.";
    return perluSimpan(m) ? "Simpan sepuluh satuan menjadi satu puluhan." : "Urai satu puluhan menjadi sepuluh satuan.";
  }
  if (x.keadaan === "hasil") return `Berapa hasil ${m.a} ${tanda} ${m.b}?`;
  return "";
}

/** Pilihan hasil: benar di tengah putaran. */
export function pilihanHasil(misi: number, daftar: MisiSimpan[] = MISI_SIMPAN): number[] {
  const c = hasilMisi(daftar[misi]);
  // Pengecoh dekat jawaban, tetap di 0 sampai 20: di ujung atas atau bawah, geser pengecoh ke sisi yang masih ada.
  const dasar = c + 1 > 20 ? [c - 2, c - 1, c] : c - 1 < 0 ? [c, c + 1, c + 2] : [c - 1, c, c + 1];
  const putar = c % 3;
  return [0, 1, 2].map((k) => dasar[(k + putar) % dasar.length]);
}

export function langkahSimpan(x: Simpan, p: PeristiwaSimpan): Simpan {
  const m = misiAktif(x);

  switch (p.t) {
    case "BACA":
      if (x.keadaan !== "soal") return tolak(x, "Soal sudah dibaca.");
      return pindah(x, "susun");

    case "TUKAR": {
      if (x.keadaan !== "tukar") return tolak(x, `Menukar hanya di stasiun Tukar, bukan di ${NAMA_SIMPAN[x.keadaan]}.`);
      if (!perluTukar(m)) return tolak(x, "Soal ini tidak perlu menyimpan atau mengurai.");
      if (x.sudahTukar) return tolak(x, "Sudah ditukar. Lanjut ke Hasil.");
      const label = perluSimpan(m) ? "Simpan 1 puluhan" : "Urai 1 puluhan";
      return {
        ...x,
        sudahTukar: true,
        pesan: "",
        riwayat: [...x.riwayat, label].slice(-10),
      };
    }

    case "JAWAB": {
      if (x.keadaan !== "hasil") return tolak(x, "Hasil baru diminta di stasiun Hasil.");
      const benar = hasilMisi(m);
      if (p.nilai !== benar) return tolak(x, `Belum tepat. Periksa lagi ${m.a} ${m.op === "tambah" ? "+" : "−"} ${m.b}.`);
      if (x.misi + 1 >= x.daftar.length) {
        return {
          ...pindah(x, "selesai"),
          selesai: true,
          riwayat: [...x.riwayat, `Hasil ${benar}`, "Hasil → Selesai"].slice(-10),
        };
      }
      const berikutnya = awalSimpan(x.misi + 1, x.daftar);
      return {
        ...berikutnya,
        riwayat: [...x.riwayat, `Hasil ${benar}`, `Misi ${x.misi + 1} selesai → misi ${x.misi + 2}`].slice(-10),
        ditolak: x.ditolak,
      };
    }

    case "LANJUT": {
      if (x.keadaan === "soal") return langkahSimpan(x, { t: "BACA" });
      if (x.keadaan === "susun") {
        // Ke tukar selalu (mesin menjelaskan bila tidak perlu tukar).
        return pindah(x, "tukar");
      }
      if (x.keadaan === "tukar") {
        const h = halanganSimpan(x);
        if (h) return tolak(x, h);
        return pindah(x, "hasil");
      }
      return tolak(x, "Di stasiun Hasil, pilih jawabannya.");
    }

    case "LOMPAT": {
      const dari = indeks(x.keadaan);
      const ke = indeks(p.ke);
      if (ke === dari) return x;
      if (x.selesai) return tolak(x, "Semua misi sudah selesai. Tekan Main lagi.");
      if (ke < dari) {
        // Mundur: reset sudahTukar bila kembali sebelum tukar selesai dipakai.
        const reset = ke <= indeks("tukar") ? { ...x, sudahTukar: ke < indeks("tukar") ? false : x.sudahTukar } : x;
        return pindah(reset, p.ke);
      }
      if (ke > dari + 1) return tolak(x, `Mesin tidak bisa melompat ke ${NAMA_SIMPAN[p.ke]}. Selesaikan stasiun ${NAMA_SIMPAN[x.keadaan]} dulu.`);
      if (p.ke === "selesai") return tolak(x, "Selesaikan jawaban di stasiun Hasil dulu.");
      if (x.keadaan === "tukar" && p.ke === "hasil") {
        const h = halanganSimpan(x);
        if (h) return tolak(x, h);
      }
      if (x.keadaan === "hasil") return tolak(x, "Pilih hasil akhirnya dulu.");
      return pindah(x, p.ke);
    }

    case "ULANG":
      return awalSimpan(0, x.daftar);
  }
}
