import type { AdeganStory, Obj } from "./logika-story";
import {
  E,
  JAJAR,
  TIGA,
  W,
  barang,
  barangDi,
  emo,
  idKeranjang,
  idKeranjangAturan,
  judul,
  kartu,
  keranjangAnyam,
  keranjangAturan,
  lencanaAturan,
  letakAturan,
  masukkan,
  orang,
  semuaKeranjang,
  teks,
  tunjukKe,
  yangCocok,
} from "./k1b4b-gambar";
import { hapus, k, sorotkan, tambah, ubah } from "./k1b4b-bantu";

/* Lanjutan "Teras Penuh Barang": barang yang sama dipilah lagi menurut warna dan ukuran; satu barang bisa masuk keranjang berbeda. */

const keJajar = () => JAJAR.map((p, i) => ({ id: `b${i}`, x: p.x, y: p.y, sorot: false }));

/* ------------------------------ 4. Ganti aturan: warna ------------------------------ */
const SUARA_W1 = "Abang ingin mengecat, jadi barang yang sama dipilah lagi menurut warna.";
const SUARA_W2 = "Abang menyiapkan dua keranjang, yaitu merah dan biru.";
const SUARA_W3 = "Abang memeriksa warna. Barang merah masuk keranjang merah, ada lima.";
const SUARA_W4 = "Barang biru masuk keranjang biru, ada empat. Lima dan empat, tetap sembilan.";
const MERAH = yangCocok("warna", "merah");
const BIRU = yangCocok("warna", "biru");

export const ADEGAN_WARNA: AdeganStory = {
  id: "aturan-warna",
  judul: "Ganti aturan: warna",
  sumber: "Materi: ganti aturan menjadi warna",
  latar: "#FEF2F2",
  ketukan: [
    k(
      SUARA_W1,
      tambah(0, judul("Ganti aturan: warna"), ...semuaKeranjang("bentuk"), ...barangDi(letakAturan("bentuk")), ...orang("ab", 26, 80, E.abang, "Abang")),
      tambah("mengecat", emo("ks", 56, 50, E.kuas, 16)),
      tambah("warna.", teks("at", 176, 46, "aturan baru: warna", 10, W.merah)),
      hapus("dipilah", ...idKeranjangAturan("bentuk")),
      ubah("dipilah", ...keJajar()),
    ),
    k(
      SUARA_W2,
      tambah("dua", teks("tk", 150, 108, "2 keranjang", 10, W.coklat)),
      tambah("merah", ...keranjangAturan("warna", 0)),
      tambah("biru.", ...keranjangAturan("warna", 1)),
    ),
    k(
      SUARA_W3,
      hapus(0, "tk"),
      sorotkan("memeriksa", ...MERAH.map((i) => `b${i}`)),
      ubah("masuk", ...masukkan("warna", MERAH)),
      tambah("lima.", ...lencanaAturan("warna", 0)),
    ),
    k(
      SUARA_W4,
      ubah("masuk", ...masukkan("warna", BIRU)),
      tambah("empat", ...lencanaAturan("warna", 1)),
      tambah("sembilan.", ...kartu("jm", 90, 62, 120, 26, W.emas, ["5 + 4 = 9"], 12)),
    ),
  ],
};

/* ------------------------------ 5. Aturan ukuran dan satu barang ------------------------------ */
const SUARA_U1 = "Igil mencoba aturan ukuran. Barang dipindah ke dua keranjang, besar dan kecil.";
const SUARA_U2 = "Igil memeriksa ukuran. Barang besar ada tiga. Barang kecil ada enam.";
const SUARA_U3 = "Lihat karton segitiga merah kecil ini. Menurut aturan bentuk, ia masuk keranjang segitiga.";
const SUARA_U4 = "Menurut aturan warna, ia masuk keranjang merah. Menurut aturan ukuran, keranjang kecil.";
const SUARA_U5 = "Barangnya sama, tetapi keranjangnya berbeda, tergantung aturan yang dipilih.";
const BESAR = yangCocok("ukuran", "besar");
const KECIL = yangCocok("ukuran", "kecil");
/** Karton segitiga merah kecil (barang 1) di tengah atas. */
const KARTON = { x: 150, y: 70 };
const DARI = { x: 150, y: 100 };
const keranjangCiri = (j: number, nama: string, aturan: string, warna: string): Obj[] => [
  ...keranjangAnyam(idKeranjang(nama), TIGA[j], nama, warna),
  teks(`at${j}`, TIGA[j].x + TIGA[j].w / 2, TIGA[j].y + 32, aturan, 8.6, W.coklat, { z: 1 }),
];

export const ADEGAN_UKURAN: AdeganStory = {
  id: "aturan-ukuran",
  judul: "Aturan ukuran dan satu barang",
  sumber: "Materi: aturan ukuran, keranjang berbeda",
  latar: "#F5F3FF",
  ketukan: [
    k(
      SUARA_U1,
      tambah(0, judul("Ganti aturan: ukuran"), ...semuaKeranjang("warna"), ...barangDi(letakAturan("warna")), ...orang("ig", 26, 80, E.igil, "Igil")),
      hapus("dipindah", ...idKeranjangAturan("warna")),
      ubah("dipindah", ...keJajar()),
      tambah("dua", teks("tk", 150, 108, "2 keranjang", 10, W.coklat)),
      tambah("besar", ...keranjangAturan("ukuran", 0)),
      tambah("kecil.", ...keranjangAturan("ukuran", 1)),
    ),
    k(
      SUARA_U2,
      hapus(0, "tk"),
      ubah("besar", ...masukkan("ukuran", BESAR)),
      tambah("tiga.", ...lencanaAturan("ukuran", 0)),
      ubah("kecil", ...masukkan("ukuran", KECIL)),
      tambah("enam.", ...lencanaAturan("ukuran", 1)),
    ),
    k(
      SUARA_U3,
      { at: 0, bersih: true },
      tambah(0, judul("Barang yang sama"), { ...barang(1, KARTON), sorot: true }),
      tambah("kecil", teks("cr", 150, 92, "segitiga, merah, kecil", 10, W.ungu)),
      tambah("bentuk,", ...keranjangCiri(0, "segitiga", "aturan bentuk", W.krem)),
      tambah("segitiga@2", tunjukKe("g0", DARI, { x: 55, y: 114 })),
    ),
    k(
      SUARA_U4,
      tambah("warna,", ...keranjangCiri(1, "merah", "aturan warna", W.merahMuda)),
      tambah("merah.", tunjukKe("g1", DARI, { x: 150, y: 114 })),
      tambah("ukuran,", ...keranjangCiri(2, "kecil", "aturan ukuran", W.pink)),
      tambah("kecil.", tunjukKe("g2", DARI, { x: 245, y: 114 })),
    ),
    k(
      SUARA_U5,
      sorotkan("berbeda.", "k-segitiga", "k-merah", "k-kecil"),
      tambah("aturan", ...kartu("tg", 50, 28, 200, 20, W.emas, ["keranjang tergantung aturan"], 9.5)),
    ),
  ],
};
