// Uji tahap Mind-map, Infografis, Simulasi, Concrete, Pictorial, dan Abstract Kelas 1 Bab 7 Sub-Bab A ("Tiang dan Tangga"), awal cerita Rumah Pohon Abang.
// Memeriksa: tangga kayu (Masalah, Penyelesaian berurutan memuat semua metode Story, Hasil), papan rencana dari data Story,
// CPA dua belas langkah per tahap (Klik, Kanvas, Suara x empat metode) dengan satu soal Cari kesalahan per tahap, kunci dihitung ulang,
// sepuluh angka jawaban tidak kembar per tahap, batas rupa, tanpa satuan baku, tata letak kanvas, simulasi Meja Tukang dan usulan misinya,
// emoji dan akhir baris.
// Jalankan: node --no-warnings scripts/uji-tiang-k1b7a.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/tiang-k1b7a/logika.ts");
const D = await import("../src/components/modul/tiang-k1b7a/data.ts");
const K = await import("../src/components/modul/tiang-k1b7a/periksa.ts");
const S = await import("../src/components/modul/misi-simulasi.ts");
const MB7 = await import("../src/components/modul/misi-bab7.ts");
const folderUrl = new URL("../src/components/modul/tiang-k1b7a/", import.meta.url);

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
const TERLARANG = /\b(kelas|buku|teman|kelompok|mengelompokkan|skor|nilai|tebak)\b/i;
const BAKU = /\b(cm|km|mm|meter|meteran|sentimeter|kilometer|milimeter|centimeter|penggaris)\b/i;
const tanpaDigit = (t) => !/\d/.test(t);
const bersih = (t) => !TERLARANG.test(t) && !BAKU.test(t);
const TOKOH = ["Igil", "Kaka", "Abang", "Mamah"];

/* ------------------------------ Dasar ------------------------------ */
{
  const b = { tipe: "banding", isi: [5, 8, 6, 4, 7], acuan: 0, arah: "tinggi", jenis: "tiang" };
  sama([L.indeksBanding(b), L.indeksBanding({ ...b, arah: "pendek" })], [[1, 2, 4], [3]], "banding: yang lebih tinggi dan lebih pendek dari benda bertanda");
  sama(L.kunciLangkah(b), 3, "banding: kunci");
  const s = { tipe: "langsung", isi: [6, 9, 6, 4, 6], acuan: 0, jenis: "tiang", angka: true };
  sama([L.indeksSama(s), L.kunciLangkah(s), L.kunciLangkah({ ...s, angka: false })], [[2, 4], 2, null], "langsung: yang sama tinggi, tanpa angka bila hanya menandai");
  const p = { tipe: "perantara", isi: [6, 9, 4, 6, 3], acuan: 0, tanya: "lebih", jenis: "tali" };
  sama(["lebih", "kurang", "pas"].map((t) => L.kunciLangkah({ ...p, tanya: t })), [1, 2, 1], "perantara: lebih, kurang, pas dengan tali");
  sama([L.hubungan(9, 6), L.hubungan(3, 6), L.hubungan(6, 6)], ["lebih", "kurang", "pas"], "hubungan dengan tali");
  const t = { tipe: "tangga", isi: [4, 9, 2, 7], acuan: 3, arah: "naik", tanya: "urutan", jenis: "tongkat" };
  sama([L.urutanTangga(t.isi, "naik"), L.urutanTangga(t.isi, "turun"), L.urutanAcuan(t), L.urutanAcuan({ ...t, arah: "turun" }), L.kunciLangkah({ ...t, tanya: "banyak" })], [[2, 0, 3, 1], [1, 3, 0, 2], 3, 2, 4], "tangga: urutan dan kunci");
  sama(L.urutanAcuan({ ...t, isi: [4, 4, 2, 7], acuan: 1 }), 2, "tangga: benda sama tinggi berbagi urutan terdepan");
  sama(L.pernyataan([9, 6, 3]), ["B lebih tinggi dari C.", "A lebih tinggi dari B."], "pernyataan: rantai dari yang tertinggi (urutan tampil diselang)");
  sama(L.pernyataan([6, 9, 6]), ["A sama tinggi dengan C.", "B lebih tinggi dari A."], "pernyataan: benda sama tinggi");
  for (const x of [b, s, p, t]) {
    const n = L.pernyataan(x.isi).join(" ") + L.kalimatKunci(x);
    cek(tanpaDigit(n) && bersih(n), `kalimat kunci ${x.tipe} tanpa digit`);
  }
  sama(Object.keys(L.NAMA_METODE), ["igil", "langsung", "perantara", "tangga"], "empat metode");
  cek(L.NAMA_METODE.langsung.startsWith("Direct Comparison") && L.NAMA_METODE.perantara.startsWith("Indirect Comparison") && L.NAMA_METODE.tangga.startsWith("Seriation") && L.NAMA_METODE.igil.startsWith("Metode IGIL"), "nama Inggris di judul soal");
}

