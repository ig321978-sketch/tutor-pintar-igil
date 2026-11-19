// Uji Mind-map (Tali Garis), Infografis (Spanduk Bersih), Simulasi Papan Pengumuman, dan tahap Concrete, Pictorial, Abstract Kelas 2 Bab 7 Sub-Bab B ("Pengumuman Bu Lia"),
// membandingkan dan mengurutkan bilangan, akhir cerita Bank Sampah Sekolah.
// Memeriksa: tali garis (sembilan kartu geser, label pendek, semua metode Story termasuk tiga metode global dengan nama Indonesia), spanduk bersih dari data Story, CPA dua belas tugas
// per tahap (Klik, Kanvas, Suara x empat metode) dengan jawaban beragam (angka tempat, banding, kata, kepik di tali, tabel seratus, urut kartu, kartu angka, teka-teki, satu angka, satu kata)
// dan Cari kesalahan di tiap tahap, kunci dihitung dari data, angka jawaban tidak kembar per tahap, tugas yang langsung siap (jebakan tombol Periksa macet), instruksi tanpa digit,
// petunjuk salah, pengenal ucapan, batas rupa, logika Simulasi Papan Pengumuman, emoji, kata terlarang, akhir baris.
// Jalankan: node --no-warnings scripts/uji-papan-k2b7b.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const DP = await import("../src/components/modul/papan-k2b7b/data-peta.ts");
const DK = await import("../src/components/modul/papan-k2b7b/data-kartu.ts");
const LC = await import("../src/components/modul/papan-k2b7b/logika-cpa.ts");
const D = await import("../src/components/modul/papan-k2b7b/data.ts");
const DS = await import("../src/components/modul/papan-k2b7b/data-sim.ts");
const K = await import("../src/components/modul/papan-k2b7b/periksa.ts");
const L = await import("../src/components/modul/papan-k2b7b/logika.ts");
const MK = await import("../src/components/modul/misi-k2bab7.ts");
const S = await import("../src/components/modul/misi-simulasi.ts");
const folderUrl = new URL("../src/components/modul/papan-k2b7b/", import.meta.url);

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
const TERLARANG = /\b(kelas|buku|teman|kelompok|mengelompokkan|skor|nilai|bernilai|soal|tebak|tebakan|kunci|latihan)\b/i;
const tanpaDigit = (t) => !/\d/.test(t);
const bersih = (t) => !TERLARANG.test(t) && !/buku|kelompok|bernilai|tebak|nilai tempat/i.test(t);
const emojiSah = (s) => [...s].every((c) => c.codePointAt(0) <= 0x1fa95 && c.codePointAt(0) !== 0x200d && c.codePointAt(0) !== 0x1f6de);
const ADA_EMOJI = /[\u{1F000}-\u{1FFFF}\u{2600}-\u{27BF}]/u;
/** Bilangan yang dipakai Story (jangan jadi data simulasi). */
const ANGKA_STORY = new Set([49, 51, 82, 79, 47, 74, 63, 68, 58, 81, 62, 59, 83, 28, 34, 72, 36, 61, 67, 50, 48, 80, 60]);

/* ------------------------------ Mind-map: tali garis (sembilan kartu geser) ------------------------------ */
{
  const KP = DK.KARTU_PAPAN;
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
  for (const m of ["Tabel Seratus", "Bilangan Patokan", "Urut Kartu", "garis bilangan", "puluhannya", "satuannya", "kata atau tanda", "berpikir terbalik", "langkahnya"]) cek(cara.includes(m.toLowerCase()), `kartu: cara memuat ${m}`);
  const gab = KP.map((k) => [k.judul, k.masalah.label, k.cara.label, k.hasil.label, k.masalah.arti, k.cara.arti, k.hasil.arti].join(" ")).join(" ").toLowerCase();
  for (const s of ["lebih besar", "lebih kecil", "sama dengan", "maju", "mundur", "teka-teki", "kanan", "kiri", "puluhan", "satuan", "patokan", "mulut buaya", "sepuluh baris"]) cek(gab.includes(s), `kartu: memuat poin "${s}"`);
  cek(!new RegExp("\\b(chacha|dika|nia|bu sari|bu lia|botol|karung|kepik|gudang|spanduk)\\b", "i").test(gab), "kartu: hanya poin pelajaran (tanpa tokoh dan benda cerita)");
  cek(tanpaDigit(DK.SUARA_KARTU_PAPAN + DK.SELESAI_KARTU_PAPAN) && bersih(DK.SUARA_KARTU_PAPAN + DK.SELESAI_KARTU_PAPAN), "kartu: suara dan pesan selesai tanpa digit dan kata terlarang");
  cek(emojiSah(DK.TEMA_KARTU_PAPAN.ikon) && DK.TEMA_KARTU_PAPAN.judul.length > 5, "kartu: tema sah");
  const RG = DK.RINGKASAN_PAPAN;
  cek(RG.ikon.length === DK.KARTU_PAPAN.length && new Set(RG.ikon).size === RG.ikon.length && [...RG.ikon, RG.pusat].every((e) => emojiSah(e) && !/[A-Za-z0-9]/.test(e)), "peta radial: satu gambar unik per kartu, gambar sah tanpa huruf");
  cek(tanpaDigit(RG.suara) && bersih(RG.suara) && !RG.ikon.includes(RG.pusat), "peta radial: suara bersih dan pusat berbeda dari cabang");
}

