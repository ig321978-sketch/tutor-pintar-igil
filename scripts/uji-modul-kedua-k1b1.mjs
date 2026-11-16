// Uji otomatis Modul Kedua Kelas 1 Bab 1.
// Jalankan: node scripts/uji-modul-kedua-k1b1.mjs
// Memeriksa: struktur data, kunci jawaban (dihitung ulang dari "fakta" soal dengan kode terpisah),
// ratusan pembangkitan soal berparameter, aturan konten pemilik, rumus penguasaan, remedial, pengulangan berjarak.
import { register } from "node:module";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

// Pemuat sederhana: impor relatif tanpa ekstensi di berkas .ts dibaca sebagai .ts
register(
  "data:text/javascript," +
    encodeURIComponent(
      "export async function resolve(s,c,n){if((s.startsWith('./')||s.startsWith('../'))&&!/\\.\\w+$/.test(s)){try{return await n(s+'.ts',c)}catch{}}return n(s,c)}",
    ),
);

const akar = join(dirname(fileURLToPath(import.meta.url)), "..");
const lib = (f) => import(new URL(`file:///${join(akar, "src/lib/modul-kedua", f).replace(/\\/g, "/")}`).href);
const { bangunSoal, DAFTAR_PEMBANGKIT } = await lib("generator.ts");
const { eja } = await lib("eja.ts");
const pg = await lib("penguasaan.ts");
const rem = await lib("remedial.ts");
const ul = await lib("pengulangan.ts");
const data = JSON.parse(readFileSync(join(akar, "src/data/modul-kedua/k1b1.json"), "utf8"));

let gagal = 0;
let lulus = 0;
const galat = [];
function cek(kondisi, pesan) {
  if (kondisi) lulus++;
  else {
    gagal++;
    if (galat.length < 40) galat.push(pesan);
  }
}
const semuaSpec = [
  ...data.tes.pra, ...data.tes.pasca,
  ...data.latihan.concrete, ...data.latihan.pictorial, ...data.latihan.abstract,
  ...Object.values(data.remedial).flatMap((r) => r.soal),
];
const repDari = (g) => (g.startsWith("c-") ? "concrete" : g.startsWith("p-") ? "pictorial" : "abstract");

/* ---------- 1. Struktur dan sebaran soal ---------- */
cek(data.latihan.concrete.length >= 10, "Concrete minimal 10 soal");
cek(data.latihan.pictorial.length >= 10, "Pictorial minimal 10 soal");
cek(data.latihan.abstract.length >= 15, "Abstract minimal 15 soal");
for (const k of ["knowing", "applying", "reasoning"]) {
  cek(data.latihan.abstract.filter((s) => s.kognitif === k).length >= 5, `Abstract: minimal 5 soal ${k}`);
}
for (const t of ["concrete", "pictorial", "abstract"]) {
  for (const lv of ["Dasar", "Mahir", "Juara"]) {
    cek(data.latihan[t].some((s) => s.level === lv), `${t} punya level ${lv}`);
  }
}
const ids = semuaSpec.map((s) => s.id);
cek(new Set(ids).size === ids.length, "Semua id soal unik");
cek(data.tes.pra.length >= 5 && data.tes.pasca.length >= 6, "Pra-tes dan pasca-tes ada");
for (const t of ["peta", "simulasi", "concrete", "pictorial", "abstract", "posttest"]) {
  cek(data.remedial[t]?.penjelasan?.length >= 3 && data.remedial[t]?.soal?.length >= 3, `Remedial ${t} lengkap`);
}
for (const s of semuaSpec) cek(DAFTAR_PEMBANGKIT.includes(s.gen), `Pembangkit ada: ${s.gen}`);

