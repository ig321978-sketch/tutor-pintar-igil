/**
 * Data Infografis Kelas 4 Bab 1 Sub-Bab C "Papan Dermaga Kak Tiara": DUA kartu, tiap kartu satu layar tanpa gulir, semuanya dari angka Story C
 * (pengunjung Pantai Barat 4.358, Pantai Timur 4.385, Pantai Selatan 4.538).
 * Kartu 1 "Panggung pantai" = tiga balok bertinggi naik (Barat, Timur, Selatan); urutan dan tempat pembeda tiap pantai tertutup.
 * Kartu 2 "Garis bilangan dermaga" = tiga titik pada garis; dua tanda di antara titik dan dua urutan (kecil ke besar, besar ke kecil) tertutup. Digital saja. Diuji: scripts/uji-dermaga-k4b1c.mjs.
 */
import { kataBilK4B1 } from "../eja-k4b1";

export type SelInfo = { id: string; tampil: string; suara: string };

export const titik = (n: number): string => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".");

export const TEMPAT_BANDING = ["ribuan", "ratusan", "puluhan", "satuan"] as const;
export type Tanda = "<" | ">" | "=";
export const KATA_TANDA: Record<Tanda, string> = { "<": "kurang dari", ">": "lebih dari", "=": "sama dengan" };

/** Pengunjung tiga pantai di Story C, urut dari yang paling sedikit. */
export const PANTAI = [
  { id: "barat", nama: "Barat", jumlah: 4358, ikon: "\u{26F5}" },
  { id: "timur", nama: "Timur", jumlah: 4385, ikon: "\u{1F6A4}" },
  { id: "selatan", nama: "Selatan", jumlah: 4538, ikon: "\u{1F6F6}" },
] as const;

/** Bandingkan dua bilangan empat angka dari kiri: tempat pertama yang berbeda (atau null kalau sama), kedua angkanya, dan tandanya. */
export function bandingkan(a: number, b: number): { indeks: number; tempat: (typeof TEMPAT_BANDING)[number] | null; angkaA: number; angkaB: number; tanda: Tanda } {
  const da = String(a).padStart(4, "0").split("").map(Number);
  const db = String(b).padStart(4, "0").split("").map(Number);
  for (let i = 0; i < 4; i += 1) {
    if (da[i] !== db[i]) return { indeks: i, tempat: TEMPAT_BANDING[i], angkaA: da[i], angkaB: db[i], tanda: da[i] < db[i] ? "<" : ">" };
  }
  return { indeks: 4, tempat: null, angkaA: da[3], angkaB: db[3], tanda: "=" };
}

export type KolomPantai = { id: string; nama: string; ikon: string; jumlah: number; tinggi: number; urutan: SelInfo; beda: SelInfo };

const NAMA_URUTAN = ["paling sedikit", "di tengah", "paling banyak"];

export const KOLOM_PANTAI: readonly KolomPantai[] = PANTAI.map((p, i) => {
  const lawan = PANTAI[i < PANTAI.length - 1 ? i + 1 : i - 1];
  const b = bandingkan(p.jumlah, lawan.jumlah);
  const sama = TEMPAT_BANDING.slice(0, b.indeks);
  const dan = sama.length === 0 ? "" : sama.length === 1 ? `${sama[0]} sama, ` : `${sama.slice(0, -1).join(", ")} dan ${sama[sama.length - 1]} sama, `;
  return {
    id: p.id,
    nama: p.nama,
    ikon: p.ikon,
    jumlah: p.jumlah,
    tinggi: 60 + i * 14,
    urutan: { id: `k-${p.id}-urut`, tampil: NAMA_URUTAN[i], suara: `Pantai ${p.nama} ${NAMA_URUTAN[i]} pengunjungnya.` },
    beda: {
      id: `k-${p.id}-beda`,
      tampil: `${b.tempat} ${b.angkaA} ${b.tanda} ${b.angkaB}`,
      suara: `Pantai ${p.nama} dibanding Pantai ${lawan.nama}: ${dan}beda di ${b.tempat}. ${kataBilK4B1(b.angkaA)} ${KATA_TANDA[b.tanda]} ${kataBilK4B1(b.angkaB)}.`,
    },
  };
});

/** Kartu 2: tanda antara titik berurutan dan dua urutan. */
export const TANDA_GARIS: readonly { id: string; tanda: Tanda; sel: SelInfo }[] = [0, 1].map((i) => {
  const a = PANTAI[i];
  const b = PANTAI[i + 1];
  const t = bandingkan(a.jumlah, b.jumlah).tanda;
  return { id: `g-tanda-${i}`, tanda: t, sel: { id: `g-tanda-${i}`, tampil: t, suara: `${kataBilK4B1(a.jumlah)} ${KATA_TANDA[t]} ${kataBilK4B1(b.jumlah)}.` } };
});
const naik = PANTAI.map((p) => p.jumlah);
const turun = [...naik].reverse();
export const URUT_NAIK: SelInfo = { id: "g-naik", tampil: naik.map(titik).join(", "), suara: `Dari terkecil ke terbesar: ${naik.map(kataBilK4B1).join(", ")}.` };
export const URUT_TURUN: SelInfo = { id: "g-turun", tampil: turun.map(titik).join(", "), suara: `Dari terbesar ke terkecil: ${turun.map(kataBilK4B1).join(", ")}.` };
export const ACUAN_GARIS = "Kecil di kiri, besar di kanan. Mulut tanda menghadap bilangan yang lebih besar.";

export const JUDUL_KARTU1_DERMAGA = "Panggung pantai Kak Tiara";
export const JUDUL_KARTU2_DERMAGA = "Garis bilangan dermaga";
export const PETUNJUK1_INFO_DERMAGA = "Ketuk tanda tanya untuk melihat urutan dan pembeda.";
export const PETUNJUK2_INFO_DERMAGA = "Ketuk tanda tanya untuk melihat tanda dan urutan.";
export const SELESAI1_INFO_DERMAGA = "Panggung lengkap! Tekan BERIKUTNYA.";
export const SELESAI2_INFO_DERMAGA = "Garis lengkap! Kamu sudah bisa membandingkan dan mengurutkan.";
