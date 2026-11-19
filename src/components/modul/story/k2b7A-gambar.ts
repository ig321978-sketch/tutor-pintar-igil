import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 2 Bab 7 Sub-Bab A "Botol Pak Ujang" (bilangan sampai seratus), awal cerita Bank Sampah Sekolah.
 * Berkas ini TIDAK dipakai bab atau sub-bab lain.
 *
 * Rupa Bank Sampah: gudang kecil beratap seng, pot tanaman, tiga tong pilah (hijau, kuning, biru), gerobak dorong, botol bening, kaleng, koran, tali rafia (ikatan sepuluh),
 * sapu, papan nama tim, bingkai sepuluh, batang puluhan dan kotak satuan, kartu lipat, papan tulis kecil.
 * Tokoh: Chacha, Dika, Nia (bertopi), Bu Sari (berkerudung hijau, berompi hijau BANK SAMPAH; digambar), Pak Ujang (berompi dan bertopi hijau tua, bersarung tangan kuning; digambar),
 * Bu Lia (berkerudung kuning, membawa papan pengumuman; tampak di kejauhan). Tanpa ZWJ, emoji paling tinggi U+1FA95.
 */

export const W = {
  biru: "#1C01A5",
  emas: "#FFC800",
  merah: "#DC2626",
  hijau: "#16A34A",
  hijauTua: "#166534",
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
/** Warna rupa gudang. */
export const WG = {
  lantai: "#E7E5E4",
  papan: "#D6D3D1",
  seng: "#94A3B8",
  sengTua: "#475569",
  dinding: "#FEF3C7",
  tali: "#CA8A04",
  botol: "#BAE6FD",
  botolTua: "#0369A1",
  kaleng: "#FCA5A5",
  kalengTua: "#991B1B",
  koran: "#F3F4F6",
  koranTua: "#6B7280",
  tongHijau: "#4ADE80",
  tongKuning: "#FDE047",
  tongBiru: "#60A5FA",
  batang: "#FDBA74",
  batangTua: "#C2410C",
  satuan: "#FEF08A",
  satuanTua: "#A16207",
} as const;

export const E = {
  chacha: "\u{1F467}",
  dika: "\u{1F913}",
  nia: "\u{1F467}",
  topi: "\u{1F9E2}",
  bu: "\u{1F469}",
  pak: "\u{1F468}",
  tertawa: "\u{1F604}",
  senyum: "\u{1F60A}",
  pusing: "\u{1F635}",
  pikir: "\u{1F914}",
  kaget: "\u{1F632}",
  tanya: "\u{2753}",
  benar: "\u{2705}",
  salah: "\u{274C}",
  lampu: "\u{1F4A1}",
  lambai: "\u{1F44B}",
  bintang: "\u{2B50}",
  tepuk: "\u{1F44F}",
  catat: "\u{1F4DD}",
  sorak: "\u{1F389}",
  jempol: "\u{1F44D}",
  debu: "\u{1F4A8}",
  nada: "\u{1F3B5}",
  sapu: "\u{1F9F9}",
  pensil: "\u{270F}",
  tutup: "\u{1F9E2}",
} as const;

type Opsi = Partial<Obj>;
export type Titik = { x: number; y: number };
const bulatkan = (n: number): number => Math.round(n * 10) / 10;

export const teks = (id: string, x: number, y: number, isi: string, u = 10, warna: string = W.biru, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi, u, warna, ...o });
export const kotak = (id: string, x: number, y: number, w: number, h: number, warna: string | undefined, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "kotak", x, y, w, h, warna, garis, rx: 3, tebal: 1.5, ...o });
export const bulat = (id: string, x: number, y: number, r: number, warna: string | undefined, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "bulat", x, y, r, warna, garis, tebal: 1.5, ...o });
export const garis = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "garis", x, y, x2, y2, warna, tebal, ...o });
export const panah = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "panah", x, y, x2, y2, warna, tebal, ...o });
export const emo = (id: string, x: number, y: number, e: string, u = 22, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi: e, u, warna: W.biru, ...o });
/** Bentuk tertutup dari titik-titik absolut (lintasan `M .. L .. Z` relatif terhadap titik pertama). */
export const poligon = (id: string, titik: [number, number][], warna: string | undefined, garisW: string | undefined = W.biru, o: Opsi = {}): Obj => {
  const [x0, y0] = titik[0];
  const d = `M0 0 ${titik
    .slice(1)
    .map(([a, b]) => `L${bulatkan(a - x0)} ${bulatkan(b - y0)}`)
    .join(" ")} Z`;
  return { id, t: "jalur", x: x0, y: y0, d, warna, garis: garisW, tebal: 1.6, ...o };
};
/** Busur lompatan dari (x1, y) ke (x2, y) setinggi h. */
export const busur = (id: string, x1: number, x2: number, y: number, h: number, warna: string = W.merah): Obj => ({
  id,
  t: "jalur",
  x: x1,
  y,
  d: `M0 0 Q${bulatkan((x2 - x1) / 2)} ${-h} ${bulatkan(x2 - x1)} 0`,
  warna: undefined,
  garis: warna,
  tebal: 2,
  z: 1,
});
/** Judul adegan di tengah atas. */
export const judul = (isi: string, warna: string = W.ungu): Obj => teks("jud", 150, 18, isi, 11, warna);

