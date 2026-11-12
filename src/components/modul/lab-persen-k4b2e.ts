/**
 * Lab Persen (Kelas 4 Bab 2, Sub-Bab E: Desimal Perseratusan dan Persen): logika murni. Satu alat, tiga tampilan.
 *  Kisi   : k kotak dari 100 diarsir = k/100 = 0,kk = k%. Persen artinya per seratus.
 *  Ubah   : desimal ke persen (cara biasa lewat pecahan per seratus, cara langsung kali 100% atau geser koma dua kali)
 *           dan persen ke desimal. Boleh lebih dari 100% (2,46 = 246%).
 *  Cerita : a dari b ditulis per seratus dengan mengubah penyebut (b yang membagi 100), lalu menjadi persen.
 * Semua DISUSUN dari bilangan bulat ratusan (hasil bagi dan sisa), tanpa bilangan pecahan mesin: tidak ada kesalahan pembulatan.
 * Murni: tanpa React, tanpa jaringan, tanpa impor. Diuji di scripts/uji-lab-k4b2.mjs.
 */

export const MIN_K = 1;
export const MAKS_K = 100;
export const MIN_P = 1;
export const MAKS_P = 300;

const dua = (n: number): string => String(n).padStart(2, "0");

/** Desimal dari bilangan seratusan h (h = 246 berarti 2,46). */
export const desimalSeratusan = (h: number): string => `${Math.trunc(h / 100)},${dua(h % 100)}`;
export const persenTeks = (h: number): string => `${h}%`;

/** Cerita persen: a dari b, dengan b membagi 100 sehingga penyebut bisa diubah menjadi 100. */
export const CERITA_E: { id: string; a: number; b: number; nama: string }[] = [
  { id: "olahraga", a: 20, b: 50, nama: "20 dari 50 siswa ikut olahraga" },
  { id: "buku", a: 3, b: 20, nama: "3 dari 20 buku bersampul biru" },
  { id: "kue", a: 9, b: 25, nama: "9 dari 25 kue berisi cokelat" },
];

/** Pengali penyebut agar menjadi 100 (100 dibagi b, harus bilangan bulat). */
export const pengaliSeratus = (b: number): number => (100 % b === 0 ? 100 / b : 0);

export type CaraE = "biasa" | "langsung";
export type ArahE = "persen" | "desimal";

export function langkahCara(h: number, cara: CaraE, arah: ArahE): string[] {
  const d = desimalSeratusan(h);
  if (arah === "persen") {
    return cara === "biasa" ? [`${d} = ${h}/100`, `${h}/100 = ${h}%`] : [`${d} × 100% = ${h}%`, `Geser koma dua kali ke kanan: ${d} menjadi ${h}, lalu tulis tanda persen.`];
  }
  return cara === "biasa" ? [`${h}% = ${h}/100`, `${h}/100 = ${d}`] : [`${h}% : 100 = ${d}`, `Geser koma dua kali ke kiri: ${h} menjadi ${d}.`];
}

export function kalimatKisi(k: number): string {
  return `${k} kotak dari 100 = ${k}/100 = ${desimalSeratusan(k)} = ${k}%. Persen artinya per seratus.`;
}

export function kalimatCerita(i: number): string {
  const { a, b } = CERITA_E[i];
  const f = pengaliSeratus(b);
  return `Kalikan pembilang dan penyebut dengan ${f}: ${a}/${b} = ${a * f}/100 = ${a * f}%.`;
}

/* ------------------------------ Keadaan ------------------------------ */

export type StateTersusunE = {
  k: number;
  h: number;
  cara: CaraE;
  arah: ArahE;
  c: number;
  cUbah: boolean;
  pernah: string[];
  pesan: string;
};
export type StatePersenK4B2E = StateTersusunE;

export type AksiPersenK4B2E =
  | { t: "K"; d: 1 | -1 | 10 | -10 }
  | { t: "H"; d: 1 | -1 | 10 | -10 }
  | { t: "K_SET"; k: number }
  | { t: "H_SET"; h: number }
  | { t: "CARA"; cara: CaraE }
  | { t: "ARAH"; arah: ArahE }
  | { t: "CERITA"; i: number }
  | { t: "UBAH_PENYEBUT" }
  | { t: "PESAN_KOSONG" }
  | { t: "RESET" };

