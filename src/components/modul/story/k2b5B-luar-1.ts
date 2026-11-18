import type { AdeganStory } from "./logika-story";
import { E, W, bedeng, emo, judul, kartu, keranjang, kotak, panah, rumput, tanganBagi, teks, tempatPetak, tokoh, tunas } from "./k2b5B-gambar";
import { bersih, hapus, idx, k, sorotkan, tambah, ubah } from "./k2b5B-bantu";

/*
 * Video metode global Kelas 2 Bab 5 Sub-Bab B "Bibit untuk Dua Petak": Dealing Out (Bagi Satu-Satu), Balance Scale (Neraca Seimbang), Doubling Check (Cek Dua Kali Lipat).
 * Naskah suara dari naskah/story-naskah-k2b5b.md. Bagian ini: pembuka (tiga kartu di bawah keranjang), Bagi Satu-Satu dan terapannya.
 */
export const NAMA_METODE = ["Dealing Out", "Balance Scale", "Doubling Check"] as const;
export const NAMA_METODE_ID = ["Bagi Satu-Satu", "Neraca Seimbang", "Cek Dua Kali Lipat"] as const;

/* ------------------------------ Pembuka: tiga kartu petani ------------------------------ */
const SUARA_O1 = "Di bawah keranjang bibit yang terguling tadi, Nia menemukan tiga kartu bergambar tentang cara petani menghitung bibit.";
const SUARA_O2 = "Bu Wati tersenyum. Itu cara petani membagi bibit tanpa salah hitung!";
const SUARA_O3 = "Tiga cara itu: Dealing Out, Balance Scale, dan Doubling Check.";
const SUARA_O4 = "Nama dalam bahasa Indonesia: Bagi Satu-Satu, Neraca Seimbang, dan Cek Dua Kali Lipat.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Tiga kartu di bawah keranjang",
  sumber: "Metode global: tiga cara petani membagi",
  latar: "#FEF3C7",
  ketukan: [
    k(
      SUARA_O1,
      tambah(0, judul("Kartu Cara Petani"), rumput("rm", 122)),
      tambah(idx(SUARA_O1, "keranjang"), ...keranjang("kj", 46, 150, 82)),
      tambah(idx(SUARA_O1, "Nia"), ...tokoh("ni", 254, 176, "Nia")),
      tambah(idx(SUARA_O1, "tiga"), teks("t3", 178, 44, "3 kartu", 11, W.merah)),
      tambah(idx(SUARA_O1, "kartu"), kotak("c0", 84, 56, 56, 56, "#FFF7ED", "#92400E", { rx: 5, tebal: 1.6 }), kotak("c1", 150, 56, 56, 56, "#FFF7ED", "#92400E", { rx: 5, tebal: 1.6 }), kotak("c2", 216, 56, 56, 56, "#FFF7ED", "#92400E", { rx: 5, tebal: 1.6 })),
      tambah(idx(SUARA_O1, "bergambar"), emo("e0", 112, 94, E.tangan, 26, { z: 3 }), emo("e1", 178, 94, E.neraca, 26, { z: 3 }), emo("e2", 244, 94, E.ulang, 26, { z: 3 })),
      sorotkan(idx(SUARA_O1, "bibit."), "c0", "c1", "c2"),
    ),
    k(
      SUARA_O2,
      sorotkan(0, "c0"),
      tambah(0, ...tokoh("bw", 190, 176, "Bu Wati")),
      tambah(idx(SUARA_O2, "tersenyum."), emo("sn", 214, 150, E.senyum, 18)),
      tambah(idx(SUARA_O2, "membagi"), tanganBagi("tg", 100, 138, 20)),
      tambah(idx(SUARA_O2, "salah"), emo("no", 128, 144, E.salah, 16)),
      tambah(idx(SUARA_O2, "hitung!"), emo("ok", 150, 144, E.benar, 16)),
    ),
    k(
      SUARA_O3,
      bersih(0),
      tambah(idx(SUARA_O3, "Tiga"), teks("jm", 150, 36, "3 cara", 13, W.merah)),
      tambah(idx(SUARA_O3, "Dealing"), ...kartu("m0", 14, 56, 140, 28, "#BBF7D0", ["1. Dealing Out"], 9.6)),
      tambah(idx(SUARA_O3, "Balance"), ...kartu("m1", 14, 96, 140, 28, "#FDE68A", ["2. Balance Scale"], 9.6)),
      tambah(idx(SUARA_O3, "Doubling"), ...kartu("m2", 14, 136, 140, 28, "#DDD6FE", ["3. Doubling Check"], 9.6)),
    ),
    k(
      SUARA_O4,
      tambah(idx(SUARA_O4, "Indonesia:"), teks("bi", 224, 42, "Bahasa Indonesia", 8.6, W.ungu)),
      tambah(idx(SUARA_O4, "Bagi"), ...kartu("n0", 160, 56, 130, 28, "#BBF7D0", ["Bagi Satu-Satu"], 9.6)),
      tambah(idx(SUARA_O4, "Neraca"), ...kartu("n1", 160, 96, 130, 28, "#FDE68A", ["Neraca Seimbang"], 9.6)),
      tambah(idx(SUARA_O4, "Cek"), ...kartu("n2", 160, 136, 130, 28, "#DDD6FE", ["Cek Dua Kali Lipat"], 9.6)),
    ),
  ],
};

