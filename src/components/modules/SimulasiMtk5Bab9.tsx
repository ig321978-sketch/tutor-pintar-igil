"use client";

import { useEffect, useRef, useState } from "react";
import SempoaEnam from "@/components/SempoaEnam";
import { bacaanCacah, titikRibuan } from "@/lib/bacaan-cacah";
import { mainkanSuara } from "@/lib/suara-web-audio";

const RAK = [
  { nama: "Ratus ribuan", nilai: 100000 },
  { nama: "Puluh ribuan", nilai: 10000 },
  { nama: "Ribuan", nilai: 1000 },
  { nama: "Ratusan", nilai: 100 },
  { nama: "Puluhan", nilai: 10 },
  { nama: "Satuan", nilai: 1 },
];

function bacakan(teks: string) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const suara = new SpeechSynthesisUtterance(teks);
  suara.lang = "id-ID";
  suara.rate = 0.95;
  window.speechSynthesis.speak(suara);
}

export default function SimulasiMtk5Bab9({ onBenar }: { onBenar?: () => void }) {
  const [rak, setRak] = useState([0, 0, 0, 0, 0, 0]);
  const dicatat = useRef(false);
  const jumlah = rak.reduce((total, digit, indeks) => total + digit * RAK[indeks].nilai, 0);
  const tepat = jumlah === 360000;
  const bacaan = bacaanCacah(jumlah);

  useEffect(() => {
    if (!tepat || dicatat.current) return;
    dicatat.current = true;
    mainkanSuara("fanfare");
    onBenar?.();
  }, [onBenar, tepat]);

  return (
    <div className="space-y-4 rounded-3xl border-2 border-sky-200 bg-white p-4">
      <p className="text-sm font-black uppercase tracking-wide text-sky-800">Lab sempoa enam rak</p>
      <h3 className="text-xl font-black text-[#1C01A5]">Susun tiket 360.000</h3>
      <p className="text-sm font-semibold text-slate-700">Geser tiap rak dari 0 sampai 9. Sempoa, angka, dan bacaannya berubah bersama.</p>
      <SempoaEnam nilai={jumlah} />
      <p className="text-center text-4xl font-black tracking-wide text-[#1C01A5]">{titikRibuan(jumlah)}</p>
      <p className="text-center text-sm font-black capitalize text-sky-900">{bacaan}</p>
      <button type="button" onClick={() => bacakan(bacaan)} className="mx-auto block rounded-full bg-[#1C01A5] px-4 py-2 text-sm font-black text-white">
        Bacakan bilangan ini
      </button>
      <div className="grid gap-2">
        {RAK.map((item, indeks) => (
          <label key={item.nama} className="flex items-center gap-3 rounded-xl bg-sky-50 px-3 py-2">
            <span className="w-28 text-sm font-black text-[#1C01A5]">{item.nama}</span>
            <input
              type="range"
              min={0}
              max={9}
              value={rak[indeks]}
              onChange={(ev) => {
                const angka = Number(ev.target.value);
                setRak((lama) => lama.map((digit, posisi) => (posisi === indeks ? angka : digit)));
                mainkanSuara("dial");
              }}
              className="w-full accent-[#1C01A5]"
            />
            <span className="w-16 text-right text-sm font-black text-[#1C01A5]">{titikRibuan(rak[indeks] * item.nilai)}</span>
          </label>
        ))}
      </div>
      {tepat ? <p className="text-sm font-black text-emerald-800">360.000 tersusun: 3 di rak ratus ribuan dan 6 di rak puluh ribuan. Bacanya {bacaan}.</p> : <p className="text-sm font-bold text-slate-600">Targetnya 360.000. Rak yang tidak dipakai tetap 0.</p>}
    </div>
  );
}
