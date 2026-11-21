// Uji Mind-map (Rak oven Bu Nani), Infografis (loyang Bu Nani dan papan sisa persediaan), Simulasi Sisa Adonan, dan tahap Concrete, Pictorial, Abstract Kelas 5 Bab 3 Sub-Bab C ("Sisa Adonan Bu Nani"),
// akhir cerita Toko Roti Keliling (pengurangan bilangan pecahan: model arsir, penyebut sama, penyebut beda dengan KPK, pisah bulat dan pecahan, hasil disederhanakan, periksa dengan penjumlahan).
// Memeriksa: logika pecahan murni (dihitung ulang dengan cara berbeda: KPK mencoba satu per satu, pecahan lewat desimal), bar loyang digambar sungguh sebanyak data, simulasi (coret dengan alat menolak, samakan, kurang, pisah),
// misi, Mind-map enam label dan Infografis dua kartu dengan data bersambung dari Story, CPA dua belas langkah per tahap (Klik, Kanvas, Suara x empat metode) dengan jawaban beragam dan Cari kesalahan
// di tiap tahap, jawaban benar dihitung ulang dari data, angka tidak kembar per tahap, pengenal ucapan, batas rupa, emoji, kata terlarang, akhir baris.
// Jalankan: node --no-warnings scripts/uji-adonan-k5b3c.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/adonan-k5b3c/logika.ts");
const DS = await import("../src/components/modul/adonan-k5b3c/data-sim.ts");
const DK = await import("../src/components/modul/adonan-k5b3c/data-kartu.ts");
const LC = await import("../src/components/modul/adonan-k5b3c/logika-cpa.ts");
const G = await import("../src/components/modul/adonan-k5b3c/logika-data.ts");
const D = await import("../src/components/modul/adonan-k5b3c/data.ts");
const K = await import("../src/components/modul/adonan-k5b3c/periksa.ts");
const S = await import("../src/components/modul/misi-simulasi.ts");
const MK = await import("../src/components/modul/misi-k5bab3.ts");
const MT = await import("../src/components/modul/misi-teks-k5b3.ts");
const folder = new URL("../src/components/modul/adonan-k5b3c/", import.meta.url);

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
const bersih = (t) => !/buku|kelompok|bernilai|tebak|nilai|kelas|teman|skor|soal|kunci|latihan|senilai|ditemani/i.test(t);
const tanpaDigit = (t) => !/\d/.test(t);
const emojiSah = (s) => [...s].every((c) => c.codePointAt(0) <= 0x1fa95 && c.codePointAt(0) !== 0x200d && c.codePointAt(0) !== 0x1f6de);
const IKAN = [0x1f41f, 0x1f420, 0x1f421, 0x1f988, 0x1f42c, 0x1f38f];
const DILARANG = [0x1fa74, 0x1f39f, 0x2602, 0x1fa9f, 0x1faa3, 0x1f355, 0x1faa1, 0x1f9cb, 0x1fa91];
// Hal di luar buku (desimal, persen, perkalian dan pembagian pecahan, bilangan negatif) tidak dibahas.
const BUKAN_C = /desimal|persen|dikali pecahan|dibagi pecahan|negatif|pangkat/i;
const KATA_PENDEK = (t) => t.split(/\s+/).every((w) => w.replace(/[^a-zA-Z]/g, "").length <= 12);
const GAMBAR = /gambar|petak|kisi|titik|kotak|emoji|diagram|bar pecahan|arsir/i;

/* Pembanding independen: KPK dicari dengan mencoba kelipatan satu per satu, pecahan dibandingkan lewat silang kali. */
const kpkBeda = (a, b) => {
  let m = Math.max(a, b);
  while (m % a !== 0 || m % b !== 0) m += 1;
  return m;
};
const fpbBeda = (a, b) => {
  let g = Math.min(a, b);
  while (a % g !== 0 || b % g !== 0) g -= 1;
  return g;
};
const teksHasilBeda = (b, p, q) => (p === 0 ? `${b}` : b === 0 ? `${p}/${q}` : `${b} ${p}/${q}`);
const sederhanaBeda = (P, q) => {
  const g = fpbBeda(P, q);
  const PP = P / g;
  const qq = q / g;
  const b = Math.floor(PP / qq);
  const sisa = PP - b * qq;
  return sisa === 0 ? { b, p: 0, q: 1 } : { b, p: sisa, q: qq };
};
const kurangBeda = (x, y) => {
  const m = kpkBeda(x.q, y.q);
  const Px = (x.b * x.q + x.p) * (m / x.q);
  const Py = (y.b * y.q + y.p) * (m / y.q);
  return { m, Px, Py, Pn: Px - Py, hasil: sederhanaBeda(Px - Py, m) };
};
const pisahBeda = (x, y) => {
  const m = kpkBeda(x.q, y.q);
  const n = x.p * (m / x.q) - y.p * (m / y.q);
  return { B: x.b - y.b, m, n, hasil: n === 0 ? { b: x.b - y.b, p: 0, q: 1 } : { ...sederhanaBeda(n, m), b: x.b - y.b } };
};
const desimalBil = (x) => x.b + x.p / x.q;
const hampir = (a, b) => Math.abs(a - b) < 1e-9;
const kunciBil = (x, y) => `${x.b}:${x.p}/${x.q}-${y.b}:${y.p}/${y.q}`;

