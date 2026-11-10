import type { MateriBab, PaketBab } from "@/components/IgilModulePlayer";
import materi from "@/data/kelas6-bab4.json";
import { PETA_PIKIRAN_K6B4A, PETA_PIKIRAN_K6B4B } from "./kit-k6b4";
import { VideoK6B4A } from "./video-k6b4a";
import { VideoK6B4B } from "./video-k6b4b";
import { AbstractK6B4A, ConcreteK6B4A, InfografisK6B4AKomponen, PictureK6B4A } from "./SubBabK6B4A";
import { AbstractK6B4B, ConcreteK6B4B, InfografisK6B4BKomponen, PictureK6B4B } from "./SubBabK6B4B";

const paket: PaketBab = {
  materi: materi as unknown as MateriBab,
  sub: {
    A: { Cerita: VideoK6B4A, peta: PETA_PIKIRAN_K6B4A, Infografis: InfografisK6B4AKomponen, Concrete: ConcreteK6B4A, Picture: PictureK6B4A, Abstract: AbstractK6B4A, uraianPeta: true },
    B: { Cerita: VideoK6B4B, peta: PETA_PIKIRAN_K6B4B, Infografis: InfografisK6B4BKomponen, Concrete: ConcreteK6B4B, Picture: PictureK6B4B, Abstract: AbstractK6B4B, uraianPeta: true },
  },
  emoji: { A: { emoji: "📶" }, B: { emoji: "⚖️" } },
};
export default paket;
