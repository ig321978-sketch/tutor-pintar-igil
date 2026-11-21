import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 5 Bab 1 Sub-Bab D "Hitungan Penonton Pak Darmo" (perkiraan dengan pembulatan, jumlah bersusun dengan menyimpan, kurang bersusun dengan meminjam, cek dengan operasi kebalikan),
 * akhir cerita Hari Pertandingan di Stadion Kota. Berkas ini TIDAK dipakai bab atau sub-bab lain.
 *
 * Rupa: ruang panitia dan lapangan (lantai paving, papan hitung hijau berkapur dengan lima kolom tempat dari satuan sampai puluh ribuan), baris bilangan yang digambar SUNGGUH per kolom
 * (satu angka satu benda, tepat pada kolomnya), simpanan (angka kecil oranye di atas kolom kiri), dan pinjaman (angka atas yang berubah). Data Story: penonton empat tribun
 * (Utara 24.350, Selatan 18.705, Timur 9.060, Barat 30.402; jumlah 82.517), kursi stadion 90.000, kursi kosong 7.483, dan salah Fajar 12.517.
 * Tokoh: Bima (kaus hijau, berpapan jepit), Citra (berkucir dua), Fajar (bertopi suporter), Pak Arif (berompi oranye, berpengeras suara), Pak Darmo (berjaket merah, berpapan jepit dan pulpen),
 * dan tiga tamu di perayaan: Bu Ningsih (berompi biru), Pak Hasto (berpeci), Bu Lestari (berkacamata). Tanpa ZWJ, emoji paling tinggi U+1FA95.
 */

export const W = {
  biru: "#1C01A5",
  emas: "#FFC800",
  merah: "#DC2626",
  merahTua: "#7F1D1D",
  hijau: "#16A34A",
  hijauTua: "#166534",
  papan: "#14532D",
  kapur: "#FEF9C3",
  kapurRedup: "#BBF7D0",
  oranye: "#EA580C",
  putih: "#FFFFFF",
  abu: "#CBD5E1",
  ungu: "#7C3AED",
  coklat: "#92400E",
  krem: "#FEF3C7",
  lantai: "#E7E5E4",
  lantaiTua: "#A8A29E",
  kayu: "#B7814A",
  kayuTua: "#6B4423",
};