/* ------------------------------ Infografis: spanduk bersih (lima kartu pengumpul + poster) ------------------------------ */
{
  const B = DK.BARIS_INFO_PAPAN;
  cek(B.length === 5 && DK.KOLOM_INFO_PAPAN.length === 3, "infografis: lima kartu dan tiga kolom");
  cek(B.every((b) => b.isi.length === 3 && emojiSah(b.ikon) && b.nama.length > 2), "infografis: tiap kartu tiga isian, emoji sah");
  const jumlahContoh = B.map((b) => b.contoh.length);
  cek(jumlahContoh[0] === 3 && jumlahContoh.slice(1).every((n) => n === 0), "infografis: baris satu penuh contoh, baris dua sampai lima mandiri");
  const semua = B.flatMap((b) => b.isi);
  cek(B.every((b) => new Set(b.isi.map((x) => x.t)).size === 3), "infografis: tiga label tiap kartu berbeda");
  cek(semua.every((x) => x.t.length <= 26 && x.t.split(/\s+/).length <= 3 && bersih(x.t) && bersih(x.s ?? "")), "infografis: label pendek (paling banyak tiga kata) dan tanpa kata terlarang");
  cek(semua.every((x) => tanpaDigit(x.s ?? x.t)), "infografis: ucapan label tanpa digit");
  cek(B.every((b) => /^\d{2}$/.test(b.isi[0].t) && b.isi[0].s === LC.kata(Number(b.isi[0].t))), "infografis: banyak botol dua angka dan ucapannya sesuai");
  cek(B.every((b) => b.isi[1].t === `${b.isi[0].t[0]} dan ${b.isi[0].t[1]}` && b.isi[1].s === `${LC.kata(Number(b.isi[0].t[0]))} dan ${LC.kata(Number(b.isi[0].t[1]))}`), "infografis: puluhan dan satuan sesuai bilangan");
  const bil = B.map((b) => Number(b.isi[0].t));
  sama(bil, [...bil].sort((p, q) => q - p), "infografis: urut dari yang paling banyak");
  sama(bil, [74, 68, 63, 58, 47], "infografis: data Story (tim Kuning, Dika, Nia, tim Hijau, tim Biru)");
  sama(B.map((b) => b.isi[2].t), ["Pertama", "Kedua", "Ketiga", "Keempat", "Kelima"], "infografis: urutan ejaan baku");
  cek(tanpaDigit(DK.SUARA_INFO_PAPAN + DK.SELESAI_INFO_PAPAN) && bersih(DK.SUARA_INFO_PAPAN + DK.SELESAI_INFO_PAPAN) && emojiSah(DK.TEMA_INFO_PAPAN.ikon), "infografis: suara dan tema bersih");
}

/* ------------------------------ Pengenal ucapan ------------------------------ */
{
  const c = (t, k) => K.cocokUcapan(t, k).cocok;
  cek(c("besar", { jenis: "nama", nama: "besar" }) && c("lebih besar", { jenis: "nama", nama: "besar" }) && c("kecil", { jenis: "nama", nama: "kecil" }) && c("sama dengan", { jenis: "nama", nama: "sama" }), "ucapan: besar, kecil, sama");
  cek(!c("besar atau kecil", { jenis: "nama", nama: "besar" }) && !c("kecil", { jenis: "nama", nama: "besar" }), "ucapan: dua kata sekaligus tidak dianggap benar");
  cek(c("lebih", { jenis: "nama", nama: "lebih" }) && c("kurang dari", { jenis: "nama", nama: "kurang" }) && !c("kurang", { jenis: "nama", nama: "lebih" }), "ucapan: lebih dan kurang");
  cek(c("maju", { jenis: "nama", nama: "maju" }) && c("mundur", { jenis: "nama", nama: "mundur" }) && !c("maju", { jenis: "nama", nama: "mundur" }), "ucapan: maju dan mundur");
  sama(K.angkaDariUcapan("angka tujuh"), [7], "ucapan: tujuh");
  sama(K.angkaDariUcapan("dua belas"), [12], "ucapan: dua belas");
  sama(K.angkaDariUcapan("5 dan 9"), [5, 9], "ucapan: angka");
  cek(c("enam", { jenis: "angka", n: 6 }) && c("eh enam deh", { jenis: "angka", n: 6 }) && !c("tujuh", { jenis: "angka", n: 6 }), "ucapan: bilangan");
  cek(K.LEBAR_ADEGAN === 300 && K.TINGGI_ADEGAN === 200, "adegan 300 x 200");
}

