import type { AdeganStory, Obj } from "./logika-story";
import { EMO_APEL, EMO_BONEKA, EMO_BURUNG, EMO_JERUK, EMO_KELINCI, EMO_KUCING, EMO_MOBIL, EMO_PISANG, OWL, W, angkaDiagram, diagramKerangka, emo, gambarDiagram, jumlahG, judul, kartu, type GeoD } from "./k1b8A-gambar";
import { barisKelompok, diagramAksi, gilir, hapus, ids, idx, k, pilihKata, redamkan, sorotkan, tambah } from "./k1b8A-bantu";
import { kepala, NAMA_METODE_ID, WARNA_METODE } from "./k1b8A-luar-1";

const GD: GeoD = { x: 0, y: 66, rh: 30, dx: 24, xl: 4 };
const picIds = (r: number, n: number): string[] => ids(`dg-p${r}`, 0, n - 1);

/* ------------------------------ 4. Diagram Gambar: konsep ------------------------------ */
const SUARA_C1 = "Metode kedua bernama Diagram Gambar. Satu gambar mewakili satu data.";
const SUARA_C2 = "Mulai dari kucing. Satu gambar untuk tiap kucing. Satu, dua, tiga, empat, lima.";
const SUARA_C3 = "Sekarang kelinci. Satu, dua, tiga. Tiga gambar kelinci untuk tiga kelinci.";
const SUARA_C4 = "Lalu burung. Satu, dua, tiga, empat. Setiap gambar mewakili satu burung, tidak lebih.";
const SUARA_C5 = "Lihat diagramnya. Kucing paling banyak, kelinci paling sedikit.";
const SUARA_C6 = "Diagram gambar punya judul, nama baris, gambar, dan angka. Satu gambar mewakili satu data.";
const NAMA_D = ["Kucing", "Kelinci", "Burung"];

export const ADEGAN_LUAR_DIAGRAM: AdeganStory = {
  id: "luar-diagram",
  judul: "Diagram Gambar: satu gambar satu data",
  sumber: "Metode luar: Diagram Gambar",
  latar: "#EFF6FF",
  ketukan: [
    k(SUARA_C1, tambah("kedua", ...kepala(1)), tambah(idx(SUARA_C1, "Satu"), ...diagramKerangka("dg", GD, "Hewan Kesukaan", NAMA_D))),
    k(SUARA_C2, ...diagramAksi(SUARA_C2, "dg", GD, 0, 5, EMO_KUCING, { setelah: "tiap" }), tambah(idx(SUARA_C2, "lima"), angkaDiagram("dg", GD, 0, "5"))),
    k(SUARA_C3, ...diagramAksi(SUARA_C3, "dg", GD, 1, 3, EMO_KELINCI, { setelah: "kelinci." }), tambah(idx(SUARA_C3, "tiga", 1), angkaDiagram("dg", GD, 1, "3"))),
    k(SUARA_C4, ...diagramAksi(SUARA_C4, "dg", GD, 2, 4, EMO_BURUNG, { setelah: "burung." }), tambah(idx(SUARA_C4, "empat"), angkaDiagram("dg", GD, 2, "4"))),
    k(
      SUARA_C5,
      ...gilir(SUARA_C5, [
        ["Kucing", ["dg-l0", ...picIds(0, 5)]],
        ["kelinci", ["dg-l1", ...picIds(1, 3)]],
      ]),
    ),
    k(
      SUARA_C6,
      redamkan(0, "dg-l1", ...picIds(1, 3)),
      ...gilir(SUARA_C6, [
        ["judul", ["dg-jd"]],
        ["nama", ["dg-l0", "dg-l1", "dg-l2"]],
        ["gambar", picIds(0, 5), 2],
        ["angka.", ["dg-n0", "dg-n1", "dg-n2"]],
      ]),
    ),
  ],
};

