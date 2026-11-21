import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 5 Bab 1 Sub-Bab A "Tiket Tribun Bu Ningsih" (membaca dan menulis bilangan cacah sampai 100.000), awal cerita Hari Pertandingan di Stadion Kota.
 * Berkas ini TIDAK dipakai bab atau sub-bab lain.
 *
 * Rupa: Stadion Kota pada hari pertandingan: tribun bertangga, loket tiket, papan angka stadion, dan tabel tempat lima kolom (puluh ribuan, ribuan, ratusan, puluhan, satuan)
 * yang digambar sungguh dengan angka yang benar. Tokoh: Bima (berkaus hijau, berpapan jepit), Citra (berkucir dua), Fajar (bertopi suporter), Pak Arif (berompi oranye, berpengeras suara kecil),
 * Bu Ningsih (berompi biru, bermesin cetak tiket), Pak Hasto (berpeci hitam, berpengeras suara). Tanpa ZWJ, emoji paling tinggi U+1FA95.
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
  rumput: "#BBF7D0",
  langit: "#E0F2FE",
  papan: "#1E293B",
  kapur: "#FEF9C3",
  sorot: "#FDE68A",
  jingga: "#FED7AA",
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
  tiket: "\u{1F3AB}",
  bola: "\u{26BD}",
  sapu: "\u{1F9F9}",
  bintang: "\u{2B50}",
  daftar: "\u{1F4CB}",
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

/** Lapangan rumput dari tinggi y sampai bawah kanvas. */
export function tanah(id: string, y = 150): Obj[] {
  return [kotak(id, 2, y, 296, 200 - y, W.rumput, undefined, { rx: 0, tebal: 0, z: -3 })];
}

/** Tulisan bilangan dengan titik pemisah ribuan: 24350 menjadi "24.350". */
export const lambang = (n: number): string => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".");

/** Tribun bertangga tiga lajur: lajur `${id}-a`, `${id}-b`, `${id}-c`. Pojok kiri-atas (x, y), lebar w. Label nama di atasnya bila ada. */
export function tribun(id: string, x: number, y: number, w: number): Obj[] {
  return [
    kotak(`${id}-a`, x, y, w, 12, "#93C5FD", "#1E3A8A", { rx: 1, tebal: 1.2, z: 1 }),
    kotak(`${id}-b`, bulatkan(x - 6), y + 12, w + 12, 12, "#60A5FA", "#1E3A8A", { rx: 1, tebal: 1.2, z: 1 }),
    kotak(`${id}-c`, bulatkan(x - 12), y + 24, w + 24, 12, "#3B82F6", "#1E3A8A", { rx: 1, tebal: 1.2, z: 1 }),
  ];
}
export const idTribun = (id: string): string[] => [`${id}-a`, `${id}-b`, `${id}-c`];

/** Loket tiket: atap `${id}-at`, badan `${id}-bd`, jendela `${id}-jd`. Pojok kiri-atas (x, y). */
export function loket(id: string, x: number, y: number, w = 90, h = 70): Obj[] {
  return [
    kotak(`${id}-at`, x - 4, y, w + 8, 12, W.merah, "#7F1D1D", { rx: 2, tebal: 1.4, z: 2 }),
    kotak(`${id}-bd`, x, y + 12, w, h - 12, W.krem, W.coklat, { rx: 2, tebal: 1.6, z: 0 }),
    kotak(`${id}-jd`, x + 10, y + 24, w - 20, 24, W.biruMuda, W.coklat, { rx: 2, tebal: 1.2, z: 1 }),
  ];
}
export const idLoket = (id: string): string[] => [`${id}-at`, `${id}-bd`, `${id}-jd`];

/** Papan angka stadion: bingkai `${id}` dan layar gelap `${id}-p`. Pojok kiri-atas (x, y). */
export function papanAngka(id: string, x: number, y: number, w: number, h: number): Obj[] {
  return [kotak(id, x, y, w, h, "#475569", "#0F172A", { rx: 4, tebal: 1.6, z: -1 }), kotak(`${id}-p`, x + 4, y + 4, w - 8, h - 8, W.papan, "#020617", { rx: 2, tebal: 1, z: 0 })];
}
export const idPapanAngka = (id: string): string[] => [id, `${id}-p`];

/* ------------------------------ Tabel tempat ------------------------------ */
export const TEMPAT = ["Puluh Ribuan", "Ribuan", "Ratusan", "Puluhan", "Satuan"];
export const TEMPAT6 = ["Ratusan Ribu", ...TEMPAT];
/** Letak tabel satu baris: pojok kiri-atas (x, y), lebar kolom cw, tinggi kepala hh dan sel ch. */
export type GTabel = { x: number; y: number; cw: number; hh: number; ch: number; u: number; nama: string[] };
export const G5: GTabel = { x: 20, y: 52, cw: 52, hh: 18, ch: 34, u: 7, nama: TEMPAT };
export const G6: GTabel = { x: 12, y: 52, cw: 46, hh: 18, ch: 34, u: 6, nama: TEMPAT6 };

