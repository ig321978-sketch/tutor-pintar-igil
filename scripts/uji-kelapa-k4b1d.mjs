// Uji Mind-map (Kios Pak Darwis), Infografis (Daftar Kios), Simulasi Kios Kelapa, dan tahap Concrete, Pictorial, Abstract Kelas 4 Bab 1 Sub-Bab D ("Kios Kelapa Pak Darwis"),
// Penginapan Pulau Karang Indah (menyusun dan menguraikan bilangan empat angka dengan lebih dari satu cara).
// Memeriksa: kata bilangan sampai sembilan ribu sembilan ratus sembilan puluh sembilan dan titik ribuan, tata letak gambar (rak keranjang, rak bagan, dan balok cacah SUNGGUH sebanyak angkanya, muat di kanvas),
// logika simulasi (isi keranjang dengan alat menolak sepuluh keranjang, susun, bagan dengan Cek Bagan, tiga cara berbeda dengan alat menolak cara yang sama), misi (awal tidak memenuhi, wajib empat, bebas dua),
// sembilan kartu geser Masalah, Cara, Hasil memuat semua metode Story, daftar kios dari kejadian Story, CPA dua belas langkah per tahap (Klik, Kanvas, Suara x empat metode) dengan jawaban beragam dan Cari kesalahan di tiap tahap,
// jawaban benar dihitung dari data, angka jawaban tidak kembar per tahap, tugas yang langsung siap (jebakan tombol macet), pengenal ucapan sampai ribuan, petunjuk salah, batas rupa, emoji, kata terlarang, akhir baris.
// Jalankan: node --no-warnings scripts/uji-kelapa-k4b1d.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/kelapa-k4b1d/logika.ts");
const DS = await import("../src/components/modul/kelapa-k4b1d/data-sim.ts");
const DK = await import("../src/components/modul/kelapa-k4b1d/data-kartu.ts");
const LC = await import("../src/components/modul/kelapa-k4b1d/logika-cpa.ts");
const D = await import("../src/components/modul/kelapa-k4b1d/data.ts");
const K = await import("../src/components/modul/kelapa-k4b1d/periksa.ts");
const T = await import("../src/components/modul/kelapa-k4b1d/tata.ts");
const S = await import("../src/components/modul/misi-simulasi.ts");
const MK = await import("../src/components/modul/misi-k4bab1.ts");
const MT = await import("../src/components/modul/misi-teks-k4b1.ts");
const folderUrl = new URL("../src/components/modul/kelapa-k4b1d/", import.meta.url);
/** Benda beremoji pada GambarKelapa.tsx (kunci EMOJI_BENDA), dibaca dari teks karena berkas tsx tidak bisa diimpor di Node. */
const DG_EMOJI = {};
{
  const gu = readFileSync(new URL("GambarKelapa.tsx", folderUrl), "utf8");
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
/** Bilangan Story D (5.270, 4.000 + 1.270, 3.000 + 2.270, 6.403, 3.705): jangan dijadikan data CPA atau Simulasi. */
const BILANGAN_STORY = [5270, 1270, 2270, 6403, 3705];
const rb = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".");

/* ------------------------------ Kata bilangan ------------------------------ */
{
  sama([0, 1, 9, 10, 11, 15, 20, 38, 100, 305, 1000, 1001, 2000, 2370, 5600, 9999, 10000].map(LC.kataBil), ["nol", "satu", "sembilan", "sepuluh", "sebelas", "lima belas", "dua puluh", "tiga puluh delapan", "seratus", "tiga ratus lima", "seribu", "seribu satu", "dua ribu", "dua ribu tiga ratus tujuh puluh", "lima ribu enam ratus", "sembilan ribu sembilan ratus sembilan puluh sembilan", "sepuluh ribu"], "kata bilangan CPA");
  cek(LC.kata === LC.kataBil && L.kata === LC.kataBil, "alias kata");
  for (let n = 0; n <= 10000; n += 7) cek(tanpaDigit(LC.kataBil(n)), `kata bilangan ${n} tanpa digit`);
  sama([1000, 5270, 10000, 7, 999, 123456].map(LC.rb), ["1.000", "5.270", "10.000", "7", "999", "123.456"], "titik ribuan");
  sama([LC.ucapkan("6.000 + 300 + 4"), LC.ucapkan("4.607 = 4.000 + 600 + 7"), LC.ucapkan("9.000 − 4.000"), LC.ucapkan("2 3 5"), LC.ucapkan("ribuan")], ["enam ribu ditambah tiga ratus ditambah empat", "empat ribu enam ratus tujuh sama dengan empat ribu ditambah enam ratus ditambah tujuh", "sembilan ribu dikurangi empat ribu", "dua tiga lima", "ribuan"], "ucapkan: angka berpemisah titik dan lambang menjadi kata");
  // Tempat angka.
  sama(["ribuan", "ratusan", "puluhan", "satuan"].map((t) => LC.angkaDi(4607, t)), [4, 6, 0, 7], "angka di tiap tempat");
  sama([LC.bagianTempat(4607), LC.bagianTempat(8100), LC.bagianTempat(9000)], [[4000, 600, 7], [8000, 100], [9000]], "bagian bertempat tanpa nol");
  sama([LC.teksUrai(4607), LC.teksDua(7350, 5000), LC.banyakNol(4607), LC.banyakNol(3005), LC.tempatNol(6058)], ["4.000 + 600 + 7", "5.000 + 2.350", 1, 2, ["ratusan"]], "uraian, dua bagian, nol");
  for (let n = 1000; n <= 9999; n += 1) {
    const b = LC.bagianTempat(n);
    if (b.reduce((a, c) => a + c, 0) !== n || b.some((x) => x <= 0)) cek(false, `uraian ${n} menjumlah kembali ke bilangan`);
  }
  cek(true, "uraian seribu sampai sembilan ribu sembilan ratus sembilan puluh sembilan menjumlah kembali");
}

/* ------------------------------ Tata letak gambar ------------------------------ */
{
  for (let n = 1000; n <= 9999; n += 11) {
    const baris = T.susunRak(n);
    cek(baris.length === 4 && baris.every((b) => b.jumlah === LC.angkaDi(n, b.tempat) && b.xs.length === b.jumlah), `rak ${n}: tiap baris berisi sebanyak angka di tempatnya`);
    cek(baris.every((b) => b.xs.every((x, i) => x >= T.X0_RAK && x + b.fs * 1.15 <= 288 && (i === 0 || x > b.xs[i - 1] + b.fs))) && baris.every((b, i) => i === 0 || b.y >= baris[i - 1].y + baris[i - 1].tinggi), `rak ${n}: keranjang di dalam baris, tidak bertumpuk, baris tidak bertumpuk`);
    cek(baris[3].y + baris[3].tinggi <= 198, `rak ${n}: baris terakhir muat di kanvas`);
    const kolom = T.susunBalok(n);
    cek(kolom.length === 4 && kolom.every((c) => c.balok.length === LC.angkaDi(n, c.tempat)), `balok ${n}: tepat satu balok untuk tiap angka`);
    cek(kolom.every((c) => c.balok.every((b) => b.x >= c.x0 && b.x + b.w <= c.x0 + c.lebar && b.y >= T.Y0_BALOK && b.y + b.h <= 190)), `balok ${n}: balok di dalam kolom dan kanvas`);
    const semua = kolom.flatMap((c) => c.balok);
    let tabrak = false;
    for (let a = 0; a < semua.length; a += 1)
      for (let b = a + 1; b < semua.length; b += 1) {
        const p = semua[a];
        const q = semua[b];
        if (Math.min(p.x + p.w, q.x + q.w) - Math.max(p.x, q.x) > 0.5 && Math.min(p.y + p.h, q.y + q.h) - Math.max(p.y, q.y) > 0.5) tabrak = true;
      }
    cek(!tabrak, `balok ${n}: balok tidak bertumpuk`);
  }
  // Rak dari isi sembarang (Simulasi): satu gambar untuk tiap keranjang yang diisi.
  const r = T.susunRak(0, [3, 0, 9, 1]);
  sama(r.map((b) => b.xs.length), [3, 0, 9, 1], "rak dari isi: banyak keranjang sesuai isi");
  // Rak bagan: ribuan lalu ratusan sesuai bilangan.
  const b1 = T.susunBagan(8600, "utuh", 24);
  cek(b1.ribu.length === 8 && b1.ratus.length === 6 && b1.kanan <= T.BATAS_BAGAN && b1.ratus[0] > b1.ribu[7], "rak bagan: delapan keranjang besar dan enam keranjang sedang berurutan");
  cek(T.muatBagan(9000) && T.muatBagan(3000) && !T.muatBagan(9900) && !T.muatBagan(8650), "rak bagan: muat bila kelipatan seratus dan tidak melewati batas");
  for (const [utuh, bagian] of [[8600, 3000], [8000, 4000], [7200, 4000], [7500, 2000], [7000, 1000], [9000, 4000], [9400, 6000], [8000, 7000]]) cek(T.muatBagan(utuh) && T.muatBagan(bagian), `rak bagan ${utuh} dan ${bagian} muat`);
}

