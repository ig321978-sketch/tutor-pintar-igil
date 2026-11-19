// Uji Mind-map (Rak Mi), Infografis (Catatan Sisa), Simulasi Rak Sisa, dan tahap Concrete, Pictorial, Abstract Kelas 3 Bab 1 Sub-Bab E ("Sisa Stok Pak Anto"),
// pengurangan sampai seratus.
// Memeriksa: sembilan kartu geser (label pendek, semua metode Story termasuk tiga metode global dengan nama Indonesia), catatan sisa dari data Story, CPA dua belas tugas per tahap
// (Klik, Kanvas, Suara x empat metode) dengan jawaban beragam (hasil, cerita, satuan, puluhan, puluhan setelah meminjam, satuan setelah meminjam, pinjam atau tanpa, hitung naik, tempat,
// operasi pemeriksa, penjumlahan pemeriksa, urutan langkah, satu angka, satu kata) dan Cari kesalahan di tiap tahap, kunci dihitung dari dua bilangan, angka jawaban tidak kembar per tahap,
// tugas yang langsung siap (jebakan tombol Periksa macet), instruksi tanpa digit, petunjuk salah, pengenal ucapan, batas rupa, logika Simulasi Rak Sisa, emoji, kata terlarang, akhir baris.
// Jalankan: node --no-warnings scripts/uji-kurang-k3b1e.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const DP = await import("../src/components/modul/kurang-k3b1e/data-peta.ts");
const DK = await import("../src/components/modul/kurang-k3b1e/data-kartu.ts");
const LC = await import("../src/components/modul/kurang-k3b1e/logika-cpa.ts");
const D = await import("../src/components/modul/kurang-k3b1e/data.ts");
const DS = await import("../src/components/modul/kurang-k3b1e/data-sim.ts");
const K = await import("../src/components/modul/kurang-k3b1e/periksa.ts");
const L = await import("../src/components/modul/kurang-k3b1e/logika.ts");
const MK = await import("../src/components/modul/misi-k3bab1.ts");
const MT = await import("../src/components/modul/misi-teks-k3b1.ts");
const S = await import("../src/components/modul/misi-simulasi.ts");
const folderUrl = new URL("../src/components/modul/kurang-k3b1e/", import.meta.url);

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
const bersih = (t) => !TERLARANG.test(t) && !/buku|kelompok|bernilai|tebak|nilai tempat|dinilai|teman/i.test(t);
const emojiSah = (s) => [...s].every((c) => c.codePointAt(0) <= 0x1fa95 && c.codePointAt(0) !== 0x200d && c.codePointAt(0) !== 0x1f6de);
const ADA_EMOJI = /[\u{1F000}-\u{1FFFF}\u{2600}-\u{27BF}]/u;

/* ------------------------------ Mind-map: rak mi (sembilan kartu geser) ------------------------------ */
{
  const KP = DK.KARTU_KURANG;
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
  for (const m of ["Pengurangan Bersusun", "Menghitung Naik", "Pinjam Puluhan", "susun ke bawah", "uraikan puluhan dan satuan", "tambahkan kembali", "kurangi bilangan sama", "tulis kalimat kurang"]) cek(cara.includes(m.toLowerCase()), `kartu: cara memuat ${m}`);
  const gab = KP.map((k) => [k.judul, k.masalah.label, k.cara.label, k.hasil.label, k.masalah.arti, k.cara.arti, k.hasil.arti].join(" ")).join(" ").toLowerCase();
  for (const s of ["sisa", "susun pendek", "puluhan lurus", "satuan", "sepuluh satuan", "susun panjang", "selisih", "bilangan awal", "nol", "sisa atau selisih", "satuannya"]) cek(gab.includes(s), `kartu: memuat poin "${s}"`);
  cek(!new RegExp("\\b(raka|salsa|bima|pak joko|pak anto|bu mirna|toko|kaleng|kardus|bungkus|stok|rak mi)\\b", "i").test(gab), "kartu: hanya poin pelajaran (tanpa tokoh dan benda cerita)");
  cek(tanpaDigit(DK.SUARA_KARTU_KURANG + DK.SELESAI_KARTU_KURANG) && bersih(DK.SUARA_KARTU_KURANG + DK.SELESAI_KARTU_KURANG), "kartu: suara dan pesan selesai tanpa digit dan kata terlarang");
  cek(emojiSah(DK.TEMA_KARTU_KURANG.ikon) && DK.TEMA_KARTU_KURANG.judul.length > 5, "kartu: tema sah");
  const RG = DK.RINGKASAN_KURANG;
  cek(RG.ikon.length === DK.KARTU_KURANG.length && new Set(RG.ikon).size === RG.ikon.length && [...RG.ikon, RG.pusat].every((e) => emojiSah(e) && !/[A-Za-z0-9]/.test(e)), "peta radial: satu gambar unik per kartu, gambar sah tanpa huruf");
  cek(tanpaDigit(RG.suara) && bersih(RG.suara) && !RG.ikon.includes(RG.pusat), "peta radial: suara bersih dan pusat berbeda dari cabang");
}

