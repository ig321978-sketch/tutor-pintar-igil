// Uji Mind-map (Petak Empat), Infografis (Jadwal Panen), dan tahap Concrete, Pictorial, Abstract Kelas 2 Bab 5 Sub-Bab C ("Panen Raya Pak Joko"),
// seperempat dari benda utuh, akhir cerita Kebun Sekolah. Simulasi Meja Panen diuji di scripts/uji-panen-sim-k2b5c.mjs.
// Memeriksa: petak kebun (Masalah tiga, Penyelesaian tujuh bernomor memuat semua metode Story, Hasil empat), jadwal panen dari data Story, CPA dua belas tugas per tahap
// (Klik, Kanvas, Suara x empat metode) dengan jawaban beragam (pilih pembagian adil, tarik dua garis, warnai seperempat, susun pita, urutkan langkah, pilih angka,
// satu angka, satu kata) dan Cari kesalahan di tiap tahap, kunci dihitung dari data (luas bagian dari geometri), angka jawaban tidak kembar per tahap, tugas yang
// langsung siap (jebakan tombol Periksa macet), instruksi tanpa digit, petunjuk salah, pengenal ucapan, batas rupa, emoji, kata terlarang, akhir baris.
// Jalankan: node --no-warnings scripts/uji-panen-k2b5c.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const G = await import("../src/components/modul/panen-k2b5c/geometri.ts");
const DP = await import("../src/components/modul/panen-k2b5c/data-peta.ts");
const LC = await import("../src/components/modul/panen-k2b5c/logika-cpa.ts");
const D = await import("../src/components/modul/panen-k2b5c/data.ts");
const K = await import("../src/components/modul/panen-k2b5c/periksa.ts");
const LL = await import("../src/components/modul/lemari-k1b1a/logika.ts");
const folderUrl = new URL("../src/components/modul/panen-k2b5c/", import.meta.url);

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
const bersih = (t) => !TERLARANG.test(t) && !/buku|kelompok|bernilai|tebak/i.test(t);
const emojiSah = (s) => [...s].every((c) => c.codePointAt(0) <= 0x1fa95 && c.codePointAt(0) !== 0x200d && c.codePointAt(0) !== 0x1f6de);
const ADA_EMOJI = /[\u{1F000}-\u{1FFFF}\u{2600}-\u{27BF}]/u;

/* ------------------------------ Mind-map petak empat ------------------------------ */
{
  const t = DP.TEMPAT_PETAK;
  sama(["masalah", "metode", "hasil"].map((k) => t.filter((x) => x.kelompok === k).length), [3, 7, 4], "petak: tiga masalah, tujuh petak bernomor, empat hasil");
  cek(new Set(t.map((x) => x.kunci)).size === t.length && t.every((x) => x.kunci.length <= 44 && tanpaDigit(x.kunci)), "petak: label unik, pendek, tanpa digit");
  sama(t.filter((x) => x.kelompok === "metode").map((x) => x.urutan), [1, 2, 3, 4, 5, 6, 7], "petak: petak bernomor satu sampai tujuh");
  const gab = t.filter((x) => x.kelompok === "metode").map((x) => x.kunci).join(" | ").toLowerCase();
  for (const k of ["dua bagian sama besar", "dua lagi", "setengah dari setengah", "periksa", "belah dua kali", "dinding pecahan", "lipat dan warnai"]) cek(gab.includes(k), `petak: langkah memuat "${k}"`);
  const hasil = t.filter((x) => x.kelompok === "hasil").map((x) => x.kunci).join(" | ").toLowerCase();
  for (const k of ["empat bagian sama besar adalah seperempat", "dua seperempat sama dengan satu setengah", "empat seperempat sama dengan satu utuh", "tegak lurus"]) cek(hasil.includes(k), `petak: hasil memuat "${k}"`);
  const masalah = t.filter((x) => x.kelompok === "masalah").map((x) => x.kunci).join(" | ").toLowerCase();
  cek(/dibagi empat/.test(masalah) && /tidak sama besar/.test(masalah) && /miring/.test(masalah), "petak: masalah dibagi empat, tidak sama besar, garis miring");
  cek(t.every((x) => !/\b(chacha|dika|nia|bu sari|pak joko|labu|regu|kebun|jerami|panen|melon)\b/i.test(x.kunci)), "petak: label hanya poin pelajaran");
  cek(t.every((x) => bersih(x.kunci)), "petak: label tanpa kata terlarang");
  cek(tanpaDigit(DP.SUARA_PETAK + DP.PETUNJUK_URUT_PETAK) && bersih(DP.SUARA_PETAK) && DP.PUSAT_PETAK.length > 5 && tanpaDigit(DP.PUSAT_PETAK), "petak: suara dan pusat tanpa digit");
  cek(Object.values(DP.KELOMPOK_PETAK).every((g) => bersih(g.petunjuk) && tanpaDigit(g.petunjuk) && emojiSah(g.ikon)), "petak: petunjuk kelompok bersih");
  const lb = LL.labelDari(t, 97);
  let ok = true;
  for (const x of t)
    for (const l of lb) {
      const harus = x.urutan !== undefined ? l.teks === x.kunci : t.find((y) => y.kunci === l.teks).kelompok === x.kelompok;
      if (LL.cocokKelompok(t, x, l) !== harus) ok = false;
    }
  cek(ok, "petak: petak bernomor hanya menerima labelnya sendiri");
}

