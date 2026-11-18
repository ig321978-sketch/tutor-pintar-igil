"use client";

import React, { useEffect, useRef, useState } from "react";
import { CSS_LEMARI } from "../lemari-k1b1a/ui";
import { BENDA_SIM, MISI_GUDANG } from "./data";
import {
  awalGudang,
  banyakRak,
  bendaDari,
  besar,
  cetakPermukaan,
  hasilCetak,
  kalimatGudang,
  lepasDiLereng,
  mulaiLagiGudang,
  pilihBenda,
  pilihModeGudang,
  taruhDiRak,
  type Datar,
  type KeadaanGudang,
  type ModeGudang,
  type Rak,
} from "./logika";
import { Bentuk } from "./Gbr";

/**
 * Simulasi Kelas 2 Bab 3 Sub-Bab C: Gudang Mainan (Misi Gudang Mainan bagian satu). Benda di gudang berbeda dari Story. Eksplorasi bebas tanpa skor,
 * tiga alat untuk satu gudang: Lereng (lepaskan benda di papan lereng dan lihat menggelinding atau diam), Rak (tata benda ke rak datar atau wadah berpagar),
 * dan Cetak (cetak satu permukaan benda di kertas dan lihat bangun datarnya).
 */
const MODE: { id: ModeGudang; nama: string }[] = [
  { id: "lereng", nama: "Lereng" },
  { id: "rak", nama: "Rak" },
  { id: "cetak", nama: "Cetak" },
];
const UNGU = "#1C01A5";

