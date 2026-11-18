import type { AdeganStory, Obj } from "./logika-story";
import { E, W, P, WARNA_KEPING, bg, emo, garis, judul, kartu, kotak, persegi, tangram, teks, tokoh, type Titik } from "./k2b3B-gambar";
import { NAMA_METODE, NAMA_METODE_ID } from "./k2b3B-luar-1";
import { hapus, idx, k, redamkan, sorotkan, tambah, ubah } from "./k2b3B-bantu";

/*
 * Video metode global Kelas 2 Bab 3 Sub-Bab B (lanjutan): terapan Lipat Kertas, Teka-Teki Bayangan dan terapannya, serta ringkasan.
 * Naskah suara dari naskah/story-naskah-k2b3b.md.
 */
const BAYANGAN = "#475569";
const keping = (id: string, pts: Titik[], i: number, o: Partial<Obj> = {}): Obj => bg(id, pts, WARNA_KEPING[i % WARNA_KEPING.length], { z: 3, ...o });

/* ------------------------------ Lipat Kertas: terapan ------------------------------ */
const SUARA_T1 = "Nia melipat kertas persegi dari pojok ke pojok, lalu menggunting sepanjang lipatannya.";
const SUARA_T2 = "Hasilnya dua segitiga yang sama besar, dan saat ditumpuk keduanya pas.";
const SUARA_T3 = "Cocok kalau kita ingin garis uraian yang lurus dan bagian yang sama besar.";
const SUARA_T4 = "Kurang cocok kalau bentuknya rumit, karena kertas sulit dilipat tepat di banyak tempat.";
const KERTAS = persegi(130, 50, 80);

export const ADEGAN_LUAR_LIPAT_TERAPAN: AdeganStory = {
  id: "luar-lipat-terapan",
  judul: "Lipat Kertas dipakai",
  sumber: "Metode global: Lipat Kertas dipakai",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Lipat Kertas Dipakai"), ...tokoh("ni", 40, 160, "Nia")),
      tambah(idx(SUARA_T1, "kertas"), bg("kt", KERTAS, "#FFFFFF", { z: 1, tebal: 2.2 })),
      tambah(idx(SUARA_T1, "pojok"), garis("fl", 130, 50, 80, 80, "#2563EB", 2.4, { putus: true, z: 4 })),
      tambah(idx(SUARA_T1, "menggunting"), emo("gt", 120, 112, E.gunting, 22, { z: 6 })),
      ubah(idx(SUARA_T1, "lipatannya."), { id: "gt", x: 232, y: 50 }),
    ),
    k(
      SUARA_T2,
      hapus(idx(SUARA_T2, "Hasilnya"), "gt", "kt", "fl"),
      tambah(idx(SUARA_T2, "dua"), keping("g0", [P(130, 50), P(210, 50), P(210, 130)], 1, { x: 18, y: -4 }), keping("g1", [P(130, 50), P(210, 130), P(130, 130)], 3, { x: -18, y: 4 }), teks("n2", 250, 100, "2", 28, W.merah)),
      ubah(idx(SUARA_T2, "ditumpuk"), { id: "g0", x: -42, y: 26 }, { id: "g1", x: -22, y: 4 }),
      tambah(idx(SUARA_T2, "pas."), emo("ok", 150, 172, E.benar, 22)),
    ),
    k(
      SUARA_T3,
      hapus(idx(SUARA_T3, "Cocok"), "n2", "g0", "g1"),
      tambah(idx(SUARA_T3, "Cocok"), emo("ok2", 40, 100, E.benar, 24)),
      tambah(idx(SUARA_T3, "garis"), garis("gl", 110, 60, 80, 0, W.merah, 3, { gambar: true }), teks("t1", 150, 84, "garis lurus", 10, W.biru)),
      tambah(idx(SUARA_T3, "sama"), ...kartu("sb", 90, 110, 120, 28, W.hijauMuda, ["bagian sama besar"], 9.4)),
    ),
    k(
      SUARA_T4,
      hapus(idx(SUARA_T4, "Kurang"), "ok2", "gl", "t1", "sb-k", "sb-t0"),
      tambah(idx(SUARA_T4, "Kurang"), emo("xs", 40, 100, E.salah, 24)),
      tambah(idx(SUARA_T4, "rumit,"), bg("rm", [P(120, 60), P(150, 40), P(190, 70), P(180, 100), P(200, 130), P(150, 120), P(130, 140), P(110, 100)], "#FEF3C7", { z: 1, tebal: 2 })),
      tambah(idx(SUARA_T4, "dilipat"), ...[0, 1, 2, 3].map((i) => garis(`fr${i}`, 120 + i * 20, 60, 20 - i * 12, 70, "#2563EB", 1.6, { putus: true, z: 4 }))),
      tambah(idx(SUARA_T4, "tempat."), emo("pk", 250, 90, E.pikir, 24)),
    ),
  ],
};

