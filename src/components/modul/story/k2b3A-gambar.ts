import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 2 Bab 3 Sub-Bab A (Bangun Datar): segi banyak dan bentuk lengkung yang tergambar di layar.
 * Berkas ini TIDAK dipakai bab atau sub-bab lain.
 *
 * Kesepakatan id (dipakai uji hitung ulang):
 * - Segi banyak: satu jalur tertutup `${id}`; titik sudutnya dibaca dari lintasan. Nama bangun `${id}-nm` (segitiga, segi empat, segi lima, segi enam).
 * - Penanda sisi `${id}s{i}` (garis merah dari sudut i ke sudut i+1) dengan angka `${id}sn{i}`; penanda pojok `${id}d{i}` (titik) dengan angka `${id}dn{i}`.
 * - Bentuk lengkung: `bulat` (lingkaran) atau jalur dengan kurva (telur, hati). Cap (tepi putus-putus) `${id}-cap`.
 * - Papan paku: paku `pg{baris}{kolom}` (empat kali empat), tarikan karet `kr{i}`, nomor paku `pn{i}`.
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
export const OWL = "\u{1F989}";
export const LEBAH = "\u{1F41D}";

/** Warna bentuk: segitiga merah muda, segi empat hijau, segi lima oranye muda, segi enam kuning, lengkung biru muda. */
export const WARNA_BENTUK = { 3: "#F9A8D4", 4: "#86EFAC", 5: "#FDBA74", 6: "#FDE047", lengkung: "#93C5FD" } as const;

type Opsi = Partial<Obj>;
export type Titik = { x: number; y: number };

export const teks = (id: string, x: number, y: number, isi: string, u = 10, warna: string = W.biru, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi, u, warna, ...o });
export const kotak = (id: string, x: number, y: number, w: number, h: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "kotak", x, y, w, h, warna, garis, rx: 3, tebal: 1.5, ...o });
export const bulat = (id: string, x: number, y: number, r: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "bulat", x, y, r, warna, garis, tebal: 1.5, ...o });
export const garis = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "garis", x, y, x2, y2, warna, tebal, ...o });
export const emo = (id: string, x: number, y: number, e: string, u = 22, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi: e, u, warna: W.biru, ...o });

/** Judul adegan di tengah atas. */
export const judul = (isi: string, warna: string = W.ungu): Obj => teks("jud", 150, 18, isi, 11, warna);

/** Kartu berwarna dengan satu sampai tiga baris teks, pojok kiri-atas (x, y). */
export function kartu(id: string, x: number, y: number, w: number, h: number, warna: string, baris: string[], u = 9, o: Opsi = {}): Obj[] {
  const mulai = y + h / 2 - ((baris.length - 1) * (u + 3)) / 2 + u * 0.35;
  return [kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 8, ...o }), ...baris.map((b, i) => teks(`${id}-t${i}`, x + w / 2, mulai + i * (u + 3), b, u, W.biru, o))];
}

/** Kartu angka besar: pojok kiri-atas (x, y); id `${id}-k` dan `${id}-t`. */
export const kartuAngka = (id: string, x: number, y: number, isi: string, warna: string = W.krem, w = 40, h = 36, u = 22, o: Opsi = {}): Obj[] => [
  kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 6, tebal: 1.6, ...o }),
  teks(`${id}-t`, x + w / 2, y + h / 2 + u * 0.35, isi, u, W.merah, o),
];

/* ------------------------------ Segi banyak ------------------------------ */

const f = (n: number): string => n.toFixed(1);
const bulatkan = (n: number): number => Math.round(n * 10) / 10;
const putar = (p: Titik, deg: number): Titik => {
  const r = (deg * Math.PI) / 180;
  return { x: p.x * Math.cos(r) - p.y * Math.sin(r), y: p.x * Math.sin(r) + p.y * Math.cos(r) };
};

/** Titik sudut relatif terhadap pusat (sebelum diputar). */
export type Rel = Titik[];
export const relSegitiga = (w: number, h: number): Rel => [{ x: 0, y: -h / 2 }, { x: w / 2, y: h / 2 }, { x: -w / 2, y: h / 2 }];
export const relSegiempat = (w: number, h: number): Rel => [{ x: -w / 2, y: -h / 2 }, { x: w / 2, y: -h / 2 }, { x: w / 2, y: h / 2 }, { x: -w / 2, y: h / 2 }];
/** Jajar genjang: sisi atas bergeser `g` ke kanan dari sisi bawah. */
export const relJajar = (w: number, h: number, g: number): Rel => [{ x: -w / 2 + g, y: -h / 2 }, { x: w / 2 + g, y: -h / 2 }, { x: w / 2 - g, y: h / 2 }, { x: -w / 2 - g, y: h / 2 }];
/** Segi banyak beraturan, sudut pertama di puncak (atas). */
export const relBeraturan = (n: number, r: number): Rel =>
  Array.from({ length: n }, (_, i) => ({ x: r * Math.cos(((-90 + (360 / n) * i) * Math.PI) / 180), y: r * Math.sin(((-90 + (360 / n) * i) * Math.PI) / 180) }));
