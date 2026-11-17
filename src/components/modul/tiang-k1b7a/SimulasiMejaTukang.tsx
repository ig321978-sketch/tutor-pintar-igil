"use client";

import React, { useEffect, useRef, useState } from "react";
import { CSS_LEMARI } from "../lemari-k1b1a/ui";
import {
  ambilTali,
  arahSusunan,
  awalTukang,
  hubungan,
  kalimatTukang,
  kata,
  luruskan,
  mulaiLagi,
  periksaTali,
  pilihBanding,
  pilihModeTukang,
  taruhTangga,
  ulangTangga,
  urutanTangga,
  type KeadaanTukang,
  type ModeTukang,
} from "./logika";
import { MISI_MEJA, TIANG_SIM } from "./data";

/**
 * Simulasi Kelas 1 Bab 7 Sub-Bab A: Meja Tukang (Misi Rumah Pohon bagian satu). Tiang di meja berbeda dari Story. Eksplorasi bebas tanpa skor,
 * empat alat untuk satu model meja: Luruskan (buang bata supaya semua tiang berdiri di garis awal yang sama), Banding (dua tiang berdampingan,
 * lebih tinggi, lebih pendek, atau sama tinggi), Tali (tali sepanjang satu tiang dibawa ke tiang lain: kurang, pas, atau lebih),
 * dan Tangga (pindahkan tiang menjadi tangga dari yang paling pendek atau paling tinggi).
 */
const D = TIANG_SIM;
const MODE: { id: ModeTukang; nama: string; ikon: string }[] = [
  { id: "sejajar", nama: "Luruskan", ikon: "\u{1F9F1}" },
  { id: "banding", nama: "Banding", ikon: "\u{1F91D}" },
  { id: "tali", nama: "Tali", ikon: "\u{1F9F5}" },
  { id: "tangga", nama: "Tangga", ikon: "\u{1F4C8}" },
];
const DASAR = 176;
const SATU = 14;
const X = (i: number) => 50 + i * 50;
const WARNA_HUB = { lebih: "#B91C1C", kurang: "#1D4ED8", pas: "#15803D" } as const;

