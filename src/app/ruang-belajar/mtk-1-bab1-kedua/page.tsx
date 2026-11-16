import PemutarSmiscpa from "@/components/modul-kedua/PemutarSmiscpa";
import data from "@/data/modul-kedua/k1b1.json";
import type { DataModul } from "@/lib/modul-kedua/tipe";

export default function HalamanMtk1Bab1Kedua() {
  return <PemutarSmiscpa data={data as unknown as DataModul} />;
}
