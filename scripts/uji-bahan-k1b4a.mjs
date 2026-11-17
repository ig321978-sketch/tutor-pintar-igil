// Uji tahap Mind-map, Infografis, Simulasi, Concrete, Pictorial, dan Abstract Kelas 1 Bab 4 Sub-Bab A ("Bahan dari Gudang"), awal Festival Mainan Kardus.
// Memeriksa: untaian bendera (Masalah, Penyelesaian berurutan memuat semua metode Story, Hasil), kartu bahan dari data Story, CPA dua belas soal per tahap
// (Klik, Kanvas, Suara x empat metode), kunci dihitung ulang, angka jawaban tidak kembar per tahap dan berbeda dari Story, batas rupa
// (Concrete benda, Pictorial tanpa gambar benda, Abstract kartu kata), tata letak kanvas dan papan paku, simulasi meja bahan dan misinya, emoji dan akhir baris.
// Jalankan: node --no-warnings scripts/uji-bahan-k1b4a.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/bahan-k1b4a/logika.ts");
const D = await import("../src/components/modul/bahan-k1b4a/data.ts");
const K = await import("../src/components/modul/bahan-k1b4a/periksa.ts");
const M = await import("../src/components/modul/misi-bab4.ts");
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
const TERLARANG = /\b(kelas|buku|teman|kelompok|mengelompokkan|skor|nilai|soal|belas|puluh|ditambah|dikurangi)\b/i;

/* ------------------------------ Mind-map untaian bendera ------------------------------ */
{
  const t = D.TEMPAT_BENDERA;
  sama(["masalah", "metode", "hasil"].map((k) => t.filter((x) => x.kelompok === k).length), [3, 7, 4], "bendera: tiga masalah, tujuh bendera, empat hasil");
  cek(new Set(t.map((x) => x.kunci)).size === t.length && t.every((x) => x.kunci.length <= 26 && !/\d/.test(x.kunci)), "bendera: label unik, pendek, tanpa digit");
  sama(t.filter((x) => x.kelompok === "metode").map((x) => x.urutan), [1, 2, 3, 4, 5, 6, 7], "bendera: bernomor satu sampai tujuh");
  const gab = t.filter((x) => x.kelompok === "metode").map((x) => x.kunci).join(" | ").toLowerCase();
  for (const k of ["amati", "sisi lurus", "sudut", "nama", "berburu bentuk", "papan paku", "bentuk misterius"]) cek(gab.includes(k), `bendera: langkah memuat "${k}"`);
  const hasil = t.filter((x) => x.kelompok === "hasil").map((x) => x.kunci).join(" | ").toLowerCase();
  for (const k of ["lengkung", "segitiga", "segi empat", "diputar"]) cek(hasil.includes(k), `bendera: hasil memuat "${k}"`);
  cek(t.every((x) => !/tutup|kaleng|kardus|karton|igil|kaka|abang|mamah|festival/i.test(x.kunci)), "bendera: label hanya poin pelajaran");
  cek(!/\d/.test(D.SUARA_BENDERA + D.PETUNJUK_URUT_BENDERA) && !TERLARANG.test(D.SUARA_BENDERA), "bendera: suara tanpa digit dan kata terlarang");
  const lb = L.labelDari(t, 43);
  let ok = true;
  for (const x of t) for (const l of lb) {
    const harus = x.urutan !== undefined ? l.teks === x.kunci : t.find((y) => y.kunci === l.teks).kelompok === x.kelompok;
    if (L.cocokKelompok(t, x, l) !== harus) ok = false;
  }
  cek(ok, "bendera: bendera hanya menerima labelnya sendiri");
}

/* ------------------------------ Infografis kartu bahan ------------------------------ */
{
  const b = D.BARIS_KARTU;
  sama(b.map((x) => [x.bentuk, x.banyak, x.pakai]), [["lengkung", "ada 4", "roda"], ["segitiga", "ada 2", "atap"], ["segi empat", "ada 5", "badan"]], "kartu: data dari Story");
  for (const x of b) {
    const bt = x.bentuk === "segi empat" ? "segiempat" : x.bentuk;
    const n = L.BANYAK_SUDUT[bt];
    cek(n === 0 ? /tanpa/.test(x.ciri) : x.ciri === `${n} sisi, ${n} sudut`, `kartu: ciri ${x.nama} benar`);
    cek(L.LABEL_COCOK[bt] === x.pakai, `kartu: ${x.nama} dipakai sesuai bentuk`);
    cek(D.EMOJI[x.jenis] !== undefined, `kartu: ${x.nama} punya gambar`);
  }
  sama(D.TEMPAT_KARTU.length, 12, "kartu: dua belas kotak");
  cek(new Set(D.TEMPAT_KARTU.map((x) => x.kunci)).size === 12, "kartu: label unik");
  cek(D.TEMPAT_KARTU.every((x) => x.kunci.length <= 16) && !/\d/.test(D.SUARA_KARTU) && !TERLARANG.test(D.SUARA_KARTU), "kartu: label pendek, suara tanpa digit");
}