export default function SimulasiMejaTukang({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanTukang) => void }) {
  const [k, setK] = useState<KeadaanTukang>(() => awalTukang());
  const laporRef = useRef(onKeadaan);
  useEffect(() => {
    laporRef.current = onKeadaan;
  }, [onKeadaan]);
  useEffect(() => {
    laporRef.current?.(k);
  }, [k]);
  const ubah = (baru: KeadaanTukang, ucap?: string) => {
    setK(baru);
    if (ucap) speakGuru(ucap);
  };
  const tombol = "min-h-[44px] rounded-full border-2 border-[#1C01A5] bg-white px-3 text-sm font-black text-[#1C01A5] disabled:opacity-40";
  const saklar = (nyala: boolean) => `min-h-[44px] rounded-full border-2 px-3 text-sm font-black ${nyala ? "border-[#92400E] bg-[#92400E] text-white" : "border-[#92400E] bg-white text-[#92400E]"}`;

  const ketukTiang = (i: number) => {
    if (k.mode === "banding") {
      const r = pilihBanding(k, i, D);
      const baru = r.k;
      ubah(baru, kalimatTukang(baru, D));
    } else if (k.mode === "tali") {
      if (k.tali === null || i === k.tali) {
        const baru = ambilTali(k, i);
        ubah(baru, kalimatTukang(baru, D));
      } else {
        const r = periksaTali(k, i, D);
        const h = r.hasil;
        ubah(r.k, h === "pas" ? "Tali pas. Sama tinggi." : h === "lebih" ? "Tiang itu lebih tinggi dari tali." : "Tiang itu kurang dari tali.");
      }
    } else if (k.mode === "tangga") {
      const baru = taruhTangga(k, i, D);
      if (baru === k) return;
      ubah(baru, baru.susunan.length < D.length ? `${D[i].nama} dipindahkan ke tangga.` : kalimatTukang(baru, D));
    }
  };

  const tinggiTali = k.tali === null ? null : D[k.tali].panjang;
  const modeTangga = k.mode === "tangga";
  const skala = modeTangga ? 6 : SATU;
  const dasarAtas = modeTangga ? 100 : DASAR;
  const urut = urutanTangga(D.map((t) => t.panjang), "naik");

  return (
    <div className="space-y-3">
      <style>{CSS_LEMARI}</style>
      <p className="rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2 text-center text-sm font-bold text-[#1C01A5]">{MISI_MEJA}</p>

      <div className="flex flex-wrap justify-center gap-1.5" role="group" aria-label="Pilih alat meja tukang">
        {MODE.map((m) => (
          <button key={m.id} type="button" aria-pressed={k.mode === m.id} className={saklar(k.mode === m.id)} onClick={() => ubah(pilihModeTukang(k, m.id), kalimatTukang(pilihModeTukang(k, m.id), D))}>
            {m.ikon} {m.nama}
          </button>
        ))}
      </div>

      <div className="rounded-2xl border-4 border-[#92400E] p-1" style={{ background: "repeating-linear-gradient(90deg,#F5DDB0 0 20px,#EFD3A0 20px 40px)" }}>
        <svg viewBox="0 0 300 200" className="mx-auto block w-full max-w-[460px] touch-none select-none" aria-label="Meja tukang dengan lima tiang">
          <rect x={4} y={dasarAtas} width={292} height={6} rx={2} fill="#92400E" />
          {k.mode === "tali" && tinggiTali !== null ? (
            <g aria-label="tali perantara">
              <rect x={8} y={dasarAtas - tinggiTali * skala} width={7} height={tinggiTali * skala} rx={3} fill="#D97706" stroke="#78350F" strokeWidth={1.2} />
              <text x={12} y={dasarAtas + 17} textAnchor="middle" fontSize={7.5} fontWeight={900} fill="#78350F">
                tali
              </text>
            </g>
          ) : null}
          {D.map((t, i) => {
            const x = X(i);
            const a = k.sejajar ? 0 : t.alas;
            const y = dasarAtas - (t.panjang + a) * skala;
            const dipilih = k.mode === "banding" && k.dipilih.includes(i);
            const sudahTali = k.mode === "tali" && k.diperiksa.includes(i);
            const sudahTangga = modeTangga && k.susunan.includes(i);
            const h = k.tali !== null && k.mode === "tali" && sudahTali ? hubungan(t.panjang, D[k.tali].panjang) : null;
            return (
              <g key={t.id} role="button" tabIndex={0} aria-label={`tiang ${t.nama}${i === k.tali ? ", acuan tali" : ""}`} onClick={() => (k.mode === "sejajar" || sudahTangga ? undefined : ketukTiang(i))} onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && !sudahTangga && k.mode !== "sejajar" && ketukTiang(i)} style={{ cursor: k.mode === "sejajar" ? "default" : "pointer" }}>
                {a > 0 ? (
                  <g aria-hidden="true">
                    <rect x={x - 15} y={dasarAtas - a * skala} width={30} height={a * skala} rx={2} fill="#C2410C" stroke="#7C2D12" strokeWidth={1.2} />
                    {Array.from({ length: a }, (_, b) => (
                      <line key={b} x1={x - 15} x2={x + 15} y1={dasarAtas - (b + 1) * skala} y2={dasarAtas - (b + 1) * skala} stroke="#7C2D12" strokeWidth={0.8} />
                    ))}
                  </g>
                ) : null}
                <rect x={x - 17} y={y - 10} width={34} height={t.panjang * skala + 10} fill="transparent" />
                {sudahTangga ? (
                  <rect x={x - 10} y={y} width={20} height={t.panjang * skala} rx={3} fill="none" stroke="#94A3B8" strokeWidth={1.2} strokeDasharray="3 2" />
                ) : (
                  <rect x={x - 10} y={y} width={20} height={t.panjang * skala} rx={3} fill={t.warna} stroke={dipilih ? "#15803D" : i === k.tali ? "#DC2626" : "#1E3A8A"} strokeWidth={dipilih || i === k.tali ? 3.5 : 1.6} />
                )}
                {k.mode === "banding" && dipilih && k.dipilih.length === 2 && k.sejajar ? <line x1={x - 20} x2={x + 20} y1={y} y2={y} stroke="#B91C1C" strokeWidth={1.8} strokeDasharray="4 2" /> : null}
                {h !== null && k.tali !== null ? (
                  <g aria-hidden="true">
                    <line x1={x - 16} x2={x + 16} y1={dasarAtas - D[k.tali].panjang * skala} y2={dasarAtas - D[k.tali].panjang * skala} stroke="#DC2626" strokeWidth={1.8} strokeDasharray="3 2" />
                    <text x={x} y={Math.min(y, dasarAtas - D[k.tali].panjang * skala) - 5} textAnchor="middle" fontSize={8.5} fontWeight={900} fill={WARNA_HUB[h]}>
                      {h}
                    </text>
                  </g>
                ) : null}
                {k.mode !== "tangga" || !sudahTangga ? (
                  <text x={x} y={dasarAtas + 17} textAnchor="middle" fontSize={7.5} fontWeight={900} fill="#451A03">
                    {t.nama}
                  </text>
                ) : null}
              </g>
            );
          })}
          {modeTangga ? (
            <g>
              <rect x={4} y={DASAR} width={292} height={6} rx={2} fill="#92400E" />
              {urut.map((_, s) => {
                const i = k.susunan[s];
                const x = X(s);
                if (i === undefined) return <rect key={s} x={x - 10} y={DASAR - 8} width={20} height={8} rx={1} fill="none" stroke="#94A3B8" strokeWidth={1.2} strokeDasharray="3 2" />;
                const t = D[i];
                return <rect key={s} x={x - 10} y={DASAR - t.panjang * skala} width={20} height={t.panjang * skala} rx={3} fill={t.warna} stroke="#1E3A8A" strokeWidth={1.6} />;
              })}
            </g>
          ) : null}
        </svg>
      </div>

      <div className="flex flex-wrap justify-center gap-1.5">
        {k.mode === "sejajar" ? (
          <button type="button" className={tombol} disabled={k.sejajar} onClick={() => ubah(luruskan(k), "Bata dibuang. Semua tiang berdiri di garis awal yang sama.")}>
            {"\u{1F9F1}"} Luruskan di garis awal
          </button>
        ) : null}
        {k.mode === "tangga" ? (
          <button type="button" className={tombol} onClick={() => ubah(ulangTangga(k), "Tangga dikosongkan.")}>
            {"\u{1F504}"} Ulang tangga
          </button>
        ) : null}
        <button type="button" className={tombol} onClick={() => ubah(mulaiLagi(), "Meja tukang dirapikan. Main lagi dari awal.")}>
          {"\u{1F504}"} Main lagi
        </button>
      </div>

      <p role="status" aria-live="polite" className="text-center text-sm font-black text-[#1C01A5]">
        {kalimatTukang(k, D)}
      </p>
      {k.mode === "tali" && k.diperiksa.length > 0 ? <p className="text-center text-xs font-bold text-[#1C01A5]/80">Tali sudah dibawa ke {kata(k.diperiksa.length)} tiang.</p> : null}
      {k.mode === "tangga" && k.susunan.length === D.length ? <p className="text-center text-xs font-bold text-[#1C01A5]/80">{arahSusunan(k, D) ? "Tangganya rapi." : "Tangganya belum urut."}</p> : null}
    </div>
  );
}
