// Uji Mind-map (Papan Jepit, label kosong), Infografis (dua kartu), Simulasi Susun Hitung, dan tahap Concrete, Pictorial, Abstract Kelas 5 Bab 1 Sub-Bab D ("Hitungan Penonton Pak Darmo"),
// akhir cerita Hari Pertandingan di Stadion Kota (jumlah dan kurang bersusun, kali dengan memisah pengali, bagi per kolom, cek dengan operasi kebalikan; sesuai Buku Siswa V hlm. 18-23, tanpa pembulatan).
// Memeriksa: jumlah dan kurang bersusun (dihitung ulang dengan cara berbeda), pinjaman bergulir melewati nol, kali pisah dan bersusun, bagi per kolom, cek kebalikan,
// logika simulasi (Jumlah dengan alat menolak angka sepuluh, Kurang dengan alat menolak kurangkan tanpa pinjam, Kali dengan alat menolak Periksa sebelum dipisah, Bagi per kolom), misi,
// Mind-map dan Infografis label kosong (data bersambung: 24.350, 18.705, 9.060, 30.402, jumlah 82.517, kursi 90.000, kosong 7.483, 12 x 5.000 = 60.000, 64.000 : 4 = 16.000),
// CPA dua belas langkah per tahap dengan jawaban benar dihitung dari data, angka kanvas tidak kembar, pengenal ucapan, petunjuk salah tanpa bocoran, batas rupa, emoji, kata terlarang, akhir baris.
// Jalankan: node --no-warnings scripts/uji-hitung-k5b1d.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const LD = await import("../src/components/modul/hitung-k5b1d/logika-data.ts");
const L = await import("../src/components/modul/hitung-k5b1d/logika.ts");
const DS = await import("../src/components/modul/hitung-k5b1d/data-sim.ts");
const DP = await import("../src/components/modul/hitung-k5b1d/data-peta.ts");
const DI = await import("../src/components/modul/hitung-k5b1d/data-info.ts");
const LC = await import("../src/components/modul/hitung-k5b1d/logika-cpa.ts");
const D = await import("../src/components/modul/hitung-k5b1d/data.ts");
const K = await import("../src/components/modul/hitung-k5b1d/periksa.ts");
const S = await import("../src/components/modul/misi-simulasi.ts");
const MK = await import("../src/components/modul/misi-k5bab1.ts");
const MT = await import("../src/components/modul/misi-teks-k5b1.ts");
const EJA = await import("../src/components/modul/eja-k5b1.ts");
const folderUrl = new URL("../src/components/modul/hitung-k5b1d/", import.meta.url);

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
const TERLARANG = /(nilai|kelas|buku|teman|kelompok|skor|soal|tebak|kunci|latihan|senilai|ditemani)/i;
const bersih = (t) => !TERLARANG.test(t);
const tanpaDigit = (t) => !/\d/.test(t);
const emojiSah = (s) => [...s].every((c) => c.codePointAt(0) <= 0x1fa95 && c.codePointAt(0) !== 0x200d && c.codePointAt(0) !== 0x1f6de && c.codePointAt(0) !== 0x1fa74);
const adaEmoji = (s) => /\p{Extended_Pictographic}/u.test(s);
const acak = (() => {
  let x = 12345;
  return (maks) => {
    x = (x * 1103515245 + 12345) % 2147483648;
    return x % maks;
  };
})();

/* ------------------------------ Angka dan kolom ------------------------------ */
{
  sama(LD.fmt(24350), "24.350", "titik ribuan");
  sama(LD.fmt(9060), "9.060", "titik ribuan empat angka");
  for (const n of [0, 7, 90, 305, 9060, 24350, 30402, 82517, 99999]) for (let k = 0; k < 5; k += 1) cek(LD.angkaKolom(n, k) === LD.angkaDariTeks(n, k), `angka kolom ${k} dari ${n}: sisa bagi sama dengan teks`);
  sama(LD.angkaSemua(24350), [0, 5, 3, 4, 2], "angka tiap kolom 24.350");
  sama(LD.NAMA_KOLOM, ["satuan", "puluhan", "ratusan", "ribuan", "puluh ribuan"], "nama lima kolom");
  cek(!("bulatkan" in LD) && !("perkiraan" in LD), "pembulatan dan perkiraan dihapus dari logika");
}

/* ------------------------------ Jumlah bersusun ------------------------------ */
{
  const s = LD.susunJumlah([24350, 18705, 9060, 30402]);
  sama(s.kolom.map((c) => c.jumlah), [7, 11, 15, 22, 8], "Story: jumlah tiap kolom (7, 11, 14+1, 21+1, 6+2)");
  sama(s.kolom.map((c) => c.tulis), [7, 1, 5, 2, 8], "Story: angka yang ditulis");
  sama(s.kolom.map((c) => c.simpan), [0, 1, 1, 2, 0], "Story: simpanan");
  sama(s.kolom.map((c) => c.angka.reduce((a, b) => a + b, 0)), [7, 11, 14, 21, 6], "Story: jumlah angka murni tiap kolom");
  cek(s.hasil === 82517 && s.sisa === 0 && 24350 + 18705 + 9060 + 30402 === 82517, "Story: jumlah empat tribun 82.517");
  for (let t = 0; t < 1500; t += 1) {
    const n = 2 + acak(3);
    const bil = Array.from({ length: n }, () => acak(Math.floor(99999 / n)));
    const total = bil.reduce((a, b) => a + b, 0);
    const r = LD.susunJumlah(bil);
    cek(r.hasil === total && r.sisa === 0, `jumlah bersusun ${bil.join("+")} sama dengan ${total}`);
    cek(r.kolom.every((c) => c.tulis >= 0 && c.tulis <= 9 && c.tulis + c.simpan * 10 === c.jumlah), `jumlah bersusun ${bil.join("+")}: tulis satu angka, simpan sisanya`);
  }
  sama(LD.jumlahTanpaSimpan([36480, 27570]), 53950, "salah umum: lupa semua simpanan menjadi 53.950");
  cek(LD.susunJumlah([36480, 27570]).hasil === 64050 && LD.kolomSimpanPertama([36480, 27570]) === 1, "36.480 + 27.570 sama dengan 64.050, simpanan pertama di puluhan");
}

