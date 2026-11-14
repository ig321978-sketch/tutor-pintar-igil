import type { AdeganStory, Obj } from "./logika-story";
import { RUBRIK_PROYEK, W, baris, busurDerajat, busurSudut, bulat, emo, garis, jalur, kartu, panah, sinar, sudut, teks, titikSudut, ujung } from "./k5b6d-gambar";
import { bersih, hapus, k, tambah, ubah } from "./k5b6d-bantu";

const jud = (isi: string, y = 20, u = 12): Obj => teks("jud", 150, y, isi, u, W.ungu);
const ids = (a: Obj[]): string[] => a.map((o) => o.id);

/* ------------------------------ 5 dan 6. Ayo Berlatih 1 dan 2 (hlm. 185; Panduan Guru hlm. 271–273) ------------------------------ */
type Lat = { h: string; derajat: number; vx: number; vy: number; kaki: number; kedua: number; p: number; jenis: string };
/** Lima gambar Ayo Berlatih 1: letak titik sudut dan arah kaki mengikuti gambar di Buku Siswa hlm. 185. */
export const LATIHAN: Lat[] = [
  { h: "a", derajat: 30, vx: 80, vy: 130, kaki: 0, kedua: 30, p: 120, jenis: "lancip" },
  { h: "b", derajat: 75, vx: 200, vy: 120, kaki: 166, kedua: 91, p: 80, jenis: "lancip" },
  { h: "c", derajat: 110, vx: 190, vy: 130, kaki: 200, kedua: 90, p: 75, jenis: "tumpul" },
  { h: "d", derajat: 52, vx: 200, vy: 70, kaki: 232, kedua: 180, p: 85, jenis: "lancip" },
  { h: "e", derajat: 140, vx: 160, vy: 110, kaki: 270, kedua: 130, p: 70, jenis: "tumpul" },
];
const kakiLat = (l: Lat): Obj[] => [titikSudut("v", l.vx, l.vy, W.biru, 3.2, { z: 5 }), sinar("r1", l.vx, l.vy, l.kaki, l.p, W.biru, 2.4, { z: 5, gambar: true })];
const tandaiLat = (l: Lat): Obj => {
  const [x, y] = ujung(l.vx, l.vy, l.kedua, l.p);
  return bulat("td", x, y, 3.2, W.merah, undefined, { z: 7 });
};
const keduaLat = (l: Lat): Obj[] => [sinar("r2", l.vx, l.vy, l.kedua, l.p, W.biru, 2.4, { z: 5, gambar: true }), busurSudut("ar", l.vx, l.vy, Math.min(l.kaki, l.kedua), Math.max(l.kaki, l.kedua), 18, W.merah, 1.8, { z: 6 })];
const labelLat = (l: Lat): Obj[] => {
  const mid = (l.kaki + l.kedua) / 2;
  const [x, y] = ujung(l.vx, l.vy, mid, 34);
  return [teks("rL", x, y + 3, `${l.derajat}°`, 10, W.merah)];
};
const jenisLat = (l: Lat): Obj => teks("jn", 150, 196, `sudut ${l.jenis}`, 9, l.jenis === "lancip" ? W.hijau : W.merah);

const lat = (h: string): Lat => LATIHAN.find((l) => l.h === h) as Lat;

