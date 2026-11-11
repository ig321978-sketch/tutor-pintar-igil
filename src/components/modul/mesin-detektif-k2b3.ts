/**
 * Mesin Tiga Pertanyaan (Kelas 2 Bab 3, Sub-Bab A): mesin keadaan detektif bentuk.
 * Tiap bentuk misterius melewati stasiun berurutan:
 *   Tepi (garis lurus atau lengkung?) -> Ciri (hitung sisi, atau uji putar) -> Nama -> bentuk berikutnya.
 * Mesin menolak langkah yang melompati pertanyaan dan memberi petunjuk, tanpa hukuman.
 * Murni: tanpa React, tanpa jaringan. Diuji di scripts/uji-lab-k2b3.mjs.
 */

export type TepiDet = "lurus" | "lengkung";
export type KeadaanDet = "tepi" | "ciri" | "nama" | "sudah" | "selesai";

export type DefDetektif = {
  id: string;
  nama: string;
  tepi: TepiDet;
  /** Banyak sisi lurus (0 untuk bentuk lengkung). */
  sisi: number;
  /** Bentuk lengkung: pas dengan cetakannya pada putaran berapa pun? */
  pas: boolean;
  pengecoh: [string, string];
};

/** Empat bentuk misterius: dua segi banyak dan dua bentuk lengkung, supaya kedua jalur dilewati. */
export const BENTUK_DETEKTIF: DefDetektif[] = [
  { id: "segi5", nama: "Segi lima", tepi: "lurus", sisi: 5, pas: false, pengecoh: ["Segi empat", "Segi enam"] },
  { id: "lingkaran", nama: "Lingkaran", tepi: "lengkung", sisi: 0, pas: true, pengecoh: ["Bentuk lonjong", "Segi enam"] },
  { id: "segi3", nama: "Segitiga", tepi: "lurus", sisi: 3, pas: false, pengecoh: ["Segi empat", "Segi lima"] },
  { id: "lonjong", nama: "Bentuk lonjong", tepi: "lengkung", sisi: 0, pas: false, pengecoh: ["Lingkaran", "Segitiga"] },
];

export const STASIUN_DETEKTIF = [
  { id: "tepi", nama: "Tepi", ikon: "🔍" },
  { id: "ciri", nama: "Ciri", ikon: "📏" },
  { id: "nama", nama: "Nama", ikon: "🏷️" },
  { id: "selesai", nama: "Selesai", ikon: "🏁" },
];

export const NAMA_DET: Record<KeadaanDet, string> = {
  tepi: "Tepi",
  ciri: "Ciri",
  nama: "Nama",
  sudah: "Selesai",
  selesai: "Selesai",
};

export type Detektif = {
  daftar: DefDetektif[];
  misi: number;
  keadaan: KeadaanDet;
  jalur: TepiDet | null;
  riwayat: string[];
  pesan: string;
  ditolak: number;
  selesai: boolean;
};

export type PeristiwaDet =
  | { t: "TEPI"; nilai: TepiDet }
  | { t: "SISI"; nilai: number }
  | { t: "PUTAR"; nilai: "selalu" | "tidak" }
  | { t: "NAMA"; nilai: string }
  | { t: "LANJUT" }
  | { t: "LOMPAT"; ke: number }
  | { t: "ULANG" };

export const awalDetektif = (daftar: DefDetektif[] = BENTUK_DETEKTIF): Detektif => ({
  daftar,
  misi: 0,
  keadaan: "tepi",
  jalur: null,
  riwayat: [],
  pesan: "",
  ditolak: 0,
  selesai: false,
});

export const bentukAktif = (x: Detektif): DefDetektif => x.daftar[x.misi];

/** Indeks stasiun pada peta (Tepi, Ciri, Nama, Selesai). */
export const indeksStasiun = (k: KeadaanDet): number => ({ tepi: 0, ciri: 1, nama: 2, sudah: 3, selesai: 3 })[k];

const tolak = (x: Detektif, pesan: string): Detektif => ({ ...x, pesan, ditolak: x.ditolak + 1 });
const pindah = (x: Detektif, ke: KeadaanDet, tambah: Partial<Detektif> = {}): Detektif => ({
  ...x,
  ...tambah,
  keadaan: ke,
  pesan: "",
  riwayat: [...x.riwayat, `${NAMA_DET[x.keadaan]} → ${NAMA_DET[ke]}`].slice(-10),
});

const rotasi = <T>(a: T[], k: number): T[] => a.map((_, i) => a[(i + k) % a.length]);

/** Tiga pilihan banyak sisi: satu kurang, benar, satu lebih. Letak jawaban benar berputar menurut bentuk ke-berapa. */
export const pilihanSisi = (d: DefDetektif, misi: number): number[] => rotasi([d.sisi - 1, d.sisi, d.sisi + 1], misi % 3);

