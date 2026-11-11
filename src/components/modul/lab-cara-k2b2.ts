/**
 * Laboratorium Cara Hitung (Kelas 2 Bab 2): model PhET.
 * Satu pasangan (a, b) dan operasi tambah/kurang sampai 20 terlihat sebagai
 * lompatan garis, bagan pasangan, dan penjumlahan/pengurangan bersusun.
 * Murni: tanpa React, tanpa jaringan. Diuji di scripts/uji-lab-k2b2.mjs.
 */

export const MAKS = 20;

export type Op = "tambah" | "kurang";

export type Cara = { a: number; b: number };

export const batasOperan = (a: number, op: Op) => (op === "tambah" ? MAKS - a : a);

export function rapikan(p: Cara, op: Op): Cara {
  const a = Math.max(0, Math.min(MAKS, Math.round(p.a)));
  const b = Math.max(0, Math.min(batasOperan(a, op), Math.round(p.b)));
  return { a, b };
}

export const hasilCara = (p: Cara, op: Op) => (op === "tambah" ? p.a + p.b : p.a - p.b);

export type Hop = { dari: number; ke: number; label: string };

/** Lompatan di garis: maju (tambah) atau mundur (kurang), satu-satu. */
export function rencanaGaris(p: Cara, op: Op): Hop[] {
  const { a, b } = p;
  if (b === 0) return [];
  if (op === "tambah") return Array.from({ length: b }, (_, i) => ({ dari: a + i, ke: a + i + 1, label: "+1" }));
  return Array.from({ length: b }, (_, i) => ({ dari: a - i, ke: a - i - 1, label: "−1" }));
}

export function kalimatCara(p: Cara, op: Op): string {
  const t = op === "tambah" ? "+" : "−";
  return `${p.a} ${t} ${p.b} = ${hasilCara(p, op)}`;
}

export type Kolom = { puluhan: number; satuan: number };

export const urai = (n: number): Kolom => ({ puluhan: Math.floor(n / 10), satuan: n % 10 });

/** Catatan bersusun: perlu simpan (tambah) atau urai (kurang). */
export type CatatanSusun =
  | { jenis: "aman"; teks: string }
  | { jenis: "simpan"; teks: string; simpan: 1 }
  | { jenis: "urai"; teks: string };

export function catatanSusun(p: Cara, op: Op): CatatanSusun {
  const A = urai(p.a);
  const B = urai(p.b);
  if (op === "tambah") {
    const jumlahSatuan = A.satuan + B.satuan;
    if (jumlahSatuan >= 10) {
      return {
        jenis: "simpan",
        simpan: 1,
        teks: `Satuan ${A.satuan} + ${B.satuan} = ${jumlahSatuan}. Simpan 1 puluhan, tulis ${jumlahSatuan - 10} di satuan.`,
      };
    }
    return { jenis: "aman", teks: `Satuan ${A.satuan} + ${B.satuan} = ${jumlahSatuan}. Tidak perlu menyimpan.` };
  }
  if (A.satuan < B.satuan) {
    return {
      jenis: "urai",
      teks: `Satuan ${A.satuan} kurang dari ${B.satuan}. Urai 1 puluhan menjadi 10 satuan dulu.`,
    };
  }
  return { jenis: "aman", teks: `Satuan ${A.satuan} − ${B.satuan} = ${A.satuan - B.satuan}. Tidak perlu mengurai.` };
}

/** Hasil kolom setelah simpan/urai diterapkan (untuk tampilan). */
export function hasilKolom(p: Cara, op: Op): Kolom {
  return urai(hasilCara(p, op));
}

export function ucapanCara(p: Cara, op: Op): string {
  const h = hasilCara(p, op);
  const kata = op === "tambah" ? "ditambah" : "dikurangi";
  const c = catatanSusun(p, op);
  return `${p.a} ${kata} ${p.b} sama dengan ${h}. Di garis ada ${rencanaGaris(p, op).length || 0} lompatan. ${c.teks}`;
}

