import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 2 Bab 7 Sub-Bab B "Pengumuman Bu Lia" (membandingkan dan mengurutkan bilangan), akhir cerita Bank Sampah Sekolah.
 * Berkas ini TIDAK dipakai bab atau sub-bab lain.
 *
 * Rupa Bank Sampah Sekolah esok harinya: dinding gudang beratap seng, tali jemuran dengan penjepit berangka, kepik penanda, papan pengumuman,
 * papan tim dengan botol terikat, karung, piala kecil, tabel seratus, kartu bilangan, mulut buaya hijau untuk tanda, spanduk SEKOLAH BERSIH.
 * Tokoh: Chacha, Dika, Nia (bertopi), Bu Sari (berkerudung hijau, berompi hijau BANK SAMPAH), Bu Lia (berkerudung kuning, papan pengumuman dan spidol). Tanpa ZWJ.
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
  kuning: "#FDE68A",
  seng: "#CBD5E1",
  tinta: "#0F172A",
  biruTim: "#93C5FD",
  kuningTim: "#FDE047",
  hijauTim: "#86EFAC",
};

export const E = {
  chacha: "\u{1F467}",
  dika: "\u{1F913}",
  nia: "\u{1F467}",
  topi: "\u{1F9E2}",
  bu: "\u{1F469}",
  tertawa: "\u{1F604}",
  senyum: "\u{1F60A}",
  kaget: "\u{1F632}",
  pikir: "\u{1F914}",
  tanya: "\u{2753}",
  seru: "\u{2757}",
  benar: "\u{2705}",
  salah: "\u{274C}",
  jari: "\u{1F446}",
  lambai: "\u{1F44B}",
  tepuk: "\u{1F44F}",
  kaca: "\u{1F50D}",
  catat: "\u{1F4DD}",
  sorak: "\u{1F389}",
  piala: "\u{1F3C6}",
  kepik: "\u{1F41E}",
  botol: "\u{1F37E}",
  kaleng: "\u{1F96B}",
  koran: "\u{1F4F0}",
  kardus: "\u{1F4E6}",
  bintang: "\u{2B50}",
  lampu: "\u{1F4A1}",
  daur: "\u{267B}",
  keringat: "\u{1F4A6}",
} as const;

type Opsi = Partial<Obj>;
const r1 = (n: number): number => Math.round(n * 10) / 10;

export const teks = (id: string, x: number, y: number, isi: string, u = 10, warna: string = W.biru, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi, u, warna, ...o });
export const kotak = (id: string, x: number, y: number, w: number, h: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "kotak", x, y, w, h, warna, garis, rx: 3, tebal: 1.5, ...o });
export const bulat = (id: string, x: number, y: number, r: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "bulat", x, y, r, warna, garis, tebal: 1.5, ...o });
export const garis = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "garis", x, y, x2, y2, warna, tebal, ...o });
export const panah = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "panah", x, y, x2, y2, warna, tebal, ...o });
export const emo = (id: string, x: number, y: number, e: string, u = 22, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi: e, u, warna: W.biru, ...o });
/** Judul adegan di tengah atas (di bawah atap seng). */
export const judul = (isi: string, warna: string = W.ungu): Obj => teks("jud", 150, 24, isi, 11, warna);

/** Kartu berwarna dengan satu sampai tiga baris teks, pojok kiri-atas (x, y): `${id}-k`, `${id}-t{i}`. */
export function kartu(id: string, x: number, y: number, w: number, h: number, warna: string, baris: string[], u = 9, o: Opsi = {}): Obj[] {
  const mulai = y + h / 2 - ((baris.length - 1) * (u + 3)) / 2 + u * 0.35;
  return [kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 8, ...o }), ...baris.map((b, i) => teks(`${id}-t${i}`, x + w / 2, mulai + i * (u + 3), b, u, W.biru, o))];
}
export const idKartu = (id: string, n = 1): string[] => [`${id}-k`, ...Array.from({ length: n }, (_, i) => `${id}-t${i}`)];

