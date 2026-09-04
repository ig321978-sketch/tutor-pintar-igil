import { adalahBarisLatihan, adalahBarisRumus } from "@/lib/format-naskah";
import { jenjangGuru } from "@/lib/guru";
import { pecahTokenNaskah } from "@/lib/tts";

export type KartuKonsep = {
  judul: string;
  isi: string;
  naskah: string;
  warna: string;
};

export const JUMLAH_KARTU_MAKS = 10;
export const UKURAN_BATCH_DOODLE = 4;

export function kartuTanpaNaskah(kelas: string): boolean {
  return jenjangGuru(kelas) === "SD";
}

const WARNA_KARTU = [
  "bg-[#FFF4CC] border-[#F0AB00]",
  "bg-[#E8E4FF] border-[#1C01A5]/40",
  "bg-[#DDF7E8] border-emerald-400",
  "bg-[#FFE4EC] border-rose-300",
];

function potongKalimat(teks: string, batas = 1): string {
  const bagian = teks
    .split(/(?<=[.!?…])\s+/)
    .map((item) => item.trim())
    .filter(Boolean);
  return bagian.slice(0, batas).join(" ");
}

export function judulDariTeks(teks: string): string {
  const baris = teks.split("\n").map((item) => item.trim()).filter(Boolean);
  const calon = baris[0] || teks;
  const tanpaNomor = calon
    .replace(/^\d+[.)]\s*/, "")
    .replace(/^kartu\s*\d+\s*[:.\-–]\s*/i, "");
  const potong =
    tanpaNomor.split(/(?<!\d)[.!?…](?!\d)|:/, 1)[0]?.trim() ?? "Ide penting";
  const kata = potong.split(/\s+/).slice(0, 8).join(" ");
  return kata.length > 2 ? kata : "Ide penting";
}

function naskahDariTeks(teks: string, judul: string, ringkas: boolean): string {
  const baris = teks
    .split(/\n+/)
    .map((item) => item.trim())
    .filter(Boolean);
  const isi =
    baris[0] && judulDariTeks(baris[0]) === judul ? baris.slice(1) : baris;

  if (ringkas) {
    const rumus: string[] = [];
    for (const item of isi) {
      if (adalahBarisLatihan(item)) break;
      if (adalahBarisRumus(item)) rumus.push(item);
    }
    const visual =
      isi.find((item) => !adalahBarisRumus(item) && !adalahBarisLatihan(item)) ??
      potongKalimat(teks, 1);
    const kata = visual.split(/\s+/).slice(0, 18).join(" ");
    return [kata.length > 2 ? kata : judul, ...rumus].filter(Boolean).join("\n");
  }

  return isi.join("\n") || teks.trim();
}

export function pecahBlokKartu(penjelasan: string): string[] {
  const paragraf = penjelasan
    .split(/\n\n+/)
    .map((item) => item.trim())
    .filter(Boolean);

  const digabung: string[] = [];
  for (const item of paragraf) {
    const barisPertama = item.split("\n")[0]?.trim() ?? "";
    const sebelumnya = digabung[digabung.length - 1] ?? "";
    const lanjutanSoal =
      /\n(?:contoh|latihan|kunci)\b/i.test(`\n${sebelumnya}`) &&
      (adalahBarisLatihan(barisPertama) || adalahBarisRumus(barisPertama));
    if (
      digabung.length > 0 &&
      (adalahBarisLatihan(barisPertama) ||
        adalahBarisRumus(barisPertama) ||
        lanjutanSoal)
    ) {
      digabung[digabung.length - 1] += `\n${item}`;
      continue;
    }
    digabung.push(item);
  }

  if (digabung.length >= 3) return digabung.slice(0, JUMLAH_KARTU_MAKS);

  const kalimat = penjelasan
    .split(/\n+|(?<=[.!?…])\s+/)
    .map((item) => item.trim())
    .filter(Boolean);
  if (kalimat.length >= 3) {
    const kelompok = Math.min(JUMLAH_KARTU_MAKS, kalimat.length);
    const ukuran = Math.ceil(kalimat.length / kelompok);
    const hasil: string[] = [];
    for (let i = 0; i < kalimat.length && hasil.length < JUMLAH_KARTU_MAKS; i += ukuran) {
      const bagian = kalimat.slice(i, i + ukuran);
      hasil.push(
        bagian
          .map((item, indeks) => {
            if (indeks === 0) return item;
            return adalahBarisRumus(item) || adalahBarisRumus(bagian[indeks - 1] ?? "")
              ? `\n${item}`
              : ` ${item}`;
          })
          .join("")
          .trim(),
      );
    }
    return hasil;
  }

  return paragraf.length > 0 ? paragraf : [penjelasan.trim()].filter(Boolean);
}

export function susunKonsepMateri(
  materi: string,
  penjelasan: string,
  kelas = "3 SD",
): { ideUtama: string; kartu: KartuKonsep[] } {
  const ringkas = kartuTanpaNaskah(kelas);
  const sumber = pecahBlokKartu(penjelasan);
  const kartu = sumber.map((isi, indeks) => {
    const judul = judulDariTeks(isi);
    const naskah = naskahDariTeks(isi, judul, false);
    return {
      judul,
      isi: ringkas ? naskahDariTeks(isi, judul, true) : naskah,
      naskah,
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
  const paragraf = pecahBlokKartu(penjelasan);
  if (paragraf.length === 0 || indeksKataPenjelasan < 0) return 0;

  let offset = 0;
  for (let i = 0; i < paragraf.length; i += 1) {
    offset += pecahTokenNaskah(paragraf[i]).length;
    if (indeksKataPenjelasan < offset) return i;
  }
  return paragraf.length - 1;
}
