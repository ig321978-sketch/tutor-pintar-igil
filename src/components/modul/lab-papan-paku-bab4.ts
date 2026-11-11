/**
 * Papan Paku Bebas (Bab 4): laboratorium virtual 2D. Anak memasang karet di antara paku-paku (kisi 5 x 5)
 * dan mesin mengenali bentuknya: segitiga, persegi, persegi panjang, segiempat lain, atau bentuk banyak sisi.
 * Mode karet lengkung menggambar bentuk yang sama dengan sisi melengkung, sehingga tidak punya sisi lurus
 * dan sudut. Murni: tanpa React, tanpa jaringan. Diuji di scripts/uji-lab-kelas1.mjs.
 */

export const UKURAN = 5;
export const MAKS_PAKU = 8;

export type Titik = [number, number];

export type Papan = {
  titik: Titik[];
  tertutup: boolean;
  pesan: string;
};

export const papanKosong = (): Papan => ({ titik: [], tertutup: false, pesan: "" });

const sama = (a: Titik, b: Titik) => a[0] === b[0] && a[1] === b[1];

const silang = (o: Titik, a: Titik, b: Titik) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);

export const segaris = (a: Titik, b: Titik, c: Titik) => silang(a, b, c) === 0;

const diSegmen = (a: Titik, b: Titik, p: Titik) =>
  segaris(a, b, p) && Math.min(a[0], b[0]) <= p[0] && p[0] <= Math.max(a[0], b[0]) && Math.min(a[1], b[1]) <= p[1] && p[1] <= Math.max(a[1], b[1]);

/** Dua ruas bertemu atau bersilang (termasuk bersinggungan di ujung). */
export function ruasBertemu(a: Titik, b: Titik, c: Titik, d: Titik): boolean {
  const d1 = Math.sign(silang(a, b, c));
  const d2 = Math.sign(silang(a, b, d));
  const d3 = Math.sign(silang(c, d, a));
  const d4 = Math.sign(silang(c, d, b));
  if (d1 !== d2 && d3 !== d4) return true;
  return diSegmen(a, b, c) || diSegmen(a, b, d) || diSegmen(c, d, a) || diSegmen(c, d, b);
}

/** Ruas baru dari titik terakhir ke p tidak boleh menyilang ruas lama (kecuali ruas yang bersambung dengannya). */
function menyilang(titik: Titik[], p: Titik, menutup: boolean): boolean {
  const n = titik.length;
  const akhir = titik[n - 1];
  for (let j = 0; j < n - 1; j += 1) {
    if (j === n - 2) continue; // bersambung di titik terakhir
    if (menutup && j === 0) continue; // bersambung di titik pertama
    if (ruasBertemu(akhir, p, titik[j], titik[j + 1])) return true;
  }
  return false;
}

export function pasangPaku(papan: Papan, p: Titik): Papan {
  if (papan.tertutup) return { ...papan, pesan: "Karet sudah tertutup. Hapus karet untuk membuat bentuk baru." };
  const t = papan.titik;
  if (p[0] < 0 || p[0] >= UKURAN || p[1] < 0 || p[1] >= UKURAN) return papan;
  if (t.length >= 3 && sama(p, t[0])) return tutupBentuk(papan);
  if (t.some((x) => sama(x, p))) return { ...papan, pesan: "Paku itu sudah dipakai. Pilih paku lain." };
  if (t.length >= MAKS_PAKU) return { ...papan, pesan: `Paling banyak ${MAKS_PAKU} paku. Tutup bentuknya.` };
  if (t.length >= 2 && segaris(t[t.length - 2], t[t.length - 1], p)) return { ...papan, pesan: "Paku itu segaris dengan dua paku sebelumnya, jadi bukan sudut. Pilih paku lain." };
  if (t.length >= 2 && menyilang(t, p, false)) return { ...papan, pesan: "Karet tidak boleh menyilang. Pilih paku lain." };
  return { titik: [...t, p], tertutup: false, pesan: "" };
}

