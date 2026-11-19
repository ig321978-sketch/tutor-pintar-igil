import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 3 Bab 2 Sub-Bab B "Botol Air Pak Darto" (kalimat Matematika pengurangan), akhir cerita Perkemahan Akhir Pekan.
 * Berkas ini TIDAK dipakai bab atau sub-bab lain.
 *
 * Rupa pos jaga hutan: tanah dan pohon pinus, pos jaga kayu beratap dengan menara pandang kecil, rak kayu berisi botol air, kaleng biskuit, kertas catatan,
 * bagan batang (bilangan awal di atas, dua bagian di bawah), garis bilangan dengan busur lompatan, keluarga fakta (segitiga), api unggun dan bintang.
 * Tokoh: Raka (kaus merah), Salsa (berkepang dua, berkertas catatan), Bima (kaus hijau), Pak Joko (berkaus biru, bertopi pembina, berkumis, berpensil di telinga),
 * Pak Darto (penjaga hutan: topi rimba cokelat, janggut abu-abu, rompi hijau, berteropong), Kak Rina (topi hijau tua, berpeluit). Tanpa ZWJ, emoji paling tinggi U+1FA95.
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
  oranye: "#F97316",
  /** Warna bagan: bilangan awal biru, bagian pertama merah, bagian kedua hijau. */
  awal: "#2563EB",
  bagA: "#DC2626",
  bagB: "#16A34A",
};

export const E = {
  raka: "\u{1F466}",
  salsa: "\u{1F467}",
  bima: "\u{1F9D2}",
  pak: "\u{1F468}",
  bu: "\u{1F469}",
  senyum: "\u{1F60A}",
  tertawa: "\u{1F604}",
  pikir: "\u{1F914}",
  kaget: "\u{1F632}",
  gerutu: "\u{1F624}",
  tanya: "\u{2753}",
  benar: "\u{2705}",
  salah: "\u{274C}",
  lambai: "\u{1F44B}",
  seru: "\u{2757}",
  catat: "\u{1F4DD}",
  teropong: "\u{1F52D}",
  api: "\u{1F525}",
  bintang: "\u{2B50}",
  bulan: "\u{1F319}",
  tenda: "\u{26FA}",
  ransel: "\u{1F392}",
  musik: "\u{1F3B6}",
  sorak: "\u{1F389}",
  percik: "\u{2728}",
  jempol: "\u{1F44D}",
  mata: "\u{1F440}",
  pensil: "\u{270F}",
  biskuit: "\u{1F36A}",
  botol: "\u{1F37C}",
  mikir: "\u{1F4AD}",
} as const;

type Opsi = Partial<Obj>;
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
/** Busur lompatan dari (x1, y) ke (x2, y) setinggi h (lintasan lengkung, tergambar bertahap). */
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
  gambar: true,
});
/** Judul adegan di tengah atas. */
export const judul = (isi: string, warna: string = W.ungu): Obj => teks("jud", 150, 18, isi, 11, warna);

/** Kartu berwarna dengan satu sampai tiga baris teks, pojok kiri-atas (x, y): `${id}-k`, `${id}-t{i}`. */
export function kartu(id: string, x: number, y: number, w: number, h: number, warna: string, baris: string[], u = 9, o: Opsi = {}): Obj[] {
  const mulai = y + h / 2 - ((baris.length - 1) * (u + 3)) / 2 + u * 0.35;
  return [kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 8, ...o }), ...baris.map((b, i) => teks(`${id}-t${i}`, x + w / 2, mulai + i * (u + 3), b, u, W.biru, o))];
}
/** Patch posisi (dan ujung garis) semua benda, untuk ubah. */
export const pindah = (objs: Obj[]): (Partial<Obj> & { id: string })[] => objs.map((o) => ({ id: o.id, x: o.x, y: o.y, ...(o.x2 === undefined ? {} : { x2: o.x2 }), ...(o.y2 === undefined ? {} : { y2: o.y2 }) }));
export const idDari = (objs: Obj[]): string[] => objs.map((o) => o.id);

