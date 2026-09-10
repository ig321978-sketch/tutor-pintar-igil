"use client";

import SoalRekamSuara, {
  normalisasiUcapan,
  ucapanMemuatAlias,
} from "@/components/SoalRekamSuara";
import { HIJAIYAH_30 } from "@/lib/paket-lengkap-materi";

type SoalHijaiyah = {
  id: string;
  pertanyaan: string;
  dari: number;
  sampai: number;
};

const SOAL: SoalHijaiyah[] = [
  {
    id: "1-10",
    pertanyaan: "1. Sebutkan huruf hijaiyah ke-1 hingga ke-10:",
    dari: 0,
    sampai: 10,
  },
  {
    id: "11-20",
    pertanyaan: "2. Sebutkan huruf hijaiyah ke 11 hingga ke 20:",
    dari: 10,
    sampai: 20,
  },
  {
    id: "21-30",
    pertanyaan: "3. Sebutkan huruf hijaiyah ke 21 hingga ke 30:",
    dari: 20,
    sampai: 30,
  },
];

const ALIAS: Record<string, string[]> = {
  Alif: ["alif", "alef", "alifah"],
  Ba: ["ba", "baa", "be"],
  Ta: ["ta", "taa", "te"],
  Tsa: ["tsa", "tsaa", "sa", "tha", "sa'"],
  Jim: ["jim", "jeem", "jim"],
  Ha: ["ha", "haa", "ha'"],
  Kha: ["kha", "kho", "khaa", "kho'"],
  Dal: ["dal", "daal"],
  Dzal: ["dzal", "zal", "dzaal", "zhal"],
  Ra: ["ra", "raa", "ro"],
  Zai: ["zai", "za", "zay", "zai"],
  Sin: ["sin", "siin"],
  Syin: ["syin", "shin", "syiin", "sin syamsi"],
  Shad: ["shad", "sad", "shod", "sod"],
  Dhad: ["dhad", "dhod", "dad", "dod"],
  Tha: ["tha", "tho", "taa"],
  Zha: ["zha", "zho", "dho"],
  Ain: ["ain", "'ain", "a'in"],
  Ghain: ["ghain", "gain", "ghoin"],
  Fa: ["fa", "faa"],
  Qaf: ["qaf", "qof", "kaf qaf"],
  Kaf: ["kaf", "kof"],
  Lam: ["lam"],
  Mim: ["mim", "miim"],
  Nun: ["nun"],
  Wau: ["wau", "waw", "wauw"],
  "Lam-Alif": ["lam alif", "lamalif", "lam-alif", "laam alif"],
  Hamzah: ["hamzah", "hamza", "hamzah"],
  Ya: ["ya", "yaa", "ye"],
};

function jawabanBenar(transkrip: string, dari: number, sampai: number): boolean {
  const ucapan = normalisasiUcapan(transkrip);
  if (!ucapan) return false;
  const target = HIJAIYAH_30.slice(dari, sampai);
  let ketemu = 0;
  for (const huruf of target) {
    const daftar = ALIAS[huruf.nama] ?? [huruf.nama.toLowerCase()];
    const lambang = huruf.lambang ? normalisasiUcapan(huruf.lambang) : "";
    if (ucapanMemuatAlias(transkrip, daftar) || (lambang && ucapan.includes(lambang))) {
      ketemu += 1;
    }
  }
  return ketemu >= 8;
}

export default function LatihanSuaraHijaiyah() {
  return (
    <div className="mt-6 space-y-4 border-t-2 border-[#1C01A5]/10 pt-5">
      <p className="text-base font-extrabold leading-relaxed text-[#1C01A5]">
        Hafalkan semua ke 30 huruf hijaiyah, dan jawab pertanyaan ini:
      </p>
      {SOAL.map((soal) => (
        <SoalRekamSuara
          key={soal.id}
          pertanyaan={soal.pertanyaan}
          periksa={(transkrip) => jawabanBenar(transkrip, soal.dari, soal.sampai)}
          petunjuk="Ketuk Rekam suara, sebutkan hurufnya, lalu kirim jawaban."
        />
      ))}
    </div>
  );
}
