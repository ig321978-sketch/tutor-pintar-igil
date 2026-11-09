import type { MateriBab, PaketBab } from "@/components/IgilModulePlayer";
import materi from "@/data/kelas3-bab1.json";
import { PETA_PIKIRAN_K3B1A, PETA_PIKIRAN_K3B1B, PETA_PIKIRAN_K3B1C, PETA_PIKIRAN_K3B1D, PETA_PIKIRAN_K3B1E, PETA_PIKIRAN_K3B1F, PETA_PIKIRAN_K3B1G } from "./kit-k3b1";
import { VideoK3B1A } from "./video-k3b1a";
import { VideoK3B1B } from "./video-k3b1b";
import { VideoK3B1C } from "./video-k3b1c";
import { VideoK3B1D } from "./video-k3b1d";
import { VideoK3B1E } from "./video-k3b1e";
import { VideoK3B1F } from "./video-k3b1f";
import { VideoK3B1G } from "./video-k3b1g";
import { AbstractK3B1A, ConcreteK3B1A, InfografisK3B1AKomponen, PictureK3B1A } from "./SubBabK3B1A";
import { AbstractK3B1B, ConcreteK3B1B, InfografisK3B1BKomponen, PictureK3B1B } from "./SubBabK3B1B";
import { AbstractK3B1C, ConcreteK3B1C, InfografisK3B1CKomponen, PictureK3B1C } from "./SubBabK3B1C";
import { AbstractK3B1D, ConcreteK3B1D, InfografisK3B1DKomponen, PictureK3B1D } from "./SubBabK3B1D";
import { AbstractK3B1E, ConcreteK3B1E, InfografisK3B1EKomponen, PictureK3B1E } from "./SubBabK3B1E";
import { AbstractK3B1F, ConcreteK3B1F, InfografisK3B1FKomponen, PictureK3B1F } from "./SubBabK3B1F";
import { AbstractK3B1G, ConcreteK3B1G, InfografisK3B1GKomponen, PictureK3B1G } from "./SubBabK3B1G";

/** Paket Matematika Kelas 3 Bab 1 (Bilangan Cacah sampai 1.000): data JSON dan komponen tahap tiap sub-bab. Dimuat malas. */
const paket: PaketBab = {
  materi: materi as unknown as MateriBab,
  sub: {
    A: { Cerita: VideoK3B1A, peta: PETA_PIKIRAN_K3B1A, Infografis: InfografisK3B1AKomponen, Concrete: ConcreteK3B1A, Picture: PictureK3B1A, Abstract: AbstractK3B1A, uraianPeta: true },
    B: { Cerita: VideoK3B1B, peta: PETA_PIKIRAN_K3B1B, Infografis: InfografisK3B1BKomponen, Concrete: ConcreteK3B1B, Picture: PictureK3B1B, Abstract: AbstractK3B1B, uraianPeta: true },
    C: { Cerita: VideoK3B1C, peta: PETA_PIKIRAN_K3B1C, Infografis: InfografisK3B1CKomponen, Concrete: ConcreteK3B1C, Picture: PictureK3B1C, Abstract: AbstractK3B1C, uraianPeta: true },
    D: { Cerita: VideoK3B1D, peta: PETA_PIKIRAN_K3B1D, Infografis: InfografisK3B1DKomponen, Concrete: ConcreteK3B1D, Picture: PictureK3B1D, Abstract: AbstractK3B1D, uraianPeta: true },
    E: { Cerita: VideoK3B1E, peta: PETA_PIKIRAN_K3B1E, Infografis: InfografisK3B1EKomponen, Concrete: ConcreteK3B1E, Picture: PictureK3B1E, Abstract: AbstractK3B1E, uraianPeta: true },
    F: { Cerita: VideoK3B1F, peta: PETA_PIKIRAN_K3B1F, Infografis: InfografisK3B1FKomponen, Concrete: ConcreteK3B1F, Picture: PictureK3B1F, Abstract: AbstractK3B1F, uraianPeta: true },
    G: { Cerita: VideoK3B1G, peta: PETA_PIKIRAN_K3B1G, Infografis: InfografisK3B1GKomponen, Concrete: ConcreteK3B1G, Picture: PictureK3B1G, Abstract: AbstractK3B1G, uraianPeta: true },
  },
  emoji: {
    A: { emoji: "🔢" },
    B: { emoji: "📍" },
    C: { emoji: "⚖️" },
    D: { emoji: "➕" },
    E: { emoji: "➖" },
    F: { emoji: "✖️" },
    G: { emoji: "➗" },
  },
};

export default paket;
