import type { Aksi, KetukanStory, Obj } from "./logika-story";
import { idBatang, idLepas } from "./k2b7B-gambar";

/** Penyingkat penulisan naskah Story Sub-Bab B Bab 7 Kelas 2 (khusus sub-bab ini). */
type At = string | number | undefined;
type Ubah = Partial<Obj> & { id: string };

export const tambah = (at: At, ...objs: (Obj | Obj[])[]): Aksi => ({ at, tambah: objs.flat() });
export const ubah = (at: At, ...u: Ubah[]): Aksi => ({ at, ubah: u });
export const hapus = (at: At, ...ids: string[]): Aksi => ({ at, hapus: ids });
export const bersih = (at: At = 0): Aksi => ({ at, bersih: true });
export const k = (suara: string, ...aksi: Aksi[]): KetukanStory => ({ suara, aksi });
export const sorotkan = (at: At, ...ids: string[]): Aksi => ({ at, ubah: ids.map((id) => ({ id, sorot: true })) });
export const redamkan = (at: At, ...ids: string[]): Aksi => ({ at, ubah: ids.map((id) => ({ id, sorot: false })) });

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");

/** Nomor kata (mulai 0) ke-`n` yang persis sama dengan `kata`. Galat bila tidak ada, supaya salah ketik pemicu ketahuan. */
export const idx = (suara: string, kata: string, n = 1): number => {
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

const SATUAN = ["nol", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan"];

/** Nama bilangan 0 sampai 100 (indeks = bilangan). */
export const NAMA_BILANGAN: string[] = Array.from({ length: 101 }, (_, n) => {
  if (n < 10) return SATUAN[n];
  if (n === 10) return "sepuluh";
  if (n === 11) return "sebelas";
  if (n < 20) return `${SATUAN[n - 10]} belas`;
  if (n === 100) return "seratus";
  const p = Math.floor(n / 10);
  const s = n % 10;
  return s === 0 ? `${SATUAN[p]} puluh` : `${SATUAN[p]} puluh ${SATUAN[s]}`;
});

/** Sorot semua batang kantong dan kelereng lepas pada kumpulan `id` berisi n. */
export const sorotKumpulan = (at: At, id: string, n: number, batang = true, lepas = true): Aksi => sorotkan(at, ...(batang ? idBatang(id, n) : []), ...(lepas ? idLepas(id, n) : []));
export const redamKumpulan = (at: At, id: string, n: number, batang = true, lepas = true): Aksi => redamkan(at, ...(batang ? idBatang(id, n) : []), ...(lepas ? idLepas(id, n) : []));
