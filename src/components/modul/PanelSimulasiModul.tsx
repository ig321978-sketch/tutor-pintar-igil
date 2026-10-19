"use client";

import { useRef } from "react";
import SimulasiMtk1Bab1 from "@/components/modules/SimulasiMtk1Bab1";
import SimulasiPhetPenjumlahanKelas1 from "@/components/modules/SimulasiPhetPenjumlahanKelas1";
import { adalahMtk1Bab1, adalahMtk1Bab2 } from "@/lib/naskah-resmi";

type PanelSimulasiProps = {
  nama: string;
  kelas: string;
  mapel: string;
  materi: string;
  sudahLulus?: boolean;
  onSelesai?: (lulus: boolean, catatan: string) => void;
  onMemuat?: (memuat: boolean) => void;
};

function PanelSimulasiMembilang({
  sudahLulus = false,
  onSelesai,
}: Pick<PanelSimulasiProps, "sudahLulus" | "onSelesai">) {
  const dicatat = useRef(sudahLulus);
  return (
    <SimulasiMtk1Bab1
      onBenar={() => {
        if (dicatat.current) return;
        dicatat.current = true;
        onSelesai?.(true, "Tantangan membilang sampai 10 selesai.");
      }}
    />
  );
}

function PanelSimulasiPenjumlahan({
  sudahLulus = false,
  onSelesai,
}: Pick<PanelSimulasiProps, "sudahLulus" | "onSelesai">) {
  const dicatat = useRef(sudahLulus);
  return (
    <SimulasiPhetPenjumlahanKelas1
      onBenar={() => {
        if (dicatat.current) return;
        dicatat.current = true;
        onSelesai?.(true, "Lab batang blok dan garis bilangan selesai.");
      }}
    />
  );
}

export default function PanelSimulasiModul({
  kelas,
  mapel,
  materi,
  sudahLulus = false,
  onSelesai,
}: PanelSimulasiProps) {
  if (adalahMtk1Bab1(kelas, mapel, materi)) {
    return <PanelSimulasiMembilang sudahLulus={sudahLulus} onSelesai={onSelesai} />;
  }
  if (adalahMtk1Bab2(kelas, mapel, materi)) {
    return <PanelSimulasiPenjumlahan sudahLulus={sudahLulus} onSelesai={onSelesai} />;
  }
  return (
    <p className="text-sm font-semibold text-[#1C01A5]">
      Lab simulasi bab ini masih disusun di IGIL.
    </p>
  );
}
