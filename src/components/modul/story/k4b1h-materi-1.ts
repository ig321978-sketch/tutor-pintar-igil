import type { AdeganStory } from "./logika-story";
import { ANAK, PERMEN, W, barisTabel, benda, emo, judul, kaleng, kartu, teks, wadah } from "./k4b1h-gambar";
import { bersih, idx, k, sorotkan, tambah, ubah } from "./k4b1h-bantu";

/* ------------------------------ 1. Pembuka sub-bab H (Buku Siswa hlm. 44; Panduan Guru hlm. 65) ------------------------------ */
const SUARA_A1 = "Sub-bab H membahas pembagian bilangan cacah sampai seratus. Pak Wicak membeli sekaleng permen berisi empat puluh delapan biji.";
const SUARA_A2 = "Permen itu dibagi sama banyak kepada empat anak: Andi, Azizah, Drio, dan Candra. Berapa banyak permen yang diterima masing-masing anak?";
const SUARA_A3 = "Panduan guru menyebut tiga pengalaman belajar. Memahami pembagian sampai seratus dengan benda konkret, dengan gambar, dan dengan simbol matematika.";
const SUARA_A4 = "Sarana yang disiapkan: permen, kerikil, kelereng, manik-manik, kue, atau buku, ditambah wadah dari kertas, karton, atau kardus.";
const SUARA_A5 = "Apersepsi di panduan guru: pembagian merupakan pengurangan berulang dengan bilangan yang sama sampai habis, dan identik dengan berbagi kepada sesama.";

export const ADEGAN_PEMBUKA_H: AdeganStory = {
  id: "pembuka-h",
  judul: "Sub-Bab H: permen Pak Wicak dan pengalaman belajar",
  sumber: "Buku Siswa hlm. 44; Panduan Guru hlm. 65",
  latar: "#FFF7ED",
  kutipan: [
    "H. Pembagian Bilangan Cacah sampai 100",
    "Ayo Mengamati",
    "Pak Wicak membeli sekaleng permen berisi 48 biji.",
    "Pak Wicak membagi sama banyak kepada Andi, Azizah, Drio, dan Candra.",
    "Berapa banyak permen yang diterima oleh masing-masing anak?",
    "Pengalaman Belajar",
    "Memahami konsep operasi pembagian bilangan cacah sampai 100 menggunakan benda konkret.",
    "Memahami konsep operasi pembagian bilangan cacah sampai 100 menggunakan gambar.",
    "Memahami konsep operasi pembagian bilangan cacah sampai 100 menggunakan simbol matematika.",
    "Kebutuhan Sarana Prasarana dan Media",
    "Permen/kerikil/kelereng/manik-manik/kue/buku",
    "Apersepsi",
    "Secara umum konsep operasi pembagian merupakan pengurangan berulang dengan bilangan yang sama sampai habis.",
    "Konsep pembagian identik dengan kegiatan berbagi kepada sesama.",
  ],
  ketukan: [
    k(
      SUARA_A1,
      tambah(0, judul("Sub-Bab H: pembagian sampai 100")),
      tambah("Pak", ...kaleng("kl", 20, 76, 50, 58), teks("kt", 45, 112, "48", 16, W.putih)),
      tambah("empat", ...benda("pm", 104, 72, PERMEN, 12, 9, 3.4, W.oranye)),
      tambah("biji.", teks("kb", 150, 140, "48 biji permen", 10, W.coklat)),
    ),
    k(
      SUARA_A2,
      bersih(0),
      tambah(0, judul("Dibagi sama banyak")),
      ...ANAK.map((n, i) => tambah(idx(SUARA_A2, n), ...kartu(`an${i}`, 8 + i * 73, 40, 68, 34, [W.hijauMuda, W.langit, W.krem, W.pink][i], [n], 9.2))),
      tambah("Berapa", teks("kq", 150, 130, "48 : 4 = ?", 24, W.merah)),
      sorotkan("masing-masing", "kq"),
    ),
    k(
      SUARA_A3,
      bersih(0),
      tambah(0, judul("Tiga pengalaman belajar")),
      tambah("Memahami", emo("pe1", 24, 62, "🍬", 22), ...kartu("p1", 44, 40, 244, 36, W.hijauMuda, ["1. benda konkret"], 9.6)),
      tambah("gambar,", emo("pe2", 24, 112, "🖼", 22), ...kartu("p2", 44, 90, 244, 36, W.langit, ["2. gambar"], 9.6)),
      tambah("simbol", emo("pe3", 24, 162, "➗", 22), ...kartu("p3", 44, 140, 244, 36, W.krem, ["3. simbol matematika"], 9.6)),
    ),
    k(
      SUARA_A4,
      bersih(0),
      tambah(0, judul("Sarana dan media")),
      tambah("permen,", emo("sr1", 270, 62, "🍬", 24), ...kartu("s1", 12, 38, 244, 48, W.hijauMuda, ["permen / kerikil / kelereng", "manik-manik / kue / buku"], 9.2)),
      tambah("wadah", emo("sr2", 270, 124, "📦", 24), ...kartu("s2", 12, 100, 244, 48, W.krem, ["wadah dari", "kertas / karton / kardus"], 9.2)),
    ),
    k(
      SUARA_A5,
      bersih(0),
      tambah(0, judul("Apersepsi")),
      tambah("pembagian", ...kartu("ap1", 12, 40, 276, 54, W.langit, ["pembagian = pengurangan berulang", "bilangan yang sama, sampai habis"], 9.6)),
      tambah("identik", emo("ap3", 36, 144, "🤝", 28), ...kartu("ap2", 62, 120, 226, 48, W.pink, ["identik dengan", "berbagi kepada sesama"], 9.6)),
      sorotkan("berulang", "ap1-k"),
    ),
  ],
};

