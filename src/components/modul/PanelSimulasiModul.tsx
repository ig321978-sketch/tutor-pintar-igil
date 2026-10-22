"use client";

import { useRef } from "react";
import SimulasiMtk1Bab1 from "@/components/modules/SimulasiMtk1Bab1";
import SimulasiMtk1Bab3 from "@/components/modules/SimulasiMtk1Bab3";
import SimulasiMtk1Bab4 from "@/components/modules/SimulasiMtk1Bab4";
import SimulasiMtk1Bab5 from "@/components/modules/SimulasiMtk1Bab5";
import SimulasiMtk1Bab6 from "@/components/modules/SimulasiMtk1Bab6";
import SimulasiMtk1Bab7 from "@/components/modules/SimulasiMtk1Bab7";
import SimulasiPhetPenjumlahanKelas1 from "@/components/modules/SimulasiPhetPenjumlahanKelas1";
import { adalahMtk1Bab1, adalahMtk1Bab2, adalahMtk1Bab3, adalahMtk1Bab4, adalahMtk1Bab5, adalahMtk1Bab6, adalahMtk1Bab7 } from "@/lib/naskah-resmi";

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

function PanelSimulasiPengurangan({
  sudahLulus = false,
  onSelesai,
}: Pick<PanelSimulasiProps, "sudahLulus" | "onSelesai">) {
  const dicatat = useRef(sudahLulus);
  return (
    <SimulasiMtk1Bab3
      onBenar={() => {
        if (dicatat.current) return;
        dicatat.current = true;
        onSelesai?.(true, "Lab pengurangan sampai 10 selesai.");
      }}
    />
  );
}

function PanelSimulasiBentuk({
  sudahLulus = false,
  onSelesai,
}: Pick<PanelSimulasiProps, "sudahLulus" | "onSelesai">) {
  const dicatat = useRef(sudahLulus);
  return (
    <SimulasiMtk1Bab4
      onBenar={() => {
        if (dicatat.current) return;
        dicatat.current = true;
        onSelesai?.(true, "Lab mengenal bentuk selesai.");
      }}
    />
  );
}

function PanelSimulasiMembilang20({
  sudahLulus = false,
  onSelesai,
}: Pick<PanelSimulasiProps, "sudahLulus" | "onSelesai">) {
  const dicatat = useRef(sudahLulus);
  return (
    <SimulasiMtk1Bab5
      onBenar={() => {
        if (dicatat.current) return;
        dicatat.current = true;
        onSelesai?.(true, "Lab membilang sampai 20 selesai.");
      }}
    />
  );
}

function PanelSimulasiTambahKurang20({
  sudahLulus = false,
  onSelesai,
}: Pick<PanelSimulasiProps, "sudahLulus" | "onSelesai">) {
  const dicatat = useRef(sudahLulus);
  return (
    <SimulasiMtk1Bab6
      onBenar={() => {
        if (dicatat.current) return;
        dicatat.current = true;
        onSelesai?.(true, "Lab penjumlahan dan pengurangan sampai 20 selesai.");
      }}
    />
  );
}

function PanelSimulasiUkurPanjang({
  sudahLulus = false,
  onSelesai,
}: Pick<PanelSimulasiProps, "sudahLulus" | "onSelesai">) {
  const dicatat = useRef(sudahLulus);
  return (
    <SimulasiMtk1Bab7
      onBenar={() => {
        if (dicatat.current) return;
        dicatat.current = true;
        onSelesai?.(true, "Lab mengukur panjang benda selesai.");
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
  if (adalahMtk1Bab3(kelas, mapel, materi)) {
    return <PanelSimulasiPengurangan sudahLulus={sudahLulus} onSelesai={onSelesai} />;
  }
  if (adalahMtk1Bab4(kelas, mapel, materi)) {
    return <PanelSimulasiBentuk sudahLulus={sudahLulus} onSelesai={onSelesai} />;
  }
  if (adalahMtk1Bab5(kelas, mapel, materi)) {
    return <PanelSimulasiMembilang20 sudahLulus={sudahLulus} onSelesai={onSelesai} />;
  }
  if (adalahMtk1Bab6(kelas, mapel, materi)) {
    return <PanelSimulasiTambahKurang20 sudahLulus={sudahLulus} onSelesai={onSelesai} />;
  }
  if (adalahMtk1Bab7(kelas, mapel, materi)) {
    return <PanelSimulasiUkurPanjang sudahLulus={sudahLulus} onSelesai={onSelesai} />;
  }
  return (
    <p className="text-sm font-semibold text-[#1C01A5]">
      Lab simulasi bab ini masih disusun di IGIL.
    </p>
  );
}
