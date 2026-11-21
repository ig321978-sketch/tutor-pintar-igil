// Uji Mind-map dan Infografis rancangan sendiri Kelas 4 Bab 1 Sub-Bab A (Loket Tiket), B (Gudang Handuk), C (Papan Dermaga), pola label kosong.
// Memeriksa: jumlah label tidak dikunci empat (tiga sampai enam), judul langkah memuat tiga metode global tiap Sub-Bab, suara tanpa digit dan tanpa kata terlarang, data Infografis sesuai Story
// (3.406, 5.080, 3.46; 2.304 dan 3.204 dengan 2 peti 3 kotak 0 ikat 4 lembar; 4.358, 4.385, 4.538) dan dihitung benar, gambar sebanyak data, ukuran huruf SVG efektif paling kecil 10 px,
// tinggi gambar yang muat, tidak memakai PetaKartu/PetaLabel/InfoKartu, kontrak ekspor, perilaku (lanjut hanya setelah semua terbuka), dan render awal komponen (label berisi tanda tanya).
// Jalankan: node --no-warnings scripts/uji-visual-k4b1abc.mjs
import { readFileSync } from "node:fs";
import { register } from "node:module";

register("./loader-tsx.mjs", import.meta.url);
const React = (await import("react")).default;
const { renderToStaticMarkup } = await import("react-dom/server");

const base = new URL("../src/components/modul/", import.meta.url);
const baca = (p) => readFileSync(new URL(p, base), "utf8");
const naskah = (p) => readFileSync(new URL(`../naskah/${p}`, import.meta.url), "utf8");

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
const TERLARANG = /kelas|buku|teman|kelompok|skor|nilai|soal|tebak|kunci|latihan|senilai|ditemani/i;
const bersih = (t) => !TERLARANG.test(t);
const tanpaDigit = (t) => !/\d/.test(t);
const emojiSah = (s) => [...s].every((c) => c.codePointAt(0) <= 0x1fa95 && c.codePointAt(0) !== 0x200d);
const tanpaKomentar = (t) => t.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/[^\n]*/g, "");
/** Lebar render paling kecil yang dianggap (px) untuk gambar SVG satu layar. */
const LEBAR_RENDER = 280;

const noop = () => {};
const props = { speakGuru: noop, onLanjut: noop, teksLanjut: "LANJUT" };
const hitung = (s, re) => (s.match(re) ?? []).length;

