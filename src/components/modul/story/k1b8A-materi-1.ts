import type { AdeganStory } from "./logika-story";
import { E, JENIS, URUT_JENIS, W, WK, bulat, emo, geserKotak, idKotak, jam, judul, kartu, kotakCerita, mobil, orang, pakPos, rak, tanah, teks, tengahPetak, type JenisKotak } from "./k1b8A-gambar";
import { hapus, k, sorotkan, tambah, ubah } from "./k1b8A-bantu";

/*
 * Cerita orisinal IGIL "Kotak Cerita Berantakan" (Kelas 1 Bab 8 Sub-Bab A, memilah benda, turus, dan tabel), awal cerita Perpustakaan Keliling.
 * Naskah suara dari naskah/story-naskah-k1b8a.md. Bagian ini: mobil pustaka datang, menghitung kotak yang masih campur (salah langkah), dan memilah.
 */

/** Delapan belas kotak dalam urutan acak: hewan enam, laut empat, roket lima, bunga tiga. */
export const ACAK: JenisKotak[] = ["roket", "hewan", "bunga", "laut", "hewan", "roket", "laut", "hewan", "bunga", "roket", "hewan", "laut", "roket", "hewan", "bunga", "laut", "roket", "hewan"];

/* ------------------------------ 1. Mobil pustaka datang ------------------------------ */
const SUARA_M1 = "Mobil pustaka Pak Pos Pustaka berhenti di halaman, dan Igil berlari menyambutnya.";
const SUARA_M2 = "Jalan kampung berlubang, jadi kotak cerita bergambar di bak mobil tumpah dan bercampur!";
const SUARA_M3 = "Pak Pos melirik jam. Pukul empat anak-anak datang, dan laporan banyak kotak tiap jenis harus selesai.";

const BERSERAK: [number, number][] = [[24, 172], [46, 186], [68, 168], [90, 184], [108, 172], [30, 152], [54, 154], [78, 152], [100, 154]];

export const ADEGAN_MOBIL: AdeganStory = {
  id: "mobil-datang",
  judul: "Mobil pustaka datang",
  sumber: "Materi: mobil pustaka dan kotak tumpah",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_M1,
      tambah(0, judul("Kotak Cerita Berantakan"), tanah("tn", 150)),
      tambah("Mobil", ...mobil("mb", 176, 96)),
      tambah("Pak", ...pakPos("pp", 158, 176)),
      tambah("Igil", ...orang("ig", 24, 176, E.igil, "Igil")),
      ubah("berlari", { id: "ig", x: 70 }, { id: "ig-n", x: 70 }),
      ubah("menyambutnya.", { id: "ig", x: 124 }, { id: "ig-n", x: 124 }),
    ),
    k(
      SUARA_M2,
      tambah("berlubang,", bulat("lb", 232, 176, 11, "#78350F", W.coklat, { tebal: 1.4, z: -2 }), bulat("lb2", 232, 176, 5, "#451A03", "#451A03", { z: -2 })),
      tambah("tumpah", ...BERSERAK.slice(0, 5).flatMap(([x, y], i) => kotakCerita(`bs${i}`, x, y, ACAK[i], 16))),
      tambah("bercampur!", ...BERSERAK.slice(5).flatMap(([x, y], i) => kotakCerita(`bs${i + 5}`, x, y, ACAK[i + 5], 16))),
    ),
    k(
      SUARA_M3,
      tambah("jam.", ...jam("jm", 40, 62, 18)),
      tambah("empat", kartu("j4", 18, 86, 44, 16, W.krem, ["jam 4"], 9)),
      tambah("anak-anak", emo("a1", 100, 66, E.anak, 20), emo("a2", 128, 66, E.anak, 20)),
      tambah("laporan", ...kartu("lp", 66, 82, 102, 30, W.putih, ["Laporan: banyak", "kotak tiap jenis"], 8.4)),
    ),
  ],
};

