import type { AdeganStory } from "./logika-story";
import { DG, E, JENIS, W, bintang, emo, idKolom, judul, jalan, kartu, kolomBintang, konfeti, kotakCerita, mobil, namaKol, orang, papanKapur, spanduk, sumbuTegak, teks, umbul, xKol } from "./k1b8B-gambar";
import { bersih, hapus, k, sorotkan, tambah, ubah } from "./k1b8B-bantu";

/*
 * Cerita orisinal IGIL "Cerita Kesukaan Anak Kampung" (Kelas 1 Bab 8 Sub-Bab B), akhir cerita Perpustakaan Keliling.
 * Naskah suara dari naskah/story-naskah-k1b8b.md. Bagian ini: jumlah semua anak, keputusan Pak Pos, dan penutup (perayaan akhir cerita bab).
 */

const DATA = [5, 4, 2, 4];
const semuaId = (id: string) => DATA.flatMap((n, i) => idKolom(id, i, 0, n - 1));

/* ------------------------------ 7. Jumlah semua anak ------------------------------ */
const SUARA_J1 = "Berapa anak yang ditanya semuanya? Lima tambah empat sama dengan sembilan.";
const SUARA_J2 = "Sembilan tambah dua sama dengan sebelas. Sebelas tambah empat sama dengan lima belas.";
const SUARA_J3 = "Lima belas anak, dan Igil menghitung bintangnya sekali lagi untuk memastikan.";

export const ADEGAN_JUMLAH: AdeganStory = {
  id: "jumlah",
  judul: "Jumlah semua anak yang ditanya",
  sumber: "Materi: jumlah semua data pada diagram",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_J1,
      tambah(
        0,
        judul("Berapa semuanya?"),
        ...sumbuTegak("sb", 5, false),
        ...DATA.flatMap((n, i) => [...kolomBintang("jm", i, n), namaKol(`nm${i}`, i), teks(`c${i}`, xKol(i), DG.dasar - n * DG.dy - 5, String(n), 11, W.merah)]),
      ),
      sorotkan("Lima", ...idKolom("jm", 0, 0, 4)),
      sorotkan("empat", ...idKolom("jm", 1, 0, 3)),
      tambah("sembilan.", teks("kal", 150, 56, "5 + 4 = 9", 13, W.merah)),
    ),
    k(
      SUARA_J2,
      ubah("Sembilan", { id: "kal", isi: "9 + 2 = 11" }),
      sorotkan("dua", ...idKolom("jm", 2, 0, 1)),
      ubah("Sebelas@2", { id: "kal", isi: "11 + 4 = 15" }),
      sorotkan("empat", ...idKolom("jm", 3, 0, 3)),
    ),
    k(
      SUARA_J3,
      ubah("belas", { id: "kal", isi: "15 anak" }),
      tambah("Igil", ...orang("ig", 272, 120, E.igil, "Igil")),
      sorotkan("menghitung", ...semuaId("jm")),
      tambah("memastikan.", emo("mt", 272, 86, E.mata, 22)),
    ),
  ],
};

/* ------------------------------ 8. Keputusan Pak Pos ------------------------------ */
const SUARA_P1 = "Pak Pos membaca diagramnya lama-lama sambil mengelus dagu.";
const SUARA_P2 = "Yang paling disukai dinosaurus. Pak Pos memesan kotak dinosaurus untuk minggu depan.";
const SUARA_P3 = "Igil melompat kegirangan sampai topinya terbang. Ternyata dinosaurus memang paling banyak dipilih!";

/** Diagram kecil di papan kapur: kolom i berisi DATA[i] bintang kecil `${id}{i}s{j}`. */
const kecil = (id: string) => DATA.flatMap((n, i) => Array.from({ length: n }, (_, j) => bintang(`${id}${i}s${j}`, 172 + i * 28, 126 - j * 9, 3.8, JENIS[i].bintang)));
const idKecil = (id: string, i: number) => Array.from({ length: DATA[i] }, (_, j) => `${id}${i}s${j}`);

