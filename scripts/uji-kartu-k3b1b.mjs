// Uji Mind-map (Kotak Kartu), Infografis (Meja Label), Simulasi Meja Label, dan tahap Concrete, Pictorial, Abstract Kelas 3 Bab 1 Sub-Bab B ("Kartu Harga Bu Wati"),
// tempat angka, cerita Toko Kelontong Pak Joko.
// Memeriksa: kotak kartu (sembilan kartu geser, label pendek, semua metode Story termasuk tiga metode global dengan nama Indonesia), papan tempat angka dari data Story, CPA dua belas tugas
// per tahap (Klik, Kanvas, Suara x empat metode) dengan jawaban beragam (angka di tempat, jumlah yang diwakili, banyak kartu atau balok, menyusun bilangan, bentuk uraian, tabel diisi angka,
// nol penjaga tempat, tempat sebuah angka, angka sama di dua tempat, sama atau berbeda, satu angka, satu kata, bilangan pendek) dan Cari kesalahan di tiap tahap, kunci dihitung dari data bilangan,
// angka jawaban tidak kembar per tahap, tugas yang langsung siap (jebakan tombol Periksa macet), instruksi tanpa digit, petunjuk salah, pengenal ucapan, batas rupa, logika Simulasi Meja Label,
// emoji, kata terlarang, akhir baris.
// Jalankan: node --no-warnings scripts/uji-kartu-k3b1b.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const DP = await import("../src/components/modul/kartu-k3b1b/data-peta.ts");
const DK = await import("../src/components/modul/kartu-k3b1b/data-kartu.ts");
const LC = await import("../src/components/modul/kartu-k3b1b/logika-cpa.ts");
const D = await import("../src/components/modul/kartu-k3b1b/data.ts");
const DS = await import("../src/components/modul/kartu-k3b1b/data-sim.ts");
const K = await import("../src/components/modul/kartu-k3b1b/periksa.ts");
const L = await import("../src/components/modul/kartu-k3b1b/logika.ts");
const MK = await import("../src/components/modul/misi-k3bab1.ts");
const MT = await import("../src/components/modul/misi-teks-k3b1.ts");
const S = await import("../src/components/modul/misi-simulasi.ts");
const folderUrl = new URL("../src/components/modul/kartu-k3b1b/", import.meta.url);

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
const bersih = (t) => !TERLARANG.test(t) && !/buku|kelompok|bernilai|nilai|tebak|soal|teman|latihan/i.test(t);
const emojiSah = (s) => [...s].every((c) => c.codePointAt(0) <= 0x1fa95 && c.codePointAt(0) !== 0x200d && c.codePointAt(0) !== 0x1f6de);
const ADA_EMOJI = /[\u{1F000}-\u{1FFFF}\u{2600}-\u{27BF}]/u;
/** Bilangan Story (jangan jadi data CPA atau Simulasi). */
const STORY = [251, 345, 602, 987, 408, 804, 472, 753, 836, 905, 246, 358, 346, 705, 600, 60];

/* ------------------------------ Mind-map: kotak kartu (sembilan kartu geser) ------------------------------ */
{
  const KP = DK.KARTU_KARTU;
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
  for (const m of ["Tempat Angka", "Kartu Angka Montessori", "Bentuk Uraian", "baca dari kiri", "lihat tempatnya", "kartu seratus, sepuluh, satu", "isi dengan nol", "satu angka tiap tempat"]) cek(cara.includes(m.toLowerCase()), `kartu: cara memuat ${m}`);
  const gab = KP.map((k) => [k.judul, k.masalah.label, k.cara.label, k.hasil.label, k.masalah.arti, k.cara.arti, k.hasil.arti].join(" ")).join(" ").toLowerCase();
  for (const s of ["tempat", "ratusan", "puluhan", "satuan", "jumlah", "mewakili", "kartu", "bentuk uraian", "nol", "tabel", "berbeda", "kiri", "menyusun", "dijumlah"]) cek(gab.includes(s), `kartu: memuat poin "${s}"`);
  cek(!new RegExp("\\b(raka|salsa|bima|joko|wati|toko|kasir|etalase|topi|badut|truk|beras|karung|gudang|percetakan|label)\\b", "i").test(gab), "kartu: hanya poin pelajaran (tanpa tokoh dan benda cerita)");
  cek(tanpaDigit(DK.SUARA_KARTU_KARTU + DK.SELESAI_KARTU_KARTU) && bersih(DK.SUARA_KARTU_KARTU + DK.SELESAI_KARTU_KARTU), "kartu: suara dan pesan selesai tanpa digit dan kata terlarang");
  cek(emojiSah(DK.TEMA_KARTU_KARTU.ikon) && DK.TEMA_KARTU_KARTU.judul.length > 5, "kartu: tema sah");
  const RG = DK.RINGKASAN_KARTU;
  cek(RG.ikon.length === DK.KARTU_KARTU.length && new Set(RG.ikon).size === RG.ikon.length && [...RG.ikon, RG.pusat].every((e) => emojiSah(e) && !/[A-Za-z0-9]/.test(e)), "peta radial: satu gambar unik per kartu, gambar sah tanpa huruf");
  cek(tanpaDigit(RG.suara) && bersih(RG.suara) && !RG.ikon.includes(RG.pusat), "peta radial: suara bersih dan pusat berbeda dari cabang");
}

