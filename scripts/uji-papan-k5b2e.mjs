// Uji Mind-map (Pohon Bilangan, label kosong), Infografis (dua kartu), Simulasi Pohon Papan, dan tahap Concrete, Pictorial, Abstract Kelas 5 Bab 2 Sub-Bab E ("Papan Bilangan Kak Lintang"),
// akhir cerita Pasar Kuliner Malam (bilangan prima, saringan Eratosthenes, faktorisasi prima dan pohon faktor, KPK dan FPB dari faktorisasi prima, pembagian berulang; sesuai Buku Siswa V hlm. 53-59).
// Memeriksa: prima (pembagian percobaan lawan jumlah faktor), saringan (25 prima sampai 100), faktorisasi (dua cara), pohon faktor (tata letak), KPK dan FPB (tiga cara: faktorisasi, pembagian berulang, rumus a x b : FPB dan Euclid),
// logika simulasi (Saring menolak bilangan terhapus, Pohon menolak pembagi yang tidak habis, Gabung menolak prima berbeda, Bagi menolak prima bukan terkecil), misi,
// Mind-map dan Infografis label kosong (data bersambung: prima sampai 30, pohon 12, 18, 24, KPK 36 dan FPB 6, pembagi 2, 2, 3, 3),
// CPA dua belas langkah per tahap dengan jawaban benar dihitung ulang dengan cara berbeda, angka kanvas tidak kembar, pengenal ucapan, petunjuk salah tanpa bocoran, batas rupa, emoji, kata terlarang, akhir baris.
// Jalankan: node --no-warnings scripts/uji-papan-k5b2e.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const LD = await import("../src/components/modul/papan-k5b2e/logika-data.ts");
const L = await import("../src/components/modul/papan-k5b2e/logika.ts");
const DS = await import("../src/components/modul/papan-k5b2e/data-sim.ts");
const DP = await import("../src/components/modul/papan-k5b2e/data-peta.ts");
const DI = await import("../src/components/modul/papan-k5b2e/data-info.ts");
const LC = await import("../src/components/modul/papan-k5b2e/logika-cpa.ts");
const D = await import("../src/components/modul/papan-k5b2e/data.ts");
const K = await import("../src/components/modul/papan-k5b2e/periksa.ts");
const S = await import("../src/components/modul/misi-simulasi.ts");
const MK = await import("../src/components/modul/misi-k5bab2.ts");
const MT = await import("../src/components/modul/misi-teks-k5b2.ts");
const EJA = await import("../src/components/modul/eja-k5b1.ts");
const folderUrl = new URL("../src/components/modul/papan-k5b2e/", import.meta.url);

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
const TERLARANG = /(nilai|kelas|buku|teman|kelompok|skor|soal|tebak|kunci|latihan|senilai|ditemani|pangkat)/i;
const bersih = (t) => !TERLARANG.test(t);
const tanpaDigit = (t) => !/\d/.test(t);
const emojiSah = (s) => [...s].every((c) => c.codePointAt(0) <= 0x1fa95 && c.codePointAt(0) !== 0x200d && c.codePointAt(0) !== 0x1f6de && c.codePointAt(0) !== 0x1fa74);
const adaEmoji = (s) => /\p{Extended_Pictographic}/u.test(s);
const acak = (() => {
  let x = 24680;
  return (maks) => {
    x = (x * 1103515245 + 12345) % 2147483648;
    return x % maks;
  };
})();
/* Cara lain (tanpa memakai logika-data) untuk menghitung ulang. */
const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
const lcm = (a, b) => (a * b) / gcd(a, b);
const gcdN = (xs) => xs.reduce(gcd);
const lcmN = (xs) => xs.reduce(lcm);
const faktorBrute = (n) => [...Array(n).keys()].map((i) => i + 1).filter((d) => n % d === 0);
const primaBrute = (n) => faktorBrute(n).length === 2;
const faktorPrimaBrute = (n) => {
  const r = [];
  let m = n;
  for (let d = 2; m > 1; d += 1) while (m % d === 0) {
    r.push(d);
    m /= d;
  }
  return r;
};

/* ------------------------------ Bilangan prima dan saringan ------------------------------ */
{
  sama(LD.fmt(1800), "1.800", "titik ribuan");
  for (let n = 1; n <= 400; n += 1) cek(LD.laPrima(n) === primaBrute(n) && LD.primaMenurutFaktor(n) === primaBrute(n), `prima ${n}: pembagian percobaan sama dengan jumlah faktor`);
  cek(!LD.laPrima(1) && LD.laPrima(2) && !LD.laPrima(0) && !LD.laPrima(-3) && !LD.laPrima(2.5), "satu, nol, negatif, dan pecahan bukan prima; dua prima");
  sama(LD.primaSampai(100).length, 25, "25 bilangan prima sampai 100 (pembagian percobaan)");
  sama(LD.saringan(100).sisa, LD.primaSampai(100), "saringan sampai 100 sama dengan pembagian percobaan");
  sama(LD.saringan(100).sisa.length, 25, "saringan sampai 100 menyisakan 25 prima");
  sama(LD.saringan(30).sisa, [2, 3, 5, 7, 11, 13, 17, 19, 23, 29], "Infografis: prima sampai 30");
  sama(LD.saringan(30).langkah.map((l) => l.p), [2, 3, 5], "saringan sampai 30: langkah prima 2, 3, 5 (p x p tidak lebih dari 30)");
  sama(LD.saringan(100).langkah.map((l) => l.p), [2, 3, 5, 7], "saringan sampai 100: langkah prima 2, 3, 5, 7");
  sama(LD.saringan(30).langkah[0].semua, [4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30], "kelipatan 2 sesudah 2 sampai 30");
  sama(LD.saringan(30).langkah[1].baru, [9, 15, 21, 27], "kelipatan 3 yang baru terhapus sampai 30 (yang genap sudah terhapus)");
  for (let b = 2; b <= 120; b += 1) {
    const s = LD.saringan(b);
    cek(s.sisa.every(primaBrute) && s.sisa.length === [...Array(b).keys()].map((i) => i + 1).filter(primaBrute).length, `saringan sampai ${b}: sisa persis semua prima`);
    cek(!s.terhapus.some((n) => n > 1 && primaBrute(n)) && s.terhapus.includes(1), `saringan sampai ${b}: tidak ada prima yang terhapus, satu terhapus`);
  }
  sama(LD.kelipatanBerikut(5, 40), [10, 15, 20, 25, 30, 35, 40], "kelipatan 5 sesudah 5 sampai 40");
  sama(LD.perluDiambil(40), [2, 3, 5], "sampai 40 cukup ambil 2, 3, 5");
  sama(LD.perluDiambil(34), [2, 3, 5], "sampai 34 cukup ambil 2, 3, 5");
  sama(LD.perluDiambil(20), [2, 3], "sampai 20 cukup ambil 2, 3");
  sama(LD.berikutnyaDiambil([], 40), 2, "prima pertama yang diambil adalah 2");
  sama(LD.berikutnyaDiambil([2], 40), 3, "sesudah 2 diambil 3 (4 terhapus)");
  sama(LD.berikutnyaDiambil([2, 3], 40), 5, "sesudah 3 diambil 5");
  sama(LD.primaSesudah(7), 11, "prima sesudah 7");
  sama(LD.primaSesudah(13), 17, "prima sesudah 13");
}

