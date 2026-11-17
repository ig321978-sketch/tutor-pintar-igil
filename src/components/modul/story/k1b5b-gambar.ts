import type { Obj } from "./logika-story";
import { E as E_5A, ikan } from "./k1b5a-gambar";
import { W, bulat, garis, kotak, teks, type Titik } from "./k1b4a-gambar";

/**
 * Gambar khusus Story Kelas 1 Bab 5 Sub-Bab B "Rak Akuarium Bernomor" (menghitung maju dan mundur), lanjutan Akuarium Ikan Hias Abang.
 * Rak kayu dua tingkat berisi dua puluh akuarium kecil: kaca `aq{n}`, air `ai{n}`, ikan `f{n}`, lampu `lm{n}`, gantungan label `tg{n}`,
 * dan nomor `no{n}` (n = 1 sampai 20; atas 1 sampai 10, bawah 11 sampai 20). Pakan ditabur sebagai butir `pk{n}` dan `pk{n}x`.
 * Juga: akuarium besar untuk sebelum dan sesudah, kisi dua baris sepuluh, garis lompat nol sampai dua puluh dengan busur lompatan,
 * dan tiga kotak sebelum, pilihan, sesudah. Bentuk dasar ikan memakai ulang `ikan` dari Sub-Bab A.
 */

export { W, bulat, emo, garis, judul, kartu, kotak, orang, teks, type Titik } from "./k1b4a-gambar";
export { ikan } from "./k1b5a-gambar";

export const E = {
  ...E_5A,
  senter: "\u{1F526}",
  lap: "\u{1F9FD}",
  belanja: "\u{1F6CD}\u{FE0F}",
  tunjuk: "\u{1F446}",
} as const;

export const WARNA = {
  kayu: "#B45309",
  kayuMuda: "#F5D0A9",
  kaca: "#0E7490",
  air: "#A5F3FC",
  airTua: "#67E8F9",
  lampuMati: "#94A3B8",
  lampuNyala: "#FDE047",
  pakan: "#92400E",
} as const;
const WARNA_IKAN_RAK = ["#FB923C", "#F472B6", "#FACC15", "#22D3EE", "#A78BFA", "#34D399", "#F59E0B"];

const f = (n: number): number => Number(n.toFixed(1));
type Ubah = Partial<Obj> & { id: string };

/* ------------------------------ Rak dua tingkat ------------------------------ */

/** Ukuran rak: akuarium kecil selebar `w`, tinggi `h`, berjarak `dx`; tingkat atas mulai `yAtas`, tingkat bawah `yBawah`. */
export const RAK = { x0: 12, dx: 28, w: 24, h: 22, yAtas: 44, yBawah: 110 } as const;
/** Pojok kiri-atas akuarium bernomor n (1 sampai 20). */
export const posAq = (n: number): Titik => ({ x: RAK.x0 + ((n - 1) % 10) * RAK.dx, y: n > 10 ? RAK.yBawah : RAK.yAtas });
/** Tengah mendatar akuarium n. */
export const cxAq = (n: number): number => posAq(n).x + RAK.w / 2;
/** Tinggi tulisan nomor di gantungan label akuarium n. */
export const yNomor = (n: number): number => posAq(n).y + RAK.h + 16.5;
/** Tinggi penunjuk (pakan atau senter) di atas akuarium n. */
export const yPenunjuk = (n: number): number => posAq(n).y - 9;

/** Kayu rak: papan atas `${id}-pa`, papan bawah `${id}-pb`, tiang kiri `${id}-tk`, tiang kanan `${id}-tn`. */
export const rakKayu = (id: string): Obj[] => [
  kotak(`${id}-tk`, 4, 36, 5, 120, WARNA.kayu, W.coklat, { rx: 2, tebal: 1.2, z: -5 }),
  kotak(`${id}-tn`, 291, 36, 5, 120, WARNA.kayu, W.coklat, { rx: 2, tebal: 1.2, z: -5 }),
  kotak(`${id}-pa`, 6, RAK.yAtas + RAK.h, 288, 5, WARNA.kayuMuda, W.coklat, { rx: 2, tebal: 1.4, z: -4 }),
  kotak(`${id}-pb`, 6, RAK.yBawah + RAK.h, 288, 5, WARNA.kayuMuda, W.coklat, { rx: 2, tebal: 1.4, z: -4 }),
];

