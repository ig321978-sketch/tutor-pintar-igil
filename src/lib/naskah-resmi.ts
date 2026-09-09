import type { IsiCacheMateri } from "@/lib/cache-materi-tutor";
import { kelasSatuSd } from "@/lib/infografis-kelas1";
import { kunciMapelTutor, rapikanKunci } from "@/lib/kunci-siswa";
import { naskahPai1Bab1 } from "@/lib/naskah-resmi-pai-1-bab1";

function normJudul(nilai: string): string {
  return rapikanKunci(nilai).replace(/[’‘ʻ`´]/g, "'");
}

export function adalahPai1Bab1(
  kelas: string,
  mapel: string,
  materi: string,
): boolean {
  if (!kelasSatuSd(kelas)) return false;
  const mapelR = kunciMapelTutor(mapel);
  const agamaIslam =
    mapelR.includes("agama islam") ||
    mapelR === "pendidikan agama dan budi pekerti" ||
    mapelR === "pai";
  if (!agamaIslam) return false;
  return /cinta\s+al[-\s]?qur'?an/.test(normJudul(materi));
}

export function naskahResmiJikaAda(
  kelas: string,
  mapel: string,
  materi: string,
): IsiCacheMateri | null {
  if (adalahPai1Bab1(kelas, mapel, materi)) return naskahPai1Bab1();
  return null;
}

export function naskahBab1Utuh(teks?: string): boolean {
  const naskah = teks ?? "";
  return (
    naskah.includes("ء") &&
    naskah.includes("ي") &&
    naskah.includes("بِسْمِ اللَّهِ") &&
    naskah.includes("INFOGRAFIS") &&
    /29/.test(naskah)
  );
}
