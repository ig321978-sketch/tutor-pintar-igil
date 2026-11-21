import type { AdeganStory } from "./logika-story";
import { E, W, deret, emo, gerobak, idDeret, judul, panah, tanah, teks, tokoh } from "./k5b2a-gambar";
import { bersih, hapus, idx, k, tambah } from "./k5b2a-bantu";

/*
 * Cerita orisinal IGIL "Lonceng Bu Marni" (Kelas 5 Bab 2 Sub-Bab A), awal cerita Pasar Kuliner Malam.
 * Naskah suara dari naskah/story-naskah-k5b2a.md. Bagian ini: kelipatan enam (tambah enam terus), kelipatan tujuh, delapan, sembilan, kelipatan sembilan dan tujuh sampai seratus,
 * dan jembatan ke Sub-Bab B (lonceng enam menit gerobak bakso Pak Tarno).
 */

/* ------------------------------ 7. Kelipatan enam dan cara yang sama ------------------------------ */
const SUARA_E1 = "Bima menulis daftar lain: kelipatan enam, yaitu enam, dua belas, delapan belas, dua puluh empat.";
const SUARA_E2 = "Tiap bilangan baru didapat dengan menambah enam pada bilangan sebelumnya.";
const SUARA_E3 = "Cara ini berlaku untuk kelipatan tujuh, delapan, sembilan, dan bilangan apa saja.";
const XE = [50, 106, 162, 218];

export const ADEGAN_ENAM: AdeganStory = {
  id: "enam",
  judul: "Kelipatan Enam",
  sumber: "Materi: kelipatan enam dan lainnya",
  latar: W.malam,
  ketukan: [
    k(
      SUARA_E1,
      tambah(0, judul("Kelipatan Enam"), ...tanah("tn", 150), ...tokoh("bm", 40, 184, "Bima")),
      tambah("kelipatan", teks("kl6", 150, 52, "kelipatan 6", 12, W.merah)),
      tambah(idx(SUARA_E1, "enam", 2), ...deret("en0", [6], XE[0], 70, 0, 40, 26, W.putih, 14)),
      tambah(idx(SUARA_E1, "dua", 1), ...deret("en1", [12], XE[1], 70, 0, 40, 26, W.putih, 14)),
      tambah("delapan", ...deret("en2", [18], XE[2], 70, 0, 40, 26, W.putih, 14)),
      tambah(idx(SUARA_E1, "dua", 2), ...deret("en3", [24], XE[3], 70, 0, 40, 26, W.putih, 14)),
    ),
    k(
      SUARA_E2,
      tambah("didapat", ...[0, 1, 2].map((i) => panah(`ap${i}`, XE[i] + 41, 106, 13, 0, W.hijauTua, 2))),
      tambah("menambah", ...[0, 1, 2].map((i) => teks(`ta${i}`, XE[i] + 48, 124, "+6", 11, W.hijauTua))),
      tambah("sebelumnya.", emo("lp", 150, 144, E.lampu, 20)),
    ),
    k(
      SUARA_E3,
      hapus(0, "kl6", ...[0, 1, 2, 3].flatMap((i) => idDeret(`en${i}`, 1)), ...[0, 1, 2].flatMap((i) => [`ap${i}`, `ta${i}`]), "lp"),
      tambah("tujuh", teks("r7", 160, 56, "kelipatan 7: 7, 14, 21", 11, W.biru)),
      tambah(idx(SUARA_E3, "delapan"), teks("r8", 160, 80, "kelipatan 8: 8, 16, 24", 11, W.biru)),
      tambah("sembilan", teks("r9", 160, 104, "kelipatan 9: 9, 18, 27", 11, W.biru)),
      tambah("saja.", emo("ok", 262, 130, E.benar, 22)),
    ),
  ],
};

/* ------------------------------ 8. Sampai seratus ------------------------------ */
const SUARA_R1 = "Pak Arif menantang: sampai seratus, kelipatan sembilan ada berapa?";
const SUARA_R2 = "Bima mendaftar dari sembilan sampai sembilan puluh sembilan, dan hasilnya sebelas bilangan.";
const SUARA_R3 = "Kelipatan tujuh berhenti di sembilan puluh delapan, karena empat belas kali tujuh.";
const SEMBILAN_1 = [9, 18, 27, 36, 45, 54];
const SEMBILAN_2 = [63, 72, 81, 90, 99];

