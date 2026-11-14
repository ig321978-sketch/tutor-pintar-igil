import type { Aksi, KetukanStory, Obj } from "./logika-story";

/** Penyingkat penulisan naskah Story Sub-Bab D Bab 2 Pecahan Kelas 4 (khusus sub-bab ini). */
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

/** Nomor kata (mulai 0) ke-`n` yang persis sama dengan `kata` (tanpa tanda baca dan huruf besar). Galat bila tidak ada, supaya salah ketik pemicu ketahuan. */
export const idx = (suara: string, kata: string, n = 1): number => {
  const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");
  const kata2 = suara.split(/\s+/).filter(Boolean);
  let c = 0;
  for (let i = 0; i < kata2.length; i += 1) {
    if (norm(kata2[i]) === norm(kata)) {
      c += 1;
      if (c === n) return i;
    }
  }
  throw new Error(`pemicu "${kata}" ke-${n} tidak ada dalam: ${suara}`);
};

const hitungKata = (suara: string): number => suara.split(/\s+/).filter(Boolean).length;

/** `n` nomor kata yang tersebar rata dalam kalimat `suara`, mulai kata `dari` sampai kata terakhir. */
export const sebar = (suara: string, n: number, dari = 0): number[] => {
  const akhir = hitungKata(suara) - 1;
  return Array.from({ length: n }, (_, i) => (n === 1 ? dari : Math.round(dari + (i * (akhir - dari)) / (n - 1))));
};
