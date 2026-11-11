/**
 * Mesin Tebak Banyak (Kelas 2 Bab 7, Sub-Bab A): mesin keadaan.
 * Tiap kumpulan benda melewati stasiun berurutan: Tebak (kira-kira berapa banyak?) -> Kelompokkan (ikat sepuluh-sepuluh)
 * -> Hitung (puluhan dan satuan lepas jadi berapa?) -> Selesai. Menebak selalu diterima, karena menebak bukan kesalahan.
 * Yang ditolak mesin adalah mengelompokkan atau menghitung sebelum menebak, dan menghitung sebelum semua sepuluh diikat.
 * Selisih tebakan dibandingkan dengan tebakan lain: tebakan yang paling dekat adalah yang paling baik.
 * Murni: tanpa React, tanpa jaringan, tanpa impor nilai. Diuji di scripts/uji-lab-k2b7.mjs.
 */

export type JenisBanyak = "ikan" | "jeruk" | "anggur" | "titik";
export type KeadaanMesinBanyak = "tebak" | "kelompok" | "hitung" | "sudah" | "selesai";

export const NAMA_JENIS_BANYAK: Record<JenisBanyak, string> = {
  ikan: "ikan hias",
  jeruk: "jeruk",
  anggur: "anggur",
  titik: "titik",
};

export type DefBanyak = { id: string; jenis: JenisBanyak; n: number; opsi: [number, number, number] };

/** Lima kumpulan. Tiga tebakan tiap kumpulan sudah tetap, dan tebakan terdekat selalu satu saja (tidak seri). */
export const KASUS_BANYAK: DefBanyak[] = [
  { id: "ikan-62", jenis: "ikan", n: 62, opsi: [40, 60, 80] },
  { id: "jeruk-38", jenis: "jeruk", n: 38, opsi: [20, 40, 60] },
  { id: "anggur-85", jenis: "anggur", n: 85, opsi: [50, 70, 90] },
  { id: "titik-47", jenis: "titik", n: 47, opsi: [30, 50, 70] },
  { id: "titik-76", jenis: "titik", n: 76, opsi: [60, 80, 100] },
];

export const STASIUN_MESIN_BANYAK = [
  { id: "tebak", nama: "Tebak", ikon: "🤔" },
  { id: "kelompok", nama: "Kelompokkan", ikon: "🎀" },
  { id: "hitung", nama: "Hitung", ikon: "🔢" },
  { id: "selesai", nama: "Selesai", ikon: "🏁" },
];

export const NAMA_KEADAAN_BANYAK: Record<KeadaanMesinBanyak, string> = { tebak: "Tebak", kelompok: "Kelompokkan", hitung: "Hitung", sudah: "Selesai", selesai: "Selesai" };

export const selisihBanyak = (tebak: number, nyata: number): number => Math.abs(tebak - nyata);

/** Tebakan yang paling dekat dengan banyak sebenarnya. */
export const terdekatBanyak = (d: DefBanyak): number => d.opsi.reduce((a, b) => (selisihBanyak(b, d.n) < selisihBanyak(a, d.n) ? b : a));

const rotasi = <T,>(a: T[], k: number): T[] => a.map((_, i) => a[(i + k) % a.length]);

/** Tiga tebakan. Urutannya berputar menurut nomor kumpulan. */
export const opsiTebakBanyak = (d: DefBanyak, misi: number): number[] => rotasi([...d.opsi], misi % 3);

/** Tiga pilihan banyak seluruhnya: benar, angka tertukar, dan sepuluh lebihnya atau kurangnya. Urutannya berputar. */
export function opsiHitungBanyak(d: DefBanyak, misi: number): number[] {
  const tukar = (d.n % 10) * 10 + Math.floor(d.n / 10);
  const lain = d.n + 10 <= 100 ? d.n + 10 : d.n - 10;
  return rotasi([d.n, tukar, lain], (misi + 1) % 3);
}

