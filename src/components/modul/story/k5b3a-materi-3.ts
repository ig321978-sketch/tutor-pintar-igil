import type { AdeganStory } from "./logika-story";
import { E, W, barPec, bulat, campur, emo, garis, garisBil, idSelBar, judul, kotak, panah, pecahan, tanah, teks, tokoh, xBil } from "./k5b3a-gambar";
import { bersih, hapus, idx, k, tambah, warnai } from "./k5b3a-bantu";

/*
 * Cerita orisinal IGIL "Tiga Kantong Tepung Bu Ratna" (Kelas 5 Bab 3 Sub-Bab A), awal cerita Toko Roti Keliling.
 * Naskah suara dari naskah/story-naskah-k5b3a.md. Bagian ini: membandingkan pembilang setelah penyebut sama (lima belas, dua puluh dua, dua puluh delapan), urutan terbesar,
 * garis bilangan (kanan lebih besar), dan jembatan ke Sub-Bab B (gerobak roti isi Pak Seno dengan roti dipotong delapan bagian).
 */

/* ------------------------------ 7. Bandingkan pembilang ------------------------------ */
const SUARA_P1 = "Kalau penyebut sudah sama, cukup bandingkan pembilangnya: lima belas, dua puluh dua, dan dua puluh delapan.";
const SUARA_P2 = "Urutan dari yang terbesar: tiga bulat satu per dua, dua bulat tiga per empat, lalu satu bulat tujuh per delapan.";
const SUARA_P3 = "Hasilnya sama dengan cara tadi, jadi Bima yakin.";

export const ADEGAN_PEMBILANG: AdeganStory = {
  id: "pembilang",
  judul: "Bandingkan Pembilang",
  sumber: "Materi: bandingkan pembilang",
  latar: W.taman,
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Bandingkan Pembilang"), ...tanah("tn", 150)),
      tambah("sama,", teks("sm", 150, 38, "penyebut sama: 8", 11, W.pinkTua)),
      tambah("lima", kotak("bar1", 62, 107, 40, 33, W.jingga, W.coklat, { rx: 3, z: 1 }), teks("v1", 82, 101, "15", 12, W.merah), ...pecahan("f1", 82, 164, 15, 8, 12)),
      tambah(idx(SUARA_P1, "dua", 1), kotak("bar2", 130, 92, 40, 48, W.jingga, W.coklat, { rx: 3, z: 1 }), teks("v2", 150, 86, "22", 12, W.merah), ...pecahan("f2", 150, 164, 22, 8, 12)),
      tambah(idx(SUARA_P1, "dua", 3), kotak("bar3", 198, 78, 40, 62, W.jingga, W.coklat, { rx: 3, z: 1 }), teks("v3", 218, 72, "28", 12, W.merah), ...pecahan("f3", 218, 164, 28, 8, 12)),
    ),
    k(
      SUARA_P2,
      bersih(0),
      tambah(
        0,
        judul("Urutan Terbesar"),
        ...tanah("tn", 150),
        kotak("bl1", 120, 92, 60, 58, W.emas, W.coklat, { rx: 3, z: 1 }),
        kotak("bl2", 60, 110, 60, 40, W.jingga, W.coklat, { rx: 3, z: 1 }),
        kotak("bl3", 180, 122, 60, 28, W.pink, W.coklat, { rx: 3, z: 1 }),
        teks("nr1", 150, 128, "1", 16, W.merah, { z: 3 }),
        teks("nr2", 90, 142, "2", 16, W.merah, { z: 3 }),
        teks("nr3", 210, 146, "3", 16, W.merah, { z: 3 }),
      ),
      tambah("tiga", ...campur("c1", 150, 72, 3, 1, 2, 13)),
      tambah(idx(SUARA_P2, "dua", 2), ...campur("c2", 90, 90, 2, 3, 4, 13)),
      tambah(idx(SUARA_P2, "satu", 2), ...campur("c3", 210, 104, 1, 7, 8, 13)),
    ),
    k(
      SUARA_P3,
      tambah("sama", teks("cb", 150, 40, "cara bulat = cara KPK", 11, W.hijauTua)),
      tambah("tadi,", emo("ok", 270, 70, E.benar, 24)),
      tambah("Bima", ...tokoh("bm", 28, 184, "Bima")),
      tambah("yakin.", emo("jp", 270, 112, E.jempol, 22)),
    ),
  ],
};

/* ------------------------------ 8. Garis bilangan ------------------------------ */
const SUARA_G1 = "Bu Ratna menggambar garis bilangan di papan tulis kecilnya.";
const SUARA_G2 = "Makin ke kanan letak sebuah pecahan, makin besar, dan makin ke kiri makin kecil.";
const SUARA_G3 = "Tiga bulat satu per dua ada paling kanan, dua bulat tiga per empat di tengah, dan satu bulat tujuh per delapan paling kiri.";
const GB = garisBil("gb", 28, 228, 92, 4);

