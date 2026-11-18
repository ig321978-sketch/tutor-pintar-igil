import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 2 Bab 3 Sub-Bab B "Papan Puzzle yang Berantakan" (mengurai dan menyusun bangun datar), tengah cerita Taman Bermain Sekolah.
 * Bangun datar sebagai jalur tertutup (titik sudut ditulis mutlak), garis pembagi, penanda sisi bernomor, angka keping, dan tujuh keping tangram.
 * Rupa taman: rumput, pagar taman berpita, papan puzzle raksasa, kuas dan palet Bu Ratna, papan aturan, poster tua, blok kayu, serta tokoh Chacha, Dika, Nia, Bu Sari, dan Bu Ratna.
 *
 * Kesepakatan id (dipakai uji hitung ulang):
 * - Bangun utuh `ut` (atau `ht` bila hasil susunan, tanpa isi). Keping `kp{i}`; angka keping `kn{i}`. Garis pembagi `ug{i}`.
 * - Nama bangun di dekat benda: `${id}-nm`. Penanda sisi bangun `${id}`: garis `${id}s{i}` dan angka `${id}sn{i}`.
 * - Hasil hitung dalam kalimat: `hs`. Tokoh: wajah `${id}`, nama `${id}-n`.
 */

export const W = {
  biru: "#1C01A5",
  emas: "#FFC800",
  merah: "#DC2626",
  hijau: "#16A34A",
  putih: "#FFFFFF",
  abu: "#CBD5E1",
  ungu: "#7C3AED",
  krem: "#FEF9C3",
  langit: "#DBEAFE",
  merahMuda: "#FECACA",
  hijauMuda: "#DCFCE7",
  pink: "#FBCFE8",
  lavender: "#EDE9FE",
  oranye: "#FBA919",
  kuning: "#FDE68A",
};

export const OWL = "\u{1F989}";

type Opsi = Partial<Obj>;
export type Titik = { x: number; y: number };

export const teks = (id: string, x: number, y: number, isi: string, u = 10, warna: string = W.biru, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi, u, warna, ...o });
export const kotak = (id: string, x: number, y: number, w: number, h: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "kotak", x, y, w, h, warna, garis, rx: 3, tebal: 1.5, ...o });
export const bulat = (id: string, x: number, y: number, r: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "bulat", x, y, r, warna, garis, tebal: 1.5, ...o });
export const garis = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "garis", x, y, x2, y2, warna, tebal, ...o });
export const panah = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "panah", x, y, x2, y2, warna, tebal, ...o });
export const emo = (id: string, x: number, y: number, e: string, u = 22, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi: e, u, warna: W.biru, ...o });

/** Judul adegan di tengah atas. */
export const judul = (isi: string, warna: string = W.ungu): Obj => teks("jud", 150, 18, isi, 11, warna);

/** Kartu berwarna dengan satu sampai empat baris teks, pojok kiri-atas (x, y). */
export function kartu(id: string, x: number, y: number, w: number, h: number, warna: string, baris: string[], u = 9, o: Opsi = {}): Obj[] {
  const mulai = y + h / 2 - ((baris.length - 1) * (u + 3)) / 2 + u * 0.35;
  return [kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 8, ...o }), ...baris.map((b, i) => teks(`${id}-t${i}`, x + w / 2, mulai + i * (u + 3), b, u, W.biru, o))];
}

/** Kartu angka atau kata besar: pojok kiri-atas (x, y); id `${id}-k` dan `${id}-t`. */
export const kartuAngka = (id: string, x: number, y: number, isi: string, warna: string = W.krem, w = 40, h = 36, u = 22, o: Opsi = {}): Obj[] => [
  kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 6, tebal: 1.6, ...o }),
  teks(`${id}-t`, x + w / 2, y + h / 2 + u * 0.35, isi, u, W.merah, o),
];

/* ------------------------------ Bangun datar ------------------------------ */

const f = (n: number): string => n.toFixed(1);
const r1 = (n: number): number => Math.round(n * 10) / 10;

