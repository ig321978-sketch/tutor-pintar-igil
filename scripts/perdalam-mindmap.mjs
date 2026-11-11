/**
 * Perdalam mindMaps di naskah-k2b2 … naskah-k6b4:
 * - flowFrom/flowTo: label konsep (bukan angka 1→3)
 * - stepDesc: uraian pedagogis ≥180 huruf (setara Kelas 1 / K2 Bab 1)
 *
 * Jalankan: node scripts/perdalam-mindmap.mjs
 * Tanpa API. Hanya menulis ulang objek mindMaps di berkas TypeScript naskah.
 */
import fs from "node:fs";
import path from "node:path";

const DIR = path.join("src", "components", "modul");
const MIN_DESC = 180;
const HANYA = process.argv.includes("--hanya") ? process.argv[process.argv.indexOf("--hanya") + 1] : null;

const FILE = fs
  .readdirSync(DIR)
  .filter((f) => /^naskah-k([2-6])b\d+\.ts$/.test(f))
  .filter((f) => {
    if (HANYA) return f === HANYA || f === `naskah-${HANYA}` || f === `naskah-${HANYA}.ts`;
    const m = /^naskah-k(\d+)b(\d+)\.ts$/.exec(f);
    if (!m) return false;
    const k = Number(m[1]);
    const b = Number(m[2]);
    // K2B2 … K6B4
    if (k === 2 && b >= 2) return true;
    if (k >= 3 && k <= 5) return true;
    if (k === 6 && b <= 4) return true;
    return false;
  })
  .sort();

function bersihJudul(t) {
  return String(t || "")
    .replace(/^\d+\.\s*/, "")
    .replace(/\s+/g, " ")
    .trim();
}

function labelAlur(judul) {
  const j = bersihJudul(judul);
  // Singkat untuk subjudul visual
  if (j.length <= 28) return j;
  return j.slice(0, 26).replace(/\s+\S*$/, "") || j.slice(0, 26);
}

function topikDari(sub) {
  const penuh = sub.fullTitle || sub.codeTitle || "";
  const potong = penuh.split(":").slice(1).join(":").trim();
  return potong || penuh || "materi ini";
}

function metodeDari(sub) {
  const luar = Array.isArray(sub.metodeLuar) ? sub.metodeLuar : [];
  if (luar.length) {
    return luar
      .slice(0, 3)
      .map((m) => `${m.namaId || m.nama}${m.ringkas ? `: ${m.ringkas}` : ""}`)
      .join(" ");
  }
  // Cadangan dari silabus suara
  const suara = sub.silabus?.teksSuara || "";
  const potong = suara.match(/Kita memakai cara:[^.]+/i)?.[0];
  return potong || "";
}

function perdalamDesc(step, ctx) {
  const judul = bersihJudul(step.stepTitle);
  const pendek = String(step.stepDesc || "").replace(/\s+/g, " ").trim();
  const n = step.stepNumber;
  const topik = ctx.topik;
  const metode = ctx.metode;
  const target = (ctx.target || "").replace(/\s+/g, " ").trim();

  // Sudah dalam dan bukan template dangkal generik → biarkan, hanya rapikan spasi
  const generik =
    /^(Apa yang ditanyakan|Terapkan cara itu|Apakah hasilnya masuk akal|Jelaskan ide utamanya|Latih di Concrete)/i.test(
      pendek,
    );
  if (pendek.length >= MIN_DESC && !generik) return pendek;

  if (n === 1 || /pahami soal/i.test(judul)) {
    return (
      `Baca soal ${topik} dengan teliti. Tandai apa yang diketahui dan apa yang ditanyakan. ` +
      `Ucapkan pertanyaan dengan kalimatmu sendiri sebelum menghitung. ` +
      (pendek && !generik ? `${pendek} ` : "") +
      `Jangan buru-buru ke angka; pastikan dulu makna ceritanya. ` +
      (target ? `Tujuan belajarnya: ${target.slice(0, 120)}${target.length > 120 ? "…" : ""}.` : "")
    ).replace(/\s+/g, " ").trim();
  }

  if (n === 5 || /^kerjakan$/i.test(judul)) {
    return (
      `Sekarang terapkan cara yang sudah dipilih pada ${topik}. ` +
      `Gambar dulu atau tulis langkahnya satu per satu, jangan lompat. ` +
      `Kalau tersendat, kembali ke cara sebelumnya lalu coba lagi. ` +
      `Hasil sementara ditulis rapi supaya mudah diperiksa.`
    );
  }

  if (n === 6 || /cek|masuk akal/i.test(judul)) {
    return (
      `Periksa apakah jawabanmu masuk akal untuk ${topik}. ` +
      `Bandingkan dengan perkiraan kasar, hitung ulang dengan cara lain, atau balik operasi. ` +
      `Jika hasilnya jauh dari dugaan, cari di mana langkahnya keliru. ` +
      `Pemeriksaan ini melatih kejujuran berpikir, bukan hanya kecepatan.`
    );
  }

  if (n === 7 || /simpulkan/i.test(judul)) {
    return (
      `Simpulkan ide utama ${topik} dengan kalimatmu sendiri. ` +
      `Sebutkan cara yang kamu pakai dan mengapa cara itu membantu. ` +
      `Jelaskan kepada teman seolah-olah kamu guru kecil. ` +
      `Simpulan yang jelas menandakan konsepnya sudah dipahami.`
    );
  }

  if (n === 8 || /^main$/i.test(judul)) {
    return (
      `Latih lagi di tahap Concrete, Picture, lalu Abstract untuk ${topik}. ` +
      `Mulai dari benda nyata, lanjut ke diagram, baru ke lambang angka. ` +
      `Ulangi sampai kamu bisa menjelaskan tanpa melihat contoh. ` +
      `Bermain sambil berlatih membuat konsepnya melekat lebih lama.`
    );
  }

  // Langkah metode (biasanya 2–4)
  const inti = pendek && !generik ? pendek.replace(/\.*$/, ".") : `${judul} adalah cara penting dalam ${topik}.`;
  const tambahanMetode = metode
    ? ` Ingat metode yang dianyam di sini: ${metode.slice(0, 160)}${metode.length > 160 ? "…" : ""}.`
    : "";
  return (
    `${inti} ` +
    `Pada ${topik}, langkah “${judul}” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. ` +
    `Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat.` +
    tambahanMetode +
    ` Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.`
  )
    .replace(/\s+/g, " ")
    .trim();
}

