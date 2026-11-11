import data from "@/data/komunitas-igil.json";

export type JenjangId = "sekolah" | "kecamatan" | "kabupaten" | "provinsi" | "nasional";
export type Sekolah = (typeof data.sekolah)[number];

export const komunitasData = data;

export const LABEL_JENJANG: Record<JenjangId, string> = {
  sekolah: "Ranking sekolah",
  kecamatan: "Ranking kecamatan",
  kabupaten: "Ranking kabupaten/kota",
  provinsi: "Ranking provinsi",
  nasional: "Ranking nasional",
};

export const WARNA_JENJANG: Record<JenjangId, string> = {
  sekolah: "bg-amber-400 text-indigo-950",
  kecamatan: "bg-emerald-100 text-emerald-900",
  kabupaten: "bg-sky-100 text-sky-900",
  provinsi: "bg-violet-100 text-violet-950",
  nasional: "bg-indigo-100 text-indigo-950",
};

export function cariSekolah(id: string): Sekolah | undefined {
  return data.sekolah.find((s) => s.id === id);
}

export function sisaKeAmbang(pelanggan: number, ambang: number): number {
  return Math.max(0, ambang - pelanggan);
}
