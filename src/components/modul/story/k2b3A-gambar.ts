import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 2 Bab 3 Sub-Bab A "Ubin untuk Taman Bermain" (bangun datar), awal cerita Taman Bermain Sekolah.
 * Berkas ini TIDAK dipakai bab atau sub-bab lain.
 *
 * Rupa taman: gerbang berpita `${id}`, karung ubin `${id}`, keranjang ubin `${id}` (kuning untuk segi banyak, hijau untuk lengkung), papan permainan petak `${id}`
 * (petak `${id}c{i}`), perosotan, rumah burung, jam dinding pos taman, papan catatan Dika, dan papan paku.
 * Tokoh: Chacha, Dika, Nia, Bu Sari (topi proyek kuning digambar), Pak Tono (helm kuning digambar), tanpa ZWJ.
 *
 * Kesepakatan id bangun: satu jalur tertutup `${id}`; penanda sisi `${id}s{i}` dengan angka `${id}sn{i}`; penanda pojok `${id}d{i}` dengan angka `${id}dn{i}`;
 * cap (tepi putus-putus) `${id}-cap`; papan paku: paku `pg{baris}{kolom}`, karet `kr{i}`.
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

/** Warna rupa taman. */
export const WT = { rumput: "#BBF7D0", rumputGaris: "#16A34A", ubinKuning: "#FDE047", ubinHijau: "#86EFAC", petak: "#E2E8F0", petakGaris: "#64748B", karung: "#D6A15E", helm: "#FACC15", papan: "#166534", kayu: "#D6A15E" } as const;

export const E = {
  chacha: "\u{1F467}",
  dika: "\u{1F913}",
  nia: "\u{1F467}",
  topi: "\u{1F9E2}",
  bu: "\u{1F469}",
  pak: "\u{1F468}",
  anak: "\u{1F9D2}",
  tertawa: "\u{1F604}",
  senyum: "\u{1F60A}",
  pusing: "\u{1F635}",
  pikir: "\u{1F914}",
  mata: "\u{1F440}",
  tanya: "\u{2753}",
  benar: "\u{2705}",
  salah: "\u{274C}",
  lampu: "\u{1F4A1}",
  jari: "\u{1F446}",
  lambai: "\u{1F44B}",
  bintang: "\u{2B50}",
  jam: "\u{23F0}",
  bendera: "\u{1F6A9}",
  kaca: "\u{1F50D}",
  catat: "\u{1F4DD}",
  lebah: "\u{1F41D}",
  pohon: "\u{1F333}",
} as const;

type Opsi = Partial<Obj>;
export type Titik = { x: number; y: number };
const f = (n: number): string => n.toFixed(1);
const bulatkan = (n: number): number => Math.round(n * 10) / 10;

export const teks = (id: string, x: number, y: number, isi: string, u = 10, warna: string = W.biru, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi, u, warna, ...o });
export const kotak = (id: string, x: number, y: number, w: number, h: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "kotak", x, y, w, h, warna, garis, rx: 3, tebal: 1.5, ...o });
export const bulat = (id: string, x: number, y: number, r: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "bulat", x, y, r, warna, garis, tebal: 1.5, ...o });
export const garis = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "garis", x, y, x2, y2, warna, tebal, ...o });
export const emo = (id: string, x: number, y: number, e: string, u = 22, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi: e, u, warna: W.biru, ...o });
/** Garis mutlak dari (x, y) ke (x2, y2). */
export const gs = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => garis(id, x, y, bulatkan(x2 - x), bulatkan(y2 - y), warna, tebal, o);
/** Judul adegan di tengah atas. */
export const judul = (isi: string, warna: string = W.ungu): Obj => teks("jud", 150, 18, isi, 11, warna);

