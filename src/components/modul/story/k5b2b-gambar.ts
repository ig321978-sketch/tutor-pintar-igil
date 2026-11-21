import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 5 Bab 2 Sub-Bab B "Dua Lonceng Pak Tarno" (daftar kelipatan, kelipatan persekutuan, KPK, jadwal berulang, KPK tiga bilangan),
 * cerita Pasar Kuliner Malam. Berkas ini TIDAK dipakai bab atau sub-bab lain.
 *
 * Rupa: halaman pasar malam (lantai krem, papan krem), deret kelipatan yang digambar SUNGGUH dari bilangannya (kotak berisi angka, kelipatan persekutuan dilingkari),
 * jalur waktu yang titiknya diletakkan sebanding dengan waktunya, dan gerobak bakso Pak Tarno.
 * Data Story: lonceng wedang Bu Marni tiap 4 menit, lonceng bakso Pak Tarno tiap 6 menit (bersama pada 12, 24, 36), belanja tiap 4 dan 6 hari (bertemu lagi 12 hari),
 * tiga lonceng tiap 4, 5, dan 6 menit (KPK 60). Tokoh: Bima (berkaus hijau, berpapan jepit), Citra (berkucir dua), Fajar (bertopi suporter), Pak Arif (berompi oranye),
 * Pak Tarno (berikat kepala merah), Bu Wati (bercaping). Tanpa ZWJ, emoji paling tinggi U+1FA95.
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
  lantai: "#FDE68A",
  lantaiGaris: "#F59E0B",
  papan: "#FFF7E6",
  kayu: "#B7814A",
  kayuTua: "#6B4423",
  sel: "#F1F5F9",
  hijauMuda: "#BBF7D0",
  merahMuda: "#FECACA",
  emasMuda: "#FDE68A",
  biruMuda: "#DBEAFE",
  jingga: "#FED7AA",
  tosca: "#99F6E4",
};

export const E = {
  bima: "\u{1F466}",
  citra: "\u{1F467}",
  fajar: "\u{1F9D2}",
  pak: "\u{1F468}",
  bu: "\u{1F469}",
  tanya: "\u{2753}",
  benar: "\u{2705}",
  salah: "\u{274C}",
  jempol: "\u{1F44D}",
  mata: "\u{1F440}",
  konfeti: "\u{1F389}",
  kilau: "\u{2728}",
  tertawa: "\u{1F602}",
  seru: "\u{2757}",
  lonceng: "\u{1F514}",
  bakso: "\u{1F372}",
  esteh: "\u{1F375}",
  sambal: "\u{1F336}\u{FE0F}",
  sendok: "\u{1F944}",
  senyum: "\u{1F604}",
  klepon: "\u{1F361}",
  jagung: "\u{1F33D}",
  cari: "\u{1F50D}",
  memo: "\u{1F4DD}",
  ulang: "\u{1F501}",
  stop: "\u{270B}",
  papan: "\u{1F4CB}",
  pasar: "\u{1F3EA}",
  lampion: "\u{1F3EE}",
} as const;

type Opsi = Partial<Obj>;
const bulatkan = (n: number): number => Math.round(n * 10) / 10;
const b2 = (n: number): number => Math.round(n * 100) / 100;

export const teks = (id: string, x: number, y: number, isi: string, u = 10, warna: string = W.biru, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi, u, warna, ...o });
export const kotak = (id: string, x: number, y: number, w: number, h: number, warna: string | undefined, garisW: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "kotak", x, y, w, h, warna, garis: garisW, rx: 3, tebal: 1.5, ...o });
export const bulat = (id: string, x: number, y: number, r: number, warna: string | undefined, garisW: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "bulat", x, y, r, warna, garis: garisW, tebal: 1.5, ...o });
export const garis = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "garis", x, y, x2, y2, warna, tebal, ...o });
export const panah = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "panah", x, y, x2, y2, warna, tebal, ...o });
export const emo = (id: string, x: number, y: number, e: string, u = 22, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi: e, u, warna: W.biru, ...o });
/** Judul adegan di tengah atas (paling banyak sekitar 27 huruf supaya tidak tertutup lencana n/10). */
export const judul = (isi: string, warna: string = W.ungu): Obj => teks("jud", 150, 18, isi, 11, warna);

