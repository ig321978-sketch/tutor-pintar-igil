/** Uji ejaan fonetik Inggris → Indonesia untuk suara id-ID. */
import { adaIstilahInggris, ejaanInggrisUntukSuaraId } from "../src/lib/ejaan-inggris-id.ts";

const contoh = [
  ["METODE LUAR Triangle Inequality Theorem.", "ini kuo li ti"],
  ["Tahap Concrete lalu Pictorial lalu Abstract.", "konkrit"],
  ["Van Hiele Visual Analysis.", "fan hi le"],
  ["Area Model dan Array Model.", "a rei"],
  ["Ayo menghitung lima apel di meja.", "apel"],
];

let gagal = 0;
for (const [asal, harus] of contoh) {
  const hasil = ejaanInggrisUntukSuaraId(asal);
  console.log("---");
  console.log("IN :", asal);
  console.log("OUT:", hasil);
  if (asal.includes("apel")) {
    if (adaIstilahInggris(asal)) {
      console.error("SALAH: kalimat ID murni dianggap Inggris");
      gagal += 1;
    }
    if (hasil !== ejaanInggrisUntukSuaraId(asal) || !hasil.includes("apel")) {
      console.error("SALAH: teks ID berubah tak perlu");
      gagal += 1;
    }
  } else if (!hasil.toLowerCase().includes(harus)) {
    console.error("SALAH: tidak memuat", harus);
    gagal += 1;
  }
}
process.exit(gagal ? 1 : 0);
