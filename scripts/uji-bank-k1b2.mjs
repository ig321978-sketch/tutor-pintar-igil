// Uji bank soal Kelas 1 Bab 2 (supabase/seed/02_kelas1_bab2_bank_keys.sql, berkas lokal berisi kunci).
// Skrip ini tidak memuat soal. Tiap soal dibaca ulang dari SQL, bilangan dalam kalimatnya diurai, lalu jawabannya
// dihitung ulang tanpa memakai pembuat soal, dan dicocokkan dengan kunci.
// Pakai: node --no-warnings scripts/uji-bank-k1b2.mjs [--sisa]
import fs from "node:fs";

const BERKAS = "supabase/seed/02_kelas1_bab2_bank_keys.sql";
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
const rxL = /^\s*\('k1-mat-bab2', '([^']+)', (\d), '((?:[^']|'')*)', '((?:[^']|'')*)', '(\[.*?\])'::jsonb, '(\w+)', '(\[.*?\])'::jsonb, '(\[.*?\])'::jsonb\)/gm;
const rxU = /^\s*\('k1-mat-bab2', 'acak', '([^']+)', '((?:[^']|'')*)', '(\[.*?\])'::jsonb, (\d), '(\w+)'\)/gm;
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
  cek(!/kelompok|kurang/i.test(s.prompt + s.opts.join(" ") + (s.set === "L" ? s.exp : "")), `${lab} memakai kata terlarang (kelompok/kurang)`);
  if (s.opts.every((o) => /^\d+$/.test(o))) {
    cek(s.opts.every((o, i) => i === 0 || +s.opts[i - 1] < +o), `${lab} angka tidak naik`);
    cek(s.opts.every((o) => +o <= 10), `${lab} pilihan angka lebih dari 10`);
  }
  if (s.set === "L") cek(s.exp.length > 10, `${lab} pembahasan terlalu pendek`);
  if (s.set === "U") cek(s.v1.length === 0, `${lab} ujian tidak boleh memakai visual`);
  // batas materi: jumlah yang tertulis pada kalimat "p + q = r" harus paling besar 10
  for (const m of (s.prompt + " " + s.opts.join(" ")).matchAll(/(\d+) \+ (\d+) = (\d+)/g)) cek(+m[1] + +m[2] <= 10 && +m[3] <= 10, `${lab} jumlah lebih dari 10 pada "${m[0]}"`);
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
  const m = t.match(/^(\d+) \+ (\d+)$/);
  return m ? +m[1] + +m[2] : null;
};
const KATA = ["nol", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan", "sepuluh"];
const LANGKAH = ["membaca ceritanya", "mencari bilangannya", "memilih tanda tambah", "menulis kalimat dan menghitung", "menulis jawaban dengan kalimat", "memeriksa jawabannya"];

// ---------- hitung ulang ----------
let diperiksa = 0;
const tidak = {};
for (const s of semua) {
  const p = s.prompt;
  const lab = `${s.set}${s.id}`;
  const k = kunci(s);
  let m;
  let hasil = null;
  let ganda = null; // jumlah pilihan benar yang diharapkan (untuk soal pilih pernyataan)
  const n = ints(p);
  if ((m = p.match(/^Kalimat (\d+) \+ (\d+) = (\d+) dibaca\.\.\.$/))) {
    const [a, b, r] = [+m[1], +m[2], +m[3]];
    hasil = a + b === r ? `${KATA[a]} ditambah ${KATA[b]} sama dengan ${KATA[r]}` : "?";
  } else if (/Kalimat penjumlahan yang sesuai adalah\.\.\.$/.test(p)) {
    const [a, b] = n;
    hasil = `${a} + ${b} = ${a + b}`;
  } else if ((m = p.match(/^Berapa hasil (\d+) \+ (\d+)\?$/))) hasil = String(+m[1] + +m[2]);
  else if (/Jumlah semua .+ ada\.\.\.$/.test(p) && s.v1.length > 0 && n.length === 0) hasil = String(s.v1.length + s.v2.length);
  else if ((m = p.match(/^Diketahui (\d+) \+ (\d+) = (\d+)\. Maka (\d+) \+ (\d+) = \.\.\.$/))) hasil = +m[1] + +m[2] === +m[3] && +m[4] === +m[2] && +m[5] === +m[1] ? m[3] : "?";
  else if ((m = p.match(/^Untuk menghitung (\d+) \+ (\d+) dengan menghitung maju, kita mulai dari angka\.\.\.$/))) hasil = m[1];
  else if (/penjumlahan berulang, yaitu bilangan yang sama ditambahkan/.test(p)) {
    const sama = s.opts.filter((o) => { const x = ev(o); const q = o.match(/^(\d+) \+ (\d+)$/); return q && q[1] === q[2] && x !== null; });
    hasil = sama.length === 1 ? sama[0] : "?";
  } else if (/^.+ ditambah.*Berapa jumlah|Berapa jumlah semua .+\?$/.test(p) && !/kendaraan/.test(p) && !/Di dekatnya ada/.test(p)) {
    hasil = String(n[0] + n[1]);
  } else if (/Berapa jumlah semua kendaraan\?$/.test(p)) hasil = String(n[0] + n[1]);
  else if (/Di dekatnya ada \d+ .+\. Berapa jumlah semua/.test(p)) hasil = String(n[0] + n[1]);
  else if (/melompat \d+ langkah ke kanan/.test(p)) hasil = String(n[0] + n[1]);
  else if ((m = p.match(/^Mana kalimat yang hasilnya sama dengan (\d+) \+ (\d+)\?$/))) {
    const t = +m[1] + +m[2];
    const sama = s.opts.filter((o) => ev(o) === t);
    hasil = sama.length === 1 && sama[0] === `${m[2]} + ${m[1]}` ? sama[0] : "?";
  } else if (/menaruh \d+ .+ di piring kiri dan \d+ .+ di piring kanan/.test(p)) hasil = n[0] === n[1] ? String(n[0] + n[1]) : "?";
  else if (/Titik biru yang perlu ditambah agar bingkai penuh/.test(p)) hasil = String(10 - n[0]);
  else if (/^.+ punya \d+ .+\. Setelah diberi lagi, .+ punya \d+ .+\. Banyak/.test(p)) hasil = String(n[1] - n[0]);
  else if ((m = p.match(/^Isi titik-titik: \.\.\. \+ (\d+) = (\d+)$/))) hasil = String(+m[2] - +m[1]);
  else if ((m = p.match(/^Isi titik-titik: (\d+) \+ \.\.\. = (\d+)$/))) hasil = String(+m[2] - +m[1]);
  else if ((m = p.match(/^Mana yang hasilnya lebih besar: (.+) atau (.+)\?$/))) {
    const x = ev(m[1]);
    const y = ev(m[2]);
    hasil = x === y ? "?" : x > y ? m[1] : m[2];
  } else if ((m = p.match(/Mana yang hasilnya (\d+)\?$/))) {
    const t = +m[1];
    const cocok = s.opts.filter((o) => ev(o) === t);
    hasil = cocok.length === 1 ? cocok[0] : "?";
  } else if ((m = p.match(/menulis (\d+) \+ (\d+) = (\d+)\. Hasil yang benar adalah/))) hasil = +m[3] === +m[1] + +m[2] ? "?" : String(+m[1] + +m[2]);
  else if ((m = p.match(/Datang lagi (\d+) (.+?)\. .+ menulis (\d+) − (\d+) = (\d+)\. Perbaikan yang tepat/))) {
    const a = +p.match(/ada (\d+) /)[1];
    const b = +m[1];
    const cocok = s.opts.filter((o) => { const q = o.match(/^(\d+) \+ (\d+) = (\d+)$/); return q && +q[1] === a && +q[2] === b && +q[3] === a + b; });
    hasil = cocok.length === 1 ? cocok[0] : "?";
  } else if ((m = p.match(/menghitung maju untuk (\d+) \+ (\d+)\. .+ mulai dari \d+, lalu melompat \d+ langkah dan sampai di (\d+)\. Pernyataan/))) {
    const sm = +m[1] + +m[2];
    hasil = +m[3] === sm ? `Benar, hasilnya ${sm}` : `Salah, hasil yang benar adalah ${sm}`;
  } else if ((m = p.match(/"(\d+) \+ (\d+) dan (\d+) \+ (\d+) hasilnya berbeda/))) hasil = `Salah, hasil keduanya sama, yaitu ${+m[1] + +m[2]}`;
  else if (/jika ditambah hasilnya (BUKAN )?10\?$/.test(p)) {
    const bukan = /BUKAN 10/.test(p);
    const t = s.opts.map((o) => ev(o) === 10);
    const diminta = !bukan;
    hasil = t.filter((x) => x === diminta).length === 1 ? s.opts[t.indexOf(diminta)] : "?";
  } else if ((m = p.match(/^.+ punya empat kartu penjumlahan\. Kartu yang hasilnya paling (besar|kecil) \((.+)\) adalah\.\.\.$/))) {
    const kartu = m[2].split("; ");
    const nilai = kartu.map(ev);
    const tgt = m[1] === "besar" ? Math.max(...nilai) : Math.min(...nilai);
    const sama = kartu.filter((x) => ev(x) === tgt);
    hasil = new Set(nilai).size === 4 && sama.length === 1 && s.opts.every((o) => kartu.includes(o)) ? sama[0] : "?";
  } else if ((m = p.match(/^Di .+ ada (\d+) (.+?)\. Datang lagi (\d+) .+?\. Pernyataan yang (benar|SALAH) adalah\.\.\.$/))) {
    const a = +m[1];
    const b = +m[3];
    const sm = a + b;
    const nil = s.opts.map((o) => {
      let q;
      if ((q = o.match(/^Jumlah semua .+ ada (\d+)$/))) return +q[1] === sm;
      if ((q = o.match(/^(\d+) \+ (\d+) = (\d+)$/))) return +q[1] + +q[2] === +q[3] && +q[3] === sm;
      return null;
    });
    const diminta = m[4] === "benar";
    // "a + b = b + a" dianggap pernyataan benar
    const nil2 = s.opts.map((o, i) => (o === `${a} + ${b} = ${b} + ${a}` ? true : nil[i]));
    hasil = nil2.some((x) => x === null) || nil2.filter((x) => x === diminta).length !== 1 ? "?" : s.opts[nil2.indexOf(diminta)];
  } else if (/Mana pasangan yang hasilnya sama\?$/.test(p)) {
    const nil = s.opts.map((o) => { const q = o.match(/^(\d+) \+ (\d+) dan (\d+) \+ (\d+)$/); return +q[1] + +q[2] === +q[3] + +q[4]; });
    hasil = nil.filter(Boolean).length === 1 ? s.opts[nil.indexOf(true)] : "?";
  } else if ((m = p.match(/mengisi kotak: (\d+) \+ \[ \] = (\d+)\. .+ menulis (\d+) di dalam kotak\. Pernyataan/))) {
    const a = +m[1];
    const sm = +m[2];
    const t = +m[3];
    hasil = t === sm - a ? `Benar, karena ${a} + ${t} = ${sm}` : `Salah, isi kotak yang benar adalah ${sm - a}`;
  } else if ((m = p.match(/^(\w+) punya (\d+) .+?, lalu diberi (\d+) .+? lagi\. (\w+) punya (\d+) .+?, lalu diberi (\d+) .+? lagi\. Siapa/))) {
    const x = +m[2] + +m[3];
    const y = +m[5] + +m[6];
    hasil = x === y ? "Sama banyak" : x > y ? m[1] : m[4];
  } else if (/Banyak roda semuanya ada\.\.\.$/.test(p)) hasil = String(n[0] * n[2] + n[1] * n[3]);
  else if ((m = p.match(/sudah (.+)\. Langkah berikutnya adalah\.\.\.$/))) {
    const i = LANGKAH.indexOf(m[1]);
    hasil = i >= 0 && i < 5 ? LANGKAH[i + 1] : "?";
  } else if (/Berapa jumlah semua .+\?$/.test(p)) hasil = String(n[0] + n[1]);
  else if (/Kotak yang masih kosong ada\.\.\.$/.test(p)) hasil = String(10 - n[0] - n[1]);
  else if ((m = p.match(/Bilangan itu ditambah (\d+) hasilnya (\d+)\./))) hasil = String(+m[2] - +m[1]);
  else if (/dua kantong yang berisi .+ sama banyak\. Jumlah .+ ada (\d+)\./.test(p)) hasil = String(n[0] / 2);
  else if ((m = p.match(/Kalimat yang (SALAH|benar) adalah\.\.\.$/))) {
    const nil = s.opts.map((o) => { const q = o.match(/^(\d+) \+ (\d+) = (\d+)$/); return +q[1] + +q[2] === +q[3]; });
    const diminta = m[1] === "benar";
    hasil = nil.filter((x) => x === diminta).length === 1 ? s.opts[nil.indexOf(diminta)] : "?";
  } else if ((m = p.match(/^(\w+) menaruh (\d+) .+? di rak atas dan (\d+) .+? di rak bawah\. (\w+) menaruh (\d+) .+? di rak atas dan (\d+) .+? di rak bawah\./))) {
    const x = +m[2] + +m[3];
    const y = +m[5] + +m[6];
    hasil = x === y ? "Sama banyak" : x > y ? m[1] : m[4];
  } else if ((m = p.match(/^Mana cerita yang cocok dengan kalimat (\d+) \+ (\d+) = (\d+)\?$/))) {
    const a = +m[1];
    const b = +m[2];
    const cocok = s.opts.filter((o) => { const q = o.match(/^Ada (\d+) .+, datang lagi (\d+) /); return q && +q[1] === a && +q[2] === b; });
    hasil = +m[3] === a + b && cocok.length === 1 ? cocok[0] : "?";
  } else if (/Cerita yang TIDAK cocok memakai tanda tambah adalah\.\.\.$/.test(p)) {
    const kurang = s.opts.filter((o) => /(pergi|dimakan|diambil)/.test(o));
    const tambah = s.opts.filter((o) => /(datang lagi|bergabung|diberi lagi|ditambah)/.test(o));
    hasil = kurang.length === 1 && tambah.length === 3 ? kurang[0] : "?";
  }
  if (hasil === null) {
    const jenis = p.slice(0, 40);
    tidak[jenis] = (tidak[jenis] ?? 0) + 1;
    continue;
  }
  diperiksa += 1;
  cek(hasil !== "?" && k === hasil, `${lab} kunci "${k}" tetapi hitung ulang "${hasil}" :: ${p.slice(0, 110)}`);
  void ganda;
}

console.log(`diperiksa hitung ulang: ${diperiksa} dari ${semua.length} soal`);
const sisa = Object.entries(tidak);
console.log(`tidak ada penghitung (definisi tetap): ${sisa.reduce((a, b) => a + b[1], 0)}`);
if (process.argv.includes("--sisa")) for (const [j, c] of sisa) console.log(`  ${c}x ${j}`);
console.log(`lulus ${lulus}, gagal ${gagal}`);
process.exit(gagal === 0 ? 0 : 1);
