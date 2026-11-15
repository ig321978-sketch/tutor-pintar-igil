import type { AdeganStory, Obj } from "./logika-story";
import { ANAK_EMO, OWL, SAYUR, W, diagram, emo, judul, kartu, teks } from "./k1b8B-gambar";
import { bersih, hapus, hitungAksi, idx, k, redamkan, sorotHitung, sorotkan, tambah } from "./k1b8B-bantu";

/* ------------------------------ 1. Data sayur tercampur ------------------------------ */
const POSISI: [number, number][] = [[40, 60], [210, 118], [120, 138], [250, 66], [70, 112], [180, 56], [258, 140], [34, 148], [150, 90], [100, 58], [220, 88], [64, 86]];
const BENDA: Obj[] = SAYUR.flatMap((d) => Array.from({ length: d.n }, () => d.emo)).map((e, i) => emo(`sc${i}`, POSISI[i][0], POSISI[i][1], e, 22));
const idKat = (c: number): string[] => {
  const awal = SAYUR.slice(0, c).reduce((t, d) => t + d.n, 0);
  return Array.from({ length: SAYUR[c].n }, (_, i) => `sc${awal + i}`);
};
/** Perubahan letak: benda kategori c berjajar rapi pada baris c. */
const ke = (c: number) => idKat(c).map((id, j) => ({ id, x: 100 + j * 28, y: 70 + c * 30 }));
const SUARA_T1 = "Upe mengumpulkan data sayur kesukaan anak-anak. Lihat, ada banyak sayur di layar.";
const SUARA_T2 = "Sayurnya masih tercampur. Ada jagung, wortel, brokoli, dan kol di mana-mana.";
const SUARA_T3 = "Sulit melihat sayur mana yang paling banyak, kalau semuanya masih tercampur.";
const SUARA_T4 = "Supaya mudah, kita kumpulkan sayur yang sama. Jagung ke jagung, wortel ke wortel, brokoli ke brokoli, kol ke kol.";
const SUARA_T5 = "Sekarang sayurnya rapi dan mudah dihitung. Data yang rapi bisa kita ubah menjadi diagram gambar.";

export const ADEGAN_TERCAMPUR: AdeganStory = {
  id: "data-tercampur",
  judul: "Data sayur yang tercampur",
  sumber: "Materi: data tercampur",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_T1, tambah(0, judul("Sayur kesukaan")), tambah("Lihat,", ...BENDA)),
    k(SUARA_T2, tambah("tercampur.", ...kartu("tc", 40, 168, 220, 24, W.krem, ["data masih tercampur"], 9.6))),
    k(SUARA_T3, hapus(0, "tc-k", "tc-t0"), tambah("Sulit", emo("tq", 150, 186, "❓", 22))),
    k(
      SUARA_T4,
      hapus(0, "tq"),
      { at: "Jagung", ubah: ke(0) },
      tambah("Jagung", teks("nm0", 8, 66, "jagung", 8.6, W.biru, { anchor: "start" })),
      { at: "wortel,", ubah: ke(1) },
      tambah("wortel,", teks("nm1", 8, 96, "wortel", 8.6, W.biru, { anchor: "start" })),
      { at: "brokoli,", ubah: ke(2) },
      tambah("brokoli,", teks("nm2", 8, 126, "brokoli", 8.6, W.biru, { anchor: "start" })),
      { at: "kol", ubah: ke(3) },
      tambah("kol", teks("nm3", 8, 156, "kol", 8.6, W.biru, { anchor: "start" })),
    ),
    k(SUARA_T5, tambah("diagram", ...kartu("dg", 30, 176, 240, 20, W.hijauMuda, ["rapi, siap jadi diagram gambar"], 9))),
  ],
};

