import type { AdeganStory, Obj } from "./logika-story";
import { W, bulat, deretAngka, emo, judul, kartu, kelipatan, teks, tulisKelipatan } from "./k5b2b-gambar";
import { bersih, k, sorotkan, tambah, warnai } from "./k5b2b-bantu";

/* ------------------------------ 1. Pembuka metode luar ------------------------------ */
export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Empat metode dari luar untuk mencari KPK",
  sumber: "Metode luar: pembuka; contoh Buku Siswa hlm. 38–42",
  latar: "#FFF7ED",
  ketukan: [
    k(
      "Bagaimana cara mencari KPK dari dua bilangan? Guru di berbagai negara punya cara yang berbeda. Dalam video ini kita lihat empat metode dari luar.",
      tambah(0, judul("Empat metode dari luar")),
      tambah("Bagaimana", teks("pq", 150, 80, "KPK dari 4 dan 6 = ?", 20, W.merah)),
      tambah("berbeda.", emo("gl", 150, 140, "🌍", 36)),
    ),
    k(
      "Empat metode itu: Common Multiples List, LCM Concept, Prime Factor Preview, dan Meeting Cycle.",
      bersih(0),
      tambah(0, judul("Empat metode")),
      tambah("Common", ...kartu("m1", 20, 32, 260, 30, W.hijauMuda, ["1. Common Multiples List"], 9.4)),
      tambah("LCM", ...kartu("m2", 20, 70, 260, 30, W.langit, ["2. LCM Concept"], 9.4)),
      tambah("Prime", ...kartu("m3", 20, 108, 260, 30, W.krem, ["3. Prime Factor Preview"], 9.4)),
      tambah("Meeting", ...kartu("m4", 20, 146, 260, 30, W.pink, ["4. Meeting Cycle"], 9.4)),
    ),
    k(
      "Semua metode menjawab pertanyaan yang sama: berapa bilangan terkecil yang menjadi kelipatan dari semua bilangan itu? Bedanya hanya cara mencarinya.",
      bersih(0),
      tambah(0, judul("Satu pertanyaan yang sama")),
      tambah("berapa", ...kartu("q1", 30, 44, 240, 54, W.krem, ["bilangan terkecil yang menjadi", "kelipatan semua bilangan itu"], 10.4)),
      tambah("Bedanya", teks("q2", 150, 136, "cara mencarinya yang berbeda", 10.4, W.merah)),
    ),
    k(
      "Angka yang kita pakai dari buku: empat dan lima, enam dan delapan, tiga, empat, dan lima, serta jadwal renang Nisa, Yohana, Asep, dan Lukas.",
      bersih(0),
      tambah(0, judul("Angka dari buku")),
      tambah("empat", ...kartu("a1", 14, 34, 128, 40, W.hijauMuda, ["KPK 4 dan 5"], 9.4), ...kartu("a2", 158, 34, 128, 40, W.langit, ["KPK 6 dan 8"], 9.4)),
      tambah("tiga,", ...kartu("a3", 14, 88, 128, 40, W.krem, ["KPK 3, 4, dan 5"], 9.4)),
      tambah("jadwal", ...kartu("a4", 158, 88, 128, 40, W.pink, ["jadwal renang"], 9.4)),
      tambah("Nisa,", teks("a5", 150, 156, "Nisa, Yohana, Asep, dan Lukas", 9.4, W.coklat)),
    ),
  ],
};

