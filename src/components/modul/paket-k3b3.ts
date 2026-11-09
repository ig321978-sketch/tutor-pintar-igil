import type { MateriBab, PaketBab } from "@/components/IgilModulePlayer";
import materi from "@/data/kelas3-bab3.json";
import { PETA_PIKIRAN_K3B3A, PETA_PIKIRAN_K3B3B } from "./kit-k3b3";
import { VideoK3B3A } from "./video-k3b3a";
import { VideoK3B3B } from "./video-k3b3b";
import { AbstractK3B3A, ConcreteK3B3A, InfografisK3B3AKomponen, PictureK3B3A } from "./SubBabK3B3A";
import { AbstractK3B3B, ConcreteK3B3B, InfografisK3B3BKomponen, PictureK3B3B } from "./SubBabK3B3B";

/** Paket Matematika Kelas 3 Bab 3 (Pengukuran Panjang dan Berat): data JSON dan komponen tahap tiap sub-bab. Dimuat malas. */
const paket: PaketBab = {
  materi: materi as unknown as MateriBab,
  sub: {
    A: { Cerita: VideoK3B3A, peta: PETA_PIKIRAN_K3B3A, Infografis: InfografisK3B3AKomponen, Concrete: ConcreteK3B3A, Picture: PictureK3B3A, Abstract: AbstractK3B3A, uraianPeta: true },
    B: { Cerita: VideoK3B3B, peta: PETA_PIKIRAN_K3B3B, Infografis: InfografisK3B3BKomponen, Concrete: ConcreteK3B3B, Picture: PictureK3B3B, Abstract: AbstractK3B3B, uraianPeta: true },
  },
  emoji: {
    A: { emoji: "📏" },
    B: { emoji: "📐" },
  },
};

export default paket;
