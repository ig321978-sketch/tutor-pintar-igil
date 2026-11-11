"use client";

import React from "react";
import { KalimatBesar } from "./komponen-lab";
import { barisKurang, hasilBagi, kalimatBagi, kalimatPeriksaBagi, pernyataanHabis, type StateKel } from "./lab-kelompok-k3b1";

/* Perwakilan mode Bagi pada Lab Kelompok (K3B1 Sub-Bab G): w wadah, tiap wadah q titik, sisa di luar wadah, */
/* kurang berulang, nama bilangan, dan periksa dengan kali. Hanya titik polos (bukan gambar benda).           */

const WARNA = ["#EF4444", "#3B82F6", "#16A34A", "#F0AB00", "#8B5CF6"];

function Titik({ n, warna, ukuran }: { n: number; warna: string; ukuran: number }) {
  return (
    <div className="flex flex-wrap gap-[2px]">
      {Array.from({ length: n }, (_, j) => (
        <span key={j} className="inline-block rounded-full" style={{ width: ukuran, height: ukuran, backgroundColor: warna }} />
      ))}
    </div>
  );
}

export default function PanelBagiK3({ x }: { x: StateKel }) {
  const { q, sisa } = hasilBagi(x.T, x.w);
  const ukuran = x.T > 60 ? 7 : x.T > 30 ? 9 : 12;
  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-start justify-center gap-1.5" role="img" aria-label={`${x.T} titik dibagi ke ${x.w} wadah. Tiap wadah ${q} titik, tersisa ${sisa}`}>
        {Array.from({ length: x.w }, (_, i) => (
          <div key={i} className="rounded-xl border-2 border-[#1C01A5]/40 bg-white p-1" style={{ minWidth: 28, maxWidth: 6 * (ukuran + 2) + 12 }}>
            <p className="text-center text-[10px] font-black text-[#1C01A5]/70">{i + 1}</p>
            {q > 0 ? <Titik n={q} warna={WARNA[i % WARNA.length]} ukuran={ukuran} /> : <p className="text-center text-xs font-bold text-[#1C01A5]/50">kosong</p>}
          </div>
        ))}
        {sisa > 0 ? (
          <div className="rounded-xl border-2 border-dashed border-[#DC2626] bg-[#FEE2E2] p-1" style={{ maxWidth: 6 * (ukuran + 2) + 12 }}>
            <p className="text-center text-[10px] font-black text-[#7F1D1D]">sisa</p>
            <Titik n={sisa} warna="#7F1D1D" ukuran={ukuran} />
          </div>
        ) : null}
      </div>

      <KalimatBesar teks={kalimatBagi(x.T, x.w)} warna={sisa === 0 ? "bg-[#E8F7EE]" : "bg-[#FEE2E2]"} />
      <p className="text-center text-sm font-black text-[#1C01A5]">{pernyataanHabis(x.T, x.w)}</p>

      {x.tampil.kurang ? (
        <div className="space-y-1">
          <KalimatBesar teks={barisKurang(x.T, x.w)} />
          <p className="text-center text-xs font-bold text-[#1C01A5]/80">
            {x.w} dikurangkan {q} kali. {sisa === 0 ? "Sampai habis." : `Tersisa ${sisa}, kurang dari ${x.w}, jadi berhenti.`}
          </p>
        </div>
      ) : null}

      {x.tampil.nama ? (
        <div className="grid grid-cols-3 gap-1.5 text-center" aria-label="Nama bilangan pada pembagian">
          {[
            ["Bilangan yang dibagi", x.T],
            ["Pembagi", x.w],
            ["Hasil bagi", q],
          ].map(([nama, nilai]) => (
            <div key={String(nama)} className="rounded-xl border-2 border-[#1C01A5]/30 bg-[#F5F3FF] px-1 py-1">
              <p className="text-[10px] font-black uppercase text-[#1C01A5]/70">{nama}</p>
              <p className="text-2xl font-black text-[#1C01A5]">{nilai}</p>
            </div>
          ))}
        </div>
      ) : null}

      {x.tampil.periksa ? (
        <div className="space-y-1">
          <KalimatBesar teks={kalimatPeriksaBagi(x.T, x.w)} warna="bg-[#E8F7EE]" />
          <p className="text-center text-xs font-bold text-[#1C01A5]/80">Hasil bagi dikali pembagi{sisa > 0 ? ", ditambah sisa," : ""} kembali ke bilangan yang dibagi, yaitu {x.T}.</p>
        </div>
      ) : null}
    </div>
  );
}
