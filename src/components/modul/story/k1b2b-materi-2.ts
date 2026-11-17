import type { AdeganStory } from "./logika-story";
import { E, W, bedengSepuluh, diKantong, emo, judul, kalimat, kantong, label, orang, petak, teks } from "./k1b2b-gambar";
import { hapus, k, sorotkan, tambah, ubah } from "./k1b2b-bantu";

/* Lanjutan "Panen Pertama dan Keranjang Sepuluh": kantong kembar (penjumlahan berulang) dan keranjang sepuluh untuk Nenek. */

/* ------------------------------ 4. Kantong kembar ------------------------------ */
const SUARA_K1 = "Mamah membuat kantong sayur untuk tetangga. Tiap kantong berisi empat wortel.";
const SUARA_K2 = "Dua kantong sama banyak. Empat ditambah empat sama dengan delapan. Ini penjumlahan kembar.";
const SUARA_K3 = "Kantong kecil berisi dua dan dua. Dua ditambah dua sama dengan empat. Bilangan yang sama ditambahkan berulang.";
const KA = { x: 40, y: 64 };
const KB = { x: 112, y: 64 };

export const ADEGAN_KEMBAR: AdeganStory = {
  id: "kantong-kembar",
  judul: "Kantong kembar",
  sumber: "Materi: penjumlahan kembar dan berulang",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_K1,
      tambah(0, judul("Kantong kembar")),
      tambah("Mamah", ...orang("mm", 250, 96, E.mamah, "Mamah")),
      tambah("kantong", ...kantong("ka", KA.x, KA.y, 60, 72)),
      tambah("empat", ...[0, 1, 2, 3].map((i) => emo(`wa${i}`, diKantong(KA.x, KA.y, i).x, diKantong(KA.x, KA.y, i).y + 8, E.wortel, 18))),
    ),
    k(
      SUARA_K2,
      tambah("Dua", ...kantong("kb", KB.x, KB.y, 60, 72), ...[0, 1, 2, 3].map((i) => emo(`wb${i}`, diKantong(KB.x, KB.y, i).x, diKantong(KB.x, KB.y, i).y + 8, E.wortel, 18))),
      tambah("Empat", ...kalimat("k8", 110, 162, ["4", "+", "4", "=", "8"], 18, 26)),
      tambah("kembar.", ...label("kb8", 60, 176, 100, "kembar", W.pink, 9)),
    ),
    k(
      SUARA_K3,
      hapus(0, "kb8-k", "kb8-t0"),
      tambah("kecil", ...kantong("kc", 196, 34, 40, 46), emo("wc0", 208, 70, E.wortel, 14), emo("wc1", 224, 70, E.wortel, 14), ...kantong("kd", 244, 34, 40, 46), emo("wd0", 256, 70, E.wortel, 14), emo("wd1", 272, 70, E.wortel, 14)),
      ubah("Dua", { id: "mm", y: 150 }, { id: "mm-n", y: 163 }),
      tambah("ditambah", ...kalimat("k4", 240, 112, ["2", "+", "2", "=", "4"], 14, 18)),
      sorotkan("berulang.", "k40", "k42"),
    ),
  ],
};

/* ------------------------------ 5. Keranjang sepuluh untuk Nenek ------------------------------ */
const SUARA_S1 = "Keranjang Nenek punya sepuluh lubang. Igil sudah memasukkan tujuh timun.";
const SUARA_S2 = "Masih kosong tiga lubang. Tujuh ditambah tiga sama dengan sepuluh. Keranjangnya penuh!";
const SUARA_S3 = "Pasangan sepuluh lainnya: sembilan dan satu, delapan dan dua, enam dan empat, lima dan lima.";
const BS = { x: 85, y: 48, s: 26 };
const isi = (i: number) => {
  const p = petak(BS.x, BS.y, i, BS.s);
  return { x: p.x, y: p.y + 7 };
};
const PASANGAN = ["9 dan 1", "8 dan 2", "6 dan 4", "5 dan 5"];

export const ADEGAN_SEPULUH: AdeganStory = {
  id: "keranjang-sepuluh",
  judul: "Keranjang sepuluh untuk Nenek",
  sumber: "Materi: penjumlahan yang hasilnya sepuluh",
  latar: "#ECFDF5",
  ketukan: [
    k(
      SUARA_S1,
      tambah(0, judul("Keranjang sepuluh")),
      tambah("sepuluh", ...bedengSepuluh("bs", BS.x, BS.y, BS.s)),
      tambah("Igil", ...orang("ig", 36, 76, E.igil, "Igil")),
      tambah("tujuh", ...[0, 1, 2, 3, 4, 5, 6].map((i) => emo(`tn${i}`, isi(i).x, isi(i).y, E.timun, 18))),
    ),
    k(
      SUARA_S2,
      sorotkan("kosong", "bsc7", "bsc8", "bsc9"),
      tambah("tiga", teks("t3", 196, 136, "3 lagi", 10, W.merah)),
      tambah("Tujuh", ...kalimat("k10", 150, 168, ["7", "+", "3", "=", "10"], 18, 28)),
      tambah("penuh!", ...[7, 8, 9].map((i) => emo(`tn${i}`, isi(i).x, isi(i).y, E.timun, 18))),
    ),
    k(
      SUARA_S3,
      hapus(0, "t3", "k100", "k101", "k102", "k103", "k104"),
      ...PASANGAN.map((p, i) => tambah(["sembilan", "delapan", "enam", "lima"][i], ...label(`ps${i}`, 10 + i * 72, 150, 64, p, [W.hijauMuda, W.langit, W.pink, W.emas][i], 9))),
    ),
  ],
};
