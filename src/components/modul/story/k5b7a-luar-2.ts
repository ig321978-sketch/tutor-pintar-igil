import type { AdeganStory } from "./logika-story";
import { W, judul, kartu, kotak, segitiga, tabel, tandaSiku, tandaSisi, teks } from "./k5b7a-gambar";
import { bersih, k, sorotkan, tambah } from "./k5b7a-bantu";

/* ------------------------------ LB1. Side-Angle Classification: konsep ------------------------------ */
const KOL_GRID = [66, 68, 68, 68];

export const ADEGAN_LUAR_KLASIFIKASI: AdeganStory = {
  id: "luar-klasifikasi",
  judul: "Side-Angle Classification: konsep",
  sumber: "Metode luar 3: nama segitiga dari label sudut dan label sisi",
  latar: "#F5F3FF",
  ketukan: [
    k(
      "Metode ketiga, Side-Angle Classification: setiap segitiga diberi dua label, satu dari sudutnya dan satu dari sisinya.",
      tambah(2, judul("Side-Angle Classification")),
      tambah(9, teks("lt1", 80, 40, "label sudut", 9.4, W.ungu), ...kartu("ls", 15, 46, 130, 100, W.langit, ["lancip", "siku-siku", "tumpul"], 10)),
      tambah(13, teks("lt2", 220, 40, "label sisi", 9.4, W.ungu), ...kartu("lr", 155, 46, 130, 100, W.hijauMuda, ["sama sisi", "sama kaki", "sembarang"], 10)),
    ),
    k(
      "Label sudut ditentukan sudut terbesarnya: semua lancip, ada satu siku-siku, atau ada satu tumpul.",
      bersih(0),
      tambah(0, judul("label sudut")),
      tambah(5, ...kartu("a1", 30, 34, 240, 38, W.hijauMuda, ["semua sudut lancip", "segitiga lancip"], 9.2)),
      tambah(7, ...kartu("a2", 30, 82, 240, 38, W.langit, ["ada satu sudut siku-siku", "segitiga siku-siku"], 9.2)),
      tambah(11, ...kartu("a3", 30, 130, 240, 38, W.merahMuda, ["ada satu sudut tumpul", "segitiga tumpul"], 9.2)),
    ),
    k(
      "Label sisi dilihat dari banyak sisi sama panjang: tiga sisi sama berarti sama sisi, hanya dua sama berarti sama kaki, tidak ada yang sama berarti sembarang.",
      bersih(0),
      tambah(0, judul("label sisi")),
      tambah(8, ...kartu("b1", 30, 34, 240, 38, W.hijauMuda, ["3 sisi sama panjang", "segitiga sama sisi"], 9.2)),
      tambah(14, ...kartu("b2", 30, 82, 240, 38, W.langit, ["hanya 2 sisi sama panjang", "segitiga sama kaki"], 9.2)),
      tambah(20, ...kartu("b3", 30, 130, 240, 38, W.krem, ["tidak ada yang sama", "segitiga sembarang"], 9.2)),
    ),
    k(
      "Gabungkan dua label menjadi nama lengkap, misalnya siku-siku sama kaki atau tumpul sama kaki. Segitiga sama sisi selalu lancip, karena tiap sudutnya enam puluh derajat.",
      bersih(0),
      tambah(0, judul("sudut dan sisi digabung")),
      tambah(0, ...tabel("kg", 15, 34, KOL_GRID, [["", "sama sisi", "sama kaki", "sembarang"], ["lancip", "✓", "✓", "✓"], ["siku-siku", "✗", "✓", "✓"], ["tumpul", "✗", "✓", "✓"]], 24, 8.6)),
      sorotkan(7, "kg-s22", "kg-t22"),
      sorotkan(11, "kg-s32", "kg-t32"),
      sorotkan(14, "kg-t11", "kg-t21", "kg-t31"),
      tambah(22, teks("n60", 150, 150, "sama sisi: tiap sudut 60°", 9.6, W.merah), teks("n61", 150, 166, "jadi hanya cocok dengan lancip", 9.6, W.merah)),
    ),
  ],
};