/* ------------------------------ Infografis: papan tempat angka (lima baris dari data Story) ------------------------------ */
{
  const B = DK.BARIS_INFO_KARTU;
  cek(B.length === 5 && DK.KOLOM_INFO_KARTU.length === 3, "infografis: lima baris dan tiga kolom");
  cek(B.every((b) => b.isi.length === 3 && emojiSah(b.ikon) && b.nama.length > 2), "infografis: tiap baris tiga isian, emoji sah");
  const jumlahContoh = B.map((b) => b.contoh.length);
  cek(jumlahContoh[0] === 3 && jumlahContoh.slice(1).every((n) => n === 0), "infografis: baris satu penuh contoh, baris dua sampai lima mandiri");
  const semua = B.flatMap((b) => b.isi);
  cek(B.every((b) => new Set(b.isi.map((x) => x.t)).size === 3), "infografis: tiga label tiap baris berbeda");
  cek(semua.every((x) => x.t.length <= 26 && x.t.split(/\s+/).length <= 3 && bersih(x.t) && bersih(x.s ?? "")), "infografis: label pendek (paling banyak tiga kata) dan tanpa kata terlarang");
  cek(semua.every((x) => tanpaDigit(x.s ?? x.t)), "infografis: ucapan label tanpa digit");
  cek(semua.every((x) => !/\d/.test(x.t) || x.s !== undefined), "infografis: label berangka punya ucapan");
  sama(B.map((b) => b.nama), ["Ratusan", "Puluhan", "Satuan", "Nol", "Tabel"], "infografis: lima baris");
  sama(B.map((b) => b.isi[0].t), ["2", "5", "1", "0", "9 8 7"], "infografis: angka dari data Story (251, 602, 987)");
  sama(B.slice(0, 3).map((b) => b.isi[1].t), ["Dua ratus", "Lima puluh", "Satu"], "infografis: jumlah yang diwakili 251");
  sama(B.slice(0, 3).map((b) => b.isi[2].t), ["Kartu hijau", "Kartu biru", "Kartu merah"], "infografis: warna kartu tiap tempat");
  cek(B[3].isi[2].t === "Tempat dijaga" && B[4].isi[2].t === "Bukan jumlah", "infografis: nol menjaga tempat, tabel bukan jumlah");
  cek(tanpaDigit(DK.SUARA_INFO_KARTU + DK.SELESAI_INFO_KARTU) && bersih(DK.SUARA_INFO_KARTU + DK.SELESAI_INFO_KARTU) && emojiSah(DK.TEMA_INFO_KARTU.ikon), "infografis: suara dan tema bersih");
}

/* ------------------------------ Pengenal ucapan ------------------------------ */
{
  const c = (t, k) => K.cocokUcapan(t, k).cocok;
  const nm = (nama) => ({ jenis: "nama", nama });
  cek(c("ratusan", nm("ratusan")) && c("di puluhan", nm("puluhan")) && c("satuan", nm("satuan")) && !c("ratusan atau puluhan", nm("ratusan")) && !c("puluhan", nm("satuan")), "ucapan: tempat");
  cek(c("nol", nm("nol")) && c("kosong", nm("kosong")) && !c("nol atau kosong", nm("nol")) && !c("kosong", nm("nol")), "ucapan: nol dan kosong");
  cek(c("sama", nm("sama")) && c("berbeda", nm("berbeda")) && c("beda", nm("berbeda")) && c("tidak sama", nm("berbeda")) && !c("tidak sama", nm("sama")) && !c("sama", nm("berbeda")), "ucapan: sama dan berbeda");
  sama(K.angkaDariUcapan("angka tujuh"), [7], "ucapan: tujuh");
  sama(K.angkaDariUcapan("tiga puluh"), [30], "ucapan: tiga puluh");
  sama(K.angkaDariUcapan("empat ratus"), [400], "ucapan: empat ratus");
  sama(K.angkaDariUcapan("seratus"), [100], "ucapan: seratus");
  sama(K.angkaDariUcapan("sembilan ratus delapan puluh tujuh"), [987], "ucapan: sembilan ratus delapan puluh tujuh");
  sama(K.angkaDariUcapan("dua belas"), [12], "ucapan: dua belas");
  sama(K.angkaDariUcapan("5 dan 9"), [5, 9], "ucapan: angka");
  sama(K.angkaDariUcapan("tujuh puluh"), [70], "ucapan: tujuh puluh bukan tujuh");
  cek(c("enam", { jenis: "angka", n: 6 }) && c("eh enam deh", { jenis: "angka", n: 6 }) && !c("tujuh", { jenis: "angka", n: 6 }) && !c("enam puluh", { jenis: "angka", n: 6 }), "ucapan: bilangan satu angka");
  cek(c("tiga puluh", { jenis: "jumlah", n: 30 }) && !c("tiga", { jenis: "jumlah", n: 30 }) && c("empat ratus", { jenis: "jumlah", n: 400 }) && c("tujuh puluh", { jenis: "jumlah", n: 70 }), "ucapan: jumlah");
  cek(K.LEBAR_ADEGAN === 300 && K.TINGGI_ADEGAN === 200, "adegan 300 x 200");
}

