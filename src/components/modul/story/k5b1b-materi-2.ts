import type { AdeganStory } from "./logika-story";
import { E, TABEL, W, WT, barisTabel, emo, garis, idBaris, idKepala, judul, kepalaTabel, kotak, panah, rumput, teks, tokoh } from "./k5b1b-gambar";
import { hapus, k, sorotkan, tambah, warnai } from "./k5b1b-bantu";

/*
 * Cerita orisinal IGIL "Urutan Tribun Pak Hasto" (Kelas 5 Bab 1 Sub-Bab B), Hari Pertandingan di Stadion Kota.
 * Naskah suara dari naskah/story-naskah-k5b1b.md. Bagian ini: salah langkah Fajar (angka pertama padahal kolomnya berbeda), pemeriksaan banyak angka oleh Citra, dan bergeser ke kanan.
 */

/* ------------------------------ 4. Salah langkah: angka pertama ------------------------------ */
const SUARA_S1 = "Fajar membandingkan Tribun Timur, sembilan ribu enam puluh, dengan Tribun Selatan.";
const SUARA_S2 = "Ia berseru, sembilan lebih besar dari satu, jadi Tribun Timur lebih ramai!";
const SUARA_S3 = "Kalau aku salah, aku menyanyikan lagu klub di depan semua tribun, janjinya.";

export const ADEGAN_SALAH_BANDING: AdeganStory = {
  id: "salah-banding",
  judul: "Fajar membandingkan terburu-buru",
  sumber: "Materi: salah langkah membandingkan angka pertama",
  latar: "#FFF1F2",
  ketukan: [
    k(
      SUARA_S1,
      tambah(0, judul("Fajar Salah Membandingkan"), ...rumput("rp", 150), ...tokoh("fa", 36, 184, "Fajar"), ...kepalaTabel("kh")),
      tambah("Timur", ...barisTabel("r0", TABEL, 0, "Timur", 9060)),
      tambah("Selatan", ...barisTabel("r1", TABEL, 1, "Selatan", 18705)),
    ),
    k(
      SUARA_S2,
      tambah("berseru", emo("sr", 36, 140, E.seru, 14)),
      warnai("sembilan", W.merahMuda, "r0-c1"),
      sorotkan("sembilan", "r0-d1"),
      warnai("satu", W.merahMuda, "r1-c0"),
      sorotkan("satu", "r1-d0"),
      tambah("besar", teks("bd", 270, 70, "9 > 1?", 11, W.merah, { z: 3 })),
      tambah("dari", garis("sl", 142, 70, -28, 20, W.merah, 1.4, { putus: true, z: 5 })),
      tambah("ramai", teks("tl1", 270, 96, "Timur", 8, W.merah, { z: 3 }), teks("tl2", 270, 106, "ramai?", 8, W.merah, { z: 3 }), emo("tn", 270, 128, E.tanya, 20)),
    ),
    k(
      SUARA_S3,
      hapus(0, ...idBaris("r0", 9060), ...idBaris("r1", 18705), ...idKepala("kh"), "sr", "bd", "sl", "tl1", "tl2", "tn"),
      tambah("salah", teks("tr", 150, 40, "taruhan", 10, W.merah, { z: 3 })),
      tambah("menyanyikan", emo("mk", 62, 158, E.mikrofon, 20), emo("n1", 84, 130, E.musik, 18)),
      tambah("lagu", emo("n2", 122, 142, E.musik, 18)),
      tambah("klub", emo("bd2", 98, 156, E.bendera, 20)),
      tambah("tribun", ...[0, 1, 2, 3].flatMap((i) => [kotak(`st${i}`, 13 + i * 70, 52, 64, 52, WT[i], W.biru, { rx: 4, tebal: 1.4, z: 1 }), teks(`sn${i}`, 45 + i * 70, 82, ["Timur", "Selatan", "Utara", "Barat"][i], 9, W.biru, { z: 3 })])),
      tambah("janjinya", emo("kf", 220, 150, E.tertawa, 22)),
    ),
  ],
};

/* ------------------------------ 5. Periksa: banyak angka ------------------------------ */
const SUARA_P1 = "Citra menghitung banyak angkanya: sembilan ribu enam puluh punya empat angka, Tribun Selatan lima angka.";
const SUARA_P2 = "Bilangan yang angkanya lebih banyak pasti lebih besar, jadi Tribun Selatan lebih ramai.";
const SUARA_P3 = "Fajar menyanyi dengan suara sumbang sampai penjual kacang di tribun ikut menutup telinga.";