export type MesinBanyak = {
  daftar: DefBanyak[];
  misi: number;
  keadaan: KeadaanMesinBanyak;
  tebakan: number | null;
  /** Berapa sepuluh yang sudah diikat pada kumpulan ini. */
  ikat: number;
  /** Benda yang masih lepas. */
  lepas: number;
  riwayat: string[];
  pesan: string;
  ditolak: number;
  /** Berapa kali tebakan anak adalah yang paling dekat. */
  tepat: number;
  selesai: boolean;
};

export type PeristiwaMesinBanyak =
  | { t: "TEBAK"; nilai: number }
  | { t: "IKAT" }
  | { t: "SIAP" }
  | { t: "JAWAB"; nilai: number }
  | { t: "LANJUT" }
  | { t: "LOMPAT"; ke: number }
  | { t: "ULANG" };

export const awalMesinBanyak = (daftar: DefBanyak[] = KASUS_BANYAK): MesinBanyak => ({
  daftar,
  misi: 0,
  keadaan: "tebak",
  tebakan: null,
  ikat: 0,
  lepas: daftar[0].n,
  riwayat: [],
  pesan: "",
  ditolak: 0,
  tepat: 0,
  selesai: false,
});

export const kasusBanyak = (x: MesinBanyak): DefBanyak => x.daftar[x.misi];
export const indeksStasiunBanyak = (k: KeadaanMesinBanyak): number => ({ tebak: 0, kelompok: 1, hitung: 2, sudah: 3, selesai: 3 })[k];

const tolak = (x: MesinBanyak, pesan: string): MesinBanyak => ({ ...x, pesan, ditolak: x.ditolak + 1 });
const pindah = (x: MesinBanyak, ke: KeadaanMesinBanyak, tambah: Partial<MesinBanyak> = {}): MesinBanyak => ({
  ...x,
  ...tambah,
  keadaan: ke,
  pesan: "",
  riwayat: [...x.riwayat, `${NAMA_KEADAAN_BANYAK[x.keadaan]} → ${NAMA_KEADAAN_BANYAK[ke]}`].slice(-10),
});

/** Ringkasan satu kumpulan setelah dihitung: selisih tebakan dan tebakan yang paling dekat. */
export function ringkasBanyak(d: DefBanyak, tebakan: number | null): string {
  const nama = NAMA_JENIS_BANYAK[d.jenis];
  const dasar = `Ada ${Math.floor(d.n / 10)} puluhan dan ${d.n % 10} satuan, yaitu ${d.n} ${nama}.`;
  if (tebakan === null) return dasar;
  const sel = selisihBanyak(tebakan, d.n);
  const dekat = terdekatBanyak(d);
  const hasil = sel === 0 ? `Tebakanmu ${tebakan} tepat sekali.` : `Tebakanmu ${tebakan}, selisihnya ${sel} dari ${d.n}.`;
  const banding =
    tebakan === dekat
      ? " Itu tebakan yang paling dekat. Membayangkan kelompok sepuluh membuat tebakan makin dekat."
      : ` Tebakan yang paling dekat adalah ${dekat}, selisihnya ${selisihBanyak(dekat, d.n)}. Menebak boleh keliru.`;
  return `${dasar} ${hasil}${banding}`;
}

export function petunjukMesinBanyak(x: MesinBanyak): string {
  const d = kasusBanyak(x);
  const nama = NAMA_JENIS_BANYAK[d.jenis];
  switch (x.keadaan) {
    case "tebak":
      return `Tebak dulu: kira-kira berapa banyak ${nama} ini? Tidak ada tebakan yang salah.`;
    case "kelompok":
      return x.lepas >= 10 ? `Ikat sepuluh-sepuluh. Masih ada ${x.lepas} yang lepas.` : `Tidak ada lagi sepuluh yang bisa diikat. Sisa ${x.lepas} lepas. Tekan Siap menghitung.`;
    case "hitung":
      return `Ada ${x.ikat} puluhan dan ${x.lepas} satuan lepas. Pilih banyak ${nama} seluruhnya.`;
    case "sudah":
      return `Betul! ${ringkasBanyak(d, x.tebakan)}`;
    default:
      return "Semua kumpulan sudah dihitung.";
  }
}