/* ------------------------------ Faktorisasi, pohon faktor, KPK dan FPB ------------------------------ */
{
  for (let n = 2; n <= 600; n += 1) {
    const f = LD.faktorisasi(n);
    sama(f, faktorPrimaBrute(n), `faktorisasi ${n} dua cara`);
    sama(LD.faktorisasiPohon(n), f, `faktorisasi ${n}: memecah dua faktor mana saja menghasilkan daun yang sama`);
    cek(LD.hasilKali(f) === n && f.every(primaBrute), `faktorisasi ${n}: semua prima dan hasil kalinya kembali ke ${n}`);
  }
  sama(LD.tulisKali(LD.faktorisasi(12)), "2 × 2 × 3", "12 ditulis 2 × 2 × 3 (tanpa pangkat)");
  sama(LD.tulisKali(LD.faktorisasi(18)), "2 × 3 × 3", "18 ditulis 2 × 3 × 3");
  sama(LD.tulisKali(LD.faktorisasi(24)), "2 × 2 × 2 × 3", "24 ditulis 2 × 2 × 2 × 3");
  sama(LD.faktorisasi(196), [2, 2, 7, 7], "buku: 196 = 2 × 2 × 7 × 7");
  sama(LD.faktorisasi(300), [2, 2, 3, 5, 5], "buku: 300 = 2 × 2 × 3 × 5 × 5");
  sama(LD.faktorisasi(270), [2, 3, 3, 3, 5], "buku: 270 = 2 × 3 × 3 × 3 × 5");
  // Tata letak pohon.
  for (let n = 2; n <= 300; n += 1) {
    const t = LD.pohonTata(n);
    const f = LD.faktorisasi(n);
    cek(t.node.length === (f.length === 1 ? 1 : 2 * f.length - 1), `pohon ${n}: banyak simpul`);
    const daun = t.node.filter((m) => m.prima);
    cek(daun.length === f.length && LD.hasilKali(daun.map((m) => m.bil)) === n && JSON.stringify(daun.map((m) => m.bil).sort((a, b) => a - b)) === JSON.stringify(f), `pohon ${n}: daun sama dengan faktorisasi`);
    cek(t.node.filter((m) => !m.prima).every((m) => m.bil === LD.hasilKali(t.node.filter((q) => q.induk === m.id).map((q) => q.bil))), `pohon ${n}: tiap simpul bukan prima sama dengan hasil kali anaknya`);
    cek(t.node.every((m) => m.x + 22 >= 11 && (f.length > 4 || m.x + 22 <= 89) && m.y >= 11 && m.y + 11 <= t.tinggi), `pohon ${n}: simpul dalam bidang 100 lebar (sampai empat daun muat penuh)`);
    cek(new Set(t.node.map((m) => `${m.x},${m.y}`)).size === t.node.length, `pohon ${n}: simpul tidak menumpuk`);
    cek(t.node.every((m) => m.induk === null || t.node[m.induk].y < m.y), `pohon ${n}: anak lebih rendah dari induk`);
  }
  sama(LD.daunPohon(24).map((m) => m.bil), [2, 2, 2, 3], "pohon 24 punya daun 2, 2, 2, 3");
  // KPK dan FPB dari faktorisasi lawan rumus dan Euclid.
  const p12 = LD.pasangkan(LD.faktorisasi(12), LD.faktorisasi(18));
  sama([p12.pasangan, p12.sisaA, p12.sisaB, p12.kpk], [[2, 3], [2], [3], [2, 2, 3, 3]], "pasangan prima 12 dan 18: berpasangan 2 dan 3, KPK 2 × 2 × 3 × 3");
  cek(LD.hasilKali(p12.kpk) === 36 && LD.hasilKali(p12.pasangan) === 6, "12 dan 18: KPK 36 dan FPB 6");
  sama(LD.kpkFaktorisasi([LD.faktorisasi(72), LD.faktorisasi(150)]).hasil, 1800, "buku: KPK 72 dan 150 adalah 1.800");
  sama(LD.fpbFaktorisasi([LD.faktorisasi(72), LD.faktorisasi(150)]).hasil, 6, "buku: FPB 72 dan 150 adalah 6");
  sama(LD.fpbFaktorisasi([LD.faktorisasi(15), LD.faktorisasi(28)]).hasil, 1, "buku: FPB 15 dan 28 adalah 1 (tidak ada prima berpasangan)");
  sama(LD.fpbFaktorisasi([LD.faktorisasi(15), LD.faktorisasi(28)]).faktor, [], "FPB tanpa pasangan: tanpa faktor");
  for (let t = 0; t < 1500; t += 1) {
    const banyak = 2 + acak(2);
    const bil = Array.from({ length: banyak }, () => 2 + acak(200));
    const fs = bil.map(LD.faktorisasi);
    const kpk = LD.kpkFaktorisasi(fs).hasil;
    const fpb = LD.fpbFaktorisasi(fs).hasil;
    cek(kpk === lcmN(bil) && fpb === gcdN(bil), `${bil.join(", ")}: KPK dan FPB dari faktorisasi sama dengan rumus lain`);
    cek(bil.every((b) => kpk % b === 0 && b % fpb === 0), `${bil.join(", ")}: KPK kelipatan semua, FPB pembagi semua`);
    if (banyak === 2) {
      const [a, b] = bil;
      cek(kpk === (a * b) / fpb, `${a} dan ${b}: KPK = a x b : FPB`);
      const p = LD.pasangkan(fs[0], fs[1]);
      cek(LD.hasilKali(p.kpk) === kpk && LD.hasilKali(p.pasangan) === fpb, `${a} dan ${b}: pasangan ditulis sekali untuk KPK, hasil kali pasangan untuk FPB`);
    }
    // Pembagian berulang.
    const pb = LD.pembagianBerulang(bil);
    cek(pb.kpk === kpk && pb.fpb === fpb, `${bil.join(", ")}: pembagian berulang menghasilkan KPK dan FPB yang sama`);
    cek(pb.baris.at(-1).sesudah.every((x) => x === 1) && pb.pembagi.every(primaBrute) && JSON.stringify(pb.pembagi) === JSON.stringify([...pb.pembagi].sort((x, y) => x - y)), `${bil.join(", ")}: berakhir semua satu, pembagi prima dari kecil ke besar`);
    cek(pb.baris.every((r) => r.sebelum.some((x) => x > 1 && x % r.p === 0) && r.sesudah.every((x, i) => (r.sebelum[i] % r.p === 0 ? x === r.sebelum[i] / r.p : x === r.sebelum[i]))), `${bil.join(", ")}: tiap baris membagi yang habis dan menulis ulang yang tidak`);
  }
  const b1218 = LD.pembagianBerulang([12, 18]);
  sama([b1218.pembagi, b1218.kpk, b1218.fpb], [[2, 2, 3, 3], 36, 6], "Infografis: pembagian berulang 12 dan 18 (pembagi 2, 2, 3, 3)");
  sama(b1218.baris.map((r) => r.sesudah), [[6, 9], [3, 9], [1, 3], [1, 1]], "12 dan 18: isi tiap baris");
  sama(b1218.baris.map((r) => r.semua), [true, false, true, false], "12 dan 18: baris yang membagi semua bilangan");
  const b72 = LD.pembagianBerulang([72, 150]);
  sama([b72.kpk, b72.fpb], [1800, 6], "buku: pembagian berulang 72 dan 150");
  sama(LD.pembagianBerulang([30, 45]).pembagi, [2, 3, 3, 5], "Story: pembagian berulang 30 dan 45 (pembagi 2, 3, 3, 5)");
  cek(LD.pembagianBerulang([30, 45]).kpk === 90 && LD.pembagianBerulang([30, 45]).fpb === 15, "Story: KPK 90 dan FPB 15");
  sama(LD.pembagianBerulang([12, 18, 24]).pembagi, [2, 2, 3, 2, 3].sort((a, b) => a - b), "12, 18, 24: pembagi berurutan dari kecil ke besar");
  sama([LD.pembagianBerulang([12, 18, 24]).kpk, LD.pembagianBerulang([12, 18, 24]).fpb], [72, 6], "12, 18, 24: KPK 72 dan FPB 6");
  sama(LD.susun3("b", ["a", "c"], 1), ["a", "b", "c"], "susun3 posisi kedua");
  sama(LD.susun3("b", ["a", "c"], 2), ["a", "c", "b"], "susun3 posisi ketiga");
}

