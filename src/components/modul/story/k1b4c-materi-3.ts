import type { AdeganStory } from "./logika-story";
import { E, W, emo, judul, kartu, kereta, kotak, orang, panggung, rumah, segitiga, teks } from "./k1b4c-gambar";
import { bersih, hapus, idx, k, sorotkan, tambah, ubah } from "./k1b4c-bantu";

/* Akhir "Mainan untuk Festival" dan akhir cerita Bab 4 Festival Mainan Kardus: mainan tampil, Igil menjawab juri, perayaan, lalu penutup. Tanpa latihan. */

/* ------------------------------ 6. Di panggung festival ------------------------------ */
const SUARA_P1 = "Hari festival tiba. Kereta dan rumah keluarga Igil tampil di panggung lapangan.";
const SUARA_P2 = "Juri bertanya, \"Kereta ini tersusun dari bentuk apa saja, dan berapa banyak?\" Semua menunggu.";
const SUARA_P3 = "Igil menjawab dengan lantang: tiga segi empat, satu segitiga, dan empat lengkung. Semuanya delapan bagian.";
const SUARA_P4 = "Juri tersenyum dan memberi pita. Juri senang mendengar nama bentuk penyusunnya.";
const KF = kereta("f", 20, 112, 0.6);
const RF = rumah("g", 170, 88, 0.6);

export const ADEGAN_FESTIVAL: AdeganStory = {
  id: "di-festival",
  judul: "Igil menjawab juri",
  sumber: "Materi: menyebut bentuk penyusun",
  latar: "#FEF9C3",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Festival mainan"), ...panggung("pg", 8, 150, 284), kotak("rp", 2, 166, 296, 32, "#BBF7D0", W.hijau, { rx: 6, tebal: 1.2, z: -3 })),
      tambah("Kereta", ...KF.badan, ...KF.bendera, ...KF.roda),
      tambah("rumah", ...RF.atap, ...RF.dinding, ...RF.pintu),
      tambah("Igil", ...orang("ig", 226, 124, E.igil, "Igil")),
      tambah("lapangan.", emo("kf0", 22, 48, E.konfeti, 20), emo("kf1", 280, 48, E.konfeti, 20)),
    ),
    k(
      SUARA_P2,
      tambah("Juri", ...orang("jr", 266, 124, E.juri, "juri")),
      tambah("bertanya:", ...kartu("tq", 60, 34, 196, 40, W.putih, ["bentuk apa saja?", "berapa banyak?"], 10)),
      sorotkan("kereta", "fs0", "fs1", "fs2", "ft0", "fl0", "fl1", "fl2", "fl3"),
    ),
    k(
      SUARA_P3,
      hapus(0, "tq-k", "tq-t0", "tq-t1"),
      ubah(0, ...["fs0", "fs1", "fs2", "ft0", "fl0", "fl1", "fl2", "fl3"].map((id) => ({ id, sorot: false }))),
      tambah("lantang:", ...kartu("jw", 46, 32, 208, 46, W.emas, ["3 segi empat, 1 segitiga, 4 lengkung", "semuanya 8 bagian"], 9)),
      sorotkan(idx(SUARA_P3, "tiga"), "fs0", "fs1", "fs2"),
      sorotkan(idx(SUARA_P3, "satu"), "ft0"),
      sorotkan(idx(SUARA_P3, "empat", 2), "fl0", "fl1", "fl2", "fl3"),
      sorotkan("delapan", "jw-k"),
    ),
    k(
      SUARA_P4,
      tambah("tersenyum", emo("sn", 286, 100, E.senyum, 16)),
      tambah("pita.", emo("pt", 96, 94, E.pitaJuri, 24)),
      tambah("senang", emo("ht", 246, 98, E.hati, 16)),
    ),
  ],
};

