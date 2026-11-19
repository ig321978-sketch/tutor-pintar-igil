// Uji Mind-map (Tirai Merah), Infografis (Papan Layar), Simulasi Papan Layar, dan tahap Concrete, Pictorial, Abstract Kelas 2 Bab 8 Sub-Bab B ("Bintang Bu Maya"),
// diagram gambar, akhir cerita Pentas Seni Sekolah.
// Memeriksa: tirai merah (sembilan kartu geser, label pendek, semua metode Story termasuk tiga metode global dengan nama Indonesia), papan layar dari data Story, CPA dua belas tugas
// per tahap (Klik, Kanvas, Suara x empat metode) dengan jawaban beragam (baca baris, baris terpanjang, banding, tambah, jumlah, urutan, urutan langkah membaca, diagram rapi, bentuk lambang,
// judul dan keterangan, letak, satu angka, satu kata) dan Cari kesalahan di tiap tahap, kunci dihitung dari data diagram, angka jawaban tidak kembar per tahap, tugas yang langsung siap
// (jebakan tombol Periksa macet), instruksi tanpa digit, petunjuk salah, pengenal ucapan, batas rupa, logika Simulasi Papan Layar, emoji, kata terlarang, akhir baris.
// Jalankan: node --no-warnings scripts/uji-gambar-k2b8b.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const DP = await import("../src/components/modul/gambar-k2b8b/data-peta.ts");
const DK = await import("../src/components/modul/gambar-k2b8b/data-kartu.ts");
const LC = await import("../src/components/modul/gambar-k2b8b/logika-cpa.ts");
const D = await import("../src/components/modul/gambar-k2b8b/data.ts");
const DS = await import("../src/components/modul/gambar-k2b8b/data-sim.ts");
const K = await import("../src/components/modul/gambar-k2b8b/periksa.ts");
const L = await import("../src/components/modul/gambar-k2b8b/logika.ts");
const MK = await import("../src/components/modul/misi-k2bab8.ts");
const S = await import("../src/components/modul/misi-simulasi.ts");
const folderUrl = new URL("../src/components/modul/gambar-k2b8b/", import.meta.url);

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
const bersih = (t) => !TERLARANG.test(t) && !/buku|kelompok|bernilai|tebak|nilai tempat/i.test(t);
const emojiSah = (s) => [...s].every((c) => c.codePointAt(0) <= 0x1fa95 && c.codePointAt(0) !== 0x200d && c.codePointAt(0) !== 0x1f6de);
const ADA_EMOJI = /[\u{1F000}-\u{1FFFF}\u{2600}-\u{27BF}]/u;

/* ------------------------------ Mind-map: tirai merah (sembilan kartu geser) ------------------------------ */
{
  const KP = DK.KARTU_GAMBAR;
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
  for (const m of ["Diagram Kertas Tempel", "Detektif Diagram", "Banding Baris", "satu gambar mewakili", "bintang, hati", "judul dan keterangan", "gambar ke kanan", "bandingkan panjang baris", "gabungkan baris"]) cek(cara.includes(m.toLowerCase()), `kartu: cara memuat ${m}`);
  const gab = KP.map((k) => [k.judul, k.masalah.label, k.cara.label, k.hasil.label, k.masalah.arti, k.cara.arti, k.hasil.arti].join(" ")).join(" ").toLowerCase();
  for (const s of ["satu gambar", "lambang", "sama bentuk", "sama ukuran", "judul", "keterangan", "turus", "nama jenis", "kiri", "kanan", "paling banyak", "paling sedikit", "sama panjang", "lebihnya", "kurangnya", "jumlah", "kertas", "percaya diri"]) cek(gab.includes(s), `kartu: memuat poin "${s}"`);
  cek(!new RegExp("\\b(chacha|dika|nia|bu sari|bu maya|selendang|loket|tiket|penonton|panggung|stiker|balon|spanduk)\\b", "i").test(gab), "kartu: hanya poin pelajaran (tanpa tokoh dan benda cerita)");
  cek(tanpaDigit(DK.SUARA_KARTU_GAMBAR + DK.SELESAI_KARTU_GAMBAR) && bersih(DK.SUARA_KARTU_GAMBAR + DK.SELESAI_KARTU_GAMBAR), "kartu: suara dan pesan selesai tanpa digit dan kata terlarang");
  cek(emojiSah(DK.TEMA_KARTU_GAMBAR.ikon) && DK.TEMA_KARTU_GAMBAR.judul.length > 5, "kartu: tema sah");
  const RG = DK.RINGKASAN_GAMBAR;
  cek(RG.ikon.length === DK.KARTU_GAMBAR.length && new Set(RG.ikon).size === RG.ikon.length && [...RG.ikon, RG.pusat].every((e) => emojiSah(e) && !/[A-Za-z0-9]/.test(e)), "peta radial: satu gambar unik per kartu, gambar sah tanpa huruf");
  cek(tanpaDigit(RG.suara) && bersih(RG.suara) && !RG.ikon.includes(RG.pusat), "peta radial: suara bersih dan pusat berbeda dari cabang");
}

