import {
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
 * POST /api/belajar/ujian/serahkan  { sesi, jawaban: { [idSoal]: 0..3 } }
 * Satu lembar utuh diserahkan sekaligus. Server menghitung nilai dan hanya mengembalikan
 * nilai akhir, tanpa memberi tahu nomor soal yang salah.
 */
export async function POST(req: Request) {
  const body = await bacaBody(req);
  if (!body) return galatBacaBody();
  const { sesi: idSesi, jawaban } = body;
  if (!adalahUuid(idSesi) || !jawaban || typeof jawaban !== "object" || Array.isArray(jawaban)) {
    return galatBacaBody();
  }

  const daftar: { id: string; selected_index: number }[] = [];
  for (const [id, pilihan] of Object.entries(jawaban as Record<string, unknown>)) {
    if (!adalahIdSoal(id) || typeof pilihan !== "number" || !Number.isInteger(pilihan) || pilihan < 0 || pilihan > 3) {
      return galatBacaBody();
    }
    daftar.push({ id, selected_index: pilihan });
  }
  if (daftar.length > 50) return galatBacaBody();

  const sesi = await sesiBelajar();
  if (adalahRespons(sesi)) return sesi;

  const { data, error } = await sesi.supabase.rpc("serahkan_ujian", {
    p_session: idSesi,
    p_jawaban: daftar,
  });
  if (skemaBelumAda(error)) return jawab({ status: "belum_siap" });
  if (error) return jawab({ status: "galat", pesan: pesanGalat(error) }, 422);

  const hasil = (data ?? {}) as { nilai?: unknown; ditolak?: unknown };
  if (typeof hasil.ditolak === "string") {
    return jawab({
      status: "ditolak",
      alasan: hasil.ditolak,
      pesan:
        hasil.ditolak === "terlalu_cepat"
          ? "Lembar diserahkan terlalu cepat, jadi tidak dihitung. Ujian bisa diulang setelah jeda."
          : "Lembar ujian ditolak server.",
    });
  }
  if (typeof hasil.nilai !== "number") {
    return jawab({ status: "galat", pesan: "Nilai ujian belum bisa dibaca." }, 502);
  }
  return jawab({ status: "ok", nilai: hasil.nilai });
}
