"use client";

import React, { useEffect, useRef, useState } from "react";
import { CSS_LEMARI } from "../lemari-k1b1a/ui";
import {
  awalMeja,
  banyakDiRak,
  banyakJenis,
  hitungRak,
  jumlahSemua,
  kalimatMeja,
  kata,
  lihatJumlah,
  mulaiLagiMeja,
  pilihBandingMeja,
  pilihModeMeja,
  putarTabel,
  semuaTerpilah,
  taruhDiRak,
  type KeadaanMeja,
  type ModeMeja,
} from "./logika";
import { BENDA_SIM, JENIS_SIM, MISI_MEJA, SETS, SET_SIM, URUT_MEJA } from "./data";

/**
 * Simulasi Kelas 1 Bab 8 Sub-Bab A: Meja Pilah (Misi Meja Pilah bagian satu). Benda di meja berbeda dari Story. Eksplorasi bebas tanpa skor,
 * empat alat untuk satu meja: Pilah (ketuk benda, lalu ketuk rak jenisnya), Turus (hitung goresan tiap rak), Tabel (banyak tiap jenis dari rak,
 * boleh diputar menurun atau mendatar, dan jumlah semuanya), dan Banding (dua jenis: lebih banyak, lebih sedikit, sama banyak, dan selisih).
 */
const D = BENDA_SIM;
const S = SETS[SET_SIM];
const NAMA = S.nama;
const MODE: { id: ModeMeja; nama: string; ikon: string }[] = [
  { id: "pilah", nama: "Pilah", ikon: "\u{1F4E6}" },
  { id: "turus", nama: "Turus", ikon: "\u{270F}\u{FE0F}" },
  { id: "tabel", nama: "Tabel", ikon: "\u{1F4CB}" },
  { id: "banding", nama: "Banding", ikon: "\u{2696}\u{FE0F}" },
];
const PX = (j: number) => 52 + j * 98;
const UNGU = "#1C01A5";

const ketuk = (f: () => void) => ({ role: "button" as const, tabIndex: 0, onClick: f, onKeyDown: (e: React.KeyboardEvent) => (e.key === "Enter" || e.key === " ") && f(), style: { cursor: "pointer" } });

function Benda({ jenis, x, y, s, sorot }: { jenis: number; x: number; y: number; s: number; sorot?: boolean }) {
  return (
    <g aria-hidden="true">
      <rect x={x - s / 2} y={y - s / 2} width={s} height={s} rx={5} fill={S.warna[jenis]} stroke={sorot ? "#B45309" : UNGU} strokeWidth={sorot ? 3.4 : 1.5} />
      <text x={x} y={y + s * 0.28} textAnchor="middle" fontSize={s * 0.7}>
        {S.emoji[jenis]}
      </text>
    </g>
  );
}

function Goresan5({ x, y, n }: { x: number; y: number; n: number }) {
  return (
    <g aria-hidden="true">
      {Array.from({ length: n }, (_, i) => {
        const g = Math.floor(i / 5);
        const j = i % 5;
        const gx = x + g * 30;
        return j < 4 ? <line key={i} x1={gx + j * 6} x2={gx + j * 6} y1={y} y2={y + 18} stroke="#14532D" strokeWidth={2.6} strokeLinecap="round" /> : <line key={i} x1={gx - 3} x2={gx + 21} y1={y + 16} y2={y + 2} stroke="#14532D" strokeWidth={2.6} strokeLinecap="round" />;
      })}
    </g>
  );
}

