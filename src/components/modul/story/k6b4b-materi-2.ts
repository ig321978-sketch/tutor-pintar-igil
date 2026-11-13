import type { AdeganStory } from "./logika-story";
import { W, bulat, emo, garis, jalur, kotak, panah, roda, sektor, teks } from "./k6b4a-gambar"
import { bersih, k, sorotkan, tambah } from "./k6b4a-bantu"
import { WARNA_PERMEN, daduTitik, koin, permen } from "./k6b4b-gambar";

/* ------------------------------ 4. Contoh permainan kurang adil (hlm. 119) ------------------------------ */
const RODA_LUAS = ["#EF4444", "#EF4444", "#EF4444", "#EF4444", "#EF4444", "#FACC15", "#FACC15", "#FACC15"];
const RODA_SEMPIT = ["#EF4444", "#EF4444", "#FACC15", "#FACC15", "#FACC15", "#FACC15", "#FACC15", "#FACC15"];
const RODA_SAMA = ["#EF4444", "#EF4444", "#EF4444", "#EF4444", "#FACC15", "#FACC15", "#FACC15", "#FACC15"];

export const ADEGAN_KURANG_ADIL: AdeganStory = {
  id: "contoh-kurang-adil",
  judul: "Dua contoh permainan kurang adil",
  sumber: "Buku Siswa hlm. 119",
  latar: "#FFF4E5",
  kutipan: ["Contoh permainan kurang adil", "mendapatkan angka 6 di salah satu dadu", "panah menunjuk ke area warna merah"],
  ketukan: [
    k(
      "Contoh pertama: Pemain 1 memakai satu dadu, Pemain 2 memakai dua dadu. Syarat menang keduanya: mendapatkan angka 6 di salah satu dadu.",
      tambah(0, teks("jud", 150, 24, "Contoh pertama", 11, W.ungu)),
      tambah("Pemain", emo("p1", 70, 70, "🧒", 30), teks("p1n", 70, 90, "Pemain 1", 9)),
      tambah("satu", ...daduTitik("a1", 70, 130, 6, 40)),
      tambah("2", emo("p2", 220, 70, "🧒", 30), teks("p2n", 220, 90, "Pemain 2", 9)),
      tambah("dua", ...daduTitik("b1", 190, 130, 6, 40), ...daduTitik("b2", 250, 130, 6, 40)),
      tambah("Syarat", teks("sy", 150, 186, "syarat menang: angka 6 di salah satu dadu", 9, W.merah)),
    ),
    k("Pemain 2 punya kemungkinan menang lebih besar, karena ada dua dadu yang bisa memunculkan angka 6.", tambah("lebih", emo("mahkota", 220, 52, "👑", 22)), sorotkan("dua", "b1-k", "b2-k"), tambah("memunculkan", panah("pa", 190, 168, 0, -6, W.hijau, 3, { gambar: true }), panah("pb", 250, 168, 0, -6, W.hijau, 3, { gambar: true })), tambah("angka", teks("dm", 220, 200, "dua kesempatan mendapat 6", 8.5, W.hijau))),
    k(
      "Contoh kedua: dua roda putar, A dan B. Syarat menang: panah menunjuk ke area warna merah.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Contoh kedua", 11, W.ungu)),
      tambah("roda", roda("ra", 80, 100, 50, RODA_LUAS), teks("rat", 80, 168, "Roda A", 10), panah("pa", 80, 34, 0, 16, W.biru, 3, { gambar: true })),
      tambah("A", roda("rb", 220, 100, 50, RODA_SEMPIT), teks("rbt", 220, 168, "Roda B", 10), panah("pb", 220, 34, 0, 16, W.biru, 3, { gambar: true })),
      tambah("merah.", kotak("sm", 100, 180, 100, 20, W.putih, W.merah, { rx: 8 }), teks("smt", 150, 194, "menang bila panah di merah", 7.4, W.merah)),
    ),
    k("Pemain 1, yang memakai roda A, punya kemungkinan menang lebih besar, karena area merah roda A lebih luas daripada roda B.", tambah("Pemain", emo("mahkota", 80, 30, "👑", 18)), sorotkan("luas", ...[0, 1, 2, 3, 4].map((i) => `ra-j${i}`)), tambah("luas", teks("lw", 150, 120, ">", 26, W.hijau), teks("lw2", 150, 142, "merah A lebih luas", 7.5, W.hijau))),
    k("Jadi, permainan menjadi kurang adil bila ada pemain yang punya lebih banyak cara untuk menang, atau area menang yang lebih luas.", bersih(0), tambah("lebih", kotak("c1", 14, 50, 126, 100, W.putih, W.merah, { rx: 12 }), teks("c1t", 77, 90, "lebih banyak", 11, W.merah), teks("c1u", 77, 106, "cara menang", 11, W.merah)), tambah("atau", kotak("c2", 160, 50, 126, 100, W.putih, W.merah, { rx: 12 }), teks("c2t", 223, 90, "area menang", 11, W.merah), teks("c2u", 223, 106, "lebih luas", 11, W.merah)), tambah("adil", emo("awas", 150, 30, "⚠️", 22))),
    k("Untuk membuatnya adil, samakan peluang menang tiap pemain, misalnya kedua roda diberi area merah yang sama luas.", bersih(0), tambah(0, teks("jud", 150, 24, "Cara membuatnya adil", 11, W.hijau)), tambah("kedua", roda("ra", 80, 100, 50, RODA_SAMA), roda("rb", 220, 100, 50, RODA_SAMA)), tambah("sama", teks("sm", 150, 106, "=", 28, W.hijau), emo("ok", 150, 170, "⚖️", 26))),
  ],
};