/* ------------------------------ Mind-map tangga kayu ------------------------------ */
{
  const t = D.TEMPAT_TANGGA;
  sama(["masalah", "metode", "hasil"].map((k) => t.filter((x) => x.kelompok === k).length), [3, 7, 4], "tangga: tiga masalah, tujuh anak tangga, empat hasil");
  cek(new Set(t.map((x) => x.kunci)).size === t.length && t.every((x) => x.kunci.length <= 30 && tanpaDigit(x.kunci)), "tangga: label unik, pendek, tanpa digit");
  sama(t.filter((x) => x.kelompok === "metode").map((x) => x.urutan), [1, 2, 3, 4, 5, 6, 7], "tangga: anak tangga bernomor satu sampai tujuh");
  const gab = t.filter((x) => x.kelompok === "metode").map((x) => x.kunci).join(" | ").toLowerCase();
  for (const k of ["garis awal", "banding langsung", "pakai kata lebih", "banding dengan perantara", "paling", "susun dari paling pendek", "menyusun tangga"]) cek(gab.includes(k), `tangga: langkah memuat "${k}"`);
  const hasil = t.filter((x) => x.kelompok === "hasil").map((x) => x.kunci).join(" | ").toLowerCase();
  for (const k of ["lebih tinggi", "lebih pendek", "sama tinggi", "paling tinggi", "paling pendek", "tinggi dan rendah"]) cek(hasil.includes(k), `tangga: hasil memuat "${k}"`);
  cek(t.every((x) => !/\b(tiang|tupai|burung|bata|tongkat|tali pegangan|igil|kaka|abang|mamah|kakek|jaya|jambu|rumah pohon)\b/i.test(x.kunci)), "tangga: label hanya poin pelajaran");
  cek(t.every((x) => bersih(x.kunci)), "tangga: label tanpa kata terlarang atau satuan baku");
  cek(tanpaDigit(D.SUARA_TANGGA + D.PETUNJUK_URUT_TANGGA) && bersih(D.SUARA_TANGGA), "tangga: suara tanpa digit dan kata terlarang");
  cek(Object.values(D.KELOMPOK_TANGGA).every((g) => bersih(g.petunjuk) && tanpaDigit(g.petunjuk)), "tangga: petunjuk kelompok bersih");
  const lb = L.labelDari(t, 71);
  let ok = true;
  for (const x of t)
    for (const l of lb) {
      const harus = x.urutan !== undefined ? l.teks === x.kunci : t.find((y) => y.kunci === l.teks).kelompok === x.kelompok;
      if (L.cocokKelompok(t, x, l) !== harus) ok = false;
    }
  cek(ok, "tangga: anak tangga hanya menerima labelnya sendiri");
}

/* ------------------------------ Infografis papan rencana ------------------------------ */
{
  const b = D.BARIS_RENCANA;
  const angka = (s) => (s.match(/\d+/g) ?? []).map(Number);
  sama(b.length, 5, "rencana: lima baris");
  sama(b.map((x) => angka(x.banyak)[0]), [2, 4, 3, 3, 5], "rencana: banyak benda dari Story (dua tiang, empat tiang, tiga tali, tiga burung, lima tongkat)");
  cek(/tiang/.test(b[0].banyak) && /tiang/.test(b[1].banyak) && /tali/.test(b[2].banyak) && /burung/.test(b[3].banyak) && /tongkat/.test(b[4].banyak), "rencana: nama benda di label");
  cek(/lebih/.test(b[0].kata) && /dua benda/.test(b[0].catatan) && /lebih/.test(b[0].catatan), "rencana: dua benda pakai lebih");
  cek(/paling/.test(b[1].kata) && /tiga benda atau lebih/.test(b[1].catatan), "rencana: tiga benda atau lebih pakai paling");
  cek(/paling pendek/.test(b[2].kata) && /garis awal/.test(b[2].catatan), "rencana: tali dari garis awal, hijau paling pendek");
  cek(/rendah/.test(b[3].kata) && /udara/.test(b[3].catatan), "rencana: burung, letak di udara");
  cek(/urut/.test(b[4].kata) && /pendek ke panjang/.test(b[4].catatan), "rencana: tongkat disusun dari pendek ke panjang");
  sama(D.TEMPAT_RENCANA.length, 15, "rencana: lima belas kotak");
  cek(new Set(D.TEMPAT_RENCANA.map((x) => x.kunci)).size === 15, "rencana: label unik");
  cek(D.TEMPAT_RENCANA.every((x) => x.kunci.length <= 24 && bersih(x.kunci)) && tanpaDigit(D.SUARA_RENCANA) && bersih(D.SUARA_RENCANA), "rencana: label pendek, suara tanpa digit");
  cek(D.KOLOM_RENCANA.length === 3 && Object.keys(D.KELOMPOK_RENCANA).every((k2) => D.TEMPAT_RENCANA.some((x) => x.kelompok === k2)), "rencana: tiga kolom");
  cek(Object.values(D.KELOMPOK_RENCANA).every(tanpaDigit), "rencana: petunjuk kolom tanpa digit");
}

