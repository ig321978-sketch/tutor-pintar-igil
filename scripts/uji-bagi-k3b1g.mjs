// Uji Mind-map (Keranjang Bingkisan), Infografis (Papan Pesta), Simulasi Meja Bingkisan, dan tahap Concrete, Pictorial, Abstract Kelas 3 Bab 1 Sub-Bab G ("Pesta Hari Jadi Toko"),
// pembagian sampai seratus, akhir cerita Toko Kelontong Pak Joko.
// Memeriksa: keranjang bingkisan (sembilan kartu geser, label pendek, semua metode Story termasuk tiga metode global dengan nama Indonesia), papan pesta dari data Story,
// CPA dua belas tugas per tahap (Klik, Kanvas, Suara x empat metode) dengan jawaban beragam (isi tiap bagian, banyak pengurangan, banyak bagian, pasangan kali, kali dan bagi berkaitan,
// periksa dengan kali, nama bagian kalimat, hasil tiap pengurangan berurutan, urutan langkah, satu angka, satu kata) dan Cari kesalahan di tiap tahap, kunci dihitung dari data (tanpa sisa),
// angka jawaban tidak kembar per tahap, tugas yang langsung siap (jebakan tombol Periksa macet), instruksi tanpa digit, petunjuk salah, pengenal ucapan, batas rupa, data berbeda dari Story,
// logika Simulasi Meja Bingkisan, misi, emoji, kata terlarang, akhir baris.
// Jalankan: node --no-warnings scripts/uji-bagi-k3b1g.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const DP = await import("../src/components/modul/bagi-k3b1g/data-peta.ts");
const DK = await import("../src/components/modul/bagi-k3b1g/data-kartu.ts");
const LC = await import("../src/components/modul/bagi-k3b1g/logika-cpa.ts");
const D = await import("../src/components/modul/bagi-k3b1g/data.ts");
const DS = await import("../src/components/modul/bagi-k3b1g/data-sim.ts");
const K = await import("../src/components/modul/bagi-k3b1g/periksa.ts");
const L = await import("../src/components/modul/bagi-k3b1g/logika.ts");
const MK = await import("../src/components/modul/misi-k3bab1.ts");
const MT = await import("../src/components/modul/misi-teks-k3b1.ts");
const S = await import("../src/components/modul/misi-simulasi.ts");
const folderUrl = new URL("../src/components/modul/bagi-k3b1g/", import.meta.url);

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
const TERLARANG = /\b(kelas|buku|teman|kelompok|dikelompokkan|mengelompokkan|skor|nilai|bernilai|soal|tebak|tebakan|kunci|latihan)\b/i;
const tanpaDigit = (t) => !/\d/.test(t);
const bersih = (t) => !TERLARANG.test(t) && !/buku|kelompok|bernilai|tebak|nilai tempat|persoalan|ditemani/i.test(t);
const emojiSah = (s) => [...s].every((c) => c.codePointAt(0) <= 0x1fa95 && c.codePointAt(0) !== 0x200d && c.codePointAt(0) !== 0x1f6de);
const ADA_EMOJI = /[\u{1F000}-\u{1FFFF}\u{2600}-\u{27BF}]/u;
const STORY = [[24, 4], [24, 6], [15, 3], [36, 9], [18, 3], [20, 5], [21, 3], [21, 7], [28, 4], [45, 5]];

/* ------------------------------ Mind-map: keranjang bingkisan (sembilan kartu geser) ------------------------------ */
{
  const KP = DK.KARTU_BAGI;
  cek(KP.length === 9, "kartu: sembilan kartu");
  cek(KP.every((k) => k.contoh.length <= 1) && KP[0].contoh.join() === "masalah" && KP.slice(1).every((k) => k.contoh.length === 0), "kartu: satu kotak contoh di kartu pertama saja, sisanya mandiri");
  const semua = KP.flatMap((k) => [k.masalah, k.cara, k.hasil]);
  const label = semua.map((x) => x.label);
  cek(new Set(label).size === label.length, "kartu: label unik");
  cek(semua.every((x) => x.label.length >= 5 && x.label.length <= 36), `kartu: label pendek (terpanjang ${Math.max(...label.map((l) => l.length))} huruf)`);
  cek(KP.every((k) => [k.masalah.label, k.cara.label, k.hasil.label].every((l) => l.split(/\s+/).length <= 6)), "kartu: label paling banyak enam kata");
  cek(semua.every((x) => tanpaDigit(x.label) && tanpaDigit(x.arti) && bersih(x.label) && bersih(x.arti) && x.arti.length > 10), "kartu: label dan arti tanpa digit dan kata terlarang");
  cek(KP.every((k) => tanpaDigit(k.judul) && bersih(k.judul) && k.judul.length > 5), "kartu: judul bersih");
  const cara = KP.map((k) => k.cara.label).join(" | ").toLowerCase();
  for (const m of ["Bagi Rata", "Kurang Berulang", "Keluarga Fakta", "bagikan sama banyak", "titik dua", "dibagi, pembagi, hasil bagi", "kalikan hasil bagi", "dibagi satu", "tulis kalimat bagi"]) cek(cara.includes(m.toLowerCase()), `kartu: cara memuat ${m}`);
  const gab = KP.map((k) => [k.judul, k.masalah.label, k.cara.label, k.hasil.label, k.masalah.arti, k.cara.arti, k.hasil.arti].join(" ")).join(" ").toLowerCase();
  for (const s of ["sama banyak", "satu-satu", "bergiliran", "pengurangan", "sampai nol", "titik dua", "sama dengan", "bilangan yang dibagi", "pembagi", "hasil bagi", "perkalian", "keluarga fakta", "periksa", "bilangan itu sendiri", "satuan"]) cek(gab.includes(s), `kartu: memuat poin "${s}"`);
  cek(!new RegExp("\\b(raka|salsa|bima|pak joko|nenek|ijah|toko|bingkisan|keranjang|manik|permen)\\b", "i").test(gab), "kartu: hanya poin pelajaran (tanpa tokoh dan benda cerita)");
  cek(tanpaDigit(DK.SUARA_KARTU_BAGI + DK.SELESAI_KARTU_BAGI) && bersih(DK.SUARA_KARTU_BAGI + DK.SELESAI_KARTU_BAGI), "kartu: suara dan pesan selesai tanpa digit dan kata terlarang");
  cek(emojiSah(DK.TEMA_KARTU_BAGI.ikon) && DK.TEMA_KARTU_BAGI.judul.length > 5, "kartu: tema sah");
  const RG = DK.RINGKASAN_BAGI;
  cek(RG.ikon.length === DK.KARTU_BAGI.length && new Set(RG.ikon).size === RG.ikon.length && [...RG.ikon, RG.pusat].every((e) => emojiSah(e) && !/[A-Za-z0-9]/.test(e)), "peta radial: satu gambar unik per kartu, gambar sah tanpa huruf");
  cek(tanpaDigit(RG.suara) && bersih(RG.suara) && !RG.ikon.includes(RG.pusat), "peta radial: suara bersih dan pusat berbeda dari cabang");
}

