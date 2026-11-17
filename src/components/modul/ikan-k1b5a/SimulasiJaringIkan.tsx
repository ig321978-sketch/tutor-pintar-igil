"use client";

import React, { useEffect, useRef, useState } from "react";
import { CSS_LEMARI } from "../lemari-k1b1a/ui";
import {
  TEBAKAN_SIM,
  awalIkan,
  jaringSatu,
  kalimatIkan,
  kata,
  kataSepuluh,
  kembalikanSatu,
  labelTepat,
  pasangAngka,
  pasangNama,
  pilihKantong,
  sisaKantong,
  tebakIkan,
  type KeadaanIkan,
} from "./logika";
import { EMOJI, KANTONG_SIM, WARNA_BENDA } from "./data";
import { KANTONG, SEKAT, WADAH, letakKantong, letakSekat } from "./periksa";

/**
 * Simulasi Kelas 1 Bab 5 Sub-Bab A: Misi Lapak Ikan bagian satu, Wadah Sekat Sepuluh. Eksplorasi bebas tanpa skor: pilih kantong ikan,
 * tebak dulu banyaknya, pindahkan ikan satu per satu dengan jaring ke dua wadah bersekat sepuluh (atau kembalikan satu), lalu pasang
 * label angka dan label nama. Ikan dan banyaknya berbeda dari Story.
 */
