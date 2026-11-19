// Uji Mind-map (Papan Jatah), Infografis (Daftar Jatah), Simulasi Papan Jatah, dan tahap Concrete, Pictorial, Abstract Kelas 4 Bab 1 Sub-Bab H ("Papan Jatah Bu Ratna"),
// cerita Penginapan Pulau Karang Indah (pembagian sampai seratus: bagi rata, kurang berulang, bagi susun, sisa, periksa dengan perkalian).
// Memeriksa: logika simulasi (alat menolak Periksa selama masih bisa dibagikan, menolak mengurangi bila sisa kurang dari pembagi, menolak menurunkan sebelum sisa puluhan benar, menolak memutuskan sebelum Cek Kali),
// misi, sembilan kartu geser, daftar jatah, CPA dua belas langkah per tahap dengan Cari kesalahan, jawaban benar dihitung dari data, angka jawaban kanvas tidak kembar, tugas langsung siap, pengenal ucapan,
// petunjuk salah, batas rupa, gambar sungguh sebanyak datanya, emoji, kata terlarang, akhir baris.
// Jalankan: node --no-warnings scripts/uji-jatah-k4b1h.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/jatah-k4b1h/logika.ts");
const DS = await import("../src/components/modul/jatah-k4b1h/data-sim.ts");
const DK = await import("../src/components/modul/jatah-k4b1h/data-kartu.ts");
const LC = await import("../src/components/modul/jatah-k4b1h/logika-cpa.ts");
const D = await import("../src/components/modul/jatah-k4b1h/data.ts");
const K = await import("../src/components/modul/jatah-k4b1h/periksa.ts");
const S = await import("../src/components/modul/misi-simulasi.ts");
const MK = await import("../src/components/modul/misi-k4bab1.ts");
const MT = await import("../src/components/modul/misi-teks-k4b1.ts");
const folderUrl = new URL("../src/components/modul/jatah-k4b1h/", import.meta.url);
/** Benda beremoji pada GambarJatah.tsx (kunci EMOJI_BENDA), dibaca dari teks karena berkas tsx tidak bisa diimpor di Node. */
const DG_EMOJI = {};
{
  const gu = readFileSync(new URL("GambarJatah.tsx", folderUrl), "utf8");
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
/** Pembagian Story H (56 : 4, 59 : 4, 24 : 6, 36 : 6, 84 : 7): jangan dijadikan data CPA atau Simulasi. */
const DIVIDEN_CERITA = [56, 59, 24, 36, 84];

/* ------------------------------ Kata bilangan ------------------------------ */
{
  sama([0, 1, 9, 10, 11, 15, 20, 38, 100, 305].map(LC.kataBil), ["nol", "satu", "sembilan", "sepuluh", "sebelas", "lima belas", "dua puluh", "tiga puluh delapan", "seratus", "tiga ratus lima"], "kata bilangan CPA");
  cek(LC.kata === LC.kataBil, "alias kata");
  for (let n = 1; n <= 150; n += 1) cek(tanpaDigit(LC.kataBil(n)) && LC.kataBil(n) === L.kata(n), `kata bilangan ${n} sama di simulasi dan CPA`);
  sama([LC.ucapkan("56 : 4 = 14"), LC.ucapkan("2 3 5"), LC.ucapkan("9 × 3 + 2 = 29"), LC.ucapkan("habis")], ["lima puluh enam dibagi empat sama dengan empat belas", "dua tiga lima", "sembilan kali tiga ditambah dua sama dengan dua puluh sembilan", "habis"], "ucapkan: angka dan lambang menjadi kata");
}

/* ------------------------------ Hitungan pembagian ------------------------------ */
{
  const d = { n: 78, d: 6 };
  sama([LC.hasilBagi(d), LC.sisaBagi(d), LC.puluhanDari(d), LC.satuanDari(d), LC.hasilPuluhan(d), LC.sisaPuluhan(d), LC.gabungan(d), LC.hasilSatuan(d)], [13, 0, 7, 8, 1, 1, 18, 3], "hitungan bagi susun 78 : 6");
  const e = { n: 92, d: 4 };
  sama([LC.hasilBagi(e), LC.hasilPuluhan(e), LC.sisaPuluhan(e), LC.gabungan(e), LC.hasilSatuan(e)], [23, 2, 1, 12, 3], "hitungan bagi susun 92 : 4");
  for (let n = 10; n <= 99; n += 1) for (let p = 2; p <= 9; p += 1) {
    const x = { n, d: p };
    cek(LC.hasilPuluhan(x) * 10 + LC.hasilSatuan(x) === LC.hasilBagi(x) && LC.hasilBagi(x) * p + LC.sisaBagi(x) === n, `bagi susun ${n} : ${p} konsisten dengan hasil bagi dan sisa`);
  }
}

/* ------------------------------ Simulasi: data dan logika ------------------------------ */
{
  cek(DS.TARGET_RATA.length === 3 && DS.TARGET_RATA.every((t) => !DIVIDEN_CERITA.includes(t.n) && t.n >= 10 && t.d >= 2 && t.d <= 9 && DG_EMOJI[t.benda]) && DS.TARGET_RATA.some((t) => t.n % t.d === 0) && DS.TARGET_RATA.some((t) => t.n % t.d > 0), "simulasi: tiga rombongan berbeda dari Story, ada yang habis dan yang bersisa");
  cek(DS.TARGET_KURANG.length === 3 && DS.TARGET_KURANG.every((t) => !DIVIDEN_CERITA.includes(t.n) && t.n / t.d <= 9), "simulasi: tiga pengurangan berbeda dari Story");
  cek(DS.TARGET_SUSUN.length === 3 && DS.TARGET_SUSUN.every((t) => !DIVIDEN_CERITA.includes(t.n) && t.n >= 10 * t.d && t.n % t.d === 0) && DS.TARGET_SUSUN.some((t) => t.n % 10 === 0), "simulasi: tiga pembagian bersusun habis terbagi, ada yang angka satuannya nol");
  cek(DS.TARGET_KALI.length === 3 && DS.TARGET_KALI.some((t) => t.klaim * t.d === t.n) && DS.TARGET_KALI.some((t) => t.klaim * t.d !== t.n), "simulasi: klaim hasil bagi ada yang benar dan yang keliru");
  cek(tanpaDigit(DS.MISI_JATAH_TEKS) && bersih(DS.MISI_JATAH_TEKS) && DS.MISI_JATAH_TEKS === MT.MISI_K4B1.H && D.MISI_JATAH_TEKS === DS.MISI_JATAH_TEKS && DS.MISI_JATAH_TEKS.length >= 10 && DS.MISI_JATAH_TEKS.length <= 120, "simulasi: teks misi tanpa digit dan kata terlarang, sama dengan misi-teks-k4b1");

  const a = L.awalJatah();
  cek(a.alat === "jatah" && a.mode === "rata" && a.putaran === 0 && a.kali === 0 && !a.turun && !a.tolak && !a.kaliCek && a.salah === 0 && ["rataBenar", "kurangBenar", "susunBenar", "kaliBenar"].every((f) => a[f].length === 0), "simulasi: keadaan awal");
  // Rata.
  cek(L.hasilRata(a) === 6 && L.sisaRata(a) === 0 && L.tamuTersisa(a) === 18 && L.hasilRata({ ...a, rataKe: 1 }) === 4 && L.sisaRata({ ...a, rataKe: 1 }) === 3, "rata: hasil dan sisa dihitung dari data");
  for (let i = 0; i < 3; i += 1) {
    const k = { ...a, rataKe: i };
    const p = L.pilihanRata(k);
    cek(p.length === 3 && new Set(p).size === 3 && p.includes(L.hasilRata(k)) && p[0] !== L.hasilRata(k), `rata: pilihan sasaran ${i} unik dan benar bukan yang pertama (${p})`);
  }
  cek(/Masih ada koper/.test(L.petunjukRata(a)) && !/\btamu\b/.test(L.petunjukRata(a) + L.kalimatRata(a)) && tanpaDigit(L.petunjukRata(a)) && !L.periksaRata(a).ok && L.pilihRata(a, 0).rataPilih === -1, "rata: sebelum dibagikan, Periksa ditolak dan pilihan diabaikan, petunjuk menunjuk langkah yang belum dilakukan");
  let r = a;
  for (let i = 1; i <= 6; i += 1) {
    const x = L.bagikanPutaran(r);
    cek(x.ok && x.k.putaran === i && L.tamuTersisa(x.k) === 18 - 3 * i, `rata: putaran ke-${i} dibagikan, tamu tersisa ${18 - 3 * i}`);
    r = x.k;
  }
  const tolakR = L.bagikanPutaran(r);
  cek(!tolakR.ok && tolakR.k.tolak === true && tolakR.k.putaran === 6 && tolakR.k.salah === 0, "rata: alat menolak putaran bila tamu tidak cukup (bukan percobaan keliru)");
  sama(S.misiBaru(MK.MISI_H, tolakR.k, new Set()), ["h-tolak"], "rata: misi h-tolak");
  cek(/Pilih dulu/.test(L.petunjukRata(r)) && !L.periksaRata(r).ok, "rata: tamu habis tetapi belum memilih");
  const pr = L.pilihanRata(r);
  const rSalah = L.pilihRata(r, pr.findIndex((x) => x !== 6));
  cek(!L.periksaRata(rSalah).ok && /bukan banyak kamarnya/.test(L.petunjukRata(rSalah)) && L.periksaRata(rSalah).k.salah === 1, "rata: hasil keliru, petunjuk menjelaskan");
  const rBenar = L.periksaRata(L.pilihRata(r, pr.indexOf(6)));
  cek(rBenar.ok && rBenar.k.rataBenar.join() === "0" && rBenar.k.rataKe === 1 && rBenar.k.putaran === 0 && !rBenar.k.rataSisa, "rata: benar membuka rombongan berikutnya, tanpa sisa");
  sama(S.misiBaru(MK.MISI_H, rBenar.k, new Set()), ["h-rata"], "rata: misi h-rata");
  let r2 = rBenar.k;
  for (let i = 0; i < 4; i += 1) r2 = L.bagikanPutaran(r2).k;
  cek(L.tamuTersisa(r2) === 3 && !L.bagikanPutaran(r2).ok, "rata: dua puluh tiga ke lima kamar, empat putaran lalu tersisa tiga");
  const rBenar2 = L.periksaRata(L.pilihRata(r2, L.pilihanRata(r2).indexOf(4)));
  cek(rBenar2.ok && rBenar2.k.rataSisa === true, "rata: rombongan bersisa benar membuka tantangan sisa");
  sama(S.misiBaru(MK.MISI_H, rBenar2.k, new Set()), ["h-rata", "h-sisa"], "rata: misi h-sisa");
  cek(tanpaDigit(L.kalimatRata(a)) && tanpaDigit(L.kalimatRata(r)) && tanpaDigit(L.kalimatRata(r2)) && tanpaDigit(L.kalimatRata(rBenar.k)), "rata: kalimat tanpa digit");
  // Kurang.
  cek(L.hasilKurang(a) === 5 && L.sisaKurang(a) === 30 && L.hasilKurang({ ...a, kurangKe: 2 }) === 5 && L.sisaKurang({ ...a, kurangKe: 2 }) === 47, "kurang: hasil dan bilangan awal dari data");
  for (let i = 0; i < 3; i += 1) {
    const k = { ...a, kurangKe: i };
    const p = L.pilihanKurang(k);
    cek(p.length === 3 && new Set(p).size === 3 && p.includes(L.hasilKurang(k)) && p[0] !== L.hasilKurang(k), `kurang: pilihan sasaran ${i} unik dan benar bukan yang pertama (${p})`);
  }
  cek(/Bilangan masih bisa dikurangi/.test(L.petunjukKurang(a)) && !L.periksaKurang(a).ok && tanpaDigit(L.petunjukKurang(a)), "kurang: sebelum dikurangi, petunjuk menunjuk langkah yang belum dilakukan");
  let q = a;
  for (let i = 1; i <= 5; i += 1) {
    const x = L.kurangi(q);
    cek(x.ok && x.k.kali === i && L.sisaKurang(x.k) === 30 - 6 * i, `kurang: pengurangan ke-${i}`);
    q = x.k;
  }
  const tolakK = L.kurangi(q);
  cek(!tolakK.ok && tolakK.k.tolak && L.sisaKurang(q) === 0, "kurang: alat menolak mengurangi bila sisa kurang dari pembagi");
  const pk = L.pilihanKurang(q);
  cek(!L.periksaKurang(L.pilihKurang(q, pk.findIndex((x) => x !== 5))).ok && /bukan angka pembaginya/.test(L.petunjukKurang(L.pilihKurang(q, pk.findIndex((x) => x !== 5)))), "kurang: banyak keliru, petunjuk menjelaskan");
  const kBenar = L.periksaKurang(L.pilihKurang(q, pk.indexOf(5)));
  cek(kBenar.ok && kBenar.k.kurangBenar.join() === "0" && kBenar.k.kurangKe === 1 && kBenar.k.kali === 0, "kurang: benar membuka bilangan berikutnya");
  sama(S.misiBaru(MK.MISI_H, kBenar.k, new Set()), ["h-kurang"], "kurang: misi h-kurang");
  cek(L.pilihKurang(a, 0).kurangPilih === -1 && tanpaDigit(L.kalimatKurang(a)) && tanpaDigit(L.kalimatKurang(q)) && tanpaDigit(L.kalimatKurang(kBenar.k)), "kurang: pilihan sebelum waktunya diabaikan, kalimat tanpa digit");
  // Susun.
  cek(L.hasilPuluhanSusun(a) === 1 && L.sisaPuluhanSusun(a) === 1 && L.satuanSusun(a) === 8 && L.gabungSusun(a) === 18 && L.hasilSatuanSusun(a) === 3 && L.hasilSusun(a) === 13, "susun: 78 : 6 dihitung dari data");
  for (let i = 0; i < 3; i += 1) {
    const k = { ...a, susunKe: i };
    for (const [nama, pil, benar] of [["q1", L.pilihanQ1(k), L.hasilPuluhanSusun(k)], ["s1", L.pilihanS1(k), L.sisaPuluhanSusun(k)], ["q2", L.pilihanQ2(k), L.hasilSatuanSusun(k)]]) cek(pil.length === 3 && new Set(pil).size === 3 && pil.includes(benar) && pil[0] !== benar, `susun: pilihan ${nama} sasaran ${i} unik dan benar bukan yang pertama (${pil})`);
  }
  const tolakS = L.turunkanSusun(a);
  cek(!tolakS.ok && tolakS.k.tolak && !L.periksaSusun(a).ok && /Mulai dari puluhan/.test(L.petunjukSusun(a)) && tanpaDigit(L.petunjukSusun(a)), "susun: alat menolak menurunkan sebelum sisa puluhan dipilih, petunjuk menunjuk langkah yang belum dilakukan");
  sama(S.misiBaru(MK.MISI_H, tolakS.k, new Set()), ["h-tolak"], "susun: misi h-tolak");
  cek(L.pilihS1(a, 0).s1Pilih === -1 && L.pilihQ2(a, 0).q2Pilih === -1, "susun: sisa dan hasil satuan tidak bisa dipilih sebelum langkah sebelumnya");
  const q1Salah = L.pilihQ1(a, L.pilihanQ1(a).findIndex((x) => x !== 1));
  cek(!L.turunkanSusun(L.pilihS1(q1Salah, 0)).ok && /puluhannya saja/.test(L.petunjukSusun(q1Salah)), "susun: hasil puluhan keliru, petunjuk menjelaskan");
  const q1B = L.pilihQ1(a, L.pilihanQ1(a).indexOf(1));
  cek(/Pilih sisa/.test(L.petunjukSusun(q1B)), "susun: sesudah hasil puluhan, petunjuk meminta sisa");
  const s1Salah = L.pilihS1(q1B, L.pilihanS1(q1B).findIndex((x) => x !== 1));
  cek(!L.turunkanSusun(s1Salah).ok && /dikurangi hasil kali/.test(L.petunjukSusun(s1Salah)), "susun: sisa puluhan keliru, alat menolak menurunkan");
  const s1B = L.pilihS1(q1B, L.pilihanS1(q1B).indexOf(1));
  cek(/Turunkan angka dulu/.test(L.petunjukSusun(s1B)), "susun: sesudah sisa puluhan, petunjuk meminta menurunkan angka");
  const tn = L.turunkanSusun(s1B);
  cek(tn.ok && tn.k.turun && /Pilih hasil membagi bilangan yang baru/.test(L.petunjukSusun(tn.k)) && !L.periksaSusun(tn.k).ok, "susun: angka diturunkan, tinggal memilih hasil satuan");
  cek(!L.periksaSusun(L.pilihQ2(tn.k, L.pilihanQ2(tn.k).findIndex((x) => x !== 3))).ok, "susun: hasil satuan keliru");
  const sB = L.periksaSusun(L.pilihQ2(tn.k, L.pilihanQ2(tn.k).indexOf(3)));
  cek(sB.ok && sB.k.susunBenar.join() === "0" && sB.k.susunKe === 1 && !sB.k.turun && sB.k.q1Pilih === -1, "susun: benar membuka bilangan berikutnya");
  sama(S.misiBaru(MK.MISI_H, sB.k, new Set()), ["h-susun"], "susun: misi h-susun");
  cek(L.satuanSusun({ ...a, susunKe: 1 }) === 0 && L.hasilSusun({ ...a, susunKe: 1 }) === 18 && L.hasilSusun({ ...a, susunKe: 2 }) === 27, "susun: 90 : 5 dan 81 : 3 dihitung dari data");
  cek([a, q1B, s1B, tn.k, sB.k].every((x) => tanpaDigit(L.kalimatSusun(x))), "susun: kalimat tanpa digit");
  // Kali.
  cek(L.hasilKaliKlaim(a) === 45 && L.klaimBenar(a) && !L.klaimBenar({ ...a, kaliKe: 1 }) && L.hasilKaliKlaim({ ...a, kaliKe: 1 }) === 48, "kali: hasil kali klaim dan benar atau kelirunya dihitung dari data");
  const tolakKali = L.putusKali(a, 0);
  cek(!tolakKali.ok && tolakKali.k.tolak && /Tekan Cek Kali dulu/.test(L.petunjukKali(a)) && !L.periksaKali(a).ok && tanpaDigit(L.petunjukKali(a)), "kali: alat menolak memutuskan sebelum Cek Kali, petunjuk menunjuk langkah yang belum dilakukan");
  const ck = L.cekKali(a);
  cek(ck.kaliCek && /Pilih dulu/.test(L.petunjukKali(ck)) && !L.periksaKali(ck).ok, "kali: sesudah Cek Kali, petunjuk meminta keputusan");
  const salahKali = L.putusKali(ck, 1).k;
  cek(!L.periksaKali(salahKali).ok && /sama dengan bilangan awal/.test(L.petunjukKali(salahKali)), "kali: klaim benar dikira keliru");
  const kaliB = L.periksaKali(L.putusKali(ck, 0).k);
  cek(kaliB.ok && kaliB.k.kaliBenar.join() === "0" && kaliB.k.kaliKe === 1 && !kaliB.k.kaliCek && kaliB.k.kaliPutus === -1, "kali: keputusan benar membuka hasil bagi berikutnya");
  sama(S.misiBaru(MK.MISI_H, kaliB.k, new Set()), ["h-kali"], "kali: misi h-kali");
  const ck2 = L.cekKali({ ...a, kaliKe: 1 });
  cek(L.periksaKali(L.putusKali(ck2, 1).k).ok && !L.periksaKali(L.putusKali(ck2, 0).k).ok && /belum sama/.test(L.petunjukKali(L.putusKali(ck2, 0).k)), "kali: klaim keliru harus diputuskan keliru");
  cek([a, ck, kaliB.k].every((x) => tanpaDigit(L.kalimatKali(x))), "kali: kalimat tanpa digit");
  cek(L.mulaiLagiJatah().rataKe === 0 && L.pilihModeJatah(a, "kali").mode === "kali", "mulai lagi dan ganti alat");
  // Misi.
  const A = MK.MISI_H;
  cek(A.filter((m) => m.wajib).length === 4 && A.filter((m) => !m.wajib).length === 2, "misi H: empat wajib, dua bebas");
  cek(new Set(A.map((m) => m.id)).size === 6 && A.every((m) => m.id.startsWith("h-") && m.teks.length >= 10 && m.teks.length <= 120 && tanpaDigit(m.teks) && bersih(m.teks)), "misi H: id berawalan h-, unik, 10 sampai 120 huruf, tanpa digit");
  sama(MK.daftarMisiK4Bab1("H"), A, "daftarMisiK4Bab1 H");
  cek(A.every((m) => !m.cek({ alat: "kerangka" })), "misi H: alat lain tidak memenuhi misi");
  sama(S.misiBaru(A, a, new Set()), [], "misi H: keadaan awal tanpa misi baru");
}

/* ------------------------------ Mind-map: papan jatah (sembilan kartu geser) ------------------------------ */
{
  const KA = DK.KARTU_JATAH;
  cek(KA.length === 9, "kartu: sembilan kartu");
  cek(KA.every((k) => k.contoh.length <= 1) && KA[0].contoh.join() === "masalah" && KA.slice(1).every((k) => k.contoh.length === 0), "kartu: satu kotak contoh di kartu pertama saja");
  const semua = KA.flatMap((k) => [k.masalah, k.cara, k.hasil]);
  const label = semua.map((x) => x.label);
  cek(new Set(label).size === label.length, "kartu: label unik");
  cek(semua.every((x) => x.label.length >= 5 && x.label.length <= 36) && KA.every((k) => [k.masalah.label, k.cara.label, k.hasil.label].every((l) => l.split(/\s+/).length <= 6)), `kartu: label pendek (terpanjang ${Math.max(...label.map((l) => l.length))} huruf)`);
  cek(semua.every((x) => tanpaDigit(x.label) && tanpaDigit(x.arti) && bersih(x.label) && bersih(x.arti) && x.arti.length > 10) && KA.every((k) => tanpaDigit(k.judul) && bersih(k.judul)), "kartu: label, arti, dan judul tanpa digit dan kata terlarang");
  const cara = KA.map((k) => k.cara.label).join(" | ");
  for (const m of ["Bagi Rata", "Kurang Berulang", "Bagi Susun"]) cek(cara.includes(m), `kartu: cara memuat ${m}`);
  const gab = KA.map((k) => [k.judul, k.masalah.label, k.cara.label, k.hasil.label, k.masalah.arti, k.cara.arti, k.hasil.arti].join(" ")).join(" ").toLowerCase();
  for (const s of ["pembagian", "pembagi", "hasil bagi", "sisa", "dikalikan", "bersusun", "puluhan", "satuan", "bergiliran", "berkali-kali"]) cek(gab.includes(s), `kartu: memuat poin "${s}"`);
  cek(!/\b(satria|laras|genta|pak hendro|bu ratna|kak yoga|penginapan|kamar|tamu|koper)\b/i.test(gab), "kartu: hanya poin pelajaran (tanpa tokoh dan benda cerita)");
  cek(tanpaDigit(DK.SUARA_KARTU_JATAH + DK.SELESAI_KARTU_JATAH) && bersih(DK.SUARA_KARTU_JATAH + DK.SELESAI_KARTU_JATAH) && emojiSah(DK.TEMA_KARTU_JATAH.ikon) && DK.TEMA_KARTU_JATAH.judul.length > 5, "kartu: suara dan tema bersih");
  const RG = DK.RINGKASAN_JATAH;
  cek(RG.ikon.length === KA.length && new Set(RG.ikon).size === RG.ikon.length && [...RG.ikon, RG.pusat].every((e) => emojiSah(e) && !/[A-Za-z0-9]/.test(e)) && !RG.ikon.includes(RG.pusat) && tanpaDigit(RG.suara) && bersih(RG.suara), "peta radial: satu gambar unik per kartu, suara bersih");
}

/* ------------------------------ Infografis: daftar jatah (satu tabel lima baris) ------------------------------ */
{
  const B = DK.BARIS_INFO_JATAH;
  cek(B.length === 5 && DK.KOLOM_INFO_JATAH.length === 3 && B.every((b) => b.isi.length === 3 && emojiSah(b.ikon) && b.nama.length > 4), "infografis: lima baris, tiga kolom, emoji sah");
  cek(B[0].contoh.length === 3 && B.slice(1).every((b) => b.contoh.length === 0), "infografis: baris satu penuh contoh, baris dua sampai lima mandiri");
  const semua = B.flatMap((b) => b.isi);
  cek(B.every((b) => new Set(b.isi.map((x) => x.t)).size === 3) && new Set(semua.map((x) => x.t)).size === semua.length, "infografis: semua label unik");
  cek(semua.every((x) => x.t.length <= 28 && x.t.split(/\s+/).length <= 5 && bersih(x.t) && tanpaDigit(x.s ?? x.t)), "infografis: label pendek, tanpa kata terlarang, ucapan tanpa digit");
  const gab = B.map((b) => [b.nama, ...b.isi.map((x) => x.t)].join(" ")).join(" ").toLowerCase();
  for (const s of ["membagi rata", "mengurangi berulang", "membagi bersusun", "mencari sisa", "memeriksa hasil", "sisa lebih kecil", "sama dengan awal", "puluhan ke satuan"]) cek(gab.includes(s), `infografis: memuat "${s}"`);
  cek(!/\b(satria|laras|genta|pak hendro|bu ratna)\b/i.test(gab) && tanpaDigit(DK.SUARA_INFO_JATAH + DK.SELESAI_INFO_JATAH) && bersih(DK.SUARA_INFO_JATAH + DK.SELESAI_INFO_JATAH) && emojiSah(DK.TEMA_INFO_JATAH.ikon), "infografis: tanpa nama tokoh, suara dan tema bersih");
}

/* ------------------------------ Pengenal ucapan ------------------------------ */
{
  const nm = (nama) => ({ jenis: "nama", nama });
  const an = (n) => ({ jenis: "angka", n });
  for (const nama of ["habis", "sisa"]) cek(K.cocokUcapan(nama, nm(nama)).cocok && K.kataDariUcapan(nama).length === 1, `cocok: kata ${nama} dikenali tepat satu`);
  sama(K.kataDariUcapan("ada sisa"), ["sisa"], "ucapan: ada sisa");
  sama(K.kataDariUcapan("tidak ada sisa"), ["habis"], "ucapan: tidak ada sisa berarti habis");
  sama(K.kataDariUcapan("tanpa sisa"), ["habis"], "ucapan: tanpa sisa berarti habis");
  sama(K.kataDariUcapan("tidak habis"), [], "ucapan: tidak habis tidak dihitung");
  sama(K.kataDariUcapan("halo"), [], "ucapan: kata lain tidak dikenali");
  cek(!K.cocokUcapan("sisa", nm("habis")).cocok && !K.cocokUcapan("habis", nm("sisa")).cocok, "cocok: kata berbeda tidak cocok");
  sama(K.angkaDariUcapan("sembilan, 4 dan tiga"), [9, 4, 3], "angka: satuan dan angka tertulis");
  sama(K.angkaDariUcapan("sembilan belas"), [19], "angka: sembilan belas");
  for (let n = 0; n <= 150; n += 1) cek(K.angkaDariUcapan(LC.kataBil(n)).join() === String(n), `angka: kata bilangan ${n} dikenali utuh (${LC.kataBil(n)} -> ${K.angkaDariUcapan(LC.kataBil(n))})`);
  cek(K.cocokUcapan("lima belas", an(15)).cocok && K.cocokUcapan("15", an(15)).cocok && !K.cocokUcapan("lima", an(15)).cocok && !K.cocokUcapan("lima belas", an(5)).cocok, "cocok: bilangan dua angka dikenali utuh");
}

/* ------------------------------ CPA ------------------------------ */
const TAHAP = { Concrete: ["benda", D.CONCRETE], Pictorial: ["diagram", D.PICTORIAL], Abstract: ["lambang", D.ABSTRACT] };
const CARA = ["klik", "kanvas", "suara"];
const METODE = ["igil", "rata", "kurang", "susun"];
const TIPE = ["bagi", "rata", "kurang", "susun"];
/** Tempat Cari kesalahan: [indeks misi, indeks langkah]. */
const TEMPAT_SALAH = { Concrete: [[0, 1]], Pictorial: [[0, 3]], Abstract: [[0, 2]] };
const semuaTeksLangkah = (ls, rupa, cara) => [ls.judul, ls.suara, LC.instruksi(ls.langkah, rupa, cara, ls.metode), LC.kalimatTanya(ls.langkah, cara), LC.kalimatKunci(ls.langkah, cara), LC.petunjukSalah(ls.langkah, cara, 1)];
{
  sama(LC.URUT_METODE, METODE, "urutan metode");
  cek(LC.NAMA_METODE.igil.includes("Bagi Rata, Kurang Berulang, Bagi Susun") && LC.NAMA_METODE.rata.includes("Equal Sharing") && LC.NAMA_METODE.kurang.includes("Repeated Subtraction") && LC.NAMA_METODE.susun.includes("Long Division"), "nama metode IGIL dan tiga metode global");
  cek(METODE.every((m) => emojiSah(LC.IKON_METODE[m])), "ikon metode sah");
  let nomor = 2;
  for (const [nama, [rupa, soal]] of Object.entries(TAHAP)) {
    cek(soal.length === 3 && soal.map((s) => s.cara).join() === CARA.join(), `${nama}: tiga misi Klik, Kanvas, Suara`);
    cek(soal.every((s) => s.langkah.length === 4 && s.langkah.map((l) => l.metode).join() === METODE.join()), `${nama}: empat langkah per misi (IGIL, Equal Sharing, Repeated Subtraction, Long Division)`);
    for (const s of soal) {
      cek(s.nomor === nomor, `${nama}: nomor misi berlanjut ${nomor}`);
      nomor += 1;
      cek(s.judul.startsWith("Misi Jatah") && s.cerita.length > 15 && bersih(s.judul) && bersih(s.cerita), `${nama} ${s.nomor}: judul dan cerita sah`);
      sama(s.langkah.map((l) => LC.dasarDari(l.langkah).tipe), TIPE, `${nama} ${s.nomor}: jenis tugas per metode`);
      for (const ls of s.langkah) {
        cek(ls.cara === s.cara, `${nama} ${s.nomor}: cara langkah sama dengan misi`);
        const teks = semuaTeksLangkah(ls, rupa, s.cara);
        cek(teks.every((t) => tanpaDigit(t) && bersih(t)), `${nama} ${s.nomor} ${ls.metode}: teks tanpa digit dan kata terlarang (${teks.find((t) => !tanpaDigit(t) || !bersih(t)) ?? ""})`);
        cek(emojiSah(teks.join("")), `${nama} ${s.nomor} ${ls.metode}: emoji sah`);
        cek(ls.judul === ls.suara && ls.judul === LC.instruksi(ls.langkah, rupa, s.cara, ls.metode), `${nama} ${s.nomor} ${ls.metode}: judul dan suara sama dengan instruksi`);
        if (rupa !== "benda") cek(!adaEmoji(teks.join(" ")), `${nama} ${s.nomor} ${ls.metode}: teks tugas tanpa emoji (batas rupa)`);
        cek(/Metode IGIL|Equal Sharing|Repeated Subtraction|Long Division|sudah menjawab/.test(ls.judul), `${nama} ${s.nomor} ${ls.metode}: judul tugas memuat nama metode`);
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
      if (x.betul) cek(String(teksBenar) !== String(x.jawabTokoh) && !/\bdua\b/.test(x.alasan.join(" ") + x.keliru + x.kataTokoh), `${nama}: jawaban tokoh yang benar bukan jawaban tugas dan tidak menyebut hasil akhir`);
      else cek(String(teksBenar) !== String(x.jawabTokoh), `${nama}: jawaban benar berbeda dari jawaban tokoh`);
      cek(LC.petunjukSalah(x, "klik", x.jawabTokoh).startsWith(`Itu jawaban ${x.tokoh}`), `${nama}: petunjuk menjelaskan jawaban tokoh`);
      if (!x.betul) cek(!LC.petunjukSalah(x, "klik", x.jawabTokoh).includes(LC.kataBil(Number(teksBenar))) || Number(teksBenar) < 6, `${nama}: petunjuk tokoh tidak membocorkan jawaban`);
    }
  }
  cek(nomor === 11, "nomor misi berlanjut sampai sepuluh");
  // Seed Cari kesalahan dari alur.
  const sC = D.CONCRETE[0].langkah[1].langkah;
  cek(sC.tokoh === "Genta" && sC.dasar.tipe === "rata" && sC.dasar.tanya === "sisa" && sC.betul === true && sC.jawabTokoh === String(LC.hasilBagi(sC.dasar)) && LC.teksKunciKlik(sC) === String(LC.sisaBagi(sC.dasar)) && LC.sisaBagi(sC.dasar) < sC.dasar.d, "Cari kesalahan Concrete: Genta benar tentang hasil bagi, tugas menanyakan sisa (tidak membocorkan jawaban)");
  const sP = D.PICTORIAL[0].langkah[3].langkah;
  cek(sP.tokoh === "Satria" && sP.dasar.tipe === "susun" && sP.jawabTokoh === String(LC.hasilPuluhan(sP.dasar)) && LC.teksKunciKlik(sP) === String(LC.hasilBagi(sP.dasar)) && !sP.betul, "Cari kesalahan Pictorial: Satria lupa menurunkan angka satuan (seed alur)");
  const sA = D.ABSTRACT[0].langkah[2].langkah;
  cek(sA.tokoh === "Satria" && sA.dasar.tipe === "kurang" && sA.jawabTokoh === String(sA.dasar.d) && LC.teksKunciKlik(sA) === String(LC.hasilBagi(sA.dasar)) && !sA.betul, "Cari kesalahan Abstract: Satria menyebut pembagi sebagai hasil bagi (seed alur)");
  // Posisi alasan benar: tidak selalu tombol pertama.
  {
    const posisiAlasan = (x) => Array.from(`${x.tokoh}${x.kataTokoh}${x.alasan[x.benar]}`).reduce((t, c) => t + c.charCodeAt(0), 0) % 2 + 1;
    const semuaSalah = Object.values(TAHAP).flatMap(([, soal]) => soal.flatMap((s) => s.langkah.map((l) => l.langkah)).filter((x) => x.tipe === "salah"));
    const pos = semuaSalah.map((x) => {
      const lain = [0, 1, 2].filter((i) => i !== x.benar);
      const p = posisiAlasan(x);
      return [...lain.slice(0, p), x.benar, ...lain.slice(p)].indexOf(x.benar);
    });
    cek(new Set(pos).size >= 2 && pos.every((p) => p !== 0), `Cari kesalahan: posisi alasan benar tidak pernah pertama dan bervariasi (${pos})`);
  }
  // Batas isi tiap tugas.
  for (const [nama, [rupa, soal]] of Object.entries(TAHAP))
    for (const s of soal)
      for (const ls of s.langkah) {
        const d = LC.dasarDari(ls.langkah);
        const tag = `${nama} ${s.nomor} ${ls.metode}`;
        cek(Number.isInteger(d.n) && d.n >= 10 && d.n <= 99 && d.d >= 2 && d.d <= 9, `${tag}: bilangan dua angka dibagi satu angka (${d.n} : ${d.d})`);
        cek(!DIVIDEN_CERITA.includes(d.n), `${tag}: bilangan yang dibagi berbeda dari Story (${d.n})`);
        if (rupa === "benda") cek(!!DG_EMOJI[d.benda] && emojiSah(DG_EMOJI[d.benda]) && d.n <= 60, `${tag}: Concrete memakai benda beremoji (${d.benda}) dan paling banyak enam puluh benda`);
        if (d.tipe === "susun") cek(d.n >= 10 * d.d && (d.tanya !== "s1" || LC.sisaPuluhan(d) >= 1) && (d.tanya !== "turun" || LC.satuanDari(d) >= 1) && LC.hasilSatuan(d) >= 1, `${tag}: bagi susun punya hasil puluhan dan satuan, tanya ${d.tanya}`);
        if (d.tipe === "kurang") cek(d.tanya === "sisa" ? LC.sisaBagi(d) >= 1 : LC.hasilBagi(d) <= 9 && LC.sisaBagi(d) === 0 || d.tanya === "kali", `${tag}: pengurangan sah (kali paling banyak sembilan loncatan)`);
        if (d.tipe === "kurang" && rupa !== "lambang") cek(LC.hasilBagi(d) <= 10, `${tag}: loncatan atau baris pengurangan terbaca (${LC.hasilBagi(d)})`);
        if (d.tipe === "rata" && d.tanya === "sisa") cek(LC.sisaBagi(d) >= 1, `${tag}: rata sisa punya sisa`);
        if (d.tipe === "rata" && rupa !== "lambang") cek(d.d <= 9, `${tag}: pintu muat`);
      }
  // Tiap metode tampak di tiap tahap: tiap tahap memuat semua jenis tugas dan semua pertanyaan penting.
  for (const [nama, [, soal]] of Object.entries(TAHAP)) {
    const tipe = new Set(soal.flatMap((s) => s.langkah.map((l) => LC.dasarDari(l.langkah).tipe)));
    cek(["bagi", "rata", "kurang", "susun"].every((t) => tipe.has(t)), `${nama}: jenis tugas bagi, rata, kurang, susun ada`);
    const tanya = new Set(soal.flatMap((s) => s.langkah.map((l) => LC.dasarDari(l.langkah).tanya)));
    cek(tanya.has("hasil") && tanya.has("kali") && tanya.has("sisa") && tanya.has("habis"), `${nama}: pertanyaan hasil, kali, sisa, dan habis ada`);
  }
}

/* ------------------------------ Tugas dihitung dari data ------------------------------ */
{
  const nama = (k) => (k ? (k.jenis === "nama" ? k.nama : k.n) : null);
  const T = (tipe, n, d, tanya) => ({ tipe, benda: "x", n, d, tanya });
  sama(["klik", "kanvas", "suara"].map((c) => nama(LC.kunciJawab(T("bagi", 72, 6, "hasil"), c))), [12, 12, 12], "kunci hasil bagi");
  sama(["klik", "kanvas", "suara"].map((c) => nama(LC.kunciJawab(T("rata", 29, 6, "sisa"), c))), [5, 5, 5], "kunci rata sisa");
  sama(["suara"].map((c) => nama(LC.kunciJawab(T("rata", 28, 4, "habis"), c))), ["habis"], "kunci rata habis");
  sama(["suara"].map((c) => nama(LC.kunciJawab(T("rata", 29, 4, "habis"), c))), ["sisa"], "kunci rata ada sisa");
  sama([LC.kunciJawab(T("kurang", 42, 6, "kali"), "klik"), LC.kunciJawab(T("kurang", 38, 7, "sisa"), "klik")].map(nama), [7, 3], "kunci kurang berulang: kali dan sisa");
  sama(["q1", "s1", "turun", "gabung", "q2", "hasil"].map((q) => nama(LC.kunciJawab(T("susun", 92, 4, q), "klik"))), [2, 1, 2, 12, 3, 23], "kunci bagi susun 92 : 4");
  // Pengecoh khas.
  cek(LC.pengecoh(T("susun", 96, 3, "hasil"), "klik").slice(0, 1)[0] === 3 && LC.pengecoh(T("susun", 96, 3, "hasil"), "klik").every((x) => x !== 32 && x >= 1 && x <= 99), "pengecoh hasil susun: lupa menurunkan (hasil puluhan) di depan");
  cek(LC.pengecoh(T("kurang", 42, 6, "kali"), "klik")[0] === 6, "pengecoh kali: pembagi dikira hasil bagi");
  cek(LC.pengecoh(T("rata", 30, 4, "sisa"), "klik", 2).every((x) => x !== 2), "pengecoh sisa: bukan jawaban benar");
  cek(LC.pilihanSuara(T("rata", 33, 3, "habis"), "suara").join() === "sisa,habis" && LC.pilihanSuara(T("rata", 53, 6, "habis"), "suara").join() === "habis,sisa", "pilihan suara kata: dua kata, benar bukan yang pertama");

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
        if (d.tanya === "habis") cek(s.cara === "suara" && kunci.jenis === "nama", `${tag}: tugas kata hanya pada suara`);
        else cek(kunci.jenis === "angka" && kunci.n >= 1 && kunci.n <= 99, `${tag}: jawaban bilangan satu sampai sembilan puluh sembilan (${kunci.n})`);
        if (s.cara === "kanvas") {
          cek(kunci.jenis === "angka" && kunci.n >= 1 && kunci.n <= 9, `${tag}: jawaban kanvas satu angka satu sampai sembilan (${kunci.n})`);
          kanvasAngka.push(kunci.n);
        }
        if (s.cara === "klik" && kunci !== null) {
          const pil = LC.pilihanKlik(l);
          const benar = LC.teksKunciKlik(l);
          cek(pil.length === 3 && new Set(pil).size === 3 && pil.includes(benar) && pil[0] !== benar && pil.every((p) => /^\d{1,2}$/.test(p)), `${tag}: pilihan klik unik, bilangan, dan jawaban benar bukan yang pertama (${pil.join("/")})`);
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
          cek(Array.isArray(baris) && baris.length >= 3 && baris.every((b) => typeof b === "string" && b.length > 3 && !adaEmoji(b)), `${tag}: kartu kata ada dan tanpa emoji`);
          cek(baris.join(" ").includes(String(d.n)) && baris.join(" ").includes(String(d.d)), `${tag}: kartu memuat bilangan yang dibagi dan pembagi`);
        }
      }
    cek(new Set(kanvasAngka).size === kanvasAngka.length && kanvasAngka.length === 4, `${namaT}: empat angka jawaban Tulis di kanvas tidak kembar (${kanvasAngka.join(", ")})`);
  }
  const kv = (nama) => TAHAP[nama][1].filter((s) => s.cara === "kanvas").flatMap((s) => s.langkah.map((l) => LC.kunciJawab(l.langkah, "kanvas").n));
  sama(kv("Concrete"), [6, 3, 8, 2], "angka kanvas Concrete");
  sama(kv("Pictorial"), [9, 1, 5, 2], "angka kanvas Pictorial");
  sama(kv("Abstract"), [8, 5, 3, 4], "angka kanvas Abstract");
  const suaraJenis = Object.values(TAHAP).flatMap(([, soal]) => soal[2].langkah.map((l) => LC.kunciJawab(l.langkah, "suara").jenis));
  cek(suaraJenis.includes("nama") && suaraJenis.includes("angka"), "tugas suara: kata dan bilangan");
  const kataSuara = Object.values(TAHAP).flatMap(([, soal]) => soal[2].langkah.flatMap((l) => (LC.kunciJawab(l.langkah, "suara").jenis === "nama" ? [LC.kunciJawab(l.langkah, "suara").nama] : [])));
  for (const w of ["habis", "sisa"]) cek(kataSuara.includes(w), `tugas suara: kata ${w} muncul`);
  // Poin penting dan penutup.
  cek(D.POIN_PENTING.length >= 6 && D.POIN_PENTING.every((p) => p.length > 20 && bersih(p)) && D.POIN_PENTING_SUARA.every((p) => tanpaDigit(p) && !/[=<>+−×]/.test(p)), "poin penting: banyak, bersih, suara tanpa digit dan tanda");
  const poin = D.POIN_PENTING.join(" ").toLowerCase();
  for (const m of ["membagi", "bagi rata", "kurang berulang", "bagi susun", "sisa", "pembagi", "perkalian", "hasil bagi", "puluhan", "satuan"]) cek(poin.includes(m), `poin penting memuat ${m}`);
  cek(tanpaDigit(D.PENUTUP_H) && bersih(D.PENUTUP_H) && /Kak Yoga/.test(D.PENUTUP_H) && /payung/.test(D.PENUTUP_H) && D.PENUTUP_H.endsWith("?"), "penutup H: jembatan ke Sub-Bab I tanpa digit");
  cek(Object.values(D.TEMA_JATAH).every((t) => emojiSah(t.ikon) && t.nama.length >= 7 && t.cara.length > 20 && tanpaDigit(t.cara) && bersih(t.cara)), "tema tiga tahap sah");
  cek(D.TEMA_JATAH.pictorial.cara.includes("polos") && D.TEMA_JATAH.abstract.cara.includes("kartu"), "tema: Pictorial polos, Abstract kartu");
  cek(D.CONCRETE_JATAH === D.CONCRETE && D.PICTORIAL_JATAH === D.PICTORIAL && D.ABSTRACT_JATAH === D.ABSTRACT && D.MISI_JATAH_TEKS === DS.MISI_JATAH_TEKS, "nama ekspor untuk pemasang");
}