/** Kartu berwarna dengan satu sampai tiga baris teks, pojok kiri-atas (x, y): `${id}-k`, `${id}-t{i}`. */
export function kartu(id: string, x: number, y: number, w: number, h: number, warna: string, baris: string[], u = 9, o: Opsi = {}): Obj[] {
  const mulai = y + h / 2 - ((baris.length - 1) * (u + 3)) / 2 + u * 0.35;
  return [kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 8, ...o }), ...baris.map((b, i) => teks(`${id}-t${i}`, x + w / 2, mulai + i * (u + 3), b, u, W.biru, o))];
}
export const idKartu = (id: string, n = 1): string[] => [`${id}-k`, ...Array.from({ length: n }, (_, i) => `${id}-t${i}`)];
/** Patch posisi (dan ujung garis) semua benda, untuk ubah. */
export const pindah = (objs: Obj[]): (Partial<Obj> & { id: string })[] => objs.map((o) => ({ id: o.id, x: o.x, y: o.y, ...(o.x2 === undefined ? {} : { x2: o.x2 }), ...(o.y2 === undefined ? {} : { y2: o.y2 }) }));
/** Patch menggeser semua benda sebesar (dx, dy). */
export const geser = (objs: Obj[], dx: number, dy = 0): (Partial<Obj> & { id: string })[] => objs.map((o) => ({ id: o.id, x: bulatkan((o.x ?? 0) + dx), y: bulatkan((o.y ?? 0) + dy) }));
export const idDari = (objs: Obj[]): string[] => objs.map((o) => o.id);

/* ------------------------------ Gudang Bank Sampah ------------------------------ */

/** Lantai gudang `${id}` dari tinggi y sampai bawah kanvas, dua garis papan `${id}-g1`, `${id}-g2`. */
export function lantai(id: string, y = 140): Obj[] {
  return [
    kotak(id, 2, y, 296, 200 - y, WG.lantai, undefined, { rx: 0, tebal: 0, z: -3 }),
    garis(`${id}-g1`, 4, y + 12, 292, 0, WG.papan, 2, { z: -2 }),
    garis(`${id}-g2`, 4, y + 30, 292, 0, WG.papan, 2, { z: -2 }),
  ];
}
export const idLantai = (id: string): string[] => [id, `${id}-g1`, `${id}-g2`];