/* ------------------------------ Pos jaga hutan ------------------------------ */
export const WH = {
  tanah: "#BBF7D0",
  tanahGaris: "#4ADE80",
  kayu: "#B7814A",
  kayuTua: "#6B4423",
  atap: "#7F1D1D",
  pinus: "#15803D",
  pinusTua: "#14532D",
  batang: "#78350F",
  botol: "#7DD3FC",
  botolTua: "#0369A1",
  tutup: "#16A34A",
  kaleng: "#F59E0B",
  kalengTua: "#92400E",
  batu: "#94A3B8",
  batuTua: "#475569",
  malam: "#1E1B4B",
} as const;

/** Tanah hijau `${id}` dari tinggi y sampai bawah kanvas, dua garis rumput `${id}-g1`, `${id}-g2`. */
export function tanah(id: string, y = 150): Obj[] {
  return [kotak(id, 2, y, 296, 200 - y, WH.tanah, undefined, { rx: 0, tebal: 0, z: -3 }), garis(`${id}-g1`, 4, y + 14, 292, 0, WH.tanahGaris, 1.4, { z: -2 }), garis(`${id}-g2`, 4, y + 32, 292, 0, WH.tanahGaris, 1.4, { z: -2 })];
}
export const idTanah = (id: string): string[] => [id, `${id}-g1`, `${id}-g2`];
/** Tanah malam hijau tua (untuk adegan api unggun), id sama dengan tanah(). */
export function tanahMalam(id: string, y = 150): Obj[] {
  return [kotak(id, 2, y, 296, 200 - y, "#14532D", undefined, { rx: 0, tebal: 0, z: -3 }), garis(`${id}-g1`, 4, y + 14, 292, 0, "#166534", 1.4, { z: -2 }), garis(`${id}-g2`, 4, y + 32, 292, 0, "#166534", 1.4, { z: -2 })];
}

/** Pohon pinus: batang `${id}-b`, dua lapis daun `${id}-d1` `${id}-d2`. Pojok kiri-atas kanopi (x, y), lebar w, tinggi total h. */
export function pinus(id: string, x: number, y: number, w = 30, h = 64): Obj[] {
  const t = h * 0.42;
  return [
    kotak(`${id}-b`, bulatkan(x + w / 2 - 3), bulatkan(y + h * 0.72), 6, bulatkan(h * 0.28), WH.batang, WH.batang, { rx: 0, tebal: 0.8, z: 0 }),
    poligon(`${id}-d1`, [[bulatkan(x + w / 2), y], [bulatkan(x + w * 0.9), bulatkan(y + t)], [bulatkan(x + w * 0.1), bulatkan(y + t)]], WH.pinus, WH.pinusTua, { z: 1, tebal: 1.2 }),
    poligon(`${id}-d2`, [[bulatkan(x + w / 2), bulatkan(y + t * 0.5)], [x + w, bulatkan(y + h * 0.78)], [x, bulatkan(y + h * 0.78)]], WH.pinus, WH.pinusTua, { z: 0.5, tebal: 1.2 }),
  ];
}
export const idPinus = (id: string): string[] => [`${id}-b`, `${id}-d1`, `${id}-d2`];

/** Pos jaga kayu: badan `${id}`, atap `${id}-a`, pintu `${id}-p`, jendela `${id}-j`, papan nama `${id}-n` (bertulisan `${id}-t`). Pojok kiri-atas badan (x, y), lebar w, tinggi h. */
export function pos(id: string, x: number, y: number, w = 84, h = 46): Obj[] {
  return [
    kotak(id, x, y, w, h, WH.kayu, WH.kayuTua, { rx: 1, tebal: 1.6, z: 0 }),
    poligon(`${id}-a`, [[x - 6, y], [bulatkan(x + w / 2), y - 22], [x + w + 6, y]], WH.atap, "#450A0A", { z: 1, tebal: 1.6 }),
    kotak(`${id}-p`, bulatkan(x + w - 24), bulatkan(y + h - 26), 16, 26, "#8B5A2B", WH.kayuTua, { rx: 1, tebal: 1.2, z: 1 }),
    kotak(`${id}-j`, bulatkan(x + 10), bulatkan(y + 12), 16, 14, W.langit, WH.kayuTua, { rx: 1, tebal: 1.2, z: 1 }),
    kotak(`${id}-n`, bulatkan(x + w / 2 - 20), bulatkan(y - 12), 40, 10, W.krem, WH.kayuTua, { rx: 2, tebal: 1, z: 2 }),
    teks(`${id}-t`, bulatkan(x + w / 2), bulatkan(y - 4.4), "POS JAGA", 6.6, W.hijauTua, { z: 3 }),
  ];
}
export const idPos = (id: string): string[] => [id, `${id}-a`, `${id}-p`, `${id}-j`, `${id}-n`, `${id}-t`];

