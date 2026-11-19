// Uji Mind-map (Rak telur perkalian), Infografis (Rak botol dan telur), Simulasi Rak Kotak, dan tahap Concrete, Pictorial, Abstract Kelas 3 Bab 1 Sub-Bab F ("Telur Bu Mirna"),
// perkalian sampai seratus, Toko Kelontong Pak Joko.
// Memeriksa: rak telur (sembilan kartu geser, label pendek, semua metode Story termasuk tiga metode global dengan nama Indonesia), rak botol dari data Story, CPA dua belas tugas
// per tahap (Klik, Kanvas, Suara x empat metode) dengan jawaban beragam (jumlah, banyak kotak atau isi, menulis perkalian, penjumlahan berulang, tanda kali, arti bilangan, sama atau berbeda,
// susunan yang isinya sama, baris dan kolom, putar, deret, lompat, urutan langkah, satu angka, satu kata) dan Cari kesalahan di tiap tahap, kunci dihitung dari data, angka jawaban tidak kembar
// per tahap, tugas yang langsung siap (jebakan tombol Periksa macet), instruksi tanpa digit, petunjuk salah, pengenal ucapan sampai seratus, batas rupa, tata letak gambar, logika Simulasi Rak Kotak,
// emoji, kata terlarang, akhir baris.
// Jalankan: node --no-warnings scripts/uji-kali-k3b1f.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const DP = await import("../src/components/modul/kali-k3b1f/data-peta.ts");
const DK = await import("../src/components/modul/kali-k3b1f/data-kartu.ts");
const LC = await import("../src/components/modul/kali-k3b1f/logika-cpa.ts");
const D = await import("../src/components/modul/kali-k3b1f/data.ts");
const DS = await import("../src/components/modul/kali-k3b1f/data-sim.ts");
const K = await import("../src/components/modul/kali-k3b1f/periksa.ts");
const L = await import("../src/components/modul/kali-k3b1f/logika.ts");
const T = await import("../src/components/modul/kali-k3b1f/tata.ts");
const MK = await import("../src/components/modul/misi-k3bab1.ts");
const MT = await import("../src/components/modul/misi-teks-k3b1.ts");
const S = await import("../src/components/modul/misi-simulasi.ts");
const folderUrl = new URL("../src/components/modul/kali-k3b1f/", import.meta.url);

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
const TERLARANG = /\b(kelas|buku|teman|kelompok|dikelompokkan|mengelompokkan|skor|nilai|bernilai|soal|persoalan|tebak|tebakan|kunci|latihan|ditemani)\b/i;
const tanpaDigit = (t) => !/\d/.test(t);
const bersih = (t) => !TERLARANG.test(t) && !/buku|kelompok|bernilai|tebak|nilai tempat|persoalan|ditemani/i.test(t);
const emojiSah = (s) => [...s].every((c) => c.codePointAt(0) <= 0x1fa95 && c.codePointAt(0) !== 0x200d && c.codePointAt(0) !== 0x1f6de);
const ADA_EMOJI = /[\u{1F000}-\u{1FFFF}\u{2600}-\u{27BF}]/u;

/* ------------------------------ Mind-map: rak telur perkalian (sembilan kartu geser) ------------------------------ */
{
  const KP = DK.KARTU_KALI;
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
  for (const m of ["Isi Sama", "Susunan Baris Kolom", "Lompat Hitung", "tambah berulang", "ditulis perkalian", "kotak dan isi", "tukar urutan", "cari kotak dan isi", "periksa berulang"]) cek(cara.includes(m.toLowerCase()), `kartu: cara memuat ${m}`);
  const gab = KP.map((k) => [k.judul, k.masalah.label, k.cara.label, k.hasil.label, k.masalah.arti, k.cara.arti, k.hasil.arti].join(" ")).join(" ").toLowerCase();
  for (const s of ["isi sama", "penjumlahan berulang", "perkalian", "banyak kotak", "isi tiap kotak", "baris", "kolom", "diputar", "hasilnya tidak berubah", "garis bilangan", "pendaratan", "cerita", "periksa"]) cek(gab.includes(s), `kartu: memuat poin "${s}"`);
  cek(!new RegExp("\\b(raka|salsa|bima|pak joko|bu mirna|telur|botol|pensil|kaleng|toko|rak)\\b", "i").test(gab), "kartu: hanya poin pelajaran (tanpa tokoh dan benda cerita)");
  cek(tanpaDigit(DK.SUARA_KARTU_KALI + DK.SELESAI_KARTU_KALI) && bersih(DK.SUARA_KARTU_KALI + DK.SELESAI_KARTU_KALI), "kartu: suara dan pesan selesai tanpa digit dan kata terlarang");
  cek(emojiSah(DK.TEMA_KARTU_KALI.ikon) && DK.TEMA_KARTU_KALI.judul.length > 5, "kartu: tema sah");
  const RG = DK.RINGKASAN_KALI;
  cek(RG.ikon.length === DK.KARTU_KALI.length && new Set(RG.ikon).size === RG.ikon.length && [...RG.ikon, RG.pusat].every((e) => emojiSah(e) && !/[A-Za-z0-9]/.test(e)), "peta radial: satu gambar unik per kartu, gambar sah tanpa huruf");
  cek(tanpaDigit(RG.suara) && bersih(RG.suara) && !RG.ikon.includes(RG.pusat), "peta radial: suara bersih dan pusat berbeda dari cabang");
}

