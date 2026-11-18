/**
 * Data Simulasi Meja Panen Kelas 2 Bab 5 Sub-Bab C: pai apel (bundar), kain taplak (persegi), dan pita warna. Berbeda dari Story (labu, petak tanah, melon, kupu-kupu).
 * Diuji: scripts/uji-panen-sim-k2b5c.mjs.
 */
export const MISI_PANEN_TEKS =
  "Misi Meja Panen: bagi pai apel dengan dua garis sampai empat bagian sama besar, coba juga dua garis yang miring, bagi kain taplak, lalu susun pita seperempat sampai sama panjang dengan pita setengah. Urutannya bebas.";
export const WARNA_BAGIAN = ["#FCA5A5", "#FDE68A", "#86EFAC", "#93C5FD", "#F9A8D4", "#C4B5FD"] as const;
export const PITA_SIM: readonly { u: 1 | 2 | 4; nama: string; warna: string }[] = [
  { u: 1, nama: "pita seperempat", warna: "#F9A8D4" },
  { u: 2, nama: "pita setengah", warna: "#86EFAC" },
  { u: 4, nama: "pita utuh", warna: "#93C5FD" },
];