/* ------------------------------ Bagi Satu-Satu: konsep ------------------------------ */
const SUARA_B1 = "Cara pertama, Dealing Out, atau Bagi Satu-Satu. Cara ini paling mudah dibayangkan.";
const SUARA_B2 = "Bagikan benda seperti membagi kartu, satu untuk tempat pertama, satu untuk tempat kedua, bergantian.";
const SUARA_B3 = "Lanjutkan terus sampai semua bendanya habis.";
const SUARA_B4 = "Kalau setiap tempat mendapat jumlah yang sama, itulah setengahnya, dan tidak ada benda yang tersisa.";
const PILE = [0, 1, 2, 3, 4, 5].map((i) => ({ x: 105 + 18 * i, y: 98 }));
const TL = [55, 85, 115].map((x) => ({ x, y: 156 }));
const TR = [185, 215, 245].map((x) => ({ x, y: 156 }));

export const ADEGAN_LUAR_BAGI: AdeganStory = {
  id: "luar-bagi",
  judul: "Dealing Out: Bagi Satu-Satu",
  sumber: "Metode global: Bagi Satu-Satu",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, judul("Bagi Satu-Satu"), teks("no", 150, 56, "1", 26, W.merah)),
      tambah(idx(SUARA_B1, "Dealing"), emo("tg", 150, 82, E.tangan, 20)),
      tambah(idx(SUARA_B1, "atau"), ...PILE.map((p, i) => tunas(`p${i}`, p.x, p.y, 6))),
      sorotkan(idx(SUARA_B1, "dibayangkan."), "p0", "p1", "p2", "p3", "p4", "p5"),
    ),
    k(
      SUARA_B2,
      ubah(0, { id: "p0", sorot: false }, { id: "p1", sorot: false }, { id: "p2", sorot: false }, { id: "p3", sorot: false }, { id: "p4", sorot: false }, { id: "p5", sorot: false }),
      tambah(idx(SUARA_B2, "membagi"), kotak("tL", 30, 128, 110, 44, "#ECFDF5", "#16A34A", { rx: 6, z: 0 }), kotak("tR", 160, 128, 110, 44, "#ECFDF5", "#16A34A", { rx: 6, z: 0 }), teks("lL", 85, 124, "tempat 1", 9, W.ungu), teks("lR", 215, 124, "tempat 2", 9, W.ungu)),
      ubah(idx(SUARA_B2, "satu"), { id: "p0", x: TL[0].x, y: TL[0].y }),
      ubah(idx(SUARA_B2, "satu", 2), { id: "p1", x: TR[0].x, y: TR[0].y }),
      tambah(idx(SUARA_B2, "bergantian."), emo("ul", 150, 190, E.ulang, 14)),
    ),
    k(
      SUARA_B3,
      hapus(0, "tg", "ul"),
      ubah(0, { id: "p2", x: TL[1].x, y: TL[1].y }),
      ubah(idx(SUARA_B3, "terus"), { id: "p3", x: TR[1].x, y: TR[1].y }),
      ubah(idx(SUARA_B3, "semua"), { id: "p4", x: TL[2].x, y: TL[2].y }, { id: "p5", x: TR[2].x, y: TR[2].y }),
      tambah(idx(SUARA_B3, "habis."), teks("hb", 150, 84, "habis", 11, W.hijau)),
    ),
    k(
      SUARA_B4,
      hapus(0, "hb"),
      tambah(idx(SUARA_B4, "jumlah"), teks("cL", 85, 108, "3", 12, W.merah), teks("cR", 215, 108, "3", 12, W.merah)),
      tambah(idx(SUARA_B4, "sama,"), teks("eq", 150, 148, "=", 22, W.hijau)),
      sorotkan(idx(SUARA_B4, "setengahnya,"), "tL", "tR"),
      tambah(idx(SUARA_B4, "tersisa."), emo("ok", 150, 100, E.benar, 20)),
    ),
  ],
};

