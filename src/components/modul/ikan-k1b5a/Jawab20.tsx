"use client";

import React, { useEffect, useRef, useState } from "react";
import { KanvasTulis, TombolPeriksa } from "../opsi2/primitif";
import { goresanTulis } from "../o2k1a-lab";
import { coretanMengikutiJejak } from "../../titikAngkaKanvas";
import { hentikanSuaraGuruModul } from "@/lib/suara-guru-modul";
import { BATAS_SALAH, JawabTulis } from "../lemari-k1b1a/Jawab";
import { LEBAR_TULIS, TINGGI_TULIS, modelKanvas } from "../lemari-k1b1a/periksa-jawab";
import { kata, type Rupa } from "./logika";
import { bilanganDariUcapan20, periksaTulis, type Goresan } from "./periksa";

/**
 * Cara menjawab bilangan nol sampai dua puluh Kelas 1 Bab 5 Sub-Bab A. Pilihan ketuk memakai nama bilangan (Concrete, Pictorial) atau lambang
 * (Abstract). Tulisan kanvas: satu kotak untuk nol sampai sembilan (JawabTulis bersama), dua kotak (puluhan dan satuan, masing-masing satu angka)
 * untuk sepuluh sampai dua puluh, karena pengenal tulisan hanya membaca satu angka. Suara memakai pengenal ucapan sampai dua puluh di periksa.ts.
 */

/* ------------------------------ Pilihan ketuk ------------------------------ */
export function PilihanIkan({ pilihan, rupa, mati, onPilih }: { pilihan: number[]; rupa: Rupa; mati: number[]; onPilih: (n: number) => void }) {
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
          {rupa === "lambang" ? n : kata(n)}
        </button>
      ))}
    </div>
  );
}

/* ------------------------------ Tulis lambang bilangan ------------------------------ */
function JejakAngka({ n }: { n: number }) {
  return (
    <g aria-hidden="true" transform="scale(2) translate(0 8)">
      {goresanTulis(n).map((g, i) => (
        <path key={i} d={g.d} transform={`translate(${g.ox} 0)`} fill="none" stroke="#94A3B8" strokeWidth={3} strokeDasharray="4 4" strokeLinecap="round" />
      ))}
    </g>
  );
}

/** Panel jawaban benar setelah tiga kali salah (tulisan atau ucapan anak bisa sulit dikenali mesin): angka besar, namanya, dan tombol lanjut. */
function JawabanBenar20({ kunci, onLanjut }: { kunci: number; onLanjut: () => void }) {
  return (
    <div className="space-y-2 rounded-2xl border-4 border-[#15803D] bg-[#F0FDF4] p-3 text-center" role="status" data-uji="jawaban-benar">
      <p className="text-sm font-black text-[#14532D]">Tidak apa-apa. Ini jawaban yang benar:</p>
      <p className="text-5xl font-black text-[#15803D]">{kunci}</p>
      <p className="text-base font-black text-[#14532D]">{kata(kunci)}</p>
      <button type="button" onClick={onLanjut} className="min-h-[48px] rounded-full border-4 border-[#15803D] bg-white px-5 text-sm font-black text-[#15803D]">
        Aku mengerti, lanjut {"➡️"}
      </button>
    </div>
  );
}

