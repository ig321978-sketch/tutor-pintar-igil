"use client";

import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";

/**
 * Kotak masukan admin: Kritik dan Saran siswa dari kartu Tahap (teks hasil rekam suara), plus jawaban AI-nya.
 * Data hanya terbaca oleh admin (RPC daftar_masukan_admin menolak akun lain). Status: baru, dibaca, selesai.
 */

type Masukan = { id: string; jenis: string; bab: string; tahap: string; isi: string; jawaban: string | null; status: string; tanggal: string; dibuat: string; akun: string | null };
const FILTER = [
  { kunci: "baru", nama: "Baru" },
  { kunci: "dibaca", nama: "Dibaca" },
  { kunci: "selesai", nama: "Selesai" },
  { kunci: "", nama: "Semua" },
];
const WARNA: Record<string, string> = { kritik: "bg-[#FEE2E2] text-[#991B1B]", saran: "bg-[#FEF3C7] text-[#92400E]", pertanyaan: "bg-[#DBEAFE] text-[#1E40AF]" };

export default function KotakMasukan() {
  const [filter, setFilter] = useState("baru");
  const [semua, setSemua] = useState(false);
  const [daftar, setDaftar] = useState<Masukan[]>([]);
  const [info, setInfo] = useState("Memuat...");

  const muat = useCallback(async () => {
    setInfo("Memuat...");
    try {
      const r = await fetch(`/api/masukan/admin?status=${filter}${semua ? "&semua=1" : ""}`, { cache: "no-store" });
      const j = (await r.json()) as { status?: string; daftar?: Masukan[] };
      if (j.status === "ok") {
        setDaftar(j.daftar ?? []);
        setInfo((j.daftar ?? []).length ? "" : "Belum ada masukan di sini.");
      } else {
        setDaftar([]);
        setInfo(
          j.status === "bukan_admin"
            ? "Halaman ini khusus admin."
            : j.status === "belum_masuk"
              ? "Masuk dulu dengan akun admin."
              : j.status === "belum_siap"
                ? "Tabel masukan belum dibuat. Jalankan supabase/migrations/07_masukan_tahap.sql di Supabase."
                : "Server belum bisa memuat masukan.",
        );
      }
    } catch {
      setInfo("Server belum bisa dihubungi.");
    }
  }, [filter, semua]);

  useEffect(() => {
    // Memuat ulang saat filter berubah.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void muat();
  }, [muat]);

  const ubahStatus = async (id: string, status: string) => {
    await fetch("/api/masukan/admin", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, status }) });
    void muat();
  };

  return (
    <main className="mx-auto min-h-screen max-w-3xl space-y-4 bg-[#FFFDF9] px-4 py-6">
      <div className="flex items-center justify-between gap-2">
        <h1 className="text-2xl font-black text-[#1C01A5]">{"\u{1F4EC}"} Kotak Masukan</h1>
        <Link href="/ruang-belajar" className="rounded-full border-2 border-[#1C01A5] bg-white px-3 py-1.5 text-sm font-black text-[#1C01A5]">
          Ruang Belajar
        </Link>
      </div>
      <p className="text-sm font-bold text-[#1C01A5]/70">Kritik dan saran siswa dari kartu Tahap. Tandai dibaca atau selesai setelah diperbaiki.</p>
      <div className="flex flex-wrap items-center gap-2">
        {FILTER.map((f) => (
          <button
            key={f.nama}
            type="button"
            onClick={() => setFilter(f.kunci)}
            className={`min-h-[40px] rounded-full border-2 px-4 text-sm font-black ${filter === f.kunci ? "border-[#1C01A5] bg-[#1C01A5] text-[#FFE566]" : "border-[#1C01A5]/30 bg-white text-[#1C01A5]"}`}
          >
            {f.nama}
          </button>
        ))}
        <label className="ml-auto flex items-center gap-1.5 text-sm font-bold text-[#1C01A5]">
          <input type="checkbox" checked={semua} onChange={(e) => setSemua(e.target.checked)} /> Tampilkan juga pertanyaan
        </label>
      </div>
      {info ? <p className="rounded-2xl border-2 border-dashed border-[#1C01A5]/30 p-4 text-center text-sm font-bold text-[#1C01A5]/70">{info}</p> : null}
      <ul className="space-y-3">
        {daftar.map((m) => (
          <li key={m.id} className="space-y-2 rounded-2xl border-2 border-[#1C01A5]/20 bg-white p-3 shadow-sm">
            <div className="flex flex-wrap items-center gap-2 text-xs font-black">
              <span className={`rounded-full px-2 py-0.5 uppercase ${WARNA[m.jenis] ?? ""}`}>{m.jenis}</span>
              <span className="text-[#1C01A5]">
                {m.bab} · {m.tahap}
              </span>
              <span className="text-[#64748B]">{new Date(m.dibuat).toLocaleString("id-ID", { timeZone: "Asia/Jakarta" })}</span>
              <span className="text-[#64748B]">{m.akun ?? "-"}</span>
              <span className="ml-auto rounded-full bg-[#F1F5F9] px-2 py-0.5 text-[#334155]">{m.status}</span>
            </div>
            <p className="text-base font-bold text-[#0F172A]">{m.isi}</p>
            {m.jawaban ? <p className="rounded-xl bg-[#F0FDF4] p-2 text-sm text-[#14532D]">Jawaban AI: {m.jawaban}</p> : null}
            <div className="flex gap-2">
              {m.status !== "dibaca" ? (
                <button type="button" onClick={() => ubahStatus(m.id, "dibaca")} className="min-h-[40px] rounded-full border-2 border-[#1C01A5]/40 bg-white px-3 text-xs font-black text-[#1C01A5]">
                  Tandai dibaca
                </button>
              ) : null}
              {m.status !== "selesai" ? (
                <button type="button" onClick={() => ubahStatus(m.id, "selesai")} className="min-h-[40px] rounded-full border-2 border-[#16A34A] bg-[#F0FDF4] px-3 text-xs font-black text-[#15803D]">
                  {"\u{2705}"} Sudah diperbaiki
                </button>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