/* ------------------------------ Logika pecahan murni ------------------------------ */
{
  for (const [a, b] of [[4, 6], [3, 4], [2, 5], [6, 9], [8, 12], [5, 7], [10, 4], [2, 8], [12, 18], [9, 6]]) {
    sama([G.kpk(a, b), G.gcd(a, b)], [kpkBeda(a, b), fpbBeda(a, b)], `kpk dan fpb ${a} ${b} sama dengan cara mencoba`);
    cek(G.kpk(a, b) * G.gcd(a, b) === a * b, `kpk x fpb = a x b untuk ${a} ${b}`);
  }
  sama([G.kpk(4, 3), G.kpk(2, 3), G.kpk(4, 8), G.kpk(3, 5)], [12, 6, 8, 15], "kpk contoh buku");
  sama([G.keBiasa(G.bil(4, 4, 5)), G.keBiasa(G.bil(1, 2, 5)), G.keBiasa(G.bil(5, 1, 2)), G.keBiasa(G.bil(0, 3, 4))], [{ P: 24, q: 5 }, { P: 7, q: 5 }, { P: 11, q: 2 }, { P: 3, q: 4 }], "mengubah campuran ke biasa: (bulat x penyebut) + pembilang");
  sama([G.campuranDari(17, 5), G.campuranDari(19, 6), G.campuranDari(4, 6), G.campuranDari(9, 4), G.campuranDari(8, 4), G.campuranDari(5, 12)], [{ b: 3, p: 2, q: 5 }, { b: 3, p: 1, q: 6 }, { b: 0, p: 2, q: 3 }, { b: 2, p: 1, q: 4 }, { b: 2, p: 0, q: 1 }, { b: 0, p: 5, q: 12 }], "pecahan biasa menjadi campuran paling sederhana");
  sama([G.sederhana(4, 10), G.sederhana(3, 12), G.sederhana(5, 8)], [{ P: 2, q: 5 }, { P: 1, q: 4 }, { P: 5, q: 8 }], "menyederhanakan dengan FPB");
  sama([G.teksBil(G.bil(2, 3, 4)), G.teksBil(G.bil(0, 3, 4)), G.teksBil(G.bil(3, 0, 1)), G.teksPec(5, 8)], ["2 3/4", "3/4", "3", "5/8"], "teks lambang pecahan");
  sama([G.bacaTeks("2 3/4"), G.bacaTeks("3/4"), G.bacaTeks("7"), G.bacaTeks("x")], [{ P: 11, q: 4 }, { P: 3, q: 4 }, { P: 7, q: 1 }, null], "membaca teks lambang kembali");
  cek(G.samaBesar("1/2", "3/6") && G.samaBesar("2 1/2", "5/2") && !G.samaBesar("1/3", "1/4"), "pecahan yang sama besar lewat silang kali");
  // Pengurangan: dihitung ulang dengan cara lain (KPK dicoba satu per satu, hasil dibandingkan lewat desimal).
  const PASANG = [
    [G.bil(0, 5, 8), G.bil(0, 2, 8)],
    [G.bil(4, 4, 5), G.bil(1, 2, 5)],
    [G.bil(0, 3, 4), G.bil(0, 1, 3)],
    [G.bil(5, 1, 2), G.bil(2, 1, 3)],
    [G.bil(0, 3, 4), G.bil(0, 1, 6)],
    [G.bil(3, 1, 2), G.bil(1, 1, 4)],
    [G.bil(7, 1, 2), G.bil(3, 1, 6)],
    [G.bil(0, 5, 6), G.bil(0, 1, 4)],
  ];
  for (const [x, y] of PASANG) {
    const a = G.selisihBiasa(x, y);
    const b = kurangBeda(x, y);
    sama([a.m, a.Px, a.Py, a.Pn, a.hasil], [b.m, b.Px, b.Py, b.Pn, b.hasil], `selisih ${kunciBil(x, y)} sama dengan cara mencoba KPK`);
    cek(hampir(desimalBil(x) - desimalBil(y), desimalBil(b.hasil)), `selisih ${kunciBil(x, y)} sama dengan hitungan desimal`);
    cek(G.periksaTambah(x, y), `periksa dengan penjumlahan ${kunciBil(x, y)}`);
    cek(b.hasil.p === 0 || fpbBeda(b.hasil.p, b.hasil.q) === 1, `hasil ${kunciBil(x, y)} sudah paling sederhana`);
  }
  sama([G.selisihBiasa(G.bil(0, 5, 8), G.bil(0, 2, 8)).hasil, G.selisihBiasa(G.bil(0, 3, 4), G.bil(0, 1, 3)).hasil, G.selisihBiasa(G.bil(4, 4, 5), G.bil(1, 2, 5)).hasil, G.selisihBiasa(G.bil(5, 1, 2), G.bil(2, 1, 3)).hasil], [{ b: 0, p: 3, q: 8 }, { b: 0, p: 5, q: 12 }, { b: 3, p: 2, q: 5 }, { b: 3, p: 1, q: 6 }], "empat hasil Story: tiga per delapan, lima per dua belas, tiga dua per lima, tiga satu per enam");
  for (const [x, y] of [[G.bil(4, 4, 5), G.bil(1, 2, 5)], [G.bil(5, 3, 5), G.bil(2, 2, 5)], [G.bil(4, 3, 4), G.bil(2, 1, 6)], [G.bil(7, 1, 2), G.bil(3, 1, 6)]]) {
    const p = G.selisihPisah(x, y);
    const q = pisahBeda(x, y);
    sama([p.B, p.m, p.n, p.hasil], [q.B, q.m, q.n, q.hasil], `pisah ${kunciBil(x, y)} sama dengan cara lain`);
    sama(p.hasil, kurangBeda(x, y).hasil, `pisah dan ubah ke biasa memberi hasil yang sama untuk ${kunciBil(x, y)}`);
  }
  // Pengecoh: beda besar dengan jawaban benar, masuk akal, dan cukup banyak.
  for (const [q, a, c] of [[7, 6, 2], [5, 4, 1], [9, 8, 3], [12, 11, 5], [10, 9, 6]]) {
    const benar = c === c ? `${a - c}/${q}` : "";
    for (const t of G.pengecohIgil(q, a, c)) cek(!G.samaBesar(t, benar) && G.bacaTeks(t).q >= 2, `pengecoh igil ${q} ${a} ${c}: ${t} beda besar dengan ${benar}`);
    cek(G.pengecohIgil(q, a, c).length >= 2, `pengecoh igil ${q} ${a} ${c}: cukup banyak`);
  }
  sama(G.pengecohSama(5, 4, 1)[0], "3/10", "pengecoh sama pertama: penyebut ikut dijumlahkan (kesalahan Fajar)");
  for (const [q, a, c] of [[5, 4, 1], [6, 5, 1], [12, 11, 5], [9, 8, 6], [10, 9, 7]]) {
    const s = sederhanaBeda(a - c, q);
    const benar = teksHasilBeda(0, s.p, s.q);
    for (const t of G.pengecohSama(q, a, c)) cek(!G.samaBesar(t, benar), `pengecoh sama ${q} ${a} ${c}: ${t} beda besar dengan ${benar}`);
    cek(G.pengecohSama(q, a, c).length >= 2, `pengecoh sama ${q} ${a} ${c}: cukup banyak`);
  }

  // Tata gambar: tiap bagian punya kotak sendiri, sebanyak data.
  const bertumpuk = (a, b) => Math.abs(a.x - b.x) < Math.min(a.w, b.w) - 0.01 && Math.abs(a.y - b.y) < Math.min(a.h, b.h) - 0.01;
  const RANGKAIAN = [
    [{ label: "x", strip: [{ q: 7, isi: 4, coret: 2 }] }],
    [{ label: "persediaan", strip: [{ q: 5, isi: 4, coret: 0 }] }, { label: "diambil", strip: [{ q: 5, isi: 1, coret: 0, jenis: "ambil" }] }],
    [{ label: "persediaan", strip: G.stripBil(G.bil(4, 3, 5), "ada") }, { label: "diambil", strip: G.stripBil(G.bil(2, 1, 5), "ambil") }],
    [{ label: "persediaan", strip: G.stripBil(G.bil(4, 1, 2), "ada") }, { label: "diambil", strip: G.stripBil(G.bil(2, 1, 4), "ambil") }],
    [{ label: "", strip: [{ q: 12, isi: 5, coret: 5 }] }],
  ];
  for (const [i, kel] of RANGKAIAN.entries()) {
    const t = G.tataGambar(kel);
    const banyak = kel.flatMap((g) => g.strip).reduce((n, s) => n + s.q, 0);
    cek(t.sel.length === banyak && t.strip === kel.flatMap((g) => g.strip).length, `tata gambar ${i}: bagian digambar sungguh sebanyak data (${t.sel.length} dari ${banyak})`);
    cek(t.sel.every((c) => c.x >= 13.9 && c.x + c.w <= 286.1 && c.y >= 20) && t.tinggi <= 200, `tata gambar ${i}: kotak masuk kanvas dan tinggi muat (${t.tinggi})`);
    cek(t.sel.every((c, j, a) => a.slice(j + 1).every((d) => !bertumpuk(c, d))), `tata gambar ${i}: kotak tidak bertumpuk`);
    const strips = kel.flatMap((g) => g.strip);
    for (const [j, s] of strips.entries()) {
      const sel = t.sel.filter((c) => c.strip === j);
      cek(sel.length === s.q && sel.filter((c) => c.status === "isi" || c.status === "ambil").length === s.isi && sel.filter((c) => c.status === "coret").length === s.coret && sel.filter((c) => c.status === "kosong").length === s.q - s.isi - s.coret, `tata gambar ${i} bar ${j}: isi, coret, dan kosong sesuai data`);
      cek(hampir(sel.reduce((n, c) => n + c.w, 0), G.BAR.panjang), `tata gambar ${i} bar ${j}: tiap bar sama panjang total`);
      cek(sel.every((c) => hampir(c.w, G.BAR.panjang / s.q)), `tata gambar ${i} bar ${j}: bagian sama besar`);
    }
  }
  cek(Object.values(G.IKON_ROTI).every((e) => emojiSah(e) && ![...e].some((c) => DILARANG.includes(c.codePointAt(0)) || IKAN.includes(c.codePointAt(0)))) && G.NAMA_ROTI.length === 6, "ikon roti emoji lama");
  sama(G.stripBil(G.bil(2, 3, 4), "ada"), [{ q: 4, isi: 4, coret: 0, jenis: "ada" }, { q: 4, isi: 4, coret: 0, jenis: "ada" }, { q: 4, isi: 3, coret: 0, jenis: "ada" }], "strip campuran: bulat penuh lalu pecahan");
}

