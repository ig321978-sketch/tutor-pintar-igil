// Uji bank soal Kelas 2 Bab 1 (supabase/seed/02_kelas2_bab1_bank_keys.sql, berkas lokal berisi kunci).
// Skrip ini tidak memuat soal. Tiap soal dibaca dari SQL, data dalam kalimatnya diurai, lalu jawabannya
// dihitung ulang tanpa memakai pembuat soal dan dicocokkan dengan kunci.
// Pakai: node --no-warnings scripts/uji-bank-k2b1.mjs
import fs from "node:fs";

const BAB = "k2-mat-bab1";
const BERKAS = "supabase/seed/02_kelas2_bab1_bank_keys.sql";
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
const rxL = new RegExp(`^\\s*\\('${BAB}', '([^']+)', (\\d), '((?:[^']|'')*)', '((?:[^']|'')*)', '(\\[.*?\\])'::jsonb, '(\\w+)', '(\\[.*?\\])'::jsonb, '(\\[.*?\\])'::jsonb\\)`, "gm");
const rxU = new RegExp(`^\\s*\\('${BAB}', 'acak', '([^']+)', '((?:[^']|'')*)', '(\\[.*?\\])'::jsonb, (\\d), '(\\w+)'\\)`, "gm");
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
    cek(s.opts.every((o) => +o <= 99), `${lab} angka lebih dari 99`);
  }
  if (s.set === "L") cek(s.exp.length > 10, `${lab} pembahasan terlalu pendek`);
  if (s.set === "U") cek(s.v1.length === 0, `${lab} ujian tidak boleh memakai visual`);
}
for (const [nm, arr] of [["latihan", L], ["ujian", U]]) {
  const c = [0, 1, 2, 3].map((t) => arr.filter((s) => s.ci === t).length);
  cek(Math.max(...c) - Math.min(...c) <= 6, `sebaran kunci ${nm} ${c.join("/")}`);
  console.log(`sebaran kunci ${nm}: ${c.join("/")}`);
}
for (const lv of ["LOTS", "MOTS", "HOTS"]) {
  const c = [0, 1, 2, 3].map((t) => L.filter((s) => s.lvl === lv && s.ci === t).length);
  cek(Math.max(...c) - Math.min(...c) <= 4, `sebaran ${lv} ${c.join("/")}`);
}
const kunci = (s) => s.opts[s.ci];

