import type { MateriBab, PaketBab } from "@/components/IgilModulePlayer";
import materi from "@/data/kelas4-bab1.json";
import { PETA_PIKIRAN_K4B1A, PETA_PIKIRAN_K4B1B, PETA_PIKIRAN_K4B1C, PETA_PIKIRAN_K4B1D, PETA_PIKIRAN_K4B1E, PETA_PIKIRAN_K4B1F, PETA_PIKIRAN_K4B1G, PETA_PIKIRAN_K4B1H, PETA_PIKIRAN_K4B1I } from "./kit-k4b1";
import { VideoK4B1A } from "./video-k4b1a";
import { VideoK4B1B } from "./video-k4b1b";
import { VideoK4B1C } from "./video-k4b1c";
import { VideoK4B1D } from "./video-k4b1d";
import { VideoK4B1E } from "./video-k4b1e";
import { VideoK4B1F } from "./video-k4b1f";
import { VideoK4B1G } from "./video-k4b1g";
import { VideoK4B1H } from "./video-k4b1h";
import { VideoK4B1I } from "./video-k4b1i";
import { AbstractK4B1A, ConcreteK4B1A, InfografisK4B1AKomponen, PictureK4B1A } from "./SubBabK4B1A";
import { AbstractK4B1B, ConcreteK4B1B, InfografisK4B1BKomponen, PictureK4B1B } from "./SubBabK4B1B";
import { AbstractK4B1C, ConcreteK4B1C, InfografisK4B1CKomponen, PictureK4B1C } from "./SubBabK4B1C";
import { AbstractK4B1D, ConcreteK4B1D, InfografisK4B1DKomponen, PictureK4B1D } from "./SubBabK4B1D";
import { AbstractK4B1E, ConcreteK4B1E, InfografisK4B1EKomponen, PictureK4B1E } from "./SubBabK4B1E";
import { AbstractK4B1F, ConcreteK4B1F, InfografisK4B1FKomponen, PictureK4B1F } from "./SubBabK4B1F";
import { AbstractK4B1G, ConcreteK4B1G, InfografisK4B1GKomponen, PictureK4B1G } from "./SubBabK4B1G";
import { AbstractK4B1H, ConcreteK4B1H, InfografisK4B1HKomponen, PictureK4B1H } from "./SubBabK4B1H";
import { AbstractK4B1I, ConcreteK4B1I, InfografisK4B1IKomponen, PictureK4B1I } from "./SubBabK4B1I";

const paket: PaketBab = {
  materi: materi as unknown as MateriBab,
  sub: {
    A: { Cerita: VideoK4B1A, peta: PETA_PIKIRAN_K4B1A, Infografis: InfografisK4B1AKomponen, Concrete: ConcreteK4B1A, Picture: PictureK4B1A, Abstract: AbstractK4B1A, uraianPeta: true },
    B: { Cerita: VideoK4B1B, peta: PETA_PIKIRAN_K4B1B, Infografis: InfografisK4B1BKomponen, Concrete: ConcreteK4B1B, Picture: PictureK4B1B, Abstract: AbstractK4B1B, uraianPeta: true },
    C: { Cerita: VideoK4B1C, peta: PETA_PIKIRAN_K4B1C, Infografis: InfografisK4B1CKomponen, Concrete: ConcreteK4B1C, Picture: PictureK4B1C, Abstract: AbstractK4B1C, uraianPeta: true },
    D: { Cerita: VideoK4B1D, peta: PETA_PIKIRAN_K4B1D, Infografis: InfografisK4B1DKomponen, Concrete: ConcreteK4B1D, Picture: PictureK4B1D, Abstract: AbstractK4B1D, uraianPeta: true },
    E: { Cerita: VideoK4B1E, peta: PETA_PIKIRAN_K4B1E, Infografis: InfografisK4B1EKomponen, Concrete: ConcreteK4B1E, Picture: PictureK4B1E, Abstract: AbstractK4B1E, uraianPeta: true },
    F: { Cerita: VideoK4B1F, peta: PETA_PIKIRAN_K4B1F, Infografis: InfografisK4B1FKomponen, Concrete: ConcreteK4B1F, Picture: PictureK4B1F, Abstract: AbstractK4B1F, uraianPeta: true },
    G: { Cerita: VideoK4B1G, peta: PETA_PIKIRAN_K4B1G, Infografis: InfografisK4B1GKomponen, Concrete: ConcreteK4B1G, Picture: PictureK4B1G, Abstract: AbstractK4B1G, uraianPeta: true },
    H: { Cerita: VideoK4B1H, peta: PETA_PIKIRAN_K4B1H, Infografis: InfografisK4B1HKomponen, Concrete: ConcreteK4B1H, Picture: PictureK4B1H, Abstract: AbstractK4B1H, uraianPeta: true },
    I: { Cerita: VideoK4B1I, peta: PETA_PIKIRAN_K4B1I, Infografis: InfografisK4B1IKomponen, Concrete: ConcreteK4B1I, Picture: PictureK4B1I, Abstract: AbstractK4B1I, uraianPeta: true },
  },
  emoji: { A: { emoji: "🔢" }, B: { emoji: "📍" }, C: { emoji: "⚖️" }, D: { emoji: "🧩" }, E: { emoji: "➕" }, F: { emoji: "➖" }, G: { emoji: "✖️" }, H: { emoji: "➗" }, I: { emoji: "🔁" } },
};
export default paket;
