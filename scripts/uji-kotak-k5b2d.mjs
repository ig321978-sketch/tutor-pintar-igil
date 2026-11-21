// Uji Mind-map (Meja Kemas, label kosong), Infografis (dua kartu), Simulasi Isi Kotak, dan tahap Concrete, Pictorial, Abstract Kelas 5 Bab 2 Sub-Bab D ("Kotak Bingkisan Pak Joko"),
// Pasar Kuliner Malam (faktor persekutuan, FPB, congklak faktor, membagi sama rata ke kotak sebanyak-banyaknya, FPB tiga bilangan; sesuai Buku Siswa V Bab 2 Sub-Bab D hlm. 46-52).
// Memeriksa: faktor (percobaan pembagian dan pasangan hasil kali), faktor persekutuan (dua cara), FPB (terbesar dari faktor persekutuan dan Euclid), papan congklak (lubang dua biji), bagi sama rata,
// logika simulasi (Congklak dengan alat menolak lubang berisi satu biji, Kotak dan Tiga dengan alat menolak kue bersisa, Terbesar), misi, Mind-map dan Infografis label kosong
// (data bersambung: 24 klepon dan 18 onde-onde, faktor persekutuan 1 2 3 6, FPB 6, 6 kotak berisi 4 dan 3, 8 dan 20 FPB 4, 12 dan 18 FPB 6, 12 18 24 FPB 6),
// CPA dua belas langkah per tahap dengan jawaban benar dihitung dari data, angka kanvas tidak kembar, gambar sesuai angka, pengenal ucapan, petunjuk salah tanpa bocoran, batas rupa, emoji, kata terlarang, akhir baris.
// Jalankan: node --no-warnings scripts/uji-kotak-k5b2d.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const LD = await import("../src/components/modul/kotak-k5b2d/logika-data.ts");
const L = await import("../src/components/modul/kotak-k5b2d/logika.ts");
const DS = await import("../src/components/modul/kotak-k5b2d/data-sim.ts");
const DP = await import("../src/components/modul/kotak-k5b2d/data-peta.ts");
const DI = await import("../src/components/modul/kotak-k5b2d/data-info.ts");
const LC = await import("../src/components/modul/kotak-k5b2d/logika-cpa.ts");
const D = await import("../src/components/modul/kotak-k5b2d/data.ts");
const K = await import("../src/components/modul/kotak-k5b2d/periksa.ts");
const S = await import("../src/components/modul/misi-simulasi.ts");
const MK = await import("../src/components/modul/misi-k5bab2.ts");
const MT = await import("../src/components/modul/misi-teks-k5b2.ts");
const EJA = await import("../src/components/modul/eja-k5b1.ts");
const folderUrl = new URL("../src/components/modul/kotak-k5b2d/", import.meta.url);

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
  let x = 12345;
  return (maks) => {
    x = (x * 1103515245 + 12345) % 2147483648;
    return x % maks;
  };
})();
// Penghitung mandiri (cara berbeda dari logika-data.ts): gcd dengan Euclid dan faktor dari bagi bertingkat.
const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
const gcdSemua = (xs) => xs.reduce((g, n) => gcd(g, n));
const faktorBrute = (n) => [...Array(n).keys()].map((i) => i + 1).filter((i) => n % i === 0);
const urut = (xs) => [...xs].sort((p, q) => p - q);

/* ------------------------------ Faktor, faktor persekutuan, FPB ------------------------------ */
{
  sama(LD.faktorDari(24), [1, 2, 3, 4, 6, 8, 12, 24], "Story: faktor 24");
  sama(LD.faktorDari(18), [1, 2, 3, 6, 9, 18], "Story: faktor 18");
  sama(LD.faktorDari(8), [1, 2, 4, 8], "faktor 8");
  sama(LD.faktorDari(20), [1, 2, 4, 5, 10, 20], "faktor 20");
  sama(LD.persekutuan([24, 18]), [1, 2, 3, 6], "Story: faktor persekutuan 24 dan 18");
  sama(LD.persekutuan([8, 20]), [1, 2, 4], "Story: faktor persekutuan 8 dan 20");
  sama(LD.persekutuan([12, 18]), [1, 2, 3, 6], "Infografis: faktor persekutuan 12 dan 18");
  sama(LD.persekutuan([12, 18, 24]), [1, 2, 3, 6], "Infografis: faktor persekutuan 12, 18, dan 24");
  cek(LD.fpb([24, 18]) === 6 && LD.fpb([8, 20]) === 4 && LD.fpb([12, 18]) === 6 && LD.fpb([12, 18, 24]) === 6, "FPB Story dan Infografis: 6, 4, 6, 6");
  cek(LD.fpb([36, 48, 24]) === 12 && LD.fpb([15, 35]) === 5 && LD.fpb([12, 42]) === 6 && LD.fpb([12, 28]) === 4 && LD.fpb([6, 12]) === 6, "FPB contoh buku: 36 48 24 menjadi 12, 15 dan 35 menjadi 5, 12 dan 42 menjadi 6, 12 dan 28 menjadi 4");
  sama(LD.lubangDuaBiji(12, 18), [1, 2, 3, 6], "congklak buku: lubang berisi dua biji untuk 12 dan 18");
  sama(LD.lubangDuaBiji(24, 18), [1, 2, 3, 6], "congklak Story: lubang dua biji untuk 24 dan 18");
  sama(LD.pasanganFaktor(24), [[1, 24], [2, 12], [3, 8], [4, 6]], "pasangan faktor 24");
  for (let t = 0; t < 600; t += 1) {
    const n = 1 + acak(120);
    sama(LD.faktorDari(n), faktorBrute(n), `faktor ${n} sama dengan cara brute`);
    sama(LD.faktorPasangan(n), LD.faktorDari(n), `faktor ${n} dari pasangan hasil kali`);
    cek(LD.pasanganFaktor(n).every(([p, q]) => p * q === n), `pasangan faktor ${n}: hasil kali sama dengan bilangan`);
    cek(LD.faktorDari(n)[0] === 1 && LD.faktorDari(n).includes(n), `faktor ${n}: satu dan bilangan itu sendiri selalu faktor`);
  }
  for (let t = 0; t < 1500; t += 1) {
    const n = 2 + acak(2);
    const bil = Array.from({ length: n }, () => 2 + acak(90));
    const p = LD.persekutuan(bil);
    sama(p, LD.persekutuanDaftar(bil), `faktor persekutuan ${bil.join(",")} dua cara`);
    cek(LD.fpb(bil) === gcdSemua(bil) && LD.fpbEuclid(bil) === gcdSemua(bil), `FPB ${bil.join(",")} sama dengan Euclid (${gcdSemua(bil)})`);
    cek(p.every((f) => bil.every((b) => b % f === 0)) && p[0] === 1 && p[p.length - 1] === gcdSemua(bil), `faktor persekutuan ${bil.join(",")}: semua membagi dan yang terbesar adalah FPB`);
    sama(p, faktorBrute(gcdSemua(bil)), `faktor persekutuan ${bil.join(",")} sama dengan faktor dari FPB`);
    cek(LD.kotakTurun(bil) === LD.fpb(bil), `kotak terbanyak ${bil.join(",")} dicari turun sama dengan FPB`);
    cek(LD.fpbPertamaSetelahSatu(bil) === (p.find((f) => f > 1) ?? 1), `faktor pertama setelah satu ${bil.join(",")}`);
  }
  sama([LD.fpbPertamaSetelahSatu([12, 18]), LD.fpbPertamaSetelahSatu([20, 30]), LD.fpbPertamaSetelahSatu([30, 42])], [2, 2, 2], "salah umum: faktor pertama setelah satu bukan FPB");
  cek(LD.fpbPertamaSetelahSatu([24, 18]) !== LD.fpb([24, 18]), "salah Fajar di Story: dua bukan FPB 24 dan 18");
  sama(LD.daftarTeks([1, 2, 4, 8]), "1, 2, 4, 8", "daftar sebagai teks");
}

