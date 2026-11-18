/** Penyingkat naskah Story Kelas 2 Bab 2 Sub-Bab B: memakai ulang penyingkat Kelas 1 Bab 1 Sub-Bab A, ditambah pencari nama bilangan sampai dua puluh. */
export { bersih, hapus, idx, k, sorotkan, redamkan, tambah, ubah, urutKata } from "./k1b1a-bantu";

const SATUAN = ["", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan"];
const BELASAN = ["sepuluh", "sebelas", "dua belas", "tiga belas", "empat belas", "lima belas", "enam belas", "tujuh belas", "delapan belas", "sembilan belas"];

/** Nama bilangan 0 sampai 20 (indeks = bilangan). */
export const NAMA_BILANGAN: string[] = Array.from({ length: 21 }, (_, n) => {
  if (n === 0) return "nol";
  if (n < 10) return SATUAN[n];
  if (n < 20) return BELASAN[n - 10];
  return "dua puluh";
});

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");

/**
 * Nomor kata awal tiap bilangan dalam `nilai` (nama boleh lebih dari satu kata), dicari berurutan mulai setelah kata `setelah` bila diberikan.
 * Galat bila ada yang tidak ketemu, supaya salah ketik pemicu ketahuan.
 */
export const urutNilai = (suara: string, nilai: number[], setelah?: string): number[] => {
  const kata2 = suara.split(/\s+/).filter(Boolean).map(norm);
  let kursor = setelah ? kata2.indexOf(norm(setelah)) + 1 : 0;
  if (setelah && kursor === 0) throw new Error(`kata "${setelah}" tidak ada dalam: ${suara}`);
  const hasil: number[] = [];
  for (const n of nilai) {
    const pecah = NAMA_BILANGAN[n].split(" ");
    let p = -1;
    for (let i = kursor; i + pecah.length <= kata2.length; i += 1) {
      if (pecah.every((c, q) => kata2[i + q] === c)) {
        p = i;
        break;
      }
    }
    if (p < 0) throw new Error(`bilangan "${NAMA_BILANGAN[n]}" tidak ada setelah nomor ${kursor} dalam: ${suara}`);
    hasil.push(p);
    kursor = p + pecah.length;
  }
  return hasil;
};