/** Kartu berwarna dengan satu sampai tiga baris teks, pojok kiri-atas (x, y): `${id}-k`, `${id}-t{i}`. */
export function kartu(id: string, x: number, y: number, w: number, h: number, warna: string, baris: string[], u = 9, o: Opsi = {}): Obj[] {
  const mulai = y + h / 2 - ((baris.length - 1) * (u + 3)) / 2 + u * 0.35;
  return [kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 8, ...o }), ...baris.map((b, i) => teks(`${id}-t${i}`, x + w / 2, mulai + i * (u + 3), b, u, W.biru, o))];
}
/** Kartu angka besar: `${id}-k` dan `${id}-t`. */
export const kartuAngka = (id: string, x: number, y: number, isi: string, warna: string = W.krem, w = 40, h = 36, u = 22, o: Opsi = {}): Obj[] => [
  kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 6, tebal: 1.6, ...o }),
  teks(`${id}-t`, x + w / 2, y + h / 2 + u * 0.35, isi, u, W.merah, o),
];

/* ------------------------------ Taman bermain ------------------------------ */

/** Rumput taman `${id}` mulai tinggi y sampai bawah kanvas. */
export const rumput = (id: string, y = 168): Obj => kotak(id, 2, y, 296, 198 - y, WT.rumput, WT.rumputGaris, { rx: 4, tebal: 1.2, z: -3 });

/** Gerbang taman berpita: tiang `${id}-l` dan `${id}-r`, palang `${id}`, pita `${id}-p` bertulisan "Taman Bermain". Pojok kiri-atas (x, y), lebar w. */
export const gerbang = (id: string, x: number, y: number, w = 120): Obj[] => [
  kotak(`${id}-l`, x, y, 8, 50, WT.kayu, W.coklat, { rx: 2, tebal: 1.6, z: -1 }),
  kotak(`${id}-r`, x + w - 8, y, 8, 50, WT.kayu, W.coklat, { rx: 2, tebal: 1.6, z: -1 }),
  kotak(id, x - 4, y - 8, w + 8, 14, W.pink, W.merah, { rx: 6, tebal: 1.8, z: -1 }),
  teks(`${id}-p`, x + w / 2, y + 2, "Taman Bermain", 7.6, W.merah, { z: 0 }),
];
export const idGerbang = (id: string): string[] => [`${id}-l`, `${id}-r`, id, `${id}-p`];

/** Bentuk ubin kecil (jalur) berpusat di (cx, cy): dipakai pada karung dan keranjang. */
const tiapUbin = (id: string, cx: number, cy: number, jenis: 3 | 4 | 6 | 0, warna: string, s = 6): Obj => {
  if (jenis === 0) return bulat(id, cx, cy, s, warna, W.biru, { tebal: 1.2, z: 1 });
  return bangun(id, jenis === 3 ? relSegitiga(s * 2, s * 1.8) : jenis === 4 ? relSegiempat(s * 1.8, s * 1.8) : relBeraturan(6, s), cx, cy, warna, 0, { tebal: 1.2, z: 1 });
};

/** Karung ubin: badan `${id}`, tali `${id}-t`, tiga ubin mengintip `${id}-u{0..2}`. Pojok kiri-atas (x, y), lebar 40, tinggi 44. */
export const karung = (id: string, x: number, y: number): Obj[] => [
  { id, t: "jalur", x, y, d: "M6 6 L34 6 L40 44 L0 44 Z", warna: WT.karung, garis: W.coklat, tebal: 1.8 },
  kotak(`${id}-t`, x + 6, y + 2, 28, 6, "#FDE68A", W.coklat, { rx: 2, tebal: 1.2, z: 1 }),
  tiapUbin(`${id}-u0`, x + 12, y - 1, 3, WT.ubinKuning),
  tiapUbin(`${id}-u1`, x + 20, y - 3, 6, WT.ubinHijau),
  tiapUbin(`${id}-u2`, x + 28, y - 1, 4, "#FDBA74"),
];
export const idKarung = (id: string): string[] => [id, `${id}-t`, `${id}-u0`, `${id}-u1`, `${id}-u2`];

/** Keranjang ubin: badan `${id}` dan nama `${id}-n` di bawahnya. Pojok kiri-atas (x, y), 70 x 34. */
export const keranjang = (id: string, x: number, y: number, warna: string, nama: string): Obj[] => [
  kotak(id, x, y, 70, 34, warna, W.coklat, { rx: 6, tebal: 2.2, z: -1 }),
  teks(`${id}-n`, x + 35, y + 46, nama, 8, W.coklat),
];

