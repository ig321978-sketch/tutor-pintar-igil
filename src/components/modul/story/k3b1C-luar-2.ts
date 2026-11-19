import type { AdeganStory, Obj } from "./logika-story";
import { E, W, bulat, emo, garisBilangan, judul, kartu, kartuAngka, kotak, panah, papanKapur, posGaris, tanda, teks, titik, tokoh } from "./k3b1C-gambar";
import { bersih, hapus, k, sorotkan, tambah, ubah } from "./k3b1C-bantu";

/*
 * Cerita orisinal IGIL "Karung Pak Dodi" (Kelas 3 Bab 1 Sub-Bab C), video metode global.
 * Naskah suara dari naskah/story-naskah-k3b1c.md. Bagian ini: Number Line (Garis Bilangan Ratusan) dan terapannya, Ordering (Mengurutkan) dan terapannya, ringkasan.
 */

type U = Partial<Obj> & { id: string };

/** Kartu nama metode `${id}` dengan dua baris dipecah supaya muncul bertahap: [kartu+baris1, baris2]. */
const kartuNama = (id: string, inggris: string, indonesia: string): [Obj[], Obj[]] => {
  const s = kartu(id, 40, 56, 220, 56, W.krem, [inggris, indonesia], 12);
  return [s.filter((o) => o.id !== `${id}-t1`), s.filter((o) => o.id === `${id}-t1`)];
};
/** Lembar putih tempat garis bilangan digambar. */
const lembar = (): Obj => kotak("ks", 14, 36, 272, 128, W.putih, W.biru, { rx: 8, tebal: 2, z: -2 });

/** Garis bilangan tiga tanda: nilai pertama di x = 40 dan nilai terakhir di x = 260 (lebar 220), tinggi y = 100. */
const GARIS3 = (awal: number) => garisBilangan("gb", 40, 100, 220, [awal, awal + 100, awal + 200]);
const X3 = (awal: number, v: number) => posGaris(40, 220, awal, awal + 200, v);

/* ------------------------------ Number Line ------------------------------ */
const SUARA_G1 = "Cara kedua, Number Line, atau Garis Bilangan Ratusan.";
const SUARA_G2 = "Bilangan diletakkan pada garis, makin ke kanan makin besar.";
const SUARA_G3 = "Garis dibagi dengan loncatan seratus, lalu bilangan ditandai di antaranya.";
const SUARA_G4 = "Kita bisa melihat siapa lebih besar dan seberapa jauh jaraknya.";

const [NM1_A, NM1_B] = kartuNama("nm", "Number Line", "Garis Bilangan Ratusan");

export const ADEGAN_LUAR_GARIS: AdeganStory = {
  id: "luar-garis",
  judul: "Number Line, Garis Bilangan Ratusan",
  sumber: "Metode global: Number Line",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_G1,
      bersih(0),
      tambah(0, judul("Cara Kedua", W.kapur), ...papanKapur("pk")),
      tambah("kedua,", teks("n2", 54, 150, "cara 2", 12, W.kapur, { z: 3 })),
      tambah("Number", ...NM1_A),
      tambah("Garis", ...NM1_B),
      tambah("Ratusan.", emo("rl", 150, 152, "\u{1F4CF}", 28, { z: 3 })),
    ),
    k(
      SUARA_G2,
      bersih(0),
      tambah(0, judul("Makin ke Kanan Makin Besar", W.kapur), ...papanKapur("pk"), lembar()),
      tambah("garis,", ...GARIS3(300)),
      tambah("kanan", panah("ar", 120, 140, 110, 0, W.hijau, 3, { z: 3 })),
      tambah("besar.", teks("tb", 175, 154, "makin besar", 9, W.hijau, { z: 3 })),
    ),
    k(
      SUARA_G3,
      hapus("Garis", "ar", "tb"),
      tambah("loncatan", teks("j0", 95, 86, "+100", 9, W.hijau, { z: 3 })),
      tambah("seratus", teks("j1", 205, 86, "+100", 9, W.hijau, { z: 3 })),
      tambah("bilangan", ...titik("m1", X3(300, 430), 100, "430", 66)),
      tambah("antaranya.", kotak("br", 150, 90, 110, 20, "#FEF08A", W.merah, { rx: 3, tebal: 1.2, op: 0.5, z: 0 })),
    ),
    k(
      SUARA_G4,
      bersih(0),
      tambah(0, judul("Siapa Lebih Besar?", W.kapur), ...papanKapur("pk"), lembar(), ...GARIS3(300)),
      tambah("siapa", ...titik("ta", X3(300, 340), 100, "A", 66), ...titik("tb", X3(300, 480), 100, "B", 66)),
      tambah("lebih", emo("pl", X3(300, 480), 46, E.piala, 18, { z: 3 })),
      tambah("seberapa", panah("jr", X3(300, 340), 142, X3(300, 480) - X3(300, 340), 0, W.merah, 3, { z: 3 })),
      tambah("jaraknya.", teks("tj", 161, 156, "jarak", 9, W.merah, { z: 3 })),
    ),
  ],
};

