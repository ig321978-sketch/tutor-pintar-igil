import type { AdeganStory, Obj } from "./logika-story";
import { W, bulat, candi, emo, garis, judul, kartu, kotak, sedotan, segitiga, tabel, teks, idBaris, titikSisi } from "./k5b7a-gambar";
import { bersih, k, sorotkan, tambah, ubah } from "./k5b7a-bantu";

/* ------------------------------ 1. Pembuka bab: Candi Sewu (hlm. 191 sampai 194) ------------------------------ */
export const ADEGAN_PEMBUKA: AdeganStory = {
  id: "pembuka-candi",
  judul: "Pembuka Bab 7: Candi Sewu dan bentuk segitiga",
  sumber: "Buku Siswa hlm. 191–194",
  latar: "#FFF7ED",
  kutipan: [
    "Setelah mempelajari bab ini, diharapkan kalian mampu",
    "membandingkan berbagai macam bangun datar dengan",
    "Candi Sewu adalah sebuah candi Buddha yang terletak di Yogyakarta",
    "hanya sekitar 249 buah",
    "Candi Sewu merupakan peninggalan Dinasti Syailendra",
    "dibangun pada abad ke-8 Masehi",
    "mengamati bentuk-bentuk bangunan yang ada di kompleks Candi Sewu",
    "selain agar lebih kokoh, bentuk segitiga",
    "juga melambangkan hubungan manusia yang terpusat kepada Tuhan",
    "Komang dan Nisa berbeda pendapat tentang bentuk bangunan",
    "Apakah berbentuk segitiga sama sisi?",
    "Bolehkah segitiga sama sisi juga disebut segitiga sama kaki?",
  ],
  ketukan: [
    k(
      "Bab 7 membandingkan ciri-ciri bangun datar. Subbab A membahas ciri-ciri segitiga. Tujuannya, kalian mampu membandingkan berbagai macam bangun datar dengan memperhatikan ciri-cirinya.",
      tambah(0, judul("Bab 7: Membandingkan Ciri-Ciri Bangun Datar")),
      tambah("Subbab", ...kartu("sb", 60, 44, 180, 30, W.krem, ["Subbab A: ciri-ciri segitiga"], 9.6)),
      tambah("Tujuannya,", ...kartu("tj", 20, 90, 260, 46, W.hijauMuda, ["Tujuan: membandingkan berbagai bangun", "datar dengan memperhatikan ciri-cirinya"], 9)),
      tambah("memperhatikan", emo("sg", 150, 178, "🔺", 28)),
    ),
    k(
      "Buku menulis Candi Sewu, candi Buddha di Yogyakarta, peninggalan Dinasti Syailendra abad kedelapan. Sewu berarti seribu, padahal candinya hanya sekitar dua ratus empat puluh sembilan.",
      bersih(0),
      tambah(0, judul("Candi Sewu")),
      tambah("Candi", ...candi("cd", 80, 160, 1.9)),
      tambah("Buddha", teks("c1", 222, 72, "candi Buddha", 9, W.coklat)),
      tambah("abad", teks("c2", 222, 96, "abad ke-8", 9, W.coklat)),
      tambah("seribu,", teks("c3", 222, 120, "sewu = seribu", 9, W.hijau)),
      tambah("sekitar", teks("c4", 222, 144, "sekitar 249 candi", 9, W.merah)),
    ),
    k(
      "Yohana dan teman-teman mengamati bentuk bangunan candi. Ternyata banyak yang mirip bangun datar di sekolah.",
      bersih(0),
      tambah(0, judul("mengamati bentuk bangunan")),
      tambah("Yohana", emo("yh", 40, 110, "👧", 34), teks("yt", 40, 134, "Yohana", 8.6)),
      tambah("teman-teman", emo("tm", 90, 110, "🧒", 34), teks("tt", 90, 134, "teman", 8.6)),
      tambah("candi", ...candi("cd2", 215, 150, 1.7)),
      tambah("mirip", garis("pm", 105, 112, 40, 0, W.hijau, 3, { gambar: true }), teks("mr", 150, 176, "mirip bangun datar", 9.4, W.ungu)),
    ),
    k(
      "Seorang teman berkata candi mirip segitiga. Lainnya bertanya, mengapa berbentuk segitiga? Jawabnya: lebih kokoh, dan melambangkan hubungan manusia yang terpusat kepada Tuhan.",
      bersih(0),
      tambah(0, judul("mengapa berbentuk segitiga?")),
      tambah("mirip", ...candi("cd3", 70, 150, 1.5)),
      tambah("mengapa", teks("qm", 70, 176, "mengapa segitiga?", 9, W.merah)),
      tambah("kokoh,", ...kartu("ko", 140, 50, 150, 34, W.krem, ["lebih kokoh"], 9.6)),
      tambah("hubungan", ...kartu("tu", 140, 100, 150, 50, W.langit, ["manusia terpusat", "kepada Tuhan"], 9.2)),
    ),
    k(
      "Komang dan Nisa berbeda pendapat tentang bentuk candi. Satu menyebutnya mirip segitiga sama sisi, yang lain mengatakan lebih tepat disebut segitiga sama kaki.",
      bersih(0),
      tambah(0, judul("Komang dan Nisa berbeda pendapat")),
      tambah("Satu", segitiga("ss", 40, 150, [[0, 0], [70, 0], [35, -60.6]], W.jingga), teks("ssl", 75, 172, "segitiga sama sisi?", 8.6)),
      tambah("lain", segitiga("sk", 200, 150, [[0, 0], [50, 0], [25, -70]], W.langit), teks("skl", 225, 172, "segitiga sama kaki?", 8.6)),
    ),
    k(
      "Ada tiga pertanyaan. Satu, apakah sama sisi? Dua, apakah sama kaki? Tiga, bolehkah segitiga sama sisi juga disebut sama kaki? Jawabannya kita temukan lewat eksplorasi.",
      bersih(0),
      tambah(0, judul("tiga pertanyaan")),
      tambah("Satu,", ...kartu("q1", 20, 40, 260, 34, W.krem, ["1. Apakah berbentuk segitiga sama sisi?"], 9)),
      tambah("Dua,", ...kartu("q2", 20, 86, 260, 34, W.langit, ["2. Apakah berbentuk segitiga sama kaki?"], 9)),
      tambah("Tiga,@2", ...kartu("q3", 20, 132, 260, 48, W.hijauMuda, ["3. Bolehkah segitiga sama sisi juga", "disebut segitiga sama kaki?"], 9)),
    ),
  ],
};