/* ------------------------------ Simulasi: data dan logika ------------------------------ */
{
  cek(DS.TARGET_CORET.length === 3 && DS.TARGET_SAMAKAN.length === 3 && DS.TARGET_KURANG.length === 3 && DS.TARGET_PISAH.length === 3, "simulasi: tiga sasaran tiap alat");
  cek(DS.TARGET_CORET.every((s) => s.q >= 4 && s.q <= 8 && s.c >= 1 && s.c < s.a && s.a <= s.q), "simulasi coret: bagian muat dan pesanan lebih kecil daripada isi");
  cek(DS.TARGET_SAMAKAN.every((s) => s.p !== s.q && s.a / s.p > s.c / s.q && kpkBeda(s.p, s.q) <= 24), "simulasi samakan: penyebut beda, hasil positif, KPK sampai dua puluh empat");
  cek(DS.TARGET_KURANG.every((s) => s.a > s.c && s.a < s.q), "simulasi kurang: pecahan biasa berpenyebut sama");
  cek(DS.TARGET_PISAH.every((s) => s.a1 / s.p >= s.a2 / s.q && s.b1 > s.b2 && pisahBeda({ b: s.b1, p: s.a1, q: s.p }, { b: s.b2, p: s.a2, q: s.q }).n > 0), "simulasi pisah: pecahan pertama tidak lebih kecil dan hasil berpecahan");
  // Data berbeda dari Story, Infografis, dan CPA.
  const kunciSim = [
    ...DS.TARGET_KURANG.map((s) => kunciBil(G.bil(0, s.a, s.q), G.bil(0, s.c, s.q))),
    ...DS.TARGET_SAMAKAN.map((s) => kunciBil(G.bil(0, s.a, s.p), G.bil(0, s.c, s.q))),
    ...DS.TARGET_PISAH.map((s) => kunciBil(G.bil(s.b1, s.a1, s.p), G.bil(s.b2, s.a2, s.q))),
  ];
  const STORY = [kunciBil(G.bil(0, 5, 8), G.bil(0, 2, 8)), kunciBil(G.bil(4, 4, 5), G.bil(1, 2, 5)), kunciBil(G.bil(0, 3, 4), G.bil(0, 1, 3)), kunciBil(G.bil(5, 1, 2), G.bil(2, 1, 3)), kunciBil(G.bil(0, 7, 10), G.bil(0, 3, 10)), kunciBil(G.bil(0, 1, 2), G.bil(0, 1, 3)), kunciBil(G.bil(3, 3, 4), G.bil(1, 1, 4)), kunciBil(G.bil(5, 1, 3), G.bil(2, 1, 3))];
  cek(kunciSim.every((k) => !STORY.includes(k)), "simulasi: bukan data Story atau Infografis");
  cek(tanpaDigit(DS.MISI_ADONAN_TEKS) && bersih(DS.MISI_ADONAN_TEKS) && !BUKAN_C.test(DS.MISI_ADONAN_TEKS) && DS.MISI_ADONAN_TEKS === MT.MISI_K5B3.C && D.MISI_ADONAN_TEKS === DS.MISI_ADONAN_TEKS && DS.MISI_ADONAN_TEKS.length >= 10 && DS.MISI_ADONAN_TEKS.length <= 170, "simulasi: teks misi bersih dan sama dengan misi-teks-k5b3");
  const a0 = L.awalAdonan();
  cek(a0.alat === "adonan" && a0.mode === "coret" && a0.coretPilih.length === 0 && a0.samakanV === 1 && a0.kurangN === -1 && a0.pisahB === -1 && a0.pisahN === -1 && !a0.tolak && a0.salah === 0 && a0.coretBenar.length + a0.samakanBenar.length + a0.kurangBenar.length + a0.pisahBenar.length === 0, "awal: belum ada coretan, penyebut, hasil, atau penolakan");
  sama(L.mulaiLagiAdonan(), a0, "mulai lagi sama dengan awal");
  sama([L.pilihModeAdonan(a0, "pisah").mode, L.kata(34), L.hurufBesar("betul")], ["pisah", "tiga puluh empat", "Betul"], "pilih alat, kata, huruf besar");

  /* Coret */
  {
    const s0 = L.sasaranCoret(a0);
    cek(s0.q === 6 && s0.a === 6 && s0.c === 2, "coret: sasaran pertama");
    const kosong = L.ketukCoret({ ...L.awalAdonan(), coretKe: 1 }, 7);
    cek(kosong.hasil === "kosong" && L.petunjukKosong().includes("menolak") && tanpaDigit(L.petunjukKosong()), "coret: bagian kosong ditolak oleh alat");
    cek(L.ketukCoret(a0, 99).hasil === "abaikan", "coret: ketukan di luar loyang diabaikan");
    const t1 = L.ketukCoret(a0, 0);
    cek(t1.hasil === "coret" && t1.k.coretPilih.join() === "0" && L.ketukCoret(t1.k, 0).hasil === "batal" && L.ketukCoret(t1.k, 0).k.coretPilih.length === 0, "coret: ketuk mencoret, ketuk lagi membatalkan");
    cek(!L.periksaCoret(a0).ok && L.periksaCoret(a0).kosong && /menolak/i.test(L.petunjukCoret(a0)), "coret: Periksa tanpa coretan ditolak");
    const t2 = L.ketukCoret(L.ketukCoret(L.ketukCoret(a0, 0).k, 1).k, 2).k;
    cek(!L.periksaCoret(t2).ok && L.periksaCoret(t2).k.salah === 1 && /terlalu banyak/i.test(L.petunjukCoret(t2)), "coret: terlalu banyak dicoret belum benar");
    const t3 = L.ketukCoret(t1.k, 1).k;
    const r3 = L.periksaCoret(t3);
    cek(r3.ok && r3.k.coretBenar.join() === "0" && r3.k.coretKe === 1 && r3.k.coretPilih.length === 0, "coret: dua bagian dicoret sesuai pesanan diterima, sasaran berikutnya");
    DS.TARGET_CORET.forEach((s, i) => {
      let k = { ...L.awalAdonan(), coretKe: i };
      for (let j = 0; j < s.c; j += 1) k = L.ketukCoret(k, j).k;
      const r = L.periksaCoret(k);
      cek(r.ok && r.k.coretKe === i + 1, `coret: sasaran ${i} benar bila banyak coretan sama dengan pesanan`);
      cek(L.kalimatCoretBenar(s) === `Betul! Dari ${L.kata(s.q)} bagian, ${L.kata(s.a)} berisi dan ${L.kata(s.c)} diambil, jadi tinggal ${L.kata(s.a - s.c)} bagian.` && tanpaDigit(L.kalimatCoretBenar(s)), `coret: kalimat benar sasaran ${i}`);
      cek(s.a - s.c >= 1, `coret: sasaran ${i} masih menyisakan adonan`);
    });
    cek(L.sasaranCoret({ ...a0, coretKe: 3 }).q === 6, "coret: sasaran berulang sesudah yang terakhir");
  }
  /* Samakan */
  {
    const k0 = a0;
    const s0 = L.sasaranSamakan(k0);
    cek(s0.p === 3 && s0.q === 5 && L.kpkSamakan(s0) === 15, "samakan: sasaran pertama dengan KPK lima belas");
    const tolak = L.kurangkanSamakan(k0);
    cek(tolak.hasil === "tolak" && tolak.k.tolak === true && /menolak/i.test(L.petunjukTolakSamakan()) && tanpaDigit(L.petunjukTolakSamakan()), "samakan: penyebut yang belum bisa dibagi kedua penyebut ditolak dan menandai tantangan menolak");
    cek(L.ubahSamakan({ ...k0, samakanV: 40 }, 1).samakanV === 40 && L.ubahSamakan(k0, -1).samakanV === 1 && L.ubahSamakan(k0, 1).samakanV === 2, "samakan: penyebut bersama antara satu dan empat puluh");
    const kali = L.kurangkanSamakan({ ...k0, samakanV: 30 });
    cek(kali.hasil === "bukanKpk" && !kali.k.tolak && tanpaDigit(L.petunjukBukanKpk()), "samakan: kelipatan persekutuan yang bukan KPK diminta diganti tanpa menandai penolakan");
    DS.TARGET_SAMAKAN.forEach((s, i) => {
      const k = { ...L.awalAdonan(), samakanKe: i, samakanV: kpkBeda(s.p, s.q) };
      const r = L.kurangkanSamakan(k);
      cek(r.hasil === "benar" && r.k.samakanKe === i + 1 && r.k.samakanV === 1 && r.k.samakanBenar.includes(i), `samakan: sasaran ${i} benar pada KPK ${kpkBeda(s.p, s.q)}`);
      const h = kurangBeda({ b: 0, p: s.a, q: s.p }, { b: 0, p: s.c, q: s.q });
      const kal = L.kalimatSamakanBenar(s);
      cek(/^Betul! /.test(kal) && tanpaDigit(kal) && kal.includes(`${L.kata(h.Px)} per ${L.kata(h.m)} dikurangi ${L.kata(h.Py)} per ${L.kata(h.m)} sama dengan ${L.kata(h.Pn)} per ${L.kata(h.m)}`), `samakan: kalimat benar sasaran ${i}`);
    });
  }
  /* Kurang */
  {
    cek(L.ubahKurang(a0, -1).kurangN === 0 && L.ubahKurang(a0, 1).kurangN === 0 && L.ubahKurang({ ...a0, kurangN: L.sasaranKurang(a0).q }, 1).kurangN === L.sasaranKurang(a0).q, "kurang: pembilang hasil antara nol dan penyebut (awal belum diatur)");
    cek(!L.periksaKurang(a0).ok && /menolak/i.test(L.petunjukKurang(a0)) && tanpaDigit(L.petunjukKurang(a0)), "kurang: Periksa tanpa mengatur ditolak");
    DS.TARGET_KURANG.forEach((s, i) => {
      const kBenar = { ...L.awalAdonan(), kurangKe: i, kurangN: s.a - s.c };
      const kSalah = { ...L.awalAdonan(), kurangKe: i, kurangN: s.a - s.c + 1 };
      cek(L.periksaKurang(kBenar).ok && L.periksaKurang(kBenar).k.kurangKe === i + 1 && !L.periksaKurang(kSalah).ok && L.periksaKurang(kSalah).k.salah === 1, `kurang: sasaran ${i} benar hanya pada pembilang ${s.a - s.c}`);
    });
  }
  /* Pisah */
  {
    cek(L.ubahPisahB(a0, 1).pisahB === 0 && L.ubahPisahB({ ...a0, pisahB: 9 }, 1).pisahB === 9 && L.ubahPisahN(a0, 1).pisahN === 0 && L.ubahPisahN({ ...a0, pisahN: 40 }, 1).pisahN === L.penyebutPisah(L.sasaranPisah(a0)), "pisah: bulat sampai sembilan, pembilang sampai penyebut bersama");
    cek(!L.periksaPisah(a0).ok && !L.periksaPisah({ ...a0, pisahB: 2 }).ok && /menolak/i.test(L.petunjukPisah(a0)) && tanpaDigit(L.petunjukPisah(a0)), "pisah: Periksa sebelum bulat dan pembilang diatur ditolak");
    DS.TARGET_PISAH.forEach((s, i) => {
      const h = pisahBeda({ b: s.b1, p: s.a1, q: s.p }, { b: s.b2, p: s.a2, q: s.q });
      sama(L.hasilPisah(s), { B: h.B, n: h.n, m: h.m }, `pisah: hasil sasaran ${i} dihitung ulang`);
      cek(L.penyebutPisah(s) === kpkBeda(s.p, s.q), `pisah: penyebut bersama sasaran ${i} adalah KPK`);
      const kBenar = { ...L.awalAdonan(), pisahKe: i, pisahB: h.B, pisahN: h.n };
      const kSalah = { ...L.awalAdonan(), pisahKe: i, pisahB: h.B + 1, pisahN: h.n };
      cek(L.periksaPisah(kBenar).ok && L.periksaPisah(kBenar).k.pisahKe === i + 1 && !L.periksaPisah(kSalah).ok, `pisah: sasaran ${i} benar pada ${h.B} dan ${h.n} per ${h.m}`);
    });
  }
  /* Misi */
  {
    const dC = MK.daftarMisiK5Bab3("C");
    sama(dC.map((m) => m.id), ["c-coret", "c-samakan", "c-kurang", "c-pisah", "c-tolak", "c-dua"], "misi: id");
    cek(dC.filter((m) => m.wajib).length === 4 && dC.filter((m) => !m.wajib).length === 2, "misi: empat wajib dan dua bebas");
    cek(S.misiBaru(dC, a0, new Set()).length === 0, "misi: keadaan awal tidak memenuhi misi");
    cek(dC.every((m) => !m.cek({ alat: "kerangka" })) && dC.every((m) => !m.cek({ alat: "timbang" })) && dC.every((m) => !m.cek({ alat: "loyang" })), "misi: alat lain tidak memenuhi misi");
    cek(dC.every((m) => tanpaDigit(m.teks) && bersih(m.teks) && !BUKAN_C.test(m.teks) && m.teks.length > 10 && m.teks.length < 120), "misi: teks tanpa digit, kata terlarang, dan hal di luar buku");
    sama(S.misiBaru(dC, { ...a0, coretBenar: [0] }, new Set()), ["c-coret"], "misi: coret");
    sama(S.misiBaru(dC, { ...a0, samakanBenar: [0] }, new Set()), ["c-samakan"], "misi: samakan");
    sama(S.misiBaru(dC, { ...a0, kurangBenar: [0] }, new Set()), ["c-kurang"], "misi: kurang");
    sama(S.misiBaru(dC, { ...a0, pisahBenar: [0] }, new Set()), ["c-pisah"], "misi: pisah");
    sama(S.misiBaru(dC, { ...a0, tolak: true }, new Set()), ["c-tolak"], "misi: tolak");
    sama(S.misiBaru(dC, { ...a0, coretBenar: [0, 1] }, new Set()), ["c-coret", "c-dua"], "misi: dua loyang coret benar");
    // Hanya penolakan Kurangkan pada alat Samakan yang menghitung tantangan menolak.
    cek(S.misiBaru(dC, L.ketukCoret({ ...L.awalAdonan(), coretKe: 1 }, 7).k, new Set()).length === 0 && S.misiBaru(dC, L.periksaKurang(a0).k, new Set()).length === 0 && S.misiBaru(dC, L.periksaPisah(a0).k, new Set()).length === 0 && S.misiBaru(dC, { ...a0, salah: 3 }, new Set()).length === 0, "misi: penolakan alat lain dan percobaan keliru bukan tantangan menolak");
    sama(S.misiBaru(dC, L.kurangkanSamakan(a0).k, new Set()), ["c-tolak"], "misi: penolakan Kurangkan menghitung tantangan menolak");
  }
}