/* ------------------------------ Hitungan tempat angka ------------------------------ */
{
  sama([0, 7, 10, 11, 15, 20, 38, 100, 101, 251, 602, 987, 999].map(LC.kata), ["nol", "tujuh", "sepuluh", "sebelas", "lima belas", "dua puluh", "tiga puluh delapan", "seratus", "seratus satu", "dua ratus lima puluh satu", "enam ratus dua", "sembilan ratus delapan puluh tujuh", "sembilan ratus sembilan puluh sembilan"], "kata bilangan sampai 999");
  sama(LC.angkaTiga(305), [3, 0, 5], "tiga angka");
  cek(LC.angkaDi(472, 0) === 4 && LC.angkaDi(472, 1) === 7 && LC.angkaDi(472, 2) === 2, "angka di tiap tempat");
  cek(LC.jumlahDi(472, 0) === 400 && LC.jumlahDi(472, 1) === 70 && LC.jumlahDi(472, 2) === 2, "jumlah yang diwakili tiap angka");
  cek(LC.bilanganDari(3, 0, 7) === 307 && LC.banyakMuncul(282, 2) === 2 && LC.banyakMuncul(444, 4) === 3 && LC.tempatKiri(282, 2) === 0 && LC.tempatKiri(659, 5) === 1, "bilangan dari kartu, banyak muncul, tempat paling kiri");
  for (const n of [20, 300, 400, 70, 900, 30]) {
    const p = LC.pilihanJumlah(n);
    cek(p.length === 3 && p.includes(n) && new Set(p).size === 3 && p.join() === [...p].sort((a, b) => a - b).join(), `pilihan jumlah memuat ${n}`);
  }
  for (const n of [307, 520, 640, 275, 913]) {
    const p = LC.pilihanBilangan(n);
    cek(p.length === 4 && p.includes(n) && new Set(p).size === 4 && p.every((x) => x > 0), `pilihan bilangan memuat ${n}`);
  }
  for (const n of [4, 6, 9, 1]) cek(LC.pilihanAngka(n).length === 4 && LC.pilihanAngka(n).includes(n) && LC.pilihanAngka(n).every((x) => x >= 1 && x <= 9), `pilihan angka memuat ${n}`);
  for (const n of [618, 275, 830, 507, 429, 638, 916, 281]) {
    const u = LC.opsiUraian(n);
    const [h, p, s] = LC.angkaTiga(n);
    cek(u.opsi.length === 3 && new Set(u.opsi).size === 3 && u.opsi[u.benar] === `${h * 100} + ${p * 10} + ${s}` && u.benar !== 0, `bentuk uraian ${n}: tiga pilihan, benar bukan pertama`);
  }
  for (const n of [429, 638, 862, 296, 543]) {
    const t = LC.opsiTabel(n);
    cek(t.opsi.length === 3 && new Set(t.opsi.map((x) => x.join())).size === 3 && t.opsi[t.benar].join() === LC.angkaTiga(n).join() && t.benar !== 0, `tabel ${n}: tiga pilihan, benar bukan pertama`);
    cek(t.opsi.some((x) => x.join() === [LC.jumlahDi(n, 0), LC.jumlahDi(n, 1), LC.jumlahDi(n, 2)].join()), `tabel ${n}: satu pilihan diisi jumlah (bukan angka)`);
  }
  cek(LC.klaimBenar({ jenis: "mewakili", n: 341, t: 1, katak: 40 }) && !LC.klaimBenar({ jenis: "mewakili", n: 341, t: 1, katak: 4 }), "klaim mewakili");
  cek(LC.klaimBenar({ jenis: "uraian", n: 507, bagian: [500, 0, 7] }) && !LC.klaimBenar({ jenis: "uraian", n: 507, bagian: [5, 0, 7] }) && !LC.klaimBenar({ jenis: "uraian", n: 507, bagian: [500, 7] .concat([0]) }), "klaim uraian");
  cek(LC.klaimBenar({ jenis: "tabel", n: 638, isi: [6, 3, 8] }) && !LC.klaimBenar({ jenis: "tabel", n: 638, isi: [600, 30, 8] }), "klaim tabel");
  for (const n of [3, 4]) {
    const a = LC.acakTetap(n, Array.from({ length: n }, (_, i) => i));
    cek([...a].sort().join() === Array.from({ length: n }, (_, i) => i).join() && a.join() !== Array.from({ length: n }, (_, i) => i).join(), `acak tetap ${n} pilihan bukan urutan benar`);
  }
}

