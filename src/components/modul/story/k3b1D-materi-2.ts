import type { AdeganStory } from "./logika-story";
import { E, W, bak, batang, blok, butir, garis, idBatang, judul, kapur, kotak, kotakKue, lantaiToko, loyang, meja, papanKapur, susunTeks, teks, tokoh } from "./k3b1D-gambar";
import { bersih, hapus, k, sorotkan, tambah, ubah } from "./k3b1D-bantu";

/*
 * Cerita orisinal IGIL "Pesanan Bu Tuti" (Kelas 3 Bab 1 Sub-Bab D), lanjutan.
 * Naskah suara dari naskah/story-naskah-k3b1d.md. Bagian ini: lupa menyimpan (salah langkah, taruhan, loyang), tukar sepuluh dengan batang dan butir, dan tiga bilangan.
 */

/* ------------------------------ 4. Lupa menyimpan ------------------------------ */
const SUARA_L1 = "Pesanan kedua: tiga puluh delapan kue dan dua puluh tujuh. Raka menulis lima dari lima belas dan melupakan satu puluhan. Hasilnya lima puluh lima.";
const SUARA_L2 = "Raka bertaruh, kalau salah, aku mencuci semua loyang!";
const SUARA_L3 = "Salsa mengingatkan: lima belas itu satu puluhan dan lima satuan, puluhan harus disimpan.";

export const ADEGAN_LUPA_SIMPAN: AdeganStory = {
  id: "lupa-simpan",
  judul: "Lupa menyimpan",
  sumber: "Materi: salah langkah lupa menyimpan",
  latar: "#FEF2F2",
  ketukan: [
    k(
      SUARA_L1,
      tambah(0, judul("Lupa Menyimpan", W.merah), papanKapur("pk", 80, 28, 200, 130), ...tokoh("rk", 40, 184, "Raka")),
      tambah("tiga", kapur("s1", 180, 62, "38 + 27", 16)),
      tambah("menulis", kapur("s2", 180, 92, "5 dari 15", 12)),
      tambah("melupakan", kapur("s3", 180, 114, "lupa 1 puluhan", 11, { warna: "#FCA5A5" })),
      tambah("Hasilnya", teks("hs", 180, 142, "55 ?", 16, W.emas, { z: 3 })),
    ),
    k(
      SUARA_L2,
      tambah("bertaruh,", teks("tr", 44, 138, "taruhan!", 9, W.merah)),
      tambah("mencuci", ...bak("bk", 204, 160, 76, 36)),
      tambah("loyang!", ...loyang("ly1", 212, 166), ...loyang("ly2", 240, 166), ...loyang("ly3", 226, 176)),
    ),
    k(
      SUARA_L3,
      tambah("Salsa", ...tokoh("sl", 70, 184, "Salsa")),
      hapus("lima", "s2", "s3", "hs"),
      tambah("lima@1", kapur("f1", 180, 92, "15", 20)),
      tambah("puluhan", kapur("f2", 150, 126, "1 puluhan", 12)),
      tambah("satuan,", kapur("f3", 214, 126, "5 satuan", 12)),
      tambah("disimpan.", kapur("sm", 180, 146, "simpan!", 12, { warna: W.emas })),
    ),
  ],
};

/* ------------------------------ 5. Tukar sepuluh ------------------------------ */
const SUARA_T1 = "Bima memakai batang puluhan dan butir satuan untuk menunjukkan.";
const SUARA_T2 = "Sepuluh butir satuan ditukar jadi satu batang puluhan, lalu pindah ke puluhan.";
const SUARA_T3 = "Itulah arti menyimpan. Puluhan: tiga ditambah dua ditambah satu sama dengan enam. Jumlahnya enam puluh lima.";

/** Lima belas butir satuan `bs-1`..`bs-15` (tiga baris lima) di kolom satuan. */
const satuanLepas = (): ReturnType<typeof butir>[] => Array.from({ length: 15 }, (_, i) => butir(`bs-${i + 1}`, 195 + (i % 5) * 10, 70 + Math.floor(i / 5) * 10));
const ID_SEPULUH = Array.from({ length: 10 }, (_, i) => `bs-${i + 1}`);
const ID_RODA = [1, 2, 3, 4, 5].flatMap((i) => idBatang(`bk-t-p${i}`));

