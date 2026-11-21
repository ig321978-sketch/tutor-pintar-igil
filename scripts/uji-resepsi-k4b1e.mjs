// Uji Simulasi Meja Resepsi, dan tahap Concrete, Pictorial, Abstract Kelas 4 Bab 1 Sub-Bab E ("Meja Resepsi Bu Rina"),
// lanjutan cerita Penginapan Pulau Karang Indah (penjumlahan bilangan sampai 1.000: susun ke bawah, simpan, tambah per tempat, genapkan dulu).
// Memeriksa: logika simulasi (susun mulai dari satuan dengan alat menolak kolom lain dan hasil kolom yang belum benar, tukar sepuluh balok dengan alat menolak bila belum sepuluh,
// genapkan dulu dengan alat menolak menyesuaikan sebelum membulatkan), misi (awal tidak memenuhi, wajib empat, bebas dua), CPA dua belas langkah per tahap (Klik, Kanvas, Suara x empat metode) dengan jawaban beragam dan Cari kesalahan di tiap tahap, jawaban benar dihitung dari data,
// angka jawaban tidak kembar per tahap, tugas yang langsung siap (jebakan tombol macet), geometri balok cacah tepat (kotak, batang, butir sebanyak angkanya), pengenal ucapan, petunjuk salah,
// batas rupa, emoji, kata terlarang, akhir baris.
// Jalankan: node --no-warnings scripts/uji-resepsi-k4b1e.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/resepsi-k4b1e/logika.ts");
const DS = await import("../src/components/modul/resepsi-k4b1e/data-sim.ts");
const LC = await import("../src/components/modul/resepsi-k4b1e/logika-cpa.ts");
const D = await import("../src/components/modul/resepsi-k4b1e/data.ts");
const K = await import("../src/components/modul/resepsi-k4b1e/periksa.ts");
const BL = await import("../src/components/modul/resepsi-k4b1e/balok.ts");
const S = await import("../src/components/modul/misi-simulasi.ts");
const MK = await import("../src/components/modul/misi-k4bab1.ts");
const MT = await import("../src/components/modul/misi-teks-k4b1.ts");
const folderUrl = new URL("../src/components/modul/resepsi-k4b1e/", import.meta.url);
/** Benda beremoji pada GambarResepsi.tsx (kunci EMOJI_BENDA), dibaca dari teks karena berkas tsx tidak bisa diimpor di Node. */
const DG_EMOJI = {};
{
  const gu = readFileSync(new URL("GambarResepsi.tsx", folderUrl), "utf8");
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
/** Bilangan Story E: jangan dijadikan data CPA atau Simulasi (kecuali seed Cari kesalahan dari alur). */
const STORY = new Set([245, 378, 113, 326, 259, 540, 235, 123, 99, 364, 158, 230, 198, 623, 513, 736, 585, 575, 775, 222, 223, 645, 400]);

/* ------------------------------ Kata bilangan ------------------------------ */
{
  sama([0, 1, 9, 10, 11, 15, 20, 38, 100, 305, 623, 999].map(LC.kataBil), ["nol", "satu", "sembilan", "sepuluh", "sebelas", "lima belas", "dua puluh", "tiga puluh delapan", "seratus", "tiga ratus lima", "enam ratus dua puluh tiga", "sembilan ratus sembilan puluh sembilan"], "kata bilangan CPA");
  cek(LC.kata === LC.kataBil, "alias kata");
  for (let n = 0; n <= 999; n += 1) cek(tanpaDigit(LC.kataBil(n)) && LC.kataBil(n) === L.kata(n), `kata bilangan ${n} sama di simulasi dan CPA`);
  sama([LC.ucapkan("9 − 3 = 6"), LC.ucapkan("tulis 4, simpan 1"), LC.ucapkan("3 + 6 = 9"), LC.ucapkan("782"), LC.ucapkan("satuan")], ["sembilan dikurangi tiga sama dengan enam", "tulis empat, simpan satu", "tiga ditambah enam sama dengan sembilan", "tujuh ratus delapan puluh dua", "satuan"], "ucapkan: angka dan lambang menjadi kata");
}

/* ------------------------------ Geometri balok cacah ------------------------------ */
{
  for (let n = 0; n <= 999; n += 1) {
    const b = BL.susunBalok(n, 46, 40);
    const d = [Math.floor(n / 100), Math.floor(n / 10) % 10, n % 10];
    if (!(b.ratusan.length === d[0] && b.puluhan.length === d[1] && b.satuan.length === d[2] && BL.bilanganDariBalok(b) === n)) cek(false, `balok ${n}: banyak kotak, batang, butir sama dengan angkanya`);
    else lulus += 1;
  }
  const b = BL.susunBalok(999, 46, 40);
  const semua = [...b.ratusan.map((q) => [q.x, q.y, q.x + q.w, q.y + q.h]), ...b.puluhan.map((q) => [q.x, q.y, q.x + q.w, q.y + q.h]), ...b.satuan.map((q) => [q.cx - q.r, q.cy - q.r, q.cx + q.r, q.cy + q.r])];
  cek(semua.every((q) => q[0] >= 40 && q[2] <= 280 && q[1] >= 38 && q[3] <= 70), "balok 999: semua balok masuk panel dan satu baris tingginya tidak lebih dari tiga puluh");
  const tumpuk = (a, c) => Math.min(a[2], c[2]) - Math.max(a[0], c[0]) > 0.5 && Math.min(a[3], c[3]) - Math.max(a[1], c[1]) > 0.5;
  let bertumpuk = 0;
  for (let i = 0; i < semua.length; i += 1) for (let j = i + 1; j < semua.length; j += 1) if (tumpuk(semua[i], semua[j])) bertumpuk += 1;
  cek(bertumpuk === 0, `balok 999: tidak ada balok yang bertumpuk (${bertumpuk})`);
  sama([BL.ZONA[0].nama, BL.ZONA[1].nama, BL.ZONA[2].nama], ["ratusan", "puluhan", "satuan"], "zona balok urut dari kiri");
  cek(BL.pusatZona(46, 0) > BL.pusatZona(46, 1) && BL.pusatZona(46, 1) > BL.pusatZona(46, 2), "pusat zona: satuan paling kanan, ratusan paling kiri");
}

/* ------------------------------ Simulasi: data dan logika ------------------------------ */
{
  const semua = [...DS.TARGET_SUSUN, ...DS.TARGET_TUKAR, ...DS.TARGET_GENAP];
  cek(semua.every((t) => t.a >= 100 && t.b >= 100 && t.a + t.b <= 999 && !STORY.has(t.a) && !STORY.has(t.b) && !STORY.has(t.a + t.b)), "data simulasi: tiga angka, jumlah sampai 999, berbeda dari Story");
  cek(DS.TARGET_SUSUN.length >= 3 && DS.TARGET_TUKAR.length >= 3 && DS.TARGET_GENAP.length >= 3, "data simulasi: tiga sasaran tiap alat");
  const simpanSusun = DS.TARGET_SUSUN.map((t) => LC.banyakSimpan(t.a, t.b));
  cek(simpanSusun[0] === 0 && simpanSusun.slice(1).every((n) => n >= 1) && simpanSusun.some((n) => n === 2), `data simulasi susun: pertama tanpa simpanan, lalu memakai simpanan, ada yang dua kali (${simpanSusun})`);
  cek(DS.TARGET_TUKAR.every((t) => [0, 1].some((k) => LC.jumlahAngka(t.a, t.b, k) >= 10)), "data simulasi tukar: tiap sasaran butuh penukaran");
  cek(DS.TARGET_GENAP.every((t) => t.bulat % 100 === 0 && Math.abs(t.b - t.bulat) >= 1 && Math.abs(t.b - t.bulat) <= 5) && DS.TARGET_GENAP.some((t) => t.b < t.bulat) && DS.TARGET_GENAP.some((t) => t.b > t.bulat), "data simulasi genap: hampir bulat, ada naik dan turun");
  cek(tanpaDigit(DS.MISI_RESEPSI_TEKS) && bersih(DS.MISI_RESEPSI_TEKS) && DS.MISI_RESEPSI_TEKS.length > 20, "teks misi simulasi tanpa digit dan kata terlarang");

  // Susun: alat menolak kolom lain, hasil kolom yang belum benar, lalu menyelesaikan penjumlahan.
  let k = L.awalResepsi();
  cek(k.alat === "resepsi" && k.mode === "susun" && k.kol === 0 && k.susunBenar.length === 0 && !k.tolak, "susun: keadaan awal");
  const r0 = L.pilihKolom(k, 1);
  cek(!r0.ok && r0.k.tolak === true, "susun: alat menolak kolom puluhan sebelum satuan");
  cek(L.pilihKolom(k, 0).ok && L.pilihKolom(k, 9).ok === false, "susun: kolom satuan diterima, kolom di luar batas ditolak");
  // Sasaran pertama 133 + 524 tanpa simpanan.
  let r = L.jumlahkanKolom(L.pilihTulisSusun(k, 9));
  cek(!r.ok && r.k.salah === 1 && r.k.kol === 0, "susun: angka yang salah ditolak dan kolom tidak maju");
  cek(!/\d/.test(L.petunjukSusun(L.pilihTulisSusun(k, 9))) && !/\d/.test(L.petunjukSusun(k)), "susun: petunjuk tanpa digit");
  for (const [tulis, simpan] of [[7, 0], [5, 0], [6, 0]]) {
    k = L.pilihSimpanSusun(L.pilihTulisSusun(k, tulis), simpan);
    r = L.jumlahkanKolom(k);
    cek(r.ok, `susun sasaran 1: kolom dengan tulis ${tulis} diterima`);
    k = r.k;
  }
  cek(r.selesai && k.susunBenar.join() === "0" && k.simpanBenar.length === 0 && k.susunKe === 1 && k.kol === 0 && k.tulis.every((n) => n === -1), "susun: sasaran pertama selesai tanpa simpanan, sasaran kedua terbuka");
  // Sasaran kedua 267 + 185 = 452 dengan dua simpanan.
  const ke = (tulis, simpan) => {
    k = L.pilihSimpanSusun(L.pilihTulisSusun(k, tulis), simpan);
    const hasil = L.jumlahkanKolom(k);
    k = hasil.k;
    return hasil;
  };
  r = L.jumlahkanKolom(L.pilihSimpanSusun(L.pilihTulisSusun(k, 12 - 10), 0));
  cek(!r.ok && L.petunjukSusun(L.pilihSimpanSusun(L.pilihTulisSusun(k, 2), 0)).includes("sepuluh atau lebih"), "susun: satuan berjumlah dua belas tanpa simpanan ditolak dengan petunjuk sepuluh atau lebih");
  cek(ke(2, 1).ok && k.masuk[1] === 1 && k.kol === 1, "susun: tulis dua simpan satu, simpanan masuk ke puluhan");
  cek(L.jumlahKolom(k, 1) === 15 && L.tulisBenar(k) === 5 && L.simpanBenarKolom(k) === 1, "susun: puluhan memakai simpanan (enam, delapan, dan satu)");
  r = L.jumlahkanKolom(L.pilihSimpanSusun(L.pilihTulisSusun(k, 5), 1));
  cek(r.ok && L.petunjukSusun(L.pilihSimpanSusun(L.pilihTulisSusun(k, 5), 1)).length > 20, "susun: tulis lima simpan satu diterima");
  k = r.k;
  r = ke(4, 0);
  cek(r.ok && r.selesai && k.susunBenar.join() === "0,1" && k.simpanBenar.join() === "1" && k.susunKe === 2, "susun: sasaran kedua selesai dengan simpanan");
  cek(L.jumlahSusun({ ...k, susunKe: 1 }) === 452 && L.targetSusun({ ...k, susunKe: 1 }).a === 267, "susun: jumlah sasaran kedua empat ratus lima puluh dua");
  cek(L.petunjukSusun({ ...k, pilihTulis: 3, pilihSimpan: 1 }).includes("kurang dari sepuluh") || L.jumlahKolom({ ...k, pilihTulis: 3, pilihSimpan: 1 }, 0) >= 10, "susun: petunjuk simpanan yang tidak perlu");
  // Mode berpindah tanpa mengubah kemajuan.
  const kMode = L.pilihModeResepsi(k, "tukar");
  cek(kMode.mode === "tukar" && kMode.susunBenar.join() === k.susunBenar.join(), "mode berpindah tanpa menghapus kemajuan");

  // Tukar.
  let t = L.pilihModeResepsi(L.awalResepsi(), "tukar");
  sama(t.tukar, [12, 14, 3], "tukar: balok awal 267 + 185 per tempat");
  cek(L.sasaranTukar(t).join() === "12,14,3" && L.jumlahTukarSekarang(t) === 3 * 100 + 14 * 10 + 12, "tukar: jumlah balok sekarang sama dengan 267 + 185 tanpa menukar");
  const tolakT = L.tukarBalok({ ...t, tukar: [4, 5, 6] }, 0);
  cek(!tolakT.ok && tolakT.k.tolak === true && tolakT.k.tukar.join() === "4,5,6", "tukar: alat menolak bila belum sepuluh");
  cek(!L.periksaTukar(t).ok && L.periksaTukar(t).k.salah === 1 && !/\d/.test(L.petunjukTukar(t)) && L.petunjukTukar(t).includes("satuan"), "tukar: periksa sebelum menukar ditolak, petunjuk menunjuk satuan");
  let u = L.tukarBalok(t, 0);
  cek(u.ok && u.k.tukar.join() === "2,15,3" && L.jumlahTukarSekarang(u.k) === L.jumlahTukarSekarang(t), "tukar: sepuluh butir menjadi satu batang, bilangan tetap sama");
  cek(!L.periksaTukar(u.k).ok && L.petunjukTukar(u.k).includes("puluhan"), "tukar: puluhan masih sepuluh atau lebih");
  u = L.tukarBalok(u.k, 1);
  cek(u.ok && u.k.tukar.join() === "2,5,4", "tukar: sepuluh batang menjadi satu kotak");
  const ok = L.periksaTukar(u.k);
  cek(ok.ok && ok.k.tukarBenar.join() === "0" && ok.k.tukarKe === 1 && ok.k.tukar.join() === L.sasaranTukar(ok.k).join() && 4 * 100 + 5 * 10 + 2 === 267 + 185, "tukar: periksa benar, sasaran berikutnya terbuka, jumlah empat ratus lima puluh dua");

  // Genap.
  let g = L.pilihModeResepsi(L.awalResepsi(), "genap");
  const tolakG = L.pilihArahGenap(g, 1);
  cek(!tolakG.ok && tolakG.k.tolak === true, "genap: alat menolak menyesuaikan sebelum membulatkan");
  cek(!L.periksaGenap(g).ok && L.petunjukGenap(g).includes("Bulatkan dulu"), "genap: periksa sebelum membulatkan ditolak");
  g = L.bulatkanGenap(g);
  cek(g.bulat && L.jumlahBulat(g) === 437 + 300 && L.selisihGenap(g) === 2 && L.arahGenapBenar(g) === 1, "genap: dibulatkan ke atas, jumlah bulat 737, selisih dua, harus dikurangi");
  cek(!L.periksaGenap({ ...g, arah: 0 }).ok && L.petunjukGenap({ ...g, arah: 0 }).includes("dikurangi") && !L.periksaGenap(g).ok && L.petunjukGenap(g).includes("Pilih"), "genap: arah salah dan belum memilih ditolak dengan petunjuk");
  const pa = L.pilihArahGenap(g, 1);
  const pg = L.periksaGenap(pa.k);
  cek(pa.ok && pg.ok && pg.k.genapBenar.join() === "0" && pg.k.genapKe === 1 && !pg.k.bulat, "genap: dikurangi benar, sasaran berikutnya terbuka");
  cek(L.arahGenapBenar({ ...g, genapKe: 2 }) === 0, "genap: bilangan dibulatkan ke bawah harus ditambah");
  const petunjuk = [L.petunjukGenap(g), L.petunjukTukar(L.awalResepsi()), L.kalimatSusun(L.awalResepsi()), L.kalimatTukar(L.awalResepsi()), L.kalimatGenap(L.awalResepsi())];
  cek(petunjuk.every((p) => tanpaDigit(p) && bersih(p)), "kalimat petunjuk simulasi tanpa digit dan kata terlarang");

  // Misi dari keadaan yang dihasilkan logika.
  const dE = MK.daftarMisiK4Bab1("E");
  const misi = (x) => S.misiBaru(dE, x, new Set());
  sama(misi(L.awalResepsi()), [], "misi: keadaan awal tidak memenuhi misi");
  sama(misi(k), ["e-susun", "e-simpan"], "misi: dua penjumlahan selesai memenuhi e-susun dan e-simpan");
  sama(misi(ok.k), ["e-tukar"], "misi: tukar selesai memenuhi e-tukar");
  sama(misi(pg.k), ["e-genap"], "misi: genap selesai memenuhi e-genap");
  sama(misi(r0.k), ["e-tolak"], "misi: kolom puluhan sebelum satuan memenuhi e-tolak");
  sama(misi(tolakT.k), ["e-tolak"], "misi: tukar sebelum sepuluh memenuhi e-tolak");
  sama(misi(tolakG.k), ["e-tolak"], "misi: genap sebelum membulatkan memenuhi e-tolak");
  const teksMisi = [...DS.MISI_RESEPSI_TEKS.split(". ")];
  cek(MT.MISI_K4B1.E === DS.MISI_RESEPSI_TEKS && teksMisi.length === 2, "teks misi awal sama dengan data-sim");
  cek(MT.misiAwalK4Bab1("E").includes(DS.MISI_RESEPSI_TEKS), "misi awal Simulasi memuat teks misi");
}

/* Mind-map dan Infografis sub-bab ini diuji di scripts/uji-visual-k4b1def.mjs (rancangan per Sub-Bab, bukan kartu geser). */

/* ------------------------------ Pengenal ucapan ------------------------------ */
{
  const nm = (nama) => ({ jenis: "nama", nama });
  const an = (n) => ({ jenis: "angka", n });
  for (const nama of ["satuan", "puluhan", "ratusan", "ditambah", "dikurangi"]) cek(K.cocokUcapan(nama, nm(nama)).cocok && K.kataDariUcapan(nama).length === 1, `cocok: kata ${nama} dikenali tepat satu`);
  sama(K.kataDariUcapan("tempat satuan"), ["satuan"], "ucapan: tempat satuan dikenali sebagai satuan");
  sama(K.kataDariUcapan("dikurangi"), ["dikurangi"], "ucapan: dikurangi tidak dikenali sebagai ditambah");
  sama(K.kataDariUcapan("tambah"), ["ditambah"], "ucapan: tambah dikenali sebagai ditambah");
  sama(K.kataDariUcapan("kurang"), ["dikurangi"], "ucapan: kurang dikenali sebagai dikurangi");
  sama(K.kataDariUcapan("tidak ditambah"), [], "ucapan: tidak ditambah tidak dihitung");
  sama(K.kataDariUcapan("halo"), [], "ucapan: kata lain tidak dikenali");
  cek(!K.cocokUcapan("satuan", nm("puluhan")).cocok && !K.cocokUcapan("ditambah", nm("dikurangi")).cocok && !K.cocokUcapan("dikurangi", nm("ditambah")).cocok, "cocok: kata berbeda tidak cocok");
  sama(K.angkaDariUcapan("lima"), [5], "angka: lima");
  sama(K.angkaDariUcapan("tujuh ratus delapan puluh dua"), [782], "angka: tujuh ratus delapan puluh dua");
  sama(K.angkaDariUcapan("sembilan, 4 dan tiga"), [9, 4, 3], "angka: satuan dan angka tertulis");
  for (let n = 0; n <= 999; n += 1) if (K.angkaDariUcapan(LC.kataBil(n)).join() !== String(n)) cek(false, `angka: kata bilangan ${n} dikenali utuh (${LC.kataBil(n)} -> ${K.angkaDariUcapan(LC.kataBil(n))})`);
  cek(K.cocokUcapan("tiga", an(3)).cocok && K.cocokUcapan("3", an(3)).cocok && !K.cocokUcapan("empat", an(3)).cocok, "cocok: bilangan tiga");
  cek(K.cocokUcapan("delapan ratus delapan puluh dua", an(882)).cocok && K.cocokUcapan("882", an(882)).cocok && !K.cocokUcapan("delapan ratus delapan puluh dua", an(82)).cocok && !K.cocokUcapan("delapan puluh dua", an(882)).cocok, "cocok: bilangan tiga angka dikenali utuh");
}

/* ------------------------------ CPA ------------------------------ */
const TAHAP = { Concrete: ["benda", D.CONCRETE], Pictorial: ["diagram", D.PICTORIAL], Abstract: ["lambang", D.ABSTRACT] };
const CARA = ["klik", "kanvas", "suara"];
const METODE = ["igil", "susun", "tempat", "genap"];
const TIPE = ["jumlah", "simpan", "tempat", "genap"];
/** Tempat Cari kesalahan: [indeks misi, indeks langkah]. */
const TEMPAT_SALAH = { Concrete: [[0, 0]], Pictorial: [[0, 1], [0, 3]], Abstract: [[0, 0], [0, 3]] };
const semuaTeksLangkah = (ls, rupa, cara) => [ls.judul, ls.suara, LC.instruksi(ls.langkah, rupa, cara, ls.metode), LC.kalimatTanya(ls.langkah, cara), LC.kalimatKunci(ls.langkah, cara), LC.petunjukSalah(ls.langkah, cara, 1)];
{
  sama(LC.URUT_METODE, METODE, "urutan metode");
  cek(LC.NAMA_METODE.igil.includes("Susun ke Bawah, Tambah Per Tempat, Genapkan Dulu") && LC.NAMA_METODE.susun.includes("Column Add") && LC.NAMA_METODE.tempat.includes("Place Add") && LC.NAMA_METODE.genap.includes("Round and Adjust"), "nama metode IGIL dan tiga metode global");
  cek(METODE.every((m) => emojiSah(LC.IKON_METODE[m])), "ikon metode sah");
  let nomor = 2;
  for (const [nama, [rupa, soal]] of Object.entries(TAHAP)) {
    cek(soal.length === 3 && soal.map((s) => s.cara).join() === CARA.join(), `${nama}: tiga misi Klik, Kanvas, Suara`);
    cek(soal.every((s) => s.langkah.length === 4 && s.langkah.map((l) => l.metode).join() === METODE.join()), `${nama}: empat langkah per misi (IGIL, Column Add, Place Add, Round and Adjust)`);
    for (const s of soal) {
      cek(s.nomor === nomor, `${nama}: nomor misi berlanjut ${nomor}`);
      nomor += 1;
      cek(s.judul.startsWith("Misi Resepsi") && s.cerita.length > 15 && bersih(s.judul) && bersih(s.cerita), `${nama} ${s.nomor}: judul dan cerita sah`);
      sama(s.langkah.map((l) => LC.dasarDari(l.langkah).tipe), TIPE, `${nama} ${s.nomor}: jenis tugas per metode`);
      for (const ls of s.langkah) {
        cek(ls.cara === s.cara, `${nama} ${s.nomor}: cara langkah sama dengan misi`);
        const teks = semuaTeksLangkah(ls, rupa, s.cara);
        cek(teks.every((t) => tanpaDigit(t) && bersih(t)), `${nama} ${s.nomor} ${ls.metode}: teks tanpa digit dan kata terlarang (${teks.find((t) => !tanpaDigit(t) || !bersih(t)) ?? ""})`);
        cek(emojiSah(teks.join("")), `${nama} ${s.nomor} ${ls.metode}: emoji sah`);
        cek(ls.judul === ls.suara && ls.judul === LC.instruksi(ls.langkah, rupa, s.cara, ls.metode), `${nama} ${s.nomor} ${ls.metode}: judul dan suara sama dengan instruksi`);
        if (rupa !== "benda") cek(!adaEmoji(teks.join(" ")), `${nama} ${s.nomor} ${ls.metode}: teks tugas tanpa emoji (batas rupa)`);
        cek(/Metode IGIL|Column Add|Place Add|Round and Adjust|sudah menjawab/.test(ls.judul), `${nama} ${s.nomor} ${ls.metode}: judul tugas memuat nama metode`);
      }
    }
    // Cari kesalahan di tempat yang ditentukan.
    const salahL = soal.flatMap((s, si) => s.langkah.map((l, li) => [si, li, l])).filter(([, , l]) => l.langkah.tipe === "salah");
    sama(salahL.map(([si, li]) => [si, li]), TEMPAT_SALAH[nama], `${nama}: tempat Cari kesalahan`);
    for (const [, , l] of salahL) {
      const x = l.langkah;
      cek(x.alasan.length === 3 && new Set(x.alasan).size === 3 && x.benar >= 0 && x.benar <= 2 && x.keliru.length > 20 && x.kataTokoh.length > 15 && ["Satria", "Laras", "Genta"].includes(x.tokoh), `${nama}: Cari kesalahan lengkap`);
      cek(tanpaDigit(x.alasan.join(" ") + x.keliru) && bersih(x.kataTokoh + x.alasan.join(" ") + x.keliru), `${nama}: alasan dan penjelasan tanpa digit (diucapkan) dan tanpa kata terlarang`);
      const pil = LC.pilihanKlik(x);
      cek(pil.length === 3 && new Set(pil).size === 3 && pil.includes(String(x.jawabTokoh)), `${nama}: pilihan klik Cari kesalahan memuat jawaban tokoh (${pil.join("/")})`);
      const teksBenar = LC.teksKunciKlik(x);
      cek(teksBenar !== null, `${nama}: jawaban sendiri ada`);
      if (x.betul) cek(String(teksBenar) === String(x.jawabTokoh), `${nama}: jawaban tokoh yang benar sama dengan jawaban benar`);
      else cek(String(teksBenar) !== String(x.jawabTokoh), `${nama}: jawaban benar berbeda dari jawaban tokoh`);
      cek(LC.petunjukSalah(x, "klik", x.jawabTokoh).startsWith(`Itu jawaban ${x.tokoh}`), `${nama}: petunjuk menjelaskan jawaban tokoh`);
      cek(x.kataTokoh.includes(x.jawabTokoh.replace(/^tulis (\d), simpan 1$/, "$1")) || x.dasar.tipe === "simpan", `${nama}: kata tokoh memuat jawabannya`);
    }
  }
  cek(nomor === 11, "nomor misi berlanjut sampai sepuluh");
  // Seed Cari kesalahan dari alur.
  const sC = D.CONCRETE[0].langkah[0].langkah;
  cek(sC.tokoh === "Satria" && sC.dasar.tipe === "jumlah" && sC.jawabTokoh === String(LC.tanpaSimpan(sC.dasar.a, sC.dasar.b)) && Number(LC.teksKunciKlik(sC)) === sC.dasar.a + sC.dasar.b && !sC.betul && LC.banyakSimpan(sC.dasar.a, sC.dasar.b) >= 1, "Cari kesalahan Concrete: Satria menjumlahkan tanpa menyimpan (seed alur)");
  const sP = D.PICTORIAL[0].langkah[1].langkah;
  cek(sP.tokoh === "Laras" && sP.dasar.tipe === "simpan" && sP.jawabTokoh === LC.tulisSimpan(sP.dasar.a, sP.dasar.b) && LC.teksKunciKlik(sP) === sP.jawabTokoh && sP.betul === true && sP.benar === 0, "Cari kesalahan Pictorial: Laras menulis sisa satuan dan menyimpan satu, benar (seed alur)");
  const sQ = D.PICTORIAL[0].langkah[3].langkah;
  cek(sQ.tokoh === "Satria" && sQ.dasar.tipe === "genap" && sQ.jawabTokoh === String(sQ.dasar.a + sQ.dasar.bulat + LC.selisihBulat(sQ.dasar)) && Number(LC.teksKunciKlik(sQ)) === sQ.dasar.a + sQ.dasar.b && !sQ.betul, "Cari kesalahan Pictorial: Satria menambah kelebihan, bukan mengurangi");
  const sA = D.ABSTRACT[0].langkah[0].langkah;
  cek(sA.tokoh === "Satria" && sA.dasar.tipe === "jumlah" && sA.jawabTokoh === String(LC.tanpaSimpan(sA.dasar.a, sA.dasar.b)) && Number(LC.teksKunciKlik(sA)) === sA.dasar.a + sA.dasar.b && !sA.betul && LC.banyakSimpan(sA.dasar.a, sA.dasar.b) === 2, "Cari kesalahan Abstract: Satria lupa menyimpan dua kali (seed alur)");
  const sG = D.ABSTRACT[0].langkah[3].langkah;
  cek(sG.tokoh === "Genta" && sG.dasar.tipe === "genap" && sG.betul === true && sG.jawabTokoh === String(sG.dasar.a + sG.dasar.b) && sG.benar === 0, "Cari kesalahan Abstract: Genta membulatkan lalu mengurangi kelebihan, benar");
  // Posisi alasan benar (rumus di LangkahResepsi): tidak selalu tombol pertama.
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
        cek(LC.sahDasar(d, s.cara), `${tag}: data sah menurut jenis dan cara (${d.a} + ${d.b})`);
        cek(!STORY.has(d.a) && !STORY.has(d.b) && !STORY.has(d.a + d.b), `${tag}: data berbeda dari Story (${d.a}, ${d.b}, ${d.a + d.b})`);
        cek(d.a >= 100 && d.b >= 100 && d.a + d.b <= 999, `${tag}: bilangan tiga angka dengan jumlah sampai 999`);
        if (d.tipe === "simpan" && s.cara === "klik") cek(LC.simpananMasuk(d.a, d.b, 1) === 1, `${tag}: satuan menyimpan satu`);
        if (d.tipe === "tempat" && s.cara === "suara") cek([0, 1, 2].filter((k) => LC.jumlahAngka(d.a, d.b, k) >= 10).length === 1, `${tag}: tepat satu tempat menyimpan`);
        if (d.tipe === "genap") cek(Math.abs(d.b - d.bulat) <= 5 && d.bulat % 100 === 0, `${tag}: bilangan hampir bulat (${d.b} dekat ${d.bulat})`);
      }
  // Tiap tahap memuat semua jenis tugas dan kedua arah pembulatan.
  for (const [nama, [, soal]] of Object.entries(TAHAP)) {
    const dasar = soal.flatMap((s) => s.langkah.map((l) => LC.dasarDari(l.langkah)));
    cek(TIPE.every((t) => dasar.some((d) => d.tipe === t)), `${nama}: jenis tugas jumlah, simpan, tempat, genap ada`);
    cek(["satuan", "puluhan", "ratusan"].filter((t) => dasar.some((d) => d.tipe === "tempat" && d.tempat === t)).length >= 2, `${nama}: tugas tempat memakai sedikitnya dua tempat berbeda`);
    cek(dasar.some((d) => d.tipe === "genap" && d.b < d.bulat) && dasar.some((d) => d.tipe === "genap" && d.b > d.bulat) || nama !== "Abstract", `${nama}: pembulatan ke atas dan ke bawah (Abstract)`);
  }
  cek(new Set([...D.CONCRETE, ...D.PICTORIAL, ...D.ABSTRACT].flatMap((s) => s.langkah.map((l) => LC.dasarDari(l.langkah)).filter((d) => d.tipe === "genap").map((d) => (d.b < d.bulat ? "atas" : "bawah")))).size === 2, "tugas genap: dibulatkan ke atas dan ke bawah ada");
}