/* ------------------------------ 2. Menghitung langsung dari tumpukan campur (salah langkah) ------------------------------ */
const SUARA_C1 = "Igil terburu-buru menghitung kotak yang bercampur. Tunjuk sana, tunjuk sini, eh, kotak kuning terhitung dua kali!";
const SUARA_C2 = "Kaka menggeleng. Pisahkan dulu menurut jenisnya, baru hitung.";
const SUARA_C3 = "Mamah bertanya, mengapa dipisah dulu? Karena yang sejenis berkumpul, jadi tidak ada yang terlewat dan tidak ada yang terhitung dua kali.";

/** Dua belas kotak pertama menumpuk acak. */
const TUMPUK: [number, number][] = [[48, 92], [70, 76], [92, 100], [116, 84], [138, 104], [160, 80], [60, 118], [100, 122], [130, 124], [82, 60], [150, 58], [176, 102]];
/** Kotak kuning terhitung dua kali: nomor tumpukan. */
const KUNING = 3;
/** Kelompok rapi dua belas kotak menurut jenisnya (empat gugus 2 x 2). */
const GUGUS: Record<JenisKotak, [number, number]> = { hewan: [40, 66], laut: [112, 66], roket: [40, 120], bunga: [112, 120] };

export const ADEGAN_CAMPUR: AdeganStory = {
  id: "hitung-campur",
  judul: "Menghitung kotak yang masih campur",
  sumber: "Materi: campur, terhitung dua kali",
  latar: "#FEFCE8",
  ketukan: [
    k(
      SUARA_C1,
      tambah(0, judul("Dihitung langsung?"), tanah("tn", 140)),
      tambah("Igil", ...orang("ig", 252, 112, E.igil, "Igil")),
      tambah("kotak", ...TUMPUK.flatMap(([x, y], i) => kotakCerita(`c${i}`, x, y, ACAK[i], 18))),
      tambah("Tunjuk", emo("jr", 222, 96, E.jari, 22)),
      ubah("sana,", { id: "jr", x: 200, y: 66 }),
      ubah("sini,", { id: "jr", x: 200, y: 120 }),
      ubah("kuning", { id: `c${KUNING}`, warna: "#FDE047", sorot: true }),
      tambah("dua", ...kartu("dd", 170, 34, 112, 18, W.merahMuda, ["terhitung 2 kali"], 8.6)),
    ),
    k(
      SUARA_C2,
      hapus(0, "jr", "dd-k", "dd-t0"),
      ubah(0, { id: `c${KUNING}`, sorot: false }),
      tambah("Kaka", ...orang("kk", 268, 170, E.kaka, "Kaka")),
      tambah("menggeleng.", emo("sl", 206, 96, E.salah, 26)),
      tambah("Pisahkan", ...kartu("at", 20, 26, 124, 18, W.hijauMuda, ["pisahkan dulu"], 9)),
    ),
    k(
      SUARA_C3,
      hapus(0, "sl", "at-k", "at-t0"),
      tambah("Mamah", ...orang("mm", 24, 176, E.mamah, "Mamah")),
      tambah("bertanya,", emo("tn2", 52, 164, E.tanya, 22)),
      ...TUMPUK.slice(0, 12).flatMap((_, i) => {
        const jenis = ACAK[i];
        const letak = ACAK.slice(0, i).filter((j) => j === jenis).length;
        const [gx, gy] = GUGUS[jenis];
        return [ubah("berkumpul", ...geserKotak(`c${i}`, gx + (letak % 2) * 22, gy + Math.floor(letak / 2) * 22, 18))];
      }),
      ...[0, 1, 2, 3].map((n) => URUT_JENIS[n]).map((j) => tambah("berkumpul", emo(`g-${j}`, GUGUS[j][0] + 11, GUGUS[j][1] - 22, JENIS[j].e, 13))),
      tambah("terlewat", ...kartu("tl", 170, 34, 112, 18, W.hijauMuda, ["tidak ada yang terlewat"], 8)),
      tambah("dua", ...kartu("dk", 170, 58, 112, 18, W.hijauMuda, ["tidak terhitung 2 kali"], 8)),
    ),
  ],
};