/** Kolom ke-j tabel: kepala `${id}-h{j}`, nama `${id}-ht{j}`, dan sel `${id}-c{j}`. */
export function kolom(id: string, j: number, g: GTabel = G5, warna: string = W.jingga): Obj[] {
  const px = g.x + j * g.cw;
  return [
    kotak(`${id}-h${j}`, px, g.y, g.cw, g.hh, W.biru, W.biru, { rx: 0, tebal: 1 }),
    teks(`${id}-ht${j}`, px + g.cw / 2, g.y + g.hh * 0.68, g.nama[j], g.u, W.putih),
    kotak(`${id}-c${j}`, px, g.y + g.hh, g.cw, g.ch, warna, W.biru, { rx: 0, tebal: 1 }),
  ];
}
export const idKolom = (id: string, j: number): string[] => [`${id}-h${j}`, `${id}-ht${j}`, `${id}-c${j}`, `${id}-t${j}`];
/** Semua kolom tabel. */
export const tabelKosong = (id: string, g: GTabel = G5, warna: string = W.jingga): Obj[] => g.nama.flatMap((_, j) => kolom(id, j, g, warna));
export const idTabel = (id: string, g: GTabel = G5): string[] => g.nama.flatMap((_, j) => idKolom(id, j));
/** Satu angka pada sel kolom ke-j: `${id}-t{j}`. */
export const angka = (id: string, j: number, d: string, g: GTabel = G5, warna: string = W.biru, u = 18): Obj =>
  teks(`${id}-t${j}`, bulatkan(g.x + (j + 0.5) * g.cw), bulatkan(g.y + g.hh + g.ch / 2 + u * 0.35), d, u, warna, { z: 3 });
/** Angka-angka bilangan `n` pada kolom paling kanan ke kiri (kolom di kiri angka pertama dibiarkan kosong). */
export function angkaBilangan(id: string, n: number, g: GTabel = G5, warna: string = W.biru): Obj[] {
  const s = String(n);
  const mulai = g.nama.length - s.length;
  return Array.from(s).map((d, i) => angka(id, mulai + i, d, g, warna));
}
export const idAngka = (id: string, n: number, g: GTabel = G5): string[] => {
  const mulai = g.nama.length - String(n).length;
  return Array.from(String(n)).map((_, i) => `${id}-t${mulai + i}`);
};
/** Titik pemisah ribuan: bulat merah di bawah garis antara kolom ke-(j-1) dan ke-j. */
export const titik = (id: string, j: number, g: GTabel = G5): Obj => bulat(id, g.x + j * g.cw, g.y + g.hh + g.ch + 6, 3, W.merah, W.merah, { tebal: 1, z: 4 });

/* ------------------------------ Tokoh ------------------------------ */
export type NamaTokoh = "Bima" | "Citra" | "Fajar" | "Pak Arif" | "Bu Ningsih" | "Pak Hasto";

/**
 * Tokoh berdiri: wajah `${id}`, nama `${id}-n` (diturunkan supaya tidak menempel dagu). Bima berkaus hijau `${id}-bj` dan membawa papan jepit `${id}-pj`;
 * Citra berkucir dua `${id}-k1` `${id}-k2`; Fajar bertopi suporter `${id}-tp`; Pak Arif berompi oranye `${id}-bj` dan membawa pengeras suara kecil `${id}-pn`;
 * Bu Ningsih berompi biru `${id}-bj` dan membawa mesin cetak tiket `${id}-ms`; Pak Hasto berpeci hitam `${id}-pc`, berompi abu `${id}-bj`, dan membawa pengeras suara `${id}-pn`. Tanpa ZWJ.
 */
export function tokoh(id: string, x: number, y0: number, nama: NamaTokoh, u = 30, warnaNama: string = W.hijauTua): Obj[] {
  /* Baris tokoh standar (184) dinaikkan 10 supaya nama tokoh tidak menimpa tepi bawah kanvas. */
  const y = y0 === 184 ? 174 : y0;
  const wajah = nama === "Bima" ? E.bima : nama === "Citra" ? E.citra : nama === "Fajar" ? E.fajar : nama === "Bu Ningsih" ? E.bu : E.pak;
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
  if (nama === "Bu Ningsih") {
    out.push(baju("#2563EB", "#1E3A8A", 12));
    out.push(kotak(`${id}-ms`, x + 11, bulatkan(y + 4), 14, 8, "#94A3B8", "#334155", { rx: 1, tebal: 0.9, z: 2 }));
  }
  if (nama === "Pak Hasto") {
    out.push(baju("#94A3B8", "#475569", 12));
    out.push(kotak(`${id}-pc`, x - 7, bulatkan(y - u * 0.78), 14, 6, "#111827", "#030712", { rx: 2, tebal: 1, z: 2 }));
    out.push(kotak(`${id}-pn`, x + 12, bulatkan(y + 2), 10, 7, "#FDE68A", "#92400E", { rx: 1, tebal: 0.9, z: 2 }));
  }
  const dewasa = nama === "Pak Arif" || nama === "Bu Ningsih" || nama === "Pak Hasto";
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
  ...(nama === "Bu Ningsih" ? [`${id}-bj`, `${id}-ms`] : []),
  ...(nama === "Pak Hasto" ? [`${id}-bj`, `${id}-pc`, `${id}-pn`] : []),
];