export const ADEGAN_BERLATIH_1: AdeganStory = {
  id: "berlatih-1",
  judul: "Ayo Berlatih 1: gambar a, b, dan c",
  sumber: "Buku Siswa hlm. 185; Buku Panduan Guru hlm. 271–273",
  latar: "#F0FDF4",
  kutipan: ["Ayo Berlatih", "Salin gambar titik sudut dan kaki sudut berikut di buku kalian", "kemudian gambarlah sudut sesuai dengan ukuran yang diminta", "Peserta didik mungkin akan ada yang beranggapan bahwa saat melukis", "salah satu kaki sudutnya harus selalu mendatar", "Bagian ini menyajikan berbagai posisi kaki sudut yang tidak selalu mendatar"],
  ketukan: [
    k(
      "Ayo Berlatih nomor 1: salin titik sudut dan kaki sudut ke bukumu, lalu gambarlah sudut sesuai ukuran yang diminta. Ada lima gambar, a sampai e.",
      tambah(0, jud("Ayo Berlatih 1")),
      tambah("a", LATIHAN.flatMap((l, i) => baris(`ch${l.h}`, 24, 38 + i * 28, 110, `${l.h}.  ${l.derajat}°`, W.krem, 10, 22))),
      tambah("sampai", panah("pn", 140, 100, 28, 0, W.ungu, 2), kartu("ps", 172, 62, 112, 76, W.muda, ["salin titik sudut", "dan kaki sudut,", "lalu gambar"], 8.2)),
    ),
    k(
      "Gambar a, sudut 30 derajat. Kaki sudut mendatar ke kanan. Letakkan busur, tandai angka 30, lalu hubungkan. Hasilnya sudut lancip.",
      bersih(0),
      tambah(0, jud("Ayo Berlatih 1a: 30°")),
      tambah("Kaki", kakiLat(lat("a"))),
      tambah("tandai", tandaiLat(lat("a"))),
      tambah("hubungkan.", keduaLat(lat("a")), labelLat(lat("a"))),
      tambah("lancip.", jenisLat(lat("a"))),
    ),
    k(
      "Gambar b, sudut 75 derajat. Kali ini kaki sudut miring dan titik sudutnya di ujung kanan. Putar busurmu agar dasarnya berimpit dengan kaki, tandai angka 75, lalu hubungkan.",
      bersih(0),
      tambah(0, jud("Ayo Berlatih 1b: 75°")),
      tambah("miring", kakiLat(lat("b"))),
      tambah("tandai", tandaiLat(lat("b"))),
      tambah("hubungkan.", keduaLat(lat("b")), labelLat(lat("b")), jenisLat(lat("b"))),
    ),
    k(
      "Gambar c, sudut 110 derajat. Kaki sudut miring ke kiri bawah. Dasar busur tetap berimpit dengan kaki sudut, dan hitungan dimulai dari nol di kaki itu.",
      bersih(0),
      tambah(0, jud("Ayo Berlatih 1c: 110°")),
      tambah("miring", kakiLat(lat("c"))),
      tambah("nol", tandaiLat(lat("c"))),
      tambah("itu.", keduaLat(lat("c")), labelLat(lat("c")), jenisLat(lat("c"))),
    ),
  ],
};

const SOAL2: Array<{ id: string; derajat: number; vx: number; vy: number; kaki: number; kedua: number; p: number }> = [
  { id: "q0", derajat: 45, vx: 30, vy: 100, kaki: 0, kedua: 45, p: 56 },
  { id: "q1", derajat: 83, vx: 235, vy: 100, kaki: 170, kedua: 87, p: 52 },
  { id: "q2", derajat: 112, vx: 40, vy: 175, kaki: 20, kedua: 132, p: 50 },
  { id: "q3", derajat: 165, vx: 240, vy: 160, kaki: 345, kedua: 180, p: 50 },
];
/** Empat sudut contoh Soal 2: kaki sudut sengaja tidak selalu mendatar (Panduan Guru hlm. 273). */
export const CONTOH_SOAL2 = SOAL2;
const gambarSoal2 = (i: number): Obj[] => {
  const s = SOAL2[i];
  const [x, y] = ujung(s.vx, s.vy, (s.kaki + s.kedua) / 2, 30);
  return [...sudut(s.id, s.vx, s.vy, s.kaki, s.kedua, s.p, 14), teks(`${s.id}L`, x, y + 3, `${s.derajat}°`, 9.4, W.merah)];
};

