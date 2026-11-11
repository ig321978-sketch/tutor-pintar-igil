"use client";

import React, { forwardRef, useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

/** Penanda build UI pop-up tahap SMICPA. */
export const IGIL_POPUP_TAHAP_UI = "popup-tahap-smicpa-v2-hp-turun";

type Props = {
  nomor: number;
  judul: string;
  ringkas: string;
  emoji: string;
  /** Kelas warna lencana, mis. bg-[#FEE2E2] text-[#991B1B] */
  badgeClass: string;
  /** Tahap sudah terbuka (lulus tahap sebelumnya). */
  terbuka: boolean;
  /** Pop-up sedang ditampilkan. */
  buka: boolean;
  onBuka: () => void;
  onTutup: () => void;
  children: ReactNode;
  /** Banyak tahap dalam metode. Bawaan 6 (SMICPA). Bab pilot memakai 7 (SMISCPA). */
  jumlahTahap?: number;
  /** Nama metode di kepala pop-up. Bawaan SMICPA. */
  namaMetode?: string;
};

/**
 * Kartu tahap SMICPA (Story…Abstract). Isi penuh hanya muncul di pop-up
 * di atas tab mengambang, ukuran nyaman untuk desktop.
 */
export const PopUpTahapSmicpa = forwardRef<HTMLDivElement, Props>(function PopUpTahapSmicpa(
  { nomor, judul, ringkas, emoji, badgeClass, terbuka, buka, onBuka, onTutup, children, jumlahTahap = 6, namaMetode = "SMICPA" },
  ref,
) {
  const [portalSiap, setPortalSiap] = useState(false);

  useEffect(() => {
    setPortalSiap(true);
  }, []);

  useEffect(() => {
    if (!buka) return;
    const sebelumnya = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const tutup = (e: KeyboardEvent) => {
      if (e.key === "Escape") onTutup();
    };
    document.addEventListener("keydown", tutup);
    return () => {
      document.body.style.overflow = sebelumnya;
      document.removeEventListener("keydown", tutup);
    };
  }, [buka, onTutup]);

  const popup =
    portalSiap && buka && terbuka
      ? createPortal(
          <div
            className="fixed inset-0 z-[190] flex items-center justify-center p-3 sm:p-5"
            role="presentation"
            data-igil-tahap-ui={IGIL_POPUP_TAHAP_UI}
          >
            <button
              type="button"
              aria-label={`Tutup tahap ${judul}`}
              className="absolute inset-0 bg-[#1C01A5]/65 backdrop-blur-[2px]"
              onClick={onTutup}
            />
            <div
              role="dialog"
              aria-modal="true"
              aria-label={`Tahap ${nomor}: ${judul}`}
              className="relative z-[1] flex max-h-[min(94vh,58rem)] w-full max-w-5xl flex-col overflow-hidden rounded-[1.6rem] border-4 border-[#FFE566] bg-white shadow-[0_12px_40px_rgba(28,1,165,0.45)]"
            >
              <div className="flex shrink-0 items-center justify-between gap-2 border-b-2 border-[#1C01A5]/15 bg-[#1C01A5] px-3 py-2.5 sm:px-4">
                <div className="min-w-0">
                  <p className="text-[10px] font-black uppercase tracking-wide text-[#FFE566]/80">
                    Tahap {nomor} dari {jumlahTahap} · {namaMetode}
                  </p>
                  <p className="truncate text-sm font-black text-white sm:text-base">
                    {emoji} {judul}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onTutup}
                  className="shrink-0 rounded-full border-2 border-[#FFE566] bg-[#FFE566] px-3 py-1.5 text-sm font-black text-[#1C01A5] shadow-[0_3px_0_rgba(0,0,0,0.25)]"
                >
                  ✕ Tutup
                </button>
              </div>
              <div className="min-h-0 flex-1 overflow-x-auto overflow-y-auto overscroll-contain bg-[#FFFDF9] p-2 sm:p-4 [scrollbar-color:#F0AB00_#EEF2FF] [scrollbar-width:thin]">
                {children}
              </div>
            </div>
          </div>,
          document.body,
        )
      : null;

  return (
    <div
      ref={ref}
      className="w-full shrink-0 snap-start md:w-[min(42vw,16.5rem)] lg:w-auto lg:min-w-0 lg:flex-1"
      data-igil-tahap-ui={IGIL_POPUP_TAHAP_UI}
    >
      <article
        className={`overflow-hidden rounded-3xl border-4 bg-white shadow-[0_5px_0_rgba(28,1,165,0.22)] ${
          buka && terbuka ? "border-amber-400 ring-2 ring-amber-200" : terbuka ? "border-[#1C01A5]" : "border-[#1C01A5]/35 opacity-70"
        }`}
      >
        <button
          type="button"
          disabled={!terbuka}
          onClick={onBuka}
          aria-label={terbuka ? `Buka tahap ${nomor}: ${judul}` : `Tahap ${nomor} masih terkunci`}
          className="flex w-full flex-col gap-2 p-3 text-left disabled:cursor-not-allowed"
        >
          <span className={`inline-flex w-fit rounded-full px-2.5 py-0.5 text-[10px] font-black ${badgeClass}`}>
            Tahap {nomor}
          </span>
          <span className="text-3xl leading-none" aria-hidden="true">
            {emoji}
          </span>
          <span className="text-base font-black leading-tight text-[#1C01A5]">{judul}</span>
          <span className="text-[11px] font-bold leading-snug text-[#1C01A5]/70">{ringkas}</span>
          <span
            className={`mt-1 w-full rounded-full border-2 px-3 py-1.5 text-center text-sm font-black ${
              !terbuka
                ? "border-[#94A3B8] bg-[#E2E8F0] text-[#64748B]"
                : buka
                  ? "border-[#FFE566] bg-amber-100 text-[#1C01A5]"
                  : "border-[#FFE566] bg-[#1C01A5] text-[#FFE566]"
            }`}
          >
            {!terbuka ? "🔒 Terkunci" : buka ? "▶ Sedang dibuka" : "▶ Buka"}
          </span>
        </button>
      </article>
      {popup}
    </div>
  );
});
