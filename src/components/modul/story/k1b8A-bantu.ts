import type { Aksi, KetukanStory, Obj } from "./logika-story";
import { W, bendaDi, gambarDiagram, goresan, kartuAngka, namaG, teks, titikBaris, type GeoD, type Titik } from "./k1b8A-gambar";

/** Penyingkat penulisan naskah Story Sub-Bab A Bab 8 Kelas 1 (khusus sub-bab ini). */
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

/** Nama bilangan 1 sampai 20 (indeks = bilangan). */
export const NAMA_BILANGAN = ["nol", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan", "sepuluh", "sebelas", "dua belas", "tiga belas", "empat belas", "lima belas", "enam belas", "tujuh belas", "delapan belas", "sembilan belas", "dua puluh"];

/**
 * Nomor kata awal untuk deret bilangan dari `dari` sampai `sampai` (nama bilangan boleh dua kata, mis. "tiga belas"),
 * dicari berurutan mulai setelah kata `setelah` (kemunculan pertama) bila diberikan. Galat bila ada yang tidak ketemu.
 */
export const urutBilangan = (suara: string, dari: number, sampai: number, setelah?: string): number[] => {
  const kata2 = suara.split(/\s+/).filter(Boolean).map(norm);
  let kursor = setelah ? kata2.indexOf(norm(setelah)) + 1 : 0;
  if (setelah && kursor === 0) throw new Error(`kata "${setelah}" tidak ada dalam: ${suara}`);
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
export function hitungAksi(suara: string, id: string, pts: Titik[], opsi: { setelah?: string; dari?: number; awal?: number; naik?: number } = {}): Aksi[] {
  const dari = opsi.dari ?? 1;
  const awal = opsi.awal ?? 0;
  const naik = opsi.naik ?? 14;
  const pos = urutBilangan(suara, dari, dari + pts.length - 1 - awal, opsi.setelah);
  return pts.slice(awal).map((p, q) => tambah(pos[q], teks(`${id}n${awal + q}`, p.x, p.y - naik, String(dari + q), 10.6, W.merah)));
}

/**
 * Aksi turus: tiap nama bilangan dalam suara menambah satu goresan `t{huruf}-g{i}` (i dari `dari`), mulai dari x0 di garis dasar y.
 * Goresan kelima dalam tiap lima dicoret miring (diatur `goresan`).
 */
export function goresAksi(suara: string, key: string, n: number, x0: number, y: number, opsi: { setelah?: string; dari?: number } = {}): Aksi[] {
  const dari = opsi.dari ?? 0;
  const pos = urutBilangan(suara, dari + 1, n, opsi.setelah);
  return Array.from({ length: n - dari }, (_, q) => tambah(pos[q], goresan(key, dari + q, x0, y)));
}

/** Pilihan kartu (id c1..cn), pojok kiri-atas di tinggi `y`, lebar kartu menyesuaikan jumlah. */
export const pilihKata = (y: number, isi: string[]): ReturnType<typeof kartuAngka> => {
  const n = isi.length;
  const w = n === 2 ? 120 : 84;
  const jarak = n === 2 ? 20 : 8;
  const x0 = (300 - (n * w + (n - 1) * jarak)) / 2;
  return isi.flatMap((t, i) => kartuAngka(`c${i + 1}`, x0 + i * (w + jarak), y, t, [W.hijauMuda, W.pink, W.langit][i], w, 30, 11));
};

/** Pindahkan benda kelompok `key` ke titik-titik baru (`pts`). */
export const pindahKe = (at: At, key: string, pts: Titik[]): Aksi => ({ at, ubah: pts.map((p, i) => ({ id: `e${key}${i}`, x: p.x, y: p.y })) });

/** Satu baris kelompok: nama di kiri dan `n` benda dari x0 (jarak dx), garis dasar y. Benda `e{huruf}{i}`. */
export const barisKelompok = (key: string, nama: string, e: string, n: number, y: number, x0 = 76, dx = 26): Obj[] => [namaG(key, y, nama), ...bendaDi(key, e, titikBaris(n, x0, y, dx))];

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

/** Gambar diagram baris r: tiap nama bilangan dalam suara menambah satu gambar `${id}-p{r}{k}`. */
export function diagramAksi(suara: string, id: string, g: GeoD, r: number, n: number, e: string, opsi: { setelah?: string } = {}): Aksi[] {
  const pos = urutBilangan(suara, 1, n, opsi.setelah);
  return Array.from({ length: n }, (_, q) => tambah(pos[q], gambarDiagram(id, g, r, q, e)));
}

/** Sorot benda ke-i pada nomor kata bilangan ke-i (deret mulai `dari`, setelah kata `setelah`); sorot sebelumnya diredam. */
export const sorotUrut = (suara: string, idsBenda: string[], dari: number, setelah?: string): Aksi[] => {
  const pos = urutBilangan(suara, dari, dari + idsBenda.length - 1, setelah);
  return idsBenda.flatMap((id, q) => (q === 0 ? [sorotkan(pos[q], id)] : [redamkan(pos[q], idsBenda[q - 1]), sorotkan(pos[q], id)]));
};
