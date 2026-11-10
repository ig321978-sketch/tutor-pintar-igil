import type { MateriBab, PaketBab } from "@/components/IgilModulePlayer";
import materi from "@/data/kelas5-bab6.json";
import { PETA_PIKIRAN_K5B6A, PETA_PIKIRAN_K5B6B, PETA_PIKIRAN_K5B6C, PETA_PIKIRAN_K5B6D } from "./kit-k5b6";
import { VideoK5B6A } from "./video-k5b6a";
import { VideoK5B6B } from "./video-k5b6b";
import { VideoK5B6C } from "./video-k5b6c";
import { VideoK5B6D } from "./video-k5b6d";
import { AbstractK5B6A, ConcreteK5B6A, InfografisK5B6AKomponen, PictureK5B6A } from "./SubBabK5B6A";
import { AbstractK5B6B, ConcreteK5B6B, InfografisK5B6BKomponen, PictureK5B6B } from "./SubBabK5B6B";
import { AbstractK5B6C, ConcreteK5B6C, InfografisK5B6CKomponen, PictureK5B6C } from "./SubBabK5B6C";
import { AbstractK5B6D, ConcreteK5B6D, InfografisK5B6DKomponen, PictureK5B6D } from "./SubBabK5B6D";

const paket: PaketBab = {
  materi: materi as unknown as MateriBab,
  sub: {
    A: { Cerita: VideoK5B6A, peta: PETA_PIKIRAN_K5B6A, Infografis: InfografisK5B6AKomponen, Concrete: ConcreteK5B6A, Picture: PictureK5B6A, Abstract: AbstractK5B6A, uraianPeta: true },
    B: { Cerita: VideoK5B6B, peta: PETA_PIKIRAN_K5B6B, Infografis: InfografisK5B6BKomponen, Concrete: ConcreteK5B6B, Picture: PictureK5B6B, Abstract: AbstractK5B6B, uraianPeta: true },
    C: { Cerita: VideoK5B6C, peta: PETA_PIKIRAN_K5B6C, Infografis: InfografisK5B6CKomponen, Concrete: ConcreteK5B6C, Picture: PictureK5B6C, Abstract: AbstractK5B6C, uraianPeta: true },
    D: { Cerita: VideoK5B6D, peta: PETA_PIKIRAN_K5B6D, Infografis: InfografisK5B6DKomponen, Concrete: ConcreteK5B6D, Picture: PictureK5B6D, Abstract: AbstractK5B6D, uraianPeta: true },
  },
  emoji: { A: { emoji: "∟" }, B: { emoji: "∠" }, C: { emoji: "📐" }, D: { emoji: "✏️" } },
};
export default paket;