/* ------------------------------ Infografis: rak botol dan telur (lima kejadian cerita) ------------------------------ */
{
  const B = DK.BARIS_INFO_KALI;
  cek(B.length === 5 && DK.KOLOM_INFO_KALI.length === 3, "infografis: lima baris dan tiga kolom");
  cek(B.every((b) => b.isi.length === 3 && emojiSah(b.ikon) && b.nama.length > 2), "infografis: tiap baris tiga isian, emoji sah");
  const jumlahContoh = B.map((b) => b.contoh.length);
  cek(jumlahContoh[0] === 3 && jumlahContoh.slice(1).every((n) => n === 0), "infografis: baris satu penuh contoh, baris dua sampai lima mandiri");
  const semua = B.flatMap((b) => b.isi);
  cek(B.every((b) => new Set(b.isi.map((x) => x.t)).size === 3), "infografis: tiga label tiap baris berbeda");
  cek(semua.every((x) => x.t.length <= 26 && x.t.split(/\s+/).length <= 3 && bersih(x.t) && bersih(x.s ?? "")), "infografis: label pendek (paling banyak tiga kata) dan tanpa kata terlarang");
  cek(semua.every((x) => typeof x.s === "string" && tanpaDigit(x.s)), "infografis: ucapan label tanpa digit");
  const angka = (t) => Number(t.match(/^\d+/)?.[0]);
  cek(B.every((b) => b.isi.every((x) => /^\d+ [a-z]+$/.test(x.t) && x.s === `${LC.kata(angka(x.t))} ${x.t.split(" ")[1]}`)), "infografis: tiap sel angka dan benda, ucapannya sesuai");
  // Data Story: 4 kotak 5 telur 20; 3 kotak 6 telur 18; 3 baris 7 botol 21; 7 baris 3 botol 21; 6 kotak 10 pensil 60.
  sama(B.map((b) => [angka(b.isi[0].t), angka(b.isi[1].t), angka(b.isi[2].t)]), [[4, 5, 20], [3, 6, 18], [3, 7, 21], [7, 3, 21], [6, 10, 60]], "infografis: data Story banyaknya, isinya, semuanya");
  cek(B.every((b) => angka(b.isi[0].t) * angka(b.isi[1].t) === angka(b.isi[2].t)), "infografis: banyaknya kali isinya sama dengan semuanya");
  cek(B[2].isi[2].t === B[3].isi[2].t && B[2].isi[0].t.startsWith("3") && B[3].isi[0].t.startsWith("7"), "infografis: rak diputar, hasil tetap sama");
  sama(B.map((b) => b.nama), ["Kotak telur", "Telur dijumlah", "Botol di rak", "Rak diputar", "Kotak pensil"], "infografis: lima kejadian cerita");
  cek(tanpaDigit(DK.SUARA_INFO_KALI + DK.SELESAI_INFO_KALI) && bersih(DK.SUARA_INFO_KALI + DK.SELESAI_INFO_KALI) && emojiSah(DK.TEMA_INFO_KALI.ikon), "infografis: suara dan tema bersih");
}

/* ------------------------------ Pengenal ucapan ------------------------------ */
{
  const c = (t, k) => K.cocokUcapan(t, k).cocok;
  cek(c("kali", { jenis: "nama", nama: "kali" }) && c("dikali", { jenis: "nama", nama: "kali" }) && c("tambah", { jenis: "nama", nama: "tambah" }) && !c("kali atau tambah", { jenis: "nama", nama: "kali" }) && !c("tambah", { jenis: "nama", nama: "kali" }), "ucapan: kali dan tambah, dua kata sekaligus tidak benar");
  cek(c("sama", { jenis: "nama", nama: "sama" }) && c("sama banyak", { jenis: "nama", nama: "sama" }) && c("berbeda", { jenis: "nama", nama: "beda" }) && c("tidak sama", { jenis: "nama", nama: "beda" }) && !c("tidak sama", { jenis: "nama", nama: "sama" }) && !c("sama atau berbeda", { jenis: "nama", nama: "sama" }), "ucapan: sama dan berbeda");
  cek(c("kotak", { jenis: "nama", nama: "kotak" }) && c("banyak kotak", { jenis: "nama", nama: "kotak" }) && c("isi", { jenis: "nama", nama: "isi" }) && c("isi tiap kotak", { jenis: "nama", nama: "isi" }) && !c("kotak", { jenis: "nama", nama: "isi" }) && !c("isi", { jenis: "nama", nama: "kotak" }), "ucapan: kotak dan isi");
  cek(c("baris", { jenis: "nama", nama: "baris" }) && c("sebelah kolom", { jenis: "nama", nama: "kolom" }) && !c("baris kolom", { jenis: "nama", nama: "baris" }) && !c("kolom", { jenis: "nama", nama: "baris" }), "ucapan: baris dan kolom");
  sama(K.angkaDariUcapan("angka tujuh"), [7], "ucapan: tujuh");
  sama(K.angkaDariUcapan("dua belas"), [12], "ucapan: dua belas");
  sama(K.angkaDariUcapan("5 dan 9"), [5, 9], "ucapan: angka");
  sama(K.angkaDariUcapan("dua puluh delapan"), [28], "ucapan: dua puluh delapan");
  sama(K.angkaDariUcapan("tiga puluh enam"), [36], "ucapan: tiga puluh enam");
  sama(K.angkaDariUcapan("empat puluh"), [40], "ucapan: empat puluh");
  sama(K.angkaDariUcapan("tujuh puluh dua"), [72], "ucapan: tujuh puluh dua");
  sama(K.angkaDariUcapan("enam puluh tiga puluh"), [60, 30], "ucapan: dua puluhan berurutan");
  sama(K.angkaDariUcapan("sepuluh"), [10], "ucapan: sepuluh");
  sama(K.angkaDariUcapan("seratus"), [100], "ucapan: seratus");
  sama(K.angkaDariUcapan("sebelas, lima belas, tujuh belas"), [11, 15, 17], "ucapan: belasan");
  sama(K.angkaDariUcapan("48"), [48], "ucapan: angka dua digit");
  for (const n of [27, 36, 49, 54, 72, 28, 48, 5, 9]) cek(c(LC.kata(n), { jenis: "angka", n }) && c(`eh ${LC.kata(n)} deh`, { jenis: "angka", n }) && c(String(n), { jenis: "angka", n }) && !c(LC.kata(n + 1), { jenis: "angka", n }), `ucapan: bilangan ${n}`);
  cek(K.LEBAR_ADEGAN === 300 && K.TINGGI_ADEGAN === 200, "adegan 300 x 200");
}

