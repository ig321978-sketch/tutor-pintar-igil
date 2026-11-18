import type { AdeganStory } from "./logika-story";
import {
  E,
  JAM_KANAN,
  JAM_KIRI,
  W,
  barisJadwal,
  bulanMalam,
  busurLangit,
  digital,
  emo,
  jam,
  judul,
  kartu,
  kotak,
  lapangan,
  langitLatar,
  matahari,
  panah,
  teks,
  titikBusur,
  tokoh,
} from "./k2b6B-gambar";
import { bersih, hapus, k, sorotkan, tambah, ubah } from "./k2b6B-bantu";

/*
 * Cerita orisinal IGIL "Jadwal Lomba Bu Ratna" (Kelas 2 Bab 6 Sub-Bab B), video materi.
 * Naskah suara dari naskah/story-naskah-k2b6b.md. Bagian ini: jam digital, bagian hari, mengurutkan kegiatan.
 */

/* ------------------------------ 4. Jam digital ------------------------------ */
const SUARA_D1 = "Nia membawa jam digital, yang menunjukkan waktu dengan angka.";
const SUARA_D2 = "Dua angka pertama jam, dua angka sesudah titik menit. Pukul tujuh tepat ditulis nol tujuh titik nol nol.";
const SUARA_D3 = "Jam digital sering memakai dua puluh empat jam, jadi pukul empat sore ditulis enam belas titik nol nol.";

export const ADEGAN_DIGITAL: AdeganStory = {
  id: "digital",
  judul: "Nia membawa jam digital",
  sumber: "Materi: jam digital",
  latar: "#F0FDFA",
  ketukan: [
    k(
      SUARA_D1,
      bersih(0),
      tambah(0, judul("Jam Digital"), langitLatar("lg", 150, "#E0F2FE"), ...lapangan("rm")),
      tambah("Nia", ...tokoh("ni", 40, 172, "Nia")),
      tambah("digital,", ...digital("dg", 90, 62, 7, 0, 120, 50, 26).slice(0, 1)),
      tambah("waktu", digital("dg", 90, 62, 7, 0, 120, 50, 26)[1]),
      sorotkan("angka.", "dg-k"),
    ),
    k(
      SUARA_D2,
      ubah(0, { id: "dg-k", sorot: false }),
      hapus(0, "dg-t"),
      tambah(0, teks("d1", 124, 98, "07", 26, "#38BDF8", { z: 2 }), teks("dt", 150, 98, ".", 26, "#4ADE80", { z: 2 }), teks("d2", 176, 98, "00", 26, "#FACC15", { z: 2 })),
      tambah("pertama", ...kartu("kj", 62, 124, 86, 20, "#E0F2FE", ["2 angka jam"], 9)),
      tambah("sesudah", ...kartu("km", 154, 124, 86, 20, "#FEF9C3", ["2 angka menit"], 9)),
      sorotkan("tujuh", "d1"),
      tambah("tepat", ...kartu("p7", 100, 36, 100, 20, W.hijauMuda, ["pukul 7 tepat"], 9)),
    ),
    k(
      SUARA_D3,
      bersih(0),
      tambah(0, judul("Dua Puluh Empat Jam"), ...jam("j", JAM_KIRI, 4, 0, false)),
      tambah("memakai", ...kartu("d24", 96, 34, 108, 22, W.langit, ["24 jam"], 11)),
      tambah("sore", ...matahari("mt", 262, 56, 11, "#FB923C")),
      tambah("pukul", ...kartu("p4", 24, 156, 108, 22, W.krem, ["pukul 4 sore"], 9.5)),
      tambah("enam", ...digital("dg", 160, 86, 16, 0, 118, 46, 24)),
      sorotkan("nol", "dg-k"),
    ),
  ],
};

/* ------------------------------ 5. Bagian hari ------------------------------ */
const SUARA_H1 = "Satu hari dibagi menjadi pagi, siang, sore, dan malam.";
const SUARA_H2 = "Pagi matahari terbit, siang tertinggi, sore turun, dan malam langit gelap.";
const SUARA_H3 = "Jarum pendek berputar dua kali sehari. Pukul enam bisa pagi atau sore, jadi sebut bagian harinya.";

const WARNA_H = [W.kuning, W.emas, W.oranye, W.lavender] as const;
const NAMA_H = ["pagi", "siang", "sore", "malam"] as const;
const EMO_H = ["\u{1F305}", "\u{1F31E}", "\u{1F307}", E.bulan] as const;