/* ------------------------------ Kurang bersusun ------------------------------ */
{
  const s = LD.susunKurang(90000, 82517);
  sama(s.kolom.map((c) => c.tulis), [3, 8, 4, 7, 0], "Story: angka hasil 90.000 - 82.517");
  sama(s.kolom.map((c) => c.atasSetelah), [10, 9, 9, 9, 8], "Story: pinjaman bergulir, tiga kolom tengah menjadi sembilan");
  const p = s.kolom[0].pinjam;
  cek(p && p.sumber === 4 && p.ubahan.length === 4 && s.kolom.slice(1).every((c) => c.pinjam === null) && s.hasil === 7483, "Story: satu pinjaman dari puluh ribuan melewati tiga kolom nol, hasil 7.483");
  sama(LD.susunKurang(40000, 20300).kolom.map((c) => c.atasSetelah), [0, 0, 10, 9, 3], "Metode global: 40.000 - 20.300");
  cek(LD.susunKurang(40000, 20300).hasil === 19700 && LD.susunKurang(50000, 12345).hasil === 37655, "hasil 19.700 dan 37.655");
  let adaGulir = 0;
  for (let t = 0; t < 2500; t += 1) {
    const a = acak(100000);
    const b = acak(a + 1);
    const r = LD.susunKurang(a, b);
    cek(r.hasil === a - b && r.kolom.every((c) => c.tulis >= 0 && c.tulis <= 9), `kurang bersusun ${a} - ${b} sama dengan ${a - b}`);
    for (const c of r.kolom) {
      if (!c.pinjam) continue;
      cek(c.pinjam.sumber > c.k && c.pinjam.ubahan[0].kolom === c.pinjam.sumber && c.atasSetelah === c.atas + 10, `pinjaman ${a} - ${b} kolom ${c.k}: sumber di kiri dan atas bertambah sepuluh`);
      cek(c.pinjam.ubahan.slice(1).every((u) => u.jadi === 9 && u.kolom > c.k && u.kolom < c.pinjam.sumber), `pinjaman ${a} - ${b} kolom ${c.k}: kolom nol yang dilewati menjadi sembilan`);
      if (c.pinjam.sumber - c.k > 1) adaGulir += 1;
    }
  }
  cek(adaGulir > 100, `banyak pinjaman bergulir yang diuji (${adaGulir})`);
  let galat = false;
  try {
    LD.susunKurang(100, 200);
  } catch {
    galat = true;
  }
  cek(galat, "kurang bersusun menolak bilangan atas yang lebih kecil");
  sama(LD.kurangBesarKecil(50000, 12345), 42345, "salah umum: besar dikurangi kecil");
}

/* ------------------------------ Kali dan bagi ------------------------------ */
{
  sama([LD.pisahPengali(12), LD.pisahPengali(14), LD.pisahPengali(20), LD.pisahPengali(7)], [[10, 2], [10, 4], [20], [7]], "pisah pengali menurut kolom");
  const kp = LD.kaliPisah(5000, 12);
  sama(kp.bagian, [{ pengali: 10, hasil: 50000 }, { pengali: 2, hasil: 10000 }], "Story: 12 x 5.000 dipisah menjadi 10 x 5.000 dan 2 x 5.000");
  cek(kp.total === 60000 && 12 * 5000 === 60000, "Story: 12 x 5.000 = 60.000");
  const kb = LD.kaliBersusun(5000, 12);
  sama(kb.baris.map((b) => [b.angka, b.geser, b.hasil]), [[2, 0, 10000], [1, 1, 50000]], "Story: kali bersusun dua baris, baris puluhan bergeser");
  cek(kb.total === 60000, "Story: kali bersusun 60.000");
  sama(LD.kaliHilangNol(5000, 12), 6000, "salah Fajar: 12 x 5.000 menjadi 6.000");
  for (let t = 0; t < 2000; t += 1) {
    const m = 2 + acak(98);
    const a = acak(Math.floor(99999 / m)) + 1;
    cek(LD.kaliPisah(a, m).total === a * m && LD.kaliBersusun(a, m).total === a * m, `kali ${a} x ${m} dua cara sama dengan ${a * m}`);
    const d = 1 + acak(9);
    const ks = LD.kaliSatuAngka(Math.floor(99999 / d) > a ? a : 0, d);
    cek(ks.kolom.every((c) => c.tulis >= 0 && c.tulis <= 9 && c.angka * d + c.masuk === c.tulis + c.simpan * 10), `kali satu angka ${a} x ${d}: tulis dan simpan`);
  }
  const bg = LD.bagiKolom(64000, 4);
  sama(bg.langkah.map((l) => [l.angka, l.q, l.sisa]), [[6, 1, 2], [24, 6, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]], "Story: 64.000 : 4 per kolom (6 : 4 = 1 sisa 2, 24 : 4 = 6)");
  cek(bg.hasil === 16000 && bg.sisa === 0, "Story: 64.000 : 4 = 16.000");
  const bg2 = LD.bagiKolom(84000, 6);
  cek(bg2.hasil === 14000 && bg2.sisa === 0, "Metode global: 84.000 : 6 = 14.000");
  for (let t = 0; t < 2500; t += 1) {
    const d = 2 + acak(8);
    const a = acak(100000);
    const r = LD.bagiKolom(a, d);
    cek(r.hasil === Math.floor(a / d) && r.sisa === a % d && r.langkah.every((l) => l.q >= 0 && l.q <= 9 && l.sisa >= 0 && l.sisa < d && l.angka === l.q * d + l.sisa), `bagi ${a} : ${d}`);
  }
  for (const op of ["jumlah", "kurang", "kali", "bagi"]) {
    for (let t = 0; t < 400; t += 1) {
      const b = 2 + acak(30);
      const a = op === "bagi" ? b * (1 + acak(3000)) : 5 + acak(20000);
      const x = LD.balikCek(op, a, b);
      const benarHasil = { jumlah: a + b, kurang: a - b, kali: a * b, bagi: a / b }[op];
      cek(x.hasil === benarHasil && x.kembali === (op === "jumlah" || op === "kurang" ? a : op === "kali" ? a : a), `cek ${op} ${a} dan ${b} kembali ke ${a}`);
      cek(LD.lolosCek(op, a, b, benarHasil) && !LD.lolosCek(op, a, b, benarHasil + 1000), `lolos cek ${op} ${a} ${b}`);
    }
  }
  sama(LD.KATA_KEBALIKAN, { jumlah: "kurang", kurang: "tambah", kali: "bagi", bagi: "kali" }, "kata operasi kebalikan");
  cek(LD.balikCek("bagi", 64000, 4).kembali === 64000 && LD.balikCek("kurang", 90000, 82517).kembali === 90000, "cek 16.000 x 4 = 64.000 dan 7.483 + 82.517 = 90.000");
  const t3 = LD.susun3("b", ["a", "c"], 1);
  const t4 = LD.susun3("b", ["a", "c"], 2);
  sama([t3, t4], [["a", "b", "c"], ["a", "c", "b"]], "tiga pilihan: jawaban benar tidak pernah pertama");
  sama(LD.duaPengecoh(100, [100, 200, 200, 300, -5]), [200, 300], "dua pengecoh berbeda dari jawaban dan dari satu sama lain");
}

