// Uji tahap Mind-map, Infografis, Simulasi, Concrete, Pictorial, dan Abstract Kelas 1 Bab 3 Sub-Bab C ("Kondektur dan Penumpang").
// Memeriksa: peta lampu sinyal (Masalah, Penyelesaian berurutan memuat semua metode Story, Hasil), papan catatan dari data Story, CPA dua belas soal
// per tahap (Klik, Kanvas, Suara x empat metode), kunci dihitung ulang, angka jawaban tidak kembar per tahap, keluarga bilangan berbeda dari Story,
// kartu penjumlahan pemeriksa (tepat satu benar), tata letak kanvas, simulasi papan kondektur dan misinya, emoji dan akhir baris.
// Jalankan: node --no-warnings scripts/uji-kondektur-k1b3c.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/kondektur-k1b3c/logika.ts");
const D = await import("../src/components/modul/kondektur-k1b3c/data.ts");
const K = await import("../src/components/modul/kondektur-k1b3c/periksa.ts");
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
const TERLARANG = /\b(kelas|buku|teman|kelompok|skor|nilai|belas|puluh|puluhan|belasan)\b/i;
const MINUS = "−";

/* ------------------------------ Mind-map lampu sinyal ------------------------------ */
{
  const t = D.TEMPAT_SINYAL;
  sama(["masalah", "metode", "hasil"].map((k) => t.filter((x) => x.kelompok === k).length), [3, 7, 3], "sinyal: tiga masalah, tujuh lampu, tiga hasil");
  cek(new Set(t.map((x) => x.kunci)).size === t.length && t.every((x) => x.kunci.length <= 30 && !/\d/.test(x.kunci)), "sinyal: label unik, pendek, tanpa digit");
  sama(t.filter((x) => x.kelompok === "metode").map((x) => x.urutan), [1, 2, 3, 4, 5, 6, 7], "sinyal: lampu bernomor satu sampai tujuh");
  const gab = t.filter((x) => x.kelompok === "metode").map((x) => x.kunci).join(" | ").toLowerCase();
  for (const k of ["tukar tempat", "sekeluarga", "dua tambah, dua kurang", "tak boleh ditukar", "periksa dengan penjumlahan", "segitiga fakta", "yang hilang"]) cek(gab.includes(k), `sinyal: langkah memuat "${k}"`);
  cek(t.every((x) => !/igil|kaka|abang|mamah|nenek|kondektur/i.test(x.kunci)), "sinyal: label hanya poin pelajaran");
  cek(!/\d/.test(D.SUARA_SINYAL + D.PETUNJUK_URUT_SINYAL) && !TERLARANG.test(D.SUARA_SINYAL), "sinyal: suara tanpa digit dan kata terlarang");
  const lb = L.labelDari(t, 47);
  let ok = true;
  for (const x of t) for (const l of lb) {
    const harus = x.urutan !== undefined ? l.teks === x.kunci : t.find((y) => y.kunci === l.teks).kelompok === x.kelompok;
    if (L.cocokKelompok(t, x, l) !== harus) ok = false;
  }
  cek(ok, "sinyal: lampu hanya menerima labelnya sendiri");
}

/* ------------------------------ Infografis papan catatan ------------------------------ */
{
  const b = D.BARIS_CATATAN;
  sama(b.map((x) => x.kalimat), ["4 + 3 = 7", `9 ${MINUS} 5 = 4`, "6 + ? = 9"], "catatan: data dari Story");
  sama(b.map((x) => x.balik), [`7 ${MINUS} 3 = 4`, "4 + 5 = 9", `9 ${MINUS} 6 = 3`], "catatan: kalimat kebalikan");
  for (const x of b) {
    const kel = x.keluarga.split(", ").map(Number);
    const angka = (s) => (s.match(/\d+/g) ?? []).map(Number);
    cek(kel[0] + kel[1] === kel[2] && [...angka(x.kalimat), ...angka(x.balik)].every((n) => kel.includes(n)), `catatan: ${x.nama} sekeluarga`);
  }
  cek(new Set(D.TEMPAT_CATATAN.map((x) => x.kunci)).size === 9, "catatan: sembilan label tidak kembar");
  cek(!/\d/.test(D.SUARA_CATATAN) && !TERLARANG.test(D.SUARA_CATATAN), "catatan: suara tanpa digit");
}

