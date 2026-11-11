/**
 * Lab Petunjuk Ganda (Kelas 2 Bab 4, Sub-Bab A): model PhET.
 * Papan 3 x 3 berisi sembilan benda. Anak memilih satu benda sebagai "Aku", lalu menyusun petunjuk posisi
 * (kata posisi + benda acuan) satu per satu dan melihat berapa benda yang masih cocok.
 * Satu petunjuk sering belum cukup; dua sampai empat petunjuk bisa menyisakan satu benda.
 * Dua cara membaca petunjuk:
 *  - "mana": di atas berarti di baris yang lebih atas (di mana saja), dan seterusnya.
 *  - "tepat": hanya benda yang berdampingan langsung (seperti permainan Tebak Aku Apa?).
 * Murni: tanpa React, tanpa jaringan, tanpa impor nilai. Diuji di scripts/uji-lab-k2b4.mjs.
 */

export type Papan = "kamar" | "taman";
export type Mode = "mana" | "tepat";
export type ArahPet = "atas" | "bawah" | "kiri" | "kanan";
export type SelPet = { b: number; k: number };
export type PetunjukPet = { kata: ArahPet; acuan: string };

export const URUT_ARAH: ArahPet[] = ["atas", "bawah", "kiri", "kanan"];
export const URUT_PAPAN: Papan[] = ["kamar", "taman"];
/** Empat petunjuk cukup untuk menyisakan satu benda di mana pun letaknya (benda di tengah butuh empat). */
export const MAKS_PETUNJUK = 4;

export const NAMA_PAPAN: Record<Papan, string> = { kamar: "Rak Kamar", taman: "Papan Taman" };
export const NAMA_MODE: Record<Mode, string> = { mana: "Di mana saja", tepat: "Tepat di sebelahnya" };

/** Sembilan benda tiap papan, baris dari atas, kolom dari kiri. Semua nama unik. */
export const PAPAN_ISI: Record<Papan, string[][]> = {
  kamar: [
    ["jam", "buku", "tas"],
    ["boneka", "kotak", "pensil"],
    ["sepatu", "bola", "mobil"],
  ],
  taman: [
    ["kupu", "burung", "bunga"],
    ["rumput", "pohon", "kelinci"],
    ["ulat", "ayam", "kucing"],
  ],
};

export const NAMA_ISI: Record<string, string> = {
  jam: "jam", buku: "buku", tas: "tas", boneka: "boneka", kotak: "kotak", pensil: "pensil", sepatu: "sepatu", bola: "bola", mobil: "mobil-mobilan",
  kupu: "kupu-kupu", burung: "burung", bunga: "bunga", rumput: "rumput", pohon: "pohon", kelinci: "kelinci", ulat: "ulat", ayam: "ayam", kucing: "kucing",
};

export const semuaNama = (papan: Papan): string[] => PAPAN_ISI[papan].flat();

export function cariSel(papan: Papan, nama: string): SelPet | null {
  const g = PAPAN_ISI[papan];
  for (let b = 0; b < g.length; b += 1) for (let k = 0; k < g[b].length; k += 1) if (g[b][k] === nama) return { b, k };
  return null;
}

/** Sel yang berdampingan langsung dengan `a` pada arah `kata`, atau null bila di luar papan. */
export function selBerdampingan(a: SelPet, kata: ArahPet, ukuran = 3): SelPet | null {
  const geser: Record<ArahPet, [number, number]> = { atas: [-1, 0], bawah: [1, 0], kiri: [0, -1], kanan: [0, 1] };
  const s = { b: a.b + geser[kata][0], k: a.k + geser[kata][1] };
  return s.b >= 0 && s.b < ukuran && s.k >= 0 && s.k < ukuran ? s : null;
}

