import type { AdeganStory } from "./logika-story";
import { OWL, W, anak, benda, bola, emo, judul, kartu, kotakBenda, panah, teks } from "./k2b4A-gambar";
import { bersih, hapus, idx, k, redamkan, sorotkan, tambah, ubah } from "./k2b4A-bantu";

const KATA_ENAM = ["atas", "bawah", "depan", "belakang", "kanan", "kiri"];
/** Kartu kata posisi `kw0..kw5` (dua kolom, tiga baris): baris pertama atas-bawah, kedua depan-belakang, ketiga kanan-kiri. */
const kartuKata = (i: number) => kartu(`kw${i}`, i % 2 === 0 ? 40 : 160, 34 + Math.floor(i / 2) * 46, 100, 34, [W.hijauMuda, W.pink, W.langit][Math.floor(i / 2)], [KATA_ENAM[i]], 14);

/* ------------------------------ 2. Taman Kira dan enam kata posisi ------------------------------ */
const SUARA_T1 = "Hari ini Kira berjalan-jalan di taman di layar. Di sana ada burung, kupu-kupu, dan bunga. Taman itu indah sekali.";
const SUARA_T2 = "Kira ingin menceritakan letak setiap benda, supaya semua orang mengerti. Untuk itu, kita memakai kata posisi.";
const SUARA_T3 = "Ada enam kata posisi. Atas, bawah, depan, belakang, kanan, dan kiri.";
const SUARA_T4 = "Enam kata ini berpasangan. Atas dengan bawah, depan dengan belakang, kanan dengan kiri.";
const SUARA_T5 = "Dengan enam kata ini, kita bisa menceritakan di mana benda berada.";

export const ADEGAN_CERITA_TAMAN: AdeganStory = {
  id: "cerita-taman",
  judul: "Taman Kira dan enam kata posisi",
  sumber: "Materi: taman Kira dan kata posisi",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Taman Kira")),
      tambah(idx(SUARA_T1, "burung,"), benda("burung", 70, 76, 36)),
      tambah(idx(SUARA_T1, "kupu-kupu,"), benda("kupu", 160, 56, 36)),
      tambah(idx(SUARA_T1, "bunga."), benda("bunga", 236, 124, 36)),
    ),
    k(SUARA_T2, sorotkan(idx(SUARA_T2, "letak"), "ob-burung", "ob-kupu", "ob-bunga"), tambah(idx(SUARA_T2, "posisi."), ...kartu("kp", 80, 158, 140, 28, W.emas, ["kata posisi"], 13))),
    k(
      SUARA_T3,
      bersih(0),
      tambah(0, judul("Enam kata posisi")),
      tambah(idx(SUARA_T3, "Atas,"), ...kartuKata(0)),
      tambah(idx(SUARA_T3, "bawah,"), ...kartuKata(1)),
      tambah(idx(SUARA_T3, "depan,"), ...kartuKata(2)),
      tambah(idx(SUARA_T3, "belakang,"), ...kartuKata(3)),
      tambah(idx(SUARA_T3, "kanan,"), ...kartuKata(4)),
      tambah(idx(SUARA_T3, "kiri."), ...kartuKata(5)),
    ),
    k(
      SUARA_T4,
      tambah(idx(SUARA_T4, "Atas"), teks("sp0", 150, 57, "↔", 16, W.merah)),
      tambah(idx(SUARA_T4, "depan"), teks("sp1", 150, 103, "↔", 16, W.merah)),
      tambah(idx(SUARA_T4, "kanan"), teks("sp2", 150, 149, "↔", 16, W.merah)),
    ),
    k(SUARA_T5, sorotkan(idx(SUARA_T5, "enam"), ...KATA_ENAM.map((_, i) => `kw${i}-k`)), tambah(idx(SUARA_T5, "berada."), emo("ow", 150, 196, OWL, 16))),
  ],
};