/** Gudang kecil: dinding `${id}`, atap seng `${id}-at`, pintu `${id}-pt`, papan nama `${id}-nm`. Pojok kiri-atas dinding (x, y), lebar w, tinggi h. */
export const gudang = (id: string, x: number, y: number, w = 120, h = 60): Obj[] => [
  kotak(id, x, y, w, h, WG.dinding, W.coklat, { rx: 2, tebal: 1.8, z: -1 }),
  poligon(`${id}-at`, [[x - 6, y + 2], [x + w / 2, y - 22], [x + w + 6, y + 2]], WG.seng, WG.sengTua, { z: 0, tebal: 1.8 }),
  kotak(`${id}-pt`, x + w / 2 - 12, y + h - 30, 24, 30, "#B45309", W.coklat, { rx: 2, tebal: 1.5, z: 0 }),
];
export const idGudang = (id: string): string[] => [id, `${id}-at`, `${id}-pt`];

/** Pot tanaman `${id}` bertanaman `${id}-d`. Titik (x, y) = tengah dasar pot. */
export const pot = (id: string, x: number, y: number): Obj[] => [
  kotak(id, x - 8, y - 10, 16, 10, "#EA580C", "#9A3412", { rx: 2, tebal: 1.4, z: 1 }),
  bulat(`${id}-d`, x, y - 17, 7, "#4ADE80", W.hijauTua, { tebal: 1.4, z: 1 }),
];
export const idPot = (id: string): string[] => [id, `${id}-d`];

/** Tong pilah `${id}` bertutup `${id}-t`. Titik (x, y) = tengah dasar tong; warna: hijau, kuning, atau biru. */
export const tong = (id: string, x: number, y: number, warna: "hijau" | "kuning" | "biru"): Obj[] => {
  const isi = warna === "hijau" ? WG.tongHijau : warna === "kuning" ? WG.tongKuning : WG.tongBiru;
  return [kotak(id, x - 10, y - 24, 20, 24, isi, W.coklat, { rx: 3, tebal: 1.5, z: 1 }), kotak(`${id}-t`, x - 12, y - 28, 24, 5, "#64748B", "#334155", { rx: 2, tebal: 1.2, z: 2 })];
};
export const idTong = (id: string): string[] => [id, `${id}-t`];

/** Gerobak dorong: bak `${id}`, roda `${id}-r1` dan `${id}-r2`, gagang `${id}-g`. Pojok kiri-atas bak (x, y), lebar 46, tinggi 16. */
export const gerobak = (id: string, x: number, y: number): Obj[] => [
  kotak(id, x, y, 46, 16, "#9CA3AF", WG.sengTua, { rx: 3, tebal: 1.8, z: 1 }),
  bulat(`${id}-r1`, x + 11, y + 20, 5, "#334155", "#0F172A", { tebal: 1.6, z: 2 }),
  bulat(`${id}-r2`, x + 35, y + 20, 5, "#334155", "#0F172A", { tebal: 1.6, z: 2 }),
  garis(`${id}-g`, x, y + 2, -14, -14, WG.sengTua, 3, { z: 1 }),
];
export const idGerobak = (id: string): string[] => [id, `${id}-r1`, `${id}-r2`, `${id}-g`];

/** Botol bening `${id}` bertutup `${id}-t`. Pojok kiri-atas (x, y), 6 x 14 (skala s). */
export const botolB = (id: string, x: number, y: number, s = 1): Obj[] => [
  kotak(id, x, bulatkan(y + 3 * s), 6 * s, 11 * s, WG.botol, WG.botolTua, { rx: 2, tebal: 1.2, z: 2 }),
  kotak(`${id}-t`, bulatkan(x + 1.6 * s), y, 2.8 * s, 3.2 * s, WG.botolTua, WG.botolTua, { rx: 1, tebal: 0.8, z: 2 }),
];
export const idBotolB = (id: string): string[] => [id, `${id}-t`];

/** Kaleng `${id}` berpita `${id}-p`. Pojok kiri-atas (x, y), 8 x 10. */
export const kaleng = (id: string, x: number, y: number): Obj[] => [
  kotak(id, x, y, 8, 10, WG.kaleng, WG.kalengTua, { rx: 1.5, tebal: 1.2, z: 2 }),
  garis(`${id}-p`, x, y + 5, 8, 0, WG.kalengTua, 1, { z: 3 }),
];
export const idKaleng = (id: string): string[] => [id, `${id}-p`];