/* ------------------------------ Hitungan bilangan ------------------------------ */
{
  sama([0, 7, 10, 11, 15, 20, 38, 65, 99, 100].map(LC.kata), ["nol", "tujuh", "sepuluh", "sebelas", "lima belas", "dua puluh", "tiga puluh delapan", "enam puluh lima", "sembilan puluh sembilan", "seratus"], "kata bilangan");
  sama([LC.puluhanDari(94), LC.satuanDari(94), LC.namaBanding(3, 9), LC.namaBanding(9, 3), LC.namaBanding(5, 5)], [9, 4, "kecil", "besar", "sama"], "puluhan, satuan, dan nama banding");
  const r = { tipe: "rank", item: [52, 18, 87, 40, 63], sasaran: 4 };
  cek(LC.urutanKe(r) === 4 && LC.urutanKe({ ...r, sasaran: 1 }) === 1 && LC.urutanKe({ ...r, sasaran: 2 }) === 5, "urutan ke berapa dari yang paling kecil");
  sama(LC.urutanBenar([52, 18, 87]), [1, 0, 2], "urutan kartu yang benar");
  cek(LC.hasilGaris({ tipe: "garis", dari: 27, arah: "maju", langkah: 3 }) === 30 && LC.hasilGaris({ tipe: "garis", dari: 40, arah: "mundur", langkah: 2 }) === 38, "hasil kepik maju dan mundur");
  cek(LC.hasilTeka({ tipe: "teka", mulai: 54, arah: "lebih", k: 3 }) === 57 && LC.hasilTeka({ tipe: "teka", mulai: 62, arah: "kurang", k: 3 }) === 59, "hasil teka-teki");
  cek(LC.barisTurun({ tipe: "turun", dari: 23, ke: 53 }) === 3 && LC.puluhanKartu({ tipe: "kartu", a: 3, b: 8, target: "besar" }) === 8 && LC.puluhanKartu({ tipe: "kartu", a: 3, b: 8, target: "kecil" }) === 3, "baris turun dan puluhan kartu");
  cek(LC.klaimBenar({ jenis: "banding", a: 52, b: 39, katak: "a" }) && !LC.klaimBenar({ jenis: "banding", a: 39, b: 52, katak: "a" }) && LC.klaimBenar({ jenis: "banding", a: 5, b: 5, katak: "sama" }), "klaim banding");
  cek(LC.klaimBenar({ jenis: "garis", dari: 40, arah: "mundur", langkah: 2, katak: 38 }) && !LC.klaimBenar({ jenis: "garis", dari: 40, arah: "mundur", langkah: 2, katak: 42 }), "klaim kepik di tali");
  const pg = LC.pilihanGaris({ tipe: "garis", dari: 27, arah: "maju", langkah: 3 });
  cek(pg.length === 4 && pg.includes(30) && pg.includes(29) && pg.includes(31) && pg.includes(24), "pilihan garis: hasil benar, awal ikut dihitung, terlalu jauh, arah berlawanan");
  for (const n of [4, 6, 9]) cek(LC.pilihanAngka(n).length === 4 && LC.pilihanAngka(n).includes(n) && LC.pilihanAngka(n).every((x) => x >= 1 && x <= 9), `pilihan angka satu digit memuat ${n}`);
  for (const n of [57, 38]) cek(LC.pilihanAngka(n).length === 4 && LC.pilihanAngka(n).includes(n) && new Set(LC.pilihanAngka(n)).size === 4, `pilihan angka dua digit memuat ${n}`);
}

