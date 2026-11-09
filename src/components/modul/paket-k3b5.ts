import type { MateriBab, PaketBab } from "@/components/IgilModulePlayer";
import materi from "@/data/kelas3-bab5.json";
import { PETA_PIKIRAN_K3B5A, PETA_PIKIRAN_K3B5B } from "./kit-k3b5";
import { VideoK3B5A } from "./video-k3b5a";
import { VideoK3B5B } from "./video-k3b5b";
import { AbstractK3B5A, ConcreteK3B5A, InfografisK3B5AKomponen, PictureK3B5A } from "./SubBabK3B5A";
import { AbstractK3B5B, ConcreteK3B5B, InfografisK3B5BKomponen, PictureK3B5B } from "./SubBabK3B5B";

/** Paket Matematika Kelas 3 Bab 5 (Penyajian Data dalam Tabel): data JSON dan komponen tahap tiap sub-bab. Dimuat malas. */
const paket: PaketBab = {
  materi: materi as unknown as MateriBab,
  sub: {
    A: { Cerita: VideoK3B5A, peta: PETA_PIKIRAN_K3B5A, Infografis: InfografisK3B5AKomponen, Concrete: ConcreteK3B5A, Picture: PictureK3B5A, Abstract: AbstractK3B5A, uraianPeta: true },
    B: { Cerita: VideoK3B5B, peta: PETA_PIKIRAN_K3B5B, Infografis: InfografisK3B5BKomponen, Concrete: ConcreteK3B5B, Picture: PictureK3B5B, Abstract: AbstractK3B5B, uraianPeta: true },
  },
  emoji: {
    A: { emoji: "📶" },
    B: { emoji: "📋" },
  },
};

export default paket;