/* ------------------------------ Infografis: papan pesta (lima pembagian dari Story) ------------------------------ */
{
  const B = DK.BARIS_INFO_BAGI;
  cek(B.length === 5 && DK.KOLOM_INFO_BAGI.length === 3, "infografis: lima kartu dan tiga kolom");
  cek(B.every((b) => b.isi.length === 3 && emojiSah(b.ikon) && b.nama.length > 2), "infografis: tiap kartu tiga isian, emoji sah");
  const jumlahContoh = B.map((b) => b.contoh.length);
  cek(jumlahContoh[0] === 3 && jumlahContoh.slice(1).every((n) => n === 0), "infografis: baris satu penuh contoh, baris dua sampai lima mandiri");
  const semua = B.flatMap((b) => b.isi);
  cek(B.every((b) => new Set(b.isi.map((x) => x.t)).size === 3), "infografis: tiga label tiap kartu berbeda");
  cek(semua.every((x) => x.t.length <= 26 && x.t.split(/\s+/).length <= 3 && bersih(x.t) && bersih(x.s ?? "")), "infografis: label pendek (paling banyak tiga kata) dan tanpa kata terlarang");
  cek(semua.every((x) => tanpaDigit(x.s ?? x.t)), "infografis: ucapan label tanpa digit");
  // Data Story: 24 : 4 = 6, 36 : 9 = 4, 15 : 3 = 5, 18 : 3 = 6, 28 : 4 = 7; periksa dengan kali memakai hasil bagi dikali pembagi.
  const angka = B.map((b) => ({ n: Number(b.isi[0].t.split(" : ")[0]), g: Number(b.isi[0].t.split(" : ")[1]), q: Number(b.isi[1].t), kali: b.isi[2].t.split(" × ").map(Number) }));
  cek(angka.every((a) => a.n === a.g * a.q && a.kali[0] === a.q && a.kali[1] === a.g && a.kali[0] * a.kali[1] === a.n), "infografis: hasil bagi dikali pembagi sama dengan bilangan yang dibagi (hitung ulang)");
  sama(angka.map((a) => [a.n, a.g, a.q]), [[24, 4, 6], [36, 9, 4], [15, 3, 5], [18, 3, 6], [28, 4, 7]], "infografis: data Story");
  cek(B.every((b) => b.isi[0].s === `${LC.kata(Number(b.isi[0].t.split(" : ")[0]))} dibagi ${LC.kata(Number(b.isi[0].t.split(" : ")[1]))}` && b.isi[1].s === LC.kata(Number(b.isi[1].t)) && b.isi[2].s === `${LC.kata(Number(b.isi[2].t.split(" × ")[0]))} kali ${LC.kata(Number(b.isi[2].t.split(" × ")[1]))}`), "infografis: ucapan sama dengan angka di layar");
  cek(tanpaDigit(DK.SUARA_INFO_BAGI + DK.SELESAI_INFO_BAGI) && bersih(DK.SUARA_INFO_BAGI + DK.SELESAI_INFO_BAGI) && emojiSah(DK.TEMA_INFO_BAGI.ikon), "infografis: suara dan tema bersih");
}

/* ------------------------------ Pengenal ucapan ------------------------------ */
{
  const c = (t, k) => K.cocokUcapan(t, k).cocok;
  cek(c("dibagi", { jenis: "nama", nama: "dibagi" }) && c("bilangan yang dibagi", { jenis: "nama", nama: "dibagi" }) && c("pembagi", { jenis: "nama", nama: "pembagi" }) && c("hasil bagi", { jenis: "nama", nama: "hasil" }) && c("hasil", { jenis: "nama", nama: "hasil" }), "ucapan: dibagi, pembagi, hasil bagi");
  cek(!c("pembagi", { jenis: "nama", nama: "dibagi" }) && !c("hasil bagi", { jenis: "nama", nama: "pembagi" }) && !c("dibagi atau pembagi", { jenis: "nama", nama: "dibagi" }), "ucapan: kata lain atau dua kata sekaligus tidak benar");
  cek(c("cocok", { jenis: "nama", nama: "cocok" }) && c("tidak cocok", { jenis: "nama", nama: "tidak" }) && c("tidak", { jenis: "nama", nama: "tidak" }) && !c("tidak cocok", { jenis: "nama", nama: "cocok" }) && !c("cocok", { jenis: "nama", nama: "tidak" }), "ucapan: cocok dan tidak cocok");
  cek(!c("cocok atau tidak", { jenis: "nama", nama: "cocok" }), "ucapan: cocok atau tidak sekaligus tidak benar");
  sama(K.angkaDariUcapan("angka tujuh"), [7], "ucapan: tujuh");
  sama(K.angkaDariUcapan("dua belas"), [12], "ucapan: dua belas");
  sama(K.angkaDariUcapan("5 dan 9"), [5, 9], "ucapan: angka");
  cek(c("enam", { jenis: "angka", n: 6 }) && c("eh enam deh", { jenis: "angka", n: 6 }) && !c("tujuh", { jenis: "angka", n: 6 }), "ucapan: bilangan");
  cek(K.LEBAR_ADEGAN === 300 && K.TINGGI_ADEGAN === 200, "adegan 300 x 200");
}

