import type { AdeganStory } from "./logika-story";
import { E, bulat, dermaga, emo, garis, idTempat, judul, judulTempat, kartuBil, kotak, laut, panah, teks, tempatAngka, tokoh, W } from "./k4b1c-gambar";
import { bersih, k, sorotkan, tambah, ubah } from "./k4b1c-bantu";

/*
 * Cerita orisinal IGIL "Papan Dermaga Kak Tiara" (K4 Bab 1 Sub-Bab C, membandingkan dan mengurutkan bilangan sampai sepuluh ribu), cerita Penginapan Pulau Karang Indah.
 * Naskah suara dari naskah/story-naskah-k4b1c.md. Bagian ini: Pantai Selatan paling ramai, mengurutkan tiga bilangan, penutup (jembatan ke Sub-Bab D).
 */

const HIJAU_TEMPAT = "#86EFAC";

/* ------------------------------ 7. Pantai Selatan ------------------------------ */
const SUARA_T1 = "Pantai Selatan dikunjungi empat ribu lima ratus tiga puluh delapan orang.";
const SUARA_T2 = "Ribuannya sama, tetapi ratusan lima lebih besar daripada tiga.";
const SUARA_T3 = "Jadi Pantai Selatan paling ramai di antara ketiganya.";

export const ADEGAN_SELATAN: AdeganStory = {
  id: "selatan",
  judul: "Pantai Selatan paling ramai",
  sumber: "Materi: pantai selatan",
  latar: "#ECFEFF",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Pantai Selatan"), ...judulTempat("ht", 100, 30)),
      tambah("dikunjungi", ...tempatAngka("p1", 100, 34, 4358), ...tempatAngka("p2", 100, 76, 4385), teks("lb", 52, 56, "BARAT", 11, W.tinta), teks("lt", 52, 98, "TIMUR", 11, W.tinta)),
      tambah("lima", ...tempatAngka("p3", 100, 118, 4538), teks("ls", 52, 140, "SELATAN", 11, W.tinta)),
      tambah("orang", teks("s3", 262, 140, "4.538", 12, W.merah)),
    ),
    k(
      SUARA_T2,
      ubah("sama,", { id: "p1-k0", warna: HIJAU_TEMPAT }, { id: "p2-k0", warna: HIJAU_TEMPAT }, { id: "p3-k0", warna: HIJAU_TEMPAT }),
      sorotkan("ratusan", "p1-k1", "p3-k1"),
      tambah("lebih", teks("bd", 266, 96, "5 > 3", 12, W.merah)),
      ubah("tiga.", { id: "p3-k1", warna: "#FDBA74" }),
    ),
    k(
      SUARA_T3,
      tambah("Selatan", emo("mk", 52, 122, E.mahkota, 18)),
      sorotkan("paling", ...idTempat("p3")),
      tambah("ramai", teks("pr", 262, 118, "paling ramai", 9, W.hijau)),
      tambah("ketiganya.", ...tokoh("kt", 262, 184, "Kak Tiara")),
    ),
  ],
};

/* ------------------------------ 8. Mengurutkan tiga bilangan ------------------------------ */
const SUARA_U1 = "Genta menyusun ketiga bilangan dari yang terkecil ke yang terbesar.";
const SUARA_U2 = "Urutannya empat ribu tiga ratus lima puluh delapan, empat ribu tiga ratus delapan puluh lima, lalu empat ribu lima ratus tiga puluh delapan.";
const SUARA_U3 = "Dari yang terbesar ke terkecil, urutannya dibalik.";
/** Posisi kiri tiga kartu: tempat pertama, kedua, ketiga. */
const XK = [24, 114, 204];
const geser = (n: number, tempat: number) => [
  { id: `c${n}-k`, x: XK[tempat] },
  { id: `c${n}-t0`, x: XK[tempat] + 35 },
];

export const ADEGAN_URUT: AdeganStory = {
  id: "urut",
  judul: "Mengurutkan tiga bilangan",
  sumber: "Materi: mengurutkan bilangan",
  latar: "#FEF3C7",
  ketukan: [
    k(
      SUARA_U1,
      tambah(0, judul("Menyusun Bilangan"), ...tokoh("gt", 40, 184, "Genta")),
      tambah("bilangan", ...kartuBil("c4538", XK[0], 56, 4538, "#FFFFFF", 70, 40, 16), ...kartuBil("c4358", XK[1], 56, 4358, "#FFFFFF", 70, 40, 16), ...kartuBil("c4385", XK[2], 56, 4385, "#FFFFFF", 70, 40, 16)),
      tambah("terkecil", teks("kc", 36, 112, "kecil", 9, W.ungu), panah("na", 24, 122, 250, 0, W.hijau, 2.4)),
      tambah("terbesar.", teks("bs", 262, 112, "besar", 9, W.ungu)),
    ),
    k(
      SUARA_U2,
      ubah("delapan,", ...geser(4358, 0), ...geser(4538, 1)),
      ubah("lima@2", ...geser(4385, 1), ...geser(4538, 2)),
      tambah("lalu", panah("rv", 274, 142, -248, 0, W.ungu, 2.4, { op: 0.3 })),
      sorotkan("delapan@3", "c4358-k", "c4385-k", "c4538-k"),
    ),
    k(
      SUARA_U3,
      ubah("terbesar", { id: "rv", op: 1 }),
      ubah("terkecil,", { id: "na", op: 0.3 }),
      ubah("dibalik.", ...geser(4538, 0), ...geser(4358, 2)),
    ),
  ],
};

