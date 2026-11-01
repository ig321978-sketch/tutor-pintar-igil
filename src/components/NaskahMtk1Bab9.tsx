"use client";

import Bab9ContohKelas1Module from "@/components/modules/Bab9ContohKelas1Module";
import { useKepalaDompetSendiri } from "@/components/modul/KepalaDompetMateri";
import type { KelaminGuru } from "@/lib/guru";

export default function NaskahMtk1Bab9(_props: {
  kelas?: string;
  kelamin?: KelaminGuru;
}) {
  useKepalaDompetSendiri();
  return <Bab9ContohKelas1Module />;
}