/* ------------------------------ CPA ------------------------------ */
// Story: empat lengkung, dua segitiga, lima segi empat.
const STORY = new Set(["lengkung-4", "segitiga-2", "segiempat-5"]);
for (const [nama, soal, rupa] of [["Concrete", D.CONCRETE, "benda"], ["Pictorial", D.PICTORIAL, "diagram"], ["Abstract", D.ABSTRACT, "lambang"]]) {
  sama(soal.map((s) => s.cara), ["klik", "kanvas", "suara"], `${nama}: tiga cara`);
  sama(soal.map((s) => Number(/Festival (\d+)/.exec(s.judul)[1])), { benda: [2, 3, 4], diagram: [5, 6, 7], lambang: [8, 9, 10] }[rupa], `${nama}: nomor misi berlanjut`);
  const semua = soal.flatMap((s) => s.langkah);
  sama(semua.length, 12, `${nama}: dua belas soal`);
  for (const s of soal) {
    sama(s.langkah.map((x) => x.metode), L.URUT_METODE, `${nama} ${s.cara}: empat metode`);
    cek(!TERLARANG.test(s.judul + s.cerita) && !/\d/.test(s.cerita), `${nama} ${s.cara}: cerita bersih`);
  }
  const angka = semua.map((x) => L.angkaJawab(x.langkah)).filter((n) => n !== null);
  cek(new Set(angka).size === angka.length && angka.length === 10, `${nama}: sepuluh angka jawaban tidak kembar (${angka.join(",")})`);
  cek(angka.every((n) => n >= 0 && n <= 10) && angka.includes(0), `${nama}: nol sampai sepuluh, ada nol (lengkung)`);
  const ciri = semua.filter((x) => x.langkah.tipe === "ciri").map((x) => x.langkah.benda.bentuk).sort();
  sama(ciri, ["lengkung", "segiempat", "segitiga"], `${nama}: Metode IGIL memuat tiga bentuk`);
  // Pedoman mutu: tiap tahap paling sedikit satu soal "Cari kesalahan" (tokoh sudah menjawab), dengan alasan yang menjelaskan kesalahannya.
  const klaim = semua.filter((x) => x.langkah.tipe === "ciri" && x.langkah.klaim);
  cek(klaim.length >= 1, `${nama}: ada soal Cari kesalahan`);
  for (const x of klaim) {
    const kl = x.langkah.klaim;
    cek(["Igil", "Kaka", "Abang", "Mamah"].includes(kl.tokoh) && kl.alasan.length > 20 && !/\d/.test(kl.alasan) && kl.angka >= 0 && kl.angka <= 10, `${nama}: klaim ${kl.tokoh} berisi alasan tanpa digit`);
    cek(L.klaimBenar(x.langkah) === (kl.angka === L.kunciLangkah(x.langkah)), `${nama}: penilaian klaim dihitung dari kunci`);
    cek(/Cari kesalahan/.test(x.suara) && /Benar atau salah/.test(x.suara), `${nama}: instruksi Cari kesalahan`);
  }
  for (const x of semua) {
    const l = x.langkah;
    const k = L.kunciLangkah(l);
    const benda = l.tipe === "ciri" ? [l.benda] : l.tipe === "paku" ? [] : l.tipe === "misteri" ? l.pilihan : l.isi;
    // Batas rupa.
    for (const b of benda) {
      if (rupa === "benda") cek(D.EMOJI[b.jenis] !== undefined && D.WARNA_BENDA[b.jenis] !== undefined, `${nama}: benda ${b.jenis} punya gambar dan warna`);
      if (rupa === "diagram") cek(D.EMOJI[b.jenis] === undefined, `${nama}: tanpa gambar benda (${b.jenis})`);
      if (rupa === "lambang") cek(L.KARTU_KATA[b.jenis]?.bentuk === b.bentuk, `${nama}: kartu kata ${b.jenis} cocok dengan bentuknya`);
    }
    if (l.tipe === "ciri") sama(k, l.benda.bentuk === "lengkung" ? 0 : l.benda.bentuk === "segitiga" ? 3 : 4, `${nama}: kunci ciri`);
    if (l.tipe === "buru") {
      sama(k, l.isi.filter((b) => b.bentuk === l.sasaran).length, `${nama}: kunci buru`);
      cek(!STORY.has(`${l.sasaran}-${k}`) && k >= 1 && l.isi.length <= 10 && l.isi.length - k >= 2, `${nama}: buru ${l.sasaran} ${k} berbeda dari Story, ada pengecoh`);
      cek(new Set(l.isi.map((b) => b.bentuk)).size === 3, `${nama}: buru memuat tiga bentuk`);
    }
    if (l.tipe === "kantong") {
      sama(k, l.isi.filter((b) => L.memenuhi(b.bentuk, l.syarat)).length, `${nama}: kunci kantong`);
      cek(l.isi.length <= 9 && k >= 1 && l.isi.length - k >= 1, `${nama}: kantong muat dan ada pengecoh`);
      cek(x.cara === "suara", `${nama}: kantong untuk suara`);
    }
    if (l.tipe === "misteri") {
      cek(L.benarMisteri(l).length === 1 && l.pilihan.length === 3 && new Set(l.pilihan.map((b) => b.bentuk)).size === 3, `${nama}: tepat satu bentuk misterius dari tiga bentuk berbeda`);
      cek(x.cara !== "suara", `${nama}: misteri tidak untuk suara`);
    }
    if (l.tipe === "paku") {
      sama(k, l.bangun.reduce((n, b) => n + b.length, 0), `${nama}: kunci paku`);
      const semuaPaku = l.bangun.flat().map(([c, r]) => `${c},${r}`);
      cek(new Set(semuaPaku).size === semuaPaku.length, `${nama}: paku sudut tidak dipakai dua bangun`);
      for (const b of l.bangun) {
        cek(b.length === 3 || b.length === 4, `${nama}: karet segitiga atau segi empat`);
        cek(b.every(([c, r]) => c >= 0 && c < K.KOLOM_PAKU && r >= 0 && r < K.BARIS_PAKU), `${nama}: paku di papan`);
        cek(b.every((_, i) => !K.segaris(b[i], b[(i + 1) % b.length], b[(i + 2) % b.length])), `${nama}: karet sungguh berbelok di tiap sudut`);
      }
    }
    if (k !== null) {
      const p = L.pilihanDari(l);
      cek(p.includes(k) && new Set(p).size === 3 && p.every((v) => v >= 0 && v <= 10), `${nama} ${x.metode}/${x.cara}: pilihan memuat kunci`);
    }
    if (x.cara === "suara") cek(k !== null, `${nama}: soal suara berjawaban angka`);
    if (x.cara === "kanvas") cek(k === null || k <= 9, `${nama}: tulisan kanvas satu angka`);
    cek(!/\d/.test(x.suara) && !TERLARANG.test(x.suara) && x.suara.length <= 170, `${nama} ${x.metode}/${x.cara}: instruksi tanpa digit ("${x.suara}")`);
  }
}
{
  const semuaKlaim = [D.CONCRETE, D.PICTORIAL, D.ABSTRACT].flat().flatMap((so) => so.langkah).filter((x) => x.langkah.tipe === "ciri" && x.langkah.klaim);
  cek(semuaKlaim.some((x) => !L.klaimBenar(x.langkah)) && semuaKlaim.some((x) => L.klaimBenar(x.langkah)), "Cari kesalahan: ada klaim keliru dan ada klaim benar");
  cek(D.POIN_PENTING.length >= 5 && D.POIN_PENTING_SUARA.every((p) => !/\d/.test(p)), "poin penting: suara tanpa digit");
  cek(D.POIN_PENTING.some((p) => /lengkung/.test(p)) && D.POIN_PENTING.some((p) => /diputar/.test(p)), "poin penting: lengkung dan diputar");
  for (const b of L.URUT_BENTUK) cek(!/\d/.test(L.deskripsi(b)), `deskripsi ${b} tanpa digit`);
  sama(L.URUT_BENTUK.map((b) => [L.memenuhi(b, "tanpa-sudut"), L.memenuhi(b, "punya-sudut"), L.memenuhi(b, "tiga-sudut"), L.memenuhi(b, "empat-sisi")]), [[true, false, false, false], [false, true, true, false], [false, true, false, true]], "syarat bentuk");
}

