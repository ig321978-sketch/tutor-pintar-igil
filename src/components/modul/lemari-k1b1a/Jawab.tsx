"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { KanvasTulis, TombolPeriksa } from "../opsi2/primitif";
import { goresanTulis } from "../o2k1a-lab";
import { coretanMengikutiJejak } from "../../titikAngkaKanvas";
import { hentikanSuaraGuruModul } from "@/lib/suara-guru-modul";
import { POLA_DADU, acak, kata, type Langkah, type Rupa } from "./logika";
import { EMOJI } from "./data";
import {
  LEBAR_ADEGAN,
  LEBAR_TULIS,
  TINGGI_ADEGAN,
  TINGGI_TULIS,
  bilanganDariUcapan,
  hitungTitik,
  letakBenda,
  modelKanvas,
  periksaCentang,
  periksaHubung,
  periksaLingkari,
  periksaTulis,
  type Goresan,
  type Titik,
} from "./periksa-jawab";

/**
 * Cara menjawab Kelas 1 Bab 1 Sub-Bab A: pilih (klik), tulis atau gambar di kanvas, dan ucapkan (rekam suara).
 * Kanvas memakai KanvasTulis Opsi 2; tulisan angka diperiksa pengenal awan titik (jawab.ts); suara memakai
 * Web Speech API id-ID bawaan peramban (gratis), dengan cadangan pilihan ketuk bila peramban tidak bisa mendengar.
 */

