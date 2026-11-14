import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 5 Bab 6 Sub-Bab B (pengertian sudut): sudut dengan kaki dan titik sudut, tanda siku-siku, lipatan kertas siku-siku,
 * jam analog, dan kotak pensil. Berkas ini TIDAK dipakai bab lain. Semua fungsi mengembalikan data benda (Obj) untuk mesin Story.
 * Arah sudut dihitung berlawanan arah jarum jam dari arah kanan (seperti pelajaran matematika); sumbu y layar ke bawah.
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
  jeruk: "#FB923C",
  krem: "#FEF9C3",
  muda: "#DBEAFE",
  hijauMuda: "#BBF7D0",
  merahMuda: "#FECACA",
  ungMuda: "#EDE9FE",
  langitMuda: "#E0F2FE",
};

type Opsi = Partial<Obj>;
export type Pt = [number, number];

export const teks = (id: string, x: number, y: number, isi: string, u = 10, warna: string = W.biru, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi, u, warna, ...o });
export const kotak = (id: string, x: number, y: number, w: number, h: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "kotak", x, y, w, h, warna, garis, rx: 3, tebal: 1.5, ...o });
export const bulat = (id: string, x: number, y: number, r: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "bulat", x, y, r, warna, garis, tebal: 1.5, ...o });
export const garis = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "garis", x, y, x2, y2, warna, tebal, ...o });
export const panah = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "panah", x, y, x2, y2, warna, tebal, ...o });
export const jalur = (id: string, x: number, y: number, d: string, warna: string, garisW: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "jalur", x, y, d, warna, garis: garisW, tebal: 1.2, ...o });
export const emo = (id: string, x: number, y: number, e: string, u = 22, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi: e, u, warna: W.biru, ...o });

/** Id semua benda dalam daftar (untuk dihapus). */
export const idDari = (...daftar: Array<Obj | Obj[]>): string[] => daftar.flat().map((o) => o.id);

/** Kartu berjudul: kotak berwarna dengan satu sampai tiga baris teks, pojok kiri-atas (x, y). */
export function kartu(id: string, x: number, y: number, w: number, h: number, warna: string, baris: string[], u = 8.6, o: Opsi = {}): Obj[] {
  const mulai = y + h / 2 - ((baris.length - 1) * (u + 3)) / 2 + u * 0.35;
  return [kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 8, ...o }), ...baris.map((b, i) => teks(`${id}-t${i}`, x + w / 2, mulai + i * (u + 3), b, u))];
}

/** Kartu satu metode luar: nama (satu sampai dua baris) dan arti singkat. Lebar 134, tinggi 70. */
export const kartuMetode = (id: string, x: number, y: number, warna: string, baris: string[], arti: string): Obj[] => [
  kotak(`${id}-k`, x, y, 134, 70, warna, W.biru, { rx: 10 }),
  ...baris.map((b, i) => teks(`${id}-n${i}`, x + 67, y + 24 + i * 12, b, 8.6)),
  teks(`${id}-a`, x + 67, y + 28 + baris.length * 12, arti, 7, W.ungu),
];

/** Tanda centang atau silang di (x, y) (garis dasar teks). */
export const tanda = (id: string, x: number, y: number, ya: boolean, u = 12): Obj => teks(id, x, y, ya ? "✓" : "✗", u, ya ? W.hijau : W.merah);

/** Gelembung ide siswa: kotak dengan nama di kiri-atas dan satu sampai tiga baris isi rata kiri. */
export function ide(id: string, x: number, y: number, w: number, h: number, nama: string, baris: string[], warna: string = W.krem, u = 8): Obj[] {
  return [
    kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 8 }),
    teks(`${id}-n`, x + 8, y + 12, nama, 8.6, W.ungu, { anchor: "start" }),
    ...baris.map((b, i) => teks(`${id}-t${i}`, x + 8, y + 25 + i * (u + 3.5), b, u, W.biru, { anchor: "start" })),
  ];
}

