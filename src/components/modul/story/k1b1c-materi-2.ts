import type { AdeganStory } from "./logika-story";
import { E, W, atasTangga, emo, judul, kardus, kartu, kotak, orang, tangga, teks } from "./k1b1c-materi-gambar";
import { hapus, k, langkahTangga, sorotkan, tambah, ubah } from "./k1b1c-bantu";

/* Lanjutan "Tangga Gudang Loteng": mulai dari angka mana saja, sebelum dan sesudah, dan melengkapi urutan yang hilang. */

/* ------------------------------ 4. Mulai dari tengah ------------------------------ */
const SUARA_M1 = "Saat kardus ketiga dibawa, kardusnya jatuh di anak tangga kelima. Abang tidak perlu mulai dari satu.";
const SUARA_M2 = "Abang naik dari lima: enam, tujuh, delapan. Lalu turun dari delapan: tujuh, enam.";
const SUARA_M3 = "Kita bisa menghitung maju atau mundur dari angka mana saja.";
const lima = atasTangga(4);

export const ADEGAN_TENGAH: AdeganStory = {
  id: "dari-tengah",
  judul: "Mulai dari angka mana saja",
  sumber: "Materi: mulai dari tengah",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_M1,
      tambah(0, judul("Mulai dari tengah"), ...tangga("tg", true)),
      tambah("jatuh", emo("kd", lima.x, lima.y - 2, E.kardus, 18)),
      sorotkan("kelima.", "tg4"),
      tambah("Abang", emo("ab", lima.x - 22, atasTangga(3).y - 2, E.abang, 18)),
    ),
    k(SUARA_M2, hapus(0, "kd"), ubah(0, { id: "tg4", sorot: false }), ...langkahTangga(SUARA_M2, "tg", "ab", [5, 6, 7, 8, 8, 7, 6], ["lima:", "enam,", "tujuh,", "delapan.", "delapan:", "tujuh,", "enam."], undefined, W.emas)),
    k(SUARA_M3, tambah("maju", ...kartu("mm", 14, 30, 130, 24, W.hijauMuda, ["maju dari 5"], 9.4)), tambah("mundur", ...kartu("md", 14, 60, 130, 24, W.merahMuda, ["mundur dari 8"], 9.4))),
  ],
};

/* ------------------------------ 5. Sebelum dan sesudah ------------------------------ */
const SUARA_S1 = "Di loteng, Kaka menyusun kardus di rak dengan nomor berurutan.";
const SUARA_S2 = "Kaka memegang kardus nomor enam. Sebelum enam adalah lima, sesudah enam adalah tujuh.";
const SUARA_S3 = "Angka sebelum selalu satu lebih sedikit. Angka sesudah selalu satu lebih banyak.";

export const ADEGAN_SEBELUM: AdeganStory = {
  id: "sebelum-sesudah",
  judul: "Sebelum dan sesudah",
  sumber: "Materi: sebelum dan sesudah",
  latar: "#F5F3FF",
  ketukan: [
    k(SUARA_S1, tambah(0, judul("Sebelum dan sesudah"), kotak("rk", 30, 128, 240, 8, "#B45309", W.coklat, { rx: 2 })), tambah("Kaka", ...orang("kk", 40, 180, E.kaka, "Kaka")), tambah("rak", teks("rkn", 150, 152, "rak loteng", 9, W.coklat))),
    k(SUARA_S2, tambah("enam.", ...kardus("k6", 150, 100, "6", 44, "#FDE68A")), tambah("lima,", ...kardus("k5", 90, 104, "5", 36)), tambah("tujuh.", ...kardus("k7", 210, 104, "7", 36))),
    k(
      SUARA_S3,
      tambah("sebelum", teks("ts", 90, 66, "sebelum", 9, W.merah)),
      tambah("sedikit.", teks("tsd", 90, 78, "lebih sedikit", 8, W.merah)),
      tambah("sesudah", teks("tu", 210, 66, "sesudah", 9, W.hijau)),
      tambah("banyak.", teks("tub", 210, 78, "lebih banyak", 8, W.hijau)),
    ),
  ],
};

/* ------------------------------ 6. Melengkapi urutan ------------------------------ */
const SUARA_K1 = "Abang memeriksa barisan kardus. Satu, dua, lalu ada kardus tanpa nomor, lalu empat dan lima.";
const SUARA_K2 = "Hitung maju: satu, dua, tiga. Jadi nomor yang hilang adalah tiga!";
const SUARA_K3 = "Di barisan lain ada sembilan, delapan, tanpa nomor, lalu enam. Hitung mundur, yang hilang adalah tujuh.";
const BARIS1 = ["1", "2", "?", "4", "5"];
const BARIS2 = ["9", "8", "?", "6"];

export const ADEGAN_LENGKAPI: AdeganStory = {
  id: "lengkapi-urutan",
  judul: "Melengkapi nomor yang hilang",
  sumber: "Materi: melengkapi urutan",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_K1, tambah(0, judul("Nomor yang hilang"), emo("ab", 24, 64, E.abang, 22)), tambah("barisan", ...BARIS1.flatMap((n, i) => kardus(`ba${i}`, 70 + i * 44, 70, n, 34)))),
    k(
      SUARA_K2,
      sorotkan("satu,", "ba0"),
      sorotkan("dua,", "ba1"),
      ubah("tiga.", { id: "ba2", sorot: true }, { id: "ba2-t", isi: "3", warna: W.hijau }),
      tambah("hilang", ...kartu("j1", 90, 100, 120, 22, W.hijauMuda, ["yang hilang: 3"], 9)),
    ),
    k(
      SUARA_K3,
      tambah("barisan", ...BARIS2.flatMap((n, i) => kardus(`bb${i}`, 92 + i * 44, 150, n, 34))),
      tambah("mundur,", teks("mu", 40, 154, "mundur", 9, W.merah)),
      ubah("tujuh.", { id: "bb2", sorot: true }, { id: "bb2-t", isi: "7", warna: W.merah }),
    ),
  ],
};
