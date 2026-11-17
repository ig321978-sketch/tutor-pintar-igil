import type { Aksi } from "./logika-story";
import { garisPasang, type Titik } from "./k1b1b-gambar";
import { tambah, urutKata } from "./k1b1a-bantu";

/** Penyingkat naskah Story Sub-Bab B: memakai ulang penyingkat Sub-Bab A, ditambah aksi memasangkan dua barisan. */
export { bersih, hapus, hitungMainan, idx, k, sorotkan, redamkan, tambah, ubah, urutKata, KATA_ANGKA } from "./k1b1a-bantu";

/**
 * Memasangkan satu per satu: tiap kata pada `kata` (berurutan dalam suara) memunculkan satu garis pasangan `${id}{i}`
 * dari benda atas ke-i ke benda bawah ke-i. Banyak garis = banyak kata = banyak pasangan.
 */
export function pasangAksi(suara: string, id: string, atas: Titik[], bawah: Titik[], kata: string[], setelah?: string): Aksi[] {
  const pos = urutKata(suara, kata, setelah);
  return pos.map((p, i) => tambah(p, garisPasang(`${id}${i}`, atas[i], bawah[i])));
}