export default function SimulasiJaringIkan({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanIkan) => void }) {
  const [k, setK] = useState<KeadaanIkan>(() => awalIkan(KANTONG_SIM));
  const laporRef = useRef(onKeadaan);
  useEffect(() => {
    laporRef.current = onKeadaan;
  }, [onKeadaan]);
  useEffect(() => {
    laporRef.current?.(k);
  }, [k]);
  const x = KANTONG_SIM.find((y) => y.id === k.pilih) ?? KANTONG_SIM[0];
  const p = k.pindah[x.id];
  const sisa = sisaKantong(k, KANTONG_SIM);
  const [isi, garis] = WARNA_BENDA[x.jenis] ?? ["#BFDBFE", "#1D4ED8"];
  const ubah = (baru: KeadaanIkan, ucap?: string) => {
    setK(baru);
    if (ucap) speakGuru(ucap);
  };
  const jaring = () => {
    if (sisa === 0) {
      speakGuru("Kantong sudah kosong.");
      return;
    }
    const n = p + 1;
    ubah(jaringSatu(k, KANTONG_SIM), n === 10 ? "Sepuluh! Wadah pertama penuh." : n === x.total ? `${kata(n).replace(/^./, (c) => c.toUpperCase())}. Kantong kosong.` : kata(n));
  };
  const kembali = () => ubah(kembalikanSatu(k), p > 0 ? `Satu ikan kembali ke kantong. Di wadah ada ${kata(p - 1)}.` : "Wadah masih kosong.");
  const geserLabel = (jenis: "angka" | "nama", d: 1 | -1) => {
    const kini = k[jenis][x.id];
    const n = kini === null ? 10 : Math.min(20, Math.max(0, kini + d));
    ubah(jenis === "angka" ? pasangAngka(k, n) : pasangNama(k, n), kata(n));
  };
  const tombol = "min-h-[44px] rounded-full border-2 border-[#1C01A5] bg-white px-3 text-sm font-black text-[#1C01A5] disabled:opacity-40";
  const angka = k.angka[x.id];
  const nama = k.nama[x.id];
  const tepat = sisa === 0 && angka === x.total && nama === x.total;
  return (
    <div className="space-y-3">
      <style>{CSS_LEMARI}</style>
      <p className="rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2 text-center text-sm font-bold text-[#1C01A5]">
        Wadah sekat sepuluh. Pilih kantong, tebak dulu, pindahkan ikan satu per satu dengan jaring, lalu pasang label angka dan nama.
      </p>
      <div className="flex flex-wrap justify-center gap-1.5" role="group" aria-label="Pilih kantong ikan">
        {KANTONG_SIM.map((y) => (
          <button
            key={y.id}
            type="button"
            aria-pressed={k.pilih === y.id}
            onClick={() => ubah(pilihKantong(k, y.id), kalimatIkan(pilihKantong(k, y.id), KANTONG_SIM))}
            className={`min-h-[44px] rounded-full border-2 px-3 text-sm font-black ${k.pilih === y.id ? "border-[#0369A1] bg-[#0369A1] text-white" : "border-[#0369A1] bg-white text-[#0369A1]"}`}
          >
            {EMOJI[y.jenis]} {y.nama}
            {k.angka[y.id] === y.total && k.nama[y.id] === y.total && k.pindah[y.id] === y.total ? " \u{2705}" : ""}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-center gap-1.5 rounded-2xl border-2 border-[#B45309] bg-[#FFFBEB] p-2" role="group" aria-label="Tebakan">
        <span className="text-sm font-black text-[#78350F]">Tebakan:</span>
        {TEBAKAN_SIM.map((t) => (
          <button
            key={t}
            type="button"
            aria-pressed={k.tebak[x.id] === t}
            onClick={() => ubah(tebakIkan(k, t), `Tebakanmu kira-kira ${kata(t)}. Sekarang buktikan dengan menghitung.`)}
            className={`min-h-[40px] rounded-full border-2 px-3 text-xs font-black ${k.tebak[x.id] === t ? "border-[#15803D] bg-[#DCFCE7] text-[#14532D]" : "border-[#B45309] bg-white text-[#78350F]"}`}
          >
            kira-kira {kata(t)}
          </button>
        ))}
      </div>

      <div className="rounded-2xl border-4 border-[#0C4A6E] p-2" style={{ background: "linear-gradient(180deg,#BAE6FD,#7DD3FC 80%,#E9C98F 80%)" }}>
        <svg viewBox="0 0 300 200" className="mx-auto block w-full max-w-[420px] rounded-xl bg-white/60" aria-label={`Kantong ${x.nama} dan dua wadah bersekat sepuluh`}>
          <path
            d={`M ${KANTONG.x + 14} ${KANTONG.y} L ${KANTONG.x + KANTONG.w - 14} ${KANTONG.y} Q ${KANTONG.x + KANTONG.w + 4} ${KANTONG.y + KANTONG.h * 0.6} ${KANTONG.x + KANTONG.w - 8} ${KANTONG.y + KANTONG.h} L ${KANTONG.x + 8} ${KANTONG.y + KANTONG.h} Q ${KANTONG.x - 4} ${KANTONG.y + KANTONG.h * 0.6} ${KANTONG.x + 14} ${KANTONG.y} Z`}
            fill="rgba(186,230,253,0.65)"
            stroke="#0369A1"
            strokeWidth={2}
          />
          <text x={KANTONG.x + KANTONG.w / 2} y={KANTONG.y + 14} textAnchor="middle" fontSize={10} fontWeight={900} fill="#0369A1">
            kantong {x.nama}
          </text>
          {WADAH.map((w, f) => (
            <g key={f}>
              <rect x={w.x} y={w.y} width={w.w} height={w.h} rx={6} fill={p >= (f + 1) * 10 ? "#DCFCE7" : "#E0F2FE"} stroke="#1C01A5" strokeWidth={2} />
              {Array.from({ length: 10 }, (_, c) => {
                const t = letakSekat(f * 10 + c);
                return <rect key={c} x={t.x - SEKAT / 2} y={t.y - SEKAT / 2} width={SEKAT} height={SEKAT} fill="none" stroke="#94A3B8" strokeWidth={1} />;
              })}
              <text x={w.x + w.w / 2} y={w.y - 4} textAnchor="middle" fontSize={9} fontWeight={900} fill="#1C01A5">
                {f === 0 ? "wadah pertama" : "wadah kedua"}
              </text>
            </g>
          ))}
          {Array.from({ length: sisa }, (_, i) => {
            const t = letakKantong(i);
            return (
              <g key={`k${i}`} role="button" tabIndex={0} aria-label="ikan di kantong, ketuk untuk menjaring" onClick={jaring} onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && jaring()} style={{ cursor: "pointer" }}>
                <circle cx={t.x} cy={t.y} r={13} fill={isi} stroke={garis} strokeWidth={1.4} />
                <text x={t.x} y={t.y + 5} textAnchor="middle" fontSize={15}>
                  {EMOJI[x.jenis]}
                </text>
              </g>
            );
          })}
          {Array.from({ length: p }, (_, j) => {
            const t = letakSekat(j);
            return (
              <g key={`w${j}`}>
                <circle cx={t.x} cy={t.y} r={10} fill={isi} stroke={garis} strokeWidth={1.2} />
                <text x={t.x} y={t.y + 4} textAnchor="middle" fontSize={12}>
                  {EMOJI[x.jenis]}
                </text>
              </g>
            );
          })}
          <text x={218} y={190} textAnchor="middle" fontSize={11} fontWeight={900} fill="#1C01A5">
            di wadah: {p}
          </text>
        </svg>
        <div className="mt-2 flex flex-wrap justify-center gap-1.5">
          <button type="button" className={tombol} onClick={jaring} disabled={sisa === 0}>
            {"\u{1F945}"} Jaring satu
          </button>
          <button type="button" className={tombol} onClick={kembali} disabled={p === 0}>
            {"\u{21A9}\u{FE0F}"} Kembalikan satu
          </button>
        </div>
      </div>

      <div className="rounded-2xl border-4 border-[#1C01A5] bg-white p-2 text-center">
        <p className="text-sm font-black text-[#1C01A5]">
          {x.nama}: di wadah {p} · {p >= 10 ? kataSepuluh(p) : kata(p)} · {sisa === 0 ? "kantong kosong" : "kantong masih berisi"}
        </p>
        <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
          <div className="flex items-center justify-center gap-1.5" role="group" aria-label="Label angka">
            <span className="text-xs font-black text-[#0369A1]">Label angka</span>
            <button type="button" className={tombol} onClick={() => geserLabel("angka", -1)} aria-label="Kurangi label angka">
              {"\u{2796}"}
            </button>
            <span className="min-w-[3rem] rounded-xl border-4 border-[#0369A1] bg-[#E0F2FE] px-2 py-1 text-xl font-black text-[#0C4A6E]">{angka ?? "?"}</span>
            <button type="button" className={tombol} onClick={() => geserLabel("angka", 1)} aria-label="Tambah label angka">
              {"\u{2795}"}
            </button>
          </div>
          <div className="flex items-center justify-center gap-1.5" role="group" aria-label="Label nama">
            <span className="text-xs font-black text-[#0369A1]">Label nama</span>
            <button type="button" className={tombol} onClick={() => geserLabel("nama", -1)} aria-label="Kurangi label nama">
              {"\u{2796}"}
            </button>
            <span className="min-w-[7rem] rounded-xl border-4 border-[#0369A1] bg-[#E0F2FE] px-2 py-1 text-sm font-black text-[#0C4A6E]">{nama === null ? "?" : kata(nama)}</span>
            <button type="button" className={tombol} onClick={() => geserLabel("nama", 1)} aria-label="Tambah label nama">
              {"\u{2795}"}
            </button>
          </div>
        </div>
        <p className="mt-1 text-xs font-bold text-[#1C01A5]/70">
          {tepat ? "Label kantong ini tepat." : sisa > 0 ? "Hitung sampai kantong kosong, lalu pasang label." : "Cocokkan label dengan isi wadah."} · Kantong berlabel tepat: {labelTepat(k, KANTONG_SIM)} dari {KANTONG_SIM.length}
        </p>
      </div>
      <p role="status" aria-live="polite" className="text-center text-sm font-black text-[#1C01A5]">
        {kalimatIkan(k, KANTONG_SIM)}
      </p>
    </div>
  );
}