export const ADEGAN_BERLATIH_2: AdeganStory = {
  id: "berlatih-2",
  judul: "Ayo Berlatih 1d, 1e, dan Soal 2: kaki sudut tidak selalu mendatar",
  sumber: "Buku Siswa hlm. 185; Buku Panduan Guru hlm. 271–273",
  latar: "#ECFEFF",
  kutipan: ["Gambarlah sudut dengan ukuran berikut", "Bentuk dan arah sudut bebas, asalkan ukurannya sesuai", "Pastikan peserta didik membuat sudut dengan berbagai variasi kaki sudut", "Sebaiknya kaki sudut tidak selalu mendatar", "Guru berlaku sebagai fasilitator", "berkeliling untuk melihat langsung perkembangan"],
  ketukan: [
    k(
      "Gambar d: sudut 52 derajat dari kaki yang miring ke kiri bawah. Hasilnya sudut lancip, dan kaki kedua tepat mendatar.",
      tambah(0, jud("Ayo Berlatih 1d: 52°")),
      tambah("kaki", kakiLat(lat("d"))),
      tambah("tepat", tandaiLat(lat("d")), keduaLat(lat("d")), labelLat(lat("d"))),
      tambah("lancip,", jenisLat(lat("d"))),
    ),
    k(
      "Gambar e: sudut 140 derajat. Kaki sudut tegak lurus ke bawah. Hasilnya sudut tumpul yang lebar.",
      bersih(0),
      tambah(0, jud("Ayo Berlatih 1e: 140°")),
      tambah("Kaki", kakiLat(lat("e"))),
      tambah("Hasilnya", tandaiLat(lat("e")), keduaLat(lat("e")), labelLat(lat("e"))),
      tambah("tumpul", jenisLat(lat("e"))),
    ),
    k(
      "Soal 2: gambarlah sudut 45, 83, 112, dan 165 derajat. Bentuk dan arah sudut bebas, asalkan ukurannya sesuai.",
      bersih(0),
      tambah(0, jud("Ayo Berlatih 2")),
      tambah("45,", baris("s0", 50, 40, 200, "a.  45°", W.krem, 11, 26)),
      tambah("83,", baris("s1", 50, 74, 200, "b.  83°", W.krem, 11, 26)),
      tambah("112,", baris("s2", 50, 108, 200, "c.  112°", W.krem, 11, 26)),
      tambah("165", baris("s3", 50, 142, 200, "d.  165°", W.krem, 11, 26)),
      tambah("bebas,", teks("bb", 150, 190, "arah kaki bebas", 9, W.ungu)),
    ),
    k(
      "Buatlah sudutnya bervariasi, karena kaki sudut sebaiknya tidak selalu mendatar. Sudut 45 dan 83 derajat lancip, sedangkan 112 dan 165 derajat tumpul.",
      bersih(0),
      tambah(0, jud("Kaki tidak selalu mendatar", 20, 11)),
      tambah("bervariasi,", gambarSoal2(0)),
      tambah("mendatar.", gambarSoal2(1)),
      tambah("lancip,", gambarSoal2(2)),
      tambah("tumpul.", gambarSoal2(3)),
    ),
  ],
};

/* ------------------------------ 7. Miskonsepsi melukis sudut (Panduan Guru hlm. 274–275) ------------------------------ */
const MX = 100;
const MY = 150;
const MR = 80;
const bdM = (dua: boolean): Obj[] => busurDerajat("bd", MX, MY, MR, "kanan", dua, { z: 1 });
const kakiM = (): Obj[] => [titikSudut("v", MX, MY, W.biru, 3.2, { z: 5 }), sinar("r1", MX, MY, 0, MR, W.biru, 2.4, { z: 5 })];