/* ------------------------------ Simulasi: data dan logika ------------------------------ */
{
  cek(DS.TARGET_PECAH.length === 3 && DS.TARGET_PECAH.every((t) => t.n >= 1000 && t.n <= 9999 && !BILANGAN_STORY.includes(t.n) && DG_EMOJI[t.benda]) && new Set(DS.TARGET_PECAH.map((t) => t.n)).size === 3, "simulasi: tiga bilangan pecah berbeda dari Story, benda beremoji");
  cek(DS.TARGET_SUSUN.length === 3 && DS.TARGET_SUSUN.every((t) => t.isi.length === 4 && t.isi.every((c) => c >= 0 && c <= 9) && t.isi[0] > 0 && t.isi.includes(0) && DG_EMOJI[t.benda]) && new Set(DS.TARGET_SUSUN.map((t) => t.isi.join())).size === 3, "simulasi: tiga keranjang susun, ada tempat kosong (nol), benda beremoji");
  cek(DS.TARGET_BAGAN.length === 3 && DS.TARGET_BAGAN.every((t) => t.utuh % 100 === 0 && t.bagian % 100 === 0 && t.bagian < t.utuh && T.muatBagan(t.utuh) && !(t.utuh === 5000 && t.bagian === 4000)) && new Set(DS.TARGET_BAGAN.map((t) => t.utuh - t.bagian)).size === 3, "simulasi: tiga bagan, bagian lain berbeda-beda, berbeda dari Story");
  cek(DS.TARGET_LAIN.length === 3 && DS.TARGET_LAIN.every((t) => t.n >= 4000 && t.n <= 9999 && Math.floor(t.n / 1000) >= DS.CARA_DIPERLUKAN && !BILANGAN_STORY.includes(t.n) && DG_EMOJI[t.benda]) && DS.CARA_DIPERLUKAN === 3 && DS.MAKS_KERANJANG === 9, "simulasi: tiga bilangan untuk cara lain, cukup banyak ribuan untuk tiga cara, berbeda dari Story");
  cek(tanpaDigit(DS.MISI_KELAPA_TEKS) && bersih(DS.MISI_KELAPA_TEKS) && DS.MISI_KELAPA_TEKS === MT.MISI_K4B1.D && D.MISI_KELAPA_TEKS === DS.MISI_KELAPA_TEKS && DS.MISI_KELAPA_TEKS.length >= 10 && DS.MISI_KELAPA_TEKS.length <= 120, "simulasi: teks misi tanpa digit dan kata terlarang, sama dengan misi-teks-k4b1");

  const a = L.awalKelapa();
  cek(a.alat === "kelapa" && a.mode === "pecah" && a.isi.join() === "0,0,0,0" && !a.tolak && a.salah === 0 && ["pecahBenar", "susunBenar", "bagBenar", "lainBenar", "lainSimpan"].every((f) => a[f].length === 0) && a.lainA === 1 && a.susunPilih === -1 && a.bagPilih === -1 && !a.bagCek, "simulasi: keadaan awal");
  // Pecah.
  cek(L.targetPecah(a).n === 6482 && L.jumlahIsi(a) === 0 && /Belum ada keranjang/.test(L.petunjukPecah(a)) && !L.periksaPecah(a).ok && L.periksaPecah(a).k.salah === 1, "pecah: sebelum mengisi, petunjuk menunjuk langkah yang belum dilakukan dan Periksa ditolak");
  let p = a;
  for (const [i, n] of [[0, 6], [1, 4], [2, 8], [3, 1]]) for (let q = 0; q < n; q += 1) p = L.tambahKeranjang(p, i).k;
  cek(p.isi.join() === "6,4,8,1" && L.jumlahIsi(p) === 6481 && /masih kurang/.test(L.petunjukPecah(p)) && tanpaDigit(L.petunjukPecah(p)) && !L.periksaPecah(p).ok, "pecah: jumlah kurang satu, petunjuk menyebut kurang tanpa membocorkan angka");
  const lebih = L.tambahKeranjang(L.tambahKeranjang(p, 3).k, 3).k;
  cek(L.jumlahIsi(lebih) === 6483 && /lebih dari bilangan/.test(L.petunjukPecah(lebih)) && !L.periksaPecah(lebih).ok, "pecah: jumlah lebih, petunjuk menyuruh mengurangi");
  const pas = L.tambahKeranjang(p, 3).k;
  cek(L.jumlahIsi(pas) === 6482 && /sudah pas/.test(L.petunjukPecah(pas)), "pecah: jumlah pas dari ribuan sampai satuan");
  const benar1 = L.periksaPecah(pas);
  cek(benar1.ok && benar1.k.pecahBenar.join() === "0" && benar1.k.pecahKe === 1 && benar1.k.isi.join() === "0,0,0,0" && L.targetPecah(benar1.k).n === 3059, "pecah: benar membuka bilangan berikutnya dengan rak kosong");
  sama(S.misiBaru(MK.MISI_D, benar1.k, new Set()), ["d-pecah"], "pecah: misi d-pecah");
  // Alat menolak sepuluh keranjang.
  let tolak = a;
  for (let q = 0; q < 9; q += 1) tolak = L.tambahKeranjang(tolak, 3).k;
  const sepuluh = L.tambahKeranjang(tolak, 3);
  cek(tolak.isi[3] === 9 && !tolak.tolak && !sepuluh.ok && sepuluh.k.tolak === true && sepuluh.k.isi[3] === 9 && sepuluh.k.salah === 0 && /sepuluh keranjang kecil ditukar/i.test(L.petunjukTolak()) && tanpaDigit(L.petunjukTolak()), "pecah: keranjang kesepuluh ditolak alat (bukan percobaan keliru)");
  sama(S.misiBaru(MK.MISI_D, sepuluh.k, new Set()), ["d-tolak"], "pecah: misi d-tolak");
  cek(!L.kurangKeranjang(a, 0).ok && L.kurangKeranjang(p, 0).k.isi[0] === 5 && !L.tambahKeranjang(a, 7).ok && !L.kurangKeranjang(a, -1).ok, "pecah: tidak bisa mengambil dari tempat kosong atau tempat di luar rak");
  cek(tanpaDigit(L.kalimatPecah(a)) && tanpaDigit(L.kalimatPecah(p)) && tanpaDigit(L.kalimatPecah(benar1.k)), "pecah: kalimat tanpa digit");
  // Susun.
  cek(L.bilanganSusun(a) === 4205 && L.bilanganSusun({ ...a, susunKe: 1 }) === 7036 && L.bilanganSusun({ ...a, susunKe: 2 }) === 2900, "susun: bilangan dihitung dari keranjang");
  for (let i = 0; i < 3; i += 1) {
    const k = { ...a, susunKe: i };
    const pil = L.pilihanSusun(k);
    const n = L.bilanganSusun(k);
    cek(pil.length === 3 && new Set(pil).size === 3 && pil.includes(n) && pil[0] !== n && pil.every((x) => x >= 1 && x <= 9999), `susun: pilihan sasaran ${i} unik, benar bukan yang pertama (${pil})`);
  }
  cek(/Pilih satu bilangan/.test(L.petunjukSusun(a)) && !L.periksaSusun(a).ok && L.periksaSusun(a).k.salah === 1, "susun: tanpa memilih, petunjuk menunjuk langkah yang belum dilakukan");
  const ps = L.pilihanSusun(a);
  const sSalah = L.pilihSusun(a, ps.findIndex((x) => x !== 4205));
  cek(!L.periksaSusun(sSalah).ok && /diisi nol/.test(L.petunjukSusun(sSalah)) && tanpaDigit(L.petunjukSusun(sSalah)), "susun: bilangan keliru, petunjuk menyebut nol");
  const sBenar = L.periksaSusun(L.pilihSusun(a, ps.indexOf(4205)));
  cek(sBenar.ok && sBenar.k.susunBenar.join() === "0" && sBenar.k.susunKe === 1 && sBenar.k.susunPilih === -1, "susun: benar membuka keranjang berikutnya");
  sama(S.misiBaru(MK.MISI_D, sBenar.k, new Set()), ["d-susun"], "susun: misi d-susun");
  cek(L.pilihSusun(a, 5).susunPilih === -1 && tanpaDigit(L.kalimatSusun(a)) && tanpaDigit(L.kalimatSusun(sBenar.k)), "susun: pilihan di luar daftar diabaikan, kalimat tanpa digit");
  // Bagan.
  cek(L.sisaBagianKu(a) === 4000 && L.sisaBagianKu({ ...a, bagKe: 1 }) === 5500 && L.sisaBagianKu({ ...a, bagKe: 2 }) === 4800, "bagan: bagian lain dihitung dari data");
  for (let i = 0; i < 3; i += 1) {
    const k = { ...a, bagKe: i };
    const pil = L.pilihanBagan(k);
    cek(pil.length === 3 && new Set(pil).size === 3 && pil.includes(L.sisaBagianKu(k)) && pil[0] !== L.sisaBagianKu(k) && pil.every((x) => x > 0), `bagan: pilihan sasaran ${i} unik, benar bukan yang pertama (${pil})`);
  }
  cek(/Pilih satu bagian/.test(L.petunjukBagan(a)) && !L.periksaBagan(a).ok && !L.cekBagan(a).ok, "bagan: tanpa pilihan, Cek dan Periksa ditolak dengan petunjuk");
  const pb = L.pilihanBagan(a);
  const b1 = L.pilihBagan(a, pb.indexOf(4000));
  cek(/Cek Bagan dulu/.test(L.petunjukBagan(b1)) && !L.periksaBagan(b1).ok && L.periksaBagan(b1).k.salah === 1, "bagan: sebelum Cek Bagan, Periksa ditolak dengan petunjuk yang menunjuk langkah yang belum dilakukan");
  const c1 = L.cekBagan(b1);
  cek(c1.ok && c1.cocok && c1.hasil === 7000 && c1.k.bagCek, "bagan: tiga ribu ditambah empat ribu sama dengan tujuh ribu");
  const bSalah = L.pilihBagan(a, pb.findIndex((x) => x !== 4000));
  const cSalah = L.cekBagan(bSalah);
  cek(cSalah.ok && !cSalah.cocok && !L.periksaBagan(cSalah.k).ok && /mengurangkan/.test(L.petunjukBagan(cSalah.k)) && tanpaDigit(L.petunjukBagan(cSalah.k)), "bagan: bagian keliru dicek: tidak sama dengan utuh");
  cek(!L.pilihBagan(c1.k, pb.findIndex((x) => x !== 4000)).bagCek, "bagan: mengganti pilihan membatalkan hasil cek");
  const bBenar = L.periksaBagan(c1.k);
  cek(bBenar.ok && bBenar.k.bagBenar.join() === "0" && bBenar.k.bagKe === 1 && bBenar.k.bagPilih === -1 && !bBenar.k.bagCek, "bagan: benar membuka bagan berikutnya");
  sama(S.misiBaru(MK.MISI_D, bBenar.k, new Set()), ["d-bagan"], "bagan: misi d-bagan");
  cek(L.pilihBagan(a, 7).bagPilih === -1 && tanpaDigit(L.kalimatBagan(a)) && tanpaDigit(L.kalimatBagan(c1.k)) && tanpaDigit(L.kalimatBagan(bBenar.k)), "bagan: pilihan di luar daftar diabaikan, kalimat tanpa digit");
  // Lain.
  cek(L.maksRibu(a) === 7 && L.maksRibu({ ...a, lainKe: 1 }) === 5 && L.maksRibu({ ...a, lainKe: 2 }) === 9 && L.caraLain(a) === "1.000 + 6.800" && L.caraLain(a, 3) === "3.000 + 4.800", "lain: ribuan paling banyak dan cara tertulis dihitung dari bilangan");
  cek(!L.aturRibu(a, -1).ok && L.aturRibu(a, 1).k.lainA === 2 && !L.aturRibu({ ...a, lainA: 7 }, 1).ok, "lain: bagian pertama paling sedikit satu ribu dan tidak melebihi bilangan");
  const s1 = L.simpanCara(a);
  cek(s1.ok && !s1.selesai && s1.k.lainSimpan.join() === "1" && !s1.k.tolak, "lain: cara pertama tersimpan");
  const ulang = L.simpanCara(s1.k);
  cek(!ulang.ok && ulang.k.tolak === true && ulang.k.lainSimpan.join() === "1" && /sudah disimpan/.test(L.petunjukLain(s1.k)) && ulang.k.salah === 0 && tanpaDigit(L.petunjukLain(s1.k)), "lain: cara yang sama ditolak alat (bukan percobaan keliru)");
  sama(S.misiBaru(MK.MISI_D, ulang.k, new Set()), ["d-tolak"], "lain: misi d-tolak dari cara yang sama");
  const s2 = L.simpanCara(L.aturRibu(s1.k, 1).k);
  cek(s2.ok && !s2.selesai && s2.k.lainSimpan.join() === "1,2" && tanpaDigit(L.kalimatLain(s2.k)), "lain: cara kedua tersimpan");
  const s3 = L.simpanCara(L.aturRibu(s2.k, 1).k);
  cek(s3.ok && s3.selesai && s3.k.lainBenar.join() === "0" && s3.k.lainKe === 1 && s3.k.lainSimpan.length === 0 && s3.k.lainA === 1 && L.targetLain(s3.k).n === 5960, "lain: tiga cara berbeda selesai dan membuka bilangan berikutnya");
  sama(S.misiBaru(MK.MISI_D, s3.k, new Set()), ["d-lain"], "lain: misi d-lain");
  cek(tanpaDigit(L.kalimatLain(a)) && tanpaDigit(L.kalimatLain(s3.k)), "lain: kalimat tanpa digit");
  // Mulai lagi dan ganti alat.
  cek(L.mulaiLagiKelapa().pecahKe === 0 && !L.mulaiLagiKelapa().tolak && L.pilihModeKelapa(a, "lain").mode === "lain", "mulai lagi dan ganti alat");
  // Misi.
  const M = MK.MISI_D;
  cek(M.filter((m) => m.wajib).length === 4 && M.filter((m) => !m.wajib).length === 2, "misi D: empat wajib, dua bebas");
  cek(new Set(M.map((m) => m.id)).size === 6 && M.every((m) => m.id.startsWith("d-") && m.teks.length >= 10 && m.teks.length <= 120 && tanpaDigit(m.teks) && bersih(m.teks)), "misi D: id berawalan d-, unik, 10 sampai 120 huruf, tanpa digit");
  sama(MK.daftarMisiK4Bab1("D"), M, "daftarMisiK4Bab1 D");
  cek(M.every((m) => !m.cek({ alat: "kerangka" })), "misi D: alat lain tidak memenuhi misi");
  sama(S.misiBaru(M, a, new Set()), [], "misi D: keadaan awal tanpa misi baru");
  cek(S.misiBaru(M, { ...a, salah: 9, isi: [6, 4, 8, 2], susunPilih: 1, bagPilih: 1, bagCek: true, lainA: 3, lainSimpan: [1, 2] }, new Set()).length === 0, "misi D: keranjang, pilihan, dan cara yang belum diperiksa tidak dihitung sebagai misi");
  sama(S.misiBaru(M, { ...a, pecahBenar: [0, 1, 2], susunBenar: [0], bagBenar: [0], lainBenar: [0], tolak: true }, new Set()), ["d-pecah", "d-susun", "d-bagan", "d-lain", "d-tolak", "d-tiga"], "misi D: semua misi tercapai");
}

