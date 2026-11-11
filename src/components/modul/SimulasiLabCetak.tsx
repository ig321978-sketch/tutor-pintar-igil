"use client";

import React, { useEffect, useState } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { Cek, CobaIni, KARTU, Pilihan, TOMBOL_BIASA, TOMBOL_UTAMA } from "./simulasi-bersama";
import { KalimatBesar, UNGU, eja } from "./komponen-lab";
import {
  NAMA_CETAK,
  PERMUKAAN,
  URUT_CETAK,
  awalPermukaan,
  cariPermukaan,
  cetak,
  kalimatCetak,
  tabelCetak,
  ucapanCetak,
  ukuranCetakan,
  type RuangCetak,
} from "./lab-cetak-k2b3";
import type { KeadaanCetak } from "./misi-k2bab3";

/* ------------------------------------------------------------------------ */
/* Simulasi (K2B3): Lab Cetak Permukaan — PhET.                               */
/* Pilih bangun ruang dan satu permukaannya, lalu cetak pada kertas.          */
/* Permukaan datar menghasilkan bangun datar. Logika: lab-cetak-k2b3.ts.      */
/* ------------------------------------------------------------------------ */

const WARNA_CETAK = "#C7D2FE";

function Kertas({ r, id, dicetak }: { r: RuangCetak; id: string; dicetak: boolean }) {
  const c = cetak(r, id);
  const u = ukuranCetakan(r, id);
  const w = u.w * 2;
  const h = u.h * 2;
  const p = cariPermukaan(r, id);
  return (
    <svg viewBox="0 0 200 200" className="mx-auto block w-full max-w-[260px] rounded-2xl bg-indigo-50/60" role="img" aria-label={dicetak ? c.catatan : `Kertas kosong. ${p.nama}.`}>
      <rect x={14} y={14} width={172} height={172} rx={10} fill="#fff" stroke={UNGU} strokeWidth={3} strokeDasharray="2 0" />
      {dicetak && c.ada && c.bentuk === "lingkaran" ? <circle cx={100} cy={100} r={w / 2} fill={WARNA_CETAK} stroke={UNGU} strokeWidth={4} /> : null}
      {dicetak && c.ada && c.bentuk !== "lingkaran" ? (
        <rect x={100 - w / 2} y={100 - h / 2} width={w} height={h} fill={WARNA_CETAK} stroke={UNGU} strokeWidth={4} strokeLinejoin="round" />
      ) : null}
      {dicetak && !c.ada ? (
        <g>
          <path d="M52 112 C 70 80, 90 140, 108 104 S 140 84, 150 100" fill="none" stroke="#EF4444" strokeWidth={4} strokeLinecap="round" strokeDasharray="1 9" />
          <text x={100} y={150} textAnchor="middle" fontSize={13} fontWeight={900} fill="#7F1D1D">
            Tidak ada cetakan rapi
          </text>
        </g>
      ) : null}
      {!dicetak ? (
        <text x={100} y={106} textAnchor="middle" fontSize={14} fontWeight={900} fill="#1C01A5" opacity={0.55}>
          Kertas kosong
        </text>
      ) : null}
    </svg>
  );
}

