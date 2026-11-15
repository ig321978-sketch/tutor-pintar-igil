import type { AdeganStory } from "./logika-story";
import { BAGIAN, EMO_BAGIAN, JAM_KANAN, JAM_KIRI, JAM_TENGAH_KECIL, OWL, W, barisLama, digital, emo, jam, judul, kartu, kolomBagian, pilihKata, teks, type PosisiJam } from "./k2b6B-gambar";
import { hapusJam, hapusKartu, idx, k, sorotkan, tambah, ubah, ubahDigital } from "./k2b6B-bantu";

/** Jam sedang untuk latihan: menyisakan ruang di bawah untuk kartu pilihan. */
export const JAM_LATIHAN: PosisiJam = { cx: 150, cy: 92, r: 50 };

/* ------------------------------ 15. Latihan satu: membaca pukul tepat ------------------------------ */
const SUARA_N1 = "Latihan satu. Perhatikan jam di layar.";
const SUARA_N2 = "Jarum panjang di angka dua belas. Lihat jarum pendeknya. Pukul berapa jam ini? Ketuk jawabanmu.";
const SUARA_N3 = "Betul, pukul delapan tepat! Jarum pendeknya di angka delapan.";
const SUARA_N4 = "Pukul delapan tepat ditulis nol delapan titik nol nol pada jam digital.";

export const ADEGAN_LATIHAN_SATU: AdeganStory = {
  id: "latihan-satu",
  judul: "Latihan: pukul berapa jam ini",
  sumber: "Materi: Latihan membaca pukul tepat",
  latar: "#FFFBEB",
  ketukan: [
    k(SUARA_N1, tambah(0, judul("Latihan satu")), tambah(idx(SUARA_N1, "jam"), jam("j1", JAM_LATIHAN, 8, 0))),
    k(SUARA_N2, sorotkan(idx(SUARA_N2, "pendeknya"), "j1-p"), tambah(idx(SUARA_N2, "Ketuk"), ...pilihKata(158, ["7", "8", "9"], 16))),
    k(SUARA_N3, ubah(0, { id: "j1-p", sorot: false }), sorotkan(idx(SUARA_N3, "Betul"), "c2-k")),
    k(SUARA_N4, hapusKartu(0, 3), tambah(idx(SUARA_N4, "ditulis"), digital(94, 156, 8, 0, 112))),
  ],
};

/* ------------------------------ 16. Latihan dua: bagian hari dari jam digital ------------------------------ */
const SUARA_O1 = "Latihan dua. Jam digital di layar menunjukkan enam belas titik nol nol.";
const SUARA_O2 = "Termasuk bagian hari apa? Ketuk jawabanmu.";
const SUARA_O3 = "Betul, sore! Enam belas titik nol nol sama dengan pukul empat sore.";
const SUARA_O4 = "Sekarang jamnya berubah. Tiga belas titik nol nol termasuk siang.";

export const ADEGAN_LATIHAN_DUA: AdeganStory = {
  id: "latihan-dua",
  judul: "Latihan: bagian hari dari jam digital",
  sumber: "Materi: Latihan bagian hari",
  latar: "#F0F9FF",
  ketukan: [
    k(SUARA_O1, tambah(0, judul("Latihan dua")), tambah(idx(SUARA_O1, "digital"), digital(66, 56, 16, 0, 168, 56))),
    k(SUARA_O2, tambah(idx(SUARA_O2, "Ketuk"), ...pilihKata(138, ["siang", "sore", "malam"], 12))),
    k(SUARA_O3, sorotkan(idx(SUARA_O3, "Betul"), "c2-k")),
    k(SUARA_O4, hapusKartu(0, 3), ubahDigital(idx(SUARA_O4, "Tiga"), 13, 0)),
  ],
};

/* ------------------------------ 17. Latihan tiga: berapa jam ------------------------------ */
const SUARA_P1 = "Latihan tiga. Wei belajar mulai pukul sembilan sampai pukul sebelas.";
const SUARA_P2 = "Berapa jam Wei belajar? Hitung dari jarum pendek. Ketuk jawabanmu.";
const SUARA_P3 = "Betul, dua jam! Jarum pendek bergerak dari angka sembilan ke angka sebelas.";
const SUARA_P4 = "Sembilan, sepuluh, sebelas. Jarum pendek melewati dua angka, jadi lamanya dua jam.";