/* ------------------------------ Infografis: catatan sisa (lima kejadian dari Story) ------------------------------ */
{
  const B = DK.BARIS_INFO_KURANG;
  cek(B.length === 5 && DK.KOLOM_INFO_KURANG.length === 3, "infografis: lima baris dan tiga kolom");
  cek(B.every((b) => b.isi.length === 3 && emojiSah(b.ikon) && b.nama.length > 2 && tanpaDigit(b.nama)), "infografis: tiap baris tiga isian, nama tanpa digit, emoji sah");
  const jumlahContoh = B.map((b) => b.contoh.length);
  cek(jumlahContoh[0] === 3 && jumlahContoh.slice(1).every((n) => n === 0), "infografis: baris satu penuh contoh, baris dua sampai lima mandiri");
  const semua = B.flatMap((b) => b.isi);
  cek(B.every((b) => new Set(b.isi.map((x) => x.t)).size === 3), "infografis: tiga label tiap baris berbeda");
  cek(semua.every((x) => x.t.length <= 26 && x.t.split(/\s+/).length <= 3 && bersih(x.t) && bersih(x.s ?? "")), "infografis: label pendek (paling banyak tiga kata) dan tanpa kata terlarang");
  cek(semua.every((x) => tanpaDigit(x.s ?? x.t)), "infografis: ucapan label tanpa digit");
  cek(B.every((b) => [0, 1].every((c) => /^\d{1,2}$/.test(b.isi[c].t) && b.isi[c].s === LC.kata(Number(b.isi[c].t)))), "infografis: bilangan dan ucapannya sesuai");
  // Data Story: 68-35=33, 71-28=43, 90-54=36, 24-24=0, 82-76=6.
  sama(B.map((b) => Number(b.isi[0].t)), [35, 28, 54, 24, 76], "infografis: bilangan yang dikurangkan sesuai Story");
  sama(B.map((b) => Number(b.isi[1].t)), [33, 43, 36, 0, 6], "infografis: sisa sesuai Story");
  sama(B.map((b) => Number(b.isi[0].t) + Number(b.isi[1].t)), [68, 71, 90, 24, 82], "infografis: sisa ditambah yang dikurangkan kembali ke bilangan awal");
  sama(B.map((b) => b.isi[2].t), ["Pengurangan bersusun", "Pinjam puluhan", "Pinjam puluhan", "Bilangan sama", "Menghitung naik"], "infografis: cara tiap baris");
  cek(tanpaDigit(DK.SUARA_INFO_KURANG + DK.SELESAI_INFO_KURANG) && bersih(DK.SUARA_INFO_KURANG + DK.SELESAI_INFO_KURANG) && emojiSah(DK.TEMA_INFO_KURANG.ikon), "infografis: suara dan tema bersih");
}

/* ------------------------------ Pengenal ucapan ------------------------------ */
{
  const c = (t, k) => K.cocokUcapan(t, k).cocok;
  cek(c("satuan", { jenis: "nama", nama: "satuan" }) && c("puluhan", { jenis: "nama", nama: "puluhan" }) && !c("satuan atau puluhan", { jenis: "nama", nama: "satuan" }) && !c("puluhan", { jenis: "nama", nama: "satuan" }), "ucapan: satuan dan puluhan");
  cek(c("pinjam", { jenis: "nama", nama: "pinjam" }) && c("pinjam puluhan", { jenis: "nama", nama: "pinjam" }) && c("meminjam", { jenis: "nama", nama: "pinjam" }) && !c("tanpa", { jenis: "nama", nama: "pinjam" }), "ucapan: pinjam");
  cek(c("tanpa", { jenis: "nama", nama: "tanpa" }) && c("tanpa pinjam", { jenis: "nama", nama: "tanpa" }) && c("tidak pinjam", { jenis: "nama", nama: "tanpa" }) && !c("tanpa pinjam", { jenis: "nama", nama: "pinjam" }) && !c("pinjam", { jenis: "nama", nama: "tanpa" }), "ucapan: tanpa pinjam");
  cek(c("tambah", { jenis: "nama", nama: "tambah" }) && c("ditambah", { jenis: "nama", nama: "tambah" }) && c("kurang", { jenis: "nama", nama: "kurang" }) && !c("tambah", { jenis: "nama", nama: "kurang" }) && !c("tambah atau kurang", { jenis: "nama", nama: "tambah" }), "ucapan: tambah dan kurang");
  sama(K.angkaDariUcapan("angka tujuh"), [7], "ucapan: tujuh");
  sama(K.angkaDariUcapan("dua belas"), [12], "ucapan: dua belas");
  sama(K.angkaDariUcapan("tiga puluh enam"), [36], "ucapan: tiga puluh enam");
  sama(K.angkaDariUcapan("5 dan 9"), [5, 9], "ucapan: angka");
  cek(c("enam", { jenis: "angka", n: 6 }) && c("eh enam deh", { jenis: "angka", n: 6 }) && !c("tujuh", { jenis: "angka", n: 6 }) && c("nol", { jenis: "angka", n: 0 }), "ucapan: bilangan dan nol");
  cek(K.LEBAR_ADEGAN === 300 && K.TINGGI_ADEGAN === 200, "adegan 300 x 200");
}

/* ------------------------------ Hitungan dua bilangan ------------------------------ */
{
  sama([0, 7, 10, 11, 15, 20, 38, 100].map(LC.kata), ["nol", "tujuh", "sepuluh", "sebelas", "lima belas", "dua puluh", "tiga puluh delapan", "seratus"], "kata bilangan");
  cek(LC.puluh(71) === 7 && LC.sat(71) === 1 && LC.hasilKurang(71, 28) === 43 && LC.perluPinjam(71, 28) && !LC.perluPinjam(68, 35), "puluh, satuan, hasil, dan perlu pinjam");
  cek(LC.hasilBalik(71, 28) === 57 && LC.hasilLupa(62, 38) === 34, "kesalahan umum: membalik satuan dan lupa menurunkan puluhan");
  cek(LC.naikSatuan1(82, 76) === 4 && LC.naikSatuan2(82, 76) === 2 && LC.naikPuluh(95, 19) === 7 && LC.naikSatuan1(95, 19) === 1, "hitung naik: satuan pertama, puluhan, satuan terakhir");
  for (const [a, b] of [[91, 79], [95, 19], [93, 77], [84, 67], [89, 12]]) if (LC.sat(b) !== 0) cek(LC.naikSatuan1(a, b) + LC.naikPuluh(a, b) * 10 + LC.naikSatuan2(a, b) === a - b, `hitung naik ${b} ke ${a}: langkah-langkah berjumlah selisih`);
  cek(LC.klaimBenar({ jenis: "benar", a: 84, b: 58, hasil: 26 }) && !LC.klaimBenar({ jenis: "balik", a: 64, b: 38, hasil: 34 }), "klaim benar dan salah");
  for (const n of [4, 6, 9, 0]) cek(LC.pilihanAngka(n).length === 4 && LC.pilihanAngka(n).includes(n) && LC.pilihanAngka(n).every((x) => x >= 0 && x <= 9), `pilihan angka satu angka memuat ${n}`);
  for (const n of [14, 26, 42, 78, 12]) cek(LC.pilihanAngka(n).length === 4 && LC.pilihanAngka(n).includes(n) && new Set(LC.pilihanAngka(n)).size === 4 && LC.pilihanAngka(n).every((x) => x >= 10 && x <= 99), `pilihan angka dua angka memuat ${n}`);
  {
    const p = LC.pilihanAngkaTugas({ tipe: "hasil", a: 71, b: 28 }, 43);
    cek(p.length === 4 && p.includes(43) && p.includes(57) && p.includes(53), "pilihan hasil memuat pengecoh membalik satuan dan lupa pinjam");
    const q = LC.pilihanAngkaTugas({ tipe: "satuanjadi", a: 75, b: 38 }, 15);
    cek(q.length === 4 && q.includes(15) && q.includes(5) && q.every((x) => x >= 1 && x <= 19), "pilihan satuan jadi memuat pengecoh lupa menambah sepuluh");
  }
  for (const n of [4]) {
    const a = LC.acakTetap(n, [0, 1, 2, 3]);
    cek([...a].sort().join() === "0,1,2,3" && a.join() !== "0,1,2,3", `acak tetap ${n} kartu bukan urutan benar`);
  }
  cek(LC.LANGKAH_URUT.susun.length === 4 && LC.LANGKAH_URUT.pinjam.length === 4 && LC.urutanBenar().join() === "0,1,2,3", "urutan langkah");
}

