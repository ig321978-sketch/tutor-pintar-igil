import type { Aksi, Obj } from "./logika-story";
import { bersih, tambah } from "./k4b1i-bantu";

/**
 * Gambar khusus Story Kelas 4 Bab 1 Sub-Bab I (Faktor dan Kelipatan, penutup bab): kelompok pensil, kotak kelereng per hari, deret kotak bilangan dan busur loncatan,
 * garis bilangan, dan kisi saringan 1 sampai 40. Berkas ini TIDAK dipakai sub-bab lain. Semua fungsi mengembalikan data benda (Obj) untuk mesin Story.
 */

export const W = {
  biru: "#1C01A5",
  emas: "#FFC800",
  merah: "#DC2626",
  hijau: "#16A34A",
  putih: "#FFFFFF",
  hitam: "#1F2937",
  abu: "#CBD5E1",
  ungu: "#7C3AED",
  coklat: "#92400E",
  krem: "#FEF9C3",
  langit: "#DBEAFE",
  jingga: "#FDBA74",
  merahMuda: "#FECACA",
  hijauMuda: "#DCFCE7",
  pink: "#FBCFE8",
};

type Opsi = Partial<Obj>;
type At = string | number | undefined;

export const teks = (id: string, x: number, y: number, isi: string, u = 10, warna: string = W.biru, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi, u, warna, ...o });
export const kotak = (id: string, x: number, y: number, w: number, h: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "kotak", x, y, w, h, warna, garis, rx: 3, tebal: 1.5, ...o });
export const bulat = (id: string, x: number, y: number, r: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "bulat", x, y, r, warna, garis, tebal: 1.5, ...o });
export const garis = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "garis", x, y, x2, y2, warna, tebal, ...o });
export const panah = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "panah", x, y, x2, y2, warna, tebal, ...o });
export const emo = (id: string, x: number, y: number, e: string, u = 22, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi: e, u, warna: W.biru, ...o });
export const jalur = (id: string, x: number, y: number, d: string, warna: string, garisW: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "jalur", x, y, d, warna, garis: garisW, tebal: 1.2, ...o });

/** Judul adegan di tengah atas. */
export const judul = (isi: string, warna: string = W.ungu): Obj => teks("jud", 150, 18, isi, 11, warna);

const r1 = (n: number): number => Math.round(n * 10) / 10;

/** Kartu berwarna dengan satu sampai tiga baris teks, pojok kiri-atas (x, y). */
export function kartu(id: string, x: number, y: number, w: number, h: number, warna: string, baris: string[], u = 8.6, o: Opsi = {}): Obj[] {
  const mulai = y + h / 2 - ((baris.length - 1) * (u + 3)) / 2 + u * 0.35;
  return [kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 8, ...o }), ...baris.map((b, i) => teks(`${id}-t${i}`, x + w / 2, mulai + i * (u + 3), b, u, W.biru, o))];
}

/** Tabel sederhana: baris pertama kepala. Id sel `${id}-s{r}{c}` (kotak) dan `${id}-t{r}{c}` (teks). */
export function tabel(id: string, x: number, y: number, kolW: number[], baris: string[][], tinggi = 16, u = 8, warnaKepala: string = W.krem, o: Opsi = {}): Obj[] {
  const out: Obj[] = [];
  baris.forEach((b, r) => {
    let px = x;
    b.forEach((isi, c) => {
      out.push(kotak(`${id}-s${r}${c}`, px, y + r * tinggi, kolW[c], tinggi, r === 0 ? warnaKepala : W.putih, W.biru, { rx: 0, tebal: 1, ...o }));
      if (isi) out.push(teks(`${id}-t${r}${c}`, px + kolW[c] / 2, y + r * tinggi + tinggi / 2 + u * 0.35, isi, u, W.biru, o));
      px += kolW[c];
    });
  });
  return out;
}

/** Benda sebuah baris tabel (kotak dan teks) menurut nomor baris, untuk dimunculkan satu per satu. */
export const barisTabel = (objs: Obj[], id: string, r: number): Obj[] => objs.filter((o) => new RegExp(`^${id}-[st]${r}\\d$`).test(o.id));

/** Id semua benda dari daftar (untuk hapus atau ubah sekaligus). */
export const idDari = (objs: Obj[]): string[] => objs.map((o) => o.id);

export type ItemDaftar = { at: At; t: string; w?: string; u?: number };

