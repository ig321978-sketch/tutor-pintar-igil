// Pemindai TINGKAT KERANGKA: mendeteksi kalimat IGIL yang memakai kerangka (templat) yang sama dengan buku walau nama, benda, dan angka diganti.
// Cara: teks diubah menjadi templat: angka dan kata bilangan -> N; nama diri (huruf kapital di tengah kalimat) -> NAMA; kata isi yang bukan kata fungsi -> x
// (deretan x dilebur menjadi satu). Lalu runtun-k templat dibandingkan dengan teks buku (sumber/ekstrak-raw, urutan baca baik).
// Pakai: node scripts/uji-kerangka.mjs --awalan k1b [--dir src/components/modul/story] [--k 6] [--min 4] [--top 12] [--buku I,II,III]
// Kalibrasi: jalankan juga pada konten orisinal (mis. --awalan o2k1a) sebagai pembanding "tingkat kemiripan dasar" bahasa Indonesia.
import fs from "node:fs";
import path from "node:path";

const arg = (k, d) => { const i = process.argv.indexOf(`--${k}`); return i >= 0 ? process.argv[i + 1] : d; };
const DIR = arg("dir", "src/components/modul/story");
const AWALAN = arg("awalan", "k1b");
const K = Number(arg("k", 6));
const MIN = Number(arg("min", 4));
const TOP = Number(arg("top", 12));
const BUKU = arg("buku", "I,II,III").split(",");
const EKSTRAK = "sumber/ekstrak-raw";
if (!fs.existsSync(EKSTRAK)) { console.error("sumber/ekstrak-raw belum ada (pdftotext -raw)."); process.exit(2); }

// Kata fungsi dan kata kerangka instruksi buku (dipertahankan apa adanya; selebihnya dimasker).
const FUNG = new Set(`a ada adalah agar akan aku anak anda antara apa apakah atau atas bagaimana bagian bahwa banyak banyaknya bantu barang bawah beberapa belum benar berapa berikut
berikutnya bersama biasanya bisa boleh bukan dalam dan dapat dari dengan di dia dilakukan dimana dulu dua hanya harus hasil hitunglah ia ini itu jadi jawab jika jumlah juga kalau kamu karena ke kita
kalian kemudian kembali kepada ketika kurang lagi lain lalu lebih lingkari lah maka mana masih mau mari melakukan memiliki mereka milik misalnya mulai nama namun oleh pada paling pasangkan pernah pilih
pun saat saja sama sampai sangat sebagai sebanyak sebelum sebuah sedang sedikit sekarang sekitar selalu semua sendiri seperti sering serta setelah setiap suatu sudah supaya tadi tanpa tentang tentukan terdapat
tersebut tetapi tiap tidak tuliskan ucapkan untuk ayo apakah bandingkan bacalah banyaknya bermain berlatih cobalah coba ceritakan gambarlah hitung kerjakan lengkapi tulis tuliskan temukan tunjukkan
sebutkan jelaskan beri berikan buatlah carilah ambil letakkan sisa jika maka yang yaitu yakni`.split(/\s+/).filter(Boolean));
const KATA_BILANGAN = new Set("nol satu dua tiga empat lima enam tujuh delapan sembilan sepuluh sebelas belas puluh ratus ribu seratus seribu seperempat setengah".split(" "));
const norm = (s) => s.toLowerCase();

function templat(teks) {
  const hasil = [];
  const re = /[A-Za-zÀ-ɏ0-9]+/g;
  let m;
  let awalKalimat = true;
  let prevIdx = 0;
  while ((m = re.exec(teks))) {
    const t = m[0];
    const antara = teks.slice(prevIdx, m.index);
    if (/[.!?\n]/.test(antara) || hasil.length === 0) awalKalimat = true;
    let tok;
    if (/^\d+$/.test(t)) tok = "N";
    else if (KATA_BILANGAN.has(norm(t))) tok = "N";
    else if (/^[A-ZÀ-Þ]/.test(t) && !awalKalimat) tok = "NAMA";
    else if (FUNG.has(norm(t))) tok = norm(t);
    else tok = "x";
    // lebur deretan x
    if (!(tok === "x" && hasil.length && hasil[hasil.length - 1].tok === "x")) hasil.push({ tok, mulai: m.index, akhir: m.index + t.length });
    awalKalimat = false;
    prevIdx = m.index + t.length;
  }
  return hasil;
}

const informatif = (tokens) => tokens.filter((t) => t !== "x" && t !== "N" && t !== "NAMA").length >= MIN;

