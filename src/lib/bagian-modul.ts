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

export function bagianWajibKuisMateriTuntas(bagian: BagianModul): boolean {
  return bagian === "latihan" || bagian === "ujian";
}

export function bagianWajibMateriTuntas(bagian: BagianModul): boolean {
  return bagianWajibKuisMateriTuntas(bagian);
}

export type BagianNaskah = "kurikulum" | "global" | "latihan";