/** Layar daftar kartu selebar kanvas (bersih lalu judul lalu kartu satu per satu). Id kartu `${id}{n}-k` dan `${id}{n}-t0`. */
export function daftar(id: string, jud: string, items: ItemDaftar[], o: { x?: number; y?: number; lebar?: number; tinggi?: number; jarak?: number; warnaJudul?: string } = {}): Aksi[] {
  const x = o.x ?? 12;
  const y = o.y ?? 34;
  const lebar = o.lebar ?? 276;
  const tinggi = o.tinggi ?? (items.length <= 4 ? 30 : 26);
  const jarak = o.jarak ?? 8;
  return [bersih(0), tambah(0, judul(jud, o.warnaJudul)), ...items.map((it, i) => tambah(it.at, ...kartu(`${id}${i}`, x, y + i * (tinggi + jarak), lebar, tinggi, it.w ?? W.krem, [it.t], it.u ?? 9)))];
}

/* ------------------------------ Deret kotak bilangan dan busur loncatan ------------------------------ */

export type OpsiDeret = { bw?: number; bh?: number; gap?: number; u?: number; warna?: string };

/**
 * Deret kotak bilangan seperti rak di Buku Siswa: kotak `${id}-b{i}` dan angkanya `${id}-n{i}`. Nilai "?" berarti kotak kosong yang harus diisi.
 * (x, y) pojok kiri-atas kotak pertama.
 */
export function deret(id: string, x: number, y: number, nilai: string[], o: OpsiDeret = {}): Obj[] {
  const bw = o.bw ?? 34;
  const bh = o.bh ?? 26;
  const gap = o.gap ?? 8;
  const u = o.u ?? 11;
  const out: Obj[] = [];
  nilai.forEach((v, i) => {
    const kosong = v === "?";
    const px = x + i * (bw + gap);
    out.push(kotak(`${id}-b${i}`, px, y, bw, bh, kosong ? W.krem : o.warna ?? W.langit, kosong ? W.merah : W.biru, { rx: 4, tebal: 1.4 }));
    out.push(teks(`${id}-n${i}`, px + bw / 2, y + bh / 2 + u * 0.35, v, u, kosong ? W.merah : W.biru));
  });
  return out;
}

/** Lebar seluruh deret n kotak. */
export const lebarDeret = (n: number, o: OpsiDeret = {}): number => n * (o.bw ?? 34) + (n - 1) * (o.gap ?? 8);

/** Mengisi kotak ke-i pada deret `id` dengan nilai (warna hijau): untuk dipanggil pada kata tertentu. */
export const isiKotak = (at: At, id: string, i: number, nilai: string, warna: string = W.hijau): Aksi => ({
  at,
  ubah: [
    { id: `${id}-b${i}`, warna: W.hijauMuda, garis: warna },
    { id: `${id}-n${i}`, isi: nilai, warna },
  ],
});

/**
 * Busur loncatan dari kotak ke-i ke kotak ke-(i+1) pada deret `id` yang berpojok (x, y): busur `${id}-j{i}`, kepala `${id}-h{i}`, tulisan beda `${id}-l{i}`.
 * Busur melengkung di atas deret setinggi `tinggi`; tulisan di atas puncak busur.
 */
export function busur(id: string, x: number, y: number, i: number, label: string, o: OpsiDeret & { tinggi?: number; warna?: string } = {}): Obj[] {
  const bw = o.bw ?? 34;
  const gap = o.gap ?? 8;
  const tinggi = o.tinggi ?? 12;
  const warna = o.warna ?? (label.startsWith("−") ? W.merah : W.hijau);
  const x1 = x + i * (bw + gap) + bw / 2;
  const dx = bw + gap;
  return [
    jalur(`${id}-j${i}`, r1(x1), y - 1, `M0 0 Q${r1(dx / 2)} ${-2 * tinggi} ${r1(dx)} 0`, "none", warna, { tebal: 1.8, gambar: true }),
    panah(`${id}-h${i}`, r1(x1 + dx - 3), y - 6, 3, 5, warna, 1.2),
    teks(`${id}-l${i}`, r1(x1 + dx / 2), y - tinggi - 3, label, 9, warna),
  ];
}

/** Semua busur sebuah deret: labels[i] untuk loncatan dari kotak i ke i+1. Mengembalikan daftar benda per busur (untuk dimunculkan bertahap). */
export function busurSemua(id: string, x: number, y: number, labels: string[], o: OpsiDeret & { tinggi?: number } = {}): Obj[][] {
  return labels.map((l, i) => busur(id, x, y, i, l, o));
}