/* ------------------------------ Infografis jadwal panen ------------------------------ */
{
  const b = DP.BARIS_JADWAL;
  sama(b.map((x) => x.nama), ["Labu", "Petak tanah", "Kertas persegi", "Kertas pojok", "Lingkaran"], "jadwal: benda dari Story");
  sama(DP.TEMPAT_JADWAL.length, 15, "jadwal: lima belas kotak");
  cek(new Set(DP.TEMPAT_JADWAL.map((x) => x.kunci)).size === 15, "jadwal: label unik");
  cek(DP.TEMPAT_JADWAL.every((x) => x.kunci.length <= 30 && bersih(x.kunci) && tanpaDigit(x.kunci)) && tanpaDigit(DP.SUARA_JADWAL) && bersih(DP.SUARA_JADWAL), "jadwal: label pendek, suara tanpa digit");
  cek(DP.KOLOM_JADWAL.length === 3 && Object.keys(DP.KELOMPOK_JADWAL).every((k) => DP.TEMPAT_JADWAL.some((x) => x.kelompok === k)), "jadwal: tiga kolom");
  cek(Object.values(DP.KELOMPOK_JADWAL).every((x) => tanpaDigit(x) && bersih(x)) && b.every((x) => emojiSah(x.ikon)), "jadwal: petunjuk kolom bersih, emoji sah");
  cek(b[0].cara === "dibelah dua kali" && b[1].cara === "dua tali tegak lurus" && b[2].cara === "lipat tegak lalu mendatar" && b[3].cara === "lipat pojok ke pojok" && b[4].cara === "dua garis lewat pusat", "jadwal: cara dari Story");
  // Petunjuk salah menyebut baris yang keliru dan kolom yang keliru (logika sama dengan komponen: label milik baris lain).
  const asal = DP.TEMPAT_JADWAL.find((x) => x.kunci === b[1].hasil);
  cek(asal.id === "j1-hasil" && asal.kelompok === "hasil", "jadwal: label hasil milik baris petak tanah");
}

/* ------------------------------ Geometri ringkas ------------------------------ */
{
  const g = (a, d) => (d === undefined ? { a } : { a, d });
  cek(G.empatSama(G.bagiBangun("lingkaran", [g(0), g(90)])) && G.empatSama(G.bagiBangun("persegi", [g(90), g(0)])) && G.empatSama(G.bagiBangun("persegi", [g(45), g(135)])), "geometri: dua garis tegak lurus membuat empat bagian sama besar");
  cek(!G.empatSama(G.bagiBangun("lingkaran", [g(0), g(45)])) && !G.empatSama(G.bagiBangun("persegi", [g(90), g(45)])), "geometri: dua garis tidak tegak lurus tidak sama besar");
  cek(G.empatSama(G.bagiBangun("persegi", [g(30), g(120)])), "geometri: dua garis tegak lurus bersudut sembarang juga membagi persegi sama besar");
  sama(G.bagiBangun("persegi", [g(90, -1 / 3), g(90, 1 / 3)]).length, 3, "geometri: dua garis sejajar membuat tiga bagian");
  cek(Math.abs(G.bagiBangun("persegi", [g(0, 0.4), g(90)]).reduce((s, x) => s + x.luas, 0) - 1) < 1e-6, "geometri: jumlah luas bagian satu");
}