/** Koran lipat `${id}` bergaris `${id}-g`. Pojok kiri-atas (x, y), 14 x 10. */
export const koran = (id: string, x: number, y: number): Obj[] => [
  kotak(id, x, y, 14, 10, WG.koran, WG.koranTua, { rx: 1, tebal: 1.2, z: 2 }),
  garis(`${id}-g`, x + 2, y + 4, 10, 0, WG.koranTua, 1, { z: 3 }),
];
export const idKoran = (id: string): string[] => [id, `${id}-g`];

export type Jenis = "botol" | "kaleng" | "koran";
/** Satu benda sampah kecil berpusat di (cx, cy); tinggi sekitar 12. */
export function benda(id: string, cx: number, cy: number, jenis: Jenis, s = 1): Obj[] {
  if (jenis === "botol") return botolB(id, bulatkan(cx - 3 * s), bulatkan(cy - 7 * s), s);
  if (jenis === "kaleng") return kaleng(id, cx - 4, cy - 5);
  return koran(id, cx - 7, cy - 5);
}
/** Banyak id berurutan yang dipakai `benda` untuk jenis itu. */
export const idBenda = (id: string, jenis: Jenis): string[] => (jenis === "botol" ? idBotolB(id) : jenis === "kaleng" ? idKaleng(id) : idKoran(id));

/**
 * Satu ikat sepuluh benda diikat tali rafia: bingkai tali `${id}`, simpul `${id}-s`, dua baris lima benda `${id}-b{i}` (dan bagiannya). Pojok kiri-atas (x, y), lebar 38, tinggi 24.
 * Tanpa label; label diberikan terpisah.
 */
export function ikat(id: string, x: number, y: number, jenis: Jenis = "botol"): Obj[] {
  const out: Obj[] = [kotak(id, x, y, 38, 24, "#FFFBEB", WG.tali, { rx: 5, tebal: 2.4, z: 1 }), kotak(`${id}-s`, x + 15, y + 9, 8, 6, WG.tali, "#92400E", { rx: 2, tebal: 1, z: 4 })];
  for (let i = 0; i < 10; i += 1) {
    const cx = x + 6 + (i % 5) * 6.6;
    const cy = y + 7 + Math.floor(i / 5) * 10;
    if (jenis === "botol") out.push(kotak(`${id}-b${i}`, bulatkan(cx - 2), bulatkan(cy - 5), 4, 9, WG.botol, WG.botolTua, { rx: 1.2, tebal: 0.8, z: 2 }));
    else if (jenis === "kaleng") out.push(kotak(`${id}-b${i}`, bulatkan(cx - 2.4), bulatkan(cy - 4), 4.8, 7, WG.kaleng, WG.kalengTua, { rx: 1, tebal: 0.8, z: 2 }));
    else out.push(kotak(`${id}-b${i}`, bulatkan(cx - 3), bulatkan(cy - 3.5), 6, 6, WG.koran, WG.koranTua, { rx: 0.8, tebal: 0.8, z: 2 }));
  }
  return out;
}
export const idIkat = (id: string): string[] => [id, `${id}-s`, ...Array.from({ length: 10 }, (_, i) => `${id}-b${i}`)];

/** Benda lepas `${id}0..${id}{n-1}` (jenis botol) dalam baris lima, pojok kiri-atas (x, y). Tiap benda memakai id `${id}${i}` (botol: dan `${id}${i}-t`). */
export function lepas(id: string, x: number, y: number, n: number, jenis: Jenis = "botol"): Obj[] {
  return Array.from({ length: n }, (_, i) => benda(`${id}${i}`, x + 5 + (i % 5) * 10, y + 8 + Math.floor(i / 5) * 16, jenis)).flat();
}
export const idLepas = (id: string, n: number, jenis: Jenis = "botol"): string[] => Array.from({ length: n }, (_, i) => idBenda(`${id}${i}`, jenis)).flat();