/** Menara pandang kecil: dua kaki `${id}-l` `${id}-r`, dek `${id}-d`, pagar `${id}-g`. Pojok kiri-atas dek (x, y), lebar w, tinggi kaki k. */
export function menara(id: string, x: number, y: number, w = 22, k = 40): Obj[] {
  return [
    kotak(`${id}-l`, bulatkan(x + 2), y + 4, 3, k, WH.kayu, WH.kayuTua, { rx: 0, tebal: 0.8, z: 0 }),
    kotak(`${id}-r`, bulatkan(x + w - 5), y + 4, 3, k, WH.kayu, WH.kayuTua, { rx: 0, tebal: 0.8, z: 0 }),
    kotak(`${id}-d`, x, y, w, 5, WH.kayu, WH.kayuTua, { rx: 1, tebal: 1.2, z: 1 }),
    kotak(`${id}-g`, bulatkan(x + 1), y - 9, bulatkan(w - 2), 9, undefined, WH.kayuTua, { rx: 0, tebal: 1, z: 1 }),
  ];
}
export const idMenara = (id: string): string[] => [`${id}-l`, `${id}-r`, `${id}-d`, `${id}-g`];

/** Rak kayu `${id}` selebar w dengan satu papan; pojok kiri-atas papan (x, y), dua kaki `${id}-l` `${id}-r` sepanjang `kaki`. */
export function rak(id: string, x: number, y: number, w = 70, kaki = 30): Obj[] {
  return [
    kotak(id, x, y, w, 5, WH.kayu, WH.kayuTua, { rx: 1, tebal: 1.4, z: 1 }),
    kotak(`${id}-l`, bulatkan(x + 3), y + 5, 4, kaki, WH.kayu, WH.kayuTua, { rx: 0, tebal: 1, z: 0 }),
    kotak(`${id}-r`, bulatkan(x + w - 7), y + 5, 4, kaki, WH.kayu, WH.kayuTua, { rx: 0, tebal: 1, z: 0 }),
  ];
}
export const idRak = (id: string): string[] => [id, `${id}-l`, `${id}-r`];

/** Satu botol air: badan `${id}`, tutup `${id}-t`. Pojok kiri-atas badan (x, y), tinggi h. */
export function botol(id: string, x: number, y: number, h = 12, warna: string = WH.botol): Obj[] {
  return [kotak(id, x, y, 6, h, warna, WH.botolTua, { rx: 2, tebal: 1, z: 2 }), kotak(`${id}-t`, bulatkan(x + 1.2), bulatkan(y - 3), 3.6, 3.4, WH.tutup, W.hijauTua, { rx: 1, tebal: 0.7, z: 3 })];
}
export const idBotol = (id: string): string[] => [id, `${id}-t`];
/** Deret botol `n` buah (id `${id}0`...), pojok kiri-atas yang pertama (x, y), jarak g. */
export const deretBotol = (id: string, x: number, y: number, n: number, g = 9, h = 12, warna: string = WH.botol): Obj[] => Array.from({ length: n }, (_, i) => botol(`${id}${i}`, bulatkan(x + i * g), y, h, warna)).flat();
export const idDeretBotol = (id: string, n: number): string[] => Array.from({ length: n }, (_, i) => idBotol(`${id}${i}`)).flat();

