import type { AdeganStory, Obj } from "./logika-story";
import { E, W, bendera, bulat, buah, emo, judul, kartu, kerucut, kotak, lapangan, neraca, panah, pindah, piringNeraca, teks, tokoh } from "./k2b6A-gambar";
import { bersih, hapus, k, sorotkan, tambah, ubah } from "./k2b6A-bantu";

/*
 * Cerita orisinal IGIL "Peralatan Lomba Pak Anton" (Kelas 2 Bab 6 Sub-Bab A), awal cerita Hari Olahraga Sekolah.
 * Naskah suara dari naskah/story-naskah-k2b6a.md. Bagian ini: satuan tidak baku, satu benda dua hasil ukur, dan rantai buah (jembatan ke Sub-Bab B).
 */

const HIJAU_BOLA = "#BEF264";
const GARIS_BOLA = "#4D7C0F";

/** Bola tenis `${id}{i}` di piringan kanan neraca berpusat (150, 100) setengah panjang 56; dy = naik-turun ujung. */
const bolaTenis = (dy: number, n: number): Obj[] => {
  const { kanan } = piringNeraca(150, 100, 56, dy);
  return Array.from({ length: n }, (_, i) => bulat(`bt${i}`, kanan.x - 12 + (i % 4) * 8, kanan.y - 4 - Math.floor(i / 4) * 8, 4, HIJAU_BOLA, GARIS_BOLA, { tebal: 1.2, z: 3 }));
};
/** Kelereng `${id}{i}` (sepuluh) di piringan kanan, dua baris lima. */
const kelereng = (dy: number, n: number): Obj[] => {
  const { kanan } = piringNeraca(150, 100, 56, dy);
  return Array.from({ length: n }, (_, i) => bulat(`kl${i}`, kanan.x - 12 + (i % 5) * 6, kanan.y - 3 - Math.floor(i / 5) * 6, 2.8, "#93C5FD", "#1D4ED8", { tebal: 1, z: 3 }));
};
const bonekaDi = (dy: number): Obj => {
  const { kiri } = piringNeraca(150, 100, 56, dy);
  return emo("hm", kiri.x, kiri.y, E.harimau, 22, { z: 3 });
};

/* ------------------------------ 7. Satuan tidak baku ------------------------------ */
const SUARA_S1 = "Kotak Pak Anton berisi mainan balok, kelereng, koin, dan bola tenis: satuan tidak baku.";
const SUARA_S2 = "Boneka harimau di satu piringan. Nia menaruh bola tenis di piringan lain satu per satu.";
const SUARA_S3 = "Setelah empat bola tenis, timbangan seimbang. Boneka sama dengan empat bola tenis!";

export const ADEGAN_SATUAN: AdeganStory = {
  id: "satuan",
  judul: "Satuan tidak baku",
  sumber: "Materi: satuan tidak baku, boneka dan bola tenis",
  latar: "#ECFEFF",
  ketukan: [
    k(
      SUARA_S1,
      tambah(0, judul("Kotak Satuan"), ...lapangan("lp", 152)),
      tambah("Anton", ...tokoh("pa", 26, 184, "Pak Anton")),
      tambah("berisi", kotak("bx", 66, 110, 200, 42, "#D6A15E", W.coklat, { rx: 4, tebal: 2.4 })),
      tambah("balok,", kotak("sb", 82, 120, 16, 12, "#F87171", "#7F1D1D", { rx: 1, z: 2 }), teks("lbk", 90, 170, "balok", 8, W.ungu)),
      tambah("kelereng,", bulat("sk", 138, 126, 6, "#93C5FD", "#1D4ED8", { z: 2 }), teks("lkl", 138, 170, "kelereng", 8, W.ungu)),
      tambah("koin,", bulat("sn", 188, 126, 7, "#FDE047", "#A16207", { z: 2 }), teks("lkn", 188, 170, "koin", 8, W.ungu)),
      tambah("tenis:", bulat("st", 236, 125, 9, HIJAU_BOLA, GARIS_BOLA, { z: 2 }), teks("lts", 236, 170, "bola tenis", 8, W.ungu)),
      tambah("satuan", teks("sat", 160, 56, "satuan tidak baku", 11, W.ungu)),
    ),
    k(
      SUARA_S2,
      bersih(0),
      tambah(0, judul("Boneka dan Bola Tenis"), ...lapangan("lp", 152)),
      tambah("Boneka", ...neraca("nr", 150, 100, 56, -8)),
      tambah("harimau", bonekaDi(-8)),
      tambah("satu", teks("n1", 150, 52, "1 boneka", 10, W.ungu)),
      tambah("Nia", ...tokoh("ni", 36, 184, "Nia")),
      tambah("menaruh", ...bolaTenis(-8, 1)),
      tambah("lain", ...bolaTenis(-8, 2).slice(1)),
      tambah("satu@3", ...bolaTenis(-8, 3).slice(2), teks("lt", 206, 148, "bola tenis", 8, W.ungu)),
    ),
    k(
      SUARA_S3,
      tambah("empat", teks("n4", 150, 52, "4 bola tenis", 10, W.ungu)),
      tambah("bola", ...bolaTenis(-8, 4).slice(3)),
      ubah("seimbang.", ...pindah(neraca("nr", 150, 100, 56, 0)), ...pindah(bolaTenis(0, 4)), ...pindah([bonekaDi(0)])),
      hapus("empat@2", "n1", "n4", "lt"),
      tambah("empat@2", teks("n5", 150, 52, "boneka sama dengan 4 bola tenis", 10, W.ungu)),
      tambah("tenis!", emo("ok", 150, 166, E.benar, 22)),
    ),
  ],
};

