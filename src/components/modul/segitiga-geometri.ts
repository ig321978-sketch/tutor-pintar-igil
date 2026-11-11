/**
 * Geometri segitiga dari panjang sisi / ciri — agar gambar cocok teks
 * (sama sisi, sama kaki, siku-siku, lancip, tumpul, sembarang).
 */

export type CiriSisiSegitiga = "sama-sisi" | "sama-kaki" | "sembarang";
export type CiriSudutSegitiga = "lancip" | "siku" | "tumpul";

export type Titik = { x: number; y: number };

/** Pilih sisi a,b,c yang menghasilkan bentuk sesuai ciri. */
export function sisiUntukCiri(ciriSisi?: CiriSisiSegitiga, ciriSudut?: CiriSudutSegitiga): [number, number, number] {
  if (ciriSisi === "sama-sisi") return [5, 5, 5];
  if (ciriSisi === "sama-kaki") {
    if (ciriSudut === "siku") return [5, 5, 7]; // siku di antara kaki sama
    if (ciriSudut === "tumpul") return [5, 5, 8]; // alas panjang → sudut tumpul
    return [6, 6, 4]; // lancip sama kaki
  }
  // sembarang / default
  if (ciriSudut === "siku") return [3, 4, 5];
  if (ciriSudut === "tumpul") return [2, 5, 6]; // 2²+5² < 6²
  if (ciriSudut === "lancip") return [6, 5, 4];
  return [5, 4, 6];
}

/**
 * Susun segitiga: sisi `c` di alas (A–B), sisi `a` = B–C, sisi `b` = A–C.
 * Hasil diskalakan & dipusatkan ke kotak viewBox.
 */
export function titikSegitigaDariSisi(
  a: number,
  b: number,
  c: number,
  box: { w: number; h: number; pad?: number } = { w: 300, h: 180, pad: 16 },
): [Titik, Titik, Titik] {
  const aa = Math.max(0.1, a);
  const bb = Math.max(0.1, b);
  const cc = Math.max(0.1, c);
  // ketaksamaan segitiga: perbaiki tipis bila hampir tidak valid
  const sisi = [aa, bb, cc].sort((x, y) => x - y);
  if (sisi[0] + sisi[1] <= sisi[2]) {
    return titikSegitigaDariSisi(sisi[0], sisi[1], sisi[0] + sisi[1] - 0.2, box);
  }
  const A0 = { x: 0, y: 0 };
  const B0 = { x: cc, y: 0 };
  const x = (bb * bb + cc * cc - aa * aa) / (2 * cc);
  const y2 = Math.max(0, bb * bb - x * x);
  const C0 = { x, y: Math.sqrt(y2) };

  const pad = box.pad ?? 16;
  const minX = Math.min(A0.x, B0.x, C0.x);
  const maxX = Math.max(A0.x, B0.x, C0.x);
  const minY = Math.min(A0.y, B0.y, C0.y);
  const maxY = Math.max(A0.y, B0.y, C0.y);
  const bw = Math.max(0.01, maxX - minX);
  const bh = Math.max(0.01, maxY - minY);
  const skala = Math.min((box.w - 2 * pad) / bw, (box.h - 2 * pad) / bh);
  const ox = (box.w - bw * skala) / 2 - minX * skala;
  const oy = (box.h - bh * skala) / 2 - minY * skala;
  // SVG: y ke bawah — balik supaya puncak di atas
  const map = (p: Titik): Titik => ({
    x: ox + p.x * skala,
    y: box.h - (oy + p.y * skala),
  });
  return [map(A0), map(B0), map(C0)];
}

/** Titik untuk ciri; kotak default kanvas video 300×180 (sisa untuk label). */
export function titikUntukCiri(
  ciriSisi?: CiriSisiSegitiga,
  ciriSudut?: CiriSudutSegitiga,
  box?: { w: number; h: number; pad?: number },
): [Titik, Titik, Titik] {
  const [a, b, c] = sisiUntukCiri(ciriSisi, ciriSudut);
  return titikSegitigaDariSisi(a, b, c, box);
}

/** Indeks sudut siku (0=A, 1=B, 2=C) bila ada; selain itu -1. a=BC, b=AC, c=AB. */
export function indeksSudutSiku(a: number, b: number, c: number): number {
  const eps = 2.5; // toleransi bilangan bulat (5²+5²≈7²)
  if (Math.abs(b * b + c * c - a * a) < eps) return 0;
  if (Math.abs(a * a + c * c - b * b) < eps) return 1;
  if (Math.abs(a * a + b * b - c * c) < eps) return 2;
  return -1;
}

/** Label tengah sisi untuk teks panjang. */
export function tengahSisi(p: Titik, q: Titik, outward = 0): Titik {
  const mx = (p.x + q.x) / 2;
  const my = (p.y + q.y) / 2;
  if (!outward) return { x: mx, y: my };
  const dx = q.x - p.x;
  const dy = q.y - p.y;
  const len = Math.hypot(dx, dy) || 1;
  // normal “ke luar” kasar (tegak lurus)
  return { x: mx - (dy / len) * outward, y: my + (dx / len) * outward };
}
