/** Penyingkat naskah Story Kelas 1 Bab 6 Sub-Bab B: memakai ulang penyingkat Bab 1 Sub-Bab A, ditambah pencari kata bilangan. */
export { bersih, hapus, idx, k, sorotkan, redamkan, tambah, ubah, urutKata } from "./k1b1a-bantu";

const SATUAN = ["", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan"];

/** Nama bilangan satu sampai dua puluh seperti diucapkan. */
export const namaBilangan = (n: number): string =>
  n === 10 ? "sepuluh" : n === 11 ? "sebelas" : n === 20 ? "dua puluh" : n > 11 ? `${SATUAN[n - 10]} belas` : SATUAN[n];

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");

/**
 * Nomor kata terakhir tiap nama bilangan dalam `daftar`, dicari berurutan dalam `suara` (mulai setelah kata `setelah` bila ada).
 * Contoh: "Dua puluh, sembilan belas" dengan [20, 19] memberi nomor kata "puluh," dan "belas,". Galat bila tidak ketemu.
 */
export function urutBilangan(suara: string, daftar: number[], setelah?: string): number[] {
  const kata = suara.split(/\s+/).filter(Boolean).map(norm);
  let dari = setelah ? kata.indexOf(norm(setelah)) + 1 : 0;
  if (setelah && dari === 0) throw new Error(`kata "${setelah}" tidak ada dalam: ${suara}`);
  return daftar.map((n) => {
    const nama = namaBilangan(n).split(" ");
    for (let i = dari; i + nama.length <= kata.length; i += 1) {
      if (nama.every((w, j) => kata[i + j] === w)) {
        dari = i + nama.length;
        return i + nama.length - 1;
      }
    }
    throw new Error(`bilangan ${n} tidak ada setelah nomor ${dari} dalam: ${suara}`);
  });
}
