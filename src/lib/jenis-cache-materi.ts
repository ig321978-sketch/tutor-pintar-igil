export type IsiCacheMateri = {
  curriculum_view: string;
  global_best_view: string;
  sketsaKartu: string;
  svgCode: string;
  pertanyaan: string;
  kunciJawaban: string;
  motivasi: string;
  referensiUrl?: string;
};

export type RingkasCacheMateri = {
  kunci: string;
  topicId: string;
  kelas: string;
  mapel: string;
  materi: string;
  modelSumber: string;
  isDraft: boolean;
  isLocked: boolean;
  audioSiap: boolean;
  updatedAt: string;
  adaCacheMateri: boolean;
  jumlahLatihan: number;
};

export type DetailCacheMateri = RingkasCacheMateri & IsiCacheMateri;

export function pecahKunciMateri(kunci: string): {
  kelas: string;
  mapel: string;
  materi: string;
} | null {
  const bagian = kunci.split("|").map((nilai) => nilai.trim()).filter(Boolean);
  if (bagian.length < 3) return null;
  const materi =
    bagian.length >= 4 ? bagian.slice(2, -1).join("|") : bagian[2];
  if (!materi) return null;
  return { kelas: bagian[0], mapel: bagian[1], materi };
}
