import type { AdeganStory } from "./logika-story";
import { W, balon, batang, dadu, emo, garis, kotak, panah, rumah, retakan, teks, termometer } from "./k6b4a-gambar";
import { bersih, k, redamkan, sorotkan, tambah, ubah } from "./k6b4a-bantu";

const tanah = kotak("tanah", 0, 160, 300, 48, "#BBF7D0", "none", { z: -1, rx: 0 });

/* ------------------------------ 1. Pagi Dhien dan berita (hlm. 100 sampai 102) ------------------------------ */
export const ADEGAN_PAGI: AdeganStory = {
  id: "pagi-dhien",
  judul: "Pagi Dhien dan berita bencana",
  sumber: "Buku Siswa hlm. 100–102",
  latar: "#FFF1D6",
  kutipan: ["Dhien terbangun saat mendengar ayam tetangga berkokok", "perubahan iklim", "menanam pohon"],
  ketukan: [
    k("Cerita Bab 4 dimulai di pagi hari. Dhien terbangun mendengar ayam tetangga berkokok.", tambah(0, tanah, emo("matahari", 252, 36, "☀️", 26), rumah("rm", 40, 112)), tambah("Bab", teks("bab", 150, 22, "Bab 4: Peluang", 12, W.ungu)), tambah("ayam", emo("ayam", 205, 156, "🐓", 24)), tambah("berkokok", teks("kok", 232, 126, "kukuruyuk!", 8, W.merah))),
    k("Di serambi rumah, Ayah Dhien menikmati secangkir kopi. Dinding rumah mereka retak akibat gempa bumi tahun lalu.", tambah("Ayah", emo("ayah", 128, 156, "👨", 22)), tambah("kopi", emo("kopi", 150, 156, "☕", 12)), tambah("retak", retakan("r", 72, 114)), tambah("gempa", teks("gempa", 75, 182, "gempa bumi tahun lalu", 7.5, W.merah))),
    k(
      "Dhien menghampiri Ayah yang sedang menonton televisi. Berita di televisi membuat Dhien penasaran.",
      bersih(0),
      tambah(0, tanah, emo("dhien", 50, 160, "👧", 24), emo("ayah", 262, 160, "👨", 24)),
      tambah("televisi", kotak("tv", 100, 34, 130, 104, W.hitam, W.biru, { rx: 8 }), kotak("layar", 106, 40, 118, 92, "#DBEAFE", "none", { rx: 4 })),
      tambah("penasaran", emo("tanya", 50, 128, "❓", 18)),
    ),
    k(
      "Beritanya berbunyi: waspada bencana alam, berpotensi lebih sering terjadi karena perubahan iklim.",
      tambah("waspada", kotak("ban", 110, 50, 106, 18, W.merah, "none", { rx: 3 }), teks("ban-t", 163, 63, "WASPADA BENCANA ALAM", 7, W.putih), teks("live", 212, 124, "LIVE", 6.5, W.merah)),
      tambah("sering", teks("b2", 165, 88, "berpotensi lebih sering terjadi", 7)),
      tambah("iklim", teks("b3", 165, 102, "karena perubahan iklim", 7, W.merah)),
    ),
    k(
      "Dhien bertanya, apa maksudnya bencana alam akan lebih sering terjadi? Ia tidak mau mengalami gempa bumi lagi.",
      tambah("bertanya", balon("tanya-b", 46, 58, ["Apa maksudnya", "bencana alam", "lebih sering?"], 76)),
      ubah("gempa", { id: "dhien", skala: 1.15 }),
      tambah("lagi", emo("takut", 82, 160, "😨", 18)),
    ),
    k(
      "Kata Ayah, salah satu penyebab meningkatnya peluang terjadi bencana alam adalah perubahan iklim bumi.",
      bersih(0),
      tambah("meningkatnya", panah("naik", 150, 126, 0, -46, W.merah, 5, { gambar: true })),
      tambah("peluang", teks("peluang", 150, 62, "peluang bencana alam", 13)),
      tambah("iklim", emo("bumi", 150, 170, "🌍", 30)),
      tambah("bumi", teks("sebab", 150, 188, "penyebab: perubahan iklim bumi", 8, W.merah)),
    ),
    k(
      "Perubahan iklim adalah berubahnya kondisi fisik bumi, khususnya suhu dan curah hujan di seluruh dunia.",
      bersih(0),
      tambah("kondisi", teks("jud", 150, 28, "kondisi fisik bumi berubah", 10)),
      tambah("suhu", termometer("tm", 70, 62, 10), teks("l-suhu", 76, 138, "suhu", 9, W.merah)),
      tambah("curah", emo("awan", 190, 96, "🌧️", 30), teks("l-curah", 190, 122, "curah hujan", 9)),
      ubah("curah", { id: "tm-isi", y: 62 + 46 - 38, h: 38 }),
      tambah("hujan", emo("tetes1", 176, 142, "💧", 12), emo("tetes2", 192, 148, "💧", 12), emo("tetes3", 208, 142, "💧", 12)),
      tambah("dunia", emo("dunia", 250, 176, "🌍", 22)),
    ),
    k(
      "Dhien ingin peluang terjadinya gempa bumi menurun, bukan meningkat. Apa yang bisa ia lakukan?",
      bersih(0),
      tambah(0, teks("gempa-t", 150, 28, "peluang gempa bumi", 11)),
      tambah("menurun", panah("turun", 90, 56, 0, 72, W.hijau, 5, { gambar: true }), teks("l-turun", 90, 150, "menurun", 9, W.hijau)),
      tambah("meningkat", panah("naik", 210, 128, 0, -72, W.merah, 5, { gambar: true }), teks("l-naik", 210, 150, "meningkat", 9, W.merah), emo("silang", 250, 96, "❌", 16)),
      tambah("lakukan", emo("mikir", 150, 112, "🤔", 28)),
    ),
    k(
      "Kata Ayah, mulailah menjaga lingkungan: menanam pohon, menghemat listrik, menghemat plastik, dan menghemat kendaraan bermotor.",
      bersih(0),
      tambah("lingkungan", teks("jud", 150, 40, "menjaga lingkungan", 11, W.hijau)),
      ...[
        ["pohon", "🌳", "tanam pohon"],
        ["listrik", "💡", "hemat listrik"],
        ["plastik", "🛍️", "hemat plastik"],
        ["kendaraan", "🚗", "hemat kendaraan"],
      ].map(([kunci, e, label], i) => tambah(kunci, kotak(`kartu${i}`, 14 + i * 71, 64, 64, 78, W.putih, W.hijau, { rx: 8 }), emo(`ikon${i}`, 46 + i * 71, 106, e, 28), teks(`label${i}`, 46 + i * 71, 132, label, 7)),
      ),
    ),
    k(
      "Dhien berjanji ikut menjaga lingkungan mulai hari ini. Dari cerita ini kita menemukan kata baru, yaitu peluang.",
      bersih(0),
      tambah(0, emo("dhien", 150, 104, "👧", 40)),
      tambah("berjanji", emo("pohon1", 80, 108, "🌳", 30), emo("pohon2", 220, 108, "🌳", 30)),
      tambah("peluang", teks("kata", 150, 168, "PELUANG", 28, W.biru, { garis: W.emas }), garis("garis", 62, 176, 176, 0, W.emas, 3, { gambar: true })),
    ),
  ],
};

