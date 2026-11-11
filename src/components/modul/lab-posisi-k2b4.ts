/**
 * Lab Posisi (Kelas 2 Bab 4, Sub-Bab A): model PhET.
 * Satu benda ditaruh di salah satu dari enam tempat di sekitar satu benda acuan. Gambar, kalimat, kalimat lawan,
 * peta kotak polos, sudut pandang anak, dan tabel pasangan kata berubah bersama.
 * Murni: tanpa React, tanpa jaringan, tanpa impor nilai. Diuji di scripts/uji-lab-k2b4.mjs.
 */

export type KataPos = "atas" | "bawah" | "depan" | "belakang" | "kanan" | "kiri";

export const URUT_KATA: KataPos[] = ["atas", "bawah", "depan", "belakang", "kanan", "kiri"];

export const LAWAN: Record<KataPos, KataPos> = { atas: "bawah", bawah: "atas", depan: "belakang", belakang: "depan", kanan: "kiri", kiri: "kanan" };

/** Tiga pasangan kata berlawanan, urut seperti di buku. */
export const PASANGAN: [KataPos, KataPos][] = [
  ["atas", "bawah"],
  ["depan", "belakang"],
  ["kanan", "kiri"],
];

export type AcuanLab = "kotak" | "meja" | "kursi" | "pohon";
export type BendaLab = "bola" | "kucing" | "buku" | "burung";

export const URUT_ACUAN: AcuanLab[] = ["kotak", "meja", "kursi", "pohon"];
export const URUT_BENDA: BendaLab[] = ["bola", "kucing", "buku", "burung"];

export const NAMA_LAB: Record<AcuanLab | BendaLab, string> = {
  kotak: "kotak",
  meja: "meja",
  kursi: "kursi",
  pohon: "pohon",
  bola: "bola",
  kucing: "kucing",
  buku: "buku",
  burung: "burung",
};

export const AWAL_ACUAN: AcuanLab = "kotak";
export const AWAL_BENDA: BendaLab = "bola";

export const kapital = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/** "di atas" atau "di sebelah kiri". */
export const frasa = (kata: KataPos): string => (kata === "kanan" || kata === "kiri" ? `di sebelah ${kata}` : `di ${kata}`);

/** Kalimat baku: "Bola ada di atas kotak." */
export const kalimat = (benda: string, kata: KataPos, acuan: string): string => `${kapital(benda)} ada ${frasa(kata)} ${acuan}.`;

/** Kalimat lawan: acuan dilihat dari benda, memakai kata lawannya. */
export const kalimatLawan = (benda: string, kata: KataPos, acuan: string): string => kalimat(acuan, LAWAN[kata], benda);

export const kalimatKosong = (acuan: string) => `Taruh bendanya di sekitar ${acuan}. Pilih salah satu dari enam tempat.`;

/** Peta kotak 3 x 3: sel (baris, kolom) benda terhadap acuan di tengah. Depan dan belakang tidak punya sel di peta datar. */
export function selPeta(kata: KataPos): { b: number; k: number } | null {
  switch (kata) {
    case "atas":
      return { b: 0, k: 1 };
    case "bawah":
      return { b: 2, k: 1 };
    case "kiri":
      return { b: 1, k: 0 };
    case "kanan":
      return { b: 1, k: 2 };
    default:
      return null;
  }
}

export const lapisPeta = (kata: KataPos): "depan" | "belakang" | null => (kata === "depan" ? "depan" : kata === "belakang" ? "belakang" : null);

/** Kalimat sudut pandang untuk anak yang membelakangi kita. Anak menghadap arah yang sama, jadi kiri dan kanannya sama dengan kita. */
export function kalimatAnak(kata: KataPos | null): string {
  if (kata === "kiri" || kata === "kanan") {
    return `Anak ini membelakangi kita, jadi ia menghadap ke arah yang sama dengan kita. Sisi ${kata} anak sama dengan sisi ${kata} kita.`;
  }
  if (kata) return "Anak ini menghadap ke arah yang sama dengan kita, jadi kata ini tidak berubah baginya. Coba kanan atau kiri.";
  return "Anak ini membelakangi kita dan menghadap ke arah yang sama. Taruh benda di sebelah kanan atau kiri, lalu lihat.";
}

export const tandaiSudah = (sudah: readonly KataPos[], kata: KataPos): KataPos[] => (sudah.includes(kata) ? [...sudah] : [...sudah, kata]);

/** Ucapan untuk tombol suara. */
export function ucapanPosisi(acuan: string, benda: string, kata: KataPos | null, lawan: boolean): string {
  if (!kata) return kalimatKosong(acuan);
  const dasar = kalimat(benda, kata, acuan);
  return lawan ? `${dasar} ${kalimatLawan(benda, kata, acuan)}` : dasar;
}
