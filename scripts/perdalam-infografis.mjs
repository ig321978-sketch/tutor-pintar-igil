/**
 * Perdalam panel Infografis naskah K3B4 … K6B4.
 * - suara: fakta panel + contoh/cara (ringkas, target 150–240 huruf)
 * - teksVisual: caption singkat di bawah gambar
 *
 * Jalankan: node scripts/perdalam-infografis.mjs
 */
import fs from "node:fs";
import path from "node:path";

const DIR = path.join("src", "components", "modul");
const MIN = 150;
const MAKS = 240;
const MAKS_VIS = 58;

const FILE = fs
  .readdirSync(DIR)
  .filter((f) => /^naskah-k([3-6])b\d+\.ts$/.test(f))
  .filter((f) => {
    const m = /^naskah-k(\d+)b(\d+)\.ts$/.exec(f);
    if (!m) return false;
    const k = Number(m[1]);
    const b = Number(m[2]);
    if (k === 3 && b >= 4) return true;
    if (k >= 4 && k <= 5) return true;
    if (k === 6 && b <= 4) return true;
    return false;
  })
  .sort();

function bersih(t) {
  return String(t || "")
    .replace(/\s+/g, " ")
    .trim();
}

function potong(t, maks) {
  const s = bersih(t);
  if (s.length <= maks) return s;
  return `${s.slice(0, maks - 1).replace(/\s+\S*$/, "")}…`;
}