/** Bangun datar sebagai satu jalur tertutup. Titik sudut mutlak (pada kanvas), jadi (x, y) benda = geseran. */
export const bg = (id: string, pts: Titik[], warna: string, o: Opsi = {}): Obj => ({ id, t: "jalur", x: 0, y: 0, d: `M${pts.map((p) => `${f(p.x)} ${f(p.y)}`).join(" L")} Z`, warna, garis: W.biru, tebal: 1.6, ...o });

export const P = (x: number, y: number): Titik => ({ x, y });
export const geser = (pts: Titik[], dx: number, dy = 0): Titik[] => pts.map((p) => P(r1(p.x + dx), r1(p.y + dy)));
export const pusat = (pts: Titik[]): Titik => P(r1(pts.reduce((t, p) => t + p.x, 0) / pts.length), r1(pts.reduce((t, p) => t + p.y, 0) / pts.length));

/** Persegi atau persegi panjang dengan pojok kiri-atas (x, y): kiri-atas, kanan-atas, kanan-bawah, kiri-bawah. */
export const persegi = (x: number, y: number, w: number, h: number = w): Titik[] => [P(x, y), P(x + w, y), P(x + w, y + h), P(x, y + h)];

/** Segi banyak beraturan `n` sisi, pusat (cx, cy), jari-jari r, pojok pertama di atas (diputar `rot` derajat). */
export function segiBanyak(n: number, cx: number, cy: number, r: number, rot = 0): Titik[] {
  return Array.from({ length: n }, (_, i) => {
    const a = ((-90 + rot + (360 / n) * i) * Math.PI) / 180;
    return P(r1(cx + r * Math.cos(a)), r1(cy + r * Math.sin(a)));
  });
}

/** Titik potong dua garis lurus a-b dan c-d (dibulatkan satu desimal). */
export function potong(a: Titik, b: Titik, c: Titik, d: Titik): Titik {
  const den = (b.x - a.x) * (d.y - c.y) - (b.y - a.y) * (d.x - c.x);
  const t = ((c.x - a.x) * (d.y - c.y) - (c.y - a.y) * (d.x - c.x)) / den;
  return P(r1(a.x + t * (b.x - a.x)), r1(a.y + t * (b.y - a.y)));
}

/** Garis pembagi dari titik a ke titik b (tergambar bertahap), id `ug{i}`. */
export const garisUrai = (i: number, a: Titik, b: Titik, warna: string = W.merah): Obj => garis(`ug${i}`, a.x, a.y, r1(b.x - a.x), r1(b.y - a.y), warna, 2.6, { gambar: true, z: 4 });

/** Angka keping ke-i (id `kn{i}`) di pusat keping. */
export const angkaKeping = (i: number, pts: Titik[], isi: string = String(i + 1), u = 9, naik = 0): Obj => {
  const c = pusat(pts);
  return teks(`kn${i}`, c.x, r1(c.y + u * 0.35 - naik), isi, u, W.merah, { z: 5 });
};

/** Titik di luar bangun, searah dari pusat ke titik `p`, sejauh `jarak`. */
function keluar(p: Titik, pus: Titik, jarak: number): Titik {
  const dx = p.x - pus.x;
  const dy = p.y - pus.y;
  const l = Math.hypot(dx, dy) || 1;
  return P(r1(p.x + (dx / l) * jarak), r1(p.y + (dy / l) * jarak + 3.5));
}

/** Garis merah penanda sisi ke-i bangun `id` (dari pojok i ke pojok i+1): id `${id}s${i}`. */
export const garisSisi = (id: string, pts: Titik[], i: number, warna: string = W.merah, tebal = 3.4): Obj => {
  const a = pts[i];
  const b = pts[(i + 1) % pts.length];
  return garis(`${id}s${i}`, a.x, a.y, r1(b.x - a.x), r1(b.y - a.y), warna, tebal, { gambar: true, z: 6 });
};
/** Angka di luar sisi ke-i: id `${id}sn${i}`. `arah` (vektor satuan) menentukan sisi luar bila bangun tidak cembung. */
export const angkaSisi = (id: string, pts: Titik[], i: number, jarak = 10, arah?: Titik): Obj => {
  const a = pts[i];
  const b = pts[(i + 1) % pts.length];
  const mid = P((a.x + b.x) / 2, (a.y + b.y) / 2);
  const t = arah ? P(r1(mid.x + arah.x * jarak), r1(mid.y + arah.y * jarak + 3.5)) : keluar(mid, pusat(pts), jarak);
  return teks(`${id}sn${i}`, t.x, t.y, String(i + 1), 9, W.merah, { z: 6 });
};
export const idSisi = (id: string, n: number): string[] => Array.from({ length: n }, (_, i) => [`${id}s${i}`, `${id}sn${i}`]).flat();

