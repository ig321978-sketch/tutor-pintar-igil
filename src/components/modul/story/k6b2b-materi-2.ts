import type { AdeganStory } from "./logika-story";
import { W, barisTabel, emo, kartu, kepalaTabel, kotak, panah, paketBibit, pecahan, pengali, sel, teks } from "./k6b2b-gambar";
import { bersih, k, sorotkan, tambah, ubah } from "./k6b2b-bantu";

/** Panah pengali di sisi kiri tabel (kepala = baris -1), titik tabel (x, y) dengan tinggi sel h. */
const kiri = (id: string, dari: number, ke: number, x: number, y: number, h: number, label: string) => {
  const y0 = y + (dari + 1) * h + h / 2;
  const y1 = y + (ke + 1) * h + h / 2;
  return [panah(`${id}-p`, x - 8, y0, 0, y1 - y0, W.merah, 2, { gambar: true }), teks(`${id}-t`, x - 14, (y0 + y1) / 2 + 3, label, 9.5, W.merah, { anchor: "end" })];
};

/* ------------------------------ 3. Tabel rasio, pecahan senilai, dan pupuk (hlm. 59 dan 60) ------------------------------ */
const X3 = 60;
const Y3 = 34;
const W3 = 60;
const H3 = 24;

export const ADEGAN_TABEL_SENILAI: AdeganStory = {
  id: "b2-tabel-senilai",
  judul: "Tabel rasio dan pecahan senilai",
  sumber: "Buku Siswa hlm. 59–60",
  latar: "#FDF2F8",
  kutipan: ["Kesamaan rasio memiliki prinsip yang sama dengan pecahan senilai", "Jadi, contoh rasio yang senilai dengan 10 : 12 adalah 30 : 36 dan 5 : 6", "Apabila kalian menanam 2 bibit tanaman diperlukan 5 gram pupuk"],
  ketukan: [
    k(
      "Kesamaan rasio juga bisa dilihat pada tabel rasio. Baris 5 dan 6 dikali 5 menghasilkan baris 25 dan 30.",
      bersih(0),
      tambah("tabel", kepalaTabel("t", X3, Y3, W3, H3, ["Lahan (m²)", "Bibit"])),
      tambah("5", sel("t-r0a", X3, Y3 + H3, W3, H3, "5")),
      tambah("6", sel("t-r0b", X3 + W3, Y3 + H3, W3, H3, "6")),
      tambah("dikali", pengali("m", 0, 1, X3, Y3, W3, H3, "× 5")),
      tambah("25", sel("t-r1a", X3, Y3 + 2 * H3, W3, H3, "25")),
      tambah("30.", sel("t-r1b", X3 + W3, Y3 + 2 * H3, W3, H3, "30")),
    ),
    k(
      "Perhatikan, tiga rasio pada tabel ini sama: 5 banding 6, 10 banding 12, dan 25 banding 30.",
      tambah(7, teks("ban", 150, 150, "5 : 6", 13, W.merah)),
      ubah(10, { id: "ban", isi: "5 : 6 = 10 : 12" }),
      ubah(14, { id: "ban", isi: "5 : 6 = 10 : 12 = 25 : 30" }),
      sorotkan("30.", "ban"),
    ),
    k(
      "Prinsipnya sama dengan pecahan senilai. Pembilang dan penyebut sama-sama dikali atau dibagi dengan bilangan yang sama.",
      bersih(0),
      tambah("pecahan", pecahan("p1", 50, 100, "a", "b"), teks("s1", 90, 104, "=", 13)),
      tambah("dikali", pecahan("p2", 140, 100, "a × m", "b × m"), teks("s2", 190, 104, "atau", 9)),
      tambah("dibagi", pecahan("p3", 245, 100, "a ÷ n", "b ÷ n")),
    ),
    k(
      "Contoh: 10 per 12 dikali 3 menjadi 30 per 36. Atau dibagi 2 menjadi 5 per 6. Jadi 30 banding 36 dan 5 banding 6 senilai dengan 10 banding 12.",
      bersih(0),
      tambah("per", pecahan("f1", 40, 100, "10", "12", 13)),
      tambah("dikali", panah("a1", 66, 92, 56, -26, W.merah, 2, { gambar: true }), teks("a1t", 104, 62, "× 3", 9.5, W.merah)),
      tambah("30", pecahan("f2", 170, 62, "30", "36", 13)),
      tambah("dibagi", panah("a2", 66, 108, 56, 30, W.merah, 2, { gambar: true }), teks("a2t", 104, 138, "÷ 2", 9.5, W.merah)),
      tambah("5", pecahan("f3", 170, 148, "5", "6", 13)),
      tambah("Jadi", teks("sm", 150, 196, "30 : 36 dan 5 : 6 senilai dengan 10 : 12", 9, W.hijau)),
    ),
    k(
      "Ayo berpikir kritis. Menanam 2 bibit memerlukan 5 gram pupuk. Berapa gram pupuk untuk 11 bibit?",
      bersih(0),
      tambah("kritis.", teks("kj", 150, 24, "Berpikir kritis: pupuk untuk bibit", 10, W.ungu)),
      tambah("Menanam", kepalaTabel("u", X3, Y3 + 10, W3, H3, ["Bibit", "Pupuk (g)"])),
      tambah(4, sel("u-r0a", X3, Y3 + 10 + H3, W3, H3, "2")),
      tambah(7, sel("u-r0b", X3 + W3, Y3 + 10 + H3, W3, H3, "5")),
      tambah(14, sel("u-r1a", X3, Y3 + 10 + 2 * H3, W3, H3, "11")),
      tambah(15, sel("u-r1b", X3 + W3, Y3 + 10 + 2 * H3, W3, H3, "?", "#FEF9C3")),
    ),
    k(
      "Dari 2 bibit ke 11 bibit tidak bisa dikali bilangan bulat. Cari dulu pupuk 1 bibit: 5 dibagi 2 sama dengan 2,5 gram.",
      tambah(10, teks("tb", 150, 178, "2 ke 11: bukan kali bilangan bulat", 9, W.merah)),
      tambah(14, sel("u-r2a", X3, Y3 + 10 + 3 * H3, W3, H3, "1")),
      tambah("dibagi", pengali("v", 0, 2, X3, Y3 + 10, W3, H3, "÷ 2")),
      tambah(21, sel("u-r2b", X3 + W3, Y3 + 10 + 3 * H3, W3, H3, "2,5")),
    ),
    k(
      "Lalu 11 bibit memerlukan 11 kali 2,5, yaitu 27,5 gram pupuk.",
      tambah("kali", kiri("w", 2, 1, X3, Y3 + 10, H3, "× 11")),
      ubah("27,5", { id: "u-r1b-t", isi: "27,5" }),
      sorotkan("gram", "u-r1a-k", "u-r1b-k"),
    ),
  ],
};

