import type { AdeganStory } from "./logika-story";
import { E, W, bulat, emo, garisAbs, judul, petakGrid, rumput, tali, teks, tokoh, ukurTegak } from "./k3b4C-gambar";
import { bersih, k, sorotkan, tambah, ubah } from "./k3b4C-bantu";

/*
 * Cerita orisinal IGIL "Lintasan Pak Samsul" (Kelas 3 Bab 4 Sub-Bab C), akhir cerita Festival Layang-layang Kampung.
 * Naskah suara dari naskah/story-naskah-k3b4c.md. Bagian ini: dua tali sejajar, salah langkah Raka (tali yang tampak sejajar), dan memeriksa jarak di kedua ujung.
 */

/* ------------------------------ 4. Garis sejajar ------------------------------ */
const SUARA_S1 = "Pak Samsul merentangkan dua tali lintasan dengan jarak yang selalu sama.";
const SUARA_S2 = "Kedua tali itu tidak akan pernah bertemu, walaupun diperpanjang.";
const SUARA_S3 = "Dua garis seperti itu disebut garis sejajar, ditulis dengan dua garis miring.";

export const ADEGAN_SEJAJAR: AdeganStory = {
  id: "sejajar",
  judul: "Dua tali sejajar",
  sumber: "Materi: garis sejajar",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_S1,
      tambah(0, judul("Tali Lintasan"), ...rumput("tn", 150)),
      tambah("Samsul", ...tokoh("ps", 40, 184, "Pak Samsul")),
      tambah("dua", ...tali("ef", 70, 66, 250, 66, W.tali1), teks("n2", 150, 50, "2 tali", 10, W.biru)),
      tambah("tali", ...tali("gh", 70, 102, 250, 102, W.tali2)),
      tambah("jarak", ...ukurTegak("ua", 90, 66, 102), ...ukurTegak("ub", 232, 66, 102), teks("la", 98, 88, "3 petak", 9, W.biru, { anchor: "start" }), teks("lb", 226, 88, "3 petak", 9, W.biru, { anchor: "end" })),
      tambah("sama.", teks("e", 56, 70, "E", 10, W.tali1), teks("f", 264, 70, "F", 10, W.tali1), teks("g", 56, 106, "G", 10, W.tali2), teks("h", 264, 106, "H", 10, W.tali2)),
    ),
    k(
      SUARA_S2,
      tambah("tidak", teks("tb", 150, 126, "tidak pernah bertemu", 10, W.merah)),
      tambah("walaupun", emo("sx", 150, 140, E.salah, 18)),
      tambah("diperpanjang.", garisAbs("x1", 250, 66, 292, 66, W.tali1, 2, { putus: true }), garisAbs("x2", 250, 102, 292, 102, W.tali2, 2, { putus: true }), garisAbs("x3", 70, 66, 10, 66, W.tali1, 2, { putus: true }), garisAbs("x4", 70, 102, 10, 102, W.tali2, 2, { putus: true })),
    ),
    k(
      SUARA_S3,
      ubah("disebut", { id: "tb", isi: "garis sejajar", warna: W.hijauTua }),
      tambah("ditulis", teks("sy", 150, 148, "EF // GH", 14, W.merah)),
      tambah("miring.", teks("gm", 150, 164, "2 garis miring", 9, W.ungu)),
    ),
  ],
};

/* ------------------------------ 5. Salah langkah: tampak sejajar ------------------------------ */
const SUARA_X1 = "Raka menunjuk dua tali lain di ujung lapangan dan berseru, tidak bertemu, jadi pasti sejajar! Kalau salah, aku membersihkan semua patok!";
const SUARA_X2 = "Salsa menaruh kertas petak di bawahnya dan mengukur jarak tali di kedua ujung.";
const SUARA_X3 = "Di ujung kiri jaraknya dua petak, di ujung kanan empat petak.";

