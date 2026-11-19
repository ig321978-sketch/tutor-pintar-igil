import type { AdeganStory } from "./logika-story";
import { E, W, emo, halaman, judul, kartu, kartuAngka, kotakKue, panah, papanKapur, slot, teks, toko, tokoh, karung } from "./k3b1C-gambar";
import { bersih, hapus, k, tambah, ubah } from "./k3b1C-bantu";

/*
 * Cerita orisinal IGIL "Karung Pak Dodi" (Kelas 3 Bab 1 Sub-Bab C).
 * Naskah suara dari naskah/story-naskah-k3b1c.md. Bagian ini: mengurutkan tiga gudang (naik dan turun), papan urut berslot, penutup (jembatan ke Sub-Bab D).
 */

/* ------------------------------ 7. Urut tiga ------------------------------ */
const SUARA_G1 = "Tiga gudang: Utara, Selatan, dan Timur. Salsa mengurutkan banyak karung dari terkecil ke terbesar.";
const SUARA_G2 = "Paling kecil dulu: Selatan, lalu Utara, terakhir Timur.";
const SUARA_G3 = "Itu urutan naik. Kalau dibalik dari yang terbesar, itulah urutan turun.";

export const ADEGAN_URUT_TIGA: AdeganStory = {
  id: "urut-tiga",
  judul: "Salsa mengurutkan tiga gudang",
  sumber: "Materi: mengurutkan naik dan turun",
  latar: "#F5F3FF",
  ketukan: [
    k(
      SUARA_G1,
      bersih(0),
      tambah(0, judul("Urut Tiga Gudang", W.kapur), ...papanKapur("pk"), teks("n3", 150, 172, "3 gudang", 11, W.kapur, { z: 3 })),
      tambah("Utara", ...kartu("ka", 24, 70, 76, 48, W.krem, ["Utara", "465"], 9)),
      tambah("Selatan", ...kartu("kb", 112, 70, 76, 48, W.hijauMuda, ["Selatan", "456"], 9)),
      tambah("Timur", ...kartu("kc", 200, 70, 76, 48, W.merahMuda, ["Timur", "546"], 9)),
      tambah("Salsa", ...tokoh("sl", 46, 182, "Salsa")),
      tambah("terkecil", teks("tk", 62, 146, "terkecil", 9, W.kapur, { z: 3 })),
      tambah("terbesar", teks("tb", 238, 146, "terbesar", 9, W.kapur, { z: 3 })),
    ),
    k(
      SUARA_G2,
      ubah("Selatan", { id: "kb-k", x: 24 }, { id: "kb-t0", x: 62 }, { id: "kb-t1", x: 62 }),
      ubah("Utara", { id: "ka-k", x: 112 }, { id: "ka-t0", x: 150 }, { id: "ka-t1", x: 150 }),
      tambah("terakhir", teks("o1", 62, 62, "1", 10, W.emas, { z: 3 }), teks("o2", 150, 62, "2", 10, W.emas, { z: 3 }), teks("o3", 238, 62, "3", 10, W.emas, { z: 3 })),
      tambah("Timur", panah("nk", 40, 132, 170, 0, W.hijau, 3, { z: 3 })),
    ),
    k(
      SUARA_G3,
      tambah("naik.", teks("un", 150, 152, "urutan naik", 11, W.hijau, { z: 3 })),
      hapus("dibalik", "nk", "un", "tk", "tb"),
      ubah("dibalik", { id: "kc-k", x: 24 }, { id: "kc-t0", x: 62 }, { id: "kc-t1", x: 62 }, { id: "kb-k", x: 200 }, { id: "kb-t0", x: 238 }, { id: "kb-t1", x: 238 }),
      tambah("turun", teks("ut", 150, 152, "urutan turun", 11, W.merah, { z: 3 }), panah("tr", 40, 132, 170, 0, W.merah, 3, { z: 3 })),
    ),
  ],
};

/* ------------------------------ 8. Papan urut ------------------------------ */
const SUARA_H1 = "Kartu gudang ditempel di papan menurut urutan naik, supaya mudah dibaca.";
const SUARA_H2 = "Raka bertanya, bagaimana kalau ada gudang dengan lima ratus karung? Salsa menaruhnya di antara Utara dan Timur.";
const SUARA_H3 = "Bima menempelkan kartu lima ratus di tempatnya, dan papan pun rapi.";

/** Empat slot berjajar: x = 20, 92, 164, 236 (lebar 60, tinggi 56) di y = 64. */
const SLOT_X = [20, 92, 164, 236];
const slotSemua = SLOT_X.flatMap((x, i) => slot(`sl${i}`, x, 64, 60, 56, String(i + 1)));
const kartuSlot = (id: string, i: number, isi: string, warna: string) => kartuAngka(id, SLOT_X[i] + 2, 68, 56, 48, isi, warna, 15);