/** Satu akuarium kecil n: kaca, air, ikan, lampu mati. */
export const akuariumKecil = (n: number): Obj[] => {
  const p = posAq(n);
  return [
    kotak(`aq${n}`, p.x, p.y, RAK.w, RAK.h, "#ECFEFF", WARNA.kaca, { rx: 3, tebal: 1.6, z: -3 }),
    kotak(`ai${n}`, p.x + 2, p.y + 6, RAK.w - 4, RAK.h - 8, WARNA.air, undefined, { rx: 2, z: -2 }),
    ...ikan(`f${n}`, p.x + 12, p.y + 14, WARNA_IKAN_RAK[n % WARNA_IKAN_RAK.length], 0.42),
    bulat(`lm${n}`, p.x + 12, p.y - 3, 3, WARNA.lampuMati, W.biru, { tebal: 1 }),
  ];
};
/** Gantungan label `tg{n}` dan nomor `no{n}` di bawah papan. */
export const labelNomor = (n: number): Obj[] => [
  kotak(`tg${n}`, cxAq(n) - 10, posAq(n).y + RAK.h + 7, 20, 12, W.putih, W.biru, { rx: 3, tebal: 1.2, z: -1 }),
  teks(`no${n}`, cxAq(n), yNomor(n), String(n), 8, W.biru),
];
/** Nomor dari `dari` sampai `sampai`. */
export const rentang = (dari: number, sampai: number): number[] =>
  dari <= sampai ? Array.from({ length: sampai - dari + 1 }, (_, i) => dari + i) : Array.from({ length: dari - sampai + 1 }, (_, i) => dari - i);
/** Rak lengkap: kayu, dua puluh akuarium, dan label nomor (kecuali yang disebut di `tanpaLabel`). */
export const rakLengkap = (tanpaLabel: number[] = []): Obj[] => [
  ...rakKayu("rk"),
  ...rentang(1, 20).flatMap(akuariumKecil),
  ...rentang(1, 20).filter((n) => !tanpaLabel.includes(n)).flatMap(labelNomor),
];
/** Butir pakan di permukaan air akuarium n: `pk{n}` dan `pk{n}x`. */
export const pakan = (n: number): Obj[] => {
  const p = posAq(n);
  return [bulat(`pk${n}`, p.x + 8, p.y + 7, 1.8, WARNA.pakan, undefined, { z: 2 }), bulat(`pk${n}x`, p.x + 15, p.y + 8, 1.8, WARNA.pakan, undefined, { z: 2 })];
};
/** Nyalakan lampu akuarium. */
export const nyala = (n: number): Ubah => ({ id: `lm${n}`, warna: WARNA.lampuNyala, garis: W.oranye });

/* ------------------------------ Akuarium besar dan label gantung ------------------------------ */

/** Akuarium besar `${id}` (pojok kiri-atas x, y) berair `${id}-a`, ikan `${id}-f`, dan label besar `${id}-l` bertulis `${id}-n`. */
export const akuariumBesar = (id: string, x: number, y: number, w: number, h: number, isi: string, warnaIkan: string): Obj[] => [
  kotak(id, x, y, w, h, "#ECFEFF", WARNA.kaca, { rx: 6, tebal: 2.4, z: -3 }),
  kotak(`${id}-a`, x + 4, y + 12, w - 8, h - 16, WARNA.air, undefined, { rx: 4, z: -2 }),
  ...ikan(`${id}-f`, x + w / 2, y + h / 2 + 4, warnaIkan, 1),
  kotak(`${id}-l`, x + w / 2 - 18, y + h + 6, 36, 22, W.putih, W.biru, { rx: 5, tebal: 1.6, z: -1 }),
  teks(`${id}-n`, x + w / 2, y + h + 23, isi, 15, W.biru),
];

/* ------------------------------ Kisi dua baris sepuluh ------------------------------ */

