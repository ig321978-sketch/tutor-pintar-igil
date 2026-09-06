import { mapelPunyaSimulasi } from "@/lib/simulasi-global";

export type BagianModul =
  | "pilih"
  | "materi"
  | "simulasi"
  | "latihan"
  | "praktikum"
  | "ujian";

export type BagianIsi = Exclude<BagianModul, "pilih">;

export function daftarBagianModul(mapel: string): BagianIsi[] {
  const lab = mapelPunyaSimulasi(mapel);
  return lab
    ? ["materi", "simulasi", "latihan", "praktikum", "ujian"]
    : ["materi", "latihan", "ujian"];
}

export function butuhNaskahAi(bagian: BagianModul): boolean {
  return bagian === "materi" || bagian === "latihan" || bagian === "ujian";
}
