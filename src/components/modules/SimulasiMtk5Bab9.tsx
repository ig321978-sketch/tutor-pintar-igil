"use client";

import { useEffect, useRef, useState } from "react";
import { mainkanSuara } from "@/lib/suara-web-audio";

const RAK = [
  { nama: "Ratus ribuan", nilai: 100000 },
  { nama: "Puluh ribuan", nilai: 10000 },
  { nama: "Ribuan", nilai: 1000 },
  { nama: "Ratusan", nilai: 100 },
  { nama: "Puluhan", nilai: 10 },
  { nama: "Satuan", nilai: 1 },
];

function bertitik(angka: number): string {
  return String(Math.max(0, Math.floor(angka))).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export default function SimulasiMtk5Bab9({ onBenar }: { onBenar?: () => void }) {
  const [rak, setRak] = useState([0, 0, 0, 0, 0, 0]);
  const dicatat = useRef(false);
  const jumlah = rak.reduce((total, digit, indeks) => total + digit * RAK[indeks].nilai, 0);
  const tepat = rak[0] === 3 && rak[1] === 6 && rak.slice(2).every((digit) => digit === 0);

  useEffect(() => {
    if (!tepat || dicatat.current) return;
    dicatat.current = true;
    mainkanSuara("fanfare");
    onBenar?.();
  }, [onBenar, tepat]);

  const ubah = (indeks: number, langkah: number) => {
    setRak((lama) => lama.map((digit, posisi) => (posisi === indeks ? Math.max(0, Math.min(9, digit + langkah)) : digit)));
    mainkanSuara("pop");
  };

  return (
    <div className="space-y-4 rounded-3xl border-2 border-sky-200 bg-white p-4">
      <p className="text-sm font-black uppercase tracking-wide text-sky-800">Lab enam rak</p>
      <h3 className="text-xl font-black text-[#1C01A5]">Susun tiket 360.000</h3>
      <p className="text-sm font-semibold text-slate-700">Naikkan atau turunkan tiap rak. Titik akan muncul sendiri ketika bilangannya sudah mencapai ribuan.</p>
      <p className="text-center text-4xl font-black tracking-wide text-[#1C01A5]">{bertitik(jumlah)}</p>
      <div className="grid gap-2 sm:grid-cols-2">
        {RAK.map((item, indeks) => (
          <div key={item.nama} className="flex items-center justify-between rounded-xl bg-sky-50 px-3 py-2">
            <div>
              <p className="text-sm font-black text-[#1C01A5]">{item.nama}</p>
              <p className="text-xs font-bold text-slate-500">1 angka = {bertitik(item.nilai)}</p>
            </div>
            <div className="flex items-center gap-2">
              <button type="button" onClick={() => ubah(indeks, -1)} className="h-8 w-8 rounded-full bg-white text-lg font-black text-[#1C01A5]">−</button>
              <span className="w-6 text-center text-xl font-black text-[#1C01A5]">{rak[indeks]}</span>
              <button type="button" onClick={() => ubah(indeks, 1)} className="h-8 w-8 rounded-full bg-[#1C01A5] text-lg font-black text-white">+</button>
            </div>
          </div>
        ))}
      </div>
      {tepat ? <p className="text-sm font-black text-emerald-800">360.000 tersusun: 3 di rak ratus ribuan dan 6 di rak puluh ribuan.</p> : <p className="text-sm font-bold text-slate-600">Targetnya 360.000. Rak yang tidak dipakai tetap 0.</p>}
    </div>
  );
}
