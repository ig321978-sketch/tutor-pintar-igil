import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 5 Bab 9 Sub-Bab A (membaca, menulis, nilai tempat): tabel nilai tempat enam kolom, uang, lemari, dan kartu angka.
 * Berkas ini TIDAK dipakai bab lain. Semua fungsi mengembalikan data benda (Obj) untuk mesin Story.
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
  daun: "#86EFAC",
  krem: "#FEF9C3",
  langit: "#DBEAFE",
  jingga: "#FDBA74",
  merahMuda: "#FECACA",
};

type Opsi = Partial<Obj>;

export const teks = (id: string, x: number, y: number, isi: string, u = 10, warna: string = W.biru, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi, u, warna, ...o });
export const kotak = (id: string, x: number, y: number, w: number, h: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "kotak", x, y, w, h, warna, garis, rx: 3, tebal: 1.5, ...o });
export const bulat = (id: string, x: number, y: number, r: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "bulat", x, y, r, warna, garis, tebal: 1.5, ...o });
export const garis = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "garis", x, y, x2, y2, warna, tebal, ...o });
export const panah = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "panah", x, y, x2, y2, warna, tebal, ...o });
export const jalur = (id: string, x: number, y: number, d: string, warna: string, garisW: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "jalur", x, y, d, warna, garis: garisW, tebal: 1.2, ...o });
export const emo = (id: string, x: number, y: number, e: string, u = 22, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi: e, u, warna: W.biru, ...o });

/** Judul adegan di tengah atas. */
export const judul = (isi: string, warna: string = W.ungu): Obj => teks("jud", 150, 18, isi, 11, warna);

/** Balon kata satu atau beberapa baris, titik tengah (cx, y). */
export function balon(id: string, cx: number, y: number, baris: string[], lebar: number, warna: string = W.putih, u = 7, o: Opsi = {}): Obj[] {
  const tinggi = baris.length * (u + 2.4) + 6;
  return [kotak(`${id}-k`, cx - lebar / 2, y, lebar, tinggi, warna, W.biru, { rx: 6, ...o }), ...baris.map((b, i) => teks(`${id}-t${i}`, cx, y + 4 + (i + 1) * (u + 1.8), b, u, W.biru, o))];
}

/** Kartu berwarna dengan satu sampai tiga baris teks, pojok kiri-atas (x, y). */
export function kartu(id: string, x: number, y: number, w: number, h: number, warna: string, baris: string[], u = 8.6, o: Opsi = {}): Obj[] {
  const mulai = y + h / 2 - ((baris.length - 1) * (u + 3)) / 2 + u * 0.35;
  return [kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 8, ...o }), ...baris.map((b, i) => teks(`${id}-t${i}`, x + w / 2, mulai + i * (u + 3), b, u, W.biru, o))];
}

/* ------------------------------ Tabel nilai tempat ------------------------------ */

/** Nama kolom nilai tempat, dari ratus ribuan (0) sampai satuan (5). */
export const NAMA_KOLOM: [string, string][] = [["Ratus", "Ribuan"], ["Puluh", "Ribuan"], ["Ribuan", ""], ["Ratusan", ""], ["Puluhan", ""], ["Satuan", ""]];
/** Nilai tempat tiap kolom. */
export const NILAI_KOLOM = [100000, 10000, 1000, 100, 10, 1];
const KEPALA = 24;

/** Tabel nilai tempat kosong: kolom `dari` sampai `sampai` (0 = ratus ribuan, 5 = satuan). Id: `${id}-h{c}`, `${id}-ha{c}`, `${id}-hb{c}`, `${id}-c{c}`. */
export function tabelNilai(id: string, x: number, y: number, kolW: number, dari = 0, sampai = 5, tinggiSel = 30, o: Opsi = {}): Obj[] {
  const out: Obj[] = [];
  for (let c = dari; c <= sampai; c += 1) {
    const px = x + (c - dari) * kolW;
    out.push(kotak(`${id}-h${c}`, px, y, kolW, KEPALA, c < 3 ? W.langit : W.krem, W.biru, { rx: 0, tebal: 1, ...o }));
    const [a, b] = NAMA_KOLOM[c];
    if (b) out.push(teks(`${id}-ha${c}`, px + kolW / 2, y + 10, a, 6.4, W.biru, o), teks(`${id}-hb${c}`, px + kolW / 2, y + 19, b, 6.4, W.biru, o));
    else out.push(teks(`${id}-ha${c}`, px + kolW / 2, y + 15, a, 6.4, W.biru, o));
    out.push(kotak(`${id}-c${c}`, px, y + KEPALA, kolW, tinggiSel, W.putih, W.biru, { rx: 0, tebal: 1, ...o }));
  }
  return out;
}

