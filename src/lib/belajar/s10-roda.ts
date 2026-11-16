import { pengacak } from "./acak";
import { kataBilangan } from "./kata";
import type { Bentuk, PetaMiskonsepsi, Soal } from "./tipe";
import { buatCekDengan, huruf, periksa as periksaUmum, susunDari } from "./umum";

/** Skill k1b2-s10: soal cerita kendaraan dan roda (sepeda dua roda, becak tiga roda), jumlah roda paling banyak sepuluh. */
export const SKILL_S10 = "k1b2-s10";

export const MISKONSEPSI_S10: PetaMiskonsepsi = {
  "m-hitung-kendaraan": { deskripsi: "Menghitung kendaraan, bukan roda.", pesan: "Yang dihitung rodanya, bukan kendaraannya." },
  "m-ambil-satu": { deskripsi: "Hanya roda satu jenis kendaraan.", pesan: "Hitung roda semua jenis kendaraan." },
  "m-hitung-dobel": { deskripsi: "Hasil terlalu besar satu.", pesan: "Tiap roda dihitung sekali saja." },
  "m-lewat-satu": { deskripsi: "Hasil terlalu kecil satu.", pesan: "Pelan-pelan. Jangan ada roda yang terlewat." },
};

/** [sepeda, becak]; jumlah roda = 2 x sepeda + 3 x becak, paling banyak sepuluh. */
export const KOMBINASI: Array<[number, number]> = [
  [2, 0], [3, 0], [4, 0], [5, 0], [0, 2], [0, 3], [1, 1], [2, 1], [3, 1], [1, 2],
];

export const rodaDari = (x: number, y: number) => 2 * x + 3 * y;

/** a = banyak sepeda, b = banyak becak. */
export function buatSoal(bentuk: Bentuk, benih: number): Soal {
  const r = pengacak(benih);
  const [x, y] = KOMBINASI[r.int(0, KOMBINASI.length - 1)];
  const c = rodaDari(x, y);
  const pilihan = susunDari(r, c, [
    [x + y, "m-hitung-kendaraan"],
    [Math.max(2 * x, 3 * y), "m-ambil-satu"],
    [c + 1, "m-hitung-dobel"],
    [c - 1, "m-lewat-satu"],
  ]);
  const sebut =
    y === 0
      ? `${huruf(kataBilangan(x))} sepeda. Tiap sepeda dua roda.`
      : x === 0
        ? `${huruf(kataBilangan(y))} becak. Tiap becak tiga roda.`
        : `${huruf(kataBilangan(x))} sepeda dan ${kataBilangan(y)} becak. Sepeda dua roda, becak tiga roda.`;
  return {
    skillId: SKILL_S10,
    bentuk,
    a: x,
    b: y,
    kunci: c,
    pilihan,
    tampil: bentuk === "lambang" ? "teks" : "kelompok",
    ikon: "🚲",
    ikon2: "🛺",
    jumlahA: bentuk === "diagram" ? 2 * x : undefined,
    jumlahB: bentuk === "diagram" ? 3 * y : undefined,
    suara: `${sebut} Berapa roda semuanya?`,
  };
}

export const periksa = periksaUmum;

export function langkahContoh(x: number, y: number): string[] {
  return [
    `${huruf(kataBilangan(x))} sepeda, tiap sepeda dua roda.`,
    `${huruf(kataBilangan(y))} becak, tiap becak tiga roda.`,
    "Gabungkan semua roda.",
    `Hasilnya ${kataBilangan(rodaDari(x, y))} roda.`,
  ];
}

export const buatCek = (benih: number): Soal[] => buatCekDengan(buatSoal, benih);
