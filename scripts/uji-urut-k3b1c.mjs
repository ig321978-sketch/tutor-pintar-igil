// Uji Mind-map (Truk Beras), Infografis (Papan Urut), Simulasi Papan Urut, dan tahap Concrete, Pictorial, Abstract Kelas 3 Bab 1 Sub-Bab C ("Karung Pak Dodi"),
// membandingkan dan mengurutkan bilangan sampai seribu.
// Memeriksa: truk beras (sembilan kartu geser, label pendek, semua metode Story termasuk tiga metode global dengan nama Indonesia), papan urut dari data Story, CPA dua belas tugas
// per tahap (Klik, Kanvas, Suara x empat metode) dengan jawaban beragam (tanda, tempat penentu, bilangan terbesar atau terkecil, urutan ketuk, urutan ke berapa, naik atau turun,
// titik pada garis bilangan, letak dua titik, satu angka, satu kata) dan Cari kesalahan di tiap tahap, kunci dihitung dari data bilangan, angka jawaban tidak kembar per tahap,
// tugas yang langsung siap (jebakan tombol Periksa macet), instruksi tanpa digit, petunjuk salah, pengenal ucapan, batas rupa, logika Simulasi Papan Urut, emoji, kata terlarang, akhir baris.
// Jalankan: node --no-warnings scripts/uji-urut-k3b1c.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const DP = await import("../src/components/modul/urut-k3b1c/data-peta.ts");
const DK = await import("../src/components/modul/urut-k3b1c/data-kartu.ts");
const LC = await import("../src/components/modul/urut-k3b1c/logika-cpa.ts");
const D = await import("../src/components/modul/urut-k3b1c/data.ts");
const DS = await import("../src/components/modul/urut-k3b1c/data-sim.ts");
const K = await import("../src/components/modul/urut-k3b1c/periksa.ts");
const L = await import("../src/components/modul/urut-k3b1c/logika.ts");
const MK = await import("../src/components/modul/misi-k3bab1.ts");
const MT = await import("../src/components/modul/misi-teks-k3b1.ts");
const S = await import("../src/components/modul/misi-simulasi.ts");
const folderUrl = new URL("../src/components/modul/urut-k3b1c/", import.meta.url);

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
const bersih = (t) => !TERLARANG.test(t) && !/buku|kelompok|bernilai|tebak|nilai tempat|nilai|soal|skor/i.test(t);
const emojiSah = (s) => [...s].every((c) => c.codePointAt(0) <= 0x1fa95 && c.codePointAt(0) !== 0x200d && c.codePointAt(0) !== 0x1f6de);
const ADA_EMOJI = /[\u{1F000}-\u{1FFFF}\u{2600}-\u{27BF}]/u;

/* ------------------------------ Mind-map: truk beras (sembilan kartu geser) ------------------------------ */
{
  const KP = DK.KARTU_URUT;
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
  for (const m of ["Banding per Tempat", "Garis Bilangan Ratusan", "Mengurutkan", "mulai dari ratusan", "lihat puluhan", "lihat satuan", "mulut ke yang besar", "pakai tanda sama dengan"]) cek(cara.includes(m.toLowerCase()), `kartu: cara memuat ${m}`);
  const gab = KP.map((k) => [k.judul, k.masalah.label, k.cara.label, k.hasil.label, k.masalah.arti, k.cara.arti, k.hasil.arti].join(" ")).join(" ").toLowerCase();
  for (const s of ["ratusan", "puluhan", "satuan", "lebih besar", "lebih kecil", "sama dengan", "mulut", "tanda", "garis bilangan", "kanan makin besar", "mengurutkan", "paling kecil", "urutan naik", "urutan turun", "seratus", "dibalik|kebalikan"])
    cek(new RegExp(s).test(gab), `kartu: memuat poin "${s}"`);
  cek(!new RegExp("\\b(raka|salsa|bima|pak joko|pak dodi|bu tuti|karung|truk|gudang|toko|beras|kue)\\b", "i").test(gab), "kartu: hanya poin pelajaran (tanpa tokoh dan benda cerita)");
  cek(tanpaDigit(DK.SUARA_KARTU_URUT + DK.SELESAI_KARTU_URUT) && bersih(DK.SUARA_KARTU_URUT + DK.SELESAI_KARTU_URUT), "kartu: suara dan pesan selesai tanpa digit dan kata terlarang");
  cek(emojiSah(DK.TEMA_KARTU_URUT.ikon) && DK.TEMA_KARTU_URUT.judul.length > 5, "kartu: tema sah");
  const RG = DK.RINGKASAN_URUT;
  cek(RG.ikon.length === DK.KARTU_URUT.length && new Set(RG.ikon).size === RG.ikon.length && [...RG.ikon, RG.pusat].every((e) => emojiSah(e) && !/[A-Za-z0-9]/.test(e)), "peta radial: satu gambar unik per kartu, gambar sah tanpa huruf");
  cek(tanpaDigit(RG.suara) && bersih(RG.suara) && !RG.ikon.includes(RG.pusat), "peta radial: suara bersih dan pusat berbeda dari cabang");
}