/* ------------------------------ 2. Tujuan, pertanyaan pemantik, peta konsep (hlm. 103) ------------------------------ */
const kartuButir = (id: string, y: number, isi: string, warna: string = W.putih) => [kotak(`${id}-k`, 14, y, 272, 22, warna, W.biru, { rx: 6 }), teks(`${id}-t`, 22, y + 14.5, isi, 7.8, W.biru, { anchor: "start" })];

export const ADEGAN_TUJUAN: AdeganStory = {
  id: "tujuan-peta",
  judul: "Tujuan, pertanyaan pemantik, dan peta konsep",
  sumber: "Buku Siswa hlm. 103",
  latar: "#EDE9FE",
  kutipan: ["melihat kegunaan konsep peluang dalam kehidupan sehari-hari", "mengenal apa itu peluang dengan belajar membuat skala peluang", "Peta Konsep"],
  ketukan: [
    k("Tujuan Bab 4 ada lima. Pertama, melihat kegunaan konsep peluang dalam kehidupan sehari-hari.", tambah(0, teks("jud", 150, 22, "Tujuan Bab 4", 12)), tambah("Pertama", kartuButir("t1", 34, "1. Melihat kegunaan peluang dalam kehidupan sehari-hari"))),
    k("Kedua, mengenal apa itu peluang dengan belajar membuat skala peluang. Ketiga, melakukan percobaan untuk memahami peluang.", tambah("Kedua", kartuButir("t2", 62, "2. Mengenal peluang dan membuat skala peluang")), tambah("Ketiga", kartuButir("t3", 90, "3. Melakukan percobaan untuk memahami peluang"))),
    k("Keempat, membandingkan peluang dari dua kejadian untuk membuat keputusan. Kelima, menerapkan peluang untuk memecahkan masalah dan memenangkan permainan.", tambah("Keempat", kartuButir("t4", 118, "4. Membandingkan peluang dua kejadian untuk keputusan")), tambah("Kelima", kartuButir("t5", 146, "5. Memecahkan masalah dan memenangkan permainan"))),
    k("Ada lima pertanyaan pemantik. Apa yang menentukan peluang terjadinya suatu kejadian? Apakah ada kejadian yang tidak mungkin terjadi sama sekali?", bersih(0), tambah(0, teks("jud", 150, 22, "Pertanyaan Pemantik", 12, W.ungu)), tambah("menentukan", kartuButir("q1", 34, "❓ Apa yang menentukan peluang suatu kejadian?")), tambah("tidak", kartuButir("q2", 62, "❓ Adakah kejadian yang tidak mungkin sama sekali?"))),
    k("Apakah ada kejadian yang selamanya pasti terjadi? Bagaimana peran peluang dalam permainan? Mengapa ada permainan yang adil dan kurang adil?", tambah("selamanya", kartuButir("q3", 90, "❓ Adakah kejadian yang selamanya pasti terjadi?")), tambah("peran", kartuButir("q4", 118, "❓ Apa peran peluang dalam permainan?")), tambah("Mengapa", kartuButir("q5", 146, "❓ Mengapa ada permainan adil dan kurang adil?"))),
    k(
      "Kata kunci bab ini: peluang, prediksi atau perkiraan, peluang kejadian, serta permainan adil dan kurang adil.",
      bersih(0),
      tambah(0, teks("jud", 150, 28, "Kata Kunci", 12, W.ungu)),
      tambah("peluang@1", kotak("c1", 20, 48, 120, 30, "#FDE68A", W.biru, { rx: 14 }), teks("c1t", 80, 67, "peluang", 10)),
      tambah("prediksi", kotak("c2", 160, 48, 120, 30, "#BBF7D0", W.biru, { rx: 14 }), teks("c2t", 220, 67, "prediksi / perkiraan", 8)),
      tambah("kejadian,", kotak("c3", 20, 96, 120, 30, "#BFDBFE", W.biru, { rx: 14 }), teks("c3t", 80, 115, "peluang kejadian", 9)),
      tambah("permainan", kotak("c4", 160, 96, 120, 46, "#FECACA", W.biru, { rx: 14 }), teks("c4t", 220, 116, "permainan adil dan", 8), teks("c4u", 220, 130, "kurang adil", 8)),
    ),
    k(
      "Peta konsepnya begini. Peluang bercabang dua. Skala Peluang menjawab seberapa mungkin. Membandingkan Peluang Kejadian menjawab berapa besar kemungkinan.",
      bersih(0),
      tambah("peluang@1", kotak("akar", 100, 22, 100, 30, W.emas, W.biru, { rx: 14 }), teks("akar-t", 150, 42, "Peluang", 13)),
      tambah("bercabang", garis("cb1", 130, 52, -50, 38, W.biru, 2.5, { gambar: true }), garis("cb2", 170, 52, 50, 38, W.biru, 2.5, { gambar: true })),
      tambah("Skala", kotak("kiri", 14, 92, 112, 32, "#BBF7D0", W.biru, { rx: 8 }), teks("kiri-t", 70, 112, "Skala Peluang", 9.5)),
      tambah("seberapa", teks("kiri-s", 70, 144, "Seberapa mungkin?", 8.5, W.hijau)),
      tambah("Membandingkan", kotak("kanan", 134, 92, 152, 32, "#FECACA", W.biru, { rx: 8 }), teks("kanan-t", 210, 106, "Membandingkan", 8), teks("kanan-t2", 210, 118, "Peluang Kejadian", 8)),
      tambah("berapa", teks("kanan-s", 210, 144, "Berapa besar kemungkinan?", 8.5, W.merah)),
    ),
    k("Video ini membahas Sub-Bab A, yaitu Skala Peluang. Sub-Bab B, membandingkan peluang kejadian, punya videonya sendiri.", sorotkan("Skala", "kiri"), redamkan("sub-bab@2", "kiri"), sorotkan("sub-bab@2", "kanan")),
  ],
};