/* ------------------------------ Teka-Teki Bayangan: konsep ------------------------------ */
const SUARA_B1 = "Cara ketiga, Silhouette Puzzle, atau Teka-Teki Bayangan.";
const SUARA_B2 = "Kita diberi bayangan gelap sebuah bentuk, tanpa garis di dalamnya.";
const SUARA_B3 = "Tugasnya menyusun keping sampai menutupi bayangan itu dengan tepat.";
const SUARA_B4 = "Kita harus memutar dan membalik keping, dan mencari keping mana yang cocok.";
export const PERAHU_B = [P(70, 130), P(230, 130), P(204, 156), P(96, 156)];
export const LAYAR_B = [P(150, 40), P(150, 122), P(96, 122)];

export const ADEGAN_LUAR_BAYANGAN: AdeganStory = {
  id: "luar-bayangan",
  judul: "Silhouette Puzzle: Teka-Teki Bayangan",
  sumber: "Metode global: Teka-Teki Bayangan",
  latar: "#EEF2FF",
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, judul("3. Teka-Teki Bayangan")),
      tambah(idx(SUARA_B1, "ketiga,"), ...kartu("kb", 40, 36, 220, 30, "#DDD6FE", ["Silhouette Puzzle"], 12)),
      tambah(idx(SUARA_B1, "Teka-Teki"), ...kartu("kc", 60, 74, 180, 26, "#EDE9FE", ["Teka-Teki Bayangan"], 11)),
    ),
    k(
      SUARA_B2,
      hapus(idx(SUARA_B2, "Kita"), "kb-k", "kb-t0", "kc-k", "kc-t0"),
      tambah(idx(SUARA_B2, "bayangan"), bg("by0", PERAHU_B, BAYANGAN, { z: 1, tebal: 1 }), bg("by1", LAYAR_B, BAYANGAN, { z: 1, tebal: 1 })),
      tambah(idx(SUARA_B2, "gelap"), emo("mt", 262, 60, "\u{1F311}", 22)),
      tambah(idx(SUARA_B2, "garis"), teks("tg", 150, 182, "tanpa garis di dalam", 10, W.ungu)),
    ),
    k(
      SUARA_B3,
      hapus(idx(SUARA_B3, "Tugasnya"), "mt", "tg"),
      tambah(idx(SUARA_B3, "menyusun"), keping("s0", [P(150, 40), P(150, 122), P(96, 122)], 0, { x: -70, y: -10 }), keping("s1", [P(70, 130), P(230, 130), P(204, 156), P(96, 156)], 2, { y: 36 })),
      ubah(idx(SUARA_B3, "menutupi"), { id: "s0", x: 0, y: 0 }, { id: "s1", y: 0 }),
      tambah(idx(SUARA_B3, "tepat."), emo("ok", 262, 60, E.benar, 22)),
    ),
    k(
      SUARA_B4,
      hapus(idx(SUARA_B4, "Kita"), "ok"),
      tambah(idx(SUARA_B4, "memutar"), emo("pt", 262, 60, "\u{1F504}", 22)),
      tambah(idx(SUARA_B4, "membalik"), emo("bl", 40, 60, "\u{1F501}", 22)),
      tambah(idx(SUARA_B4, "mencari"), emo("qm", 150, 182, E.tanya, 22)),
    ),
  ],
};

/* ------------------------------ Teka-Teki Bayangan: terapan ------------------------------ */
const SUARA_Y1 = "Chacha menutupi bayangan perahu dengan tujuh keping tangram.";
const SUARA_Y2 = "Ia mulai dari keping terbesar, lalu mengisi bagian yang tersisa dengan keping kecil.";
const SUARA_Y3 = "Cocok kalau kita ingin melatih mata membayangkan bagian-bagian di dalam sebuah bentuk.";
const SUARA_Y4 = "Kurang cocok kalau tidak ada bayangan sebagai contoh yang bisa diikuti.";
const TANG = tangram(110, 50);

