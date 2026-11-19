"use client";

import { useId, useState } from "react";

import { kelasKotak, kelasLabel } from "@/lib/tema";

const KARTU = "space-y-4 rounded-3xl border-2 border-indigo-100 bg-white p-4 shadow-sm sm:p-5";

async function panggil<T>(url: string, isi: unknown): Promise<T | null> {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(isi),
      cache: "no-store",
    });
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

/**
 * Buat akun atau masuk orang tua. Dipakai di Pendaftaran Anak dan di Akun & Langganan.
 */
export default function KartuAkunOrtu({
  onMasuk,
  judul = "Akun orang tua",
  className = "",
}: {
  onMasuk: () => void;
  judul?: string;
  className?: string;
}) {
  const idEmail = useId();
  const idSandi = useId();
  const [buat, setBuat] = useState(true);
  const [email, setEmail] = useState("");
  const [sandi, setSandi] = useState("");
  const [kirim, setKirim] = useState(false);
  const [pesan, setPesan] = useState("");

  async function lanjut() {
    setKirim(true);
    setPesan("");
    const res = await panggil<{ berhasil: boolean; masuk?: boolean; pesan?: string }>(
      buat ? "/api/auth/buat-akun" : "/api/auth/masuk",
      { email, password: sandi },
    );
    setKirim(false);
    if (!res) {
      setPesan("Tidak ada sinyal. Coba lagi sebentar.");
      return;
    }
    if (!res.berhasil) {
      setPesan(res.pesan ?? "Belum berhasil. Periksa isian lalu coba lagi.");
      return;
    }
    if (buat && res.masuk === false) {
      setPesan(res.pesan ?? "Akun dibuat. Silakan pilih Masuk.");
      setBuat(false);
      return;
    }
    setSandi("");
    onMasuk();
  }

  const lengkap = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim()) && sandi.length >= 8;

  return (
    <form
      className={`${KARTU} ${className}`.trim()}
      aria-label="Akun orang tua"
      data-testid="kartu-akun-ortu"
      onSubmit={(e) => {
        e.preventDefault();
        if (lengkap && !kirim) void lanjut();
      }}
    >
      <div>
        <h2 className="text-lg font-black text-indigo-950">{judul}</h2>
        <p className="mt-1 text-xs font-semibold leading-relaxed text-slate-600">
          Email hanya untuk masuk. Tanpa akun pun Silabus dan Materi bisa dibuka. Akun diperlukan untuk Ranking,
          Rapor, dan berlangganan Latihan, Ujian, serta Praktikum.
        </p>
      </div>

      <div className="flex gap-2" role="tablist" aria-label="Pilih cara masuk">
        {[
          { nilai: true, label: "Buat akun baru" },
          { nilai: false, label: "Sudah punya akun" },
        ].map((p) => (
          <button
            key={p.label}
            type="button"
            role="tab"
            aria-selected={buat === p.nilai}
            onClick={() => {
              setBuat(p.nilai);
              setPesan("");
            }}
            className={`flex-1 rounded-2xl border-2 px-3 py-2 text-sm font-black ${
              buat === p.nilai
                ? "border-amber-400 bg-amber-400 text-indigo-950"
                : "border-indigo-100 bg-white text-indigo-950 hover:border-amber-400"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div>
        <label htmlFor={idEmail} className={kelasLabel}>
          Email orang tua
        </label>
        <input
          id={idEmail}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={kelasKotak}
          autoComplete="email"
          placeholder="nama@contoh.com"
          maxLength={120}
        />
      </div>
      <div>
        <label htmlFor={idSandi} className={kelasLabel}>
          Kata sandi {buat ? "(minimal 8 karakter)" : ""}
        </label>
        <input
          id={idSandi}
          type="password"
          value={sandi}
          onChange={(e) => setSandi(e.target.value)}
          className={kelasKotak}
          autoComplete={buat ? "new-password" : "current-password"}
          maxLength={72}
        />
      </div>

      {pesan ? (
        <p role="status" className="rounded-2xl border-2 border-amber-400 bg-amber-50 p-3 text-sm font-bold text-indigo-950">
          {pesan}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={!lengkap || kirim}
        className={`w-full rounded-2xl px-4 py-3 text-base font-black shadow-md ${
          lengkap && !kirim
            ? "bg-amber-400 text-indigo-950 hover:bg-amber-300"
            : "cursor-not-allowed bg-slate-200 text-slate-500 shadow-none"
        }`}
      >
        {kirim ? "Memproses…" : buat ? "Buat Akun dan Lanjut" : "Masuk dan Lanjut"}
      </button>
    </form>
  );
}