/* ------------------------------ CPA: struktur ------------------------------ */
const TAHAP = { concrete: [D.CONCRETE_PANEN, "benda"], pictorial: [D.PICTORIAL_PANEN, "diagram"], abstract: [D.ABSTRACT_PANEN, "lambang"] };
const semuaLangkah = [];
for (const [nama, [soal, rupa]] of Object.entries(TAHAP)) for (const so of soal) for (const ls of so.langkah) semuaLangkah.push({ tahap: nama, rupa, cara: so.cara, so, ls, l: ls.langkah });
sama(D.CONCRETE_PANEN.map((s) => s.nomor).concat(D.PICTORIAL_PANEN.map((s) => s.nomor), D.ABSTRACT_PANEN.map((s) => s.nomor)), [2, 3, 4, 5, 6, 7, 8, 9, 10], "nomor misi berlanjut dari Simulasi");
for (const [nama, [soal]] of Object.entries(TAHAP)) {
  sama(soal.map((s) => s.cara), ["klik", "kanvas", "suara"], `${nama}: tiga cara berurutan`);
  cek(soal.every((s) => s.langkah.length === 4), `${nama}: empat metode per cara (dua belas tugas)`);
  for (const so of soal) sama(so.langkah.map((x) => x.metode), ["igil", "belah", "dinding", "lipat"], `${nama}/${so.nomor}: urutan metode`);
  for (const so of soal) cek(so.langkah.every((x) => x.cara === so.cara && x.suara === x.judul && x.suara.length > 20), `${nama}/${so.nomor}: cara, suara, dan judul`);
  const salah = soal.flatMap((s) => s.langkah).filter((x) => x.langkah.tipe === "salah");
  cek(salah.length >= 1, `${nama}: paling sedikit satu Cari kesalahan (ada ${salah.length})`);
  for (const x of salah) {
    const l = x.langkah;
    cek(l.alasan.length === 3 && new Set(l.alasan).size === 3 && l.benar >= 0 && l.benar < 3 && l.keliru.length > 20 && l.kataTokoh.length > 10, `${nama}: cari kesalahan lengkap (${l.tokoh})`);
    const geser = (l.benar + 1 + (l.alasan[l.benar].length % 2)) % 3;
    const urut = [0, 1, 2].map((i) => (i + geser) % 3);
    cek(urut.indexOf(l.benar) !== 0, `${nama}: alasan benar bukan tombol pertama (${l.tokoh})`);
    cek(["Chacha", "Dika", "Nia"].includes(l.tokoh), `${nama}: tokoh Cari kesalahan`);
    cek(x.metode === "igil" && x.cara === "klik", `${nama}: Cari kesalahan memakai metode IGIL pada cara klik`);
    cek(LC.klaimBenar(l.klaim) === false, `${nama}: klaim ${l.tokoh} salah menurut hitungan program`);
  }
  // Jenis tugas menurut cara.
  const jenis = (cara) => soal.find((s) => s.cara === cara).langkah.map((x) => x.langkah.tipe);
  cek(jenis("klik").every((t) => ["salah", "adil", "garis", "warnai", "susun", "urut", "pilih"].includes(t)), `${nama}: klik berupa kegiatan atau pilihan`);
  cek(jenis("kanvas").every((t) => t === "hitung"), `${nama}: kanvas berupa hitungan satu angka`);
  cek(jenis("suara").every((t) => t === "nama" || t === "hitung"), `${nama}: suara berupa satu kata atau bilangan`);
  cek(new Set(jenis("klik")).size >= 3, `${nama}: paling sedikit tiga jenis kegiatan klik berbeda`);
}
sama(TAHAP.concrete[0][0].langkah.map((x) => x.langkah.tipe), ["salah", "adil", "susun", "warnai"], "Concrete klik: cari kesalahan, pembagian adil, susun pita, warnai");
sama(TAHAP.pictorial[0][0].langkah.map((x) => x.langkah.tipe), ["salah", "garis", "susun", "warnai"], "Pictorial klik: cari kesalahan, dua garis, susun pita, warnai");
sama(TAHAP.abstract[0][0].langkah.map((x) => x.langkah.tipe), ["salah", "urut", "pilih", "pilih"], "Abstract klik: cari kesalahan, urut, pilih, pilih");