export default function SimulasiMejaPilah({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanMeja) => void }) {
  const [k, setK] = useState<KeadaanMeja>(() => awalMeja(D));
  const [pilih, setPilih] = useState(-1);
  const [goyang, setGoyang] = useState(-1);
  const laporRef = useRef(onKeadaan);
  useEffect(() => {
    laporRef.current = onKeadaan;
  }, [onKeadaan]);
  useEffect(() => {
    laporRef.current?.(k);
  }, [k]);
  const ubah = (baru: KeadaanMeja, ucap?: string) => {
    setK(baru);
    if (ucap) speakGuru(ucap);
  };
  const tombol = "min-h-[44px] rounded-full border-2 border-[#1C01A5] bg-white px-3 text-sm font-black text-[#1C01A5] disabled:opacity-40";
  const saklar = (nyala: boolean) => `min-h-[44px] rounded-full border-2 px-3 text-sm font-black ${nyala ? "border-[#14532D] bg-[#14532D] text-white" : "border-[#14532D] bg-white text-[#14532D]"}`;

  const ketukBenda = (i: number) => {
    if (k.tempat[i] !== -1) return;
    setPilih(i);
    speakGuru(`Benda dipilih. Ketuk rak jenisnya.`);
  };
  const ketukRak = (j: number) => {
    if (pilih < 0) {
      speakGuru("Ketuk satu benda di meja dulu, lalu ketuk raknya.");
      return;
    }
    const r = taruhDiRak(k, pilih, j, D);
    if (r.ok) {
      setPilih(-1);
      ubah(r.k, kalimatMeja(r.k, D, NAMA));
    } else {
      setGoyang(j);
      window.setTimeout(() => setGoyang(-1), 480);
      speakGuru("Benda itu bukan jenis rak ini. Lihat gambar di atas rak.");
    }
  };
  const ketukTurus = (j: number) => {
    if (banyakDiRak(k, D, j) === 0) {
      speakGuru("Rak itu masih kosong. Pilah dulu benda ke rak.");
      return;
    }
    const baru = hitungRak(k, j, D);
    ubah(baru, baru === k ? "Rak itu sudah dihitung." : `Turus rak ${NAMA[j]}: ada ${kata(banyakDiRak(k, D, j))} benda, satu goresan tiap benda.`);
  };
  const ketukBanding = (j: number) => {
    const r = pilihBandingMeja(k, j, D);
    ubah(r.k, kalimatMeja(r.k, D, NAMA));
  };
  const total = jumlahSemua(JENIS_SIM.map((j) => banyakDiRak(k, D, j)));
  const slotDesk = (i: number) => URUT_MEJA.indexOf(i);

  return (
    <div className="space-y-3">
      <style>{CSS_LEMARI}</style>
      <p className="rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2 text-center text-sm font-bold text-[#1C01A5]">{MISI_MEJA}</p>

      <div className="flex flex-wrap justify-center gap-1.5" role="group" aria-label="Pilih alat meja pilah">
        {MODE.map((m) => (
          <button key={m.id} type="button" aria-pressed={k.mode === m.id} className={saklar(k.mode === m.id)} onClick={() => ubah(pilihModeMeja(k, m.id), kalimatMeja(pilihModeMeja(k, m.id), D, NAMA))}>
            {m.ikon} {m.nama}
          </button>
        ))}
      </div>

      <div className="rounded-2xl border-4 border-[#92400E] p-1" style={{ background: "repeating-linear-gradient(90deg,#BBF7D0 0 22px,#A7F3D0 22px 24px)" }}>
        {k.mode === "pilah" ? (
          <svg viewBox="0 0 300 200" className="mx-auto block w-full max-w-[460px] touch-none select-none" aria-label="Meja pilah dengan tiga rak dan sepuluh benda">
            {JENIS_SIM.map((j) => (
              <g key={j} {...ketuk(() => ketukRak(j))} aria-label={`rak ${NAMA[j]}`} className={goyang === j ? "lm-goyang" : ""}>
                <rect x={PX(j) - 46} y={26} width={92} height={84} rx={6} fill="#FDE68A" stroke="#92400E" strokeWidth={3.2} />
                <Benda jenis={j} x={PX(j)} y={42} s={20} />
                {D.map((b, i) => ({ b, i })).filter(({ b, i }) => b.jenis === j && k.tempat[i] === j).map(({ i }, n) => <Benda key={i} jenis={j} x={PX(j) - 14 + (n % 2) * 28} y={72 + Math.floor(n / 2) * 28} s={24} />)}
              </g>
            ))}
            <line x1={4} x2={296} y1={116} y2={116} stroke="#92400E" strokeWidth={3} />
            {D.map((b, i) => {
              if (k.tempat[i] !== -1) return null;
              const s = slotDesk(i);
              const x = 32 + (s % 5) * 59;
              const y = 140 + Math.floor(s / 5) * 36;
              return (
                <g key={b.id} {...ketuk(() => ketukBenda(i))} aria-label={`benda ${NAMA[b.jenis]}`}>
                  <rect x={x - 18} y={y - 18} width={36} height={36} fill="transparent" />
                  <Benda jenis={b.jenis} x={x} y={y} s={28} sorot={pilih === i} />
                </g>
              );
            })}
          </svg>
        ) : null}

        {k.mode === "turus" ? (
          <svg viewBox="0 0 300 200" className="mx-auto block w-full max-w-[460px] touch-none select-none" aria-label="Turus tiap rak">
            <rect x={6} y={8} width={288} height={184} rx={8} fill="#14532D" stroke="#92400E" strokeWidth={5} />
            {JENIS_SIM.map((j) => {
              const y = 26 + j * 54;
              const n = banyakDiRak(k, D, j);
              const sudah = k.dihitung.includes(j);
              return (
                <g key={j} {...ketuk(() => ketukTurus(j))} aria-label={`turus rak ${NAMA[j]}`}>
                  <rect x={14} y={y} width={272} height={44} rx={6} fill="#F8FAFC" stroke={sudah ? "#15803D" : "#94A3B8"} strokeWidth={sudah ? 3 : 1.6} strokeDasharray={sudah ? undefined : "5 3"} />
                  <Benda jenis={j} x={40} y={y + 22} s={26} />
                  {sudah ? <Goresan5 x={78} y={y + 13} n={n} /> : <text x={78} y={y + 26} fontSize={9} fontWeight={900} fill="#64748B">ketuk untuk menghitung</text>}
                </g>
              );
            })}
          </svg>
        ) : null}

        {k.mode === "tabel" ? (
          <div className="mx-auto max-w-sm space-y-2 rounded-xl bg-white p-2 text-center">
            <p className="text-sm font-black text-[#1C01A5]">Tabel Benda di Meja Pilah</p>
            {k.datar ? (
              <table className="mx-auto w-full border-collapse text-sm font-black text-[#1C01A5]">
                <tbody>
                  <tr>
                    <th className="border-2 border-[#1C01A5] bg-[#EDE9FE] px-1 py-1">Jenis</th>
                    {JENIS_SIM.map((j) => (
                      <td key={j} className="border-2 border-[#1C01A5] px-1 py-1">
                        {S.emoji[j]} {NAMA[j]}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <th className="border-2 border-[#1C01A5] bg-[#EDE9FE] px-1 py-1">Banyak</th>
                    {JENIS_SIM.map((j) => (
                      <td key={j} className="border-2 border-[#1C01A5] px-1 py-1">
                        {banyakDiRak(k, D, j)}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            ) : (
              <table className="mx-auto w-full max-w-[16rem] border-collapse text-sm font-black text-[#1C01A5]">
                <thead>
                  <tr>
                    <th className="border-2 border-[#1C01A5] bg-[#EDE9FE] px-1 py-1">Jenis</th>
                    <th className="border-2 border-[#1C01A5] bg-[#EDE9FE] px-1 py-1">Banyak</th>
                  </tr>
                </thead>
                <tbody>
                  {JENIS_SIM.map((j) => (
                    <tr key={j}>
                      <td className="border-2 border-[#1C01A5] px-1 py-1">
                        {S.emoji[j]} {NAMA[j]}
                      </td>
                      <td className="border-2 border-[#1C01A5] px-1 py-1">{banyakDiRak(k, D, j)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            {k.jumlahDilihat ? <p className="text-sm font-black text-[#15803D]">Jumlah semuanya di rak: {total}</p> : null}
          </div>
        ) : null}

        {k.mode === "banding" ? (
          <div className="mx-auto max-w-sm space-y-2 rounded-xl bg-white p-3 text-center">
            <p className="text-sm font-black text-[#1C01A5]">Ketuk dua jenis untuk dibandingkan</p>
            <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilih jenis">
              {JENIS_SIM.map((j) => (
                <button key={j} type="button" aria-pressed={k.banding.includes(j)} onClick={() => ketukBanding(j)} className={`min-h-[56px] min-w-[96px] rounded-2xl border-4 px-3 text-sm font-black ${k.banding.includes(j) ? "border-[#15803D] bg-[#DCFCE7]" : "border-[#1C01A5] bg-white"} text-[#1C01A5]`}>
                  <span className="text-xl" aria-hidden="true">
                    {S.emoji[j]}
                  </span>
                  <br />
                  {NAMA[j]}
                </button>
              ))}
            </div>
            {k.banding.length === 2 && semuaTerpilah(k, D) ? (
              <p className="text-sm font-black text-[#1C01A5]">
                {NAMA[k.banding[0]]}: {banyakJenis(D, k.banding[0])} · {NAMA[k.banding[1]]}: {banyakJenis(D, k.banding[1])}
              </p>
            ) : null}
          </div>
        ) : null}
      </div>

      <div className="flex flex-wrap justify-center gap-1.5">
        {k.mode === "tabel" ? (
          <>
            <button type="button" className={tombol} onClick={() => ubah(putarTabel(k), putarTabel(k).datar ? "Tabel diputar menjadi mendatar. Isinya sama." : "Tabel kembali menurun. Isinya sama.")}>
              {"\u{1F504}"} Putar tabel
            </button>
            <button
              type="button"
              className={tombol}
              onClick={() => ubah(lihatJumlah(k), semuaTerpilah(k, D) ? `Jumlah semuanya ada ${kata(total)} benda.` : "Rak belum rapi, jadi jumlahnya belum lengkap. Pilah dulu semua benda.")}
            >
              {"\u{2795}"} Jumlah semuanya
            </button>
          </>
        ) : null}
        <button
          type="button"
          className={tombol}
          onClick={() => {
            setPilih(-1);
            ubah(mulaiLagiMeja(D), "Meja pilah dirapikan. Main lagi dari awal.");
          }}
        >
          {"\u{1F504}"} Main lagi
        </button>
      </div>

      <p role="status" aria-live="polite" className="text-center text-sm font-black text-[#1C01A5]">
        {kalimatMeja(k, D, NAMA)}
      </p>
      {k.mode === "turus" && k.dihitung.length > 0 ? <p className="text-center text-xs font-bold text-[#1C01A5]/80">Sudah {kata(k.dihitung.length)} rak dihitung turusnya.</p> : null}
      {k.mode === "pilah" && k.terpilah ? <p className="text-center text-xs font-bold text-[#15803D]">Rak rapi, tiap rak satu jenis.</p> : null}
    </div>
  );
}