export const ADEGAN_SERATUS: AdeganStory = {
  id: "seratus",
  judul: "Sampai Seratus",
  sumber: "Materi: kelipatan sampai seratus",
  latar: W.malam,
  ketukan: [
    k(
      SUARA_R1,
      tambah(0, judul("Sampai Seratus"), ...tanah("tn", 150)),
      tambah("Pak", ...tokoh("pa", 40, 184, "Pak Arif")),
      tambah("seratus,", teks("sr1", 180, 64, "1 sampai 100", 17, W.biru)),
      tambah("sembilan", teks("sr2", 180, 100, "kelipatan 9: ?", 17, W.merah)),
      tambah("berapa?", emo("pk", 262, 138, E.pikir, 24)),
    ),
    k(
      SUARA_R2,
      hapus(0, "sr1", "sr2", "pk"),
      tambah("Bima", ...tokoh("bm", 110, 184, "Bima")),
      tambah("mendaftar", ...deret("s1", SEMBILAN_1, 20, 36, 45, 40, 26, W.putih, 12)),
      tambah(idx(SUARA_R2, "puluh"), ...deret("s2", SEMBILAN_2, 20, 72, 45, 40, 26, W.jingga, 12)),
      tambah("sebelas", teks("sb", 150, 124, "11 bilangan", 14, W.hijauTua)),
    ),
    k(
      SUARA_R3,
      hapus(0, ...idDeret("s1", 6), ...idDeret("s2", 5), "sb"),
      tambah("Kelipatan", teks("bq1", 190, 50, "kelipatan 7 sampai 100", 11, W.biru)),
      tambah("berhenti", teks("bq2", 190, 92, "98", 34, W.merah)),
      tambah("empat", teks("bq3", 190, 126, "14 × 7 = 98", 16, W.hijauTua)),
    ),
  ],
};

/* ------------------------------ 9. Jembatan ke Sub-Bab B: lonceng Pak Tarno ------------------------------ */
const SUARA_N1 = "Tiba-tiba terdengar lonceng lain dari gerobak bakso milik Pak Tarno, berbunyi tiap enam menit.";
const SUARA_N2 = "Ia ingin tahu kapan loncengnya berbunyi bersamaan dengan lonceng Bu Marni.";
const SUARA_N3 = "Menurutmu, pada menit berapa dua lonceng itu berbunyi bersama? Terima kasih, Bima, Citra, Fajar, Pak Arif, dan Bu Marni!";

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Lonceng Pak Tarno",
  sumber: "Materi: lonceng gerobak bakso",
  latar: W.malam,
  ketukan: [
    k(
      SUARA_N1,
      tambah(0, judul("Lonceng Pak Tarno"), ...tanah("tn", 150)),
      tambah("lonceng", emo("lc", 266, 100, E.lonceng, 30, { z: 2 })),
      tambah("gerobak", ...gerobak("gr", 130, 96, 110), emo("bk", 185, 92, E.bakso, 22, { z: 2 })),
      tambah("Tarno,", ...tokoh("pt", 90, 184, "Pak Tarno")),
      tambah("enam", teks("t6", 266, 62, "tiap 6 menit", 9.5, W.merah)),
    ),
    k(
      SUARA_N2,
      tambah("ingin", emo("tq", 150, 56, E.pikir, 26)),
      tambah("Bu", ...tokoh("bu", 30, 184, "Bu Marni"), emo("lc2", 30, 132, E.lonceng, 26)),
      tambah("Marni.", teks("b4", 34, 104, "tiap 4 menit", 8.4, W.hijauTua)),
    ),
    k(
      SUARA_N3,
      bersih(0),
      tambah(0, judul("Lonceng Pak Tarno"), ...tanah("tn", 150)),
      tambah("Menurutmu,", emo("l1", 112, 84, E.lonceng, 30), emo("l2", 188, 84, E.lonceng, 30)),
      tambah("dua", teks("d2", 150, 112, "2 lonceng", 12, W.hijauTua)),
      tambah("bersama?", teks("bq", 150, 56, "?", 30, W.merah)),
      tambah("Terima", ...tokoh("bm", 30, 184, "Bima")),
      tambah("Citra,", ...tokoh("ct", 90, 184, "Citra")),
      tambah("Fajar,", ...tokoh("fj", 150, 184, "Fajar")),
      tambah("Arif,", ...tokoh("pa", 210, 184, "Pak Arif")),
      tambah("Marni!", ...tokoh("bu", 270, 184, "Bu Marni")),
    ),
  ],
};
