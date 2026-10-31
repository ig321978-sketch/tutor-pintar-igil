"use client";

import { useRef } from "react";
import SimulasiMtk1Bab1 from "@/components/modules/SimulasiMtk1Bab1";
import SimulasiMtk1Bab3 from "@/components/modules/SimulasiMtk1Bab3";
import SimulasiMtk1Bab4 from "@/components/modules/SimulasiMtk1Bab4";
import SimulasiMtk1Bab5 from "@/components/modules/SimulasiMtk1Bab5";
import SimulasiMtk1Bab6 from "@/components/modules/SimulasiMtk1Bab6";
import SimulasiMtk1Bab7 from "@/components/modules/SimulasiMtk1Bab7";
import SimulasiMtk1Bab8 from "@/components/modules/SimulasiMtk1Bab8";
import SimulasiMtk2Bab1 from "@/components/modules/SimulasiMtk2Bab1";
import SimulasiMtk2Bab2 from "@/components/modules/SimulasiMtk2Bab2";
import SimulasiMtk2Bab3 from "@/components/modules/SimulasiMtk2Bab3";
import SimulasiMtk2Bab4 from "@/components/modules/SimulasiMtk2Bab4";
import SimulasiMtk2Bab5 from "@/components/modules/SimulasiMtk2Bab5";
import SimulasiMtk2Bab6 from "@/components/modules/SimulasiMtk2Bab6";
import SimulasiMtk2Bab7 from "@/components/modules/SimulasiMtk2Bab7";
import SimulasiMtk2Bab8 from "@/components/modules/SimulasiMtk2Bab8";
import SimulasiMtk3Bab1 from "@/components/modules/SimulasiMtk3Bab1";
import SimulasiMtk3Kalimat from "@/components/modules/SimulasiMtk3Kalimat";
import SimulasiMtk3Ukur from "@/components/modules/SimulasiMtk3Ukur";
import SimulasiMtk3Bangun from "@/components/modules/SimulasiMtk3Bangun";
import SimulasiMtk3Data from "@/components/modules/SimulasiMtk3Data";
import SimulasiMtk4Bab1 from "@/components/modules/SimulasiMtk4Bab1";
import Bab2PecahanKelas4Module from "@/components/modules/Bab2PecahanKelas4Module";
import SimulasiMtk4Bab3 from "@/components/modules/SimulasiMtk4Bab3";
import SimulasiMtk4Bab4 from "@/components/modules/SimulasiMtk4Bab4";
import SimulasiMtk5Bab8 from "@/components/modules/SimulasiMtk5Bab8";
import SimulasiPhetPenjumlahanKelas1 from "@/components/modules/SimulasiPhetPenjumlahanKelas1";
import { adalahMtk1Bab1, adalahMtk1Bab2, adalahMtk1Bab3, adalahMtk1Bab4, adalahMtk1Bab5, adalahMtk1Bab6, adalahMtk1Bab7, adalahMtk1Bab8, adalahMtk2Bab1, adalahMtk2Bab2, adalahMtk2Bab3, adalahMtk2Bab4, adalahMtk2Bab5, adalahMtk2Bab6, adalahMtk2Bab7, adalahMtk2Bab8, adalahMtk3Bab1, adalahMtk3Kalimat, adalahMtk3Ukur, adalahMtk3Bangun, adalahMtk3Data, adalahMtk4Bab1, adalahMtk4Bab2, adalahMtk4Bab3, adalahMtk4Bab4, adalahMtk5Bab8 } from "@/lib/naskah-resmi";
import type { KelaminGuru } from "@/lib/guru";

