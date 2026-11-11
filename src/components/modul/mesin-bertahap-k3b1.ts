/**
 * Mesin keadaan berstasiun untuk Kelas 3 Bab 1 (satu mesin, enam definisi: lihat mesin-data-k3b1.ts).
 * Tiap kasus melewati stasiun berurutan. Tiap stasiun mengajukan satu pertanyaan dengan pilihan jawaban.
 * Mesin menolak langkah yang melompat dan menjawab salah dengan petunjuk, tanpa hukuman.
 * Murni: tanpa React, tanpa jaringan, tanpa impor nilai. Diuji di scripts/uji-lab-k3b1.mjs.
 */

export type StasiunDef = { id: string; nama: string; ikon: string };

export type LangkahMesin = {
  /** Harus sama dengan id stasiun pada urutan yang sama. */
  stasiun: string;
  tanya: string;
  /** Dua atau tiga pilihan. Tepat satu sama dengan `benar`. */
  opsi: string[];
  benar: string;
  /** Petunjuk saat jawaban salah. */
  petunjuk: string;
};

export type KasusMesin = { id: string; nama: string; ringkas: string; langkah: LangkahMesin[] };

export type DefMesin = {
  id: string;
  judul: string;
  /** Id yang dilaporkan ke papan misi saat semua kasus selesai. */
  selesaiId: string;
  stasiun: StasiunDef[];
  kasus: KasusMesin[];
};

export type FaseMesin = "jalan" | "sudah" | "selesai";

export type StateMesin = {
  def: DefMesin;
  misi: number;
  ke: number;
  fase: FaseMesin;
  riwayat: string[];
  pesan: string;
  ditolak: number;
  selesai: boolean;
};

export type PeristiwaMesin = { t: "JAWAB"; nilai: string } | { t: "LANJUT" } | { t: "LOMPAT"; ke: number } | { t: "ULANG" };

export const awalMesin = (def: DefMesin): StateMesin => ({ def, misi: 0, ke: 0, fase: "jalan", riwayat: [], pesan: "", ditolak: 0, selesai: false });

export const kasusAktif = (x: StateMesin): KasusMesin => x.def.kasus[x.misi];

export const langkahAktif = (x: StateMesin): LangkahMesin | null => (x.fase === "jalan" ? kasusAktif(x).langkah[x.ke] : null);

/** Indeks stasiun yang menyala. Setelah semua stasiun dilewati, indeks sama dengan banyak stasiun. */
export const indeksStasiun = (x: StateMesin): number => (x.fase === "jalan" ? x.ke : x.def.stasiun.length);

const tolak = (x: StateMesin, pesan: string): StateMesin => ({ ...x, pesan, ditolak: x.ditolak + 1 });

const namaStasiun = (x: StateMesin, i: number): string => x.def.stasiun[i]?.nama ?? "Selesai";

export function petunjukMesin(x: StateMesin): string {
  const l = langkahAktif(x);
  if (l) return `Pertanyaan ${x.ke + 1} dari ${x.def.stasiun.length}: ${l.tanya}`;
  if (x.fase === "sudah") return `Betul! ${kasusAktif(x).ringkas}`;
  return "Semua kasus sudah diperiksa.";
}

/** Satu langkah mesin. Selalu mengembalikan objek baru bila ada perubahan. */
export function langkahMesin(x: StateMesin, p: PeristiwaMesin): StateMesin {
  switch (p.t) {
    case "JAWAB": {
      const l = langkahAktif(x);
      if (!l) return tolak(x, x.fase === "sudah" ? "Kasus ini sudah diperiksa. Tekan lanjut." : "Semua kasus sudah selesai. Main lagi kalau mau.");
      if (!l.opsi.includes(p.nilai)) return x;
      if (p.nilai !== l.benar) return tolak(x, l.petunjuk);
      const sebelum = namaStasiun(x, x.ke);
      const berikut = x.ke + 1;
      const riwayat = [...x.riwayat, `${sebelum} → ${namaStasiun(x, berikut)}`].slice(-10);
      if (berikut < x.def.stasiun.length) return { ...x, ke: berikut, riwayat, pesan: "" };
      return { ...x, fase: "sudah", riwayat, pesan: "" };
    }
    case "LANJUT": {
      if (x.fase !== "sudah") return tolak(x, "Jawab pertanyaan di stasiun sekarang dulu.");
      if (x.misi + 1 < x.def.kasus.length) return { ...x, misi: x.misi + 1, ke: 0, fase: "jalan", pesan: "" };
      return { ...x, fase: "selesai", selesai: true, pesan: "" };
    }
    case "LOMPAT": {
      if (p.ke === indeksStasiun(x)) return x;
      return tolak(x, "Mesin berjalan berurutan, stasiun demi stasiun. Jawab pertanyaan yang sekarang dulu.");
    }
    case "ULANG":
      return x.selesai ? awalMesin(x.def) : x;
  }
}
