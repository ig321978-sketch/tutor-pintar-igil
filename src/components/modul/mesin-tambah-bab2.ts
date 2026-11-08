/**
 * Mesin Tambah (Bab 2): simulasi mesin keadaan.
 *
 * Keadaan: pesan → kotakA → kotakB → gabung → hasil → selesai.
 * Perpindahan punya syarat (guard): isi kotak sesuai pesanan, gabungkan dulu, baru jawab hasilnya.
 * Mesin menolak lompatan yang melanggar urutan dan menyebutkan alasannya.
 *
 * Murni dan deterministik: tanpa React, tanpa jaringan. Diuji di scripts/uji-lab-kelas1.mjs.
 */

export type KeadaanTambah = "pesan" | "kotakA" | "kotakB" | "gabung" | "hasil" | "selesai";

export const URUT_TAMBAH: KeadaanTambah[] = ["pesan", "kotakA", "kotakB", "gabung", "hasil", "selesai"];

export const NAMA_TAMBAH: Record<KeadaanTambah, string> = {
  pesan: "Pesanan",
  kotakA: "Kotak A",
  kotakB: "Kotak B",
  gabung: "Gabung",
  hasil: "Hasil",
  selesai: "Selesai",
};

export const PESANAN: { a: number; b: number }[] = [
  { a: 3, b: 4 },
  { a: 6, b: 3 },
  { a: 5, b: 5 },
];

export const KAPASITAS = 10;

export type MesinTambah = {
  ronde: number;
  keadaan: KeadaanTambah;
  a: number;
  b: number;
  digabung: boolean;
  riwayat: string[];
  pesan: string;
  ditolak: number;
};

export type PeristiwaTambah =
  | { t: "TERIMA" }
  | { t: "UBAH"; k: "a" | "b"; delta: 1 | -1 }
  | { t: "GABUNG" }
  | { t: "JAWAB"; nilai: number }
  | { t: "LOMPAT"; ke: KeadaanTambah }
  | { t: "ULANG" };

export const pesananRonde = (ronde: number) => PESANAN[((ronde % PESANAN.length) + PESANAN.length) % PESANAN.length];

export const awalTambah = (ronde = 0): MesinTambah => ({ ronde, keadaan: "pesan", a: 0, b: 0, digabung: false, riwayat: [], pesan: "", ditolak: 0 });

const indeks = (k: KeadaanTambah) => URUT_TAMBAH.indexOf(k);
const tolak = (m: MesinTambah, pesan: string): MesinTambah => ({ ...m, pesan, ditolak: m.ditolak + 1 });
const pindah = (m: MesinTambah, ke: KeadaanTambah): MesinTambah => ({
  ...m,
  keadaan: ke,
  pesan: "",
  riwayat: [...m.riwayat, `${NAMA_TAMBAH[m.keadaan]} → ${NAMA_TAMBAH[ke]}`].slice(-10),
});

/** Alasan mesin belum boleh maju dari keadaan sekarang. Null bila syaratnya terpenuhi. */
export function halanganTambah(m: MesinTambah): string | null {
  const p = pesananRonde(m.ronde);
  switch (m.keadaan) {
    case "pesan":
      return "Terima pesanannya dulu. Mesin belum tahu harus mengisi berapa.";
    case "kotakA":
      return m.a === p.a ? null : `Kotak A harus berisi ${p.a} bola merah. Sekarang isinya ${m.a}.`;
    case "kotakB":
      return m.b === p.b ? null : `Kotak B harus berisi ${p.b} bola biru. Sekarang isinya ${m.b}.`;
    case "gabung":
      return m.digabung ? null : "Tekan tombol Gabungkan dulu. Kedua kotak belum disatukan.";
    case "hasil":
      return "Jawab dulu: semuanya ada berapa?";
    case "selesai":
      return "Pesanan sudah selesai. Ambil pesanan baru untuk lanjut.";
  }
}

export function langkahTambah(m: MesinTambah, p: PeristiwaTambah): MesinTambah {
  const pes = pesananRonde(m.ronde);
  switch (p.t) {
    case "TERIMA":
      if (m.keadaan !== "pesan") return tolak(m, "Pesanan sudah diterima.");
      return pindah(m, "kotakA");

    case "UBAH": {
      const sasaran: KeadaanTambah = p.k === "a" ? "kotakA" : "kotakB";
      if (m.keadaan !== sasaran) return tolak(m, `Kotak ${p.k === "a" ? "A" : "B"} hanya bisa diisi di stasiun ${NAMA_TAMBAH[sasaran]}.`);
      const lama = m[p.k];
      const baru = lama + p.delta;
      if (baru < 0) return m;
      if (baru > KAPASITAS) return tolak(m, `Kotak paling banyak berisi ${KAPASITAS}.`);
      return { ...m, [p.k]: baru, pesan: "" };
    }

    case "GABUNG":
      if (m.keadaan !== "gabung") return tolak(m, `Menggabungkan baru bisa di stasiun Gabung, bukan di stasiun ${NAMA_TAMBAH[m.keadaan]}.`);
      if (m.digabung) return m;
      return { ...m, digabung: true, pesan: "", riwayat: [...m.riwayat, `Gabung: ${m.a} + ${m.b}`].slice(-10) };

    case "JAWAB": {
      if (m.keadaan !== "hasil") return tolak(m, "Jawaban hasil baru diminta di stasiun Hasil.");
      if (p.nilai !== pes.a + pes.b) return tolak(m, `Belum tepat. Hitung semua bola di kotak gabungan: ${pes.a} ditambah ${pes.b}.`);
      return pindah(m, "selesai");
    }

    case "LOMPAT": {
      const dari = indeks(m.keadaan);
      const ke = indeks(p.ke);
      if (ke === dari) return m;
      if (m.keadaan === "selesai") return tolak(m, "Pesanan sudah selesai. Ambil pesanan baru untuk lanjut.");
      if (ke < dari) return pindah(m, p.ke);
      if (ke > dari + 1) return tolak(m, `Mesin tidak bisa melompat ke ${NAMA_TAMBAH[p.ke]}. Selesaikan stasiun ${NAMA_TAMBAH[m.keadaan]} dulu.`);
      const halangan = halanganTambah(m);
      if (halangan) return tolak(m, halangan);
      return pindah(m, p.ke);
    }

    case "ULANG":
      if (m.keadaan !== "selesai") return tolak(m, "Selesaikan dulu pesanan ini.");
      return awalTambah(m.ronde + 1);
  }
}

/** Pilihan jawaban hasil: sebelum, benar, sesudah; urutan diputar menurut pesanan. */
export function pilihanHasil(ronde: number): number[] {
  const p = pesananRonde(ronde);
  const c = p.a + p.b;
  const dasar = c >= KAPASITAS ? [c - 2, c - 1, c] : [c - 1, c, c + 1];
  const putar = c % 3;
  return dasar.map((_, k) => dasar[(k + putar) % 3]);
}