/* ------------------------------ Number Line, terapan ------------------------------ */
const SUARA_H1 = "Raka menandai dua ratus lima puluh dan tujuh ratus delapan puluh pada garis. Titik yang kedua jauh di sebelah kanan.";
const SUARA_H2 = "Ia langsung tahu yang kedua lebih besar, dan beda jaraknya besar.";
const SUARA_H3 = "Cocok untuk melihat bilangan mana yang lebih dekat ke ratusan tertentu.";
const SUARA_H4 = "Kurang cocok kalau bilangannya sangat mirip, karena titiknya hampir bertumpuk.";

/** Garis panjang dua ratus sampai delapan ratus, loncatan seratus: tujuh tanda dari x = 30 sampai x = 270 (lebar 240). */
const GARIS7 = garisBilangan("gb", 30, 104, 240, [200, 300, 400, 500, 600, 700, 800]);
const X7 = (v: number) => posGaris(30, 240, 200, 800, v);

export const ADEGAN_LUAR_GARIS_TERAPAN: AdeganStory = {
  id: "luar-garis-terapan",
  judul: "Raka menandai dua titik pada garis",
  sumber: "Metode global: terapan Garis Bilangan Ratusan",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_H1,
      bersih(0),
      tambah(0, judul("Dua Titik pada Garis", W.kapur), ...papanKapur("pk"), lembar(), ...GARIS7, ...tokoh("rk", 40, 184, "Raka")),
      tambah("dua", ...titik("ta", X7(250), 104, "250", 76)),
      tambah("tujuh", ...titik("tb", X7(780), 104, "780", 76)),
      tambah("kedua", bulat("tb-hl", X7(780), 104, 8, "#FDE047", W.merah, { tebal: 1.6, op: 0.7, z: 0 })),
      tambah("kanan.", panah("pk2", 120, 158, 120, 0, W.hijau, 3, { z: 3 })),
    ),
    k(
      SUARA_H2,
      tambah("kedua", emo("pl", X7(780), 56, E.piala, 18, { z: 3 })),
      tambah("beda", panah("jr", X7(250), 138, X7(780) - X7(250), 0, W.merah, 3, { z: 3 })),
      tambah("jaraknya", teks("tj", 160, 149, "jarak besar", 9, W.merah, { z: 3 })),
      tambah("besar@2", emo("ok", 262, 140, E.benar, 18, { z: 3 })),
    ),
    k(
      SUARA_H3,
      bersih(0),
      tambah(0, judul("Cocok", W.kapur), ...papanKapur("pk"), ...kartu("cc", 50, 44, 200, 30, W.hijauMuda, ["Cocok: lihat jarak"], 11)),
      tambah("bilangan", lembar(), ...GARIS3(400)),
      tambah("mana", ...titik("tm", X3(400, 487), 100, "487", 80)),
      tambah("dekat", panah("pd", X3(400, 487) + 6, 128, 16, 0, W.merah, 2.4, { z: 3 })),
      tambah("ratusan", bulat("rb", X3(400, 500), 100, 8, "#FDE047", W.merah, { tebal: 1.6, op: 0.7, z: 0 })),
    ),
    k(
      SUARA_H4,
      bersih(0),
      tambah(0, judul("Kurang Cocok", W.kapur), ...papanKapur("pk"), ...kartu("kc", 50, 44, 200, 30, W.merahMuda, ["Kurang cocok: sangat mirip"], 10)),
      tambah("sangat", lembar(), ...GARIS3(400)),
      tambah("mirip,", ...titik("ta", X3(400, 456), 100, "456", 90)),
      tambah("titiknya", ...titik("tb", X3(400, 458), 100, "458", 77)),
      tambah("bertumpuk.", emo("kg", 150, 146, E.kaget, 22, { z: 3 })),
    ),
  ],
};

