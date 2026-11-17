import type { AdeganStory } from "./logika-story";
import { E, W, deretKarcis, emo, judul, kartu, kotak, lampionDeret, orang, papan, tabelPS, teks } from "./k1b6B-gambar";
import { hapus, k, sorotkan, tambah, ubah, urutBilangan } from "./k1b6B-bantu";

/*
 * Cerita orisinal IGIL "Loket Karcis" (Kelas 1 Bab 6 Sub-Bab B). Naskah suara dari naskah/story-naskah-k1b6b.md.
 * Bagian ini: belasan ditambah satuan, memilih cara, dan catatan Kaka di papan.
 */

const kid = (id: string): string[] => [`${id}-k`, `${id}-t0`];
const ORANG = (id: string): string[] => [id, `${id}-n`];

/* ------------------------------ 4. Belasan ditambah satuan ------------------------------ */
const SUARA_B1 = "Sore harinya datang tiga belas anak, disusul empat anak lagi.";
const SUARA_B2 = "Tiga belas itu satu puluhan dan tiga satuan. Tambahkan satuannya dulu: tiga ditambah empat sama dengan tujuh.";
const SUARA_B3 = "Puluhannya tetap satu. Jadi tiga belas ditambah empat sama dengan tujuh belas.";
const [B1_13, B1_4] = urutBilangan(SUARA_B1, [13, 4]);
const [B2_13, B2_1, B2_3a, B2_3b, , B2_7] = urutBilangan(SUARA_B2, [13, 1, 3, 3, 4, 7]);
const [, B3_13, B3_4, B3_17] = urutBilangan(SUARA_B3, [1, 13, 4, 17]);
const TB = tabelPS("tb", 96, 50, "1", "3");
const tbBagian = (...akhir: string[]) => TB.filter((o) => akhir.some((a) => o.id.endsWith(a)));
const anak = (id: string, n: number, x0: number, y: number, dx: number, perBaris: number) =>
  Array.from({ length: n }, (_, i) => emo(`${id}${i}`, x0 + (i % perBaris) * dx, y + Math.floor(i / perBaris) * 17, E.anak, 14));
const ANAK13 = Array.from({ length: 13 }, (_, i) => `a${i}`);
const ANAK4 = Array.from({ length: 4 }, (_, i) => `c${i}`);

export const ADEGAN_BELASAN: AdeganStory = {
  id: "belasan",
  judul: "Belasan ditambah satuan",
  sumber: "Materi: belasan, puluhan dan satuan",
  latar: "#F5F3FF",
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, judul("Sore hari di loket")),
      tambah("Sore", ...lampionDeret("lp", 5, 60, 44, 45)),
      tambah(B1_13, ...anak("a", 13, 22, 92, 14, 7), teks("n13", 70, 72, "13", 16, W.merah)),
      tambah("disusul", teks("pl", 150, 108, "+", 22, W.ungu)),
      tambah(B1_4, ...anak("c", 4, 190, 92, 15, 4), teks("n4", 210, 72, "4", 16, W.merah)),
    ),
    k(
      SUARA_B2,
      hapus(0, ...ANAK13, ...ANAK4, "n13", "n4", "pl", "lp-t", ...Array.from({ length: 5 }, (_, i) => `lp${i}`)),
      tambah(B2_13, ...tbBagian("-kp", "-ks", "-hp", "-hs"), teks("l13", 150, 44, "13", 14, W.merah)),
      tambah(B2_1, ...tbBagian("-tp"), kotak("ik", 30, 112, 96, 26, "#FEF3C7", W.coklat, { rx: 4, tebal: 1.6, putus: true }), teks("ik-t", 78, 129, "ikat 10", 10, W.coklat)),
      tambah(B2_3a, ...tbBagian("-ts"), ...deretKarcis("ls", 3, 150, 120, 16, 13)),
      tambah("Tambahkan", ...kartu("sd", 100, 150, 100, 24, W.hijauMuda, ["satuan dulu"], 10)),
      ubah(B2_3b, { id: "sd-t0", isi: "3 + 4" }),
      ubah(B2_7, { id: "sd-t0", isi: "3 + 4 = 7" }),
    ),
    k(
      SUARA_B3,
      sorotkan("Puluhannya", "tb-kp", "tb-tp"),
      ubah("Jadi", { id: "sd-t0", isi: "13 + 4 = ?" }),
      ...[3, 4, 5, 6].map((i) => tambah(B3_4, deretKarcis("ls", 7, 150, 120, 16, 13)[i])),
      ubah(B3_13, { id: "l13", sorot: true }),
      ubah("tujuh", { id: "tb-ts", isi: "7", sorot: true }),
      ubah(B3_17, { id: "sd-t0", isi: "13 + 4 = 17" }),
    ),
  ],
};

