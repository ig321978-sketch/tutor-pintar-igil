import type { MateriBab, PaketBab } from "@/components/IgilModulePlayer";
import materi from "@/data/kelas5-bab9.json";
import { PETA_PIKIRAN_K5B9A, PETA_PIKIRAN_K5B9B, PETA_PIKIRAN_K5B9C } from "./kit-k5b9";
import { VideoK5B9A } from "./video-k5b9a";
import { VideoK5B9B } from "./video-k5b9b";
import { VideoK5B9C } from "./video-k5b9c";
import { AbstractK5B9A, ConcreteK5B9A, InfografisK5B9AKomponen, PictureK5B9A } from "./SubBabK5B9A";
import { AbstractK5B9B, ConcreteK5B9B, InfografisK5B9BKomponen, PictureK5B9B } from "./SubBabK5B9B";
import { AbstractK5B9C, ConcreteK5B9C, InfografisK5B9CKomponen, PictureK5B9C } from "./SubBabK5B9C";

const paket: PaketBab = {
  materi: materi as unknown as MateriBab,
  sub: {
    A: { Cerita: VideoK5B9A, peta: PETA_PIKIRAN_K5B9A, Infografis: InfografisK5B9AKomponen, Concrete: ConcreteK5B9A, Picture: PictureK5B9A, Abstract: AbstractK5B9A, uraianPeta: true },
    B: { Cerita: VideoK5B9B, peta: PETA_PIKIRAN_K5B9B, Infografis: InfografisK5B9BKomponen, Concrete: ConcreteK5B9B, Picture: PictureK5B9B, Abstract: AbstractK5B9B, uraianPeta: true },
    C: { Cerita: VideoK5B9C, peta: PETA_PIKIRAN_K5B9C, Infografis: InfografisK5B9CKomponen, Concrete: ConcreteK5B9C, Picture: PictureK5B9C, Abstract: AbstractK5B9C, uraianPeta: true },
  },
  emoji: { A: { emoji: "🔢" }, B: { emoji: "⚖️" }, C: { emoji: "🧩" } },
};
export default paket;
