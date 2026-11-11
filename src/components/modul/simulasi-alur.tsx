"use client";

import React, { useRef, useState } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { TOMBOL_BIASA, TOMBOL_UTAMA } from "./simulasi-bersama";

/* ------------------------------------------------------------------------ */
/* Alur tab Simulasi, dipakai semua bab. Satu simulasi per layar, tombol      */
/* LANJUTKAN berurutan, dan Latihan baru dituju setelah simulasi terakhir.    */
/*  - mode "sentuh": simulasi dihitung dimainkan setelah disentuh sekali       */
/*    (PhET, lab). Tombol suara tidak dihitung.                               */
/*  - mode "tuntas": simulasi memanggil tuntas() sendiri saat mencapai keadaan */
/*    akhir (mesin keadaan sampai Selesai, skenario sampai adegan Akhir).     */
/* ------------------------------------------------------------------------ */

export type LangkahSim = {
  /** Nama metode, ditampilkan kecil di bawah nomor: "PhET", "Mesin keadaan", "Skenario", "Lab 2D". */
  metode: string;
  /** Nama simulasi. */
  sub: string;
  /** Petunjuk selama LANJUTKAN belum aktif. */
  petunjuk: string;
  /**
   * Misi satu kalimat pendek di atas simulasi: langkah pertama yang harus dicoba anak. Dibacakan guru saat anak
   * berpindah ke simulasi ini, dan bisa didengar lagi lewat tombol suara. Wajib untuk simulasi di dalam Materi.
   */
  misi?: string;
  mode: "sentuh" | "tuntas";
  render: (api: { speakGuru: (t: string) => void; tuntas: () => void }) => React.ReactNode;
};

const KOLOM: Record<number, string> = { 1: "sm:grid-cols-1", 2: "sm:grid-cols-2", 3: "sm:grid-cols-3", 4: "sm:grid-cols-4" };