/* ------------------------------ Simulasi ------------------------------ */
{
  const a = L.awalHitung();
  cek(a.alat === "hitung" && a.mode === "jumlah" && a.salah === 0 && a.jumlahBenar.length === 0 && a.kurangBenar.length === 0 && a.kaliBenar.length === 0 && a.bagiBenar.length === 0, "awal: alat hitung, mode Jumlah, belum ada yang benar");
  sama(S.misiBaru(MK.MISI_D, a, new Set()), [], "awal: keadaan awal tidak memenuhi misi");
  cek(L.pilihModeHitung(a, "kali").mode === "kali" && L.mulaiLagiHitung().mode === "jumlah", "pilih mode dan mulai lagi");
  cek(DS.JUMLAH_SIM.length === 4 && DS.KURANG_SIM.length === 4 && DS.KALI_SIM.length === 4 && DS.BAGI_SIM.length === 4, "empat sasaran tiap alat");
  const dilarang = new Set([24350, 18705, 9060, 30402, 82517, 7483, 5000, 64000, 84000, 4]);
  for (const t of [...DS.JUMLAH_SIM, ...DS.KURANG_SIM, ...DS.KALI_SIM, ...DS.BAGI_SIM]) cek(!dilarang.has(t.a) && (t.b > 20 ? !dilarang.has(t.b) : true), `data simulasi ${t.a} dan ${t.b} berbeda dari Story`);
  for (const t of DS.JUMLAH_SIM) cek(LD.susunJumlah([t.a, t.b]).hasil <= 99999 && LD.susunJumlah([t.a, t.b]).sisa === 0 && String(t.a).length === 5 && String(t.b).length === 5, `jumlah simulasi ${t.a} + ${t.b} muat lima kolom`);
  for (const t of DS.KURANG_SIM) cek(t.a > t.b && String(t.a).length === 5 && LD.susunKurang(t.a, t.b).kolom.some((c) => c.pinjam), `kurang simulasi ${t.a} - ${t.b}: ada pinjaman`);
  cek(DS.KURANG_SIM.some((t) => LD.susunKurang(t.a, t.b).kolom.some((c) => c.pinjam && c.pinjam.sumber - c.k > 1)), "kurang simulasi: ada pinjaman bergulir melewati nol");
  for (const t of DS.KALI_SIM) cek(t.b >= 11 && t.b <= 19 && t.a * t.b <= 99999 && t.a % 100 === 0, `kali simulasi ${t.a} x ${t.b}: pengali dua angka, hasil paling banyak 99.999`);
  for (const t of DS.BAGI_SIM) cek(t.a % t.b === 0 && t.b >= 2 && t.b <= 9 && LD.bagiKolom(t.a, t.b).sisa === 0, `bagi simulasi ${t.a} : ${t.b} habis dibagi`);
  cek(DS.BAGI_SIM.some((t) => LD.bagiKolom(t.a, t.b).langkah.some((l) => l.sisa > 0)), "bagi simulasi: ada sisa yang ditukar menjadi sepuluh");

  // Jumlah.
  const tj = L.targetJumlah(a);
  cek(tj.a === 27384 && tj.b === 35178 && L.susunTargetJumlah(a).hasil === 62562 && L.simpananMasuk(a) === 0, "jumlah: sasaran pertama 27.384 + 35.178 sama dengan 62.562");
  cek(!L.periksaKolomJumlah(a).ok && tanpaDigit(L.petunjukJumlah()) && L.periksaKolomJumlah(a).k.salah === 1, "jumlah: kolom salah, petunjuk tanpa digit dan tanpa hasil");
  let j = a;
  for (let n = 0; n < 9; n += 1) j = L.ubahTulis(j, 1).k;
  const tolakJ = L.ubahTulis(j, 1);
  cek(j.tulisJ === 9 && !j.tolakJumlah && !tolakJ.ok && tolakJ.k.tolakJumlah && tolakJ.k.tulisJ === 9 && L.ubahTulis(L.awalHitung(), -1).ok === false, "jumlah: alat menolak angka sepuluh, dan menolak turun di bawah nol");
  sama(S.misiBaru(MK.MISI_D, tolakJ.k, new Set()), [], "jumlah: penolakan angka sepuluh bukan misi");
  cek(L.ubahSimpan(a, -1) === a && L.ubahSimpan({ ...a, simpanJ: 9 }, 1).simpanJ === 9 && L.ubahSimpan(a, 1).simpanJ === 1, "jumlah: simpanan 0 sampai 9");
  let kj = a;
  const s1 = L.susunTargetJumlah(a);
  for (let kol = 0; kol < 5; kol += 1) {
    cek(kj.kolJ === kol && L.simpananMasuk(kj) === s1.kolom[kol].masuk, `jumlah: kolom ${kol} dan simpanan masuknya`);
    kj = { ...kj, tulisJ: s1.kolom[kol].tulis, simpanJ: s1.kolom[kol].simpan };
    const r = L.periksaKolomJumlah(kj);
    cek(r.ok && r.selesai === (kol === 4), `jumlah kolom ${kol}: benar${kol === 4 ? " dan selesai" : ""}`);
    kj = r.k;
  }
  cek(kj.jumlahBenar.join() === "0" && kj.jumlahKe === 1 && kj.kolJ === 0 && kj.tulisJ === 0 && kj.simpanJ === 0, "jumlah: setelah kolom terakhir sasaran berikutnya dimulai");
  sama(S.misiBaru(MK.MISI_D, kj, new Set()), ["d-jumlah"], "jumlah: misi d-jumlah");
  for (let i = 0; i < DS.JUMLAH_SIM.length; i += 1) {
    let x = { ...a, jumlahKe: i };
    const sx = L.susunTargetJumlah(x);
    for (let kol = 0; kol < 5; kol += 1) x = L.periksaKolomJumlah({ ...x, tulisJ: sx.kolom[kol].tulis, simpanJ: sx.kolom[kol].simpan }).k;
    cek(x.jumlahBenar.includes(i) && sx.hasil === DS.JUMLAH_SIM[i].a + DS.JUMLAH_SIM[i].b, `jumlah: sasaran ${i + 1} tercapai`);
  }

  // Kurang.
  const tr = L.targetKurang(a);
  cek(tr.a === 80000 && tr.b === 25600 && a.atasK.join() === "0,0,0,0,8" && L.bawahKurang(a) === 0 && !L.perluPinjam(a), "kurang: sasaran pertama 80.000 - 25.600, kolom satuan tidak perlu meminjam");
  const pinjamTak = L.pinjamKolom(a);
  cek(!pinjamTak.ok && pinjamTak.k.tolakPinjam && !pinjamTak.k.tolakKurang, "kurang: alat menolak meminjam yang tidak perlu");
  let kk = a;
  for (let n = 0; n < 2; n += 1) {
    const r = L.kurangkanKolom(kk);
    cek(r.ok && !r.selesai, `kurang: kolom ${n} dikurangkan`);
    kk = r.k;
  }
  cek(kk.kolK === 2 && L.perluPinjam(kk) && L.bawahKurang(kk) === 6, "kurang: kolom ratusan angka atas 0 lebih kecil dari 6");
  const tolakKur = L.kurangkanKolom(kk);
  cek(!tolakKur.ok && tolakKur.k.tolakKurang && tolakKur.k.hasilK.length === 2 && tolakKur.k.kolK === 2, "kurang: alat menolak mengurangkan sebelum meminjam");
  const pj = L.pinjamKolom(kk);
  cek(pj.ok && pj.sumber === 4 && pj.k.atasK.join() === "0,0,10,9,7", `kurang: pinjaman bergulir dari puluh ribuan (${pj.k.atasK.join()})`);
  kk = pj.k;
  for (let n = 2; n < 5; n += 1) {
    const r = L.kurangkanKolom(kk);
    cek(r.ok && r.selesai === (n === 4), `kurang: kolom ${n} dikurangkan`);
    kk = r.k;
  }
  cek(kk.kurangBenar.join() === "0" && kk.kurangKe === 1 && kk.kolK === 0 && kk.hasilK.length === 0 && kk.atasK.join() === LD.angkaSemua(63052).join(), "kurang: sasaran berikutnya dimulai dengan angka atas yang baru");
  sama(S.misiBaru(MK.MISI_D, kk, new Set()), ["d-kurang"], "kurang: misi d-kurang");
  for (let i = 0; i < DS.KURANG_SIM.length; i += 1) {
    let x = { ...a, kurangKe: i, kolK: 0, atasK: LD.angkaSemua(DS.KURANG_SIM[i].a), hasilK: [] };
    let langkah = 0;
    const tulis = [];
    while (!x.kurangBenar.includes(i) && langkah < 30) {
      langkah += 1;
      if (L.perluPinjam(x)) x = L.pinjamKolom(x).k;
      const kol = x.kolK;
      const r = L.kurangkanKolom(x);
      tulis.push(r.k.hasilK[kol] ?? LD.susunKurang(DS.KURANG_SIM[i].a, DS.KURANG_SIM[i].b).kolom[kol].tulis);
      x = r.k;
    }
    cek(x.kurangBenar.includes(i) && tulis.reduce((h, d, k) => h + d * 10 ** k, 0) === DS.KURANG_SIM[i].a - DS.KURANG_SIM[i].b, `kurang: sasaran ${i + 1} selesai lewat alat dan hasilnya benar`);
    cek(L.hasilBenarKurang({ ...a, kurangKe: i }) === DS.KURANG_SIM[i].a - DS.KURANG_SIM[i].b, `kurang: hasilBenarKurang sasaran ${i + 1}`);
  }

  // Kali.
  const tk = L.targetKali(a);
  cek(tk.a === 2400 && tk.b === 13 && L.hasilKaliSim(a) === 31200 && L.bagianKali(a).join() === "10,3", "kali: sasaran pertama 2.400 x 13, dipisah 10 dan 3, hasil 31.200");
  const pk = L.pilKali(a);
  cek(pk.length === 3 && new Set(pk).size === 3 && L.kunciKali(a) > 0 && pk[L.kunciKali(a)] === "31.200 rupiah", "kali: tiga pilihan berbeda, jawaban benar tidak pertama");
  const tolakK = L.periksaKali(a);
  cek(!tolakK.ok && tolakK.ditolak === true && tolakK.k.tolakKali && tolakK.k.salah === 0, "kali: alat menolak Periksa sebelum dipisah (bukan percobaan keliru)");
  sama(S.misiBaru(MK.MISI_D, tolakK.k, new Set()), ["d-tolak"], "kali: tantangan d-tolak dari penolakan Periksa sebelum dipisah");
  const dipisah = L.pisahkan(a);
  cek(dipisah.dipisah && dipisah.pilihKali === -1 && !L.pisahkan(dipisah).dipisah, "kali: Pisah memisah dan Pisah lagi mengembalikan");
  cek(/Belum ada pilihan/.test(L.petunjukKali(dipisah)) && !L.periksaKali(dipisah).ok && L.periksaKali(dipisah).k.salah === 1, "kali: sudah dipisah tanpa pilihan tidak benar");
  const salahK = L.pilihKali(dipisah, L.kunciKali(a) === 1 ? 2 : 1);
  cek(!L.periksaKali(salahK).ok && /belum cocok/.test(L.petunjukKali(salahK)) && tanpaDigit(L.petunjukKali(salahK)), "kali: pilihan salah, petunjuk mengarahkan tanpa digit");
  const kOk = L.periksaKali(L.pilihKali(dipisah, L.kunciKali(a)));
  cek(kOk.ok && kOk.k.kaliBenar.join() === "0" && kOk.k.kaliKe === 1 && !kOk.k.dipisah && kOk.k.pilihKali === -1 && L.pilihKali(a, 5) === a, "kali: pilihan benar membuka sasaran berikutnya, pilihan di luar tiga diabaikan");
  sama(S.misiBaru(MK.MISI_D, kOk.k, new Set()), ["d-kali"], "kali: misi d-kali");
  for (let i = 0; i < DS.KALI_SIM.length; i += 1) {
    const ki = { ...a, kaliKe: i, dipisah: true };
    cek(L.periksaKali(L.pilihKali(ki, L.kunciKali(ki))).ok && L.kunciKali(ki) > 0 && L.hasilKaliSim(ki) === DS.KALI_SIM[i].a * DS.KALI_SIM[i].b, `kali: sasaran ${i + 1} tercapai dan jawaban tidak pertama`);
  }

  // Bagi.
  const tb = L.targetBagi(a);
  cek(tb.a === 45000 && tb.b === 5 && L.angkaDibawa(a) === 4 && L.langkahBagi(a).hasil === 9000, "bagi: sasaran pertama 45.000 : 5 = 9.000, kolom pertama membawa 4");
  let bj = a;
  for (let n = 0; n < 9; n += 1) bj = L.ubahTulisBagi(bj, 1).k;
  const tolakB = L.ubahTulisBagi(bj, 1);
  cek(bj.tulisB === 9 && !tolakB.ok && tolakB.k.tolakBagi && L.ubahTulisBagi(a, -1).ok === false, "bagi: alat menolak angka sepuluh pada satu kolom hasil dan turun di bawah nol");
  sama(S.misiBaru(MK.MISI_D, tolakB.k, new Set()), [], "bagi: penolakan angka sepuluh bukan misi");
  cek(!L.periksaKolomBagi({ ...a, tulisB: 3 }).ok && tanpaDigit(L.petunjukBagi()) && L.periksaKolomBagi({ ...a, tulisB: 3 }).k.salah === 1, "bagi: kolom salah, petunjuk tanpa digit");
  for (let i = 0; i < DS.BAGI_SIM.length; i += 1) {
    let x = { ...a, bagiKe: i };
    const lb = L.langkahBagi(x);
    const tulis = [];
    for (let n = 0; n < 5; n += 1) {
      cek(x.langkahB === n && L.angkaDibawa(x) === lb.langkah[n].angka, `bagi sasaran ${i + 1}: langkah ${n} membawa ${lb.langkah[n].angka}`);
      const r = L.periksaKolomBagi({ ...x, tulisB: lb.langkah[n].q });
      cek(r.ok && r.selesai === (n === 4), `bagi sasaran ${i + 1}: kolom ${n} benar${n === 4 ? " dan selesai" : ""}`);
      tulis.push(lb.langkah[n].q);
      x = r.k;
    }
    cek(x.bagiBenar.includes(i) && x.bagiKe === i + 1 && x.langkahB === 0 && x.hasilB.length === 0 && Number(tulis.join("")) === DS.BAGI_SIM[i].a / DS.BAGI_SIM[i].b, `bagi: sasaran ${i + 1} tercapai, hasil dari angka kolom sama dengan hasil bagi`);
  }
  sama(S.misiBaru(MK.MISI_D, { ...a, bagiBenar: [0] }, new Set()), ["d-bagi"], "bagi: misi d-bagi");

  // Kalimat dan pesan.
  for (const m of ["jumlah", "kurang", "kali", "bagi"]) {
    const kal = { jumlah: L.kalimatJumlah, kurang: L.kalimatKurang, kali: L.kalimatKali, bagi: L.kalimatBagi }[m](a);
    cek(kal.length > 10 && bersih(kal), `kalimat ${m} ada dan bersih`);
  }
  for (const p of [L.petunjukKali(a), L.petunjukJumlah(), L.petunjukBagi(), L.petunjukKali(L.pilihKali(a, 0))]) cek(bersih(p) && tanpaDigit(p), `petunjuk bersih dan tanpa digit: ${p}`);

  // Misi: semua id, struktur, teks sama.
  sama(MK.MISI_D.map((m) => m.id), ["d-jumlah", "d-kurang", "d-kali", "d-bagi", "d-tolak", "d-dua"], "misi D: enam id");
  cek(MK.MISI_D.filter((m) => m.wajib).length === 4 && MK.MISI_D.filter((m) => !m.wajib).length === 2 && new Set(MK.MISI_D.map((m) => m.id)).size === 6, "misi D: empat wajib, dua tantangan bebas, id unik");
  cek(MK.MISI_D.every((m) => m.teks.length > 10 && m.teks.length < 120 && bersih(m.teks) && /^d-/.test(m.id)), "misi D: teks ringkas, bersih, id berawalan d-");
  cek(MK.daftarMisiK5Bab1("D") === MK.MISI_D, "daftarMisiK5Bab1 D");
  cek(MT.MISI_K5B1.D === DS.MISI_HITUNG_TEKS && MT.MISI_K5B1.D === D.MISI_HITUNG_TEKS && bersih(DS.MISI_HITUNG_TEKS), "teks misi sama di misi-teks-k5b1.ts dan data-sim.ts");
  const semua = S.misiBaru(MK.MISI_D, { ...a, jumlahBenar: [0, 1], kurangBenar: [0, 1], kaliBenar: [0], bagiBenar: [0], tolakKali: true }, new Set());
  sama(semua, ["d-jumlah", "d-kurang", "d-kali", "d-bagi", "d-tolak", "d-dua"], "misi D: semua tercapai dari keadaan lengkap");
  sama(S.misiBaru(MK.MISI_D, { ...a, tolakKurang: true, tolakPinjam: true, tolakBagi: true }, new Set()), [], "misi D: penolakan lain bukan tantangan tolak");
}