/** Nama bangun: id `${id}-nm`. */
export const namaBangun = (id: string, x: number, y: number, isi: string, u = 8.6): Obj => teks(`${id}-nm`, x, y, isi, u, W.ungu);

/** Hasil hitung dalam kalimat di bawah gambar: id `hs`. */
export const hasilHitung = (isi: string, y = 176, u = 11): Obj => teks("hs", 150, y, isi, u, W.merah);

/** Warna keping berurutan. */
export const WARNA_KEPING = ["#FBCFE8", "#BFDBFE", "#BBF7D0", "#FDE68A", "#DDD6FE", "#FDBA74", "#A5F3FC"];

/* ------------------------------ Tangram tujuh keping (persegi 4 x 4 diperbesar 20 kali) ------------------------------ */

/** Tujuh keping tangram pada persegi berpojok kiri-atas (ox, oy); sisi persegi 80. Urutan: dua segitiga besar, segitiga sedang, dua segi empat (jajar genjang, persegi), dua segitiga kecil. */
export const tangram = (ox: number, oy: number): { id: string; jenis: string; pts: Titik[] }[] => {
  const t = (x: number, y: number): Titik => P(ox + x * 20, oy + (4 - y) * 20);
  return [
    { id: "kp0", jenis: "segitiga", pts: [t(0, 0), t(4, 0), t(2, 2)] },
    { id: "kp1", jenis: "segitiga", pts: [t(0, 0), t(0, 4), t(2, 2)] },
    { id: "kp2", jenis: "segitiga", pts: [t(4, 4), t(2, 4), t(4, 2)] },
    { id: "kp3", jenis: "segi empat", pts: [t(0, 4), t(2, 4), t(3, 3), t(1, 3)] },
    { id: "kp4", jenis: "segi empat", pts: [t(3, 3), t(4, 2), t(3, 1), t(2, 2)] },
    { id: "kp5", jenis: "segitiga", pts: [t(1, 3), t(3, 3), t(2, 2)] },
    { id: "kp6", jenis: "segitiga", pts: [t(4, 2), t(4, 0), t(3, 1)] },
  ];
};

/* ------------------------------ Rupa taman bermain, tokoh, dan benda ------------------------------ */

export const E = {
  chacha: "\u{1F467}",
  dika: "\u{1F913}",
  nia: "\u{1F467}",
  topi: "\u{1F9E2}",
  bu: "\u{1F469}",
  kuas: "\u{1F58C}\u{FE0F}",
  palet: "\u{1F3A8}",
  angin: "\u{1F4A8}",
  kalender: "\u{1F4C5}",
  pikir: "\u{1F914}",
  senyum: "\u{1F60A}",
  tertawa: "\u{1F604}",
  kaget: "\u{1F632}",
  sedih: "\u{1F622}",
  tanya: "\u{2753}",
  lampu: "\u{1F4A1}",
  benar: "\u{2705}",
  salah: "\u{274C}",
  lambai: "\u{1F44B}",
  gunting: "\u{2702}",
  pohon: "\u{1F333}",
  bunga: "\u{1F33C}",
  matahari: "\u{2600}\u{FE0F}",
  gudang: "\u{1F3DA}\u{FE0F}",
  kucing: "\u{1F431}",
  rumah: "\u{1F3E0}",
  lukisan: "\u{1F5BC}\u{FE0F}",
  poster: "\u{1F4DC}",
  kayu: "\u{1F9F1}",
} as const;

export type NamaTokoh = "Chacha" | "Dika" | "Nia" | "Bu Sari" | "Bu Ratna";

/**
 * Tokoh berdiri: wajah `${id}`, nama `${id}-n`. Nia bertopi `${id}-tp`; Bu Sari bertopi proyek kuning `${id}-tp`;
 * Bu Ratna berkerudung merah muda `${id}-kd` dan membawa kuas `${id}-ks`.
 */
