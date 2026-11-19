import type { AdeganStory } from "./logika-story";
import { E, KOL, W, WARNA_TULIS, angka, emo, garis, judul, kartu, kartuCocok, kartuKurang, kotak, kotakKartu, labelHarga, panah, tabelTempat, teks, tokoDepan, tokoh } from "./k3b1B-gambar";
import { bersih, hapus, k, sorotkan, tambah } from "./k3b1B-bantu";

/*
 * Cerita orisinal IGIL "Kartu Harga Bu Wati" (Kelas 3 Bab 1 Sub-Bab B), video metode global.
 * Naskah suara dari naskah/story-naskah-k3b1b.md. Bagian ini: pembuka (tiga lembar petunjuk di dasar kotak kartu), Place Value (Tempat Angka), dan terapannya.
 */

export const NAMA_METODE = ["Place Value", "Montessori Cards", "Expanded Form"] as const;
export const NAMA_METODE_ID = ["Tempat Angka", "Kartu Angka Montessori", "Bentuk Uraian"] as const;

/* ------------------------------ Pembuka ------------------------------ */
const SUARA_O1 = "Di dasar kotak kartu, Salsa menemukan tiga lembar petunjuk lama dari percetakan.";
const SUARA_O2 = "Bu Wati tersenyum. Itu tiga cara untuk memahami isi bilangan tiga angka.";
const SUARA_O3 = "Tiga cara itu: Place Value, Montessori Cards, dan Expanded Form.";
const SUARA_O4 = "Nama dalam bahasa Indonesia: Tempat Angka, Kartu Angka Montessori, dan Bentuk Uraian.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Tiga lembar petunjuk di dasar kotak kartu",
  sumber: "Metode global: pembuka",
  latar: "#FFF1F2",
  ketukan: [
    k(
      SUARA_O1,
      bersih(0),
      tambah(0, judul("Petunjuk Lama"), ...tokoDepan("dn")),
      tambah("kotak", ...kotakKartu("kk", 50, 110, 100, 36)),
      tambah("Salsa", ...tokoh("sl", 44, 172, "Salsa")),
      tambah("tiga", teks("n3", 250, 58, "3 lembar", 10, W.ungu, { z: 2 })),
      tambah("lembar", ...[0, 1, 2].map((i) => kotak(`ls${i}`, 214 + i * 24, 68, 20, 30, i === 1 ? "#FDE68A" : W.krem, W.coklat, { rx: 2, tebal: 1.4, z: 2, rot: (i - 1) * 6 }))),
      tambah("percetakan.", emo("kl", 250, 130, E.kilau, 22)),
    ),
    k(
      SUARA_O2,
      tambah("Wati", ...tokoh("bw", 262, 172, "Bu Wati")),
      tambah("tersenyum.", emo("sy", 232, 144, E.senyum, 20)),
      tambah("tiga", teks("n3b", 150, 62, "3 cara", 11, W.ungu, { z: 2 })),
      tambah("bilangan", ...labelHarga("lb", 100, 70, 100, 38, "358", 24)),
      tambah("angka.", emo("kc", 150, 128, E.kaca, 22)),
    ),
    k(
      SUARA_O3,
      bersih(0),
      tambah(0, judul("Tiga Cara Tadi"), ...tokoDepan("dn"), ...[0, 1, 2].map((i) => garis(`ul${i}`, 40, 66 + i * 44, 140, 0, W.ungu, 1.4, { z: 1 }))),
      tambah("Tiga", teks("n3", 252, 52, "3 cara", 10, W.ungu, { z: 2 })),
      tambah("Place", teks("m0", 110, 62, "1. Place Value", 13, W.biru, { z: 2 }), emo("i0", 236, 66, "\u{1F4CD}", 22)),
      tambah("Montessori", teks("m1", 110, 106, "2. Montessori Cards", 13, W.biru, { z: 2 }), emo("i1", 236, 110, E.catat, 22)),
      tambah("Expanded", teks("m2", 110, 150, "3. Expanded Form", 13, W.biru, { z: 2 }), emo("i2", 236, 154, E.kaca, 22)),
    ),
    k(
      SUARA_O4,
      tambah("Nama", emo("ic", 280, 40, E.lampu, 18)),
      tambah("Tempat", teks("q0", 110, 78, "Tempat Angka", 10, W.ungu, { z: 2 })),
      tambah("Kartu", teks("q1", 110, 122, "Kartu Angka Montessori", 10, W.ungu, { z: 2 })),
      tambah("Bentuk", teks("q2", 110, 166, "Bentuk Uraian", 10, W.ungu, { z: 2 })),
    ),
  ],
};