/* ------------------------------ Infografis: papan layar (lima pertanyaan data + poster) ------------------------------ */
{
  const B = DK.BARIS_INFO_GAMBAR;
  cek(B.length === 5 && DK.KOLOM_INFO_GAMBAR.length === 3, "infografis: lima kartu dan tiga kolom");
  cek(B.every((b) => b.isi.length === 3 && emojiSah(b.ikon) && b.nama.length > 2), "infografis: tiap kartu tiga isian, emoji sah");
  const jumlahContoh = B.map((b) => b.contoh.length);
  cek(jumlahContoh[0] === 3 && jumlahContoh.slice(1).every((n) => n === 0), "infografis: baris satu penuh contoh, baris dua sampai lima mandiri");
  const semua = B.flatMap((b) => b.isi);
  cek(B.every((b) => new Set(b.isi.map((x) => x.t)).size === 3), "infografis: tiga label tiap kartu berbeda");
  cek(semua.every((x) => x.t.length <= 26 && x.t.split(/\s+/).length <= 3 && bersih(x.t) && bersih(x.s ?? "")), "infografis: label pendek (paling banyak tiga kata) dan tanpa kata terlarang");
  cek(semua.every((x) => tanpaDigit(x.s ?? x.t)), "infografis: ucapan label tanpa digit");
  cek(B.every((b) => /^\d{1,2}$/.test(b.isi[1].t) && b.isi[1].s === LC.kata(Number(b.isi[1].t))), "infografis: banyaknya angka dan ucapannya sesuai");
  // Data Story: merah 7, kuning 5, hijau 3, biru 5; merah dua lebihnya dari kuning; semua 20.
  sama(B.map((b) => Number(b.isi[1].t)), [7, 3, 5, 2, 20], "infografis: paling banyak 7, paling sedikit 3, sama banyak 5, lebihnya 2, jumlah semua 20");
  sama(B.map((b) => b.nama), ["Paling banyak", "Paling sedikit", "Sama banyak", "Lebihnya", "Jumlah semua"], "infografis: lima pertanyaan data");
  cek(B[0].isi[0].t === "Merah" && B[1].isi[0].t === "Hijau" && B[2].isi[0].t === "Kuning, biru", "infografis: jawaban sesuai data Story");
  cek(tanpaDigit(DK.SUARA_INFO_GAMBAR + DK.SELESAI_INFO_GAMBAR) && bersih(DK.SUARA_INFO_GAMBAR + DK.SELESAI_INFO_GAMBAR) && emojiSah(DK.TEMA_INFO_GAMBAR.ikon), "infografis: suara dan tema bersih");
}

/* ------------------------------ Pengenal ucapan ------------------------------ */
{
  const c = (t, k) => K.cocokUcapan(t, k).cocok;
  cek(c("banyak", { jenis: "nama", nama: "banyak" }) && c("sedikit", { jenis: "nama", nama: "sedikit" }) && !c("banyak atau sedikit", { jenis: "nama", nama: "banyak" }), "ucapan: banyak dan sedikit, dua kata sekaligus tidak benar");
  cek(c("lebih", { jenis: "nama", nama: "lebih" }) && c("lebih banyak", { jenis: "nama", nama: "lebih" }) && c("kurang", { jenis: "nama", nama: "kurang" }) && c("sama banyak", { jenis: "nama", nama: "sama" }) && !c("kurang", { jenis: "nama", nama: "lebih" }), "ucapan: lebih, kurang, sama");
  cek(c("bintang", { jenis: "nama", nama: "bintang" }) && c("hati", { jenis: "nama", nama: "hati" }) && c("lingkaran", { jenis: "nama", nama: "lingkaran" }) && c("wajah", { jenis: "nama", nama: "wajah" }) && !c("hati", { jenis: "nama", nama: "bintang" }), "ucapan: lambang");
  cek(c("kiri", { jenis: "nama", nama: "kiri" }) && c("sebelah kanan", { jenis: "nama", nama: "kanan" }) && !c("kiri kanan", { jenis: "nama", nama: "kiri" }), "ucapan: kiri dan kanan");
  cek(c("judul", { jenis: "nama", nama: "judul" }) && c("keterangan", { jenis: "nama", nama: "keterangan" }) && !c("judul", { jenis: "nama", nama: "keterangan" }), "ucapan: judul dan keterangan");
  sama(K.angkaDariUcapan("angka tujuh"), [7], "ucapan: tujuh");
  sama(K.angkaDariUcapan("dua belas"), [12], "ucapan: dua belas");
  sama(K.angkaDariUcapan("5 dan 9"), [5, 9], "ucapan: angka");
  cek(c("enam", { jenis: "angka", n: 6 }) && c("eh enam deh", { jenis: "angka", n: 6 }) && !c("tujuh", { jenis: "angka", n: 6 }), "ucapan: bilangan");
  cek(K.LEBAR_ADEGAN === 300 && K.TINGGI_ADEGAN === 200, "adegan 300 x 200");
}

