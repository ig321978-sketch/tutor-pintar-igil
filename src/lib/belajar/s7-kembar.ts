import { pengacak } from "./acak";
import { kataBilangan } from "./kata";
import type { Bentuk, PetaMiskonsepsi, Soal } from "./tipe";
import { buatCekDengan, huruf, periksa as periksaUmum, susunDari } from "./umum";

/** Skill k1b2-s7: penjumlahan berulang, dua bilangan yang sama (satu tambah satu sampai lima tambah lima). */
export const SKILL_S7 = "k1b2-s7";

export const MISKONSEPSI_S7: PetaMiskonsepsi = {
  "m-ambil-satu": { deskripsi: "Menjawab satu sisi saja.", pesan: "Sisi kiri dan kanan dihitung semuanya." },
  "m-hitung-dobel": { deskripsi: "Hasil terlalu besar.", pesan: "Tiap benda dihitung sekali saja." },
  "m-lewat-satu": { deskripsi: "Hasil terlalu kecil.", pesan: "Pelan-pelan. Jangan ada yang terlewat." },
};

/** a = b = banyak di tiap sisi, jawaban = dua kali a. */
export function buatSoal(bentuk: Bentuk, benih: number): Soal {
  const r = pengacak(benih);
  const a = r.int(1, 5);
  const c = 2 * a;
  const pilihan = susunDari(r, c, [
    [a, "m-ambil-satu"],
    [c + 1, "m-hitung-dobel"],
    [c - 1, "m-lewat-satu"],
    [c + 2, "m-hitung-dobel"],
  ]);
  const suara =
    bentuk === "benda"
      ? `Sayap kiri ${kataBilangan(a)} totol. Sayap kanan juga ${kataBilangan(a)}. Jadi berapa?`
      : bentuk === "diagram"
        ? `Titik merah ${kataBilangan(a)}. Titik biru juga ${kataBilangan(a)}. Jadi berapa?`
        : `${huruf(kataBilangan(a))} ditambah ${kataBilangan(a)} hasilnya berapa?`;
  return { skillId: SKILL_S7, bentuk, a, b: a, kunci: c, pilihan, tampil: bentuk === "lambang" ? "teks" : "kelompok", ikon: "🔴", kalimat: bentuk === "lambang" ? `${a} + ${a} = ?` : undefined, suara };
}

export const periksa = periksaUmum;

export function langkahContoh(a: number): string[] {
  return [
    `Sayap kiri ${kataBilangan(a)} totol.`,
    "Sayap kanan sama banyak.",
    "Dua bilangan yang sama ditambahkan.",
    `Hasilnya ${kataBilangan(2 * a)}.`,
  ];
}

export const buatCek = (benih: number): Soal[] => buatCekDengan(buatSoal, benih);
