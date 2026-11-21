import type { AdeganStory } from "./logika-story";
import { E, G, W, emo, garis, idTangram, idTokoh, judul, kotak, lantai, meja, panah, pasangTangram, poli, teks, tokoh, TANGRAM_KOTAK, TANGRAM_PERAHU, TANGRAM_RUMAH, type Tt } from "./k4b5b-gambar";
import { hapus, k, sorotkan, tambah } from "./k4b5b-bantu";

/*
 * Cerita orisinal IGIL "Mosaik Pak Rudi" (Kelas 4 Bab 5 Sub-Bab B, menyusun dan menguraikan bangun datar), akhir cerita Toko Keramik Bu Dewi.
 * Naskah suara dari naskah/story-naskah-k4b5b.md. Bagian ini: satu bangun banyak cara disusun, tangram tujuh keping (perahu dan rumah), dan mosaik jadi.
 */

/* ------------------------------ 7. Banyak cara ------------------------------ */
const SUARA_B1 = "Pak Rudi menunjukkan bahwa satu bangun bisa disusun dengan banyak cara.";
const SUARA_B2 = "Dua segitiga sama besar bisa membentuk persegi, jajargenjang, atau segitiga yang lebih besar.";
const SUARA_B3 = "Jadi hasil susunan bergantung pada sisi mana yang dipertemukan.";
const SK = 24;
const YB = 112;

export const ADEGAN_BANYAK_CARA: AdeganStory = {
  id: "banyak-cara",
  judul: "Satu bangun banyak cara",
  sumber: "Materi: satu bangun disusun banyak cara",
  latar: "#F5F3FF",
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, judul("Satu Bangun Banyak Cara"), ...lantai("lt", 150), ...meja("mj", 14, 232)),
      tambah("Rudi", ...tokoh("pr", 262, 184, "Pak Rudi")),
      tambah("satu", teks("n1", 150, 62, "1 bangun", 11, W.merah)),
      tambah("bangun", poli("ba", [[118, 88], [118, 112], [142, 112]], G.biru), poli("bb", [[158, 88], [182, 88], [182, 112]], G.kuning)),
      tambah("cara", emo("q", 150, 40, E.tanya, 18)),
    ),
    k(
      SUARA_B2,
      hapus(0, "ba", "bb", "n1", "q"),
      tambah("Dua", teks("n2", 150, 44, "2 segitiga", 11, W.merah)),
      tambah(
        "persegi",
        poli("p0", [[38, YB], [38 + SK, YB], [38, YB - SK]], G.biru),
        poli("p1", [[38 + SK, YB - SK], [38 + SK, YB], [38, YB - SK]], G.kuning),
        teks("lp", 50, 78, "persegi", 9, W.hijauTua),
      ),
      tambah(
        "jajargenjang",
        poli("j0", [[126, YB], [126 + SK, YB], [126 + SK, YB - SK]], G.biru),
        poli("j1", [[126 + SK, YB], [126 + 2 * SK, YB - SK], [126 + SK, YB - SK]], G.kuning),
        teks("lj", 150, 78, "jajargenjang", 9, W.hijauTua),
      ),
      tambah(
        "segitiga@2",
        poli("g0", [[226, YB], [226 + SK, YB], [226 + SK, YB - SK]], G.biru),
        poli("g1", [[226 + SK, YB], [226 + 2 * SK, YB], [226 + SK, YB - SK]], G.kuning),
        teks("lg", 250, 78, "segitiga", 9, W.hijauTua),
      ),
    ),
    k(
      SUARA_B3,
      tambah("sisi", garis("e0", 38 + SK, YB, -SK, -SK, W.merah, 3, { z: 6 }), garis("e1", 126 + SK, YB, 0, -SK, W.merah, 3, { z: 6 }), garis("e2", 226 + SK, YB, 0, -SK, W.merah, 3, { z: 6 })),
      tambah("dipertemukan", teks("sm", 150, 134, "sisi yang dipertemukan", 9, W.merah)),
    ),
  ],
};

/* ------------------------------ 8. Tangram ------------------------------ */
const SUARA_T1 = "Bu Dewi mengeluarkan tangram, tujuh keping yang bisa disusun menjadi banyak siluet.";
const SUARA_T2 = "Dengan tujuh keping itu, Laras menyusun sebuah perahu, dan Genta menyusun sebuah rumah.";
const SUARA_T3 = "Tiap keping harus dipakai, dan keping tidak boleh saling menumpuk.";
const SKALA_TG = 11;

