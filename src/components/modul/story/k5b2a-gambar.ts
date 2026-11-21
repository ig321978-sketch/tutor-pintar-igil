import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 5 Bab 2 Sub-Bab A "Lonceng Bu Marni" (kelipatan: hasil kali bilangan bulat, nol bukan kelipatan, tabel bilangan berwarna, cek dengan pembagian),
 * awal cerita Pasar Kuliner Malam. Berkas ini TIDAK dipakai bab atau sub-bab lain.
 *
 * Rupa: Pasar Kuliner Malam: lantai pasar, lampion berderet, stan wedang jahe Bu Marni dengan lonceng besar, gerobak bakso Pak Tarno, papan tabel bilangan satu sampai lima puluh
 * (sel digambar sungguh dengan angka yang benar), pita pembagian, dan garis lompat. Tokoh: Bima (berkaus hijau, berpapan jepit), Citra (berkucir dua), Fajar (bertopi suporter),
 * Pak Arif (berompi oranye, berpengeras suara kecil), Bu Marni (berselendang ungu, bertangga kecil), Pak Tarno (berikat kepala merah). Tanpa ZWJ, emoji paling tinggi U+1FA95.
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
  krem: "#FEF3C7",
  oranye: "#EA580C",
  lantai: "#FDE68A",
  malam: "#FFF7ED",
  papan: "#78350F",
  kapur: "#FEF9C3",
  sorot: "#FDE68A",
  jingga: "#FDBA74",
  langit: "#BAE6FD",
  biruMuda: "#DBEAFE",
  hijauMuda: "#DCFCE7",
  merahMuda: "#FECACA",
};

export const E = {
  bima: "\u{1F466}",
  citra: "\u{1F467}",
  fajar: "\u{1F9D2}",
  pak: "\u{1F468}",
  bu: "\u{1F469}",
  senyum: "\u{1F60A}",
  cemberut: "\u{1F620}",
  pikir: "\u{1F914}",
  tanya: "\u{2753}",
  benar: "\u{2705}",
  salah: "\u{274C}",
  lambai: "\u{1F44B}",
  tepuk: "\u{1F44F}",
  catat: "\u{1F4DD}",
  jempol: "\u{1F44D}",
  mata: "\u{1F440}",
  megafon: "\u{1F4E2}",
  tertawa: "\u{1F602}",
  kuat: "\u{1F4AA}",
  bicara: "\u{1F4AC}",
  lampu: "\u{1F4A1}",
  lonceng: "\u{1F514}",
  lampion: "\u{1F3EE}",
  wedang: "\u{1F375}",
  bakso: "\u{1F362}",
  nada: "\u{1F3B5}",
  bulan: "\u{1F319}",
  telinga: "\u{1F649}",
  henti: "\u{1F6D1}",
  ulang: "\u{1F501}",
  bintang: "\u{2B50}",
  daftar: "\u{1F4CB}",
  warna: "\u{1F3A8}",
  jejak: "\u{1F463}",
} as const;

type Opsi = Partial<Obj>;
export const bulatkan = (n: number): number => Math.round(n * 10) / 10;

export const teks = (id: string, x: number, y: number, isi: string, u = 10, warna: string = W.biru, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi, u, warna, ...o });
export const kotak = (id: string, x: number, y: number, w: number, h: number, warna: string | undefined, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "kotak", x, y, w, h, warna, garis, rx: 3, tebal: 1.5, ...o });
export const bulat = (id: string, x: number, y: number, r: number, warna: string | undefined, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "bulat", x, y, r, warna, garis, tebal: 1.5, ...o });
export const garis = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "garis", x, y, x2, y2, warna, tebal, ...o });
export const panah = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "panah", x, y, x2, y2, warna, tebal, ...o });
export const emo = (id: string, x: number, y: number, e: string, u = 22, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi: e, u, warna: W.biru, ...o });
/** Judul adegan di tengah atas. */
export const judul = (isi: string, warna: string = W.hijauTua): Obj => teks("jud", 150, 18, isi, 11, warna);

/** Lantai pasar dari tinggi y sampai bawah kanvas. */
export function tanah(id: string, y = 150): Obj[] {
  return [kotak(id, 2, y, 296, 200 - y, W.lantai, undefined, { rx: 0, tebal: 0, z: -3 })];
}

/** Lampion berderet: `${id}${i}` dan cahaya `${id}${i}g` di belakangnya. */
export function lampion(id: string, xs: number[], y: number, u = 20): Obj[] {
  return xs.flatMap((x, i) => [bulat(`${id}${i}g`, x, bulatkan(y - u * 0.3), bulatkan(u * 0.7), W.sorot, undefined, { tebal: 0, op: 0.6, z: -1 }), emo(`${id}${i}`, x, y, E.lampion, u, { z: 1 })]);
}
export const idLampion = (id: string, n: number): string[] => Array.from({ length: n }, (_, i) => [`${id}${i}g`, `${id}${i}`]).flat();