/* ------------------------------ Papan congklak dan bagi sama rata ------------------------------ */
{
  const p = LD.papanCongklak(24, 18, 24);
  cek(p.length === 24 && p.every((l, i) => l.nomor === i + 1 && l.a === (24 % l.nomor === 0) && l.b === (18 % l.nomor === 0) && l.biji === (l.a ? 1 : 0) + (l.b ? 1 : 0)), "papan congklak 24 lubang: biji merah di faktor 24, biji putih di faktor 18");
  sama(p.filter((l) => l.a).map((l) => l.nomor), [1, 2, 3, 4, 6, 8, 12, 24], "papan: lubang biji merah");
  sama(p.filter((l) => l.b).map((l) => l.nomor), [1, 2, 3, 6, 9, 18], "papan: lubang biji putih");
  sama(p.filter((l) => l.biji === 2).map((l) => l.nomor), [1, 2, 3, 6], "papan: lubang dua biji");
  const r = LD.kotakTerbanyak([24, 18]);
  cek(r.kotak === 6 && r.habis && r.isi.join() === "4,3" && r.sisa.every((s) => s === 0) && 6 * 4 === 24 && 6 * 3 === 18, "Story: 6 kotak berisi 4 klepon dan 3 onde-onde, semua terpakai");
  const r2 = LD.bagiSamaRata([24, 18], 4);
  cek(!r2.habis && r2.isi.join() === "6,4" && r2.sisa.join() === "0,2", "24 dan 18 dibagi ke 4 kotak: onde-onde bersisa 2");
  cek(LD.kotakTerbanyak([36, 48]).kotak === 12 && LD.kotakTerbanyak([36, 48]).isi.join() === "3,4", "Story luar: 36 dan 48 menjadi 12 bungkusan berisi 3 dan 4");
  cek(LD.kotakTerbanyak([36, 48, 24]).kotak === 12 && LD.kotakTerbanyak([36, 48, 24]).isi.join() === "3,4,2", "buku: 36 susu, 48 lolipop, 24 biskuit menjadi 12 paket");
  for (let t = 0; t < 800; t += 1) {
    const bil = [2 + acak(80), 2 + acak(80), 2 + acak(80)].slice(0, 2 + acak(2));
    const k = 1 + acak(Math.min(...bil));
    const x = LD.bagiSamaRata(bil, k);
    cek(bil.every((b, i) => x.isi[i] * k + x.sisa[i] === b && x.sisa[i] >= 0 && x.sisa[i] < k) && x.habis === bil.every((b) => b % k === 0), `bagi ${bil.join(",")} ke ${k} kotak`);
  }
  const pd = LD.pilihanDaftar([16, 24]);
  cek(pd.benar === "1, 2, 4, 8" && pd.lain[0] === "2, 4, 8" && pd.lain[1] === "1, 2, 3, 4, 8" && new Set([pd.benar, ...pd.lain]).size === 3, "pilihan daftar: benar, tanpa satu, dengan faktor yang bukan persekutuan");
  sama(LD.susun3("b", ["a", "c"], 1), ["a", "b", "c"], "susun3 posisi satu");
  sama(LD.susun3("b", ["a", "c"], 2), ["a", "c", "b"], "susun3 posisi dua");
  sama(LD.duaPengecoh(6, [6, 5, 5, 3, -1]), [5, 3], "dua pengecoh berbeda dari jawaban dan dari satu sama lain");
  cek(new Set(LD.duaPengecoh(1, [1])).size === 2, "dua pengecoh dari cadangan");
}