/** Kartu berwarna dengan satu sampai tiga baris teks, pojok kiri-atas (x, y): `${id}-k`, `${id}-t{i}`. */
export function kartu(id: string, x: number, y: number, w: number, h: number, warna: string, baris: string[], u = 9, o: Opsi = {}): Obj[] {
  const mulai = y + h / 2 - ((baris.length - 1) * (u + 3)) / 2 + u * 0.35;
  return [kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 8, ...o }), ...baris.map((b, i) => teks(`${id}-t${i}`, x + w / 2, mulai + i * (u + 3), b, u, W.biru, o))];
}
export const idKartu = (id: string, n = 1): string[] => [`${id}-k`, ...Array.from({ length: n }, (_, i) => `${id}-t${i}`)];

/* ------------------------------ Latar pasar malam ------------------------------ */
/** Lantai pasar `${id}` dari tinggi y sampai bawah kanvas, dua garis `${id}-g1`, `${id}-g2`. */
export function lantai(id: string, y = 150): Obj[] {
  return [kotak(id, 2, y, 296, 200 - y, W.lantai, undefined, { rx: 0, tebal: 0, z: -3 }), garis(`${id}-g1`, 4, y + 14, 292, 0, W.lantaiGaris, 1.2, { z: -2 }), garis(`${id}-g2`, 4, y + 32, 292, 0, W.lantaiGaris, 1.2, { z: -2 })];
}
export const idLantai = (id: string): string[] => [id, `${id}-g1`, `${id}-g2`];
/** Papan krem `${id}` (pojok kiri-atas x, y). */
export const papan = (id: string, x: number, y: number, w: number, h: number): Obj => kotak(id, x, y, w, h, W.papan, W.coklat, { rx: 4, tebal: 1.8, z: -1 });

/* ------------------------------ Bilangan ------------------------------ */
/** Bilangan dengan titik pemisah ribuan: 1800 menjadi "1.800". */
export const rb = (n: number): string => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
/** Kelipatan a dari a sampai batas (a, 2a, ..., paling besar tidak melebihi batas). Nol bukan kelipatan. */
export const kelipatan = (a: number, sampai: number): number[] => Array.from({ length: Math.floor(sampai / a) }, (_, i) => (i + 1) * a);
/** Data Story: jarak ulang tiap lonceng. */
export const WEDANG = 4;
export const BAKSO = 6;
export const JAGUNG = 5;
export const BERSAMA_DUA = [12, 24, 36] as const;
export const KPK_DUA = 12;
export const KPK_TIGA = 60;

/* ------------------------------ Deret kelipatan (kotak berisi angka) ------------------------------ */
export type OpsiDeret = { cw: number; gap: number; tinggi: number; u: number };
export const DERET: OpsiDeret = { cw: 30, gap: 4, tinggi: 16, u: 9 };
/** Deret kotak berisi angka mulai x0, tinggi y: kotak `${id}-c{i}` dan angka `${id}-t{i}`. */
export function deret(id: string, x0: number, y: number, daftar: number[], warna: string, o: OpsiDeret = DERET): Obj[] {
  return daftar.flatMap((n, i) => {
    const x = b2(x0 + i * (o.cw + o.gap));
    return [kotak(`${id}-c${i}`, x, y, o.cw, o.tinggi, warna, W.biru, { rx: 3, tebal: 1.2, z: 1 }), teks(`${id}-t${i}`, b2(x + o.cw / 2), b2(y + o.tinggi * 0.72), String(n), o.u, W.biru, { z: 3 })];
  });
}
export const idDeret = (id: string, n: number, dari = 0): string[] => Array.from({ length: n }, (_, q) => [`${id}-c${dari + q}`, `${id}-t${dari + q}`]).flat();
/** Pusat kotak ke-i pada deret. */
export const xDeret = (x0: number, i: number, o: OpsiDeret = DERET): number => b2(x0 + i * (o.cw + o.gap) + o.cw / 2);
/** Lingkaran merah mengelilingi kotak ke-i pada deret (kelipatan persekutuan): `${id}`. */
export const cincin = (id: string, x0: number, y: number, i: number, o: OpsiDeret = DERET): Obj => bulat(id, xDeret(x0, i, o), b2(y + o.tinggi / 2), 12, undefined, W.merah, { tebal: 2.2, z: 5 });
/** Label baris deret (rata kiri) tepat di atas kotak-kotaknya. */
export const labelDeret = (id: string, x0: number, y: number, isi: string, warna: string = W.hijauTua): Obj => teks(id, x0, b2(y - 4), isi, 9, warna, { anchor: "start", z: 3 });

