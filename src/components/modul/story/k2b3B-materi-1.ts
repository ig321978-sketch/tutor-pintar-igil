import type { AdeganStory, Obj } from "./logika-story";
import { E, W, WARNA_KEPING, P, bg, emo, idPapanPuzzle, judul, kartu, kotak, lubang, pagar, papanPuzzle, persegi, rumput, teks, tokoh, type Titik } from "./k2b3B-gambar";
import { hapus, idx, k, sorotkan, tambah, ubah } from "./k2b3B-bantu";

/*
 * Cerita orisinal IGIL "Papan Puzzle yang Berantakan" (Kelas 2 Bab 3 Sub-Bab B, mengurai dan menyusun bangun datar), tengah cerita Taman Bermain Sekolah.
 * Naskah suara dari naskah/story-naskah-k2b3b.md. Bagian ini: angin menjatuhkan papan, keping ditumpuk (salah langkah), dan aturan menyusun.
 */
const keping = (id: string, pts: Titik[], i: number, o: Partial<Obj> = {}): Obj => bg(id, pts, WARNA_KEPING[i % WARNA_KEPING.length], { z: 2, ...o });
const segitiga = (x: number, y: number, s = 14): Titik[] => [P(x, y + s), P(x + s, y + s), P(x, y)];

/* ------------------------------ 1. Angin kencang ------------------------------ */
const SUARA_A1 = "Angin kencang menjatuhkan papan puzzle raksasa di pagar taman, dan kepingnya berserakan di rumput.";
const SUARA_A2 = "Bu Sari bertanya pada Bu Ratna, guru seni pelukisnya, apakah bisa selesai sebelum Sabtu.";
const SUARA_A3 = "Kalau tidak, papan puzzle kosong dan anak-anak sedih!";
const PAPAN = idPapanPuzzle("pp");
const SERAK: { id: string; pts: Titik[] }[] = [
  { id: "sk0", pts: segitiga(34, 160) },
  { id: "sk1", pts: persegi(80, 168, 14) },
  { id: "sk2", pts: segitiga(130, 156, 16) },
  { id: "sk3", pts: persegi(176, 164, 16, 10) },
  { id: "sk4", pts: segitiga(226, 168, 12) },
];

export const ADEGAN_ANGIN: AdeganStory = {
  id: "angin-kencang",
  judul: "Angin menjatuhkan papan puzzle",
  sumber: "Materi: papan puzzle berantakan",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_A1,
      tambah(0, judul("Papan Puzzle Jatuh"), rumput("rm", 146), ...pagar("pg", 24, 100, 252, 7), ...papanPuzzle("pp", 90, 30, 120, 66)),
      tambah(idx(SUARA_A1, "Angin"), emo("an1", 34, 64, E.angin, 24), emo("an2", 52, 88, E.angin, 18)),
      ubah(idx(SUARA_A1, "menjatuhkan"), ...PAPAN.map((id) => ({ id, y: id === "pp-s" ? 68 : id === "pp" ? 50 : id === "pp-l" ? 55 : 88.6 }))),
      tambah(idx(SUARA_A1, "kepingnya"), ...SERAK.map((s, i) => keping(s.id, s.pts, i))),
      ubah(idx(SUARA_A1, "berserakan"), { id: "sk1", x: 18 }, { id: "sk3", x: -16 }),
    ),
    k(
      SUARA_A2,
      tambah(idx(SUARA_A2, "Sari"), ...tokoh("bs", 40, 128, "Bu Sari")),
      tambah(idx(SUARA_A2, "Ratna,"), ...tokoh("br", 262, 128, "Bu Ratna")),
      tambah(idx(SUARA_A2, "bisa"), emo("qm", 76, 112, E.tanya, 20)),
      tambah(idx(SUARA_A2, "Sabtu."), ...kartu("kl", 206, 30, 76, 28, W.krem, ["Sabtu"], 11), emo("kal", 192, 50, E.kalender, 18)),
    ),
    k(
      SUARA_A3,
      hapus(idx(SUARA_A3, "Kalau"), "qm"),
      ubah(idx(SUARA_A3, "kosong"), { id: "pp-l", warna: "#E2E8F0" }, { id: "pp-g", warna: "#E2E8F0" }, { id: "pp-s", op: 0 }),
      tambah(idx(SUARA_A3, "kosong"), lubang("lb", 104, 70, 90, 36)),
      tambah(idx(SUARA_A3, "sedih!"), emo("sd1", 100, 188, E.sedih, 20), emo("sd2", 160, 188, E.sedih, 20), emo("sd3", 220, 188, E.sedih, 20)),
    ),
  ],
};

/* ------------------------------ 2. Keping bertumpuk (salah langkah) ------------------------------ */
const SUARA_T1 = "Chacha tidak sabar. Ia menumpuk keping segitiga di atas keping lain supaya cepat muat.";
const SUARA_T2 = "Dika menunjuk. Keping tidak boleh bertumpuk, Chacha, dan harus menempel pada sisinya!";
const SUARA_T3 = "Tiba-tiba keping yang ditumpuk Chacha meluncur dan mendarat di topi Nia!";
const LUBANG_T = [P(110, 80), P(190, 80), P(190, 140), P(110, 140)];

