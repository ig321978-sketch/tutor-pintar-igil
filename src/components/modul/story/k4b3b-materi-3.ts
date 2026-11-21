import type { AdeganStory } from "./logika-story";
import { E, W, bil, busur, emo, garis, judul, kain, kotak, lampu, lapangan, teks, tokoh } from "./k4b3b-gambar";
import { hapus, k, tambah, ubah } from "./k4b3b-bantu";

/*
 * Cerita orisinal IGIL "Barisan Kursi Pak Gunawan" (Kelas 4 Bab 3 Sub-Bab B), akhir cerita Orkestra Angklung Kampung Senandung.
 * Naskah suara dari naskah/story-naskah-k4b3b.md. Bagian ini: kursi baris kelima (empat lompatan), pola mengecil (nomor tampil empat puluh, tiga puluh lima, tiga puluh),
 * dan penutup bab (Konser Angklung Kampung Senandung, kedua tamu dan semua tokoh hadir).
 */

const MIN = "−";

/* ------------------------------ 7. Baris kelima ------------------------------ */
const SUARA_K1 = "Pak Gunawan bertanya, berapa kursi di baris kelima?";
const SUARA_K2 = "Dari baris pertama ke baris kelima ada empat lompatan, jadi dua belas ditambah tiga empat kali.";
const SUARA_K3 = "Hasilnya dua puluh empat, dan lompatannya selalu satu kurang dari nomor barisnya.";
const XK = [30, 90, 150, 210, 270];

export const ADEGAN_KELIMA: AdeganStory = {
  id: "kelima",
  judul: "Kursi di baris kelima",
  sumber: "Materi: bilangan ke-n lewat lompatan",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_K1,
      tambah(0, judul("Baris Kelima"), ...lapangan("lp", 150)),
      tambah("Gunawan", ...tokoh("pg", 262, 184, "Pak Gunawan")),
      tambah("bertanya", emo("tn", 226, 148, E.tanya, 20)),
      tambah(
        "berapa",
        kotak("bd", 40, 34, 180, 76, W.krem, W.coklat, { rx: 4, tebal: 2, z: 1 }),
        teks("t1", 130, 56, "baris 1 : 12", 13, W.biru, { z: 2 }),
        teks("t2", 130, 76, "beda : +3", 13, W.biru, { z: 2 }),
        teks("t3", 130, 96, "baris 5 : ?", 13, W.biru, { z: 2 }),
      ),
      ubah("kelima", { id: "t3", warna: W.merah }),
    ),
    k(
      SUARA_K2,
      hapus(0, "bd", "t1", "t2", "t3"),
      tambah("pertama", ...bil("c0", XK[0], 96, "12")),
      tambah("kelima", ...bil("c4", XK[4], 96, "?", 12, 14, true)),
      tambah("empat", ...[1, 2, 3].flatMap((i) => bil(`c${i}`, XK[i], 96, "?", 12, 14, true)), ...[0, 1, 2, 3].flatMap((i) => busur(`a${i}`, XK[i], XK[i + 1], 82, 18, "+3"))),
      tambah("jadi", teks("ht", 150, 132, "12 + 3 × 4", 13, W.biru)),
    ),
    k(
      SUARA_K3,
      hapus(0, "ht"),
      ubah("Hasilnya", { id: "c1-t", isi: "15" }, { id: "c2-t", isi: "18" }, { id: "c3-t", isi: "21" }, { id: "c1", putus: false }, { id: "c2", putus: false }, { id: "c3", putus: false }),
      ubah("dua", { id: "c4-t", isi: "24", warna: W.merah }, { id: "c4", putus: false }),
      tambah("satu", teks("sk", 150, 128, `5 ${MIN} 1 = 4`, 13, W.merah)),
      tambah("nomor", teks("lb", 150, 146, "lompatan satu kurang", 10, W.coklat)),
    ),
  ],
};

/* ------------------------------ 8. Pola mengecil ------------------------------ */
const SUARA_M1 = "Bu Ratri membawa daftar nomor tampil, empat puluh, tiga puluh lima, lalu tiga puluh.";
const SUARA_M2 = "Beda tiap pasangan adalah kurang lima, sehingga pola ini mengecil.";
const SUARA_M3 = "Nomor berikutnya adalah dua puluh lima, dan kita boleh terus mengurangi selama belum habis.";
const XM = [90, 150, 210, 270];

