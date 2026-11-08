import type { JenisBenda } from "./data-8-dasar";

/**
 * Mesin Data Ajaib (Bab 8): simulasi mesin keadaan (state machine).
 *
 * Keadaan: tanya → turus → tabel → diagram → cerita → selesai.
 * Setiap perpindahan punya syarat (guard). Mesin menolak lompatan yang melanggar urutan dan
 * menyebutkan alasannya, sehingga anak mengalami sendiri bahwa urutan membuat diagram yang benar.
 *
 * Murni dan deterministik: tanpa React, tanpa jaringan. Diuji terpisah di Node.
 */

export type Keadaan = "tanya" | "turus" | "tabel" | "diagram" | "cerita" | "selesai";

export const URUT: Keadaan[] = ["tanya", "turus", "tabel", "diagram", "cerita", "selesai"];

export const NAMA_KEADAAN: Record<Keadaan, string> = {
  tanya: "Tanya",
  turus: "Turus",
  tabel: "Tabel",
  diagram: "Diagram",
  cerita: "Cerita",
  selesai: "Selesai",
};

export type KategoriMesin = { nama: string; jenis: JenisBenda };

export type DataMesin = {
  id: string;
  judul: string;
  pertanyaan: string;
  kategori: KategoriMesin[];
  /** Jawaban tiap teman: indeks kategori. */
  teman: number[];
};

export const DATA_MESIN: DataMesin[] = [
  {
    id: "buah",
    judul: "Buah Kesukaan",
    pertanyaan: "Buah apa yang kamu suka?",
    kategori: [
      { nama: "Jeruk", jenis: "jeruk" },
      { nama: "Apel", jenis: "apel" },
      { nama: "Mangga", jenis: "mangga" },
    ],
    // Jeruk 4, Apel 3, Mangga 2.
    teman: [0, 1, 0, 2, 0, 1, 2, 0, 1],
  },
  {
    id: "hewan",
    judul: "Hewan Kesukaan",
    pertanyaan: "Hewan apa yang kamu suka?",
    kategori: [
      { nama: "Ayam", jenis: "ayam" },
      { nama: "Bebek", jenis: "bebek" },
      { nama: "Kelinci", jenis: "kelinci" },
    ],
    // Ayam 3, Bebek 2, Kelinci 5.
    teman: [2, 0, 2, 1, 2, 0, 2, 1, 2, 0],
  },
];

export type Mesin = {
  ronde: number;
  keadaan: Keadaan;
  dicatat: boolean[];
  tabel: (number | null)[];
  diagram: number[];
  riwayat: string[];
  /** Pesan penolakan terakhir. Kosong bila perpindahan terakhir berhasil. */
  pesan: string;
  ditolak: number;
};

export type Peristiwa =
  | { t: "TANYA" }
  | { t: "CATAT"; i: number }
  | { t: "ISI_TABEL"; k: number }
  | { t: "WARNAI"; k: number }
  | { t: "CERITA" }
  | { t: "LOMPAT"; ke: Keadaan }
  | { t: "ULANG" };

export function dataRonde(ronde: number): DataMesin {
  return DATA_MESIN[((ronde % DATA_MESIN.length) + DATA_MESIN.length) % DATA_MESIN.length];
}

export function awal(ronde = 0): Mesin {
  const d = dataRonde(ronde);
  return {
    ronde,
    keadaan: "tanya",
    dicatat: d.teman.map(() => false),
    tabel: d.kategori.map(() => null),
    diagram: d.kategori.map(() => 0),
    riwayat: [],
    pesan: "",
    ditolak: 0,
  };
}

/** Banyak turus tiap kategori dari teman yang sudah ditanya. */
export function turusPer(m: Mesin): number[] {
  const d = dataRonde(m.ronde);
  return d.kategori.map((_, k) => d.teman.filter((j, i) => j === k && m.dicatat[i]).length);
}

/** Banyak data sebenarnya tiap kategori. */
export function totalPer(m: Mesin): number[] {
  const d = dataRonde(m.ronde);
  return d.kategori.map((_, k) => d.teman.filter((j) => j === k).length);
}

export const semuaDicatat = (m: Mesin) => m.dicatat.every(Boolean);
export const tabelLengkap = (m: Mesin) => m.tabel.every((v) => v !== null);
export const diagramSesuai = (m: Mesin) => m.tabel.every((v, k) => v !== null && m.diagram[k] === v);

const indeks = (k: Keadaan) => URUT.indexOf(k);

function tolak(m: Mesin, pesan: string): Mesin {
  return { ...m, pesan, ditolak: m.ditolak + 1 };
}

function pindah(m: Mesin, ke: Keadaan): Mesin {
  const catatan = `${NAMA_KEADAAN[m.keadaan]} → ${NAMA_KEADAAN[ke]}`;
  return { ...m, keadaan: ke, pesan: "", riwayat: [...m.riwayat, catatan].slice(-12) };
}