export const ADEGAN_MISKONSEPSI: AdeganStory = {
  id: "miskonsepsi-d",
  judul: "Miskonsepsi melukis sudut dan diferensiasi",
  sumber: "Buku Panduan Guru hlm. 274–275",
  latar: "#FFF1F2",
  kutipan: ["Beberapa kesalahan yang mungkin dilakukan peserta didik saat melukis sudut", "Peserta didik salah arah membaca skala pada busur", "menggambar sudut 120", "Sudut yang terbentuk bukan 120", "Apakah kalian yakin sudut kalian berukuran 120", "Sudut 120o termasuk sudut tumpul atau lancip", "selalu menunjukkan skala 0", "meyakini bahwa salah satu kaki sudut harus selalu mendatar", "Bagi peserta didik dengan kecepatan belajar tinggi"],
  ketukan: [
    k(
      "Panduan Guru mencatat dua kesalahan saat melukis sudut. Pertama, siswa salah membaca arah skala pada busur derajat.",
      tambah(0, jud("Dua kesalahan yang sering muncul", 22, 11)),
      tambah("Pertama,", kartu("m1", 30, 50, 240, 44, W.merahMuda, ["1. salah membaca arah skala", "pada busur derajat"], 8.8)),
      tambah("busur", emo("mb", 150, 140, "📐", 40)),
    ),
    k(
      "Misalnya melukis sudut 120 derajat. Siswa membaca skala dalam yang dimulai dari nol di sisi lain, sehingga titiknya salah tempat.",
      bersih(0),
      tambah(0, jud("Ingin melukis 120°")),
      tambah(0, kakiM(), bdM(true)),
      tambah("skala", teks("sk1", 240, 70, "skala dalam: 0 di kiri", 7.8, W.merah)),
      tambah("titiknya", bulat("td", ...ujung(MX, MY, 60, MR - 2), 3.4, W.merah, undefined, { z: 7 }), teks("t120", 160, 90, "120", 9, W.merah, { z: 7 })),
    ),
    k(
      "Hasilnya, sudut yang terbentuk bukan 120 derajat, tetapi justru 60 derajat.",
      hapus(0, ids(bdM(true))),
      tambah("sudut", sinar("r2", MX, MY, 60, MR, W.merah, 2.4, { z: 5, gambar: true }), busurSudut("ar", MX, MY, 0, 60, 24, W.merah, 1.8, { z: 6 })),
      tambah("justru", teks("rL", 133, 130, "60°", 11, W.merah), teks("sa", 240, 100, "bukan 120°", 9, W.merah)),
    ),
    k(
      "Guru bertanya: yakinkah sudutmu 120 derajat? Sudut 120 itu lancip atau tumpul? Gambarmu termasuk jenis apa? Jadi, sudah benar atau belum?",
      hapus(0, "sa", "t120", "td", "sk1"),
      tambah("yakinkah", baris("q1", 176, 44, 118, "yakin 120°?", W.krem, 8)),
      tambah("Sudut@2", baris("q2", 176, 66, 118, "120° lancip atau tumpul?", W.krem, 7.4)),
      tambah("gambar", baris("q3", 176, 88, 118, "gambarmu jenis apa?", W.krem, 7.8)),
      tambah("Jadi", baris("q4", 176, 110, 118, "✗ gambarmu belum benar", W.merahMuda, 7.4)),
    ),
    k(
      "Penguatannya: kaki sudut yang berimpit dengan dasar busur selalu menunjukkan skala nol derajat. Hitungan dimulai dari kaki itu, sehingga sudut 120 derajat tampak lebar.",
      hapus(0, ids(baris("q1", 0, 0, 0, "", W.krem)), ids(baris("q2", 0, 0, 0, "", W.krem)), ids(baris("q3", 0, 0, 0, "", W.krem)), ids(baris("q4", 0, 0, 0, "", W.krem)), "r2", "ar", "rL"),
      tambah("kaki", bdM(false)),
      tambah("nol", teks("n0", 120, 168, "mulai dari 0", 8.2, W.merah, { z: 7 })),
      tambah("sehingga", sinar("r2", MX, MY, 120, MR, W.hijau, 2.6, { z: 5, gambar: true }), busurSudut("ar", MX, MY, 0, 120, 24, W.hijau, 1.8, { z: 6 })),
      tambah("lebar.", teks("rL", 117, 118, "120°", 10, W.hijau), baris("ok", 192, 72, 96, "✓ sudut tumpul", W.hijauMuda, 7.8)),
    ),
    k(
      "Kesalahan kedua: siswa meyakini salah satu kaki sudut harus mendatar. Karena itu, Ayo Berlatih menyajikan posisi kaki sudut yang tidak selalu mendatar.",
      bersih(0),
      tambah(0, jud("Kesalahan kedua", 22, 11)),
      tambah("harus", kartu("m2", 40, 40, 220, 34, W.merahMuda, ["✗ kaki sudut harus mendatar"], 8.8)),
      tambah("Ayo", sudut("w1", 60, 150, 0, 40, 48, 12), sudut("w2", 150, 150, 70, 160, 48, 12), sudut("w3", 240, 150, 200, 300, 48, 12)),
    ),
    k(
      "Untuk diferensiasi, siswa yang cepat belajar mengerjakan latihan tanpa bantuan, sementara guru mendampingi siswa yang mengalami kesulitan.",
      bersih(0),
      tambah(0, jud("Diferensiasi")),
      tambah("cepat", kartu("d1", 20, 44, 120, 90, W.hijauMuda, ["cepat belajar", "latihan tanpa", "bantuan"], 8.8), emo("de1", 80, 160, "🚀", 24)),
      tambah("mendampingi", kartu("d2", 160, 44, 120, 90, W.krem, ["kesulitan", "didampingi", "oleh guru"], 8.8), emo("de2", 220, 160, "🤝", 24)),
    ),
  ],
};

