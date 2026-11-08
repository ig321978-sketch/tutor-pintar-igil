import { adalahRespons, jawab, sesiBelajar, skemaBelumAda } from "@/lib/belajar-server";

export const dynamic = "force-dynamic";

interface BarisAnak {
  id: string;
  display_name: string;
  grade: number;
  phase_code: string;
}

/**
 * GET /api/daftar/status
 * Keadaan pendaftaran akun yang sedang masuk: rumah, kode undangan, PIN, dan anak yang sudah terdaftar.
 * Hanya SELECT lewat RLS. NISN tidak pernah ada di respons karena tidak disimpan.
 */
export async function GET() {
  const sesi = await sesiBelajar();
  if (adalahRespons(sesi)) return sesi;
  const { supabase, userId } = sesi;

  const anggota = await supabase
    .from("household_guardians")
    .select("household_id")
    .eq("user_id", userId)
    .maybeSingle();
  if (skemaBelumAda(anggota.error)) return jawab({ status: "belum_siap" });
  if (anggota.error) return jawab({ status: "galat", pesan: "Data rumah belum bisa dibaca." }, 500);

  const idRumah = (anggota.data?.household_id as string | undefined) ?? null;
  if (!idRumah) return jawab({ status: "siap", rumah: null, pinSudah: false, anak: [] });

  const [rumah, anak, pin] = await Promise.all([
    supabase
      .from("households")
      .select("invite_code, payout_holder_name")
      .eq("id", idRumah)
      .maybeSingle(),
    supabase
      .from("students")
      .select("id, display_name, grade, phase_code")
      .order("created_at", { ascending: true }),
    supabase.rpc("status_pin_ortu"),
  ]);
  if (skemaBelumAda(rumah.error) || skemaBelumAda(anak.error)) return jawab({ status: "belum_siap" });
  if (rumah.error || anak.error) {
    return jawab({ status: "galat", pesan: "Data rumah belum bisa dibaca." }, 500);
  }

  return jawab({
    status: "siap",
    rumah: {
      kodeUndangan: (rumah.data?.invite_code as string | undefined) ?? "",
      pemilik: (rumah.data?.payout_holder_name as string | undefined) ?? "",
    },
    // Bila fungsi status PIN belum dipasang, anggap PIN sudah ada agar layar tidak memaksa PIN ganda.
    pinSudah: pin.error ? true : pin.data === true,
    anak: ((anak.data ?? []) as BarisAnak[]).map((b) => ({
      id: b.id,
      nama: b.display_name,
      kelas: b.grade,
      fase: b.phase_code,
    })),
  });
}
