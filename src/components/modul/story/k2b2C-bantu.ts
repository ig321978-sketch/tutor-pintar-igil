import type { Aksi, KetukanStory, Obj } from "./logika-story";
import { W, kartuAngka, loncatan, teks, type GeoG, type Titik } from "./k2b2C-gambar";

/** Penyingkat penulisan naskah Story Sub-Bab C Bab 2 Kelas 2 (khusus sub-bab ini). */
type At = string | number | undefined;
type Ubah = Partial<Obj> & { id: string };

export const tambah = (at: At, ...objs: (Obj | Obj[])[]): Aksi => ({ at, tambah: objs.flat() });
export const ubah = (at: At, ...u: Ubah[]): Aksi => ({ at, ubah: u });
export const hapus = (at: At, ...ids: string[]): Aksi => ({ at, hapus: ids });
export const bersih = (at: At = 0): Aksi => ({ at, bersih: true });
export const k = (suara: string, ...aksi: Aksi[]): KetukanStory => ({ suara, aksi });
export const sorotkan = (at: At, ...ids: string[]): Aksi => ({ at, ubah: ids.map((id) => ({ id, sorot: true })) });
export const redamkan = (at: At, ...ids: string[]): Aksi => ({ at, ubah: ids.map((id) => ({ id, sorot: false })) });

/** Id berurutan `${s}${dari}` sampai `${s}${sampai}`. */
export const ids = (s: string, dari: number, sampai: number): string[] => Array.from({ length: sampai - dari + 1 }, (_, q) => `${s}${dari + q}`);

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

/** Nomor kata (mulai 0) awal frasa (beberapa kata berurutan, mis. "tiga puluh dua"), kemunculan ke-`n`. Galat bila tidak ada. */
export const idf = (suara: string, frasa: string, n = 1): number => {
  const kata2 = suara.split(/\s+/).filter(Boolean).map(norm);
  const pecah = frasa.split(/\s+/).filter(Boolean).map(norm);
  let c = 0;
  for (let i = 0; i + pecah.length <= kata2.length; i += 1) {
    if (pecah.every((q, j) => kata2[i + j] === q)) {
      c += 1;
      if (c === n) return i;
    }
  }
  throw new Error(`frasa "${frasa}" ke-${n} tidak ada dalam: ${suara}`);
};

const SAT = ["", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan"];
const namaBil = (n: number): string => {
  if (n === 0) return "nol";
  if (n < 10) return SAT[n];
  if (n === 10) return "sepuluh";
  if (n === 11) return "sebelas";
  if (n < 20) return `${SAT[n - 10]} belas`;
  const p = Math.floor(n / 10);
  const s = n % 10;
  return s === 0 ? `${SAT[p]} puluh` : `${SAT[p]} puluh ${SAT[s]}`;
};
/** Nama bilangan 0 sampai 50 (indeks = bilangan). */
export const NAMA_BILANGAN: string[] = Array.from({ length: 51 }, (_, n) => namaBil(n));

/**
 * Nomor kata awal untuk deret bilangan dari `dari` sampai `sampai` (nama bilangan boleh dua atau tiga kata, mis. "dua puluh enam"),
 * dicari berurutan mulai setelah kata `setelah` (kemunculan ke-`ke`, bawaan pertama) bila diberikan. Galat bila ada yang tidak ketemu.
 */
export const urutBilangan = (suara: string, dari: number, sampai: number, setelah?: string, ke = 1): number[] => {
  const kata2 = suara.split(/\s+/).filter(Boolean).map(norm);
  let kursor = 0;
  if (setelah) {
    kursor = idx(suara, setelah, ke) + 1;
  }
  const hasil: number[] = [];
  for (let n = dari; n <= sampai; n += 1) {
    const pecah = NAMA_BILANGAN[n].split(" ");
    let p = -1;
    for (let i = kursor; i + pecah.length <= kata2.length; i += 1) {
      if (pecah.every((c, q) => kata2[i + q] === c)) {
        p = i;
        break;
      }
    }
    if (p < 0) throw new Error(`bilangan "${NAMA_BILANGAN[n]}" tidak ada setelah nomor ${kursor} dalam: ${suara}`);
    hasil.push(p);
    kursor = p + pecah.length;
  }
  return hasil;
};

/**
 * Aksi menghitung sambil menyentuh: tiap nama bilangan dalam suara memunculkan angka (digit) di atas benda ke-i.
 * Angka `${id}n{i}` (id = `e{huruf}`). `pts` = titik pusat benda. `dari` = bilangan pertama, `awal` = nomor benda pertama yang dihitung.
 */
export function hitungAksi(suara: string, id: string, pts: Titik[], opsi: { setelah?: string; ke?: number; dari?: number; awal?: number; naik?: number } = {}): Aksi[] {
  const dari = opsi.dari ?? 1;
  const awal = opsi.awal ?? 0;
  const naik = opsi.naik ?? 14;
  const pos = urutBilangan(suara, dari, dari + pts.length - 1 - awal, opsi.setelah, opsi.ke);
  return pts.slice(awal).map((p, q) => tambah(pos[q], teks(`${id}n${awal + q}`, p.x, p.y - naik, String(dari + q), 10.6, W.merah)));
}

/** Loncatan di garis bilangan: tiap nama bilangan 1, 2, 3, ... dalam suara memunculkan satu loncatan `gb{kunci}-h{i}`. */
export function loncatAksi(suara: string, key: string, g: GeoG, dari: number, arah: 1 | -1, n: number, setelah?: string): Aksi[] {
  const pos = urutBilangan(suara, 1, n, setelah);
  return Array.from({ length: n }, (_, i) => tambah(pos[i], loncatan(key, g, dari, arah, i)));
}

/** Pilihan kartu (id c1..cn), pojok kiri-atas di tinggi `y`, lebar kartu menyesuaikan jumlah. */
export const pilihKata = (y: number, isi: string[], u = 11): ReturnType<typeof kartuAngka> => {
  const n = isi.length;
  const w = n === 2 ? 120 : 84;
  const jarak = n === 2 ? 20 : 8;
  const x0 = (300 - (n * w + (n - 1) * jarak)) / 2;
  return isi.flatMap((t, i) => kartuAngka(`c${i + 1}`, x0 + i * (w + jarak), y, t, [W.hijauMuda, W.pink, W.langit][i], w, 30, u));
};

/** Pindahkan benda kelompok `key` (mulai nomor `dari`) ke titik-titik baru (`pts`). */
export const pindahKe = (at: At, key: string, pts: Titik[], dari = 0): Aksi => ({ at, ubah: pts.map((p, i) => ({ id: `e${key}${dari + i}`, x: p.x, y: p.y })) });

/** Sorotan bergilir: pada kata pemicu ke-i, benda sebelumnya diredam dan benda ke-i disorot. `ke` = kemunculan kata (bawaan pertama). */
export function gilir(suara: string, urut: [string, string[], number?][]): Aksi[] {
  const out: Aksi[] = [];
  urut.forEach(([kata, id, ke], i) => {
    const at = idx(suara, kata, ke ?? 1);
    if (i > 0) out.push(redamkan(at, ...urut[i - 1][1]));
    out.push(sorotkan(at, ...id));
  });
  return out;
}