/* ------------------------------ 5. Latihan 4.2 (hlm. 119 dan 120) ------------------------------ */
const CALON = [
  ["Reimon", 0, 70, "#93C5FD"],
  ["Abdillah", 70, 130, "#FDE68A"],
  ["Tuti", 130, 180, "#FBCFE8"],
  ["Maryam", 180, 360, "#BBF7D0"],
] as const;
const RODA_KETUA = CALON.map(([, a, b, w], i) => jalur(`rk-j${i}`, 100, 112, sektor(56, a, b), w, W.biru, { tebal: 1.8 }));
const RODA_ADIL = CALON.map(([, , , w], i) => jalur(`ra-j${i}`, 100, 112, sektor(56, i * 90, (i + 1) * 90), w, W.biru, { tebal: 1.8 }));

export const ADEGAN_LATIHAN42: AdeganStory = {
  id: "latihan-42",
  judul: "Latihan 4.2: koin, roda ketua kelas, dan skenario",
  sumber: "Buku Siswa hlm. 119–120; Buku Panduan Guru hlm. 127–128",
  latar: "#F0F9FF",
  kutipan: ["Latihan 4.2", "koin 500 rupiah", "pemilihan ketua kelas"],
  ketukan: [
    k("Latihan 4.2 nomor 1: koin 500 rupiah. Peluang mendapatkan sisi garuda adalah 1 dari 2 jumlah kemungkinan yang ada.", tambah(0, teks("jud", 150, 24, "Latihan 4.2: koin 500 rupiah", 11, W.ungu)), tambah("garuda", ...koin("g", 90, 90, "G", 30), teks("gt", 90, 134, "sisi garuda", 9)), tambah("1", teks("e", 210, 96, "1 dari 2", 20, W.merah, { garis: W.emas }))),
    k("Peluang mendapatkan sisi angka juga 1 dari 2. Jadi peluang sisi angka dan sisi garuda sama.", tambah("angka", ...koin("a", 210, 150, "A", 22), teks("at", 210, 184, "sisi angka", 9)), tambah("sama.", teks("eq", 150, 156, "=", 28, W.hijau), teks("sm", 150, 196, "sama", 10, W.hijau))),
    k("Nomor 2: kelas Dhien memilih ketua kelas dengan roda putar. Calonnya Reimon, Abdillah, Tuti, dan Maryam.", bersih(0), tambah(0, teks("jud", 150, 22, "Memilih ketua kelas", 11, W.ungu)), tambah("roda", RODA_KETUA), tambah("Reimon,", teks("n0", 232, 62, "Reimon", 9.5, "#1D4ED8")), tambah("Abdillah,", teks("n1", 236, 86, "Abdillah", 9.5, "#A16207")), tambah("Tuti,", teks("n2", 224, 110, "Tuti", 9.5, "#BE185D")), tambah("Maryam.", teks("n3", 236, 134, "Maryam", 9.5, "#15803D"))),
    k("Siapa yang punya peluang menang paling besar? Maryam, karena juringnya paling luas. Jawaban dari Buku Panduan Guru.", sorotkan("Maryam,", "rk-j3"), tambah("Maryam,", emo("trofi", 200, 164, "🏆", 28)), tambah("luas.", teks("lu", 100, 186, "juring Maryam paling luas", 9, W.hijau))),
    k("Sebaiknya kelas Dhien memakai roda yang adil. Contohnya roda dengan 4 juring sama besar, satu juring untuk tiap calon.", bersih(0), tambah(0, teks("jud", 150, 22, "Roda yang lebih adil", 11, W.hijau)), tambah("roda", RODA_ADIL), tambah("4", teks("n", 232, 70, "4 juring", 11, W.merah), teks("n2", 232, 86, "sama besar", 9)), tambah("calon.", teks("c", 232, 120, "satu untuk", 9), teks("c2", 232, 132, "tiap calon", 9))),
    k("Nomor 3: jelaskan dengan bahasamu sendiri. Permainan adil: peluang menang semua pemain sama. Permainan kurang adil: peluang menang pemain berbeda, ada yang lebih mungkin menang.", bersih(0), tambah(0, teks("no", 150, 24, "Nomor 3", 11, W.ungu)), tambah("adil:", kotak("ad", 12, 40, 130, 100, "#BBF7D0", W.hijau, { rx: 12 }), teks("ad1", 77, 70, "ADIL", 16, W.hijau), teks("ad2", 77, 92, "peluang menang", 8.5), teks("ad3", 77, 104, "semua pemain sama", 8.5)), tambah("kurang", kotak("ka", 158, 40, 130, 100, "#FECACA", W.merah, { rx: 12 }), teks("ka1", 223, 70, "KURANG ADIL", 13, W.merah), teks("ka2", 223, 92, "peluang menang", 8.5), teks("ka3", 223, 104, "pemain berbeda", 8.5)), tambah("lebih", emo("w", 223, 168, "👑", 22))),
    k("Nomor 4: buat satu skenario permainan adil dan satu skenario permainan kurang adil. Contoh dari Buku Panduan Guru: syarat menang mendapatkan 1 atau 3.", bersih(0), tambah(0, teks("jud", 150, 24, "Skenario buatanmu", 11, W.ungu)), tambah("Contoh", ...[1, 2, 3, 4, 5, 6].map((n, i) => daduTitik(`d${n}`, 36 + i * 46, 86, n, 36, n === 1 || n === 3 ? "#FDE68A" : W.putih)).flat()), tambah("1", teks("sy", 150, 132, "syarat menang: angka 1 atau 3", 10, W.merah)), tambah("3.", teks("dua", 150, 152, "2 dari 6 angka bisa menang", 9, W.hijau))),
    k("Penguatan karakter: keadilan berarti memberi kesempatan yang sama bagi semua orang. Pernahkah kita tidak memberi teman kesempatan bermain?", bersih(0), tambah("keadilan", emo("adil", 150, 62, "⚖️", 40)), tambah("kesempatan", teks("ks", 150, 112, "kesempatan yang sama untuk semua", 11, W.hijau)), tambah("Pernahkah", emo("teman", 150, 160, "👥", 30), teks("pt", 150, 192, "bagaimana agar lebih adil?", 9, W.ungu))),
  ],
};

