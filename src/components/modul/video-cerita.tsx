"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { hentikanSuaraGuruModul } from "@/lib/suara-guru-modul";
import { BIRU, EMAS, Latar } from "./CeritaBandingB";

/* ------------------------------------------------------------------------ */
/* Mesin video cerita IGIL: animasi HTML/SVG gratis yang diputar di perangkat   */
/* siswa. Tanpa berkas video, tanpa panggilan API. Naskah tiap adegan dipecah  */
/* menjadi kalimat (ketukan). Tiap kalimat dibacakan Suara Guru perangkat, dan  */
/* gambar berubah mengikuti ketukan yang sedang dibacakan.                      */
/* Dipakai Tahap 1: Story Matematika Kelas 2 Bab 1 (Sub-Bab A, B, C).           */
/* ------------------------------------------------------------------------ */

export type PropsAdegan = {
  /** Nomor ketukan (kalimat) yang sedang dibacakan, mulai dari 0. */
  k: number;
  /** Detik sejak ketukan dimulai. Hanya bergerak bila adegan memakai `waktu`. */
  t: number;
};

export type AdeganVideo = {
  id: string;
  judul: string;
  /** Kalimat naskah, dibacakan satu per satu. Gabungannya sama dengan naskah adegan. */
  ketukan: string[];
  /** Isi gambar pada kotak 300 x 208. Latar langit dan padang rumput sudah dipasang mesin. */
  render: (p: PropsAdegan) => React.ReactNode;
  /** Bila true, `t` ikut bergerak tiap sekitar 0,1 detik (untuk hitungan yang naik berurutan). */
  waktu?: boolean;
  /** Waktu tampil minimal (detik) untuk ketukan tertentu, bila animasinya butuh lebih lama. */
  minimal?: Partial<Record<number, number>>;
};

/** Pecah naskah menjadi kalimat. Gabungan kalimat (dipisah spasi) sama dengan naskah. */
export function kalimatDari(teks: string): string[] {
  const hasil = teks.match(/[^.!?]+[.!?]+/g);
  return (hasil ?? [teks]).map((k) => k.trim()).filter(Boolean);
}

/** Bilangan yang naik berurutan: `dari` pada t=0, bertambah `laju` per detik, berhenti di `ke`. */
export const tumbuh = (t: number, dari: number, ke: number, laju: number) => Math.min(ke, dari + Math.floor(t * laju));

/** Label putih berbingkai di bagian atas gambar, dipusatkan. Ganti `teks` untuk memunculkannya lagi. */
export function Papan({ teks, y = 6, ukuran = 13 }: { teks?: string | null; y?: number; ukuran?: number }) {
  const isi = typeof teks === "string" ? teks : "";
  if (!isi) return null;
  const w = Math.max(96, Math.min(288, isi.length * ukuran * 0.62 + 26));
  return (
    <g key={isi} className="vc-pop" style={{ ["--dy" as string]: "-12px" }}>
      <rect x={150 - w / 2} y={y} width={w} height="26" rx="11" fill="#FFFFFF" stroke={BIRU} strokeWidth="3" />
      <text x="150" y={y + 18.5} textAnchor="middle" fontSize={ukuran} fontWeight="900" fill={BIRU}>
        {isi}
      </text>
    </g>
  );
}

/** Muncul dengan gerakan membesar saat `aktif` menjadi benar. Bila tidak aktif, tidak digambar. */
export function Muncul({
  aktif = true,
  dx = 0,
  dy = 0,
  skala = 0.5,
  tunda = 0,
  durasi = 0.5,
  children,
}: {
  aktif?: boolean;
  dx?: number;
  dy?: number;
  skala?: number;
  tunda?: number;
  durasi?: number;
  children: React.ReactNode;
}) {
  if (!aktif) return null;
  return (
    <g
      className="vc-pop"
      style={{ ["--dx" as string]: `${dx}px`, ["--dy" as string]: `${dy}px`, ["--s" as string]: String(skala), animationDelay: `${tunda}s`, animationDuration: `${durasi}s` }}
    >
      {children}
    </g>
  );
}