/* ------------------------------ 2. Denah, peta konsep, dan bekal awal (hlm. 192 dan 195) ------------------------------ */
const titikPinggir = (id: string): Obj[] => {
  const out: Obj[] = [];
  const f = [0.2, 0.4, 0.6, 0.8];
  f.forEach((p, i) => {
    out.push(bulat(`${id}a${i}`, 40 + 110 * p, 40, 3.5, W.hijau, W.biru, { tebal: 1 }));
    out.push(bulat(`${id}b${i}`, 40 + 110 * p, 150, 3.5, W.hijau, W.biru, { tebal: 1 }));
    out.push(bulat(`${id}c${i}`, 40, 40 + 110 * p, 3.5, W.hijau, W.biru, { tebal: 1 }));
    out.push(bulat(`${id}d${i}`, 150, 40 + 110 * p, 3.5, W.hijau, W.biru, { tebal: 1 }));
  });
  return out;
};

export const ADEGAN_DENAH_PETA: AdeganStory = {
  id: "denah-peta",
  judul: "Denah Candi Sewu, peta konsep, dan bekal awal",
  sumber: "Buku Siswa hlm. 192 dan 195; Panduan Guru hlm. 291–293",
  latar: "#F0FDF4",
  kutipan: [
    "Asep dan Lukas juga berdiskusi seru ketika menemukan",
    "denah kompleks Candi Sewu",
    "Kompleks Candi Sewu",
    "panjangnya 185 m dan",
    "lebarnya 165 m. Karena tidak sama,",
    "seharusnya disebut persegi panjang",
    "Kapankah suatu segi empat digolongkan sebagai persegi?",
    "Bolehkah persegi juga disebut sebagai persegi panjang?",
    "Peta Konsep",
    "Macam-macam Segitiga Berdasarkan Panjang Sisinya",
    "Jumlah Sudut-Sudut dalam Segitiga",
    "Kata Kunci",
    "Di kelas IV, kalian sudah belajar berbagai macam bangun datar",
  ],
  ketukan: [
    k(
      "Asep dan Lukas membahas denah kompleks Candi Sewu. Kata Asep, candi kecil di sekeliling candi utama sama banyak di tiap sisi, jadi berbentuk persegi.",
      tambah(0, judul("denah kompleks Candi Sewu")),
      tambah("denah", kotak("dn", 40, 40, 110, 110, W.krem, W.coklat, { rx: 2 })),
      tambah("kecil", ...titikPinggir("dt")),
      tambah("utama", kotak("ut", 80, 80, 30, 30, W.batu, W.coklat, { rx: 2 }), teks("utt", 95, 99, "utama", 7, W.coklat)),
      tambah("tiap", teks("sm1", 225, 82, "tiap sisi", 9.4, W.ungu), teks("sm2", 225, 96, "sama banyak", 9.4, W.ungu)),
      tambah("persegi.", teks("pg", 225, 126, "Asep: persegi", 9.4, W.hijau)),
    ),
    k(
      "Lukas membaca keterangan: panjangnya seratus delapan puluh lima meter dan lebarnya seratus enam puluh lima meter. Karena tidak sama, menurut Lukas seharusnya persegi panjang.",
      bersih(0),
      tambah(0, judul("keterangan panjang dan lebar")),
      tambah("panjangnya", kotak("pj", 50, 44, 111, 99, W.krem, W.coklat, { rx: 2 }), teks("pjt", 105, 160, "185 m", 10, W.merah)),
      tambah("lebarnya", teks("lbt", 170, 98, "165 m", 10, W.merah, { anchor: "start" })),
      tambah("tidak", teks("tdk", 235, 70, "185 ≠ 165", 10, W.ungu)),
      tambah("persegi", teks("lk", 235, 100, "Lukas:", 9.4, W.hijau), teks("lk2", 235, 113, "persegi panjang", 9.4, W.hijau)),
    ),
    k(
      "Tiga pertanyaan menanti: pendapat siapa yang tepat, kapan segi empat menjadi persegi, dan bolehkah persegi disebut persegi panjang?",
      bersih(0),
      tambah(0, judul("tiga pertanyaan lanjutan")),
      tambah("pendapat", ...kartu("p1", 20, 40, 260, 34, W.krem, ["1. Pendapat siapa yang lebih tepat?"], 9)),
      tambah("kapan", ...kartu("p2", 20, 86, 260, 34, W.langit, ["2. Kapan segi empat menjadi persegi?"], 9)),
      tambah("bolehkah", ...kartu("p3", 20, 132, 260, 34, W.hijauMuda, ["3. Bolehkah persegi disebut persegi panjang?"], 8.6)),
    ),
    k(
      "Menurut Panduan Guru, jawabannya terkonfirmasi pada eksplorasi berikutnya, jadi kita simpan dulu untuk Subbab B.",
      bersih(0),
      tambah(0, judul("disimpan untuk Subbab B")),
      tambah("Panduan", emo("kunci", 150, 92, "🔒", 40)),
      tambah("jadi", ...kartu("sm", 50, 120, 200, 40, W.krem, ["dijawab di Subbab B"], 10)),
    ),
    k(
      "Peta konsep Bab 7: ciri-ciri bangun datar terdiri atas ciri-ciri segitiga dan ciri-ciri segi empat. Segitiga dibahas menurut sudutnya, jumlah sudut dalam segitiga, dan menurut panjang sisinya.",
      bersih(0),
      tambah("Peta", judul("Peta Konsep Bab 7")),
      tambah("bangun", ...kartu("pk0", 70, 26, 160, 22, W.krem, ["Ciri-Ciri Bangun Datar"], 9)),
      tambah("segitiga", garis("pl1", 110, 48, -40, 16, W.biru, 1.6), ...kartu("pk1", 10, 64, 120, 22, W.hijauMuda, ["Ciri-Ciri Segitiga"], 9)),
      tambah("empat.", garis("pl2", 190, 48, 40, 16, W.biru, 1.6), ...kartu("pk2", 170, 64, 120, 22, W.abu, ["Ciri-Ciri Segi Empat"], 9), teks("pkb", 230, 106, "dibahas di", 8.6, W.ungu), teks("pkc", 230, 118, "Subbab B", 8.6, W.ungu)),
      tambah("sudutnya,", garis("pv", 20, 86, 0, 81, W.biru, 1.6), garis("ph1", 20, 111, 10, 0, W.biru, 1.6), ...kartu("pk3", 30, 100, 160, 22, W.putih, ["menurut besar sudutnya"], 8.6)),
      tambah("jumlah", garis("ph2", 20, 139, 10, 0, W.biru, 1.6), ...kartu("pk4", 30, 128, 160, 22, W.putih, ["jumlah sudut dalam segitiga"], 8.6)),
      tambah("panjang", garis("ph3", 20, 167, 10, 0, W.biru, 1.6), ...kartu("pk5", 30, 156, 160, 22, W.putih, ["menurut panjang sisinya"], 8.6)),
    ),
    k(
      "Kata kunci memuat nama bangun datar dari kelas empat. Siswa harus mengenali segitiga lancip, siku-siku, tumpul, sama sisi, dan sama kaki.",
      bersih(0),
      tambah(0, judul("bekal awal sebelum belajar")),
      tambah("lancip,", ...kartu("bk1", 14, 40, 84, 26, W.hijauMuda, ["segitiga lancip"], 8.4)),
      tambah("siku-siku,", ...kartu("bk2", 108, 40, 84, 26, W.langit, ["siku-siku"], 8.4)),
      tambah("tumpul,", ...kartu("bk3", 202, 40, 84, 26, W.krem, ["tumpul"], 8.4)),
      tambah("sisi,", ...kartu("bk4", 61, 84, 84, 26, W.pink, ["sama sisi"], 8.4)),
      tambah("kaki.", ...kartu("bk5", 155, 84, 84, 26, W.jingga, ["sama kaki"], 8.4)),
    ),
  ],
};

