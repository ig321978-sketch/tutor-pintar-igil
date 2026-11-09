"use client";

import React, { useContext, useState } from "react";
import { KERTAS_ANGKA } from "./SubBabA2Penjumlahan";
import { KabarChip, Letusan, useLetusan, type Kabar } from "./SubBabBBanding";
import { CatatanPensil, SuaraCtx } from "./tahap-b-gaya";
import { Berhasil, TOMBOL_BESAR, TOMBOL_PUTIH } from "./permainan-k2b2";
import { cocokPutar, type SoalPutar } from "./data-k3b4";
import { BusurSvg } from "./diagram-k3b4b";

/* ------------------------------------------------------------------------ */
/* Mesin PutarSudut (Matematika Kelas 3 Bab 4, Sub-Bab B). Siswa memutar satu kaki  */
/* sudut dengan tombol atau penggeser, lalu menekan Periksa.                       */
/*  - tampilan "strip": sepasang strip karton dengan pengait (Aktivitas 2 dan 3),  */
/*    acuan berupa garis putus atau pojok kertas lipat. Tahap Concrete.            */
/*  - tampilan "busur": busur derajat dan kaki OB yang diputar (menggambar sudut). */
/*    Tahap Picture.                                                              */
/* Tanpa API dan tanpa acak.                                                      */
/* ------------------------------------------------------------------------ */

export type SoalPutarMesin = SoalPutar & {
  tampilan: "strip" | "busur";
  tanya: string;
  /** Langkah putaran dalam derajat. */
  langkah: number;
  /** Sudut terbesar yang boleh dibentuk. */
  maks: number;
  pesan: string;
};

const BIRU = "#1C01A5";
const rad = (d: number) => (d * Math.PI) / 180;
const bulat = (n: number) => Math.round(n * 100) / 100;

function StripSvg({ sudut, target, syarat }: { sudut: number; target: number; syarat: SoalPutar["syarat"] }) {
  const cx = 125;
  const cy = 130;
  const panjang = 108;
  const acuan = { x: cx + (panjang + 10) * Math.cos(rad(target)), y: cy - (panjang + 10) * Math.sin(rad(target)) };
  const pojok = syarat === "sama" && target === 90;
  return (
    <svg viewBox="0 0 250 150" className="mx-auto block h-auto w-full" role="img" aria-label={`Sepasang strip sudut yang digabung dengan pengait`}>
      {pojok ? (
        <g>
          <rect x={cx} y={cy - 78} width="78" height="78" fill="#FEF9C3" stroke="#CA8A04" strokeWidth="2" strokeDasharray="5 3" />
          <polyline points={`${cx + 14},${cy} ${cx + 14},${cy - 14} ${cx},${cy - 14}`} fill="none" stroke="#CA8A04" strokeWidth="2" />
        </g>
      ) : (
        <line x1={cx} y1={cy} x2={bulat(acuan.x)} y2={bulat(acuan.y)} stroke="#DC2626" strokeWidth="2.5" strokeDasharray="6 5" strokeLinecap="round" />
      )}
      <g>
        <rect x={cx} y={cy - 8} width={panjang} height="16" rx="3" fill="#D97706" stroke={BIRU} strokeWidth="2" />
      </g>
      <g transform={`rotate(${-sudut} ${cx} ${cy})`}>
        <rect x={cx} y={cy - 8} width={panjang} height="16" rx="3" fill="#6366F1" stroke={BIRU} strokeWidth="2" />
      </g>
      <circle cx={cx} cy={cy} r="7" fill="#FDE68A" stroke={BIRU} strokeWidth="2.5" />
    </svg>
  );
}

function petunjukPutar(s: SoalPutarMesin, sudut: number): string {
  if (s.syarat === "lebih") return "Sudut strip belum lebih besar dari sudut acuan. Putar strip lebih jauh.";
  if (s.syarat === "kurang") return sudut === 0 ? "Kedua strip berimpit, belum ada sudut. Putar sedikit." : "Sudut strip belum lebih kecil dari sudut acuan. Putar strip lebih dekat.";
  return sudut < s.target ? "Sudutnya masih terlalu kecil. Putar lebih jauh." : "Sudutnya sudah terlalu besar. Putar lebih dekat.";
}

/** Putar satu kaki sudut sampai memenuhi syarat terhadap sudut acuan, lalu tekan Periksa. */
export function PutarSudut({ soal, onBeres, pesanBeres }: { soal: SoalPutarMesin[]; onBeres: () => void; pesanBeres: string }) {
  const ucap = useContext(SuaraCtx);
  const [nomor, setNomor] = useState(0);
  const [sudut, setSudut] = useState(() => soal[0].awal);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const beres = nomor >= soal.length;
  const s = soal[Math.min(nomor, soal.length - 1)];

  const putar = (nilai: number) => {
    const baru = Math.max(0, Math.min(s.maks, nilai));
    setSudut(baru);
    setKabar(null);
  };

  const periksa = () => {
    if (beres) return;
    if (!cocokPutar(s.syarat, s.target, sudut)) {
      setKabar({ teks: petunjukPutar(s, sudut), ok: false });
      return;
    }
    if (nomor + 1 >= soal.length) {
      setKabar(null);
      letusan.picu();
      ucap(`${s.pesan} ${pesanBeres}`);
      setNomor(nomor + 1);
      onBeres();
    } else {
      setKabar({ teks: s.pesan, ok: true });
      setNomor(nomor + 1);
      setSudut(soal[nomor + 1].awal);
    }
  };

  return (
    <>
      <div className={`${KERTAS_ANGKA} space-y-3`}>
        {beres ? (
          <Berhasil>{pesanBeres}</Berhasil>
        ) : (
          <>
            <p className="text-center text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">
              Soal {nomor + 1} dari {soal.length}
            </p>
            <CatatanPensil pendek={s.tanya} />
            <div className="flex justify-center rounded-2xl border-4 border-[#1C01A5]/30 bg-white px-1 py-2" aria-live="polite">
              <div className="w-full max-w-[340px]">{s.tampilan === "busur" ? <BusurSvg deg={sudut} /> : <StripSvg sudut={sudut} target={s.target} syarat={s.syarat} />}</div>
            </div>
            <input
              type="range"
              min={0}
              max={s.maks}
              step={s.langkah}
              value={sudut}
              onChange={(e) => putar(Number(e.target.value))}
              aria-label={s.tampilan === "busur" ? "Putar kaki OB" : "Putar strip sudut"}
              className="block w-full accent-[#1C01A5]"
            />
            <div className="grid grid-cols-2 gap-2">
              <button type="button" aria-label="Perkecil sudut" disabled={sudut <= 0} onClick={() => putar(sudut - s.langkah)} className={`${TOMBOL_PUTIH} !px-1`}>
                ◀ Perkecil
              </button>
              <button type="button" aria-label="Perbesar sudut" disabled={sudut >= s.maks} onClick={() => putar(sudut + s.langkah)} className={`${TOMBOL_PUTIH} !px-1`}>
                Perbesar ▶
              </button>
            </div>
            <button type="button" aria-label="Periksa sudut" onClick={periksa} className={`${TOMBOL_BESAR} w-full`}>
              Periksa
            </button>
          </>
        )}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}