/** Kisi 1 sampai 20: sel `${id}c{n}` dan angka `${id}a{n}` (kecuali `tanpa`). Pojok kiri-atas (x, y), sisi sel s. */
export const selKisi = (x: number, y: number, n: number, s: number): Titik => ({ x: x + ((n - 1) % 10) * s, y: y + (n > 10 ? s : 0) });
export function kisi(id: string, x: number, y: number, s: number, warnaAtas: string, warnaBawah: string, tanpa: number[] = [], u = 10): Obj[] {
  const out: Obj[] = [];
  for (const n of rentang(1, 20)) {
    const p = selKisi(x, y, n, s);
    out.push(kotak(`${id}c${n}`, p.x, p.y, s, s, n > 10 ? warnaBawah : warnaAtas, W.biru, { rx: 0, tebal: 1.3, z: -1 }));
    if (!tanpa.includes(n)) out.push(teks(`${id}a${n}`, f(p.x + s / 2), f(p.y + s / 2 + u * 0.36), String(n), u, W.biru));
  }
  return out;
}
/** Angka sel n pada kisi. */
export const angkaKisi = (id: string, x: number, y: number, s: number, n: number, warna: string = W.merah, u = 10): Obj => {
  const p = selKisi(x, y, n, s);
  return teks(`${id}a${n}`, f(p.x + s / 2), f(p.y + s / 2 + u * 0.36), String(n), u, warna);
};

/* ------------------------------ Garis lompat ------------------------------ */

/** Garis lompat 0 sampai 20: garis `${id}`, takik `${id}-g{n}`, angka `${id}-a{n}`. */
export const LOMPAT = { x0: 20, dx: 13, y: 124 } as const;
export const xLompat = (n: number): number => LOMPAT.x0 + n * LOMPAT.dx;
export function garisLompat(id: string): Obj[] {
  const out: Obj[] = [garis(id, LOMPAT.x0 - 8, LOMPAT.y, LOMPAT.dx * 20 + 16, 0, W.biru, 2)];
  for (let n = 0; n <= 20; n += 1)
    out.push(garis(`${id}-g${n}`, xLompat(n), LOMPAT.y - 4, 0, 8, W.biru, 1.4), teks(`${id}-a${n}`, xLompat(n), LOMPAT.y + 15, String(n), 7, n % 5 === 0 ? W.merah : W.biru));
  return out;
}
/** Busur lompatan dari bilangan `dari` ke tetangganya (maju ke kanan atau mundur ke kiri), tergambar bertahap. */
export const busur = (id: string, dari: number, maju: boolean): Obj => ({
  id,
  t: "jalur",
  x: xLompat(dari),
  y: LOMPAT.y - 3,
  d: maju ? `M0 0 Q${f(LOMPAT.dx / 2)} -16 ${LOMPAT.dx} 0` : `M0 0 Q${f(-LOMPAT.dx / 2)} -16 ${-LOMPAT.dx} 0`,
  warna: "none",
  garis: maju ? W.merah : W.ungu,
  tebal: 2,
  gambar: true,
  z: 2,
});
/** Ikan penanda `${id}` di atas bilangan n. */
export const ikanLompat = (id: string, n: number, warna: string): Obj[] => ikan(id, xLompat(n), LOMPAT.y - 24, warna, 0.6);
export const geserIkanLompat = (id: string, n: number): Ubah[] => [
  { id, x: xLompat(n), y: LOMPAT.y - 24 },
  { id: `${id}-m`, x: f(xLompat(n) + 3), y: f(LOMPAT.y - 24 - 0.9) },
];

/* ------------------------------ Tiga kotak sebelum dan sesudah ------------------------------ */

/** Tiga kotak berjajar: kotak `${id}{0|1|2}` (kiri, tengah, kanan) dan isi `${id}{i}n`. */
export const TIGA = { x: [26, 112, 198], y: 74, w: 76, h: 54 } as const;
export const tigaKotak = (id: string, warna: [string, string, string] = [W.langit, W.krem, W.hijauMuda]): Obj[] =>
  [0, 1, 2].map((i) => kotak(`${id}${i}`, TIGA.x[i], TIGA.y, TIGA.w, TIGA.h, warna[i], W.biru, { rx: 8, tebal: 2, z: -1 }));
export const isiKotak = (id: string, i: number, isi: string, warna: string = W.biru): Obj => teks(`${id}${i}n`, TIGA.x[i] + TIGA.w / 2, TIGA.y + TIGA.h / 2 + 8, isi, 22, warna);
export const judulKotak = (id: string, i: number, isi: string): Obj => teks(`${id}${i}j`, TIGA.x[i] + TIGA.w / 2, TIGA.y - 8, isi, 9, W.ungu);