/* ------------------------------ 3. Mengingat kembali: data (hlm. 104) ------------------------------ */
const DASAR = 150;
const PERCAKAPAN = [2, 6, 4, 6, 3];
const batangKeluarga = (i: number) => [batang(`bk${i}`, 52 + i * 46, DASAR, 28, PERCAKAPAN[i] * 14, W.biruMuda), teks(`bk${i}-n`, 66 + i * 46, DASAR - PERCAKAPAN[i] * 14 - 4, String(PERCAKAPAN[i]), 9)];
const NAMA_KELUARGA = ["2 orang", "3 orang", "4 orang", "5 orang", "6 atau lebih"];
const HASIL_DADU = ["5", "6", "4", "2", "1", "1", "3", "5", "2", "6"];
const KEMUNCULAN = [2, 2, 1, 1, 2, 2];
const batangDadu = (i: number) => [batang(`bd${i}`, 40 + i * 38, 172, 24, KEMUNCULAN[i] * 14, W.salem), teks(`bd${i}-n`, 52 + i * 38, 172 - KEMUNCULAN[i] * 14 - 4, String(KEMUNCULAN[i]), 9), teks(`bd${i}-l`, 52 + i * 38, 184, String(i + 1), 9)];

export const ADEGAN_DATA: AdeganStory = {
  id: "data-kembali",
  judul: "Mengingat kembali: data dan percobaan dadu",
  sumber: "Buku Siswa hlm. 104",
  latar: "#E8F7EE",
  kutipan: ["Jumlah anggota keluarga inti", "Hasil lemparan dadu", "Percobaan ke-"],
  ketukan: [
    k("Sebelum belajar peluang, ingat kembali tentang data. Data yang dicatat teratur menjadi informasi yang bermanfaat.", tambah(0, emo("catatan", 90, 100, "📋", 40)), tambah("catat", teks("data", 90, 140, "DATA", 14)), tambah("teratur", panah("ke", 120, 100, 56, 0, W.hijau, 4, { gambar: true })), tambah("informasi", emo("info", 210, 100, "💡", 40), teks("info-t", 210, 140, "informasi bermanfaat", 8, W.hijau))),
    k(
      "Contoh pertama: jumlah anggota keluarga inti teman sekelas. Keluarga 2 orang ada 2 siswa, 3 orang ada 6 siswa, dan 4 orang ada 4 siswa.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Keluarga inti teman sekelas", 10), garis("sumbu", 44, DASAR, 232, 0, W.biru, 2, { gambar: true }), ...NAMA_KELUARGA.map((n, i) => teks(`nama${i}`, 66 + i * 46, DASAR + 12, n, 6.4))),
      tambah(12, batangKeluarga(0)),
      tambah(17, batangKeluarga(1)),
      tambah(23, batangKeluarga(2)),
    ),
    k("Lalu, 5 orang ada 6 siswa, dan 6 orang atau lebih ada 3 siswa. Jumlah seluruhnya 21 siswa.", tambah(4, batangKeluarga(3)), tambah(12, batangKeluarga(4)), tambah(16, teks("total", 150, 40, "2 + 6 + 4 + 6 + 3 = 21 siswa", 10, W.merah))),
    k("Lihat, keluarga 3 orang dan keluarga 5 orang paling banyak, masing-masing 6 siswa. Data menunjukkan pola.", sorotkan(2, "bk1", "bk1-n"), sorotkan(6, "bk3", "bk3-n"), tambah(15, teks("pola", 150, 190, "data menunjukkan pola", 9, W.hijau))),
    k(
      "Contoh kedua: percobaan dengan dadu. Sepuluh kali lemparan menghasilkan angka 5, 6, 4, 2, 1, 1, 3, 5, 2, dan 6.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Percobaan melempar dadu 10 kali", 10)),
      ...HASIL_DADU.map((h, i) => tambah(i < 9 ? 10 + i : 20, dadu(`d${i}`, 14 + i * 27, 70, h, W.putih, 22), teks(`dn${i}`, 25 + i * 27, 106, `ke-${i + 1}`, 6))),
    ),
    k(
      "Kita hitung. Angka 1 muncul 2 kali, angka 2 muncul 2 kali, angka 3 muncul 1 kali, angka 4 muncul 1 kali, angka 5 muncul 2 kali, dan angka 6 muncul 2 kali.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Berapa kali tiap angka muncul?", 10), garis("sumbu", 34, 172, 240, 0, W.biru, 2, { gambar: true })),
      ...[1, 2, 3, 4, 5, 6].map((n, i) => tambah(`angka@${n}`, batangDadu(i))),
    ),
    k("Jumlahnya 10 lemparan. Angka 3 dan angka 4 paling jarang muncul, hanya 1 kali.", tambah("Jumlahnya", teks("jml", 150, 48, "2 + 2 + 1 + 1 + 2 + 2 = 10", 10, W.merah)), sorotkan("paling", "bd2", "bd2-n", "bd3", "bd3-n"), tambah("hanya", teks("jarang", 150, 64, "angka 3 dan 4 paling jarang", 8.5, W.hijau))),
    k("Data seperti ini adalah bahan untuk memahami peluang. Kalian juga bisa melempar dadu digital yang disarankan buku untuk mencoba sendiri.", bersih(0), tambah("bahan", teks("bahan", 150, 40, "data  →  peluang", 14)), tambah("dadu", emo("dadu", 110, 110, "🎲", 40)), tambah("digital", emo("laptop", 190, 110, "💻", 40)), tambah("mencoba", teks("coba", 150, 160, "coba sendiri", 10, W.hijau))),
  ],
};