type PanelSimulasiProps = {
  nama: string;
  kelas: string;
  mapel: string;
  materi: string;
  kelamin?: KelaminGuru;
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

function PanelSimulasiDiagram({
  sudahLulus = false,
  onSelesai,
}: Pick<PanelSimulasiProps, "sudahLulus" | "onSelesai">) {
  const dicatat = useRef(sudahLulus);
  return (
    <SimulasiMtk1Bab8
      onBenar={() => {
        if (dicatat.current) return;
        dicatat.current = true;
        onSelesai?.(true, "Lab mengenal diagram selesai.");
      }}
    />
  );
}

function PanelSimulasiMembilang50({
  kelas,
  kelamin,
  sudahLulus = false,
  onSelesai,
}: Pick<PanelSimulasiProps, "kelas" | "kelamin" | "sudahLulus" | "onSelesai">) {
  const dicatat = useRef(sudahLulus);
  return (
    <SimulasiMtk2Bab1
      kelas={kelas}
      kelamin={kelamin}
      onBenar={() => {
        if (dicatat.current) return;
        dicatat.current = true;
        onSelesai?.(true, "Lab membilang sampai 50 selesai.");
      }}
    />
  );
}

function PanelSimulasiTambahKurangJambu({
  kelas,
  kelamin,
  sudahLulus = false,
  onSelesai,
}: Pick<PanelSimulasiProps, "kelas" | "kelamin" | "sudahLulus" | "onSelesai">) {
  const dicatat = useRef(sudahLulus);
  return (
    <SimulasiMtk2Bab2
      kelas={kelas}
      kelamin={kelamin}
      onBenar={() => {
        if (dicatat.current) return;
        dicatat.current = true;
        onSelesai?.(true, "Lab penjumlahan dan pengurangan selesai.");
      }}
    />
  );
}

function PanelSimulasiBentukSarang({
  kelas,
  kelamin,
  sudahLulus = false,
  onSelesai,
}: Pick<PanelSimulasiProps, "kelas" | "kelamin" | "sudahLulus" | "onSelesai">) {
  const dicatat = useRef(sudahLulus);
  return (
    <SimulasiMtk2Bab3
      kelas={kelas}
      kelamin={kelamin}
      onBenar={() => {
        if (dicatat.current) return;
        dicatat.current = true;
        onSelesai?.(true, "Lab bentuk di sekitar kita selesai.");
      }}
    />
  );
}

function PanelSimulasiPosisiPola({
  kelas,
  kelamin,
  sudahLulus = false,
  onSelesai,
}: Pick<PanelSimulasiProps, "kelas" | "kelamin" | "sudahLulus" | "onSelesai">) {
  const dicatat = useRef(sudahLulus);
  return (
    <SimulasiMtk2Bab4
      kelas={kelas}
      kelamin={kelamin}
      onBenar={() => {
        if (dicatat.current) return;
        dicatat.current = true;
        onSelesai?.(true, "Lab posisi benda dan pola selesai.");
      }}
    />
  );
}

function PanelSimulasiPecahan({
  kelas,
  kelamin,
  sudahLulus = false,
  onSelesai,
}: Pick<PanelSimulasiProps, "kelas" | "kelamin" | "sudahLulus" | "onSelesai">) {
  const dicatat = useRef(sudahLulus);
  return (
    <SimulasiMtk2Bab5
      kelas={kelas}
      kelamin={kelamin}
      onBenar={() => {
        if (dicatat.current) return;
        dicatat.current = true;
        onSelesai?.(true, "Lab pecahan setengah dan seperempat selesai.");
      }}
    />
  );
}

function PanelSimulasiPengukuran({
  kelas,
  kelamin,
  sudahLulus = false,
  onSelesai,
}: Pick<PanelSimulasiProps, "kelas" | "kelamin" | "sudahLulus" | "onSelesai">) {
  const dicatat = useRef(sudahLulus);
  return (
    <SimulasiMtk2Bab6
      kelas={kelas}
      kelamin={kelamin}
      onBenar={() => {
        if (dicatat.current) return;
        dicatat.current = true;
        onSelesai?.(true, "Lab pengukuran berat dan waktu selesai.");
      }}
    />
  );
}

function PanelSimulasiMembilang100({
  kelas,
  kelamin,
  sudahLulus = false,
  onSelesai,
}: Pick<PanelSimulasiProps, "kelas" | "kelamin" | "sudahLulus" | "onSelesai">) {
  const dicatat = useRef(sudahLulus);
  return (
    <SimulasiMtk2Bab7
      kelas={kelas}
      kelamin={kelamin}
      onBenar={() => {
        if (dicatat.current) return;
        dicatat.current = true;
        onSelesai?.(true, "Lab membilang sampai 100 selesai.");
      }}
    />
  );
}

function PanelSimulasiBilangan1000({
  kelas,
  kelamin,
  sudahLulus = false,
  onSelesai,
}: Pick<PanelSimulasiProps, "kelas" | "kelamin" | "sudahLulus" | "onSelesai">) {
  const dicatat = useRef(sudahLulus);
  return (
    <SimulasiMtk3Bab1
      kelas={kelas}
      kelamin={kelamin}
      onBenar={() => {
        if (dicatat.current) return;
        dicatat.current = true;
        onSelesai?.(true, "Lab bilangan cacah sampai 1.000 selesai.");
      }}
    />
  );
}

function PanelSimulasiKalimat({
  kelas,
  kelamin,
  sudahLulus = false,
  onSelesai,
}: Pick<PanelSimulasiProps, "kelas" | "kelamin" | "sudahLulus" | "onSelesai">) {
  const dicatat = useRef(sudahLulus);
  return (
    <SimulasiMtk3Kalimat
      kelas={kelas}
      kelamin={kelamin}
      onBenar={() => {
        if (dicatat.current) return;
        dicatat.current = true;
        onSelesai?.(true, "Lab kalimat matematika selesai.");
      }}
    />
  );
}

function PanelSimulasiUkur({
  kelas,
  kelamin,
  sudahLulus = false,
  onSelesai,
}: Pick<PanelSimulasiProps, "kelas" | "kelamin" | "sudahLulus" | "onSelesai">) {
  const dicatat = useRef(sudahLulus);
  return (
    <SimulasiMtk3Ukur
      kelas={kelas}
      kelamin={kelamin}
      onBenar={() => {
        if (dicatat.current) return;
        dicatat.current = true;
        onSelesai?.(true, "Lab pengukuran panjang dan berat selesai.");
      }}
    />
  );
}

function PanelSimulasiBangun({
  kelas,
  kelamin,
  sudahLulus = false,
  onSelesai,
}: Pick<PanelSimulasiProps, "kelas" | "kelamin" | "sudahLulus" | "onSelesai">) {
  const dicatat = useRef(sudahLulus);
  return (
    <SimulasiMtk3Bangun
      kelas={kelas}
      kelamin={kelamin}
      onBenar={() => {
        if (dicatat.current) return;
        dicatat.current = true;
        onSelesai?.(true, "Lab unsur bangun datar selesai.");
      }}
    />
  );
}

function PanelSimulasiData({
  kelas,
  kelamin,
  sudahLulus = false,
  onSelesai,
}: Pick<PanelSimulasiProps, "kelas" | "kelamin" | "sudahLulus" | "onSelesai">) {
  const dicatat = useRef(sudahLulus);
  return (
    <SimulasiMtk3Data
      kelas={kelas}
      kelamin={kelamin}
      onBenar={() => {
        if (dicatat.current) return;
        dicatat.current = true;
        onSelesai?.(true, "Lab penyajian data selesai.");
      }}
    />
  );
}

function PanelSimulasiMtk4Pecahan() {
  return <Bab2PecahanKelas4Module />;
}

function PanelSimulasiMtk4Ukur({
  kelas,
  kelamin,
  sudahLulus = false,
  onSelesai,
}: Pick<PanelSimulasiProps, "kelas" | "kelamin" | "sudahLulus" | "onSelesai">) {
  const dicatat = useRef(sudahLulus);
  return (
    <SimulasiMtk4Bab4
      kelas={kelas}
      kelamin={kelamin}
      onBenar={() => {
        if (dicatat.current) return;
        dicatat.current = true;
        onSelesai?.(true, "Lab luas dan volume selesai.");
      }}
    />
  );
}

function PanelSimulasiMtk4Pola({
  kelas,
  kelamin,
  sudahLulus = false,
  onSelesai,
}: Pick<PanelSimulasiProps, "kelas" | "kelamin" | "sudahLulus" | "onSelesai">) {
  const dicatat = useRef(sudahLulus);
  return (
    <SimulasiMtk4Bab3
      kelas={kelas}
      kelamin={kelamin}
      onBenar={() => {
        if (dicatat.current) return;
        dicatat.current = true;
        onSelesai?.(true, "Lab pola selesai.");
      }}
    />
  );
}

function PanelSimulasiCacah10000({
  kelas,
  kelamin,
  sudahLulus = false,
  onSelesai,
}: Pick<PanelSimulasiProps, "kelas" | "kelamin" | "sudahLulus" | "onSelesai">) {
  const dicatat = useRef(sudahLulus);
  return (
    <SimulasiMtk4Bab1
      kelas={kelas}
      kelamin={kelamin}
      onBenar={() => {
        if (dicatat.current) return;
        dicatat.current = true;
        onSelesai?.(true, "Lab bilangan cacah sampai 10.000 selesai.");
      }}
    />
  );
}

function PanelSimulasiTurusDiagram({
  kelas,
  kelamin,
  sudahLulus = false,
  onSelesai,
}: Pick<PanelSimulasiProps, "kelas" | "kelamin" | "sudahLulus" | "onSelesai">) {
  const dicatat = useRef(sudahLulus);
  return (
    <SimulasiMtk2Bab8
      kelas={kelas}
      kelamin={kelamin}
      onBenar={() => {
        if (dicatat.current) return;
        dicatat.current = true;
        onSelesai?.(true, "Lab turus dan diagram gambar selesai.");
      }}
    />
  );
}

export default function PanelSimulasiModul({
  kelas,
  mapel,
  materi,
  kelamin,
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
  if (adalahMtk1Bab8(kelas, mapel, materi)) {
    return <PanelSimulasiDiagram sudahLulus={sudahLulus} onSelesai={onSelesai} />;
  }
  if (adalahMtk2Bab1(kelas, mapel, materi)) {
    return <PanelSimulasiMembilang50 kelas={kelas} kelamin={kelamin} sudahLulus={sudahLulus} onSelesai={onSelesai} />;
  }
  if (adalahMtk2Bab2(kelas, mapel, materi)) {
    return <PanelSimulasiTambahKurangJambu kelas={kelas} kelamin={kelamin} sudahLulus={sudahLulus} onSelesai={onSelesai} />;
  }
  if (adalahMtk2Bab3(kelas, mapel, materi)) {
    return <PanelSimulasiBentukSarang kelas={kelas} kelamin={kelamin} sudahLulus={sudahLulus} onSelesai={onSelesai} />;
  }
  if (adalahMtk2Bab4(kelas, mapel, materi)) {
    return <PanelSimulasiPosisiPola kelas={kelas} kelamin={kelamin} sudahLulus={sudahLulus} onSelesai={onSelesai} />;
  }
  if (adalahMtk2Bab5(kelas, mapel, materi)) {
    return <PanelSimulasiPecahan kelas={kelas} kelamin={kelamin} sudahLulus={sudahLulus} onSelesai={onSelesai} />;
  }
  if (adalahMtk2Bab6(kelas, mapel, materi)) {
    return <PanelSimulasiPengukuran kelas={kelas} kelamin={kelamin} sudahLulus={sudahLulus} onSelesai={onSelesai} />;
  }
  if (adalahMtk2Bab7(kelas, mapel, materi)) {
    return <PanelSimulasiMembilang100 kelas={kelas} kelamin={kelamin} sudahLulus={sudahLulus} onSelesai={onSelesai} />;
  }
  if (adalahMtk2Bab8(kelas, mapel, materi)) {
    return <PanelSimulasiTurusDiagram kelas={kelas} kelamin={kelamin} sudahLulus={sudahLulus} onSelesai={onSelesai} />;
  }
  if (adalahMtk3Bab1(kelas, mapel, materi)) {
    return <PanelSimulasiBilangan1000 kelas={kelas} kelamin={kelamin} sudahLulus={sudahLulus} onSelesai={onSelesai} />;
  }
  if (adalahMtk3Kalimat(kelas, mapel, materi)) {
    return <PanelSimulasiKalimat kelas={kelas} kelamin={kelamin} sudahLulus={sudahLulus} onSelesai={onSelesai} />;
  }
  if (adalahMtk3Ukur(kelas, mapel, materi)) {
    return <PanelSimulasiUkur kelas={kelas} kelamin={kelamin} sudahLulus={sudahLulus} onSelesai={onSelesai} />;
  }
  if (adalahMtk3Bangun(kelas, mapel, materi)) {
    return <PanelSimulasiBangun kelas={kelas} kelamin={kelamin} sudahLulus={sudahLulus} onSelesai={onSelesai} />;
  }
  if (adalahMtk3Data(kelas, mapel, materi)) {
    return <PanelSimulasiData kelas={kelas} kelamin={kelamin} sudahLulus={sudahLulus} onSelesai={onSelesai} />;
  }
  if (adalahMtk4Bab1(kelas, mapel, materi)) {
    return <PanelSimulasiCacah10000 kelas={kelas} kelamin={kelamin} sudahLulus={sudahLulus} onSelesai={onSelesai} />;
  }
  if (adalahMtk4Bab2(kelas, mapel, materi)) {
    return <PanelSimulasiMtk4Pecahan />;
  }
  if (adalahMtk4Bab3(kelas, mapel, materi)) {
    return <PanelSimulasiMtk4Pola kelas={kelas} kelamin={kelamin} sudahLulus={sudahLulus} onSelesai={onSelesai} />;
  }
  if (adalahMtk4Bab4(kelas, mapel, materi)) {
    return <PanelSimulasiMtk4Ukur kelas={kelas} kelamin={kelamin} sudahLulus={sudahLulus} onSelesai={onSelesai} />;
  }
  if (adalahMtk5Bab8(kelas, mapel, materi)) {
    return (
      <SimulasiMtk5Bab8
        onBenar={() => {
          if (sudahLulus) return;
          onSelesai?.(true, "Lab tiga diagram panen biji selesai.");
        }}
      />
    );
  }
  return (
    <p className="text-sm font-semibold text-[#1C01A5]">
      Lab simulasi bab ini masih disusun di IGIL.
    </p>
  );
}