export const ADEGAN_PERIKSA_PANJANG: AdeganStory = {
  id: "periksa-panjang",
  judul: "Citra menghitung banyak angka",
  sumber: "Materi: lebih banyak angka berarti lebih besar",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Citra Menghitung Angka"), ...rumput("rp", 150), ...tokoh("ci", 36, 184, "Citra"), ...kepalaTabel("kh")),
      tambah("sembilan", ...barisTabel("r0", TABEL, 0, "Timur", 9060)),
      tambah("empat", teks("c4", 270, 67, "4 angka", 8, W.merah, { z: 3 })),
      tambah("Selatan", ...barisTabel("r1", TABEL, 1, "Selatan", 18705)),
      tambah("lima", teks("c5", 270, 93, "5 angka", 8, W.merah, { z: 3 })),
    ),
    k(
      SUARA_P2,
      sorotkan("banyak", "r1-d0"),
      warnai("pasti", W.merahMuda, "r0-c0"),
      tambah("besar", teks("lb1", 270, 118, "lebih banyak", 7.5, W.hijauTua, { z: 3 }), teks("lb2", 270, 127, "angka", 7.5, W.hijauTua, { z: 3 })),
      warnai("Selatan", W.hijauMuda, ...[0, 1, 2, 3, 4].map((j) => `r1-c${j}`)),
      tambah("ramai", emo("jp", 270, 150, E.jempol, 18)),
    ),
    k(
      SUARA_P3,
      hapus(0, ...idBaris("r0", 9060), ...idBaris("r1", 18705), ...idKepala("kh"), "c4", "c5", "lb1", "lb2", "jp"),
      tambah(0, ...tokoh("fa", 110, 184, "Fajar")),
      tambah("suara", emo("mk", 134, 158, E.mikrofon, 20), emo("n1", 150, 126, E.musik, 18)),
      tambah("sumbang", emo("n2", 172, 108, E.musik, 18), emo("n3", 194, 130, E.musik, 18)),
      tambah("penjual", emo("pj", 232, 160, E.pak, 26), teks("pjn", 232, 176, "penjual kacang", 7.5, W.hijauTua, { z: 3 })),
      tambah("kacang", emo("kc", 206, 160, E.kacang, 20)),
      tambah("tribun", kotak("st", 14, 34, 272, 62, W.abu, W.biru, { rx: 4, tebal: 1.4, z: -1 }), teks("sn", 150, 52, "Tribun Selatan", 9, W.biru, { z: 3 })),
      tambah("menutup", emo("tl", 262, 138, E.telinga, 22)),
    ),
  ],
};

/* ------------------------------ 6. Bergeser ke kanan ------------------------------ */
const SUARA_G1 = "Tribun Utara minggu ini dua puluh empat ribu tiga ratus lima puluh, minggu lalu dua puluh empat ribu tiga ratus lima.";
const SUARA_G2 = "Dua, empat, dan tiga sama, jadi Bima terus bergeser ke kanan sampai angkanya berbeda.";
const SUARA_G3 = "Di puluhan, lima lebih besar dari nol, sehingga minggu ini lebih ramai.";

export const ADEGAN_GESER: AdeganStory = {
  id: "geser",
  judul: "Bima bergeser ke kanan",
  sumber: "Materi: bergeser bila angka sama",
  latar: "#FEFCE8",
  ketukan: [
    k(
      SUARA_G1,
      tambah(0, judul("Bima Bergeser ke Kanan"), ...rumput("rp", 150), ...tokoh("bi", 36, 184, "Bima"), ...kepalaTabel("kh")),
      tambah("ini", ...barisTabel("r0", TABEL, 0, "Minggu ini", 24350)),
      tambah("lalu", ...barisTabel("r1", TABEL, 1, "Minggu lalu", 24305)),
    ),
    k(
      SUARA_G2,
      warnai(0, W.hijauMuda, "r0-c0", "r1-c0"),
      warnai("empat", W.hijauMuda, "r0-c1", "r1-c1"),
      warnai("tiga", W.hijauMuda, "r0-c2", "r1-c2"),
      tambah("sama", teks("sm", 270, 70, "sama", 9, W.hijauTua, { z: 3 })),
      tambah("bergeser", panah("pg", 114, 124, 84, 0, W.merah, 2.4, { z: 6 })),
      warnai("berbeda", W.merahMuda, "r0-c3", "r1-c3"),
      tambah("berbeda", teks("bb", 270, 96, "beda", 9, W.merah, { z: 3 })),
    ),
    k(
      SUARA_G3,
      hapus(0, "sm", "bb"),
      sorotkan("puluhan", "r0-c3", "r1-c3"),
      sorotkan("lima", "r0-d3"),
      tambah("besar", teks("lg", 270, 70, "5 > 0", 11, W.merah, { z: 3 })),
      sorotkan("nol", "r1-d3"),
      warnai("sehingga", W.hijauMuda, "r0-c3"),
      tambah("ramai", teks("lm1", 270, 96, "Minggu ini", 8, W.hijauTua, { z: 3 }), teks("lm2", 270, 106, "lebih ramai", 8, W.hijauTua, { z: 3 }), emo("jp", 270, 128, E.jempol, 18)),
    ),
  ],
};