/* ------------------------------ Mind-map dan Infografis ------------------------------ */
{
  const n = DK.LANGKAH_ADONAN.length;
  cek(n >= 3 && n <= 6 && n === 6, `mind-map: jumlah label 3 sampai 6, enam untuk Sub-Bab ini (${n})`);
  const arti = DK.LANGKAH_ADONAN.map((l) => l.arti).join(" ");
  const judulSemua = DK.LANGKAH_ADONAN.map((l) => l.judul).join(" | ");
  cek([...DK.LANGKAH_ADONAN.map((l) => l.judul), ...DK.LANGKAH_ADONAN.map((l) => l.arti), DK.PETUNJUK_PETA_ADONAN, DK.SELESAI_PETA_ADONAN, DK.JUDUL_PETA_ADONAN].every((t) => tanpaDigit(t) && bersih(t) && !BUKAN_C.test(t)), "mind-map: tanpa digit, kata terlarang, dan hal di luar buku");
  cek(DK.LANGKAH_ADONAN.every((l) => l.judul.length <= 26 && KATA_PENDEK(l.judul)), "mind-map: judul langkah pendek, tiap kata paling banyak dua belas huruf (muat di 344 px)");
  const URUT = ["satu", "dua", "tiga", "empat", "lima", "enam"];
  cek(DK.LANGKAH_ADONAN.every((l, i) => l.arti.startsWith(`Langkah ${URUT[i]}.`)), "mind-map: arti dibacakan berurut");
  for (const m of ["penyebutnya sama", "samakan dulu", "kelipatan persekutuan terkecil", "pecahan yang sama besar", "angka di atas", "angka di bawah tetap", "bilangan bulatnya sendiri", "pecahan biasa", "pecahan campuran", "bagi pembilang dan penyebut", "penjumlahan", "kembali ke pecahan semula"]) cek(arti.toLowerCase().includes(m), `mind-map: langkah menyebut "${m}"`);
  for (const m of ["Cek", "Samakan", "Kurangi", "Pisah", "Sederhanakan", "Periksa"]) cek(judulSemua.includes(m), `mind-map: label ${m}`);
  cek(DK.LANGKAH_ADONAN.every((l) => emojiSah(l.ikon)) && new Set(DK.LANGKAH_ADONAN.map((l) => l.ikon)).size === n && emojiSah(DK.IKON_JUDUL_PETA_ADONAN), "mind-map: ikon berbeda, emoji sah");

  /* Infografis: data bersambung dari Story (lima per delapan, tepung campuran, tiga per empat dan satu per tiga, lima bulat satu per dua). */
  sama([DK.ARSIR, DK.TEPUNG_X, DK.TEPUNG_Y, DK.BEDA_X, DK.BEDA_Y, DK.CAMPUR_X, DK.CAMPUR_Y], [{ q: 8, a: 5, c: 2 }, { b: 4, p: 4, q: 5 }, { b: 1, p: 2, q: 5 }, { b: 0, p: 3, q: 4 }, { b: 0, p: 1, q: 3 }, { b: 5, p: 1, q: 2 }, { b: 2, p: 1, q: 3 }], "infografis: kontrak data dari Story");
  const T = kurangBeda(DK.TEPUNG_X, DK.TEPUNG_Y);
  const TP = pisahBeda(DK.TEPUNG_X, DK.TEPUNG_Y);
  const B = kurangBeda(DK.BEDA_X, DK.BEDA_Y);
  const C = kurangBeda(DK.CAMPUR_X, DK.CAMPUR_Y);
  sama([T.Px, T.Py, T.Pn, TP.B, TP.n, teksHasilBeda(T.hasil.b, T.hasil.p, T.hasil.q)], [24, 7, 17, 3, 2, "3 2/5"], "infografis: tepung 24/5 - 7/5 = 17/5 = 3 2/5 dan cara pisah 3 dan 2/5 (dihitung ulang)");
  sama([B.m, B.Px, B.Py, B.Pn], [12, 9, 4, 5], "infografis: tiga per empat dikurangi satu per tiga dengan KPK dua belas");
  sama([C.m, C.Px, C.Py, C.Pn, teksHasilBeda(C.hasil.b, C.hasil.p, C.hasil.q)], [6, 33, 14, 19, "3 1/6"], "infografis: campuran beda penyebut 33/6 - 14/6 = 19/6 = 3 1/6");
  sama(DK.SEL_KARTU1.map((s) => s.kunci), ["syarat", "arsir", "cara1", "cara2"], "infografis kartu 1: empat sel");
  sama(DK.SEL_KARTU2.map((s) => s.kunci), ["kpk", "beda", "ubah", "samakan", "sederhana", "periksa"], "infografis kartu 2: enam sel");
  sama(DK.SEL_ARSIR.baris, ["5/8 - 2/8", "= 3/8"], "infografis: model arsir 5/8 - 2/8 = 3/8");
  sama(DK.SEL_CARA1.baris, ["24/5 - 7/5", "= 17/5", "= 3 2/5"], "infografis: cara 1 ubah ke biasa");
  sama(DK.SEL_CARA2.baris, ["4 - 1 = 3", "4/5 - 2/5 = 2/5", "= 3 2/5"], "infografis: cara 2 pisah bulat dan pecahan");
  sama(DK.SEL_KPK.baris, ["KPK 4 dan 3 = 12", "3/4 = 9/12; 1/3 = 4/12"], "infografis: KPK empat dan tiga");
  sama(DK.SEL_BEDA.baris, ["9/12 - 4/12", "= 5/12"], "infografis: sembilan per dua belas dikurangi empat per dua belas");
  sama(DK.SEL_UBAH.baris, ["5 1/2 = 11/2", "2 1/3 = 7/3"], "infografis: ubah campuran ke biasa");
  sama(DK.SEL_SAMAKAN.baris, ["33/6 - 14/6", "= 19/6"], "infografis: samakan ke enam");
  sama(DK.SEL_SEDERHANA.baris, ["19/6", "= 3 1/6"], "infografis: pecahan tak murni menjadi campuran");
  sama(DK.SEL_PERIKSA.baris, ["5/12 + 4/12", "= 9/12 = 3/4"], "infografis: periksa dengan penjumlahan kembali ke tiga per empat");
  cek(hampir(5 / 12 + 4 / 12, 3 / 4) && 5 + 4 === 9 && fpbBeda(9, 12) === 3, "infografis: periksa dengan penjumlahan dihitung ulang");
  const semuaSel = [...DK.SEL_KARTU1, ...DK.SEL_KARTU2];
  cek(new Set(semuaSel.map((s) => s.kunci)).size === semuaSel.length, "infografis: kunci sel unik");
  for (const s of semuaSel) cek(s.suara.length > 20 && tanpaDigit(s.suara) && bersih(s.suara) && !BUKAN_C.test(s.suara) && s.aria.length > 5 && bersih(s.aria), `infografis ${s.kunci}: suara tanpa digit (${s.suara})`);
  cek(/dua puluh empat per lima dikurangi tujuh per lima sama dengan tujuh belas per lima/.test(DK.SEL_CARA1.suara) && /tiga bulat dua per lima kilogram/.test(DK.SEL_CARA1.suara) && /empat dikurangi satu sama dengan tiga/.test(DK.SEL_CARA2.suara) && /sembilan per dua belas dikurangi empat per dua belas sama dengan lima per dua belas/.test(DK.SEL_BEDA.suara) && /tiga puluh tiga per enam dikurangi empat belas per enam sama dengan sembilan belas per enam/.test(DK.SEL_SAMAKAN.suara) && /sembilan belas per enam menjadi pecahan campuran tiga bulat satu per enam/.test(DK.SEL_SEDERHANA.suara) && /lima per dua belas ditambah empat per dua belas sama dengan sembilan per dua belas, yaitu tiga per empat/.test(DK.SEL_PERIKSA.suara), "infografis: suara pecahan dieja benar");
  cek([DK.PETUNJUK1_INFO_ADONAN, DK.SELESAI1_INFO_ADONAN, DK.PETUNJUK2_INFO_ADONAN, DK.SELESAI2_INFO_ADONAN].every((t) => tanpaDigit(t) && bersih(t) && !BUKAN_C.test(t)), "infografis: petunjuk dan pesan tanpa digit dan hal di luar buku");
  // Infografis memuat semua topik inti Sub-Bab C.
  const semuaSuara = semuaSel.map((s) => s.suara).join(" ").toLowerCase();
  for (const m of ["penyebut kedua pecahan harus sama", "model arsir", "dicoret", "penyebut tetap", "cara pertama, ubah ke pecahan biasa", "cara kedua, pisahkan bilangan bulat dan pecahan", "kelipatan persekutuan terkecil", "sama besar", "kurangkan pembilangnya", "pecahan campuran", "disederhanakan", "periksa dengan penjumlahan"]) cek(semuaSuara.includes(m.toLowerCase()), `infografis memuat topik "${m}"`);
}