export const E = {
  bima: "\u{1F466}",
  citra: "\u{1F467}",
  fajar: "\u{1F9D2}",
  pak: "\u{1F468}",
  bu: "\u{1F469}",
  benar: "\u{2705}",
  salah: "\u{274C}",
  jempol: "\u{1F44D}",
  mata: "\u{1F50D}",
  konfeti: "\u{1F389}",
  kilau: "\u{2728}",
  bola: "\u{26BD}",
  tiket: "\u{1F3AB}",
  bendera: "\u{1F6A9}",
  balon: "\u{1F388}",
  kursi: "\u{1F4BA}",
  gelas: "\u{1F964}",
  corong: "\u{1F4E3}",
  lelah: "\u{1F613}",
  pikir: "\u{1F914}",
  jam: "\u{231B}",
  ulang: "\u{1F501}",
  kilat: "\u{26A1}",
  papanJepit: "\u{1F4CB}",
  piala: "\u{1F3C6}",
  tangan: "\u{1F64C}",
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

/* ------------------------------ Latar ------------------------------ */
/** Lantai paving `${id}` dari tinggi y sampai bawah kanvas, dua garis `${id}-g1`, `${id}-g2`. */
export function lantai(id: string, y = 150): Obj[] {
  return [kotak(id, 2, y, 296, 200 - y, W.lantai, undefined, { rx: 0, tebal: 0, z: -3 }), garis(`${id}-g1`, 4, y + 14, 292, 0, W.lantaiTua, 1.2, { z: -2 }), garis(`${id}-g2`, 4, y + 32, 292, 0, W.lantaiTua, 1.2, { z: -2 })];
}
export const idLantai = (id: string): string[] => [id, `${id}-g1`, `${id}-g2`];

/* ------------------------------ Papan hitung dan kolom tempat ------------------------------ */
/** Pusat tiap kolom (indeks 0 = satuan sampai 4 = puluh ribuan). */
export const KOL_X = [214, 186, 158, 130, 102] as const;
export const NAMA_KOL = ["satuan", "puluhan", "ratusan", "ribuan", "puluh ribuan"] as const;
/** Baris-baris papan: simpanan atau pinjaman (y 42), baris bilangan pertama sampai keempat, garis, dan baris hasil. */
export const Y = { atas: 42, r: [54, 69, 84, 99] as const, garis: 105, hasil: 119, rumus: 133 } as const;

/** Papan hitung hijau berkapur `${id}` dengan bingkai kayu. Pojok kiri-atas (x, y). */
export const papanHitung = (id = "pn", x = 6, y = 30, w = 236, h = 114): Obj => kotak(id, x, y, w, h, W.papan, W.kayuTua, { rx: 5, tebal: 3, z: -1 });
/** Lajur kolom tempat (lima lajur tipis berselang-seling) `${id}-s0..4` di dalam papan. */
export function lajurKolom(id = "lj", y1 = 36, y2 = 140): Obj[] {
  return KOL_X.map((x, k) => kotak(`${id}-s${k}`, x - 13, y1, 26, y2 - y1, k % 2 === 0 ? "#1B6B3A" : "#166534", undefined, { rx: 0, tebal: 0, z: -1 }));
}
export const idLajur = (id = "lj"): string[] => KOL_X.map((_, k) => `${id}-s${k}`);
/** Sorotan satu kolom `${id}` (kuning tipis) dari y1 sampai y2. */
export const sorotKolom = (id: string, k: number, y1 = 36, y2 = 140): Obj => kotak(id, KOL_X[k] - 13, y1, 26, y2 - y1, "#FDE047", undefined, { rx: 0, tebal: 0, op: 0.28, z: 0 });
const panjang = (n: number): number => String(n).length;
/** Angka kolom k (0 = satuan) dari bilangan n, dibaca dari teks (cara yang berbeda dari sisa bagi). */
export const angkaTeks = (n: number, k: number): number => Number(String(n).padStart(5, "0")[4 - k]);
/** Semua angka satu bilangan `${id}-c{k}` (tanpa nol di depan) pada baris y, tepat pada kolomnya. */
export function digitBaris(id: string, y: number, n: number, o: { u?: number; warna?: string; tebal?: boolean } = {}): Obj[] {
  const p = panjang(n);
  return Array.from({ length: p }, (_, k) => teks(`${id}-c${k}`, KOL_X[k], y, String(angkaTeks(n, k)), o.u ?? 11, o.warna ?? W.kapur, { z: 2 }));
}
export const idDigit = (id: string, n: number): string[] => Array.from({ length: panjang(n) }, (_, k) => `${id}-c${k}`);
/** Satu angka di kolom k pada baris y: `${id}`. */
export const angkaDi = (id: string, k: number, y: number, isi: string | number, u = 11, warna: string = W.kapur): Obj => teks(id, KOL_X[k], y, String(isi), u, warna, { z: 2 });
/** Label baris di kiri papan `${id}` (nama dan bilangan lengkap bertitik ribuan). */
export const labelBaris = (id: string, y: number, isi: string, warna: string = W.kapur, u = 7.5): Obj => teks(id, 10, y, isi, u, warna, { anchor: "start", z: 2 });
/** Garis hitung (garis bawah penjumlahan atau pengurangan) `${id}`. */
export const garisHitung = (id: string, y: number = Y.garis): Obj => garis(id, 70, y, 148, 0, W.kapur, 1.8, { z: 2 });
/** Persamaan satu baris di bawah kolom, tengah di x. */
export const rumus = (id: string, isi: string, y: number = Y.rumus, x = 124, u = 9, warna: string = W.krem): Obj => teks(id, x, y, isi, u, warna, { z: 3 });
export const fmt = (n: number): string => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".");

/* ------------------------------ Data Story ------------------------------ */
export type Tribun = { nama: string; n: number };
/** Penonton empat tribun (urut seperti di naskah: Utara, Selatan, Timur, Barat). */
export const TRIBUN: Tribun[] = [
  { nama: "Utara", n: 24350 },
  { nama: "Selatan", n: 18705 },
  { nama: "Timur", n: 9060 },
  { nama: "Barat", n: 30402 },
];
export const KURSI = 90000;
export const JUMLAH = 82517;
export const KOSONG = 7483;
/** Salah Fajar: tiap kolom angka besar dikurangi angka kecil. */
export const SALAH_FAJAR = 12517;

