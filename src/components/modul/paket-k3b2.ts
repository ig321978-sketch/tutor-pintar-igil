import type { MateriBab, PaketBab } from "@/components/IgilModulePlayer";
import materi from "@/data/kelas3-bab2.json";
import { PETA_PIKIRAN_K3B2A, PETA_PIKIRAN_K3B2B } from "./kit-k3b2";
import { VideoK3B2A } from "./video-k3b2a";
import { VideoK3B2B } from "./video-k3b2b";
import { AbstractK3B2A, AbstractK3B2B, ConcreteK3B2A, ConcreteK3B2B, InfografisK3B2AKomponen, InfografisK3B2BKomponen, PictureK3B2A, PictureK3B2B } from "./SubBabK3B2";

/** Paket Matematika Kelas 3 Bab 2 (Kalimat Matematika): data JSON dan komponen tahap tiap sub-bab. Dimuat malas. */
const paket: PaketBab = {
  materi: materi as unknown as MateriBab,
  sub: {
    A: { Cerita: VideoK3B2A, peta: PETA_PIKIRAN_K3B2A, Infografis: InfografisK3B2AKomponen, Concrete: ConcreteK3B2A, Picture: PictureK3B2A, Abstract: AbstractK3B2A, uraianPeta: true },
    B: { Cerita: VideoK3B2B, peta: PETA_PIKIRAN_K3B2B, Infografis: InfografisK3B2BKomponen, Concrete: ConcreteK3B2B, Picture: PictureK3B2B, Abstract: AbstractK3B2B, uraianPeta: true },
  },
  emoji: {
    A: { emoji: "➕" },
    B: { emoji: "➖" },
  },
};

export default paket;