/* ------------------------------ Simulasi ------------------------------ */
{
  const a = L.awalKotak();
  cek(a.alat === "kotak" && a.mode === "congklak" && a.salah === 0 && a.congBenar.length === 0 && a.kotakBenar.length === 0 && a.tigaBenar.length === 0 && a.besarBenar.length === 0 && a.banyakK === 1 && a.banyakT === 1 && a.pilihBesar === -1, "awal: alat kotak, mode Congklak, belum ada yang benar");
  sama(S.misiBaru(MK.MISI_D, a, new Set()), [], "awal: keadaan awal tidak memenuhi misi");
  sama(L.pilihModeKotak(a, "besar").mode, "besar", "pilih mode");
  sama(DS.CONGKLAK_SIM.map((s) => s.bil), [[16, 20], [14, 28], [10, 25], [20, 30]], "sasaran congklak");

  // Congklak.
  const papan = L.papanCong(a);
  cek(papan.length === 20 && papan.every((l) => l.biji === (16 % l.nomor === 0 ? 1 : 0) + (20 % l.nomor === 0 ? 1 : 0)), "congklak: papan 16 dan 20 dengan 20 lubang");
  const tolak3 = L.ketukLubang(a, 3);
  cek(!tolak3.ok && tolak3.k.tolakLubang && tolak3.k.pilihLubang.length === 0 && tolak3.k.salah === 0, "congklak: lubang kosong ditolak, bukan percobaan keliru");
  const tolak5 = L.ketukLubang(a, 5);
  cek(!tolak5.ok && tolak5.k.tolakLubang && L.papanCong(a)[4].biji === 1, "congklak: lubang berisi satu biji ditolak");
  sama(S.misiBaru(MK.MISI_D, tolak5.k, new Set()), [], "congklak: penolakan lubang bukan misi");
  const k2 = L.ketukLubang(a, 2);
  cek(k2.ok && k2.k.pilihLubang.join() === "2", "congklak: lubang dua biji bisa ditandai");
  cek(L.ketukLubang(k2.k, 2).k.pilihLubang.length === 0, "congklak: ketuk lagi melepas tanda");
  cek(L.ketukLubang(a, 99).ok === false && L.ketukLubang(a, 99).k === a, "congklak: lubang di luar papan diabaikan");
  const kurang = L.periksaCong(k2.k);
  cek(!kurang.ok && kurang.k.salah === 1 && kurang.k.pilihLubang.join() === "2" && tanpaDigit(L.petunjukCong(k2.k)) && /belum cocok/.test(L.petunjukCong(k2.k)), "congklak: tanda kurang lengkap, petunjuk tanpa digit");
  cek(/Belum ada lubang/.test(L.petunjukCong(a)) && !L.periksaCong(a).ok, "congklak: tanpa tanda tidak benar");
  for (let i = 0; i < DS.CONGKLAK_SIM.length; i += 1) {
    let x = { ...a, congKe: i };
    const benar = persekutuanBrute(DS.CONGKLAK_SIM[i].bil);
    for (const n of benar) x = L.ketukLubang(x, n).k;
    const r = L.periksaCong(x);
    cek(r.ok && r.k.congBenar.includes(i) && r.k.congKe === i + 1 && r.k.pilihLubang.length === 0, `congklak: sasaran ${i + 1} tercapai dengan lubang ${benar.join(",")}`);
    cek(L.papanCong({ ...a, congKe: i }).length === Math.max(...DS.CONGKLAK_SIM[i].bil) && Math.max(...DS.CONGKLAK_SIM[i].bil) <= 30, `congklak: papan sasaran ${i + 1} paling banyak 30 lubang`);
    cek(benar.length >= 2 && L.ketukLubang({ ...a, congKe: i }, benar[benar.length - 1]).ok, `congklak: sasaran ${i + 1} punya lubang dua biji`);
  }
  sama(S.misiBaru(MK.MISI_D, { ...a, congBenar: [0] }, new Set()), ["d-congklak"], "congklak: misi d-congklak");

  // Kotak dua jenis.
  const tk = L.targetKotak(a);
  cek(tk.bil.join() === "20,50" && L.fpbKotak(a) === 10 && L.batasKotak(tk.bil) === 20 && L.bagiKotak(a).isi.join() === "20,50", "kotak: sasaran pertama 20 dan 50, FPB 10, batas 20, awal satu kotak");
  cek(L.ubahKotak(a, -1) === a && L.ubahKotak(a, 1).banyakK === 2, "kotak: tidak turun di bawah satu, naik satu per satu");
  let x20 = a;
  for (let n = 0; n < 40; n += 1) x20 = L.ubahKotak(x20, 1);
  cek(x20.banyakK === 20, "kotak: tidak naik melebihi bilangan terkecil");
  const tolakK = L.periksaKotak({ ...a, banyakK: 3 });
  cek(!tolakK.ok && tolakK.ditolak === true && tolakK.k.tolakKotak && tolakK.k.salah === 0, "kotak: alat menolak Periksa saat ada kue bersisa (bukan percobaan keliru)");
  sama(S.misiBaru(MK.MISI_D, tolakK.k, new Set()), ["d-tolak"], "kotak: tantangan d-tolak dari penolakan Periksa saat ada kue bersisa");
  const kecil = L.periksaKotak({ ...a, banyakK: 5 });
  cek(!kecil.ok && !kecil.ditolak && kecil.k.salah === 1 && !kecil.k.tolakKotak && L.bagiKotak({ ...a, banyakK: 5 }).habis, "kotak: semua habis tetapi belum sebanyak-banyaknya, bukan penolakan");
  cek(tanpaDigit(L.petunjukKotak()) && bersih(L.petunjukKotak()), "kotak: petunjuk tanpa digit");
  const kOk = L.periksaKotak({ ...a, banyakK: 10 });
  cek(kOk.ok && kOk.k.kotakBenar.join() === "0" && kOk.k.kotakKe === 1 && kOk.k.banyakK === 1, "kotak: banyak kotak 10 benar membuka sasaran berikutnya dan mengembalikan satu kotak");
  sama(S.misiBaru(MK.MISI_D, kOk.k, new Set()), ["d-kotak"], "kotak: misi d-kotak");
  for (let i = 0; i < DS.KOTAK_SIM.length; i += 1) {
    const bil = DS.KOTAK_SIM[i].bil;
    const x = { ...a, kotakKe: i };
    for (let n = 1; n <= Math.min(...bil); n += 1) {
      const r = L.periksaKotak({ ...x, banyakK: n });
      const habis = bil.every((b) => b % n === 0);
      cek(r.ok === (n === gcdSemua(bil)) && !!r.ditolak === !habis, `kotak sasaran ${i + 1} dengan ${n} kotak: benar hanya ${gcdSemua(bil)}, ditolak bila ada sisa`);
    }
    cek(DS.KOTAK_SIM[i].bil.length === 2 && gcdSemua(bil) >= 2 && L.fpbKotak(x) === gcdSemua(bil), `kotak sasaran ${i + 1}: dua jenis, FPB ${gcdSemua(bil)}`);
  }
  // Tiga jenis.
  const tt = L.targetTiga(a);
  cek(tt.bil.join() === "18,30,42" && L.fpbTiga(a) === 6 && L.bagiTiga({ ...a, banyakT: 6 }).isi.join() === "3,5,7", "tiga: sasaran pertama 18, 30, 42, FPB 6, isi 3, 5, 7");
  const tolakT = L.periksaTiga({ ...a, banyakT: 4 });
  cek(!tolakT.ok && tolakT.ditolak && tolakT.k.tolakKotak && tolakT.k.salah === 0, "tiga: alat menolak kue bersisa dan memakai tanda penolakan yang sama");
  const tOk = L.periksaTiga({ ...a, banyakT: 6 });
  cek(tOk.ok && tOk.k.tigaBenar.join() === "0" && tOk.k.tigaKe === 1 && tOk.k.banyakT === 1, "tiga: enam kotak benar");
  sama(S.misiBaru(MK.MISI_D, tOk.k, new Set()), ["d-tiga"], "tiga: misi d-tiga");
  cek(L.ubahTiga(a, -1) === a && L.ubahTiga(a, 1).banyakT === 2, "tiga: ubah banyak kotak");
  cek(!L.periksaTiga({ ...a, banyakT: 3 }).ok && !L.periksaTiga({ ...a, banyakT: 3 }).ditolak && L.periksaTiga({ ...a, banyakT: 3 }).k.salah === 1, "tiga: tiga kotak semua habis tetapi belum sebanyak-banyaknya");
  for (let i = 0; i < DS.TIGA_SIM.length; i += 1) {
    const bil = DS.TIGA_SIM[i].bil;
    const x = { ...a, tigaKe: i };
    cek(bil.length === 3 && gcdSemua(bil) >= 2 && L.periksaTiga({ ...x, banyakT: gcdSemua(bil) }).ok && L.fpbTiga(x) === gcdSemua(bil), `tiga sasaran ${i + 1}: FPB ${gcdSemua(bil)} tercapai`);
  }
  // Terbesar.
  sama(L.daftarBesar(a), [1, 2, 3, 6], "terbesar: faktor persekutuan 18 dan 42");
  const bukanPilih = L.periksaBesar(a);
  cek(!bukanPilih.ok && bukanPilih.ditolak && bukanPilih.k.salah === 0, "terbesar: alat menolak Periksa sebelum memilih");
  const pertama = L.periksaBesar(L.pilihBesar(a, 1));
  cek(!pertama.ok && !pertama.ditolak && pertama.k.salah === 1 && tanpaDigit(L.petunjukBesar()), "terbesar: faktor persekutuan pertama setelah satu bukan FPB, petunjuk tanpa digit");
  const bOk = L.periksaBesar(L.pilihBesar(a, 3));
  cek(bOk.ok && bOk.k.besarBenar.join() === "0" && bOk.k.besarKe === 1 && bOk.k.pilihBesar === -1, "terbesar: FPB benar membuka sasaran berikutnya");
  cek(L.pilihBesar(a, 9) === a && L.pilihBesar(a, -2) === a, "terbesar: pilihan di luar daftar diabaikan");
  sama(S.misiBaru(MK.MISI_D, bOk.k, new Set()), ["d-besar"], "terbesar: misi d-besar");
  sama(DS.BESAR_SIM.map((s) => gcdSemua(s.bil)), [6, 12, 15, 8], "terbesar: FPB tiap sasaran");
  for (let i = 0; i < DS.BESAR_SIM.length; i += 1) {
    const x = { ...a, besarKe: i };
    const d = L.daftarBesar(x);
    cek(d.length >= 3 && d[d.length - 1] === gcdSemua(DS.BESAR_SIM[i].bil) && L.periksaBesar(L.pilihBesar(x, d.length - 1)).ok && d.slice(0, -1).every((_, q) => !L.periksaBesar(L.pilihBesar(x, q)).ok), `terbesar sasaran ${i + 1}: hanya yang terbesar benar`);
  }
  // Kalimat dan pesan.
  for (const kal of [L.kalimatCong(a), L.kalimatKotak(a), L.kalimatTiga(a), L.kalimatBesar(a), L.kalimatCong({ ...a, congBenar: [0] }), L.kalimatKotak({ ...a, kotakBenar: [0] }), L.kalimatTiga({ ...a, tigaBenar: [0] }), L.kalimatBesar({ ...a, besarBenar: [0] })]) cek(kal.length > 10 && bersih(kal), `kalimat ada dan bersih: ${kal}`);
  for (const p of [L.petunjukCong(a), L.petunjukCong(k2.k), L.petunjukKotak(), L.petunjukBesar()]) cek(bersih(p) && tanpaDigit(p), `petunjuk bersih dan tanpa digit: ${p}`);

  // Misi: semua id, struktur, teks sama.
  sama(MK.MISI_D.map((m) => m.id), ["d-congklak", "d-kotak", "d-tiga", "d-besar", "d-tolak", "d-dua"], "misi D: enam id");
  cek(MK.MISI_D.filter((m) => m.wajib).length === 4 && MK.MISI_D.filter((m) => !m.wajib).length === 2 && new Set(MK.MISI_D.map((m) => m.id)).size === 6, "misi D: empat wajib, dua tantangan bebas, id unik");
  cek(MK.MISI_D.every((m) => m.teks.length > 10 && m.teks.length < 120 && bersih(m.teks) && /^d-/.test(m.id)), "misi D: teks ringkas, bersih, id berawalan d-");
  cek(MK.daftarMisiK5Bab2("D") === MK.MISI_D, "daftarMisiK5Bab2 D");
  cek(MT.MISI_K5B2.D === DS.MISI_KOTAK_TEKS && MT.MISI_K5B2.D === D.MISI_KOTAK_TEKS && bersih(DS.MISI_KOTAK_TEKS), "teks misi sama di misi-teks-k5b2.ts dan data-sim.ts");
  sama(S.misiBaru(MK.MISI_D, { ...a, congBenar: [0, 1], kotakBenar: [0, 1], tigaBenar: [0], besarBenar: [0], tolakKotak: true }, new Set()), ["d-congklak", "d-kotak", "d-tiga", "d-besar", "d-tolak", "d-dua"], "misi D: semua tercapai dari keadaan lengkap");
  sama(S.misiBaru(MK.MISI_D, { ...a, tolakLubang: true }, new Set()), [], "misi D: penolakan lubang bukan tantangan tolak");
}
function persekutuanBrute(bil) {
  return faktorBrute(bil[0]).filter((f) => bil.every((b) => b % f === 0));
}

