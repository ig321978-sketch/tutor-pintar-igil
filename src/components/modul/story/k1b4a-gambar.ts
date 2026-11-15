import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 1 Bab 4 Sub-Bab A (mendeskripsikan benda berdasarkan bentuk: lengkung, segitiga, segi empat):
 * bangun datar yang bisa diputar, penanda sisi dan sudut yang tergambar bertahap, benda sehari-hari, keranjang, dan kartu jawaban.
 * Berkas ini TIDAK dipakai bab lain.
 * Penanda: sisi `${id}s{i}` (garis merah) dengan angka `${id}sn{i}`; sudut `${id}d{i}` (titik) dengan angka `${id}dn{i}`.
 */

export const W = {
  biru: "#1C01A5",
  emas: "#FFC800",
  merah: "#DC2626",
  hijau: "#16A34A",
  putih: "#FFFFFF",
  abu: "#CBD5E1",
  ungu: "#7C3AED",
  coklat: "#92400E",
  krem: "#FEF9C3",
  langit: "#DBEAFE",
  merahMuda: "#FECACA",
  hijauMuda: "#DCFCE7",
  pink: "#FBCFE8",
  lavender: "#EDE9FE",
  oranye: "#FBA919",
};

/** Warna bentuk: lengkung kuning, segitiga merah muda, segi empat hijau (sama dengan kegiatan mewarnai). */
export const WARNA_LENGKUNG = "#FDE047";
export const WARNA_SEGITIGA = "#F9A8D4";
export const WARNA_SEGIEMPAT = "#86EFAC";
export const OWL = "\u{1F989}";
export const ANAK_EMO = "\u{1F9D2}";

type Opsi = Partial<Obj>;
export type Titik = { x: number; y: number };

export const teks = (id: string, x: number, y: number, isi: string, u = 10, warna: string = W.biru, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi, u, warna, ...o });
export const kotak = (id: string, x: number, y: number, w: number, h: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "kotak", x, y, w, h, warna, garis, rx: 3, tebal: 1.5, ...o });
export const bulat = (id: string, x: number, y: number, r: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "bulat", x, y, r, warna, garis, tebal: 1.5, ...o });
export const garis = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "garis", x, y, x2, y2, warna, tebal, ...o });
export const emo = (id: string, x: number, y: number, e: string, u = 22, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi: e, u, warna: W.biru, ...o });
export const tangan = (x: number, y: number, id = "tg"): Obj => emo(id, x, y, "\u{1F446}", 22);

/** Judul adegan di tengah atas. */
export const judul = (isi: string, warna: string = W.ungu): Obj => teks("jud", 150, 18, isi, 11, warna);

/** Kartu berwarna dengan satu sampai tiga baris teks, pojok kiri-atas (x, y). */
export function kartu(id: string, x: number, y: number, w: number, h: number, warna: string, baris: string[], u = 9, o: Opsi = {}): Obj[] {
  const mulai = y + h / 2 - ((baris.length - 1) * (u + 3)) / 2 + u * 0.35;
  return [kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 8, ...o }), ...baris.map((b, i) => teks(`${id}-t${i}`, x + w / 2, mulai + i * (u + 3), b, u, W.biru, o))];
}

/** Kartu angka besar: pojok kiri-atas (x, y); id `${id}-k` dan `${id}-t`. */
export const kartuAngka = (id: string, x: number, y: number, angka: string, warna: string = W.krem, w = 40, h = 36, u = 22, o: Opsi = {}): Obj[] => [
  kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 6, tebal: 1.6, ...o }),
  teks(`${id}-t`, x + w / 2, y + h / 2 + u * 0.35, angka, u, W.merah, o),
];

/** Papan tulis hijau tua. */
export const papan = (id: string, x: number, y: number, w: number, h: number): Obj => kotak(id, x, y, w, h, "#166534", W.coklat, { rx: 6, tebal: 4, z: -2 });

/** Keranjang kosong dengan pojok kiri-atas (x, y); id `${id}` dan bibir `${id}-r`. */
export const keranjang = (id: string, x: number, y: number, w = 100, h = 44, o: Opsi = {}): Obj[] => [
  kotak(id, x, y, w, h, "#FDE68A", W.coklat, { rx: 6, tebal: 1.8, ...o }),
  kotak(`${id}-r`, x - 3, y - 4, w + 6, 7, "#FCD34D", W.coklat, { rx: 3, tebal: 1.4, ...o }),
];

/** Piring bundar. */
export const piring = (id: string, x: number, y: number, r = 40, o: Opsi = {}): Obj => bulat(id, x, y, r, W.putih, W.coklat, { tebal: 2.4, ...o });

