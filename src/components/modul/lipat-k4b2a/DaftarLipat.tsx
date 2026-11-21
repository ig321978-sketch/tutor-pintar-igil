"use client";

import React, { useState } from "react";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import { Pec } from "./Pec";
import { ATURAN_LIPAT, BANDING_PITA, PETUNJUK1_INFO_LIPAT, PETUNJUK2_INFO_LIPAT, PITA_LIPAT, SELESAI1_INFO_LIPAT, SELESAI2_INFO_LIPAT, suaraPita } from "./data-kartu";

/**
 * Infografis Kelas 4 Bab 2 Sub-Bab A (dirancang sendiri, dua kartu, tiap kartu satu layar tanpa gulir): data dari Story.
 * Kartu 1 = tumpukan pita Bu Wulan: tiga pita dari kain yang dilipat dua, empat, delapan (bagian sama besar digambar sungguh, satu bagian diarsir ungu);
 * pecahan tiap pita dan dua kotak banding antar pita (satu per dua dengan satu per empat; satu per empat dengan satu per delapan) kosong sampai diketuk.
 * Kartu 2 = kartu aturan Bu Wulan: lima gambar kecil (pembilang, penyebut, penyebut besar bagian kecil, garis pecahan, tanda banding) dengan aturan kosong sampai diketuk. Digital saja.
 */
const Pita = ({ n }: { n: number }) => (
  <span className="grid h-[26px] w-full border-2 border-[#6D28D9] bg-white" style={{ gridTemplateColumns: `repeat(${n}, 1fr)` }} role="img" aria-label={`Pita ${n} bagian sama besar, satu bagian diarsir`} data-bagian={n} data-arsir={1}>
    {Array.from({ length: n }, (_, i) => (
      <span key={i} aria-hidden="true" className={`block ${i > 0 ? "border-l border-[#6D28D9]" : ""} ${i === 0 ? "bg-[#A78BFA]" : "bg-white"}`} />
    ))}
  </span>
);

const Mini = ({ n }: { n: number }) => (
  <span className="grid h-[16px] w-[84px] border-2 border-[#6D28D9] bg-white" style={{ gridTemplateColumns: `repeat(${n}, 1fr)` }} role="img" aria-label={`${n} bagian sama besar, satu bagian diarsir`} data-bagian={n} data-arsir={1}>
    {Array.from({ length: n }, (_, i) => (
      <span key={i} aria-hidden="true" className={`block ${i > 0 ? "border-l border-[#6D28D9]" : ""} ${i === 0 ? "bg-[#A78BFA]" : "bg-white"}`} />
    ))}
  </span>
);

const Tanda = ({ a, b, tanda }: { a: number; b: number; tanda: ">" | "<" }) => (
  <span className="inline-flex items-center gap-1 text-base font-black text-[#1C01A5]">
    <Pec p={1} q={a} />
    <span aria-hidden="true">{tanda}</span>
    <Pec p={1} q={b} />
  </span>
);

function GambarAturan({ kunci }: { kunci: string }) {
  if (kunci === "pembilang") return <Pec p={1} q={4} besar warnaP="#DC2626" />;
  if (kunci === "penyebut") return <Pec p={1} q={4} besar warnaQ="#DC2626" />;
  if (kunci === "kecil")
    return (
      <span className="flex flex-col items-center gap-1">
        <Mini n={5} />
        <Mini n={10} />
      </span>
    );
  if (kunci === "garis")
    return (
      <svg width={100} height={44} viewBox="0 0 100 44" role="img" aria-label="Garis pecahan dari nol sampai satu, panah ke kiri menunjuk yang lebih kecil" data-garis={1}>
        <line x1={8} y1={16} x2={92} y2={16} stroke="#6D28D9" strokeWidth={3} strokeLinecap="round" />
        <line x1={8} y1={9} x2={8} y2={23} stroke="#6D28D9" strokeWidth={2} />
        <line x1={92} y1={9} x2={92} y2={23} stroke="#6D28D9" strokeWidth={2} />
        <text x={8} y={39} textAnchor="middle" fontSize={12} fontWeight={900} fill="#4C1D95">
          0
        </text>
        <text x={92} y={39} textAnchor="middle" fontSize={12} fontWeight={900} fill="#4C1D95">
          1
        </text>
        <text x={50} y={39} textAnchor="middle" fontSize={14} fontWeight={900} fill="#DC2626">
          {"⬅"}
        </text>
      </svg>
    );
  return <Tanda a={2} b={4} tanda=">" />;
}