/* ------------------------------ Hitungan dan tata letak ------------------------------ */
const su = (g, s) => ({ g, s, wadah: "kotak", benda: "telur" });
{
  sama([0, 7, 10, 11, 15, 20, 38, 100].map(LC.kata), ["nol", "tujuh", "sepuluh", "sebelas", "lima belas", "dua puluh", "tiga puluh delapan", "seratus"], "kata bilangan");
  sama(LC.pendaratan(4, 3), [0, 4, 8, 12], "titik pendaratan");
  sama(LC.penjumlahanBerulang(5, 4), "5 + 5 + 5 + 5", "penjumlahan berulang");
  cek(LC.klaimBenar({ jenis: "tambah", su: su(4, 5), hasil: 20 }) && !LC.klaimBenar({ jenis: "tambah", su: su(4, 5), hasil: 9 }), "klaim tambah");
  cek(LC.klaimBenar({ jenis: "peran", su: su(4, 5), bilangan: "g", katak: "kotak" }) && !LC.klaimBenar({ jenis: "peran", su: su(4, 5), bilangan: "g", katak: "isi" }) && LC.klaimBenar({ jenis: "peran", su: su(4, 5), bilangan: "s", katak: "isi" }), "klaim peran");
  cek(LC.klaimBenar({ jenis: "lompat", m: 6, n: 4, hasil: 24 }) && !LC.klaimBenar({ jenis: "lompat", m: 6, n: 4, hasil: 10 }), "klaim lompat");
  cek(LC.semuaSama([4, 4, 4]) && !LC.semuaSama([4, 4, 5]), "semua sama");
  for (const n of [4, 6, 9]) cek(LC.pilihanAngka(n).length === 4 && LC.pilihanAngka(n).includes(n) && LC.pilihanAngka(n).every((x) => x >= 1 && x <= 9), `pilihan angka satu digit memuat ${n}`);
  for (const n of [14, 21, 72, 100]) cek(LC.pilihanAngka(n).length === 4 && LC.pilihanAngka(n).includes(n) && new Set(LC.pilihanAngka(n)).size === 4 && LC.pilihanAngka(n).every((x) => x >= 1 && x <= 100), `pilihan angka dua digit memuat ${n}`);
  cek(LC.pilihanAngka(28, [11, 35, 32]).join() === "11,28,32,35", "pilihan angka memakai pengecoh kesalahan umum");
  for (const n of [3, 4]) {
    const a = LC.acakTetap(n, Array.from({ length: n }, (_, i) => i));
    cek([...a].sort().join() === Array.from({ length: n }, (_, i) => i).join() && a.join() !== Array.from({ length: n }, (_, i) => i).join(), `acak tetap ${n} kartu bukan urutan benar`);
  }
  // Tata letak: semua kotak dan benda masuk daerah gambar, tidak saling menimpa.
  for (const [g, s] of [[2, 3], [3, 8], [4, 8], [6, 6], [7, 4], [8, 6], [9, 5], [5, 10], [8, 10], [1, 9], [4, 7]]) {
    const t = T.tataKotak(g, s);
    cek(t.kotak.length === g && t.cs >= 6 && t.cs <= 26, `tata kotak ${g} x ${s}: sel wajar (${t.cs})`);
    cek(t.kotak.every((k) => k.x >= 0 && k.y >= 0 && k.x + t.bw <= 292.5 && k.y + t.bh <= 140.5), `tata kotak ${g} x ${s}: kotak dalam daerah`);
    let tumpang = false;
    for (let p = 0; p < g; p += 1) for (let q = p + 1; q < g; q += 1) if (t.kotak[p].x < t.kotak[q].x + t.bw && t.kotak[q].x < t.kotak[p].x + t.bw && t.kotak[p].y < t.kotak[q].y + t.bh && t.kotak[q].y < t.kotak[p].y + t.bh) tumpang = true;
    cek(!tumpang, `tata kotak ${g} x ${s}: kotak tidak bertumpuk`);
    for (let k = 0; k < s; k += 1) {
      const [cx, cy] = T.pusatIsi(t, t.kotak[0].x, t.kotak[0].y, k);
      cek(cx > t.kotak[0].x && cx < t.kotak[0].x + t.bw && cy > t.kotak[0].y && cy < t.kotak[0].y + t.bh, `tata kotak ${g} x ${s}: benda ${k} di dalam kotak`);
    }
  }
  for (const [r, c] of [[4, 8], [3, 9], [5, 6], [9, 9], [2, 4], [7, 5]]) {
    const t = T.tataLarik(r, c);
    const [x1, y1] = T.pusatLarik(t, r - 1, c - 1);
    cek(t.cs >= 6 && t.cs <= 26 && t.x0 >= 0 && t.y0 >= 0 && x1 + t.cs / 2 <= 292.5 && y1 + t.cs / 2 <= 140.5, `tata larik ${r} x ${c}: masuk daerah (sel ${t.cs})`);
  }
  for (const [m, n] of [[8, 5], [5, 7], [3, 6], [7, 4], [9, 3], [8, 9]]) {
    const t = T.tataLompat(m, n);
    cek(t.x.length === n + 1 && t.x[0] === 24 && Math.abs(t.x[n] - 280) < 0.2 && t.x.every((x, i) => i === 0 || x - t.x[i - 1] >= 20), `tata lompat ${m} x ${n}: titik berjarak cukup`);
  }
}