export const ADEGAN_TANGRAM: AdeganStory = {
  id: "tangram",
  judul: "Tangram Bu Dewi",
  sumber: "Materi: tangram tujuh keping",
  latar: "#ECFEFF",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Tangram Bu Dewi"), ...lantai("lt", 150), ...meja("mj", 14, 260)),
      tambah("Dewi", ...tokoh("bd", 262, 184, "Bu Dewi")),
      tambah("tangram", ...pasangTangram("tk", TANGRAM_KOTAK, 126, 64, 12)),
      tambah("tujuh", teks("n7", 150, 54, "7 keping", 11, W.merah)),
      tambah("siluet", emo("q", 208, 86, E.tanya, 20)),
    ),
    k(
      SUARA_T2,
      hapus(0, ...idTangram("tk"), "q"),
      tambah("Laras", ...tokoh("la", 36, 184, "Laras")),
      tambah("perahu", ...pasangTangram("tb", TANGRAM_PERAHU, 56, 90, SKALA_TG), teks("lb", 89, 40, "perahu", 10, W.hijauTua)),
      tambah("Genta", ...tokoh("ge", 132, 184, "Genta")),
      tambah("rumah", ...pasangTangram("th", TANGRAM_RUMAH, 202, 112, SKALA_TG), teks("lh", 217, 40, "rumah", 10, W.hijauTua)),
    ),
    k(
      SUARA_T3,
      sorotkan("Tiap", ...idTangram("tb"), ...idTangram("th")),
      tambah("dipakai", emo("ok", 150, 86, E.benar, 22)),
      tambah("tidak", teks("tt", 150, 134, "tidak menumpuk, tanpa celah", 9, W.hijauTua)),
    ),
  ],
};

/* ------------------------------ 9. Penutup: mosaik jadi ------------------------------ */
const SUARA_P1 = "Mosaik pun jadi, dan semua keping menempel rapi tanpa celah.";
const SUARA_P2 = "Pak Hendro berkata, menyusun dan menguraikan membuat kita melihat bangun dari dua arah.";
const SUARA_P3 = "Menurutmu, bentuk apa lagi yang bisa kita susun dari keping-keping ini? Terima kasih, Satria, Laras, Genta, Pak Hendro, Bu Dewi, dan Pak Rudi!";
const X_TOKOH = [28, 78, 128, 178, 228, 278] as const;
const MX = 72;
const MY = 36;
const MS = 26;
const PAL = [[G.biru, G.kuning], [G.hijau, G.pink], [G.ungu, G.oranye], [G.tosca, G.merah]] as const;

/** Mosaik 6 x 3 ubin; tiap ubin persegi dari dua segitiga, arah diagonal berselang-seling. Baris r: `mz-r-c-a` dan `mz-r-c-b`. */
const ubinBaris = (r: number): ReturnType<typeof poli>[] =>
  Array.from({ length: 6 }, (_, c) => {
    const x = MX + c * MS;
    const y = MY + r * MS;
    const tl: Tt = [x, y];
    const tr: Tt = [x + MS, y];
    const br: Tt = [x + MS, y + MS];
    const bl: Tt = [x, y + MS];
    const [wa, wb] = PAL[(r + c) % PAL.length];
    return (r + c) % 2 === 0 ? [poli(`mz-${r}-${c}-a`, [tl, tr, br], wa), poli(`mz-${r}-${c}-b`, [tl, br, bl], wb)] : [poli(`mz-${r}-${c}-a`, [tl, tr, bl], wa), poli(`mz-${r}-${c}-b`, [tr, br, bl], wb)];
  }).flat();

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Mosaik sudah jadi",
  sumber: "Materi: mosaik selesai",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Mosaik Sudah Jadi"), ...lantai("lt", 150), kotak("fm", MX - 2, MY - 2, 6 * MS + 4, 3 * MS + 4, undefined, W.coklat, { rx: 2, tebal: 3, z: 6 })),
      tambah("jadi", ...ubinBaris(0)),
      tambah("keping", ...ubinBaris(1)),
      tambah("menempel", ...ubinBaris(2)),
      tambah("celah", emo("ok", 150, 136, E.benar, 22)),
    ),
    k(
      SUARA_P2,
      hapus(0, "ok"),
      tambah("Hendro", ...tokoh("ph", 150, 184, "Pak Hendro")),
      tambah("menyusun", teks("ls", 64, 132, "menyusun", 9, W.biru), panah("pa", 92, 128, 34, 0, W.ungu, 2.4)),
      tambah("menguraikan", teks("lu", 244, 132, "menguraikan", 9, W.biru), panah("pb", 210, 128, -34, 0, W.ungu, 2.4)),
      tambah("dua", teks("n2", 150, 132, "2 arah", 11, W.merah)),
    ),
    k(
      SUARA_P3,
      hapus(0, ...idTokoh("ph", "Pak Hendro"), "ls", "lu", "pa", "pb", "n2"),
      tambah("bentuk", teks("qt", 150, 128, "bentuk apa lagi?", 11, W.merah)),
      tambah("Satria", ...tokoh("o1", X_TOKOH[0], 184, "Satria")),
      tambah("Laras", ...tokoh("o2", X_TOKOH[1], 184, "Laras")),
      tambah("Genta", ...tokoh("o3", X_TOKOH[2], 184, "Genta")),
      tambah("Hendro", ...tokoh("o4", X_TOKOH[3], 184, "Pak Hendro")),
      tambah("Dewi", ...tokoh("o5", X_TOKOH[4], 184, "Bu Dewi")),
      tambah("Rudi", ...tokoh("o6", X_TOKOH[5], 184, "Pak Rudi")),
      tambah("kasih", teks("tk", 150, 142, "Terima kasih!", 12, W.hijauTua), emo("kf1", 28, 70, E.konfeti, 22), emo("kf2", 272, 70, E.konfeti, 22)),
    ),
  ],
};