/* ------------------------------ Bagi Satu-Satu: terapan ------------------------------ */
const SUARA_T1 = "Chacha membagi delapan bibit ke dua petak, satu-satu bergantian.";
const SUARA_T2 = "Habis, dan setiap petak berisi empat bibit.";
const SUARA_T3 = "Cocok kalau bendanya sedikit dan bisa dipindahkan satu per satu.";
const SUARA_T4 = "Kurang cocok kalau bendanya sangat banyak, karena membaginya satu-satu memakan waktu lama.";
const BD2 = { x: 70, y: 74, w: 160, h: 50 };
const slot2 = (sisi: 0 | 1, i: number) => tempatPetak(BD2.x, BD2.y, BD2.w, BD2.h, sisi, i);
const PILE8 = [0, 1, 2, 3, 4, 5, 6, 7].map((i) => ({ x: 94 + 14 * i, y: 44 }));

export const ADEGAN_LUAR_BAGI_TERAPAN: AdeganStory = {
  id: "luar-bagi-terapan",
  judul: "Bagi Satu-Satu dipakai di bedeng",
  sumber: "Metode global: terapan Bagi Satu-Satu",
  latar: "#ECFDF5",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Bagi Delapan Bibit"), rumput("rm", 134), ...tokoh("ch", 40, 178, "Chacha")),
      tambah(idx(SUARA_T1, "delapan"), ...PILE8.map((p, i) => tunas(`p${i}`, p.x, p.y, 5)), teks("n8", 150, 62, "8 bibit", 9, W.merah)),
      tambah(idx(SUARA_T1, "dua"), ...bedeng("bd", BD2.x, BD2.y, BD2.w, BD2.h), teks("d2", 262, 70, "2 petak", 8.6, W.hijau)),
      ...[0, 1].map((i) => ubah(idx(SUARA_T1, "satu-satu"), { id: `p${i}`, x: slot2(i as 0 | 1, 0).x, y: slot2(i as 0 | 1, 0).y })),
      tambah(idx(SUARA_T1, "satu-satu"), teks("s1", 150, 146, "1 - 1", 12, W.merah)),
      ...[2, 3, 4, 5, 6, 7].map((i) => ubah(idx(SUARA_T1, "bergantian."), { id: `p${i}`, x: slot2((i % 2) as 0 | 1, Math.floor(i / 2)).x, y: slot2((i % 2) as 0 | 1, Math.floor(i / 2)).y })),
    ),
    k(
      SUARA_T2,
      hapus(0, "n8", "s1", "d2"),
      tambah(0, emo("ok", 150, 54, E.benar, 20)),
      sorotkan(idx(SUARA_T2, "petak"), "bd-l", "bd-r"),
      tambah(idx(SUARA_T2, "empat"), teks("cl", 110, 140, "4", 14, W.merah), teks("cr", 190, 140, "4", 14, W.merah)),
      tambah(idx(SUARA_T2, "bibit."), ...kartu("kt", 50, 156, 200, 24, W.krem, ["setengah dari 8 adalah 4"], 10)),
    ),
    k(
      SUARA_T3,
      bersih(0),
      tambah(0, judul("Kapan Cocok?"), ...kartu("cc", 30, 38, 240, 28, W.hijauMuda, ["Cocok: benda sedikit"], 10)),
      tambah(idx(SUARA_T3, "sedikit"), ...[0, 1, 2, 3].map((i) => tunas(`s${i}`, 114 + 24 * i, 100, 7)), emo("ok", 36, 56, E.benar, 14)),
      tambah(idx(SUARA_T3, "dipindahkan"), tanganBagi("tg", 150, 132, 22), panah("pn", 138, 120, 14, -12, W.hijau, 2)),
      tambah(idx(SUARA_T3, "satu"), teks("p1", 150, 158, "1 per 1", 12, W.merah)),
    ),
    k(
      SUARA_T4,
      bersih(0),
      tambah(0, judul("Kapan Kurang Cocok?", W.merah), ...kartu("kc", 30, 38, 240, 28, W.merahMuda, ["Kurang cocok: benda sangat banyak"], 9)),
      tambah(idx(SUARA_T4, "banyak,"), ...Array.from({ length: 20 }, (_, i) => tunas(`b${i}`, 69 + 18 * (i % 10), 86 + 20 * Math.floor(i / 10), 5))),
      tambah(idx(SUARA_T4, "membaginya"), tanganBagi("tg", 150, 140, 22)),
      tambah(idx(SUARA_T4, "satu-satu"), teks("p1", 150, 166, "1 per 1", 12, W.merah)),
      tambah(idx(SUARA_T4, "waktu"), emo("jm", 220, 150, E.jam, 20)),
      tambah(idx(SUARA_T4, "lama."), emo("no", 36, 56, E.salah, 14)),
    ),
  ],
};
