import type { AdeganStory, Obj } from "./logika-story";
import { E, W, bulat, emo, gulungan, idGulungan, idPenggaris, judul, kandang, kotak, meteran, pagar, panah, penggaris, pindah, rumput, teks, tokoh } from "./k3b3A-gambar";
import { bersih, hapus, k, sorotkan, tambah, ubah } from "./k3b3A-bantu";

/*
 * Cerita orisinal IGIL "Ukuran Kandang Kak Tari" (Kelas 3 Bab 3 Sub-Bab A), awal cerita Kebun Binatang Mini.
 * Naskah suara dari naskah/story-naskah-k3b3a.md. Bagian ini: pagar kandang kambing dengan meteran, memilih alat ukur, dan penutup menuju Sub-Bab B.
 */

/* ------------------------------ 7. Pagar ------------------------------ */
const SUARA_P1 = "Pagar kandang kambing lebih panjang daripada penggaris, jadi Kak Tari memakai meteran gulung.";
const SUARA_P2 = "Bima menarik ujung meteran dari angka nol, dan Salsa membaca ujung pagar yang lain.";
const SUARA_P3 = "Panjang pagar tiga meter, dan hasilnya ditulis tiga m.";

export const ADEGAN_PAGAR: AdeganStory = {
  id: "pagar",
  judul: "Pagar kandang kambing",
  sumber: "Materi: pagar kandang kambing",
  latar: "#ECFCCB",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Pagar Kandang Kambing"), ...rumput("rt", 150), ...pagar("pg", 30, 150, 7, 40, 30)),
      tambah("kambing", emo("kb", 150, 146, E.kambing, 22, { z: 0 })),
      tambah("penggaris,", ...penggaris("pr", 30, 98, 5, 12)),
      tambah("Kak", ...tokoh("kt", 262, 184, "Kak Tari")),
      tambah("meteran", ...gulungan("gl", 236, 160)),
    ),
    k(
      SUARA_P2,
      hapus(0, ...idPenggaris("pr", 5), ...idGulungan("gl")),
      tambah("Bima", ...tokoh("bm", 30, 184, "Bima")),
      tambah("meteran", ...meteran("mt", 30, 66, 3, 80)),
      tambah("nol,", emo("ok0", 30, 50, E.benar, 14)),
      tambah("Salsa", ...tokoh("sl", 212, 184, "Salsa")),
      tambah("ujung@2", panah("pa", 270, 40, 0, 22, W.merah, 2.4)),
    ),
    k(
      SUARA_P3,
      tambah("tiga", teks("p3", 150, 50, "3 m", 16, W.merah)),
      tambah("hasilnya", ...kartuCatat()),
      tambah("ditulis", emo("ps", 204, 108, E.pensil, 16)),
      tambah(8, emo("ok", 98, 108, E.benar, 18)),
    ),
  ],
};
function kartuCatat(): Obj[] {
  return [kotak("kc-k", 120, 90, 60, 26, W.putih, W.biru, { rx: 3, z: 1 }), teks("kc-t0", 150, 108, "3 m", 13, W.biru, { z: 2 })];
}

/* ------------------------------ 8. Memilih alat ukur ------------------------------ */
const SUARA_A1 = "Kak Tari menguji mereka: kuku kelinci, pintu kandang, ekor kura-kura, dan pagar.";
const SUARA_A2 = "Kuku dan ekor pendek, diukur dengan penggaris. Pintu dan pagar panjang, diukur dengan meteran.";
const SUARA_A3 = "Memilih alat ukur yang tepat membuat hasilnya mudah dibaca.";
const NAMA_KARTU = ["kuku", "pintu", "ekor", "pagar"] as const;

/** Kartu benda ke-`i` (kuku, pintu, ekor, pagar) dengan pojok kiri-atas (x, y0): `c${i}-k`, `c${i}-t`, dan gambar bendanya. */
function kartuBenda(i: number, x: number, y0: number): Obj[] {
  const dasar: Obj[] = [kotak(`c${i}-k`, x, y0, 60, 46, "#FEF9C3", W.biru, { rx: 6, z: 0 }), teks(`c${i}-t`, x + 30, y0 + 42, NAMA_KARTU[i], 8.4, W.biru, { z: 3 })];
  if (i === 0) return [...dasar, emo("c0-s", x + 30, y0 + 26, E.kelinci, 20, { z: 2 })];
  if (i === 1) return [...dasar, kotak("c1-s", x + 20, y0 + 6, 20, 30, "#B7814A", "#6B4423", { rx: 1, z: 2 }), bulat("c1-b", x + 36, y0 + 22, 1.6, "#FACC15", "#92400E", { tebal: 0.8, z: 3 })];
  if (i === 2) return [...dasar, emo("c2-s", x + 30, y0 + 26, E.kura, 20, { z: 2 })];
  return [...dasar, ...pagar("c3", x + 10, y0 + 34, 4, 13, 22)];
}

