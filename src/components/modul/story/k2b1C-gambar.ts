import type { Obj } from "./logika-story";
import { E as E_4, W, bulat, emo, garis, kotak, teks } from "./k1b4a-gambar";

/**
 * Gambar khusus Story Kelas 2 Bab 1 Sub-Bab C "Dua Nampan untuk Pesta Kue" (membandingkan bilangan sampai lima puluh), akhir cerita Kue di Kantin Sekolah.
 * Lantai kantin, etalase kaca, nampan kue `${id}` dengan tiga kue `${id}-a`, `-b`, `-c` (angka `${id}-n` dipasang terpisah), meja Pesta Kue berpita,
 * umbul-umbul, tabel puluhan dan satuan, garis bilangan, batang bilangan, kotak kue isi sepuluh, serta tokoh kantin (Chacha, Dika, Nia, Bu Sari, Bu Dewi).
 */

export { W, bulat, emo, garis, judul, kartu, kotak, teks } from "./k1b4a-gambar";

export const E = {
  ...E_4,
  lapis: "\u{1F370}",
  donat: "\u{1F369}",
  pastel: "\u{1F95F}",
  bolu: "\u{1F9C1}",
  anak: "\u{1F9D2}",
  gunting: "\u{2702}\u{FE0F}",
  tertawa: "\u{1F602}",
  menepuk: "\u{1F926}",
  tangan: "\u{270B}",
  tepuk: "\u{1F44F}",
  kaca: "\u{1F50D}",
  mikir: "\u{1F914}",
  seru: "\u{2757}",
  sedih: "\u{1F622}",
  salah: "\u{274C}",
  mahkota: "\u{1F451}",
  lambai: "\u{1F44B}",
  timbang: "\u{2696}\u{FE0F}",
  bintang: "\u{2B50}",
  kuat: "\u{1F4AA}",
  dika: "\u{1F913}",
  topi: "\u{1F9E2}",
  ramai: "\u{1F604}",
  jari: "\u{1F449}",
  jariKiri: "\u{1F448}",
  penggaris: "\u{1F4CF}",
  pasir: "\u{23F3}",
} as const;

export const WK = {
  lantai: "#FDE68A",
  kaca: "#E0F2FE",
  kayu: "#D6A15E",
  kayuTua: "#92400E",
  nampan: "#E5E7EB",
  tepiNampan: "#6B7280",
  kotakKue: "#FDBA74",
  pita: "#EF4444",
  celemek: "#FFFFFF",
  taplak: "#FEE2E2",
  sorotBiru: "#93C5FD",
  sorotMerah: "#FCA5A5",
  biruMuda: "#7DD3FC",
} as const;

const f = (n: number): number => Number(n.toFixed(1));
type Ubah = Partial<Obj> & { id: string };
type Opsi = Partial<Obj>;

/** Lantai kantin `${id}`: dari tinggi y sampai bawah kanvas. */
export const lantai = (id: string, y = 150): Obj => kotak(id, 2, y, 296, 198 - y, WK.lantai, "#F59E0B", { rx: 4, tebal: 1.2, z: -3 });

/** Garis dan panah dengan ujung ditulis mutlak (disimpan relatif). */
export const gs = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => garis(id, x, y, f(x2 - x), f(y2 - y), warna, tebal, o);
export const panah = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.merah, o: Opsi = {}): Obj => ({ id, t: "panah", x, y, x2: f(x2 - x), y2: f(y2 - y), warna, tebal: 3, ...o });

/* ------------------------------ Tokoh ------------------------------ */

export type JenisTokoh = "chacha" | "dika" | "nia" | "sari" | "dewi";
const NAMA_TOKOH: Record<JenisTokoh, string> = { chacha: "Chacha", dika: "Dika", nia: "Nia", sari: "Bu Sari", dewi: "Bu Dewi" };
/**
 * Tokoh berdiri berpusat (x, y): wajah `${id}` dan nama `${id}-n`. Nia memakai topi `${id}-tp`; Bu Sari memakai celemek putih `${id}-ap`;
 * Bu Dewi memakai topi koki `${id}-tp` dan celemek `${id}-ap`.
 */
