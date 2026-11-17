import { jawab, adalahIdBab, adalahRespons, pesanGalat, sesiBelajar, skemaBelumAda } from "@/lib/belajar-server";
import { sesiPenggunaSaatIni } from "@/lib/supabase-auth";

export const dynamic = "force-dynamic";

interface SoalDb {
  id: string;
  question: string;
  options: string[];
}

const soalValid = (nilai: unknown): nilai is SoalDb[] =>
  Array.isArray(nilai) &&
  nilai.every(
    (s) =>
      s &&
      typeof s === "object" &&
      typeof (s as SoalDb).id === "string" &&
      typeof (s as SoalDb).question === "string" &&
      Array.isArray((s as SoalDb).options) &&
      (s as SoalDb).options.length === 4 &&
      (s as SoalDb).options.every((o) => typeof o === "string"),
  );

/**
 * GET /api/belajar/ujian/pratinjau?bab=k1-mat-bab1[&paket=...]
 * Pratinjau Ujian KHUSUS ADMIN untuk pemilik memeriksa soal di produksi. Hanya batang soal dan pilihan:
 * tanpa kunci jawaban, tanpa pembahasan, tanpa sesi ujian, tanpa poin. Dijaga dua lapis: pemeriksaan peran di sini
 * dan fungsi SQL public.pratinjau_ujian_admin (menolak non-admin). Bentuk jawaban sama dengan /api/dev/pratinjau-ujian.
 * Siswa dan pengunjung mendapat 403; middleware juga hanya mengizinkan jalur ini untuk admin saat situs terkunci.
 */
export async function GET(req: Request) {
  const sesiPeran = await sesiPenggunaSaatIni();
  if (!sesiPeran.adalahAdmin) return jawab({ status: "dilarang" }, 403);

  const url = new URL(req.url);
  const bab = url.searchParams.get("bab");
  const paket = url.searchParams.get("paket");
  if (!adalahIdBab(bab) || (paket !== null && !/^[A-Za-z0-9_-]{1,32}$/.test(paket))) {
    return jawab({ status: "galat", pesan: "Permintaan tidak valid." }, 400);
  }

  const sesi = await sesiBelajar();
  if (adalahRespons(sesi)) return sesi;

  const { data, error } = await sesi.supabase.rpc("pratinjau_ujian_admin", { p_chapter: bab, p_paket: paket });
  if (skemaBelumAda(error)) return jawab({ status: "belum_siap" });
  if (error) return jawab({ status: "galat", pesan: pesanGalat(error) }, 422);

  const hasil = data as { paket?: unknown; daftar_paket?: unknown; soal?: unknown } | null;
  if (!hasil || !soalValid(hasil.soal)) return jawab({ status: "galat", pesan: "Soal bab ini belum tersedia di server." }, 502);
  return jawab({
    status: hasil.soal.length > 0 ? "ok" : "kosong",
    paket: typeof hasil.paket === "string" ? hasil.paket : null,
    daftarPaket: Array.isArray(hasil.daftar_paket) ? hasil.daftar_paket.filter((p): p is string => typeof p === "string") : [],
    soal: hasil.soal.map((s) => ({ id: s.id, pertanyaan: s.question, pilihan: s.options })),
  });
}