/** Empat baris penonton dengan label (nama dan bilangan) dan angka per kolom: ids `${id}${i}` (label `${id}${i}-l`, angka `${id}${i}-c{k}`). */
export function barisTribun(id = "t"): Obj[] {
  return TRIBUN.flatMap((t, i) => [labelBaris(`${id}${i}-l`, Y.r[i] + 3, `${i === 0 ? "" : "+ "}${t.nama} ${fmt(t.n)}`), ...digitBaris(`${id}${i}`, Y.r[i], t.n)]);
}
export const idBarisTribun = (id = "t"): string[] => TRIBUN.flatMap((t, i) => [`${id}${i}-l`, ...idDigit(`${id}${i}`, t.n)]);
/** Dua baris pengurangan 90.000 dan 82.517: atas `${id}0`, bawah `${id}1` (label `${id}0-l`, `${id}1-l`). */
export function barisKurang(id = "k", a = KURSI, b = JUMLAH, namaA = "Kursi", namaB = "Penonton"): Obj[] {
  return [labelBaris(`${id}0-l`, Y.r[0] + 3, `${namaA} ${fmt(a)}`), ...digitBaris(`${id}0`, Y.r[0], a), labelBaris(`${id}1-l`, Y.r[1] + 3, `− ${namaB} ${fmt(b)}`), ...digitBaris(`${id}1`, Y.r[1], b)];
}
export const idBarisKurang = (id = "k", a = KURSI, b = JUMLAH): string[] => [`${id}0-l`, ...idDigit(`${id}0`, a), `${id}1-l`, ...idDigit(`${id}1`, b)];

/* ------------------------------ Tokoh ------------------------------ */
export type NamaTokoh = "Bima" | "Citra" | "Fajar" | "Pak Arif" | "Pak Darmo" | "Bu Ningsih" | "Pak Hasto" | "Bu Lestari";

/**
 * Tokoh berdiri: wajah `${id}`, nama `${id}-n`. Bima berkaus hijau `${id}-bj` dan berpapan jepit `${id}-pj`; Citra berkucir dua `${id}-k1` dan `${id}-k2`; Fajar bertopi suporter `${id}-tp`;
 * Pak Arif berompi oranye `${id}-bj` dan berpengeras suara `${id}-pg`; Pak Darmo berjaket merah `${id}-bj`, berpapan jepit `${id}-pj`, dan berpulpen `${id}-pl`;
 * Bu Ningsih berompi biru `${id}-bj`; Pak Hasto berpeci hitam `${id}-pc`; Bu Lestari berkacamata `${id}-ka`. Tanpa ZWJ.
 */
