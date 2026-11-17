// Uji tahap Mind-map, Infografis, Simulasi, Concrete, Pictorial, dan Abstract Kelas 1 Bab 3 Sub-Bab D ("Tiba di Rumah Nenek"), akhir cerita bab.
// Memeriksa: halaman rumah Nenek (Masalah, Penyelesaian berurutan memuat semua metode Story, Hasil), kartu resep dari data Story, CPA dua belas soal
// per tahap (Klik, Kanvas, Suara x empat metode), kunci dihitung ulang, angka jawaban tidak kembar per tahap dan pasangan berbeda dari Story,
// kartu kalimat dan kata kunci (tepat satu benar), tata letak kanvas, simulasi pembuat cerita dan misinya, emoji dan akhir baris.
// Jalankan: node --no-warnings scripts/uji-rumah-k1b3d.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/rumah-k1b3d/logika.ts");
const D = await import("../src/components/modul/rumah-k1b3d/data.ts");
const K = await import("../src/components/modul/rumah-k1b3d/periksa.ts");
const M = await import("../src/components/modul/misi-bab3.ts");
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
const sama = (a, b, p) => cek(JSON.stringify(a) === JSON.stringify(b), `${p}: ${JSON.stringify(a)} != ${JSON.stringify(b)}`);
const TERLARANG = /\b(kelas|buku|teman|kelompok|skor|nilai|soal|belas|puluh|puluhan|belasan)\b/i;
const MINUS = "−";

/* ------------------------------ Mind-map halaman rumah Nenek ------------------------------ */
{
  const t = D.TEMPAT_RUMAH;
  sama(["masalah", "metode", "hasil"].map((k) => t.filter((x) => x.kelompok === k).length), [3, 7, 3], "rumah: tiga masalah, tujuh baju, tiga hasil");
  cek(new Set(t.map((x) => x.kunci)).size === t.length && t.every((x) => x.kunci.length <= 30 && !/\d/.test(x.kunci)), "rumah: label unik, pendek, tanpa digit");
  sama(t.filter((x) => x.kelompok === "metode").map((x) => x.urutan), [1, 2, 3, 4, 5, 6, 7], "rumah: baju bernomor satu sampai tujuh");
  const gab = t.filter((x) => x.kelompok === "metode").map((x) => x.kunci).join(" | ").toLowerCase();
  for (const k of ["baca", "lingkari bilangan", "kotaki kata kunci", "model batang", "kalimat pengurangan", "kalimat lengkap", "periksa dengan penjumlahan"]) cek(gab.includes(k), `rumah: langkah memuat "${k}"`);
  cek(t.some((x) => /dua kali/i.test(x.kunci)) && t.some((x) => /cerita sendiri/.test(x.kunci)), "rumah: masalah dan hasil memuat dua kali dan cerita sendiri");
  cek(t.every((x) => !/kue|jeruk|permen|teh|igil|kaka|abang|mamah|nenek/i.test(x.kunci)), "rumah: label hanya poin pelajaran");
  cek(!/\d/.test(D.SUARA_RUMAH + D.PETUNJUK_URUT_RUMAH) && !TERLARANG.test(D.SUARA_RUMAH), "rumah: suara tanpa digit dan kata terlarang");
  const lb = L.labelDari(t, 53);
  let ok = true;
  for (const x of t) for (const l of lb) {
    const harus = x.urutan !== undefined ? l.teks === x.kunci : t.find((y) => y.kunci === l.teks).kelompok === x.kelompok;
    if (L.cocokKelompok(t, x, l) !== harus) ok = false;
  }
  cek(ok, "rumah: baju hanya menerima labelnya sendiri");
}

