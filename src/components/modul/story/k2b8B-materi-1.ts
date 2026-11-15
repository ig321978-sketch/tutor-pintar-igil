import type { AdeganStory, Obj } from "./logika-story";
import { BINTANG, BUAH, EMO_BUAH, OWL, W, diagram, emo, judul, kartu, teks } from "./k2b8B-gambar";
import { bersih, hapus, hitungAksi, idx, k, redamkan, sorotHitung, sorotkan, tambah } from "./k2b8B-bantu";

/* ------------------------------ 1. Buah yang tercampur ------------------------------ */
const POSISI: [number, number][] = [[40, 60], [210, 118], [120, 138], [250, 66], [70, 112], [180, 56], [258, 140], [34, 148], [150, 90], [100, 58], [220, 88], [64, 86], [140, 120], [200, 142], [24, 100]];
const BENDA: Obj[] = BUAH.flatMap((d, c) => Array.from({ length: d.n }, () => EMO_BUAH[c])).map((e, i) => emo(`bc${i}`, POSISI[i][0], POSISI[i][1], e, 22));
const idKat = (c: number): string[] => {
  const awal = BUAH.slice(0, c).reduce((t, d) => t + d.n, 0);
  return Array.from({ length: BUAH[c].n }, (_, i) => `bc${awal + i}`);
};
/** Perubahan letak: buah jenis c berjajar rapi pada baris c. */
const ke = (c: number) => idKat(c).map((id, j) => ({ id, x: 100 + j * 28, y: 62 + c * 30 }));
const SUARA_T1 = "Kira sedang mencatat buah kesukaan. Lihat, ada banyak buah di layar.";
const SUARA_T2 = "Buahnya masih tercampur. Ada anggur, jeruk, apel, dan pisang di mana-mana.";
const SUARA_T3 = "Sulit melihat buah mana yang paling banyak, kalau semuanya masih tercampur.";
const SUARA_T4 = "Supaya mudah, kita pilah dulu. Anggur ke anggur, jeruk ke jeruk, apel ke apel, pisang ke pisang.";
const SUARA_T5 = "Sekarang buahnya rapi, dan mudah dihitung. Anggur dua, jeruk enam, apel empat, pisang tiga.";
const SUARA_T6 = "Data yang rapi seperti ini bisa kita sajikan dengan diagram gambar. Ayo kita lihat caranya.";

export const ADEGAN_BUAH_CAMPUR: AdeganStory = {
  id: "buah-campur",
  judul: "Data buah yang tercampur",
  sumber: "Materi: data buah tercampur",
  latar: "#FEF2F2",
  ketukan: [
    k(SUARA_T1, tambah(0, judul("Buah kesukaan")), tambah("Lihat,", ...BENDA)),
    k(SUARA_T2, tambah("tercampur.", ...kartu("tc", 40, 168, 220, 24, W.krem, ["data masih tercampur"], 9.6))),
    k(SUARA_T3, hapus(0, "tc-k", "tc-t0"), tambah("Sulit", emo("tq", 150, 186, "❓", 22))),
    k(
      SUARA_T4,
      hapus(0, "tq"),
      { at: idx(SUARA_T4, "Anggur"), ubah: ke(0) },
      tambah(idx(SUARA_T4, "Anggur"), teks("nm0", 8, 66, "anggur", 8.6, W.biru, { anchor: "start" })),
      { at: idx(SUARA_T4, "jeruk"), ubah: ke(1) },
      tambah(idx(SUARA_T4, "jeruk"), teks("nm1", 8, 96, "jeruk", 8.6, W.biru, { anchor: "start" })),
      { at: idx(SUARA_T4, "apel"), ubah: ke(2) },
      tambah(idx(SUARA_T4, "apel"), teks("nm2", 8, 126, "apel", 8.6, W.biru, { anchor: "start" })),
      { at: idx(SUARA_T4, "pisang"), ubah: ke(3) },
      tambah(idx(SUARA_T4, "pisang"), teks("nm3", 8, 156, "pisang", 8.6, W.biru, { anchor: "start" })),
    ),
    k(
      SUARA_T5,
      tambah(idx(SUARA_T5, "dua"), teks("bn0", 272, 66, "2", 12, W.merah)),
      tambah(idx(SUARA_T5, "enam"), teks("bn1", 272, 96, "6", 12, W.merah)),
      tambah(idx(SUARA_T5, "empat"), teks("bn2", 272, 126, "4", 12, W.merah)),
      tambah(idx(SUARA_T5, "tiga"), teks("bn3", 272, 156, "3", 12, W.merah)),
    ),
    k(SUARA_T6, tambah("diagram", ...kartu("dg", 30, 176, 240, 20, W.hijauMuda, ["rapi, siap jadi diagram gambar"], 9))),
  ],
};

