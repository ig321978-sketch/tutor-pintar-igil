type AdeganCerita =
  | "garden-visit"
  | "picking-fruits"
  | "counting-table"
  | "empty-basket"
  | "comparing-scales"
  | "frog-river"
  | "number-tree"
  | "playground-play"
  | "playground-rides"
  | "playground-bikes"
  | "playground-toys";

const GAMBAR: Record<AdeganCerita, { src: string; alt: string }> = {
  "garden-visit": {
    src: "/doodle-mtk/mtk-1-bab1-story-kebun.jpg",
    alt: "Doodle berwarna kebun buah, dua anak, dan burung hantu",
  },
  "picking-fruits": {
    src: "/doodle-mtk/mtk-1-bab1-story-petik.jpg",
    alt: "Doodle berwarna anak memetik apel, jeruk, dan pisang",
  },
  "counting-table": {
    src: "/doodle-mtk/mtk-1-bab1-story-meja.jpg",
    alt: "Doodle berwarna buah di meja teras",
  },
  "empty-basket": {
    src: "/doodle-mtk/mtk-1-bab1-story-piring.jpg",
    alt: "Doodle berwarna piring kayu yang sudah kosong",
  },
  "comparing-scales": {
    src: "/doodle-mtk/mtk-1-bab1-story-banding.jpg",
    alt: "Doodle berwarna keranjang mangga dan stroberi",
  },
  "frog-river": {
    src: "/doodle-mtk/mtk-1-bab1-story-sungai.jpg",
    alt: "Doodle berwarna katak di batu sungai",
  },
  "number-tree": {
    src: "/doodle-mtk/mtk-1-bab1-story-pasangan.jpg",
    alt: "Doodle berwarna jambu yang terbagi dua kelompok",
  },
  "playground-play": {
    src: "/doodle-mtk/mtk-1-bab1-story-taman.jpg",
    alt: "Doodle berwarna Malosi dan teman-teman bermain di taman",
  },
  "playground-rides": {
    src: "/doodle-mtk/mtk-1-bab1-story-alat.jpg",
    alt: "Doodle berwarna jungkat-jungkit, ayunan, dan perosotan",
  },
  "playground-bikes": {
    src: "/doodle-mtk/mtk-1-bab1-story-sepeda.jpg",
    alt: "Doodle berwarna sepeda dan kursi di taman",
  },
  "playground-toys": {
    src: "/doodle-mtk/mtk-1-bab1-story-benda.jpg",
    alt: "Doodle berwarna buku, layang-layang, balon, kelereng, dan bola",
  },
};

export default function GambarPensilCerita({
  sceneType,
}: {
  sceneType: AdeganCerita;
}) {
  const gambar = GAMBAR[sceneType];
  return (
    <div className="aspect-video w-full overflow-hidden rounded-2xl border-2 border-[#334155]/30 shadow-inner">
      <img src={gambar.src} alt={gambar.alt} className="h-full w-full object-cover" />
    </div>
  );
}
