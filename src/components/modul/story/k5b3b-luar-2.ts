import type { AdeganStory } from "./logika-story";
import { W, emo, garis, garisBilangan, judul, kartu, kisi, lompat, posisiBil, teks } from "./k5b3b-gambar";
import { bersih, k, tambah } from "./k5b3b-bantu";

/* ------------------------------ 5. Common Denominator via LCM: penerapan ------------------------------ */
export const ADEGAN_LUAR_KPK_TERAPAN: AdeganStory = {
  id: "luar-kpk-terapan",
  judul: "Common Denominator via LCM pada angka buku",
  sumber: "Metode luar: Common Denominator via LCM; Buku Siswa hlm. 85–90",
  latar: "#EEF2FF",
  ketukan: [
    k(
      "Terapkan pada kertas Lukas dan Komang, Eksplorasi tiga titik dua D: satu per tiga ditambah empat per enam. Penyebutnya tiga dan enam, berbeda, jadi potongannya belum sama.",
      tambah(0, judul("Kertas Lukas dan Komang")),
      tambah("satu", teks("a1", 150, 72, "1/3 + 4/6", 24, W.hitam)),
      tambah("berbeda,", ...kartu("a2", 40, 100, 220, 32, W.merahMuda, ["penyebut 3 dan 6 berbeda"], 10)),
    ),
    k(
      "KPK dari tiga dan enam adalah enam. Satu per tiga menjadi dua per enam, karena enam dibagi tiga sama dengan dua, lalu dikali satu. Empat per enam tetap.",
      bersih(0),
      tambah(0, judul("Samakan penyebut jadi 6")),
      tambah("KPK", ...kartu("b1", 70, 34, 160, 28, W.hijauMuda, ["KPK 3 dan 6 = 6"], 10)),
      tambah("Satu", teks("b2", 150, 98, "1/3 = ((6 : 3) × 1)/6 = 2/6", 13, W.hitam)),
      tambah("Empat", teks("b3", 150, 128, "4/6 tetap 4/6", 13, W.hitam)),
    ),
    k(
      "Jumlahkan: dua per enam ditambah empat per enam sama dengan enam per enam. Enam bagian dari enam bagian adalah satu utuh.",
      bersih(0),
      tambah(0, judul("Jumlahkan")),
      tambah("Jumlahkan:", teks("c1", 150, 80, "2/6 + 4/6 = 6/6", 20, W.hitam)),
      tambah("utuh.", teks("c2", 150, 124, "= 1", 30, W.hijau)),
    ),
    k(
      "Sekarang wingko Lukas: satu per dua ditambah satu per tiga. KPK dari dua dan tiga adalah enam. Jadi tiga per enam ditambah dua per enam sama dengan lima per enam.",
      bersih(0),
      tambah(0, judul("Wingko Lukas")),
      tambah("Sekarang", teks("d1", 150, 60, "1/2 + 1/3", 20, W.hitam)),
      tambah("KPK", ...kartu("d2", 70, 76, 160, 28, W.hijauMuda, ["KPK 2 dan 3 = 6"], 10)),
      tambah("Jadi", teks("d3", 150, 132, "= 3/6 + 2/6 = 5/6", 18, W.hijau)),
    ),
    k(
      "Contoh paling besar di buku adalah jarak tiga rumah: satu per dua, satu per empat, dan satu per dua ratus. KPK dari dua, empat, dan dua ratus adalah dua ratus, sehingga jumlahnya seratus lima puluh satu per dua ratus.",
      bersih(0),
      tambah(0, judul("Tiga pecahan sekaligus")),
      tambah("Contoh", teks("e1", 150, 56, "1/2 + 1/4 + 1/200", 17, W.hitam)),
      tambah("KPK", ...kartu("e2", 50, 70, 200, 28, W.hijauMuda, ["KPK 2, 4, 200 = 200"], 10)),
      tambah("sehingga", teks("e3", 150, 128, "= 100/200 + 50/200 + 1/200", 12, W.hitam)),
      tambah("seratus", teks("e4", 150, 158, "= 151/200", 20, W.hijau)),
    ),
  ],
};