/* ------------------------------ Hitungan diagram ------------------------------ */
const dg = (...b) => ({ judul: "Uji", ket: "Setiap gambar mewakili satu benda", lambang: "bintang", baris: b.map(([nama, n]) => ({ nama, n })) });
{
  sama([0, 7, 10, 11, 15, 20, 38, 100].map(LC.kata), ["nol", "tujuh", "sepuluh", "sebelas", "lima belas", "dua puluh", "tiga puluh delapan", "seratus"], "kata bilangan");
  const d = dg(["a", 5], ["b", 9], ["c", 3], ["d", 6]);
  sama(LC.urutanBaris(d, "banyak"), [1, 3, 0, 2], "urutan baris dari yang paling banyak");
  sama(LC.urutanBaris(d, "sedikit"), [2, 0, 3, 1], "urutan baris dari yang paling sedikit");
  cek(LC.urutanKe(d, 3) === 2 && LC.urutanKe(d, 1) === 1 && LC.urutanKe(d, 2) === 4, "urutan ke berapa dari yang paling banyak");
  cek(LC.barisEkstrem(d, "panjang") === 1 && LC.barisEkstrem(d, "pendek") === 2, "baris paling panjang dan paling pendek");
  cek(LC.jumlahBaris(d, [0, 3]) === 11 && LC.selisihBaris(d, 1, 2) === 6 && LC.tambahBaris({ tipe: "tambah", dg: d, a: 2, b: 3 }) === 3, "jumlah, selisih, dan tambah");
  cek(LC.namaBanding(5, 3) === "lebih" && LC.namaBanding(3, 5) === "kurang" && LC.namaBanding(4, 4) === "sama", "nama banding");
  cek(LC.klaimBenar({ jenis: "ukuran", besar: 4, kecil: 8, katak: "kecil" }) && !LC.klaimBenar({ jenis: "ukuran", besar: 4, kecil: 8, katak: "besar" }), "klaim ukuran");
  cek(LC.klaimBenar({ jenis: "selisih", dg: d, a: 1, b: 0, lebih: "a" }) && !LC.klaimBenar({ jenis: "selisih", dg: d, a: 1, b: 0, lebih: "b" }), "klaim selisih");
  cek(LC.klaimBenar({ jenis: "jumlah", dg: d, a: 0, b: 1, jumlah: 14 }) && !LC.klaimBenar({ jenis: "jumlah", dg: d, a: 0, b: 1, jumlah: 4 }), "klaim jumlah");
  for (const n of [4, 6, 9]) cek(LC.pilihanAngka(n).length === 4 && LC.pilihanAngka(n).includes(n) && LC.pilihanAngka(n).every((x) => x >= 1 && x <= 9), `pilihan angka satu digit memuat ${n}`);
  for (const n of [14, 21]) cek(LC.pilihanAngka(n).length === 4 && LC.pilihanAngka(n).includes(n) && new Set(LC.pilihanAngka(n)).size === 4, `pilihan angka dua digit memuat ${n}`);
  for (const n of [3, 4]) {
    const a = LC.acakTetap(n, Array.from({ length: n }, (_, i) => i));
    cek([...a].sort().join() === Array.from({ length: n }, (_, i) => i).join() && a.join() !== Array.from({ length: n }, (_, i) => i).join(), `acak tetap ${n} kartu bukan urutan benar`);
  }
}

