import type { MateriBab, PaketBab } from "@/components/IgilModulePlayer";
import materi from "@/data/kelas5-bab3.json";
import { PETA_PIKIRAN_K5B3A, PETA_PIKIRAN_K5B3B, PETA_PIKIRAN_K5B3C } from "./kit-k5b3";
import { VideoK5B3A } from "./video-k5b3a";
import { VideoK5B3B } from "./video-k5b3b";
import { VideoK5B3C } from "./video-k5b3c";
import { AbstractK5B3A, ConcreteK5B3A, InfografisK5B3AKomponen, PictureK5B3A } from "./SubBabK5B3A";
import { AbstractK5B3B, ConcreteK5B3B, InfografisK5B3BKomponen, PictureK5B3B } from "./SubBabK5B3B";
import { AbstractK5B3C, ConcreteK5B3C, InfografisK5B3CKomponen, PictureK5B3C } from "./SubBabK5B3C";

const paket: PaketBab = {
  materi: materi as unknown as MateriBab,
  sub: {
    A: { Cerita: VideoK5B3A, peta: PETA_PIKIRAN_K5B3A, Infografis: InfografisK5B3AKomponen, Concrete: ConcreteK5B3A, Picture: PictureK5B3A, Abstract: AbstractK5B3A, uraianPeta: true },
    B: { Cerita: VideoK5B3B, peta: PETA_PIKIRAN_K5B3B, Infografis: InfografisK5B3BKomponen, Concrete: ConcreteK5B3B, Picture: PictureK5B3B, Abstract: AbstractK5B3B, uraianPeta: true },
    C: { Cerita: VideoK5B3C, peta: PETA_PIKIRAN_K5B3C, Infografis: InfografisK5B3CKomponen, Concrete: ConcreteK5B3C, Picture: PictureK5B3C, Abstract: AbstractK5B3C, uraianPeta: true },
  },
  emoji: { A: { emoji: "⚖️" }, B: { emoji: "➕" }, C: { emoji: "➖" } },
};
export default paket;
