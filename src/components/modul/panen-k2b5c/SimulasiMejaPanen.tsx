"use client";

import React, { useEffect, useRef, useState } from "react";
import { CSS_LEMARI } from "../lemari-k1b1a/ui";
import { lintasanSektor, ujungGaris } from "./geometri";
import {
  GARIS_KAIN,
  NAMA_PITA,
  SUARA_MODE,
  SUDUT_PAI,
  awalPanen,
  bagianKain,
  bagianPai,
  jumlahSusun,
  kalimatPanen,
  mulaiLagiPanen,
  pilihModePanen,
  tambahPita,
  tarikGarisKain,
  tarikGarisPai,
  ulangKain,
  ulangPai,
  ulangSusun,
  type KeadaanPanen,
  type ModePanen,
  type UkuranPita,
} from "./logika";
import { MISI_PANEN_TEKS, PITA_SIM, WARNA_BAGIAN } from "./data-sim";

/**
 * Simulasi Kelas 2 Bab 5 Sub-Bab C: Meja Panen (Misi Meja Panen). Tiga alat tanpa skor: Pai (pai apel bundar dibagi dua garis lewat pusat), Kain (taplak persegi
 * dibagi dua garis) dan Dinding (pita seperempat, setengah, utuh disusun di batang). Luas bagian dihitung program dari geometri.ts.
 */
const MODE: { id: ModePanen; nama: string; ikon: string }[] = [
  { id: "pai", nama: "Pai", ikon: "\u{1F967}" },
  { id: "kain", nama: "Kain", ikon: "\u{1F9F5}" },
  { id: "dinding", nama: "Dinding", ikon: "\u{1F9F1}" },
];
const UNGU = "#1C01A5";
const NAMA_SUDUT: Record<number, string> = { 0: "datar", 30: "landai", 45: "miring", 60: "curam", 90: "tegak", 120: "curam kiri", 135: "miring kiri", 150: "landai kiri" };

function GambarPai({ garis }: { garis: number[] }) {
  const bagian = bagianPai(garis);
  return (
    <svg viewBox="0 0 200 200" className="mx-auto block w-full max-w-[260px]" role="img" aria-label="Pai apel bundar">
      {bagian.map((b, i) => (
        <path key={i} d={lintasanSektor(100, 100, 80, b.dari ?? 0, b.ke ?? 360)} fill={garis.length >= 2 ? WARNA_BAGIAN[i % WARNA_BAGIAN.length] : "#FDE68A"} stroke="#92400E" strokeWidth={2} />
      ))}
      {garis.map((a) => {
        const [p, q] = ujungGaris({ a }, 100, 100, 80, 80);
        return <line key={a} x1={p[0]} y1={p[1]} x2={q[0]} y2={q[1]} stroke={UNGU} strokeWidth={3} strokeLinecap="round" />;
      })}
      <circle cx={100} cy={100} r={3.5} fill="#DC2626" />
    </svg>
  );
}

function GambarKain({ garis }: { garis: string[] }) {
  const bagian = bagianKain(garis);
  return (
    <svg viewBox="0 0 200 200" className="mx-auto block w-full max-w-[260px]" role="img" aria-label="Kain taplak persegi">
      {bagian.map((b, i) => (
        <polygon key={i} points={(b.titik ?? []).map(([x, y]) => `${100 + x * 80},${100 + y * 80}`).join(" ")} fill={garis.length >= 2 ? WARNA_BAGIAN[i % WARNA_BAGIAN.length] : "#BFDBFE"} stroke="#1E3A8A" strokeWidth={2} strokeLinejoin="round" />
      ))}
      {garis.map((id) => {
        const [p, q] = ujungGaris({ a: GARIS_KAIN.find((g) => g.id === id)?.a ?? 0 }, 100, 100, 80, 113);
        return <line key={id} x1={p[0]} y1={p[1]} x2={q[0]} y2={q[1]} stroke={UNGU} strokeWidth={3} strokeLinecap="round" clipPath="url(#kain-potong)" />;
      })}
      <defs>
        <clipPath id="kain-potong">
          <rect x={20} y={20} width={160} height={160} />
        </clipPath>
      </defs>
    </svg>
  );
}

