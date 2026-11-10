import type { MateriBab, PaketBab } from "@/components/IgilModulePlayer";
import materi from "@/data/kelas4-bab1.json";
import { PETA_PIKIRAN_K4B1A, PETA_PIKIRAN_K4B1B, PETA_PIKIRAN_K4B1C, PETA_PIKIRAN_K4B1D, PETA_PIKIRAN_K4B1E, PETA_PIKIRAN_K4B1F } from "./kit-k4b1";
import { VideoK4B1A } from "./video-k4b1a";
import { VideoK4B1B } from "./video-k4b1b";
import { VideoK4B1C } from "./video-k4b1c";
import { VideoK4B1D } from "./video-k4b1d";
import { VideoK4B1E } from "./video-k4b1e";
import { VideoK4B1F } from "./video-k4b1f";
import { AbstractK4B1A, ConcreteK4B1A, InfografisK4B1AKomponen, PictureK4B1A } from "./SubBabK4B1A";
import { AbstractK4B1B, ConcreteK4B1B, InfografisK4B1BKomponen, PictureK4B1B } from "./SubBabK4B1B";
import { AbstractK4B1C, ConcreteK4B1C, InfografisK4B1CKomponen, PictureK4B1C } from "./SubBabK4B1C";
import { AbstractK4B1D, ConcreteK4B1D, InfografisK4B1DKomponen, PictureK4B1D } from "./SubBabK4B1D";
import { AbstractK4B1E, ConcreteK4B1E, InfografisK4B1EKomponen, PictureK4B1E } from "./SubBabK4B1E";
import { AbstractK4B1F, ConcreteK4B1F, InfografisK4B1FKomponen, PictureK4B1F } from "./SubBabK4B1F";

const paket: PaketBab = {
  materi: materi as unknown as MateriBab,
  sub: {
    A: { Cerita: VideoK4B1A, peta: PETA_PIKIRAN_K4B1A, Infografis: InfografisK4B1AKomponen, Concrete: ConcreteK4B1A, Picture: PictureK4B1A, Abstract: AbstractK4B1A, uraianPeta: true },
    B: { Cerita: VideoK4B1B, peta: PETA_PIKIRAN_K4B1B, Infografis: InfografisK4B1BKomponen, Concrete: ConcreteK4B1B, Picture: PictureK4B1B, Abstract: AbstractK4B1B, uraianPeta: true },
    C: { Cerita: VideoK4B1C, peta: PETA_PIKIRAN_K4B1C, Infografis: InfografisK4B1CKomponen, Concrete: ConcreteK4B1C, Picture: PictureK4B1C, Abstract: AbstractK4B1C, uraianPeta: true },
    D: { Cerita: VideoK4B1D, peta: PETA_PIKIRAN_K4B1D, Infografis: InfografisK4B1DKomponen, Concrete: ConcreteK4B1D, Picture: PictureK4B1D, Abstract: AbstractK4B1D, uraianPeta: true },
    E: { Cerita: VideoK4B1E, peta: PETA_PIKIRAN_K4B1E, Infografis: InfografisK4B1EKomponen, Concrete: ConcreteK4B1E, Picture: PictureK4B1E, Abstract: AbstractK4B1E, uraianPeta: true },
    F: { Cerita: VideoK4B1F, peta: PETA_PIKIRAN_K4B1F, Infografis: InfografisK4B1FKomponen, Concrete: ConcreteK4B1F, Picture: PictureK4B1F, Abstract: AbstractK4B1F, uraianPeta: true },
  },
  emoji: { A: { emoji: "🔢" }, B: { emoji: "📍" }, C: { emoji: "⚖️" }, D: { emoji: "🧩" }, E: { emoji: "➕" }, F: { emoji: "➖" } },
};
export default paket;