/** Stan pasar: atap bergaris merah-putih `${id}-at`, badan `${id}-bd`. Pojok kiri-atas (x, y), lebar w, tinggi h. */
export function stan(id: string, x: number, y: number, w = 120, h = 60): Obj[] {
  return [
    kotak(`${id}-at`, x - 4, y, w + 8, 14, W.merah, "#7F1D1D", { rx: 2, tebal: 1.4, z: 2 }),
    kotak(`${id}-bd`, x, y + 14, w, h - 14, W.krem, W.coklat, { rx: 2, tebal: 1.6, z: 0 }),
  ];
}
export const idStan = (id: string): string[] => [`${id}-at`, `${id}-bd`];

/** Gerobak: badan `${id}-bd`, roda `${id}-r1` dan `${id}-r2`. Pojok kiri-atas (x, y). */
export function gerobak(id: string, x: number, y: number, w = 90): Obj[] {
  return [
    kotak(`${id}-bd`, x, y, w, 34, "#FCA5A5", "#7F1D1D", { rx: 4, tebal: 1.6, z: 0 }),
    bulat(`${id}-r1`, bulatkan(x + 16), y + 40, 7, "#475569", "#0F172A", { tebal: 1.4, z: 1 }),
    bulat(`${id}-r2`, bulatkan(x + w - 16), y + 40, 7, "#475569", "#0F172A", { tebal: 1.4, z: 1 }),
  ];
}
export const idGerobak = (id: string): string[] => [`${id}-bd`, `${id}-r1`, `${id}-r2`];

/* ------------------------------ Kepingan bilangan ------------------------------ */
/** Kepingan bilangan: kotak `${id}-k` dan angka `${id}-t`. */
export function keping(id: string, x: number, y: number, w: number, h: number, isi: string, warna: string = W.putih, u = 11, o: Opsi = {}): Obj[] {
  return [kotak(`${id}-k`, x, y, w, h, warna, W.coklat, { rx: 3, tebal: 1.2, ...o }), teks(`${id}-t`, bulatkan(x + w / 2), bulatkan(y + h / 2 + u * 0.35), isi, u, W.biru, { z: 3 })];
}
export const idKeping = (id: string): string[] => [`${id}-k`, `${id}-t`];
/** Deret kepingan: `${id}${i}` dari bilangan-bilangan `daftar`, mulai di (x0, y) berjarak dx. */
export function deret(id: string, daftar: (number | string)[], x0: number, y: number, dx: number, w = 28, h = 22, warna: string = W.putih, u = 11): Obj[] {
  return daftar.flatMap((n, i) => keping(`${id}${i}`, bulatkan(x0 + i * dx), y, w, h, String(n), warna, u));
}
export const idDeret = (id: string, n: number): string[] => Array.from({ length: n }, (_, i) => idKeping(`${id}${i}`)).flat();

/* ------------------------------ Tabel bilangan satu sampai lima puluh ------------------------------ */
export type GTabel = { x: number; y: number; w: number; h: number; kolom: number; u: number };
export const GT: GTabel = { x: 20, y: 30, w: 26, h: 20, kolom: 10, u: 9.5 };
/** Sel ke-n (mulai satu): pojok kiri-atas. */
export const letakSel = (n: number, g: GTabel = GT): { x: number; y: number } => ({ x: g.x + ((n - 1) % g.kolom) * g.w, y: g.y + Math.floor((n - 1) / g.kolom) * g.h });
/** Tabel bilangan satu sampai `sampai`: sel `${id}-c{n}` dan angka `${id}-t{n}`. */
export function tabelBil(id: string, sampai = 50, g: GTabel = GT): Obj[] {
  return Array.from({ length: sampai }, (_, i) => i + 1).flatMap((n) => {
    const { x, y } = letakSel(n, g);
    return [kotak(`${id}-c${n}`, x, y, g.w, g.h, W.putih, W.coklat, { rx: 2, tebal: 1 }), teks(`${id}-t${n}`, bulatkan(x + g.w / 2), bulatkan(y + g.h * 0.72), String(n), g.u, W.biru, { z: 3 })];
  });
}
export const idTabel = (id: string, sampai = 50): string[] => Array.from({ length: sampai }, (_, i) => i + 1).flatMap((n) => [`${id}-c${n}`, `${id}-t${n}`]);
/** Sel-sel kelipatan b sampai `sampai`, urut. */
export const kelipatanSel = (b: number, sampai = 50): number[] => Array.from({ length: Math.floor(sampai / b) }, (_, i) => (i + 1) * b);
export const idSel = (id: string, ...ns: number[]): string[] => ns.map((n) => `${id}-c${n}`);

/** Kisi kecil tanpa angka (seratus kotak) untuk gambaran tabel satu sampai seratus: sel `${id}-m{n}`. */
export function kisiMini(id: string, x0: number, y0: number, w = 22, h = 12): Obj[] {
  return Array.from({ length: 100 }, (_, i) => i + 1).map((n) => kotak(`${id}-m${n}`, bulatkan(x0 + ((n - 1) % 10) * w), bulatkan(y0 + Math.floor((n - 1) / 10) * h), w, h, W.putih, W.coklat, { rx: 1, tebal: 0.7 }));
}
export const idKisi = (id: string, ...ns: number[]): string[] => ns.map((n) => `${id}-m${n}`);