/** Segi lima bentuk rumah: atap runcing di atas. */
export const relRumah = (w: number, h: number): Rel => [{ x: 0, y: -h / 2 }, { x: w / 2, y: -h * 0.1 }, { x: w / 2, y: h / 2 }, { x: -w / 2, y: h / 2 }, { x: -w / 2, y: -h * 0.1 }];

/** Titik sudut mutlak sebuah bangun berpusat di (cx, cy) yang diputar `rot` derajat (dibulatkan satu desimal). */
export const sudutBangun = (rel: Rel, cx: number, cy: number, rot = 0): Titik[] =>
  rel.map((p) => {
    const q = putar(p, rot);
    return { x: bulatkan(cx + q.x), y: bulatkan(cy + q.y) };
  });

/** Segi banyak sebagai satu jalur tertutup, berpusat di (cx, cy); putaran `rot` sudah dihitung ke titik sudutnya. */
export function bangun(id: string, rel: Rel, cx: number, cy: number, warna: string, rot = 0, o: Opsi = {}): Obj {
  const r2 = rel.map((p) => putar(p, rot));
  return { id, t: "jalur", x: cx, y: cy, d: `M${r2.map((p) => `${f(p.x)} ${f(p.y)}`).join(" L")} Z`, warna, garis: W.biru, tebal: 1.6, ...o };
}

/** Nama bangun menurut banyak sisi. */
export const NAMA_SEGI: Record<number, string> = { 3: "segitiga", 4: "segi empat", 5: "segi lima", 6: "segi enam" };
export const warnaSegi = (n: number): string => WARNA_BENTUK[n as 3 | 4 | 5 | 6] ?? WARNA_BENTUK[6];

/** Nama bangun di dekat bangun: id `${id}-nm`. */
export const namaBangun = (id: string, x: number, y: number, isi: string, u = 10, warna: string = W.ungu): Obj => teks(`${id}-nm`, x, y, isi, u, warna);

/* ------------------------------ Penanda sisi dan pojok ------------------------------ */

const pusatTitik = (pts: Titik[]): Titik => ({ x: pts.reduce((t, p) => t + p.x, 0) / pts.length, y: pts.reduce((t, p) => t + p.y, 0) / pts.length });

/** Titik di luar bangun, searah dari pusat ke titik `p`, sejauh `jarak` (untuk angka hitungan). */
function keluar(p: Titik, pusat: Titik, jarak: number): Titik {
  const dx = p.x - pusat.x;
  const dy = p.y - pusat.y;
  const l = Math.hypot(dx, dy) || 1;
  return { x: bulatkan(p.x + (dx / l) * jarak), y: bulatkan(p.y + (dy / l) * jarak + 3.5) };
}

/** Garis merah yang menandai sisi ke-i bangun (dari sudut i ke sudut i+1). Id `${id}s${i}`. */
export const garisSisi = (id: string, pts: Titik[], i: number, warna: string = W.merah, tebal = 3.6): Obj => {
  const a = pts[i];
  const b = pts[(i + 1) % pts.length];
  return garis(`${id}s${i}`, a.x, a.y, bulatkan(b.x - a.x), bulatkan(b.y - a.y), warna, tebal, { gambar: true, z: 3 });
};

/** Angka di luar sisi ke-i. Id `${id}sn${i}`. */
export const angkaSisi = (id: string, pts: Titik[], i: number, jarak = 11): Obj => {
  const a = pts[i];
  const b = pts[(i + 1) % pts.length];
  const t = keluar({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 }, pusatTitik(pts), jarak);
  return teks(`${id}sn${i}`, t.x, t.y, String(i + 1), 10, W.merah);
};

/** Titik emas pada pojok ke-i. Id `${id}d${i}`. */
export const titikSudut = (id: string, pts: Titik[], i: number): Obj => bulat(`${id}d${i}`, pts[i].x, pts[i].y, 4.6, W.emas, W.merah, { tebal: 1.8, z: 4 });