export const ADEGAN_TUKAR_SEPULUH: AdeganStory = {
  id: "tukar-sepuluh",
  judul: "Tukar sepuluh",
  sumber: "Materi: tukar sepuluh, menyimpan",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Batang dan Butir"), ...tokoh("bm", 44, 184, "Bima"), kotak("pl", 90, 30, 190, 140, W.putih, W.hijauTua, { rx: 6, tebal: 2, z: 0 }), garis("dv", 185, 34, 0, 132, W.hijauTua, 1.4, { z: 1 })),
      tambah("batang", teks("lp", 137, 46, "puluhan", 9, W.biru), teks("ls", 232, 46, "satuan", 9, W.merah), ...blok("t", 100, 80, 5, 0)),
      tambah("butir", ...satuanLepas()),
    ),
    k(
      SUARA_T2,
      sorotkan("Sepuluh", ...ID_SEPULUH),
      tambah("butir", teks("n10", 232, 118, "10 butir", 10, W.merah)),
      hapus("ditukar", ...ID_SEPULUH),
      tambah("satu@2", teks("n1b", 232, 136, "1 batang", 10, W.biru)),
      tambah("batang", ...batang("ts-p1", 255, 80)),
      ubah("pindah", { id: "ts-p1", x: 145, y: 80 }, { id: "ts-p1-g", x: 146, y: 94 }),
    ),
    k(
      SUARA_T3,
      tambah("menyimpan.", teks("sim", 160, 68, "1", 12, W.merah)),
      sorotkan("Puluhan:", ...ID_RODA),
      tambah("tiga", teks("eq", 137, 158, "3", 11, W.hijauTua)),
      ubah("dua", { id: "eq", isi: "3 + 2" }),
      ubah("satu", { id: "eq", isi: "3 + 2 + 1" }),
      ubah("enam.", { id: "eq", isi: "3 + 2 + 1 = 6" }),
      tambah("Jumlahnya", teks("h65", 232, 160, "65", 18, W.hijauTua, { z: 3 })),
    ),
  ],
};

/* ------------------------------ 6. Tiga bilangan ------------------------------ */
const SUARA_G1 = "Pesanan ketiga: lima belas kue donat, dua puluh empat kue lapis, dan tiga puluh satu kue bolu.";
const SUARA_G2 = "Lima belas ditambah dua puluh empat sama dengan tiga puluh sembilan. Lalu tambah tiga puluh satu.";
const SUARA_G3 = "Sembilan ditambah satu sepuluh, simpan satu. Hasilnya tujuh puluh kue.";

export const ADEGAN_TIGA_BILANGAN: AdeganStory = {
  id: "tiga-bilangan",
  judul: "Tiga bilangan",
  sumber: "Materi: menjumlah tiga bilangan",
  latar: "#FFF1F2",
  ketukan: [
    k(
      SUARA_G1,
      tambah(0, judul("Pesanan Ketiga"), ...lantaiToko("lt", 150), ...meja("mj", 30, 112, 240)),
      tambah("belas", ...kotakKue("k1", 40, 84, 56, 28, E.donat, 6, 3), teks("c1", 68, 72, "15", 11, W.merah), teks("m1", 68, 134, "donat", 8, W.ungu)),
      tambah("lapis,", ...kotakKue("k2", 122, 84, 56, 28, E.kueLapis, 6, 3), teks("c2", 150, 72, "24", 11, W.merah), teks("m2", 150, 134, "lapis", 8, W.ungu)),
      tambah("bolu.", ...kotakKue("k3", 204, 84, 56, 28, E.bolu, 6, 3), teks("c3", 232, 72, "31", 11, W.merah), teks("m3", 232, 134, "bolu", 8, W.ungu)),
    ),
    k(
      SUARA_G2,
      sorotkan("Lima", "k1", "k2"),
      tambah("dua", teks("eq", 150, 48, "15 + 24", 13, W.biru)),
      ubah("sembilan.", { id: "eq", isi: "15 + 24 = 39" }),
      ubah("Lalu", { id: "eq", isi: "15 + 24 = 39 + 31" }),
      sorotkan("tiga@2", "k3"),
    ),
    k(
      SUARA_G3,
      bersih(0),
      tambah(0, judul("Tiga Bilangan"), papanKapur("pk", 30, 28, 240, 150), ...susunTeks("ls2", 39, 31, 170, 64)),
      tambah("Sembilan", kapur("e9", 235, 84, "9 + 1 = 10", 11)),
      tambah("simpan", kapur("sm", 235, 110, "simpan 1", 11, { warna: W.emas })),
      tambah("Hasilnya", kapur("ls2-h", 170, 120, "70", 18, { anchor: "end" })),
      tambah("tujuh", teks("hk", 150, 164, "70 kue", 14, W.emas, { z: 3 })),
    ),
  ],
};
