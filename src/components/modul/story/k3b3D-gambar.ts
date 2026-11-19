import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 3 Bab 3 Sub-Bab D "Bandul Dokter Hana" (hubungan kilogram, ons, dan gram), akhir cerita Kebun Binatang Mini.
 * Berkas ini TIDAK dipakai bab atau sub-bab lain.
 *
 * Rupa ruang pakan dan periksa dokter hewan: lantai keramik abu-abu biru, meja kayu, timbangan kodok tua (tiang, balok, dua piring bergantung) dengan lima bandul logam kuning bertulisan,
 * labu, karung pakan, keranjang wortel, kambing, tabel tempat angka, garis bilangan ganda, dan potongan seribu gram.
 * Tokoh: Raka (kaus merah), Salsa (berkepang dua, berkertas catatan), Bima (kaus hijau), Pak Joko (kaus biru, topi anyaman, berkumis, berpensil di telinga),
 * Kak Tari (berseragam cokelat, topi safari, berpeluit), Pak Wayan (berbaju cokelat tua, topi bambu, berpita kuning), Bu Lastri (berapron hijau),
 * Dokter Hana (berjas putih dan berstetoskop). Tanpa ZWJ, emoji paling tinggi U+1FA95.
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
  /** Warna hitungan: kilogram biru, gram hijau, sisa kuning tua. */
  kg: "#2563EB",
  gr: "#16A34A",
  sisa: "#B45309",
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
  lega: "\u{1F605}",
  tanya: "\u{2753}",
  benar: "\u{2705}",
  salah: "\u{274C}",
  lambai: "\u{1F44B}",
  catat: "\u{1F4DD}",
  bintang: "\u{2B50}",
  sorak: "\u{1F389}",
  balon: "\u{1F388}",
  jempol: "\u{1F44D}",
  kambing: "\u{1F410}",
  kelinci: "\u{1F407}",
  kura: "\u{1F422}",
  beo: "\u{1F99C}",
  rusa: "\u{1F98C}",
  wortel: "\u{1F955}",
  jagung: "\u{1F33D}",
  biji: "\u{1F33E}",
  karung: "\u{1F6CD}\u{FE0F}",
  keranjang: "\u{1F9FA}",
  sabun: "\u{1F9FC}",
  tetes: "\u{1F4A6}",
  stetoskop: "\u{1FA7A}",
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

/* ------------------------------ Ruang pakan dan periksa ------------------------------ */
export const WD = {
  lantai: "#E2E8F0",
  lantaiGaris: "#CBD5E1",
  tanah: "#BBF7D0",
  tanahGaris: "#4ADE80",
  kayu: "#B7814A",
  kayuTua: "#6B4423",
  logam: "#FBBF24",
  logamTua: "#92400E",
  labu: "#F97316",
  labuTua: "#9A3412",
  piring: "#D6A15E",
  busa: "#F8FAFC",
} as const;

/** Lantai keramik `${id}` dari tinggi y sampai bawah kanvas, dua garis ubin `${id}-g1`, `${id}-g2`. */
export function lantai(id: string, y = 150): Obj[] {
  return [kotak(id, 2, y, 296, 200 - y, WD.lantai, undefined, { rx: 0, tebal: 0, z: -3 }), garis(`${id}-g1`, 4, y + 14, 292, 0, WD.lantaiGaris, 1.4, { z: -2 }), garis(`${id}-g2`, 4, y + 32, 292, 0, WD.lantaiGaris, 1.4, { z: -2 })];
}
/** Tanah hijau halaman kebun binatang, id sama dengan lantai(). */
export function tanah(id: string, y = 150): Obj[] {
  return [kotak(id, 2, y, 296, 200 - y, WD.tanah, undefined, { rx: 0, tebal: 0, z: -3 }), garis(`${id}-g1`, 4, y + 14, 292, 0, WD.tanahGaris, 1.4, { z: -2 }), garis(`${id}-g2`, 4, y + 32, 292, 0, WD.tanahGaris, 1.4, { z: -2 })];
}
export const idLantai = (id: string): string[] => [id, `${id}-g1`, `${id}-g2`];

