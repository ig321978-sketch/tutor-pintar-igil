"use client";

import React, { useEffect, useRef, useState } from "react";
import { hentikanSuaraGuruModul } from "@/lib/suara-guru-modul";
import { BATAS_SALAH } from "../lemari-k1b1a/Jawab";
import { NAMA_JENIS } from "./bentuk";
import { kata, type Jawaban, type Jenis, type Rupa } from "./logika";
import { cocokUcapan } from "./periksa";

/**
 * Cara menjawab bab ini. Tulis di kanvas memakai JawabTulis bersama (satu angka). Ketuk memilih angka atau nama bentuk.
 * Suara mengenali satu angka (satu sampai sembilan) atau nama bentuk (segitiga, persegi, segi empat, segi lima, segi enam); setelah tiga kali salah,
 * jawaban benar ditampilkan dengan pesan "Ini jawaban yang benar."
 */
export type PilihanJawab = { kunci: string; teks: string; angka?: number; nama?: Jenis };

export function PilihanTeks({ pilihan, mati, onPilih }: { pilihan: PilihanJawab[]; mati: string[]; onPilih: (p: PilihanJawab) => void }) {
  return (
    <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilih jawabannya">
      {pilihan.map((p) => (
        <button
          key={p.kunci}
          type="button"
          disabled={mati.includes(p.kunci)}
          onClick={() => onPilih(p)}
          className="min-h-[52px] min-w-[84px] rounded-2xl border-4 border-[#1C01A5] bg-[#FFE566] px-3 text-lg font-black text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.3)] disabled:opacity-30"
        >
          {p.teks}
        </button>
      ))}
    </div>
  );
}

/** Pilihan ketuk dari kunci: angka (lambang untuk Abstract, nama bilangan untuk lainnya) atau nama bentuk. */
export function buatPilihan(angka: number[], nama: Jenis[], rupa: Rupa): PilihanJawab[] {
  return [
    ...angka.map((n): PilihanJawab => ({ kunci: `a${n}`, teks: rupa === "lambang" ? String(n) : kata(n), angka: n })),
    ...nama.map((j): PilihanJawab => ({ kunci: `n${j}`, teks: NAMA_JENIS[j], nama: j })),
  ];
}

/** Panel jawaban benar setelah tiga kali salah. */
export function JawabanBenarBentuk({ teks, onLanjut }: { teks: string; onLanjut: () => void }) {
  return (
    <div className="space-y-2 rounded-2xl border-4 border-[#15803D] bg-[#F0FDF4] p-3 text-center" role="status" data-uji="jawaban-benar">
      <p className="text-sm font-black text-[#14532D]">Tidak apa-apa. Ini jawaban yang benar:</p>
      <p className="text-3xl font-black text-[#15803D]">{teks}</p>
      <button type="button" onClick={onLanjut} className="min-h-[48px] rounded-full border-4 border-[#15803D] bg-white px-5 text-sm font-black text-[#15803D]">
        Aku mengerti, lanjut {"➡️"}
      </button>
    </div>
  );
}

type MesinDengar = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives: number;
  start: () => void;
  abort: () => void;
  onresult: ((e: { results: ArrayLike<ArrayLike<{ transcript: string }> & { isFinal: boolean }> }) => void) | null;
  onerror: ((e: { error: string }) => void) | null;
  onend: (() => void) | null;
};
function buatMesin(): MesinDengar | null {
  if (typeof window === "undefined") return null;
  const w = window as Window & { SpeechRecognition?: new () => MesinDengar; webkitSpeechRecognition?: new () => MesinDengar };
  const K = w.SpeechRecognition ?? w.webkitSpeechRecognition;
  return K ? new K() : null;
}

/**
 * Tombol mikrofon untuk satu angka atau nama bentuk, dengan cadangan pilihan ketuk. `onJawab(p, terdengar, ditunjukkan)`:
 * p = pilihan yang dijawab (kunci bila benar), `terdengar` = jawaban datang dari ucapan.
 */
