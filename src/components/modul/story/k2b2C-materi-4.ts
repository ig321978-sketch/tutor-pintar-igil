import type { AdeganStory, Obj } from "./logika-story";
import { EMO, OWL, W, bendaDi, emo, garisBil, jumlahG, judul, kartu, kotak, namaG, penanda, teks, titikBaris, type GeoG } from "./k2b2C-gambar";
import { bersih, hapus, idx, k, loncatAksi, redamkan, sorotkan, tambah, ubah } from "./k2b2C-bantu";

const ex = (isi: string, id = "ex", x = 150, y = 100, u = 16): Obj => teks(id, x, y, isi, u, W.merah);

/* ------------------------------ 1. Bilangan awal: kelereng Wei ------------------------------ */
export const G_AWAL: GeoG = { x0: 18, y: 150, dx: 26, dari: 6, sampai: 16 };
const SUARA_A1 = "Wei punya beberapa kelereng. Wei dapat lima kelereng lagi. Sekarang kelereng Wei ada empat belas.";
const SUARA_A2 = "Kita tulis: titik-titik ditambah lima sama dengan empat belas. Kita cari bilangan awalnya.";
const SUARA_A3 = "Kita balik ceritanya. Yang bertambah kita kembalikan dengan mengurangi. Kita loncat mundur dari empat belas: satu, dua, tiga, empat, lima.";
const SUARA_A4 = "Empat belas dikurangi lima sama dengan sembilan. Jadi kelereng Wei semula ada sembilan.";
const SUARA_A5 = "Kita periksa dengan operasi lawan. Sembilan ditambah lima sama dengan empat belas.";

export const ADEGAN_KELERENG_AWAL: AdeganStory = {
  id: "kelereng-awal",
  judul: "Bilangan awal: kelereng Wei",
  sumber: "Materi: bilangan awal lewat jalur bilangan",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_A1,
      tambah(0, judul("Kelereng Wei"), emo("ke", 150, 80, EMO.kelereng, 24)),
      tambah(idx(SUARA_A1, "beberapa"), ...kartu("c0", 8, 34, 88, 30, W.hijauMuda, ["awal: ?"], 10.4)),
      tambah(idx(SUARA_A1, "dapat"), ...kartu("c1", 106, 34, 88, 30, W.krem, ["dapat lagi: 5"], 10)),
      tambah(idx(SUARA_A1, "Sekarang"), ...kartu("c2", 204, 34, 88, 30, W.pink, ["sekarang: 14"], 10)),
    ),
    k(SUARA_A2, hapus(0, "ke"), tambah(idx(SUARA_A2, "titik-titik"), ex("? + 5 = 14", "ex", 150, 100)), tambah(idx(SUARA_A2, "cari"), ...garisBil("j", G_AWAL)), tambah(idx(SUARA_A2, "bilangan"), penanda("j", G_AWAL, 14, W.merah))),
    k(SUARA_A3, ...loncatAksi(SUARA_A3, "j", G_AWAL, 14, -1, 5, "belas"), sorotkan(idx(SUARA_A3, "balik"), "c0-k")),
    k(SUARA_A4, redamkan(0, "c0-k"), ubah(idx(SUARA_A4, "Empat"), { id: "ex", isi: "14 − 5 = 9" }), tambah(idx(SUARA_A4, "semula"), penanda("j", G_AWAL, 9, W.ungu)), ubah(idx(SUARA_A4, "sembilan", 2), { id: "c0-t0", isi: "awal: 9" })),
    k(SUARA_A5, ubah(idx(SUARA_A5, "Sembilan"), { id: "ex", isi: "9 + 5 = 14" }), tambah(idx(SUARA_A5, "empat"), emo("ok", 262, 100, "✅", 18))),
  ],
};

/* ------------------------------ 2. Tiga bilangan: boneka tiga sahabat ------------------------------ */
const Y_BONEKA = [58, 100, 142];
const ptsBoneka = (n: number, i: number) => titikBaris(n, 46, Y_BONEKA[i], 26);
const SUARA_B1 = "Kira punya lima boneka. Wei punya tujuh boneka. Halim punya delapan boneka.";
const SUARA_B2 = "Berapa jumlah semua boneka? Kita jumlahkan dua dulu, yaitu boneka Kira dan Wei.";
const SUARA_B3 = "Lima ditambah tujuh sama dengan dua belas.";
const SUARA_B4 = "Lalu dua belas ditambah boneka Halim. Dua belas ditambah delapan sama dengan dua puluh.";
const SUARA_B5 = "Jadi jumlah semua boneka adalah dua puluh buah.";

