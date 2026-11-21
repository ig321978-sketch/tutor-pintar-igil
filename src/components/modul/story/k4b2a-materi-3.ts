import type { AdeganStory } from "./logika-story";
import { E, W, emo, garisBil, jepitan, judul, kotak, panah, pecahan, tanah, teks, tokoh } from "./k4b2a-gambar";
import { bersih, hapus, k, sorotkan, tambah } from "./k4b2a-bantu";

/*
 * Cerita orisinal IGIL "Kain Lipat Bu Wulan" (Kelas 4 Bab 2 Sub-Bab A), awal cerita Sanggar Batik Kampung Mekar.
 * Naskah suara dari naskah/story-naskah-k4b2a.md. Bagian ini: garis pecahan, mengurutkan potongan, penutup (jembatan ke Sub-Bab B).
 */

/* ------------------------------ 7. Garis pecahan ------------------------------ */
const SUARA_G1 = "Bu Wulan membentangkan tali dari nol sampai satu di halaman.";
const SUARA_G2 = "Genta menjepit tanda satu per dua di tengah, lalu satu per empat, lalu satu per delapan makin dekat ke nol.";
const SUARA_G3 = "Semakin ke kiri, semakin kecil pecahannya.";
const GB = garisBil("gb", 30, 100, 240, 0);

export const ADEGAN_GARIS: AdeganStory = {
  id: "garis",
  judul: "Garis pecahan di halaman",
  sumber: "Materi: garis pecahan",
  latar: "#FAF5FF",
  ketukan: [
    k(
      SUARA_G1,
      tambah(0, judul("Tali dari Nol ke Satu"), ...tanah("tn", 150), ...tokoh("bw", 40, 184, "Bu Wulan")),
      tambah("tali", GB.slice(0, 3)),
      tambah("nol", GB[3]),
      tambah("satu", GB[4]),
    ),
    k(
      SUARA_G2,
      tambah(0, ...tokoh("ge", 140, 184, "Genta")),
      tambah("dua", jepitan("j2", 150, 100), ...pecahan("f2", 150, 70, 2, 12)),
      tambah("empat,", jepitan("j4", 90, 100), ...pecahan("f4", 90, 70, 4, 12)),
      tambah("delapan", jepitan("j8", 60, 100), ...pecahan("f8", 60, 70, 8, 12)),
      tambah("nol.", panah("ar", 200, 126, -150, 0, W.merah, 2), teks("mk", 125, 140, "makin kecil", 9, W.merah)),
    ),
    k(
      SUARA_G3,
      tambah(0, teks("tk", 150, 40, "makin ke kiri, makin kecil", 10, W.unguTua)),
      tambah("kiri,", teks("lk", 50, 140, "kecil", 9, W.biru), teks("lb", 250, 140, "besar", 9, W.biru)),
      sorotkan("pecahannya.", "j8", "j4", "j2"),
    ),
  ],
};

/* ------------------------------ 8. Urutkan potongan ------------------------------ */
const SUARA_U1 = "Bu Wulan meminta mereka mengurutkan potongan dari yang terkecil.";
const SUARA_U2 = "Satria menyusun satu per delapan, satu per empat, lalu satu per dua.";
const SUARA_U3 = "Bu Wulan bertepuk tangan, karena urutannya sudah benar.";
const potongan = (id: string, y: number, w: number) => kotak(id, 40, y, w, 18, W.arsir, W.ungu, { rx: 2, tebal: 1.4, z: 2 });

