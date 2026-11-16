"use client";

import { useRef, useState, type PointerEvent, type ReactNode } from "react";

/**
 * Seret-dan-lepas lewat pointer (jari atau tetikus). Ketukan singkat (tanpa geser) memanggil `saatKetuk`,
 * sehingga semua aktivitas tetap bisa dikerjakan dengan mengetuk saja.
 * Target lepas ditandai atribut data-target="id".
 */
export function useSeretan(opsi: {
  saatLepas: (idItem: string, idTarget: string) => void;
  saatKetuk?: (idItem: string) => void;
}) {
  const { saatLepas, saatKetuk } = opsi;
  const awal = useRef<{ x: number; y: number; id: string; geser: boolean } | null>(null);
  const [hantu, setHantu] = useState<{ x: number; y: number; isi: ReactNode } | null>(null);

  function ikat(id: string, isi: ReactNode) {
    return {
      onPointerDown: (e: PointerEvent<HTMLElement>) => {
        awal.current = { x: e.clientX, y: e.clientY, id, geser: false };
        e.currentTarget.setPointerCapture(e.pointerId);
      },
      onPointerMove: (e: PointerEvent<HTMLElement>) => {
        const a = awal.current;
        if (!a) return;
        if (!a.geser && Math.hypot(e.clientX - a.x, e.clientY - a.y) > 8) a.geser = true;
        if (a.geser) setHantu({ x: e.clientX, y: e.clientY, isi });
      },
      onPointerUp: (e: PointerEvent<HTMLElement>) => {
        const a = awal.current;
        awal.current = null;
        setHantu(null);
        if (!a) return;
        if (!a.geser) {
          saatKetuk?.(a.id);
          return;
        }
        const el = document.elementFromPoint(e.clientX, e.clientY)?.closest<HTMLElement>("[data-target]");
        if (el?.dataset.target) saatLepas(a.id, el.dataset.target);
      },
      onPointerCancel: () => {
        awal.current = null;
        setHantu(null);
      },
      style: { touchAction: "none" as const },
    };
  }

  const bayangan = hantu ? (
    <div
      aria-hidden
      className="pointer-events-none fixed z-50 -translate-x-1/2 -translate-y-1/2 text-4xl opacity-90 drop-shadow-lg"
      style={{ left: hantu.x, top: hantu.y }}
    >
      {hantu.isi}
    </div>
  ) : null;

  return { ikat, bayangan };
}