/** Apakah sel `x` memenuhi petunjuk "di <kata> <acuan di sel a>". Sel acuan sendiri tidak pernah cocok. */
export function cocokSel(mode: Mode, x: SelPet, a: SelPet, kata: ArahPet): boolean {
  if (x.b === a.b && x.k === a.k) return false;
  if (mode === "tepat") {
    const s = selBerdampingan(a, kata);
    return s !== null && s.b === x.b && s.k === x.k;
  }
  switch (kata) {
    case "atas":
      return x.b < a.b;
    case "bawah":
      return x.b > a.b;
    case "kiri":
      return x.k < a.k;
    default:
      return x.k > a.k;
  }
}

/** Benda yang memenuhi semua petunjuk. Tanpa petunjuk: semua benda. */
export function kandidat(papan: Papan, mode: Mode, petunjuk: readonly PetunjukPet[]): string[] {
  const hasil: string[] = [];
  PAPAN_ISI[papan].forEach((baris, b) =>
    baris.forEach((nama, k) => {
      const ok = petunjuk.every((p) => {
        const a = cariSel(papan, p.acuan);
        return a !== null && cocokSel(mode, { b, k }, a, p.kata);
      });
      if (ok) hasil.push(nama);
    })
  );
  return hasil;
}

export const frasaArah = (kata: ArahPet): string => (kata === "kiri" || kata === "kanan" ? `di sebelah ${kata}` : `di ${kata}`);

const namaIsi = (n: string) => NAMA_ISI[n] ?? n;

/** "Aku di atas jam, dan aku di sebelah kanan boneka." */
export function kalimatPetunjuk(petunjuk: readonly PetunjukPet[]): string {
  if (petunjuk.length === 0) return "Belum ada petunjuk.";
  const bagian = petunjuk.map((p, i) => `${i === 0 ? "Aku" : "aku"} ${frasaArah(p.kata)} ${namaIsi(p.acuan)}`);
  return `${bagian.join(", dan ")}.`;
}

/** Posisi sebenarnya `target` terhadap `acuan` dalam kata (untuk petunjuk saat salah). */
function letakSebenarnya(papan: Papan, target: string, acuan: string): string {
  const t = cariSel(papan, target);
  const a = cariSel(papan, acuan);
  if (!t || !a) return "";
  const bagian: string[] = [];
  if (t.b < a.b) bagian.push("di atas");
  if (t.b > a.b) bagian.push("di bawah");
  if (t.k < a.k) bagian.push("di sebelah kiri");
  if (t.k > a.k) bagian.push("di sebelah kanan");
  return bagian.length ? bagian.join(" dan ") : "";
}

export type LabPetunjuk = { papan: Papan; mode: Mode; target: string | null; petunjuk: PetunjukPet[] };
export type PerPet =
  | { t: "PAPAN"; nilai: Papan }
  | { t: "MODE"; nilai: Mode }
  | { t: "TARGET"; nama: string }
  | { t: "TAMBAH"; kata: ArahPet; acuan: string }
  | { t: "HAPUS"; i: number }
  | { t: "BERSIH" }
  | { t: "RESET" };
export type HasilPet = { x: LabPetunjuk; pesan: string; baik: boolean };

export const awalPetunjuk = (): LabPetunjuk => ({ papan: "kamar", mode: "mana", target: null, petunjuk: [] });

export const sisaPetunjuk = (x: LabPetunjuk): number => kandidat(x.papan, x.mode, x.petunjuk).length;

const benarUntukTarget = (x: LabPetunjuk, p: PetunjukPet): boolean => {
  if (!x.target) return false;
  const t = cariSel(x.papan, x.target);
  const a = cariSel(x.papan, p.acuan);
  return t !== null && a !== null && cocokSel(x.mode, t, a, p.kata);
};