/* ------------------------------ CPA: tiga tahap ------------------------------ */
const TAHAP = [
  ["Concrete", D.CONCRETE, "benda"],
  ["Pictorial", D.PICTORIAL, "diagram"],
  ["Abstract", D.ABSTRACT, "lambang"],
];
{
  cek(D.CONCRETE_ADONAN === D.CONCRETE && D.PICTORIAL_ADONAN === D.PICTORIAL && D.ABSTRACT_ADONAN === D.ABSTRACT, "nama ekspor untuk pemasang");
  cek(D.TEMA_ADONAN.concrete.nama === "Concrete" && D.TEMA_ADONAN.pictorial.nama === "Pictorial" && D.TEMA_ADONAN.abstract.nama === "Abstract", "tema tiga tahap");
  sama(D.CONCRETE.map((s) => s.nomor), [2, 3, 4], "nomor misi Concrete lanjut dari simulasi");
  sama(D.PICTORIAL.map((s) => s.nomor), [5, 6, 7], "nomor misi Pictorial");
  sama(D.ABSTRACT.map((s) => s.nomor), [8, 9, 10], "nomor misi Abstract");
  sama([LC.kataBil(0), LC.kataBil(85), LC.kataBil(100), LC.ucapkan("5/8 - 2/8 = 3/8"), LC.ucapkan("4 3/4 - 2 1/6"), LC.ucapkan("KPK 12")], ["nol", "delapan puluh lima", "seratus", "lima per delapan dikurangi dua per delapan sama dengan tiga per delapan", "empat bulat tiga per empat dikurangi dua bulat satu per enam", "kelipatan persekutuan terkecil dua belas"], "kata bilangan dan ucapan pecahan tanpa digit");
  sama([LC.kataPec(3, 4), LC.kataCampuran({ b: 2, p: 3, q: 4 }), LC.kataCampuran({ b: 2, p: 0, q: 1 })], ["tiga per empat", "dua bulat tiga per empat", "dua"], "kata pecahan dan campuran");
  // Jawaban dihitung ulang dari data dengan cara lain (KPK dicoba satu per satu, hasil lewat silang kali dan desimal).
  const hitung = (d, cara) => {
    switch (d.tipe) {
      case "igil":
        return cara === "klik" ? `${d.a - d.c}/${d.q}` : cara === "kanvas" ? d.a - d.c : d.c;
      case "sama": {
        const s = sederhanaBeda(d.a - d.c, d.q);
        return cara === "klik" ? teksHasilBeda(0, s.p, s.q) : cara === "kanvas" ? d.a - d.c : d.c;
      }
      case "samakan": {
        const r = kurangBeda(d.x, d.y);
        return cara === "klik" ? teksHasilBeda(r.hasil.b, r.hasil.p, r.hasil.q) : cara === "kanvas" ? r.m : r.Pn;
      }
      case "pisah": {
        const r = pisahBeda(d.x, d.y);
        return cara === "klik" ? teksHasilBeda(r.hasil.b, r.hasil.p, r.hasil.q) : cara === "kanvas" ? r.B : r.n;
      }
    }
  };
  const BILANGAN_STORY = [
    kunciBil(G.bil(0, 5, 8), G.bil(0, 2, 8)),
    kunciBil(G.bil(4, 4, 5), G.bil(1, 2, 5)),
    kunciBil(G.bil(0, 3, 4), G.bil(0, 1, 3)),
    kunciBil(G.bil(5, 1, 2), G.bil(2, 1, 3)),
    kunciBil(G.bil(0, 7, 10), G.bil(0, 3, 10)),
    kunciBil(G.bil(0, 1, 2), G.bil(0, 1, 3)),
    kunciBil(G.bil(3, 3, 4), G.bil(1, 1, 4)),
    kunciBil(G.bil(5, 1, 3), G.bil(2, 1, 3)),
  ];
  const kunciTugas = (d) => (d.tipe === "igil" ? `igil:${d.q}:${d.a}:${d.c}` : d.tipe === "sama" ? kunciBil(G.bil(0, d.a, d.q), G.bil(0, d.c, d.q)) : kunciBil(d.x, d.y));
  const semuaKunci = [];
  const jumlahJenis = { benar: 0, keliru: 0 };
  for (const [nama, soal, rupa] of TAHAP) {
    sama(soal.map((s) => s.cara), ["klik", "kanvas", "suara"], `${nama}: tiga cara menjawab`);
    const kanvas = [];
    const suaraAngka = [];
    let adaSalah = 0;
    const kunciTahap = [];
    const posisiKlik = new Set();
    for (const s of soal) {
      cek(s.langkah.length === 4 && s.langkah.map((q) => q.metode).join() === "igil,sama,samakan,pisah", `${nama} misi ${s.nomor}: empat metode IGIL, Take Away the Tops, Match and Take Away, Split Whole and Part`);
      cek(bersih(s.judul) && bersih(s.cerita) && tanpaDigit(s.cerita) && !BUKAN_C.test(s.judul + s.cerita), `${nama} misi ${s.nomor}: judul dan cerita bersih`);
      cek(s.judul.startsWith(`Misi Adonan ${s.nomor}:`), `${nama} misi ${s.nomor}: judul berawalan Misi Adonan`);
      for (const q of s.langkah) {
        const l = q.langkah;
        const d = LC.dasarDari(l);
        const kunci = LC.kunciJawab(l, s.cara);
        cek(kunci !== null, `${nama} misi ${s.nomor} ${q.metode}: ada jawaban untuk cara ${s.cara}`);
        cek(LC.siapLangsung(l, rupa, s.cara) === (l.tipe !== "salah"), `${nama} misi ${s.nomor} ${q.metode}: siap langsung kecuali Cari kesalahan`);
        cek(q.suara === q.judul && tanpaDigit(q.suara) && bersih(q.suara) && !BUKAN_C.test(q.suara), `${nama} misi ${s.nomor} ${q.metode}: instruksi tanpa digit, kata terlarang, dan hal di luar buku (${q.suara})`);
        cek(emojiSah(q.suara) && emojiSah(q.judul), `${nama} misi ${s.nomor}: emoji sah`);
        cek(/^[A-Z]/.test(q.suara) && q.suara.split(/(?<=[.?!]) /).every((k) => /^[A-Z]/.test(k)), `${nama} misi ${s.nomor} ${q.metode}: tiap kalimat soal berkapital`);
        if (rupa === "lambang") cek(!GAMBAR.test(q.suara), `${nama} misi ${s.nomor} ${q.metode}: tahap Abstract tanpa menyebut gambar, petak, atau kisi`);
        cek(d.tipe === q.metode, `${nama} misi ${s.nomor}: metode ${q.metode} memakai tugas ${q.metode}`);
        // Data sah dan bukan data Story.
        const kt = kunciTugas(d);
        kunciTahap.push(kt);
        semuaKunci.push(kt);
        cek(!BILANGAN_STORY.includes(kt), `${nama} misi ${s.nomor} ${q.metode}: bukan data Story atau Infografis (${kt})`);
        if (d.tipe === "igil") {
          cek(d.q >= 4 && d.q <= (rupa === "benda" ? 9 : 12) && d.c >= 1 && d.c < d.a && d.a <= d.q && LC.hitungTugas(d).kanvas >= 1, `${nama} misi ${s.nomor}: igil sah dan muat digambar`);
          cek(G.NAMA_ROTI.includes(d.item), `${nama} misi ${s.nomor}: igil memakai roti yang dikenal (${d.item})`);
        }
        if (d.tipe === "sama") {
          cek(d.q >= 4 && d.c >= 1 && d.a > d.c && d.a < d.q && d.q <= 12, `${nama} misi ${s.nomor}: sama berpenyebut sama dan pecahan biasa`);
          cek(rupa === "benda" ? d.satuan === "loyang" : ["kilogram", "liter", "meter"].includes(d.satuan), `${nama} misi ${s.nomor}: satuan tertulis (${d.satuan})`);
        }
        if (d.tipe === "samakan" || d.tipe === "pisah") {
          cek(d.x.q !== d.y.q || d.tipe === "pisah", `${nama} misi ${s.nomor} ${q.metode}: samakan memakai penyebut beda`);
          cek(desimalBil(d.x) > desimalBil(d.y), `${nama} misi ${s.nomor} ${q.metode}: hasil positif`);
          cek(rupa === "benda" ? d.satuan === "loyang" : ["kilogram", "liter", "meter"].includes(d.satuan), `${nama} misi ${s.nomor}: satuan tertulis (${d.satuan})`);
          if (d.tipe === "pisah") {
            cek(d.x.p * d.y.q >= d.y.p * d.x.q && d.x.b > d.y.b && d.y.b >= 1 && pisahBeda(d.x, d.y).n > 0, `${nama} misi ${s.nomor}: pisah tanpa meminjam dan hasil berpecahan`);
            if (rupa !== "lambang") cek(d.x.b + (d.x.p > 0 ? 1 : 0) + d.y.b + (d.y.p > 0 ? 1 : 0) <= 8, `${nama} misi ${s.nomor}: bar pisah muat (paling banyak delapan bar)`);
          }
          if (d.tipe === "samakan" && (d.x.b > 0 || d.y.b > 0)) cek(s.cara === "klik", `${nama} misi ${s.nomor}: samakan campuran hanya pada tugas klik`);
          cek(kpkBeda(d.x.q, d.y.q) <= 12, `${nama} misi ${s.nomor} ${q.metode}: KPK kecil`);
        }
        // Jawaban dihitung dari data.
        const h = hitung(d, s.cara);
        sama(kunci, typeof h === "number" ? { jenis: "angka", n: h } : { jenis: "nama", nama: h }, `${nama} ${d.tipe} cara ${s.cara}: jawaban benar dihitung dari data`);
        // Pilihan klik.
        if (s.cara === "klik") {
          const pk = LC.pilihanKlik(l);
          cek(pk.length === 3 && new Set(pk).size === 3, `${nama} misi ${s.nomor} ${q.metode}: tiga pilihan klik berbeda (${pk.join(" | ")})`);
          cek(pk.includes(kunci.nama) && pk[0] !== kunci.nama, `${nama} misi ${s.nomor} ${q.metode}: jawaban benar ada dan tidak di tombol pertama`);
          cek(LC.teksKunciKlik(l) === kunci.nama, `${nama} misi ${s.nomor} ${q.metode}: teks jawaban klik`);
          posisiKlik.add(pk.indexOf(kunci.nama));
          if (l.tipe === "salah") cek(pk.includes(l.jawabTokoh), `${nama} misi ${s.nomor}: jawaban tokoh ada di pilihan`);
          cek(pk.every((x) => emojiSah(x) && bersih(x) && KATA_PENDEK(x) && x.length <= 12 && G.bacaTeks(x) !== null), `${nama} misi ${s.nomor} ${q.metode}: pilihan berupa pecahan atau campuran yang pendek (${pk.join(" | ")})`);
          // Hanya satu pilihan yang sama besar dengan hasil yang dihitung ulang.
          const benarBesar = typeof h === "string" ? h : "";
          sama(pk.map((x) => G.samaBesar(x, benarBesar)), pk.map((x) => x === kunci.nama), `${nama} misi ${s.nomor} ${q.metode}: hanya satu pilihan yang sama besar dengan hasil`);
          // Pengecoh yang tampak benar (belum disederhanakan) tidak jadi pilihan: tiap pilihan sudah paling sederhana atau memang bukan hasilnya.
          cek(pk.every((x) => { const b = G.bacaTeks(x); return b.q >= 2 || /^\d+$/.test(x); }), `${nama} misi ${s.nomor} ${q.metode}: pilihan bermakna`);
        }
        if (s.cara === "suara") {
          const pk = LC.pilihanSuara(l, s.cara);
          const teksBenar = LC.teksKunciPilihan(kunci);
          cek(kunci.jenis === "angka" && kunci.n >= 1 && kunci.n <= 9, `${nama} misi ${s.nomor} ${q.metode}: jawaban suara satu angka (${kunci.n})`);
          cek(pk.length === 3 && new Set(pk).size === 3 && pk.includes(teksBenar) && pk[0] !== teksBenar, `${nama} misi ${s.nomor} ${q.metode}: pilihan ketuk cadangan suara (${pk.join(" | ")})`);
          cek(K.cocokUcapan(teksBenar, kunci).cocok && K.cocokUcapan(String(kunci.n), kunci).cocok, `${nama} misi ${s.nomor}: pengenal ucapan mengenali jawaban`);
          cek(tanpaDigit(pk.join(" ")), `${nama} misi ${s.nomor}: pilihan suara tanpa digit`);
          cek(pk.filter((x) => x !== teksBenar).every((x) => !K.cocokUcapan(x, kunci).cocok), `${nama} misi ${s.nomor}: pilihan salah tidak dikenali sebagai jawaban benar`);
          cek(pk.every((x) => K.angkaDariUcapan(x).length === 1), `${nama} misi ${s.nomor}: semua pilihan suara dikenali pengenal ucapan`);
          if (kunci.jenis === "angka") suaraAngka.push(kunci.n);
        }
        if (s.cara === "kanvas") {
          cek(kunci.jenis === "angka" && kunci.n >= 1 && kunci.n <= 9, `${nama} misi ${s.nomor} ${q.metode}: kanvas satu angka satu sampai sembilan (${kunci.n})`);
          kanvas.push(kunci.n);
          cek(LC.pilihanSuara(l, s.cara).length === 0, `${nama} misi ${s.nomor}: kanvas tanpa pilihan suara`);
        }
        // Kalimat benar diawali huruf kapital dan tanpa spasi sebelum tanda baca.
        const kk = LC.kalimatKunci(l, s.cara);
        cek(/^[A-Z]/.test(kk) && !/ [.,:;!?]/.test(kk) && /[.]$/.test(kk) && bersih(kk) && !BUKAN_C.test(kk), `${nama} misi ${s.nomor} ${q.metode}: kalimat pembenaran (${kk})`);
        cek(tanpaDigit(LC.ucapkan(kk)), `${nama} misi ${s.nomor} ${q.metode}: kalimat pembenaran dieja tanpa digit`);
        const pet = LC.petunjukSalah(l, s.cara, "x");
        if (rupa === "lambang") cek(!GAMBAR.test(kk + pet), `${nama} misi ${s.nomor} ${q.metode}: umpan balik Abstract tanpa menyebut gambar, petak, atau kisi`);
        cek(pet.length > 15 && bersih(pet) && tanpaDigit(pet) && !BUKAN_C.test(pet), `${nama} misi ${s.nomor} ${q.metode}: petunjuk salah tanpa digit`);
        if (l.tipe !== "salah") {
          const bocor = kunci.jenis === "angka" ? new RegExp(`\\b${kunci.n}\\b|\\b${LC.kataBil(kunci.n)}\\b`) : new RegExp(`\\b${kunci.nama}\\b`);
          cek(!bocor.test(pet), `${nama} misi ${s.nomor} ${q.metode}: petunjuk tidak menyebut jawaban (${pet})`);
        }
        const kts = LC.kalimatTanya(l, s.cara);
        cek(bersih(kts) && tanpaDigit(kts) && kts.endsWith("?"), `${nama} misi ${s.nomor} ${q.metode}: pertanyaan tanpa digit`);
        // Tampilan: bar loyang digambar sungguh dari data.
        if (rupa !== "lambang") {
          const tp = LC.tampilan(d, rupa);
          cek(tp.mode === (rupa === "benda" ? "loyang" : "bar") && bersih(tp.judul) && emojiSah(tp.judul) && tp.judul.length <= 38, `${nama} misi ${s.nomor} ${q.metode}: mode dan judul gambar (${tp.judul})`);
          const t = G.tataGambar(tp.rangkaian, true);
          const strips = tp.rangkaian.flatMap((g) => g.strip);
          cek(t.sel.length === strips.reduce((n, x) => n + x.q, 0) && t.tinggi <= G.BAR_LUAS.maksTinggi, `${nama} misi ${s.nomor} ${q.metode}: bagian digambar sungguh sebanyak data dan muat (${t.tinggi})`);
          if (d.tipe === "igil") {
            sama(strips, [{ q: d.q, isi: d.a - d.c, coret: d.c }], `${nama} misi ${s.nomor}: igil menggambar sisa, coretan, dan kosong sesuai data`);
          }
          if (d.tipe === "sama") sama(strips.map((x) => [x.q, x.isi]), [[d.q, d.a], [d.q, d.c]], `${nama} misi ${s.nomor}: sama menggambar dua bar berpenyebut sama`);
          if (d.tipe === "samakan" || d.tipe === "pisah") {
            const total = (xs) => xs.reduce((n, x) => n + (x.isi / x.q), 0);
            const persediaan = tp.rangkaian[0].strip;
            const diambil = tp.rangkaian[1].strip;
            cek(hampir(total(persediaan), desimalBil(d.x)) && hampir(total(diambil), desimalBil(d.y)), `${nama} misi ${s.nomor} ${q.metode}: bar persediaan dan diambil sama besar dengan data`);
            cek(persediaan.every((x) => x.q === d.x.q) && diambil.every((x) => x.q === d.y.q), `${nama} misi ${s.nomor} ${q.metode}: tiap bar dibagi sesuai penyebutnya`);
          }
          if (rupa === "diagram") cek(!/[\u{1F300}-\u{1FAFF}]/u.test(JSON.stringify(tp)), `${nama} misi ${s.nomor} ${q.metode}: bar polos tanpa emoji`);
          else cek(emojiSah(G.ikonRoti(tp.item)) && G.NAMA_ROTI.includes(tp.item), `${nama} misi ${s.nomor} ${q.metode}: roti beremoji sah`);
        } else {
          const baris = LC.barisKartu(d, s.cara);
          cek(baris.filter((b) => b.includes("?")).length === 1 && baris.length >= 3 && baris.every((b) => bersih(b) && !GAMBAR.test(b) && !/[\u{1F300}-\u{1FAFF}]/u.test(b)), `${nama} misi ${s.nomor} ${q.metode}: kartu satu baris bertanda tanya, tanpa emoji dan gambar (${baris.join(" / ")})`);
        }
        if (l.tipe === "salah") {
          adaSalah += 1;
          cek(l.alasan.length === 3 && new Set(l.alasan).size === 3 && l.benar >= 0 && l.benar <= 2 && l.alasan.every((a) => bersih(a) && tanpaDigit(a) && !BUKAN_C.test(a)), `${nama} misi ${s.nomor}: tiga alasan berbeda tanpa digit`);
          cek(l.alasan.every((a) => /^[A-Z]/.test(a) && /[.]$/.test(a)), `${nama} misi ${s.nomor}: alasan berkapital`);
          const benarPanjang = l.alasan[l.benar].length;
          cek(benarPanjang < Math.max(...l.alasan.filter((_, i) => i !== l.benar).map((a) => a.length)), `${nama} misi ${s.nomor}: alasan benar bukan yang terpanjang`);
          cek(!l.alasan[l.benar].includes(kunci.nama) && !LC.petunjukSalah(l, "klik", "x").includes(kunci.nama) && !l.keliru.includes(kunci.nama), `${nama} misi ${s.nomor}: alasan dan petunjuk tidak membocorkan jawaban akhir`);
          cek(l.posisi !== undefined && l.posisi >= 0 && l.posisi <= 2, `${nama} misi ${s.nomor}: posisi alasan benar ditentukan`);
          cek(tanpaDigit(l.kataTokoh) && bersih(l.kataTokoh) && /^[A-Z]/.test(l.kataTokoh) && bersih(l.keliru) && tanpaDigit(l.keliru), `${nama} misi ${s.nomor}: kata tokoh bersih`);
          cek(l.betul ? l.jawabTokoh === kunci.nama : l.jawabTokoh !== kunci.nama && !G.samaBesar(l.jawabTokoh, kunci.nama), `${nama} misi ${s.nomor}: jawaban tokoh ${l.betul ? "benar" : "keliru"} menurut data (${l.jawabTokoh})`);
          jumlahJenis[l.betul ? "benar" : "keliru"] += 1;
          cek(s.cara === "klik", `${nama} misi ${s.nomor}: Cari kesalahan ada di tugas klik`);
        }
      }
    }
    cek(adaSalah === 1, `${nama}: satu tugas Cari kesalahan (${adaSalah})`);
    cek(new Set(kunciTahap).size === kunciTahap.length, `${nama}: tanpa tugas kembar dalam satu tahap`);
    cek(new Set(kanvas).size === 4, `${nama}: empat angka kanvas tidak kembar (${kanvas.join(", ")})`);
    cek(new Set(suaraAngka).size === 4, `${nama}: empat angka suara tidak kembar (${suaraAngka.join(", ")})`);
    cek(posisiKlik.size >= 2, `${nama}: posisi jawaban benar klik bervariasi (${[...posisiKlik].join(", ")})`);
  }
  sama(jumlahJenis, { benar: 1, keliru: 2 }, "Cari kesalahan: dua keliru (Fajar) dan satu benar (Citra)");
  cek(new Set(semuaKunci).size >= 34, `tugas beragam di seluruh tahap (${new Set(semuaKunci).size} dari ${semuaKunci.length})`);
  // Seed Cari kesalahan dari alur.
  const sc = (tahap) => tahap.flatMap((s) => s.langkah).map((q) => q.langkah).find((l) => l.tipe === "salah");
  const sC = sc(D.CONCRETE);
  const sP = sc(D.PICTORIAL);
  const sA = sc(D.ABSTRACT);
  cek(sC.tokoh === "Fajar" && sC.dasar.tipe === "sama" && sC.dasar.q === 5 && sC.dasar.a === 4 && sC.dasar.c === 1 && sC.jawabTokoh === "3/10" && !sC.betul, "seed Concrete: Fajar menjawab empat per lima dikurangi satu per lima sama dengan tiga per sepuluh (penyebut ikut dijumlahkan)");
  cek(sP.tokoh === "Citra" && sP.betul === true && sP.dasar.tipe === "samakan" && sP.jawabTokoh === "7/12", "seed Pictorial: Citra benar, tiga per empat dikurangi satu per enam sama dengan tujuh per dua belas");
  cek(sA.tokoh === "Fajar" && sA.dasar.tipe === "pisah" && sA.jawabTokoh === "4 1/3" && !sA.betul, "seed Abstract: Fajar lupa menyamakan penyebut pada campuran");
  // Urutan jawaban klik berbeda tiap tahap dan posisi alasan bervariasi.
  cek(new Set([sC.posisi, sP.posisi, sA.posisi]).size === 3, "posisi alasan benar divariasikan antartahap");
  // Poin penting dan penutup bab.
  cek(D.POIN_PENTING.length === 6 && D.POIN_PENTING.every((p) => bersih(p) && !BUKAN_C.test(p)) && D.POIN_PENTING_SUARA.every((p) => tanpaDigit(p) && bersih(p)), "poin penting enam butir dan suaranya tanpa digit");
  const poin = D.POIN_PENTING.join(" ").toLowerCase();
  for (const m of ["penyebutnya sama", "kpk", "model arsir", "pecahan campuran", "dua cara", "sederhanakan", "penjumlahan", "5/8 - 2/8 = 3/8", "3/4 - 1/3 = 9/12 - 4/12 = 5/12"]) cek(poin.includes(m), `poin penting memuat "${m}"`);
  cek(bersih(D.PENUTUP_C) && tanpaDigit(D.PENUTUP_C) && /Toko Roti Keliling/.test(D.PENUTUP_C) && ["Bu Ratna", "Pak Seno", "Bu Nani", "Bima", "Citra", "Fajar", "Pak Arif"].every((n) => D.PENUTUP_C.includes(n)) && /\?$/.test(D.PENUTUP_C), "penutup bab: perayaan Toko Roti Keliling dengan semua tokoh dan pertanyaan");
  cek(emojiSah(JSON.stringify(D.TEMA_ADONAN)) && [D.TEMA_ADONAN.concrete.cara, D.TEMA_ADONAN.pictorial.cara, D.TEMA_ADONAN.abstract.cara].every((c) => bersih(c)), "tema tiga tahap bersih dan emoji sah");
}