/* ------------------------------ CPA ------------------------------ */
const kunciKel = (x) => [...x].sort((p, q) => p - q).join(",");
const STORY = new Set([[3, 4, 7], [4, 5, 9], [3, 6, 9], [2, 6, 8], [1, 9, 10], [2, 7, 9], [3, 5, 8]].map(kunciKel));
for (const [nama, soal, rupa] of [["Concrete", D.CONCRETE, "benda"], ["Pictorial", D.PICTORIAL, "diagram"], ["Abstract", D.ABSTRACT, "lambang"]]) {
  sama(soal.map((s) => s.cara), ["klik", "kanvas", "suara"], `${nama}: tiga cara`);
  sama(soal.map((s) => Number(/Kondektur (\d+)/.exec(s.judul)[1])), { benda: [2, 3, 4], diagram: [5, 6, 7], lambang: [8, 9, 10] }[rupa], `${nama}: nomor misi berlanjut`);
  const semua = soal.flatMap((s) => s.langkah);
  sama(semua.length, 12, `${nama}: dua belas soal`);
  for (const s of soal) {
    sama(s.langkah.map((x) => x.metode), L.URUT_METODE, `${nama} ${s.cara}: empat metode`);
    cek(!TERLARANG.test(s.judul + s.cerita) && !/\d/.test(s.cerita), `${nama} ${s.cara}: cerita bersih`);
    cek(D.EMOJI[s.benda] !== undefined, `${nama} ${s.cara}: benda punya gambar`);
  }
  const angka = semua.map((x) => L.angkaJawab(x.langkah)).filter((n) => n !== null);
  cek(new Set(angka).size === angka.length && angka.length === 10, `${nama}: sepuluh angka jawaban tidak kembar (${angka.join(",")})`);
  cek(angka.every((n) => n >= 0 && n <= 10), `${nama}: jawaban nol sampai sepuluh`);
  for (const x of semua) {
    const l = x.langkah;
    const kel = L.keluargaLangkah(l);
    cek(kel[0] >= 0 && kel[1] >= 0 && kel[0] + kel[1] === kel[2] && kel[2] <= 10, `${nama} ${x.metode}/${x.cara}: keluarga sah (${kel})`);
    cek(!STORY.has(kunciKel(kel)), `${nama} ${x.metode}/${x.cara}: keluarga ${kel} berbeda dari Story`);
    const harus = { periksa: null, tukar: kel[2], keluarga: kel[1], segitiga: l.tipe === "segitiga" && l.tutup === "z" ? kel[2] : kel[1], hilang: kel[1] }[l.tipe];
    sama(L.kunciLangkah(l), harus, `${nama} ${x.metode}/${x.cara}: kunci`);
    const kj = L.kalimatJawab(l);
    if (kj) cek(L.benarOp(kj), `${nama} ${x.metode}/${x.cara}: kalimat jawaban benar`);
    if (l.tipe === "periksa") {
      const nb = L.nomorBenar(l);
      cek(nb.length === 1 && l.pilihan.length === 3 && new Set(l.pilihan.map(L.tulisOp)).size === 3, `${nama}: tepat satu penjumlahan pemeriksa dari tiga`);
      cek(l.pilihan.every((p) => [p.x, p.y, p.z].every((v) => v >= 0 && v <= 10)), `${nama}: kalimat pilihan dalam nol sampai sepuluh`);
      cek(l.pilihan.some((p) => p.op === "-") && l.pilihan.some((p) => p.op === "+" && !L.benarOp(p)), `${nama}: pengecoh pengurangan dan hasil salah`);
      cek(x.cara !== "suara", `${nama}: periksa tidak untuk suara`);
    }
    if (l.tipe === "tukar") cek(l.a !== l.b && x.cara === "suara", `${nama}: tukar dengan dua bilangan berbeda, lewat suara`);
    if (l.tipe === "keluarga" && rupa !== "lambang") cek(l.x >= 1, `${nama}: keluarga punya penumpang biru`);
    if (l.tipe === "segitiga") cek(l.x >= 1 && l.y >= 1, `${nama}: segitiga tanpa nol`);
    if (harus !== null) {
      const p = L.pilihanDari(l);
      cek(p.includes(harus) && new Set(p).size === 3 && p.every((v) => v >= 0 && v <= 10), `${nama} ${x.metode}/${x.cara}: pilihan memuat kunci`);
    }
    if (x.cara === "suara") cek(harus !== null, `${nama}: soal suara berjawaban angka`);
    cek(!/\d/.test(x.suara) && !TERLARANG.test(x.suara) && x.suara.length <= 170, `${nama} ${x.metode}/${x.cara}: instruksi tanpa digit ("${x.suara}")`);
  }
  const L2 = semua.map((x) => x.langkah);
  cek(L2.some((l) => l.tipe === "segitiga" && l.tutup === "z") && L2.some((l) => l.tipe === "segitiga" && l.tutup === "y") || rupa === "diagram" || rupa === "lambang", `${nama}: segitiga tutup pucuk dan pojok`);
  cek(L2.some((l) => l.tipe === "segitiga" && l.tutup === "y"), `${nama}: ada segitiga yang pojoknya tertutup`);
}
{
  for (let a = 1; a <= 10; a += 1) for (let b = 1; b < a; b += 1) {
    const l = { tipe: "periksa", a, b, pilihan: D.pilihanPeriksa(a, b, 0) };
    if (!(L.nomorBenar(l).length === 1 && l.pilihan.every((p) => [p.x, p.y, p.z].every((v) => v >= 0 && v <= 10)) && new Set(l.pilihan.map(L.tulisOp)).size === 3)) cek(false, `pilihanPeriksa ${a} dan ${b}`);
  }
  cek(L.bacaOp({ x: 4, op: "+", y: 5, z: 9 }) === "empat ditambah lima sama dengan sembilan" && L.tulisOp({ x: 9, op: "-", y: 5, z: 4 }) === `9 ${MINUS} 5 = 4`, "kalimat: dibaca dan ditulis");
  cek(D.POIN_PENTING.length >= 5 && D.POIN_PENTING_SUARA.every((p) => !/[+=\d−]/.test(p)), "poin penting: suara tanpa lambang dan digit");
  cek(D.POIN_PENTING.some((p) => /berkebalikan/.test(p)) && D.POIN_PENTING.some((p) => /tidak boleh ditukar/.test(p)) && D.POIN_PENTING.some((p) => /hilang/.test(p)), "poin penting: kebalikan, tukar, dan hilang");
}