/* ------------------------------ Place Value: konsep ------------------------------ */
const SUARA_C1 = "Cara pertama, Place Value, atau Tempat Angka.";
const SUARA_C2 = "Setiap angka punya tempat, dan tempat itu menentukan seberapa besar angka tersebut.";
const SUARA_C3 = "Tempat paling kiri mewakili ratusan, tengah puluhan, kanan satuan.";
const SUARA_C4 = "Angka yang sama di tempat berbeda mewakili jumlah berbeda.";

export const ADEGAN_LUAR_TEMPAT: AdeganStory = {
  id: "luar-tempat",
  judul: "Place Value: Tempat Angka",
  sumber: "Metode global: Place Value (konsep)",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_C1,
      bersih(0),
      tambah(0, judul("Cara Pertama"), ...tokoDepan("dn")),
      tambah("pertama,", ...kartu("nm", 50, 44, 200, 28, W.krem, ["Place Value"], 13)),
      tambah("Place", teks("nid", 150, 104, "Tempat Angka", 12, W.ungu, { z: 2 })),
      tambah("Tempat", emo("ic", 150, 152, "\u{1F4CD}", 34)),
      tambah("Angka.", emo("kl", 210, 150, E.kilau, 20)),
    ),
    k(
      SUARA_C2,
      bersih(0),
      tambah(0, judul("Setiap Angka Punya Tempat"), ...tokoDepan("dn")),
      tambah("Setiap", ...tabelTempat("tb", 40, 44, 220, 96)),
      tambah("angka", angka("d0", KOL[0], 102, "3", "r", 40), angka("d1", KOL[1], 102, "1", "p", 40), angka("d2", KOL[2], 102, "6", "s", 40)),
      tambah("tempat,", panah("q0", KOL[0], 106, 0, 13, W.kr, 2.2), panah("q1", KOL[1], 106, 0, 13, W.kp, 2.2), panah("q2", KOL[2], 106, 0, 13, W.ks, 2.2)),
      sorotkan("besar", "d0", "d1", "d2"),
    ),
    k(
      SUARA_C3,
      bersih(0),
      tambah(0, judul("Kiri, Tengah, Kanan"), ...tokoDepan("dn"), ...tabelTempat("tb", 40, 44, 220, 80)),
      tambah("kiri", teks("kr", KOL[0], 142, "kiri", 11, WARNA_TULIS.r, { z: 3 })),
      sorotkan("ratusan,", "tb-c0"),
      tambah("tengah", teks("tg", KOL[1], 142, "tengah", 11, WARNA_TULIS.p, { z: 3 })),
      sorotkan("puluhan,", "tb-c1"),
      tambah("kanan", teks("kn", KOL[2], 142, "kanan", 11, WARNA_TULIS.s, { z: 3 })),
      sorotkan("satuan.", "tb-c2"),
    ),
    k(
      SUARA_C4,
      bersih(0),
      tambah(0, judul("Angka Sama, Jumlah Beda"), ...tokoDepan("dn"), ...tabelTempat("tb", 40, 44, 220, 96)),
      tambah("sama", angka("e0", KOL[0], 102, "9", "r", 40), angka("e1", KOL[1], 102, "9", "p", 40), angka("e2", KOL[2], 102, "9", "s", 40)),
      tambah("berbeda", panah("q0", KOL[0], 106, 0, 13, W.kr, 2.2), panah("q1", KOL[1], 106, 0, 13, W.kp, 2.2), panah("q2", KOL[2], 106, 0, 13, W.ks, 2.2)),
      tambah("jumlah", teks("m0", KOL[0], 134, "900", 12, WARNA_TULIS.r, { z: 3 }), teks("m1", KOL[1], 134, "90", 12, WARNA_TULIS.p, { z: 3 }), teks("m2", KOL[2], 134, "9", 12, WARNA_TULIS.s, { z: 3 })),
    ),
  ],
};