/* ------------------------------ 9. Penutup ------------------------------ */
const SUARA_P1 = "Satria kembali ke dermaga dengan napas terengah-engah, dan semua tertawa.";
const SUARA_P2 = "Pak Darwis, penjual kelapa, datang membawa hasil panen yang sangat banyak.";
const SUARA_P3 = "Menurutmu, bagaimana cara membagi ribuan kelapa ke dalam keranjang? Terima kasih, Satria, Laras, Genta, Pak Hendro, dan Kak Tiara!";
/** Deret kelapa di atas gerobak: dua baris, sepuluh buah (y baris bawah 136, baris atas 120). */
const KELAPA_BAWAH = [0, 1, 2, 3, 4].map((i) => emo(`kl${i}`, 22 + i * 15, 138, E.kelapa, 16));
const KELAPA_ATAS = [0, 1, 2, 3].map((i) => emo(`km${i}`, 30 + i * 15, 122, E.kelapa, 16));
const roda = (id: string, x: number) => bulat(id, x, 168, 5, "#475569", "#0F172A", { tebal: 1.2, z: 3 });

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Kelapa Pak Darwis datang",
  sumber: "Materi: penutup dan jembatan",
  latar: "#E0F2FE",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Kembali ke Dermaga"), ...laut("lt", 104)),
      tambah("dermaga", ...dermaga("dk", 2, 172, 296), ...tokoh("st", 40, 184, "Satria")),
      tambah("napas", emo("kr", 68, 146, E.keringat, 18)),
      tambah("semua", ...tokoh("lr", 92, 184, "Laras"), ...tokoh("gt", 140, 184, "Genta"), ...tokoh("ph", 200, 184, "Pak Hendro"), ...tokoh("kt", 262, 184, "Kak Tiara")),
      tambah("tertawa.", emo("sn", 150, 132, E.senyum, 18)),
    ),
    k(
      SUARA_P2,
      bersih(0),
      tambah(0, judul("Pak Darwis Datang"), ...laut("lt", 104), ...dermaga("dk", 2, 172, 296)),
      tambah("Darwis,", ...tokoh("pd", 50, 184, "Pak Darwis")),
      tambah("kelapa,", ...KELAPA_BAWAH.map((o) => ({ ...o, x: (o.x ?? 0) + 96 }))),
      tambah("membawa", kotak("gb", 98, 142, 84, 24, "#D6A25C", "#6B4423", { rx: 3, z: 2 }), roda("w1", 112), roda("w2", 168), garis("gh", 98, 150, -26, 6, "#6B4423", 2.4, { z: 2 })),
      tambah("hasil", teks("hs", 150, 90, "hasil panen", 10, W.oranye)),
      tambah("banyak.", ...KELAPA_ATAS.map((o) => ({ ...o, x: (o.x ?? 0) + 96 }))),
    ),
    k(
      SUARA_P3,
      bersih(0),
      tambah(0, judul("Ribuan Kelapa"), ...laut("lt", 104), ...dermaga("dk", 2, 172, 296), kotak("gb", 12, 142, 84, 24, "#D6A25C", "#6B4423", { rx: 3, z: 2 }), roda("w1", 26), roda("w2", 82)),
      tambah("kelapa", ...KELAPA_BAWAH, ...KELAPA_ATAS, teks("tq", 54, 92, "?", 36, W.merah)),
      tambah("Satria,", ...tokoh("st", 106, 184, "Satria")),
      tambah("Laras,", ...tokoh("lr", 142, 184, "Laras")),
      tambah("Genta,", ...tokoh("gt", 178, 184, "Genta")),
      tambah("Hendro,", ...tokoh("ph", 218, 184, "Pak Hendro")),
      tambah("Tiara!", ...tokoh("kt", 272, 184, "Kak Tiara"), emo("w_1", 106, 144, E.lambai, 16), emo("w_2", 142, 144, E.lambai, 16), emo("w_3", 178, 144, E.lambai, 16), emo("w_4", 218, 144, E.lambai, 16), emo("w_5", 272, 144, E.lambai, 16)),
    ),
  ],
};