/* ------------------------------ Tugas dihitung dari data ------------------------------ */
{
  const nama = (k) => (k ? (k.jenis === "nama" ? k.nama : k.n) : null);
  // Jawaban benar tiap jenis tugas dihitung dari data (contoh: 267 + 185 = 452).
  const J = { tipe: "jumlah", benda: "x", a: 267, b: 185 };
  const Sm = { tipe: "simpan", benda: "x", a: 267, b: 185 };
  sama(["klik", "kanvas", "suara"].map((c) => nama(LC.kunciJawab(J, c))), [452, 4, 452], "kunci jumlah: jumlah, angka ratusan, jumlah");
  sama(["klik", "kanvas", "suara"].map((c) => nama(LC.kunciJawab(Sm, c))), ["tulis 2, simpan 1", 15, 2], "kunci simpan: tulisan, puluhan ditambah simpanan, angka satuan");
  const T1 = { tipe: "tempat", benda: "x", a: 462, b: 315, tempat: "ratusan" };
  sama(["klik", "kanvas"].map((c) => nama(LC.kunciJawab(T1, c))), [700, 7], "kunci tempat ratusan: hasil, jumlah angka");
  sama(["klik", "kanvas", "suara"].map((c) => nama(LC.kunciJawab({ tipe: "tempat", benda: "x", a: 371, b: 262, tempat: "puluhan" }, c))), [130, 13, "puluhan"], "kunci tempat puluhan: hasil, jumlah angka, tempat yang menyimpan");
  const G1 = { tipe: "genap", benda: "x", a: 437, b: 298, bulat: 300 };
  const G2 = { tipe: "genap", benda: "x", a: 254, b: 301, bulat: 300 };
  sama(["klik", "kanvas", "suara"].map((c) => nama(LC.kunciJawab(G1, c))), [735, 2, "dikurangi"], "kunci genap ke atas: jumlah, selisih, dikurangi");
  sama(["klik", "kanvas", "suara"].map((c) => nama(LC.kunciJawab(G2, c))), [555, 1, "ditambah"], "kunci genap ke bawah: jumlah, selisih, ditambah");
  sama([LC.tanpaSimpan(358, 164), LC.tanpaSimpan(469, 273), LC.tanpaSimpan(133, 524), LC.banyakSimpan(267, 185), LC.banyakSimpan(133, 524), LC.bulatRatusan(298), LC.tulisSimpan(267, 185)], [412, 632, 657, 2, 0, 300, "tulis 2, simpan 1"], "pembantu data");
  cek(LC.tempatSimpan(371, 262) === "puluhan" && LC.tempatSimpan(435, 317) === "satuan" && LC.tempatSimpan(133, 524) === null, "tempat yang menyimpan");
  // Pengecoh dan pilihan.
  sama(LC.pengecoh(J, "klik").slice(0, 2), [342, 462], "pengecoh jumlah: tanpa simpanan dan tambah sepuluh");
  cek(LC.pengecoh(G1, "klik").slice(0, 2).join() === "737,739" && !LC.pengecoh(G1, "klik").includes(735), "pengecoh genap: lupa menyesuaikan dan arah terbalik");
  cek(LC.pengecoh({ tipe: "simpan", benda: "x", a: 137, b: 456 }, "kanvas").every((x) => x >= 1 && x <= 9 && x !== 9), "pengecoh simpan kanvas: satu angka dan bukan jawaban");
  const ps = LC.pilihanKlik(Sm);
  cek(ps.length === 3 && new Set(ps).size === 3 && ps.includes("tulis 2, simpan 1") && ps[0] !== "tulis 2, simpan 1" && ps.includes("tulis 12, simpan 0"), `pilihan klik simpan: tiga tulisan unik, benar bukan yang pertama (${ps.join("/")})`);
  sama(LC.pilihanSuara({ tipe: "tempat", benda: "x", a: 371, b: 262, tempat: "puluhan" }, "suara").slice().sort(), ["puluhan", "ratusan", "satuan"], "pilihan suara tempat: tiga nama");
  cek(LC.pilihanSuara(G1, "suara").join() === "ditambah,dikurangi" && LC.pilihanSuara(G2, "suara").join() === "dikurangi,ditambah", "pilihan suara genap: dua kata, benar bukan yang pertama");

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
          if (s.cara === "klik") cek(kunci.n >= 10 && kunci.n <= 999, `${tag}: jawaban klik bilangan sampai sembilan ratus sembilan puluh sembilan`);
          if (s.cara === "suara") cek(kunci.n >= 1 && kunci.n <= 999, `${tag}: jawaban suara bilangan`);
        }
        if (kunci?.jenis === "nama") cek(s.cara !== "kanvas", `${tag}: jawaban nama bukan pada kanvas`);
        // Pilihan klik: tiga pilihan unik, jawaban benar tidak di tombol pertama.
        if (s.cara === "klik" && kunci !== null) {
          const pil = LC.pilihanKlik(l);
          const benar = LC.teksKunciKlik(l);
          cek(pil.length === 3 && new Set(pil).size === 3 && pil.includes(benar) && pil[0] !== benar, `${tag}: pilihan klik unik dan jawaban benar bukan yang pertama (${pil.join("/")})`);
          if (kunci.jenis === "angka") cek(pil.every((p) => /^\d{1,3}$/.test(p) && Number(p) >= 1) && benar === String(kunci.n), `${tag}: pilihan bilangan (${pil.join("/")})`);
        }
        if (s.cara === "suara" && kunci !== null) {
          const pil = LC.pilihanSuara(l, "suara");
          const benar = LC.teksKunciPilihan(kunci);
          cek(pil.includes(benar) && pil.length === (kunci.jenis === "nama" ? (kunci.nama === "ditambah" || kunci.nama === "dikurangi" ? 2 : 3) : 3) && new Set(pil).size === pil.length && tanpaDigit(pil.join(" ")), `${tag}: pilihan cadangan suara memuat jawaban benar (${pil.join("/")})`);
          cek(pil[0] !== benar, `${tag}: jawaban suara bukan pilihan pertama`);
          cek(K.cocokUcapan(benar, kunci).cocok, `${tag}: ucapan jawaban benar dikenali (${benar})`);
          for (const lain of pil.filter((p) => p !== benar)) cek(!K.cocokUcapan(lain, kunci).cocok, `${tag}: ucapan ${lain} bukan jawaban benar`);
        }
        if (kunci) cek(LC.kalimatKunci(l, s.cara).length > 12 && tanpaDigit(LC.kalimatKunci(l, s.cara)), `${tag}: kalimat penjelasan ada, tanpa digit`);
        cek(LC.petunjukSalah(l, s.cara, "x").length > 20, `${tag}: petunjuk salah ada`);
        // Petunjuk tidak membocorkan jawaban bilangan (dalam kata) pada klik dan suara.
        if (kunci?.jenis === "angka" && kunci.n >= 100 && s.cara !== "kanvas") cek(!LC.petunjukSalah(l, s.cara, "x").includes(LC.kataBil(kunci.n)), `${tag}: petunjuk tidak membocorkan jawaban`);
        if (rupa === "lambang") {
          const baris = LC.barisKartu(d, s.cara);
          const kolom = LC.kolomTeks(d);
          cek(Array.isArray(baris) && baris.length >= 1 && baris.every((b) => typeof b === "string" && b.length > 3), `${tag}: kartu kata ada`);
          cek(baris.every((b) => !adaEmoji(b)) && kolom.length === 3 && kolom[0].trim() === String(d.a) && kolom[1].replace("+", "").trim() === String(d.b), `${tag}: kartu lambang tanpa emoji dan bilangan bersusun rata kanan`);
        }
      }
    cek(new Set(kanvasAngka).size === kanvasAngka.length && kanvasAngka.length === 4, `${namaT}: empat angka jawaban Tulis di kanvas tidak kembar (${kanvasAngka.join(", ")})`);
  }
  const kv = (nama) => TAHAP[nama][1].filter((s) => s.cara === "kanvas").flatMap((s) => s.langkah.map((l) => LC.kunciJawab(l.langkah, "kanvas").n));
  sama(kv("Concrete"), [7, 8, 6, 3], "angka kanvas Concrete");
  sama(kv("Pictorial"), [5, 9, 7, 3], "angka kanvas Pictorial");
  sama(kv("Abstract"), [4, 7, 5, 1], "angka kanvas Abstract");
  const sv = (nama) => TAHAP[nama][1][2].langkah.map((l) => LC.kunciJawab(l.langkah, "suara")).map((k) => (k.jenis === "nama" ? k.nama : k.n));
  sama(sv("Concrete"), [882, 3, "puluhan", "ditambah"], "jawaban suara Concrete");
  sama(sv("Pictorial"), [822, 5, "satuan", "dikurangi"], "jawaban suara Pictorial");
  sama(sv("Abstract"), [745, 6, "puluhan", "ditambah"], "jawaban suara Abstract");
  // Tugas suara bervariasi: kata dan bilangan.
  const suaraJenis = Object.values(TAHAP).flatMap(([, soal]) => soal[2].langkah.map((l) => LC.kunciJawab(l.langkah, "suara").jenis));
  cek(suaraJenis.includes("nama") && suaraJenis.includes("angka"), "tugas suara: kata dan bilangan");
  // Poin penting dan penutup.
  cek(D.POIN_PENTING.length >= 6 && D.POIN_PENTING.every((p) => p.length > 20 && bersih(p)) && D.POIN_PENTING_SUARA.every((p) => tanpaDigit(p) && !/[=<>+−]/.test(p)), "poin penting: banyak, bersih, suara tanpa digit dan tanda");
  const poin = D.POIN_PENTING.join(" ").toLowerCase();
  for (const m of ["bersusun", "satuan", "simpan", "sepuluh", "tambah per tempat", "genapkan dulu", "bulat", "pembulatan"]) cek(poin.includes(m), `poin penting memuat ${m}`);
  cek(tanpaDigit(D.PENUTUP_E) && bersih(D.PENUTUP_E) && /Pak Usman/.test(D.PENUTUP_E) && /mengurangkan/.test(D.PENUTUP_E) && D.PENUTUP_E.endsWith("?"), "penutup E: jembatan ke Sub-Bab F tanpa digit");
  cek(Object.values(D.TEMA_RESEPSI).every((t) => emojiSah(t.ikon) && t.nama.length >= 7 && t.cara.length > 20 && tanpaDigit(t.cara) && bersih(t.cara)), "tema tiga tahap sah");
  cek(D.TEMA_RESEPSI.pictorial.cara.includes("polos") && D.TEMA_RESEPSI.abstract.cara.includes("kartu"), "tema: Pictorial polos, Abstract kartu");
  cek(D.CONCRETE_RESEPSI === D.CONCRETE && D.PICTORIAL_RESEPSI === D.PICTORIAL && D.ABSTRACT_RESEPSI === D.ABSTRACT && D.MISI_RESEPSI_TEKS === DS.MISI_RESEPSI_TEKS, "nama ekspor untuk pemasang");
}