/* ------------------------------ LB2. Side-Angle Classification: penerapan ------------------------------ */
export const ADEGAN_LUAR_KLASIFIKASI_TERAPAN: AdeganStory = {
  id: "luar-klasifikasi-terapan",
  judul: "Side-Angle Classification: penerapan pada segitiga Buku Siswa",
  sumber: "Metode luar 3: penerapan pada segitiga ABC dan PQR hlm. 204–206",
  latar: "#FAF5FF",
  ketukan: [
    k(
      "Segitiga ABC dari buku: siku-siku di B dan sisi AB sama panjang dengan BC. Labelnya siku-siku dan sama kaki, jadi namanya segitiga siku-siku sama kaki.",
      tambah(0, judul("segitiga ABC dari buku")),
      tambah(1, segitiga("abc", 30, 150, [[0, 0], [70, 0], [0, -70]], W.langit), tandaSiku("sk", 30, 150, 10, 1, -1), tandaSisi("ta", 30, 150, 30, 80), tandaSisi("tb", 30, 150, 100, 150), teks("tA", 22, 76, "A", 9.6), teks("tB", 22, 164, "B", 9.6), teks("tC", 108, 164, "C", 9.6)),
      tambah(4, ...kartu("k1", 160, 40, 130, 30, W.krem, ["label sudut: siku-siku"], 8.4)),
      tambah(8, ...kartu("k2", 160, 80, 130, 30, W.krem, ["label sisi: sama kaki"], 8.4)),
      tambah(19, ...kartu("k3", 160, 124, 130, 44, W.hijauMuda, ["segitiga siku-siku", "sama kaki"], 9)),
    ),
    k(
      "Segitiga PQR: sudutnya tumpul dan sisi PQ sama dengan QR. Labelnya tumpul dan sama kaki, jadi segitiga tumpul sama kaki.",
      bersih(0),
      tambah(0, judul("segitiga PQR dari buku")),
      tambah(1, segitiga("pqr", 20, 140, [[0, 0], [60, -20], [120, 0]], W.merahMuda), tandaSisi("tp", 20, 140, 80, 120), tandaSisi("tq", 80, 120, 140, 140), teks("tP", 12, 154, "P", 9.6), teks("tQ", 80, 112, "Q", 9.6), teks("tR", 148, 154, "R", 9.6)),
      tambah(3, ...kartu("k1", 160, 40, 130, 30, W.krem, ["label sudut: tumpul"], 8.4)),
      tambah(5, ...kartu("k2", 160, 80, 130, 30, W.krem, ["label sisi: sama kaki"], 8.4)),
      tambah(15, ...kartu("k3", 160, 124, 130, 44, W.hijauMuda, ["segitiga tumpul", "sama kaki"], 9)),
    ),
    k(
      "Segitiga sama sisi: tiap sudut enam puluh derajat, semua lancip, dan ketiga sisi sama panjang. Labelnya lancip dan sama sisi.",
      bersih(0),
      tambah(0, judul("segitiga sama sisi")),
      tambah(0, segitiga("sg", 20, 150, [[0, 0], [100, 0], [50, -86.6]], W.krem), tandaSisi("t1", 20, 150, 120, 150), tandaSisi("t2", 120, 150, 70, 63.4), tandaSisi("t3", 20, 150, 70, 63.4)),
      tambah(5, teks("v1", 48, 140, "60°", 8.4, W.ungu), teks("v2", 92, 140, "60°", 8.4, W.ungu), teks("v3", 70, 96, "60°", 8.4, W.ungu)),
      tambah(15, ...kartu("k3", 160, 100, 130, 44, W.hijauMuda, ["segitiga lancip", "sama sisi"], 9)),
    ),
    k(
      "Satu cara cepat: siku-siku sama sisi tidak mungkin, karena sama sisi berarti tiap sudut enam puluh, bukan sembilan puluh. Kombinasi mustahil bisa dicoret.",
      bersih(0),
      tambah(0, judul("mencoret kombinasi mustahil")),
      tambah(0, ...kartu("c1", 20, 40, 260, 36, W.hijauMuda, ["sama sisi: tiap sudut 60°"], 9.6)),
      tambah(11, ...kartu("c2", 20, 88, 260, 36, W.langit, ["siku-siku: ada sudut 90°"], 9.6)),
      tambah(16, teks("c3", 150, 146, "60° tidak sama dengan 90°", 10, W.merah)),
      tambah(19, teks("c4", 150, 170, "siku-siku sama sisi ✗", 11, W.merah)),
    ),
  ],
};