/* ------------------------------ 4. Memilih bibit TOGA dan rasio satuan (hlm. 61 dan 62) ------------------------------ */
const X4 = 8;
const X4B = 156;
const Y4 = 40;
const W4 = 52;
const H4 = 24;

export const ADEGAN_TOGA: AdeganStory = {
  id: "b2-toga",
  judul: "Memilih bibit TOGA dan rasio satuan",
  sumber: "Buku Siswa hlm. 61–62",
  latar: "#ECFDF5",
  kutipan: ["TOGA adalah singkatan dari Tanaman Obat Keluarga", "Rasio satuan adalah ketika jumlah salah satu dari dua kuantitas dalam rasio sama dengan 1", "Harga paket berisi 3 bibit = Rp37.500,00"],
  ketukan: [
    k(
      "Eksplorasi 2.4. Ibu mengajak Anike ke toko bibit. Ibu mencari bibit TOGA, singkatan dari Tanaman Obat Keluarga.",
      tambah("Eksplorasi", teks("jud", 150, 24, "Eksplorasi 2.4: Memilih Bibit Tanaman", 10, W.ungu)),
      tambah("Ibu", emo("ibu", 50, 90, "👩", 34), teks("ibut", 50, 108, "Ibu", 8.5)),
      tambah("Anike", emo("an", 110, 90, "👧", 34), teks("ant", 110, 108, "Anike", 8.5)),
      tambah("toko", emo("tk", 230, 90, "🏪", 38), teks("tkt", 230, 108, "toko bibit", 8.5)),
      tambah("TOGA,", kartu("tg", 40, 130, 220, 38, "#DCFCE7", ["TOGA", "Tanaman Obat Keluarga"], 9.5)),
    ),
    k(
      "Anike diminta memilih bibit jahe merah organik. Ada dua paket: paket 3 bibit seharga Rp37.500, dan paket 5 bibit seharga Rp58.000.",
      bersih(0),
      tambah(11, paketBibit("pa", 30, 50, 3, "Paket 3 bibit", "Rp37.500", "#DCFCE7")),
      tambah(17, paketBibit("pb", 170, 50, 5, "Paket 5 bibit", "Rp58.000", "#FEF9C3")),
    ),
    k(
      "Jika uang Anike sedikit, bibit mana yang dipilih? Kita cari harga satuan, yaitu harga untuk 1 bibit.",
      tambah("uang", emo("tm", 150, 168, "🤔", 26)),
      tambah("satuan,", kartu("hs", 70, 176, 160, 26, "#FEE2E2", ["harga satuan = harga 1 bibit"], 9, W.merah)),
    ),
    k(
      "Paket 3 bibit: Rp37.500 dibagi 3 sama dengan Rp12.500 untuk 1 bibit.",
      bersih(0),
      tambah("Paket", teks("ja", 60, 28, "Paket 3 bibit", 9.5, W.hijau), kepalaTabel("a", X4, Y4, W4, H4, ["Bibit", "Harga"])),
      tambah("37.500", barisTabel("a", 0, X4, Y4, W4, H4, ["3", "37.500"])),
      tambah("dibagi", pengali("pa", 0, 1, X4, Y4, W4, H4, "÷ 3")),
      tambah("12.500", barisTabel("a", 1, X4, Y4, W4, H4, ["1", "12.500"], "#FEF9C3")),
    ),
    k(
      "Paket 5 bibit: Rp58.000 dibagi 5 sama dengan Rp11.600 untuk 1 bibit.",
      tambah("Paket", teks("jb", 208, 28, "Paket 5 bibit", 9.5, W.hijau), kepalaTabel("b", X4B, Y4, W4, H4, ["Bibit", "Harga"])),
      tambah("58.000", barisTabel("b", 0, X4B, Y4, W4, H4, ["5", "58.000"])),
      tambah("dibagi", pengali("pb", 0, 1, X4B, Y4, W4, H4, "÷ 5")),
      tambah("11.600", barisTabel("b", 1, X4B, Y4, W4, H4, ["1", "11.600"], "#FEF9C3")),
    ),
    k(
      "Bandingkan: Rp12.500 lawan Rp11.600. Harga satu bibit paket 5 lebih murah, jadi Anike memilih paket yang berisi 5 bibit.",
      tambah("Bandingkan:", teks("bd", 150, 138, "12.500 lawan 11.600", 11, W.biru)),
      sorotkan("murah,", "b-r1a-k", "b-r1b-k"),
      tambah("memilih", kartu("pil", 60, 152, 180, 32, "#BBF7D0", ["Anike memilih paket 5 bibit"], 9.5, W.hijau)),
    ),
    k(
      "Inilah rasio satuan, yaitu ketika salah satu kuantitas dalam rasio sama dengan 1. Contoh: 3 banding 37.500 menjadi 1 banding 12.500.",
      bersih(0),
      tambah("satuan,", teks("rj", 150, 28, "Rasio satuan", 13, W.ungu)),
      tambah("kuantitas", kartu("rs", 40, 42, 220, 34, "#FEF9C3", ["salah satu kuantitas = 1"], 10)),
      tambah(14, kotak("c1", 40, 104, 220, 26, W.putih, W.biru, { rx: 6 }), teks("c1t", 150, 122, "3 : 37.500", 12)),
      tambah("menjadi", panah("c2", 150, 134, 0, 18, W.merah, 2.5, { gambar: true }), kotak("c3", 40, 156, 220, 26, "#FEF9C3", W.biru, { rx: 6 }), teks("c3t", 150, 174, "1 : 12.500", 12, W.merah)),
    ),
  ],
};

