"use client";

import React, { useEffect, useRef, useState } from "react";
import { CSS_LEMARI } from "../lemari-k1b1a/ui";
import {
  NAMA_NILAI,
  URUT_ATURAN,
  awalTeras,
  catBarang,
  gantiAturan,
  kalimatBarang,
  kalimatTeras,
  keranjangTeras,
  nilai,
  pilihBarang,
  ubahUkuran,
  type Aturan,
  type KeadaanTeras,
} from "./logika";
import { BARANG_SIM, EMOJI, IKON_ATURAN, WARNA } from "./data";

/**
 * Simulasi Kelas 1 Bab 4 Sub-Bab B: Misi Festival bagian satu, rak teras. Eksplorasi bebas tanpa skor: pilih aturan bentuk, warna,
 * atau ukuran, dan barang pindah sendiri ke keranjangnya; isi tiap keranjang tampil. Ketuk satu barang untuk melihat ketiga cirinya,
 * lalu cat atau ubah ukurannya dan lihat keranjangnya berubah. Keranjang kuning mula-mula kosong. Barang berbeda dari Story.
 */
const LEBAR = 300;
const TINGGI = 196;
function letakRak(aturan: Aturan, j: number): { x: number; y: number; w: number; h: number } {
  const m = aturan === "ukuran" ? 2 : 3;
  const w = (288 - (m - 1) * 8) / m;
  return { x: 6 + j * (w + 8), y: 46, w, h: 144 };
}
function slotRak(t: { x: number; y: number; w: number }, n: number): { x: number; y: number } {
  const kolom = t.w > 120 ? 4 : 3;
  const x0 = t.x + (t.w - (kolom - 1) * 30) / 2;
  return { x: x0 + (n % kolom) * 30, y: t.y + 42 + Math.floor(n / kolom) * 32 };
}