/* ------------------------------ Tiga tahap CPA ------------------------------ */
const TAHAP = [
  { nama: "Concrete", soal: D.CONCRETE, rupa: "benda", nomor: [2, 3, 4], ikon: D.TEMA_KALI.concrete },
  { nama: "Pictorial", soal: D.PICTORIAL, rupa: "diagram", nomor: [5, 6, 7], ikon: D.TEMA_KALI.pictorial },
  { nama: "Abstract", soal: D.ABSTRACT, rupa: "lambang", nomor: [8, 9, 10], ikon: D.TEMA_KALI.abstract },
];
const susunanDari = (l) => (l.su ? [l.su] : l.klaim?.su ? [l.klaim.su] : []);
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
    sama(so.langkah.map((l) => l.metode), ["igil", "isi", "susunan", "lompat"], `${n}/${so.nomor}: urutan metode`);
    cek(bersih(so.judul + so.cerita) && tanpaDigit(so.cerita) && /^Misi Rak Kotak \d+:/.test(so.judul) && so.cerita.length > 20, `${n}/${so.nomor}: judul dan cerita bersih`);
    cek(emojiSah(so.judul + so.cerita) && !ADA_EMOJI.test(so.judul + so.cerita), `${n}/${so.nomor}: judul dan cerita tanpa emoji`);
    for (const ls of so.langkah) {
      const l = ls.langkah;
      const nm = `${n}/${so.nomor}/${ls.metode}`;
      cek(ls.judul === ls.suara && ls.judul === LC.instruksi(l, th.rupa, so.cara), `${nm}: judul dan suara sama dengan instruksi`);
      cek(tanpaDigit(ls.suara) && bersih(ls.suara) && ls.suara.length > 20, `${nm}: instruksi tanpa digit dan kata terlarang`);
      cek(/(Pilih|Tulis|Ucapkan|Ketuk|Susun|Kalikan)/.test(ls.suara), `${nm}: instruksi memuat perintah`);
      const kunci = LC.kunciJawab(l, so.cara);
      cek(LC.siapLangsung(l, th.rupa, so.cara) === (so.cara !== "klik" || kunci !== null), `${nm}: tugas langsung siap sesuai caranya (tombol tidak macet pada rupa ${th.rupa})`);
      for (const r of ["benda", "diagram", "lambang"]) cek(LC.siapLangsung(l, r, so.cara) === LC.siapLangsung(l, th.rupa, so.cara), `${nm}: siap langsung tidak bergantung rupa (${r})`);
      cek(tanpaDigit(LC.kalimatKunci(l, so.cara, th.rupa)) && bersih(LC.kalimatKunci(l, so.cara, th.rupa)) && LC.kalimatKunci(l, so.cara, th.rupa).length > 10, `${nm}: kalimat kunci tanpa digit`);
      cek(tanpaDigit(LC.kalimatTanya(l, so.cara)), `${nm}: kalimat tanya tanpa digit`);
      if (so.cara === "kanvas") {
        cek(kunci?.jenis === "angka" && kunci.n >= 1 && kunci.n <= 9 && Number.isInteger(kunci.n), `${nm}: Tulis di kanvas satu angka satu sampai sembilan`);
        if (kunci?.jenis === "angka") kanvas.push(kunci.n);
      }
      if (so.cara === "suara") cek(kunci !== null && kunci.jenis !== "kalimat", `${nm}: Rekam suara punya kunci angka atau kata`);
      if (so.cara === "suara" && kunci?.jenis === "angka") cek(kunci.n >= 1 && kunci.n <= 99 && LC.kata(kunci.n).split(" ").length <= 3, `${nm}: Rekam suara bilangan pendek`);
      if (kunci?.jenis === "angka") {
        angka.push(kunci.n);
        const pil = LC.pilihanAngkaTugas(l, so.cara);
        cek(pil.length === 4 && pil.includes(kunci.n) && new Set(pil).size === 4, `${nm}: pilihan angka memuat kunci`);
        cek(kunci.n > 9 || pil.every((x) => x >= 1 && x <= 9), `${nm}: kunci satu angka, pilihan satu angka`);
        cek(tanpaDigit(LC.petunjukSalah(l, so.cara, kunci.n + 1, th.rupa)) && tanpaDigit(LC.petunjukSalah(l, so.cara, kunci.n - 1 || 1, th.rupa)) && LC.petunjukSalah(l, so.cara, kunci.n + 1, th.rupa).length > 20, `${nm}: petunjuk salah angka tanpa digit`);
      }
      if (kunci?.jenis === "kalimat") {
        const pil = LC.pilihanKalimat(l);
        cek(so.cara === "klik" && pil.length === 4 && new Set(pil).size === 4 && pil.includes(kunci.teks), `${nm}: empat kalimat pilihan memuat kunci`);
        cek(pil.every((x) => x.length > 0 && !/^ \+|\+ $/.test(x)), `${nm}: kalimat pilihan utuh`);
        cek(tanpaDigit(LC.petunjukSalah(l, so.cara, "x", th.rupa)) && LC.petunjukSalah(l, so.cara, "x", th.rupa).length > 20, `${nm}: petunjuk salah kalimat tanpa digit`);
      }
      if (kunci?.jenis === "nama") {
        const pil = LC.pilihanNamaDari(kunci.nama);
        cek(pil.includes(kunci.nama) && pil.every((x) => LC.URUT_NAMA.includes(x)) && pil.length === 2, `${nm}: pilihan kata memuat kunci`);
        const lain = pil.find((x) => x !== kunci.nama);
        cek(tanpaDigit(LC.petunjukSalah(l, so.cara, lain, th.rupa)) && LC.petunjukSalah(l, so.cara, lain, th.rupa).length > 20, `${nm}: petunjuk salah kata tanpa digit`);
        cek(K.cocokUcapan(kunci.nama, kunci).cocok && K.cocokUcapan(LC.LABEL_NAMA[kunci.nama], kunci).cocok, `${nm}: ucapan "${kunci.nama}" dikenali`);
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
      }
      // Susunan tiap tugas: bentuk, batas banyak, dan batas rupa (emoji benda hanya pada Concrete).
      for (const s of susunanDari(l)) {
        cek(Number.isInteger(s.g) && Number.isInteger(s.s) && s.g >= 2 && s.g <= 9 && s.s >= 1 && s.s <= 10 && s.g * s.s <= 100, `${nm}: susunan dua sampai sembilan kotak, isi satu sampai sepuluh, hasil tidak lebih dari seratus`);
        cek(tanpaDigit(s.wadah + s.benda) && bersih(s.wadah + s.benda) && s.wadah.length >= 3 && s.benda.length >= 3, `${nm}: nama wadah dan benda bersih`);
        if (th.rupa === "benda") cek(s.ikon && emojiSah(s.ikon) && ADA_EMOJI.test(s.ikon), `${nm}: Concrete memakai benda beremoji`);
        else cek(s.ikon === undefined && !ADA_EMOJI.test(s.wadah + s.benda), `${nm}: Pictorial dan Abstract tanpa emoji benda`);
      }
      if (l.la) {
        cek(l.la.r >= 2 && l.la.r <= 9 && l.la.c >= 2 && l.la.c <= 9 && l.la.r * l.la.c <= 100 && l.la.r !== l.la.c || (l.la.r === l.la.c && l.tipe === "baris"), `${nm}: susunan dua sampai sembilan baris dan kolom`);
        if (th.rupa === "benda") cek(l.la.ikon && emojiSah(l.la.ikon), `${nm}: Concrete susunan beremoji`);
        else cek(l.la.ikon === undefined && !ADA_EMOJI.test(l.la.benda), `${nm}: Pictorial dan Abstract susunan tanpa emoji`);
        if (l.tipe === "putar") cek(l.la.r !== l.la.c, `${nm}: putar hanya bila baris dan kolom berbeda`);
        if (so.cara === "kanvas" && l.tipe === "baris" && l.tanya === "semua") cek(l.la.r * l.la.c <= 9, `${nm}: hasil kanvas satu angka`);
        if (th.rupa === "lambang" && l.tipe === "baris") cek(l.tanya === "semua", `${nm}: Abstract baris hanya menanyakan semuanya`);
      }
      if (l.tipe === "lompat") {
        cek(l.m >= 2 && l.m <= 9 && l.n >= 2 && l.n <= 9 && l.m * l.n <= 100, `${nm}: lompatan dua sampai sembilan, hasil tidak lebih dari seratus`);
        if (so.cara === "kanvas") cek(l.tanya !== "hasil" || l.m * l.n <= 9, `${nm}: lompat kanvas satu angka`);
      }
      if (l.tipe === "jumlah" && so.cara === "kanvas") cek(l.su.g * l.su.s <= 9, `${nm}: jumlah kanvas satu angka`);
      if (l.tipe === "tulis" && so.cara !== "klik") cek(l.su.g * l.su.s <= 99, `${nm}: tulis ucapan hasil dua angka paling banyak`);
      if (l.tipe === "ulang") cek(l.su.g >= 2 && l.su.g <= 8, `${nm}: penjumlahan berulang dua sampai delapan suku`);
      if (l.tipe === "sama") {
        cek(l.banyak.length >= 3 && l.banyak.length <= 4 && l.banyak.every((b) => b >= 1 && b <= 9), `${nm}: sama atau berbeda: tiga atau empat kotak berisi satu sampai sembilan`);
        if (!LC.semuaSama(l.banyak)) cek(Math.max(...l.banyak) - Math.min(...l.banyak) === 1, `${nm}: kotak yang berbeda hanya selisih satu`);
        if (th.rupa === "benda") cek(l.isi.ikon && emojiSah(l.isi.ikon), `${nm}: sama atau berbeda: Concrete beremoji`);
        else cek(l.isi.ikon === undefined, `${nm}: sama atau berbeda: tanpa emoji`);
      }
      if (l.tipe === "pilihsama") {
        cek(l.pilihan.length === 3 && l.pilihan.filter((_, i) => LC.susunanSama(l, i)).length === 1 && LC.susunanSama(l, l.benar) && l.benar !== 0, `${nm}: tiga susunan, hanya satu yang isinya sama, bukan pilihan pertama`);
        cek(l.pilihan.every((p) => p.length === l.pilihan[0].length && p.every((b) => b >= 1 && b <= 9)), `${nm}: kotak sama banyak tiap susunan`);
        cek(tanpaDigit(LC.petunjukKetuk(l)), `${nm}: petunjuk pilih sama tanpa digit`);
        cek(th.rupa !== "lambang", `${nm}: pilih susunan tidak dipakai pada Abstract`);
      }
      if (l.tipe === "urutlangkah") {
        cek(LC.LANGKAH_KALI.length === 4 && LC.urutanLangkah().join() === "0,1,2,3" && tanpaDigit(LC.petunjukKetuk(l)) && LC.acakTetap(4, [0, 1, 2, 3]).join() !== "0,1,2,3", `${nm}: urutan langkah mengalikan`);
      }
      if (l.tipe === "deret") cek(th.rupa !== "lambang", `${nm}: deret tidak dipakai pada Abstract`);
      if (l.tipe === "peran") cek(l.su.wadah === "kotak", `${nm}: arti bilangan memakai kotak`);
    }
  }
  cek(salahAda >= 1, `${n}: paling sedikit satu Cari kesalahan`);
  cek(new Set(angka).size === angka.length, `${n}: angka jawaban tidak kembar dalam satu tahap (${angka.join(", ")})`);
  cek(new Set(kanvas).size === 4, `${n}: empat angka kanvas berbeda (${kanvas.join(", ")})`);
  cek(th.ikon.cara.length > 20 && emojiSah(th.ikon.ikon) && bersih(th.ikon.cara), `${n}: tema tahap`);
  // Tiga metode global tampak: tiap metode punya tugas di tiap misi.
  for (const m of ["isi", "susunan", "lompat"]) cek(th.soal.every((so) => so.langkah.some((x) => x.metode === m)), `${n}: metode ${m} muncul di tiap misi`);
}
const angkaTahap = (soal) => soal.map((s) => s.langkah.map((l) => LC.kunciJawab(l.langkah, s.cara))).flat().filter((k) => k && k.jenis === "angka").map((k) => k.n);
sama(angkaTahap(D.CONCRETE), [32, 40, 6, 8, 9, 7, 36, 5, 27], "Concrete: angka jawaban");
sama(angkaTahap(D.PICTORIAL), [42, 7, 5, 8, 3, 48, 54, 28], "Pictorial: angka jawaban");
sama(angkaTahap(D.ABSTRACT), [6, 5, 9, 8, 7, 54, 49, 72], "Abstract: angka jawaban");
// Tidak ada hasil kali yang sama dengan hasil kali Story (20, 18, 21, 60, 12, 30, 15, 10) pada jawaban dua angka.
{
  const STORY = new Set([20, 18, 21, 60, 12, 30, 15, 24]);
  for (const soal of [D.CONCRETE, D.PICTORIAL, D.ABSTRACT]) for (const k of angkaTahap(soal)) cek(k <= 9 || !STORY.has(k), `jawaban ${k} bukan hasil kali Story`);
}
// Batas rupa pada sumber komponen: emoji benda hanya pada cabang rupa benda (Concrete).
{
  const gk = readFileSync(new URL("GambarKali.tsx", folderUrl), "utf8");
  const tg = readFileSync(new URL("TahapKali.tsx", folderUrl), "utf8");
  const lk = readFileSync(new URL("LangkahKali.tsx", folderUrl), "utf8");
  const baris = gk.split("\n");
  const emojiBaris = baris.map((b, i) => [i, b]).filter(([, b]) => /\\u\{(1F95A|1F438)\}/.test(b));
  cek(emojiBaris.length >= 2, "komponen: emoji benda (telur dan katak) dipakai pada Concrete");
  for (const [i] of emojiBaris) {
    const konteks = baris.slice(Math.max(0, i - 4), i + 1).join(" ");
    cek(/benda|BENDA/.test(konteks), `GambarKali.tsx baris ${i + 1}: emoji benda hanya pada cabang benda`);
  }
  cek(/rupa === "benda" \? `\$\{IKON_METODE\[ls\.metode\]\} ` : ""/.test(tg), "TahapKali: ikon metode hanya pada Concrete");
  cek(/rupa === "lambang" \? <KartuStruk/.test(gk) && /export function KartuStruk/.test(gk), "komponen: Abstract memakai kartu tulisan (papan struk)");
  cek(/<circle cx=\{cx\} cy=\{cy\} r=\{s \* 0\.36\}/.test(gk), "komponen: Pictorial memakai titik SVG polos");
  cek(!/Butir|<svg|KotakIsi|LarikGambar|LompatGambar/.test(gk.split("export function KartuStruk")[1].split("/** Kalimat susunan")[0]), "komponen: KartuStruk tanpa gambar");
  cek(/pilihanKalimat/.test(lk) && /JawabSuaraKali/.test(lk) && /PilihanKata/.test(lk) && /JawabTulis/.test(lk), "komponen: klik pilih angka atau kalimat atau kata, kanvas, suara");
  cek(/JawabSuaraKali[\s\S]*pilihan=\{pilihanTeks\}/.test(lk), "komponen: Rekam suara punya pilihan ketuk");
  const js = readFileSync(new URL("JawabKali.tsx", folderUrl), "utf8");
  cek(/m\.onerror/.test(js) && (js.match(/gagalSekali\(\)/g) ?? []).length >= 5 && /BATAS_SALAH/.test(js) && /setCadangan\(true\)/.test(js), "komponen: galat mikrofon dihitung percobaan gagal dan pilihan ketuk muncul");
  cek(/Ini jawaban yang benar/.test(lk) && /Ini jawaban yang benar/.test(js), "komponen: jawaban benar ditampilkan setelah kesalahan");
}