/** Papan permainan petak di lantai taman: dasar `${id}` dan petak `${id}c{i}` (kolom k, baris b, sisi petak s). Pojok kiri-atas (x, y). */
export const papanPetak = (id: string, x: number, y: number, k: number, b: number, s = 30): Obj[] => [
  kotak(id, x - 4, y - 4, k * s + 8, b * s + 8, "#FDE68A", W.coklat, { rx: 6, tebal: 2.2, z: -2 }),
  ...Array.from({ length: k * b }, (_, i) => kotak(`${id}c${i}`, x + (i % k) * s + 1, y + Math.floor(i / k) * s + 1, s - 2, s - 2, WT.petak, WT.petakGaris, { rx: 2, tebal: 1.2, z: -1 })),
];
/** Tengah petak ke-i. */
export const tengahPetak = (x: number, y: number, k: number, i: number, s = 30): Titik => ({ x: x + (i % k) * s + s / 2, y: y + Math.floor(i / k) * s + s / 2 });

/** Perosotan: tiang `${id}-t`, papan miring `${id}` (segi empat miring), tangga `${id}-g`. Kira-kira 60 x 46, pojok kiri-atas (x, y). */
export const perosotan = (id: string, x: number, y: number): Obj[] => [
  garis(`${id}-t`, x + 6, y, 0, 46, W.coklat, 3, { z: -1 }),
  garis(`${id}-g`, x, y + 46, 12, -30, W.coklat, 2, { z: -1 }),
  { id, t: "jalur", x, y, d: "M6 4 L14 0 L60 40 L50 46 Z", warna: "#FCA5A5", garis: W.merah, tebal: 1.8 },
];
export const idPerosotan = (id: string): string[] => [id, `${id}-t`, `${id}-g`];

/** Rumah burung: dinding segi lima (atap runcing) `${id}`, lubang `${id}-l`, tiang `${id}-t`. Pusat badan (cx, cy), lebar w, tinggi h. */
export const rumahBurung = (id: string, cx: number, cy: number, w = 34, h = 36, warna = "#FDBA74"): Obj[] => [
  garis(`${id}-t`, cx, cy + h / 2, 0, 14, W.coklat, 3, { z: -1 }),
  bangun(id, relRumah(w, h), cx, cy, warna),
  bulat(`${id}-l`, cx, cy + 4, 4.4, W.coklat, W.coklat, { z: 2 }),
];
export const idRumahBurung = (id: string): string[] => [id, `${id}-l`, `${id}-t`];

/** Jam dinding di pos taman: bingkai segi enam `${id}`, jarum `${id}-m` dan `${id}-j`. Pusat (cx, cy), jari-jari r. */
export const jamDinding = (id: string, cx: number, cy: number, r = 18): Obj[] => [
  bangun(id, relBeraturan(6, r), cx, cy, W.putih, 0, { tebal: 2.4 }),
  garis(`${id}-m`, cx, cy, bulatkan(-r * 0.12), bulatkan(-r * 0.6), W.biru, 1.6, { z: 2 }),
  garis(`${id}-j`, cx, cy, bulatkan(r * 0.4), bulatkan(r * 0.22), W.merah, 2.2, { z: 2 }),
];
export const idJam = (id: string): string[] => [id, `${id}-m`, `${id}-j`];

/** Pos taman: atap dan dinding persegi `${id}` (tempat jam dinding digantung). */
export const pos = (id: string, x: number, y: number, w = 80, h = 56): Obj[] => [
  kotak(id, x, y, w, h, "#FEF3C7", W.coklat, { rx: 4, tebal: 2.2, z: -1 }),
  kotak(`${id}-a`, x - 6, y - 10, w + 12, 12, "#F87171", W.merah, { rx: 3, tebal: 1.8, z: -1 }),
];

/** Papan catatan kecil Dika: kotak hijau `${id}` bertepi kayu. */
export const papanCatat = (id: string, x: number, y: number, w: number, h: number): Obj => kotak(id, x, y, w, h, WT.papan, W.coklat, { rx: 5, tebal: 4, z: -1 });
export const kapur = (id: string, x: number, y: number, isi: string, u = 9.6, o: Opsi = {}): Obj => teks(id, x, y, isi, u, "#F8FAFC", { z: 3, ...o });