/* ------------------------------ Hitungan ------------------------------ */
{
  sama([0, 7, 10, 11, 15, 20, 38, 100].map(LC.kata), ["nol", "tujuh", "sepuluh", "sebelas", "lima belas", "dua puluh", "tiga puluh delapan", "seratus"], "kata bilangan");
  sama(LC.deretNilai(24, 6), [18, 12, 6, 0], "deret nilai pengurangan berulang");
  sama(LC.deretNilai(35, 7), [28, 21, 14, 7, 0], "deret nilai lima langkah");
  cek(LC.hasilBagi(54, 6) === 9 && LC.hasilBagi(100, 4) === 25, "hasil bagi");
  cek(LC.klaimBenar({ jenis: "hasil", n: 24, g: 4, dikira: 6 }) && !LC.klaimBenar({ jenis: "hasil", n: 24, g: 4, dikira: 20 }), "klaim hasil");
  cek(LC.klaimBenar({ jenis: "periksa", n: 24, g: 4, dikira: 6, bilang: "cocok" }) && !LC.klaimBenar({ jenis: "periksa", n: 24, g: 4, dikira: 7, bilang: "cocok" }) && LC.klaimBenar({ jenis: "periksa", n: 24, g: 4, dikira: 7, bilang: "tidak" }), "klaim periksa");
  cek(LC.periksaKali({ tipe: "periksa", n: 27, g: 3, dikira: 9 }) === "cocok" && LC.periksaKali({ tipe: "periksa", n: 20, g: 4, dikira: 6 }) === "tidak", "periksa dengan kali");
  for (const n of [4, 6, 9]) cek(LC.pilihanAngka(n).length === 4 && LC.pilihanAngka(n).includes(n) && LC.pilihanAngka(n).every((x) => x >= 1 && x <= 9), `pilihan angka satu digit memuat ${n}`);
  for (const n of [12, 15]) cek(LC.pilihanAngka(n).length === 4 && LC.pilihanAngka(n).includes(n) && new Set(LC.pilihanAngka(n)).size === 4, `pilihan angka dua digit memuat ${n}`);
  for (const n of [3, 4]) {
    const a = LC.acakTetap(n, Array.from({ length: n }, (_, i) => i));
    cek([...a].sort().join() === Array.from({ length: n }, (_, i) => i).join() && a.join() !== Array.from({ length: n }, (_, i) => i).join(), `acak tetap ${n} kartu bukan urutan benar`);
  }
  cek(LC.LANGKAH_BAGI.length === 4 && LC.urutanBagi().join() === "0,1,2,3" && LC.LANGKAH_BAGI.every((x) => tanpaDigit(x) && bersih(x)), "langkah membagi rata");
}

