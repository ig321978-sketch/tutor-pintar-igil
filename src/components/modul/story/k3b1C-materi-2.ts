import type { AdeganStory } from "./logika-story";
import { E, W, emo, garisBilangan, halaman, judul, kartuAngka, karung, kotak, barisKarung, idBarisKarung, panah, papanKapur, papanTempat, posGaris, sorotKolom, tanda, teks, titik, tokoh } from "./k3b1C-gambar";
import { bersih, hapus, k, tambah, ubah } from "./k3b1C-bantu";

/*
 * Cerita orisinal IGIL "Karung Pak Dodi" (Kelas 3 Bab 1 Sub-Bab C).
 * Naskah suara dari naskah/story-naskah-k3b1c.md. Bagian ini: salah urut (taruhan Raka), tanda perbandingan berupa mulut, garis bilangan ratusan.
 */

/** Dua papan tiga tempat kecil (lebar 96) di (24, 34) dan (180, 34). */
const PA = [24, 34, 96] as const;
const PB = [180, 34, 96] as const;

/* ------------------------------ 4. Salah urut ------------------------------ */
const SUARA_D1 = "Raka membandingkan dari belakang. Katanya, enam lebih besar dari lima, jadi Gudang Selatan lebih banyak! Kalau salah, aku memikul tiga karung!";
const SUARA_D2 = "Salsa menggeleng. Bandingkan dari kiri, yaitu ratusan dulu, lalu puluhan.";
const SUARA_D3 = "Bima menunjuk puluhan. Jadi Gudang Utara lebih banyak, dan Raka pun memikul karung.";

export const ADEGAN_SALAH_URUT: AdeganStory = {
  id: "salah-urut",
  judul: "Raka membandingkan dari belakang",
  sumber: "Materi: salah langkah membandingkan dari satuan",
  latar: "#FEF2F2",
  ketukan: [
    k(
      SUARA_D1,
      bersih(0),
      tambah(0, judul("Raka Terburu-buru", W.merah), ...halaman("hl", 120)),
      tambah("Raka", ...tokoh("rk", 40, 172, "Raka"), emo("sr", 66, 150, E.seru, 18, { z: 3 })),
      tambah("membandingkan", ...papanTempat("pa", ...PA, "Gudang Utara", ["4", "6", "5"]), ...papanTempat("pb", ...PB, "Gudang Selatan", ["4", "5", "6"])),
      tambah("belakang.", panah("pk", 262, 108, -210, 0, W.merah, 3, { z: 3 })),
      tambah("enam", sorotKolom("pa", ...PA, 2), sorotKolom("pb", ...PB, 2)),
      tambah("lima", teks("k65", 150, 134, "6 > 5", 14, W.merah, { z: 3 })),
      tambah("banyak", teks("kl", 150, 152, "Selatan lebih banyak?", 9, W.merah, { z: 3 })),
      tambah("memikul", ...barisKarung("mk", 226, 166, 3, 19)),
      tambah("tiga", teks("n3", 262, 150, "3 karung", 10, W.coklat, { z: 3 })),
    ),
    k(
      SUARA_D2,
      tambah("Salsa", ...tokoh("sl", 110, 172, "Salsa")),
      tambah("menggeleng.", emo("x1", 150, 112, E.salah, 26, { z: 4 })),
      hapus("Bandingkan", "pa-s2", "pb-s2", "k65", "kl"),
      ubah("Bandingkan", { id: "pk", op: 0.3 }),
      tambah("kiri", panah("ph", 50, 118, 210, 0, W.hijau, 3, { z: 3 })),
      tambah("ratusan", sorotKolom("pa", ...PA, 0), sorotKolom("pb", ...PB, 0)),
      tambah("puluhan.", sorotKolom("pa", ...PA, 1), sorotKolom("pb", ...PB, 1)),
    ),
    k(
      SUARA_D3,
      hapus("Bima", "x1"),
      tambah("Bima", ...tokoh("bm", 180, 172, "Bima")),
      tambah("menunjuk", emo("tj", 180, 148, E.tunjuk, 20, { z: 3 })),
      tambah("Utara", emo("pl", 150, 74, E.piala, 22, { z: 3 })),
      hapus("memikul", ...idBarisKarung("mk", 3), "n3"),
      tambah("memikul", ...karung("kp0", 26, 139, 18, 14), ...karung("kp1", 44, 139, 18, 14), ...karung("kp2", 35, 126, 18, 14)),
      tambah("karung.", emo("lt", 66, 152, E.letih, 18, { z: 3 })),
    ),
  ],
};

/* ------------------------------ 5. Tanda perbandingan ------------------------------ */
const SUARA_E1 = "Tanda di antara dua bilangan seperti mulut yang selalu terbuka ke bilangan lebih besar.";
const SUARA_E2 = "Tanda itu dibaca lebih besar dari, dan mulutnya menghadap bilangan yang lebih besar.";
const SUARA_E3 = "Kalau dua bilangan persis sama, pakai tanda sama dengan.";

