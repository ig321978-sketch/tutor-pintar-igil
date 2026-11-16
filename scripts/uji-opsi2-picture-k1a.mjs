// Uji tahap Picture Opsi 2 Kelas 1 Bab 1 Sub-Bab A: data (src/data/opsi2/k1b1a-cpa.ts) dan sepuluh tindakan
// (src/lib/opsi2/tindakan-picture-k1b1a.ts). Kunci dihitung ulang dengan kode TERPISAH dari pembangkit pada ribuan benih.
// Pakai: node --no-warnings scripts/uji-opsi2-picture-k1a.mjs
import { register } from "node:module";
import fs from "node:fs";
import path from "node:path";
register(
  "data:text/javascript," +
    encodeURIComponent(
      "export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch { return n(s, c); } } return n(s, c); }",
    ),
  import.meta.url,
);
const M = await import("../src/lib/opsi2/index.ts");
const { CPA_K1B1A } = await import("../src/data/opsi2/k1b1a-cpa.ts");

let lulus = 0, gagal = 0;
const cek = (ok, ket) => { if (ok) lulus += 1; else { gagal += 1; if (gagal <= 40) console.log("GAGAL:", ket); } };
const BENIH = 2000;
const KATA = ["nol", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan", "sepuluh"];
const angkaDariKata = (t) => t.toLowerCase().split(/[^a-z]+/).map((w) => KATA.indexOf(w)).filter((i) => i >= 0);

// Katalog Picture yang disetujui (aturan-kuis-cpa-opsi2.md bagian 6), satu id per tindakan.
const KATALOG_PICTURE = {
  "p-warnai-bingkai": "warnai n petak pada bingkai sepuluh",
  "p-tandai-titik": "tandai n titik pada deret titik",
  "p-hubungkan-lambang": "hubungkan kumpulan titik dengan kartu lambang",
  "p-pilih-diagram": "pilih diagram titik yang banyaknya n di antara tiga",
  "p-lengkapi-turus": "lengkapi turus sampai n",
  "p-titik-tersebar": "titik tersebar: tandai tiap titik lalu pilih banyaknya",
  "p-salin-pola": "salin pola contoh ke bingkai kosong",
  "p-ketuk-semua-diagram": "ketuk semua diagram yang banyaknya n",
  "p-papan-lambang": "pilih lambang untuk diagram pada papan nol sampai sepuluh",
  "p-titik-melingkar": "titik melingkar: tandai titik pertama, hitung, pilih banyaknya",
};

/* ------------------------------ Data katalog ------------------------------ */
const pic = CPA_K1B1A.picture;
cek(pic.status === "lengkap", "Picture berstatus lengkap");
cek(pic.soal.length === 10, "tepat sepuluh soal");
cek(pic.soal.map((s) => s.nomor).join() === "1,2,3,4,5,6,7,8,9,10", "nomor 1 sampai 10 berurutan");
cek(M.validasiKatalog(pic.soal, "picture").length === 0, `validator katalog: ${M.validasiKatalog(pic.soal, "picture").join(" | ")}`);
cek(new Set(pic.soal.map((s) => s.tindakan)).size === 10, "sepuluh tindakan berbeda");
cek(JSON.stringify(pic.soal.map((s) => s.tindakan).sort()) === JSON.stringify(Object.keys(KATALOG_PICTURE).sort()), "tindakan sesuai katalog Picture bagian 6 (sepuluh, tanpa lebih atau kurang)");
cek(JSON.stringify(M.daftarTindakan("picture").map((t) => t.id).sort()) === JSON.stringify(Object.keys(KATALOG_PICTURE).sort()), "daftarTindakan(picture) = sepuluh tindakan katalog");
cek(M.daftarTindakan("picture").every((t) => t.id.startsWith("p-")), "id tindakan Picture berawalan p-");
const PAKAI_N = ["p-warnai-bingkai", "p-tandai-titik", "p-pilih-diagram", "p-lengkapi-turus", "p-ketuk-semua-diagram"];
for (const s of pic.soal) {
  const g = M.periksaTeks(s.instruksi.replace(/\{\w+\}/g, "tujuh"), `soal ${s.nomor} instruksi`);
  cek(g.length === 0, g.join(" | "));
  cek(s.instruksi.trim().length > 8, `soal ${s.nomor}: instruksi terisi`);
  cek(/\{n\}/.test(s.instruksi) === PAKAI_N.includes(s.tindakan), `soal ${s.nomor}: sisipan {n} hanya pada soal yang menyebut banyaknya`);
  cek(!/\d/.test(s.instruksi), `soal ${s.nomor}: instruksi tanpa digit`);
  for (const [k, v] of Object.entries(s.param)) if (/rentang/.test(k)) cek(v[0] >= 0 && v[1] <= 10 && v[0] <= v[1], `soal ${s.nomor}: ${k} dalam nol sampai sepuluh`);
  // Picture tidak menyuruh memindahkan benda dan tidak menyebut gambar benda.
  cek(!/\b(seret|geser|pindah|apel|jeruk|keranjang|piring|nampan)\b/i.test(s.instruksi), `soal ${s.nomor}: instruksi tanpa memindahkan benda atau menyebut benda`);
}
cek(new Set(pic.soal.map((s) => s.instruksi)).size === 10, "instruksi tiap soal berbeda");
const DIIZINKAN = new Set(["Lintang", "Niko", "Tala", "Igil"]);
for (const s of pic.soal) for (const m of s.instruksi.matchAll(/(?<=[a-z,] )([A-Z][a-z]{2,})\b/g)) cek(DIIZINKAN.has(m[1]), `soal ${s.nomor}: nama "${m[1]}" tidak diizinkan`);

/* ------------------------------ Berkas komponen dan sumber ------------------------------ */
{
  const baca = (f) => (fs.existsSync(f) ? fs.readFileSync(f, "utf8") : "");
  const ekspor = baca("src/components/modul/opsi2/k1b1a-picture.tsx");
  cek(/export (function|const) PictureK1B1KA/.test(ekspor) && /TahapOpsi2/.test(ekspor) && /tahap=\{5\}/.test(ekspor) && /CPA_K1B1A\.picture/.test(ekspor) && /aksi-picture-k1b1a/.test(ekspor), "k1b1a-picture.tsx mengekspor PictureK1B1KA (tahap 5, TahapOpsi2, data Picture, aksi)");
  const aksi = baca("src/components/modul/opsi2/aksi-picture-k1b1a.tsx");
  for (const id of Object.keys(KATALOG_PICTURE)) cek(new RegExp(`daftarkanKomponen\\("${id}"`).test(aksi), `komponen ${id} didaftarkan`);
  const tanpaKomentar = (t) => t.replace(/\/\*[\s\S]*?\*\//g, "").replace(/(^|[^:])\/\/.*$/gm, "$1");
  for (const f of ["src/components/modul/opsi2/aksi-picture-k1b1a.tsx", "src/components/modul/opsi2/k1b1a-picture.tsx", "src/lib/opsi2/tindakan-picture-k1b1a.ts"]) {
    const isi = tanpaKomentar(baca(f));
    cek(isi.length > 0, `${f} ada`);
    // Tanpa emoji benda (U+1F300 sampai U+1FAFF) dan tanpa memakai gambar benda atau pemindah benda.
    cek(![...isi].some((ch) => ch.codePointAt(0) >= 0x1f300 && ch.codePointAt(0) <= 0x1faff), `${f}: tanpa emoji benda`);
    cek(!/GAMBAR_BENDA|SeretKeWadah|BendaSeret|KetukBanyak|\bBenda\b/.test(isi), `${f}: tanpa gambar benda dan tanpa pemindah benda`);
    cek(!/\\u\{1[fF][0-9a-fA-F]{3}\}/.test(isi), `${f}: tanpa kode emoji tertulis`);
    cek(!/\b(skor|score|peringkat|ranking|nilai|jumlahBenar|totalBenar|catatBenar|totalPoin|tambahPoin)\w*\s*(=|:|\(|\+\+|\+=)/i.test(isi), `${f}: tanpa kode penilaian`);
    cek(!/localStorage|sessionStorage|fetch\(|XMLHttpRequest/.test(isi), `${f}: tanpa jaringan dan penyimpanan`);
  }
}

/* ------------------------------ Pembantu independen ------------------------------ */
const SPEC = Object.fromEntries(pic.soal.map((x) => [x.tindakan, x]));
const BANYAK = new Map();
const catat = (id, v) => { if (!BANYAK.has(id)) BANYAK.set(id, new Set()); BANYAK.get(id).add(v); };
const unikId = (a) => new Set(a).size === a.length;
const jarak = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
const salahPilih = (s) => s.pilihan.filter((p) => p.id !== s.kunciPilihan).map((p) => p.id);
const himpunanSama = (a, b) => a.length === b.length && a.every((x) => b.includes(x));
const petak = (k) => Array.from({ length: k }, (_, i) => `l${i + 1}`);
/** Titik di kotak 2:1 (cx = x, cy = y / 2), jari 6,5: dalam kotak dan tidak bertumpuk. */
const titikSah = (titik) => titik.every((t) => t.x >= 6.5 && t.x <= 93.5 && t.y / 2 >= 6.5 && t.y / 2 <= 43.5) && titik.every((a, i) => titik.every((b, j) => i >= j || Math.hypot(a.x - b.x, a.y / 2 - b.y / 2) >= 13));
/** Semua string pada data hanya id atau lambang polos (tidak ada nama benda atau emoji). */
const teksData = (v, k = []) => { if (typeof v === "string") k.push(v); else if (Array.isArray(v)) v.forEach((x) => teksData(x, k)); else if (v && typeof v === "object") Object.values(v).forEach((x) => teksData(x, k)); return k; };

function periksaDasar(s, spec, benih) {
  const ket = `${spec.tindakan}@${benih}`;
  const galat = M.periksaInstansUmum(s, "picture");
  cek(galat.length === 0, `${ket}: ${galat.join(" | ")}`);
  cek(s.nomor === spec.nomor && s.tindakan === spec.tindakan && s.tahap === "picture", `${ket}: identitas soal`);
  cek(JSON.stringify(JSON.parse(JSON.stringify(s))) === JSON.stringify(s), `${ket}: instans murni data JSON`);
  cek(JSON.stringify(M.buatSoal(spec, benih)) === JSON.stringify(s), `${ket}: benih sama soal sama`);
  cek(teksData(s.data).every((x) => /^[a-z0-9-]+$/i.test(x)), `${ket}: data hanya id dan lambang polos (diagram saja)`);
  cek(![...JSON.stringify([s.data, s.layar, s.pilihan])].some((ch) => ch.codePointAt(0) >= 0x1f300 && ch.codePointAt(0) <= 0x1faff), `${ket}: tanpa emoji benda pada layar`);
  cek(!/apel|jeruk|keranjang|piring|nampan|bendera/i.test(`${s.layar} ${JSON.stringify(s.data)} ${JSON.stringify(s.pilihan ?? [])}`), `${ket}: layar tanpa nama benda`);
  cek(!/\d/.test(s.suara) && !/\d/.test(s.penjelasan), `${ket}: suara dan penjelasan tanpa digit`);
  const t = M.ambilTindakan(spec.tindakan);
  const benar = t.jawabanBenar(s);
  cek(t.periksa(s, benar).benar === true, `${ket}: jawaban benar diterima`);
  for (const asing of [null, undefined, 5, "x", [], {}, { pilih: "zzz" }, { ids: "x" }, { ids: [1, 2] }, { garis: "x" }, { garis: [1] }, { isi: "x" }, { urutan: 3 }]) {
    let h;
    try { h = t.periksa(s, asing); } catch (e) { h = null; cek(false, `${ket}: periksa melempar untuk ${JSON.stringify(asing)}: ${e.message}`); }
    if (h) cek(h.benar === false, `${ket}: jawaban asing ${JSON.stringify(asing)} harus ditolak`);
    if (h && h.petunjuk) cek(M.periksaTeks(h.petunjuk.pesan, `${ket} pesan`).length === 0 && h.petunjuk.sasaran.every((x) => typeof x === "string"), `${ket}: petunjuk sah (${h.petunjuk.pesan})`);
  }
  return { t, benar };
}
function pilihanSah(s, ket, n, jumlah) {
  cek(s.pilihan.length === jumlah && s.percobaan === s.pilihan.length, `${ket}: percobaan = jumlah pilihan`);
  cek(s.kunciPilihan === String(n) && s.kunci === n, `${ket}: kunci = banyaknya (${n})`);
  cek(s.pilihan.every((p) => p.label === p.id && KATA[Number(p.id)] === p.suara), `${ket}: label lambang, suara kata bilangan`);
  cek(s.pilihan.every((p) => Number(p.id) >= 1 && Number(p.id) <= 10), `${ket}: pilihan satu sampai sepuluh`);
  cek((s.pengecoh ?? []).length === s.pilihan.length - 1 && s.pengecoh.every((p) => p.alasan.length > 3 && p.id !== s.kunciPilihan), `${ket}: pengecoh bercatat kekeliruan`);
}

/* ------------------------------ Uji per benih ------------------------------ */
for (let benih = 1; benih <= BENIH; benih += 1) {
  /* ---- 1 warnai-bingkai dan 2 tandai-titik: pilih tepat n ---- */
  for (const id of ["p-warnai-bingkai", "p-tandai-titik"]) {
    const spec = SPEC[id];
    const s = M.buatSoal(spec, benih);
    const { t } = periksaDasar(s, spec, benih);
    const n = angkaDariKata(s.suara)[0];
    const [lo, hi] = spec.param.rentang;
    catat(id, n);
    cek(n >= lo && n <= hi && s.kunci === n && s.percobaan === 3 && !s.pilihan, `${id}@${benih}: n ${n} dalam rentang, kunci n, tiga percobaan`);
    const semua = id === "p-warnai-bingkai" ? petak(10) : s.data.titik.map((x) => x.id);
    if (id === "p-tandai-titik") cek(semua.length >= Math.min(10, n + 2) && semua.length <= 10 && unikId(semua), `${id}@${benih}: deret ${semua.length} titik cukup`);
    else cek(s.data.baris * s.data.kolom === 10, `${id}@${benih}: bingkai sepuluh`);
    for (let k = 0; k <= semua.length; k += 1) {
      const h = t.periksa(s, { ids: semua.slice(0, k) });
      cek(h.benar === (k === n), `${id}@${benih}: ${k} dipilih ${k === n ? "benar" : "salah"}`);
      if (k > n) cek(h.petunjuk.sasaran.length === k - n && h.petunjuk.sasaran.every((x) => semua.slice(0, k).includes(x)), `${id}@${benih}: petunjuk kelebihan`);
      if (k < n) cek(h.petunjuk.sasaran.length === n - k && h.petunjuk.sasaran.every((x) => !semua.slice(0, k).includes(x)), `${id}@${benih}: petunjuk kekurangan`);
    }
    cek(t.periksa(s, { ids: semua.slice(-n) }).benar === true, `${id}@${benih}: sebarang ${n} dipilih diterima`);
    cek(t.periksa(s, { ids: [semua[0], semua[0]] }).benar === false && t.periksa(s, { ids: ["x9"] }).benar === false, `${id}@${benih}: kembar atau asing ditolak`);
    cek(KATA.some((k) => s.penjelasan.includes(k)), `${id}@${benih}: penjelasan menyebut banyaknya`);
  }

  /* ---- 3 hubungkan-lambang ---- */
  {
    const spec = SPEC["p-hubungkan-lambang"];
    const s = M.buatSoal(spec, benih);
    const { t, benar } = periksaDasar(s, spec, benih);
    const { kiri, kanan } = s.data;
    const banyak = kiri.map((k) => k.titik.length);
    cek(kiri.length === 3 && kanan.length === 3 && unikId(banyak) && unikId(kiri.map((k) => k.id)) && unikId(kanan.map((k) => k.id)), `hubungkan@${benih}: tiga kumpulan berbeda banyaknya`);
    cek(banyak.every((b) => b >= 1 && b <= 10) && kiri.every((k) => titikSah(k.titik)), `hubungkan@${benih}: titik sah dan satu sampai sepuluh`);
    cek(kanan.every((k) => /^\d{1,2}$/.test(k.lambang)) && unikId(kanan.map((k) => k.lambang)), `hubungkan@${benih}: kartu lambang`);
    cek(banyak.some((a) => banyak.some((b) => Math.abs(a - b) === 1)), `hubungkan@${benih}: ada dua kumpulan berdekatan (pengecoh hitung teliti)`);
    cek(kanan.some((k, i) => Number(k.lambang) !== banyak[i]), `hubungkan@${benih}: lambang tidak sejajar dengan kumpulan`);
    catat("p-hubungkan-lambang", banyak.join("-"));
    // Hitung ulang: tiap kumpulan ke lambang yang bernilai sama dengan banyak titiknya.
    const benarKu = kiri.map((k) => [k.id, kanan.find((x) => Number(x.lambang) === k.titik.length).id]);
    cek(t.periksa(s, { garis: benarKu }).benar === true && t.periksa(s, { garis: [...benarKu].reverse() }).benar === true, `hubungkan@${benih}: pasangan benar diterima (urutan bebas)`);
    cek(JSON.stringify(benar.garis.slice().sort()) === JSON.stringify(benarKu.slice().sort()), `hubungkan@${benih}: jawabanBenar = hitung ulang`);
    // Semua susunan lain ditolak.
    const idKanan = kanan.map((k) => k.id);
    const perm = [[0, 1, 2], [0, 2, 1], [1, 0, 2], [1, 2, 0], [2, 0, 1], [2, 1, 0]];
    for (const p of perm) {
      const garis = kiri.map((k, i) => [k.id, idKanan[p[i]]]);
      const sah = garis.every(([a, b]) => benarKu.some(([x, y]) => x === a && y === b));
      const h = t.periksa(s, { garis });
      cek(h.benar === sah, `hubungkan@${benih}: susunan ${p.join("")} ${sah ? "benar" : "salah"}`);
      if (!sah) cek(h.petunjuk.sasaran.length > 0 && h.petunjuk.sasaran.every((x) => kiri.some((k) => k.id === x) && !benarKu.some(([a, b]) => a === x && garis.some(([p1, p2]) => p1 === a && p2 === b))), `hubungkan@${benih}: petunjuk menunjuk kumpulan yang keliru`);
    }
    const h2 = t.periksa(s, { garis: benarKu.slice(0, 2) });
    cek(h2.benar === false && h2.petunjuk.sasaran.length === 1 && h2.petunjuk.sasaran[0] === benarKu[2][0], `hubungkan@${benih}: baru dua garis ditolak, petunjuk ke yang belum`);
    cek(t.periksa(s, { garis: [] }).benar === false && t.periksa(s, { garis: [...benarKu, benarKu[0]] }).benar === false, `hubungkan@${benih}: kosong atau berlebih ditolak`);
    cek(t.periksa(s, { garis: [benarKu[0], benarKu[0], benarKu[1]] }).benar === false, `hubungkan@${benih}: garis kembar ditolak`);
  }

  /* ---- 4 pilih-diagram ---- */
  {
    const spec = SPEC["p-pilih-diagram"];
    const s = M.buatSoal(spec, benih);
    const { t, benar } = periksaDasar(s, spec, benih);
    const n = angkaDariKata(s.suara)[0];
    const kartu = s.data.kartu;
    const banyak = kartu.map((k) => k.titik.length);
    catat("p-pilih-diagram", n);
    cek(n >= 2 && n <= 9 && kartu.length === 3 && s.pilihan.length === 3 && s.percobaan === 3, `pilihdiagram@${benih}: tiga kartu, tiga percobaan, n ${n}`);
    cek(JSON.stringify([...banyak].sort((a, b) => a - b)) === JSON.stringify([n - 1, n, n + 1]), `pilihdiagram@${benih}: banyak titik n-1, n, n+1 (terlewat dan terhitung dua kali)`);
    cek(kartu.every((k) => titikSah(k.titik)) && unikId(kartu.map((k) => k.id)), `pilihdiagram@${benih}: titik sah`);
    const kunciKu = kartu.filter((k) => k.titik.length === n).map((k) => k.id);
    cek(kunciKu.length === 1 && s.kunciPilihan === kunciKu[0], `pilihdiagram@${benih}: kunci = kartu bertitik n`);
    cek(s.kunci === n && s.pilihan.map((p) => p.id).join() === kartu.map((k) => k.id).join() && unikId(s.pilihan.map((p) => p.label)) && s.pilihan.every((p) => !/\d/.test(p.suara) && !/\d/.test(p.label)), `pilihdiagram@${benih}: pilihan kartu unik tanpa bocoran`);
    cek(s.pengecoh.length === 2 && s.pengecoh.every((c) => c.alasan.length > 3 && c.id !== s.kunciPilihan && kartu.some((k) => k.id === c.id)), `pilihdiagram@${benih}: pengecoh bercatat`);
    cek(s.pengecoh.some((c) => /terlewat/.test(c.alasan)) && s.pengecoh.some((c) => /dua kali/.test(c.alasan)), `pilihdiagram@${benih}: pengecoh terlewat dan dua kali`);
    for (const w of salahPilih(s)) {
      const h = t.periksa(s, { pilih: w });
      const kw = kartu.find((k) => k.id === w);
      cek(h.benar === false && h.petunjuk.sasaran.length === kw.titik.length && h.petunjuk.sasaran.every((x) => x.startsWith(`${w}-t`)), `pilihdiagram@${benih}: ${w} ditolak, petunjuk titik kartu itu`);
    }
    cek(t.periksa(s, benar).benar, `pilihdiagram@${benih}: benar`);
  }

  /* ---- 5 lengkapi-turus ---- */
  {
    const spec = SPEC["p-lengkapi-turus"];
    const s = M.buatSoal(spec, benih);
    const { t } = periksaDasar(s, spec, benih);
    const n = angkaDariKata(s.suara)[0];
    const awal = s.data.awal;
    catat("p-lengkapi-turus", n);
    cek(n >= 4 && n <= 10 && s.kunci === n && s.percobaan === 3 && !s.pilihan && Number.isInteger(awal) && awal >= 1 && awal < n && s.data.ruang === 10, `turus@${benih}: n ${n}, awal ${awal}, tiga percobaan`);
    for (let k = 0; k <= 10; k += 1) {
      const h = t.periksa(s, { isi: k });
      cek(h.benar === (k === n), `turus@${benih}: isi ${k}`);
      if (k >= awal && k < n) cek(h.petunjuk.sasaran.join() === Array.from({ length: n - k }, (_, i) => `g${k + i + 1}`).join(), `turus@${benih}: petunjuk goresan berikutnya`);
      if (k > n) cek(h.petunjuk.sasaran.join() === Array.from({ length: k - n }, (_, i) => `g${n + i + 1}`).join(), `turus@${benih}: petunjuk kelebihan`);
      if (k < awal) cek(h.benar === false && h.petunjuk.sasaran.length === 0, `turus@${benih}: kurang dari goresan awal ditolak`);
    }
    cek([-1, 11, 2.5, NaN].every((x) => t.periksa(s, { isi: x }).benar === false), `turus@${benih}: isi tak sah ditolak`);
  }

  /* ---- 6 titik-tersebar dan 10 titik-melingkar: semua titik lalu pilih banyaknya ---- */
  {
    const spec = SPEC["p-titik-tersebar"];
    const s = M.buatSoal(spec, benih);
    const { t, benar } = periksaDasar(s, spec, benih);
    const titik = s.data.titik;
    const n = titik.length;
    catat("p-titik-tersebar", n);
    cek(n >= spec.param.rentang[0] && n <= spec.param.rentang[1] && unikId(titik.map((x) => x.id)), `tersebar@${benih}: n ${n} dalam rentang`);
    cek(titik.every((a, i) => titik.every((b, j) => i >= j || jarak(a, b) >= 15)) && titik.every((x) => x.x >= 0 && x.x <= 100 && x.y >= 0 && x.y <= 100), `tersebar@${benih}: titik tidak bertumpuk`);
    pilihanSah(s, `tersebar@${benih}`, n, spec.param.jumlahPilihan);
    const ids = titik.map((x) => x.id);
    cek(benar.ditandai.length === n, `tersebar@${benih}: jawabanBenar memuat semua titik`);
    for (const w of salahPilih(s)) cek(t.periksa(s, { ...benar, pilih: w }).benar === false, `tersebar@${benih}: pilihan salah ${w} ditolak`);
    cek(t.periksa(s, { ...benar, ditandai: ids.slice().reverse() }).benar === true, `tersebar@${benih}: urutan ketuk bebas`);
    const h = t.periksa(s, { ...benar, ditandai: ids.slice(0, -1) });
    cek(h.benar === false && h.petunjuk.sasaran.length === 1 && h.petunjuk.sasaran[0] === ids.at(-1), `tersebar@${benih}: titik terlewat ditolak dengan petunjuk`);
    cek(t.periksa(s, { ...benar, ditandai: [] }).benar === false && t.periksa(s, { ...benar, ditandai: [...ids.slice(0, -1), ids[0]] }).benar === false, `tersebar@${benih}: kosong atau terhitung dua kali ditolak`);
  }
  {
    const spec = SPEC["p-titik-melingkar"];
    const s = M.buatSoal(spec, benih);
    const { t, benar } = periksaDasar(s, spec, benih);
    const items = s.data.titik;
    const n = items.length;
    catat("p-titik-melingkar", n);
    cek(n >= spec.param.rentang[0] && n <= spec.param.rentang[1] && n <= 10, `melingkar@${benih}: n ${n}`);
    cek(items.every((b) => { const d = jarak(b, { x: 50, y: 50 }); return d > 30 && d < 40; }) && items.every((a, i) => items.every((b, j) => i >= j || jarak(a, b) >= 15)), `melingkar@${benih}: titik melingkar dan tidak bertumpuk`);
    pilihanSah(s, `melingkar@${benih}`, n, spec.param.jumlahPilihan);
    cek(s.pengecoh.some((p) => p.id === String(n + 1) && /awal/.test(p.alasan)) || !s.pilihan.some((p) => p.id === String(n + 1)), `melingkar@${benih}: pengecoh titik awal dua kali`);
    const ids = items.map((b) => b.id);
    for (const mulai of [0, Math.floor(n / 2), n - 1]) {
      for (const arah of [1, -1]) {
        const urutan = ids.map((_, k) => ids[(((mulai + arah * k) % n) + n) % n]);
        cek(t.periksa(s, { awal: urutan[0], urutan, pilih: s.kunciPilihan }).benar === true, `melingkar@${benih}: ${mulai}/${arah} benar`);
        cek(t.periksa(s, { awal: urutan[1], urutan, pilih: s.kunciPilihan }).benar === false, `melingkar@${benih}: awal bukan titik pertama ditolak`);
        cek(t.periksa(s, { awal: urutan[0], urutan: urutan.slice(0, -1), pilih: s.kunciPilihan }).benar === false, `melingkar@${benih}: urutan belum selesai ditolak`);
        cek(t.periksa(s, { awal: urutan[0], urutan: [...urutan.slice(0, -1), urutan[0]], pilih: s.kunciPilihan }).benar === false, `melingkar@${benih}: titik awal terhitung dua kali ditolak`);
        const lompat = urutan.slice(); [lompat[1], lompat[2]] = [lompat[2], lompat[1]];
        cek(t.periksa(s, { awal: lompat[0], urutan: lompat, pilih: s.kunciPilihan }).benar === false, `melingkar@${benih}: loncat ditolak`);
      }
    }
    for (const w of salahPilih(s)) cek(t.periksa(s, { ...benar, pilih: w }).benar === false, `melingkar@${benih}: pilihan salah ${w} ditolak`);
  }

  /* ---- 7 salin-pola ---- */
  {
    const spec = SPEC["p-salin-pola"];
    const s = M.buatSoal(spec, benih);
    const { t } = periksaDasar(s, spec, benih);
    const contoh = s.data.contoh;
    catat("p-salin-pola", contoh.join());
    cek(contoh.length >= 2 && contoh.length <= 8 && unikId(contoh) && contoh.every((x) => petak(10).includes(x)) && s.data.baris * s.data.kolom === 10, `salin@${benih}: pola ${contoh.length} petak sah`);
    cek(himpunanSama(s.kunci, contoh) && s.percobaan === 3 && !s.pilihan, `salin@${benih}: kunci = pola contoh, tiga percobaan`);
    cek(t.periksa(s, { ids: contoh.slice().reverse() }).benar === true, `salin@${benih}: urutan ketuk bebas`);
    const hilang = t.periksa(s, { ids: contoh.slice(1) });
    cek(hilang.benar === false && hilang.petunjuk.sasaran.join() === contoh[0], `salin@${benih}: petak terlewat ditolak dengan petunjuk`);
    const kosong = petak(10).find((x) => !contoh.includes(x));
    const lebih = t.periksa(s, { ids: [...contoh, kosong] });
    cek(lebih.benar === false && lebih.petunjuk.sasaran.join() === kosong, `salin@${benih}: petak berlebih ditolak dengan petunjuk`);
    const tukar = t.periksa(s, { ids: [...contoh.slice(1), kosong] });
    cek(tukar.benar === false && himpunanSama(tukar.petunjuk.sasaran, [contoh[0], kosong]), `salin@${benih}: petak tertukar, petunjuk dua petak`);
    cek(t.periksa(s, { ids: [] }).benar === false, `salin@${benih}: bingkai kosong ditolak`);
  }

  /* ---- 8 ketuk-semua-diagram ---- */
  {
    const spec = SPEC["p-ketuk-semua-diagram"];
    const s = M.buatSoal(spec, benih);
    const { t } = periksaDasar(s, spec, benih);
    const n = angkaDariKata(s.suara)[0];
    const kartu = s.data.kartu;
    const banyak = kartu.map((k) => k.titik.length);
    catat("p-ketuk-semua-diagram", n);
    cek(n >= 2 && n <= 9 && kartu.length === 6 && unikId(kartu.map((k) => k.id)) && banyak.every((b) => b >= 1 && b <= 10) && kartu.every((k) => titikSah(k.titik)), `ketuksemua@${benih}: enam kartu sah, n ${n}`);
    const kunciKu = kartu.filter((k) => k.titik.length === n).map((k) => k.id);
    cek(kunciKu.length >= 2 && kunciKu.length <= 3 && himpunanSama(s.kunci, kunciKu), `ketuksemua@${benih}: kunci = semua kartu bertitik n (lebih dari satu)`);
    cek(banyak.includes(n - 1) && banyak.includes(n + 1), `ketuksemua@${benih}: pengecoh terlewat dan dua kali ada`);
    cek(s.percobaan === 3 && !s.pilihan, `ketuksemua@${benih}: tiga percobaan`);
    cek(t.periksa(s, { ids: kunciKu.slice().reverse() }).benar === true, `ketuksemua@${benih}: urutan ketuk bebas`);
    const kurang = t.periksa(s, { ids: kunciKu.slice(1) });
    cek(kurang.benar === false && kurang.petunjuk.sasaran.join() === kunciKu[0], `ketuksemua@${benih}: satu terlewat ditolak dengan petunjuk`);
    const salah = kartu.find((k) => k.titik.length !== n).id;
    const lebih = t.periksa(s, { ids: [...kunciKu, salah] });
    cek(lebih.benar === false && lebih.petunjuk.sasaran.join() === salah, `ketuksemua@${benih}: kartu keliru ditolak dengan petunjuk`);
    cek(t.periksa(s, { ids: kartu.map((k) => k.id) }).benar === false && t.periksa(s, { ids: [] }).benar === false && t.periksa(s, { ids: ["zz"] }).benar === false, `ketuksemua@${benih}: semua, kosong, asing ditolak`);
  }

  /* ---- 9 papan-lambang ---- */
  {
    const spec = SPEC["p-papan-lambang"];
    const s = M.buatSoal(spec, benih);
    const { t } = periksaDasar(s, spec, benih);
    const terisi = s.data.terisi;
    const n = terisi.length;
    catat("p-papan-lambang", n);
    cek(n >= 0 && n <= 10 && terisi.join() === petak(n).join() && s.data.baris * s.data.kolom === 10, `papan@${benih}: diagram ${n} titik pada bingkai sepuluh`);
    cek(s.kunci === n && s.percobaan === 3 && !s.pilihan && s.bentuk === "ketuk", `papan@${benih}: kunci n, tiga percobaan tanpa pilihan`);
    cek(s.data.papan.join() === Array.from({ length: 11 }, (_, i) => String(i)).join(), `papan@${benih}: papan lambang nol sampai sepuluh`);
    cek(n === 0 ? /\bnol\b/.test(s.penjelasan) : s.penjelasan.includes(KATA[n]), `papan@${benih}: penjelasan menyebut ${n === 0 ? "nol" : "banyaknya"}`);
    for (let k = 0; k <= 10; k += 1) {
      const h = t.periksa(s, { pilih: k });
      cek(h.benar === (k === n), `papan@${benih}: lambang ${k}`);
      if (k !== n) cek(h.petunjuk.sasaran.join() === terisi.join(), `papan@${benih}: petunjuk menyalakan titik diagram`);
    }
    cek(t.periksa(s, { pilih: String(n) }).benar === false && t.periksa(s, { pilih: 11 }).benar === false && t.periksa(s, { pilih: -1 }).benar === false, `papan@${benih}: bentuk atau lambang tak sah ditolak`);
  }
}

// Keragaman: nilai berbeda muncul lintas benih (variasi, bukan satu soal tetap).
for (const [id, himpunan] of BANYAK) cek(himpunan.size >= (id === "p-salin-pola" || id === "p-hubungkan-lambang" ? 30 : id === "p-papan-lambang" ? 11 : id === "p-pilih-diagram" || id === "p-ketuk-semua-diagram" ? 8 : id === "p-lengkapi-turus" || id === "p-titik-melingkar" ? 6 : id === "p-tandai-titik" ? 8 : 7), `${id}: keragaman parameter (${[...himpunan].slice(0, 12).join(" ")})`);
cek(BANYAK.get("p-papan-lambang").has(0) && BANYAK.get("p-papan-lambang").has(10), "papan lambang memakai nol dan sepuluh");

/* ------------------------------ Bentuk dan batas Picture ------------------------------ */
{
  const sampel = pic.soal.map((sp) => M.buatSoal(sp, 11));
  cek(new Set(sampel.map((s) => s.tindakan)).size === 10, "sepuluh tindakan berbeda");
  cek(sampel.every((s) => s.tahap === "picture"), "semua soal bertahap Picture");
  cek(sampel.every((s) => !/\d/.test(s.suara) && !/\d/.test(s.penjelasan)), "suara dan penjelasan tanpa digit");
  cek(sampel.every((s) => M.pecahKalimat(`${s.suara}. ${s.penjelasan}`).every((k) => M.hitungKata(k) <= 8)), "tiap kalimat paling banyak delapan kata");
  cek(sampel.every((s) => M.periksaTeks(`${s.suara}. ${s.layar}. ${s.penjelasan}`, "t").length === 0 || /\d/.test(s.layar)), "tanpa kata terlarang");
  const bentuk = new Set(sampel.map((s) => s.bentuk));
  cek(["himpunan", "garis", "pilihan", "jumlah", "gabungan", "ketuk"].every((b) => bentuk.has(b)), `beragam bentuk jawaban (${[...bentuk].join(",")})`);
  cek(sampel.filter((s) => s.pilihan).length === 3 && sampel.filter((s) => !s.pilihan).every((s) => s.percobaan === 3), "tiga soal berpilihan (percobaan = pilihan), tujuh soal tiga percobaan");
}

// Tanpa penilaian: pemindai milik uji mesin sudah mencakup berkas Picture; di sini dipastikan berkas Picture ada di direktori yang dipindai.
cek(fs.existsSync(path.join("src/lib/opsi2", "tindakan-picture-k1b1a.ts")) && fs.existsSync(path.join("src/components/modul/opsi2", "aksi-picture-k1b1a.tsx")), "berkas Picture ada di direktori yang dipindai uji mesin");

console.log(`Uji Picture K1 Bab 1 Sub-Bab A: ${lulus} lulus, ${gagal} gagal.`);
process.exit(gagal ? 1 : 0);
