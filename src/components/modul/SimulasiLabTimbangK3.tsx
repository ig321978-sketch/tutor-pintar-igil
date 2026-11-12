"use client";

import React, { useEffect, useReducer } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { CobaIni, KARTU, Pilihan, TOMBOL_BIASA, TOMBOL_UTAMA } from "./simulasi-bersama";
import { ejaK3B3 } from "./eja-k3b3";
import {
  BENDA_TIMBANG,
  MAKS_TIMBANG,
  NAMA_TIMBANG,
  awalAktif,
  awalTimbang,
  bacaanTimbang,
  cariBendaTimbang,
  keadaanTimbang,
  langkahTimbang,
  teksBacaan,
  titikTimbang,
  ucapTimbang,
  type JenisTimbang,
  type KeadaanTimbang,
} from "./lab-timbang-k3b3";

/* ------------------------------------------------------------------------ */
/* Simulasi (K3B3 Sub-Bab C): Lab Timbangan. Timbangan digital (layar, gram) dan  */
/* timbangan duduk (jarum, kilogram). Atur ke nol dulu, letakkan benda, baca.     */
/* Logika: lab-timbang-k3b3.ts. Gambar hanya layar, jarum, dan angka.             */
/* ------------------------------------------------------------------------ */

const UNGU = "#1C01A5";
const CATATAN = [
  "Letakkan telur di timbangan digital sebelum mengatur ke nol, lalu tekan Baca berat. Apa kata lab?",
  "Atur ke nol, letakkan telur lagi, lalu baca. Apa bedanya?",
  "Pindah ke timbangan duduk dan timbang semangka. Angka berapa yang ditunjuk jarum?",
  "Timbang tepung dengan timbangan duduk. Mengapa jarum sulit dibaca?",
];

function Digital({ g, ditaruh, nama }: { g: number; ditaruh: boolean; nama: string }) {
  return (
    <svg viewBox="0 0 260 130" className="mx-auto block h-36 w-full max-w-sm" role="img" aria-label={`Timbangan digital menunjukkan ${titikTimbang(g)} g`}>
      <rect x="20" y="64" width="220" height="56" rx="14" fill="#E5E7EB" stroke={UNGU} strokeWidth="4" />
      <rect x="52" y="74" width="156" height="34" rx="6" fill="#14532D" stroke={UNGU} strokeWidth="2" />
      <text x="130" y="99" textAnchor="middle" fontSize="24" fontWeight="900" fill="#86EFAC" fontFamily="monospace">
        {titikTimbang(g)} g
      </text>
      <rect x="62" y="48" width="136" height="12" rx="4" fill="#9CA3AF" stroke={UNGU} strokeWidth="3" />
      {ditaruh ? (
        <g>
          <rect x="82" y="14" width="96" height="30" rx="8" fill="#FDE68A" stroke="#B45309" strokeWidth="3" />
          <text x="130" y="34" textAnchor="middle" fontSize="14" fontWeight="900" fill="#7C2D12">
            {nama}
          </text>
        </g>
      ) : null}
    </svg>
  );
}

function Jarum({ g, ditaruh, nama }: { g: number; ditaruh: boolean; nama: string }) {
  const sudut = (g / MAKS_TIMBANG) * 360;
  const titik = (r: number, a: number) => [100 + r * Math.sin((a * Math.PI) / 180), 100 - r * Math.cos((a * Math.PI) / 180)];
  return (
    <svg viewBox="0 0 200 200" className="mx-auto block h-52 w-full max-w-[14rem]" role="img" aria-label={`Timbangan duduk, jarum ${teksBacaan("duduk", g)}`}>
      <circle cx="100" cy="100" r="92" fill="#F8FAFC" stroke={UNGU} strokeWidth="5" />
      {Array.from({ length: 50 }, (_, i) => i).map((i) => {
        const a = i * 7.2;
        const besar = i % 10 === 0;
        const sedang = i % 5 === 0;
        const [x1, y1] = titik(besar ? 68 : sedang ? 74 : 80, a);
        const [x2, y2] = titik(88, a);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={UNGU} strokeWidth={besar ? 3 : 1.2} />;
      })}
      {[0, 1, 2, 3, 4].map((kg) => {
        const [tx, ty] = titik(54, kg * 72);
        return (
          <text key={kg} x={tx} y={ty + 5} textAnchor="middle" fontSize="15" fontWeight="900" fill={UNGU}>
            {kg}
          </text>
        );
      })}
      <text x="100" y="140" textAnchor="middle" fontSize="12" fontWeight="900" fill={UNGU}>
        kg
      </text>
      <line x1="100" y1="100" x2={titik(70, sudut)[0]} y2={titik(70, sudut)[1]} stroke="#DC2626" strokeWidth="4" strokeLinecap="round" />
      <circle cx="100" cy="100" r="6" fill="#DC2626" stroke={UNGU} strokeWidth="2" />
      {ditaruh ? (
        <text x="100" y="170" textAnchor="middle" fontSize="13" fontWeight="900" fill="#7C2D12">
          di atas: {nama}
        </text>
      ) : null}
    </svg>
  );
}