export default function SimulasiLabCetak({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanCetak) => void }) {
  const [ruang, setRuang] = useState<RuangCetak>("kubus");
  const [permukaan, setPermukaan] = useState(awalPermukaan("kubus"));
  const [dicetak, setDicetak] = useState(false);
  const [lihatTabel, setLihatTabel] = useState(true);

  const p = cariPermukaan(ruang, permukaan);
  const hasil = cetak(ruang, permukaan);

  useEffect(() => {
    onKeadaan?.({ alat: "cetak", ruang, permukaan, dicetak, bentuk: dicetak ? hasil.bentuk : null });
  }, [onKeadaan, ruang, permukaan, dicetak, hasil.bentuk]);

  const pilihRuang = (r: RuangCetak) => {
    setRuang(r);
    setPermukaan(awalPermukaan(r));
    setDicetak(false);
  };
  const pilihPermukaan = (id: string) => {
    setPermukaan(id);
    setDicetak(false);
  };
  const resetSemua = () => {
    setRuang("kubus");
    setPermukaan(awalPermukaan("kubus"));
    setDicetak(false);
    setLihatTabel(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">Lab Cetak Permukaan</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">Cetak satu permukaan bangun ruang pada kertas. Bangun datar apa yang muncul?</p>
        </div>
        <TombolSuaraGuru label="Dengarkan hasil cetak" onClick={() => speakGuru(eja(ucapanCetak(ruang, permukaan, dicetak)))} />
      </div>

      <div className={`${KARTU} space-y-2`}>
        <div className="flex flex-wrap justify-center gap-1.5" role="group" aria-label="Pilih bangun ruang">
          {URUT_CETAK.map((r) => (
            <Pilihan key={r} aktif={ruang === r} onKlik={() => pilihRuang(r)}>
              {NAMA_CETAK[r]}
            </Pilihan>
          ))}
        </div>
        {PERMUKAAN[ruang].length > 1 ? (
          <div className="flex flex-wrap justify-center gap-1.5" role="group" aria-label="Pilih permukaan">
            {PERMUKAAN[ruang].map((s) => (
              <Pilihan key={s.id} aktif={permukaan === s.id} onKlik={() => pilihPermukaan(s.id)}>
                {s.nama}
              </Pilihan>
            ))}
          </div>
        ) : null}
        <p className="text-center text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">
          {NAMA_CETAK[ruang]} • {p.nama} • {p.jenis === "datar" ? "permukaan datar" : "permukaan lengkung"}
        </p>
      </div>

      <div className={`${KARTU} space-y-2`}>
        <Kertas r={ruang} id={permukaan} dicetak={dicetak} />
        <div className="flex justify-center">
          <button type="button" className={TOMBOL_UTAMA} onClick={() => setDicetak(true)}>
            🖨️ Cetak permukaan ini
          </button>
        </div>
        <KalimatBesar teks={kalimatCetak(ruang, permukaan, dicetak)} warna="bg-[#FFE566]" />
        {dicetak && hasil.ada ? (
          <p role="status" className="rounded-xl bg-[#E8F7EE] px-3 py-1.5 text-center text-sm font-black text-[#14532D]">
            Hasil cetak: {hasil.nama}. Sisi lurus: {hasil.sisiLurus}. Sudut: {hasil.sudut}.
          </p>
        ) : null}
        <div className="flex flex-wrap items-center justify-center gap-1.5">
          <Cek aktif={lihatTabel} onKlik={() => setLihatTabel((x) => !x)}>
            Tabel cetakan
          </Cek>
          <button type="button" className={TOMBOL_BIASA} onClick={resetSemua}>
            ↺ Reset Semua
          </button>
        </div>
      </div>

      {lihatTabel ? (
        <div className={`${KARTU} space-y-2`}>
          <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Tabel cetakan</p>
          <div className="overflow-hidden rounded-xl border-4 border-[#1C01A5]" role="table" aria-label="Tabel cetakan bangun ruang">
            <div role="row" className="grid grid-cols-3 bg-indigo-50 text-center text-xs font-black text-[#1C01A5]">
              <p role="columnheader" className="px-1 py-1.5">Bangun ruang</p>
              <p role="columnheader" className="border-l-2 border-[#1C01A5]/30 px-1 py-1.5">Permukaan datar</p>
              <p role="columnheader" className="border-l-2 border-[#1C01A5]/30 px-1 py-1.5">Hasil cetakan</p>
            </div>
            {tabelCetak().map((b) => (
              <div key={b.ruang} role="row" className={`grid grid-cols-3 border-t-2 border-[#1C01A5]/30 text-center text-sm font-black ${b.ruang === ruang ? "bg-[#FFE566]" : "bg-white"}`}>
                <p role="cell" className="px-1 py-1.5 text-[#1C01A5]">{b.nama}</p>
                <p role="cell" className="border-l-2 border-[#1C01A5]/30 px-1 py-1.5 text-[#1C01A5]">{b.datar}</p>
                <p role="cell" className="border-l-2 border-[#1C01A5]/30 px-1 py-1.5 text-xs text-[#1C01A5]">{b.cetakan}</p>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      <CobaIni
        judul="Coba ini!"
        onDengar={() =>
          speakGuru(
            "Coba ini. Satu, cetak satu sisi kubus. Bangun datar apa yang muncul? Dua, cetak sisi besar balok. Apa bedanya dengan kubus? Tiga, cetak alas tabung. Empat, cetak bola. Mengapa tidak ada cetakan yang rapi?"
          )
        }
        langkah={[
          "Cetak satu sisi kubus. Bangun datar apa yang muncul?",
          "Cetak sisi besar balok. Apa bedanya dengan kubus?",
          "Cetak alas tabung. Bangun datar apa yang muncul?",
          "Cetak bola. Mengapa tidak ada cetakan yang rapi?",
        ]}
      />
    </div>
  );
}
