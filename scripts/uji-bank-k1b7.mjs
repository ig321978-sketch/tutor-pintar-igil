// Uji bank soal Kelas 1 Bab 7 (supabase/seed/02_kelas1_bab7_bank_keys.sql, berkas lokal berisi kunci).
// Skrip ini tidak memuat soal. Tiap soal dibaca ulang dari SQL, bilangan dalam kalimatnya diurai, lalu jawabannya
// dihitung ulang tanpa memakai pembuat soal, dan dicocokkan dengan kunci.
// Pakai: node --no-warnings scripts/uji-bank-k1b7.mjs [--sisa]
import fs from "node:fs";

const BERKAS = "supabase/seed/02_kelas1_bab7_bank_keys.sql";
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
const rxL = /^\s*\('k1-mat-bab7', '([^']+)', (\d), '((?:[^']|'')*)', '((?:[^']|'')*)', '(\[.*?\])'::jsonb, '(\w+)', '(\[.*?\])'::jsonb, '(\[.*?\])'::jsonb\)/gm;
const rxU = /^\s*\('k1-mat-bab7', 'acak', '([^']+)', '((?:[^']|'')*)', '(\[.*?\])'::jsonb, (\d), '(\w+)'\)/gm;
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
  if (s.opts.every((o) => /^\d+$/.test(o))) {
    cek(s.opts.every((o, i) => i === 0 || +s.opts[i - 1] < +o), `${lab} angka tidak naik`);
    cek(s.opts.every((o) => +o <= 20), `${lab} pilihan angka lebih dari 20`);
  }
  if (s.set === "L") cek(s.exp.length > 10, `${lab} pembahasan terlalu pendek`);
  if (s.set === "U") cek(s.v1.length === 0, `${lab} ujian tidak boleh memakai visual`);
  // batas materi: jumlah yang tertulis pada kalimat "p + q = r" harus paling besar 20
  for (const m of (s.prompt + " " + s.opts.join(" ")).matchAll(/[0-9]+/g)) cek(+m[0] <= 20, `${lab} bilangan lebih dari 20: ${m[0]}`);
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
for (const s of semua) cek(!/\b(meter|sentimeter|cm|tebak|tebakan|kilometer)\b/i.test(s.prompt + s.opts.join(" ") + (s.set === "L" ? s.exp : "")), `${s.set}${s.id} memakai kata terlarang (meter/sentimeter/tebak)`);
const kunci = (s) => s.opts[s.ci];
const hanya = (arr, f) => {
  const idx = arr.map(f);
  return idx.filter(Boolean).length === 1 ? arr[idx.indexOf(true)] : "?";
};
const LANGKAH = ["memilih alat ukur yang sama panjang", "meletakkan alat ukur mulai dari ujung benda", "menyusun alat ukur rapat tanpa bertumpuk", "menghitung banyak alat ukur", "menulis hasil dengan angka dan nama alat ukur"];
const KES = { "ada celah kosong": "alat ukur tidak rapat", "menumpuk": "alat ukur bertumpuk", "dari tengah": "tidak mulai dari ujung benda", "lebih pendek secara bergantian": "alat ukur tidak sama", "dengan miring": "alat ukur miring" };
const TAKBAKU = ["jengkal", "depa", "telapak kaki", "sedotan", "stik es krim", "penjepit kertas"];
const perm = (v) => [[0, 1, 2], [0, 2, 1], [1, 0, 2], [1, 2, 0], [2, 0, 1], [2, 1, 0]].map((q) => q.map((i) => v[i]).join(", "));
const sama = (d, a, b) => (a === b ? `Sama ${d}` : null);

let diperiksa = 0;
const tidak = {};
for (const s of semua) {
  const p = s.prompt;
  const lab = `${s.set}${s.id}`;
  const k = kunci(s);
  let m;
  let hasil = null;
  if ((m = p.match(/^(\S+) A (panjangnya|tingginya) (\d+) (.+)\. \1 B \2 (\d+) \4\. \S+ mana yang (lebih panjang|lebih tinggi|lebih pendek)\?$/i))) {
    const [a, b] = [+m[3], +m[5]];
    const d = m[2] === "panjangnya" ? "panjang" : "tinggi";
    hasil = a === b ? `Sama ${d}` : (m[6] === "lebih pendek" ? a < b : a > b) ? `${m[1]} A` : `${m[1]} B`;
  } else if ((m = p.match(/^(\S+) A (?:panjangnya|tingginya) (\d+) .+, \1 B (\d+) .+, dan \1 C (\d+) .+ mana yang (paling pendek|paling panjang|paling tinggi)\?$/))) {
    const v = [+m[2], +m[3], +m[4]];
    const t = m[5] === "paling pendek" ? Math.min(...v) : Math.max(...v);
    hasil = new Set(v).size === 3 ? `${m[1]} ${"ABC"[v.indexOf(t)]}` : "?";
  } else if ((m = p.match(/^Tiga (\S+) (?:panjangnya|tingginya) (\d+), (\d+), dan (\d+) .+\. Urutan dari (paling pendek|paling panjang) adalah\.\.\.$/))) {
    const v = [+m[2], +m[3], +m[4]].sort((x, y) => (m[5] === "paling pendek" ? x - y : y - x));
    hasil = v.join(", ");
  } else if ((m = p.match(/^Panjang (.+) adalah (\d+) (.+)\. Angka \2 menunjukkan\.\.\.$/))) hasil = `banyak ${m[3]} yang dipakai`;
  else if ((m = p.match(/^\S+ menyusun (.+) rapat dari ujung (.+) dan menghitung ada (\d+)\. Panjang \2 sama dengan \.\.\. \1\.$/))) hasil = m[3];
  else if ((m = p.match(/^\S+ mencari alat ukur panjang tidak baku\. Mana yang bisa dipilih\?$/))) hasil = hanya(s.opts, (o) => TAKBAKU.includes(o));
  else if ((m = p.match(/^(\S+) berdiri di anak tangga ke-(\d+)\. (\S+) berdiri di anak tangga ke-(\d+)\. Siapa yang posisinya (lebih tinggi|lebih rendah)\?$/))) {
    const [a, b] = [+m[2], +m[4]];
    hasil = a === b ? "?" : (m[5] === "lebih tinggi" ? a > b : a < b) ? m[1] : m[3];
  } else if ((m = p.match(/^(\S+) A (?:panjangnya|tingginya) (\d+) (.+) dan \S+ B (?:panjangnya|tingginya) (\d+) \3\. \1 A lebih (?:panjang|tinggi) berapa \3 dari/i))) hasil = +m[2] > +m[4] ? String(+m[2] - +m[4]) : "?";
  else if ((m = p.match(/^Tiga (\S+) (?:panjangnya|tingginya) (\d+), (\d+), dan (\d+) .+\. Ukuran .+ yang di tengah/))) hasil = String([+m[2], +m[3], +m[4]].sort((x, y) => x - y)[1]);
  else if ((m = p.match(/^(\S+) diukur dengan jengkal (\S+) hasilnya (\d+) jengkal\. Jengkal (\S+) lebih (panjang|pendek) dari jengkal \2\. Jika diukur/))) hasil = m[5] === "panjang" ? `kurang dari ${m[3]}` : `lebih dari ${m[3]}`;
  else if ((m = p.match(/^(\S+) lebih tinggi dari (\S+)\. Siapa yang lebih (tinggi|pendek)\?$/))) hasil = m[3] === "tinggi" ? m[1] : m[2];
  else if ((m = p.match(/^(\S+) A dan \S+ B dimulai dari garis awal yang sama\. Ujung \S+ A sampai angka (\d+) dan ujung \S+ B sampai angka (\d+)\. /))) hasil = +m[2] === +m[3] ? "?" : +m[2] > +m[3] ? `${m[1]} A` : `${m[1]} B`;
  else if ((m = p.match(/^Hasil ukur dengan (.+): (.+)\. Benda yang (paling pendek|paling panjang) adalah\.\.\.$/))) {
    const it = m[2].split(", ").map((x) => x.match(/^(\S+) (\d+)$/));
    const v = it.map((q) => +q[2]);
    const t = m[3] === "paling pendek" ? Math.min(...v) : Math.max(...v);
    hasil = new Set(v).size === 3 ? it[v.indexOf(t)][1] : "?";
  } else if ((m = p.match(/panjangnya (\d+) (.+) dan \S+ biru panjangnya (\d+) \2\. Keduanya disambung\./))) hasil = String(+m[1] + +m[3]);
  else if ((m = p.match(/panjangnya (\d+) (.+) lalu dipotong (\d+) \2\. Sisa/))) hasil = String(+m[1] - +m[3]);
  else if ((m = p.match(/memperkirakan panjang .+ kira-kira (\d+) (.+)\. Setelah diukur, hasilnya (\d+) \2\. Selisih/))) hasil = String(Math.abs(+m[1] - +m[3]));
  else if ((m = p.match(/^(\S+) berada di anak tangga ke-(\d+), (\S+) ke-(\d+), dan (\S+) ke-(\d+)\. Yang posisinya (paling tinggi|paling rendah) adalah/))) {
    const v = [+m[2], +m[4], +m[6]];
    const nn = [m[1], m[3], m[5]];
    const t = m[7] === "paling tinggi" ? Math.max(...v) : Math.min(...v);
    hasil = new Set(v).size === 3 ? nn[v.indexOf(t)] : "?";
  } else if ((m = p.match(/^(\S+) mengukur dengan (.+): \S+ A (\d+) \2, \S+ B (\d+) \2\. \S+ berkata \S+ (A|B) lebih panjang\./))) {
    const [a, b] = [+m[3], +m[4]];
    m[7] = m[5];
    const nm = p.match(/: (\S+) A (\d+) .+, \S+ B (\d+) /);
    const lebih = +nm[2] > +nm[3] ? "A" : "B";
    const noun = p.match(/berkata (\S+) [AB] lebih panjang/)[1];
    hasil = a === b ? "?" : m[7] === lebih ? `Benar, ${noun} ${m[7]} lebih panjang` : `Salah, ${noun} ${lebih} yang lebih panjang`;
  } else if ((m = p.match(/^\S+ mengukur panjang (\S+(?: \S+)?) dengan (.+)\. \S+ (.+)\. Kesalahan \S+ adalah\.\.\.$/)) && Object.keys(KES).some((x) => p.includes(x))) {
    const key = Object.keys(KES).find((x) => p.includes(x));
    hasil = KES[key];
  } else if ((m = p.match(/^(\S+) mengukur (\S+) dengan jengkal \1: (\d+) jengkal\. (\S+) mengukur \2 yang sama dengan jengkal \4: (\d+) jengkal\. Jengkal siapa yang lebih panjang\?$/))) {
    const [a, c] = [+m[3], +m[5]];
    hasil = a === c ? "Sama panjang" : a < c ? m[1] : m[4];
  } else if ((m = p.match(/^(\S+) dan (\S+) mengukur (\S+) yang sama dengan jengkal masing-masing\. Hasil \1 (\d+) jengkal dan hasil \2 (\d+) jengkal\./))) {
    const [a, c] = [+m[4], +m[5]];
    hasil = a === c ? "?" : a < c ? `jengkal ${m[1]} lebih panjang daripada jengkal ${m[2]}` : `jengkal ${m[2]} lebih panjang daripada jengkal ${m[1]}`;
  } else if ((m = p.match(/^(.+) lebih (panjang|tinggi) dari (.+)\. (.+) lebih \2 dari (.+)\. Yang (paling panjang|paling tinggi|paling pendek) adalah\.\.\.$/))) {
    // dua kalimat: cari yang tidak pernah di kanan (teratas) dan tidak pernah di kiri (terbawah)
    const pairs = [[m[1], m[3]], [m[4], m[5]]];
    const kiri = pairs.map((x) => x[0]);
    const kanan = pairs.map((x) => x[1]);
    const atas = kiri.find((x) => !kanan.includes(x));
    const bawah = kanan.find((x) => !kiri.includes(x));
    hasil = m[6] === "paling pendek" ? bawah : atas;
  } else if ((m = p.match(/^(.+) lebih rendah dari (.+)\. (.+) lebih rendah dari (.+)\. Yang posisinya (paling tinggi|paling rendah) adalah\.\.\.$/))) {
    const pairs = [[m[1], m[2]], [m[3], m[4]]]; // kiri lebih rendah dari kanan
    const kiri = pairs.map((x) => x[0]);
    const kanan = pairs.map((x) => x[1]);
    const rendah = kiri.find((x) => !kanan.includes(x));
    const tinggi = kanan.find((x) => !kiri.includes(x));
    hasil = m[5] === "paling tinggi" ? tinggi : rendah;
  } else if ((m = p.match(/mengukur tiga (\S+) dengan .+: (\d+), (\d+), (\d+)\. .+ mengurutkan .+ dari yang (paling pendek|paling panjang|paling tinggi)\. Urutan hasil ukur yang benar adalah/))) {
    const v = [+m[2], +m[3], +m[4]].sort((x, y) => (m[5] === "paling pendek" ? x - y : y - x));
    hasil = v.join(", ");
  } else if ((m = p.match(/dimulai dari angka (\d+) dan berakhir di angka (\d+)\. \S+ B dimulai dari angka (\d+) dan berakhir di angka (\d+)\./))) {
    const la = +m[2] - +m[1];
    const lb = +m[4] - +m[3];
    const noun = p.match(/membandingkan dua (\S+)\./)[1];
    hasil = la === lb ? "Sama panjang" : la > lb ? `${noun[0].toUpperCase() + noun.slice(1)} A` : `${noun[0].toUpperCase() + noun.slice(1)} B`;
  } else if ((m = p.match(/menutupi petak dari petak ke-(\d+) sampai petak ke-(\d+)\./))) hasil = String(+m[2] - +m[1] + 1);
  else if ((m = p.match(/^(\S+) memperkirakan panjang .+ kira-kira (\d+) .+\. (\S+) memperkirakan (\d+) .+\. Setelah diukur, hasilnya (\d+) /))) {
    const h = +m[5];
    const d1 = Math.abs(+m[2] - h);
    const d2 = Math.abs(+m[4] - h);
    hasil = d1 === d2 ? "Sama dekat" : d1 < d2 ? m[1] : m[3];
  } else if ((m = p.match(/mengukur dengan (.+): (.+)\. Pernyataan yang (benar|SALAH) adalah\.\.\.$/)) && /, dan /.test(p)) {
    const u = m[1];
    const it = m[2].replace(", dan ", ", ").split(", ").map((x) => x.match(/^(\S+) (\d+) /));
    const val = Object.fromEntries(it.map((q) => [q[1], +q[2]]));
    const vs = Object.values(val);
    const maks = Object.keys(val).find((n) => val[n] === Math.max(...vs));
    const mins = Object.keys(val).find((n) => val[n] === Math.min(...vs));
    const nil = s.opts.map((o) => {
      let q;
      if ((q = o.match(/^(\S+) lebih panjang dari (\S+)$/))) return val[q[1]] > val[q[2]];
      if ((q = o.match(/^(\S+) paling panjang$/))) return q[1] === maks;
      if ((q = o.match(/^(\S+) paling pendek$/))) return q[1] === mins;
      if ((q = o.match(/^(\S+) lebih panjang (\d+) (.+) dari (\S+)$/))) return val[q[1]] - val[q[4]] === +q[2] && q[3] === u;
      return null;
    });
    const diminta = m[3] === "benar";
    hasil = new Set(vs).size === 3 && !nil.some((x) => x === null) && nil.filter((x) => x === diminta).length === 1 ? s.opts[nil.indexOf(diminta)] : "?";
  } else if ((m = p.match(/^(\S+) A panjangnya (\d+) (.+)\. \S+ B (lebih panjang|lebih pendek) (\d+) \3 dari \S+ A\. Panjang/))) hasil = String(+m[2] + (m[4] === "lebih panjang" ? +m[5] : -+m[5]));
  else if ((m = p.match(/sudah (.+)\. Langkah berikutnya adalah\.\.\.$/))) {
    const i = LANGKAH.indexOf(m[1]);
    hasil = i >= 0 && i < 4 ? LANGKAH[i + 1] : "?";
  } else if ((m = p.match(/Panjangnya (\d+) (.+) dan lebarnya (\d+) \2\. (Lebar|Panjang) .+ adalah\.\.\./))) hasil = m[4] === "Lebar" ? m[3] : m[1];
  else if ((m = p.match(/^(\S+) A panjangnya (\d+) (.+)\. \S+ B panjangnya (\d+) \3 dan \S+ C panjangnya (\d+) \3\. .+ disambung\. Mana yang lebih panjang\?$/))) {
    const a = +m[2];
    const sm = +m[4] + +m[5];
    hasil = a === sm ? "Sama panjang" : a > sm ? `${m[1]} A` : `Sambungan ${m[1].toLowerCase()} B dan C`;
  } else if ((m = p.match(/^(\S+) X panjangnya (\d+) (.+), lalu dipotong (\d+) \3\. \S+ Y panjangnya (\d+) \3\. Mana/))) {
    const r = +m[2] - +m[4];
    const c = +m[5];
    hasil = r === c ? "Sama panjang" : r > c ? `Sisa ${m[1].toLowerCase()} X` : `${m[1]} Y`;
  } else if ((m = p.match(/^\S+ menyusun (.+) rapat dari ujung (.+)\. Banyaknya \1 ada (\d+)\. \S+ menulis panjang \2 (\d+) \1\./))) hasil = +m[3] === +m[4] ? `Benar, panjang ${m[2]} ${m[3]} ${m[1]}` : `Salah, panjang ${m[2]} yang benar adalah ${m[3]} ${m[1]}`;
  else if ((m = p.match(/^\S+ mengukur panjang (.+)\. Mula-mula memakai (\d+) (.+), lalu memakai (\d+) (.+) lagi\. \S+ menulis hasilnya (\d+) \3\./))) {
    hasil = m[3] === m[5] && +m[6] === +m[2] + +m[4] ? `Benar, alat ukurnya sama sehingga hasilnya ${m[6]} ${m[3]}` : m[3] !== m[5] ? "Salah, alat ukur yang berbeda tidak boleh dijumlahkan" : "?";
  } else if ((m = p.match(/^Tiga (\S+) (?:panjangnya|tingginya) (\d+), (\d+), dan (\d+) .+ lebih (?:panjang|tinggi) berapa/))) {
    const v = [+m[2], +m[3], +m[4]];
    hasil = String(Math.max(...v) - Math.min(...v));
  } else if ((m = p.match(/hanya menulis "(\d+)" di buku catatan\./))) {
    const u = p.match(/dengan (.+) dan hanya/)[1];
    hasil = `${m[1]} ${u}`;
  }
  if (hasil === null) {
    const jenis = p.slice(0, 40);
    tidak[jenis] = (tidak[jenis] ?? 0) + 1;
    continue;
  }
  diperiksa += 1;
  cek(hasil !== "?" && k === hasil, `${lab} kunci "${k}" tetapi hitung ulang "${hasil}" :: ${p.slice(0, 120)}`);
}

console.log(`diperiksa hitung ulang: ${diperiksa} dari ${semua.length} soal`);
const sisa = Object.entries(tidak);
console.log(`tidak ada penghitung (definisi tetap): ${sisa.reduce((a, b) => a + b[1], 0)}`);
if (process.argv.includes("--sisa")) for (const [j, c] of sisa) console.log(`  ${c}x ${j}`);
console.log(`lulus ${lulus}, gagal ${gagal}`);
process.exit(gagal === 0 ? 0 : 1);