/* ------------------------------ Tiga tahap CPA ------------------------------ */
const TAHAP = [
  { nama: "Concrete", soal: D.CONCRETE, rupa: "benda", nomor: [2, 3, 4], ikon: D.TEMA_BAGI.concrete },
  { nama: "Pictorial", soal: D.PICTORIAL, rupa: "diagram", nomor: [5, 6, 7], ikon: D.TEMA_BAGI.pictorial },
  { nama: "Abstract", soal: D.ABSTRACT, rupa: "lambang", nomor: [8, 9, 10], ikon: D.TEMA_BAGI.abstract },
];
/** Pasangan (bilangan yang dibagi, pembagi) tiap tugas, untuk memeriksa data berbeda dari Story. */
const pasangan = (l) => {
  switch (l.tipe) {
    case "bagi":
    case "kurang":
    case "deret":
    case "urutlangkah":
    case "istilah":
    case "periksa":
      return [l.n, l.g];
    case "isi":
      return [l.n, l.n / l.q];
    case "pasang":
      return [l.n, l.g];
    case "balik":
      return [l.a * l.b, l.a];
    case "salah":
      return [l.klaim.n, l.klaim.g];
  }
};
const SIKLUS_TANPA_SISA = (l) => {
  const [n, g] = pasangan(l);
  return Number.isInteger(n / g) && n % g === 0 && n / g >= 2 && g >= 2 && n <= 100;
};
let adaCocok = 0;
let adaTidak = 0;
for (const th of TAHAP) {
  const n = th.nama;
  cek(th.soal.length === 3, `${n}: tiga misi`);
  sama(th.soal.map((s) => s.nomor), th.nomor, `${n}: nomor misi berlanjut dari Simulasi`);
  sama(th.soal.map((s) => s.cara), ["klik", "kanvas", "suara"], `${n}: cara Klik, Kanvas, Suara`);
  const angka = [];
  const kanvas = [];
  let salahAda = 0;
  for (const so of th.soal) {
    cek(so.langkah.length === 4, `${n}/${so.nomor}: empat metode`);
    sama(so.langkah.map((l) => l.metode), ["igil", "rata", "kurang", "keluarga"], `${n}/${so.nomor}: urutan metode`);
    cek(bersih(so.judul + so.cerita) && tanpaDigit(so.cerita) && /^Misi Meja Bingkisan \d+:/.test(so.judul) && so.cerita.length > 20, `${n}/${so.nomor}: judul dan cerita bersih`);
    cek(emojiSah(so.judul + so.cerita) && !ADA_EMOJI.test(so.judul + so.cerita), `${n}/${so.nomor}: judul dan cerita tanpa emoji`);
    for (const ls of so.langkah) {
      const l = ls.langkah;
      const nm = `${n}/${so.nomor}/${ls.metode}`;
      cek(ls.judul === ls.suara && ls.judul === LC.instruksi(l, th.rupa, so.cara), `${nm}: judul dan suara sama dengan instruksi`);
      cek(tanpaDigit(ls.suara) && bersih(ls.suara) && ls.suara.length > 20, `${nm}: instruksi tanpa digit dan kata terlarang`);
      cek(/(Pilih|Tulis|Ucapkan|Ketuk|Urutkan|Putar|Susun)/.test(ls.suara), `${nm}: instruksi memuat perintah`);
      const kunci = LC.kunciJawab(l, so.cara);
      cek(LC.siapLangsung(l, th.rupa, so.cara) === (so.cara !== "klik" || kunci !== null), `${nm}: tugas langsung siap sesuai caranya (tombol tidak macet pada rupa ${th.rupa})`);
      for (const r of ["benda", "diagram", "lambang"]) cek(LC.siapLangsung(l, r, so.cara) === LC.siapLangsung(l, th.rupa, so.cara), `${nm}: siap langsung tidak bergantung rupa (${r})`);
      cek(tanpaDigit(LC.kalimatKunci(l, so.cara, th.rupa)) && bersih(LC.kalimatKunci(l, so.cara, th.rupa)) && LC.kalimatKunci(l, so.cara, th.rupa).length > 10, `${nm}: kalimat kunci tanpa digit`);
      cek(tanpaDigit(LC.kalimatTanya(l, so.cara)), `${nm}: kalimat tanya tanpa digit`);
      cek(SIKLUS_TANPA_SISA(l), `${nm}: pembagian tanpa sisa, paling banyak seratus`);
      const p = pasangan(l);
      cek(!STORY.some(([a, b]) => a === p[0] && b === p[1]), `${nm}: data berbeda dari Story (${p.join(" : ")})`);
      if (so.cara === "kanvas") {
        cek(kunci?.jenis === "angka" && kunci.n >= 1 && kunci.n <= 9 && Number.isInteger(kunci.n), `${nm}: Tulis di kanvas satu angka satu sampai sembilan`);
        if (kunci?.jenis === "angka") kanvas.push(kunci.n);
      }
      if (so.cara === "suara") cek(kunci !== null, `${nm}: Rekam suara punya kunci`);
      if (so.cara === "suara" && kunci?.jenis === "angka") cek(kunci.n >= 1 && kunci.n <= 9, `${nm}: Rekam suara bilangan pendek (satu sampai sembilan)`);
      if (kunci?.jenis === "angka") {
        angka.push(kunci.n);
        const pil = LC.pilihanAngka(kunci.n);
        cek(pil.length === 4 && pil.includes(kunci.n) && new Set(pil).size === 4, `${nm}: pilihan angka memuat kunci`);
        cek(tanpaDigit(LC.petunjukSalah(l, so.cara, kunci.n + 1, th.rupa)) && tanpaDigit(LC.petunjukSalah(l, so.cara, kunci.n - 1 || 1, th.rupa)), `${nm}: petunjuk salah angka tanpa digit`);
      }
      if (kunci?.jenis === "nama") {
        const pil = LC.pilihanNamaDari(kunci.nama);
        cek(pil.includes(kunci.nama) && pil.every((x) => LC.URUT_NAMA.includes(x)) && pil.length >= 2, `${nm}: pilihan kata memuat kunci`);
        const lain = pil.find((x) => x !== kunci.nama);
        cek(tanpaDigit(LC.petunjukSalah(l, so.cara, lain, th.rupa)) && LC.petunjukSalah(l, so.cara, lain, th.rupa).length > 20, `${nm}: petunjuk salah kata tanpa digit`);
        cek(K.cocokUcapan(LC.LABEL_NAMA[kunci.nama], kunci).cocok && K.cocokUcapan(kunci.nama === "hasil" ? "hasil bagi" : kunci.nama, kunci).cocok, `${nm}: ucapan "${LC.LABEL_NAMA[kunci.nama]}" dikenali`);
        cek(LC.LABEL_NAMA[kunci.nama].length > 2 && bersih(LC.LABEL_NAMA[kunci.nama]), `${nm}: tulisan tombol kata ada`);
      }
      if (l.tipe === "salah") {
        salahAda += 1;
        cek(so.cara === "klik" && l.alasan.length === 3 && new Set(l.alasan).size === 3 && l.benar >= 0 && l.benar < 3, `${nm}: Cari kesalahan dengan tiga alasan`);
        cek(l.benar !== 0, `${nm}: alasan benar bukan tombol pertama`);
        cek(!LC.klaimBenar(l.klaim), `${nm}: klaim tokoh yang salah`);
        cek(l.keliru.length > 30 && tanpaDigit(l.keliru) && bersih(l.keliru) && bersih(l.kataTokoh) && tanpaDigit(l.kataTokoh) && bersih(l.alasan.join(" ")) && tanpaDigit(l.alasan.join(" ")), `${nm}: petunjuk salah dan teks tokoh bersih tanpa digit`);
        cek(/^Lihat lagi\./.test(LC.petunjukSalah(l, "klik", "x", th.rupa)), `${nm}: petunjuk salah menjelaskan kesalahan tokoh`);
        cek(["Raka", "Salsa", "Bima"].includes(l.tokoh), `${nm}: tokoh Kelas 3`);
        cek(!ADA_EMOJI.test(l.kataTokoh + l.alasan.join(" ") + l.keliru), `${nm}: Cari kesalahan tanpa emoji dalam teks`);
        cek(l.alasan[l.benar].length > 30 && l.alasan.every((a) => a.length > 20), `${nm}: alasan jelas`);
      }
      // Batas rupa: emoji benda hanya pada Concrete.
      if (th.rupa === "benda") {
        const ikon = l.ikon ?? l.klaim?.ikon;
        cek(l.tipe === "pasang" || l.tipe === "istilah" || l.tipe === "urutlangkah" || (ikon && emojiSah(ikon) && ADA_EMOJI.test(ikon)), `${nm}: Concrete memakai benda beremoji`);
        const [bn] = p;
        cek(bn <= 36 || l.tipe === "pasang", `${nm}: Concrete paling banyak tiga puluh enam benda (${bn})`);
      } else {
        cek(l.ikon === undefined && l.klaim?.ikon === undefined, `${nm}: Pictorial dan Abstract tanpa emoji benda`);
        if (th.rupa === "diagram") cek(p[0] <= 42 || l.tipe === "pasang", `${nm}: Pictorial paling banyak empat puluh dua titik (${p[0]})`);
      }
      // Batas data tiap tipe.
      if (l.tipe === "deret") cek(l.n / l.g >= 2 && l.n / l.g <= 8, `${nm}: deret dua sampai delapan pengurangan`);
      if (l.tipe === "bagi" && so.cara !== "klik") cek(l.n / l.g <= 9, `${nm}: hasil bagi satu angka`);
      if (l.tipe === "kurang") cek(l.n / l.g <= 9 && l.n / l.g >= 2, `${nm}: banyak pengurangan satu angka`);
      if (l.tipe === "pasang") cek(l.n / l.g <= 9 && l.g <= 9, `${nm}: pasangan kali satu angka`);
      if (l.tipe === "balik") cek(l.a !== l.b && l.a * l.b <= 100 && l.a <= 9 && l.b <= 9, `${nm}: kali dan bagi berkaitan (${l.a}, ${l.b})`);
      if (l.tipe === "isi") cek(l.n / l.q <= 9 && l.q >= 2, `${nm}: banyak bagian satu angka`);
      if (l.tipe === "periksa") {
        if (LC.periksaKali(l) === "cocok") adaCocok += 1;
        else adaTidak += 1;
        cek(l.dikira >= 2 && l.dikira <= 9 && l.g >= 2, `${nm}: periksa dengan hasil bagi dugaan satu angka`);
      }
      if (l.tipe === "istilah") cek(["dibagi", "pembagi", "hasil"].includes(l.sorot) && l.n / l.g <= 9, `${nm}: istilah satu bagian ditandai`);
      if (l.tipe === "deret" || l.tipe === "urutlangkah") {
        cek(so.cara === "klik", `${nm}: kegiatan ketuk hanya pada Klik`);
        cek(tanpaDigit(LC.petunjukKetuk(l)) && bersih(LC.petunjukKetuk(l)), `${nm}: petunjuk ketuk tanpa digit`);
      }
      if (l.tipe === "deret") {
        const benar = LC.deretNilai(l.n, l.g);
        const acak = LC.acakTetap(benar.length, benar.map((_, i) => i));
        cek(acak.join() !== benar.map((_, i) => i).join() && [...acak].sort().join() === benar.map((_, i) => i).join(), `${nm}: urutan tombol deret tidak berurutan dan memuat semua`);
        cek(benar[benar.length - 1] === 0 && new Set(benar).size === benar.length, `${nm}: deret berakhir di nol`);
      }
    }
  }
  cek(salahAda >= 1, `${n}: paling sedikit satu Cari kesalahan`);
  cek(new Set(angka).size === angka.length, `${n}: angka jawaban tidak kembar dalam satu tahap (${angka.join(", ")})`);
  cek(new Set(kanvas).size === 4, `${n}: empat angka kanvas berbeda (${kanvas.join(", ")})`);
  cek(th.ikon.cara.length > 20 && emojiSah(th.ikon.ikon) && bersih(th.ikon.cara), `${n}: tema tahap`);
  // Tiga metode global tampak: tiap metode punya tugas di tiap misi.
  for (const m of ["rata", "kurang", "keluarga"]) cek(th.soal.every((so) => so.langkah.some((x) => x.metode === m)), `${n}: metode ${m} muncul di tiap misi`);
}
cek(adaCocok >= 2 && adaTidak >= 2, `periksa dengan kali: ada hasil yang cocok (${adaCocok}) dan tidak cocok (${adaTidak})`);
const angkaTahap = (soal) => soal.map((s) => s.langkah.map((l) => LC.kunciJawab(l.langkah, s.cara))).flat().filter((k) => k && k.jenis === "angka").map((k) => k.n);
sama(angkaTahap(D.CONCRETE), [15, 3, 8, 7, 4, 6, 2], "Concrete: angka jawaban");
sama(angkaTahap(D.PICTORIAL), [12, 5, 9, 2, 6, 4, 3], "Pictorial: angka jawaban");
sama(angkaTahap(D.ABSTRACT), [15, 6, 8, 7, 5, 9, 2, 4], "Abstract: angka jawaban");
// Batas rupa pada sumber komponen: emoji benda hanya pada cabang rupa benda (Concrete).
{
  const lg = readFileSync(new URL("LangkahBagi.tsx", folderUrl), "utf8");
  const tg = readFileSync(new URL("TahapBagi.tsx", folderUrl), "utf8");
  const baris = lg.split("\n");
  const emojiBaris = baris.map((b, i) => [i, b]).filter(([, b]) => /\\u\{(1F381|1F9FA|1F3F7)\}/.test(b));
  cek(emojiBaris.length >= 4, "komponen: emoji benda (bingkisan, keranjang, label) dipakai pada Concrete");
  for (const [i] of emojiBaris) {
    const konteks = baris.slice(Math.max(0, i - 8), i + 1).join(" ");
    cek(/benda|BENDA/.test(konteks), `LangkahBagi.tsx baris ${i + 1}: emoji benda hanya pada cabang benda`);
  }
  cek(/rupa === "benda" \? `\$\{IKON_METODE\[ls\.metode\]\} ` : ""/.test(tg), "TahapBagi: ikon metode hanya pada Concrete");
  cek(/rupa === "benda"[\s\S]{0,200}<text/.test(lg) && /<circle cx=\{cx\} cy=\{cy\} r=\{s \* 0\.36\}/.test(lg), "komponen: Pictorial memakai titik polos SVG");
  cek(/rupa === "lambang"/.test(lg) && /Kartu pembagian/.test(lg), "komponen: Abstract memakai kartu tulisan");
}