/* ------------------------------ Pengenal ucapan ------------------------------ */
{
  sama([K.angkaDariUcapan("enam"), K.angkaDariUcapan("angka 7"), K.angkaDariUcapan("tiga lalu delapan"), K.angkaDariUcapan("sepuluh")], [[6], [7], [3, 8], []], "angka dari ucapan satu angka");
  cek(K.cocokUcapan("lima", { jenis: "angka", n: 5 }).cocok && !K.cocokUcapan("enam", { jenis: "angka", n: 5 }).cocok && K.cocokUcapan("6", { jenis: "angka", n: 6 }).cocok, "cocok ucapan angka");
  cek(K.cocokUcapan("3/5", { jenis: "nama", nama: "3/5" }).cocok && !K.cocokUcapan("3/10", { jenis: "nama", nama: "3/5" }).cocok, "cocok ucapan nama");
}

/* ------------------------------ Berkas: akhir baris, emoji, kata terlarang, rupa ------------------------------ */
{
  const berkas = readdirSync(folder).filter((f) => /\.(ts|tsx)$/.test(f));
  const WAJIB = ["data.ts", "data-kartu.ts", "data-sim.ts", "logika.ts", "logika-cpa.ts", "logika-data.ts", "periksa.ts", "GambarAdonan.tsx", "JawabAdonan.tsx", "LangkahAdonan.tsx", "TahapAdonan.tsx", "PetaAdonan.tsx", "InfoAdonan.tsx", "SimulasiSisaAdonan.tsx"];
  for (const w of WAJIB) cek(berkas.includes(w), `berkas ${w} ada`);
  cek(berkas.length === WAJIB.length, `tidak ada berkas lain di folder (${berkas.length})`);
  const TERLARANG = /(kelas|buku|teman|kelompok|skor|nilai|soal|tebak|kunci|latihan|senilai|ditemani)/i;
  const TERLARANG_NAMA_KODE = /\b(kelas|buku|teman|kelompok|skor|tebak|latihan|senilai|ditemani)\b/i;
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folder), "utf8");
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d || c.codePointAt(0) === 0x1f6de), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}/i.test(s), `${f}: kode emoji tidak melewati U+1FA95`);
    cek(![...s].some((c) => DILARANG.includes(c.codePointAt(0)) || IKAN.includes(c.codePointAt(0))) && !/\\u\{1FA74\}|\\u\{1F39F\}|\\u2602|\\u\{1FA9F\}|\\u\{1FAA3\}|\\u\{1F355\}|\\u\{1F9CB\}|\\u\{1F41F\}|\\u\{1F38F\}/i.test(s), `${f}: tanpa emoji yang tampil kosong atau hitam dan tanpa ikan`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    const tanpaKomentar = s.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");
    cek(!TERLARANG_NAMA_KODE.test(tanpaKomentar), `${f}: tanpa kata terlarang di kode`);
    if (f.endsWith(".tsx")) {
      cek(!/peta-label\/|InfoKartu|PetaLabel|PetaKartu|InfografisKartu/.test(s), `${f}: komponen sendiri, bukan pembungkus komponen bersama`);
      cek(/^"use client";/.test(s), `${f}: use client`);
    }
    cek(!/fetch\(|XMLHttpRequest|localStorage/.test(s), `${f}: tanpa jaringan atau penyimpanan`);
  }
  const peta = readFileSync(new URL("PetaAdonan.tsx", folder), "utf8");
  const info = readFileSync(new URL("InfoAdonan.tsx", folder), "utf8");
  const tahap = readFileSync(new URL("TahapAdonan.tsx", folder), "utf8");
  const sim = readFileSync(new URL("SimulasiSisaAdonan.tsx", folder), "utf8");
  cek(/export default function PetaAdonan/.test(peta) && /export default function InfoAdonan/.test(info) && /export default function TahapAdonan/.test(tahap) && /export default function SimulasiSisaAdonan/.test(sim), "ekspor default Mind-map, Infografis, Tahap, dan Simulasi");
  cek(/speakGuru: \(t: string\) => void; onLanjut: \(\) => void; teksLanjut: string/.test(peta) && /speakGuru: \(t: string\) => void; onLanjut: \(\) => void; teksLanjut: string/.test(info), "props Mind-map dan Infografis: speakGuru, onLanjut, teksLanjut");
  cek(/umum: Umum;[\s\S]*rupa: Rupa;[\s\S]*soal: SoalMisi\[\];[\s\S]*pita:[\s\S]*teksAkhir: string;[\s\S]*poinPenting\?: boolean/.test(tahap), "props Tahap: umum, rupa, soal, pita, teksAkhir, poinPenting");
  cek(/speakGuru: \(t: string\) => void; onKeadaan\?: \(k: KeadaanAdonan\) => void/.test(sim), "props Simulasi: speakGuru dan onKeadaan");
  cek(/data-sel-info/.test(info) && /min-h-\[84px\]/.test(info) && !/overflow-y|overflow-auto/.test(info), "infografis: kartu satu layar tanpa gulir");
  cek((peta.match(/IsiLoyang ke=\{i\}/g) ?? []).length === 1 && /grid-cols-2/.test(peta) && /LANGKAH_ADONAN\.map/.test(peta), "mind-map: rak oven dua kolom, enam loyang dari data");
  const uji = readFileSync(new URL("../scripts/uji-lab-k5b3.mjs", import.meta.url), "utf8");
  cek(/BAGIAN C/.test(uji) && /MISI_C/.test(uji), "uji-lab-k5b3 memuat bagian C");
  const simK = readFileSync(new URL("../src/components/modul/SimulasiK5Bab3.tsx", import.meta.url), "utf8");
  cek(/SimulasiSisaAdonan/.test(simK) && /KeadaanAdonan/.test(simK) && /misiDaftar: daftarMisiK5Bab3\("C"\)/.test(simK), "SimulasiK5Bab3 memanggil komponen Sub-Bab C dengan misiDaftar");
  const lama = readdirSync(new URL("../src/components/modul/", import.meta.url));
  cek(["SubBabK5B3C.tsx", "SimulasiLabSisaK5B3.tsx", "lab-sisa-k5b3c.ts", "model-sisa-k5b3.tsx"].every((f) => !lama.includes(f)), "berkas lama Sub-Bab C sudah tidak ada");
}

console.log(`Uji Sisa Adonan Kelas 5 Bab 3 C: ${lulus} lulus, ${gagal} gagal`);
process.exit(gagal ? 1 : 0);