/* ------------------------------ 6. Area Model: konsep ------------------------------ */
const KX = 75;
const KY = 46;
const KW = 150;
const KH = 70;

export const ADEGAN_LUAR_AREA: AdeganStory = {
  id: "luar-area",
  judul: "Area Model: model daerah",
  sumber: "Metode luar: Area Model",
  latar: "#FFFBEB",
  ketukan: [
    k(
      "Metode ketiga, Area Model, artinya model daerah. Pecahan digambar sebagai daerah, misalnya persegi panjang yang dibagi sama besar, lalu bagian yang diwarnai dihitung.",
      tambah(0, judul("Area Model")),
      tambah("persegi", ...kisi("kg", KX, KY, KW, KH, 2, 3, [])),
      tambah("dibagi", teks("kt", 150, 138, "dibagi menjadi bagian sama besar", 10, W.hitam)),
    ),
    k(
      "Langkah satu, gambar satu bentuk utuh dan bagi sesuai penyebut. Langkah dua, warnai bagian sebanyak pembilang pecahan pertama. Misalnya dua per enam, dua bagian diwarnai.",
      bersih(0),
      tambah(0, judul("Langkah 1 dan 2")),
      tambah("Langkah", ...kisi("kg", KX, KY, KW, KH, 2, 3, [])),
      tambah("warnai", ...kisi("kg", KX, KY, KW, KH, 2, 3, [[0, 2, W.hijauPita]])),
      tambah("Misalnya", teks("kt", 150, 138, "2/6: 2 bagian diwarnai", 12, W.hijau)),
    ),
    k(
      "Langkah tiga, warnai pecahan kedua pada bagian yang masih kosong, dengan warna lain. Misalnya tiga per enam, tiga bagian lagi. Langkah empat, hitung semua bagian yang berwarna.",
      bersih(0),
      tambah(0, judul("Langkah 3 dan 4")),
      tambah("Langkah", ...kisi("kg", KX, KY, KW, KH, 2, 3, [[0, 2, W.hijauPita]])),
      tambah("kedua", ...kisi("kg", KX, KY, KW, KH, 2, 3, [[0, 2, W.hijauPita], [2, 5, W.jingga]])),
      tambah("hitung", teks("kt", 150, 138, "2/6 + 3/6 = 5/6", 17, W.hitam)),
    ),
    k(
      "Kalau penyebutnya berbeda, bentuk utuh dibagi menjadi bagian yang cukup kecil untuk keduanya. Tanpa rumus pun, jumlahnya sudah terlihat langsung pada gambar.",
      bersih(0),
      tambah(0, judul("Penyebut berbeda")),
      tambah("berbeda,", ...kartu("pb", 40, 46, 220, 40, W.pink, ["bagi dengan bagian yang", "cukup kecil untuk keduanya"], 9.4)),
      tambah("terlihat", emo("mt", 150, 130, "👀", 30)),
    ),
  ],
};

