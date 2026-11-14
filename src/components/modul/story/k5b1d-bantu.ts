import type { Aksi, KetukanStory, Obj } from "./logika-story";

/** Penyingkat penulisan naskah Story Sub-Bab D Bab 1 Bilangan Cacah Sampai 100.000 Kelas 5 (khusus sub-bab ini). */
type At = string | number | undefined;
type Ubah = Partial<Obj> & { id: string };

export const tambah = (at: At, ...objs: (Obj | Obj[])[]): Aksi => ({ at, tambah: objs.flat() });
export const ubah = (at: At, ...u: Ubah[]): Aksi => ({ at, ubah: u });
export const hapus = (at: At, ...ids: string[]): Aksi => ({ at, hapus: ids });
export const bersih = (at: At = 0): Aksi => ({ at, bersih: true });
export const k = (suara: string, ...aksi: Aksi[]): KetukanStory => ({ suara, aksi });
export const sorotkan = (at: At, ...ids: string[]): Aksi => ({ at, ubah: ids.map((id) => ({ id, sorot: true })) });
export const redamkan = (at: At, ...ids: string[]): Aksi => ({ at, ubah: ids.map((id) => ({ id, sorot: false })) });
/** Ubah warna isi beberapa benda sekaligus. */
export const warnai = (at: At, warna: string, ...ids: string[]): Aksi => ({ at, ubah: ids.map((id) => ({ id, warna })) });

const SATUAN = ["", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan"];
const sampai999 = (n: number): string => {
  const r = Math.floor(n / 100);
  const s = n % 100;
  const bagian: string[] = [];
  if (r === 1) bagian.push("seratus");
  else if (r > 1) bagian.push(`${SATUAN[r]} ratus`);
  if (s === 10) bagian.push("sepuluh");
  else if (s === 11) bagian.push("sebelas");
  else if (s > 11 && s < 20) bagian.push(`${SATUAN[s - 10]} belas`);
  else {
    if (s >= 20) bagian.push(`${SATUAN[Math.floor(s / 10)]} puluh`);
    if (s % 10 > 0) bagian.push(SATUAN[s % 10]);
  }
  return bagian.join(" ");
};
/** Bilangan cacah 1 sampai 999.999 dalam kata (untuk suara, tanpa angka). */
export const ib = (n: number): string => {
  if (n <= 0 || n > 999999) throw new Error(`ib: di luar jangkauan ${n}`);
  const ribu = Math.floor(n / 1000);
  const sisa = n % 1000;
  const depan = ribu === 0 ? "" : ribu === 1 ? "seribu" : `${sampai999(ribu)} ribu`;
  return [depan, sisa === 0 ? "" : sampai999(sisa)].filter(Boolean).join(" ");
};