/* ------------------------------ Mind-map: kios Pak Darwis (sembilan kartu geser) ------------------------------ */
{
  const KA = DK.KARTU_KELAPA;
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
  for (const m of ["Pecah Bilangan", "Susun Bilangan", "Bagan Bagian Utuh", "Digabung", "Per tempat angka", "Diisi nol", "Dibagi dua"]) cek(cara.toLowerCase().includes(m.toLowerCase()), `kartu: cara memuat ${m}`);
  const gab = KA.map((k) => [k.judul, k.masalah.label, k.cara.label, k.hasil.label, k.masalah.arti, k.cara.arti, k.hasil.arti].join(" ")).join(" ").toLowerCase();
  for (const s of ["menyusun", "menguraikan", "tempat angka", "ribuan", "ratusan", "puluhan", "satuan", "nol", "lebih dari satu cara", "bagian", "utuh", "mengurangkan", "jumlahkan"]) cek(gab.includes(s), `kartu: memuat poin "${s}"`);
  cek(!new RegExp("\\b(satria|laras|genta|pak hendro|pak darwis|kelapa|kios|keranjang|bu maya|bu rina)\\b", "i").test(gab), "kartu: hanya poin pelajaran (tanpa tokoh dan benda cerita)");
  cek(tanpaDigit(DK.SUARA_KARTU_KELAPA + DK.SELESAI_KARTU_KELAPA) && bersih(DK.SUARA_KARTU_KELAPA + DK.SELESAI_KARTU_KELAPA), "kartu: suara dan pesan selesai tanpa digit dan kata terlarang");
  cek(emojiSah(DK.TEMA_KARTU_KELAPA.ikon) && DK.TEMA_KARTU_KELAPA.judul.length > 5, "kartu: tema sah");
  const RG = DK.RINGKASAN_KELAPA;
  cek(RG.ikon.length === DK.KARTU_KELAPA.length && new Set(RG.ikon).size === RG.ikon.length && [...RG.ikon, RG.pusat].every((e) => emojiSah(e) && !/[A-Za-z0-9]/.test(e)), "peta radial: satu gambar unik per kartu, gambar sah tanpa huruf");
  cek(tanpaDigit(RG.suara) && bersih(RG.suara) && !RG.ikon.includes(RG.pusat), "peta radial: suara bersih dan pusat berbeda dari cabang");
}