/* ------------------------------ Mind-map dan Infografis (label kosong) ------------------------------ */
{
  cek(DP.LANGKAH_HITUNG.length >= 4 && DP.LANGKAH_HITUNG.length <= 6, `Mind-map: jumlah label sesuai isi (${DP.LANGKAH_HITUNG.length})`);
  sama(DP.LANGKAH_HITUNG.map((l) => l.gambar), ["simpan", "pinjam", "pisah", "bagi", "balik"], "Mind-map: lima gambar kecil, masing-masing sesuai langkah");
  cek(DP.LANGKAH_HITUNG.every((l) => l.judul.length <= 20 && tanpaDigit(l.arti) && bersih(l.judul + l.arti) && /^Langkah \w+\./.test(l.arti)), "Mind-map: judul pendek, arti tanpa digit dan tanpa kata terlarang");
  const kataPeta = DP.LANGKAH_HITUNG.map((l) => l.judul + " " + l.arti).join(" ").toLowerCase();
  for (const w of ["simpan", "kurang", "pinjam", "pisah", "pengali", "kali", "bagi", "kolom", "sembilan", "sepuluh", "kebalikan"]) cek(kataPeta.includes(w), `Mind-map memuat "${w}"`);
  cek(!/bulat|perkiraan|kira/.test(kataPeta), "Mind-map tanpa pembulatan dan perkiraan");
  cek(bersih(DP.JUDUL_PETA + DP.PETUNJUK_PETA + DP.SELESAI_PETA) && tanpaDigit(DP.PETUNJUK_PETA), "Mind-map: teks umum bersih");
  // Infografis: data bersambung.
  sama(DI.TRIBUN.map((t) => [t.nama, t.penonton]), [["Utara", 24350], ["Selatan", 18705], ["Timur", 9060], ["Barat", 30402]], "Infografis: empat tribun bersambung dari Sub-Bab A sampai C");
  cek(DI.JUMLAH_PENONTON === 82517 && DI.KURSI_STADION === 90000 && DI.KURSI_KOSONG === 7483, "Infografis: jumlah 82.517, kursi 90.000, kosong 7.483");
  sama(DI.ATAS_SETELAH, [10, 9, 9, 9, 8], "Infografis: pinjaman bergulir melewati tiga kolom nol");
  sama(DI.SEL_SIMPAN.map((s) => [s.kolom, s.isi]), [[2, 1], [3, 1], [4, 2]], "Infografis: simpanan 1 ke ratusan, 1 ke ribuan, 2 ke puluh ribuan");
  cek(DI.HARGA_KOTAK === 5000 && DI.BANYAK_KOTAK === 12 && DI.TOTAL_KOTAK === 60000 && DI.KALI_PISAH.bagian.map((b) => b.hasil).join() === "50000,10000", "Infografis: 12 x 5.000 dipisah menjadi 50.000 dan 10.000, jumlah 60.000");
  sama(DI.BARIS_KALI.map((b) => [b.angka, b.geser, b.hasil]), [[2, 0, 10000], [1, 1, 50000]], "Infografis: kali bersusun dua baris");
  cek(DI.KAS === 64000 && DI.PEMBAGI === 4 && DI.TIAP_TRIBUN === 16000 && DI.BAGI.sisa === 0, "Infografis: 64.000 : 4 = 16.000");
  cek(DI.CEK_BAGI.kembali === 64000 && DI.CEK_KURSI.kembali === 90000, "Infografis: cek 16.000 x 4 = 64.000 dan 7.483 + 82.517 = 90.000");
  cek(DI.SEL_SIMPAN.length === 3 && DI.BARIS_KALI.length === 2, "Infografis: sel kosong simpanan dan baris kali");
  for (const s of [...DI.SEL_SIMPAN.map((x) => x.suara), DI.SUARA_JUMLAH, DI.SUARA_PINJAM, DI.SUARA_KOSONG, DI.SUARA_PISAH, ...DI.SUARA_BARIS, DI.SUARA_TOTAL_KALI, DI.SUARA_BAGI, DI.SUARA_CEK, DI.PETUNJUK_INFO_1, DI.PETUNJUK_INFO_2, DI.SELESAI_INFO_1, DI.SELESAI_INFO_2])
    cek(tanpaDigit(s) && bersih(s) && /^[A-Z]/.test(s) && !/\s[.,!?]/.test(s), `Infografis: suara tanpa digit, bersih, berkapital: ${s.slice(0, 40)}`);
  cek(DI.SUARA_JUMLAH.includes(EJA.kataK5B1(82517)) && DI.SUARA_KOSONG.includes(EJA.kataK5B1(7483)) && DI.SUARA_TOTAL_KALI.includes(EJA.kataK5B1(60000)) && DI.SUARA_BAGI.includes(EJA.kataK5B1(16000)) && DI.SUARA_CEK.includes(EJA.kataK5B1(64000)), "Infografis: bilangan besar dieja benar");
  cek(DI.SUARA_PINJAM.includes("puluh ribuan") && /sembilan/.test(DI.SUARA_PINJAM) && /delapan/.test(DI.SUARA_PINJAM), "Infografis: suara pinjaman menyebut puluh ribuan, sembilan, dan delapan");
  cek(DI.SEL_SIMPAN[0].suara.includes("sebelas") && DI.SEL_SIMPAN[1].suara.includes("lima belas") && DI.SEL_SIMPAN[2].suara.includes("dua puluh dua"), "Infografis: suara simpanan menyebut sebelas, lima belas, dua puluh dua");
  cek(/dua belas dipisah menjadi sepuluh dan dua/i.test(DI.SUARA_PISAH), "Infografis: suara pisah pengali");
}