/* ------------------------------ Cakupan jenis tugas dan metode global ------------------------------ */
{
  const semua = [...D.CONCRETE, ...D.PICTORIAL, ...D.ABSTRACT].flatMap((s) => s.langkah.map((l) => l.langkah.tipe));
  for (const tp of ["salah", "bagi", "kurang", "isi", "pasang", "balik", "periksa", "istilah", "deret", "urutlangkah"]) cek(semua.includes(tp), `jenis tugas ${tp} dipakai`);
  const klaim = [...D.CONCRETE, ...D.PICTORIAL, ...D.ABSTRACT].flatMap((s) => s.langkah).filter((l) => l.langkah.tipe === "salah").map((l) => l.langkah.klaim.jenis);
  sama(klaim, ["hasil", "hasil", "periksa"], "Cari kesalahan memakai klaim sekali kurang, pembagi dan hasil tertukar, dan periksa kali keliru");
  cek(LC.NAMA_METODE.igil === "Metode IGIL: Bagi Rata, Periksa dengan Kali", "nama Metode IGIL");
  cek(LC.NAMA_METODE.rata.includes("Fair Share") && LC.NAMA_METODE.kurang.includes("Repeated Subtraction") && LC.NAMA_METODE.keluarga.includes("Fact Family"), "tiga metode global di judul tugas");
  cek(LC.URUT_METODE.join() === "igil,rata,kurang,keluarga" && Object.values(LC.IKON_METODE).every(emojiSah), "metode dan ikon");
  cek(D.TEMA_BAGI.concrete.nama === "Concrete" && D.TEMA_BAGI.pictorial.nama === "Pictorial" && D.TEMA_BAGI.abstract.nama === "Abstract", "nama tahap");
  cek(D.CONCRETE_BAGI === D.CONCRETE && D.PICTORIAL_BAGI === D.PICTORIAL && D.ABSTRACT_BAGI === D.ABSTRACT, "ekspor untuk pemasang");
  cek(D.POIN_PENTING.length >= 6 && D.POIN_PENTING_SUARA.every(tanpaDigit) && D.POIN_PENTING_SUARA.every(bersih) && !/[<>=×:]/.test(D.POIN_PENTING_SUARA.join(" ").replace(/:/g, "")) && tanpaDigit(D.PENUTUP_G) && /\?$/.test(D.PENUTUP_G) && bersih(D.PENUTUP_G), "poin penting dan penutup bersih, suara tanpa digit dan lambang");
  const poin = D.POIN_PENTING.join(" ").toLowerCase();
  for (const s of ["sama banyak", "pengurangan berulang", "titik dua", "pembagi", "hasil bagi", "perkalian", "keluarga fakta", "dibagi satu", "bilangan yang sama", "periksa"]) cek(poin.includes(s), `poin penting memuat "${s}"`);
  cek(D.MISI_BAGI_TEKS === DS.MISI_BAGI_TEKS && DP.MISI_BAGI_TEKS === DS.MISI_BAGI_TEKS && tanpaDigit(DS.MISI_BAGI_TEKS) && bersih(DS.MISI_BAGI_TEKS), "teks misi awal tanpa digit");
  cek(MT.MISI_K3B1.G === DS.MISI_BAGI_TEKS, "misi-teks-k3b1 baris G sama dengan MISI_BAGI_TEKS");
}