export const ADEGAN_LATIHAN_TIGA: AdeganStory = {
  id: "latihan-tiga",
  judul: "Latihan: berapa jam lamanya",
  sumber: "Materi: Latihan lama kegiatan",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Latihan tiga")),
      tambah(idx(SUARA_P1, "mulai"), jam("j1", { ...JAM_KIRI, cy: 90 }, 9, 0), teks("mu", 78, 40, "Mulai", 10, W.hijau)),
      tambah(idx(SUARA_P1, "sebelas"), jam("j2", { ...JAM_KANAN, cy: 90 }, 11, 0), teks("se", 222, 40, "Selesai", 10, W.merah)),
    ),
    k(SUARA_P2, tambah(idx(SUARA_P2, "Ketuk"), ...pilihKata(152, ["1", "2", "3"], 16))),
    k(SUARA_P3, sorotkan(idx(SUARA_P3, "Betul"), "c2-k"), sorotkan(idx(SUARA_P3, "pendek"), "j1-p", "j2-p")),
    k(SUARA_P4, hapusKartu(0, 3), ubah(0, { id: "j1-p", sorot: false }, { id: "j2-p", sorot: false }), tambah(idx(SUARA_P4, "lamanya"), barisLama(1, 160, "Belajar", 120, W.hijauMuda))),
  ],
};

/* ------------------------------ 18. Latihan empat: lebih lama ------------------------------ */
const SUARA_Q1 = "Latihan empat. Kira menyikat gigi sekitar tiga menit dan tidur malam sekitar delapan jam.";
const SUARA_Q2 = "Kegiatan mana yang lebih lama? Ketuk jawabanmu.";
const SUARA_Q3 = "Betul, tidur malam! Tidur malam lebih lama dari menyikat gigi.";
const SUARA_Q4 = "Jadi menyikat gigi lebih sebentar dari tidur malam.";

export const ADEGAN_LATIHAN_EMPAT: AdeganStory = {
  id: "latihan-empat",
  judul: "Latihan: kegiatan mana lebih lama",
  sumber: "Materi: Latihan lebih lama",
  latar: "#FDF2F8",
  ketukan: [
    k(SUARA_Q1, tambah(0, judul("Latihan empat")), tambah(idx(SUARA_Q1, "menyikat"), barisLama(1, 54, "Menyikat gigi", 3, W.pink, false)), tambah(idx(SUARA_Q1, "tidur"), barisLama(2, 98, "Tidur malam", 480, W.pink, false))),
    k(SUARA_Q2, tambah(idx(SUARA_Q2, "Ketuk"), ...pilihKata(142, ["menyikat gigi", "tidur malam"], 11))),
    k(SUARA_Q3, sorotkan(idx(SUARA_Q3, "Betul"), "c2-k")),
    k(SUARA_Q4, hapusKartu(0, 2), sorotkan(idx(SUARA_Q4, "menyikat"), "lm1-nm", "lm1-t")),
  ],
};

/* ------------------------------ 19. Penutup ------------------------------ */
const SUARA_R1 = "Mari kita ingat lagi. Jarum pendek menunjukkan jam, dan jarum panjang menunjukkan menit.";
const SUARA_R2 = "Satu hari punya empat bagian, yaitu pagi, siang, sore, dan malam.";
const SUARA_R3 = "Kegiatan bisa diurutkan menurut waktunya. Kita juga bisa membandingkan lamanya dengan kata lebih lama dan lebih sebentar. Terima kasih, sampai jumpa!";

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Ringkasan waktu",
  sumber: "Materi: ringkasan waktu",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_R1, tambah(0, judul("Ringkasan")), tambah(idx(SUARA_R1, "jam,"), jam("j1", JAM_TENGAH_KECIL, 3, 0, false)), tambah(idx(SUARA_R1, "menit."), ...kartu("zz", 30, 164, 240, 28, W.krem, ["pendek: jam, panjang: menit"], 10.5))),
    k(
      SUARA_R2,
      hapusJam(0, "j1", false),
      { at: 0, hapus: ["zz-k", "zz-t0"] },
      ...BAGIAN.map((b, j) => tambah(idx(SUARA_R2, ["pagi,", "siang,", "sore,", "malam."][j]), kolomBagian(j, 100, 30), emo(`bge${j}`, 42 + j * 72, 90, EMO_BAGIAN[b], 30, { z: 1 }))),
    ),
    k(
      SUARA_R3,
      ...BAGIAN.map((_, j) => ({ at: 0, hapus: [`bg${j}-k`, `bg${j}-nm`, `bge${j}`] })),
      tambah(idx(SUARA_R3, "diurutkan"), ...kartu("e1", 14, 40, 272, 36, W.hijauMuda, ["Kegiatan diurutkan menurut waktu"], 10.4)),
      tambah(idx(SUARA_R3, "membandingkan"), ...kartu("e2", 14, 86, 272, 36, W.langit, ["lebih lama dan lebih sebentar"], 10.4)),
      tambah(idx(SUARA_R3, "Terima"), emo("ow", 150, 170, OWL, 30)),
    ),
  ],
};