/** Meja kayu: papan `${id}`, dua kaki `${id}-l` `${id}-r`. Pojok kiri-atas papan (x, y), lebar w. */
export function meja(id: string, x: number, y: number, w = 120): Obj[] {
  return [
    kotak(id, x, y, w, 6, WD.kayu, WD.kayuTua, { rx: 1, tebal: 1.4, z: 1 }),
    kotak(`${id}-l`, bulatkan(x + 6), y + 6, 5, 28, WD.kayu, WD.kayuTua, { rx: 0, tebal: 1, z: 0 }),
    kotak(`${id}-r`, bulatkan(x + w - 11), y + 6, 5, 28, WD.kayu, WD.kayuTua, { rx: 0, tebal: 1, z: 0 }),
  ];
}
export const idMeja = (id: string): string[] => [id, `${id}-l`, `${id}-r`];

/** Satu bandul logam kuning bertulisan: badan `${id}`, tulisan `${id}-t`. Pojok kiri-atas (x, y). */
export function bandulObj(id: string, x: number, y: number, label: string, w = 34, h = 16, u = 7): Obj[] {
  return [kotak(id, x, y, w, h, WD.logam, WD.logamTua, { rx: 3, tebal: 1.3, z: 2 }), teks(`${id}-t`, bulatkan(x + w / 2), bulatkan(y + h / 2 + u * 0.35), label, u, "#78350F", { z: 3 })];
}
export const idBandul = (id: string): string[] => [id, `${id}-t`];
/** Lima bandul timbangan kodok berjajar: `${id}0`..`${id}4`, pojok kiri-atas yang pertama (x, y), lebar 26, jarak 4. */
export function barisBandul(id: string, x: number, y: number): Obj[] {
  return ["1/2 ons", "1 ons", "2 ons", "1/2 kg", "1 kg"].flatMap((l, i) => bandulObj(`${id}${i}`, x + i * 30, y, l, 26, 16, 6.2));
}
export const idBarisBandul = (id: string): string[] => [0, 1, 2, 3, 4].flatMap((i) => idBandul(`${id}${i}`));

/**
 * Timbangan kodok tua yang seimbang: tiang `${id}-p`, alas `${id}-d`, balok `${id}-b`, poros `${id}-v`, tali `${id}-s1`..`${id}-s4`, piring kiri `${id}-kl` dan kanan `${id}-kr`.
 * Balok di tinggi y dari cx - 62 sampai cx + 62; piring kiri berpusat di cx - 54 dan kanan di cx + 54, permukaannya di y + 40; alas di y + 52.
 */
export function timbanganKodok(id: string, cx: number, y: number): Obj[] {
  return [
    kotak(`${id}-p`, cx - 3, y, 6, 52, WD.kayu, WD.kayuTua, { rx: 1, tebal: 1, z: 0 }),
    kotak(`${id}-d`, cx - 18, y + 52, 36, 6, WD.kayu, WD.kayuTua, { rx: 2, tebal: 1.2, z: 0 }),
    garis(`${id}-b`, cx - 62, y, 124, 0, WD.kayuTua, 3.4, { z: 1 }),
    bulat(`${id}-v`, cx, y, 5, WD.logam, WD.logamTua, { z: 2 }),
    garis(`${id}-s1`, cx - 54, y, -24, 40, WD.kayuTua, 1.2, { z: 0 }),
    garis(`${id}-s2`, cx - 54, y, 24, 40, WD.kayuTua, 1.2, { z: 0 }),
    garis(`${id}-s3`, cx + 54, y, -24, 40, WD.kayuTua, 1.2, { z: 0 }),
    garis(`${id}-s4`, cx + 54, y, 24, 40, WD.kayuTua, 1.2, { z: 0 }),
    kotak(`${id}-kl`, cx - 78, y + 40, 48, 5, WD.piring, WD.kayuTua, { rx: 2, tebal: 1.2, z: 1 }),
    kotak(`${id}-kr`, cx + 30, y + 40, 48, 5, WD.piring, WD.kayuTua, { rx: 2, tebal: 1.2, z: 1 }),
  ];
}
export const idKodok = (id: string): string[] => [`${id}-p`, `${id}-d`, `${id}-b`, `${id}-v`, `${id}-s1`, `${id}-s2`, `${id}-s3`, `${id}-s4`, `${id}-kl`, `${id}-kr`];

