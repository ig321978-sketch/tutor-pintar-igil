import type { MateriBab, PaketBab } from "@/components/IgilModulePlayer";
import materi from "@/data/kelas5-bab5.json";
import { PETA_PIKIRAN_K5B5A, PETA_PIKIRAN_K5B5B, PETA_PIKIRAN_K5B5C, PETA_PIKIRAN_K5B5D } from "./kit-k5b5";
import { VideoK5B5A } from "./video-k5b5a";
import { VideoK5B5B } from "./video-k5b5b";
import { VideoK5B5C } from "./video-k5b5c";
import { VideoK5B5D } from "./video-k5b5d";
import { AbstractK5B5A, ConcreteK5B5A, InfografisK5B5AKomponen, PictureK5B5A } from "./SubBabK5B5A";
import { AbstractK5B5B, ConcreteK5B5B, InfografisK5B5BKomponen, PictureK5B5B } from "./SubBabK5B5B";
import { AbstractK5B5C, ConcreteK5B5C, InfografisK5B5CKomponen, PictureK5B5C } from "./SubBabK5B5C";
import { AbstractK5B5D, ConcreteK5B5D, InfografisK5B5DKomponen, PictureK5B5D } from "./SubBabK5B5D";

const paket: PaketBab = {
  materi: materi as unknown as MateriBab,
  sub: {
    A: { Cerita: VideoK5B5A, peta: PETA_PIKIRAN_K5B5A, Infografis: InfografisK5B5AKomponen, Concrete: ConcreteK5B5A, Picture: PictureK5B5A, Abstract: AbstractK5B5A, uraianPeta: true },
    B: { Cerita: VideoK5B5B, peta: PETA_PIKIRAN_K5B5B, Infografis: InfografisK5B5BKomponen, Concrete: ConcreteK5B5B, Picture: PictureK5B5B, Abstract: AbstractK5B5B, uraianPeta: true },
    C: { Cerita: VideoK5B5C, peta: PETA_PIKIRAN_K5B5C, Infografis: InfografisK5B5CKomponen, Concrete: ConcreteK5B5C, Picture: PictureK5B5C, Abstract: AbstractK5B5C, uraianPeta: true },
    D: { Cerita: VideoK5B5D, peta: PETA_PIKIRAN_K5B5D, Infografis: InfografisK5B5DKomponen, Concrete: ConcreteK5B5D, Picture: PictureK5B5D, Abstract: AbstractK5B5D, uraianPeta: true },
  },
  emoji: { A: { emoji: "🧩" }, B: { emoji: "🧮" }, C: { emoji: "🧱" }, D: { emoji: "⚖️" } },
};
export default paket;