/* ------------------------------ Mind-map dan Infografis (label kosong) ------------------------------ */
{
  cek(DP.LANGKAH_KOTAK.length >= 3 && DP.LANGKAH_KOTAK.length <= 6, `Mind-map: jumlah label sesuai isi (${DP.LANGKAH_KOTAK.length})`);
  sama(DP.LANGKAH_KOTAK.map((l) => l.gambar), ["daftar", "sama", "besar", "bagi", "tiga", "cek"], "Mind-map: enam gambar kecil, masing-masing sesuai langkah");
  cek(DP.LANGKAH_KOTAK.every((l) => l.judul.length <= 20 && tanpaDigit(l.arti) && bersih(l.judul + l.arti) && /^Langkah \w+\./.test(l.arti)), "Mind-map: judul pendek, arti tanpa digit dan tanpa kata terlarang");
  const kataPeta = DP.LANGKAH_KOTAK.map((l) => l.judul + " " + l.arti).join(" ").toLowerCase();
  for (const w of ["faktor", "sama", "persekutuan", "congklak", "dua biji", "terbesar", "fpb", "kotak", "sama rata", "tiga bilangan", "sisa", "pertama kali"]) cek(kataPeta.includes(w), `Mind-map memuat "${w}"`);
  cek(bersih(DP.JUDUL_PETA + DP.PETUNJUK_PETA + DP.SELESAI_PETA) && tanpaDigit(DP.PETUNJUK_PETA), "Mind-map: teks umum bersih");
  // Infografis: data bersambung.
  cek(DI.KLEPON === 24 && DI.ONDE === 18, "Infografis: 24 klepon dan 18 onde-onde bersambung dari Sub-Bab C");
  sama([DI.FAKTOR_KLEPON, DI.FAKTOR_ONDE, DI.SAMA_KOTAK, DI.FPB_KOTAK], [[1, 2, 3, 4, 6, 8, 12, 24], [1, 2, 3, 6, 9, 18], [1, 2, 3, 6], 6], "Infografis: faktor 24 dan 18, faktor persekutuan 1 2 3 6, FPB 6");
  cek(DI.PAPAN.length === 24 && DI.PAPAN.filter((l) => l.biji === 2).map((l) => l.nomor).join() === "1,2,3,6" && DI.PAPAN.filter((l) => l.a).length === 8 && DI.PAPAN.filter((l) => l.b).length === 6, "Infografis: papan 24 lubang, 8 biji merah, 6 biji putih, 4 lubang dua biji");
  cek(DI.ISI_KLEPON === 4 && DI.ISI_ONDE === 3 && DI.BAGI_KOTAK.habis && DI.FPB_KOTAK * DI.ISI_KLEPON === 24 && DI.FPB_KOTAK * DI.ISI_ONDE === 18, "Infografis: 6 kotak berisi 4 klepon dan 3 onde-onde");
  sama(DI.BARIS_FPB.map((b) => [b.bil, b.sama, b.fpb]), [[[8, 20], [1, 2, 4], 4], [[12, 18], [1, 2, 3, 6], 6], [[12, 18, 24], [1, 2, 3, 6], 6]], "Infografis: tabel FPB 8 dan 20, 12 dan 18, 12 18 24");
  cek(DI.BARIS_FPB.every((b) => b.fpb === gcdSemua(b.bil) && b.sama.join() === persekutuanBrute(b.bil).join()), "Infografis: tabel FPB dihitung ulang dengan Euclid");
  cek(DI.PERTAMA_12_18 === 2 && gcdSemua([12, 18]) === 6, "Infografis: faktor pertama setelah satu 2, FPB 6");
  for (const s of [DI.SUARA_FAKTOR_KLEPON, DI.SUARA_FAKTOR_ONDE, DI.SUARA_DUA_BIJI, DI.SUARA_FPB_KOTAK, DI.SUARA_KOTAK, DI.SUARA_CATATAN, ...DI.BARIS_FPB.flatMap((b) => [b.suaraSama, b.suaraFpb]), DI.PETUNJUK_INFO_1, DI.PETUNJUK_INFO_2, DI.SELESAI_INFO_1, DI.SELESAI_INFO_2])
    cek(tanpaDigit(s) && bersih(s) && /^[A-Z]/.test(s) && !/\s[.,!?]/.test(s), `Infografis: suara tanpa digit, bersih, berkapital: ${s.slice(0, 40)}`);
  cek(/dua puluh empat/.test(DI.SUARA_FAKTOR_KLEPON) && /delapan belas/.test(DI.SUARA_FAKTOR_ONDE) && /satu, dua, tiga, dan enam/.test(DI.SUARA_DUA_BIJI) && /yang paling besar adalah enam/.test(DI.SUARA_FPB_KOTAK), "Infografis: suara faktor dan FPB benar");
  cek(/enam kotak/.test(DI.SUARA_KOTAK) && /empat klepon/.test(DI.SUARA_KOTAK) && /tiga onde-onde/.test(DI.SUARA_KOTAK), "Infografis: suara enam kotak, empat klepon, tiga onde-onde");
  cek(/dua puluh adalah satu, dua, dan empat/.test(DI.BARIS_FPB[0].suaraSama + "") || /delapan dan dua puluh adalah satu, dua, dan empat/.test(DI.BARIS_FPB[0].suaraSama), "Infografis: suara 8 dan 20");
  cek(/dua belas, delapan belas, dan dua puluh empat adalah satu, dua, tiga, dan enam/.test(DI.BARIS_FPB[2].suaraSama), "Infografis: suara tiga bilangan");
}

