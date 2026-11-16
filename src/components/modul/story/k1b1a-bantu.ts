import type { Aksi, KetukanStory, Obj } from "./logika-story";
import { emo, teks, W, type Titik } from "./k1b1a-gambar";

/** Penyingkat penulisan naskah Story Sub-Bab A Bab 1 Bilangan Kelas 1 (khusus sub-bab ini). */
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

/** Nomor kata untuk deretan kata berurutan (mis. satu, dua, tiga), dicari mulai setelah kata `setelah` (kemunculan pertama) bila diberikan. */
export const urutKata = (suara: string, daftar: string[], setelah?: string): number[] => {
  const kata2 = suara.split(/\s+/).filter(Boolean).map(norm);
  let dari = setelah ? kata2.indexOf(norm(setelah)) + 1 : 0;
  if (setelah && dari === 0) throw new Error(`kata "${setelah}" tidak ada dalam: ${suara}`);
  return daftar.map((d) => {
    const p = kata2.indexOf(norm(d), dari);
    if (p < 0) throw new Error(`kata "${d}" tidak ada setelah nomor ${dari} dalam: ${suara}`);
    dari = p + 1;
    return p;
  });
};

export const KATA_ANGKA = ["satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan", "sepuluh"];

/**
 * Aksi menghitung sambil menyentuh: tiap kata bilangan dalam suara memunculkan angka di atas benda ke-i dan memindahkan tangan ke bawahnya.
 * Angka `${id}n{i}`, tangan `tg`. `tanganAda`: tangan sudah ada di gambar (hanya dipindah).
 */
export function hitungAksi(suara: string, id: string, pts: Titik[], setelah?: string, tanganAda = false): Aksi[] {
  const pos = urutKata(suara, KATA_ANGKA.slice(0, pts.length), setelah);
  return pts.flatMap((p, i) => {
    const angka = tambah(pos[i], teks(`${id}n${i}`, p.x, p.y - 17, String(i + 1), 11, W.merah));
    if (i === 0 && !tanganAda) return [angka, tambah(pos[i], emo("tg", p.x, p.y + 33, "\u{1F446}", 22))];
    return [angka, ubah(pos[i], { id: "tg", x: p.x, y: p.y + 33 })];
  });
}

/**
 * Menghitung mainan emoji sambil menunjuk: tiap kata bilangan memunculkan angka `${id}n{i}` di atas mainan ke-i dan memindahkan tangan `tg` ke bawahnya.
 * `urutan`: urutan mainan yang ditunjuk (bawaan kiri ke kanan); angka yang tampil di atas mainan adalah urutan sebutannya.
 */
export function hitungMainan(suara: string, id: string, pts: Titik[], u = 22, setelah?: string, urutan?: number[], tanganAda = false): Aksi[] {
  const urut = urutan ?? pts.map((_, i) => i);
  const pos = urutKata(suara, KATA_ANGKA.slice(0, urut.length), setelah);
  return urut.flatMap((j, n) => {
    const p = pts[j];
    const angka = tambah(pos[n], teks(`${id}n${j}`, p.x, p.y - u - 1, String(n + 1), 11, W.merah));
    if (n === 0 && !tanganAda) return [angka, tambah(pos[n], emo("tg", p.x, p.y + 22, "\u{1F446}", 18))];
    return [angka, ubah(pos[n], { id: "tg", x: p.x, y: p.y + 22 })];
  });
}