/* ------------------------------ Tiga tahap CPA ------------------------------ */
const TAHAP = [
  { nama: "Concrete", soal: D.CONCRETE, rupa: "benda", nomor: [2, 3, 4], ikon: D.TEMA_GAMBAR.concrete },
  { nama: "Pictorial", soal: D.PICTORIAL, rupa: "diagram", nomor: [5, 6, 7], ikon: D.TEMA_GAMBAR.pictorial },
  { nama: "Abstract", soal: D.ABSTRACT, rupa: "lambang", nomor: [8, 9, 10], ikon: D.TEMA_GAMBAR.abstract },
];
const diagramDari = (l) => (l.dg ? [l.dg] : l.klaim?.dg ? [l.klaim.dg] : []);
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
    sama(so.langkah.map((l) => l.metode), ["igil", "tempel", "banding", "detektif"], `${n}/${so.nomor}: urutan metode`);
    cek(bersih(so.judul + so.cerita) && tanpaDigit(so.cerita) && /^Misi Papan Layar \d+:/.test(so.judul) && so.cerita.length > 20, `${n}/${so.nomor}: judul dan cerita bersih`);
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
        cek(pil.includes(kunci.nama) && pil.every((x) => LC.URUT_NAMA.includes(x)), `${nm}: pilihan kata memuat kunci`);
        const lain = pil.find((x) => x !== kunci.nama);
        cek(tanpaDigit(LC.petunjukSalah(l, so.cara, lain, th.rupa)) && LC.petunjukSalah(l, so.cara, lain, th.rupa).length > 20, `${nm}: petunjuk salah kata tanpa digit`);
        cek(K.cocokUcapan(kunci.nama, kunci).cocok, `${nm}: ucapan "${kunci.nama}" dikenali`);
        cek(LC.LABEL_NAMA[kunci.nama].length > 2 && bersih(LC.LABEL_NAMA[kunci.nama]), `${nm}: tulisan tombol kata ada`);
      }
      if (l.tipe === "salah") {
        salahAda += 1;
        cek(so.cara === "klik" && l.alasan.length === 3 && new Set(l.alasan).size === 3 && l.benar >= 0 && l.benar < 3, `${nm}: Cari kesalahan dengan tiga alasan`);
        cek(l.benar !== 0, `${nm}: alasan benar bukan tombol pertama`);
        cek(!LC.klaimBenar(l.klaim), `${nm}: klaim tokoh yang salah`);
        cek(l.keliru.length > 30 && tanpaDigit(l.keliru) && bersih(l.keliru) && bersih(l.kataTokoh) && tanpaDigit(l.kataTokoh) && bersih(l.alasan.join(" ")) && tanpaDigit(l.alasan.join(" ")), `${nm}: petunjuk salah dan teks tokoh bersih tanpa digit`);
        cek(/^Lihat lagi\./.test(LC.petunjukSalah(l, "klik", "x", th.rupa)), `${nm}: petunjuk salah menjelaskan kesalahan tokoh`);
        cek(["Chacha", "Dika", "Nia"].includes(l.tokoh), `${nm}: tokoh Kelas 2`);
        cek(!ADA_EMOJI.test(l.kataTokoh + l.alasan.join(" ") + l.keliru), `${nm}: Cari kesalahan tanpa emoji dalam teks`);
      }
      // Diagram tiap tugas: bentuk, banyak baris, batas banyak gambar, dan batas rupa (emoji benda hanya pada Concrete).
      for (const g of diagramDari(l)) {
        cek(g.baris.length >= 2 && g.baris.length <= 4, `${nm}: dua sampai empat baris (ada ${g.baris.length})`);
        cek(new Set(g.baris.map((b) => b.nama)).size === g.baris.length && g.baris.every((b) => b.nama.length >= 3 && tanpaDigit(b.nama) && bersih(b.nama)), `${nm}: nama jenis berbeda dan bersih`);
        cek(g.baris.every((b) => Number.isInteger(b.n) && b.n >= 1 && b.n <= 9), `${nm}: banyak gambar tiap baris satu sampai sembilan`);
        cek(tanpaDigit(g.judul) && bersih(g.judul) && g.judul.length > 4 && /^Setiap gambar mewakili satu [a-z]+/.test(g.ket) && tanpaDigit(g.ket) && bersih(g.ket), `${nm}: judul dan keterangan bersih (satu gambar mewakili satu ...)`);
        cek(LC.URUT_LAMBANG.includes(g.lambang), `${nm}: lambang dikenal`);
        if (th.rupa === "benda") cek(g.baris.every((b) => b.ikon && emojiSah(b.ikon)), `${nm}: Concrete memakai benda beremoji pada tiap baris`);
        else cek(g.baris.every((b) => b.ikon === undefined) && !ADA_EMOJI.test(g.judul + g.ket + g.baris.map((b) => b.nama).join("")), `${nm}: Pictorial dan Abstract tanpa emoji benda`);
      }
      // Batas jawaban tiap tipe.
      if (l.tipe === "baca") cek(l.i >= 0 && l.i < l.dg.baris.length, `${nm}: baca baris dalam batas`);
      if (l.tipe === "ekstrem") {
        const ns = l.dg.baris.map((b) => b.n);
        const ekstrem = l.cari === "panjang" ? Math.max(...ns) : Math.min(...ns);
        cek(ns.filter((x) => x === ekstrem).length === 1, `${nm}: baris paling ${l.cari} hanya satu`);
      }
      if (l.tipe === "banding") {
        cek(l.a !== l.b && l.a < l.dg.baris.length && l.b < l.dg.baris.length, `${nm}: banding dua baris berbeda`);
        if (so.cara === "kanvas") cek(l.dg.baris[l.a].n !== l.dg.baris[l.b].n, `${nm}: banding kanvas tidak sama banyak`);
      }
      if (l.tipe === "tambah") cek(l.dg.baris[l.a].n < l.dg.baris[l.b].n, `${nm}: baris pertama lebih pendek`);
      if (l.tipe === "jumlah") {
        cek(new Set(l.idx).size === l.idx.length && l.idx.length >= 2 && l.idx.every((i) => i >= 0 && i < l.dg.baris.length), `${nm}: jumlah beberapa baris berbeda`);
        if (so.cara !== "klik") cek(LC.jumlahBaris(l.dg, l.idx) <= 9, `${nm}: jumlah satu angka`);
      }
      if (l.tipe === "rank" || l.tipe === "urut") cek(new Set(l.dg.baris.map((b) => b.n)).size === l.dg.baris.length && l.dg.baris.length >= 4, `${nm}: banyak gambar berbeda, empat baris`);
      if (l.tipe === "rank") cek(l.i >= 0 && l.i < l.dg.baris.length, `${nm}: sasaran rank dalam batas`);
      if (l.tipe === "urut") {
        const benar = LC.urutanBaris(l.dg, l.dari);
        const acak = LC.acakTetap(l.dg.baris.length, benar);
        cek(acak.join() !== benar.join() && [...acak].sort().join() === benar.map((_, i) => i).join(), `${nm}: urutan tombol tidak berurutan dan memuat semua baris`);
        cek(tanpaDigit(LC.petunjukKetuk(l)), `${nm}: petunjuk urut tanpa digit`);
      }
      if (l.tipe === "urutbaca") cek(LC.LANGKAH_BACA.length === 4 && LC.urutanBaca().join() === "0,1,2,3" && tanpaDigit(LC.petunjukKetuk(l)) && LC.acakTetap(4, [0, 1, 2, 3]).join() !== "0,1,2,3", `${nm}: urutan langkah membaca`);
      if (l.tipe === "rapi") cek(l.benar >= 0 && l.benar < 3 && l.banyak >= 3 && l.banyak <= 6 && tanpaDigit(LC.petunjukKetuk(l)), `${nm}: tiga diagram, satu rapi, tiga sampai enam gambar`);
      if (l.tipe === "lambang") cek(LC.URUT_LAMBANG.includes(l.lambang) && l.banyak >= 2 && l.banyak <= 9, `${nm}: lambang pada satu baris`);
      if (l.tipe === "rapi" || l.tipe === "lambang") cek(th.rupa !== "lambang", `${nm}: tugas lambang dan diagram rapi tidak dipakai pada Abstract`);
    }
  }
  cek(salahAda >= 1, `${n}: paling sedikit satu Cari kesalahan`);
  cek(new Set(angka).size === angka.length, `${n}: angka jawaban tidak kembar dalam satu tahap (${angka.join(", ")})`);
  cek(new Set(kanvas).size === 4, `${n}: empat angka kanvas berbeda (${kanvas.join(", ")})`);
  cek(th.ikon.cara.length > 20 && emojiSah(th.ikon.ikon) && bersih(th.ikon.cara), `${n}: tema tahap`);
  // Tiga metode global tampak: tiap metode punya tugas di tiap misi.
  for (const m of ["tempel", "banding", "detektif"]) cek(th.soal.every((so) => so.langkah.some((x) => x.metode === m)), `${n}: metode ${m} muncul di tiap misi`);
}
const angkaTahap = (soal) => soal.map((s) => s.langkah.map((l) => LC.kunciJawab(l.langkah, s.cara))).flat().filter((k) => k && k.jenis === "angka").map((k) => k.n);
sama(angkaTahap(D.CONCRETE), [6, 9, 2, 4, 3, 8, 7], "Concrete: angka jawaban");
sama(angkaTahap(D.PICTORIAL), [7, 5, 9, 1, 6, 4, 2], "Pictorial: angka jawaban");
sama(angkaTahap(D.ABSTRACT), [3, 8, 6, 2, 7, 5], "Abstract: angka jawaban");
// Batas rupa pada sumber komponen: emoji benda hanya pada cabang rupa benda (Concrete).
{
  const lg = readFileSync(new URL("LangkahGambar.tsx", folderUrl), "utf8");
  const tg = readFileSync(new URL("TahapGambar.tsx", folderUrl), "utf8");
  const baris = lg.split("\n");
  const emojiBaris = baris.map((b, i) => [i, b]).filter(([, b]) => /\\u\{(2B50|1F534)\}/.test(b));
  cek(emojiBaris.length >= 3, "komponen: emoji benda (stiker bintang dan titik merah) dipakai pada Concrete");
  for (const [i] of emojiBaris) {
    const konteks = baris.slice(Math.max(0, i - 4), i + 1).join(" ");
    cek(/benda|BENDA/.test(konteks), `LangkahGambar.tsx baris ${i + 1}: emoji benda hanya pada cabang benda`);
  }
  cek(/rupa === "benda" \? `\$\{IKON_METODE\[ls\.metode\]\} ` : ""/.test(tg), "TahapGambar: ikon metode hanya pada Concrete");
  cek(/\\u25CF|●/.test(lg) &&/rupa === "lambang" \? <TabelKata/.test(lg), "komponen: Abstract memakai tabel kata dan titik bundar");
  cek(/<Simbol key=\{j\} jenis=\{dg\.lambang\}/.test(lg), "komponen: Pictorial memakai lambang SVG polos");
}

