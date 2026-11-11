/**
 * Laboratorium Kelompok (Bab 4, Sub-Bab B): model PhET. Sembilan balok punya tiga ciri (bentuk, warna, ukuran).
 * Anak memilih satu aturan, lalu balok yang sama tersusun ke nampan menurut aturan itu. Mengganti aturan
 * memindahkan balok yang sama ke kelompok yang berbeda. Jumlah semua kelompok selalu sama dengan jumlah balok.
 * Murni: tanpa React, tanpa jaringan. Diuji di scripts/uji-lab-kelas1.mjs.
 */

export type Aturan = "bentuk" | "warna" | "ukuran";
export const SEMUA_ATURAN: Aturan[] = ["bentuk", "warna", "ukuran"];

export type NilaiBentuk = "lengkung" | "segitiga" | "segiempat";
export type NilaiWarna = "merah" | "biru" | "kuning";
export type NilaiUkuran = "besar" | "kecil";

export type Blok = { id: number; bentuk: NilaiBentuk; warna: NilaiWarna; ukuran: NilaiUkuran };

export type Nilai = { id: string; nama: string };

/** Nilai tiap aturan, berurutan. Nama bentuk memakai kata dari Sub-Bab A: lengkung, segitiga, segi empat. */
export const NILAI: Record<Aturan, Nilai[]> = {
  bentuk: [
    { id: "lengkung", nama: "Lengkung" },
    { id: "segitiga", nama: "Segitiga" },
    { id: "segiempat", nama: "Segi empat" },
  ],
  warna: [
    { id: "merah", nama: "Merah" },
    { id: "biru", nama: "Biru" },
    { id: "kuning", nama: "Kuning" },
  ],
  ukuran: [
    { id: "besar", nama: "Besar" },
    { id: "kecil", nama: "Kecil" },
  ],
};

export const NAMA_ATURAN: Record<Aturan, string> = { bentuk: "Bentuk", warna: "Warna", ukuran: "Ukuran" };

/** Sembilan balok. Tiap aturan memberi sebaran yang berbeda supaya mengganti aturan terasa. */
export const BLOK: Blok[] = [
  { id: 1, bentuk: "lengkung", warna: "merah", ukuran: "besar" },
  { id: 2, bentuk: "lengkung", warna: "biru", ukuran: "kecil" },
  { id: 3, bentuk: "segitiga", warna: "kuning", ukuran: "besar" },
  { id: 4, bentuk: "segiempat", warna: "biru", ukuran: "besar" },
  { id: 5, bentuk: "segitiga", warna: "merah", ukuran: "kecil" },
  { id: 6, bentuk: "segiempat", warna: "kuning", ukuran: "kecil" },
  { id: 7, bentuk: "lengkung", warna: "biru", ukuran: "besar" },
  { id: 8, bentuk: "segiempat", warna: "merah", ukuran: "besar" },
  { id: 9, bentuk: "lengkung", warna: "biru", ukuran: "kecil" },
];

export const nilaiBlok = (b: Blok, aturan: Aturan): string => b[aturan];

export const namaNilai = (aturan: Aturan, id: string): string => NILAI[aturan].find((n) => n.id === id)?.nama ?? id;

export type Kelompok = { id: string; nama: string; anggota: Blok[]; jumlah: number };

/** Susun balok ke kelompok menurut satu aturan. Kelompok tetap berurutan, tiap balok tepat di satu kelompok. */
export function kelompokkan(aturan: Aturan, blok: Blok[] = BLOK): Kelompok[] {
  return NILAI[aturan].map((n) => {
    const anggota = blok.filter((b) => nilaiBlok(b, aturan) === n.id);
    return { id: n.id, nama: n.nama, anggota, jumlah: anggota.length };
  });
}

/** Kalimat jumlah: "4 + 3 + 2 = 9". Kelompok kosong dilewati. */
export function kalimatJumlah(aturan: Aturan, blok: Blok[] = BLOK): string {
  const ada = kelompokkan(aturan, blok).filter((k) => k.jumlah > 0);
  const total = ada.reduce((s, k) => s + k.jumlah, 0);
  return `${ada.map((k) => k.jumlah).join(" + ")} = ${total}`;
}

/** Kalimat kelompok: "Menurut warna: merah 3, biru 4, kuning 2." */
export function kalimatKelompok(aturan: Aturan, blok: Blok[] = BLOK): string {
  const ada = kelompokkan(aturan, blok).filter((k) => k.jumlah > 0);
  return `Menurut ${NAMA_ATURAN[aturan].toLowerCase()}: ${ada.map((k) => `${k.nama.toLowerCase()} ${k.jumlah}`).join(", ")}.`;
}

export type CiriBlok = { bentuk: string; warna: string; ukuran: string };

export function ciriBlok(b: Blok): CiriBlok {
  return { bentuk: namaNilai("bentuk", b.bentuk), warna: namaNilai("warna", b.warna), ukuran: namaNilai("ukuran", b.ukuran) };
}

/** Nama lengkap satu balok untuk label, mis. "segitiga kuning besar". */
export const namaBlok = (b: Blok): string => `${namaNilai("bentuk", b.bentuk)} ${b.warna} ${b.ukuran}`.toLowerCase();

/** Untuk satu balok: kelompoknya menurut tiap aturan beserta banyak anggota kelompok itu. */
export function kelompokBlok(b: Blok, blok: Blok[] = BLOK): { aturan: Aturan; nama: string; jumlah: number }[] {
  return SEMUA_ATURAN.map((aturan) => {
    const k = kelompokkan(aturan, blok).find((x) => x.id === nilaiBlok(b, aturan)) as Kelompok;
    return { aturan, nama: k.nama, jumlah: k.jumlah };
  });
}

export function ucapanKelompok(aturan: Aturan, blok: Blok[] = BLOK): string {
  const ada = kelompokkan(aturan, blok).filter((k) => k.jumlah > 0);
  const total = ada.reduce((s, k) => s + k.jumlah, 0);
  return `Aturannya ${NAMA_ATURAN[aturan].toLowerCase()}. ${ada.map((k) => `Kelompok ${k.nama.toLowerCase()} ada ${k.jumlah}.`).join(" ")} Semuanya ada ${total}.`;
}

export function ucapanBlok(b: Blok, aturan: Aturan, blok: Blok[] = BLOK): string {
  const c = ciriBlok(b);
  const kb = kelompokBlok(b, blok);
  const menurut = kb.map((k) => `Menurut ${NAMA_ATURAN[k.aturan].toLowerCase()}, ia masuk kelompok ${k.nama.toLowerCase()}.`).join(" ");
  return `Benda ini bentuknya ${c.bentuk.toLowerCase()}, warnanya ${c.warna.toLowerCase()}, ukurannya ${c.ukuran.toLowerCase()}. ${menurut} Aturan yang sedang dipakai: ${NAMA_ATURAN[aturan].toLowerCase()}.`;
}
