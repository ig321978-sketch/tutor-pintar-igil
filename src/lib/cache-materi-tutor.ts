import { revalidateTag, unstable_cache } from "next/cache";
import { supabaseServer } from "@/lib/supabase";
import {
  kandidatKunciMateri,
  kunciMapelTutor,
  kunciMateriTutor,
  rapikanKunci,
} from "@/lib/kunci-siswa";
import { namaDepanSiswa } from "@/lib/nama-siswa";
import { naskahLatihanSaja, pecahBankSoal, kunciLatihanSaja } from "@/lib/kuis";
import { buangTeksSampah } from "@/lib/validasi-naskah-ai";

export const PESAN_MATERI_TERKUNCI =
  "Materi terkunci dan tidak dapat diubah";

export class GalatMateriTerkunci extends Error {
  constructor() {
    super(PESAN_MATERI_TERKUNCI);
    this.name = "GalatMateriTerkunci";
  }
}

export function adalahGalatMateriTerkunci(error: unknown): boolean {
  return (
    error instanceof GalatMateriTerkunci ||
    (error instanceof Error && error.message === PESAN_MATERI_TERKUNCI)
  );
}

export function tagCacheMateriTerkunci(topicId: string): string {
  return `materi-terkunci:${topicId}`;
}

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

export type OpsiSimpanCacheMateri = {
  tulisUlangSetelahHapus?: boolean;
};

const STATUS_CACHE_MATERI = "CACHE_MATERI";
const STATUS_CACHE_HAPUS = "CACHE_HAPUS";

const KOLOM_ISI_DASAR =
  "curriculum_view, global_best_view, sketsa_kartu, svg_code, pertanyaan, kunci_jawaban, motivasi";
const KOLOM_ISI_CACHE = `${KOLOM_ISI_DASAR}, referensi_url`;

function tabelBelumAda(error: { message?: string; code?: string } | null): boolean {
  const pesan = error?.message ?? "";
  return (
    error?.code === "42P01" ||
    /does not exist|schema cache|could not find the table/i.test(pesan)
  );
}

export function daftarKunciDariKunciBaris(kunci: string): string[] {
  const set = new Set<string>();
  const mentah = kunci.trim();
  if (mentah) set.add(mentah);
  const pecah = pecahKunciMateri(mentah);
  if (pecah) {
    for (const id of kandidatKunciMateri(pecah.kelas, pecah.mapel, pecah.materi)) {
      set.add(id);
    }
  }
  return [...set];
}

async function tandaiCacheModulHapus(
  kunciDaftar: string[],
  meta?: { kelas: string; mapel: string; materi: string } | null,
): Promise<void> {
  const supabase = supabaseServer();
  if (!supabase || kunciDaftar.length === 0) return;
  const sekarang = new Date().toISOString();
  const baris = kunciDaftar.map((kunci) => ({
    kunci,
    kelas: meta?.kelas ?? "",
    mapel: meta?.mapel ?? "",
    materi: meta?.materi ?? "",
    dihapus_at: sekarang,
  }));
  const utama = await supabase
    .from("cache_modul_hapus")
    .upsert(baris, { onConflict: "kunci" });
  if (!utama.error) return;
  if (!tabelBelumAda(utama.error)) {
    console.warn("[cache-materi] tanda hapus:", utama.error.message);
  }
  for (const kunci of kunciDaftar) {
    const cadangan = await supabase.from("penambangan_igil").insert({
      nama: "_hapus",
      kelas: meta?.kelas ?? "",
      mapel: meta?.mapel ?? "",
      materi: meta?.materi ?? "",
      ide: "",
      token: 0,
      status: STATUS_CACHE_HAPUS,
      umpan_balik: kunci,
    });
    if (cadangan.error) {
      console.warn("[cache-materi] tanda hapus cadangan:", cadangan.error.message);
    }
  }
}

async function hapusTandaCacheModulHapus(kunciDaftar: string[]): Promise<void> {
  const supabase = supabaseServer();
  if (!supabase || kunciDaftar.length === 0) return;
  const utama = await supabase
    .from("cache_modul_hapus")
    .delete()
    .in("kunci", kunciDaftar);
  if (utama.error && !tabelBelumAda(utama.error)) {
    console.warn("[cache-materi] buang tanda hapus:", utama.error.message);
  }
  const cadangan = await supabase
    .from("penambangan_igil")
    .delete()
    .eq("status", STATUS_CACHE_HAPUS)
    .in("umpan_balik", kunciDaftar);
  if (cadangan.error) {
    console.warn("[cache-materi] buang tanda hapus cadangan:", cadangan.error.message);
  }
}

