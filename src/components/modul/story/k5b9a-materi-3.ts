import type { AdeganStory, Obj } from "./logika-story";
import { W, bacaanDua, digit, emo, garis, judul, kartu, kotak, panah, tabelNilai, teks, uang } from "./k5b9a-gambar";
import { bersih, k, tambah, warnai } from "./k5b9a-bantu";

/* ------------------------------ 8. Eksplorasi 9.1C: nota Toko Anggun 324.569 (hlm. 280 dan 281) ------------------------------ */
const ITEM_NOTA: [string, string][] = [["Shampoo", "83.200"], ["Conditioner", "96.825"], ["Lipstik", "112.312"], ["Minyak rambut", "32.232"]];

export const ADEGAN_EKSPLORASI91C: AdeganStory = {
  id: "eksplorasi-91c",
  judul: "Nota Toko Anggun: membaca 324.569",
  sumber: "Materi: nota Toko Anggun",
  latar: "#FDF2F8",
  kutipan: [
    "Eksplorasi 9.1C",
    "Gambar 9.4 Contoh Nota Pembelian",
    "Ibu memiliki usaha salon di rumah",
    "perlengkapan salon di Toko Anggun",
    "Setelah dipotong",
    "diskon, Ibu membayar di kasir sebesar Rp324.569,00",
    "Angka tiga mempunyai nilai tempat",
    "Angka dua mempunyai nilai tempat",
    "Angka sembilan mempunyai nilai tempat",
    "Tuliskan pada tabel nilai tempat berikut",
  ],
  ketukan: [
    k(
      "Sekarang kita lihat belanjaan Ibu. Ibu punya usaha salon dan berbelanja perlengkapan salon di Toko Anggun. Lihat nota pembelian ini.",
      tambah(0, judul("Nota Toko Anggun")),
      tambah("Ibu", emo("sl", 46, 104, "💇", 38), teks("slt", 46, 128, "usaha salon", 8.6, W.hijau)),
      tambah("Toko", kotak("nk", 96, 36, 180, 120, W.putih, W.hitam, { rx: 4 }), teks("nh", 186, 56, "TOKO ANGGUN", 11, W.hitam)),
      tambah("nota", teks("ng", 186, 178, "contoh nota pembelian", 9.6, W.ungu)),
    ),
    k(
      "Ibu membayar sebesar tiga ratus dua puluh empat ribu lima ratus enam puluh sembilan rupiah, tertulis pada total nota.",
      bersih(0),
      tambah(0, judul("total pada nota")),
      tambah(0, kotak("nk", 40, 34, 220, 130, W.putih, W.hitam, { rx: 4 }), teks("nh", 150, 54, "TOKO ANGGUN", 11, W.hitam)),
      tambah("sebesar", teks("tt", 150, 100, "TOTAL", 10, W.hitam), teks("tg", 150, 132, "Rp324.569,00", 20, W.merah)),
    ),
    k(
      "Sekarang tentukan nilai tempat tiap angka. Angka tiga ada di ratus ribuan, angka dua di puluh ribuan, angka empat di ribuan.",
      bersih(0),
      tambah(0, judul("nilai tempat tiap angka")),
      tambah(0, tabelNilai("n", 12, 56, 46)),
      tambah("tiga", digit("n", 12, 56, 46, 0, 0, "3", 17, W.merah)),
      tambah("dua", digit("n", 12, 56, 46, 0, 1, "2", 17, W.merah)),
      tambah("empat", digit("n", 12, 56, 46, 0, 2, "4", 17, W.merah)),
    ),
    k(
      "Angka lima ada di ratusan, angka enam di puluhan, dan angka sembilan di satuan. Tabelnya pun terisi penuh.",
      tambah("lima", digit("n", 12, 56, 46, 0, 3, "5", 17, W.merah)),
      tambah("enam", digit("n", 12, 56, 46, 0, 4, "6", 17, W.merah)),
      tambah("sembilan", digit("n", 12, 56, 46, 0, 5, "9", 17, W.merah)),
    ),
    k(
      "Bacalah: tiga ratus dua puluh empat ribu lima ratus enam puluh sembilan. Kelompok kiri dibaca dulu, lalu kata ribu.",
      tambah("tiga", ...bacaanDua("rn", 150, 126, "tiga ratus dua puluh empat ribu", "lima ratus enam puluh sembilan").slice(0, 2)),
      tambah("lima", ...bacaanDua("rn", 150, 126, "tiga ratus dua puluh empat ribu", "lima ratus enam puluh sembilan").slice(2)),
    ),
    k(
      "Coba cek isi nota. Keempat barangnya berjumlah tepat tiga ratus dua puluh empat ribu lima ratus enam puluh sembilan rupiah, sama dengan total, jadi tidak ada potongan.",
      bersih(0),
      tambah(0, judul("cek isi nota")),
      tambah("barang", ...ITEM_NOTA.flatMap(([nama, harga], i) => [teks(`in${i}`, 50, 46 + i * 20, nama, 10, W.hitam, { anchor: "start" }), teks(`ih${i}`, 250, 46 + i * 20, harga, 10, W.hitam, { anchor: "end" })])),
      tambah("berjumlah", garis("ig", 50, 126, 200, 0, W.hitam, 1.5), teks("ij", 50, 144, "jumlah", 10, W.hijau, { anchor: "start" }), teks("ik", 250, 144, "324.569", 11, W.hijau, { anchor: "end" })),
      tambah("potongan.", teks("it", 150, 178, "tidak ada potongan di nota", 10.4, W.merah)),
    ),
  ],
};