/* ------------------------------ CPA ------------------------------ */
// Story: empat tiang, tiga tali, tiga burung, lima tongkat; ruang angka sepuluh angka tidak kembar membuat sebagian jawaban sama dengan angka Story (operan berbeda).
for (const [nama, soal, rupa] of [["Concrete", D.CONCRETE, "benda"], ["Pictorial", D.PICTORIAL, "diagram"], ["Abstract", D.ABSTRACT, "lambang"]]) {
  sama(soal.map((s) => s.cara), ["klik", "kanvas", "suara"], `${nama}: tiga cara`);
  sama(soal.map((s) => Number(/Rumah Pohon (\d+)/.exec(s.judul)[1])), { benda: [2, 3, 4], diagram: [5, 6, 7], lambang: [8, 9, 10] }[rupa], `${nama}: nomor misi berlanjut`);
  const semua = soal.flatMap((s) => s.langkah);
  sama(semua.length, 12, `${nama}: dua belas langkah`);
  for (const s of soal) {
    sama(s.langkah.map((x) => x.metode), L.URUT_METODE, `${nama} ${s.cara}: empat metode`);
    cek(bersih(s.judul + s.cerita) && tanpaDigit(s.cerita), `${nama} ${s.cara}: cerita bersih`);
  }
  const angka = semua.map((x) => L.angkaJawab(x.langkah)).filter((n) => n !== null);
  cek(new Set(angka).size === angka.length && angka.length === 10, `${nama}: sepuluh angka jawaban tidak kembar (${angka.join(",")})`);
  cek(angka.every((n) => n >= 1 && n <= 12), `${nama}: angka satu sampai dua belas (${angka.join(",")})`);
  sama(semua.filter((x) => L.angkaJawab(x.langkah) === null).map((x) => `${x.cara}/${x.metode}`), ["klik/langsung", "kanvas/langsung"], `${nama}: dua langkah tanpa angka (menandai yang sama tinggi) di Klik dan Kanvas`);
  sama(semua.filter((x) => x.cara === "suara").every((x) => L.angkaJawab(x.langkah) !== null), true, `${nama}: langkah suara berjawaban angka`);

  // Cari kesalahan.
  const salah = semua.filter((x) => x.langkah.tipe === "salah");
  cek(salah.length >= 1 && salah.every((x) => x.cara === "klik"), `${nama}: ada soal Cari kesalahan di Klik`);
  for (const x of salah) {
    const l = x.langkah;
    const kunci = L.kunciLangkah(l.dasar);
    cek(kunci !== null && (l.jawabTokoh === undefined || (l.jawabTokoh !== kunci && l.jawabTokoh >= 0 && l.jawabTokoh <= 12)), `${nama}: jawaban ${l.tokoh} memang salah`);
    cek(TOKOH.includes(l.tokoh), `${nama}: tokoh cerita (${l.tokoh})`);
    cek(l.benar >= 0 && l.benar < 3 && new Set(l.alasan).size === 3, `${nama}: tiga alasan, satu benar`);
    const geser = (l.benar + 1 + (l.alasan[l.benar].length % 2)) % 3;
    const urut = [0, 1, 2].map((i) => (i + geser) % 3);
    cek(urut[0] !== l.benar && urut.length === 3, `${nama}: alasan benar bukan tombol pertama (urutan ${urut.join("")}, benar ${l.benar})`);
    cek([l.kataTokoh, l.keliru, ...l.alasan].every((t) => tanpaDigit(t) && bersih(t)), `${nama}: Cari kesalahan tanpa digit dan kata terlarang`);
    cek(L.pilihanDari(l).includes(kunci) && (l.jawabTokoh === undefined || L.pilihanDari(l).includes(l.jawabTokoh)), `${nama}: pilihan memuat kunci dan jawaban tokoh`);
    cek(L.petunjukSalah(l, l.jawabTokoh ?? -1).length > 10, `${nama}: petunjuk salah tersedia`);
    if (l.jawabTokoh !== undefined) cek(L.petunjukSalah(l, l.jawabTokoh).includes(l.tokoh), `${nama}: petunjuk menunjuk kesalahan ${l.tokoh}`);
    cek(/sudah menjawab/.test(x.suara), `${nama}: instruksi Cari kesalahan`);
    cek(x.metode === L.metodeLangkah(l.dasar), `${nama}: metode Cari kesalahan dari soal dasarnya`);
  }
  // Seed dari alur.
  const ss = salah[0].langkah;
  if (rupa === "benda") cek(ss.dasar.tipe === "banding" && (ss.dasar.alas?.[ss.dasar.acuan] ?? 0) > 0 && /bata/.test(ss.alasan.join(" ")) && /garis awal/.test(ss.alasan.join(" ")), `${nama}: Igil dan tiang di atas bata (alasan: garis awal sama)`);
  if (rupa === "diagram") cek(ss.dasar.tipe === "banding" && ss.dasar.isi.length === 2 && /lebih, bukan paling/.test(ss.alasan.join(" ")) && /paling/.test(ss.kataTokoh), `${nama}: dua batang, kata paling untuk dua benda`);
  if (rupa === "lambang") cek(ss.dasar.tipe === "banding" && ss.dasar.isi.length === 3 && /A lebih tinggi dari B/.test(ss.alasan.join(" ")) && /paling tinggi/.test(ss.kataTokoh), `${nama}: A lebih tinggi dari B, B dari C, C paling tinggi keliru`);

  const tanyaHub = new Set();
  const arahBanding = new Set();
  const arahTangga = new Set();
  const tanyaTangga = new Set();
  for (const x of semua) {
    const l = x.langkah.tipe === "salah" ? x.langkah.dasar : x.langkah;
    const k = L.kunciLangkah(x.langkah);
    // Panjang dan jumlah benda.
    cek(l.isi.length >= 2 && l.isi.length <= 10 && l.isi.every((v) => Number.isInteger(v) && v >= 1 && v <= 12), `${nama} ${x.metode}/${x.cara}: banyak benda dua sampai sepuluh, panjang satu sampai dua belas`);
    cek(l.acuan >= 0 && l.acuan < l.isi.length, `${nama} ${x.metode}/${x.cara}: benda bertanda ada`);
    // Batas rupa: alas (bata) dan gambar benda hanya di Concrete.
    if (rupa === "benda") cek(D.EMOJI[l.jenis] !== undefined && D.NAMA_BENDA[l.jenis] !== undefined, `${nama}: benda ${l.jenis} punya gambar dan nama`);
    else cek(l.tipe !== "banding" || l.alas === undefined, `${nama}: tanpa bata di luar Concrete`);
    if (l.tipe === "banding") {
      arahBanding.add(l.arah);
      sama(k, l.isi.filter((v, j) => j !== l.acuan && (l.arah === "tinggi" ? v > l.isi[l.acuan] : v < l.isi[l.acuan])).length, `${nama}: kunci banding dihitung ulang`);
      if (l.alas) cek(l.alas.length === l.isi.length && l.alas.every((a) => a >= 0 && a <= 3) && l.isi.every((v, j) => v + l.alas[j] <= 12), `${nama}: alas satu sampai tiga, ujung paling tinggi dua belas`);
      cek(k >= 1, `${nama}: banding punya jawaban`);
    }
    if (l.tipe === "langsung") {
      const sm = l.isi.filter((v, j) => j !== l.acuan && v === l.isi[l.acuan]).length;
      cek(sm >= 2 && sm <= 6, `${nama}: dua sampai enam benda sama tinggi (${sm})`);
      if (l.angka) sama(k, sm, `${nama}: kunci langsung dihitung ulang`);
      else cek(k === null && x.cara !== "suara", `${nama}: tandai tanpa angka, bukan suara`);
    }
    if (l.tipe === "perantara") {
      tanyaHub.add(l.tanya);
      const tali = l.isi[l.acuan];
      const f = (v) => (v > tali ? "lebih" : v < tali ? "kurang" : "pas");
      sama(k, l.isi.filter((v, j) => j !== l.acuan && f(v) === l.tanya).length, `${nama}: kunci perantara dihitung ulang`);
      cek(["lebih", "kurang", "pas"].every((h) => l.isi.some((v, j) => j !== l.acuan && f(v) === h) || h === "pas" && l.tanya !== "pas"), `${nama}: ketiga hubungan atau yang ditanyakan ada`);
    }
    if (l.tipe === "tangga") {
      arahTangga.add(l.arah);
      tanyaTangga.add(l.tanya);
      const u = [...l.isi].sort((p, q) => (l.arah === "naik" ? p - q : q - p));
      sama(k, l.tanya === "banyak" ? l.isi.length : u.indexOf(l.isi[l.acuan]) + 1, `${nama}: kunci tangga dihitung ulang`);
      cek(JSON.stringify(u) !== JSON.stringify(l.isi), `${nama}: benda belum terurut`);
      cek(new Set(l.isi).size === l.isi.length, `${nama}: panjang benda tangga berbeda semua`);
      if (x.cara === "kanvas") cek(l.isi.filter((v) => v === (l.arah === "naik" ? Math.min(...l.isi) : Math.max(...l.isi))).length === 1, `${nama}: anak tangga pertama tunggal untuk dilingkari`);
    }
    if (k !== null) {
      const p = L.pilihanDari(x.langkah);
      cek(p.includes(k) && new Set(p).size === 3 && p.every((v) => v >= 0 && v <= 12), `${nama} ${x.metode}/${x.cara}: pilihan memuat kunci`);
      for (const m of p.filter((v) => v !== k)) cek(tanpaDigit(L.petunjukSalah(x.langkah, m)) && L.petunjukSalah(x.langkah, m).length > 10, `${nama} ${x.metode}: petunjuk salah untuk ${m} tanpa digit`);
    }
    cek(tanpaDigit(x.suara) && bersih(x.suara) && x.suara.length <= 240, `${nama} ${x.metode}/${x.cara}: instruksi tanpa digit dan bersih ("${x.suara}")`);
    cek(/tali|benda|batang|huruf|anak tangga|tangga|kapur/i.test(x.suara) || x.langkah.tipe === "salah", `${nama}: instruksi menyebut bendanya`);
  }
  sama([...arahBanding].sort().length >= 1, true, `${nama}: banding punya arah`);
}
{
  const semuaJenis = new Set([...D.PICTORIAL, ...D.ABSTRACT].flatMap((s) => s.langkah.map((x) => L.dasarDari(x.langkah).tipe)));
  sama([...semuaJenis].sort(), ["banding", "langsung", "perantara", "tangga"], "empat jenis langkah dipakai");
  const hub = new Set(D.CONCRETE.concat(D.PICTORIAL, D.ABSTRACT).flatMap((s) => s.langkah.map((x) => L.dasarDari(x.langkah))).filter((l) => l.tipe === "perantara").map((l) => l.tanya));
  sama([...hub].sort(), ["kurang", "lebih", "pas"], "perantara: lebih, kurang, dan pas ditanyakan");
  const arah = new Set(D.CONCRETE.concat(D.PICTORIAL, D.ABSTRACT).flatMap((s) => s.langkah.map((x) => L.dasarDari(x.langkah))).filter((l) => l.tipe === "banding").map((l) => l.arah));
  sama([...arah].sort(), ["pendek", "tinggi"], "banding: lebih tinggi dan lebih pendek");
  const ar = new Set(D.CONCRETE.concat(D.PICTORIAL, D.ABSTRACT).flatMap((s) => s.langkah.map((x) => L.dasarDari(x.langkah))).filter((l) => l.tipe === "tangga").map((l) => l.arah));
  sama([...ar].sort(), ["naik", "turun"], "tangga: dari pendek dan dari tinggi");
  cek(D.POIN_PENTING.length >= 5 && D.POIN_PENTING_SUARA.every(tanpaDigit) && D.POIN_PENTING.every(bersih), "poin penting: suara tanpa digit");
  for (const k of ["garis awal", "dua benda", "tiga benda atau lebih", "tali", "tangga"]) cek(D.POIN_PENTING.some((p) => p.toLowerCase().includes(k)), `poin penting memuat "${k}"`);
  cek(tanpaDigit(D.JEMBATAN + D.JEMBATAN_SUARA) && /papan lantai/i.test(D.JEMBATAN) && /Sub-Bab B/.test(D.JEMBATAN), "jembatan ke Sub-Bab B: papan lantai");
  sama(Object.keys(D.TEMA_TAHAP), ["concrete", "pictorial", "abstract"], "tema tahap");
  cek(D.CONCRETE_TIANG === D.CONCRETE && D.PICTORIAL_TIANG === D.PICTORIAL && D.ABSTRACT_TIANG === D.ABSTRACT && D.TEMA_TIANG === D.TEMA_TAHAP, "ekspor nama pemasang");
  cek(Object.values(D.TEMA_TAHAP).every((t) => bersih(t.cara)), "tema tahap: teks bersih");
}