/* ------------------------------ Infografis kartu resep ------------------------------ */
{
  const b = D.BARIS_RESEP;
  sama(b.map((x) => x.kalimat), [`6 ${MINUS} 2 = 4`, `10 ${MINUS} 7 = 3`, `9 ${MINUS} 6 = 3`, `8 ${MINUS} 5 = 3`], "resep: data dari Story");
  for (const x of b) {
    const [a, , c, , h] = x.kalimat.split(" ").map((v) => (/\d/.test(v) ? Number(v) : v));
    cek(a - c === h && x.jawaban.startsWith(`${h} `), `resep: ${x.nama} benar dan jawaban lengkap`);
  }
  cek(new Set(D.TEMPAT_RESEP.map((x) => x.kunci)).size === 12, "resep: dua belas label tidak kembar");
  cek(D.TEMPAT_RESEP.every((x) => x.kunci.length <= 20) && !/\d/.test(D.SUARA_RESEP) && !TERLARANG.test(D.SUARA_RESEP), "resep: label pendek, suara tanpa digit");
}

/* ------------------------------ CPA ------------------------------ */
const STORY = new Set([[6, 2], [10, 7], [10, 3], [9, 2], [9, 6], [8, 5], [9, 3], [7, 5], [7, 2]].map(([a, b]) => `${a}-${b}`));
const STORY_DUA = new Set(["9-2-4", "10-3-2"]);
for (const [nama, soal, rupa] of [["Concrete", D.CONCRETE, "benda"], ["Pictorial", D.PICTORIAL, "diagram"], ["Abstract", D.ABSTRACT, "lambang"]]) {
  sama(soal.map((s) => s.cara), ["klik", "kanvas", "suara"], `${nama}: tiga cara`);
  sama(soal.map((s) => Number(/Nenek (\d+)/.exec(s.judul)[1])), { benda: [2, 3, 4], diagram: [5, 6, 7], lambang: [8, 9, 10] }[rupa], `${nama}: nomor misi berlanjut`);
  const semua = soal.flatMap((s) => s.langkah);
  sama(semua.length, 12, `${nama}: dua belas soal`);
  for (const s of soal) {
    sama(s.langkah.map((x) => x.metode), L.URUT_METODE, `${nama} ${s.cara}: empat metode`);
    cek(!TERLARANG.test(s.judul + s.cerita) && !/\d/.test(s.cerita), `${nama} ${s.cara}: cerita bersih`);
  }
  const angka = semua.map((x) => L.angkaJawab(x.langkah)).filter((n) => n !== null);
  cek(new Set(angka).size === angka.length && angka.length === 10, `${nama}: sepuluh angka jawaban tidak kembar (${angka.join(",")})`);
  cek(angka.every((n) => n >= 0 && n <= 10) && angka.includes(0), `${nama}: jawaban nol sampai sepuluh, ada nol`);
  for (const x of semua) {
    const l = x.langkah;
    cek(D.EMOJI[l.benda] !== undefined, `${nama} ${x.metode}/${x.cara}: benda punya gambar`);
    const harus = l.tipe === "cerita" ? null : l.tipe === "dua" ? l.a - l.b - l.c : l.a - l.b;
    sama(L.kunciLangkah(l), harus, `${nama} ${x.metode}/${x.cara}: kunci`);
    cek(l.a >= 1 && l.a <= 10 && l.b >= 0 && l.b <= l.a && (l.tipe !== "dua" || l.b + l.c <= l.a), `${nama} ${x.metode}/${x.cara}: bilangan sah`);
    cek(l.tipe === "dua" ? !STORY_DUA.has(`${l.a}-${l.b}-${l.c}`) && l.b >= 1 && l.c >= 1 : !STORY.has(`${l.a}-${l.b}`), `${nama} ${x.metode}/${x.cara}: bilangan berbeda dari Story`);
    const teks = L.teksCerita(l);
    cek(teks.length === 3 && teks.every((t) => t.length <= 40) && /\?$/.test(teks[2]), `${nama} ${x.metode}/${x.cara}: kartu cerita tiga baris berakhir pertanyaan`);
    cek(!/\d/.test(L.teksCerita(l, L.kata).join(" ")), `${nama} ${x.metode}/${x.cara}: cerita untuk suara tanpa digit`);
    if (l.tipe === "cerita") {
      const nb = L.nomorBenar(l);
      cek(nb.length === 1 && l.pilihan.length === 3 && new Set(l.pilihan.map(L.tulisKalimat)).size === 3, `${nama}: tepat satu kalimat cocok dari tiga`);
      cek(l.pilihan.every((p) => p.every((v) => v >= 0 && v <= 10)), `${nama}: kalimat pilihan dalam nol sampai sepuluh`);
      cek(x.cara !== "suara", `${nama}: cerita pilihan tidak untuk suara`);
    }
    if (l.tipe === "kunci") {
      const tiga = L.kataKunci(l);
      cek(tiga.length === 3 && tiga.filter((t) => t === l.kata).length === 1 && new Set(tiga).size === 3, `${nama}: tepat satu kata kunci berkurang dari tiga`);
      cek(/^di/.test(l.kata) && l.pengecoh.every((p) => !/makan|beri|minum|bagi/.test(p)), `${nama}: pengecoh berarti bertambah`);
    }
    if (harus !== null) {
      const p = L.pilihanDari(l);
      cek(p.includes(harus) && new Set(p).size === 3 && p.every((v) => v >= 0 && v <= 10), `${nama} ${x.metode}/${x.cara}: pilihan memuat kunci`);
    }
    if (x.cara === "suara") cek(harus !== null, `${nama}: soal suara berjawaban angka`);
    cek(!/\d/.test(x.suara) && !TERLARANG.test(x.suara) && x.suara.length <= 220, `${nama} ${x.metode}/${x.cara}: instruksi tanpa digit ("${x.suara}")`);
  }
  const L2 = semua.map((x) => x.langkah);
  cek(L2.some((l) => l.tipe === "batang" && l.cari === "sisa") && L2.some((l) => l.tipe === "batang" && l.cari === "pergi"), `${nama}: model batang mencari sisa dan yang pergi`);
}
{
  cek(D.POIN_PENTING.length >= 5 && D.POIN_PENTING_SUARA.every((p) => !/[+=\d−]/.test(p)), "poin penting: suara tanpa lambang dan digit");
  cek(D.POIN_PENTING.some((p) => /kata kunci/.test(p)) && D.POIN_PENTING.some((p) => /kalimat lengkap/.test(p)) && D.POIN_PENTING.some((p) => /penjumlahan/.test(p)), "poin penting: kata kunci, kalimat lengkap, periksa");
  for (let a = 1; a <= 10; a += 1) for (let b = 0; b <= a; b += 1) {
    const p = D.pilihanKalimat(a, b, 0);
    if (!(p.filter((q) => L.samaKalimat(q, [a, b, a - b])).length === 1 && p.every((q) => q.every((v) => v >= 0 && v <= 10)) && new Set(p.map(L.tulisKalimat)).size === 3)) cek(false, `pilihanKalimat ${a} dan ${b}`);
  }
}

