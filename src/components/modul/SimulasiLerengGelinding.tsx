"use client";

import React, { useState } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { Cek, CobaIni, KARTU, Pilihan, TOMBOL_BIASA, TOMBOL_UTAMA } from "./simulasi-bersama";
import { KalimatBesar, UNGU, eja } from "./komponen-lab";
import {
  CIRI_RUANG,
  NAMA_RUANG,
  URUT_RUANG,
  gerakAnimasi,
  kalimatRuang,
  kelompokPermukaan,
  lepas,
  ucapanRuang,
  type Posisi,
  type Ruang,
} from "./lab-ruang-k2b3";

/* ------------------------------------------------------------------------ */
/* Simulasi 3 (K2B3): Lereng Gelinding — PhET percobaan bangun ruang.         */
/* Anak memilih bangun ruang dan cara meletakkan, lalu melepasnya di lereng.  */
/* Menggelinding atau tidak bergantung permukaan yang menyentuh lereng.       */
/* ------------------------------------------------------------------------ */

const SUDUT_LERENG = (Math.atan2(110, 280) * 180) / Math.PI;
const AWAL_X = 50;
const AWAL_Y = 40 + ((AWAL_X - 10) * 110) / 280;

/** Gambar bangun ruang: alas di y = 0, tengah di x = 0. */
function Gambar({ r, p }: { r: Ruang; p: Posisi }) {
  const gs = { stroke: UNGU, strokeWidth: 1.6, strokeLinejoin: "round" as const };
  if (r === "bola") {
    return (
      <g>
        <defs>
          <radialGradient id="igil-bola-k2b3" cx="35%" cy="30%" r="75%">
            <stop offset="0%" stopColor="#FDE68A" />
            <stop offset="100%" stopColor="#F59E0B" />
          </radialGradient>
        </defs>
        <circle cx={0} cy={-22} r={22} fill="url(#igil-bola-k2b3)" {...gs} />
      </g>
    );
  }
  if (r === "kubus" || r === "balok") {
    const w = r === "kubus" ? 34 : p === "berdiri" ? 24 : 48;
    const h = r === "kubus" ? 34 : p === "berdiri" ? 48 : 24;
    const d = 10;
    return (
      <g>
        <polygon points={`${-w / 2},${-h} ${-w / 2 + d},${-h - d} ${w / 2 + d},${-h - d} ${w / 2},${-h}`} fill="#BFDBFE" {...gs} />
        <rect x={-w / 2} y={-h} width={w} height={h} fill="#60A5FA" {...gs} />
        <polygon points={`${w / 2},${-h} ${w / 2 + d},${-h - d} ${w / 2 + d},${-d} ${w / 2},0`} fill="#3B82F6" {...gs} />
      </g>
    );
  }
  if (r === "tabung") {
    if (p === "berdiri") {
      return (
        <g>
          <rect x={-17} y={-46} width={34} height={42} fill="#86EFAC" {...gs} />
          <ellipse cx={0} cy={-4} rx={17} ry={6} fill="#4ADE80" {...gs} />
          <ellipse cx={0} cy={-46} rx={17} ry={6} fill="#BBF7D0" {...gs} />
        </g>
      );
    }
    return (
      <g>
        <rect x={-22} y={-34} width={44} height={34} fill="#86EFAC" {...gs} />
        <ellipse cx={-22} cy={-17} rx={6} ry={17} fill="#4ADE80" {...gs} />
        <ellipse cx={22} cy={-17} rx={6} ry={17} fill="#BBF7D0" {...gs} />
      </g>
    );
  }
  if (p === "berdiri") {
    return (
      <g>
        <polygon points="-20,-4 0,-50 20,-4" fill="#FDA4AF" {...gs} />
        <ellipse cx={0} cy={-4} rx={20} ry={6} fill="#FB7185" {...gs} />
      </g>
    );
  }
  return (
    <g>
      <polygon points="-30,-17 14,-35 14,-1" fill="#FDA4AF" {...gs} />
      <ellipse cx={14} cy={-18} rx={6} ry={17} fill="#FB7185" {...gs} />
    </g>
  );
}