/* ------------------------------ Sudut: titik sudut, kaki, daerah, dan jenis ------------------------------ */

const rad = (d: number): number => (d * Math.PI) / 180;
const f1 = (n: number): string => n.toFixed(1);

/** Titik pada jarak l dari (cx, cy) ke arah `arah` derajat (berlawanan arah jarum jam dari kanan). */
export const ujung = (cx: number, cy: number, arah: number, l: number): Pt => [cx + l * Math.cos(rad(arah)), cy - l * Math.sin(rad(arah))];

/** Daerah sudut (juring) berpusat di (x, y): mulai dari arah `rot`, selebar `besar`, jari-jari r. */
export function sektor(id: string, x: number, y: number, rot: number, besar: number, r: number, warna: string, garisW: string = "none", o: Opsi = {}): Obj {
  const p1 = ujung(0, 0, rot, r);
  const p2 = ujung(0, 0, rot + besar, r);
  const d = `M0 0 L${f1(p1[0])} ${f1(p1[1])} A${f1(r)} ${f1(r)} 0 ${besar > 180 ? 1 : 0} 0 ${f1(p2[0])} ${f1(p2[1])} Z`;
  return jalur(id, x, y, d, warna, garisW, { tebal: 1, ...o });
}

/** Sudut lengkap: daerah berwarna (`-d`), kaki pertama (`-a`), kaki kedua (`-b`), dan titik sudut (`-t`). Kaki sepanjang `panjang`. */
export function sudut(id: string, cx: number, cy: number, rot: number, besar: number, panjang = 60, warna: string = W.merahMuda, kaki: string = W.biru, o: Opsi = {}): Obj[] {
  const a = ujung(0, 0, rot, panjang);
  const b = ujung(0, 0, rot + besar, panjang);
  return [
    sektor(`${id}-d`, cx, cy, rot, besar, panjang * 0.4, warna, "none", o),
    garis(`${id}-a`, cx, cy, a[0], a[1], kaki, 2.4, o),
    garis(`${id}-b`, cx, cy, b[0], b[1], kaki, 2.4, o),
    bulat(`${id}-t`, cx, cy, 2.8, W.merah, W.merah, o),
  ];
}

/** Ujung kaki sudut (koordinat mutlak), untuk menaruh label. */
export const ujungKaki = (cx: number, cy: number, arah: number, panjang: number): Pt => ujung(cx, cy, arah, panjang);

/** Tanda siku-siku (dua garis kecil membentuk pojok) di titik sudut (cx, cy) untuk sudut yang mulai di arah `rot`. */
export function tandaSiku(id: string, cx: number, cy: number, rot: number, s = 7, warna: string = W.merah, o: Opsi = {}): Obj {
  const p1 = ujung(0, 0, rot, s);
  const p2 = ujung(0, 0, rot + 90, s);
  const d = `M${f1(p1[0])} ${f1(p1[1])} L${f1(p1[0] + p2[0])} ${f1(p1[1] + p2[1])} L${f1(p2[0])} ${f1(p2[1])}`;
  return jalur(id, cx, cy, d, "none", warna, { tebal: 1.5, ...o });
}

/** Lipatan kertas siku-siku (patokan): pojok kertas di (cx, cy), kaki mulai arah `rot`, sisi s. */
export function kertasSiku(id: string, cx: number, cy: number, rot: number, s = 30, o: Opsi = {}): Obj {
  const p1 = ujung(0, 0, rot, s);
  const p3 = ujung(0, 0, rot + 90, s);
  const d = `M0 0 L${f1(p1[0])} ${f1(p1[1])} L${f1(p1[0] + p3[0])} ${f1(p1[1] + p3[1])} L${f1(p3[0])} ${f1(p3[1])} Z`;
  return jalur(id, cx, cy, d, W.krem, W.emas, { tebal: 1.8, ...o });
}

export type Jenis = "lancip" | "siku-siku" | "tumpul";
/** Jenis sudut menurut perbandingan dengan sudut siku-siku (besar kurang dari setengah putaran). */
export const jenisDari = (besar: number): Jenis => (Math.abs(besar - 90) < 1e-9 ? "siku-siku" : besar < 90 ? "lancip" : "tumpul");