/* ------------------------------ LB3. Inclusive Triangle Hierarchy: konsep ------------------------------ */
export const ADEGAN_LUAR_HIERARKI: AdeganStory = {
  id: "luar-hierarki",
  judul: "Inclusive Triangle Hierarchy: konsep",
  sumber: "Metode luar 4: golongan segitiga yang bersarang",
  latar: "#ECFEFF",
  ketukan: [
    k(
      "Metode keempat, Inclusive Triangle Hierarchy: golongan bangun boleh bersarang. Bangun B termasuk golongan A bila semua ciri A dimiliki B.",
      tambah(2, judul("Inclusive Triangle Hierarchy")),
      tambah(5, kotak("oa", 30, 34, 240, 120, W.krem, W.coklat, { rx: 8, z: -1 }), teks("oat", 150, 52, "golongan A", 10, W.coklat)),
      tambah(9, kotak("ob", 80, 66, 140, 70, W.hijauMuda, W.hijau, { rx: 6, z: 1 }), teks("obt", 150, 106, "bangun B", 10, W.hijau, { z: 2 })),
      tambah(14, teks("ob2", 150, 176, "semua ciri A dimiliki B, maka B termasuk A", 8.6, W.ungu)),
    ),
    k(
      "Langkahnya: tulis daftar ciri golongan A, periksa satu per satu pada bangun B, jika semua dimiliki, B termasuk A.",
      bersih(0),
      tambah(0, judul("tiga langkah hierarki")),
      tambah(1, ...kartu("h1", 30, 34, 240, 38, W.krem, ["1. tulis daftar ciri", "golongan A"], 9.2)),
      tambah(6, ...kartu("h2", 30, 82, 240, 38, W.langit, ["2. periksa satu per satu", "pada bangun B"], 9.2)),
      tambah(13, ...kartu("h3", 30, 130, 240, 38, W.hijauMuda, ["3. semua dimiliki?", "B termasuk A"], 9.2)),
    ),
    k(
      "Jika ada satu ciri yang tidak dimiliki, B tidak termasuk A. Satu contoh penyangkal sudah cukup.",
      bersih(0),
      tambah(0, judul("satu contoh penyangkal")),
      tambah(0, ...kartu("p1", 20, 44, 260, 50, W.merahMuda, ["ada 1 ciri tidak dimiliki", "B tidak termasuk A"], 10)),
      tambah(11, ...kartu("p2", 20, 110, 260, 44, W.krem, ["1 contoh penyangkal", "sudah cukup"], 10)),
    ),
    k(
      "Hasilnya diagram bersarang: kotak kecil di dalam kotak besar, bukan kotak-kotak yang terpisah.",
      bersih(0),
      tambah(0, judul("golongan bersarang")),
      tambah(3, kotak("n1", 20, 34, 260, 140, W.krem, W.coklat, { rx: 8, z: -2 }), teks("n1t", 150, 52, "golongan paling umum", 9, W.coklat)),
      tambah(5, kotak("n2", 60, 64, 180, 90, W.langit, W.biru, { rx: 6, z: 0 }), teks("n2t", 150, 82, "golongan lebih khusus", 9, W.biru)),
      tambah(9, kotak("n3", 100, 94, 100, 46, W.hijauMuda, W.hijau, { rx: 6, z: 1 }), teks("n3t", 150, 120, "paling khusus", 9, W.hijau, { z: 2 })),
    ),
  ],
};

