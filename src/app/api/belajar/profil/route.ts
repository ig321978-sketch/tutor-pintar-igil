import {
  adalahIdBab,
  adalahRespons,
  adalahUuid,
  jawab,
  sesiBelajar,
  skemaBelumAda,
} from "@/lib/belajar-server";

export const dynamic = "force-dynamic";

interface BarisAnak {
  id: string;
  display_name: string;
  grade: number;
  phase_code: string;
}

/**
 * GET /api/belajar/profil[?anak=<uuid>&bab=<id server>]
 * Tanpa parameter: daftar profil anak di akun. Dengan anak dan bab: status Latihan dan Ujian bab itu.
 * Hanya SELECT lewat RLS. Tidak ada kunci jawaban di respons.
 */
export async function GET(req: Request) {
  const sesi = await sesiBelajar();
  if (adalahRespons(sesi)) return sesi;
  const { supabase } = sesi;

  const url = new URL(req.url);
  const anak = url.searchParams.get("anak");
  const bab = url.searchParams.get("bab");

  if (anak === null && bab === null) {
    const { data, error } = await supabase
      .from("students")
      .select("id, display_name, grade, phase_code")
      .order("created_at", { ascending: true });
    if (skemaBelumAda(error)) return jawab({ status: "belum_siap" });
    if (error) return jawab({ status: "galat", pesan: "Daftar anak belum bisa dibaca." }, 500);
    const baris = (data ?? []) as BarisAnak[];
    if (baris.length === 0) return jawab({ status: "belum_ada_anak" });
    return jawab({
      status: "siap",
      anak: baris.map((b) => ({
        id: b.id,
        nama: b.display_name,
        kelas: b.grade,
        fase: b.phase_code,
      })),
    });
  }

  if (!adalahUuid(anak) || !adalahIdBab(bab)) {
    return jawab({ status: "galat", pesan: "Permintaan tidak valid." }, 400);
  }

  const [ujian, poin] = await Promise.all([
    supabase
      .from("exam_sessions")
      .select("status, cooldown_until, started_at")
      .eq("student_id", anak)
      .eq("chapter_id", bab)
      .order("started_at", { ascending: false })
      .limit(20),
    supabase
      .from("token_awards")
      .select("component_type")
      .eq("student_id", anak)
      .eq("chapter_id", bab),
  ]);
  if (skemaBelumAda(ujian.error) || skemaBelumAda(poin.error)) {
    return jawab({ status: "belum_siap" });
  }
  if (ujian.error || poin.error) {
    return jawab({ status: "galat", pesan: "Status belajar belum bisa dibaca." }, 500);
  }

  const sesiUjian = ujian.data ?? [];
  const sekarang = Date.now();
  const jeda = sesiUjian
    .map((s) => (s.cooldown_until ? Date.parse(s.cooldown_until as string) : 0))
    .filter((t) => t > sekarang)
    .sort((a, b) => b - a)[0];
  const jenisPoin = new Set((poin.data ?? []).map((p) => p.component_type as string));

  return jawab({
    status: "siap",
    ujianLulus: sesiUjian.some((s) => s.status === "lulus"),
    ujianBerjalan: sesiUjian.some((s) => s.status === "aktif"),
    jedaSampai: jeda ? new Date(jeda).toISOString() : null,
    poinLatihan: jenisPoin.has("latihan"),
    poinUjian: jenisPoin.has("ujian"),
  });
}