/* ------------------------------ 2. Pemanasan dan pertanyaan pemantik (Panduan Guru hlm. 66) ------------------------------ */
const SUARA_B1 = "Pertanyaan pemantik di panduan guru: bagaimana operasi pembagian cara bersusun? Guru membuka dengan pengantar cara membagi bilangan cacah.";
const SUARA_B2 = "Misalkan ada sepuluh kelereng akan dibagikan kepada tiga orang. Apakah sepuluh dapat dibagi sama rata kepada tiga orang?";
const SUARA_B3 = "Jika sepuluh kelereng dibagikan kepada lima orang, apakah sepuluh dapat dibagi sama rata kepada lima orang?";
const SUARA_B4 = "Guru tidak perlu memberi jawaban yang benar saat pemanasan, karena murid akan menemukannya setelah melakukan aktivitas pembelajaran.";
const SUARA_B5 = "Pada Ayo Mengamati, murid melihat kaleng permen yang akan dibagikan kepada empat orang, lalu menjawab bagaimana membagi merata dan semua permen harus dibagikan.";

export const ADEGAN_PEMANTIK: AdeganStory = {
  id: "pemantik",
  judul: "Pemanasan: kelereng sepuluh dan pertanyaan pemantik",
  sumber: "Panduan Guru hlm. 66",
  latar: "#F0F9FF",
  kutipan: [
    "Stimulus (Pemanasan)",
    "Pertanyaan Esensi/Pemantik",
    "Bagaimana operasi pembagian cara bersusun?",
    "Guru memberikan pengantar bagaimana cara membagi bilangan cacah.",
    "apakah bilangan 10 dapat dibagi sama rata kepada tiga orang tersebut?",
    "apakah bilangan 10 dapat dibagi sama rata kepada lima orang tersebut?",
    "Guru tidak perlu memberikan jawaban yang benar cara membagi rata permen saat melakukan pemanasan",
    "karena peserta didik akan menemukan jawabannya setelah mereka melakukan aktivitas pembelajaran.",
    "Pada bagian ini Guru perlu mengarahkan peserta didik untuk mengamati ilustrasi yang telah diberikan berupa kaleng permen yang akan dibagikan kepada 4 orang.",
    "semua permen harus dibagikan semua",
  ],
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, judul("Pertanyaan pemantik")),
      tambah("bagaimana", ...kartu("pq", 12, 44, 276, 52, W.emas, ["bagaimana operasi pembagian", "cara bersusun?"], 11)),
      tambah("Guru", emo("pg", 150, 142, "👩", 34)),
    ),
    k(
      SUARA_B2,
      bersih(0),
      tambah(0, judul("Sepuluh kelereng, tiga orang")),
      tambah("sepuluh", ...benda("kl", 112, 54, 10, 5, 18, 6.5, W.biruMuda), teks("kn", 150, 120, "10 kelereng", 9.6, W.coklat)),
      tambah("tiga", emo("kp1", 90, 162, "🧒", 26), emo("kp2", 150, 162, "🧒", 26), emo("kp3", 210, 162, "🧒", 26)),
      tambah("Apakah", teks("kq", 262, 112, "?", 40, W.merah)),
    ),
    k(
      SUARA_B3,
      bersih(0),
      tambah(0, judul("Sepuluh kelereng, lima orang")),
      tambah("sepuluh", ...benda("kl", 112, 54, 10, 5, 18, 6.5, W.biruMuda), teks("kn", 150, 120, "10 kelereng", 9.6, W.coklat)),
      tambah("lima", ...[0, 1, 2, 3, 4].map((i) => emo(`kp${i}`, 62 + i * 44, 162, "🧒", 24))),
      tambah("apakah", teks("kq", 262, 112, "?", 40, W.merah)),
    ),
    k(
      SUARA_B4,
      bersih(0),
      tambah(0, judul("Jangan beri jawaban dulu")),
      tambah("Guru", ...kartu("jg", 12, 36, 276, 40, W.merahMuda, ["guru belum memberi jawaban"], 9.6), emo("jx", 270, 56, "🤐", 22)),
      tambah("karena", ...kartu("jk", 12, 90, 276, 40, W.hijauMuda, ["murid menemukan jawaban lewat aktivitas"], 9.2)),
      tambah("benar", ...kartu("jc", 12, 144, 276, 44, W.krem, ["untuk guru (hitungan mandiri):", "10 : 3 bersisa 1; 10 : 5 pas, 2 tiap orang"], 8.4)),
    ),
    k(
      SUARA_B5,
      bersih(0),
      tambah(0, judul("Ayo Mengamati")),
      tambah("kaleng", ...kaleng("kl", 20, 62, 46, 56)),
      tambah("empat", ...[0, 1, 2, 3].map((i) => emo(`kp${i}`, 108 + i * 44, 88, "🧒", 26))),
      tambah("merata", ...kartu("km", 12, 134, 276, 40, W.langit, ["bagi merata, semua permen habis dibagikan"], 9.2)),
    ),
  ],
};

