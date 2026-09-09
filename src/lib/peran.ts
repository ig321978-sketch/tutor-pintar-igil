import type { SupabaseClient, User } from "@supabase/supabase-js";

export const PERAN_ADMIN = "admin";
export const PERAN_DEFAULT = "student";

export type PeranPengguna = "admin" | "student" | "user" | string;

export function adalahPeranAdmin(peran?: string | null): boolean {
  return (peran ?? "").trim().toLowerCase() === PERAN_ADMIN;
}

export async function bacaPeranPengguna(
  supabase: SupabaseClient,
  user: User,
): Promise<string> {
  const { data, error } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();
  if (!error && data && typeof data.role === "string" && data.role.trim()) {
    return data.role.trim().toLowerCase();
  }
  const dariMeta =
    (typeof user.app_metadata?.role === "string" && user.app_metadata.role) ||
    (typeof user.user_metadata?.role === "string" && user.user_metadata.role) ||
    "";
  return dariMeta.trim().toLowerCase();
}
