#!/usr/bin/env node
/**
 * Uji dengar suara guru: membuat sampel MP3 pendek (satu paragraf, sekitar 270 karakter) dari beberapa penyedia suara
 * supaya pemilik bisa membandingkan suara Indonesia mana yang paling natural SEBELUM membuat audio untuk seluruh modul.
 * Biayanya hanya beberapa ratus karakter per berkas (di dalam kuota gratis Google dan Azure; memakai sedikit kredit ElevenLabs).
 * Bukan bagian jalur siswa: hasil ke folder uji-suara/ (di luar git). Kunci dibaca dari .env.local dan tidak pernah dicetak.
 *
 * Pakai:  node scripts/uji-suara-sampel.mjs [--penyedia=elevenlabs,google,azure] [--dry]
 * Kunci yang dibutuhkan (di .env.local):
 *   elevenlabs: ELEVENLABS_API_KEY
 *   google:     GOOGLE_TTS_API_KEY (kunci API biasa) ATAU GOOGLE_CLOUD_CREDENTIALS (JSON akun layanan, boleh base64)
 *   azure:      AZURE_SPEECH_KEY dan AZURE_SPEECH_REGION (mis. southeastasia)
 * Penyedia tanpa kunci dilewati dan dijelaskan apa yang kurang.
 */
import { readFileSync, mkdirSync, writeFileSync, existsSync } from "node:fs";
import path from "node:path";

const SAMPEL =
  "Halo anak-anak, selamat datang di pelajaran matematika. Hari ini kita akan belajar menghitung, membaca, dan menulis bilangan. " +
  "Ini kamar Igil. Wah, mainannya berserakan di mana-mana! Kaka dan Abang datang membantu.";
/** Kecepatan bicara sampel: pelan, setara laju 0,8 (batas bawah ElevenLabs 0,7). */
const KECEPATAN = 0.8;

const arg = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, v] = a.replace(/^--/, "").split("=");
    return [k, v ?? true];
  }),
);
const penyedia = String(arg.penyedia ?? "elevenlabs,google,azure").split(",").map((s) => s.trim());
const kering = arg.dry === true;