/* ---------- 2. Pembangkitan berulang + kunci dihitung ulang ---------- */
// Oracle terpisah: menghitung jawaban dari fakta tanpa memakai kode pembangkit.
const oracle = {
  "c-hitung": (f) => String(f.n),
  "c-kosong": (f) => String(f.n),
  "c-isi-keranjang": (f) => String(f.n),
  "p-turus": (f) => String(f.n),
  "p-kotak-sepuluh": (f) => String(f.n),
  "p-garis-titik": (f) => String(f.n),
  "p-piktogram-banyak": (f) => String(f.baris[f.idx]),
  "a-baca": (f) => eja(f.n),
  "a-tulis": (f) => String(f.n),
  "a-setelah": (f) => String(f.n + 1),
  "a-sebelum": (f) => String(f.n - 1),
  "p-garis-sesudah": (f) => String(f.n + 1),
  "a-cerita-sesudah": (f) => String(f.n + 1),
  "a-kesalahan": (f) => String(f.n + 1),
  "a-antara": (f) => String(f.a + 1),
  "a-hilang": (f) => {
    const d = f.deret;
    const i = d.indexOf(-1);
    return String(i === 0 ? d[1] - 1 : d[i - 1] + 1);
  },
  "a-bandingkan": (f) => String(f.besar ? Math.max(f.a, f.b) : Math.min(f.a, f.b)),
  "a-terkecil": (f) => String(f.besar ? Math.max(...f.tiga) : Math.min(...f.tiga)),
  "a-banyak-bilangan": (f) => {
    let c = 0;
    for (let x = f.a; x <= f.b; x++) c++;
    return String(c);
  },
  "a-mundur": (f) => {
    let x = f.mulai;
    for (let i = 1; i < f.ke; i++) x--;
    return String(x);
  },
  "a-misteri": (f) => {
    const cocok = [];
    for (let x = 0; x <= 10; x++) if (x > f.lebih && x < f.kurang && !f.tidak.includes(x)) cocok.push(x);
    return cocok.length === 1 ? String(cocok[0]) : `AMBIGU:${cocok.join(",")}`;
  },
};
const orakelDuaKelompok = (g, f, v) => {
  const a = v.a.jumlah, b = v.b.jumlah;
  if (g === "c-lebih-banyak") return a > b ? v.a.emoji : v.b.emoji;
  if (g === "c-paling-sedikit") return a < b ? v.a.emoji : v.b.emoji;
  return a === b ? "Sama banyak" : "Tidak sama";
};

const BANYAK = 400;
const cirikan = {};
let totalSoal = 0;
for (const spec of semuaSpec) {
  const rep = repDari(spec.gen);
  const teksBeda = new Set();
  for (let benih = 1; benih <= BANYAK; benih++) {
    const s = bangunSoal(spec, benih * 7919 + 13, rep);
    totalSoal++;
    teksBeda.add(JSON.stringify([s.teks, s.visual, s.kunci]));
    const tag = `${spec.id}/${spec.gen}/benih${benih}`;
    // kunci dihitung ulang
    let harapan;
    if (["c-lebih-banyak", "c-paling-sedikit", "c-sama-banyak"].includes(spec.gen)) harapan = orakelDuaKelompok(spec.gen, s.fakta, s.visual);
    else if (spec.gen === "p-piktogram-terbanyak") {
      const j = s.visual.baris.map((x) => x.jumlah);
      harapan = s.visual.baris[j.indexOf(Math.max(...j))].emoji;
    } else harapan = oracle[spec.gen](s.fakta);
    cek(s.kunci === harapan, `${tag}: kunci ${s.kunci} != hitung ulang ${harapan}`);
    // kunci ada di pilihan & pilihan unik
    if (s.mode === "pilih") {
      cek(s.pilihan.includes(s.kunci), `${tag}: kunci tidak ada di pilihan`);
      cek(new Set(s.pilihan).size === s.pilihan.length && s.pilihan.length >= 2, `${tag}: pilihan kembar/kurang`);
      cek(s.pilihan.filter((p) => p === s.kunci).length === 1, `${tag}: kunci ganda`);
    }
    // angka di pilihan numerik harus dalam 0..10
    for (const p of s.pilihan) if (/^\d+$/.test(p)) cek(Number(p) >= 0 && Number(p) <= 10, `${tag}: pilihan di luar 0..10 (${p})`);
    // visual konsisten dengan fakta
    const v = s.visual;
    if (v.jenis === "benda" || v.jenis === "turus" || v.jenis === "kotak-sepuluh") cek(v.jumlah === s.fakta.n && s.kunci === String(v.jumlah), `${tag}: visual != fakta`);
    if (v.jenis === "garis-bilangan") cek(v.titik === s.fakta.n, `${tag}: titik garis != fakta`);
    if (v.jenis === "isi-keranjang") cek(v.target === s.fakta.n && v.sediaan >= v.target && v.sediaan <= 10, `${tag}: keranjang tidak konsisten`);
    if (v.jenis === "piktogram") cek(v.baris.length === 3 && new Set(v.baris.map((x) => x.emoji)).size === 3 && v.baris.every((x) => x.jumlah >= 0 && x.jumlah <= 10), `${tag}: piktogram`);
    if (v.jenis === "dua-kelompok") cek(v.a.emoji !== v.b.emoji && v.a.jumlah <= 10 && v.b.jumlah <= 10, `${tag}: dua kelompok`);
    if (v.jenis === "urutan") cek(v.deret.length >= 3 && v.deret.every((x) => x === null || (x >= 0 && x <= 10)), `${tag}: deret`);
    // batas parameter dari berkas data
    if (spec.param && typeof s.fakta.n === "number" && ["c-hitung", "c-isi-keranjang", "p-turus", "p-kotak-sepuluh", "p-garis-titik", "a-baca", "a-tulis", "a-setelah", "a-sebelum"].includes(spec.gen))
      cek(s.fakta.n >= spec.param.min && s.fakta.n <= spec.param.max, `${tag}: n=${s.fakta.n} di luar [${spec.param.min},${spec.param.max}]`);
    // misteri harus tepat satu jawaban
    if (spec.gen === "a-misteri") cek(!String(harapan).startsWith("AMBIGU"), `${tag}: misteri ambigu`);
    // suara tanpa digit, pembahasan Polya lengkap
    cek(!/\d/.test(s.suara), `${tag}: suara memuat digit: ${s.suara}`);
    cek(s.polya.length === 4 && ["Pahami", "Rencanakan", "Lakukan", "Periksa"].every((t, i) => s.polya[i].tahap === t && s.polya[i].teks.length > 3), `${tag}: Polya tidak lengkap`);
    cek(s.mengapa.length > 10 && s.petunjuk.length > 5, `${tag}: pembahasan/petunjuk kosong`);
    // aturan konten & emoji
    const gabung = [s.teks, s.suara, s.mengapa, s.petunjuk, ...s.polya.map((p) => p.teks), ...s.pilihan].join(" ");
    cek(!/menggambar|buku|teman|kerja kelompok|kelas /i.test(gabung), `${tag}: kata terlarang`);
    for (const ch of gabung) cek(ch.codePointAt(0) <= 0x1fa95, `${tag}: emoji melewati U+1FA95`);
    cirikan[spec.gen] = (cirikan[spec.gen] ?? 0) + 1;
  }
  // soal berparameter: angka/teks berubah antarpercobaan (kecuali yang rentangnya memang sempit)
  cek(teksBeda.size >= 2 || spec.gen === "c-kosong", `${spec.id}: soal tidak berubah antarpercobaan`);
}
// Pembangkit yang dipakai: semua dipakai oleh minimal satu spesifikasi
for (const g of DAFTAR_PEMBANGKIT) cek(semuaSpec.some((s) => s.gen === g) || g === "a-sebelum" || g === "c-sama-banyak" || g === "p-garis-sesudah", `Pembangkit tak terpakai: ${g}`);
// Soal non-rutin pada Abstract
const nonRutin = data.latihan.abstract.filter((s) => bangunSoal(s, 5, "abstract").nonRutin);
cek(nonRutin.length >= 2, `Abstract minimal 2 soal non-rutin (ada ${nonRutin.length})`);