export const ADEGAN_BAGIAN_HARI: AdeganStory = {
  id: "bagian-hari",
  judul: "Pagi, siang, sore, dan malam",
  sumber: "Materi: bagian hari",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_H1,
      bersih(0),
      tambah(0, judul("Satu Hari"), ...kartu("sh", 100, 34, 100, 22, W.putih, ["1 hari"], 11)),
      ...NAMA_H.flatMap((n, j) => [
        tambah(`${n}${j === 3 ? "." : ","}`, kotak(`bg${j}-k`, 8 + j * 72, 78, 68, 46, WARNA_H[j], W.biru, { rx: 8, tebal: 1.6 }), teks(`bg${j}-n`, 42 + j * 72, 106, n, 12, W.biru, { z: 2 }), emo(`bg${j}-e`, 42 + j * 72, 146, EMO_H[j], 26)),
      ]),
    ),
    k(
      SUARA_H2,
      bersih(0),
      tambah(0, judul("Jalan Matahari"), langitLatar("lg", 160, "#BAE6FD"), ...lapangan("rm", 160), busurLangit("bs", 150, 160, 100, "#E0F2FE")),
      tambah("Pagi", ...matahari("mt", titikBusur(150, 160, 100, 195).x, titikBusur(150, 160, 100, 195).y, 11), ...kartu("lp", 22, 140, 62, 18, W.kuning, ["pagi"], 9.5)),
      ubah("siang", { id: "mt", x: 150, y: 60 }, { id: "mt-i", x: 150, y: 60 }),
      tambah("siang", ...kartu("ls", 118, 76, 64, 18, W.emas, ["siang"], 9.5)),
      ubah("sore", { id: "mt", x: titikBusur(150, 160, 100, 345).x, y: titikBusur(150, 160, 100, 345).y }, { id: "mt-i", x: titikBusur(150, 160, 100, 345).x, y: titikBusur(150, 160, 100, 345).y }, { id: "lg", warna: "#FDBA74" }),
      tambah("sore", ...kartu("lq", 216, 140, 62, 18, W.oranye, ["sore"], 9.5)),
      hapus("malam", "mt", "mt-i"),
      ubah("malam", { id: "lg", warna: W.malam }),
      tambah("gelap.", bulanMalam("bl", 150, 56, 11), ...kartu("lm", 118, 100, 64, 18, W.lavender, ["malam"], 9.5)),
    ),
    k(
      SUARA_H3,
      bersih(0),
      tambah(0, judul("Dua Kali Sehari")),
      tambah("dua", ...kartu("dk", 92, 34, 116, 22, W.langit, ["2 kali sehari"], 10)),
      tambah("enam", ...jam("ja", JAM_KIRI, 6, 0, false), ...jam("jb", JAM_KANAN, 6, 0, false)),
      tambah("pagi", ...kartu("pa", 38, 156, 80, 22, W.kuning, ["6 pagi"], 10), emo("ep", 78, 54, "\u{1F305}", 20)),
      tambah("sore,", ...kartu("pb", 182, 156, 80, 22, W.oranye, ["6 sore"], 10), emo("eb", 222, 54, "\u{1F307}", 20)),
      sorotkan("sebut", "pa-k", "pb-k"),
    ),
  ],
};

/* ------------------------------ 6. Urut kegiatan ------------------------------ */
const SUARA_U1 = "Jadwal Dika: pembukaan pukul tujuh pagi, lomba lari pukul sembilan pagi, makan siang pukul dua belas siang.";
const SUARA_U2 = "Tarik tambang pukul empat sore, pesta penutupan pukul tujuh malam.";
const SUARA_U3 = "Untuk mengurutkan, lihat jam dan bagian hari. Waktu lebih awal lebih dulu.";

const BARIS: { id: string; y: number; jam: string; nama: string; warna: string }[] = [
  { id: "r1", y: 40, jam: "pukul 7 pagi", nama: "Pembukaan", warna: W.kuning },
  { id: "r2", y: 68, jam: "pukul 9 pagi", nama: "Lomba lari", warna: W.kuning },
  { id: "r3", y: 96, jam: "pukul 12 siang", nama: "Makan siang", warna: W.emas },
  { id: "r4", y: 124, jam: "pukul 4 sore", nama: "Tarik tambang", warna: W.oranye },
  { id: "r5", y: 152, jam: "pukul 7 malam", nama: "Pesta penutupan", warna: W.lavender },
];
const baris = (i: number) => barisJadwal(BARIS[i].id, BARIS[i].y, BARIS[i].jam, BARIS[i].nama, BARIS[i].warna, 10, 270);

export const ADEGAN_URUT_KEGIATAN: AdeganStory = {
  id: "urut-kegiatan",
  judul: "Jadwal Dika",
  sumber: "Materi: mengurutkan kegiatan",
  latar: "#FEFCE8",
  ketukan: [
    k(
      SUARA_U1,
      bersih(0),
      tambah(0, judul("Jadwal Dika", W.ungu)),
      tambah("pembukaan", ...baris(0)),
      tambah("lomba", ...baris(1)),
      tambah("makan", ...baris(2)),
    ),
    k(
      SUARA_U2,
      tambah("Tarik", ...baris(3)),
      tambah("sore,", emo("e4", 150, 141, "\u{1F307}", 16, { z: 3 })),
      tambah("pesta", ...baris(4)),
      tambah("malam.", emo("e5", 150, 169, E.bulan, 16, { z: 3 })),
    ),
    k(
      SUARA_U3,
      hapus(0, "e4", "e5"),
      tambah("mengurutkan,", panah("ur", 291, 62, 0, 104, W.ungu, 2.4), teks("aw", 290, 56, "awal", 8, W.ungu), teks("ak", 288, 180, "akhir", 8, W.ungu)),
      sorotkan("jam", ...BARIS.map((b) => `${b.id}-j`)),
      tambah("bagian", emo("e1", 150, 57, "\u{1F305}", 16, { z: 3 }), emo("e2", 150, 85, "\u{1F305}", 16, { z: 3 }), emo("e3", 150, 113, "\u{1F31E}", 16, { z: 3 }), emo("e4", 150, 141, "\u{1F307}", 16, { z: 3 }), emo("e5", 150, 169, E.bulan, 16, { z: 3 })),
      sorotkan("awal", "r1-k"),
      tambah("dulu.", emo("ok", 26, 24, E.benar, 18)),
    ),
  ],
};