/** Kaleng biskuit bundar: badan `${id}`, tutup `${id}-t`, label `${id}-l` (bertulisan `${id}-x` bila ada). Pojok kiri-atas (x, y). */
export function kaleng(id: string, x: number, y: number, w = 40, h = 34, tulisan?: string): Obj[] {
  const out: Obj[] = [
    kotak(id, x, y, w, h, WH.kaleng, WH.kalengTua, { rx: 4, tebal: 1.6, z: 1 }),
    kotak(`${id}-t`, bulatkan(x - 2), bulatkan(y - 5), w + 4, 6, "#FCD34D", WH.kalengTua, { rx: 3, tebal: 1.4, z: 2 }),
    kotak(`${id}-l`, bulatkan(x + 4), bulatkan(y + h * 0.3), w - 8, bulatkan(h * 0.5), W.krem, WH.kalengTua, { rx: 2, tebal: 0.9, z: 2 }),
  ];
  if (tulisan) out.push(teks(`${id}-x`, bulatkan(x + w / 2), bulatkan(y + h * 0.62), tulisan, 9.6, W.merah, { z: 3 }));
  return out;
}
export const idKaleng = (id: string, tulisan = false): string[] => [id, `${id}-t`, `${id}-l`, ...(tulisan ? [`${id}-x`] : [])];

/** Kertas catatan putih bergaris: `${id}`; tulisan memakai teks terpisah. Pojok kiri-atas (x, y). */
export const kertas = (id: string, x: number, y: number, w: number, h: number, warna: string = W.putih): Obj => kotak(id, x, y, w, h, warna, "#94A3B8", { rx: 2, tebal: 1, z: 0 });

/** Ransel: badan `${id}`, kantong `${id}-k`, tali `${id}-t`. Pojok kiri-atas (x, y). */
export function ransel(id: string, x: number, y: number, w = 18, h = 22, warna = "#2563EB"): Obj[] {
  return [
    kotak(id, x, y, w, h, warna, "#1E3A8A", { rx: 5, tebal: 1.3, z: 1 }),
    kotak(`${id}-k`, bulatkan(x + 3), bulatkan(y + h * 0.5), bulatkan(w - 6), bulatkan(h * 0.38), "#60A5FA", "#1E3A8A", { rx: 2, tebal: 1, z: 2 }),
    garis(`${id}-t`, bulatkan(x + w * 0.3), y, 0, 5, "#1E3A8A", 1.6, { z: 2 }),
  ];
}
export const idRansel = (id: string): string[] => [id, `${id}-k`, `${id}-t`];

/** Lingkaran batu api unggun: `${id}-b0`..`${id}-b6` mengelilingi pusat (x, y) berjari-jari rx, ry. */
export function batuApi(id: string, x: number, y: number, rx = 22, ry = 7): Obj[] {
  return Array.from({ length: 7 }, (_, i) => bulat(`${id}-b${i}`, bulatkan(x + rx * Math.cos((i / 7) * Math.PI * 2)), bulatkan(y + ry * Math.sin((i / 7) * Math.PI * 2)), 3.6, WH.batu, WH.batuTua, { tebal: 1, z: 1 }));
}
export const idBatuApi = (id: string): string[] => Array.from({ length: 7 }, (_, i) => `${id}-b${i}`);

/* ------------------------------ Bagan dan garis bilangan ------------------------------ */
/** Satu batang bagan berlabel: kotak `${id}` dan tulisan `${id}-t`. Pojok kiri-atas (x, y). */
export function batangBagan(id: string, x: number, y: number, w: number, h: number, warna: string, label: string, u = 11, o: Opsi = {}): Obj[] {
  return [kotak(id, x, y, w, h, warna, W.biru, { rx: 4, tebal: 1.6, ...o }), teks(`${id}-t`, bulatkan(x + w / 2), bulatkan(y + h / 2 + u * 0.36), label, u, W.putih, { z: 2, ...o })];
}
export const idBatang = (id: string): string[] => [id, `${id}-t`];

/**
 * Garis bilangan `${id}-g` dari bilangan `dari` sampai `sampai`, tanda `${id}-t{n}` dan angka `${id}-l{n}` pada kelipatan langkah (atau hanya pada `tampil`).
 * x(n) = x0 + (n - dari) * satuan.
 */