/* ------------------------------ Kanvas dan tata letak ------------------------------ */
{
  const W = K.LEBAR_ADEGAN;
  const H = K.TINGGI_ADEGAN;
  for (let n = 2; n <= 10; n += 1) {
    const w = K.lebarBatang(n);
    const xs = Array.from({ length: n }, (_, i) => K.letakX(i, n));
    cek(xs.every((x) => x - w / 2 - 3 > 17 && x + w / 2 + 3 < W - 4), `${n} benda masuk kanvas dan tidak menutupi tali di kiri`);
    cek(xs.every((x, i) => i === 0 || x - xs[i - 1] >= w + 4), `${n} benda tidak bertumpuk`);
    cek(K.jariTanda(n) * 2 <= K.jarakBenda(n) + 0.01 && K.jariTanda(n) >= 8, `${n} benda: jari-jari tanda tidak melewati tetangga`);
  }
  cek(K.puncakY(12) >= 40 && K.puncakY(1) < K.DASAR, "benda setinggi dua belas masuk kanvas di bawah judul");
  cek(K.puncakY(9, 3) >= 40, "benda dengan alas paling tinggi dua belas masuk kanvas");
  for (const n of [2, 5, 8, 10]) cek(K.titikTanda(0, n, 12).y >= 20 && K.pusatBenda(0, n, 12).y > K.puncakY(12), `titik tanda dan pusat benda ${n} di dalam kanvas`);
  cek(K.puncakT(12, K.DASAR_ATAS) >= 28 && K.DASAR_ATAS + 10 < K.puncakT(12, K.DASAR_BAWAH) && K.DASAR_BAWAH + 8 <= H, "tangga: baris acak di atas dan baris tangga di bawah masuk kanvas");
  const lingkar = (c, rx, ry = rx) => Array.from({ length: 24 }, (_, i) => ({ x: c.x + rx * Math.cos((i / 23) * 2 * Math.PI), y: c.y + ry * Math.sin((i / 23) * 2 * Math.PI) }));
  const coret = (p) => [{ x: p.x - 4, y: p.y - 4 }, { x: p.x + 4, y: p.y + 4 }];
  const isi = [3, 9, 4, 6, 8, 5, 7];
  const n = isi.length;
  const target = [1, 3, 4, 5, 6, 2];
  const pts = target.map((i) => K.titikTanda(i, n, isi[i]));
  cek(K.periksaCentang(pts.map(coret), pts, K.jariTanda(n)).benar && !K.periksaCentang([...pts.map(coret), coret(K.titikTanda(0, n, isi[0]))], pts, K.jariTanda(n)).benar && !K.periksaCentang(pts.slice(1).map(coret), pts, K.jariTanda(n)).benar, "banding: tanda hanya di benda yang memenuhi syarat, satu benda satu tanda");
  const pb = isi.map((v, i) => K.pusatBenda(i, n, v));
  cek(K.periksaLingkari([lingkar(pb[1], 14, 40)], pb, isi.map((_, i) => i === 1)).benar && !K.periksaLingkari([lingkar(pb[1], 80, 40)], pb, isi.map((_, i) => i === 1)).benar, "tangga: lingkari satu benda");
  for (const x of [1, 6, 9, 12]) sama(K.bilanganDariUcapan20(L.kata(x)), [x], `ucapan "${L.kata(x)}"`);
}

