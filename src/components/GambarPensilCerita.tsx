type AdeganCerita =
  | "garden-visit"
  | "picking-fruits"
  | "counting-table"
  | "empty-basket"
  | "comparing-scales"
  | "frog-river"
  | "number-tree";

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
};

export default function GambarPensilCerita({
  sceneType,
}: {
  sceneType: AdeganCerita;
}) {
  const gambar = GAMBAR[sceneType];
  return (
    <img
      src={gambar.src}
      alt={gambar.alt}
      className="h-52 w-full rounded-2xl border-2 border-[#334155]/30 object-cover shadow-inner"
    />
  );
}