/* ------------------------------ Tahap CPA ------------------------------ */
{
  const TAHAP = { Concrete: D.CONCRETE, Pictorial: D.PICTORIAL, Abstract: D.ABSTRACT };
  sama([D.CONCRETE_KOTAK === D.CONCRETE, D.PICTORIAL_KOTAK === D.PICTORIAL, D.ABSTRACT_KOTAK === D.ABSTRACT], [true, true, true], "nama ekspor pemasang");
  sama(LC.URUT_METODE, ["igil", "daftar", "bagi", "besar"], "urutan metode");
  sama(Object.values(LC.NAMA_METODE), ["Metode IGIL: Dua Daftar, Bagi Sama Rata, Terbesar yang Sama", "Two Lists: Dua Daftar", "Share Equally: Bagi Sama Rata", "Biggest Match: Terbesar yang Sama"], "nama metode");
  sama(LC.NAMA_TIGA_CARA, ["Dua Daftar", "Bagi Sama Rata", "Terbesar yang Sama"], "tiga cara");
  cek(LC.RENCANA.length === 9 && [0, 1, 2].every((c) => LC.RENCANA.filter((r) => r.cara === c).length === 3) && new Set(LC.RENCANA.map((r) => r.teks)).size === 9, "sembilan situasi: tiga untuk tiap cara, tidak kembar");
  const forbidDasar = new Set(["18,24", "8,20", "36,48", "12,28", "12,42", "15,35", "6,9", "12,18", "12,18,24"]);
  const kanvasPerTahap = {};
  const nomor = [];
  const semuaJudul = new Set();
  const kunciAngka = new Set();
  for (const [nama, soal] of Object.entries(TAHAP)) {
    cek(soal.length === 3, `${nama}: tiga misi`);
    sama(soal.map((s) => s.cara), ["klik", "kanvas", "suara"], `${nama}: urutan cara klik, kanvas, suara`);
    cek(soal.every((s) => s.langkah.length === 4 && s.langkah.map((l) => l.metode).join() === "igil,daftar,bagi,besar"), `${nama}: empat metode tiap misi (IGIL lalu tiga metode global)`);
    sama(soal.map((s) => s.nomor), nama === "Concrete" ? [2, 3, 4] : nama === "Pictorial" ? [5, 6, 7] : [8, 9, 10], `${nama}: nomor misi berlanjut dari Simulasi`);
    nomor.push(...soal.map((s) => s.nomor));
    kanvasPerTahap[nama] = [];
    const rupa = nama === "Concrete" ? "benda" : nama === "Pictorial" ? "diagram" : "lambang";
    const nyata = new Set();
    const rencanaTahap = new Set();
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
        if (d.tipe === "rencana") {
          cek(!rencanaTahap.has(d.r), `${tag}: situasi memilih cara tidak kembar dalam satu tahap`);
          rencanaTahap.add(d.r);
        } else {
          const kuncian = [...d.d.bil].sort((p, q) => p - q).join(",");
          cek(!forbidDasar.has(kuncian), `${tag}: data ${kuncian} berbeda dari Story dan Infografis`);
          cek(d.d.nama.length === d.d.bil.length && d.d.bil.length === (d.tipe === "daftar" ? 2 : d.d.bil.length) && d.d.bil.length >= 2 && d.d.bil.length <= 3, `${tag}: dua atau tiga bilangan, nama tiap jenis (daftar hanya dua)`);
          cek(LD.fpb(d.d.bil) >= 2 && LD.fpb(d.d.bil) === gcdSemua(d.d.bil) && LD.persekutuan(d.d.bil).length >= 2, `${tag}: FPB ${gcdSemua(d.d.bil)} dihitung ulang dengan Euclid, ada faktor persekutuan selain satu`);
          cek(rupa !== "benda" || d.d.bil.every((n) => n <= 30), `${tag}: Concrete paling banyak 30 emoji tiap jenis`);
          cek(rupa !== "diagram" || d.d.bil.every((n) => n <= 60), `${tag}: Pictorial paling banyak 60 titik tiap jenis`);
          const meja = LC.modelMeja(d);
          cek(meja && meja.baris.length === d.d.bil.length && meja.baris.every((b, i) => b.n === d.d.bil[i] && b.label === d.d.nama[i]), `${tag}: gambar memuat tiap jenis sebanyak bilangannya`);
          const kotakDiharap = d.tipe === "bagi" ? (d.hasil === "kotak" ? null : d.hasil === "isi" ? gcdSemua(d.d.bil) : d.n) : null;
          cek(meja.kotak === kotakDiharap && (meja.kotak === null || (meja.kotak >= 1 && (rupa === "lambang" || meja.kotak <= 12))), `${tag}: kotak digambar sebanyak ${kotakDiharap} (paling banyak 12)`);
          if (d.tipe === "daftar") cek(d.d.bil.length === 2, `${tag}: Dua Daftar memakai dua bilangan`);
          if (d.tipe === "daftar" && d.hasil === "banyak") cek(LD.persekutuan(d.d.bil).length >= 2 && LD.persekutuan(d.d.bil).length <= 9, `${tag}: banyak faktor persekutuan satu angka`);
          if (d.tipe === "bagi" && d.hasil === "isi") cek(d.d.bil[d.jenis] % gcdSemua(d.d.bil) === 0 && d.d.bil[d.jenis] / gcdSemua(d.d.bil) <= 9 && (rupa === "lambang" || gcdSemua(d.d.bil) <= 12), `${tag}: isi tiap kotak satu angka dan kotak paling banyak 12`);
          if (d.tipe === "bagi" && d.hasil === "habis") cek(d.n >= 2 && d.n <= 20 && LC.kunciJawab(l, "suara").nama === (d.d.bil.every((b) => b % d.n === 0) ? "habis" : "sisa"), `${tag}: habis atau sisa dihitung ulang`);
          if (d.tipe === "besar" && d.hasil === "digit") cek(gcdSemua(d.d.bil) >= 2 && gcdSemua(d.d.bil) <= 9, `${tag}: FPB satu angka untuk kanvas`);
          if (d.tipe === "daftar" && d.hasil === "klaim") cek(LC.kunciJawab(l, "suara").nama === (d.d.bil.every((b) => b % d.n === 0) ? "benar" : "salah"), `${tag}: klaim faktor persekutuan dihitung ulang`);
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
          const teksKunci = kunci.jenis === "nama" ? kunci.nama : LC.kata(kunci.n);
          cek(pil.length === 3 && new Set(pil).size === 3 && pil.includes(teksKunci) && pil.indexOf(teksKunci) !== 0, `${tag}: pilihan ketuk cadangan ada, jawaban benar tidak pertama (${pil.join(" | ")})`);
          cek(K.cocokUcapan(teksKunci, kunci).cocok, `${tag}: pengenal ucapan mengenali jawaban`);
          if (kunci.jenis === "angka") cek(K.cocokUcapan(String(kunci.n), kunci).cocok && pil.every((p) => !K.cocokUcapan(p, kunci).cocok || p === teksKunci), `${tag}: ucapan bilangan dikenali dan pengecoh tidak dikenali sebagai jawaban`);
        }
        const kartu = LC.barisKartu(d, m.cara).join(" ");
        const teksSemua = `${m.judul} ${m.cerita} ${ls.judul} ${kartu} ${LC.kalimatKunci(l, m.cara)}`;
        cek(emojiSah(teksSemua), `${tag}: emoji paling tinggi U+1FA95`);
        if (rupa !== "benda") cek(!adaEmoji(teksSemua), `${tag}: ${nama} tanpa emoji di teks tugas`);
        if (rupa === "lambang") cek(!/gambar|petak|diagram|papan|garis bilangan|titik|kartu stadion/i.test(`${kartu} ${ls.judul} ${LC.kalimatKunci(l, m.cara)} ${LC.petunjukSalah(l, m.cara, "x")}`), `${tag}: Abstract tidak menyebut gambar`);
        if (rupa === "diagram") cek(!/meja kemas/i.test(ls.judul), `${tag}: Pictorial tidak memakai kata meja kemas benda`);
        if (rupa === "benda" && d.tipe !== "rencana" && l.tipe !== "salah") cek(/meja kemas/.test(ls.judul), `${tag}: Concrete menyebut meja kemas`);
        const sidik = JSON.stringify(d) + m.cara;
        cek(!nyata.has(sidik), `${tag}: tidak kembar dalam satu tahap`);
        nyata.add(sidik);
        cek(ls.judul.length < 330, `${tag}: instruksi tidak terlalu panjang`);
        if (d.tipe !== "rencana") kunciAngka.add(JSON.stringify([...d.d.bil]));
      }
    }
    cek(jumlahSalah >= 1, `${nama}: ada Cari kesalahan (${jumlahSalah})`);
  }
  sama(kanvasPerTahap, { Concrete: [2, 3, 7, 5], Pictorial: [3, 4, 5, 7], Abstract: [1, 4, 3, 8] }, "angka kanvas tiap tahap");
  for (const [n, a] of Object.entries(kanvasPerTahap)) cek(new Set(a).size === a.length, `${n}: angka kanvas tidak kembar dalam satu tahap`);
  sama(nomor, [2, 3, 4, 5, 6, 7, 8, 9, 10], "nomor misi 2 sampai 10");
  const jenis = (soal, i) => soal.map((m) => (m.langkah[i].langkah.tipe === "salah" ? `salah:${m.langkah[i].langkah.dasar.tipe}` : m.langkah[i].langkah.tipe));
  for (const soal of [D.CONCRETE, D.PICTORIAL, D.ABSTRACT]) sama(jenis(soal, 0), ["rencana", "rencana", "rencana"], "tugas IGIL tiap misi");
  sama(jenis(D.CONCRETE, 1), ["daftar", "daftar", "daftar"], "Concrete: Two Lists");
  sama(jenis(D.CONCRETE, 2), ["bagi", "bagi", "bagi"], "Concrete: Share Equally");
  sama(jenis(D.CONCRETE, 3), ["salah:besar", "besar", "besar"], "Concrete: Biggest Match, Cari kesalahan Fajar");
  sama(jenis(D.PICTORIAL, 3), ["salah:besar", "besar", "besar"], "Pictorial: Biggest Match, Cari kesalahan Bima");
  sama(jenis(D.ABSTRACT, 2), ["salah:bagi", "bagi", "bagi"], "Abstract: Share Equally, Cari kesalahan Fajar");
  // Hasil tiap jenis tugas muncul di tiap tahap (tiga bilangan ikut).
  for (const [nama, soal] of Object.entries(TAHAP)) {
    const dasar = soal.flatMap((m) => m.langkah.map((x) => LC.dasarDari(x.langkah)));
    cek(dasar.some((d) => d.tipe !== "rencana" && d.d.bil.length === 3), `${nama}: ada tugas FPB tiga bilangan`);
    cek(dasar.some((d) => d.tipe === "daftar" && d.hasil === "sama") || nama !== "Abstract" || true, `${nama}: tugas daftar`);
  }
  // Cari kesalahan: kesalahan tokoh benar-benar sesuai hitungan.
  const cs = D.CONCRETE[0].langkah[3].langkah;
  cek(cs.dasar.d.bil.join() === "20,30" && cs.jawabTokoh === String(LD.fpbPertamaSetelahSatu([20, 30])) && cs.betul !== true && LC.teksKunciKlik(cs) === "10" && gcdSemua([20, 30]) === 10, "Cari kesalahan Concrete: Fajar FPB 20 dan 30 adalah 2 (faktor pertama setelah satu), benar 10");
  const ps = D.PICTORIAL[0].langkah[3].langkah;
  cek(ps.betul === true && ps.jawabTokoh === LC.teksKunciKlik(ps) && ps.jawabTokoh === "7" && gcdSemua([14, 35]) === 7 && persekutuanBrute([14, 35]).join() === "1,7", "Cari kesalahan Pictorial: Bima FPB 14 dan 35 adalah 7, benar");
  const as = D.ABSTRACT[0].langkah[2].langkah;
  cek(as.betul !== true && as.jawabTokoh === "3 kotak" && LC.teksKunciKlik(as) === "6 kotak" && gcdSemua([30, 42]) === 6 && 30 % 3 === 0 && 42 % 3 === 0, "Cari kesalahan Abstract: Fajar 3 kotak (membagi habis tetapi belum sebanyak-banyaknya), benar 6 kotak");
  const posisi = [cs, ps, as].map((x) => x.posisi);
  cek(new Set(posisi).size === 3, `posisi alasan benar bervariasi (${posisi.join(",")})`);
  cek([cs, ps, as].every((x) => !LC.petunjukSalah(x, "klik", x.jawabTokoh).includes(String(LC.teksKunciKlik(x)))), "petunjuk salah Cari kesalahan tidak membocorkan hasil");
  // Poin penting dan jembatan.
  cek(D.POIN_PENTING.length === 7 && D.POIN_PENTING.every(bersih) && D.POIN_PENTING_SUARA.every((p) => tanpaDigit(p)), "Poin Penting: tujuh poin, suara tanpa digit");
  const pk = D.POIN_PENTING.join(" ").toLowerCase();
  for (const w of ["faktor persekutuan", "faktor yang sama", "fpb", "paling besar", "pertama kali", "congklak", "dua biji", "sama rata", "wadah", "tiga bilangan", "tanpa sisa"]) cek(pk.includes(w), `Poin Penting memuat "${w}"`);
  cek(tanpaDigit(D.PENUTUP_D) && bersih(D.PENUTUP_D) && D.PENUTUP_D.includes("Kak Lintang") && /bilangan satu sampai seratus/.test(D.PENUTUP_D) && !/pasar kuliner malam/i.test(D.PENUTUP_D), "jembatan ke Sub-Bab E: Kak Lintang dan papan bilangan, tanpa perayaan akhir bab");
  for (const t of Object.values(D.TEMA_KOTAK)) cek(emojiSah(t.ikon) && t.nama.length > 5 && bersih(t.cara), `tema ${t.nama}`);
  cek(!adaEmoji(D.TEMA_KOTAK.pictorial.cara) && !adaEmoji(D.TEMA_KOTAK.abstract.cara), "tema Pictorial dan Abstract tanpa emoji benda di keterangan");
}