/* ------------------------------ Infografis: papan urut (lima perbandingan dari Story) ------------------------------ */
{
  const B = DK.BARIS_INFO_URUT;
  cek(B.length === 5 && DK.KOLOM_INFO_URUT.length === 3, "infografis: lima kartu dan tiga kolom");
  cek(B.every((b) => b.isi.length === 3 && emojiSah(b.ikon) && b.nama.length > 2), "infografis: tiap kartu tiga isian, emoji sah");
  const jumlahContoh = B.map((b) => b.contoh.length);
  cek(jumlahContoh[0] === 3 && jumlahContoh.slice(1).every((n) => n === 0), "infografis: baris satu penuh contoh, baris dua sampai lima mandiri");
  const semua = B.flatMap((b) => b.isi);
  cek(B.every((b) => new Set(b.isi.map((x) => x.t)).size === 3), "infografis: tiga label tiap kartu berbeda");
  cek(semua.every((x) => x.t.length <= 26 && x.t.split(/\s+/).length <= 3 && bersih(x.t) && bersih(x.s ?? "")), "infografis: label pendek (paling banyak tiga kata) dan tanpa kata terlarang");
  cek(semua.every((x) => tanpaDigit(x.s ?? x.t)), "infografis: ucapan label tanpa digit (label berangka punya ucapan)");
  cek(B.every((b) => b.isi.every((x) => /\d/.test(x.t) === (x.s !== undefined))), "infografis: ucapan hanya untuk label yang berangka");
  // Data Story: Timur 546 lawan Utara 465 (ratusan), Utara 465 lawan Selatan 456 (puluhan), 300 sama 300, urutan naik 456, 465, 546, garis bilangan 400 dan 500.
  sama(B.map((b) => b.isi[0].t), ["546, 465", "465, 456", "300, 300", "456, 465, 546", "400, 500"], "infografis: bilangan sesuai data Story");
  sama(B.map((b) => b.isi[1].t), ["Ratusan", "Puluhan", "Tidak ada", "Ratusan, puluhan", "Titik di antara"], "infografis: tempat yang menentukan");
  sama(B.map((b) => b.isi[2].t), ["Timur lebih besar", "Utara lebih besar", "Sama dengan", "Urutan naik", "Kanan makin besar"], "infografis: hasil");
  cek(B[0].isi[0].s === "lima ratus empat puluh enam dan empat ratus enam puluh lima" && B[3].isi[0].s.includes("empat ratus lima puluh enam") && B[3].isi[0].s.includes("lima ratus empat puluh enam"), "infografis: ucapan bilangan tiga angka sesuai");
  cek(tanpaDigit(DK.SUARA_INFO_URUT + DK.SELESAI_INFO_URUT) && bersih(DK.SUARA_INFO_URUT + DK.SELESAI_INFO_URUT) && emojiSah(DK.TEMA_INFO_URUT.ikon), "infografis: suara dan tema bersih");
}

/* ------------------------------ Pengenal ucapan ------------------------------ */
{
  const c = (t, k) => K.cocokUcapan(t, k).cocok;
  const nm = (nama) => ({ jenis: "nama", nama });
  cek(c("lebih", nm("lebih")) && c("lebih besar", nm("lebih")) && c("kurang", nm("kurang")) && c("lebih kecil", nm("kurang")) && c("sama", nm("sama")) && c("sama dengan", nm("sama")) && !c("kurang", nm("lebih")) && !c("lebih kecil", nm("lebih")), "ucapan: lebih, kurang, sama (lebih kecil berarti kurang)");
  cek(!c("lebih atau kurang", nm("lebih")) && !c("sama atau lebih", nm("sama")), "ucapan: dua kata sekaligus tidak benar");
  cek(c("ratusan", nm("ratusan")) && c("puluhan", nm("puluhan")) && c("satuan", nm("satuan")) && !c("puluhan", nm("ratusan")), "ucapan: tempat");
  cek(c("naik", nm("naik")) && c("urutan turun", nm("turun")) && !c("naik atau turun", nm("naik")), "ucapan: naik dan turun");
  cek(c("kiri", nm("kiri")) && c("sebelah kanan", nm("kanan")) && !c("kiri kanan", nm("kiri")), "ucapan: kiri dan kanan");
  sama(K.angkaDariUcapan("angka tujuh"), [7], "ucapan: tujuh");
  sama(K.angkaDariUcapan("dua belas"), [12], "ucapan: dua belas");
  sama(K.angkaDariUcapan("5 dan 9"), [5, 9], "ucapan: angka");
  cek(c("enam", { jenis: "angka", n: 6 }) && c("eh enam deh", { jenis: "angka", n: 6 }) && !c("tujuh", { jenis: "angka", n: 6 }), "ucapan: bilangan");
  cek(!c("satu", { jenis: "kartu", i: 0 }), "ucapan: kunci kartu tidak diucapkan");
  cek(K.LEBAR_ADEGAN === 300 && K.TINGGI_ADEGAN === 200, "adegan 300 x 200");
}

