import type { MateriBab, PaketBab } from "@/components/IgilModulePlayer";
import materi from "@/data/kelas5-bab7.json";
import { PETA_PIKIRAN_K5B7A, PETA_PIKIRAN_K5B7B } from "./kit-k5b7";
import { VideoK5B7A } from "./video-k5b7a";
import { VideoK5B7B } from "./video-k5b7b";
import { AbstractK5B7A, ConcreteK5B7A, InfografisK5B7AKomponen, PictureK5B7A } from "./SubBabK5B7A";
import { AbstractK5B7B, ConcreteK5B7B, InfografisK5B7BKomponen, PictureK5B7B } from "./SubBabK5B7B";

const paket: PaketBab = {
  materi: materi as unknown as MateriBab,
  sub: {
    A: { Cerita: VideoK5B7A, peta: PETA_PIKIRAN_K5B7A, Infografis: InfografisK5B7AKomponen, Concrete: ConcreteK5B7A, Picture: PictureK5B7A, Abstract: AbstractK5B7A, uraianPeta: true },
    B: { Cerita: VideoK5B7B, peta: PETA_PIKIRAN_K5B7B, Infografis: InfografisK5B7BKomponen, Concrete: ConcreteK5B7B, Picture: PictureK5B7B, Abstract: AbstractK5B7B, uraianPeta: true },
  },
  emoji: { A: { emoji: "△" }, B: { emoji: "⬜" } },
};
export default paket;
