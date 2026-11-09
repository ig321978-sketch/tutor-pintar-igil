import type { MateriBab, PaketBab } from "@/components/IgilModulePlayer";
import materi from "@/data/kelas3-bab4.json";
import { PETA_PIKIRAN_K3B4A, PETA_PIKIRAN_K3B4B, PETA_PIKIRAN_K3B4C } from "./kit-k3b4";
import { VideoK3B4A } from "./video-k3b4a";
import { VideoK3B4B } from "./video-k3b4b";
import { VideoK3B4C } from "./video-k3b4c";
import { AbstractK3B4A, ConcreteK3B4A, InfografisK3B4AKomponen, PictureK3B4A } from "./SubBabK3B4A";
import { AbstractK3B4B, ConcreteK3B4B, InfografisK3B4BKomponen, PictureK3B4B } from "./SubBabK3B4B";
import { AbstractK3B4C, ConcreteK3B4C, InfografisK3B4CKomponen, PictureK3B4C } from "./SubBabK3B4C";

/** Paket Matematika Kelas 3 Bab 4 (Unsur-Unsur Bangun Datar): data JSON dan komponen tahap tiap sub-bab. Dimuat malas. */
const paket: PaketBab = {
  materi: materi as unknown as MateriBab,
  sub: {
    A: { Cerita: VideoK3B4A, peta: PETA_PIKIRAN_K3B4A, Infografis: InfografisK3B4AKomponen, Concrete: ConcreteK3B4A, Picture: PictureK3B4A, Abstract: AbstractK3B4A, uraianPeta: true },
    B: { Cerita: VideoK3B4B, peta: PETA_PIKIRAN_K3B4B, Infografis: InfografisK3B4BKomponen, Concrete: ConcreteK3B4B, Picture: PictureK3B4B, Abstract: AbstractK3B4B, uraianPeta: true },
    C: { Cerita: VideoK3B4C, peta: PETA_PIKIRAN_K3B4C, Infografis: InfografisK3B4CKomponen, Concrete: ConcreteK3B4C, Picture: PictureK3B4C, Abstract: AbstractK3B4C, uraianPeta: true },
  },
  emoji: {
    A: { emoji: "📏" },
    B: { emoji: "📐" },
    C: { emoji: "🛤️" },
  },
};

export default paket;
