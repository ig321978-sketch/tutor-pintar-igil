"use client";

import React, { useState } from "react";
import { BingkaiTahap } from "./BingkaiTahap";
import { PanelPoster } from "./SubBabBBanding";
import { PitaTahap, TombolSuaraGuru } from "./tahap-b-gaya";
import { PoinPentingK2, type ItemPoin } from "./kit-k2";
import type { LangkahPeta } from "./PetaPikiranB";
import { SUB_A, SUB_B, SUB_C, type SubBabNaskah } from "./naskah-k2b2";

/* ------------------------------------------------------------------------ */
/* Kerangka bersama Kelas 2 Bab 2: poster Infografis dari naskah, halaman      */
/* Poin Penting dari naskah, dan peta pikiran. Isi teks hanya ada di           */
/* naskah-k2b2.ts (satu sumber dengan JSON bab). Tanpa API.                    */
/* ------------------------------------------------------------------------ */

export const PETA_PIKIRAN_K2B2A: LangkahPeta[] = SUB_A.mindMaps;
export const PETA_PIKIRAN_K2B2B: LangkahPeta[] = SUB_B.mindMaps;
export const PETA_PIKIRAN_K2B2C: LangkahPeta[] = SUB_C.mindMaps;

const WARNA_PANEL = ["#2563EB", "#7C3AED", "#0F766E", "#DB2777", "#B45309", "#4338CA", "#16A34A", "#EA580C", "#0E7490", "#9333EA"];

/** Poster Infografis: tiap panel membawa gambar dari `visual` dan suara dari naskah. Belum ada yang perlu dijawab. */
export function InfografisK2B2({
  s,
  judul,
  suaraInfo,
  visual,
  speakGuru,
}: {
  s: SubBabNaskah;
  judul: string;
  suaraInfo: string;
  visual: React.ReactNode[];
  speakGuru: (teks: string, selesai?: () => void) => void;
}) {
  const [didengar, setDidengar] = useState<number[]>([]);
  const semua = didengar.length >= s.infografis.length && s.infografis.length > 0;

  return (
    <BingkaiTahap tahap={3} className="space-y-3">
      <PitaTahap ikon="📰" nama="INFOGRAFIS" cara="Lihat dan dengar" warna="#16A34A" />
      <div className="flex items-center justify-between gap-2">
        <h3 className="min-w-0 text-xl font-black leading-tight text-[#1C01A5]">{judul}</h3>
        <TombolSuaraGuru onClick={() => speakGuru(suaraInfo)} />
      </div>
      <p className="rounded-2xl border-2 border-dashed border-[#1C01A5]/35 bg-white/80 px-3 py-1.5 text-center text-[11px] font-black text-[#1C01A5]">
        Lihat gambar dulu. Ketuk 🔊 — centang ✔ Didengar muncul setelah suara guru selesai.
      </p>
      {s.infografis.map((p, i) => (
        <PanelPoster
          key={p.judul}
          nomor={i + 1}
          judul={p.judul.toUpperCase()}
          warna={WARNA_PANEL[i % WARNA_PANEL.length]}
          speakGuru={speakGuru}
          suara={p.suara}
          teksVisual={p.teksVisual}
          onSelesaiSuara={() => setDidengar((d) => (d.includes(i + 1) ? d : [...d, i + 1]))}
        >
          {visual[i] ?? null}
        </PanelPoster>
      ))}
      <div className="flex items-center justify-center gap-2 pt-1" aria-label={`${didengar.length} dari ${s.infografis.length} panel didengar`}>
        {s.infografis.map((p, i) => (
          <span key={p.judul} className="text-2xl" aria-hidden="true">
            {didengar.includes(i + 1) ? "⭐" : "☆"}
          </span>
        ))}
      </div>
      <p
        className={`rounded-2xl border-4 px-3 py-2 text-center text-sm font-black leading-snug ${
          semua ? "igil-muncul border-[#7FCB96] bg-[#E8F7EE] text-[#14532D]" : "border-dashed border-[#1C01A5]/40 bg-white/80 text-[#1C01A5]"
        }`}
      >
        {semua
          ? "🌟 Hebat! Semua panel Infografis sudah didengar."
          : `🔊 ${didengar.length}/${s.infografis.length} panel didengar — centang muncul setelah suara selesai`}
      </p>
    </BingkaiTahap>
  );
}

export function poinItem(s: SubBabNaskah): ItemPoin[] {
  return s.poin.map((p) => ({
    ikon: p.ikon,
    nama: p.nama,
    suara: p.suara,
    isi: <p className="text-center text-base font-black leading-snug text-[#1C01A5]">{p.isi}</p>,
  }));
}

/** Halaman Poin Penting dan Refleksi (Catatanku) dari naskah. */
export function PoinK2B2({ s, speakGuru, onSelesai, teksSelesai }: { s: SubBabNaskah; speakGuru: (t: string) => void; onSelesai: () => void; teksSelesai: string }) {
  return <PoinPentingK2 speakGuru={speakGuru} onSelesai={onSelesai} suaraPoin={s.poinSuara} poin={poinItem(s)} cara={s.cara} rumah={s.rumah} refleksi={s.refleksi} teksSelesai={teksSelesai} />;
}

/** Kotak kecil berwarna untuk isi panel poster. */
export function KotakPoster({ children, warna = "#FFFFFF" }: { children: React.ReactNode; warna?: string }) {
  return (
    <div className="rounded-2xl border-4 border-[#1C01A5] px-2 py-2" style={{ backgroundColor: warna }}>
      {children}
    </div>
  );
}

/** Tabel dua atau tiga kolom untuk poster. */
export function TabelPoster({ kepala, baris, kolom }: { kepala: string[]; baris: string[][]; kolom: string }) {
  return (
    <div className="overflow-hidden rounded-2xl border-4 border-[#1C01A5] bg-white">
      <div className="grid bg-[#FFE566] px-2 py-1 text-[11px] font-black leading-tight text-[#1C01A5]" style={{ gridTemplateColumns: kolom }}>
        {kepala.map((k) => (
          <span key={k}>{k}</span>
        ))}
      </div>
      {baris.map((b, i) => (
        <div key={b.join("|")} className={`grid items-center gap-1 px-2 py-1 text-sm font-black leading-tight text-[#1C01A5] ${i % 2 ? "bg-[#F5F3FF]" : "bg-white"}`} style={{ gridTemplateColumns: kolom }}>
          {b.map((c, j) => (
            <span key={j}>{c}</span>
          ))}
        </div>
      ))}
    </div>
  );
}