/* ------------------------------ Cakupan jenis tugas dan metode global ------------------------------ */
{
  const semua = [...D.CONCRETE, ...D.PICTORIAL, ...D.ABSTRACT].flatMap((s) => s.langkah.map((l) => l.langkah.tipe));
  for (const tp of ["salah", "jumlah", "bilangan", "tulis", "ulang", "cara", "peran", "sama", "pilihsama", "baris", "putar", "deret", "lompat", "urutlangkah"]) cek(semua.includes(tp), `jenis tugas ${tp} dipakai`);
  const klaim = [...D.CONCRETE, ...D.PICTORIAL, ...D.ABSTRACT].flatMap((s) => s.langkah).filter((l) => l.langkah.tipe === "salah").map((l) => l.langkah.klaim.jenis);
  sama(klaim, ["tambah", "peran", "lompat"], "Cari kesalahan memakai klaim tambah, peran, dan lompat");
  const gabung = [...D.CONCRETE, ...D.PICTORIAL, ...D.ABSTRACT].flatMap((s) => s.langkah).filter((l) => l.langkah.tipe === "salah");
  cek(gabung.map((l) => l.langkah.tokoh).join() === "Raka,Salsa,Bima", "Cari kesalahan: tokoh bergantian Raka, Salsa, Bima");
  cek(LC.NAMA_METODE.igil === "Metode IGIL: Isi Sama, Tambah Berulang", "nama Metode IGIL");
  cek(LC.NAMA_METODE.isi.includes("Equal Groups") && LC.NAMA_METODE.susunan.includes("Array") && LC.NAMA_METODE.lompat.includes("Skip Counting"), "tiga metode global di judul tugas");
  cek(LC.URUT_METODE.join() === "igil,isi,susunan,lompat" && Object.values(LC.IKON_METODE).every(emojiSah), "metode dan ikon");
  cek(D.TEMA_KALI.concrete.nama === "Concrete" && D.TEMA_KALI.pictorial.nama === "Pictorial" && D.TEMA_KALI.abstract.nama === "Abstract", "nama tahap");
  cek(D.CONCRETE_KALI === D.CONCRETE && D.PICTORIAL_KALI === D.PICTORIAL && D.ABSTRACT_KALI === D.ABSTRACT, "ekspor untuk pemasang");
  cek(D.POIN_PENTING.length >= 6 && D.POIN_PENTING.length === D.POIN_PENTING_SUARA.length && D.POIN_PENTING_SUARA.every(tanpaDigit) && D.POIN_PENTING_SUARA.every(bersih) && !/[<>=×+]/.test(D.POIN_PENTING_SUARA.join(" ")) && tanpaDigit(D.PENUTUP_F) && /\?$/.test(D.PENUTUP_F) && bersih(D.PENUTUP_F), "poin penting dan penutup bersih, suara tanpa digit dan lambang");
  cek(D.POIN_PENTING.every(bersih), "poin penting tanpa kata terlarang");
  const poin = D.POIN_PENTING_SUARA.join(" ").toLowerCase();
  for (const s of ["isinya sama banyak", "penjumlahan berulang", "banyak kotak", "isi tiap kotak", "ditukar", "baris", "kolom", "lompat", "periksa"]) cek(poin.includes(s), `poin penting memuat "${s}"`);
  cek(D.MISI_ISI_TEKS === DS.MISI_ISI_TEKS && DP.MISI_ISI_TEKS === DS.MISI_ISI_TEKS && MT.MISI_K3B1.F === DS.MISI_ISI_TEKS && tanpaDigit(DS.MISI_ISI_TEKS) && bersih(DS.MISI_ISI_TEKS), "teks misi awal tanpa digit dan sama dengan misi-teks-k3b1");
}