export const awalPersenK4B2E = (): StatePersenK4B2E => ({ k: 36, h: 75, cara: "biasa", arah: "persen", c: 0, cUbah: false, pernah: [], pesan: "" });

const tambah = (daftar: string[], id: string): string[] => (daftar.includes(id) ? daftar : [...daftar, id]);

function catatUbah(x: StatePersenK4B2E): StatePersenK4B2E {
  let p = tambah(x.pernah, x.arah === "persen" ? `cara:${x.h}:${x.cara}` : `ke-desimal:${x.h}`);
  if (x.arah === "persen") {
    p = tambah(p, `ke-persen:${x.h}`);
    if (x.h > 100) p = tambah(p, `lebih:${x.h}`);
  }
  const l = langkahCara(x.h, x.cara, x.arah);
  return { ...x, pernah: p, pesan: x.cara === "biasa" ? `✅ ${l[0]}, lalu ${l[1]}.` : `✅ ${l[0]}. ${l[1]}` };
}

export function langkahPersenK4B2E(x: StatePersenK4B2E, a: AksiPersenK4B2E): StatePersenK4B2E {
  switch (a.t) {
    case "K": {
      const v = x.k + a.d;
      if (v < MIN_K || v > MAKS_K) return { ...x, pesan: `Kotak yang diarsir ${MIN_K} sampai ${MAKS_K}.` };
      return { ...x, k: v, pernah: tambah(x.pernah, `kisi:${v}`), pesan: `✅ ${kalimatKisi(v)}` };
    }
    case "K_SET": {
      if (!Number.isInteger(a.k) || a.k < MIN_K || a.k > MAKS_K) return x;
      return { ...x, k: a.k, pernah: tambah(x.pernah, `kisi:${a.k}`), pesan: `✅ ${kalimatKisi(a.k)}` };
    }
    case "H_SET":
      if (!Number.isInteger(a.h) || a.h < MIN_P || a.h > MAKS_P) return x;
      return catatUbah({ ...x, h: a.h });
    case "H": {
      const v = x.h + a.d;
      if (v < MIN_P || v > MAKS_P) return { ...x, pesan: `Bilangan ${MIN_P} sampai ${MAKS_P} (boleh lebih dari 100%).` };
      return catatUbah({ ...x, h: v });
    }
    case "CARA":
      return catatUbah({ ...x, cara: a.cara });
    case "ARAH":
      return catatUbah({ ...x, arah: a.arah });
    case "CERITA":
      if (a.i < 0 || a.i >= CERITA_E.length) return x;
      return { ...x, c: a.i, cUbah: false, pesan: "" };
    case "UBAH_PENYEBUT": {
      const f = pengaliSeratus(CERITA_E[x.c].b);
      if (f === 0) return { ...x, pesan: "Penyebut ini tidak membagi 100." };
      return { ...x, cUbah: true, pernah: tambah(x.pernah, `cerita:${x.c}`), pesan: `✅ ${kalimatCerita(x.c)}` };
    }
    case "PESAN_KOSONG":
      return { ...x, pesan: "" };
    case "RESET":
      return awalPersenK4B2E();
  }
}

/* ------------------------------ Laporan dan ucapan ------------------------------ */

export type KeadaanPersenK4B2E = { alat: "persen"; pernah: string[] };
export const keadaanPersenK4B2E = (x: StatePersenK4B2E): KeadaanPersenK4B2E => ({ alat: "persen", pernah: x.pernah });

export const ucapKisiK4B2E = (x: StatePersenK4B2E): string => `Kisi seratus kotak, ${x.k} kotak diarsir. ${kalimatKisi(x.k)}`;
export const ucapUbahK4B2E = (x: StatePersenK4B2E): string =>
  x.arah === "persen" ? `Ubah ${desimalSeratusan(x.h)} menjadi persen. ${langkahCara(x.h, x.cara, "persen").join(" ")}` : `Ubah ${x.h}% menjadi desimal. ${langkahCara(x.h, x.cara, "desimal").join(" ")}`;
export const ucapCeritaK4B2E = (x: StatePersenK4B2E): string => `${CERITA_E[x.c].nama}. ${x.cUbah ? kalimatCerita(x.c) : "Ubah penyebutnya menjadi seratus."}`;
