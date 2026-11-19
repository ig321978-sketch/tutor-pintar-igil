import type { AdeganStory, Obj } from "./logika-story";
import { E, W, emo, jepit, judul, kartu, kotak, panah, bulat, tali, teks, tokoh, xTali } from "./k2b7B-gambar";
import { bersih, hapus, k, sorotkan, tambah, ubah } from "./k2b7B-bantu";

/*
 * Cerita orisinal IGIL "Pengumuman Bu Lia" (Kelas 2 Bab 7 Sub-Bab B), video metode global.
 * Naskah suara dari naskah/story-naskah-k2b7b.md. Bagian ini: Benchmark Numbers (Bilangan Patokan), Card Sort (Urut Kartu), terapannya, dan ringkasan.
 */

/** Patch memindah kartu `${id}` (lebar w) ke x baru. */
const pindahKartu = (id: string, x: number, w: number): (Partial<Obj> & { id: string })[] => [
  { id: `${id}-k`, x },
  { id: `${id}-t0`, x: x + w / 2 },
];
const BENDERA = "\u{1F6A9}";
const KARTU_ICON = "\u{1F0CF}";
const PATOKAN = [0, 25, 50, 75, 100];
const GARIS_PATOKAN = [0, 50, 100];

/* ------------------------------ Benchmark Numbers: konsep ------------------------------ */
const SUARA_P1 = "Cara kedua, Benchmark Numbers, atau Bilangan Patokan.";
const SUARA_P2 = "Pilih satu bilangan yang mudah sebagai patokan, misalnya lima puluh.";
const SUARA_P3 = "Bandingkan setiap bilangan dengan patokan itu. Lebih dari lima puluh berarti besar, kurang dari lima puluh berarti kecil.";
const SUARA_P4 = "Bilangan yang besar pasti lebih besar daripada bilangan yang kecil.";

export const ADEGAN_LUAR_PATOKAN: AdeganStory = {
  id: "luar-patokan",
  judul: "Benchmark Numbers: Bilangan Patokan",
  sumber: "Metode global: Benchmark Numbers (konsep)",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_P1,
      bersih(0),
      tambah(0, judul("Cara Kedua")),
      tambah("Benchmark", ...kartu("nm", 30, 38, 240, 28, W.krem, ["Benchmark Numbers"], 13)),
      tambah("Bilangan", teks("nid", 150, 100, "Bilangan Patokan", 12, W.ungu)),
      tambah("Patokan.", emo("fl", 150, 156, BENDERA, 34)),
    ),
    k(
      SUARA_P2,
      bersih(0),
      tambah(0, judul("Pilih Patokan"), ...tali("tl", 120, 0, 100, PATOKAN)),
      tambah("satu", teks("n1", 150, 62, "1 patokan", 11, W.merah)),
      tambah("patokan,", emo("fl", xTali(50, 0, 100), 108, BENDERA, 24, { z: 4 })),
      sorotkan("patokan,", "tlp50"),
      tambah("lima", ...kartu("pk", 100, 156, 100, 26, W.krem, ["patokan = 50"], 12)),
    ),
    k(
      SUARA_P3,
      hapus(0, "n1", "pk-k", "pk-t0"),
      tambah("Lebih", kotak("zb", 150, 88, 126, 10, W.hijauMuda, W.hijau, { rx: 2, z: 1 }), teks("tb", 213, 172, "lebih dari 50 = besar", 9, W.hijau)),
      tambah("kurang", kotak("zk", 24, 88, 126, 10, W.merahMuda, W.merah, { rx: 2, z: 1 }), teks("tk", 86, 172, "kurang dari 50 = kecil", 9, W.merah)),
    ),
    k(
      SUARA_P4,
      sorotkan("besar", "zb"),
      tambah("besar@2", panah("pn", 70, 76, 160, 0, W.ungu, 2.6)),
      ubah("daripada", { id: "zb", sorot: false }),
      sorotkan("kecil.", "zk"),
      tambah("kecil.", emo("ok", 276, 64, E.benar, 20)),
    ),
  ],
};