/* ------------------------------ Tiga tahap CPA ------------------------------ */
const TAHAP = [
  { nama: "Concrete", soal: D.CONCRETE, rupa: "benda", nomor: [2, 3, 4], ikon: D.TEMA_PAPAN.concrete },
  { nama: "Pictorial", soal: D.PICTORIAL, rupa: "diagram", nomor: [5, 6, 7], ikon: D.TEMA_PAPAN.pictorial },
  { nama: "Abstract", soal: D.ABSTRACT, rupa: "lambang", nomor: [8, 9, 10], ikon: D.TEMA_PAPAN.abstract },
];
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
    sama(so.langkah.map((l) => l.metode), ["igil", "tabel", "patokan", "kartu"], `${n}/${so.nomor}: urutan metode`);
    cek(bersih(so.judul + so.cerita) && tanpaDigit(so.cerita) && /^Misi Papan Pengumuman \d+:/.test(so.judul) && so.cerita.length > 20, `${n}/${so.nomor}: judul dan cerita bersih`);
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
        cek(K.cocokUcapan(LC.LABEL_NAMA[kunci.nama], kunci).cocok || kunci.nama === "sama", `${nm}: ucapan "${LC.LABEL_NAMA[kunci.nama]}" dikenali`);
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
      // Batas jawaban tiap tipe.
      if (l.tipe === "tempat") cek(l.n >= 10 && l.n <= 99 && LC.puluhanDari(l.n) >= 1 && LC.satuanDari(l.n) >= 1 && LC.nilaiTempat(l) >= 1, `${nm}: tempat, angka puluhan dan satuan tidak nol`);
      if (l.tipe === "banding") cek(l.a !== l.b && (so.cara !== "kanvas" || l.cari === "besar") && l.a >= 10 && l.b <= 99, `${nm}: banding dua bilangan berbeda`);
      if (l.tipe === "tanda") cek((so.cara === "suara" ? l.a !== l.b : true) && l.a >= 10 && l.b <= 99, `${nm}: tanda dua bilangan`);
      if (l.tipe === "garis") {
        const h = LC.hasilGaris(l);
        const j = LC.jendelaTali(l);
        cek(l.langkah >= 2 && l.langkah <= 6 && h >= 1 && h <= 100 && j.sampai - j.dari <= 12, `${nm}: kepik di tali dalam batas`);
        cek(LC.pilihanGaris(l).length === 4, `${nm}: empat pilihan bilangan berhenti`);
      }
      if (l.tipe === "langkah") cek(l.ke !== l.dari && Math.abs(l.ke - l.dari) >= 2 && Math.abs(l.ke - l.dari) <= 9, `${nm}: langkah dua sampai sembilan`);
      if (l.tipe === "urut" || l.tipe === "rank") {
        cek(new Set(l.item).size === l.item.length && l.item.length >= 4, `${nm}: bilangan berbeda, paling sedikit empat`);
        cek(l.item.join() !== [...l.item].sort((p, q) => p - q).join(), `${nm}: bilangan tampil tidak berurutan`);
        if (l.tipe === "urut") {
          const k = LC.urutanKartu(l.item);
          sama([...k].sort(), l.item.map((_, i) => i), `${nm}: urutan kartu memuat semua bilangan`);
          cek(JSON.stringify(k) !== JSON.stringify(LC.urutanBenar(l.item)), `${nm}: urutan kartu tampil tidak berurutan`);
          cek(tanpaDigit(LC.petunjukUrut(l, k[0], [])), `${nm}: petunjuk urut tanpa digit`);
        } else cek(l.sasaran >= 0 && l.sasaran < l.item.length, `${nm}: sasaran rank dalam batas`);
      }
      if (l.tipe === "kartu") cek(l.a !== l.b && l.a >= 1 && l.b <= 9 && l.b >= 1 && l.a <= 9 && tanpaDigit(LC.petunjukKartu(l)), `${nm}: kartu angka berbeda satu sampai sembilan`);
      if (l.tipe === "antara") cek(l.kanan === l.kiri + 2 && l.pilihan.length === 4 && new Set(l.pilihan).size === 4 && l.pilihan.includes(LC.tengahAntara(l)) && tanpaDigit(LC.petunjukKetuk(l)), `${nm}: antara, empat pilihan memuat bilangan tengah`);
      if (l.tipe === "patokan") cek(l.n !== l.patokan && Math.abs(l.n - l.patokan) >= 2, `${nm}: patokan berbeda dari bilangan`);
      if (l.tipe === "turun") {
        const b = LC.barisTurun(l);
        cek(l.ke > l.dari && (l.ke - l.dari) % 10 === 0 && b >= 1 && b <= 6 && tanpaDigit(LC.petunjukKetuk(l)), `${nm}: turun tabel seratus satu sampai enam baris`);
      }
      if (l.tipe === "teka") cek(LC.hasilTeka(l) >= 10 && LC.hasilTeka(l) <= 99 && LC.satuanDari(LC.hasilTeka(l)) >= 1 && l.k >= 2 && l.k <= 5, `${nm}: teka-teki dalam batas`);
    }
  }
  cek(salahAda >= 1, `${n}: paling sedikit satu Cari kesalahan`);
  cek(new Set(angka).size === angka.length, `${n}: angka jawaban tidak kembar dalam satu tahap (${angka.join(", ")})`);
  cek(new Set(kanvas).size === 4, `${n}: empat angka kanvas berbeda (${kanvas.join(", ")})`);
  cek(th.ikon.cara.length > 20 && emojiSah(th.ikon.ikon) && bersih(th.ikon.cara), `${n}: tema tahap`);
}
const angkaTahap = (soal) => soal.slice(1).map((s) => s.langkah.map((l) => LC.kunciJawab(l.langkah, s.cara))).flat().filter((k) => k && k.jenis === "angka").map((k) => k.n);
sama(angkaTahap(D.CONCRETE), [6, 5, 7, 4, 8], "Concrete: angka jawaban");
sama(angkaTahap(D.PICTORIAL), [7, 5, 9, 2, 8, 4], "Pictorial: angka jawaban");
sama(angkaTahap(D.ABSTRACT), [4, 6, 8, 2, 3], "Abstract: angka jawaban");
// Batas rupa pada sumber komponen: emoji benda hanya pada cabang rupa benda (Concrete).
{
  const lg = readFileSync(new URL("LangkahPapan.tsx", folderUrl), "utf8");
  const tg = readFileSync(new URL("TahapPapan.tsx", folderUrl), "utf8");
  const baris = lg.split("\n");
  const emojiBaris = baris.map((b, i) => [i, b]).filter(([, b]) => /\\u\{1F(37E|96B|41E|6A9|9E2)\}/.test(b));
  cek(emojiBaris.length >= 5, "komponen: emoji benda (botol, kaleng, kepik, bendera, topi) dipakai pada Concrete");
  for (const [i] of emojiBaris) {
    const konteks = baris.slice(Math.max(0, i - 4), i + 1).join(" ");
    cek(/benda|BENDA|KartuTeka|penanda/.test(konteks), `LangkahPapan.tsx baris ${i + 1}: emoji benda hanya pada cabang benda`);
  }
  cek(/rupa === "benda" \? `\$\{IKON_METODE\[ls\.metode\]\} ` : ""/.test(tg), "TahapPapan: ikon metode hanya pada Concrete");
}