/* ------------------------------ Ordering ------------------------------ */
const SUARA_I1 = "Cara ketiga, Ordering, atau Mengurutkan.";
const SUARA_I2 = "Kita menyusun beberapa bilangan dari yang terkecil ke terbesar, atau sebaliknya.";
const SUARA_I3 = "Caranya: cari yang paling kecil, taruh di depan, lalu ulangi.";
const SUARA_I4 = "Hasilnya urutan naik. Kalau dibalik, urutan turun.";

const [NM2_A, NM2_B] = kartuNama("nm", "Ordering", "Mengurutkan");
/** Tiga kartu bilangan di x = 24, 112, 200 (lebar 76) pada y = 70. */
const KX3 = [24, 112, 200];
const tigaKartu = (isi: [string, string, string]): Obj[] => isi.flatMap((v, i) => kartuAngka(`c${i}`, KX3[i], 70, 76, 48, v, W.krem, 18));
/** Memindahkan kartu `${id}` ke kiri x (lebar w). */
const geser = (id: string, x: number, w = 76): U[] => [{ id: `${id}-k`, x }, { id: `${id}-t`, x: x + w / 2 }];

export const ADEGAN_LUAR_URUT: AdeganStory = {
  id: "luar-urut",
  judul: "Ordering, Mengurutkan",
  sumber: "Metode global: Ordering",
  latar: "#F5F3FF",
  ketukan: [
    k(
      SUARA_I1,
      bersih(0),
      tambah(0, judul("Cara Ketiga", W.kapur), ...papanKapur("pk")),
      tambah("ketiga,", teks("n3", 54, 150, "cara 3", 12, W.kapur, { z: 3 })),
      tambah("Ordering,", ...NM2_A),
      tambah("atau", ...NM2_B),
      tambah("Mengurutkan.", emo("up", 150, 154, "\u{1F4F6}", 28, { z: 3 })),
    ),
    k(
      SUARA_I2,
      bersih(0),
      tambah(0, judul("Menyusun Bilangan", W.kapur), ...papanKapur("pk")),
      tambah("bilangan", ...tigaKartu(["804", "482", "640"])),
      tambah("terkecil", teks("tk", 62, 138, "terkecil", 9, W.kapur, { z: 3 }), panah("pa", 40, 150, 200, 0, W.hijau, 3, { z: 3 })),
      tambah("terbesar", teks("tb", 238, 138, "terbesar", 9, W.kapur, { z: 3 })),
      tambah("sebaliknya.", panah("pb", 260, 166, -200, 0, W.merah, 3, { z: 3 }), teks("sk", 150, 184, "atau sebaliknya", 9, W.merah, { z: 3 })),
    ),
    k(
      SUARA_I3,
      bersih(0),
      tambah(0, judul("Cari yang Terkecil", W.kapur), ...papanKapur("pk"), ...tigaKartu(["804", "482", "640"])),
      ubah("kecil", { id: "c1-k", warna: "#FDE047" }),
      ubah("depan", ...geser("c1", 24), ...geser("c0", 112)),
      tambah("ulangi.", emo("ul", 150, 160, "\u{1F501}", 28, { z: 3 })),
    ),
    k(
      SUARA_I4,
      bersih(0),
      tambah(0, judul("Naik dan Turun", W.kapur), ...papanKapur("pk"), ...tigaKartu(["482", "640", "804"])),
      tambah("naik.", panah("nk", 40, 140, 220, 0, W.hijau, 3, { z: 3 }), teks("un", 150, 158, "urutan naik", 11, W.hijau, { z: 3 })),
      hapus("dibalik,", "nk", "un"),
      ubah("dibalik,", ...geser("c0", 200), ...geser("c2", 24)),
      tambah("turun.", panah("tr", 260, 140, -220, 0, W.merah, 3, { z: 3 }), teks("ut", 150, 158, "urutan turun", 11, W.merah, { z: 3 })),
    ),
  ],
};

