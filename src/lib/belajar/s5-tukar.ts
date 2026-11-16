import { pengacak } from "./acak";
import { kataBilangan } from "./kata";
import type { Bentuk, PetaMiskonsepsi, Soal } from "./tipe";
import { buatCekDengan, huruf, periksa as periksaUmum, susunPilihan } from "./umum";

/** Skill k1b2-s5: tukar tempat dua bilangan, hasil tetap sama (jumlah paling banyak sepuluh). */
export const SKILL_S5 = "k1b2-s5";

export const MISKONSEPSI_S5: PetaMiskonsepsi = {
  "m-ambil-satu": { deskripsi: "Menjawab satu bilangan saja.", pesan: "Dua bilangan tetap digabung semuanya." },
  "m-hitung-dobel": { deskripsi: "Hasil terlalu besar satu.", pesan: "Tiap benda dihitung sekali saja." },
  "m-lewat-satu": { deskripsi: "Hasil terlalu kecil satu.", pesan: "Pelan-pelan. Jangan ada yang terlewat." },
};

/** Kalimat awal: x + y = c. Pertanyaan: y + x = ?. Gambar mengikuti pertanyaan (a = y, b = x). */
export function buatSoal(bentuk: Bentuk, benih: number): Soal {
  const r = pengacak(benih);
  let x = r.int(1, 8);
  let y = r.int(1, 8);
  for (let i = 0; i < 100 && (x === y || x + y < 4 || x + y > 10); i += 1) {
    x = r.int(1, 8);
    y = r.int(1, 8);
  }
  const c = x + y;
  const pilihan = susunPilihan(r, x, y);
  const suara = `${huruf(kataBilangan(x))} ditambah ${kataBilangan(y)} hasilnya ${kataBilangan(c)}. ${huruf(kataBilangan(y))} ditambah ${kataBilangan(x)} hasilnya berapa?`;
  return {
    skillId: SKILL_S5,
    bentuk,
    a: y,
    b: x,
    kunci: c,
    pilihan,
    tampil: bentuk === "lambang" ? "teks" : "kelompok",
    kalimat: `${x} + ${y} = ${c}`,
    tanya: `${y} + ${x} = ?`,
    suara,
  };
}

export const periksa = periksaUmum;

export function langkahContoh(a: number, b: number): string[] {
  return [
    `${huruf(kataBilangan(a))} ditambah ${kataBilangan(b)} hasilnya ${kataBilangan(a + b)}.`,
    "Sekarang tukar tempatnya.",
    `${huruf(kataBilangan(b))} ditambah ${kataBilangan(a)}.`,
    `Hasilnya tetap ${kataBilangan(a + b)}.`,
  ];
}

export const buatCek = (benih: number): Soal[] => buatCekDengan(buatSoal, benih);