/* ------------------------------ 2. Common Multiples List: konsep ------------------------------ */
export const ADEGAN_LUAR_DAFTAR: AdeganStory = {
  id: "luar-daftar",
  judul: "Common Multiples List: daftar kelipatan bersama",
  sumber: "Metode luar: Common Multiples List",
  latar: "#F0FDF4",
  ketukan: [
    k(
      "Metode pertama, Common Multiples List, artinya daftar kelipatan bersama. Tulis kelipatan tiap bilangan, lalu cari bilangan yang muncul di kedua daftar.",
      tambah(0, judul("Common Multiples List")),
      tambah("Tulis", teks("ka", 150, 58, tulisKelipatan(2, 9), 9, W.hijau), teks("kb", 150, 84, tulisKelipatan(3, 6), 9, W.coklat)),
      tambah("muncul", teks("kc", 150, 124, "cari yang ada di dua daftar", 10.4, W.merah)),
    ),
    k(
      "Daftar ditulis sampai ada bilangan yang sama. Bilangan sama itu adalah kelipatan persekutuan, dan yang pertama muncul adalah yang terkecil.",
      bersih(0),
      tambah(0, judul("Berhenti di kecocokan pertama")),
      tambah("Daftar", teks("kd", 150, 54, tulisKelipatan(2, 9), 9, W.hijau), teks("ke", 150, 78, tulisKelipatan(3, 6), 9, W.coklat)),
      tambah("sama", teks("kf", 150, 112, "yang sama: 6, 12, 18", 12, W.merah)),
      tambah("terkecil.", ...kartu("kg", 60, 130, 180, 40, W.hijauMuda, ["yang pertama = KPK", "KPK 2 dan 3 = 6"], 10)),
    ),
    k(
      "Kelebihannya, metode ini mudah dan terlihat jelas, cocok untuk bilangan kecil. Daftar yang rapi membuat kita yakin tidak ada yang terlewat.",
      bersih(0),
      tambah(0, judul("Kelebihan")),
      tambah("mudah", ...kartu("p1", 30, 44, 240, 40, W.hijauMuda, ["mudah dan terlihat jelas"], 10)),
      tambah("bilangan", ...kartu("p2", 30, 98, 240, 40, W.krem, ["cocok untuk bilangan kecil"], 10)),
      tambah("terlewat.", emo("p3", 150, 172, "✅", 28)),
    ),
    k(
      "Kekurangannya, untuk bilangan yang besar daftar menjadi sangat panjang dan melelahkan. Karena itu ada metode lain yang lebih ringkas.",
      bersih(0),
      tambah(0, judul("Kekurangan")),
      tambah("besar", ...kartu("w1", 30, 44, 240, 40, W.pink, ["bilangan besar: daftar panjang"], 10)),
      tambah("melelahkan.", emo("w2", 150, 126, "😓", 34)),
      tambah("ringkas.", teks("w3", 150, 178, "perlu cara yang lebih ringkas", 10, W.merah)),
    ),
  ],
};

