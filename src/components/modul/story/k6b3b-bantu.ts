import type { Aksi, KetukanStory, Obj } from "./logika-story";

/** Penyingkat penulisan naskah Story Kelas 6 Bab 3 Sub-Bab B (khusus sub-bab ini). */
type At = string | number | undefined;
type Ubah = Partial<Obj> & { id: string };

export const tambah = (at: At, ...objs: (Obj | Obj[])[]): Aksi => ({ at, tambah: objs.flat() });
export const ubah = (at: At, ...u: Ubah[]): Aksi => ({ at, ubah: u });
export const hapus = (at: At, ...ids: string[]): Aksi => ({ at, hapus: ids });
export const bersih = (at: At = 0): Aksi => ({ at, bersih: true });
export const k = (suara: string, ...aksi: Aksi[]): KetukanStory => ({ suara, aksi });

/** Sorot atau redam banyak benda sekaligus. */
export const sorotkan = (at: At, ...ids: string[]): Aksi => ({ at, ubah: ids.map((id) => ({ id, sorot: true })) });
export const redamkan = (at: At, ...ids: string[]): Aksi => ({ at, ubah: ids.map((id) => ({ id, sorot: false })) });
/** Buat banyak benda memudar atau tampak lagi. */
export const pudarkan = (at: At, ...ids: string[]): Aksi => ({ at, ubah: ids.map((id) => ({ id, op: 0.18 })) });
