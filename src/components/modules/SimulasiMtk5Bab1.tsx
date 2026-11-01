"use client";

import { useEffect, useState } from "react";
import { GameBrankasRak, GameKargoHitung, GameKasirUang, GameRadarBanding } from "@/components/GameMtk5Bab1";

type Pos = "brankas" | "radar" | "kasir" | "kargo";

const POS: Array<{ id: Pos; label: string }> = [
  { id: "brankas", label: "Brankas rak" },
  { id: "radar", label: "Radar banding" },
  { id: "kasir", label: "Kasir uang" },
  { id: "kargo", label: "Kargo hitung" },
];

export default function SimulasiMtk5Bab1({ onBenar }: { onBenar?: () => void }) {
  const [pos, setPos] = useState<Pos>("brankas");
  const [menang, setMenang] = useState<Record<Pos, boolean>>({ brankas: false, radar: false, kasir: false, kargo: false });
  const [selesai, setSelesai] = useState(false);
  const tuntas = POS.every((item) => menang[item.id]);

  const tandai = (id: Pos) => setMenang((lama) => (lama[id] ? lama : { ...lama, [id]: true }));

  useEffect(() => {
    if (selesai || !tuntas) return;
    setSelesai(true);
    onBenar?.();
  }, [onBenar, selesai, tuntas]);

  return (
    <div className="space-y-4">
      <p className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">Lab dermaga</p>
      <h3 className="text-xl font-black text-[#1C01A5]">Empat permainan sub-bab</h3>
      <p className="text-sm font-semibold text-slate-700">Mainkan brankas, radar, kasir, dan kargo. Keempatnya pindah ke simulasi.</p>
      <div className="flex flex-nowrap gap-2 overflow-x-auto">
        {POS.map((item) => (
          <button key={item.id} type="button" onClick={() => setPos(item.id)} className={`shrink-0 rounded-full px-3 py-2 text-sm font-black ${pos === item.id ? "bg-[#1C01A5] text-white" : "bg-white text-[#1C01A5] ring-2 ring-sky-200"}`}>
            {menang[item.id] ? "✓ " : ""}{item.label}
          </button>
        ))}
      </div>
      {pos === "brankas" ? <GameBrankasRak onMenang={() => tandai("brankas")} /> : null}
      {pos === "radar" ? <GameRadarBanding onMenang={() => tandai("radar")} /> : null}
      {pos === "kasir" ? <GameKasirUang onMenang={() => tandai("kasir")} /> : null}
      {pos === "kargo" ? <GameKargoHitung onMenang={() => tandai("kargo")} /> : null}
    </div>
  );
}