/* ------------------------------ Tiga tahap CPA ------------------------------ */
const TAHAP = [
  { nama: "Concrete", soal: D.CONCRETE, rupa: "benda", nomor: [2, 3, 4], ikon: D.TEMA_KURANG.concrete },
  { nama: "Pictorial", soal: D.PICTORIAL, rupa: "diagram", nomor: [5, 6, 7], ikon: D.TEMA_KURANG.pictorial },
  { nama: "Abstract", soal: D.ABSTRACT, rupa: "lambang", nomor: [8, 9, 10], ikon: D.TEMA_KURANG.abstract },
];
const STORY = ["68-35", "71-28", "90-54", "24-24", "82-76", "89-53", "62-38"];
const pasangDari = (l) => (l.klaim ? [l.klaim.a, l.klaim.b] : l.a !== undefined ? [l.a, l.b] : null);
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
    sama(so.langkah.map((l) => l.metode), ["igil", "susun", "naik", "pinjam"], `${n}/${so.nomor}: urutan metode`);
    cek(bersih(so.judul + so.cerita) && tanpaDigit(so.cerita) && /^Misi Rak Sisa \d+:/.test(so.judul) && so.cerita.length > 20, `${n}/${so.nomor}: judul dan cerita bersih`);
    cek(emojiSah(so.judul + so.cerita) && !ADA_EMOJI.test(so.judul + so.cerita), `${n}/${so.nomor}: judul dan cerita tanpa emoji`);
    for (const ls of so.langkah) {
      const l = ls.langkah;
      const nm = `${n}/${so.nomor}/${ls.metode}`;
      cek(ls.judul === ls.suara && ls.judul === LC.instruksi(l, th.rupa, so.cara), `${nm}: judul dan suara sama dengan instruksi`);
      cek(tanpaDigit(ls.suara) && bersih(ls.suara) && ls.suara.length > 20, `${nm}: instruksi tanpa digit dan kata terlarang`);
      cek(/(Pilih|Tulis|Ucapkan|Ketuk|Susun)/.test(ls.suara), `${nm}: instruksi memuat perintah`);
      const kunci = LC.kunciJawab(l, so.cara);
      cek(LC.siapLangsung(l, th.rupa, so.cara) === (so.cara !== "klik" || kunci !== null), `${nm}: tugas langsung siap sesuai caranya (tombol tidak macet pada rupa ${th.rupa})`);
      for (const r of ["benda", "diagram", "lambang"]) cek(LC.siapLangsung(l, r, so.cara) === LC.siapLangsung(l, th.rupa, so.cara), `${nm}: siap langsung tidak bergantung rupa (${r})`);
      cek(tanpaDigit(LC.kalimatKunci(l, so.cara, th.rupa)) && bersih(LC.kalimatKunci(l, so.cara, th.rupa)) && LC.kalimatKunci(l, so.cara, th.rupa).length > 10, `${nm}: kalimat kunci tanpa digit`);
      cek(tanpaDigit(LC.kalimatTanya(l, so.cara)), `${nm}: kalimat tanya tanpa digit`);
      // Pasangan bilangan: sah dan beda dari Story (hasil nol dengan bilangan lain boleh).
      const ps = pasangDari(l);
      if (ps) {
        cek(Number.isInteger(ps[0]) && Number.isInteger(ps[1]) && ps[0] >= ps[1] && ps[0] <= 99 && ps[1] >= 1, `${nm}: bilangan sah (sampai sembilan puluh sembilan, yang dikurangkan tidak lebih besar)`);
        cek(!STORY.includes(`${ps[0]}-${ps[1]}`), `${nm}: pasangan bilangan berbeda dari Story`);
      }
      if (so.cara === "kanvas") {
        cek(kunci?.jenis === "angka" && kunci.n >= 1 && kunci.n <= 9 && Number.isInteger(kunci.n), `${nm}: Tulis di kanvas satu angka satu sampai sembilan`);
        if (kunci?.jenis === "angka") kanvas.push(kunci.n);
      }
      if (so.cara === "suara") cek(kunci !== null, `${nm}: Rekam suara punya kunci`);
      if (so.cara === "suara" && kunci?.jenis === "angka") cek(kunci.n >= 0 && kunci.n <= 9, `${nm}: Rekam suara bilangan pendek (nol sampai sembilan)`);
      if (kunci?.jenis === "angka") {
        angka.push(kunci.n);
        const pil = LC.pilihanAngkaTugas(l, kunci.n);
        cek(pil.length === 4 && pil.includes(kunci.n) && new Set(pil).size === 4, `${nm}: pilihan angka memuat kunci (${pil.join()})`);
        cek(tanpaDigit(LC.petunjukSalah(l, so.cara, kunci.n + 1, th.rupa)) && tanpaDigit(LC.petunjukSalah(l, so.cara, kunci.n - 1, th.rupa)), `${nm}: petunjuk salah angka tanpa digit`);
        cek(K.cocokUcapan(LC.kata(kunci.n), kunci).cocok, `${nm}: ucapan bilangan "${LC.kata(kunci.n)}" dikenali`);
      }
      if (kunci?.jenis === "nama") {
        const pil = LC.pilihanNamaDari(kunci.nama);
        cek(pil.includes(kunci.nama) && pil.every((x) => LC.URUT_NAMA.includes(x)) && pil.length === 2, `${nm}: pilihan kata memuat kunci`);
        const lain = pil.find((x) => x !== kunci.nama);
        cek(tanpaDigit(LC.petunjukSalah(l, so.cara, lain, th.rupa)) && LC.petunjukSalah(l, so.cara, lain, th.rupa).length > 20, `${nm}: petunjuk salah kata tanpa digit`);
        cek(K.cocokUcapan(kunci.nama, kunci).cocok && !K.cocokUcapan(lain, kunci).cocok, `${nm}: ucapan "${kunci.nama}" dikenali dan kata lain ditolak`);
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
        const kl = l.klaim;
        if (kl.jenis === "balik") cek(kl.hasil === LC.hasilBalik(kl.a, kl.b) && LC.perluPinjam(kl.a, kl.b) && !LC.klaimBenar(kl), `${nm}: klaim membalik satuan sesuai hitungan dan salah`);
        if (kl.jenis === "lupa") cek(kl.hasil === LC.hasilLupa(kl.a, kl.b) && LC.perluPinjam(kl.a, kl.b) && !LC.klaimBenar(kl), `${nm}: klaim lupa menurunkan puluhan sesuai hitungan dan salah`);
        if (kl.jenis === "benar") cek(LC.klaimBenar(kl), `${nm}: klaim benar memang benar`);
      }
      // Batas jawaban tiap tipe.
      if (l.tipe === "hasil" || l.tipe === "cerita") {
        const r = l.a - l.b;
        if (so.cara !== "klik") cek(r >= 0 && r <= 9, `${nm}: hasil satu angka bila bukan Klik`);
        if (so.cara === "kanvas") cek(r >= 1, `${nm}: hasil kanvas bukan nol`);
      }
      if (l.tipe === "satuan") cek(LC.sat(l.a - l.b) >= 1, `${nm}: angka satuan hasil bukan nol`);
      if (l.tipe === "puluhan") cek(LC.puluh(l.a - l.b) >= 1, `${nm}: angka puluhan hasil bukan nol`);
      if (l.tipe === "sisapuluh" || l.tipe === "satuanjadi") cek(LC.perluPinjam(l.a, l.b), `${nm}: perlu meminjam`);
      if (l.tipe === "naik") {
        cek(LC.sat(l.b) !== 0 && (l.bagian !== "satuan2" || LC.sat(l.a) !== 0) && (l.bagian !== "puluh" || LC.naikPuluh(l.a, l.b) >= 1) && (LC.puluh(l.b) + 1) * 10 <= l.a, `${nm}: hitung naik sah (${l.bagian})`);
        if (l.bagian === "total") cek(so.cara === "klik", `${nm}: jumlah langkah naik hanya untuk Klik`);
      }
      if (l.tipe === "satuanjadi") cek(so.cara === "klik", `${nm}: satuan jadi hanya untuk Klik`);
      if (l.tipe === "balikjumlah") cek(so.cara === "klik" && l.a - l.b >= 1, `${nm}: penjumlahan pemeriksa hanya untuk Klik`);
      if (l.tipe === "urut") cek(so.cara === "klik" && ["susun", "pinjam"].includes(l.ragam) && LC.petunjukKetuk(l).length > 20 && tanpaDigit(LC.petunjukKetuk(l)), `${nm}: urut langkah hanya untuk Klik, petunjuk bersih`);
      if (l.tipe === "cerita") cek(tanpaDigit(l.benda + l.aksi) && bersih(l.benda + l.aksi) && !ADA_EMOJI.test(l.benda + l.aksi), `${nm}: cerita bersih`);
      if (l.tipe === "tempat") cek(l.tanya === "dulu" || l.tanya === "lalu", `${nm}: tempat dulu atau lalu`);
    }
  }
  cek(salahAda >= 1, `${n}: paling sedikit satu Cari kesalahan`);
  cek(new Set(angka).size === angka.length, `${n}: angka jawaban tidak kembar dalam satu tahap (${angka.join(", ")})`);
  cek(new Set(kanvas).size === 4, `${n}: empat angka kanvas berbeda (${kanvas.join(", ")})`);
  cek(th.ikon.cara.length > 20 && emojiSah(th.ikon.ikon) && bersih(th.ikon.cara), `${n}: tema tahap`);
  // Tiga metode global tampak: tiap metode punya tugas di tiap misi.
  for (const m of ["susun", "naik", "pinjam"]) cek(th.soal.every((so) => so.langkah.some((x) => x.metode === m)), `${n}: metode ${m} muncul di tiap misi`);
}
const angkaTahap = (soal) => soal.map((s) => s.langkah.map((l) => LC.kunciJawab(l.langkah, s.cara))).flat().filter((k) => k && k.jenis === "angka").map((k) => k.n);
sama(angkaTahap(D.CONCRETE), [42, 12, 8, 4, 3, 5, 6, 7], "Concrete: angka jawaban");
sama(angkaTahap(D.PICTORIAL), [5, 15, 7, 8, 4, 6, 3], "Pictorial: angka jawaban");
sama(angkaTahap(D.ABSTRACT), [78, 8, 13, 5, 4, 7, 2, 0, 6], "Abstract: angka jawaban");
// Batas rupa pada sumber komponen: emoji benda hanya pada rak mi (Concrete); Pictorial memakai balok dan garis bilangan SVG; Abstract memakai susunan angka.
{
  const lg = readFileSync(new URL("LangkahKurang.tsx", folderUrl), "utf8");
  const tg = readFileSync(new URL("TahapKurang.tsx", folderUrl), "utf8");
  cek((lg.match(/\{KARDUS\}/g) ?? []).length === 1 && (lg.match(/\{BUNGKUS\}/g) ?? []).length === 1, "komponen: emoji kardus dan bungkus hanya dipakai satu kali, di rak mi");
  const kelompok = lg.slice(lg.indexOf("function KelompokRak"), lg.indexOf("export function RakSvg"));
  cek(/KARDUS/.test(kelompok) && /BUNGKUS/.test(kelompok), "komponen: kardus dan bungkus hanya dalam KelompokRak");
  const tampil = lg.slice(lg.indexOf("function Tampil("), lg.indexOf("/** Tempat yang disorot"));
  cek(tampil.indexOf('rupa === "lambang"') < tampil.indexOf("<RakSvg") && tampil.indexOf('rupa === "diagram"') < tampil.indexOf("<RakSvg") && (tampil.match(/<RakSvg/g) ?? []).length === 1, "komponen: rak mi beremoji hanya untuk rupa benda");
  const diagram = lg.slice(lg.indexOf("function Balok("), lg.indexOf("/* ------------------------------ Susunan angka"));
  cek(!ADA_EMOJI.test(diagram), "komponen: diagram balok dan garis bilangan tanpa emoji");
  const abstrak = lg.slice(lg.indexOf("export function PapanSusun"), lg.indexOf("/* ------------------------------ Gambar tugas"));
  cek(!ADA_EMOJI.test(abstrak) && /PapanSusun/.test(tampil) && /NaikAngka/.test(tampil), "komponen: Abstract memakai susunan angka dan tanda tanpa emoji");
  cek(/rupa === "benda" \? `\$\{IKON_METODE\[ls\.metode\]\} ` : ""/.test(tg), "TahapKurang: ikon metode hanya pada Concrete");
  cek(/poinPenting \? "LIHAT POIN PENTING/.test(tg) && !/PENUTUP|KONFETI|konfeti/i.test(tg), "TahapKurang: Abstract diakhiri Poin Penting tanpa perayaan (bukan akhir bab)");
}

/* ------------------------------ Cakupan jenis tugas dan metode global ------------------------------ */
{
  const semua = [...D.CONCRETE, ...D.PICTORIAL, ...D.ABSTRACT].flatMap((s) => s.langkah.map((l) => l.langkah.tipe));
  for (const tp of ["salah", "hasil", "cerita", "satuan", "puluhan", "sisapuluh", "satuanjadi", "pinjam", "naik", "tempat", "periksaop", "balikjumlah", "urut"]) cek(semua.includes(tp), `jenis tugas ${tp} dipakai`);
  const klaim = [...D.CONCRETE, ...D.PICTORIAL, ...D.ABSTRACT].flatMap((s) => s.langkah).filter((l) => l.langkah.tipe === "salah").map((l) => l.langkah.klaim.jenis);
  sama(klaim, ["balik", "benar", "lupa"], "Cari kesalahan memakai klaim membalik satuan, benar, dan lupa menurunkan puluhan");
  const naik = [...D.CONCRETE, ...D.PICTORIAL, ...D.ABSTRACT].flatMap((s) => s.langkah).filter((l) => l.langkah.tipe === "naik").map((l) => l.langkah.bagian);
  for (const b of ["satuan1", "puluh", "satuan2", "total"]) cek(naik.includes(b), `hitung naik memakai bagian ${b}`);
  cek(LC.NAMA_METODE.igil === "Metode IGIL: Satuan Dulu, Pinjam Puluhan", "nama Metode IGIL");
  cek(LC.NAMA_METODE.susun.includes("Standard Subtraction") && LC.NAMA_METODE.naik.includes("Counting Up") && LC.NAMA_METODE.pinjam.includes("Regrouping"), "tiga metode global di judul tugas");
  cek(LC.URUT_METODE.join() === "igil,susun,naik,pinjam" && Object.values(LC.IKON_METODE).every(emojiSah), "metode dan ikon");
  cek(D.TEMA_KURANG.concrete.nama === "Concrete" && D.TEMA_KURANG.pictorial.nama === "Pictorial" && D.TEMA_KURANG.abstract.nama === "Abstract", "nama tahap");
  cek(D.CONCRETE_KURANG === D.CONCRETE && D.PICTORIAL_KURANG === D.PICTORIAL && D.ABSTRACT_KURANG === D.ABSTRACT, "ekspor untuk pemasang");
  cek(D.POIN_PENTING.length >= 6 && D.POIN_PENTING_SUARA.every(tanpaDigit) && D.POIN_PENTING_SUARA.every(bersih) && !/[<>=]/.test(D.POIN_PENTING_SUARA.join(" ")), "poin penting bersih, suara tanpa digit dan lambang");
  const poin = D.POIN_PENTING.join(" ").toLowerCase();
  for (const s of ["bersusun", "satuan lebih dulu", "pinjam satu puluhan", "sepuluh satuan", "susun panjang", "menghitung naik", "penjumlahan", "bilangan awal", "nol", "sisa", "selisih"]) cek(poin.includes(s), `poin penting memuat "${s}"`);
  cek(D.MISI_SISA_TEKS === DS.MISI_SISA_TEKS && DP.MISI_SISA_TEKS === DS.MISI_SISA_TEKS && tanpaDigit(DS.MISI_SISA_TEKS) && bersih(DS.MISI_SISA_TEKS), "teks misi awal tanpa digit");
  cek(MT.MISI_K3B1.E === DS.MISI_SISA_TEKS, "misi-teks-k3b1 baris E sama dengan MISI_SISA_TEKS");
}

/* ------------------------------ Simulasi Rak Sisa ------------------------------ */
{
  const k0 = L.awalSisa();
  cek(k0.alat === "sisa" && k0.mode === "susun" && k0.susunBenar.length === 0 && k0.panjangBenar.length === 0 && k0.blokBenar.length === 0 && !k0.pinjamSelesai && k0.periksaBenar.length === 0 && k0.kosongBenar.length === 0 && k0.vonis === null && !k0.susunPinjam && k0.salah === 0, "simulasi: keadaan awal bersih");
  cek(k0.blokBatang === 4 && k0.blokButir === 7 && JSON.stringify(L.mulaiLagiSisa()) === JSON.stringify(k0), "simulasi: rak awal dan mulai lagi sama dengan awal");
  cek(L.pilihModeSisa(k0, "kosong").mode === "kosong" && L.URUT_MODE.length === 5, "simulasi: lima alat");
  // Susun pendek.
  const ts0 = L.tugasSusun(k0);
  cek(!LC.perluPinjam(ts0.a, ts0.b) && DS.SUSUN_TUGAS.filter((t) => LC.perluPinjam(t.a, t.b)).length === 2, "simulasi: susun pendek satu tanpa pinjam, dua dengan pinjam");
  const isiSusun = (k, pinjam = false) => {
    const t = L.tugasSusun(k);
    let x = k;
    if (pinjam) x = L.pinjamSusun(x).k;
    x = { ...x, susunP: LC.puluh(t.a - t.b), susunS: LC.sat(t.a - t.b) };
    return x;
  };
  const gagalS = L.periksaSusun(k0);
  cek(!gagalS.ok && gagalS.k.susunBenar.length === 0 && gagalS.k.salah === 1 && tanpaDigit(gagalS.pesan), "simulasi: susun kosong tidak dihitung");
  cek(L.ubahSusun(k0, "satuan", -1).susunS === 0 && L.ubahSusun({ ...k0, susunP: 9 }, "puluhan", 1).susunP === 9 && L.ubahSusun(k0, "puluhan", 1).susunP === 1, "simulasi: isian antara nol dan sembilan");
  const okS = L.periksaSusun(isiSusun(k0));
  cek(okS.ok && okS.k.susunBenar.join() === "0" && okS.k.susunIndeks === 1 && okS.k.susunP === 0 && okS.k.susunS === 0 && !okS.k.susunPinjam && tanpaDigit(okS.pesan), "simulasi: susun tepat dihitung, pengurangan berikutnya");
  let kS = okS.k;
  const pinjamTak = L.pinjamSusun(k0);
  cek(!pinjamTak.ok && tanpaDigit(pinjamTak.pesan), "simulasi: tidak bisa meminjam bila satuan atas cukup");
  const tanpaPinjam = L.periksaSusun({ ...kS, susunP: LC.puluh(L.tugasSusun(kS).a - L.tugasSusun(kS).b), susunS: LC.sat(L.tugasSusun(kS).a - L.tugasSusun(kS).b) });
  cek(!tanpaPinjam.ok && /Pinjam/.test(tanpaPinjam.pesan) && tanpaPinjam.k.susunBenar.length === 1 && tanpaDigit(tanpaPinjam.pesan), "simulasi: satuan atas kecil dan belum meminjam ditolak");
  const pj = L.pinjamSusun(kS);
  cek(pj.ok && pj.k.susunPinjam && tanpaDigit(pj.pesan) && !L.pinjamSusun(pj.k).ok, "simulasi: meminjam sekali");
  const salahP = L.periksaSusun({ ...pj.k, susunP: LC.puluh(L.tugasSusun(kS).a - L.tugasSusun(kS).b) + 1, susunS: LC.sat(L.tugasSusun(kS).a - L.tugasSusun(kS).b) });
  cek(!salahP.ok && /Puluhan belum tepat/.test(salahP.pesan), "simulasi: puluhan keliru ditolak dengan petunjuk");
  const salahSat = L.periksaSusun({ ...pj.k, susunP: LC.puluh(L.tugasSusun(kS).a - L.tugasSusun(kS).b), susunS: 9 });
  cek(!salahSat.ok && /Satuan belum tepat/.test(salahSat.pesan), "simulasi: satuan keliru ditolak dengan petunjuk");
  for (let i = 0; i < 2; i += 1) kS = L.periksaSusun(isiSusun(kS, LC.perluPinjam(L.tugasSusun(kS).a, L.tugasSusun(kS).b))).k;
  cek(kS.susunBenar.length === 3 && kS.susunIndeks === 0, "simulasi: ketiga susun pendek benar, kembali ke awal");
  // Susun panjang.
  const tp0 = L.tugasPanjang(k0);
  const u = L.uraianPanjang(92, 57);
  cek(u.pinjam && u.puluhAtas === 80 && u.satuanAtas === 12 && u.puluhBawah === 50 && u.satuanBawah === 7 && !L.uraianPanjang(78, 43).pinjam && L.uraianPanjang(78, 43).puluhAtas === 70, "simulasi: uraian susun panjang dengan dan tanpa pinjam");
  const gagalP = L.periksaPanjang(k0);
  cek(!gagalP.ok && gagalP.k.panjangBenar.length === 0 && tanpaDigit(gagalP.pesan), "simulasi: susun panjang kosong tidak dihitung");
  const isiPanjang = (k) => ({ ...k, panjangP: LC.puluh(L.tugasPanjang(k).a - L.tugasPanjang(k).b), panjangS: LC.sat(L.tugasPanjang(k).a - L.tugasPanjang(k).b) });
  const okP = L.periksaPanjang(isiPanjang(k0));
  cek(okP.ok && okP.k.panjangBenar.join() === "0" && okP.k.panjangIndeks === 1 && tanpaDigit(okP.pesan), "simulasi: susun panjang tepat dihitung");
  cek(!L.periksaPanjang({ ...isiPanjang(k0), panjangP: 9 }).ok && /puluhan/.test(L.periksaPanjang({ ...isiPanjang(k0), panjangP: 9 }).pesan) && !L.periksaPanjang({ ...isiPanjang(k0), panjangS: 9 }).ok, "simulasi: puluhan atau satuan keliru ditolak");
  cek(L.ubahPanjang(k0, "puluhan", 1).panjangP === 1 && L.ubahPanjang(k0, "satuan", -1).panjangS === 0, "simulasi: atur hasil susun panjang");
  cek(tp0.a - tp0.b > 0 && DS.PANJANG_TUGAS.some((t) => LC.perluPinjam(t.a, t.b)) && DS.PANJANG_TUGAS.some((t) => !LC.perluPinjam(t.a, t.b)), "simulasi: susun panjang dengan dan tanpa pinjam");
  // Pinjam (batang menjadi sepuluh butir).
  cek(DS.BLOK_TUGAS.filter((t) => LC.perluPinjam(t.a, t.b)).length === 2 && !LC.perluPinjam(DS.BLOK_TUGAS[0].a, DS.BLOK_TUGAS[0].b), "simulasi: rak pertama tanpa pinjam, dua lain perlu memecah batang");
  const tanpaBlok = L.periksaBlok(k0);
  cek(!tanpaBlok.ok && tanpaBlok.k.blokBenar.length === 0 && tanpaDigit(tanpaBlok.pesan), "simulasi: belum mengambil tidak dihitung");
  let b = k0;
  for (let i = 0; i < LC.puluh(L.tugasBlok(b).b); i += 1) b = L.ambilBatang(b).k;
  for (let i = 0; i < LC.sat(L.tugasBlok(b).b); i += 1) b = L.ambilButir(b).k;
  const okB = L.periksaBlok(b);
  cek(okB.ok && okB.k.blokBenar.join() === "0" && !okB.k.pinjamSelesai && okB.k.blokIndeks === 1 && okB.k.blokBatang === 5 && okB.k.blokButir === 2 && okB.k.ambilBatang === 0 && !okB.k.blokPecah && tanpaDigit(okB.pesan), "simulasi: ambil tanpa memecah dihitung tetapi bukan meminjam, rak berikutnya");
  let b2 = okB.k;
  const gagalButir = L.ambilButir(L.ambilButir(b2).k);
  cek(gagalButir.k.ambilButir === 2 && !L.ambilButir({ ...b2, blokButir: 0 }).ok && /Pecah/.test(L.ambilButir({ ...b2, blokButir: 0 }).pesan), "simulasi: butir tidak cukup, disuruh memecah batang");
  const pecah = L.pecahBatang(b2);
  cek(pecah.ok && pecah.k.blokBatang === 4 && pecah.k.blokButir === 12 && pecah.k.blokPecah && tanpaDigit(pecah.pesan) && !L.pecahBatang({ ...b2, blokBatang: 0 }).ok, "simulasi: satu batang pecah menjadi sepuluh butir");
  let b3 = pecah.k;
  for (let i = 0; i < LC.puluh(L.tugasBlok(b3).b); i += 1) b3 = L.ambilBatang(b3).k;
  for (let i = 0; i < LC.sat(L.tugasBlok(b3).b); i += 1) b3 = L.ambilButir(b3).k;
  const okPinjam = L.periksaBlok(b3);
  cek(okPinjam.ok && okPinjam.k.pinjamSelesai && okPinjam.k.blokBenar.join() === "0,1" && /meminjam/.test(okPinjam.pesan) && tanpaDigit(okPinjam.pesan), "simulasi: memecah batang lalu mengambil dihitung sebagai meminjam");
  const kurangAmbil = L.periksaBlok(L.ambilBatang(b2).k);
  cek(!kurangAmbil.ok && kurangAmbil.k.salah === 1 && tanpaDigit(kurangAmbil.pesan), "simulasi: yang diambil belum sama ditolak");
  const ulangB = L.ulangBlok(b3);
  cek(ulangB.blokBatang === 5 && ulangB.blokButir === 2 && ulangB.ambilBatang === 0 && ulangB.ambilButir === 0 && !ulangB.blokPecah, "simulasi: ulang mengembalikan rak");
  // Periksa dengan penjumlahan.
  cek(DS.PERIKSA_TUGAS.some((t) => t.hasil === t.a - t.b) && DS.PERIKSA_TUGAS.some((t) => t.hasil !== t.a - t.b), "simulasi: hasil benar dan hasil keliru");
  const tanpaVonis = L.periksaPeriksa(k0);
  cek(!tanpaVonis.ok && tanpaVonis.k.salah === 0 && tanpaDigit(tanpaVonis.pesan), "simulasi: periksa tanpa memilih ditolak");
  const isiJumlah = (k, vonis) => {
    const t = L.tugasPeriksa(k);
    return { ...k, jumP: LC.puluh(t.hasil + t.b), jumS: LC.sat(t.hasil + t.b), vonis };
  };
  const t0 = L.tugasPeriksa(k0);
  const cocok0 = t0.hasil + t0.b === t0.a;
  const salahJ = L.periksaPeriksa({ ...isiJumlah(k0, cocok0 ? "cocok" : "tidak"), jumS: (LC.sat(t0.hasil + t0.b) + 1) % 10 });
  cek(!salahJ.ok && salahJ.k.periksaBenar.length === 0 && /Penjumlahannya belum tepat/.test(salahJ.pesan), "simulasi: jumlah keliru ditolak");
  const salahV = L.periksaPeriksa(isiJumlah(k0, cocok0 ? "tidak" : "cocok"));
  cek(!salahV.ok && salahV.k.salah === 1 && tanpaDigit(salahV.pesan), "simulasi: vonis keliru ditolak");
  let pk = L.pilihModeSisa(k0, "periksa");
  for (let i = 0; i < DS.PERIKSA_TUGAS.length; i += 1) {
    const t = L.tugasPeriksa(pk);
    const r = L.periksaPeriksa(isiJumlah(pk, t.hasil + t.b === t.a ? "cocok" : "tidak"));
    cek(r.ok && tanpaDigit(r.pesan), `simulasi: pemeriksaan ${i + 1} benar`);
    pk = r.k;
  }
  cek(pk.periksaBenar.length === 3 && L.pilihVonis(L.pilihVonis(k0, "cocok"), "cocok").vonis === null && L.ubahJumlah(k0, "puluhan", 1).jumP === 1, "simulasi: semua pemeriksaan benar, pilihan yang sama membatalkan");
  // Kosongkan rak.
  cek(L.isiRak(k0) === 36 && L.terjual(k0) === 0 && L.sisaRak(k0) === 36, "simulasi: rak awal berisi tiga puluh enam");
  const kurangJual = L.periksaKosong({ ...k0, kosongP: 3, kosongS: 5 });
  cek(!kurangJual.ok && /tersisa/.test(kurangJual.pesan) && tanpaDigit(kurangJual.pesan), "simulasi: rak belum kosong ditolak");
  const lebihJual = L.periksaKosong({ ...k0, kosongP: 4, kosongS: 0 });
  cek(!lebihJual.ok && /lebih banyak/.test(lebihJual.pesan), "simulasi: terjual melebihi isi ditolak");
  let kk = k0;
  for (let i = 0; i < DS.KOSONG_TUGAS.length; i += 1) {
    const isi = L.isiRak(kk);
    const r = L.periksaKosong({ ...kk, kosongP: LC.puluh(isi), kosongS: LC.sat(isi) });
    cek(r.ok && tanpaDigit(r.pesan) && /nol/.test(r.pesan), `simulasi: rak ${i + 1} kosong dihitung`);
    kk = r.k;
  }
  cek(kk.kosongBenar.length === 3 && L.ubahTerjual(k0, "puluhan", 1).kosongP === 1, "simulasi: ketiga rak kosong");
  // Teks.
  cek(Object.values(L.SUARA_MODE).every((t) => tanpaDigit(t) && bersih(t)) && L.URUT_MODE.every((md) => L.kalimatSisa(L.pilihModeSisa(k0, md)).length > 20 && tanpaDigit(L.kalimatSisa(L.pilihModeSisa(k0, md)))), "simulasi: ucapan tiap alat tanpa digit");
  // Berbeda dari Story.
  const pasangSim = [...DS.SUSUN_TUGAS, ...DS.PANJANG_TUGAS, ...DS.BLOK_TUGAS, ...DS.PERIKSA_TUGAS].map((t) => `${t.a}-${t.b}`);
  cek(!pasangSim.some((p) => STORY.includes(p)) && !DS.KOSONG_TUGAS.includes(24), "simulasi: tidak ada pasangan yang sama dengan data Story");
  cek(DS.SUSUN_TUGAS.every((t) => t.a <= 99 && t.b <= t.a) && DS.PANJANG_TUGAS.every((t) => t.a <= 99 && t.b <= t.a) && DS.BLOK_TUGAS.every((t) => t.a <= 99 && t.b <= t.a) && DS.KOSONG_TUGAS.every((n) => n <= 99), "simulasi: bilangan sampai sembilan puluh sembilan");
}

/* ------------------------------ Misi ------------------------------ */
{
  const awal = L.awalSisa();
  const d = MK.daftarMisiK3Bab1("E");
  cek(d === MK.MISI_E && d.length === 6 && d.filter((x) => x.wajib).length === 4 && d.every((x) => x.id.startsWith("e-")), "misi: enam misi, empat wajib, id berawalan e-");
  cek(d.every((x) => x.teks.length >= 10 && x.teks.length <= 120 && tanpaDigit(x.teks) && bersih(x.teks)), "misi: teks 10-120 huruf tanpa digit dan kata terlarang");
  cek(d.every((x) => !/(skor|nilai|tebak)/i.test(x.teks)), "misi: tanpa skor");
  cek(S.misiBaru(d, awal, new Set()).length === 0, "misi: keadaan awal tidak memenuhi misi");
  cek(d.every((x) => !x.cek({ alat: "kerangka" })), "misi: alat lain tidak memenuhi misi");
  // Alur lengkap melalui logika.
  let k = awal;
  const isiSusun = (x, pinjam) => {
    const t = L.tugasSusun(x);
    let y = pinjam ? L.pinjamSusun(x).k : x;
    y = { ...y, susunP: LC.puluh(t.a - t.b), susunS: LC.sat(t.a - t.b) };
    return y;
  };
  for (let i = 0; i < 3; i += 1) k = L.periksaSusun(isiSusun(k, LC.perluPinjam(L.tugasSusun(k).a, L.tugasSusun(k).b))).k;
  sama(S.misiBaru(d, k, new Set()), ["e-susun", "e-lengkap"], "misi: tiga susun pendek memenuhi e-susun dan e-lengkap");
  {
    const t = L.tugasPanjang(k);
    k = L.periksaPanjang({ ...k, panjangP: LC.puluh(t.a - t.b), panjangS: LC.sat(t.a - t.b) }).k;
  }
  {
    let x = k;
    // Lewati rak pertama tanpa memecah, lalu pinjam di rak kedua.
    const ambilSemua = (y) => {
      let z = y;
      for (let i = 0; i < LC.puluh(L.tugasBlok(z).b); i += 1) z = L.ambilBatang(z).k;
      for (let i = 0; i < LC.sat(L.tugasBlok(z).b); i += 1) z = L.ambilButir(z).k;
      return z;
    };
    x = L.periksaBlok(ambilSemua(x)).k;
    sama(S.misiBaru(d, { ...x }, new Set(["e-susun", "e-lengkap", "e-panjang"])), [], "misi: ambil tanpa memecah belum memenuhi e-pinjam");
    x = L.periksaBlok(ambilSemua(L.pecahBatang(x).k)).k;
    k = x;
  }
  {
    const t = L.tugasPeriksa(k);
    k = L.periksaPeriksa({ ...k, jumP: LC.puluh(t.hasil + t.b), jumS: LC.sat(t.hasil + t.b), vonis: t.hasil + t.b === t.a ? "cocok" : "tidak" }).k;
  }
  {
    const isi = L.isiRak(k);
    k = L.periksaKosong({ ...k, kosongP: LC.puluh(isi), kosongS: LC.sat(isi) }).k;
  }
  sama(S.misiBaru(d, k, new Set()), ["e-susun", "e-panjang", "e-pinjam", "e-periksa", "e-nol", "e-lengkap"], "misi: semua tercapai lewat logika simulasi");
  const wajib = d.filter((x) => x.wajib).map((x) => x.id);
  cek(S.wajibSelesai(d, new Set(wajib)) && !S.wajibSelesai(d, new Set(["e-susun"])), "misi: gerbang wajib");
  cek(S.misiBaru(d, { ...awal, salah: 9, mode: "kosong", susunP: 5, susunS: 4, jumP: 3, vonis: "cocok", kosongP: 2, panjangP: 3, blokPecah: true, ambilButir: 3 }, new Set()).length === 0, "misi: percobaan keliru dan geseran tidak dihitung sebagai misi");
}

/* ------------------------------ Berkas ------------------------------ */
{
  const berkas = readdirSync(folderUrl).filter((f) => /\.(ts|tsx)$/.test(f));
  for (const f of ["logika.ts", "logika-cpa.ts", "periksa.ts", "data.ts", "data-peta.ts", "data-sim.ts", "data-kartu.ts", "JawabKurang.tsx", "LangkahKurang.tsx", "TahapKurang.tsx", "RakMi.tsx", "CatatanSisa.tsx", "SimulasiRakSisa.tsx"]) cek(berkas.includes(f), `berkas ${f} ada`);
  const lihat = [
    ...berkas.map((f) => ["kurang-k3b1e/" + f, readFileSync(new URL(f, folderUrl), "utf8")]),
    ["misi-k3bab1.ts", readFileSync(new URL("../src/components/modul/misi-k3bab1.ts", import.meta.url), "utf8")],
    ["misi-teks-k3b1.ts", readFileSync(new URL("../src/components/modul/misi-teks-k3b1.ts", import.meta.url), "utf8")],
  ];
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
