import { supabaseServer } from "@/lib/supabase";
import { kunciMateriTutor } from "@/lib/kunci-siswa";
import { namaDepanSiswa } from "@/lib/nama-siswa";

export type IsiCacheMateri = {
  curriculum_view: string;
  global_best_view: string;
  sketsaKartu: string;
  svgCode: string;
  pertanyaan: string;
  kunciJawaban: string;
  motivasi: string;
};

function anonimkanNama(teks: string, nama: string): string {
  const depan = namaDepanSiswa(nama);
  if (depan.length < 2) return teks;
  const aman = depan.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return teks.replace(new RegExp(`\\b${aman}\\b`, "gi"), "kamu");
}

function dariBarisCadangan(ide: unknown): IsiCacheMateri | null {
  if (typeof ide !== "string" || !ide.trim()) return null;
  try {
    const data = JSON.parse(ide) as Partial<IsiCacheMateri>;
    if (!data.curriculum_view || !data.global_best_view) return null;
    return {
      curriculum_view: data.curriculum_view,
      global_best_view: data.global_best_view,
      sketsaKartu: data.sketsaKartu ?? "",
      svgCode: data.svgCode ?? "",
      pertanyaan: data.pertanyaan ?? "",
      kunciJawaban: data.kunciJawaban ?? "",
      motivasi: data.motivasi ?? "",
    };
  } catch {
    return null;
  }
}

export function topicIdMateri(
  kelas: string,
  mapel: string,
  materi: string,
): string {
  return kunciMateriTutor(kelas, mapel, materi);
}

function barisKeIsi(data: {
  curriculum_view?: string | null;
  global_best_view?: string | null;
  sketsa_kartu?: string | null;
  svg_code?: string | null;
  pertanyaan?: string | null;
  kunci_jawaban?: string | null;
  motivasi?: string | null;
} | null): IsiCacheMateri | null {
  if (!data?.curriculum_view || !data.global_best_view) return null;
  return {
    curriculum_view: data.curriculum_view,
    global_best_view: data.global_best_view,
    sketsaKartu: data.sketsa_kartu ?? "",
    svgCode: data.svg_code ?? "",
    pertanyaan: data.pertanyaan ?? "",
    kunciJawaban: data.kunci_jawaban ?? "",
    motivasi: data.motivasi ?? "",
  };
}

export async function ambilCacheMateri(
  kelas: string,
  mapel: string,
  materi: string,
): Promise<IsiCacheMateri | null> {
  const supabase = supabaseServer();
  if (!supabase) return null;
  const topicId = topicIdMateri(kelas, mapel, materi);
  const kolom =
    "curriculum_view, global_best_view, sketsa_kartu, svg_code, pertanyaan, kunci_jawaban, motivasi";

  const lewatTopic = await supabase
    .from("cache_materi_tutor")
    .select(kolom)
    .eq("topic_id", topicId)
    .maybeSingle();
  const isiTopic = barisKeIsi(lewatTopic.data);
  if (isiTopic) return isiTopic;

  const { data, error } = await supabase
    .from("cache_materi_tutor")
    .select(kolom)
    .eq("kunci", topicId)
    .maybeSingle();
  const isiKunci = barisKeIsi(data);
  if (isiKunci) return isiKunci;
  if (error) console.warn("[cache-materi] tabel:", error.message);
  if (lewatTopic.error) {
    console.warn("[cache-materi] topic_id:", lewatTopic.error.message);
  }

  const cadangan = await supabase
    .from("penambangan_igil")
    .select("ide")
    .eq("status", "CACHE_MATERI")
    .eq("kelas", kelas)
    .eq("mapel", mapel)
    .eq("materi", materi)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (cadangan.error) {
    console.warn("[cache-materi] cadangan:", cadangan.error.message);
    return null;
  }
  return dariBarisCadangan(cadangan.data?.ide);
}

export async function simpanCacheMateri(
  kelas: string,
  mapel: string,
  materi: string,
  nama: string,
  isi: IsiCacheMateri,
): Promise<void> {
  const supabase = supabaseServer();
  if (!supabase) return;
  const topicId = topicIdMateri(kelas, mapel, materi);
  const payload: IsiCacheMateri = {
    curriculum_view: anonimkanNama(isi.curriculum_view, nama),
    global_best_view: anonimkanNama(isi.global_best_view, nama),
    sketsaKartu: isi.sketsaKartu,
    svgCode: isi.svgCode,
    pertanyaan: anonimkanNama(isi.pertanyaan, nama),
    kunciJawaban: isi.kunciJawaban,
    motivasi: isi.motivasi,
  };
  const dasar = {
    kunci: topicId,
    kelas,
    mapel,
    materi,
    curriculum_view: payload.curriculum_view,
    global_best_view: payload.global_best_view,
    sketsa_kartu: payload.sketsaKartu,
    svg_code: payload.svgCode,
    pertanyaan: payload.pertanyaan,
    kunci_jawaban: payload.kunciJawaban,
    motivasi: payload.motivasi,
    updated_at: new Date().toISOString(),
  };
  const lengkap = {
    ...dasar,
    topic_id: topicId,
    is_draft: true,
    model_sumber: "gemini-3.1-pro",
    audio_siap: false,
  };
  const { error } = await supabase
    .from("cache_materi_tutor")
    .upsert(lengkap, { onConflict: "kunci" });
  if (!error) return;
  console.warn("[cache-materi] simpan tabel:", error.message);
  const ulang = await supabase
    .from("cache_materi_tutor")
    .upsert(dasar, { onConflict: "kunci" });
  if (!ulang.error) return;
  console.warn("[cache-materi] simpan ulang:", ulang.error.message);
  const cadangan = await supabase.from("penambangan_igil").insert({
    nama: "_cache",
    kelas,
    mapel,
    materi,
    ide: JSON.stringify(payload),
    token: 0,
    status: "CACHE_MATERI",
    umpan_balik: topicId,
  });
  if (cadangan.error) {
    console.warn("[cache-materi] simpan cadangan:", cadangan.error.message);
  }
}

export async function tandaiAudioModulSiap(
  kelas: string,
  mapel: string,
  materi: string,
): Promise<void> {
  const supabase = supabaseServer();
  if (!supabase) return;
  const topicId = topicIdMateri(kelas, mapel, materi);
  const { error } = await supabase
    .from("cache_materi_tutor")
    .update({ audio_siap: true, updated_at: new Date().toISOString() })
    .eq("kunci", topicId);
  if (error) console.warn("[cache-materi] audio_siap:", error.message);
}