/* ------------------------------ 7. Hasil dan akhir cerita bab ------------------------------ */
const SUARA_H1 = "Semua bahan bekas dari gudang kini menjadi mainan. Keranjang bahan sudah kosong.";
const SUARA_H2 = "Igil, Kaka, Abang, dan Mamah merayakan di lapangan. Cerita Festival Mainan Kardus selesai dengan gembira.";
const SUARA_H3 = "Mamah berkata, kalian hebat menyusun bentuk, mengurai bentuk, dan menghitung bagiannya.";
const KH = kereta("h", 150, 72, 0.6);
const RH = rumah("u", 204, 112, 0.6);

export const ADEGAN_HASIL: AdeganStory = {
  id: "hasil-akhir",
  judul: "Bahan bekas menjadi mainan",
  sumber: "Materi: hasil dan akhir cerita",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_H1,
      tambah(0, judul("Bahan menjadi mainan")),
      tambah("bahan", kotak("kj", 20, 70, 90, 60, "#FEF3C7", W.coklat, { rx: 8, tebal: 2, z: -2 })),
      tambah("mainan.", ...KH.badan, ...KH.bendera, ...KH.roda, ...RH.atap, ...RH.dinding, ...RH.pintu),
      tambah("kosong.", teks("ko", 65, 146, "keranjang kosong", 9)),
    ),
    k(
      SUARA_H2,
      bersih(0),
      tambah(0, judul("Merayakan bersama")),
      tambah("Igil,", ...orang("ig", 45, 100, E.igil, "Igil")),
      tambah("Kaka,", ...orang("kk", 115, 100, E.kaka, "Kaka")),
      tambah("Abang,", ...orang("ab", 185, 100, E.abang, "Abang")),
      tambah("Mamah", ...orang("mm", 255, 100, E.mamah, "Mamah")),
      tambah("merayakan", emo("kf0", 30, 50, E.konfeti, 22), emo("kf1", 270, 50, E.pesta, 22)),
      tambah("selesai", ...kartu("sl", 50, 140, 200, 26, W.emas, ["Festival Mainan Kardus selesai"], 10)),
    ),
    k(SUARA_H3, sorotkan("Mamah", "mm"), tambah("hebat", emo("jp", 150, 56, E.jempol, 22)), tambah("menghitung", ...kartu("mh", 30, 172, 240, 22, W.hijauMuda, ["susun, urai, hitung bagian"], 10))),
  ],
};

/* ------------------------------ 8. Penutup ------------------------------ */
const SUARA_Z1 = "Menyusun berarti menggabung bentuk, dan banyak bagiannya bertambah.";
const SUARA_Z2 = "Mengurai berarti memisah bentuk menjadi bagiannya, dan banyak bagiannya berkurang.";
const SUARA_Z3 = "Coba pikirkan: kalau kamu punya empat segitiga sama, mainan apa yang bisa kamu susun?";

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Penutup: menyusun dan mengurai",
  sumber: "Materi: ringkasan dan penutup",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_Z1,
      tambah(0, judul("Ingat, ya!")),
      tambah("Menyusun", ...kartu("p1", 14, 34, 272, 40, W.langit, ["menyusun: gabung bentuk", "bagian bertambah"], 10)),
      sorotkan("bertambah.", "p1-k"),
    ),
    k(
      SUARA_Z2,
      ubah(0, { id: "p1-k", sorot: false }),
      tambah("Mengurai", ...kartu("p2", 14, 84, 272, 40, W.pink, ["mengurai: pisah bentuk", "bagian berkurang"], 10)),
      sorotkan("berkurang.", "p2-k"),
    ),
    k(
      SUARA_Z3,
      bersih(0),
      tambah(0, judul("Coba pikirkan"), emo("ht", 150, 62, E.tanya, 30)),
      tambah("empat", ...[96, 132, 168, 204].map((x, i) => segitiga(`zq${i}`, x, 92, [{ x: 0, y: 0 }, { x: 14, y: 30 }, { x: -14, y: 30 }])), teks("zn", 150, 140, "4 segitiga sama", 10)),
      tambah("kamu", ...orang("ig", 45, 150, E.igil, "Igil")),
      tambah("susun?", ...orang("kk", 255, 150, E.kaka, "Kaka"), teks("zt", 150, 176, "mainan apa?", 11, W.merah)),
    ),
  ],
};
