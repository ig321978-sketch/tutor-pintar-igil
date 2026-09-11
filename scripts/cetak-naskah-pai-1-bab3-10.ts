import { isiCacheDariModulResmi } from "../src/lib/modul-resmi-pai";
import { MODUL_PAI1_BAB3_10 } from "../src/lib/modul-resmi-pai-1-bab3-10";

process.stdout.write(
  JSON.stringify(
    MODUL_PAI1_BAB3_10.map((modul) => ({
      judul: modul.judul,
      isi: isiCacheDariModulResmi(modul),
    })),
  ),
);