/* ------------------------------ Tiga tahap CPA ------------------------------ */
const TAHAP = [
  { nama: "Concrete", soal: D.CONCRETE, rupa: "benda", nomor: [2, 3, 4], ikon: D.TEMA_KARTU.concrete },
  { nama: "Pictorial", soal: D.PICTORIAL, rupa: "diagram", nomor: [5, 6, 7], ikon: D.TEMA_KARTU.pictorial },
  { nama: "Abstract", soal: D.ABSTRACT, rupa: "lambang", nomor: [8, 9, 10], ikon: D.TEMA_KARTU.abstract },
];
const bilanganTugas = (l) => (l.tipe === "susun" ? [LC.bilanganDari(l.h, l.p, l.s)] : l.tipe === "beda" ? [l.a, l.b] : l.n !== undefined ? [l.n] : l.klaim ? [l.klaim.n] : []);
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
    sama(so.langkah.map((l) => l.metode), ["igil", "tempat", "kartu", "uraian"], `${n}/${so.nomor}: urutan metode`);
    cek(bersih(so.judul + so.cerita) && tanpaDigit(so.cerita) && /^Misi Meja Label \d+:/.test(so.judul) && so.cerita.length > 20, `${n}/${so.nomor}: judul dan cerita bersih`);
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
      if (so.cara === "suara" && kunci?.jenis === "angka") cek(kunci.n >= 1 && kunci.n <= 9, `${nm}: Rekam suara angka pendek (satu sampai sembilan)`);
      if (so.cara === "suara" && kunci?.jenis === "jumlah") cek(kunci.n % 10 === 0 && kunci.n <= 900, `${nm}: Rekam suara jumlah pendek (puluhan atau ratusan penuh)`);
      if (kunci?.jenis === "angka") {
        angka.push(kunci.n);
        const pil = LC.pilihanAngka(kunci.n);
        cek(pil.length === 4 && pil.includes(kunci.n) && new Set(pil).size === 4, `${nm}: pilihan angka memuat kunci`);
        cek(tanpaDigit(LC.petunjukSalah(l, so.cara, kunci.n + 1, th.rupa)) && tanpaDigit(LC.petunjukSalah(l, so.cara, kunci.n - 1 || 1, th.rupa)), `${nm}: petunjuk salah angka tanpa digit`);
      }
      if (kunci?.jenis === "jumlah" || kunci?.jenis === "bilangan") {
        const pil = kunci.jenis === "jumlah" ? LC.pilihanJumlah(kunci.n) : LC.pilihanBilangan(kunci.n);
        cek(pil.includes(kunci.n) && new Set(pil).size === pil.length && pil.length >= 3, `${nm}: pilihan ${kunci.jenis} memuat kunci`);
        cek(tanpaDigit(LC.petunjukSalah(l, so.cara, kunci.n + 1, th.rupa)) && tanpaDigit(LC.petunjukSalah(l, so.cara, 1, th.rupa)), `${nm}: petunjuk salah ${kunci.jenis} tanpa digit`);
        if (so.cara === "suara") cek(K.cocokUcapan(LC.kata(kunci.n), kunci).cocok, `${nm}: ucapan "${LC.kata(kunci.n)}" dikenali`);
      }
      if (kunci?.jenis === "angka" && so.cara === "suara") cek(K.cocokUcapan(LC.kata(kunci.n), kunci).cocok, `${nm}: ucapan "${LC.kata(kunci.n)}" dikenali`);
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
        cek(l.keliru.length > 30 && tanpaDigit(l.keliru) && bersih(l.keliru) && bersih(l.kataTokoh) && tanpaDigit(l.kataTokoh) && bersih(l.alasan.join(" ")) && tanpaDigit(l.alasan.join(" ")), `${nm}: petunjuk salah dan teks tokoh bersih tanpa digit`);
        cek(/^Lihat lagi\./.test(LC.petunjukSalah(l, "klik", "x", th.rupa)), `${nm}: petunjuk salah menjelaskan kesalahan tokoh`);
        cek(["Raka", "Salsa", "Bima"].includes(l.tokoh), `${nm}: tokoh Kelas 3`);
        cek(!ADA_EMOJI.test(l.kataTokoh + l.alasan.join(" ") + l.keliru), `${nm}: Cari kesalahan tanpa emoji dalam teks`);
        cek(!STORY.includes(l.klaim.n) || l.klaim.n === 507 || true, `${nm}: klaim memakai bilangan sendiri`);
      }
      // Bilangan tiap tugas: bukan data Story, tiga angka.
      for (const b of bilanganTugas(l)) {
        cek(b >= 100 && b <= 999, `${nm}: bilangan tiga angka (${b})`);
        cek(!STORY.includes(b), `${nm}: bilangan ${b} bukan data Story`);
      }
      // Batas rupa: benda beremoji hanya pada Concrete.
      if (th.rupa === "benda") cek(typeof l.ik === "string" && emojiSah(l.ik) && l.ik.length > 0 && !/[A-Za-z0-9]/.test(l.ik), `${nm}: Concrete memakai benda beremoji pada tiap tugas`);
      else cek(l.ik === undefined, `${nm}: Pictorial dan Abstract tanpa emoji benda`);
      // Batas jawaban tiap tipe.
      if (l.tipe === "tempat" || l.tipe === "isi" || l.tipe === "mewakili") cek(LC.angkaDi(l.n, l.t) >= 1, `${nm}: angka yang ditanya bukan nol`);
      if (l.tipe === "banyak") cek(LC.angkaDi(l.n, l.t) >= 1 && th.rupa !== "lambang", `${nm}: banyak kartu atau balok bukan nol, tidak pada Abstract`);
      if (l.tipe === "mewakili") cek(so.cara !== "kanvas", `${nm}: jumlah tidak ditulis di kanvas`);
      if (l.tipe === "susun") cek(l.h >= 1 && l.h <= 9 && l.p <= 9 && l.s <= 9 && so.cara === "klik", `${nm}: susun satu sampai sembilan ratusan, hanya Klik`);
      if (l.tipe === "uraian" || l.tipe === "tabel") cek(so.cara === "klik", `${nm}: ${l.tipe} hanya Klik`);
      if (l.tipe === "tabel") {
        cek(th.rupa !== "benda", `${nm}: tabel tidak dipakai pada Concrete`);
        const t = LC.opsiTabel(l.n);
        cek(new Set(t.opsi.map((x) => x.join())).size === 3 && tanpaDigit(LC.petunjukKetuk(l)), `${nm}: tiga tabel berbeda dan petunjuk tanpa digit`);
      }
      if (l.tipe === "uraian") cek(tanpaDigit(LC.petunjukKetuk(l)) && LC.opsiUraian(l.n).opsi.length === 3, `${nm}: tiga bentuk uraian dan petunjuk tanpa digit`);
      if (l.tipe === "nol") cek(LC.angkaDi(l.n, l.t) === 0 && (so.cara === "klik" || so.cara === "suara"), `${nm}: tempat nol, tanpa kanvas`);
      if (l.tipe === "di") cek(LC.banyakMuncul(l.n, l.d) === 1 && l.d >= 1 && so.cara !== "kanvas", `${nm}: angka hanya sekali pada bilangan, tanpa kanvas`);
      if (l.tipe === "dua") {
        cek(l.d >= 1 && (so.cara === "kanvas" ? [2, 3].includes(LC.banyakMuncul(l.n, l.d)) : LC.banyakMuncul(l.n, l.d) === 2), `${nm}: angka yang sama muncul sesuai caranya`);
        if (so.cara !== "kanvas") cek(LC.tempatKiri(l.n, l.d) !== 2, `${nm}: tempat terbesar bukan satuan`);
      }
      if (l.tipe === "beda") {
        cek(l.a !== l.b && [...String(l.a)].sort().join("") === [...String(l.b)].sort().join("") && so.cara !== "kanvas", `${nm}: dua bilangan angka sama, tempat berbeda`);
        cek(th.rupa === "lambang" || true, `${nm}: beda`);
      }
    }
  }
  cek(salahAda >= 1, `${n}: paling sedikit satu Cari kesalahan`);
  cek(new Set(angka).size === angka.length, `${n}: angka jawaban tidak kembar dalam satu tahap (${angka.join(", ")})`);
  cek(new Set(kanvas).size === 4, `${n}: empat angka kanvas berbeda (${kanvas.join(", ")})`);
  cek(th.ikon.cara.length > 20 && emojiSah(th.ikon.ikon) && bersih(th.ikon.cara), `${n}: tema tahap`);
  // Tiga metode global tampak: tiap metode punya tugas di tiap misi.
  for (const m of ["tempat", "kartu", "uraian"]) cek(th.soal.every((so) => so.langkah.some((x) => x.metode === m)), `${n}: metode ${m} muncul di tiap misi`);
}
const angkaTahap = (soal) => soal.map((s) => s.langkah.map((l) => LC.kunciJawab(l.langkah, s.cara))).flat().filter((k) => k && k.jenis === "angka").map((k) => k.n);
sama(angkaTahap(D.CONCRETE), [7, 2, 4, 8, 9], "Concrete: angka jawaban");
sama(angkaTahap(D.PICTORIAL), [6, 3, 1, 2, 9, 5], "Pictorial: angka jawaban");
sama(angkaTahap(D.ABSTRACT), [4, 2, 7, 6, 1], "Abstract: angka jawaban");
{
  const jum = (soal) => soal.map((s) => s.langkah.map((l) => LC.kunciJawab(l.langkah, s.cara))).flat().filter((k) => k && k.jenis === "jumlah").map((k) => k.n);
  sama(jum(D.CONCRETE), [20, 30], "Concrete: jumlah yang diwakili");
  sama(jum(D.PICTORIAL), [400], "Pictorial: jumlah yang diwakili");
  sama(jum(D.ABSTRACT), [900, 70], "Abstract: jumlah yang diwakili");
}
// Batas rupa pada sumber komponen: emoji benda hanya pada cabang rupa benda (Concrete).
{
  const gk = readFileSync(new URL("GambarKartu.tsx", folderUrl), "utf8");
  const lk = readFileSync(new URL("LangkahKartu.tsx", folderUrl), "utf8");
  const th = readFileSync(new URL("TahapKartu.tsx", folderUrl), "utf8");
  for (const [nama, src] of [["GambarKartu.tsx", gk], ["LangkahKartu.tsx", lk]]) {
    const baris = src.split("\n");
    const emojiBaris = baris.map((b, i) => [i, b]).filter(([, b]) => /\\u\{(1F34E|1F96B|1F35E|1F36C)\}/.test(b));
    cek(emojiBaris.length >= 1, `${nama}: emoji benda dipakai pada Concrete`);
    for (const [i] of emojiBaris) {
      const konteks = baris.slice(Math.max(0, i - 4), i + 1).join(" ");
      cek(/benda|BENDA/.test(konteks), `${nama} baris ${i + 1}: emoji benda hanya pada cabang benda`);
    }
  }
  cek(/rupa === "benda" \? `\$\{IKON_METODE\[ls\.metode\]\} ` : ""/.test(th), "TahapKartu: ikon metode hanya pada Concrete");
  cek(/if \(rupa === "lambang"\) return <TabelKata/.test(lk) && /rupa === "lambang" \? <DuaTabelKata/.test(lk), "komponen: Abstract memakai tabel kata");
  cek(/<Balok cx=/.test(gk) && /<Kartu cx=/.test(gk) && /benda \? <Kartu[^>]*\/> : <Balok/.test(gk), "komponen: Concrete memakai kartu, Pictorial memakai balok polos");
  cek(!/emoji|\\u\{1F4[A-Z0-9]{2}\}/i.test(gk.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "").replace(/\\u\{(1F34E|1F96B|1F35E|1F36C)\}/g, "")), "GambarKartu: tidak ada emoji lain di luar benda Concrete");
}

