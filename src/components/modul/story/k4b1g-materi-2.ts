import type { AdeganStory } from "./logika-story";
import { W, emo, judul, kartu, kelompok, kelompokAngka, sisi, susunHasil, susunSimpan, susunSoal, teks } from "./k4b1g-gambar";
import { bersih, hapus, idx, k, sorotkan, tambah, warnai } from "./k4b1g-bantu";

/* ------------------------------ 5. Cara bersusun tanpa menyimpan (Buku Siswa hlm. 41) ------------------------------ */
const SUARA_S1 = "Cara kedua, bersusun tanpa menyimpan. Dua belas ditulis di atas, empat di bawahnya sejajar angka satuan, lalu tanda kali dan garis.";
const SUARA_S2 = "Ada dua langkah. Satu kali empat sama dengan empat, dan dua kali empat sama dengan delapan.";
const SUARA_S3 = "Hasilnya empat puluh delapan, jadi ada empat puluh delapan donat. Tidak ada yang disimpan, karena setiap hasil kali masih satu angka.";
const SUARA_S4 = "Perhatikan urutannya: puluhan lebih dulu, satu kali empat, baru satuan. Karena tidak ada yang disimpan, urutan tidak mengubah hasil. Saat menyimpan, mulailah dari satuan.";

const SB = susunSoal("sb", 70, 70, 12, 4);
const SBH = susunHasil("sb", 70, 70, "48");

export const ADEGAN_SUSUN_TANPA: AdeganStory = {
  id: "susun-tanpa-simpan",
  judul: "Perkalian cara bersusun tanpa menyimpan",
  sumber: "Metode: bersusun tanpa menyimpan",
  latar: "#F0F9FF",
  kutipan: [
    "Perkalian cara bersusun tanpa menyimpan",
    "Perhatikan dengan baik langkah-langkah untuk melakukan perkalian menggunakan cara bersusun",
    "12 kotak donat, setiap kotak berisi 4 buah donat,",
    "1 × 4 = 4",
    "2 × 4 = 8",
    "Jadi jumlah donat sebanyak 48 buah",
  ],
  ketukan: [
    k(
      SUARA_S1,
      tambah(0, judul("Bersusun tanpa menyimpan")),
      tambah(0, sisi("sbn", 130, 70, "12 kotak, tiap kotak 4 donat", 9, W.coklat)),
      tambah("Dua", SB[0], SB[1]),
      tambah(idx(SUARA_S1, "empat"), SB[3]),
      tambah("tanda", SB[2]),
      tambah("garis.", SB[4]),
    ),
    k(
      SUARA_S2,
      tambah("Satu", sisi("sc1", 130, 96, "1 × 4 = 4", 11, W.hijau)),
      tambah(idx(SUARA_S2, "dua", 2), sisi("sc2", 130, 116, "2 × 4 = 8", 11, W.merah)),
      tambah(idx(SUARA_S2, "empat", 2), SBH[0]),
      tambah("delapan.", SBH[1]),
    ),
    k(
      SUARA_S3,
      sorotkan("Hasilnya", "sb-h0", "sb-h1"),
      tambah("jadi", ...kartu("sbk", 128, 130, 156, 38, W.emas, ["48 donat", "tidak ada yang disimpan"], 9)),
    ),
    k(
      SUARA_S4,
      hapus("Perhatikan", "sbk-k", "sbk-t0", "sbk-t1"),
      tambah("Karena", ...kartu("sbu", 128, 130, 160, 44, W.krem, ["tanpa menyimpan: urutan bebas", "menyimpan: mulai dari satuan"], 8.4)),
    ),
  ],
};

/* ------------------------------ 6. Cara panjang: kelereng (Buku Siswa hlm. 41) ------------------------------ */
const SUARA_K1 = "Cara panjang dipakai lagi pada kelereng: empat belas tumpuk, setiap tumpuk berisi lima butir kelereng.";
const SUARA_K2 = "Empat belas diurai menjadi sepuluh tambah empat, lalu dua bagian itu dikalikan lima.";
const SUARA_K3 = "Sepuluh dikali lima hasilnya lima puluh, dan empat dikali lima hasilnya dua puluh.";
const SUARA_K4 = "Lima puluh tambah dua puluh sama dengan tujuh puluh. Jadi ada tujuh puluh butir kelereng.";

const IDK = (a: number, b: number): string[] => Array.from({ length: b - a }, (_, i) => `kl-g${a + i}`);

