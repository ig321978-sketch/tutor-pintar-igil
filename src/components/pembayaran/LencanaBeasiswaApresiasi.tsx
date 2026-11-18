"use client";

import { useEffect, useState } from "react";

import { TEKS_BEASISWA_APRESIASI } from "@/lib/pembayaran-qris";

interface Lencana {
  id: string;
  teks: string;
}

/** Lencana di dasbor: beasiswa apresiasi 18% mengaktifkan bulan depan secara otomatis. */
export default function LencanaBeasiswaApresiasi() {
  const [daftar, setDaftar] = useState<Lencana[]>([]);

  useEffect(() => {
    let batal = false;
    void (async () => {
      try {
        const res = await fetch("/api/payments/notices", { cache: "no-store" });
        const json = (await res.json()) as { lencana?: Lencana[] };
        if (!batal) setDaftar(json.lencana ?? []);
      } catch {
        if (!batal) setDaftar([]);
      }
    })();
    return () => {
      batal = true;
    };
  }, []);

  if (daftar.length === 0) return null;

  async function tutup(id: string) {
    setDaftar((prev) => prev.filter((b) => b.id !== id));
    try {
      await fetch("/api/payments/notices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
    } catch {
      // Lencana tetap hilang di layar ini. Muat ulang akan menampilkannya lagi bila server menolak.
    }
  }

  return (
    <div className="mx-auto w-full max-w-5xl space-y-2 px-2">
      {daftar.map((b) => (
        <p
          key={b.id}
          data-testid="lencana-beasiswa-apresiasi"
          className="flex items-start gap-3 rounded-3xl border-4 border-amber-400 bg-amber-400 px-4 py-3 text-sm font-black leading-snug text-indigo-950"
        >
          <span className="min-w-0 flex-1">{b.teks || TEKS_BEASISWA_APRESIASI}</span>
          <button type="button" onClick={() => void tutup(b.id)} className="shrink-0 underline">
            Tutup
          </button>
        </p>
      ))}
    </div>
  );
}