export const ADEGAN_TIGA_BONEKA: AdeganStory = {
  id: "tiga-boneka",
  judul: "Menjumlahkan tiga bilangan: boneka tiga sahabat",
  sumber: "Materi: jumlah tiga bilangan",
  latar: "#FFF1F2",
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, judul("Boneka tiga sahabat")),
      tambah(idx(SUARA_B1, "Kira"), namaG("a", 6, 54, "Kira"), ...bendaDi("a", EMO.boneka, ptsBoneka(5, 0)), jumlahG("a", 276, 56, "5")),
      tambah(idx(SUARA_B1, "Wei"), namaG("b", 6, 96, "Wei"), ...bendaDi("b", EMO.boneka, ptsBoneka(7, 1)), jumlahG("b", 276, 98, "7")),
      tambah(idx(SUARA_B1, "Halim"), namaG("c", 6, 138, "Halim"), ...bendaDi("c", EMO.boneka, ptsBoneka(8, 2)), jumlahG("c", 276, 140, "8")),
    ),
    k(SUARA_B2, tambah(idx(SUARA_B2, "dua"), kotak("br", 3, 34, 294, 68, "#FEF3C7", W.merah, { rx: 6, tebal: 1.2, putus: true, z: -1 }))),
    k(SUARA_B3, tambah(idx(SUARA_B3, "Lima"), ex("5 + 7 = 12", "ex", 150, 172, 15))),
    k(SUARA_B4, ubah(idx(SUARA_B4, "Lalu"), { id: "br", h: 114 }), tambah(idx(SUARA_B4, "ditambah", 2), ex("12 + 8 = 20", "xk", 150, 192, 14))),
    k(SUARA_B5, tambah(idx(SUARA_B5, "Jadi"), emo("ok", 262, 190, "✅", 20)), sorotkan(idx(SUARA_B5, "dua"), "xk")),
  ],
};

/* ------------------------------ 3. Membuat soal cerita sendiri ------------------------------ */
const POS_PILIH = [
  { id: "p0", x: 8, y: 30, w: 136, label: "tokoh", isi: "Wei dan Igil", warna: W.hijauMuda },
  { id: "p1", x: 156, y: 30, w: 136, label: "benda", isi: "kue", warna: W.pink },
  { id: "p2", x: 8, y: 76, w: 136, label: "kata kunci", isi: "lebihnya", warna: W.langit },
  { id: "p3", x: 156, y: 76, w: 136, label: "bilangan", isi: "8 dan 4", warna: W.krem },
];
const kotakPilih = (i: number): Obj[] => {
  const p = POS_PILIH[i];
  return [kotak(`${p.id}-k`, p.x, p.y, p.w, 40, p.warna, W.biru, { rx: 8 }), teks(`${p.id}-l`, p.x + p.w / 2, p.y + 13, p.label, 9, W.biru)];
};
const nilaiPilih = (i: number): Obj => teks(`${POS_PILIH[i].id}-v`, POS_PILIH[i].x + POS_PILIH[i].w / 2, POS_PILIH[i].y + 31, POS_PILIH[i].isi, 12, W.merah);
const SUARA_C1 = "Sekarang giliranmu membuat soal cerita. Di layar kamu bisa memilih tokoh, benda, kata kunci, dan bilangan.";
const SUARA_C2 = "Kita pilih tokoh Wei dan Igil, benda kue, kata kunci lebihnya, dan bilangan delapan dan empat.";
const SUARA_C3 = "Soal tersusun otomatis. Wei punya delapan kue. Igil punya empat kue lebihnya dari Wei. Berapa kue Igil?";
const SUARA_C4 = "Kata lebihnya berarti kita tambah. Delapan ditambah empat sama dengan dua belas. Jadi kue Igil ada dua belas.";
const SUARA_C5 = "Ingat, hasil soal buatanmu paling banyak dua puluh.";

export const ADEGAN_BUAT_SOAL: AdeganStory = {
  id: "buat-soal",
  judul: "Membuat soal cerita sendiri",
  sumber: "Materi: membuat soal cerita",
  latar: "#F5F3FF",
  ketukan: [
    k(
      SUARA_C1,
      tambah(0, judul("Giliranmu!")),
      tambah(idx(SUARA_C1, "tokoh"), ...kotakPilih(0)),
      tambah(idx(SUARA_C1, "benda"), ...kotakPilih(1)),
      tambah(idx(SUARA_C1, "kata"), ...kotakPilih(2)),
      tambah(idx(SUARA_C1, "bilangan"), ...kotakPilih(3)),
    ),
    k(SUARA_C2, tambah(idx(SUARA_C2, "Wei"), nilaiPilih(0)), tambah(idx(SUARA_C2, "kue"), nilaiPilih(1)), tambah(idx(SUARA_C2, "lebihnya"), nilaiPilih(2)), tambah(idx(SUARA_C2, "delapan"), nilaiPilih(3))),
    k(
      SUARA_C3,
      tambah(idx(SUARA_C3, "tersusun"), ...kartu("sk", 20, 144, 260, 52, W.putih, ["Wei punya 8 kue.", "Igil punya 4 kue lebihnya dari Wei.", "Berapa kue Igil?"], 9.4)),
    ),
    k(SUARA_C4, sorotkan(idx(SUARA_C4, "lebihnya"), "p2-k"), tambah(idx(SUARA_C4, "Delapan"), ex("8 + 4 = 12", "ex", 150, 134, 15)), tambah(idx(SUARA_C4, "Jadi"), emo("ok", 262, 134, "✅", 18))),
    k(SUARA_C5, bersih(0), tambah(0, judul("Ingat!")), tambah(idx(SUARA_C5, "hasil"), ...kartu("mx", 30, 56, 240, 60, W.emas, ["hasil soal buatanmu", "paling banyak 20"], 12)), tambah(idx(SUARA_C5, "dua"), emo("ow", 150, 168, OWL, 40))),
  ],
};