/* ------------------------------ Berkas ------------------------------ */
{
  const berkas = readdirSync(folderUrl).filter((f) => /\.(ts|tsx)$/.test(f));
  for (const nama of ["logika.ts", "data-sim.ts", "logika-cpa.ts", "data.ts", "periksa.ts", "balok.ts", "JawabResepsi.tsx", "LangkahResepsi.tsx", "GambarResepsi.tsx", "TahapResepsi.tsx", "SimulasiMejaResepsi.tsx", "MejaResepsi.tsx", "DaftarResepsi.tsx"]) cek(berkas.includes(nama), `berkas ${nama} ada`);
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folderUrl), "utf8");
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d || c.codePointAt(0) === 0x1f6de), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}/i.test(s), `${f}: kode emoji tidak melewati U+1FA95`);
    cek(!/buku|kelompok|bernilai|tebak/i.test(s), `${f}: tanpa kata buku, kelompok, bernilai, tebak`);
    if (/^(logika|logika-cpa|periksa|data|data-sim|balok)\.ts$/.test(f)) cek(!/from "react"|fetch\(/.test(s), `${f}: tanpa React dan jaringan`);
    cek(!/papan-k3b5a|tabel-k3b5b|bilah-k3b4a|sudut-k3b4b|lintasan-k3b4c|tiket-k4b1a|handuk-k4b1b|dermaga-k4b1c|kelapa-k4b1d|sisa-k4b1f|perahu-k4b1g|jatah-k4b1h|jadwal-k4b1i|SubBabK4B1|data-k4b1|naskah-k4b1/.test(s), `${f}: tidak memakai folder bab atau sub-bab lain, atau berkas lama Bab 1`);
  }
  // Teks layar tidak memuat kata terlarang.
  const layar = ["LangkahResepsi.tsx", "TahapResepsi.tsx", "SimulasiMejaResepsi.tsx", "GambarResepsi.tsx"].map((f) => readFileSync(new URL(f, folderUrl), "utf8")).join("\n");
  const teksLayar = [...layar.matchAll(/>\s*([^<>{}\n]{4,})\s*</g)].map((m) => m[1]).join(" ");
  cek(!/\b(skor|nilai|soal|tebak|kunci|latihan|teman|kelompok|buku|kelas)\b/i.test(teksLayar), "teks layar komponen tanpa kata terlarang");
  cek(/\bTugas\b/.test(layar) && !/>\s*Soal/.test(layar), "teks layar CPA memakai Tugas");
  cek(!/capitalize/.test(layar), "teks layar: tanpa kelas capitalize");
  const th = readFileSync(new URL("TahapResepsi.tsx", folderUrl), "utf8");
  cek(/umum: Umum;\s*rupa: Rupa;\s*soal: SoalMisi\[\];\s*pita:/.test(th) && /teksAkhir: string/.test(th) && /poinPenting\?: boolean/.test(th), "TahapResepsi: props umum, rupa, soal, pita, teksAkhir, poinPenting");
  cek(/IKON_METODE\[ls\.metode\]/.test(th) && /rupa === "benda" \?/.test(th), "TahapResepsi: ikon metode hanya pada rupa benda (Pictorial dan Abstract tanpa emoji metode)");
  cek(/export default function TahapResepsi/.test(th) && /Cari kesalahan/.test(th) && /POIN_PENTING/.test(th) && /PENUTUP_E/.test(th), "TahapResepsi: ekspor, Cari kesalahan, Poin Penting, jembatan");
  cek(/"meja"/.test(th) && /"petak"/.test(th) && /"lembar"/.test(th) && !/"etalase"|"kapur"|"catatan"|"bambu"|"denah"|"tikar"|"tirai"|"jepit"|"bungkus"/.test(th), "TahapResepsi: pola visual meja resepsi, kertas petak, lembar tamu (berbeda dari bab sebelumnya)");
  cek(/RESEPSI/.test(th) && /KoperKecil/.test(th), "TahapResepsi: kemajuan deret koper, deret petak, deret cap");
  const lg = readFileSync(new URL("LangkahResepsi.tsx", folderUrl), "utf8");
  cek(/export function LangkahResepsi/.test(lg) && /JawabSuaraResepsi/.test(lg) && /JawabTulis/.test(lg) && /pilihanSuara\(l, cara\)/.test(lg) && /TampilDasar/.test(lg), "LangkahResepsi: ekspor, jawab suara dengan pilihan ketuk, jawab tulis di kanvas");
  cek(/ucapkan\(/.test(lg), "LangkahResepsi: ucapan memakai kata, bukan digit");
  const jw = readFileSync(new URL("JawabResepsi.tsx", folderUrl), "utf8");
  cek(/gagalSekali/.test(jw) && /Ini jawaban yang benar|jawaban yang benar/.test(jw) && /PilihanKata/.test(jw) && /setCadangan\(true\)/.test(jw) && /e\.error === "not-allowed"/.test(jw), "JawabResepsi: galat mikrofon dihitung gagal, pilihan ketuk sebagai cadangan, jawaban benar setelah tiga kali salah");
  const gm = readFileSync(new URL("GambarResepsi.tsx", folderUrl), "utf8");
  cek(/export function BarisBalok/.test(gm) && /susunBalok/.test(gm) && /export function TampilDasar/.test(gm) && /rupa === "lambang"/.test(gm) && /EMOJI_BENDA/.test(gm) && /PanelBalok/.test(gm) && /KartuKata/.test(gm), "GambarResepsi: balok cacah, benda beremoji, bagan tempat angka polos, tampilan dasar, kartu untuk Abstract");
  cek(/data-balok="ratusan"/.test(gm) && /data-balok="puluhan"/.test(gm) && /data-balok="satuan"/.test(gm), "GambarResepsi: balok bertanda jenisnya");
  const sim = readFileSync(new URL("SimulasiMejaResepsi.tsx", folderUrl), "utf8");
  cek(/export default function SimulasiMejaResepsi/.test(sim) && /onKeadaan/.test(sim) && /MISI_RESEPSI_TEKS/.test(sim), "SimulasiMejaResepsi: ekspor, onKeadaan, teks misi");
  for (const [f, nm] of [["MejaResepsi.tsx", "MejaResepsiK4B1"], ["DaftarResepsi.tsx", "DaftarResepsiK4B1"]]) {
    const s = readFileSync(new URL(f, folderUrl), "utf8");
    cek(/speakGuru/.test(s) && /onLanjut/.test(s) && /teksLanjut/.test(s) && !/peta-kartu|PetaKartu|InfografisKartu/.test(s) && new RegExp(`export default function ${nm}`).test(s) && new RegExp(`export \\{ ${nm} \\}`).test(s), `${f}: komponen sendiri (bukan pembungkus peta-kartu), ekspor ${nm}`);
  }
  // Berkas bersama: Simulasi memasang Meja Resepsi.
  const sk = readFileSync(new URL("../src/components/modul/SimulasiK4Bab1.tsx", import.meta.url), "utf8");
  cek(/SimulasiMejaResepsi/.test(sk) && /laporMisiResepsi\(daftarMisiResepsi\("E"\), k, a\.capai\)/.test(sk) && !/judulBab=\{`Kelas/.test(sk), "SimulasiK4Bab1: langkahMejaResepsiE memasang Meja Resepsi, judul bab tanpa kata Kelas");
  // Berkas lama yang dipertahankan ada (dipakai bab lain dan bank soal).
  for (const f of ["data-k4b1.ts", "naskah-k4b1.ts", "eja-k4b1.ts"]) cek(readdirSync(new URL("../src/components/modul/", import.meta.url)).includes(f), `berkas lama ${f} dipertahankan`);
  const ej = readFileSync(new URL("../src/lib/ejaan-inggris-id.ts", import.meta.url), "utf8");
  cek(/column add/i.test(ej) && /place add/i.test(ej) && /round and adjust/i.test(ej), "ejaan: tiga nama metode global ada");
}

console.log(`Lulus ${lulus}, gagal ${gagal}`);
process.exit(gagal ? 1 : 0);