/* ------------------------------ 5. Pilih cara ------------------------------ */
const SUARA_P1 = "Mamah bertanya, kalau sebelas karcis ditambah lima karcis, cara mana yang kamu pilih dan kenapa?";
const SUARA_P2 = "Kata Kaka, sebelas itu belasan, jadi tambah satuannya saja. Satu ditambah lima sama dengan enam, jadi enam belas.";
const SUARA_P3 = "Kata Igil, lima kecil, hitung maju saja. Boleh, asal hasilnya sama dan alasannya jelas.";
const [P1_11, P1_5] = urutBilangan(SUARA_P1, [11, 5]);
const [P2_11, P2_1, P2_5, P2_6, P2_16] = urutBilangan(SUARA_P2, [11, 1, 5, 6, 16]);
const [P3_5] = urutBilangan(SUARA_P3, [5]);

export const ADEGAN_PILIH: AdeganStory = {
  id: "pilih-cara",
  judul: "Pilih cara yang pas",
  sumber: "Materi: memilih cara dan alasan",
  latar: "#FFF1F2",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Pilih cara yang pas")),
      tambah("Mamah", ...orang("mm", 36, 70, E.mamah, "Mamah")),
      tambah(P1_11, teks("n11", 125, 96, "11", 26, W.merah)),
      tambah(P1_5, teks("pl", 160, 96, "+", 22, W.ungu), teks("n5", 185, 96, "5", 26, W.merah)),
      tambah("cara", ...kartu("c1", 30, 130, 110, 26, W.hijauMuda, ["cara A?"], 10), ...kartu("c2", 160, 130, 110, 26, W.langit, ["cara B?"], 10), teks("hs", 230, 96, "= ?", 22, W.ungu)),
      tambah("pilih", emo("tn", 62, 56, E.tanya, 20)),
    ),
    k(
      SUARA_P2,
      hapus(0, ...ORANG("mm"), "tn"),
      tambah("Kaka", ...orang("kk", 36, 70, E.kaka, "Kaka")),
      ubah(P2_11, { id: "n11", sorot: true }),
      ubah("belasan,", { id: "c1-t0", isi: "puluhan dan satuan" }),
      sorotkan("tambah", "c1-k"),
      tambah(P2_1, teks("w1", 70, 118, "1 + 5", 13, W.biru)),
      ubah(P2_5, { id: "n5", sorot: true }),
      ubah(P2_6, { id: "w1", isi: "1 + 5 = 6" }),
      ubah(P2_16, { id: "hs", isi: "= 16", sorot: true }),
    ),
    k(
      SUARA_P3,
      ubah(0, { id: "n11", sorot: false }, { id: "n5", sorot: false }, { id: "c1-k", sorot: false }),
      tambah("Igil", ...orang("ig", 276, 70, E.igil, "Igil")),
      tambah(P3_5, teks("kc5", 274, 110, "5 kecil", 9, W.biru)),
      ubah("hitung", { id: "c2-t0", isi: "hitung maju" }),
      sorotkan("maju", "c2-k"),
      tambah("hasilnya", ...kartu("hsm", 60, 164, 180, 22, W.krem, ["dua cara: 11 + 5 = 16"], 9.6)),
      tambah("sama", emo("ok", 270, 182, E.benar, 18)),
    ),
  ],
};

/* ------------------------------ 6. Catatan Kaka ------------------------------ */
const SUARA_C1 = "Kaka mencatat di papan: lima belas, empat belas, dan tujuh belas karcis.";
const SUARA_C2 = "Pak RT memeriksa catatan dan mengangguk. Tempat duduk komidi putar cukup untuk semuanya.";
const SUARA_C3 = "Igil menarik napas lega. Untung hitungannya tidak jadi empat belas!";
const [C1_15, C1_14, C1_17] = urutBilangan(SUARA_C1, [15, 14, 17]);

export const ADEGAN_CATATAN: AdeganStory = {
  id: "catatan",
  judul: "Catatan karcis di papan",
  sumber: "Materi: catatan hasil dan pemeriksaan",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_C1,
      tambah(0, judul("Catatan karcis")),
      tambah("mencatat", ...orang("kk", 30, 100, E.kaka, "Kaka")),
      tambah("papan:", ...papan("pn", 60, 34, 200, 96, "papan catatan")),
      tambah(C1_15, teks("r0", 160, 70, "8 + 7 = 15", 13, W.putih)),
      tambah(C1_14, teks("r1", 160, 92, "9 + 5 = 14", 13, W.putih)),
      tambah(C1_17, teks("r2", 160, 114, "13 + 4 = 17", 13, W.putih)),
    ),
    k(
      SUARA_C2,
      tambah("Pak", ...orang("pr", 278, 100, E.pakRT, "Pak RT")),
      tambah("mengangguk.", emo("ok", 278, 76, E.benar, 18)),
      tambah("Tempat", emo("kp", 120, 172, E.komidi, 36)),
      tambah("cukup", ...kartu("kc", 150, 150, 110, 22, W.hijauMuda, ["kursi cukup"], 10)),
    ),
    k(
      SUARA_C3,
      hapus(0, "kp", ...kid("kc")),
      tambah("Igil", emo("ig", 30, 160, E.lega, 30), teks("ig-n", 30, 173, "Igil", 8.4, W.ungu)),
      tambah("tidak", teks("x14", 168, 154, "8 + 7 = 14", 12, W.merah)),
      tambah("belas!", emo("sx", 236, 152, E.salah, 16)),
    ),
  ],
};
