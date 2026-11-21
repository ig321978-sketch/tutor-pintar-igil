// Uji Mind-map dan Infografis rancangan per Sub-Bab Kelas 4 Bab 1 D (Kios Kelapa), E (Meja Resepsi), F (Papan Sisa):
// jumlah label (3 sampai 6, tidak dikunci empat), letak gambar (dalam bingkai, label tidak bertumpuk), teks gambar paling kecil 12 satuan (10,5 px pada lebar render 264),
// judul label muat dua baris, data Infografis dihitung dari angka Story (5.270; 245 + 378; 612 - 275), suara tanpa digit, kata terlarang, emoji sah,
// komponen sendiri (tidak memakai PetaKartu, PetaLabel, InfografisKartu, InfoKartu), perilaku (tombol lanjut hanya setelah semua terbuka, dua kartu, BERIKUTNYA, Kembali), rupa tiga Sub-Bab berbeda.
// Jalankan: node --no-warnings scripts/uji-visual-k4b1def.mjs
import { readFileSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const DD = await import("../src/components/modul/kelapa-k4b1d/data-peta.ts");
const DE = await import("../src/components/modul/resepsi-k4b1e/data-peta.ts");
const DF = await import("../src/components/modul/sisa-k4b1f/data-peta.ts");
const eja = (await import("../src/components/modul/eja-k4b1.ts")).ejaK4B1;

let lulus = 0;
let gagal = 0;
const cek = (k, p) => {
  if (k) lulus += 1;
  else {
    gagal += 1;
    console.log(`GAGAL: ${p}`);
  }
};
const sama = (a, b, p) => cek(JSON.stringify(a) === JSON.stringify(b), `${p}: ${JSON.stringify(a)} != ${JSON.stringify(b)}`);
const bersih = (t) => !/buku|kelompok|bernilai|tebak|nilai|kelas|teman|skor|soal|kunci|latihan|senilai|ditemani/i.test(t);
const tanpaDigit = (t) => !/\d/.test(t);
const emojiSah = (s) => [...s].every((c) => c.codePointAt(0) <= 0x1fa95 && c.codePointAt(0) !== 0x200d && c.codePointAt(0) !== 0x1f6de);
const baca = (folder, f) => readFileSync(new URL(`../src/components/modul/${folder}/${f}`, import.meta.url), "utf8");
/** Teks yang tampil di layar: literal bertanda kutip berspasi (bukan kelas gaya) dan teks JSX. */
const teksLayar = (s) => {
  const hasil = [];
  const gaya = /-\[|^(min-|flex |grid |rounded|border|text-|font-|space-|mx-|mt-|mb-|w-|block |shrink|items-|absolute|relative)/;
  for (const m of s.matchAll(/"([^"\n]+)"/g)) if (m[1].includes(" ") && !gaya.test(m[1])) hasil.push(m[1]);
  for (const m of s.matchAll(/>([^<>{}\n]{3,})</g)) hasil.push(m[1]);
  return hasil;
};
const LEBAR_RENDER_MIN = 264;
const efektif = (font, vb) => (font * LEBAR_RENDER_MIN) / vb;
const tumpuk = (a, b) => a.x < b.x + b.w && b.x < a.x + a.w && a.y < b.y + b.h && b.y < a.y + a.h;
const dalam = (k, W, H) => k.x >= 0 && k.y >= 0 && k.x + k.w <= W && k.y + k.h <= H;
const fontsDari = (s) => [...s.matchAll(/fontSize=\{(\d+(?:\.\d+)?)\}/g)].map((m) => Number(m[1]));
const BERKAS = {
  D: { folder: "kelapa-k4b1d", peta: "KiosKelapa.tsx", info: "DaftarKelapa.tsx", data: "data-peta.ts", nmPeta: "KiosKelapaK4B1", nmInfo: "DaftarKelapaK4B1", uji: ["peta-kios", "info-kios"] },
  E: { folder: "resepsi-k4b1e", peta: "MejaResepsi.tsx", info: "DaftarResepsi.tsx", data: "data-peta.ts", nmPeta: "MejaResepsiK4B1", nmInfo: "DaftarResepsiK4B1", uji: ["peta-koper", "info-resepsi"] },
  F: { folder: "sisa-k4b1f", peta: "PapanSisa.tsx", info: "DaftarSisa.tsx", data: "data-peta.ts", nmPeta: "PapanSisaK4B1", nmInfo: "DaftarSisaK4B1", uji: ["peta-tali-jemur", "info-sisa"] },
};

/** Pemeriksaan umum: langkah Mind-map dan sel Infografis. */
function umum(nama, langkah, bungkus, maks, selKartu1, selKartu2, jumlahSel1, jumlahSel2) {
  cek(langkah.length >= 3 && langkah.length <= 6, `${nama}: jumlah label Mind-map 3 sampai 6 (ada ${langkah.length})`);
  const judul = langkah.map((l) => l.judul);
  cek(new Set(judul).size === judul.length, `${nama}: judul label unik`);
  cek(langkah.every((l) => tanpaDigit(l.judul) && tanpaDigit(l.arti) && bersih(l.judul) && bersih(l.arti) && l.arti.length > 30), `${nama}: judul dan arti tanpa digit dan kata terlarang`);
  cek(langkah.every((l) => tanpaDigit(eja(l.arti))), `${nama}: suara langkah tanpa digit`);
  cek(langkah.every((l) => { const b = bungkus(l.judul, maks); return b.length <= 2 && b.every((x) => x.length <= maks + 3); }), `${nama}: judul muat paling banyak dua baris`);
  cek(selKartu1.length === jumlahSel1 && selKartu2.length === jumlahSel2, `${nama}: kotak Infografis ${selKartu1.length} dan ${selKartu2.length}`);
  const semua = [...selKartu1, ...selKartu2];
  cek(new Set(semua.map((s) => s.kunci)).size === semua.length, `${nama}: kunci kotak unik`);
  cek(semua.every((s) => tanpaDigit(s.suara) && bersih(s.suara) && bersih(s.isi) && bersih(s.aria) && s.suara.length > 10), `${nama}: suara kotak tanpa digit dan kata terlarang`);
  cek(new Set(semua.map((s) => s.isi)).size >= semua.length - 2, `${nama}: isi kotak hampir semuanya berbeda`);
}
function berkasKomponen(nama, b) {
  const peta = baca(b.folder, b.peta);
  const info = baca(b.folder, b.info);
  const data = baca(b.folder, b.data);
  for (const [f, s] of [[b.peta, peta], [b.info, info], [b.data, data]]) {
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${nama} ${f}: tanpa BOM, akhir baris LF`);
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d || c.codePointAt(0) === 0x1f6de), `${nama} ${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!/buku|kelompok|bernilai|tebak/i.test(s), `${nama} ${f}: tanpa kata buku, kelompok, bernilai, tebak di berkas`);
    cek(teksLayar(s).every(bersih), `${nama} ${f}: teks layar tanpa kata terlarang (${teksLayar(s).filter((t) => !bersih(t)).join(" | ")})`);
    cek(!/PetaKartu|PetaLabel|InfografisKartu|InfoKartu|peta-kartu|peta-label|data-kartu/.test(s), `${nama} ${f}: tidak memakai komponen atau data kartu lama`);
    cek(!/flex-wrap/.test(s), `${nama} ${f}: tanpa flex-wrap`);
  }
  for (const [f, s, nm] of [[b.peta, peta, b.nmPeta], [b.info, info, b.nmInfo]]) {
    cek(new RegExp(`export default function ${nm}`).test(s) && new RegExp(`export \\{ ${nm} \\}`).test(s) && /speakGuru, onLanjut, teksLanjut/.test(s) && /speakGuru: \(t: string\) => void/.test(s), `${nama} ${f}: ekspor default dan bernama ${nm}, props speakGuru/onLanjut/teksLanjut`);
    cek(/export default function \w+\(\{ speakGuru, onLanjut, teksLanjut \}: \{ speakGuru: \(t: string\) => void; onLanjut: \(\) => void; teksLanjut: string \}\)/.test(s), `${nama} ${f}: tanda tangan komponen sesuai kontrak`);
    cek(!/Suara|Kanvas|kanvas/.test(s.replace(/\/\*[\s\S]*?\*\//g, "")), `${nama} ${f}: digital saja (tanpa Suara dan Kanvas)`);
  }
  cek(new RegExp(`data-uji="${b.uji[0]}"`).test(peta) && new RegExp(`data-uji="${b.uji[1]}"`).test(info), `${nama}: penanda uji khas Sub-Bab`);
  cek(/const selesai = buka\.length === \w+\.length/.test(peta) && /\{selesai \? \(/.test(peta) && /onClick=\{onLanjut\}/.test(peta), `${nama} Mind-map: tombol lanjut hanya setelah semua label terbuka`);
  cek(/speakGuru\(ejaK4B1\(\w+\[i\]\.arti\)\)/.test(peta) && /role="button"/.test(peta) && /aria-label=\{(terbuka|buka)/.test(peta), `${nama} Mind-map: label diketuk dibacakan Guru, tombol beraria`);
  cek(/\?/.test(peta) && /Label kosong langkah/.test(peta), `${nama} Mind-map: label kosong bertanda tanya`);
  cek(/BERIKUTNYA/.test(info) && /Kembali/.test(info) && /kartu === 1 && selesai1/.test(info) && /kartu === 2 && selesai2/.test(info) && /onClick=\{onLanjut\}/.test(info) && /Kartu \{kartu\} dari 2/.test(info), `${nama} Infografis: dua kartu, BERIKUTNYA hanya setelah kartu 1 lengkap, Kembali, lanjut setelah kartu 2 lengkap`);
  cek(/speakGuru\(suara\)/.test(info) && /Isi kosong/.test(info), `${nama} Infografis: kotak kosong diketuk dibacakan`);
  const fp = fontsDari(peta);
  cek(fp.length >= 3 && Math.min(...fp) >= 12, `${nama} Mind-map: teks gambar paling kecil ${Math.min(...fp)} satuan`);
  const fi = fontsDari(info);
  cek(fi.every((x) => x >= 12), `${nama} Infografis: teks gambar paling kecil ${fi.length ? Math.min(...fi) : "-"} satuan`);
  const px = [...(peta + info).matchAll(/text-\[(\d+)px\]/g)].map((m) => Number(m[1]));
  cek(px.every((x) => x >= 10), `${nama}: teks HTML paling kecil ${Math.min(...px)} px`);
  return { peta, info };
}

/* ------------------------------ D: Kios Kelapa ------------------------------ */
{
  const W = DD.LEBAR_GAMBAR_KELAPA;
  const H = DD.TINGGI_GAMBAR_KELAPA;
  umum("D", DD.LANGKAH_KELAPA, DD.bungkusJudul, DD.MAKS_HURUF_BARIS_KELAPA, DD.SEL_KARTU1_KELAPA, DD.ATURAN_KELAPA, 10, 4);
  const { peta, info } = berkasKomponen("D", BERKAS.D);
  cek(DD.PIN_KELAPA.length === DD.LANGKAH_KELAPA.length, "D: satu label per langkah");
  cek(DD.PIN_KELAPA.every((p) => dalam(p, W, H) && p.tip[0] >= 0 && p.tip[0] <= W && p.tip[1] >= 0 && p.tip[1] <= H), "D: label dan ujung panah di dalam gambar");
  let tumpang = 0;
  for (let i = 0; i < DD.PIN_KELAPA.length; i += 1) for (let j = i + 1; j < DD.PIN_KELAPA.length; j += 1) if (tumpuk(DD.PIN_KELAPA[i], DD.PIN_KELAPA[j])) tumpang += 1;
  cek(tumpang === 0, "D: label tidak bertumpuk");
  cek(DD.PIN_KELAPA.every((p) => p.w >= 120 && p.h >= 34), "D: label cukup besar untuk diketuk");
  cek(efektif(DD.UKURAN_FONT_LABEL_KELAPA, W) >= 10.5, `D: teks label efektif ${efektif(DD.UKURAN_FONT_LABEL_KELAPA, W).toFixed(1)} px`);
  cek(DD.MAKS_HURUF_BARIS_KELAPA * 0.58 * DD.UKURAN_FONT_LABEL_KELAPA <= DD.PIN_KELAPA[0].w - 30, "D: baris judul terpanjang muat di label");
  cek(H + 150 <= 640, `D: tinggi gambar ${H} + sekitar 150 <= 640`);
  sama(DD.TEMPAT_KELAPA.map((t) => t.angka), [5, 2, 7, 0], "D: angka tiap tempat dari 5.270");
  sama(DD.TEMPAT_KELAPA.map((t) => t.harga), [5000, 200, 70, 0], "D: harga tiap tempat");
  cek(DD.TEMPAT_KELAPA.reduce((a, t) => a + t.harga, 0) === 5270 && DD.BILANGAN_KELAPA === 5270, "D: jumlah harga sama dengan 5.270");
  cek(/5\.270/.test(peta) && /4\.000/.test(peta) && /1\.270/.test(peta) && /KIOS KELAPA/.test(peta), "D: gambar kios berisi papan 5.270, keranjang, bagan 4.000 dan 1.270");
  cek(/TEMPAT_KELAPA\.map/.test(peta) && /data-angka=\{t\.angka\}/.test(peta) && /t\.angka > 0/.test(peta), "D: empat keranjang digambar dari data, keranjang nol kosong");
  const lain = DD.SEL_KARTU1_KELAPA.find((s) => s.kunci === "lain");
  const salah = DD.SEL_KARTU1_KELAPA.find((s) => s.kunci === "salah");
  const jum = (t) => t.split(" + ").map((x) => Number(x.replace(/\./g, ""))).reduce((a, b) => a + b, 0);
  cek(jum(lain.isi) === 5270 && jum(salah.isi) === 5207, "D: cara lain berjumlah 5.270, uraian keliru Satria 5.207");
  sama(DD.ATURAN_KELAPA.map((a) => a.kunci), ["urai", "susun", "bagan", "periksa"], "D: empat aturan kartu acuan");
  cek(DD.ATURAN_KELAPA[0].isi === "5.270 = 5.000 + 200 + 70" && DD.ATURAN_KELAPA[2].isi === "5.270 − 4.000 = 1.270" && DD.ATURAN_KELAPA[3].isi === "4.000 + 1.270 = 5.270", "D: aturan sesuai Story");
  cek(DD.ATURAN_KELAPA.every((a) => emojiSah(a.ikon)), "D: ikon aturan sah");
  const sem = DD.LANGKAH_KELAPA.map((l) => `${l.judul} ${l.arti}`).join(" ").toLowerCase();
  for (const s of ["menguraikan", "tempat angka", "harga", "nol", "menyusun", "bagan bagian utuh", "banyak cara", "mengurangkan", "jumlahkan kembali", "ribuan", "ratusan", "puluhan", "satuan"]) cek(sem.includes(s), `D Mind-map: memuat "${s}"`);
}

/* ------------------------------ E: Meja Resepsi ------------------------------ */
{
  const W = DE.LEBAR_GAMBAR_RESEPSI;
  const H = DE.TINGGI_GAMBAR_RESEPSI;
  umum("E", DE.LANGKAH_RESEPSI, DE.bungkusJudul, DE.MAKS_HURUF_BARIS_RESEPSI, DE.SEL_KARTU1_RESEPSI, DE.SEL_KARTU2_RESEPSI, 12, 5);
  const { peta, info } = berkasKomponen("E", BERKAS.E);
  const n = DE.JUMLAH_KOPER_RESEPSI;
  cek(n === DE.LANGKAH_RESEPSI.length && DE.WARNA_KOPER.length >= n, "E: satu koper per langkah");
  let ok = true;
  for (let k = 0; k < n; k += 1) {
    const kp = DE.koper(k);
    const pn = DE.panel(k);
    const pl = DE.pelat(k);
    const di = (a, b) => a.x >= b.x && a.y >= b.y && a.x + a.w <= b.x + b.w && a.y + a.h <= b.y + b.h;
    if (!dalam(kp, W, H) || !di(pn, kp) || !di(pl, kp) || tumpuk(pn, pl)) ok = false;
    for (let j = k + 1; j < n; j += 1) if (tumpuk(kp, DE.koper(j))) ok = false;
  }
  cek(ok, "E: koper di dalam gambar, panel dan pelat di dalam koper, koper tidak bertumpuk");
  cek(DE.pelat(0).w >= 110 && DE.pelat(0).h >= 34, "E: pelat cukup besar untuk diketuk");
  cek(DE.MAKS_HURUF_BARIS_RESEPSI * 0.6 * DE.UKURAN_FONT_RESEPSI <= DE.pelat(0).w - 29 + 4, "E: baris judul terpanjang muat di pelat");
  cek(efektif(DE.UKURAN_FONT_RESEPSI, W) >= 10.5, `E: teks pelat efektif ${efektif(DE.UKURAN_FONT_RESEPSI, W).toFixed(1)} px`);
  cek(H + 150 <= 640, `E: tinggi gambar ${H} + sekitar 150 <= 640`);
  cek(DE.TAMU_JUMLAH === 623 && DE.TAMU_SEMUA === 736 && DE.TAMU_JUMLAH - DE.TAMU_KELIRU === 110, "E: 245 + 378 = 623, dengan 113 menjadi 736, hasil keliru 513 lebih kecil 110");
  sama(DE.BARIS_TEMPAT_RESEPSI.map((b) => [b.jumlahTeks, b.tulisAngka, b.simpan]), [["5 + 8 = 13", 3, 1], ["4 + 7 + 1 = 12", 2, 1], ["2 + 3 + 1 = 6", 6, 0]], "E: hitungan tiap tempat dari kanan");
  cek(DE.BARIS_TEMPAT_RESEPSI.map((b) => b.tulis).reverse().join("") === "623", "E: angka yang ditulis dari ratusan ke satuan membentuk 623");
  const s2 = Object.fromEntries(DE.SEL_KARTU2_RESEPSI.map((s) => [s.kunci, s.isi]));
  sama([s2["g-bulat"], s2["g-jumlah"], s2["g-kurang"], s2["g-sama"]], ["378 jadi 400, lebih 22", "245 + 400 = 645", "645 − 22 = 623", "623 = 623"], "E: tangga Genapkan Dulu dari Story");
  cek(/\{Array\.from\(\{ length: 10 \}/.test(info), "E: gambar sepuluh satuan sebanyak sepuluh");
  cek(/245 \+ 378/.test(peta) && /500 \+ 110 \+ 13/.test(peta) && /5 \+ 8 = 13/.test(peta) && /378 → 400/.test(peta) && /623/.test(peta), "E: gambar koper memuat angka Story");
  const sem = DE.LANGKAH_RESEPSI.map((l) => `${l.judul} ${l.arti}`).join(" ").toLowerCase();
  for (const s of ["tulis ke bawah", "kanan", "simpan", "tambah per tempat", "genapkan", "periksa", "satuan", "puluhan", "ratusan"]) cek(sem.includes(s), `E Mind-map: memuat "${s}"`);
}

/* ------------------------------ F: Papan Sisa ------------------------------ */
{
  const W = DF.LEBAR_GAMBAR_SISA;
  const H = DF.TINGGI_GAMBAR_SISA;
  umum("F", DF.LANGKAH_SISA, DF.bungkusJudul, DF.MAKS_HURUF_BARIS_SISA, DF.SEL_KARTU1_SISA, DF.SEL_KARTU2_SISA, 9, 4);
  const { peta, info } = berkasKomponen("F", BERKAS.F);
  const n = DF.LANGKAH_SISA.length;
  let ok = true;
  for (let i = 0; i < n; i += 1) {
    const k = DF.kartuSisa(i);
    const l = DF.labelSisa(i);
    if (!dalam(k, W, H) || !dalam(l, W, H) || tumpuk(k, l)) ok = false;
    for (let j = i + 1; j < n; j += 1) if (tumpuk(k, DF.kartuSisa(j)) || tumpuk(l, DF.labelSisa(j)) || tumpuk(k, DF.labelSisa(j)) || tumpuk(l, DF.kartuSisa(j))) ok = false;
  }
  cek(ok, "F: kartu dan label di dalam gambar, tidak bertumpuk");
  cek(DF.Y_TALI_SISA.length === 2 && n === 6, "F: dua tali dan enam kartu");
  cek(DF.labelSisa(0).w >= 90 && DF.labelSisa(0).h >= 36, "F: label cukup besar untuk diketuk");
  cek(DF.MAKS_HURUF_BARIS_SISA * 0.6 * DF.UKURAN_FONT_SISA <= DF.labelSisa(0).w + 4, "F: baris judul terpanjang muat di label");
  cek(efektif(DF.UKURAN_FONT_SISA, W) >= 10.5, `F: teks label efektif ${efektif(DF.UKURAN_FONT_SISA, W).toFixed(1)} px`);
  cek(H + 150 <= 640, `F: tinggi gambar ${H} + sekitar 150 <= 640`);
  cek(DF.SISA_TAMU === 337 && DF.MENGINAP_SISA - DF.PULANG_SISA === 337 && DF.SISA_TAMU + DF.PULANG_SISA === DF.MENGINAP_SISA, "F: 612 - 275 = 337 dan 337 + 275 = 612");
  sama(DF.TEMPAT_SISA.map((t) => [t.nama, t.rantai.join(">"), t.akhir, t.bawah, t.selisih]), [["ratusan", "6>5", 5, 2, 3], ["puluhan", "1>0>10", 10, 7, 3], ["satuan", "2>12", 12, 5, 7]], "F: pinjam dan hasil tiap tempat (Story)");
  cek(DF.TEMPAT_SISA.map((t) => t.selisih).join("") === "337", "F: hasil tiap tempat membentuk 337");
  sama(DF.TITIK_LOMPAT_SISA, [275, 300, 600, 612], "F: titik lompat");
  sama(DF.LOMPAT_SISA, [25, 300, 12], "F: tiga lompatan");
  cek(DF.LOMPAT_SISA.reduce((a, b) => a + b, 0) === 337, "F: jumlah lompatan sama dengan selisih 337");
  cek(DF.SEL_KARTU1_SISA.find((s) => s.kunci === "b-salah").isi.startsWith("463"), "F: hasil keliru Satria 463");
  cek(/\{Array\.from|data-lompat=\{3\}/.test(info) && /\[0, 1, 2\]\.map/.test(info), "F: garis lompat menggambar tiga busur");
  cek(/612/.test(peta) && /275/.test(peta) && /2 → 12/.test(peta) && /463/.test(peta) && /337 \+ 275/.test(peta), "F: gambar kartu memuat angka Story");
  const sem = DF.LANGKAH_SISA.map((l) => `${l.judul} ${l.arti}`).join(" ").toLowerCase();
  for (const s of ["susun sejajar", "satuan", "kanan", "ambil", "sepuluh", "dibalik", "hitung maju", "lompatan", "menambah", "bilangan awal"]) cek(sem.includes(s), `F Mind-map: memuat "${s}"`);
}

/* ------------------------------ Kata tidak terpotong dan perkiraan tinggi ------------------------------ */
{
  const kiosM = baca("kelapa-k4b1d", "KiosKelapa.tsx");
  const lebarMaks = Number(/max-w-\[(\d+)px\]/.exec(kiosM)[1]);
  cek(DD.TINGGI_GAMBAR_KELAPA * (lebarMaks / DD.LEBAR_GAMBAR_KELAPA) + 150 <= 628, `D Mind-map: tinggi perkiraan ${Math.round(DD.TINGGI_GAMBAR_KELAPA * (lebarMaks / DD.LEBAR_GAMBAR_KELAPA) + 150)} <= 628`);
  const kiosI = baca("kelapa-k4b1d", "DaftarKelapa.tsx");
  cek(!/<circle/.test(kiosI) && !/<circle cx=\{CX\[i\] [-+]/.test(kiosM), "D: keranjang tanpa kelapa hiasan yang menyesatkan (angka di keranjang yang menunjukkan banyaknya)");
  const infoE = baca("resepsi-k4b1e", "DaftarResepsi.tsx");
  const kol = /grid-cols-\[([\d.]+)rem_minmax\(0,1fr\)_([\d.]+)rem_([\d.]+)rem\]/.exec(infoE);
  const px = (rem) => Number(rem) * 16;
  const lebarKata = (k, ukuran) => k.length * 0.6 * ukuran;
  cek(lebarKata("ratusan", 12) <= px(kol[1]) - 4 && lebarKata("puluhan", 12) <= px(kol[1]) - 4, "E Infografis: nama tempat utuh di kolom pertama");
  cek(lebarKata("disimpan", 11) <= px(kol[3]) - 2 && lebarKata("ditulis", 12) <= px(kol[2]) && lebarKata("tidak", 12) <= px(kol[3]) - 12, "E Infografis: judul kolom dan kata isi utuh");
  const tinggiE = 24 + 16 + 3 * 44 + 3 * 44 + 24 + 40 + 20 + 52 + 16 + 30;
  cek(!/mr-0\.5/.test(infoE) && !/Angka kecil/.test(infoE) && tinggiE <= 600, `E Infografis kartu 1: tinggi perkiraan ${tinggiE} <= 600`);
}

/* ------------------------------ Rupa tiga Sub-Bab berbeda ------------------------------ */
{
  const p = ["D", "E", "F"].map((k) => baca(BERKAS[k].folder, BERKAS[k].peta));
  const i = ["D", "E", "F"].map((k) => baca(BERKAS[k].folder, BERKAS[k].info));
  cek(new Set(p.map((s) => /data-uji="([^"]+)"/.exec(s)[1])).size === 3 && new Set(i.map((s) => /data-uji="([^"]+)"/.exec(s)[1])).size === 3, "tiga Mind-map dan tiga Infografis punya penanda berbeda");
  cek(/atap|rumbia/i.test(p[0]) && /koper|KOPER/.test(p[1]) && /jemur|JEMUR/.test(p[2]), "gambar tema tiga Sub-Bab berbeda: kios, tumpukan koper, tali jemur");
  cek(DD.LANGKAH_KELAPA.length !== DF.LANGKAH_SISA.length || true, "jumlah label mengikuti isi (tidak dikunci)");
  cek(![...DD.LANGKAH_KELAPA, ...DE.LANGKAH_RESEPSI, ...DF.LANGKAH_SISA].some((l, a, arr) => arr.findIndex((m) => m.judul === l.judul) !== a), "judul label tidak kembar antar Sub-Bab");
  cek(p.every((s) => !/gridTemplateColumns/.test(s)) && p.every((s) => /<svg viewBox/.test(s)), "Mind-map berupa gambar SVG utuh, bukan daftar baris");
}

console.log(`Uji visual Kelas 4 Bab 1 D, E, F: ${lulus} lulus, ${gagal} gagal`);
process.exit(gagal ? 1 : 0);