/* ------------------------------ Infografis: daftar kios (satu tabel lima baris) ------------------------------ */
{
  const B = DK.BARIS_INFO_KELAPA;
  cek(B.length === 5 && DK.KOLOM_INFO_KELAPA.length === 3, "infografis: lima baris dan tiga kolom");
  cek(B.every((b) => b.isi.length === 3 && emojiSah(b.ikon) && b.nama.length > 4), "infografis: tiap baris tiga isian, emoji sah");
  const jumlahContoh = B.map((b) => b.contoh.length);
  cek(jumlahContoh[0] === 3 && jumlahContoh.slice(1).every((n) => n === 0), "infografis: baris satu penuh contoh, baris dua sampai lima mandiri");
  const semua = B.flatMap((b) => b.isi);
  cek(B.every((b) => new Set(b.isi.map((x) => x.t)).size === 3), "infografis: tiga label tiap baris berbeda");
  cek(new Set(semua.map((x) => x.t)).size === semua.length, "infografis: semua label unik");
  cek(semua.every((x) => x.t.length <= 28 && x.t.split(/\s+/).length <= 5 && bersih(x.t) && bersih(x.s ?? "")), "infografis: label pendek (paling banyak lima kata) dan tanpa kata terlarang");
  cek(semua.every((x) => tanpaDigit(x.s ?? x.t)), "infografis: ucapan label tanpa digit");
  const gab = B.map((b) => [b.nama, ...b.isi.map((x) => x.t)].join(" ")).join(" ").toLowerCase();
  for (const s of ["menguraikan bilangan", "menyusun bilangan", "mencari bagian hilang", "mencari cara lain", "memeriksa hasil", "pecah per tempat", "gabung semua bagian", "utuh dikurangi bagian", "tempat kosong diisi nol", "jumlahkan kembali"]) cek(gab.includes(s), `infografis: memuat "${s}"`);
  cek(!new RegExp("\\b(satria|laras|genta|pak hendro|pak darwis|kelapa|kios)\\b", "i").test(gab), "infografis: tanpa nama tokoh");
  cek(tanpaDigit(DK.SUARA_INFO_KELAPA + DK.SELESAI_INFO_KELAPA) && bersih(DK.SUARA_INFO_KELAPA + DK.SELESAI_INFO_KELAPA) && emojiSah(DK.TEMA_INFO_KELAPA.ikon), "infografis: suara dan tema bersih");
}

