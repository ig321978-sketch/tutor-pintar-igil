import type { AdeganStory, Obj } from "./logika-story";
import { W, denahLabel, denahNama, denahRuang, denahSisi, denahTepi, emo, judul, kartu, kotak, teks } from "./k5b4e-gambar";
import { bersih, hapus, k, tambah, ubah } from "./k5b4e-bantu";

/** Denah di sisi kiri kanvas: pojok kiri-atas (22, 36), 11 piksel per meter (lebar dan tinggi 132). */
const OX = 22;
const OY = 36;
const S = 11;
/** Denah di tengah kanvas. */
const TX = 84;
const TY = 34;

const ruang = (id: string, ox: number, oy: number, kode?: string[]): Obj[] => denahRuang(id, ox, oy, S, kode);
const nama = (id: string, kode?: string[]): Obj[] => denahNama(id, OX, OY, S, kode);
const tepi = (id: string, warna: string = W.merah, o: Partial<Obj> = {}): Obj => denahTepi(id, OX, OY, S, warna, 2.4, { z: 5, ...o });
/** Panjang sisi yang sudah diketahui pada Cara Asep (Buku Siswa hlm. 126): tanda tanya untuk AB, DE, IJ, dan MN. */
export const SISI_DIKETAHUI: [string, string][] = [["BC", "4"], ["CD", "6"], ["EF", "4"], ["FG", "4"], ["GH", "4"], ["HI", "4"], ["JK", "2"], ["KL", "4"], ["LM", "4"], ["NA", "4"]];
const labelDiketahui = (id: string): Obj[] => SISI_DIKETAHUI.map(([n, v]) => denahLabel(`${id}-${n}`, OX, OY, S, n, v, 6.6, W.biru));

/* ------------------------------ 1. Pembuka Sub-Bab E (Panduan Guru hlm. 116 dan 160 sampai 161) ------------------------------ */
export const ADEGAN_PEMBUKA_E: AdeganStory = {
  id: "pembuka-e",
  judul: "Pembuka Sub-Bab E: Keliling Bangun Gabungan",
  sumber: "Panduan Guru hlm. 116 dan hlm. 160–161",
  latar: "#F0F9FF",
  kutipan: [
    "terbimbing terhadap cara-cara menemukan keliling bangun gabungan",
    "bangun gabungan adalah denah rumah",
    "harus sudah mampu menghitung keliling berbagai macam bangun datar",
    "yang dijumlahkan adalah panjang sisi-sisi terluar (tepian)",
    "dengan mendekomposisi denah rumah ke dalam beberapa bangun datar",
  ],
  ketukan: [
    k(
      "Sub-Bab E, Keliling Bangun Gabungan, penutup Bab empat. Menurut Buku Panduan Guru, pengalaman belajarnya berupa penemuan terbimbing, dan konteks yang dipakai adalah denah rumah.",
      tambah(0, judul("Sub-Bab E: penutup bab")),
      tambah("Keliling", ...kartu("e", 30, 34, 240, 34, W.langit, ["E. Keliling Bangun Gabungan"], 11)),
      tambah("penemuan", ...kartu("p", 30, 84, 112, 42, W.hijauMuda, ["penemuan", "terbimbing"], 9.4)),
      tambah("denah", ...kartu("q", 158, 84, 112, 42, W.krem, ["konteks:", "denah rumah"], 9.4), emo("h", 150, 170, "🏠", 34)),
    ),
    k(
      "Tujuannya, mendekomposisi bangun datar gabungan, lalu menemukan cara menentukan kelilingnya. Waktu yang disarankan empat jam pelajaran.",
      bersih(0),
      tambah(0, judul("Tujuan dan waktu")),
      tambah("mendekomposisi", ...kartu("t1", 20, 40, 260, 42, W.langit, ["menguraikan bangun gabungan", "menjadi bangun-bangun penyusunnya"], 9)),
      tambah("menemukan", ...kartu("t2", 20, 92, 260, 30, W.hijauMuda, ["menemukan cara menghitung keliling"], 9)),
      tambah("Waktu", ...kartu("t3", 90, 134, 120, 36, W.krem, ["4 JP"], 14)),
    ),
    k(
      "Syaratnya, peserta didik mampu menghitung keliling berbagai bangun datar. Ingat, keliling adalah jumlah panjang sisi-sisinya, seperti berlari mengelilingi tepi lapangan.",
      bersih(0),
      tambah(0, judul("Ingat: keliling")),
      tambah("Syaratnya,", kotak("lp", 60, 50, 180, 100, W.hijauMuda, W.hijau, { rx: 2, tebal: 2.4 }), teks("lpt", 150, 104, "lapangan", 11, W.hijau)),
      tambah("seperti", emo("lr", 60, 48, "🏃", 22)),
      tambah("tepi", teks("lk", 150, 178, "keliling = jumlah sisi-sisinya", 10, W.biru)),
    ),
    k(
      "Yang dijumlahkan hanya sisi terluar, yaitu tepiannya. Alat yang disiapkan: pulpen, pensil, penggaris, spidol, dan gambar denah.",
      bersih(0),
      tambah(0, judul("Hanya tepi luar")),
      tambah("terluar,", kotak("lp2", 70, 46, 160, 70, W.hijauMuda, W.merah, { rx: 2, tebal: 3 }), teks("lp2t", 150, 86, "tepi luar", 11, W.merah)),
      tambah("Alat", emo("a1", 80, 150, "🖊", 24), emo("a2", 120, 150, "✏", 24), emo("a3", 160, 150, "📏", 24), emo("a4", 200, 150, "🖍", 24)),
      tambah("denah", teks("ad", 150, 186, "gambar denah diperbesar", 9.4, W.coklat)),
    ),
    k(
      "Untuk pemanasan, guru mengajak peserta didik menguraikan denah rumah menjadi bangun-bangun datar penyusunnya, yaitu ruangan-ruangan.",
      bersih(0),
      tambah(0, judul("Pemanasan: uraikan denah")),
      tambah("denah", ...ruang("pm", TX, TY)),
      tambah("ruangan-ruangan.", teks("pmt", 150, 190, "denah = ruangan-ruangan", 9.4, W.hijau)),
    ),
  ],
};