/* ------------------------------ 8. Satu benda, dua hasil ukur ------------------------------ */
const SUARA_D1 = "Dika mencoba kelereng. Timbangan baru seimbang setelah sepuluh kelereng!";
const SUARA_D2 = "Bonekanya sama, hasilnya berbeda, karena kelereng lebih ringan daripada bola tenis.";
const SUARA_D3 = "Satuan lebih ringan perlu jumlah lebih banyak. Pakai satu jenis satuan saja supaya adil.";

export const ADEGAN_DUA_HASIL: AdeganStory = {
  id: "dua-hasil",
  judul: "Satu benda, dua hasil ukur",
  sumber: "Materi: satu benda dua hasil ukur",
  latar: "#FDF4FF",
  ketukan: [
    k(
      SUARA_D1,
      bersih(0),
      tambah(0, judul("Boneka dan Kelereng"), ...lapangan("lp", 152)),
      tambah("Dika", ...tokoh("dk", 36, 184, "Dika")),
      tambah("mencoba", ...neraca("nr", 150, 100, 56, -8), bonekaDi(-8)),
      tambah("kelereng.", ...kelereng(-8, 5)),
      ubah("seimbang", ...pindah(neraca("nr", 150, 100, 56, 0)), ...pindah([bonekaDi(0)]), ...pindah(kelereng(0, 5))),
      tambah("seimbang", ...kelereng(0, 10).slice(5)),
      tambah("sepuluh", teks("n10", 150, 52, "10 kelereng", 10, W.ungu)),
    ),
    k(
      SUARA_D2,
      bersih(0),
      tambah(0, judul("Hasil Ukur Berbeda")),
      tambah("Bonekanya", emo("hm", 150, 64, E.harimau, 28), teks("bn", 150, 84, "boneka yang sama", 9, W.ungu)),
      tambah("hasilnya", ...kartu("ka", 30, 110, 110, 34, "#DCFCE7", ["4 bola tenis"], 10), ...kartu("kb", 160, 110, 110, 34, "#DBEAFE", ["10 kelereng"], 10)),
      tambah("berbeda,", teks("be", 150, 168, "hasil berbeda", 11, W.merah)),
      sorotkan("kelereng", "kb-k"),
      tambah("ringan", emo("aw", 215, 100, E.awan, 18)),
      sorotkan("tenis.", "ka-k"),
    ),
    k(
      SUARA_D3,
      bersih(0),
      tambah(0, judul("Satu Jenis Satuan")),
      tambah("ringan", teks("lr", 80, 62, "satuan lebih ringan", 9, W.hijau)),
      tambah("banyak.", panah("ar", 80, 72, 0, 18, W.biru, 2.2), teks("lb", 80, 112, "jumlah lebih banyak", 9, W.merah)),
      tambah("jenis", teks("n1", 214, 62, "1 jenis saja", 9, W.ungu), ...[0, 1, 2, 3].map((i) => bulat(`u${i}`, 190 + i * 14, 96, 5, "#93C5FD", "#1D4ED8", { z: 2 })), emo("oku", 262, 102, E.benar, 18)),
      tambah("saja", kotak("m0", 184, 134, 10, 10, "#F87171", "#7F1D1D", { rx: 1 }), bulat("m1", 206, 140, 5, "#FDE047", "#A16207"), bulat("m2", 224, 140, 5, HIJAU_BOLA, GARIS_BOLA), kotak("m3", 238, 135, 10, 10, "#93C5FD", "#1D4ED8", { rx: 1 }), emo("xm", 262, 144, E.salah, 18)),
      tambah("adil.", emo("nr", 150, 188, "\u{2696}", 24)),
    ),
  ],
};

