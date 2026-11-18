"use client";

import React, { useEffect, useRef, useState } from "react";
import { hentikanSuaraGuruModul } from "@/lib/suara-guru-modul";
import { BATAS_SALAH } from "../lemari-k1b1a/Jawab";
import { URUT_BANGUN, bangunDariUcapan, besar, type Bangun } from "./logika";

/**
 * Cara menjawab dengan nama bangun Kelas 2 Bab 3 Sub-Bab C: pilihan ketuk (lima nama bangun) dan rekam suara dengan pengenal nama bangun
 * (bangunDariUcapan di logika.ts) beserta cadangan pilihan ketuk. Menulis angka memakai JawabTulis bersama (satu angka).
 */

/* ------------------------------ Pilihan ketuk ------------------------------ */
export function PilihanNama({ mati, onPilih, pilihan = URUT_BANGUN }: { mati: Bangun[]; onPilih: (b: Bangun) => void; pilihan?: readonly Bangun[] }) {
  return (
    <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilih nama bangun ruang">
      {pilihan.map((b) => (
        <button
          key={b}
          type="button"
          disabled={mati.includes(b)}
          onClick={() => onPilih(b)}
          className="min-h-[52px] min-w-[96px] rounded-2xl border-4 border-[#1C01A5] bg-[#FFE566] px-3 text-lg font-black text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.3)] disabled:opacity-30"
        >
          {besar(b)}
        </button>
      ))}
    </div>
  );
}

export function PilihanAngka({ pilihan, mati, onPilih }: { pilihan: number[]; mati: number[]; onPilih: (n: number) => void }) {
  return (
    <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilih jawabannya">
      {pilihan.map((n) => (
        <button
          key={n}
          type="button"
          disabled={mati.includes(n)}
          onClick={() => onPilih(n)}
          className="min-h-[52px] min-w-[84px] rounded-2xl border-4 border-[#1C01A5] bg-[#FFE566] px-3 text-lg font-black text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.3)] disabled:opacity-30"
        >
          {n}
        </button>
      ))}
    </div>
  );
}

/** Panel jawaban benar setelah tiga kali salah (ucapan anak bisa sulit dikenali mesin): nama besar dan tombol lanjut. */
function JawabanBenarNama({ kunci, onLanjut }: { kunci: Bangun; onLanjut: () => void }) {
  return (
    <div className="space-y-2 rounded-2xl border-4 border-[#15803D] bg-[#F0FDF4] p-3 text-center" role="status" data-uji="jawaban-benar">
      <p className="text-sm font-black text-[#14532D]">Tidak apa-apa. Ini jawaban yang benar:</p>
      <p className="text-4xl font-black text-[#15803D]">{besar(kunci)}</p>
      <button type="button" onClick={onLanjut} className="min-h-[48px] rounded-full border-4 border-[#15803D] bg-white px-5 text-sm font-black text-[#15803D]">
        Aku mengerti, lanjut {"➡️"}
      </button>
    </div>
  );
}

/* ------------------------------ Jawab dengan suara ------------------------------ */
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

/** Tombol mikrofon untuk menyebut nama bangun, dengan cadangan pilihan ketuk. */
export function JawabSuaraNama({
  kunci,
  mati,
  onJawab,
  onPesan,
}: {
  kunci: Bangun;
  mati: Bangun[];
  onJawab: (b: Bangun, terdengar: boolean, ditunjukkan?: boolean) => void;
  onPesan: (pesan: string) => void;
}) {
  const [dengar, setDengar] = useState(false);
  const [tunjuk, setTunjuk] = useState(false);
  const salahRef = useRef(0);
  /** Satu percobaan gagal (salah terdengar atau tidak terdengar); setelah tiga kali, tampilkan jawaban yang benar. */
  const gagalSekali = (): boolean => {
    salahRef.current += 1;
    if (salahRef.current >= BATAS_SALAH) {
      setTunjuk(true);
      onPesan(`Tidak apa-apa. Jawaban yang benar adalah ${kunci}.`);
      return true;
    }
    return false;
  };
  const [cadangan, setCadangan] = useState(false);
  const [sepi, setSepi] = useState(0);
  const mesin = useRef<MesinDengar | null>(null);
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
    let terdengar: Bangun[] = [];
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
      terdengar = bangunDariUcapan(teks.join(" "));
      if (terdengar.includes(kunci)) {
        tutup();
        onJawab(kunci, true);
      } else if (final && terdengar.length > 0) {
        tutup();
        onJawab(terdengar[terdengar.length - 1], true);
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
        if (!gagalSekali()) onPesan("Belum terdengar. Tekan mikrofon, lalu sebutkan sekali lagi.");
      }
    };
    m.onend = () => {
      if (selesai) return;
      tutup();
      setSepi((s) => s + 1);
      if (sepi >= 1) setCadangan(true);
      if (!gagalSekali()) onPesan(terdengar.length ? "Coba sebutkan sekali lagi." : "Belum terdengar. Tekan mikrofon, lalu sebutkan sekali lagi.");
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
  if (tunjuk) return <JawabanBenarNama kunci={kunci} onLanjut={() => onJawab(kunci, false, true)} />;
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
          {dengar ? "Mendengarkan... sebutkan sekarang" : "Tekan, lalu sebutkan"}
        </button>
      </div>
      {cadangan ? (
        <div className="space-y-1">
          <p className="text-center text-xs font-bold text-[#1C01A5]/70">Atau ketuk jawabannya:</p>
          <PilihanNama mati={mati} onPilih={(b) => onJawab(b, false)} />
        </div>
      ) : null}
    </div>
  );
}
