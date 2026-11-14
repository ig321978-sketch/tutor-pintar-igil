import type { AdeganStory, Obj } from "./logika-story";
import { W, baris, bulat, busurDerajat, busurSudut, emo, juring, kartu, sinar, sudut, teks, titikSudut, ujung } from "./k5b6d-gambar";
import { bersih, hapus, k, tambah } from "./k5b6d-bantu";

const jud = (isi: string, y = 20, u = 12): Obj => teks("jud", 150, y, isi, u, W.ungu);
const ids = (a: Obj[]): string[] => a.map((o) => o.id);

/* ------------------------------ LB3. Angle Addition Construction: konsep ------------------------------ */
const AX = 60;
const AY = 160;
export const ADEGAN_LUAR_TAMBAH: AdeganStory = {
  id: "luard-tambah",
  judul: "Angle Addition Construction: menyusun sudut dari patokan",
  sumber: "Metode luar; penjumlahan dan selisih sudut patokan",
  latar: "#F0FDF4",
  ketukan: [
    k(
      "Angle Addition Construction artinya menyusun sudut dari penjumlahan atau selisih sudut patokan yang sudah kita kenal, misalnya sudut siku-siku 90 derajat.",
      tambah(0, jud("Angle Addition Construction", 20, 11)),
      tambah("sudut@2", juring("pj", AX, AY, 0, 90, 80, W.hijauMuda, W.biru), sinar("p1", AX, AY, 0, 120, W.biru, 2), sinar("p2", AX, AY, 90, 120, W.biru, 2)),
      tambah("90", teks("p90", 100, 130, "90°", 11, W.hijau), teks("pt", 220, 100, "patokan siku-siku", 8.8, W.ungu)),
    ),
    k(
      "Contohnya, sudut 112 derajat sama dengan sudut siku-siku 90 derajat ditambah 22 derajat. Kita melukis siku-siku dulu, lalu menambah 22 derajat.",
      tambah("ditambah", sinar("p3", AX, AY, 112, 120, W.merah, 2.2, { gambar: true }), juring("pk", AX, AY, 90, 112, 70, W.merahMuda, W.merah)),
      tambah("22", teks("p22", 62, 78, "22°", 9, W.merah), teks("pj1", 220, 130, "90 + 22 = 112", 11, W.biru)),
    ),
    k(
      "Selisih juga bisa dipakai. Sudut 83 derajat sama dengan 90 dikurangi 7. Kita mulai dari siku-siku, lalu mengurangi 7 derajat.",
      bersih(0),
      tambah(0, jud("Selisih dari patokan")),
      tambah("Sudut", sudut("s", AX, AY, 0, 83, 120, 30)),
      tambah("90", sinar("sb", AX, AY, 90, 120, W.abu, 1.6, { putus: true }), teks("sL", 100, 134, "83°", 11, W.merah)),
      tambah("dikurangi", teks("pj2", 220, 130, "90 - 7 = 83", 11, W.biru)),
    ),
    k(
      "Kelebihannya, kita bisa memperkirakan hasil dengan patokan siku-siku, lalu busur hanya dipakai untuk bagian kecil yang tersisa.",
      bersih(0),
      tambah(0, jud("Kelebihan metode ini", 22, 11)),
      tambah("memperkirakan", kartu("kb1", 30, 44, 240, 40, W.krem, ["perkirakan dengan patokan 90°"], 9)),
      tambah("busur", kartu("kb2", 30, 100, 240, 40, W.muda, ["busur untuk bagian kecil"], 9), emo("kb3", 150, 176, "📐", 26)),
    ),
  ],
};

