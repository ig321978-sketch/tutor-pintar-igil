import type { AdeganStory, Obj } from "../logika-story";
import { W, bersih, emo, kartuAngka, kotak, tambah, teks } from "./dasar";

/**
 * Adegan sapaan pendek untuk Story Opsi 2 (semua kelas): kalimat paling banyak delapan kata dan teks layar yang sama dengan suara.
 * Tidak mengubah sapaan.ts (milik Modul Kesatu dan Opsi 1).
 */
export type OpsiSapaanPendek = {
  /** Id adegan; bawaan "sapaan". */
  id?: string;
  jenis: "materi" | "metode-luar";
  /** Topik dalam bahasa lisan, tanpa angka, paling banyak tiga kata setelah "Hari ini kita belajar" (mis. "bilangan nol sampai sepuluh"). */
  topik: string;
  /** Hanya video materi: tiga hal yang akan dipelajari, satu kata tiap butir (mis. "menghitung"). */
  daftar?: string[];
  /** Hanya bila topik memuat bilangan: lambang yang ditampilkan di samping kalimat topik (mis. ["0", "10"]). */
  lambang?: [string, string];
};

const WARNA = ["#DBEAFE", "#DCFCE7", "#FEF9C3"];
const gabung = (butir: string[]): string => (butir.length <= 1 ? (butir[0] ?? "") : `${butir.slice(0, -1).join(", ")}, dan ${butir[butir.length - 1]}`);
const huruf1 = (s: string): string => s.charAt(0).toUpperCase() + s.slice(1);
const kartuTeks = (id: string, x: number, y: number, w: number, h: number, warna: string, isi: string, u: number): Obj[] => [kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 8 }), teks(`${id}-t`, x + w / 2, y + h / 2 + u * 0.35, isi, u)];

export function adeganSapaanPendek(o: OpsiSapaanPendek): AdeganStory {
  const materi = o.jenis === "materi";
  const butir = o.daftar ?? [];
  const s1 = "Halo, selamat datang di pelajaran matematika.";
  const s2 = materi ? `Hari ini kita belajar ${o.topik}.` : "Di video ini ada cara lain belajar.";
  const s3 = materi ? `Nanti kita belajar ${gabung(butir.map((b) => b.toLowerCase()))}.` : "Kita lihat caranya.";
  const s4 = "Siap? Ayo kita mulai.";
  const lambang = o.lambang;
  const ketukan = [
    { suara: s1, aksi: [tambah(0, teks("sp-j", 150, 24, "Halo!", 14, W.ungu), emo("sp-e", 150, 104, "\u{1F44B}", 54), kotak("sp-b", 40, 140, 220, 30, W.krem, W.biru, { rx: 10 }))] },
    {
      suara: s2,
      aksi: [
        bersih(0),
        tambah(0, emo("sp-e2", 150, 76, materi ? "\u{1F522}" : "\u{1F50E}", 44), ...kartuTeks("sp-c", 14, 112, 272, 44, WARNA[1], s2, 9.4)),
        ...(materi && lambang ? [tambah(0, ...kartuAngka("sp-n0", 30, 30, lambang[0], W.krem, 56, 40, 24), emo("sp-ar", 150, 58, "\u{27A1}", 26), ...kartuAngka("sp-n1", 214, 30, lambang[1], W.krem, 56, 40, 24))] : []),
      ],
    },
    {
      suara: s3,
      aksi: [
        bersih(0),
        tambah(0, emo("sp-e3", 150, 24, materi ? "\u{270F}" : "\u{1F440}", 28)),
        ...(materi
          ? butir.slice(0, 3).map((b, i) => tambah(0, ...kartuTeks(`sp-l${i}`, 14, 40 + i * 44, 272, 36, WARNA[i % 3], huruf1(b), 11)))
          : [tambah(0, ...kartuTeks("sp-l", 14, 60, 272, 48, WARNA[2], "Kita lihat caranya.", 11))]),
      ],
    },
    { suara: s4, aksi: [bersih(0), tambah(0, emo("sp-e4", 150, 84, materi ? "\u{1F4AA}" : "\u{1F680}", 52), ...kartuTeks("sp-m", 60, 130, 180, 36, WARNA[0], "Ayo kita mulai!", 12))] },
  ];
  return { id: o.id ?? "sapaan", judul: "Sapaan dan tujuan video", sumber: materi ? "Materi: sapaan" : "Metode luar: sapaan", latar: "#FFF7ED", ketukan };
}