/* ------------------------------ Logika simulasi ------------------------------ */
const jalanSaring = (k0, batas) => {
  let k = k0;
  let r = L.ketukSaring(k, 1);
  k = r.k;
  for (let g = 0; g < 20; g += 1) {
    const n = L.giliranSaring(k);
    if (n === null) break;
    r = L.ketukSaring(k, n);
    k = r.k;
    if (!r.ok) throw new Error("giliran ditolak");
    if (L.saringSelesai(k)) break;
  }
  return k;
};
{
  const a = L.awalPapan();
  cek(a.alat === "papan" && a.mode === "saring" && a.salah === 0 && a.daun.length === 1 && a.daun[0] === DS.POHON_SIM[0], "keadaan awal");
  cek(L.pilihModePapan(a, "bagi").mode === "bagi", "pilih alat");
  sama(L.mulaiLagiPapan(), L.awalPapan(), "mulai lagi");
  // Saring.
  sama([...DS.SARING_SIM], [20, 26, 34, 40], "tabel saring simulasi");
  let k = L.awalPapan();
  let r = L.ketukSaring(k, 2);
  cek(!r.ok && r.jenis === "giliran" && r.k.tolakGiliran && !r.k.tolakHapus && !r.k.satuDihapus, "Saring menolak mengambil sebelum satu dihapus");
  r = L.ketukSaring(k, 1);
  cek(r.ok && r.jenis === "satu" && r.k.satuDihapus && L.giliranSaring(r.k) === 2, "Saring: hapus satu, giliran prima 2");
  k = r.k;
  r = L.ketukSaring(k, 4);
  cek(!r.ok && r.jenis === "giliran" && r.k.tolakGiliran && !r.k.tolakHapus, "Saring menolak bilangan yang bukan gilirannya (4 belum terhapus)");
  r = L.ketukSaring(k, 3);
  cek(!r.ok && r.jenis === "giliran", "Saring menolak mengambil 3 sebelum 2");
  r = L.ketukSaring(k, 2);
  cek(r.ok && r.jenis === "ambil" && r.k.diambil.join() === "2", "Saring: ambil 2");
  k = r.k;
  sama([...L.hapusSaring(k)].sort((x, y) => x - y), [1, 4, 6, 8, 10, 12, 14, 16, 18, 20], "kelipatan 2 dan satu terhapus pada tabel 20");
  r = L.ketukSaring(k, 4);
  cek(!r.ok && r.jenis === "terhapus" && r.k.tolakHapus, "Saring menolak bilangan yang sudah terhapus dan mencatat tolakHapus");
  r = L.ketukSaring(k, 1);
  cek(!r.ok && r.jenis === "terhapus", "Saring: satu yang sudah dihapus tidak bisa diambil");
  cek(!L.periksaSaring(k).ok && L.periksaSaring(k).k.salah === 1, "Periksa saring sebelum selesai ditolak (hanya mencatat percobaan keliru)");
  for (const batas of DS.SARING_SIM) {
    let s = { ...L.awalPapan(), saringKe: DS.SARING_SIM.indexOf(batas) };
    cek(L.batasSaring(s) === batas, `target saring ${batas}`);
    s = jalanSaring(s, batas);
    cek(L.saringSelesai(s), `saring ${batas}: selesai setelah mengambil prima yang perlu`);
    sama(L.sisaSaring(s), [...Array(batas).keys()].map((i) => i + 1).filter(primaBrute), `saring ${batas}: sisa tabel persis semua prima`);
    const p = L.periksaSaring(s);
    cek(p.ok && p.k.saringKe === s.saringKe + 1 && !p.k.satuDihapus && p.k.diambil.length === 0 && p.k.saringBenar.length === 1, `saring ${batas}: periksa benar, sasaran berganti dan pilihan direset`);
  }
  cek(L.kalimatSaring(L.awalPapan()).includes("bilangan satu"), "kalimat saring awal");
  // Pohon.
  sama([...DS.POHON_SIM], [32, 56, 75, 98], "bilangan pohon simulasi");
  k = L.awalPapan();
  cek(L.targetPohon(k) === 32 && k.daun.join() === "32", "target pohon awal");
  const pr = L.pecahPohon(k, 2);
  cek(!pr.ok && pr.alasan === "belum", "Pohon: pecah tanpa memilih daun ditolak tanpa mencatat penolakan alat");
  k = L.pilihDaunPohon(k, 0);
  cek(L.pecahPohon(k, 3).alasan === "tidak" && L.pecahPohon(k, 3).k.tolakPohon, "Pohon menolak pembagi yang tidak habis membagi (32 dibagi 3)");
  const p2 = L.pecahPohon(k, 2);
  cek(p2.ok && p2.k.daun.join() === "2,16" && p2.k.pilihDaun === -1, "Pohon: 32 dipecah menjadi 2 dan 16, pilihan direset");
  k = L.pilihDaunPohon(p2.k, 0);
  cek(L.pecahPohon(k, 2).alasan === "prima" && L.pecahPohon(k, 2).k.tolakPohon, "Pohon menolak memecah bilangan prima");
  cek(!L.periksaPohon(p2.k).ok, "Periksa pohon sebelum semua daun prima ditolak");
  for (const n of DS.POHON_SIM) {
    let s = { ...L.awalPapan(), pohonKe: DS.POHON_SIM.indexOf(n), daun: [n] };
    for (let g = 0; g < 20 && !L.pohonSelesai(s); g += 1) {
      const i = s.daun.findIndex((x) => !LD.laPrima(x));
      s = L.pilihDaunPohon(s, i);
      const p = DS.PEMBAGI_SIM.find((q) => s.daun[i] % q === 0);
      const h = L.pecahPohon(s, p);
      cek(h.ok, `pohon ${n}: pecah ${s.daun[i]} dengan ${p}`);
      s = h.k;
    }
    cek(L.pohonSelesai(s) && LD.hasilKali(s.daun) === n && JSON.stringify([...s.daun].sort((a, b) => a - b)) === JSON.stringify(faktorPrimaBrute(n)), `pohon ${n}: semua daun prima dan hasil kalinya ${n}`);
    const p = L.periksaPohon(s);
    cek(p.ok && p.k.pohonBenar.length === 1 && p.k.daun.length === 1 && p.k.pilihDaun === -1 && p.k.daun[0] === DS.POHON_SIM[(DS.POHON_SIM.indexOf(n) + 1) % 4], `pohon ${n}: periksa benar, bilangan berikut dimulai dan pilihan direset`);
  }
  // Gabung.
  sama(DS.GABUNG_SIM.map((x) => [...x]), [[14, 35], [15, 21], [32, 48], [26, 39]], "pasangan simulasi");
  for (let gi = 0; gi < DS.GABUNG_SIM.length; gi += 1) {
    let s = { ...L.awalPapan(), gabungKe: gi };
    const [a, b] = DS.GABUNG_SIM[gi];
    const [fa, fb] = L.faktorGabung(s);
    sama([fa, fb], [faktorPrimaBrute(a), faktorPrimaBrute(b)], `gabung ${a} dan ${b}: faktorisasi`);
    cek(L.banyakPasangan(s) === LD.fpbFaktorisasi([fa, fb]).faktor.length, `gabung ${a} dan ${b}: banyak pasangan`);
    cek(!L.periksaGabung(s).ok, `gabung ${a} dan ${b}: periksa tanpa pasangan ditolak`);
    // Salah pasang: dua prima berbeda.
    const beda = fa.findIndex((x) => !fb.includes(x));
    if (beda >= 0) {
      let t = L.ketukGabung(s, "a", beda).k;
      const ib = fb.findIndex((x) => x !== fa[beda]);
      const h = L.ketukGabung(t, "b", ib);
      cek(!h.ok && h.k.tolakGabung && h.k.pasang.length === 0 && h.k.pilihGabung === null, `gabung ${a} dan ${b}: alat menolak dua prima yang berbeda`);
    }
    for (let i = 0; i < fa.length; i += 1) {
      if (L.sudahDipasang(s, "a", i)) continue;
      const j = fb.findIndex((x, q) => x === fa[i] && !L.sudahDipasang(s, "b", q));
      if (j < 0) continue;
      s = L.ketukGabung(s, "a", i).k;
      const h = L.ketukGabung(s, "b", j);
      cek(h.ok && h.pasangan, `gabung ${a} dan ${b}: pasangkan ${fa[i]}`);
      s = h.k;
    }
    cek(L.gabungSelesai(s), `gabung ${a} dan ${b}: semua pasangan terbentuk`);
    const h = L.hasilGabung(s);
    cek(LD.hasilKali(h.kpk) === lcm(a, b) && LD.hasilKali(h.fpb) === gcd(a, b), `gabung ${a} dan ${b}: KPK ${lcm(a, b)} dan FPB ${gcd(a, b)} dari pasangan`);
    const p = L.periksaGabung(s);
    cek(p.ok && p.k.gabungKe === gi + 1 && p.k.pasang.length === 0 && p.k.pilihGabung === null && p.k.gabungBenar.length === 1, `gabung ${a} dan ${b}: periksa benar, sasaran berganti dan pilihan direset`);
  }
  {
    let s = L.awalPapan();
    const ketuk = L.ketukGabung(s, "a", 0);
    s = L.ketukGabung(ketuk.k, "a", 1).k;
    cek(s.pilihGabung.baris === "a" && s.pilihGabung.i === 1, "gabung: mengetuk prima lain di baris yang sama memindahkan pilihan");
  }
  // Bagi.
  sama(DS.BAGI_SIM.map((x) => [...x]), [[10, 25], [21, 28], [6, 8, 15], [9, 15, 21]], "bilangan bagi simulasi");
  for (let bi = 0; bi < DS.BAGI_SIM.length; bi += 1) {
    let s = { ...L.awalPapan(), bagiKe: bi };
    const bil = [...DS.BAGI_SIM[bi]];
    const tidak = DS.PEMBAGI_SIM.find((q) => !bil.some((x) => x % q === 0));
    if (tidak) {
      const h = L.pakaiPembagi(s, tidak);
      cek(!h.ok && h.alasan === "tidak" && h.k.tolakBagi, `bagi ${bil.join(", ")}: alat menolak pembagi ${tidak} yang tidak membagi satu pun`);
    }
    const terkecil = LD.pembagiBerikut(bil);
    const lebih = DS.PEMBAGI_SIM.find((q) => q > terkecil && bil.some((x) => x % q === 0));
    if (lebih) {
      const h = L.pakaiPembagi(s, lebih);
      cek(!h.ok && h.alasan === "urut" && h.k.tolakBagi && h.k.pembagiDipakai.length === 0, `bagi ${bil.join(", ")}: alat menolak prima ${lebih} yang bukan terkecil yang bisa`);
    }
    const dipakai = [];
    for (let g = 0; g < 20; g += 1) {
      const p = LD.pembagiBerikut(L.angkaBagi(s));
      if (p === null) break;
      const h = L.pakaiPembagi(s, p);
      cek(h.ok, `bagi ${bil.join(", ")}: pakai ${p}`);
      dipakai.push(p);
      s = h.k;
      if (h.selesai) {
        cek(s.bagiBenar.length === 1 && s.pembagiDipakai.length === 0 && s.bagiKe === bi + 1, `bagi ${bil.join(", ")}: selesai, sasaran berganti`);
        break;
      }
    }
    const pb = LD.pembagianBerulang(bil);
    sama(dipakai, pb.pembagi, `bagi ${bil.join(", ")}: pembagi yang dipakai sama dengan pembagian berulang`);
    cek(pb.kpk === lcmN(bil) && pb.fpb === gcdN(bil), `bagi ${bil.join(", ")}: KPK ${lcmN(bil)} dan FPB ${gcdN(bil)}`);
  }
  {
    // Barisan baris di alat sama dengan pembagian berulang.
    let s = { ...L.awalPapan(), bagiKe: 1 };
    s = L.pakaiPembagi(s, 2).k;
    sama(L.barisBagiSim(s).map((b) => [b.p, b.sesudah]), [[2, [21, 14]]], "baris pertama bagi 21 dan 28 dengan 2");
    sama(L.angkaBagi(s), [21, 14], "bilangan sesudah pembagi pertama");
  }
}

