import {
  adalahIdBab,
  adalahRespons,
  adalahUuid,
  bacaBody,
  galatBacaBody,
  jawab,
  pesanGalat,
  sesiBelajar,
  skemaBelumAda,
} from "@/lib/belajar-server";
import { TAB_JEJAK, uraiJejak, type JejakBab, type TabJejak } from "@/lib/jejak-tahap";

export const dynamic = "force-dynamic";

function keJson(j: JejakBab) {
  return { subAktif: j.subAktif, tahap: j.tahap, subSelesai: j.subSelesai, tab: j.tab };
}

/**
 * GET  /api/belajar/jejak?anak=&bab=
 * POST /api/belajar/jejak  { anak, bab, subAktif, tahap, subSelesai, tab }
 * Posisi tahap Materi. Server hanya menaikkan capaian, tidak pernah mengembalikan siswa ke tahap yang lebih awal.
 */
export async function GET(req: Request) {
  const sesi = await sesiBelajar();
  if (adalahRespons(sesi)) return sesi;
  const url = new URL(req.url);
  const anak = url.searchParams.get("anak");
  const bab = url.searchParams.get("bab");
  if (!adalahUuid(anak) || !adalahIdBab(bab)) return galatBacaBody();

  const { data, error } = await sesi.supabase.rpc("baca_jejak_tahap", { p_student: anak, p_chapter: bab });
  if (skemaBelumAda(error)) return jawab({ status: "belum_siap" });
  if (error) return jawab({ status: "galat", pesan: pesanGalat(error) }, 422);
  if (!data) return jawab({ status: "kosong" });
  return jawab({ status: "ada", jejak: keJson(uraiJejak(data)) });
}

export async function POST(req: Request) {
  const sesi = await sesiBelajar();
  if (adalahRespons(sesi)) return sesi;
  const body = await bacaBody(req);
  if (!body) return galatBacaBody();
  const { anak, bab, subAktif, tahap, subSelesai, tab } = body;
  if (!adalahUuid(anak) || !adalahIdBab(bab)) return galatBacaBody();
  if (typeof subAktif !== "string" || !TAB_JEJAK.includes(tab as TabJejak)) return galatBacaBody();
  if (!tahap || typeof tahap !== "object" || Array.isArray(tahap)) return galatBacaBody();
  if (!Array.isArray(subSelesai)) return galatBacaBody();

  const { data, error } = await sesi.supabase.rpc("simpan_jejak_tahap", {
    p_student: anak,
    p_chapter: bab,
    p_sub_aktif: subAktif,
    p_tahap: tahap,
    p_sub_selesai: subSelesai,
    p_tab: tab,
  });
  if (skemaBelumAda(error)) return jawab({ status: "belum_siap" });
  if (error) return jawab({ status: "galat", pesan: pesanGalat(error) }, 422);
  return jawab({ status: "ok", jejak: keJson(uraiJejak(data)) });
}
