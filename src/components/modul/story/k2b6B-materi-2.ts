import type { AdeganStory } from "./logika-story";
import { BAGIAN, EMO_BAGIAN, JAM_KANAN, JAM_KIRI, JAM_TENGAH_KECIL, W, emo, jam, judul, kartu, kartuBagianDigital, kolomBagian, namaJam } from "./k2b6B-gambar";
import { hapus, hapusJam, idx, k, putarJam, sorotkan, tambah, ubah } from "./k2b6B-bantu";

const hapusNama = (at: number, id: string) => hapus(at, `${id}-nama-k`, `${id}-nama-t0`);

/* ------------------------------ 6. Pagi hari ------------------------------ */
const SUARA_E1 = "Sekarang kita lihat hari Kira. Pagi hari, matahari baru terbit.";
const SUARA_E2 = "Kira bangun, lalu sarapan pukul enam pagi.";
const SUARA_E3 = "Kira belajar mulai pukul tujuh pagi.";
const SUARA_E4 = "Sarapan lebih dulu, lalu belajar. Keduanya terjadi di pagi hari.";
const SUARA_E5 = "Pagi dimulai sekitar pukul lima dan berakhir sekitar pukul sepuluh.";

export const ADEGAN_PAGI: AdeganStory = {
  id: "pagi",
  judul: "Kegiatan Kira di pagi hari",
  sumber: "Materi: kegiatan di pagi hari",
  latar: "#FFFBEB",
  ketukan: [
    k(SUARA_E1, tambah(0, judul("Pagi hari")), tambah(idx(SUARA_E1, "matahari"), emo("lg", 150, 56, EMO_BAGIAN.pagi, 28))),
    k(SUARA_E2, tambah(idx(SUARA_E2, "sarapan"), jam("j1", JAM_KIRI, 6, 0)), tambah(idx(SUARA_E2, "pukul"), namaJam("j1", JAM_KIRI, "Sarapan", W.kuning))),
    k(SUARA_E3, tambah(idx(SUARA_E3, "belajar"), jam("j2", JAM_KANAN, 7, 0)), tambah(idx(SUARA_E3, "pukul"), namaJam("j2", JAM_KANAN, "Belajar", W.kuning))),
    k(SUARA_E4, sorotkan(idx(SUARA_E4, "Sarapan"), "j1-p"), sorotkan(idx(SUARA_E4, "belajar"), "j2-p")),
    k(
      SUARA_E5,
      hapusJam(0, "j1"),
      hapusJam(0, "j2"),
      hapusNama(0, "j1"),
      hapusNama(0, "j2"),
      tambah(idx(SUARA_E5, "pukul", 1), jam("j1", JAM_KIRI, 5, 0), namaJam("j1", JAM_KIRI, "Mulai", W.kuning)),
      tambah(idx(SUARA_E5, "pukul", 2), jam("j2", JAM_KANAN, 10, 0), namaJam("j2", JAM_KANAN, "Selesai", W.kuning)),
    ),
  ],
};

/* ------------------------------ 7. Siang dan sore ------------------------------ */
const SUARA_F1 = "Sekarang siang hari. Matahari ada di tempat yang paling tinggi.";
const SUARA_F2 = "Kira makan siang pukul dua belas.";
const SUARA_F3 = "Lalu hari menjadi sore. Matahari mulai turun.";
const SUARA_F4 = "Kira pergi bermain pukul empat sore.";
const SUARA_F5 = "Siang dimulai sekitar pukul sebelas dan berakhir sekitar pukul dua. Sore dimulai sekitar pukul tiga dan berakhir sekitar pukul lima.";

export const ADEGAN_SIANG_SORE: AdeganStory = {
  id: "siang-sore",
  judul: "Kegiatan Kira di siang dan sore hari",
  sumber: "Materi: kegiatan siang dan sore",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_F1, tambah(0, judul("Siang dan sore")), tambah(idx(SUARA_F1, "matahari"), emo("lg", 150, 56, EMO_BAGIAN.siang, 28))),
    k(SUARA_F2, tambah(idx(SUARA_F2, "makan"), jam("j1", JAM_KIRI, 12, 0)), tambah(idx(SUARA_F2, "pukul"), namaJam("j1", JAM_KIRI, "Makan siang", W.emas))),
    k(SUARA_F3, hapus(idx(SUARA_F3, "sore"), "lg"), tambah(idx(SUARA_F3, "sore"), emo("lg", 150, 56, EMO_BAGIAN.sore, 28))),
    k(SUARA_F4, tambah(idx(SUARA_F4, "bermain"), jam("j2", JAM_KANAN, 4, 0)), tambah(idx(SUARA_F4, "pukul"), namaJam("j2", JAM_KANAN, "Bermain", W.oranye))),
    k(
      SUARA_F5,
      hapusJam(0, "j1"),
      hapusJam(0, "j2"),
      hapusNama(0, "j1"),
      hapusNama(0, "j2"),
      hapus(0, "lg"),
      tambah(idx(SUARA_F5, "Siang"), ...kartu("sg", 20, 50, 260, 40, W.emas, ["Siang: pukul 11 sampai 2"], 11.5)),
      tambah(idx(SUARA_F5, "Sore"), ...kartu("sr", 20, 108, 260, 40, W.oranye, ["Sore: pukul 3 sampai 5"], 11.5)),
    ),
  ],
};