/* ------------------------------ CPA: data sah dan kunci dihitung dari data ------------------------------ */
for (const { tahap, rupa, cara, l, ls } of semuaLangkah) {
  const nama = `${tahap}/${ls.metode}/${cara}`;
  const tiapPotong = (p) => p.every((x) => typeof x.a === "number" && x.a >= 0 && x.a < 180);
  if (l.tipe === "adil") {
    cek(l.pilihan.length === 4 && l.pilihan.every(tiapPotong) && LC.pilihanAdil(l).length === 1 && LC.pilihanAdil(l)[0] !== 0, `${nama}: empat pilihan, tepat satu adil, bukan yang pertama`);
    cek(l.pilihan.every((p) => G.bagiBangun(l.bangun, p).length >= 3), `${nama}: pilihan menghasilkan paling sedikit tiga bagian`);
    cek(l.pilihan.some((p) => G.bagiBangun(l.bangun, p).length !== 4) && l.pilihan.some((p) => G.bagiBangun(l.bangun, p).length === 4 && !LC.adilEmpat(l.bangun, p)), `${nama}: pengecoh berupa jumlah bagian keliru dan bagian tidak sama besar`);
  }
  if (l.tipe === "garis") {
    cek(l.kandidat.length === 4, `${nama}: empat garis pilihan`);
    const sah = [];
    for (let i = 0; i < 4; i += 1) for (let j = i + 1; j < 4; j += 1) if (LC.garisSah(l, i, j)) sah.push(`${i}${j}`);
    sama(sah, ["01", "23"], `${nama}: pasangan garis yang sah dihitung dari luas`);
  }
  if (l.tipe === "warnai") {
    const b = G.bagiBangun(l.bangun, l.potong);
    cek(G.semuaSama(b) && LC.jumlahWarna(l) >= 1 && LC.jumlahWarna(l) <= 3, `${nama}: bagian sama besar, banyak yang diwarnai satu sampai tiga (${LC.jumlahWarna(l)})`);
    const w = Array.from({ length: LC.jumlahWarna(l) }, (_, i) => i);
    cek(LC.seperempat(l.bangun, l.potong, w) && !LC.seperempat(l.bangun, l.potong, [...w, w.length]) && !LC.seperempat(l.bangun, l.potong, []), `${nama}: tepat seperempat bila ${w.length} bagian diwarnai`);
    cek(LC.jumlahWarna(l) === (b.length === 4 ? 1 : 2), `${nama}: empat bagian diwarnai satu, delapan bagian diwarnai dua`);
  }
  if (l.tipe === "susun") cek(["setengah", "utuh"].includes(l.sasaran) && (l.sasaran === "utuh") === l.izinSetengah, `${nama}: sasaran dan izin pita setengah`);
  if (l.tipe === "urut") {
    cek(l.langkah.length === 4 && l.petunjuk.length === 4 && l.petunjuk.slice(1).every((p) => p.length > 20) && new Set(l.langkah).size === 4, `${nama}: empat langkah dengan petunjuk`);
    const k = LC.urutanKartu(4);
    cek(k.length === 4 && new Set(k).size === 4 && k.some((v, i) => v !== i) && k[0] !== 0, `${nama}: kartu langkah diacak tetap, bukan urutan benar`);
  }
  if (l.tipe === "pilih") {
    const k = LC.kunciJawab(l, "klik");
    const p = LC.pilihanAngka(k.n);
    cek(k.jenis === "angka" && p.length === 4 && p.includes(k.n) && new Set(p).size === 4 && p.every((n) => n >= 1 && n <= 9), `${nama}: pilihan angka memuat kunci`);
    cek(k.n === (l.jenis === "fakta" ? LC.UKURAN_SATUAN[l.besar] / LC.UKURAN_SATUAN[l.kecil] : 2 ** l.kali), `${nama}: kunci pilih dihitung dari data`);
  }
  if (l.tipe === "hitung") {
    const k = LC.kunciJawab(l, cara);
    cek(cara !== "klik" && k.jenis === "angka" && k.n >= 1 && k.n <= 9, `${nama}: jawaban hitung satu angka (${k?.n})`);
    const ulang = l.jenis === "potong" ? l.n * l.p : l.jenis === "lipatan" ? l.n * 2 : l.jenis === "dinding" ? l.baris.reduce((s, b) => s + [1, 2, 4][b], 0) : l.jenis === "sisa" ? 4 - l.berwarna : l.jenis === "fakta" ? (l.besar === "utuh" ? (l.kecil === "seperempat" ? 4 : 2) : 2) : l.bagian === 4 ? 2 : -1;
    cek(k.n === ulang, `${nama}: kunci hitung ${l.jenis} dihitung ulang dari data`);
    if (l.jenis === "potong") cek(l.n * l.p <= 9 && l.n <= 4 && (rupa !== "benda" || LC.BENDA[l.benda]), `${nama}: potong paling banyak sembilan`);
    if (rupa !== "lambang") cek(l.jenis !== "fakta" && l.jenis !== "kali", `${nama}: hitung fakta dan kali hanya di Abstract`);
  }
  if (l.tipe === "nama") {
    const k = LC.kunciJawab(l, cara);
    cek(cara === "suara" && k.jenis === "nama" && LC.URUT_NAMA.includes(k.nama), `${nama}: jawaban satu kata dikenal`);
    if (l.jenis === "sebut") cek((k.nama === "setengah" && G.bagiBangun(l.bangun, l.potong).length === 2) || (k.nama === "seperempat" && G.empatSama(G.bagiBangun(l.bangun, l.potong))), `${nama}: nama dihitung dari jumlah bagian sama besar`);
    if (l.jenis === "adil") cek(k.nama === (G.semuaSama(G.bagiBangun(l.bangun, l.potong)) ? "sama besar" : "bukan"), `${nama}: sama besar atau bukan dihitung dari luas`);
    if (l.jenis === "satuan") cek((l.n === 2 && k.nama === "setengah") || (l.n === 4 && k.nama === "utuh"), `${nama}: pita seperempat berderet`);
    cek(LC.pilihanNamaDari(k.nama).length === 4 && LC.pilihanNamaDari(k.nama).includes(k.nama), `${nama}: pilihan cadangan memuat kunci`);
  }
  if (l.tipe === "salah") {
    cek(l.klaim.jenis === "gambar" ? LC.bagianDari(l.klaim.bangun, l.klaim.potong).length >= 3 : l.klaim.n >= 1 && l.klaim.n <= 4, `${nama}: klaim sah`);
  }
}