/* ---------- 3. Cerita, peta, infografis, simulasi ---------- */
const TOKOH = new Set(["Malosi", "Kira", "Upe", "Wei", "Halim", "Igil"]);
let durasi = 0;
for (const a of data.story.adegan) {
  cek(!/\d/.test(a.narasi), `Narasi ${a.id} memuat digit`);
  cek(a.tokoh.every((t) => TOKOH.has(t.nama)), `Tokoh tidak dikenal di ${a.id}`);
  cek(a.visual.length > 10 && a.durasiDetik > 0, `Storyboard ${a.id} kurang lengkap`);
  durasi += a.durasiDetik;
}
cek(durasi >= 60 && durasi <= 120, `Durasi cerita Fase A 1-2 menit (ada ${durasi} detik)`);
cek(!/\d/.test(data.story.pertanyaanPemantik), "Pertanyaan pemantik tanpa digit");
const idNode = new Set(data.peta.node.map((n) => n.id));
cek(data.peta.lengkapi.every((i) => idNode.has(i)), "Node 'lengkapi' ada semua");
for (const j of ["inti", "subkonsep", "prasyarat", "lanjutan", "kehidupan"]) cek(data.peta.node.some((n) => n.jenis === j), `Peta punya node ${j}`);
cek(data.infografis.miskonsepsi.length >= 2 && data.infografis.contoh.length >= 2 && !!data.infografis.faktaMenarik, "Infografis lengkap");
for (const t of data.simulasi.tantangan) cek(t.min >= 0 && t.max <= 10 && t.min <= t.max && (t.jenis !== "geser-garis" || t.min >= 1), `Tantangan simulasi ${t.id} dalam 0..10`);
cek(data.simulasi.refleksi.pilihan.length >= 2 && data.simulasi.refleksi.benar < data.simulasi.refleksi.pilihan.length, "Refleksi simulasi valid");
const teksData = JSON.stringify({ ...data, judul: "", subBab: "" });
for (const ch of teksData) cek(ch.codePointAt(0) <= 0x1fa95, "Emoji data melewati U+1FA95");
cek(!/menggambar|\bbuku\b|\bteman\b|kerja kelompok/i.test(teksData), "Data bebas kata terlarang (buku/teman/menggambar/kerja kelompok)");