export default function SimulasiLerengGelinding({ speakGuru }: { speakGuru: (t: string) => void }) {
  const [ruang, setRuang] = useState<Ruang>("bola");
  const [posisi, setPosisi] = useState<Posisi>("berdiri");
  const [meluncur, setMeluncur] = useState(false);
  const [lihatTabel, setLihatTabel] = useState(true);
  const [lihatKalimat, setLihatKalimat] = useState(true);

  const hasil = lepas(ruang, posisi);
  const gerak = gerakAnimasi(hasil.gerak);
  const ciri = CIRI_RUANG[ruang];
  const bolehPosisi = ruang !== "kubus" && ruang !== "bola";

  const pilihRuang = (r: Ruang) => {
    setRuang(r);
    setMeluncur(false);
  };
  const pilihPosisi = (p: Posisi) => {
    setPosisi(p);
    setMeluncur(false);
  };
  const resetSemua = () => {
    setRuang("bola");
    setPosisi("berdiri");
    setMeluncur(false);
    setLihatTabel(true);
    setLihatKalimat(true);
  };

  const ucapan = ucapanRuang(ruang, posisi, meluncur);
  const gaya: React.CSSProperties = {
    transformBox: "fill-box",
    transformOrigin: "center",
    transform: meluncur ? `translateX(${gerak.jarak}px) rotate(${gerak.putar}deg)` : "translateX(0px) rotate(0deg)",
    transition: meluncur ? "transform 2.2s ease-in" : "transform 0.4s ease-out",
  };

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">Lereng Gelinding</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">Pilih bangun ruang, letakkan, lalu lepas di lereng. Siapa yang menggelinding?</p>
        </div>
        <TombolSuaraGuru label="Dengarkan penjelasan" onClick={() => speakGuru(eja(ucapan))} />
      </div>

      <div className={`${KARTU} space-y-2`}>
        <div className="flex flex-wrap justify-center gap-1.5" role="group" aria-label="Pilih bangun ruang">
          {URUT_RUANG.map((r) => (
            <Pilihan key={r} aktif={ruang === r} onKlik={() => pilihRuang(r)}>
              {NAMA_RUANG[r]}
            </Pilihan>
          ))}
        </div>
        <div className="flex flex-wrap justify-center gap-1.5" role="group" aria-label="Cara meletakkan">
          <Pilihan aktif={posisi === "berdiri"} onKlik={() => pilihPosisi("berdiri")}>
            Berdiri
          </Pilihan>
          <Pilihan aktif={posisi === "rebah"} onKlik={() => pilihPosisi("rebah")}>
            Rebah
          </Pilihan>
        </div>
        {!bolehPosisi ? (
          <p className="text-center text-xs font-black text-[#1C01A5]/70">{ruang === "bola" ? "Bola sama saja dari sisi mana pun." : "Kubus sama saja berdiri atau rebah."}</p>
        ) : null}

        <svg viewBox="0 0 300 170" className="mx-auto block w-full max-w-[340px] overflow-hidden rounded-2xl bg-indigo-50/60" role="img" aria-label={`${NAMA_RUANG[ruang]} ${posisi} di lereng`}>
          <polygon points="10,40 290,150 10,150" fill="#E0E7FF" stroke={UNGU} strokeWidth={2} strokeLinejoin="round" />
          <line x1={10} y1={40} x2={290} y2={150} stroke={UNGU} strokeWidth={4} strokeLinecap="round" />
          <g transform={`translate(${AWAL_X} ${AWAL_Y.toFixed(2)}) rotate(${SUDUT_LERENG.toFixed(2)})`}>
            <g style={gaya}>
              <Gambar r={ruang} p={posisi} />
            </g>
          </g>
        </svg>

        <div className="flex flex-wrap items-center justify-center gap-1.5">
          <button type="button" className={TOMBOL_UTAMA} onClick={() => setMeluncur(true)} disabled={meluncur}>
            ▶ Lepas di lereng
          </button>
          <button type="button" className={TOMBOL_BIASA} onClick={() => setMeluncur(false)}>
            ↩ Taruh lagi
          </button>
        </div>
        {meluncur ? (
          <p role="status" className={`rounded-xl px-3 py-1.5 text-center text-sm font-black ${hasil.gerak === "diam" ? "bg-[#FDECEC] text-[#7F1D1D]" : "bg-[#E8F7EE] text-[#14532D]"}`}>
            {hasil.gerak === "diam" ? "Diam, tidak menggelinding." : hasil.gerak === "melingkar" ? "Bergerak melingkar." : "Menggelinding!"} {hasil.alasan}
          </p>
        ) : (
          <p role="status" className="rounded-xl bg-indigo-50 px-3 py-1.5 text-center text-sm font-black text-[#1C01A5]">
            Tekan “Lepas di lereng” untuk mencoba.
          </p>
        )}
      </div>

      <div className={`${KARTU} space-y-2`}>
        {lihatKalimat ? <KalimatBesar teks={kalimatRuang(ruang)} warna="bg-[#FFE566]" /> : null}
        {lihatTabel ? (
          <div className="overflow-hidden rounded-xl border-4 border-[#1C01A5]" role="table" aria-label="Tabel ciri bangun ruang">
            <div role="row" className="grid grid-cols-4 bg-indigo-50 text-center text-xs font-black text-[#1C01A5]">
              <p role="columnheader" className="px-1 py-1.5">Bangun</p>
              <p role="columnheader" className="border-l-2 border-[#1C01A5]/30 px-1 py-1.5">Datar</p>
              <p role="columnheader" className="border-l-2 border-[#1C01A5]/30 px-1 py-1.5">Lengkung</p>
              <p role="columnheader" className="border-l-2 border-[#1C01A5]/30 px-1 py-1.5">Ditumpuk</p>
            </div>
            {URUT_RUANG.map((r) => {
              const c = CIRI_RUANG[r];
              const sorot = r === ruang;
              return (
                <div key={r} role="row" className={`grid grid-cols-4 border-t-2 border-[#1C01A5]/40 text-center font-black text-[#1C01A5] ${sorot ? "bg-[#FFE566]" : "bg-white"}`}>
                  <p role="cell" className="px-1 py-1.5 text-sm">{NAMA_RUANG[r]}</p>
                  <p role="cell" className="border-l-2 border-[#1C01A5]/30 px-1 py-1 text-xl text-blue-700">{c.datar}</p>
                  <p role="cell" className="border-l-2 border-[#1C01A5]/30 px-1 py-1 text-xl text-blue-700">{c.lengkung}</p>
                  <p role="cell" className="border-l-2 border-[#1C01A5]/30 px-1 py-1.5 text-sm">{c.ditumpuk ? "Bisa" : "Sulit"}</p>
                </div>
              );
            })}
          </div>
        ) : null}
        <p className="text-center text-sm font-black text-[#1C01A5]">
          {NAMA_RUANG[ruang]}: {kelompokPermukaan(ruang).toLowerCase()} ({ciri.datar} datar, {ciri.lengkung} lengkung)
        </p>
        <div className="flex flex-wrap items-center justify-center gap-1.5">
          <Cek aktif={lihatKalimat} onKlik={() => setLihatKalimat((x) => !x)}>
            Kalimat
          </Cek>
          <Cek aktif={lihatTabel} onKlik={() => setLihatTabel((x) => !x)}>
            Tabel ciri
          </Cek>
          <button type="button" className={TOMBOL_BIASA} onClick={resetSemua}>
            ↺ Reset Semua
          </button>
        </div>
      </div>

      <CobaIni
        judul="Coba ini!"
        onDengar={() =>
          speakGuru(
            "Coba ini. Satu, lepaskan bola, lalu kubus. Apa bedanya? Dua, coba tabung berdiri, lalu tabung rebah. Apa yang berubah? Tiga, lepaskan kerucut rebah. Ke mana geraknya? Empat, lihat tabel. Bangun mana yang hanya punya permukaan datar?"
          )
        }
        langkah={[
          "Lepaskan bola, lalu kubus. Apa bedanya?",
          "Coba tabung berdiri, lalu tabung rebah. Apa yang berubah?",
          "Lepaskan kerucut rebah. Ke mana geraknya?",
          "Lihat tabel. Bangun mana yang hanya punya permukaan datar?",
        ]}
      />
    </div>
  );
}