export const ADEGAN_SALAH_SEJAJAR: AdeganStory = {
  id: "salah-sejajar",
  judul: "Raka mengira tali sejajar",
  sumber: "Materi: salah langkah garis sejajar",
  latar: "#FFF1F2",
  ketukan: [
    k(
      SUARA_X1,
      tambah(0, judul("Taruhan Raka"), ...rumput("tn", 150), ...tokoh("rk", 40, 184, "Raka")),
      tambah("dua", ...tali("a1", 60, 62, 250, 62, W.tali1), teks("n2", 150, 46, "2 tali", 10, W.biru)),
      tambah("tali", ...tali("a2", 60, 86, 250, 110, W.tali2)),
      tambah("tidak", teks("tbt", 150, 136, "tidak bertemu!", 10, W.merah)),
      tambah("sejajar!", teks("sj", 196, 156, "pasti sejajar?", 10, W.merah)),
      tambah("patok!", emo("sk", 82, 168, E.sikat, 22)),
    ),
    k(
      SUARA_X2,
      tambah("Salsa", ...tokoh("sl", 262, 184, "Salsa")),
      tambah("kertas", ...petakGrid("pg", 60, 62, 16, 5, 12)),
      tambah("mengukur", ...ukurTegak("ul", 72, 62, 86, W.biru), ...ukurTegak("ur", 240, 62, 108, W.biru)),
    ),
    k(
      SUARA_X3,
      tambah("dua", teks("lkl", 78, 77, "2 petak", 9, W.biru, { anchor: "start" })),
      sorotkan("kiri", "ul-a", "ul-b"),
      tambah("empat", teks("lkr", 234, 90, "4 petak", 9, W.merah, { anchor: "end" })),
      sorotkan("kanan", "ur-a", "ur-b"),
    ),
  ],
};

/* ------------------------------ 6. Periksa jarak ------------------------------ */
const SUARA_P1 = "Jarak di kedua ujung berbeda, jadi kedua tali itu tidak sejajar.";
const SUARA_P2 = "Garis sejajar selalu berjarak sama, di mana pun kita mengukurnya.";
const SUARA_P3 = "Raka mengambil sikat, karena taruhan tetap taruhan.";

export const ADEGAN_PERIKSA_JARAK: AdeganStory = {
  id: "periksa-jarak",
  judul: "Periksa jarak kedua ujung",
  sumber: "Materi: periksa jarak sejajar",
  latar: "#FEFCE8",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Jarak Berbeda"), ...rumput("tn", 150)),
      tambah("Jarak", ...tali("a1", 60, 62, 250, 62, W.tali1), ...tali("a2", 60, 86, 250, 110, W.tali2)),
      tambah("berbeda,", ...ukurTegak("ul", 72, 62, 86, W.biru), ...ukurTegak("ur", 240, 62, 108, W.biru), teks("lkl", 78, 77, "2 petak", 9, W.biru, { anchor: "start" }), teks("lkr", 234, 90, "4 petak", 9, W.merah, { anchor: "end" })),
      tambah("tidak", teks("ts", 150, 138, "tidak sejajar", 11, W.merah), emo("sx", 150, 156, E.salah, 20)),
    ),
    k(
      SUARA_P2,
      bersih(0),
      tambah(0, judul("Jarak Selalu Sama"), ...rumput("tn", 150), ...tali("b1", 60, 62, 250, 62, W.tali1), ...tali("b2", 60, 98, 250, 98, W.tali2)),
      tambah("berjarak", ...ukurTegak("ua", 84, 62, 98, W.biru), ...ukurTegak("ub", 216, 62, 98, W.biru), teks("la", 92, 84, "3 petak", 9, W.biru, { anchor: "start" }), teks("lb", 208, 84, "3 petak", 9, W.biru, { anchor: "end" })),
      tambah("sama,", teks("sm", 150, 114, "jarak sama", 10, W.hijauTua)),
      tambah("mengukurnya.", ...ukurTegak("uc", 150, 62, 98, W.hijauTua), emo("ok", 150, 124, E.benar, 24)),
    ),
    k(
      SUARA_P3,
      bersih(0),
      tambah(0, judul("Taruhan Tetap Taruhan"), ...rumput("tn", 150), ...tokoh("rk", 150, 184, "Raka")),
      tambah("sikat,", emo("sk", 118, 168, E.sikat, 24)),
      tambah("karena", ...[0, 1, 2, 3, 4].map((i) => bulat(`pt${i}`, 40 + i * 52, 146, 5, "#F97316", "#7C2D12", { tebal: 1.2 }))),
      tambah("tetap", emo("gr", 184, 150, E.gerutu, 24), teks("tr", 150, 84, "taruhan tetap taruhan", 11, W.merah)),
    ),
  ],
};