/* ------------------------------ 5. Diagram Gambar: terapan ------------------------------ */
const BUAH = [
  { nama: "Apel", e: EMO_APEL, n: 4 },
  { nama: "Jeruk", e: EMO_JERUK, n: 6 },
  { nama: "Pisang", e: EMO_PISANG, n: 2 },
];
const SUARA_D1 = "Terapkan pada diagram buah. Satu gambar mewakili satu buah. Baca diagramnya.";
const SUARA_D2 = "Apel ada empat gambar. Jeruk ada enam gambar. Pisang ada dua gambar.";
const SUARA_D3 = "Pilih: buah apa yang paling sedikit? Ketuk kartu yang tepat.";
const SUARA_D4 = "Betul! Pisang paling sedikit, karena gambarnya hanya dua. Hebat!";
const gambarBuah = (): Obj[] => BUAH.flatMap((b, r) => Array.from({ length: b.n }, (_, q) => gambarDiagram("dg", GD, r, q, b.e)));

export const ADEGAN_LUAR_DIAGRAM_TERAPAN: AdeganStory = {
  id: "luar-diagram-terapan",
  judul: "Diagram Gambar: diagram buah",
  sumber: "Metode luar: Diagram Gambar, terapan",
  latar: "#EFF6FF",
  ketukan: [
    k(SUARA_D1, tambah("Terapkan", ...kepala(1)), tambah(idx(SUARA_D1, "diagram"), ...diagramKerangka("dg", GD, "Buah Keranjang", BUAH.map((b) => b.nama))), tambah(idx(SUARA_D1, "mewakili"), ...gambarBuah())),
    k(SUARA_D2, ...BUAH.map((b, r) => tambah(idx(SUARA_D2, ["empat", "enam", "dua"][r]), angkaDiagram("dg", GD, r, String(b.n))))),
    k(SUARA_D3, tambah("Pilih:", ...pilihKata(162, BUAH.map((b) => b.nama))), sorotkan("Ketuk", "c3-k")),
    k(SUARA_D4, sorotkan("Pisang", "dg-l2", ...picIds(2, 2)), tambah("Betul!", emo("ok", 150, 197, "✅", 20))),
  ],
};

/* ------------------------------ 6. Banding Kategori: konsep ------------------------------ */
const BK = [
  { key: "a", nama: "Kucing", e: EMO_KUCING, n: 5, y: 80 },
  { key: "b", nama: "Kelinci", e: EMO_KELINCI, n: 3, y: 114 },
  { key: "c", nama: "Burung", e: EMO_BURUNG, n: 5, y: 148 },
];
const barisBK = (r: number): Obj[] => barisKelompok(BK[r].key, BK[r].nama, BK[r].e, BK[r].n, BK[r].y);
const sorotBK = (r: number): string[] => [`e${BK[r].key}-nm`, ...ids(`e${BK[r].key}`, 0, BK[r].n - 1)];
const SUARA_E1 = "Metode ketiga bernama Banding Kategori. Kita membandingkan banyaknya dua kategori dari diagram.";
const SUARA_E2 = "Kucing ada lima. Kelinci ada tiga. Burung ada lima.";
const SUARA_E3 = "Bandingkan kucing dan kelinci. Barisan kucing lebih panjang. Jadi kucing lebih banyak dari kelinci.";
const SUARA_E4 = "Kelinci lebih sedikit dari kucing. Kelinci lebih sedikit dua dari kucing.";
const SUARA_E5 = "Sekarang bandingkan kucing dan burung. Barisannya sama panjang. Jadi kucing dan burung sama banyak.";
const SUARA_E6 = "Ucapkan lagi mengikuti suara guru. Lebih banyak, lebih sedikit, atau sama banyak.";

export const ADEGAN_LUAR_BANDING: AdeganStory = {
  id: "luar-banding",
  judul: "Banding Kategori: mana yang lebih banyak",
  sumber: "Metode luar: Banding Kategori",
  latar: "#FDF2F8",
  ketukan: [
    k(SUARA_E1, tambah("ketiga", ...kepala(2)), tambah(idx(SUARA_E1, "membandingkan"), ...[0, 1, 2].flatMap(barisBK))),
    k(SUARA_E2, tambah(idx(SUARA_E2, "lima", 1), jumlahG("a", BK[0].y, "5")), tambah(idx(SUARA_E2, "tiga"), jumlahG("b", BK[1].y, "3")), tambah(idx(SUARA_E2, "lima", 2), jumlahG("c", BK[2].y, "5"))),
    k(SUARA_E3, sorotkan(idx(SUARA_E3, "kucing"), ...sorotBK(0)), sorotkan(idx(SUARA_E3, "kelinci."), ...sorotBK(1))),
    k(SUARA_E4, redamkan(0, ...sorotBK(0)), sorotkan(idx(SUARA_E4, "dua"), "ea3", "ea4")),
    k(SUARA_E5, redamkan(0, "ea3", "ea4", ...sorotBK(1)), sorotkan(idx(SUARA_E5, "kucing"), ...sorotBK(0)), sorotkan(idx(SUARA_E5, "burung."), ...sorotBK(2))),
    k(SUARA_E6, redamkan(0, ...sorotBK(0), ...sorotBK(2)), tambah("Ucapkan", emo("ucap", 262, 190, "\u{1F5E3}", 24))),
  ],
};