export const ADEGAN_KEPUTUSAN: AdeganStory = {
  id: "keputusan",
  judul: "Pak Pos memutuskan jenis yang dipesan",
  sumber: "Materi: membaca diagram untuk mengambil keputusan",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Pak Pos membaca")),
      tambah("Pak", ...orang("pp", 60, 120, E.pria, "Pak Pos")),
      tambah("diagramnya", ...papanKapur("pk", 150, 36, 140, 100), ...kecil("kc")),
      tambah("lama-lama", emo("my", 222, 154, E.mata, 20)),
      tambah("dagu.", emo("pi", 88, 104, E.pikir, 20)),
    ),
    k(
      SUARA_P2,
      hapus(0, "pi", "my"),
      sorotkan("dinosaurus.", ...idKecil("kc", 0)),
      tambah("memesan", ...kartu("pm", 8, 40, 100, 40, W.krem, ["papan pesanan", "dinosaurus"], 8.6)),
      tambah("kotak", ...kotakCerita("pz", 96, 116, 24, 0)),
    ),
    k(
      SUARA_P3,
      tambah("Igil", ...orang("ig", 190, 176, E.igil, "Igil"), emo("tp", 190, 152, E.topi, 18)),
      ubah("melompat", { id: "ig", y: 160 }, { id: "ig-n", y: 173 }),
      ubah("terbang.", { id: "tp", x: 236, y: 124, rot: 25 }),
      tambah("dipilih!", emo("hr", 262, 170, E.pesta, 24)),
    ),
  ],
};

/* ------------------------------ 9. Penutup: mobil berkeliling ------------------------------ */
const SUARA_T1 = "Sore itu mobil pustaka berkeliling, dengan spanduk dan lampu hias di bak mobil.";
const SUARA_T2 = "Kaka merangkum. Tanya satu per satu, catat, buat tabel, gambar diagram yang rapat, lalu baca.";
const SUARA_T3 = "Menurutmu, apa yang paling disukai anak-anak di kampungmu? Terima kasih, Igil, Kaka, Abang, dan Mamah!";
const LANGKAH = ["1. tanya (1 anak, 1 jawaban)", "2. catat dengan lembar centang", "3. buat tabel", "4. gambar diagram yang rapat", "5. baca diagramnya"];
const WARNA_LANGKAH = [W.langit, W.krem, W.hijauMuda, W.pink, W.lavender];

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Mobil pustaka berkeliling dan rangkuman",
  sumber: "Materi: rangkuman langkah membuat diagram gambar",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Sore di kampung"), jalan("jl", 170)),
      tambah("Sore", emo("sr", 262, 44, E.sore, 26)),
      tambah("mobil", ...mobil("mb", 60, 104, 170)),
      tambah("pustaka", ...umbul("um", 30, 52, 240, 8)),
      tambah("spanduk", ...spanduk("sp", 66, 70, 130, "Perpustakaan Keliling", 8.6)),
      tambah("lampu", emo("lh0", 70, 122, E.lampu, 14), emo("lh1", 120, 122, E.lampu, 14), emo("lh2", 170, 122, E.lampu, 14)),
      tambah("bak", ...[0, 1, 2, 3].flatMap((i) => kotakCerita(`ck${i}`, 72 + i * 26, 132, 22, i))),
    ),
    k(
      SUARA_T2,
      bersih(0),
      tambah(0, judul("Kaka merangkum")),
      tambah("Kaka", ...orang("kk", 36, 100, E.kaka, "Kaka")),
      tambah("Tanya", ...kartu("r0", 70, 34, 220, 24, WARNA_LANGKAH[0], [LANGKAH[0]], 9)),
      tambah("catat,", ...kartu("r1", 70, 66, 220, 24, WARNA_LANGKAH[1], [LANGKAH[1]], 9)),
      tambah("tabel,", ...kartu("r2", 70, 98, 220, 24, WARNA_LANGKAH[2], [LANGKAH[2]], 9)),
      tambah("diagram", ...kartu("r3", 70, 130, 220, 24, WARNA_LANGKAH[3], [LANGKAH[3]], 9)),
      tambah("baca.", ...kartu("r4", 70, 162, 220, 24, WARNA_LANGKAH[4], [LANGKAH[4]], 9)),
    ),
    k(
      SUARA_T3,
      bersih(0),
      tambah(0, judul("Terima kasih!")),
      tambah("Menurutmu", ...papanKapur("pk", 40, 30, 220, 62), teks("pt", 150, 58, "Apa yang paling disukai", 10, W.putih), teks("pt2", 150, 74, "anak-anak di kampungmu?", 10, W.putih)),
      tambah("Terima", ...konfeti("kf")),
      tambah("Igil,", ...orang("ig", 52, 150, E.igil, "Igil")),
      tambah("Kaka,", ...orang("kk", 118, 150, E.kaka, "Kaka")),
      tambah("Abang,", ...orang("ab", 184, 150, E.abang, "Abang")),
      tambah("Mamah!", ...orang("mm", 250, 150, E.mamah, "Mamah"), emo("hr", 150, 118, E.hore, 24)),
    ),
  ],
};