/* ------------------------------ Data Simulasi berbeda dari Story ------------------------------ */
{
  const semua = [...DS.BAGI_TUGAS.map((t) => [t.n, t.g]), ...DS.KURANG_TUGAS.map((t) => [t.n, t.g]), ...DS.TULIS_TUGAS.map((t) => [t.n, t.g]), ...DS.PERIKSA_TUGAS.map((t) => [t.n, t.g]), ...DS.KELUARGA_TUGAS.map((t) => [t.a * t.b, t.a])];
  cek(semua.every(([n, g]) => n % g === 0 && n / g >= 2 && n <= 99 && g <= 9) && !semua.some(([n, g]) => STORY.some(([a, b]) => a === n && b === g)), "simulasi: tanpa sisa, tidak ada pembagian yang sama dengan Story");
  cek(DS.BAGI_TUGAS.every((t) => t.n / t.g <= DS.BATAS_ISI && emojiSah(t.ikon)) && DS.KURANG_TUGAS.every((t) => t.n / t.g <= DS.BATAS_ISI) && DS.TULIS_TUGAS.every((t) => t.n / t.g <= DS.BATAS_ISI && emojiSah(t.ikon)), "simulasi: isian dalam batas");
  cek(DS.KELUARGA_TUGAS.every((t) => t.a !== t.b) && DS.PERIKSA_TUGAS.every((t) => t.g * t.q === t.n && t.n <= DS.BATAS_KALI), "simulasi: keluarga fakta berbeda bilangan, periksa kali tepat");
  cek(DS.BAGI_TUGAS.length === 3 && DS.KURANG_TUGAS.length === 3 && DS.TULIS_TUGAS.length === 3 && DS.KELUARGA_TUGAS.length === 3 && DS.PERIKSA_TUGAS.length === 3, "simulasi: tiga tugas tiap alat");
}