/* ------------------------------ 2. Eksplorasi 4.5: denah rumah (Buku Siswa hlm. 125; Panduan Guru hlm. 161 sampai 162) ------------------------------ */
export const ADEGAN_DENAH_E: AdeganStory = {
  id: "denah-rumah",
  judul: "Eksplorasi 4.5: denah rumah dan dinding terluar",
  sumber: "Buku Siswa hlm. 125–126; Panduan Guru hlm. 161–162",
  latar: "#FFF7ED",
  kutipan: [
    "Pernahkah kalian melihat denah rumah atau gedung?",
    "Gambar 4.6 Denah Rumah",
    "Di manakah kalian sering menemukannya? Kira-kira untuk apa, ya?",
    "Aku sering melihatnya di depan lift gedung. Jadi,",
    "kita bisa tahu arah keluar jika terjadi kebakaran.",
    "Waktu membangun rumah, biasanya orang",
    "menggambar denahnya terlebih dahulu.",
    "Perhatikan dinding terluar dari denah rumah di atas.",
    "Dapatkah kalian menghitung kelilingnya? Bagaimana caranya?",
    "dengan pengandaian akan merenovasi dinding-dinding terluar.",
  ],
  ketukan: [
    k(
      "Eksplorasi empat titik lima, Ayo Berpikir Kritis. Pernahkah kalian melihat denah rumah atau gedung? Perhatikan Gambar empat titik enam, denah rumah.",
      tambah(0, judul("Eksplorasi 4.5: Ayo Berpikir Kritis")),
      tambah("denah", ...ruang("dn", TX, TY)),
      tambah("Gambar", teks("cap", 150, 196, "Gambar 4.6 Denah Rumah", 8.6, W.coklat)),
    ),
    k(
      "Di mana denah sering ditemukan? Di depan lift gedung, supaya kita tahu arah keluar jika terjadi kebakaran. Orang juga menggambar denah dahulu sebelum membangun rumah.",
      bersih(0),
      tambah(0, judul("Untuk apa denah?")),
      tambah("lift", ...kartu("u1", 16, 34, 130, 66, W.langit, ["di depan lift gedung:", "arah keluar saat", "kebakaran"], 8.4), emo("u1e", 64, 120, "🏢", 24), emo("u1f", 100, 120, "🔥", 24)),
      tambah("Orang", ...kartu("u2", 154, 34, 130, 66, W.krem, ["menggambar denah", "dahulu, sebelum", "membangun rumah"], 8.4), emo("u2e", 220, 120, "📝", 24)),
    ),
    k(
      "Sekarang perhatikan dinding terluar denah itu. Dapatkah kalian menghitung kelilingnya? Bagaimana caranya?",
      bersih(0),
      tambah(0, judul("Dinding terluar: kelilingnya?")),
      tambah("denah", ...ruang("dn", TX, TY)),
      tambah("terluar", denahTepi("dt", TX, TY, S, W.merah, 2.6, { gambar: true, z: 5 })),
      tambah("kelilingnya?", teks("tn", 252, 100, "?", 34, W.merah)),
    ),
    k(
      "Guru memberi pengandaian: kita akan merenovasi dinding-dinding terluar rumah. Jadi yang diperhatikan hanya dinding paling luar.",
      ubah(0, { id: "tn", op: 0 }),
      tambah("merenovasi", emo("rn", 252, 90, "🔨", 28)),
      tambah("hanya", teks("rt", 150, 196, "yang dihitung: dinding paling luar", 9.4, W.merah)),
    ),
  ],
};