export const ADEGAN_KELERENG: AdeganStory = {
  id: "kelereng-panjang",
  judul: "Cara panjang: empat belas tumpuk kelereng",
  sumber: "Metode: cara panjang, kelereng",
  latar: "#F5F3FF",
  kutipan: [
    "Perkalian cara panjang",
    "Perhatikan dengan baik langkah-langkah untuk melakukan perkalian menggunakan cara panjang",
    "14 tumpuk kelereng, setiap tumpuk berisi 5 butir kelereng,",
    "14 X 5 = (10 + 4) X 5 = (10 X 5) + (4 X 5) = 50 + 20 = 70 butir kelereng",
  ],
  ketukan: [
    k(
      SUARA_K1,
      tambah(0, judul("Cara panjang: kelereng")),
      tambah("empat", ...kelompok("kl", 14, 34, 14, 5, 5, 52, 22, 3, W.biruMuda, W.krem)),
      tambah("lima", teks("klt", 150, 126, "14 tumpuk × 5 butir", 10, W.biru)),
    ),
    k(
      SUARA_K2,
      warnai("sepuluh", W.hijauMuda, ...IDK(0, 10)),
      warnai("empat@2", W.langit, ...IDK(10, 14)),
      tambah("diurai", teks("kl1", 150, 148, "14 × 5 = (10 + 4) × 5", 12, W.biru)),
    ),
    k(
      SUARA_K3,
      tambah("Sepuluh", teks("kl2", 150, 166, "= (10 × 5) + (4 × 5)", 12, W.biru)),
      tambah("lima@1", teks("kl2a", 80, 188, "10 × 5 = 50", 11, W.hijau)),
      tambah("empat", teks("kl2b", 220, 188, "4 × 5 = 20", 11, W.merah)),
    ),
    k(
      SUARA_K4,
      hapus("Lima", "kl1", "kl2", "kl2a", "kl2b"),
      tambah("Lima", teks("kl3", 150, 160, "50 + 20 = 70", 20, W.hijau)),
      tambah("Jadi", ...kartu("kl4", 70, 172, 160, 26, W.emas, ["70 butir kelereng"], 10)),
    ),
  ],
};

/* ------------------------------ 7. Cara bersusun dengan menyimpan (Buku Siswa hlm. 42) ------------------------------ */
const SUARA_M1 = "Cara ketiga: bersusun dengan menyimpan. Empat belas di atas, lima di bawah. Mulai dari satuan: empat kali lima sama dengan dua puluh.";
const SUARA_M2 = "Dua puluh ditulis nol di bawah satuan, dan angka dua disimpan di atas puluhan.";
const SUARA_M3 = "Lalu satu kali lima sama dengan lima, ditambah dua yang disimpan, hasilnya tujuh. Tujuh ditulis di bawah puluhan.";
const SUARA_M4 = "Jadi hasilnya tujuh puluh. Kelerengnya ada tujuh puluh butir, sama dengan hasil cara panjang tadi.";

const SM = susunSoal("sm", 70, 70, 14, 5);
const SMH = susunHasil("sm", 70, 70, "70");

export const ADEGAN_SUSUN_SIMPAN: AdeganStory = {
  id: "susun-menyimpan",
  judul: "Perkalian cara bersusun dengan menyimpan",
  sumber: "Metode: bersusun dengan menyimpan",
  latar: "#ECFEFF",
  kutipan: [
    "Perkalian cara bersusun dengan menyimpan",
    "14 tumpuk kelereng, setiap tumpukan berisi",
    "5 butir kelereng,",
    "Perhatikan dengan baik langkah-langkah untuk melakukan perkalian cara bersusun dengan menyimpan",
    "2 + 5 = 7",
    "1 × 5 = 5",
    "4 × 5 = 2 0",
    "Jadi jumlah kelereng sebanyak 70 butir",
  ],
  ketukan: [
    k(
      SUARA_M1,
      tambah(0, judul("Bersusun dengan menyimpan")),
      tambah(0, sisi("smn", 130, 52, "14 tumpuk, tiap tumpuk 5 butir", 9, W.coklat)),
      tambah("Empat", SM[0], SM[1]),
      tambah(idx(SUARA_M1, "lima"), SM[3], SM[2], SM[4]),
      tambah(idx(SUARA_M1, "empat", 2), sisi("sm1", 130, 88, "4 × 5 = 20", 11, W.merah)),
    ),
    k(
      SUARA_M2,
      tambah("nol", SMH[1]),
      tambah("disimpan", susunSimpan("sm", 70, 70, "2")),
    ),
    k(
      SUARA_M3,
      tambah("Lalu", sisi("sm2", 130, 108, "1 × 5 = 5", 11, W.biru)),
      tambah("ditambah", sisi("sm3", 130, 128, "2 + 5 = 7", 11, W.merah)),
      tambah("Tujuh", SMH[0]),
    ),
    k(
      SUARA_M4,
      sorotkan("Jadi", "sm-h0", "sm-h1"),
      tambah("Kelerengnya", ...kartu("smk", 128, 142, 156, 38, W.emas, ["70 butir kelereng", "sama dengan cara panjang"], 9)),
      tambah("sama", emo("sme", 262, 112, "✅", 22)),
    ),
  ],
};

