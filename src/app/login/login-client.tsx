"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import PageShell from "@/components/PageShell";
import { kelasKotak, kelasLabel, kelasTombolUtama } from "@/lib/tema";

export default function LoginClient() {
  const router = useRouter();
  const params = useSearchParams();
  const nextMentah = params.get("next") || "/tutor";
  const next = nextMentah.startsWith("/") ? nextMentah : "/tutor";
  const [email, setEmail] = useState("");
  const [sandi, setSandi] = useState("");
  const [pesan, setPesan] = useState("");
  const [memuat, setMemuat] = useState(false);

  async function kirim(e: React.FormEvent) {
    e.preventDefault();
    setPesan("");
    setMemuat(true);
    try {
      const res = await fetch("/api/auth/masuk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password: sandi }),
      });
      const json = (await res.json()) as {
        berhasil?: boolean;
        pesan?: string;
        adalahAdmin?: boolean;
      };
      if (!res.ok || !json.berhasil) {
        setPesan(json.pesan || "Email atau kata sandi tidak valid.");
        return;
      }
      const tujuanAdmin =
        next.startsWith("/admin") || next.startsWith("/studio-kreator");
      if (tujuanAdmin && !json.adalahAdmin) {
        router.replace("/403");
        router.refresh();
        return;
      }
      router.replace(next);
      router.refresh();
    } catch {
      setPesan("Tidak bisa menghubungi server. Coba lagi.");
    } finally {
      setMemuat(false);
    }
  }

  return (
    <PageShell
      judul="Masuk"
      subjudul="Masuk dengan akun admin. Setelah masuk, Anda dapat membuka website dan Studio Kreator."
    >
      <form
        onSubmit={(e) => void kirim(e)}
        className="mx-auto max-w-md space-y-4 rounded-3xl border border-[#1C01A5]/15 bg-white p-6 shadow-sm"
      >
        <label className="block">
          <span className={kelasLabel}>Email</span>
          <input
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={kelasKotak}
            placeholder="nama@sekolah.id"
          />
        </label>
        <label className="block">
          <span className={kelasLabel}>Kata sandi</span>
          <input
            type="password"
            required
            autoComplete="current-password"
            value={sandi}
            onChange={(e) => setSandi(e.target.value)}
            className={kelasKotak}
            placeholder="••••••••"
          />
        </label>
        {pesan ? (
          <p className="rounded-2xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-600">
            {pesan}
          </p>
        ) : null}
        <button
          type="submit"
          disabled={memuat}
          className={`${kelasTombolUtama} w-full rounded-full px-4 py-3 text-sm font-bold`}
        >
          {memuat ? "Memeriksa..." : "Masuk"}
        </button>
      </form>
    </PageShell>
  );
}
