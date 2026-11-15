import type { Aksi, KetukanStory, Obj } from "./logika-story";
import { W, kartuAngka, teks, type Titik } from "./k2b1B-gambar";

/** Penyingkat penulisan naskah Story Sub-Bab B Bab 1 Kelas 2 (khusus sub-bab ini). */
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

const SATUAN = ["", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan"];
const BELASAN = ["sepuluh", "sebelas", "dua belas", "tiga belas", "empat belas", "lima belas", "enam belas", "tujuh belas", "delapan belas", "sembilan belas"];
const PULUHAN = ["", "", "dua puluh", "tiga puluh", "empat puluh", "lima puluh"];

/** Nama bilangan 0 sampai 50 (indeks = bilangan). */
export const NAMA_BILANGAN: string[] = Array.from({ length: 51 }, (_, n) => {
  if (n === 0) return "nol";
  if (n < 10) return SATUAN[n];
  if (n < 20) return BELASAN[n - 10];
  const p = Math.floor(n / 10);
  const s = n % 10;
  return s === 0 ? PULUHAN[p] : `${PULUHAN[p]} ${SATUAN[s]}`;
});

/** Nomor kata awal tiap nilai dalam `nilai` (nama boleh lebih dari satu kata), dicari berurutan mulai setelah kata `setelah` bila diberikan. Galat bila ada yang tidak ketemu. */
export const urutNilai = (suara: string, nilai: number[], setelah?: string): number[] => {
  const kata2 = suara.split(/\s+/).filter(Boolean).map(norm);
  let kursor = setelah ? kata2.indexOf(norm(setelah)) + 1 : 0;
  if (setelah && kursor === 0) throw new Error(`kata "${setelah}" tidak ada dalam: ${suara}`);
  const hasil: number[] = [];
  for (const n of nilai) {
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

/** Deret bilangan berurutan `dari` sampai `sampai`. */
export const urutBilangan = (suara: string, dari: number, sampai: number, setelah?: string): number[] => urutNilai(suara, Array.from({ length: sampai - dari + 1 }, (_, q) => dari + q), setelah);

/**
 * Aksi menghitung sambil menyentuh: tiap nama bilangan dalam suara memunculkan angka (digit) di atas benda ke-i.
 * Angka `${id}n{i}` (id = `bs{huruf}`). `pts` = titik pusat benda. `dari` = bilangan pertama, `awal` = nomor benda pertama yang dihitung.
 */
export function hitungAksi(suara: string, id: string, pts: Titik[], opsi: { setelah?: string; dari?: number; awal?: number; naik?: number } = {}): Aksi[] {
  const dari = opsi.dari ?? 1;
  const awal = opsi.awal ?? 0;
  const naik = opsi.naik ?? 12;
  const pos = urutBilangan(suara, dari, dari + pts.length - 1 - awal, opsi.setelah);
  return pts.slice(awal).map((p, q) => tambah(pos[q], teks(`${id}n${awal + q}`, p.x, p.y - naik, String(dari + q), 9.6, W.merah)));
}

/** Pilihan kartu (id c1..cn), pojok kiri-atas di tinggi `y`, lebar kartu menyesuaikan jumlah. */
export const pilihKata = (y: number, isi: string[]): ReturnType<typeof kartuAngka> => {
  const n = isi.length;
  const w = n === 2 ? 120 : 84;
  const jarak = n === 2 ? 20 : 8;
  const x0 = (300 - (n * w + (n - 1) * jarak)) / 2;
  return isi.flatMap((t, i) => kartuAngka(`c${i + 1}`, x0 + i * (w + jarak), y, t, [W.hijauMuda, W.pink, W.langit][i], w, 30, 13));
};

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

/** Id semua kubus kelompok `k` nomor `dari` sampai `sampai`. */
export const idKubus = (k: string, dari: number, sampai: number): string[] => ids(`bs${k}`, dari, sampai);
/** Id kotak batang kelompok `k` nomor `dari` sampai `sampai` (kotak dan sekat). */
export const idBatangRentang = (k: string, dari: number, sampai: number): string[] => Array.from({ length: sampai - dari + 1 }, (_, q) => [`bp${k}${dari + q}`, `bq${k}${dari + q}`]).flat();

/** Dua kartu pilihan berdampingan (id c1, c2) dengan teks panjang, pojok kiri-atas di tinggi `y`. */
export const pilihDua = (y: number, isi: [string, string], u = 9.6): ReturnType<typeof kartuAngka> => isi.flatMap((t, i) => kartuAngka(`c${i + 1}`, 20 + i * 140, y, t, [W.hijauMuda, W.pink][i], 120, 30, u));