/* ------------------------------ 8. Ayo Mencoba: pensil (Buku Siswa hlm. 42; Panduan Guru hlm. 62) ------------------------------ */
const SUARA_Y1 = "Sekarang kita mencoba: koperasi sekolah membeli delapan pak pensil tulis, setiap pak berisi dua belas batang. Berapa pensil yang dijual seluruhnya?";
const SUARA_Y2 = "Cara bersusun pendek: dua belas di atas, delapan di bawah. Satuan dulu: dua kali delapan sama dengan enam belas. Tulis enam, simpan satu.";
const SUARA_Y3 = "Lalu satu kali delapan sama dengan delapan, ditambah satu yang disimpan, hasilnya sembilan.";
const SUARA_Y4 = "Jadi ada sembilan puluh enam pensil, karena dua belas kali delapan sama dengan sembilan puluh enam.";

const SP = susunSoal("sp", 70, 70, 12, 8);
const SPH = susunHasil("sp", 70, 70, "96");

export const ADEGAN_AYO_MENCOBA: AdeganStory = {
  id: "ayo-mencoba",
  judul: "Mencoba: delapan pak pensil",
  sumber: "Materi: bersusun pendek",
  latar: "#FEFCE8",
  kutipan: [
    "Ayo Mencoba",
    "Sebuah koperasi sekolah membeli 8 pak pensil tulis untuk dijual",
    "Setiap pak berisi 12 batang pensil.",
    "Hitunglah banyaknya pensil yang akan dijual kepada siswa!",
    "Ayo kerjakan pada buku tulis kalian dengan menggunakan cara bersusun pendek!",
    "Ayo kita kerjakan dengan menggunakan cara bersusun pendek!",
    "Jadi banyak pensil tulis yang akan dijual pada siswa adalah sebanyak 96 buah pensil tulis",
  ],
  ketukan: [
    k(
      SUARA_Y1,
      tambah(0, judul("Mencoba: pensil")),
      tambah("delapan", ...kelompokAngka("pk", 20, 34, 8, 4, 62, 34, "12 batang", W.langit, 9)),
      tambah("setiap", teks("pkt", 150, 134, "8 pak × 12 batang", 11, W.biru)),
      tambah("Berapa", emo("pkq", 150, 172, "❓", 28)),
    ),
    k(
      SUARA_Y2,
      bersih(0),
      tambah(0, judul("Bersusun pendek: pensil")),
      tambah(0, sisi("spn", 130, 52, "12 batang tiap pak, 8 pak", 9, W.coklat)),
      tambah("Cara", SP[0], SP[1], SP[2], SP[3], SP[4]),
      tambah("kali", sisi("sp1", 130, 88, "2 × 8 = 16", 11, W.merah)),
      tambah("Tulis", SPH[1]),
      tambah("simpan", susunSimpan("sp", 70, 70, "1")),
    ),
    k(
      SUARA_Y3,
      tambah("Lalu", sisi("sp2", 130, 108, "1 × 8 = 8", 11, W.biru)),
      tambah("ditambah", sisi("sp3", 130, 128, "1 + 8 = 9", 11, W.merah)),
      tambah("sembilan", SPH[0]),
    ),
    k(
      SUARA_Y4,
      sorotkan("Jadi", "sp-h0", "sp-h1"),
      tambah("karena", ...kartu("spk", 128, 142, 156, 44, W.emas, ["96 pensil", "12 × 8 = 96"], 9.4)),
    ),
  ],
};
