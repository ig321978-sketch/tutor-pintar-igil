import { supabaseServer } from "@/lib/supabase";
import {
  kandidatKunciMateri,
  kunciMateriTutor,
  rapikanKunci,
} from "@/lib/kunci-siswa";
import { namaDepanSiswa } from "@/lib/nama-siswa";

export type IsiCacheMateri = {
  curriculum_view: string;
  global_best_view: string;
  sketsaKartu: string;
  svgCode: string;
  pertanyaan: string;
  kunciJawaban: string;
  motivasi: string;
  referensiUrl?: string;
};

const KOLOM_ISI_DASAR =
  "curriculum_view, global_best_view, sketsa_kartu, svg_code, pertanyaan, kunci_jawaban, motivasi";
const KOLOM_ISI_CACHE = `${KOLOM_ISI_DASAR}, referensi_url`;

function kolomHilang(error: { message?: string } | null, kolom: string): boolean {
  return Boolean(error?.message && error.message.includes(kolom));
}

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
      referensiUrl: data.referensiUrl ?? "",
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

function sebagaiBarisCache(data: unknown): {
  curriculum_view?: string | null;
  global_best_view?: string | null;
  sketsa_kartu?: string | null;
  svg_code?: string | null;
  pertanyaan?: string | null;
  kunci_jawaban?: string | null;
  motivasi?: string | null;
  referensi_url?: string | null;
  kunci?: string | null;
  topic_id?: string | null;
  kelas?: string | null;
  mapel?: string | null;
  materi?: string | null;
  model_sumber?: string | null;
  is_draft?: boolean | null;
  audio_siap?: boolean | null;
  updated_at?: string | null;
} | null {
  if (!data || typeof data !== "object") return null;
  return data as {
    curriculum_view?: string | null;
    global_best_view?: string | null;
    sketsa_kartu?: string | null;
    svg_code?: string | null;
    pertanyaan?: string | null;
    kunci_jawaban?: string | null;
    motivasi?: string | null;
    referensi_url?: string | null;
    kunci?: string | null;
    topic_id?: string | null;
    kelas?: string | null;
    mapel?: string | null;
    materi?: string | null;
    model_sumber?: string | null;
    is_draft?: boolean | null;
    audio_siap?: boolean | null;
    updated_at?: string | null;
  };
}

function barisKeIsi(data: unknown): IsiCacheMateri | null {
  const baris = sebagaiBarisCache(data);
  if (!baris?.curriculum_view || !baris.global_best_view) return null;
  return {
    curriculum_view: baris.curriculum_view,
    global_best_view: baris.global_best_view,
    sketsaKartu: baris.sketsa_kartu ?? "",
    svgCode: baris.svg_code ?? "",
    pertanyaan: baris.pertanyaan ?? "",
    kunciJawaban: baris.kunci_jawaban ?? "",
    motivasi: baris.motivasi ?? "",
    referensiUrl: baris.referensi_url ?? "",
  };
}

export async function ambilCacheMateri(
  kelas: string,
  mapel: string,
  materi: string,
): Promise<IsiCacheMateri | null> {
  const supabase = supabaseServer();
  if (!supabase) {
    console.warn("[cache-materi] supabase belum terhubung; cache dilewati.");
    return null;
  }
  const kandidat = kandidatKunciMateri(kelas, mapel, materi);
  let kolom = KOLOM_ISI_CACHE;

  for (const topicId of kandidat) {
    let lewatTopic = await supabase
      .from("cache_materi_tutor")
      .select(kolom)
      .eq("topic_id", topicId)
      .maybeSingle();
    if (kolomHilang(lewatTopic.error, "referensi_url")) {
      kolom = KOLOM_ISI_DASAR;
      lewatTopic = await supabase
        .from("cache_materi_tutor")
        .select(kolom)
        .eq("topic_id", topicId)
        .maybeSingle();
    }
    const isiTopic = barisKeIsi(lewatTopic.data);
    if (isiTopic) return isiTopic;

    const lewatKunci = await supabase
      .from("cache_materi_tutor")
      .select(kolom)
      .eq("kunci", topicId)
      .maybeSingle();
    const isiKunci = barisKeIsi(lewatKunci.data);
    if (isiKunci) return isiKunci;
    if (lewatKunci.error) console.warn("[cache-materi] tabel:", lewatKunci.error.message);
    if (lewatTopic.error) {
      console.warn("[cache-materi] topic_id:", lewatTopic.error.message);
    }
  }

  return null;
}