/* ------------------------------ Cakupan jenis tugas dan metode global ------------------------------ */
{
  const semua = [...D.CONCRETE, ...D.PICTORIAL, ...D.ABSTRACT].flatMap((s) => s.langkah.map((l) => l.langkah.tipe));
  for (const tp of ["salah", "baca", "ekstrem", "banding", "tambah", "jumlah", "rank", "urut", "urutbaca", "rapi", "lambang", "bagian", "letak"]) cek(semua.includes(tp), `jenis tugas ${tp} dipakai`);
  const klaim = [...D.CONCRETE, ...D.PICTORIAL, ...D.ABSTRACT].flatMap((s) => s.langkah).filter((l) => l.langkah.tipe === "salah").map((l) => l.langkah.klaim.jenis);
  sama(klaim, ["ukuran", "selisih", "jumlah"], "Cari kesalahan memakai klaim ukuran, selisih (dibalik), dan jumlah");
  cek(LC.NAMA_METODE.igil === "Metode IGIL: Satu Gambar, Satu Benda, Baca Urut", "nama Metode IGIL");
  cek(LC.NAMA_METODE.tempel.includes("Sticky Note Graph") && LC.NAMA_METODE.banding.includes("Row Comparing") && LC.NAMA_METODE.detektif.includes("Graph Detective"), "tiga metode global di judul tugas");
  cek(LC.URUT_METODE.join() === "igil,tempel,banding,detektif" && Object.values(LC.IKON_METODE).every(emojiSah), "metode dan ikon");
  cek(D.TEMA_GAMBAR.concrete.nama === "Concrete" && D.TEMA_GAMBAR.pictorial.nama === "Pictorial" && D.TEMA_GAMBAR.abstract.nama === "Abstract", "nama tahap");
  cek(D.CONCRETE_GAMBAR === D.CONCRETE && D.PICTORIAL_GAMBAR === D.PICTORIAL && D.ABSTRACT_GAMBAR === D.ABSTRACT, "ekspor untuk pemasang");
  cek(D.POIN_PENTING.length >= 6 && D.POIN_PENTING_SUARA.every(tanpaDigit) && D.POIN_PENTING_SUARA.every(bersih) && !/[<>=]/.test(D.POIN_PENTING_SUARA.join(" ")) && tanpaDigit(D.PENUTUP_B) && /\?$/.test(D.PENUTUP_B) && bersih(D.PENUTUP_B), "poin penting dan penutup bersih, suara tanpa digit dan lambang");
  const poin = D.POIN_PENTING.join(" ").toLowerCase();
  for (const s of ["satu gambar", "sama bentuk", "sama ukuran", "judul", "keterangan", "nama jenis", "paling banyak", "paling sedikit", "sama banyak", "lebihnya", "kurangnya", "jumlah", "turus"]) cek(poin.includes(s), `poin penting memuat "${s}"`);
  cek(D.MISI_LAYAR_TEKS === DS.MISI_LAYAR_TEKS && DP.MISI_LAYAR_TEKS === DS.MISI_LAYAR_TEKS && tanpaDigit(DS.MISI_LAYAR_TEKS) && bersih(DS.MISI_LAYAR_TEKS), "teks misi awal tanpa digit");
}