/* ------------------------------ 2. Satu bintang untuk satu buah ------------------------------ */
/** Baris pasangan: n buah (gambar benda) sama dengan n bintang berwarna. Id `fe{r}{i}`, `bt{r}{i}`, tanda `sm{r}`. */
const baris = (r: number, n: number, e: string, warna: string): Obj[] => [
  ...Array.from({ length: n }, (_, i) => emo(`fe${r}${i}`, 60 + i * 30, 66 + r * 40, e, 26)),
  teks(`sm${r}`, 150, 62 + r * 40, "=", 16, W.merah),
  ...Array.from({ length: n }, (_, i) => teks(`bt${r}${i}`, 200 + i * 28, 70 + r * 40, BINTANG, 22, warna)),
];
const SUARA_G1 = "Di diagram gambar, satu gambar mewakili satu benda. Kita pakai bintang untuk menandai buah.";
const SUARA_G2 = "Satu buah apel ditandai satu bintang merah. Satu buah jeruk ditandai satu bintang jingga.";
const SUARA_G3 = "Dua buah anggur ditandai dua bintang biru. Jumlah bintang sama dengan jumlah buah.";
const SUARA_G4 = "Satu bintang tidak boleh mewakili dua buah. Satu bintang hanya untuk satu buah.";
const SUARA_G5 = "Ingat aturannya. Satu gambar sama dengan satu benda, dan semua gambar harus sama.";

export const ADEGAN_SATU_BINTANG: AdeganStory = {
  id: "satu-bintang",
  judul: "Satu bintang untuk satu buah",
  sumber: "Materi: satu gambar satu benda",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_G1, tambah(0, judul("Satu bintang, satu buah")), tambah("bintang", emo("ow", 150, 130, OWL, 40))),
    k(SUARA_G2, hapus(0, "ow"), tambah("apel", ...baris(0, 1, "\u{1F34E}", W.merah)), tambah("jeruk", ...baris(1, 1, "\u{1F34A}", W.jingga))),
    k(SUARA_G3, tambah("Dua", ...baris(2, 2, "\u{1F347}", W.biruGambar)), tambah("Jumlah", emo("ow", 262, 150, OWL, 30))),
    k(
      SUARA_G4,
      bersih(0),
      tambah(0, judul("Jangan begini")),
      tambah("Satu", emo("ax", 70, 96, "\u{1F34E}", 30), emo("ay", 106, 96, "\u{1F34E}", 30), teks("sx", 150, 92, "=", 16, W.merah), teks("bx", 200, 98, BINTANG, 30, W.merah)),
      tambah("tidak", emo("sl", 150, 156, "❌", 28)),
    ),
    k(SUARA_G5, bersih(0), tambah(0, judul("Aturannya")), tambah("Ingat", ...kartu("ak", 40, 60, 220, 44, W.emas, ["1 gambar = 1 benda"], 14)), tambah("Satu", emo("jb", 100, 160, "\u{1F34E}", 30), teks("bb", 200, 166, BINTANG, 30, W.merah))),
  ],
};

/* ------------------------------ 3. Diagram gambar buah ------------------------------ */
export const DB = diagram("db", BUAH, "Buah Kesukaan", "buah");
const SUARA_D1 = "Ini diagram gambar buah kesukaan. Gambarnya berjajar ke samping, satu baris untuk satu jenis buah.";
const SUARA_D2 = "Baris pertama anggur. Satu, dua. Anggur ada dua bintang biru.";
const SUARA_D3 = "Baris kedua jeruk. Satu, dua, tiga, empat, lima, enam. Jeruk ada enam bintang jingga.";
const SUARA_D4 = "Baris ketiga apel, ada empat bintang merah. Baris keempat pisang, ada tiga bintang hijau.";
const SUARA_D5 = "Lihat, semua bintang sama bentuk dan sama besar. Jaraknya juga sama, jadi mudah dihitung.";

export const ADEGAN_DIAGRAM_BUAH: AdeganStory = {
  id: "diagram-buah",
  judul: "Diagram gambar buah kesukaan",
  sumber: "Materi: diagram gambar mendatar",
  latar: "#F0F9FF",
  ketukan: [
    k(SUARA_D1, tambah(0, ...DB.dasar)),
    k(SUARA_D2, tambah("anggur.", DB.label(0)), ...hitungAksi(SUARA_D2, DB.gambar(0), { setelah: "anggur." }), tambah(idx(SUARA_D2, "dua", 2), DB.angka(0))),
    k(SUARA_D3, tambah("jeruk.", DB.label(1)), ...hitungAksi(SUARA_D3, DB.gambar(1), { setelah: "jeruk." }), tambah(idx(SUARA_D3, "enam", 2), DB.angka(1))),
    k(
      SUARA_D4,
      tambah(idx(SUARA_D4, "apel"), DB.label(2)),
      tambah(idx(SUARA_D4, "empat"), ...DB.gambar(2), DB.angka(2)),
      tambah(idx(SUARA_D4, "pisang"), DB.label(3)),
      tambah(idx(SUARA_D4, "tiga"), ...DB.gambar(3), DB.angka(3)),
    ),
    k(SUARA_D5, sorotkan("Lihat,", ...DB.idSemua), redamkan("mudah", ...DB.idSemua)),
  ],
};

