"use client";

import { useEffect, useState } from "react";
import { Medal } from "lucide-react";
import PageShell from "@/components/PageShell";
import {
  bacaProgres,
  susunPeringkatNasional,
  type BarisPeringkat,
} from "@/lib/progres";

export default function RankingNasionalPage() {
  const [peringkat, setPeringkat] = useState<BarisPeringkat[]>([]);
  const [xpSaya, setXpSaya] = useState(0);

  useEffect(() => {
    const data = bacaProgres();
    setXpSaya(data.xpTotal);
    setPeringkat(susunPeringkatNasional(data));
  }, []);

  const posisiSaya = peringkat.findIndex((baris) => baris.milikPengguna) + 1;

  return (
    <PageShell
      judul="🏆 Ranking Nasional"
      subjudul="Papan peringkat berbasis XP dari setiap modul dan kuis yang diselesaikan. Bersaing sehat, tetap belajar jujur."
    >
      <div className="mb-6 rounded-3xl border border-[#F0AB00]/50 bg-[#FFF8E8] px-6 py-5">
        <p className="text-sm font-bold uppercase tracking-wider text-[#F0AB00]">
          Posisimu saat ini
        </p>
        <p className="mt-1 text-3xl font-extrabold text-[#1C01A5]">
          {peringkat.length === 0
            ? "Memuat papan..."
            : posisiSaya > 0
              ? `#${posisiSaya}`
              : "Belum masuk papan"}
          <span className="ml-3 text-lg font-bold text-[#F0AB00]">{xpSaya} XP</span>
        </p>
      </div>

      <div className="overflow-x-auto overflow-hidden rounded-3xl border border-[#1C01A5]/15 bg-white shadow-sm">
        <div className="grid grid-cols-[64px_1fr_1fr_100px] gap-2 bg-[#1C01A5] px-2 py-3 text-xs font-extrabold uppercase tracking-wider text-white">
          <span>Rank</span>
          <span>Nama siswa</span>
          <span>Kota / daerah</span>
          <span className="text-right">Poin</span>
        </div>
        <ul>
          {peringkat.map((baris, indeks) => {
            const nomor = indeks + 1;
            return (
              <li
                key={`${baris.nama}-${baris.kota}`}
                className={`grid grid-cols-[64px_1fr_1fr_100px] items-center gap-2 border-t border-[#1C01A5]/10 px-2 py-3 ${
                  baris.milikPengguna ? "bg-[#F0AB00]/15" : "bg-white"
                }`}
              >
                <span className="flex items-center gap-1 font-extrabold text-[#1C01A5]">
                  {nomor <= 3 ? <Medal className="h-4 w-4 text-[#F0AB00]" /> : null}
                  {nomor}
                </span>
                <span className="font-bold text-slate-800">
                  {baris.nama}
                  {baris.milikPengguna ? (
                    <span className="ml-2 rounded-full bg-[#1C01A5] px-2 py-0.5 text-[10px] font-extrabold uppercase text-white">
                      Kamu
                    </span>
                  ) : null}
                </span>
                <span className="text-sm text-slate-500">{baris.kota}</span>
                <span className="text-right font-extrabold text-[#F0AB00]">
                  {baris.xp.toLocaleString("id-ID")}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </PageShell>
  );
}
