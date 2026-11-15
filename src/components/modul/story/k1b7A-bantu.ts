import type { Aksi, KetukanStory, Obj } from "./logika-story";
import { CH, CVH, CW, W, X0, kartuAngka, kotak, teks, type Titik } from "./k1b7A-gambar";

/** Penyingkat penulisan naskah Story Sub-Bab A Bab 7 Kelas 1 (khusus sub-bab ini). */
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
 * Aksi menghitung sambil menyentuh: tiap nama bilangan dalam suara memunculkan angka (digit) di atas benda ke-i dan memindahkan tangan ke bawahnya.
 * Angka `${id}n{i}`, tangan `tg`. `dari` = bilangan pertama dalam deret (bawaan satu), `awal` = nomor benda pertama yang dihitung.
 * `tanganAda`: tangan sudah ada (hanya dipindah). `naik`: jarak angka di atas benda. `turun`: jarak tangan di bawah benda (0 = tanpa tangan).
 */
export function hitungAksi(suara: string, id: string, pts: Titik[], opsi: { setelah?: string; dari?: number; awal?: number; tanganAda?: boolean; naik?: number; turun?: number } = {}): Aksi[] {
  const dari = opsi.dari ?? 1;
  const awal = opsi.awal ?? 0;
  const naik = opsi.naik ?? 14;
  const turun = opsi.turun ?? 24;
  const pos = urutBilangan(suara, dari, dari + pts.length - 1 - awal, opsi.setelah);
  return pts.slice(awal).flatMap((p, q) => {
    const i = awal + q;
    const angka = tambah(pos[q], teks(`${id}n${i}`, p.x, p.y - naik, String(dari + q), 10.6, W.merah));
    if (turun === 0) return [angka];
    const tg = { id: "tg", t: "teks" as const, x: p.x, y: p.y + turun, isi: "\u{1F446}", u: 20, warna: W.biru };
    if (q === 0 && !opsi.tanganAda) return [angka, tambah(pos[q], tg)];
    return [angka, ubah(pos[q], { id: "tg", x: p.x, y: p.y + turun })];
  });
}

/**
 * Hitung kotak pada tumpukan menegak: angka `${id}n{i}` muncul di samping kiri kotak ke-i (jarak `dx`) saat nama bilangan diucapkan.
 * Tanpa tangan. `dari` = bilangan pertama.
 */
export function hitungSamping(suara: string, id: string, pts: Titik[], opsi: { setelah?: string; dx?: number } = {}): Aksi[] {
  const pos = urutBilangan(suara, 1, pts.length, opsi.setelah);
  const dx = opsi.dx ?? -24;
  return pts.map((p, i) => tambah(pos[i], teks(`${id}n${i}`, p.x + dx, p.y + CVH * 0.3, String(i + 1), 9.6, W.merah)));
}

/** Pilihan kartu kata (id c1..cn), pojok kiri-atas di tinggi `y`, lebar kartu menyesuaikan jumlah. */
export const pilihKata = (y: number, isi: string[]): ReturnType<typeof kartuAngka> => {
  const n = isi.length;
  const w = n === 2 ? 120 : 84;
  const jarak = n === 2 ? 20 : 8;
  const x0 = (300 - (n * w + (n - 1) * jarak)) / 2;
  return isi.flatMap((t, i) => kartuAngka(`c${i + 1}`, x0 + i * (w + jarak), y, t, [W.hijauMuda, W.pink, W.langit][i], w, 30, 11));
};

/**
 * Pindahkan batang mendatar `s` (n kotak) ke baris dengan pojok kiri-atas `y`: kotak, nama, dan tulisan panjang (bila ada) ikut pindah.
 */
export function pindahBatang(at: At, s: string, n: number, y: number, adaLn = true): Aksi {
  const u: Ubah[] = [];
  for (let i = 0; i < n; i += 1) u.push({ id: `${s}${i}`, y });
  u.push({ id: `${s}-nm`, y: y + CH / 2 + 3 });
  if (adaLn) u.push({ id: `${s}-ln`, y: y + CH / 2 + 3 });
  return { at, ubah: u };
}

/** Geser batang mendatar `s` (n kotak) supaya mulai dari x0. */
export const geserBatang = (at: At, s: string, n: number, x0: number): Aksi => ({ at, ubah: Array.from({ length: n }, (_, i) => ({ id: `${s}${i}`, x: x0 + i * CW })) });

/**
 * Isi satuan satu demi satu mengikuti nama bilangan: tiap bilangan memunculkan kotak satuan `${s}{i}` (batang mendatar, pojok kiri-atas di `y`),
 * angka `${s}n{i}` di atasnya, dan tangan `tg` di bawahnya. `cw` = lebar satuan, `tangan: false` tanpa tangan.
 */
export function isiHitung(suara: string, s: string, y: number, n: number, warna: string, opsi: { setelah?: string; x0?: number; cw?: number; tanganAda?: boolean; tangan?: boolean } = {}): Aksi[] {
  const x0 = opsi.x0 ?? X0;
  const cw = opsi.cw ?? CW;
  const pos = urutBilangan(suara, 1, n, opsi.setelah);
  return Array.from({ length: n }, (_, i) => {
    const cx = x0 + i * cw + cw / 2;
    const cy = y + CH / 2;
    const aksi: Aksi[] = [tambah(pos[i], kotak(`${s}${i}`, x0 + i * cw, y, cw, CH, warna, W.biru, { rx: 1, tebal: 1.3 }), teks(`${s}n${i}`, cx, cy - 14, String(i + 1), 10.6, W.merah))];
    if (opsi.tangan === false) return aksi;
    if (i === 0 && !opsi.tanganAda) aksi.push(tambah(pos[i], { id: "tg", t: "teks", x: cx, y: cy + 24, isi: "\u{1F446}", u: 20, warna: W.biru }));
    else aksi.push(ubah(pos[i], { id: "tg", x: cx, y: cy + 24 }));
    return aksi;
  }).flat();
}