/* ------------------------------ 4. Bagian-bagian diagram ------------------------------ */
const SUARA_B1 = "Setiap diagram gambar punya bagian-bagian. Ayo kita kenali satu per satu.";
const SUARA_B2 = "Bagian pertama adalah judul. Judul diagram ini Buah Kesukaan.";
const SUARA_B3 = "Bagian kedua adalah nama baris. Namanya anggur, jeruk, apel, dan pisang.";
const SUARA_B4 = "Bagian ketiga adalah gambar. Satu gambar mewakili satu buah.";
const SUARA_B5 = "Bagian keempat adalah angka di ujung baris. Angka itu menunjukkan banyaknya gambar.";
const SUARA_B6 = "Bagian kelima adalah keterangan di bawah diagram. Bunyinya, satu bintang sama dengan satu buah.";

export const ADEGAN_BAGIAN: AdeganStory = {
  id: "bagian-diagram",
  judul: "Bagian-bagian diagram gambar",
  sumber: "Materi: bagian diagram gambar",
  latar: "#FFFBEB",
  ketukan: [
    k(SUARA_B1, tambah(0, ...DB.semua, ...BUAH.map((_, c) => DB.angka(c)))),
    k(SUARA_B2, sorotkan("judul.", "dbjd")),
    k(SUARA_B3, redamkan(0, "dbjd"), sorotkan("baris.", ...DB.idLabel)),
    k(SUARA_B4, redamkan(0, ...DB.idLabel), sorotkan("gambar.", ...DB.idSemua)),
    k(SUARA_B5, redamkan(0, ...DB.idSemua), sorotkan("angka", ...DB.idAngka)),
    k(SUARA_B6, redamkan(0, ...DB.idAngka), sorotkan("keterangan", "dbk")),
  ],
};

/* ------------------------------ 5. Membaca baris dari kiri ke kanan ------------------------------ */
const PANAH: Obj = { id: "ar", t: "panah", x: 80, y: 170, x2: 140, y2: 0, warna: W.merah, tebal: 2.4 };
const SUARA_R1 = "Sekarang kita baca diagramnya. Kita baca setiap baris dari kiri ke kanan.";
const SUARA_R2 = "Berapa buah jeruk? Hitung bintang jingga dari kiri ke kanan. Satu, dua, tiga, empat, lima, enam. Jeruk ada enam.";
const SUARA_R3 = "Sekarang anggur. Satu, dua. Anggur ada dua. Lalu apel. Satu, dua, tiga, empat. Apel ada empat.";
const SUARA_R4 = "Terakhir pisang. Pisang ada tiga. Baris yang paling panjang, berarti buahnya paling banyak.";

export const ADEGAN_BACA_BARIS: AdeganStory = {
  id: "baca-baris",
  judul: "Membaca baris dari kiri ke kanan",
  sumber: "Materi: membaca diagram gambar",
  latar: "#F0F9FF",
  ketukan: [
    k(SUARA_R1, tambah(0, ...DB.semua), tambah("kiri", PANAH), tambah("kanan.", teks("ard", 150, 164, "dibaca dari kiri ke kanan", 9, W.merah))),
    k(SUARA_R2, hapus(0, "ar", "ard"), ...sorotHitung(SUARA_R2, DB.idGambar(1), { setelah: "kanan." }), tambah(idx(SUARA_R2, "enam", 2), DB.angka(1))),
    k(
      SUARA_R3,
      redamkan(0, ...DB.idGambar(1)),
      ...sorotHitung(SUARA_R3, DB.idGambar(0), { setelah: "anggur." }),
      tambah(idx(SUARA_R3, "dua", 2), DB.angka(0)),
      redamkan(idx(SUARA_R3, "Lalu"), ...DB.idGambar(0)),
      ...sorotHitung(SUARA_R3, DB.idGambar(2), { setelah: "apel." }),
      tambah(idx(SUARA_R3, "empat", 2), DB.angka(2)),
    ),
    k(SUARA_R4, redamkan(0, ...DB.idGambar(2)), tambah(idx(SUARA_R4, "tiga"), DB.angka(3)), sorotkan("paling", ...DB.idGambar(1))),
  ],
};
