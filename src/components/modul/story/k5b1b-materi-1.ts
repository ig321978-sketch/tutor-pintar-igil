import type { AdeganStory } from "./logika-story";
import { E, TABEL, TRIBUN, W, barisTabel, emo, garis, judul, kartu, kepalaTabel, panah, papan, rb, rumput, teks, tokoh } from "./k5b1b-gambar";
import { hapus, k, redamkan, sorotkan, tambah, warnai } from "./k5b1b-bantu";

/*
 * Cerita orisinal IGIL "Urutan Tribun Pak Hasto" (Kelas 5 Bab 1 Sub-Bab B), Hari Pertandingan di Stadion Kota.
 * Naskah suara dari naskah/story-naskah-k5b1b.md. Bagian ini: Pak Hasto dan daftar penonton, membandingkan dari kiri, dan tanda lebih besar, lebih kecil, sama dengan.
 */

/* ------------------------------ 1. Penyiar stadion ------------------------------ */
const SUARA_P1 = "Pak Hasto, penyiar stadion, ingin menyebut tribun paling ramai dari daftar penonton.";
const SUARA_P2 = "Bima, Citra, dan Fajar membantu sebelum peluit berbunyi.";
const SUARA_P3 = "Pertama, dua bilangan ditaruh berdampingan dengan kolom yang sama lurus ke bawah.";

const NAMA_DAFTAR = TRIBUN.map((t, i) => teks(`dn${i}`, 34, 66 + i * 18, t.nama, 9, W.hijauTua, { anchor: "start", z: 3 }));
const ANGKA_DAFTAR = TRIBUN.map((t, i) => teks(`dq${i}`, 196, 66 + i * 18, rb(t.banyak), 9, W.biru, { anchor: "end", z: 3 }));
const ID_DAFTAR = ["dp", "dj", ...NAMA_DAFTAR.map((o) => o.id), ...ANGKA_DAFTAR.map((o) => o.id)];

export const ADEGAN_PENYIAR: AdeganStory = {
  id: "penyiar",
  judul: "Pak Hasto, penyiar stadion",
  sumber: "Materi: Pak Hasto dan daftar penonton",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Pak Hasto, Penyiar Stadion"), ...rumput("rp", 150)),
      tambah("Hasto", ...tokoh("ph", 262, 184, "Pak Hasto")),
      tambah("penyiar", emo("pg", 234, 142, E.pengeras, 20)),
      tambah("ramai", papan("dp", 14, 34, 210, 100), teks("dj", 119, 48, "Daftar penonton", 9, W.coklat, { z: 3 })),
      tambah("daftar", ...NAMA_DAFTAR),
      tambah("penonton", ...ANGKA_DAFTAR),
    ),
    k(
      SUARA_P2,
      tambah("Bima", ...tokoh("bi", 36, 184, "Bima")),
      tambah("Citra", ...tokoh("ci", 84, 184, "Citra")),
      tambah("Fajar", ...tokoh("fa", 132, 184, "Fajar")),
      tambah("peluit", emo("bl", 190, 168, "\u{26BD}", 20), teks("pl", 214, 166, "peluit", 8, W.coklat, { z: 3 })),
    ),
    k(
      SUARA_P3,
      hapus(0, ...ID_DAFTAR, "pg", "bl", "pl"),
      tambah("bilangan", ...barisTabel("sa", TABEL, 0, "Selatan", 18705)),
      tambah("berdampingan", ...barisTabel("ba", TABEL, 1, "Barat", 30402), teks("n2", 270, 70, "2 bilangan", 8, W.merah, { z: 3 })),
      tambah("kolom", ...kepalaTabel("kh")),
      tambah("lurus", ...[0, 1, 2, 3, 4, 5].map((j) => garis(`gl${j}`, TABEL.x0 + j * TABEL.sel, 52, 0, 58, W.merah, 1, { putus: true, z: 4 }))),
    ),
  ],
};

/* ------------------------------ 2. Banding dari kiri ------------------------------ */
const SUARA_K1 = "Tribun Selatan delapan belas ribu tujuh ratus lima, Tribun Barat tiga puluh ribu empat ratus dua.";
const SUARA_K2 = "Bima membandingkan dari kiri, yaitu puluh ribuan.";
const SUARA_K3 = "Satu lawan tiga, tiga lebih besar, jadi Tribun Barat lebih ramai.";