/** Pemeriksaan berkas komponen yang sama untuk Mind-map dan Infografis. */
function cekKomponen(folder, berkas, nama, jenis, kelasSvg) {
  const s = baca(`${folder}/${berkas}`);
  const k = tanpaKomentar(s);
  cek(!/PetaKartu|PetaLabel|InfoKartu|InfografisKartu|peta-kartu|peta-label|data-kartu/.test(k), `${berkas}: tidak memakai PetaKartu, PetaLabel, InfoKartu, atau data-kartu`);
  cek(/export default function \w+\(\{ speakGuru, onLanjut, teksLanjut \}: \{ speakGuru: \(t: string\) => void; onLanjut: \(\) => void; teksLanjut: string \}\)/.test(k), `${berkas}: default export dengan props speakGuru, onLanjut, teksLanjut`);
  cek(new RegExp(`export \\{ ${nama} \\}`).test(k) && k.includes(`function ${nama}(`), `${berkas}: ekspor bernama ${nama}`);
  cek(bersih(k), `${berkas}: tanpa kata terlarang di layar`);
  cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d) && !s.includes("\r") && !s.startsWith("﻿"), `${berkas}: emoji sah, akhir baris LF, tanpa BOM`);
  const px = [...k.matchAll(/text-\[(\d+(?:\.\d+)?)px\]/g)].map((m) => Number(m[1]));
  cek(px.length > 0 && Math.min(...px) >= 10, `${berkas}: huruf HTML paling kecil ${Math.min(...px)} px (>= 10)`);
  cek(!/overflow-y|overflow-auto|overflow-scroll/.test(k), `${berkas}: tanpa gulir di dalam komponen`);
  cek(/speakGuru\(/.test(k) && /onClick=\{\(\) => ketuk\(/.test(k) || /onClick=\{\(\) => ketuk\(/.test(k), `${berkas}: label atau sel diketuk lalu dibacakan`);
  if (jenis === "peta") {
    const lebar = Number(/const LEBAR = (\d+);/.exec(k)?.[1]);
    const tinggi = Number(/const TINGGI = (\d+);/.exec(k)?.[1]);
    const fs = [...k.matchAll(/fontSize=\{(\d+(?:\.\d+)?)\}/g)].map((m) => Number(m[1]));
    cek(lebar > 0 && tinggi > 0 && fs.length > 0, `${berkas}: gambar tema berukuran dan berhuruf`);
    const efektif = Math.min(...fs) * (LEBAR_RENDER / lebar);
    cek(efektif >= 10, `${berkas}: teks gambar paling kecil ${efektif.toFixed(1)} px efektif (>= 10)`);
    cek(tinggi + 230 <= 640, `${berkas}: tinggi gambar ${tinggi} + kerangka 230 muat di 640 px`);
    cek(/aspectRatio/.test(k) && /<svg viewBox=\{`0 0 \$\{LEBAR\} \$\{TINGGI\}`\}/.test(k), `${berkas}: gambar tema SVG berperbandingan tetap`);
    cek(/selesai \? \(\s*<div className="flex justify-center">\s*<button type="button" onClick=\{onLanjut\}/.test(k), `${berkas}: tombol lanjut hanya setelah semua label terbuka`);
    cek(/\?/.test(k) && /Label kosong langkah/.test(k), `${berkas}: label kosong bertanda tanya`);
    cek(kelasSvg.every((r) => r.test(k)), `${berkas}: gambar memuat bagian cerita yang diminta`);
  } else {
    cek(/BERIKUTNYA/.test(k) && /Kembali/.test(k) && /kartu === 1 && selesai1/.test(k) && /kartu === 2 && selesai2/.test(k) && /onClick=\{onLanjut\}/.test(k), `${berkas}: dua kartu, BERIKUTNYA hanya setelah kartu satu lengkap, lanjut hanya setelah kartu dua lengkap`);
    cek(/Isi kosong/.test(k) && /lm-muncul/.test(k), `${berkas}: sel kosong bertanda tanya lalu muncul`);
    cek(!/\bkartu === 3\b/.test(k) && !/Suara|Kanvas/.test(k), `${berkas}: digital saja tanpa Suara dan Kanvas`);
    cek(kelasSvg.every((r) => r.test(k)), `${berkas}: gambar atau papan memuat bagian cerita yang diminta`);
  }
  return k;
}

/** Hitungan tanda tanya pada render awal: setiap label atau sel tertutup menampilkan "?" dan tidak ada tombol lanjut. */
async function renderAwal(path, komponen) {
  const mod = await import(new URL(path, base).href);
  const C = mod.default;
  cek(typeof C === "function" && mod[komponen] === C, `${path}: ekspor bawaan sama dengan ekspor bernama ${komponen}`);
  const html = renderToStaticMarkup(React.createElement(C, props));
  return html;
}
const tanya = (html) => hitung(html, /<span class="min-w-0 break-words">\?<\/span>/g);

/* =========================================================== A: Loket Tiket =========================================================== */
{
  const P = await import(new URL("tiket-k4b1a/data-peta.ts", base).href);
  const I = await import(new URL("tiket-k4b1a/data-info.ts", base).href);
  const EJ = await import(new URL("eja-k4b1.ts", base).href);
  const L = P.LANGKAH_LOKET;
  cek(L.length >= 3 && L.length <= 6, `A peta: jumlah label ${L.length} antara tiga dan enam (tidak dikunci empat)`);
  cek(new Set(L.map((l) => l.judul)).size === L.length && L.every((l) => l.judul.length >= 8 && l.judul.length <= 30 && tanpaDigit(l.judul) && bersih(l.judul)), "A peta: judul unik, pendek, tanpa digit dan kata terlarang");
  cek(L.every((l) => tanpaDigit(l.arti) && bersih(l.arti) && l.arti.length > 40), "A peta: suara tanpa digit dan kata terlarang");
  const gab = L.map((l) => l.judul + " " + l.arti).join(" ");
  for (const m of ["Kartu Angka", "Baca Per Bagian", "Periksa Nol", "ribuan", "satuan", "ucapan" === "x" ? "" : "kiri", "nol"]) cek(m === "" || gab.includes(m), `A peta: memuat ${m}`);
  cek(tanpaDigit(P.PETUNJUK_PETA_LOKET + P.SELESAI_PETA_LOKET) && bersih(P.PETUNJUK_PETA_LOKET + P.SELESAI_PETA_LOKET) && emojiSah(P.IKON_JUDUL_PETA_LOKET), "A peta: petunjuk dan pesan selesai bersih");

  // Infografis: data Story A
  sama([I.TIKET_PERTAMA, I.TIKET_KEDUA, I.TULISAN_SALAH], [3406, 5080, "3.46"], "A info: angka Story (3.406, 5.080, tulisan salah 3.46)");
  cek(I.TIKET_INFO.length === 3 && I.TIKET_INFO.map((t) => t.nomor).join() === "3.406,5.080,3.46" && I.TIKET_INFO.map((t) => t.salah).join() === "false,false,true", "A info: tiga tiket, hanya tulisan Satria yang keliru");
  sama(I.TIKET_INFO[0].bacaan.tampil, EJ.kataBilK4B1(3406), "A info: bacaan 3.406");
  sama(I.TIKET_INFO[1].bacaan.tampil, EJ.kataBilK4B1(5080), "A info: bacaan 5.080");
  cek(EJ.kataBilK4B1(3406) === "tiga ribu empat ratus enam" && EJ.kataBilK4B1(5080) === "lima ribu delapan puluh", "A info: kata bilangan sama dengan naskah");
  cek(I.TIKET_INFO[0].nol.tampil.includes("puluhan") && I.TIKET_INFO[1].nol.tampil.includes("ratusan") && I.TIKET_INFO[1].nol.tampil.includes("satuan"), "A info: nol 3.406 di puluhan, nol 5.080 di ratusan dan satuan");
  cek(String(I.TIKET_PERTAMA).replace(/0/g, "").length === 3 && I.TULISAN_SALAH.replace(".", "").length === 3, "A info: tulisan keliru kurang satu angka");
  cek(I.BAGAN_INFO.length === 2, "A info: dua bagan tempat");
  for (const b of I.BAGAN_INFO) {
    cek(b.kolom.length === 4 && b.kolom.map((k) => k.tempat).join() === "ribuan,ratusan,puluhan,satuan" && b.kolom.map((k) => k.angka).join("") === String(b.bilangan), `A info: bagan ${b.bilangan} angkanya sesuai bilangan`);
    cek(b.kolom.every((k) => (k.angka === 0 ? k.baca.tampil === "nol tidak dibaca" : k.baca.tampil.length > 3)), `A info: bagan ${b.bilangan} nol tidak dibaca`);
    const rangkai = b.kolom.filter((k) => k.angka !== 0).map((k) => k.baca.tampil).join(" ");
    sama(rangkai, EJ.kataBilK4B1(b.bilangan), `A info: gabungan bacaan bagan ${b.bilangan} sama dengan kata bilangan`);
  }
  const semua = [...I.TIKET_INFO.flatMap((t) => [t.bacaan, t.nol]), ...I.BAGAN_INFO.flatMap((b) => b.kolom.map((k) => k.baca))];
  cek(new Set(semua.map((s) => s.id)).size === semua.length && semua.length === 14, "A info: 14 sel tertutup dengan id unik");
  cek(semua.every((s) => tanpaDigit(s.suara) && bersih(s.suara) && bersih(s.tampil) && s.suara.length > 12), "A info: suara sel tanpa digit dan tanpa kata terlarang");
  cek(tanpaDigit(I.PETUNJUK1_INFO_TIKET + I.PETUNJUK2_INFO_TIKET + I.SELESAI1_INFO_TIKET + I.SELESAI2_INFO_TIKET) && bersih(I.ACUAN_BAGAN + I.PETUNJUK1_INFO_TIKET + I.PETUNJUK2_INFO_TIKET), "A info: petunjuk tanpa digit");
  cek(I.titik(3406) === "3.406" && I.titik(5080) === "5.080", "A info: titik ribuan");
  const st = naskah("story-naskah-k4b1a.md");
  cek(["3.406", "5.080", "3.46", "ribuan", "puluhan"].every((x) => st.includes(x)), "A: angka dan tempat ada di naskah Story A");

  cekKomponen("tiket-k4b1a", "LoketTiket.tsx", "LoketTiketK4B1", "peta", [/3\.406/, /5\.080/, /3\.46/, /LOKET TIKET/, /rumbia/, /DIGIT_KARTU = \[3, 4, 0, 6\]/]);
  cekKomponen("tiket-k4b1a", "DaftarTiket.tsx", "DaftarTiketK4B1", "info", [/TIKET_INFO\.map/, /BAGAN_INFO\.map/, /data-nomor/]);
  const hp = await renderAwal("tiket-k4b1a/LoketTiket.tsx", "LoketTiketK4B1");
  cek(tanya(hp) === L.length && !hp.includes("LANJUT") && hitung(hp, /<button/g) === L.length + 1, `A peta render: ${L.length} label kosong, tanpa tombol lanjut`);
  cek(/viewBox="0 0 300 372"/.test(hp) && hitung(hp, /<text /g) >= 12, "A peta render: gambar loket dengan teks");
  const hi = await renderAwal("tiket-k4b1a/DaftarTiket.tsx", "DaftarTiketK4B1");
  cek(tanya(hi) === 6 && !hi.includes("BERIKUTNYA") && /3\.406/.test(hi) && /5\.080/.test(hi) && /3\.46/.test(hi), "A info render: kartu satu enam sel kosong, nomor tiket tampak, tanpa tombol lanjut");
}

/* =========================================================== B: Gudang Handuk =========================================================== */
{
  const P = await import(new URL("handuk-k4b1b/data-peta.ts", base).href);
  const I = await import(new URL("handuk-k4b1b/data-info.ts", base).href);
  const EJ = await import(new URL("eja-k4b1.ts", base).href);
  const L = P.LANGKAH_GUDANG;
  cek(L.length >= 3 && L.length <= 6, `B peta: jumlah label ${L.length} antara tiga dan enam`);
  cek(new Set(L.map((l) => l.judul)).size === L.length && L.every((l) => l.judul.length >= 8 && l.judul.length <= 30 && tanpaDigit(l.judul) && bersih(l.judul)), "B peta: judul unik, pendek, tanpa digit dan kata terlarang");
  cek(L.every((l) => tanpaDigit(l.arti) && bersih(l.arti) && l.arti.length > 40), "B peta: suara tanpa digit dan kata terlarang");
  const gab = L.map((l) => l.judul + " " + l.arti).join(" ");
  for (const m of ["Balok Cacah", "Bagan Tempat", "Tukar Tempat", "sepuluh", "Nol menjaga tempat", "tiga ratus"]) cek(gab.includes(m), `B peta: memuat ${m}`);
  cek(tanpaDigit(P.PETUNJUK_PETA_GUDANG + P.SELESAI_PETA_GUDANG) && bersih(P.PETUNJUK_PETA_GUDANG + P.SELESAI_PETA_GUDANG) && emojiSah(P.IKON_JUDUL_PETA_GUDANG), "B peta: petunjuk dan pesan selesai bersih");

  sama(I.JENIS_GUDANG.map((j) => j.jumlah), [2, 3, 0, 4], "B info: isi gudang Story (2 peti, 3 kotak, 0 ikat, 4 lembar)");
  sama(I.JENIS_GUDANG.map((j) => j.isi), [1000, 100, 10, 1], "B info: isi satu peti 1.000, kotak 100, ikat 10, lembar 1 (tiap tempat kali sepuluh)");
  sama(I.TOTAL_GUDANG, 2304, "B info: seluruh handuk 2.304");
  sama(I.KARTU_JENIS.map((k) => k.tempat), ["ribuan", "ratusan", "puluhan", "satuan"], "B info: tempat tiap jenis");
  sama(I.KARTU_JENIS.map((k) => k.lembarSel.tampil), ["2.000 lembar", "300 lembar", "0 lembar", "4 lembar"], "B info: isi lembar tiap jenis dihitung");
  cek(I.KARTU_JENIS.every((k) => tanpaDigit(k.tempatSel.suara) && tanpaDigit(k.lembarSel.suara) && bersih(k.tempatSel.suara + k.lembarSel.suara)), "B info: suara kartu jenis tanpa digit");
  sama(I.SEL_TOTAL_GUDANG.suara, `Seluruh handuk di gudang ada ${EJ.kataBilK4B1(2304)} lembar.`, "B info: suara jumlah seluruhnya");
  cek(I.BAGAN_GUDANG.length === 2 && I.BAGAN_GUDANG[0].bilangan === 2304 && I.BAGAN_GUDANG[1].bilangan === 3204, "B info: bagan 2.304 dan setelah tukar 3.204");
  sama(I.BAGAN_GUDANG.map((b) => b.digit.join("")), ["2304", "3204"], "B info: angka dua dan tiga bertukar tempat, angka lain tetap");
  sama(I.BAGAN_GUDANG.map((b) => [b.artiDua.tampil, b.artiTiga.tampil]), [["2.000", "300"], ["200", "3.000"]], "B info: arti angka 2 dan 3 sebelum dan sesudah tukar");
  sama(I.BAGAN_GUDANG.map((b) => b.baca.tampil), ["dua ribu tiga ratus empat", "tiga ribu dua ratus empat"], "B info: bacaan");
  const semua = [...I.KARTU_JENIS.flatMap((k) => [k.tempatSel, k.lembarSel]), I.SEL_TOTAL_GUDANG, ...I.BAGAN_GUDANG.flatMap((b) => [b.artiDua, b.artiTiga, b.baca])];
  cek(new Set(semua.map((s) => s.id)).size === semua.length && semua.length === 15, "B info: 15 sel tertutup dengan id unik");
  cek(semua.every((s) => tanpaDigit(s.suara) && bersih(s.suara) && bersih(s.tampil)), "B info: suara sel tanpa digit dan kata terlarang");
  cek(tanpaDigit(I.PETUNJUK1_INFO_GUDANG + I.PETUNJUK2_INFO_GUDANG + I.SELESAI1_INFO_GUDANG + I.SELESAI2_INFO_GUDANG) && bersih(I.ACUAN_GUDANG), "B info: petunjuk tanpa digit");
  const st = naskah("story-naskah-k4b1b.md");
  cek(["2.304", "3.204", "peti", "kotak", "ikat", "lembar"].every((x) => st.includes(x)), "B: angka dan benda ada di naskah Story B");

  const kp = cekKomponen("handuk-k4b1b", "GudangHanduk.tsx", "GudangHandukK4B1", "peta", [/GUDANG HANDUK/, /tidak ada ikat/, /\[0, 1\]\.map/, /\[0, 1, 2\]\.map/, /\[0, 1, 2, 3\]\.map/, /2\.304 → 3\.204/]);
  cek(hitung(kp, /\[0, 1\]\.map/g) === 1 && hitung(kp, /\[0, 1, 2\]\.map/g) === 1 && hitung(kp, /\[0, 1, 2, 3\]\.map/g) === 1, "B peta: gambar peti 2, kotak 3, lembar 4 sesuai data (tidak ada ikat: kotak putus-putus)");
  cekKomponen("handuk-k4b1b", "DaftarHanduk.tsx", "DaftarHandukK4B1", "info", [/Array\.from\(\{ length: n \}/, /KARTU_JENIS\.map/, /BAGAN_GUDANG\.map/, /ring-4/]);
  const hp = await renderAwal("handuk-k4b1b/GudangHanduk.tsx", "GudangHandukK4B1");
  cek(tanya(hp) === L.length && !hp.includes("LANJUT") && hitung(hp, /<button/g) === L.length + 1, `B peta render: ${L.length} label kosong, tanpa tombol lanjut`);
  cek(/viewBox="0 0 300 376"/.test(hp) && hitung(hp, /<rect /g) >= 25, "B peta render: gambar rak gudang");
  const hi = await renderAwal("handuk-k4b1b/DaftarHanduk.tsx", "DaftarHandukK4B1");
  cek(tanya(hi) === 9 && !hi.includes("BERIKUTNYA"), "B info render: kartu satu sembilan sel kosong, tanpa tombol lanjut");
  cek(hitung(hi, /data-jenis="peti" data-jumlah="2"|data-jumlah="2" data-jenis="peti"/g) === 1 && hitung(hi, /data-jumlah="3" data-jenis="kotak"/g) === 1 && hitung(hi, /data-jumlah="4" data-jenis="lembar"/g) === 1 && hitung(hi, /data-jumlah="0" data-jenis="ikat"/g) === 1, "B info render: jumlah gambar tiap jenis sesuai data");
  cek(hitung(hi, /<rect x="\d+" y="4" width="42" height="30"/g) === 2 && hitung(hi, /<rect x="\d+" y="8" width="34" height="26"/g) === 3 && hitung(hi, /<rect x="\d+" y="14" width="24" height="18"/g) === 4, "B info render: 2 peti, 3 kotak, 4 lembar tergambar sebanyak datanya");
}

/* =========================================================== C: Papan Dermaga =========================================================== */
{
  const P = await import(new URL("dermaga-k4b1c/data-peta.ts", base).href);
  const I = await import(new URL("dermaga-k4b1c/data-info.ts", base).href);
  const EJ = await import(new URL("eja-k4b1.ts", base).href);
  const L = P.LANGKAH_DERMAGA;
  cek(L.length >= 3 && L.length <= 6, `C peta: jumlah label ${L.length} antara tiga dan enam`);
  cek(new Set(L.map((l) => l.judul)).size === L.length && L.every((l) => l.judul.length >= 8 && l.judul.length <= 30 && tanpaDigit(l.judul) && bersih(l.judul)), "C peta: judul unik, pendek, tanpa digit dan kata terlarang");
  cek(L.every((l) => tanpaDigit(l.arti) && bersih(l.arti) && l.arti.length > 40), "C peta: suara tanpa digit dan kata terlarang");
  const gab = L.map((l) => l.judul + " " + l.arti).join(" ");
  for (const m of ["Banding dari Kiri", "Garis Bilangan", "Urut Kartu", "kurang dari", "lebih dari", "sama dengan", "ke kanan"]) cek(gab.toLowerCase().includes(m.toLowerCase()), `C peta: memuat ${m}`);
  cek(tanpaDigit(P.PETUNJUK_PETA_DERMAGA + P.SELESAI_PETA_DERMAGA) && bersih(P.PETUNJUK_PETA_DERMAGA + P.SELESAI_PETA_DERMAGA) && emojiSah(P.IKON_JUDUL_PETA_DERMAGA), "C peta: petunjuk dan pesan selesai bersih");

  sama(I.PANTAI.map((p) => [p.nama, p.jumlah]), [["Barat", 4358], ["Timur", 4385], ["Selatan", 4538]], "C info: pengunjung tiga pantai Story");
  cek(I.PANTAI.every((p, i) => i === 0 || p.jumlah > I.PANTAI[i - 1].jumlah) && I.PANTAI.every((p) => emojiSah(p.ikon)), "C info: pantai urut dari yang paling sedikit, emoji sah");
  sama(I.bandingkan(4358, 4385), { indeks: 2, tempat: "puluhan", angkaA: 5, angkaB: 8, tanda: "<" }, "C info: 4.358 dan 4.385 beda di puluhan");
  sama(I.bandingkan(4385, 4538), { indeks: 1, tempat: "ratusan", angkaA: 3, angkaB: 5, tanda: "<" }, "C info: 4.385 dan 4.538 beda di ratusan");
  sama(I.bandingkan(4538, 4385).tanda, ">", "C info: kebalikan memberi lebih dari");
  sama(I.bandingkan(4358, 4358).tanda, "=", "C info: sama dengan");
  sama(I.KOLOM_PANTAI.map((k) => k.beda.tampil), ["puluhan 5 < 8", "ratusan 3 < 5", "ratusan 5 > 3"], "C info: tempat pembeda tiap pantai");
  sama(I.KOLOM_PANTAI.map((k) => k.urutan.tampil), ["paling sedikit", "di tengah", "paling banyak"], "C info: urutan");
  cek(I.KOLOM_PANTAI.every((k, i) => i === 0 || k.tinggi > I.KOLOM_PANTAI[i - 1].tinggi), "C info: balok naik mengikuti urutan");
  sama(I.TANDA_GARIS.map((t) => t.tanda), ["<", "<"], "C info: dua tanda di antara titik");
  sama([I.URUT_NAIK.tampil, I.URUT_TURUN.tampil], ["4.358, 4.385, 4.538", "4.538, 4.385, 4.358"], "C info: urutan kecil ke besar dan sebaliknya");
  cek(I.URUT_NAIK.suara.includes(EJ.kataBilK4B1(4358)) && I.URUT_TURUN.suara.includes(EJ.kataBilK4B1(4538)), "C info: suara urutan dieja");
  const semua = [...I.KOLOM_PANTAI.flatMap((k) => [k.urutan, k.beda]), ...I.TANDA_GARIS.map((t) => t.sel), I.URUT_NAIK, I.URUT_TURUN];
  cek(new Set(semua.map((s) => s.id)).size === semua.length && semua.length === 10, "C info: 10 sel tertutup dengan id unik");
  cek(semua.every((s) => tanpaDigit(s.suara) && bersih(s.suara) && bersih(s.tampil)), "C info: suara sel tanpa digit dan kata terlarang");
  cek(tanpaDigit(I.PETUNJUK1_INFO_DERMAGA + I.PETUNJUK2_INFO_DERMAGA + I.SELESAI1_INFO_DERMAGA + I.SELESAI2_INFO_DERMAGA) && bersih(I.ACUAN_GARIS), "C info: petunjuk tanpa digit");
  const st = naskah("story-naskah-k4b1c.md");
  cek(["4.358", "4.385", "4.538", "Barat", "Timur", "Selatan"].every((x) => st.includes(x)), "C: angka dan pantai ada di naskah Story C");

  cekKomponen("dermaga-k4b1c", "PapanDermaga.tsx", "PapanDermagaK4B1", "peta", [/4\.358/, /4\.385/, /4=4/, /3=3/, /5<8/, /"<"/, /">"/, /"="/, /pelampung|r: 9/, /4\.538/]);
  cekKomponen("dermaga-k4b1c", "DaftarDermaga.tsx", "DaftarDermagaK4B1", "info", [/KOLOM_PANTAI\.map/, /TANDA_GARIS/, /URUT_NAIK/, /data-jumlah/]);
  const hp = await renderAwal("dermaga-k4b1c/PapanDermaga.tsx", "PapanDermagaK4B1");
  cek(tanya(hp) === L.length && !hp.includes("LANJUT") && hitung(hp, /<button/g) === L.length + 1, `C peta render: ${L.length} label kosong, tanpa tombol lanjut`);
  cek(/viewBox="0 0 300 352"/.test(hp) && hitung(hp, /<text /g) >= 15, "C peta render: gambar dermaga dengan teks");
  const hi = await renderAwal("dermaga-k4b1c/DaftarDermaga.tsx", "DaftarDermagaK4B1");
  cek(tanya(hi) === 6 && !hi.includes("BERIKUTNYA") && /4\.358/.test(hi) && /4\.385/.test(hi) && /4\.538/.test(hi), "C info render: kartu satu enam sel kosong, tiga pantai tampak, tanpa tombol lanjut");
}

/* ---------- Ketiganya berbeda rupa dan komponen lama tidak tersisa ---------- */
{
  const ps = ["tiket-k4b1a/LoketTiket.tsx", "handuk-k4b1b/GudangHanduk.tsx", "dermaga-k4b1c/PapanDermaga.tsx"].map((p) => baca(p));
  const lebarTinggi = ps.map((s) => `${/const LEBAR = (\d+)/.exec(s)[1]}x${/const TINGGI = (\d+)/.exec(s)[1]}`);
  cek(new Set(lebarTinggi).size === 3, `rupa gambar tema berbeda (${lebarTinggi.join(", ")})`);
  const info = ["tiket-k4b1a/DaftarTiket.tsx", "handuk-k4b1b/DaftarHanduk.tsx", "dermaga-k4b1c/DaftarDermaga.tsx"].map((p) => baca(p));
  cek(new Set(info.map((s) => /data-uji="([^"]+)"/.exec(s)[1])).size === 3 && info.every((s) => !/BARIS_INFO|KOLOM_INFO/.test(s)), "Infografis tiga Sub-Bab bukan satu tabel yang sama");
}

/* ---------- Ukuran: tinggi dan kata utuh (ukur peramban 344x760: area gulir 648, target <= 640) ---------- */
{
  const tinggiMaks = { "tiket-k4b1a/LoketTiket.tsx": 372, "handuk-k4b1b/GudangHanduk.tsx": 376, "dermaga-k4b1c/PapanDermaga.tsx": 352 };
  for (const [p, m] of Object.entries(tinggiMaks)) cek(Number(/const TINGGI = (\d+)/.exec(baca(p))[1]) <= m, `${p}: tinggi gambar paling banyak ${m} (agar total <= 640 px)`);
  const PA = await import(new URL("tiket-k4b1a/data-peta.ts", base).href);
  const PB = await import(new URL("handuk-k4b1b/data-peta.ts", base).href);
  const PC = await import(new URL("dermaga-k4b1c/data-peta.ts", base).href);
  const IA = await import(new URL("tiket-k4b1a/data-info.ts", base).href);
  const IB = await import(new URL("handuk-k4b1b/data-info.ts", base).href);
  const IC = await import(new URL("dermaga-k4b1c/data-info.ts", base).href);
  const pet = { PA: PA.PETUNJUK_PETA_LOKET, PB: PB.PETUNJUK_PETA_GUDANG, PC: PC.PETUNJUK_PETA_DERMAGA, A1: IA.PETUNJUK1_INFO_TIKET, A2: IA.PETUNJUK2_INFO_TIKET, B1: IB.PETUNJUK1_INFO_GUDANG, B2: IB.PETUNJUK2_INFO_GUDANG, C1: IC.PETUNJUK1_INFO_DERMAGA, C2: IC.PETUNJUK2_INFO_DERMAGA };
  for (const [n, t] of Object.entries(pet)) cek(t.length <= 66, `petunjuk ${n} paling banyak dua baris (${t.length} huruf)`);
  for (const p of ["tiket-k4b1a/DaftarTiket.tsx", "handuk-k4b1b/DaftarHanduk.tsx", "dermaga-k4b1c/DaftarDermaga.tsx"]) cek(!/Kartu \{kartu\} dari 2/.test(baca(p)), `${p}: tanpa baris titik kartu (hemat tinggi)`);
  /* Kata terpanjang harus muat pada lebar sel terkecil (kerangka 296 px, huruf tebal sekitar 0,6 em, tracking-tight 0,97). */
  const terpanjang = (teks) => Math.max(...teks.flatMap((t) => t.split(/\s+/)).map((w) => w.length));
  const kata = (teks, fs, lebar, nama) => cek(terpanjang(teks) * fs * 0.6 * 0.97 <= lebar, `kata utuh ${nama}: kata terpanjang ${terpanjang(teks)} huruf muat di ${lebar} px (huruf ${fs})`);
  kata(IA.TIKET_INFO.flatMap((t) => [t.bacaan.tampil, t.nol.tampil]), 11, 74, "A kartu 1");
  kata(IA.BAGAN_INFO.flatMap((b) => b.kolom.map((k) => k.baca.tampil)), 11, 54, "A kartu 2");
  kata(IB.KARTU_JENIS.flatMap((k) => [k.tempatSel.tampil, k.lembarSel.tampil]), 11, 50, "B kartu 1");
  kata(IB.BAGAN_GUDANG.flatMap((b) => [b.artiDua.tampil, b.artiTiga.tampil]), 11, 56, "B kartu 2 arti");
  kata(IB.BAGAN_GUDANG.map((b) => b.baca.tampil), 11, 100, "B kartu 2 bacaan");
  kata(IC.KOLOM_PANTAI.flatMap((k) => [k.urutan.tampil, k.beda.tampil]), 11, 74, "C kartu 1");
  kata([IC.URUT_NAIK.tampil, IC.URUT_TURUN.tampil], 11, 120, "C urutan");
}

console.log(`\nUji visual K4 Bab 1 A-C:${lulus} lulus, ${gagal} gagal`);
process.exit(gagal === 0 ? 0 : 1);