function perdalamMindMaps(maps, ctx) {
  const out = maps.map((m) => ({ ...m }));
  for (let i = 0; i < out.length; i++) {
    const cur = bersihJudul(out[i].stepTitle);
    const next = i < out.length - 1 ? bersihJudul(out[i + 1].stepTitle) : "Latihan Concrete–Abstract";
    out[i] = {
      ...out[i],
      stepDesc: perdalamDesc(out[i], ctx),
      flowFrom: labelAlur(cur),
      flowTo: labelAlur(next),
    };
  }
  return out;
}

function gantiMindMapsDiTeks(teks, mapsBaru) {
  // Ganti setiap blok "mindMaps": [ ... ], secara berurutan
  let i = 0;
  return teks.replace(/"mindMaps":\s*\[[\s\S]*?\n  \],/g, () => {
    const maps = mapsBaru[i++];
    if (!maps) throw new Error("Jumlah blok mindMaps tidak cocok.");
    const isi = maps
      .map(
        (m) => `    {
      "stepNumber": ${m.stepNumber},
      "stepTitle": ${JSON.stringify(m.stepTitle)},
      "stepDesc": ${JSON.stringify(m.stepDesc)},
      "icon": ${JSON.stringify(m.icon)},
      "flowFrom": ${JSON.stringify(m.flowFrom)},
      "flowTo": ${JSON.stringify(m.flowTo)}
    }`,
      )
      .join(",\n");
    return `"mindMaps": [\n${isi}\n  ],`;
  });
}

function ekstrakSubBab(teks) {
  // Ambil objek SUB_* = { ... } yang punya mindMaps — parse kasar via Function
  const subs = [];
  // Akhir objek: `};` atau `} as const …;`
  const re =
    /export const (SUB_[A-Z0-9]+)\s*(?::\s*[^=]+)?=\s*(\{[\s\S]*?\n\})\s*(?:as const(?:\s+satisfies\s+\w+)?)?;/g;
  let m;
  while ((m = re.exec(teks))) {
    const nama = m[1];
    // Lewati agregat seperti SUB_BAB_K6B4 = [...]
    if (/^SUB_BAB_/i.test(nama)) continue;
    const tubuh = m[2];
    try {
      // eslint-disable-next-line no-new-func
      const obj = Function(`"use strict"; return (${tubuh});`)();
      if (Array.isArray(obj.mindMaps) && obj.mindMaps.length) {
        subs.push({ nama, obj });
      }
    } catch (e) {
      console.warn(`  lewati ${nama}: ${e.message}`);
    }
  }
  return subs;
}

let totalLangkah = 0;
let totalBerkas = 0;

for (const f of FILE) {
  const p = path.join(DIR, f);
  const asli = fs.readFileSync(p, "utf8");
  const subs = ekstrakSubBab(asli);
  if (!subs.length) {
    console.log(`${f}: tidak ada SUB_* terurai`);
    continue;
  }
  const mapsBaru = [];
  for (const { nama, obj } of subs) {
    const ctx = {
      topik: topikDari(obj),
      metode: metodeDari(obj),
      target: obj.targetDescription || "",
    };
    const baru = perdalamMindMaps(obj.mindMaps, ctx);
    mapsBaru.push(baru);
    totalLangkah += baru.length;
    const min = Math.min(...baru.map((x) => x.stepDesc.length));
    const numeric = baru.some((x) => /^(\d+|START|END)$/i.test(x.flowFrom) || /^(\d+|START|END)$/i.test(x.flowTo));
    console.log(`  ${f} ${nama}: ${baru.length} langkah, minDesc=${min}${numeric ? " MASIH ANGKA!" : ""}`);
  }
  const jumlahBlok = [...asli.matchAll(/"mindMaps":\s*\[/g)].length;
  if (jumlahBlok !== mapsBaru.length) {
    console.warn(`${f}: blok mindMaps di teks=${jumlahBlok}, terurai=${mapsBaru.length} — lewati tulis`);
    continue;
  }
  const baruTeks = gantiMindMapsDiTeks(asli, mapsBaru);
  fs.writeFileSync(p, baruTeks);
  totalBerkas += 1;
  console.log(`${f}: ditulis ulang`);
}

console.log(`\nSelesai: ${totalBerkas} berkas, ${totalLangkah} langkah diperdalam.`);