/** Satu digit pada sel kolom `c` tabel nilai tempat (id `${id}-d${c}`). */
export function digit(id: string, x: number, y: number, kolW: number, dari: number, c: number, ch: string, u = 16, warna: string = W.biru, tinggiSel = 30, o: Opsi = {}): Obj {
  return teks(`${id}-d${c}`, x + (c - dari) * kolW + kolW / 2, y + KEPALA + tinggiSel / 2 + u * 0.35, ch, u, warna, o);
}

/** Garis putus pemisah tiga angka (titik ribuan) di antara kolom ribuan dan ratusan. */
export function pemisah(id: string, x: number, y: number, kolW: number, dari = 0, tinggiSel = 30): Obj {
  return garis(id, x + (3 - dari) * kolW, y - 5, 0, KEPALA + tinggiSel + 10, W.merah, 2, { putus: true });
}

/** Id semua benda (kepala dan sel) satu kolom tabel nilai tempat. */
export const idKolom = (id: string, c: number): string[] => [`${id}-h${c}`, `${id}-ha${c}`, `${id}-hb${c}`, `${id}-c${c}`];

/* ------------------------------ Benda ------------------------------ */

/** Lembar uang: kotak berwarna dengan nilai di tengah. */
export function uang(id: string, x: number, y: number, w: number, h: number, nilai: string, warna: string, o: Opsi = {}): Obj[] {
  return [kotak(`${id}-k`, x, y, w, h, warna, W.hitam, { rx: 4, tebal: 1.4, ...o }), teks(`${id}-t`, x + w / 2, y + h / 2 + 3.6, nilai, 10.5, W.hitam, o)];
}

/** Lemari kayu dua pintu, pojok kiri-atas (x, y), tinggi 86 s. */
export function lemari(id: string, x: number, y: number, s = 1, o: Opsi = {}): Obj[] {
  return [
    kotak(`${id}-a`, x, y, 60 * s, 86 * s, "#B45309", W.coklat, { rx: 3, ...o }),
    kotak(`${id}-c`, x + 5 * s, y + 7 * s, 22 * s, 72 * s, "#D97706", W.coklat, { rx: 2, tebal: 1, ...o }),
    kotak(`${id}-d`, x + 33 * s, y + 7 * s, 22 * s, 72 * s, "#D97706", W.coklat, { rx: 2, tebal: 1, ...o }),
    bulat(`${id}-e`, x + 25 * s, y + 44 * s, 2 * s, W.emas, W.coklat, { tebal: 0.8, ...o }),
    bulat(`${id}-f`, x + 35 * s, y + 44 * s, 2 * s, W.emas, W.coklat, { tebal: 0.8, ...o }),
  ];
}

/** Kartu bilangan persegi dengan satu angka, pojok kiri-atas (x, y). */
export function kartuAngka(id: string, x: number, y: number, ch: string, warna: string = W.krem, o: Opsi = {}): Obj[] {
  return [kotak(`${id}-k`, x, y, 28, 34, warna, W.biru, { rx: 5, ...o }), teks(`${id}-t`, x + 14, y + 24, ch, 18, W.biru, o)];
}

/** Bacaan bilangan dua kelompok (kiri dan kanan), titik tengah (cx, y). Kiri biru muda, kanan kuning. */
export function bacaanDua(id: string, cx: number, y: number, kiri: string, kanan: string, u = 8.6, o: Opsi = {}): Obj[] {
  return [
    kotak(`${id}-kk`, 12, y, 276, 17, W.langit, W.biru, { rx: 6, tebal: 1.2, ...o }),
    teks(`${id}-kt`, cx, y + 12, kiri, u, W.biru, o),
    kotak(`${id}-rk`, 12, y + 20, 276, 17, W.krem, W.biru, { rx: 6, tebal: 1.2, ...o }),
    teks(`${id}-rt`, cx, y + 32, kanan, u, W.biru, o),
  ];
}
