import {
  adalahIdBab,
  adalahIdSoal,
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

/**
 * POST /api/belajar/latihan  { anak, bab, soal, pilihan }
 * Jawaban Latihan dinilai di server lewat RPC kirim_jawaban_latihan.
 * Respons: { status: "ok", benar, pembahasan }. Kunci (correct_index) tidak pernah dikirim.
 */
export async function POST(req: Request) {
  const body = await bacaBody(req);
  if (!body) return galatBacaBody();
  const { anak, bab, soal, pilihan } = body;
  if (
    !adalahUuid(anak) ||
    !adalahIdBab(bab) ||
    !adalahIdSoal(soal) ||
    typeof pilihan !== "number" ||
    !Number.isInteger(pilihan) ||
    pilihan < 0 ||
    pilihan > 3
  ) {
    return galatBacaBody();
  }

  const sesi = await sesiBelajar();
  if (adalahRespons(sesi)) return sesi;

  const { data, error } = await sesi.supabase.rpc("kirim_jawaban_latihan", {
    p_student: anak,
    p_chapter: bab,
    p_question: soal,
    p_selected_index: pilihan,
  });
  if (skemaBelumAda(error)) return jawab({ status: "belum_siap" });
  if (error) return jawab({ status: "galat", pesan: pesanGalat(error) }, 422);

  const hasil = (data ?? {}) as { benar?: unknown; pembahasan?: unknown };
  if (typeof hasil.benar !== "boolean" || typeof hasil.pembahasan !== "string") {
    // Fungsi lama (01) masih terpasang: belum ada migrasi 03.
    return jawab({ status: "belum_siap" });
  }
  return jawab({ status: "ok", benar: hasil.benar, pembahasan: hasil.pembahasan });
}