/* ------------------------------ Misi ------------------------------ */
{
  const a = L.awalPapan();
  sama(MK.MISI_E.map((m) => m.id), ["e-saring", "e-pohon", "e-gabung", "e-bagi", "e-tolak", "e-dua"], "misi E: enam id");
  cek(MK.MISI_E.filter((m) => m.wajib).length === 4 && MK.MISI_E.filter((m) => !m.wajib).length === 2 && new Set(MK.MISI_E.map((m) => m.id)).size === 6, "misi E: empat wajib, dua tantangan bebas, id unik");
  cek(MK.MISI_E.every((m) => m.teks.length > 10 && m.teks.length < 120 && bersih(m.teks) && /^e-/.test(m.id)), "misi E: teks ringkas, bersih, id berawalan e-");
  cek(MK.daftarMisiK5Bab2("E") === MK.MISI_E, "daftarMisiK5Bab2 E");
  cek(MT.MISI_K5B2.E === DS.MISI_PAPAN_TEKS && MT.MISI_K5B2.E === D.MISI_PAPAN_TEKS && bersih(DS.MISI_PAPAN_TEKS), "teks misi sama di misi-teks-k5b2.ts dan data-sim.ts");
  cek(S.misiBaru(MK.MISI_E, a, new Set()).length === 0, "misi E: keadaan awal tidak memenuhi misi");
  sama(S.misiBaru(MK.MISI_E, { ...a, saringBenar: [0], pohonBenar: [0, 1], gabungBenar: [0], bagiBenar: [0], tolakHapus: true }, new Set()), ["e-saring", "e-pohon", "e-gabung", "e-bagi", "e-tolak", "e-dua"], "misi E: semua tercapai dari keadaan lengkap");
  sama(S.misiBaru(MK.MISI_E, { ...a, tolakGiliran: true, tolakPohon: true, tolakGabung: true, tolakBagi: true }, new Set()), [], "misi E: penolakan lain bukan tantangan tolak");
  // Tantangan tolak tercapai lewat alat: ketuk bilangan yang sudah terhapus.
  let s = L.ketukSaring(L.awalPapan(), 1).k;
  s = L.ketukSaring(s, 2).k;
  s = L.ketukSaring(s, 6).k;
  cek(S.misiBaru(MK.MISI_E, s, new Set()).join() === "e-tolak", "misi E: alat menolak bilangan terhapus mencapai e-tolak");
}

