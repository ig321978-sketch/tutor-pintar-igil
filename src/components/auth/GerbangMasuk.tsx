"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useId, useState } from "react";

import { adaSesiBrowser, hapusSesiBrowser, tandaiSesiBrowser } from "@/lib/sesi-browser";
import { situsHanyaAdmin } from "@/lib/situs-hanya-admin";

function tujuanAman(mentah: string | null): string {
  return mentah && mentah.startsWith("/") && !mentah.startsWith("//") && !mentah.startsWith("/tutor")
    ? mentah
    : "/ruang-belajar";
}

const KOTAK =
  "w-full border-0 border-b-2 border-white/70 bg-transparent px-1 py-2 text-lg font-semibold text-white outline-none placeholder:text-indigo-300 focus:border-amber-400";

/**
 * Halaman muka IGIL: logo burung hantu dan formulir Daftar/Masuk langsung di layar.
 * Daftar = buat akun (syarat masuk, bukan berlangganan). Menutup aplikasi berarti keluar:
 * tanpa tanda sesi di tab ini, pengguna harus Masuk lagi (capaian belajar tetap di server).
 */
export default function GerbangMasuk() {
  const router = useRouter();
  const params = useSearchParams();
  const next = tujuanAman(params.get("next"));
  const idEmail = useId();
  const idSandi = useId();
  const [daftar, setDaftar] = useState(params.get("mode") === "daftar");
  const [email, setEmail] = useState("");
  const [sandi, setSandi] = useState("");
  const [pesan, setPesan] = useState("");
  const [kirim, setKirim] = useState(false);
  const [memuat, setMemuat] = useState(true);

  useEffect(() => {
    let batal = false;
    void (async () => {
      try {
        const res = await fetch("/api/auth/saya", { cache: "no-store" });
        const json = (await res.json()) as { masuk?: boolean };
        if (batal) return;
        if (json.masuk && adaSesiBrowser()) {
          router.replace(next);
          return;
        }
        if (json.masuk) {
          // Aplikasi ditutup lalu dibuka lagi: akhiri sesi lama, capaian tidak dihapus.
          await fetch("/api/auth/keluar", { method: "POST", cache: "no-store" });
          hapusSesiBrowser();
        }
      } catch {
        // tampilkan formulir saja
      } finally {
        if (!batal) setMemuat(false);
      }
    })();
    return () => {
      batal = true;
    };
  }, [next, router]);

  async function lanjut(e: React.FormEvent) {
    e.preventDefault();
    if (kirim) return;
    setPesan("");
    setKirim(true);
    try {
      const res = await fetch(daftar ? "/api/auth/buat-akun" : "/api/auth/masuk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password: sandi }),
        cache: "no-store",
      });
      const json = (await res.json()) as {
        berhasil?: boolean;
        pesan?: string;
        adalahAdmin?: boolean;
        masuk?: boolean;
      };
      if (!res.ok || !json.berhasil) {
        setPesan(
          json.pesan || (daftar ? "Pendaftaran belum berhasil. Coba lagi." : "Email atau kata sandi tidak valid."),
        );
        return;
      }
      if (daftar && json.masuk === false) {
        setPesan(json.pesan || "Akun sudah dibuat. Silakan Masuk.");
        setDaftar(false);
        return;
      }
      tandaiSesiBrowser();
      setSandi("");
      const tujuanAdmin = next.startsWith("/admin") || next.startsWith("/studio-kreator");
      const batasAdmin =
        situsHanyaAdmin() &&
        (next.startsWith("/rapor") || next.startsWith("/simulasi"));
      if (!json.adalahAdmin && tujuanAdmin) {
        router.replace("/403");
      } else if (!json.adalahAdmin && batasAdmin) {
        router.replace("/ruang-belajar");
      } else {
        router.replace(next);
      }
      router.refresh();
    } catch {
      setPesan("Tidak bisa menghubungi server. Coba lagi.");
    } finally {
      setKirim(false);
    }
  }

  const lengkap = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim()) && sandi.length >= (daftar ? 8 : 1);

  return (
    <main className="flex min-h-screen flex-1 flex-col items-center justify-center bg-[#1C01A5] px-4 py-8">
      <div className="w-full max-w-sm space-y-5">
        <header className="text-center text-white">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/icon-512.png"
            alt="Logo IGIL"
            width={96}
            height={96}
            className="mx-auto h-24 w-24 rounded-3xl shadow-lg ring-4 ring-amber-400"
          />
          <h1 className="mt-3 text-4xl font-black tracking-tight">$IGIL</h1>
          <p className="mt-1 text-sm font-bold text-indigo-100">Interactive Guided Independent Learning</p>
        </header>

        <section
          className="space-y-5"
          data-testid="gerbang-masuk"
          aria-label="Daftar atau Masuk"
        >
          <div className="grid grid-cols-2 gap-2" role="tablist" aria-label="Pilih Daftar atau Masuk">
            {[
              { nilai: true, label: "Daftar" },
              { nilai: false, label: "Masuk" },
            ].map((p) => (
              <button
                key={p.label}
                type="button"
                role="tab"
                aria-selected={daftar === p.nilai}
                data-testid={p.nilai ? "tab-daftar" : "tab-masuk"}
                onClick={() => {
                  setDaftar(p.nilai);
                  setPesan("");
                }}
                className={`rounded-none border-x-0 border-t-0 border-b-4 bg-transparent px-3 py-2 text-xl font-black ${
                  daftar === p.nilai
                    ? "border-amber-400 text-amber-400"
                    : "border-white/30 text-white hover:border-white"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          {memuat ? (
            <p className="py-8 text-center text-sm font-bold text-white" role="status">
              Menyiapkan…
            </p>
          ) : (
            <form onSubmit={(e) => void lanjut(e)} className="space-y-3">
              <p className="text-sm font-semibold leading-relaxed text-indigo-100">
                {daftar
                  ? "Buat akun gratis untuk masuk ke Ruang Belajar. Daftar bukan berlangganan."
                  : "Masuk ke akunmu. Capaian belajar tetap tersimpan."}
              </p>
              <div>
                <label htmlFor={idEmail} className="mb-1 block text-sm font-bold text-amber-400">
                  Email
                </label>
                <input
                  id={idEmail}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={KOTAK}
                  autoComplete="email"
                  placeholder="nama@contoh.com"
                  maxLength={120}
                />
              </div>
              <div>
                <label htmlFor={idSandi} className="mb-1 block text-sm font-bold text-amber-400">
                  Kata sandi{daftar ? " (minimal 8 karakter)" : ""}
                </label>
                <input
                  id={idSandi}
                  type="password"
                  value={sandi}
                  onChange={(e) => setSandi(e.target.value)}
                  className={KOTAK}
                  autoComplete={daftar ? "new-password" : "current-password"}
                  maxLength={72}
                />
              </div>
              {pesan ? (
                <p role="status" className="border-l-4 border-amber-400 py-1 pl-3 text-sm font-bold text-amber-300">
                  {pesan}
                </p>
              ) : null}
              <button
                type="submit"
                data-testid="tombol-kirim-akun"
                disabled={!lengkap || kirim}
                className={`w-full rounded-full px-4 py-3 text-lg font-black ${
                  lengkap && !kirim
                    ? "border-2 border-amber-400 bg-amber-400 text-indigo-950 hover:bg-amber-300"
                    : "cursor-not-allowed border-2 border-white/30 text-white/50"
                }`}
              >
                {kirim ? "Memproses…" : daftar ? "Daftar dan Masuk" : "Masuk"}
              </button>
            </form>
          )}
        </section>
        <p className="text-center">
          <Link href="/hubungi-kami" className="text-sm font-bold text-indigo-100 underline underline-offset-2">
            Hubungi Kami
          </Link>
        </p>
      </div>
    </main>
  );
}
