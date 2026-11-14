import type { AdeganStory, Obj } from "./logika-story";

/**
 * Adegan pembuka tiap video Story: guru menyapa siswa dan memberitahu apa yang akan dipelajari.
 * Dipakai bersama oleh video materi (daftar hal yang dipelajari) dan video metode luar (hanya pengumuman cara lain).
 */
export type OpsiSapaan = {
  /** Id adegan; bawaan "sapaan". */
  id?: string;
  jenis: "materi" | "metode-luar";
  /** Topik video dalam bahasa lisan, tanpa angka (mis. "pecahan senilai"). */
  topik: string;
  /** Hanya video materi: tiga hal yang akan dipelajari (teks pendek). */
  daftar?: string[];
};

const BIRU = "#1C01A5";
const UNGU = "#7C3AED";
const WARNA = ["#DBEAFE", "#DCFCE7", "#FEF9C3", "#FCE7F3"];

const teks = (id: string, x: number, y: number, isi: string, u: number, warna = BIRU): Obj => ({ id, t: "teks", x, y, isi, u, warna });
const kartu = (id: string, x: number, y: number, w: number, h: number, warna: string, isi: string, u: number): Obj[] => [
  { id: `${id}-k`, t: "kotak", x, y, w, h, warna, garis: BIRU, rx: 8, tebal: 1.5 },
  teks(`${id}-t`, x + w / 2, y + h / 2 + u * 0.35, isi, u),
];
const hurufKecil = (s: string): string => s.charAt(0).toLowerCase() + s.slice(1);
const kata = (s: string): number => s.split(/\s+/).filter(Boolean).length;
const gabung = (butir: string[]): string => (butir.length <= 1 ? (butir[0] ?? "") : `${butir.slice(0, -1).join(", ")}, dan ${butir[butir.length - 1]}`);

export function adeganSapaan(o: OpsiSapaan): AdeganStory {
  const materi = o.jenis === "materi";
  const butir = (o.daftar ?? []).map(hurufKecil);
  const suara1 = `Halo anak-anak, selamat datang di pelajaran matematika. Hari ini kita akan belajar ${o.topik}.`;
  const awal2 = materi ? "Nanti kita akan mempelajari " : "Di video ini kita akan melihat beberapa cara lain untuk belajar ";
  const suara2 = materi ? `${awal2}${gabung(butir)}.` : `${awal2}${o.topik}.`;
  const tambah = (at: number, ...objs: (Obj | Obj[])[]) => ({ at, tambah: objs.flat() });

  const aksi2 = materi
    ? butir.map((b, i) => {
        const awalan = i === butir.length - 1 && butir.length > 1 ? `${awal2}${butir.slice(0, i).join(", ")}, dan ` : `${awal2}${butir.slice(0, i).map((x) => `${x}, `).join("")}`;
        const dulu = kata(awalan);
        return tambah(dulu, ...kartu(`sp${i}`, 14, 40 + i * 44, 272, 36, WARNA[i % WARNA.length], (o.daftar ?? [])[i], 9.4));
      })
    : [tambah(0, ...kartu("spc", 14, 52, 272, 48, WARNA[0], "beberapa cara lain", 11), ...kartu("spd", 14, 112, 272, 48, WARNA[2], o.topik, 9.4))];

  return {
    id: o.id ?? "sapaan",
    judul: "Sapaan dan materi hari ini",
    sumber: materi ? "Materi: sapaan dan tujuan" : "Metode luar: sapaan dan tujuan",
    latar: "#FFF7ED",
    ketukan: [
      {
        suara: suara1,
        aksi: [
          tambah(0, teks("sp-jud", 150, 22, "Halo, anak-anak!", 13, UNGU), { id: "sp-emo", t: "teks", x: 150, y: 92, isi: "👋", u: 44, warna: BIRU }),
          tambah(kata("Halo anak-anak, selamat datang di pelajaran matematika. Hari ini kita akan belajar") - 1, ...kartu("spt", 14, 124, 272, 44, WARNA[1], o.topik, 10)),
        ],
      },
      { suara: suara2, aksi: [{ at: 0, bersih: true }, tambah(0, teks("sp-jud2", 150, 20, materi ? "Hari ini kita belajar" : "Cara lain untuk belajar", 11, UNGU)), ...aksi2] },
      {
        suara: "Siap? Ayo kita mulai belajar bersama.",
        aksi: [{ at: 0, bersih: true }, tambah(0, { id: "sp-emo3", t: "teks", x: 150, y: 96, isi: materi ? "✏️" : "🔎", u: 46, warna: BIRU }), tambah(1, teks("sp-jud3", 150, 140, materi ? "Ayo mulai!" : "Ayo kita lihat!", 15, UNGU))],
      },
    ],
  };
}