export const ADEGAN_LUAR_BAYANGAN_TERAPAN: AdeganStory = {
  id: "luar-bayangan-terapan",
  judul: "Teka-Teki Bayangan dipakai",
  sumber: "Metode global: Teka-Teki Bayangan dipakai",
  latar: "#EEF2FF",
  ketukan: [
    k(
      SUARA_Y1,
      tambah(0, judul("Bayangan Dipakai"), ...tokoh("ch", 40, 166, "Chacha")),
      tambah(idx(SUARA_Y1, "bayangan"), bg("by", [P(110, 50), P(190, 50), P(190, 130), P(110, 130)], BAYANGAN, { z: 1, tebal: 1 })),
      tambah(idx(SUARA_Y1, "tujuh"), ...TANG.map((t, i) => keping(t.id, t.pts, i, { x: 0, y: 0, op: 0.95 })), teks("c7", 244, 100, "7", 28, W.merah)),
      sorotkan(idx(SUARA_Y1, "tangram."), ...TANG.map((t) => t.id)),
    ),
    k(
      SUARA_Y2,
      redamkan(idx(SUARA_Y2, "Ia"), ...TANG.map((t) => t.id)),
      sorotkan(idx(SUARA_Y2, "terbesar,"), "kp0", "kp1"),
      redamkan(idx(SUARA_Y2, "lalu"), "kp0", "kp1"),
      sorotkan(idx(SUARA_Y2, "kecil."), "kp5", "kp6"),
      tambah(idx(SUARA_Y2, "mengisi"), teks("tk", 150, 162, "besar dulu, lalu kecil", 10, W.ungu)),
    ),
    k(
      SUARA_Y3,
      redamkan(idx(SUARA_Y3, "Cocok"), "kp5", "kp6"),
      hapus(idx(SUARA_Y3, "Cocok"), "tk", "c7", ...TANG.map((t) => t.id), "by"),
      tambah(idx(SUARA_Y3, "Cocok"), emo("ok", 40, 100, E.benar, 24)),
      tambah(idx(SUARA_Y3, "mata"), emo("ms", 150, 70, "\u{1F440}", 28)),
      tambah(idx(SUARA_Y3, "bentuk."), ...kartu("by2", 70, 120, 160, 28, W.hijauMuda, ["bayangkan bagian dalam"], 9.4)),
    ),
    k(
      SUARA_Y4,
      hapus(idx(SUARA_Y4, "Kurang"), "ok", "ms", "by2-k", "by2-t0"),
      tambah(idx(SUARA_Y4, "Kurang"), emo("xs", 40, 100, E.salah, 24)),
      tambah(idx(SUARA_Y4, "bayangan"), kotak("kb", 110, 56, 80, 70, "#F8FAFC", "#94A3B8", { rx: 3, tebal: 1.6, putus: true, z: 1 })),
      tambah(idx(SUARA_Y4, "contoh"), emo("qm", 150, 100, E.tanya, 28, { z: 3 })),
      tambah(idx(SUARA_Y4, "diikuti."), teks("tc", 150, 160, "tidak ada contoh", 10, W.merah)),
    ),
  ],
};

/* ------------------------------ Ringkasan ------------------------------ */
const SUARA_R1 = "Kita sudah melihat tiga cara. Mana yang pas? Itu tergantung tugasnya.";
const SUARA_R2 = "Ingin mencoba banyak susunan dengan cepat, pakai Pola Blok. Ingin bagian yang sama besar, pakai Lipat Kertas.";
const SUARA_R3 = "Ingin melatih mata membayangkan susunan, pakai Teka-Teki Bayangan. Apa pun caranya, keping jangan bertumpuk.";
const SUARA_R4 = "Menurutmu, untuk membagi sebuah persegi menjadi dua segitiga yang sama besar, kamu pilih cara yang mana?";
const WARNA_R = ["#BBF7D0", "#FDE68A", "#DDD6FE"];

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan tiga cara",
  sumber: "Metode global: ringkasan tiga cara",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_R1,
      tambah(0, judul("Ringkasan")),
      tambah(idx(SUARA_R1, "tiga"), teks("t3", 150, 48, "3 cara", 13, W.merah)),
      tambah(idx(SUARA_R1, "Mana"), ...NAMA_METODE_ID.flatMap((n, i) => kartu(`r${i}`, 40, 60 + i * 38, 220, 30, WARNA_R[i], [`${i + 1}. ${n}`], 11))),
      tambah(idx(SUARA_R1, "tugasnya."), emo("pk", 276, 100, E.pikir, 22)),
    ),
    k(
      SUARA_R2,
      hapus(idx(SUARA_R2, "Ingin"), "pk"),
      sorotkan(idx(SUARA_R2, "cepat,"), "r0-k"),
      tambah(idx(SUARA_R2, "cepat,"), teks("q0", 150, 192, "banyak susunan: Pola Blok", 9.4, W.ungu)),
      redamkan(idx(SUARA_R2, "Ingin", 2), "r0-k"),
      sorotkan(idx(SUARA_R2, "Ingin", 2), "r1-k"),
      ubah(idx(SUARA_R2, "Lipat"), { id: "q0", isi: "bagian sama besar: Lipat Kertas" }),
    ),
    k(
      SUARA_R3,
      redamkan(idx(SUARA_R3, "Ingin"), "r1-k"),
      sorotkan(idx(SUARA_R3, "Teka-Teki"), "r2-k"),
      ubah(idx(SUARA_R3, "Teka-Teki"), { id: "q0", isi: "melatih mata: Teka-Teki Bayangan" }),
      tambah(idx(SUARA_R3, "bertumpuk."), emo("xt", 276, 100, E.salah, 22)),
    ),
    k(
      SUARA_R4,
      hapus(idx(SUARA_R4, "Menurutmu,"), "t3", "xt", "q0", ...[0, 1, 2].flatMap((i) => [`r${i}-k`, `r${i}-t0`])),
      tambah(idx(SUARA_R4, "persegi"), bg("ut", persegi(110, 56, 80), "#FEF9C3", { z: 1, tebal: 2.4 })),
      tambah(idx(SUARA_R4, "dua"), garis("ug", 110, 56, 80, 80, W.merah, 2.8, { gambar: true, z: 5 }), teks("n2", 150, 160, "2 segitiga", 11, W.merah)),
      tambah(idx(SUARA_R4, "mana?"), emo("qm", 262, 100, E.tanya, 26)),
    ),
  ],
};
void NAMA_METODE;