/* ------------------------------ Cakupan jenis tugas dan metode global ------------------------------ */
{
  const semua = [...D.CONCRETE, ...D.PICTORIAL, ...D.ABSTRACT].flatMap((s) => s.langkah.map((l) => l.langkah.tipe));
  for (const tp of ["salah", "tempat", "banding", "tanda", "garis", "langkah", "urut", "rank", "kartu", "antara", "patokan", "turun", "teka"]) cek(semua.includes(tp), `jenis tugas ${tp} dipakai`);
  const klaim = [...D.CONCRETE, ...D.PICTORIAL, ...D.ABSTRACT].flatMap((s) => s.langkah).filter((l) => l.langkah.tipe === "salah").map((l) => l.langkah.klaim.jenis);
  cek(klaim.includes("banding") && klaim.includes("garis"), "Cari kesalahan memakai klaim banding dan kepik di tali");
  cek(LC.NAMA_METODE.igil === "Metode IGIL: Lihat Puluhan, Lihat Satuan, Pilih Kata", "nama Metode IGIL");
  cek(LC.NAMA_METODE.tabel.includes("Hundred Chart") && LC.NAMA_METODE.patokan.includes("Benchmark Numbers") && LC.NAMA_METODE.kartu.includes("Card Sort"), "tiga metode global di judul tugas");
  cek(LC.URUT_METODE.join() === "igil,tabel,patokan,kartu" && Object.values(LC.IKON_METODE).every(emojiSah), "metode dan ikon");
  cek(D.TEMA_PAPAN.concrete.nama === "Concrete" && D.TEMA_PAPAN.pictorial.nama === "Pictorial" && D.TEMA_PAPAN.abstract.nama === "Abstract", "nama tahap");
  cek(D.CONCRETE_PAPAN === D.CONCRETE && D.PICTORIAL_PAPAN === D.PICTORIAL && D.ABSTRACT_PAPAN === D.ABSTRACT, "ekspor untuk pemasang");
  cek(D.POIN_PENTING.length >= 6 && D.POIN_PENTING_SUARA.every(tanpaDigit) && D.POIN_PENTING_SUARA.every(bersih) && !/[<>=]/.test(D.POIN_PENTING_SUARA.join(" ")) && tanpaDigit(D.PENUTUP_B) && /\?$/.test(D.PENUTUP_B) && bersih(D.PENUTUP_B), "poin penting dan penutup bersih, suara tanpa digit dan lambang");
  cek(D.POIN_PENTING_SUARA.join(" ").includes("lebih besar dari lebih kecil dari sama dengan") && D.POIN_PENTING.join(" ").includes(">"), "poin penting: tanda perbandingan dibaca dengan kata");
  cek(D.MISI_PAPAN_TEKS === DS.MISI_PAPAN_TEKS && DP.MISI_PAPAN_TEKS === DS.MISI_PAPAN_TEKS && tanpaDigit(DS.MISI_PAPAN_TEKS) && bersih(DS.MISI_PAPAN_TEKS), "teks misi awal tanpa digit");
}