/* ------------------------------ Garis bilangan ------------------------------ */

export type GarisBil = { objs: Obj[]; px: (v: number) => number };

/** Garis bilangan dari `dari` sampai `sampai` selebar `lebar`, berpojok kiri (x, y). Garis `${id}-g`, goresan `${id}-s`. Tidak memberi angka; pakai titikBil. */
export function garisBilangan(id: string, x: number, y: number, lebar: number, dari: number, sampai: number): GarisBil {
  const s = lebar / (sampai - dari);
  const px = (v: number): number => r1(x + (v - dari) * s);
  const gores: string[] = [];
  for (let v = dari; v <= sampai; v += 1) gores.push(`M${r1((v - dari) * s)} -3 L${r1((v - dari) * s)} 3`);
  return { objs: [garis(`${id}-g`, x, y, lebar, 0, W.hitam, 1.6), jalur(`${id}-s`, x, y, gores.join(" "), "none", W.hitam, { tebal: 0.8 })], px };
}

/** Titik bernomor pada garis bilangan: bulatan `${id}-p` dan angka `${id}-v` di bawah garis. */
export const titikBil = (id: string, px: number, y: number, v: string, warna: string = W.biru): Obj[] => [bulat(`${id}-p`, px, y, 4.2, warna, W.putih, { tebal: 1 }), teks(`${id}-v`, px, y + 15, v, 9, warna)];

/** Busur loncatan di atas garis bilangan dari px1 ke px2 (ke kanan atau ke kiri): busur `${id}-j`, kepala `${id}-h`, tulisan `${id}-l`. */
export function loncat(id: string, y: number, px1: number, px2: number, label: string, tinggi = 18, warna?: string): Obj[] {
  const w = warna ?? (label.startsWith("−") ? W.merah : W.hijau);
  const dx = r1(px2 - px1);
  const arah = dx >= 0 ? 1 : -1;
  return [
    jalur(`${id}-j`, px1, y - 4, `M0 0 Q${r1(dx / 2)} ${-2 * tinggi} ${dx} 0`, "none", w, { tebal: 1.8, gambar: true }),
    panah(`${id}-h`, r1(px2 - 3 * arah), y - 9, 3 * arah, 5, w, 1.2),
    teks(`${id}-l`, r1(px1 + dx / 2), y - tinggi - 7, label, 9, w),
  ];
}

/* ------------------------------ Pemunculan bertahap ------------------------------ */

/** Kotak dan angka ke-i pada deret. */
export const suku = (objs: Obj[], i: number): Obj[] => objs.filter((o) => o.id.endsWith(`-b${i}`) || o.id.endsWith(`-n${i}`));

/**
 * Memunculkan deret dan busurnya pada kata tertentu: `kotakAt[i]` memicu kotak ke-i, `busurAt[j]` memicu busur ke-j; `null` berarti tidak dimunculkan di sini
 * (misalnya kotak yang baru muncul di ketukan berikutnya).
 */
export function muncul(d: Obj[], busurObjs: Obj[][], kotakAt: (At | null)[], busurAt: (At | null)[] = []): Aksi[] {
  const out: Aksi[] = [];
  kotakAt.forEach((a, i) => {
    if (a !== null) out.push(tambah(a, ...suku(d, i)));
  });
  busurAt.forEach((a, j) => {
    if (a !== null && busurObjs[j]) out.push(tambah(a, ...busurObjs[j]));
  });
  return out;
}

/* ------------------------------ Pensil dibagi rata (Ayo Mengamati faktor) ------------------------------ */

const PASTEL = ["#FEF9C3", "#DBEAFE", "#DCFCE7", "#FBCFE8", "#FED7AA", "#E9D5FF"];

/**
 * Pensil dibagi rata kepada `orang` anak: bingkai tiap anak `${id}-g{i}`, pensil `${id}-c{q}` (total semuanya). (x, y) pojok kiri-atas, lebar seluruh barisan w.
 * Tiap anak mendapat total / orang pensil, tersusun rapi dalam bingkainya.
 */