/* ------------------------------ Mind-map dan Infografis (label kosong) ------------------------------ */
{
  cek(DP.LANGKAH_PAPAN.length >= 3 && DP.LANGKAH_PAPAN.length <= 6 && DP.LANGKAH_PAPAN.length !== 4, `Mind-map: jumlah label sesuai isi dan tidak empat (${DP.LANGKAH_PAPAN.length})`);
  sama(DP.LANGKAH_PAPAN.map((l) => l.gambar), ["saring", "pohon", "kali", "pasang", "bagi"], "Mind-map: lima gambar kecil, masing-masing sesuai langkah");
  cek(DP.LANGKAH_PAPAN.every((l) => l.judul.length <= 20 && tanpaDigit(l.arti) && bersih(l.judul + l.arti) && /^Langkah \w+\./.test(l.arti)), "Mind-map: judul pendek, arti tanpa digit dan tanpa kata terlarang");
  const kataPeta = DP.LANGKAH_PAPAN.map((l) => l.judul + " " + l.arti).join(" ").toLowerCase();
  for (const w of ["saring", "prima", "pohon", "faktor", "daun", "hasil kali", "faktorisasi", "kpk", "fpb", "pasang", "bagi", "pembagi", "kelipatan", "satu"]) cek(kataPeta.includes(w), `Mind-map memuat "${w}"`);
  cek(bersih(DP.JUDUL_PETA + DP.PETUNJUK_PETA + DP.SELESAI_PETA) && tanpaDigit(DP.PETUNJUK_PETA + DP.SELESAI_PETA), "Mind-map: teks umum bersih");
  // Infografis: data bersambung.
  sama(DI.PRIMA_INFO, [2, 3, 5, 7, 11, 13, 17, 19, 23, 29], "Infografis: bilangan prima sampai 30");
  sama(DI.LANGKAH_SARING.map((l) => l.label), ["Hapus 1", "Ambil 2", "Ambil 3", "Ambil 5"], "Infografis: langkah saringan");
  sama(DI.LANGKAH_SARING.map((l) => l.coret.length), [1, 14, 9, 5], "Infografis: banyak bilangan yang dicoret tiap langkah (kelipatan 2, 3, 5 sesudahnya)");
  sama(DI.POHON_INFO.map((p) => [p.n, p.teks]), [[12, "2 × 2 × 3"], [18, "2 × 3 × 3"], [24, "2 × 2 × 2 × 3"]], "Infografis: pohon faktor 12, 18, 24");
  cek(DI.POHON_INFO.every((p) => p.tata.node.filter((m) => m.prima).map((m) => m.bil).join() === p.faktor.join()), "Infografis: daun tiap pohon sama dengan faktorisasi");
  cek(DI.KPK_INFO.hasil === 36 && DI.FPB_INFO.hasil === 6 && DI.KPK_INFO.faktor.join() === "2,2,3,3" && DI.FPB_INFO.faktor.join() === "2,3", "Infografis: KPK 36 dan FPB 6 dari faktorisasi 12 dan 18");
  cek(DI.KPK_INFO.hasil === lcm(12, 18) && DI.FPB_INFO.hasil === gcd(12, 18), "Infografis: KPK dan FPB sama dengan rumus lain");
  cek(DI.KPK_TIGA.hasil === 72 && DI.FPB_TIGA.hasil === 6 && DI.KPK_TIGA.hasil === lcmN([12, 18, 24]) && DI.FPB_TIGA.hasil === gcdN([12, 18, 24]), "Infografis: tiga bilangan 12, 18, 24 (KPK 72, FPB 6)");
  cek(DI.FPB_TANPA.hasil === 1 && DI.FPB_TANPA.faktor.length === 0 && DI.KPK_TANPA.hasil === 300 && DI.KPK_TANPA.hasil === lcm(12, 25), "Infografis: 12 dan 25 tanpa pasangan (FPB 1, KPK 300)");
  sama([DI.BAGI_INFO.pembagi, DI.BAGI_INFO.kpk, DI.BAGI_INFO.fpb, DI.PEMBAGI_SEMUA], [[2, 2, 3, 3], 36, 6, [2, 3]], "Infografis: pembagian berulang 12 dan 18");
  sama(DI.PASANGAN.pasangan, [2, 3], "Infografis: prima berpasangan 2 dan 3");
  const semuaSuara = [...DI.LANGKAH_SARING.map((l) => l.suara), DI.SUARA_SISA, ...DI.POHON_INFO.map((p) => p.suara), DI.SUARA_KPK, DI.SUARA_FPB, DI.SUARA_TIGA, DI.SUARA_TANPA, ...DI.SUARA_BARIS_BAGI, DI.SUARA_KPK_BAGI, DI.SUARA_FPB_BAGI, DI.PETUNJUK_INFO_1, DI.PETUNJUK_INFO_2, DI.SELESAI_INFO_1, DI.SELESAI_INFO_2];
  for (const s of semuaSuara) cek(tanpaDigit(s) && bersih(s) && /^[A-Z]/.test(s) && !/\s[.,!?]/.test(s), `Infografis: suara tanpa digit, bersih, berkapital: ${s.slice(0, 40)}`);
  cek(DI.SUARA_SISA.includes("sembilan belas") && DI.SUARA_SISA.includes("dua puluh sembilan") && DI.SUARA_SISA.includes("tiga puluh") && DI.SUARA_SISA.includes("sepuluh bilangan prima"), "Infografis: suara sisa prima mengeja dua puluh sembilan dan sepuluh bilangan prima");
  cek(DI.SUARA_KPK.includes("tiga puluh enam") && DI.SUARA_TIGA.includes("tujuh puluh dua") && DI.SUARA_TANPA.includes("tiga ratus") && DI.POHON_INFO[0].suara.includes("dua belas sama dengan dua dikali dua dikali tiga"), "Infografis: bilangan dieja benar");
  cek(DI.SUARA_BARIS_BAGI[0].includes("dua belas dan delapan belas menjadi enam dan sembilan"), "Infografis: suara baris pembagi pertama");
  cek(DI.SUARA_KPK_BAGI.includes("dua dikali dua dikali tiga dikali tiga sama dengan tiga puluh enam") && DI.SUARA_FPB_BAGI.includes("dua dan tiga"), "Infografis: suara KPK dan FPB dari pembagi");
  // Jumlah sel kosong: kartu 1 = 5 langkah + 3 pohon, kartu 2 = 4 + 4 baris + 2.
  cek(DI.LANGKAH_SARING.length + 1 + DI.POHON_INFO.length === 8 && 4 + DI.BAGI_INFO.baris.length + 2 === 10, "Infografis: delapan dan sepuluh sel kosong");
  // Semua topik inti muncul di Infografis (kata dalam suara dan isi).
  const info = (semuaSuara.join(" ") + " " + DI.POHON_INFO.map((p) => p.teks).join(" ") + " " + DI.JUDUL_INFO_1 + " " + DI.JUDUL_INFO_2).toLowerCase();
  for (const w of ["bilangan prima", "satu bukan bilangan prima", "kelipatan", "pohon faktor", "faktorisasi", "berpasangan", "kpk", "fpb", "tiga bilangan", "pembagi"]) cek(info.includes(w) || (w === "pohon faktor" && info.includes("pohon")) || (w === "faktorisasi" && info.includes("ujungnya prima")) || (w === "tiga bilangan" && info.includes("tiga bilangan")), `Infografis memuat topik "${w}"`);
  // Data simulasi berbeda dari Story dan Infografis.
  const dilarang = new Set([12, 18, 24, 30, 36, 45, 72, 90]);
  for (const n of [...DS.POHON_SIM, ...DS.SARING_SIM, ...DS.GABUNG_SIM.flat(), ...DS.BAGI_SIM.flat()]) cek(!dilarang.has(n), `data simulasi ${n} berbeda dari Story dan Infografis`);
}

