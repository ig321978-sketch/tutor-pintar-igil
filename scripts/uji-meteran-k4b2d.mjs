// Uji Mind-map (Meteran Pak Bagas), Infografis (Daftar Meteran), Simulasi Meteran Kain, dan tahap Concrete, Pictorial, Abstract Kelas 4 Bab 2 Sub-Bab D ("Meteran Kain Pak Bagas"),
// Sanggar Batik Kampung Mekar (pecahan per sepuluh dan per seratus menjadi desimal satu dan dua angka di belakang koma).
// Memeriksa: kata bilangan dan desimal berkoma (ejaan "nol koma dua tujuh"), pecahan bertingkat ke ucapan, tata letak gambar (kisi sepuluh kolom dan seratus kotak SUNGGUH sebanyak bagian berwarna, muat di kanvas, tidak bertumpuk),
// logika simulasi (warnai kolom, kisi seratus kotak dengan alat menolak sepuluh kotak lepas, jembatan dengan Cek Jembatan, balik desimal ke pecahan), misi (awal tidak memenuhi, wajib empat, bebas dua),
// sembilan kartu geser Masalah, Cara, Hasil dengan ikon bertema meteran dan kain, daftar meteran dari kejadian Story, CPA dua belas langkah per tahap (Klik, Kanvas, Suara x empat metode) dengan jawaban beragam dan Cari kesalahan di tiap tahap,
// jawaban benar dihitung dari data, angka jawaban tidak kembar per tahap, tugas yang langsung siap, pengenal ucapan, petunjuk salah yang tidak membocorkan, umpan balik Abstract tanpa gambar atau kisi, batas rupa, emoji, kata terlarang, akhir baris.
// Jalankan: node --no-warnings scripts/uji-meteran-k4b2d.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/meteran-k4b2d/logika.ts");
const DS = await import("../src/components/modul/meteran-k4b2d/data-sim.ts");
const DK = await import("../src/components/modul/meteran-k4b2d/data-kartu.ts");
const LC = await import("../src/components/modul/meteran-k4b2d/logika-cpa.ts");
const D = await import("../src/components/modul/meteran-k4b2d/data.ts");
const K = await import("../src/components/modul/meteran-k4b2d/periksa.ts");
const T = await import("../src/components/modul/meteran-k4b2d/tata.ts");
const S = await import("../src/components/modul/misi-simulasi.ts");
const MK = await import("../src/components/modul/misi-k4bab2.ts");
const MT = await import("../src/components/modul/misi-teks-k4b2.ts");
const folderUrl = new URL("../src/components/modul/meteran-k4b2d/", import.meta.url);
/** Benda beremoji pada GambarMeteran.tsx (kunci EMOJI_BENDA), dibaca dari teks karena berkas tsx tidak bisa diimpor di Node. */
const DG_EMOJI = {};
{
  const gu = readFileSync(new URL("GambarMeteran.tsx", folderUrl), "utf8");
  const blok = /export const EMOJI_BENDA[^=]*=\s*\{([\s\S]*?)\n\};/.exec(gu)?.[1] ?? "";
  for (const m of blok.matchAll(/(?:"([^"]+)"|([a-z]+)):\s*"([^"]*)"/g)) DG_EMOJI[m[1] ?? m[2]] = m[3].replace(/\u\{([0-9A-Fa-f]+)\}/g, (_, h) => String.fromCodePoint(parseInt(h, 16)));
}

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
const bersih = (t) => !/buku|kelompok|bernilai|tebak|nilai|kelas|teman|skor|soal|kunci|latihan/i.test(t);
const tanpaDigit = (t) => !/\d/.test(t);
const emojiSah = (s) => [...s].every((c) => c.codePointAt(0) <= 0x1fa95 && c.codePointAt(0) !== 0x200d && c.codePointAt(0) !== 0x1f6de);
const DILARANG_TAMPIL = [0x1fa74, 0x1f39f, 0x2602, 0x1fa9f, 0x1faa3, 0x1f41f, 0x1f420, 0x1f421, 0x1f355];
const adaEmoji = (s) => /\p{Extended_Pictographic}/u.test(s);
/** Pecahan Story D (3/10, 7/10, 27/100, 35/100, 45/100, 9/100): jangan dijadikan data CPA atau Simulasi (kecuali seed Cari kesalahan dari alur: tujuh per sepuluh). */
const STORY_SEPULUH = [3, 7];
const STORY_SERATUS = [27, 35, 45, 9];

/* ------------------------------ Kata bilangan, desimal, dan ucapan ------------------------------ */
{
  sama([0, 1, 9, 10, 11, 15, 20, 38, 100, 305, 999].map(LC.kataBil), ["nol", "satu", "sembilan", "sepuluh", "sebelas", "lima belas", "dua puluh", "tiga puluh delapan", "seratus", "tiga ratus lima", "sembilan ratus sembilan puluh sembilan"], "kata bilangan");
  cek(LC.kata === LC.kataBil && L.kata === LC.kataBil, "alias kata");
  for (let n = 0; n <= 999; n += 1) cek(tanpaDigit(LC.kataBil(n)), `kata bilangan ${n} tanpa digit`);
  sama([LC.kataDes("0,3"), LC.kataDes("0,27"), LC.kataDes("0,05"), LC.kataDes("0,09"), LC.kataDes("0,10")], ["nol koma tiga", "nol koma dua tujuh", "nol koma nol lima", "nol koma nol sembilan", "nol koma satu nol"], "desimal dieja angka demi angka");
  sama([LC.ucapkan("3/10 = 0,3"), LC.ucapkan("27/100"), LC.ucapkan("kain 1 meter dibagi 10 bagian sama"), LC.ucapkan("0,07"), LC.ucapkan("persepuluhan")], ["tiga per sepuluh sama dengan nol koma tiga", "dua puluh tujuh per seratus", "kain satu meter dibagi sepuluh bagian sama", "nol koma nol tujuh", "persepuluhan"], "ucapkan: pecahan, desimal, dan angka menjadi kata");
  sama([LC.desimalDari(3, 10), LC.desimalDari(27, 100), LC.desimalDari(3, 100), LC.desimalDari(8, 100), LC.desimalDari(12, 100)], ["0,3", "0,27", "0,03", "0,08", "0,12"], "desimal dari pecahan");
  sama([LC.pecahanDari("0,27"), LC.pecahanDari("0,3"), LC.pecahanDari("0,05"), LC.pecahanDari("7,0"), LC.pecahanDari("0,027")], [{ m: 27, den: 100 }, { m: 3, den: 10 }, { m: 5, den: 100 }, null, null], "pecahan dari desimal");
  sama([LC.banyakAngka(10), LC.banyakAngka(100), LC.namaTempat(10), LC.namaTempat(100), LC.angkaKoma("0,27"), LC.angkaKoma("0,05")], [1, 2, "persepuluhan", "perseratusan", "27", "05"], "banyak angka, nama tempat, angka koma");
  for (let m = 1; m <= 9; m += 1) {
    const d = LC.desimalDari(m, 10);
    cek(/^0,\d$/.test(d) && LC.pecahanDari(d).m === m && LC.pecahanDari(d).den === 10, `per sepuluh ${m}: satu angka di belakang koma`);
  }
  for (let m = 1; m <= 99; m += 1) {
    if (m % 10 === 0) continue;
    const d = LC.desimalDari(m, 100);
    cek(/^0,\d\d$/.test(d) && LC.pecahanDari(d).m === m && LC.pecahanDari(d).den === 100 && Number(d.replace(",", ".")) === m / 100, `per seratus ${m}: dua angka di belakang koma dan nilai sama dengan pecahan`);
  }
}

/* ------------------------------ Tata letak gambar ------------------------------ */
{
  for (let p = 0; p <= 10; p += 1) {
    const sel = T.susunSepuluh(p);
    cek(sel.length === 10 && T.banyakWarna(sel) === p, `kisi sepuluh ${p}: sepuluh kolom, tepat ${p} berwarna`);
    cek(sel.every((s, i) => s.kolom === i && s.baris === 0 && s.w === T.W_SEP && s.h === T.H_SEP && s.x === T.X0_SEP + i * T.W_SEP && s.y === T.Y0_SEP && s.warna === i < p), `kisi sepuluh ${p}: sel tetap sama besar, berurutan dari kiri`);
    cek(sel.every((s) => s.x >= 8 && s.x + s.w <= 292 && s.y >= 22 && s.y + s.h <= 178), `kisi sepuluh ${p}: sel muat di papan`);
  }
  for (let q = 0; q <= 100; q += 1) {
    const sel = T.susunSeratus(q);
    cek(sel.length === 100 && T.banyakWarna(sel) === q, `kisi seratus ${q}: seratus kotak, tepat ${q} berwarna`);
    cek(sel.filter((s) => s.warna).every((s) => s.baris * 10 + s.kolom < q) && sel.filter((s) => !s.warna).every((s) => s.baris * 10 + s.kolom >= q), `kisi seratus ${q}: warna mengisi dari baris atas, kiri ke kanan`);
    cek(T.barisPenuh(q) * 10 + T.kotakLepas(q) === q, `kisi seratus ${q}: baris penuh dan kotak lepas`);
  }
  {
    const sel = T.susunSeratus(27);
    cek(sel.every((s) => s.w === T.W_SER && s.h === T.H_SER && s.x === T.X0_SER + s.kolom * T.W_SER && s.y === T.Y0_SER + s.baris * T.H_SER), "kisi seratus: sel tetap sama besar pada koordinat hitungan");
    cek(sel.every((s) => s.x >= 8 && s.x + s.w <= 292 && s.y >= 22 && s.y + s.h <= 180), "kisi seratus: sel muat di kanvas");
    let tabrak = false;
    for (let a = 0; a < sel.length; a += 1) for (let b = a + 1; b < sel.length; b += 1) if (Math.min(sel[a].x + sel[a].w, sel[b].x + sel[b].w) - Math.max(sel[a].x, sel[b].x) > 0.5 && Math.min(sel[a].y + sel[a].h, sel[b].y + sel[b].h) - Math.max(sel[a].y, sel[b].y) > 0.5) tabrak = true;
    cek(!tabrak, "kisi seratus: sel tidak bertumpuk");
    sama([T.barisPenuh(27), T.kotakLepas(27)], [2, 7], "dua puluh tujuh: dua baris penuh dan tujuh kotak lepas");
  }
  cek(T.KIRI_JEM.x + T.KIRI_JEM.w < T.KANAN_JEM.x && T.KANAN_JEM.x + T.KANAN_JEM.w <= 292 && /^M [\d.]+ [\d.]+ Q [\d.]+ [\d.]+ [\d.]+ [\d.]+$/.test(T.lengkungJembatan()), "jembatan: kotak kiri dan kanan terpisah, lengkung dari kiri ke kanan");
  {
    // Gambar SVG membaca data dari tata.ts: tiap sel digambar sebagai satu kotak dan hanya sel berwarna berisi benda.
    const gu = readFileSync(new URL("GambarMeteran.tsx", folderUrl), "utf8");
    cek(/susunSepuluh\(p\)/.test(gu) && /susunSeratus\(q\)/.test(gu) && /sel\.map/.test(gu) && /s\.warna \? c\.isi : c\.kosong/.test(gu) && /rupa === "benda" && s\.warna/.test(gu), "gambar: kisi digambar dari sel tata.ts, isi hanya pada sel berwarna");
    cek(!/flex-wrap/.test(gu), "gambar: kisi bukan susunan yang membungkus sendiri (tanpa flex-wrap)");
  }
}

/* ------------------------------ Simulasi: data dan logika ------------------------------ */
{
  cek(DS.TARGET_SEPULUH.length === 3 && DS.TARGET_SEPULUH.every((t) => t.p >= 1 && t.p <= 9 && !STORY_SEPULUH.includes(t.p) && DG_EMOJI[t.benda]) && new Set(DS.TARGET_SEPULUH.map((t) => t.p)).size === 3, "simulasi: tiga target warnai berbeda dari Story, benda beremoji");
  cek(DS.TARGET_SERATUS.length === 3 && DS.TARGET_SERATUS.every((t) => t.q >= 11 && t.q <= 99 && t.q % 10 !== 0 && Math.floor(t.q / 10) !== t.q % 10 && !STORY_SERATUS.includes(t.q)) && new Set(DS.TARGET_SERATUS.map((t) => t.q)).size === 3 && DS.TARGET_SERATUS.every((t) => t.q % 10 >= 1 && t.q % 10 <= DS.MAKS_LEPAS), "simulasi: tiga target susun, ada baris penuh dan kotak lepas, berbeda dari Story");
  cek(DS.TARGET_JEMBATAN.length === 3 && DS.TARGET_JEMBATAN.every((t) => (t.den === 10 ? t.m >= 1 && t.m <= 9 && !STORY_SEPULUH.includes(t.m) : t.m >= 1 && t.m <= 99 && t.m % 10 !== 0 && !STORY_SERATUS.includes(t.m))) && new Set(DS.TARGET_JEMBATAN.map((t) => `${t.m}/${t.den}`)).size === 3, "simulasi: tiga target jembatan berbeda dari Story");
  cek(DS.TARGET_BALIK.length === 3 && DS.TARGET_BALIK.every((t) => (t.den === 10 ? t.m >= 1 && t.m <= 9 && !STORY_SEPULUH.includes(t.m) : t.m >= 1 && t.m <= 99 && t.m % 10 !== 0 && !STORY_SERATUS.includes(t.m))) && DS.TARGET_BALIK.some((t) => t.den === 10) && DS.TARGET_BALIK.some((t) => t.den === 100 && t.m < 10), "simulasi: tiga target balik, ada per sepuluh dan nol penjaga, berbeda dari Story");
  cek(DS.MAKS_LEPAS === 9 && DS.MAKS_BARIS === 10, "simulasi: batas kotak lepas dan baris");
  cek(tanpaDigit(DS.MISI_METERAN_TEKS) && bersih(DS.MISI_METERAN_TEKS) && DS.MISI_METERAN_TEKS === MT.MISI_K4B2.D && D.MISI_METERAN_TEKS === DS.MISI_METERAN_TEKS && DS.MISI_METERAN_TEKS.length >= 10 && DS.MISI_METERAN_TEKS.length <= 120, "simulasi: teks misi tanpa digit dan kata terlarang, sama dengan misi-teks-k4b2");

  const a = L.awalMeteran();
  cek(a.alat === "meteran" && a.mode === "sepuluh" && a.sepWarna === 0 && !a.tolak && a.salah === 0 && ["sepBenar", "serBenar", "jemBenar", "balBenar"].every((f) => a[f].length === 0) && a.jemPilih === -1 && a.balPilih === -1 && !a.jemCek && a.serBaris === 0 && a.serLepas === 0, "simulasi: keadaan awal");
  // Warnai.
  cek(L.targetSepuluh(a).p === 4 && L.desimalSepuluh(a) === "0,4" && /Belum ada kolom berwarna/.test(L.petunjukSepuluh(a)) && !L.periksaSepuluh(a).ok && L.periksaSepuluh(a).k.salah === 1, "warnai: sebelum mewarnai, petunjuk menunjuk langkah yang belum dilakukan dan Periksa ditolak");
  let w = a;
  for (let i = 0; i < 3; i += 1) w = L.aturWarna(w, 1).k;
  cek(w.sepWarna === 3 && /masih kurang/.test(L.petunjukSepuluh(w)) && tanpaDigit(L.petunjukSepuluh(w)) && !L.periksaSepuluh(w).ok, "warnai: kolom kurang satu, petunjuk menyebut kurang tanpa membocorkan angka");
  const lebihW = L.aturWarna(L.aturWarna(w, 1).k, 1).k;
  cek(lebihW.sepWarna === 5 && /sudah lebih/.test(L.petunjukSepuluh(lebihW)) && !L.periksaSepuluh(lebihW).ok, "warnai: kolom lebih, petunjuk menyuruh mengurangi");
  const pasW = L.aturWarna(w, 1).k;
  cek(pasW.sepWarna === 4 && /sudah pas/.test(L.petunjukSepuluh(pasW)), "warnai: kolom pas");
  const benarW = L.periksaSepuluh(pasW);
  cek(benarW.ok && benarW.k.sepBenar.join() === "0" && benarW.k.sepKe === 1 && benarW.k.sepWarna === 0 && L.targetSepuluh(benarW.k).p === 6 && L.desimalSepuluh(benarW.k) === "0,6", "warnai: benar membuka kain berikutnya dengan kisi kosong");
  sama(S.misiBaru(MK.MISI_D, benarW.k, new Set()), ["d-sepuluh"], "warnai: misi d-sepuluh");
  let sepuluhKolom = a;
  for (let i = 0; i < 10; i += 1) sepuluhKolom = L.aturWarna(sepuluhKolom, 1).k;
  cek(sepuluhKolom.sepWarna === 10 && !L.aturWarna(sepuluhKolom, 1).ok && !L.aturWarna(a, -1).ok && !sepuluhKolom.tolak, "warnai: paling banyak sepuluh kolom, ditolak di luar batas tanpa menandai tolak kisi seratus");
  cek(tanpaDigit(L.kalimatSepuluh(a)) && tanpaDigit(L.kalimatSepuluh(w)) && tanpaDigit(L.kalimatSepuluh(benarW.k)), "warnai: kalimat tanpa digit");
  // Susun.
  cek(L.targetSeratus(a).q === 38 && L.desimalSeratus(a) === "0,38" && L.jumlahSeratus(a) === 0 && /Belum ada kotak berwarna/.test(L.petunjukSeratus(a)) && !L.periksaSeratus(a).ok, "susun: sebelum mengisi, petunjuk menunjuk langkah yang belum dilakukan");
  let s = a;
  for (let i = 0; i < 3; i += 1) s = L.aturBaris(s, 1).k;
  for (let i = 0; i < 7; i += 1) s = L.aturLepas(s, 1).k;
  cek(L.jumlahSeratus(s) === 37 && /masih kurang/.test(L.petunjukSeratus(s)) && tanpaDigit(L.petunjukSeratus(s)) && !L.periksaSeratus(s).ok, "susun: kotak berwarna kurang satu");
  const lebihS = L.aturLepas(L.aturLepas(s, 1).k, 1);
  cek(lebihS.ok === true && lebihS.k.serLepas === 9 && L.jumlahSeratus(lebihS.k) === 39 && /sudah lebih/.test(L.petunjukSeratus(lebihS.k)), "susun: kotak berwarna lebih, petunjuk menyuruh mengurangi");
  const pasS = L.aturLepas(s, 1).k;
  cek(L.jumlahSeratus(pasS) === 38 && /sudah pas/.test(L.petunjukSeratus(pasS)), "susun: kotak berwarna pas");
  const benarS = L.periksaSeratus(pasS);
  cek(benarS.ok && benarS.k.serBenar.join() === "0" && benarS.k.serKe === 1 && L.jumlahSeratus(benarS.k) === 0 && L.targetSeratus(benarS.k).q === 56, "susun: benar membuka kain berikutnya dengan kisi kosong");
  sama(S.misiBaru(MK.MISI_D, benarS.k, new Set()), ["d-seratus"], "susun: misi d-seratus");
  // Alat menolak sepuluh kotak lepas.
  let tolak = a;
  for (let i = 0; i < 9; i += 1) tolak = L.aturLepas(tolak, 1).k;
  const sepuluhLepas = L.aturLepas(tolak, 1);
  cek(tolak.serLepas === 9 && !tolak.tolak && !sepuluhLepas.ok && sepuluhLepas.k.tolak === true && sepuluhLepas.k.serLepas === 9 && sepuluhLepas.k.salah === 0 && /sepuluh kotak lepas harus ditukar/i.test(L.petunjukTolak()) && tanpaDigit(L.petunjukTolak()) && !/jawaban|benar/i.test(L.petunjukTolak()), "susun: kotak lepas kesepuluh ditolak alat dan alasannya dijelaskan tanpa membocorkan");
  sama(S.misiBaru(MK.MISI_D, sepuluhLepas.k, new Set()), ["d-tolak"], "susun: misi d-tolak");
  {
    // Penolakan lain tidak menandai tolak (teks tantangan khusus sepuluh kotak lepas).
    let b = a;
    for (let i = 0; i < 10; i += 1) b = L.aturBaris(b, 1).k;
    const lebihBaris = L.aturBaris(b, 1);
    const lepasSetelahPenuh = L.aturLepas(b, 1);
    cek(b.serBaris === 10 && !lebihBaris.ok && !lebihBaris.k.tolak && !lepasSetelahPenuh.ok && !lepasSetelahPenuh.k.tolak, "susun: tidak ada tempat lagi di kisi seratus kotak ditolak tanpa menandai tolak sepuluh kotak lepas");
    cek(!L.aturBaris(a, -1).ok && !L.aturLepas(a, -1).ok && !L.aturLepas(a, -1).k.tolak && !L.aturBaris(a, -1).k.tolak, "susun: mengurangi dari kisi kosong ditolak tanpa menandai tolak");
    cek(S.misiBaru(MK.MISI_D, b, new Set()).length === 0 && S.misiBaru(MK.MISI_D, { ...a, salah: 3, sepWarna: 10 }, new Set()).length === 0, "susun: penolakan lain dan percobaan keliru tidak dihitung sebagai misi");
  }
  cek(tanpaDigit(L.kalimatSeratus(a)) && tanpaDigit(L.kalimatSeratus(s)) && tanpaDigit(L.kalimatSeratus(benarS.k)), "susun: kalimat tanpa digit");
  // Jembatan.
  for (let i = 0; i < 3; i += 1) {
    const k = { ...a, jemKe: i };
    const pil = L.pilihanJembatan(k);
    const d = L.desimalJembatan(k);
    cek(pil.length === 3 && new Set(pil).size === 3 && pil.includes(d) && pil[0] !== d && pil.every((x) => LC.pecahanDari(x) !== null), `jembatan: pilihan sasaran ${i} unik, semuanya nol koma, benar bukan yang pertama (${pil})`);
    const t = L.targetJembatan(k);
    cek(d === LC.desimalDari(t.m, t.den), `jembatan: desimal sasaran ${i} dihitung dari pecahan`);
  }
  cek(/Pilih satu desimal/.test(L.petunjukJembatan(a)) && !L.cekJembatan(a).ok && !L.periksaJembatan(a).ok && L.periksaJembatan(a).k.salah === 1, "jembatan: tanpa memilih, petunjuk menunjuk langkah yang belum dilakukan");
  {
    const pil = L.pilihanJembatan(a);
    const iBenar = pil.indexOf("0,5");
    const iSalah = pil.findIndex((x) => x !== "0,5");
    const pilihSalah = L.pilihJembatan(a, iSalah);
    cek(/Cek Jembatan dulu/.test(L.petunjukJembatan(pilihSalah)) && !L.periksaJembatan(pilihSalah).ok, "jembatan: belum Cek Jembatan, petunjuk menunjuk langkah itu dan Periksa ditolak");
    const cekSalah = L.cekJembatan(pilihSalah);
    cek(cekSalah.ok && cekSalah.k.jemCek && !cekSalah.cocok && /^0,\d+ = \d+\/\d+$/.test(cekSalah.teks) && !L.periksaJembatan(cekSalah.k).ok && tanpaDigit(L.petunjukJembatan(cekSalah.k)), "jembatan: Cek Jembatan menunjukkan pecahan hasil yang tidak sama, Periksa ditolak");
    const cekBenar = L.cekJembatan(L.pilihJembatan(a, iBenar));
    cek(cekBenar.ok && cekBenar.cocok && cekBenar.teks === "0,5 = 5/10", "jembatan: pilihan benar cocok dengan pecahan di kiri");
    const periksa = L.periksaJembatan(cekBenar.k);
    cek(periksa.ok && periksa.k.jemBenar.join() === "0" && periksa.k.jemKe === 1 && periksa.k.jemPilih === -1 && !periksa.k.jemCek, "jembatan: benar membuka jembatan berikutnya");
    sama(S.misiBaru(MK.MISI_D, periksa.k, new Set()), ["d-jembatan"], "jembatan: misi d-jembatan");
    cek(L.pilihJembatan(a, 5).jemPilih === -1 && L.pilihJembatan(pilihSalah, 1).jemCek === false, "jembatan: pilihan di luar daftar diabaikan, pilihan baru membatalkan cek");
    const dua = { ...a, jemKe: 1 };
    const c2 = L.cekJembatan(L.pilihJembatan(dua, L.pilihanJembatan(dua).indexOf("0,62")));
    cek(c2.cocok && c2.teks === "0,62 = 62/100", "jembatan: per seratus dua angka cocok");
    const tiga = { ...a, jemKe: 2 };
    const c3 = L.cekJembatan(L.pilihJembatan(tiga, L.pilihanJembatan(tiga).indexOf("0,08")));
    cek(c3.cocok && c3.teks === "0,08 = 8/100", "jembatan: nol penjaga tempat cocok");
  }
  cek(tanpaDigit(L.kalimatJembatan(a)) && tanpaDigit(L.kalimatJembatan({ ...a, jemCek: true })), "jembatan: kalimat tanpa digit");
  // Balik.
  for (let i = 0; i < 3; i += 1) {
    const k = { ...a, balKe: i };
    const pil = L.pilihanBalik(k);
    const p = L.pecahBalik(k);
    cek(pil.length === 3 && new Set(pil).size === 3 && pil.includes(p) && pil[0] !== p, `balik: pilihan sasaran ${i} unik, benar bukan yang pertama (${pil})`);
    const t = L.targetBalik(k);
    cek(p === `${t.m}/${t.den}` && L.desimalBalik(k) === LC.desimalDari(t.m, t.den), `balik: pecahan sasaran ${i} dihitung dari desimal`);
  }
  cek(/Pilih satu pecahan/.test(L.petunjukBalik(a)) && !L.periksaBalik(a).ok && L.periksaBalik(a).k.salah === 1, "balik: tanpa memilih, petunjuk menunjuk langkah yang belum dilakukan");
  {
    const pil = L.pilihanBalik(a);
    const salahB = L.pilihBalik(a, pil.findIndex((x) => x !== "2/10"));
    cek(!L.periksaBalik(salahB).ok && /banyak angka di belakang koma/.test(L.petunjukBalik(salahB)) && tanpaDigit(L.petunjukBalik(salahB)), "balik: pecahan keliru, petunjuk menyebut menghitung angka koma");
    const benarB = L.periksaBalik(L.pilihBalik(a, pil.indexOf("2/10")));
    cek(benarB.ok && benarB.k.balBenar.join() === "0" && benarB.k.balKe === 1 && benarB.k.balPilih === -1 && L.desimalBalik(benarB.k) === "0,73", "balik: benar membuka desimal berikutnya");
    sama(S.misiBaru(MK.MISI_D, benarB.k, new Set()), ["d-balik"], "balik: misi d-balik");
    cek(L.pilihBalik(a, 9).balPilih === -1 && tanpaDigit(L.kalimatBalik(a)) && tanpaDigit(L.kalimatBalik(benarB.k)), "balik: pilihan di luar daftar diabaikan, kalimat tanpa digit");
  }
  // Ganti alat dan mulai lagi.
  cek(L.pilihModeMeteran(a, "balik").mode === "balik" && L.mulaiLagiMeteran().mode === "sepuluh" && JSON.stringify(L.mulaiLagiMeteran()) === JSON.stringify(a) && L.hurufBesar("betul") === "Betul", "ganti alat dan mulai lagi");
  // Misi: awal tidak memenuhi, wajib empat, bebas dua.
  cek(MK.MISI_D.length === 6 && MK.MISI_D.filter((m) => m.wajib).length === 4 && MK.MISI_D.every((m) => m.id.startsWith("d-")) && MK.daftarMisiK4Bab2("D") === MK.MISI_D, "misi: enam misi, empat wajib dan dua bebas, id berawalan d-");
  cek(MK.MISI_D.every((m) => tanpaDigit(m.teks) && bersih(m.teks) && m.teks.length >= 10 && m.teks.length <= 120 && !/senilai/i.test(m.teks)), "misi: teks tanpa digit dan kata terlarang, 10 sampai 120 huruf");
  sama(S.misiBaru(MK.MISI_D, a, new Set()), [], "misi: keadaan awal tidak memenuhi misi");
  sama(S.misiBaru(MK.MISI_D, { ...a, sepBenar: [0, 1, 2], serBenar: [0], jemBenar: [0], balBenar: [0], tolak: true }, new Set()), ["d-sepuluh", "d-seratus", "d-jembatan", "d-balik", "d-tolak", "d-tiga"], "misi: semua tercapai");
}

/* ------------------------------ Pengenal ucapan ------------------------------ */
{
  sama([K.kataDariUcapan("persepuluhan"), K.kataDariUcapan("per sepuluhan"), K.kataDariUcapan("perseratusan"), K.kataDariUcapan("per seratus an"), K.kataDariUcapan("sama"), K.kataDariUcapan("berbeda"), K.kataDariUcapan("beda")], [["persepuluhan"], ["persepuluhan"], ["perseratusan"], ["perseratusan"], ["sama"], ["berbeda"], ["berbeda"]], "kata dari ucapan");
  sama([K.kataDariUcapan("tidak sama"), K.kataDariUcapan("bukan perseratusan"), K.kataDariUcapan("ini sama, tidak berbeda")], [[], [], ["sama"]], "kata yang didahului tidak atau bukan tidak dihitung");
  sama([K.angkaDariUcapan("tiga"), K.angkaDariUcapan("5"), K.angkaDariUcapan("tuju")], [[3], [5], [7]], "angka dari ucapan");
  const C = K.cocokUcapan;
  cek(C("persepuluhan", { jenis: "nama", nama: "persepuluhan" }).cocok && !C("perseratusan", { jenis: "nama", nama: "persepuluhan" }).cocok && C("sama", { jenis: "nama", nama: "sama" }).cocok && C("empat", { jenis: "angka", n: 4 }).cocok && !C("lima", { jenis: "angka", n: 4 }).cocok, "cocok ucapan");
}

/* ------------------------------ Mind-map dan Infografis ------------------------------ */
{
  cek(DK.KARTU_METERAN.length === 9, "mind-map: sembilan kartu");
  cek(DK.KARTU_METERAN.every((k) => ["masalah", "cara", "hasil"].every((b) => k[b].label.length > 0 && k[b].arti.length > 0)), "mind-map: tiap kartu punya masalah, cara, hasil");
  cek(DK.KARTU_METERAN.filter((k) => k.contoh.length > 0).length === 1 && DK.KARTU_METERAN[0].contoh.length === 1, "mind-map: satu kotak contoh di kartu pertama saja");
  const semuaLabel = DK.KARTU_METERAN.flatMap((k) => [k.masalah.label, k.cara.label, k.hasil.label]);
  cek(new Set(semuaLabel).size === semuaLabel.length, "mind-map: label tidak kembar");
  cek(semuaLabel.every((t) => t.split(/\s+/).every((w) => w.length <= 12) && t.length <= 24), "mind-map: kata label paling panjang dua belas huruf supaya muat di 344 px");
  cek(DK.KARTU_METERAN.every((k) => tanpaDigit(k.judul) && [k.masalah, k.cara, k.hasil].every((x) => tanpaDigit(x.label) && tanpaDigit(x.arti)) && bersih(JSON.stringify(k)) && !/senilai/i.test(JSON.stringify(k))), "mind-map: tanpa digit dan kata terlarang");
  const kartuTeks = JSON.stringify(DK.KARTU_METERAN);
  for (const m of ["Kisi Persepuluhan", "Kisi Perseratusan", "Jembatan Desimal"]) cek(kartuTeks.includes(m), `mind-map memuat metode ${m}`);
  // Ikon peta sesuai tema meteran dan kain.
  const TEMA_OK = new Set(["\u{1F9F5}", "\u{1F4CF}", "\u{1F9F6}", "\u{1F380}", "\u{2702}", "\u{1F9E3}", "\u{1F455}", "\u{1F457}", "\u{1F9E6}", "\u{1F9E4}"]);
  cek(DK.RINGKASAN_METERAN.ikon.length === 9 && new Set(DK.RINGKASAN_METERAN.ikon).size === 9 && DK.RINGKASAN_METERAN.ikon.every((e) => TEMA_OK.has(e)) && TEMA_OK.has(DK.RINGKASAN_METERAN.pusat) && DK.TEMA_KARTU_METERAN.ikon === "\u{1F4CF}", "mind-map: sembilan ikon berbeda semuanya benda kain atau alat ukur, pusat benang");
  cek(tanpaDigit(DK.RINGKASAN_METERAN.suara) && tanpaDigit(DK.SUARA_KARTU_METERAN) && tanpaDigit(DK.SELESAI_KARTU_METERAN), "mind-map: suara tanpa digit");
  cek(DK.BARIS_INFO_METERAN.length === 5 && DK.KOLOM_INFO_METERAN.length === 3 && DK.BARIS_INFO_METERAN.filter((b) => b.contoh.length > 0).length === 1 && DK.BARIS_INFO_METERAN[0].contoh.join() === "0,1,2", "infografis: lima baris tiga kolom, satu baris contoh penuh");
  cek(DK.BARIS_INFO_METERAN.every((b) => b.isi.every((c) => c.t.split(/\s+/).every((w) => w.length <= 12) && c.t.length <= 26) && b.nama.split(/\s+/).every((w) => w.length <= 12) && emojiSah(b.ikon) && tanpaDigit([b.nama, ...b.isi.map((c) => c.t)].join(" ")) && bersih(JSON.stringify(b))), "infografis: kata pendek muat di 344 px, emoji sah, tanpa digit dan kata terlarang");
  const infoTeks = JSON.stringify(DK.BARIS_INFO_METERAN);
  cek(/Nol koma tiga/.test(infoTeks) && /Nol koma dua tujuh/.test(infoTeks) && /Nol koma nol tiga/.test(infoTeks) && /Jembatan/.test(infoTeks), "infografis: memuat kejadian Story (nol koma tiga, dua tujuh, nol tiga, jembatan)");
  cek(tanpaDigit(DK.SUARA_INFO_METERAN) && tanpaDigit(DK.SELESAI_INFO_METERAN), "infografis: suara tanpa digit");
}

/* ------------------------------ CPA: dua belas langkah per tahap ------------------------------ */
const TAHAP = { CONCRETE: [D.CONCRETE, "benda", [2, 3, 4]], PICTORIAL: [D.PICTORIAL, "diagram", [5, 6, 7]], ABSTRACT: [D.ABSTRACT, "lambang", [8, 9, 10]] };
{
  cek(D.CONCRETE_METERAN === D.CONCRETE && D.PICTORIAL_METERAN === D.PICTORIAL && D.ABSTRACT_METERAN === D.ABSTRACT, "nama ekspor pemasang CONCRETE_METERAN, PICTORIAL_METERAN, ABSTRACT_METERAN");
  cek(D.TEMA_METERAN.concrete.nama === "Concrete" && D.TEMA_METERAN.pictorial.nama === "Pictorial" && D.TEMA_METERAN.abstract.nama === "Abstract" && Object.values(D.TEMA_METERAN).every((t) => adaEmoji(t.ikon) && emojiSah(t.ikon) && t.cara.length > 20 && bersih(t.cara)), "TEMA_METERAN: tiga tahap dengan ikon sah");
  const kanvasPerTahap = {};
  for (const [nama, [soal, rupa, nomor]] of Object.entries(TAHAP)) {
    sama(soal.map((m) => m.nomor), nomor, `${nama}: nomor misi lanjutan dari Simulasi`);
    sama(soal.map((m) => m.cara), ["klik", "kanvas", "suara"], `${nama}: cara klik, kanvas, suara`);
    cek(soal.every((m) => m.langkah.length === 4), `${nama}: empat langkah tiap misi`);
    cek(soal.every((m) => m.langkah.every((l, i) => l.metode === LC.URUT_METODE[i] && l.cara === m.cara)), `${nama}: langkah berurut IGIL, Tenths Grid, Hundredths Grid, Fraction Decimal Bridge`);
    cek(soal.every((m) => m.langkah.slice(1).every((l, i) => l.langkah.tipe === ["sepuluh", "seratus", "jembatan"][i] || (l.langkah.tipe === "salah" && l.langkah.dasar.tipe === ["sepuluh", "seratus", "jembatan"][i]))), `${nama}: langkah kedua sampai keempat memakai tiga metode global (kisi persepuluhan, kisi perseratusan, jembatan)`);
    cek(soal.every((m) => bersih(m.judul) && bersih(m.cerita) && /^Misi Meteran \d+: /.test(m.judul) && !/\d{2}/.test(m.cerita)), `${nama}: judul dan cerita bersih`);
    const salahan = soal.flatMap((m) => m.langkah).filter((l) => l.langkah.tipe === "salah");
    cek(salahan.length >= 1, `${nama}: ada tugas Cari kesalahan`);
    cek(soal.filter((m) => m.langkah.some((l) => l.langkah.tipe === "salah")).every((m) => m.cara === "klik"), `${nama}: Cari kesalahan hanya pada tugas Klik`);
    const kanvas = [];
    for (const m of soal)
      for (const ls of m.langkah) {
        const l = ls.langkah;
        const d = LC.dasarDari(l);
        const kunci = LC.kunciJawab(l, ls.cara);
        const ket = `${nama} misi ${m.nomor} ${ls.metode} ${d.tipe}`;
        // Jawaban benar dihitung dari data.
        const des = LC.desimalTugas(d);
        const m1 = LC.pembilangTugas(d);
        const den = LC.penyebutTugas(d);
        cek(des === LC.desimalDari(m1, den) && LC.pecahanDari(des).m === m1 && LC.pecahanDari(des).den === den, `${ket}: desimal sama dengan pecahan`);
        if (ls.cara === "klik") sama(kunci, { jenis: "nama", nama: des }, `${ket}: kunci klik adalah desimal`);
        if (ls.cara === "kanvas") {
          cek(kunci.jenis === "angka" && kunci.n >= 1 && kunci.n <= 9 && Number.isInteger(kunci.n), `${ket}: kanvas SATU angka 1 sampai 9`);
          kanvas.push(kunci.n);
          cek(kunci.n === (d.tipe === "sepuluh" ? d.p : d.tipe === "seratus" ? Math.floor(d.q / 10) : d.m % 10), `${ket}: angka kanvas dihitung dari data`);
        }
        if (ls.cara === "suara") {
          cek(kunci.jenis === "nama" && ["sama", "berbeda", "persepuluhan", "perseratusan"].includes(kunci.nama), `${ket}: suara satu kata pendek`);
          if (d.klaim !== undefined) cek(kunci.nama === (d.klaim === des ? "sama" : "berbeda") && /^0,\d{1,2}$/.test(d.klaim), `${ket}: sama atau berbeda dihitung dari data`);
          else cek(kunci.nama === (den === 10 ? "persepuluhan" : "perseratusan"), `${ket}: nama tempat sesuai penyebut`);
          const ps = LC.pilihanSuara(l, ls.cara);
          cek(ps.length >= 2 && new Set(ps).size === ps.length && ps.includes(LC.teksKunciPilihan(kunci)) && ps[0] !== LC.teksKunciPilihan(kunci), `${ket}: pilihan ketuk cadangan ada, jawaban benar bukan yang pertama`);
        }
        if (ls.cara === "klik") {
          const pk = LC.pilihanKlik(l);
          cek(pk.length === 3 && new Set(pk).size === 3 && pk.includes(des) && pk[0] !== des && pk.every((x) => /^\d,\d+$/.test(x)), `${ket}: tiga pilihan desimal unik, benar bukan yang pertama (${pk})`);
          if (l.tipe === "salah" && !l.betul) cek(pk.includes(l.jawabTokoh), `${ket}: jawaban tokoh yang keliru ikut sebagai pilihan`);
          const lain = pk.filter((x) => x !== des);
          cek(lain.every((x) => x !== des && Number(x.replace(",", ".")) !== Number(des.replace(",", "."))), `${ket}: pengecoh tidak sama besar dengan jawaban`);
        }
        // Tidak ambigu: hanya satu pilihan klik yang sama besar dengan pecahan.
        if (ls.cara === "klik") cek(LC.pilihanKlik(l).filter((x) => Number(x.replace(",", ".")) === m1 / den).length === 1, `${ket}: tepat satu pilihan sama besar dengan pecahan`);
        // Data berbeda dari Story (kecuali seed Cari kesalahan).
        if (l.tipe !== "salah") {
          cek(d.tipe === "sepuluh" ? !STORY_SEPULUH.includes(d.p) : d.tipe === "seratus" ? !STORY_SERATUS.includes(d.q) : den === 10 ? !STORY_SEPULUH.includes(d.m) : !STORY_SERATUS.includes(d.m), `${ket}: pecahan berbeda dari Story`);
        }
        // Batas data.
        if (d.tipe === "sepuluh") cek(d.p >= 1 && d.p <= 9 && DG_EMOJI[d.benda], `${ket}: p satu sampai sembilan, benda beremoji`);
        if (d.tipe === "seratus") cek(d.q >= 11 && d.q <= 99 && d.q % 10 !== 0 && Math.floor(d.q / 10) !== d.q % 10 && DG_EMOJI[d.benda], `${ket}: q dua angka berbeda, tidak berakhir nol, benda beremoji`);
        if (d.tipe === "jembatan") cek((den === 10 ? d.m >= 1 && d.m <= 9 : d.m >= 1 && d.m <= 99 && d.m % 10 !== 0) && DG_EMOJI[d.benda], `${ket}: pembilang sah, benda beremoji`);
        if (d.tipe === "seratus" || d.tipe === "sepuluh") cek(d.klaim === undefined || ls.cara === "suara", `${ket}: klaim hanya pada tugas suara`);
        // Instruksi dan kalimat.
        cek(tanpaDigit(ls.judul) && ls.judul === ls.suara && bersih(ls.judul) && !/senilai/i.test(ls.judul), `${ket}: instruksi tanpa digit dan kata terlarang`);
        if (rupa === "lambang") cek(!/gambar|petak|kisi/i.test(ls.judul), `${ket}: instruksi Abstract tanpa gambar, petak, kisi`);
        else cek(/gambar/.test(ls.judul) || l.tipe === "salah", `${ket}: instruksi menyebut gambar`);
        const kal = LC.kalimatKunci(l, ls.cara);
        cek(tanpaDigit(kal) && bersih(kal) && /^[A-Z]/.test(kal) && !/\s[.,!?]/.test(kal) && /[.!?]$/.test(kal) && !/senilai/i.test(kal), `${ket}: kalimat pembenaran berhuruf kapital tanpa spasi sebelum tanda baca`);
        cek(!/gambar|petak|kisi/i.test(kal), `${ket}: kalimat pembenaran tanpa gambar, petak, kisi (cocok untuk semua rupa)`);
        const tanya = LC.kalimatTanya(l, ls.cara);
        cek(tanpaDigit(tanya) && /\?$/.test(tanya), `${ket}: pertanyaan tanpa digit berakhir tanda tanya`);
        for (const jawab of [l.tipe === "salah" && l.betul ? "0,1" : des, "sama", 3, l.tipe === "salah" && !l.betul ? l.jawabTokoh : "0,1"]) {
          const pet = LC.petunjukSalah(l, ls.cara, jawab, rupa);
          cek(tanpaDigit(pet) && bersih(pet) && !pet.includes(LC.kataDes(des)) && !pet.includes(des), `${ket}: petunjuk salah tanpa digit dan tidak membocorkan jawaban`);
          if (rupa === "lambang" && !(l.tipe === "salah" && String(jawab) === l.jawabTokoh)) cek(!/gambar|petak|kisi|baris|kotak lepas|berwarna/i.test(pet), `${ket}: petunjuk Abstract tanpa gambar, petak, kisi, baris`);
        }
        if (ls.cara !== "suara") cek(LC.siapLangsung(l, rupa, ls.cara) === (l.tipe !== "salah"), `${ket}: siap langsung kecuali Cari kesalahan`);
        // Cari kesalahan.
        if (l.tipe === "salah") {
          cek(["Satria", "Laras", "Genta"].includes(l.tokoh) && l.alasan.length === 3 && new Set(l.alasan).size === 3 && l.benar >= 0 && l.benar <= 2, `${ket}: tokoh, tiga alasan berbeda, satu alasan benar`);
          cek(l.alasan.every((x) => /^[A-Z]/.test(x) && /[.]$/.test(x) && !/\s[.,!?]/.test(x) && tanpaDigit(x) && bersih(x)), `${ket}: alasan berhuruf kapital, tanpa digit`);
          if (!l.betul) cek(l.alasan.every((x) => !x.includes(LC.kataDes(des))) && !l.keliru.includes(LC.kataDes(des)), `${ket}: alasan dan penjelasan tidak menyebut hasil yang benar`);
          cek(tanpaDigit(l.kataTokoh) && bersih(l.kataTokoh) && tanpaDigit(l.keliru) && bersih(l.keliru) && l.kataTokoh.includes(l.tokoh === "Satria" ? "" : ""), `${ket}: kata tokoh dan penjelasan tanpa digit`);
          cek(LC.kataDes(l.jawabTokoh).length > 0 && (l.betul ? l.jawabTokoh === des : l.jawabTokoh !== des), `${ket}: jawaban tokoh ${l.betul ? "benar" : "keliru"} sesuai data`);
          const pk = LC.pilihanKlik(l);
          cek(l.betul ? pk.includes(l.jawabTokoh) : pk.includes(l.jawabTokoh) && l.jawabTokoh !== des, `${ket}: jawaban tokoh sesuai pilihan`);
          cek(LC.petunjukSalah(l, "klik", l.jawabTokoh, rupa).includes(l.tokoh), `${ket}: pilihan jawaban tokoh dijawab dengan petunjuk yang menyebut tokoh`);
        }
      }
    // Angka kanvas tidak kembar dalam satu tahap.
    cek(kanvas.length === 4 && new Set(kanvas).size === 4, `${nama}: empat angka kanvas tidak kembar (${kanvas})`);
    kanvasPerTahap[nama] = kanvas;
    // Jenis tugas beragam dan salah satunya Cari kesalahan dengan tokoh benar atau salah.
    cek(new Set(soal.flatMap((m) => m.langkah.map((l) => LC.dasarDari(l.langkah).tipe))).size === 3, `${nama}: ketiga jenis tugas (kisi persepuluhan, kisi perseratusan, jembatan) muncul`);
  }
  console.log("Angka kanvas per tahap:", JSON.stringify(kanvasPerTahap));
  const semuaSalah = Object.values(TAHAP).flatMap(([soal]) => soal.flatMap((m) => m.langkah.map((l) => l.langkah))).filter((l) => l.tipe === "salah");
  cek(semuaSalah.length === 3 && semuaSalah.filter((l) => l.betul).length === 1 && new Set(semuaSalah.map((l) => l.benar)).size >= 2, "Cari kesalahan: tiga tugas, satu tokoh benar, posisi alasan benar beragam");
  // Posisi alasan benar tidak selalu di tombol pertama: dihitung seperti LangkahMeteran.
  for (const l of semuaSalah) {
    const posisi = Array.from(`${l.tokoh}${l.kataTokoh}${l.alasan[l.benar]}`).reduce((t, c) => t + c.charCodeAt(0), 0) % 3;
    const lain = [0, 1, 2].filter((i) => i !== l.benar);
    const urut = [...lain.slice(0, posisi), l.benar, ...lain.slice(posisi)];
    cek(urut.indexOf(l.benar) === posisi, `Cari kesalahan ${l.tokoh}: posisi tombol alasan benar dihitung`);
  }
  {
    const pos = semuaSalah.map((l) => {
      const posisi = Array.from(`${l.tokoh}${l.kataTokoh}${l.alasan[l.benar]}`).reduce((t, c) => t + c.charCodeAt(0), 0) % 3;
      return posisi;
    });
    cek(new Set(pos).size >= 2, `Cari kesalahan: alasan benar tidak selalu di tombol yang sama (${pos})`);
  }
  // Poin penting dan jembatan.
  cek(D.POIN_PENTING.length === 6 && D.POIN_PENTING.every((p) => bersih(p) && !/senilai/i.test(p) && !/gambar|petak|kisi/i.test(p)) && D.POIN_PENTING_SUARA.every((p) => tanpaDigit(p) && p.length > 15), "poin penting: enam butir, suara tanpa digit, tanpa kata gambar atau kisi");
  cek(/koma/.test(D.POIN_PENTING_SUARA.join(" ")) && /per sepuluh/.test(D.POIN_PENTING_SUARA.join(" ")) && /per seratus/.test(D.POIN_PENTING_SUARA.join(" ")) && D.POIN_PENTING_SUARA.some((p) => /nol koma nol tiga/.test(p)), "poin penting: suara mengeja pecahan dan desimal");
  cek(tanpaDigit(D.PENUTUP_D) && bersih(D.PENUTUP_D) && /Bu Tuti/.test(D.PENUTUP_D) && /persen/.test(D.PENUTUP_D) && /nol koma lima/.test(D.PENUTUP_D), "penutup: jembatan ke Sub-Bab E (Bu Tuti dan persen)");
}

/* ------------------------------ Batas rupa, emoji, kata terlarang, akhir baris ------------------------------ */
{
  const berkas = readdirSync(folderUrl).filter((f) => /\.(ts|tsx)$/.test(f));
  for (const f of ["DaftarMeteran.tsx", "GambarMeteran.tsx", "JawabMeteran.tsx", "LangkahMeteran.tsx", "MeteranKain.tsx", "SimulasiMeteranKain.tsx", "TahapMeteran.tsx", "data-kartu.ts", "data-sim.ts", "data.ts", "logika-cpa.ts", "logika.ts", "periksa.ts", "tata.ts"]) cek(berkas.includes(f), `${f} ada`);
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folderUrl), "utf8");
    cek(emojiSah(s), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}/i.test(s), `${f}: kode emoji tidak melewati U+1FA95`);
    cek(![...s].some((c) => DILARANG_TAMPIL.includes(c.codePointAt(0))) && !new RegExp(DILARANG_TAMPIL.map((c) => `\\\\u\\{${c.toString(16)}\\}`).join("|"), "i").test(s), `${f}: tanpa emoji yang tampil kosong atau hitam di peramban Windows`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(!/senilai|nilai/i.test(s), `${f}: tanpa kata senilai atau nilai`);
    if (/\.ts$/.test(f)) cek(!/from "react"|fetch\(/.test(s), `${f}: logika murni tanpa React dan jaringan`);
  }
  // Pictorial tanpa emoji benda: kisi dan jembatan polos hanya memberi benda beremoji bila rupa benda.
  const gu = readFileSync(new URL("GambarMeteran.tsx", folderUrl), "utf8");
  cek((gu.match(/rupa === "benda"/g) ?? []).length >= 3 && /rupa === "lambang"/.test(gu) && /PapanInfo/.test(gu) && /PecahanTingkat/.test(gu), "gambar: emoji benda hanya pada rupa benda, kartu dan pecahan bertingkat pada lambang");
  for (const [k, v] of Object.entries(DG_EMOJI)) cek(adaEmoji(v) && emojiSah(v), `EMOJI_BENDA ${k}: emoji sah`);
  cek(Object.values(DG_EMOJI).length === 4 && new Set(Object.values(DG_EMOJI)).size === 4, "EMOJI_BENDA: empat benda kain, satu emoji untuk satu benda");
  // Cari kesalahan tidak membocorkan: pesan Lihat lagi dan alasan salah hanya mengarahkan.
  const lm = readFileSync(new URL("LangkahMeteran.tsx", folderUrl), "utf8");
  cek((lm.match(/Pikirkan lagi apa yang \$\{l\.tokoh\} lakukan/g) ?? []).length === 2 && !/\$\{l\.keliru\}/.test(lm) && !/salah\(`[^`]*alasan\[/.test(lm), "Cari kesalahan: pesan setelah salah memilih dan Lihat lagi hanya mengarahkan, tidak menyebut alasan atau hasil");
  cek(/siap\(`Betul! \$\{l\.alasan\[i\]\}`\)/.test(lm) && /Betul! "/.test(lm) === false, "Cari kesalahan: pembenaran Betul! diikuti alasan berhuruf kapital");
  cek(/petunjukSalah\(l, cara, j, rupa\)/.test(lm), "petunjuk salah mengetahui rupa (Abstract tanpa gambar)");
  // Simulasi: pesan lama dikosongkan, misiDaftar terpasang di SimulasiK4Bab2.tsx.
  const sm = readFileSync(new URL("SimulasiMeteranKain.tsx", folderUrl), "utf8");
  cek(/setCatatan\(ucap \?\? ""\)/.test(sm) && /petunjukTolak\(\)/.test(sm), "simulasi: pesan lama dikosongkan saat langkah berganti, penolakan dijelaskan");
  const sk = readFileSync(new URL("../src/components/modul/SimulasiK4Bab2.tsx", import.meta.url), "utf8");
  cek(/misiDaftar: daftarMisiMeteran\("D"\)\.map/.test(sk) && /SimulasiMeteranKain/.test(sk) && /laporMisiMeteran\(daftarMisiMeteran\("D"\), k, a\.capai\)/.test(sk), "SimulasiK4Bab2.tsx: Simulasi Meteran Kain terpasang dengan misiDaftar");
  const mp = readFileSync(new URL("MeteranKain.tsx", folderUrl), "utf8");
  const dm = readFileSync(new URL("DaftarMeteran.tsx", folderUrl), "utf8");
  const th = readFileSync(new URL("TahapMeteran.tsx", folderUrl), "utf8");
  cek(/export default function MeteranKainK4B2/.test(mp) && /export \{ MeteranKainK4B2 \}/.test(mp) && /export default function DaftarMeteranK4B2/.test(dm) && /export \{ DaftarMeteranK4B2 \}/.test(dm) && /export default function TahapMeteran/.test(th) && /export default function SimulasiMeteranKain/.test(sm), "ekspor komponen sesuai pemasang (default dan nama K4B2)");
  cek(/poinPenting/.test(th) && /PENUTUP_D/.test(th) && /POIN_PENTING_SUARA/.test(th), "tahap Abstract diakhiri Poin Penting dan jembatan ke Sub-Bab E");
}

console.log(`Lulus ${lulus}, gagal ${gagal}`);
process.exit(gagal ? 1 : 0);
