"use client";

import React, { useEffect, useRef, useState } from "react";
import { CSS_LEMARI } from "../lemari-k1b1a/ui";
import {
  PAKET_NERACA,
  SETENGAH_GABUNG,
  TUMPUK_BAGI,
  awalBibit,
  bagiLagi,
  beriSatu,
  gandakan,
  kalimatBibit,
  kata,
  miringNeraca,
  neracaSeimbang,
  pilihModeBibit,
  pilihPaket,
  pilihSetengah,
  pilihTumpuk,
  pindahBenda,
  petunjukBibit,
  setengahSekarang,
  tumpukGenap,
  ulangBagi,
  ulangNeraca,
  type KeadaanBibit,
  type ModeBibit,
} from "./logika";
import { MISI_BIBIT_TEKS } from "./data-peta";
import { LEBAR_ADEGAN, TINGGI_ADEGAN, tataGrid } from "./periksa";

/**
 * Simulasi Kelas 2 Bab 5 Sub-Bab B: Bedeng Bibit (Misi Bedeng Bibit), tengah cerita Kebun Sekolah. Eksplorasi bebas tanpa skor, tiga alat:
 * Bagi (beri satu benda bergantian ke petak kiri dan kanan sampai habis, termasuk tumpukan ganjil), Neraca (pindahkan benda dari piringan yang lebih banyak
 * sampai seimbang), dan Gabung (gandakan setengahnya menjadi seluruhnya). Benda dan bilangan berbeda dari Story.
 */
const MODE: { id: ModeBibit; nama: string; ikon: string }[] = [
  { id: "bagi", nama: "Bagi", ikon: "\u{1F932}" },
  { id: "neraca", nama: "Neraca", ikon: "\u{2696}\u{FE0F}" },
  { id: "gabung", nama: "Gabung", ikon: "\u{1F501}" },
];
const BIRU = "#1C01A5";
const SVG = "mx-auto block w-full max-w-[420px] touch-none select-none rounded-2xl bg-white/90";

function Tumpuk({ emoji, n, x, y, w, h, maks = 5 }: { emoji: string; n: number; x: number; y: number; w: number; h: number; maks?: number }) {
  const g = tataGrid(n, x, y, w, h, maks);
  return (
    <g>
      {g.titik.map((t, i) => (
        <text key={i} x={t.x} y={t.y + g.s * 0.34} textAnchor="middle" fontSize={g.s * 0.92}>
          {emoji}
        </text>
      ))}
    </g>
  );
}
const Teks = ({ x, y, isi }: { x: number; y: number; isi: string }) => (
  <text x={x} y={y} textAnchor="middle" fontSize={9.5} fontWeight={900} fill={BIRU}>
    {isi}
  </text>
);