function bacaEnv() {
  const env = {};
  for (const f of [".env", ".env.local"]) {
    if (!existsSync(f)) continue;
    for (const baris of readFileSync(f, "utf8").split(/\r?\n/)) {
      const t = baris.trim();
      if (!t || t.startsWith("#") || !t.includes("=")) continue;
      const i = t.indexOf("=");
      const v = t.slice(i + 1).trim().replace(/^['"]|['"]$/g, "");
      if (v) env[t.slice(0, i).trim()] = v;
    }
  }
  return env;
}
const env = bacaEnv();

const folder = path.resolve("uji-suara");
const hasil = [];
let totalKarakter = 0;
const simpan = (nama, buf) => {
  mkdirSync(folder, { recursive: true });
  writeFileSync(path.join(folder, nama), buf);
  hasil.push(nama);
};
const kerjakan = async (nama, fungsi) => {
  totalKarakter += SAMPEL.length;
  if (kering) {
    console.log(`  [kering] ${nama} (${SAMPEL.length} karakter)`);
    return;
  }
  try {
    simpan(nama, await fungsi());
    console.log(`  jadi: ${nama}`);
  } catch (e) {
    console.log(`  GAGAL ${nama}: ${String(e.message ?? e).slice(0, 220)}`);
  }
};

/* ------------------------------ ElevenLabs ------------------------------ */
async function elevenlabs() {
  const kunci = env.ELEVENLABS_API_KEY;
  if (!kunci) return console.log("elevenlabs: dilewati (ELEVENLABS_API_KEY belum ada)");
  console.log("elevenlabs:");
  // Suara SD yang sudah dipakai proyek (Anjani = Bu Sari, Deden Cahya = Pak Budi) dan dua model: Flash (murah) dan Multilingual v2 (lebih halus).
  const suara = { wanita: env.ELEVENLABS_VOICE_SD_WANITA || "52LXmmR0nGnIcDs1TL3f", pria: env.ELEVENLABS_VOICE_SD_PRIA || "3rL9ZxRgBgIkh4tcbrEH" };
  for (const model of ["eleven_flash_v2_5", "eleven_multilingual_v2"]) {
    for (const [gender, id] of Object.entries(suara)) {
      await kerjakan(`elevenlabs-${model.replace("eleven_", "")}-${gender}.mp3`, async () => {
        const r = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${id}?output_format=mp3_22050_32`, {
          method: "POST",
          headers: { "content-type": "application/json", "xi-api-key": kunci, accept: "audio/mpeg" },
          body: JSON.stringify({ text: SAMPEL, model_id: model, language_code: "id", voice_settings: { stability: 0.62, similarity_boost: 0.72, style: 0.22, speed: KECEPATAN, use_speaker_boost: true } }),
        });
        if (!r.ok) throw new Error(`${r.status} ${(await r.text()).slice(0, 160)}`);
        return Buffer.from(await r.arrayBuffer());
      });
    }
  }
}

/* ------------------------------ Google Cloud (Chirp 3 HD) ------------------------------ */
async function google() {
  const apiKey = env.GOOGLE_TTS_API_KEY;
  const kred = env.GOOGLE_CLOUD_CREDENTIALS;
  if (!apiKey && !kred) {
    return console.log("google: dilewati (butuh GOOGLE_TTS_API_KEY, atau GOOGLE_CLOUD_CREDENTIALS berisi JSON akun layanan; yang ada di .env.local masih kosong)");
  }
  console.log("google:");
  let tajuk = { "content-type": "application/json" };
  let url = "https://texttospeech.googleapis.com/v1/text:synthesize";
  if (apiKey) url += `?key=${encodeURIComponent(apiKey)}`;
  else {
    const { GoogleAuth } = await import("google-auth-library");
    const json = kred.startsWith("{") ? JSON.parse(kred) : JSON.parse(Buffer.from(kred, "base64").toString("utf8"));
    const token = await new GoogleAuth({ credentials: json, scopes: ["https://www.googleapis.com/auth/cloud-platform"] }).getAccessToken();
    tajuk = { ...tajuk, authorization: `Bearer ${token}` };
  }
  // Nama suara sama dengan src/lib/guru.ts (suaraChirpGuru, jenjang SD).
  for (const [gender, nama] of [["wanita", "id-ID-Chirp3-HD-Aoede"], ["pria", "id-ID-Chirp3-HD-Charon"]]) {
    await kerjakan(`google-chirp3hd-${gender}.mp3`, async () => {
      const r = await fetch(url, {
        method: "POST",
        headers: tajuk,
        body: JSON.stringify({ input: { text: SAMPEL }, voice: { languageCode: "id-ID", name: nama }, audioConfig: { audioEncoding: "MP3", speakingRate: KECEPATAN, sampleRateHertz: 22050 } }),
      });
      const j = await r.json();
      if (!r.ok) throw new Error(`${r.status} ${JSON.stringify(j).slice(0, 200)}`);
      return Buffer.from(j.audioContent, "base64");
    });
  }
}

/* ------------------------------ Azure Speech (Neural) ------------------------------ */
async function azure() {
  const kunci = env.AZURE_SPEECH_KEY;
  const wilayah = env.AZURE_SPEECH_REGION;
  if (!kunci || !wilayah) return console.log("azure: dilewati (butuh AZURE_SPEECH_KEY dan AZURE_SPEECH_REGION dari sumber daya Speech tingkat gratis F0)");
  console.log("azure:");
  for (const [gender, nama] of [["wanita", "id-ID-GadisNeural"], ["pria", "id-ID-ArdiNeural"]]) {
    await kerjakan(`azure-neural-${gender}.mp3`, async () => {
      const ssml = `<speak version="1.0" xml:lang="id-ID" xmlns="http://www.w3.org/2001/10/synthesis"><voice name="${nama}"><prosody rate="${Math.round((KECEPATAN - 1) * 100)}%">${SAMPEL.replace(/&/g, "&amp;")}</prosody></voice></speak>`;
      const r = await fetch(`https://${wilayah}.tts.speech.microsoft.com/cognitiveservices/v1`, {
        method: "POST",
        headers: { "Ocp-Apim-Subscription-Key": kunci, "content-type": "application/ssml+xml", "X-Microsoft-OutputFormat": "audio-24khz-48kbitrate-mono-mp3", "User-Agent": "igil-uji-suara" },
        body: ssml,
      });
      if (!r.ok) throw new Error(`${r.status} ${(await r.text()).slice(0, 160)}`);
      return Buffer.from(await r.arrayBuffer());
    });
  }
}

console.log(`Sampel ${SAMPEL.length} karakter, kecepatan ${KECEPATAN}${kering ? " (percobaan kering, tanpa memanggil layanan)" : ""}`);
if (penyedia.includes("elevenlabs")) await elevenlabs();
if (penyedia.includes("google")) await google();
if (penyedia.includes("azure")) await azure();
console.log(`\nTotal karakter yang dikirim: ${totalKarakter}. Berkas jadi: ${hasil.length}${hasil.length ? ` di ${folder}` : ""}`);
for (const h of hasil) console.log(`  ${h}`);
