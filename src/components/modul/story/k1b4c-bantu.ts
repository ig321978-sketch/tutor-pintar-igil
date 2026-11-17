import type { Aksi } from "./logika-story";
import { kalimat } from "./k1b4c-gambar";
import { tambah, urutKata } from "./k1b1a-bantu";

/** Penyingkat naskah Story Kelas 1 Bab 4 Sub-Bab C: memakai ulang penyingkat Bab 1 Sub-Bab A. */
export { bersih, hapus, idx, k, sorotkan, redamkan, tambah, ubah, urutKata } from "./k1b1a-bantu";

/**
 * Kalimat hitung yang muncul lambang demi lambang mengikuti kata yang diucapkan.
 * `kata`: kata pemicu tiap lambang (dicari berurutan dan persis sama, jadi "empat" tidak terkena "keempat"); `setelah`: mulai mencari setelah kata ini.
 */
export function kalimatBertahap(suara: string, id: string, x: number, y: number, isi: string[], kata: string[], setelah?: string, u = 16, jarak = 20): Aksi[] {
  const pos = urutKata(suara, kata, setelah);
  return kalimat(id, x, y, isi, u, jarak).map((o, i) => tambah(pos[i], o));
}