/* ------------------------------ Cari kesalahan (pedoman mutu) ------------------------------ */
for (const [nama, soal] of [["Concrete", D.CONCRETE], ["Pictorial", D.PICTORIAL], ["Abstract", D.ABSTRACT]]) {
  const klik = soal.find((s) => s.cara === "klik");
  const l = klik.langkah[0].langkah;
  const klaim = L.kalimatTokoh(l);
  cek(typeof l.tokoh === "string" && klaim !== null && l.pilihan.includes(klaim), `${nama}: soal klik pertama adalah cari kesalahan tokoh`);
  cek(klaim !== null && !(klaim.op === "+"), `${nama}: tulisan tokoh memang keliru`);
  cek(/Cari kesalahan\./.test(klik.langkah[0].suara) && !/\d/.test(klik.langkah[0].suara), `${nama}: instruksi cari kesalahan tanpa digit`);
}
const tokohSemua = [D.CONCRETE, D.PICTORIAL, D.ABSTRACT].map((s) => s.find((x) => x.cara === "klik").langkah[0].langkah.tokoh);
cek(new Set(tokohSemua).size === 3, "cari kesalahan: tokoh berganti tiap tahap");

/* ------------------------------ Kanvas dan tata letak ------------------------------ */
{
  const dalam = (t, k, pad = 8) => t.x >= k.x + pad && t.x <= k.x + k.w - pad && t.y >= k.y + pad && t.y <= k.y + k.h - pad;
  for (let i = 0; i < 10; i += 1) {
    cek(dalam(K.letakGerbongKecil(i), K.GERBONG_KECIL), `letak: benda ${i} di gerbong kecil`);
    cek(dalam(K.letakGerbong(i), K.GERBONG), `letak: benda ${i} di gerbong`);
    cek(dalam(K.letakPucuk(i), K.PUCUK, 6), `letak: benda ${i} di pucuk`);
  }
  for (let i = 0; i < 8; i += 1) {
    cek(dalam(K.letakDi(K.KIRI, i), K.KIRI) && dalam(K.letakDi(K.KANAN, i), K.KANAN), `letak: benda ${i} di kiri dan kanan`);
    cek(dalam(K.letakPojok(K.POJOK_KIRI, i), K.POJOK_KIRI, 6) && dalam(K.letakPojok(K.POJOK_KANAN, i), K.POJOK_KANAN, 6), `letak: benda ${i} di pojok`);
  }
  for (let c = 1; c <= 10; c += 1) {
    const xs = Array.from({ length: c }, (_, i) => K.letakKursi(c, i).x);
    cek(xs[0] >= 18 && xs[c - 1] <= 282, `letak: baris ${c} kursi muat`);
  }
  for (let i = 0; i < 3; i += 1) cek(K.letakKartu(i).y + K.UKURAN_KARTU.h / 2 <= 200 && K.letakKartu(i).y - K.UKURAN_KARTU.h / 2 > K.GERBONG_KECIL.y + K.GERBONG_KECIL.h, `letak: kartu ${i} di bawah adegan`);
  sama(K.kursiHilang(3, 2), [3, 4], "hilang: dua kursi kosong setelah tiga");
  const tanda = (p) => [{ x: p.x - 3, y: p.y - 3 }, { x: p.x + 3, y: p.y + 3 }];
  const ks = K.kursiHilang(2, 5).map((i) => K.letakKursi(7, i));
  cek(K.periksaCentang(ks.map(tanda), ks, 13).benar, "hilang: tanda pada kursi kosong diterima");
  const r = K.periksaCentang([...ks.map(tanda), tanda(K.letakKursi(7, 0))], ks, 13);
  cek(!r.benar && r.nyasar === 1, "hilang: tanda pada kursi terisi ditolak");
}