// Angka jawaban Tulis di kanvas per tahap tidak kembar (tugas berjawaban kata tidak dihitung).
const ANGKA_TAHAP = {};
for (const [nama, [soal]] of Object.entries(TAHAP)) {
  const ang = soal.find((s) => s.cara === "kanvas").langkah.map((x) => LC.kunciJawab(x.langkah, "kanvas").n);
  ANGKA_TAHAP[nama] = ang;
  cek(ang.length === 4 && new Set(ang).size === 4, `${nama}: empat angka kanvas tidak kembar (${ang.join(", ")})`);
  cek(ang.every((n) => n >= 1 && n <= 9), `${nama}: angka kanvas satu angka (${ang.join(", ")})`);
}
sama(ANGKA_TAHAP, { concrete: [8, 6, 7, 3], pictorial: [3, 8, 5, 6], abstract: [4, 2, 6, 8] }, "angka jawaban kanvas per tahap");
cek(semuaLangkah.every(({ cara, l }) => cara !== "kanvas" || LC.kunciJawab(l, "kanvas").jenis === "angka"), "semua kanvas berjawab satu angka");

// Jenis jawaban beragam di seluruh modul.
{
  const tipe = new Set(semuaLangkah.map(({ l }) => l.tipe));
  for (const t of ["salah", "adil", "garis", "warnai", "susun", "urut", "pilih", "hitung", "nama"]) cek(tipe.has(t), `jenis tugas ${t} dipakai`);
  const kataSuara = new Set(semuaLangkah.filter(({ cara, l }) => cara === "suara" && l.tipe === "nama").map(({ l }) => LC.kunciJawab(l, "suara").nama));
  for (const n of ["setengah", "seperempat", "utuh", "sama besar", "bukan"]) cek(kataSuara.has(n), `jawaban suara ${n} dipakai`);
  cek(semuaLangkah.some(({ cara, l }) => cara === "suara" && l.tipe === "hitung"), "ada jawaban bilangan yang diucapkan");
}

/* ------------------------------ CPA: tugas langsung siap (jebakan tombol macet) ------------------------------ */
for (const { tahap, rupa, cara, l, ls } of semuaLangkah) {
  const nama = `${tahap}/${ls.metode}/${cara}`;
  const siap = LC.siapLangsung(l, rupa, cara);
  cek(siap === (cara !== "klik" || l.tipe === "pilih"), `${nama}: siap langsung hanya kanvas, suara, dan pilih angka`);
  for (const r of ["benda", "diagram", "lambang"]) cek(LC.siapLangsung(l, r, cara) === siap, `${nama}: siap langsung tidak bergantung rupa (${r})`);
  const k = LC.kunciJawab(l, cara);
  cek(siap ? k !== null : k === null, `${nama}: tugas yang siap langsung punya kunci, tugas kegiatan tidak`);
}