/* ------------------------------ LB4. Inclusive Triangle Hierarchy: penerapan ------------------------------ */
const KOL_CIRI = [150, 110];
export const ADEGAN_LUAR_HIERARKI_TERAPAN: AdeganStory = {
  id: "luar-hierarki-terapan",
  judul: "Inclusive Triangle Hierarchy: penerapan sama sisi dan sama kaki",
  sumber: "Metode luar 4: penerapan pada hlm. 207–208 dan Panduan Guru hlm. 310–311",
  latar: "#F0FDFA",
  ketukan: [
    k(
      "Terapkan pada sama kaki dan sama sisi. Ciri sama kaki ada empat: dua sisi sama, dua sudut sama, satu simetri lipat, satu simetri putar.",
      tambah(7, ...tabel("ht0", 25, 34, KOL_CIRI, [["ciri minimal sama kaki", "dimiliki sama sisi"]], 22, 8)),
      tambah(12, ...tabel("ht1", 25, 56, KOL_CIRI, [["≥ 2 sisi sama", "3"]], 22, 8.6, W.putih)),
      tambah(15, ...tabel("ht2", 25, 78, KOL_CIRI, [["≥ 2 sudut sama", "3"]], 22, 8.6, W.putih)),
      tambah(18, ...tabel("ht3", 25, 100, KOL_CIRI, [["≥ 1 simetri lipat", "3"]], 22, 8.6, W.putih)),
      tambah(21, ...tabel("ht4", 25, 122, KOL_CIRI, [["≥ 1 simetri putar", "3"]], 22, 8.6, W.putih)),
      tambah(0, judul("daftar ciri golongan sama kaki")),
    ),
    k(
      "Segitiga sama sisi memiliki tiga, tiga, tiga, dan tiga. Semuanya paling sedikit memenuhi syarat, jadi sama sisi termasuk sama kaki.",
      sorotkan(3, "ht1-t01", "ht2-t01", "ht3-t01", "ht4-t01"),
      tambah(9, teks("cmp", 150, 164, "3 ≥ 2, 3 ≥ 2, 3 ≥ 1, 3 ≥ 1: semua terpenuhi", 8.8, W.hijau)),
      tambah(14, ...kartu("ok", 40, 172, 220, 24, W.hijauMuda, ["sama sisi termasuk sama kaki"], 9)),
    ),
    k(
      "Balikkan: apakah sama kaki selalu punya tiga sisi sama, tiga sudut sama, tiga lipat, tiga putar? Tidak selalu. Contoh: siku-siku sama kaki, sudutnya empat puluh lima, empat puluh lima, sembilan puluh.",
      bersih(0),
      tambah(0, judul("dibalik: sama kaki ke sama sisi")),
      tambah(16, teks("ns", 215, 70, "tidak selalu", 11, W.merah)),
      tambah(18, segitiga("sg", 30, 150, [[0, 0], [70, 0], [0, -70]], W.langit), tandaSiku("sk", 30, 150, 10, 1, -1), tandaSisi("ta", 30, 150, 30, 80), tandaSisi("tb", 30, 150, 100, 150)),
      tambah(22, teks("a1", 50, 92, "45°", 8.6, W.ungu), teks("a2", 78, 143, "45°", 8.6, W.ungu)),
      tambah(29, teks("a3", 44, 138, "90°", 8.6, W.merah)),
    ),
    k(
      "Jadi sama kaki tidak termasuk sama sisi. Satu contoh penyangkal, segitiga siku-siku sama kaki, sudah cukup. Hierarkinya: sama sisi di dalam sama kaki.",
      bersih(0),
      tambah(0, judul("hierarki segitiga")),
      tambah(0, teks("x1", 150, 38, "sama kaki tidak termasuk sama sisi", 9.4, W.merah)),
      tambah(7, ...kartu("pj", 20, 48, 260, 30, W.krem, ["penyangkal: siku-siku sama kaki"], 9)),
      tambah(16, kotak("oa", 40, 90, 220, 90, W.krem, W.coklat, { rx: 8, z: -1 }), teks("oat", 150, 106, "segitiga sama kaki", 9.6, W.coklat)),
      tambah(19, kotak("ob", 90, 118, 120, 50, W.hijauMuda, W.hijau, { rx: 6, z: 1 }), teks("obt", 150, 147, "sama sisi", 9.6, W.hijau, { z: 2 })),
    ),
  ],
};

/* ------------------------------ LB5. Ringkasan empat metode luar Subbab A ------------------------------ */
export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan empat metode luar Subbab A",
  sumber: "Ringkasan metode luar Subbab A",
  latar: "#EAF2FF",
  ketukan: [
    k(
      "Ringkasan empat metode luar Subbab A. Triangle Inequality Theorem: dua sisi terpendek harus lebih panjang dari sisi terpanjang.",
      tambah(0, judul("Ringkasan metode luar")),
      tambah(6, ...kartu("rg1", 10, 34, 134, 66, "#FDE68A", ["Triangle Inequality", "Theorem", "pendek + pendek > panjang"], 8.4)),
    ),
    k(
      "Angle Sum Property: tiga sudut berjumlah seratus delapan puluh derajat, untuk mencari sudut yang hilang.",
      tambah(0, ...kartu("rg2", 156, 34, 134, 66, "#FBCFE8", ["Angle Sum", "Property", "tiga sudut = 180°"], 8.6)),
    ),
    k(
      "Side-Angle Classification: nama segitiga dari label sudut dan label sisi. Inclusive Triangle Hierarchy: sama sisi termasuk sama kaki, tidak sebaliknya.",
      tambah(0, ...kartu("rg3", 10, 112, 134, 66, "#BBF7D0", ["Side-Angle", "Classification", "label sudut + label sisi"], 8.4)),
      tambah(8, ...kartu("rg4", 156, 112, 134, 66, "#BFDBFE", ["Inclusive Triangle", "Hierarchy", "sama sisi di dalam sama kaki"], 8)),
    ),
    k(
      "Dengan empat metode ini, kita siap menuju Subbab B, membandingkan ciri-ciri segi empat.",
      tambah(5, teks("rg5", 150, 196, "lanjut ke Subbab B", 9.4, W.ungu)),
    ),
  ],
};
