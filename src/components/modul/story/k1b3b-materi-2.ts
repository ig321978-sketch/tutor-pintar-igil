import type { AdeganStory } from "./logika-story";
import { E, KURANG, W, barisKursi, emo, garisBilangan, judul, kalimatK, label, panahObj, papanPeron, teks, tengahKursi } from "./k1b3b-gambar";
import { wajah } from "./k1b1a-gambar";
import { hapus, k, sorotkan, tambah, ubah, urutKata } from "./k1b3b-bantu";

/* Lanjutan "Pindah Kereta di Stasiun Besar": lompat mundur di garis bilangan papan peron, lalu pengurangan dari sepuluh dengan pasangan sepuluh. */

/* ------------------------------ 4. Lompat mundur di papan peron ------------------------------ */
const SUARA_G1 = "Mereka turun di peron delapan. Papan petunjuk berderet seperti garis bilangan.";
const SUARA_G2 = "Kereta lanjutan menunggu tiga peron ke arah kiri. Igil melompat mundur di garis bilangan.";
const SUARA_G3 = "Dari delapan, mundur tiga kali: tujuh, enam, lima. Mereka berhenti di peron lima.";
const SUARA_G4 = "Delapan dikurangi tiga sama dengan lima. Mundur di garis bilangan berarti mengurangi.";
const GB = { x0: 25, y: 124, j: 25 };
const xg = (n: number) => GB.x0 + n * GB.j;
const posG3 = urutKata(SUARA_G3, ["tujuh,", "enam,", "lima."], "kali:");

export const ADEGAN_PERON: AdeganStory = {
  id: "peron-mundur",
  judul: "Lompat mundur di papan peron",
  sumber: "Materi: hitung mundur di garis bilangan",
  latar: "#F0FDFA",
  ketukan: [
    k(
      SUARA_G1,
      tambah(0, judul("Papan peron")),
      tambah("delapan.", emo("ig", xg(8), 70, E.igil, 22)),
      tambah("Papan", ...Array.from({ length: 10 }, (_, i) => papanPeron("pp", xg(i + 1), 96, i + 1)).flat()),
      tambah("garis", ...garisBilangan("gb", GB.x0, GB.y, GB.j)),
    ),
    k(
      SUARA_G2,
      tambah("Kereta", emo("kr", xg(5), 176, E.kereta, 26)),
      tambah("kiri.", panahObj("arah", xg(8) - 6, 46, -66, 0, W.merah), teks("t3", 130, 38, "3 peron ke kiri", 9, W.merah)),
      sorotkan("mundur", "ig"),
    ),
    k(
      SUARA_G3,
      hapus(0, "arah", "t3"),
      ...[7, 6, 5].flatMap((n, i) => [tambah(posG3[i], panahObj(`h${n}`, xg(n + 1) - 4, 110, -(GB.j - 8), 0, W.merah)), ubah(posG3[i], { id: "ig", x: xg(n) })]),
      sorotkan("berhenti", "pp5", "gb-a5"),
    ),
    k(
      SUARA_G4,
      tambah("Delapan", ...kalimatK("kl", 150, 46, ["8", KURANG, "3", "=", "5"], 18, 26)),
      tambah("mengurangi.", ...label("kk", 14, 166, 110, "ke kiri: lebih kecil", W.langit, 9)),
    ),
  ],
};

/* ------------------------------ 5. Pengurangan dari sepuluh ------------------------------ */
const SUARA_K1 = "Satu baris di kereta lanjutan punya sepuluh kursi. Tujuh kursi sudah terisi penumpang.";
const SUARA_K2 = "Tujuh dan tiga adalah pasangan sepuluh. Jadi, sepuluh dikurangi tujuh sama dengan tiga kursi kosong.";
const SUARA_K3 = "Padahal mereka berempat. Abang bercanda, Igil duduk di atas koper saja! Igil cemberut. Tiga kursi memang tidak cukup.";
const SUARA_K4 = "Baris sebelah terisi enam. Enam dan empat pasangan sepuluh, jadi kosongnya empat. Sepuluh dikurangi enam sama dengan empat.";
const KR = { x0: 20, y: 112, s: 26 };
const tk = (i: number) => tengahKursi(KR.x0, KR.y, i, KR.s);

export const ADEGAN_KURSI: AdeganStory = {
  id: "kursi-sepuluh",
  judul: "Pengurangan dari sepuluh",
  sumber: "Materi: pengurangan dari sepuluh",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_K1,
      tambah(0, judul("Sepuluh kursi satu baris")),
      tambah("sepuluh", ...barisKursi("kr", KR.x0, KR.y, KR.s), teks("t10", 150, 154, "10 kursi", 10, W.biru)),
      tambah("terisi", ...Array.from({ length: 7 }, (_, i) => emo(`pn${i}`, tk(i).x, tk(i).y - 6, E.penumpang, 20))),
    ),
    k(
      SUARA_K2,
      hapus(0, "t10"),
      tambah("pasangan", ...label("ps", 70, 54, 160, "7 dan 3: pasangan 10", W.emas, 9.5)),
      sorotkan("kosong.", "kr7", "kr8", "kr9"),
      tambah("sepuluh@2", ...kalimatK("kl", 150, 170, ["10", KURANG, "7", "=", "3"], 18, 28)),
    ),
    k(
      SUARA_K3,
      hapus(0, "ps-k", "ps-t0"),
      tambah("berempat.", ...wajah("w1", 196, 62, E.igil, 20), ...wajah("w2", 220, 62, E.kaka, 20, true), ...wajah("w3", 244, 62, E.abang, 20), ...wajah("w4", 268, 62, E.mamah, 20)),
      tambah("cukup.", teks("tc", 90, 66, "tidak cukup!", 11, W.merah)),
    ),
    k(
      SUARA_K4,
      hapus(0, "tc", "kl0", "kl1", "kl2", "kl3", "kl4"),
      tambah("Baris", teks("bs", 90, 66, "baris sebelah", 10, W.ungu)),
      hapus("enam.", "pn6"),
      sorotkan("kosongnya", "kr6"),
      tambah("Sepuluh@2", ...kalimatK("k2", 150, 170, ["10", KURANG, "6", "=", "4"], 18, 28)),
    ),
  ],
};