/* ------------------------------ Bangun datar ------------------------------ */

const f = (n: number): string => n.toFixed(1);
const putar = (p: Titik, deg: number): Titik => {
  const r = (deg * Math.PI) / 180;
  return { x: p.x * Math.cos(r) - p.y * Math.sin(r), y: p.x * Math.sin(r) + p.y * Math.cos(r) };
};

export type JenisBangun = "segitiga" | "segiempat";

/** Titik sudut relatif terhadap pusat bangun (sebelum diputar). Segitiga: puncak, kanan-bawah, kiri-bawah. Segi empat: kiri-atas, kanan-atas, kanan-bawah, kiri-bawah. */
const titikRel = (jenis: JenisBangun, w: number, h: number): Titik[] =>
  jenis === "segitiga"
    ? [{ x: 0, y: -h / 2 }, { x: w / 2, y: h / 2 }, { x: -w / 2, y: h / 2 }]
    : [{ x: -w / 2, y: -h / 2 }, { x: w / 2, y: -h / 2 }, { x: w / 2, y: h / 2 }, { x: -w / 2, y: h / 2 }];

/** Titik sudut mutlak sebuah bangun berpusat di (cx, cy) yang diputar `rot` derajat. */
export const sudutBangun = (jenis: JenisBangun, cx: number, cy: number, w: number, h: number, rot = 0): Titik[] =>
  titikRel(jenis, w, h).map((p) => {
    const q = putar(p, rot);
    return { x: Math.round((cx + q.x) * 10) / 10, y: Math.round((cy + q.y) * 10) / 10 };
  });

/** Segitiga atau segi empat sebagai satu jalur tertutup, berpusat di (cx, cy) dan diputar `rot` derajat (sudutnya sudah dihitung, bukan diputar mesin). */
export function bangun(id: string, jenis: JenisBangun, cx: number, cy: number, w: number, h: number, warna: string, rot = 0, o: Opsi = {}): Obj {
  const rel = titikRel(jenis, w, h).map((p) => putar(p, rot));
  return { id, t: "jalur", x: cx, y: cy, d: `M${rel.map((p) => `${f(p.x)} ${f(p.y)}`).join(" L")} Z`, warna, garis: W.biru, tebal: 1.6, ...o };
}

/** Bentuk lengkung lonjong (seperti telur) berpusat di (cx, cy), setengah lebar `a` dan setengah tinggi `b`. */
export const lonjong = (id: string, cx: number, cy: number, a: number, b: number, warna: string, o: Opsi = {}): Obj => ({
  id,
  t: "jalur",
  x: cx,
  y: cy,
  d: `M${f(-a)} 0 Q${f(-a)} ${f(-b)} 0 ${f(-b)} Q${f(a)} ${f(-b)} ${f(a)} 0 Q${f(a)} ${f(b)} 0 ${f(b)} Q${f(-a)} ${f(b)} ${f(-a)} 0 Z`,
  warna,
  garis: W.biru,
  tebal: 1.6,
  ...o,
});

const pusatTitik = (pts: Titik[]): Titik => ({ x: pts.reduce((t, p) => t + p.x, 0) / pts.length, y: pts.reduce((t, p) => t + p.y, 0) / pts.length });

/** Titik di luar bangun, searah dari pusat ke titik `p`, sejauh `jarak` (untuk angka hitungan). */
function keluar(p: Titik, pusat: Titik, jarak: number): Titik {
  const dx = p.x - pusat.x;
  const dy = p.y - pusat.y;
  const l = Math.hypot(dx, dy) || 1;
  return { x: Math.round((p.x + (dx / l) * jarak) * 10) / 10, y: Math.round((p.y + (dy / l) * jarak + 3.5) * 10) / 10 };
}

/** Garis merah yang menandai sisi ke-i bangun (dari sudut i ke sudut i+1). Id `${id}s${i}`. */
export const garisSisi = (id: string, pts: Titik[], i: number, warna: string = W.merah, tebal = 3.6): Obj => {
  const a = pts[i];
  const b = pts[(i + 1) % pts.length];
  return garis(`${id}s${i}`, a.x, a.y, Math.round((b.x - a.x) * 10) / 10, Math.round((b.y - a.y) * 10) / 10, warna, tebal, { gambar: true, z: 3 });
};

/** Angka di luar sisi ke-i. Id `${id}sn${i}`. */
export const angkaSisi = (id: string, pts: Titik[], i: number, jarak = 11): Obj => {
  const a = pts[i];
  const b = pts[(i + 1) % pts.length];
  const t = keluar({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 }, pusatTitik(pts), jarak);
  return teks(`${id}sn${i}`, t.x, t.y, String(i + 1), 10, W.merah);
};