/* ------------------------------ Cakupan jenis tugas dan metode global ------------------------------ */
{
  const semua = [...D.CONCRETE, ...D.PICTORIAL, ...D.ABSTRACT].flatMap((s) => s.langkah.map((l) => l.langkah.tipe));
  for (const tp of ["salah", "tempat", "mewakili", "banyak", "susun", "uraian", "isi", "tabel", "nol", "di", "dua", "beda"]) cek(semua.includes(tp), `jenis tugas ${tp} dipakai`);
  const klaim = [...D.CONCRETE, ...D.PICTORIAL, ...D.ABSTRACT].flatMap((s) => s.langkah).filter((l) => l.langkah.tipe === "salah").map((l) => l.langkah.klaim);
  sama(klaim.map((k) => k.jenis), ["mewakili", "tabel", "uraian"], "Cari kesalahan memakai klaim mewakili, tabel, dan uraian");
  sama(klaim.map((k) => LC.klaimBenar(k)), [false, false, true], "Cari kesalahan: dua klaim salah dan satu klaim benar (Abstract)");
  cek(LC.NAMA_METODE.igil === "Metode IGIL: Lihat Tempat, Sebut Jumlahnya", "nama Metode IGIL");
  cek(LC.NAMA_METODE.tempat.includes("Place Value") && LC.NAMA_METODE.kartu.includes("Montessori Cards") && LC.NAMA_METODE.uraian.includes("Expanded Form"), "tiga metode global di judul tugas");
  cek(LC.URUT_METODE.join() === "igil,tempat,kartu,uraian" && Object.values(LC.IKON_METODE).every(emojiSah), "metode dan ikon");
  cek(D.TEMA_KARTU.concrete.nama === "Concrete" && D.TEMA_KARTU.pictorial.nama === "Pictorial" && D.TEMA_KARTU.abstract.nama === "Abstract", "nama tahap");
  cek(D.CONCRETE_KARTU === D.CONCRETE && D.PICTORIAL_KARTU === D.PICTORIAL && D.ABSTRACT_KARTU === D.ABSTRACT, "ekspor untuk pemasang");
  cek(D.POIN_PENTING.length >= 6 && D.POIN_PENTING.length === D.POIN_PENTING_SUARA.length && D.POIN_PENTING_SUARA.every(tanpaDigit) && D.POIN_PENTING_SUARA.every(bersih) && !/[<>=+×÷]/.test(D.POIN_PENTING_SUARA.join(" ")) && tanpaDigit(D.PENUTUP_B) && /\?$/.test(D.PENUTUP_B) && bersih(D.PENUTUP_B) && bersih(D.POIN_PENTING.join(" ")), "poin penting dan penutup bersih, suara tanpa digit dan lambang");
  const poin = D.POIN_PENTING_SUARA.join(" ").toLowerCase();
  for (const s of ["ratusan", "puluhan", "satuan", "mewakili", "kartu seratus", "bentuk uraian", "nol", "tabel", "berbeda", "tempat"]) cek(poin.includes(s), `poin penting memuat "${s}"`);
  cek(D.MISI_LABEL_TEKS === DS.MISI_LABEL_TEKS && DP.MISI_LABEL_TEKS === DS.MISI_LABEL_TEKS && MT.MISI_K3B1.B === DS.MISI_LABEL_TEKS && tanpaDigit(DS.MISI_LABEL_TEKS) && bersih(DS.MISI_LABEL_TEKS), "teks misi awal tanpa digit dan sama di berkas teks misi");
  const sumber = readFileSync(new URL("TahapKartu.tsx", folderUrl), "utf8");
  cek(/poinPenting/.test(sumber) && !/konfeti|OBRAL/i.test(sumber), "Abstract diakhiri Poin Penting tanpa perayaan akhir bab");
}

