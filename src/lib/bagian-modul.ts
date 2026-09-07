import { mapelPunyaSimulasi } from "@/lib/simulasi-global";

export type BagianModul =
  | "pilih"
  | "silabus"
  | "materi"
  | "simulasi"
  | "latihan"
  | "praktikum"
  | "ujian";

export type BagianIsi = Exclude<BagianModul, "pilih">;

export function daftarBagianModul(mapel: string): BagianIsi[] {
  const lab = mapelPunyaSimulasi(mapel);
  return lab
    ? ["silabus", "materi", "simulasi", "latihan", "praktikum", "ujian"]
    : ["silabus", "materi", "latihan", "ujian"];
}

export function butuhNaskahAi(bagian: BagianModul): boolean {
  return bagian === "latihan";
}

export function bagianWajibMateriTuntas(bagian: BagianModul): boolean {
  return (
    bagian === "simulasi" ||
    bagian === "latihan" ||
    bagian === "praktikum" ||
    bagian === "ujian"
  );
}

export type BagianNaskah = "kurikulum" | "global" | "latihan";
