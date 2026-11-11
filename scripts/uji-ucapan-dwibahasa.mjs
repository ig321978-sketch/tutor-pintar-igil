/**
 * Uji cepat pecahSegmenDwibahasa tanpa bundler TS:
 * jalankan lewat: node --experimental-strip-types scripts/uji-ucapan-dwibahasa.mjs
 * atau salinan logika di bawah yang sinkron dengan src/lib/ucapan-dwibahasa.ts
 */
import { pecahSegmenDwibahasa, adaSegmenInggris } from "../src/lib/ucapan-dwibahasa.ts";

const contoh = [
  "METODE LUAR Triangle Inequality Theorem. Jumlah sudut Angle Sum selalu 180 derajat.",
  "Tahap Concrete lalu Pictorial lalu Abstract. Story pembuka.",
  "Van Hiele Visual Analysis memakai Inclusive Hierarchy.",
  "Hitung luas persegi dengan Area Model dan Array Model.",
  "Ayo menghitung lima apel di meja.",
];

let gagal = 0;
for (const c of contoh) {
  const seg = pecahSegmenDwibahasa(c);
  const en = seg.filter((s) => s.lang === "en-US").map((s) => s.teks);
  console.log("---");
  console.log(c);
  console.log(
    seg.map((s) => `[${s.lang}] ${s.teks}`).join(" | "),
  );
  if (c.includes("apel") && adaSegmenInggris(c)) {
    console.error("SALAH: kalimat Indonesia murni terdeteksi Inggris");
    gagal += 1;
  }
  if (c.includes("Concrete") && en.length === 0) {
    console.error("SALAH: Concrete tidak terdeteksi");
    gagal += 1;
  }
}
process.exit(gagal ? 1 : 0);
