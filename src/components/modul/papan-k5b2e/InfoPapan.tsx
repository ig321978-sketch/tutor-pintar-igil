"use client";

import React, { useState } from "react";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import {
  BAGI_INFO,
  BATAS_INFO,
  BIL_A,
  BIL_B,
  BIL_TANPA,
  BIL_TIGA,
  FA,
  FB,
  FPB_INFO,
  FPB_TANPA,
  FPB_TIGA,
  JUDUL_INFO_1,
  JUDUL_INFO_2,
  KPK_INFO,
  KPK_TANPA,
  KPK_TIGA,
  LANGKAH_SARING,
  PASANGAN,
  PETUNJUK_INFO_1,
  PETUNJUK_INFO_2,
  POHON_INFO,
  PRIMA_INFO,
  SELESAI_INFO_1,
  SELESAI_INFO_2,
  SUARA_BARIS_BAGI,
  SUARA_FPB,
  SUARA_FPB_BAGI,
  SUARA_KPK,
  SUARA_KPK_BAGI,
  SUARA_SISA,
  SUARA_TANPA,
  SUARA_TIGA,
  PEMBAGI_SEMUA,
  type PohonInfo,
} from "./data-info";
import { fmt, tulisKali } from "./logika-data";

/**
 * Infografis Kelas 5 Bab 2 Sub-Bab E "Papan Bilangan Kak Lintang" (label kosong): DUA kartu, tiap kartu satu layar tanpa gulir.
 * Kartu 1 = papan bilangan satu sampai 30 berbingkai kayu (langkah saringan berlabel kosong "?" yang mencoret kelipatan, lalu sisa prima) dan tiga pohon faktor (12, 18, 24) yang daunnya "?" sampai diketuk.
 * Kartu 2 = kartu pengelola berkertas ungu: dua faktorisasi 12 dan 18 yang dipasangkan (KPK dan FPB), tiga bilangan, tanpa pasangan (FPB 1), dan tabel pembagian berulang dengan pembagi berlabel kosong.
 * Komponen sendiri: gambar dan tata letak mengikuti isi materi (papan, pohon, pasangan prima, tabel pembagi), tanpa PetaLabel dan InfoKartu.
 */
const KAYU = "#92400E";
const UNGU = "#6D28D9";
const ORANYE = "#EA580C";

/** Tombol sel kosong "?" yang menampilkan isinya setelah diketuk. */
function Tanya({ buka, isi, onKetuk, nama, kecil = false }: { buka: boolean; isi: React.ReactNode; onKetuk: () => void; nama: string; kecil?: boolean }) {
  return (
    <button
      type="button"
      onClick={onKetuk}
      aria-label={buka ? nama : `Sel kosong: ${nama}`}
      className={`flex min-h-[28px] w-full items-center justify-center rounded border-2 px-0.5 text-center font-black leading-tight ${kecil ? "text-[11px]" : "text-sm"} ${buka ? "lm-muncul border-[#15803D] bg-[#BBF7D0] text-[#14532D]" : "border-dashed border-[#B45309] bg-white/80 text-[#B45309]"}`}
    >
      {buka ? isi : "?"}
    </button>
  );
}
/** Baris dengan nama di kiri dan satu sel kosong di kanan. */
function BarisNama({ label, ...p }: { label: string; buka: boolean; isi: React.ReactNode; onKetuk: () => void; nama: string }) {
  return (
    <div className="grid grid-cols-[84px_minmax(0,1fr)] items-center gap-1">
      <span className="text-[11px] font-black leading-tight text-[#4C1D95]">{label}</span>
      <Tanya {...p} kecil />
    </div>
  );
}