export function tokoh(id: string, x: number, y: number, jenis: JenisTokoh, u = 30): Obj[] {
  const wajah = jenis === "dika" ? E.dika : jenis === "sari" || jenis === "dewi" ? E.mamah : E.igil;
  const dewasa = jenis === "sari" || jenis === "dewi";
  const out: Obj[] = [emo(id, x, y, wajah, u), teks(`${id}-n`, x, f(y + (dewasa ? 21 : 13)), NAMA_TOKOH[jenis], 8.4, W.ungu)];
  if (jenis === "nia") out.push(emo(`${id}-tp`, x, f(y - 13), E.topi, 15, { z: 1 }));
  if (dewasa) out.push(kotak(`${id}-ap`, f(x - 7), f(y + 5), 14, 10, WK.celemek, W.biru, { rx: 3, tebal: 1.2, z: 1 }));
  if (jenis === "dewi") out.push(kotak(`${id}-tp`, f(x - 8), f(y - 21), 16, 8, WK.celemek, W.biru, { rx: 4, tebal: 1.2, z: 1 }));
  return out;
}
export const idTokoh = (id: string, jenis: JenisTokoh): string[] => [id, `${id}-n`, ...(jenis === "nia" || jenis === "dewi" ? [`${id}-tp`] : []), ...(jenis === "sari" || jenis === "dewi" ? [`${id}-ap`] : [])];
/** Pindah tokoh ke (x, y) bersama namanya. */
export const geserTokoh = (id: string, x: number, y: number, jenis: JenisTokoh): Ubah[] => {
  const dewasa = jenis === "sari" || jenis === "dewi";
  return [
    { id, x, y },
    { id: `${id}-n`, x, y: f(y + (dewasa ? 21 : 13)) },
    ...(jenis === "nia" ? [{ id: `${id}-tp`, x, y: f(y - 13) }] : []),
    ...(dewasa ? [{ id: `${id}-ap`, x: f(x - 7), y: f(y + 5) }] : []),
    ...(jenis === "dewi" ? [{ id: `${id}-tp`, x: f(x - 8), y: f(y - 21) }] : []),
  ];
};

/* ------------------------------ Etalase, meja, umbul-umbul ------------------------------ */

/** Etalase kaca: badan `${id}` dan rak `${id}-r` (garis). */
export const etalase = (id: string, x: number, y: number, w: number, h: number): Obj[] => [
  kotak(id, x, y, w, h, WK.kaca, W.biru, { rx: 6, tebal: 2.6, z: -2 }),
  gs(`${id}-r`, f(x + 3), f(y + h - 14), f(x + w - 3), f(y + h - 14), WK.kayuTua, 3, { z: -1 }),
];

/** Meja Pesta Kue berpita: papan `${id}`, kaki `${id}-k1` dan `${id}-k2`, pita `${id}-p` (emoji). */
export const mejaPesta = (id: string, x: number, y: number, w: number): Obj[] => [
  kotak(id, x, y, w, 9, WK.taplak, WK.kayuTua, { rx: 3, tebal: 1.8, z: -1 }),
  gs(`${id}-k1`, f(x + 8), f(y + 9), f(x + 8), f(y + 28), WK.kayuTua, 3, { z: -1 }),
  gs(`${id}-k2`, f(x + w - 8), f(y + 9), f(x + w - 8), f(y + 28), WK.kayuTua, 3, { z: -1 }),
  emo(`${id}-p`, f(x + w / 2), f(y + 8), E.pita, 16, { z: 2 }),
];
export const idMejaPesta = (id: string): string[] => [id, `${id}-k1`, `${id}-k2`, `${id}-p`];

/** Tali umbul-umbul `${id}-t` dengan `n` bendera segitiga kecil `${id}{i}` (kotak berwarna selang-seling). */
export function umbul(id: string, y: number, n = 9): Obj[] {
  const warna = ["#FCA5A5", "#FDE68A", "#93C5FD", "#86EFAC"];
  return [
    gs(`${id}-t`, 8, y, 292, y, WK.kayuTua, 1.6),
    ...Array.from({ length: n }, (_, i) => kotak(`${id}${i}`, f(18 + i * ((264 - 14) / (n - 1))), y + 1, 14, 12, warna[i % 4], W.biru, { rx: 2, tebal: 1 })),
  ];
}
export const idUmbul = (id: string, n = 9): string[] => [`${id}-t`, ...Array.from({ length: n }, (_, i) => `${id}${i}`)];

/* ------------------------------ Nampan kue ------------------------------ */

