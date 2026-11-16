// Uji tahap Abstract Opsi 2, Kelas 1 Bab 1 Sub-Bab A (src/lib/opsi2/tindakan-abstract-k1b1a.ts, src/data/opsi2/k1b1a-cpa.ts).
// Pakai: node --no-warnings scripts/uji-opsi2-abstract-k1a.mjs
// Kunci dihitung ulang dengan kode TERPISAH dari pembangkit (dari kata pada suara dan data soal), jawaban benar diterima,
// jawaban salah ditolak, pengecoh unik dari kekeliruan nyata, jalur tulis sah, suara tanpa digit, kalimat paling banyak delapan kata.
import { register } from "node:module";
import fs from "node:fs";
register(
  "data:text/javascript," +
    encodeURIComponent(
      "export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch { return n(s, c); } } return n(s, c); }",
    ),
  import.meta.url,
);
const M = await import("../src/lib/opsi2/index.ts");
const T = await import("../src/lib/opsi2/tindakan-abstract-k1b1a.ts");
const P = await import("../src/lib/opsi2/poin-abstract-k1b1a.ts");
const { CPA_K1B1A } = await import("../src/data/opsi2/k1b1a-cpa.ts");

let lulus = 0, gagal = 0;
const cek = (ok, ket) => { if (ok) lulus += 1; else { gagal += 1; if (gagal <= 40) console.log("GAGAL:", ket); } };
const BENIH = 2000;
const KATA = ["nol", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan", "sepuluh"];
const kataKeAngka = (t) => t.toLowerCase().split(/[^a-z]+/).map((w) => KATA.indexOf(w)).filter((i) => i >= 0);

/* ------------------------------ Katalog ------------------------------ */
const KATALOG_ABSTRACT = {
  "a-dengar-pilih": "dengarkan nama bilangan lalu pilih lambangnya",
  "a-tulis-kanvas": "tulis lambang yang disebut di kanvas",
  "a-jodohkan-kata": "jodohkan kata bilangan dengan lambangnya",
  "a-urut-goresan": "urutkan goresan penulisan sebuah lambang",
  "a-benar-salah": "benar atau salah: lambang ini dibaca",
  "a-detektif-arah": "detektif: lambang tertulis salah arah",
  "a-memori-kata": "memori: kartu lambang dengan kartu kata",
  "a-ketuk-semua-lambang": "ketuk semua lambang yang dibaca n",
  "a-lengkapi-kalimat": "lengkapi kalimat: lambang yang hilang",
  "a-tulis-sepuluh": "tulis sepuluh: satu lalu nol",
};
const a = CPA_K1B1A.abstract;
cek(a.status === "lengkap", "Abstract berstatus lengkap");
cek(a.soal.length === 10, "tepat sepuluh soal");
cek(a.soal.map((s) => s.nomor).join() === "1,2,3,4,5,6,7,8,9,10", "nomor 1 sampai 10 berurutan");
cek(M.validasiKatalog(a.soal, "abstract").length === 0, `validator katalog: ${M.validasiKatalog(a.soal, "abstract").join(" | ")}`);
cek(new Set(a.soal.map((s) => s.tindakan)).size === 10, "sepuluh tindakan berbeda");
cek(JSON.stringify(a.soal.map((s) => s.tindakan).sort()) === JSON.stringify(Object.keys(KATALOG_ABSTRACT).sort()), "tindakan sesuai katalog bagian 6 (sepuluh, tanpa lebih atau kurang)");
cek(JSON.stringify(M.daftarTindakan("abstract").map((t) => t.id).sort()) === JSON.stringify(Object.keys(KATALOG_ABSTRACT).sort()), "daftarTindakan(abstract) = sepuluh tindakan");
cek(M.daftarTindakan("abstract").every((t) => t.id.startsWith("a-")), "id tindakan berawalan a-");
for (const s of a.soal) {
  const g = M.periksaTeks(s.instruksi.replace(/\{\w+\}/g, "tujuh"), `soal ${s.nomor} instruksi`);
  cek(g.length === 0, g.join(" | "));
  cek(!/\d/.test(s.instruksi), `soal ${s.nomor}: instruksi tanpa digit`);
  cek(/\{n\}/.test(s.instruksi) === !["a-dengar-pilih", "a-jodohkan-kata", "a-memori-kata", "a-tulis-sepuluh"].includes(s.tindakan), `soal ${s.nomor}: sisipan {n} hanya pada soal yang menyebut bilangan`);
  for (const [k, v] of Object.entries(s.param)) if (/rentang/.test(k)) cek(v[0] >= 0 && v[1] <= 10 && v[0] <= v[1], `soal ${s.nomor}: ${k} dalam nol sampai sepuluh`);
}
cek(new Set(a.soal.map((s) => s.instruksi)).size === 10, "instruksi tiap soal berbeda");
const DIIZINKAN = new Set(["Lintang", "Niko", "Tala", "Igil"]);
for (const s of a.soal) for (const m of s.instruksi.matchAll(/(?<=[a-z,] )([A-Z][a-z]{2,})\b/g)) cek(DIIZINKAN.has(m[1]), `soal ${s.nomor}: nama "${m[1]}" tidak diizinkan`);
const SPEC = Object.fromEntries(a.soal.map((s) => [s.tindakan, s]));
const spesifik = (id, param) => ({ ...SPEC[id], param: { ...SPEC[id].param, ...param } });

/* ------------------------------ Pembantu uji ------------------------------ */
const NAMA_SALAH = [null, undefined, 5, "x", [], {}, { pilih: "zzz" }, { ids: "x" }, { hubungan: "x" }, { goresan: "x" }, { urutan: 5 }, { pasangan: [[1, 2]] }];
const adaDigit = (t) => /\d/.test(t);
const BATAS_EMOJI = /[\u{1F300}-\u{1FAFF}]/u;
const unik = (x) => new Set(x).size === x.length;

function periksaDasar(s, spec, benih) {
  const t = M.ambilTindakan(spec.tindakan);
  const g = M.periksaInstansUmum(s, "abstract");
  cek(g.length === 0, `${spec.tindakan}@${benih}: ${g.join(" | ")}`);
  cek(JSON.stringify(M.buatSoal(spec, benih)) === JSON.stringify(s), `${spec.tindakan}@${benih}: pembangkit berbenih dapat diulang`);
  cek(s.tahap === "abstract" && s.nomor === spec.nomor, `${spec.tindakan}@${benih}: tahap dan nomor`);
  cek(!BATAS_EMOJI.test(JSON.stringify(s)), `${spec.tindakan}@${benih}: tanpa emoji benda pada soal`);
  cek(!adaDigit(s.suara) && !adaDigit(s.penjelasan) && (s.pilihan ?? []).every((p) => !adaDigit(p.suara)), `${spec.tindakan}@${benih}: suara, penjelasan, suara pilihan tanpa digit`);
  cek(M.periksaTeks(s.penjelasan, "penjelasan").length === 0, `${spec.tindakan}@${benih}: penjelasan sah`);
  cek(JSON.stringify(s) === JSON.stringify(JSON.parse(JSON.stringify(s))), `${spec.tindakan}@${benih}: soal murni JSON`);
  const ok = t.periksa(s, t.jawabanBenar(s));
  cek(ok.benar === true, `${spec.tindakan}@${benih}: jawaban benar diterima`);
  for (const j of NAMA_SALAH) {
    let h;
    try { h = t.periksa(s, j); } catch (e) { cek(false, `${spec.tindakan}@${benih}: periksa melempar galat untuk ${JSON.stringify(j)}`); continue; }
    cek(h.benar === false, `${spec.tindakan}@${benih}: jawaban asing ${JSON.stringify(j)} ditolak`);
    if (h.petunjuk) {
      cek(M.periksaTeks(h.petunjuk.pesan, "petunjuk").length === 0, `${spec.tindakan}@${benih}: pesan petunjuk sah (${h.petunjuk.pesan})`);
      cek(Array.isArray(h.petunjuk.sasaran), `${spec.tindakan}@${benih}: sasaran petunjuk berupa daftar`);
    }
  }
  if (s.pilihan) {
    cek(s.percobaan === s.pilihan.length, `${spec.tindakan}@${benih}: percobaan = jumlah pilihan`);
    cek(unik(s.pilihan.map((p) => p.id)) && unik(s.pilihan.map((p) => p.label)), `${spec.tindakan}@${benih}: id dan label pilihan unik`);
    cek(unik((s.pengecoh ?? []).map((p) => p.id)), `${spec.tindakan}@${benih}: pengecoh unik`);
    cek((s.pengecoh ?? []).length === s.pilihan.length - 1, `${spec.tindakan}@${benih}: semua pilihan salah tercatat sebagai pengecoh`);
    for (const p of s.pilihan) {
      const h = t.periksa(s, { pilih: p.id });
      cek(h.benar === (p.id === s.kunciPilihan), `${spec.tindakan}@${benih}: pilihan ${p.id}`);
      if (!h.benar) cek(h.petunjuk && M.periksaTeks(h.petunjuk.pesan, "p").length === 0, `${spec.tindakan}@${benih}: pilihan salah berpetunjuk`);
    }
  } else cek(s.percobaan === 3, `${spec.tindakan}@${benih}: tiga percobaan tanpa pilihan`);
  return t;
}

const hitung = {};
const catat = (id, v) => { (hitung[id] ??= new Set()).add(v); };
const KONFUSI_TES = { 0: ["10"], 2: ["5"], 3: ["3c"], 5: ["2"], 6: ["9"], 9: ["6"], 10: ["1"] };

/* ------------------------------ Tiap tindakan, ribuan benih ------------------------------ */
for (let benih = 1; benih <= BENIH; benih += 1) {
  /* 1 dengar-pilih */
  {
    const spec = SPEC["a-dengar-pilih"];
    const s = M.buatSoal(spec, benih);
    const t = periksaDasar(s, spec, benih);
    const n = KATA.indexOf(s.data.nama);
    catat("a-dengar-pilih", n);
    cek(n >= 0 && s.kunciPilihan === String(n) && s.kunci === n && s.bentuk === "pilihan", `dengar@${benih}: kunci dihitung ulang`);
    cek(s.pilihan.find((p) => p.id === s.kunciPilihan).label === String(n) && s.pilihan.find((p) => p.id === s.kunciPilihan).suara === KATA[n], `dengar@${benih}: label dan suara pilihan benar`);
    cek(s.pilihan.length === 3 && !adaDigit(s.suara) && !s.suara.includes(s.data.nama), `dengar@${benih}: tiga pilihan, nama tidak terbaca pada instruksi`);
    for (const id of KONFUSI_TES[n] ?? []) cek(s.pilihan.some((p) => p.id === id), `dengar@${benih}: pengecoh kekeliruan nyata ${id} untuk ${n}`);
    cek(s.pengecoh.every((c) => c.alasan.trim().length > 3), `dengar@${benih}: alasan pengecoh`);
    cek(t.periksa(s, { pilih: s.kunciPilihan }).benar, `dengar@${benih}: terima`);
  }
  /* 2 tulis-kanvas */
  {
    const spec = SPEC["a-tulis-kanvas"];
    const s = M.buatSoal(spec, benih);
    periksaDasar(s, spec, benih);
    const [n] = kataKeAngka(s.suara);
    catat("a-tulis-kanvas", n);
    cek(n >= 0 && n <= 9 && s.kunci === n && s.data.lambang === String(n) && s.bentuk === "tulisan", `tulis@${benih}: kunci dihitung ulang dari suara`);
  }
  /* 3 jodohkan */
  {
    const spec = SPEC["a-jodohkan-kata"];
    const s = M.buatSoal(spec, benih);
    const t = periksaDasar(s, spec, benih);
    const { kiri, kanan } = s.data;
    const nKiri = kiri.map((k) => KATA.indexOf(k.kata));
    cek(kiri.length === 3 && kanan.length === 3 && unik(nKiri) && nKiri.every((n) => n >= 0) && s.bentuk === "garis", `jodoh@${benih}: tiga kata dan tiga lambang berbeda`);
    cek(JSON.stringify([...s.kunci].sort((x, y) => x - y)) === JSON.stringify([...nKiri].sort((x, y) => x - y)) && JSON.stringify(kanan.map((l) => Number(l.lambang)).sort((x, y) => x - y)) === JSON.stringify([...nKiri].sort((x, y) => x - y)), `jodoh@${benih}: kunci dihitung ulang`);
    nKiri.forEach((n) => catat("a-jodohkan-kata", n));
    // semua penugasan: hanya yang benar diterima (6 susunan, 1 benar).
    const susun = (x) => (x.length <= 1 ? [x] : x.flatMap((v, i) => susun([...x.slice(0, i), ...x.slice(i + 1)]).map((r) => [v, ...r])));
    const lamIds = kanan.map((l) => l.id);
    let diterima = 0;
    for (const pr of susun(lamIds)) {
      const h = t.periksa(s, { hubungan: kiri.map((k, i) => [k.id, pr[i]]) });
      const benar = kiri.every((k, i) => pr[i] === `l${KATA.indexOf(k.kata)}`);
      cek(h.benar === benar, `jodoh@${benih}: susunan ${pr.join()}`);
      if (h.benar) diterima += 1;
      else cek(h.petunjuk && h.petunjuk.sasaran.length > 0 && h.petunjuk.sasaran.every((x) => kiri.some((k) => k.id === x)), `jodoh@${benih}: petunjuk menunjuk kata yang salah`);
    }
    cek(diterima === 1, `jodoh@${benih}: tepat satu susunan benar`);
    cek(t.periksa(s, { hubungan: [[kiri[0].id, kanan[0].id]] }).benar === false, `jodoh@${benih}: belum lengkap ditolak`);
  }
  /* 4 urut goresan */
  {
    const spec = SPEC["a-urut-goresan"];
    const s = M.buatSoal(spec, benih);
    const t = periksaDasar(s, spec, benih);
    const [n] = kataKeAngka(s.suara);
    const GORESAN = { 2: 3, 3: 2, 4: 3, 5: 3, 6: 2, 7: 2, 8: 3, 9: 2 };
    catat("a-urut-goresan", n);
    cek(GORESAN[n] !== undefined && s.data.kartu.length === GORESAN[n] && s.data.semua.length === GORESAN[n], `urut@${benih}: banyak goresan lambang ${n}`);
    cek(JSON.stringify(s.kunci) === JSON.stringify(Array.from({ length: GORESAN[n] }, (_, i) => `g${i + 1}`)), `urut@${benih}: kunci dihitung ulang`);
    cek(s.data.kartu.map((k) => k.id).join() !== s.kunci.join(), `urut@${benih}: kartu tidak tersaji sudah berurutan`);
    cek(s.data.kartu.every((k) => s.data.semua[Number(k.id.slice(1)) - 1] === k.d), `urut@${benih}: tiap kartu memuat goresannya`);
    const susun = (x) => (x.length <= 1 ? [x] : x.flatMap((v, i) => susun([...x.slice(0, i), ...x.slice(i + 1)]).map((r) => [v, ...r])));
    for (const u of susun(s.kunci)) cek(t.periksa(s, { urutan: u }).benar === (u.join() === s.kunci.join()), `urut@${benih}: urutan ${u.join()}`);
    const h = t.periksa(s, { urutan: [...s.kunci].reverse() });
    cek(h.benar === false && h.petunjuk.sasaran.length === 1, `urut@${benih}: petunjuk menunjuk goresan giliran itu`);
  }
  /* 5 benar-salah */
  {
    const spec = SPEC["a-benar-salah"];
    const s = M.buatSoal(spec, benih);
    const t = periksaDasar(s, spec, benih);
    const [klaim] = kataKeAngka(s.suara);
    const lambang = Number(s.data.lambang);
    const harap = klaim === lambang ? "benar" : "salah";
    catat("a-benar-salah", `${harap}${lambang}`);
    cek(s.kunci === harap && s.kunciPilihan === harap && s.percobaan === 2 && s.pilihan.length === 2, `benar-salah@${benih}: kunci dihitung ulang`);
    if (harap === "salah") cek(KATA.indexOf(s.data.klaim) === klaim && (T.KONFUSI[lambang] ?? []).some((k) => k.angka === klaim), `benar-salah@${benih}: klaim salah berasal dari kekeliruan nyata`);
    cek(t.periksa(s, { pilih: harap === "benar" ? "salah" : "benar" }).benar === false, `benar-salah@${benih}: pilihan lawan ditolak`);
  }
  /* 6 detektif */
  {
    const spec = SPEC["a-detektif-arah"];
    const s = M.buatSoal(spec, benih);
    const t = periksaDasar(s, spec, benih);
    const n = kataKeAngka(s.suara).at(-1); // "Niko menulis satu lambang enam terbalik": bilangan terakhir
    const ubin = s.data.ubin;
    const salah =ubin.filter((u) => u.arah !== "benar");
    catat("a-detektif-arah", n);
    cek(ubin.length === 4 && salah.length === 1 && s.kunci === salah[0].id && ubin.every((u) => u.lambang === String(n)), `detektif@${benih}: tepat satu salah arah, kunci dihitung ulang`);
    cek([2, 3, 4, 5, 6, 7, 9].includes(n) && (salah[0].arah !== "putar" || n === 6 || n === 9), `detektif@${benih}: lambang tak simetris dan putaran hanya 6 atau 9`);
    for (const u of ubin) {
      const h = t.periksa(s, { pilih: u.id });
      cek(h.benar === (u.id === s.kunci), `detektif@${benih}: ketuk ${u.id}`);
      if (!h.benar) cek(h.petunjuk.sasaran.length === 3 && !h.petunjuk.sasaran.includes(s.kunci), `detektif@${benih}: petunjuk menunjuk yang sudah benar`);
    }
  }
  /* 7 memori */
  {
    const spec = SPEC["a-memori-kata"];
    const s = M.buatSoal(spec, benih);
    const t = periksaDasar(s, spec, benih);
    const kartu = s.data.kartu;
    const ns = [...new Set(kartu.map((k) => k.n))];
    cek(kartu.length === 6 && ns.length === 3 && ns.every((n) => kartu.filter((k) => k.n === n).length === 2 && kartu.some((k) => k.n === n && k.jenis === "kata" && k.teks === KATA[n]) && kartu.some((k) => k.n === n && k.jenis === "lambang" && k.teks === String(n))), `memori@${benih}: tiga pasang kartu lambang dan kata`);
    cek(JSON.stringify(s.kunci) === JSON.stringify([...ns].sort((x, y) => x - y)), `memori@${benih}: kunci dihitung ulang`);
    ns.forEach((n) => catat("a-memori-kata", n));
    const [x, y, z] = ns;
    cek(t.periksa(s, { pasangan: [[`kata${x}`, `lam${y}`], [`kata${y}`, `lam${x}`], [`kata${z}`, `lam${z}`]] }).benar === false, `memori@${benih}: pasangan tertukar ditolak`);
    cek(t.periksa(s, { pasangan: [[`kata${x}`, `lam${x}`]] }).benar === false, `memori@${benih}: belum lengkap ditolak`);
  }
  /* 8 ketuk semua */
  {
    const spec = SPEC["a-ketuk-semua-lambang"];
    const s = M.buatSoal(spec, benih);
    const t = periksaDasar(s, spec, benih);
    const [n] = kataKeAngka(s.suara);
    const ubin = s.data.ubin;
    const sasaran = ubin.filter((u) => u.angka === n).map((u) => u.id);
    catat("a-ketuk-semua-lambang", n);
    cek(ubin.length === 8 && sasaran.length >= 2 && sasaran.length <= 4 && JSON.stringify([...s.kunci].sort()) === JSON.stringify([...sasaran].sort()), `ketuk-semua@${benih}: kunci dihitung ulang (${sasaran.length} sasaran)`);
    cek(new Set(ubin.filter((u) => u.angka === n).map((u) => u.gaya)).size >= 2, `ketuk-semua@${benih}: sasaran memakai beberapa gaya tulisan`);
    cek(ubin.every((u) => u.angka >= 0 && u.angka <= 10 && Object.keys({ tebal: 1, miring: 1, serif: 1, mono: 1, tulis: 1, bulat: 1 }).includes(u.gaya)), `ketuk-semua@${benih}: lambang dan gaya sah`);
    for (const c of KONFUSI_TES[n] ?? []) if (c !== "3c") cek(ubin.some((u) => String(u.angka) === c), `ketuk-semua@${benih}: ada pengecoh ${c} untuk ${n}`);
    const sisa = ubin.find((u) => u.angka !== n).id;
    cek(t.periksa(s, { ids: [...sasaran, sisa] }).benar === false && t.periksa(s, { ids: [...sasaran, sisa] }).petunjuk.sasaran[0] === sisa, `ketuk-semua@${benih}: kelebihan ditolak, petunjuk ke yang keliru`);
    cek(t.periksa(s, { ids: sasaran.slice(1) }).benar === false && t.periksa(s, { ids: sasaran.slice(1) }).petunjuk.sasaran[0] === sasaran[0], `ketuk-semua@${benih}: kurang ditolak, petunjuk ke yang terlewat`);
    cek(t.periksa(s, { ids: [...sasaran, sasaran[0]] }).benar === false, `ketuk-semua@${benih}: id ganda ditolak`);
  }
  /* 9 lengkapi kalimat */
  {
    const spec = SPEC["a-lengkapi-kalimat"];
    const s = M.buatSoal(spec, benih);
    const t = periksaDasar(s, spec, benih);
    const [n] = kataKeAngka(s.suara);
    catat("a-lengkapi-kalimat", n);
    cek(n >= 0 && s.kunciPilihan === String(n) && s.kunci === n && s.data.kata === KATA[n] && s.pilihan.length === 4, `lengkapi@${benih}: kunci dihitung ulang, empat pilihan`);
    for (const id of KONFUSI_TES[n] ?? []) cek(s.pilihan.some((p) => p.id === id), `lengkapi@${benih}: pengecoh kekeliruan nyata ${id} untuk ${n}`);
    cek(t.periksa(s, { pilih: String(n) }).benar, `lengkapi@${benih}: terima`);
  }
  /* 10 tulis sepuluh */
  {
    const spec = SPEC["a-tulis-sepuluh"];
    const s = M.buatSoal(spec, benih);
    periksaDasar(s, spec, benih);
    cek(s.kunci === 10 && s.data.lambang === "10" && s.penjelasan === "Sepuluh ditulis dua lambang: satu, lalu nol." && s.data.mode === "sepuluh", `sepuluh@${benih}: kunci dan penjelasan`);
  }
}

// Keragaman lintas benih.
for (const [id, himpunan] of Object.entries(hitung)) {
  const harap = { "a-benar-salah": 12, "a-tulis-kanvas": 10, "a-urut-goresan": 8, "a-detektif-arah": 7 }[id] ?? 11;
  cek(himpunan.size >= harap, `${id}: keragaman (${[...himpunan].join(",")})`);
}
cek((hitung["a-benar-salah"] ? [...hitung["a-benar-salah"]].some((x) => x.startsWith("benar")) && [...hitung["a-benar-salah"]].some((x) => x.startsWith("salah")) : false), "benar-salah: ada pernyataan benar dan salah");

/* ------------------------------ Jalur tulis (nomor 2 dan 10) ------------------------------ */
{
  // Pemeriksa uji sendiri: contoh titik jalur model (kode terpisah dari modelTulis) pada kanvas 256 x 220.
  const MODEL = {
    "0": ["M28 2 C8 2 4 24 4 46 C4 68 8 90 28 90 C48 90 52 68 52 46 C52 24 48 2 28 2"],
    "1": ["M28 2 L28 90"],
    "2": ["M8 20 C10 -4 50 -4 52 22", "M52 22 C54 44 22 64 4 90", "M4 90 L54 90"],
    "3": ["M6 14 C12 -2 50 -2 50 22 C50 38 34 44 22 44", "M22 44 C38 44 54 50 54 68 C54 88 30 94 4 78"],
    "4": ["M40 2 L4 62", "M4 62 L54 62", "M40 2 L40 90"],
    "5": ["M50 2 L12 2", "M12 2 L8 42", "M8 42 C22 32 54 36 54 62 C54 90 20 96 4 78"],
    "6": ["M44 4 C16 12 4 44 4 66", "M4 66 C4 92 52 92 52 66 C52 44 14 44 4 66"],
    "7": ["M4 4 L52 4", "M52 4 L22 90"],
    "8": ["M28 4 C8 4 6 36 28 46", "M28 46 C50 54 52 90 28 90 C6 90 4 54 28 46", "M28 46 C50 38 48 4 28 4"],
    "9": ["M26 3 C2 3 2 44 26 44 C50 44 50 3 26 3", "M44 24 L44 90"],
  };
  const contoh = (d, ox, langkah = 30) => {
    const bagian = [...d.matchAll(/([MLC])([^MLC]*)/g)].map((m) => [m[1], m[2].trim().split(/[\s,]+/).map(Number)]);
    let cur = null; const pts = [];
    for (const [c, v] of bagian) {
      if (c === "M") { cur = [v[0], v[1]]; pts.push(cur); }
      else if (c === "L") { for (let i = 1; i <= langkah; i += 1) pts.push([cur[0] + ((v[0] - cur[0]) * i) / langkah, cur[1] + ((v[1] - cur[1]) * i) / langkah]); cur = [v[0], v[1]]; }
      else for (let k = 0; k < v.length; k += 6) {
        for (let i = 1; i <= langkah; i += 1) {
          const u = i / langkah, w = 1 - u;
          pts.push([w ** 3 * cur[0] + 3 * w * w * u * v[k] + 3 * w * u * u * v[k + 2] + u ** 3 * v[k + 4], w ** 3 * cur[1] + 3 * w * w * u * v[k + 1] + 3 * w * u * u * v[k + 3] + u ** 3 * v[k + 5]]);
        }
        cur = [v[k + 4], v[k + 5]];
      }
    }
    return pts.map(([x, y]) => ({ x: Math.round((x + ox) * 2), y: Math.round((y + 8) * 2) }));
  };
  const tulisan = (n) => (n === 10 ? [["1", 4], ["0", 68]] : [[String(n), 36]]).flatMap(([a, ox]) => MODEL[a].map((d) => contoh(d, ox)));
  const periksaN = (id, n, goresan) => {
    const spec = id === "a-tulis-sepuluh" ? SPEC[id] : spesifik(id, { rentang: [n, n] });
    const s = M.buatSoal(spec, 5);
    return { s, h: M.ambilTindakan(id).periksa(s, { goresan }) };
  };
  for (let n = 0; n <= 10; n += 1) {
    const id = n === 10 ? "a-tulis-sepuluh" : "a-tulis-kanvas";
    const benar = tulisan(n);
    const { s, h } = periksaN(id, n, benar);
    cek(s.kunci === n && kataKeAngka(s.suara).includes(n), `tulis ${n}: kunci dan suara`);
    cek(h.benar === true, `tulis ${n}: jalur gerak sah diterima`);
    // Jalur sah juga bila diangkat jari di tengah goresan lalu mengulang dari awal.
    const putus = benar.map((g, i) => (i === 0 ? [g.slice(0, Math.floor(g.length / 2)), g] : [g])).flat();
    cek(periksaN(id, n, putus).h.benar === true, `tulis ${n}: ulang dari awal goresan diterima`);
    // Arah terbalik tiap goresan ditolak.
    cek(periksaN(id, n, benar.map((g) => [...g].reverse())).h.benar === false, `tulis ${n}: arah goresan terbalik ditolak`);
    // Goresan kurang atau urutan terbalik ditolak.
    if (benar.length > 1) {
      cek(periksaN(id, n, benar.slice(0, -1)).h.benar === false, `tulis ${n}: goresan kurang ditolak`);
      cek(periksaN(id, n, [...benar].reverse()).h.benar === false, `tulis ${n}: urutan goresan terbalik ditolak`);
    } else cek(periksaN(id, n, [benar[0].slice(0, 10)]).h.benar === false, `tulis ${n}: goresan baru separuh ditolak`);
    // Coretan memenuhi kanvas ditolak.
    const coret = [];
    for (let i = 0; i < 40; i += 1) { coret.push({ x: i % 2 ? 0 : 255, y: Math.round((i / 40) * 219) }); coret.push({ x: i % 2 ? 255 : 0, y: Math.round(((i + 1) / 40) * 219) }); }
    cek(periksaN(id, n, [coret]).h.benar === false, `tulis ${n}: coretan ditolak`);
    cek(periksaN(id, n, [...benar, coret]).h.benar === false, `tulis ${n}: lambang benar dengan coretan tambahan ditolak`);
    cek(periksaN(id, n, []).h.benar === false && periksaN(id, n, [[{ x: 100, y: 100 }]]).h.benar === false, `tulis ${n}: kosong dan satu titik ditolak`);
    cek(periksaN(id, n, [[{ x: "a", y: 1 }]]).h.benar === false, `tulis ${n}: titik tak sah ditolak`);
    // Menulis lambang lain ditolak.
    for (let m = 0; m <= 10; m += 1) if (m !== n) {
      const sama = JSON.stringify(tulisan(m)) === JSON.stringify(benar);
      if (!sama) cek(periksaN(id, n, tulisan(m)).h.benar === false, `tulis ${n}: tulisan lambang ${m} ditolak`);
    }
  }
  // Sepuluh: hanya satu atau hanya nol ditolak; nol lebih dulu ditolak.
  const sepuluh = tulisan(10);
  cek(periksaN("a-tulis-sepuluh", 10, [sepuluh[0]]).h.benar === false, "sepuluh: hanya lambang satu ditolak");
  cek(periksaN("a-tulis-sepuluh", 10, [sepuluh[1]]).h.benar === false, "sepuluh: hanya lambang nol ditolak");
  cek(periksaN("a-tulis-sepuluh", 10, [sepuluh[1], sepuluh[0]]).h.benar === false, "sepuluh: nol lebih dulu daripada satu ditolak");
  // Soal tulis kanvas mencakup semua lambang nol sampai sembilan lintas benih.
  cek(hitung["a-tulis-kanvas"].size === 10, "nomor 2: semua lambang nol sampai sembilan muncul");
}

/* ------------------------------ Batas tahap: lambang dan kata saja ------------------------------ */
{
  const sampel = a.soal.map((sp) => M.buatSoal(sp, 11));
  cek(sampel.every((s) => !BATAS_EMOJI.test(JSON.stringify([s.data, s.layar, s.suara, s.pilihan, s.penjelasan]))), "tak ada emoji benda pada soal Abstract");
  cek(sampel.every((s) => !/apel|jeruk|keranjang|piring|nampan|diagram|titik|petak|turus|bingkai/i.test(`${s.suara} ${s.layar} ${s.penjelasan}`)), "tanpa kata benda atau diagram pada teks soal Abstract");
  cek(sampel.every((s) => !/bandingkan|lebih|kurang|maju|mundur|pasangan|tambah|puluhan|satuan/i.test(`${s.suara} ${s.layar} ${s.penjelasan}`)), "tanpa membocorkan sub-bab berikutnya");
  cek(sampel.some((s) => s.bentuk === "pilihan") && sampel.some((s) => s.bentuk === "tulisan") && sampel.some((s) => s.bentuk === "garis") && sampel.some((s) => s.bentuk === "himpunan") && sampel.some((s) => s.bentuk === "urutan") && sampel.some((s) => s.bentuk === "ketuk"), "beragam bentuk jawaban");
  cek(sampel.every((s) => s.data && !JSON.stringify(s.data).includes("emoji")), "data tanpa penanda emoji");
  // Sumber komponen dan data Abstract tanpa emoji benda (U+1F300 sampai U+1FAFF) dan tanpa gambar benda.
  const berkas = ["src/components/modul/opsi2/aksi-abstract-k1b1a.tsx", "src/components/modul/opsi2/k1b1a-abstract.tsx", "src/components/modul/opsi2/poin-k1b1a.tsx", "src/lib/opsi2/tindakan-abstract-k1b1a.ts", "src/lib/opsi2/poin-abstract-k1b1a.ts"];
  for (const f of berkas) {
    cek(fs.existsSync(f), `${f} ada`);
    const isi = fs.readFileSync(f, "utf8");
    cek(!BATAS_EMOJI.test(isi) && !/GAMBAR_BENDA|\\u\{1F[3-9A-F][0-9A-F]{2}\}/i.test(isi), `${f}: tanpa emoji benda`);
    cek(!/localStorage|sessionStorage|fetch\(|XMLHttpRequest/.test(isi), `${f}: tanpa jaringan dan penyimpanan`);
  }
  const ekspor = fs.readFileSync("src/components/modul/opsi2/k1b1a-abstract.tsx", "utf8");
  cek(/export (function|const) AbstractK1B1KA/.test(ekspor) && /TahapOpsi2/.test(ekspor) && /tahap=\{6\}/.test(ekspor) && /CPA_K1B1A\.abstract/.test(ekspor) && /poin=\{/.test(ekspor) && /onSelesai=\{selesai\}/.test(ekspor), "k1b1a-abstract.tsx: AbstractK1B1KA tahap 6 berpoin, onSelesai dari TahapPermainan");
  const poin = fs.readFileSync("src/components/modul/opsi2/poin-k1b1a.tsx", "utf8");
  cek(/PoinPentingK2/.test(poin) && /onSelesai=\{onSelesai\}/.test(poin) && /SELESAIKAN SUB-BAB A & LANJUTKAN/.test(poin), "poin-k1b1a.tsx: tombol Selesaikan Sub-Bab A memanggil onSelesai");
  const aksi = fs.readFileSync("src/components/modul/opsi2/aksi-abstract-k1b1a.tsx", "utf8");
  for (const id of Object.keys(KATALOG_ABSTRACT)) cek(aksi.includes(`daftarkanKomponen("${id}"`), `komponen terdaftar untuk ${id}`);
}

/* ------------------------------ Poin Penting ------------------------------ */
{
  const suara = [P.SUARA_POIN_K1B1A, P.CARA_K1B1A.suara, ...P.POIN_K1B1A.map((p) => p.suara), ...P.REFLEKSI_K1B1A];
  for (const t of suara) { const g = M.periksaTeks(t, `poin "${t}"`); cek(g.length === 0, g.join(" | ")); cek(!adaDigit(t), `poin suara tanpa digit: ${t}`); }
  for (const p of P.POIN_K1B1A) { const g = M.periksaTeks(p.layar, `layar "${p.layar}"`, { bolehDigit: true }); cek(g.length === 0, g.join(" | ")); }
  const g = M.periksaTeks(P.RUMAH_K1B1A, "rumah"); cek(g.length === 0, g.join(" | "));
  cek(P.POIN_K1B1A.map((p) => p.nama).join() === "Tunjuk,Geser,Isi,Tulis", "empat poin Metode IGIL: Tunjuk, Geser, Isi, Tulis");
  cek(P.REFLEKSI_K1B1A.length === 3, "tiga pertanyaan refleksi");
  cek(P.POIN_K1B1A.every((p) => !BATAS_EMOJI.test(p.ikon) && !BATAS_EMOJI.test(p.layar)), "ikon poin bukan emoji benda");
  cek(/yang terakhir/i.test(P.POIN_K1B1A[0].suara) && /nol/.test(P.POIN_K1B1A[2].suara) && /sepuluh/.test(P.POIN_K1B1A[2].suara) && /satu, lalu nol/.test(P.POIN_K1B1A[3].suara), "isi poin: terakhir = banyaknya, nol, sepuluh, satu lalu nol");
  cek(!/teman|kelompok|kelas|buku|gunting|pisau|api|korek|listrik|kompor/i.test(`${P.RUMAH_K1B1A} ${P.REFLEKSI_K1B1A.join(" ")}`), "kegiatan rumah tanpa kata terlarang atau benda berbahaya");
  cek(!/skor|nilai|poin|peringkat|bintang/i.test([...suara, P.RUMAH_K1B1A, ...P.POIN_K1B1A.map((p) => p.layar)].join(" ")) , "Poin Penting tanpa kata penilaian");
}

console.log(`Uji Abstract K1 Bab 1 Sub-Bab A: ${lulus} lulus, ${gagal} gagal.`);
process.exit(gagal ? 1 : 0);
