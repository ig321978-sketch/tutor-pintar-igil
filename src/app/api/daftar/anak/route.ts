import { faseDariKelas, nisnCocokFase } from "@/lib/fase";
import {
  adalahRespons,
  bacaBody,
  galatBacaBody,
  jawab,
  pesanGalat,
  sesiBelajar,
  skemaBelumAda,
} from "@/lib/belajar-server";

export const dynamic = "force-dynamic";

const KODE_UNDANGAN = /^[0-9a-f]{6,32}$/i;

function teks(nilai: unknown, maks: number): string {
  return typeof nilai === "string" ? nilai.trim().slice(0, maks) : "";
}

/**
 * POST /api/daftar/anak { nama, kelas, nisn, pemilik?, kode?, pin? }
 * Satu permintaan: buat atau gabung rumah bila akun belum punya, pasang PIN orang tua bila rumah baru,
 * lalu daftarkan anak. Semua lewat RPC SECURITY DEFINER. NISN hanya dikirim ke RPC dan tidak disimpan.
 * Seluruh isian diperiksa dulu di sini supaya rumah tidak terbentuk setengah jadi karena salah ketik.
 */
export async function POST(req: Request) {
  const sesi = await sesiBelajar();
  if (adalahRespons(sesi)) return sesi;
  const { supabase, userId } = sesi;

  const body = await bacaBody(req);
  if (!body) return galatBacaBody();

  const nama = teks(body.nama, 40);
  const kelas = Number(body.kelas);
  const nisn = typeof body.nisn === "string" ? body.nisn.trim() : "";
  const pemilik = teks(body.pemilik, 80);
  const kode = teks(body.kode, 32).toLowerCase();
  const pin = typeof body.pin === "string" ? body.pin : "";

  if (nama.length < 2) return jawab({ status: "galat", pesan: "Nama panggilan anak minimal 2 huruf." }, 400);
  if (!Number.isInteger(kelas) || kelas < 1 || kelas > 6) {
    return jawab({ status: "galat", pesan: "Kelas harus antara 1 sampai 6 SD." }, 400);
  }
  const fase = faseDariKelas(kelas);
  if (!fase || !/^\d{10}$/.test(nisn)) {
    return jawab({ status: "galat", pesan: "NISN harus 10 angka." }, 400);
  }
  if (!nisnCocokFase(nisn, fase)) {
    return jawab(
      { status: "galat", pesan: "Awalan NISN tidak sesuai dengan kelas yang dipilih. Periksa kelas atau NISN anak." },
      400,
    );
  }
  if (kode && !KODE_UNDANGAN.test(kode)) {
    return jawab({ status: "galat", pesan: "Kode undangan tidak cocok. Periksa lagi kodenya." }, 400);
  }

  const anggota = await supabase
    .from("household_guardians")
    .select("household_id")
    .eq("user_id", userId)
    .maybeSingle();
  if (skemaBelumAda(anggota.error)) return jawab({ status: "belum_siap" });
  if (anggota.error) return jawab({ status: "galat", pesan: "Data rumah belum bisa dibaca." }, 500);

  const punyaRumah = Boolean(anggota.data?.household_id);
  const bergabung = !punyaRumah && kode.length > 0;
  const rumahBaru = !punyaRumah && !bergabung;

  if (rumahBaru) {
    if (pemilik.length < 3) {
      return jawab({ status: "galat", pesan: "Isi nama pemilik rekening penerima beasiswa (minimal 3 huruf)." }, 400);
    }
    if (!/^\d{6}$/.test(pin)) {
      return jawab({ status: "galat", pesan: "PIN keamanan orang tua harus 6 angka." }, 400);
    }
  }

  let kodeRumah: string | null = null;
  if (bergabung) {
    const { error } = await supabase.rpc("gabung_rumah", { p_invite_code: kode });
    if (skemaBelumAda(error)) return jawab({ status: "belum_siap" });
    if (error) return jawab({ status: "galat", pesan: pesanGalat(error) }, 400);
  } else if (rumahBaru) {
    const { data, error } = await supabase.rpc("buat_rumah", { p_payout_holder_name: pemilik });
    if (skemaBelumAda(error)) return jawab({ status: "belum_siap" });
    if (error) return jawab({ status: "galat", pesan: pesanGalat(error) }, 400);
    kodeRumah = typeof data === "string" ? data : null;
    const pasang = await supabase.rpc("pasang_pin_ortu", { p_pin: pin });
    if (pasang.error && !/PIN sudah dipasang/i.test(pasang.error.message ?? "")) {
      return jawab({ status: "galat", pesan: pesanGalat(pasang.error) }, 400);
    }
  }

  const { data: idAnak, error } = await supabase.rpc("daftar_anak", {
    p_display_name: nama,
    p_grade: kelas,
    p_nisn: nisn,
  });
  if (skemaBelumAda(error)) return jawab({ status: "belum_siap" });
  if (error) return jawab({ status: "galat", pesan: pesanGalat(error) }, 400);

  return jawab({
    status: "ok",
    anak: { id: typeof idAnak === "string" ? idAnak : null, nama, kelas, fase },
    kodeUndangan: kodeRumah,
  });
}