/* ------------------------------ Benchmark Numbers: terapan ------------------------------ */
const SUARA_Q1 = "Dika membandingkan delapan puluh tiga dan dua puluh delapan.";
const SUARA_Q2 = "Delapan puluh tiga lebih dari lima puluh, dan dua puluh delapan kurang dari lima puluh. Jadi delapan puluh tiga lebih besar.";
const SUARA_Q3 = "Cocok kalau kedua bilangan berada di sisi patokan yang berbeda.";
const SUARA_Q4 = "Kurang cocok kalau keduanya dekat sekali, misalnya enam puluh satu dan enam puluh tujuh.";

export const ADEGAN_LUAR_PATOKAN_TERAPAN: AdeganStory = {
  id: "luar-patokan-terapan",
  judul: "Dika membandingkan dengan patokan",
  sumber: "Metode global: Benchmark Numbers (terapan)",
  latar: "#F5F3FF",
  ketukan: [
    k(
      SUARA_Q1,
      bersih(0),
      tambah(0, judul("Dika Membandingkan"), ...tali("tl", 112, 0, 100, GARIS_PATOKAN)),
      tambah("Dika", ...tokoh("dk", 40, 168, "Dika")),
      tambah("delapan", ...jepit("tl", 112, 83, 0, 100, W.merah)),
      tambah("delapan@2", ...jepit("tl", 112, 28, 0, 100, W.merah)),
    ),
    k(
      SUARA_Q2,
      sorotkan("Delapan", "tlp83"),
      tambah("lebih", panah("pa", 152, 98, 80, 0, W.hijau, 2.4), teks("ta", 192, 84, "83 > 50", 10, W.hijau)),
      sorotkan("kurang", "tlp28"),
      tambah("kurang", panah("pb", 148, 98, -52, 0, W.merah, 2.4), teks("tc", 104, 84, "28 < 50", 10, W.merah)),
      tambah("Jadi", ...kartu("hs", 70, 150, 160, 24, W.hijauMuda, ["83 lebih besar"], 11)),
    ),
    k(
      SUARA_Q3,
      bersih(0),
      tambah(0, judul("Kapan Cocok?"), ...kartu("cc", 90, 40, 120, 24, W.hijauMuda, ["Cocok"], 12), ...tali("tl", 120, 0, 100, GARIS_PATOKAN)),
      tambah("sisi", bulat("da", xTali(28, 0, 100), 104, 6, W.merahMuda, W.merah), bulat("db", xTali(83, 0, 100), 104, 6, W.hijauMuda, W.hijau)),
      tambah("patokan", emo("fl", 150, 106, BENDERA, 22, { z: 4 })),
      tambah("berbeda.", emo("ok", 150, 170, E.benar, 24)),
    ),
    k(
      SUARA_Q4,
      bersih(0),
      tambah(0, judul("Kapan Kurang Cocok?"), ...kartu("kc", 80, 40, 140, 24, W.merahMuda, ["Kurang cocok"], 12), ...tali("tl", 120, 0, 100, GARIS_PATOKAN)),
      tambah("enam", ...jepit("tl", 120, 61, 0, 100, W.merah)),
      tambah("enam@2", ...jepit("tl", 120, 67, 0, 100, W.merah)),
      tambah("dekat", teks("dk", 185, 172, "terlalu dekat", 10, W.merah)),
      tambah("tujuh.", emo("x1", 185, 100, E.salah, 22)),
    ),
  ],
};

/* ------------------------------ Card Sort: konsep ------------------------------ */
const SUARA_K1 = "Cara ketiga, Card Sort, atau Urut Kartu.";
const SUARA_K2 = "Tulis tiap bilangan pada satu kartu, lalu susun kartu dari yang kecil ke yang besar.";
const SUARA_K3 = "Tukar dua kartu yang letaknya terbalik, sampai semua kartu berurutan.";
const SUARA_K4 = "Kartu paling kiri paling kecil, dan kartu paling kanan paling besar.";