// ---------- bahasa bilangan (ditulis ulang, bebas dari pembuat soal) ----------
const SA = ["nol", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan"];
const nm = (n) => {
  if (n < 10) return SA[n];
  if (n === 10) return "sepuluh";
  if (n === 11) return "sebelas";
  if (n < 20) return `${SA[n - 10]} belas`;
  return `${SA[Math.floor(n / 10)]} puluh${n % 10 ? ` ${SA[n % 10]}` : ""}`;
};
const dariNama = (t) => {
  for (let n = 0; n <= 99; n += 1) if (nm(n) === t) return n;
  return NaN;
};
const nilaiPP = (t) => {
  const m = t.match(/^(\d+) puluhan (\d+) satuan$/);
  return m ? 10 * +m[1] + +m[2] : NaN;
};
const rev = (n) => (n % 10) * 10 + Math.floor(n / 10);
const sym = (x, y) => (x < y ? "<" : x > y ? ">" : "=");

// ---------- hitung ulang ----------
let terverifikasi = 0;
const tak = [];
function periksa(s) {
  const p = s.prompt;
  const k = kunci(s);
  let m;
  const ok = (cond, ket) => {
    terverifikasi += 1;
    cek(cond, `${s.set}${s.id} ${ket}: "${p.slice(0, 90)}" kunci "${k}"`);
  };
  // LOTS
  if ((m = p.match(/^Lambang bilangan (\d+) dibaca\.\.\.$/))) return ok(k === nm(+m[1]), "baca-nama");
  if ((m = p.match(/^Bilangan "(.+)" ditulis dengan lambang\.\.\.$/))) return ok(+k === dariNama(m[1]), "tulis-lambang");
  if (/pada gambar satu per satu, tiap .* hanya sekali/.test(p)) return ok(+k === s.v1.length, "hitung-gambar");
  if ((m = p.match(/^Bilangan sesudah (\d+) adalah/))) return ok(+k === +m[1] + 1, "sesudah");
  if ((m = p.match(/^Bilangan sebelum (\d+) adalah/))) return ok(+k === +m[1] - 1, "sebelum");
  if ((m = p.match(/^Bilangan yang ada di antara (\d+) dan (\d+) adalah/))) return ok(+k === (+m[1] + +m[2]) / 2, "di-antara");
  if ((m = p.match(/^Bilangan (\d+) terdiri dari \.\.\. puluhan\./))) return ok(+k === Math.floor(+m[1] / 10), "puluhan-dari");
  if ((m = p.match(/^Bilangan (\d+) terdiri dari \.\.\. satuan/))) return ok(+k === +m[1] % 10, "satuan-dari");
  if ((m = p.match(/^(\d+) puluhan (\d+) satuan ditulis dengan lambang/))) return ok(+k === 10 * +m[1] + +m[2], "tulis-dari-ps");
  if ((m = p.match(/^Pada bilangan (\d+), angka (\d) bernilai\.\.\.$/))) {
    const n = +m[1];
    const d = +m[2];
    return ok(+k === (Math.floor(n / 10) === d ? 10 * d : d), "nilai-angka-sederhana");
  }
  if (p === "Pada tabel nilai tempat, kolom paling kiri dipakai untuk...") return ok(k === "puluhan", "arti-kolom");
  if (p === "Pada tabel nilai tempat, kolom paling kanan dipakai untuk...") return ok(k === "satuan", "arti-kolom");
  if ((m = p.match(/^Bilangan yang lebih besar di antara (\d+) dan (\d+) adalah/))) return ok(+k === Math.max(+m[1], +m[2]), "lebih-besar");
  if ((m = p.match(/^Bilangan yang lebih kecil di antara (\d+) dan (\d+) adalah/))) return ok(+k === Math.min(+m[1], +m[2]), "lebih-kecil");
  if ((m = p.match(/^Tanda yang tepat untuk (\d+) \.\.\. (\d+) adalah/))) return ok(k === sym(+m[1], +m[2]), "tanda");
  if (p === "Jika dua kelompok dibandingkan, kelompok yang lebih banyak dinyatakan dengan bilangan yang...") return ok(k === "lebih besar", "arti-kata");
  if (p === "Jika puluhan dua bilangan sama, kita membandingkan bagian...") return ok(k === "satuan", "arti-kata");
  // MOTS
  if ((m = p.match(/punya (\d+) (\w+) (\w+), tiap \2 berisi 10 \3, dan (\d+) \3 lepas\. (?:Banyak|.* ingin punya 50)/))) {
    const n = 10 * +m[1] + +m[4];
    if (/ingin punya 50/.test(p)) return ok(+k === 50 - n, "kurang-hingga-50");
    return ok(+k === n, "ikat-lepas");
  }
  if ((m = p.match(/^Ada (\d+) (\w+)\. Tiap (\w+) diisi 10 \2\. Berapa (\w+) yang penuh\?$/))) return ok(+k === Math.floor(+m[1] / 10), "ikat-penuh");
  if ((m = p.match(/^Ada (\d+) \w+\. Tiap \w+ diisi 10 \w+\. Berapa \w+ yang tersisa/))) return ok(+k === +m[1] % 10, "sisa");
  if ((m = p.match(/^Ada (\d+) \w+\. Berapa \w+ yang perlu ditambah supaya/))) return ok(+k === 10 - (+m[1] % 10), "lengkapi-ikat");
  if ((m = p.match(/berdiri di bilangan (\d+) pada jalur bilangan, lalu menghitung (maju|mundur) (\d+) langkah/))) return ok(+k === (m[2] === "maju" ? +m[1] + +m[3] : +m[1] - +m[3]), "maju-mundur");
  if ((m = p.match(/^Bilangan (\d+) ditulis pada tabel nilai tempat/))) return ok(k === `puluhan ${Math.floor(+m[1] / 10)}, satuan ${+m[1] % 10}`, "isi-tabel");
  if ((m = p.match(/^Pada bilangan (\d+) dan (\d+), nilai angka (\d) lebih besar pada bilangan/))) {
    const d = +m[3];
    const di = [+m[1], +m[2]].filter((x) => Math.floor(x / 10) === d);
    return ok(di.length === 1 && +k === di[0], "nilai-angka-banding");
  }
  if ((m = p.match(/^Pada bilangan (\d+), nilai angka puluhan lebih besar berapa daripada nilai angka satuan/))) return ok(+k === 10 * Math.floor(+m[1] / 10) - (+m[1] % 10), "selisih-nilai");
  if ((m = p.match(/punya (\d+) kelereng, lalu mendapat 10 kelereng lagi/))) return ok(+k === +m[1] + 10, "tambah-10");
  if ((m = p.match(/^(\d+) puluhan (\d+) satuan sama dengan bilangan/))) return ok(+k === 10 * +m[1] + +m[2], "tukar-satuan");
  if ((m = p.match(/^Pernyataan yang benar tentang bilangan (\d+) dan (\d+) adalah/))) {
    const [a, b] = [+m[1], +m[2]];
    const [x, o, y] = k.split(" ");
    return ok(o === sym(+x, +y) && ((+x === a && +y === b) || (+x === b && +y === a)), "bandingkan-benar");
  }
  if ((m = p.match(/empat kartu bilangan: ([\d, ]+)\. Bilangan yang (.+) adalah/))) {
    const xs = m[1].split(", ").map(Number).sort((a, b) => a - b);
    const idx = { "paling kecil": 0, "paling kecil kedua (urutan kedua dari yang paling kecil)": 1, "paling besar kedua (urutan kedua dari yang paling besar)": 2, "paling besar": 3 }[m[2]];
    return ok(idx !== undefined && +k === xs[idx], "kartu-posisi");
  }
  if ((m = p.match(/^Urutan 3 bilangan ([\d, ]+) dari yang paling (kecil|besar) adalah/))) {
    const xs = m[1].split(", ").map(Number).sort((a, b) => a - b);
    return ok(k === (m[2] === "kecil" ? xs : [...xs].reverse()).join(", "), "urutkan-tiga");
  }
  if ((m = p.match(/^(\w+) menebak ada (\d+) permen di stoples, (\w+) menebak ada (\d+) permen\. Setelah dihitung, ada (\d+) permen/))) {
    const [d1, d2] = [Math.abs(+m[2] - +m[5]), Math.abs(+m[4] - +m[5])];
    return ok(d1 !== d2 && k === (d1 < d2 ? m[1] : m[3]), "tebakan-terdekat");
  }
  // HOTS
  if ((m = p.match(/menghitung (\d+) \+ (\d+) = \d+\. Pernyataan yang benar tentang hitungan/))) {
    const hasil = +k.match(/hasilnya (\d+)$/)[1];
    const tot = +p.match(/punya (\d+) \w+ \w+, tiap/)[1] * 10 + +m[2];
    return ok(k.startsWith("Salah, tiap") && hasil === tot, "cari-salah-ikat");
  }
  if ((m = p.match(/^(\w+) menebak .* ada (\d+), (\w+) menebak ada (\d+), dan (\w+) menebak ada (\d+)\. Setelah dihitung, .* ada (\d+)\. Tebakan yang paling dekat/))) {
    const nms = [m[1], m[3], m[5]];
    const ds = [+m[2], +m[4], +m[6]].map((g) => Math.abs(g - +m[7]));
    const mn = Math.min(...ds);
    return ok(ds.filter((d) => d === mn).length === 1 && k === nms[ds.indexOf(mn)], "tebak-tiga");
  }
  if ((m = p.match(/^Lengkapi hitung (maju|mundur) berikut: (.+)\. Jumlah dua bilangan yang hilang/))) {
    const t = m[2].split(", ");
    const turun = m[1] === "mundur";
    const idx = t.map((x, i) => (x === "__" ? i : -1)).filter((i) => i >= 0);
    const tahu = t.findIndex((x) => x !== "__");
    const nilaiTahu = +t[tahu];
    const at = (i) => (turun ? nilaiTahu - (i - tahu) : nilaiTahu + (i - tahu));
    const konsisten = t.every((x, i) => x === "__" || +x === at(i));
    return ok(konsisten && idx.length === 2 && +k === idx.reduce((a, i) => a + at(i), 0), "jumlah-hilang");
  }
  if ((m = p.match(/^Aku bilangan misterius: (.+)\. Aku adalah\.\.\.$/))) {
    const klu = m[1].split("; ");
    const f = (x) =>
      klu.every((c) => {
        let q;
        if ((q = c.match(/^puluhanku (\d+)$/))) return Math.floor(x / 10) === +q[1];
        if ((q = c.match(/^satuanku (\d+)$/))) return x % 10 === +q[1];
        if ((q = c.match(/^aku lebih besar dari (\d+)$/))) return x > +q[1];
        if ((q = c.match(/^aku lebih kecil dari (\d+)$/))) return x < +q[1];
        if ((q = c.match(/^jumlah angka-angkaku (\d+)$/))) return Math.floor(x / 10) + (x % 10) === +q[1];
        return false;
      });
    const kand = [];
    for (let x = 10; x <= 50; x += 1) if (f(x)) kand.push(x);
    return ok(kand.length === 1 && kand[0] === +k, "misterius");
  }
  if ((m = p.match(/^Mulai dari (\d+), \w+ menghitung (maju|mundur) (\d+) langkah, lalu menghitung (maju|mundur) (\d+) langkah/))) {
    const a = +m[1];
    const r = a + (m[2] === "maju" ? +m[3] : -m[3]) + (m[4] === "maju" ? +m[5] : -m[5]);
    return ok(m[2] !== m[4] && +k === r, "langkah-dua");
  }
  if ((m = p.match(/^Hitung loncat sepuluh mulai dari (\d+): .* Bilangan ke-(\d+) dalam/))) return ok(+k === +m[1] + 10 * (+m[2] - 1), "loncat");
  if ((m = p.match(/^Pada bilangan (\d+), kedua angkanya sama\. Nilai angka di tempat puluhan/))) {
    const d = +m[1] % 10;
    return ok(Math.floor(+m[1] / 10) === d && +k === 9 * d, "kembar");
  }
  if ((m = p.match(/^Bilangan (\d+) dan (\d+) memakai angka yang sama\. Selisih/))) return ok(rev(+m[1]) === +m[2] && +k === Math.abs(+m[1] - +m[2]), "selisih-balik");
  if ((m = p.match(/^Bilangan (\d+) dapat ditulis dengan beberapa cara\. Cara yang TIDAK sama/))) {
    const n = +m[1];
    const nil = s.opts.map(nilaiPP);
    const beda = nil.map((x, i) => (x !== n ? i : -1)).filter((i) => i >= 0);
    return ok(beda.length === 1 && beda[0] === s.ci, "tiga-cara");
  }
  if ((m = p.match(/punya (\d+) puluhan (\d+) satuan\. Setelah semua sepuluh satuan ditukar/))) {
    const [a, b] = [+m[1], +m[2]];
    const mm = k.match(/^(\d+) puluhan (\d+) satuan$/);
    return ok(!!mm && +mm[1] === a + 1 && +mm[2] === b - 10 && nilaiPP(k) === 10 * a + b, "tukar-ringkas");
  }
  if ((m = p.match(/dua kartu angka: (\d) dan (\d)\. Dua kartu itu disusun menjadi bilangan dua angka\. (.+)\.\.\.$/))) {
    const [a, b] = [+m[1], +m[2]];
    const bes = 10 * Math.max(a, b) + Math.min(a, b);
    const kec = 10 * Math.min(a, b) + Math.max(a, b);
    if (/Bilangan terbesar/.test(m[3])) return ok(+k === bes, "kartu-terbesar");
    if (/Bilangan terkecil/.test(m[3])) return ok(+k === kec, "kartu-terkecil");
    return ok(+k === bes - kec, "kartu-selisih");
  }
  if ((m = p.match(/^\w+ menulis (?:(\d+) puluhan (\d+) satuan|"(.+)") sebagai (\d+)\. Pernyataan yang benar adalah/))) {
    const n = m[3] ? dariNama(m[3]) : 10 * +m[1] + +m[2];
    return ok(k === `Salah, seharusnya ${n}` && +m[4] !== n, "salah-tulis");
  }
  if ((m = p.match(/membuka satu puluhan dari (\d+) puluhan (\d+) satuan menjadi sepuluh satuan/))) {
    const mm = k.match(/^(\d+) puluhan (\d+) satuan$/);
    return ok(!!mm && +mm[1] === +m[1] - 1 && +mm[2] === +m[2] + 10, "buka-puluhan");
  }
  if ((m = p.match(/^Perhatikan bilangan (\d+) dan (\d+)\. Pernyataan yang benar tentang nilai angkanya/))) {
    const benarkah = (t) => {
      const q = t.match(/^Angka (\d) pada (\d+) bernilai (\d+)$/);
      if (!q) return null;
      const [d, x, v] = [+q[1], +q[2], +q[3]];
      return Math.floor(x / 10) === d ? v === 10 * d : x % 10 === d ? v === d : false;
    };
    const hasil = s.opts.map(benarkah);
    return ok(hasil.filter(Boolean).length === 1 && hasil[s.ci] === true, "nilai-angka-pernyataan");
  }
  if ((m = p.match(/^Wadah A berisi (\d+) puluhan (\d+) satuan \w+\. Wadah B berisi (\d+) \w+\. Pernyataan yang benar/))) {
    const a = 10 * +m[1] + +m[2];
    const b = +m[3];
    return ok(k === (a > b ? "Wadah A lebih banyak" : a < b ? "Wadah B lebih banyak" : "Sama banyak"), "bandingkan-tukar");
  }
  if ((m = p.match(/^Lima kartu bilangan: ([\d, ]+)\. Jika diurutkan dari yang paling (besar|kecil), bilangan pada urutan ke-(\d)/))) {
    const xs = m[1].split(", ").map(Number).sort((a, b) => (m[2] === "kecil" ? a - b : b - a));
    return ok(+k === xs[+m[3] - 1], "urutan-ke-k");
  }
  if ((m = p.match(/membandingkan (\d+) dan (\d+)\. Katanya, "(\d+) lebih besar karena satuannya/))) {
    const [x, y] = [+m[1], +m[2]];
    const salahnya = +m[3];
    const lain = x === salahnya ? y : x;
    const benarBesar = Math.max(x, y);
    return ok(benarBesar === lain && k === `${lain} lebih besar karena puluhannya lebih banyak`, "satuan-dulu");
  }
  if ((m = p.match(/membandingkan empat pasang bilangan: (.+)\. Pernyataan yang benar/))) {
    const benarkah = (t) => {
      const q = t.match(/^(\d+) ([<>=]) (\d+)$/);
      return q ? sym(+q[1], +q[3]) === q[2] : null;
    };
    const hasil = s.opts.map(benarkah);
    return ok(hasil.filter(Boolean).length === 1 && hasil[s.ci] === true, "pernyataan-banding");
  }
  if ((m = p.match(/^(\w+) punya (\d+) puluhan (\d+) satuan permen\. (\w+) punya (\d+) permen\. (\w+) punya "(.+)" permen\. Yang punya permen paling (banyak|sedikit)/))) {
    const xs = [10 * +m[2] + +m[3], +m[5], dariNama(m[7])];
    const nms = [m[1], m[4], m[6]];
    const tgt = m[8] === "banyak" ? Math.max(...xs) : Math.min(...xs);
    return ok(xs.filter((x) => x === tgt).length === 1 && k === nms[xs.indexOf(tgt)], "paling-campuran");
  }
  if ((m = p.match(/^(\w+) menebak ada (\d+) manik-manik .* ada (\d+) manik-manik\. Pernyataan yang benar/))) {
    const [g, n] = [+m[2], +m[3]];
    return ok(k === `Tebakan ${m[1]} lebih ${g > n ? "besar" : "kecil"} ${Math.abs(g - n)} daripada banyak manik-manik sebenarnya`, "tebakan-hitungan");
  }
  tak.push(`${s.set}${s.id}: ${p.slice(0, 100)}`);
}
for (const s of semua) periksa(s);
console.log(`dihitung ulang: ${terverifikasi} dari ${semua.length} soal`);
if (tak.length) console.log("tidak terverifikasi:\n" + tak.join("\n"));
cek(tak.length === 0, `${tak.length} soal tidak punya penghitung ulang`);
console.log(`lulus ${lulus}, gagal ${gagal}`);
process.exit(gagal === 0 ? 0 : 1);