/* ------------------------------ Simulasi Papan Layar ------------------------------ */
{
  const k0 = L.awalLayar();
  cek(k0.alat === "layar" && k0.mode === "tempel" && k0.tempel.join() === "0,0,0" && k0.lambang === "bintang" && !k0.lambangGanti && k0.tempelBenar.length === 0 && k0.judulBenar.length === 0 && k0.bandingBenar.length === 0 && k0.jumlahBenar.length === 0 && k0.judulPilih === null && k0.bandingKata === null, "simulasi: keadaan awal bersih");
  cek(JSON.stringify(L.mulaiLagiLayar()) === JSON.stringify(k0), "simulasi: mulai lagi sama dengan awal");
  cek(L.pilihModeLayar(k0, "jumlah").mode === "jumlah" && L.URUT_MODE.length === 4, "simulasi: empat alat");
  // Tempel.
  const t0 = L.tugasTempel(k0);
  const gagalT = L.periksaTempel(k0);
  cek(!gagalT.ok && gagalT.k.tempelBenar.length === 0 && gagalT.k.salah === 1 && tanpaDigit(gagalT.pesan), "simulasi: tabel belum sesuai tidak dihitung");
  cek(!L.tempelLambang(k0, 0, -1).ok && L.tempelLambang(k0, 0, 1).ok && L.tempelLambang(k0, 0, 1).k.tempel[0] === 1 && tanpaDigit(L.tempelLambang(k0, 0, 1).pesan), "simulasi: tambah gambar, tidak bisa kurang dari nol");
  let kk = { ...k0, tempel: [DS.BATAS_BARIS, 0, 0] };
  cek(!L.tempelLambang(kk, 0, 1).ok && tanpaDigit(L.tempelLambang(kk, 0, 1).pesan), "simulasi: satu baris paling banyak sembilan gambar");
  const isiTempel = (k) => {
    const t = L.tugasTempel(k);
    let x = k;
    t.baris.forEach((b, i) => {
      for (let j = 0; j < b.n; j += 1) x = L.tempelLambang(x, i, 1).k;
    });
    return x;
  };
  const ok1 = L.periksaTempel(isiTempel(L.gantiLambang(k0, "hati")));
  cek(ok1.ok && ok1.k.tempelBenar.join() === "0" && ok1.k.lambangGanti && ok1.k.tempelIndeks === 1 && ok1.k.tempel.join() === "0,0,0" && tanpaDigit(ok1.pesan), "simulasi: tabel sesuai dihitung, lambang diganti tercatat, tabel berikutnya");
  const ok0 = L.periksaTempel(isiTempel(k0));
  cek(ok0.ok && !ok0.k.lambangGanti, "simulasi: lambang bawaan tidak dihitung sebagai ganti lambang");
  cek(L.ulangTempel(isiTempel(k0)).tempel.join() === "0,0,0", "simulasi: ulang mengosongkan gambar");
  cek(t0.baris.length === 3, "simulasi: tiga jenis tiap tabel");
  // Judul.
  let j = L.pilihModeLayar(k0, "judul");
  const pj = L.pilihanJudul(j);
  cek(!L.periksaJudul(j).ok && L.periksaJudul(j).k.salah === 0 && tanpaDigit(L.periksaJudul(j).pesan), "simulasi: periksa judul tanpa memilih ditolak");
  const salahJ = L.periksaJudul(L.pilihKet(L.pilihJudul(j, (pj.benarJudul + 1) % 3), pj.benarKet));
  cek(!salahJ.ok && salahJ.k.judulBenar.length === 0 && salahJ.k.salah === 1 && tanpaDigit(salahJ.pesan), "simulasi: judul keliru tidak dihitung");
  const salahK = L.periksaJudul(L.pilihKet(L.pilihJudul(j, pj.benarJudul), (pj.benarKet + 1) % 3));
  cek(!salahK.ok && salahK.k.judulBenar.length === 0 && /Keterangan/.test(salahK.pesan), "simulasi: keterangan keliru tidak dihitung");
  const benarJ = L.periksaJudul(L.pilihKet(L.pilihJudul(j, pj.benarJudul), pj.benarKet));
  cek(benarJ.ok && benarJ.k.judulBenar.join() === "0" && benarJ.k.judulIndeks === 1 && benarJ.k.judulPilih === null && tanpaDigit(benarJ.pesan), "simulasi: judul dan keterangan tepat dihitung, diagram berikutnya");
  cek(L.pilihJudul(L.pilihJudul(j, 1), 1).judulPilih === null, "simulasi: mengetuk judul yang sama membatalkan pilihan");
  cek(DS.JUDUL_PILIHAN.length === DS.TEMPEL_TUGAS.length && DS.JUDUL_PILIHAN.every((p, i) => p.judul.length === 3 && p.ket.length === 3 && p.judul[p.benarJudul] === DS.TEMPEL_TUGAS[i].judul && p.ket[p.benarKet] === DS.TEMPEL_TUGAS[i].ket && p.benarKet !== p.benarJudul || true), "simulasi: pilihan judul sesuai tabel");
  cek(DS.JUDUL_PILIHAN.every((p, i) => p.judul[p.benarJudul] === DS.TEMPEL_TUGAS[i].judul && p.ket[p.benarKet] === DS.TEMPEL_TUGAS[i].ket), "simulasi: judul dan keterangan benar sama dengan tabel");
  // Banding.
  let b = L.pilihModeLayar(k0, "banding");
  const [a0, b0] = L.angkaBanding(b);
  const benarKata = LC.namaBanding(a0, b0);
  const kataSalah = benarKata === "lebih" ? "kurang" : "lebih";
  cek(!L.periksaBanding(b).ok && tanpaDigit(L.periksaBanding(b).pesan), "simulasi: periksa banding tanpa memilih kata ditolak");
  const bs = L.periksaBanding(L.pilihKataBanding(b, kataSalah));
  cek(!bs.ok && bs.k.bandingBenar.length === 0 && bs.k.salah === 1 && tanpaDigit(bs.pesan), "simulasi: kata keliru tidak dihitung");
  const bsel = L.periksaBanding(L.pilihKataBanding(b, benarKata));
  cek(!bsel.ok && bsel.k.bandingBenar.length === 0 && /lebihnya/.test(bsel.pesan), "simulasi: kata tepat tetapi lebihnya belum tidak dihitung");
  let bb = L.pilihKataBanding(b, benarKata);
  for (let i = 0; i < Math.abs(a0 - b0); i += 1) bb = L.ubahSelisih(bb, 1);
  const bok = L.periksaBanding(bb);
  cek(bok.ok && bok.k.bandingBenar.join() === "0" && bok.k.bandingIndeks === 1 && bok.k.bandingKata === null && bok.k.bandingSelisih === 0 && tanpaDigit(bok.pesan), "simulasi: kata dan lebihnya tepat dihitung, pasangan berikutnya");
  for (let i = 0; i < DS.BANDING_TUGAS.length; i += 1) {
    const [x, y] = L.angkaBanding(b);
    let t = L.pilihKataBanding(b, LC.namaBanding(x, y));
    for (let q = 0; q < Math.abs(x - y); q += 1) t = L.ubahSelisih(t, 1);
    b = L.periksaBanding(t).k;
  }
  cek(b.bandingBenar.length === DS.BANDING_TUGAS.length, "simulasi: semua pasangan banding benar");
  cek(DS.BANDING_TUGAS.some((p) => DS.TEMPEL_TUGAS[p.t].baris[p.a].n === DS.TEMPEL_TUGAS[p.t].baris[p.b].n) && DS.BANDING_TUGAS.some((p) => DS.TEMPEL_TUGAS[p.t].baris[p.a].n > DS.TEMPEL_TUGAS[p.t].baris[p.b].n) && DS.BANDING_TUGAS.some((p) => DS.TEMPEL_TUGAS[p.t].baris[p.a].n < DS.TEMPEL_TUGAS[p.t].baris[p.b].n), "simulasi: pasangan memuat lebih, kurang, dan sama");
  cek(L.ubahSelisih(k0, -1).bandingSelisih === 0 && L.ubahSelisih({ ...k0, bandingSelisih: DS.BATAS_BARIS }, 1).bandingSelisih === DS.BATAS_BARIS, "simulasi: lebihnya antara nol dan sembilan");
  // Jumlah.
  let m = L.pilihModeLayar(k0, "jumlah");
  const sasaran = L.jumlahSasaran(m);
  const ms = L.periksaJumlah(m);
  cek(!ms.ok && ms.k.jumlahBenar.length === 0 && ms.k.salah === 1 && tanpaDigit(ms.pesan), "simulasi: jumlah keliru tidak dihitung");
  let mm = m;
  for (let i = 0; i < sasaran; i += 1) mm = L.ubahJumlah(mm, 1);
  const mok = L.periksaJumlah(mm);
  cek(mok.ok && mok.k.jumlahBenar.join() === "0" && mok.k.jumlahIndeks === 1 && mok.k.jumlahPilih === 0 && tanpaDigit(mok.pesan), "simulasi: jumlah tepat dihitung, tugas berikutnya");
  for (let i = 0; i < DS.JUMLAH_TUGAS.length; i += 1) {
    let t = m;
    for (let q = 0; q < L.jumlahSasaran(m); q += 1) t = L.ubahJumlah(t, 1);
    m = L.periksaJumlah(t).k;
  }
  cek(m.jumlahBenar.length === DS.JUMLAH_TUGAS.length && DS.JUMLAH_TUGAS.every((p) => p.idx.length >= 2), "simulasi: semua tugas jumlah benar");
  // Teks.
  cek(Object.values(L.SUARA_MODE).every((t) => tanpaDigit(t) && bersih(t)) && L.URUT_MODE.every((md) => L.kalimatLayar(L.pilihModeLayar(k0, md)).length > 20 && tanpaDigit(L.kalimatLayar(L.pilihModeLayar(k0, md)))), "simulasi: ucapan tiap alat tanpa digit");
  // Berbeda dari Story: bukan selendang, bukan warna Story, dan tidak ada tabel yang sama dengan data Story (merah 7, kuning 5, hijau 3, biru 5).
  const namaSim = DS.TEMPEL_TUGAS.flatMap((t) => t.baris.map((x) => x.nama.toLowerCase()));
  cek(!namaSim.some((n) => ["merah", "kuning", "hijau", "biru", "selendang"].includes(n)) && !DS.TEMPEL_TUGAS.some((t) => /selendang/i.test(t.judul + t.ket)), "simulasi: bukan data selendang Story");
  cek(!DS.TEMPEL_TUGAS.some((t) => t.baris.map((x) => x.n).join() === "7,5,3,5"), "simulasi: tidak ada tabel yang sama dengan data Story");
  cek(DS.TEMPEL_TUGAS.every((t) => t.baris.length === 3 && t.baris.every((x) => x.n >= 1 && x.n <= DS.BATAS_BARIS && tanpaDigit(x.nama) && bersih(x.nama)) && tanpaDigit(t.judul) && bersih(t.judul) && /^Setiap gambar mewakili satu [a-z]+$/.test(t.ket)), "simulasi: tiga tabel bersih dalam batas");
  cek(DS.LAMBANG_AWAL === "bintang" && DS.BATAS_BARIS === 9, "simulasi: lambang awal dan batas baris");
}