/* ------------------------------ 8. Proyek Kelompok: Menjadi Ahli Tata Kota (hlm. 186–187; Panduan Guru hlm. 274) ------------------------------ */
const jalan = (id: string, x: number, y: number, x2: number, y2: number): Obj => garis(id, x, y, x2 - x, y2 - y, "#4B5563", 7);
const DENAH: Obj[] = [
  { id: "dn", t: "kotak", x: 24, y: 34, w: 252, h: 150, warna: W.hijauMuda, garis: W.biru, rx: 4, tebal: 1.4 },
  jalan("dj1", 24, 84, 276, 84),
  jalan("dj2", 100, 34, 100, 184),
  jalan("dj3", 190, 34, 123, 150),
  jalan("dj4", 24, 150, 276, 150),
];
const DENAH_LABEL: Obj[] = [
  teks("dl90", 114, 100, "90°", 8, W.merah, { z: 3 }),
  teks("dl60", 176, 80, "60°", 8, W.merah, { z: 3 }),
  teks("dl120", 150, 78, "120°", 8, W.merah, { z: 3 }),
  teks("dlt", 240, 118, "taman", 8.4, W.hijau),
  teks("dlt2", 62, 118, "sekolah", 8.4, W.biru),
];

export const ADEGAN_PROYEK: AdeganStory = {
  id: "proyek-tata-kota",
  judul: "Proyek Kelompok: menjadi ahli tata kota",
  sumber: "Buku Siswa hlm. 186–187; Buku Panduan Guru hlm. 274",
  latar: "#F5F3FF",
  kutipan: ["Proyek Kelompok: Menjadi Ahli Tata Kota", "Kegiatan ini dilakukan secara berkelompok", "Kertas gambar", "Penggaris", "Busur derajat", "Pensil warna/spidol/krayon", "Memuat fasilitas umum yang penting", "Menggunakan semua jenis sudut yang pernah dipelajari", "Mencantumkan ukuran sudut pada rancangan kalian", "Membuat desain sekreatif mungkin", "DENAH KOTA PERMAI INDAH", "Ketepatan ukuran sudut yang digunakan", "Kelengkapan fasilitas umum yang dicantumkan", "Kerja sama dalam kelompok", "Kreativitas desain tata kota", "Rubrik penilaian proyek kelompok adalah sebagai berikut"],
  ketukan: [
    k(
      "Proyek kelompok: menjadi ahli tata kota. Kelompok beranggotakan tiga sampai empat anak, dan proyek boleh dikerjakan pada jam pelajaran atau di luar jam pelajaran.",
      tambah(0, jud("Menjadi Ahli Tata Kota")),
      tambah("Proyek", emo("pk", 150, 100, "🏙️", 44)),
      tambah("tiga", teks("pa", 150, 140, "kelompok 3 sampai 4 anak", 9.6, W.ungu)),
    ),
    k(
      "Alat dan bahannya: kertas gambar, penggaris, busur derajat, serta pensil warna, spidol, atau krayon.",
      bersih(0),
      tambah(0, jud("Alat dan bahan")),
      tambah("kertas", emo("b1", 50, 90, "📄", 30), teks("b1t", 50, 112, "kertas gambar", 7.8)),
      tambah("penggaris,", emo("b2", 120, 90, "📏", 30), teks("b2t", 120, 112, "penggaris", 7.8)),
      tambah("busur", emo("b3", 190, 90, "📐", 30), teks("b3t", 190, 112, "busur derajat", 7.8)),
      tambah("pensil", emo("b4", 255, 90, "🖍️", 30), teks("b4t", 255, 112, "pensil warna", 7.8)),
    ),
    k(
      "Rencana kota impian memuat fasilitas umum yang penting dan memakai semua jenis sudut yang pernah dipelajari: lancip, siku-siku, dan tumpul.",
      bersih(0),
      tambah(0, jud("Isi rancangan kota")),
      tambah("fasilitas", kartu("f1", 30, 36, 240, 34, W.krem, ["fasilitas umum yang penting"], 9)),
      tambah("lancip,", sudut("g1", 40, 140, 0, 45, 50, 12), teks("g1t", 62, 164, "lancip", 8.4, W.hijau)),
      tambah("siku-siku,", sudut("g2", 130, 140, 0, 90, 50, 12), teks("g2t", 152, 164, "siku-siku", 8.4)),
      tambah("tumpul.", sudut("g3", 225, 140, 0, 130, 50, 12), teks("g3t", 250, 164, "tumpul", 8.4, W.merah)),
    ),
    k(
      "Rancangan juga mencantumkan ukuran sudut dan dibuat sekreatif mungkin, berbeda dari contoh. Contohnya Denah Kota Permai Indah, yang memuat sudut bertanda 60, 90, dan 120 derajat.",
      bersih(0),
      tambah(0, jud("Denah Kota Permai Indah", 20, 11)),
      tambah("Denah", DENAH),
      tambah("60,", DENAH_LABEL),
    ),
    k(
      "Rubrik penilaian proyek: ketepatan ukuran sudut bobotnya 30 persen, kelengkapan fasilitas umum 20 persen, kerja sama kelompok 15 persen, dan kreativitas desain 35 persen.",
      bersih(0),
      tambah(0, jud("Rubrik penilaian proyek", 20, 11)),
      ...RUBRIK_PROYEK.map((r, i) => tambah(["30", "20", "15", "35"][i] + "@1", [
        baris(`rb${i}`, 20, 40 + i * 36, 260, r.nama, W.putih, 8.6, 28),
        jalur(`rbb${i}`, 20, 64 + i * 36, `M0 0 L${r.bobot * 2.6} 0`, "none", W.ungu, { tebal: 3 }),
        teks(`rbp${i}`, 276, 58 + i * 36, `${r.bobot}%`, 9.6, W.ungu, { anchor: "end" }),
      ].flat())),
    ),
    k(
      "Jumlah seluruh bobot 100 persen. Guru memberi arahan agar siswa mengikuti alur kerja yang sudah ditulis di buku.",
      ubah("Jumlah", { id: "jud", isi: "Jumlah bobot" }),
      tambah("Jumlah", teks("tot", 150, 196, "total 100%", 11, W.merah)),
      tambah("alur", emo("ar", 262, 28, "✅", 16)),
    ),
  ],
};
