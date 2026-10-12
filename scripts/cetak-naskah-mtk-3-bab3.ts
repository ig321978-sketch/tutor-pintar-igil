import { naskahResmiJikaAda } from "../src/lib/naskah-resmi";
import { JUDUL_MTK3_BAB3 } from "../src/lib/modul-resmi-mtk-3-bab3";

const KELAS = "3 SD";
const MAPEL = "Matematika";

const isi = naskahResmiJikaAda(KELAS, MAPEL, JUDUL_MTK3_BAB3);
if (!isi) throw new Error(`Naskah resmi tidak ketemu: ${JUDUL_MTK3_BAB3}`);

process.stdout.write(JSON.stringify([{ judul: JUDUL_MTK3_BAB3, isi }]));