/** Poligon tertutup dari titik-titik absolut (di kanvas). */
export const poligon = (id: string, pts: [number, number][], warna: string, garisW: string = W.biru, o: Opsi = {}): Obj => ({
  id,
  t: "jalur",
  x: pts[0][0],
  y: pts[0][1],
  d: `M0 0 ${pts.slice(1).map(([a, b]) => `L${r1(a - pts[0][0])} ${r1(b - pts[0][1])}`).join(" ")} Z`,
  warna,
  garis: garisW,
  tebal: 1.6,
  ...o,
});

/* ------------------------------ Dinding gudang ------------------------------ */

/** Dinding gudang `${id}` dengan atap seng `${id}-a` (garis tegak `${id}-s{i}`) dan lantai `${id}-l`. */
export const dinding = (id: string, wall = "#F1F5F9"): Obj[] => [
  kotak(id, 2, 2, 296, 166, wall, "#94A3B8", { rx: 4, tebal: 1.2, z: -4 }),
  kotak(`${id}-a`, 2, 2, 296, 9, W.seng, "#64748B", { rx: 2, tebal: 1.2, z: -3 }),
  ...Array.from({ length: 12 }, (_, i) => garis(`${id}-s${i}`, r1(14 + i * 24), 3, 0, 7, "#64748B", 1, { z: -3 })),
  kotak(`${id}-l`, 2, 168, 296, 30, "#D6D3D1", "#A8A29E", { rx: 3, tebal: 1.2, z: -3 }),
];
export const idDinding = (id: string): string[] => [id, `${id}-a`, `${id}-l`, ...Array.from({ length: 12 }, (_, i) => `${id}-s${i}`)];

/** Panggung penutup berwarna `${id}` (latar gelap) untuk perayaan. */
export const panggung = (id: string): Obj[] => [kotak(id, 2, 2, 296, 196, "#DCFCE7", "#16A34A", { rx: 6, tebal: 2, z: -4 }), kotak(`${id}-l`, 2, 168, 296, 30, "#BBF7D0", "#16A34A", { rx: 3, tebal: 1.2, z: -3 })];

/* ------------------------------ Tali jemuran berangka ------------------------------ */

export const xTali = (n: number, dari: number, sampai: number, x0 = 24, x1 = 276): number => r1(x0 + ((n - dari) * (x1 - x0)) / (sampai - dari));
const WARNA_JEPIT = [W.merah, W.emas, W.hijau, "#3B82F6"];
/**
 * Tali jemuran `${id}` pada tinggi y dari bilangan `dari` sampai `sampai` (jarak sama, x0 sampai x1). Penjepit `${id}p{n}` dan angka `${id}n{n}` hanya untuk
 * bilangan di `tampil` (bawaan semua).
 */
export function tali(id: string, y: number, dari: number, sampai: number, tampil?: number[], x0 = 24, x1 = 276, u = 9): Obj[] {
  const daftar = tampil ?? Array.from({ length: sampai - dari + 1 }, (_, i) => dari + i);
  return [
    garis(id, x0 - 10, y, r1(x1 - x0 + 20), 0, "#78350F", 2.2, { z: 0 }),
    ...daftar.flatMap((n, i) => {
      const x = xTali(n, dari, sampai, x0, x1);
      return [kotak(`${id}p${n}`, r1(x - 3.5), y - 1, 7, 12, WARNA_JEPIT[i % 4], W.biru, { rx: 1.5, tebal: 1, z: 1 }), teks(`${id}n${n}`, x, r1(y + 12 + u * 1.3), String(n), u, W.biru, { z: 2 })];
    }),
  ];
}
export const idTali = (id: string, tampil: number[]): string[] => [id, ...tampil.flatMap((n) => [`${id}p${n}`, `${id}n${n}`])];
/** Tampil penjepit dan angka bilangan `n` pada tali (untuk ditambahkan kemudian). */
export const jepit = (id: string, y: number, n: number, dari: number, sampai: number, warna: string = W.biru, x0 = 24, x1 = 276, u = 9): Obj[] => {
  const x = xTali(n, dari, sampai, x0, x1);
  return [kotak(`${id}p${n}`, r1(x - 3.5), y - 1, 7, 12, WARNA_JEPIT[n % 4], W.biru, { rx: 1.5, tebal: 1, z: 1 }), teks(`${id}n${n}`, x, r1(y + 12 + u * 1.3), String(n), u, warna, { z: 2 })];
};
/** Kepik penanda `${id}` di atas bilangan n pada tali tinggi y. */
export const kepik = (id: string, y: number, n: number, dari: number, sampai: number, x0 = 24, x1 = 276, u = 17): Obj => emo(id, xTali(n, dari, sampai, x0, x1), y - 7, E.kepik, u, { z: 4 });
/** Patch memindah kepik `${id}` ke bilangan n. */
export const pindahKepik = (id: string, n: number, dari: number, sampai: number, x0 = 24, x1 = 276): (Partial<Obj> & { id: string })[] => [{ id, x: xTali(n, dari, sampai, x0, x1) }];

