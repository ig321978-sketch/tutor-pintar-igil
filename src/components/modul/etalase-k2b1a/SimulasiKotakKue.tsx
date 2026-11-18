"use client";

import React, { useEffect, useRef, useState } from "react";
import { CSS_LEMARI } from "../lemari-k1b1a/ui";
import {
  NOMOR_MAX,
  NOMOR_MIN,
  awalEtalase,
  isiUrutan,
  kalimatKotak,
  kata,
  kemasSatu,
  majuNomor,
  mundurNomor,
  pilihModeKotak,
  pilihPerkiraan,
  pilihanUrutan,
  puluhan,
  satuan,
  type KeadaanEtalase,
  type ModeKotak,
} from "./logika";
import { MISI_KOTAK, N_KUE_SIM, NOMOR_AWAL_SIM, PERKIRAAN_SIM, SETS, SET_SIM, URUTAN_SIM } from "./data";
import { KOTAK, letakKolam, letakKotak, letakSlot } from "./periksa";

/**
 * Simulasi Kelas 2 Bab 1 Sub-Bab A: Kotak Kue (Misi Kotak Kue bagian satu). Pastel, nomor antrean, dan urutan karcis berbeda dari Story. Eksplorasi bebas tanpa skor,
 * lima alat untuk satu meja: Kemas (ketuk kue, pindahkan ke kotak kue isi sepuluh), Papan (banyak kue sebagai puluhan dan satuan), Antrean (panggil nomor maju dan mundur),
 * Urutan (lengkapi karcis yang sobek), dan Kira (perkirakan dulu dengan patokan sepuluh, lalu buktikan dengan mengemas).
 */
const S = SETS[SET_SIM];
const MODE: { id: ModeKotak; nama: string; ikon: string }[] = [
  { id: "kemas", nama: "Kemas", ikon: "\u{1F4E6}" },
  { id: "papan", nama: "Papan", ikon: "\u{1F4DD}" },
  { id: "antrean", nama: "Antrean", ikon: "\u{1F39F}" },
  { id: "urutan", nama: "Urutan", ikon: "\u{1F9E9}" },
  { id: "kira", nama: "Kira-kira", ikon: "\u{1F914}" },
];
const UNGU = "#1C01A5";

const ketuk = (f: () => void) => ({ role: "button" as const, tabIndex: 0, onClick: f, onKeyDown: (e: React.KeyboardEvent) => (e.key === "Enter" || e.key === " ") && f(), style: { cursor: "pointer" } });

function Pastel({ x, y, s, hijau }: { x: number; y: number; s: number; hijau?: boolean }) {
  return (
    <g aria-hidden="true">
      <rect x={x - s / 2} y={y - s / 2} width={s} height={s} rx={4} fill={S.warna} stroke={hijau ? "#15803D" : UNGU} strokeWidth={hijau ? 2.6 : 1.2} />
      <text x={x} y={y + s * 0.28} textAnchor="middle" fontSize={s * 0.72}>
        {S.emoji}
      </text>
    </g>
  );
}