export const ADEGAN_URUT: AdeganStory = {
  id: "urut",
  judul: "Urutkan potongan kain",
  sumber: "Materi: mengurutkan pecahan",
  latar: "#FAF5FF",
  ketukan: [
    k(
      SUARA_U1,
      tambah(0, judul("Urutkan Potongan"), ...tanah("tn", 150), ...tokoh("bw", 250, 184, "Bu Wulan")),
      tambah("potongan", potongan("pA", 50, 60), potongan("pB", 76, 120), potongan("pC", 102, 30)),
      tambah("terkecil.", teks("tl", 226, 60, "mulai dari", 9, W.coklat), teks("tl2", 226, 72, "yang terkecil", 9, W.coklat)),
    ),
    k(
      SUARA_U2,
      hapus(0, "pA", "pB", "pC", "tl", "tl2"),
      tambah(0, ...tokoh("sa", 160, 184, "Satria")),
      tambah("delapan,", potongan("s8", 50, 30), ...pecahan("u8", 26, 56, 8, 10)),
      tambah("empat,", potongan("s4", 76, 60), ...pecahan("u4", 26, 82, 4, 10)),
      tambah("dua.", potongan("s2", 102, 120), ...pecahan("u2", 26, 108, 2, 10)),
    ),
    k(
      SUARA_U3,
      tambah("bertepuk", emo("tp", 226, 142, E.tepuk, 20)),
      tambah("urutannya", teks("ut", 232, 60, "terkecil ke terbesar", 9, W.unguTua)),
      tambah("benar.", emo("ok", 232, 100, E.benar, 24)),
    ),
  ],
};

/* ------------------------------ 9. Penutup ------------------------------ */
const SUARA_P1 = "Pak Joyo, tukang pewarna, datang membawa bak-bak warna yang isinya berbeda-beda.";
const SUARA_P2 = "Pecahan satu bagian tadi ternyata hanya awal cerita.";
const SUARA_P3 = "Menurutmu, bak mana yang paling banyak isinya? Terima kasih, Satria, Laras, Genta, Pak Hendro, dan Bu Wulan!";
const WARNA_BAK = ["#F87171", "#60A5FA", "#34D399"];
/** Bak warna: badan `${id}` dan isi `${id}-w` setinggi `isi`. Pojok kiri-atas badan (x, 108). */
const bak = (id: string, x: number, isi: number, i: number) => [
  kotak(id, x, 108, 36, 40, "#E5E7EB", W.kayuTua, { rx: 3, tebal: 1.6, z: 1 }),
  kotak(`${id}-w`, x + 3, 148 - 3 - isi, 30, isi, WARNA_BAK[i], undefined, { rx: 2, tebal: 0, z: 2 }),
];

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Bak warna Pak Joyo",
  sumber: "Materi: penutup dan jembatan",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Bak Warna Pak Joyo"), ...tanah("tn", 150), ...tokoh("pj", 24, 184, "Pak Joyo")),
      tambah("membawa", ...bak("b1", 110, 12, 0)),
      tambah("warna", ...bak("b2", 150, 30, 1)),
      tambah("berbeda-beda.", ...bak("b3", 190, 22, 2)),
    ),
    k(
      SUARA_P2,
      tambah("satu", ...pecahan("pc", 250, 60, 4, 16)),
      tambah("awal", teks("aw", 240, 100, "baru awal cerita", 9, W.coklat)),
    ),
    k(
      SUARA_P3,
      bersih(0),
      tambah(0, judul("Bak Warna Pak Joyo"), ...tanah("tn", 150), ...tokoh("pj", 24, 184, "Pak Joyo"), ...bak("b1", 110, 12, 0), ...bak("b2", 150, 30, 1), ...bak("b3", 190, 22, 2)),
      tambah("banyak", teks("tq", 168, 92, "?", 30, W.merah)),
      tambah("Satria,", ...tokoh("sa", 70, 184, "Satria")),
      tambah("Laras,", ...tokoh("lr", 112, 184, "Laras")),
      tambah("Genta,", ...tokoh("ge", 152, 184, "Genta")),
      tambah("Hendro,", ...tokoh("ph", 204, 184, "Pak Hendro")),
      tambah("Wulan!", ...tokoh("bw", 258, 184, "Bu Wulan"), emo("lb", 258, 140, E.lambai, 20)),
    ),
  ],
};
