import { readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@supabase/supabase-js";

const akar = resolve(fileURLToPath(new URL("..", import.meta.url)));

function bacaEnv(jalur) {
  const env = {};
  for (const baris of readFileSync(jalur, "utf8").split(/\r?\n/)) {
    const isi = baris.trim();
    if (!isi || isi.startsWith("#") || !isi.includes("=")) continue;
    const indeks = isi.indexOf("=");
    env[isi.slice(0, indeks).trim()] = isi
      .slice(indeks + 1)
      .trim()
      .replace(/^['"]|['"]$/g, "");
  }
  return env;
}

function rapikanKunci(nilai) {
  return String(nilai)
    .trim()
    .toLowerCase()
    .normalize("NFKC")
    .replace(/[’‘ʻ`´]/g, "'")
    .replace(/\s+/g, " ")
    .replace(/\s*:\s*/g, ": ");
}

const KELAS = "1 SD";
const MAPEL = "Pendidikan Agama Islam dan Budi Pekerti";
const VERSI = "naskah:v3";

function kunciUtama(materi) {
  return `${rapikanKunci(KELAS)}|${rapikanKunci(MAPEL)}|${rapikanKunci(materi)}|${VERSI}`;
}

function cetakNaskahResmi() {
  const npx = spawnSync(
    "npx",
    ["--yes", "tsx", "--tsconfig", "tsconfig.json", "scripts/cetak-naskah-pai-1-bab3-10.ts"],
    {
      cwd: akar,
      encoding: "utf8",
      shell: true,
    },
  );
  const teks = (npx.stdout || "").trim();
  const jsonMulai = teks.indexOf("[");
  if (npx.status !== 0 || jsonMulai < 0) {
    throw new Error(
      `Gagal membaca naskah resmi: ${npx.stderr || npx.stdout || `status ${npx.status}`}`,
    );
  }
  return JSON.parse(teks.slice(jsonMulai));
}

function bacaEnvJikaAda(jalur) {
  try {
    return bacaEnv(jalur);
  } catch {
    return {};
  }
}

const env = {
  ...bacaEnvJikaAda(resolve(akar, ".env")),
  ...bacaEnvJikaAda(resolve(akar, ".env.local")),
};
const url = env.NEXT_PUBLIC_SUPABASE_URL;
const kunciLayanan =
  env.SUPABASE_SERVICE_ROLE_KEY || env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
if (!url || !kunciLayanan) {
  throw new Error("Supabase URL atau kunci belum ada di .env.local");
}

const daftar = cetakNaskahResmi();
const supabase = createClient(url, kunciLayanan, {
  auth: { persistSession: false, autoRefreshToken: false },
});
const sekarang = new Date().toISOString();
const hasil = [];

for (const item of daftar) {
  const MATERI = item.judul;
  const resmi = item.isi;
  const KUNCI = kunciUtama(MATERI);
  const payload = {
    curriculum_view: resmi.curriculum_view,
    global_best_view: resmi.global_best_view,
    sketsa_kartu: resmi.sketsaKartu,
    svg_code: resmi.svgCode ?? "",
    pertanyaan: resmi.pertanyaan,
    kunci_jawaban: resmi.kunciJawaban,
    motivasi: resmi.motivasi,
    referensi_url: resmi.referensiUrl ?? "",
    kelas: KELAS,
    mapel: MAPEL,
    materi: MATERI,
    is_draft: false,
    is_locked: true,
    model_sumber: "naskah-resmi",
    audio_siap: false,
    updated_at: sekarang,
  };

  const alias = [
    KUNCI,
    `${rapikanKunci(KELAS)}|pai|${rapikanKunci(MATERI)}|${VERSI}`,
    `${rapikanKunci(KELAS)}|agama islam|${rapikanKunci(MATERI)}|${VERSI}`,
    `${rapikanKunci(KELAS)}|pendidikan agama dan budi pekerti|${rapikanKunci(MATERI)}|${VERSI}`,
  ];

  const potong = MATERI.replace(/^bab\s*\d+\s*:\s*/i, "");
  const cari = await supabase
    .from("cache_materi_tutor")
    .select("kunci, topic_id, is_locked, model_sumber")
    .ilike("kelas", KELAS)
    .ilike("materi", `%${potong.slice(0, 18)}%`);

  if (cari.error) {
    throw new Error(`Baca cache gagal (${MATERI}): ${cari.error.message}`);
  }

  const idAda = new Set();
  for (const row of cari.data ?? []) {
    if (row.kunci) idAda.add(row.kunci);
    if (row.topic_id) idAda.add(row.topic_id);
  }

  const upsert = await supabase.from("cache_materi_tutor").upsert(
    {
      ...payload,
      kunci: KUNCI,
      topic_id: KUNCI,
    },
    { onConflict: "kunci" },
  );
  if (upsert.error) {
    throw new Error(`Upsert cache gagal (${MATERI}): ${upsert.error.message}`);
  }

  for (const id of [...idAda]) {
    if (id === KUNCI) continue;
    const update = await supabase
      .from("cache_materi_tutor")
      .update({ ...payload, is_locked: true, is_draft: false })
      .eq("kunci", id);
    if (update.error) {
      throw new Error(`Update cache gagal (${id}): ${update.error.message}`);
    }
    const updateTopic = await supabase
      .from("cache_materi_tutor")
      .update({ is_locked: true, is_draft: false, updated_at: sekarang })
      .eq("topic_id", id);
    if (updateTopic.error) {
      throw new Error(`Update topic gagal (${id}): ${updateTopic.error.message}`);
    }
  }

  for (const id of alias) {
    await supabase
      .from("cache_materi_tutor")
      .update({ is_locked: true, is_draft: false, updated_at: sekarang })
      .eq("kunci", id);
    await supabase
      .from("cache_materi_tutor")
      .update({ is_locked: true, is_draft: false, updated_at: sekarang })
      .eq("topic_id", id);
  }

  const cek = await supabase
    .from("cache_materi_tutor")
    .select("kunci, is_locked, is_draft, model_sumber, updated_at")
    .eq("kunci", KUNCI);

  if (cek.error) {
    throw new Error(`Cek cache gagal (${MATERI}): ${cek.error.message}`);
  }

  const utama = cek.data?.[0] ?? null;
  if (!utama?.is_locked) {
    throw new Error(
      `Naskah resmi tersimpan tetapi belum terkunci (${MATERI}, is_locked=${String(utama?.is_locked)}).`,
    );
  }

  hasil.push({
    materi: MATERI,
    kunci: utama.kunci,
    is_locked: utama.is_locked,
    model_sumber: utama.model_sumber,
    baris_diperbarui: Math.max(idAda.size, 1),
  });
}

console.log(JSON.stringify({ jumlah: hasil.length, modul: hasil }, null, 2));