/* ------------------------------ LB3t. Sudut 165 derajat = 90 + 75 ------------------------------ */
const CX = 150;
const CY = 156;
export const ADEGAN_LUAR_TAMBAH_TERAPAN: AdeganStory = {
  id: "luard-tambah-terapan",
  judul: "Angle Addition Construction: sudut 165 derajat",
  sumber: "Metode luar; penerapan pada Ayo Berlatih 2d",
  latar: "#F0FDF4",
  ketukan: [
    k(
      "Terapkan pada soal 2 d, sudut 165 derajat. Pilih patokan siku-siku 90 derajat, lalu cari sisanya: 165 dikurangi 90 sama dengan 75 derajat.",
      tambah(0, jud("Soal 2d: susun sudut 165°", 20, 11)),
      tambah("165", titikSudut("v", CX, CY, W.biru, 3.2), sinar("r1", CX, CY, 0, 120, W.biru, 2.4, { gambar: true })),
      tambah("dikurangi", teks("h1", 232, 70, "165 - 90 = 75", 10.4, W.merah)),
    ),
    k(
      "Lukis dulu sudut siku-siku 90 derajat dari kaki mendatar. Kemudian dari kaki kedua, tambahkan sudut 75 derajat, sama dengan gambar b pada soal satu.",
      tambah("siku-siku", sinar("sk", CX, CY, 90, 110, W.hijau, 2.2, { gambar: true }), busurSudut("a1", CX, CY, 0, 90, 20, W.hijau, 1.8), teks("l90", 173, 133, "90°", 9, W.hijau)),
      tambah("tambahkan", busurSudut("a2", CX, CY, 90, 165, 32, W.merah, 1.8), teks("l75", 123, 126, "75°", 9, W.merah)),
    ),
    k(
      "Hasilnya, sudut dari kaki pertama ke kaki ketiga: 90 ditambah 75 sama dengan 165 derajat, sudut tumpul yang hampir lurus.",
      tambah("ketiga:", sinar("r2", CX, CY, 165, 120, W.biru, 2.4, { gambar: true })),
      tambah("sama", teks("h2", 232, 100, "90 + 75 = 165", 10.4, W.biru)),
      tambah("tumpul", teks("rL", 122, 150, "165°", 10, W.merah), kartu("jn", 200, 166, 90, 28, W.merahMuda, ["sudut tumpul"], 8.6)),
    ),
    k(
      "Periksa dengan busur: kaki ketiga tepat di angka 165. Dua cara memberi hasil yang sama, jadi gambar kita benar.",
      tambah("busur:", busurDerajat("bd", CX, CY, 100, "kanan", false, { z: 0 })),
      tambah("tepat", bulat("td", ...ujung(CX, CY, 165, 98), 3.4, W.merah, undefined, { z: 7 })),
      tambah("benar.", baris("ck", 196, 40, 98, "✓ tepat di 165", W.hijauMuda, 7.6, 18)),
    ),
  ],
};