export default function SimulasiBedengBibit({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanBibit) => void }) {
  const [k, setK] = useState<KeadaanBibit>(() => awalBibit());
  const [goyang, setGoyang] = useState("");
  const [hasil, setHasil] = useState("");
  const laporRef = useRef(onKeadaan);
  useEffect(() => {
    laporRef.current = onKeadaan;
  }, [onKeadaan]);
  useEffect(() => {
    laporRef.current?.(k);
  }, [k]);
  const ubah = (baru: KeadaanBibit, ucap?: string) => {
    setK(baru);
    const t = ucap ?? kalimatBibit(baru);
    setHasil(t);
    speakGuru(t);
  };
  const salah = (id: string, baru: KeadaanBibit, ucap: string) => {
    setK(baru);
    setGoyang(id);
    window.setTimeout(() => setGoyang(""), 480);
    setHasil(ucap);
    speakGuru(ucap);
  };
  const tombol = "min-h-[44px] rounded-full border-2 border-[#1C01A5] bg-white px-3 text-sm font-black text-[#1C01A5] disabled:opacity-40";
  const pilih = (nyala: boolean) => `min-h-[40px] rounded-xl border-2 px-2 text-xs font-black ${nyala ? "border-[#15803D] bg-[#15803D] text-white" : "border-[#15803D] bg-white text-[#15803D]"}`;
  const saklar = (nyala: boolean) => `min-h-[44px] rounded-full border-2 px-3 text-sm font-black ${nyala ? "border-[#92400E] bg-[#92400E] text-white" : "border-[#92400E] bg-white text-[#92400E]"}`;
  const ganti = (m: ModeBibit) => {
    const baru = pilihModeBibit(k, m);
    setK(baru);
    const t = m === "bagi" ? "Bagikan benda satu-satu ke dua petak sampai habis." : m === "neraca" ? "Seimbangkan neraca dengan memindahkan benda." : "Pilih setengahnya, lalu gandakan.";
    setHasil(t);
    speakGuru(t);
  };

  /* ------------------------------ Bagi ------------------------------ */
  const tp = TUMPUK_BAGI[k.tumpuk];
  const beri = (sisi: 0 | 1) => {
    const r = beriSatu(k, sisi);
    if (r.ok) ubah(r.k);
    else salah("bagi", r.k, petunjukBibit(r.perlu, k));
  };

  /* ------------------------------ Neraca ------------------------------ */
  const pk = PAKET_NERACA[k.paket];
  const dy = miringNeraca(k) === -1 ? 10 : miringNeraca(k) === 1 ? -10 : 0;
  const yl = 54 + dy;
  const yr = 54 - dy;
  const pindah = (dari: "kiri" | "kanan") => {
    const r = pindahBenda(k, dari);
    if (r.ok) ubah(r.k);
    else salah("neraca", r.k, petunjukBibit(r.perlu, k));
  };
  const pan = (n: number, cx: number, y: number) => (
    <g>
      <line x1={cx} y1={y} x2={cx} y2={y + 14} stroke="#78350F" strokeWidth={1.6} />
      <rect x={cx - 38} y={y + 14} width={76} height={6} rx={3} fill="#FDE68A" stroke="#92400E" strokeWidth={1.4} />
      {n > 0 ? <Tumpuk emoji={pk.emoji} n={n} x={cx - 36} y={y - 32} w={72} h={44} /> : null}
    </g>
  );

  /* ------------------------------ Gabung ------------------------------ */
  const h = setengahSekarang(k);
  const emojiGabung = TUMPUK_BAGI[k.setengah % TUMPUK_BAGI.length].emoji;

  return (
    <div className="space-y-3" data-uji="simulasi-bedeng-bibit">
      <style>{CSS_LEMARI}</style>
      <div className="rounded-2xl border-4 border-[#92400E] bg-[#FFFBEB] p-2">
        <p className="text-sm font-black text-[#78350F]">Misi Bedeng Bibit</p>
        <p className="text-xs font-bold text-[#78350F]/80">{MISI_BIBIT_TEKS}</p>
      </div>

      <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilih alat">
        {MODE.map((m) => (
          <button key={m.id} type="button" onClick={() => ganti(m.id)} aria-pressed={k.mode === m.id} className={saklar(k.mode === m.id)}>
            <span aria-hidden="true">{m.ikon}</span> {m.nama}
          </button>
        ))}
      </div>

      {k.mode === "bagi" ? (
        <div className="space-y-2">
          <div className="flex flex-wrap justify-center gap-1.5" role="group" aria-label="Pilih tumpukan">
            {TUMPUK_BAGI.map((t, i) => (
              <button key={t.benda} type="button" onClick={() => ubah(pilihTumpuk(k, i), `Tumpukan ${t.benda} dipilih. ${kalimatBibit(pilihTumpuk(k, i))}`)} aria-pressed={k.tumpuk === i} className={pilih(k.tumpuk === i)}>
                {t.emoji} {t.benda} {k.terbagi.includes(i) ? "\u{2705}" : k.ganjilSelesai.includes(i) ? "\u{2753}" : ""}
              </button>
            ))}
          </div>
          <div className={goyang === "bagi" ? "lm-goyang" : ""}>
            <svg viewBox={`0 0 ${LEBAR_ADEGAN} ${TINGGI_ADEGAN}`} className={SVG} aria-label="Bedeng dengan dua petak">
              <rect x={58} y={20} width={184} height={64} rx={8} fill="#FEF3C7" stroke="#B45309" strokeWidth={1.6} />
              <Teks x={150} y={15} isi={`di meja: ${k.sisa}`} />
              {k.sisa > 0 ? <Tumpuk emoji={tp.emoji} n={k.sisa} x={64} y={24} w={172} h={56} /> : null}
              <rect x={14} y={110} width={128} height={78} rx={8} fill="#92400E" fillOpacity={0.85} stroke="#451A03" strokeWidth={1.6} />
              <rect x={158} y={110} width={128} height={78} rx={8} fill="#92400E" fillOpacity={0.85} stroke="#451A03" strokeWidth={1.6} />
              <Teks x={78} y={104} isi={`petak kiri: ${k.kiri}`} />
              <Teks x={222} y={104} isi={`petak kanan: ${k.kanan}`} />
              {k.kiri > 0 ? <Tumpuk emoji={tp.emoji} n={k.kiri} x={18} y={114} w={120} h={70} /> : null}
              {k.kanan > 0 ? <Tumpuk emoji={tp.emoji} n={k.kanan} x={162} y={114} w={120} h={70} /> : null}
            </svg>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            <button type="button" className={tombol} onClick={() => beri(0)} disabled={k.sisa === 0}>
              Beri satu ke petak kiri
            </button>
            <button type="button" className={tombol} onClick={() => beri(1)} disabled={k.sisa === 0}>
              Beri satu ke petak kanan
            </button>
            <button type="button" className={tombol} onClick={() => ubah(ulangBagi(k), "Tumpukan diisi lagi. Bagi satu-satu dari awal.")}>
              Ulangi
            </button>
          </div>
          <p className="text-center text-xs font-bold text-[#78350F]/80">{tumpukGenap(k) ? "Tumpukan ini genap, jadi bisa dibagi sama banyak." : "Tumpukan ini ganjil, jadi akan tersisa satu."}</p>
        </div>
      ) : null}

      {k.mode === "neraca" ? (
        <div className="space-y-2">
          <div className="flex flex-wrap justify-center gap-1.5" role="group" aria-label="Pilih paket neraca">
            {PAKET_NERACA.map((p, i) => (
              <button key={p.benda} type="button" onClick={() => ubah(pilihPaket(k, i), `Paket ${p.benda} dipilih. ${kalimatBibit(pilihPaket(k, i))}`)} aria-pressed={k.paket === i} className={pilih(k.paket === i)}>
                {p.emoji} {p.benda} {k.neracaSet.includes(i) ? "\u{2705}" : ""}
              </button>
            ))}
          </div>
          <div className={goyang === "neraca" ? "lm-goyang" : ""}>
            <svg viewBox={`0 0 ${LEBAR_ADEGAN} ${TINGGI_ADEGAN}`} className={SVG} aria-label="Neraca dengan dua piringan">
              <rect x={147} y={50} width={6} height={104} rx={2} fill="#B45309" stroke="#78350F" strokeWidth={1} />
              <rect x={122} y={152} width={56} height={8} rx={3} fill="#92400E" stroke="#451A03" strokeWidth={1.2} />
              <line x1={96} y1={yl} x2={204} y2={yr} stroke="#78350F" strokeWidth={3.6} strokeLinecap="round" />
              <circle cx={150} cy={54} r={4} fill="#FDE68A" stroke="#78350F" strokeWidth={1.4} />
              {pan(k.piringKiri, 96, yl)}
              {pan(k.piringKanan, 204, yr)}
              <Teks x={96} y={188} isi={`piringan kiri: ${k.piringKiri}`} />
              <Teks x={204} y={188} isi={`piringan kanan: ${k.piringKanan}`} />
            </svg>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            <button type="button" className={tombol} onClick={() => pindah("kiri")}>
              Pindah satu dari kiri ke kanan
            </button>
            <button type="button" className={tombol} onClick={() => pindah("kanan")}>
              Pindah satu dari kanan ke kiri
            </button>
            <button type="button" className={tombol} onClick={() => ubah(ulangNeraca(k), "Neraca disusun lagi dari awal.")}>
              Ulangi
            </button>
          </div>
          <p className="text-center text-xs font-bold text-[#78350F]/80">{neracaSeimbang(k) ? "Neraca seimbang." : "Neraca miring: pindahkan dari piringan yang lebih banyak."}</p>
        </div>
      ) : null}

      {k.mode === "gabung" ? (
        <div className="space-y-2">
          <div className="flex flex-wrap justify-center gap-1.5" role="group" aria-label="Pilih setengahnya">
            {SETENGAH_GABUNG.map((n, i) => (
              <button key={n} type="button" onClick={() => ubah(pilihSetengah(k, i), `Setengahnya ${kata(n)}. Ketuk Gandakan.`)} aria-pressed={k.setengah === i} className={pilih(k.setengah === i)}>
                setengahnya {n} {k.digandakan.includes(n) ? "\u{2705}" : ""}
              </button>
            ))}
          </div>
          <svg viewBox={`0 0 ${LEBAR_ADEGAN} ${TINGGI_ADEGAN}`} className={SVG} aria-label="Setengah yang digandakan">
            <rect x={14} y={34} width={126} height={96} rx={8} fill="#FEF3C7" stroke="#B45309" strokeWidth={1.6} />
            <Teks x={77} y={28} isi="setengahnya" />
            <Tumpuk emoji={emojiGabung} n={h} x={18} y={38} w={118} h={88} maks={3} />
            {k.digandakanSekarang ? (
              <g>
                <rect x={160} y={34} width={126} height={96} rx={8} fill="#DCFCE7" stroke="#15803D" strokeWidth={1.6} />
                <Teks x={223} y={28} isi="gandaannya" />
                <Tumpuk emoji={emojiGabung} n={h} x={164} y={38} w={118} h={88} maks={3} />
                <text x={150} y={90} textAnchor="middle" fontSize={20} fontWeight={900} fill="#DC2626">
                  +
                </text>
                <text x={150} y={160} textAnchor="middle" fontSize={14} fontWeight={900} fill="#DC2626">
                  {`${h} + ${h} = ${2 * h}`}
                </text>
              </g>
            ) : (
              <g>
                <rect x={160} y={34} width={126} height={96} rx={8} fill="none" stroke="#B45309" strokeWidth={1.4} strokeDasharray="4 3" />
                <text x={223} y={90} textAnchor="middle" fontSize={26} fontWeight={900} fill="#B45309">
                  ?
                </text>
              </g>
            )}
          </svg>
          <div className={`flex flex-wrap justify-center gap-2 ${goyang === "gabung" ? "lm-goyang" : ""}`}>
            <button
              type="button"
              className={tombol}
              onClick={() => {
                const r = gandakan(k);
                if (r.ok) ubah(r.k);
                else salah("gabung", r.k, petunjukBibit(r.perlu, k));
              }}
            >
              Gandakan
            </button>
            <button type="button" className={tombol} onClick={() => ubah(bagiLagi(k), "Kembali ke setengahnya saja.")} disabled={!k.digandakanSekarang}>
              Kembali
            </button>
          </div>
        </div>
      ) : null}

      <p role="status" aria-live="polite" className="min-h-[2.5rem] rounded-xl bg-white/85 px-2 py-1 text-center text-sm font-black text-[#78350F]">
        {hasil || kalimatBibit(k)}
      </p>
    </div>
  );
}