/* ------------------------------ 3. Atas dan bawah ------------------------------ */
const SUARA_A1 = "Lihat gambar ini. Ada kupu-kupu, dan ada bunga. Di mana letak mereka?";
const SUARA_A2 = "Kupu-kupu hinggap di atas bunga. Letak kupu-kupu lebih tinggi daripada bunga.";
const SUARA_A3 = "Bunga ada di bawah kupu-kupu. Letak bunga lebih rendah daripada kupu-kupu.";
const SUARA_A4 = "Jadi atas dan bawah adalah dua kata yang berlawanan. Kalau yang satu kita tahu, yang lain pasti ketemu.";
const SUARA_A5 = "Kalau kupu-kupu terbang lebih tinggi, kupu-kupu tetap ada di atas bunga.";

export const ADEGAN_ATAS_BAWAH: AdeganStory = {
  id: "atas-bawah",
  judul: "Atas dan bawah",
  sumber: "Materi: atas dan bawah",
  latar: "#F0F9FF",
  ketukan: [
    k(SUARA_A1, tambah(0, judul("Atas dan bawah")), tambah(idx(SUARA_A1, "kupu-kupu,"), benda("kupu", 150, 62, 34)), tambah(idx(SUARA_A1, "bunga."), benda("bunga", 150, 128, 34))),
    k(
      SUARA_A2,
      sorotkan(idx(SUARA_A2, "hinggap"), "ob-kupu"),
      tambah(idx(SUARA_A2, "bunga."), ...kartu("kal0", 12, 172, 130, 24, W.krem, ["kupu-kupu di atas bunga"], 9)),
      tambah(idx(SUARA_A2, "tinggi"), panah("pa1", 215, 128, 0, -60)),
    ),
    k(
      SUARA_A3,
      redamkan(idx(SUARA_A3, "bawah"), "ob-kupu"),
      sorotkan(idx(SUARA_A3, "bawah"), "ob-bunga"),
      tambah(idx(SUARA_A3, "kupu-kupu."), ...kartu("kal1", 158, 172, 130, 24, W.krem, ["bunga di bawah kupu-kupu"], 9)),
      tambah(idx(SUARA_A3, "rendah"), panah("pa2", 85, 66, 0, 60)),
    ),
    k(SUARA_A4, redamkan(0, "ob-bunga"), tambah(idx(SUARA_A4, "berlawanan."), teks("lw0", 256, 104, "↕", 28, W.merah), teks("lw1", 256, 126, "berlawanan", 8.6, W.ungu))),
    k(SUARA_A5, hapus(0, "pa1", "pa2"), ubah(idx(SUARA_A5, "tinggi,"), { id: "ob-kupu", y: 40 + 0.35 * 34 }), sorotkan(idx(SUARA_A5, "tetap"), "ob-kupu")),
  ],
};

/* ------------------------------ 4. Depan dan belakang ------------------------------ */
const SUARA_D1 = "Sekarang kita lihat depan dan belakang. Perhatikan sebuah kotak dan sebuah bola. Bola itu terlihat lebih dekat dengan kita.";
const SUARA_D2 = "Bola menutupi sebagian kotak. Jadi bola ada di depan kotak.";
const SUARA_D3 = "Kotak tertutup oleh bola. Jadi kotak ada di belakang bola.";
const SUARA_D4 = "Benda yang menutupi benda lain ada di depan. Benda yang tertutup ada di belakang.";
const SUARA_D5 = "Sekarang lihat burung dan ulat. Burung ada di depan ulat, jadi ulat ada di belakang burung.";

