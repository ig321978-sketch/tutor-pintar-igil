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

export const dynamic = "force-dynamic";

interface SoalServer {
  id: string;
  question: string;
  options: string[];
}

function soalValid(nilai: unknown): nilai is SoalServer[] {
  return (
    Array.isArray(nilai) &&
    nilai.length > 0 &&
    nilai.every(
      (s) =>
        s &&
        typeof s === "object" &&
        typeof (s as SoalServer).id === "string" &&
        typeof (s as SoalServer).question === "string" &&
        Array.isArray((s as SoalServer).options) &&
        (s as SoalServer).options.length === 4,
    )
  );
}

/**
 * POST /api/belajar/ujian/mulai  { anak, bab }
 * Memulai sesi ujian (paket dipilih server) atau melanjutkan sesi yang masih berjalan.
 * Lembar soal hanya dikirim dari server saat ujian dimulai. Tanpa kunci jawaban.
 */
export async function POST(req: Request) {
  const body = await bacaBody(req);
  if (!body) return galatBacaBody();
  const { anak, bab } = body;
  if (!adalahUuid(anak) || !adalahIdBab(bab)) return galatBacaBody();

  const sesi = await sesiBelajar();
  if (adalahRespons(sesi)) return sesi;
  const { supabase } = sesi;

  // Lanjutkan lembar yang masih aktif lebih dulu.
  const lanjut = await supabase.rpc("ujian_berjalan", { p_student: anak, p_chapter: bab });
  if (skemaBelumAda(lanjut.error)) return jawab({ status: "belum_siap" });
  if (lanjut.error) return jawab({ status: "galat", pesan: pesanGalat(lanjut.error) }, 422);

  let lembar = lanjut.data as { session_id?: unknown; soal?: unknown } | null;
  let dilanjutkan = true;
  if (!lembar) {
    const baru = await supabase.rpc("mulai_ujian", { p_student: anak, p_chapter: bab });
    if (skemaBelumAda(baru.error)) return jawab({ status: "belum_siap" });
    if (baru.error) return jawab({ status: "galat", pesan: pesanGalat(baru.error) }, 422);
    lembar = baru.data as { session_id?: unknown; soal?: unknown } | null;
    dilanjutkan = false;
  }

  if (!lembar || typeof lembar.session_id !== "string" || !soalValid(lembar.soal)) {
    return jawab({ status: "galat", pesan: "Lembar ujian belum tersedia di server." }, 502);
  }
  return jawab({
    status: "ok",
    sesi: lembar.session_id,
    soal: lembar.soal.map((s) => ({ id: s.id, pertanyaan: s.question, pilihan: s.options })),
    dilanjutkan,
  });
}