/** Memindahkan gambar ke (x, y) dengan gerak halus setiap kali nilainya berubah. */
export function Gerak({ x, y = 0, durasi = 1.2, children }: { x: number; y?: number; durasi?: number; children: React.ReactNode }) {
  return <g style={{ transform: `translate(${x}px, ${y}px)`, transition: `transform ${durasi}s ease-in-out` }}>{children}</g>;
}

/** Gambar yang melompat-lompat terus selama `aktif`. */
export function Lompat({ aktif = true, children }: { aktif?: boolean; children: React.ReactNode }) {
  return <g className={aktif ? "vc-lompat" : undefined}>{children}</g>;
}

/** Garis putus-putus yang berkedip untuk menyorot bagian gambar. */
export function Sorot({ x, y, w, h, r = 8, warna = EMAS }: { x: number; y: number; w: number; h: number; r?: number; warna?: string }) {
  return <rect className="vc-denyut" x={x} y={y} width={w} height={h} rx={r} fill="none" stroke={warna} strokeWidth="3.2" strokeDasharray="6 4" />;
}

const CSS = `
.vc-pop{animation:vc-pop .5s cubic-bezier(.3,1.5,.5,1) both;transform-box:fill-box;transform-origin:center}
@keyframes vc-pop{from{opacity:0;transform:translate(var(--dx,0px),var(--dy,0px)) scale(var(--s,.5))}to{opacity:1;transform:none}}
.vc-lompat{animation:vc-lompat .8s ease-in-out infinite}
@keyframes vc-lompat{50%{transform:translateY(-7px)}}
.vc-denyut{animation:vc-denyut 1s ease-in-out infinite}
@keyframes vc-denyut{50%{opacity:.35}}
.vc-masuk{animation:vc-masuk .6s ease both}
@keyframes vc-masuk{from{opacity:0}to{opacity:1}}
.vc-jeda,.vc-jeda *{animation-play-state:paused!important}
@media (prefers-reduced-motion:reduce){.vc-lompat,.vc-denyut{animation:none}}
`;

const TOMBOL =
  "rounded-full border-4 border-[#FFE566] bg-[#1C01A5] px-4 py-2 text-xs font-black text-[#FFE566] shadow-[0_4px_0_rgba(28,1,165,0.35)] md:text-sm";

type Peta = {
  jalan: boolean;
  jeda: boolean;
  suara: boolean;
  selesai: boolean;
  a: number;
  k: number;
  ms: number;
  nomor: number;
  suaraBeres: boolean;
};

const adaSuaraPerangkat = () => typeof window !== "undefined" && "speechSynthesis" in window;

/**
 * Pemutar video cerita. `adegan` berisi urutan adegan; `speakGuru` adalah suara guru modul
 * (dengan panggilan balik saat selesai).
 */