/* ------------------------------ 8. Malam hari ------------------------------ */
const SUARA_G1 = "Sekarang malam hari. Langit gelap dan kita beristirahat.";
const SUARA_G2 = "Kira mulai tidur pukul sembilan malam.";
const SUARA_G3 = "Pukul sembilan malam, jarum pendek di angka sembilan dan jarum panjang di angka dua belas.";
const SUARA_G4 = "Malam dimulai sekitar pukul enam malam.";
const SUARA_G5 = "Jadi satu hari berurutan dari pagi, siang, sore, lalu malam.";

export const ADEGAN_MALAM: AdeganStory = {
  id: "malam",
  judul: "Kegiatan Kira di malam hari",
  sumber: "Materi: kegiatan di malam hari",
  latar: "#EEF2FF",
  ketukan: [
    k(SUARA_G1, tambah(0, judul("Malam hari")), tambah(idx(SUARA_G1, "malam"), emo("lg", 150, 56, EMO_BAGIAN.malam, 28))),
    k(SUARA_G2, tambah(idx(SUARA_G2, "tidur"), jam("j1", JAM_TENGAH_KECIL, 9, 0)), tambah(idx(SUARA_G2, "pukul"), namaJam("j1", JAM_TENGAH_KECIL, "Tidur", W.lavender))),
    k(SUARA_G3, sorotkan(idx(SUARA_G3, "pendek"), "j1-p"), sorotkan(idx(SUARA_G3, "panjang"), "j1-m")),
    k(SUARA_G4, ubah(0, { id: "j1-p", sorot: false }, { id: "j1-m", sorot: false }), putarJam(idx(SUARA_G4, "dimulai"), "j1", { h: 9, m: 0 }, { h: 6, m: 0 }), ubah(idx(SUARA_G4, "pukul"), { id: "j1-nama-t0", isi: "Awal malam" })),
    k(
      SUARA_G5,
      hapusJam(0, "j1"),
      hapusNama(0, "j1"),
      hapus(0, "lg"),
      ...BAGIAN.flatMap((b, j) => {
        const kata = ["pagi,", "siang,", "sore,", "malam."][j];
        return [tambah(idx(SUARA_G5, kata), kolomBagian(j, 100, 30), emo(`bge${j}`, 42 + j * 72, 90, EMO_BAGIAN[b], 30, { z: 1 }))];
      }),
    ),
  ],
};

/* ------------------------------ 9. Bagian hari pada jam digital ------------------------------ */
const SUARA_H1 = "Jam digital bisa menunjukkan waktu sampai malam hari. Kita lihat empat contoh.";
const SUARA_H2 = "Nol enam titik nol nol termasuk pagi.";
const SUARA_H3 = "Dua belas titik nol nol termasuk siang.";
const SUARA_H4 = "Enam belas titik nol nol termasuk sore. Itu sama dengan pukul empat sore.";
const SUARA_H5 = "Sembilan belas titik nol nol termasuk malam. Itu sama dengan pukul tujuh malam.";
const JAM_DIGITAL_BAGIAN = [6, 12, 16, 19];

export const ADEGAN_BAGIAN_DIGITAL: AdeganStory = {
  id: "bagian-digital",
  judul: "Bagian hari pada jam digital",
  sumber: "Materi: bagian hari dan jam digital",
  latar: "#F0F9FF",
  ketukan: [
    k(SUARA_H1, tambah(0, judul("Jam digital sehari"))),
    ...[SUARA_H2, SUARA_H3, SUARA_H4, SUARA_H5].map((s, j) => k(s, tambah(idx(s, "titik"), kartuBagianDigital(j, JAM_DIGITAL_BAGIAN[j], 0)))),
  ],
};