/* ------------------------------ Kanvas dan tata letak ------------------------------ */
{
  const dalam = (t, pad = 4) => t.x >= pad && t.x <= 300 - pad && t.y >= pad && t.y <= 200 - pad;
  for (const rupa of [D.CONCRETE, D.PICTORIAL]) for (const s of rupa) for (const x of s.langkah) {
    const l = x.langkah;
    if (l.tipe === "ciri") {
      const r = K.jariCiri(l.benda) * (l.benda.skala === 1 ? 0.72 : l.benda.skala === 3 ? 1.12 : 1);
      const sd = K.sudutBenda(l.benda, K.PUSAT_CIRI.x, K.PUSAT_CIRI.y, r);
      cek(sd.every((p) => dalam(p, 12)), `ciri: sudut ${l.benda.bentuk} masuk kanvas`);
      cek(sd.length === L.BANYAK_SUDUT[l.benda.bentuk], `ciri: banyak sudut ${l.benda.bentuk}`);
      const ts = K.tengahSisi(sd);
      for (let i = 0; i < sd.length; i += 1) for (let j = i + 1; j < sd.length; j += 1) cek(Math.hypot(sd[i].x - sd[j].x, sd[i].y - sd[j].y) > 30 && Math.hypot(ts[i].x - ts[j].x, ts[i].y - ts[j].y) > 26, "ciri: sudut dan sisi berjauhan untuk diketuk");
    }
  }
  for (let i = 0; i < 10; i += 1) {
    const p = K.letakPetak(i);
    cek(p.x - 27 >= 0 && p.x + 27 <= 300 && p.y - 27 >= 20 && p.y + 27 <= 200, `petak ${i} masuk kanvas di bawah judul`);
  }
  for (let i = 0; i < 9; i += 1) {
    const p = K.letakKantong(i);
    cek(p.x - 20 >= K.KANTONG.x && p.x + 20 <= K.KANTONG.x + K.KANTONG.w && p.y - 20 >= K.KANTONG.y && p.y + 22 <= K.KANTONG.y + K.KANTONG.h, `kantong ${i} di dalam kantong`);
  }
  for (let j = 0; j < 8; j += 1) {
    const p = K.letakMejaKanan(j);
    cek(p.x - 16 >= 200 && p.x + 16 <= 292 && p.y - 16 >= 40 && p.y + 16 <= 190, `meja kanan ${j}`);
  }
  for (let c = 0; c < K.KOLOM_PAKU; c += 1) for (let r = 0; r < K.BARIS_PAKU; r += 1) cek(dalam(K.letakPaku(c, r), 12), `paku ${c},${r} masuk papan`);
  for (let i = 0; i < 3; i += 1) {
    const p = K.letakPilihan(i);
    cek(p.x - K.JARI_PILIHAN * 1.12 >= 0 && p.x + K.JARI_PILIHAN * 1.12 <= 300 && p.y - K.JARI_PILIHAN >= 66 && p.y + K.JARI_PILIHAN <= 200, `pilihan ${i} di bawah petunjuk`);
  }
  const coret = (p) => [{ x: p.x - 6, y: p.y - 6 }, { x: p.x + 6, y: p.y + 6 }];
  const sd = K.sudutBenda({ bentuk: "segitiga", jenis: "x" }, 150, 104, 58);
  cek(K.periksaCentang(sd.map(coret), sd, 18).benar, "ciri: tanda di tiga sudut diterima");
  cek(!K.periksaCentang(sd.slice(0, 2).map(coret), sd, 18).benar, "ciri: dua tanda ditolak");
  const lingkar = (c, rx) => Array.from({ length: 24 }, (_, i) => ({ x: c.x + rx * Math.cos((i / 23) * 2 * Math.PI), y: c.y + rx * Math.sin((i / 23) * 2 * Math.PI) }));
  const petak = [0, 1, 2, 3, 4, 5].map(K.letakPetak);
  cek(K.periksaLingkari([lingkar(petak[1], 24), lingkar(petak[4], 24)], petak, [false, true, false, false, true, false]).benar, "buru: lingkari dua sasaran diterima");
  cek(!K.periksaLingkari([lingkar(petak[1], 24)], petak, [false, true, false, false, true, false]).benar, "buru: satu sasaran belum dilingkari ditolak");
  sama(K.segaris([0, 0], [1, 1], [3, 3]), true, "segaris: tiga titik satu garis");
}