/* ------------------------------ Tahap CPA ------------------------------ */
{
  const TAHAP = { Concrete: D.CONCRETE, Pictorial: D.PICTORIAL, Abstract: D.ABSTRACT };
  sama([D.CONCRETE_HITUNG === D.CONCRETE, D.PICTORIAL_HITUNG === D.PICTORIAL, D.ABSTRACT_HITUNG === D.ABSTRACT], [true, true, true], "nama ekspor pemasang");
  sama(LC.URUT_METODE, ["igil", "susun", "pisah", "bagi"], "urutan metode");
  sama(Object.values(LC.NAMA_METODE), ["Metode IGIL: Susun dan Tukar, Pisah dan Kali, Bagi dan Cek", "Stack and Trade: Susun dan Tukar", "Split and Multiply: Pisah dan Kali", "Share and Check: Bagi dan Cek"], "nama metode");
  const kanvasPerTahap = {};
  const nomor = [];
  const semuaJudul = new Set();
  for (const [nama, soal] of Object.entries(TAHAP)) {
    cek(soal.length === 3, `${nama}: tiga misi`);
    sama(soal.map((s) => s.cara), ["klik", "kanvas", "suara"], `${nama}: urutan cara klik, kanvas, suara`);
    cek(soal.every((s) => s.langkah.length === 4 && s.langkah.map((l) => l.metode).join() === "igil,susun,pisah,bagi"), `${nama}: empat metode tiap misi (IGIL lalu tiga metode global)`);
    sama(soal.map((s) => s.nomor), nama === "Concrete" ? [2, 3, 4] : nama === "Pictorial" ? [5, 6, 7] : [8, 9, 10], `${nama}: nomor misi berlanjut dari Simulasi`);
    nomor.push(...soal.map((s) => s.nomor));
    kanvasPerTahap[nama] = [];
    const rupa = nama === "Concrete" ? "benda" : nama === "Pictorial" ? "diagram" : "lambang";
    const nyata = new Set();
    let jumlahSalah = 0;
    for (const m of soal) {
      cek(m.judul.length > 8 && m.cerita.length > 15 && bersih(m.judul + m.cerita) && tanpaDigit(m.cerita), `${nama} misi ${m.nomor}: judul dan cerita ada, bersih, tanpa digit`);
      cek(!semuaJudul.has(m.judul), `${nama} misi ${m.nomor}: judul unik`);
      semuaJudul.add(m.judul);
      for (const ls of m.langkah) {
        const tag = `${nama} misi ${m.nomor} ${ls.metode}`;
        const l = ls.langkah;
        const d = LC.dasarDari(l);
        const kunci = LC.kunciJawab(l, m.cara);
        cek(kunci !== null && LC.siapLangsung(l, rupa, m.cara) === (l.tipe !== "salah"), `${tag}: ada jawaban benar dan siap dijawab (kecuali Cari kesalahan)`);
        cek(ls.cara === m.cara, `${tag}: cara sama dengan misi`);
        cek(tanpaDigit(ls.suara) && bersih(ls.suara) && bersih(ls.judul) && ls.judul.length > 20 && /^[A-Z]/.test(ls.judul) && /^[A-Z]/.test(ls.suara), `${tag}: suara tanpa digit, bersih, berkapital`);
        cek(!/\s[.,!?]/.test(ls.suara) && !/\s[.,!?]/.test(ls.judul), `${tag}: tanpa spasi sebelum tanda baca`);
        cek(ls.suara === LC.suaraTugas(l, rupa, m.cara, ls.metode) && ls.judul === LC.instruksi(l, rupa, m.cara, ls.metode), `${tag}: judul dan suara dari instruksi`);
        const tanya = LC.kalimatTanya(l, m.cara);
        cek(tanya.length > 8 && bersih(tanya) && /^[A-Z]/.test(tanya) && /[?]$/.test(tanya), `${tag}: kalimat tanya`);
        const kal = LC.kalimatKunci(l, m.cara);
        cek(kal.length > 15 && bersih(kal) && /^[A-Z]/.test(kal) && !/\s[.,!?]/.test(kal), `${tag}: kalimat pembenaran berkapital (${kal.slice(0, 30)})`);
        cek(tanpaDigit(LC.ucapkan(kal)), `${tag}: pembenaran dapat diucapkan tanpa digit`);
        for (const j of ["x", 5, "lain"]) {
          const p = LC.petunjukSalah(l, m.cara, j);
          cek(p.length > 15 && bersih(p) && tanpaDigit(p) && !/\bbenar adalah\b|\bhasilnya\b/.test(p), `${tag}: petunjuk salah mengarahkan tanpa bocoran (${p.slice(0, 40)})`);
        }
        if (l.tipe === "salah") {
          jumlahSalah += 1;
          const pil = LC.pilihanKlik(l);
          cek(m.cara === "klik" && pil.length === 3 && new Set(pil).size === 3 && pil.includes(l.jawabTokoh) && pil.includes(LC.teksKunciKlik(l)) && pil.indexOf(LC.teksKunciKlik(l)) !== 0, `${tag}: Cari kesalahan hanya di tugas klik, jawaban tokoh dan jawaban benar ada, benar tidak pertama`);
          cek(l.alasan.length === 3 && new Set(l.alasan).size === 3 && l.benar >= 0 && l.benar <= 2 && l.posisi >= 0 && l.posisi <= 2, `${tag}: tiga alasan berbeda dan posisi alasan benar`);
          const panjang = l.alasan.map((a) => a.length);
          cek(panjang[l.benar] < Math.max(...panjang), `${tag}: alasan benar bukan yang paling panjang (${panjang.join(",")})`);
          cek(l.alasan.every((a) => bersih(a)) && bersih(l.kataTokoh) && l.kataTokoh.includes(l.jawabTokoh.replace(/ \D+$/, "")), `${tag}: kata tokoh memuat jawabannya, tanpa kata terlarang`);
          cek((l.betul === true) === (l.jawabTokoh === LC.teksKunciKlik(l)), `${tag}: tokoh benar bila jawabannya sama dengan jawaban benar`);
        } else if (m.cara === "klik") {
          const pil = LC.pilihanKlik(l);
          cek(pil.length === 3 && new Set(pil).size === 3 && pil.includes(LC.teksKunciKlik(l)) && pil.indexOf(LC.teksKunciKlik(l)) !== 0, `${tag}: tiga pilihan berbeda, jawaban benar tidak di tombol pertama (${pil.join(" | ")})`);
          cek(pil.every(bersih), `${tag}: pilihan bersih`);
        } else if (m.cara === "kanvas") {
          cek(kunci.jenis === "angka" && Number.isInteger(kunci.n) && kunci.n >= 1 && kunci.n <= 9, `${tag}: kanvas SATU angka 1 sampai 9 (${kunci.n})`);
          kanvasPerTahap[nama].push(kunci.n);
        } else {
          cek(kunci.jenis === "nama", `${tag}: suara berjawaban kata`);
          const pil = LC.pilihanSuara(l, "suara");
          cek(pil.length === 3 && new Set(pil).size === 3 && pil.includes(kunci.nama) && pil.indexOf(kunci.nama) !== 0, `${tag}: pilihan ketuk cadangan ada, jawaban benar tidak pertama (${pil.join(" | ")})`);
          cek(K.cocokUcapan(kunci.nama, kunci).cocok, `${tag}: pengenal ucapan mengenali jawaban`);
        }
        const kartu = LC.barisKartu(d, m.cara).join(" ");
        const teksSemua = `${m.judul} ${m.cerita} ${ls.judul} ${kartu} ${LC.kalimatKunci(l, m.cara)}`;
        cek(emojiSah(teksSemua), `${tag}: emoji paling tinggi U+1FA95`);
        cek(!/bulat|perkiraan|kira-kira/i.test(teksSemua), `${tag}: tanpa pembulatan dan perkiraan`);
        if (rupa !== "benda") cek(!adaEmoji(teksSemua), `${tag}: ${nama} tanpa emoji di teks tugas`);
        if (rupa === "lambang") cek(!/gambar|petak|diagram|papan|garis bilangan|kartu stadion/i.test(`${kartu} ${ls.judul} ${LC.kalimatKunci(l, m.cara)} ${LC.petunjukSalah(l, m.cara, "x")}`), `${tag}: Abstract tidak menyebut gambar`);
        if (rupa === "diagram") cek(!/papan hitung/i.test(ls.judul), `${tag}: Pictorial tidak memakai kata papan hitung benda`);
        const sidik = JSON.stringify(d) + m.cara;
        cek(!nyata.has(sidik), `${tag}: tidak kembar dalam satu tahap`);
        nyata.add(sidik);
        cek(ls.judul.length < 330, `${tag}: instruksi tidak terlalu panjang`);
      }
    }
    cek(jumlahSalah >= 1, `${nama}: ada Cari kesalahan (${jumlahSalah})`);
  }
  sama(kanvasPerTahap, { Concrete: [1, 7, 5, 2], Pictorial: [2, 5, 3, 8], Abstract: [3, 4, 8, 7] }, "angka kanvas tiap tahap");
  for (const [n, a] of Object.entries(kanvasPerTahap)) cek(new Set(a).size === a.length, `${n}: angka kanvas tidak kembar dalam satu tahap`);
  sama(nomor, [2, 3, 4, 5, 6, 7, 8, 9, 10], "nomor misi 2 sampai 10");
  const jenis = (soal, i) => soal.map((m) => (m.langkah[i].langkah.tipe === "salah" ? `salah:${m.langkah[i].langkah.dasar.tipe}` : m.langkah[i].langkah.tipe));
  sama(jenis(D.CONCRETE, 0), ["rencana", "rencana", "rencana"], "Concrete: tugas IGIL");
  sama(jenis(D.CONCRETE, 1), ["jumlah", "jumlah", "kurang"], "Concrete: Stack and Trade");
  sama(jenis(D.CONCRETE, 2), ["salah:kali", "kali", "kali"], "Concrete: Split and Multiply, Cari kesalahan Fajar kali");
  sama(jenis(D.CONCRETE, 3), ["cek", "bagi", "cek"], "Concrete: Share and Check");
  sama(jenis(D.PICTORIAL, 2), ["kali", "kali", "kali"], "Pictorial: Split and Multiply");
  sama(jenis(D.PICTORIAL, 3), ["salah:bagi", "cek", "cek"], "Pictorial: Share and Check, Cari kesalahan Citra bagi");
  sama(jenis(D.ABSTRACT, 1), ["salah:jumlah", "jumlah", "kurang"], "Abstract: Stack and Trade, Cari kesalahan Fajar jumlah");
  sama(jenis(D.ABSTRACT, 3), ["bagi", "bagi", "cek"], "Abstract: Share and Check");
  // Data CPA berbeda dari Story dan Infografis.
  const dilarang = new Set([24350, 18705, 9060, 30402, 82517, 7483, 64000, 84000, 5000]);
  for (const soal of Object.values(TAHAP))
    for (const m of soal)
      for (const ls of m.langkah) {
        const d = LC.dasarDari(ls.langkah);
        for (const n of [d.d?.a, d.d?.b].filter((x) => x !== undefined)) cek(!dilarang.has(n), `data CPA ${n} berbeda dari Story`);
      }
  // Cari kesalahan: kesalahan tokoh benar-benar sesuai hitungan.
  const cs = D.CONCRETE[0].langkah[2].langkah;
  cek(cs.dasar.d.a === 4000 && cs.dasar.d.b === 12 && cs.jawabTokoh === `${LD.fmt(LD.kaliHilangNol(4000, 12))} rupiah` && cs.betul !== true && LC.teksKunciKlik(cs) === "48.000 rupiah", "Cari kesalahan Concrete: Fajar 12 x 4.000 = 4.800, benar 48.000");
  const ps = D.PICTORIAL[0].langkah[3].langkah;
  cek(ps.betul === true && ps.jawabTokoh === LC.teksKunciKlik(ps) && ps.jawabTokoh === "8.000 rupiah" && LD.bagiKolom(48000, 6).hasil === 8000 && 8000 * 6 === 48000, "Cari kesalahan Pictorial: Citra 48.000 : 6 = 8.000 benar, dicek 8.000 x 6");
  const as = D.ABSTRACT[0].langkah[1].langkah;
  cek(as.betul !== true && as.jawabTokoh === `${LD.fmt(LD.jumlahTanpaSimpan([36480, 27570]))} orang` && LC.teksKunciKlik(as) === "64.050 orang", "Cari kesalahan Abstract: Fajar lupa simpan 53.950, benar 64.050");
  const posisi = [cs, ps, as].map((x) => x.posisi);
  cek(new Set(posisi).size === 3, `posisi alasan benar bervariasi (${posisi.join(",")})`);
  cek([cs, ps, as].every((x) => !LC.petunjukSalah(x, "klik", x.jawabTokoh).includes(String(LC.teksKunciKlik(x)))), "petunjuk salah Cari kesalahan tidak membocorkan hasil");
  // Kalimat pinjaman: kolom nol hanya disebut bila ada yang dilewati.
  {
    const a1 = LC.kalimatKunci({ tipe: "kurang", d: { satuan: "tiket", nama: ["a", "b"], a: 52300, b: 17640 }, hasil: "sumber", kol: 1 }, "suara");
    const a2 = LC.kalimatKunci({ tipe: "kurang", d: { satuan: "tiket", nama: ["a", "b"], a: 40000, b: 15230 }, hasil: "sumber", kol: 1 }, "suara");
    cek(!/nol yang dilewati/.test(a1) && /ratusan/.test(a1), `kalimat pinjaman 52.300 tidak menyebut kolom nol (${a1})`);
    cek(/nol yang dilewati menjadi sembilan/.test(a2) && /puluh ribuan/.test(a2), "kalimat pinjaman 40.000 menyebut kolom nol yang dilewati");
  }
  // Poin penting dan perayaan.
  cek(D.POIN_PENTING.length === 7 && D.POIN_PENTING.every(bersih) && D.POIN_PENTING_SUARA.every((p) => tanpaDigit(p)), "Poin Penting: tujuh poin, suara tanpa digit");
  const pk = D.POIN_PENTING.join(" ").toLowerCase();
  for (const w of ["simpan", "pinjam", "nol", "sembilan", "pengali", "kali", "bagi", "kebalikan", "kolom"]) cek(pk.includes(w), `Poin Penting memuat "${w}"`);
  cek(!/bulat|perkiraan/.test(pk), "Poin Penting tanpa pembulatan dan perkiraan");
  cek(tanpaDigit(D.PENUTUP_D) && bersih(D.PENUTUP_D) && D.PENUTUP_D.includes("Hari Pertandingan Stadion Kota"), "perayaan: suara tanpa digit, menyebut Hari Pertandingan Stadion Kota");
  for (const t of ["Bu Ningsih", "Pak Hasto", "Bu Lestari", "Pak Darmo", "Pak Arif", "Bima", "Citra", "Fajar"]) cek(D.PENUTUP_D.includes(t), `perayaan menyebut ${t}`);
  for (const t of Object.values(D.TEMA_HITUNG)) cek(emojiSah(t.ikon) && t.nama.length > 5 && bersih(t.cara), `tema ${t.nama}`);
  cek(!adaEmoji(D.TEMA_HITUNG.pictorial.cara) && !adaEmoji(D.TEMA_HITUNG.abstract.cara), "tema Pictorial dan Abstract tanpa emoji benda di keterangan");
}