/* ------------------------------ 3. Common Multiples List: penerapan (angka buku) ------------------------------ */
const K4 = kelipatan(4, 11);
const K5 = kelipatan(5, 9);
export const ADEGAN_LUAR_DAFTAR_TERAPAN: AdeganStory = {
  id: "luar-daftar-terapan",
  judul: "Daftar kelipatan bersama: angka dari buku",
  sumber: "Metode luar: Common Multiples List; Buku Siswa hlm. 40; Panduan Guru hlm. 60",
  latar: "#F0FDF4",
  ketukan: [
    k(
      "Terapkan pada empat dan lima dari buku. Daftar kelipatan empat dan lima kita tulis sampai empat puluh empat dan empat puluh lima.",
      tambah(0, judul("Daftar: empat dan lima")),
      tambah("empat", teks("d4", 150, 44, "kelipatan 4", 9, W.hijau), ...deretAngka("da", 18, 50, 24, 22, K4)),
      tambah("lima", teks("d5", 150, 100, "kelipatan 5", 9, W.coklat), ...deretAngka("db", 18, 106, 24, 22, K5)),
    ),
    k(
      "Bilangan yang muncul di kedua daftar adalah dua puluh dan empat puluh. Yang pertama dua puluh, jadi KPK empat dan lima adalah dua puluh.",
      warnai("dua", W.emas, "da-4", "da-9", "db-3", "db-7"),
      sorotkan("pertama", "da-4", "db-3"),
      tambah("Jadi", teks("dh", 150, 160, "KPK 4 dan 5 = 20", 18, W.biru)),
    ),
    k(
      "Sekarang enam dan delapan. Kelipatan enam: enam, dua belas, delapan belas, dua puluh empat. Kelipatan delapan: delapan, enam belas, dua puluh empat. Daftar berhenti di dua puluh empat.",
      bersih(0),
      tambah(0, judul("Daftar: enam dan delapan")),
      tambah("enam", teks("e6", 150, 44, "kelipatan 6", 9, W.hijau), ...deretAngka("ea", 60, 50, 45, 22, kelipatan(6, 4))),
      tambah("delapan", teks("e8", 150, 100, "kelipatan 8", 9, W.coklat), ...deretAngka("eb", 60, 106, 45, 22, kelipatan(8, 3))),
      warnai("berhenti", W.emas, "ea-3", "eb-2"),
      tambah("berhenti", teks("eh", 150, 160, "KPK 6 dan 8 = 24", 18, W.biru)),
    ),
    k(
      "Untuk lima dan tujuh, daftar harus sampai tiga puluh lima, sudah cukup panjang. Pada bilangan yang lebih besar, menulis daftar makin melelahkan.",
      bersih(0),
      tambah(0, judul("Daftar: lima dan tujuh")),
      tambah("lima", teks("f5", 150, 42, "kelipatan 5", 9, W.hijau), ...deretAngka("fa", 24, 48, 36, 22, kelipatan(5, 7), [35], W.emas)),
      tambah("tujuh,", teks("f7", 150, 96, "kelipatan 7", 9, W.coklat), ...deretAngka("fb", 24, 102, 36, 22, kelipatan(7, 5), [35], W.emas)),
      tambah("sampai", teks("fh", 150, 160, "KPK 5 dan 7 = 35", 18, W.biru)),
      tambah("melelahkan.", emo("fl", 150, 190, "😓", 20)),
    ),
  ],
};

/* ------------------------------ 4. LCM Concept: konsep irisan dua lingkaran ------------------------------ */
const lingkaranIrisan = (pre: string, y = 108): Obj[] => [
  bulat(`${pre}A`, 105, y, 58, W.hijauPita, W.hijau, { op: 0.55, tebal: 2 }),
  bulat(`${pre}B`, 195, y, 58, W.jingga, W.coklat, { op: 0.55, tebal: 2 }),
];

export const ADEGAN_LUAR_IRISAN: AdeganStory = {
  id: "luar-irisan",
  judul: "LCM Concept: KPK dari irisan",
  sumber: "Metode luar: LCM Concept",
  latar: "#EFF6FF",
  ketukan: [
    k(
      "Metode kedua, LCM Concept, KPK dari irisan. Bayangkan kelipatan dua dan kelipatan tiga sebagai dua lingkaran. Bagian yang beririsan memuat bilangan yang ada di kedua daftar.",
      tambah(0, judul("LCM Concept")),
      tambah("kelipatan", ...lingkaranIrisan("i"), teks("iLa", 76, 40, "kelipatan 2", 9, W.hijau)),
      tambah("tiga", teks("iRa", 224, 40, "kelipatan 3", 9, W.coklat)),
      tambah("irisan", teks("iL1", 92, 98, "2, 4, 8", 9.6, W.hitam), teks("iL2", 92, 116, "10, 14", 9.6, W.hitam), teks("iR1", 208, 98, "3, 9, 15", 9.6, W.hitam), teks("iR2", 208, 116, "21, 27", 9.6, W.hitam)),
    ),
    k(
      "Isi irisannya: enam, dua belas, delapan belas, dan seterusnya. Semuanya adalah kelipatan persekutuan dari dua dan tiga.",
      tambah("Isi", teks("iM1", 150, 92, "6", 10, W.merah), teks("iM2", 150, 108, "12", 10, W.merah), teks("iM3", 150, 124, "18", 10, W.merah)),
      sorotkan("Semuanya", "iM1", "iM2", "iM3"),
    ),
    k(
      "KPK adalah bilangan terkecil di dalam irisan, yaitu enam. Anggota irisan yang lain adalah kelipatan dari KPK itu: dua belas dua kali enam, delapan belas tiga kali enam.",
      bersih(0),
      tambah(0, judul("KPK = anggota terkecil irisan")),
      tambah("terkecil", teks("n1", 150, 64, "KPK 2 dan 3 = 6", 18, W.biru)),
      tambah("dua@2", teks("n2", 150, 108, "12 = 2 × 6", 16, W.hitam)),
      tambah("delapan", teks("n3", 150, 140, "18 = 3 × 6", 16, W.hitam)),
    ),
    k(
      "Jadi, mengetahui KPK berarti mengetahui semua kelipatan persekutuan. Tinggal kalikan KPK dengan satu, dua, tiga, dan seterusnya.",
      bersih(0),
      tambah(0, judul("Semua kelipatan persekutuan")),
      tambah("KPK", ...kartu("o1", 40, 44, 220, 40, W.hijauMuda, ["kelipatan persekutuan", "= KPK × 1, KPK × 2, KPK × 3, ..."], 9.6)),
      tambah("kalikan", teks("o2", 150, 128, "6 × 1 = 6", 14, W.hitam), teks("o3", 150, 150, "6 × 2 = 12", 14, W.hitam), teks("o4", 150, 172, "6 × 3 = 18", 14, W.hitam)),
    ),
  ],
};

