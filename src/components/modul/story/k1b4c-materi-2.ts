import type { AdeganStory } from "./logika-story";
import { E, W, emo, geserLengkung, judul, kartu, kereta, kotak, orang, rumah, teks } from "./k1b4c-gambar";
import { hapus, idx, k, kalimatBertahap, redamkan, sorotkan, tambah, ubah } from "./k1b4c-bantu";

/* Lanjutan "Mainan untuk Festival": Kaka menyusun rumah, semua bahan terpakai, lalu Abang mengurai roda kereta dan memasangnya lagi. */

/* ------------------------------ 4. Menyusun rumah ------------------------------ */
const SUARA_R1 = "Kaka menyusun rumah. Satu segitiga menjadi atap rumah.";
const SUARA_R2 = "Dua segi empat menjadi dinding dan pintu. Pintunya segi empat yang lebih kecil.";
const SUARA_R3 = "Kaka menghitung: dua tambah satu sama dengan tiga. Rumah tersusun dari tiga bagian.";
const SUARA_R4 = "Semua bahan terpakai: empat lengkung, dua segitiga, dan lima segi empat dari gudang.";
export const RUMAH = rumah("r", 170, 40);

export const ADEGAN_SUSUN_RUMAH: AdeganStory = {
  id: "susun-rumah",
  judul: "Kaka menyusun rumah",
  sumber: "Materi: menyusun rumah",
  latar: "#FDF2F8",
  ketukan: [
    k(
      SUARA_R1,
      tambah(0, judul("Menyusun rumah"), ...orang("kk", 40, 90, E.kaka, "Kaka"), kotak("al", 110, 140, 120, 6, "#B45309", W.coklat, { rx: 2, z: -2 })),
      tambah(idx(SUARA_R1, "Satu"), ...RUMAH.atap, teks("n1", 262, 60, "1 segitiga", 10)),
      sorotkan("atap", "rt0"),
    ),
    k(
      SUARA_R2,
      redamkan(0, "rt0"),
      tambah(idx(SUARA_R2, "Dua"), teks("n2", 262, 110, "2 segi empat", 10)),
      tambah("dinding", ...RUMAH.dinding),
      tambah("pintu.", ...RUMAH.pintu),
      sorotkan("kecil.", "rs1"),
    ),
    k(
      SUARA_R3,
      redamkan(0, "rs1"),
      ...kalimatBertahap(SUARA_R3, "kr", 60, 168, ["2", "+", "1", "=", "3"], ["dua", "tambah", "satu", "sama", "tiga"], undefined, 16, 18),
      sorotkan(idx(SUARA_R3, "tiga", 2), "rt0", "rs0", "rs1"),
    ),
    k(
      SUARA_R4,
      redamkan(0, "rt0", "rs0", "rs1"),
      tambah("terpakai:", ...kartu("bh", 104, 154, 192, 42, W.hijauMuda, ["semua bahan terpakai", "4 lengkung, 2 segitiga, 5 segi empat"], 8.6)),
      tambah("gudang.", emo("ok", 286, 146, E.benar, 16)),
    ),
  ],
};

/* ------------------------------ 5. Mengurai roda kereta ------------------------------ */
const SUARA_U1 = "Lem roda kereta lepas, sebuah roda menggelinding sendiri ke bawah meja! Abang mengurai kereta dan melepas keempat rodanya.";
const SUARA_U2 = "Tadi ada delapan bagian. Delapan dikurangi empat sama dengan empat. Tersisa empat bagian di kereta.";
const SUARA_U3 = "Setelah lemnya kering, keempat roda dipasang lagi. Empat tambah empat sama dengan delapan.";
const SUARA_U4 = "Bagian dari mengurai sama dengan bagian saat menyusun: tiga segi empat, satu segitiga, empat lengkung.";
const KR = kereta("k", 52, 76);
const LEPAS = [30, 62, 94, 126].map((x) => ({ x, y: 176 }));
const RODA = ["kl0", "kl1", "kl2", "kl3"];

export const ADEGAN_URAI_RODA: AdeganStory = {
  id: "urai-roda",
  judul: "Mengurai roda kereta",
  sumber: "Materi: mengurai kereta",
  latar: "#ECFEFF",
  ketukan: [
    k(
      SUARA_U1,
      tambah(0, judul("Mengurai kereta"), ...orang("ab", 268, 64, E.abang, "Abang"), ...KR.badan, ...KR.bendera, ...KR.roda, teks("n8", 268, 100, "8 bagian", 10)),
      tambah("Lem", emo("lm", 262, 130, E.lem, 22)),
      ubah("melepas", ...RODA.flatMap((id, i) => geserLengkung(id, LEPAS[i].x, LEPAS[i].y))),
    ),
    k(
      SUARA_U2,
      ...kalimatBertahap(SUARA_U2, "ku", 224, 166, ["8", "−", "4", "=", "4"], ["delapan", "dikurangi", "empat", "sama", "empat"], "bagian.", 16, 18),
      tambah("Tersisa", teks("ts", 224, 190, "tersisa 4 bagian", 9)),
      sorotkan("Tersisa", "ks0", "ks1", "ks2", "kt0"),
    ),
    k(
      SUARA_U3,
      hapus(0, "ku0", "ku1", "ku2", "ku3", "ku4", "ts"),
      redamkan(0, "ks0", "ks1", "ks2", "kt0"),
      ubah("dipasang", ...RODA.flatMap((id, i) => geserLengkung(id, KR.rodaXY[i].x, KR.rodaXY[i].y))),
      ...kalimatBertahap(SUARA_U3, "kp", 150, 166, ["4", "+", "4", "=", "8"], ["empat", "tambah", "empat", "sama", "delapan"], "lagi."),
    ),
    k(
      SUARA_U4,
      tambah(idx(SUARA_U4, "tiga"), teks("n3", 60, 188, "3 segi empat", 10)),
      sorotkan(idx(SUARA_U4, "tiga"), "ks0", "ks1", "ks2"),
      tambah(idx(SUARA_U4, "satu"), teks("n1", 150, 188, "1 segitiga", 10)),
      sorotkan(idx(SUARA_U4, "satu"), "kt0"),
      tambah(idx(SUARA_U4, "empat", 2), teks("n4", 240, 188, "4 lengkung", 10)),
      sorotkan(idx(SUARA_U4, "empat", 2), ...RODA),
    ),
  ],
};