/* ------------------------------ 3. Aktivitas 5 (Buku Siswa hlm. 44-45; Panduan Guru hlm. 66-67) ------------------------------ */
const SUARA_C1 = "Aktivitas lima. Alat dan bahannya adalah permen, batu, kerikil, atau manik-manik sebanyak empat puluh delapan buah, ditambah wadah kertas atau plastik.";
const SUARA_C2 = "Langkah pertama: ambil wadah sebanyak yang diinginkan, misalnya tiga. Langkah kedua: letakkan permen ke wadah satu per satu secara bergantian sampai habis.";
const SUARA_C3 = "Langkah ketiga: ulangi dengan jumlah wadah yang berbeda. Syarat dari guru, setiap wadah harus sama banyak isinya, dan guru bertanya apakah ada sisa permen di kaleng.";
const SUARA_C4 = "Guru membagi murid ke beberapa kelompok heterogen, campuran kemampuan rendah, sedang, dan tinggi, supaya tumbuh sikap gotong royong. Wadah yang disiapkan tiga atau lebih.";

export const ADEGAN_AKTIVITAS_LIMA: AdeganStory = {
  id: "aktivitas-lima",
  judul: "Aktivitas 5: membagi permen ke dalam wadah",
  sumber: "Buku Siswa hlm. 44–45; Panduan Guru hlm. 66–67",
  latar: "#FEFCE8",
  kutipan: [
    "Ayo Beraktivitas",
    "Aktivitas 5",
    "Alat dan Bahan:",
    "Permen/batu/kerikil/manik-manik sebanyak 48 buah",
    "Wadah kertas/plastik",
    "Langkah-langkah:",
    "Ambil wadah sebanyak yang diinginkan, misalnya 3.",
    "memasukkannya satu per satu secara bergantian ke dalam wadah, hingga permen tersebut habis.",
    "Lakukan hal serupa dengan jumlah wadah berbeda.",
    "Guru membagi peserta didik ke beberapa kelompok yang heterogen.",
    "Guru menyiapkan wadah sebanyak 3 atau lebih",
    "dengan syarat setiap wadah harus sama banyaknya permen.",
    "apakah ada sisa permen di kaleng?",
  ],
  ketukan: [
    k(
      SUARA_C1,
      tambah(0, judul("Aktivitas 5")),
      tambah("Alat", ...kartu("al", 12, 36, 276, 52, W.hijauMuda, ["alat dan bahan:", "permen / batu / kerikil / manik-manik, 48 buah"], 9.2)),
      tambah("ditambah", emo("alw", 36, 122, "📦", 26), ...kartu("al2", 62, 100, 226, 44, W.krem, ["wadah kertas / plastik"], 9.6)),
      sorotkan("empat", "al-t1"),
    ),
    k(
      SUARA_C2,
      bersih(0),
      tambah(0, judul("Langkah 1 dan 2: tiga wadah")),
      tambah("ambil", ...[0, 1, 2].flatMap((i) => wadah(`w${i}`, 12 + i * 98, 40, 86, 84))),
      tambah("satu@2", ...[0, 1, 2].flatMap((i) => benda(`w${i}`, 28 + i * 98, 54, 1, 4, 18, 5, W.oranye))),
      tambah("habis", ...[0, 1, 2].flatMap((i) => benda(`w${i}`, 28 + i * 98, 54, 16, 4, 18, 5, W.oranye).slice(1))),
      tambah("habis", ...[0, 1, 2].map((i) => teks(`wn${i}`, 55 + i * 98, 146, "16", 12, W.hijau))),
      tambah("habis", teks("wt", 150, 170, "16 + 16 + 16 = 48 (hitungan mandiri)", 8.6, W.coklat)),
    ),
    k(
      SUARA_C3,
      bersih(0),
      tambah(0, judul("Langkah 3 dan syarat guru")),
      tambah("ulangi", ...kartu("ul", 12, 36, 276, 40, W.langit, ["ulangi dengan jumlah wadah berbeda"], 9.2)),
      tambah("Syarat", ...kartu("sy", 12, 88, 276, 40, W.hijauMuda, ["syarat: tiap wadah sama banyak isinya"], 9.2)),
      tambah("apakah", emo("sq", 36, 164, "❓", 28), ...kartu("sq2", 62, 142, 226, 40, W.krem, ["ada sisa permen di kaleng?"], 9.2)),
    ),
    k(
      SUARA_C4,
      bersih(0),
      tambah(0, judul("Kelompok heterogen")),
      tambah("rendah,", ...kartu("kh1", 12, 40, 88, 46, W.pink, ["kemampuan", "rendah"], 9)),
      tambah("sedang,", ...kartu("kh2", 106, 40, 88, 46, W.krem, ["kemampuan", "sedang"], 9)),
      tambah("tinggi,", ...kartu("kh3", 200, 40, 88, 46, W.hijauMuda, ["kemampuan", "tinggi"], 9)),
      tambah("gotong", emo("kh4", 150, 128, "🤝", 30), teks("kh5", 150, 150, "gotong royong", 9.2, W.biru)),
      tambah("tiga", ...kartu("kh6", 40, 160, 220, 30, W.langit, ["wadah: 3 atau lebih"], 9.2)),
    ),
  ],
};