/* ------------------------------ Simulasi meja bahan ------------------------------ */
{
  const B = D.BAHAN_SIM;
  sama(B.map((b) => b.benda.bentuk), ["lengkung", "lengkung", "segitiga", "segitiga", "segiempat", "segiempat"], "bahan: dua tiap bentuk");
  cek(B.every((b) => !/kaleng|karton|kardus/.test(b.nama)), "bahan: berbeda dari Story");
  cek(B.every((b) => M.BENTUK_BAHAN_A[b.id] === b.benda.bentuk) && Object.keys(M.BENTUK_BAHAN_A).length === B.length, "bahan: misi memakai bentuk yang sama dengan data");
  let k = L.awalBahan(B);
  sama([k.pilih, k.skala.teh, k.putar.roti, k.sisi, k.sudut], ["botol", 2, 0, false, false], "bahan: awal");
  k = L.pilihBahan(k, "roti");
  k = L.putarBahan(k);
  sama(k.putar.roti, 45, "bahan: putar empat puluh lima derajat");
  for (let i = 0; i < 8; i += 1) k = L.putarBahan(k);
  sama(k.putar.roti, 45, "bahan: putaran kembali melingkar");
  k = L.pilihBahan(k, "teh");
  k = L.ubahSkala(L.ubahSkala(L.ubahSkala(k, 1), 1), 1);
  sama(k.skala.teh, 3, "bahan: paling besar tiga");
  k = L.ubahSkala(L.ubahSkala(L.ubahSkala(k, -1), -1), -1);
  sama(k.skala.teh, 1, "bahan: paling kecil satu");
  k = L.gelindingkan(L.gelindingkan(k));
  sama(k.gelinding, ["teh"], "bahan: gelinding tidak kembar");
  cek(L.bisaGelinding("lengkung") && !L.bisaGelinding("segitiga") && !L.bisaGelinding("segiempat"), "bahan: hanya lengkung menggelinding");
  for (const b of B) cek(!/\d/.test(L.kalimatBahan(L.pilihBahan(k, b.id), B)), `bahan: kalimat ${b.id} tanpa digit`);
  for (const b of B) cek(K.sudutBenda({ ...b.benda, skala: 3 }, 150, 92, 64).every((p) => p.x > 4 && p.x < 296 && p.y > 4 && p.y < 176), `bahan: ${b.id} paling besar masuk meja`);
  const daftar = M.daftarMisiBab4("A");
  const ada = (st, id) => S.misiBaru(daftar, st, new Set()).includes(id);
  const awal = L.awalBahan(B);
  cek(daftar.filter((x) => x.wajib).length === 4 && daftar.some((x) => !x.wajib) && daftar.every((x) => !/\d/.test(x.teks)), "misi A: empat wajib, ada bebas, tanpa digit");
  cek(daftar.every((x) => !x.cek(awal)), "misi A: awal belum tercapai");
  let p = L.tampilSudut(L.putarBahan(L.pilihBahan(awal, "triplek")));
  cek(ada(p, "a-putar"), "misi A: putar segitiga, sudut tampak");
  cek(ada(L.gelindingkan(L.pilihBahan(awal, "piring")), "a-gelinding") && ada(L.gelindingkan(L.pilihBahan(awal, "pasta")), "a-sudut"), "misi A: gelinding");
  let lb = awal;
  for (const b of B) lb = L.beriLabel(L.pilihBahan(lb, b.id), L.LABEL_COCOK[b.benda.bentuk]);
  sama(L.labelTepat(lb, B), 6, "bahan: enam label tepat");
  cek(ada(lb, "a-label") && !ada(L.beriLabel(lb, "roda"), "a-label"), "misi A: semua label tepat");
  cek(ada(L.tampilSisi(L.pilihBahan(awal, "piring")), "a-sisi"), "misi A: sisi piring");
}