/** Dua kotak tulis: kiri angka puluhan, kanan angka satuan. Benar bila keduanya terbaca sesuai kunci. */
function JawabDuaKotak({ kunci, onBenar, onSalah }: { kunci: number; onBenar: (ditunjukkan?: boolean) => void; onSalah: (pesan: string) => void }) {
  const p = Math.floor(kunci / 10);
  const s = kunci % 10;
  const [kiri, setKiri] = useState<Goresan[]>([]);
  const [kanan, setKanan] = useState<Goresan[]>([]);
  const [gagal, setGagal] = useState(0);
  const jejak = gagal >= 2;
  const periksa = () => {
    const a = periksaTulis(kiri, p);
    const b = periksaTulis(kanan, s);
    const okA = a.benar || (jejak && coretanMengikutiJejak(kiri, modelKanvas(p)));
    const okB = b.benar || (jejak && coretanMengikutiJejak(kanan, modelKanvas(s)));
    if (okA && okB) {
      onBenar();
      return;
    }
    setGagal((g) => g + 1);
    if (!okA) setKiri([]);
    if (!okB) setKanan([]);
    if (gagal + 1 >= BATAS_SALAH) {
      onSalah(`Tidak apa-apa. Jawaban yang benar adalah ${kata(kunci)}.`);
      return;
    }
    if (a.terbaca === null || b.terbaca === null) onSalah("Tulisannya belum terbaca. Tulis satu angka besar di tiap kotak.");
    else if (a.terbaca * 10 + b.terbaca <= 20) onSalah(`Tulisanmu terbaca ${kata(a.terbaca * 10 + b.terbaca)}. Hitung lagi: berapa sepuluh, berapa sisanya?`);
    else onSalah("Tulisanmu belum cocok. Hitung lagi: berapa sepuluh, berapa sisanya?");
  };
  if (gagal >= BATAS_SALAH) return <JawabanBenar20 kunci={kunci} onLanjut={() => onBenar(true)} />;
  return (
    <div className="space-y-2" data-uji="jawab-dua-kotak">
      <p className="text-center text-sm font-black text-[#1C01A5]">{jejak ? "Ikuti garis putus-putus." : "Kotak kiri: angka sepuluhnya. Kotak kanan: angka sisanya."}</p>
      <div className="grid grid-cols-2 gap-2">
        <KanvasTulis lebar={LEBAR_TULIS} tinggi={TINGGI_TULIS} goresan={kiri} onUbah={setKiri} terkunci={false} panduan={jejak ? <JejakAngka n={p} /> : null} />
        <KanvasTulis lebar={LEBAR_TULIS} tinggi={TINGGI_TULIS} goresan={kanan} onUbah={setKanan} terkunci={false} panduan={jejak ? <JejakAngka n={s} /> : null} />
      </div>
      <TombolPeriksa aktif={kiri.length > 0 && kanan.length > 0} onClick={periksa} />
    </div>
  );
}

export function JawabTulisIkan({ kunci, onBenar, onSalah }: { kunci: number; onBenar: (ditunjukkan?: boolean) => void; onSalah: (pesan: string) => void }) {
  if (kunci <= 9) return <JawabTulis kunci={kunci} onBenar={onBenar} onSalah={onSalah} />;
  return <JawabDuaKotak kunci={kunci} onBenar={onBenar} onSalah={onSalah} />;
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

/** Tombol mikrofon untuk bilangan sampai dua puluh, dengan cadangan pilihan ketuk. */
export function JawabSuaraIkan({
  kunci,
  pilihan,
  rupa,
  mati,
  onJawab,
  onPesan,
}: {
  kunci: number;
  pilihan: number[];
  rupa: Rupa;
  mati: number[];
  onJawab: (n: number, terdengar: boolean, ditunjukkan?: boolean) => void;
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
      onPesan(`Tidak apa-apa. Jawaban yang benar adalah ${kata(kunci)}.`);
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
    let terdengar: number[] = [];
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
      terdengar = bilanganDariUcapan20(teks.join(" "));
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
        if (!gagalSekali()) onPesan("Belum terdengar. Tekan mikrofon, lalu ucapkan sekali lagi.");
      }
    };
    m.onend = () => {
      if (selesai) return;
      tutup();
      setSepi((s) => s + 1);
      if (sepi >= 1) setCadangan(true);
      if (!gagalSekali()) onPesan(terdengar.length ? "Coba ucapkan sekali lagi." : "Belum terdengar. Tekan mikrofon, lalu ucapkan sekali lagi.");
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
  if (tunjuk) return <JawabanBenar20 kunci={kunci} onLanjut={() => onJawab(kunci, false, true)} />;
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
          <PilihanIkan pilihan={pilihan} rupa={rupa} mati={mati} onPilih={(n) => onJawab(n, false)} />
        </div>
      ) : null}
    </div>
  );
}