/* ------------------------------ Pengenal ucapan ------------------------------ */
{
  const nama = (t, n) => K.cocokUcapan(t, { jenis: "nama", nama: n }).cocok;
  cek(nama("susun", "susun") && nama("kita pisah", "pisah") && nama("bagi", "bagi") && nama("dikali", "kali") && nama("sepuluh", "sepuluh"), "ucapan: cara dan kata bilangan");
  cek(nama("ribuan", "ribuan") && nama("puluh ribuan", "puluh ribuan") && !nama("puluh ribuan", "ribuan") && !nama("puluh ribuan", "puluhan") && nama("ratusan", "ratusan") && nama("satuan", "satuan") && nama("puluhan", "puluhan"), "ucapan: nama kolom, puluh ribuan tidak terbaca ribuan");
  cek(nama("tambah", "tambah") && nama("dikurangi", "kurang") && nama("benar", "benar") && nama("salah", "salah") && !nama("tidak benar", "benar") && !nama("tidak salah", "salah"), "ucapan: tambah, kurang, benar, salah, dan penyangkalan");
  sama(K.angkaDariUcapan("dua puluh empat ribu tiga ratus lima puluh"), [24350], "ucapan: bilangan besar dari kata");
  sama(K.angkaDariUcapan("7"), [7], "ucapan: satu angka");
  sama(K.angkaDariUcapan("dua puluh lima ribu"), [25000], "ucapan: dua puluh lima ribu");
  sama(K.angkaDariUcapan("tiga ribu lima ratus"), [3500], "ucapan: tiga ribu lima ratus");
  sama(K.kataDariUcapan("pisah kali"), ["pisah", "kali"], "ucapan: dua kata");
  cek(K.cocokUcapan("dua", { jenis: "angka", n: 2 }).cocok && !K.cocokUcapan("tiga", { jenis: "angka", n: 2 }).cocok, "ucapan: angka");
  sama(LC.ucapkan("24.350 + 18.705 = 43.055 orang."), "dua puluh empat ribu tiga ratus lima puluh ditambah delapan belas ribu tujuh ratus lima sama dengan empat puluh tiga ribu lima puluh lima orang.", "ucapkan: bilangan besar, tanda, tanpa spasi sebelum titik");
  cek(LC.ucapkan("12 × 5.000 = 60.000").includes("dikali") && LC.ucapkan("64.000 : 4").includes("dibagi") && tanpaDigit(LC.ucapkan("90.000 − 82.517 = 7.483 kursi")) && LC.ucapkan("90.000 − 82.517").includes("dikurangi"), "ucapkan: kali, bagi, dan kurang dieja");
}