/** Alasan mesin belum boleh maju dari keadaan sekarang. Null bila syaratnya terpenuhi. */
export function halanganMaju(m: Mesin): string | null {
  switch (m.keadaan) {
    case "tanya":
      return "Tekan tombol Tanyakan dulu. Mesin belum punya jawaban teman.";
    case "turus": {
      const sisa = m.dicatat.filter((x) => !x).length;
      return sisa > 0 ? `Turus belum lengkap. Masih ada ${sisa} teman yang belum dicatat.` : null;
    }
    case "tabel": {
      const sisa = m.tabel.filter((v) => v === null).length;
      return sisa > 0 ? `Tabel belum lengkap. Masih ada ${sisa} baris yang kosong.` : null;
    }
    case "diagram":
      return diagramSesuai(m) ? null : "Diagram belum sama dengan tabel. Warnai gambarnya sampai sesuai.";
    case "cerita":
      return "Tekan tombol Ceritakan dulu.";
    case "selesai":
      return "Mesin sudah selesai. Putar lagi untuk data baru.";
  }
}

/** Satu langkah mesin keadaan. Selalu mengembalikan objek baru. */
export function langkah(m: Mesin, p: Peristiwa): Mesin {
  const d = dataRonde(m.ronde);
  switch (p.t) {
    case "TANYA":
      if (m.keadaan !== "tanya") return tolak(m, "Pertanyaan sudah ditanyakan.");
      return pindah(m, "turus");

    case "CATAT":
      if (m.keadaan !== "turus") return tolak(m, `Tombol itu belum bisa dipakai di stasiun ${NAMA_KEADAAN[m.keadaan]}.`);
      if (p.i < 0 || p.i >= d.teman.length || m.dicatat[p.i]) return m;
      return { ...m, pesan: "", dicatat: m.dicatat.map((x, i) => (i === p.i ? true : x)) };

    case "ISI_TABEL": {
      if (m.keadaan !== "tabel") return tolak(m, `Tombol itu belum bisa dipakai di stasiun ${NAMA_KEADAAN[m.keadaan]}.`);
      if (p.k < 0 || p.k >= d.kategori.length || m.tabel[p.k] !== null) return m;
      const nilai = turusPer(m)[p.k];
      return { ...m, pesan: "", tabel: m.tabel.map((v, k) => (k === p.k ? nilai : v)) };
    }

    case "WARNAI": {
      if (m.keadaan !== "diagram") return tolak(m, `Tombol itu belum bisa dipakai di stasiun ${NAMA_KEADAAN[m.keadaan]}.`);
      if (p.k < 0 || p.k >= d.kategori.length) return m;
      const batas = m.tabel[p.k] ?? 0;
      if (m.diagram[p.k] >= batas) return tolak(m, `Gambar ${d.kategori[p.k].nama} sudah sama dengan tabel. Jangan lebih.`);
      return { ...m, pesan: "", diagram: m.diagram.map((v, k) => (k === p.k ? v + 1 : v)) };
    }

    case "CERITA":
      if (m.keadaan !== "cerita") return tolak(m, "Mesin belum sampai di stasiun Cerita.");
      return pindah(m, "selesai");

    case "LOMPAT": {
      const dari = indeks(m.keadaan);
      const ke = indeks(p.ke);
      if (ke === dari) return m;
      if (ke < dari) return pindah(m, p.ke); // kembali melihat stasiun sebelumnya
      if (ke > dari + 1) {
        return tolak(m, `Mesin tidak bisa melompat ke ${NAMA_KEADAAN[p.ke]}. Selesaikan stasiun ${NAMA_KEADAAN[m.keadaan]} dulu.`);
      }
      const halangan = halanganMaju(m);
      if (halangan) return tolak(m, halangan);
      return pindah(m, p.ke);
    }

    case "ULANG":
      if (m.keadaan !== "selesai") return tolak(m, "Selesaikan dulu semua stasiun.");
      return awal(m.ronde + 1);
  }
}

/** Kalimat data untuk stasiun Cerita. */
export function ceritaData(m: Mesin): string[] {
  const d = dataRonde(m.ronde);
  const n = totalPer(m);
  const maks = Math.max(...n);
  const min = Math.min(...n);
  const nama = (cocok: number) =>
    d.kategori
      .filter((_, k) => n[k] === cocok)
      .map((c) => c.nama)
      .join(" dan ");
  const total = n.reduce((a, b) => a + b, 0);
  if (maks === min) return [`Semua sama banyak, masing-masing ${maks} anak.`, `Semuanya ada ${total} anak.`];
  return [`${nama(maks)} paling banyak, ${maks} anak.`, `${nama(min)} paling sedikit, ${min} anak.`, `Semuanya ada ${total} anak.`];
}