/** Sepotong labu: badan `${id}`, tangkai `${id}-t`. Pusat (x, y), jari-jari r. */
export function labu(id: string, x: number, y: number, r = 11): Obj[] {
  return [bulat(id, x, y, r, WD.labu, WD.labuTua, { tebal: 1.4, z: 2 }), kotak(`${id}-t`, bulatkan(x - 1.6), bulatkan(y - r - 3), 3.2, 4.4, W.hijau, W.hijauTua, { rx: 1, tebal: 0.8, z: 3 })];
}
export const idLabu = (id: string): string[] => [id, `${id}-t`];

/** Keranjang anyaman: badan `${id}`, bibir `${id}-t`. Pojok kiri-atas badan (x, y). */
export function keranjang(id: string, x: number, y: number, w = 70, h = 40): Obj[] {
  return [kotak(id, x, y, w, h, "#D6A15E", WD.kayuTua, { rx: 5, tebal: 1.5, z: 1 }), kotak(`${id}-t`, bulatkan(x - 3), bulatkan(y - 4), w + 6, 6, "#B7814A", WD.kayuTua, { rx: 3, tebal: 1.3, z: 2 })];
}
export const idKeranjang = (id: string): string[] => [id, `${id}-t`];

/* ------------------------------ Tabel, garis ganda, dan potongan ------------------------------ */
/**
 * Tabel tempat angka tanpa isi: empat kolom selebar w mulai dari x0; baris kepala `${id}-h0`..`${id}-h3` (tinggi 20, di tinggi y) dan baris angka `${id}-c0`..`${id}-c3` (tinggi 36, di bawahnya).
 * Tulisan kepala `${id}-ht0`.. diberi bila `kepala` ada; angka ditulis dengan teks `${id}-n0`.. oleh pemanggil (pusat sel di `pusatAngka`).
 */
export const WARNA_KOLOM = ["#DBEAFE", "#DCFCE7", "#FEF9C3", "#FCE7F3"] as const;
export const GARIS_KOLOM = ["#2563EB", "#16A34A", "#A16207", "#BE185D"] as const;
export function tabelKosong(id: string, x0: number, y: number, w: number, kepala: string[] = []): Obj[] {
  const out: Obj[] = [];
  for (let c = 0; c < 4; c += 1) {
    const x = x0 + c * w;
    out.push(kotak(`${id}-h${c}`, x, y, w, 20, WARNA_KOLOM[c], GARIS_KOLOM[c], { rx: 0, tebal: 1.6, z: 0 }));
    out.push(kotak(`${id}-c${c}`, x, y + 20, w, 36, W.putih, GARIS_KOLOM[c], { rx: 0, tebal: 1.6, z: 0 }));
    if (kepala[c]) out.push(teks(`${id}-ht${c}`, x + w / 2, y + 13.4, kepala[c], 8.4, GARIS_KOLOM[c], { z: 1 }));
  }
  return out;
}
export const pusatAngka = (x0: number, y: number, w: number, c: number): [number, number] => [x0 + c * w + w / 2, y + 20 + 27];

/**
 * Garis bilangan `${id}-g` dari bilangan `dari` sampai `sampai`, tanda `${id}-t{n}` dan angka `${id}-l{n}` pada kelipatan langkah (atau hanya pada `tampil`).
 * x(n) = x0 + (n - dari) * satuan. Angka ditulis di atas garis bila `atas`, di bawahnya bila tidak.
 */
