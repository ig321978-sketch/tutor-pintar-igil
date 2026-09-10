"use client";

import SoalRekamSuara from "@/components/SoalRekamSuara";

function rapikanLatin(teks: string): string {
  return teks
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/[‘’ʻ`'´]/g, "")
    .replace(/[^a-z\u0600-\u06FF]+/g, "");
}

function ucapanMemuatCuplikan(transkrip: string, cuplikan: string[]): boolean {
  const padat = rapikanLatin(transkrip);
  if (!padat) return false;
  return cuplikan.some((item) => {
    const kunci = rapikanLatin(item);
    return kunci.length > 0 && padat.includes(kunci);
  });
}

const AYAT_KUNCI = [
  ["bismillah", "bismillaah", "بسم"],
  ["alhamdu", "hamdulillah", "الحمد"],
  ["maliki", "maaliki", "yaumiddin", "yaumid", "yawmiddin", "مالك"],
  ["iyyaka", "iyaka", "nabudu", "nastain", "nastaain", "إياك", "اياك"],
  ["ihdina", "mustaqim", "mustakim", "siratal", "shiratal", "shirotal", "اهدنا"],
  [
    "anamta",
    "maghdub",
    "magdub",
    "ghoiril",
    "ghairil",
    "dhallin",
    "dallin",
    "dholin",
    "dolin",
    "انعمت",
    "المغضوب",
    "الضال",
  ],
];

function fatihahLengkap(transkrip: string): boolean {
  const ketemu = AYAT_KUNCI.filter((cuplikan) =>
    ucapanMemuatCuplikan(transkrip, cuplikan),
  ).length;
  return ketemu >= 5;
}

export default function LatihanSuaraFatihah() {
  return (
    <div className="mt-6 space-y-4 border-t-2 border-[#1C01A5]/10 pt-5">
      <p className="text-base font-extrabold leading-relaxed text-[#1C01A5]">
        Quiz:
      </p>
      <SoalRekamSuara
        pertanyaan="Bacakan surat alfatihah secara lengkap!.."
        periksa={fatihahLengkap}
        petunjuk="Ketuk Rekam suara, bacakan surat Al-Fatihah lengkap, lalu kirim jawaban."
      />
    </div>
  );
}
