import type { Aksi, KetukanStory, Obj } from "./logika-story";
import { teks, W } from "./k1b4c-gambar";

/** Penyingkat penulisan naskah Story Sub-Bab C Bab 4 Mengenal Bentuk Kelas 1 (khusus sub-bab ini). */
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
 * Menghitung bagian satu demi satu: saat kata bilangan ke-i diucapkan (dicari setelah kata `setelah`), bagian `ids[i]` menyala (yang sebelumnya padam)
 * dan penghitung `idC` (di (x, y)) berubah menjadi "`label`: i+1".
 */
export function hitungBagian(suara: string, ids: string[], label: string, idC: string, x: number, y: number, setelah?: string, warna: string = W.merah, u = 10): Aksi[] {
  const pos = urutKata(suara, KATA_ANGKA.slice(0, ids.length), setelah);
  return ids.flatMap((id, i) => [
    ...(i === 0 ? [tambah(pos[i], teks(idC, x, y, `${label}: 1`, u, warna))] : [ubah(pos[i], { id: idC, isi: `${label}: ${i + 1}` })]),
    ...(i > 0 ? [redamkan(pos[i], ids[i - 1])] : []),
    sorotkan(pos[i], id),
  ]);
}

/** Benda menyala atau pudar satu demi satu saat kata bilangan diucapkan: benda `ids[i]` diubah dengan `ubahan` pada kata ke-i. */
export function tandaiSatuSatu(suara: string, ids: string[], ubahan: Partial<Obj>, setelah?: string): Aksi[] {
  const pos = urutKata(suara, KATA_ANGKA.slice(0, ids.length), setelah);
  return ids.map((id, i) => ubah(pos[i], { id, ...ubahan }));
}

/** Kalimat hitungan tersusun potongan demi potongan di tengah pada tinggi `y`; potongan ke-i (id `${id}${i}`) muncul saat kata `kata[i]` diucapkan (dicari setelah kata `setelah`). */
export function rangkai(suara: string, id: string, y: number, bagian: string[], kata: string[], setelah?: string, u = 22, jarak = 28): Aksi[] {
  const pos = urutKata(suara, kata, setelah);
  return bagian.map((b, i) => tambah(pos[i], teks(`${id}${i}`, 150 + (i - (bagian.length - 1) / 2) * jarak, y, b, u, b === "+" || b === "=" || b === "−" ? W.biru : W.merah)));
}

/** Kalimat penjumlahan tiga suku, mis. 5 + 1 + 3 = 9 (sembilan potongan: bilangan, tanda, bilangan, tanda, bilangan, sama dengan, hasil). Id `${id}0` sampai `${id}6`. */
export function rangkaiTiga(suara: string, id: string, y: number, bagian: string[], kata: string[], setelah?: string, u = 18, jarak = 24): Aksi[] {
  return rangkai(suara, id, y, bagian, kata, setelah, u, jarak);
}