export function garisBil(id: string, x0: number, y: number, satuan: number, dari: number, sampai: number, langkah: number, warna: string = W.biru, atas = false, label: (n: number) => string = (n) => String(n), u = 8): Obj[] {
  const out: Obj[] = [garis(`${id}-g`, x0, y, bulatkan(satuan * (sampai - dari)), 0, warna, 2.2)];
  for (let n = dari; n <= sampai; n += langkah) {
    out.push(garis(`${id}-t${n}`, bulatkan(x0 + (n - dari) * satuan), y - 4, 0, 8, warna, 1.6));
    out.push(teks(`${id}-l${n}`, bulatkan(x0 + (n - dari) * satuan), atas ? y - 9 : y + 15, label(n), u, warna));
  }
  return out;
}
export const xGaris = (x0: number, satuan: number, dari: number, n: number): number => bulatkan(x0 + (n - dari) * satuan);

/** Satu potongan berlabel: kotak `${id}` dan tulisan `${id}-t` di tengahnya. Pojok kiri-atas (x, y). */
export function potongan(id: string, x: number, y: number, w: number, h: number, warna: string, garisW: string, label: string, u = 11, o: Opsi = {}): Obj[] {
  return [kotak(id, x, y, w, h, warna, garisW, { rx: 4, tebal: 1.6, ...o }), teks(`${id}-t`, bulatkan(x + w / 2), bulatkan(y + h / 2 + u * 0.36), label, u, W.biru, { z: 2, ...o })];
}
export const idPotongan = (id: string): string[] => [id, `${id}-t`];

/* ------------------------------ Tokoh ------------------------------ */
export type NamaTokoh = "Raka" | "Salsa" | "Bima" | "Pak Joko" | "Kak Tari" | "Pak Wayan" | "Bu Lastri" | "Dokter Hana";

/**
 * Tokoh berdiri: wajah `${id}`, nama `${id}-n`. Raka berkaus merah `${id}-bj`; Salsa berkepang dua `${id}-k1` `${id}-k2` dan memegang kertas catatan `${id}-kc`;
 * Bima berkaus hijau `${id}-bj`; Pak Joko berkaus biru `${id}-bj`, bertopi anyaman `${id}-tp`, berkumis `${id}-km`, berpensil di telinga `${id}-ps`;
 * Kak Tari berseragam cokelat `${id}-bj`, bertopi safari `${id}-tp`, berpeluit `${id}-pl`; Pak Wayan berbaju cokelat tua `${id}-bj`, bertopi bambu `${id}-tp`, berpita kuning di pinggang `${id}-pt`;
 * Bu Lastri berapron hijau `${id}-bj` dan `${id}-ap`; Dokter Hana berjas putih `${id}-bj` dan berstetoskop `${id}-st`. Tanpa ZWJ.
 */