/** Titik emas pada sudut ke-i. Id `${id}d${i}`. */
export const titikSudut = (id: string, pts: Titik[], i: number): Obj => bulat(`${id}d${i}`, pts[i].x, pts[i].y, 4.6, W.emas, W.merah, { tebal: 1.8, z: 4 });

/** Angka di luar sudut ke-i. Id `${id}dn${i}`. */
export const angkaSudut = (id: string, pts: Titik[], i: number, jarak = 13): Obj => {
  const t = keluar(pts[i], pusatTitik(pts), jarak);
  return teks(`${id}dn${i}`, t.x, t.y, String(i + 1), 10, W.merah);
};

/** Id semua penanda sisi atau sudut `n` buah (untuk dihapus). */
export const idSisi = (id: string, n: number): string[] => Array.from({ length: n }, (_, i) => [`${id}s${i}`, `${id}sn${i}`]).flat();
export const idSudut = (id: string, n: number): string[] => Array.from({ length: n }, (_, i) => [`${id}d${i}`, `${id}dn${i}`]).flat();

/* ------------------------------ Benda sehari-hari ------------------------------ */

/** Jam dinding: bulat putih bertepi tebal (satu benda). */
export const jam = (id: string, cx: number, cy: number, r = 16, o: Opsi = {}): Obj => bulat(id, cx, cy, r, W.putih, W.coklat, { tebal: 3, ...o });

/** Donat: satu emoji. */
export const donat = (id: string, cx: number, cy: number, u = 30, o: Opsi = {}): Obj => emo(id, cx, cy + u * 0.35, "\u{1F369}", u, o);

/** Jendela: kotak biru muda (satu benda); palang di dalamnya `${id}-x` dan `${id}-y`. */
export const jendela = (id: string, cx: number, cy: number, w: number, h: number, o: Opsi = {}): Obj[] => [
  kotak(id, cx - w / 2, cy - h / 2, w, h, "#BAE6FD", W.coklat, { rx: 1, tebal: 3, ...o }),
  garis(`${id}-x`, cx, cy - h / 2, 0, h, W.coklat, 2, o),
  garis(`${id}-y`, cx - w / 2, cy, w, 0, W.coklat, 2, o),
];

/** Pintu: kotak coklat dengan gagang (satu benda); gagang `${id}-x`. */
export const pintu = (id: string, cx: number, cy: number, w: number, h: number, o: Opsi = {}): Obj[] => [
  kotak(id, cx - w / 2, cy - h / 2, w, h, "#D97706", W.coklat, { rx: 2, tebal: 2, ...o }),
  bulat(`${id}-x`, cx + w / 2 - 6, cy + 2, 2.4, W.emas, W.coklat, { tebal: 1, ...o }),
];

/** Bendera: kain merah putih berbentuk persegi panjang (satu benda); tiang `${id}-x`. */
export const bendera = (id: string, cx: number, cy: number, w: number, h: number, o: Opsi = {}): Obj[] => [
  garis(`${id}-x`, cx - w / 2, cy - h / 2 - 2, 0, h + 20, W.coklat, 2.6, o),
  kotak(id, cx - w / 2, cy - h / 2, w, h, "#EF4444", W.biru, { rx: 0, tebal: 1.4, ...o }),
];

/** Kue lapis: kotak berlapis merah muda dan krem (satu benda); lapisan `${id}-x`. */
export const kueLapis = (id: string, cx: number, cy: number, w: number, h: number, o: Opsi = {}): Obj[] => [
  kotak(id, cx - w / 2, cy - h / 2, w, h, "#FBCFE8", W.coklat, { rx: 2, tebal: 1.6, ...o }),
  kotak(`${id}-x`, cx - w / 2, cy - 1.5, w, 3, "#FDE68A", undefined, { rx: 0, ...o }),
];

/** Melon: bulat hijau muda. */
export const melon = (id: string, cx: number, cy: number, r = 13, o: Opsi = {}): Obj => bulat(id, cx, cy, r, "#BEF264", W.hijau, { tebal: 2, ...o });

/** Telur: lonjong krem. */
export const telur = (id: string, cx: number, cy: number, a = 10, b = 14, o: Opsi = {}): Obj => lonjong(id, cx, cy, a, b, "#FEF3C7", { garis: W.coklat, ...o });

/** Nama benda kecil di bawah benda. */
export const nama = (id: string, x: number, y: number, isi: string, u = 8.2, warna: string = W.biru): Obj => teks(id, x, y, isi, u, warna);