/* ------------------------------ Cari kesalahan (pedoman mutu) ------------------------------ */
for (const [nama, soal] of [["Concrete", D.CONCRETE], ["Pictorial", D.PICTORIAL], ["Abstract", D.ABSTRACT]]) {
  const klik = soal.find((s) => s.cara === "klik");
  const l = klik.langkah[0].langkah;
  const klaim = L.kalimatTokoh(l);
  cek(typeof l.tokoh === "string" && klaim !== null && l.pilihan.includes(klaim), `${nama}: soal klik pertama adalah cari kesalahan tokoh`);
  cek(klaim !== null && !(klaim[0] - klaim[1] === klaim[2]), `${nama}: tulisan tokoh memang keliru`);
  cek(/Cari kesalahan\./.test(klik.langkah[0].suara) && !/\d/.test(klik.langkah[0].suara), `${nama}: instruksi cari kesalahan tanpa digit`);
}
const tokohSemua = [D.CONCRETE, D.PICTORIAL, D.ABSTRACT].map((s) => s.find((x) => x.cara === "klik").langkah[0].langkah.tokoh);
cek(new Set(tokohSemua).size === 3, "cari kesalahan: tokoh berganti tiap tahap");

/* ------------------------------ Kanvas dan tata letak ------------------------------ */
{
  const dalam = (t, k, pad = 8) => t.x >= k.x + pad && t.x <= k.x + k.w - pad && t.y >= k.y + pad && t.y <= k.y + k.h - pad;
  for (let i = 0; i < 10; i += 1) {
    cek(dalam(K.letakMeja(i), K.MEJA), `letak: benda ${i} di meja`);
    cek(dalam(K.letakNampan(i), K.NAMPAN), `letak: benda ${i} di nampan`);
    cek(dalam(K.letakPergi(i), K.PERGI, 6), `letak: benda ${i} di tempat pergi`);
  }
  for (let a = 1; a <= 10; a += 1) cek(K.letakSel(a, 0).x - K.SEL / 2 >= 14 && K.letakSel(a, a - 1).x + K.SEL / 2 <= 286, `letak: model batang ${a} sel muat`);
  for (let i = 0; i < 3; i += 1) {
    cek(K.letakKartu(i).y + K.UKURAN_KARTU.h / 2 <= 200 && K.letakKartu(i).y - K.UKURAN_KARTU.h / 2 > K.KARTU_CERITA.y + K.KARTU_CERITA.h, `letak: kartu ${i} di bawah cerita`);
    const c = K.letakKata(i);
    cek(c.x - K.UKURAN_KATA.w / 2 >= 14 && c.x + K.UKURAN_KATA.w / 2 <= 286 && c.y - K.UKURAN_KATA.h / 2 > K.CERITA_KECIL.y + K.CERITA_KECIL.h, `letak: kata ${i} di bawah cerita`);
  }
  sama(K.selDicari(7, 4), [4, 5, 6], "batang: tiga sel dicari setelah empat");
  const lingkar = (c, rx, ry = rx) => [Array.from({ length: 24 }, (_, i) => ({ x: c.x + rx * Math.cos((i / 23) * 2 * Math.PI), y: c.y + ry * Math.sin((i / 23) * 2 * Math.PI) }))];
  const kata = [0, 1, 2].map((i) => K.letakKata(i));
  cek(K.periksaLingkari(lingkar(kata[1], 40, 16), kata, [false, true, false]).benar, "kunci: lingkari kata tengah");
  cek(!K.periksaLingkari(lingkar(kata[1], 100, 16), kata, [false, true, false]).benar, "kunci: lingkaran terlalu lebar ikut menangkap kata lain");
  const coret = (p) => [{ x: p.x - 8, y: p.y - 8 }, { x: p.x + 8, y: p.y + 8 }];
  const n = Array.from({ length: 9 }, (_, i) => K.letakNampan(i));
  cek(K.periksaCoretBebas([0, 3, 5].map((i) => coret(n[i])), n, 3).benar && !K.periksaCoretBebas([0, 3].map((i) => coret(n[i])), n, 3).benar, "dua: coret bebas sebanyak yang pergi");
}