/* ------------------------------ 6. Eksplorasi 4.3: permen (hlm. 121 dan Lembar Kerja BG) ------------------------------ */
const WARNA_TABEL = [
  ["merah", WARNA_PERMEN.merah, 3],
  ["kuning", WARNA_PERMEN.kuning, 1],
  ["oranye", WARNA_PERMEN.oranye, 1],
  ["merah muda", WARNA_PERMEN.muda, 1],
] as const;
const PERAN = [["ketua", "⭐"], ["juru tulis", "✏️"], ["juru waktu", "⏱️"], ["juru bicara", "📣"]] as const;

export const ADEGAN_PERMEN: AdeganStory = {
  id: "eksplorasi-43",
  judul: "Eksplorasi 4.3: bereksplorasi dengan permen",
  sumber: "Buku Siswa hlm. 121–122; Buku Panduan Guru hlm. 129 dan 137–138",
  latar: "#FFF1F7",
  kutipan: ["Eksplorasi 4.3", "Kantong plastik bersih", "Tentukan peran setiap anggota kelompok"],
  ketukan: [
    k("Eksplorasi 4.3: dalam kelompok 3 sampai 4 siswa, kalian bereksplorasi dengan permen, atau bahan lain yang ditentukan guru.", tambah(0, teks("jud", 150, 26, "Eksplorasi 4.3", 13, W.ungu)), tambah("kelompok", emo("tim", 90, 100, "👥", 40)), tambah("permen,", emo("pm", 210, 100, "🍬", 40)), tambah("bahan", teks("bh", 150, 160, "atau bahan lain dari guru", 10, W.merah)), tambah("3", teks("sw", 150, 62, "3–4 siswa", 10, W.hijau))),
    k("Siapkan kantong plastik bersih, kain penutup mata, dan satu blok atau kantong permen.", bersih(0), tambah("kantong", emo("kt", 60, 90, "🛍️", 36), teks("l1", 60, 122, "kantong plastik", 8)), tambah("kain", emo("kn", 150, 90, "🧣", 36), teks("l2", 150, 122, "kain penutup mata", 8)), tambah("blok", emo("bl", 240, 90, "🍬", 36), teks("l3", 240, 122, "blok atau kantong permen", 8))),
    k("Bagi peran: ketua, juru tulis, juru waktu, dan juru bicara. Peran juru bicara dihapus bila hanya ada 3 siswa.", bersih(0), ...PERAN.map(([nama, e], i) => tambah(nama.split(" ").pop(), kotak(`r${i}`, 10 + i * 72, 56, 66, 80, W.putih, W.ungu, { rx: 10 }), emo(`re${i}`, 43 + i * 72, 98, e, 26), teks(`rt${i}`, 43 + i * 72, 124, nama, 8))), tambah("dihapus", garis("coret", 226, 70, 56, 56, W.merah, 4, { gambar: true })), tambah("3", teks("t3", 150, 170, "hanya 3 siswa: tanpa juru bicara", 9, W.merah))),
    k("Langkah 1 lembar kerja: buat tabel data jumlah permen dengan warna tertentu, lengkap dengan label kolom dan baris. Contoh kelompok Dhien: 3 merah, 1 kuning, 1 oranye, dan 1 merah muda.", bersih(0), tambah("tabel", teks("jud", 150, 22, "Tabel data permen", 11, W.ungu), kotak("h1", 40, 32, 100, 22, "#DBEAFE", W.biru, { rx: 2 }), teks("h1t", 90, 47, "warna", 9), kotak("h2", 140, 32, 120, 22, "#DBEAFE", W.biru, { rx: 2 }), teks("h2t", 200, 47, "jumlah permen", 9)), ...WARNA_TABEL.map(([nama, w, n], i) => tambah(i === 0 ? "3" : i === 1 ? "kuning," : i === 2 ? "oranye," : "muda.", kotak(`w${i}`, 40, 54 + i * 28, 100, 28, W.putih, W.biru, { rx: 2 }), bulat(`wp${i}`, 56, 68 + i * 28, 7, w), teks(`wn${i}`, 100, 72 + i * 28, nama, 8.5), kotak(`j${i}`, 140, 54 + i * 28, 120, 28, W.putih, W.biru, { rx: 2 }), teks(`jn${i}`, 200, 73 + i * 28, String(n), 12, W.merah)))),
    k("Masukkan semua permen ke kantong. Kalau kamu mengambil 1 permen secara acak, buat daftar warna yang mungkin terambil, lalu hitung jumlah kemungkinannya. Jumlahnya sama dengan jumlah permen, yaitu 6.", bersih(0), tambah("kantong.", emo("kt", 70, 100, "🛍️", 44)), tambah("daftar", ...WARNA_TABEL.map(([nama, w], i) => [bulat(`d${i}`, 160, 56 + i * 20, 6, w), teks(`dn${i}`, 172, 60 + i * 20, nama, 8.5, W.biru, { anchor: "start" })]).flat()), tambah("hitung", teks("jm", 230, 150, "6 kemungkinan", 11, W.merah)), tambah("permen,", teks("pm", 150, 176, "jumlah kemungkinan = jumlah permen", 9, W.ungu))),
    k("Diskusikan dalam kelompok: permen warna apa yang peluangnya paling besar diambil secara acak, dan mengapa?", bersih(0), tambah("Diskusikan", emo("diskusi", 150, 56, "💬", 34)), tambah("warna", ...WARNA_TABEL.map(([, w], i) => bulat(`q${i}`, 70 + i * 52, 116, 14, w))), tambah("paling", emo("tanya", 150, 160, "❓", 26)), tambah("mengapa?", teks("mw", 150, 196, "mengapa?", 11, W.ungu))),
    k("Satu anggota kelompok ditutup matanya dan mengambil satu permen secara acak. Permennya dikembalikan ke kantong, lalu diulang sebanyak 10 kali dan dicatat.", bersih(0), tambah("ditutup", emo("buta", 70, 60, "🙈", 32)), tambah("mengambil", emo("tangan", 70, 110, "🤚", 28), ...permen("pk", 130, 110, WARNA_PERMEN.merah)), tambah("dikembalikan", panah("kb", 150, 126, -40, 12, W.biru, 2.5, { gambar: true })), tambah("10", teks("jud", 230, 54, "Percobaan ke-", 8.5, W.ungu), ...[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n, i) => [kotak(`pc${n}`, 168 + (i % 5) * 24, 62 + Math.floor(i / 5) * 30, 22, 26, W.putih, W.biru, { rx: 3 }), teks(`pn${n}`, 179 + (i % 5) * 24, 78 + Math.floor(i / 5) * 30, String(n), 9)]).flat())),
    k("Buka penutup mata. Warna permen apa yang paling sering diambil teman kalian? Apakah hasilnya sama dengan tebakan kalian tadi?", bersih(0), tambah("Buka", emo("lihat", 150, 56, "👀", 34)), tambah("sering", teks("p1", 80, 120, "paling sering terambil:", 9), ...permen("ps", 80, 140, WARNA_PERMEN.merah)), tambah("sama", teks("p2", 220, 120, "tebakan kita:", 9), ...permen("pt", 220, 140, WARNA_PERMEN.merah)), tambah("tadi?", teks("eq", 150, 190, "sama atau berbeda?", 11, W.ungu))),
  ],
};
