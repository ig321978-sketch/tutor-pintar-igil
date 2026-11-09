/**
 * Tata letak peta pikiran Kelas 2 ("Taman Ide"): pusat di tengah, kartu bernomor di kiri dan kanan,
 * dihubungkan cabang berwarna. Tanpa React dan tanpa jaringan. Uji: scripts/uji-peta-k2.mjs.
 *
 * Koordinat cabang memakai kotak gambar selebar 100 satuan (persen lebar peta) dan setinggi `tinggi` piksel.
 */

export const TINGGI_KARTU = 108;
export const JARAK_BARIS = 12;
/** Lebar kolom kartu dan kolom tengah, dalam persen lebar peta. */
export const LEBAR_KARTU = 39;
export const LEBAR_TENGAH = 22;

export type Titik = readonly [number, number];

export type Simpul = {
  /** Urutan kartu mulai dari 0. Genap di kiri, ganjil di kanan, dibaca kiri ke kanan lalu ke bawah. */
  indeks: number;
  sisi: -1 | 1;
  baris: number;
  /** Tinggi tengah kartu dalam piksel dari tepi atas peta. */
  y: number;
  /** Kurva Bezier kubik dari pusat sampai tepi dalam kartu. */
  kurva: readonly [Titik, Titik, Titik, Titik];
  jalur: string;
};

export type TataLetak = { baris: number; tinggi: number; tengah: number; simpul: Simpul[] };

/** Jarak (satuan lebar) cabang berjalan sebelum berbelok: paling jauh untuk kartu paling dekat ke pusat. */
const GESER_MIN = 2.5;
const GESER_MAKS = 8.5;

const bulat = (x: number) => Math.round(x * 100) / 100;

export function tataLetakPeta(jumlah: number): TataLetak {
  const n = Math.max(0, Math.floor(jumlah));
  const baris = Math.max(1, Math.ceil(n / 2));
  const tinggi = baris * TINGGI_KARTU + (baris - 1) * JARAK_BARIS;
  const tengah = tinggi / 2;
  const jarakPusat = 50 - LEBAR_KARTU;
  const jarakBaris = (r: number) => Math.abs(r - (baris - 1) / 2);
  /* Kartu yang jauh dari pusat berbelok paling dekat dengan pusat, supaya cabang tidak saling memotong. */
  const kelompok = [...new Set(Array.from({ length: baris }, (_, r) => jarakBaris(r)))].sort((a, b) => b - a);

  const simpul = Array.from({ length: n }, (_, indeks): Simpul => {
    const sisi = indeks % 2 === 0 ? -1 : 1;
    const r = Math.floor(indeks / 2);
    const y = r * (TINGGI_KARTU + JARAK_BARIS) + TINGGI_KARTU / 2;
    const geser =
      kelompok.length === 1
        ? (GESER_MIN + GESER_MAKS) / 2
        : GESER_MIN + kelompok.indexOf(jarakBaris(r)) * ((GESER_MAKS - GESER_MIN) / (kelompok.length - 1));
    const kurva: Simpul["kurva"] = [
      [50, tengah],
      [50 + sisi * geser, tengah],
      [50 + sisi * geser, y],
      [50 + sisi * jarakPusat, y],
    ];
    const [a, b, c, d] = kurva;
    const jalur = `M${bulat(a[0])} ${bulat(a[1])} C${bulat(b[0])} ${bulat(b[1])} ${bulat(c[0])} ${bulat(c[1])} ${bulat(d[0])} ${bulat(d[1])}`;
    return { indeks, sisi, baris: r, y, kurva, jalur };
  });

  return { baris, tinggi, tengah, simpul };
}