/* ------------------------------ Simulasi Papan Pengumuman ------------------------------ */
{
  const k0 = L.awalPapan();
  cek(k0.alat === "papan" && k0.mode === "garis" && k0.pos === DS.GARIS_TUGAS[0].mulai && k0.garisBenar.length === 0 && !k0.mundurBenar && k0.bandingBenar.length === 0 && !k0.tandaSama && k0.urutBenar.length === 0 && k0.kartuBenar.length === 0 && k0.kartuPuluhan === null, "simulasi: keadaan awal bersih");
  cek(JSON.stringify(L.mulaiLagiPapan()) === JSON.stringify(k0), "simulasi: mulai lagi sama dengan awal");
  cek(L.pilihModePapan(k0, "urut").mode === "urut" && L.URUT_MODE.length === 4, "simulasi: empat alat");
  // Tali.
  let k = k0;
  const t0 = L.tugasGaris(k);
  const salahG = L.periksaGaris(k);
  cek(!salahG.ok && salahG.k.garisBenar.length === 0 && salahG.k.salah === 1 && tanpaDigit(salahG.pesan), "simulasi: katak belum di tempat tidak dihitung");
  for (let i = 0; i < t0.langkah; i += 1) k = L.geserKatak(k, 1).k;
  cek(k.pos === L.targetGaris(k0) && tanpaDigit(L.geserKatak(k0, 1).pesan), "simulasi: katak digeser ke kanan sebanyak langkah");
  const ok1 = L.periksaGaris(k);
  cek(ok1.ok && ok1.k.garisBenar.join() === "0" && ok1.k.garisIndeks === 1 && ok1.k.pos === DS.GARIS_TUGAS[1].mulai && !ok1.k.mundurBenar && tanpaDigit(ok1.pesan), "simulasi: tugas maju benar, tugas berikutnya (mundur) muncul");
  let k2 = ok1.k;
  for (let i = 0; i < DS.GARIS_TUGAS[1].langkah; i += 1) k2 = L.geserKatak(k2, -1).k;
  const ok2 = L.periksaGaris(k2);
  cek(ok2.ok && ok2.k.mundurBenar && ok2.k.garisBenar.join() === "0,1", "simulasi: tugas mundur benar menyalakan tantangan mundur");
  cek(!L.geserKatak({ ...k0, pos: DS.GARIS_TUGAS[0].dari }, -1).ok && !L.geserKatak({ ...k0, pos: DS.GARIS_TUGAS[0].sampai }, 1).ok, "simulasi: katak tidak keluar dari tali");
  // Banding.
  let b = L.pilihModePapan(k0, "banding");
  const [a0, b0] = L.pasangBanding(b);
  const bs = L.pilihTanda(b, a0 > b0 ? "kecil" : "besar");
  cek(!bs.ok && bs.k.bandingBenar.length === 0 && bs.k.salah === 1 && tanpaDigit(bs.pesan), "simulasi: kata keliru tidak dihitung");
  const bb = L.pilihTanda(b, LC.namaBanding(a0, b0));
  cek(bb.ok && bb.k.bandingBenar.join() === "0" && bb.k.bandingIndeks === 1 && !bb.k.tandaSama && tanpaDigit(bb.pesan), "simulasi: kata tepat dihitung, pasangan berikutnya");
  for (let i = 0; i < DS.BANDING_PASANG.length; i += 1) {
    const [x, y] = L.pasangBanding(b);
    b = L.pilihTanda(b, LC.namaBanding(x, y)).k;
  }
  cek(b.bandingBenar.length === DS.BANDING_PASANG.length && b.tandaSama, "simulasi: semua pasangan benar, pasangan sama besar menyalakan tantangan sama dengan");
  cek(DS.BANDING_PASANG.some(([x, y]) => x === y) && DS.BANDING_PASANG.some(([x, y]) => x > y) && DS.BANDING_PASANG.some(([x, y]) => x < y), "simulasi: pasangan memuat lebih besar, lebih kecil, dan sama");
  // Urut.
  let u = L.pilihModePapan(k0, "urut");
  const item = L.kumpulanUrut(u);
  const benarUrut = LC.urutanBenar(item);
  const ukel = L.ketukUrut(u, benarUrut[1]);
  cek(!ukel.ok && ukel.k.urutKetuk.length === 0 && ukel.k.salah === 1 && tanpaDigit(ukel.pesan), "simulasi: kartu yang bukan paling kecil ditolak");
  for (let i = 0; i < item.length - 1; i += 1) u = L.ketukUrut(u, benarUrut[i]).k;
  cek(u.urutKetuk.length === item.length - 1 && u.urutBenar.length === 0, "simulasi: kartu benar satu per satu belum selesai");
  const uks = L.ketukUrut(u, benarUrut[item.length - 1]);
  cek(uks.ok && uks.k.urutBenar.join() === "0" && uks.k.urutKetuk.length === 0 && uks.k.urutIndeks === 1 && tanpaDigit(uks.pesan), "simulasi: semua kartu benar dihitung, kumpulan berikutnya");
  cek(DS.URUT_SET.every((s) => new Set(s).size === s.length && s.length >= 4 && LC.urutanKartu(s).join() !== LC.urutanBenar(s).join()), "simulasi: kumpulan kartu berbeda dan tampil tidak berurutan");
  // Kartu.
  let c = L.pilihModePapan(k0, "kartu");
  const pk = L.pasangKartu(c);
  cek(!L.periksaKartu(c).ok && L.periksaKartu(c).k.kartuBenar.length === 0, "simulasi: periksa tanpa memilih kartu ditolak");
  const salahK = pk.target === "besar" ? Math.min(pk.a, pk.b) : Math.max(pk.a, pk.b);
  const kk = L.periksaKartu(L.pasangPuluhan(c, salahK));
  cek(!kk.ok && kk.k.kartuBenar.length === 0 && kk.k.salah === 1 && tanpaDigit(kk.pesan), "simulasi: kartu keliru di tempat puluhan tidak dihitung");
  const benarK = pk.target === "besar" ? Math.max(pk.a, pk.b) : Math.min(pk.a, pk.b);
  const kb = L.periksaKartu(L.pasangPuluhan(c, benarK));
  cek(kb.ok && kb.k.kartuBenar.join() === "0" && kb.k.kartuIndeks === 1 && kb.k.kartuPuluhan === null && tanpaDigit(kb.pesan), "simulasi: kartu tepat dihitung, pasangan berikutnya");
  cek(L.pasangPuluhan(L.pasangPuluhan(c, 3), 3).kartuPuluhan === null, "simulasi: mengetuk kartu yang sama membatalkan pilihan");
  cek(DS.KARTU_ANGKA.every((p) => p.a !== p.b && p.a >= 1 && p.b <= 9) && DS.KARTU_ANGKA.some((p) => p.target === "besar") && DS.KARTU_ANGKA.some((p) => p.target === "kecil"), "simulasi: pasangan kartu angka berbeda, ada terbesar dan terkecil");
  // Teks.
  cek(Object.values(L.SUARA_MODE).every((t) => tanpaDigit(t) && bersih(t)) && L.URUT_MODE.every((md) => L.kalimatPapan(L.pilihModePapan(k0, md)).length > 20 && tanpaDigit(L.kalimatPapan(L.pilihModePapan(k0, md)))), "simulasi: ucapan tiap alat tanpa digit");
  // Berbeda dari Story: tidak ada bilangan Story pada data simulasi, dan penanda bukan kepik.
  const angkaSim = [...DS.GARIS_TUGAS.flatMap((g) => [g.mulai, g.mulai + g.langkah, g.mulai - g.langkah]), ...DS.BANDING_PASANG.flat(), ...DS.URUT_SET.flat()];
  for (const n of angkaSim) cek(!ANGKA_STORY.has(n), `simulasi: bilangan ${n} bukan bilangan Story`);
  cek(DS.PENANDA_SIM !== "\u{1F41E}" && emojiSah(DS.PENANDA_SIM), "simulasi: penanda katak, bukan kepik Story");
  cek(DS.GARIS_TUGAS.every((g) => g.mulai >= g.dari && g.mulai <= g.sampai && (g.arah === "maju" ? g.mulai + g.langkah : g.mulai - g.langkah) >= g.dari && (g.arah === "maju" ? g.mulai + g.langkah : g.mulai - g.langkah) <= g.sampai && g.sampai - g.dari <= 12) && DS.GARIS_TUGAS.some((g) => g.arah === "mundur"), "simulasi: tugas katak di dalam tali, ada tugas mundur");
}