/** Pohon taman: batang `${id}-b`, tajuk `${id}` (bulatan hijau). */
export const pohon = (id: string, cx: number, y: number, r = 18): Obj[] => [kotak(`${id}-b`, cx - 4, y + r - 2, 8, 22, W.coklat, W.coklat, { rx: 1, z: -1 }), bulat(id, cx, y, r, "#4ADE80", W.hijau, { tebal: 2, z: -1 })];

export type NamaTokoh = "Chacha" | "Dika" | "Nia" | "Bu Sari" | "Pak Tono";

/** Tokoh berdiri: wajah `${id}`, nama `${id}-n`. Nia bertopi `${id}-tp`; Bu Sari bertopi proyek kuning `${id}-hl`; Pak Tono berhelm kuning `${id}-hl`. */
export function tokoh(id: string, x: number, y: number, nama: NamaTokoh, u = 30): Obj[] {
  const wajah = nama === "Chacha" ? E.chacha : nama === "Dika" ? E.dika : nama === "Nia" ? E.nia : nama === "Bu Sari" ? E.bu : E.pak;
  const out: Obj[] = [emo(id, x, y, wajah, u, { z: 1 })];
  if (nama === "Nia") out.push(emo(`${id}-tp`, x, bulatkan(y - u * 0.5), E.topi, bulatkan(u * 0.55), { z: 2 }));
  if (nama === "Bu Sari" || nama === "Pak Tono")
    out.push({ id: `${id}-hl`, t: "jalur", x: x, y: bulatkan(y - u * 0.62), d: "M-11 2 C-11 -11 11 -11 11 2 Z M-14 2 L14 2", warna: WT.helm, garis: W.oranye, tebal: 1.6, z: 2 });
  out.push(teks(`${id}-n`, x, bulatkan(y + 13), nama, 8.4, W.ungu, { z: 2 }));
  return out;
}
export const idTokoh = (id: string, nama: NamaTokoh): string[] => [id, `${id}-n`, ...(nama === "Nia" ? [`${id}-tp`] : []), ...(nama === "Bu Sari" || nama === "Pak Tono" ? [`${id}-hl`] : [])];

/* ------------------------------ Segi banyak ------------------------------ */

/** Warna bentuk: segitiga merah muda, segi empat hijau, segi lima oranye muda, segi enam kuning, lengkung biru muda. */
export const WARNA_BENTUK = { 3: "#F9A8D4", 4: "#86EFAC", 5: "#FDBA74", 6: "#FDE047", lengkung: "#93C5FD" } as const;
/** Nama bangun menurut banyak sisi. */
export const NAMA_SEGI: Record<number, string> = { 3: "segitiga", 4: "segi empat", 5: "segi lima", 6: "segi enam" };

/** Titik sudut relatif terhadap pusat (sebelum diputar). */
export type Rel = Titik[];
export const relSegitiga = (w: number, h: number): Rel => [{ x: 0, y: -h / 2 }, { x: w / 2, y: h / 2 }, { x: -w / 2, y: h / 2 }];
export const relSegiempat = (w: number, h: number): Rel => [{ x: -w / 2, y: -h / 2 }, { x: w / 2, y: -h / 2 }, { x: w / 2, y: h / 2 }, { x: -w / 2, y: h / 2 }];
/** Segi banyak beraturan, sudut pertama di puncak (atas). */
export const relBeraturan = (n: number, r: number): Rel =>
  Array.from({ length: n }, (_, i) => ({ x: r * Math.cos(((-90 + (360 / n) * i) * Math.PI) / 180), y: r * Math.sin(((-90 + (360 / n) * i) * Math.PI) / 180) }));
/** Segi lima bentuk rumah: atap runcing di atas. */
export const relRumah = (w: number, h: number): Rel => [{ x: 0, y: -h / 2 }, { x: w / 2, y: -h * 0.1 }, { x: w / 2, y: h / 2 }, { x: -w / 2, y: h / 2 }, { x: -w / 2, y: -h * 0.1 }];

const putar = (p: Titik, deg: number): Titik => {
  const r = (deg * Math.PI) / 180;
  return { x: p.x * Math.cos(r) - p.y * Math.sin(r), y: p.x * Math.sin(r) + p.y * Math.cos(r) };
};

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