/** Angka di luar pojok ke-i. Id `${id}dn${i}`. */
export const angkaSudut = (id: string, pts: Titik[], i: number, jarak = 13): Obj => {
  const t = keluar(pts[i], pusatTitik(pts), jarak);
  return teks(`${id}dn${i}`, t.x, t.y, String(i + 1), 10, W.merah);
};

/** Id semua penanda sisi atau pojok `n` buah (untuk dihapus). */
export const idSisi = (id: string, n: number): string[] => Array.from({ length: n }, (_, i) => [`${id}s${i}`, `${id}sn${i}`]).flat();
export const idSudut = (id: string, n: number): string[] => Array.from({ length: n }, (_, i) => [`${id}d${i}`, `${id}dn${i}`]).flat();

/* ------------------------------ Bentuk lengkung ------------------------------ */

const KAPPA = 0.5523;

/** Lingkaran (bulat). */
export const lingkaran = (id: string, cx: number, cy: number, r: number, warna: string = WARNA_BENTUK.lengkung, o: Opsi = {}): Obj => bulat(id, cx, cy, r, warna, W.biru, { tebal: 1.6, ...o });

/** Bentuk telur lonjong berpusat di (cx, cy), setengah lebar `a` dan setengah tinggi `b` (kurva mulus). */
export const telur = (id: string, cx: number, cy: number, a: number, b: number, warna: string = WARNA_BENTUK.lengkung, o: Opsi = {}): Obj => ({
  id,
  t: "jalur",
  x: cx,
  y: cy,
  d: `M${f(-a)} 0 C${f(-a)} ${f(-KAPPA * b)} ${f(-KAPPA * a)} ${f(-b)} 0 ${f(-b)} C${f(KAPPA * a)} ${f(-b)} ${f(a)} ${f(-KAPPA * b)} ${f(a)} 0 C${f(a)} ${f(KAPPA * b)} ${f(KAPPA * a)} ${f(b)} 0 ${f(b)} C${f(-KAPPA * a)} ${f(b)} ${f(-a)} ${f(KAPPA * b)} ${f(-a)} 0 Z`,
  warna,
  garis: W.biru,
  tebal: 1.6,
  ...o,
});

/** Bentuk hati berpusat di (cx, cy) dengan ukuran `s` (kurva mulus, tanpa sisi lurus). */
export const hati = (id: string, cx: number, cy: number, s: number, warna: string = WARNA_BENTUK.lengkung, o: Opsi = {}): Obj => ({
  id,
  t: "jalur",
  x: cx,
  y: cy,
  d: `M0 ${f(0.9 * s)} C${f(-1.2 * s)} ${f(0.1 * s)} ${f(-0.95 * s)} ${f(-0.85 * s)} ${f(-0.4 * s)} ${f(-0.85 * s)} C${f(-0.15 * s)} ${f(-0.85 * s)} 0 ${f(-0.65 * s)} 0 ${f(-0.45 * s)} C0 ${f(-0.65 * s)} ${f(0.15 * s)} ${f(-0.85 * s)} ${f(0.4 * s)} ${f(-0.85 * s)} C${f(0.95 * s)} ${f(-0.85 * s)} ${f(1.2 * s)} ${f(0.1 * s)} 0 ${f(0.9 * s)} Z`,
  warna,
  garis: W.biru,
  tebal: 1.6,
  ...o,
});

/** Cap: tepi putus-putus tanpa warna isi, pada tempat dan ukuran yang sama dengan bentuknya. */
export const capLingkaran = (id: string, cx: number, cy: number, r: number): Obj => bulat(`${id}-cap`, cx, cy, r, "none", W.merah, { putus: true, tebal: 1.8, z: 5 });
export const capTelur = (id: string, cx: number, cy: number, a: number, b: number): Obj => telur(`${id}-cap`, cx, cy, a, b, "none", { garis: W.merah, putus: true, tebal: 1.8, z: 5 });

/* ------------------------------ Sarang lebah ------------------------------ */

/** Pusat tujuh segi enam yang berdempetan (pusat dan enam tetangga) untuk segi enam bertitik puncak berjari-jari `r`. */
export const pusatSarang = (cx: number, cy: number, r: number): Titik[] => {
  const d = Math.sqrt(3) * r;
  return [{ x: cx, y: cy }, ...Array.from({ length: 6 }, (_, q) => ({ x: bulatkan(cx + d * Math.cos((q * Math.PI) / 3)), y: bulatkan(cy + d * Math.sin((q * Math.PI) / 3)) }))];
};
/** Sarang lebah: tujuh segi enam `${pre}0..6` yang berbagi sisi. */
export const sarang = (pre: string, cx: number, cy: number, r: number, warna: string = WARNA_BENTUK[6]): Obj[] =>
  pusatSarang(cx, cy, r).map((p, i) => bangun(`${pre}${i}`, relBeraturan(6, r), p.x, p.y, i === 0 ? "#FACC15" : warna));

