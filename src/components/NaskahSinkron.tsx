"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import GambarDoodle, { type GambarSisipan } from "@/components/GambarDoodle";
import { pecahTokenNaskah } from "@/lib/tts";

export default function NaskahSinkron({
  teksPenuh,
  indeksKata,
  sedangMemutar,
  gambarSisipan,
}: {
  teksPenuh: string;
  indeksKata: number;
  sedangMemutar: boolean;
  gambarSisipan: GambarSisipan[];
}) {
  const paragraf = teksPenuh.split("\n\n");
  const elemen: ReactNode[] = [];
  let offsetKata = 0;

  for (let i = 0; i < paragraf.length; i += 1) {
    const isi = paragraf[i];
    const token = pecahTokenNaskah(isi);
    const mulai = offsetKata;
    const akhir = mulai + token.length;
    offsetKata = akhir;

    elemen.push(
      <p key={`paragraf-${i}`} className="whitespace-pre-wrap leading-loose">
        {token.map((kata, j) => {
          const indeks = mulai + j;
          const aktif = indeks === indeksKata && sedangMemutar;
          const sudah = indeks < indeksKata || (!sedangMemutar && indeksKata >= 0);
          return (
            <motion.span
              key={`${i}-${j}-${kata}`}
              animate={{
                color: aktif ? "#1C01A5" : sudah ? "#334155" : "#94a3b8",
                backgroundColor: aktif ? "#F0AB00" : "rgba(0,0,0,0)",
              }}
              transition={{ duration: 0.12 }}
              className="mr-1 inline rounded-md px-0.5"
            >
              {kata}
            </motion.span>
          );
        })}
      </p>,
    );

    const sisipan = gambarSisipan.find((item) => item.setelahParagraf === i + 1);
    if (sisipan && sisipan.src && (akhir - 1 <= indeksKata || !sedangMemutar)) {
      elemen.push(
        <GambarDoodle
          key={`doodle-${i}`}
          src={sisipan.src}
          alt={sisipan.alt}
          ukuran={sisipan.ukuran}
        />,
      );
    }
  }

  return <div className="space-y-6">{elemen}</div>;
}
