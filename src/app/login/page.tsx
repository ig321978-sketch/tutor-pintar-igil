import { redirect } from "next/navigation";

/** Formulir Masuk/Daftar kini ada di halaman muka. Tautan lama dialihkan ke sana. */
export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; mode?: string }>;
}) {
  const { next, mode } = await searchParams;
  const q = new URLSearchParams();
  if (next) q.set("next", next);
  if (mode === "daftar") q.set("mode", "daftar");
  const s = q.toString();
  redirect(s ? `/?${s}` : "/");
}
