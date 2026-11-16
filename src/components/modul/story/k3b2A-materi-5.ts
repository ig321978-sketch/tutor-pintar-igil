import type { AdeganStory } from "./logika-story";
import { OWL, W, emo, judul, kartu } from "./k3b2A-gambar";
import { bersih, idx, k, tambah } from "./k3b2A-bantu";

/* ------------------------------ Penutup ------------------------------ */
const SUARA_Y1 = "Mari kita ingat lagi. Ada empat langkah untuk mengisi kalimat Matematika penjumlahan.";
const SUARA_Y2 = "Langkah satu, baca kalimat Matematikanya dan temukan titik-titik.";
const SUARA_Y3 = "Langkah dua, lihat bilangan yang sudah diketahui.";
const SUARA_Y4 = "Langkah tiga, kurangkan jumlah dengan bilangan yang diketahui itu.";
const SUARA_Y5 = "Langkah empat, periksa hasilnya dengan menjumlahkan lagi.";
const SUARA_Y6 = "Hebat! Sekarang kamu bisa mengisi titik-titik pada kalimat penjumlahan.";

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Penutup: mari ingat lagi",
  sumber: "Materi: penutup",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_Y1, tambah(0, judul("Empat langkah")), tambah(idx(SUARA_Y1, "langkah"), emo("ow", 150, 100, OWL, 54))),
    k(SUARA_Y2, bersih(0), tambah(0, judul("Empat langkah")), tambah(idx(SUARA_Y2, "baca"), ...kartu("y1", 14, 36, 272, 30, W.langit, ["1. baca kalimat, cari titik-titik"], 9.6))),
    k(SUARA_Y3, tambah(idx(SUARA_Y3, "lihat"), ...kartu("y2", 14, 74, 272, 30, W.hijauMuda, ["2. lihat bilangan yang diketahui"], 9.6))),
    k(SUARA_Y4, tambah(idx(SUARA_Y4, "kurangkan"), ...kartu("y3", 14, 112, 272, 30, W.pink, ["3. kurangkan jumlah dengan bagian"], 9.6))),
    k(SUARA_Y5, tambah(idx(SUARA_Y5, "periksa"), ...kartu("y4", 14, 150, 272, 30, W.emas, ["4. periksa dengan menjumlahkan"], 9.6))),
    k(SUARA_Y6, bersih(0), tambah(0, judul("Hebat!")), tambah(idx(SUARA_Y6, "Hebat!"), emo("ow2", 150, 100, OWL, 60)), tambah(idx(SUARA_Y6, "mengisi"), emo("ok", 150, 170, "✅", 34))),
  ],
};
