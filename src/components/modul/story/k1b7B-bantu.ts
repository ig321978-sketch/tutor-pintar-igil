import type { Aksi, KetukanStory, Obj } from "./logika-story";
import { SATUAN, W, teks, type Ukur } from "./k1b7B-gambar";

/** Penyingkat penulisan naskah Story Sub-Bab B Bab 7 Kelas 1 (khusus sub-bab ini). */
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
 * Aksi mengukur sambil menghitung: tiap nama bilangan dalam suara menaruh satuan ke-i (rapat, dari garis awal), memunculkan angka (digit) di atasnya,
 * dan memindahkan tangan ke bawahnya. Angka `${p}un{i}`, tangan `tg`.
 * `munculkan: false`: satuan sudah ada, hanya angka dan tangan. `awal`/`sampai`: bagian satuan yang dihitung. `dari`: bilangan pertama (bawaan satu).
 * `tanganAda`: tangan sudah ada (hanya dipindah).
 */
export function ukurAksi(suara: string, u: Ukur, opsi: { setelah?: string; dari?: number; awal?: number; sampai?: number; tanganAda?: boolean; munculkan?: boolean } = {}): Aksi[] {
  const dari = opsi.dari ?? 1;
  const awal = opsi.awal ?? 0;
  const sampai = opsi.sampai ?? u.n;
  const munculkan = opsi.munculkan ?? true;
  const h = SATUAN[u.jenis].h;
  const pos = urutBilangan(suara, dari, dari + (sampai - awal) - 1, opsi.setelah);
  return u.pusat.slice(awal, sampai).flatMap((pt, q) => {
    const i = awal + q;
    const aksi: Aksi[] = [];
    if (munculkan) aksi.push(tambah(pos[q], u.unit(i)));
    aksi.push(tambah(pos[q], teks(`${u.p}un${i}`, pt.x, pt.y - (h / 2 + 4), String(dari + q), 10.2, W.merah)));
    const tangan = { id: "tg", t: "teks" as const, x: pt.x, y: pt.y + h / 2 + 14, isi: "\u{1F446}", u: 20, warna: W.biru };
    if (q === 0 && !opsi.tanganAda) aksi.push(tambah(pos[q], tangan));
    else aksi.push(ubah(pos[q], { id: "tg", x: tangan.x, y: tangan.y }));
    return aksi;
  });
}