/* ------------------------------ Pengenal ucapan ------------------------------ */
{
  const nm = (nama) => ({ jenis: "nama", nama });
  const an = (n) => ({ jenis: "angka", n });
  for (const nama of ["ribuan", "ratusan", "puluhan", "satuan", "sama", "berbeda"]) cek(K.cocokUcapan(nama, nm(nama)).cocok && K.kataDariUcapan(nama).length === 1, `cocok: kata ${nama} dikenali tepat satu`);
  sama(K.kataDariUcapan("ribu an"), ["ribuan"], "ucapan: ribu an dikenali sebagai ribuan");
  sama(K.kataDariUcapan("satu an"), ["satuan"], "ucapan: satu an dikenali sebagai satuan");
  sama(K.kataDariUcapan("tidak sama"), [], "ucapan: tidak sama tidak dihitung");
  sama(K.kataDariUcapan("bukan ratusan"), [], "ucapan: bukan ratusan tidak dihitung");
  sama(K.kataDariUcapan("beda"), ["berbeda"], "ucapan: beda dikenali sebagai berbeda");
  sama(K.kataDariUcapan("halo"), [], "ucapan: kata lain tidak dikenali");
  cek(!K.cocokUcapan("ribuan", nm("ratusan")).cocok && !K.cocokUcapan("sama", nm("berbeda")).cocok && !K.cocokUcapan("puluhan", nm("satuan")).cocok, "cocok: kata berbeda tidak cocok");
  sama(K.angkaDariUcapan("lima"), [5], "angka: lima");
  sama(K.angkaDariUcapan("sembilan, 4 dan tiga"), [9, 4, 3], "angka: satuan dan angka tertulis");
  sama(K.angkaDariUcapan("seribu"), [1000], "angka: seribu");
  sama(K.angkaDariUcapan("dua ribu tiga ratus empat puluh lima"), [2345], "angka: dua ribu tiga ratus empat puluh lima");
  sama(K.angkaDariUcapan("5.000"), [5000], "angka: 5.000 tertulis");
  sama(K.angkaDariUcapan("tujuh ribu lima"), [7005], "angka: tujuh ribu lima");
  for (let n = 0; n <= 9999; n += 1) if (K.angkaDariUcapan(LC.kataBil(n)).join() !== String(n)) cek(false, `angka: kata bilangan ${n} dikenali utuh (${LC.kataBil(n)} -> ${K.angkaDariUcapan(LC.kataBil(n))})`);
  cek(true, "angka: semua kata bilangan nol sampai sembilan ribu sembilan ratus sembilan puluh sembilan dikenali utuh");
  cek(K.cocokUcapan("lima", an(5)).cocok && K.cocokUcapan("5", an(5)).cocok && !K.cocokUcapan("enam", an(5)).cocok, "cocok: bilangan lima");
  cek(K.cocokUcapan("lima ribu", an(5000)).cocok && !K.cocokUcapan("lima ribu", an(5)).cocok && !K.cocokUcapan("lima ratus", an(5)).cocok, "cocok: bilangan ribuan dikenali utuh");
}

/* ------------------------------ CPA ------------------------------ */
const TAHAP = { Concrete: ["benda", D.CONCRETE], Pictorial: ["diagram", D.PICTORIAL], Abstract: ["lambang", D.ABSTRACT] };
const CARA = ["klik", "kanvas", "suara"];
const METODE = ["igil", "pecah", "susun", "bagan"];
/** Jenis tugas dasar yang diharapkan per tahap, cara, dan urutan metode (salah = Cari kesalahan dengan dasar tugas itu). */
const TIPE = {
  Concrete: { klik: ["urai", "urai", "susun", "bagan"], kanvas: ["lain", "urai", "susun", "bagan"], suara: ["lain", "urai", "susun", "bagan"] },
  Pictorial: { klik: ["susun", "urai", "susun", "bagan"], kanvas: ["lain", "urai", "susun", "bagan"], suara: ["lain", "urai", "susun", "bagan"] },
  Abstract: { klik: ["lain", "urai", "susun", "bagan"], kanvas: ["lain", "urai", "susun", "bagan"], suara: ["lain", "urai", "susun", "bagan"] },
};
/** Tempat Cari kesalahan: [indeks misi, indeks langkah]. */
const TEMPAT_SALAH = { Concrete: [[0, 0]], Pictorial: [[0, 0]], Abstract: [[0, 2]] };
const semuaTeksLangkah = (ls, rupa, cara) => [ls.judul, ls.suara, LC.instruksi(ls.langkah, rupa, cara, ls.metode), LC.kalimatTanya(ls.langkah, cara), LC.kalimatKunci(ls.langkah, cara), LC.petunjukSalah(ls.langkah, cara, 1)];
{
  sama(LC.URUT_METODE, METODE, "urutan metode");
  cek(LC.NAMA_METODE.igil.includes("Pecah Bilangan, Susun Bilangan, Bagan Bagian Utuh") && LC.NAMA_METODE.pecah.includes("Break Apart") && LC.NAMA_METODE.susun.includes("Build Up") && LC.NAMA_METODE.bagan.includes("Part-Part-Whole"), "nama metode IGIL dan tiga metode global");
  cek(METODE.every((m) => emojiSah(LC.IKON_METODE[m])), "ikon metode sah");
  let nomor = 2;
  for (const [nama, [rupa, soal]] of Object.entries(TAHAP)) {
    cek(soal.length === 3 && soal.map((s) => s.cara).join() === CARA.join(), `${nama}: tiga misi Klik, Kanvas, Suara`);
    cek(soal.every((s) => s.langkah.length === 4 && s.langkah.map((l) => l.metode).join() === METODE.join()), `${nama}: empat langkah per misi (IGIL, Break Apart, Build Up, Part-Part-Whole)`);
    for (const s of soal) {
      cek(s.nomor === nomor, `${nama}: nomor misi berlanjut ${nomor}`);
      nomor += 1;
      cek(s.judul.startsWith("Misi Kios") && s.cerita.length > 15 && bersih(s.judul) && bersih(s.cerita), `${nama} ${s.nomor}: judul dan cerita sah`);
      sama(s.langkah.map((l) => LC.dasarDari(l.langkah).tipe), TIPE[nama][s.cara], `${nama} ${s.nomor}: jenis tugas per metode`);
      for (const ls of s.langkah) {
        cek(ls.cara === s.cara, `${nama} ${s.nomor}: cara langkah sama dengan misi`);
        const teks = semuaTeksLangkah(ls, rupa, s.cara);
        cek(teks.every((t) => tanpaDigit(t) && bersih(t)), `${nama} ${s.nomor} ${ls.metode}: teks tanpa digit dan kata terlarang (${teks.find((t) => !tanpaDigit(t) || !bersih(t)) ?? ""})`);
        cek(emojiSah(teks.join("")), `${nama} ${s.nomor} ${ls.metode}: emoji sah`);
        cek(ls.judul === ls.suara && ls.judul === LC.instruksi(ls.langkah, rupa, s.cara, ls.metode), `${nama} ${s.nomor} ${ls.metode}: judul dan suara sama dengan instruksi`);
        if (rupa !== "benda") cek(!adaEmoji(teks.join(" ")), `${nama} ${s.nomor} ${ls.metode}: teks tugas tanpa emoji (batas rupa)`);
        cek(/Metode IGIL|Break Apart|Build Up|Part-Part-Whole|sudah menjawab/.test(ls.judul), `${nama} ${s.nomor} ${ls.metode}: judul tugas memuat nama metode`);
      }
    }
    // Cari kesalahan di tempat yang ditentukan.
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
    }
  }
  cek(nomor === 11, "nomor misi berlanjut sampai sepuluh");
  // Seed Cari kesalahan dari alur.
  const sC = D.CONCRETE[0].langkah[0].langkah;
  cek(sC.tokoh === "Satria" && sC.dasar.tipe === "urai" && sC.dasar.n === 6304 && sC.jawabTokoh === "6.000 + 30 + 4" && LC.teksKunciKlik(sC) === "6.000 + 300 + 4" && !sC.betul, "Cari kesalahan Concrete: Satria menguraikan 6.304 menjadi 6.000 + 30 + 4 (seed alur)");
  const sP = D.PICTORIAL[0].langkah[0].langkah;
  cek(sP.tokoh === "Laras" && sP.dasar.tipe === "susun" && sP.dasar.n === 3908 && sP.jawabTokoh === "3.908" && LC.teksKunciKlik(sP) === "3.908" && sP.betul === true && sP.benar === 2, "Cari kesalahan Pictorial: Laras menyusun 3.000 + 900 + 8 menjadi 3.908, benar (seed alur)");
  const sA = D.ABSTRACT[0].langkah[2].langkah;
  cek(sA.tokoh === "Satria" && sA.dasar.tipe === "susun" && sA.dasar.n === 2057 && sA.jawabTokoh === "2.570" && LC.teksKunciKlik(sA) === "2.057" && !sA.betul, "Cari kesalahan Abstract: Satria menyusun 2.000 + 50 + 7 menjadi 2.570 (angka dirapatkan ke kiri)");
  // Posisi alasan benar (rumus di LangkahKelapa): tidak selalu tombol pertama.
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
        if (d.tipe === "urai") {
          const digit = String(d.n).split("");
          cek(d.n >= 1000 && d.n <= 9999 && !BILANGAN_STORY.includes(d.n) || seed, `${tag}: bilangan empat angka berbeda dari Story (${d.n})`);
          cek(LC.angkaDi(d.n, d.tempat) >= 1 && digit.filter((c) => c === String(LC.angkaDi(d.n, d.tempat))).length === 1, `${tag}: angka di tempat ${d.tempat} bukan nol dan tidak kembar dengan angka lain pada ${d.n}`);
          cek(LC.uraiKeliru(d.n).length >= 2, `${tag}: ada dua uraian keliru untuk pengecoh`);
          if (rupa === "benda") cek(T.susunRak(d.n).every((b) => b.jumlah === LC.angkaDi(d.n, b.tempat)), `${tag}: rak sebanyak angkanya`);
        }
        if (d.tipe === "susun") {
          cek(d.n >= 1000 && d.n <= 9999 && LC.banyakNol(d.n) >= 1 && LC.banyakNol(d.n) <= 3 && String(d.n)[0] !== "0" && !BILANGAN_STORY.includes(d.n), `${tag}: bilangan bernol berbeda dari Story (${d.n})`);
          if (s.cara === "suara") cek(LC.banyakNol(d.n) === 1, `${tag}: tepat satu tempat bernol untuk soal suara`);
          cek(LC.susunKeliru(d.n).length >= 2, `${tag}: ada dua susunan keliru untuk pengecoh (${LC.susunKeliru(d.n)})`);
        }
        if (d.tipe === "bagan") {
          cek(d.utuh % 100 === 0 && d.bagian % 100 === 0 && d.bagian < d.utuh && d.utuh <= 9999 && (rupa !== "benda" || (T.muatBagan(d.utuh) && T.muatBagan(d.bagian))), `${tag}: bagan kelipatan seratus, bagian lebih kecil, Concrete muat di rak (${d.utuh}, ${d.bagian})`);
          cek(!(d.utuh === 5000 && d.bagian === 4000), `${tag}: berbeda dari Story (lima ribu dan empat ribu)`);
          if (s.cara !== "klik" && d.klaim === undefined) cek((d.utuh - d.bagian) % d.satuan === 0 && (d.utuh - d.bagian) / d.satuan >= 1 && (d.utuh - d.bagian) / d.satuan <= 9 && d.satuan === 1000, `${tag}: bagian lain kelipatan ${d.satuan} dan satu angka`);
          if (s.cara === "klik") cek(LC.baganKeliru(d).length >= 2, `${tag}: ada dua bagian keliru untuk pengecoh`);
          if (s.cara === "suara" && d.klaim !== undefined) cek((d.bagian + d.klaim === d.utuh) === (LC.kunciJawab(d, "suara").nama === "sama") && d.klaim % 100 === 0, `${tag}: sama atau berbeda dihitung dari data`);
        }
        if (d.tipe === "lain") {
          cek(d.n >= 4000 && d.n <= 9999 && d.a % 1000 === 0 && d.a >= 1000 && d.n - d.a >= 1000 && !BILANGAN_STORY.includes(d.n) && !(d.n === 5270), `${tag}: bilangan dan bagian pertama sah (${d.n} = ${d.a} + ...)`);
          cek(!(d.a === 4000 && d.n === 5270) && !(d.a === 3000 && d.n === 5270), `${tag}: berbeda dari Story`);
          if (s.cara === "klik") cek(LC.lainKeliru(d).length >= 2, `${tag}: ada dua uraian dua bagian yang keliru`);
          if (s.cara === "suara") cek((d.a + d.klaim === d.n) === (LC.kunciJawab(d, "suara").nama === "sama"), `${tag}: sama atau berbeda dihitung dari data`);
        }
      }
  // Tiap metode tampak di tiap tahap: tiap tahap memuat semua jenis tugas.
  for (const [nama, [, soal]] of Object.entries(TAHAP)) {
    const tipe = new Set(soal.flatMap((s) => s.langkah.map((l) => LC.dasarDari(l.langkah).tipe)));
    cek(["urai", "susun", "bagan", "lain"].every((t) => tipe.has(t)), `${nama}: jenis tugas urai, susun, bagan, lain ada`);
    const tempat = new Set(soal.flatMap((s) => s.langkah.map((l) => LC.dasarDari(l.langkah)).filter((d) => d.tipe === "urai").map((d) => d.tempat)));
    cek(tempat.size >= 3, `${nama}: tempat angka yang ditanyakan beragam (${[...tempat]})`);
    const klaimBagan = soal.flatMap((s) => s.langkah.map((l) => LC.dasarDari(l.langkah)).filter((d) => d.tipe === "bagan" && d.klaim !== undefined));
    cek(klaimBagan.length <= 1 && klaimBagan.every((d) => d.klaim % 100 === 0), `${nama}: paling banyak satu bagan suara bertanya sama atau berbeda`);
  }
}