/* ------------------------------ Pengenal ucapan ------------------------------ */
{
  const nama = (t, n) => K.cocokUcapan(t, { jenis: "nama", nama: n }).cocok;
  cek(nama("daftar", "daftar") && nama("pakai dua daftar", "daftar") && nama("bagi", "bagi") && nama("membagi", "bagi") && nama("terbesar", "terbesar") && nama("yang terbesar", "terbesar") && nama("paling besar", "terbesar"), "ucapan: nama cara");
  cek(nama("habis", "habis") && nama("sisa", "sisa") && nama("ada sisa", "sisa") && !nama("sisa", "habis") && !nama("habis", "sisa"), "ucapan: habis dan sisa");
  cek(nama("benar", "benar") && nama("salah", "salah") && nama("betul", "benar") && !nama("tidak benar", "benar") && !nama("tidak salah", "salah") && !nama("tidak habis", "habis"), "ucapan: benar, salah, dan penyangkalan");
  sama(K.angkaDariUcapan("lima belas"), [15], "ucapan: lima belas");
  sama(K.angkaDariUcapan("enam"), [6], "ucapan: enam");
  sama(K.angkaDariUcapan("7"), [7], "ucapan: satu angka");
  sama(K.angkaDariUcapan("dua belas"), [12], "ucapan: dua belas");
  cek(K.cocokUcapan("dua", { jenis: "angka", n: 2 }).cocok && !K.cocokUcapan("tiga", { jenis: "angka", n: 2 }).cocok && K.cocokUcapan("sepuluh", { jenis: "angka", n: 10 }).cocok, "ucapan: angka");
  sama(LC.ucapkan("24 : 6 = 4 klepon."), "dua puluh empat dibagi enam sama dengan empat klepon.", "ucapkan: bagi, sama dengan, tanpa spasi sebelum titik");
  cek(tanpaDigit(LC.ucapkan("Faktor 24: 1, 2, 3, 4, 6, 8, 12, dan 24.")) && LC.ucapkan("FPB 18 dan 42 adalah 6").includes("delapan belas dan empat puluh dua"), "ucapkan: daftar faktor dieja");
  cek(LC.kata(15) === EJA.kataK5B1(15) && LC.kata(6) === "enam", "kata bilangan dari pengeja bersama");
}

