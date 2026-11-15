import type { Aksi, KetukanStory, Obj } from "./logika-story";
import { garis, teks, W, type Titik } from "./k1b5d-gambar";

/** Penyingkat penulisan naskah Story Sub-Bab D Bab 5 Kelas 1 (khusus sub-bab ini). */
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

/** Nama bilangan satu sampai dua puluh sebagai deretan kata (indeks 0 = satu). */
export const KATA_BIL: string[][] = [
  ["satu"], ["dua"], ["tiga"], ["empat"], ["lima"], ["enam"], ["tujuh"], ["delapan"], ["sembilan"], ["sepuluh"],
  ["sebelas"], ["dua", "belas"], ["tiga", "belas"], ["empat", "belas"], ["lima", "belas"], ["enam", "belas"], ["tujuh", "belas"], ["delapan", "belas"], ["sembilan", "belas"], ["dua", "puluh"],
];

/**
 * Nomor kata (kata terakhir nama bilangan) untuk bilangan `dari` sampai `sampai` yang diucapkan berurutan, dicari mulai setelah kata `setelah` (kemunculan pertama) bila diberikan.
 * Galat bila tidak ketemu.
 */
export const urutBil = (suara: string, dari: number, sampai: number, setelah?: string): number[] => {
  const kata2 = suara.split(/\s+/).filter(Boolean).map(norm);
  let mulai = setelah ? kata2.indexOf(norm(setelah)) + 1 : 0;
  if (setelah && mulai === 0) throw new Error(`kata "${setelah}" tidak ada dalam: ${suara}`);
  const out: number[] = [];
  for (let v = dari; v <= sampai; v += 1) {
    const nama = KATA_BIL[v - 1];
    let ketemu = -1;
    for (let i = mulai; i + nama.length <= kata2.length; i += 1) {
      if (nama.every((w, j) => kata2[i + j] === w)) {
        ketemu = i + nama.length - 1;
        break;
      }
    }
    if (ketemu < 0) throw new Error(`bilangan ${v} tidak diucapkan setelah nomor ${mulai} dalam: ${suara}`);
    out.push(ketemu);
    mulai = ketemu + 1;
  }
  return out;
};

/**
 * Benda muncul satu per satu saat nama bilangan diucapkan (benda ke-i pada titik `pts[i]` lewat `buat`); bila `angka`, nomor merah muncul di atasnya.
 * Bilangan ke-i = `nomorAwal` + i. Nomor `${id}n{i}`, di atas benda sejauh `naik`.
 */
export function hitungMuncul(suara: string, id: string, pts: Titik[], buat: (i: number, p: Titik) => Obj | Obj[], setelah?: string, angka = true, nomorAwal = 1, naik = 13, u = 8): Aksi[] {
  const pos = urutBil(suara, nomorAwal, nomorAwal + pts.length - 1, setelah);
  return pts.flatMap((p, i) => [tambah(pos[i], buat(i, p)), ...(angka ? [tambah(pos[i], teks(`${id}n${i}`, p.x, p.y - naik, String(nomorAwal + i), u, W.merah))] : [])]);
}

/** Garis pasangan `${id}l{i}` dari `a[i]` ke `b[i]` muncul saat nama bilangan ke-i (mulai satu) diucapkan setelah kata `setelah`. */
export function pasangAksi(suara: string, id: string, a: Titik[], b: Titik[], banyak: number, setelah?: string, warna: string = W.hijau): Aksi[] {
  const pos = urutBil(suara, 1, banyak, setelah);
  return Array.from({ length: banyak }, (_, i) => tambah(pos[i], garis(`${id}l${i}`, a[i].x, a[i].y, b[i].x - a[i].x, b[i].y - a[i].y, warna, 1.6)));
}

/** Benda `id`+nomor berpindah ke `tujuan[i]` saat kata `kata[i]` diucapkan (dicari setelah kata `setelah`). */
export function pindahKata(suara: string, ids: string[], tujuan: Titik[], kata: string[], setelah?: string, op?: number): Aksi[] {
  const k2 = suara.split(/\s+/).filter(Boolean).map(norm);
  let dari = setelah ? k2.indexOf(norm(setelah)) + 1 : 0;
  if (setelah && dari === 0) throw new Error(`kata "${setelah}" tidak ada dalam: ${suara}`);
  return ids.map((id, i) => {
    const p = k2.indexOf(norm(kata[i]), dari);
    if (p < 0) throw new Error(`kata "${kata[i]}" tidak ada setelah nomor ${dari} dalam: ${suara}`);
    dari = p + 1;
    return ubah(p, { id, x: tujuan[i].x, y: tujuan[i].y, ...(op === undefined ? {} : { op }) });
  });
}

/** Geser kartu angka (`kartuAngka` berid `${id}-k` dan `${id}-t`) ke pojok kiri-atas (x, y). */
export const geserKartu = (at: At, id: string, x: number, y: number, w = 56, h = 44, u = 24): Aksi => ({
  at,
  ubah: [
    { id: `${id}-k`, x, y },
    { id: `${id}-t`, x: x + w / 2, y: y + h / 2 + u * 0.35 },
  ],
});

/**
 * Penghitung angka besar: teks `id` di (x, y) menampilkan bilangan yang sedang diucapkan (`dari` sampai `sampai`, dicari setelah kata `setelah`).
 * `ada`: teks sudah ada di gambar (hanya diubah).
 */
export function penghitung(suara: string, id: string, x: number, y: number, dari: number, sampai: number, setelah?: string, ada = false, u = 16): Aksi[] {
  const pos = urutBil(suara, dari, sampai, setelah);
  return pos.map((p, i) => (i === 0 && !ada ? tambah(p, teks(id, x, y, String(dari), u, W.merah)) : ubah(p, { id, isi: String(dari + i) })));
}