/* ------------------------------ Ordering, terapan ------------------------------ */
const SUARA_J1 = "Bima mengurutkan tiga ratus empat puluh, tiga ratus empat, empat ratus tiga puluh, dan empat ratus tiga. Urutan naiknya: tiga ratus empat, tiga ratus empat puluh, empat ratus tiga, empat ratus tiga puluh.";
const SUARA_J2 = "Ia memeriksa dari kiri: tiap bilangan lebih besar dari sebelumnya.";
const SUARA_J3 = "Cocok kalau ada banyak bilangan yang harus berderet rapi.";
const SUARA_J4 = "Kurang cocok untuk dua bilangan saja, karena cukup dibandingkan.";

/** Empat kartu bilangan di x = 14, 84, 154, 224 (lebar 56) pada y = 64. */
const KX4 = [14, 84, 154, 224];
const kartuEmpat = (id: string, i: number, isi: string): Obj[] => kartuAngka(id, KX4[i], 64, 56, 44, isi, W.krem, 15);

export const ADEGAN_LUAR_URUT_TERAPAN: AdeganStory = {
  id: "luar-urut-terapan",
  judul: "Bima mengurutkan empat bilangan",
  sumber: "Metode global: terapan Mengurutkan",
  latar: "#FAF5FF",
  ketukan: [
    k(
      SUARA_J1,
      bersih(0),
      tambah(0, judul("Bima Mengurutkan", W.kapur), ...papanKapur("pk"), ...tokoh("bm", 40, 182, "Bima")),
      tambah(5, ...kartuEmpat("a", 0, "340")),
      tambah(9, ...kartuEmpat("b", 1, "304")),
      tambah(12, ...kartuEmpat("c", 2, "430")),
      tambah(16, ...kartuEmpat("d", 3, "403")),
      ubah(18, ...geser("b", KX4[0], 56), ...geser("a", KX4[1], 56), ...geser("d", KX4[2], 56), ...geser("c", KX4[3], 56)),
      tambah(19, panah("nk", 30, 130, 240, 0, W.hijau, 3, { z: 3 }), teks("un", 150, 150, "urutan naik", 11, W.hijau, { z: 3 })),
    ),
    k(
      SUARA_J2,
      tambah("kiri:", emo("tj", 42, 54, E.tunjuk, 18, { z: 3 })),
      tambah(4, ...tanda("g1", 77, 86, "<", W.emas, 3)),
      tambah(6, ...tanda("g2", 147, 86, "<", W.emas, 3)),
      tambah(8, ...tanda("g3", 217, 86, "<", W.emas, 3)),
      tambah("sebelumnya.", emo("ok", 262, 140, E.benar, 20, { z: 3 })),
    ),
    k(
      SUARA_J3,
      bersih(0),
      tambah(0, judul("Cocok", W.kapur), ...papanKapur("pk"), ...kartu("cc", 50, 44, 200, 30, W.hijauMuda, ["Cocok: banyak bilangan"], 11)),
      tambah("banyak", ...["128", "245", "367", "481", "596", "712"].flatMap((v, i) => kartuAngka(`m${i}`, 12 + i * 47, 92, 42, 30, v, W.krem, 11))),
      tambah("harus", panah("pr", 20, 140, 260, 0, W.hijau, 3, { z: 3 })),
      tambah("berderet", teks("br", 150, 158, "berderet naik", 10, W.kapur, { z: 3 })),
      tambah("rapi.", emo("ok", 262, 60, E.benar, 22, { z: 3 })),
    ),
    k(
      SUARA_J4,
      bersih(0),
      tambah(0, judul("Kurang Cocok", W.kapur), ...papanKapur("pk"), ...kartu("kc", 50, 44, 200, 30, W.merahMuda, ["Kurang cocok: dua bilangan"], 10)),
      tambah("dua", ...kartuAngka("m1", 50, 92, 70, 40, "560"), ...kartuAngka("m2", 180, 92, 70, 40, "650"), teks("n2", 150, 156, "2 bilangan", 10, W.kapur, { z: 3 })),
      tambah("saja,", ...tanda("tn", 150, 112, "<", W.emas, 7)),
      tambah("cukup", teks("cb", 150, 178, "cukup dibandingkan", 10, W.kapur, { z: 3 })),
      tambah("dibandingkan.", emo("ok", 262, 60, E.benar, 22, { z: 3 })),
    ),
  ],
};