/* ------------------------------ Simulasi Rak Kotak ------------------------------ */
{
  const k0 = L.awalIsi();
  cek(k0.alat === "isi" && k0.mode === "isi" && k0.kotak === 0 && k0.isi === 0 && k0.isiBenar.length === 0 && k0.tulisBenar.length === 0 && k0.susunBenar.length === 0 && k0.lompatBenar.length === 0 && !k0.putarBenar && k0.posisi === 0, "simulasi: keadaan awal bersih");
  cek(JSON.stringify(L.mulaiLagiIsi()) === JSON.stringify(k0), "simulasi: mulai lagi sama dengan awal");
  cek(L.pilihModeIsi(k0, "lompat").mode === "lompat" && L.URUT_MODE.length === 4, "simulasi: empat alat");
  // Isi.
  const t0 = L.tugasIsi(k0);
  const gagalI = L.periksaIsi(k0);
  cek(!gagalI.ok && gagalI.k.isiBenar.length === 0 && gagalI.k.salah === 1 && tanpaDigit(gagalI.pesan), "simulasi isi: belum disusun tidak dihitung");
  cek(L.ubahKotak(k0, -1).kotak === 0 && L.ubahKotak({ ...k0, kotak: DS.BATAS_KOTAK }, 1).kotak === DS.BATAS_KOTAK && L.ubahIsi({ ...k0, isi: DS.BATAS_ISI }, 1).isi === DS.BATAS_ISI && L.ubahIsi(k0, 1).isi === 1, "simulasi isi: banyak kotak dan isi dalam batas");
  const susunIsi = (k) => {
    const t = L.tugasIsi(k);
    let x = k;
    for (let i = 0; i < t.g; i += 1) x = L.ubahKotak(x, 1);
    for (let i = 0; i < t.s; i += 1) x = L.ubahIsi(x, 1);
    return x;
  };
  const sedikit = L.periksaIsi(L.ubahIsi(L.ubahKotak(k0, 1), 1));
  cek(!sedikit.ok && /Banyak/.test(sedikit.pesan) && tanpaDigit(sedikit.pesan), "simulasi isi: banyak kotak keliru ditunjuk");
  let ki = k0;
  for (let i = 0; i < t0.g; i += 1) ki = L.ubahKotak(ki, 1);
  const isiSalah = L.periksaIsi(L.ubahIsi(ki, 1));
  cek(!isiSalah.ok && /isi tiap/.test(isiSalah.pesan) && tanpaDigit(isiSalah.pesan), "simulasi isi: banyak kotak tepat tetapi isi keliru ditunjuk");
  cek(L.berulangIsi(susunIsi(k0)) === LC.penjumlahanBerulang(t0.s, t0.g) && L.jumlahIsi(susunIsi(k0)) === t0.g * t0.s && L.berulangIsi(k0) === "", "simulasi isi: penjumlahan berulang dan jumlah dari susunan");
  const oki = L.periksaIsi(susunIsi(k0));
  cek(oki.ok && oki.k.isiBenar.join() === "0" && oki.k.isiIndeks === 1 && oki.k.kotak === 0 && oki.k.isi === 0 && tanpaDigit(oki.pesan), "simulasi isi: susunan tepat dihitung, sasaran berikutnya");
  cek(L.ulangIsi(susunIsi(k0)).kotak === 0, "simulasi isi: ulang mengosongkan");
  // Tulis.
  const tt = L.tugasTulis(k0);
  const gagalT = L.periksaTulis(k0);
  cek(!gagalT.ok && gagalT.k.tulisBenar.length === 0 && gagalT.k.salah === 1 && tanpaDigit(gagalT.pesan), "simulasi tulis: belum ditulis tidak dihitung");
  const setTulis = (k, a, b) => {
    let x = k;
    for (let i = 0; i < a; i += 1) x = L.ubahTulisA(x, 1);
    for (let i = 0; i < b; i += 1) x = L.ubahTulisB(x, 1);
    return x;
  };
  const tt1 = L.tugasTulis({ ...k0, tulisIndeks: 1 });
  const tertukar = L.periksaTulis(setTulis({ ...k0, tulisIndeks: 1 }, tt1.s, tt1.g));
  cek(!tertukar.ok && /tertukar/.test(tertukar.pesan) && tanpaDigit(tertukar.pesan), "simulasi tulis: bilangan tertukar ditunjuk");
  const kedua = L.periksaTulis(setTulis(k0, tt.g, tt.s - 1));
  cek(!kedua.ok && /bilangan kedua/.test(kedua.pesan) && tanpaDigit(kedua.pesan), "simulasi tulis: bilangan kedua keliru ditunjuk");
  const okt = L.periksaTulis(setTulis(k0, tt.g, tt.s));
  cek(okt.ok && okt.k.tulisBenar.join() === "0" && okt.k.tulisIndeks === 1 && okt.k.tulisA === 0 && tanpaDigit(okt.pesan), "simulasi tulis: perkalian tepat dihitung, susunan berikutnya");
  cek(L.ubahTulisA(k0, -1).tulisA === 0 && L.ubahTulisB({ ...k0, tulisB: DS.BATAS_ISI }, 1).tulisB === DS.BATAS_ISI, "simulasi tulis: bilangan dalam batas");
  // Susun.
  const ts = L.tugasSusun(k0);
  const setSusun = (k, r, c) => {
    let x = k;
    for (let i = 0; i < r; i += 1) x = L.ubahBaris(x, 1);
    for (let i = 0; i < c; i += 1) x = L.ubahKolom(x, 1);
    return x;
  };
  const gagalS = L.periksaSusun(k0);
  cek(!gagalS.ok && gagalS.k.susunBenar.length === 0 && gagalS.k.salah === 1 && tanpaDigit(gagalS.pesan), "simulasi susun: belum disusun tidak dihitung");
  const hasilSama = L.periksaSusun(setSusun(k0, ts.c, ts.r));
  cek(!hasilSama.ok && /sama/.test(hasilSama.pesan) && tanpaDigit(hasilSama.pesan), "simulasi susun: hasil kali sama tetapi susunan lain ditunjuk");
  const oks = L.periksaSusun(setSusun(k0, ts.r, ts.c));
  cek(oks.ok && oks.k.susunBenar.join() === "0" && !oks.k.putarBenar && oks.k.susunIndeks === 0 && tanpaDigit(oks.pesan), "simulasi susun: susunan tepat dihitung, belum diputar");
  const diputar = L.putarSusun(oks.k);
  cek(diputar.baris === ts.c && diputar.kolom === ts.r && diputar.sudahPutar && L.putarSusun(diputar).baris === ts.r && !L.putarSusun(diputar).sudahPutar, "simulasi susun: putar menukar baris dan kolom");
  const okp = L.periksaSusun(diputar);
  cek(okp.ok && okp.k.putarBenar && okp.k.susunIndeks === 1 && okp.k.baris === 0 && okp.k.kolom === 0 && !okp.k.sudahPutar && tanpaDigit(okp.pesan), "simulasi susun: susunan diputar dan tepat dihitung, sasaran berikutnya");
  cek(L.lanjutSusun(k0).susunIndeks === 0 && L.lanjutSusun(oks.k).susunIndeks === 1 && L.lanjutSusun(oks.k).baris === 0, "simulasi susun: sasaran berikutnya hanya setelah benar");
  cek(L.ubahBaris(k0, -1).baris === 0 && L.ubahBaris({ ...k0, baris: DS.BATAS_BARIS }, 1).baris === DS.BATAS_BARIS && L.ubahKolom({ ...k0, kolom: DS.BATAS_BARIS }, 1).kolom === DS.BATAS_BARIS, "simulasi susun: baris dan kolom dalam batas");
  // Lompat.
  const tl = L.tugasLompat(k0);
  const jauh = L.lompatSekali({ ...L.ubahBesar(k0, 1), besar: DS.BESAR_MAKS, posisi: tl.target - 3, lompatan: 4 });
  cek(!jauh.ok && jauh.k.posisi === 0 && jauh.k.lompatan === 0 && jauh.k.salah === 1 && tanpaDigit(jauh.pesan), "simulasi lompat: melewati sasaran kembali ke nol");
  const satu = L.lompatSekali(k0);
  cek(satu.ok && satu.k.posisi === k0.besar && satu.k.lompatan === 1 && satu.k.lompatBenar.length === 0 && tanpaDigit(satu.pesan), "simulasi lompat: satu lompatan menambah posisi");
  cek(L.ubahBesar(satu.k, 1).posisi === 0 && L.ubahBesar(satu.k, 1).besar === k0.besar + 1 && L.ubahBesar(k0, -1).besar === DS.BESAR_MIN && L.ubahBesar({ ...k0, besar: DS.BESAR_MAKS }, 1).besar === DS.BESAR_MAKS, "simulasi lompat: ganti besar kembali ke nol, besar dalam batas");
  for (const [idx, m] of [[0, 4], [1, 6], [2, 9]]) {
    let x = { ...k0, lompatIndeks: idx, besar: m };
    const target = DS.LOMPAT_TUGAS[idx].target;
    let hasil;
    for (let i = 0; i < target / m; i += 1) {
      hasil = L.lompatSekali(x);
      x = hasil.k;
    }
    cek(hasil.ok && x.lompatBenar.join() === String(idx) && x.posisi === 0 && x.lompatIndeks === (idx + 1) % 3 && tanpaDigit(hasil.pesan), `simulasi lompat: sasaran ${target} dengan lompatan ${m} tepat`);
  }
  cek(L.ulangLompat(satu.k).posisi === 0, "simulasi lompat: ulang kembali ke nol");
  // Teks.
  cek(Object.values(L.SUARA_MODE).every((t) => tanpaDigit(t) && bersih(t)) && L.URUT_MODE.every((md) => L.kalimatIsi(L.pilihModeIsi(k0, md)).length > 20 && tanpaDigit(L.kalimatIsi(L.pilihModeIsi(k0, md)))), "simulasi: ucapan tiap alat tanpa digit");
  // Berbeda dari Story: bukan data Story (4 x 5, 3 x 6, 3 x 7, 7 x 3, 6 x 10) dan bukan benda telur, botol, pensil.
  const storyG = new Set(["4,5", "3,6", "3,7", "7,3", "6,10"]);
  const semuaTugas = [...DS.ISI_TUGAS, ...DS.TULIS_TUGAS];
  cek(semuaTugas.every((t) => !storyG.has(`${t.g},${t.s}`) && !["telur", "botol", "pensil"].includes(t.benda)), "simulasi: bukan data Story");
  cek(DS.SUSUN_TUGAS.every((t) => !storyG.has(`${t.r},${t.c}`) && !["telur", "botol", "pensil"].includes(t.benda) && t.r * t.c <= 100), "simulasi: susunan bukan data Story");
  cek([...DS.ISI_TUGAS, ...DS.TULIS_TUGAS].every((t) => t.g >= 2 && t.g <= DS.BATAS_KOTAK && t.s >= 1 && t.s <= DS.BATAS_ISI && t.g * t.s <= 100 && emojiSah(t.ikon) && ADA_EMOJI.test(t.ikon) && bersih(t.wadah + t.benda) && tanpaDigit(t.wadah + t.benda)), "simulasi: kotak dalam batas, bersih, beremoji");
  cek(DS.LOMPAT_TUGAS.length === 3 && DS.LOMPAT_TUGAS.every((t) => t.target <= 100 && [2, 3, 4, 5, 6, 7, 8, 9].some((m) => t.target % m === 0)), "simulasi: sasaran lompatan bisa dicapai");
  cek(DS.ISI_TUGAS.length === 3 && DS.TULIS_TUGAS.length === 3 && DS.SUSUN_TUGAS.length === 3 && DS.BATAS_BARIS === 9, "simulasi: tiga sasaran tiap alat");
}