/* ------------------------------ 7. Area Model: penerapan ------------------------------ */
export const ADEGAN_LUAR_AREA_TERAPAN: AdeganStory = {
  id: "luar-area-terapan",
  judul: "Area Model pada angka buku",
  sumber: "Metode luar: Area Model; Buku Siswa hlm. 76 dan 85–87",
  latar: "#FEFCE8",
  ketukan: [
    k(
      "Terapkan pada masalah wingko Lukas: satu per dua ditambah satu per tiga. Gambar satu persegi panjang dan bagi menjadi enam bagian sama besar, dua baris dan tiga kolom.",
      tambah(0, judul("Wingko Lukas")),
      tambah("Terapkan", teks("wq", 150, 38, "1/2 + 1/3", 12, W.merah)),
      tambah("persegi", ...kisi("kg", KX, KY, KW, KH, 2, 3, [])),
      tambah("enam", teks("kt", 150, 138, "6 bagian sama besar", 11, W.hitam)),
    ),
    k(
      "Setengah dari enam bagian adalah tiga bagian, jadi bagian Lukas diwarnai tiga petak, satu baris penuh.",
      tambah("Setengah", ...kisi("kg", KX, KY, KW, KH, 2, 3, [[0, 3, W.jingga]])),
      tambah("tiga", teks("kt", 150, 138, "1/2 = 3 bagian", 13, W.coklat)),
    ),
    k(
      "Sepertiga dari enam bagian adalah dua bagian, jadi bagian Komang diwarnai dua petak lain dengan warna berbeda.",
      tambah("Sepertiga", ...kisi("kg", KX, KY, KW, KH, 2, 3, [[0, 3, W.jingga], [3, 5, W.hijauPita]])),
      tambah("dua", teks("kt2", 150, 160, "1/3 = 2 bagian", 13, W.hijau)),
    ),
    k(
      "Hitung semua petak berwarna: tiga ditambah dua sama dengan lima dari enam petak. Jadi satu per dua ditambah satu per tiga sama dengan lima per enam.",
      bersih(0),
      tambah(0, judul("Hasil wingko")),
      tambah("Hitung", ...kisi("kg", KX, KY - 8, KW, KH, 2, 3, [[0, 3, W.jingga], [3, 5, W.hijauPita]])),
      tambah("tiga", teks("hs1", 150, 140, "3/6 + 2/6 = 5/6", 17, W.hitam)),
      tambah("Jadi", teks("hs2", 150, 168, "1/2 + 1/3 = 5/6", 17, W.hijau)),
    ),
    k(
      "Contoh kedua, kertas Lukas dan Komang. Satu per tiga adalah dua bagian dari enam, empat per enam adalah empat bagian. Keduanya mengisi seluruh enam petak, jadi hasilnya satu kertas utuh.",
      bersih(0),
      tambah(0, judul("Kertas Lukas dan Komang")),
      tambah("Satu", ...kisi("kg", KX, KY, KW, KH, 2, 3, [[0, 2, W.hijauPita]])),
      tambah("empat", ...kisi("kg", KX, KY, KW, KH, 2, 3, [[0, 2, W.hijauPita], [2, 6, W.jingga]])),
      tambah("utuh.", teks("kt", 150, 138, "2/6 + 4/6 = 6/6", 17, W.hitam), teks("kt2", 150, 164, "= 1 kertas utuh", 14, W.hijau)),
    ),
  ],
};

/* ------------------------------ 8. Number Line Jumps: konsep ------------------------------ */
const GX = 30;
const GW = 240;
const GY = 112;

export const ADEGAN_LUAR_GARIS: AdeganStory = {
  id: "luar-garis",
  judul: "Number Line Jumps: lompatan di garis bilangan",
  sumber: "Metode luar: Number Line Jumps",
  latar: "#F5F3FF",
  ketukan: [
    k(
      "Metode keempat, Number Line Jumps, artinya lompatan di garis bilangan. Menjumlahkan pecahan sama dengan melompat ke kanan di garis.",
      tambah(0, judul("Number Line Jumps")),
      tambah("garis", ...garisBilangan("gb", GX, GY, GW, 5), teks("g0", GX, GY + 20, "0", 11, W.hitam), teks("g5", GX + GW, GY + 20, "1", 11, W.hitam)),
      tambah("melompat", emo("ro", 150, 70, "🐸", 28)),
    ),
    k(
      "Langkah satu, bagi garis dari nol sampai satu menjadi bagian sesuai penyebut. Langkah dua, mulai dari nol, lalu lompat sebanyak pecahan pertama. Misalnya dua per lima, dua bagian.",
      bersih(0),
      tambah(0, judul("Langkah 1 dan 2")),
      tambah(0, ...garisBilangan("gb", GX, GY, GW, 5), teks("g0", GX, GY + 20, "0", 11, W.hitam), teks("g5", GX + GW, GY + 20, "1", 11, W.hitam)),
      tambah("lompat", lompat("lp1", GX, GY, (GW / 5) * 2, W.merah), teks("lt1", GX + GW / 5, GY - 36, "+ 2/5", 12, W.merah)),
    ),
    k(
      "Langkah tiga, dari titik mendarat itu, lompat lagi sebanyak pecahan kedua. Misalnya satu per lima. Titik pendaratan terakhir adalah jumlahnya.",
      tambah("lompat", lompat("lp2", posisiBil(GX, GW, 5, 2), GY, GW / 5, W.hijau), teks("lt2", posisiBil(GX, GW, 5, 2) + GW / 10, GY - 36, "+ 1/5", 12, W.hijau)),
      tambah("terakhir", teks("gh", posisiBil(GX, GW, 5, 3), GY + 40, "3/5", 20, W.hitam)),
    ),
    k(
      "Metode ini memperlihatkan bahwa menjumlahkan berarti bergerak ke kanan, dan hasilnya bisa dibaca langsung pada garis.",
      bersih(0),
      tambah(0, judul("Dibaca langsung")),
      tambah("menjumlahkan", teks("r1", 150, 76, "2/5 + 1/5 = 3/5", 20, W.hitam)),
      tambah("kanan,", ...kartu("r2", 50, 100, 200, 34, W.hijauMuda, ["bergerak ke kanan"], 10.4)),
      tambah("dibaca", ...kartu("r3", 50, 146, 200, 34, W.krem, ["hasil dibaca di garis"], 10.4)),
    ),
  ],
};