/* ------------------------------ 7. Banding Kategori: terapan ------------------------------ */
const SUARA_F1 = "Terapkan pada mainan. Ada enam mobil dan empat boneka. Mana yang lebih banyak?";
const SUARA_F2 = "Pilih jawabannya. Ketuk kartu mainan yang lebih banyak.";
const SUARA_F3 = "Betul! Mobil lebih banyak dari boneka. Mobil lebih banyak dua dari boneka.";
const SUARA_F4 = "Boneka lebih sedikit dari mobil. Jumlah semuanya sepuluh mainan.";

export const ADEGAN_LUAR_BANDING_TERAPAN: AdeganStory = {
  id: "luar-banding-terapan",
  judul: "Banding Kategori: mobil dan boneka",
  sumber: "Metode luar: Banding Kategori, terapan",
  latar: "#FDF2F8",
  ketukan: [
    k(
      SUARA_F1,
      tambah("Terapkan", ...kepala(2)),
      tambah(idx(SUARA_F1, "mobil"), ...barisKelompok("a", "Mobil", EMO_MOBIL, 6, 76)),
      tambah(idx(SUARA_F1, "boneka."), ...barisKelompok("b", "Boneka", EMO_BONEKA, 4, 112)),
      tambah(idx(SUARA_F1, "enam"), jumlahG("a", 76, "6")),
      tambah(idx(SUARA_F1, "empat"), jumlahG("b", 112, "4")),
    ),
    k(SUARA_F2, tambah("jawabannya.", ...pilihKata(146, ["Mobil", "Boneka"])), sorotkan("Ketuk", "c1-k")),
    k(SUARA_F3, sorotkan(idx(SUARA_F3, "dua"), "ea4", "ea5"), tambah("Betul!", emo("ok", 150, 197, "✅", 20))),
    k(SUARA_F4, hapus(0, "c1-k", "c1-t", "c2-k", "c2-t"), redamkan(0, "ea4", "ea5"), tambah("sepuluh", ...kartu("js", 50, 150, 200, 28, W.emas, ["jumlah semuanya: 10"], 10.4))),
  ],
};

/* ------------------------------ 8. Ringkasan ------------------------------ */
const SUARA_G1 = "Mari kita ringkas tiga metode dari luar. Metode pertama Turus: satu benda, satu goresan.";
const SUARA_G2 = "Metode kedua Diagram Gambar: satu gambar mewakili satu data.";
const SUARA_G3 = "Metode ketiga Banding Kategori: bandingkan banyaknya dua kategori.";
const SUARA_G4 = "Ketiganya membantu kita membaca data dengan teliti. Hebat sekali! Sampai jumpa.";
const RING = ["satu benda, satu goresan", "satu gambar, satu data", "bandingkan dua kategori"];
const kartuRing = (i: number): Obj[] => kartu(`r${i}`, 14, 30 + i * 54, 272, 44, WARNA_METODE[i], [`${i + 1}. ${NAMA_METODE_ID[i]}`, RING[i]], 10);

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan tiga metode dari luar",
  sumber: "Ringkasan: tiga metode luar",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_G1, tambah(0, judul("Ringkasan")), tambah("pertama", kartuRing(0))),
    k(SUARA_G2, tambah("kedua", kartuRing(1))),
    k(SUARA_G3, tambah("ketiga", kartuRing(2))),
    k(SUARA_G4, tambah("Hebat", emo("ow", 262, 196, OWL, 24))),
  ],
};