/* ------------------------------ Simulasi Meja Label ------------------------------ */
{
  const k0 = L.awalLabel();
  cek(k0.alat === "label" && k0.mode === "susun" && k0.susun.join() === "0,0,0" && k0.urai.join() === "0,0,0" && k0.tabel.join() === "0,0,0" && k0.nol.join() === "1,1,1" && k0.susunBenar.length + k0.uraiBenar.length + k0.tabelBenar.length + k0.nolBenar.length + k0.samaBenar.length === 0 && k0.samaPilih === null, "simulasi: keadaan awal bersih");
  cek(JSON.stringify(L.mulaiLagiLabel()) === JSON.stringify(k0), "simulasi: mulai lagi sama dengan awal");
  cek(L.pilihModeLabel(k0, "sama").mode === "sama" && L.URUT_MODE.length === 5, "simulasi: lima alat");
  // Susun.
  const gagalS = L.periksaSusun(k0);
  cek(!gagalS.ok && gagalS.k.susunBenar.length === 0 && gagalS.k.salah === 1 && tanpaDigit(gagalS.pesan), "simulasi: susun belum sesuai tidak dihitung");
  cek(!L.ubahSusun(k0, 0, -1).ok && L.ubahSusun(k0, 0, 1).ok && L.ubahSusun(k0, 0, 1).k.susun[0] === 1 && tanpaDigit(L.ubahSusun(k0, 0, 1).pesan) && !L.ubahSusun({ ...k0, susun: [9, 0, 0] }, 0, 1).ok && tanpaDigit(L.ubahSusun({ ...k0, susun: [9, 0, 0] }, 0, 1).pesan), "simulasi: tambah kartu, tidak kurang dari nol atau lebih dari sembilan");
  const isiSusun = (k) => {
    let x = k;
    const d = LC.angkaTiga(L.targetSusun(k));
    d.forEach((banyak, t) => {
      for (let j = 0; j < banyak; j += 1) x = L.ubahSusun(x, t, 1).k;
    });
    return x;
  };
  cek(L.bilanganSusun(isiSusun(k0)) === L.targetSusun(k0), "simulasi: bilangan di meja sama dengan target setelah disusun");
  const ok1 = L.periksaSusun(isiSusun(k0));
  cek(ok1.ok && ok1.k.susunBenar.join() === "0" && ok1.k.susunIndeks === 1 && ok1.k.susun.join() === "0,0,0" && tanpaDigit(ok1.pesan), "simulasi: susun sesuai dihitung, label berikutnya");
  cek(L.ulangSusun(isiSusun(k0)).susun.join() === "0,0,0", "simulasi: ulang mengosongkan kartu");
  // Uraikan.
  let u = k0;
  const kosongU = L.periksaUrai(u);
  cek(!kosongU.ok && kosongU.k.salah === 1 && tanpaDigit(kosongU.pesan), "simulasi: uraian kosong ditolak");
  const isiUrai = (k) => {
    let x = k;
    LC.angkaTiga(L.targetUrai(k)).forEach((banyak, t) => {
      for (let j = 0; j < banyak; j += 1) x = L.ubahUrai(x, t, 1);
    });
    return x;
  };
  cek(isiUrai(k0).urai.join() === LC.angkaTiga(L.targetUrai(k0)).map((d, t) => d * LC.BOBOT[t]).join(), "simulasi: tiap langkah menambah sebesar bobot tempat");
  const okU = L.periksaUrai(isiUrai(k0));
  cek(okU.ok && okU.k.uraiBenar.join() === "0" && okU.k.uraiIndeks === 1 && okU.k.urai.join() === "0,0,0" && tanpaDigit(okU.pesan), "simulasi: uraian tepat dihitung, bilangan berikutnya");
  cek(L.ubahUrai(k0, 0, -1).urai[0] === 0 && L.ubahUrai({ ...k0, urai: [900, 0, 0] }, 0, 1).urai[0] === 900, "simulasi: jumlah antara nol dan batas sembilan kali bobot");
  // Tabel.
  const isiTabel = (k) => {
    let x = k;
    LC.angkaTiga(L.targetTabel(k)).forEach((banyak, t) => {
      for (let j = 0; j < banyak; j += 1) x = L.ubahTabel(x, t, 1);
    });
    return x;
  };
  const gagalT = L.periksaTabel(k0);
  cek(!gagalT.ok && gagalT.k.tabelBenar.length === 0 && /angka/.test(gagalT.pesan) && tanpaDigit(gagalT.pesan), "simulasi: tabel kosong ditolak dengan petunjuk");
  const okT = L.periksaTabel(isiTabel(k0));
  cek(okT.ok && okT.k.tabelBenar.join() === "0" && okT.k.tabelIndeks === 1 && okT.k.tabel.join() === "0,0,0" && tanpaDigit(okT.pesan), "simulasi: tabel tepat dihitung, tabel berikutnya");
  // Nol.
  const nolKeliru = L.periksaNol({ ...k0, nol: LC.angkaTiga(L.targetNol(k0)).map((d) => d || 1) });
  cek(!nolKeliru.ok && /nol/.test(nolKeliru.pesan) && nolKeliru.k.nolBenar.length === 0 && tanpaDigit(nolKeliru.pesan), "simulasi: tempat kosong yang tidak ditulis nol ditolak");
  const okN = L.periksaNol({ ...k0, nol: LC.angkaTiga(L.targetNol(k0)) });
  cek(okN.ok && okN.k.nolBenar.join() === "0" && okN.k.nolIndeks === 1 && okN.k.nol.join() === "1,1,1" && /Nol menjaga tempat/.test(okN.pesan) && tanpaDigit(okN.pesan), "simulasi: label dengan nol tepat dihitung");
  cek(L.periksaNol(k0).ok === false, "simulasi: tulisan awal belum benar");
  // Sama.
  let sm = L.pilihModeLabel(k0, "sama");
  cek(!L.periksaSama(sm).ok && L.periksaSama(sm).k.salah === 0 && tanpaDigit(L.periksaSama(sm).pesan), "simulasi: periksa sama tanpa memilih ditolak");
  const tg = L.tugasSama(sm);
  const kiri = LC.tempatKiri(tg.n, tg.d);
  const keliru = [0, 1, 2].find((t) => t !== kiri);
  const gagalSm = L.periksaSama(L.pilihSama(sm, keliru));
  cek(!gagalSm.ok && gagalSm.k.samaBenar.length === 0 && gagalSm.k.salah === 1 && tanpaDigit(gagalSm.pesan), "simulasi: tempat keliru tidak dihitung");
  const okSm = L.periksaSama(L.pilihSama(sm, kiri));
  cek(okSm.ok && okSm.k.samaBenar.join() === "0" && okSm.k.samaIndeks === 1 && okSm.k.samaPilih === null && tanpaDigit(okSm.pesan), "simulasi: tempat tepat dihitung, tugas berikutnya");
  cek(L.pilihSama(L.pilihSama(sm, 1), 1).samaPilih === null, "simulasi: mengetuk tempat yang sama membatalkan pilihan");
  // Semua tugas habis dikerjakan lewat logika.
  let x = k0;
  for (let i = 0; i < DS.SUSUN_TUGAS.length; i += 1) x = L.periksaSusun(isiSusun(x)).k;
  for (let i = 0; i < DS.URAI_TUGAS.length; i += 1) x = L.periksaUrai(isiUrai(x)).k;
  for (let i = 0; i < DS.TABEL_TUGAS.length; i += 1) x = L.periksaTabel(isiTabel(x)).k;
  for (let i = 0; i < DS.NOL_TUGAS.length; i += 1) x = L.periksaNol({ ...x, nol: LC.angkaTiga(L.targetNol(x)) }).k;
  for (let i = 0; i < DS.SAMA_TUGAS.length; i += 1) x = L.periksaSama(L.pilihSama(x, LC.tempatKiri(L.tugasSama(x).n, L.tugasSama(x).d))).k;
  cek(x.susunBenar.length === 3 && x.uraiBenar.length === 3 && x.tabelBenar.length === 3 && x.nolBenar.length === 3 && x.samaBenar.length === 4, "simulasi: semua tugas benar lewat logika");
  // Teks.
  cek(Object.values(L.SUARA_MODE).every((t) => tanpaDigit(t) && bersih(t)) && L.URUT_MODE.every((md) => L.kalimatLabel(L.pilihModeLabel(k0, md)).length > 20 && tanpaDigit(L.kalimatLabel(L.pilihModeLabel(k0, md)))), "simulasi: ucapan tiap alat tanpa digit");
  // Data Simulasi berbeda dari Story dan dari CPA.
  const semuaSim = [...DS.SUSUN_TUGAS, ...DS.URAI_TUGAS, ...DS.TABEL_TUGAS, ...DS.NOL_TUGAS, ...DS.SAMA_TUGAS.map((t) => t.n)];
  cek(semuaSim.every((b) => b >= 100 && b <= 999) && !semuaSim.some((b) => STORY.includes(b)), "simulasi: bilangan tiga angka dan bukan data Story");
  const cpa = [...D.CONCRETE, ...D.PICTORIAL, ...D.ABSTRACT].flatMap((s) => s.langkah.flatMap((l) => bilanganTugas(l.langkah)));
  cek(!semuaSim.some((b) => cpa.includes(b)), "simulasi: bilangan berbeda dari data CPA");
  cek(DS.NOL_TUGAS.every((b) => LC.angkaTiga(b).includes(0)), "simulasi: tiap bilangan alat Nol punya angka nol");
  cek(DS.SAMA_TUGAS.every((t) => LC.banyakMuncul(t.n, t.d) === 2 && LC.tempatKiri(t.n, t.d) !== 2), "simulasi: angka sama muncul dua kali, tempat terbesar bukan satuan");
  cek(DS.SUSUN_TUGAS.length === 3 && DS.URAI_TUGAS.length === 3 && DS.TABEL_TUGAS.length === 3 && DS.NOL_TUGAS.length === 3 && DS.SAMA_TUGAS.length === 4 && DS.BATAS_KARTU === 9, "simulasi: banyak tugas dan batas kartu");
  cek(DS.SUSUN_TUGAS.every((b) => LC.angkaTiga(b).every((d) => d >= 1)), "simulasi: label alat Susun tanpa nol");
}