export function tokoh(id: string, x: number, y0: number, nama: NamaTokoh, u = 30, warnaNama: string = W.ungu): Obj[] {
  /* Baris tokoh standar (184) dinaikkan 10 supaya nama tokoh tidak menimpa keterangan sumber di pojok kanan bawah. */
  const y = y0 === 184 ? 174 : y0;
  const wajah = nama === "Raka" ? E.raka : nama === "Salsa" ? E.salsa : nama === "Bima" ? E.bima : nama === "Pak Joko" || nama === "Pak Wayan" ? E.pak : E.bu;
  const out: Obj[] = [emo(id, x, y, wajah, u, { z: 1 })];
  const baju = (warna: string, garisW: string, tinggi = 9): Obj => kotak(`${id}-bj`, x - 11, bulatkan(y + 2), 22, tinggi, warna, garisW, { rx: 3, tebal: 1.2, z: 0 });
  const topi = (warna: string, garisW: string, lebar = 20): Obj => kotak(`${id}-tp`, bulatkan(x - lebar / 2), bulatkan(y - u * 0.78), lebar, 6, warna, garisW, { rx: 2, tebal: 1, z: 2 });
  if (nama === "Raka") out.push(baju("#DC2626", "#7F1D1D"));
  if (nama === "Bima") out.push(baju("#16A34A", "#14532D"));
  if (nama === "Salsa") {
    out.push(bulat(`${id}-k1`, x - 13, bulatkan(y - u * 0.3), 2.8, "#292524", "#0C0A09", { tebal: 0.8, z: 2 }));
    out.push(bulat(`${id}-k2`, x + 13, bulatkan(y - u * 0.3), 2.8, "#292524", "#0C0A09", { tebal: 0.8, z: 2 }));
    out.push(kotak(`${id}-kc`, x + 12, bulatkan(y + 1), 9, 12, W.putih, "#94A3B8", { rx: 1, tebal: 0.9, z: 2 }));
  }
  if (nama === "Pak Joko") {
    out.push(baju("#2563EB", "#1E3A8A", 12));
    out.push(topi("#D4A55A", "#92400E", 24));
    out.push(garis(`${id}-km`, x - 5, bulatkan(y - u * 0.12), 10, 0, "#1F2937", 1.8, { z: 2 }));
    out.push(garis(`${id}-ps`, x + 12, bulatkan(y - u * 0.5), 0, 8, "#F59E0B", 2, { z: 2 }));
  }
  if (nama === "Kak Tari") {
    out.push(baju("#92400E", "#451A03", 10));
    out.push(topi("#CA8A04", "#713F12", 24));
    out.push(bulat(`${id}-pl`, x + 9, bulatkan(y + 4), 2.6, "#FBBF24", "#92400E", { tebal: 0.8, z: 2 }));
  }
  if (nama === "Pak Wayan") {
    out.push(baju("#78350F", "#451A03", 12));
    out.push(topi("#E7C48F", "#92400E", 26));
    out.push(kotak(`${id}-pt`, x - 11, bulatkan(y + 11), 22, 3, "#FACC15", "#A16207", { rx: 1, tebal: 0.8, z: 2 }));
  }
  if (nama === "Bu Lastri") {
    out.push(baju("#16A34A", "#14532D", 12));
    out.push(kotak(`${id}-ap`, x - 6, bulatkan(y + 5), 12, 9, "#BBF7D0", "#14532D", { rx: 2, tebal: 0.9, z: 1 }));
  }
  if (nama === "Dokter Hana") {
    out.push(baju(W.putih, "#94A3B8", 13));
    out.push(emo(`${id}-st`, x + 11, bulatkan(y + 11), E.stetoskop, 11, { z: 2 }));
  }
  out.push(teks(`${id}-n`, x, bulatkan(y + (nama === "Pak Joko" || nama === "Pak Wayan" ? 18 : 15)), nama, 8.4, warnaNama, { z: 3 }));
  return out;
}
export const idTokoh = (id: string, nama: NamaTokoh): string[] => [
  id,
  `${id}-n`,
  ...(nama === "Raka" || nama === "Bima" ? [`${id}-bj`] : []),
  ...(nama === "Salsa" ? [`${id}-k1`, `${id}-k2`, `${id}-kc`] : []),
  ...(nama === "Pak Joko" ? [`${id}-bj`, `${id}-tp`, `${id}-km`, `${id}-ps`] : []),
  ...(nama === "Kak Tari" ? [`${id}-bj`, `${id}-tp`, `${id}-pl`] : []),
  ...(nama === "Pak Wayan" ? [`${id}-bj`, `${id}-tp`, `${id}-pt`] : []),
  ...(nama === "Bu Lastri" ? [`${id}-bj`, `${id}-ap`] : []),
  ...(nama === "Dokter Hana" ? [`${id}-bj`, `${id}-st`] : []),
];
/** Patch posisi semua bagian tokoh ke (x, y) baru, untuk ubah. */
export const pindahTokoh = (id: string, x: number, y: number, nama: NamaTokoh, u = 30): (Partial<Obj> & { id: string })[] => pindah(tokoh(id, x, y, nama, u));