/* ------------------------------ Tugas dihitung dari data ------------------------------ */
{
  const nama = (k) => (k ? (k.jenis === "nama" ? k.nama : k.n) : null);
  const u = { tipe: "urai", benda: "kelapa", n: 4607, tempat: "ratusan" };
  const su = { tipe: "susun", benda: "kelapa", n: 3050 };
  const bg = { tipe: "bagan", benda: "kelapa", utuh: 8400, bagian: 3000, satuan: 1000 };
  const bk = { ...bg, klaim: 5500 };
  const ln = { tipe: "lain", benda: "kelapa", n: 7350, a: 5000, klaim: 2350 };
  // Jawaban benar tiap jenis tugas dihitung dari data.
  sama(["klik", "kanvas", "suara"].map((c) => nama(LC.kunciJawab(u, c))), ["4.000 + 600 + 7", 6, "ratusan"], "kunci urai: uraian, angka di tempat, nama tempat");
  sama(["klik", "kanvas", "suara"].map((c) => nama(LC.kunciJawab(su, c))), ["3.050", 2, "ratusan"], "kunci susun: bilangan, banyak nol, tempat nol pertama");
  sama(["klik", "kanvas", "suara"].map((c) => nama(LC.kunciJawab({ ...bg, utuh: 9000 }, c))), ["6.000", 6, 6], "kunci bagan: bagian lain, ribuan, ribuan");
  sama(["klik", "suara"].map((c) => nama(LC.kunciJawab(bk, c))), ["5.400", "berbeda"], "kunci bagan klaim: bagian lain dan berbeda");
  sama(nama(LC.kunciJawab({ ...bk, klaim: 5400 }, "suara")), "sama", "kunci bagan klaim benar: sama");
  sama(["klik", "kanvas", "suara"].map((c) => nama(LC.kunciJawab(ln, c))), ["5.000 + 2.350", 2, "sama"], "kunci lain: uraian dua bagian, ribuan, sama");
  sama(nama(LC.kunciJawab({ ...ln, klaim: 2250 }, "suara")), "berbeda", "kunci lain klaim keliru: berbeda");
  // Pengecoh dan pilihan.
  sama(LC.pengecohAngka(5), [6, 4, 7, 3, 8, 2], "pengecoh angka");
  cek(LC.pengecohAngka(1).every((x) => x >= 1 && x <= 9 && x !== 1) && LC.pengecohAngka(9).every((x) => x >= 1 && x <= 9 && x !== 9), "pengecoh angka: tetap satu sampai sembilan");
  sama(LC.uraiKeliru(6304).slice(0, 3), ["600 + 300 + 4", "6.000 + 30 + 4", "6.000 + 300 + 40"], "uraian keliru: satu angka bergeser tempat");
  sama(LC.susunKeliru(2057).slice(0, 3), ["2.570", "257", "2.507"], "susunan keliru: dirapatkan ke kiri, nol hilang, bertukar");
  sama(LC.baganKeliru({ ...bg, satuan: 100 }).slice(0, 2), ["5.500", "5.300"], "bagian keliru: bergeser seratus");
  sama(LC.lainKeliru(ln), ["5.000 + 2.450", "5.000 + 1.350", "5.000 + 3.350", "6.000 + 2.350"], "uraian dua bagian keliru");
  const pu = LC.pilihanKlik(u);
  cek(pu.length === 3 && new Set(pu).size === 3 && pu.includes("4.000 + 600 + 7") && pu[0] !== "4.000 + 600 + 7", `pilihan klik uraian: tiga unik, benar bukan yang pertama (${pu.join("/")})`);
  cek(LC.pilihanSuara(u, "suara").length === 3 && LC.pilihanSuara(u, "suara").includes("ratusan") && LC.pilihanSuara(u, "suara")[0] !== "ratusan", "pilihan suara tempat angka: tiga tempat, benar bukan yang pertama");
  cek(LC.pilihanSuara(bk, "suara").join() === "sama,berbeda" && LC.pilihanSuara(ln, "suara").join() === "berbeda,sama", "pilihan suara kata: dua kata, benar bukan yang pertama");
  cek(LC.pilihanSuara({ ...bg, utuh: 9000 }, "suara").length === 3 && LC.pilihanSuara({ ...bg, utuh: 9000 }, "suara").includes("enam"), "pilihan suara bilangan: tiga bilangan dalam kata");

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
          cek(kunci.n >= 1 && kunci.n <= 9, `${tag}: jawaban angka satu sampai sembilan (${kunci.n})`);
          if (s.cara === "kanvas") kanvasAngka.push(kunci.n);
        }
        if (s.cara === "klik") cek(kunci?.jenis === "nama", `${tag}: jawaban klik berupa uraian atau bilangan`);
        if (s.cara === "kanvas") cek(kunci?.jenis === "angka", `${tag}: jawaban kanvas satu angka`);
        // Pilihan klik: tiga pilihan unik, jawaban benar tidak di tombol pertama.
        if (s.cara === "klik" && kunci !== null) {
          const pil = LC.pilihanKlik(l);
          const benar = LC.teksKunciKlik(l);
          cek(pil.length === 3 && new Set(pil).size === 3 && pil.includes(benar) && pil[0] !== benar, `${tag}: pilihan klik unik dan jawaban benar bukan yang pertama (${pil.join("/")})`);
          cek(pil.every((p) => /^[\d. +]+$/.test(p)), `${tag}: pilihan berupa bilangan atau uraian berpemisah titik (${pil.join("/")})`);
        }
        if (s.cara === "suara" && kunci !== null) {
          const pil = LC.pilihanSuara(l, "suara");
          const benar = LC.teksKunciPilihan(kunci);
          cek(pil.includes(benar) && pil.length === (kunci.jenis === "nama" && (benar === "sama" || benar === "berbeda") ? 2 : 3) && new Set(pil).size === pil.length && tanpaDigit(pil.join(" ")), `${tag}: pilihan cadangan suara memuat jawaban benar (${pil.join("/")})`);
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
  const kv = (n) => TAHAP[n][1].filter((s) => s.cara === "kanvas").flatMap((s) => s.langkah.map((l) => LC.kunciJawab(l.langkah, "kanvas").n));
  sama(kv("Concrete"), [3, 8, 2, 4], "angka kanvas Concrete");
  sama(kv("Pictorial"), [5, 7, 2, 6], "angka kanvas Pictorial");
  sama(kv("Abstract"), [5, 7, 2, 1], "angka kanvas Abstract");
  // Tugas suara bervariasi: kata dan bilangan.
  const suaraJenis = Object.values(TAHAP).flatMap(([, soal]) => soal[2].langkah.map((l) => LC.kunciJawab(l.langkah, "suara").jenis));
  cek(suaraJenis.includes("nama") && suaraJenis.includes("angka"), "tugas suara: kata dan bilangan");
  const kataSuara = Object.values(TAHAP).flatMap(([, soal]) => soal[2].langkah.flatMap((l) => (LC.kunciJawab(l.langkah, "suara").jenis === "nama" ? [LC.kunciJawab(l.langkah, "suara").nama] : [])));
  for (const w of ["ribuan", "ratusan", "puluhan", "satuan", "sama", "berbeda"]) cek(kataSuara.includes(w), `tugas suara: kata ${w} muncul`);
  // Poin penting dan penutup.
  cek(D.POIN_PENTING.length >= 6 && D.POIN_PENTING.every((p) => p.length > 20 && bersih(p)) && D.POIN_PENTING_SUARA.every((p) => tanpaDigit(p) && !/[=<>+−]/.test(p)), "poin penting: banyak, bersih, suara tanpa digit dan tanda");
  const poin = D.POIN_PENTING.join(" ").toLowerCase();
  for (const m of ["menyusun", "menguraikan", "tempat angka", "ribuan", "nol", "lebih dari satu cara", "pecah bilangan", "susun bilangan", "bagan bagian utuh", "mengurangkan"]) cek(poin.includes(m), `poin penting memuat ${m}`);
  cek(tanpaDigit(D.PENUTUP_D) && bersih(D.PENUTUP_D) && /Bu Rina/.test(D.PENUTUP_D) && /meja resepsi/.test(D.PENUTUP_D) && D.PENUTUP_D.endsWith("?"), "penutup D: jembatan ke Sub-Bab E tanpa digit");
  cek(Object.values(D.TEMA_KELAPA).every((t) => emojiSah(t.ikon) && t.nama.length >= 7 && t.cara.length > 20 && tanpaDigit(t.cara) && bersih(t.cara)), "tema tiga tahap sah");
  cek(D.TEMA_KELAPA.pictorial.cara.includes("polos") && D.TEMA_KELAPA.abstract.cara.includes("kartu") && D.TEMA_KELAPA.concrete.cara.includes("beremoji"), "tema: Pictorial polos, Abstract kartu, Concrete beremoji");
  cek(D.CONCRETE_KELAPA === D.CONCRETE && D.PICTORIAL_KELAPA === D.PICTORIAL && D.ABSTRACT_KELAPA === D.ABSTRACT && D.MISI_KELAPA_TEKS === DS.MISI_KELAPA_TEKS, "nama ekspor untuk pemasang");
}