/* ------------------------------ Place Value: terapan ------------------------------ */
const SUARA_T1 = "Raka melihat empat ratus tujuh puluh dua. Angka tujuh ada di puluhan, jadi mewakili tujuh puluh.";
const SUARA_T2 = "Angka empat di ratusan mewakili empat ratus, dan angka dua mewakili dua.";
const SUARA_T3 = "Cocok untuk menjawab berapa jumlah yang diwakili satu angka tertentu.";
const SUARA_T4 = "Kurang cocok kalau hanya ingin tahu urutan angkanya tanpa memikirkan jumlahnya.";

export const ADEGAN_LUAR_TEMPAT_TERAPAN: AdeganStory = {
  id: "luar-tempat-terapan",
  judul: "Place Value dipakai pada label 472",
  sumber: "Metode global: Place Value (terapan)",
  latar: "#ECFCCB",
  ketukan: [
    k(
      SUARA_T1,
      bersih(0),
      tambah(0, judul("Label Empat Tujuh Dua"), ...tokoDepan("dn"), ...tokoh("rk", 44, 172, "Raka")),
      tambah("empat", teks("cap", 150, 46, "Label 472", 10, W.coklat, { z: 3 }), ...tabelTempat("tb", 40, 52, 220, 76)),
      tambah("dua.", angka("d0", KOL[0], 108, "4", "r", 34), angka("d1", KOL[1], 108, "7", "p", 34), angka("d2", KOL[2], 108, "2", "s", 34)),
      sorotkan(11, "d1"),
      tambah(15, teks("m1", KOL[1], 124, "70", 11, WARNA_TULIS.p, { z: 3 })),
    ),
    k(
      SUARA_T2,
      bersih(0),
      tambah(0, judul("Jumlah tiap Angka"), ...tokoDepan("dn"), ...tabelTempat("tb", 40, 52, 220, 76), angka("d0", KOL[0], 108, "4", "r", 34), angka("d1", KOL[1], 108, "7", "p", 34), angka("d2", KOL[2], 108, "2", "s", 34)),
      sorotkan("ratusan", "d0"),
      tambah("ratus,", teks("m0", KOL[0], 124, "400", 11, WARNA_TULIS.r, { z: 3 })),
      sorotkan("angka@2", "d2"),
      tambah("dua.", teks("m2", KOL[2], 124, "2", 11, WARNA_TULIS.s, { z: 3 })),
    ),
    k(
      SUARA_T3,
      bersih(0),
      tambah(0, judul("Cocok Dipakai"), ...tokoDepan("dn")),
      tambah("Cocok", ...kartuCocok("cc", 56, ["Cocok untuk jumlah", "yang diwakili 1 angka"])),
      tambah("berapa", emo("tz", 150, 132, E.tanya, 26)),
      tambah("angka", teks("sa", 150, 160, "angka tertentu", 10, W.ungu, { z: 2 })),
    ),
    k(
      SUARA_T4,
      hapus(0, "tz", "sa"),
      tambah("Kurang", ...kartuKurang("kc", 100, ["Kurang cocok bila hanya", "ingin tahu urutan angka"])),
      tambah("urutan", teks("ur", 150, 156, "4 7 2", 12, W.biru, { z: 2 })),
      tambah("tanpa", emo("pk", 220, 156, E.pikir, 22)),
      tambah("jumlahnya.", emo("no", 80, 156, E.salah, 20)),
    ),
  ],
};