/* ------------------------------ 3. Eksplorasi 7.1A: membuat segitiga dari sedotan (hlm. 196) ------------------------------ */
const KEPALA_SEDOTAN = ["No", "a", "b", "c", "Bisa?", "b+c", "a+c", "a+b"];
const KOL_SEDOTAN = [22, 22, 22, 22, 52, 34, 34, 34];
const BARIS_SEDOTAN = [KEPALA_SEDOTAN, ["1", "5", "6", "7", "bisa", "13", "12", "11"], ["2", "4", "6", "6", "...", "...", "...", "..."], ["3", "5", "4", "12", "...", "...", "...", "..."], ["4", "10", "5", "15", "...", "...", "...", "..."], ["5", "5", "12", "13", "...", "...", "...", "..."]];

export const ADEGAN_SEDOTAN: AdeganStory = {
  id: "ekspl-71a",
  judul: "Eksplorasi 7.1A: Ayo Membuat Segitiga",
  sumber: "Buku Siswa hlm. 196; Panduan Guru hlm. 294–295",
  latar: "#FEFCE8",
  kutipan: [
    "Eksplorasi 7.1A",
    "Ayo Membuat Segitiga",
    "segitiga adalah bangun",
    "datar yang dibatasi tiga sisi",
    "Apakah jika kita memiliki sembarang tiga ruas garis dengan panjang",
    "tertentu, maka pasti bisa membentuk segitiga?",
    "Ambillah tiga sedotan dengan",
    "Ikat kedua ujung tali",
    "Catatlah hasil percobaan kalian pada tabel berikut.",
    "Apakah Bisa",
  ],
  ketukan: [
    k(
      "Eksplorasi 7.1A, Ayo Membuat Segitiga. Pertanyaannya: jika punya sembarang tiga ruas garis, apakah pasti bisa membentuk segitiga?",
      tambah(0, judul("Eksplorasi 7.1A: Ayo Membuat Segitiga")),
      tambah("Segitiga", segitiga("sg", 100, 140, titikSisi(5, 6, 7, 14), W.jingga)),
      tambah("Pertanyaannya:", teks("qq", 150, 176, "3 ruas garis, pasti jadi segitiga?", 9.4, W.merah)),
    ),
    k(
      "Percobaannya memakai tali dan tiga sedotan berbeda panjang. Kedua ujung tali diikat sehingga membentuk segitiga.",
      bersih(0),
      tambah(0, judul("tali dan tiga sedotan")),
      tambah("Tiga", ...sedotanBaris()),
      tambah("diikat", garis("pa", 126, 70, 20, 0, W.hijau, 3, { gambar: true }), segitiga("sg2", 160, 110, titikSisi(5, 6, 7, 11), W.jingga)),
    ),
    k(
      "Hasil dicatat pada tabel: panjang a, b, c, bisa atau tidak, dan jumlah dua sisi. Nomor satu, lima, enam, tujuh, bisa; jumlahnya tiga belas, dua belas, sebelas.",
      bersih(0),
      tambah(0, judul("tabel hasil percobaan")),
      tambah("tabel:", ...tabel("tb", 29, 36, KOL_SEDOTAN, BARIS_SEDOTAN, 17, 8.2)),
      sorotkan("Nomor", ...idBaris("tb", 1, 8).filter((i) => i.includes("-t"))),
    ),
    k(
      "Kunci Panduan Guru: nomor dua, empat enam enam, bisa; jumlahnya dua belas, sepuluh, sepuluh. Nomor tiga, lima empat dua belas, tidak bisa; jumlahnya enam belas, tujuh belas, sembilan.",
      ubah(4, { id: "tb-t24", isi: "bisa" }, { id: "tb-t25", isi: "12" }, { id: "tb-t26", isi: "10" }, { id: "tb-t27", isi: "10" }),
      ubah("Nomor@2", { id: "tb-t34", isi: "tidak", warna: W.merah }, { id: "tb-t35", isi: "16" }, { id: "tb-t36", isi: "17" }, { id: "tb-t37", isi: "9" }),
    ),
    k(
      "Nomor empat: sepuluh, lima, lima belas: tidak bisa; jumlahnya dua puluh, dua puluh lima, lima belas. Nomor lima: lima, dua belas, tiga belas: bisa; jumlahnya dua puluh lima, delapan belas, tujuh belas.",
      ubah("empat:", { id: "tb-t44", isi: "tidak", warna: W.merah }, { id: "tb-t45", isi: "20" }, { id: "tb-t46", isi: "25" }, { id: "tb-t47", isi: "15" }),
      ubah("Nomor@2", { id: "tb-t54", isi: "bisa" }, { id: "tb-t55", isi: "25" }, { id: "tb-t56", isi: "18" }, { id: "tb-t57", isi: "17" }),
    ),
  ],
};

/** Tiga sedotan a, b, c (5, 6, 7 cm) bertumpuk di kiri atas, lengkap dengan huruf namanya. */
function sedotanBaris(): Obj[] {
  const data: [string, string, number, number, string][] = [
    ["s1", "a", 5, 36, W.jingga],
    ["s2", "b", 6, 54, W.langit],
    ["s3", "c", 7, 72, W.hijauMuda],
  ];
  return data.flatMap(([id, nama, cm, y, warna]) => [teks(`${id}-n`, 24, y + 8, nama, 9, W.biru), ...sedotan(id, 34, y, cm, warna, 10)]);
}