/* ------------------------------ Botol terikat dan papan tim ------------------------------ */

/**
 * Botol terikat: `p` ikat (kotak hijau muda bertali, `${id}b{i}`, `${id}t{i}`) dan `s` botol lepas (bulatan `${id}l{i}`) berderet dari (x, y).
 */
export function ikatan(id: string, x: number, y: number, p: number, s: number, lebar = 11): Obj[] {
  const out: Obj[] = [];
  for (let i = 0; i < p; i += 1) {
    out.push(kotak(`${id}b${i}`, r1(x + i * (lebar + 1.5)), y, lebar, 18, "#BBF7D0", "#15803D", { rx: 2, tebal: 1.2, z: 1 }));
    out.push(garis(`${id}t${i}`, r1(x + i * (lebar + 1.5)), r1(y + 9), lebar, 0, "#92400E", 1.6, { z: 2 }));
  }
  const x2 = x + p * (lebar + 1.5) + 4;
  for (let i = 0; i < s; i += 1) out.push(bulat(`${id}l${i}`, r1(x2 + i * 6.4), r1(y + 14), 2.6, "#86EFAC", "#15803D", { tebal: 1, z: 1 }));
  return out;
}
export const idIkatan = (id: string, p: number, s: number): string[] => [
  ...Array.from({ length: p }, (_, i) => [`${id}b${i}`, `${id}t${i}`]).flat(),
  ...Array.from({ length: s }, (_, i) => `${id}l${i}`),
];

/** Papan tim `${id}-k` dengan nama `${id}-m` dan bilangan besar `${id}-n`; pojok kiri-atas (x, y). */
export function papanTim(id: string, x: number, y: number, w: number, nama: string, n: number | string, warna: string): Obj[] {
  return [
    kotak(`${id}-k`, x, y, w, 40, warna, W.coklat, { rx: 5, tebal: 3, z: 1 }),
    teks(`${id}-m`, r1(x + w / 2), r1(y + 12), nama, 8.4, W.biru, { z: 2 }),
    teks(`${id}-n`, r1(x + w / 2), r1(y + 34), String(n), 17, W.biru, { z: 2 }),
  ];
}
export const idPapanTim = (id: string): string[] => [`${id}-k`, `${id}-m`, `${id}-n`];

/** Papan puluhan dan satuan `${id}`: dua kotak (puluhan `${id}-p`, satuan `${id}-s`) berisi angka `${id}-pt`, `${id}-st`; pojok kiri-atas (x, y). */
export function papanPS(id: string, x: number, y: number, p: number, s: number, warna: string = W.putih): Obj[] {
  return [
    kotak(`${id}-p`, x, y, 34, 40, warna, W.biru, { rx: 4, tebal: 2, z: 1 }),
    teks(`${id}-pt`, x + 17, y + 29, String(p), 22, W.biru, { z: 2 }),
    kotak(`${id}-s`, x + 36, y, 34, 40, warna, W.merah, { rx: 4, tebal: 2, z: 1 }),
    teks(`${id}-st`, x + 53, y + 29, String(s), 22, W.merah, { z: 2 }),
  ];
}
export const idPapanPS = (id: string): string[] => [`${id}-p`, `${id}-pt`, `${id}-s`, `${id}-st`];