/* ------------------------------ 3. Dugaan peserta didik (Buku Siswa hlm. 126; Panduan Guru hlm. 161 sampai 162) ------------------------------ */
export const ADEGAN_DUGAAN: AdeganStory = {
  id: "dugaan-keliling",
  judul: "Dugaan: semua sisi dijumlahkan atau hanya sisi terluar",
  sumber: "Buku Siswa hlm. 126; Panduan Guru hlm. 161–162",
  latar: "#FDF4FF",
  kutipan: [
    "Mungkin harus diukur",
    "satu per satu sisi-sisinya,",
    "lalu dijumlahkan.",
    "Namun, tidak semua",
    "sisi-sisi bangun",
    "penyusunnya",
    "dijumlahkan.",
    "menjumlahkan keliling bangun-bangun datar penyusunnya satu per",
    "hanya sisi-sisi terluar saja yang dijumlahkan",
  ],
  ketukan: [
    k(
      "Dua teman memberi dugaan. Yang pertama: mungkin harus diukur satu per satu sisi-sisinya, lalu dijumlahkan.",
      tambah(0, judul("Dua dugaan")),
      tambah(0, ...ruang("dg", OX, OY), tepi("dgt")),
      tambah("pertama:", ...kartu("b1", 170, 40, 120, 60, W.langit, ["diukur satu per satu", "sisinya, lalu", "dijumlahkan"], 8.4)),
    ),
    k(
      "Yang kedua: tidak semua sisi bangun penyusunnya dijumlahkan. Sekat di antara dua ruangan berada di dalam rumah, jadi tidak ikut.",
      tambah("kedua", ...kartu("b2", 170, 110, 120, 60, W.krem, ["tidak semua sisi", "penyusun ikut", "dijumlahkan"], 8.4)),
      tambah("Sisi", teks("sd", 80, 188, "sisi di dalam rumah: tidak ikut", 8.8, W.hijau)),
    ),
    k(
      "Panduan guru memperkirakan sebagian peserta didik menjumlahkan keliling bangun penyusunnya satu per satu. Yang kritis mengoreksi: hanya sisi-sisi terluar yang dijumlahkan.",
      hapus(0, "b1-k", "b1-t0", "b1-t1", "b1-t2", "b2-k", "b2-t0", "b2-t1", "b2-t2", "sd"),
      tambah("menjumlahkan", ...kartu("c1", 170, 40, 120, 50, W.merahMuda, ["keliru: jumlah", "keliling tiap ruangan"], 8.4), emo("c1e", 150, 70, "❌", 18)),
      tambah("kritis", ...kartu("c2", 170, 110, 120, 50, W.hijauMuda, ["benar: hanya sisi", "terluar yang dijumlahkan"], 8.4), emo("c2e", 150, 140, "✅", 18)),
    ),
    k(
      "Guru menguatkan definisi keliling, yaitu jumlah panjang sisi-sisi terluar. Pada bangun gabungan, hanya sisi terluar yang dijumlahkan.",
      hapus(0, "c1-k", "c1-t0", "c1-t1", "c2-k", "c2-t0", "c2-t1", "c1e", "c2e"),
      tambah("menguatkan", ...kartu("d1", 166, 54, 128, 74, W.krem, ["keliling =", "jumlah panjang", "sisi-sisi terluar"], 9)),
      tambah("hanya", emo("d1e", 230, 156, "✅", 26)),
    ),
  ],
};