/* ------------------------------ 3. Memilah ke rak ------------------------------ */
const SUARA_P1 = "Mereka memilah kotak itu. Kotak hewan ke rak pertama, kotak laut ke rak kedua.";
const SUARA_P2 = "Kotak roket ke rak ketiga, dan kotak bunga ke rak keempat.";
const SUARA_P3 = "Setiap rak kini berisi satu jenis saja. Rapi, dan mudah dihitung!";

const RAK_X = 14;
const RAK_W = 272;
const NAMA_RAK = ["Hewan", "Laut", "Roket", "Bunga"];
/** Tempat kotak ke-i (nomor 0 sampai 17 dalam ACAK) saat masih berserakan di rumput. */
const sebar = (i: number): [number, number] => [24 + 29 * (i % 9), 146 + 26 * Math.floor(i / 9)];
/** Tempat kotak di rak: jenis j, urutan ke-s dalam jenis itu (tiga kolom dua baris). */
const diRak = (j: number, s: number): [number, number] => [tengahPetak(RAK_X, RAK_W, 4, j) - 18 + 18 * (s % 3), 66 + 20 * Math.floor(s / 3)];
const nomorDi = (jenis: JenisKotak): number[] => ACAK.flatMap((j, i) => (j === jenis ? [i] : []));
const pindahKe = (at: string, jenis: JenisKotak, j: number) => nomorDi(jenis).map((no, s) => ubah(at, ...geserKotak(`b${no}`, ...diRak(j, s), 16)));

export const ADEGAN_PILAH: AdeganStory = {
  id: "pilah",
  judul: "Memilah ke rak",
  sumber: "Materi: pilah menurut jenis",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Pilah menurut jenis"), tanah("tn", 128), ...rak("rk", RAK_X, 28, RAK_W, 84, 4)),
      tambah(0, ...ACAK.flatMap((j, i) => kotakCerita(`b${i}`, ...sebar(i), j, 16))),
      tambah("Mereka", ...NAMA_RAK.map((n, j) => teks(`nr${j}`, tengahPetak(RAK_X, RAK_W, 4, j), 106, n, 8.4, WK.bingkai))),
      sorotkan("hewan", ...nomorDi("hewan").flatMap((no) => idKotak(`b${no}`))),
      ...pindahKe("pertama,", "hewan", 0),
      tambah("pertama,", teks("e0", tengahPetak(RAK_X, RAK_W, 4, 0), 52, E.hewan, 15)),
      sorotkan("laut", ...nomorDi("laut").flatMap((no) => idKotak(`b${no}`))),
      ...pindahKe("kedua.", "laut", 1),
      tambah("kedua.", teks("e1", tengahPetak(RAK_X, RAK_W, 4, 1), 52, E.laut, 15)),
    ),
    k(
      SUARA_P2,
      sorotkan("roket", ...nomorDi("roket").flatMap((no) => idKotak(`b${no}`))),
      ...pindahKe("ketiga,", "roket", 2),
      tambah("ketiga,", teks("e2", tengahPetak(RAK_X, RAK_W, 4, 2), 52, E.roket, 15)),
      sorotkan("bunga", ...nomorDi("bunga").flatMap((no) => idKotak(`b${no}`))),
      ...pindahKe("keempat.", "bunga", 3),
      tambah("keempat.", teks("e3", tengahPetak(RAK_X, RAK_W, 4, 3), 52, E.bunga, 15)),
    ),
    k(
      SUARA_P3,
      ubah(0, ...ACAK.flatMap((_, i) => [{ id: `b${i}`, sorot: false }, { id: `b${i}-e`, sorot: false }])),
      tambah("satu", ...kartu("sj", 70, 138, 160, 20, W.krem, ["1 rak = 1 jenis"], 9.4)),
      tambah("Rapi,", emo("ok", 150, 182, E.benar, 24)),
      tambah("dihitung!", ...[6, 4, 5, 3].map((n, j) => teks(`nb${j}`, tengahPetak(RAK_X, RAK_W, 4, j), 128, String(n), 11, W.merah))),
    ),
  ],
};