/** Tumpukan karung `${id}0...`: n karung kecil berwarna cokelat muda. */
export const karung = (id: string, x: number, y: number, n: number): Obj[] =>
  Array.from({ length: n }, (_, i) => kotak(`${id}${i}`, r1(x + (i % 3) * 15), r1(y - Math.floor(i / 3) * 14), 13, 13, "#E7C98A", "#92400E", { rx: 4, tebal: 1.3, z: 1 }));
export const idKarung = (id: string, n: number): string[] => Array.from({ length: n }, (_, i) => `${id}${i}`);

/** Spanduk `${id}` dan teksnya `${id}-t`. Pojok kiri-atas (x, y). */
export const spanduk = (id: string, x: number, y: number, w: number, isi: string, u = 10, warna: string = W.hijauMuda): Obj[] => [
  kotak(id, x, y, w, 22, warna, W.hijau, { rx: 3, tebal: 2, z: 1 }),
  teks(`${id}-t`, x + w / 2, r1(y + 11 + u * 0.35), isi, u, "#166534", { z: 2 }),
];

/** Papan pengumuman `${id}` bertiang (kaki `${id}-a`, `${id}-b`). */
export const papanUmum = (id: string, x: number, y: number, w: number, h: number): Obj[] => [
  kotak(id, x, y, w, h, "#FEF3C7", W.coklat, { rx: 5, tebal: 3.4, z: -1 }),
  kotak(`${id}-a`, r1(x + 10), r1(y + h), 5, 12, W.coklat, W.coklat, { rx: 1, tebal: 0.8, z: -2 }),
  kotak(`${id}-b`, r1(x + w - 15), r1(y + h), 5, 12, W.coklat, W.coklat, { rx: 1, tebal: 0.8, z: -2 }),
];
export const idPapanUmum = (id: string): string[] => [id, `${id}-a`, `${id}-b`];

/* ------------------------------ Tabel seratus ------------------------------ */

/**
 * Tabel seratus `${id}`: sel `${id}c{n}` dan angka `${id}t{n}` untuk bilangan 1 sampai 100, sepuluh baris dan sepuluh kolom,
 * pojok kiri-atas (x, y), tiap sel selebar `cw` dan setinggi `ch`.
 */
export function tabelSeratus(id: string, x: number, y: number, cw = 22, ch = 14, u = 6.4): Obj[] {
  const out: Obj[] = [];
  for (let n = 1; n <= 100; n += 1) {
    const b = Math.floor((n - 1) / 10);
    const k = (n - 1) % 10;
    out.push(kotak(`${id}c${n}`, r1(x + k * cw), r1(y + b * ch), cw, ch, W.putih, "#94A3B8", { rx: 1, tebal: 0.8, z: 0 }));
    out.push(teks(`${id}t${n}`, r1(x + k * cw + cw / 2), r1(y + b * ch + ch / 2 + u * 0.35), String(n), u, W.biru, { z: 1 }));
  }
  return out;
}
export const idTabel = (id: string, dari = 1, sampai = 100): string[] => Array.from({ length: sampai - dari + 1 }, (_, i) => [`${id}c${dari + i}`, `${id}t${dari + i}`]).flat();
/** Patch mewarnai sel tabel `n` dengan warna tertentu. */
export const warnaiSel = (id: string, warna: string, ...ns: number[]): (Partial<Obj> & { id: string })[] => ns.map((n) => ({ id: `${id}c${n}`, warna }));

/* ------------------------------ Tokoh ------------------------------ */

export type NamaTokoh = "Chacha" | "Dika" | "Nia" | "Bu Sari" | "Bu Lia";

/**
 * Tokoh berdiri: wajah `${id}`, nama `${id}-n`. Nia bertopi `${id}-tp`; Bu Sari berkerudung hijau `${id}-kr` dan berompi hijau BANK SAMPAH `${id}-rm`, `${id}-rt`;
 * Bu Lia berkerudung kuning `${id}-kr`, berpapan pengumuman `${id}-pp` dan berspidol `${id}-sp`.
 */