/** Satu pohon faktor (12, 18, atau 24) di dalam tombol: simpul bukan prima tampak, daun prima berlabel "?" sampai diketuk. */
function PohonTile({ p, buka, onKetuk }: { p: PohonInfo; buka: boolean; onKetuk: () => void }) {
  const X = (x: number): number => x + 22;
  return (
    <button
      type="button"
      onClick={onKetuk}
      aria-label={buka ? `Pohon faktor ${p.n}: ${p.teks}` : `Daun kosong pohon faktor ${p.n}`}
      className={`flex min-w-0 flex-col items-center rounded-lg border-2 px-0.5 py-1 ${buka ? "border-[#15803D] bg-[#F0FDF4]" : "border-dashed border-[#B45309] bg-white/80"}`}
      data-uji="pohon-tile"
    >
      <svg viewBox="0 0 100 114" className="block h-auto w-full" aria-hidden="true">
        {p.tata.node.map((m) =>
          m.induk === null ? null : <path key={`e${m.id}`} d={`M${X(p.tata.node[m.induk].x)} ${p.tata.node[m.induk].y} L${X(m.x)} ${m.y}`} fill="none" stroke={KAYU} strokeWidth={1.6} />,
        )}
        {p.tata.node.map((m) => (
          <g key={`n${m.id}`}>
            <circle cx={X(m.x)} cy={m.y} r={12} fill={m.prima ? (buka ? "#BBF7D0" : "#FFFFFF") : "#FEF3C7"} stroke={m.prima && !buka ? "#B45309" : KAYU} strokeWidth={1.6} strokeDasharray={m.prima && !buka ? "3 2" : undefined} />
            <text x={X(m.x)} y={m.y + 5} fontSize={14} fontWeight={900} textAnchor="middle" fill={m.prima && !buka ? "#B45309" : "#1C01A5"}>
              {m.prima && !buka ? "?" : m.bil}
            </text>
          </g>
        ))}
      </svg>
      <span className="mt-0.5 block text-[11px] font-black leading-tight text-[#1C01A5]">{buka ? `${p.n} = ${p.teks}` : `${p.n} = ?`}</span>
    </button>
  );
}

