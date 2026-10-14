"use client";

import { cloneElement, useEffect, useState, type ReactElement } from "react";
import BrainActivationCard from "@/components/brain-activation/BrainActivationCard";
import { pemanasanUntukSesi } from "@/data/brainActivationConfig";
import type { BagianIsi } from "@/lib/bagian-modul";
import { pemanasanSelesaiHariIni, tandaiPemanasanSelesaiHariIni } from "@/lib/pemanasan-otak-hari";

type Mode = "cek" | "penuh" | "kilat" | "buka";

export default function GerbangPemanasanOtak({
  kelas,
  mapel,
  materi,
  children,
}: {
  kelas: string;
  mapel: string;
  materi: string;
  children: ReactElement<{ onPilih: (bagian: BagianIsi) => void }>;
}) {
  const modul = pemanasanUntukSesi(kelas, mapel, materi);
  const [mode, setMode] = useState<Mode>("cek");
  const [antrian, setAntrian] = useState<BagianIsi | null>(null);

  useEffect(() => {
    if (!modul) {
      setMode("buka");
      return;
    }
    setAntrian(null);
    setMode(pemanasanSelesaiHariIni(modul.moduleId) ? "buka" : "penuh");
  }, [modul]);

  if (!modul) return children;
  if (mode === "cek") return null;

  const pilihAsli = children.props.onPilih;
  const tampil = mode === "penuh" || mode === "kilat";

  const pilih = (bagian: BagianIsi) => {
    if (!tampil) {
      pilihAsli(bagian);
      return;
    }
    if (bagian === "ujian") {
      setAntrian("ujian");
      setMode("kilat");
      return;
    }
    setAntrian(bagian);
    setMode("penuh");
  };

  const selesai = () => {
    if (!modul) return;
    const lanjut = antrian;
    tandaiPemanasanSelesaiHariIni(modul.moduleId);
    setAntrian(null);
    setMode("buka");
    if (lanjut) pilihAsli(lanjut);
  };

  return (
    <div className="space-y-4">
      {tampil ? (
        <BrainActivationCard
          key={mode}
          chapterNumber={modul.chapterNumber}
          durasi={mode}
          antrian={antrian}
          onSkip={() => {
            setAntrian(null);
            setMode("buka");
          }}
          onComplete={selesai}
        />
      ) : null}
      {cloneElement(children, { onPilih: pilih })}
    </div>
  );
}