/* ------------------------------ Misi ------------------------------ */
{
  const awal = L.awalPapan();
  const d = MK.daftarMisiK2Bab7("B");
  cek(d === MK.MISI_B && d.length === 6 && d.filter((x) => x.wajib).length === 4 && d.every((x) => x.id.startsWith("b-")), "misi: enam misi, empat wajib, id berawalan b-");
  cek(d.every((x) => x.teks.length >= 10 && x.teks.length <= 120 && tanpaDigit(x.teks) && bersih(x.teks)), "misi: teks 10-120 huruf tanpa digit dan kata terlarang");
  cek(d.every((x) => !/(skor|nilai|tebak)/i.test(x.teks)), "misi: tanpa skor");
  cek(S.misiBaru(d, awal, new Set()).length === 0, "misi: keadaan awal tidak memenuhi misi");
  cek(d.every((x) => !x.cek({ alat: "kerangka" })), "misi: alat lain tidak memenuhi misi");
  // Alur lengkap melalui logika.
  let k = awal;
  for (let i = 0; i < DS.GARIS_TUGAS[0].langkah; i += 1) k = L.geserKatak(k, 1).k;
  k = L.periksaGaris(k).k;
  for (let i = 0; i < DS.GARIS_TUGAS[1].langkah; i += 1) k = L.geserKatak(k, -1).k;
  k = L.periksaGaris(k).k;
  for (let i = 0; i < DS.BANDING_PASANG.length; i += 1) {
    const [x, y] = L.pasangBanding(k);
    k = L.pilihTanda(k, LC.namaBanding(x, y)).k;
  }
  {
    const it = L.kumpulanUrut(k);
    for (const j of LC.urutanBenar(it)) k = L.ketukUrut(k, j).k;
  }
  {
    const p = L.pasangKartu(k);
    k = L.periksaKartu(L.pasangPuluhan(k, p.target === "besar" ? Math.max(p.a, p.b) : Math.min(p.a, p.b))).k;
  }
  sama(S.misiBaru(d, k, new Set()), ["b-garis", "b-banding", "b-urut", "b-kartu", "b-sama", "b-mundur"], "misi: semua tercapai lewat logika simulasi");
  const wajib = d.filter((x) => x.wajib).map((x) => x.id);
  cek(S.wajibSelesai(d, new Set(wajib)) && !S.wajibSelesai(d, new Set(["b-garis"])), "misi: gerbang wajib");
  cek(S.misiBaru(d, { ...awal, salah: 9, mode: "kartu", pos: 99, garisIndeks: 2, bandingIndeks: 3, urutIndeks: 1, urutKetuk: [0, 1], kartuIndeks: 2, kartuPuluhan: 3 }, new Set()).length === 0, "misi: percobaan keliru dan geseran tidak dihitung sebagai misi");
}

