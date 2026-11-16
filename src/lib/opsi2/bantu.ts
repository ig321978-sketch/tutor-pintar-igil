import { eja } from "../../components/modul/story/kit/dasar";
import type { Pengacak } from "./acak";
import type { Param, Pengecoh, Pilihan, SoalSpec } from "./tipe";

/** Mengisi sisipan {kunci} pada teks. Galat bila ada sisipan tanpa isi, supaya salah ketik ketahuan. */
export function isiTemplat(templat: string, isi: Record<string, string>): string {
  return templat.replace(/\{(\w+)\}/g, (_, k: string) => {
    if (!(k in isi)) throw new Error(`Sisipan {${k}} tidak ada isinya: ${templat}`);
    return isi[k];
  });
}

/** Mengeja bilangan menjadi kata (tanpa digit). */
export const kataBilangan = eja;

/** Mengambil parameter bilangan; galat bila bukan bilangan bulat. */
export function paramInt(p: Param, kunci: string, bawaan?: number): number {
  const v = p[kunci];
  if (v === undefined && bawaan !== undefined) return bawaan;
  if (typeof v !== "number" || !Number.isInteger(v)) throw new Error(`Param "${kunci}" harus bilangan bulat.`);
  return v;
}

/** Mengambil rentang [lo, hi] dari param; galat bila bentuknya keliru. */
export function paramRentang(p: Param, kunci: string, bawaan: [number, number]): [number, number] {
  const v = p[kunci];
  if (v === undefined) return bawaan;
  if (!Array.isArray(v) || v.length !== 2 || v.some((x) => typeof x !== "number" || !Number.isInteger(x)) || v[0] > v[1]) throw new Error(`Param "${kunci}" harus [lo, hi].`);
  return [v[0], v[1]];
}

const bulat1 = (x: number): number => Math.round(x * 10) / 10;

/**
 * Menyebar n benda berserakan (persen 0 sampai 100) dengan kisi goyang: tidak pernah bertumpuk.
 * Kisi 4 kolom x 3 baris (paling banyak dua belas benda).
 */
export function sebarBerserakan(rng: Pengacak, n: number, kolom = 4, baris = 3): { x: number; y: number }[] {
  if (n > kolom * baris) throw new Error("Terlalu banyak benda untuk kisi.");
  const sel = rng.kocok(Array.from({ length: kolom * baris }, (_, i) => i)).slice(0, n);
  const lebar = 100 / kolom;
  const tinggi = 100 / baris;
  return sel.map((s) => ({
    x: bulat1((s % kolom + 0.5) * lebar + rng.int(-6, 6) * (lebar / 40)),
    y: bulat1((Math.floor(s / kolom) + 0.5) * tinggi + rng.int(-6, 6) * (tinggi / 40)),
  }));
}

/** Menaruh n benda melingkar (persen), mulai dari atas searah jarum jam. */
export function sebarMelingkar(n: number, jariX = 36, jariY = 34): { x: number; y: number }[] {
  return Array.from({ length: n }, (_, i) => {
    const sudut = -Math.PI / 2 + (2 * Math.PI * i) / n;
    return { x: bulat1(50 + jariX * Math.cos(sudut)), y: bulat1(50 + jariY * Math.sin(sudut)) };
  });
}

/**
 * Pilihan banyaknya benda, dengan pengecoh dari kekeliruan nyata anak:
 * satu terlewat (n-1), satu terhitung dua kali (n+1), lalu dua sekaligus. `khusus` didahulukan.
 * Semua dalam [min, max], unik, urutan dikocok. Label dan suara berupa kata bilangan (tanpa digit).
 */
export function opsiHitung(
  rng: Pengacak,
  n: number,
  o: { min: number; max: number; jumlah: number; khusus?: { angka: number; alasan: string }[] },
): { pilihan: Pilihan[]; pengecoh: Pengecoh[]; kunciPilihan: string } {
  const calon: { angka: number; alasan: string }[] = [
    ...(o.khusus ?? []),
    { angka: n - 1, alasan: "terlewat satu benda" },
    { angka: n + 1, alasan: "satu benda terhitung dua kali" },
    { angka: n - 2, alasan: "terlewat dua benda" },
    { angka: n + 2, alasan: "dua benda terhitung dua kali" },
  ];
  const dipakai: { angka: number; alasan: string }[] = [];
  for (const c of calon) {
    if (dipakai.length >= o.jumlah - 1) break;
    if (c.angka === n || c.angka < o.min || c.angka > o.max) continue;
    if (dipakai.some((d) => d.angka === c.angka)) continue;
    dipakai.push(c);
  }
  for (let a = o.min; a <= o.max && dipakai.length < o.jumlah - 1; a += 1) {
    if (a !== n && !dipakai.some((d) => d.angka === a)) dipakai.push({ angka: a, alasan: "salah hitung" });
  }
  const semua = rng.kocok([{ angka: n, alasan: "" }, ...dipakai]);
  const pilihan = semua.map((s): Pilihan => ({ id: String(s.angka), label: kataBilangan(s.angka), suara: kataBilangan(s.angka) }));
  return { pilihan, pengecoh: dipakai.map((d) => ({ id: String(d.angka), alasan: d.alasan })), kunciPilihan: String(n) };
}

/** Membaca jawaban bebas sebagai objek; mengembalikan objek kosong bila bukan objek. */
export const sebagaiObjek = (j: unknown): Record<string, unknown> => (j && typeof j === "object" && !Array.isArray(j) ? (j as Record<string, unknown>) : {});

/** Membaca jawaban sebagai daftar teks; bukan daftar teks menjadi daftar kosong. */
export const sebagaiDaftar = (j: unknown): string[] => (Array.isArray(j) && j.every((x) => typeof x === "string") ? (j as string[]) : []);

/** Suara instruksi dari spesifikasi dengan sisipan bilangan yang dieja. */
export const suaraSpec = (spec: SoalSpec, isi: Record<string, number | string> = {}): string =>
  isiTemplat(
    spec.instruksi,
    Object.fromEntries(Object.entries(isi).map(([k, v]) => [k, typeof v === "number" ? kataBilangan(v) : v])),
  );
