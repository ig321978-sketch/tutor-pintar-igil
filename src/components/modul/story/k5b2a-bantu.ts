import type { Aksi, KetukanStory, Obj } from "./logika-story";

/** Penyingkat penulisan naskah Story Sub-Bab A Bab 2 KPK dan FPB Kelas 5 (khusus sub-bab ini). */
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

/** Jumlah kata dalam satu kalimat suara. */
const hitungKata = (suara: string): number => suara.split(/\s+/).filter(Boolean).length;

/** `n` nomor kata yang tersebar rata dalam kalimat `suara`, mulai kata `dari` sampai kata terakhir. */
export const sebar = (suara: string, n: number, dari = 0): number[] => {
  const akhir = hitungKata(suara) - 1;
  return Array.from({ length: n }, (_, i) => (n === 1 ? dari : Math.round(dari + (i * (akhir - dari)) / (n - 1))));
};

/** Warnai sel-sel kisi angka `id` bertahap: sel ke-i diwarnai pada kata `posisi[i]`. */
export const warnaiSel = (id: string, warna: string, ns: number[], posisi: number[]): Aksi[] => ns.map((n, i) => ({ at: posisi[i], ubah: [{ id: `${id}-c${n}`, warna }] }));