export const ADEGAN_TUMPUK: AdeganStory = {
  id: "keping-bertumpuk",
  judul: "Keping ditumpuk Chacha",
  sumber: "Materi: keping tidak boleh bertumpuk",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Jangan Ditumpuk!"), rumput("rm", 156), bg("lt", LUBANG_T, "#E2E8F0", { z: 1, putus: true, tebal: 1.6 })),
      tambah(idx(SUARA_T1, "Chacha"), ...tokoh("ch", 50, 150, "Chacha")),
      tambah(idx(SUARA_T1, "keping"), keping("t0", [P(112, 138), P(188, 138), P(150, 82)], 0), keping("t1", [P(112, 82), P(150, 82), P(112, 138)], 2)),
      tambah(idx(SUARA_T1, "menumpuk"), keping("t2", [P(124, 128), P(176, 128), P(150, 92)], 1, { z: 4 })),
      tambah(idx(SUARA_T1, "cepat"), emo("rb", 84, 130, E.angin, 18)),
    ),
    k(
      SUARA_T2,
      tambah(idx(SUARA_T2, "Dika"), ...tokoh("dk", 250, 150, "Dika")),
      tambah(idx(SUARA_T2, "menunjuk."), emo("jr", 222, 140, "\u{1F449}", 20)),
      tambah(idx(SUARA_T2, "bertumpuk,"), emo("no", 150, 66, E.salah, 20)),
      sorotkan(idx(SUARA_T2, "menempel"), "t2"),
      tambah(idx(SUARA_T2, "menempel"), teks("mk", 150, 172, "sisi harus menempel", 9, W.merah)),
    ),
    k(
      SUARA_T3,
      hapus(idx(SUARA_T3, "Tiba-tiba"), "jr", "no", "mk", "dk", "dk-n"),
      ubah(idx(SUARA_T3, "meluncur"), { id: "t2", x: 90, y: -30 }),
      tambah(idx(SUARA_T3, "mendarat"), ...tokoh("ni", 250, 150, "Nia")),
      ubah(idx(SUARA_T3, "mendarat"), { id: "t2", x: 114, y: 18, z: 6 }),
      tambah(idx(SUARA_T3, "Nia!"), emo("kg", 276, 112, E.kaget, 20)),
    ),
  ],
};

/* ------------------------------ 3. Aturan menyusun ------------------------------ */
const SUARA_R1 = "Bu Ratna menuliskan aturan di papan kecil. Pakai semua keping, dan jangan ada yang bertumpuk.";
const SUARA_R2 = "Sisi keping harus menempel rapat. Keping boleh diputar dan dibalik.";
const SUARA_R3 = "Aturan ini sama dengan aturan permainan tangram dari Tiongkok.";
const ATURAN = ["Pakai semua keping", "Tidak bertumpuk", "Sisi menempel rapat", "Boleh putar dan balik"];

export const ADEGAN_ATURAN: AdeganStory = {
  id: "aturan",
  judul: "Aturan menyusun keping",
  sumber: "Materi: aturan menyusun",
  latar: "#F5F3FF",
  ketukan: [
    k(
      SUARA_R1,
      tambah(0, judul("Aturan Menyusun"), rumput("rm", 168), kotak("ap", 20, 34, 150, 122, "#166534", "#92400E", { rx: 5, tebal: 4, z: -1 })),
      tambah(idx(SUARA_R1, "Ratna"), ...tokoh("br", 236, 142, "Bu Ratna")),
      tambah(idx(SUARA_R1, "menuliskan"), teks("ar0", 95, 54, "Aturan", 11, "#F8FAFC", { z: 3 })),
      tambah(idx(SUARA_R1, "Pakai"), teks("ar1", 95, 82, ATURAN[0], 9, "#F8FAFC", { z: 3 }), emo("c1", 32, 82, E.benar, 12, { z: 3 })),
      tambah(idx(SUARA_R1, "bertumpuk."), teks("ar2", 95, 108, ATURAN[1], 9, "#F8FAFC", { z: 3 }), emo("c2", 32, 108, E.benar, 12, { z: 3 })),
    ),
    k(
      SUARA_R2,
      tambah(idx(SUARA_R2, "menempel"), teks("ar3", 95, 134, ATURAN[2], 9, "#F8FAFC", { z: 3 }), emo("c3", 32, 134, E.benar, 12, { z: 3 })),
      tambah(idx(SUARA_R2, "rapat."), keping("m0", [P(196, 60), P(236, 60), P(196, 96)], 0), keping("m1", [P(240, 60), P(240, 96), P(200, 96)], 3)),
      ubah(idx(SUARA_R2, "rapat."), { id: "m1", x: -4 }),
      tambah(idx(SUARA_R2, "diputar"), emo("pt", 264, 78, "\u{1F504}", 18)),
      tambah(idx(SUARA_R2, "dibalik."), teks("ar4", 95, 156, ATURAN[3], 9, "#F8FAFC", { z: 3 }), emo("c4", 32, 156, E.benar, 12, { z: 3 })),
    ),
    k(
      SUARA_R3,
      hapus(idx(SUARA_R3, "Aturan"), "m0", "m1", "pt"),
      tambah(idx(SUARA_R3, "sama"), ...kartu("tg", 186, 36, 100, 26, W.krem, ["tangram"], 11)),
      tambah(idx(SUARA_R3, "tangram"), keping("g0", [P(200, 76), P(240, 76), P(220, 96)], 1), keping("g1", [P(244, 76), P(244, 96), P(224, 96)], 4)),
      tambah(idx(SUARA_R3, "Tiongkok."), emo("tk", 270, 108, "\u{1F3EE}", 22)),
    ),
  ],
};