/* ------------------------------ Garis lompat ------------------------------ */
/** Busur lompatan dari x1 ke x2 pada garis tinggi y: `${id}`. */
export function busur(id: string, x1: number, x2: number, y: number, warna: string = W.merah, tinggi = 26): Obj {
  const dx = bulatkan(x2 - x1);
  return { id, t: "jalur", x: x1, y, d: `M0 0 Q${bulatkan(dx / 2)} ${-tinggi} ${dx} 0`, garis: warna, tebal: 2, z: 1 };
}

/* ------------------------------ Tokoh ------------------------------ */
export type NamaTokoh = "Bima" | "Citra" | "Fajar" | "Pak Arif" | "Bu Marni" | "Pak Tarno";

/**
 * Tokoh berdiri: wajah `${id}`, nama `${id}-n` (diturunkan supaya tidak menempel dagu). Bima berkaus hijau `${id}-bj` dan membawa papan jepit `${id}-pj`;
 * Citra berkucir dua `${id}-k1` `${id}-k2`; Fajar bertopi suporter `${id}-tp`; Pak Arif berompi oranye `${id}-bj` dan membawa pengeras suara kecil `${id}-pn`;
 * Bu Marni berselendang ungu `${id}-bj` dan membawa tangga kecil `${id}-tg`; Pak Tarno berikat kepala merah `${id}-ik` dan berbaju abu `${id}-bj`. Tanpa ZWJ.
 */
export function tokoh(id: string, x: number, y0: number, nama: NamaTokoh, u = 30, warnaNama: string = W.hijauTua): Obj[] {
  /* Baris tokoh standar (184) dinaikkan 10 supaya nama tokoh tidak menimpa tepi bawah kanvas. */
  const y = y0 === 184 ? 174 : y0;
  const wajah = nama === "Bima" ? E.bima : nama === "Citra" ? E.citra : nama === "Fajar" ? E.fajar : nama === "Bu Marni" ? E.bu : E.pak;
  const out: Obj[] = [emo(id, x, y, wajah, u, { z: 1 })];
  const baju = (warna: string, garisW: string, tinggi = 9): Obj => kotak(`${id}-bj`, x - 11, bulatkan(y + 2), 22, tinggi, warna, garisW, { rx: 3, tebal: 1.2, z: 0 });
  if (nama === "Bima") {
    out.push(baju("#16A34A", "#14532D"));
    out.push(kotak(`${id}-pj`, x + 12, bulatkan(y + 1), 9, 12, "#B7814A", "#6B4423", { rx: 1, tebal: 0.9, z: 2 }));
  }
  if (nama === "Citra") {
    out.push(bulat(`${id}-k1`, x - 14, bulatkan(y - u * 0.3), 2.8, "#292524", "#0C0A09", { tebal: 0.8, z: 2 }));
    out.push(bulat(`${id}-k2`, x + 14, bulatkan(y - u * 0.3), 2.8, "#292524", "#0C0A09", { tebal: 0.8, z: 2 }));
  }
  if (nama === "Fajar") out.push(kotak(`${id}-tp`, x - 9, bulatkan(y - u * 0.78), 18, 6, "#DC2626", "#7F1D1D", { rx: 2, tebal: 1, z: 2 }));
  if (nama === "Pak Arif") {
    out.push(baju("#EA580C", "#7C2D12", 12));
    out.push(kotak(`${id}-pn`, x + 12, bulatkan(y + 3), 9, 6, "#CBD5E1", "#475569", { rx: 1, tebal: 0.9, z: 2 }));
  }
  if (nama === "Bu Marni") {
    out.push(baju("#7C3AED", "#4C1D95", 12));
    out.push(kotak(`${id}-tg`, x + 14, bulatkan(y - 6), 7, 18, "#B7814A", "#6B4423", { rx: 1, tebal: 0.9, z: 2 }));
  }
  if (nama === "Pak Tarno") {
    out.push(baju("#94A3B8", "#475569", 12));
    out.push(kotak(`${id}-ik`, x - 9, bulatkan(y - u * 0.78), 18, 5, "#DC2626", "#7F1D1D", { rx: 2, tebal: 1, z: 2 }));
  }
  const dewasa = nama === "Pak Arif" || nama === "Bu Marni" || nama === "Pak Tarno";
  out.push(teks(`${id}-n`, x, bulatkan(y + 4 + (dewasa ? 18 : 15)), nama, 8.4, warnaNama, { z: 3 }));
  return out;
}
export const idTokoh = (id: string, nama: NamaTokoh): string[] => [
  id,
  `${id}-n`,
  ...(nama === "Bima" ? [`${id}-bj`, `${id}-pj`] : []),
  ...(nama === "Citra" ? [`${id}-k1`, `${id}-k2`] : []),
  ...(nama === "Fajar" ? [`${id}-tp`] : []),
  ...(nama === "Pak Arif" ? [`${id}-bj`, `${id}-pn`] : []),
  ...(nama === "Bu Marni" ? [`${id}-bj`, `${id}-tg`] : []),
  ...(nama === "Pak Tarno" ? [`${id}-bj`, `${id}-ik`] : []),
];