/* ------------------------------ Simulasi Meja Tukang dan usulan misi ------------------------------ */
{
  const T = D.TIANG_SIM;
  const STORY_WARNA = /merah|kuning|hijau|biru/i;
  cek(T.length === 5 && new Set(T.map((x) => x.id)).size === 5 && T.every((x) => x.panjang >= 1 && x.panjang <= 12 && x.alas >= 0 && x.alas <= 3 && x.warna && !STORY_WARNA.test(x.nama)), "meja: lima tiang berbeda dari Story");
  const sm = T.filter((x) => T.filter((y) => y.panjang === x.panjang).length > 1);
  cek(sm.length === 2 && sm.some((x) => x.alas > 0) && sm.some((x) => x.alas === 0) && T.filter((x) => x.alas > 0).length >= 3, "meja: ada dua tiang sama tinggi, satu di atas bata, dan beberapa tiang di atas bata");
  cek(T.some((x) => L.puncakTampak(x, false) > Math.max(...T.filter((y) => y.alas === 0).map((y) => y.panjang))) && T.every((x) => L.puncakTampak(x, true) === x.panjang), "meja: bata membuat ujung tampak tinggi, setelah lurus ujung sesuai panjang");
  cek(tanpaDigit(D.MISI_MEJA) && bersih(D.MISI_MEJA), "meja: teks misi tanpa digit");
  let k = L.awalTukang();
  sama([k.alat, k.mode, k.sejajar, k.bandingTuntas, k.tali, k.susunan.length, k.urutNaik], ["tukang", "sejajar", false, 0, null, 0, false], "meja: awal");
  // Banding: baru tuntas setelah sejajar.
  let r = L.pilihBanding(k, 1, T);
  sama([r.k.dipilih, r.hasil], [[1], null], "meja: pilih satu tiang");
  r = L.pilihBanding(r.k, 3, T);
  sama([r.k.dipilih, r.hasil.hasil, r.hasil.tuntas, r.k.bandingTuntas, r.k.samaTuntas], [[1, 3], "sama", false, 0, 0], "meja: ungu dan abu sama tinggi, tetapi belum sejajar jadi belum tuntas");
  k = L.luruskan(r.k);
  sama(k.sejajar, true, "meja: luruskan");
  r = L.pilihBanding(L.pilihBanding(k, 0, T).k, 0, T);
  sama(r.k.dipilih, [], "meja: ketuk tiang yang sama membatalkan");
  r = L.pilihBanding(L.pilihBanding({ ...k, dipilih: [] }, 1, T).k, 3, T);
  sama([r.hasil.tuntas, r.k.bandingTuntas, r.k.samaTuntas], [true, 1, 1], "meja: sejajar, ungu dan abu sama tinggi tuntas");
  r = L.pilihBanding(L.pilihBanding({ ...k, dipilih: [] }, 0, T).k, 2, T);
  sama([r.hasil.hasil, r.hasil.lebihTinggi], ["lebih", 2], "meja: pink lebih tinggi dari oranye");
  sama(L.pilihBanding(r.k, 4, T).k.dipilih, [4], "meja: pilihan ketiga memulai lagi");
  // Tali.
  let t = L.ambilTali(L.awalTukang(), 4);
  sama([t.tali, t.diperiksa], [4, []], "meja: tali sepanjang cokelat");
  let h = L.periksaTali(t, 2, T);
  sama([h.hasil, h.k.diperiksa], ["lebih", [2]], "meja: pink lebih dari tali");
  h = L.periksaTali(h.k, 1, T);
  sama([h.hasil, L.periksaTali(h.k, 1, T).k.diperiksa.length, L.periksaTali(h.k, 4, T).hasil], ["kurang", 2, null], "meja: ungu kurang, tidak dihitung dua kali, acuan tidak dibandingkan dengan dirinya");
  sama(L.ambilTali(h.k, 0).diperiksa, [], "meja: acuan baru menghapus perbandingan lama");
  sama(L.periksaTali(L.awalTukang(), 1, T).hasil, null, "meja: tanpa tali belum bisa membandingkan");
  // Tangga.
  const naik = [...T.keys()].sort((p, q) => T[p].panjang - T[q].panjang || p - q);
  let u = L.awalTukang();
  for (const i of naik) u = L.taruhTangga(u, i, T);
  sama([u.urutNaik, u.urutTurun, L.arahSusunan(u, T)], [true, false, "naik"], "meja: tangga dari paling pendek");
  sama(L.taruhTangga(u, 0, T), u, "meja: tiang tidak dipindah dua kali");
  const tukar = [...naik];
  cek(T[naik[0]].panjang === T[naik[1]].panjang, "meja: dua tiang sama tinggi berurutan di tangga");
  [tukar[0], tukar[1]] = [tukar[1], tukar[0]];
  let ut = L.awalTukang();
  for (const i of tukar) ut = L.taruhTangga(ut, i, T);
  sama([ut.urutNaik, L.arahSusunan(ut, T)], [true, "naik"], "meja: tiang sama tinggi boleh bertukar tempat");
  let tr = L.awalTukang();
  for (const i of [...naik].reverse()) tr = L.taruhTangga(tr, i, T);
  sama([tr.urutNaik, tr.urutTurun, L.arahSusunan(tr, T)], [false, true, "turun"], "meja: tangga dari paling tinggi");
  let ac = L.awalTukang();
  for (const i of [0, 1, 2, 3, 4]) ac = L.taruhTangga(ac, i, T);
  sama([ac.urutNaik, ac.urutTurun, L.arahSusunan(ac, T)], [false, false, null], "meja: susunan acak belum urut");
  sama([L.ulangTangga(u).susunan, L.ulangTangga(u).urutNaik, L.mulaiLagi().urutNaik], [[], true, false], "meja: ulang tangga menghapus susunan, tetapi tangga yang sudah rapi tetap tercatat; main lagi mereset");
  for (const mode of ["sejajar", "banding", "tali", "tangga"])
    for (const st of [L.awalTukang(), k, r.k, t, h.k, u, ut, tr, ac]) {
      const kal = L.kalimatTukang(L.pilihModeTukang(st, mode), T);
      cek(tanpaDigit(kal) && bersih(kal), `meja: kalimat ${mode} tanpa digit ("${kal}")`);
    }
  // Misi.
  const daftar = MB7.daftarMisiBab7("A");
  const ada = (st, id) => S.misiBaru(daftar, st, new Set()).includes(id);
  const awal = L.awalTukang();
  cek(daftar.filter((x) => x.wajib).length === 4 && daftar.filter((x) => !x.wajib).length === 2, "misi A: empat wajib, dua bebas");
  cek(new Set(daftar.map((x) => x.id)).size === 6 && daftar.every((x) => x.id.startsWith("a-")), "misi A: id unik berawalan a-");
  cek(daftar.every((x) => tanpaDigit(x.teks) && x.teks.length >= 10 && x.teks.length <= 120 && bersih(x.teks)), "misi A: teks tanpa digit, sepuluh sampai seratus dua puluh huruf");
  cek(daftar.every((x) => !x.cek(awal)), "misi A: awal belum tercapai");
  cek(daftar.every((x) => !x.cek({ alat: "lantai" }) && !x.cek({ alat: "ukur", id: "stik", n: 0, status: "kurang", tebak: 5 })), "misi A: keadaan alat lain tidak memenuhi");
  cek(ada(k, "a-lurus") && !ada(awal, "a-lurus"), "misi A: luruskan di garis awal");
  cek(!ada(L.pilihBanding(L.pilihBanding(awal, 0, T).k, 2, T).k, "a-banding") && ada(L.pilihBanding(L.pilihBanding(k, 0, T).k, 2, T).k, "a-banding"), "misi A: banding hanya dihitung setelah sejajar");
  let tl = L.ambilTali(awal, 4);
  tl = L.periksaTali(L.periksaTali(tl, 1, T).k, 2, T).k;
  cek(!ada(tl, "a-tali") && ada(L.periksaTali(tl, 0, T).k, "a-tali"), "misi A: tali dibawa ke tiga tiang");
  cek(ada(u, "a-tangga") && !ada(u, "a-turun") && !ada(ac, "a-tangga") && ada(tr, "a-turun") && !ada(tr, "a-tangga"), "misi A: tangga dari paling pendek dan dari paling tinggi");
  cek(ada(L.pilihBanding(L.pilihBanding(k, 1, T).k, 3, T).k, "a-sama") && !ada(L.pilihBanding(L.pilihBanding(k, 0, T).k, 2, T).k, "a-sama"), "misi A: bandingkan dua tiang sama tinggi");
}