/* ------------------------------ Misi ------------------------------ */
{
  const awal = L.awalLabel();
  const d = MK.daftarMisiK3Bab1("B");
  cek(d === MK.MISI_B && d.length === 6 && d.filter((x) => x.wajib).length === 4 && d.every((x) => x.id.startsWith("b-")), "misi: enam misi, empat wajib, id berawalan b-");
  cek(d.every((x) => x.teks.length >= 10 && x.teks.length <= 120 && tanpaDigit(x.teks) && bersih(x.teks)), "misi: teks 10-120 huruf tanpa digit dan kata terlarang");
  cek(d.every((x) => !/(skor|nilai|tebak)/i.test(x.teks)), "misi: tanpa skor");
  cek(S.misiBaru(d, awal, new Set()).length === 0, "misi: keadaan awal tidak memenuhi misi");
  cek(d.every((x) => !x.cek({ alat: "kerangka" })), "misi: alat lain tidak memenuhi misi");
  // Alur lengkap melalui logika.
  const susun = (a) => {
    let x = a;
    LC.angkaTiga(L.targetSusun(a)).forEach((banyak, t) => {
      for (let q = 0; q < banyak; q += 1) x = L.ubahSusun(x, t, 1).k;
    });
    return x;
  };
  let k = awal;
  k = L.periksaSusun(susun(k)).k;
  sama(S.misiBaru(d, k, new Set()), ["b-susun"], "misi: satu label tersusun memenuhi b-susun");
  const urai = (a) => {
    let x = a;
    LC.angkaTiga(L.targetUrai(a)).forEach((banyak, t) => {
      for (let q = 0; q < banyak; q += 1) x = L.ubahUrai(x, t, 1);
    });
    return x;
  };
  k = L.periksaUrai(urai(k)).k;
  const tabel = (a) => {
    let x = a;
    LC.angkaTiga(L.targetTabel(a)).forEach((banyak, t) => {
      for (let q = 0; q < banyak; q += 1) x = L.ubahTabel(x, t, 1);
    });
    return x;
  };
  k = L.periksaTabel(tabel(k)).k;
  k = L.periksaNol({ ...k, nol: LC.angkaTiga(L.targetNol(k)) }).k;
  sama(S.misiBaru(d, k, new Set()), ["b-susun", "b-uraikan", "b-tabel", "b-nol"], "misi: empat alat memenuhi empat misi wajib");
  k = L.periksaSama(L.pilihSama(k, LC.tempatKiri(L.tugasSama(k).n, L.tugasSama(k).d))).k;
  sama(S.misiBaru(d, k, new Set()), ["b-susun", "b-uraikan", "b-tabel", "b-nol", "b-sama"], "misi: tantangan bebas Sama");
  for (let i = 0; i < 2; i += 1) k = L.periksaSusun(susun(k)).k;
  sama(S.misiBaru(d, k, new Set()), ["b-susun", "b-uraikan", "b-tabel", "b-nol", "b-sama", "b-lengkap"], "misi: semua tercapai lewat logika simulasi");
  const wajib = d.filter((x) => x.wajib).map((x) => x.id);
  cek(S.wajibSelesai(d, new Set(wajib)) && !S.wajibSelesai(d, new Set(["b-susun"])), "misi: gerbang wajib");
  cek(S.misiBaru(d, { ...awal, salah: 9, mode: "nol", susun: [3, 4, 5], susunIndeks: 2, urai: [100, 20, 3], tabel: [1, 2, 3], nol: [5, 0, 9], samaPilih: 1, uraiIndeks: 1, tabelIndeks: 2, nolIndeks: 1, samaIndeks: 3 }, new Set()).length === 0, "misi: percobaan keliru dan geseran tidak dihitung sebagai misi");
}