/* ------------------------------ 4. Cara Asep: bangun penyusun dan sisi yang belum diketahui (Buku Siswa hlm. 126 sampai 127; Panduan Guru hlm. 163 sampai 164) ------------------------------ */
export const ADEGAN_ASEP_1: AdeganStory = {
  id: "cara-asep-1",
  judul: "Cara Asep: bangun penyusun denah",
  sumber: "Buku Siswa hlm. 126–127; Panduan Guru hlm. 163–164",
  latar: "#F0FDF4",
  kutipan: [
    "Aku menggambar",
    "bangun-bangun",
    "datar yang menyusun",
    "denah, lalu",
    "menuliskan ukuran panjang",
    "dinding terluar di setiap sisi.",
    "masih ada bagian yang",
    "belum diketahui.",
    "Bangun datar apa saja yang disusun oleh Asep?",
    "Persegi panjang dan persegi",
    "Keliling bangun gabungan itu bisa dihitung jika panjang",
    "semua sisinya telah diketahui.",
    "MN, AB, DE, dan IJ.",
  ],
  ketukan: [
    k(
      "Cara Asep. Asep menggambar bangun penyusun denah: dapur, kamar mandi, ruang keluarga, ruang tamu, dan dua kamar. Lalu ia menuliskan ukuran dinding terluar.",
      tambah(0, judul("Cara Asep")),
      tambah("dapur,", ...ruang("as", OX, OY, ["dapur"]), ...nama("asn", ["dapur"])),
      tambah("mandi,", ...ruang("as", OX, OY, ["mandi"]), ...nama("asn", ["mandi"])),
      tambah("keluarga,", ...ruang("as", OX, OY, ["keluarga"]), ...nama("asn", ["keluarga"])),
      tambah("tamu,", ...ruang("as", OX, OY, ["tamu"]), ...nama("asn", ["tamu"])),
      tambah("kamar@2", ...ruang("as", OX, OY, ["kamarA", "kamarB"]), ...nama("asn", ["kamarA", "kamarB"])),
      tambah("ukuran", ...labelDiketahui("ds")),
    ),
    k(
      "Bangun datar apa yang disusun Asep? Persegi dan persegi panjang. Dapur dan kedua kamar berbentuk persegi, empat kali empat. Ruangan lainnya berbentuk persegi panjang.",
      tambah("Persegi", ...kartu("g1", 172, 40, 118, 50, W.krem, ["persegi:", "dapur dan dua kamar"], 8.4)),
      tambah("Ruang", ...kartu("g2", 172, 100, 118, 60, W.hijauMuda, ["persegi panjang:", "ruang tamu, ruang", "keluarga, kamar mandi"], 8.4)),
    ),
    k(
      "Namun masih ada sisi yang belum diketahui panjangnya, ditandai tanda tanya. Sisi mana saja? Pertama M N, lalu A B, kemudian D E, dan terakhir I J.",
      hapus(0, "g1-k", "g1-t0", "g1-t1", "g2-k", "g2-t0", "g2-t1", "g2-t2"),
      tambah("Pertama", denahSisi("qMN", OX, OY, S, "MN", W.merah, 4, { z: 6 }), denahLabel("lMN", OX, OY, S, "MN", "?", 9, W.merah, 8)),
      tambah("lalu", denahSisi("qAB", OX, OY, S, "AB", W.merah, 4, { z: 6 }), denahLabel("lAB", OX, OY, S, "AB", "?", 9, W.merah, 8)),
      tambah("kemudian", denahSisi("qDE", OX, OY, S, "DE", W.merah, 4, { z: 6 }), denahLabel("lDE", OX, OY, S, "DE", "?", 9, W.merah, 8)),
      tambah("terakhir", denahSisi("qIJ", OX, OY, S, "IJ", W.merah, 4, { z: 6 }), denahLabel("lIJ", OX, OY, S, "IJ", "?", 9, W.merah, 8)),
      tambah("Pertama", teks("sm", 232, 100, "4 sisi belum", 9, W.merah), teks("sm2", 232, 113, "diketahui", 9, W.merah)),
    ),
    k(
      "Keliling bangun gabungan bisa dihitung jika semua sisinya diketahui. Karena itu, keempat sisi yang hilang dicari dulu.",
      hapus(0, "sm", "sm2"),
      tambah("Keliling", ...kartu("h1", 170, 60, 124, 46, W.langit, ["semua sisi", "diketahui"], 9)),
      tambah("Karena", ...kartu("h2", 170, 118, 124, 46, W.pink, ["cari dulu", "4 sisi yang hilang"], 9)),
    ),
  ],
};