/* ------------------------------ 9. Number Line Jumps: penerapan ------------------------------ */
const HX = 25;
const HW = 250;

export const ADEGAN_LUAR_GARIS_TERAPAN: AdeganStory = {
  id: "luar-garis-terapan",
  judul: "Number Line Jumps pada angka buku",
  sumber: "Metode luar: Number Line Jumps; Buku Siswa hlm. 78–80 dan 85–87",
  latar: "#FAF5FF",
  ketukan: [
    k(
      "Terapkan pada penghapus Lukas. Garis dari nol sampai satu dibagi sepuluh bagian. Mulai dari nol, lompat dua bagian untuk penghapus Asep.",
      tambah(0, judul("Penghapus Lukas")),
      tambah("Garis", ...garisBilangan("hb", HX, GY, HW, 10), teks("h0", HX, GY + 20, "0", 11, W.hitam), teks("h10", HX + HW, GY + 20, "1", 11, W.hitam)),
      tambah("lompat", lompat("hp1", HX, GY, (HW / 10) * 2, W.merah), teks("ht1", HX + HW / 10, GY - 36, "+ 2/10", 11, W.merah)),
    ),
    k(
      "Dari dua per sepuluh, lompat lagi tiga bagian untuk penghapus Yohana. Pendaratannya di lima per sepuluh.",
      tambah("lagi", lompat("hp2", posisiBil(HX, HW, 10, 2), GY, (HW / 10) * 3, W.hijau), teks("ht2", posisiBil(HX, HW, 10, 2) + (HW / 10) * 1.5, GY - 36, "+ 3/10", 11, W.hijau)),
      tambah("Pendaratannya", teks("hh", posisiBil(HX, HW, 10, 5), GY + 40, "5/10", 18, W.hitam)),
    ),
    k(
      "Lima per sepuluh tepat berada di tengah garis. Jadi hasilnya sama dengan satu per dua.",
      tambah("tengah", garis("hm", posisiBil(HX, HW, 10, 5), GY - 8, 0, 16, W.merah, 3), teks("hm1", posisiBil(HX, HW, 10, 5), GY - 52, "tengah garis", 9.4, W.merah)),
      tambah("satu", teks("hm2", 150, 178, "5/10 = 1/2", 16, W.hijau)),
    ),
    k(
      "Contoh kedua, satu per tiga ditambah empat per enam. Bagi garis menjadi enam bagian. Satu per tiga berada di dua per enam, jadi kita mulai melompat dari sana.",
      bersih(0),
      tambah(0, judul("Kertas Lukas dan Komang")),
      tambah("Contoh", teks("iq", 150, 44, "1/3 + 4/6", 14, W.merah)),
      tambah("Bagi", ...garisBilangan("ib", GX, GY, GW, 6), teks("i0", GX, GY + 20, "0", 11, W.hitam), teks("i6", GX + GW, GY + 20, "1", 11, W.hitam)),
      tambah("Satu@2", teks("it", posisiBil(GX, GW, 6, 2), GY + 40, "1/3 = 2/6", 12, W.hitam), emo("ik", posisiBil(GX, GW, 6, 2), GY - 18, "🐸", 22)),
    ),
    k(
      "Dari dua per enam, lompat empat bagian dan mendarat di enam per enam, yaitu ujung garis. Hasilnya satu utuh.",
      tambah("lompat", lompat("ip", posisiBil(GX, GW, 6, 2), GY, (GW / 6) * 4, W.hijau, { op: 1 }), teks("ip1", posisiBil(GX, GW, 6, 2) + (GW / 6) * 2, GY - 36, "+ 4/6", 12, W.hijau)),
      tambah("utuh.", teks("ih", 150, 186, "2/6 + 4/6 = 6/6 = 1", 15, W.hitam)),
    ),
  ],
};

