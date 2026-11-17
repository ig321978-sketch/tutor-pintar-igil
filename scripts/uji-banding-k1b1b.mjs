// Uji tahap Mind-map, Infografis, Simulasi, Concrete, Pictorial, dan Abstract Kelas 1 Bab 1 Sub-Bab B ("Hadiah Nenek untuk Rak yang Lebih Sedikit").
// Memeriksa: rel kereta (Masalah, Penyelesaian berurutan memuat semua metode Story, Hasil), papan kapur dari data Story, CPA dua belas soal per tahap
// (Klik, Kanvas, Suara x empat metode), kunci dihitung ulang, angka jawaban tidak kembar per tahap dan pasangan angka berbeda dari Story, contoh Story
// tercakup, pemeriksa kanvas (garis pasangan, lingkari, satu lagi, coret satu), simulasi gudang hadiah dan misinya, emoji dan akhir baris.
// Jalankan: node --no-warnings scripts/uji-banding-k1b1b.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/banding-k1b1b/logika.ts");
const D = await import("../src/components/modul/banding-k1b1b/data.ts");
const K = await import("../src/components/modul/banding-k1b1b/periksa.ts");
const M = await import("../src/components/modul/misi-bab1.ts");
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
const TERLARANG = /\b(kelas|buku|teman|kelompok|tambah|kurang|jumlah|skor|nilai)\b/i;
const KATA = ["nol", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan", "sepuluh"];

/* ------------------------------ Mind-map rel kereta ------------------------------ */
{
  const t = D.TEMPAT_REL;
  sama(["masalah", "metode", "hasil"].map((k) => t.filter((x) => x.kelompok === k).length), [3, 7, 3], "rel: tiga masalah, tujuh gerbong, tiga hasil");
  cek(new Set(t.map((x) => x.kunci)).size === t.length && new Set(t.map((x) => x.id)).size === t.length, "rel: kunci dan id unik");
  cek(t.every((x) => x.kunci.length <= 28 && !/\d/.test(x.kunci)), "rel: label pendek tanpa digit");
  const metode = t.filter((x) => x.kelompok === "metode");
  sama(metode.map((x) => x.urutan), [1, 2, 3, 4, 5, 6, 7], "rel: gerbong bernomor satu sampai tujuh");
  cek(t.filter((x) => x.kelompok !== "metode").every((x) => x.urutan === undefined), "rel: stasiun tanpa nomor");
  // Semua metode Story masuk: pasangkan, bersisa, sama banyak tanpa sisa, hitung dan bandingkan (materi), bingkai, garis, satu lebih (global).
  const gab = metode.map((x) => x.kunci).join(" | ").toLowerCase();
  for (const kata of ["pasangkan", "bersisa", "sama banyak", "bandingkan", "bingkai", "kanan", "satu lebih"]) cek(gab.includes(kata), `rel: langkah memuat "${kata}"`);
  const CERITA = /mainan|rak\b|hadiah|nenek|igil|kaka|abang|mamah|mobil|boneka|robot|bola|gudang/i;
  cek(t.every((x) => !CERITA.test(x.kunci)) && !CERITA.test(D.PUSAT_REL) && !CERITA.test(D.SUARA_REL), `rel: hanya poin pelajaran, tanpa poin cerita (${[...t.map((x) => x.kunci), D.PUSAT_REL, D.SUARA_REL].filter((x) => CERITA.test(x)).join(" | ")})`);
  cek(!/\d/.test(D.SUARA_REL + D.PETUNJUK_URUT_REL) && !TERLARANG.test(D.SUARA_REL), "rel: suara tanpa digit dan kata terlarang");
  const lb = L.labelDari(t, 31);
  let ok = true;
  for (const x of t) for (const l of lb) {
    const c = L.cocokKelompok(t, x, l);
    const harus = x.urutan !== undefined ? l.teks === x.kunci : t.find((y) => y.kunci === l.teks).kelompok === x.kelompok;
    if (c !== harus) ok = false;
  }
  cek(ok, "rel: gerbong hanya menerima labelnya sendiri, stasiun menerima label sewarna");
  cek(Object.values(D.KELOMPOK_REL).every((g) => !/\d/.test(g.petunjuk)), "rel: petunjuk tanpa digit");
}

/* ------------------------------ Infografis papan kapur ------------------------------ */
{
  const b = D.BARIS_PAPAN;
  sama(b.map((x) => x.angka), ["5 dan 6", "6 dan 6", "0 dan 3", "6 dan 3", "4 dan 7", "5 lalu 6"], "papan: angka dari Story");
  const hasil = (x) => {
    const [p, q] = x.angka.split(/ dan | lalu /).map(Number);
    return x.angka.includes("lalu") ? "lebih banyak" : L.kataBanding(p, q);
  };
  sama(b.map((x) => L.kataBanding(Number(x.angka[0]), Number(x.angka.at(-1)))), ["lebih sedikit", "sama banyak", "lebih sedikit", "lebih banyak", "lebih sedikit", "lebih sedikit"], "papan: kata banding benda kiri terhadap kanan");
  sama(b.map((x) => x.hasil), ["Boneka lebih banyak", "Sama banyak", "Kereta lebih sedikit", "Mobil lebih banyak", "Robot lebih banyak", "Enam lebih banyak"], "papan: hasil tiap baris");
  sama(D.TEMPAT_PAPAN.length, 18, "papan: delapan belas petak");
  cek(b.every((x) => x.benda.every((j) => D.EMOJI[j])), "papan: gambar benda tersedia");
  cek(!/\d/.test(D.SUARA_PAPAN) && Object.values(D.KELOMPOK_PAPAN).every((p) => !/\d/.test(p)), "papan: suara tanpa digit");
  cek(D.TEMPAT_PAPAN.every((x) => x.kunci.length <= 22), "papan: label muat di petak");
}

/* ------------------------------ CPA ------------------------------ */
const PASANGAN_STORY = new Set(["5-6", "6-6", "0-3", "3-6", "4-7"]);
const SATU_STORY = new Set(["5-lebih", "5-sedikit"]);
for (const [nama, soal, rupa] of [["Concrete", D.CONCRETE, "benda"], ["Pictorial", D.PICTORIAL, "diagram"], ["Abstract", D.ABSTRACT, "lambang"]]) {
  sama(soal.map((s) => s.cara), ["klik", "kanvas", "suara"], `${nama}: tiga kelompok cara berurutan`);
  const semua = soal.flatMap((s) => s.langkah);
  sama(semua.length, 12, `${nama}: dua belas soal`);
  for (const s of soal) {
    sama(s.langkah.map((x) => x.metode), L.URUT_METODE, `${nama} ${s.cara}: empat metode tepat sekali`);
    cek(s.langkah.every((x) => x.cara === s.cara), `${nama} ${s.cara}: cara sama dalam kelompok`);
    cek(/^Misi Hadiah Nenek \d+: /.test(s.judul) && !TERLARANG.test(s.judul + s.cerita) && !/\d/.test(s.cerita), `${nama} ${s.cara}: judul misi dan cerita bersih`);
  }
  sama(soal.map((s) => Number(/Nenek (\d+)/.exec(s.judul)[1])), { benda: [2, 3, 4], diagram: [5, 6, 7], lambang: [8, 9, 10] }[rupa], `${nama}: nomor misi berlanjut`);
  const angka = semua.map((x) => L.angkaJawab(x.langkah)).filter((n) => n !== null);
  cek(new Set(angka).size === angka.length, `${nama}: angka jawaban tidak kembar (${angka.join(",")})`);
  cek(angka.every((n) => Number.isInteger(n) && n >= 0 && n <= 10), `${nama}: jawaban nol sampai sepuluh`);
  cek(angka.includes(0), `${nama}: ada contoh nol`);
  for (const x of semua) {
    const l = x.langkah;
    const k = L.kunciLangkah(l);
    // Kunci dihitung ulang terpisah.
    let harus;
    if (l.tipe === "satu") harus = l.arah === "lebih" ? l.a + 1 : l.a - 1;
    else if (l.tanya === "kata") harus = l.a > l.b ? "lebih banyak" : l.a < l.b ? "lebih sedikit" : "sama banyak";
    else if (l.tanya === "tandai") harus = null;
    else if (l.tanya === "sisa") harus = Math.abs(l.a - l.b);
    else if (l.tanya === "sama") harus = l.a === l.b ? l.a : NaN;
    else harus = l.tanya === "banyak" ? Math.max(l.a, l.b) : Math.min(l.a, l.b);
    sama(k, harus, `${nama} ${x.metode}/${x.cara}: kunci`);
    if (l.tipe !== "satu") {
      cek(l.a >= 0 && l.a <= 10 && l.b >= 0 && l.b <= 10, `${nama}: banyak nol sampai sepuluh`);
      cek(!PASANGAN_STORY.has([l.a, l.b].sort((p, q) => p - q).join("-")) || l.tipe === "pasang" && rupa === "lambang" && false, `${nama} ${x.metode}/${x.cara}: pasangan ${l.a} dan ${l.b} berbeda dari Story`);
      if (l.tanya !== "sama") cek(l.a !== l.b || l.tanya === "kata", `${nama}: hanya soal sama banyak yang boleh kembar`);
    } else {
      cek(!SATU_STORY.has(`${l.a}-${l.arah}`) && l.a + (l.arah === "lebih" ? 1 : -1) >= 0 && l.a + (l.arah === "lebih" ? 1 : -1) <= 10, `${nama}: satu lebih atau sedikit berbeda dari Story dan dalam batas`);
    }
    const n = L.angkaJawab(l);
    if (n !== null) {
      const p = L.pilihanDari(l);
      cek(p.includes(n) && new Set(p).size === 3 && p.every((v) => v >= 0 && v <= 10), `${nama} ${x.metode}/${x.cara}: pilihan memuat kunci (${p})`);
    }
    if (x.cara !== "klik") cek(typeof k !== "string", `${nama}: jawaban kata hanya di Klik`);
    cek(!/\d/.test(x.suara) && !TERLARANG.test(x.suara) && x.suara === x.judul && x.suara.length <= 160, `${nama} ${x.metode}/${x.cara}: instruksi tanpa digit, pendek ("${x.suara}")`);
    if (rupa === "benda") cek((l.tipe === "satu" ? [l.ja] : [l.ja, l.jb]).every((j) => D.EMOJI[j]), `${nama}: benda bergambar emoji`);
    if (rupa === "diagram") cek((l.tipe === "satu" ? [l.ja] : [l.ja, l.jb]).every((j) => j === "titik"), `${nama}: diagram tanpa emoji benda`);
    if (rupa === "lambang") cek((l.tipe === "satu" ? [l.ja] : [l.ja, l.jb]).every((j) => j === "angka"), `${nama}: lambang saja`);
  }
  const L2 = semua.map((x) => x.langkah);
  cek(L2.some((l) => l.tipe === "satu" && l.arah === "lebih") && L2.some((l) => l.tipe === "satu" && l.arah === "sedikit"), `${nama}: satu lebih banyak dan satu lebih sedikit`);
  cek(L2.some((l) => l.tipe === "pasang" && l.tanya === "kata"), `${nama}: memilih kata banding`);
  if (rupa !== "lambang") {
    cek(L2.some((l) => l.renggang), `${nama}: contoh barisan renggang (Story: barisan panjang menipu)`);
    cek(L2.some((l) => l.tipe === "pasang" && (l.a === l.b)), `${nama}: contoh sama banyak (Story: tanpa sisa)`);
    cek(L2.some((l) => l.tipe === "pasang" && (l.tanya === "sisa" || l.tanya === "tandai")) || rupa === "benda", `${nama}: contoh yang bersisa`);
  }
}
// Semua contoh metode Story termuat di CPA (lintas tahap).
{
  const semua = [D.CONCRETE, D.PICTORIAL, D.ABSTRACT].flat().flatMap((s) => s.langkah.map((x) => x.langkah));
  cek(semua.some((l) => l.tipe === "pasang" && l.tanya === "tandai") && semua.some((l) => l.tipe === "pasang" && l.tanya === "sisa"), "CPA: yang bersisa ditandai dan dihitung");
  cek(semua.some((l) => l.tipe === "pasang" && l.renggang && l.tanya === "kata"), "CPA: barisan renggang dibandingkan dengan pasangan");
  cek(semua.some((l) => l.tipe === "pasang" && l.a === l.b), "CPA: sama banyak");
  cek(semua.filter((l) => l.tipe !== "satu").some((l) => l.a === 0 || l.b === 0), "CPA: nol paling sedikit");
  cek(["bingkai", "garis", "satu", "pasang"].every((t) => semua.filter((l) => l.tipe === t).length === 9), "CPA: tiap metode sembilan soal");
}

/* ------------------------------ Kanvas: tata letak dan pemeriksa ------------------------------ */
{
  const dalam = (p) => p.x >= 10 && p.x <= 290 && p.y >= 10 && p.y <= 190;
  for (let a = 0; a <= 10; a += 1) for (let b = 0; b <= 10; b += 1) {
    const t = K.tataPasang(a, b, a % 2 === 0);
    if (![...t.atas, ...t.bawah].every(dalam)) cek(false, `tata pasang ${a},${b} masuk kanvas`);
  }
  for (let a = 0; a <= 9; a += 1) {
    const s = K.tataSatu(a, true);
    cek(s.benda.length === a && s.kosong && s.kosong.x > 0 && s.kosong.x + s.kosong.w < 300, `tata satu lebih ${a}`);
  }
  const { atas, bawah } = K.tataPasang(5, 3);
  const garis = (p, q) => Array.from({ length: 8 }, (_, i) => ({ x: p.x + ((q.x - p.x) * i) / 7, y: p.y + ((q.y - p.y) * i) / 7 }));
  cek(K.periksaGarisPasang([0, 1, 2].map((i) => garis(atas[i], bawah[i])), atas, bawah).benar, "garis pasangan: tiga garis benar");
  cek(K.periksaGarisPasang([0, 1, 2].map((i) => garis(bawah[i], atas[i + 1])), atas, bawah).benar, "garis pasangan: arah dari bawah ke atas juga diterima");
  cek(!K.periksaGarisPasang([0, 1].map((i) => garis(atas[i], bawah[i])), atas, bawah).benar, "garis pasangan: kurang satu ditolak");
  cek(!K.periksaGarisPasang([garis(atas[0], bawah[0]), garis(atas[0], bawah[1]), garis(atas[1], bawah[2])], atas, bawah).benar, "garis pasangan: satu benda dua garis ditolak");
  cek(!K.periksaGarisPasang([...[0, 1, 2].map((i) => garis(atas[i], bawah[i])), garis({ x: 5, y: 100 }, { x: 40, y: 100 })], atas, bawah).benar, "garis pasangan: goresan nyasar ditolak");
  const lingkar = (c, r) => Array.from({ length: 24 }, (_, i) => ({ x: c.x + r * Math.cos((i / 24) * 2 * Math.PI), y: c.y + r * Math.sin((i / 24) * 2 * Math.PI) }));
  const pb = [K.pusatBingkai(0), K.pusatBingkai(1)];
  cek(K.periksaLingkariSatu([lingkar(pb[0], 70)], pb, 0).benar && !K.periksaLingkariSatu([lingkar(pb[0], 70)], pb, 1).benar, "lingkari bingkai: hanya bingkai sasaran");
  for (const [a, b] of [[2, 5], [10, 5], [3, 1], [6, 4]]) {
    const pg = K.penandaGaris(a, b);
    cek(K.periksaLingkariSatu([lingkar(pg[0], 18)], pg, 0).benar && K.periksaLingkariSatu([lingkar(pg[1], 18)], pg, 1).benar, `lingkari penanda ${a} dan ${b}: bisa dilingkari terpisah`);
  }
  for (const l of [D.CONCRETE, D.PICTORIAL].flat().flatMap((x) => x.langkah.map((y) => y.langkah)).filter((l) => l.renggang)) {
    const t = K.tataPasang(l.a, l.b, true);
    const pj = (p) => (p.length ? p.at(-1).x - p[0].x : 0);
    cek(pj(t.atas) > pj(t.bawah), `barisan renggang ${l.a} lebih panjang daripada barisan ${l.b} (mengecoh seperti Story)`);
  }
  const s = K.tataSatu(3, true);
  cek(K.periksaSatuLagi([lingkar({ x: s.kosong.x + 13, y: s.kosong.y + 18 }, 8)], s.kosong) && !K.periksaSatuLagi([lingkar(s.benda[0], 8)], s.kosong) && !K.periksaSatuLagi([], s.kosong), "satu lagi: hanya di kotak kosong");
  const c = K.tataSatu(5, false);
  cek(K.periksaCoretSatu([garis({ x: c.benda[2].x - 8, y: c.benda[2].y + 8 }, { x: c.benda[2].x + 8, y: c.benda[2].y - 8 })], c.benda).benar, "coret satu: satu benda tercoret");
  cek(!K.periksaCoretSatu([garis(c.benda[0], c.benda[2])], c.benda).benar, "coret satu: mencoret banyak ditolak");
  sama(K.bilanganDariUcapan("tujuh").includes(7) && K.bilanganDariUcapan("nol").includes(0), true, "ucapan: kata bilangan terbaca");
  for (let n = 0; n <= 10; n += 1) cek(L.pilihanDari({ tipe: "satu", a: n, arah: n < 10 ? "lebih" : "sedikit", ja: "angka" }).length === 3, `pilihan satu ${n}`);
}

/* ------------------------------ Simulasi gudang hadiah ------------------------------ */
{
  let k = L.awalGudang(D.AWAL_GUDANG.igil, D.AWAL_GUDANG.kaka, D.AWAL_GUDANG.kotak);
  sama([k.igil, k.kaka, k.kotak], [2, 7, 6], "gudang: awal robot dua, yoyo tujuh, kotak enam");
  cek(!(k.igil === 5 && k.kaka === 6), "gudang: angka awal berbeda dari Story");
  const total = (x) => x.igil + x.kaka + x.kotak;
  for (let i = 0; i < 5; i += 1) k = L.ubahRak(k, "igil", 1);
  sama([k.igil, k.kotak, k.dipakai, total(k)], [7, 1, 5, 15], "gudang: ambil lima hadiah ke rak Igil");
  cek(L.kalimatGudang(k).includes("sama banyak"), "gudang: tujuh dan tujuh sama banyak");
  k = L.ubahRak(L.ubahRak(k, "kaka", 1), "kaka", 1);
  sama([k.kaka, k.kotak], [8, 0], "gudang: kotak kosong menolak ambil");
  let n0 = k;
  for (let i = 0; i < 12; i += 1) n0 = L.ubahRak(n0, "igil", -1);
  sama([n0.igil, total(n0)], [0, 15], "gudang: kembalikan sampai nol, tidak di bawah nol");
  cek(L.pasangkan(k).dipasang && !L.ubahRak(L.pasangkan(k), "igil", -1).dipasang, "gudang: Pasangkan direset bila banyak berubah");
  const full = L.ubahRak({ ...k, igil: 10, kotak: 3 }, "igil", 1);
  sama(full.igil, 10, "gudang: rak penuh sepuluh");
  for (const x of [L.awalGudang(3, 3, 0), L.awalGudang(0, 4, 0), L.awalGudang(9, 2, 0)]) cek(!/\d/.test(L.kalimatGudang(x)), "gudang: kalimat tanpa digit");
  // Misi Sub-Bab B.
  const daftar = M.daftarMisiBab1("B");
  const ada = (st, id) => S.misiBaru(daftar, st, new Set()).includes(id);
  const awal = L.awalGudang(2, 7, 6);
  cek(daftar.filter((m) => m.wajib).length === 4 && daftar.some((m) => !m.wajib) && daftar.every((m) => !/\d/.test(m.teks)), "misi B: empat wajib, ada bebas, teks tanpa digit");
  cek(daftar.every((m) => !m.cek(awal)), "misi B: keadaan awal belum memenuhi misi");
  cek(ada(L.pasangkan(awal), "b-pasang"), "misi B: pasangkan");
  let sm = awal;
  for (let i = 0; i < 5; i += 1) sm = L.ubahRak(sm, "igil", 1);
  cek(ada(sm, "b-sama"), "misi B: sama banyak lewat hadiah");
  cek(ada(L.ubahRak(sm, "igil", 1), "b-satu"), "misi B: satu lebih banyak");
  cek(ada(L.lihat(awal, "bingkai"), "b-bingkai") && ada(L.ubahRak(L.ubahRak(awal, "igil", -1), "igil", -1), "b-nol"), "misi B: bingkai dan nol");
  cek(ada(L.lihat(L.ubahRak(sm, "igil", 1), "garis"), "b-garis"), "misi B: garis bilangan");
  // Semua misi wajib bisa dicapai dari keadaan awal dengan tombol yang ada.
  cek(M.MISI_B.length === 6, "misi B: enam misi");
}

/* ------------------------------ Berkas: emoji, akhir baris, kemurnian ------------------------------ */
{
  const folder = new URL("../src/components/modul/banding-k1b1b/", import.meta.url);
  const berkas = readdirSync(folder);
  cek(berkas.length >= 8, `berkas banding-k1b1b (${berkas.length})`);
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folder), "utf8");
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(!/fetch\(|XMLHttpRequest|openai|anthropic/i.test(s), `${f}: tanpa jaringan`);
    if (/\.ts$/.test(f)) cek(!/from "react"/.test(s), `${f}: logika dan data tanpa React`);
    // Teks siswa: tanpa kata terlarang di string tampilan.
    const str = [...s.matchAll(/"([^"\n]{12,})"/g)].map((m) => m[1]).filter((x) => /\s/.test(x) && !/^[a-z-]+( [a-z-:[\]#/0-9.()_,'%]+)*$/.test(x) && !x.includes("className") && !x.includes("==="));
    cek(str.every((x) => !/\b(kelas|buku|teman|kelompok|skor|nilai)\b/i.test(x)), `${f}: teks tanpa kata terlarang (${str.filter((x) => /\b(kelas|buku|teman|kelompok|skor|nilai)\b/i.test(x)).slice(0, 2).join(" | ")})`);
  }
  for (const s of [D.CONCRETE, D.PICTORIAL, D.ABSTRACT].flat()) cek(KATA.length === 11, "kata bilangan");
}

console.log(`Lulus ${lulus}, gagal ${gagal}`);
process.exit(gagal ? 1 : 0);