/* ------------------------------ Berkas ------------------------------ */
{
  const berkas = readdirSync(folderUrl).filter((f) => /\.(ts|tsx)$/.test(f));
  for (const f of ["logika.ts", "logika-cpa.ts", "periksa.ts", "data.ts", "data-peta.ts", "data-sim.ts", "data-kartu.ts", "JawabPapan.tsx", "LangkahPapan.tsx", "TahapPapan.tsx", "TaliGaris.tsx", "SpandukBersih.tsx", "SimulasiPapanPengumuman.tsx"]) cek(berkas.includes(f), `berkas ${f} ada`);
  const lihat = [...berkas.map((f) => ["papan-k2b7b/" + f, readFileSync(new URL(f, folderUrl), "utf8")]), ["misi-k2bab7.ts", readFileSync(new URL("../src/components/modul/misi-k2bab7.ts", import.meta.url), "utf8")]];
  for (const [f, s] of lihat) {
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d || c.codePointAt(0) === 0x1f6de), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}/i.test(s), `${f}: kode emoji tidak melewati U+1FA95`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    const tanpaKomentar = s.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");
    const literal = [...tanpaKomentar.matchAll(/"((?:[^"\\\n]|\\.)*)"|`((?:[^`\\]|\\.)*)`/g)].map((m) => m[1] ?? m[2]).filter((t) => /[a-z]{3,} [a-z]{2,}/i.test(t));
    const teksJsx = [...tanpaKomentar.matchAll(/>\s*([A-Za-z][^<>{}\n]{6,})\s*</g)].map((m) => m[1]);
    for (const t of [...literal, ...teksJsx]) {
      if (/^(use client|rounded|flex|grid|text-|min-|bg-|border|mx-|px-|py-|space-|block|w-|h-|absolute|relative|pointer|animate|sm:)/.test(t) || /(rounded|flex |grid-|text-\[|min-h|bg-\[|border-)/.test(t)) continue;
      cek(!TERLARANG.test(t.replace(/kunci(Jawab)?|\$\{[^}]*\}/g, "")), `${f}: teks layar tanpa kata terlarang ("${t.slice(0, 50)}")`);
    }
  }
}

console.log(`Lulus ${lulus}, gagal ${gagal}`);
process.exit(gagal ? 1 : 0);
