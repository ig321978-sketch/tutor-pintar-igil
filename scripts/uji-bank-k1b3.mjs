// Uji bank soal Kelas 1 Bab 3 (supabase/seed/02_kelas1_bab3_bank_keys.sql, berkas lokal berisi kunci).
// Skrip ini tidak memuat soal. Tiap soal dibaca ulang dari SQL, bilangan dalam kalimatnya diurai, lalu jawabannya
// dihitung ulang tanpa memakai pembuat soal, dan dicocokkan dengan kunci.
// Pakai: node --no-warnings scripts/uji-bank-k1b3.mjs [--sisa]
import fs from "node:fs";

const BERKAS = "supabase/seed/02_kelas1_bab3_bank_keys.sql";
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
const rxL = /^\s*\('k1-mat-bab3', '([^']+)', (\d), '((?:[^']|'')*)', '((?:[^']|'')*)', '(\[.*?\])'::jsonb, '(\w+)', '(\[.*?\])'::jsonb, '(\[.*?\])'::jsonb\)/gm;
const rxU = /^\s*\('k1-mat-bab3', 'acak', '([^']+)', '((?:[^']|'')*)', '(\[.*?\])'::jsonb, (\d), '(\w+)'\)/gm;
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
    cek(s.opts.every((o) => +o <= 10), `${lab} pilihan angka lebih dari 10`);
  }
  if (s.set === "L") cek(s.exp.length > 10, `${lab} pembahasan terlalu pendek`);
  if (s.set === "U") cek(s.v1.length === 0, `${lab} ujian tidak boleh memakai visual`);
  // batas materi: jumlah yang tertulis pada kalimat "p + q = r" harus paling besar 10
  for (const m of (s.prompt + " " + s.opts.join(" ")).matchAll(/[0-9]+/g)) cek(+m[0] <= 10, `${lab} bilangan lebih dari 10: ${m[0]}`);
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
const ints = (t) => [...t.matchAll(/\d+/g)].map((m) => +m[0]);
const ev = (t) => {
  const m = t.match(/^(\d+) − (\d+)$/);
  return m ? +m[1] - +m[2] : null;
};
// kalimat "p + q = r" atau "p − q = r": benar secara hitungan?
const benarHitung = (t) => {
  const m = t.match(/^(\d+) ([+−]) (\d+) = (\d+)$/);
  if (!m) return null;
  return (m[2] === "+" ? +m[1] + +m[3] : +m[1] - +m[3]) === +m[4];
};
const KATA = ["nol", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan", "sepuluh"];
const LANGKAH = ["membaca ceritanya", "mencari mula-mula dan yang berkurang", "memilih tanda pengurangan", "menulis kalimat dan menghitung", "menulis jawaban dengan kalimat", "memeriksa dengan penjumlahan"];
const hanya = (arr, f) => {
  const idx = arr.map(f);
  return idx.filter(Boolean).length === 1 ? arr[idx.indexOf(true)] : "?";
};

let diperiksa = 0;
const tidak = {};
for (const s of semua) {
  const p = s.prompt;
  const lab = `${s.set}${s.id}`;
  const k = kunci(s);
  let m;
  let hasil = null;
  const n = ints(p);
  if ((m = p.match(/^Kalimat (\d+) − (\d+) = (\d+) dibaca\.\.\.$/))) {
    const [a, b, r] = [+m[1], +m[2], +m[3]];
    hasil = a - b === r ? `${KATA[a]} dikurangi ${KATA[b]} sama dengan ${KATA[r]}` : "?";
  } else if (/Kalimat pengurangan yang sesuai adalah\.\.\.$/.test(p)) hasil = `${n[0]} − ${n[1]} = ${n[0] - n[1]}`;
  else if ((m = p.match(/^Berapa hasil (\d+) − (\d+)\?$/))) hasil = String(+m[1] - +m[2]);
  else if (/Lihat gambar .+ di atas\. Lalu \d+ .+ Sisa .+ ada\.\.\.$/.test(p)) hasil = String(s.v1.length - n[0]);
  else if (/^Ada \d+ .+ di .+\. Semua \d+ .+ Sisa .+ ada\.\.\.$/.test(p)) hasil = n[0] === n[1] ? "0" : "?";
  else if (/Semua .+ itu .+ Banyak .+ yang tersisa ada\.\.\.$/.test(p)) hasil = "0";
  else if (/Tidak ada satu pun .+ Banyak .+ sekarang ada\.\.\.$/.test(p)) hasil = String(n[0]);
  else if ((m = p.match(/^Untuk menghitung (\d+) − (\d+) dengan menghitung mundur, kita mulai dari angka\.\.\.$/))) hasil = m[1];
  else if (/^Diketahui (\d+) = (\d+) \+ (\d+)\. Maka (\d+) − (\d+) = \.\.\.$/.test(p)) hasil = n[0] === n[1] + n[2] && n[3] === n[0] && n[4] === n[1] ? String(n[2]) : "?";
  else if ((m = p.match(/^Bingkai sepuluh .+ penuh berisi 10 titik\. .+ mengambil (\d+) titik\./))) hasil = String(10 - +m[1]);
  else if ((m = p.match(/^Pakai pasangan sepuluh\. Karena (\d+) \+ (\d+) = 10, maka 10 − (\d+) = \.\.\.$/))) hasil = +m[1] + +m[2] === 10 && m[3] === m[1] ? m[2] : "?";
  else if ((m = p.match(/^Berapa hasil (\d+) − 0\?$/))) hasil = m[1];
  else if (/^Pada garis bilangan, .+ berdiri di angka \d+\. .+ melompat \d+ langkah ke kiri\./.test(p)) hasil = String(n[0] - n[1]);
  else if (/^Pada bagan pasangan .+ bilangan utuhnya \d+ dan satu bagiannya \d+\./.test(p)) hasil = String(n[0] - n[1]);
  else if (/membentuk satu keluarga\. Mana kalimat pengurangan yang benar\?$/.test(p)) {
    hasil = n[0] + n[1] === n[2] ? hanya(s.opts, (o) => benarHitung(o) === true) : "?";
  } else if ((m = p.match(/^Hasil (\d+) − (\d+) = (\d+)\. Cara memeriksanya dengan penjumlahan adalah\.\.\.$/))) {
    hasil = +m[1] - +m[2] === +m[3] ? `${m[3]} + ${m[2]} = ${m[1]}` : "?";
  } else if ((m = p.match(/^Isi titik-titik: \.\.\. − (\d+) = (\d+)$/))) hasil = String(+m[1] + +m[2]);
  else if ((m = p.match(/^Isi titik-titik: (\d+) − \.\.\. = (\d+)$/))) hasil = String(+m[1] - +m[2]);
  else if ((m = p.match(/^Mana yang hasilnya lebih besar: (.+) atau (.+)\?$/))) {
    const x = ev(m[1]);
    const y = ev(m[2]);
    hasil = x === y ? "?" : x > y ? m[1] : m[2];
  } else if ((m = p.match(/mencari kalimat pengurangan\. Mana yang hasilnya (\d+)\?$/))) hasil = hanya(s.opts, (o) => ev(o) === +m[1]);
  else if ((m = p.match(/menulis (\d+) − (\d+) = (\d+)\. Hasil yang benar adalah/))) hasil = +m[3] === +m[1] - +m[2] ? "?" : String(+m[1] - +m[2]);
  else if ((m = p.match(/^Di .+ ada (\d+) .+\. Lalu (\d+) .+\. .+ menulis (\d+) \+ (\d+) = (\d+)\. Perbaikan/))) {
    const [a, b] = [+m[1], +m[2]];
    hasil = +m[3] === a && +m[4] === b && +m[5] === a + b && a > b ? `${a} − ${b} = ${a - b}` : "?";
  } else if ((m = p.match(/menghitung mundur untuk (\d+) − (\d+)\. .+ mulai dari \d+, lalu melompat \d+ langkah ke kiri dan sampai di (\d+)\. Pernyataan/))) {
    const r = +m[1] - +m[2];
    hasil = +m[3] === r ? `Benar, hasilnya ${r}` : `Salah, hasil yang benar adalah ${r}`;
  } else if ((m = p.match(/"(\d+) − (\d+) dan (\d+) − (\d+) hasilnya sama karena/))) hasil = +m[1] > +m[2] && m[3] === m[2] && m[4] === m[1] ? `Salah, ${m[2]} lebih kecil dari ${m[1]} sehingga ${m[2]} − ${m[1]} tidak bisa dihitung` : "?";
  else if (/Kalimat yang TIDAK termasuk keluarga ini adalah\.\.\.$/.test(p)) {
    const ok = n[0] + n[1] === n[2];
    const salahIdx = s.opts.map((o) => benarHitung(o) === false);
    hasil = ok && salahIdx.filter(Boolean).length === 1 ? s.opts[salahIdx.indexOf(true)] : "?";
  } else if ((m = p.match(/^.+ punya empat kartu pengurangan\. Kartu yang hasilnya paling (besar|kecil) \((.+)\) adalah\.\.\.$/))) {
    const kartu = m[2].split("; ");
    const nilai = kartu.map(ev);
    const tgt = m[1] === "besar" ? Math.max(...nilai) : Math.min(...nilai);
    const sama = kartu.filter((x) => ev(x) === tgt);
    hasil = new Set(nilai).size === 4 && sama.length === 1 && s.opts.every((o) => kartu.includes(o)) ? sama[0] : "?";
  } else if ((m = p.match(/^Di .+ ada (\d+) (.+?)\. Lalu (\d+) .+\. Pernyataan yang (benar|SALAH) adalah\.\.\.$/))) {
    const a = +m[1];
    const b = +m[3];
    const r = a - b;
    const nil = s.opts.map((o) => {
      let q;
      if ((q = o.match(/^Sisa .+ ada (\d+)$/))) return +q[1] === r;
      if ((q = o.match(/^(\d+) − (\d+) = (\d+)$/))) return +q[1] === a && +q[2] === b && +q[3] === r;
      if ((q = o.match(/^Mula-mula ada (\d+) /))) return +q[1] === a;
      if ((q = o.match(/^Yang berkurang ada (\d+) /))) return +q[1] === b;
      return null;
    });
    const diminta = m[4] === "benar";
    hasil = nil.some((x) => x === null) || nil.filter((x) => x === diminta).length !== 1 ? "?" : s.opts[nil.indexOf(diminta)];
  } else if (/Mana pasangan yang hasilnya sama\?$/.test(p)) {
    const nil = s.opts.map((o) => { const q = o.match(/^(\d+) − (\d+) dan (\d+) − (\d+)$/); return +q[1] - +q[2] === +q[3] - +q[4]; });
    hasil = nil.filter(Boolean).length === 1 ? s.opts[nil.indexOf(true)] : "?";
  } else if ((m = p.match(/mengisi kotak: (\d+) − \[ \] = (\d+)\. .+ menulis (\d+) di dalam kotak\. Pernyataan/))) {
    const a = +m[1];
    const r = +m[2];
    const t = +m[3];
    hasil = t === a - r ? `Benar, karena ${a} − ${t} = ${r}` : `Salah, isi kotak yang benar adalah ${a - r}`;
  } else if ((m = p.match(/^(\w+) punya (\d+) .+?, lalu memberikan (\d+) .+?\. (\w+) punya (\d+) .+?, lalu memberikan (\d+) .+?\. Siapa/))) {
    const x = +m[2] - +m[3];
    const y = +m[5] - +m[6];
    hasil = x === y ? "Sama banyak" : x > y ? m[1] : m[4];
  } else if ((m = p.match(/^(\w+) punya (\d+) .+? dan (\w+) punya (\d+) .+?\. Keduanya sama-sama memberikan (\d+) .+ kepada ibu\. Siapa/))) {
    hasil = +m[5] > Math.min(+m[2], +m[4]) ? "?" : +m[2] === +m[4] ? "Sama banyak" : +m[2] > +m[4] ? m[1] : m[3];
  } else if ((m = p.match(/menghitung (\d+) − (\d+) = (\d+)\. Untuk memeriksa, .+ menghitung (\d+) \+ (\d+) = (\d+)\. Kesimpulan/))) {
    const [a, b, x] = [+m[1], +m[2], +m[3]];
    const r = a - b;
    hasil = +m[4] === x && +m[5] === b && +m[6] === x + b ? (x === r ? `Jawaban benar, karena ${x} + ${b} = ${a}` : `Jawaban salah, hasil yang benar adalah ${r}`) : "?";
  } else if ((m = p.match(/sudah (.+)\. Langkah berikutnya adalah\.\.\.$/))) {
    const i = LANGKAH.indexOf(m[1]);
    hasil = i >= 0 && i < 5 ? LANGKAH[i + 1] : "?";
  } else if (/Mula-mula \d+ .+ lalu \d+ .+ lagi\. Sisa .+ sekarang ada\.\.\.$/.test(p)) hasil = n[0] - n[1] - n[2] >= 0 ? String(n[0] - n[1] - n[2]) : "?";
  else if (/Berapa .+ yang tersisa[?]$/.test(p)) hasil = String(n[0] - n[1]);
  else if (/diambil, lalu \d+ .+ dikembalikan\. Banyak/.test(p)) hasil = n[2] < n[1] ? String(n[0] - n[1] + n[2]) : "?";
  else if ((m = p.match(/Bilangan itu dikurangi (\d+) hasilnya (\d+)\./))) hasil = String(+m[1] + +m[2]);
  else if ((m = p.match(/Kalimat yang (SALAH|benar) adalah\.\.\.$/))) {
    const diminta = m[1] === "benar";
    const nil = s.opts.map((o) => benarHitung(o));
    hasil = nil.some((x) => x === null) || nil.filter((x) => x === diminta).length !== 1 ? "?" : s.opts[nil.indexOf(diminta)];
  } else if ((m = p.match(/^Mana cerita yang cocok dengan kalimat (\d+) − (\d+) = (\d+)\?$/))) {
    const a = +m[1];
    const b = +m[2];
    const cocok = s.opts.filter((o) => { const q = o.match(/^Ada (\d+) .+?, (\d+) .+$/); return q && +q[1] === a && +q[2] === b; });
    hasil = +m[3] === a - b && cocok.length === 1 ? cocok[0] : "?";
  } else if (/Cerita yang TIDAK cocok memakai tanda pengurangan adalah\.\.\.$/.test(p)) {
    const rxT = /(datang lagi|bergabung|diberi lagi|ditambah)/;
    const tambah = s.opts.filter((o) => rxT.test(o));
    const lain = s.opts.filter((o) => !rxT.test(o));
    hasil = tambah.length === 1 && lain.length === 3 ? tambah[0] : "?";
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
console.log(`tidak ada penghitung (definisi tetap): ${sisa.reduce((a, b) => a + b[1], 0)}`);
if (process.argv.includes("--sisa")) for (const [j, c] of sisa) console.log(`  ${c}x ${j}`);
console.log(`lulus ${lulus}, gagal ${gagal}`);
process.exit(gagal === 0 ? 0 : 1);