/* ------------------------------ Hitungan bilangan ------------------------------ */
{
  sama([0, 7, 10, 11, 15, 20, 38, 100, 123, 465, 508, 999, 1000].map(LC.kata), ["nol", "tujuh", "sepuluh", "sebelas", "lima belas", "dua puluh", "tiga puluh delapan", "seratus", "seratus dua puluh tiga", "empat ratus enam puluh lima", "lima ratus delapan", "sembilan ratus sembilan puluh sembilan", "seribu"], "kata bilangan sampai seribu");
  cek(LC.angkaTempat(465, 0) === 4 && LC.angkaTempat(465, 1) === 6 && LC.angkaTempat(465, 2) === 5 && LC.angkaTempat(708, 1) === 0, "angka per tempat");
  cek(LC.tempatPenentu(465, 546) === 0 && LC.tempatPenentu(465, 456) === 1 && LC.tempatPenentu(519, 514) === 2 && LC.tempatPenentu(300, 300) === -1, "tempat penentu");
  cek(LC.namaBanding(5, 3) === "lebih" && LC.namaBanding(3, 5) === "kurang" && LC.namaBanding(4, 4) === "sama" && LC.tandaDari(1, 2) === "<" && LC.tandaDari(2, 1) === ">" && LC.tandaDari(2, 2) === "=", "nama banding dan tanda");
  sama(LC.urutanIndeks([523, 352, 532, 325], "naik"), [3, 1, 0, 2], "urutan naik");
  sama(LC.urutanIndeks([523, 352, 532, 325], "turun"), [2, 0, 1, 3], "urutan turun");
  cek(LC.urutanKe([374, 347, 437], 0) === 2 && LC.indeksEkstrem([608, 680, 806], "kecil") === 0 && LC.indeksEkstrem([608, 680, 806], "besar") === 2, "urutan ke berapa dan ekstrem");
  cek(LC.arahDeret([259, 295, 529]) === "naik" && LC.arahDeret([529, 295, 259]) === "turun" && LC.arahDeret([478, 748, 487]) === null, "arah deret");
  cek(LC.klaimBenar({ jenis: "satuan", a: 364, b: 346, katak: "a" }) && !LC.klaimBenar({ jenis: "satuan", a: 364, b: 346, katak: "b" }), "klaim satuan");
  cek(LC.klaimBenar({ jenis: "tanda", a: 612, b: 621, tanda: "<" }) && !LC.klaimBenar({ jenis: "tanda", a: 612, b: 621, tanda: ">" }) && LC.klaimBenar({ jenis: "tanda", a: 5, b: 5, tanda: "=" }), "klaim tanda");
  cek(LC.klaimBenar({ jenis: "urutan", susunan: [1, 2, 3], arah: "naik" }) && !LC.klaimBenar({ jenis: "urutan", susunan: [478, 748, 487], arah: "naik" }) && LC.klaimBenar({ jenis: "urutan", susunan: [3, 2, 1], arah: "turun" }), "klaim urutan");
  for (const n of [1, 4, 6, 9]) cek(LC.pilihanAngka(n).length === 4 && LC.pilihanAngka(n).includes(n) && LC.pilihanAngka(n).every((x) => x >= 1 && x <= 9) && new Set(LC.pilihanAngka(n)).size === 4, `pilihan angka memuat ${n}`);
  for (const n of [3, 4]) {
    const a = LC.acakTetap(n, Array.from({ length: n }, (_, i) => i));
    cek([...a].sort().join() === Array.from({ length: n }, (_, i) => i).join() && a.join() !== Array.from({ length: n }, (_, i) => i).join(), `acak tetap ${n} kartu bukan urutan benar`);
  }
  cek(LC.labelAngka({ tipe: "garis", awal: 400, n: 450 }, 4) === "400" && LC.labelAngka({ tipe: "rank", angka: [1, 2], i: 0 }, 4) === "4", "label angka: ratusan penuh hanya pada tugas garis");
}