export const ADEGAN_TANDA_BANDING: AdeganStory = {
  id: "tanda-banding",
  judul: "Tanda perbandingan seperti mulut",
  sumber: "Materi: tanda lebih besar, lebih kecil, dan sama dengan",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_E1,
      bersih(0),
      tambah(0, judul("Tanda Mulut", W.kapur), ...papanKapur("pk")),
      tambah("antara", ...kartuAngka("ka", 30, 60, 80, 50, "546")),
      tambah("dua", ...kartuAngka("kb", 190, 60, 80, 50, "465"), teks("n2", 150, 150, "2 bilangan", 11, W.kapur, { z: 3 })),
      tambah("mulut", ...tanda("tn", 150, 86, ">")),
      tambah("terbuka", panah("pm", 140, 108, -28, 0, "#86EFAC", 3, { z: 3 })),
      tambah("besar", teks("lb", 150, 178, "mulut menghadap yang besar", 10, W.kapur, { z: 3 })),
    ),
    k(
      SUARA_E2,
      tambah("dibaca", teks("rd", 150, 138, "546 lebih besar dari 465", 10, W.kapur, { z: 3 })),
      ubah("mulutnya", { id: "ka-k", warna: "#BBF7D0" }),
      tambah("bilangan", emo("kl", 70, 50, E.kilau, 18, { z: 3 })),
      hapus("lebih@2", "lb"),
      tambah("lebih@2", teks("r1", 98, 172, "465", 16, W.kapur, { z: 3 }), ...tanda("t2", 150, 168, "<", W.emas), teks("r2", 202, 172, "546", 16, W.kapur, { z: 3 })),
    ),
    k(
      SUARA_E3,
      bersih(0),
      tambah(0, judul("Sama Besar", W.kapur), ...papanKapur("pk")),
      tambah("dua", teks("n2", 150, 150, "2 bilangan sama", 11, W.kapur, { z: 3 })),
      tambah("persis", ...kartuAngka("ka", 30, 60, 80, 50, "300"), ...kartuAngka("kb", 190, 60, 80, 50, "300")),
      tambah("tanda", ...tanda("tn", 150, 86, "=", W.emas)),
      tambah("dengan", teks("sm", 150, 182, "sama dengan", 12, W.kapur, { z: 3 })),
    ),
  ],
};

/* ------------------------------ 6. Garis bilangan ------------------------------ */
const SUARA_F1 = "Bima menggambar garis bilangan dengan loncatan seratus: empat ratus, lima ratus, enam ratus.";
const SUARA_F2 = "Bilangan yang lebih ke kanan lebih besar, yang lebih ke kiri lebih kecil.";
const SUARA_F3 = "Keduanya di antara empat ratus dan lima ratus, tetapi Gudang Utara sedikit lebih ke kanan.";

const GB = garisBilangan("gb", 40, 104, 220, [400, 500, 600]);
const garisTanpaAngka = GB.filter((o) => !/-l\d$/.test(o.id));
const angkaGaris = (i: number) => GB.filter((o) => o.id === `gb-l${i}`);
const X456 = posGaris(40, 220, 400, 600, 456);
const X465 = posGaris(40, 220, 400, 600, 465);

export const ADEGAN_GARIS_BILANGAN: AdeganStory = {
  id: "garis-bilangan",
  judul: "Garis bilangan loncatan seratus",
  sumber: "Materi: garis bilangan ratusan",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_F1,
      bersih(0),
      tambah(0, judul("Garis Bilangan"), ...halaman("hl", 164), kotak("ks", 14, 36, 272, 116, W.putih, W.biru, { rx: 8, tebal: 2, z: -2 })),
      tambah("Bima", ...tokoh("bm", 36, 182, "Bima")),
      tambah("garis", ...garisTanpaAngka),
      tambah("loncatan", teks("j0", 72, 88, "+100", 9, W.hijau, { z: 3 })),
      tambah("seratus", teks("j1", 205, 88, "+100", 9, W.hijau, { z: 3 })),
      tambah("empat", ...angkaGaris(0)),
      tambah("lima", ...angkaGaris(1)),
      tambah("enam", ...angkaGaris(2)),
    ),
    k(
      SUARA_F2,
      tambah("kanan", panah("ar", 190, 132, 60, 0, W.hijau, 3, { z: 3 })),
      tambah("besar", teks("tb", 228, 146, "makin besar", 9, W.hijau, { z: 3 })),
      tambah("kiri", panah("al", 110, 132, -60, 0, W.merah, 3, { z: 3 })),
      tambah("kecil.", teks("tk", 70, 146, "makin kecil", 9, W.merah, { z: 3 })),
    ),
    k(
      SUARA_F3,
      hapus("Keduanya", "ar", "tb", "al", "tk"),
      tambah("antara", kotak("br", 40, 94, 110, 20, "#FEF08A", W.merah, { rx: 3, tebal: 1.2, op: 0.5, z: 0 })),
      tambah("empat", ...titik("m1", X456, 104, "456", 70)),
      tambah("lima", ...titik("m2", X465, 104, "465", 56)),
      tambah("sedikit", panah("dx", X456 + 14, 122, 10, 0, W.merah, 2.4, { z: 3 }), teks("tx", 150, 160, "Utara sedikit lebih ke kanan", 9, W.coklat, { z: 3 })),
    ),
  ],
};

