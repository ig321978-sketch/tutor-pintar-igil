"use client";

import React, { useEffect, useReducer } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { Cek, CobaIni, KARTU, Pilihan, TOMBOL_BIASA } from "./simulasi-bersama";
import { KalimatBesar } from "./komponen-lab";
import Atur4 from "./atur-k3b3";
import { ejaK3B3 } from "./eja-k3b3";
import {
  GARIS_MAKS,
  awalMet,
  hasilMet,
  keadaanMet,
  langkahHitung,
  langkahMet,
  meterDari,
  sisaDari,
  teksCmMet,
  teksMC,
  teksUbah,
  ucapMet,
  type KeadaanMet,
  type LangkahMet,
  type PitaMet,
  type StateMet,
} from "./lab-meteran-k3b3";

/* ------------------------------------------------------------------------ */
/* Simulasi (K3B3 Sub-Bab B): Lab Meteran. Pita dirakit dari potongan 1 m        */
/* (merah), 10 cm (biru), dan 1 cm (kuning). Satu pita: tulis, ubah satuan,       */
/* garis meteran. Dua pita: sambung dan potong, dengan menukar atau meminjam.     */
/* Logika: lab-meteran-k3b3.ts.                                                  */
/* ------------------------------------------------------------------------ */

const UNGU = "#1C01A5";
const CATATAN = [
  "Tambah sentimeter terus sampai 100. Apa yang terjadi pada potongan kuning dan biru?",
  "Buat 3 m, lalu nyalakan Ubah satuan. Mengapa dikali 100?",
  "Sambung 4 m 37 cm dan 7 m 43 cm. Nyalakan Langkah hitung. Satuan apa yang dijumlahkan bersama?",
  "Potong pita yang sentimeternya kurang. Mengapa kita meminjam 1 meter?",
];

function Potongan({ cm }: { cm: number }) {
  const m = meterDari(cm);
  const puluh = Math.floor(sisaDari(cm) / 10);
  const satu = cm % 10;
  const kotak = (n: number, warna: string, garis: string, lebar: string, kunci: string) =>
    Array.from({ length: n }, (_, i) => <span key={`${kunci}${i}`} className={`inline-block rounded-sm border-2 ${lebar}`} style={{ backgroundColor: warna, borderColor: garis }} />);
  return (
    <div className="flex flex-wrap items-end gap-1" aria-label={`Pita ${teksMC(cm)}: ${m} potongan 1 meter, ${puluh} potongan 10 cm, ${satu} potongan 1 cm`}>
      {m <= 12 ? kotak(m, "#EF4444", "#7F1D1D", "h-7 w-8", "m") : <span className="rounded-md border-2 border-[#7F1D1D] bg-[#EF4444] px-2 text-sm font-black text-white">{m} × 1 m</span>}
      {kotak(puluh, "#60A5FA", "#1E3A8A", "h-7 w-4", "p")}
      {kotak(satu, "#FACC15", "#854D0E", "h-7 w-2", "s")}
      {cm === 0 ? <span className="text-sm font-bold text-[#1C01A5]/50">belum ada potongan</span> : null}
    </div>
  );
}