export const ADEGAN_LUAR_KARTU: AdeganStory = {
  id: "luar-kartu",
  judul: "Card Sort: Urut Kartu",
  sumber: "Metode global: Card Sort (konsep)",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_K1,
      bersih(0),
      tambah(0, judul("Cara Ketiga")),
      tambah("Card", ...kartu("nm", 50, 38, 200, 28, W.krem, ["Card Sort"], 13)),
      tambah("Urut", teks("nid", 150, 100, "Urut Kartu", 12, W.ungu)),
      tambah("Kartu.", emo("ic", 150, 156, KARTU_ICON, 34)),
    ),
    k(
      SUARA_K2,
      bersih(0),
      tambah(0, judul("Satu Bilangan, Satu Kartu")),
      tambah("bilangan", ...kartu("a0", 24, 60, 76, 44, W.kuningTim, ["52"], 18), ...kartu("a1", 112, 60, 76, 44, W.biruTim, ["18"], 18), ...kartu("a2", 200, 60, 76, 44, W.hijauTim, ["90"], 18)),
      tambah("satu", teks("n1", 150, 44, "1 kartu", 11, W.merah)),
      tambah("susun", panah("pa", 30, 128, 240, 0, W.ungu, 2.6)),
      tambah("kecil", teks("kc", 54, 150, "kecil", 10, W.hijau)),
      tambah("besar.", teks("bs", 246, 150, "besar", 10, W.merah)),
    ),
    k(
      SUARA_K3,
      hapus(0, "n1", "pa", "kc", "bs"),
      sorotkan("Tukar", "a0-k", "a1-k"),
      tambah("dua", teks("n2", 150, 44, "2 kartu", 11, W.merah)),
      tambah("terbalik,", panah("p1", 90, 116, 36, 0, W.merah, 2.4), panah("p2", 122, 124, -36, 0, W.merah, 2.4)),
      ubah("berurutan.", ...pindahKartu("a1", 24, 76), ...pindahKartu("a0", 112, 76), { id: "a0-k", sorot: false }, { id: "a1-k", sorot: false }),
      hapus("berurutan.", "p1", "p2"),
    ),
    k(
      SUARA_K4,
      hapus(0, "n2"),
      sorotkan("kiri", "a1-k"),
      tambah("kiri", teks("kc", 62, 142, "paling kecil", 10, W.hijau)),
      sorotkan("kanan", "a2-k"),
      tambah("kanan", teks("bs", 238, 142, "paling besar", 10, W.merah)),
      tambah("besar.", emo("ok", 150, 150, E.benar, 22)),
    ),
  ],
};

/* ------------------------------ Card Sort: terapan ------------------------------ */
const SUARA_R1 = "Chacha menyusun kartu lima puluh delapan, tiga puluh enam, dan tujuh puluh dua.";
const SUARA_R2 = "Ia menukar kartu sampai urutannya tiga puluh enam, lima puluh delapan, tujuh puluh dua.";
const SUARA_R3 = "Cocok kalau bilangannya banyak dan harus diurutkan semua.";
const SUARA_R4 = "Kurang cocok kalau hanya membandingkan dua bilangan, karena menulis kartu lebih lama.";

const ENAM = [63, 12, 88, 41, 25, 70];
const urutEnam = [...ENAM].sort((p, q) => p - q);

export const ADEGAN_LUAR_KARTU_TERAPAN: AdeganStory = {
  id: "luar-kartu-terapan",
  judul: "Chacha menyusun kartu bilangan",
  sumber: "Metode global: Card Sort (terapan)",
  latar: "#FEFCE8",
  ketukan: [
    k(
      SUARA_R1,
      bersih(0),
      tambah(0, judul("Chacha Menyusun Kartu")),
      tambah("Chacha", ...tokoh("ch", 150, 164, "Chacha")),
      tambah("lima", ...kartu("c0", 24, 60, 76, 44, W.kuningTim, ["58"], 18)),
      tambah("tiga", ...kartu("c1", 112, 60, 76, 44, W.biruTim, ["36"], 18)),
      tambah("tujuh", ...kartu("c2", 200, 60, 76, 44, W.hijauTim, ["72"], 18)),
    ),
    k(
      SUARA_R2,
      sorotkan("menukar", "c0-k", "c1-k"),
      tambah("menukar", panah("p1", 90, 118, 36, 0, W.merah, 2.4), panah("p2", 122, 126, -36, 0, W.merah, 2.4)),
      ubah("tiga", ...pindahKartu("c1", 24, 76), ...pindahKartu("c0", 112, 76)),
      hapus("tiga", "p1", "p2"),
      ubah("tiga", { id: "c0-k", sorot: false }, { id: "c1-k", sorot: false }),
      sorotkan("tujuh", "c2-k"),
      tambah("dua.", emo("ok", 150, 128, E.benar, 22)),
    ),
    k(
      SUARA_R3,
      bersih(0),
      tambah(0, judul("Kapan Cocok?"), ...kartu("cc", 90, 34, 120, 24, W.hijauMuda, ["Cocok"], 12)),
      tambah(
        "banyak",
        ...ENAM.flatMap((n, i) => kartu(`e${i}`, 12 + i * 46, 78, 40, 36, [W.kuningTim, W.biruTim, W.hijauTim][i % 3], [String(n)], 12)),
      ),
      ubah("diurutkan", ...ENAM.flatMap((n, i) => pindahKartu(`e${i}`, 12 + urutEnam.indexOf(n) * 46, 40))),
      tambah("diurutkan", panah("pa", 20, 134, 260, 0, W.ungu, 2.4)),
      tambah("semua.", emo("ok", 150, 168, E.benar, 24)),
    ),
    k(
      SUARA_R4,
      bersih(0),
      tambah(0, judul("Kapan Kurang Cocok?"), ...kartu("kc", 80, 34, 140, 24, W.merahMuda, ["Kurang cocok"], 12)),
      tambah("dua", teks("n2", 150, 76, "2 bilangan", 11, W.merah), ...kartu("t0", 74, 88, 60, 34, W.biruTim, ["47"], 16), ...kartu("t1", 166, 88, 60, 34, W.kuningTim, ["74"], 16)),
      tambah("menulis", emo("ct", 110, 160, E.catat, 24)),
      tambah("lama.", emo("jm", 190, 160, "\u{23F3}", 24), emo("x1", 150, 160, E.salah, 22)),
    ),
  ],
};