export default function SimulasiRakTeras({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanTeras) => void }) {
  const [k, setK] = useState<KeadaanTeras>(() => awalTeras(BARANG_SIM));
  const laporRef = useRef(onKeadaan);
  useEffect(() => {
    laporRef.current = onKeadaan;
  }, [onKeadaan]);
  useEffect(() => {
    laporRef.current?.(k);
  }, [k]);
  const ubah = (baru: KeadaanTeras, ucap?: string) => {
    setK(baru);
    if (ucap) speakGuru(ucap);
  };
  const kr = keranjangTeras(k);
  const letak: { x: number; y: number }[] = k.barang.map(() => ({ x: 0, y: 0 }));
  kr.forEach((x, j) => x.isi.forEach((i, n) => (letak[i] = slotRak(letakRak(k.aturan, j), n))));
  const b = k.terpilih === null ? null : k.barang[k.terpilih];
  const tombol = "min-h-[44px] rounded-full border-2 border-[#1C01A5] bg-white px-3 text-sm font-black text-[#1C01A5] disabled:opacity-40";

  return (
    <div className="space-y-3">
      <style>{CSS_LEMARI}</style>
      <p className="rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2 text-center text-sm font-bold text-[#1C01A5]">
        Rak teras. Pilih aturan, lalu lihat barang pindah keranjang. Ketuk satu barang untuk melihat cirinya, cat, atau ubah ukurannya.
      </p>
      <div className="flex flex-wrap justify-center gap-1.5" role="group" aria-label="Pilih aturan">
        {URUT_ATURAN.map((a) => (
          <button
            key={a}
            type="button"
            aria-pressed={k.aturan === a}
            onClick={() => {
              const baru = gantiAturan(k, a);
              ubah(baru, k.terpilih !== null && k.aturan !== a ? `${kalimatBarang(baru, k.terpilih)}` : kalimatTeras(baru));
            }}
            className={`min-h-[44px] rounded-full border-4 px-4 text-sm font-black ${k.aturan === a ? "border-[#FACC15] bg-[#1C01A5] text-[#FFE566]" : "border-[#BDB4F6] bg-white text-[#1C01A5]"}`}
          >
            {IKON_ATURAN[a]} aturan {a}
          </button>
        ))}
      </div>

      <div className="rounded-2xl border-4 border-[#78350F] p-2" style={{ background: "#C8A47A", backgroundImage: "repeating-linear-gradient(90deg,rgba(120,53,15,0.18) 0 2px,transparent 2px 22px)" }}>
        <svg viewBox={`0 0 ${LEBAR} ${TINGGI}`} className="mx-auto block w-full max-w-[460px] select-none rounded-xl bg-[#FFFBEB]" aria-label={`Rak teras, aturan ${k.aturan}`}>
          <rect x={4} y={6} width={292} height={8} rx={3} fill="#92400E" />
          <text x={150} y={32} textAnchor="middle" fontSize={12} fontWeight={900} fill="#1C01A5">
            aturan: {k.aturan} · semua {k.barang.length} barang
          </text>
          {kr.map((x, j) => {
            const t = letakRak(k.aturan, j);
            const kosong = x.isi.length === 0;
            return (
              <g key={`${k.aturan}-${x.nama}`}>
                <rect x={t.x} y={t.y} width={t.w} height={t.h} rx={10} fill={kosong ? "#F5F5F4" : "#F5DEB3"} stroke="#92400E" strokeWidth={2} strokeDasharray={kosong ? "6 4" : undefined} />
                <rect x={t.x - 2} y={t.y - 3} width={t.w + 4} height={8} rx={4} fill="#D69E2E" stroke="#92400E" strokeWidth={1} />
                <text x={t.x + t.w / 2} y={t.y + 20} textAnchor="middle" fontSize={11} fontWeight={900} fill="#78350F">
                  {NAMA_NILAI[x.nama]}
                </text>
                <circle cx={t.x + t.w - 12} cy={t.y + 4} r={11} fill="#FACC15" stroke="#1C01A5" strokeWidth={2} />
                <text x={t.x + t.w - 12} y={t.y + 8.5} textAnchor="middle" fontSize={12} fontWeight={900} fill="#1C01A5">
                  {x.isi.length}
                </text>
                {kosong ? (
                  <text x={t.x + t.w / 2} y={t.y + 80} textAnchor="middle" fontSize={10} fontWeight={800} fill="#78716C">
                    kosong
                  </text>
                ) : null}
              </g>
            );
          })}
          {k.barang.map((x, i) => {
            const p = letak[i];
            const r = x.ukuran === "besar" ? 13 : 8.5;
            const [isi, garis] = WARNA[x.warna];
            const pilih = k.terpilih === i;
            return (
              <g
                key={i}
                role="button"
                tabIndex={0}
                aria-label={`barang ${x.bentuk === "segiempat" ? "segi empat" : x.bentuk} ${x.warna} ${x.ukuran}${pilih ? ", terpilih" : ""}`}
                onClick={() => ubah(pilihBarang(k, pilih ? null : i), pilih ? undefined : kalimatBarang(k, i))}
                onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && ubah(pilihBarang(k, pilih ? null : i), pilih ? undefined : kalimatBarang(k, i))}
                style={{ transform: `translate(${p.x}px, ${p.y}px)`, transition: "transform 0.6s ease-in-out", cursor: "pointer" }}
              >
                <circle r={15} fill="transparent" />
                {pilih ? <circle r={r + 5} fill="none" stroke="#15803D" strokeWidth={2.5} strokeDasharray="4 3" /> : null}
                {x.bentuk === "lengkung" ? (
                  <circle r={r * 0.9} fill={isi} stroke={garis} strokeWidth={2.2} />
                ) : x.bentuk === "segitiga" ? (
                  <path d={`M 0 ${-r} L ${r * 0.95} ${r * 0.75} L ${-r * 0.95} ${r * 0.75} Z`} fill={isi} stroke={garis} strokeWidth={2.2} strokeLinejoin="round" />
                ) : (
                  <rect x={-r * 0.8} y={-r * 0.8} width={r * 1.6} height={r * 1.6} rx={2} fill={isi} stroke={garis} strokeWidth={2.2} />
                )}
                <text y={r * 0.3} textAnchor="middle" fontSize={Math.max(7, r * 0.75)}>
                  {EMOJI[x.bentuk]}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="rounded-2xl border-4 border-[#1C01A5] bg-white p-2 text-center">
        {b && k.terpilih !== null ? (
          <>
            <p className="text-sm font-black text-[#1C01A5]">
              Barang terpilih: {NAMA_NILAI[b.bentuk]} · {b.warna} · {b.ukuran}
            </p>
            <div className="mt-1 flex flex-wrap justify-center gap-1">
              {URUT_ATURAN.map((a) => (
                <span key={a} className={`rounded-full px-2 py-0.5 text-xs font-black ${a === k.aturan ? "bg-[#FACC15] text-[#1C01A5]" : "bg-[#EEF2FF] text-[#1C01A5]/70"}`}>
                  aturan {a}: keranjang {NAMA_NILAI[nilai(b, a)]}
                </span>
              ))}
            </div>
            <div className="mt-2 flex flex-wrap justify-center gap-1.5">
              <button type="button" className={tombol} onClick={() => ubah(catBarang(k), `Dicat ${catBarang(k).barang[k.terpilih as number].warna}.`)}>
                {"\u{1F58C}\u{FE0F}"} Cat warna lain
              </button>
              <button type="button" className={tombol} onClick={() => ubah(ubahUkuran(k), `Sekarang ${ubahUkuran(k).barang[k.terpilih as number].ukuran}.`)}>
                {"\u{1F504}"} Ubah ukuran
              </button>
            </div>
          </>
        ) : (
          <p className="text-sm font-bold text-[#1C01A5]/80">Ketuk satu barang di rak untuk melihat bentuk, warna, dan ukurannya.</p>
        )}
      </div>
      <p role="status" aria-live="polite" className="text-center text-sm font-black text-[#1C01A5]">
        {kalimatTeras(k)}
      </p>
    </div>
  );
}
