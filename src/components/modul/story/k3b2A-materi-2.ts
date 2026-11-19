import type { AdeganStory } from "./logika-story";
import { E, W, batangBagan, emo, garis, judul, panah, rumput, teks, tenda, tokoh, tumpukKayu } from "./k3b2A-gambar";
import { k, sorotkan, tambah } from "./k3b2A-bantu";

/*
 * Cerita orisinal IGIL "Kayu untuk Api Unggun" (Kelas 3 Bab 2 Sub-Bab A, kalimat Matematika penjumlahan), awal cerita Perkemahan Akhir Pekan.
 * Naskah suara dari naskah/story-naskah-k3b2a.md. Bagian ini: salah menjumlah (Raka terburu-buru), bagan batang, dan mengurangkan jumlah dengan bagian yang diketahui.
 */

/* ------------------------------ 4. Salah menjumlah ------------------------------ */
const SUARA_S1 = "Raka berseru, gampang, tiga puluh tambah lima puluh, delapan puluh batang! Kalau salah, aku tidur paling dekat semak!";
const SUARA_S2 = "Salsa menggeleng. Lima puluh itu jumlah semuanya, bukan bilangan yang ditambahkan lagi.";
const SUARA_S3 = "Kalau ditambah delapan puluh, jumlah semuanya jauh melebihi lima puluh.";

export const ADEGAN_SALAH_JUMLAH: AdeganStory = {
  id: "salah-jumlah",
  judul: "Raka salah menjumlah",
  sumber: "Materi: salah langkah menjumlah",
  latar: "#FEF2F2",
  ketukan: [
    k(
      SUARA_S1,
      tambah(0, judul("Raka Terburu-buru"), ...rumput("rt", 150)),
      tambah("Raka", ...tokoh("rk", 40, 184, "Raka")),
      tambah("berseru,", emo("sr", 72, 160, E.seru, 16)),
      tambah("tiga", teks("e30", 92, 64, "30", 20, W.hijauTua)),
      tambah("tambah", teks("e+", 122, 62, "+", 20, W.biru)),
      tambah("lima", teks("e50", 152, 64, "50", 20, W.jumlah)),
      tambah("delapan", teks("e=", 182, 62, "=", 20, W.biru), teks("e80", 212, 64, "80", 20, W.merah)),
      tambah("semak!", emo("sm", 266, 142, E.ranting, 24), ...tenda("tk", 236, 150, 30, 24, "#FCA5A5")),
    ),
    k(
      SUARA_S2,
      tambah("Salsa", ...tokoh("sl", 84, 184, "Salsa")),
      tambah("menggeleng.", emo("gl", 112, 160, E.salah, 14)),
      sorotkan("Lima", "e50"),
      tambah("jumlah", teks("jm", 152, 92, "jumlah semuanya", 9, W.jumlah)),
    ),
    k(
      SUARA_S3,
      tambah("Kalau", garis("cr", 200, 72, 26, -18, W.merah, 3, { z: 5 })),
      tambah("delapan", ...batangBagan("b80", 40, 106, 160, 16, W.tanya, "80", 11)),
      tambah("jumlah", ...batangBagan("b50", 40, 128, 100, 16, W.jumlah, "50", 11)),
      tambah("melebihi", garis("lm", 140, 102, 0, 48, W.merah, 2.4, { putus: true })),
    ),
  ],
};

/* ------------------------------ 5. Bagan batang ------------------------------ */
const SUARA_B1 = "Bima menggambar bagan di tanah dengan ranting. Batang atas adalah jumlah semuanya, yaitu lima puluh.";
const SUARA_B2 = "Dua batang di bawahnya adalah bagian-bagiannya: tiga puluh dan satu bagian yang belum diketahui.";
const SUARA_B3 = "Bagian yang belum diketahui didapat dengan mengurangkan jumlah semuanya dengan bagian yang diketahui.";

export const ADEGAN_BAGAN: AdeganStory = {
  id: "bagan",
  judul: "Bagan batang di tanah",
  sumber: "Materi: bagan jumlah dan bagian",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, judul("Bagan di Tanah"), ...rumput("rt", 150)),
      tambah("Bima", ...tokoh("bm", 40, 184, "Bima")),
      tambah("ranting.", emo("rn", 70, 160, E.ranting, 16)),
      tambah("Batang", ...batangBagan("bt", 80, 40, 180, 26, W.jumlah, "50", 14)),
      tambah("jumlah", teks("lj", 170, 82, "jumlah semuanya", 9, W.jumlah)),
    ),
    k(
      SUARA_B2,
      tambah("Dua", teks("n2", 40, 106, "2 batang", 8, W.ungu)),
      tambah("tiga", ...batangBagan("b30", 80, 94, 108, 26, W.bagian, "30", 14)),
      tambah("satu", ...batangBagan("bq", 188, 94, 72, 26, W.tanya, "?", 14), teks("n1", 224, 136, "1 bagian", 8, W.ungu)),
    ),
    k(
      SUARA_B3,
      tambah("didapat", panah("pa", 224, 68, 0, 24, W.merah, 2.4)),
      tambah("mengurangkan", teks("ku", 210, 164, "50 − 30", 14, W.merah)),
      sorotkan("diketahui.", "b30", "bt"),
    ),
  ],
};

/* ------------------------------ 6. Mengurangkan ------------------------------ */
const SUARA_R1 = "Lima puluh dikurangi tiga puluh sama dengan dua puluh.";
const SUARA_R2 = "Jadi, mereka harus mengumpulkan dua puluh batang kayu lagi.";
const SUARA_R3 = "Raka memeriksanya dengan menjumlahkan: tiga puluh tambah dua puluh sama dengan lima puluh. Cocok!";

export const ADEGAN_KURANG: AdeganStory = {
  id: "kurang",
  judul: "Kurangi jumlah dengan bagian",
  sumber: "Materi: mengurangkan dan memeriksa",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_R1,
      tambah(0, judul("Kurangi Jumlah"), ...rumput("rt", 150)),
      tambah("Lima", teks("a50", 62, 70, "50", 28, W.jumlah)),
      tambah("dikurangi", teks("mn", 108, 68, "−", 26, W.biru)),
      tambah("tiga", teks("a30", 152, 70, "30", 28, W.hijauTua)),
      tambah("sama", teks("sm", 194, 68, "=", 26, W.biru)),
      tambah("dua", teks("a20", 238, 70, "20", 28, W.merah)),
    ),
    k(
      SUARA_R2,
      tambah("mereka", ...tokoh("rk", 36, 184, "Raka"), ...tokoh("sl", 78, 184, "Salsa"), ...tokoh("bm", 120, 184, "Bima")),
      tambah("mengumpulkan", ...tumpukKayu("ky", 196, 146, 20, 5, 12, 5)),
      sorotkan("lagi.", "a20"),
    ),
    k(
      SUARA_R3,
      tambah("Raka", teks("p1", 100, 112, "30 + 20 = 50", 18, W.hijauTua)),
      tambah("Cocok!", emo("ok", 168, 116, E.benar, 22), emo("jp", 224, 116, E.jempol, 20)),
    ),
  ],
};
