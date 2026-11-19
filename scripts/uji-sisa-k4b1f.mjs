// Uji Mind-map (Papan Sisa), Infografis (Daftar Sisa), Simulasi Papan Sisa, dan tahap Concrete, Pictorial, Abstract Kelas 4 Bab 1 Sub-Bab F ("Papan Sisa Pak Usman"),
// cerita Penginapan Pulau Karang Indah (pengurangan bersusun sampai seribu: dari satuan ke kiri, mengambil, hitung maju, periksa dengan tambah).
// Memeriksa: geometri balok cacah (banyak balok sesuai angka), logika simulasi (susun dengan mengambil dan alat menolak mengisi sebelum mengambil, hitung maju dengan alat menolak lompatan melewati tujuan,
// periksa dengan tambah dengan alat menolak memutuskan sebelum menambahkan), misi (awal tidak memenuhi, wajib empat, bebas dua), sembilan kartu geser Masalah, Cara, Hasil, daftar sisa dari kejadian Story,
// CPA dua belas langkah per tahap (Klik, Kanvas, Suara x empat metode) dengan jawaban beragam dan Cari kesalahan di tiap tahap, jawaban benar dihitung dari data, angka jawaban kanvas tidak kembar per tahap,
// tugas yang langsung siap (jebakan tombol macet), pengenal ucapan, petunjuk salah, batas rupa, emoji, kata terlarang, akhir baris.
// Jalankan: node --no-warnings scripts/uji-sisa-k4b1f.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/sisa-k4b1f/logika.ts");
const DS = await import("../src/components/modul/sisa-k4b1f/data-sim.ts");
const DK = await import("../src/components/modul/sisa-k4b1f/data-kartu.ts");
const LC = await import("../src/components/modul/sisa-k4b1f/logika-cpa.ts");
const D = await import("../src/components/modul/sisa-k4b1f/data.ts");
const K = await import("../src/components/modul/sisa-k4b1f/periksa.ts");
const B = await import("../src/components/modul/sisa-k4b1f/balok.ts");
const S = await import("../src/components/modul/misi-simulasi.ts");
const MK = await import("../src/components/modul/misi-k4bab1.ts");
const MT = await import("../src/components/modul/misi-teks-k4b1.ts");
const folderUrl = new URL("../src/components/modul/sisa-k4b1f/", import.meta.url);
/** Benda beremoji pada GambarSisa.tsx (kunci EMOJI_BENDA), dibaca dari teks karena berkas tsx tidak bisa diimpor di Node. */
const DG_EMOJI = {};
{
  const gu = readFileSync(new URL("GambarSisa.tsx", folderUrl), "utf8");
  const blok = /export const EMOJI_BENDA[^=]*=\s*\{([\s\S]*?)\n\};/.exec(gu)?.[1] ?? "";
  for (const m of blok.matchAll(/(?:"([^"]+)"|([a-z]+)):\s*"([^"]*)"/g)) DG_EMOJI[m[1] ?? m[2]] = m[3].replace(/\\u\{([0-9A-Fa-f]+)\}/g, (_, h) => String.fromCodePoint(parseInt(h, 16)));
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
const adaEmoji = (s) => /\p{Extended_Pictographic}/u.test(s);
/** Bilangan Story F (612, 275, 337, 463, 430, 158, 750, 840, 520, 345, 175): jangan dijadikan data CPA atau Simulasi. */
const CERITA = [612, 275, 337, 463, 430, 158, 750, 840, 520, 345, 175, 800];
const dig = (n) => [Math.floor(n / 100), Math.floor(n / 10) % 10, n % 10];
const angkaDi = (n, t) => dig(n)[t === "ratusan" ? 0 : t === "puluhan" ? 1 : 2];

/* ------------------------------ Kata bilangan ------------------------------ */
{
  sama([0, 1, 9, 10, 11, 15, 20, 38, 100, 305, 612, 999].map(LC.kataBil), ["nol", "satu", "sembilan", "sepuluh", "sebelas", "lima belas", "dua puluh", "tiga puluh delapan", "seratus", "tiga ratus lima", "enam ratus dua belas", "sembilan ratus sembilan puluh sembilan"], "kata bilangan CPA");
  cek(LC.kata === LC.kataBil, "alias kata");
  for (let n = 1; n <= 999; n += 1) cek(tanpaDigit(LC.kataBil(n)) && LC.kataBil(n) === L.kata(n), `kata bilangan ${n} sama di simulasi dan CPA`);
  sama([LC.ucapkan("612 − 275 = 337"), LC.ucapkan("337 + 275 = 612"), LC.ucapkan("satuan")], ["enam ratus dua belas dikurangi dua ratus tujuh puluh lima sama dengan tiga ratus tiga puluh tujuh", "tiga ratus tiga puluh tujuh ditambah dua ratus tujuh puluh lima sama dengan enam ratus dua belas", "satuan"], "ucapkan: angka dan lambang menjadi kata");
}

/* ------------------------------ Geometri balok cacah ------------------------------ */
{
  for (let n = 0; n <= 999; n += 1) {
    const b = B.susunBalok(n, { x: 16, y: 40 });
    const [r, p, s] = dig(n);
    sama(B.hitungBalok(b), [r, p, s], `balok ${n}: banyak ratusan, puluhan, satuan sesuai angka`);
    cek(b.every((q) => q.x >= 16 && q.x + q.w <= 292 && q.y >= 40 && q.y + q.h <= 40 + B.TINGGI_BARIS), `balok ${n}: masuk kanvas`);
    let tumpang = false;
    for (let i = 0; i < b.length; i += 1) for (let j = i + 1; j < b.length; j += 1) if (Math.min(b[i].x + b[i].w, b[j].x + b[j].w) - Math.max(b[i].x, b[j].x) > 0.01 && Math.min(b[i].y + b[i].h, b[j].y + b[j].h) - Math.max(b[i].y, b[j].y) > 0.01) tumpang = true;
    cek(!tumpang, `balok ${n}: balok tidak bertumpuk`);
    cek(B.lebarBalok(n) <= 270, `balok ${n}: lebar muat (${B.lebarBalok(n)})`);
    const jenis = b.map((q) => q.jenis);
    cek(jenis.join() === [...jenis].sort((x, y) => ["ratusan", "puluhan", "satuan"].indexOf(x) - ["ratusan", "puluhan", "satuan"].indexOf(y)).join(), `balok ${n}: urut ratusan, puluhan, satuan`);
  }
  cek(B.susunBalok(0, { x: 0, y: 0 }).length === 0 && B.lebarBalok(0) === 0, "balok nol kosong");
}

/* ------------------------------ Hitungan pengurangan ------------------------------ */
{
  sama([LC.tempatAmbil(612, 275), LC.tempatAmbil(421, 156), LC.tempatAmbil(745, 382), LC.tempatAmbil(835, 211)], [[true, true, false], [true, true, false], [false, true, false], [false, false, false]], "tempat yang mengambil dari satuan ke kiri");
  sama([LC.banyakAmbil(612, 275), LC.ambilPertama(612, 275), LC.ambilPertama(745, 382), LC.ambilPertama(835, 211)], [2, "satuan", "puluhan", null], "banyak dan tempat pertama yang mengambil");
  sama([LC.hasilTukar(421, 156), LC.hasilLupa(462, 138), LC.hasilTukar(462, 138), LC.hasilKurang(421, 156)], [335, 334, 336, 265], "kesalahan Satria membalik dan lupa mencoret berbeda dari hasil benar");
  sama([LC.ruteMaju(372, 348), LC.ruteMaju(815, 767), LC.ruteMaju(941, 896), LC.ruteMaju(701, 685)], [[348, 350, 370, 372], [767, 770, 800, 815], [896, 900, 940, 941], [685, 690, 700, 701]], "rute hitung maju");
  sama([LC.lompatMaju(815, 767), LC.lompatPertama(767), LC.lompatPertama(496)], [[3, 30, 15], 3, 4], "lompatan hitung maju");
  for (let a = 100; a <= 999; a += 7) for (let b = 11; b < a; b += 13) {
    cek(LC.lompatMaju(a, b).reduce((t, v) => t + v, 0) === a - b, `lompatan ${a} - ${b} berjumlah selisih`);
    cek(LC.ruteMaju(a, b)[0] === b && LC.ruteMaju(a, b).at(-1) === a, `rute ${a} - ${b} dari kecil ke besar`);
  }
}

/* ------------------------------ Simulasi: data dan logika ------------------------------ */
{
  cek(DS.TARGET_SUSUN.length === 3 && DS.TARGET_SUSUN.every((t) => t.a > t.b && t.a >= 100 && t.a <= 999 && t.b >= 100 && ![t.a, t.b, t.a - t.b].some((n) => CERITA.includes(n)) && dig(t.a)[1] >= 1 && DG_EMOJI[t.benda]), "simulasi: tiga soal susun tiga angka, bukan data Story, tanpa nol di puluhan, benda beremoji");
  sama(DS.TARGET_SUSUN.map((t) => LC.banyakAmbil(t.a, t.b)), [1, 2, 1], "simulasi susun: satu kali, dua kali, satu kali mengambil");
  sama(DS.TARGET_SUSUN.map((t) => LC.ambilPertama(t.a, t.b)), ["satuan", "satuan", "puluhan"], "simulasi susun: tempat pertama yang mengambil");
  cek(DS.TARGET_MAJU.length === 3 && DS.TARGET_MAJU.every((t) => t.a > t.b && t.b % 10 !== 0 && Math.ceil(t.b / 10) * 10 <= t.a && t.a - t.b >= 10 && t.a - t.b <= 60 && ![t.a, t.b].some((n) => CERITA.includes(n)) && DG_EMOJI[t.benda]) && new Set(DS.TARGET_MAJU.map((t) => t.a - t.b)).size === 3, "simulasi maju: tiga soal, selisih berbeda, bukan data Story");
  cek(DS.TARGET_CEK.length === 3 && DS.TARGET_CEK.every((t) => dig(t.a)[1] >= 1 && ![t.a, t.b, t.klaim].some((n) => CERITA.includes(n)) && DG_EMOJI[t.benda]) && DS.TARGET_CEK.filter((t) => t.klaim === t.a - t.b).length === 1 && DS.TARGET_CEK[0].klaim === DS.TARGET_CEK[0].a - DS.TARGET_CEK[0].b, "simulasi cek: tiga catatan, satu benar dan dua keliru, bukan data Story");
  cek(tanpaDigit(DS.MISI_SISA_TEKS) && bersih(DS.MISI_SISA_TEKS) && DS.MISI_SISA_TEKS === MT.MISI_K4B1.F && D.MISI_SISA_TEKS === DS.MISI_SISA_TEKS && DS.MISI_SISA_TEKS.length >= 10 && DS.MISI_SISA_TEKS.length <= 130, "simulasi: teks misi tanpa digit dan kata terlarang, sama dengan misi-teks-k4b1");

  const a = L.awalSisa();
  cek(a.alat === "sisa" && a.mode === "susun" && a.atas.join() === "6,4,8" && a.kolom === 2 && a.hasil.join() === "-1,-1,-1" && !a.tolak && a.salah === 0 && a.lompat.length === 0 && a.posisi === 438 && !a.sudahTambah && a.putus === -1 && ["susunBenar", "majuBenar", "cekBenar"].every((f) => a[f].length === 0) && a.tangkap === 0, "simulasi: keadaan awal");
  // Susun soal pertama 648 - 219: satuan 8 < 9 harus mengambil.
  cek(L.selisihTempat(a) === -1 && /Ambil dari kiri dulu/.test(L.petunjukSusun(a)) && tanpaDigit(L.petunjukSusun(a)), "susun: angka atas lebih kecil, petunjuk menunjuk Ambil dari kiri");
  const p0 = L.pilihanHasil(a);
  cek(p0.length === 3 && p0.includes(1), "susun: sebelum mengambil pilihan memuat hasil membalik angka");
  const tolak = L.isiHasil(a, p0[0]);
  cek(!tolak.ok && tolak.k.tolak === true && tolak.k.salah === 0 && tolak.k.hasil.join() === "-1,-1,-1", "susun: alat menolak mengisi hasil sebelum mengambil (bukan percobaan keliru)");
  sama(S.misiBaru(MK.MISI_F, tolak.k, new Set()), ["f-tolak"], "susun: misi f-tolak");
  const am = L.ambilKiri(a);
  cek(am.ok && am.k.atas.join() === "6,3,18" && am.k.ambil.join() === "false,false,true" && L.selisihTempat(am.k) === 9, "susun: mengambil menambah sepuluh di satuan dan mengurangi satu di puluhan");
  const bukan = L.ambilKiri(am.k);
  cek(!bukan.ok && bukan.k === am.k, "susun: mengambil lagi saat angka atas sudah cukup ditolak tanpa mengubah keadaan");
  const pl = L.pilihanHasil(am.k);
  cek(pl.length === 3 && new Set(pl).size === 3 && pl.includes(9) && pl[0] !== 9, `susun: pilihan tempat satuan unik dan benar bukan yang pertama (${pl})`);
  const keliru = L.isiHasil(am.k, 8);
  cek(!keliru.ok && keliru.k.salah === 1 && keliru.k.kolom === 2 && /Jangan membalik/.test(L.petunjukSusun(am.k)) && tanpaDigit(L.petunjukSusun(am.k)), "susun: hasil keliru dihitung percobaan, petunjuk menyebut membalik");
  let s = am.k;
  s = L.isiHasil(s, 9).k;
  cek(s.kolom === 1 && s.hasil.join() === "-1,-1,9", "susun: hasil satuan terisi, pindah ke puluhan");
  // Jalankan penuh soal 1: 648 - 219 = 429 (puluhan 3 - 1 = 2).
  {
    let k = L.ambilKiri(a).k;
    k = L.isiHasil(k, 9).k;
    const r = L.isiHasil(k, 2);
    cek(r.ok && r.k.kolom === 0, "susun soal 1: puluhan tiga dikurangi satu sama dengan dua");
    const t = L.isiHasil(r.k, 4);
    cek(t.ok && t.selesai && t.k.susunBenar.join() === "0" && t.k.susunKe === 1 && t.k.atas.join() === "7,5,3" && t.k.kolom === 2 && t.k.hasil.join() === "-1,-1,-1" && !t.k.ambil.some(Boolean), "susun soal 1: ratusan terisi, soal selesai dan soal kedua muncul");
    sama(S.misiBaru(MK.MISI_F, t.k, new Set()), ["f-susun"], "susun: misi f-susun");
    // Soal 2: 753 - 468 mengambil dua kali.
    let u = t.k;
    cek(L.selisihTempat(u) === -5 && !L.isiHasil(u, 5).ok, "susun soal 2: satuan tiga kurang dari delapan");
    u = L.ambilKiri(u).k;
    u = L.isiHasil(u, 5).k;
    cek(u.kolom === 1 && L.selisihTempat(u) === -2 && L.ambilKiri(u).ok, "susun soal 2: puluhan menjadi empat, kurang dari enam, mengambil lagi");
    u = L.ambilKiri(u).k;
    u = L.isiHasil(u, 8).k;
    cek(u.kolom === 0 && u.atas.join() === "6,14,13" && L.selisihTempat(u) === 2, "susun soal 2: dua kali mengambil, ratusan tinggal enam");
    const t2 = L.isiHasil(u, 2);
    cek(t2.ok && t2.selesai && t2.k.susunBenar.join() === "0,1" && t2.k.atas.join() === "8,4,5", "susun soal 2: selesai dua ratus delapan puluh lima");
    sama(S.misiBaru(MK.MISI_F, t2.k, new Set()), ["f-susun", "f-ambil"], "susun: misi f-susun dan f-ambil");
    // Soal 3: 845 - 371 mengambil di puluhan.
    let w = t2.k;
    cek(L.selisihTempat(w) === 4 && L.isiHasil(w, 4).ok, "susun soal 3: satuan lima dikurangi satu");
    w = L.isiHasil(w, 4).k;
    cek(L.selisihTempat(w) === -3 && L.ambilKiri(w).ok && L.ambilKiri(w).k.atas.join() === "7,14,5", "susun soal 3: mengambil satu ratusan menjadikan puluhan empat belas");
  }
  // Tempat ratusan tidak bisa mengambil (tidak ada tempat di kirinya).
  cek(!L.ambilKiri({ ...a, kolom: 0, atas: [1, 4, 8] }).ok, "susun: tempat ratusan tidak punya tempat di kiri untuk diambil");
  cek(!L.isiHasil({ ...a, kolom: -1 }, 3).ok && /sudah selesai/.test(L.petunjukSusun({ ...a, kolom: -1 })), "susun: soal yang sudah selesai tidak menerima isian");
  cek(tanpaDigit(L.kalimatSusun(a)) && tanpaDigit(L.kalimatSusun(am.k)) && tanpaDigit(L.kalimatSusun({ ...a, kolom: -1 })) && tanpaDigit(L.kalimatSusun({ ...a, susunBenar: [0] })), "susun: kalimat tanpa digit");

  // Maju.
  const mj = L.pilihModeSisa(a, "maju");
  cek(L.selisihMaju(mj) === 24 && /Belum ada lompatan/.test(L.petunjukMaju(mj)) && !L.periksaMaju(mj).ok && L.periksaMaju(mj).k.salah === 1, "maju: tanpa lompatan, Periksa ditolak dengan petunjuk yang menunjuk langkah yang belum dilakukan");
  cek(L.pilihMaju(mj, 0).majuPilih === -1, "maju: memilih selisih sebelum sampai tujuan diabaikan");
  const j1 = L.lompatMaju(mj, "puluhan");
  cek(j1.ok && j1.k.posisi === 440 && j1.k.lompat.join() === "2" && /Belum sampai tujuan/.test(L.petunjukMaju(j1.k)), "maju: lompat ke puluhan bulat berikutnya");
  const lewat = L.lompatMaju(j1.k, "ratusan");
  cek(!lewat.ok && lewat.k.tolak === true && lewat.k.posisi === 440 && lewat.k.salah === 0, "maju: alat menolak lompatan ke ratusan bulat yang melewati tujuan");
  sama(S.misiBaru(MK.MISI_F, lewat.k, new Set()), ["f-tolak"], "maju: misi f-tolak");
  const j2 = L.lompatMaju(j1.k, "puluhan");
  cek(j2.ok && j2.k.posisi === 450, "maju: lompat puluhan lagi");
  const j3 = L.lompatMaju(j2.k, "puluhan");
  const j4 = L.lompatMaju(j3.k, "tujuan");
  cek(j4.ok && j4.k.posisi === 462 && j4.k.lompat.reduce((t, v) => t + v, 0) === 24 && !L.lompatMaju(j4.k, "puluhan").ok && L.urungLompat(j4.k).k.lompat.length === j4.k.lompat.length - 1, "maju: sampai tujuan, jumlah lompatan sama dengan selisih, lompatan melewati tujuan ditolak, lompatan bisa diurungkan");
  cek(!L.urungLompat(mj).ok, "maju: tidak ada lompatan untuk diurungkan");
  cek(/Pilih selisihnya/.test(L.petunjukMaju(j4.k)) && !L.periksaMaju(j4.k).ok, "maju: sudah sampai tujuan, belum memilih selisih");
  const pm = L.pilihanMaju(j4.k);
  cek(pm.length === 3 && new Set(pm).size === 3 && pm.includes(24) && pm[0] !== 24, `maju: pilihan selisih unik dan benar bukan yang pertama (${pm})`);
  const pmSalah = L.pilihMaju(j4.k, pm.findIndex((x) => x !== 24));
  cek(!L.periksaMaju(pmSalah).ok && /jumlah semua lompatan/.test(L.petunjukMaju(pmSalah)) && tanpaDigit(L.petunjukMaju(pmSalah)), "maju: selisih keliru, petunjuk menyebut jumlah semua lompatan");
  const mBetul = L.periksaMaju(L.pilihMaju(j4.k, pm.indexOf(24)));
  cek(mBetul.ok && mBetul.k.majuBenar.join() === "0" && mBetul.k.majuKe === 1 && mBetul.k.posisi === 877 && mBetul.k.lompat.length === 0 && mBetul.k.majuPilih === -1, "maju: benar membuka bilangan berikutnya dari awal");
  sama(S.misiBaru(MK.MISI_F, mBetul.k, new Set()), ["f-maju"], "maju: misi f-maju");
  {
    // Lompatan penuh pada soal 2: 877 sampai 905 lewat puluhan bulat, ratusan bulat, dan tujuan.
    let k = mBetul.k;
    k = L.lompatMaju(k, "puluhan").k;
    cek(k.posisi === 880, "maju soal 2: puluhan bulat berikutnya");
    k = L.lompatMaju(k, "ratusan").k;
    cek(k.posisi === 900 && k.lompat.join() === "3,20", "maju soal 2: ratusan bulat berikutnya");
    k = L.lompatMaju(k, "tujuan").k;
    cek(k.posisi === 905 && L.selisihMaju(k) === 28, "maju soal 2: tujuan");
  }
  cek(L.pilihanMaju(j1.k).length === 3 && L.kalimatMaju(mj) !== "" && tanpaDigit(L.kalimatMaju(mj)) && tanpaDigit(L.kalimatMaju(j1.k)) && tanpaDigit(L.kalimatMaju(j4.k)) && tanpaDigit(L.kalimatMaju(mBetul.k)), "maju: kalimat tanpa digit");
  // Cek.
  const ck = L.pilihModeSisa(a, "cek");
  cek(L.targetCek(ck).klaim === 349 && L.klaimBenar(ck) && L.jumlahCek(ck) === 634 && L.sebenarnyaCek(ck) === 349 && /Tekan Tambahkan dulu/.test(L.petunjukCek(ck)) && tanpaDigit(L.petunjukCek(ck)) && !L.periksaCek(ck).ok, "cek: catatan pertama benar, Periksa sebelum menambahkan ditolak dengan petunjuk");
  const pt = L.putusCek(ck, 0);
  cek(!pt.ok && pt.k.tolak === true && pt.k.putus === -1 && pt.k.salah === 0, "cek: alat menolak memutuskan sebelum menambahkan");
  sama(S.misiBaru(MK.MISI_F, pt.k, new Set()), ["f-tolak"], "cek: misi f-tolak");
  const tb = L.tambahCek(ck);
  cek(tb.sudahTambah && /Pilih dulu/.test(L.petunjukCek(tb)) && !L.periksaCek(tb).ok, "cek: sudah menambahkan, belum memutuskan");
  const pSalah = L.putusCek(tb, 1);
  cek(pSalah.ok && !L.periksaCek(pSalah.k).ok && /Bandingkan jumlahnya/.test(L.petunjukCek(pSalah.k)) && L.periksaCek(pSalah.k).k.salah === 1, "cek: memutuskan salah padahal benar, keliru");
  const cBetul = L.periksaCek(L.putusCek(tb, 0).k);
  cek(cBetul.ok && cBetul.k.cekBenar.join() === "0" && cBetul.k.cekKe === 1 && !cBetul.k.sudahTambah && cBetul.k.putus === -1 && cBetul.k.tangkap === 0, "cek: catatan benar diputuskan benar, membuka catatan berikutnya tanpa menangkap kesalahan");
  sama(S.misiBaru(MK.MISI_F, cBetul.k, new Set()), ["f-cek"], "cek: misi f-cek");
  const c2 = L.tambahCek(cBetul.k);
  cek(L.targetCek(c2).klaim === 289 && !L.klaimBenar(c2) && L.jumlahCek(c2) === 581 && L.sebenarnyaCek(c2) === 279, "cek catatan kedua: keliru, jumlah berbeda dari bilangan awal");
  const tangkap = L.periksaCek(L.putusCek(c2, 1).k);
  cek(tangkap.ok && tangkap.k.tangkap === 1 && tangkap.k.cekKe === 2, "cek: catatan keliru diputuskan salah, kesalahan tertangkap");
  sama(S.misiBaru(MK.MISI_F, tangkap.k, new Set()), ["f-cek", "f-tangkap"], "cek: misi f-cek dan f-tangkap");
  cek(!L.periksaCek(L.putusCek(c2, 0).k).ok, "cek: catatan keliru diputuskan benar, keliru");
  cek(tanpaDigit(L.kalimatCek(ck)) && tanpaDigit(L.kalimatCek(tb)) && tanpaDigit(L.kalimatCek(cBetul.k)), "cek: kalimat tanpa digit");
  // Mulai lagi dan ganti alat.
  cek(L.mulaiLagiSisa().susunKe === 0 && L.mulaiLagiSisa().cekKe === 0 && !L.mulaiLagiSisa().tolak && L.pilihModeSisa(a, "cek").mode === "cek", "mulai lagi dan ganti alat");
  // Misi.
  const M = MK.MISI_F;
  cek(M.length === 6 && M.filter((m) => m.wajib).length === 4 && M.filter((m) => !m.wajib).length === 2 && M.every((m) => m.id.startsWith("f-")) && MK.daftarMisiK4Bab1("F") === M, "misi F: enam misi, empat wajib, dua bebas");
  cek(S.misiBaru(M, a, new Set()).length === 0, "misi F: keadaan awal tidak memenuhi misi");
  cek(M.every((m) => !m.cek({ alat: "kerangka" })) && M.every((m) => !/\d/.test(m.teks) && bersih(m.teks) && m.teks.length > 10 && m.teks.length < 120), "misi F: alat lain tidak memenuhi, teks tanpa digit dan kata terlarang");
  cek(S.misiBaru(M, { ...a, salah: 9, kolom: 0, atas: [5, 14, 13], ambil: [false, true, true], hasil: [-1, 8, 5], posisi: 450, lompat: [2, 10], majuPilih: 1, sudahTambah: true, putus: 0 }, new Set()).length === 0, "misi F: percobaan keliru, langkah setengah jalan, dan pilihan yang belum diperiksa tidak dihitung sebagai misi");
  sama(S.misiBaru(M, { ...a, susunBenar: [0], majuBenar: [0], cekBenar: [0, 1], tolak: true, tangkap: 1 }, new Set()), ["f-susun", "f-maju", "f-cek", "f-tolak", "f-tangkap"], "misi F: semua kecuali f-ambil");
  sama(S.misiBaru(M, { ...a, susunBenar: [0, 1], majuBenar: [0], cekBenar: [0], tolak: true, tangkap: 1 }, new Set()), ["f-susun", "f-ambil", "f-maju", "f-cek", "f-tolak", "f-tangkap"], "misi F: semua misi tercapai");
}

/* ------------------------------ Mind-map: papan sisa (sembilan kartu geser) ------------------------------ */
{
  const KA = DK.KARTU_SISA;
  cek(KA.length === 9, "kartu: sembilan kartu");
  cek(KA.every((k) => k.contoh.length <= 1) && KA[0].contoh.join() === "masalah" && KA.slice(1).every((k) => k.contoh.length === 0), "kartu: satu kotak contoh di kartu pertama saja, sisanya mandiri");
  const semua = KA.flatMap((k) => [k.masalah, k.cara, k.hasil]);
  const label = semua.map((x) => x.label);
  cek(new Set(label).size === label.length, "kartu: label unik");
  cek(semua.every((x) => x.label.length >= 5 && x.label.length <= 36), `kartu: label pendek (terpanjang ${Math.max(...label.map((l) => l.length))} huruf)`);
  cek(KA.every((k) => [k.masalah.label, k.cara.label, k.hasil.label].every((l) => l.split(/\s+/).length <= 6)), "kartu: label paling banyak enam kata");
  cek(semua.every((x) => tanpaDigit(x.label) && tanpaDigit(x.arti) && bersih(x.label) && bersih(x.arti) && x.arti.length > 10), "kartu: label dan arti tanpa digit dan kata terlarang");
  cek(KA.every((k) => tanpaDigit(k.judul) && bersih(k.judul) && k.judul.length > 3), "kartu: judul bersih");
  const cara = KA.map((k) => k.cara.label).join(" | ");
  for (const m of ["Susun dan Pinjam", "Hitung Maju", "Periksa dengan Tambah", "Dikurangkan", "Tulis ke bawah", "Mulai dari satuan", "Ambil dari kiri", "Jangan dibalik"]) cek(cara.toLowerCase().includes(m.toLowerCase()), `kartu: cara memuat ${m}`);
  const gab = KA.map((k) => [k.judul, k.masalah.label, k.cara.label, k.hasil.label, k.masalah.arti, k.cara.arti, k.hasil.arti].join(" ")).join(" ").toLowerCase();
  for (const s of ["pengurangan", "susun", "satuan", "ambil", "sepuluh", "puluhan bulat", "selisih", "lompat", "tambah", "bilangan awal", "membalik", "dua kali"]) cek(gab.includes(s), `kartu: memuat poin "${s}"`);
  cek(!new RegExp("\\b(satria|laras|genta|pak hendro|pak usman|bu marni|dermaga|sandal|koper|perahu)\\b", "i").test(gab), "kartu: hanya poin pelajaran (tanpa tokoh dan benda cerita)");
  cek(tanpaDigit(DK.SUARA_KARTU_SISA + DK.SELESAI_KARTU_SISA) && bersih(DK.SUARA_KARTU_SISA + DK.SELESAI_KARTU_SISA), "kartu: suara dan pesan selesai tanpa digit dan kata terlarang");
  cek(emojiSah(DK.TEMA_KARTU_SISA.ikon) && DK.TEMA_KARTU_SISA.judul.length > 5 && bersih(DK.TEMA_KARTU_SISA.judul), "kartu: tema sah");
  const RG = DK.RINGKASAN_SISA;
  cek(RG.ikon.length === DK.KARTU_SISA.length && new Set(RG.ikon).size === RG.ikon.length && [...RG.ikon, RG.pusat].every((e) => emojiSah(e) && !/[A-Za-z0-9]/.test(e)), "peta radial: satu gambar unik per kartu, gambar sah tanpa huruf");
  cek(tanpaDigit(RG.suara) && bersih(RG.suara) && !RG.ikon.includes(RG.pusat), "peta radial: suara bersih dan pusat berbeda dari cabang");
}

/* ------------------------------ Infografis: daftar sisa (satu tabel lima baris) ------------------------------ */
{
  const BI = DK.BARIS_INFO_SISA;
  cek(BI.length === 5 && DK.KOLOM_INFO_SISA.length === 3, "infografis: lima baris dan tiga kolom");
  cek(BI.every((b) => b.isi.length === 3 && emojiSah(b.ikon) && b.nama.length > 4), "infografis: tiap baris tiga isian, emoji sah");
  const jumlahContoh = BI.map((b) => b.contoh.length);
  cek(jumlahContoh[0] === 3 && jumlahContoh.slice(1).every((n) => n === 0), "infografis: baris satu penuh contoh, baris dua sampai lima mandiri");
  const semua = BI.flatMap((b) => b.isi);
  cek(BI.every((b) => new Set(b.isi.map((x) => x.t)).size === 3), "infografis: tiga label tiap baris berbeda");
  cek(new Set(semua.map((x) => x.t)).size === semua.length, "infografis: semua label unik");
  cek(semua.every((x) => x.t.length <= 28 && x.t.split(/\s+/).length <= 5 && bersih(x.t) && bersih(x.s ?? "")), "infografis: label pendek (paling banyak lima kata) dan tanpa kata terlarang");
  cek(semua.every((x) => tanpaDigit(x.s ?? x.t)), "infografis: ucapan label tanpa digit");
  const gab = BI.map((b) => [b.nama, ...b.isi.map((x) => x.t)].join(" ")).join(" ").toLowerCase();
  for (const s of ["menyusun ke bawah", "mengambil dari kiri", "salah membalik angka", "hitung maju", "memeriksa hasil", "satu jadi sepuluh", "jumlah lompatan", "sama dengan awal", "salah langsung ketahuan"]) cek(gab.includes(s), `infografis: memuat "${s}"`);
  cek(!new RegExp("\\b(satria|laras|genta|pak hendro|pak usman)\\b", "i").test(gab), "infografis: tanpa nama tokoh");
  cek(tanpaDigit(DK.SUARA_INFO_SISA + DK.SELESAI_INFO_SISA) && bersih(DK.SUARA_INFO_SISA + DK.SELESAI_INFO_SISA) && emojiSah(DK.TEMA_INFO_SISA.ikon), "infografis: suara dan tema bersih");
}

/* ------------------------------ Pengenal ucapan ------------------------------ */
{
  const nm = (nama) => ({ jenis: "nama", nama });
  const an = (n) => ({ jenis: "angka", n });
  for (const nama of ["satuan", "puluhan", "ratusan", "sama", "berbeda"]) cek(K.cocokUcapan(nama, nm(nama)).cocok && K.kataDariUcapan(nama).length === 1, `cocok: kata ${nama} dikenali tepat satu`);
  sama(K.kataDariUcapan("tempat puluhan"), ["puluhan"], "ucapan: tempat puluhan dikenali sebagai puluhan");
  sama(K.kataDariUcapan("tidak sama"), [], "ucapan: tidak sama tidak dihitung");
  sama(K.kataDariUcapan("bukan satuan"), [], "ucapan: bukan satuan tidak dihitung");
  sama(K.kataDariUcapan("beda"), ["berbeda"], "ucapan: beda dikenali sebagai berbeda");
  sama(K.kataDariUcapan("halo"), [], "ucapan: kata lain tidak dikenali");
  cek(!K.cocokUcapan("satuan", nm("puluhan")).cocok && !K.cocokUcapan("sama", nm("berbeda")).cocok && !K.cocokUcapan("ratusan", nm("satuan")).cocok, "cocok: kata berbeda tidak cocok");
  for (let n = 0; n <= 999; n += 1) cek(K.angkaDariUcapan(LC.kataBil(n)).join() === String(n), `angka: kata bilangan ${n} dikenali utuh (${LC.kataBil(n)} -> ${K.angkaDariUcapan(LC.kataBil(n))})`);
  cek(K.cocokUcapan("dua ratus enam puluh lima", an(265)).cocok && K.cocokUcapan("265", an(265)).cocok && !K.cocokUcapan("dua ratus enam puluh", an(265)).cocok, "cocok: bilangan tiga angka dikenali utuh");
  cek(K.cocokUcapan("sebelas", an(11)).cocok && !K.cocokUcapan("sebelas", an(1)).cocok, "cocok: bilangan dua angka dikenali utuh");
}

/* ------------------------------ CPA ------------------------------ */
const TAHAP = { Concrete: ["benda", D.CONCRETE], Pictorial: ["diagram", D.PICTORIAL], Abstract: ["lambang", D.ABSTRACT] };
const CARA = ["klik", "kanvas", "suara"];
const METODE = ["igil", "susun", "maju", "cek"];
/** Jenis tugas dasar yang diharapkan per tahap, cara, dan urutan metode (salah = Cari kesalahan dengan dasar tugas itu). */
const TIPE = {
  Concrete: { klik: ["susun", "susun", "maju", "cek"], kanvas: ["ambil", "susun", "maju", "cek"], suara: ["ambil", "susun", "maju", "cek"] },
  Pictorial: { klik: ["cek", "susun", "maju", "cek"], kanvas: ["ambil", "susun", "maju", "cek"], suara: ["ambil", "susun", "maju", "cek"] },
  Abstract: { klik: ["susun", "susun", "maju", "cek"], kanvas: ["ambil", "susun", "maju", "cek"], suara: ["ambil", "susun", "maju", "cek"] },
};
/** Tempat Cari kesalahan: [indeks misi, indeks langkah]. */
const TEMPAT_SALAH = { Concrete: [[0, 0]], Pictorial: [[0, 0]], Abstract: [[0, 0]] };
const semuaTeksLangkah = (ls, rupa, cara) => [ls.judul, ls.suara, LC.instruksi(ls.langkah, rupa, cara, ls.metode), LC.kalimatTanya(ls.langkah, cara), LC.kalimatKunci(ls.langkah, cara), LC.petunjukSalah(ls.langkah, cara, 1)];
{
  sama(LC.URUT_METODE, METODE, "urutan metode");
  cek(LC.NAMA_METODE.igil.includes("Susun dan Pinjam, Hitung Maju, Periksa dengan Tambah") && LC.NAMA_METODE.susun.includes("Column Subtract") && LC.NAMA_METODE.maju.includes("Count Up") && LC.NAMA_METODE.cek.includes("Add Check"), "nama metode IGIL dan tiga metode global");
  cek(METODE.every((m) => emojiSah(LC.IKON_METODE[m])), "ikon metode sah");
  let nomor = 2;
  for (const [nama, [rupa, soal]] of Object.entries(TAHAP)) {
    cek(soal.length === 3 && soal.map((s) => s.cara).join() === CARA.join(), `${nama}: tiga misi Klik, Kanvas, Suara`);
    cek(soal.every((s) => s.langkah.length === 4 && s.langkah.map((l) => l.metode).join() === METODE.join()), `${nama}: empat langkah per misi (IGIL, Column Subtract, Count Up, Add Check)`);
    for (const s of soal) {
      cek(s.nomor === nomor, `${nama}: nomor misi berlanjut ${nomor}`);
      nomor += 1;
      cek(s.judul.startsWith("Misi Sisa") && s.cerita.length > 15 && bersih(s.judul) && bersih(s.cerita) && tanpaDigit(s.cerita), `${nama} ${s.nomor}: judul dan cerita sah`);
      sama(s.langkah.map((l) => LC.dasarDari(l.langkah).tipe), TIPE[nama][s.cara], `${nama} ${s.nomor}: jenis tugas per metode`);
      for (const ls of s.langkah) {
        cek(ls.cara === s.cara, `${nama} ${s.nomor}: cara langkah sama dengan misi`);
        const teks = semuaTeksLangkah(ls, rupa, s.cara);
        cek(teks.every((t) => tanpaDigit(t) && bersih(t)), `${nama} ${s.nomor} ${ls.metode}: teks tanpa digit dan kata terlarang (${teks.find((t) => !tanpaDigit(t) || !bersih(t)) ?? ""})`);
        cek(emojiSah(teks.join("")), `${nama} ${s.nomor} ${ls.metode}: emoji sah`);
        cek(ls.judul === ls.suara && ls.judul === LC.instruksi(ls.langkah, rupa, s.cara, ls.metode), `${nama} ${s.nomor} ${ls.metode}: judul dan suara sama dengan instruksi`);
        if (rupa !== "benda") cek(!adaEmoji(teks.join(" ")), `${nama} ${s.nomor} ${ls.metode}: teks tugas tanpa emoji (batas rupa)`);
        cek(/Metode IGIL|Column Subtract|Count Up|Add Check|sudah menjawab/.test(ls.judul), `${nama} ${s.nomor} ${ls.metode}: judul tugas memuat nama metode`);
      }
    }
    const salahL = soal.flatMap((s, si) => s.langkah.map((l, li) => [si, li, l])).filter(([, , l]) => l.langkah.tipe === "salah");
    sama(salahL.map(([si, li]) => [si, li]), TEMPAT_SALAH[nama], `${nama}: tempat Cari kesalahan`);
    for (const [, , l] of salahL) {
      const x = l.langkah;
      cek(x.alasan.length === 3 && new Set(x.alasan).size === 3 && x.benar >= 0 && x.benar <= 2 && x.keliru.length > 20 && x.kataTokoh.length > 15 && ["Satria", "Laras", "Genta"].includes(x.tokoh), `${nama}: Cari kesalahan lengkap`);
      cek(tanpaDigit(x.kataTokoh + x.alasan.join(" ") + x.keliru) && bersih(x.kataTokoh + x.alasan.join(" ") + x.keliru), `${nama}: Cari kesalahan tanpa digit dan kata terlarang`);
      const pil = LC.pilihanKlik(x);
      cek(pil.length === 3 && new Set(pil).size === 3 && pil.includes(String(x.jawabTokoh)), `${nama}: pilihan klik Cari kesalahan memuat jawaban tokoh (${pil.join("/")})`);
      const teksBenar = LC.teksKunciKlik(x);
      cek(teksBenar !== null, `${nama}: jawaban sendiri ada`);
      if (x.betul) cek(String(teksBenar) === String(x.jawabTokoh), `${nama}: jawaban tokoh yang benar sama dengan jawaban benar`);
      else cek(String(teksBenar) !== String(x.jawabTokoh), `${nama}: jawaban benar berbeda dari jawaban tokoh`);
      cek(LC.petunjukSalah(x, "klik", x.jawabTokoh).startsWith(`Itu jawaban ${x.tokoh}`), `${nama}: petunjuk menjelaskan jawaban tokoh`);
      if (!x.betul) cek(!LC.petunjukSalah(x, "klik", x.jawabTokoh).includes(LC.kataBil(Number(teksBenar))), `${nama}: petunjuk tokoh tidak membocorkan jawaban`);
    }
  }
  cek(nomor === 11, "nomor misi berlanjut sampai sepuluh");
  // Seed Cari kesalahan dari alur: Satria membalik per tempat (salah), Genta periksa dengan menambah (benar), Satria lupa mencoret (variasi salah).
  const sC = D.CONCRETE[0].langkah[0].langkah;
  cek(sC.tokoh === "Satria" && sC.dasar.tipe === "susun" && sC.jawabTokoh === String(LC.hasilTukar(sC.dasar.a, sC.dasar.b)) && LC.teksKunciKlik(sC) === String(sC.dasar.a - sC.dasar.b) && !sC.betul, "Cari kesalahan Concrete: Satria membalik tiap tempat angka (seed alur)");
  const sP = D.PICTORIAL[0].langkah[0].langkah;
  cek(sP.tokoh === "Genta" && sP.dasar.tipe === "cek" && sP.betul === true && sP.benar === 0 && sP.dasar.klaim === sP.dasar.a - sP.dasar.b && sP.jawabTokoh === String(sP.dasar.a) && LC.teksKunciKlik(sP) === String(sP.dasar.a), "Cari kesalahan Pictorial: Genta memeriksa dengan menambah, benar (seed alur)");
  const sA = D.ABSTRACT[0].langkah[0].langkah;
  cek(sA.tokoh === "Satria" && sA.dasar.tipe === "susun" && sA.jawabTokoh === String(LC.hasilLupa(sA.dasar.a, sA.dasar.b)) && sA.jawabTokoh !== String(LC.hasilTukar(sA.dasar.a, sA.dasar.b)) && LC.teksKunciKlik(sA) === String(sA.dasar.a - sA.dasar.b) && !sA.betul, "Cari kesalahan Abstract: Satria lupa mencoret angka yang diambil, berbeda dari membalik");
  // Posisi alasan benar (rumus di LangkahSisa): tidak selalu tombol pertama.
  {
    const posisiAlasan = (x) => Array.from(`${x.tokoh}${x.kataTokoh}${x.alasan[x.benar]}`).reduce((t, c) => t + c.charCodeAt(0), 0) % 3;
    const semuaSalah = Object.values(TAHAP).flatMap(([, soal]) => soal.flatMap((s) => s.langkah.map((l) => l.langkah)).filter((x) => x.tipe === "salah"));
    const pos = semuaSalah.map((x) => {
      const lain = [0, 1, 2].filter((i) => i !== x.benar);
      const p = posisiAlasan(x);
      return [...lain.slice(0, p), x.benar, ...lain.slice(p)].indexOf(x.benar);
    });
    cek(new Set(pos).size >= 2 && pos.some((p) => p !== 0), `Cari kesalahan: posisi alasan benar tidak selalu pertama (${pos})`);
  }
  // Batas isi tiap tugas.
  for (const [nama, [rupa, soal]] of Object.entries(TAHAP))
    for (const s of soal)
      for (const ls of s.langkah) {
        const d = LC.dasarDari(ls.langkah);
        const tag = `${nama} ${s.nomor} ${ls.metode}`;
        cek(typeof d.benda === "string" && d.benda.length >= 3, `${tag}: benda bernama`);
        if (rupa === "benda") cek(!!DG_EMOJI[d.benda] && emojiSah(DG_EMOJI[d.benda]), `${tag}: Concrete memakai benda beremoji (${d.benda})`);
        cek(d.a >= 100 && d.a <= 999 && d.b >= 100 && d.b < d.a && ![d.a, d.b, d.a - d.b, d.klaim ?? 0].some((n) => CERITA.includes(n)), `${tag}: bilangan tiga angka, bukan data Story (${d.a}, ${d.b})`);
        if (d.tipe !== "maju") cek(dig(d.a)[1] >= 1, `${tag}: tanpa nol di puluhan bilangan awal`);
        if (d.tipe === "susun") cek(angkaDi(d.a - d.b, d.tempat) >= 1 && angkaDi(d.a - d.b, d.tempat) <= 9 && LC.banyakAmbil(d.a, d.b) >= 0, `${tag}: angka di tempat ${d.tempat} hasil bukan nol`);
        if (d.tipe === "ambil") cek(LC.banyakAmbil(d.a, d.b) >= 1 && LC.banyakAmbil(d.a, d.b) <= 2 && LC.ambilPertama(d.a, d.b) !== null, `${tag}: ada yang harus mengambil (${LC.banyakAmbil(d.a, d.b)} kali)`);
        if (d.tipe === "maju") {
          const j = LC.lompatMaju(d.a, d.b);
          cek(d.b % 10 !== 0 && j.length === 3 && j.every((v) => v > 0) && d.a - d.b >= 10 && d.a - d.b <= 60 && LC.lompatPertama(d.b) >= 1 && LC.lompatPertama(d.b) <= 9, `${tag}: hitung maju tiga lompatan, lompatan pertama satu sampai sembilan (${j})`);
        }
        if (d.tipe === "cek") {
          cek(d.klaim >= 100 && d.klaim <= 999 && angkaDi(d.a - d.b, d.tempat) >= 1, `${tag}: Add Check hasil dicatat dan angka tempat ${d.tempat} sah`);
          if (s.cara === "suara") cek((d.klaim + d.b === d.a) === (LC.kunciJawab(d, "suara").nama === "sama"), `${tag}: sama atau berbeda dihitung dari data`);
        }
      }
  // Tiap metode tampak di tiap tahap, dan tiap jenis tugas ada.
  for (const [nama, [, soal]] of Object.entries(TAHAP)) {
    const tipe = new Set(soal.flatMap((s) => s.langkah.map((l) => LC.dasarDari(l.langkah).tipe)));
    cek(["susun", "ambil", "maju", "cek"].every((t) => tipe.has(t)), `${nama}: jenis tugas susun, ambil, maju, cek ada`);
    const kanvas = soal.find((s) => s.cara === "kanvas").langkah.map((l) => LC.kunciJawab(l.langkah, "kanvas").n);
    cek(kanvas.every((n) => Number.isInteger(n) && n >= 1 && n <= 9) && new Set(kanvas).size === 4, `${nama}: empat angka jawaban kanvas satu angka dan tidak kembar (${kanvas})`);
    const suaraKunci = soal.find((s) => s.cara === "suara").langkah.map((l) => LC.kunciJawab(l.langkah, "suara"));
    cek(suaraKunci[0].jenis === "nama" && ["satuan", "puluhan", "ratusan"].includes(suaraKunci[0].nama) && suaraKunci[1].jenis === "angka" && suaraKunci[2].jenis === "angka" && suaraKunci[3].jenis === "nama" && ["sama", "berbeda"].includes(suaraKunci[3].nama), `${nama}: jawaban suara nama tempat, bilangan, bilangan, sama atau berbeda`);
  }
  cek(new Set(Object.values(TAHAP).map(([, soal]) => soal.find((s) => s.cara === "kanvas").langkah.map((l) => LC.kunciJawab(l.langkah, "kanvas").n).join())).size === 3, "angka jawaban kanvas berbeda antartahap");
  cek(new Set(Object.values(TAHAP).flatMap(([, soal]) => soal.find((s) => s.cara === "suara").langkah.slice(3).map((l) => LC.kunciJawab(l.langkah, "suara").nama))).size === 2, "jawaban suara Add Check memuat sama dan berbeda");
  cek(new Set(Object.values(TAHAP).map(([, soal]) => LC.kunciJawab(soal.find((s) => s.cara === "suara").langkah[0].langkah, "suara").nama)).size >= 2, "jawaban suara tempat pertama yang mengambil bervariasi");
}

/* ------------------------------ Tugas dihitung dari data ------------------------------ */
{
  const kn = (k) => (k ? (k.jenis === "nama" ? k.nama : k.n) : null);
  const susun = { tipe: "susun", benda: "x", a: 612, b: 275, tempat: "puluhan" };
  sama(["klik", "kanvas", "suara"].map((c) => kn(LC.kunciJawab(susun, c))), [337, 3, 337], "kunci susun: hasil, angka puluhan, hasil");
  const ambil = { tipe: "ambil", benda: "x", a: 612, b: 275 };
  sama(["klik", "kanvas", "suara"].map((c) => kn(LC.kunciJawab(ambil, c))), ["satuan", 2, "satuan"], "kunci ambil: tempat pertama, banyak tempat, tempat pertama");
  sama(["klik", "kanvas", "suara"].map((c) => kn(LC.kunciJawab({ tipe: "ambil", benda: "x", a: 745, b: 382 }, c))), ["puluhan", 1, "puluhan"], "kunci ambil puluhan");
  const maju = { tipe: "maju", benda: "x", a: 840, b: 757 };
  sama(["klik", "kanvas", "suara"].map((c) => kn(LC.kunciJawab(maju, c))), [83, 3, 83], "kunci maju: selisih, lompatan pertama, selisih");
  const ck = { tipe: "cek", benda: "x", a: 640, b: 265, klaim: 385, tempat: "ratusan" };
  sama(["klik", "kanvas", "suara"].map((c) => kn(LC.kunciJawab(ck, c))), [650, 3, "berbeda"], "kunci cek keliru: jumlah, ratusan hasil sebenarnya, berbeda");
  sama(["klik", "kanvas", "suara"].map((c) => kn(LC.kunciJawab({ ...ck, klaim: 375 }, c))), [640, 3, "sama"], "kunci cek benar: jumlah, ratusan, sama");
  // Pilihan.
  for (const l of [susun, maju, ck]) {
    const p = LC.pilihanKlik(l);
    const benar = String(kn(LC.kunciJawab(l, "klik")));
    cek(p.length === 3 && new Set(p).size === 3 && p.includes(benar) && p[0] !== benar && p.every((x) => Number(x) >= 1 && Number(x) <= 999), `pilihan klik ${l.tipe}: tiga unik, benar bukan yang pertama (${p})`);
    const ps = LC.pilihanSuara(l, "suara");
    if (l.tipe !== "cek") cek(ps.length === 3 && new Set(ps).size === 3 && ps.includes(LC.kataBil(Number(benar))) && ps[0] !== LC.kataBil(Number(benar)) && ps.every(tanpaDigit), `pilihan suara ${l.tipe}: tiga kata bilangan, benar bukan yang pertama (${ps})`);
  }
  const pa = LC.pilihanKlik(ambil);
  cek(pa.length === 3 && new Set(pa).size === 3 && pa.includes("satuan") && pa.includes("puluhan") && pa.includes("ratusan") && pa[0] !== "satuan", `pilihan klik ambil: tiga nama tempat, benar bukan yang pertama (${pa})`);
  const pas = LC.pilihanSuara(ambil, "suara");
  cek(pas.length === 3 && new Set(pas).size === 3 && pas.includes("satuan") && pas[0] !== "satuan", `pilihan suara ambil: tiga nama tempat (${pas})`);
  sama(LC.pilihanSuara(ck, "suara").sort(), ["berbeda", "sama"], "pilihan suara cek: sama dan berbeda");
  cek(LC.pilihanKlik({ ...ambil, a: 745, b: 382 })[0] !== "puluhan", "pilihan klik ambil puluhan: benar bukan yang pertama");
  // Pengecoh khas memuat kesalahan Satria.
  cek(LC.pengecoh({ tipe: "susun", benda: "x", a: 421, b: 156, tempat: "puluhan" }, "klik").slice(0, 2).join() === "335,375", "pengecoh susun: hasil membalik dan lupa mencoret");
  cek(LC.pengecoh({ tipe: "cek", benda: "x", a: 640, b: 265, klaim: 385, tempat: "ratusan" }, "klik").includes(640), "pengecoh cek: bilangan awal ikut");
  // Tugas langsung siap, kecuali Cari kesalahan.
  for (const [nama, [rupa, soal]] of Object.entries(TAHAP))
    for (const s of soal) for (const ls of s.langkah) cek(LC.siapLangsung(ls.langkah, rupa, s.cara) === (ls.langkah.tipe !== "salah"), `${nama} ${s.nomor} ${ls.metode}: siap langsung kecuali Cari kesalahan`);
  // Kalimat kunci dan petunjuk tanpa digit pada semua cara dan jenis.
  for (const c of ["klik", "kanvas", "suara"])
    for (const l of [susun, ambil, maju, ck, { ...ck, klaim: 375 }]) {
      cek(tanpaDigit(LC.kalimatKunci(l, c)) && tanpaDigit(LC.kalimatTanya(l, c)) && tanpaDigit(LC.petunjukSalah(l, c, 1)) && tanpaDigit(LC.instruksi(l, "benda", c, "susun")), `kalimat ${l.tipe} ${c}: tanpa digit`);
      cek(bersih(LC.kalimatKunci(l, c)) && bersih(LC.petunjukSalah(l, c, 1)), `kalimat ${l.tipe} ${c}: tanpa kata terlarang`);
    }
  cek(LC.kalimatKunci(ck, "suara").includes("berbeda") && LC.kalimatKunci({ ...ck, klaim: 375 }, "suara").includes("sama dengan bilangan awal"), "kalimat kunci cek suara menyebut sama atau berbeda");
  // Kartu kata Abstract dan hitung susun tertulis.
  cek(LC.barisKartu(susun, "klik").join(" ").includes("612") && LC.barisKartu(ck, "klik").length === 4 && LC.barisKartu(maju, "kanvas").join(" ").includes("lompatan pertama"), "kartu kata memuat bilangan dan pertanyaan");
  sama(LC.barisSusun(susun), ["  612", "− 275", "-----"], "hitung susun tertulis: bilangan awal di atas, pengurang di bawah, garis");
  cek(LC.barisSusun(ck)[1].startsWith("+") && LC.barisSusun(maju).length === 0, "hitung susun tertulis: Add Check memakai tambah, hitung maju tanpa susun");
}

/* ------------------------------ Berkas folder ------------------------------ */
{
  const berkas = readdirSync(folderUrl).filter((f) => /\.(ts|tsx)$/.test(f));
  for (const f of ["PapanSisa.tsx", "DaftarSisa.tsx", "TahapSisa.tsx", "SimulasiPapanSisa.tsx", "LangkahSisa.tsx", "JawabSisa.tsx", "GambarSisa.tsx", "data.ts", "data-kartu.ts", "data-sim.ts", "logika.ts", "logika-cpa.ts", "periksa.ts", "balok.ts"]) cek(berkas.includes(f), `${f} ada`);
  for (const f of berkas) {
    const src = readFileSync(new URL(f, folderUrl), "utf8");
    cek(!src.startsWith("﻿") && !src.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(![...src].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}|\\u\{1FA9[0-9A-F]\}\\u\{200D\}/i.test(src), `${f}: kode emoji tidak melewati U+1FA95`);
    if (/\.ts$/.test(f) && f !== "logika-cpa.ts") cek(!/from "react"/.test(src), `${f}: tanpa React`);
    cek(!/fetch\(/.test(src), `${f}: tanpa jaringan`);
    cek(!/🪵|🪑|🛞|🛟/u.test(src) && !/\\u\{1FAB5\}|\\u\{1FA91\}|\\u\{1F6DE\}|\\u\{1F6DF\}/i.test(src), `${f}: tanpa emoji terlarang`);
  }
  cek(/Pictorial/.test(JSON.stringify(D.TEMA_SISA)) && Object.values(D.TEMA_SISA).every((t) => emojiSah(t.ikon) && bersih(t.cara) && !/kelas/i.test(t.cara)), "tema tiga tahap sah dan bersih");
  cek(tanpaDigit(D.PENUTUP_F) && bersih(D.PENUTUP_F) && /Bu Marni/.test(D.PENUTUP_F) && /penumpang/.test(D.PENUTUP_F), "jembatan ke Sub-Bab G: Bu Marni, penumpang beberapa perahu");
  cek(D.POIN_PENTING.length === 7 && D.POIN_PENTING.every((p) => bersih(p)) && D.POIN_PENTING_SUARA.every((p) => tanpaDigit(p) && bersih(p)), "poin penting: tujuh poin, suara tanpa digit");
  cek(D.POIN_PENTING.join(" ").includes("Susun dan Pinjam") && D.POIN_PENTING.join(" ").includes("Hitung Maju") && D.POIN_PENTING.join(" ").includes("Periksa dengan Tambah"), "poin penting memuat tiga cara");
  // Konsistensi nama ekspor yang dipasang koordinator.
  cek(D.CONCRETE_SISA === D.CONCRETE && D.PICTORIAL_SISA === D.PICTORIAL && D.ABSTRACT_SISA === D.ABSTRACT && D.TEMA_SISA.concrete.nama === "Concrete" && D.TEMA_SISA.pictorial.nama === "Pictorial" && D.TEMA_SISA.abstract.nama === "Abstract", "ekspor CONCRETE_SISA, PICTORIAL_SISA, ABSTRACT_SISA, TEMA_SISA");
  const gambar = readFileSync(new URL("GambarSisa.tsx", folderUrl), "utf8");
  cek(/export const EMOJI_BENDA/.test(gambar) && Object.values(DG_EMOJI).every((e) => emojiSah(e)) && Object.keys(DG_EMOJI).length >= 8, "GambarSisa: benda beremoji sah");
  const tahap = readFileSync(new URL("TahapSisa.tsx", folderUrl), "utf8");
  cek(/export default function TahapSisa/.test(tahap) && /poinPenting/.test(tahap) && /PENUTUP_F/.test(tahap), "TahapSisa: ekspor default, Poin Penting, dan jembatan");
  for (const [f, ekspor] of [["PapanSisa.tsx", "PapanSisaK4B1"], ["DaftarSisa.tsx", "DaftarSisaK4B1"]]) {
    const src = readFileSync(new URL(f, folderUrl), "utf8");
    cek(new RegExp(`export default function ${ekspor}`).test(src) && new RegExp(`export \\{ ${ekspor} \\}`).test(src), `${f}: ekspor default dan bernama ${ekspor}`);
  }
}

console.log(`Uji Papan Sisa Kelas 4 Bab 1 F: ${lulus} lulus, ${gagal} gagal`);
process.exit(gagal ? 1 : 0);
