export function kredensialSupabasePublik(): { url: string; kunci: string } | null {
  const url = (process.env.NEXT_PUBLIC_SUPABASE_URL || "").trim();
  const kunci = (
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.SUPABASE_ANON_KEY ||
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    ""
  ).trim();
  if (!kunci || !/^https:\/\/[a-z0-9-]+\.supabase\.(co|net)\/?$/i.test(url)) {
    return null;
  }
  return { url: url.replace(/\/$/, ""), kunci };
}

export function pesanGalatAuthSupabase(error?: { message?: string } | null): string {
  const pesan = (error?.message ?? "").trim();
  if (/invalid login|invalid credentials/i.test(pesan)) {
    return "Email atau kata sandi tidak valid.";
  }
  if (
    /fetch failed|failed to fetch|enotfound|econnrefused|getaddrinfo|networkerror|dns/i.test(
      pesan,
    )
  ) {
    return "Server akun tidak dapat dihubungi. Proyek Supabase mungkin dijeda atau sudah dihapus. Pulihkan proyek di dashboard Supabase, lalu coba lagi.";
  }
  return pesan || "Email atau kata sandi tidak valid.";
}
