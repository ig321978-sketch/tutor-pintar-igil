import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 5 Bab 2 Sub-Bab B (kelipatan persekutuan dan KPK): tabel bilangan, deret kelipatan bersel,
 * garis waktu jadwal, dan irisan dua lingkaran. Berkas ini TIDAK dipakai bab lain. Semua fungsi mengembalikan data benda (Obj) untuk mesin Story.
 */

export const W = {
  biru: "#1C01A5",
  emas: "#FFC800",
  merah: "#DC2626",
  hijau: "#16A34A",
  putih: "#FFFFFF",
  hitam: "#1F2937",
  abu: "#CBD5E1",
  ungu: "#7C3AED",
  coklat: "#92400E",
  krem: "#FEF9C3",
  langit: "#DBEAFE",
  jingga: "#FDBA74",
  merahMuda: "#FECACA",
  hijauMuda: "#DCFCE7",
  pink: "#FBCFE8",
  hijauPita: "#86EFAC",
  merahPita: "#F87171",
};

type Opsi = Partial<Obj>;

export const teks = (id: string, x: number, y: number, isi: string, u = 10, warna: string = W.biru, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi, u, warna, ...o });
export const kotak = (id: string, x: number, y: number, w: number, h: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "kotak", x, y, w, h, warna, garis, rx: 3, tebal: 1.5, ...o });
export const bulat = (id: string, x: number, y: number, r: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "bulat", x, y, r, warna, garis, tebal: 1.4, ...o });
export const garis = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "garis", x, y, x2, y2, warna, tebal, ...o });
export const panah = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "panah", x, y, x2, y2, warna, tebal, ...o });
export const emo = (id: string, x: number, y: number, e: string, u = 22, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi: e, u, warna: W.biru, ...o });

/** Judul adegan di tengah atas. */
export const judul = (isi: string, warna: string = W.ungu): Obj => teks("jud", 150, 18, isi, 11, warna);

/** Kartu berwarna dengan satu sampai tiga baris teks, pojok kiri-atas (x, y). */
export function kartu(id: string, x: number, y: number, w: number, h: number, warna: string, baris: string[], u = 8.6, o: Opsi = {}): Obj[] {
  const mulai = y + h / 2 - ((baris.length - 1) * (u + 3)) / 2 + u * 0.35;
  return [kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 8, ...o }), ...baris.map((b, i) => teks(`${id}-t${i}`, x + w / 2, mulai + i * (u + 3), b, u, W.biru, o))];
}

/** Id kartu (kotak dan teks) untuk dihapus. */
export const idKartu = (id: string, n = 1): string[] => [`${id}-k`, ...Array.from({ length: n }, (_, i) => `${id}-t${i}`)];

/** Kelipatan n sebanyak `banyak` bilangan pertama. */
export const kelipatan = (n: number, banyak: number): number[] => Array.from({ length: banyak }, (_, i) => n * (i + 1));

/** Tulisan deret kelipatan, mis. "kelipatan 4: 4, 8, 12, ..." (diuji: harus kelipatan n berurutan dari n). */
export const tulisKelipatan = (n: number, banyak: number): string => `kelipatan ${n}: ${kelipatan(n, banyak).join(", ")}, ...`;

/** Warna sel menurut nomor bilangan; bawaan putih. */
export type PetaWarna = (n: number) => string;

/**
 * Tabel bilangan `dari` sampai `sampai` tersusun `kolom` kolom, baris demi baris, mulai (x, y), tiap sel cw x ch.
 * Sel (kotak) berid `${id}-${i}` dengan i = bilangan - dari; angka (teks) berid `${id}t${i}`.
 */
export function tabelAngka(id: string, x: number, y: number, cw: number, ch: number, kolom: number, dari: number, sampai: number, warna: PetaWarna = () => W.putih, u = 8.6): Obj[] {
  const out: Obj[] = [];
  for (let n = dari; n <= sampai; n += 1) {
    const i = n - dari;
    const cx = x + (i % kolom) * cw;
    const cy = y + Math.floor(i / kolom) * ch;
    out.push(kotak(`${id}-${i}`, cx, cy, cw, ch, warna(n), W.biru, { rx: 0, tebal: 1 }));
    out.push(teks(`${id}t${i}`, cx + cw / 2, cy + ch / 2 + u * 0.35, String(n), u, W.hitam));
  }
  return out;
}

/** Id sel tabel untuk bilangan-bilangan tertentu. */
export const idSel = (id: string, dari: number, angka: number[]): string[] => angka.map((n) => `${id}-${n - dari}`);

/**
 * Deret sel mendatar dengan daftar bilangan `angka` mulai (x, y), tiap sel cw x ch. Sel berid `${id}-${i}`, angka berid `${id}t${i}`.
 * Sel yang bilangannya ada di `tandai` diwarnai `warnaTanda`, lainnya putih.
 */
export function deretAngka(id: string, x: number, y: number, cw: number, ch: number, angka: number[], tandai: number[] = [], warnaTanda: string = W.emas, u = 8.6): Obj[] {
  const out: Obj[] = [];
  angka.forEach((n, i) => {
    out.push(kotak(`${id}-${i}`, x + i * cw, y, cw, ch, tandai.includes(n) ? warnaTanda : W.putih, W.biru, { rx: 0, tebal: 1 }));
    out.push(teks(`${id}t${i}`, x + i * cw + cw / 2, y + ch / 2 + u * 0.35, String(n), u, W.hitam));
  });
  return out;
}

/** Garis waktu hari: sumbu dari (x, y) sepanjang `hari` kali `langkah`, tanda tiap hari, angka hari tiap `tiapAngka` hari. Id `${id}-g`, `${id}-b0`.. */
export function garisHari(id: string, x: number, y: number, hari: number, langkah: number, tiapAngka = 1): Obj[] {
  const out: Obj[] = [garis(`${id}-g`, x, y, hari * langkah, 0, W.hitam, 1.8)];
  for (let i = 0; i <= hari; i += 1) {
    out.push(garis(`${id}-b${i}`, x + i * langkah, y - 3, 0, 6, W.hitam, 1.3));
    if (i % tiapAngka === 0) out.push(teks(`${id}-n${i}`, x + i * langkah, y + 16, String(i), 8.2, W.hitam));
  }
  return out;
}

/** Posisi mendatar hari ke-i pada garis hari. */
export const posisiHari = (x: number, langkah: number, i: number): number => x + i * langkah;
