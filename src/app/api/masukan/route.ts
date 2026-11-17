import { GoogleGenAI } from "@google/genai";
import { adalahRespons, bacaBody, galatBacaBody, jawab, sesiBelajar, skemaBelumAda } from "@/lib/belajar-server";
import { DITERUSKAN_KE_ADMIN, bersihkanJawaban, instruksiAi, jawabanCadangan, pesanMasukan, validasiMasukan, type JenisMasukan } from "@/lib/masukan";

export const dynamic = "force-dynamic";
export const maxDuration = 30;

/**
 * GET  /api/masukan                          → { status: "ok", sudah, jenis?, isi?, jawaban? } untuk hari ini (WIB)
 * POST /api/masukan { jenis, bab, tahap, isi } → { status: "ok", jawaban, diteruskan }
 * Satu akun satu masukan per hari (dijaga RPC kirim_masukan_tahap dan indeks unik). AI (Gemini) dipanggil hanya
 * setelah masukan tersimpan, jadi paling banyak sekali sehari per akun. Suara jawaban dibacakan di perangkat (gratis).
 */
export async function GET() {
  const sesi = await sesiBelajar();
  if (adalahRespons(sesi)) return sesi;
  const { data, error } = await sesi.supabase.rpc("masukan_hari_ini");
  if (skemaBelumAda(error)) return jawab({ status: "belum_siap" });
  if (error) return jawab({ status: "galat", pesan: pesanMasukan(error.message) }, 422);
  return jawab({ status: "ok", ...((data ?? { sudah: false }) as Record<string, unknown>) });
}

async function tanyaAi(jenis: JenisMasukan, bab: string, tahap: string, isi: string): Promise<string | null> {
  const kunci = process.env.GEMINI_API_KEY;
  if (!kunci) return null;
  try {
    const ai = new GoogleGenAI({ apiKey: kunci });
    const hasil = await Promise.race([
      ai.models.generateContent({
        model: process.env.GEMINI_MODEL_RUTIN || process.env.GEMINI_MODEL || "gemini-3.5-flash-lite",
        contents: isi,
        config: { systemInstruction: instruksiAi(jenis, bab, tahap), maxOutputTokens: 400, temperature: 0.4 },
      }),
      new Promise<null>((r) => setTimeout(() => r(null), 20000)),
    ]);
    const teks = hasil?.text ? bersihkanJawaban(hasil.text) : "";
    return teks || null;
  } catch {
    return null;
  }
}

export async function POST(req: Request) {
  const body = await bacaBody(req);
  if (!body) return galatBacaBody();
  const m = validasiMasukan(body);
  if (!m) return galatBacaBody();

  const sesi = await sesiBelajar();
  if (adalahRespons(sesi)) return sesi;

  const { data: id, error } = await sesi.supabase.rpc("kirim_masukan_tahap", { p_jenis: m.jenis, p_bab: m.bab, p_tahap: m.tahap, p_isi: m.isi });
  if (skemaBelumAda(error)) return jawab({ status: "belum_siap" });
  if (error) {
    const sudah = /Sudah mengirim/i.test(error.message ?? "");
    return jawab({ status: sudah ? "sudah" : "galat", pesan: pesanMasukan(error.message ?? "") }, sudah ? 409 : 422);
  }

  const jawaban = (await tanyaAi(m.jenis, m.bab, m.tahap, m.isi)) ?? jawabanCadangan(m.jenis);
  if (typeof id === "string") await sesi.supabase.rpc("simpan_jawaban_masukan", { p_id: id, p_jawaban: jawaban });
  return jawab({ status: "ok", jawaban, diteruskan: DITERUSKAN_KE_ADMIN.includes(m.jenis) });
}