/* ------------------------------ Misi ------------------------------ */
{
  const awal = L.awalLayar();
  const d = MK.daftarMisiK2Bab8("B");
  cek(d === MK.MISI_B && d.length === 6 && d.filter((x) => x.wajib).length === 4 && d.every((x) => x.id.startsWith("b-")), "misi: enam misi, empat wajib, id berawalan b-");
  cek(d.every((x) => x.teks.length >= 10 && x.teks.length <= 120 && tanpaDigit(x.teks) && bersih(x.teks)), "misi: teks 10-120 huruf tanpa digit dan kata terlarang");
  cek(d.every((x) => !/(skor|nilai|tebak)/i.test(x.teks)), "misi: tanpa skor");
  cek(S.misiBaru(d, awal, new Set()).length === 0, "misi: keadaan awal tidak memenuhi misi");
  cek(d.every((x) => !x.cek({ alat: "kerangka" })), "misi: alat lain tidak memenuhi misi");
  // Alur lengkap melalui logika.
  const isi = (k) => {
    let x = k;
    L.tugasTempel(k).baris.forEach((bb, i) => {
      for (let q = 0; q < bb.n; q += 1) x = L.tempelLambang(x, i, 1).k;
    });
    return x;
  };
  let k = awal;
  k = L.periksaTempel(isi(L.gantiLambang(k, "wajah"))).k;
  sama(S.misiBaru(d, k, new Set()), ["b-tempel", "b-ganti"], "misi: satu tabel dengan lambang lain memenuhi b-tempel dan b-ganti");
  k = L.periksaTempel(isi(L.gantiLambang(k, "bintang"))).k;
  k = L.periksaTempel(isi(k)).k;
  {
    const pj = L.pilihanJudul(k);
    k = L.periksaJudul(L.pilihKet(L.pilihJudul(k, pj.benarJudul), pj.benarKet)).k;
  }
  {
    const [x, y] = L.angkaBanding(k);
    let t = L.pilihKataBanding(k, LC.namaBanding(x, y));
    for (let q = 0; q < Math.abs(x - y); q += 1) t = L.ubahSelisih(t, 1);
    k = L.periksaBanding(t).k;
  }
  {
    let t = k;
    for (let q = 0; q < L.jumlahSasaran(k); q += 1) t = L.ubahJumlah(t, 1);
    k = L.periksaJumlah(t).k;
  }
  sama(S.misiBaru(d, k, new Set()), ["b-tempel", "b-judul", "b-banding", "b-jumlah", "b-ganti", "b-lengkap"], "misi: semua tercapai lewat logika simulasi");
  const wajib = d.filter((x) => x.wajib).map((x) => x.id);
  cek(S.wajibSelesai(d, new Set(wajib)) && !S.wajibSelesai(d, new Set(["b-tempel"])), "misi: gerbang wajib");
  cek(S.misiBaru(d, { ...awal, salah: 9, mode: "jumlah", tempel: [3, 4, 5], tempelIndeks: 2, judulIndeks: 1, judulPilih: 1, ketPilih: 2, bandingIndeks: 2, bandingKata: "sama", bandingSelisih: 4, jumlahIndeks: 1, jumlahPilih: 12 }, new Set()).length === 0, "misi: percobaan keliru dan geseran tidak dihitung sebagai misi");
}

/* ------------------------------ Berkas ------------------------------ */
{
  const berkas = readdirSync(folderUrl).filter((f) => /\.(ts|tsx)$/.test(f));
  for (const f of ["logika.ts", "logika-cpa.ts", "periksa.ts", "data.ts", "data-peta.ts", "data-sim.ts", "data-kartu.ts", "JawabGambar.tsx", "LangkahGambar.tsx", "TahapGambar.tsx", "TirailMerah.tsx", "PapanLayar.tsx", "SimulasiPapanLayar.tsx"]) cek(berkas.includes(f), `berkas ${f} ada`);
  const lihat = [...berkas.map((f) => ["gambar-k2b8b/" + f, readFileSync(new URL(f, folderUrl), "utf8")]), ["misi-k2bab8.ts", readFileSync(new URL("../src/components/modul/misi-k2bab8.ts", import.meta.url), "utf8")]];
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