export function tokoh(id: string, x: number, y: number, nama: NamaTokoh, u = 30): Obj[] {
  const wajah = nama === "Chacha" ? E.chacha : nama === "Dika" ? E.dika : nama === "Nia" ? E.nia : E.bu;
  const out: Obj[] = [];
  if (nama === "Bu Ratna") out.push(bulat(`${id}-kd`, x, r1(y - u * 0.28), r1(u * 0.62), "#F9A8D4", W.ungu, { z: 0, tebal: 1.2 }));
  out.push(emo(id, x, y, wajah, u, { z: 1 }));
  if (nama === "Nia") out.push(emo(`${id}-tp`, x, r1(y - u * 0.5), E.topi, r1(u * 0.55), { z: 2 }));
  if (nama === "Bu Sari") out.push(kotak(`${id}-tp`, r1(x - 10), r1(y - u * 0.78), 20, 7, "#FACC15", "#A16207", { rx: 3, tebal: 1, z: 2 }));
  if (nama === "Bu Ratna") out.push(emo(`${id}-ks`, r1(x + u * 0.72), r1(y + 2), E.kuas, r1(u * 0.55), { z: 2 }));
  out.push(teks(`${id}-n`, x, r1(y + 13), nama, 8.4, W.ungu, { z: 2 }));
  return out;
}
export const idTokoh = (id: string, nama: NamaTokoh): string[] => [
  id,
  `${id}-n`,
  ...(nama === "Nia" || nama === "Bu Sari" ? [`${id}-tp`] : []),
  ...(nama === "Bu Ratna" ? [`${id}-kd`, `${id}-ks`] : []),
];

/** Rumput taman `${id}` dari tinggi y sampai bawah kanvas. */
export const rumput = (id: string, y = 150): Obj => kotak(id, 2, y, 296, 198 - y, "#BBF7D0", "#16A34A", { rx: 4, tebal: 1.2, z: -3 });

/** Pagar taman: palang `${id}-r`, tiang `${id}-p{i}`, dan pita `${id}-pt` (kotak merah kecil) di tiang pertama. Pojok kiri-atas (x, y). */
export function pagar(id: string, x: number, y: number, w: number, n = 6): Obj[] {
  return [
    kotak(`${id}-r`, x, y + 8, w, 5, "#D6A15E", "#92400E", { rx: 1, tebal: 1, z: -2 }),
    ...Array.from({ length: n }, (_, i) => kotak(`${id}-p${i}`, r1(x + (w - 6) * (i / (n - 1))), y, 6, 30, "#FDE68A", "#92400E", { rx: 1, tebal: 1, z: -1 })),
  ];
}

/** Papan puzzle raksasa utuh: bingkai kayu `${id}`, langit `${id}-l`, rumput `${id}-g`, matahari `${id}-s`. Pojok kiri-atas (x, y). */
export function papanPuzzle(id: string, x: number, y: number, w: number, h: number, o: Opsi = {}): Obj[] {
  return [
    kotak(id, x, y, w, h, "#D6A15E", "#92400E", { rx: 5, tebal: 3, z: -1, ...o }),
    kotak(`${id}-l`, x + 5, y + 5, w - 10, r1((h - 10) * 0.6), "#BAE6FD", undefined, { rx: 2, z: 0, ...o }),
    kotak(`${id}-g`, x + 5, r1(y + 5 + (h - 10) * 0.6), w - 10, r1((h - 10) * 0.4), "#86EFAC", undefined, { rx: 2, z: 0, ...o }),
    bulat(`${id}-s`, r1(x + w - 18), r1(y + 18), 8, "#FDE047", "#CA8A04", { z: 1, tebal: 1.2, ...o }),
  ];
}
export const idPapanPuzzle = (id: string): string[] => [id, `${id}-l`, `${id}-g`, `${id}-s`];

/** Lubang kosong pada papan: kotak abu-abu putus-putus `${id}`. */
export const lubang = (id: string, x: number, y: number, w: number, h: number): Obj => kotak(id, x, y, w, h, "#E2E8F0", "#475569", { rx: 2, tebal: 1.4, z: 1, putus: true });

/** Warna dasar bangun bayangan gelap `${id}`. */
export const BAYANGAN = "#475569";

export { r1 as bulatkan };
