// Uji bank soal Kelas 1 Bab 4 (supabase/seed/02_kelas1_bab4_bank_keys.sql, berkas lokal berisi kunci).
// Skrip ini tidak memuat soal. Tiap soal dibaca ulang dari SQL, datanya diurai dari kalimat soal, lalu jawabannya
// dihitung ulang dengan tabel fakta bentuk milik skrip ini sendiri (bukan pembuat soal) dan dicocokkan dengan kunci.
// Pakai: node --no-warnings scripts/uji-bank-k1b4.mjs
import fs from "node:fs";

const BERKAS = "supabase/seed/02_kelas1_bab4_bank_keys.sql";
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
const rxL = /^\s*\('k1-mat-bab4', '([^']+)', (\d), '((?:[^']|'')*)', '((?:[^']|'')*)', '(\[.*?\])'::jsonb, '(\w+)', '(\[.*?\])'::jsonb, '(\[.*?\])'::jsonb\)/gm;
const rxU = /^\s*\('k1-mat-bab4', 'acak', '([^']+)', '((?:[^']|'')*)', '(\[.*?\])'::jsonb, (\d), '(\w+)'\)/gm;
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

// ---------- tabel fakta bentuk (milik skrip uji) ----------
const FAKTA = { lengkung: 0, segitiga: 3, "segi empat": 4 };
const KAT = {
  lengkung: ["bola", "donat", "piring", "jam dinding", "roda sepeda", "uang koin", "kue cucur", "bulan purnama", "tutup toples", "kancing baju"],
  segitiga: ["irisan semangka", "irisan pizza", "penggaris segitiga", "bendera pandu", "atap rumah", "rambu hati-hati", "sandwich segitiga", "keripik segitiga"],
  "segi empat": ["buku tulis", "papan tulis", "pintu", "jendela", "sapu tangan", "kartu ucapan", "layar televisi", "bendera merah putih", "keramik lantai", "selembar roti tawar"],
};
const SHAPE_OF = {};
for (const [s, arr] of Object.entries(KAT)) arr.forEach((n) => (SHAPE_OF[n] = s));
const sh = (nama) => SHAPE_OF[nama.charAt(0).toLowerCase() + nama.slice(1)] ?? SHAPE_OF[nama];
const BENT = ["lengkung", "segitiga", "segi empat"];
const kunci = (s) => s.opts[s.ci];
const hanya = (arr, f) => {
  const idx = arr.map(f);
  return idx.filter(Boolean).length === 1 ? arr[idx.indexOf(true)] : "?";
};
const parseItem = (t) => {
  const m = t.match(/^(lengkung|segitiga|segi empat) (merah|biru|kuning|hijau)(?: (besar|kecil))?$/);
  return m ? { bentuk: m[1], warna: m[2], ukuran: m[3] } : null;
};
const parseDaftar = (t) => t.split("; ").map(parseItem);
const parseDaftarPW = (t) => t.split("; ").map(parseItem);
const CIRI = (c) => BENT.filter((s) => (/^(tidak punya sudut|tidak punya sisi lurus|tepinya melengkung)$/.test(c) ? s === "lengkung" : FAKTA[s] > 0 && c.includes(`${FAKTA[s]} `)));
const LANGKAH = ["mengamati bendanya", "memilih satu aturan", "memeriksa tiap benda", "menaruh benda di kelompoknya", "menyebutkan aturannya", "menghitung anggota kelompok"];
const hitungSisi = (daftar) => [...daftar.matchAll(/(\d+) (lengkung|segitiga|segi empat)/g)].reduce((a, m) => a + +m[1] * FAKTA[m[2]], 0);
const judge = (claim, truth) => (claim === truth ? `Benar, hasilnya ${truth}` : `Salah, hasil yang benar adalah ${truth}`);
const B3 = "(lengkung|segitiga|segi empat)";

let diperiksa = 0;
const tidak = {};
for (const s of semua) {
  const p = s.prompt;
  const lab = `${s.set}${s.id}`;
  const k = kunci(s);
  let m;
  let hasil = null;
  // ----- LOTS -----
  if ((m = p.match(new RegExp(`^Benda yang berbentuk ${B3} adalah\\.\\.\\.$`)))) hasil = hanya(s.opts, (o) => sh(o) === m[1]);
  else if ((m = p.match(/^(.+) berbentuk\.\.\.$/)) && sh(m[1])) hasil = sh(m[1]);
  else if ((m = p.match(/^(Segitiga|Segi empat|Bentuk lengkung) punya \.\.\. (sisi lurus|sudut)\.$/))) hasil = String(FAKTA[m[1].toLowerCase().replace("bentuk ", "")]);
  else if ((m = p.match(/^Bentuk yang (.+) adalah\.\.\.$/))) {
    const c = CIRI(m[1]);
    hasil = c.length === 1 ? c[0] : "?";
  } else if (/^Lihat gambar .+ di atas\. Banyak .+ pada gambar ada\.\.\.$/.test(p)) hasil = String(s.v1.length);
  else if ((m = p.match(/^Sebuah (bentuk lengkung|segitiga|segi empat) (diputar|dibalik|dibuat lebih besar|dibuat lebih kecil)\. Sekarang bentuknya masih\.\.\.$/))) hasil = m[1].replace("bentuk ", "");
  else if ((m = p.match(/^\w+ memisahkan (.+) ke dua nampan\. Aturan pengelompokannya adalah menurut\.\.\.$/))) hasil = /besar|kecil/.test(m[1]) ? "ukuran" : /merah|biru|kuning|hijau/.test(m[1]) ? "warna" : /bulat|kotak|segitiga/.test(m[1]) ? "bentuk" : "?";
  else if ((m = p.match(/^Kelompok \w+ berisi benda yang (berbentuk|berwarna|berukuran) (.+)\. Benda yang bisa masuk ke kelompok itu adalah\.\.\.$/))) {
    const a = { berbentuk: "bentuk", berwarna: "warna", berukuran: "ukuran" }[m[1]];
    hasil = hanya(s.opts, (o) => parseItem(o)?.[a] === m[2]);
  } else if (/^Menggabungkan beberapa keping menjadi satu bangun baru disebut\.\.\.$/.test(p) || /^Lawan dari mengurai adalah\.\.\.$/.test(p)) hasil = "menyusun";
  else if (/^Memisahkan satu bangun menjadi bagian-bagiannya disebut\.\.\.$/.test(p) || /^Lawan dari menyusun adalah\.\.\.$/.test(p)) hasil = "mengurai";
  else if (/^Dua segitiga yang sama bisa digabung menjadi satu bangun berbentuk\.\.\.$/.test(p)) hasil = "segi empat";
  else if (/^Dua segi empat yang sama dirapatkan pada satu sisi yang sama panjang\. Hasilnya adalah satu\.\.\.$/.test(p)) hasil = "segi empat yang lebih panjang";
  else if ((m = p.match(/^\w+ menyusun (\d+) keping segitiga dan (\d+) keping segi empat menjadi satu bangun\. Banyak keping seluruhnya ada\.\.\.$/))) hasil = String(+m[1] + +m[2]);
  else if ((m = p.match(new RegExp(`^(.+) berbentuk ${B3}\\. Banyak (sisi lurus|sudut) pada (.+) ada\\.\\.\\.$`)))) hasil = sh(m[1]) === m[2] ? String(FAKTA[m[2]]) : "?";
  // ----- MOTS -----
  else if ((m = p.match(new RegExp(`^Di meja ada: (.+)\\. Banyak benda yang berbentuk ${B3} ada\\.\\.\\.$`)))) hasil = String(m[1].split(", ").filter((x) => sh(x) === m[2]).length);
  else if ((m = p.match(/^Ada (.+), (.+), dan (.+)\. Banyak sudut ketiga benda itu seluruhnya ada\.\.\.$/))) hasil = String([m[1], m[2], m[3]].reduce((a, x) => a + FAKTA[sh(x)], 0));
  else if ((m = p.match(/^Kelompok \w+ berisi: (.+)\. Kelompok ini dibuat menurut aturan\.\.\.$/))) {
    const arr = parseDaftar(m[1]);
    hasil = hanya(s.opts, (o) => {
      const q = o.match(/^(bentuk|warna|ukuran) (.+)$/);
      return arr.every((i) => i[q[1]] === q[2]);
    });
  } else if ((m = p.match(/^Tabel tally \w+ menunjukkan lengkung (\d+), segitiga (\d+), dan segi empat (\d+)\. (.+)$/))) {
    const c = { lengkung: +m[1], segitiga: +m[2], "segi empat": +m[3] };
    const tot = c.lengkung + c.segitiga + c["segi empat"];
    let q;
    if (/^Banyak bentuk semuanya ada\.\.\.$/.test(m[4])) hasil = String(tot);
    else if ((q = m[4].match(new RegExp(`^Berapa lebih banyak ${B3} daripada ${B3}\\?$`)))) hasil = c[q[1]] > c[q[2]] ? String(c[q[1]] - c[q[2]]) : "?";
    else if ((q = m[4].match(new RegExp(`^Banyak bentuk yang bukan ${B3} ada\\.\\.\\.$`)))) hasil = String(tot - c[q[1]]);
  } else if ((m = p.match(/^\w+ menyusun .+ dari (\d+) segi empat, (\d+) segitiga, dan (\d+) lengkung\. Lalu (\d+) segi empat dilepas\. Banyak bagian yang tersisa ada\.\.\.$/))) hasil = +m[4] <= +m[1] ? String(+m[1] + +m[2] + +m[3] - +m[4]) : "?";
  else if ((m = p.match(/^Segitiga memakai 3 lidi dan segi empat memakai 4 lidi\. \w+ membuat (.+)\. Banyak lidi yang dipakai ada\.\.\.$/))) hasil = String(hitungSisi(m[1]));
  else if ((m = p.match(/^\w+ punya (\d+) lidi\. \w+ memakai lidi itu untuk membuat 1 (segitiga|segi empat) \((\d+) lidi\)\. Sisa lidi ada\.\.\.$/))) hasil = +m[3] === FAKTA[m[2]] ? String(+m[1] - +m[3]) : "?";
  else if ((m = p.match(/^\w+ mencari benda yang (.+)\. Benda yang cocok adalah\.\.\.$/))) {
    const c = CIRI(m[1]);
    hasil = c.length === 1 ? hanya(s.opts, (o) => sh(o) === c[0]) : "?";
  } else if ((m = p.match(new RegExp(`^Lemari dua ciri berisi: (.+)\\. Banyak benda yang berbentuk ${B3} dan berwarna (\\w+) ada\\.\\.\\.$`)))) hasil = String(parseDaftarPW(m[1]).filter((i) => i.bentuk === m[2] && i.warna === m[3]).length);
  else if ((m = p.match(/^Aturan kelompok: (bentuk|warna|ukuran) (.+)\. Benda yang tersedia: (.+)\. Banyak benda yang masuk kelompok ada\.\.\.$/))) hasil = String(parseDaftar(m[3]).filter((i) => i[m[1]] === m[2]).length);
  else if ((m = p.match(/^Selembar \w+ dipotong menjadi (\d+) keping\. Lalu (\d+) keping digabung kembali menjadi satu bangun\. Banyak bagian sekarang ada\.\.\.$/))) hasil = String(+m[1] - +m[2] + 1);
  // ----- HOTS -----
  else if ((m = p.match(new RegExp(`^\\w+ berkata, "(.+) berbentuk ${B3}\\." Tanggapan yang tepat adalah\\.\\.\\.$`)))) {
    const o = m[1].charAt(0).toLowerCase() + m[1].slice(1);
    const bs = SHAPE_OF[o];
    hasil = bs ? `${bs === m[2] ? "Benar" : "Salah"}, ${o} berbentuk ${bs}` : "?";
  } else if ((m = p.match(/^\w+ berkata, "(Segitiga|Segi empat|Bentuk lengkung) punya (\d+) (sisi lurus|sudut)\." Tanggapan yang tepat adalah\.\.\.$/))) {
    const sp = m[1].toLowerCase().replace("bentuk ", "");
    const f = `${sp === "lengkung" ? "bentuk lengkung" : sp} punya ${FAKTA[sp]} ${m[3]}`;
    hasil = `${+m[2] === FAKTA[sp] ? "Benar" : "Salah"}, ${f}`;
  } else if ((m = p.match(new RegExp(`^Bentuk misteri punya (sisi lurus|sudut) lebih (banyak|sedikit) daripada ${B3}(?:, tetapi lebih (banyak|sedikit) daripada ${B3})?\\. Bentuk misteri itu adalah\\.\\.\\.$`)))) {
    const c = BENT.filter((x) => (m[2] === "banyak" ? FAKTA[x] > FAKTA[m[3]] : FAKTA[x] < FAKTA[m[3]]) && (!m[4] || (m[4] === "banyak" ? FAKTA[x] > FAKTA[m[5]] : FAKTA[x] < FAKTA[m[5]])));
    hasil = c.length === 1 ? c[0] : "?";
  } else if ((m = p.match(new RegExp(`^Banyak (sisi lurus|sudut) bentuk misteri lebih (banyak|sedikit) (\\d+) daripada ${B3}\\. Bentuk misteri itu adalah\\.\\.\\.$`)))) {
    const c = BENT.filter((x) => (m[2] === "banyak" ? FAKTA[x] === FAKTA[m[4]] + +m[3] : FAKTA[x] === FAKTA[m[4]] - +m[3]));
    hasil = c.length === 1 ? c[0] : "?";
  } else if ((m = p.match(/^\w+ mengambil sebuah (bentuk lengkung|segitiga|segi empat), lalu (diputar|dibalik|dimiringkan)\. \w+ berkata, "Sekarang bentuknya (lengkung|segitiga|segi empat)\." Tanggapan yang tepat adalah\.\.\.$/))) {
    const sp = m[1].replace("bentuk ", "");
    hasil = `${m[3] === sp ? "Benar" : "Salah"}, bentuknya tetap ${sp}`;
  } else if ((m = p.match(/^\w+ punya empat benda: (.+)\. Tiga benda bentuknya sama dan satu benda berbeda\. Benda yang bentuknya berbeda adalah\.\.\.$/))) {
    const arr = m[1].split(", ");
    const c = BENT.map((x) => arr.filter((o) => sh(o) === x).length);
    hasil = c.includes(3) && c.includes(1) ? arr.find((o) => c[BENT.indexOf(sh(o))] === 1) : "?";
  } else if ((m = p.match(/^\w+ membuat kelompok dengan aturan (bentuk|warna|ukuran) (.+?): (.+)\. Benda yang salah masuk kelompok adalah\.\.\.$/))) {
    const arr = parseDaftar(m[3]);
    const luar = arr.filter((i) => i[m[1]] !== m[2]);
    hasil = luar.length === 1 ? `${luar[0].bentuk} ${luar[0].warna} ${luar[0].ukuran}` : "?";
  } else if ((m = p.match(/^(\w+) dan (\w+) melihat satu kelompok benda: (.+)\. \1 berkata aturannya (bentuk|warna|ukuran) (.+?)\. \2 berkata aturannya (bentuk|warna|ukuran) (.+?)\. Pernyataan yang tepat adalah\.\.\.$/))) {
    const arr = parseDaftar(m[3]);
    const tA = arr.every((i) => i[m[4]] === m[5]);
    const tB = arr.every((i) => i[m[6]] === m[7]);
    hasil = tA && tB ? `${m[1]} dan ${m[2]} sama-sama benar` : tA ? `${m[1]} saja yang benar` : tB ? `${m[2]} saja yang benar` : `${m[1]} dan ${m[2]} sama-sama salah`;
  } else if ((m = p.match(/^\w+ menghitung bentuk di papan: lengkung (\d+), segitiga (\d+), segi empat (\d+)\. \w+ berkata, "Banyak bentuk semuanya (\d+)\." Tanggapan yang tepat adalah\.\.\.$/))) hasil = judge(+m[4], +m[1] + +m[2] + +m[3]);
  else if ((m = p.match(new RegExp(`^Ada (\\d+) benda di meja \\w+\\. (\\d+) berbentuk ${B3} dan (\\d+) berbentuk ${B3}, sisanya ${B3}\\. Banyak benda ${B3} ada\\.\\.\\.$`)))) hasil = new Set([m[3], m[5], m[6]]).size === 3 && m[6] === m[7] ? String(+m[1] - +m[2] - +m[4]) : "?";
  else if ((m = p.match(/^\w+ menyusun (.+)\. \w+ berkata, "Banyak sudut semuanya (\d+)\." Tanggapan yang tepat adalah\.\.\.$/))) hasil = judge(+m[2], hitungSisi(m[1]));
  else if ((m = p.match(/^\w+ menyusun .+ dari (\d+) bagian\. Lalu (\d+) bagian ditambahkan, kemudian (\d+) bagian dilepas\. Banyak bagian sekarang ada\.\.\.$/))) hasil = +m[3] <= +m[1] + +m[2] ? String(+m[1] + +m[2] - +m[3]) : "?";
  else if ((m = p.match(/^\w+ punya (\d+) lidi\. \w+ ingin membuat (.+)\. Setiap segitiga memakai 3 lidi dan setiap segi empat memakai 4 lidi\. Pernyataan yang tepat adalah\.\.\.$/))) {
    const need = hitungSisi(m[2]);
    hasil = +m[1] >= need ? `Cukup, sisa ${+m[1] - need} lidi` : `Tidak cukup, kurang ${need - +m[1]} lidi`;
  } else if ((m = p.match(/^\w+ memilah benda: (.+)\. Banyak benda yang (.+) ada\.\.\.$/))) {
    const arr = parseDaftarPW(m[1]);
    let q;
    if ((q = m[2].match(new RegExp(`^berwarna (\\w+) tetapi bukan ${B3}$`)))) hasil = String(arr.filter((i) => i.warna === q[1] && i.bentuk !== q[2]).length);
    else if ((q = m[2].match(new RegExp(`^bukan berwarna (\\w+) dan bukan berbentuk ${B3}$`)))) hasil = String(arr.filter((i) => i.warna !== q[1] && i.bentuk !== q[2]).length);
    else if ((q = m[2].match(new RegExp(`^berwarna (\\w+) atau berbentuk ${B3}$`)))) hasil = String(arr.filter((i) => i.warna === q[1] || i.bentuk === q[2]).length);
  } else if ((m = p.match(/^Antara (.+) dan (.+), benda yang punya sudut lebih banyak adalah\.\.\.$/))) {
    const a = FAKTA[sh(m[1])];
    const b = FAKTA[sh(m[2])];
    hasil = a === b ? "Sama banyak" : a > b ? m[1] : m[2];
  } else if ((m = p.match(/^\w+ menghitung bentuk: (.+)\. Bentuk yang paling banyak adalah\.\.\.$/))) {
    const arr = m[1].split(", ");
    const c = BENT.map((x) => arr.filter((o) => o === x).length);
    const mx = Math.max(...c);
    hasil = c.filter((x) => x === mx).length === 1 ? BENT[c.indexOf(mx)] : "?";
  } else if ((m = p.match(/^\w+ punya benda: (.+)\. Benda itu dikelompokkan menurut (bentuk|warna|ukuran)\. Banyak kelompok yang terbentuk ada\.\.\.$/))) hasil = String(new Set(parseDaftar(m[1]).map((i) => i[m[2]])).size);
  else if ((m = p.match(new RegExp(`^\\w+ mendeskripsikan (.+): "Bentuknya ${B3} dan punya (\\d+) sudut\\." Pernyataan yang tepat adalah\\.\\.\\.$`)))) {
    const bs = SHAPE_OF[m[1]];
    const tr = FAKTA[bs];
    const bo = m[2] === bs;
    const so = +m[3] === tr;
    hasil = bo && so ? "Sudah tepat" : !bo && so ? `Bentuknya salah, seharusnya ${bs}` : bo && !so ? `Banyak sudutnya salah, seharusnya ${tr}` : "Bentuk dan banyak sudutnya sama-sama salah";
  } else if ((m = p.match(/^\w+ mengelompokkan .+ menurut \w+\. \w+ sudah (.+)\. Langkah berikutnya adalah\.\.\.$/))) {
    const i = LANGKAH.indexOf(m[1]);
    hasil = i >= 0 && i < 5 ? LANGKAH[i + 1] : "?";
  } else if ((m = p.match(/^(.+) tersusun dari (\d+) lengkung, (\d+) segitiga, dan (\d+) segi empat\. Banyak bagian yang (punya sudut|tidak punya sudut|bukan segitiga) ada\.\.\.$/))) {
    const [a, b, c] = [+m[2], +m[3], +m[4]];
    hasil = String(m[5] === "punya sudut" ? b + c : m[5] === "tidak punya sudut" ? a : a + c);
  } else if ((m = p.match(/^\w+ punya dua (bentuk lengkung|segitiga|segi empat), .+\. \w+ ingin membandingkan banyak (sisi lurus|sudut) kedua bentuk itu\. Pernyataan yang tepat adalah\.\.\.$/))) hasil = `Keduanya sama banyak, yaitu ${FAKTA[m[1].replace("bentuk ", "")]}`;

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
for (const [j, c] of sisa) console.log(`  tanpa penghitung ${c}x ${j}`);
cek(sisa.length === 0, "ada soal tanpa penghitung");
console.log(`lulus ${lulus}, gagal ${gagal}`);
process.exit(gagal === 0 ? 0 : 1);