function Garis({ cm }: { cm: number }) {
  const lebar = 400;
  const sk = lebar / GARIS_MAKS;
  const x = (n: number) => 20 + n * sk * 1.6;
  const W = 40 + GARIS_MAKS * sk * 1.6;
  return (
    <div className="overflow-x-auto">
      <svg viewBox={`0 0 ${W} 80`} style={{ minWidth: 520 }} className="block h-20 w-full" role="img" aria-label={`Garis meteran dengan batang sepanjang ${cm} cm`}>
        <rect x={x(0)} y="8" width={cm * sk * 1.6} height="22" rx="5" fill="#FCA5A5" stroke="#B91C1C" strokeWidth="2.5" />
        <line x1={x(0)} y1="48" x2={x(GARIS_MAKS)} y2="48" stroke={UNGU} strokeWidth="3" strokeLinecap="round" />
        {Array.from({ length: GARIS_MAKS / 50 + 1 }, (_, i) => i * 50).map((n) => (
          <g key={n}>
            <line x1={x(n)} y1="42" x2={x(n)} y2={n % 100 === 0 ? 58 : 54} stroke={UNGU} strokeWidth="2.5" />
            <text x={x(n)} y="73" textAnchor="middle" fontSize="11" fontWeight="900" fill={UNGU}>
              {n % 100 === 0 ? `${n / 100} m` : n}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

export default function SimulasiLabMeteranK3({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanMet) => void }) {
  const [x, kirim] = useReducer(langkahMet, undefined, awalMet);

  useEffect(() => {
    onKeadaan?.(keadaanMet(x));
  }, [onKeadaan, x]);

  const dua = x.mode === "dua";
  const hasil = hasilMet(x);
  const ubahPita = (pita: PitaMet, satuan: "m" | "cm") => (d: LangkahMet) => kirim({ t: "UBAH", pita, satuan, d });
  const pita = (p: PitaMet, nama: string, warna: string) => {
    const cm = p === "a" ? x.a : x.b;
    return (
      <div className="space-y-1.5" key={p}>
        <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">{nama}</p>
        <Atur4 nama="Meter" nilai={meterDari(cm)} warna={warna} onUbah={ubahPita(p, "m")} satuan="meter" />
        <Atur4 nama="Sentimeter" nilai={sisaDari(cm)} warna={warna} onUbah={ubahPita(p, "cm")} satuan="sentimeter" />
        <Potongan cm={cm} />
        <p className="text-sm font-black text-[#1C01A5]">
          {teksMC(cm)}
          {x.tampil.senti ? ` = ${teksCmMet(cm)}` : ""}
        </p>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">Lab Meteran</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">Rakit pita dari potongan 1 meter, 10 cm, dan 1 cm. Seratus sentimeter sama dengan satu meter.</p>
        </div>
        <TombolSuaraGuru label="Dengarkan langkahnya" onClick={() => speakGuru(ejaK3B3(ucapMet(x)))} />
      </div>

      <div className={`${KARTU} space-y-3`}>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih jumlah pita">
          <Pilihan aktif={!dua} onKlik={() => kirim({ t: "MODE", mode: "satu" })}>
            Satu pita
          </Pilihan>
          <Pilihan aktif={dua} onKlik={() => kirim({ t: "MODE", mode: "dua" })}>
            Dua pita
          </Pilihan>
          {dua ? (
            <>
              <Pilihan aktif={x.op === "sambung"} onKlik={() => kirim({ t: "OP", op: "sambung" })}>
                ➕ Sambung
              </Pilihan>
              <Pilihan aktif={x.op === "potong"} onKlik={() => kirim({ t: "OP", op: "potong" })}>
                ➖ Potong
              </Pilihan>
            </>
          ) : null}
        </div>
        {pita("a", dua ? "Pita pertama" : "Pita", "#FEE2E2")}
        {dua ? pita("b", x.op === "sambung" ? "Pita kedua (disambung)" : "Pita kedua (dipotong)", "#DBEAFE") : null}
        {dua ? (
          hasil === null ? (
            <p className="rounded-xl bg-[#FDECEC] px-3 py-1.5 text-center text-sm font-black text-[#7F1D1D]">
              {x.op === "sambung" ? "Disambung, pita ini lebih dari 100 m." : "Pita yang dipotong lebih panjang dari pita pertama."}
            </p>
          ) : (
            <KalimatBesar teks={`${teksMC(x.a)} ${x.op === "sambung" ? "+" : "−"} ${teksMC(x.b)} = ${teksMC(hasil)}`} warna="bg-[#E8F7EE]" />
          )
        ) : null}
        <p role="status" className={`rounded-2xl border-4 px-3 py-1.5 text-center text-sm font-black ${x.pesan ? "border-[#7FCB96] bg-[#E8F7EE] text-[#14532D]" : "border-[#1C01A5]/30 bg-[#F5F3FF] text-[#1C01A5]"}`}>
          {x.pesan ? `🔁 ${x.pesan}` : "🔧 Tambah atau kurangi meter dan sentimeter. Seratus sentimeter ditukar satu meter."}
        </p>
      </div>

      <div className={`${KARTU} space-y-3`}>
        <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Tampilan</p>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih tampilan">
          <Cek aktif={x.tampil.meterCm} onKlik={() => kirim({ t: "TOGGLE", rep: "meterCm" })}>
            Meter dan cm
          </Cek>
          <Cek aktif={x.tampil.senti} onKlik={() => kirim({ t: "TOGGLE", rep: "senti" })}>
            Sentimeter
          </Cek>
          <Cek aktif={x.tampil.garis} onKlik={() => kirim({ t: "TOGGLE", rep: "garis" })}>
            Garis meteran
          </Cek>
          <Cek aktif={x.tampil.ubah} onKlik={() => kirim({ t: "TOGGLE", rep: "ubah" })}>
            Ubah satuan
          </Cek>
          <Cek aktif={x.tampil.langkah} onKlik={() => kirim({ t: "TOGGLE", rep: "langkah" })}>
            Langkah hitung
          </Cek>
        </div>
        {x.tampil.meterCm ? <KalimatBesar teks={`${teksMC(dua && hasil !== null ? hasil : x.a)}`} /> : null}
        {x.tampil.senti ? <KalimatBesar teks={teksCmMet(dua && hasil !== null ? hasil : x.a)} warna="bg-[#E8F7EE]" /> : null}
        {x.tampil.garis ? (
          (dua && hasil !== null ? hasil : x.a) <= GARIS_MAKS ? (
            <Garis cm={dua && hasil !== null ? hasil : x.a} />
          ) : (
            <p className="rounded-xl bg-[#FFF7CC] px-3 py-1.5 text-center text-sm font-bold text-[#1C01A5]">Garis meteran hanya sampai 4 m. Pita ini lebih panjang.</p>
          )
        ) : null}
        {x.tampil.ubah ? <p className="rounded-xl bg-[#EDE9FE] px-3 py-1.5 text-center text-sm font-black text-[#1C01A5]">{teksUbah(dua && hasil !== null ? hasil : x.a)}</p> : null}
        {x.tampil.langkah ? (
          dua ? (
            <ol className="space-y-1" aria-label="Langkah hitung">
              {langkahHitung(x).map((l) => (
                <li key={l} className="rounded-xl bg-[#FFF7CC] px-3 py-1 text-sm font-bold text-[#1C01A5]">
                  {l}
                </li>
              ))}
            </ol>
          ) : (
            <p className="text-xs font-bold text-[#1C01A5]/70">Langkah hitung muncul saat memakai dua pita.</p>
          )
        ) : null}
        <button type="button" className={TOMBOL_BIASA} onClick={() => kirim({ t: "RESET" })}>
          🔁 Reset Semua
        </button>
      </div>

      <CobaIni judul="Coba ini!" onDengar={() => speakGuru(`Coba ini. ${CATATAN.map((c, i) => `${["Satu", "Dua", "Tiga", "Empat"][i]}, ${ejaK3B3(c)}`).join(" ")}`)} langkah={CATATAN} />
    </div>
  );
}

export type { StateMet };