/* ------------------------------ 4. Tabel hasil aktivitas dan kesimpulan (Buku Siswa hlm. 45; Panduan Guru hlm. 67) ------------------------------ */
const SUARA_D1 = "Buku meminta kita membuat tabel: banyak permen empat puluh delapan, banyak wadah dua, tiga, empat, enam, dan delapan, lalu mengisi permen di tiap wadah dan sisanya.";
const SUARA_D2 = "Isi tabel tidak dicetak di buku, jadi kita hitung sendiri. Dua wadah, tiap wadah dua puluh empat permen. Tiga wadah, tiap wadah enam belas.";
const SUARA_D3 = "Empat wadah, tiap wadah dua belas. Enam wadah, tiap wadah delapan. Delapan wadah, tiap wadah enam. Semua sisanya nol.";
const SUARA_D4 = "Kesimpulan di panduan guru: bilangan empat puluh delapan habis dibagi dengan dua, tiga, empat, enam, delapan, karena sisa hasil baginya adalah nol.";
const SUARA_D5 = "Tambahan video: itu belum semua pembagi empat puluh delapan. Masih ada satu, dua belas, enam belas, dua puluh empat, dan empat puluh delapan. Buku hanya menyebut lima.";

const KOLOM = [58, 62, 100, 60];
const PEMBAGI_TABEL: [number, number][] = [
  [2, 24],
  [3, 16],
  [4, 12],
  [6, 8],
  [8, 6],
];
export const ADEGAN_TABEL_WADAH: AdeganStory = {
  id: "tabel-wadah",
  judul: "Tabel hasil aktivitas dan kesimpulan habis dibagi",
  sumber: "Buku Siswa hlm. 45; Panduan Guru hlm. 67",
  latar: "#F0FDF4",
  kutipan: [
    "Buatlah tabel seperti di bawah ini berdasarkan hasil aktivitas yang kalian lakukan.",
    "Banyak Permen",
    "Banyak Wadah",
    "Banyak Permen di Setiap Wadah",
    "Sisa Permen",
    "Apa yang dapat kalian simpulkan dari hasil aktivitas yang kalian tuliskan dalam tabel di atas?",
    "Guru dapat memberikan kesimpulan bahwa:",
    "bilangan 48 habis dibagi dengan bilangan 2, 3, 4, 6, 8 karena sisa hasil baginya adalah NOL.",
  ],
  ketukan: [
    k(
      SUARA_D1,
      tambah(0, judul("Tabel Aktivitas 5")),
      tambah(0, ...barisTabel("h", 10, 32, KOLOM, ["permen", "wadah", "isi tiap wadah", "sisa"], 20, 8.4, true)),
      ...PEMBAGI_TABEL.map(([w], i) => tambah([idx(SUARA_D1, "dua"), idx(SUARA_D1, "tiga"), idx(SUARA_D1, "empat", 2), idx(SUARA_D1, "enam"), idx(SUARA_D1, "delapan", 2)][i], ...barisTabel(`r${i}`, 10, 52 + i * 20, KOLOM, ["48", String(w), "...", "..."], 20, 9))),
    ),
    k(
      SUARA_D2,
      ubah("hitung", { id: "r0-s2", warna: W.krem }),
      ubah(idx(SUARA_D2, "empat", 1), { id: "r0-t2", isi: "24" }, { id: "r0-t3", isi: "0" }),
      ubah(idx(SUARA_D2, "belas"), { id: "r1-t2", isi: "16" }, { id: "r1-t3", isi: "0" }),
      tambah("Isi", teks("tn", 150, 178, "isi tabel: hitungan mandiri", 8.6, W.coklat)),
    ),
    k(
      SUARA_D3,
      ubah(idx(SUARA_D3, "belas"), { id: "r2-t2", isi: "12" }, { id: "r2-t3", isi: "0" }),
      ubah(idx(SUARA_D3, "delapan", 1), { id: "r3-t2", isi: "8" }, { id: "r3-t3", isi: "0" }),
      ubah(idx(SUARA_D3, "enam", 2), { id: "r4-t2", isi: "6" }, { id: "r4-t3", isi: "0" }),
      sorotkan("sisanya", "r0-t3", "r1-t3", "r2-t3", "r3-t3", "r4-t3"),
    ),
    k(
      SUARA_D4,
      bersih(0),
      tambah(0, judul("Habis dibagi")),
      tambah("bilangan", ...kartu("hb", 12, 38, 276, 40, W.emas, ["48 habis dibagi dengan:"], 10)),
      ...[2, 3, 4, 6, 8].map((n, i) => tambah(idx(SUARA_D4, ["dua", "tiga", "empat", "enam", "delapan"][i], i === 2 ? 2 : 1), ...kartu(`hd${i}`, 12 + i * 56, 90, 50, 34, W.hijauMuda, [String(n)], 14))),
      tambah("nol.", ...kartu("hn", 12, 140, 276, 40, W.langit, ["sisa hasil baginya adalah NOL"], 9.6)),
    ),
    k(
      SUARA_D5,
      bersih(0),
      tambah(0, judul("Tambahan video: semua pembagi 48")),
      tambah("pembagi", ...kartu("pt1", 12, 36, 276, 38, W.hijauMuda, ["dari buku: 2, 3, 4, 6, 8"], 10)),
      tambah("Masih", ...kartu("pt2", 12, 86, 276, 38, W.krem, ["tambahan: 1, 12, 16, 24, 48"], 10)),
      tambah("lima.", ...kartu("pt3", 12, 138, 276, 40, W.langit, ["10 pembagi, buku menyebut 5"], 9.6)),
    ),
  ],
};