export function tokoh(id: string, x: number, y0: number, nama: NamaTokoh, u = 30): Obj[] {
  /* Baris tokoh standar (184) dinaikkan 10 supaya nama tokoh tidak menimpa keterangan sumber di pojok kanan bawah. */
  const y = y0 === 184 ? 174 : y0;
  const wajah = nama === "Bima" ? E.bima : nama === "Citra" ? E.citra : nama === "Fajar" ? E.fajar : nama === "Bu Ningsih" || nama === "Bu Lestari" ? E.bu : E.pak;
  const out: Obj[] = [emo(id, x, y, wajah, u, { z: 1 })];
  const baju = (warna: string, garisW: string, tinggi = 9): Obj => kotak(`${id}-bj`, x - 11, bulatkan(y + 2), 22, tinggi, warna, garisW, { rx: 3, tebal: 1.2, z: 0 });
  const papanJepit = (): Obj => kotak(`${id}-pj`, x + 10, bulatkan(y + 1), 10, 13, "#FDE68A", "#92400E", { rx: 1, tebal: 1, z: 2 });
  if (nama === "Bima") {
    out.push(baju("#16A34A", "#14532D"));
    out.push(papanJepit());
  }
  if (nama === "Citra") {
    out.push(bulat(`${id}-k1`, x - 14, bulatkan(y - u * 0.3), 3.2, "#292524", "#0C0A09", { tebal: 0.8, z: 2 }));
    out.push(bulat(`${id}-k2`, x + 14, bulatkan(y - u * 0.3), 3.2, "#292524", "#0C0A09", { tebal: 0.8, z: 2 }));
  }
  if (nama === "Fajar") out.push(kotak(`${id}-tp`, x - 9, bulatkan(y - u * 0.8), 18, 6, "#DC2626", "#7F1D1D", { rx: 3, tebal: 1, z: 2 }));
  if (nama === "Pak Arif") {
    out.push(baju("#EA580C", "#7C2D12", 12));
    out.push(kotak(`${id}-pg`, x + 10, bulatkan(y + 3), 9, 7, "#9CA3AF", "#374151", { rx: 2, tebal: 1, z: 2 }));
  }
  if (nama === "Pak Darmo") {
    out.push(baju("#DC2626", "#7F1D1D", 12));
    out.push(papanJepit());
    out.push(garis(`${id}-pl`, x + 6, bulatkan(y - 3), 0, 8, "#1F2937", 1.6, { z: 3 }));
  }
  if (nama === "Bu Ningsih") out.push(baju("#2563EB", "#1E3A8A", 12));
  if (nama === "Pak Hasto") out.push(kotak(`${id}-pc`, x - 8, bulatkan(y - u * 0.78), 16, 6, "#111827", "#030712", { rx: 2, tebal: 1, z: 2 }));
  if (nama === "Bu Lestari") out.push(garis(`${id}-ka`, x - 8, bulatkan(y - u * 0.28), 16, 0, "#1F2937", 1.6, { z: 2 }));
  out.push(teks(`${id}-n`, x, bulatkan(y + 4 + (nama === "Pak Arif" || nama === "Pak Darmo" || nama === "Pak Hasto" ? 18 : 15)), nama, 8.4, W.hijauTua, { z: 3 }));
  return out;
}
export const idTokoh = (id: string, nama: NamaTokoh): string[] => [
  id,
  `${id}-n`,
  ...(nama === "Bima" ? [`${id}-bj`, `${id}-pj`] : []),
  ...(nama === "Citra" ? [`${id}-k1`, `${id}-k2`] : []),
  ...(nama === "Fajar" ? [`${id}-tp`] : []),
  ...(nama === "Pak Arif" ? [`${id}-bj`, `${id}-pg`] : []),
  ...(nama === "Pak Darmo" ? [`${id}-bj`, `${id}-pj`, `${id}-pl`] : []),
  ...(nama === "Bu Ningsih" ? [`${id}-bj`] : []),
  ...(nama === "Pak Hasto" ? [`${id}-pc`] : []),
  ...(nama === "Bu Lestari" ? [`${id}-ka`] : []),
];

/* ------------------------------ Bentuk bersama untuk adegan metode ------------------------------ */
/** Kartu metode: judul Inggris (baris pertama) dan nama Indonesia (baris kedua, opsional) di dalam satu kartu `${id}-k`, `${id}-t0`, `${id}-t1`. */
export const kartuMetode = (id: string, x: number, y: number, w: number, h: number, warna: string, ing: string, ind?: string, u = 8.4): Obj[] => kartu(id, x, y, w, h, warna, ind ? [ing, ind] : [ing], u);
export const WARNA_METODE = ["#DBEAFE", "#DCFCE7", "#FEF9C3"] as const;
/** Garis bilangan pembulatan: garis `${id}-g`, dua tanda `${id}-a` dan `${id}-b`, label di bawahnya `${id}-la` dan `${id}-lb`; titik bilangan `${id}-p`. */
export function garisBulat(id: string, y: number, bawah: number, atas: number, titik: number, x1 = 50, x2 = 250): Obj[] {
  const xp = b2(x1 + ((titik - bawah) / (atas - bawah)) * (x2 - x1));
  return [
    garis(`${id}-g`, x1 - 14, y, x2 - x1 + 28, 0, W.biru, 2, { z: 2 }),
    garis(`${id}-a`, x1, y - 6, 0, 12, W.biru, 2, { z: 2 }),
    garis(`${id}-b`, x2, y - 6, 0, 12, W.biru, 2, { z: 2 }),
    teks(`${id}-la`, x1, y + 17, fmt(bawah), 9, W.biru, { z: 2 }),
    teks(`${id}-lb`, x2, y + 17, fmt(atas), 9, W.biru, { z: 2 }),
    bulat(`${id}-p`, xp, y, 4.5, W.oranye, "#7C2D12", { z: 3 }),
  ];
}
export const idGarisBulat = (id: string): string[] => ["g", "a", "b", "la", "lb", "p"].map((s) => `${id}-${s}`);