/* ------------------------------ Misi ------------------------------ */
{
  const awal = L.awalIsi();
  const d = MK.daftarMisiK3Bab1("F");
  cek(d === MK.MISI_F && d.length === 6 && d.filter((x) => x.wajib).length === 4 && d.every((x) => x.id.startsWith("f-")), "misi: enam misi, empat wajib, id berawalan f-");
  cek(d.every((x) => x.teks.length >= 10 && x.teks.length <= 120 && tanpaDigit(x.teks) && bersih(x.teks)), "misi: teks 10-120 huruf tanpa digit dan kata terlarang");
  cek(d.every((x) => !/(skor|nilai|tebak)/i.test(x.teks)), "misi: tanpa skor");
  cek(S.misiBaru(d, awal, new Set()).length === 0, "misi: keadaan awal tidak memenuhi misi");
  cek(d.every((x) => !x.cek({ alat: "kerangka" })), "misi: alat lain tidak memenuhi misi");
  // Alur lengkap melalui logika.
  let k = awal;
  const loncat = (x, idx, m) => {
    let y = { ...x, lompatIndeks: idx, besar: m, posisi: 0, lompatan: 0 };
    const target = DS.LOMPAT_TUGAS[idx].target;
    for (let i = 0; i < target / m; i += 1) y = L.lompatSekali(y).k;
    return y;
  };
  const susun = (x, r, c) => {
    let y = x;
    for (let i = 0; i < r; i += 1) y = L.ubahBaris(y, 1);
    for (let i = 0; i < c; i += 1) y = L.ubahKolom(y, 1);
    return y;
  };
  for (let i = 0; i < 3; i += 1) {
    const t = L.tugasIsi(k);
    let x = k;
    for (let q = 0; q < t.g; q += 1) x = L.ubahKotak(x, 1);
    for (let q = 0; q < t.s; q += 1) x = L.ubahIsi(x, 1);
    k = L.periksaIsi(x).k;
    if (i === 0) sama(S.misiBaru(d, k, new Set()), ["f-isi"], "misi: satu sasaran isi memenuhi f-isi");
  }
  sama(S.misiBaru(d, k, new Set()), ["f-isi", "f-lengkap"], "misi: tiga sasaran isi memenuhi f-lengkap");
  {
    const t = L.tugasTulis(k);
    let x = k;
    for (let q = 0; q < t.g; q += 1) x = L.ubahTulisA(x, 1);
    for (let q = 0; q < t.s; q += 1) x = L.ubahTulisB(x, 1);
    k = L.periksaTulis(x).k;
  }
  {
    const t = L.tugasSusun(k);
    k = L.periksaSusun(susun(k, t.r, t.c)).k;
    sama(S.misiBaru(d, k, new Set()), ["f-isi", "f-tulis", "f-susun", "f-lengkap"], "misi: susunan tepat memenuhi f-susun, belum f-putar");
    k = L.periksaSusun(L.putarSusun(k)).k;
  }
  k = loncat(k, 0, 4);
  sama(S.misiBaru(d, k, new Set()), ["f-isi", "f-tulis", "f-susun", "f-lompat", "f-putar", "f-lengkap"], "misi: semua tercapai lewat logika simulasi");
  const wajib = d.filter((x) => x.wajib).map((x) => x.id);
  cek(S.wajibSelesai(d, new Set(wajib)) && !S.wajibSelesai(d, new Set(["f-isi"])), "misi: gerbang wajib");
  cek(S.misiBaru(d, { ...awal, salah: 9, mode: "lompat", kotak: 5, isi: 6, isiIndeks: 2, tulisA: 3, tulisB: 4, tulisIndeks: 1, baris: 6, kolom: 7, sudahPutar: true, susunIndeks: 1, besar: 5, posisi: 25, lompatan: 5, lompatIndeks: 2 }, new Set()).length === 0, "misi: percobaan keliru dan isian yang belum diperiksa tidak dihitung sebagai misi");
}

/* ------------------------------ Berkas ------------------------------ */
{
  const berkas = readdirSync(folderUrl).filter((f) => /\.(ts|tsx)$/.test(f));
  for (const f of ["logika.ts", "logika-cpa.ts", "periksa.ts", "tata.ts", "data.ts", "data-peta.ts", "data-sim.ts", "data-kartu.ts", "GambarKali.tsx", "JawabKali.tsx", "LangkahKali.tsx", "TahapKali.tsx", "KotakTelur.tsx", "RakBotol.tsx", "SimulasiRakKotak.tsx"]) cek(berkas.includes(f), `berkas ${f} ada`);
  const lihat = [...berkas.map((f) => ["kali-k3b1f/" + f, readFileSync(new URL(f, folderUrl), "utf8")]), ["misi-k3bab1.ts", readFileSync(new URL("../src/components/modul/misi-k3bab1.ts", import.meta.url), "utf8")]];
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
