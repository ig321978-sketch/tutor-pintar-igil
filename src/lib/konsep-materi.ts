import { pecahTokenNaskah } from "@/lib/tts";

export type KartuKonsep = {
  judul: string;
  isi: string;
  warna: string;
};

const WARNA_KARTU = [
  "bg-[#FFF4CC] border-[#F0AB00]",
  "bg-[#E8E4FF] border-[#1C01A5]/40",
  "bg-[#DDF7E8] border-emerald-400",
  "bg-[#FFE4EC] border-rose-300",
];

function potongKalimat(teks: string, batas = 2): string {
  const bagian = teks
    .split(/(?<=[.!?…])\s+/)
    .map((item) => item.trim())
    .filter(Boolean);
  return bagian.slice(0, batas).join(" ");
}

function judulDariTeks(teks: string): string {
  const baris = teks.split("\n").map((item) => item.trim()).filter(Boolean);
  const calon = baris[0] || teks;
  const tanpaNomor = calon.replace(/^\d+[.)]\s*/, "");
  const potong = tanpaNomor.split(/[.!?…:]/, 1)[0]?.trim() ?? "Ide penting";
  const kata = potong.split(/\s+/).slice(0, 6).join(" ");
  return kata.length > 2 ? kata : "Ide penting";
}

function pecahSumber(penjelasan: string): string[] {
  const paragraf = penjelasan
    .split(/\n\n+/)
    .map((item) => item.trim())
    .filter(Boolean);
  if (paragraf.length >= 3) return paragraf.slice(0, 4);

  const kalimat = penjelasan
    .split(/(?<=[.!?…])\s+/)
    .map((item) => item.trim())
    .filter(Boolean);
  if (kalimat.length >= 3) {
    const kelompok = Math.min(4, kalimat.length);
    const ukuran = Math.ceil(kalimat.length / kelompok);
    const hasil: string[] = [];
    for (let i = 0; i < kalimat.length && hasil.length < 4; i += ukuran) {
      hasil.push(kalimat.slice(i, i + ukuran).join(" "));
    }
    return hasil;
  }

  return paragraf.length > 0 ? paragraf : [penjelasan.trim()].filter(Boolean);
}

export function susunKonsepMateri(
  materi: string,
  penjelasan: string,
): { ideUtama: string; kartu: KartuKonsep[] } {
  const sumber = pecahSumber(penjelasan);
  const kartu = sumber.slice(0, 4).map((isi, indeks) => {
    const judul = judulDariTeks(isi);
    const sisa = isi.replace(judul, "").replace(/^[:.\-–]\s*/, "").trim();
    return {
      judul,
      isi: potongKalimat(sisa || isi, 2),
      warna: WARNA_KARTU[indeks % WARNA_KARTU.length],
    };
  });

  return {
    ideUtama: materi.trim() || "Materi hari ini",
    kartu,
  };
}

export function indeksKartuAktif(
  penjelasan: string,
  indeksKataPenjelasan: number,
): number {
  const paragraf = penjelasan
    .split(/\n\n+/)
    .map((item) => item.trim())
    .filter(Boolean);
  if (paragraf.length === 0 || indeksKataPenjelasan < 0) return 0;

  let offset = 0;
  for (let i = 0; i < paragraf.length; i += 1) {
    offset += pecahTokenNaskah(paragraf[i]).length;
    if (indeksKataPenjelasan < offset) return i;
  }
  return paragraf.length - 1;
}