export async function simpanCacheMateri(
  kelas: string,
  mapel: string,
  materi: string,
  nama: string,
  isi: IsiCacheMateri,
): Promise<boolean> {
  const supabase = supabaseServer();
  if (!supabase) {
    console.warn("[cache-materi] supabase belum terhubung; generate tidak tersimpan.");
    return false;
  }
  const sudahAda = await ambilCacheMateri(kelas, mapel, materi);
  if (sudahAda) return true;

  const topicId = topicIdMateri(kelas, mapel, materi);
  const payload: IsiCacheMateri = {
    curriculum_view: anonimkanNama(isi.curriculum_view, nama),
    global_best_view: anonimkanNama(isi.global_best_view, nama),
    sketsaKartu: isi.sketsaKartu,
    svgCode: isi.svgCode,
    pertanyaan: anonimkanNama(isi.pertanyaan, nama),
    kunciJawaban: isi.kunciJawaban,
    motivasi: isi.motivasi,
    referensiUrl: isi.referensiUrl ?? "",
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
    referensi_url: payload.referensiUrl || null,
    updated_at: new Date().toISOString(),
  };
  const lengkap = {
    ...dasar,
    topic_id: topicId,
    is_draft: true,
    model_sumber: "gemini-3.1-pro",
    audio_siap: false,
  };
  let barisLengkap: Record<string, unknown> = lengkap;
  let barisDasar: Record<string, unknown> = dasar;
  let pertama = await supabase.from("cache_materi_tutor").insert(barisLengkap);
  if (kolomHilang(pertama.error, "referensi_url")) {
    const { referensi_url: _buang, ...tanpaReferensiLengkap } = barisLengkap;
    const { referensi_url: _buangDasar, ...tanpaReferensiDasar } = barisDasar;
    void _buang;
    void _buangDasar;
    barisLengkap = tanpaReferensiLengkap;
    barisDasar = tanpaReferensiDasar;
    pertama = await supabase.from("cache_materi_tutor").insert(barisLengkap);
  }
  if (!pertama.error) return true;
  if (pertama.error.code === "23505") return true;
  console.warn("[cache-materi] simpan tabel:", pertama.error.message);
  const upsert = await supabase
    .from("cache_materi_tutor")
    .upsert(barisLengkap, { onConflict: "kunci" });
  if (!upsert.error) return true;
  console.warn("[cache-materi] upsert:", upsert.error.message);
  const ulang = await supabase.from("cache_materi_tutor").insert(barisDasar);
  if (!ulang.error || ulang.error.code === "23505") return true;
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
    return false;
  }
  return true;
}

export type RingkasCacheMateri = {
  kunci: string;
  topicId: string;
  kelas: string;
  mapel: string;
  materi: string;
  modelSumber: string;
  isDraft: boolean;
  audioSiap: boolean;
  updatedAt: string;
};

export type DetailCacheMateri = RingkasCacheMateri & IsiCacheMateri;

function barisKeRingkas(data: {
  kunci?: string | null;
  topic_id?: string | null;
  kelas?: string | null;
  mapel?: string | null;
  materi?: string | null;
  model_sumber?: string | null;
  is_draft?: boolean | null;
  audio_siap?: boolean | null;
  updated_at?: string | null;
}): RingkasCacheMateri | null {
  const kunci = data.kunci || data.topic_id;
  if (!kunci) return null;
  return {
    kunci,
    topicId: data.topic_id || kunci,
    kelas: data.kelas ?? "",
    mapel: data.mapel ?? "",
    materi: data.materi ?? "",
    modelSumber: data.model_sumber ?? "",
    isDraft: data.is_draft !== false,
    audioSiap: Boolean(data.audio_siap),
    updatedAt: data.updated_at ?? "",
  };
}

export async function muatDaftarCacheAdmin(): Promise<{
  siap: boolean;
  daftar: RingkasCacheMateri[];
  pesan: string;
}> {
  const supabase = supabaseServer();
  if (!supabase) {
    return {
      siap: false,
      daftar: [],
      pesan:
        "Supabase belum terhubung di server. Isi NEXT_PUBLIC_SUPABASE_URL dan NEXT_PUBLIC_SUPABASE_ANON_KEY (atau SUPABASE_SERVICE_ROLE_KEY) di Vercel, lalu redeploy.",
    };
  }
  const { data, error } = await supabase
    .from("cache_materi_tutor")
    .select(
      "kunci, topic_id, kelas, mapel, materi, model_sumber, is_draft, audio_siap, updated_at",
    )
    .order("updated_at", { ascending: false })
    .limit(200);
  if (error) {
    console.warn("[cache-materi] daftar:", error.message);
    return {
      siap: false,
      daftar: [],
      pesan: `Tabel cache_materi_tutor tidak bisa dibaca: ${error.message}`,
    };
  }
  return {
    siap: true,
    daftar: (data ?? [])
      .map((item) => barisKeRingkas(item))
      .filter((item): item is RingkasCacheMateri => item !== null),
    pesan: "",
  };
}

export async function daftarCacheMateri(): Promise<RingkasCacheMateri[]> {
  const hasil = await muatDaftarCacheAdmin();
  return hasil.daftar;
}