/* ------------------------------ 9. Eksplorasi 9.1D: uang Ibu Lukas (hlm. 281 sampai 283) ------------------------------ */
export const ADEGAN_EKSPLORASI91D: AdeganStory = {
  id: "eksplorasi-91d",
  judul: "Uang di dompet Ibu Lukas",
  sumber: "Materi: uang di dompet Ibu Lukas",
  latar: "#ECFEFF",
  kutipan: [
    "Eksplorasi 9.1D",
    "Nanti malam, rumah Lukas mendapat giliran ketempatan arisan",
    "Lukas hendak",
    "membantu membelikan beberapa sembako",
    "Ibu meminta Lukas langsung mengambil uang di dompet Ibu",
    "Gambar 9.5 Uang Ibu Lukas",
    "Tuliskan uang tersebut pada tabel nilai tempat berikut",
    "Berapakah uang Ibu yang menempati ratus ribuan?",
    "Berapakah uang yang menempati puluh ribuan?",
    "Berapakah uang yang menempati ribuan?",
  ],
  ketukan: [
    k(
      "Sekarang cerita Lukas. Lukas membantu membeli sembako untuk arisan kampung, memakai uang di dompet Ibu.",
      tambah(0, judul("Uang Ibu Lukas")),
      tambah("Lukas", emo("lu", 50, 110, "👦", 38), teks("lut", 50, 132, "Lukas", 8.6)),
      tambah("sembako", emo("sb", 150, 110, "🛒", 38), teks("sbt", 150, 132, "sembako", 8.6)),
      tambah("dompet", emo("dp", 250, 110, "👛", 38), teks("dpt", 250, 132, "dompet Ibu", 8.6)),
    ),
    k(
      "Uang Ibu Lukas ada tiga lembar: selembar seratus ribuan, selembar lima puluh ribuan, dan selembar lima ribuan.",
      bersih(0),
      tambah(0, judul("tiga lembar uang Ibu")),
      tambah("seratus", ...uang("u1", 8, 70, 90, 54, "100.000", "#FBCFE8")),
      tambah("lima", ...uang("u2", 106, 70, 90, 54, "50.000", "#BFDBFE")),
      tambah("lima@2", ...uang("u3", 204, 70, 90, 54, "5.000", "#FEF08A")),
    ),
    k(
      "Tuliskan uang itu pada tabel nilai tempat. Seratus ribu menempati ratus ribuan, jadi kolom ratus ribuan berisi angka satu.",
      bersih(0),
      tambah(0, judul("tabel nilai tempat uang")),
      tambah(0, tabelNilai("l", 12, 56, 46)),
      tambah("satu.", digit("l", 12, 56, 46, 0, 0, "1", 17, W.merah)),
    ),
    k(
      "Lima puluh ribu menempati puluh ribuan, jadi angkanya lima. Lima ribu menempati ribuan, jadi angkanya juga lima. Kolom lainnya diisi nol.",
      tambah(8, digit("l", 12, 56, 46, 0, 1, "5", 17, W.merah)),
      tambah(16, digit("l", 12, 56, 46, 0, 2, "5", 17, W.merah)),
      tambah(20, digit("l", 12, 56, 46, 0, 3, "0", 17), digit("l", 12, 56, 46, 0, 4, "0", 17), digit("l", 12, 56, 46, 0, 5, "0", 17)),
    ),
    k(
      "Jadi jawabannya: uang di ratus ribuan seratus ribu rupiah, di puluh ribuan lima puluh ribu rupiah, dan di ribuan lima ribu rupiah.",
      tambah("seratus", teks("a1", 35, 132, "100.000", 8.6, W.hijau)),
      tambah("lima", teks("a2", 81, 132, "50.000", 8.6, W.hijau)),
      tambah("lima@2", teks("a3", 127, 132, "5.000", 8.6, W.hijau)),
    ),
    k(
      "Seluruh uang Ibu ditulis seratus lima puluh lima ribu, sebab tiga lembar mengisi tiga kolom pertama dan kolom lainnya nol.",
      tambah("ditulis", teks("tot", 150, 176, "uang seluruhnya: 155.000", 14, W.merah)),
      tambah("sebab", teks("tn", 150, 196, "tiga lembar, tiga kolom pertama", 8.8, W.ungu)),
    ),
  ],
};