export function JawabSuaraBentuk({
  jawab,
  teksKunci,
  pilihan,
  mati,
  onJawab,
  onPesan,
}: {
  jawab: Exclude<Jawaban, null>;
  teksKunci: string;
  pilihan: PilihanJawab[];
  mati: string[];
  onJawab: (p: PilihanJawab | null, terdengar: boolean, ditunjukkan?: boolean, teksTerdengar?: string) => void;
  onPesan: (pesan: string) => void;
}) {
  const [dengar, setDengar] = useState(false);
  const [tunjuk, setTunjuk] = useState(false);
  const [cadangan, setCadangan] = useState(false);
  const [sepi, setSepi] = useState(0);
  const salahRef = useRef(0);
  const mesin = useRef<MesinDengar | null>(null);
  const kunciPilihan = pilihan.find((p) => (jawab.jenis === "angka" ? p.angka === jawab.nilai : p.nama === jawab.nilai)) ?? null;
  const gagalSekali = (): boolean => {
    salahRef.current += 1;
    if (salahRef.current >= BATAS_SALAH) {
      setTunjuk(true);
      onPesan(`Tidak apa-apa. Jawaban yang benar adalah ${teksKunci}.`);
      return true;
    }
    return false;
  };
  useEffect(
    () => () => {
      try {
        mesin.current?.abort();
      } catch {
        /* Mesin sudah berhenti. */
      }
    },
    [],
  );
  const tekan = () => {
    if (dengar) {
      const m = mesin.current;
      mesin.current = null;
      try {
        m?.abort();
      } catch {
        /* Mesin sudah berhenti. */
      }
      setDengar(false);
      return;
    }
    const m = buatMesin();
    if (!m) {
      setCadangan(true);
      onPesan("Peramban ini belum bisa mendengar. Ketuk jawabannya saja.");
      return;
    }
    hentikanSuaraGuruModul();
    try {
      window.speechSynthesis?.cancel();
    } catch {
      /* Tidak ada suara yang berjalan. */
    }
    let selesai = false;
    let terakhir = "";
    const tutup = () => {
      selesai = true;
      if (mesin.current === m) mesin.current = null;
      setDengar(false);
      try {
        m.abort();
      } catch {
        /* Mesin sudah berhenti. */
      }
    };
    m.lang = "id-ID";
    m.continuous = false;
    m.interimResults = true;
    m.maxAlternatives = 5;
    m.onresult = (e) => {
      if (selesai) return;
      const teks: string[] = [];
      let final = false;
      for (let i = 0; i < e.results.length; i += 1) {
        const r = e.results[i];
        if (r.isFinal) final = true;
        for (let j = 0; j < Math.min(r.length, 5); j += 1) if (r[j]?.transcript) teks.push(r[j].transcript);
      }
      terakhir = teks.join(" ");
      const h = cocokUcapan(terakhir, jawab);
      if (h.cocok) {
        tutup();
        onJawab(kunciPilihan, true);
      } else if (final && h.terdengar !== null) {
        tutup();
        const salahPilih = pilihan.find((p) => (typeof h.terdengar === "number" ? p.angka === h.terdengar : p.nama === h.terdengar)) ?? null;
        onJawab(salahPilih, true, false, typeof h.terdengar === "number" ? kata(h.terdengar) : NAMA_JENIS[h.terdengar]);
        gagalSekali();
      }
    };
    m.onerror = (e) => {
      if (selesai || e.error === "aborted") return;
      tutup();
      if (e.error === "not-allowed" || e.error === "service-not-allowed") {
        setCadangan(true);
        onPesan("Mikrofon belum diizinkan. Izinkan mikrofon, atau ketuk jawabannya.");
      } else {
        setSepi((s) => s + 1);
        if (sepi >= 1) setCadangan(true);
        if (!gagalSekali()) onPesan("Belum terdengar. Tekan mikrofon, lalu ucapkan sekali lagi.");
      }
    };
    m.onend = () => {
      if (selesai) return;
      tutup();
      setSepi((s) => s + 1);
      if (sepi >= 1) setCadangan(true);
      if (!gagalSekali()) onPesan(terakhir ? "Coba ucapkan sekali lagi." : "Belum terdengar. Tekan mikrofon, lalu ucapkan sekali lagi.");
    };
    try {
      mesin.current = m;
      m.start();
      setDengar(true);
      onPesan("");
    } catch {
      tutup();
      setCadangan(true);
      onPesan("Mikrofon tidak bisa dipakai. Ketuk jawabannya saja.");
    }
  };
  if (tunjuk) return <JawabanBenarBentuk teks={teksKunci} onLanjut={() => onJawab(kunciPilihan, false, true)} />;
  return (
    <div className="space-y-2" data-uji="jawab-suara">
      <div className="flex justify-center">
        <button
          type="button"
          onClick={tekan}
          aria-pressed={dengar}
          className={`flex min-h-[64px] items-center gap-2 rounded-full border-4 px-6 text-lg font-black shadow-[0_4px_0_rgba(28,1,165,0.3)] ${dengar ? "animate-pulse border-[#DC2626] bg-[#FECACA] text-[#991B1B]" : "border-[#1C01A5] bg-[#FFE566] text-[#1C01A5]"}`}
        >
          <span aria-hidden="true">{"\u{1F3A4}"}</span>
          {dengar ? "Mendengarkan... ucapkan sekarang" : "Tekan, lalu ucapkan"}
        </button>
      </div>
      {cadangan ? (
        <div className="space-y-1">
          <p className="text-center text-xs font-bold text-[#1C01A5]/70">Atau ketuk jawabannya:</p>
          <PilihanTeks pilihan={pilihan} mati={mati} onPilih={(p) => onJawab(p, false)} />
        </div>
      ) : null}
    </div>
  );
}