export const ADEGAN_PAPAN_URUT: AdeganStory = {
  id: "papan-urut",
  judul: "Papan urut gudang",
  sumber: "Materi: papan urut dengan slot",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_H1,
      bersih(0),
      tambah(0, judul("Papan Urut", W.kapur), ...papanKapur("pk")),
      tambah("ditempel", ...slotSemua, ...kartuSlot("c0", 0, "456", W.hijauMuda), ...kartuSlot("c1", 1, "465", W.krem)),
      tambah("urutan", ...kartuSlot("c3", 3, "546", W.merahMuda)),
      tambah("naik", panah("nk", 30, 140, 220, 0, W.hijau, 3, { z: 3 })),
      tambah("dibaca.", teks("tn", 80, 160, "urutan naik", 11, W.kapur, { z: 3 })),
    ),
    k(
      SUARA_H2,
      tambah("Raka", ...tokoh("rk", 40, 182, "Raka")),
      tambah("bertanya,", emo("ty", 66, 138, E.tanya, 18, { z: 3 })),
      tambah("lima", ...kartuAngka("k5", 166, 146, 56, 48, "500", W.kuning, 15)),
      tambah("Salsa", ...tokoh("sl", 262, 182, "Salsa")),
      tambah("antara", panah("pt", 212, 146, 0, -22, W.emas, 3, { z: 4 })),
    ),
    k(
      SUARA_H3,
      tambah("Bima", ...tokoh("bm", 110, 182, "Bima")),
      hapus("menempelkan", "pt", "ty"),
      ubah("menempelkan", { id: "k5-k", x: 166, y: 68 }, { id: "k5-t", x: 194, y: 97.3 }),
      tambah("papan", ...SLOT_X.map((x, i) => emo(`ck${i}`, x + 30, 150, E.benar, 14, { z: 3 }))),
      tambah("rapi.", teks("rp", 150, 172, "papan rapi", 12, W.kapur, { z: 3 })),
    ),
  ],
};

/* ------------------------------ 9. Penutup ------------------------------ */
const SUARA_I1 = "Raka bangga karena sudah belajar membandingkan dari kiri.";
const SUARA_I2 = "Bu Tuti datang memesan kue untuk hajatan, dan dua kotak kue harus dijumlahkan.";
const SUARA_I3 = "Menurutmu, mana yang lebih besar, tiga ratus delapan puluh sembilan atau tiga ratus sembilan puluh delapan? Terima kasih, Raka, Salsa, Bima, Pak Joko, dan Pak Dodi!";

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Raka bangga, Bu Tuti datang",
  sumber: "Materi: penutup dan jembatan ke Sub-Bab D",
  latar: "#FDF4FF",
  ketukan: [
    k(
      SUARA_I1,
      bersih(0),
      tambah(0, judul("Raka Bangga", W.hijau), ...halaman("hl", 136), ...toko("tk", 8, 62)),
      tambah("sudah", ...tokoh("rk", 180, 172, "Raka"), emo("sy", 206, 150, E.tertawa, 18, { z: 3 })),
      tambah("belajar", ...karung("ks0", 168, 136, 18, 14), ...karung("ks1", 186, 136, 18, 14), ...karung("ks2", 177, 123, 18, 14)),
      tambah("kiri.", panah("ph", 120, 118, 50, 0, W.hijau, 3, { z: 3 }), teks("dk", 130, 108, "dari kiri", 9, W.hijau, { z: 3 })),
    ),
    k(
      SUARA_I2,
      tambah("Tuti", ...tokoh("bt", 250, 172, "Bu Tuti")),
      tambah("memesan", emo("ps", 270, 146, E.catat, 18, { z: 3 })),
      tambah("kue", ...kotakKue("q1", 110, 150), ...kotakKue("q2", 142, 150)),
      tambah("dua", teks("n2", 126, 140, "2 kotak kue", 10, W.merah, { z: 3 })),
      tambah("dijumlahkan.", teks("pl", 138, 182, "+", 16, W.merah, { z: 3 })),
    ),
    k(
      SUARA_I3,
      bersih(0),
      tambah(0, judul("Menurutmu?", W.ungu), ...halaman("hl", 136)),
      tambah("tiga", ...kartuAngka("ka", 44, 48, 80, 46, "389")),
      tambah("atau", teks("ps", 150, 82, "?", 26, W.merah, { z: 3 })),
      tambah("tiga@2", ...kartuAngka("kb", 176, 48, 80, 46, "398")),
      tambah("Terima", emo("lb", 150, 136, E.lambai, 22, { z: 3 })),
      tambah("Raka", ...tokoh("rk", 30, 172, "Raka")),
      tambah("Salsa", ...tokoh("sl", 90, 172, "Salsa")),
      tambah("Bima", ...tokoh("bm", 150, 172, "Bima")),
      tambah("Joko", ...tokoh("pj", 210, 172, "Pak Joko")),
      tambah("Dodi", ...tokoh("pd", 270, 172, "Pak Dodi")),
    ),
  ],
};
