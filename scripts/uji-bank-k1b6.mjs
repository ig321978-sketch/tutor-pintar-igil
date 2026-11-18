// Uji bank soal Kelas 1 Bab 6 (supabase/seed/02_kelas1_bab6_bank_keys.sql, berkas lokal berisi kunci).
// Skrip ini tidak memuat soal. Tiap soal dibaca ulang dari SQL, bilangan dalam kalimatnya diurai, lalu jawabannya
// dihitung ulang tanpa memakai pembuat soal, dan dicocokkan dengan kunci.
// Pakai: node --no-warnings scripts/uji-bank-k1b6.mjs [--sisa]
import fs from "node:fs";

const BERKAS = "supabase/seed/02_kelas1_bab6_bank_keys.sql";
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
const rxL = /^\s*\('k1-mat-bab6', '([^']+)', (\d), '((?:[^']|'')*)', '((?:[^']|'')*)', '(\[.*?\])'::jsonb, '(\w+)', '(\[.*?\])'::jsonb, '(\[.*?\])'::jsonb\)/gm;
const rxU = /^\s*\('k1-mat-bab6', 'acak', '([^']+)', '((?:[^']|'')*)', '(\[.*?\])'::jsonb, (\d), '(\w+)'\)/gm;
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
const KONSEP = {
  "Kata yang artinya sama dengan selisih adalah...": "beda",
  "Dua kelompok benda dipasangkan satu-satu. Benda yang tidak mendapat pasangan menunjukkan...": "lebihnya",
  "Untuk mencari selisih dua bilangan, bilangan yang besar ... bilangan yang kecil.": "dikurangi",
};
const LANGKAH = ["menentukan bilangan awal", "menghitung mundur sebanyak bilangan yang dikurangkan", "menyebut bilangan terakhir sebagai hasilnya", "memeriksa hasil dengan menjumlahkan kembali"];
const PILIH_LANGKAH = ["Langkah pertama saja", "Langkah kedua saja", "Kedua langkah", "Tidak ada yang keliru"];
const bsKal = (x, r) => (x === r ? `Benar, hasilnya ${r}` : `Salah, hasil yang benar adalah ${r}`);
const hanya = (arr, f) => {
  const idx = arr.map(f);
  return idx.filter(Boolean).length === 1 ? arr[idx.indexOf(true)] : "?";
};
const evalOpsi = (t) => {
  const m = t.match(/^(\d+) ([+−]) (\d+)$/);
  return m ? (m[2] === "+" ? +m[1] + +m[3] : +m[1] - +m[3]) : NaN;
};

let diperiksa = 0;
const tidak = {};
for (const s of semua) {
  const p = s.prompt;
  const lab = `${s.set}${s.id}`;
  const k = kunci(s);
  let m;
  let hasil = null;
  if (p in KONSEP) hasil = KONSEP[p];
  else if (/^Lihat dua baris gambar .+ di atas\. Baris mana yang (lebih banyak|lebih sedikit)\?$/.test(p)) {
    const a = s.v1.length;
    const b = s.v2.length;
    const banyak = /lebih banyak\?$/.test(p);
    hasil = a === b ? "?" : (banyak ? a > b : a < b) ? "Baris atas" : "Baris bawah";
  } else if (/^Lihat gambar .+ milik .+ di atas\. Selisih banyak kedua baris adalah\.\.\.$/.test(p)) hasil = String(Math.abs(s.v1.length - s.v2.length));
  else if ((m = p.match(/^(\w+) punya (\d+) (\S+)\. (\w+) punya (\d+) \S+\. Selisih banyak \S+ mereka adalah\.\.\.$/))) hasil = String(Math.abs(+m[2] - +m[5]));
  else if ((m = p.match(/^(\w+) punya (\d+) (\S+) dan (\w+) punya (\d+) \S+\. (\S+) (\w+) (lebihnya|kurangnya) \.\.\. dari (\S+) (\w+)\.$/))) {
    const [n1, a, n2, b] = [m[1], +m[2], m[4], +m[5]];
    const besar = a > b ? n1 : n2;
    const urutBenar = m[8] === "lebihnya" ? m[7] === besar : m[10] === besar;
    hasil = urutBenar && a !== b && m[7] !== m[10] ? String(Math.abs(a - b)) : "?";
  } else if ((m = p.match(/^Hasil (\d+) \+ (\d+) adalah\.\.\.$/))) hasil = String(+m[1] + +m[2]);
  else if ((m = p.match(/^Hasil (\d+) − (\d+) adalah\.\.\.$/))) hasil = String(+m[1] - +m[2]);
  else if ((m = p.match(/^Untuk menghitung (\d+) \+ (\d+) dengan menghitung maju, mulai dari (\d+) lalu maju sebanyak \.\.\. kali\.$/))) hasil = +m[1] === +m[3] ? m[2] : "?";
  else if ((m = p.match(/^Bilangan (\d+) dapat dipisah menjadi 10 dan \.\.\.$/))) hasil = String(+m[1] - 10);
  else if ((m = p.match(/^(\w+) punya (\d+) \S+\. \1 diberi (\d+) \S+ lagi\. Sekarang \S+ \1 ada\.\.\.$/))) hasil = String(+m[2] + +m[3]);
  else if ((m = p.match(/^(\w+) punya (\d+) \S+, lalu memberikan (\d+) \S+ kepada adik\. Sisa \S+ \1 ada\.\.\.$/))) hasil = String(+m[2] - +m[3]);
  else if ((m = p.match(/^Pada garis bilangan, \w+ berdiri di angka (\d+) dan \w+ berdiri di angka (\d+)\. Selisih langkah keduanya adalah\.\.\.$/))) hasil = String(Math.abs(+m[1] - +m[2]));
  else if ((m = p.match(/^Kelompok \S+ A ada (\d+) dan kelompok \S+ B ada (\d+)\. Agar sama banyak, kelompok A perlu ditambah \.\.\. \S+\.$/))) hasil = +m[2] > +m[1] ? String(+m[2] - +m[1]) : "?";
  else if ((m = p.match(/^(\w+) punya (\d+) (\S+)\. Banyak \3 (\w+) lebihnya (\d+) dari \3 \1\. Banyak \3 \4 ada\.\.\.$/))) hasil = String(+m[2] + +m[5]);
  else if ((m = p.match(/^(\w+) punya (\d+) (\S+)\. Banyak \3 (\w+) kurangnya (\d+) dari \3 \1\. Banyak \3 \4 ada\.\.\.$/))) hasil = String(+m[2] - +m[5]);
  else if ((m = p.match(/^(\w+) punya (\d+) (\S+) dan (\w+) punya (\d+) \3\. Jumlah \3 mereka ada\.\.\.$/))) hasil = String(+m[2] + +m[5]);
  else if ((m = p.match(/^Tabel puluhan dan satuan \w+: puluhan 1, satuan (\d+)\. \w+ menambah satuannya sebanyak (\d+)\. Bilangan yang terbentuk sekarang adalah\.\.\.$/))) hasil = String(10 + +m[1] + +m[2]);
  else if ((m = p.match(/^Tabel puluhan dan satuan \w+: puluhan 1, satuan (\d+)\. \w+ mengurangi satuannya sebanyak (\d+)\. Bilangan yang terbentuk sekarang adalah\.\.\.$/))) hasil = String(10 + +m[1] - +m[2]);
  else if ((m = p.match(/^\w+ membeli (\d+) \S+\. Ternyata (\d+) \S+ rusak\. Sisa \S+ yang masih bagus ada\.\.\.$/))) hasil = String(+m[1] - +m[2]);
  else if ((m = p.match(/^Untuk menghitung (\d+) ([+−]) (\d+), \w+ memisah \1 menjadi 10 dan (\d+)\. Setelah itu ia menghitung \4 \2 \3 = (\d+)\. Hasil \1 \2 \3 adalah\.\.\.$/))) {
    const [a, op, b, u, sat] = [+m[1], m[2], +m[3], +m[4], +m[5]];
    const bagus = u === a - 10 && sat === (op === "+" ? u + b : u - b);
    hasil = bagus ? String(op === "+" ? a + b : a - b) : "?";
  } else if ((m = p.match(/^Untuk menghitung (\d+) \+ (\d+), \2 dipisah menjadi (\d+) dan (\d+)\. Setelah \1 \+ \3 = 10, hasil akhirnya 10 \+ \4 = \.\.\.$/))) hasil = +m[1] + +m[3] === 10 && +m[3] + +m[4] === +m[2] ? String(+m[1] + +m[2]) : "?";
  else if ((m = p.match(/menghitung selisih (\d+) dan (\d+) dan mendapat (\d+)\. Pernyataan yang tepat adalah\.\.\.$/))) {
    const d = Math.abs(+m[1] - +m[2]);
    hasil = +m[3] === d ? `Benar, selisihnya ${d}` : `Salah, selisih yang benar adalah ${d}`;
  } else if ((m = p.match(/mencari selisih (\d+) dan (\d+)\. Ia menulis (\d+) − (\d+)\. Tanggapan yang tepat adalah\.\.\.$/))) {
    const [a, b] = [+m[1], +m[2]];
    hasil = a > b && +m[3] === b && +m[4] === a ? `Salah, seharusnya ${a} − ${b} = ${a - b}` : "?";
  } else if ((m = p.match(/^(\w+) punya (\d+) (\S+), (\w+) punya (\d+) \3\. (\w+) berkata, "Lebihnya \3 (\w+) ada (\d+)\." Tanggapan yang tepat adalah\.\.\.$/))) {
    const [X, a, Y, b, W, dd] = [m[1], +m[2], m[4], +m[5], m[7], +m[8]];
    const big = a > b ? X : Y;
    const d = Math.abs(a - b);
    hasil = a === b ? "?" : W !== big ? `Salah, yang lebih banyak adalah ${big}` : dd === d ? "Benar" : `Salah, selisihnya ${d}`;
  } else if ((m = p.match(/menghitung (\d+) \+ (\d+) dan mendapat (\d+)\. Pernyataan yang tepat adalah\.\.\.$/))) hasil = bsKal(+m[3], +m[1] + +m[2]);
  else if ((m = p.match(/menghitung (\d+) − (\d+) dan mendapat (\d+)\. Pernyataan yang tepat adalah\.\.\.$/))) hasil = bsKal(+m[3], +m[1] - +m[2]);
  else if ((m = p.match(/menghitung (\d+) \+ (\d+)\. Ia memisah \2 menjadi (\d+) dan (\d+), lalu menulis \1 \+ \3 = 10 dan 10 \+ \4 = (\d+)\. Pernyataan yang tepat adalah\.\.\.$/))) hasil = +m[1] + +m[3] === 10 && +m[3] + +m[4] === +m[2] ? bsKal(+m[5], +m[1] + +m[2]) : "?";
  else if ((m = p.match(/menghitung (\d+) ([+−]) (\d+)\. Ia memisah \1 menjadi 10 dan (\d+), lalu menulis: \4 \2 \3 = (\d+) dan 10 \+ \5 = (\d+)\. Langkah yang keliru adalah\.\.\.$/))) {
    const [a, op, b, u, pp, q] = [+m[1], m[2], +m[3], +m[4], +m[5], +m[6]];
    const s1 = pp !== (op === "+" ? u + b : u - b);
    const s2 = q !== 10 + pp;
    hasil = u !== a - 10 ? "?" : s1 && s2 ? PILIH_LANGKAH[2] : s1 ? PILIH_LANGKAH[0] : s2 ? PILIH_LANGKAH[1] : PILIH_LANGKAH[3];
  } else if ((m = p.match(/^(\w+) punya (\d+) (\S+)\. Banyak \3 (\w+) (\d+) (lebihnya|kurangnya) dari \3 \1\. Jumlah \3 \1 dan \4 adalah\.\.\.$/))) {
    const a = +m[2];
    const lain = m[6] === "lebihnya" ? a + +m[5] : a - +m[5];
    hasil = String(a + lain);
  } else if ((m = p.match(/^(\w+) punya (\d+) (\S+) dan (\d+) (\S+)\. (\w+) punya (\d+) \3 dan (\d+) \5\. Selisih banyak (\S+) \1 dan \6 adalah\.\.\.$/))) {
    const [a, b, pp, q] = [+m[2], +m[7], +m[4], +m[8]];
    hasil = m[9] === m[3] ? String(Math.abs(a - b)) : m[9] === m[5] ? String(Math.abs(pp - q)) : "?";
  } else if ((m = p.match(/^(\w+) punya (\d+) (\S+) dan (\w+) punya (\d+) \3\. Pernyataan yang (benar|SALAH) adalah\.\.\.$/))) {
    const [n1, a, n2, b] = [m[1], +m[2], m[4], +m[5]];
    const nil = s.opts.map((o) => {
      let q;
      if ((q = o.match(/^(\w+) punya \S+ lebih banyak dari (\w+)$/))) return q[1] === n1 && q[2] === n2 ? a > b : q[1] === n2 && q[2] === n1 ? b > a : null;
      if ((q = o.match(/^Selisih \S+ mereka adalah (\d+)$/))) return +q[1] === Math.abs(a - b);
      if ((q = o.match(/^\S+ (\w+) (lebihnya|kurangnya) (\d+) dari \S+ (\w+)$/))) {
        const nama1 = q[1];
        const nama2 = q[4];
        if (!((nama1 === n1 && nama2 === n2) || (nama1 === n2 && nama2 === n1))) return null;
        const bn = q[2] === "lebihnya" ? nama1 : nama2;
        const bigNama = a > b ? n1 : n2;
        return bn === bigNama && +q[3] === Math.abs(a - b);
      }
      if ((q = o.match(/^Jumlah \S+ mereka adalah (\d+)$/))) return +q[1] === a + b;
      return null;
    });
    const diminta = m[6] === "benar";
    hasil = a === b || nil.some((x) => x === null) || nil.filter((x) => x === diminta).length !== 1 ? "?" : s.opts[nil.indexOf(diminta)];
  } else if ((m = p.match(/membandingkan selisih dua pasangan bilangan\. Pasangan A: (\d+) dan (\d+)\. Pasangan B: (\d+) dan (\d+)\. Pasangan yang selisihnya lebih (kecil|besar) adalah\.\.\.$/))) {
    const d1 = Math.abs(+m[1] - +m[2]);
    const d2 = Math.abs(+m[3] - +m[4]);
    hasil = d1 === d2 ? "Sama besar" : (m[5] === "kecil" ? d1 < d2 : d1 > d2) ? "Pasangan A" : "Pasangan B";
  } else if ((m = p.match(/^\w+ punya (\d+) \S+\. Setelah diberi Ibu, \S+ \w+ menjadi (\d+)\. Banyak \S+ yang diberikan Ibu ada\.\.\.$/))) hasil = String(+m[2] - +m[1]);
  else if ((m = p.match(/^\w+ mempunyai (\d+) \S+\. Setelah ada yang rusak, \S+ yang bagus tinggal (\d+)\. Banyak \S+ yang rusak ada\.\.\.$/))) hasil = String(+m[1] - +m[2]);
  else if ((m = p.match(/menghitung (\d+) − (\d+) dan mendapat (\d+)\. Untuk memeriksa, ia menghitung \3 \+ \2\. Hasil pemeriksaan dan kesimpulannya adalah\.\.\.$/))) {
    const a = +m[1];
    const S = +m[3] + +m[2];
    const cocok = s.opts.map((o) => {
      const q = o.match(/^(\d+), (sama dengan|tidak sama dengan) (\d+), jadi hitungan (benar|salah)$/);
      if (!q || +q[3] !== a) return false;
      const klaimSama = q[2] === "sama dengan";
      return +q[1] === S && klaimSama === (S === a) && (q[4] === "benar") === klaimSama;
    });
    hasil = cocok.filter(Boolean).length === 1 ? s.opts[cocok.indexOf(true)] : "?";
  } else if ((m = p.match(/akan menghitung (\d+) − (\d+) dengan menghitung mundur\. \w+ sudah (.+)\. Langkah berikutnya adalah\.\.\.$/))) {
    const i = LANGKAH.indexOf(m[3]);
    hasil = i >= 0 && i < 3 ? LANGKAH[i + 1] : "?";
  } else if ((m = p.match(/^Diketahui (\d+) \+ (\d+) = (\d+)\. \w+ ingin menulis kalimat pengurangan yang benar\. Kalimat yang benar adalah\.\.\.$/))) {
    const [a, b, c] = [+m[1], +m[2], +m[3]];
    hasil = a + b === c ? hanya(s.opts, (o) => { const q = o.match(/^(\d+) − (\d+) = (\d+)$/); return q && +q[1] - +q[2] === +q[3] && +q[1] === c; }) : "?";
  } else if ((m = p.match(/^\w+ menghitung (\d+) \+ (\d+)\. Hasil \1 \+ \2 sama dengan hasil\.\.\.$/))) {
    const r = +m[1] + +m[2];
    hasil = hanya(s.opts, (o) => evalOpsi(o) === r);
  } else if ((m = p.match(/menghitung (\d+) ([+−]) (\d+) dengan tabel puluhan dan satuan\. Hasilnya ditulis puluhan (\d+), satuan (\d+)\. Pernyataan yang tepat adalah\.\.\.$/))) {
    const r = m[2] === "+" ? +m[1] + +m[3] : +m[1] - +m[3];
    hasil = bsKal(+m[4] * 10 + +m[5], r);
  } else if ((m = p.match(/^\w+ punya (\d+) \S+\. Ia diberi (\d+) \S+, lalu memberikan (\d+) \S+ kepada adik\. \S+ \w+ sekarang ada\.\.\.$/))) hasil = String(+m[1] + +m[2] - +m[3]);
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