export const AWAL_A = 8;
export const AWAL_B = 5;

/** Keadaan awal bila lab dibuka untuk pengurangan (Sub-Bab B). Bukan target misi mana pun. */
export const AWAL_KURANG: Cara = { a: 15, b: 7 };

/** Perwakilan yang bisa dinyalakan atau dimatikan anak. Sub-Bab A hanya tiga yang pertama. */
export type TampilCara = "garis" | "pasangan" | "susun" | "selisih" | "periksa";
export const SEMUA_TAMPIL_CARA: TampilCara[] = ["garis", "pasangan", "susun", "selisih", "periksa"];
export const TAMPIL_CARA_A: TampilCara[] = ["garis", "pasangan", "susun"];

/** Perwakilan yang menyala saat laboratorium dibuka atau di-reset. Selisih dan Periksa dinyalakan anak sendiri. */
export const NYALA_AWAL_CARA: TampilCara[] = ["garis", "pasangan", "susun"];

/** Cara menghitung di garis untuk pengurangan: mundur dari a, atau tambah sampai pas dari b ke a. */
export type CaraGaris = "mundur" | "pas";

/* ------------------------- Selisih: pasangkan satu-satu ------------------------ */

export type Pasangan = { a: number; b: number; berpasangan: number; sisa: number };

/** Dua baris titik dipasangkan satu-satu. Titik baris panjang yang tidak berpasangan adalah selisihnya. */
export function pasangSelisih(p: Cara): Pasangan {
  const berpasangan = Math.min(p.a, p.b);
  return { a: p.a, b: p.b, berpasangan, sisa: Math.abs(p.a - p.b) };
}

/* -------------------------- Tambah sampai pas (kembalian) ------------------------- */

/** Lompatan maju dari bilangan kecil (b) sampai bilangan besar (a). Banyak lompatan = selisih = hasil a − b. */
export function rencanaPas(p: Cara): Hop[] {
  const n = Math.max(0, p.a - p.b);
  return Array.from({ length: n }, (_, i) => ({ dari: p.b + i, ke: p.b + i + 1, label: "+1" }));
}

/* ------------------------ Keluarga bilangan dan pemeriksaan ----------------------- */

export type Keluarga = { total: number; x: number; y: number };

/** Tiga bilangan yang berkeluarga: dua bagian dan satu total. */
export function keluargaBilangan(p: Cara, op: Op): Keluarga {
  return op === "tambah" ? { total: p.a + p.b, x: p.a, y: p.b } : { total: p.a, x: p.a - p.b, y: p.b };
}

/** Empat kalimat keluarga (dua bila kedua bagian sama). */
export function kalimatKeluarga(k: Keluarga): string[] {
  const baris = [`${k.x} + ${k.y} = ${k.total}`];
  if (k.x !== k.y) baris.push(`${k.y} + ${k.x} = ${k.total}`);
  baris.push(`${k.total} − ${k.x} = ${k.y}`);
  if (k.x !== k.y) baris.push(`${k.total} − ${k.y} = ${k.x}`);
  return baris;
}

/** Pemeriksaan hasil dengan operasi lawannya: pengurangan diperiksa dengan tambah, penjumlahan dengan kurang. */
export function kalimatPeriksa(p: Cara, op: Op): string {
  const h = hasilCara(p, op);
  return op === "kurang" ? `${h} + ${p.b} = ${p.a}` : `${h} − ${p.b} = ${p.a}`;
}

/** Kalimat penjelasan di bawah pemeriksaan. */
export function ucapanPeriksa(p: Cara, op: Op): string {
  const h = hasilCara(p, op);
  return op === "kurang"
    ? `Periksa dengan penjumlahan. ${h} + ${p.b} = ${p.a}. Cocok dengan bilangan semula.`
    : `Periksa dengan pengurangan. ${h} − ${p.b} = ${p.a}. Kembali ke bilangan pertama.`;
}