/** Nampan kue pojok kiri-atas (x, y), lebar w, tinggi 40: nampan `${id}` dan tiga kue `${id}-a`, `${id}-b`, `${id}-c`. Angka `${id}-n` dipasang dengan `angkaNampan`. */
export const nampan = (id: string, x: number, y: number, w: number, e: string): Obj[] => [
  kotak(id, x, y, w, 40, WK.nampan, WK.tepiNampan, { rx: 8, tebal: 2 }),
  emo(`${id}-a`, f(x + w * 0.22), f(y + 17), e, 16, { z: 1 }),
  emo(`${id}-b`, f(x + w * 0.5), f(y + 17), e, 16, { z: 1 }),
  emo(`${id}-c`, f(x + w * 0.78), f(y + 17), e, 16, { z: 1 }),
];
export const idNampan = (id: string, denganAngka = true): string[] => [id, `${id}-a`, `${id}-b`, `${id}-c`, ...(denganAngka ? [`${id}-n`] : [])];
/** Angka banyak kue di dalam nampan: `${id}-n`. */
export const angkaNampan = (id: string, x: number, y: number, w: number, angka: string | number, o: Opsi = {}): Obj => teks(`${id}-n`, f(x + w / 2), f(y + 36), String(angka), 13, W.merah, { z: 2, ...o });
/** Pindahkan nampan (dan angkanya) agar pojok kiri-atasnya di (x, y). */
export const geserNampan = (id: string, x: number, y: number, w: number): Ubah[] => [
  { id, x, y },
  { id: `${id}-a`, x: f(x + w * 0.22), y: f(y + 17) },
  { id: `${id}-b`, x: f(x + w * 0.5), y: f(y + 17) },
  { id: `${id}-c`, x: f(x + w * 0.78), y: f(y + 17) },
  { id: `${id}-n`, x: f(x + w / 2), y: f(y + 36) },
];

/** Kotak kue isi sepuluh: kotak `${id}` dan tulisan `${id}-t` ("10"). Pojok kiri-atas (x, y), 24 x 16. */
export const kotakSepuluh = (id: string, x: number, y: number): Obj[] => [
  kotak(id, x, y, 24, 16, WK.kotakKue, WK.kayuTua, { rx: 3, tebal: 1.4 }),
  teks(`${id}-t`, f(x + 12), f(y + 12), "10", 9, W.biru, { z: 1 }),
];
export const idKotakSepuluh = (id: string): string[] => [id, `${id}-t`];

/* ------------------------------ Sel dan tabel puluhan dan satuan ------------------------------ */

/** Sel tabel: kotak `${id}` dan teks `${id}t` (tidak ada bila isi kosong). */
export const sel = (id: string, x: number, y: number, w: number, h: number, isi: string, warna: string, u: number, tebal = 1.2): Obj[] => [
  kotak(id, x, y, w, h, warna, W.biru, { rx: 1, tebal }),
  ...(isi === "" ? [] : [teks(`${id}t`, f(x + w / 2), f(y + h / 2 + u * 0.35), isi, u, W.biru)]),
];

export type BarisPS = { nama: string; angka: string; p: string; s: string };
export const KOLOM_PS = [52, 44, 42, 42] as const;
export const TINGGI_PS = 17;
/**
 * Tabel puluhan dan satuan: kepala `${id}-h0` (Nampan), `-h1` (Bilangan), `-h2` (Puluhan), `-h3` (Satuan);
 * baris i: `${id}-r{i}a` (nama), `-r{i}b` (bilangan), `-r{i}c` (puluhan), `-r{i}d` (satuan); tiap sel kotak dengan teks `...t`.
 * Isi sel boleh kosong (tidak digambar teksnya). Pojok kiri-atas (x, y).
 */
export function tabelPS(id: string, x: number, y: number, baris: BarisPS[]): Obj[] {
  const h = TINGGI_PS;
  const xs = [x, x + KOLOM_PS[0], x + KOLOM_PS[0] + KOLOM_PS[1], x + KOLOM_PS[0] + KOLOM_PS[1] + KOLOM_PS[2]];
  const kepala = ["Nampan", "Bilangan", "Puluhan", "Satuan"];
  return [
    ...kepala.flatMap((n, c) => sel(`${id}-h${c}`, xs[c], y, KOLOM_PS[c], h, n, W.lavender, 8, 1.4)),
    ...baris.flatMap((b, i) => [b.nama, b.angka, b.p, b.s].flatMap((isi, c) => sel(`${id}-r${i}${"abcd"[c]}`, xs[c], y + h * (i + 1), KOLOM_PS[c], h, isi, W.putih, c === 0 ? 8.4 : 10))),
  ];
}
/** Teks isi sel baris i kolom c (0 sampai 3) pada tabel yang dibuat dengan baris berisi teks kosong: id `${id}-r{i}{a-d}t`. */
export const isiTabelPS = (id: string, x: number, y: number, i: number, c: number, isi: string, warna: string = W.biru): Obj => {
  const kiri = x + KOLOM_PS.slice(0, c).reduce((a, b) => a + b, 0);
  return teks(`${id}-r${i}${"abcd"[c]}t`, f(kiri + KOLOM_PS[c] / 2), f(y + TINGGI_PS * (i + 1) + TINGGI_PS / 2 + 3.5), isi, 10, warna);
};
/** Semua id sel (kotak dan teks) pada kolom c (0 sampai 3) dari tabel `n` baris, termasuk kepala. */
export const selKolom = (id: string, c: number, n: number): string[] => [`${id}-h${c}`, `${id}-h${c}t`, ...Array.from({ length: n }, (_, i) => [`${id}-r${i}${"abcd"[c]}`, `${id}-r${i}${"abcd"[c]}t`]).flat()];
export const idTabelPS = (id: string, n: number): string[] => [0, 1, 2, 3].flatMap((c) => selKolom(id, c, n));
/** Hanya kotak sel pada kolom c (untuk disorot). */
export const kotakKolom = (id: string, c: number, n: number): string[] => [`${id}-h${c}`, ...Array.from({ length: n }, (_, i) => `${id}-r${i}${"abcd"[c]}`)];