/* ------------------------------ 2. Satu gambar mewakili satu data ------------------------------ */
const baris = (r: number): Obj[] => [emo(`jg${r}`, 100, 60 + r * 40, SAYUR[0].emo, 26), teks(`sm${r}`, 150, 56 + r * 40, "=", 16, W.merah), emo(`an${r}`, 200, 60 + r * 40, ANAK_EMO, 26)];
const SUARA_G1 = "Di diagram gambar, satu gambar mewakili satu data. Satu gambar jagung berarti satu anak yang suka jagung.";
const SUARA_G2 = "Dua gambar jagung berarti dua anak yang suka jagung.";
const SUARA_G3 = "Tiga gambar jagung berarti tiga anak. Jumlah gambar sama dengan jumlah anak.";
const SUARA_G4 = "Satu gambar tidak boleh mewakili dua anak. Satu gambar hanya untuk satu data.";
const SUARA_G5 = "Ingat aturan ini. Satu gambar sama dengan satu data.";

export const ADEGAN_SATU_GAMBAR: AdeganStory = {
  id: "satu-gambar",
  judul: "Satu gambar mewakili satu data",
  sumber: "Materi: satu gambar satu data",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_G1, tambah(0, judul("Satu gambar, satu data")), tambah(idx(SUARA_G1, "Satu", 3), ...baris(0))),
    k(SUARA_G2, tambah("Dua", ...baris(1))),
    k(SUARA_G3, tambah("Tiga", ...baris(2)), tambah("Jumlah", emo("ow", 262, 150, OWL, 30))),
    k(
      SUARA_G4,
      bersih(0),
      tambah(0, judul("Jangan begini")),
      tambah("Satu", emo("jx", 90, 90, SAYUR[0].emo, 34), emo("ax", 190, 96, ANAK_EMO, 26), emo("ay", 224, 96, ANAK_EMO, 26), teks("sx", 140, 86, "=", 16, W.merah)),
      tambah("tidak", emo("sl", 150, 156, "❌", 28)),
    ),
    k(SUARA_G5, bersih(0), tambah(0, judul("Aturannya")), tambah("Ingat", ...kartu("ak", 40, 60, 220, 44, W.emas, ["1 gambar = 1 data"], 14)), tambah("Satu", emo("jb", 100, 160, SAYUR[0].emo, 30), emo("ab", 200, 160, ANAK_EMO, 30))),
  ],
};

/* ------------------------------ 3. Diagram gambar tegak ------------------------------ */
export const DS = diagram("sa", "tegak", SAYUR, "Sayur Kesukaan", "anak");
const SUARA_D1 = "Ini diagram gambar tegak tentang sayur kesukaan. Gambarnya tersusun ke atas, dari bawah.";
const SUARA_D2 = "Kolom pertama jagung. Satu, dua, tiga. Jagung ada tiga gambar.";
const SUARA_D3 = "Kolom kedua wortel. Satu, dua, tiga, empat. Wortel ada empat gambar.";
const SUARA_D4 = "Kolom ketiga brokoli, ada tiga gambar. Kolom keempat kol, ada dua gambar.";
const SUARA_D5 = "Lihat, kolom wortel paling tinggi, dan kolom kol paling pendek.";

export const ADEGAN_TEGAK: AdeganStory = {
  id: "diagram-tegak",
  judul: "Diagram gambar tegak",
  sumber: "Materi: diagram gambar tegak",
  latar: "#F0F9FF",
  ketukan: [
    k(SUARA_D1, tambah(0, ...DS.dasar)),
    k(SUARA_D2, tambah("jagung.", DS.label(0)), ...hitungAksi(SUARA_D2, DS.gambar(0), { setelah: "jagung." }), tambah(idx(SUARA_D2, "tiga", 2), DS.angka(0))),
    k(SUARA_D3, tambah("wortel.", DS.label(1)), ...hitungAksi(SUARA_D3, DS.gambar(1), { setelah: "wortel." }), tambah(idx(SUARA_D3, "empat", 2), DS.angka(1))),
    k(
      SUARA_D4,
      tambah("brokoli,", DS.label(2)),
      tambah("tiga", ...DS.gambar(2)),
      tambah(idx(SUARA_D4, "gambar.", 1), DS.angka(2)),
      tambah("kol,", DS.label(3)),
      tambah("dua", ...DS.gambar(3)),
      tambah(idx(SUARA_D4, "gambar.", 2), DS.angka(3)),
    ),
    k(SUARA_D5, sorotkan("wortel", ...DS.idGambar(1)), sorotkan("kol", ...DS.idGambar(3))),
  ],
};