/** Sapu: gagang `${id}` dan bulu `${id}-b`. Pojok bawah gagang (x, y). */
export const sapu = (id: string, x: number, y: number): Obj[] => [garis(id, x, y, 16, -34, W.coklat, 2.6, { z: 2 }), kotak(`${id}-b`, x - 6, y - 2, 14, 7, "#CA8A04", W.coklat, { rx: 2, tebal: 1.2, z: 2 })];
export const idSapu = (id: string): string[] => [id, `${id}-b`];

/** Papan nama tim: papan `${id}` dan tulisan `${id}-t`. Pojok kiri-atas (x, y). */
export const papanTim = (id: string, x: number, y: number, nama: string, warna: string, w = 46): Obj[] => [
  kotak(id, x, y, w, 16, warna, W.biru, { rx: 3, tebal: 1.4, z: 1 }),
  teks(`${id}-t`, x + w / 2, y + 11.5, nama, 8.6, W.biru, { z: 2 }),
];
export const idPapanTim = (id: string): string[] => [id, `${id}-t`];

/** Bingkai sepuluh: dua baris lima kotak `${id}-c{i}`, terisi `${id}-d{i}` untuk `n` kotak pertama. Pojok kiri-atas (x, y), kotak c x c. */
export function bingkai(id: string, x: number, y: number, n: number, c = 14, warna = "#F59E0B"): Obj[] {
  const out: Obj[] = [];
  for (let i = 0; i < 10; i += 1) out.push(kotak(`${id}-c${i}`, x + (i % 5) * c, y + Math.floor(i / 5) * c, c, c, "#FFFFFF", W.biru, { rx: 1, tebal: 1.2, z: 1 }));
  for (let i = 0; i < n; i += 1) out.push(bulat(`${id}-d${i}`, bulatkan(x + (i % 5) * c + c / 2), bulatkan(y + Math.floor(i / 5) * c + c / 2), c * 0.32, warna, "#92400E", { tebal: 1, z: 2 }));
  return out;
}
export const idBingkai = (id: string, n = 10): string[] => [...Array.from({ length: 10 }, (_, i) => `${id}-c${i}`), ...Array.from({ length: n }, (_, i) => `${id}-d${i}`)];

/** Batang puluhan setinggi sepuluh kotak `${id}` dan garis kotak `${id}-c{i}`. Pojok kiri-bawah (x, yb), lebar w, tinggi satu kotak t. */
export function batangPuluh(id: string, x: number, yb: number, w = 8, t = 4.4): Obj[] {
  return [kotak(id, x, bulatkan(yb - 10 * t), w, 10 * t, WG.batang, WG.batangTua, { rx: 1, tebal: 1.2, z: 1 }), ...Array.from({ length: 9 }, (_, i) => garis(`${id}-c${i}`, x, bulatkan(yb - (i + 1) * t), w, 0, WG.batangTua, 0.7, { z: 2, op: 0.7 }))];
}
export const idBatangPuluh = (id: string): string[] => [id, ...Array.from({ length: 9 }, (_, i) => `${id}-c${i}`)];
/** Kotak satuan `${id}`. Pojok kiri-bawah (x, yb), sisi s. */
export const kotakSatuan = (id: string, x: number, yb: number, s = 8): Obj => kotak(id, x, bulatkan(yb - s), s, s, WG.satuan, WG.satuanTua, { rx: 1, tebal: 1.1, z: 1 });

/* ------------------------------ Tokoh ------------------------------ */

export type NamaTokoh = "Chacha" | "Dika" | "Nia" | "Bu Sari" | "Pak Ujang" | "Bu Lia";

