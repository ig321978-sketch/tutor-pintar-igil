"use client";

import React, { useEffect, useRef, useState } from "react";
import { CSS_LEMARI } from "../lemari-k1b1a/ui";
import {
  JUMLAH_RAK,
  awalRak,
  beriPakan,
  geserLabel,
  kalimatRak,
  kata,
  labelTepatRak,
  langkah,
  mulaiDari,
  nyalakan,
  pakanDobel,
  pindahTingkat,
  sudahPakan,
  ulangPakan,
  type Arah,
  type KeadaanRak,
} from "./logika";
import { EMOJI, HILANG_SIM, MISI_RAK } from "./data";
import { letakKisi, SEL_KISI } from "./periksa";

/**
 * Simulasi Kelas 1 Bab 5 Sub-Bab B: Misi Lapak Ikan bagian satu, Rak Akuarium Bernomor (rak ikan cupang, berbeda dari Story).
 * Eksplorasi bebas tanpa skor: ketuk akuarium untuk memilih nomor mulai, hitung maju atau mundur satu-satu, beri pakan tiap akuarium,
 * pasang lagi label nomor yang jatuh, nyalakan Tetangga (sebelum dan sesudah) dan Kisi (turun satu tingkat tambah sepuluh).
 */
const besar = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);

export default function SimulasiRakAkuarium({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanRak) => void }) {
  const [k, setK] = useState<KeadaanRak>(() => awalRak(HILANG_SIM));
  const laporRef = useRef(onKeadaan);
  useEffect(() => {
    laporRef.current = onKeadaan;
  }, [onKeadaan]);
  useEffect(() => {
    laporRef.current?.(k);
  }, [k]);
  const ubah = (baru: KeadaanRak, ucap?: string) => {
    setK(baru);
    if (ucap) speakGuru(ucap);
  };
  const nomorLabel = (n: number): number | null => (String(n) in k.label ? k.label[String(n)] : n);
  const jalan = (arah: Arah) => {
    const baru = langkah(k, arah);
    if (baru === k) {
      speakGuru(arah === "maju" ? "Ini ujung rak. Tidak bisa maju lagi." : "Ini ujung rak. Tidak bisa mundur lagi.");
      return;
    }
    ubah(baru, `${kata(baru.posisi)}.${baru.beruntun >= 2 ? ` ${besar(kata(baru.beruntun))} langkah ${arah}.` : ""}`);
  };
  const pakan = () => {
    const baru = beriPakan(k);
    ubah(baru, baru.pakan[k.posisi] > 1 ? `Akuarium ${kata(k.posisi)} sudah diberi pakan tadi. Jangan dua kali.` : `Akuarium ${kata(k.posisi)} diberi pakan.`);
  };
  const tombol = "min-h-[44px] rounded-full border-2 border-[#1C01A5] bg-white px-3 text-sm font-black text-[#1C01A5] disabled:opacity-40";
  const saklar = (nyala: boolean) => `min-h-[44px] rounded-full border-2 px-3 text-sm font-black ${nyala ? "border-[#15803D] bg-[#15803D] text-white" : "border-[#15803D] bg-white text-[#15803D]"}`;
  const p = k.posisi;
  const dobel = pakanDobel(k);
  const tinggi = 180;
  return (
    <div className="space-y-3">
      <style>{CSS_LEMARI}</style>
      <p className="rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2 text-center text-sm font-bold text-[#1C01A5]">{MISI_RAK}</p>

      <div className="rounded-2xl border-4 border-[#78350F] bg-[#FEF3C7] p-2">
        <svg viewBox={`0 0 300 ${tinggi}`} className="mx-auto block w-full max-w-[460px] select-none rounded-xl bg-[#FFFBEB]" aria-label="Rak ikan cupang dua tingkat, nomor satu sampai dua puluh">
          {k.kisi
            ? Array.from({ length: 10 }, (_, c) => {
                const a = letakKisi(c + 1);
                const b = letakKisi(c + 11);
                return (
                  <g key={c} aria-hidden="true">
                    <line x1={a.x} x2={b.x} y1={a.y + SEL_KISI.h / 2} y2={b.y - SEL_KISI.h / 2} stroke="#15803D" strokeWidth={1.5} strokeDasharray="3 2" />
                  </g>
                );
              })
            : null}
          {[1, 11].map((m) => (
            <rect key={m} x={0} y={letakKisi(m).y + SEL_KISI.h / 2} width={300} height={6} rx={2} fill="#92400E" aria-hidden="true" />
          ))}
          {k.kisi ? (
            <text x={296} y={164} textAnchor="end" fontSize={9} fontWeight={900} fill="#15803D" aria-hidden="true">
              tambah sepuluh {"\u{2B07}"}
            </text>
          ) : null}
          {Array.from({ length: JUMLAH_RAK }, (_, i) => i + 1).map((n) => {
            const t = letakKisi(n);
            const lb = nomorLabel(n);
            const jatuh = String(n) in k.label;
            const kini = n === p;
            const tetangga = k.tetangga && Math.abs(n - p) === 1;
            const makan = k.pakan[n];
            const air = makan > 1 ? "#FECACA" : makan === 1 ? "#BBF7D0" : "#BAE6FD";
            const garis = kini ? "#1C01A5" : tetangga ? "#B45309" : "#0369A1";
            return (
              <g
                key={n}
                role="button"
                tabIndex={0}
                aria-label={`akuarium ${jatuh && lb !== n ? "label nomornya jatuh" : kata(n)}${makan ? ", sudah diberi pakan" : ""}${kini ? ", di sini" : ""}`}
                onClick={() => ubah(mulaiDari(k, n), `Mulai dari ${kata(n)}.`)}
                onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && ubah(mulaiDari(k, n), `Mulai dari ${kata(n)}.`)}
                style={{ cursor: "pointer" }}
              >
                <rect x={t.x - 13} y={t.y - 20} width={26} height={27} rx={3} fill={air} stroke={garis} strokeWidth={kini ? 3 : tetangga ? 2.6 : 1.4} />
                <text x={t.x} y={t.y - 1} textAnchor="middle" fontSize={13}>
                  {EMOJI.tropis}
                </text>
                {makan ? (
                  <g aria-hidden="true">
                    {Array.from({ length: Math.min(makan, 3) }, (_, j) => (
                      <circle key={j} cx={t.x - 7 + j * 7} cy={t.y - 15} r={1.8} fill={makan > 1 ? "#B91C1C" : "#92400E"} />
                    ))}
                  </g>
                ) : null}
                <rect x={t.x - 12} y={t.y + 8} width={24} height={11} rx={2} fill={jatuh ? (lb === n ? "#DCFCE7" : "#FEF9C3") : "#FFFFFF"} stroke={jatuh ? "#B45309" : "#64748B"} strokeWidth={1} strokeDasharray={jatuh && lb === null ? "2 2" : undefined} />
                <text x={t.x} y={t.y + 17} textAnchor="middle" fontSize={8.5} fontWeight={900} fill={jatuh && lb === null ? "#DC2626" : "#1C01A5"}>
                  {lb === null ? "?" : lb}
                </text>
              </g>
            );
          })}
          <text x={letakKisi(p).x} y={letakKisi(p).y - 23} textAnchor="middle" fontSize={11} aria-hidden="true">
            {"\u{1F447}"}
          </text>
          <text x={150} y={tinggi - 6} textAnchor="middle" fontSize={10} fontWeight={900} fill="#1C01A5">
            diberi pakan: {sudahPakan(k)} dari {JUMLAH_RAK} · langkah {k.arah ?? "-"}: {k.beruntun}
          </text>
        </svg>

        <div className="mt-2 flex flex-wrap justify-center gap-1.5">
          <button type="button" className={tombol} onClick={() => jalan("mundur")} disabled={p <= 1}>
            {"\u{2B05}\u{FE0F}"} Mundur
          </button>
          <button type="button" className={tombol} onClick={pakan}>
            {"\u{1F963}"} Beri pakan
          </button>
          <button type="button" className={tombol} onClick={() => jalan("maju")} disabled={p >= JUMLAH_RAK}>
            Maju {"\u{27A1}\u{FE0F}"}
          </button>
        </div>
        <div className="mt-2 flex flex-wrap justify-center gap-1.5">
          <button type="button" aria-pressed={k.tetangga} className={saklar(k.tetangga)} onClick={() => ubah(nyalakan(k, "tetangga"), k.tetangga ? undefined : kalimatRak(nyalakan(k, "tetangga")))}>
            {"\u{1F91D}"} Tetangga
          </button>
          <button type="button" aria-pressed={k.kisi} className={saklar(k.kisi)} onClick={() => ubah(nyalakan(k, "kisi"), k.kisi ? undefined : "Kisi menyala. Nomor di bawahnya tambah sepuluh.")}>
            {"\u{1F522}"} Kisi
          </button>
          {k.kisi ? (
            <button type="button" className={tombol} onClick={() => ubah(pindahTingkat(k), p <= 10 ? `Turun. ${besar(kata(p))} tambah sepuluh, ${kata(p + 10)}.` : `Naik. ${besar(kata(p))} kurang sepuluh, ${kata(p - 10)}.`)}>
              {p <= 10 ? "\u{2B07}\u{FE0F} Turun satu tingkat" : "\u{2B06}\u{FE0F} Naik satu tingkat"}
            </button>
          ) : null}
          <button type="button" className={tombol} onClick={() => ubah(ulangPakan(k), "Pagi baru. Semua akuarium belum diberi pakan.")}>
            {"\u{1F305}"} Pagi baru
          </button>
        </div>
      </div>

      {k.tetangga ? (
        <div className="flex items-center justify-center gap-2 rounded-2xl border-2 border-[#B45309] bg-[#FFFBEB] p-2 text-center font-black text-[#78350F]" aria-label="Tetangga bilangan">
          <span className="rounded-xl border-2 border-[#B45309] bg-white px-2 py-1 text-sm">sebelum: {p > 1 ? p - 1 : "-"}</span>
          <span className="rounded-xl border-4 border-[#1C01A5] bg-[#FEF9C3] px-3 py-1 text-xl text-[#1C01A5]">{p}</span>
          <span className="rounded-xl border-2 border-[#B45309] bg-white px-2 py-1 text-sm">sesudah: {p < JUMLAH_RAK ? p + 1 : "-"}</span>
        </div>
      ) : null}

      <div className="rounded-2xl border-4 border-[#1C01A5] bg-white p-2 text-center">
        <p className="text-sm font-black text-[#1C01A5]">{"\u{1F3F7}\u{FE0F}"} Label nomor yang jatuh</p>
        <div className="mt-1 grid grid-cols-1 gap-2 sm:grid-cols-2">
          {HILANG_SIM.map((n) => {
            const v = k.label[String(n)];
            const tingkat = n <= 10 ? "atas" : "bawah";
            return (
              <div key={n} className="flex items-center justify-center gap-1.5" role="group" aria-label={`Label yang jatuh dari rak ${tingkat}`}>
                <span className="text-xs font-black text-[#0369A1]">Rak {tingkat}</span>
                <button type="button" className={tombol} onClick={() => ubah(geserLabel(k, n, -1), kata(Math.max(1, (v ?? 11) - 1)))} aria-label="Kurangi nomor label">
                  {"\u{2796}"}
                </button>
                <span className={`min-w-[3rem] rounded-xl border-4 px-2 py-1 text-xl font-black ${v === n ? "border-[#15803D] bg-[#DCFCE7] text-[#14532D]" : "border-[#0369A1] bg-[#E0F2FE] text-[#0C4A6E]"}`}>{v ?? "?"}</span>
                <button type="button" className={tombol} onClick={() => ubah(geserLabel(k, n, 1), kata(Math.min(JUMLAH_RAK, (v ?? 9) + 1)))} aria-label="Tambah nomor label">
                  {"\u{2795}"}
                </button>
              </div>
            );
          })}
        </div>
        <p className="mt-1 text-xs font-bold text-[#1C01A5]/70">
          Label tepat: {labelTepatRak(k)} dari {HILANG_SIM.length}
          {dobel.length ? ` · diberi pakan dua kali: ${dobel.join(", ")}` : ""}
        </p>
      </div>
      <p role="status" aria-live="polite" className="text-center text-sm font-black text-[#1C01A5]">
        {kalimatRak(k)}
      </p>
    </div>
  );
}