export default function SimulasiLabTimbangK3({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanTimbang) => void }) {
  const [x, kirim] = useReducer(langkahTimbang, undefined, awalTimbang);

  useEffect(() => {
    onKeadaan?.(keadaanTimbang(x));
  }, [onKeadaan, x]);

  const b = cariBendaTimbang(x.benda);
  const g = bacaanTimbang(x);
  const nol = awalAktif(x) === 0;
  const gagal = x.pesan !== "" && (x.pernahSalah || x.pernahDiantara || x.pesan.startsWith("Letakkan") || x.pesan.includes("melebihi"));

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">Lab Timbangan</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">Atur timbangan ke angka 0, letakkan benda, lalu baca beratnya.</p>
        </div>
        <TombolSuaraGuru label="Dengarkan langkahnya" onClick={() => speakGuru(ejaK3B3(ucapTimbang(x)))} />
      </div>

      <div className={`${KARTU} space-y-3`}>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih timbangan">
          {(["digital", "duduk"] as JenisTimbang[]).map((j) => (
            <Pilihan key={j} aktif={x.jenis === j} onKlik={() => kirim({ t: "JENIS", jenis: j })}>
              {j === "digital" ? "🔢 " : "🕐 "}
              {NAMA_TIMBANG[j]}
            </Pilihan>
          ))}
        </div>
        {x.jenis === "digital" ? <Digital g={g} ditaruh={x.ditaruh} nama={b.nama} /> : <Jarum g={g} ditaruh={x.ditaruh} nama={b.nama} />}
        <p className="text-center text-sm font-black text-[#1C01A5]">
          {x.jenis === "digital" ? "Layar" : "Jarum"}: {teksBacaan(x.jenis, g)} {nol ? "(mulai dari 0)" : "(belum mulai dari 0)"}
        </p>
        <p role="status" className={`rounded-2xl border-4 px-3 py-1.5 text-center text-sm font-black ${gagal ? "border-[#E98989] bg-[#FDECEC] text-[#7F1D1D]" : "border-[#1C01A5]/30 bg-[#F5F3FF] text-[#1C01A5]"}`}>
          {x.pesan ? `${gagal ? "⛔" : "✅"} ${x.pesan}` : nol ? "🔧 Sudah di angka 0. Letakkan benda, lalu Baca berat." : `🔧 ${x.jenis === "digital" ? "Layar" : "Jarum"} belum di angka 0. Atur ke 0 dulu.`}
        </p>
      </div>

      <div className={`${KARTU} space-y-2`}>
        <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Pilih benda</p>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih benda">
          {BENDA_TIMBANG.map((o) => (
            <Pilihan key={o.id} aktif={x.benda === o.id} onKlik={() => kirim({ t: "BENDA", id: o.id })}>
              {o.nama}
            </Pilihan>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button type="button" className={TOMBOL_BIASA} onClick={() => kirim({ t: "NOL" })}>
            0️⃣ Atur ke 0
          </button>
          <button type="button" className={TOMBOL_BIASA} onClick={() => kirim({ t: "TARUH" })}>
            {x.ditaruh ? "🖐️ Angkat benda" : "⬇️ Letakkan benda"}
          </button>
          <button type="button" className={TOMBOL_UTAMA} onClick={() => kirim({ t: "BACA" })}>
            🔍 Baca berat
          </button>
          <button type="button" className={TOMBOL_BIASA} onClick={() => kirim({ t: "RESET" })}>
            🔁 Reset Semua
          </button>
        </div>
        <p className="text-xs font-bold text-[#1C01A5]/70">Satuan baku berat: gram (g) dan kilogram (kg). Timbangan paling berat {titikTimbang(MAKS_TIMBANG)} g.</p>
      </div>

      <CobaIni judul="Coba ini!" onDengar={() => speakGuru(`Coba ini. ${CATATAN.map((c, i) => `${["Satu", "Dua", "Tiga", "Empat"][i]}, ${ejaK3B3(c)}`).join(" ")}`)} langkah={CATATAN} />
    </div>
  );
}