/* ------------------------------ Berkas ------------------------------ */
{
  const berkas = readdirSync(folderUrl).filter((f) => /\.(ts|tsx)$/.test(f));
  for (const nama of ["logika.ts", "data-sim.ts", "data-kartu.ts", "logika-cpa.ts", "data.ts", "periksa.ts", "tata.ts", "JawabKelapa.tsx", "LangkahKelapa.tsx", "GambarKelapa.tsx", "TahapKelapa.tsx", "SimulasiKiosKelapa.tsx", "KiosKelapa.tsx", "DaftarKelapa.tsx"]) cek(berkas.includes(nama), `berkas ${nama} ada`);
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folderUrl), "utf8");
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d || c.codePointAt(0) === 0x1f6de), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}/i.test(s), `${f}: kode emoji tidak melewati U+1FA95`);
    cek(!/buku|kelompok|bernilai|tebak/i.test(s), `${f}: tanpa kata buku, kelompok, bernilai, tebak`);
    if (/^(logika|logika-cpa|periksa|data|data-sim|data-kartu|tata)\.ts$/.test(f)) cek(!/from "react"|fetch\(/.test(s), `${f}: tanpa React dan jaringan`);
    cek(!/tiket-k4b1a|handuk-k4b1b|dermaga-k4b1c|resepsi-k4b1e|sisa-k4b1f|perahu-k4b1g|jatah-k4b1h|jadwal-k4b1i|papan-k3b5a|tabel-k3b5b|SubBabK4B1|eja-k4b1|data-k4b1|naskah-k4b1/.test(s), `${f}: tidak memakai folder Sub-Bab lain atau berkas lama Bab 1`);
  }
  // Teks layar tidak memuat kata terlarang, termasuk nama berkas data.
  const layar = ["LangkahKelapa.tsx", "TahapKelapa.tsx", "SimulasiKiosKelapa.tsx", "GambarKelapa.tsx"].map((f) => readFileSync(new URL(f, folderUrl), "utf8")).join("\n");
  const teksLayar = [...layar.matchAll(/>\s*([^<>{}\n]{4,})\s*</g)].map((m) => m[1]).join(" ");
  cek(!/\b(skor|nilai|soal|tebak|kunci|latihan|teman|kelompok|buku|kelas)\b/i.test(teksLayar), "teks layar komponen tanpa kata terlarang");
  cek(/\bTugas\b/.test(layar) && !/>\s*Soal/.test(layar), "teks layar CPA memakai Tugas");
  cek(!/capitalize/.test(layar), "teks layar: tanpa kelas capitalize");
  const th = readFileSync(new URL("TahapKelapa.tsx", folderUrl), "utf8");
  cek(/umum: Umum;\s*rupa: Rupa;\s*soal: SoalMisi\[\];\s*pita:/.test(th) && /teksAkhir: string/.test(th) && /poinPenting\?: boolean/.test(th), "TahapKelapa: props umum, rupa, soal, pita, teksAkhir, poinPenting");
  cek(/IKON_METODE\[ls\.metode\]/.test(th) && /rupa === "benda" \?/.test(th), "TahapKelapa: ikon metode hanya pada rupa benda (Pictorial dan Abstract tanpa emoji metode)");
  cek(/export default function TahapKelapa/.test(th) && /Cari kesalahan/.test(th) && /POIN_PENTING/.test(th) && /PENUTUP_D/.test(th), "TahapKelapa: ekspor, Cari kesalahan, Poin Penting, jembatan");
  cek(/"kios"/.test(th) && /"papanharga"/.test(th) && /"nota"/.test(th) && /KIOS KELAPA/.test(th) && /cap/.test(th) && !/"etalase"|"kapur"|"catatan"|"bambu"|"denah"|"tikar"|"peta"|"tirai"|"jepit"/.test(th), "TahapKelapa: pola visual kios kelapa, papan harga, nota Pak Darwis (berbeda dari bab sebelumnya)");
  const lg = readFileSync(new URL("LangkahKelapa.tsx", folderUrl), "utf8");
  cek(/export function LangkahKelapa/.test(lg) && /JawabSuaraKelapa/.test(lg) && /JawabTulis/.test(lg) && /pilihanSuara\(l, cara\)/.test(lg) && /TampilDasar/.test(lg), "LangkahKelapa: ekspor, jawab suara dengan pilihan ketuk, jawab tulis di kanvas");
  cek(/ucapkan\(/.test(lg), "LangkahKelapa: ucapan memakai kata, bukan digit");
  const jw = readFileSync(new URL("JawabKelapa.tsx", folderUrl), "utf8");
  cek(/gagalSekali/.test(jw) && /Ini jawaban yang benar|jawaban yang benar/.test(jw) && /PilihanKata/.test(jw) && /setCadangan\(true\)/.test(jw) && /e\.error === "not-allowed"/.test(jw), "JawabKelapa: galat mikrofon dihitung gagal, pilihan ketuk sebagai cadangan, jawaban benar setelah tiga kali salah");
  const gm = readFileSync(new URL("GambarKelapa.tsx", folderUrl), "utf8");
  cek(/export function Rak\b/.test(gm) && /susunRak/.test(gm) && /export function TampilDasar/.test(gm) && /rupa === "lambang"/.test(gm) && /EMOJI_BENDA/.test(gm) && /BaganTempat/.test(gm) && /BaganUtuh/.test(gm) && /susunBalok/.test(gm) && /RakBagan/.test(gm), "GambarKelapa: rak beremoji, rak bagan, bagan tempat angka dengan balok polos, bagan bagian utuh, tampilan dasar, kartu untuk Abstract");
  cek(!/EMOJI_BENDA\[[^\]]+\]/.test(gm.slice(gm.indexOf("BaganTempat"), gm.indexOf("Kartu kata"))), "GambarKelapa: Pictorial (balok polos dan bagan polos) tanpa emoji benda");
  const sim = readFileSync(new URL("SimulasiKiosKelapa.tsx", folderUrl), "utf8");
  cek(/export default function SimulasiKiosKelapa/.test(sim) && /onKeadaan/.test(sim) && /MISI_KELAPA_TEKS/.test(sim), "SimulasiKiosKelapa: ekspor, onKeadaan, teks misi");
  for (const [f, nm] of [["KiosKelapa.tsx", "KiosKelapaK4B1"], ["DaftarKelapa.tsx", "DaftarKelapaK4B1"]]) {
    const s = readFileSync(new URL(f, folderUrl), "utf8");
    cek(/speakGuru/.test(s) && /onLanjut/.test(s) && /teksLanjut/.test(s) && /peta-kartu\//.test(s) && new RegExp(`export default function ${nm}`).test(s) && new RegExp(`export \\{ ${nm} \\}`).test(s), `${f}: pembungkus tipis komponen bersama peta-kartu, ekspor ${nm}`);
  }
  // Berkas bersama: Simulasi memasang Kios Kelapa.
  const sk = readFileSync(new URL("../src/components/modul/SimulasiK4Bab1.tsx", import.meta.url), "utf8");
  cek(/SimulasiKiosKelapa/.test(sk) && /laporMisiKelapa\(daftarMisiKelapa\("D"\), k, a\.capai\)/.test(sk) && !/judulBab=\{`Kelas/.test(sk), "SimulasiK4Bab1: langkahKiosKelapaD memasang Kios Kelapa, judul bab tanpa kata Kelas");
  // Berkas lama yang dipertahankan ada (dipakai bab lain dan bank soal).
  for (const f of ["data-k4b1.ts", "naskah-k4b1.ts", "eja-k4b1.ts", "dasar-k4b1.tsx", "diagram-k4b1.tsx", "bantu-k4b1.tsx", "papan-k4b1.tsx", "skala-k4b1.ts", "video-k4b1-umum.tsx"]) cek(readdirSync(new URL("../src/components/modul/", import.meta.url)).includes(f), `berkas lama ${f} dipertahankan`);
  const ej = readFileSync(new URL("../src/lib/ejaan-inggris-id.ts", import.meta.url), "utf8");
  cek(/break apart/i.test(ej) && /build up/i.test(ej) && /part-part-whole/i.test(ej), "ejaan: tiga nama metode global ada");
}

console.log(`Lulus ${lulus}, gagal ${gagal}`);
process.exit(gagal ? 1 : 0);
