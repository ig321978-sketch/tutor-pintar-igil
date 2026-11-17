import type { Aksi } from "./logika-story";
import { tambah, ubah, urutKata } from "./k1b1a-bantu";
import { angkaTangga, atasTangga } from "./k1b1c-gambar";

/** Penyingkat naskah Story Sub-Bab C: memakai ulang penyingkat Sub-Bab A, ditambah aksi naik dan turun tangga sambil menghitung. */
export { bersih, hapus, idx, k, sorotkan, redamkan, tambah, ubah, urutKata } from "./k1b1a-bantu";

/**
 * Melangkah di tangga sambil menghitung: tiap kata pada `kata` memindahkan tokoh `tokoh` ke anak tangga `tangga[i]`
 * (nomor anak tangga 1 sampai 10, 0 = lantai) dan menyalakan angka anak tangga itu.
 */
export function langkahTangga(suara: string, id: string, tokoh: string, anak: number[], kata: string[], setelah?: string, warna?: string): Aksi[] {
  const pos = urutKata(suara, kata, setelah);
  return pos.flatMap((p, i) => {
    const n = anak[i];
    const t = n === 0 ? { x: 20, y: 184 } : atasTangga(n - 1);
    const a: Aksi[] = [ubah(p, { id: tokoh, x: t.x, y: t.y - 2 })];
    if (n > 0) a.push(tambah(p, angkaTangga(id, n - 1, warna)));
    return a;
  });
}