function tolakSalahTempat(x: MesinBanyak, p: PeristiwaMesinBanyak): MesinBanyak {
  switch (x.keadaan) {
    case "tebak":
      return tolak(x, p.t === "IKAT" || p.t === "SIAP" ? "Tebak dulu sebelum mengelompokkan. Kira-kira berapa banyaknya?" : "Tebak dulu sebelum menghitung. Kira-kira berapa banyaknya?");
    case "kelompok":
      if (p.t === "JAWAB") return tolak(x, "Kelompokkan dulu sepuluh-sepuluh, baru dihitung. Hitung lebih mudah setelah dikelompokkan.");
      return tolak(x, "Benda sudah ditebak. Sekarang ikat sepuluh-sepuluh.");
    case "hitung":
      return tolak(x, "Benda sudah dikelompokkan. Sekarang pilih banyak seluruhnya.");
    case "sudah":
      return tolak(x, "Kumpulan ini sudah selesai. Tekan lanjut ke kumpulan berikutnya.");
    default:
      return tolak(x, "Semua kumpulan sudah selesai. Main lagi kalau mau.");
  }
}

/** Satu langkah mesin. Selalu mengembalikan objek baru. */
export function langkahMesinBanyak(x: MesinBanyak, p: PeristiwaMesinBanyak): MesinBanyak {
  const d = kasusBanyak(x);
  switch (p.t) {
    case "TEBAK": {
      if (x.keadaan !== "tebak") return tolakSalahTempat(x, p);
      if (!d.opsi.includes(p.nilai)) return tolak(x, "Pilih salah satu tebakan yang tersedia.");
      return pindah(x, "kelompok", { tebakan: p.nilai, ikat: 0, lepas: d.n });
    }
    case "IKAT": {
      if (x.keadaan !== "kelompok") return tolakSalahTempat(x, p);
      if (x.lepas < 10) return tolak(x, "Sisanya kurang dari sepuluh, jadi tidak bisa diikat lagi. Tekan Siap menghitung.");
      return { ...x, ikat: x.ikat + 1, lepas: x.lepas - 10, pesan: "" };
    }
    case "SIAP": {
      if (x.keadaan !== "kelompok") return tolakSalahTempat(x, p);
      if (x.lepas >= 10) return tolak(x, `Masih ada ${x.lepas} yang lepas, dan itu cukup untuk diikat lagi. Ikat dulu.`);
      return pindah(x, "hitung");
    }
    case "JAWAB": {
      if (x.keadaan !== "hitung") return tolakSalahTempat(x, p);
      if (p.nilai !== d.n) return tolak(x, `Belum tepat. Ada ${x.ikat} puluhan, yaitu ${x.ikat * 10}. Lalu tambahkan ${x.lepas} yang lepas.`);
      return pindah(x, "sudah", { tepat: x.tepat + (x.tebakan === terdekatBanyak(d) ? 1 : 0) });
    }
    case "LANJUT": {
      if (x.keadaan !== "sudah") return tolakSalahTempat(x, p);
      if (x.misi + 1 < x.daftar.length) {
        const baru = x.daftar[x.misi + 1];
        return pindah(x, "tebak", { misi: x.misi + 1, tebakan: null, ikat: 0, lepas: baru.n });
      }
      return pindah(x, "selesai", { selesai: true, tebakan: null });
    }
    case "LOMPAT": {
      if (p.ke === indeksStasiunBanyak(x.keadaan)) return x;
      return tolak(x, "Mesin berjalan berurutan: tebak, kelompokkan, hitung. Selesaikan stasiun yang sekarang dulu.");
    }
    case "ULANG":
      return x.selesai ? awalMesinBanyak(x.daftar) : x;
  }
}