export const ADEGAN_DEPAN_BELAKANG: AdeganStory = {
  id: "depan-belakang",
  judul: "Depan dan belakang",
  sumber: "Materi: depan dan belakang",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_D1, tambah(0, judul("Depan dan belakang")), tambah(idx(SUARA_D1, "kotak"), kotakBenda(140, 100, 60, 50)), tambah(idx(SUARA_D1, "bola."), bola(158, 118, 14, { z: 2 }))),
    k(SUARA_D2, sorotkan(idx(SUARA_D2, "menutupi"), "ob-bola"), tambah(idx(SUARA_D2, "depan"), ...kartu("kal0", 12, 172, 130, 24, W.krem, ["bola di depan kotak"], 9))),
    k(SUARA_D3, redamkan(idx(SUARA_D3, "tertutup"), "ob-bola"), sorotkan(idx(SUARA_D3, "tertutup"), "ob-kotak"), tambah(idx(SUARA_D3, "belakang"), ...kartu("kal1", 158, 172, 130, 24, W.krem, ["kotak di belakang bola"], 9))),
    k(SUARA_D4, redamkan(0, "ob-kotak"), tambah(idx(SUARA_D4, "menutupi"), teks("mt", 66, 56, "menutupi: depan", 9, W.merah)), tambah(idx(SUARA_D4, "tertutup"), teks("tt", 232, 56, "tertutup: belakang", 9, W.ungu))),
    k(
      SUARA_D5,
      bersih(0),
      tambah(0, judul("Burung dan ulat")),
      tambah(idx(SUARA_D5, "ulat."), benda("ulat", 138, 108, 30, { z: 1 })),
      tambah(idx(SUARA_D5, "Burung"), benda("burung", 156, 124, 34, { z: 2 })),
      sorotkan(idx(SUARA_D5, "depan"), "ob-burung"),
      tambah(idx(SUARA_D5, "belakang"), ...kartu("kal0", 60, 172, 180, 24, W.krem, ["ulat di belakang burung"], 9)),
    ),
  ],
};

/* ------------------------------ 5. Kanan dan kiri ------------------------------ */
const SUARA_K1 = "Sekarang kita lihat kanan dan kiri. Ada burung dan ada rumput. Keduanya berdiri sejajar.";
const SUARA_K2 = "Burung berdiri di sebelah kiri rumput.";
const SUARA_K3 = "Rumput ada di sebelah kanan burung.";
const SUARA_K4 = "Kanan dan kiri kita lihat dari arah kita yang melihat gambar. Jangan sampai tertukar.";
const SUARA_K5 = "Kalau burung pindah ke sisi kanan rumput, burung ada di sebelah kanan rumput.";

export const ADEGAN_KANAN_KIRI: AdeganStory = {
  id: "kanan-kiri",
  judul: "Kanan dan kiri",
  sumber: "Materi: kanan dan kiri",
  latar: "#FAF5FF",
  ketukan: [
    k(SUARA_K1, tambah(0, judul("Kanan dan kiri")), tambah(idx(SUARA_K1, "burung"), benda("burung", 85, 104, 42)), tambah(idx(SUARA_K1, "rumput."), benda("rumput", 215, 104, 42))),
    k(SUARA_K2, sorotkan(idx(SUARA_K2, "berdiri"), "ob-burung"), tambah(idx(SUARA_K2, "rumput."), ...kartu("kal0", 12, 172, 130, 24, W.krem, ["burung di kiri rumput"], 9))),
    k(SUARA_K3, redamkan(idx(SUARA_K3, "ada"), "ob-burung"), sorotkan(idx(SUARA_K3, "ada"), "ob-rumput"), tambah(idx(SUARA_K3, "burung."), ...kartu("kal1", 158, 172, 130, 24, W.krem, ["rumput di kanan burung"], 9))),
    k(
      SUARA_K4,
      redamkan(0, "ob-rumput"),
      tambah(idx(SUARA_K4, "arah"), emo("mt", 150, 54, "\u{1F440}", 24)),
      tambah(idx(SUARA_K4, "kiri"), teks("sk", 44, 46, "sisi kiri kita", 9, W.merah)),
      tambah(idx(SUARA_K4, "kanan"), teks("sn", 256, 46, "sisi kanan kita", 9, W.merah)),
    ),
    k(
      SUARA_K5,
      hapus(0, "kal0-k", "kal0-t0", "kal1-k", "kal1-t0"),
      ubah(idx(SUARA_K5, "pindah"), { id: "ob-burung", x: 268 }),
      tambah(idx(SUARA_K5, "burung", 2), ...kartu("kal2", 80, 172, 140, 24, W.krem, ["burung di kanan rumput"], 9)),
    ),
  ],
};