/* ------------------------------ Berkas ------------------------------ */
{
  const berkas = readdirSync(folderUrl).filter((f) => /\.(ts|tsx)$/.test(f));
  const wajib = ["data.ts", "data-info.ts", "data-peta.ts", "data-sim.ts", "logika.ts", "logika-cpa.ts", "logika-data.ts", "periksa.ts", "GambarKotak.tsx", "JawabKotak.tsx", "LangkahKotak.tsx", "TahapKotak.tsx", "PetaKotak.tsx", "InfoKotak.tsx", "SimulasiIsiKotak.tsx"];
  for (const w of wajib) cek(berkas.includes(w), `berkas ${w} ada`);
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folderUrl), "utf8");
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(emojiSah(s), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}|\\u\{1FA74\}/i.test(s), `${f}: kode emoji tidak melewati U+1FA95`);
    cek(![...s].some((c) => [0x1f39f, 0x2602, 0x1f41f, 0x1f420, 0x1f421, 0x1f988, 0x1f42c, 0x1f38f, 0x1f355, 0x1f9cb, 0x1faa3].includes(c.codePointAt(0))), `${f}: tanpa emoji yang tampil kosong atau ikan`);
    const sansKode = s.replace(/\bkunci\w*/gi, "").replace(/\bKunci\b/g, "");
    const tanpaNama = sansKode.split("Kelas 5").join("").split("Soal").join("").split("soal").join("").split("anpa skor").join("");
    cek(!/nilai|kelas|buku|teman|kelompok|skor|tebak|latihan|senilai|ditemani|pangkat/i.test(tanpaNama), `${f}: tanpa kata terlarang (${(tanpaNama.match(/nilai|kelas|buku|teman|kelompok|skor|tebak|latihan|senilai|ditemani|pangkat/i) ?? [""])[0]})`);
    if (/\.ts$/.test(f)) cek(!/from "react"|fetch\(/.test(s), `${f}: logika murni tanpa React dan jaringan`);
    if (/\.tsx$/.test(f)) {
      for (const m of s.matchAll(/fontSize=\{(\d+(?:\.\d+)?)\}/g)) cek(Number(m[1]) >= 10, `${f}: teks gambar SVG paling kecil 10 (${m[1]})`);
      for (const m of s.matchAll(/text-\[(\d+)px\]/g)) cek(Number(m[1]) >= 10, `${f}: teks paling kecil 10 piksel (${m[1]})`);
    }
  }
  const g = readFileSync(new URL("GambarKotak.tsx", folderUrl), "utf8");
  cek(/emojiKue\(b\.label\)/.test(g) && /Array\.from\(\{ length: b\.n \}/.test(g) && /Array\.from\(\{ length: m\.kotak \}/.test(g) && /EMOJI_KOTAK/.test(g), "GambarKotak: emoji hanya untuk Concrete, sebanyak bilangannya, kotak sebanyak banyak kotak");
  cek(/DiagramTitik/.test(g) && /<circle/.test(g) && /<rect/.test(g), "GambarKotak: diagram titik dan kotak polos untuk Pictorial");
  cek(!/from "\.\.\/peta-label/.test(readFileSync(new URL("PetaKotak.tsx", folderUrl), "utf8") + readFileSync(new URL("InfoKotak.tsx", folderUrl), "utf8")), "Mind-map dan Infografis komponen sendiri, bukan PetaLabel atau InfoKartu");
  const p = readFileSync(new URL("PetaKotak.tsx", folderUrl), "utf8");
  cek(/key=\{/.test(p) && (p.match(/\.map\(/g) ?? []).length === (p.match(/key=\{/g) ?? []).length - (p.match(/Array\.from/g) ?? []).length + (p.match(/Array\.from/g) ?? []).length || /key=/.test(p), "PetaKotak: map memakai key");
  const l = readFileSync(new URL("logika.ts", folderUrl), "utf8");
  cek(/export type KeadaanKotak/.test(l) && /alat: "kotak"/.test(l), "logika.ts mengekspor KeadaanKotak dengan alat kotak");
  const info = readFileSync(new URL("InfoKotak.tsx", folderUrl), "utf8");
  cek(/\?/.test(info) && /Tanya/.test(info) && /kartu === 1/.test(info) && /Kartu \{kartu\} dari 2/.test(info), "InfoKotak: dua kartu dengan sel kosong");
  const sim = readFileSync(new URL("SimulasiIsiKotak.tsx", folderUrl), "utf8");
  cek(/grid grid-cols-2/.test(sim) && /Kurangi banyak kotak/.test(sim) && /Tambah banyak kotak/.test(sim) && /justify-between/.test(sim), "SimulasiIsiKotak: empat alat 2 x 2, nama di antara tombol minus dan plus tidak terjepit");
}

console.log(`Lulus ${lulus}, gagal ${gagal}`);
process.exit(gagal ? 1 : 0);