/** Deret chip faktorisasi: prima yang berpasangan (setelah FPB dibuka) berlatar hijau. */
function DeretChip({ label, faktor, pasangan }: { label: number; faktor: number[]; pasangan: number[] | null }) {
  const sisa = [...(pasangan ?? [])];
  return (
    <div className="grid grid-cols-[34px_minmax(0,1fr)] items-center gap-1" data-baris={label}>
      <span className="text-sm font-black text-[#4C1D95]">{label}</span>
      <div className="flex flex-wrap items-center gap-1">
        {faktor.map((f, i) => {
          const k = sisa.indexOf(f);
          const ya = k >= 0;
          if (ya) sisa.splice(k, 1);
          return (
            <React.Fragment key={`${i}-${f}`}>
              {i > 0 ? (
                <span className="text-xs font-black text-[#4C1D95]" aria-hidden="true">
                  ×
                </span>
              ) : null}
              <span className={`flex h-7 w-7 items-center justify-center rounded-full border-2 text-sm font-black text-[#1C01A5] ${ya ? "border-[#15803D] bg-[#BBF7D0]" : "border-[#6D28D9] bg-white"}`}>{f}</span>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

export default function InfoPapan({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const [kartu, setKartu] = useState<1 | 2>(1);
  const [langkah, setLangkah] = useState<string[]>([]);
  const [sisa, setSisa] = useState(false);
  const [pohon, setPohon] = useState<number[]>([]);
  const [kpk, setKpk] = useState(false);
  const [fpb, setFpb] = useState(false);
  const [tiga, setTiga] = useState(false);
  const [tanpa, setTanpa] = useState(false);
  const [baris, setBaris] = useState<number[]>([]);
  const [kpk2, setKpk2] = useState(false);
  const [fpb2, setFpb2] = useState(false);

  const jumlahTanya1 = LANGKAH_SARING.length + 1 + POHON_INFO.length;
  const buka1 = langkah.length + (sisa ? 1 : 0) + pohon.length;
  const selesai1 = buka1 === jumlahTanya1;
  const jumlahTanya2 = 4 + BAGI_INFO.baris.length + 2;
  const buka2 = (kpk ? 1 : 0) + (fpb ? 1 : 0) + (tiga ? 1 : 0) + (tanpa ? 1 : 0) + baris.length + (kpk2 ? 1 : 0) + (fpb2 ? 1 : 0);
  const selesai2 = buka2 === jumlahTanya2;
  const petunjuk = kartu === 1 ? PETUNJUK_INFO_1 : PETUNJUK_INFO_2;
  const status = kartu === 1 ? (selesai1 ? SELESAI_INFO_1 : `Sudah dibuka ${buka1} dari ${jumlahTanya1} tanda tanya.`) : selesai2 ? SELESAI_INFO_2 : `Sudah dibuka ${buka2} dari ${jumlahTanya2} tanda tanya.`;

  const bukaDan = (set: (b: boolean) => void, suara: string) => {
    speakGuru(suara);
    set(true);
  };
  const coret = new Set<number>(LANGKAH_SARING.filter((l) => langkah.includes(l.id)).flatMap((l) => l.coret));

  return (
    <div className="space-y-3">
      <style>{CSS_LEMARI}</style>
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2">
        <button type="button" onClick={() => speakGuru(petunjuk)} className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm" aria-label="Dengar petunjuk">
          {"\u{1F50A}"}
        </button>
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">{petunjuk}</p>
      </div>

      {kartu === 1 ? (
        <div className="mx-auto w-full max-w-xl rounded-2xl border-[6px] bg-[#FEF3C7] p-2 shadow-[0_5px_0_rgba(107,68,35,0.35)]" style={{ borderColor: KAYU }} data-uji="papan-saring">
          <p className="mb-1 rounded-md py-0.5 text-center text-sm font-black text-[#FEF3C7]" style={{ background: KAYU }}>
            {"\u{1F3EE}"} {JUDUL_INFO_1}
          </p>
          <div className="grid grid-cols-10 gap-px" role="table" aria-label={`Tabel bilangan satu sampai ${BATAS_INFO}`}>
            {Array.from({ length: BATAS_INFO }, (_, i) => i + 1).map((n) => {
              const dicoret = coret.has(n);
              const prima = sisa && PRIMA_INFO.includes(n);
              return (
                <span
                  key={n}
                  role="cell"
                  data-n={n}
                  data-coret={dicoret ? "ya" : undefined}
                  className={`flex min-h-[24px] items-center justify-center rounded text-xs font-black ${dicoret ? "line-through opacity-35" : ""}`}
                  style={{ background: prima ? "#BBF7D0" : "#FFFBEB", border: prima ? "2px solid #15803D" : `1px solid ${KAYU}`, color: "#1C01A5" }}
                >
                  {n}
                </span>
              );
            })}
          </div>
          <div className="mt-1 grid grid-cols-5 gap-1" role="group" aria-label="Langkah saringan">
            {LANGKAH_SARING.map((l) => (
              <Tanya key={l.id} buka={langkah.includes(l.id)} isi={l.label} onKetuk={() => { speakGuru(l.suara); if (!langkah.includes(l.id)) setLangkah((x) => [...x, l.id]); }} nama={`langkah saringan ${l.label}`} kecil />
            ))}
            <Tanya buka={sisa} isi={`${PRIMA_INFO.length} prima`} onKetuk={() => bukaDan(setSisa, SUARA_SISA)} nama="bilangan prima yang tersisa" kecil />
          </div>
          <div className="mt-1.5 grid grid-cols-3 gap-1" role="group" aria-label="Pohon faktor">
            {POHON_INFO.map((p) => (
              <PohonTile
                key={p.n}
                p={p}
                buka={pohon.includes(p.n)}
                onKetuk={() => {
                  speakGuru(p.suara);
                  if (!pohon.includes(p.n)) setPohon((x) => [...x, p.n]);
                }}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="mx-auto w-full max-w-xl space-y-1 rounded-2xl border-[6px] bg-[#F5F3FF] p-2 shadow-[0_5px_0_rgba(76,29,149,0.3)]" style={{ borderColor: UNGU }} data-uji="kartu-pengelola">
          <p className="rounded-md py-0.5 text-center text-sm font-black text-white" style={{ background: UNGU }}>
            {"\u{1F4DC}"} {JUDUL_INFO_2}
          </p>
          <p className="text-[11px] font-black text-[#4C1D95]">Faktorisasi prima</p>
          <DeretChip label={BIL_A} faktor={FA} pasangan={fpb ? PASANGAN.pasangan : null} />
          <DeretChip label={BIL_B} faktor={FB} pasangan={fpb ? PASANGAN.pasangan : null} />
          <div className="grid grid-cols-2 gap-1">
            <div className="grid grid-cols-[30px_minmax(0,1fr)] items-center gap-1">
              <span className="text-[11px] font-black text-[#4C1D95]">KPK</span>
              <Tanya buka={kpk} isi={`${tulisKali(KPK_INFO.faktor)} = ${fmt(KPK_INFO.hasil)}`} onKetuk={() => bukaDan(setKpk, SUARA_KPK)} nama="KPK dari faktorisasi prima" kecil />
            </div>
            <div className="grid grid-cols-[30px_minmax(0,1fr)] items-center gap-1">
              <span className="text-[11px] font-black text-[#4C1D95]">FPB</span>
              <Tanya buka={fpb} isi={`${tulisKali(FPB_INFO.faktor)} = ${fmt(FPB_INFO.hasil)}`} onKetuk={() => bukaDan(setFpb, SUARA_FPB)} nama="FPB dari faktorisasi prima" kecil />
            </div>
          </div>
          <BarisNama label={`Tiga bilangan ${BIL_TIGA.join(", ")}`} buka={tiga} isi={`KPK ${fmt(KPK_TIGA.hasil)}, FPB ${fmt(FPB_TIGA.hasil)}`} onKetuk={() => bukaDan(setTiga, SUARA_TIGA)} nama="KPK dan FPB tiga bilangan" />
          <BarisNama label={`Tanpa pasangan ${BIL_TANPA.join(" dan ")}`} buka={tanpa} isi={`FPB ${fmt(FPB_TANPA.hasil)}, KPK ${fmt(KPK_TANPA.hasil)}`} onKetuk={() => bukaDan(setTanpa, SUARA_TANPA)} nama="FPB satu bila tidak ada pasangan" />
          <p className="pt-0.5 text-[11px] font-black text-[#4C1D95]">Pembagian berulang</p>
          <div className="space-y-0.5 rounded-lg border-2 bg-white p-1" style={{ borderColor: UNGU }} role="table" aria-label="Pembagian berulang 12 dan 18">
            <div className="grid grid-cols-[56px_repeat(2,minmax(0,1fr))] items-center gap-1" role="row">
              <span className="text-center text-[11px] font-black text-[#4C1D95]">pembagi</span>
              <span className="text-center text-base font-black text-[#1C01A5]">{BIL_A}</span>
              <span className="text-center text-base font-black text-[#1C01A5]">{BIL_B}</span>
            </div>
            {BAGI_INFO.baris.map((b, i) =>
              baris.includes(i) ? (
                <div key={i} className="lm-muncul grid min-h-[28px] grid-cols-[56px_repeat(2,minmax(0,1fr))] items-center gap-1" role="row" data-baris={i}>
                  <span className="text-center text-base font-black" style={{ color: ORANYE }}>
                    {b.p}
                  </span>
                  {b.sesudah.map((x, j) => (
                    <span key={j} className="text-center text-base font-black text-[#1C01A5]">
                      {x}
                    </span>
                  ))}
                </div>
              ) : (
                <Tanya
                  key={i}
                  buka={false}
                  isi=""
                  onKetuk={() => {
                    speakGuru(SUARA_BARIS_BAGI[i]);
                    setBaris((x) => (x.includes(i) ? x : [...x, i]));
                  }}
                  nama={`baris pembagian ke ${i + 1}`}
                />
              ),
            )}
          </div>
          <div className="grid grid-cols-2 gap-1">
            <div className="grid grid-cols-[30px_minmax(0,1fr)] items-center gap-1">
              <span className="text-[11px] font-black text-[#4C1D95]">KPK</span>
              <Tanya buka={kpk2} isi={`${tulisKali(BAGI_INFO.pembagi)} = ${fmt(BAGI_INFO.kpk)}`} onKetuk={() => bukaDan(setKpk2, SUARA_KPK_BAGI)} nama="KPK dari semua pembagi" kecil />
            </div>
            <div className="grid grid-cols-[30px_minmax(0,1fr)] items-center gap-1">
              <span className="text-[11px] font-black text-[#4C1D95]">FPB</span>
              <Tanya buka={fpb2} isi={`${tulisKali(PEMBAGI_SEMUA)} = ${fmt(BAGI_INFO.fpb)}`} onKetuk={() => bukaDan(setFpb2, SUARA_FPB_BAGI)} nama="FPB dari pembagi yang membagi semua" kecil />
            </div>
          </div>
        </div>
      )}

      <p role="status" aria-live="polite" className="min-h-[1.25rem] text-center text-sm font-black text-[#1C01A5]">
        {status}
      </p>
      <div className="flex items-center justify-center gap-2">
        {kartu === 2 ? (
          <button type="button" onClick={() => setKartu(1)} className="min-h-[48px] rounded-full border-4 border-[#1C01A5] bg-white px-4 text-sm font-black text-[#1C01A5]" aria-label="Kembali ke kartu pertama">
            {"⬅️"} Kembali
          </button>
        ) : null}
        {kartu === 1 && selesai1 ? (
          <button type="button" onClick={() => setKartu(2)} className={TOMBOL_UTAMA}>
            BERIKUTNYA {"➡️"}
          </button>
        ) : null}
        {kartu === 2 && selesai2 ? (
          <button type="button" onClick={onLanjut} className={TOMBOL_UTAMA}>
            {teksLanjut}
          </button>
        ) : null}
      </div>
      <p className="text-center text-[11px] font-black text-[#6B7280]" aria-label={`Kartu ${kartu} dari 2`}>
        {kartu === 1 ? "● ○" : "○ ●"} Kartu {kartu} dari 2
      </p>
    </div>
  );
}

export { InfoPapan };
