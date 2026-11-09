import type { MateriBab, PaketBab } from "@/components/IgilModulePlayer";
import materi from "@/data/kelas3-bab4.json";
import { PETA_PIKIRAN_K3B4A } from "./kit-k3b4";
import { VideoK3B4A } from "./video-k3b4a";
import { AbstractK3B4A, ConcreteK3B4A, InfografisK3B4AKomponen, PictureK3B4A } from "./SubBabK3B4A";

/** Paket Matematika Kelas 3 Bab 4 (Unsur-Unsur Bangun Datar): data JSON dan komponen tahap tiap sub-bab. Dimuat malas. */
const paket: PaketBab = {
  materi: materi as unknown as MateriBab,
  sub: {
    A: { Cerita: VideoK3B4A, peta: PETA_PIKIRAN_K3B4A, Infografis: InfografisK3B4AKomponen, Concrete: ConcreteK3B4A, Picture: PictureK3B4A, Abstract: AbstractK3B4A, uraianPeta: true },
  },
  emoji: {
    A: { emoji: "📐" },
  },
};

export default paket;