/** Nama bangun di dekat bangun: id `${id}-nm`. */
export const namaBangun = (id: string, x: number, y: number, isi: string, u = 10, warna: string = W.ungu): Obj => teks(`${id}-nm`, x, y, isi, u, warna);

const pusatTitik = (pts: Titik[]): Titik => ({ x: pts.reduce((t, p) => t + p.x, 0) / pts.length, y: pts.reduce((t, p) => t + p.y, 0) / pts.length });
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
export const angkaSisi = (id: string, pts: Titik[], i: number, jarak = 11, nomor = i + 1): Obj => {
  const a = pts[i];
  const b = pts[(i + 1) % pts.length];
  const t = keluar({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 }, pusatTitik(pts), jarak);
  return teks(`${id}sn${i}`, t.x, t.y, String(nomor), 10, W.merah);
};
/** Titik emas pada pojok ke-i. Id `${id}d${i}`. */
export const titikSudut = (id: string, pts: Titik[], i: number): Obj => bulat(`${id}d${i}`, pts[i].x, pts[i].y, 4.6, W.emas, W.merah, { tebal: 1.8, z: 4 });
export const idSisi = (id: string, n: number): string[] => Array.from({ length: n }, (_, i) => [`${id}s${i}`, `${id}sn${i}`]).flat();

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
/** Cap: tepi putus-putus tanpa warna isi, pada tempat dan ukuran yang sama dengan bentuknya. */
export const capLingkaran = (id: string, cx: number, cy: number, r: number): Obj => bulat(`${id}-cap`, cx, cy, r, "none", W.merah, { putus: true, tebal: 1.8, z: 5 });
export const capTelur = (id: string, cx: number, cy: number, a: number, b: number): Obj => telur(`${id}-cap`, cx, cy, a, b, "none", { garis: W.merah, putus: true, tebal: 1.8, z: 5 });

/* ------------------------------ Papan paku (empat kali empat) ------------------------------ */

export const PAKU = { x0: 99, y0: 54, d: 34 };
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

/** Segi banyak dari titik-titik mutlak (mis. paku papan): satu jalur tertutup berasal di (0, 0). */
export const bangunTitik = (id: string, pts: Titik[], warna: string, o: Opsi = {}): Obj => ({ id, t: "jalur", x: 0, y: 0, d: `M${pts.map((p) => `${f(p.x)} ${f(p.y)}`).join(" L")} Z`, warna, garis: W.biru, tebal: 1.6, ...o });

/** Dua lingkaran Venn yang saling bertumpuk: `${id}a` (kiri), `${id}b` (kanan); judul tiap lingkaran `${id}ta` dan `${id}tb` di atasnya (dilewati bila kosong). */
export const venn = (id: string, cx: number, cy: number, r: number, namaA = "", namaB = ""): Obj[] => [
  bulat(`${id}a`, bulatkan(cx - r * 0.55), cy, r, "#BFDBFE", W.biru, { tebal: 2.2, op: 0.85, z: -1 }),
  bulat(`${id}b`, bulatkan(cx + r * 0.55), cy, r, "#FECACA", W.merah, { tebal: 2.2, op: 0.85, z: -1 }),
  ...(namaA ? [teks(`${id}ta`, bulatkan(cx - r), bulatkan(cy - r - 5), namaA, 8.4, W.biru)] : []),
  ...(namaB ? [teks(`${id}tb`, bulatkan(cx + r), bulatkan(cy - r - 5), namaB, 8.4, W.merah)] : []),
];

/** Bagian tengah yang bertumpuk pada Venn (bentuk lensa) `${id}`, dengan pusat dan jari-jari yang sama dengan `venn`. */
export const lensaVenn = (id: string, cx: number, cy: number, r: number, warna = "#FDE68A", o: Opsi = {}): Obj => {
  const h = Math.sqrt(r * r - (r * 0.55) ** 2);
  return { id, t: "jalur", x: cx, y: cy, d: `M0 ${f(-h)} A${f(r)} ${f(r)} 0 0 1 0 ${f(h)} A${f(r)} ${f(r)} 0 0 1 0 ${f(-h)} Z`, warna, garis: W.merah, tebal: 1.6, z: 0, ...o };
};