/* ------------------------------ CPA: instruksi, kalimat, petunjuk ------------------------------ */
{
  const semua = [];
  for (const { rupa, cara, l, ls, so } of semuaLangkah) {
    const t = [ls.judul, ls.suara, LC.kalimatKunci(l, cara, rupa), LC.kalimatTanya(l, cara), so.cerita];
    if (l.tipe === "salah") t.push(l.kataTokoh, ...l.alasan, l.keliru);
    if (l.tipe === "urut") t.push(...l.langkah, ...l.petunjuk.slice(1));
    const k = LC.kunciJawab(l, cara);
    if (k?.jenis === "angka") for (const n of [k.n + 1, Math.max(1, k.n - 1)]) t.push(LC.petunjukSalah(l, cara, n, rupa));
    if (k?.jenis === "nama") for (const n of ["setengah", "seperempat", "utuh", "bukan", "sama besar"]) if (n !== k.nama) t.push(LC.petunjukSalah(l, cara, n, rupa));
    semua.push(...t);
  }
  cek(semua.every((t) => tanpaDigit(t) && bersih(t) && t.length > 5), `instruksi, kalimat, dan petunjuk tanpa digit dan kata terlarang (${semua.length} teks)`);
  const kalimatUnik = new Set(semuaLangkah.map(({ ls }) => ls.judul));
  cek(kalimatUnik.size === semuaLangkah.length, "setiap tugas punya instruksi sendiri");
  // Petunjuk salah menunjuk kesalahannya.
  const adil = semuaLangkah.find(({ l }) => l.tipe === "adil").l;
  cek(/tiga bagian/.test(LC.petunjukBagi(adil.bangun, adil.pilihan[1])) && /tidak sama besar/.test(LC.petunjukBagi(adil.bangun, adil.pilihan[0])) && /tegak lurus/.test(LC.petunjukBagi(adil.bangun, adil.pilihan[0])), "petunjuk bagi: jumlah bagian dan tegak lurus");
  const w = semuaLangkah.find(({ l }) => l.tipe === "warnai").l;
  cek(/Belum ada/.test(LC.petunjukWarnai(w, [])) && /terlalu banyak/.test(LC.petunjukWarnai(w, [0, 1])) , "petunjuk warnai: belum ada dan terlalu banyak");
  const w8 = semuaLangkah.filter(({ l }) => l.tipe === "warnai").map(({ l }) => l).find((x) => G.bagiBangun(x.bangun, x.potong).length === 8);
  cek(/sedikit/.test(LC.petunjukWarnai(w8, [0])), "petunjuk warnai: terlalu sedikit pada delapan bagian");
  const s = { tipe: "susun", sasaran: "setengah", izinSetengah: false };
  cek(/Belum ada pita/.test(LC.petunjukSusun(s, 0)) && /lebih pendek/.test(LC.petunjukSusun(s, 1)) && /lebih panjang/.test(LC.petunjukSusun(s, 3)), "petunjuk susun: kurang dan lebih");
  const u = semuaLangkah.find(({ l }) => l.tipe === "urut").l;
  cek(/belum ada/i.test(LC.petunjukUrut(u, 1)) && LC.petunjukUrut(u, 3).length > 20, "petunjuk urut: menunjuk langkah yang belum waktunya");
  // Kalimat jawaban benar menyebut hubungan yang benar.
  cek(/seperempat/.test(LC.kalimatKunci({ tipe: "nama", jenis: "setengahSetengah" }, "suara")) && /Dua seperempat/.test(LC.kalimatKunci({ tipe: "nama", jenis: "satuan", n: 2 }, "suara", "lambang")), "kalimat kunci: seperempat dan dua seperempat");
  cek(/lawan|tegak lurus/.test(LC.kalimatKunci(adil, "klik")) , "kalimat kunci: dua garis tegak lurus");
}