export function tokoh(id: string, x: number, y: number, nama: NamaTokoh, u = 30): Obj[] {
  const wajah = nama === "Chacha" ? E.chacha : nama === "Dika" ? E.dika : nama === "Nia" ? E.nia : E.bu;
  const out: Obj[] = [emo(id, x, y, wajah, u, { z: 1 })];
  if (nama === "Nia") out.push(emo(`${id}-tp`, x, r1(y - u * 0.5), E.topi, r1(u * 0.55), { z: 2 }));
  const guru = nama === "Bu Sari" || nama === "Bu Lia";
  if (guru) {
    const warna = nama === "Bu Sari" ? "#16A34A" : "#FACC15";
    out.push({ id: `${id}-kr`, t: "jalur", x: r1(x - 13), y: r1(y - u * 0.55 + 8), d: "M0 0 L1 -12 L7 -17 L19 -17 L25 -12 L26 0 Z", warna, garis: W.biru, tebal: 1.4, z: 2 });
  }
  if (nama === "Bu Sari") {
    out.push(kotak(`${id}-rm`, x - 12, y + 4, 24, 10, "#16A34A", W.biru, { rx: 2, tebal: 1, z: 1 }));
    out.push(teks(`${id}-rt`, x, r1(y + 10.6), "BANK SAMPAH", 3.6, W.putih, { z: 2 }));
  }
  if (nama === "Bu Lia") {
    out.push(kotak(`${id}-pp`, x + 14, y - 4, 11, 15, W.krem, W.coklat, { rx: 1.5, tebal: 1.2, z: 2 }));
    out.push(garis(`${id}-sp`, x + 27, y - 2, 0, 11, W.merah, 2, { z: 2 }));
  }
  out.push(teks(`${id}-n`, x, r1(y + (guru ? 22 : 13)), nama, 8.4, W.ungu, { z: 2 }));
  return out;
}
export const idTokoh = (id: string, nama: NamaTokoh): string[] => [
  id,
  `${id}-n`,
  ...(nama === "Nia" ? [`${id}-tp`] : []),
  ...(nama === "Bu Sari" ? [`${id}-kr`, `${id}-rm`, `${id}-rt`] : []),
  ...(nama === "Bu Lia" ? [`${id}-kr`, `${id}-pp`, `${id}-sp`] : []),
];

/** Lintasan konfeti kecil: deretan kotak warna-warni `${id}0...` pada tinggi y. */
export const konfeti = (id: string, y: number, n = 10): Obj[] =>
  Array.from({ length: n }, (_, i) => kotak(`${id}${i}`, r1(14 + i * 27), r1(y + (i % 3) * 7), 5, 7, [W.merah, W.emas, W.hijau, "#3B82F6"][i % 4], undefined, { rx: 1, rot: i * 23, z: 4 }));
export const idKonfeti = (id: string, n = 10): string[] => Array.from({ length: n }, (_, i) => `${id}${i}`);

/** Mulut buaya hijau `${id}` (poligon) menghadap kanan (besar di kanan, arah ">" terbuka ke kanan) atau kiri, dengan mata `${id}-e`. Pojok pusat (cx, cy). */
export const mulutBuaya = (id: string, cx: number, cy: number, arah: "kanan" | "kiri", s = 1): Obj[] => {
  const t = arah === "kanan" ? 1 : -1;
  return [
    poligon(id, [[r1(cx - t * 16 * s), r1(cy - 14 * s)], [r1(cx + t * 14 * s), cy], [r1(cx - t * 16 * s), r1(cy + 14 * s)], [r1(cx - t * 8 * s), cy]], "#4ADE80", "#15803D", { z: 2, tebal: 1.8 }),
    bulat(`${id}-e`, r1(cx - t * 9 * s), r1(cy - 9 * s), r1(2.2 * s), W.putih, "#15803D", { z: 3, tebal: 1 }),
  ];
};
export const idBuaya = (id: string): string[] => [id, `${id}-e`];