function BatangDinding({ susun }: { susun: UkuranPita[] }) {
  return (
    <svg viewBox="0 0 280 150" className="mx-auto block w-full max-w-[380px]" role="img" aria-label="Dinding pita dan batang susun">
      {[1, 2, 4].map((n, r) => (
        <g key={n}>
          {Array.from({ length: 4 / n }, (_, i) => (
            <rect key={i} x={20 + (i * 240) / (4 / n)} y={8 + r * 26} width={240 / (4 / n)} height={22} fill={PITA_SIM[n === 1 ? 0 : n === 2 ? 1 : 2].warna} stroke={UNGU} strokeWidth={1.4} />
          ))}
          <text x={140} y={23 + r * 26} textAnchor="middle" fontSize={8.5} fontWeight={900} fill={UNGU}>
            {n === 1 ? "seperempat" : n === 2 ? "setengah" : "utuh"}
          </text>
        </g>
      ))}
      <rect x={20} y={100} width={240} height={32} fill="#FEF3C7" stroke="#92400E" strokeWidth={2.4} strokeDasharray="5 3" />
      {susun.map((u, i) => {
        const w = (u * 240) / 4;
        const x = 20 + (susun.slice(0, i).reduce((n, q) => n + q, 0) * 240) / 4;
        return (
          <g key={i}>
            <rect x={x} y={100} width={w} height={32} fill={PITA_SIM[u === 1 ? 0 : u === 2 ? 1 : 2].warna} stroke={UNGU} strokeWidth={1.8} />
            <text x={x + w / 2} y={120} textAnchor="middle" fontSize={8} fontWeight={900} fill={UNGU}>
              {NAMA_PITA[u]}
            </text>
          </g>
        );
      })}
      <text x={140} y={146} textAnchor="middle" fontSize={8.5} fontWeight={900} fill="#92400E">
        batang susun
      </text>
    </svg>
  );
}