/* ------------------------------ Pengenal ucapan ------------------------------ */
{
  const nama = (t) => K.namaDariUcapan(t);
  sama(nama("seperempat"), ["seperempat"], "ucapan: seperempat");
  sama(nama("se per empat"), ["seperempat"], "ucapan: se per empat");
  sama(nama("satu per empat"), ["seperempat"], "ucapan: satu per empat");
  sama(nama("1/4"), ["seperempat"], "ucapan: 1/4");
  sama(nama("setengahnya"), ["setengah"], "ucapan: setengahnya");
  sama(nama("separuh"), ["setengah"], "ucapan: separuh");
  sama(nama("utuh"), ["utuh"], "ucapan: utuh");
  sama(nama("sama besar"), ["sama besar"], "ucapan: sama besar");
  sama(nama("tidak sama besar"), ["bukan"], "ucapan: tidak sama besar berarti bukan");
  sama(nama("bukan"), ["bukan"], "ucapan: bukan");
  cek(K.cocokUcapan("seperempat", { jenis: "nama", nama: "seperempat" }).cocok && !K.cocokUcapan("setengah", { jenis: "nama", nama: "seperempat" }).cocok, "cocok: seperempat dan setengah dibedakan");
  cek(!K.cocokUcapan("bukan seperempat", { jenis: "nama", nama: "seperempat" }).cocok && K.cocokUcapan("bukan seperempat", { jenis: "nama", nama: "bukan" }).cocok, "cocok: bukan seperempat bukan jawaban seperempat");
  cek(K.cocokUcapan("ya sama besar semuanya", { jenis: "nama", nama: "sama besar" }).cocok && K.cocokUcapan("tidak sama besar", { jenis: "nama", nama: "bukan" }).cocok, "cocok: sama besar dan tidak sama besar");
  sama(K.angkaDariUcapan("delapan"), [8], "ucapan: delapan");
  sama(K.angkaDariUcapan("seperempat"), [], "ucapan: seperempat bukan bilangan empat");
  cek(K.cocokUcapan("empat", { jenis: "angka", n: 4 }).cocok && K.cocokUcapan("4", { jenis: "angka", n: 4 }).cocok && !K.cocokUcapan("seperempat", { jenis: "angka", n: 4 }).cocok, "cocok: bilangan empat, bukan seperempat");
  const t3 = K.tataBangun(3);
  cek(t3.pusat.length === 3 && t3.pusat.every((p) => p.x > t3.r && p.x < 300 - t3.r) && K.tataBangun(1).r === 40, "tata letak: bangun berderet dalam kanvas");
}