/* ------------------------------ LB4. Estimate-Then-Verify: konsep ------------------------------ */
const EX = 150;
const EY = 170;
export const ADEGAN_LUAR_PERKIRAAN: AdeganStory = {
  id: "luard-perkiraan",
  judul: "Estimate-Then-Verify: perkirakan lalu periksa",
  sumber: "Metode luar; perkiraan dan pemeriksaan sudut",
  latar: "#EFF6FF",
  ketukan: [
    k(
      "Estimate-Then-Verify artinya perkirakan dulu, baru periksa. Sebelum memakai busur, kita menebak ukuran sudut dengan patokan 90 dan 180 derajat.",
      tambah(0, jud("Estimate-Then-Verify", 20, 11)),
      tambah("menebak", emo("ev", 150, 100, "🤔", 40)),
      tambah("patokan", teks("ev1", 80, 160, "patokan 90°", 10, W.hijau), teks("ev2", 220, 160, "patokan 180°", 10, W.merah)),
    ),
    k(
      "Patokannya: kurang dari 90 derajat berarti lancip, tepat 90 siku-siku, dan antara 90 dan 180 tumpul. Dari situ kita menebak kira-kira di mana kaki kedua berada.",
      bersih(0),
      tambah(0, jud("Zona perkiraan", 20, 11)),
      tambah("lancip,", juring("z1", EX, EY, 0, 90, 100, W.hijauMuda, W.biru), teks("zt1", 195, 110, "lancip", 9, W.hijau)),
      tambah("tumpul.", juring("z2", EX, EY, 90, 180, 100, W.merahMuda, W.biru), teks("zt2", 105, 110, "tumpul", 9, W.merah)),
      tambah("tepat", sinar("z3", EX, EY, 90, 108, W.biru, 2), teks("zt3", 160, 72, "90° siku-siku", 8, W.biru, { anchor: "start" })),
    ),
    k(
      "Setelah melukis, periksa: apakah jenis sudut yang tergambar sesuai tebakan? Jika sudut yang diminta tumpul tetapi gambar lancip, pasti ada kesalahan membaca skala.",
      bersih(0),
      tambah(0, jud("Cocokkan dengan tebakan", 20, 11)),
      tambah("tebakan?", kartu("vb1", 20, 44, 120, 50, W.krem, ["tebakan:", "tumpul"], 9.4)),
      tambah("gambar", kartu("vb2", 160, 44, 120, 50, W.merahMuda, ["gambar:", "lancip"], 9.4)),
      tambah("pasti", teks("vb3", 150, 130, "tidak cocok: baca ulang skala", 10, W.merah), teks("vb4", 150, 160, "✗", 22, W.merah)),
    ),
    k(
      "Pemeriksaan ini menangkap kesalahan membaca skala dalam dan luar, seperti sudut 120 derajat yang tergambar 60 derajat.",
      bersih(0),
      tambah(0, jud("Contoh kesalahan terdeteksi", 20, 11)),
      tambah("sudut", sudut("w", 80, 160, 0, 60, 90, 24, W.biru, W.merah), teks("wL", 112, 140, "60°", 10, W.merah)),
      tambah("120", sudut("b", 230, 160, 0, 120, 60, 18, W.biru, W.hijau), teks("bL", 245, 130, "120°", 10, W.hijau)),
      tambah("tergambar", teks("wk1", 80, 190, "tergambar ✗", 8.6, W.merah), teks("bk1", 230, 190, "diminta ✓", 8.6, W.hijau)),
    ),
  ],
};

/* ------------------------------ LB4t. Sudut 140 derajat: perkirakan lalu periksa ------------------------------ */
const FX = 100;
const FY = 160;
export const ADEGAN_LUAR_PERKIRAAN_TERAPAN: AdeganStory = {
  id: "luard-perkiraan-terapan",
  judul: "Estimate-Then-Verify: sudut 140 derajat",
  sumber: "Metode luar; penerapan pada Ayo Berlatih 1e",
  latar: "#EFF6FF",
  ketukan: [
    k(
      "Terapkan pada gambar e, sudut 140 derajat. Tebakan: 140 lebih besar dari 90, jadi tumpul. Selisihnya dari 180 hanya 40, jadi kaki kedua dekat dengan garis lurus.",
      tambah(0, jud("Perkirakan: sudut 140°", 20, 11)),
      tambah("tebakan:", teks("e1", 232, 60, "140 - 90 = 50", 10, W.biru), teks("e2", 232, 80, "tumpul", 9, W.merah)),
      tambah("Selisihnya", teks("e3", 232, 110, "180 - 140 = 40", 10, W.biru)),
      tambah("dekat", titikSudut("v", FX, FY, W.biru, 3.2), sinar("r1", FX, FY, 0, 110, W.biru, 2.4)),
    ),
    k(
      "Perkiraan: kaki kedua berada sedikit di bawah posisi garis lurus. Kita gambar kasar dulu dengan pensil, tanpa busur.",
      tambah("Kita", sinar("pr", FX, FY, 150, 110, W.abu, 1.8, { putus: true, z: 3 }), teks("prt", 60, 80, "perkiraan kasar", 8.2, W.abu)),
    ),
    k(
      "Lalu ukur dengan busur: tandai angka 140, hubungkan dengan titik sudut. Hasilnya cukup dekat dengan perkiraan, yaitu sudut tumpul.",
      hapus(0, "pr", "prt"),
      tambah("busur:", busurDerajat("bd", FX, FY, 90, "kanan", false, { z: 0 })),
      tambah("hubungkan", bulat("td", ...ujung(FX, FY, 140, 88), 3.4, W.merah, undefined, { z: 7 }), sinar("r2", FX, FY, 140, 110, W.biru, 2.4, { z: 5, gambar: true })),
    ),
    k(
      "Verifikasi terakhir: hasilnya tumpul, lebih besar dari 90, dan 40 derajat kurang dari garis lurus. Jadi gambar kita lolos pemeriksaan.",
      hapus(0, ids(busurDerajat("bd", FX, FY, 90, "kanan", false))),
      tambah("hasilnya", busurSudut("ar", FX, FY, 0, 140, 24, W.merah, 1.8, { z: 6 }), teks("rL", 125, 130, "140°", 10, W.merah)),
      tambah("kurang", teks("e4", 232, 140, "140 + 40 = 180", 10, W.hijau), baris("ck", 190, 160, 100, "✓ lolos pemeriksaan", W.hijauMuda, 7.6, 18)),
    ),
  ],
};

