import type { AdeganStory } from "./logika-story";
import { E, W, emo, judul, kardus, kartu, kotak, orang, panahObj, teks } from "./k1b1c-materi-gambar";
import { bersih, k, sorotkan, tambah } from "./k1b1c-bantu";

/* Akhir "Tangga Gudang Loteng": kardus berurutan, perlengkapan pesta ditemukan, dan penutup. Tanpa latihan. */

const xRak = (i: number) => 24 + i * 28;

/* ------------------------------ 7. Kardus berurutan ------------------------------ */
const SUARA_H1 = "Akhirnya semua kardus berurutan di rak loteng, dari satu sampai sepuluh.";
const SUARA_H2 = "Dibaca dari kiri, angkanya maju. Dibaca dari kanan, angkanya mundur.";
const SUARA_H3 = "Lalu Mamah membuka kardus terakhir. Isinya piring, gelas, dan balon pesta!";

export const ADEGAN_URUT: AdeganStory = {
  id: "kardus-urut",
  judul: "Kardus berurutan",
  sumber: "Materi: urutan satu sampai sepuluh",
  latar: "#ECFDF5",
  ketukan: [
    k(SUARA_H1, tambah(0, judul("Rak loteng sudah urut"), kotak("rk", 8, 104, 284, 8, "#B45309", W.coklat, { rx: 2 })), tambah("berurutan", ...Array.from({ length: 10 }, (_, i) => kardus(`ku${i}`, xRak(i), 88, String(i + 1), 24)).flat())),
    k(
      SUARA_H2,
      tambah("kiri,", panahObj("pk", 24, 128, 250, 0, W.hijau), teks("pkt", 150, 144, "maju", 9, W.hijau)),
      tambah("kanan,", panahObj("pn", 276, 160, -250, 0, W.merah), teks("pnt", 150, 176, "mundur", 9, W.merah)),
    ),
    k(SUARA_H3, sorotkan("terakhir.", "ku9"), tambah("piring,", emo("pr", 96, 56, E.piring, 22)), tambah("gelas,", emo("gl", 150, 56, E.gelas, 22)), tambah("balon", emo("bl", 204, 56, E.balon, 22))),
  ],
};

/* ------------------------------ 8. Penutup ------------------------------ */
const SUARA_Z1 = "Mamah tersenyum. Gudang loteng sudah rapi dan kardusnya berurutan.";
const SUARA_Z2 = "Ingat, hitung maju makin banyak, hitung mundur makin sedikit. Lihat angka sebelum dan sesudah untuk mencari yang hilang.";
const SUARA_Z3 = "Rumah hampir rapi. Besok kita adakan Pesta Rumah Rapi! Sampai jumpa!";

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Penutup: loteng sudah rapi",
  sumber: "Materi: ringkasan dan penutup",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_Z1, tambah(0, judul("Loteng sudah rapi"), ...orang("mm", 60, 120, E.mamah, "Mamah")), tambah("tersenyum.", emo("sn", 92, 100, E.senyum, 20)), tambah("berurutan.", ...[0, 1, 2, 3].flatMap((i) => kardus(`kz${i}`, 160 + i * 30, 110, String(i + 1), 24)))),
    k(
      SUARA_Z2,
      bersih(0),
      tambah(0, judul("Ingat, ya!")),
      tambah("maju", ...kartu("p1", 14, 34, 272, 34, W.hijauMuda, ["hitung maju: makin banyak"], 9.6)),
      tambah("mundur", ...kartu("p2", 14, 78, 272, 34, W.merahMuda, ["hitung mundur: makin sedikit"], 9.6)),
      tambah("sebelum", ...kartu("p3", 14, 122, 272, 34, W.langit, ["sebelum dan sesudah: cari yang hilang"], 9.6)),
    ),
    k(
      SUARA_Z3,
      bersih(0),
      tambah(0, judul("Sampai jumpa!"), emo("bl", 150, 70, E.balon, 40), ...kartu("ps", 70, 86, 160, 24, W.emas, ["besok: Pesta Rumah Rapi"], 9)),
      tambah("Sampai", ...orang("ig", 60, 160, E.igil, "Igil"), ...orang("kk", 120, 160, E.kaka, "Kaka"), ...orang("ab", 180, 160, E.abang, "Abang"), ...orang("mm", 240, 160, E.mamah, "Mamah")),
    ),
  ],
};