/* ------------------------------ Simulasi Meja Bingkisan ------------------------------ */
{
  const k0 = L.awalBagi();
  cek(k0.alat === "bagi" && k0.mode === "bagi" && k0.bagiBenar.length === 0 && k0.kurangBenar.length === 0 && k0.tulisBenar.length === 0 && k0.keluargaBenar.length === 0 && k0.periksaBenar.length === 0 && k0.salah === 0 && k0.bagiPutaran === 0 && k0.keluargaPilih.length === 0, "simulasi: keadaan awal bersih");
  cek(JSON.stringify(L.mulaiLagiBagi()) === JSON.stringify(k0), "simulasi: mulai lagi sama dengan awal");
  cek(L.pilihModeBagi(k0, "periksa").mode === "periksa" && L.URUT_MODE.length === 5, "simulasi: lima alat");
  const tanpa = (t) => tanpaDigit(t) && bersih(t);
  // Bagi.
  const t0 = L.tugasBagi(k0);
  cek(L.sisaTumpukan(k0) === t0.n && !L.periksaBagi(k0).ok && L.periksaBagi(k0).k.salah === 0 && tanpa(L.periksaBagi(k0).pesan), "simulasi bagi: periksa sebelum habis ditolak tanpa dihitung salah");
  let b = k0;
  let putaran = 0;
  while (L.sisaTumpukan(b) > 0) {
    const r = L.bagikanPutaran(b);
    cek(r.ok && tanpa(r.pesan), "simulasi bagi: satu putaran bergiliran");
    b = r.k;
    putaran += 1;
  }
  cek(putaran === t0.n / t0.g && L.sisaTumpukan(b) === 0 && b.bagiPutaran === t0.n / t0.g, "simulasi bagi: tumpukan habis setelah bilangan dibagi : pembagi putaran (hitung ulang)");
  cek(!L.bagikanPutaran(b).ok && tanpa(L.bagikanPutaran(b).pesan), "simulasi bagi: tumpukan habis tidak bisa dibagikan lagi");
  const salahBagi = L.periksaBagi(L.ubahIsi(b, 1));
  cek(!salahBagi.ok && salahBagi.k.bagiBenar.length === 0 && salahBagi.k.salah === 1 && tanpa(salahBagi.pesan), "simulasi bagi: isi keliru tidak dihitung");
  let isi = b;
  for (let i = 0; i < t0.n / t0.g; i += 1) isi = L.ubahIsi(isi, 1);
  const okBagi = L.periksaBagi(isi);
  cek(okBagi.ok && okBagi.k.bagiBenar.join() === "0" && okBagi.k.bagiIndeks === 1 && okBagi.k.bagiPutaran === 0 && okBagi.k.bagiIsi === 0 && tanpa(okBagi.pesan), "simulasi bagi: isi tepat dihitung, tumpukan berikutnya");
  cek(L.ubahIsi(k0, -1).bagiIsi === 0 && L.ubahIsi({ ...k0, bagiIsi: DS.BATAS_ISI }, 1).bagiIsi === DS.BATAS_ISI && L.ulangBagi(b).bagiPutaran === 0, "simulasi bagi: isian antara nol dan batas, ulang mengembalikan tumpukan");
  // Kurang.
  const tk = L.tugasKurang(k0);
  cek(L.posisiKurang(k0) === tk.n && !L.periksaKurang(k0).ok && L.periksaKurang(k0).k.salah === 0, "simulasi kurang: periksa sebelum nol ditolak");
  let g = k0;
  let lompat = 0;
  while (L.posisiKurang(g) > 0) {
    const r = L.lompatMundur(g);
    cek(r.ok && tanpa(r.pesan), "simulasi kurang: lompat mundur sebesar pembagi");
    g = r.k;
    lompat += 1;
  }
  cek(lompat === tk.n / tk.g && L.posisiKurang(g) === 0 && !L.lompatMundur(g).ok, "simulasi kurang: sampai nol setelah bilangan dibagi : pembagi lompatan (hitung ulang)");
  const salahKurang = L.periksaKurang(L.ubahHitung(g, 1));
  cek(!salahKurang.ok && salahKurang.k.kurangBenar.length === 0 && salahKurang.k.salah === 1 && tanpa(salahKurang.pesan), "simulasi kurang: banyak lompatan keliru tidak dihitung");
  let hitung = g;
  for (let i = 0; i < lompat; i += 1) hitung = L.ubahHitung(hitung, 1);
  const okKurang = L.periksaKurang(hitung);
  cek(okKurang.ok && okKurang.k.kurangBenar.join() === "0" && okKurang.k.kurangIndeks === 1 && okKurang.k.kurangLompat === 0 && tanpa(okKurang.pesan), "simulasi kurang: banyak lompatan tepat dihitung");
  // Tulis.
  const tt = L.tugasTulis(k0);
  const gagalT = L.periksaTulis(k0);
  cek(!gagalT.ok && gagalT.k.salah === 1 && tanpa(gagalT.pesan), "simulasi tulis: isian kosong tidak dihitung");
  let w = k0;
  w = L.ubahTulis(w, "a", tt.n);
  cek(/pembagi/i.test(L.periksaTulis(w).pesan), "simulasi tulis: pembagi keliru dijelaskan");
  w = L.ubahTulis(w, "b", tt.g);
  cek(/Hasil bagi/.test(L.periksaTulis(w).pesan), "simulasi tulis: hasil bagi keliru dijelaskan");
  w = L.ubahTulis(w, "c", tt.n / tt.g);
  const okTulis = L.periksaTulis(w);
  cek(okTulis.ok && okTulis.k.tulisBenar.join() === "0" && okTulis.k.tulisIndeks === 1 && okTulis.k.tulisA === 0 && tanpa(okTulis.pesan), "simulasi tulis: dibagi, pembagi, dan hasil bagi tepat dihitung");
  cek(L.ubahTulis(k0, "b", 99).tulisB === DS.BATAS_PEMBAGI && L.ubahTulis(k0, "a", -5).tulisA === 0 && L.ubahTulis(k0, "a", 10).tulisA === 10 && L.ulangTulis(w).tulisC === 0, "simulasi tulis: isian dalam batas");
  // Keluarga.
  const tf = L.tugasKeluarga(k0);
  const kartu = L.kartuKeluarga(tf.a, tf.b);
  const benarId = kartu.flatMap((c, i) => (c.ok ? [i] : []));
  cek(kartu.length === 6 && benarId.length === 4 && kartu.filter((c) => !c.ok).length === 2, "simulasi keluarga: enam kartu, empat benar, dua keliru");
  cek(kartu.every((c) => {
    const m = c.teks.match(/^(\d+) ([×:]) (\d+) = (\d+)$/);
    const [, x, op, y, z] = m.map((v, i) => (i === 2 ? v : Number(v)));
    return c.ok === (op === "×" ? x * y === z : x === y * z);
  }), "simulasi keluarga: kartu benar sesuai hitungan kali dan bagi");
  cek(new Set(kartu.map((c) => c.teks)).size === 6, "simulasi keluarga: kartu berbeda");
  let f = k0;
  cek(!L.periksaKeluarga(f).ok && L.periksaKeluarga(f).k.salah === 1 && /belum dipilih/.test(L.periksaKeluarga(f).pesan) && tanpa(L.periksaKeluarga(f).pesan), "simulasi keluarga: belum memilih ditolak");
  f = L.ketukKartu(L.ketukKartu(f, benarId[0]), benarId[0]);
  cek(f.keluargaPilih.length === 0, "simulasi keluarga: mengetuk kartu dua kali membatalkan pilihan");
  const keliruId = kartu.findIndex((c) => !c.ok);
  const f2 = benarId.reduce((x, i) => L.ketukKartu(x, i), L.ketukKartu(k0, keliruId));
  cek(!L.periksaKeluarga(f2).ok && /keliru/.test(L.periksaKeluarga(f2).pesan) && L.periksaKeluarga(f2).k.keluargaBenar.length === 0, "simulasi keluarga: kartu keliru ikut dipilih ditolak");
  const f3 = benarId.slice(0, 3).reduce((x, i) => L.ketukKartu(x, i), k0);
  cek(!L.periksaKeluarga(f3).ok && /belum dipilih/.test(L.periksaKeluarga(f3).pesan), "simulasi keluarga: kurang satu kartu ditolak");
  const okKel = L.periksaKeluarga(benarId.reduce((x, i) => L.ketukKartu(x, i), k0));
  cek(okKel.ok && okKel.k.keluargaBenar.join() === "0" && okKel.k.keluargaIndeks === 1 && okKel.k.keluargaPilih.length === 0 && tanpa(okKel.pesan), "simulasi keluarga: empat kalimat tepat dihitung");
  // Periksa.
  const tp = L.tugasPeriksa(k0);
  const gagalP = L.periksaPeriksa(k0);
  cek(!gagalP.ok && gagalP.k.salah === 1 && tanpa(gagalP.pesan), "simulasi periksa: hasil kali keliru tidak dihitung");
  let pk = k0;
  for (let i = 0; i < Math.floor((tp.g * tp.q) / 10); i += 1) pk = L.ubahKali(pk, 10);
  for (let i = 0; i < (tp.g * tp.q) % 10; i += 1) pk = L.ubahKali(pk, 1);
  const okPeriksa = L.periksaPeriksa(pk);
  cek(pk.periksaKali === tp.g * tp.q && okPeriksa.ok && okPeriksa.k.periksaBenar.join() === "0" && okPeriksa.k.periksaIndeks === 1 && okPeriksa.k.periksaKali === 0 && tanpa(okPeriksa.pesan), "simulasi periksa: hasil kali tepat dihitung");
  cek(L.ubahKali(k0, -5).periksaKali === 0 && L.ubahKali({ ...k0, periksaKali: 95 }, 10).periksaKali === DS.BATAS_KALI && L.ulangPeriksa(pk).periksaKali === 0, "simulasi periksa: hasil kali antara nol dan seratus");
  // Semua tugas melalui logika.
  let x = k0;
  for (let i = 0; i < DS.BAGI_TUGAS.length; i += 1) {
    while (L.sisaTumpukan(x) > 0) x = L.bagikanPutaran(x).k;
    for (let q = 0; q < L.tugasBagi(x).n / L.tugasBagi(x).g; q += 1) x = L.ubahIsi(x, 1);
    x = L.periksaBagi(x).k;
  }
  cek(x.bagiBenar.length === 3 && x.salah === 0, "simulasi: tiga tugas bagi tepat lewat logika");
  // Teks.
  cek(Object.values(L.SUARA_MODE).every(tanpa) && L.URUT_MODE.every((md) => tanpa(L.kalimatBagi(L.pilihModeBagi(k0, md))) && L.kalimatBagi(L.pilihModeBagi(k0, md)).length > 20), "simulasi: ucapan tiap alat tanpa digit");
  cek([0, 7, 14, 21, 38, 99].every((n) => tanpaDigit(L.kataBil(n))), "simulasi: kata bilangan tanpa digit");
}