/* ------------------------------ Jalur waktu ------------------------------ */
export type OpsiJalur = { x0: number; x1: number; sampai: number; y: number };
/** Jalur waktu Story: nol sampai tiga puluh enam pada lebar 252. */
export const JALUR: OpsiJalur = { x0: 20, x1: 272, sampai: 36, y: 104 };
/** Jalur tiga lonceng: nol sampai enam puluh. */
export const JALUR_TIGA: OpsiJalur = { x0: 20, x1: 272, sampai: 60, y: 104 };
/** Titik x untuk waktu t pada jalur o. */
export const xJalur = (o: OpsiJalur, t: number): number => b2(o.x0 + (t * (o.x1 - o.x0)) / o.sampai);
/** Garis sumbu `${id}-ax`. */
export const sumbu = (id: string, o: OpsiJalur): Obj => garis(`${id}-ax`, o.x0 - 6, o.y, o.x1 - o.x0 + 12, 0, W.biru, 2.2, { z: 3 });
/** Penanda waktu t: garis tegak `${id}-t` dan angka `${id}-l` di bawah garis. */
export const penanda = (id: string, o: OpsiJalur, t: number, warna: string = W.biru): Obj[] => [
  garis(`${id}-t`, xJalur(o, t), o.y - 6, 0, 12, warna, 1.8, { z: 3 }),
  teks(`${id}-l`, xJalur(o, t), o.y + 19, String(t), 9, warna, { z: 3 }),
];
export const idPenanda = (id: string): string[] => [`${id}-t`, `${id}-l`];
/** Lonceng (emoji) pada jalur di waktu t, di atas garis: `${id}`. */
export const loncengJalur = (id: string, o: OpsiJalur, t: number, naik = 10, u = 16): Obj => emo(id, xJalur(o, t), o.y - naik, E.lonceng, u, { z: 4 });

/* ------------------------------ Gerobak bakso Pak Tarno ------------------------------ */
/** Gerobak kaca (x, y pojok kiri-atas badan, lebar 92, tinggi 44): badan `${id}-k`, atap `${id}-at`, roda `${id}-r1` `${id}-r2`, bakso `${id}-e`, label `${id}-l`. */
export function gerobak(id: string, x: number, y: number): Obj[] {
  return [
    kotak(`${id}-k`, x, y, 92, 44, "#E0F2FE", W.biru, { rx: 4, tebal: 1.6, z: 1 }),
    kotak(`${id}-at`, b2(x - 4), b2(y - 8), 100, 8, W.merah, "#7F1D1D", { rx: 2, tebal: 1.2, z: 1 }),
    bulat(`${id}-r1`, b2(x + 14), b2(y + 50), 6, "#475569", "#1E293B", { z: 2 }),
    bulat(`${id}-r2`, b2(x + 78), b2(y + 50), 6, "#475569", "#1E293B", { z: 2 }),
    emo(`${id}-e`, b2(x + 46), b2(y + 32), E.bakso, 22, { z: 3 }),
    teks(`${id}-l`, b2(x + 46), b2(y + 13), "bakso", 8.4, W.hijauTua, { z: 3 }),
  ];
}
export const idGerobak = (id: string): string[] => [`${id}-k`, `${id}-at`, `${id}-r1`, `${id}-r2`, `${id}-e`, `${id}-l`];

/* ------------------------------ Tokoh ------------------------------ */
export type NamaTokoh = "Bima" | "Citra" | "Fajar" | "Pak Arif" | "Pak Tarno" | "Bu Wati";