export async function cacheModulSedangDihapus(
  kelas: string,
  mapel: string,
  materi: string,
): Promise<boolean> {
  const supabase = supabaseServer();
  if (!supabase) return false;
  const kunciDaftar = kandidatKunciMateri(kelas, mapel, materi);
  const utama = await supabase
    .from("cache_modul_hapus")
    .select("kunci")
    .in("kunci", kunciDaftar)
    .limit(1);
  if (utama.data && utama.data.length > 0) return true;
  if (utama.error && !tabelBelumAda(utama.error)) {
    console.warn("[cache-materi] cek hapus:", utama.error.message);
  }
  const cadangan = await supabase
    .from("penambangan_igil")
    .select("id")
    .eq("status", STATUS_CACHE_HAPUS)
    .in("umpan_balik", kunciDaftar)
    .limit(1);
  return Boolean(cadangan.data && cadangan.data.length > 0);
}

function kolomHilang(error: { message?: string } | null, kolom: string): boolean {
  return Boolean(error?.message && error.message.includes(kolom));
}

function anonimkanNama(teks: string, nama: string): string {
  const depan = namaDepanSiswa(nama);
  if (depan.length < 2) return teks;
  const aman = depan.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return teks.replace(new RegExp(`\\b${aman}\\b`, "gi"), "kamu");
}

function isiCacheKosong(): IsiCacheMateri {
  return {
    curriculum_view: "",
    global_best_view: "",
    sketsaKartu: "",
    svgCode: "",
    pertanyaan: "",
    kunciJawaban: "",
    motivasi: "",
    referensiUrl: "",
  };
}

export function isiCachePunyaNaskah(isi: IsiCacheMateri): boolean {
  return Boolean(
    isi.curriculum_view.trim() ||
      isi.global_best_view.trim() ||
      isi.pertanyaan.trim(),
  );
}

function waktuBaris(nilai?: string | null): number {
  const t = Date.parse(nilai ?? "");
  return Number.isFinite(t) ? t : 0;
}

function idBarisCache(baris: {
  kunci?: string | null;
  topic_id?: string | null;
}): string {
  return (baris.kunci || baris.topic_id || "").trim();
}

function mapelSetara(a: string, b: string): boolean {
  const ka = kunciMapelTutor(a);
  const kb = kunciMapelTutor(b);
  if (ka === kb) return true;
  const namaA = new Set(
    kandidatKunciMateri("x", a || "x", "y").map((k) => k.split("|")[1]),
  );
  return namaA.has(rapikanKunci(b)) || namaA.has(kb);
}

function materiSetara(a: string, b: string): boolean {
  const ra = rapikanKunci(a);
  const rb = rapikanKunci(b);
  if (!ra || !rb) return false;
  if (ra === rb) return true;
  const pendek = ra.length <= rb.length ? ra : rb;
  const panjang = ra.length <= rb.length ? rb : ra;
  if (pendek.length < 16) return false;
  return panjang.includes(pendek);
}

function naskahLamaAman(
  lama: IsiCacheMateri,
  payload: IsiCacheMateri,
): boolean {
  if (
    lama.curriculum_view.trim() &&
    lama.curriculum_view !== payload.curriculum_view
  ) {
    return false;
  }
  if (
    lama.global_best_view.trim() &&
    lama.global_best_view !== payload.global_best_view
  ) {
    return false;
  }
  return true;
}

function revalidateSemuaTagMateri(
  kelas?: string,
  mapel?: string,
  materi?: string,
  topicId?: string,
) {
  if (topicId) revalidateTag(tagCacheMateriTerkunci(topicId), "max");
  if (!kelas || !mapel || !materi) return;
  for (const id of kandidatKunciMateri(kelas, mapel, materi)) {
    revalidateTag(tagCacheMateriTerkunci(id), "max");
  }
}