/* ------------------------------ 10. Ringkasan ------------------------------ */
export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan empat metode",
  sumber: "Ringkasan metode luar",
  latar: "#FFF7ED",
  ketukan: [
    k(
      "Ringkasannya. Like Denominators, bila penyebut sudah sama, jumlahkan pembilang dan biarkan penyebutnya.",
      tambah(0, judul("Ringkasan")),
      tambah("Like", ...kartu("s1", 20, 36, 260, 40, W.hijauMuda, ["Like Denominators:", "penyebut sama, jumlahkan pembilang"], 9.4)),
    ),
    k(
      "Common Denominator via LCM, bila penyebut berbeda: cari KPK, buat pecahan senilai, lalu jumlahkan.",
      tambah("Common", ...kartu("s2", 20, 84, 260, 40, W.langit, ["Common Denominator via LCM:", "cari KPK, pecahan senilai, jumlahkan"], 9.4)),
    ),
    k(
      "Area Model dan Number Line Jumps memperlihatkan jumlahnya. Yang pertama sebagai daerah berwarna, yang kedua sebagai lompatan di garis.",
      tambah("Area", ...kartu("s3", 20, 132, 126, 40, W.krem, ["Area Model:", "daerah berwarna"], 9.4)),
      tambah("Number", ...kartu("s4", 154, 132, 126, 40, W.pink, ["Number Line Jumps:", "lompatan di garis"], 9.4)),
    ),
    k(
      "Untuk satu per tiga ditambah empat per enam, keempat metode memberi hasil yang sama, yaitu satu. Hasilnya selalu sama, hanya jalannya yang berbeda.",
      bersih(0),
      tambah(0, judul("Hasil yang sama")),
      tambah("keempat", ...kartu("t1", 20, 36, 126, 34, W.hijauMuda, ["penyebut sama", "2/6 + 4/6 = 1"], 8.6), ...kartu("t2", 154, 36, 126, 34, W.langit, ["KPK = 6", "2/6 + 4/6 = 1"], 8.6)),
      tambah("sama,", ...kartu("t3", 20, 80, 126, 34, W.krem, ["daerah", "6 dari 6 petak"], 8.6), ...kartu("t4", 154, 80, 126, 34, W.pink, ["garis", "mendarat di 1"], 8.6)),
      tambah("berbeda.", teks("t5", 150, 150, "1/3 + 4/6 = 1", 20, W.hijau)),
    ),
    k(
      "Buku juga meminta kita memilih cara yang paling mudah dan paling disukai. Jadi coba semuanya, lalu pilih satu yang paling cocok untukmu.",
      bersih(0),
      tambah(0, judul("Pilih yang paling mudah")),
      tambah("memilih", emo("u1", 150, 80, "⭐", 36)),
      tambah("coba", ...kartu("u2", 50, 104, 200, 40, W.hijauMuda, ["coba semua, pilih satu"], 10.4)),
    ),
  ],
};