/* ------------------------------ Misi ------------------------------ */
{
  const awal = L.awalBagi();
  const d = MK.daftarMisiK3Bab1("G");
  cek(d === MK.MISI_G && d.length === 6 && d.filter((x) => x.wajib).length === 4 && d.filter((x) => !x.wajib).length === 2 && d.every((x) => x.id.startsWith("g-")), "misi: enam misi, empat wajib, dua bebas, id berawalan g-");
  cek(d.every((x) => x.teks.length >= 10 && x.teks.length <= 120 && tanpaDigit(x.teks) && bersih(x.teks)), "misi: teks 10-120 huruf tanpa digit dan kata terlarang");
  cek(d.every((x) => !/(skor|nilai|tebak)/i.test(x.teks)), "misi: tanpa skor");
  cek(S.misiBaru(d, awal, new Set()).length === 0, "misi: keadaan awal tidak memenuhi misi");
  cek(d.every((x) => !x.cek({ alat: "kerangka" })), "misi: alat lain tidak memenuhi misi");
  // Alur lengkap melalui logika.
  let k = awal;
  while (L.sisaTumpukan(k) > 0) k = L.bagikanPutaran(k).k;
  for (let q = 0; q < L.tugasBagi(k).n / L.tugasBagi(k).g; q += 1) k = L.ubahIsi(k, 1);
  k = L.periksaBagi(k).k;
  sama(S.misiBaru(d, k, new Set()), ["g-bagi"], "misi: satu tugas bagi memenuhi g-bagi");
  while (L.posisiKurang(k) > 0) k = L.lompatMundur(k).k;
  for (let q = 0; q < L.tugasKurang(k).n / L.tugasKurang(k).g; q += 1) k = L.ubahHitung(k, 1);
  k = L.periksaKurang(k).k;
  {
    const t = L.tugasTulis(k);
    k = L.ubahTulis(L.ubahTulis(L.ubahTulis(k, "a", t.n), "b", t.g), "c", t.n / t.g);
    k = L.periksaTulis(k).k;
  }
  {
    const t = L.tugasKeluarga(k);
    const id = L.kartuKeluarga(t.a, t.b).flatMap((c, i) => (c.ok ? [i] : []));
    k = L.periksaKeluarga(id.reduce((x, i) => L.ketukKartu(x, i), k)).k;
  }
  sama(S.misiBaru(d, k, new Set(["g-bagi"])), ["g-kurang", "g-tulis", "g-keluarga"], "misi: empat misi wajib tercapai lewat logika simulasi");
  {
    const t = L.tugasPeriksa(k);
    for (let i = 0; i < Math.floor((t.g * t.q) / 10); i += 1) k = L.ubahKali(k, 10);
    for (let i = 0; i < (t.g * t.q) % 10; i += 1) k = L.ubahKali(k, 1);
    k = L.periksaPeriksa(k).k;
  }
  for (let i = 0; i < 2; i += 1) {
    while (L.sisaTumpukan(k) > 0) k = L.bagikanPutaran(k).k;
    for (let q = 0; q < L.tugasBagi(k).n / L.tugasBagi(k).g; q += 1) k = L.ubahIsi(k, 1);
    k = L.periksaBagi(k).k;
  }
  sama(S.misiBaru(d, k, new Set()), ["g-bagi", "g-kurang", "g-tulis", "g-keluarga", "g-periksa", "g-lengkap"], "misi: semua tercapai lewat logika simulasi");
  const wajib = d.filter((x) => x.wajib).map((x) => x.id);
  cek(S.wajibSelesai(d, new Set(wajib)) && !S.wajibSelesai(d, new Set(["g-bagi"])), "misi: gerbang wajib");
  cek(S.misiBaru(d, { ...awal, salah: 9, mode: "periksa", bagiPutaran: 2, bagiIsi: 3, kurangLompat: 1, kurangHitung: 2, tulisA: 5, tulisB: 2, tulisC: 4, keluargaPilih: [0, 1], periksaKali: 40, bagiIndeks: 2, periksaIndeks: 1 }, new Set()).length === 0, "misi: percobaan keliru dan geseran tidak dihitung sebagai misi");
}

/* ------------------------------ Berkas ------------------------------ */
{
  const berkas = readdirSync(folderUrl).filter((f) => /\.(ts|tsx)$/.test(f));
  for (const f of ["logika.ts", "logika-cpa.ts", "periksa.ts", "data.ts", "data-peta.ts", "data-sim.ts", "data-kartu.ts", "JawabBagi.tsx", "LangkahBagi.tsx", "TahapBagi.tsx", "KeranjangBingkisan.tsx", "PapanPesta.tsx", "SimulasiMejaBingkisan.tsx"]) cek(berkas.includes(f), `berkas ${f} ada`);
  const lihat = [...berkas.map((f) => ["bagi-k3b1g/" + f, readFileSync(new URL(f, folderUrl), "utf8")]), ["misi-k3bab1.ts", readFileSync(new URL("../src/components/modul/misi-k3bab1.ts", import.meta.url), "utf8")]];
  for (const [f, s] of lihat) {
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d || c.codePointAt(0) === 0x1f6de), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}/i.test(s), `${f}: kode emoji tidak melewati U+1FA95`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    const tanpaKomentar = s.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");
    const literal = [...tanpaKomentar.matchAll(/"((?:[^"\\\n]|\\.)*)"|`((?:[^`\\]|\\.)*)`/g)].map((mm) => mm[1] ?? mm[2]).filter((t) => /[a-z]{3,} [a-z]{2,}/i.test(t));
    const teksJsx = [...tanpaKomentar.matchAll(/>\s*([A-Za-z][^<>{}\n]{6,})\s*</g)].map((mm) => mm[1]);
    for (const t of [...literal, ...teksJsx]) {
      if (/^(use client|rounded|flex|grid|text-|min-|bg-|border|mx-|px-|py-|space-|block|w-|h-|absolute|relative|pointer|animate|sm:)/.test(t) || /(rounded|flex |grid-|text-\[|min-h|bg-\[|border-)/.test(t)) continue;
      cek(!TERLARANG.test(t.replace(/kunci(Jawab)?|\$\{[^}]*\}/g, "")), `${f}: teks layar tanpa kata terlarang ("${t.slice(0, 50)}")`);
    }
  }
}

console.log(`Lulus ${lulus}, gagal ${gagal}`);
process.exit(gagal ? 1 : 0);
