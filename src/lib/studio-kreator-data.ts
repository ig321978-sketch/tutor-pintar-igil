import type { DetailCacheMateri, RingkasCacheMateri } from "@/lib/jenis-cache-materi";
import { naskahLatihanSaja } from "@/lib/kuis";
import { supabaseAuthServer } from "@/lib/supabase-auth";
import { isiDariBadanStudio } from "@/lib/studio-kreator";

const TABEL = "cache_materi_tutor";
const KOLOM =
  "kunci, topic_id, kelas, mapel, materi, model_sumber, is_draft, is_locked, audio_siap, updated_at, curriculum_view, global_best_view, sketsa_kartu, svg_code, pertanyaan, kunci_jawaban, motivasi, referensi_url";

type BarisCache = {
  kunci: string;
  topic_id: string | null;
  kelas: string;
  mapel: string;
  materi: string;
  model_sumber: string | null;
  is_draft: boolean | null;
  is_locked: boolean | null;
  audio_siap: boolean | null;
  updated_at: string | null;
  curriculum_view: string | null;
  global_best_view: string | null;
  sketsa_kartu: string | null;
  svg_code: string | null;
  pertanyaan: string | null;
  kunci_jawaban: string | null;
  motivasi: string | null;
  referensi_url: string | null;
};

export type HasilDaftarStudio = {
  siap: boolean;
  daftar: RingkasCacheMateri[];
  pesan?: string;
};

function jumlahLatihan(pertanyaan: string): number {
  return naskahLatihanSaja(pertanyaan)
    .split(/\n\s*\n/)
    .map((blok) => blok.trim())
    .filter(Boolean).length;
}

function keRingkas(baris: BarisCache): RingkasCacheMateri {
  const kurikulum = (baris.curriculum_view ?? "").trim();
  const global = (baris.global_best_view ?? "").trim();
  return {
    kunci: baris.kunci,
    topicId: (baris.topic_id ?? "").trim() || baris.kunci,
    kelas: baris.kelas,
    mapel: baris.mapel,
    materi: baris.materi,
    modelSumber: baris.model_sumber ?? "",
    isDraft: baris.is_draft !== false,
    isLocked: Boolean(baris.is_locked),
    audioSiap: Boolean(baris.audio_siap),
    updatedAt: baris.updated_at ?? "",
    adaCacheMateri: Boolean(kurikulum || global),
    jumlahLatihan: jumlahLatihan(baris.pertanyaan ?? ""),
  };
}

function keDetail(baris: BarisCache): DetailCacheMateri {
  return {
    ...keRingkas(baris),
    curriculum_view: baris.curriculum_view ?? "",
    global_best_view: baris.global_best_view ?? "",
    sketsaKartu: baris.sketsa_kartu ?? "",
    svgCode: baris.svg_code ?? "",
    pertanyaan: baris.pertanyaan ?? "",
    kunciJawaban: baris.kunci_jawaban ?? "",
    motivasi: baris.motivasi ?? "",
    referensiUrl: baris.referensi_url ?? "",
  };
}

function pesanTabel(pesan: string): string {
  if (/schema cache|does not exist|could not find the table/i.test(pesan)) {
    return "Tabel cache modul belum ada di Supabase.";
  }
  return "Server belum bisa membaca cache modul.";
}

async function klien() {
  return supabaseAuthServer();
}

export async function muatDaftarStudio(): Promise<HasilDaftarStudio> {
  const supabase = await klien();
  if (!supabase) {
    return { siap: false, daftar: [], pesan: "Koneksi Supabase belum siap." };
  }
  const { data, error } = await supabase
    .from(TABEL)
    .select(KOLOM)
    .order("updated_at", { ascending: false });
  if (error) {
    return { siap: false, daftar: [], pesan: pesanTabel(error.message) };
  }
  return { siap: true, daftar: ((data ?? []) as BarisCache[]).map(keRingkas) };
}

export async function ambilDetailStudio(kunci: string): Promise<DetailCacheMateri | null> {
  const supabase = await klien();
  if (!supabase) return null;
  const { data, error } = await supabase.from(TABEL).select(KOLOM).eq("kunci", kunci).maybeSingle();
  if (error || !data) return null;
  return keDetail(data as BarisCache);
}

export async function simpanStudio(
  kunci: string,
  badan: Record<string, unknown>,
): Promise<{ data: DetailCacheMateri | null; terkunci: boolean }> {
  const sekarang = await ambilDetailStudio(kunci);
  if (!sekarang) return { data: null, terkunci: false };
  if (sekarang.isLocked) return { data: null, terkunci: true };
  const isi = isiDariBadanStudio(badan);
  const supabase = await klien();
  if (!supabase) return { data: null, terkunci: false };
  const { data, error } = await supabase
    .from(TABEL)
    .update({
      curriculum_view: isi.curriculum_view,
      global_best_view: isi.global_best_view,
      sketsa_kartu: isi.sketsaKartu,
      svg_code: isi.svgCode,
      pertanyaan: isi.pertanyaan,
      kunci_jawaban: isi.kunciJawaban,
      motivasi: isi.motivasi,
      referensi_url: isi.referensiUrl ?? "",
      updated_at: new Date().toISOString(),
    })
    .eq("kunci", kunci)
    .select(KOLOM)
    .maybeSingle();
  if (error || !data) return { data: null, terkunci: false };
  return { data: keDetail(data as BarisCache), terkunci: false };
}

export async function hapusStudio(kunci: string): Promise<"ok" | "terkunci" | "gagal" | "tiada"> {
  const sekarang = await ambilDetailStudio(kunci);
  if (!sekarang) return "tiada";
  if (sekarang.isLocked) return "terkunci";
  const supabase = await klien();
  if (!supabase) return "gagal";
  await supabase.from("cache_modul_hapus").upsert({
    kunci,
    kelas: sekarang.kelas,
    mapel: sekarang.mapel,
    materi: sekarang.materi,
    dihapus_at: new Date().toISOString(),
  });
  const { error } = await supabase.from(TABEL).delete().eq("kunci", kunci);
  return error ? "gagal" : "ok";
}

export async function aturKunciStudio(
  kunci: string,
  terkunci: boolean,
): Promise<DetailCacheMateri | null> {
  const supabase = await klien();
  if (!supabase) return null;
  const { data, error } = await supabase
    .from(TABEL)
    .update({ is_locked: terkunci, updated_at: new Date().toISOString() })
    .eq("kunci", kunci)
    .select(KOLOM)
    .maybeSingle();
  if (error || !data) return null;
  return keDetail(data as BarisCache);
}