/* ------------------------------ 10. Ayo Berlatih: Toko Keenan (hlm. 283 dan 284; kunci Buku Panduan Guru hlm. 403) ------------------------------ */
const PRODUK = ["Speaker", "Mouse", "Hardisk", "Headset", "Kabel USB"];
const HARGA = ["296.575", "179.500", "834.759", "159.899", "132.795"];
const BACA: [string, string][] = [
  ["dua ratus sembilan puluh enam ribu", "lima ratus tujuh puluh lima"],
  ["seratus tujuh puluh sembilan ribu", "lima ratus"],
  ["delapan ratus tiga puluh empat ribu", "tujuh ratus lima puluh sembilan"],
  ["seratus lima puluh sembilan ribu", "delapan ratus sembilan puluh sembilan"],
  ["seratus tiga puluh dua ribu", "tujuh ratus sembilan puluh lima"],
];
const NILAI_9 = ["puluh ribuan", "ribuan", "satuan", "ribuan, puluhan, satuan", "puluhan"];
const EMO_PRODUK = ["🔊", "🖱", "💾", "🎧", "🔌"];
const NAMA_KARTU = [["speaker", "aktif"], ["mouse"], ["hardisk", "eksternal"], ["headset"], ["kabel", "USB"]];

/** Kerangka tabel harga: kolom nama dan enam kolom nilai tempat, lima baris. */
function kerangkaHarga(): Obj[] {
  const out: Obj[] = [kotak("th-n", 4, 30, 48, 24, W.langit, W.biru, { rx: 0, tebal: 1 }), teks("th-nt", 28, 45, "Produk", 7, W.biru)];
  const nama = ["Ratus Ribuan", "Puluh Ribuan", "Ribuan", "Ratusan", "Puluhan", "Satuan"];
  nama.forEach((n, c) => {
    out.push(kotak(`th-h${c}`, 52 + c * 40, 30, 40, 24, c < 3 ? W.langit : W.krem, W.biru, { rx: 0, tebal: 1 }));
    const [a, b] = n.split(" ");
    if (b) out.push(teks(`th-a${c}`, 72 + c * 40, 40, a, 6.2, W.biru), teks(`th-b${c}`, 72 + c * 40, 49, b, 6.2, W.biru));
    else out.push(teks(`th-a${c}`, 72 + c * 40, 45, a, 6.2, W.biru));
  });
  PRODUK.forEach((p, r) => {
    out.push(kotak(`th-r${r}`, 4, 54 + r * 22, 48, 22, W.putih, W.biru, { rx: 0, tebal: 1 }), teks(`th-t${r}`, 28, 68 + r * 22, p, p.length > 7 ? 7 : 8, W.biru));
    for (let c = 0; c < 6; c += 1) out.push(kotak(`th-s${r}${c}`, 52 + c * 40, 54 + r * 22, 40, 22, W.putih, W.biru, { rx: 0, tebal: 1 }));
  });
  return out;
}