/* ---------- 4. Penguasaan, remedial, pengulangan ---------- */
const b = (benar, percobaan = 1, petunjuk = 0, level = "Dasar", kognitif = "knowing", elemen = "membilang") => ({ idSoal: "x", gen: "g", level, kognitif, elemen, benar, percobaan, petunjuk, detik: 5 });
cek(pg.nilaiButir(b(true)) === 1, "Benar percobaan 1 tanpa petunjuk = 1");
cek(pg.nilaiButir(b(true, 2)) === 0.5, "Percobaan 2 = 0,5");
cek(pg.nilaiButir(b(true, 3)) === 0.25 && pg.nilaiButir(b(true, 9)) === 0.25, "Percobaan 3+ = 0,25");
cek(pg.nilaiButir(b(true, 1, 2)) === 0.75, "Petunjuk = x0,75");
cek(pg.nilaiButir(b(true, 2, 1)) === 0.375, "Percobaan 2 + petunjuk = 0,375");
cek(pg.nilaiButir(b(false)) === 0, "Salah = 0");
cek(pg.indeks([]) === null, "Indeks kosong = null");
cek(pg.indeks([b(true), b(true)]) === 100, "Semua benar = 100");
cek(pg.indeks([b(true, 1, 0, "Dasar"), b(false, 3, 0, "Juara")]) === 33.3, `Bobot Dasar 1, Juara 2: harapan 33,3 (dapat ${pg.indeks([b(true, 1, 0, "Dasar"), b(false, 3, 0, "Juara")])})`);
cek(pg.indeks([b(true, 1, 0, "Mahir"), b(false, 1, 0, "Dasar")]) === 60, "Bobot Mahir 1,5 dan Dasar 1 = 60");
const sepuluh = Array.from({ length: 10 }, (_, i) => b(i !== 0));
cek(pg.indeks(sepuluh) === 90, "9 dari 10 benar = 90");
cek(rem.perluRemedial(79.9) && !rem.perluRemedial(80), "Remedial jika < 80, tidak jika >= 80");
cek(rem.bolehLanjut(50, 0).lanjut === false && rem.bolehLanjut(50, 2).lanjut === true && rem.bolehLanjut(50, 2).tuntas === false, "Boleh lanjut setelah 2 putaran remedial, ditandai belum tuntas");
cek(rem.bolehLanjut(80, 0).tuntas === true, "Skor 80 = tuntas");
const per = pg.indeksPerKognitif([b(true, 1, 0, "Dasar", "knowing"), b(false, 1, 0, "Mahir", "applying")]);
cek(per.knowing === 100 && per.applying === 0, "Indeks per kognitif terpisah");
const pe = pg.indeksPerElemen([b(true, 1, 0, "Dasar", "knowing", "membilang"), b(false, 1, 0, "Dasar", "knowing", "mengurutkan")]);
cek(pe.membilang === 100 && pe.mengurutkan === 0, "Indeks per elemen terpisah");
cek(pg.levelPenalaranDikuasai([b(true), b(true, 1, 0, "Mahir", "applying"), b(false, 1, 0, "Juara", "reasoning")]) === "applying", "Level penalaran dikuasai = applying");
const t0 = new Date("2026-01-01T00:00:00Z");
let kartu = ul.perbaruiKartu([], "a-baca", true, t0);
cek(kartu[0].kotak === 0 && ul.kartuJatuhTempo(kartu, t0).length === 0, "Kartu baru tidak langsung jatuh tempo");
cek(ul.kartuJatuhTempo(kartu, new Date("2026-01-02T00:00:01Z")).length === 1, "Jatuh tempo setelah 1 hari");
kartu = ul.perbaruiKartu(kartu, "a-baca", true, t0);
cek(kartu[0].kotak === 1, "Benar lagi naik kotak (interval 3 hari)");
kartu = ul.perbaruiKartu(kartu, "a-baca", false, t0);
cek(kartu[0].kotak === 0, "Salah kembali ke kotak 0");
const ulangan = ul.susunUlangan([{ gen: "a-hilang", kotak: 0, jatuhTempo: "2025-01-01T00:00:00Z", terakhir: "" }], data.latihan.abstract, t0, 4, 99);
cek(ulangan.length === 4 && ulangan.some((s) => s.gen === "a-hilang") && new Set(ulangan.map((s) => s.gen)).size === 4, "Ulangan berjarak: jatuh tempo ikut, jenis soal bercampur");

/* ---------- Laporan ---------- */
console.log(`Soal dibangkitkan: ${totalSoal} (${semuaSpec.length} spesifikasi x ${BANYAK} benih)`);
console.log(`Pembangkit diuji: ${Object.keys(cirikan).length} dari ${DAFTAR_PEMBANGKIT.length}`);
console.log(`Pemeriksaan lulus: ${lulus}, gagal: ${gagal}`);
if (gagal) {
  console.log("Contoh kegagalan:\n - " + galat.join("\n - "));
  process.exit(1);
}
console.log("SEMUA UJI LULUS");
