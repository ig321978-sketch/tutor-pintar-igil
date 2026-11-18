// Uji bank soal Kelas 1 Bab 5 (supabase/seed/02_kelas1_bab5_bank_keys.sql, berkas lokal berisi kunci).
// Skrip ini tidak memuat soal. Tiap soal dibaca ulang dari SQL, bilangan dalam kalimatnya diurai, lalu jawabannya
// dihitung ulang tanpa memakai pembuat soal, dan dicocokkan dengan kunci.
// Pakai: node --no-warnings scripts/uji-bank-k1b5.mjs [--sisa]
import fs from "node:fs";

const BERKAS = "supabase/seed/02_kelas1_bab5_bank_keys.sql";
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
const rxL = /^\s*\('k1-mat-bab5', '([^']+)', (\d), '((?:[^']|'')*)', '((?:[^']|'')*)', '(\[.*?\])'::jsonb, '(\w+)', '(\[.*?\])'::jsonb, '(\[.*?\])'::jsonb\)/gm;
const rxU = /^\s*\('k1-mat-bab5', 'acak', '([^']+)', '((?:[^']|'')*)', '(\[.*?\])'::jsonb, (\d), '(\w+)'\)/gm;
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
for (const s of semua) cek(!/\bnilai\b/i.test(s.prompt + s.opts.join(" ") + (s.set === "L" ? s.exp : "")), `${s.set}${s.id} memakai kata terlarang "nilai"`);
const kunci = (s) => s.opts[s.ci];
const ints = (t) => [...t.matchAll(/\d+/g)].map((m) => +m[0]);
const KATA = ["nol", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan", "sepuluh", "sebelas", "dua belas", "tiga belas", "empat belas", "lima belas", "enam belas", "tujuh belas", "delapan belas", "sembilan belas", "dua puluh"];
const LANGKAH = ["menghitung sepuluh benda pertama dan membuat satu kelompok", "menghitung benda yang tersisa", "menambahkan sepuluh dan sisanya", "memeriksa dengan menghitung ulang"];
const hanya = (arr, f) => {
  const idx = arr.map(f);
  return idx.filter(Boolean).length === 1 ? arr[idx.indexOf(true)] : "?";
};
const hit = (t) => t.split(" + ").reduce((a, b) => a + +b, 0);

let diperiksa = 0;
const tidak = {};
for (const s of semua) {
  const p = s.prompt;
  const lab = `${s.set}${s.id}`;
  const k = kunci(s);
  let m;
  let hasil = null;
  const n = ints(p);
  const nama = (x) => KATA.indexOf(x);
  if ((m = p.match(/^Lambang (\d+) dibaca\.\.\.$/))) hasil = KATA[+m[1]];
  else if ((m = p.match(/^Bilangan "(.+)" ditulis dengan lambang\.\.\.$/))) hasil = String(nama(m[1]));
  else if ((m = p.match(/^Bilangan (\d+) sama dengan sepuluh ditambah\.\.\.$/))) hasil = String(+m[1] - 10);
  else if (/^Lihat gambar .+ di atas\. Banyak .+ ada\.\.\.$/.test(p)) hasil = String(s.v1.length);
  else if ((m = p.match(/^Bilangan sesudah (\d+) adalah\.\.\.$/))) hasil = String(+m[1] + 1);
  else if ((m = p.match(/^Bilangan sebelum (\d+) adalah\.\.\.$/))) hasil = String(+m[1] - 1);
  else if ((m = p.match(/^Bilangan yang ada di antara (\d+) dan (\d+) adalah\.\.\.$/))) hasil = +m[2] === +m[1] + 2 ? String(+m[1] + 1) : "?";
  else if ((m = p.match(/^Bilangan (\d+) terdiri dari \.\.\. puluhan dan \.\.\. satuan\.$/))) hasil = `1 puluhan dan ${+m[1] - 10} satuan`;
  else if ((m = p.match(/^Menghitung maju dari (\d+), bilangan berikutnya adalah\.\.\.$/))) hasil = String(+m[1] + 1);
  else if ((m = p.match(/^Menghitung mundur dari (\d+), bilangan berikutnya adalah\.\.\.$/))) hasil = String(+m[1] - 1);
  else if ((m = p.match(/^Menghitung maju dua-dua dari (\d+), bilangan berikutnya adalah\.\.\.$/))) hasil = String(+m[1] + 2);
  else if ((m = p.match(/^Mana yang lebih besar: (\d+) atau (\d+)\?$/))) hasil = +m[1] === +m[2] ? "?" : String(Math.max(+m[1], +m[2]));
  else if ((m = p.match(/^Dua bingkai sepuluh .+ bingkai pertama penuh dan bingkai kedua berisi (\d+) titik\. Jumlah semua titik ada\.\.\.$/))) hasil = String(10 + +m[1]);
  else if ((m = p.match(/^Di akuarium kiri ada (\d+) .+ dan di akuarium kanan ada (\d+) .+ Akuarium mana yang (lebih banyak|lebih sedikit)\?$/))) {
    const [a, b] = [+m[1], +m[2]];
    hasil = a === b ? "?" : (m[3] === "lebih banyak" ? a > b : a < b) ? "Akuarium kiri" : "Akuarium kanan";
  } else if (/menaruh 10 di bak pertama dan sisanya di bak kedua/.test(p)) hasil = String(n[0] - 10);
  else if (/melompat \d+ langkah ke kanan\. .+ sampai di angka\.\.\.$/.test(p)) hasil = String(n[0] + n[1]);
  else if (/melompat \d+ langkah ke kiri\. .+ sampai di angka\.\.\.$/.test(p)) hasil = String(n[0] - n[1]);
  else if ((m = p.match(/^Lengkapi deret bilangan: (\d+), (\d+), \.\.\., (\d+), (\d+)$/))) hasil = +m[2] === +m[1] + 1 && +m[3] === +m[1] + 3 && +m[4] === +m[1] + 4 ? String(+m[1] + 2) : "?";
  else if ((m = p.match(/^Lengkapi deret bilangan: (\d+), (\d+), (\d+), \.\.\.$/))) {
    const d = +m[2] - +m[1];
    hasil = +m[3] === +m[2] + d ? String(+m[3] + d) : "?";
  } else if ((m = p.match(/^Bilangan (\d+) sama dengan\.\.\.$/))) hasil = `10 + ${+m[1] - 10}`;
  else if ((m = p.match(/puluhan = 1 dan satuan = (\d+)\. Bilangan yang dibentuk adalah\.\.\.$/))) hasil = String(10 + +m[1]);
  else if ((m = p.match(/^Bilangan (terkecil|terbesar) dari (\d+), (\d+), dan (\d+) adalah\.\.\.$/))) hasil = String(m[1] === "terkecil" ? Math.min(+m[2], +m[3], +m[4]) : Math.max(+m[2], +m[3], +m[4]));
  else if ((m = p.match(/berdiri di rak nomor (\d+)\. Teman .+ berdiri di rak nomor (sesudahnya|sebelumnya)\./))) hasil = String(+m[1] + (m[2] === "sesudahnya" ? 1 : -1));
  else if ((m = p.match(/^Dua bingkai sepuluh .+ berisi (\d+) titik\. Kotak yang masih kosong ada\.\.\.$/))) hasil = String(20 - +m[1]);
  else if ((m = p.match(/membaca lambang (\d+) sebagai "(.+)"\. Bacaan yang benar adalah\.\.\.$/))) hasil = nama(m[2]) !== +m[1] ? KATA[+m[1]] : "?";
  else if ((m = p.match(/menulis "(.+)" dengan lambang (\d+)\. Penulisan yang benar adalah\.\.\.$/))) hasil = nama(m[1]) !== +m[2] ? String(nama(m[1])) : "?";
  else if ((m = p.match(/Bingkai pertama penuh, bingkai kedua berisi (\d+) titik\. .+ berkata ada (\d+) titik seluruhnya\./))) {
    const r = 10 + +m[1];
    hasil = +m[2] === r ? `Benar, jumlahnya ${r}` : `Salah, jumlah yang benar adalah ${r}`;
  } else if ((m = p.match(/menghitung maju dari (\d+) sebanyak (\d+) langkah dan sampai di (\d+)\./))) {
    const r = +m[1] + +m[2];
    hasil = +m[3] === r ? `Benar, hasilnya ${r}` : `Salah, hasil yang benar adalah ${r}`;
  } else if ((m = p.match(/menghitung mundur dari (\d+) sebanyak (\d+) langkah dan sampai di (\d+)\./))) {
    const r = +m[1] - +m[2];
    hasil = +m[3] === r ? `Benar, hasilnya ${r}` : `Salah, hasil yang benar adalah ${r}`;
  } else if ((m = p.match(/menulis deret bilangan: (.+)\. Hanya satu angka yang salah\./))) {
    const q = m[1].split(", ").map(Number);
    const d = q[1] - q[0];
    const salahIdx = q.map((x, i) => x !== q[0] + d * i);
    hasil = salahIdx.filter(Boolean).length === 1 && (d === 1 || d === 2) ? String(q[salahIdx.indexOf(true)]) : "?";
  } else if ((m = p.match(/"Pada bilangan (\d+), angka (\d+) artinya (\d+) puluhan\."/))) hasil = +m[1] === 10 + +m[2] && m[2] === m[3] ? `Salah, angka ${m[2]} artinya ${m[2]} satuan` : "?";
  else if ((m = p.match(/"Pada bilangan (\d+), angka 1 artinya 1 satuan\."/))) hasil = "Salah, angka 1 artinya 1 puluhan";
  else if ((m = p.match(/^(\w+) punya 1 puluhan dan (\d+) satuan .+\. (\w+) punya 1 puluhan dan (\d+) satuan .+\. Siapa yang punya .+ (lebih banyak|lebih sedikit)\?$/))) {
    const [a, b] = [+m[2], +m[4]];
    hasil = a === b ? "Sama banyak" : (m[5] === "lebih banyak" ? a > b : a < b) ? m[1] : m[3];
  } else if ((m = p.match(/mengurutkan bilangan (\d+), (\d+), (\d+) dari (terkecil|terbesar)\./))) {
    const v = [+m[1], +m[2], +m[3]].sort((x, y) => (m[4] === "terkecil" ? x - y : y - x));
    hasil = v.join(", ");
  } else if ((m = p.match(/Akuarium A berisi (\d+) .+, akuarium B berisi (\d+) .+, dan akuarium C berisi (\d+) .+ (paling banyak|paling sedikit) adalah\.\.\.$/))) {
    const v = [+m[1], +m[2], +m[3]];
    const t = m[4] === "paling banyak" ? Math.max(...v) : Math.min(...v);
    hasil = new Set(v).size === 3 ? ["Akuarium A", "Akuarium B", "Akuarium C"][v.indexOf(t)] : "?";
  } else if ((m = p.match(/Setelah maju (\d+) langkah, ia sampai di (\d+)\./))) hasil = String(+m[2] - +m[1]);
  else if ((m = p.match(/mengisi kotak: (\d+) = 10 \+ \[ \]\. .+ menulis (\d+) di dalam kotak/))) {
    const u = +m[1] - 10;
    hasil = +m[2] === u ? `Benar, karena 10 + ${u} = ${m[1]}` : `Salah, isi kotak yang benar adalah ${u}`;
  } else if ((m = p.match(/menulis bahwa (\d+) terdiri dari (\d+) puluhan dan (\d+) satuan\./))) {
    const u = +m[1] - 10;
    hasil = +m[2] === 1 && +m[3] === u ? `Benar, ${m[1]} = 10 + ${u}` : `Salah, ${m[1]} terdiri dari 1 puluhan dan ${u} satuan`;
  } else if ((m = p.match(/memperhatikan bilangan (\d+)\. Pernyataan yang (benar|SALAH) adalah\.\.\.$/))) {
    const nn = +m[1];
    const nil = s.opts.map((o) => {
      let q;
      if ((q = o.match(/^(\d+) lebih besar dari (\d+)$/))) return +q[1] === nn && nn > +q[2];
      if ((q = o.match(/^(\d+) sama dengan 10 \+ (\d+)$/))) return +q[1] === nn && +q[2] === nn - 10;
      if ((q = o.match(/^Bilangan sesudah (\d+) adalah (\d+)$/))) return +q[1] === nn && +q[2] === nn + 1;
      if ((q = o.match(/^(\d+) terdiri dari 1 puluhan dan (\d+) satuan$/))) return +q[1] === nn && +q[2] === nn - 10;
      return null;
    });
    const diminta = m[2] === "benar";
    hasil = nil.some((x) => x === null) || nil.filter((x) => x === diminta).length !== 1 ? "?" : s.opts[nil.indexOf(diminta)];
  } else if (/Mana pasangan kartu yang menunjukkan bilangan sama\?$/.test(p)) {
    hasil = hanya(s.opts, (o) => { const q = o.match(/^(.+) dan (\d+)$/); return hit(q[1]) === +q[2]; });
  } else if ((m = p.match(/sudah (.+)\. Langkah berikutnya adalah\.\.\.$/))) {
    const i = LANGKAH.indexOf(m[1]);
    hasil = i >= 0 && i < 3 ? LANGKAH[i + 1] : "?";
  } else if ((m = p.match(/Di akuarium merah ada (\d+) .+ Bilangan (sesudah|sebelum) banyak/))) hasil = String(+m[1] + (m[2] === "sesudah" ? 1 : -1));
  else if ((m = p.match(/mulai dari angka (\d+), maju (\d+) langkah, lalu mundur (\d+) langkah\./))) hasil = String(+m[1] + +m[2] - +m[3]);
  else if ((m = p.match(/Tabel A: puluhan (\d+), satuan (\d+)\. Tabel B: puluhan (\d+), satuan (\d+)\. Bilangan yang lebih (kecil|besar) ada di\.\.\.$/))) {
    const v1 = +m[1] * 10 + +m[2];
    const v2 = +m[3] * 10 + +m[4];
    hasil = v1 === v2 ? "Sama besar" : (m[5] === "kecil" ? v1 < v2 : v1 > v2) ? "Tabel A" : "Tabel B";
  } else if ((m = p.match(/maju dua-dua dari (\d+) sebanyak (\d+) kali\./))) hasil = String(+m[1] + 2 * +m[2]);
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
console.log(`tidak ada penghitung: ${sisa.reduce((a, b) => a + b[1], 0)}`);
if (process.argv.includes("--sisa")) for (const [j, c] of sisa) console.log(`  ${c}x ${j}`);
console.log(`lulus ${lulus}, gagal ${gagal}`);
process.exit(gagal === 0 ? 0 : 1);