/* ------------------------------ Tahap CPA ------------------------------ */
{
  const TAHAP = { Concrete: D.CONCRETE, Pictorial: D.PICTORIAL, Abstract: D.ABSTRACT };
  sama([D.CONCRETE_PAPAN === D.CONCRETE, D.PICTORIAL_PAPAN === D.PICTORIAL, D.ABSTRACT_PAPAN === D.ABSTRACT], [true, true, true], "nama ekspor pemasang");
  sama(LC.URUT_METODE, ["igil", "saring", "pohon", "bagi"], "urutan metode");
  sama(Object.values(LC.NAMA_METODE), ["Metode IGIL: Saring, Pohon Faktor, Bagi Berulang", "Sieve It: Saring", "Factor Tree: Pohon Faktor", "Divide Down: Bagi Berulang"], "nama metode");
  const kanvasPerTahap = {};
  const nomor = [];
  const semuaJudul = new Set();
  const dilarang = new Set([12, 18, 24, 30, 36, 45, 72, 90]);
  for (const [nama, soal] of Object.entries(TAHAP)) {
    cek(soal.length === 3, `${nama}: tiga misi`);
    sama(soal.map((s) => s.cara), ["klik", "kanvas", "suara"], `${nama}: urutan cara klik, kanvas, suara`);
    cek(soal.every((s) => s.langkah.length === 4 && s.langkah.map((l) => l.metode).join() === "igil,saring,pohon,bagi"), `${nama}: empat metode tiap misi (IGIL lalu tiga metode global)`);
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
        /* Jawaban benar dihitung ulang dengan cara lain. */
        const jawabLain = (() => {
          switch (d.tipe) {
            case "rencana":
              return null;
            case "prima":
              return d.pil.filter((x) => primaBrute(Number(x))).length === 1 ? d.pil.find((x) => primaBrute(Number(x))) : "RAGU";
            case "hapus": {
              let c = 0;
              for (let q = d.p * 2; q <= d.batas; q += d.p) c += 1;
              if (d.hasil === "banyak") return c;
              const kena = d.pil.filter((x) => Number(x) > d.p && Number(x) % d.p === 0);
              return kena.length === 1 ? kena[0] : "RAGU";
            }
            case "banyakPrima":
              return LD.saringan(d.batas).sisa.length;
            case "berikut": {
              let q = d.sesudah + 1;
              while (!primaBrute(q)) q += 1;
              return q;
            }
            case "klaimPrima":
              return primaBrute(d.n) ? "benar" : "salah";
            case "faktor": {
              const f = faktorPrimaBrute(d.n);
              if (d.hasil === "daun") {
                const ok = d.pil.filter((t) => t.split(" × ").map(Number).every(primaBrute) && t.split(" × ").map(Number).reduce((a, b) => a * b, 1) === d.n);
                return ok.length === 1 && ok[0] === f.join(" × ") ? ok[0] : "RAGU";
              }
              return d.hasil === "banyak" ? f.length : d.hasil === "beda" ? new Set(f).size : d.hasil === "terbesar" ? Math.max(...f) : Math.min(...f);
            }
            case "ulang": {
              const p = LD.pembagianBerulang(d.bil).pembagi;
              if (d.hasil === "kpk") return `${lcmN(d.bil)}${d.satuan ? ` ${d.satuan}` : ""}`;
              if (d.hasil === "fpb") return `${gcdN(d.bil)}${d.satuan ? ` ${d.satuan}` : ""}`;
              if (d.hasil === "banyak") return p.length;
              if (d.hasil === "pembagiKe") return p[d.ke - 1];
              if (d.hasil === "terakhir") return p.at(-1);
              return lcmN(d.bil) === d.klaim ? "benar" : "salah";
            }
          }
        })();
        if (d.tipe === "rencana") {
          const benar = LC.RENCANA[d.r].cara;
          cek(kunci.jenis === (m.cara === "kanvas" ? "angka" : "nama") && (m.cara === "kanvas" ? kunci.n === benar + 1 : kunci.nama === (m.cara === "klik" ? LC.NAMA_TIGA_CARA[benar] : LC.KATA_TIGA_CARA[benar])), `${tag}: cara yang cocok sesuai situasi`);
        } else {
          const nilai = kunci.jenis === "angka" ? kunci.n : kunci.nama;
          cek(String(nilai) === String(jawabLain), `${tag}: jawaban benar dihitung ulang dengan cara lain (${nilai} dan ${jawabLain})`);
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
          const pil = LC.pilihanSuara(l, "suara");
          const benarTeks = LC.teksKunciPilihan(kunci);
          cek(pil.length === 3 && new Set(pil).size === 3 && pil.includes(benarTeks) && pil.indexOf(benarTeks) !== 0, `${tag}: pilihan ketuk cadangan ada, jawaban benar tidak pertama (${pil.join(" | ")})`);
          cek(K.cocokUcapan(benarTeks, kunci).cocok && (kunci.jenis !== "angka" || K.cocokUcapan(String(kunci.n), kunci).cocok), `${tag}: pengenal ucapan mengenali jawaban`);
          cek(kunci.jenis !== "angka" || pil.every((p) => !K.cocokUcapan(p, kunci).cocok || p === benarTeks), `${tag}: pilihan pengecoh tidak dikenali sebagai jawaban benar`);
        }
        const kartu = LC.barisKartu(d, m.cara).join(" ");
        const teksSemua = `${m.judul} ${m.cerita} ${ls.judul} ${kartu} ${LC.kalimatKunci(l, m.cara)}`;
        cek(emojiSah(teksSemua), `${tag}: emoji paling tinggi U+1FA95`);
        if (rupa !== "benda") cek(!adaEmoji(teksSemua), `${tag}: ${nama} tanpa emoji di teks tugas`);
        if (rupa === "lambang") cek(!/gambar|petak|diagram|papan|garis bilangan|pohon di|kartu stadion/i.test(`${kartu} ${ls.judul} ${LC.kalimatKunci(l, m.cara)} ${LC.petunjukSalah(l, m.cara, "x")}`), `${tag}: Abstract tidak menyebut gambar`);
        if (rupa === "diagram") cek(!/papan/i.test(ls.judul), `${tag}: Pictorial tidak memakai kata papan benda`);
        // Model gambar hanya untuk Concrete dan Pictorial dan sesuai data.
        const mg = LC.modelGambar(d);
        if (d.tipe === "rencana") cek(mg === null, `${tag}: tugas memilih cara tanpa model gambar`);
        else {
          cek(mg !== null, `${tag}: ada model gambar`);
          if (mg.jenis === "tabel") {
            cek(mg.batas === d.batas && (d.tipe !== "hapus" || (mg.lingkar.join() === String(d.p) && mg.coret.length === 0)), `${tag}: tabel bilangan sampai ${mg.batas}`);
            if (d.tipe === "berikut") cek(mg.lingkar.join() === LD.primaSampai(d.sesudah).join() && mg.coret.every((x) => !primaBrute(x) || x === 1 ? true : false) && !mg.coret.some((x) => primaBrute(x)), `${tag}: tabel berikut melingkari prima yang diambil dan mencoret bilangan terhapus`);
          }
          if (mg.jenis === "pohon") cek(mg.n === d.n && LD.pohonTata(d.n).node.length >= 3, `${tag}: pohon faktor ${mg.n} bisa digambar`);
          if (mg.jenis === "bagi") cek(mg.bil.join() === d.bil.join() && mg.baris.length === LD.pembagianBerulang(d.bil).baris.length, `${tag}: tabel pembagian berulang sesuai data`);
          if (mg.jenis === "kartu") cek(mg.bilangan.length >= 1 && mg.bilangan.length <= 3, `${tag}: kartu bilangan`);
        }
        if (d.tipe === "faktor") cek(!dilarang.has(d.n), `${tag}: data CPA ${d.n} berbeda dari Story dan Infografis`);
        if (d.tipe === "ulang") for (const n of d.bil) cek(!dilarang.has(n), `${tag}: data CPA ${n} berbeda dari Story dan Infografis`);
        if (d.tipe === "hapus" || d.tipe === "banyakPrima") cek(!dilarang.has(d.batas), `${tag}: batas ${d.batas} berbeda dari Story dan Infografis`);
        const sidik = JSON.stringify(d) + m.cara;
        cek(!nyata.has(sidik), `${tag}: tidak kembar dalam satu tahap`);
        nyata.add(sidik);
        cek(ls.judul.length < 330, `${tag}: instruksi tidak terlalu panjang`);
      }
    }
    cek(jumlahSalah >= 1, `${nama}: ada Cari kesalahan (${jumlahSalah})`);
  }
  sama(kanvasPerTahap, { Concrete: [2, 7, 3, 4], Pictorial: [1, 6, 3, 5], Abstract: [3, 6, 4, 5] }, "angka kanvas tiap tahap");
  for (const [n, a] of Object.entries(kanvasPerTahap)) cek(new Set(a).size === a.length, `${n}: angka kanvas tidak kembar dalam satu tahap`);
  sama(nomor, [2, 3, 4, 5, 6, 7, 8, 9, 10], "nomor misi 2 sampai 10");
  const jenis = (soal, i) => soal.map((m) => (m.langkah[i].langkah.tipe === "salah" ? `salah:${m.langkah[i].langkah.dasar.tipe}` : m.langkah[i].langkah.tipe));
  sama(jenis(D.CONCRETE, 0), ["rencana", "rencana", "rencana"], "Concrete: tugas IGIL");
  sama(jenis(D.CONCRETE, 1), ["salah:prima", "hapus", "berikut"], "Concrete: Sieve It, Cari kesalahan Fajar prima");
  sama(jenis(D.CONCRETE, 2), ["faktor", "faktor", "faktor"], "Concrete: Factor Tree");
  sama(jenis(D.CONCRETE, 3), ["ulang", "ulang", "ulang"], "Concrete: Divide Down");
  sama(jenis(D.PICTORIAL, 1), ["hapus", "banyakPrima", "klaimPrima"], "Pictorial: Sieve It");
  sama(jenis(D.PICTORIAL, 2), ["salah:faktor", "faktor", "faktor"], "Pictorial: Factor Tree, Cari kesalahan Citra faktor");
  sama(jenis(D.ABSTRACT, 1), ["prima", "hapus", "berikut"], "Abstract: Sieve It");
  sama(jenis(D.ABSTRACT, 3), ["salah:ulang", "ulang", "ulang"], "Abstract: Divide Down, Cari kesalahan Fajar ulang");
  // Cari kesalahan: kesalahan tokoh benar-benar sesuai hitungan.
  const cs = D.CONCRETE[0].langkah[1].langkah;
  cek(cs.dasar.pil.join() === "9,13,15" && cs.jawabTokoh === "9" && !LD.laPrima(9) && LD.semuaFaktor(9).join() === "1,3,9" && cs.betul !== true && LC.teksKunciKlik(cs) === "13" && LD.laPrima(13), "Cari kesalahan Concrete: Fajar menyebut 9 prima padahal faktornya 1, 3, 9; benar 13");
  const ps = D.PICTORIAL[0].langkah[2].langkah;
  cek(ps.betul === true && ps.jawabTokoh === LC.teksKunciKlik(ps) && ps.jawabTokoh === "2 × 3 × 7" && 2 * 3 * 7 === 42 && ps.dasar.n === 42, "Cari kesalahan Pictorial: Citra 42 = 2 × 3 × 7 benar");
  const as = D.ABSTRACT[0].langkah[3].langkah;
  cek(as.betul !== true && as.jawabTokoh === "0" && LC.teksKunciKlik(as) === "1" && gcd(21, 22) === 1 && lcm(21, 22) === 462 && as.dasar.pil.join() === "0,1,462", "Cari kesalahan Abstract: Fajar FPB 21 dan 22 adalah 0, benar 1");
  const posisi = [cs, ps, as].map((x) => x.posisi);
  cek(new Set(posisi).size === 3, `posisi alasan benar bervariasi (${posisi.join(",")})`);
  cek([cs, ps, as].every((x) => !LC.petunjukSalah(x, "klik", x.jawabTokoh).includes(String(LC.teksKunciKlik(x)))), "petunjuk salah Cari kesalahan tidak membocorkan hasil");
  // Poin penting dan perayaan.
  cek(D.POIN_PENTING.length === 7 && D.POIN_PENTING.every(bersih) && D.POIN_PENTING_SUARA.every((p) => tanpaDigit(p)), "Poin Penting: tujuh poin, suara tanpa digit");
  const pk = D.POIN_PENTING.join(" ").toLowerCase();
  for (const w of ["bilangan prima", "satu bukan", "saringan eratosthenes", "faktorisasi", "pohon faktor", "kpk", "fpb", "berpasangan", "pembagian berulang", "tiga bilangan", "25"]) cek(pk.includes(w), `Poin Penting memuat "${w}"`);
  cek(!/pangkat/.test(pk), "Poin Penting tanpa istilah pangkat");
  cek(tanpaDigit(D.PENUTUP_E) && bersih(D.PENUTUP_E) && D.PENUTUP_E.includes("Pasar Kuliner Malam"), "perayaan: suara tanpa digit, menyebut Pasar Kuliner Malam");
  for (const t of ["Bu Marni", "Pak Tarno", "Bu Wati", "Pak Joko", "Kak Lintang", "Pak Arif", "Bima", "Citra", "Fajar"]) cek(D.PENUTUP_E.includes(t), `perayaan menyebut ${t}`);
  for (const t of ["lampu gantung", "spanduk", "lonceng", "kotak bingkisan", "balon"]) cek(D.PENUTUP_E.toLowerCase().includes(t), `perayaan menyebut ${t}`);
  for (const t of Object.values(D.TEMA_PAPAN)) cek(emojiSah(t.ikon) && t.nama.length > 5 && bersih(t.cara), `tema ${t.nama}`);
  cek(!adaEmoji(D.TEMA_PAPAN.pictorial.cara) && !adaEmoji(D.TEMA_PAPAN.abstract.cara), "tema Pictorial dan Abstract tanpa emoji benda di keterangan");
}

