import type { MateriBab, PaketBab } from "@/components/IgilModulePlayer";
import materi from "@/data/kelas5-bab8.json";
import { PETA_PIKIRAN_K5B8A, PETA_PIKIRAN_K5B8B, PETA_PIKIRAN_K5B8C } from "./kit-k5b8";
import { VideoK5B8A } from "./video-k5b8a";
import { VideoK5B8B } from "./video-k5b8b";
import { VideoK5B8C } from "./video-k5b8c";
import { AbstractK5B8A, ConcreteK5B8A, InfografisK5B8AKomponen, PictureK5B8A } from "./SubBabK5B8A";
import { AbstractK5B8B, ConcreteK5B8B, InfografisK5B8BKomponen, PictureK5B8B } from "./SubBabK5B8B";
import { AbstractK5B8C, ConcreteK5B8C, InfografisK5B8CKomponen, PictureK5B8C } from "./SubBabK5B8C";

const paket: PaketBab = {
  materi: materi as unknown as MateriBab,
  sub: {
    A: { Cerita: VideoK5B8A, peta: PETA_PIKIRAN_K5B8A, Infografis: InfografisK5B8AKomponen, Concrete: ConcreteK5B8A, Picture: PictureK5B8A, Abstract: AbstractK5B8A, uraianPeta: true },
    B: { Cerita: VideoK5B8B, peta: PETA_PIKIRAN_K5B8B, Infografis: InfografisK5B8BKomponen, Concrete: ConcreteK5B8B, Picture: PictureK5B8B, Abstract: AbstractK5B8B, uraianPeta: true },
    C: { Cerita: VideoK5B8C, peta: PETA_PIKIRAN_K5B8C, Infografis: InfografisK5B8CKomponen, Concrete: ConcreteK5B8C, Picture: PictureK5B8C, Abstract: AbstractK5B8C, uraianPeta: true },
  },
  emoji: { A: { emoji: "📊" }, B: { emoji: "🖼️" }, C: { emoji: "▮" } },
};
export default paket;