// 1) Indeks runtun-k templat buku.
const indeks = new Map();
let jumlahGram = 0;
for (const rom of BUKU) {
  for (const jenis of ["BS", "BG"]) {
    const f = `${EKSTRAK}/Matematika-${jenis}-KLS-${rom}.txt`;
    if (!fs.existsSync(f)) continue;
    const halaman = fs.readFileSync(f, "utf8").split("\f");
    halaman.forEach((h, hi) => {
      const tk = templat(h);
      for (let i = 0; i + K <= tk.length; i += 1) {
        const jendela = tk.slice(i, i + K).map((x) => x.tok);
        if (!informatif(jendela)) continue;
        const kunci = jendela.join(" ");
        jumlahGram += 1;
        if (!indeks.has(kunci)) indeks.set(kunci, { buku: `${jenis}-${rom}`, hal: hi + 1, kutip: h.slice(tk[i].mulai, tk[i + K - 1].akhir).replace(/\s+/g, " ").slice(0, 110) });
      }
    });
  }
}

// 2) Pindai berkas konten IGIL.
const literal = /"((?:[^"\\\n]|\\.){25,})"|`((?:[^`\\]|\\.){25,})`/g;
const berkas = fs.readdirSync(DIR).filter((f) => /\.(ts|tsx|json)$/.test(f) && f.startsWith(AWALAN));
const ringkas = {};
const semua = [];
// Semua string literal dari berkas (JSON: seluruh nilai string; kode: literal berkutip atau backtick).
function stringDari(f, src) {
  if (f.endsWith(".json")) {
    const hasil = [];
    const jalan = (o, j) => { if (typeof o === "string") hasil.push({ s: o, jalur: j }); else if (Array.isArray(o)) o.forEach((x, i) => jalan(x, `${j}[${i}]`)); else if (o && typeof o === "object") Object.entries(o).forEach(([k, v]) => jalan(v, j ? `${j}.${k}` : k)); };
    try { jalan(JSON.parse(src), ""); } catch { /* abaikan */ }
    return hasil;
  }
  return [...src.replace(/kutipan:\s*\[[\s\S]*?\]/g, "").matchAll(literal)].map((m) => ({ s: (m[1] ?? m[2] ?? "").replace(/\\n/g, " "), jalur: "" }));
}
for (const f of berkas) {
  const src = fs.readFileSync(path.join(DIR, f), "utf8");
  const awal = (f.match(/^(k\d+b\d+[a-z]?)/i) ?? [, f])[1];
  const r = (ringkas[awal] ||= { kalimat: 0, cocok: 0 });
  for (const { s, jalur } of stringDari(f, src)) {
    if (!/\s/.test(s) || /^[#./@\w-]+$/.test(s)) continue;
    const tk = templat(s);
    if (tk.length < K) continue;
    r.kalimat += 1;
    const cocok = [];
    for (let i = 0; i + K <= tk.length; i += 1) {
      const jendela = tk.slice(i, i + K).map((x) => x.tok);
      if (!informatif(jendela)) continue;
      const h = indeks.get(jendela.join(" "));
      if (h) cocok.push({ templat: jendela.join(" "), potongan: s.slice(tk[i].mulai, tk[i + K - 1].akhir), ...h });
    }
    if (cocok.length) {
      r.cocok += 1;
      const kuat = cocok.reduce((a, c) => (c.templat.split(" ").filter((x) => x !== "x" && x !== "N" && x !== "NAMA").length > a.templat.split(" ").filter((x) => x !== "x" && x !== "N" && x !== "NAMA").length ? c : a), cocok[0]);
      semua.push({ berkas: f, jalur, kalimat: s.slice(0, 400), jumlah: cocok.length, contoh: kuat, potongan: [...new Set(cocok.map((c) => c.potongan))].slice(0, 4) });
    }
  }
}

const SIMPAN = arg("simpan", "");
fs.writeFileSync(SIMPAN ? `sumber/laporan-kerangka-${SIMPAN}.json` : "sumber/laporan-kerangka.json", JSON.stringify({ awalan: AWALAN, dir: DIR, k: K, min: MIN, ringkas, hasil: semua }, null, 1));
const total = Object.values(ringkas).reduce((a, r) => ({ kalimat: a.kalimat + r.kalimat, cocok: a.cocok + r.cocok }), { kalimat: 0, cocok: 0 });
console.log(`Indeks buku: ${indeks.size} templat-${K} unik (${jumlahGram} runtun). Dipindai ${berkas.length} berkas, ${total.kalimat} kalimat; kerangka sama dengan buku: ${total.cocok} (${total.kalimat ? ((100 * total.cocok) / total.kalimat).toFixed(1) : 0}%).`);
console.log("Per awalan (cocok/kalimat):");
for (const [a, r] of Object.entries(ringkas).sort()) console.log(`  ${a}: ${r.cocok}/${r.kalimat} (${r.kalimat ? ((100 * r.cocok) / r.kalimat).toFixed(1) : 0}%)`);
console.log("Contoh teratas:");
for (const h of semua.sort((a, b) => b.jumlah - a.jumlah).slice(0, TOP)) console.log(`  [${h.jumlah}] ${h.berkas}: "${h.kalimat.slice(0, 90)}"\n      buku ${h.contoh.buku} hlm ${h.contoh.hal}: "${h.contoh.kutip}"\n      templat: ${h.contoh.templat}`);
