// Uji logika murni skill k1b2-s4 sampai s10 (src/lib/belajar). Pakai: node --no-warnings scripts/uji-belajar-s4-s10.mjs
// Kunci dihitung ulang dengan kode terpisah dari pembangkit, dan angka di narasi dibaca balik dari kata.
import { register } from "node:module";
register("data:text/javascript," + encodeURIComponent("export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/[.][a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch { return n(s, c); } } return n(s, c); }"), import.meta.url);
const M = {
  s4: await import("../src/lib/belajar/s4-pasangan.ts"),
  s5: await import("../src/lib/belajar/s5-tukar.ts"),
  s6: await import("../src/lib/belajar/s6-garis.ts"),
  s7: await import("../src/lib/belajar/s7-kembar.ts"),
  s8: await import("../src/lib/belajar/s8-sepuluh.ts"),
  s9: await import("../src/lib/belajar/s9-cerita.ts"),
  s10: await import("../src/lib/belajar/s10-roda.ts"),
};
const MISK = { s4: "MISKONSEPSI_S4", s5: "MISKONSEPSI_S5", s6: "MISKONSEPSI_S6", s7: "MISKONSEPSI_S7", s8: "MISKONSEPSI_S8", s9: "MISKONSEPSI_S9", s10: "MISKONSEPSI_S10" };
let lulus = 0, gagal = 0;
const cek = (ok, ket) => { if (ok) lulus += 1; else { gagal += 1; if (gagal <= 40) console.log("GAGAL:", ket); } };
const KATA = ["nol", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan", "sepuluh", "sebelas"];
const TERLARANG = /\b(teman|kelas|buku|kurang|dikurangi|sisa|sisanya|maju|mundur|puluhan|lebih|bagi|kali)\b/i;
const angkaKata = (t) => t.toLowerCase().split(/[^a-z]+/).map((w) => KATA.indexOf(w)).filter((i) => i >= 0);
const sama = (x, y) => JSON.stringify(x) === JSON.stringify(y);

// Penjawab terpisah: dari angka yang terbaca di narasi (urutan kemunculan) menghitung kunci.
const PENJAWAB = {
  s4: (n, bt) => (bt === "lambang" ? n[0] - n[1] : n[0] - n[1]), // seluruhnya, sebagian: bagian lain
  s5: (n) => n[2], // x ditambah y hasilnya c: pertanyaan y + x tetap c
  s6: (n) => n[0] + n[1], // awal + lompat
  s7: (n) => n[0] + n[1],
  s8: (n) => 10 - n[0],
  s9: (n) => n[0] + n[1],
  s10: (n, bt, s) => 2 * s.a + 3 * s.b,
};
const ANGKA_DIHARAPKAN = {
  s4: (s) => [s.a + s.b, s.a],
  s5: (s) => [s.b, s.a, s.a + s.b, s.a, s.b].slice(0, 5),
  s6: (s) => [s.a, s.b],
  s7: (s) => [s.a, s.a],
  s8: (s) => [s.a],
  s9: (s) => [s.a, s.b],
  s10: null,
};

for (const [id, S] of Object.entries(M)) {
  const sebelum = lulus;
  for (let benih = 1; benih <= 2000; benih += 1) {
    for (const bt of ["benda", "diagram", "lambang"]) {
      const s = S.buatSoal(bt, benih);
      const tag = `${id}/${bt}/${benih}`;
      cek(s.skillId === `k1b2-${id}`, `skillId ${tag}`);
      cek(s.pilihan.length === 4 && new Set(s.pilihan.map((p) => p.nilai)).size === 4, `empat pilihan unik ${tag}`);
      const kunci = s.pilihan.filter((p) => p.miskonsepsi === null);
      cek(kunci.length === 1, `tepat satu kunci ${tag}`);
      cek(s.pilihan.every((p) => p.nilai >= 1 && p.nilai <= 12), `nilai pilihan wajar ${tag}`);
      // 1) kunci cocok dengan hitungan terpisah dari field
      const harapan = id === "s4" ? s.b : id === "s8" ? 10 - s.a : id === "s10" ? 2 * s.a + 3 * s.b : s.a + s.b;
      cek(kunci[0] && kunci[0].nilai === harapan && s.kunci === harapan, `kunci ${tag}: ${kunci[0]?.nilai} vs ${harapan}`);
      // 2) kunci cocok dengan angka yang dibaca dari narasi
      const n = angkaKata(s.suara);
      const urutan = id === "s8" ? (bt === "lambang" ? [s.a, 10] : [10, s.a]) : id !== "s9" && id !== "s10" ? ANGKA_DIHARAPKAN[id](s) : null;
      if (urutan) cek(sama(n.slice(0, urutan.length), urutan), `angka narasi ${tag}: ${s.suara} -> ${n}`);
      if (id === "s9") cek(PENJAWAB.s9(n) === harapan, `narasi cerita ${tag}: ${s.suara}`);
      if (id === "s10") cek(s.suara.toLowerCase().includes("roda"), `narasi roda ${tag}`);
      if (id === "s10") { const sp = (s.suara.match(/\b(\w+) sepeda/i) || [])[1], bc = (s.suara.match(/\b(\w+) becak/i) || [])[1]; cek((s.a === 0 || KATA.indexOf(sp?.toLowerCase()) === s.a) && (s.b === 0 || KATA.indexOf(bc?.toLowerCase()) === s.b), `banyak kendaraan di narasi ${tag}: ${s.suara}`); }
      cek(!/\d/.test(s.suara), `suara tanpa digit ${tag}: ${s.suara}`);
      cek(s.suara.split(/[.?!]/).every((k) => k.trim().split(/\s+/).filter(Boolean).length <= 8), `kalimat <= 8 kata ${tag}: ${s.suara}`);
      cek(!TERLARANG.test(s.suara), `kata terlarang ${tag}: ${s.suara}`);
      // 3) pengecoh sungguh salah dan punya miskonsepsi
      for (const p of s.pilihan) {
        if (p.miskonsepsi === null) continue;
        cek(p.nilai !== harapan && S[MISK[id]] === undefined ? true : S[MISK[id]][p.miskonsepsi] !== undefined && p.nilai !== harapan, `pengecoh ${tag} ${p.nilai}/${p.miskonsepsi}`);
        const h = S.periksa(s, p.id);
        cek(!h.benar && h.miskonsepsi === p.miskonsepsi, `salah ditolak ${tag}`);
      }
      cek(S.periksa(s, kunci[0].id).benar, `kunci diterima ${tag}`);
      cek(!S.periksa(s, "asing").benar, `jawaban asing ${tag}`);
      cek(JSON.stringify(S.buatSoal(bt, benih)) === JSON.stringify(s), `dapat diulang ${tag}`);
      if (s.kalimat) cek(/\d/.test(s.kalimat), `kalimat tampil ${tag}`);
      if (id === "s5") cek(s.a !== s.b && s.kalimat.split(" ")[0] === String(s.b) && s.tanya.startsWith(`${s.a} +`), `urutan tukar ${tag}`);
      if (id === "s6") cek(s.a + s.b <= 10, "garis muat di sepuluh");
    }
  }
  for (let benih = 1; benih <= 500; benih += 1) {
    const c = S.buatCek(benih);
    cek(c.length === 5 && new Set(c.map((x) => `${x.a}+${x.b}`)).size === 5 && c.every((x) => x.skillId === `k1b2-${id}`), `cek lima soal tanpa kembar ${id}/${benih}`);
  }
  const lc = S.langkahContoh;
  const kasus = id === "s7" ? [[3]] : id === "s8" ? [[3, 7], [6, 4]] : id === "s10" ? [[2, 1], [1, 1]] : [[3, 4], [2, 5], [5, 2]];
  for (const k of kasus) { const l = lc(...k); cek(l.length === 4 && l.every((t) => !/\d/.test(t) && t.split(/\s+/).length <= 8 && !TERLARANG.test(t)), `langkah ${id} ${k}: ${l.join(" | ")}`); }
  console.log(`${id}: ${lulus - sebelum} lulus`);
}
// s10: semua kombinasi benar jumlah roda dan batas sepuluh
for (const [x, y] of M.s10.KOMBINASI) cek(2 * x + 3 * y <= 10 && 2 * x + 3 * y >= 4, `kombinasi roda ${x},${y}`);
console.log(`Total ${lulus} lulus, ${gagal} gagal`);
process.exit(gagal ? 1 : 0);