export default function SimulasiGudangMainan({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanGudang) => void }) {
  const [k, setK] = useState<KeadaanGudang>(() => awalGudang());
  const [goyang, setGoyang] = useState("");
  const [hasilLereng, setHasilLereng] = useState<{ i: number; g: boolean } | null>(null);
  const [hasilKertas, setHasilKertas] = useState<{ i: number; d: Datar | null } | null>(null);
  const laporRef = useRef(onKeadaan);
  useEffect(() => {
    laporRef.current = onKeadaan;
  }, [onKeadaan]);
  useEffect(() => {
    laporRef.current?.(k);
  }, [k]);
  const ubah = (baru: KeadaanGudang, ucap?: string) => {
    setK(baru);
    if (ucap) speakGuru(ucap);
  };
  const salah = (id: string, ucap: string) => {
    setGoyang(id);
    window.setTimeout(() => setGoyang(""), 480);
    speakGuru(ucap);
  };
  const tombol = "min-h-[44px] rounded-full border-2 border-[#1C01A5] bg-white px-3 text-sm font-black text-[#1C01A5] disabled:opacity-40";
  const saklar = (nyala: boolean) => `min-h-[44px] rounded-full border-2 px-3 text-sm font-black ${nyala ? "border-[#92400E] bg-[#92400E] text-white" : "border-[#92400E] bg-white text-[#92400E]"}`;

  const ketukBenda = (i: number) => {
    const baru = pilihBenda(k, i);
    ubah(baru, kalimatGudang(baru));
  };
  const lepas = () => {
    const r = lepasDiLereng(k);
    if (r.gelinding === null) {
      speakGuru("Ketuk satu benda dulu.");
      return;
    }
    setHasilLereng({ i: k.pilih, g: r.gelinding });
    const nama = bendaDari(BENDA_SIM[k.pilih]).nama;
    ubah(r.k, r.gelinding ? `${besar(nama)} menggelinding turun. Permukaan lengkung membuat benda menggelinding.` : `${besar(nama)} diam di papan lereng. Permukaan datar menahan benda supaya diam.`);
  };
  const taruh = (rak: Rak) => {
    if (k.pilih < 0) {
      speakGuru("Ketuk satu benda dulu, lalu ketuk rak.");
      return;
    }
    const nama = bendaDari(BENDA_SIM[k.pilih]).nama;
    const r = taruhDiRak(k, rak);
    if (r.ok === null) return;
    if (r.ok) ubah(r.k, `${besar(nama)} masuk ${rak === "datar" ? "rak datar" : "wadah berpagar"} dan diam di sana.`);
    else {
      setK(r.k);
      salah(rak, rak === "datar" ? `${besar(nama)} punya permukaan lengkung, jadi bisa menggelinding dari rak datar. Pilih wadah berpagar.` : `${besar(nama)} hanya punya permukaan datar, jadi cukup di rak datar.`);
    }
  };
  const cetak = () => {
    const r = cetakPermukaan(k);
    if (!r) {
      speakGuru("Ketuk satu benda dulu.");
      return;
    }
    setHasilKertas({ i: k.pilih, d: r.hasil });
    const nama = bendaDari(BENDA_SIM[k.pilih]).nama;
    ubah(r.k, r.hasil ? `Cetakan permukaan ${nama} berbentuk ${r.hasil}. Itu bangun datar.` : `${besar(nama)} tidak punya permukaan datar, jadi tidak ada yang tercetak.`);
  };
  const ganti = (m: ModeGudang) => {
    setHasilLereng(null);
    setHasilKertas(null);
    ubah(pilihModeGudang(k, m));
  };

  return (
    <div className="space-y-3">
      <style>{CSS_LEMARI}</style>
      <p className="rounded-xl bg-[#FEF3C7] px-2 py-1 text-center text-sm font-black text-[#78350F]">{MISI_GUDANG}</p>

      <div className="flex flex-wrap justify-center gap-1.5" role="group" aria-label="Pilih alat">
        {MODE.map((m) => (
          <button key={m.id} type="button" className={saklar(k.mode === m.id)} aria-pressed={k.mode === m.id} onClick={() => ganti(m.id)}>
            {m.nama}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Benda di gudang">
        {BENDA_SIM.map((id, i) => {
          const b = bendaDari(id);
          const di = k.mode === "rak" && k.rak[i] !== undefined;
          return (
            <button
              key={id}
              type="button"
              disabled={di}
              onClick={() => ketukBenda(i)}
              aria-pressed={k.pilih === i}
              className={`flex min-h-[64px] min-w-[72px] flex-col items-center justify-center rounded-xl border-4 px-1.5 py-1 text-center disabled:opacity-30 ${k.pilih === i ? "border-[#B45309] ring-2 ring-[#FACC15]" : "border-[#1C01A5]"}`}
              style={{ background: b.warna }}
            >
              <span className="text-3xl leading-none" aria-hidden="true">
                {b.emoji}
              </span>
              <span className="text-[11px] font-black text-[#1C01A5]">{b.nama}</span>
            </button>
          );
        })}
      </div>

      <div className={`rounded-2xl border-4 border-[#92400E] bg-white p-2 ${goyang ? "lm-goyang" : ""}`}>
        {k.mode === "lereng" ? (
          <div className="space-y-2">
            <p className="text-center text-sm font-black text-[#78350F]">Papan lereng: lepaskan benda yang dipilih</p>
            <svg viewBox="0 0 300 120" className="mx-auto block w-full max-w-[360px]" role="img" aria-label="Papan lereng">
              <line x1={20} y1={30} x2={280} y2={96} stroke="#92400E" strokeWidth={7} strokeLinecap="round" />
              <line x1={280} y1={96} x2={280} y2={116} stroke="#92400E" strokeWidth={4} />
              {hasilLereng ? (
                <g>
                  <text x={hasilLereng.g ? 230 : 50} y={hasilLereng.g ? 92 : 28} textAnchor="middle" fontSize={26}>
                    {bendaDari(BENDA_SIM[hasilLereng.i]).emoji}
                  </text>
                  {hasilLereng.g ? <line x1={70} y1={26} x2={206} y2={76} stroke="#DC2626" strokeWidth={3} strokeDasharray="6 4" /> : null}
                  <text x={150} y={116} textAnchor="middle" fontSize={11} fontWeight={900} fill={UNGU}>
                    {hasilLereng.g ? "menggelinding" : "diam"}
                  </text>
                </g>
              ) : null}
            </svg>
            <div className="flex justify-center">
              <button type="button" className={tombol} onClick={lepas}>
                Lepaskan di lereng
              </button>
            </div>
          </div>
        ) : null}

        {k.mode === "rak" ? (
          <div className="space-y-2">
            <p className="text-center text-sm font-black text-[#78350F]">Tata benda: ketuk benda, lalu ketuk rak</p>
            <div className="grid grid-cols-2 gap-2">
              {(["datar", "pagar"] as const).map((r) => (
                <button key={r} type="button" onClick={() => taruh(r)} aria-label={r === "datar" ? "Rak datar" : "Wadah berpagar"} className={`min-h-[110px] rounded-2xl border-4 border-dashed border-[#92400E] bg-[#FFFBEB] p-1.5 text-center ${goyang === r ? "lm-goyang" : ""}`}>
                  <span className="block text-sm font-black text-[#92400E]">{r === "datar" ? "Rak datar" : "Wadah berpagar"}</span>
                  <span className="mt-1 flex flex-wrap justify-center gap-1">
                    {BENDA_SIM.map((id, i) =>
                      k.rak[i] === r ? (
                        <span key={id} className="text-2xl" aria-label={bendaDari(id).nama}>
                          {bendaDari(id).emoji}
                        </span>
                      ) : null,
                    )}
                  </span>
                </button>
              ))}
            </div>
            <p className="text-center text-xs font-bold text-[#78350F]">
              Sudah di rak: {banyakRak(k)} dari {BENDA_SIM.length}
            </p>
          </div>
        ) : null}

        {k.mode === "cetak" ? (
          <div className="space-y-2">
            <p className="text-center text-sm font-black text-[#78350F]">Cetak satu permukaan benda di kertas</p>
            <div className="mx-auto flex min-h-[110px] max-w-[220px] flex-col items-center justify-center gap-1 rounded-xl border-2 border-[#94A3B8] bg-white p-2">
              {hasilKertas ? (
                hasilKertas.d ? (
                  <>
                    <Bentuk datar={hasilKertas.d} ukuran={64} />
                    <p className="text-sm font-black text-[#1C01A5]">{besar(hasilKertas.d)}</p>
                  </>
                ) : (
                  <p className="text-center text-sm font-black text-[#1C01A5]">Tidak ada yang tercetak</p>
                )
              ) : (
                <p className="text-center text-sm font-bold text-[#1C01A5]/60">Kertas masih kosong</p>
              )}
            </div>
            <div className="flex justify-center">
              <button type="button" className={tombol} onClick={cetak}>
                Cetak permukaan
              </button>
            </div>
            {k.pilih >= 0 ? <p className="text-center text-xs font-bold text-[#78350F]">Bangun datar yang mungkin tercetak: {hasilCetak(k.pilih).length ? [...new Set(hasilCetak(k.pilih))].join(", ") : "tidak ada"}</p> : null}
          </div>
        ) : null}
      </div>

      <div className="flex flex-wrap justify-center gap-1.5">
        <button
          type="button"
          className={tombol}
          onClick={() => {
            setHasilLereng(null);
            setHasilKertas(null);
            ubah(mulaiLagiGudang(), "Gudang dirapikan. Main lagi dari awal.");
          }}
        >
          Main lagi
        </button>
      </div>

      <p role="status" aria-live="polite" className="text-center text-sm font-black text-[#1C01A5]">
        {kalimatGudang(k)}
      </p>
    </div>
  );
}
