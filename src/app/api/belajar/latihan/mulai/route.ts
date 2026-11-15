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

const LEVEL = {
  LOTS: "LOTS (30%)",
  MOTS: "MOTS (30%)",
  HOTS: "HOTS (40%)",
} as const;

interface SoalBank {
  id: string;
  question: string;
  options: string[];
  level: keyof typeof LEVEL;
  visual?: string[];
  visual2?: string[];
}

function soalValid(nilai: unknown): nilai is SoalBank[] {
  return (
    Array.isArray(nilai) &&
    nilai.length === 10 &&
    nilai.every((s) => {
      if (!s || typeof s !== "object") return false;
      const soal = s as SoalBank;
      return (
        typeof soal.id === "string" &&
        typeof soal.question === "string" &&
        Array.isArray(soal.options) &&
        soal.options.length === 4 &&
        soal.level in LEVEL
      );
    })
  );
}

/**
 * POST /api/belajar/latihan/mulai  { anak, bab }
 * Mengundi 10 soal Latihan baru untuk akun ini: 3 LOTS, 3 MOTS, 4 HOTS.
 * Set yang masih terbuka tidak sama dengan set siswa lain. Tanpa kunci jawaban.
 */
export async function POST(req: Request) {
  const body = await bacaBody(req);
  if (!body) return galatBacaBody();
  const { anak, bab } = body;
  if (!adalahUuid(anak) || !adalahIdBab(bab)) return galatBacaBody();

  const sesi = await sesiBelajar();
  if (adalahRespons(sesi)) return sesi;

  const { data, error } = await sesi.supabase.rpc("buka_latihan", {
    p_student: anak,
    p_chapter: bab,
  });
  if (skemaBelumAda(error)) return jawab({ status: "belum_siap" });
  if (error && /tidak memakai undian acak/i.test(error.message ?? "")) {
    return jawab({ status: "belum_siap" });
  }
  if (error) return jawab({ status: "galat", pesan: pesanGalat(error) }, 422);

  const lembar = (data ?? {}) as { soal?: unknown };
  if (!soalValid(lembar.soal)) {
    return jawab({ status: "galat", pesan: "Lembar latihan belum tersedia di server." }, 502);
  }

  return jawab({
    status: "ok",
    soal: lembar.soal.map((s) => ({
      id: s.id,
      prompt: s.question,
      options: s.options,
      level: LEVEL[s.level],
      visualEmojis: Array.isArray(s.visual) ? s.visual : [],
      secondaryGroupEmojis: Array.isArray(s.visual2) && s.visual2.length > 0 ? s.visual2 : undefined,
    })),
  });
}