export function gabungIsiCache(
  lama: IsiCacheMateri | null,
  baru: Partial<IsiCacheMateri>,
  tulisUlang = false,
): IsiCacheMateri {
  const dasar = lama ?? isiCacheKosong();
  const pilih = (ada: string, masuk?: string) => {
    const n = buangTeksSampah(masuk);
    if (!n) return ada;
    if (tulisUlang || !ada.trim()) return n;
    return ada;
  };
  return {
    curriculum_view: pilih(dasar.curriculum_view, baru.curriculum_view),
    global_best_view: pilih(dasar.global_best_view, baru.global_best_view),
    sketsaKartu: pilih(dasar.sketsaKartu, baru.sketsaKartu),
    svgCode: pilih(dasar.svgCode, baru.svgCode),
    pertanyaan: pilih(dasar.pertanyaan, baru.pertanyaan),
    kunciJawaban: pilih(dasar.kunciJawaban, baru.kunciJawaban),
    motivasi: pilih(dasar.motivasi, baru.motivasi),
    referensiUrl: pilih(dasar.referensiUrl ?? "", baru.referensiUrl),
  };
}

function dariBarisCadangan(ide: unknown): IsiCacheMateri | null {
  if (typeof ide !== "string" || !ide.trim()) return null;
  try {
    const data = JSON.parse(ide) as Partial<IsiCacheMateri>;
    const isi = gabungIsiCache(null, {
      curriculum_view: data.curriculum_view ?? "",
      global_best_view: data.global_best_view ?? "",
      sketsaKartu: data.sketsaKartu ?? "",
      svgCode: data.svgCode ?? "",
      pertanyaan: data.pertanyaan ?? "",
      kunciJawaban: data.kunciJawaban ?? "",
      motivasi: data.motivasi ?? "",
      referensiUrl: data.referensiUrl ?? "",
    });
    return isiCachePunyaNaskah(isi) ? isi : null;
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

async function selectBarisCache(
  buat: (
    kolom: string,
  ) => PromiseLike<{ data: unknown[] | null; error: { message?: string } | null }>,
): Promise<unknown[]> {
  let kolom = `${KOLOM_ISI_CACHE}, kunci, topic_id, kelas, mapel, materi, updated_at, is_locked`;
  let hasil = await buat(kolom);
  if (kolomHilang(hasil.error, "referensi_url")) {
    kolom = `${KOLOM_ISI_DASAR}, kunci, topic_id, kelas, mapel, materi, updated_at, is_locked`;
    hasil = await buat(kolom);
  }
  if (kolomHilang(hasil.error, "is_locked")) {
    kolom = kolom.replace(", is_locked", "");
    hasil = await buat(kolom);
  }
  if (hasil.error) {
    console.warn("[cache-materi] baca baris:", hasil.error.message);
    return [];
  }
  return hasil.data ?? [];
}

async function ambilSemuaBarisCache(
  kelas: string,
  mapel: string,
  materi: string,
): Promise<NonNullable<ReturnType<typeof sebagaiBarisCache>>[]> {
  const supabase = supabaseServer();
  if (!supabase) return [];
  const kandidat = kandidatKunciMateri(kelas, mapel, materi);
  const kumpulan = new Map<
    string,
    NonNullable<ReturnType<typeof sebagaiBarisCache>>
  >();
  const masuk = (data: unknown) => {
    const daftar = Array.isArray(data) ? data : data ? [data] : [];
    for (const item of daftar) {
      const baris = sebagaiBarisCache(item);
      if (!baris) continue;
      const id =
        idBarisCache(baris) ||
        `anon:${(baris.curriculum_view ?? "").slice(0, 24)}`;
      const lama = kumpulan.get(id);
      if (!lama || waktuBaris(baris.updated_at) >= waktuBaris(lama.updated_at)) {
        kumpulan.set(id, baris);
      }
    }
  };

  masuk(
    await selectBarisCache((kolom) =>
      supabase.from("cache_materi_tutor").select(kolom).in("topic_id", kandidat),
    ),
  );
  masuk(
    await selectBarisCache((kolom) =>
      supabase.from("cache_materi_tutor").select(kolom).in("kunci", kandidat),
    ),
  );
  const potongMateri = materi.trim().replace(/[%_]/g, "").slice(0, 48);
  if (potongMateri.length >= 8) {
    const identitas = await selectBarisCache((kolom) =>
      supabase
        .from("cache_materi_tutor")
        .select(kolom)
        .ilike("kelas", kelas.trim())
        .ilike("materi", `%${potongMateri}%`),
    );
    masuk(
      identitas.filter((item) => {
        const baris = sebagaiBarisCache(item);
        return (
          Boolean(baris) &&
          mapelSetara(baris?.mapel ?? "", mapel) &&
          materiSetara(baris?.materi ?? "", materi)
        );
      }),
    );
  }

  return [...kumpulan.values()].sort(
    (a, b) => waktuBaris(b.updated_at) - waktuBaris(a.updated_at),
  );
}

async function bacaStatusKunciDariBaris(
  kelas: string,
  mapel: string,
  materi: string,
): Promise<boolean> {
  const semua = await ambilSemuaBarisCache(kelas, mapel, materi);
  return semua.some((row) => Boolean(row.is_locked));
}

export async function materiSedangTerkunci(
  kelas: string,
  mapel: string,
  materi: string,
): Promise<boolean> {
  return bacaStatusKunciDariBaris(kelas, mapel, materi);
}

export async function materiTerkunciMenurutKunci(
  kunci: string,
): Promise<boolean> {
  const supabase = supabaseServer();
  if (!supabase || !kunci.trim()) return false;
  let lewatTopic = await supabase
    .from("cache_materi_tutor")
    .select("is_locked")
    .eq("topic_id", kunci)
    .maybeSingle();
  if (kolomHilang(lewatTopic.error, "is_locked")) return false;
  if (lewatTopic.data) return Boolean(lewatTopic.data.is_locked);
  const lewatKunci = await supabase
    .from("cache_materi_tutor")
    .select("is_locked")
    .eq("kunci", kunci)
    .maybeSingle();
  if (kolomHilang(lewatKunci.error, "is_locked")) return false;
  return Boolean(lewatKunci.data?.is_locked);
}

export async function aturKunciNaskahMateri(
  kunci: string,
  terkunci: boolean,
): Promise<DetailCacheMateri | null> {
  const supabase = supabaseServer();
  if (!supabase) return null;
  const payload = {
    is_locked: terkunci,
    updated_at: new Date().toISOString(),
  };
  let lewatKunci = await supabase
    .from("cache_materi_tutor")
    .update(payload)
    .eq("kunci", kunci)
    .select("kunci");
  if (kolomHilang(lewatKunci.error, "is_locked")) {
    console.warn("[cache-materi] kolom is_locked belum ada. Jalankan supabase/cache-materi-tutor-is-locked.sql");
    return null;
  }
  if (lewatKunci.error) {
    console.warn("[cache-materi] kunci naskah:", lewatKunci.error.message);
    return null;
  }
  if (!lewatKunci.data?.length) {
    const lewatTopic = await supabase
      .from("cache_materi_tutor")
      .update(payload)
      .eq("topic_id", kunci)
      .select("kunci");
    if (lewatTopic.error) {
      console.warn("[cache-materi] kunci naskah topic:", lewatTopic.error.message);
      return null;
    }
    if (!lewatTopic.data?.length) return null;
  }
  const detail = await ambilDetailCacheMateri(kunci);
  if (detail?.kelas && detail.mapel && detail.materi) {
    const semua = await ambilSemuaBarisCache(
      detail.kelas,
      detail.mapel,
      detail.materi,
    );
    for (const row of semua) {
      const id = idBarisCache(row);
      if (!id || id === kunci) continue;
      await supabase
        .from("cache_materi_tutor")
        .update(payload)
        .eq("kunci", id);
      await supabase
        .from("cache_materi_tutor")
        .update(payload)
        .eq("topic_id", id);
    }
    revalidateSemuaTagMateri(
      detail.kelas,
      detail.mapel,
      detail.materi,
      detail.topicId || kunci,
    );
  } else {
    revalidateTag(tagCacheMateriTerkunci(detail?.topicId || kunci), "max");
  }
  return detail;
}

export async function ambilCacheMateriUntukSiswa(
  kelas: string,
  mapel: string,
  materi: string,
): Promise<IsiCacheMateri | null> {
  const terkunci = await bacaStatusKunciDariBaris(kelas, mapel, materi);
  if (!terkunci) return ambilCacheMateri(kelas, mapel, materi);
  const topicId = topicIdMateri(kelas, mapel, materi);
  const tags = kandidatKunciMateri(kelas, mapel, materi).map((id) =>
    tagCacheMateriTerkunci(id),
  );
  return unstable_cache(
    async () => ambilCacheMateri(kelas, mapel, materi),
    ["modul-siswa-terkunci", topicId],
    { revalidate: 3600, tags },
  )();
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
  is_locked?: boolean | null;
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
    is_locked?: boolean | null;
    audio_siap?: boolean | null;
    updated_at?: string | null;
  };
}

function barisKeIsi(data: unknown): IsiCacheMateri | null {
  const isi = barisKeIsiAdmin(data);
  if (!isi || !isiCachePunyaNaskah(isi)) return null;
  return isi;
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
  if (await cacheModulSedangDihapus(kelas, mapel, materi)) return null;
  const semua = await ambilSemuaBarisCache(kelas, mapel, materi);
  for (const row of semua) {
    const isi = barisKeIsi(row);
    if (isi) return isi;
  }
  return null;
}

export async function gabungCacheMateri(
  kelas: string,
  mapel: string,
  materi: string,
  nama: string,
  isi: Partial<IsiCacheMateri>,
  opsi: OpsiSimpanCacheMateri = {},
): Promise<boolean> {
  return simpanCacheMateri(kelas, mapel, materi, nama, gabungIsiCache(null, isi), opsi);
}

export async function simpanCacheMateri(
  kelas: string,
  mapel: string,
  materi: string,
  nama: string,
  isi: IsiCacheMateri,
  opsi: OpsiSimpanCacheMateri = {},
): Promise<boolean> {
  const supabase = supabaseServer();
  if (!supabase) {
    console.warn("[cache-materi] supabase belum terhubung; generate tidak tersimpan.");
    return false;
  }
  const kunciDaftar = kandidatKunciMateri(kelas, mapel, materi);
  if (await bacaStatusKunciDariBaris(kelas, mapel, materi)) {
    throw new GalatMateriTerkunci();
  }
  const sedangDihapus = await cacheModulSedangDihapus(kelas, mapel, materi);
  if (sedangDihapus && !opsi.tulisUlangSetelahHapus) {
    return true;
  }
  if (sedangDihapus && opsi.tulisUlangSetelahHapus) {
    await hapusTandaCacheModulHapus(kunciDaftar);
  }
  const masuk: IsiCacheMateri = {
    curriculum_view: anonimkanNama(isi.curriculum_view ?? "", nama),
    global_best_view: anonimkanNama(isi.global_best_view ?? "", nama),
    sketsaKartu: isi.sketsaKartu ?? "",
    svgCode: isi.svgCode ?? "",
    pertanyaan: naskahLatihanSaja(anonimkanNama(isi.pertanyaan ?? "", nama)),
    kunciJawaban: kunciLatihanSaja(isi.kunciJawaban ?? ""),
    motivasi: isi.motivasi ?? "",
    referensiUrl: isi.referensiUrl ?? "",
  };
  const semua = await ambilSemuaBarisCache(kelas, mapel, materi);
  const terbaru = semua.find((row) => {
    const isi = barisKeIsiAdmin(row);
    return isi && isiCachePunyaNaskah(isi);
  });
  const sudahAda = terbaru ? barisKeIsiAdmin(terbaru) : null;
  const kunciBaris = terbaru ? idBarisCache(terbaru) : "";
  const payload = gabungIsiCache(sudahAda, masuk, false);
  if (!isiCachePunyaNaskah(payload)) {
    console.warn("[cache-materi] naskah tidak utuh; tulis dilewati.");
    return false;
  }
  if (sudahAda && !naskahLamaAman(sudahAda, payload)) {
    console.warn("[cache-materi] naskah tersimpan dilindungi; tulis dilewati.");
    return true;
  }
  if (
    sudahAda &&
    sudahAda.curriculum_view === payload.curriculum_view &&
    sudahAda.global_best_view === payload.global_best_view &&
    sudahAda.sketsaKartu === payload.sketsaKartu &&
    sudahAda.pertanyaan === payload.pertanyaan &&
    sudahAda.kunciJawaban === payload.kunciJawaban
  ) {
    return true;
  }

  const topicId = topicIdMateri(kelas, mapel, materi);
  if (sudahAda) {
    if (kunciBaris) {
      const diperbarui = await perbaruiCacheMateri(kunciBaris, payload);
      if (diperbarui) return true;
    }
    console.warn("[cache-materi] naskah sudah ada; sisipan baris baru dilewati.");
    return true;
  }
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
  if (pertama.error.code === "23505") {
    const bentrok = await perbaruiCacheMateri(topicId, payload);
    if (bentrok) return true;
  }
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
    status: STATUS_CACHE_MATERI,
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
  isLocked: boolean;
  audioSiap: boolean;
  updatedAt: string;
  adaCacheMateri: boolean;
  jumlahLatihan: number;
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
  is_locked?: boolean | null;
  audio_siap?: boolean | null;
  updated_at?: string | null;
  curriculum_view?: string | null;
  pertanyaan?: string | null;
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
    isLocked: Boolean(data.is_locked),
    audioSiap: Boolean(data.audio_siap),
    updatedAt: data.updated_at ?? "",
    adaCacheMateri: Boolean((data.curriculum_view ?? "").trim()),
    jumlahLatihan: pecahBankSoal(data.pertanyaan ?? "").pilihanGanda.length,
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
  const kolomRingkas =
    "kunci, topic_id, kelas, mapel, materi, model_sumber, is_draft, is_locked, audio_siap, updated_at, curriculum_view, pertanyaan";
  const pertama = await supabase
    .from("cache_materi_tutor")
    .select(kolomRingkas)
    .order("updated_at", { ascending: false })
    .limit(200);
  const cadangan = kolomHilang(pertama.error, "is_locked")
    ? await supabase
        .from("cache_materi_tutor")
        .select(
          "kunci, topic_id, kelas, mapel, materi, model_sumber, is_draft, audio_siap, updated_at, curriculum_view, pertanyaan",
        )
        .order("updated_at", { ascending: false })
        .limit(200)
    : null;
  const data = cadangan?.data ?? pertama.data;
  const error = cadangan ? cadangan.error : pertama.error;
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
    "kunci, topic_id, kelas, mapel, materi, model_sumber, is_draft, is_locked, audio_siap, updated_at, curriculum_view, global_best_view, sketsa_kartu, svg_code, pertanyaan, kunci_jawaban, motivasi, referensi_url";
  let lewatTopic = await supabase
    .from("cache_materi_tutor")
    .select(kolom)
    .eq("topic_id", kunci)
    .maybeSingle();
  if (kolomHilang(lewatTopic.error, "is_locked")) {
    kolom = kolom.replace(", is_locked", "");
    lewatTopic = await supabase
      .from("cache_materi_tutor")
      .select(kolom)
      .eq("topic_id", kunci)
      .maybeSingle();
  }
  if (kolomHilang(lewatTopic.error, "referensi_url")) {
    kolom = kolom.replace(", referensi_url", "");
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
  if (await materiTerkunciMenurutKunci(kunci)) {
    throw new GalatMateriTerkunci();
  }
  const supabase = supabaseServer();
  if (!supabase) return null;
  let payload: Record<string, unknown> = {
    curriculum_view: isi.curriculum_view,
    global_best_view: isi.global_best_view,
    sketsa_kartu: isi.sketsaKartu,
    svg_code: isi.svgCode,
    pertanyaan: naskahLatihanSaja(isi.pertanyaan),
    kunci_jawaban: kunciLatihanSaja(isi.kunciJawaban),
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
  const detail = await ambilDetailCacheMateri(kunci);
  if (detail) {
    revalidateSemuaTagMateri(
      detail.kelas,
      detail.mapel,
      detail.materi,
      detail.topicId,
    );
  }
  return detail;
}

function payloadBarisDariIsi(
  kunci: string,
  meta: { kelas: string; mapel: string; materi: string },
  isi: IsiCacheMateri,
): Record<string, unknown> {
  return {
    kunci,
    topic_id: kunci,
    kelas: meta.kelas,
    mapel: meta.mapel,
    materi: meta.materi,
    curriculum_view: isi.curriculum_view,
    global_best_view: isi.global_best_view,
    sketsa_kartu: isi.sketsaKartu,
    svg_code: isi.svgCode,
    pertanyaan: naskahLatihanSaja(isi.pertanyaan),
    kunci_jawaban: kunciLatihanSaja(isi.kunciJawaban),
    motivasi: isi.motivasi,
    referensi_url: isi.referensiUrl ?? "",
    is_draft: true,
    audio_siap: false,
    updated_at: new Date().toISOString(),
  };
}

export async function perbaruiSuntinganAdmin(
  kunci: string,
  isi: IsiCacheMateri,
): Promise<DetailCacheMateri | null> {
  const utama = await perbaruiCacheMateri(kunci, isi);
  if (!utama) return null;
  if (!utama.kelas || !utama.mapel || !utama.materi) return utama;
  const supabase = supabaseServer();
  if (!supabase) return utama;
  const meta = {
    kelas: utama.kelas,
    mapel: utama.mapel,
    materi: utama.materi,
  };
  const semua = await ambilSemuaBarisCache(meta.kelas, meta.mapel, meta.materi);
  const sudah = new Set(semua.map((row) => idBarisCache(row)).filter(Boolean));
  for (const row of semua) {
    const id = idBarisCache(row);
    if (!id || id === kunci || id === utama.kunci || id === utama.topicId) {
      continue;
    }
    try {
      await perbaruiCacheMateri(id, isi);
    } catch (error) {
      if (!adalahGalatMateriTerkunci(error)) throw error;
    }
  }
  for (const id of kandidatKunciMateri(meta.kelas, meta.mapel, meta.materi)) {
    if (sudah.has(id) || id === kunci) continue;
    const baris = payloadBarisDariIsi(id, meta, isi);
    const tulis = await supabase
      .from("cache_materi_tutor")
      .upsert(baris, { onConflict: "kunci" });
    if (tulis.error && kolomHilang(tulis.error, "referensi_url")) {
      const { referensi_url: _buang, ...tanpaReferensi } = baris;
      void _buang;
      await supabase
        .from("cache_materi_tutor")
        .upsert(tanpaReferensi, { onConflict: "kunci" });
    } else if (tulis.error) {
      console.warn("[cache-materi] sinkron alias:", tulis.error.message);
    }
  }
  revalidateSemuaTagMateri(meta.kelas, meta.mapel, meta.materi, utama.topicId);
  return ambilDetailCacheMateri(kunci);
}

export async function hapusCacheMateri(kunci: string): Promise<boolean> {
  if (await materiTerkunciMenurutKunci(kunci)) {
    throw new GalatMateriTerkunci();
  }
  const supabase = supabaseServer();
  if (!supabase) return false;
  const detail = await ambilDetailCacheMateri(kunci);
  const kunciSemua = new Set(daftarKunciDariKunciBaris(kunci));
  if (detail) {
    for (const id of kandidatKunciMateri(detail.kelas, detail.mapel, detail.materi)) {
      kunciSemua.add(id);
    }
  }
  const daftar = [...kunciSemua];
  const lewatKunci = await supabase
    .from("cache_materi_tutor")
    .delete()
    .in("kunci", daftar);
  const lewatTopic = await supabase
    .from("cache_materi_tutor")
    .delete()
    .in("topic_id", daftar);
  if (detail?.kelas && detail.mapel && detail.materi) {
    const lewatIdentitas = await supabase
      .from("cache_materi_tutor")
      .delete()
      .eq("kelas", detail.kelas)
      .eq("mapel", detail.mapel)
      .eq("materi", detail.materi);
    if (lewatIdentitas.error) {
      console.warn("[cache-materi] hapus identitas:", lewatIdentitas.error.message);
    }
  }
  const cadangan = await supabase
    .from("penambangan_igil")
    .delete()
    .eq("status", STATUS_CACHE_MATERI)
    .in("umpan_balik", daftar);
  if (cadangan.error) {
    console.warn("[cache-materi] hapus cadangan:", cadangan.error.message);
  }
  await tandaiCacheModulHapus(daftar, detail);
  if (lewatKunci.error) {
    console.warn("[cache-materi] hapus:", lewatKunci.error.message);
  }
  if (lewatTopic.error) {
    console.warn("[cache-materi] hapus topic:", lewatTopic.error.message);
  }
  if (detail) {
    revalidateSemuaTagMateri(
      detail.kelas,
      detail.mapel,
      detail.materi,
      detail.topicId,
    );
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