/* ------------------------------ 6. Pasangan kata berlawanan ------------------------------ */
const SUARA_P1 = "Kata posisi selalu berpasangan. Setiap pasangan punya dua kata yang berlawanan. Kita akan melihat tiga contoh.";
const SUARA_P2 = "Atas dengan bawah, depan dengan belakang, dan kanan dengan kiri.";
const SUARA_P3 = "Contoh pertama. Bola ada di atas kotak, jadi kotak ada di bawah bola.";
const SUARA_P4 = "Contoh kedua. Mobil-mobilan ada di depan kursi, jadi kursi ada di belakang mobil-mobilan.";
const SUARA_P5 = "Contoh ketiga. Kira ada di sebelah kanan Halim, jadi Halim ada di sebelah kiri Kira.";
const SUARA_P6 = "Jika benda pertama ada di sebelah kiri benda kedua, benda kedua pasti ada di sebelah kanan benda pertama.";
const PASANG = ["atas ↔ bawah", "depan ↔ belakang", "kanan ↔ kiri"];

export const ADEGAN_PASANGAN: AdeganStory = {
  id: "pasangan",
  judul: "Pasangan kata berlawanan",
  sumber: "Materi: pasangan kata berlawanan",
  latar: "#FFFBEB",
  ketukan: [
    k(SUARA_P1, tambah(0, judul("Kata yang berlawanan")), tambah(idx(SUARA_P1, "berpasangan."), teks("ber", 150, 118, "↔", 64, W.merah))),
    k(
      SUARA_P2,
      bersih(0),
      tambah(0, judul("Tiga pasangan")),
      tambah(idx(SUARA_P2, "Atas"), ...kartu("pr0", 40, 34, 220, 36, W.hijauMuda, [PASANG[0]], 14)),
      tambah(idx(SUARA_P2, "depan"), ...kartu("pr1", 40, 80, 220, 36, W.pink, [PASANG[1]], 14)),
      tambah(idx(SUARA_P2, "kanan"), ...kartu("pr2", 40, 126, 220, 36, W.langit, [PASANG[2]], 14)),
    ),
    k(
      SUARA_P3,
      bersih(0),
      tambah(0, judul("Atas dan bawah")),
      tambah(idx(SUARA_P3, "kotak,"), kotakBenda(150, 138, 64, 40)),
      tambah(idx(SUARA_P3, "Bola"), bola(150, 80, 13)),
      tambah(idx(SUARA_P3, "atas"), ...kartu("kal0", 12, 174, 130, 24, W.krem, ["bola di atas kotak"], 9)),
      tambah(idx(SUARA_P3, "bawah"), ...kartu("kal1", 158, 174, 130, 24, W.krem, ["kotak di bawah bola"], 9)),
    ),
    k(
      SUARA_P4,
      bersih(0),
      tambah(0, judul("Depan dan belakang")),
      tambah(idx(SUARA_P4, "kursi,"), benda("kursi", 140, 100, 46, { z: 1 })),
      tambah(idx(SUARA_P4, "Mobil-mobilan"), benda("mobil", 160, 122, 38, { z: 2 })),
      tambah(idx(SUARA_P4, "depan"), ...kartu("kal0", 6, 174, 140, 24, W.krem, ["mobil-mobilan di depan kursi"], 7.6)),
      tambah(idx(SUARA_P4, "belakang"), ...kartu("kal1", 154, 174, 140, 24, W.krem, ["kursi di belakang mobil-mobilan"], 7.6)),
    ),
    k(
      SUARA_P5,
      bersih(0),
      tambah(0, judul("Kanan dan kiri")),
      tambah(idx(SUARA_P5, "Kira"), ...anak("kira", 195, 84)),
      tambah(idx(SUARA_P5, "Halim,"), ...anak("halim", 105, 84)),
      tambah(idx(SUARA_P5, "kanan"), ...kartu("kal0", 12, 172, 130, 24, W.krem, ["Kira di kanan Halim"], 9)),
      tambah(idx(SUARA_P5, "kiri"), ...kartu("kal1", 158, 172, 130, 24, W.krem, ["Halim di kiri Kira"], 9)),
    ),
    k(SUARA_P6, tambah(idx(SUARA_P6, "Jika"), ...kartu("lk", 30, 148, 240, 20, W.emas, ["kiri lawannya kanan"], 10))),
  ],
};