/* ------------------------------ Tiga tahap CPA ------------------------------ */
const TAHAP = [
  { nama: "Concrete", soal: D.CONCRETE, rupa: "benda", nomor: [2, 3, 4], ikon: D.TEMA_URUT.concrete },
  { nama: "Pictorial", soal: D.PICTORIAL, rupa: "diagram", nomor: [5, 6, 7], ikon: D.TEMA_URUT.pictorial },
  { nama: "Abstract", soal: D.ABSTRACT, rupa: "lambang", nomor: [8, 9, 10], ikon: D.TEMA_URUT.abstract },
];
const angkaData = (l) => (l.angka ? l.angka : l.klaim?.susunan ? l.klaim.susunan : l.a !== undefined ? [l.a, l.b] : l.klaim?.a !== undefined ? [l.klaim.a, l.klaim.b] : [l.n, l.p, l.q].filter((x) => x !== undefined));
const STORY = new Set([465, 456, 546, 389, 398, 300, 500, 400, 600, 728, 721, 250, 780, 340, 304, 430, 403]);
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
    sama(so.langkah.map((l) => l.metode), ["igil", "tempat", "garis", "urut"], `${n}/${so.nomor}: urutan metode`);
    cek(bersih(so.judul + so.cerita) && tanpaDigit(so.cerita) && /^Misi Papan Urut \d+:/.test(so.judul) && so.cerita.length > 20, `${n}/${so.nomor}: judul dan cerita bersih`);
    cek(emojiSah(so.judul + so.cerita) && !ADA_EMOJI.test(so.judul + so.cerita), `${n}/${so.nomor}: judul dan cerita tanpa emoji`);
    for (const ls of so.langkah) {
      const l = ls.langkah;
      const nm = `${n}/${so.nomor}/${ls.metode}`;
      cek(ls.judul === ls.suara && ls.judul === LC.instruksi(l, th.rupa, so.cara), `${nm}: judul dan suara sama dengan instruksi`);
      cek(tanpaDigit(ls.suara) && bersih(ls.suara) && ls.suara.length > 20, `${nm}: instruksi tanpa digit dan kata terlarang`);
      cek(/(Pilih|Tulis|Ucapkan|Ketuk|Urutkan|Putar|Susun)/.test(ls.suara), `${nm}: instruksi memuat perintah`);
      cek(!/[<>=]/.test(ls.suara), `${nm}: instruksi tanpa lambang yang sulit dibaca mesin suara`);
      const kunci = LC.kunciJawab(l, so.cara);
      cek(LC.siapLangsung(l, th.rupa, so.cara) === (so.cara !== "klik" || kunci !== null), `${nm}: tugas langsung siap sesuai caranya (tombol tidak macet pada rupa ${th.rupa})`);
      for (const r of ["benda", "diagram", "lambang"]) cek(LC.siapLangsung(l, r, so.cara) === LC.siapLangsung(l, th.rupa, so.cara), `${nm}: siap langsung tidak bergantung rupa (${r})`);
      cek(tanpaDigit(LC.kalimatKunci(l, so.cara, th.rupa)) && bersih(LC.kalimatKunci(l, so.cara, th.rupa)) && LC.kalimatKunci(l, so.cara, th.rupa).length > 10, `${nm}: kalimat kunci tanpa digit`);
      cek(tanpaDigit(LC.kalimatTanya(l, so.cara)), `${nm}: kalimat tanya tanpa digit`);
      if (so.cara === "kanvas") {
        cek(kunci?.jenis === "angka" && kunci.n >= 1 && kunci.n <= 9 && Number.isInteger(kunci.n), `${nm}: Tulis di kanvas satu angka satu sampai sembilan`);
        if (kunci?.jenis === "angka") kanvas.push(kunci.n);
      }
      if (so.cara === "suara") cek(kunci !== null && kunci.jenis !== "kartu", `${nm}: Rekam suara punya kunci yang bisa diucapkan`);
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
      if (kunci?.jenis === "kartu") {
        cek(so.cara === "klik" && l.tipe === "ekstrem" && kunci.i >= 0 && kunci.i < l.angka.length && tanpaDigit(LC.petunjukSalah(l, "klik", `kartu ${kunci.i + 2}`, th.rupa)), `${nm}: kunci kartu hanya untuk Klik pada tugas bilangan terbesar atau terkecil`);
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
      // Data bilangan: tiga angka, bukan data Story, dan dalam batas.
      const data = angkaData(l);
      cek(data.length >= 1 && data.every((v) => Number.isInteger(v) && v >= 100 && v <= 999), `${nm}: semua bilangan tiga angka`);
      cek(!(l.tipe === "banding" || l.tipe === "tempat") || !(STORY.has(l.a) && STORY.has(l.b)), `${nm}: pasangan bukan data Story`);
      // Batas jawaban tiap tipe.
      if (l.tipe === "banding") {
        if (so.cara === "kanvas") cek(l.a !== l.b, `${nm}: banding kanvas tidak sama besar`);
        if (so.cara !== "klik") cek(l.a !== l.b || so.cara === "suara", `${nm}: banding bukan sama besar kecuali suara`);
      }
      if (l.tipe === "tempat") {
        cek(l.a !== l.b, `${nm}: tempat penentu dua bilangan berbeda`);
        if (so.cara === "kanvas") cek(LC.angkaTempat(Math.min(l.a, l.b), LC.tempatPenentu(l.a, l.b)) >= 1, `${nm}: angka tempat penentu bilangan kecil paling sedikit satu`);
      }
      if (["ekstrem", "urut", "rank", "arah"].includes(l.tipe)) {
        cek(new Set(l.angka).size === l.angka.length && l.angka.length >= 3 && l.angka.length <= 4, `${nm}: tiga atau empat bilangan berbeda`);
      }
      if (l.tipe === "arah") cek(l.angka.length === 3 && LC.arahDeret(l.angka) !== null && th.rupa !== "benda", `${nm}: arah tiga kartu yang berurutan`);
      if (l.tipe === "rank") cek(l.i >= 0 && l.i < l.angka.length, `${nm}: sasaran rank dalam batas`);
      if (l.tipe === "urut") {
        const benar = LC.urutanIndeks(l.angka, l.arah);
        const acak = LC.acakTetap(l.angka.length, benar);
        cek(acak.join() !== benar.join() && [...acak].sort().join() === benar.map((_, i) => i).join(), `${nm}: urutan tombol tidak berurutan dan memuat semua kartu`);
        cek(tanpaDigit(LC.petunjukKetuk(l)), `${nm}: petunjuk urut tanpa digit`);
      }
      if (l.tipe === "garis") {
        cek(l.awal % 100 === 0 && l.awal >= 100 && l.awal + 300 <= 900 && l.n >= l.awal && l.n < l.awal + 300 && l.n % 100 !== 0, `${nm}: titik di dalam garis, tanda ratusan sampai sembilan ratus`);
        if (th.rupa === "benda") cek(l.awal + 300 <= 700, `${nm}: tanda kardus paling banyak tujuh`);
      }
      if (l.tipe === "letak") {
        cek(l.awal % 100 === 0 && l.awal + 300 <= 900 && [l.p, l.q].every((v) => v >= l.awal && v <= l.awal + 300) && l.p !== l.q && Math.abs(l.p - l.q) >= 50, `${nm}: dua titik berjauhan di dalam garis`);
        if (th.rupa === "benda") cek(l.awal + 300 <= 700, `${nm}: tanda kardus paling banyak tujuh`);
      }
      if (th.rupa === "benda") cek(!["garis", "letak"].includes(l.tipe) || l.awal + 300 <= 700, `${nm}: Concrete batas tanda`);
      // Concrete: tiap angka paling banyak sembilan benda per tempat (sudah pasti untuk bilangan tiga angka).
    }
  }
  cek(salahAda >= 1, `${n}: paling sedikit satu Cari kesalahan`);
  cek(new Set(angka).size === angka.length, `${n}: angka jawaban tidak kembar dalam satu tahap (${angka.join(", ")})`);
  cek(new Set(kanvas).size === 4, `${n}: empat angka kanvas berbeda (${kanvas.join(", ")})`);
  cek(th.ikon.cara.length > 20 && emojiSah(th.ikon.ikon) && bersih(th.ikon.cara), `${n}: tema tahap`);
  // Tiga metode global tampak: tiap metode punya tugas di tiap misi.
  for (const m of ["tempat", "garis", "urut"]) cek(th.soal.every((so) => so.langkah.some((x) => x.metode === m)), `${n}: metode ${m} muncul di tiap misi`);
}
const angkaTahap = (soal) => soal.map((s) => s.langkah.map((l) => LC.kunciJawab(l.langkah, s.cara))).flat().filter((k) => k && k.jenis === "angka").map((k) => k.n);
sama(angkaTahap(D.CONCRETE), [3, 8, 5, 2, 1], "Concrete: angka jawaban");
sama(angkaTahap(D.PICTORIAL), [6, 4, 9, 7, 3], "Pictorial: angka jawaban");
sama(angkaTahap(D.ABSTRACT), [8, 3, 1, 6, 4, 2], "Abstract: angka jawaban");
// Batas rupa pada sumber komponen: emoji benda hanya pada cabang rupa benda (Concrete).
{
  const lg = readFileSync(new URL("LangkahUrut.tsx", folderUrl), "utf8");
  const tg = readFileSync(new URL("TahapUrut.tsx", folderUrl), "utf8");
  cek(/IKON_BENDA = \["\\u\{1F4E6\}", "\\u\{1F6CD\}\\u\{FE0F\}", "\\u\{1F96B\}"\]/.test(lg), "komponen: benda Concrete kardus, bungkus, dan kaleng");
  const pakai = lg.split("\n").map((b, i) => [i, b]).filter(([, b]) => /IKON_BENDA\[/.test(b) && !/^const /.test(b));
  cek(pakai.length >= 3, "komponen: emoji benda dipakai pada rupa benda");
  const baris = lg.split("\n");
  for (const [i] of pakai) {
    const konteks = baris.slice(Math.max(0, i - 6), i + 1).join(" ");
    cek(/benda|Keterangan/.test(konteks), `LangkahUrut.tsx baris ${i + 1}: emoji benda hanya pada cabang benda`);
  }
  cek(/rupa === "benda" \? `\$\{IKON_METODE\[ls\.metode\]\} ` : ""/.test(tg), "TahapUrut: ikon metode hanya pada Concrete");
  cek(/rupa === "lambang"/.test(lg) && /<TabelGaris/.test(lg) && /fontWeight=\{900\} fill=\{UNGU\}>\s*\{n\}/.test(lg), "komponen: Abstract memakai angka dan tabel garis bilangan");
  cek(/<rect x=\{cx - s \/ 2\}/.test(lg) && /fill="#BFDBFE"/.test(lg), "komponen: Pictorial memakai balok polos");
}

/* ------------------------------ Cakupan jenis tugas dan metode global ------------------------------ */
{
  const semua = [...D.CONCRETE, ...D.PICTORIAL, ...D.ABSTRACT].flatMap((s) => s.langkah.map((l) => l.langkah.tipe));
  for (const tp of ["salah", "banding", "tempat", "ekstrem", "urut", "rank", "arah", "garis", "letak"]) cek(semua.includes(tp), `jenis tugas ${tp} dipakai`);
  const klaim = [...D.CONCRETE, ...D.PICTORIAL, ...D.ABSTRACT].flatMap((s) => s.langkah).filter((l) => l.langkah.tipe === "salah").map((l) => l.langkah.klaim.jenis);
  sama(klaim, ["satuan", "tanda", "urutan"], "Cari kesalahan memakai klaim satuan, tanda dibalik, dan urutan");
  cek(LC.NAMA_METODE.igil === "Metode IGIL: Ratusan Dulu, Lalu Turun", "nama Metode IGIL");
  cek(LC.NAMA_METODE.tempat.includes("Compare Placewise") && LC.NAMA_METODE.garis.includes("Number Line") && LC.NAMA_METODE.urut.includes("Ordering"), "tiga metode global di judul tugas");
  cek(LC.URUT_METODE.join() === "igil,tempat,garis,urut" && Object.values(LC.IKON_METODE).every(emojiSah), "metode dan ikon");
  cek(D.TEMA_URUT.concrete.nama === "Concrete" && D.TEMA_URUT.pictorial.nama === "Pictorial" && D.TEMA_URUT.abstract.nama === "Abstract", "nama tahap");
  cek(D.CONCRETE_URUT === D.CONCRETE && D.PICTORIAL_URUT === D.PICTORIAL && D.ABSTRACT_URUT === D.ABSTRACT, "ekspor untuk pemasang");
  cek(D.POIN_PENTING.length >= 6 && D.POIN_PENTING_SUARA.every(tanpaDigit) && D.POIN_PENTING_SUARA.every(bersih) && !/[<>=]/.test(D.POIN_PENTING_SUARA.join(" ")) && tanpaDigit(D.PENUTUP_C) && /\?$/.test(D.PENUTUP_C) && bersih(D.PENUTUP_C), "poin penting dan penutup bersih, suara tanpa digit dan lambang");
  const poin = D.POIN_PENTING.join(" ").toLowerCase();
  for (const s of ["ratusan", "puluhan", "satuan", "tempat pertama", "lebih besar", "lebih kecil", "sama dengan", "mulut", "garis bilangan", "makin ke kanan", "mengurutkan", "urutan naik", "urutan turun", "paling kecil", "tanda dibalik"]) cek(poin.includes(s), `poin penting memuat "${s}"`);
  cek(D.MISI_URUTAN_TEKS === DS.MISI_URUTAN_TEKS && DP.MISI_URUTAN_TEKS === DS.MISI_URUTAN_TEKS && MT.MISI_K3B1.C === DS.MISI_URUTAN_TEKS && tanpaDigit(DS.MISI_URUTAN_TEKS) && bersih(DS.MISI_URUTAN_TEKS), "teks misi awal tanpa digit dan sama di misi-teks-k3b1");
}

/* ------------------------------ Simulasi Papan Urut ------------------------------ */
{
  const k0 = L.awalUrutan();
  cek(k0.alat === "urutan" && k0.mode === "tempat" && k0.tempatBenar.length === 0 && k0.tandaBenar.length === 0 && !k0.samaTemu && k0.garisBenar.length === 0 && k0.urutNaikBenar.length === 0 && k0.urutTurunBenar.length === 0 && k0.tempatPilih === -1 && k0.tandaPilih === "" && k0.garisPilih === 0 && k0.urutSudah.length === 0, "simulasi: keadaan awal bersih");
  cek(JSON.stringify(L.mulaiLagiUrutan()) === JSON.stringify(k0), "simulasi: mulai lagi sama dengan awal");
  cek(L.pilihModeUrutan(k0, "urut").mode === "urut" && L.URUT_MODE.length === 4, "simulasi: empat alat");
  // Tempat.
  const pt0 = L.pasanganTempat(k0);
  cek(!L.periksaTempat(k0).ok && L.periksaTempat(k0).k.salah === 0 && tanpaDigit(L.periksaTempat(k0).pesan), "simulasi: periksa tempat tanpa memilih ditolak");
  const benarT = LC.tempatPenentu(pt0.a, pt0.b);
  const salahT = L.periksaTempat(L.pilihTempat(k0, (benarT + 1) % 3));
  cek(!salahT.ok && salahT.k.tempatBenar.length === 0 && salahT.k.salah === 1 && tanpaDigit(salahT.pesan), "simulasi: tempat keliru tidak dihitung");
  const okT = L.periksaTempat(L.pilihTempat(k0, benarT));
  cek(okT.ok && okT.k.tempatBenar.join() === "0" && okT.k.tempatIndeks === 1 && okT.k.tempatPilih === -1 && tanpaDigit(okT.pesan), "simulasi: tempat tepat dihitung, pasangan berikutnya");
  cek(L.pilihTempat(L.pilihTempat(k0, 1), 1).tempatPilih === -1, "simulasi: mengetuk tempat yang sama membatalkan pilihan");
  {
    // Pasangan sama besar: pilihan "sama semua" (3) benar.
    const idxSama = DS.PASANGAN.findIndex((p) => p.a === p.b);
    const x = L.periksaTempat(L.pilihTempat({ ...k0, tempatIndeks: idxSama }, 3));
    cek(idxSama >= 0 && x.ok && x.k.tempatBenar.includes(idxSama) && tanpaDigit(x.pesan), "simulasi: pasangan sama besar dijawab sama semua");
    const y = L.periksaTempat(L.pilihTempat({ ...k0, tempatIndeks: idxSama }, 0));
    cek(!y.ok, "simulasi: pasangan sama besar tidak punya tempat penentu");
  }
  // Tanda.
  const pn0 = L.pasanganTanda(k0);
  cek(!L.periksaTanda(k0).ok && tanpaDigit(L.periksaTanda(k0).pesan), "simulasi: periksa tanda tanpa memilih ditolak");
  const tBenar = LC.tandaDari(pn0.a, pn0.b);
  const tSalah = ["<", ">", "="].find((t) => t !== tBenar);
  const salahN = L.periksaTanda(L.pilihTanda(k0, tSalah));
  cek(!salahN.ok && salahN.k.tandaBenar.length === 0 && salahN.k.salah === 1 && tanpaDigit(salahN.pesan), "simulasi: tanda keliru tidak dihitung");
  const okN = L.periksaTanda(L.pilihTanda(k0, tBenar));
  cek(okN.ok && okN.k.tandaBenar.join() === "0" && okN.k.tandaIndeks === 1 && okN.k.tandaPilih === "" && !okN.k.samaTemu && tanpaDigit(okN.pesan), "simulasi: tanda tepat dihitung, pasangan berikutnya");
  {
    const idxSama = DS.PASANGAN.findIndex((p) => p.a === p.b);
    const z = L.periksaTanda(L.pilihTanda({ ...k0, tandaIndeks: idxSama }, "="));
    cek(z.ok && z.k.samaTemu && z.k.tandaBenar.includes(idxSama) && tanpaDigit(z.pesan), "simulasi: pasangan sama besar dengan tanda sama dengan ditemukan");
    for (let i = 0; i < DS.PASANGAN.length; i += 1) {
      const p = DS.PASANGAN[i];
      const r = L.periksaTanda(L.pilihTanda({ ...k0, tandaIndeks: i }, LC.tandaDari(p.a, p.b)));
      cek(r.ok && r.k.tandaIndeks === (i + 1) % DS.PASANGAN.length, `simulasi: pasangan tanda ${i} dijawab benar`);
    }
  }
  cek(DS.PASANGAN.some((p) => p.a > p.b) && DS.PASANGAN.some((p) => p.a < p.b) && DS.PASANGAN.some((p) => p.a === p.b), "simulasi: pasangan memuat lebih, kurang, dan sama");
  cek(DS.PASANGAN.some((p) => LC.tempatPenentu(p.a, p.b) === 0) && DS.PASANGAN.some((p) => LC.tempatPenentu(p.a, p.b) === 1) && DS.PASANGAN.some((p) => LC.tempatPenentu(p.a, p.b) === 2), "simulasi: pasangan memuat tempat penentu ratusan, puluhan, dan satuan");
  // Garis.
  cek(!L.periksaGaris(k0).ok && tanpaDigit(L.periksaGaris(k0).pesan), "simulasi: periksa garis tanpa memilih ditolak");
  cek(L.ubahGaris(k0, -1).garisPilih === 0 && L.ubahGaris(k0, 1).garisPilih === Math.floor(DS.GARIS_TUGAS[0].awal / 100) && L.ubahGaris({ ...k0, garisPilih: 9 }, 1).garisPilih === 9 && L.ubahGaris({ ...k0, garisPilih: 1 }, -1).garisPilih === 1, "simulasi: ratusan antara satu dan sembilan");
  const gt = L.tugasGaris(k0);
  const benarG = Math.floor(gt.n / 100);
  const salahG = L.periksaGaris({ ...k0, garisPilih: benarG + 1 });
  cek(!salahG.ok && salahG.k.garisBenar.length === 0 && salahG.k.salah === 1 && tanpaDigit(salahG.pesan), "simulasi: ratusan keliru tidak dihitung");
  const okG = L.periksaGaris({ ...k0, garisPilih: benarG });
  cek(okG.ok && okG.k.garisBenar.join() === "0" && okG.k.garisIndeks === 1 && okG.k.garisPilih === 0 && tanpaDigit(okG.pesan), "simulasi: ratusan tepat dihitung, titik berikutnya");
  cek(DS.GARIS_TUGAS.every((t) => t.awal % 100 === 0 && t.n >= t.awal && t.n < t.awal + 300 && t.awal + 300 <= 900 && t.n % 100 !== 0), "simulasi: titik di dalam garis");
  // Urut.
  const tu = L.tugasUrut(k0);
  const benarU = LC.urutanIndeks(tu.angka, "naik");
  const salahU = L.ketukUrut(k0, benarU[1]);
  cek(!salahU.ok && salahU.k.urutSudah.length === 0 && salahU.k.salah === 1 && tanpaDigit(salahU.pesan), "simulasi: kartu yang bukan berikutnya ditolak");
  let ku = k0;
  benarU.forEach((i, q) => {
    const r = L.ketukUrut(ku, i);
    cek(r.ok && tanpaDigit(r.pesan), `simulasi: ketuk kartu ${q + 1} benar`);
    ku = r.k;
  });
  cek(ku.urutNaikBenar.join() === "0" && ku.urutTurunBenar.length === 0 && ku.urutIndeks === 1 && ku.urutSudah.length === 0, "simulasi: semua kartu berurutan naik dihitung, tugas berikutnya");
  {
    const baru = L.gantiArahUrut(k0, "turun");
    const benarD = LC.urutanIndeks(tu.angka, "turun");
    let kd = baru;
    for (const i of benarD) kd = L.ketukUrut(kd, i).k;
    cek(kd.urutTurunBenar.join() === "0" && kd.urutNaikBenar.length === 0, "simulasi: urutan turun dihitung terpisah");
    cek(L.gantiArahUrut({ ...k0, urutSudah: [0] }, "turun").urutSudah.length === 0 && L.ulangUrut({ ...k0, urutSudah: [0, 1] }).urutSudah.length === 0, "simulasi: ganti arah dan ulang mengosongkan ketukan");
    cek(!L.ketukUrut({ ...k0, urutSudah: [benarU[0]] }, benarU[0]).ok, "simulasi: kartu yang sudah diketuk ditolak");
  }
  cek(DS.URUT_TUGAS.every((t) => new Set(t.angka).size === t.angka.length && t.angka.length >= 3 && t.angka.length <= 4 && t.angka.every((v) => v >= 100 && v <= 999)), "simulasi: kartu tiga atau empat bilangan berbeda");
  // Teks.
  cek(Object.values(L.SUARA_MODE).every((t) => tanpaDigit(t) && bersih(t)) && L.URUT_MODE.every((md) => L.kalimatUrutan(L.pilihModeUrutan(k0, md)).length > 20 && tanpaDigit(L.kalimatUrutan(L.pilihModeUrutan(k0, md)))), "simulasi: ucapan tiap alat tanpa digit");
  // Berbeda dari Story (465, 456, 546, 389, 398, 300, 500, 400, 600, ...).
  const dataSim = [...DS.PASANGAN.flatMap((p) => [p.a, p.b]), ...DS.GARIS_TUGAS.map((t) => t.n), ...DS.URUT_TUGAS.flatMap((t) => t.angka)];
  cek(!dataSim.some((v) => STORY.has(v)), "simulasi: tidak memakai bilangan Story");
  cek(!DS.PASANGAN.some((p) => (p.a === 465 && p.b === 456) || (p.a === 456 && p.b === 465)), "simulasi: tidak ada pasangan yang sama dengan Story");
}

/* ------------------------------ Misi ------------------------------ */
{
  const awal = L.awalUrutan();
  const d = MK.daftarMisiK3Bab1("C");
  cek(d === MK.MISI_C && d.length === 6 && d.filter((x) => x.wajib).length === 4 && d.every((x) => x.id.startsWith("c-")), "misi: enam misi, empat wajib, id berawalan c-");
  cek(d.every((x) => x.teks.length >= 10 && x.teks.length <= 120 && tanpaDigit(x.teks) && bersih(x.teks)), "misi: teks 10-120 huruf tanpa digit dan kata terlarang");
  cek(d.every((x) => !/(skor|nilai|tebak)/i.test(x.teks)), "misi: tanpa skor");
  cek(S.misiBaru(d, awal, new Set()).length === 0, "misi: keadaan awal tidak memenuhi misi");
  cek(d.every((x) => !x.cek({ alat: "kerangka" })), "misi: alat lain tidak memenuhi misi");
  // Alur lengkap melalui logika.
  let k = awal;
  k = L.periksaTempat(L.pilihTempat(k, LC.tempatPenentu(L.pasanganTempat(k).a, L.pasanganTempat(k).b))).k;
  sama(S.misiBaru(d, k, new Set()), ["c-tempat"], "misi: tempat benar memenuhi c-tempat");
  k = L.periksaTanda(L.pilihTanda(k, LC.tandaDari(L.pasanganTanda(k).a, L.pasanganTanda(k).b))).k;
  k = L.periksaGaris({ ...k, garisPilih: Math.floor(L.tugasGaris(k).n / 100) }).k;
  for (const i of LC.urutanIndeks(L.tugasUrut(k).angka, "naik")) k = L.ketukUrut(k, i).k;
  sama(S.misiBaru(d, k, new Set()), ["c-tempat", "c-tanda", "c-garis", "c-naik"], "misi: empat wajib tercapai lewat logika simulasi");
  {
    // Urutan turun satu set penuh.
    let kt = L.gantiArahUrut(k, "turun");
    for (const i of LC.urutanIndeks(L.tugasUrut(kt).angka, "turun")) kt = L.ketukUrut(kt, i).k;
    sama(S.misiBaru(d, kt, new Set(["c-tempat", "c-tanda", "c-garis", "c-naik"])), ["c-turun"], "misi: urutan turun memenuhi tantangan bebas");
    // Pasangan sama besar.
    const idxSama = DS.PASANGAN.findIndex((p) => p.a === p.b);
    const ks = L.periksaTanda(L.pilihTanda({ ...awal, tandaIndeks: idxSama }, "=")).k;
    sama(S.misiBaru(d, ks, new Set()), ["c-tanda", "c-sama"], "misi: pasangan sama besar memenuhi c-tanda dan c-sama");
  }
  const wajib = d.filter((x) => x.wajib).map((x) => x.id);
  cek(S.wajibSelesai(d, new Set(wajib)) && !S.wajibSelesai(d, new Set(["c-tempat"])), "misi: gerbang wajib");
  cek(S.misiBaru(d, { ...awal, salah: 9, mode: "urut", tempatIndeks: 3, tempatPilih: 2, tandaIndeks: 2, tandaPilih: ">", garisIndeks: 1, garisPilih: 5, urutIndeks: 1, urutArah: "turun", urutSudah: [0, 1] }, new Set()).length === 0, "misi: percobaan keliru dan geseran tidak dihitung sebagai misi");
}

/* ------------------------------ Berkas ------------------------------ */
{
  const berkas = readdirSync(folderUrl).filter((f) => /\.(ts|tsx)$/.test(f));
  for (const f of ["logika.ts", "logika-cpa.ts", "periksa.ts", "data.ts", "data-peta.ts", "data-sim.ts", "data-kartu.ts", "JawabUrut.tsx", "LangkahUrut.tsx", "TahapUrut.tsx", "TrukBeras.tsx", "PapanUrut.tsx", "SimulasiPapanUrut.tsx"]) cek(berkas.includes(f), `berkas ${f} ada`);
  const lihat = [...berkas.map((f) => ["urut-k3b1c/" + f, readFileSync(new URL(f, folderUrl), "utf8")]), ["misi-k3bab1.ts", readFileSync(new URL("../src/components/modul/misi-k3bab1.ts", import.meta.url), "utf8")]];
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