export const ADEGAN_MENGECIL: AdeganStory = {
  id: "mengecil",
  judul: "Nomor tampil yang mengecil",
  sumber: "Materi: pola mengecil",
  latar: "#FEF2F2",
  ketukan: [
    k(
      SUARA_M1,
      tambah(0, judul("Nomor Tampil"), ...lapangan("lp", 150)),
      tambah("Ratri", ...tokoh("br", 36, 184, "Bu Ratri")),
      tambah("daftar", kotak("dp", 60, 26, 220, 20, W.krem, W.coklat, { rx: 4, tebal: 2, z: 1 }), teks("dt", 170, 40, "NOMOR TAMPIL", 10, W.coklat, { z: 2 })),
      tambah("empat", ...bil("n0", XM[0], 100, "40")),
      tambah("tiga", ...bil("n1", XM[1], 100, "35")),
      tambah("tiga@2", ...bil("n2", XM[2], 100, "30")),
    ),
    k(
      SUARA_M2,
      tambah("Beda", ...busur("m0", XM[0], XM[1], 86, 22, "?"), ...busur("m1", XM[1], XM[2], 86, 22, "?")),
      ubah("lima", { id: "m0-l", isi: `${MIN}5`, warna: W.hijauTua }, { id: "m1-l", isi: `${MIN}5`, warna: W.hijauTua }),
      tambah("mengecil", emo("tr", 100, 146, E.turun, 22), teks("mc", 230, 130, "mengecil", 12, W.merah)),
    ),
    k(
      SUARA_M3,
      hapus(0, "mc"),
      tambah("berikutnya", ...busur("m2", XM[2], XM[3], 86, 22, "?", W.ungu, true), ...bil("n3", XM[3], 100, "?", 12, 14, true)),
      ubah("dua", { id: "n3-t", isi: "25", warna: W.merah }),
      ubah("terus", { id: "m2-l", isi: `${MIN}5`, warna: W.hijauTua }),
      tambah("habis", teks("hb", 150, 132, "berhenti di 0", 11, W.coklat)),
    ),
  ],
};

/* ------------------------------ 9. Penutup (akhir cerita bab) ------------------------------ */
const SUARA_N1 = "Malamnya, lapangan penuh lampu, spanduk, balon, dan konfeti untuk Konser Angklung Kampung Senandung.";
const SUARA_N2 = "Bu Ratri, Pak Gunawan, Pak Hendro, Satria, Laras, dan Genta berdiri di depan deret angklung yang rapi.";
const SUARA_N3 = "Menurutmu, pola apa lagi yang bisa kita temukan di sekitar rumah? Terima kasih, Satria, Laras, Genta, Pak Hendro, Bu Ratri, dan Pak Gunawan!";
/** Keenam tokoh berdiri sebaris (y = 176): kedua tamu lalu Pak Hendro dan ketiga anak. */
const X_ORANG = [28, 78, 128, 178, 228, 278];
const orang = (id: string, x: number, e: string, nama: string) => [emo(id, x, 180, e, 22), teks(`${id}-n`, x, 191, nama, 8, W.ungu, { z: 3 })];

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Konser Angklung Kampung Senandung",
  sumber: "Materi: penutup dan perayaan",
  latar: "#FEF3C7",
  ketukan: [
    k(
      SUARA_N1,
      tambah(0, judul("Malam Konser"), ...lapangan("lp", 150)),
      tambah("lampu", garis("tl", 14, 40, 272, 0, W.coklat, 1.4, { z: 1 }), ...[0, 1, 2, 3, 4, 5].flatMap((i) => lampu(`lm${i}`, 30 + i * 48, 46))),
      tambah("spanduk", ...kain("sb", 30, 64, 240, 26, "KONSER ANGKLUNG KAMPUNG SENANDUNG", 8.5)),
      tambah("balon", emo("b1", 24, 108, E.balon, 22), emo("b2", 150, 108, E.balon, 22), emo("b3", 276, 108, E.balon, 22)),
      tambah("konfeti", emo("k1", 70, 124, E.konfeti, 20), emo("k2", 230, 124, E.konfeti, 20)),
    ),
    k(
      SUARA_N2,
      tambah("Ratri", ...orang("o1", X_ORANG[0], E.bu, "Bu Ratri")),
      tambah("Gunawan", ...orang("o2", X_ORANG[1], E.pak, "Pak Gunawan")),
      tambah("Hendro", ...orang("o3", X_ORANG[2], E.pak, "Pak Hendro")),
      tambah("Satria", ...orang("o4", X_ORANG[3], E.satria, "Satria")),
      tambah("Laras", ...orang("o5", X_ORANG[4], E.laras, "Laras")),
      tambah("Genta", ...orang("o6", X_ORANG[5], E.genta, "Genta")),
      tambah("angklung", ...[0, 1, 2, 3, 4, 5, 6].map((i) => emo(`ak${i}`, 44 + i * 35, 140, E.angklung, 18))),
    ),
    k(
      SUARA_N3,
      hapus(0, "b2"),
      tambah("Menurutmu", emo("tn", 150, 108, E.tanya, 28), teks("pl", 150, 124, "pola lain?", 12, W.ungu)),
      tambah("Terima", ...X_ORANG.map((x, i) => emo(`wv${i}`, x, 158, E.lambai, 16))),
    ),
  ],
};