export const ADEGAN_GARIS: AdeganStory = {
  id: "garis",
  judul: "Letak di Garis",
  sumber: "Materi: garis bilangan",
  latar: W.taman,
  ketukan: [
    k(
      SUARA_G1,
      tambah(0, judul("Letak di Garis"), ...tanah("tn", 150), ...tokoh("bu", 268, 184, "Bu Ratna")),
      tambah("papan", kotak("pn", 8, 32, 240, 100, W.kapur, W.coklat, { rx: 5, tebal: 2, z: -1 })),
      tambah("garis", GB[0]),
      tambah("bilangan", ...GB.slice(1)),
    ),
    k(
      SUARA_G2,
      tambah("kanan", emo("hk", 236, 62, E.tunjuk, 18)),
      tambah("besar,", panah("pr", 130, 62, 88, 0, W.hijauTua, 3), teks("tr", 178, 50, "makin besar", 10, W.hijauTua)),
      tambah("kecil.", panah("pl", 110, 62, -72, 0, W.merah, 3), teks("tl", 66, 50, "makin kecil", 10, W.merah)),
    ),
    k(
      SUARA_G3,
      hapus(0, "hk", "pr", "tr", "pl", "tl"),
      tambah(
        0,
        bulat("d3", xBil(28, 228, 4, 3.5), 92, 4.5, W.merah, W.putih, { z: 3 }),
        garis("q3", xBil(28, 228, 4, 3.5), 78, 0, 10, W.merah, 1.2, { putus: true }),
        ...campur("c1", xBil(28, 228, 4, 3.5), 64, 3, 1, 2, 11, W.merah),
      ),
      tambah(
        idx(SUARA_G3, "dua", 2),
        bulat("d2", xBil(28, 228, 4, 2.75), 92, 4.5, W.hijauTua, W.putih, { z: 3 }),
        garis("q2", xBil(28, 228, 4, 2.75), 58, 0, 30, W.hijauTua, 1.2, { putus: true }),
        ...campur("c2", xBil(28, 228, 4, 2.75), 46, 2, 3, 4, 11, W.hijauTua),
      ),
      tambah(
        idx(SUARA_G3, "satu", 2),
        bulat("d1", xBil(28, 228, 4, 1.875), 92, 4.5, W.biru, W.putih, { z: 3 }),
        garis("q1", xBil(28, 228, 4, 1.875), 78, 0, 10, W.biru, 1.2, { putus: true }),
        ...campur("c3", xBil(28, 228, 4, 1.875), 64, 1, 7, 8, 11, W.biru),
      ),
    ),
  ],
};

/* ------------------------------ 9. Jembatan ke Sub-Bab B ------------------------------ */
const SUARA_N1 = "Tiba-tiba terdengar lonceng dari gerobak roti isi milik Pak Seno.";
const SUARA_N2 = "Roti Pak Seno dipotong delapan bagian sama besar, dan dua pesanan ingin digabung.";
const SUARA_N3 = "Menurutmu, bagaimana cara menggabungkan dua potongan roti? Terima kasih, Bima, Citra, Fajar, Pak Arif, dan Bu Ratna!";

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Gerobak Pak Seno",
  sumber: "Materi: gerobak roti isi Pak Seno",
  latar: W.taman,
  ketukan: [
    k(
      SUARA_N1,
      tambah(0, judul("Gerobak Pak Seno"), ...tanah("tn", 150)),
      tambah("lonceng", emo("lc", 270, 96, E.lonceng, 30, { z: 2 }), kotak("lt", 268, 104, 5, 46, W.coklat, W.papan, { rx: 1, z: 0 }), teks("dg", 270, 56, "ding", 11, W.merah)),
      tambah(
        "gerobak",
        kotak("gr-bd", 110, 96, 110, 34, "#FCA5A5", "#7F1D1D", { rx: 4, tebal: 1.6, z: 0 }),
        bulat("gr-r1", 126, 138, 7, "#475569", "#0F172A", { tebal: 1.4, z: 1 }),
        bulat("gr-r2", 204, 138, 7, "#475569", "#0F172A", { tebal: 1.4, z: 1 }),
        emo("rt", 205, 92, E.roti, 22, { z: 2 }),
      ),
      tambah("Seno.", ...tokoh("ps", 70, 184, "Pak Seno")),
    ),
    k(
      SUARA_N2,
      tambah("delapan", ...barPec("rb", 40, 36, 220, 22, 8, 0)),
      tambah("bagian", teks("b8", 150, 76, "8 bagian sama besar", 10, W.coklat)),
      warnai("dua", W.jingga, ...idSelBar("rb", 0, 0)),
      tambah("pesanan", teks("p2", 150, 90, "2 pesanan", 10, W.pinkTua)),
      warnai("pesanan", W.hijauMuda, ...idSelBar("rb", 1, 2)),
      tambah("digabung.", emo("gb", 30, 84, E.ubah, 20)),
    ),
    k(
      SUARA_N3,
      bersih(0),
      tambah(0, judul("Gerobak Pak Seno"), ...tanah("tn", 150)),
      tambah("Menurutmu,", emo("tq", 150, 66, E.pikir, 30)),
      tambah("dua", kotak("pc1", 100, 92, 40, 20, W.jingga, W.coklat, { rx: 3, z: 1 }), kotak("pc2", 160, 92, 40, 20, W.hijauMuda, W.coklat, { rx: 3, z: 1 }), teks("p2", 150, 132, "2 potongan roti", 10, W.coklat)),
      tambah("roti?", teks("gq", 150, 109, "?", 20, W.merah)),
      tambah("Bima,", ...tokoh("bm", 30, 184, "Bima")),
      tambah("Citra,", ...tokoh("ct", 90, 184, "Citra")),
      tambah("Fajar,", ...tokoh("fj", 150, 184, "Fajar")),
      tambah("Arif,", ...tokoh("pa", 210, 184, "Pak Arif")),
      tambah("Ratna!", ...tokoh("bu", 270, 184, "Bu Ratna")),
    ),
  ],
};
