"use client";

import { useRef } from "react";
import { Pause, Play } from "lucide-react";

export function formatDurasi(detik: number): string {
  if (!Number.isFinite(detik) || detik < 0) return "0:00";
  const menit = Math.floor(detik / 60);
  const sisa = Math.floor(detik % 60);
  return `${menit}:${sisa.toString().padStart(2, "0")}`;
}

export default function PemutarTutorMengambang({
  memutar,
  waktu,
  durasi,
  padaToggle,
  padaUlang,
  disabled = false,
}: {
  memutar: boolean;
  waktu: number;
  durasi: number;
  padaToggle: () => void;
  padaUlang: (detik: number) => void;
  disabled?: boolean;
}) {
  const jalurRef = useRef<HTMLDivElement | null>(null);
  const batasGeserRef = useRef(0);
  const menggeserRef = useRef(false);

  const persen = durasi > 0 ? Math.min(100, (waktu / durasi) * 100) : 0;

  const detikDariX = (clientX: number) => {
    const el = jalurRef.current;
    if (!el || durasi <= 0) return 0;
    const kotak = el.getBoundingClientRect();
    const rasio = Math.min(1, Math.max(0, (clientX - kotak.left) / kotak.width));
    return rasio * durasi;
  };

  const terapkanGeser = (clientX: number) => {
    const calon = detikDariX(clientX);
    if (calon >= batasGeserRef.current - 0.05) return;
    padaUlang(Math.max(0, calon));
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/15 bg-[#1C01A5] px-3 pt-3 shadow-[0_-10px_30px_rgba(28,1,165,0.28)] pb-[max(0.75rem,env(safe-area-inset-bottom))]">
      <div className="mx-auto flex max-w-3xl items-center gap-3">
        <button
          type="button"
          onClick={padaToggle}
          disabled={disabled}
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#F0AB00] text-[#1C01A5] shadow-md transition-all hover:bg-[#e09e00] disabled:opacity-50"
          title={memutar ? "Jeda" : "Putar"}
          aria-label={memutar ? "Jeda tutor suara" : "Putar tutor suara"}
        >
          {memutar ? (
            <Pause className="h-5 w-5 fill-current" />
          ) : (
            <Play className="h-5 w-5 fill-current" />
          )}
        </button>

        <div className="min-w-0 flex-1">
          <div
            ref={jalurRef}
            className="relative h-8 cursor-pointer touch-none select-none"
            onPointerDown={(peristiwa) => {
              if (disabled || durasi <= 0) return;
              menggeserRef.current = true;
              batasGeserRef.current = waktu;
              jalurRef.current?.setPointerCapture(peristiwa.pointerId);
              terapkanGeser(peristiwa.clientX);
            }}
            onPointerMove={(peristiwa) => {
              if (!menggeserRef.current) return;
              terapkanGeser(peristiwa.clientX);
            }}
            onPointerUp={() => {
              menggeserRef.current = false;
            }}
            onPointerCancel={() => {
              menggeserRef.current = false;
            }}
            role="slider"
            aria-label="Timer tutor suara. Geser kiri untuk mengulang. Tidak bisa loncat ke depan."
            aria-valuemin={0}
            aria-valuemax={Math.round(durasi)}
            aria-valuenow={Math.round(waktu)}
            tabIndex={disabled ? -1 : 0}
            onKeyDown={(peristiwa) => {
              if (disabled) return;
              if (peristiwa.key === "ArrowLeft" || peristiwa.key === "ArrowDown") {
                peristiwa.preventDefault();
                padaUlang(Math.max(0, waktu - 3));
              }
            }}
          >
            <div className="absolute inset-x-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-white/20" />
            <div
              className="absolute top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-[#F0AB00]"
              style={{ width: `${persen}%` }}
            />
            <div
              className="absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#1C01A5] bg-[#F0AB00] shadow"
              style={{ left: `${persen}%` }}
            />
          </div>
          <div className="mt-0.5 flex justify-between text-[10px] font-bold tabular-nums text-white/80">
            <span>{formatDurasi(waktu)}</span>
            <span>{formatDurasi(durasi)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