/* ------------------------------ Berkas ------------------------------ */
{
  const berkas = readdirSync(folderUrl);
  for (const f of ["logika.ts", "data.ts", "periksa.ts", "LangkahTiang.tsx", "TahapTiang.tsx", "TanggaKayu.tsx", "PapanRencana.tsx", "SimulasiMejaTukang.tsx"]) cek(berkas.includes(f), `berkas wajib ${f}`);
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folderUrl), "utf8");
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d || c.codePointAt(0) === 0x1f6de) && !/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}/i.test(s), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!/\\u\{1F4CF\}|\\u\{1F4D0\}|\u{1F4CF}|\u{1F4D0}/u.test(s), `${f}: tanpa emoji penggaris`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(!/fetch\(|XMLHttpRequest/i.test(s), `${f}: tanpa jaringan`);
    if (/\.ts$/.test(f)) cek(!/from "react"/.test(s), `${f}: tanpa React`);
    const str = [...s.matchAll(/"([^"\n]{12,})"/g)].map((m) => m[1]).filter((x) => /\s/.test(x) && !x.includes("===") && !/^[a-z-]+( [a-z-:[\]#/0-9.()_,'%!>&]+)*$/.test(x) && !/&&|className|=>/.test(x));
    cek(str.every((x) => !/\b(kelas|buku|teman|kelompok|skor|nilai|tebak)\b/i.test(x) && !BAKU.test(x)), `${f}: teks tanpa kata terlarang atau satuan baku`);
    cek(!/lebih besar dari|lebih kecil dari|[<>]=?\s*\d/.test(str.join(" ")), `${f}: tanpa lambang lebih besar atau lebih kecil`);
  }
  const tahap = readFileSync(new URL("TahapTiang.tsx", folderUrl), "utf8");
  cek(/poinPenting/.test(tahap) && /POIN_PENTING/.test(tahap) && /JEMBATAN/.test(tahap) && !/PERAYAAN/.test(tahap), "TahapTiang: Abstract diakhiri Poin Penting dan jembatan (bukan perayaan akhir bab)");
  cek(/serbuk/.test(tahap) && /cetakbiru/.test(tahap) && /papan/.test(tahap), "TahapTiang: tiga pola visual (serbuk kayu, cetak biru, papan kapur)");
  for (const f of ["LangkahTiang.tsx", "TahapTiang.tsx"]) cek(!/\bskor\b|\bnilai\b/i.test(readFileSync(new URL(f, folderUrl), "utf8").replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*$/gm, "")), `${f}: tanpa skor (di luar komentar)`);
  const langkah = readFileSync(new URL("LangkahTiang.tsx", folderUrl), "utf8");
  cek(/from "\.\.\/ikan-k1b5a\/Jawab20"/.test(langkah) && !berkas.includes("Jawab20.tsx"), "LangkahTiang: Jawab20 dipakai ulang lewat impor, tidak disalin");
  cek(/CariSalah/.test(langkah) && /petunjukSalah/.test(langkah), "LangkahTiang: Cari kesalahan dan petunjuk yang menunjuk kesalahan");
  cek(langkah.includes("Ini jawaban yang benar.") && /ditunjukkan/.test(langkah) && langkah.includes('onBenar={(t) => jawab(n, "", t)}'), "LangkahTiang: jawaban ditunjukkan setelah tiga kali salah memakai pesan Ini jawaban yang benar.");
  // Gambar benda (emoji) hanya muncul di rupa benda.
  const aman = [...langkah.matchAll(/emoji\(/g)].every((m) => /benda/.test(langkah.slice(Math.max(0, m.index - 220), m.index)));
  cek(aman, "LangkahTiang: emoji benda hanya di rupa benda (Concrete)");
  cek((langkah.match(/PALET\[/g) ?? []).length >= 3 && /rupa === "lambang"/.test(langkah) && /Pernyataan/.test(langkah), "LangkahTiang: Abstract memakai pernyataan huruf dan kata saja");
  const sim = readFileSync(new URL("SimulasiMejaTukang.tsx", folderUrl), "utf8");
  cek(/onKeadaan/.test(sim) && /awalTukang/.test(sim) && /speakGuru/.test(sim) && /Main lagi/.test(sim) && /luruskan/.test(sim) && /periksaTali/.test(sim) && /taruhTangga/.test(sim), "SimulasiMejaTukang: melaporkan keadaan dan memuat empat alat");
  for (const f of ["TanggaKayu.tsx", "PapanRencana.tsx", "SimulasiMejaTukang.tsx", "TahapTiang.tsx"]) cek(/export default function/.test(readFileSync(new URL(f, folderUrl), "utf8")), `${f}: ekspor default`);
  const pr = readFileSync(new URL("PapanRencana.tsx", folderUrl), "utf8");
  cek(/BARIS_RENCANA\[baris\]\.nama/.test(pr) && /barisnya keliru/.test(pr), "PapanRencana: petunjuk salah menyebut baris yang keliru");
  const ms = readFileSync(new URL("../src/components/modul/SimulasiBab7.tsx", import.meta.url), "utf8");
  cek(ms.includes("SimulasiMejaTukang") && /sub === "A"/.test(ms), "SimulasiBab7: Sub-Bab A memakai Meja Tukang");
}

console.log(`Lulus ${lulus}, gagal ${gagal}`);
process.exit(gagal ? 1 : 0);
