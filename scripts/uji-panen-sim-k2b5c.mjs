// Uji Simulasi Meja Panen Kelas 2 Bab 5 Sub-Bab C "Panen Raya Pak Joko": geometri, logika murni, misi, data, teks, emoji, akhir baris.
// Jalankan: node --no-warnings scripts/uji-panen-sim-k2b5c.mjs
import { readFileSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const G = await import("../src/components/modul/panen-k2b5c/geometri.ts");
const L = await import("../src/components/modul/panen-k2b5c/logika.ts");
const DS = await import("../src/components/modul/panen-k2b5c/data-sim.ts");
const MK = await import("../src/components/modul/misi-k2bab5.ts");
const S = await import("../src/components/modul/misi-simulasi.ts");

let lulus = 0;
let gagal = 0;
const cek = (k, p) => {
  if (k) lulus += 1;
  else {
    gagal += 1;
    console.log("GAGAL:", p);
  }
};
const TERLARANG = /(kelas|buku|teman|kelompok|skor|nilai|soal|tebak|kunci|latihan)/i;
const emojiSah = (s) => [...s].every((c) => c.codePointAt(0) <= 0x1fa95 && c.codePointAt(0) !== 0x200d && c.codePointAt(0) !== 0x1f6de);

/* ------------------------------ Geometri ------------------------------ */
{
  const jumlah = (b) => b.reduce((s, x) => s + x.luas, 0);
  for (const bangun of ["lingkaran", "persegi"]) {
    for (const [a, b] of [[0, 90], [45, 135], [30, 120], [60, 150], [0, 45], [0, 135], [30, 90]]) {
      const bag = G.bagiBangun(bangun, [{ a }, { a: b }]);
      cek(bag.length === 4 && Math.abs(jumlah(bag) - 1) < 1e-5, `${bangun} ${a}/${b}: empat bagian dengan jumlah luas satu`);
      cek(G.empatSama(bag) === G.tegakLurus(a, b), `${bangun} ${a}/${b}: empat sama besar bila dan hanya bila tegak lurus`);
    }
  }
  const mir = G.bagiBangun("persegi", [{ a: 45 }, { a: 135 }]);
  cek(G.empatSama(mir) && mir.every((x) => G.bentukBagian(x) === "segitiga"), "persegi miring kiri dan kanan: empat segitiga sama besar");
  const tg = G.bagiBangun("persegi", [{ a: 0 }, { a: 90 }]);
  cek(G.empatSama(tg) && tg.every((x) => G.bentukBagian(x) === "segiempat"), "persegi tegak dan datar: empat persegi sama besar");
  cek(G.bagiBangun("persegi", [{ a: 90 }]).length === 2 && G.semuaSama(G.bagiBangun("persegi", [{ a: 90 }])), "satu garis tengah: dua bagian sama besar");
  cek(!G.semuaSama(G.bagiBangun("persegi", [{ a: 90, d: 0.5 }])), "garis bergeser: dua bagian tidak sama besar");
  cek(G.bagiBangun("persegi", [{ a: 90, d: -0.4 }, { a: 90, d: 0.4 }]).length === 3, "dua garis sejajar: tiga bagian");
}

/* ------------------------------ Logika ------------------------------ */
{
  let k = L.awalPanen();
  cek(k.alat === "panen" && k.mode === "pai" && k.susun.length === 0 && k.bukti.length === 0, "keadaan awal");
  let r = L.tarikGarisPai(k, 0);
  cek(r.ok && !r.selesai && r.k.paiSeperempat === 0, "pai: satu garis belum menghitung");
  r = L.tarikGarisPai(r.k, 0);
  cek(!r.ok && r.k.salah === 1, "pai: garis kembar ditolak");
  r = L.tarikGarisPai(r.k, 90);
  cek(r.ok && r.selesai && r.k.paiSeperempat === 1 && r.k.paiTidakSama === 0 && /seperempat/.test(r.pesan), "pai: tegak lurus menjadi seperempat");
  r = L.tarikGarisPai(r.k, 45);
  cek(!r.ok && r.selesai, "pai: garis ketiga ditolak");
  k = L.ulangPai(r.k);
  cek(k.paiGaris.length === 0 && k.paiSeperempat === 1, "pai: ulangi tidak menghapus kemajuan");
  r = L.tarikGarisPai(L.tarikGarisPai(k, 0).k, 45);
  cek(r.k.paiTidakSama === 1 && /tidak sama besar/.test(r.pesan), "pai: tidak tegak lurus tidak sama besar");
  k = L.awalPanen();
  r = L.tarikGarisKain(L.tarikGarisKain(k, "kiri").k, "kanan");
  cek(r.k.kainSeperempat === 1 && r.k.kainSegitiga === 1 && r.k.kainPersegi === 0 && /segitiga/.test(r.pesan), "kain: miring kiri dan kanan empat segitiga");
  r = L.tarikGarisKain(L.tarikGarisKain(k, "tegak").k, "datar");
  cek(r.k.kainSeperempat === 1 && r.k.kainPersegi === 1 && r.k.kainSegitiga === 0, "kain: tegak dan datar empat persegi");
  r = L.tarikGarisKain(L.tarikGarisKain(k, "tegak").k, "kanan");
  cek(r.k.kainTidakSama === 1 && r.k.kainSeperempat === 0 && /tidak sama besar/.test(r.pesan), "kain: tegak dan miring tidak sama besar");
  cek(!L.tarikGarisKain(k, "ngawur").ok, "kain: garis tak dikenal ditolak");
  // Dinding.
  let t = L.tambahPita(L.awalPanen(), 1);
  cek(t.ok && t.k.bukti.length === 0, "dinding: satu pita belum bukti");
  t = L.tambahPita(t.k, 1);
  cek(t.k.bukti.join() === "2s=1t" && /setengah/.test(t.pesan), "dinding: dua seperempat sama dengan satu setengah");
  t = L.tambahPita(L.tambahPita(t.k, 1).k, 1);
  cek(t.k.bukti.join() === "2s=1t,4s=1u" && L.jumlahSusun(t.k.susun) === 4, "dinding: empat seperempat sama dengan satu utuh");
  const lebih = L.tambahPita(t.k, 1);
  cek(!lebih.ok && lebih.k.susun.length === 4 && lebih.k.salah === 1, "dinding: melebihi batas ditolak");
  t = L.tambahPita(L.tambahPita(L.awalPanen(), 2).k, 2);
  cek(t.k.bukti.join() === "2t=1u", "dinding: dua setengah sama dengan satu utuh");
  cek(!L.tambahPita(L.tambahPita(L.awalPanen(), 4).k, 1).ok, "dinding: utuh sudah memenuhi batang");
  cek(L.ulangSusun(t.k).susun.length === 0 && L.ulangSusun(t.k).bukti.length === 1, "dinding: ulangi mengosongkan batang, bukti tetap");
  cek(L.pilihModePanen(k, "dinding").mode === "dinding", "ganti alat");
  cek(L.tegakLurusPai([0, 90]) && !L.tegakLurusPai([0, 45]) && !L.tegakLurusPai([0]), "tegakLurusPai");
}

/* ------------------------------ Misi ------------------------------ */
{
  const d = MK.daftarMisiK2Bab5("C");
  const awal = L.awalPanen();
  cek(d === MK.MISI_C && d.filter((m) => m.wajib).length === 4 && d.filter((m) => !m.wajib).length === 2 && d.every((m) => m.id.startsWith("c-")), "misi: empat wajib, dua bebas, id c-");
  cek(d.every((m) => m.teks.length >= 10 && m.teks.length <= 120 && !/\d/.test(m.teks) && !TERLARANG.test(m.teks)), "misi: panjang, tanpa digit, tanpa kata terlarang");
  cek(S.misiBaru(d, awal, new Set()).length === 0, "misi: keadaan awal tidak memenuhi misi");
  cek(d.every((m) => !m.cek({ alat: "kerangka" })), "misi: alat lain tidak memenuhi");
  let k = L.awalPanen();
  k = L.tarikGarisPai(L.tarikGarisPai(k, 0).k, 90).k;
  k = L.ulangPai(k);
  k = L.tarikGarisPai(L.tarikGarisPai(k, 0).k, 30).k;
  k = L.tarikGarisKain(L.tarikGarisKain(k, "kiri").k, "kanan").k;
  k = L.tambahPita(L.tambahPita(L.tambahPita(L.tambahPita(k, 1).k, 1).k, 1).k, 1).k;
  const baru = S.misiBaru(d, k, new Set());
  cek(d.length === baru.length, `misi: semua tercapai lewat logika (${baru.join()})`);
}

/* ------------------------------ Data dan teks ------------------------------ */
{
  cek(DS.MISI_PANEN_TEKS.length >= 10 && DS.MISI_PANEN_TEKS.length <= 300 && !/\d/.test(DS.MISI_PANEN_TEKS) && !TERLARANG.test(DS.MISI_PANEN_TEKS), "teks misi awal");
  const semua = [...Object.values(L.SUARA_MODE), L.kalimatPaiHasil([0, 90]), L.kalimatPaiHasil([0, 45]), L.kalimatKainHasil(["kiri", "kanan"]), L.kalimatKainHasil(["tegak", "kanan"]), ...[[1], [1, 1], [1, 1, 1], [1, 1, 1, 1], [2, 2], [4], []].map((s) => L.kalimatSusun(s)), ...L.GARIS_KAIN.map((g) => g.nama), ...DS.PITA_SIM.map((p) => p.nama)];
  for (const t of semua) cek(!/\d/.test(t) && !TERLARANG.test(t) && !/bernilai/i.test(t), `teks sah: ${t.slice(0, 40)}`);
  cek(!/labu|petak tanah|melon|kupu|jerami/i.test(semua.join(" ") + DS.MISI_PANEN_TEKS), "benda berbeda dari Story");
  for (const f of ["logika.ts", "data-sim.ts", "geometri.ts", "SimulasiMejaPanen.tsx"]) {
    const s = readFileSync(new URL(`../src/components/modul/panen-k2b5c/${f}`, import.meta.url), "utf8");
    cek(!s.includes("\r") && !s.startsWith("﻿"), `${f}: LF tanpa BOM`);
    cek(emojiSah(s), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(f === "SimulasiMejaPanen.tsx" || !/from "react"|fetch\(/.test(s), `${f}: tanpa React dan jaringan`);
    cek(!/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}/i.test(s), `${f}: kode emoji sah`);
    if (f === "SimulasiMejaPanen.tsx") {
      const teksLayar = [...s.matchAll(/>\s*([^<>{}\n]+?)\s*</g)].map((m) => m[1]).join(" ");
      cek(!/\d/.test(teksLayar) && !TERLARANG.test(teksLayar), "SimulasiMejaPanen: teks layar tanpa digit dan kata terlarang");
    }
  }
}

console.log(gagal === 0 ? `SEMUA LULUS (${lulus} cek)` : `GAGAL ${gagal} dari ${lulus + gagal}`);
process.exit(gagal === 0 ? 0 : 1);