export default function DaftarLipatK4B2({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const [kartu, setKartu] = useState<1 | 2>(1);
  const [buka, setBuka] = useState<string[]>([]);
  const total1 = PITA_LIPAT.length + BANDING_PITA.length;
  const buka1 = buka.filter((k) => k.startsWith("p-") || k.startsWith("b-")).length;
  const buka2 = buka.filter((k) => k.startsWith("a-")).length;
  const selesai1 = buka1 === total1;
  const selesai2 = buka2 === ATURAN_LIPAT.length;
  const ketuk = (kunci: string, suara: string) => {
    speakGuru(suara);
    if (!buka.includes(kunci)) setBuka((b) => [...b, kunci]);
  };
  const petunjuk = kartu === 1 ? PETUNJUK1_INFO_LIPAT : PETUNJUK2_INFO_LIPAT;

  const kotak = (kunci: string, suara: string, isi: React.ReactNode, aria: string, tinggi = "min-h-[46px]") => {
    const t = buka.includes(kunci);
    return (
      <button
        key={kunci}
        type="button"
        onClick={() => ketuk(kunci, suara)}
        aria-label={t ? aria : `Isi kosong: ${aria.split(":")[0]}`}
        className={`flex ${tinggi} w-full items-center justify-center rounded-lg border-[3px] px-1 text-center text-xs font-black leading-tight ${t ? "lm-muncul border-[#15803D] bg-[#ECFDF5] text-[#1C01A5]" : "border-dashed border-[#B45309] bg-white/80 text-lg text-[#B45309]"}`}
      >
        {t ? isi : "?"}
      </button>
    );
  };

  return (
    <div className="space-y-2" data-uji="info-pita-lipat">
      <style>{CSS_LEMARI}</style>
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2">
        <button type="button" onClick={() => speakGuru(petunjuk)} className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm" aria-label="Dengar petunjuk">
          {"\u{1F50A}"}
        </button>
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">{petunjuk}</p>
      </div>

      {kartu === 1 ? (
        <div className="mx-auto w-full max-w-xl rounded-2xl border-[6px] border-[#6D28D9] bg-[#F5F3FF] p-2 shadow-[0_5px_0_rgba(109,40,217,0.35)]" data-uji="tumpukan-pita">
          <div className="space-y-1">
            {PITA_LIPAT.map((n, i) => (
              <React.Fragment key={n}>
                <div className="grid grid-cols-[1fr_5.5rem] items-center gap-2 rounded-md bg-white p-1.5">
                  <Pita n={n} />
                  {kotak(`p-${n}`, suaraPita(n), <Pec p={1} q={n} />, `Pecahan pita ${n} bagian: 1 per ${n}`)}
                </div>
                {i < BANDING_PITA.length ? (
                  <div className="grid grid-cols-[1fr_5.5rem] items-center gap-2 px-1">
                    <span className="text-center text-xs font-black text-[#4C1D95]">{"⬇"} tumpuk, banding</span>
                    {kotak(`b-${i}`, BANDING_PITA[i].suara, <Tanda a={BANDING_PITA[i].besar} b={BANDING_PITA[i].kecil} tanda=">" />, `Banding: 1 per ${BANDING_PITA[i].besar} lebih dari 1 per ${BANDING_PITA[i].kecil}`, "min-h-[40px]")}
                  </div>
                ) : null}
              </React.Fragment>
            ))}
          </div>
        </div>
      ) : (
        <div className="mx-auto w-full max-w-xl rounded-2xl border-[6px] border-[#B45309] bg-[#FFFBEB] p-2 shadow-[0_5px_0_rgba(180,83,9,0.35)]" data-uji="kartu-aturan">
          <div className="space-y-1">
            {ATURAN_LIPAT.map((a) => (
              <div key={a.kunci} className="grid grid-cols-[7rem_1fr] items-center gap-2 rounded-md bg-white p-1">
                <div className="flex min-h-[44px] flex-col items-center justify-center gap-0.5">
                  <GambarAturan kunci={a.kunci} />
                  <span className="text-xs font-black leading-none text-[#78350F]">{a.sebut}</span>
                </div>
                {kotak(`a-${a.kunci}`, a.suara, a.isi, `${a.sebut}: ${a.isi}`, "min-h-[46px]")}
              </div>
            ))}
          </div>
        </div>
      )}

      <p role="status" aria-live="polite" className="min-h-[1.25rem] text-center text-sm font-black text-[#1C01A5]">
        {kartu === 1 ? (selesai1 ? SELESAI1_INFO_LIPAT : `Sudah dibuka ${buka1} dari ${total1} kotak.`) : selesai2 ? SELESAI2_INFO_LIPAT : `Sudah dibuka ${buka2} dari ${ATURAN_LIPAT.length} kotak.`}
      </p>
      <div className="flex items-center justify-center gap-2">
        {kartu === 2 ? (
          <button type="button" onClick={() => setKartu(1)} className="min-h-[48px] rounded-full border-4 border-[#1C01A5] bg-white px-4 text-sm font-black text-[#1C01A5]" aria-label="Kembali ke tumpukan pita">
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
    </div>
  );
}
export { DaftarLipatK4B2 };