/* ------------------------------ Jam analog ------------------------------ */

/** Sudut terkecil antara jarum pendek dan jarum panjang. `awal` adalah arah jarum (putaran searah jarum jam dari angka 12) tempat daerah mulai. */
export function sudutJam(j: number, m: number): { a: number; b: number; theta: number; awal: number } {
  const a = ((j % 12) * 30 + m * 0.5) % 360;
  const b = (m * 6) % 360;
  const sel = (b - a + 360) % 360;
  return sel <= 180 ? { a, b, theta: sel, awal: a } : { a, b, theta: 360 - sel, awal: b };
}

const dua = (n: number): string => String(n).padStart(2, "0");
/** Tulisan pukul seperti pada buku, misalnya 08.00. */
export const pukul = (j: number, m: number): string => `${dua(j)}.${dua(m)}`;

/** Jam analog berpusat di (cx, cy): muka jam, angka 12, 3, 6, 9 (bila cukup besar), daerah sudut kedua jarum, jarum pendek (`-p`), jarum panjang (`-m`). */
export function jam(id: string, cx: number, cy: number, r: number, j: number, m: number, warna: string = W.merahMuda, o: Opsi = {}): Obj[] {
  const s = sudutJam(j, m);
  const arah = (c: number): number => 90 - c;
  const bul2 = (q: number[]): [number, number] => [Math.round(q[0] * 100) / 100, Math.round(q[1] * 100) / 100];
  const pend = bul2(ujung(0, 0, arah(s.a), r * 0.36));
  const pang = bul2(ujung(0, 0, arah(s.b), r * 0.55));
  const u = Math.max(5.5, r * 0.22);
  const angka: Obj[] =
    r >= 22
      ? [
          teks(`${id}-n12`, cx, cy - r + u + 1, "12", u, W.hitam, o),
          teks(`${id}-n3`, cx + r - u * 0.9, cy + u * 0.35, "3", u, W.hitam, o),
          teks(`${id}-n6`, cx, cy + r - 2, "6", u, W.hitam, o),
          teks(`${id}-n9`, cx - r + u * 0.9, cy + u * 0.35, "9", u, W.hitam, o),
        ]
      : [];
  return [
    bulat(`${id}-w`, cx, cy, r, W.putih, W.biru, { tebal: 2, ...o }),
    ...angka,
    sektor(`${id}-d`, cx, cy, arah(s.awal + s.theta), s.theta, r * 0.3, warna, "none", o),
    garis(`${id}-p`, cx, cy, pend[0], pend[1], W.biru, 3, o),
    garis(`${id}-m`, cx, cy, pang[0], pang[1], W.hijau, 2, o),
    bulat(`${id}-t`, cx, cy, 2, W.biru, W.biru, o),
  ];
}

/* ------------------------------ Enam benda Ayo Berlatih Soal 1 (Buku Siswa hlm. 172-173) ------------------------------ */

export type BendaSoal = { h: string; benda: string; rot: number; besar: number };
/** Besar sudut tiap benda dirancang untuk gambar ini; jenisnya sama dengan kunci Buku Panduan Guru hlm. 261. Jam pukul 08.00 dihitung dari kedua jarum. */
export const SOAL1: BendaSoal[] = [
  { h: "a", benda: "jam pukul 08.00", rot: 90 - sudutJam(8, 0).awal - sudutJam(8, 0).theta, besar: sudutJam(8, 0).theta },
  { h: "b", benda: "persimpangan jalan", rot: 20, besar: 50 },
  { h: "c", benda: "tangga rumah", rot: 35, besar: 145 },
  { h: "d", benda: "gunting dibuka", rot: 70, besar: 40 },
  { h: "e", benda: "kipas dibuka", rot: 25, besar: 130 },
  { h: "f", benda: "pojokan jendela", rot: 0, besar: 90 },
];