/* ------------------------------ Berkas ------------------------------ */
{
  const folder = new URL("../src/components/modul/bahan-k1b4a/", import.meta.url);
  const berkas = readdirSync(folder);
  cek(berkas.length >= 8, `berkas bahan-k1b4a (${berkas.length})`);
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folder), "utf8");
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d) && !/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}/i.test(s), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(!/fetch\(|XMLHttpRequest/i.test(s), `${f}: tanpa jaringan`);
    if (/\.ts$/.test(f)) cek(!/from "react"/.test(s), `${f}: tanpa React`);
    const str = [...s.matchAll(/"([^"\n]{12,})"/g)].map((m) => m[1]).filter((x) => /\s/.test(x) && !x.includes("===") && !/^[a-z-]+( [a-z-:[\]#/0-9.()_,'%!]+)*$/.test(x));
    cek(str.every((x) => !/\b(kelas|buku|teman|kelompok|skor|nilai|belas|puluh)\b/i.test(x)), `${f}: teks tanpa kata terlarang`);
  }
  for (const f of ["misi-bab4.ts", "SimulasiBab4.tsx"]) cek(!readFileSync(new URL(`../src/components/modul/${f}`, import.meta.url), "utf8").includes("\r"), `${f}: akhir baris LF`);
}

console.log(`Lulus ${lulus}, gagal ${gagal}`);
process.exit(gagal ? 1 : 0);