export default function SimulasiKotakKue({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanEtalase) => void }) {
  const [k, setK] = useState<KeadaanEtalase>(() => awalEtalase(NOMOR_AWAL_SIM));
  const [urutanKe, setUrutanKe] = useState(0);
  const [goyang, setGoyang] = useState(false);
  const laporRef = useRef(onKeadaan);
  useEffect(() => {
    laporRef.current = onKeadaan;
  }, [onKeadaan]);
  useEffect(() => {
    laporRef.current?.(k);
  }, [k]);
  const ubah = (baru: KeadaanEtalase, ucap?: string) => {
    setK(baru);
    if (ucap) speakGuru(ucap);
  };
  const tombol = "min-h-[44px] rounded-full border-2 border-[#1C01A5] bg-white px-3 text-sm font-black text-[#1C01A5] disabled:opacity-40";
  const saklar = (nyala: boolean) => `min-h-[44px] rounded-full border-2 px-3 text-sm font-black ${nyala ? "border-[#0369A1] bg-[#0369A1] text-white" : "border-[#0369A1] bg-white text-[#0369A1]"}`;
  const pilihMode = (m: ModeKotak) => {
    const baru = pilihModeKotak(k, m, N_KUE_SIM);
    ubah(baru, kalimatKotak(baru, N_KUE_SIM));
  };
  const ketukKue = () => {
    const baru = kemasSatu(k, N_KUE_SIM);
    if (baru === k) return;
    ubah(baru, baru.dikemas === N_KUE_SIM || baru.dikemas % 10 === 0 ? kalimatKotak(baru, N_KUE_SIM) : kata(baru.dikemas));
  };
  const urutan = URUTAN_SIM[urutanKe];
  const jawabUrutan = (j: number) => {
    const r = isiUrutan(k, urutanKe, urutan, j);
    if (r.benar) ubah(r.k, `Betul! Nomor yang hilang adalah ${kata(j)}.`);
    else {
      setGoyang(true);
      window.setTimeout(() => setGoyang(false), 480);
      speakGuru("Belum tepat. Lihat bilangan sebelum dan sesudahnya. Selisihnya selalu satu.");
    }
  };
  const nomorSekitar = [-2, -1, 0, 1, 2].map((d) => k.nomor + d).filter((v) => v >= NOMOR_MIN && v <= NOMOR_MAX);
  const lubang = Math.ceil(N_KUE_SIM / 10);

  return (
    <div className="space-y-3">
      <style>{CSS_LEMARI}</style>
      <p className="rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2 text-center text-sm font-bold text-[#1C01A5]">{MISI_KOTAK}</p>

      <div className="flex flex-wrap justify-center gap-1.5" role="group" aria-label="Pilih alat kotak kue">
        {MODE.map((m) => (
          <button key={m.id} type="button" aria-pressed={k.mode === m.id} className={saklar(k.mode === m.id)} onClick={() => pilihMode(m.id)}>
            {m.ikon} {m.nama}
          </button>
        ))}
      </div>

      <div className="rounded-2xl border-4 border-[#38BDF8] p-1" style={{ background: "linear-gradient(115deg,#F0F9FF 0 12%,#E0F2FE 12% 100%)" }}>
        {k.mode === "kemas" ? (
          <svg viewBox="0 0 300 200" className="mx-auto block w-full max-w-[460px] touch-none select-none" aria-label="Kotak kue dan kue yang belum dikemas">
            {Array.from({ length: lubang }, (_, i) => {
              const p = letakKotak(i, lubang, 22);
              const isi = Math.max(0, Math.min(10, k.dikemas - i * 10));
              return (
                <g key={i} aria-label={`kotak kue ${kata(i + 1)} berisi ${kata(isi)}`}>
                  <rect x={p.x} y={p.y} width={KOTAK.w} height={KOTAK.h} rx={6} fill="#FDE68A" stroke={isi === 10 ? "#15803D" : "#92400E"} strokeWidth={isi === 10 ? 3.4 : 2} />
                  {Array.from({ length: 10 }, (_, j) => {
                    const c = letakSlot(p, j);
                    return j < isi ? <Pastel key={j} x={c.x} y={c.y} s={13} /> : <circle key={j} cx={c.x} cy={c.y} r={5} fill="none" stroke="#92400E" strokeWidth={0.9} strokeDasharray="2 2" opacity={0.5} />;
                  })}
                </g>
              );
            })}
            <text x={150} y={92} textAnchor="middle" fontSize={20} fontWeight={900} fill="#15803D" aria-label={`sudah dikemas ${kata(k.dikemas)}`}>
              {k.dikemas}
            </text>
            {Array.from({ length: N_KUE_SIM - k.dikemas }, (_, i) => {
              const t = letakKolam(i);
              return (
                <g key={i} {...ketuk(ketukKue)} aria-label={`kue ${kata(i + 1)}`}>
                  <rect x={t.x - 15} y={t.y - 15} width={30} height={30} fill="transparent" />
                  <Pastel x={t.x} y={t.y} s={22} />
                </g>
              );
            })}
          </svg>
        ) : null}

        {k.mode === "papan" ? (
          <div className="mx-auto max-w-sm space-y-2 rounded-xl border-[6px] border-[#92400E] bg-[#166534] p-3 text-center">
            <p className="text-sm font-black text-[#F8FAFC]">Papan Catatan Kue</p>
            {k.dikemas === 0 ? (
              <p className="py-4 text-base font-black text-[#FEF08A]">Papan masih kosong. Kemas kue dulu.</p>
            ) : (
              <>
                <p className="text-6xl font-black tracking-widest" aria-label={kata(k.dikemas)}>
                  <span className="text-[#93C5FD]">{puluhan(k.dikemas)}</span>
                  <span className="text-[#FCA5A5]">{satuan(k.dikemas)}</span>
                </p>
                <p className="text-base font-black text-[#F8FAFC]">{kata(k.dikemas)}</p>
                <div className="grid grid-cols-2 gap-1 text-sm font-black">
                  <span className="rounded-md bg-[#1E3A8A] px-2 py-1 text-[#BFDBFE]">{puluhan(k.dikemas)} puluhan</span>
                  <span className="rounded-md bg-[#7F1D1D] px-2 py-1 text-[#FECACA]">{satuan(k.dikemas)} satuan</span>
                </div>
              </>
            )}
          </div>
        ) : null}

        {k.mode === "antrean" ? (
          <div className="mx-auto max-w-sm space-y-2 rounded-xl bg-white p-3 text-center">
            <p className="text-sm font-black text-[#1C01A5]">Jendela kantin: panggil nomor antrean</p>
            <div className="flex items-center justify-center gap-1.5" aria-label={`Nomor antrean ${kata(k.nomor)}`}>
              {nomorSekitar.map((v) => (
                <span key={v} className={`flex h-12 min-w-[2.6rem] items-center justify-center rounded-md border-2 border-dashed px-1 text-lg font-black ${v === k.nomor ? "scale-110 border-[#B45309] bg-[#FEF08A] text-[#B45309]" : "border-[#CA8A04] bg-[#FEF3C7] text-[#1C01A5]/70"}`}>
                  {v}
                </span>
              ))}
            </div>
            <p className="text-base font-black text-[#1C01A5]">{kata(k.nomor)}</p>
            <div className="flex justify-center gap-2">
              <button type="button" className={tombol} disabled={k.nomor <= NOMOR_MIN} onClick={() => ubah(mundurNomor(k), kata(k.nomor - 1))}>
                {"\u{2B05}\u{FE0F}"} Mundur
              </button>
              <button type="button" className={tombol} disabled={k.nomor >= NOMOR_MAX} onClick={() => ubah(majuNomor(k), kata(k.nomor + 1))}>
                Maju {"\u{27A1}\u{FE0F}"}
              </button>
            </div>
            <p className="text-xs font-bold text-[#1C01A5]/80">
              Dipanggil maju {k.maju} kali, mundur {k.mundur} kali.
            </p>
          </div>
        ) : null}

        {k.mode === "urutan" ? (
          <div className={`mx-auto max-w-sm space-y-2 rounded-xl bg-white p-3 text-center ${goyang ? "lm-goyang" : ""}`}>
            <p className="text-sm font-black text-[#1C01A5]">Karcis sobek: lengkapi nomor yang hilang</p>
            <div className="flex justify-center gap-1" role="group" aria-label="Pilih urutan karcis">
              {URUTAN_SIM.map((_, i) => (
                <button key={i} type="button" aria-pressed={urutanKe === i} onClick={() => setUrutanKe(i)} className={saklar(urutanKe === i)}>
                  Urutan {i + 1}
                  {k.urutanSelesai.includes(i) ? " \u{2705}" : ""}
                </button>
              ))}
            </div>
            <div className="flex items-center justify-center gap-1.5">
              {urutan.deret.map((v, i) => (
                <span key={i} className={`flex h-12 min-w-[2.6rem] items-center justify-center rounded-md border-2 border-dashed px-1 text-lg font-black ${i === urutan.hilang ? (k.urutanSelesai.includes(urutanKe) ? "border-[#15803D] bg-[#DCFCE7] text-[#15803D]" : "border-[#DC2626] bg-[#FEE2E2] text-[#DC2626]") : "border-[#CA8A04] bg-[#FEF3C7] text-[#1C01A5]"}`}>
                  {i === urutan.hilang && !k.urutanSelesai.includes(urutanKe) ? "?" : v}
                </span>
              ))}
            </div>
            {!k.urutanSelesai.includes(urutanKe) ? (
              <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilih nomor yang hilang">
                {pilihanUrutan(urutan).map((j) => (
                  <button key={j} type="button" className="min-h-[48px] min-w-[64px] rounded-2xl border-4 border-[#1C01A5] bg-[#FFE566] px-3 text-lg font-black text-[#1C01A5]" onClick={() => jawabUrutan(j)}>
                    {j}
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-sm font-black text-[#15803D]">Karcis sudah lengkap!</p>
            )}
          </div>
        ) : null}

        {k.mode === "kira" ? (
          <div className="mx-auto max-w-sm space-y-2 rounded-xl bg-white p-3 text-center">
            <p className="text-sm font-black text-[#1C01A5]">Kira-kira banyak kue di tumpukan? Pakai patokan sepuluh.</p>
            <div className="flex flex-wrap justify-center gap-0.5 rounded-lg bg-[#F0F9FF] p-2" aria-label="Tumpukan kue yang diperkirakan">
              {Array.from({ length: N_KUE_SIM }, (_, i) => (
                <span key={i} className="text-xl" aria-hidden="true">
                  {S.emoji}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilih perkiraan">
              {PERKIRAAN_SIM.map((p) => (
                <button
                  key={p}
                  type="button"
                  disabled={k.dikemas >= 1}
                  aria-pressed={k.perkiraan === p}
                  className={`min-h-[48px] rounded-2xl border-4 px-3 text-base font-black ${k.perkiraan === p ? "border-[#B45309] bg-[#FEF08A]" : "border-[#1C01A5] bg-white"} text-[#1C01A5] disabled:opacity-40`}
                  onClick={() => ubah(pilihPerkiraan(k, p), `Kira-kira ${kata(p)}. Sekarang buktikan dengan mengemas kue di tab Kemas.`)}
                >
                  kira-kira {p}
                </button>
              ))}
            </div>
            {k.perkiraan !== null && k.dikemas >= N_KUE_SIM ? (
              <p className="text-sm font-black text-[#15803D]">
                Perkiraanmu kira-kira {k.perkiraan}, hasil menghitung {N_KUE_SIM}. Dekat, kan?
              </p>
            ) : null}
          </div>
        ) : null}
      </div>

      <div className="flex flex-wrap justify-center gap-1.5">
        <button
          type="button"
          className={tombol}
          onClick={() => {
            setUrutanKe(0);
            ubah(awalEtalase(NOMOR_AWAL_SIM), "Kotak kue dirapikan. Main lagi dari awal.");
          }}
        >
          {"\u{1F504}"} Main lagi
        </button>
      </div>

      <p role="status" aria-live="polite" className="text-center text-sm font-black text-[#1C01A5]">
        {kalimatKotak(k, N_KUE_SIM)}
      </p>
      {k.mode === "kemas" && k.selesai ? <p className="text-center text-xs font-bold text-[#15803D]">Semua kue sudah di kotak. Buka tab Papan untuk membacanya sebagai puluhan dan satuan.</p> : null}
    </div>
  );
}