/* ------------------------------ Pengenal ucapan ------------------------------ */
{
  const nama = (t, n) => K.cocokUcapan(t, { jenis: "nama", nama: n }).cocok;
  cek(nama("saring", "saring") && nama("kita pohon", "pohon") && nama("bagi", "bagi") && nama("menyaring", "saring"), "ucapan: nama cara");
  cek(nama("benar", "benar") && nama("salah", "salah") && nama("betul", "benar") && !nama("tidak benar", "benar") && !nama("tidak salah", "salah"), "ucapan: benar, salah, dan penyangkalan");
  sama(K.angkaDariUcapan("tujuh belas"), [17], "ucapan: tujuh belas");
  sama(K.angkaDariUcapan("sebelas"), [11], "ucapan: sebelas");
  sama(K.angkaDariUcapan("tiga belas"), [13], "ucapan: tiga belas");
  sama(K.angkaDariUcapan("7"), [7], "ucapan: satu angka");
  sama(K.kataDariUcapan("saring pohon"), ["saring", "pohon"], "ucapan: dua kata");
  cek(K.cocokUcapan("dua", { jenis: "angka", n: 2 }).cocok && !K.cocokUcapan("tiga", { jenis: "angka", n: 2 }).cocok, "ucapan: angka");
  sama(LC.ucapkan("2 × 2 × 3 = 12 dan 1.800."), "dua dikali dua dikali tiga sama dengan dua belas dan seribu delapan ratus.", "ucapkan: hasil kali, titik ribuan, tanpa spasi sebelum titik");
  cek(tanpaDigit(LC.ucapkan("KPK 4, 6, dan 10 = 60")) && LC.ucapkan("1 bukan prima").startsWith("satu"), "ucapkan: bilangan dieja");
}

