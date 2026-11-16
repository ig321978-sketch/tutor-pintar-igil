import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 5 Bab 3 Sub-Bab C (pengurangan bilangan pecahan): rumus pecahan bertumpuk, kotak pecahan (model daerah),
 * deretan apel Eksplorasi 3.3B, dan jalan Asep Eksplorasi 3.3C. Berkas ini TIDAK dipakai bab lain. Semua fungsi mengembalikan data benda (Obj) untuk mesin Story.
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
  kayu: "#D6A15B",
};

type Opsi = Partial<Obj>;

export const teks = (id: string, x: number, y: number, isi: string, u = 10, warna: string = W.biru, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi, u, warna, ...o });
export const kotak = (id: string, x: number, y: number, w: number, h: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "kotak", x, y, w, h, warna, garis, rx: 3, tebal: 1.5, ...o });
export const bulat = (id: string, x: number, y: number, r: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "bulat", x, y, r, warna, garis, tebal: 1.5, ...o });
export const garis = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "garis", x, y, x2, y2, warna, tebal, ...o });
export const panah = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "panah", x, y, x2, y2, warna, tebal, ...o });
export const emo = (id: string, x: number, y: number, e: string, u = 22, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi: e, u, warna: W.biru, ...o });

/** Judul adegan di tengah atas. */
export const judul = (isi: string, warna: string = W.ungu): Obj => teks("jud", 150, 18, isi, 11, warna);

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

/** Id semua benda dari daftar (untuk hapus atau ubah sekaligus). */
export const idDari = (objs: Obj[]): string[] => objs.map((o) => o.id);

/* ------------------------------ Rumus pecahan bertumpuk ------------------------------ */

const PEC = /^\d+\/\d+$/;
const BUL = /^\d+$/;
const lebarPec = (p: string, u: number): number => {
  const [n, d] = p.split("/");
  return Math.max(n.length, d.length) * u * 0.6 + 4;
};

type Unsur = { jenis: "op" | "int" | "pec" | "camp"; s: string; bulat?: string; w: number };

function uraikan(ekspresi: string, u: number): Unsur[] {
  const tok = ekspresi.split(" ").filter(Boolean);
  const out: Unsur[] = [];
  for (let i = 0; i < tok.length; i += 1) {
    const s = tok[i];
    if (BUL.test(s) && PEC.test(tok[i + 1] ?? "")) {
      const p = tok[i + 1];
      out.push({ jenis: "camp", s: p, bulat: s, w: s.length * u * 0.6 + 2 + lebarPec(p, u) });
      i += 1;
    } else if (PEC.test(s)) out.push({ jenis: "pec", s, w: lebarPec(s, u) });
    else if (BUL.test(s)) out.push({ jenis: "int", s, w: s.length * u * 0.6 + 2 });
    else out.push({ jenis: "op", s, w: s.length * u * 0.6 + 2 });
  }
  return out;
}

const lebarTotal = (un: Unsur[]): number => un.reduce((t, a) => t + a.w, 0) + (un.length - 1) * 4;

/**
 * Rumus pecahan bertumpuk, tengah di (x, y) (y = garis pecahan), penulisan seperti "2/3 − 1/2 = 4/6 − 3/6 = 1/6".
 * Bilangan bulat diikuti pecahan menjadi pecahan campuran ("5 2/3"). Ukuran huruf mengecil otomatis bila lebih lebar dari lebarMaks.
 * Id: `${id}-{i}` (bilangan atau tanda), `${id}-{i}n`, `${id}-{i}g`, `${id}-{i}d` (pecahan), `${id}-{i}b` (bulat campuran), dan `${id}-eq` (teks tersembunyi
 * yang menyimpan rumus utuh agar dapat dihitung ulang oleh uji; catat = false untuk contoh kesalahan).
 */