/* ------------------------------ Ringkasan ------------------------------ */
const SUARA_K1 = "Tiga cara sudah kita lihat. Mana yang pas tergantung bilangannya.";
const SUARA_K2 = "Bilangan mirip, pakai Banding per Tempat. Ingin melihat jarak, pakai Garis Bilangan Ratusan.";
const SUARA_K3 = "Banyak bilangan sekaligus, pakai Mengurutkan. Apa pun caranya, mulai dari ratusan.";
const SUARA_K4 = "Menurutmu, untuk memilih gudang yang mengirim paling banyak, cara mana yang kamu pilih?";

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan tiga cara",
  sumber: "Ringkasan metode global",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_K1,
      bersih(0),
      tambah(0, judul("Tiga Cara", W.kapur), ...papanKapur("pk"), teks("n3", 252, 48, "3 cara", 10, W.kapur, { z: 3 })),
      tambah("sudah", teks("r0", 150, 76, "1. Banding per Tempat", 12, W.kapur, { z: 3 })),
      tambah("lihat", teks("r1", 150, 124, "2. Garis Bilangan Ratusan", 12, W.kapur, { z: 3 })),
      tambah("pas", teks("r2", 150, 172, "3. Mengurutkan", 12, W.kapur, { z: 3 })),
      tambah("tergantung", emo("pm", 262, 100, E.pikir, 22, { z: 3 })),
    ),
    k(
      SUARA_K2,
      tambah("mirip,", teks("w0", 150, 90, "bilangan mirip", 9, W.emas, { z: 3 })),
      ubah("Banding", { id: "r0", warna: W.emas }),
      tambah("jarak,", teks("w1", 150, 138, "ingin melihat jarak", 9, W.emas, { z: 3 })),
      ubah("Garis", { id: "r1", warna: W.emas }),
    ),
    k(
      SUARA_K3,
      tambah("Banyak", teks("w2", 150, 186, "banyak bilangan sekaligus", 9, W.emas, { z: 3 })),
      ubah("Mengurutkan", { id: "r2", warna: W.emas }),
      tambah("mulai", emo("tj", 40, 150, E.tunjuk, 20, { z: 3 })),
      tambah("ratusan.", teks("rm", 70, 196, "mulai dari ratusan", 9, W.kapur, { z: 3 })),
    ),
    k(
      SUARA_K4,
      tambah("gudang", emo("tk", 40, 70, "\u{1F69A}", 24, { z: 3 })),
      tambah("paling", emo("kr", 262, 150, "\u{1F6CD}", 22, { z: 3 })),
      sorotkan("cara", "r0", "r1", "r2"),
      tambah("pilih", emo("ty", 262, 100, E.tanya, 24, { z: 3 })),
    ),
  ],
};