/* ------------------------------ Garis bilangan dan batang ------------------------------ */

/** Letak mendatar bilangan `n` pada garis bilangan yang membentang dari x ke x + w untuk bilangan awal sampai akhir. */
export const xBil = (x: number, w: number, awal: number, akhir: number, n: number): number => f(x + (w * (n - awal)) / (akhir - awal));

/**
 * Garis bilangan: sumbu `${id}-g`, tanda kecil `${id}-m{n}` tiap bilangan bulat, tanda besar `${id}-t{n}` dan angka `${id}-l{n}` tiap `tiap` bilangan.
 * Sumbu di tinggi y; angka di bawah sumbu.
 */
export function garisBilangan(id: string, x: number, y: number, w: number, awal: number, akhir: number, tiap = 5): Obj[] {
  const out: Obj[] = [gs(`${id}-g`, x - 6, y, x + w + 6, y, W.biru, 2.4)];
  for (let n = awal; n <= akhir; n += 1) {
    const px = xBil(x, w, awal, akhir, n);
    if (n % tiap === 0) {
      out.push(gs(`${id}-t${n}`, px, y - 6, px, y + 6, W.biru, 2.4), teks(`${id}-l${n}`, px, f(y + 18), String(n), 9, W.biru));
    } else out.push(gs(`${id}-m${n}`, px, y - 3, px, y + 3, W.abu, 1.4));
  }
  return out;
}
export const idGarisBilangan = (id: string, awal: number, akhir: number, tiap = 5): string[] => [
  `${id}-g`,
  ...Array.from({ length: akhir - awal + 1 }, (_, q) => awal + q).flatMap((n) => (n % tiap === 0 ? [`${id}-t${n}`, `${id}-l${n}`] : [`${id}-m${n}`])),
];
/** Titik penanda bilangan pada garis: bulatan `${id}` dan angka `${id}-n` di atasnya. */
export const titikBil = (id: string, px: number, y: number, angka: string, warna: string = W.merah): Obj[] => [
  bulat(id, px, y, 5, warna, W.biru, { tebal: 1.4, z: 2 }),
  teks(`${id}-n`, px, f(y - 10), angka, 11, warna, { z: 2 }),
];
export const idTitik = (id: string): string[] => [id, `${id}-n`];

/** Batang bilangan mendatar: kotak `${id}` selebar n * satuan dari x, tinggi 14, dan angka `${id}-n` di ujung kanannya. */
export const batang = (id: string, x: number, y: number, n: number, satuan: number, warna: string, angka = true): Obj[] => [
  kotak(id, x, y, f(n * satuan), 14, warna, W.biru, { rx: 2, tebal: 1.6 }),
  ...(angka ? [teks(`${id}-n`, f(x + n * satuan + 10), f(y + 11), String(n), 10, W.biru)] : []),
];
export const idBatang = (id: string, angka = true): string[] => [id, ...(angka ? [`${id}-n`] : [])];

/** Kalimat bandingan: tiga teks `${id}0`, `${id}1`, `${id}2` (kiri, tanda, kanan) berpusat di x, jarak `jarak`. */
export function bandingan(id: string, x: number, y: number, kiri: string, tanda: string, kanan: string, u = 22, jarak = 40): Obj[] {
  return [teks(`${id}0`, f(x - jarak), y, kiri, u, W.biru), teks(`${id}1`, x, y, tanda, u + 4, W.merah), teks(`${id}2`, f(x + jarak), y, kanan, u, W.biru)];
}
export const idBandingan = (id: string): string[] => [`${id}0`, `${id}1`, `${id}2`];