export const ADEGAN_PILIH_ALAT: AdeganStory = {
  id: "pilih-alat",
  judul: "Memilih alat ukur yang tepat",
  sumber: "Materi: memilih alat ukur yang tepat",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_A1,
      tambah(0, judul("Menguji Alat Ukur")),
      tambah("kuku", ...kartuBenda(0, 12, 36)),
      tambah("pintu", ...kartuBenda(1, 84, 36)),
      tambah("ekor", ...kartuBenda(2, 156, 36)),
      tambah("pagar", ...kartuBenda(3, 228, 36)),
    ),
    k(
      SUARA_A2,
      tambah("Kuku", kotak("bx1", 12, 92, 136, 58, "#DCFCE7", W.hijauTua, { rx: 6, z: -1, putus: true })),
      ubah("pendek,", ...pindah(kartuBenda(0, 18, 98)), ...pindah(kartuBenda(2, 84, 98))),
      tambah("penggaris", teks("bl1", 80, 86, "penggaris", 10, W.hijauTua)),
      tambah("Pintu", kotak("bx2", 152, 92, 136, 58, "#DCFCE7", W.hijauTua, { rx: 6, z: -1, putus: true })),
      ubah("panjang,", ...pindah(kartuBenda(1, 158, 98)), ...pindah(kartuBenda(3, 222, 98))),
      tambah("meteran", teks("bl2", 220, 86, "meteran", 10, W.hijauTua)),
    ),
    k(
      SUARA_A3,
      tambah("alat", teks("au", 150, 56, "alat ukur yang tepat", 12, W.ungu)),
      tambah("tepat", emo("ok1", 80, 176, E.benar, 22), emo("ok2", 220, 176, E.benar, 22)),
      tambah("hasilnya", ...tokoh("sl", 150, 184, "Salsa")),
      tambah("dibaca", emo("mt", 184, 168, E.mata, 18)),
    ),
  ],
};

/* ------------------------------ 9. Penutup ------------------------------ */
const SUARA_Z1 = "Raka menepati taruhannya dan mengepel kandang kelinci, sementara kelinci mengintip dengan hidung bergerak.";
const SUARA_Z2 = "Besok Pak Wayan, tukang kandang, akan datang membawa pita dan meteran.";
const SUARA_Z3 = "Menurutmu, kalau satu meter sama dengan seratus sentimeter, berapa sentimeter dua meter? Terima kasih, Raka, Salsa, Bima, Pak Joko, dan Kak Tari!";

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Taruhan Raka dan jembatan ke Sub-Bab B",
  sumber: "Materi: taruhan Raka dan Pak Wayan",
  latar: "#F5F3FF",
  ketukan: [
    k(
      SUARA_Z1,
      tambah(0, judul("Taruhan Raka"), ...rumput("rt", 150)),
      tambah("Raka", ...tokoh("rk", 60, 184, "Raka")),
      tambah("mengepel", emo("pl", 98, 170, E.pel, 20), bulat("bb1", 84, 152, 3, "#BAE6FD", W.biru, { tebal: 1 }), bulat("bb2", 76, 146, 2.2, "#BAE6FD", W.biru, { tebal: 1 })),
      tambah("kandang", ...kandang("kl", 140, 86, 100, 64)),
      tambah("kelinci,", emo("kc", 190, 140, E.kelinci, 24)),
      tambah("hidung", bulat("hd", 202, 128, 2.4, "#F9A8D4", "#BE185D", { tebal: 0.8, z: 3 })),
    ),
    k(
      SUARA_Z2,
      tambah("Pak", ...tokoh("pw", 270, 184, "Pak Wayan")),
      sorotkan("kandang", "kl"),
      tambah("membawa", ...gulungan("gl", 252, 150)),
      tambah("pita", kotak("pt", 228, 160, 18, 4, "#FACC15", "#A16207", { rx: 1, tebal: 0.8, z: 3 })),
    ),
    k(
      SUARA_Z3,
      bersih(0),
      tambah(0, judul("Sampai Besok"), ...rumput("rt", 150)),
      tambah("satu", teks("e1", 116, 44, "1 m", 18, W.hijauTua)),
      tambah("seratus", teks("e2", 188, 44, "= 100 cm", 18, W.hijauTua)),
      tambah("dua", teks("e3", 150, 78, "2 m = ?", 20, W.merah)),
      tambah("Raka,", ...tokoh("rk", 30, 184, "Raka")),
      tambah("Salsa,", ...tokoh("sl", 80, 184, "Salsa")),
      tambah("Bima,", ...tokoh("bm", 128, 184, "Bima")),
      tambah("Pak", ...tokoh("pj", 178, 184, "Pak Joko")),
      tambah("Kak", ...tokoh("kt", 232, 184, "Kak Tari"), emo("l1", 30, 146, E.lambai, 16)),
      tambah("Tari!", emo("l2", 232, 146, E.lambai, 16)),
    ),
  ],
};
