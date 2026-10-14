"use client";

import { useEffect, useState, type ReactNode } from "react";
import BrainActivationCard from "@/components/brain-activation/BrainActivationCard";
import { pemanasanUntukSesi } from "@/data/brainActivationConfig";
import { pemanasanSelesaiHariIni, tandaiPemanasanSelesaiHariIni } from "@/lib/pemanasan-otak-hari";

export default function GerbangPemanasanOtak({
  kelas,
  mapel,
  materi,
  children,
}: {
  kelas: string;
  mapel: string;
  materi: string;
  children: ReactNode;
}) {
  const modul = pemanasanUntukSesi(kelas, mapel, materi);
  const [mode, setMode] = useState<"tunggu" | "main" | "materi">("tunggu");

  useEffect(() => {
    if (!modul) return;
    setMode(pemanasanSelesaiHariIni(modul.moduleId) ? "materi" : "main");
  }, [modul]);

  if (!modul) return children;
  if (mode !== "main") return mode === "materi" ? children : null;

  return (
    <BrainActivationCard
      chapterNumber={modul.chapterNumber}
      onSkip={() => setMode("materi")}
      onComplete={() => {
        tandaiPemanasanSelesaiHariIni(modul.moduleId);
        setMode("materi");
      }}
    />
  );
}