/* ------------------------------ 5. Rasio satuan pada besaran berbeda: mengemas bibit (hlm. 62 dan 63) ------------------------------ */
const X5 = 50;
const Y5 = 34;
const W5 = 70;
const H5 = 24;

export const ADEGAN_SATUAN_WAKTU: AdeganStory = {
  id: "b2-satuan-waktu",
  judul: "Rasio satuan: mengemas bibit per jam",
  sumber: "Buku Siswa hlm. 62–63",
  latar: "#FFF7ED",
  kutipan: ["Waktu yang dibutuhkan untuk mengemas 6 bibit tanaman adalah 1,5 jam", "Pegawai toko mengemas 4 bibit tanaman/jam", "apakah itu merupakan contoh rasio satuan"],
  ketukan: [
    k(
      "Rasio satuan juga muncul pada besaran berbeda. Toko memberi antar gratis bila membeli paling sedikit 5 bibit.",
      tambah(0, teks("jud", 150, 26, "Rasio satuan: besaran berbeda", 11, W.ungu)),
      tambah("antar", emo("trk", 80, 110, "🚚", 38), teks("trt", 80, 128, "antar gratis", 9)),
      tambah(15, kartu("mn", 150, 80, 120, 44, "#DCFCE7", ["pembelian minimal", "5 bibit"], 9.5)),
    ),
    k(
      "Sebelum dikirim, bibit dikemas. Waktu untuk mengemas 6 bibit adalah 1,5 jam.",
      bersih(0),
      tambah("dikemas.", emo("pk", 80, 100, "📦", 40), teks("pkt", 80, 120, "dikemas", 9)),
      tambah(7, teks("e6", 190, 92, "6 bibit", 14, W.hijau)),
      tambah("1,5", teks("e15", 190, 118, "= 1,5 jam", 14, W.merah)),
    ),
    k(
      "Pertanyaan a: berapa bibit per jam? Bagi kedua besaran dengan 1,5. Enam dibagi 1,5 sama dengan 4, dan 1,5 dibagi 1,5 sama dengan 1.",
      bersih(0),
      tambah("Pertanyaan", kepalaTabel("t", X5, Y5, W5, H5, ["Waktu (jam)", "Bibit"]), sel("t-r0a", X5, Y5 + H5, W5, H5, "1,5"), sel("t-r0b", X5 + W5, Y5 + H5, W5, H5, "6")),
      tambah("dibagi", pengali("m", 0, 1, X5, Y5, W5, H5, "÷ 1,5")),
      tambah(16, sel("t-r1b", X5 + W5, Y5 + 2 * H5, W5, H5, "4", "#FEF9C3")),
      tambah(23, sel("t-r1a", X5, Y5 + 2 * H5, W5, H5, "1", "#FEF9C3")),
    ),
    k(
      "Jadi pegawai toko mengemas 4 bibit per jam. Karena satuannya berbeda, satuan harus ditulis: 4 bibit per jam.",
      tambah("pegawai", kartu("pg", 40, 118, 220, 30, "#DCFCE7", ["pegawai mengemas 4 bibit/jam"], 9.5)),
      tambah("satuan", teks("st", 150, 172, "satuan ditulis: bibit/jam", 10, W.merah)),
      sorotkan("ditulis:", "st"),
    ),
    k(
      "Pertanyaan b: berapa bibit selesai dikemas dalam 4 jam? Dari 1 jam ke 4 jam dikali 4, jadi 4 bibit dikali 4 sama dengan 16 bibit.",
      bersih(0),
      tambah(0, kepalaTabel("u", X5, Y5, W5, H5, ["Waktu (jam)", "Bibit"])),
      tambah(10, sel("u-r0a", X5, Y5 + H5, W5, H5, "1"), sel("u-r0b", X5 + W5, Y5 + H5, W5, H5, "4")),
      tambah(13, sel("u-r1a", X5, Y5 + 2 * H5, W5, H5, "4")),
      tambah("dikali", pengali("n", 0, 1, X5, Y5, W5, H5, "× 4")),
      tambah("16", sel("u-r1b", X5 + W5, Y5 + 2 * H5, W5, H5, "16", "#FEF9C3")),
    ),
    k(
      "Lalu, apakah 50 km per jam contoh rasio satuan? Ya, sebab artinya jarak 50 km ditempuh dalam waktu 1 jam.",
      bersih(0),
      tambah("apakah", emo("mb", 150, 62, "🚗", 34)),
      tambah("50", teks("kp", 150, 92, "50 km/jam", 15, W.merah)),
      tambah("Ya,", teks("ya", 150, 120, "ya, rasio satuan", 11, W.hijau)),
      tambah("jarak", teks("jk", 150, 148, "jarak 50 km", 10)),
      tambah(18, teks("wk", 150, 168, "waktu 1 jam", 10), teks("rk", 150, 192, "50 km : 1 jam", 12, W.ungu)),
    ),
  ],
};