/* ------------------------------ Simulasi papan kondektur ------------------------------ */
{
  let k = L.awalKeluarga(D.AWAL_SIM.x, D.AWAL_SIM.y);
  sama([k.x, k.y], [2, 5], "papan: bilangan awal");
  cek(!STORY.has(kunciKel([k.x, k.y, k.x + k.y])), "papan: keluarga awal berbeda dari Story");
  sama(L.empatKalimat(k), ["2+5=7", "5+2=7", "7-2=5", "7-5=2"], "papan: empat kalimat");
  for (const i of [0, 1, 2, 3]) k = L.catatKeluarga(k, i);
  sama(k.catat.length, 4, "papan: catat empat kalimat");
  sama(L.catatKeluarga(k, 0), k, "papan: catatan kembar diabaikan");
  let u = k;
  for (let i = 0; i < 6; i += 1) u = L.ubahBagian(u, "x", 1);
  sama(u.x + u.y, 10, "papan: semuanya paling banyak sepuluh");
  for (let i = 0; i < 12; i += 1) u = L.ubahBagian(u, "x", -1);
  sama(u.x, 0, "papan: tidak di bawah nol");
  const t1 = L.tutupPojok(k, "z");
  sama([t1.tutup, L.tebakPojok(t1, 6).benar, L.tebakPojok(t1, 7).benar, L.tebakPojok(t1, 7).k.dibuka], ["z", false, true, ["z"]], "papan: tutup pucuk lalu tebak");
  for (const i of [0, 1, 2, 3]) cek(!/\d/.test(L.bacaCatat(L.empatKalimat(k)[i])), `papan: kalimat dibaca tanpa digit ${i}`);
  const daftar = M.daftarMisiBab3("C");
  const ada = (st, id) => S.misiBaru(daftar, st, new Set()).includes(id);
  const awal = L.awalKeluarga(D.AWAL_SIM.x, D.AWAL_SIM.y);
  cek(daftar.filter((x) => x.wajib).length === 4 && daftar.some((x) => !x.wajib) && daftar.every((x) => !/\d/.test(x.teks)), "misi C: empat wajib, ada bebas, tanpa digit");
  cek(daftar.every((x) => !x.cek(awal)), "misi C: awal belum tercapai");
  cek(ada(k, "c-empat") && ada(k, "c-periksa"), "misi C: empat kalimat dan periksa");
  cek(ada(L.catatKeluarga(L.catatKeluarga(awal, 2), 0), "c-periksa") && !ada(L.catatKeluarga(L.catatKeluarga(awal, 2), 3), "c-periksa"), "misi C: pengurangan dengan penjumlahan pemeriksanya");
  cek(!ada(L.catatKeluarga(L.catatKeluarga(awal, 0), 2), "c-empat"), "misi C: dua kalimat belum cukup");
  cek(ada(L.tebakPojok(t1, 7).k, "c-pucuk") && ada(L.tebakPojok(L.tutupPojok(awal, "y"), 5).k, "c-pojok"), "misi C: tebak pucuk dan pojok");
  let s10 = awal;
  for (let i = 0; i < 3; i += 1) s10 = L.ubahBagian(s10, "x", 1);
  cek(ada(s10, "c-sepuluh"), "misi C: keluarga sepuluh");
  let n0 = awal;
  for (let i = 0; i < 2; i += 1) n0 = L.ubahBagian(n0, "x", -1);
  cek(ada(L.catatKeluarga(n0, 0), "c-nol"), "misi C: kalimat dengan nol");
}

/* ------------------------------ Berkas ------------------------------ */
{
  const folder = new URL("../src/components/modul/kondektur-k1b3c/", import.meta.url);
  const berkas = readdirSync(folder);
  cek(berkas.length >= 8, `berkas kondektur-k1b3c (${berkas.length})`);
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