/* ------------------------------ 9. Rantai buah dan penutup ------------------------------ */
const SUARA_R1 = "Bu Sari membawa buah. Satu pepaya sama dengan dua mangga, dan satu mangga sama dengan dua manggis.";
const SUARA_R2 = "Dika menghitung, jadi satu pepaya sama dengan empat manggis! Chacha menepati taruhannya, membawa semua kerucut sambil terhuyung.";
const SUARA_R3 = "Bu Ratna melambai membawa jam besar. Menurutmu, bagaimana jam menolong lomba? Terima kasih, Chacha, Dika, Nia, Bu Sari, dan Pak Anton!";

export const ADEGAN_RANTAI_PENUTUP: AdeganStory = {
  id: "rantai-penutup",
  judul: "Rantai buah dan Bu Ratna datang",
  sumber: "Materi: rantai buah, jembatan ke Sub-Bab B",
  latar: "#FFF1F2",
  ketukan: [
    k(
      SUARA_R1,
      tambah(0, judul("Rantai Buah"), ...lapangan("lp", 148)),
      tambah("Sari", ...tokoh("bs", 36, 184, "Bu Sari")),
      tambah("pepaya", buah("py", 110, 64, "pepaya"), teks("e1", 150, 68, "=", 14, W.biru)),
      tambah("dua", buah("mg1", 186, 64, "mangga"), buah("mg2", 208, 64, "mangga"), teks("l1", 150, 92, "1 pepaya = 2 mangga", 9, W.ungu)),
      tambah("satu@2", buah("mg0", 110, 118, "mangga"), teks("e2", 150, 122, "=", 14, W.biru)),
      tambah("dua@2", buah("ms1", 190, 118, "manggis"), buah("ms2", 206, 118, "manggis"), teks("l2", 150, 146, "1 mangga = 2 manggis", 9, W.ungu)),
    ),
    k(
      SUARA_R2,
      bersih(0),
      tambah(0, judul("Rantai Buah"), ...lapangan("lp", 140)),
      tambah("Dika", ...tokoh("dk", 36, 184, "Dika")),
      tambah("pepaya", buah("py", 100, 64, "pepaya"), teks("e1", 130, 68, "=", 14, W.biru)),
      tambah("empat", ...[0, 1, 2, 3].map((i) => buah(`ms${i}`, 156 + i * 16, 64, "manggis")), teks("l1", 150, 98, "1 pepaya = 4 manggis", 10, W.ungu)),
      tambah("Chacha", ...tokoh("ch", 252, 184, "Chacha")),
      tambah("kerucut", ...[0, 1, 2, 3, 4].flatMap((i) => kerucut(`kc${i}`, 252, 156 - i * 12, 16))),
      ubah("terhuyung.", { id: "ch", isi: E.pusing }, ...[0, 1, 2, 3, 4].flatMap((i) => pindah(kerucut(`kc${i}`, 258, 156 - i * 12, 16)))),
    ),
    k(
      SUARA_R3,
      bersih(0),
      tambah(0, judul("Sampai Jumpa, Bu Ratna"), ...lapangan("lp", 140), ...bendera("bd", 200, 36, 70)),
      tambah("Ratna", ...tokoh("br", 272, 150, "Bu Ratna", 26)),
      tambah("jam", emo("jm", 272, 100, "\u{23F0}", 34)),
      tambah("bagaimana", emo("tq", 236, 76, E.tanya, 24)),
      tambah("Chacha,", ...tokoh("ch", 30, 184, "Chacha")),
      tambah("Dika,", ...tokoh("dk", 80, 184, "Dika")),
      tambah("Nia,", ...tokoh("ni", 130, 184, "Nia")),
      tambah("Sari,", ...tokoh("bs", 180, 184, "Bu Sari")),
      tambah("Anton!", ...tokoh("pa", 230, 184, "Pak Anton"), emo("lb", 150, 120, E.lambai, 24)),
    ),
  ],
};