export const ADEGAN_KIRI: AdeganStory = {
  id: "kiri",
  judul: "Bima membandingkan dari kiri",
  sumber: "Materi: banding dari kolom paling kiri",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_K1,
      tambah(0, judul("Bima Banding dari Kiri"), ...rumput("rp", 150), ...kepalaTabel("kh")),
      tambah("delapan", ...barisTabel("r0", TABEL, 0, "Selatan", 18705)),
      tambah("tiga", ...barisTabel("r1", TABEL, 1, "Barat", 30402)),
    ),
    k(
      SUARA_K2,
      tambah(0, ...tokoh("bi", 36, 184, "Bima")),
      tambah("kiri", panah("pa", 114, 124, 0, -14, W.merah, 2.4, { z: 6 }), teks("kd", 114, 136, "kiri dulu", 8, W.merah, { z: 3 })),
      warnai("puluh", W.emasMuda, "r0-c0", "r1-c0"),
    ),
    k(
      SUARA_K3,
      sorotkan("Satu", "r0-d0"),
      sorotkan("tiga", "r1-d0"),
      tambah("besar", teks("bd", 270, 70, "1 < 3", 11, W.merah, { z: 3 })),
      warnai("Barat", W.hijauMuda, ...[0, 1, 2, 3, 4].map((j) => `r1-c${j}`)),
      tambah("ramai", teks("br", 270, 96, "Barat", 8, W.hijauTua, { z: 3 }), teks("br2", 270, 106, "lebih ramai", 8, W.hijauTua, { z: 3 }), emo("jp", 270, 128, E.jempol, 18)),
    ),
  ],
};

/* ------------------------------ 3. Tanda ------------------------------ */
const SUARA_T1 = "Citra menggambar tanda seperti mulut yang terbuka ke bilangan lebih besar.";
const SUARA_T2 = "Jadi delapan belas ribu tujuh ratus lima lebih kecil dari tiga puluh ribu empat ratus dua.";
const SUARA_T3 = "Kalau kedua bilangan sama persis, kita memakai tanda sama dengan.";

export const ADEGAN_TANDA: AdeganStory = {
  id: "tanda",
  judul: "Citra menggambar tanda",
  sumber: "Materi: tanda lebih besar, lebih kecil, sama dengan",
  latar: "#FDF2F8",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Citra Menggambar Tanda"), ...rumput("rp", 150), ...tokoh("ci", 36, 184, "Citra"), ...kartu("a0", 30, 36, 84, 28, W.biruMuda, [rb(18705)], 13), ...kartu("a1", 186, 36, 84, 28, W.biruMuda, [rb(30402)], 13)),
      tambah("tanda", garis("m1", 162, 38, -22, 12, W.merah, 3.5, { z: 4 }), garis("m2", 140, 50, 22, 12, W.merah, 3.5, { z: 4 })),
      tambah("mulut", emo("mt", 150, 82, E.mulut, 20)),
      sorotkan("terbuka", "m1", "m2"),
      tambah("bilangan", panah("pb", 166, 50, 14, 0, W.hijau, 2, { z: 6 })),
      sorotkan("besar", "a1-k"),
      tambah("besar", teks("lb", 228, 78, "lebih besar", 8, W.hijauTua, { z: 3 })),
    ),
    k(
      SUARA_T2,
      redamkan(0, "a1-k"),
      sorotkan("delapan", "a0-k"),
      tambah("kecil", teks("lk", 72, 78, "lebih kecil", 8, W.merah, { z: 3 })),
      redamkan("tiga", "a0-k"),
      sorotkan("tiga", "a1-k"),
      tambah("dua", teks("pt", 150, 96, "18.705 < 30.402", 10, W.biru, { z: 3 })),
    ),
    k(
      SUARA_T3,
      hapus(0, "pt"),
      tambah("bilangan", ...kartu("b0", 30, 104, 84, 28, W.emasMuda, [rb(24350)], 13), ...kartu("b1", 186, 104, 84, 28, W.emasMuda, [rb(24350)], 13)),
      sorotkan("persis", "b0-k", "b1-k"),
      tambah("tanda", teks("sp", 150, 144, "sama persis", 8, W.hijauTua, { z: 3 })),
      tambah("sama@2", garis("e1", 140, 114, 20, 0, W.merah, 3, { z: 4 }), garis("e2", 140, 124, 20, 0, W.merah, 3, { z: 4 }), emo("ok", 150, 100, E.benar, 14)),
    ),
  ],
};