/* ------------------------------ Papan paku (empat kali empat) ------------------------------ */

export const PAKU = { x0: 99, y0: 64, d: 34 };
export const titikPaku = (baris: number, kolom: number): Titik => ({ x: PAKU.x0 + kolom * PAKU.d, y: PAKU.y0 + baris * PAKU.d });
/** Empat kali empat paku `pg{baris}{kolom}`, dasar papan `pgd`. */
export const papanPaku = (): Obj[] => [
  kotak("pgd", PAKU.x0 - 20, PAKU.y0 - 14, 3 * PAKU.d + 40, 3 * PAKU.d + 28, "#FDE68A", W.coklat, { rx: 8, tebal: 2.4, z: -2 }),
  ...Array.from({ length: 16 }, (_, q) => {
    const b = Math.floor(q / 4);
    const c = q % 4;
    const p = titikPaku(b, c);
    return bulat(`pg${b}${c}`, p.x, p.y, 3.2, "#94A3B8", W.coklat, { tebal: 1.2 });
  }),
];
/** Tarikan karet ke-i dari paku (baris, kolom) a ke paku b: garis tergambar, id `kr{i}`. */
export const tarikKaret = (i: number, a: [number, number], b: [number, number]): Obj => {
  const p = titikPaku(a[0], a[1]);
  const q = titikPaku(b[0], b[1]);
  return garis(`kr${i}`, p.x, p.y, q.x - p.x, q.y - p.y, W.merah, 3.2, { gambar: true, z: 3 });
};

/** Kurva (garis lengkung terbuka) berpusat di (cx, cy), tergambar bertahap. */
export const kurva = (id: string, cx: number, cy: number): Obj => ({ id, t: "jalur", x: cx, y: cy, d: "M-70 10 C-40 -40 -10 -40 0 0 C10 40 40 40 70 -10", warna: "none", garis: W.merah, tebal: 3.4, gambar: true });

/** Segi banyak dari titik-titik mutlak (mis. paku papan): satu jalur tertutup berasal di (0, 0). */
export const bangunTitik = (id: string, pts: Titik[], warna: string, o: Opsi = {}): Obj => ({ id, t: "jalur", x: 0, y: 0, d: `M${pts.map((p) => `${f(p.x)} ${f(p.y)}`).join(" L")} Z`, warna, garis: W.biru, tebal: 1.6, ...o });
/** Nomor paku (1, 2, 3, ...) di dekat paku (baris, kolom): id `pn{i}`. */
export const nomorPaku = (i: number, baris: number, kolom: number): Obj => {
  const p = titikPaku(baris, kolom);
  return teks(`pn${i}`, p.x - 9, p.y - 6, String(i + 1), 9, W.merah);
};

/** Setengah lingkaran: dasar lurus dan satu busur (bukan segi banyak). */
export const setengahLingkaran = (id: string, cx: number, cy: number, r: number, warna: string = WARNA_BENTUK.lengkung, o: Opsi = {}): Obj => ({
  id,
  t: "jalur",
  x: cx,
  y: cy,
  d: `M${f(-r)} ${f(r / 2)} L${f(r)} ${f(r / 2)} C${f(r)} ${f(-r * 1.1)} ${f(-r)} ${f(-r * 1.1)} ${f(-r)} ${f(r / 2)} Z`,
  warna,
  garis: W.biru,
  tebal: 1.6,
  ...o,
});

/** Bangun bersisi lurus kecuali satu sisi bawah yang melengkung (bukan segi banyak). */
export const bawahMelengkung = (id: string, cx: number, cy: number, w: number, h: number, warna: string = WARNA_BENTUK.lengkung, o: Opsi = {}): Obj => ({
  id,
  t: "jalur",
  x: cx,
  y: cy,
  d: `M${f(-w / 2)} ${f(-h / 2)} L${f(w / 2)} ${f(-h / 2)} L${f(w / 2)} ${f(h / 4)} C${f(w / 4)} ${f(h * 0.8)} ${f(-w / 4)} ${f(h * 0.8)} ${f(-w / 2)} ${f(h / 4)} Z`,
  warna,
  garis: W.biru,
  tebal: 1.6,
  ...o,
});
