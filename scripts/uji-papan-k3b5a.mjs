// Uji Mind-map (Catatan Pak Hasan), Infografis (Daftar Sepeda), Simulasi Meja Catat, dan tahap Concrete, Pictorial, Abstract Kelas 3 Bab 5 Sub-Bab A ("Catatan Pak Hasan"),
// awal cerita Bengkel Sepeda Pak Hasan (mengurutkan dan membandingkan data: urutan, data terkecil dan terbesar, jangkauan, turus dan banyak).
// Memeriksa: logika simulasi (geser kartu sampai berurutan, urutkan dulu baru tandai terkecil dan terbesar dengan alat menolak sebelum diurutkan, jangkauan dan Cek Jangkauan, banding dua hari,
// turus dengan garis kelima menjadi bundel), misi (awal tidak memenuhi, wajib empat, bebas dua), sembilan kartu geser Masalah, Cara, Hasil memuat semua metode Story, daftar sepeda dari kejadian Story,
// CPA dua belas langkah per tahap (Klik, Kanvas, Suara x empat metode) dengan jawaban beragam dan Cari kesalahan di tiap tahap, jawaban benar dihitung dari data, angka jawaban tidak kembar per tahap,
// tugas yang langsung siap (jebakan tombol macet), geometri turus tepat (bundel lima = empat tegak dan satu miring), pengenal ucapan, petunjuk salah, batas rupa, emoji, kata terlarang, akhir baris.
// Jalankan: node --no-warnings scripts/uji-papan-k3b5a.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/papan-k3b5a/logika.ts");
const DS = await import("../src/components/modul/papan-k3b5a/data-sim.ts");
const DK = await import("../src/components/modul/papan-k3b5a/data-kartu.ts");
const LC = await import("../src/components/modul/papan-k3b5a/logika-cpa.ts");
const D = await import("../src/components/modul/papan-k3b5a/data.ts");
const K = await import("../src/components/modul/papan-k3b5a/periksa.ts");
const T = await import("../src/components/modul/papan-k3b5a/turus.ts");
const S = await import("../src/components/modul/misi-simulasi.ts");
const MK = await import("../src/components/modul/misi-k3bab5.ts");
const MT = await import("../src/components/modul/misi-teks-k3b5.ts");
const folderUrl = new URL("../src/components/modul/papan-k3b5a/", import.meta.url);
/** Benda beremoji pada GambarPapan.tsx (kunci EMOJI_BENDA), dibaca dari teks karena berkas tsx tidak bisa diimpor di Node. */
const DG_EMOJI = {};
{
  const gu = readFileSync(new URL("GambarPapan.tsx", folderUrl), "utf8");
  const blok = /export const EMOJI_BENDA[^=]*=\s*\{([\s\S]*?)\n\};/.exec(gu)?.[1] ?? "";
  for (const m of blok.matchAll(/(?:"([^"]+)"|([a-z]+)):\s*"([^"]*)"/g)) DG_EMOJI[m[1] ?? m[2]] = m[3];
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
/** Data Story A (enam hari 6, 9, 3, 7, 5, 8): jangan dijadikan data CPA atau Simulasi. */
const CERITA = [3, 5, 6, 7, 8, 9].join();
const urutNaik = (d) => [...d].sort((a, b) => a - b);
const samaSet = (d) => urutNaik(d).join() === CERITA;

/* ------------------------------ Kata bilangan ------------------------------ */
{
  sama([0, 1, 9, 10, 11, 15, 20, 38, 100, 305].map(LC.kataBil), ["nol", "satu", "sembilan", "sepuluh", "sebelas", "lima belas", "dua puluh", "tiga puluh delapan", "seratus", "tiga ratus lima"], "kata bilangan CPA");
  cek(LC.kata === LC.kataBil, "alias kata");
  for (let n = 1; n <= 150; n += 1) cek(tanpaDigit(LC.kataBil(n)) && LC.kataBil(n) === L.kata(n), `kata bilangan ${n} sama di simulasi dan CPA`);
  sama([LC.ucapkan("9 − 3 = 6"), LC.ucapkan("2 3 5"), LC.ucapkan("3 + 6 = 9"), LC.ucapkan("terkecil")], ["sembilan dikurangi tiga sama dengan enam", "dua tiga lima", "tiga ditambah enam sama dengan sembilan", "terkecil"], "ucapkan: angka dan lambang menjadi kata");
}

/* ------------------------------ Geometri turus ------------------------------ */
{
  for (let n = 1; n <= 20; n += 1) {
    const s = T.segTurus(n, { x: 10, y: 10 });
    const tegak = s.filter((q) => !q.miring);
    const miring = s.filter((q) => q.miring);
    cek(T.banyakDariTurus(s) === n && miring.length === Math.floor(n / 5) && tegak.length === n - Math.floor(n / 5), `turus ${n}: banyak garis tegak dan miring sesuai data`);
    cek(tegak.every((q) => q.x1 === q.x2 && q.y2 > q.y1), `turus ${n}: garis tegak lurus`);
    // Tiap coretan miring melintang di atas tepat empat garis tegak dan naik ke kanan.
    cek(miring.every((m) => m.x2 > m.x1 && m.y2 < m.y1 && tegak.filter((q) => q.x1 >= m.x1 && q.x1 <= m.x2).length === 4), `turus ${n}: bundel lima = empat tegak dan satu miring melintang`);
    const x = tegak.map((q) => q.x1).sort((a, b) => a - b);
    cek(x.every((v, i) => i === 0 || v > x[i - 1]), `turus ${n}: garis tegak tidak bertumpuk`);
    cek(T.lebarTurus(n, {}) >= 0 && T.lebarTurus(n, {}) <= 280, `turus ${n}: lebar muat di kanvas (${T.lebarTurus(n, {})})`);
  }
  cek(T.segTurus(0, { x: 0, y: 0 }).length === 0 && T.lebarTurus(0, {}) === 0, "turus nol kosong");
}

/* ------------------------------ Simulasi: data dan logika ------------------------------ */
{
  const semuaData = [...DS.TARGET_URUT.map((t) => t.data), ...DS.TARGET_UJUNG.map((t) => t.data), ...DS.TARGET_JANGKAU.map((t) => t.data)];
  cek(semuaData.every((d) => !samaSet(d) && d.length >= 4 && new Set(d).size === d.length), "simulasi: data berbeda dari Story, tanpa kembar di satu data");
  cek(DS.TARGET_URUT.length === 3 && DS.TARGET_URUT.every((t) => urutNaik(t.data).join() !== t.data.join() && urutNaik(t.data).reverse().join() !== t.data.join()) && new Set(DS.TARGET_URUT.map((t) => t.arah)).size === 2, "simulasi: tiga data urut, belum berurutan di awal, naik dan turun ada");
  cek(DS.TARGET_UJUNG.length === 3 && DS.TARGET_UJUNG.every((t) => urutNaik(t.data).join() !== t.data.join()), "simulasi: tiga data ujung yang belum urut di awal (alat harus menolak)");
  cek(DS.TARGET_JANGKAU.length === 3 && new Set(DS.TARGET_JANGKAU.map((t) => Math.max(...t.data) - Math.min(...t.data))).size === 3, "simulasi: tiga data jangkauan dengan jangkauan berbeda");
  cek(DS.TARGET_BANDING.length === 3 && DS.TARGET_BANDING.every((t) => t.a.n !== t.b.n) && new Set(DS.TARGET_BANDING.map((t) => Math.abs(t.a.n - t.b.n))).size === 3 && new Set(DS.TARGET_BANDING.map((t) => t.a.n > t.b.n)).size === 2, "simulasi: tiga pasang hari, selisih berbeda, hari lebih banyak di kiri dan kanan");
  cek(DS.TARGET_TURUS.length === 3 && DS.TARGET_TURUS.every((t) => t.banyak % 5 !== 0 && t.banyak >= 6 && t.banyak <= DS.MAKS_GARIS && DG_EMOJI[t.benda]) && new Set(DS.TARGET_TURUS.map((t) => t.banyak)).size === 3 && ![8, 7].includes(DS.TARGET_TURUS[0].banyak), "simulasi: tiga turus bukan kelipatan lima, benda beremoji, berbeda dari Story (delapan dan tujuh)");
  cek(tanpaDigit(DS.MISI_PAPAN_TEKS) && bersih(DS.MISI_PAPAN_TEKS) && DS.MISI_PAPAN_TEKS === MT.MISI_K3B5.A && D.MISI_PAPAN_TEKS === DS.MISI_PAPAN_TEKS && DS.MISI_PAPAN_TEKS.length >= 10 && DS.MISI_PAPAN_TEKS.length <= 120, "simulasi: teks misi tanpa digit dan kata terlarang, sama dengan misi-teks-k3b5");

  const a = L.awalCatat();
  cek(a.alat === "catat" && a.mode === "urut" && a.susun.join() === DS.TARGET_URUT[0].data.join() && !a.ujungUrut && !a.tolak && a.garis === 0 && ["urutBenar", "ujungBenar", "jangBenar", "bandBenar", "turusBenar"].every((f) => a[f].length === 0) && a.salah === 0, "simulasi: keadaan awal");
  // Urut.
  cek(L.urutanBenar(a).join() === "1,3,4,7,9" && L.urutanBenar({ ...a, urutKe: 1 }).join() === "15,12,10,9,7" && L.urutanBenar({ ...a, urutKe: 2 }).join() === "2,5,6,8,11,13", "urut: urutan benar dihitung dari data (naik dan turun)");
  cek(!L.periksaUrut(a).ok && /belum digeser/.test(L.petunjukUrut(a)) && tanpaDigit(L.petunjukUrut(a)), "urut: sebelum menggeser, petunjuk menunjuk langkah yang belum dilakukan");
  cek(!L.geserKartu(a, 1).ok && L.pilihKartu(a, 9).urutSel === -1 && L.pilihKartu(a, 2).urutSel === 2, "urut: menggeser tanpa memilih kartu ditolak, memilih di luar daftar diabaikan");
  const g1 = L.geserKartu(L.pilihKartu(a, 0), 1);
  cek(g1.ok && g1.k.susun.join() === "9,4,1,7,3" && g1.k.urutSel === 1 && !L.geserKartu(L.pilihKartu(a, 0), -1).ok && !L.geserKartu(L.pilihKartu(a, 4), 1).ok, "urut: kartu bertukar dengan tetangganya, tidak bisa keluar dari ujung");
  const sel = (k0) => {
    let k = k0;
    for (let n = 0; n < 60; n += 1) {
      const t = L.targetUrut(k);
      const sasaran = L.urutanBenar(k);
      const i = k.susun.findIndex((x, q) => x !== sasaran[q]);
      if (i < 0) break;
      const j = k.susun.indexOf(sasaran[i]);
      k = L.pilihKartu(k, j);
      for (let m = j; m > i; m -= 1) k = L.geserKartu(k, -1).k;
      void t;
    }
    return k;
  };
  const sudah = sel(a);
  cek(sudah.susun.join() === "1,3,4,7,9" && L.periksaUrut(sudah).ok, "urut: kartu digeser sampai naik lalu benar");
  const terbalik = { ...a, susun: [9, 7, 4, 3, 1] };
  cek(!L.periksaUrut(terbalik).ok && /terbalik/.test(L.petunjukUrut(terbalik)) && L.periksaUrut(terbalik).k.salah === 1, "urut: urutan terbalik keliru, petunjuk menyebut terbalik");
  const salahU = { ...a, susun: [1, 4, 3, 7, 9] };
  cek(!L.periksaUrut(salahU).ok && /Bandingkan dua kartu/.test(L.petunjukUrut(salahU)) && tanpaDigit(L.petunjukUrut(salahU)), "urut: masih ada kartu salah tempat");
  const betulU = L.periksaUrut(sudah);
  cek(betulU.k.urutBenar.join() === "0" && betulU.k.urutKe === 1 && betulU.k.susun.join() === "12,7,15,9,10" && betulU.k.urutSel === -1, "urut: benar membuka data berikutnya");
  sama(S.misiBaru(MK.MISI_A, betulU.k, new Set()), ["a-urut"], "urut: misi a-urut");
  const dua = sel(betulU.k);
  cek(dua.susun.join() === "15,12,10,9,7" && L.periksaUrut(dua).ok, "urut: data turun diurutkan dari terbesar");
  cek(tanpaDigit(L.kalimatUrut(a)) && tanpaDigit(L.kalimatUrut(betulU.k)) && /terkecil ke yang terbesar/.test(L.kalimatUrut(a)) && /terbesar ke yang terkecil/.test(L.kalimatUrut({ ...betulU.k, urutBenar: [] })), "urut: kalimat tanpa digit, menyebut arah");
  // Ujung.
  const t1 = L.tandaiUjung(a, "kecil");
  cek(!t1.ok && t1.k.tolak === true && t1.k.salah === 0 && t1.k.kecilTanda === -1, "ujung: alat menolak menandai sebelum diurutkan (bukan percobaan keliru)");
  sama(S.misiBaru(MK.MISI_A, t1.k, new Set()), ["a-tolak"], "ujung: misi a-tolak");
  cek(/Tekan Urutkan dulu/.test(L.petunjukUjung(a)) && tanpaDigit(L.petunjukUjung(a)) && !L.periksaUjung(a).ok, "ujung: petunjuk saat belum diurutkan menunjuk langkah yang belum dilakukan");
  const u = L.urutkanUjung(a);
  cek(u.ujungUrut && u.ujungSusun.join() === "3,5,8,9,12" && L.targetUjung(a).data.join() === "5,12,3,9,8", "ujung: tombol Urutkan menaikkan data");
  cek(!L.tandaiUjung(u, "kecil").ok && !L.tandaiUjung(u, "kecil").k.tolak === false || !L.tandaiUjung(u, "kecil").k.tolak, "ujung: sesudah diurutkan, menandai tanpa memilih kartu bukan penolakan alat");
  cek(/Pilih satu kartu, lalu tekan Tandai terkecil/.test(L.petunjukUjung(u)) && !L.periksaUjung(u).ok, "ujung: sesudah diurutkan petunjuk menunjuk tanda terkecil yang belum dipasang");
  const kc = L.tandaiUjung(L.pilihUjung(u, 0), "kecil");
  cek(kc.ok && kc.k.kecilTanda === 0 && /Tandai terbesar/.test(L.petunjukUjung(kc.k)), "ujung: tanda terkecil dipasang, petunjuk lanjut ke terbesar");
  const salahJ = L.tandaiUjung(L.pilihUjung(kc.k, 1), "besar");
  cek(salahJ.ok && !L.periksaUjung(salahJ.k).ok && L.periksaUjung(salahJ.k).k.salah === 1 && /ujung kiri/.test(L.petunjukUjung(salahJ.k)), "ujung: tanda terbesar di kartu keliru, petunjuk menyebut ujung");
  const tukar = L.tandaiUjung(L.pilihUjung(L.tandaiUjung(L.pilihUjung(u, 4), "kecil").k, 0), "besar");
  cek(!L.periksaUjung(tukar.k).ok, "ujung: terkecil dan terbesar tertukar keliru");
  const bs = L.tandaiUjung(L.pilihUjung(kc.k, 4), "besar");
  const betulJ = L.periksaUjung(bs.k);
  cek(betulJ.ok && betulJ.k.ujungBenar.join() === "0" && betulJ.k.ujungKe === 1 && !betulJ.k.ujungUrut && betulJ.k.ujungSusun.join() === "14,6,11,4,10" && betulJ.k.kecilTanda === -1 && betulJ.k.besarTanda === -1, "ujung: tanda tepat membuka data berikutnya yang belum urut");
  sama(S.misiBaru(MK.MISI_A, betulJ.k, new Set()), ["a-ujung"], "ujung: misi a-ujung");
  cek(L.pilihUjung(a, 9).ujungSel === -1 && tanpaDigit(L.kalimatUjung(a)) && tanpaDigit(L.kalimatUjung(u)) && tanpaDigit(L.kalimatUjung(bs.k)) && tanpaDigit(L.kalimatUjung(betulJ.k)), "ujung: pilihan di luar daftar diabaikan, kalimat tanpa digit");
  // Jangkauan.
  cek(L.jangkauanSasaran(a) === 8 && L.jangkauanSasaran({ ...a, jangKe: 1 }) === 9 && L.jangkauanSasaran({ ...a, jangKe: 2 }) === 7, "jangkauan: dihitung dari data");
  for (let i = 0; i < 3; i += 1) {
    const k = { ...a, jangKe: i };
    const p = L.pilihanJangkau(k);
    const benar = L.jangkauanSasaran(k);
    cek(p.length === 3 && new Set(p).size === 3 && p.includes(benar) && p[0] !== benar && p.includes(Math.max(...DS.TARGET_JANGKAU[i].data) + Math.min(...DS.TARGET_JANGKAU[i].data)), `jangkauan: pilihan sasaran ${i} unik, benar bukan yang pertama, memuat hasil menjumlahkan (${p})`);
  }
  cek(/Pilih satu jangkauan/.test(L.petunjukJangkau(a)) && !L.periksaJangkau(a).ok && !L.cekJangkau(a).ok, "jangkauan: tanpa pilihan, Cek dan Periksa ditolak dengan petunjuk");
  const pj = L.pilihanJangkau(a);
  const p1 = L.pilihJangkau(a, pj.indexOf(8));
  cek(/Cek Jangkauan dulu/.test(L.petunjukJangkau(p1)) && !L.periksaJangkau(p1).ok && L.periksaJangkau(p1).k.salah === 1, "jangkauan: sebelum Cek Jangkauan, Periksa ditolak dengan petunjuk yang menunjuk langkah yang belum dilakukan");
  const c1 = L.cekJangkau(p1);
  cek(c1.ok && c1.cocok && c1.hasil === 12 && c1.k.jangCek, "jangkauan: terkecil empat ditambah jangkauan delapan sama dengan terbesar dua belas");
  const pSalah = L.pilihJangkau(a, pj.indexOf(16));
  const cSalah = L.cekJangkau(pSalah);
  cek(cSalah.ok && !cSalah.cocok && cSalah.hasil === 20 && !L.periksaJangkau(cSalah.k).ok && /selisih/.test(L.petunjukJangkau(cSalah.k)) && tanpaDigit(L.petunjukJangkau(cSalah.k)), "jangkauan: jumlah (keliru) dicek: tidak sama dengan terbesar");
  cek(!L.cekJangkau(L.pilihJangkau(c1.k, pj.indexOf(16))).k.jangCek === false && !L.pilihJangkau(c1.k, pj.indexOf(16)).jangCek, "jangkauan: mengganti pilihan membatalkan hasil cek");
  const betulG = L.periksaJangkau(c1.k);
  cek(betulG.ok && betulG.k.jangBenar.join() === "0" && betulG.k.jangKe === 1 && betulG.k.jangPilih === -1 && !betulG.k.jangCek, "jangkauan: benar membuka data berikutnya");
  sama(S.misiBaru(MK.MISI_A, betulG.k, new Set()), ["a-jangkau"], "jangkauan: misi a-jangkau");
  cek(L.pilihJangkau(a, 5).jangPilih === -1 && tanpaDigit(L.kalimatJangkau(a)) && tanpaDigit(L.kalimatJangkau(c1.k)) && tanpaDigit(L.kalimatJangkau(betulG.k)), "jangkauan: pilihan di luar daftar diabaikan, kalimat tanpa digit");
  // Banding.
  cek(L.hariLebih(a) === 0 && L.selisihBanding(a) === 5 && L.hariLebih({ ...a, bandKe: 1 }) === 1 && L.selisihBanding({ ...a, bandKe: 1 }) === 9 && L.hariLebih({ ...a, bandKe: 2 }) === 1 && L.selisihBanding({ ...a, bandKe: 2 }) === 3, "banding: hari lebih banyak dan selisih dihitung dari data");
  for (let i = 0; i < 3; i += 1) {
    const k = { ...a, bandKe: i };
    const p = L.pilihanBanding(k);
    cek(p.length === 3 && new Set(p).size === 3 && p.includes(L.selisihBanding(k)) && p[0] !== L.selisihBanding(k) && p.every((x) => x > 0), `banding: pilihan sasaran ${i} unik dan benar bukan yang pertama (${p})`);
  }
  cek(/Pilih dulu hari/.test(L.petunjukBanding(a)) && !L.periksaBanding(a).ok, "banding: tanpa memilih hari, petunjuk menunjuk langkah yang belum dilakukan");
  const hSalah = L.pilihLebih(a, 1);
  cek(/lebih sedikit/.test(L.petunjukBanding(hSalah)) && !L.periksaBanding(hSalah).ok, "banding: hari yang lebih sedikit keliru");
  const hBetul = L.pilihLebih(a, 0);
  cek(/Pilih satu selisih/.test(L.petunjukBanding(hBetul)) && !L.periksaBanding(hBetul).ok, "banding: hari benar, belum memilih selisih");
  const pb = L.pilihanBanding(a);
  const sSalah = L.pilihBanding(hBetul, pb.indexOf(19));
  cek(!L.periksaBanding(sSalah).ok && /mengurangkan/.test(L.petunjukBanding(sSalah)) && tanpaDigit(L.petunjukBanding(sSalah)), "banding: selisih menjumlahkan keliru");
  const bBetul = L.periksaBanding(L.pilihBanding(hBetul, pb.indexOf(5)));
  cek(bBetul.ok && bBetul.k.bandBenar.join() === "0" && bBetul.k.bandKe === 1 && bBetul.k.bandLebih === -1 && bBetul.k.bandPilih === -1, "banding: benar membuka dua hari berikutnya");
  sama(S.misiBaru(MK.MISI_A, bBetul.k, new Set()), ["a-banding"], "banding: misi a-banding");
  cek(L.pilihBanding(a, 7).bandPilih === -1 && tanpaDigit(L.kalimatBanding(a)) && tanpaDigit(L.kalimatBanding(bBetul.k)), "banding: pilihan di luar daftar diabaikan, kalimat tanpa digit");
  // Turus.
  const tt = L.targetTurus(a);
  cek(tt.banyak === 13 && L.bundelSekarang(a) === 0 && L.sisaSekarang(a) === 0, "turus: sasaran pertama tiga belas");
  for (let i = 0; i < 3; i += 1) {
    const k = { ...a, turusKe: i };
    const p = L.pilihanTurus(k);
    const n = DS.TARGET_TURUS[i].banyak;
    cek(p.length === 3 && new Set(p).size === 3 && p.includes(n) && p[0] !== n, `turus: pilihan sasaran ${i} unik dan benar bukan yang pertama (${p})`);
  }
  cek(/belum sebanyak benda/.test(L.petunjukTurus(a)) && !L.periksaTurus(a).ok && tanpaDigit(L.petunjukTurus(a)), "turus: sebelum garis ditambah, petunjuk menunjuk langkah yang belum dilakukan");
  let g = a;
  for (let i = 1; i <= 13; i += 1) {
    const r = L.tambahGaris(g);
    cek(r.ok && r.k.garis === i && L.bundelSekarang(r.k) === Math.floor(i / 5) && L.sisaSekarang(r.k) === i % 5, `turus: garis ke-${i} ditambah, garis kelima menjadi bundel (${L.bundelSekarang(r.k)} bundel, ${L.sisaSekarang(r.k)} sisa)`);
    g = r.k;
  }
  cek(L.pilihTurus(L.hapusGaris(g).k, 0).turusPilih === -1 && L.hapusGaris(g).k.garis === 12 && !L.hapusGaris(a).ok, "turus: memilih banyak sebelum garis sebanyak benda diabaikan, hapus garis bekerja");
  const tambahLagi = L.tambahGaris(g);
  cek(tambahLagi.k.garis === 14 && /terlalu banyak/.test(L.petunjukTurus(tambahLagi.k)) && !L.periksaTurus(tambahLagi.k).ok, "turus: terlalu banyak garis, petunjuk menyuruh menghapus");
  cek(/Pilih satu banyak/.test(L.petunjukTurus(g)) && !L.periksaTurus(g).ok, "turus: garis sudah pas tetapi belum memilih banyak");
  const pt = L.pilihanTurus(g);
  const kelirut = L.pilihTurus(g, pt.findIndex((x) => x !== 13));
  cek(!L.periksaTurus(kelirut).ok && /empat tegak dan satu miring/.test(L.petunjukTurus(kelirut)) && tanpaDigit(L.petunjukTurus(kelirut)), "turus: banyak keliru, petunjuk menjelaskan bundel lima");
  const betulT = L.periksaTurus(L.pilihTurus(g, pt.indexOf(13)));
  cek(betulT.ok && betulT.k.turusBenar.join() === "0" && betulT.k.turusKe === 1 && betulT.k.garis === 0 && betulT.k.turusPilih === -1, "turus: banyak tepat membuka benda berikutnya dengan turus kosong");
  sama(S.misiBaru(MK.MISI_A, betulT.k, new Set()), ["a-turus"], "turus: misi a-turus");
  let maks = a;
  for (let i = 0; i < 25; i += 1) maks = L.tambahGaris(maks).k;
  cek(maks.garis === DS.MAKS_GARIS && !L.tambahGaris(maks).ok, "turus: berhenti di batas alat");
  cek(tanpaDigit(L.kalimatTurus(a)) && tanpaDigit(L.kalimatTurus(g)) && tanpaDigit(L.kalimatTurus(L.tambahGaris(a).k)) && tanpaDigit(L.kalimatTurus(betulT.k)), "turus: kalimat tanpa digit");
  // Mulai lagi dan ganti alat.
  cek(L.mulaiLagiCatat().urutKe === 0 && L.mulaiLagiCatat().garis === 0 && !L.mulaiLagiCatat().tolak && L.pilihModeCatat(a, "turus").mode === "turus", "mulai lagi dan ganti alat");
  // Misi.
  const A = MK.MISI_A;
  cek(A.filter((m) => m.wajib).length === 4 && A.filter((m) => !m.wajib).length === 2, "misi A: empat wajib, dua bebas");
  cek(new Set(A.map((m) => m.id)).size === 6 && A.every((m) => m.id.startsWith("a-") && m.teks.length >= 10 && m.teks.length <= 120 && tanpaDigit(m.teks) && bersih(m.teks)), "misi A: id berawalan a-, unik, 10 sampai 120 huruf, tanpa digit");
  sama(MK.daftarMisiK3Bab5("A"), A, "daftarMisiK3Bab5 A");
  cek(A.every((m) => !m.cek({ alat: "kerangka" })), "misi A: alat lain tidak memenuhi misi");
  sama(S.misiBaru(A, a, new Set()), [], "misi A: keadaan awal tanpa misi baru");
  cek(S.misiBaru(A, { ...a, salah: 9, mode: "turus", susun: [1, 3, 4, 7, 9], urutSel: 2, ujungUrut: true, ujungSel: 1, kecilTanda: 0, besarTanda: 4, jangPilih: 1, jangCek: true, bandLebih: 0, bandPilih: 2, garis: 13, turusPilih: 2 }, new Set()).length === 0, "misi A: kartu yang digeser, tanda, pilihan, dan garis yang belum diperiksa tidak dihitung sebagai misi");
  sama(S.misiBaru(A, { ...a, urutBenar: [0], ujungBenar: [0], jangBenar: [0], turusBenar: [0], bandBenar: [0], tolak: true }, new Set()), ["a-urut", "a-ujung", "a-jangkau", "a-turus", "a-banding", "a-tolak"], "misi A: semua misi tercapai");
}

/* ------------------------------ Mind-map: catatan Pak Hasan (sembilan kartu geser) ------------------------------ */
{
  const KA = DK.KARTU_PAPAN;
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
  for (const m of ["Garis Urutan", "Cek Jangkauan", "Hitung Turus", "Dikumpulkan", "Diurutkan", "Lihat ujung", "Dikurangkan", "Satu garis, satu data"]) cek(cara.toLowerCase().includes(m.toLowerCase()), `kartu: cara memuat ${m}`);
  const gab = KA.map((k) => [k.judul, k.masalah.label, k.cara.label, k.hasil.label, k.masalah.arti, k.cara.arti, k.hasil.arti].join(" ")).join(" ").toLowerCase();
  for (const s of ["data", "urut", "terkecil", "terbesar", "jangkauan", "selisih", "turus", "bundel", "garis kelima", "lebih banyak", "lebih sedikit", "banyak"]) cek(gab.includes(s), `kartu: memuat poin "${s}"`);
  cek(!new RegExp("\\b(raka|salsa|bima|pak joko|pak hasan|bu wulan|bengkel|sepeda|ban bocor|rantai)\\b", "i").test(gab), "kartu: hanya poin pelajaran (tanpa tokoh dan benda cerita)");
  cek(tanpaDigit(DK.SUARA_KARTU_PAPAN + DK.SELESAI_KARTU_PAPAN) && bersih(DK.SUARA_KARTU_PAPAN + DK.SELESAI_KARTU_PAPAN), "kartu: suara dan pesan selesai tanpa digit dan kata terlarang");
  cek(emojiSah(DK.TEMA_KARTU_PAPAN.ikon) && DK.TEMA_KARTU_PAPAN.judul.length > 5, "kartu: tema sah");
  const RG = DK.RINGKASAN_PAPAN;
  cek(RG.ikon.length === DK.KARTU_PAPAN.length && new Set(RG.ikon).size === RG.ikon.length && [...RG.ikon, RG.pusat].every((e) => emojiSah(e) && !/[A-Za-z0-9]/.test(e)), "peta radial: satu gambar unik per kartu, gambar sah tanpa huruf");
  cek(tanpaDigit(RG.suara) && bersih(RG.suara) && !RG.ikon.includes(RG.pusat), "peta radial: suara bersih dan pusat berbeda dari cabang");
}

/* ------------------------------ Infografis: daftar sepeda (satu tabel lima baris) ------------------------------ */
{
  const B = DK.BARIS_INFO_PAPAN;
  cek(B.length === 5 && DK.KOLOM_INFO_PAPAN.length === 3, "infografis: lima baris dan tiga kolom");
  cek(B.every((b) => b.isi.length === 3 && emojiSah(b.ikon) && b.nama.length > 4), "infografis: tiap baris tiga isian, emoji sah");
  const jumlahContoh = B.map((b) => b.contoh.length);
  cek(jumlahContoh[0] === 3 && jumlahContoh.slice(1).every((n) => n === 0), "infografis: baris satu penuh contoh, baris dua sampai lima mandiri");
  const semua = B.flatMap((b) => b.isi);
  cek(B.every((b) => new Set(b.isi.map((x) => x.t)).size === 3), "infografis: tiga label tiap baris berbeda");
  cek(new Set(semua.map((x) => x.t)).size === semua.length, "infografis: semua label unik");
  cek(semua.every((x) => x.t.length <= 28 && x.t.split(/\s+/).length <= 5 && bersih(x.t) && bersih(x.s ?? "")), "infografis: label pendek (paling banyak lima kata) dan tanpa kata terlarang");
  cek(semua.every((x) => tanpaDigit(x.s ?? x.t)), "infografis: ucapan label tanpa digit");
  const gab = B.map((b) => [b.nama, ...b.isi.map((x) => x.t)].join(" ")).join(" ").toLowerCase();
  for (const s of ["mengurutkan data", "mencari ujung", "menghitung jangkauan", "memeriksa jangkauan", "menghitung turus", "kecil ke besar", "terkecil, terbesar", "selisih didapat", "sama dengan terbesar", "garis kelima miring"]) cek(gab.includes(s), `infografis: memuat "${s}"`);
  cek(!new RegExp("\\b(raka|salsa|bima|pak joko|pak hasan)\\b", "i").test(gab), "infografis: tanpa nama tokoh");
  cek(tanpaDigit(DK.SUARA_INFO_PAPAN + DK.SELESAI_INFO_PAPAN) && bersih(DK.SUARA_INFO_PAPAN + DK.SELESAI_INFO_PAPAN) && emojiSah(DK.TEMA_INFO_PAPAN.ikon), "infografis: suara dan tema bersih");
}

/* ------------------------------ Pengenal ucapan ------------------------------ */
{
  const nm = (nama) => ({ jenis: "nama", nama });
  const an = (n) => ({ jenis: "angka", n });
  for (const nama of ["terkecil", "terbesar", "sama", "berbeda"]) cek(K.cocokUcapan(nama, nm(nama)).cocok && K.kataDariUcapan(nama).length === 1, `cocok: kata ${nama} dikenali tepat satu`);
  sama(K.kataDariUcapan("paling kecil"), ["terkecil"], "ucapan: paling kecil dikenali sebagai terkecil");
  sama(K.kataDariUcapan("yang paling besar"), ["terbesar"], "ucapan: paling besar dikenali sebagai terbesar");
  sama(K.kataDariUcapan("tidak sama"), [], "ucapan: tidak sama tidak dihitung");
  sama(K.kataDariUcapan("beda"), ["berbeda"], "ucapan: beda dikenali sebagai berbeda");
  sama(K.kataDariUcapan("halo"), [], "ucapan: kata lain tidak dikenali");
  cek(!K.cocokUcapan("terkecil", nm("terbesar")).cocok && !K.cocokUcapan("sama", nm("berbeda")).cocok && !K.cocokUcapan("terbesar", nm("terkecil")).cocok, "cocok: kata berbeda tidak cocok");
  sama(K.angkaDariUcapan("lima"), [5], "angka: lima");
  sama(K.angkaDariUcapan("sembilan, 4 dan tiga"), [9, 4, 3], "angka: satuan dan angka tertulis");
  sama(K.angkaDariUcapan("dua belas"), [12], "angka: dua belas");
  sama(K.angkaDariUcapan("sembilan belas"), [19], "angka: sembilan belas");
  sama(K.angkaDariUcapan("nol"), [0], "angka: nol");
  for (let n = 0; n <= 150; n += 1) cek(K.angkaDariUcapan(LC.kataBil(n)).join() === String(n), `angka: kata bilangan ${n} dikenali utuh (${LC.kataBil(n)} -> ${K.angkaDariUcapan(LC.kataBil(n))})`);
  cek(K.cocokUcapan("lima", an(5)).cocok && K.cocokUcapan("5", an(5)).cocok && !K.cocokUcapan("enam", an(5)).cocok, "cocok: bilangan lima");
  cek(K.cocokUcapan("sebelas", an(11)).cocok && !K.cocokUcapan("sebelas", an(1)).cocok && !K.cocokUcapan("dua puluh satu", an(1)).cocok, "cocok: bilangan dua angka dikenali utuh");
}

/* ------------------------------ CPA ------------------------------ */
const TAHAP = { Concrete: ["benda", D.CONCRETE], Pictorial: ["diagram", D.PICTORIAL], Abstract: ["lambang", D.ABSTRACT] };
const CARA = ["klik", "kanvas", "suara"];
const METODE = ["igil", "garis", "cek", "turus"];
/** Jenis tugas dasar yang diharapkan per tahap, cara, dan urutan metode (salah = Cari kesalahan dengan dasar tugas itu). */
const TIPE = {
  Concrete: { klik: ["ujung", "garis", "cek", "turus"], kanvas: ["jangkau", "garis", "cek", "turus"], suara: ["urut", "garis", "cek", "turus"] },
  Pictorial: { klik: ["jangkau", "garis", "cek", "turus"], kanvas: ["ujung", "garis", "cek", "turus"], suara: ["urut", "garis", "cek", "turus"] },
  Abstract: { klik: ["jangkau", "garis", "cek", "turus"], kanvas: ["urut", "garis", "cek", "turus"], suara: ["ujung", "garis", "cek", "turus"] },
};
/** Tempat Cari kesalahan: [indeks misi, indeks langkah]. */
const TEMPAT_SALAH = { Concrete: [[0, 0]], Pictorial: [[0, 0], [0, 3]], Abstract: [[0, 0]] };
const semuaTeksLangkah = (ls, rupa, cara) => [ls.judul, ls.suara, LC.instruksi(ls.langkah, rupa, cara, ls.metode), LC.kalimatTanya(ls.langkah, cara), LC.kalimatKunci(ls.langkah, cara), LC.petunjukSalah(ls.langkah, cara, 1)];
{
  sama(LC.URUT_METODE, METODE, "urutan metode");
  cek(LC.NAMA_METODE.igil.includes("Urutkan, Cari Ujung, Kurangkan") && LC.NAMA_METODE.garis.includes("Number Order Line") && LC.NAMA_METODE.cek.includes("Range Check") && LC.NAMA_METODE.turus.includes("Tally Count"), "nama metode IGIL dan tiga metode global");
  cek(METODE.every((m) => emojiSah(LC.IKON_METODE[m])), "ikon metode sah");
  let nomor = 2;
  for (const [nama, [rupa, soal]] of Object.entries(TAHAP)) {
    cek(soal.length === 3 && soal.map((s) => s.cara).join() === CARA.join(), `${nama}: tiga misi Klik, Kanvas, Suara`);
    cek(soal.every((s) => s.langkah.length === 4 && s.langkah.map((l) => l.metode).join() === METODE.join()), `${nama}: empat langkah per misi (IGIL, Number Order Line, Range Check, Tally Count)`);
    for (const s of soal) {
      cek(s.nomor === nomor, `${nama}: nomor misi berlanjut ${nomor}`);
      nomor += 1;
      cek(s.judul.startsWith("Misi Catatan") && s.cerita.length > 15 && bersih(s.judul) && bersih(s.cerita), `${nama} ${s.nomor}: judul dan cerita sah`);
      sama(s.langkah.map((l) => LC.dasarDari(l.langkah).tipe), TIPE[nama][s.cara], `${nama} ${s.nomor}: jenis tugas per metode`);
      for (const ls of s.langkah) {
        cek(ls.cara === s.cara, `${nama} ${s.nomor}: cara langkah sama dengan misi`);
        const teks = semuaTeksLangkah(ls, rupa, s.cara);
        cek(teks.every((t) => tanpaDigit(t) && bersih(t)), `${nama} ${s.nomor} ${ls.metode}: teks tanpa digit dan kata terlarang (${teks.find((t) => !tanpaDigit(t) || !bersih(t)) ?? ""})`);
        cek(emojiSah(teks.join("")), `${nama} ${s.nomor} ${ls.metode}: emoji sah`);
        cek(ls.judul === ls.suara && ls.judul === LC.instruksi(ls.langkah, rupa, s.cara, ls.metode), `${nama} ${s.nomor} ${ls.metode}: judul dan suara sama dengan instruksi`);
        if (rupa !== "benda") cek(!adaEmoji(teks.join(" ")), `${nama} ${s.nomor} ${ls.metode}: teks tugas tanpa emoji (batas rupa)`);
        cek(/Metode IGIL|Number Order Line|Range Check|Tally Count|sudah menjawab/.test(ls.judul), `${nama} ${s.nomor} ${ls.metode}: judul tugas memuat nama metode`);
      }
    }
    // Cari kesalahan di tempat yang ditentukan.
    const salahL = soal.flatMap((s, si) => s.langkah.map((l, li) => [si, li, l])).filter(([, , l]) => l.langkah.tipe === "salah");
    sama(salahL.map(([si, li]) => [si, li]), TEMPAT_SALAH[nama], `${nama}: tempat Cari kesalahan`);
    for (const [, , l] of salahL) {
      const x = l.langkah;
      cek(x.alasan.length === 3 && new Set(x.alasan).size === 3 && x.benar >= 0 && x.benar <= 2 && x.keliru.length > 20 && x.kataTokoh.length > 15 && ["Raka", "Salsa", "Bima"].includes(x.tokoh), `${nama}: Cari kesalahan lengkap`);
      cek(tanpaDigit(x.kataTokoh + x.alasan.join(" ") + x.keliru) && bersih(x.kataTokoh + x.alasan.join(" ") + x.keliru), `${nama}: Cari kesalahan tanpa digit dan kata terlarang`);
      const pil = LC.pilihanKlik(x);
      cek(pil.length === 3 && new Set(pil).size === 3 && pil.includes(String(x.jawabTokoh)), `${nama}: pilihan klik Cari kesalahan memuat jawaban tokoh (${pil.join("/")})`);
      const teksBenar = LC.teksKunciKlik(x);
      cek(teksBenar !== null, `${nama}: jawaban sendiri ada`);
      if (x.betul) cek(String(teksBenar) === String(x.jawabTokoh), `${nama}: jawaban tokoh yang benar sama dengan jawaban benar`);
      else cek(String(teksBenar) !== String(x.jawabTokoh), `${nama}: jawaban benar berbeda dari jawaban tokoh`);
      cek(LC.petunjukSalah(x, "klik", x.jawabTokoh).startsWith(`Itu jawaban ${x.tokoh}`), `${nama}: petunjuk menjelaskan jawaban tokoh`);
      // Petunjuk tidak membocorkan jawaban: tidak menyebut bilangan jawaban benar dalam kata.
      if (!x.betul) cek(!LC.petunjukSalah(x, "klik", x.jawabTokoh).includes(LC.kataBil(Number(teksBenar))) || Number(teksBenar) < 6, `${nama}: petunjuk tokoh tidak membocorkan jawaban`);
    }
  }
  cek(nomor === 11, "nomor misi berlanjut sampai sepuluh");
  // Seed Cari kesalahan dari alur.
  const sC = D.CONCRETE[0].langkah[0].langkah;
  cek(sC.tokoh === "Raka" && sC.dasar.tipe === "ujung" && sC.jawabTokoh === String(sC.dasar.data[0]) && LC.teksKunciKlik(sC) === String(Math.min(...sC.dasar.data)) && !sC.betul, "Cari kesalahan Concrete: Raka menyebut data pertama sebagai terkecil tanpa mengurutkan (seed alur)");
  const sP = D.PICTORIAL[0].langkah[0].langkah;
  cek(sP.tokoh === "Bima" && sP.dasar.tipe === "jangkau" && sP.dasar.data.join() === "8,2,5" && sP.jawabTokoh === "6" && LC.teksKunciKlik(sP) === "6" && sP.betul === true && sP.benar === 0, "Cari kesalahan Pictorial: Bima menyebut jangkauan 8, 2, 5 adalah 6, benar (seed alur)");
  const sT = D.PICTORIAL[0].langkah[3].langkah;
  cek(sT.tokoh === "Raka" && sT.dasar.tipe === "turus" && sT.dasar.banyak === 12 && sT.jawabTokoh === "14" && LC.teksKunciKlik(sT) === "12" && !sT.betul, "Cari kesalahan Pictorial: Raka menghitung coretan miring sebagai garis keenam (seed alur)");
  const sA = D.ABSTRACT[0].langkah[0].langkah;
  cek(sA.tokoh === "Salsa" && sA.dasar.tipe === "jangkau" && sA.jawabTokoh === String(Math.max(...sA.dasar.data) + Math.min(...sA.dasar.data)) && LC.teksKunciKlik(sA) === String(LC.jangkauan(sA.dasar.data)) && !sA.betul, "Cari kesalahan Abstract: Salsa menjumlahkan terbesar dan terkecil untuk jangkauan (seed alur)");
  // Posisi alasan benar (rumus di LangkahPapan): tidak selalu tombol pertama.
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
        const seed = ls.langkah.tipe === "salah";
        cek(typeof d.benda === "string" && d.benda.length >= 3, `${tag}: benda bernama`);
        if (rupa === "benda") cek(!!DG_EMOJI[d.benda] && emojiSah(DG_EMOJI[d.benda]), `${tag}: Concrete memakai benda beremoji (${d.benda})`);
        if (d.data) {
          cek(d.data.length >= 3 && d.data.length <= 6 && d.data.every((n) => Number.isInteger(n) && n >= 1 && n <= 9), `${tag}: data satu angka, tiga sampai enam (${d.data})`);
          if (!seed) cek(!samaSet(d.data) && new Set(d.data).size === d.data.length, `${tag}: data berbeda dari Story dan tanpa kembar`);
          if (d.tipe === "urut") cek(urutNaik(d.data).join() !== d.data.join() && urutNaik(d.data).reverse().join() !== d.data.join() && d.ke >= 1 && d.ke <= d.data.length, `${tag}: data belum berurutan di awal, nomor urutan sah`);
          if (d.tipe === "ujung") cek(d.data[0] !== Math.min(...d.data) && d.data[0] !== Math.max(...d.data) && (d.cari === "kecil" ? d.data.indexOf(Math.min(...d.data)) : d.data.indexOf(Math.max(...d.data))) >= 0, `${tag}: data pertama bukan terkecil dan terbesar (jebakan seed)`);
          if (d.tipe === "jangkau" && !seed) cek(LC.jangkauan(d.data) >= 3, `${tag}: jangkauan sedikitnya tiga`);
          if (d.tipe === "garis") cek(new Set(d.data).size === d.data.length && d.data.length >= 4 && LC.jangkauan(d.data) >= 4, `${tag}: titik garis urutan berbeda-beda dan menyebar`);
        }
        if (d.tipe === "cek") {
          cek(d.kecil >= 1 && d.besar <= 9 && d.kecil < d.besar && d.klaim >= 2 && d.klaim <= 9, `${tag}: Range Check terkecil, terbesar, dan jangkauan dicatat sah`);
          cek(!(d.kecil === 3 && d.besar === 9), `${tag}: berbeda dari Story (tiga dan sembilan)`);
          if (s.cara === "suara") cek((d.kecil + d.klaim === d.besar) === (LC.kunciJawab(d, "suara").nama === "sama"), `${tag}: sama atau berbeda dihitung dari data`);
        }
        if (d.tipe === "turus") {
          cek(d.banyak >= 6 && d.banyak <= 20 && d.banyak % 5 !== 0 && ![8, 7].includes(d.banyak), `${tag}: turus ${d.banyak} bukan kelipatan lima, di antara enam dan dua puluh, berbeda dari Story`);
          const seg = T.segTurus(d.banyak, { x: 0, y: 0 });
          cek(seg.length === d.banyak && seg.filter((q) => q.miring).length === LC.bundel(d.banyak), `${tag}: gambar turus sesuai data`);
        }
      }
  // Tiap metode tampak di tiap tahap: tiap tahap memuat semua jenis tugas.
  for (const [nama, [, soal]] of Object.entries(TAHAP)) {
    const tipe = new Set(soal.flatMap((s) => s.langkah.map((l) => LC.dasarDari(l.langkah).tipe)));
    cek(["urut", "ujung", "jangkau", "garis", "cek", "turus"].every((t) => tipe.has(t)), `${nama}: jenis tugas urut, ujung, jangkau, garis, cek, turus ada`);
    const garisUjung = new Set(soal.flatMap((s) => s.langkah.map((l) => LC.dasarDari(l.langkah)).filter((d) => d.tipe === "garis").map((d) => d.ujung)));
    cek(garisUjung.has("kiri") && garisUjung.has("kanan"), `${nama}: garis urutan dibaca di titik kiri dan kanan`);
    const arahUrut = new Set(soal.flatMap((s) => s.langkah.map((l) => LC.dasarDari(l.langkah)).filter((d) => d.tipe === "urut").map((d) => d.arah)));
    cek(arahUrut.size >= 1, `${nama}: tugas urutan ada`);
  }
  cek(new Set([...D.CONCRETE, ...D.PICTORIAL, ...D.ABSTRACT].flatMap((s) => s.langkah.map((l) => LC.dasarDari(l.langkah)).filter((d) => d.tipe === "urut").map((d) => d.arah))).size === 2, "tugas urutan: naik dan turun ada");
}

/* ------------------------------ Tugas dihitung dari data ------------------------------ */
{
  const nama = (k) => (k ? (k.jenis === "nama" ? k.nama : k.n) : null);
  const dataU = [6, 2, 9, 5, 4];
  // Jawaban benar tiap jenis tugas dihitung dari data.
  sama(["klik", "kanvas", "suara"].map((c) => nama(LC.kunciJawab({ tipe: "urut", benda: "x", data: dataU, arah: "naik", ke: 4 }, c))), ["2 4 5 6 9", 6, 6], "kunci urut naik: urutan, bilangan ke empat, bilangan ke empat");
  sama(["klik", "kanvas"].map((c) => nama(LC.kunciJawab({ tipe: "urut", benda: "x", data: dataU, arah: "turun", ke: 2 }, c))), ["9 6 5 4 2", 6], "kunci urut turun");
  sama(["klik", "kanvas", "suara"].map((c) => nama(LC.kunciJawab({ tipe: "ujung", benda: "x", data: dataU, cari: "kecil" }, c))), [2, 2, "terkecil"], "kunci ujung terkecil: bilangan, bilangan, kata");
  sama(["klik", "kanvas", "suara"].map((c) => nama(LC.kunciJawab({ tipe: "ujung", benda: "x", data: dataU, cari: "besar" }, c))), [9, 9, "terbesar"], "kunci ujung terbesar");
  sama(["klik", "kanvas", "suara"].map((c) => nama(LC.kunciJawab({ tipe: "jangkau", benda: "x", data: dataU }, c))), [7, 7, 7], "kunci jangkauan");
  sama(["klik", "kanvas", "suara"].map((c) => nama(LC.kunciJawab({ tipe: "garis", benda: "x", data: dataU, ujung: "kiri" }, c))), [2, 7, 2], "kunci garis kiri: titik kiri, loncatan, titik kiri");
  sama(["klik", "suara"].map((c) => nama(LC.kunciJawab({ tipe: "garis", benda: "x", data: dataU, ujung: "kanan" }, c))), [9, 9], "kunci garis kanan");
  sama(["klik", "kanvas", "suara"].map((c) => nama(LC.kunciJawab({ tipe: "cek", benda: "x", kecil: 3, besar: 9, klaim: 6 }, c))), [9, 6, "sama"], "kunci cek benar: jumlah, jangkauan sebenarnya, sama");
  sama(["klik", "kanvas", "suara"].map((c) => nama(LC.kunciJawab({ tipe: "cek", benda: "x", kecil: 3, besar: 9, klaim: 7 }, c))), [10, 6, "berbeda"], "kunci cek keliru: jumlah, jangkauan sebenarnya, berbeda");
  sama(["klik", "kanvas", "suara"].map((c) => nama(LC.kunciJawab({ tipe: "turus", benda: "x", banyak: 13 }, c))), [13, 2, 13], "kunci turus: banyak, bundel penuh, banyak");
  sama([LC.bundel(18), LC.sisaGaris(18), LC.bundel(4), LC.jangkauan([6, 2, 9]), LC.teksUrut([3, 1, 2], "turun")], [3, 3, 0, 7, "3 2 1"], "pembantu data");
  sama(LC.urutkan([3, 1, 2]), [1, 2, 3], "urutkan tidak mengubah data asli");
  // Pengecoh.
  sama(LC.pengecoh({ tipe: "jangkau", benda: "x", data: [6, 2, 9] }, "klik").slice(0, 2), [11, 9], "pengecoh jangkauan: hasil menjumlahkan dan data terbesar");
  sama(LC.pengecoh({ tipe: "turus", benda: "x", banyak: 12 }, "klik", 14).slice(0, 2), [14, 4], "pengecoh turus dengan jawaban tokoh di depan: garis keenam");
  cek(LC.pengecoh({ tipe: "turus", benda: "x", banyak: 12 }, "klik").includes(14) === true, "pengecoh turus: coretan miring dihitung garis tambahan");
  cek(LC.pengecoh({ tipe: "cek", benda: "x", kecil: 3, besar: 9, klaim: 7 }, "klik").every((x) => x !== 10 && x >= 1 && x <= 99), "pengecoh cek: bukan jawaban benar dan sah");
  // Pilihan klik tugas urutan.
  const pu = LC.pilihanKlik({ tipe: "urut", benda: "x", data: dataU, arah: "naik", ke: 1 });
  cek(pu.length === 3 && new Set(pu).size === 3 && pu.includes("2 4 5 6 9") && pu[0] !== "2 4 5 6 9" && pu.includes("9 6 5 4 2"), `pilihan klik urutan: tiga urutan unik, benar bukan yang pertama, memuat urutan terbalik (${pu.join("/")})`);
  cek(LC.pilihanSuara({ tipe: "ujung", benda: "x", data: dataU, cari: "kecil" }, "suara").join() === "terbesar,terkecil" && LC.pilihanSuara({ tipe: "cek", benda: "x", kecil: 3, besar: 9, klaim: 6 }, "suara").join() === "berbeda,sama", "pilihan suara kata: dua kata, benar bukan yang pertama");

  for (const [namaT, [rupa, soal]] of Object.entries(TAHAP)) {
    const kanvasAngka = [];
    for (const s of soal)
      for (const ls of s.langkah) {
        const l = ls.langkah;
        const d = LC.dasarDari(l);
        const kunci = LC.kunciJawab(l, s.cara);
        const tag = `${namaT} ${s.nomor} ${ls.metode}`;
        cek(kunci !== null, `${tag}: jawaban benar ada untuk semua tugas`);
        cek(LC.siapLangsung(l, rupa, s.cara) === (l.tipe !== "salah"), `${tag}: siap langsung kecuali Cari kesalahan (tombol tidak macet)`);
        for (const r of ["benda", "diagram", "lambang"]) cek(LC.siapLangsung(l, r, s.cara) === LC.siapLangsung(l, rupa, s.cara), `${tag}: siap langsung tidak bergantung rupa (${r})`);
        if (kunci?.jenis === "angka") {
          if (s.cara === "kanvas") {
            kanvasAngka.push(kunci.n);
            cek(kunci.n >= 1 && kunci.n <= 9, `${tag}: jawaban kanvas satu angka satu sampai sembilan (${kunci.n})`);
          }
          if (s.cara === "klik") cek(kunci.n >= 1 && kunci.n <= 99, `${tag}: jawaban klik bilangan sampai sembilan puluh sembilan`);
          if (s.cara === "suara") cek(kunci.n >= 1 && kunci.n <= 99, `${tag}: jawaban suara bilangan pendek`);
        }
        if (kunci?.jenis === "nama") cek(s.cara !== "kanvas" && tanpaDigit(kunci.nama) === (d.tipe !== "urut"), `${tag}: jawaban nama bukan pada kanvas`);
        // Pilihan klik: tiga pilihan unik, jawaban benar tidak di tombol pertama.
        if (s.cara === "klik" && kunci !== null) {
          const pil = LC.pilihanKlik(l);
          const benar = LC.teksKunciKlik(l);
          cek(pil.length === 3 && new Set(pil).size === 3 && pil.includes(benar) && pil[0] !== benar, `${tag}: pilihan klik unik dan jawaban benar bukan yang pertama (${pil.join("/")})`);
          if (kunci.jenis === "angka") cek(pil.every((p) => /^\d{1,2}$/.test(p)) && benar === String(kunci.n), `${tag}: pilihan bilangan (${pil.join("/")})`);
        }
        if (s.cara === "suara" && kunci !== null) {
          const pil = LC.pilihanSuara(l, "suara");
          const benar = LC.teksKunciPilihan(kunci);
          cek(pil.includes(benar) && pil.length === (kunci.jenis === "nama" ? 2 : 3) && new Set(pil).size === pil.length && tanpaDigit(pil.join(" ")), `${tag}: pilihan cadangan suara memuat jawaban benar (${pil.join("/")})`);
          cek(pil[0] !== benar, `${tag}: jawaban suara bukan pilihan pertama`);
          cek(K.cocokUcapan(benar, kunci).cocok, `${tag}: ucapan jawaban benar dikenali (${benar})`);
          for (const lain of pil.filter((p) => p !== benar)) cek(!K.cocokUcapan(lain, kunci).cocok, `${tag}: ucapan ${lain} bukan jawaban benar`);
        }
        if (kunci) cek(LC.kalimatKunci(l, s.cara).length > 12 && tanpaDigit(LC.kalimatKunci(l, s.cara)), `${tag}: kalimat penjelasan ada, tanpa digit`);
        cek(LC.petunjukSalah(l, s.cara, "x").length > 20, `${tag}: petunjuk salah ada`);
        if (rupa === "lambang") {
          const baris = LC.barisKartu(d, s.cara);
          cek(Array.isArray(baris) && baris.length >= 2 && baris.every((b) => typeof b === "string" && b.length > 3), `${tag}: kartu kata ada`);
          cek(baris.every((b) => !adaEmoji(b)), `${tag}: kartu kata tanpa emoji`);
        }
      }
    cek(new Set(kanvasAngka).size === kanvasAngka.length && kanvasAngka.length === 4, `${namaT}: empat angka jawaban Tulis di kanvas tidak kembar (${kanvasAngka.join(", ")})`);
  }
  const kv = (nama) => TAHAP[nama][1].filter((s) => s.cara === "kanvas").flatMap((s) => s.langkah.map((l) => LC.kunciJawab(l.langkah, "kanvas").n));
  sama(kv("Concrete"), [6, 5, 7, 2], "angka kanvas Concrete");
  sama(kv("Pictorial"), [9, 6, 7, 3], "angka kanvas Pictorial");
  sama(kv("Abstract"), [8, 6, 5, 2], "angka kanvas Abstract");
  // Tugas suara bervariasi: kata dan bilangan.
  const suaraJenis = Object.values(TAHAP).flatMap(([, soal]) => soal[2].langkah.map((l) => LC.kunciJawab(l.langkah, "suara").jenis));
  cek(suaraJenis.includes("nama") && suaraJenis.includes("angka"), "tugas suara: kata dan bilangan");
  const kataSuara = Object.values(TAHAP).flatMap(([, soal]) => soal[2].langkah.flatMap((l) => (LC.kunciJawab(l.langkah, "suara").jenis === "nama" ? [LC.kunciJawab(l.langkah, "suara").nama] : [])));
  for (const w of ["terkecil", "sama", "berbeda"]) cek(kataSuara.includes(w), `tugas suara: kata ${w} muncul`);
  // Poin penting dan penutup.
  cek(D.POIN_PENTING.length >= 6 && D.POIN_PENTING.every((p) => p.length > 20 && bersih(p)) && D.POIN_PENTING_SUARA.every((p) => tanpaDigit(p) && !/[=<>+−]/.test(p)), "poin penting: banyak, bersih, suara tanpa digit dan tanda");
  const poin = D.POIN_PENTING.join(" ").toLowerCase();
  for (const m of ["data", "terkecil", "terbesar", "jangkauan", "selisih", "turus", "bundel", "garis urutan", "cek jangkauan", "hitung turus"]) cek(poin.includes(m), `poin penting memuat ${m}`);
  cek(tanpaDigit(D.PENUTUP_A) && bersih(D.PENUTUP_A) && /Bu Wulan/.test(D.PENUTUP_A) && /papan tabel/.test(D.PENUTUP_A) && D.PENUTUP_A.endsWith("?"), "penutup A: jembatan ke Sub-Bab B tanpa digit");
  cek(Object.values(D.TEMA_PAPAN).every((t) => emojiSah(t.ikon) && t.nama.length >= 7 && t.cara.length > 20 && tanpaDigit(t.cara) && bersih(t.cara)), "tema tiga tahap sah");
  cek(D.TEMA_PAPAN.pictorial.cara.includes("polos") && D.TEMA_PAPAN.abstract.cara.includes("kartu"), "tema: Pictorial polos, Abstract kartu");
  cek(D.CONCRETE_PAPAN === D.CONCRETE && D.PICTORIAL_PAPAN === D.PICTORIAL && D.ABSTRACT_PAPAN === D.ABSTRACT && D.MISI_PAPAN_TEKS === DS.MISI_PAPAN_TEKS, "nama ekspor untuk pemasang");
}

/* ------------------------------ Berkas ------------------------------ */
{
  const berkas = readdirSync(folderUrl).filter((f) => /\.(ts|tsx)$/.test(f));
  for (const nama of ["logika.ts", "data-sim.ts", "data-kartu.ts", "logika-cpa.ts", "data.ts", "periksa.ts", "turus.ts", "JawabPapan.tsx", "LangkahPapan.tsx", "GambarPapan.tsx", "TahapPapan.tsx", "SimulasiMejaCatat.tsx", "PapanHasan.tsx", "DaftarSepeda.tsx"]) cek(berkas.includes(nama), `berkas ${nama} ada`);
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folderUrl), "utf8");
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d || c.codePointAt(0) === 0x1f6de), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}/i.test(s), `${f}: kode emoji tidak melewati U+1FA95`);
    cek(!/buku|kelompok|bernilai|tebak/i.test(s), `${f}: tanpa kata buku, kelompok, bernilai, tebak`);
    if (/^(logika|logika-cpa|periksa|data|data-sim|data-kartu|turus)\.ts$/.test(f)) cek(!/from "react"|fetch\(/.test(s), `${f}: tanpa React dan jaringan`);
    cek(!/turus-k2b8a|gambar-k2b8b|tempat-k3b1a|kartu-k3b1b|urut-k3b1c|tambah-k3b1d|kurang-k3b1e|kali-k3b1f|bagi-k3b1g|kayu-k3b2a|botol-k3b2b|ukur-k3b3a|pita-k3b3b|timbang-k3b3c|bandul-k3b3d|bilah-k3b4a|sudut-k3b4b|lintasan-k3b4c|tabel-k3b5b|SubBabK3B5|turus-k3b5|eja-k3b5|data-k3b5|naskah-k3b5/.test(s), `${f}: tidak memakai folder bab atau sub-bab lain, atau berkas lama Bab 5`);
  }
  // Teks layar tidak memuat kata terlarang, termasuk nama berkas data.
  const layar = ["LangkahPapan.tsx", "TahapPapan.tsx", "SimulasiMejaCatat.tsx", "GambarPapan.tsx"].map((f) => readFileSync(new URL(f, folderUrl), "utf8")).join("\n");
  const teksLayar = [...layar.matchAll(/>\s*([^<>{}\n]{4,})\s*</g)].map((m) => m[1]).join(" ");
  cek(!/\b(skor|nilai|soal|tebak|kunci|latihan|teman|kelompok|buku)\b/i.test(teksLayar), "teks layar komponen tanpa kata terlarang");
  cek(/\bTugas\b/.test(layar) && !/>\s*Soal/.test(layar), "teks layar CPA memakai Tugas");
  cek(!/capitalize/.test(layar), "teks layar: tanpa kelas capitalize");
  const th = readFileSync(new URL("TahapPapan.tsx", folderUrl), "utf8");
  cek(/umum: Umum;\s*rupa: Rupa;\s*soal: SoalMisi\[\];\s*pita:/.test(th) && /teksAkhir: string/.test(th) && /poinPenting\?: boolean/.test(th), "TahapPapan: props umum, rupa, soal, pita, teksAkhir, poinPenting");
  cek(/IKON_METODE\[ls\.metode\]/.test(th) && /rupa === "benda" \?/.test(th), "TahapPapan: ikon metode hanya pada rupa benda (Pictorial dan Abstract tanpa emoji metode)");
  cek(/export default function TahapPapan/.test(th) && /Cari kesalahan/.test(th) && /POIN_PENTING/.test(th) && /PENUTUP_A/.test(th), "TahapPapan: ekspor, Cari kesalahan, Poin Penting, jembatan");
  cek(/"etalase"/.test(th) && /"kapur"/.test(th) && /"catatan"/.test(th) && !/"bambu"|"denah"|"daftar"|"tikar"|"peta"|"tirai"|"jepit"|"bungkus"|"kain"/.test(th), "TahapPapan: pola visual etalase bengkel, papan tulis berkapur, daftar catatan Pak Hasan (berbeda dari bab sebelumnya)");
  cek(/BENGKEL SEPEDA/.test(th) && /GrupTurus/.test(th) && /Cap /.test(th) || /cap/.test(th), "TahapPapan: kemajuan deret ban, deret garis turus, deret cap");
  const lg = readFileSync(new URL("LangkahPapan.tsx", folderUrl), "utf8");
  cek(/export function LangkahPapan/.test(lg) && /JawabSuaraPapan/.test(lg) && /JawabTulis/.test(lg) && /pilihanSuara\(l, cara\)/.test(lg) && /TampilDasar/.test(lg), "LangkahPapan: ekspor, jawab suara dengan pilihan ketuk, jawab tulis di kanvas");
  cek(/ucapkan\(/.test(lg), "LangkahPapan: ucapan memakai kata, bukan digit");
  const jw = readFileSync(new URL("JawabPapan.tsx", folderUrl), "utf8");
  cek(/gagalSekali/.test(jw) && /Ini jawaban yang benar|jawaban yang benar/.test(jw) && /PilihanKata/.test(jw) && /setCadangan\(true\)/.test(jw) && /e\.error === "not-allowed"/.test(jw), "JawabPapan: galat mikrofon dihitung gagal, pilihan ketuk sebagai cadangan, jawaban benar setelah tiga kali salah");
  const gm = readFileSync(new URL("GambarPapan.tsx", folderUrl), "utf8");
  cek(/export function TurusSvg/.test(gm) && /segTurus/.test(gm) && /export function TampilDasar/.test(gm) && /rupa === "lambang"/.test(gm) && /EMOJI_BENDA/.test(gm) && /GarisUrutan/.test(gm) && /KartuBilangan/.test(gm) && /Etalase/.test(gm), "GambarPapan: turus, etalase beremoji, kartu bilangan polos, garis urutan, tampilan dasar, kartu untuk Abstract");
  const sim = readFileSync(new URL("SimulasiMejaCatat.tsx", folderUrl), "utf8");
  cek(/export default function SimulasiMejaCatat/.test(sim) && /onKeadaan/.test(sim) && /MISI_PAPAN_TEKS/.test(sim), "SimulasiMejaCatat: ekspor, onKeadaan, teks misi");
  for (const [f, nm] of [["PapanHasan.tsx", "PapanHasanK3B5"], ["DaftarSepeda.tsx", "DaftarSepedaK3B5"]]) {
    const s = readFileSync(new URL(f, folderUrl), "utf8");
    cek(/speakGuru/.test(s) && /onLanjut/.test(s) && /teksLanjut/.test(s) && /peta-kartu\//.test(s) && new RegExp(`export default function ${nm}`).test(s) && new RegExp(`export \\{ ${nm} \\}`).test(s), `${f}: pembungkus tipis komponen bersama peta-kartu, ekspor ${nm}`);
  }
  // Berkas bersama: Simulasi memasang Meja Catat.
  const sk = readFileSync(new URL("../src/components/modul/SimulasiK3Bab5.tsx", import.meta.url), "utf8");
  cek(/SimulasiMejaCatat/.test(sk) && /laporMisiCatat\(daftarMisiK3Bab5\("A"\), k, a\.capai\)/.test(sk) && !/judulBab=\{`Kelas/.test(sk), "SimulasiK3Bab5: langkahMejaCatatA memasang Meja Catat, judul bab tanpa kata Kelas");
  // Berkas lama yang dipertahankan ada (dipakai bab lain dan bank soal).
  for (const f of ["data-k3b5.ts", "naskah-k3b5.ts", "eja-k3b5.ts", "dasar-k3b5.tsx", "diagram-k3b5.tsx", "turus-k3b5.tsx", "video-k3b5-umum.tsx"]) cek(readdirSync(new URL("../src/components/modul/", import.meta.url)).includes(f), `berkas lama ${f} dipertahankan`);
  const ej = readFileSync(new URL("../src/lib/ejaan-inggris-id.ts", import.meta.url), "utf8");
  cek(/number order line/i.test(ej) && /range check/i.test(ej) && /tally count/i.test(ej), "ejaan: tiga nama metode global ada");
}

console.log(`Lulus ${lulus}, gagal ${gagal}`);
process.exit(gagal ? 1 : 0);
