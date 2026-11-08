import { NextResponse } from "next/server";
import type { SupabaseClient } from "@supabase/supabase-js";
import { supabaseAuthServer } from "@/lib/supabase-auth";

/**
 * Jembatan Latihan dan Ujian ke Supabase.
 * Kunci jawaban hanya ada di skema private (RPC SECURITY DEFINER). Berkas ini hanya meneruskan
 * pilihan siswa ke RPC dengan sesi cookie akun yang sedang masuk, lalu mengembalikan hasilnya.
 */

export type StatusBelajar = "belum_siap" | "belum_masuk" | "belum_ada_anak" | "siap";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const ID_BAB = /^[a-z0-9][a-z0-9-]{0,63}$/i;
const ID_SOAL = /^[A-Za-z0-9_-]{1,32}$/;

export const adalahUuid = (nilai: unknown): nilai is string =>
  typeof nilai === "string" && UUID.test(nilai);
export const adalahIdBab = (nilai: unknown): nilai is string =>
  typeof nilai === "string" && ID_BAB.test(nilai);
export const adalahIdSoal = (nilai: unknown): nilai is string =>
  typeof nilai === "string" && ID_SOAL.test(nilai);

export function jawab(isi: Record<string, unknown>, status = 200): NextResponse {
  const res = NextResponse.json(isi, { status });
  res.headers.set("Cache-Control", "private, no-store");
  return res;
}

export function galatBacaBody(): NextResponse {
  return jawab({ status: "galat", pesan: "Permintaan tidak valid." }, 400);
}

export async function bacaBody(req: Request): Promise<Record<string, unknown> | null> {
  try {
    const nilai: unknown = await req.json();
    return nilai && typeof nilai === "object" ? (nilai as Record<string, unknown>) : null;
  } catch {
    return null;
  }
}

/** Skema delapan pintu belum diterapkan di proyek Supabase (tabel atau fungsi belum ada). */
export function skemaBelumAda(error: { code?: string; message?: string } | null): boolean {
  if (!error) return false;
  if (error.code === "PGRST202" || error.code === "PGRST205" || error.code === "42P01" || error.code === "42883") {
    return true;
  }
  return /schema cache|does not exist|could not find the (table|function)/i.test(error.message ?? "");
}

const PESAN_RAMAH: Array<[RegExp, string]> = [
  [/terlalu rapat/i, "Jawabanmu terlalu cepat. Tunggu sebentar, lalu coba lagi."],
  [/Fase tidak cocok/i, "Profil anak ini berada di fase lain, jadi bab ini belum bisa dikerjakan."],
  [/Anak tidak ada di rumah/i, "Profil anak tidak ditemukan di akun ini."],
  [/Masih ada ujian yang berjalan/i, "Masih ada ujian yang sedang berjalan. Lanjutkan lembar itu dulu."],
  [/masih dalam jeda/i, "Ujian ini sedang dalam jeda sebelum bisa diulang."],
  [/Paket ujian belum tersedia|Kunci ujian kosong|Soal latihan tidak tersedia|Bab tidak tersedia/i, "Soal bab ini belum tersedia di server."],
  [/Sesi ujian/i, "Sesi ujian tidak ditemukan atau sudah ditutup."],
  [/Masuk diperlukan/i, "Masuk dulu ke akun orang tua."],
  [/Akun ini sudah punya rumah/i, "Akun ini sudah tergabung di sebuah rumah."],
  [/Kode undangan tidak cocok/i, "Kode undangan tidak cocok. Periksa lagi kodenya."],
  [/Rumah belum dibuat/i, "Rumah belum dibuat untuk akun ini."],
  [/Kelas di luar SD/i, "Kelas harus antara 1 sampai 6 SD."],
  [/NISN harus 10 digit/i, "NISN harus 10 angka."],
  [/NISN tidak sesuai fase/i, "Awalan NISN tidak sesuai dengan kelas yang dipilih. Periksa kelas atau NISN anak."],
  [/NISN ini sudah terdaftar/i, "NISN ini sudah terdaftar di IGIL. Satu anak hanya bisa punya satu profil."],
  [/Pendaftaran jenjang ini ditutup/i, "Pendaftaran untuk jenjang ini belum dibuka. IGIL baru melayani SD kelas 1 sampai 6."],
  [/Kunci HMAC NISN belum dipasang/i, "Pendaftaran belum aktif di server. Mohon coba lagi nanti."],
  [/PIN harus 6 digit/i, "PIN harus 6 angka."],
  [/PIN sudah dipasang/i, "Rumah ini sudah punya PIN."],
];

export function pesanGalat(error: { message?: string } | null): string {
  const asli = error?.message ?? "";
  for (const [pola, pesan] of PESAN_RAMAH) {
    if (pola.test(asli)) return pesan;
  }
  return "Server belum bisa memproses permintaan ini. Coba lagi sebentar.";
}

export interface SesiBelajar {
  supabase: SupabaseClient;
  userId: string;
}

/** Mengembalikan sesi akun, atau respons siap kirim bila belum bisa dipakai. */
export async function sesiBelajar(): Promise<SesiBelajar | NextResponse> {
  const supabase = await supabaseAuthServer();
  if (!supabase) return jawab({ status: "belum_siap" });
  try {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) return jawab({ status: "belum_masuk" });
    return { supabase, userId: data.user.id };
  } catch {
    return jawab({ status: "belum_siap" });
  }
}

export function adalahRespons(nilai: SesiBelajar | NextResponse): nilai is NextResponse {
  return nilai instanceof NextResponse;
}
