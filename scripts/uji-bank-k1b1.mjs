// Uji bank soal Kelas 1 Bab 1 (supabase/seed/02_kelas1_bab1_bank_keys.sql, hasil scripts/buat-bank-k1-bab1.mjs).
// Setiap soal dihitung ulang dari kalimatnya (bukan dari generator) dan dicocokkan dengan kunci.
// Pakai: node scripts/buat-bank-k1-bab1.mjs && node --no-warnings scripts/uji-bank-k1b1.mjs
import fs from "fs";

const BERKAS = "supabase/seed/02_kelas1_bab1_bank_keys.sql";
const NAMA = ["Malosi", "Kira", "Upe", "Wei", "Halim", "Igil"];
const KATA = ["nol", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan", "sepuluh"];
const TERLARANG = /\b(buku|pensil|kertas|kelompok|teman|kawan|menulis|menggambar|bawa|tika|lili|paman|kelas|guru)\b/i;

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
const bagianLatihan = sql.slice(sql.indexOf("insert into private.practice_keys"), sql.indexOf("insert into private.exam_keys"));
const bagianUjian = sql.slice(sql.indexOf("insert into private.exam_keys"));
const ambil = (s) => s.replace(/''/g, "'");
const rxL = /^\s*\('k1-mat-bab1', '([^']+)', (\d), '((?:[^']|'')*)', '((?:[^']|'')*)', '(\[.*?\])'::jsonb, '(\w+)', '(\[.*?\])'::jsonb, '(\[.*?\])'::jsonb\)/gm;
const rxU = /^\s*\('k1-mat-bab1', 'acak', '([^']+)', '((?:[^']|'')*)', '(\[.*?\])'::jsonb, (\d), '(\w+)'\)/gm;
const L = [...bagianLatihan.matchAll(rxL)].map((m) => ({
  id: m[1], ci: +m[2], exp: ambil(m[3]), prompt: ambil(m[4]), opts: JSON.parse(m[5]), lvl: m[6], v1: JSON.parse(m[7]), v2: JSON.parse(m[8]),
}));
const U = [...bagianUjian.matchAll(rxU)].map((m) => ({
  id: m[1], prompt: ambil(m[2]), opts: JSON.parse(m[3]), ci: +m[4], lvl: m[5], exp: "ada", v1: [], v2: [],
}));

const ang = (s) => s.split(/,\s*/).map(Number);

/** Pengenal soal: [nama, regex, fungsi(match, soal) -> teks jawaban yang diharapkan, jenis cek tambahan]. */
const POLA = [
  ["hitung-gambar", /^(\w+) mengetuk (\S+) satu per satu\. Berapa banyak \2 pada gambar\?$/, (m, s) => String(s.v1.length), (m, s) => s.v1.length >= 1 && new Set(s.v1).size === 1],
  ["kata-ke-angka", /^(\w+) memilih kartu "(\w+)"\. Angka yang sesuai adalah\.\.\.$/, (m) => String(KATA.indexOf(m[2]))],
  ["angka-ke-kata", /^Angka (\d+) dibaca\.\.\.$/, (m) => KATA[+m[1]]],
  ["nol-1", /^Keranjang (\w+) kosong, tidak ada \S+ sama sekali\. Banyak \S+ itu dilambangkan dengan angka\.\.\.$/, () => "0"],
  ["nol-2", /^Piring (\w+) tidak berisi \S+ sama sekali\. Banyak \S+ di piring adalah\.\.\.$/, () => "0"],
  ["nol-3", /^Semua \S+ milik (\w+) sudah diberikan, tidak ada yang tersisa\. Banyak \S+ \1 sekarang adalah\.\.\.$/, () => "0"],
  ["gambar-banyak", /^(\w+) melihat dua gambar (\S+)\. Gambar mana yang lebih banyak\?$/, (m, s) => (s.v1.length > s.v2.length ? "Gambar pertama" : s.v1.length < s.v2.length ? "Gambar kedua" : "Sama banyak")],
  ["tanda-banding", /^(\w+) membandingkan (\d+) dengan (\d+)\. Tanda yang tepat untuk \2 ○ \3 adalah\.\.\.$/, (m) => (+m[2] < +m[3] ? "<" : +m[2] > +m[3] ? ">" : "=")],
  ["sesudah-sebelum", /^(\w+) menyebut bilangan (sesudah|sebelum) (\d+)\. Bilangan itu adalah\.\.\.$/, (m) => String(m[2] === "sesudah" ? +m[3] + 1 : +m[3] - 1)],
  ["deret-hilang", /^(\w+) menghitung (maju|mundur): ([\d, .]+)\. Bilangan yang hilang adalah\.\.\.$/, (m) => {
    const t = m[3].split(/,\s*/);
    const i = t.indexOf("...");
    const prev = +t[i - 1];
    const next = +t[i + 1];
    const langkah = m[2] === "maju" ? 1 : -1;
    return prev + langkah === next - langkah ? String(prev + langkah) : "?";
  }],
  ["pisah-bilangan", /^(\w+) memisahkan bilangan (\d+) menjadi dua bagian\. Satu bagian adalah (\d+)\. Bagian yang lain adalah\.\.\.$/, (m) => String(+m[2] - +m[3])],
  ["dua-langkah", /^(\w+) punya (\d+) (\S+)\. Ia mendapat (\d+), lalu memberikan (\d+) kepada (\w+)\. Sekarang \1 punya \.\.\. \3\.$/, (m) => String(+m[2] + +m[4] - +m[5]), (m) => +m[2] + +m[4] <= 10 && m[1] !== m[6]],
  ["antara-bukan", /^(\w+) memikirkan bilangan yang lebih besar dari (\d+), lebih kecil dari (\d+), tetapi bukan (\d+)\. Bilangan \1 adalah\.\.\.$/, (m) => {
    const sisa = [];
    for (let n = +m[2] + 1; n < +m[3]; n += 1) if (n !== +m[4]) sisa.push(n);
    return sisa.length === 1 ? String(sisa[0]) : "?";
  }],
  ["pasangan-salah", /^(\w+) memasangkan bilangan untuk membuat (\d+)\. Pasangan yang salah adalah\.\.\.$/, (m, s) => {
    const salah = s.opts.filter((o) => { const [x, y] = o.split(" dan ").map(Number); return x + y !== +m[2]; });
    return salah.length === 1 ? salah[0] : "?";
  }],
  ["terlewat-tengah", /^(\w+) menghitung (maju|mundur): ([\d, ]+)\. Satu bilangan terlewat di tengah\. Bilangan itu adalah\.\.\.$/, (m) => {
    const t = ang(m[3]);
    const langkah = m[2] === "maju" ? 1 : -1;
    for (let i = 0; i < t.length - 1; i += 1) if (t[i + 1] - t[i] === 2 * langkah) return String(t[i] + langkah);
    return "?";
  }],
  ["siapa-lebih-banyak", /^(\w+) punya (\d+) (\S+) dan (\w+) punya (\d+)\. \1 memberikan (\d+) \3 kepada \4\. Siapa yang sekarang punya lebih banyak\?$/, (m) => {
    const a = +m[2] - +m[6];
    const b = +m[5] + +m[6];
    return a > b ? m[1] : a < b ? m[4] : "sama banyak";
  }, (m) => +m[6] < +m[2] && m[1] !== m[4]],
  ["selisih-banyak", /^(\w+) punya (\d+) (\S+)\. (\w+) punya (\d+) \3\. Siapa yang punya lebih banyak, dan lebihnya berapa\?$/, (m) => {
    const a = +m[2];
    const b = +m[5];
    return a === b ? "?" : `${a > b ? m[1] : m[4]} lebih banyak ${Math.abs(a - b)}`;
  }, (m) => m[1] !== m[4]],
  ["sampai-sepuluh", /^(\w+) punya (\d+) (\S+) dan ingin punya sepuluh \3\. \1 perlu menambah \.\.\. \3 lagi\.$/, (m) => String(10 - +m[2])],
  ["urutan-tiga", /^(\w+) memilih kartu ([\d, ]+)\. Urutkan kartu dari yang (paling kecil ke paling besar|paling besar ke paling kecil)\. Urutan yang benar adalah\.\.\.$/, (m) => {
    const t = ang(m[2]).sort((x, y) => x - y);
    return (m[3] === "paling kecil ke paling besar" ? t : t.reverse()).join(", ");
  }, (m, s) => new Set(ang(m[2])).size === 3 && new Set(s.opts).size === 4],
  ["paling-tiga", /^(\w+) punya (\d+) (\S+), (\w+) punya (\d+) \3, dan (\w+) punya (\d+) \3\. Siapa yang punya paling (banyak|sedikit)\?$/, (m) => {
    const v = [[m[1], +m[2]], [m[4], +m[5]], [m[6], +m[7]]];
    const nilai = v.map((x) => x[1]);
    if (new Set(nilai).size !== 3) return "?";
    const t = m[8] === "banyak" ? Math.max(...nilai) : Math.min(...nilai);
    return v.find((x) => x[1] === t)[0];
  }, (m) => new Set([m[1], m[4], m[6]]).size === 3],
  ["salah-hitung", /^(\w+) menghitung (\S+), tetapi ia mengetuk satu \2 dua kali\. Bilangan terakhir yang ia sebut adalah "(\w+)"\. Banyak \2 yang sebenarnya adalah\.\.\.$/, (m) => String(KATA.indexOf(m[3]) - 1)],
  ["pernyataan-benar", /^(\w+) memegang kartu ([\d, ]+)\. Pernyataan yang benar adalah\.\.\.$/, (m, s) => {
    const benar = s.opts.filter((o) => { const q = o.match(/^(\d+) lebih besar dari (\d+)$/); return q && +q[1] > +q[2]; });
    return benar.length === 1 ? benar[0] : "?";
  }],
  ["tiga-wadah", /^(\w+) punya (\d+) (\S+) dan menaruhnya di tiga wadah\. Wadah pertama berisi (\d+), wadah kedua berisi (\d+)\. Wadah ketiga berisi \.\.\. \3\.$/, (m) => String(+m[2] - +m[4] - +m[5]), (m) => +m[2] - +m[4] - +m[5] >= 1],
  ["banyak-antara", /^(\w+) menyebut semua bilangan di antara (\d+) dan (\d+)\. Banyak bilangan yang \1 sebut adalah\.\.\.$/, (m) => String(+m[3] - +m[2] - 1), (m) => +m[3] - +m[2] >= 3],
  ["lompat-hitung", /^(\w+) mulai dari bilangan (\d+), lalu menghitung (maju|mundur) satu per satu sebanyak (\d+) kali\. \1 berhenti di bilangan\.\.\.$/, (m) => String(m[3] === "maju" ? +m[2] + +m[4] : +m[2] - +m[4]), (m) => { const a = m[3] === "maju" ? +m[2] + +m[4] : +m[2] - +m[4]; return a >= 0 && a <= 10; }],
  ["kartu-kata", /^(\w+) memilih kartu "(\w+)"\. (\w+) memilih kartu yang (\w+) (lebih besar|lebih kecil)\. Kartu \3 adalah\.\.\.$/, (m) => String(KATA.indexOf(m[2]) + (m[5] === "lebih besar" ? 1 : -1) * KATA.indexOf(m[4])), (m) => m[1] !== m[3]],
];

function periksaSoal(s, jenis) {
  const id = `${jenis} ${s.id}`;
  cek(s.opts.length === 4 && new Set(s.opts).size === 4, `${id}: 4 opsi unik`);
  cek(s.ci >= 0 && s.ci <= 3, `${id}: indeks kunci 0..3`);
  cek(["LOTS", "MOTS", "HOTS"].includes(s.lvl), `${id}: level sah`);
  cek(jenis === "ujian" || s.exp.length > 8, `${id}: pembahasan ada`);
  cek(!TERLARANG.test(`${s.prompt} ${s.opts.join(" ")} ${s.exp}`), `${id}: tanpa kata/nama terlarang`);
  cek(new RegExp(`^(${NAMA.join("|")}|Angka|Keranjang|Piring|Semua)\\b`).test(s.prompt) || s.prompt.startsWith("Angka"), `${id}: dimulai tokoh tetap atau angka`);
  const semuaNama = s.prompt.match(/\b[A-Z][a-z]+\b/g) ?? [];
  const asing = semuaNama.filter((w) => !NAMA.includes(w) && !["Angka", "Keranjang", "Piring", "Semua", "Banyak", "Bilangan", "Siapa", "Gambar", "Satu", "Sekarang", "Wadah", "Urutan", "Urutkan", "Kartu", "Pasangan", "Pernyataan", "Tanda", "Bagian", "Ia", "Berapa"].includes(w));
  cek(asing.length === 0, `${id}: kata berhuruf besar tak dikenal ${asing.join(",")}`);
  const angkaDiSoal = (s.prompt.match(/\d+/g) ?? []).map(Number);
  cek(angkaDiSoal.every((n) => n >= 0 && n <= 10), `${id}: bilangan di soal 0 sampai 10`);
  cek([...s.v1, ...s.v2].every((e) => [...e].every((c) => c.codePointAt(0) <= 0x1fa95)), `${id}: emoji <= U+1FA95`);
  const cocok = POLA.filter(([, rx]) => rx.test(s.prompt));
  cek(cocok.length === 1, `${id}: tepat satu pola dikenali (${cocok.map((c) => c[0]).join(",") || "tidak ada"}): ${s.prompt}`);
  if (cocok.length !== 1) return null;
  const [nama, rx, hitung, ekstra] = cocok[0];
  const m = s.prompt.match(rx);
  const harus = hitung(m, s);
  cek(s.opts[s.ci] === harus, `${id} [${nama}]: kunci "${s.opts[s.ci]}" harusnya "${harus}": ${s.prompt}`);
  if (ekstra) cek(ekstra(m, s), `${id} [${nama}]: syarat tambahan: ${s.prompt}`);
  return nama;
}

const polaLatihan = L.map((s) => periksaSoal(s, "latihan"));
const polaUjian = U.map((s) => periksaSoal(s, "ujian"));

// Jumlah dan komposisi.
cek(L.length === 100, `latihan 100 soal (ada ${L.length})`);
cek(U.length === 100, `ujian 100 soal (ada ${U.length})`);
const lv = (l) => L.filter((s) => s.lvl === l).length;
cek(lv("LOTS") === 30 && lv("MOTS") === 30 && lv("HOTS") === 40, `latihan 30/30/40 (ada ${lv("LOTS")}/${lv("MOTS")}/${lv("HOTS")})`);
cek(U.every((s) => s.lvl === "HOTS"), "ujian seluruhnya HOTS");
cek(new Set(L.map((s) => s.id)).size === 100 && new Set(U.map((s) => s.id)).size === 100, "id unik");
const semuaPrompt = [...L, ...U].map((s) => s.prompt);
cek(new Set(semuaPrompt).size === 200, `kalimat soal unik di seluruh bank (unik ${new Set(semuaPrompt).size})`);

// Keragaman pola.
const hitungPola = (daftar) => daftar.reduce((a, p) => ((a[p] = (a[p] ?? 0) + 1), a), {});
const pu = hitungPola(polaUjian);
const polaHotsLatihan = L.map((s, i) => [s, polaLatihan[i]]).filter(([s]) => s.lvl === "HOTS").map(([, p]) => p);
const ph = hitungPola(polaHotsLatihan);
cek(Object.keys(pu).length >= 15, `ujian memakai >= 15 pola (ada ${Object.keys(pu).length})`);
cek(Object.keys(ph).length >= 15, `HOTS latihan memakai >= 15 pola (ada ${Object.keys(ph).length})`);
cek(Math.max(...Object.values(pu)) <= 8, `tak ada pola ujian > 8 soal (maks ${Math.max(...Object.values(pu))})`);
cek(Math.max(...Object.values(ph)) <= 3, `tak ada pola HOTS latihan > 3 soal (maks ${Math.max(...Object.values(ph))})`);

// Sebaran posisi kunci.
for (const [nama, daftar] of [["latihan", L], ["ujian", U]]) {
  const n = [0, 1, 2, 3].map((i) => daftar.filter((s) => s.ci === i).length);
  cek(Math.min(...n) >= 20 && Math.max(...n) <= 30, `${nama}: posisi kunci merata (${n.join(",")})`);
}

// Sebaran tokoh dan benda.
for (const [nama, daftar] of [["latihan", L], ["ujian", U]]) {
  const hit = NAMA.map((t) => daftar.filter((s) => new RegExp(`\\b${t}\\b`).test(s.prompt)).length);
  cek(hit.every((x) => x >= 5), `${nama}: tiap tokoh tetap muncul >= 5 kali (${hit.join(",")})`);
}

// Simulasi undian seperti RPC: 3 LOTS + 3 MOTS + 4 HOTS; ujian 10 dari 100. Tak ada dua lembar aktif yang sama.
function acak(seedAwal) {
  let s = seedAwal >>> 0;
  return () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    return s / 4294967296;
  };
}
const rnd = acak(2026);
const ambilAcak = (arr, n) => [...arr].sort(() => rnd() - 0.5).slice(0, n);
const lotsL = L.filter((s) => s.lvl === "LOTS");
const motsL = L.filter((s) => s.lvl === "MOTS");
const hotsL = L.filter((s) => s.lvl === "HOTS");
const tandaL = new Set();
const tandaU = new Set();
let bentrokL = 0;
let bentrokU = 0;
let samaPersis = 0;
let lembarSebelum = null;
for (let i = 0; i < 3000; i += 1) {
  const idsL = [...ambilAcak(lotsL, 3), ...ambilAcak(motsL, 3), ...ambilAcak(hotsL, 4)].map((s) => s.id).sort().join(",");
  if (tandaL.has(idsL)) bentrokL += 1;
  tandaL.add(idsL);
  const idsU = ambilAcak(U, 10).map((s) => s.id).sort().join(",");
  if (tandaU.has(idsU)) bentrokU += 1;
  tandaU.add(idsU);
  if (lembarSebelum && lembarSebelum === idsU) samaPersis += 1;
  lembarSebelum = idsU;
}
cek(bentrokL === 0, `simulasi 3000 undian Latihan: set kembar ${bentrokL}`);
cek(bentrokU === 0, `simulasi 3000 undian Ujian: set kembar ${bentrokU}`);
cek(samaPersis === 0, "buka ulang tidak menghasilkan lembar yang sama persis");

console.log(`Pola ujian: ${JSON.stringify(pu)}`);
console.log(`uji-bank-k1b1: ${lulus} lulus, ${gagal} gagal`);
process.exit(gagal ? 1 : 0);