/* ------------------------------ Ringkasan ------------------------------ */
const SUARA_G1 = "Kita sudah melihat tiga cara. Mana yang pas? Itu tergantung tugasnya.";
const SUARA_G2 = "Ingin melihat jarak dua bilangan, pakai Tabel Seratus. Ingin cepat memilih yang lebih besar, pakai Bilangan Patokan.";
const SUARA_G3 = "Ingin mengurutkan banyak bilangan, pakai Urut Kartu. Apa pun caranya, lihat puluhannya dulu.";
const SUARA_G4 = "Menurutmu, untuk mengurutkan lima tim, kamu pilih cara yang mana?";

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan tiga cara",
  sumber: "Metode global: ringkasan",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_G1,
      bersih(0),
      tambah(0, judul("Tiga Cara Membandingkan")),
      tambah("tiga", teks("n3", 252, 40, "3 cara", 10, W.ungu), ...kartu("r0", 14, 44, 130, 32, W.krem, ["1. Tabel Seratus"], 10)),
      tambah("cara.", ...kartu("r1", 14, 84, 130, 32, W.krem, ["2. Bilangan Patokan"], 10)),
      tambah("pas?", ...kartu("r2", 14, 124, 130, 32, W.krem, ["3. Urut Kartu"], 10)),
    ),
    k(
      SUARA_G2,
      sorotkan("Tabel", "r0-k"),
      tambah("jarak", ...kartu("g0", 156, 44, 134, 32, W.hijauMuda, ["jarak 2 bilangan"], 10)),
      ubah("cepat", { id: "r0-k", sorot: false }),
      tambah("cepat", ...kartu("g1", 156, 84, 134, 32, W.hijauMuda, ["cepat pilih yang besar"], 10)),
      sorotkan("Patokan.", "r1-k"),
    ),
    k(
      SUARA_G3,
      ubah(0, { id: "r1-k", sorot: false }),
      sorotkan("Urut", "r2-k"),
      tambah("mengurutkan", ...kartu("g2", 156, 124, 134, 32, W.hijauMuda, ["urut banyak bilangan"], 10)),
      tambah("puluhannya", ...kartu("pp", 40, 168, 220, 26, W.kuning, ["Lihat puluhannya dulu!"], 12)),
    ),
    k(
      SUARA_G4,
      bersih(0),
      tambah(0, judul("Pilihan Kamu")),
      tambah("lima", ...[0, 1, 2, 3, 4].flatMap((i) => kartu(`t${i}`, 10 + i * 58, 44, 54, 40, [W.kuningTim, W.biruTim, W.hijauTim][i % 3], [`Tim ${i + 1}`], 11))),
      tambah("cara", emo("i0", 90, 132, "\u{1F522}", 28), emo("i1", 150, 132, BENDERA, 28), emo("i2", 210, 132, KARTU_ICON, 28)),
      tambah("mana?", emo("pk", 150, 182, E.pikir, 28)),
    ),
  ],
};
