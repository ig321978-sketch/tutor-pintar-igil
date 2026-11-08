#!/usr/bin/env node
/**
 * Membuat audio Suara Guru statis, SEKALI saat penulisan.
 *
 * Alur:
 *  1. Jalankan server dev lokal (npm run dev) dengan ELEVENLABS_API_KEY di .env.local.
 *  2. Mainkan modul di server dev. Pemutar mencatat setiap ucapan ke
 *     src/content-master/naskah-guru.json (tidak di-commit).
 *  3. node scripts/buat-audio-guru.mjs --dry     (hitung dulu: jumlah ucapan, karakter, ukuran)
 *     node scripts/buat-audio-guru.mjs           (buat audio yang belum ada)
 *
 * Hasil: public/audio-guru/<hash>.mp3 dan public/audio-guru/manifest.json.
 * Berkas yang sudah ada dilewati, jadi aman dijalankan ulang tanpa menagih ulang.
 * Siswa tidak pernah memanggil layanan suara: pemutar hanya membaca berkas ini.
 *
 * Opsi: --masuk=berkas.json  --server=http://localhost:3000  --kelamin=wanita,pria
 *       --maks=N (batasi jumlah ucapan baru)  --dry  --paralel=2
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import { kunciAudioGuru, namaBerkasAudioGuru } from "../src/lib/kunci-audio-guru.ts";

const argumen = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, v] = a.replace(/^--/, "").split("=");
    return [k, v ?? true];
  })
);

const akar = process.cwd();
const masuk = path.resolve(akar, String(argumen.masuk ?? "src/content-master/naskah-guru.json"));
const server = String(argumen.server ?? "http://localhost:3000").replace(/\/$/, "");
const kelaminDipakai = String(argumen.kelamin ?? "wanita,pria").split(",").map((s) => s.trim()).filter(Boolean);
const maks = argumen.maks ? Number(argumen.maks) : Infinity;
const paralel = Math.max(1, Number(argumen.paralel ?? 2));
const kering = argumen.dry === true;

const folder = path.join(akar, "public", "audio-guru");
const berkasManifest = path.join(folder, "manifest.json");

const BAYT_PER_DETIK = 4000; // mp3_22050_32
const RATA_DETIK_PER_KARAKTER = 0.07;

async function bacaJson(berkas, awal) {
  try {
    return JSON.parse(await fs.readFile(berkas, "utf8"));
  } catch {
    return awal;
  }
}

const naskah = await bacaJson(masuk, null);
if (!Array.isArray(naskah) || naskah.length === 0) {
  console.error(`Tidak ada naskah di ${path.relative(akar, masuk)}. Mainkan modul di server dev dulu supaya ucapan tercatat.`);
  process.exit(1);
}

const manifest = await bacaJson(berkasManifest, { versi: 1, berkas: [] });
const sudah = new Set(manifest.berkas);

const pekerjaan = [];
let karakterBaru = 0;
for (const e of naskah) {
  for (const kelamin of kelaminDipakai) {
    const kunci = kunciAudioGuru(e.teks, kelamin, e.kelas, { tanpaNotasi: e.tanpaNotasi, suaraTetap: e.suaraTetap });
    const nama = namaBerkasAudioGuru(kunci);
    if (sudah.has(nama)) continue;
    pekerjaan.push({ ...e, kelamin, nama });
    karakterBaru += e.teks.length;
  }
}

const jumlahUcapan = naskah.length;
const taksirDetik = pekerjaan.reduce((a, p) => a + p.teks.length * RATA_DETIK_PER_KARAKTER, 0);
console.log(`Ucapan unik tercatat : ${jumlahUcapan}`);
console.log(`Guru                 : ${kelaminDipakai.join(", ")}`);
console.log(`Berkas sudah ada     : ${sudah.size}`);
console.log(`Berkas yang perlu dibuat: ${pekerjaan.length}`);
console.log(`Karakter yang ditagih: ${karakterBaru.toLocaleString("id-ID")}  (tiap karakter ditagih sekali per berkas)`);
console.log(`Taksiran ukuran      : ${(taksirDetik * BAYT_PER_DETIK / 1_048_576).toFixed(1)} MB (mp3 32 kbps)`);

if (kering || pekerjaan.length === 0) process.exit(0);

await fs.mkdir(folder, { recursive: true });
const antrian = pekerjaan.slice(0, maks);
let selesai = 0;
let gagal = 0;
let tulis = Promise.resolve();

const simpanManifest = () => {
  tulis = tulis.then(() => fs.writeFile(berkasManifest, JSON.stringify({ versi: 1, berkas: [...sudah].sort() }), "utf8"));
  return tulis;
};

async function buat(p) {
  for (let percobaan = 1; percobaan <= 3; percobaan++) {
    try {
      const respons = await fetch(`${server}/api/tts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          teks: p.teks,
          kelamin: p.kelamin === "pria" ? "male" : "female",
          kelas: p.kelas,
          tanpaNotasi: p.tanpaNotasi,
          suaraTetap: p.suaraTetap,
          format: "mp3",
        }),
      });
      const data = await respons.json();
      if (!data.berhasil || !data.audioBase64) throw new Error(data.pesan ?? `HTTP ${respons.status}`);
      await fs.writeFile(path.join(folder, `${p.nama}.mp3`), Buffer.from(data.audioBase64, "base64"));
      sudah.add(p.nama);
      selesai++;
      if (selesai % 10 === 0) await simpanManifest();
      return;
    } catch (e) {
      if (percobaan === 3) {
        gagal++;
        console.error(`GAGAL (${p.kelamin}) "${p.teks.slice(0, 50)}": ${e.message}`);
      } else {
        await new Promise((r) => setTimeout(r, 1500 * percobaan));
      }
    }
  }
}

let indeks = 0;
await Promise.all(
  Array.from({ length: paralel }, async () => {
    while (indeks < antrian.length) {
      const p = antrian[indeks++];
      await buat(p);
      if ((selesai + gagal) % 25 === 0) console.log(`  ${selesai + gagal}/${antrian.length}`);
    }
  })
);
await simpanManifest();
console.log(`Selesai: ${selesai} berkas baru, ${gagal} gagal. Total di manifest: ${sudah.size}.`);