/* ------------------------------ Berkas ------------------------------ */
{
  const berkas = readdirSync(folderUrl).filter((f) => /\.(ts|tsx)$/.test(f));
  const wajib = ["data.ts", "data-info.ts", "data-peta.ts", "data-sim.ts", "logika.ts", "logika-cpa.ts", "logika-data.ts", "periksa.ts", "GambarHitung.tsx", "JawabHitung.tsx", "LangkahHitung.tsx", "TahapHitung.tsx", "PetaHitung.tsx", "InfoHitung.tsx", "SimulasiSusunHitung.tsx"];
  for (const w of wajib) cek(berkas.includes(w), `berkas ${w} ada`);
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folderUrl), "utf8");
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(emojiSah(s), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}|\\u\{1FA74\}/i.test(s), `${f}: kode emoji tidak melewati U+1FA95`);
    cek(![...s].some((c) => [0x1f39f, 0x2602, 0x1f41f, 0x1f420, 0x1f421, 0x1f988, 0x1f42c, 0x1f38f, 0x1f355, 0x1f9cb].includes(c.codePointAt(0))), `${f}: tanpa emoji yang tampil kosong atau ikan`);
    const sansKode = s.replace(/\bkunci\w*/gi, "").replace(/\bKunci\b/g, "");
    const tanpaNama = sansKode.split("Kelas 5").join("").split("Soal").join("").split("soal").join("").split("anpa skor").join("");
    cek(!/nilai|kelas|buku|teman|kelompok|skor|tebak|latihan|senilai|ditemani/i.test(tanpaNama), `${f}: tanpa kata terlarang (${(tanpaNama.match(/nilai|kelas|buku|teman|kelompok|skor|tebak|latihan|senilai|ditemani/i) ?? [""])[0]})`);
    if (/\.ts$/.test(f)) cek(!/from "react"|fetch\(/.test(s), `${f}: logika murni tanpa React dan jaringan`);
  }
  const g = readFileSync(new URL("GambarHitung.tsx", folderUrl), "utf8");
  cek(/rupa === "benda"/.test(g) && /KARTU_KOLOM\[k\]/.test(g) && !/GarisBulat/.test(g), "GambarHitung: kartu emoji hanya untuk Concrete, tanpa garis bilangan pembulatan");
  const p = readFileSync(new URL("PetaHitung.tsx", folderUrl), "utf8");
  cek(!/\.map\(\(x\) => sel\(/.test(p) || /key=/.test(p), "PetaHitung: peta rect memakai key");
  const l = readFileSync(new URL("logika.ts", folderUrl), "utf8");
  cek(/export type KeadaanHitung/.test(l) && /alat: "hitung"/.test(l), "logika.ts mengekspor KeadaanHitung dengan alat hitung");
}

console.log(`Lulus ${lulus}, gagal ${gagal}`);
process.exit(gagal ? 1 : 0);
