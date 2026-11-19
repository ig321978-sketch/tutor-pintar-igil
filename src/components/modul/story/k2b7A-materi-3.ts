import type { AdeganStory, Obj } from "./logika-story";
import { E, W, benda, emo, gudang, ikat, judul, kartu, kotak, lantai, lepas, panah, papanTim, sapu, teks, tokoh, tong } from "./k2b7A-gambar";
import { bersih, hapus, k, tambah, ubah } from "./k2b7A-bantu";

/*
 * Cerita orisinal IGIL "Botol Pak Ujang" (Kelas 2 Bab 7 Sub-Bab A), awal cerita Bank Sampah Sekolah.
 * Naskah suara dari naskah/story-naskah-k2b7a.md. Bagian ini: salah langkah menulis terbalik, kira-kira lalu buktikan, dan jembatan ke Sub-Bab B.
 */

/* ------------------------------ 7. Salah langkah: menulis terbalik ------------------------------ */
const SUARA_T1 = "Chacha menulis laporan tim Kuning: angka delapan dulu, lalu angka tiga.";
const SUARA_T2 = "Pak Ujang membaca, delapan puluh tiga botol? Tim Kuning bersorak, padahal botolnya hanya tiga puluh delapan!";
const SUARA_T3 = "Dika berkata, baca dan tulis puluhan dulu. Tiga puluh delapan ditulis tiga, lalu delapan.";

const KUNING_IKAT: Obj[] = [...[0, 1, 2].flatMap((i) => ikat(`ik${i}`, 118 + i * 44, 42, "botol")), ...lepas("lp", 126, 76, 8)];

export const ADEGAN_TULIS_TERBALIK: AdeganStory = {
  id: "tulis-terbalik",
  judul: "Laporan yang tertulis terbalik",
  sumber: "Materi: salah langkah, angka tertukar",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Laporan Tim Kuning"), ...tokoh("ch", 40, 184, "Chacha"), kotak("kt", 18, 34, 90, 62, "#FFFFFF", W.coklat, { rx: 4, tebal: 2.4 })),
      tambah("angka", teks("w", 63, 82, "8", 38, W.biru)),
      ubah("tiga.", { id: "w", isi: "83" }),
      tambah("delapan", teks("t8", 63, 52, "8 dulu", 9, W.merah)),
      tambah("tiga.", teks("t3", 63, 108, "lalu 3", 9, W.merah)),
    ),
    k(
      SUARA_T2,
      hapus(0, "t8", "t3"),
      tambah("Pak", ...tokoh("pu", 264, 184, "Pak Ujang")),
      tambah("membaca,", ...kartu("bb", 176, 126, 112, 26, W.krem, ["83 botol?"], 10)),
      tambah("bersorak,", emo("s1", 140, 150, E.sorak, 24), emo("s2", 170, 176, E.sorak, 20)),
      tambah("padahal", ...KUNING_IKAT),
      tambah("hanya", teks("n38", 180, 118, "hanya 38", 10, W.merah)),
    ),
    k(
      SUARA_T3,
      hapus(0, "bb-k", "bb-t0", "s1", "s2", "pu", "pu-n", "pu-cp", "pu-rm", "pu-sg", "n38"),
      tambah("Dika", ...tokoh("dk", 264, 184, "Dika")),
      ubah("Tiga", { id: "w", isi: "38" }),
      tambah("puluhan", teks("p3", 63, 52, "puluhan 3", 9, W.merah)),
      tambah("delapan", teks("p8", 63, 110, "satuan 8", 9, W.merah)),
      tambah("ditulis", emo("ok", 100, 120, E.benar, 22)),
    ),
  ],
};

/* ------------------------------ 8. Kira-kira lalu buktikan ------------------------------ */
const SUARA_K1 = "Sekarang ada setumpuk kaleng. Nia mengira-ngira, ada kira-kira empat puluh kaleng.";
const SUARA_K2 = "Keliru boleh. Ayo kita buktikan: ikat setiap sepuluh kaleng.";
const SUARA_K3 = "Ada empat ikat dan enam kaleng lepas, yaitu empat puluh enam. Perkiraan Nia dekat sekali!";

/** Setumpuk kaleng piramida (lima, empat, tiga, dua, satu) dengan titik tengah alas di (cx, yb). */
const tumpukKaleng = (cx: number, yb: number): Obj[] => {
  const out: Obj[] = [];
  let n = 0;
  for (let baris = 0; baris < 5; baris += 1) {
    const isi = 5 - baris;
    for (let i = 0; i < isi; i += 1) out.push(...benda(`tk${n++}`, cx + (i - (isi - 1) / 2) * 11, yb - baris * 12 - 6, "kaleng"));
  }
  return out;
};