/* ------------------------------ LB5. Ringkasan ------------------------------ */
export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luard-ringkas",
  judul: "Ringkasan empat metode luar melukis sudut",
  sumber: "Ringkasan metode luar; empat metode dan angka dari buku",
  latar: "#EEF2FF",
  ketukan: [
    k(
      "Ringkasan metode luar untuk melukis sudut. Empat metode saling melengkapi, dan semuanya memakai angka dari Ayo Berlatih.",
      tambah(0, jud("Ringkasan empat metode", 22, 12)),
      tambah("Empat", emo("rg", 150, 100, "🧰", 44)),
    ),
    k(
      "Constructing Angles Protocol memberi urutan langkah, dipakai pada sudut 52 derajat. Protractor Construction menjaga pembacaan busur, dipakai pada sudut 110 derajat.",
      bersih(0),
      tambah(0, jud("Urutan dan busur", 22, 12)),
      tambah("Constructing", kartu("rk1", 15, 44, 270, 46, W.krem, ["Constructing Angles Protocol", "urutan langkah · 52°"], 8.8)),
      tambah("Protractor", kartu("rk2", 15, 104, 270, 46, W.merahMuda, ["Protractor Construction", "baca busur benar · 110°"], 8.8)),
    ),
    k(
      "Angle Addition Construction menyusun sudut dari patokan, dipakai pada sudut 165 derajat. Estimate-Then-Verify memeriksa hasil, dipakai pada sudut 140 derajat.",
      bersih(0),
      tambah(0, jud("Patokan dan pemeriksaan", 22, 12)),
      tambah("Angle", kartu("rk3", 15, 44, 270, 46, W.hijauMuda, ["Angle Addition Construction", "susun dari patokan · 165°"], 8.8)),
      tambah("Estimate-Then-Verify", kartu("rk4", 15, 104, 270, 46, W.muda, ["Estimate-Then-Verify", "perkirakan lalu periksa · 140°"], 8.8)),
    ),
    k(
      "Pakai keempatnya bersama: lukis dengan protokol, baca busur dengan benar, susun dari patokan bila perlu, lalu perkirakan dan periksa hasilnya.",
      bersih(0),
      tambah(0, jud("Pakai bersama", 22, 12)),
      tambah("lukis", baris("pb1", 40, 40, 220, "1. lukis dengan protokol", W.putih, 9, 24)),
      tambah("baca", baris("pb2", 40, 72, 220, "2. baca busur dengan benar", W.putih, 9, 24)),
      tambah("susun", baris("pb3", 40, 104, 220, "3. susun dari patokan bila perlu", W.putih, 9, 24)),
      tambah("perkirakan", baris("pb4", 40, 136, 220, "4. perkirakan dan periksa", W.hijauMuda, 9, 24)),
    ),
  ],
};