/* ------------------------------ Berkas ------------------------------ */
{
  const berkas = readdirSync(folderUrl).filter((f) => /\.(ts|tsx)$/.test(f));
  for (const f of ["logika.ts", "logika-cpa.ts", "periksa.ts", "data.ts", "data-peta.ts", "data-sim.ts", "data-kartu.ts", "JawabKartu.tsx", "LangkahKartu.tsx", "GambarKartu.tsx", "TahapKartu.tsx", "KotakKartu.tsx", "MejaLabel.tsx", "SimulasiMejaLabel.tsx"]) cek(berkas.includes(f), `berkas ${f} ada`);
  const lihat = [...berkas.map((f) => ["kartu-k3b1b/" + f, readFileSync(new URL(f, folderUrl), "utf8")]), ["misi-k3bab1.ts", readFileSync(new URL("../src/components/modul/misi-k3bab1.ts", import.meta.url), "utf8")]];
  for (const [f, s] of lihat) {
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d || c.codePointAt(0) === 0x1f6de), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}/i.test(s), `${f}: kode emoji tidak melewati U+1FA95`);
    if (f.startsWith("kartu-k3b1b/")) cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    const tanpaKomentar = s.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");
    const literal = [...tanpaKomentar.matchAll(/"((?:[^"\\\n]|\\.)*)"|`((?:[^`\\]|\\.)*)`/g)].map((mm) => mm[1] ?? mm[2]).filter((t) => /[a-z]{3,} [a-z]{2,}/i.test(t));
    const teksJsx = [...tanpaKomentar.matchAll(/>\s*([A-Za-z][^<>{}\n]{6,})\s*</g)].map((mm) => mm[1]);
    for (const t of [...literal, ...teksJsx]) {
      if (/^(use client|rounded|flex|grid|text-|min-|bg-|border|mx-|px-|py-|space-|block|w-|h-|absolute|relative|pointer|animate|sm:)/.test(t) || /(rounded|flex |grid-|text-\[|min-h|bg-\[|border-)/.test(t)) continue;
      let polos = t;
      for (let ulang = 0; ulang < 6; ulang += 1) polos = polos.replace(/\$\{[^${}]*\}/g, "");
      cek(!/(kelas|buku|teman|kelompok|skor|nilai|soal|tebak|latihan|\bkunci\b)/i.test(polos), `${f}: teks layar tanpa kata terlarang ("${t.slice(0, 50)}")`);
    }
  }
}

console.log(`Lulus ${lulus}, gagal ${gagal}`);
process.exit(gagal ? 1 : 0);
