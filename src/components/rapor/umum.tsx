"use client";

import { useMemo, useSyncExternalStore, type ReactNode } from "react";
import { bacaProgres } from "@/lib/progres";

export type ProfilTampil = { nama: string; kelas: string; kota: string };

const tanpaLangganan = () => () => {};

/** Profil siswa dari localStorage. Di server dan saat hidrasi awal memakai nilai bawaan. */
export function useProfilSiswa(): ProfilTampil {
  const mentah = useSyncExternalStore(
    tanpaLangganan,
    () => window.localStorage.getItem("igil-progres-v1") ?? "",
    () => "",
  );
  return useMemo(() => {
    const bawaan = { nama: "Siswa $IGIL", kelas: "Kelas 1 SD", kota: "Indonesia" };
    if (!mentah) return bawaan;
    const p = bacaProgres().profil;
    return {
      nama: p.nama.trim() || bawaan.nama,
      kelas: p.kelas.trim() ? (/kelas/i.test(p.kelas) ? p.kelas.trim() : `Kelas ${p.kelas.trim()}`) : bawaan.kelas,
      kota: p.kota.trim() || bawaan.kota,
    };
  }, [mentah]);
}

/** Tanggal hari ini; null di server agar tidak terjadi selisih hidrasi. */
export function useHariIni(): Date | null {
  const hari = useSyncExternalStore(
    tanpaLangganan,
    () => new Date().toDateString(),
    () => "",
  );
  return useMemo(() => (hari ? new Date() : null), [hari]);
}

/** Penanda berganti tiap menit (null di server). */
export function usePenandaMenit(): string | null {
  const menit = useSyncExternalStore(
    (kabar) => {
      const t = window.setInterval(kabar, 30000);
      return () => window.clearInterval(t);
    },
    () => String(Math.floor(Date.now() / 60000)),
    () => "",
  );
  return menit || null;
}

export function rupiah(angka: number): string {
  return `Rp ${new Intl.NumberFormat("id-ID").format(angka)}`;
}

export function angkaId(angka: number): string {
  return new Intl.NumberFormat("id-ID").format(angka);
}

/** Kepala halaman: kanvas biru ungu royal dengan lencana emas. */
export function KepalaHalaman({
  lencana,
  judul,
  subjudul,
  ikon,
}: {
  lencana: string;
  judul: string;
  subjudul: string;
  ikon: string;
}) {
  return (
    <header className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900 via-violet-900 to-indigo-950 p-5 text-white shadow-lg sm:p-8">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-4 -top-6 select-none text-[8rem] leading-none opacity-15 sm:text-[11rem]"
      >
        {ikon}
      </span>
      <span className="inline-block rounded-full bg-amber-400 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-indigo-950">
        {lencana}
      </span>
      <h1 className="relative mt-3 break-words text-2xl font-black leading-tight sm:text-4xl">{judul}</h1>
      <p className="relative mt-2 max-w-3xl text-sm font-semibold leading-relaxed text-indigo-100 sm:text-base">
        {subjudul}
      </p>
    </header>
  );
}

export type SubTab = { id: string; label: string; description: string };

/** Sub-tab besar: tombol penuh dengan penjelasan satu kalimat. */
export function SubTabBar({
  tabs,
  aktif,
  onPilih,
}: {
  tabs: readonly SubTab[];
  aktif: string;
  onPilih: (id: string) => void;
}) {
  return (
    <div role="tablist" className="grid gap-2 sm:grid-cols-2">
      {tabs.map((tab) => {
        const menyala = tab.id === aktif;
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={menyala}
            onClick={() => onPilih(tab.id)}
            className={`rounded-2xl p-3 text-left transition-colors ${
              menyala
                ? "border-amber-400 bg-[#1C01A5] text-white shadow-md"
                : "border-indigo-100 bg-white text-indigo-950 hover:border-amber-400"
            }`}
          >
            <span className="block text-base font-black">{tab.label}</span>
            <span
              className={`mt-1 block text-xs font-semibold leading-snug ${
                menyala ? "text-indigo-100" : "text-indigo-950/70"
              }`}
            >
              {tab.description}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export function SpanduContoh({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border-2 border-dashed border-amber-400 bg-amber-50 p-3 text-sm font-bold text-indigo-950">
      <span aria-hidden="true" className="text-xl leading-none">
        🧪
      </span>
      <p className="min-w-0 flex-1 leading-snug">{children}</p>
    </div>
  );
}

/** Koin emas SVG (emoji koin tidak tampil di Windows lama). */
export function Koin({ kelas = "h-4 w-4" }: { kelas?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`inline-block shrink-0 align-[-0.15em] ${kelas}`} aria-hidden="true">
      <circle cx="12" cy="12" r="10.5" fill="#F0AB00" stroke="#1C01A5" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="7" fill="#FFE566" stroke="#B87F00" strokeWidth="1" />
      <path d="M12 7.2l1.3 3 3.2.3-2.4 2.1.7 3.1L12 14l-2.8 1.7.7-3.1-2.4-2.1 3.2-.3z" fill="#1C01A5" />
    </svg>
  );
}

export function LencanaToken({ children, kelas = "" }: { children: ReactNode; kelas?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full bg-amber-400 px-3 py-1 text-sm font-black text-indigo-950 ${kelas}`}
    >
      <Koin kelas="h-5 w-5" />
      {children}
    </span>
  );
}
