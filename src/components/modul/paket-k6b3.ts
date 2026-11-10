import type { MateriBab, PaketBab } from "@/components/IgilModulePlayer";
import materi from "@/data/kelas6-bab3.json";
import { PETA_PIKIRAN_K6B3A, PETA_PIKIRAN_K6B3B, PETA_PIKIRAN_K6B3C } from "./kit-k6b3";
import { VideoK6B3A } from "./video-k6b3a";
import { VideoK6B3B } from "./video-k6b3b";
import { VideoK6B3C } from "./video-k6b3c";
import { AbstractK6B3A, ConcreteK6B3A, InfografisK6B3AKomponen, PictureK6B3A } from "./SubBabK6B3A";
import { AbstractK6B3B, ConcreteK6B3B, InfografisK6B3BKomponen, PictureK6B3B } from "./SubBabK6B3B";
import { AbstractK6B3C, ConcreteK6B3C, InfografisK6B3CKomponen, PictureK6B3C } from "./SubBabK6B3C";

const paket: PaketBab = {
  materi: materi as unknown as MateriBab,
  sub: {
    A: { Cerita: VideoK6B3A, peta: PETA_PIKIRAN_K6B3A, Infografis: InfografisK6B3AKomponen, Concrete: ConcreteK6B3A, Picture: PictureK6B3A, Abstract: AbstractK6B3A, uraianPeta: true },
    B: { Cerita: VideoK6B3B, peta: PETA_PIKIRAN_K6B3B, Infografis: InfografisK6B3BKomponen, Concrete: ConcreteK6B3B, Picture: PictureK6B3B, Abstract: AbstractK6B3B, uraianPeta: true },
    C: { Cerita: VideoK6B3C, peta: PETA_PIKIRAN_K6B3C, Infografis: InfografisK6B3CKomponen, Concrete: ConcreteK6B3C, Picture: PictureK6B3C, Abstract: AbstractK6B3C, uraianPeta: true },
  },
  emoji: { A: { emoji: "🧊" }, B: { emoji: "👀" }, C: { emoji: "📍" } },
};
export default paket;