function normal(t) {
  return String(t || "")
    .toLowerCase()
    .replace(/^\d+\.\s*/, "")
    .replace(/[^a-z0-9\u00c0-\u024f\s]/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function topikDari(obj) {
  const penuh = obj.fullTitle || obj.codeTitle || "";
  return penuh.split(":").slice(1).join(":").trim() || penuh || "materi ini";
}

/** Perluas panel pendek yang tipikal (spektrum peluang, rasio, dll). */
const BANK = {
  "tidak mungkin":
    "Tangga paling kiri. Kejadian sama sekali tidak terjadi — peluang nol. Contoh: dadu biasa menghasilkan angka tujuh. Bandingkan dengan tangga di kanannya.",
  "kurang mungkin":
    "Dekat ujung kiri. Bisa terjadi, tapi jarang. Contoh: angka enam muncul sekali dari banyak lemparan dadu. Letakkan prediksimu di tangga ini jika jarang.",
  mungkin:
    "Di tengah spektrum. Kejadian bisa terjadi atau tidak. Contoh: hujan sore ini. Bukan tebak kosong — pakai bukti jumlah atau pengalaman.",
  "sangat mungkin":
    "Dekat ujung kanan. Sering terjadi, hampir rutin. Contoh: matahari terbit esok pagi. Masih belum pasti, tapi jauh lebih sering dari “kurang mungkin”.",
  pasti:
    "Tangga paling kanan. Selalu terjadi, peluang penuh. Contoh: hari esok datang. Bedakan dari “sangat mungkin” yang masih bisa gagal.",
  spectrum:
    "Lima tangga Likelihood Spectrum: tidak mungkin → kurang mungkin → mungkin → sangat mungkin → pasti. Urutkan prediksi sebelum menghitung angka.",
  koin: "Koin adil punya dua sisi. Gambar dan angka sama mungkin: masing-masing 1 dari 2. Cocokkan dengan tangga “mungkin”.",
  "dadu 6":
    "Dadu biasa punya enam sisi. Satu angka tertentu = 1 dari 6 — lebih jarang daripada koin. Bandingkan area peluangnya.",
  "roda putar":
    "Area warna pada roda ≈ peluang. Sektor lebih lebar → lebih mungkin. Prediksi dulu, lalu catat hasil putaran.",
  "siap b":
    "Skala kualitatif sudah siap. Berikutnya bandingkan dua peluang dengan rasio untung/total, lalu putuskan adil atau kurang adil.",
  favorable:
    "Favorable = hasil yang diinginkan (pembilang). Contoh: koin gambar = 1 hasil untung. Hitung dulu pembilang sebelum membagi.",
  total:
    "Total = semua hasil mungkin (penyebut). Koin: 2; dadu: 6. Tanpa total, rasio peluang tidak bisa dibandingkan.",
  rasio:
    "Rasio peluang = favorable ÷ total. Tulis pecahan dulu, baru bandingkan besarnya. Jangan hanya melihat pembilang.",
  bandingkan:
    "Bandingkan dua pecahan peluang (Comparative Ratio). Samakan penyebut atau ubah ke desimal singkat, lalu lihat mana lebih besar.",
  adil: "Permainan adil bila peluang tiap pemain sama. Contoh: koin dua sisi. Jika peluang beda, permainan kurang adil.",
  "kurang adil":
    "Peluang tidak sama. Contoh: roda dengan sektor merah jauh lebih lebar. Putuskan dari rasio, bukan dari perasaan.",
};

function bankUntuk(judul) {
  const n = normal(judul);
  if (BANK[n]) return BANK[n];
  for (const [k, v] of Object.entries(BANK)) {
    if (n.includes(k) || k.includes(n)) return v;
  }
  return "";
}

function contohDariVideo(judul, obj) {
  const n = normal(judul);
  const kata = n.split(" ").filter((k) => k.length > 3);
  let terbaik = null;
  let skor = 0;
  for (const v of obj.videos || []) {
    for (const a of v.adegan || []) {
      const judulA = normal(a.judul || v.judul);
      let s = 0;
      if (judulA === n) s = 100;
      else if (judulA.includes(n) || n.includes(judulA)) s = 70;
      else s = kata.filter((k) => judulA.includes(k)).length * 25;
      // Kata generik peluang/skala jangan mendongkrak skor sendiri
      if (s > skor) {
        skor = s;
        terbaik = a;
      }
    }
  }
  if (!terbaik || skor < 50) return "";
  const ketukan = (terbaik.ketukan || [])
    .map(bersih)
    .filter((t) => t && !/^METODE LUAR/i.test(t))
    .slice(0, 2);
  const papan = (terbaik.papan || []).slice(0, 3).join("; ");
  return bersih(`${ketukan.join(" ")}${papan ? ` Ingat: ${papan}.` : ""}`);
}

function bangunSuara(panel, obj) {
  const judul = panel.judul || "Panel";
  const label = bersih(panel.countWord);
  const inti = bersih(panel.suara);
  const topik = topikDari(obj);
  const bank = bankUntuk(judul);
  const contoh = contohDariVideo(judul, obj);

  let bagian = [];
  if (inti.length >= 90) {
    bagian = [inti];
    if (contoh && !inti.includes(contoh.slice(0, 20))) bagian.push(contoh);
  } else if (bank) {
    bagian = [`${judul}${label ? ` (${label})` : ""}.`, bank];
    if (contoh) bagian.push(contoh);
  } else {
    bagian = [
      inti.length >= 20 ? inti : `${judul}${label ? ` — ${label}` : ""}.`,
      contoh ||
        `Pada ${topik}, cocokkan gambar “${judul}” dengan artinya${label ? ` (${label})` : ""}, lalu sebut satu contoh dari ceritamu.`,
    ];
  }

  // Rapikan jadi 2–4 kalimat unik
  const lihat = new Set();
  const kalimat = [];
  for (const b of bagian) {
    for (const pot of bersih(b).split(/(?<=[.!?])\s+/)) {
      let k = bersih(pot);
      if (k.length < 12) continue;
      if (!/[.!?]$/.test(k)) k += ".";
      const key = normal(k).slice(0, 36);
      if (lihat.has(key)) continue;
      lihat.add(key);
      kalimat.push(k);
    }
  }
  let suara = kalimat.slice(0, 4).join(" ");
  if (suara.length < MIN) {
    suara = bersih(
      `${suara} Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita ${topik}.`,
    );
  }
  return potong(suara, MAKS);
}

function bangunVisual(panel) {
  const label = bersih(panel.countWord);
  const inti = bersih(panel.suara);
  const bank = bankUntuk(panel.judul);
  const singkat = bank ? bank.split(/(?<=[.!?])\s+/)[0] : inti;
  const isi =
    label && singkat && singkat.length <= 42
      ? `${panel.judul}: ${label}`
      : singkat || label || panel.judul;
  return potong(`${panel.emoji || "📌"} ${isi}`, MAKS_VIS);
}

function ekstrakSub(teks) {
  const subs = [];
  const re =
    /export const (SUB_[A-Z0-9]+)\s*(?::\s*[^=]+)?=\s*(\{[\s\S]*?\n\})\s*(?:as const(?:\s+satisfies\s+\w+)?)?;/g;
  let m;
  while ((m = re.exec(teks))) {
    if (/^SUB_BAB_/i.test(m[1])) continue;
    try {
      const obj = Function(`"use strict"; return (${m[2]});`)();
      if (Array.isArray(obj.infografis) && obj.infografis.length) subs.push({ nama: m[1], obj });
    } catch (e) {
      console.warn(`  lewati ${m[1]}: ${e.message}`);
    }
  }
  return subs;
}

function formatPanel(p) {
  return `    {\n${[
    `      "judul": ${JSON.stringify(p.judul)}`,
    `      "emoji": ${JSON.stringify(p.emoji)}`,
    `      "countNum": ${p.countNum}`,
    `      "countWord": ${JSON.stringify(p.countWord)}`,
    `      "suara": ${JSON.stringify(p.suara)}`,
    `      "teksVisual": ${JSON.stringify(p.teksVisual)}`,
  ].join(",\n")}\n    }`;
}

function gantiInfografis(teks, daftarBaru) {
  let i = 0;
  return teks.replace(/"infografis":\s*\[[\s\S]*?\n  \],/g, () => {
    const panels = daftarBaru[i++];
    if (!panels) throw new Error("Jumlah blok infografis tidak cocok.");
    return `"infografis": [\n${panels.map(formatPanel).join(",\n")}\n  ],`;
  });
}

let berkas = 0;
let panelN = 0;

for (const f of FILE) {
  const p = path.join(DIR, f);
  const asli = fs.readFileSync(p, "utf8");
  const subs = ekstrakSub(asli);
  if (!subs.length) continue;
  const baru = [];
  for (const { nama, obj } of subs) {
    const panels = obj.infografis.map((panel) => {
      const suara = bangunSuara(panel, obj);
      const teksVisual = bangunVisual(panel);
      return { ...panel, suara, teksVisual };
    });
    baru.push(panels);
    panelN += panels.length;
    const min = Math.min(...panels.map((x) => x.suara.length));
    const avg = Math.round(panels.reduce((a, x) => a + x.suara.length, 0) / panels.length);
    console.log(`  ${f} ${nama}: min=${min} avg=${avg}`);
  }
  if ([...asli.matchAll(/"infografis":\s*\[/g)].length !== baru.length) {
    console.warn(`${f}: jumlah blok tidak cocok — lewati`);
    continue;
  }
  fs.writeFileSync(p, gantiInfografis(asli, baru));
  berkas += 1;
  console.log(`${f}: ditulis`);
}

console.log(`\nSelesai: ${berkas} berkas, ${panelN} panel.`);
