"use client";

import React, { useState } from "react";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import { KAMAR_JATAH, PERIKSA_JATAH, PETUNJUK1_INFO_JATAH, PETUNJUK2_INFO_JATAH, SELESAI1_INFO_JATAH, SELESAI2_INFO_JATAH, type BarisKamar } from "./data-kartu";

/**
 * Infografis Kelas 4 Bab 1 Sub-Bab H (dirancang sendiri, dua kartu, tiap kartu satu layar tanpa gulir): data dari Story.
 * Kartu 1 = lorong kamar Bu Ratna: tiga lajur pintu (56 : 4, 59 : 4 dengan aula untuk sisa, 24 : 6); titik tamu tiap pintu digambar sebanyak hasil bagi, titik sisa di aula;
 * hasil bagi dan sisa kosong sampai diketuk. Kartu 2 = lima kertas pengumuman periksa dan sisa (kosong sampai diketuk). Digital saja.
 */
function Lorong({ b }: { b: BarisKamar }) {
  const n = b.pembagi + (b.sisa > 0 ? 1 : 0);
  const slot = 280 / n;
  const kolom = Math.ceil(b.hasil / 2);
  const jarak = Math.min(8, (slot - 12) / kolom);
  return (
    <svg viewBox="0 0 280 46" className="h-auto w-full" role="img" aria-label={`${b.pembagi} ${b.wadah}, tiap ${b.wadah} ${b.hasil}${b.sisa > 0 ? `, sisa ${b.sisa} di aula` : ""}`} data-wadah={b.pembagi} data-hasil={b.hasil} data-sisa={b.sisa}>
      {Array.from({ length: n }, (_, p) => {
        const aula = p === b.pembagi;
        const x0 = p * slot + 3;
        const jumlah = aula ? b.sisa : b.hasil;
        const mulai = x0 + (slot - 6 - kolom * jarak) / 2;
        return (
          <g key={p}>
            <rect x={x0} y={2} width={slot - 6} height={29} rx={4} fill={aula ? "#FEE2E2" : "#FEF3C7"} stroke={aula ? "#B91C1C" : "#92400E"} strokeWidth={2} strokeDasharray={aula ? "4 3" : undefined} />
            {Array.from({ length: jumlah }, (_, i) => (
              <circle key={i} cx={mulai + (i % kolom) * jarak + jarak / 2} cy={10 + Math.floor(i / kolom) * 9} r={Math.min(3.4, jarak / 2 - 0.3)} fill={aula ? "#DC2626" : "#0369A1"} data-titik="1" />
            ))}
            <text x={x0 + (slot - 6) / 2} y={43} textAnchor="middle" fontSize={11} fontWeight={900} fill={aula ? "#B91C1C" : "#78350F"}>
              {aula ? "aula" : p + 1}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export default function DaftarJatahK4B1({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const [kartu, setKartu] = useState<1 | 2>(1);
  const [buka, setBuka] = useState<string[]>([]);
  const total1 = KAMAR_JATAH.length * 2;
  const total2 = PERIKSA_JATAH.length;
  const buka1 = buka.filter((k) => k.startsWith("k-")).length;
  const buka2 = buka.filter((k) => k.startsWith("p-")).length;
  const selesai1 = buka1 === total1;
  const selesai2 = buka2 === total2;
  const ketuk = (kunci: string, suara: string) => {
    speakGuru(suara);
    if (!buka.includes(kunci)) setBuka((b) => [...b, kunci]);
  };
  const petunjuk = kartu === 1 ? PETUNJUK1_INFO_JATAH : PETUNJUK2_INFO_JATAH;

  const kotak = (kunci: string, suara: string, isi: string, aria: string) => {
    const t = buka.includes(kunci);
    return (
      <button
        key={kunci}
        type="button"
        onClick={() => ketuk(kunci, suara)}
        aria-label={t ? aria : `Isi kosong: ${aria.split(":")[0]}`}
        className={`flex min-h-[40px] w-full items-center justify-center rounded-lg border-[3px] px-1 text-center font-black ${t ? "lm-muncul border-[#15803D] bg-[#ECFDF5] text-sm text-[#1C01A5]" : "border-dashed border-[#B45309] bg-white/80 text-lg text-[#B45309]"}`}
      >
        {t ? isi : "?"}
      </button>
    );
  };

  return (
    <div className="space-y-2" data-uji="info-jatah">
      <style>{CSS_LEMARI}</style>
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2">
        <button type="button" onClick={() => speakGuru(petunjuk)} className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm" aria-label="Dengar petunjuk">
          {"\u{1F50A}"}
        </button>
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">{petunjuk}</p>
      </div>

      {kartu === 1 ? (
        <div className="mx-auto w-full max-w-xl rounded-2xl border-[6px] border-[#B45309] bg-[#FEF3C7] p-2 shadow-[0_5px_0_rgba(180,83,9,0.4)]" data-uji="lorong-kamar">
          <div className="space-y-1.5">
            {KAMAR_JATAH.map((b) => (
              <div key={b.kunci} className="rounded-lg border-2 border-[#FDE68A] bg-white p-1">
                <p className="text-center text-xs font-black leading-none text-[#78350F]">{b.nama}</p>
                <Lorong b={b} />
                <div className="grid grid-cols-[auto_1fr_auto_1fr] items-center gap-1">
                  {b.sel.flatMap((x, j) => [
                    <p key={`t${j}`} className="text-[11px] font-black leading-none text-[#B45309]">
                      {x.label}
                    </p>,
                    kotak(`k-${b.kunci}-${j}`, x.suara, x.isi, `${x.label}: ${x.isi}`),
                  ])}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="mx-auto w-full max-w-xl rounded-2xl border-[6px] border-[#14532D] bg-[#DCFCE7] p-2 shadow-[0_5px_0_rgba(20,83,45,0.4)]" data-uji="kartu-periksa">
          <div className="grid grid-cols-2 gap-2">
            {PERIKSA_JATAH.map((p, i) => (
              <div key={p.kunci} className={`space-y-1 rounded-lg border-2 border-[#86EFAC] bg-white p-1.5 ${i === PERIKSA_JATAH.length - 1 ? "col-span-2" : ""}`}>
                <p className="min-h-[2rem] text-center text-xs font-black leading-tight text-[#14532D]">{p.caption}</p>
                {kotak(`p-${p.kunci}`, p.suara, p.isi, `${p.caption}: ${p.isi}`)}
              </div>
            ))}
          </div>
        </div>
      )}

      <p role="status" aria-live="polite" className="min-h-[1.25rem] text-center text-sm font-black text-[#1C01A5]">
        {kartu === 1 ? (selesai1 ? SELESAI1_INFO_JATAH : `Sudah dibuka ${buka1} dari ${total1} kotak.`) : selesai2 ? SELESAI2_INFO_JATAH : `Sudah dibuka ${buka2} dari ${total2} kotak.`}
      </p>
      <div className="flex items-center justify-center gap-2">
        {kartu === 2 ? (
          <button type="button" onClick={() => setKartu(1)} className="min-h-[48px] rounded-full border-4 border-[#1C01A5] bg-white px-4 text-sm font-black text-[#1C01A5]" aria-label="Kembali ke lorong kamar">
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
export { DaftarJatahK4B1 };
