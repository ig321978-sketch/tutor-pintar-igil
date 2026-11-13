"use client";

import React, { useEffect, useRef } from "react";
import type { AdeganVideo } from "../video-cerita";
import { bacaDetikPerKata, kalibrasiDetikPerKata, kataDari, kataPadaWaktu, keadaanStory, type AdeganStory, type Obj, type VideoStory } from "./logika-story";

export * from "./logika-story";

/* ------------------------------------------------------------------------ */
/* Mesin Story baru (animasi bergaris waktu): tiap adegan adalah DATA. Tiap     */
/* ketukan (kalimat suara) membawa daftar aksi gambar yang dipicu pada KATA    */
/* tertentu dalam kalimat itu (at: "payung", "putih@2", atau nomor kata).       */
/* Keadaan gambar dihitung murni dari (adegan, ketukan, kata), jadi suara dan   */
/* gambar bersumber satu data dan bisa diuji tanpa peramban.                    */
/* Tanpa model bahasa, tanpa jaringan. Diuji: scripts/uji-story-k6b4a.mjs.       */
/* ------------------------------------------------------------------------ */

/* ------------------------------ Penggambar ------------------------------ */

const BIRU = "#1C01A5";

function Kepala({ o }: { o: Obj }) {
  const x2 = o.x2 ?? 0;
  const y2 = o.y2 ?? 0;
  const sudut = Math.atan2(y2, x2);
  const s = 7 + (o.tebal ?? 2) * 1.7;
  const titik = [
    [x2, y2],
    [x2 - s * Math.cos(sudut - 0.45), y2 - s * Math.sin(sudut - 0.45)],
    [x2 - s * Math.cos(sudut + 0.45), y2 - s * Math.sin(sudut + 0.45)],
  ]
    .map((p) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`)
    .join(" ");
  return <polygon points={titik} fill={o.warna ?? BIRU} />;
}

function Bentuk({ o }: { o: Obj }) {
  const warna = o.warna ?? "none";
  const garis = o.garis ?? "none";
  const tebal = o.tebal ?? 2;
  if (o.t === "kotak") return <rect x={0} y={0} width={o.w ?? 10} height={o.h ?? 10} rx={o.rx ?? 0} fill={warna} stroke={garis} strokeWidth={tebal} strokeDasharray={o.putus ? "4 3" : undefined} />;
  if (o.t === "bulat") return <circle cx={0} cy={0} r={o.r ?? 5} fill={warna} stroke={garis} strokeWidth={tebal} strokeDasharray={o.putus ? "4 3" : undefined} />;
  if (o.t === "teks")
    return (
      <text x={0} y={0} textAnchor={o.anchor ?? "middle"} fontSize={o.u ?? 10} fontWeight={900} fill={o.warna ?? BIRU} stroke={o.garis} strokeWidth={o.garis ? 0.6 : 0} paintOrder="stroke">
        {o.isi}
      </text>
    );
  if (o.t === "jalur") return <path d={o.d ?? ""} fill={warna} stroke={garis} strokeWidth={tebal} strokeLinejoin="round" strokeDasharray={o.gambar ? undefined : o.putus ? "4 3" : undefined} pathLength={o.gambar ? 1 : undefined} className={o.gambar ? "st-gambar" : undefined} />;
  // garis dan panah
  const stroke = o.garis ?? o.warna ?? BIRU;
  return (
    <g>
      <path d={`M0 0 L${o.x2 ?? 0} ${o.y2 ?? 0}`} fill="none" stroke={stroke} strokeWidth={tebal} strokeLinecap="round" strokeDasharray={o.gambar ? undefined : o.putus ? "4 3" : undefined} pathLength={o.gambar ? 1 : undefined} className={o.gambar ? "st-gambar" : undefined} />
      {o.t === "panah" ? <Kepala o={{ ...o, warna: stroke }} /> : null}
    </g>
  );
}

function Benda({ o }: { o: Obj }) {
  const gaya: React.CSSProperties = {
    transform: `translate(${o.x ?? 0}px, ${o.y ?? 0}px) rotate(${o.rot ?? 0}deg) scale(${o.skala ?? 1})`,
    opacity: o.op ?? 1,
  };
  return (
    <g className="st-benda" style={gaya}>
      <g className={`st-masuk ${o.sorot ? "st-sorot" : ""}`}>
        <Bentuk o={o} />
      </g>
    </g>
  );
}

const CSS = `
.st-benda{transition:transform .9s cubic-bezier(.4,0,.2,1),opacity .6s ease;transform-box:view-box}
.st-masuk{animation:st-masuk .55s cubic-bezier(.3,1.4,.5,1) both;transform-box:fill-box;transform-origin:center}
@keyframes st-masuk{from{opacity:0;transform:translateY(5px) scale(.8)}to{opacity:1;transform:none}}
.st-sorot{animation:st-sorot 1s ease-in-out infinite;filter:drop-shadow(0 0 2px #FFC800) drop-shadow(0 0 3px #FFC800)}
@keyframes st-sorot{50%{opacity:.55}}
.st-gambar{stroke-dasharray:1;stroke-dashoffset:1;animation:st-gambar .9s ease forwards}
@keyframes st-gambar{to{stroke-dashoffset:0}}
@media (prefers-reduced-motion:reduce){.st-sorot,.st-masuk{animation:none}.st-gambar{animation:none;stroke-dashoffset:0}}
`;

/** Isi gambar satu adegan. Dipanggil pemutar dengan ketukan `k` dan waktu `t` (detik sejak ketukan dimulai). */
export function Panggung({ adegan, k, t }: { adegan: AdeganStory; k: number; t: number }) {
  const jejak = useRef({ k, t });
  useEffect(() => {
    const j = jejak.current;
    if (j.k !== k) {
      const lama = adegan.ketukan[j.k];
      if (lama) kalibrasiDetikPerKata(j.t, kataDari(lama.suara).length);
    }
    jejak.current = { k, t };
  }, [adegan, k, t]);
  const objs = keadaanStory(adegan, k, kataPadaWaktu(t, bacaDetikPerKata()));
  return (
    <g>
      <style>{CSS}</style>
      <rect x={0} y={0} width={300} height={208} fill={adegan.latar} />
      {objs.map((o) => (
        <Benda key={o.id} o={o} />
      ))}
      <text x={296} y={205} textAnchor="end" fontSize={6.5} fontWeight={700} fill={BIRU} opacity={0.55}>
        {adegan.sumber}
      </text>
    </g>
  );
}

/** Ubah adegan Story menjadi adegan pemutar yang sudah ada (VideoCerita dan DaftarVideoCerita). */
export function keAdeganVideo(a: AdeganStory): AdeganVideo {
  const minimal: Partial<Record<number, number>> = {};
  a.ketukan.forEach((_, i) => {
    minimal[i] = 2.4;
  });
  return { id: a.id, judul: a.judul, ketukan: a.ketukan.map((k) => k.suara), render: ({ k, t }) => <Panggung adegan={a} k={k} t={t} />, waktu: true, minimal };
}

export function keVideoSiap(v: VideoStory, poster?: { a: number; k: number }) {
  const a = poster?.a ?? 0;
  const k = poster?.k ?? Math.min(2, v.adegan[a].ketukan.length - 1);
  return { naskah: { id: v.id, judul: v.judul, subjudul: v.subjudul }, adegan: v.adegan.map(keAdeganVideo), poster: { a, k } };
}
