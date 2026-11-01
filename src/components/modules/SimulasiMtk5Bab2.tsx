"use client";

import { useEffect, useState } from "react";
import { GamePapanKelipatan, GamePitaFaktor, GameSaringanPrima } from "@/components/GameMtk5Bab2";

type Pos = "papan" | "pita" | "saring";

const POS: Array<{ id: Pos; label: string }> = [
  { id: "papan", label: "Papan tepuk" },
  { id: "pita", label: "Pita faktor" },
  { id: "saring", label: "Saringan prima" },
];

export default function SimulasiMtk5Bab2({ onBenar }: { onBenar?: () => void }) {
  const [pos, setPos] = useState<Pos>("papan");
  const [menang, setMenang] = useState<Record<Pos, boolean>>({ papan: false, pita: false, saring: false });
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
      <p className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">Lab bukit layangan</p>
      <h3 className="text-xl font-black text-[#1C01A5]">Tiga permainan sub-bab</h3>
      <p className="text-sm font-semibold text-slate-700">Papan tepuk, pita faktor, dan saringan prima pindah ke simulasi.</p>
      <div className="flex flex-nowrap gap-2 overflow-x-auto">
        {POS.map((item) => (
          <button key={item.id} type="button" onClick={() => setPos(item.id)} className={`shrink-0 rounded-full px-3 py-2 text-sm font-black ${pos === item.id ? "bg-[#1C01A5] text-white" : "bg-white text-[#1C01A5] ring-2 ring-sky-200"}`}>
            {menang[item.id] ? "✓ " : ""}{item.label}
          </button>
        ))}
      </div>
      {pos === "papan" ? <GamePapanKelipatan onMenang={() => tandai("papan")} /> : null}
      {pos === "pita" ? <GamePitaFaktor onMenang={() => tandai("pita")} /> : null}
      {pos === "saring" ? <GameSaringanPrima onMenang={() => tandai("saring")} /> : null}
    </div>
  );
}