/**
 * Tokoh berdiri: wajah `${id}`, nama `${id}-n`. Nia bertopi `${id}-tp`; Bu Sari berkerudung hijau `${id}-kr` dan berompi hijau bertulisan BANK SAMPAH `${id}-rm` `${id}-rt`;
 * Pak Ujang bertopi `${id}-cp`, berompi `${id}-rm`, bersarung tangan kuning `${id}-sg`; Bu Lia (tamu Sub-Bab berikutnya, tampak di kejauhan) berkerudung kuning `${id}-kr`
 * dan membawa papan pengumuman `${id}-pp`. Tanpa ZWJ.
 */
export function tokoh(id: string, x: number, y0: number, nama: NamaTokoh, u = 30): Obj[] {
  /* Baris tokoh standar (184) dinaikkan 10 supaya nama tokoh tidak menimpa keterangan sumber di pojok kanan bawah. */
  const y = y0 === 184 ? 174 : y0;
  const wajah = nama === "Chacha" ? E.chacha : nama === "Dika" ? E.dika : nama === "Nia" ? E.nia : nama === "Pak Ujang" ? E.pak : E.bu;
  const out: Obj[] = [emo(id, x, y, wajah, u, { z: 1 })];
  if (nama === "Nia") out.push(emo(`${id}-tp`, x, bulatkan(y - u * 0.5), E.topi, bulatkan(u * 0.55), { z: 2 }));
  if (nama === "Bu Sari") {
    out.push(kotak(`${id}-kr`, x - 16, bulatkan(y - u * 0.98), 32, bulatkan(u * 1.08), "#16A34A", "#166534", { rx: 14, tebal: 1.2, z: 0 }));
    out.push(kotak(`${id}-rm`, x - 12, bulatkan(y + 2), 24, 9, "#22C55E", "#166534", { rx: 3, tebal: 1.2, z: 0 }));
    out.push(teks(`${id}-rt`, x, bulatkan(y + 8.2), "BANK SAMPAH", 4.2, "#FFFFFF", { z: 3 }));
  }
  if (nama === "Pak Ujang") {
    out.push(kotak(`${id}-cp`, x - 10, bulatkan(y - u * 0.78), 20, 8, "#166534", "#14532D", { rx: 4, tebal: 1.3, z: 2 }));
    out.push(kotak(`${id}-rm`, x - 11, bulatkan(y + 2), 22, 8, "#15803D", "#14532D", { rx: 3, tebal: 1.2, z: 0 }));
    out.push(bulat(`${id}-sg`, x + 12, bulatkan(y + 7), 3.4, "#FACC15", "#A16207", { tebal: 1.2, z: 2 }));
  }
  if (nama === "Bu Lia") {
    out.push(kotak(`${id}-kr`, x - 16, bulatkan(y - u * 0.98), 32, bulatkan(u * 1.08), "#FDE047", "#A16207", { rx: 14, tebal: 1.2, z: 0 }));
    out.push(kotak(`${id}-pp`, x + 9, bulatkan(y - 4), 14, 11, "#FFFFFF", W.coklat, { rx: 1.5, tebal: 1.3, z: 2 }));
  }
  out.push(teks(`${id}-n`, x, bulatkan(y + 15), nama, 8.4, W.ungu, { z: 3 }));
  return out;
}
export const idTokoh = (id: string, nama: NamaTokoh): string[] => [
  id,
  `${id}-n`,
  ...(nama === "Nia" ? [`${id}-tp`] : []),
  ...(nama === "Bu Sari" ? [`${id}-kr`, `${id}-rm`, `${id}-rt`] : []),
  ...(nama === "Pak Ujang" ? [`${id}-cp`, `${id}-rm`, `${id}-sg`] : []),
  ...(nama === "Bu Lia" ? [`${id}-kr`, `${id}-pp`] : []),
];
/** Patch posisi semua bagian tokoh ke (x, y) baru, untuk ubah. */
export const pindahTokoh = (id: string, x: number, y: number, nama: NamaTokoh, u = 30): (Partial<Obj> & { id: string })[] => pindah(tokoh(id, x, y, nama, u));
