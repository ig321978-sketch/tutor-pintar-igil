/**
 * Jembatan Sepuluh (Bab 6): simulasi mesin keadaan untuk strategi menjumlah melewati sepuluh.
 *
 * Keadaan: soal → pecah → genapkan → sisa → selesai.
 *  - pecah    : bilangan kedua (b) dipecah menjadi x dan y; x harus tepat cukup untuk menggenapkan a menjadi 10.
 *  - genapkan : a ditambah x sampai tepat 10 (anak menekan tombol Genapkan).
 *  - sisa     : 10 ditambah y; anak memilih hasil akhir.
 * Mesin menolak lompatan yang melanggar urutan dan menyebutkan alasannya.
 *
 * Murni dan deterministik: tanpa React, tanpa jaringan. Diuji di scripts/uji-lab-kelas1.mjs.
 */

export type KeadaanJembatan = "soal" | "pecah" | "genapkan" | "sisa" | "selesai";

export const URUT_JEMBATAN: KeadaanJembatan[] = ["soal", "pecah", "genapkan", "sisa", "selesai"];

export const NAMA_JEMBATAN: Record<KeadaanJembatan, string> = {
  soal: "Soal",
  pecah: "Pecah",
  genapkan: "Genapkan",
  sisa: "Sisa",
  selesai: "Selesai",
};

/** Soal: a di bawah 10 dan a + b melewati 10, sampai 20. */
export const SOAL_JEMBATAN: { a: number; b: number }[] = [
  { a: 8, b: 5 },
  { a: 9, b: 7 },
  { a: 6, b: 8 },
];

export const soalRonde = (ronde: number) => SOAL_JEMBATAN[((ronde % SOAL_JEMBATAN.length) + SOAL_JEMBATAN.length) % SOAL_JEMBATAN.length];

/** Bagian pertama yang benar: yang menggenapkan a menjadi 10. */
export const bagianPertama = (a: number) => 10 - a;

export type Jembatan = {
  ronde: number;
  keadaan: KeadaanJembatan;
  /** Pilihan anak untuk bagian pertama dari b. */
  x: number;
  genap: boolean;
  riwayat: string[];
  pesan: string;
  ditolak: number;
};

export type PeristiwaJembatan =
  | { t: "BACA" }
  | { t: "PECAH"; delta: 1 | -1 }
  | { t: "GENAPKAN" }
  | { t: "JAWAB"; nilai: number }
  | { t: "LOMPAT"; ke: KeadaanJembatan }
  | { t: "ULANG" };

export const awalJembatan = (ronde = 0): Jembatan => ({ ronde, keadaan: "soal", x: 0, genap: false, riwayat: [], pesan: "", ditolak: 0 });

const indeks = (k: KeadaanJembatan) => URUT_JEMBATAN.indexOf(k);
const tolak = (m: Jembatan, pesan: string): Jembatan => ({ ...m, pesan, ditolak: m.ditolak + 1 });
const pindah = (m: Jembatan, ke: KeadaanJembatan): Jembatan => ({
  ...m,
  keadaan: ke,
  pesan: "",
  riwayat: [...m.riwayat, `${NAMA_JEMBATAN[m.keadaan]} → ${NAMA_JEMBATAN[ke]}`].slice(-10),
});

/** Alasan mesin belum boleh maju dari keadaan sekarang. Null bila syaratnya terpenuhi. */
export function halanganJembatan(m: Jembatan): string | null {
  const s = soalRonde(m.ronde);
  switch (m.keadaan) {
    case "soal":
      return "Baca soalnya dulu. Mesin belum tahu harus menjembatani bilangan berapa.";
    case "pecah":
      return m.x === bagianPertama(s.a) ? null : `${s.a} butuh ${bagianPertama(s.a)} lagi untuk menjadi 10. Bagian pertama dari ${s.b} harus ${bagianPertama(s.a)}. Sekarang ${m.x}.`;
    case "genapkan":
      return m.genap ? null : `Tekan tombol Genapkan dulu. ${s.a} belum menjadi 10.`;
    case "sisa":
      return "Pilih dulu hasil akhirnya.";
    case "selesai":
      return "Soal sudah selesai. Ambil soal baru untuk lanjut.";
  }
}

export function langkahJembatan(m: Jembatan, p: PeristiwaJembatan): Jembatan {
  const s = soalRonde(m.ronde);
  switch (p.t) {
    case "BACA":
      if (m.keadaan !== "soal") return tolak(m, "Soal sudah dibaca.");
      return pindah(m, "pecah");

    case "PECAH": {
      if (m.keadaan !== "pecah") return tolak(m, `Memecah bilangan hanya bisa di stasiun Pecah, bukan di stasiun ${NAMA_JEMBATAN[m.keadaan]}.`);
      const baru = m.x + p.delta;
      if (baru < 0) return m;
      if (baru > s.b) return tolak(m, `Bagian pertama tidak boleh lebih dari ${s.b}.`);
      return { ...m, x: baru, pesan: "" };
    }

    case "GENAPKAN":
      if (m.keadaan !== "genapkan") return tolak(m, `Menggenapkan baru bisa di stasiun Genapkan, bukan di stasiun ${NAMA_JEMBATAN[m.keadaan]}.`);
      if (m.genap) return m;
      return { ...m, genap: true, pesan: "", riwayat: [...m.riwayat, `${s.a} + ${m.x} = 10`].slice(-10) };

    case "JAWAB": {
      if (m.keadaan !== "sisa") return tolak(m, "Hasil akhir baru diminta di stasiun Sisa.");
      const y = s.b - bagianPertama(s.a);
      if (p.nilai !== s.a + s.b) return tolak(m, `Belum tepat. Sekarang kamu di 10. Tambahkan sisanya, ${y}: 10 + ${y}.`);
      return { ...pindah(m, "selesai"), riwayat: [...m.riwayat, `10 + ${y} = ${s.a + s.b}`, "Sisa → Selesai"].slice(-10) };
    }

    case "LOMPAT": {
      const dari = indeks(m.keadaan);
      const ke = indeks(p.ke);
      if (ke === dari) return m;
      if (m.keadaan === "selesai") return tolak(m, "Soal sudah selesai. Ambil soal baru untuk lanjut.");
      if (ke < dari) return pindah(m, p.ke);
      if (ke > dari + 1) return tolak(m, `Mesin tidak bisa melompat ke ${NAMA_JEMBATAN[p.ke]}. Selesaikan stasiun ${NAMA_JEMBATAN[m.keadaan]} dulu.`);
      const halangan = halanganJembatan(m);
      if (halangan) return tolak(m, halangan);
      return pindah(m, p.ke);
    }

    case "ULANG":
      if (m.keadaan !== "selesai") return tolak(m, "Selesaikan dulu soal ini.");
      return awalJembatan(m.ronde + 1);
  }
}

/** Pilihan hasil akhir: sebelum, benar, sesudah; urutan diputar menurut soal. */
export function pilihanSisa(ronde: number): number[] {
  const s = soalRonde(ronde);
  const c = s.a + s.b;
  const dasar = [c - 1, c, c + 1];
  const putar = c % 3;
  return dasar.map((_, k) => dasar[(k + putar) % 3]);
}