export function tutupBentuk(papan: Papan): Papan {
  const t = papan.titik;
  if (papan.tertutup) return papan;
  if (t.length < 3) return { ...papan, pesan: "Butuh paling sedikit 3 paku untuk membuat bentuk tertutup." };
  const awal = t[0];
  const akhir = t[t.length - 1];
  if (segaris(t[t.length - 2], akhir, awal)) return { ...papan, pesan: "Paku terakhir segaris dengan paku pertama, jadi bukan sudut. Ganti paku terakhir." };
  if (segaris(akhir, awal, t[1])) return { ...papan, pesan: "Paku pertama segaris dengan dua paku di sebelahnya, jadi bukan sudut. Mulai dari paku lain." };
  if (menyilang(t, awal, true)) return { ...papan, pesan: "Karet tidak boleh menyilang. Ganti paku terakhir." };
  return { ...papan, tertutup: true, pesan: "" };
}

export function hapusPakuTerakhir(papan: Papan): Papan {
  if (papan.tertutup) return { ...papan, tertutup: false, pesan: "" };
  return { titik: papan.titik.slice(0, -1), tertutup: false, pesan: "" };
}

const kuadrat = (a: Titik, b: Titik) => (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2;

export type Analisis = {
  sisi: number;
  sudut: number;
  siku: number;
  sisiSama: boolean;
  nama: string;
};

const NAMA_SISI: Record<number, string> = { 3: "Segitiga", 4: "Segiempat", 5: "Segilima", 6: "Segienam", 7: "Segitujuh", 8: "Segidelapan" };

/** Bentuk tertutup dari titik berurutan. Untuk karet lurus. */
export function analisis(titik: Titik[]): Analisis {
  const n = titik.length;
  const sisi = Array.from({ length: n }, (_, i) => kuadrat(titik[i], titik[(i + 1) % n]));
  let siku = 0;
  for (let i = 0; i < n; i += 1) {
    const a = titik[(i + n - 1) % n];
    const b = titik[i];
    const c = titik[(i + 1) % n];
    if ((a[0] - b[0]) * (c[0] - b[0]) + (a[1] - b[1]) * (c[1] - b[1]) === 0) siku += 1;
  }
  const sisiSama = sisi.every((s) => s === sisi[0]);
  let nama = NAMA_SISI[n] ?? `Bentuk ${n} sisi`;
  if (n === 4 && siku === 4) nama = sisiSama ? "Persegi" : "Persegi panjang";
  return { sisi: n, sudut: n, siku, sisiSama, nama };
}

/** Bentuk karet lengkung: sisi melengkung, tanpa sudut. */
export const ANALISIS_LENGKUNG: Analisis = { sisi: 0, sudut: 0, siku: 0, sisiSama: false, nama: "Bentuk lengkung" };

export const TANTANGAN = ["Persegi", "Persegi panjang", "Segitiga", "Bentuk lengkung"] as const;

/** Jalur SVG karet. Lengkung: kurva mulus tertutup melalui titik tengah tiap sisi, paku sebagai titik kendali. */
export function jalurKaret(titik: Titik[], tertutup: boolean, lengkung: boolean, sel: (p: Titik) => [number, number]): string {
  if (titik.length === 0) return "";
  const P = titik.map(sel);
  if (lengkung && tertutup && P.length >= 3) {
    const tengah = (a: [number, number], b: [number, number]): [number, number] => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
    const n = P.length;
    let d = `M ${tengah(P[n - 1], P[0]).join(" ")}`;
    for (let i = 0; i < n; i += 1) d += ` Q ${P[i].join(" ")} ${tengah(P[i], P[(i + 1) % n]).join(" ")}`;
    return `${d} Z`;
  }
  return `M ${P.map((p) => p.join(" ")).join(" L ")}${tertutup ? " Z" : ""}`;
}

export function ucapanBentuk(papan: Papan, lengkung: boolean, denganSiku = true): string {
  if (!papan.tertutup) return "Pasang karet di antara paku. Ketuk paku satu per satu, lalu tutup bentuknya.";
  if (lengkung) return "Karet dilengkungkan. Bentuk ini punya sisi melengkung. Tidak punya sisi lurus dan tidak punya sudut.";
  const a = analisis(papan.titik);
  const siku = denganSiku && a.siku > 0 ? ` Sudut siku ada ${a.siku}.` : "";
  return `Bentukmu bernama ${a.nama.toLowerCase()}. Sisinya ada ${a.sisi}. Sudutnya ada ${a.sudut}.${siku}`;
}