/* ------------------------------ Berkas ------------------------------ */
{
  const berkas = readdirSync(folderUrl).filter((f) => /\.(ts|tsx)$/.test(f));
  for (const nama of ["logika.ts", "data-sim.ts", "data-kartu.ts", "logika-cpa.ts", "data.ts", "periksa.ts", "JawabJatah.tsx", "LangkahJatah.tsx", "GambarJatah.tsx", "TahapJatah.tsx", "SimulasiPapanJatah.tsx", "PapanJatah.tsx", "DaftarJatah.tsx"]) cek(berkas.includes(nama), `berkas ${nama} ada`);
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folderUrl), "utf8");
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d || c.codePointAt(0) === 0x1f6de), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}/i.test(s), `${f}: kode emoji tidak melewati U+1FA95`);
    cek(!/buku|kelompok|bernilai|tebak/i.test(s), `${f}: tanpa kata buku, kelompok, bernilai, tebak`);
    if (/^(logika|logika-cpa|periksa|data|data-sim|data-kartu)\.ts$/.test(f)) cek(!/from "react"|fetch\(/.test(s), `${f}: tanpa React dan jaringan`);
    cek(!/papan-k3b5a|tabel-k3b5b|turus-k2b8a|tempat-k3b1a|SubBabK4B1|kit-k4b1|infografis-k4b1|skenario-k4b1|mesin-data-k4b1|lab-bagi-k4b1h|SimulasiLab|data-k4b1|naskah-k4b1|eja-k4b1|tiket-k4b1a|handuk-k4b1b|dermaga-k4b1c|kelapa-k4b1d|resepsi-k4b1e|sisa-k4b1f|perahu-k4b1g|jadwal-k4b1i/.test(s), `${f}: tidak memakai folder Sub-Bab lain atau berkas lama Bab 1`);
  }
  const layar = ["LangkahJatah.tsx", "TahapJatah.tsx", "SimulasiPapanJatah.tsx", "GambarJatah.tsx"].map((f) => readFileSync(new URL(f, folderUrl), "utf8")).join("\n");
  const teksLayar = [...layar.matchAll(/>\s*([^<>{}\n]{4,})\s*</g)].map((m) => m[1]).join(" ");
  cek(!/\b(skor|nilai|soal|tebak|kunci|latihan|teman|kelompok|buku|kelas)\b/i.test(teksLayar), "teks layar komponen tanpa kata terlarang");
  cek(/\bTugas\b/.test(layar) && !/>\s*Soal/.test(layar), "teks layar CPA memakai Tugas");
  cek(!/capitalize/.test(layar), "teks layar: tanpa kelas capitalize");
  const th = readFileSync(new URL("TahapJatah.tsx", folderUrl), "utf8");
  cek(/umum: Umum;\s*rupa: Rupa;\s*soal: SoalMisi\[\];\s*pita:/.test(th) && /teksAkhir: string/.test(th) && /poinPenting\?: boolean/.test(th), "TahapJatah: props umum, rupa, soal, pita, teksAkhir, poinPenting");
  cek(/IKON_METODE\[ls\.metode\]/.test(th) && /rupa === "benda" \?/.test(th), "TahapJatah: ikon metode hanya pada rupa benda");
  cek(/export default function TahapJatah/.test(th) && /Cari kesalahan/.test(th) && /POIN_PENTING/.test(th) && /PENUTUP_H/.test(th), "TahapJatah: ekspor, Cari kesalahan, Poin Penting, jembatan");
  cek(/"lorong"/.test(th) && /"kertas"/.test(th) && /"daftar"/.test(th) && /LORONG KAMAR/.test(th) && !/"etalase"|"kapur"|"catatan"|"bambu"|"denah"/.test(th), "TahapJatah: pola visual lorong kamar, kertas jatah, daftar jatah");
  const lg = readFileSync(new URL("LangkahJatah.tsx", folderUrl), "utf8");
  cek(/export function LangkahJatah/.test(lg) && /JawabSuaraJatah/.test(lg) && /JawabTulis/.test(lg) && /pilihanSuara\(l, cara\)/.test(lg) && /TampilDasar/.test(lg) && /ucapkan\(/.test(lg), "LangkahJatah: ekspor, jawab suara dengan pilihan ketuk, jawab tulis di kanvas, ucapan tanpa digit");
  const jw = readFileSync(new URL("JawabJatah.tsx", folderUrl), "utf8");
  cek(/gagalSekali/.test(jw) && /jawaban yang benar/.test(jw) && /PilihanKata/.test(jw) && /setCadangan\(true\)/.test(jw) && /e\.error === "not-allowed"/.test(jw), "JawabJatah: galat mikrofon dihitung gagal, pilihan ketuk sebagai cadangan, jawaban benar setelah tiga kali salah");
  const gm = readFileSync(new URL("GambarJatah.tsx", folderUrl), "utf8");
  cek(/export function TampilDasar/.test(gm) && /rupa === "lambang"/.test(gm) && /EMOJI_BENDA/.test(gm) && /GarisLoncat/.test(gm) && /BaganBatang/.test(gm) && /BersusunPolos/.test(gm) && /BarisKurang/.test(gm) && /Kumpulan/.test(gm), "GambarJatah: kumpulan benda dan kamar, baris pengurangan, garis loncat, bagan batang, bagan bersusun, kartu untuk Abstract");
  // Gambar sungguh sebanyak datanya: banyak benda per baris, titik, lengkung, dan bagian dari teks sumber.
  cek(/data-benda=\{isi\}/.test(gm) && /Array\.from\(\{ length: isi \}/.test(gm) && /data-lengkung="1"/.test(gm) && /Array\.from\(\{ length: penuh \}/.test(gm) && /Array\.from\(\{ length: d \}/.test(gm), "GambarJatah: benda, titik, lengkung, dan bagian dibuat sebanyak data");
  const sim = readFileSync(new URL("SimulasiPapanJatah.tsx", folderUrl), "utf8");
  cek(/export default function SimulasiPapanJatah/.test(sim) && /onKeadaan/.test(sim) && /MISI_JATAH_TEKS/.test(sim) && /Alat menolak/.test(sim), "SimulasiPapanJatah: ekspor, onKeadaan, teks misi, penolakan alat");
  for (const [f, nm] of [["PapanJatah.tsx", "PapanJatahK4B1"], ["DaftarJatah.tsx", "DaftarJatahK4B1"]]) {
    const s = readFileSync(new URL(f, folderUrl), "utf8");
    cek(/speakGuru/.test(s) && /onLanjut/.test(s) && /teksLanjut/.test(s) && /peta-kartu\//.test(s) && new RegExp(`export default function ${nm}`).test(s) && new RegExp(`export \\{ ${nm} \\}`).test(s), `${f}: pembungkus tipis komponen bersama peta-kartu, ekspor ${nm}`);
  }
  const sk = readFileSync(new URL("../src/components/modul/SimulasiK4Bab1.tsx", import.meta.url), "utf8");
  cek(/SimulasiPapanJatah/.test(sk) && /laporMisiJatah\(daftarMisiJatah\("H"\), k, a\.capai\)/.test(sk) && !/judulBab=\{`Kelas/.test(sk), "SimulasiK4Bab1: langkahPapanJatahH memasang Papan Jatah, judul bab tanpa kata Kelas");
  const ej = readFileSync(new URL("../src/lib/ejaan-inggris-id.ts", import.meta.url), "utf8");
  cek(/equal sharing/i.test(ej) && /repeated subtraction/i.test(ej) && /long division/i.test(ej), "ejaan: tiga nama metode global ada");
}

console.log(`Lulus ${lulus}, gagal ${gagal}`);
process.exit(gagal ? 1 : 0);