/* ------------------------------ 5. LCM Concept: penerapan (4 dan 5, angka buku) ------------------------------ */
export const ADEGAN_LUAR_IRISAN_TERAPAN: AdeganStory = {
  id: "luar-irisan-terapan",
  judul: "Irisan kelipatan: angka dari buku",
  sumber: "Metode luar: LCM Concept; Buku Siswa hlm. 40",
  latar: "#EFF6FF",
  ketukan: [
    k(
      "Terapkan pada empat dan lima dari buku. Lingkaran kiri memuat kelipatan empat, lingkaran kanan memuat kelipatan lima.",
      tambah(0, judul("Irisan: empat dan lima")),
      tambah("empat", ...lingkaranIrisan("j"), teks("jLa", 76, 40, "kelipatan 4", 9, W.hijau)),
      tambah("kanan", teks("jRa", 224, 40, "kelipatan 5", 9, W.coklat)),
    ),
    k(
      "Kelipatan empat yang bukan kelipatan lima ditaruh di kiri, dan kelipatan lima yang bukan kelipatan empat di kanan.",
      tambah("Kelipatan", teks("jL1", 92, 98, "4, 8, 12", 9.6, W.hitam), teks("jL2", 92, 116, "16, 24", 9.6, W.hitam)),
      tambah("kanan", teks("jR1", 208, 98, "5, 10, 15", 9.6, W.hitam), teks("jR2", 208, 116, "25, 30", 9.6, W.hitam)),
    ),
    k(
      "Di tengah hanya ada dua puluh dan empat puluh, pada daftar buku sampai empat puluh lima. Yang terkecil dua puluh, jadi KPK empat dan lima adalah dua puluh.",
      tambah("tengah", teks("jM1", 150, 98, "20", 10, W.merah), teks("jM2", 150, 116, "40", 10, W.merah)),
      sorotkan("terkecil", "jM1"),
      tambah("Jadi", teks("jh", 150, 188, "KPK 4 dan 5 = 20", 14, W.biru)),
    ),
    k(
      "Kalau diteruskan, isi irisan berikutnya enam puluh, delapan puluh, dan seratus, semuanya kelipatan dua puluh.",
      bersih(0),
      tambah(0, judul("Irisan diteruskan")),
      tambah("diteruskan,", teks("u1", 150, 70, "20, 40, 60, 80, 100, ...", 15, W.merah)),
      tambah("semuanya", teks("u2", 150, 112, "40 = 2 × 20", 14, W.hitam), teks("u3", 150, 138, "60 = 3 × 20", 14, W.hitam), teks("u4", 150, 164, "80 = 4 × 20", 14, W.hitam)),
    ),
  ],
};