/** Enam digit satu baris tabel harga. */
const barisHarga = (r: number): Obj[] => [...HARGA[r].replace(".", "")].map((ch, c) => teks(`th-d${r}${c}`, 72 + c * 40, 69 + r * 22, ch, 12, W.biru));

/** Satu blok bacaan harga: angka di kiri dan dua baris kata di kanan. */
const blokBaca = (r: number, warna: string = W.biru): Obj[] => [
  teks(`bc${r}-n`, 12, 46 + r * 31, HARGA[r], 11, warna, { anchor: "start" }),
  teks(`bc${r}-a`, 80, 42 + r * 31, BACA[r][0], 7.6, W.hitam, { anchor: "start" }),
  teks(`bc${r}-b`, 80, 53 + r * 31, BACA[r][1], 7.6, W.hitam, { anchor: "start" }),
];

export const ADEGAN_LATIHAN: AdeganStory = {
  id: "latihan-a",
  judul: "Latihan: harga peralatan komputer",
  sumber: "Materi: harga peralatan komputer",
  latar: "#EFF6FF",
  kutipan: [
    "Ayo Berlatih",
    "Toko Keenan menjual berbagai peralatan komputer",
    "speaker aktif, mouse, hardisk eksternal, headset, dan kabel USB",
    "Harga speaker aktif Rp296.575,00",
    "Harga mouse Rp179.500,00",
    "Rp834.759,00",
    "Rp159.899,00",
    "Rp132.795,00",
    "Tuliskan bilangan pada harga yang tertera pada produk pada",
    "Bacalah harga produk peralatan komputer berikut ini",
    "Tuliskan nilai tempat angka",
  ],
  ketukan: [
    k(
      "Sekarang waktunya Latihan. Toko Keenan menjual peralatan komputer: speaker aktif, mouse, hardisk eksternal, headset, dan kabel USB.",
      tambah(0, judul("Latihan: Toko Keenan")),
      ...PRODUK.map((p, i) => tambah(["speaker", "mouse", "hardisk", "headset", "kabel"][i], kotak(`pk${i}`, 6 + i * 58, 48, 54, 92, W.putih, W.biru, { rx: 6 }), emo(`pe${i}`, 33 + i * 58, 88, EMO_PRODUK[i], 26), ...NAMA_KARTU[i].map((n, j) => teks(`pn${i}-${j}`, 33 + i * 58, 108 + j * 11, n, 8, W.biru)))),
    ),
    k(
      "Harga kelima produk tertera pada daftar harga. Kita tuliskan semuanya pada tabel nilai tempat, satu produk satu baris.",
      bersih(0),
      tambah(0, judul("harga kelima produk")),
      tambah("tertera", ...PRODUK.flatMap((p, r) => [teks(`hn${r}`, 40, 52 + r * 24, p === "Kabel USB" ? "kabel USB" : p.toLowerCase(), 10.4, W.biru, { anchor: "start" }), teks(`hp${r}`, 262, 52 + r * 24, `Rp${HARGA[r]},00`, 10.4, W.hitam, { anchor: "end" })])),
      tambah("baris.", teks("hb", 150, 190, "satu produk, satu baris tabel", 10, W.hijau)),
    ),
    k(
      "Latihan satu, mengisi tabel. Speaker: dua, sembilan, enam, lima, tujuh, lima. Mouse: satu, tujuh, sembilan, lima, nol, nol.",
      bersih(0),
      tambah(0, judul("Latihan 1: tabel nilai tempat")),
      tambah(0, kerangkaHarga()),
      tambah("Speaker:", barisHarga(0)),
      tambah("Mouse:", barisHarga(1)),
    ),
    k(
      "Hardisk: delapan, tiga, empat, tujuh, lima, sembilan. Headset: satu, lima, sembilan, delapan, sembilan, sembilan. Kabel USB: satu, tiga, dua, tujuh, sembilan, lima.",
      tambah("Hardisk:", barisHarga(2)),
      tambah("Headset:", barisHarga(3)),
      tambah("Kabel", barisHarga(4)),
    ),
    k(
      "Latihan dua, bacalah harganya. Speaker aktif: dua ratus sembilan puluh enam ribu lima ratus tujuh puluh lima. Mouse: seratus tujuh puluh sembilan ribu lima ratus.",
      bersih(0),
      tambah(0, judul("Latihan 2: bacalah")),
      tambah("Speaker", blokBaca(0)),
      tambah("Mouse:", blokBaca(1)),
    ),
    k(
      "Hardisk: delapan ratus tiga puluh empat ribu tujuh ratus lima puluh sembilan. Headset: seratus lima puluh sembilan ribu delapan ratus sembilan puluh sembilan.",
      tambah("Hardisk:", blokBaca(2)),
      tambah("Headset:", blokBaca(3)),
    ),
    k(
      "Kabel USB: seratus tiga puluh dua ribu tujuh ratus sembilan puluh lima. Hati-hati, jangan membaca speaker menjadi dua ratus ribu sembilan puluh enam ribu, itu keliru.",
      tambah("Kabel", blokBaca(4)),
      warnai("keliru.", W.merah, "bc0-n"),
      tambah("keliru.", teks("bk", 150, 191, "hati-hati: kata ribu jangan dua kali", 9.6, W.merah)),
    ),
    k(
      "Latihan tiga, tuliskan nilai tempat angka sembilan. Speaker puluh ribuan, mouse ribuan, hardisk satuan, headset ribuan, puluhan, dan satuan, kabel USB puluhan.",
      bersih(0),
      tambah(0, judul("Latihan 3: angka 9")),
      ...PRODUK.map((p, r) => tambah(["Speaker", "mouse", "hardisk", "headset", "kabel"][r], teks(`s${r}-n`, 14, 52 + r * 28, HARGA[r], 12, W.biru, { anchor: "start" }), panah(`s${r}-p`, 86, 48 + r * 28, 20, 0, W.hijau, 2, { gambar: true }), teks(`s${r}-v`, 112, 52 + r * 28, NILAI_9[r], 11, W.merah, { anchor: "start" }))),
    ),
  ],
};