export const ADEGAN_KIRA_KIRA: AdeganStory = {
  id: "kira-kira",
  judul: "Kira-kira lalu buktikan",
  sumber: "Materi: kira-kira, buktikan dengan ikat",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_K1,
      tambah(0, judul("Setumpuk Kaleng"), ...lantai("lt", 150), ...tong("tb", 220, 152, "biru")),
      tambah("setumpuk", ...tumpukKaleng(130, 152)),
      tambah("Nia", ...tokoh("ni", 40, 184, "Nia")),
      tambah("mengira-ngira,", emo("pk", 62, 124, E.pikir, 20), ...kartu("kr", 24, 62, 80, 30, W.krem, ["kira-kira", "40"], 9)),
    ),
    k(
      SUARA_K2,
      bersih(0),
      tambah(0, judul("Buktikan: Ikat Sepuluh"), ...lantai("lt", 150), ...tokoh("ni", 40, 184, "Nia")),
      tambah("buktikan:", ...lepas("lp", 180, 72, 10, "kaleng")),
      tambah("setiap", ...ikat("i1", 100, 72, "kaleng")),
      tambah("sepuluh", teks("s10", 119, 112, "10 kaleng", 10, W.ungu), emo("ok", 262, 120, E.jempol, 20)),
    ),
    k(
      SUARA_K3,
      bersih(0),
      tambah(0, judul("Empat Ikat, Enam Lepas"), ...lantai("lt", 150)),
      tambah("empat", ...[0, 1, 2, 3].flatMap((i) => ikat(`k${i}`, 16 + i * 44, 56, "kaleng")), teks("e1", 90, 104, "4 ikat", 10, W.ungu)),
      tambah("enam", ...lepas("lp", 204, 50, 6, "kaleng"), teks("e2", 229, 104, "6 lepas", 10, W.ungu)),
      tambah("empat@2", teks("e3", 150, 142, "40 + 6 = 46", 15, W.hijau)),
      tambah("dekat", ...kartu("kr", 100, 152, 100, 26, W.krem, ["kira-kira 40"], 9), panah("pn", 150, 150, 0, -2, W.merah, 2)),
      tambah("sekali!", emo("bt", 262, 140, E.bintang, 24)),
    ),
  ],
};

/* ------------------------------ 9. Menyapu dan jembatan ke Sub-Bab B ------------------------------ */
const SUARA_P1 = "Chacha menepati taruhannya dan menyapu seluruh gudang sambil bersenandung.";
const SUARA_P2 = "Bu Lia datang membawa papan pengumuman dan bertanya, tim mana yang mengumpulkan lebih banyak?";
const SUARA_P3 = "Menurutmu, bagaimana cara membandingkan dua bilangan? Terima kasih, Chacha, Dika, Nia, Bu Sari, dan Pak Ujang!";

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Menyapu dan Bu Lia datang",
  sumber: "Materi: menyapu gudang, jembatan ke Sub-Bab B",
  latar: "#FDF4FF",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Menepati Taruhan"), ...lantai("lt", 140), ...gudang("gd", 150, 70, 110, 70)),
      tambah("Chacha", ...tokoh("ch", 60, 184, "Chacha")),
      tambah("menyapu", ...sapu("sp", 90, 190), emo("db", 116, 172, E.debu, 18)),
      tambah("bersenandung.", emo("n1", 36, 130, E.nada, 18), emo("n2", 84, 120, E.nada, 14)),
    ),
    k(
      SUARA_P2,
      tambah("Bu", ...tokoh("bl", 278, 132, "Bu Lia", 22)),
      tambah("papan", ...papanTim("pn", 214, 30, "Pengumuman", "#FFFFFF", 70)),
      tambah("bertanya,", emo("tq", 270, 104, E.tanya, 22)),
      tambah("banyak?", ...papanTim("tm", 96, 36, "tim mana?", "#FDE68A", 60)),
    ),
    k(
      SUARA_P3,
      bersih(0),
      tambah(0, judul("Terima Kasih!"), ...lantai("lt", 150)),
      tambah("Menurutmu,", teks("q2", 150, 50, "2 bilangan?", 13, W.ungu), emo("tq", 150, 84, E.tanya, 26)),
      tambah("Menurutmu,", ...tokoh("ch", 30, 184, "Chacha")),
      tambah("Chacha,", ...tokoh("dk", 90, 184, "Dika")),
      tambah("Dika,", ...tokoh("ni", 150, 184, "Nia")),
      tambah("Nia,", ...tokoh("bs", 210, 184, "Bu Sari")),
      tambah("Bu", ...tokoh("pu", 270, 184, "Pak Ujang"), emo("lb", 150, 132, E.lambai, 24)),
    ),
  ],
};