export function rumus(id: string, x: number, y: number, ekspresi: string, u = 10, warna: string = W.biru, o: Opsi = {}, catat = true, lebarMaks = 284): Obj[] {
  let un = uraikan(ekspresi, u);
  let uu = u;
  const lebar = lebarTotal(un);
  if (lebar > lebarMaks) {
    uu = (u * lebarMaks) / lebar;
    un = uraikan(ekspresi, uu);
  }
  const out: Obj[] = [];
  let px = x - lebarTotal(un) / 2;
  un.forEach((a, i) => {
    if (a.jenis === "pec" || a.jenis === "camp") {
      let pw = a.w;
      if (a.jenis === "camp") {
        const bw = (a.bulat as string).length * uu * 0.6 + 2;
        out.push(teks(`${id}-${i}b`, px + bw / 2, y + uu * 0.35, a.bulat as string, uu, warna, o));
        px += bw;
        pw = a.w - bw;
      }
      const [n, d] = a.s.split("/");
      const cx = px + pw / 2;
      out.push(teks(`${id}-${i}n`, cx, y - 3, n, uu, warna, o), garis(`${id}-${i}g`, cx - pw / 2 + 1, y, pw - 2, 0, warna, 1.2, o), teks(`${id}-${i}d`, cx, y + uu * 0.9 + 1, d, uu, warna, o));
    } else out.push(teks(`${id}-${i}`, px + a.w / 2, y + uu * 0.35, a.s, uu, warna, o));
    px += (a.jenis === "camp" ? a.w - (a.bulat as string).length * uu * 0.6 - 2 : a.w) + 4;
  });
  if (catat) out.push(teks(`${id}-eq`, x, y, ekspresi, 1, warna, { op: 0 }));
  return out;
}

/* ------------------------------ Kotak pecahan (model daerah, Cara Nisa) ------------------------------ */

/**
 * Kertas atau batang dibagi d bagian sama besar (tegak: bertumpuk ke bawah seperti Buku Siswa hlm. 92; mendatar: berjajar ke kanan),
 * kotak yang nomornya ada di `isi` diwarnai. Id kotak `${id}-c${i}`.
 */
export function sel(id: string, x: number, y: number, w: number, h: number, d: number, isi: number[], warna: string = W.emas, tegak = false, o: Opsi = {}): Obj[] {
  return Array.from({ length: d }, (_, i) => {
    const cw = tegak ? w : w / d;
    const ch = tegak ? h / d : h;
    return kotak(`${id}-c${i}`, x + (tegak ? 0 : cw * i), y + (tegak ? ch * i : 0), cw, ch, isi.includes(i) ? warna : W.putih, W.biru, { rx: 0, tebal: 1.2, ...o });
  });
}

/** Silang merah di kotak-kotak yang dicoret (kotak yang sudah dilukis atau diberikan). Id `${id}-x${i}a` dan `${id}-x${i}b`. */
export function silang(id: string, x: number, y: number, w: number, h: number, d: number, idx: number[], tegak = false, o: Opsi = {}): Obj[] {
  const cw = tegak ? w : w / d;
  const ch = tegak ? h / d : h;
  return idx.flatMap((i) => {
    const px = x + (tegak ? 0 : cw * i);
    const py = y + (tegak ? ch * i : 0);
    return [garis(`${id}-x${i}a`, px + 2, py + 2, cw - 4, ch - 4, W.merah, 1.6, o), garis(`${id}-x${i}b`, px + cw - 2, py + 2, -(cw - 4), ch - 4, W.merah, 1.6, o)];
  });
}

/* ------------------------------ Apel Eksplorasi 3.3B (Buku Siswa hlm. 94 sampai 95) ------------------------------ */

/** Delapan apel dalam dua baris empat (seperti gambar buku). Pusat apel ke-i: kolom i mod 4, baris i div 4. Id `${id}-a${i}`. */
export function apel(id: string, x: number, y: number, warna: (i: number) => string = () => W.merah, jarak = 20, r = 7.5): Obj[] {
  return Array.from({ length: 8 }, (_, i) => bulat(`${id}-a${i}`, x + (i % 4) * jarak, y + Math.floor(i / 4) * jarak, r, warna(i), W.coklat, { tebal: 1.4 }));
}

/* ------------------------------ Gambar tambahan ------------------------------ */

/** Garis bilangan berskala 1 satuan = s piksel mulai dari (x, y), dengan titik-titik bilangan bulat dan label. Id `${id}-g`, `${id}-t${i}`. */
export function garisBilangan(id: string, x: number, y: number, s: number, dari: number, sampai: number, warna: string = W.biru): Obj[] {
  const out: Obj[] = [garis(`${id}-g`, x, y, (sampai - dari) * s, 0, warna, 2)];
  for (let i = dari; i <= sampai; i += 1) {
    out.push(garis(`${id}-p${i}`, x + (i - dari) * s, y - 3, 0, 6, warna, 1.4), teks(`${id}-t${i}`, x + (i - dari) * s, y + 14, String(i), 8.4, warna));
  }
  return out;
}