export function garisBil(id: string, x0: number, y: number, satuan: number, dari: number, sampai: number, langkah: number, tampil: number[] = [], u = 8): Obj[] {
  const out: Obj[] = [garis(`${id}-g`, x0, y, bulatkan(satuan * (sampai - dari)), 0, W.biru, 2)];
  for (let n = dari; n <= sampai; n += langkah) {
    out.push(garis(`${id}-t${n}`, bulatkan(x0 + (n - dari) * satuan), y - 4, 0, 8, W.biru, 1.6));
    if (tampil.length === 0 || tampil.includes(n)) out.push(teks(`${id}-l${n}`, bulatkan(x0 + (n - dari) * satuan), y + 15, String(n), u, W.biru));
  }
  return out;
}
export const xGaris = (x0: number, satuan: number, dari: number, n: number): number => bulatkan(x0 + (n - dari) * satuan);

/**
 * Segitiga keluarga fakta: tiga garis `${id}-g1` `${id}-g2` `${id}-g3` dan tiga lingkaran `${id}-a` (puncak, jumlah, biru), `${id}-b` (kiri, bagian merah), `${id}-c` (kanan, bagian hijau).
 * Puncak di (cx, cy); dua sudut bawah di (cx -/+ lebar / 2, cy + tinggi). Isi lingkaran ditulis dengan teks terpisah di pusatnya.
 */
export function segitigaFakta(id: string, cx: number, cy: number, lebar: number, tinggi: number, r = 13): Obj[] {
  const kiri = bulatkan(cx - lebar / 2);
  const kanan = bulatkan(cx + lebar / 2);
  const bawah = bulatkan(cy + tinggi);
  return [
    garis(`${id}-g1`, cx, cy, bulatkan(kiri - cx), tinggi, W.biru, 2, { z: 0 }),
    garis(`${id}-g2`, cx, cy, bulatkan(kanan - cx), tinggi, W.biru, 2, { z: 0 }),
    garis(`${id}-g3`, kiri, bawah, bulatkan(kanan - kiri), 0, W.biru, 2, { z: 0 }),
    bulat(`${id}-a`, cx, cy, r, "#BFDBFE", W.awal, { tebal: 2, z: 1 }),
    bulat(`${id}-b`, kiri, bawah, r, "#FECACA", W.bagA, { tebal: 2, z: 1 }),
    bulat(`${id}-c`, kanan, bawah, r, "#BBF7D0", W.bagB, { tebal: 2, z: 1 }),
  ];
}
export const idSegitiga = (id: string): string[] => [`${id}-g1`, `${id}-g2`, `${id}-g3`, `${id}-a`, `${id}-b`, `${id}-c`];

/* ------------------------------ Tokoh ------------------------------ */
export type NamaTokoh = "Raka" | "Salsa" | "Bima" | "Pak Joko" | "Pak Darto" | "Kak Rina";

/**
 * Tokoh berdiri: wajah `${id}`, nama `${id}-n`. Raka berkaus merah `${id}-bj`; Salsa berkepang dua `${id}-k1` `${id}-k2` dan memegang kertas catatan `${id}-kc`;
 * Bima berkaus hijau `${id}-bj`; Pak Joko berkaus biru `${id}-bj`, bertopi pembina `${id}-tp`, berkumis `${id}-km`, berpensil di telinga `${id}-ps`;
 * Pak Darto berompi hijau `${id}-bj`, bertopi rimba cokelat `${id}-tp` `${id}-tb`, berjanggut abu-abu `${id}-jg`, berteropong `${id}-to`;
 * Kak Rina berkaus hijau tua `${id}-bj`, bertopi hijau tua `${id}-tp`, berpeluit `${id}-pl`. Tanpa ZWJ.
 */
