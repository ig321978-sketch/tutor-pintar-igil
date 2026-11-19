/**
 * Data Simulasi Lapangan Sudut Kelas 3 Bab 4 Sub-Bab B "Sudut Kak Anton", tengah cerita Festival Layang-layang Kampung.
 * Besar sudut berbeda dari Story (90, 50, 130, 120, 300, 60) kecuali sudut acuan siku-siku dan lurus. Mind-map dan Infografis memakai data kartu (data-kartu.ts).
 * Diuji: scripts/uji-sudut-k3b4b.mjs.
 */
export type JenisSudut = "lancip" | "siku-siku" | "tumpul" | "lurus" | "refleks";
export const URUT_JENIS: readonly JenisSudut[] = ["lancip", "siku-siku", "tumpul", "lurus", "refleks"];

/** Jenis sudut menurut besarnya (derajat, 0 sampai 360). */
export function jenisDari(deg: number): JenisSudut {
  if (deg < 90) return "lancip";
  if (deg === 90) return "siku-siku";
  if (deg < 180) return "tumpul";
  if (deg === 180) return "lurus";
  return "refleks";
}

/** Putar: kaki sudut diputar tiap sepuluh derajat untuk menemukan sudut dari jenis sasaran. `awal` = besar sudut saat sasaran dibuka (bukan jenis sasaran). */
export type TargetPutar = { jenis: JenisSudut; awal: number };
export const TARGET_PUTAR: readonly TargetPutar[] = [
  { jenis: "tumpul", awal: 30 },
  { jenis: "lancip", awal: 150 },
  { jenis: "refleks", awal: 40 },
  { jenis: "siku-siku", awal: 200 },
  { jenis: "lurus", awal: 100 },
];
export const LANGKAH_PUTAR = 10;
export const MIN_PUTAR = 10;
export const MAKS_PUTAR = 350;

/** Busur: sudut dengan kaki pertama di kanan atau kiri; busur harus dipasang dulu (titik tengah dan garis nol) sebelum alat mau membaca. */
export type SisiBusur = "kanan" | "kiri";
export type TargetBusur = { benda: string; deg: number; sisi: SisiBusur };
export const TARGET_BUSUR: readonly TargetBusur[] = [
  { benda: "tali bendera", deg: 70, sisi: "kanan" },
  { benda: "bilah pagar", deg: 140, sisi: "kiri" },
  { benda: "tiang tenda", deg: 40, sisi: "kanan" },
];

/** Jenis: sudut sudah digambar; anak memilih jenisnya (lancip, siku-siku, tumpul, lurus, refleks). */
export type TargetJenis = { benda: string; deg: number };
export const TARGET_JENIS: readonly TargetJenis[] = [
  { benda: "bilah layang-layang", deg: 35 },
  { benda: "tali lomba", deg: 105 },
  { benda: "kipas kertas", deg: 225 },
  { benda: "papan lurus", deg: 180 },
];

/** Pasangan: sudut refleks `refleks` berpasangan dengan sudut yang jumlahnya satu putaran penuh. */
export type TargetPasang = { refleks: number };
export const TARGET_PASANG: readonly TargetPasang[] = [{ refleks: 250 }, { refleks: 210 }, { refleks: 330 }];

export const MISI_SUDUT_TEKS = "Putar kaki sudut, pasang busur dari nol, baca derajatnya, pilih jenis sudut, lalu cari pasangan satu putaran.";