/* ------------------------------ 4. Bagian-bagian diagram ------------------------------ */
const SEMUA_G = SAYUR.flatMap((_, c) => DS.idGambar(c));
const SEMUA_L = SAYUR.map((_, c) => `sal${c}`);
const SUARA_B1 = "Setiap diagram gambar punya bagian-bagian. Ayo kita kenali satu per satu.";
const SUARA_B2 = "Bagian pertama adalah judul. Judul diagram ini Sayur Kesukaan.";
const SUARA_B3 = "Bagian kedua adalah nama kolom. Namanya jagung, wortel, brokoli, dan kol.";
const SUARA_B4 = "Bagian ketiga adalah gambar. Satu gambar mewakili satu anak.";
const SUARA_B5 = "Bagian keempat adalah angka. Angka di sebelah kiri menunjukkan banyaknya gambar.";
const SUARA_B6 = "Bagian kelima adalah keterangan. Bunyinya, satu gambar sama dengan satu anak.";

export const ADEGAN_BAGIAN: AdeganStory = {
  id: "bagian-diagram",
  judul: "Bagian-bagian diagram gambar",
  sumber: "Materi: bagian diagram gambar",
  latar: "#FFFBEB",
  ketukan: [
    k(SUARA_B1, tambah(0, ...DS.semua)),
    k(SUARA_B2, sorotkan("judul.", "sajd")),
    k(SUARA_B3, redamkan(0, "sajd"), sorotkan("kolom.", ...SEMUA_L)),
    k(SUARA_B4, redamkan(0, ...SEMUA_L), sorotkan("gambar.", ...SEMUA_G)),
    k(SUARA_B5, redamkan(0, ...SEMUA_G), sorotkan("angka.", ...DS.idSumbu)),
    k(SUARA_B6, redamkan(0, ...DS.idSumbu), sorotkan("keterangan.", "sak")),
  ],
};

/* ------------------------------ 5. Membaca diagram tegak ------------------------------ */
const SUARA_R1 = "Sekarang kita baca diagramnya. Berapa anak yang suka wortel? Hitung gambar pada kolom wortel.";
const SUARA_R2 = "Satu, dua, tiga, empat. Empat anak suka wortel.";
const SUARA_R3 = "Jagung tiga anak, brokoli tiga anak, dan kol dua anak.";
const SUARA_R4 = "Sayur apa yang paling banyak disukai? Wortel, karena kolomnya paling tinggi.";
const SUARA_R5 = "Yang paling sedikit disukai adalah kol, dua anak.";

export const ADEGAN_BACA_TEGAK: AdeganStory = {
  id: "baca-tegak",
  judul: "Membaca diagram gambar tegak",
  sumber: "Materi: membaca diagram tegak",
  latar: "#F0F9FF",
  ketukan: [
    k(SUARA_R1, tambah(0, ...DS.semua)),
    k(SUARA_R2, ...sorotHitung(SUARA_R2, DS.idGambar(1)), tambah(idx(SUARA_R2, "empat", 2), DS.angka(1))),
    k(SUARA_R3, redamkan(0, ...DS.idGambar(1)), tambah(idx(SUARA_R3, "tiga", 1), DS.angka(0)), tambah(idx(SUARA_R3, "tiga", 2), DS.angka(2)), tambah("dua", DS.angka(3))),
    k(SUARA_R4, sorotkan("Wortel,", ...DS.idGambar(1))),
    k(SUARA_R5, redamkan(0, ...DS.idGambar(1)), sorotkan("kol,", ...DS.idGambar(3))),
  ],
};