/* ------------------------------ 11. Refleksi dan Panduan Guru (hlm. 290; Buku Panduan Guru hlm. 402 dan 403) ------------------------------ */
const pernyataan = (id: string, y: number, isi: string, warna: string) => [
  kotak(`${id}-k`, 10, y, 280, 38, warna, W.biru, { rx: 8 }),
  teks(`${id}-t`, 20, y + 23, isi, 9, W.biru, { anchor: "start" }),
  kotak(`${id}-y`, 232, y + 9, 20, 20, W.putih, W.hijau, { rx: 3 }),
  teks(`${id}-yt`, 242, y + 34, "Ya", 6.4, W.hijau),
  kotak(`${id}-n`, 258, y + 9, 20, 20, W.putih, W.merah, { rx: 3 }),
  teks(`${id}-nt`, 268, y + 34, "Tidak", 6.4, W.merah),
];

export const ADEGAN_REFLEKSI: AdeganStory = {
  id: "refleksi-a",
  judul: "Hati-hati, Tantangan, dan Renungan",
  sumber: "Materi: hati-hati, tantangan, renungan",
  latar: "#FFF1F2",
  ketukan: [
    k(
      "Hati-hati, ada kesalahan yang sering terjadi: membaca bilangan tanpa memisahkan satuan, puluhan, ribuan, dan puluh ribuan.",
      tambah(0, judul("Hati-hati: kesalahan umum")),
      tambah("membaca", ...kartu("e1", 16, 44, 268, 40, W.merahMuda, ["membaca bilangan tanpa", "melihat nilai tempatnya"], 9.4)),
      tambah("memisahkan", panah("ea", 150, 88, 0, 18, W.hijau, 2.4, { gambar: true }), ...kartu("e2", 16, 112, 268, 40, "#DCFCE7", ["pisahkan satuan, puluhan,", "ribuan, dan puluh ribuan"], 9.4)),
    ),
    k(
      "Karena itu, cek bacaanmu dengan tabel: pisahkan setiap tiga angka, tentukan kolomnya, lalu baca dari kiri.",
      bersih(0),
      tambah(0, judul("tiga langkah mengecek")),
      tambah("pisahkan", ...kartu("l1", 8, 56, 88, 64, W.langit, ["pisahkan", "tiap tiga angka"], 8.6)),
      tambah("kolomnya,", panah("la", 98, 88, 8, 0, W.biru, 2, { gambar: true }), ...kartu("l2", 108, 56, 88, 64, W.krem, ["tentukan", "kolomnya"], 8.6)),
      tambah("kiri.", panah("lb", 198, 88, 8, 0, W.biru, 2, { gambar: true }), ...kartu("l3", 208, 56, 84, 64, "#DCFCE7", ["baca", "dari kiri"], 8.6)),
    ),
    k(
      "Tantangan. Pilih sebuah barang yang kamu inginkan, tulis harganya dengan angka, beri titik, lalu bacalah dengan kata-kata.",
      bersih(0),
      tambah(0, judul("Tantangan")),
      tambah("Pilih", ...kartu("ta", 16, 40, 268, 38, W.langit, ["pilih barang yang kamu inginkan"], 9.4)),
      tambah("tulis", panah("tp1", 150, 80, 0, 10, W.hijau, 2.4, { gambar: true }), ...kartu("tb", 16, 92, 268, 38, W.krem, ["tulis harganya, beri titik"], 9.4)),
      tambah("bacalah", panah("tp2", 150, 132, 0, 10, W.hijau, 2.4, { gambar: true }), ...kartu("tc", 16, 144, 268, 38, "#DCFCE7", ["baca dengan kata-kata"], 9.4)),
    ),
    k(
      "Renungan. Tanyakan pada dirimu sendiri: aku dapat membaca bilangan cacah sampai satu juta, aku dapat menuliskannya, dan aku dapat menentukan nilai tempat tiap angkanya.",
      bersih(0),
      tambah(0, judul("Renungan")),
      tambah("membaca", ...pernyataan("p1", 44, "Aku dapat membaca bilangan cacah", W.langit)),
      tambah("menuliskannya,", ...pernyataan("p2", 90, "Aku dapat menuliskan bilangan cacah", W.krem)),
      tambah("menentukan", ...pernyataan("p3", 136, "Aku dapat menentukan nilai tempat", "#DCFCE7")),
    ),
  ],
};