export default function SimulasiAlur({
  judulBab,
  langkah,
  speakGuru,
  onKeLatihan,
  onSelesai,
  teksAkhir,
  dalamPopup = false,
}: {
  judulBab: string;
  langkah: LangkahSim[];
  speakGuru: (t: string) => void;
  /** Dipanggil di simulasi terakhir pada tab Simulasi (menuju Latihan). */
  onKeLatihan?: () => void;
  /** Dipakai bila simulasi berada di dalam Materi (SMISCPA): menuju tahap berikutnya. Menang atas onKeLatihan. */
  onSelesai?: () => void;
  /** Teks tombol di simulasi terakhir. Bawaan: LANJUTKAN KE LATIHAN. */
  teksAkhir?: string;
  /** Di dalam pop-up Materi, layar yang menggulir adalah pop-up, bukan jendela. */
  dalamPopup?: boolean;
}) {
  const jumlah = langkah.length;
  const akar = useRef<HTMLElement | null>(null);
  const [ke, setKe] = useState(0);
  const [dimainkan, setDimainkan] = useState<boolean[]>(() => langkah.map(() => false));
  const ini = langkah[ke];
  const siap = dimainkan[ke];
  const terakhir = ke === jumlah - 1;

  const tuntas = (i: number) => setDimainkan((prev) => (prev[i] ? prev : prev.map((x, k) => (k === i ? true : x))));

  /** Menyentuh benda, tombol, atau kotak centang di dalam simulasi dihitung "dimainkan". Tombol suara tidak dihitung. */
  const tandai = (e: React.SyntheticEvent) => {
    const t = e.target as HTMLElement;
    if (!t.closest('button, [role="button"], [role="checkbox"]')) return;
    if (t.closest('[aria-label^="Dengarkan"]')) return;
    tuntas(ke);
  };
  const tandaiKunci = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") tandai(e);
  };

  const pindah = (tujuan: number) => {
    setKe(tujuan);
    if (dalamPopup) akar.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    else window.scrollTo({ top: 0, behavior: "smooth" });
    // Berpindah lewat ketukan anak, jadi suara boleh langsung berbunyi.
    const misiTujuan = langkah[tujuan]?.misi;
    if (misiTujuan) speakGuru(`Simulasi ${tujuan + 1}. Misi: ${misiTujuan}`);
  };

  const lanjut = () => {
    if (!siap) return;
    if (terakhir) (onSelesai ?? onKeLatihan)?.();
    else pindah(ke + 1);
  };

  return (
    <section
      ref={akar}
      className={`mx-auto space-y-4 rounded-3xl border-2 border-indigo-100 bg-indigo-50/40 p-3 md:p-6 ${dalamPopup ? "w-full" : "mt-4 w-[98%]"}`}
      aria-label={`Laboratorium Simulasi ${judulBab}`}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <span className="rounded-full bg-[#1C01A5] px-3 py-1 text-xs font-black uppercase text-[#FFE566]">LABORATORIUM SIMULASI • {judulBab}</span>
          <p className="mt-1 text-sm font-bold text-[#1C01A5]/80">Bermain bebas. Tidak ada nilai dan tidak ada salah. Ayo bereksperimen!</p>
        </div>
        <TombolSuaraGuru
          label="Dengarkan petunjuk simulasi"
          onClick={() =>
            speakGuru(
              "Selamat datang di Laboratorium Simulasi. Di sini kamu boleh bermain bebas. Geser, ketuk, dan tekan plus atau minus. Lihat apa yang berubah. Tidak ada nilai dan tidak ada yang salah."
            )
          }
        />
      </div>

      <ol className={`grid ${jumlah === 1 ? "grid-cols-1" : "grid-cols-2"} gap-2 ${KOLOM[Math.min(jumlah, 4)]}`} aria-label={`Simulasi ${ke + 1} dari ${jumlah}`}>
        {langkah.map((s, i) => (
          <li
            key={s.sub}
            aria-current={i === ke ? "step" : undefined}
            className={`min-w-0 rounded-2xl border-4 px-3 py-1.5 font-black ${
              i === ke
                ? "border-[#F0AB00] bg-[#1C01A5] text-[#FFE566]"
                : dimainkan[i]
                  ? "border-[#7FCB96] bg-[#E8F7EE] text-[#14532D]"
                  : "border-[#1C01A5]/30 bg-white text-[#1C01A5]/60"
            }`}
          >
            <span className="block text-sm leading-tight">
              {dimainkan[i] && i !== ke ? "✔ " : ""}Simulasi {i + 1} dari {jumlah}
            </span>
            <span className="block text-[10px] uppercase leading-tight tracking-wide opacity-80">
              {s.metode} • {s.sub}
            </span>
          </li>
        ))}
      </ol>

      {langkah.map((s, i) => (
        <div
          key={s.sub}
          hidden={i !== ke}
          {...(s.mode === "sentuh" ? { onPointerDownCapture: tandai, onClickCapture: tandai, onKeyDownCapture: tandaiKunci } : {})}
        >
          {s.misi ? (
            <div className="mb-3 flex items-center gap-2 rounded-2xl border-4 border-[#F0AB00] bg-[#FFF7CC] px-3 py-2">
              <span className="text-2xl leading-none" aria-hidden="true">
                🎯
              </span>
              <p className="min-w-0 flex-1 text-base font-black leading-snug text-[#1C01A5]">
                <span className="block text-[10px] uppercase tracking-wide text-[#7C4A03]">Misi</span>
                {s.misi}
              </p>
              <TombolSuaraGuru kecil label="Dengarkan misi" onClick={() => speakGuru(`Misi: ${s.misi}`)} />
            </div>
          ) : null}
          {s.render({ speakGuru, tuntas: () => tuntas(i) })}
        </div>
      ))}

      <div className="flex flex-wrap items-start justify-between gap-2 pt-1">
        {ke > 0 ? (
          <button type="button" onClick={() => pindah(ke - 1)} className={TOMBOL_BIASA}>
            ⬅️ KEMBALI
          </button>
        ) : (
          <span />
        )}
        <div className="flex flex-col items-end gap-1">
          <button type="button" onClick={lanjut} aria-disabled={!siap} className={`${TOMBOL_UTAMA} px-6 py-3 ${siap ? "" : "opacity-50"}`}>
            {terakhir ? (teksAkhir ?? "LANJUTKAN KE LATIHAN ➡️") : "LANJUTKAN KE SIMULASI BERIKUTNYA ➡️"}
          </button>
          {siap ? null : (
            <p role="status" className="text-xs font-black text-[#1C01A5]/80">
              {ini.petunjuk}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