export default function SimulasiMejaPanen({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanPanen) => void }) {
  const [k, setK] = useState<KeadaanPanen>(() => awalPanen());
  const [catatan, setCatatan] = useState("");
  const [goyang, setGoyang] = useState(false);
  const laporRef = useRef(onKeadaan);
  useEffect(() => {
    laporRef.current = onKeadaan;
  }, [onKeadaan]);
  useEffect(() => {
    laporRef.current?.(k);
  }, [k]);
  const ubah = (baru: KeadaanPanen, ucap?: string) => {
    setK(baru);
    if (ucap) {
      setCatatan(ucap);
      speakGuru(ucap);
    }
  };
  const salah = (ucap: string) => {
    setGoyang(true);
    window.setTimeout(() => setGoyang(false), 480);
    setCatatan(ucap);
    speakGuru(ucap);
  };
  const tombol = "min-h-[44px] rounded-full border-2 border-[#1C01A5] bg-white px-3 text-sm font-black text-[#1C01A5] disabled:opacity-40";
  const saklar = (nyala: boolean) => `min-h-[44px] rounded-full border-2 px-3 text-sm font-black ${nyala ? "border-[#15803D] bg-[#15803D] text-white" : "border-[#15803D] bg-white text-[#15803D]"}`;

  const ganti = (m: ModePanen) => ubah(pilihModePanen(k, m), SUARA_MODE[m]);
  const garisPai = (a: number) => {
    const r = tarikGarisPai(k, a);
    if (r.ok) ubah(r.k, r.pesan);
    else {
      ubah(r.k);
      salah(r.pesan);
    }
  };
  const garisKain = (id: string) => {
    const r = tarikGarisKain(k, id);
    if (r.ok) ubah(r.k, r.pesan);
    else {
      ubah(r.k);
      salah(r.pesan);
    }
  };
  const pita = (u: UkuranPita) => {
    const r = tambahPita(k, u);
    if (r.ok) ubah(r.k, r.pesan);
    else {
      ubah(r.k);
      salah(r.pesan);
    }
  };
  const ulang = () => {
    if (k.mode === "pai") ubah(ulangPai(k), "Pai dikosongkan. Tarik dua garis lagi.");
    else if (k.mode === "kain") ubah(ulangKain(k), "Kain dikosongkan. Pilih dua garis lagi.");
    else ubah(ulangSusun(k), "Batang dikosongkan. Susun pita lagi.");
  };

  return (
    <div className="space-y-3" data-uji="simulasi-meja-panen">
      <style>{CSS_LEMARI}</style>
      <div className="rounded-2xl border-4 border-[#15803D] bg-[#F0FDF4] p-2">
        <p className="text-sm font-black text-[#14532D]">Misi Meja Panen</p>
        <p className="text-xs font-bold text-[#14532D]/80">{MISI_PANEN_TEKS}</p>
      </div>

      <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilih alat">
        {MODE.map((m) => (
          <button key={m.id} type="button" onClick={() => ganti(m.id)} aria-pressed={k.mode === m.id} className={saklar(k.mode === m.id)}>
            <span aria-hidden="true">{m.ikon}</span> {m.nama}
          </button>
        ))}
      </div>

      <div className={`rounded-xl border-[6px] border-[#92400E] bg-[#FFFBEB] p-2 ${goyang ? "lm-goyang" : ""}`}>
        {k.mode === "pai" ? (
          <>
            <p className="mb-1 text-center text-xs font-black text-[#92400E]">Pai apel: pilih arah dua garis lewat pusat</p>
            <GambarPai garis={k.paiGaris} />
            <div className="mt-2 flex flex-wrap justify-center gap-1.5" role="group" aria-label="Arah garis">
              {SUDUT_PAI.map((a) => (
                <button key={a} type="button" onClick={() => garisPai(a)} aria-pressed={k.paiGaris.includes(a)} aria-label={`Garis ${NAMA_SUDUT[a]}`} className={saklar(k.paiGaris.includes(a))}>
                  {NAMA_SUDUT[a]}
                </button>
              ))}
            </div>
          </>
        ) : null}
        {k.mode === "kain" ? (
          <>
            <p className="mb-1 text-center text-xs font-black text-[#92400E]">Kain taplak: pilih dua garis</p>
            <GambarKain garis={k.kainGaris} />
            <div className="mt-2 flex flex-wrap justify-center gap-1.5" role="group" aria-label="Pilih garis">
              {GARIS_KAIN.map((g) => (
                <button key={g.id} type="button" onClick={() => garisKain(g.id)} aria-pressed={k.kainGaris.includes(g.id)} className={saklar(k.kainGaris.includes(g.id))}>
                  {g.nama}
                </button>
              ))}
            </div>
          </>
        ) : null}
        {k.mode === "dinding" ? (
          <>
            <p className="mb-1 text-center text-xs font-black text-[#92400E]">Dinding pita: ketuk pita untuk menyusunnya di batang</p>
            <BatangDinding susun={k.susun} />
            <div className="mt-2 flex flex-wrap justify-center gap-1.5" role="group" aria-label="Pilih pita">
              {PITA_SIM.map((p) => (
                <button key={p.u} type="button" onClick={() => pita(p.u)} className="min-h-[44px] rounded-full border-2 border-[#1C01A5] px-3 text-sm font-black text-[#1C01A5]" style={{ background: p.warna }}>
                  + {p.nama}
                </button>
              ))}
            </div>
            <p className="mt-1 text-center text-[11px] font-bold text-[#92400E]">{jumlahSusun(k.susun) >= 4 ? "Batang penuh." : "Batang belum penuh."}</p>
          </>
        ) : null}
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        <button type="button" className={tombol} onClick={ulang}>
          {"\u{1F504}"} Ulangi
        </button>
        <button type="button" className={tombol} onClick={() => ubah(mulaiLagiPanen(), "Mulai lagi dari awal.")}>
          Mulai dari awal
        </button>
      </div>
      <p role="status" aria-live="polite" className="min-h-[1.5rem] rounded-xl bg-white/85 px-2 text-center text-sm font-black text-[#1C01A5]">
        {catatan || kalimatPanen(k)}
      </p>
    </div>
  );
}
