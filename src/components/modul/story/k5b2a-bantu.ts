import { posisiKata, type Aksi, type KetukanStory, type Obj } from "./logika-story";

/** Penyingkat penulisan naskah Story Sub-Bab A Bab 2 Kelas 5 (khusus sub-bab ini). */
type At = string | number | undefined;
type Ubah = Partial<Obj> & { id: string };

export const tambah = (at: At, ...objs: (Obj | Obj[])[]): Aksi => ({ at, tambah: objs.flat() });
export const ubah = (at: At, ...u: Ubah[]): Aksi => ({ at, ubah: u });
export const hapus = (at: At, ...ids: string[]): Aksi => ({ at, hapus: ids });
export const bersih = (at: At = 0): Aksi => ({ at, bersih: true });
/**
 * Waktu gambar berhenti saat suara selesai, dan perkiraan detik per kata bisa lebih lambat dari suara sebenarnya.
 * Pemicu di ujung kalimat lalu tidak pernah tercapai dan bendanya tidak tampil. Maka tiap pemicu dimajukan sebanding
 * (pemicu pertama tetap, urutan tetap) supaya semua benda sudah tampil sebelum suara selesai.
 */
const SKALA_PEMICU = 0.75;
const majukan = (suara: string, a: Aksi): Aksi => {
  const p = posisiKata(suara, a.at);
  return a.at === undefined || p <= 0 ? a : { ...a, at: Math.floor(p * SKALA_PEMICU) };
};
export const k = (suara: string, ...aksi: Aksi[]): KetukanStory => ({ suara, aksi: aksi.map((a) => majukan(suara, a)) });
export const sorotkan = (at: At, ...ids: string[]): Aksi => ({ at, ubah: ids.map((id) => ({ id, sorot: true })) });
export const redamkan = (at: At, ...ids: string[]): Aksi => ({ at, ubah: ids.map((id) => ({ id, sorot: false })) });
/** Ubah warna isi beberapa benda sekaligus. */
export const warnai = (at: At, warna: string, ...ids: string[]): Aksi => ({ at, ubah: ids.map((id) => ({ id, warna })) });
/** Mengabu-abukan benda (kurang tampak). */
export const pudarkan = (at: At, ...ids: string[]): Aksi => ({ at, ubah: ids.map((id) => ({ id, op: 0.25 })) });

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