/* ------------------------------ Simulasi pembuat cerita ------------------------------ */
{
  let k = L.awalCerita(D.AWAL_SIM.a, D.AWAL_SIM.b);
  sama([k.a, k.b, L.sisaCerita(k)], [7, 3, 4], "cerita: bilangan awal");
  cek(!STORY.has(`${k.a}-${k.b}`), "cerita: berbeda dari Story");
  sama(L.ceritaSim(k), ["Ada 7 kue.", "3 kue dimakan.", "Berapa kue yang tersisa?"], "cerita: kartu cerita");
  sama(L.jawabLengkap(k), "Jadi, tersisa 4 kue.", "cerita: jawaban lengkap");
  cek(!/\d/.test(L.bacaSim(k)), "cerita: dibaca tanpa digit");
  k = L.kirimCerita(k);
  sama(k.kirim, ["kue:dimakan:7-3=4"], "cerita: kirim");
  sama(L.kirimCerita(k), k, "cerita: kiriman kembar diabaikan");
  let u = k;
  for (let i = 0; i < 9; i += 1) u = L.ubahCerita(u, "b", 1);
  sama(u.b, 7, "cerita: berkurang tidak lebih dari mula-mula");
  for (let i = 0; i < 12; i += 1) u = L.ubahCerita(u, "a", -1);
  sama([u.a, u.b], [1, 1], "cerita: mula-mula paling sedikit satu, berkurang ikut turun");
  for (let i = 0; i < 12; i += 1) u = L.ubahCerita(u, "a", 1);
  sama(u.a, 10, "cerita: mula-mula paling banyak sepuluh");
  const daftar = M.daftarMisiBab3("D");
  const ada = (st, id) => S.misiBaru(daftar, st, new Set()).includes(id);
  const awal = L.awalCerita(D.AWAL_SIM.a, D.AWAL_SIM.b);
  cek(daftar.filter((x) => x.wajib).length === 4 && daftar.some((x) => !x.wajib) && daftar.every((x) => !/\d/.test(x.teks)), "misi D: empat wajib, ada bebas, tanpa digit");
  cek(daftar.every((x) => !x.cek(awal)), "misi D: awal belum tercapai");
  cek(ada(k, "d-kirim") && !ada(k, "d-periksa") && ada(L.periksaCerita(awal), "d-periksa"), "misi D: kirim dan periksa");
  let nol = awal;
  for (let i = 0; i < 4; i += 1) nol = L.ubahCerita(nol, "b", 1);
  cek(ada(L.kirimCerita(nol), "d-nol") && !ada(L.kirimCerita(awal), "d-nol"), "misi D: sisa nol");
  let tiga = L.kirimCerita(awal);
  tiga = L.kirimCerita(L.pilihBenda(tiga, "jeruk"));
  cek(!ada(tiga, "d-tiga"), "misi D: dua benda belum cukup");
  tiga = L.kirimCerita(L.pilihKata(L.pilihBenda(tiga, "teh"), "diminum"));
  cek(ada(tiga, "d-tiga") && ada(tiga, "d-kata"), "misi D: tiga benda dan dua kata kunci");
  let s10 = awal;
  for (let i = 0; i < 3; i += 1) s10 = L.ubahCerita(s10, "a", 1);
  cek(ada(L.kirimCerita(s10), "d-sepuluh"), "misi D: mula-mula sepuluh");
}

/* ------------------------------ Berkas ------------------------------ */
{
  const folder = new URL("../src/components/modul/rumah-k1b3d/", import.meta.url);
  const berkas = readdirSync(folder);
  cek(berkas.length >= 8, `berkas rumah-k1b3d (${berkas.length})`);
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folder), "utf8");
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d) && !/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}/i.test(s), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(!/fetch\(|XMLHttpRequest/i.test(s), `${f}: tanpa jaringan`);
    if (/\.ts$/.test(f)) cek(!/from "react"/.test(s), `${f}: tanpa React`);
    const str = [...s.matchAll(/"([^"\n]{12,})"/g)].map((m) => m[1]).filter((x) => /\s/.test(x) && !x.includes("===") && !/^[a-z-]+( [a-z-:[\]#/0-9.()_,'%]+)*$/.test(x));
    cek(str.every((x) => !/\b(kelas|buku|teman|kelompok|skor|nilai|belas|puluh)\b/i.test(x)), `${f}: teks tanpa kata terlarang`);
  }
}

console.log(`Lulus ${lulus}, gagal ${gagal}`);
process.exit(gagal ? 1 : 0);
