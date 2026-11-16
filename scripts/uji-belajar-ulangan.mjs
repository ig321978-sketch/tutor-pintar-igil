// Uji ulangan harian dan jadwal ulang (src/lib/belajar/simpan.ts, ulangan.ts). Pakai: node --no-warnings scripts/uji-belajar-ulangan.mjs
import { register } from "node:module";
register("data:text/javascript," + encodeURIComponent("export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/[.][a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch { return n(s, c); } } return n(s, c); }"), import.meta.url);
const P = await import("../src/lib/belajar/simpan.ts");
const U = await import("../src/lib/belajar/ulangan.ts");
let lulus = 0, gagal = 0;
const cek = (ok, ket) => { if (ok) lulus += 1; else { gagal += 1; console.log("GAGAL:", ket); } };
const mem = new Map(); const g = { getItem: (k) => mem.get(k) ?? null, setItem: (k, v) => mem.set(k, v) };
const hari = (n) => new Date(Date.UTC(2026, 0, 1 + n));

// belum lulus: tidak jatuh tempo
cek(P.jatuhTempo(g, ["k1b2-s1"], hari(5)).length === 0, "belum lulus tidak masuk ulangan");
P.catatCek(g, "k1b2-s1", 5, [], hari(0)); // kotak 1, jatuh tempo hari 1
cek(P.jatuhTempo(g, ["k1b2-s1"], hari(0)).length === 0, "belum jatuh tempo");
cek(P.jatuhTempo(g, ["k1b2-s1"], hari(1)).length === 1, "jatuh tempo tepat");
// ulangan benar: kotak naik, interval 3 hari
let t = P.catatUlangan(g, "k1b2-s1", true, null, hari(1));
cek(t.status.kotak === 2 && t.status.jatuhTempo === hari(4).toISOString(), "ulangan benar naik ke kotak 2, jatuh tempo 3 hari");
t = P.catatUlangan(g, "k1b2-s1", true, null, hari(4));
cek(t.status.kotak === 3 && t.status.jatuhTempo === hari(11).toISOString(), "kotak 3, jatuh tempo 7 hari");
// ulangan salah: kembali ke kotak 0, besok diulang, lulus terakhir tetap, miskonsepsi tercatat
const lulusSebelum = t.status.lulusTerakhir;
t = P.catatUlangan(g, "k1b2-s1", false, "m-lewat-satu", hari(11));
cek(t.status.kotak === 0 && t.status.jatuhTempo === hari(12).toISOString() && t.status.lulusTerakhir === lulusSebelum, "lupa: kotak 0, diulang besok, tanggal lulus tetap");
cek(t.catatan.at(-1).miskonsepsiTerdeteksi[0] === "m-lewat-satu", "miskonsepsi ulangan tercatat");
cek(P.jatuhTempo(g, ["k1b2-s1"], hari(12)).length === 1, "setelah lupa muncul lagi besok");
// kotak maksimum
for (let i = 0; i < 10; i += 1) t = P.catatUlangan(g, "k1b2-s1", true, null, hari(20 + i * 40));
cek(t.status.kotak === 5, "kotak maksimum lima");
// catatan dibatasi
for (let i = 0; i < 50; i += 1) t = P.catatUlangan(g, "k1b2-s1", false, "m-ambil-satu", hari(500 + i));
cek(t.catatan.length <= 30, "catatan dibatasi 30");
// pencampuran sesi
const ids = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];
for (let b = 1; b <= 500; b += 1) {
  const s = U.acakSesi(ids, b, 8);
  cek(s.length === 8 && new Set(s).size === 8 && s.every((x) => ids.includes(x)), `sesi unik ${b}`);
  cek(JSON.stringify(s) === JSON.stringify(U.acakSesi(ids, b, 8)), "sesi berbenih dapat diulang");
}
cek(U.acakSesi(ids, 1, 0).length === 0 && U.acakSesi(["a"], 1, 8).length === 1, "batas sesi");
console.log(`${lulus} lulus, ${gagal} gagal`);
process.exit(gagal ? 1 : 0);