/* ------------------------------ Berkas ------------------------------ */
{
  const berkas = readdirSync(folderUrl).filter((f) => /\.(ts|tsx)$/.test(f));
  const wajib = ["data.ts", "data-info.ts", "data-peta.ts", "data-sim.ts", "logika.ts", "logika-cpa.ts", "logika-data.ts", "periksa.ts", "GambarPapan.tsx", "JawabPapan.tsx", "LangkahPapan.tsx", "TahapPapan.tsx", "PetaPapan.tsx", "InfoPapan.tsx", "SimulasiPohonPapan.tsx"];
  for (const w of wajib) cek(berkas.includes(w), `berkas ${w} ada`);
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folderUrl), "utf8");
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(emojiSah(s), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}|\\u\{1FA74\}/i.test(s), `${f}: kode emoji tidak melewati U+1FA95`);
    cek(![...s].some((c) => [0x1f39f, 0x2602, 0x1f41f, 0x1f420, 0x1f421, 0x1f988, 0x1f42c, 0x1f38f, 0x1f355, 0x1f9cb].includes(c.codePointAt(0))), `${f}: tanpa emoji yang tampil kosong atau ikan`);
    const sansKode = s.replace(/\bkunci\w*/gi, "").replace(/\bKunci\b/g, "");
    const tanpaNama = sansKode.split("Kelas 5").join("").split("Soal").join("").split("soal").join("").split("anpa skor").join("");
    cek(!/nilai|kelas|buku|teman|kelompok|skor|tebak|latihan|senilai|ditemani|pangkat/i.test(tanpaNama), `${f}: tanpa kata terlarang (${(tanpaNama.match(/nilai|kelas|buku|teman|kelompok|skor|tebak|latihan|senilai|ditemani|pangkat/i) ?? [""])[0]})`);
    if (/\.ts$/.test(f)) cek(!/from "react"|fetch\(/.test(s), `${f}: logika murni tanpa React dan jaringan`);
  }
  const g = readFileSync(new URL("GambarPapan.tsx", folderUrl), "utf8");
  cek(/rupa === "benda"/.test(g) && /1F3EE/.test(g) && !/\.map\(\(x\) => sel\(/.test(g), "GambarPapan: lampion beremoji hanya untuk Concrete");
  const p = readFileSync(new URL("PetaPapan.tsx", folderUrl), "utf8");
  cek(/key=/.test(p) && !/from "[^"]*peta-label/.test(p), "PetaPapan: komponen sendiri dengan key");
  const i = readFileSync(new URL("InfoPapan.tsx", folderUrl), "utf8");
  cek(!/from "[^"]*peta-label/.test(i) && /key=/.test(i), "InfoPapan: komponen sendiri dengan key");
  const l = readFileSync(new URL("logika.ts", folderUrl), "utf8");
  cek(/export type KeadaanPapan/.test(l) && /alat: "papan"/.test(l), "logika.ts mengekspor KeadaanPapan dengan alat papan");
}

console.log(`Lulus ${lulus}, gagal ${gagal}`);
process.exit(gagal ? 1 : 0);