export function VideoCerita({
  judul,
  subjudul,
  adegan,
  speakGuru,
  mulaiLangsung = false,
  onSelesai,
}: {
  judul: string;
  subjudul: string;
  adegan: AdeganVideo[];
  speakGuru: (teks: string, selesai?: () => void) => void;
  /** Putar sesaat setelah dipasang. Dipakai daftar video: pemasangan terjadi karena siswa mengetuk Putar. */
  mulaiLangsung?: boolean;
  /** Dipanggil sekali saat video sampai di akhir. */
  onSelesai?: () => void;
}) {
  const S = useRef<Peta>({ jalan: false, jeda: false, suara: true, selesai: false, a: 0, k: 0, ms: 0, nomor: 0, suaraBeres: false });
  const bicaraRef = useRef(speakGuru);
  const adeganRef = useRef(adegan);
  const onSelesaiRef = useRef(onSelesai);

  const [sudahMulai, setSudahMulai] = useState(false);
  const [pos, setPos] = useState({ a: 0, k: 0 });
  const [t, setT] = useState(0);
  const [jeda, setJeda] = useState(false);
  const [suara, setSuara] = useState(true);
  const [selesai, setSelesai] = useState(false);

  useEffect(() => {
    bicaraRef.current = speakGuru;
    adeganRef.current = adegan;
    onSelesaiRef.current = onSelesai;
  }, [speakGuru, adegan, onSelesai]);

  /** Pindah ke ketukan k pada adegan a, lalu bacakan kalimatnya. */
  const ke = useCallback((a: number, k: number) => {
    const s = S.current;
    s.a = a;
    s.k = k;
    s.ms = 0;
    s.suaraBeres = false;
    s.selesai = false;
    const id = (s.nomor += 1);
    setPos({ a, k });
    setT(0);
    setSelesai(false);
    const kalimat = adeganRef.current[a].ketukan[k];
    if (s.suara && adaSuaraPerangkat()) {
      bicaraRef.current(kalimat, () => {
        if (id === S.current.nomor) S.current.suaraBeres = true;
      });
    } else {
      s.suaraBeres = true;
    }
  }, []);

  const mulai = useCallback(
    (a = 0) => {
      const s = S.current;
      s.jalan = true;
      s.jeda = false;
      setJeda(false);
      setSudahMulai(true);
      ke(a, 0);
    },
    [ke]
  );

  useEffect(() => {
    const id = window.setInterval(() => {
      const s = S.current;
      if (!s.jalan || s.jeda || s.selesai) return;
      s.ms += 60;
      const ad = adeganRef.current[s.a];
      const kalimat = ad.ketukan[s.k];
      const adaSuara = s.suara && adaSuaraPerangkat();
      const dasar = adaSuara ? 0 : kalimat.length * 70 + 1000;
      const minimal = Math.max((ad.minimal?.[s.k] ?? 1.2) * 1000, dasar);
      const batas = kalimat.length * 150 + 6000;
      const suaraBeres = !adaSuara || s.suaraBeres || s.ms > batas;
      if (ad.waktu && s.ms % 120 === 0) setT(s.ms / 1000);
      const terakhir = s.k === ad.ketukan.length - 1;
      if (s.ms >= minimal + (terakhir ? 700 : 0) && suaraBeres) {
        if (!terakhir) ke(s.a, s.k + 1);
        else if (s.a < adeganRef.current.length - 1) ke(s.a + 1, 0);
        else {
          s.selesai = true;
          setSelesai(true);
          onSelesaiRef.current?.();
        }
      }
    }, 60);
    return () => window.clearInterval(id);
  }, [ke]);

  useEffect(() => {
    if (!mulaiLangsung) return;
    // Mulai sesaat setelah dipasang (siswa baru saja mengetuk Putar). Hanya sekali.
    const id = window.setTimeout(() => mulai(0), 0);
    return () => window.clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ubahJeda = () => {
    const s = S.current;
    s.jeda = !s.jeda;
    setJeda(s.jeda);
    if (adaSuaraPerangkat()) {
      if (s.jeda) window.speechSynthesis.pause();
      else window.speechSynthesis.resume();
    }
  };

  const ubahSuara = () => {
    const s = S.current;
    s.suara = !s.suara;
    setSuara(s.suara);
    if (!s.suara) {
      hentikanSuaraGuruModul();
      s.suaraBeres = true;
    }
  };

  const ulang = () => {
    hentikanSuaraGuruModul();
    mulai(0);
  };

  const lompatKe = (a: number) => {
    hentikanSuaraGuruModul();
    mulai(a);
  };

  // Hentikan suara dan waktu saat siswa pindah tab atau sub-bab. Jeda otomatis saat layar disembunyikan.
  useEffect(() => {
    const s = S.current;
    const tersembunyi = () => {
      if (document.hidden && s.jalan && !s.jeda && !s.selesai) {
        s.jeda = true;
        setJeda(true);
        if (adaSuaraPerangkat()) window.speechSynthesis.pause();
      }
    };
    document.addEventListener("visibilitychange", tersembunyi);
    return () => {
      document.removeEventListener("visibilitychange", tersembunyi);
      s.jalan = false;
      s.nomor += 1;
      hentikanSuaraGuruModul();
    };
  }, []);

  const ad = adegan[pos.a];
  const kalimat = selesai ? "Selesai. Tekan Ulang untuk memutar lagi." : sudahMulai ? ad.ketukan[pos.k] : "Tekan Mulai untuk memutar video cerita.";

  return (
    <div className="space-y-2 rounded-3xl border-4 border-[#1C01A5] bg-white p-2 shadow-[0_5px_0_rgba(28,1,165,0.22)]">
      <style>{CSS}</style>
      <div className="flex items-center justify-between gap-2 px-1">
        <p className="min-w-0 text-base font-black leading-tight text-[#1C01A5] md:text-lg">🎬 Video: {judul}</p>
        <p className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-[#FFE566] px-2 py-0.5 text-[11px] font-black text-[#1C01A5]">
          Adegan {pos.a + 1} dari {adegan.length}
        </p>
      </div>

      <div className="relative mx-auto w-full max-w-xl overflow-hidden rounded-[1.4rem] border-4 border-[#1C01A5] bg-[#DFF1FF]">
        <svg viewBox="0 0 300 208" className={`block h-auto w-full ${jeda ? "vc-jeda" : ""}`} role="img" aria-label={`Animasi cerita: ${ad.judul}`}>
          <Latar />
          <g key={ad.id} className="vc-masuk">
            {ad.render({ k: pos.k, t })}
          </g>
        </svg>
        {!sudahMulai ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[#FFE9A8]/90 px-4 text-center text-[#1C01A5]">
            <p className="text-3xl font-black leading-tight md:text-4xl">{judul}</p>
            <p className="text-sm font-bold md:text-base">{subjudul}</p>
            <button
              type="button"
              onClick={() => mulai(0)}
              aria-label={`Mulai putar video ${judul}`}
              className="rounded-full border-4 border-[#1C01A5] bg-[#FFE566] px-6 py-2 text-lg font-black text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.35)]"
            >
              ▶ Mulai
            </button>
          </div>
        ) : null}
      </div>

      <p role="status" aria-live="polite" className="min-h-[3.4rem] rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] px-3 py-2 text-center text-base font-black leading-snug text-[#1C01A5] md:text-lg">
        {kalimat}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-1.5" role="group" aria-label="Pilih adegan">
        {adegan.map((x, i) => (
          <button
            key={x.id}
            type="button"
            onClick={() => lompatKe(i)}
            aria-label={`Adegan ${i + 1}: ${x.judul}`}
            aria-current={sudahMulai && i === pos.a ? "step" : undefined}
            className={`flex h-9 w-9 items-center justify-center rounded-full border-4 border-[#1C01A5] text-sm font-black text-[#1C01A5] ${sudahMulai && i === pos.a ? "bg-[#FFE566]" : sudahMulai && i < pos.a ? "bg-[#BBF7D0]" : "bg-white"}`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2">
        <button type="button" onClick={ubahJeda} disabled={!sudahMulai || selesai} aria-pressed={jeda} className={`${TOMBOL} disabled:opacity-40`}>
          {jeda ? "▶ Lanjut" : "⏸ Jeda"}
        </button>
        <button type="button" onClick={ulang} disabled={!sudahMulai} className={`${TOMBOL} disabled:opacity-40`}>
          ↻ Ulang
        </button>
        <button type="button" onClick={ubahSuara} aria-pressed={suara} className={TOMBOL}>
          {suara ? "🔊 Suara: hidup" : "🔇 Suara: mati"}
        </button>
      </div>
    </div>
  );
}