/** Satu langkah laboratorium. Selalu mengembalikan objek baru. Salah tidak menghukum: hanya petunjuk. */
export function langkahPet(x: LabPetunjuk, p: PerPet): HasilPet {
  switch (p.t) {
    case "RESET":
      return { x: awalPetunjuk(), pesan: "", baik: true };
    case "BERSIH":
      return { x: { ...x, petunjuk: [] }, pesan: "Petunjuk dihapus. Benda yang cocok kembali semuanya.", baik: true };
    case "PAPAN":
      return { x: { papan: p.nilai, mode: x.mode, target: null, petunjuk: [] }, pesan: "", baik: true };
    case "MODE": {
      if (p.nilai === x.mode) return { x, pesan: "", baik: true };
      const baru: LabPetunjuk = { ...x, mode: p.nilai };
      const tetap = x.petunjuk.filter((q) => benarUntukTarget(baru, q));
      const hilang = x.petunjuk.length - tetap.length;
      return {
        x: { ...baru, petunjuk: tetap },
        pesan: hilang > 0 ? `${hilang} petunjuk dihapus karena tidak berlaku lagi dengan cara baca ini.` : "",
        baik: true,
      };
    }
    case "TARGET": {
      if (!semuaNama(x.papan).includes(p.nama)) return { x, pesan: "", baik: true };
      return { x: { ...x, target: p.nama, petunjuk: [] }, pesan: `${namaIsi(p.nama)} jadi Aku. Sekarang pilih kata posisi, lalu ketuk benda acuan.`, baik: true };
    }
    case "HAPUS": {
      if (p.i < 0 || p.i >= x.petunjuk.length) return { x, pesan: "", baik: true };
      return { x: { ...x, petunjuk: x.petunjuk.filter((_, i) => i !== p.i) }, pesan: "", baik: true };
    }
    case "TAMBAH": {
      if (!x.target) return { x, pesan: "Ketuk dulu satu benda sebagai Aku.", baik: false };
      if (p.acuan === x.target) return { x, pesan: "Benda acuan harus benda lain, bukan Aku sendiri.", baik: false };
      if (!cariSel(x.papan, p.acuan)) return { x, pesan: "", baik: false };
      if (x.petunjuk.some((q) => q.kata === p.kata && q.acuan === p.acuan)) return { x, pesan: "Petunjuk itu sudah ada. Coba petunjuk yang lain.", baik: false };
      if (x.petunjuk.length >= MAKS_PETUNJUK) return { x, pesan: `Paling banyak ${MAKS_PETUNJUK} petunjuk. Hapus satu dulu kalau mau mengganti.`, baik: false };
      const q: PetunjukPet = { kata: p.kata, acuan: p.acuan };
      if (!benarUntukTarget(x, q)) {
        const nyata = letakSebenarnya(x.papan, x.target, p.acuan);
        const sarat = x.mode === "tepat" ? " Pada cara Tepat di sebelahnya, benda harus berdampingan langsung." : "";
        return {
          x,
          pesan: nyata
            ? `${kapital(namaIsi(x.target))} tidak ${frasaArah(p.kata)} ${namaIsi(p.acuan)}. Ia ${nyata} ${namaIsi(p.acuan)}.${sarat}`
            : `${kapital(namaIsi(x.target))} sejajar dengan ${namaIsi(p.acuan)}, jadi petunjuk ini belum cocok. Coba benda acuan lain.${sarat}`,
          baik: false,
        };
      }
      const baru = { ...x, petunjuk: [...x.petunjuk, q] };
      const sisa = sisaPetunjuk(baru);
      return {
        x: baru,
        pesan: sisa === 1 ? "Hanya satu benda yang cocok. Petunjukmu sudah cukup!" : `Masih ada ${sisa} benda yang cocok. Tambah petunjuk lagi.`,
        baik: true,
      };
    }
  }
}

const kapital = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export function ucapanPetunjuk(x: LabPetunjuk): string {
  if (!x.target) return "Ketuk satu benda di papan sebagai Aku. Lalu susun petunjuk posisinya.";
  const sisa = sisaPetunjuk(x);
  if (x.petunjuk.length === 0) return `Aku adalah ${namaIsi(x.target)}. Pilih kata posisi, lalu ketuk benda acuan.`;
  const awal = kalimatPetunjuk(x.petunjuk);
  return sisa === 1 ? `${awal} Hanya satu benda yang cocok. Petunjukmu sudah cukup.` : `${awal} Masih ada ${sisa} benda yang cocok. Tambah petunjuk lagi.`;
}
