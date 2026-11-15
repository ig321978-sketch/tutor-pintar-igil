import type { Aksi, KetukanStory, Obj } from "./logika-story";
import { emo, teks, W, type Titik } from "./k1b2c-gambar";

/** Penyingkat penulisan naskah Story Sub-Bab C Bab 2 Penjumlahan Kelas 1 (khusus sub-bab ini). */
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

/** Pemain berpindah di deretan bilangan `id` (sel `${id}k{v}`, di atas sel pada y = ySel - 4) mengikuti kata bilangan; sel disorot. */
export function langkahDeret(suara: string, nilai: number[], id: string, ySel: number, setelah?: string, pemain = "up"): Aksi[] {
  const pos = urutKata(suara, nilai.map((v) => KATA_ANGKA[v - 1]), setelah);
  return nilai.flatMap((v, i) => [
    ubah(pos[i], { id: pemain, x: 33 + 26 * (v - 1), y: ySel - 4 }),
    ...(i > 0 ? [redamkan(pos[i], `${id}k${nilai[i - 1]}`)] : []),
    sorotkan(pos[i], `${id}k${v}`),
  ]);
}

/**
 * Benda muncul satu per satu saat kata bilangan diucapkan (benda ke-i pada titik `pts[i]` lewat `buat`); bila `angka`, nomor merah muncul di atasnya.
 * Nomor `${id}n{i}`.
 */
export function hitungMuncul(suara: string, id: string, pts: Titik[], buat: (i: number, p: Titik) => Obj | Obj[], setelah?: string, angka = true, nomorAwal = 1): Aksi[] {
  const pos = urutKata(suara, KATA_ANGKA.slice(nomorAwal - 1, nomorAwal - 1 + pts.length), setelah);
  return pts.flatMap((p, i) => [tambah(pos[i], buat(i, p)), ...(angka ? [tambah(pos[i], teks(`${id}n${i}`, p.x, p.y - 17, String(nomorAwal + i), 11, W.merah))] : [])]);
}

/** Kalimat penjumlahan tersusun potongan demi potongan di tengah pada tinggi `y`; potongan ke-i (id `${id}${i}`) muncul saat kata `kata[i]` diucapkan (dicari setelah kata `setelah`). */
export function rangkai(suara: string, id: string, y: number, bagian: string[], kata: string[], setelah?: string, u = 22, jarak = 28): Aksi[] {
  const pos = urutKata(suara, kata, setelah);
  return bagian.map((b, i) => tambah(pos[i], teks(`${id}${i}`, 150 + (i - (bagian.length - 1) / 2) * jarak, y, b, u, b === "+" || b === "=" ? W.biru : W.merah)));
}