/**
 * Tokoh berdiri: wajah `${id}`, nama `${id}-n`. Bima berkaus hijau `${id}-bj` dan berpapan jepit `${id}-pj`; Citra berkucir dua `${id}-k1` `${id}-k2` dan berkaus merah muda `${id}-bj`;
 * Fajar bertopi suporter `${id}-tp` dan berkaus kuning `${id}-bj`; Pak Arif berompi oranye `${id}-bj` dan berpengeras suara kecil `${id}-pk`;
 * Pak Tarno berikat kepala merah `${id}-ik` dan berkaus putih `${id}-bj`; Bu Wati bercaping `${id}-cp` dan berbaju merah muda tua `${id}-bj`. Tanpa ZWJ.
 */
export function tokoh(id: string, x: number, y0: number, nama: NamaTokoh, u = 30): Obj[] {
  /* Baris tokoh standar (184) dinaikkan 10 supaya nama tokoh tidak menimpa keterangan sumber di pojok kanan bawah. */
  const y = y0 === 184 ? 174 : y0;
  const wajah = nama === "Bima" ? E.bima : nama === "Citra" ? E.citra : nama === "Fajar" ? E.fajar : nama === "Bu Wati" ? E.bu : E.pak;
  const out: Obj[] = [emo(id, x, y, wajah, u, { z: 1 })];
  const baju = (warna: string, garisW: string, tinggi = 9): Obj => kotak(`${id}-bj`, x - 11, bulatkan(y + 2), 22, tinggi, warna, garisW, { rx: 3, tebal: 1.2, z: 0 });
  if (nama === "Bima") {
    out.push(baju("#16A34A", "#14532D"));
    out.push(kotak(`${id}-pj`, x + 12, bulatkan(y + 1), 9, 12, W.kayu, W.kayuTua, { rx: 1, tebal: 0.9, z: 2 }));
  }
  if (nama === "Citra") {
    out.push(baju("#F9A8D4", "#9D174D"));
    out.push(bulat(`${id}-k1`, x - 14, bulatkan(y - u * 0.3), 2.8, "#292524", "#0C0A09", { tebal: 0.8, z: 2 }));
    out.push(bulat(`${id}-k2`, x + 14, bulatkan(y - u * 0.3), 2.8, "#292524", "#0C0A09", { tebal: 0.8, z: 2 }));
  }
  if (nama === "Fajar") {
    out.push(baju("#FACC15", "#854D0E"));
    out.push(kotak(`${id}-tp`, x - 9, bulatkan(y - u * 0.8), 18, 6, W.merah, "#7F1D1D", { rx: 2, tebal: 1, z: 2 }));
  }
  if (nama === "Pak Arif") {
    out.push(baju("#F97316", "#9A3412", 12));
    out.push(kotak(`${id}-pk`, x + 12, bulatkan(y + 3), 9, 7, "#D1D5DB", "#4B5563", { rx: 1, tebal: 0.9, z: 2 }));
  }
  if (nama === "Pak Tarno") {
    out.push(baju("#F8FAFC", "#64748B", 12));
    out.push(kotak(`${id}-ik`, x - 9, bulatkan(y - u * 0.78), 18, 5, W.merah, "#7F1D1D", { rx: 2, tebal: 1, z: 2 }));
  }
  if (nama === "Bu Wati") {
    out.push(baju("#FB7185", "#9F1239", 12));
    out.push(kotak(`${id}-cp`, x - 12, bulatkan(y - u * 0.85), 24, 5, "#FDE68A", "#A16207", { rx: 2, tebal: 1, z: 2 }));
  }
  out.push(teks(`${id}-n`, x, bulatkan(y + 4 + (nama.startsWith("Pak") || nama.startsWith("Bu") ? 18 : 15)), nama, 8.4, W.hijauTua, { z: 3 }));
  return out;
}
export const idTokoh = (id: string, nama: NamaTokoh): string[] => [
  id,
  `${id}-n`,
  ...(nama === "Bima" ? [`${id}-bj`, `${id}-pj`] : []),
  ...(nama === "Citra" ? [`${id}-bj`, `${id}-k1`, `${id}-k2`] : []),
  ...(nama === "Fajar" ? [`${id}-bj`, `${id}-tp`] : []),
  ...(nama === "Pak Arif" ? [`${id}-bj`, `${id}-pk`] : []),
  ...(nama === "Pak Tarno" ? [`${id}-bj`, `${id}-ik`] : []),
  ...(nama === "Bu Wati" ? [`${id}-bj`, `${id}-cp`] : []),
];
