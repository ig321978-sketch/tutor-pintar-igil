import type { MateriBab, PaketBab } from "@/components/IgilModulePlayer";
import materi from "@/data/kelas3-bab3.json";
import { PETA_PIKIRAN_K3B3A, PETA_PIKIRAN_K3B3B, PETA_PIKIRAN_K3B3C, PETA_PIKIRAN_K3B3D } from "./kit-k3b3";
import { VideoK3B3A } from "./video-k3b3a";
import { VideoK3B3B } from "./video-k3b3b";
import { VideoK3B3C } from "./video-k3b3c";
import { VideoK3B3D } from "./video-k3b3d";
import { AbstractK3B3A, ConcreteK3B3A, InfografisK3B3AKomponen, PictureK3B3A } from "./SubBabK3B3A";
import { AbstractK3B3B, ConcreteK3B3B, InfografisK3B3BKomponen, PictureK3B3B } from "./SubBabK3B3B";
import { AbstractK3B3C, ConcreteK3B3C, InfografisK3B3CKomponen, PictureK3B3C } from "./SubBabK3B3C";
import { AbstractK3B3D, ConcreteK3B3D, InfografisK3B3DKomponen, PictureK3B3D } from "./SubBabK3B3D";

/** Paket Matematika Kelas 3 Bab 3 (Pengukuran Panjang dan Berat), Sub-Bab A sampai D: data JSON dan komponen tahap tiap sub-bab. Dimuat malas. */
const paket: PaketBab = {
  materi: materi as unknown as MateriBab,
  sub: {
    A: { Cerita: VideoK3B3A, peta: PETA_PIKIRAN_K3B3A, Infografis: InfografisK3B3AKomponen, Concrete: ConcreteK3B3A, Picture: PictureK3B3A, Abstract: AbstractK3B3A, uraianPeta: true },
    B: { Cerita: VideoK3B3B, peta: PETA_PIKIRAN_K3B3B, Infografis: InfografisK3B3BKomponen, Concrete: ConcreteK3B3B, Picture: PictureK3B3B, Abstract: AbstractK3B3B, uraianPeta: true },
    C: { Cerita: VideoK3B3C, peta: PETA_PIKIRAN_K3B3C, Infografis: InfografisK3B3CKomponen, Concrete: ConcreteK3B3C, Picture: PictureK3B3C, Abstract: AbstractK3B3C, uraianPeta: true },
    D: { Cerita: VideoK3B3D, peta: PETA_PIKIRAN_K3B3D, Infografis: InfografisK3B3DKomponen, Concrete: ConcreteK3B3D, Picture: PictureK3B3D, Abstract: AbstractK3B3D, uraianPeta: true },
  },
  emoji: {
    A: { emoji: "📏" },
    B: { emoji: "📐" },
    C: { emoji: "⚖️" },
    D: { emoji: "🏋️" },
  },
};

export default paket;
