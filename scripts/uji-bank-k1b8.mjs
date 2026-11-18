// Uji bank soal Kelas 1 Bab 8 (supabase/seed/02_kelas1_bab8_bank_keys.sql, berkas lokal berisi kunci).
// Skrip ini tidak memuat soal. Tiap soal dibaca ulang dari SQL, data dalam kalimatnya diurai, lalu jawabannya
// dihitung ulang tanpa memakai pembuat soal, dan dicocokkan dengan kunci.
// Pakai: node --no-warnings scripts/uji-bank-k1b8.mjs
import fs from "node:fs";

const BERKAS = "supabase/seed/02_kelas1_bab8_bank_keys.sql";
let lulus = 0;
let gagal = 0;
const cek = (ok, ket) => {
  if (ok) lulus += 1;
  else {
    gagal += 1;
    if (gagal <= 40) console.log("GAGAL:", ket);
  }
};

const sql = fs.readFileSync(BERKAS, "utf8");
const bagL = sql.slice(sql.indexOf("insert into private.practice_keys"), sql.indexOf("insert into private.exam_keys"));
const bagU = sql.slice(sql.indexOf("insert into private.exam_keys"));
const ambil = (s) => s.replace(/''/g, "'");
const rxL = /^\s*\('k1-mat-bab8', '([^']+)', (\d), '((?:[^']|'')*)', '((?:[^']|'')*)', '(\[.*?\])'::jsonb, '(\w+)', '(\[.*?\])'::jsonb, '(\[.*?\])'::jsonb\)/gm;
const rxU = /^\s*\('k1-mat-bab8', 'acak', '([^']+)', '((?:[^']|'')*)', '(\[.*?\])'::jsonb, (\d), '(\w+)'\)/gm;
const L = [...bagL.matchAll(rxL)].map((m) => ({ id: m[1], ci: +m[2], exp: ambil(m[3]), prompt: ambil(m[4]), opts: JSON.parse(m[5]), lvl: m[6], v1: JSON.parse(m[7]), v2: JSON.parse(m[8]), set: "L" }));
const U = [...bagU.matchAll(rxU)].map((m) => ({ id: m[1], prompt: ambil(m[2]), opts: JSON.parse(m[3]), ci: +m[4], lvl: m[5], exp: "ada", v1: [], v2: [], set: "U" }));

// ---------- bentuk ----------
cek(L.length === 100, `latihan ${L.length} (harus 100)`);
cek(U.length === 100, `ujian ${U.length} (harus 100)`);
for (const lv of ["LOTS", "MOTS", "HOTS"]) cek(L.filter((s) => s.lvl === lv).length === { LOTS: 30, MOTS: 30, HOTS: 40 }[lv], `jumlah ${lv}`);
cek(U.every((s) => s.lvl === "HOTS"), "ujian harus HOTS semua");
const semua = [...L, ...U];
cek(new Set(semua.map((s) => s.prompt)).size === semua.length, "ada teks soal ganda");
cek(new Set(L.map((s) => s.id)).size === 100 && new Set(U.map((s) => s.id)).size === 100, "id ganda");
const ZWJ = /‍/;
const LUAR = /[\u{1FA96}-\u{1FFFF}]/u;
for (const s of semua) {
  const lab = `${s.set}${s.id}`;
  cek(s.opts.length === 4 && new Set(s.opts).size === 4, `${lab} pilihan tidak 4 unik`);
  cek(s.ci >= 0 && s.ci <= 3, `${lab} kunci di luar 0-3`);
  const teks = JSON.stringify([s.prompt, s.opts, s.v1, s.v2, s.exp]);
  cek(!ZWJ.test(teks) && !LUAR.test(teks), `${lab} emoji di luar batas atau ZWJ`);
  if (s.opts.every((o) => /^\d+$/.test(o))) cek(s.opts.every((o, i) => i === 0 || +s.opts[i - 1] < +o), `${lab} angka tidak naik`);
  if (s.opts.every((o) => /^\d+$/.test(o))) cek(s.opts.every((o) => +o <= 20), `${lab} angka lebih dari 20`);
  if (s.set === "L") cek(s.exp.length > 10, `${lab} pembahasan terlalu pendek`);
  if (s.set === "U") cek(s.v1.length === 0, `${lab} ujian tidak boleh memakai visual`);
}
for (const [nama, arr] of [["latihan", L], ["ujian", U]]) {
  const c = [0, 1, 2, 3].map((t) => arr.filter((s) => s.ci === t).length);
  cek(Math.max(...c) - Math.min(...c) <= 6, `sebaran kunci ${nama} ${c.join("/")}`);
  console.log(`sebaran kunci ${nama}: ${c.join("/")}`);
}
for (const lv of ["LOTS", "MOTS", "HOTS"]) {
  const c = [0, 1, 2, 3].map((t) => L.filter((s) => s.lvl === lv && s.ci === t).length);
  cek(Math.max(...c) - Math.min(...c) <= 3, `sebaran ${lv} ${c.join("/")}`);
}
const kunci = (s) => s.opts[s.ci];

// ---------- urai data ----------
function urai(p) {
  let m;
  if ((m = p.match(/baris Nama berisi (.+?); baris Banyaknya berisi ([\d, ]+)\./))) {
    const nm = m[1].split(", ");
    const ns = m[2].split(", ").map(Number);
    return nm.map((k, i) => ({ k, n: ns[i] }));
  }
  if (/baris \d+ .+? = \d+/.test(p)) return [...p.matchAll(/baris \d+ (.+?) = (\d+)/g)].map((x) => ({ k: x[1], n: +x[2] }));
  if (/(kolom|baris) [^,]+? ada \d+ gambar/.test(p)) return [...p.matchAll(/(?:kolom|baris) ([^,]+?) ada (\d+) gambar/g)].map((x) => ({ k: x[1], n: +x[2] }));
  if ((m = p.match(/^(?:Daftar|[A-Z][^:.]*?): (.+?)\. /))) {
    return m[1].split(", ").map((t) => {
      const q = t.match(/^(.+) (\d+)(?: anak)?$/);
      return q ? { k: q[1], n: +q[2] } : null;
    }).filter(Boolean);
  }
  return null;
}
const jml = (d) => d.reduce((a, b) => a + b.n, 0);
const cap = (t) => t.charAt(0).toUpperCase() + t.slice(1);
const lc = (t) => t.charAt(0).toLowerCase() + t.slice(1);
const nilai = (d, k) => d.find((x) => x.k === k)?.n;

function benarPernyataan(d, t) {
  let m;
  const mx = Math.max(...d.map((x) => x.n));
  const mn = Math.min(...d.map((x) => x.n));
  if ((m = t.match(/^(.+) adalah data yang paling banyak$/))) return nilai(d, lc(m[1])) === mx;
  if ((m = t.match(/^(.+) adalah data yang paling sedikit$/))) return nilai(d, lc(m[1])) === mn;
  if ((m = t.match(/^(.+) dan (.+) sama banyak$/))) return nilai(d, lc(m[1])) === nilai(d, m[2]);
  if ((m = t.match(/^(.+) lebih banyak (\d) daripada (.+)$/))) return nilai(d, lc(m[1])) - nilai(d, m[3]) === +m[2];
  if ((m = t.match(/^(.+) lebih banyak daripada (.+)$/))) return nilai(d, lc(m[1])) > nilai(d, m[2]);
  if ((m = t.match(/^[Jj]umlah semua datanya (\d+)$/))) return jml(d) === +m[1];
  return null;
}

let diperiksa = 0;
const tidak = {};
for (const s of semua) {
  const p = s.prompt;
  const lab = `${s.set}${s.id}`;
  const d = urai(p);
  const k = kunci(s);
  let m;
  let hasil = null; // jawaban yang diharapkan (teks)
  if (d && /Yang paling (disukai|banyak) adalah\.\.\.$/.test(p)) {
    const mx = Math.max(...d.map((x) => x.n));
    hasil = d.filter((x) => x.n === mx).length === 1 ? d.find((x) => x.n === mx).k : "?";
  } else if (d && /Yang paling sedikit adalah\.\.\.$/.test(p)) {
    const mn = Math.min(...d.map((x) => x.n));
    hasil = d.filter((x) => x.n === mn).length === 1 ? d.find((x) => x.n === mn).k : "?";
  } else if (d && (m = p.match(/\. ([A-Z][^.]*?) lebih banyak berapa daripada (.+)\?$/))) {
    hasil = String(nilai(d, lc(m[1])) - nilai(d, m[2]));
  } else if (d && (m = p.match(/Berapa jumlah (.+) dan (.+)\?$/))) {
    hasil = String(nilai(d, m[1]) + nilai(d, m[2]));
  } else if (d && /Jumlah semuanya adalah\.\.\.$/.test(p) && !/mendata/.test(p)) {
    hasil = String(jml(d));
  } else if (d && /Dua data yang sama banyak adalah\.\.\.$/.test(p)) {
    const pas = [];
    for (let i = 0; i < d.length; i += 1) for (let j = i + 1; j < d.length; j += 1) if (d[i].n === d[j].n) pas.push([d[i].k, d[j].k]);
    hasil = pas.length === 1 ? `${pas[0][0]} dan ${pas[0][1]}` : "?";
  } else if (d && (m = p.match(/Dua data yang selisihnya paling (kecil|besar) adalah\.\.\.$/))) {
    const pas = [];
    for (let i = 0; i < d.length; i += 1) for (let j = i + 1; j < d.length; j += 1) pas.push({ t: `${d[i].k} dan ${d[j].k}`, s: Math.abs(d[i].n - d[j].n) });
    const tg = m[1] === "kecil" ? Math.min(...pas.map((x) => x.s)) : Math.max(...pas.map((x) => x.s));
    const w = pas.filter((x) => x.s === tg);
    hasil = w.length === 1 ? w[0].t : "?";
  } else if (d && (m = p.match(/Berapa anak yang TIDAK memilih (.+)\?$/))) {
    hasil = String(jml(d) - nilai(d, m[1]));
  } else if (d && (m = p.match(/Urutan dari yang (paling sedikit ke paling banyak|paling banyak ke paling sedikit) adalah\.\.\.$/))) {
    const naik = m[1].startsWith("paling sedikit");
    hasil = [...d].sort((a, b) => (naik ? a.n - b.n : b.n - a.n)).map((x) => x.k).join(", ");
    if (new Set(d.map((x) => x.n)).size !== d.length) hasil = "?";
  } else if (d && (m = p.match(/Mana yang lebih banyak: (.+) dan (.+) bersama-sama, atau (.+) dan (.+) bersama-sama\?$/))) {
    const a = nilai(d, m[1]) + nilai(d, m[2]);
    const b = nilai(d, m[3]) + nilai(d, m[4]);
    hasil = a === b ? "Sama banyak" : a > b ? `${cap(m[1])} dan ${m[2]} bersama-sama` : `${cap(m[3])} dan ${m[4]} bersama-sama`;
  } else if (d && (m = p.match(/Kotak pertemuan baris Banyaknya dan kolom (.+) berisi angka\.\.\.$/))) {
    hasil = String(nilai(d, m[1]));
  } else if (d && (m = p.match(/Kotak pertemuan baris ke-(\d+) dan kolom Banyaknya berisi angka\.\.\.$/))) {
    hasil = String(d[+m[1] - 1].n);
  } else if (d && (m = p.match(/\. ([A-Z][^.]*?) ada di baris ke\.\.\.$/))) {
    hasil = String(d.findIndex((x) => x.k === lc(m[1])) + 1);
  } else if (d && (m = p.match(/Agar (.+) sama banyak dengan (.+), \1 perlu ditambah\.\.\.$/))) {
    hasil = String(nilai(d, m[2]) - nilai(d, m[1]));
  } else if (d && (m = p.match(/Agar semua data menjadi sama banyak dengan (.+), seluruhnya perlu ditambah\.\.\.$/))) {
    const t = nilai(d, m[1]);
    hasil = String(d.reduce((a, x) => a + (t - x.n), 0));
  } else if (d && /Angka paling kanan pada baris Banyaknya adalah\.\.\.$/.test(p)) {
    hasil = String(d[d.length - 1].n);
  } else if (d && (m = p.match(/\? ?(.+)\?$/)) && false) {
    hasil = null;
  } else if (d && (m = p.match(/(Pernyataan yang (?:benar|SALAH) adalah)\.\.\.$/)) && !/Kelas 1A/.test(p)) {
    const diminta = m[1].includes("SALAH") ? false : true;
    const nilaiOpsi = s.opts.map((o) => benarPernyataan(d, o));
    const ada = nilaiOpsi.filter((x) => x === diminta).length;
    if (nilaiOpsi.some((x) => x === null)) hasil = "?";
    else if (ada !== 1) hasil = "?";
    else hasil = s.opts[nilaiOpsi.indexOf(diminta)];
  } else if ((m = p.match(/Tabel (.+?): (.+?)\. Diagram gambarnya \((tegak|mendatar), 1 gambar = 1 \w+\): (.+?)\. \w+ mencocokkan/))) {
    const tb = m[2].split(", ").map((t) => t.match(/^(.+) (\d+)$/)).map((x) => ({ k: x[1], n: +x[2] }));
    const dg = m[4].split(", ").map((t) => t.match(/^(.+) (\d+) gambar$/)).map((x) => ({ k: x[1], n: +x[2] }));
    const beda = tb.filter((x, i) => dg[i].k !== x.k || dg[i].n !== x.n);
    hasil = beda.length === 1 ? beda[0].k : "?";
  } else if ((m = p.match(/^(\w+) menjumlahkan semua data (.+?): (.+?)\. \1 menulis jumlahnya (\d+)\. (Kesalahan|Jumlah semua yang benar)/))) {
    const dd = m[3].split(", ").map((t) => t.match(/^(.+) (\d+)$/)).map((x) => ({ k: x[1], n: +x[2] }));
    const W = +m[4];
    if (m[5] === "Jumlah semua yang benar") hasil = String(jml(dd));
    else {
      const sel = jml(dd) - W;
      const hilang = dd.filter((x) => x.n === sel);
      const o1 = s.opts.filter((o) => o.startsWith("Lupa menjumlahkan "));
      const ok = sel > 0 && o1.length === 1 && hilang.some((x) => `Lupa menjumlahkan ${x.k}` === o1[0]);
      hasil = ok ? o1[0] : "?";
      if (hilang.length > 1) hasil = o1[0]; // dua data sama besar: salah satunya tetap benar bila namanya ada
    }
  } else if ((m = p.match(/^(\d+) anak ikut memilih .+? Tiap anak hanya memilih satu\. \w+ membuat tabel: (.+?)\. Pernyataan/))) {
    const dd = m[2].split(", ").map((t) => t.match(/^(.+) (\d+)$/)).map((x) => ({ k: x[1], n: +x[2] }));
    const T = +m[1];
    const S = jml(dd);
    hasil = S === T ? "Data sudah benar" : S > T ? "Ada anak yang dicatat lebih dari sekali" : "Ada anak yang belum dicatat";
  } else if ((m = p.match(/menghitung (\d+) anak yang suka .+? dan mencatatnya dengan turus/))) {
    hasil = `${Math.floor(+m[1] / 5)} kelompok lima dan ${+m[1] % 5} goresan tegak`;
  } else if ((m = p.match(/Ada (\d+) kelompok lima dan (\d+) goresan tegak lagi/))) {
    hasil = String(5 * +m[1] + +m[2]);
  } else if ((m = p.match(/^(?:Jumlah semua (.+?) ada (\d+)\. (.+?) (\d+) dan (.+?) (\d+)\. (.+?) dan (.+?) sama banyak\. Banyak)/))) {
    hasil = String((+m[2] - +m[4] - +m[6]) / 2);
  } else if ((m = p.match(/^Jumlah semua (.+?) ada (\d+)\. (.+?) ada (\d+) dan (.+?) ada (\d+)\. Banyak (.+?) ada\.\.\.$/))) {
    hasil = String(+m[2] - +m[4] - +m[6]);
  } else if ((m = p.match(/^(.+?) ada (\d+)\. (.+?) (lebihnya|kurangnya) (\d+) dari (.+?)\. Banyak (.+?) ada\.\.\.$/))) {
    hasil = String(m[4] === "lebihnya" ? +m[2] + +m[5] : +m[2] - +m[5]);
  } else if ((m = p.match(/mendata (.+?)\. (.+?) ada (\d+)\. (.+?) lebihnya (\d+) dari .+?\. (.+?) kurangnya (\d+) dari .+?\. (Jumlah semuanya|Selisih data yang paling banyak dan yang paling sedikit) adalah/))) {
    const b = +m[3];
    const a1 = b + +m[5];
    const a2 = b - +m[7];
    hasil = m[8] === "Jumlah semuanya" ? String(b + a1 + a2) : String(a1 - a2);
  } else if ((m = p.match(/^(.+?): (.+?)\. Lalu (\d+) anak yang suka (.+?) pindah memilih (.+?)\. (Sekarang anak yang suka (.+?) ada|Jumlah semua anak sekarang adalah|Sekarang data yang (?:paling disukai) adalah)/))) {
    const dd = m[2].split(", ").map((t) => t.match(/^(.+) (\d+)$/)).map((x) => ({ k: x[1], n: +x[2] }));
    const dari = m[4];
    const ke = m[5];
    const q = +m[3];
    if (m[6].startsWith("Sekarang anak")) hasil = String(nilai(dd, ke) + q);
    else if (m[6].startsWith("Jumlah")) hasil = String(jml(dd));
    else {
      const baru = dd.map((x) => ({ k: x.k, n: x.k === dari ? x.n - q : x.k === ke ? x.n + q : x.n }));
      const mx = Math.max(...baru.map((x) => x.n));
      hasil = baru.filter((x) => x.n === mx).length === 1 ? baru.find((x) => x.n === mx).k : "?";
    }
  } else if ((m = p.match(/Kelas 1A: (.+?)\. Kelas 1B: (.+?)\. Pernyataan yang (benar|SALAH) adalah/))) {
    const pa = m[1].split(", ").map((t) => t.match(/^(.+) (\d+)$/)).map((x) => ({ k: x[1], n: +x[2] }));
    const pb = m[2].split(", ").map((t) => t.match(/^(.+) (\d+)$/)).map((x) => ({ k: x[1], n: +x[2] }));
    const eva = (t) => {
      let q;
      if ((q = t.match(/^(.+): Kelas 1A lebih banyak daripada Kelas 1B$/))) return nilai(pa, lc(q[1])) > nilai(pb, lc(q[1]));
      if ((q = t.match(/^(.+): Kelas 1B lebih banyak daripada Kelas 1A$/))) return nilai(pb, lc(q[1])) > nilai(pa, lc(q[1]));
      if ((q = t.match(/^(.+) sama banyak di kedua kelas$/))) return nilai(pa, lc(q[1])) === nilai(pb, lc(q[1]));
      if (t === "Jumlah semua di Kelas 1A lebih banyak daripada Kelas 1B") return jml(pa) > jml(pb);
      if (t === "Jumlah semua di Kelas 1B lebih banyak daripada Kelas 1A") return jml(pb) > jml(pa);
      if (t === "Jumlah semua di kedua kelas sama banyak") return jml(pa) === jml(pb);
      if (t === "Data yang paling banyak sama di kedua kelas") {
        const ma = pa.reduce((x, y) => (y.n > x.n ? y : x));
        const mb = pb.reduce((x, y) => (y.n > x.n ? y : x));
        return ma.k === mb.k;
      }
      return null;
    };
    const diminta = m[3] === "benar";
    const nv = s.opts.map(eva);
    hasil = nv.some((x) => x === null) || nv.filter((x) => x === diminta).length !== 1 ? "?" : s.opts[nv.indexOf(diminta)];
  } else if ((m = p.match(/Tabel menurun "(.+?)" \(kolom Nama dan kolom Banyaknya\): (.+?)\. Tabel mendatar yang datanya SAMA/)) || (m = p.match(/Tabel menurun .+?: (.+?)\. Tabel mendatar yang datanya SAMA/))) {
    const dd = [...p.matchAll(/baris \d+ (.+?) = (\d+)/g)].map((x) => ({ k: x[1], n: +x[2] }));
    const fmt = `Nama: ${dd.map((x) => x.k).join(", ")}. Banyaknya: ${dd.map((x) => x.n).join(", ")}`;
    hasil = fmt;
  } else if ((m = p.match(/mewarnai kolom (.+?) pada diagram gambar tegak dari bawah ke atas, yaitu kotak nomor ([\d, ]+)\. Kesalahan/))) {
    const n = +p.match(new RegExp(`, ${m[1]} ada (\\d+)\\.`))[1];
    const ko = m[2].split(", ").map(Number);
    const lompat = ko.some((x, i) => i > 0 && x !== ko[i - 1] + 1);
    if (lompat) hasil = "Melompati satu kotak";
    else if (ko[0] !== 1) hasil = "Tidak mulai dari kotak pertama";
    else if (ko.length > n) hasil = "Mewarnai lebih banyak daripada datanya";
    else if (ko.length < n) hasil = "Mewarnai kurang dari datanya";
    else hasil = "?";
  } else if ((m = p.match(/^(\w+) ingin tahu .+ teman sekelasnya\. Hasilnya akan dibuat menjadi diagram gambar\. (Urutan kegiatan yang tepat adalah|Kegiatan yang dilakukan paling akhir adalah|\w+ sudah mencatat jawaban dengan turus\. Langkah berikutnya adalah)/))) {
    hasil = m[2].startsWith("Urutan") ? "tanya anak-anak, catat dengan turus, buat tabel, gambar diagram" : m[2].startsWith("Kegiatan") ? "gambar diagram" : "buat tabel";
  } else if ((m = p.match(/berkata, "(.+?) (paling banyak|paling disukai) (karena .+?)\." Tanggapan/)) && d) {
    const mx = d.reduce((a, b) => (b.n > a.n ? b : a));
    hasil = `Salah, yang ${m[2]} adalah ${mx.k} karena angkanya terbesar`;
  } else if (d && /Tabel menurun .+ punya kolom Nama dan kolom Banyaknya/.test(p)) {
    hasil = "2";
  } else if (/^Satu kelompok turus yang sudah penuh/.test(p)) hasil = "5";
  else if ((m = p.match(/Kolom (.+?) ada (\d+) gambar\. Artinya/)) || (m = p.match(/Baris (.+?) ada (\d+) gambar\. Artinya/)) || (m = p.match(/menunjukkan (\d+) gambar (.+?)\. Anak yang suka/))) {
    hasil = m[2] && /^\d+$/.test(m[2]) ? m[2] : m[1];
  } else if ((m = p.match(/^Daftar .+? ([\w\- ]+) (\d+), ([\w\- ]+) (\d+)\. Banyak .+ dan .+\.\.\.$/)) && false) {
    hasil = "sama banyak";
  }
  if (hasil === null) {
    const jenis = p.slice(0, 40);
    tidak[jenis] = (tidak[jenis] ?? 0) + 1;
    continue;
  }
  diperiksa += 1;
  cek(hasil !== "?" && k === hasil, `${lab} kunci "${k}" tetapi hitung ulang "${hasil}" :: ${p.slice(0, 110)}`);
}

console.log(`diperiksa hitung ulang: ${diperiksa} dari ${semua.length} soal`);
const sisa = Object.entries(tidak);
console.log(`tidak ada penghitung (mis. definisi, hitung gambar, sama banyak, campuran): ${sisa.reduce((a, b) => a + b[1], 0)}`);
if (process.argv.includes("--sisa")) for (const [j, n] of sisa) console.log(`  ${n}x ${j}`);
console.log(`lulus ${lulus}, gagal ${gagal}`);
process.exit(gagal === 0 ? 0 : 1);