/** Tiga pilihan nama. Letak jawaban benar berputar menurut bentuk ke-berapa. */
export const pilihanNama = (d: DefDetektif, misi: number): string[] => rotasi([d.nama, ...d.pengecoh], misi % 3);

export function ciriRingkas(d: DefDetektif): string {
  if (d.tepi === "lurus") return `${d.nama} punya ${d.sisi} sisi lurus.`;
  return d.pas ? `${d.nama} dibatasi garis lengkung dan selalu pas bila diputar.` : `${d.nama} dibatasi garis lengkung, tetapi tidak selalu pas bila diputar.`;
}

export function petunjukDet(x: Detektif): string {
  const d = bentukAktif(x);
  switch (x.keadaan) {
    case "tepi":
      return "Pertanyaan satu: tepi bentuk ini garis lurus atau garis lengkung?";
    case "ciri":
      return x.jalur === "lurus" ? "Pertanyaan dua: hitung sisi lurusnya. Tandai satu sisi sebagai awal." : "Pertanyaan tiga: diputar di atas cetakannya, apakah bentuk ini selalu pas?";
    case "nama":
      return "Sebut namanya dari ciri yang sudah kamu temukan.";
    case "sudah":
      return `Betul! ${d.nama}. ${ciriRingkas(d)}`;
    default:
      return "Semua bentuk misterius sudah dikenali.";
  }
}

function tolakSalahTempat(x: Detektif): Detektif {
  switch (x.keadaan) {
    case "tepi":
      return tolak(x, "Tanya pertama dulu: tepinya garis lurus atau garis lengkung?");
    case "ciri":
      return tolak(x, x.jalur === "lurus" ? "Tepinya garis lurus, jadi hitung sisinya dulu." : "Tepinya garis lengkung, jadi uji putar dulu.");
    case "nama":
      return tolak(x, "Ciri sudah ditemukan. Sekarang sebut namanya.");
    case "sudah":
      return tolak(x, "Bentuk ini sudah dikenali. Tekan lanjut ke bentuk berikutnya.");
    default:
      return tolak(x, "Semua bentuk sudah selesai. Main lagi kalau mau.");
  }
}

/** Satu langkah mesin. Selalu mengembalikan objek baru. */
export function langkahDet(x: Detektif, p: PeristiwaDet): Detektif {
  const d = bentukAktif(x);
  switch (p.t) {
    case "TEPI": {
      if (x.keadaan !== "tepi") return tolakSalahTempat(x);
      if (p.nilai !== d.tepi) {
        return tolak(x, d.tepi === "lurus" ? "Telusuri tepinya dengan jari. Tepi bentuk ini garis lurus semua." : "Telusuri tepinya dengan jari. Tepi bentuk ini melengkung, tidak ada garis lurus.");
      }
      return pindah(x, "ciri", { jalur: d.tepi });
    }
    case "SISI": {
      if (x.keadaan !== "ciri" || x.jalur !== "lurus") return tolakSalahTempat(x);
      if (p.nilai !== d.sisi) return tolak(x, "Hitung lagi. Tandai satu sisi sebagai awal, lalu hitung berputar sampai kembali. Setiap sisi dihitung satu kali.");
      return pindah(x, "nama");
    }
    case "PUTAR": {
      if (x.keadaan !== "ciri" || x.jalur !== "lengkung") return tolakSalahTempat(x);
      if ((p.nilai === "selalu") !== d.pas) {
        return tolak(x, d.pas ? "Putar lagi dan perhatikan cetakannya. Lingkaran bulat sempurna, jadi selalu pas." : "Putar lagi dan perhatikan cetakannya. Bentuk lonjong tidak selalu pas.");
      }
      return pindah(x, "nama");
    }
    case "NAMA": {
      if (x.keadaan !== "nama") return tolakSalahTempat(x);
      if (p.nilai !== d.nama) return tolak(x, `Bukan itu. Cocokkan nama dengan cirinya: ${ciriRingkas(d)}`);
      return pindah(x, "sudah");
    }
    case "LANJUT": {
      if (x.keadaan !== "sudah") return tolakSalahTempat(x);
      if (x.misi + 1 < x.daftar.length) return pindah(x, "tepi", { misi: x.misi + 1, jalur: null });
      return pindah(x, "selesai", { selesai: true });
    }
    case "LOMPAT": {
      if (p.ke === indeksStasiun(x.keadaan)) return x;
      return tolak(x, "Mesin berjalan berurutan: tepi, ciri, nama. Jawab pertanyaan yang sekarang dulu.");
    }
    case "ULANG":
      return x.selesai ? awalDetektif(x.daftar) : x;
  }
}