/* ------------------------------ Batas rupa dan teks ------------------------------ */
{
  const teksTahap = (soal) => soal.flatMap((s) => [s.judul.replace(/\d+/g, "x"), s.cerita, ...s.langkah.flatMap((x) => [x.judul, x.suara, ...(x.langkah.tipe === "salah" ? [x.langkah.kataTokoh, ...x.langkah.alasan, x.langkah.keliru] : []), ...(x.langkah.tipe === "urut" ? x.langkah.langkah : [])])]);
  const benda = Object.values(LC.BENDA).flatMap((b) => [b.nama.split(" ")[0]]);
  cek(teksTahap(D.PICTORIAL_PANEN).every((t) => !ADA_EMOJI.test(t) && !/\b(pai|roti|kue|taplak|labu|apel)\b/i.test(t)), "Pictorial: tanpa emoji dan tanpa nama benda");
  cek(teksTahap(D.ABSTRACT_PANEN).every((t) => !ADA_EMOJI.test(t) && !/\b(pai|roti|kue|taplak|labu|apel|melon)\b/i.test(t)), "Abstract: kata dan lambang saja, tanpa emoji dan nama benda");
  cek(teksTahap(D.CONCRETE_PANEN).every((t) => !ADA_EMOJI.test(t)), "Concrete: teks data tanpa emoji (emoji ada di gambar)");
  cek(Object.values(LC.BENDA).every((b) => emojiSah(b.emoji) && /^#[0-9A-Fa-f]{6}$/.test(b.warna) && ["lingkaran", "persegi"].includes(b.bangun) && ADA_EMOJI.test(b.emoji)) && benda.length === 5, "benda Concrete: emoji sah dan berwarna");
  cek(Object.keys(LC.BENDA).sort().join() === "kertas,kue,pai,roti,taplak", "benda Concrete bukan data Story");
  cek(!/(labu|petak tanah|melon|jerami|kupu)/i.test(Object.values(LC.BENDA).map((b) => b.nama).join(" ")), "benda CPA bukan benda Story");
  const semuaTeks = [...teksTahap(D.CONCRETE_PANEN), ...teksTahap(D.PICTORIAL_PANEN), ...teksTahap(D.ABSTRACT_PANEN), ...D.POIN_PENTING, ...D.POIN_PENTING_SUARA, D.PENUTUP_C, D.MISI_PANEN_TEKS, ...Object.values(D.TEMA_PANEN).flatMap((t) => [t.nama, t.cara])];
  cek(semuaTeks.every((t) => tanpaDigit(t) && bersih(t)), `semua teks data tanpa digit dan kata terlarang (${semuaTeks.length})`);
  cek(Object.values(D.TEMA_PANEN).every((t) => emojiSah(t.ikon)) && sama(Object.keys(D.TEMA_PANEN), ["concrete", "pictorial", "abstract"], "tema") === undefined, "tema: tiga tahap, emoji sah");
  cek(D.POIN_PENTING.length === 6 && D.POIN_PENTING.some((p) => /satu dari empat bagian yang sama besar/.test(p)) && D.POIN_PENTING.some((p) => /tegak lurus/.test(p)) && D.POIN_PENTING.some((p) => /dua setengah.*empat seperempat/.test(p)), "poin penting: seperempat, tegak lurus, utuh sama dengan dua setengah dan empat seperempat");
  cek(/panen raya/i.test(D.PENUTUP_C) && /\?$/.test(D.PENUTUP_C) && /labu/.test(D.PENUTUP_C), "penutup akhir cerita: pertanyaan bagian favorit");
  cek(D.CONCRETE_PANEN === D.CONCRETE && D.PICTORIAL_PANEN === D.PICTORIAL && D.ABSTRACT_PANEN === D.ABSTRACT, "nama ekspor pemasang");
}

/* ------------------------------ Berkas ------------------------------ */
{
  const berkas = readdirSync(folderUrl);
  for (const f of ["PetakEmpat.tsx", "JadwalPanen.tsx", "TahapPanen.tsx", "LangkahPanen.tsx", "JawabPanen.tsx", "SimulasiMejaPanen.tsx", "logika.ts", "logika-cpa.ts", "geometri.ts", "periksa.ts", "data.ts", "data-peta.ts", "data-sim.ts"]) cek(berkas.includes(f), `berkas ${f} ada`);
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folderUrl), "utf8");
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d || c.codePointAt(0) === 0x1f6de), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}/i.test(s), `${f}: kode emoji tidak melewati U+1FA95`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    if (["logika.ts", "logika-cpa.ts", "geometri.ts", "periksa.ts", "data.ts", "data-peta.ts", "data-sim.ts"].includes(f)) cek(!/from "react"|fetch\(|window\.|document\./.test(s), `${f}: murni, tanpa React dan jaringan`);
  }
  const tahap = readFileSync(new URL("TahapPanen.tsx", folderUrl), "utf8");
  cek(["umum", "rupa", "soal", "pita", "teksAkhir", "poinPenting = false"].every((x) => tahap.includes(x)) && /export default function TahapPanen/.test(tahap) && /PANEN RAYA/.test(tahap) && /KONFETI/.test(tahap), "TahapPanen: props sama dengan TahapRak, perayaan PANEN RAYA dan konfeti");
  cek(/export default function PetakEmpat/.test(readFileSync(new URL("PetakEmpat.tsx", folderUrl), "utf8")) && /export default function JadwalPanen/.test(readFileSync(new URL("JadwalPanen.tsx", folderUrl), "utf8")), "Mind-map dan Infografis: ekspor bawaan");
  const lp = readFileSync(new URL("LangkahPanen.tsx", folderUrl), "utf8");
  cek(/siapLangsung/.test(lp) && /Ini jawaban yang benar\./.test(lp) && /JawabTulis/.test(lp) && /JawabSuaraPanen/.test(lp), "LangkahPanen: siap langsung, jawaban benar ditampilkan, kanvas, suara");
  const jw = readFileSync(new URL("JawabPanen.tsx", folderUrl), "utf8");
  cek(/BATAS_SALAH/.test(jw) && /Ini jawaban yang benar/.test(jw), "JawabPanen: tiga kali salah menampilkan jawaban benar");
}

console.log(gagal === 0 ? `SEMUA LULUS (${lulus} cek)` : `GAGAL ${gagal} dari ${lulus + gagal}`);
process.exit(gagal === 0 ? 0 : 1);