function barisKeIsiAdmin(data: unknown): IsiCacheMateri | null {
  const baris = sebagaiBarisCache(data);
  if (!baris) return null;
  return {
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

export function pecahKunciMateri(kunci: string): {
  kelas: string;
  mapel: string;
  materi: string;
} | null {
  const bagian = kunci.split("|").map((nilai) => nilai.trim()).filter(Boolean);
  if (bagian.length < 3) return null;
  const materi =
    bagian.length >= 4 ? bagian.slice(2, -1).join("|") : bagian[2];
  if (!materi) return null;
  return { kelas: bagian[0], mapel: bagian[1], materi };
}

export async function ambilDetailCacheMateri(
  kunci: string,
): Promise<DetailCacheMateri | null> {
  const supabase = supabaseServer();
  if (!supabase) return null;
  let kolom =
    "kunci, topic_id, kelas, mapel, materi, model_sumber, is_draft, audio_siap, updated_at, curriculum_view, global_best_view, sketsa_kartu, svg_code, pertanyaan, kunci_jawaban, motivasi, referensi_url";
  let lewatTopic = await supabase
    .from("cache_materi_tutor")
    .select(kolom)
    .eq("topic_id", kunci)
    .maybeSingle();
  if (kolomHilang(lewatTopic.error, "referensi_url")) {
    kolom =
      "kunci, topic_id, kelas, mapel, materi, model_sumber, is_draft, audio_siap, updated_at, curriculum_view, global_best_view, sketsa_kartu, svg_code, pertanyaan, kunci_jawaban, motivasi";
    lewatTopic = await supabase
      .from("cache_materi_tutor")
      .select(kolom)
      .eq("topic_id", kunci)
      .maybeSingle();
  }
  const lewatKunci = lewatTopic.data
    ? null
    : await supabase
        .from("cache_materi_tutor")
        .select(kolom)
        .eq("kunci", kunci)
        .maybeSingle();
  const data = lewatTopic.data ?? lewatKunci?.data ?? null;
  const isi = barisKeIsiAdmin(data);
  const ringkas = barisKeRingkas(sebagaiBarisCache(data) ?? {});
  if (isi && ringkas) return { ...ringkas, ...isi };
  return null;
}

export async function perbaruiCacheMateri(
  kunci: string,
  isi: IsiCacheMateri,
): Promise<DetailCacheMateri | null> {
  const supabase = supabaseServer();
  if (!supabase) return null;
  let payload: Record<string, unknown> = {
    curriculum_view: isi.curriculum_view,
    global_best_view: isi.global_best_view,
    sketsa_kartu: isi.sketsaKartu,
    svg_code: isi.svgCode,
    pertanyaan: isi.pertanyaan,
    kunci_jawaban: isi.kunciJawaban,
    motivasi: isi.motivasi,
    referensi_url: isi.referensiUrl ?? "",
    is_draft: true,
    audio_siap: false,
    updated_at: new Date().toISOString(),
  };
  let lewatKunci = await supabase
    .from("cache_materi_tutor")
    .update(payload)
    .eq("kunci", kunci)
    .select("kunci");
  if (kolomHilang(lewatKunci.error, "referensi_url")) {
    const { referensi_url: _buang, ...tanpaReferensi } = payload;
    void _buang;
    payload = tanpaReferensi;
    lewatKunci = await supabase
      .from("cache_materi_tutor")
      .update(payload)
      .eq("kunci", kunci)
      .select("kunci");
  }
  if (lewatKunci.error) {
    console.warn("[cache-materi] perbarui:", lewatKunci.error.message);
    return null;
  }
  if (!lewatKunci.data?.length) {
    const lewatTopic = await supabase
      .from("cache_materi_tutor")
      .update(payload)
      .eq("topic_id", kunci)
      .select("kunci");
    if (lewatTopic.error) {
      console.warn("[cache-materi] perbarui topic:", lewatTopic.error.message);
      return null;
    }
    if (!lewatTopic.data?.length) return null;
  }
  return ambilDetailCacheMateri(kunci);
}

export async function hapusCacheMateri(kunci: string): Promise<boolean> {
  const supabase = supabaseServer();
  if (!supabase) return false;
  const lewatKunci = await supabase
    .from("cache_materi_tutor")
    .delete()
    .eq("kunci", kunci);
  const lewatTopic = await supabase
    .from("cache_materi_tutor")
    .delete()
    .eq("topic_id", kunci);
  if (lewatKunci.error) {
    console.warn("[cache-materi] hapus:", lewatKunci.error.message);
  }
  if (lewatTopic.error) {
    console.warn("[cache-materi] hapus topic:", lewatTopic.error.message);
  }
  return !lewatKunci.error && !lewatTopic.error;
}

export async function tandaiAudioModulSiap(
  _kelas?: string,
  _mapel?: string,
  _materi?: string,
): Promise<void> {
  return;
}
