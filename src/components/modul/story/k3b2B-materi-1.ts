import type { AdeganStory } from "./logika-story";
import { E, W, deretBotol, emo, judul, kartu, kertas, kotak, menara, pindah, pinus, pos, rak, tanah, teks, tokoh } from "./k3b2B-gambar";
import { bersih, k, sorotkan, tambah, ubah } from "./k3b2B-bantu";

/*
 * Cerita orisinal IGIL "Botol Air Pak Darto" (Kelas 3 Bab 2 Sub-Bab B, kalimat Matematika pengurangan), akhir cerita Perkemahan Akhir Pekan.
 * Naskah suara dari naskah/story-naskah-k3b2b.md. Bagian ini: pos jaga di tepi hutan, botol yang dibagikan, dan kalimat pengurangan dengan titik-titik.
 */

/* ------------------------------ 1. Pos jaga di tepi hutan ------------------------------ */
const SUARA_P1 = "Pagi berikutnya Raka, Salsa, dan Bima mendatangi pos jaga di tepi hutan.";
const SUARA_P2 = "Pak Darto, penjaga hutan berteropong, menyambut mereka dengan ramah.";
const SUARA_P3 = "Di rak pos, ia menyimpan botol air minum untuk semua peserta kemah.";

export const ADEGAN_POS_HUTAN: AdeganStory = {
  id: "pos-hutan",
  judul: "Pos jaga di tepi hutan",
  sumber: "Materi: pos jaga di tepi hutan",
  latar: "#ECFDF5",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Pos Jaga di Tepi Hutan"), ...tanah("tn", 150), ...pinus("p1", 6, 68, 34, 76)),
      tambah("Raka,", ...tokoh("rk", 40, 184, "Raka")),
      tambah("Salsa,", ...tokoh("sl", 80, 184, "Salsa")),
      tambah("Bima", ...tokoh("bm", 120, 184, "Bima")),
      tambah("pos", ...pos("ps", 150, 104, 84, 44)),
      tambah("hutan.", ...pinus("p2", 262, 70, 32, 74)),
    ),
    k(
      SUARA_P2,
      tambah("Darto,", ...tokoh("pd", 230, 184, "Pak Darto")),
      tambah("penjaga", ...menara("mn", 244, 92, 20, 34)),
      sorotkan("berteropong,", "pd-to"),
      tambah("menyambut", emo("lb", 196, 160, E.lambai, 16)),
      tambah("ramah.", emo("sm", 230, 132, E.senyum, 14)),
    ),
    k(
      SUARA_P3,
      bersih(0),
      tambah(0, judul("Rak Botol di Pos"), ...tanah("tn", 150), ...tokoh("pd", 34, 184, "Pak Darto")),
      tambah("rak", ...rak("rk", 76, 118, 150, 30)),
      tambah("botol", ...deretBotol("bt", 84, 106, 13, 11, 12)),
      tambah("peserta", ...tokoh("pj", 266, 184, "Pak Joko")),
      tambah("kemah.", emo("tk", 266, 132, E.tenda, 22)),
    ),
  ],
};

/* ------------------------------ 2. Botol dibagi ------------------------------ */
const SUARA_B1 = "Di rak ada sembilan puluh botol air minum.";
const SUARA_B2 = "Sebagian dibagikan kepada peserta, dan sekarang tersisa tiga puluh lima botol.";
const SUARA_B3 = "Berapa botol yang sudah dibagikan?";

/** Botol yang dibagikan: enam botol pertama baris bawah berpindah ke dekat Bima. */
const BOTOL_PINDAH = deretBotol("bt", 214, 134, 6, 9, 12);

export const ADEGAN_BOTOL_DIBAGI: AdeganStory = {
  id: "botol-dibagi",
  judul: "Botol air yang dibagikan",
  sumber: "Materi: botol air yang dibagikan",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, judul("Rak Penuh Botol"), ...tanah("tn", 150), ...rak("r1", 30, 112, 150, 30), ...rak("r2", 30, 80, 150, 30)),
      tambah("ada", ...deretBotol("bt", 38, 100, 13, 11, 12)),
      tambah("sembilan", teks("n90", 104, 62, "90", 24, W.awal)),
      tambah("botol", ...deretBotol("bu", 38, 68, 13, 11, 12)),
    ),
    k(
      SUARA_B2,
      tambah("peserta,", ...tokoh("bm", 240, 184, "Bima")),
      ubah("dibagikan", ...pindah(BOTOL_PINDAH)),
      ubah("tersisa", { id: "n90", op: 0.3 }),
      tambah("tiga", teks("n35", 104, 168, "35", 20, W.bagB)),
    ),
    k(
      SUARA_B3,
      tambah("Berapa", teks("tq", 254, 126, "?", 30, W.merah)),
      sorotkan("botol", ...BOTOL_PINDAH.map((o) => o.id)),
      tambah("dibagikan?", emo("pk", 186, 156, E.pikir, 16)),
    ),
  ],
};

/* ------------------------------ 3. Kalimat pengurangan ------------------------------ */
const SUARA_K1 = "Salsa menulis: sembilan puluh dikurangi titik-titik sama dengan tiga puluh lima.";
const SUARA_K2 = "Bentuk pengurangan yang memuat titik-titik juga disebut kalimat Matematika.";
const SUARA_K3 = "Bilangan yang belum diketahui adalah bilangan yang dikurangkan.";

export const ADEGAN_KALIMAT_KURANG: AdeganStory = {
  id: "kalimat-kurang",
  judul: "Kalimat pengurangan dengan titik-titik",
  sumber: "Materi: kalimat pengurangan",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_K1,
      tambah(0, judul("Kertas Catatan Salsa"), ...tanah("tn", 150)),
      tambah("Salsa", ...tokoh("sl", 40, 184, "Salsa")),
      tambah("menulis:", kertas("ks", 84, 46, 200, 84)),
      tambah("sembilan", teks("a90", 122, 98, "90", 22, W.awal)),
      tambah("dikurangi", teks("mn", 152, 98, "−", 22, W.biru)),
      tambah("titik-titik", teks("dt", 184, 98, "…", 22, W.bagA)),
      tambah("sama", teks("sm", 216, 98, "=", 22, W.biru)),
      tambah("tiga", teks("s35", 248, 98, "35", 22, W.bagB)),
    ),
    k(
      SUARA_K2,
      sorotkan("titik-titik", "dt"),
      tambah("kalimat", ...kartu("km", 96, 134, 176, 26, W.krem, ["kalimat Matematika"], 9.6)),
      tambah("Matematika.", emo("pn", 90, 150, E.catat, 14)),
    ),
    k(
      SUARA_K3,
      tambah(0, teks("la", 122, 74, "awal", 8.4, W.awal), teks("ls", 248, 74, "sisa", 8.4, W.bagB)),
      sorotkan("belum", "dt"),
      tambah("dikurangkan.", teks("ld", 184, 74, "dikurangkan", 8.4, W.bagA), kotak("bk", 170, 80, 28, 24, undefined, W.bagA, { rx: 6, putus: true, z: 3 })),
    ),
  ],
};