/* ------------------------------ Pilihan ketuk ------------------------------ */
/** Pilihan banyaknya: kata di Concrete dan Pictorial, lambang di Abstract. */
export function Pilihan({ pilihan, rupa, mati, onPilih }: { pilihan: number[]; rupa: Rupa; mati: number[]; onPilih: (n: number) => void }) {
  return (
    <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilih banyaknya">
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

/* ------------------------------ Tulis angka di kanvas ------------------------------ */
/**
 * Anak menulis angka jawabannya. Benar bila pengenal membaca angka kunci. Setelah dua kali belum terbaca,
 * muncul jejak putus-putus angka yang benar sebagai petunjuk (tulisan yang mengikuti jejak juga diterima).
 */
/** Batas salah di kanvas dan suara: setelah tiga kali, jawaban yang benar ditampilkan (tulisan atau ucapan anak bisa sulit dikenali mesin). */
export const BATAS_SALAH = 3;

/** Panel jawaban benar setelah tiga kali salah: angka besar, katanya, dan tombol lanjut. */
export function JawabanBenar({ kunci, onLanjut }: { kunci: number; onLanjut: () => void }) {
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

export function JawabTulis({ kunci, onBenar, onSalah }: { kunci: number; onBenar: (ditunjukkan?: boolean) => void; onSalah: (pesan: string) => void }) {
  const [goresan, setGoresan] = useState<Goresan[]>([]);
  const [gagal, setGagal] = useState(0);
  const jejak = gagal >= 2;
  const tunjuk = gagal >= BATAS_SALAH;
  const periksa = () => {
    const r = periksaTulis(goresan, kunci);
    if (r.benar || (jejak && coretanMengikutiJejak(goresan, modelKanvas(kunci)))) {
      onBenar();
      return;
    }
    const g = gagal + 1;
    setGagal(g);
    setGoresan([]);
    if (g >= BATAS_SALAH) {
      onSalah(`Tidak apa-apa. Jawaban yang benar adalah ${kata(kunci)}.`);
      return;
    }
    onSalah(r.terbaca === null ? "Tulisannya belum terbaca. Tulis lebih besar." : `Tulisanmu terbaca ${kata(r.terbaca)}. Hitung lagi, lalu tulis ulang.`);
  };
  if (tunjuk) return <JawabanBenar kunci={kunci} onLanjut={() => onBenar(true)} />;
  const panduan = jejak ? (
    <g aria-hidden="true" transform="scale(2) translate(0 8)">
      {goresanTulis(kunci).map((g, i) => (
        <path key={i} d={g.d} transform={`translate(${g.ox} 0)`} fill="none" stroke="#94A3B8" strokeWidth={3} strokeDasharray="4 4" strokeLinecap="round" />
      ))}
    </g>
  ) : null;
  return (
    <div className="space-y-2" data-uji="jawab-tulis">
      <p className="text-center text-sm font-black text-[#1C01A5]">{jejak ? "Ikuti garis putus-putus." : "Tulis angkanya di sini."}</p>
      <KanvasTulis lebar={LEBAR_TULIS} tinggi={TINGGI_TULIS} goresan={goresan} onUbah={setGoresan} terkunci={false} panduan={panduan} />
      <TombolPeriksa aktif={goresan.length > 0} onClick={periksa} />
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
  stop: () => void;
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
 * Tombol mikrofon: anak mengucapkan jawabannya. `onJawab(n)` dipanggil dengan angka yang terdengar (kunci bila terdengar).
 * Bila peramban tidak bisa mendengar, mikrofon ditolak, atau dua kali tidak terdengar, muncul pilihan ketuk sebagai cadangan.
 */
export function JawabSuara({
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

  const berhenti = () => {
    const m = mesin.current;
    mesin.current = null;
    try {
      m?.abort();
    } catch {
      /* Mesin sudah berhenti. */
    }
    setDengar(false);
  };

  const tekan = () => {
    if (dengar) {
      berhenti();
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
      terdengar = bilanganDariUcapan(teks.join(" "));
      if (terdengar.includes(kunci)) {
        tutup();
        onJawab(kunci, true);
      } else if (final && terdengar.length > 0) {
        tutup();
        onJawab(terdengar[0], true);
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

  if (tunjuk) return <JawabanBenar kunci={kunci} onLanjut={() => onJawab(kunci, false, true)} />;
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
          <Pilihan pilihan={pilihan} rupa={rupa} mati={mati} onPilih={(n) => onJawab(n, false)} />
        </div>
      ) : null}
    </div>
  );
}

/* ------------------------------ Kanvas gambar (lingkari, tanda, titik, garis) ------------------------------ */
/** Satu benda di dalam gambar SVG kanvas: emoji (benda), bentuk (diagram), atau teks (lambang dan kata). */
function BendaSvg({ jenis, rupa, x, y, nilai, ukuran = 30 }: { jenis: string; rupa: Rupa; x: number; y: number; nilai?: number; ukuran?: number }) {
  if (rupa === "lambang" || jenis === "kartu") {
    const teks = jenis === "kata" ? kata(nilai ?? 0) : String(nilai ?? "");
    return (
      <g>
        <rect x={x - 34} y={y - 16} width={68} height={32} rx={8} fill={jenis === "kata" ? "#FFFFFF" : "#FEF9C3"} stroke="#1C01A5" strokeWidth={2} />
        <text x={x} y={y + 7} textAnchor="middle" fontSize={jenis === "kata" ? 16 : 22} fontWeight={900} fill={jenis === "kata" ? "#1C01A5" : "#DC2626"}>
          {teks}
        </text>
      </g>
    );
  }
  const r = ukuran / 2;
  if (rupa === "diagram") {
    if (jenis === "kotak") return <rect x={x - r * 0.8} y={y - r * 0.8} width={r * 1.6} height={r * 1.6} rx={3} fill="#F97316" stroke="#1C01A5" strokeWidth={2} />;
    if (jenis === "segitiga") return <path d={`M${x} ${y - r * 0.9} L${x + r * 0.9} ${y + r * 0.8} L${x - r * 0.9} ${y + r * 0.8} Z`} fill="#22C55E" stroke="#1C01A5" strokeWidth={2} />;
    return <circle cx={x} cy={y} r={r * 0.8} fill="#3B82F6" stroke="#1C01A5" strokeWidth={2} />;
  }
  return (
    <text x={x} y={y + ukuran * 0.35} textAnchor="middle" fontSize={ukuran}>
      {EMOJI[jenis] ?? "\u{2B50}"}
    </text>
  );
}

type PK = {
  l: Extract<Langkah, { tipe: "lingkari" | "centang" | "titik" | "hubung" }>;
  rupa: Rupa;
  benih: number;
  selesai: boolean;
  goyang: boolean;
  salah: (p: string) => void;
  /** Gambar benar; untuk lingkari dan tanda dilanjutkan dengan menulis banyaknya. */
  lulus: (p: string) => void;
};

/** Kanvas gambar untuk empat tipe langkah kanvas. Goresan diperiksa saat tombol Periksa diketuk. */
export function KanvasGambar({ l, rupa, benih, selesai, goyang, salah, lulus }: PK) {
  const [goresan, setGoresan] = useState<Goresan[]>([]);
  const [kunci, setKunci] = useState(false);
  const [tampil, setTampil] = useState(l.tipe === "titik");
  const pewaktu = useRef<number | null>(null);
  const lihat = () => {
    setTampil(true);
    if (pewaktu.current) window.clearTimeout(pewaktu.current);
    pewaktu.current = window.setTimeout(() => setTampil(false), 1600);
  };
  useEffect(() => {
    if (l.tipe !== "titik") return;
    pewaktu.current = window.setTimeout(() => setTampil(false), 1600);
    return () => {
      if (pewaktu.current) window.clearTimeout(pewaktu.current);
    };
  }, [l.tipe]);

  const susun = useMemo(() => {
    if (l.tipe === "lingkari") {
      const t = letakBenda(l.benda.length, benih);
      return { benda: l.benda.map((j, i) => ({ jenis: j, ...t[i] })) };
    }
    if (l.tipe === "centang") return { benda: letakBenda(l.n, benih).map((t) => ({ jenis: l.jenis, ...t })) };
    if (l.tipe === "hubung") {
      const gap = TINGGI_ADEGAN / l.n;
      const kiriNilai = rupa === "lambang" ? acak(Array.from({ length: l.n }, (_, i) => i + 1), benih) : Array.from({ length: l.n }, () => 0);
      const kananNilai = acak(Array.from({ length: l.n }, (_, i) => i + 1), benih + 5);
      return {
        kiri: kiriNilai.map((v, i) => ({ x: 52, y: Math.round(gap * i + gap / 2), v })),
        kanan: kananNilai.map((v, i) => ({ x: LEBAR_ADEGAN - 48, y: Math.round(gap * i + gap / 2), v })),
      };
    }
    // titik: pola yang dilihat sekilas, di tengah kanvas.
    const pola = l.pola === "dadu" && POLA_DADU[l.n] ? POLA_DADU[l.n].map(([c, b]) => ({ x: 110 + c * 40, y: 60 + b * 40 })) : Array.from({ length: l.n }, (_, i) => ({ x: 150 - (l.n - 1) * 20 + i * 40, y: 100 }));
    return { benda: pola.map((t) => ({ jenis: l.jenis, ...t })) };
  }, [l, rupa, benih]);

  const periksa = () => {
    if (l.tipe === "lingkari") {
      const r = periksaLingkari(goresan, susun.benda!, l.benda.map((b) => b === l.target));
      if (r.benar) {
        setKunci(true);
        lulus("Bagus, semua sudah terlingkari! Sekarang tulis banyaknya.");
      } else {
        setGoresan([]);
        salah(r.lebih > 0 ? "Ada benda lain ikut terlingkari. Lingkari yang sejenis saja." : "Masih ada yang belum dilingkari. Lingkari semuanya.");
      }
    } else if (l.tipe === "centang") {
      const r = periksaCentang(goresan, susun.benda!);
      if (r.benar) {
        setKunci(true);
        lulus("Bagus, satu benda satu tanda! Sekarang tulis banyaknya.");
      } else {
        setGoresan([]);
        salah(r.dobel > 0 ? "Ada yang diberi dua tanda. Satu benda, satu tanda." : r.nyasar > 0 ? "Ada tanda di luar benda. Taruh tanda tepat di bendanya." : "Ada yang belum diberi tanda.");
      }
    } else if (l.tipe === "titik") {
      const r = hitungTitik(goresan);
      if (r.coretan === 0 && r.titik === l.n) {
        setKunci(true);
        setTampil(true);
        lulus(`Betul! ${kata(l.n).charAt(0).toUpperCase()}${kata(l.n).slice(1)}, dikenali sekilas tanpa menghitung.`);
      } else {
        setGoresan([]);
        salah(r.coretan > 0 ? "Gambar titik kecil saja, satu ketukan satu titik." : "Belum sama. Ketuk Lihat lagi, lalu gambar titiknya.");
      }
    } else {
      const kiri: Titik[] = susun.kiri!;
      const kanan: Titik[] = susun.kanan!;
      const r = periksaHubung(goresan, kiri, kanan, susun.kiri!.map((k) => k.v), susun.kanan!.map((k) => k.v), rupa === "lambang");
      if (r.benar) {
        setKunci(true);
        lulus(rupa === "lambang" ? "Betul! Tiap nama angka bertemu lambangnya." : "Betul! Tiap benda dapat tepat satu kartu angka.");
      } else {
        setGoresan([]);
        salah(r.salah > 0 ? "Ada garis yang belum pas. Satu garis untuk satu pasang." : "Masih ada yang belum punya garis.");
      }
    }
  };

  const latar = (
    <g aria-hidden="true">
      {susun.benda && (l.tipe !== "titik" || tampil)
        ? susun.benda.map((b, i) => <BendaSvg key={i} jenis={b.jenis} rupa={rupa} x={b.x} y={b.y} />)
        : null}
      {l.tipe === "titik" && !tampil && !kunci ? (
        <text x={LEBAR_ADEGAN / 2} y={22} textAnchor="middle" fontSize={14} fontWeight={900} fill="#1C01A5" opacity={0.6}>
          Gambar titiknya di sini
        </text>
      ) : null}
      {susun.kiri ? susun.kiri.map((k, i) => <BendaSvg key={`k${i}`} jenis={rupa === "lambang" ? "kata" : l.tipe === "hubung" ? l.jenis : ""} rupa={rupa} x={k.x} y={k.y} nilai={k.v} ukuran={28} />) : null}
      {susun.kanan ? susun.kanan.map((k, i) => <BendaSvg key={`n${i}`} jenis="kartu" rupa={rupa} x={k.x} y={k.y} nilai={k.v} />) : null}
    </g>
  );

  return (
    <div className={`space-y-2 ${goyang ? "lm-goyang" : ""}`} data-uji="kanvas-gambar">
      <KanvasTulis lebar={LEBAR_ADEGAN} tinggi={TINGGI_ADEGAN} goresan={goresan} onUbah={setGoresan} terkunci={kunci || selesai || (l.tipe === "titik" && tampil)} panduan={latar} />
      {!kunci && !selesai ? (
        <div className="flex flex-wrap items-center justify-center gap-2">
          {l.tipe === "titik" ? (
            <button type="button" onClick={lihat} className="min-h-[48px] rounded-full border-2 border-[#1C01A5] bg-white px-4 text-xs font-black text-[#1C01A5]">
              {"\u{1F440}"} Lihat lagi sebentar
            </button>
          ) : null}
          <TombolPeriksa aktif={goresan.length > 0} onClick={periksa} />
        </div>
      ) : null}
    </div>
  );
}