export function tokoh(id: string, x: number, y0: number, nama: NamaTokoh, u = 30, warnaNama: string = W.ungu): Obj[] {
  /* Baris tokoh standar (184) dinaikkan 10 supaya nama tokoh tidak menimpa keterangan sumber di pojok kanan bawah. */
  const y = y0 === 184 ? 174 : y0;
  const wajah = nama === "Raka" ? E.raka : nama === "Salsa" ? E.salsa : nama === "Bima" ? E.bima : nama === "Kak Rina" ? E.bu : E.pak;
  const out: Obj[] = [emo(id, x, y, wajah, u, { z: 1 })];
  const baju = (warna: string, garisW: string, tinggi = 9): Obj => kotak(`${id}-bj`, x - 11, bulatkan(y + 2), 22, tinggi, warna, garisW, { rx: 3, tebal: 1.2, z: 0 });
  if (nama === "Raka") out.push(baju("#DC2626", "#7F1D1D"));
  if (nama === "Bima") out.push(baju("#16A34A", "#14532D"));
  if (nama === "Salsa") {
    out.push(bulat(`${id}-k1`, x - 13, bulatkan(y - u * 0.3), 2.8, "#292524", "#0C0A09", { tebal: 0.8, z: 2 }));
    out.push(bulat(`${id}-k2`, x + 13, bulatkan(y - u * 0.3), 2.8, "#292524", "#0C0A09", { tebal: 0.8, z: 2 }));
    out.push(kotak(`${id}-kc`, x + 12, bulatkan(y + 1), 9, 12, W.putih, "#94A3B8", { rx: 1, tebal: 0.9, z: 2 }));
  }
  if (nama === "Pak Joko") {
    out.push(baju("#2563EB", "#1E3A8A", 12));
    out.push(kotak(`${id}-tp`, x - 9, bulatkan(y - u * 0.98), 18, 6, "#1E3A8A", "#172554", { rx: 2, tebal: 1, z: 2 }));
    out.push(garis(`${id}-km`, x - 5, bulatkan(y - u * 0.12), 10, 0, "#1F2937", 1.8, { z: 2 }));
    out.push(garis(`${id}-ps`, x + 12, bulatkan(y - u * 0.6), 0, 8, "#F59E0B", 2, { z: 2 }));
  }
  if (nama === "Pak Darto") {
    out.push(baju("#15803D", "#14532D", 12));
    out.push(kotak(`${id}-tp`, x - 8, bulatkan(y - u * 1.02), 16, 7, "#92400E", "#451A03", { rx: 2, tebal: 1, z: 2 }));
    out.push(kotak(`${id}-tb`, x - 13, bulatkan(y - u * 0.82), 26, 3, "#92400E", "#451A03", { rx: 1, tebal: 0.8, z: 2 }));
    out.push(garis(`${id}-jg`, x - 6, bulatkan(y + u * 0.02), 12, 0, "#9CA3AF", 3, { z: 2 }));
    out.push(emo(`${id}-to`, x + 21, bulatkan(y + 2), E.teropong, 13, { z: 2 }));
  }
  if (nama === "Kak Rina") {
    out.push(baju("#166534", "#14532D", 10));
    out.push(kotak(`${id}-tp`, x - 9, bulatkan(y - u * 0.98), 18, 6, "#166534", "#14532D", { rx: 2, tebal: 1, z: 2 }));
    out.push(bulat(`${id}-pl`, x + 8, bulatkan(y + 9), 2.4, W.putih, "#475569", { tebal: 0.8, z: 2 }));
  }
  out.push(teks(`${id}-n`, x, bulatkan(y + (nama === "Pak Joko" || nama === "Pak Darto" ? 18 : 15)), nama, 8.4, warnaNama, { z: 3 }));
  return out;
}
export const idTokoh = (id: string, nama: NamaTokoh): string[] => [
  id,
  `${id}-n`,
  ...(nama === "Raka" || nama === "Bima" ? [`${id}-bj`] : []),
  ...(nama === "Salsa" ? [`${id}-k1`, `${id}-k2`, `${id}-kc`] : []),
  ...(nama === "Pak Joko" ? [`${id}-bj`, `${id}-tp`, `${id}-km`, `${id}-ps`] : []),
  ...(nama === "Pak Darto" ? [`${id}-bj`, `${id}-tp`, `${id}-tb`, `${id}-jg`, `${id}-to`] : []),
  ...(nama === "Kak Rina" ? [`${id}-bj`, `${id}-tp`, `${id}-pl`] : []),
];
/** Patch posisi semua bagian tokoh ke (x, y) baru, untuk ubah. */
export const pindahTokoh = (id: string, x: number, y: number, nama: NamaTokoh, u = 30): (Partial<Obj> & { id: string })[] => pindah(tokoh(id, x, y, nama, u));
