import type { MateriBab, PaketBab } from "@/components/IgilModulePlayer";
import materi from "@/data/kelas5-bab4.json";
import { PETA_PIKIRAN_K5B4A, PETA_PIKIRAN_K5B4B, PETA_PIKIRAN_K5B4C, PETA_PIKIRAN_K5B4D, PETA_PIKIRAN_K5B4E } from "./kit-k5b4";
import { VideoK5B4A } from "./video-k5b4a";
import { VideoK5B4B } from "./video-k5b4b";
import { VideoK5B4C } from "./video-k5b4c";
import { VideoK5B4D } from "./video-k5b4d";
import { VideoK5B4E } from "./video-k5b4e";
import { AbstractK5B4A, ConcreteK5B4A, InfografisK5B4AKomponen, PictureK5B4A } from "./SubBabK5B4A";
import { AbstractK5B4B, ConcreteK5B4B, InfografisK5B4BKomponen, PictureK5B4B } from "./SubBabK5B4B";
import { AbstractK5B4C, ConcreteK5B4C, InfografisK5B4CKomponen, PictureK5B4C } from "./SubBabK5B4C";
import { AbstractK5B4D, ConcreteK5B4D, InfografisK5B4DKomponen, PictureK5B4D } from "./SubBabK5B4D";
import { AbstractK5B4E, ConcreteK5B4E, InfografisK5B4EKomponen, PictureK5B4E } from "./SubBabK5B4E";

const paket: PaketBab = {
  materi: materi as unknown as MateriBab,
  sub: {
    A: { Cerita: VideoK5B4A, peta: PETA_PIKIRAN_K5B4A, Infografis: InfografisK5B4AKomponen, Concrete: ConcreteK5B4A, Picture: PictureK5B4A, Abstract: AbstractK5B4A, uraianPeta: true },
    B: { Cerita: VideoK5B4B, peta: PETA_PIKIRAN_K5B4B, Infografis: InfografisK5B4BKomponen, Concrete: ConcreteK5B4B, Picture: PictureK5B4B, Abstract: AbstractK5B4B, uraianPeta: true },
    C: { Cerita: VideoK5B4C, peta: PETA_PIKIRAN_K5B4C, Infografis: InfografisK5B4CKomponen, Concrete: ConcreteK5B4C, Picture: PictureK5B4C, Abstract: AbstractK5B4C, uraianPeta: true },
    D: { Cerita: VideoK5B4D, peta: PETA_PIKIRAN_K5B4D, Infografis: InfografisK5B4DKomponen, Concrete: ConcreteK5B4D, Picture: PictureK5B4D, Abstract: AbstractK5B4D, uraianPeta: true },
    E: { Cerita: VideoK5B4E, peta: PETA_PIKIRAN_K5B4E, Infografis: InfografisK5B4EKomponen, Concrete: ConcreteK5B4E, Picture: PictureK5B4E, Abstract: AbstractK5B4E, uraianPeta: true },
  },
  emoji: { A: { emoji: "⭕" }, B: { emoji: "🔺" }, C: { emoji: "▭" }, D: { emoji: "⬡" }, E: { emoji: "🏠" } },
};
export default paket;