export function bagiBenda(id: string, x: number, y: number, total: number, orang: number, w: number): Obj[] {
  const out: Obj[] = [];
  const gap = 4;
  const fw = r1((w - (orang - 1) * gap) / orang);
  const m = total / orang;
  const kol = Math.max(1, Math.min(m, Math.floor((fw - 4) / 8)));
  const baris = Math.ceil(m / kol);
  const fh = baris * 15 + 8;
  let q = 0;
  for (let i = 0; i < orang; i += 1) {
    const fx = r1(x + i * (fw + gap));
    out.push(kotak(`${id}-g${i}`, fx, y, fw, fh, PASTEL[i % PASTEL.length], W.biru, { rx: 5, tebal: 1.2 }));
    for (let j = 0; j < m; j += 1) {
      const c = j % kol;
      const b = Math.floor(j / kol);
      const px = r1(fx + fw / 2 - (kol * 8) / 2 + c * 8 + 2.3);
      out.push(kotak(`${id}-c${q++}`, px, r1(y + 5 + b * 15), 3.4, 11, W.emas, W.coklat, { rx: 1, tebal: 0.8 }));
    }
  }
  return out;
}

/* ------------------------------ Kelereng per hari (Karel dan Slamet) ------------------------------ */

/**
 * Deret `hari` kotak hari, tiap kotak berisi `per` kelereng: kotak `${id}-h{i}`, nomor hari `${id}-d{i}`, kelereng `${id}-c{q}`. (x, y) pojok kiri-atas.
 * Kotak berlebar 34 berjarak 4.
 */
export function hariBenda(id: string, x: number, y: number, hari: number, per: number, warna = "#38BDF8"): Obj[] {
  const out: Obj[] = [];
  let q = 0;
  for (let i = 0; i < hari; i += 1) {
    const bx = r1(x + i * 38);
    out.push(kotak(`${id}-h${i}`, bx, y, 34, 42, W.putih, W.biru, { rx: 4, tebal: 1.2 }));
    out.push(teks(`${id}-d${i}`, r1(bx + 17), y + 10, `ke-${i + 1}`, 8, W.biru));
    const pos: [number, number][] = per === 2 ? [[-8, 26], [8, 26]] : [[-8, 24], [8, 24], [0, 35]];
    for (const [dx, dy] of pos) out.push(bulat(`${id}-c${q++}`, r1(bx + 17 + dx), y + dy, 5.6, warna, W.biru, { tebal: 1 }));
  }
  return out;
}

/** Benda sebuah kotak hari ke-i (kotak, nomor, dan kelerengnya) pada gambar hariBenda. */
export const hariKe = (objs: Obj[], id: string, i: number, per: number): Obj[] =>
  objs.filter((o) => o.id === `${id}-h${i}` || o.id === `${id}-d${i}` || new RegExp(`^${id}-c(\d+)$`).test(o.id) && Math.floor(Number(o.id.slice(id.length + 2)) / per) === i);

/* ------------------------------ Kisi saringan 1 sampai n ------------------------------ */

export const WARNA_CORET = "#CBD5E1";
export const WARNA_PRIMA = "#BBF7D0";

/** Kisi bilangan 1 sampai n dalam `kol` kolom: kotak `${id}-s{k}` dan angka `${id}-t{k}` (k = bilangan). (x, y) pojok kiri-atas, sel c lebar x tinggi hs. */
export function kisiBilangan(id: string, x: number, y: number, kol: number, n: number, c: number, hs: number): Obj[] {
  const out: Obj[] = [];
  for (let k = 1; k <= n; k += 1) {
    const px = r1(x + ((k - 1) % kol) * c);
    const py = r1(y + Math.floor((k - 1) / kol) * hs);
    out.push(kotak(`${id}-s${k}`, px, py, c, hs, W.putih, W.biru, { rx: 0, tebal: 0.8 }));
    out.push(teks(`${id}-t${k}`, r1(px + c / 2), r1(py + hs / 2 + 3.2), String(k), 9, W.biru));
  }
  return out;
}

/** Mencoret bilangan-bilangan pada kisi (kotak abu dan angka pudar) atau menandainya sebagai sisa (hijau). */
export const coret = (at: At, id: string, daftarBil: number[], jenis: "coret" | "prima" | "sorot" = "coret"): Aksi => ({
  at,
  ubah: daftarBil.flatMap((k) =>
    jenis === "coret"
      ? [
          { id: `${id}-s${k}`, warna: WARNA_CORET },
          { id: `${id}-t${k}`, warna: "#64748B" },
        ]
      : jenis === "prima"
        ? [
            { id: `${id}-s${k}`, warna: WARNA_PRIMA },
            { id: `${id}-t${k}`, warna: "#166534" },
          ]
        : [
            { id: `${id}-s${k}`, warna: "#FDE68A", garis: W.merah },
            { id: `${id}-t${k}`, warna: W.merah },
          ],
  ),
});
