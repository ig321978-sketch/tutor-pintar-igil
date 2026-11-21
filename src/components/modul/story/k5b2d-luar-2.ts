import type { AdeganStory } from "./logika-story";
import { E, NAMA_METODE, NAMA_METODE_ID, W, WARNA_METODE, deretKue, emo, judul, kardus, kartu, kotak, kue, lantai, panah, teks, tokoh } from "./k5b2d-gambar";
import { bersih, hapus, k, pudarkan, sorotkan, tambah, ubah } from "./k5b2d-bantu";

/*
 * Cerita orisinal IGIL "Kotak Bingkisan Pak Joko" (Kelas 5 Bab 2 Sub-Bab D), Pasar Kuliner Malam.
 * Video kedua: tiga metode global (Two Lists, Share Equally, Biggest Match), terpisah dari video materi.
 * Naskah suara dari naskah/story-naskah-k5b2d.md. Bagian ini: Share Equally (konsep dan terapan Citra), Biggest Match (konsep dan terapan Fajar), dan ringkasan.
 */

/* ------------------------------ Share Equally: konsep ------------------------------ */
const SUARA_BAGI1 = "Cara kedua, Share Equally, atau Bagi Sama Rata.";
const SUARA_BAGI2 = "Kita membayangkan benda dibagi ke beberapa wadah, dengan isi tiap jenis yang sama.";
const SUARA_BAGI3 = "Banyak wadah harus bisa membagi semua jenis benda tanpa sisa.";
const SUARA_BAGI4 = "Kita mencoba banyak wadah yang besar dulu, lalu turun sampai tidak ada sisa.";

const X_WADAH = [40, 120, 200];

export const ADEGAN_LUAR_BAGI: AdeganStory = {
  id: "luar-bagi",
  judul: "Cara kedua: bagi sama rata",
  sumber: "Metode global: Share Equally, konsep",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_BAGI1,
      tambah(0, judul("Share Equally"), ...lantai("lt", 150), ...tokoh("pj", 262, 184, "Pak Joko")),
      tambah("kedua", emo("tg", 40, 74, E.hadiah, 26), teks("n1", 40, 96, "cara 2", 9, W.coklat)),
      tambah("Share", ...kartu("m", 70, 44, 190, 64, "#DCFCE7", [NAMA_METODE[1], NAMA_METODE_ID[1]], 12)),
      tambah("Rata", emo("sa", 150, 134, E.kilau, 16)),
    ),
    k(
      SUARA_BAGI2,
      bersih(0),
      tambah(0, judul("Bagi ke Wadah"), ...lantai("lt", 150), ...tokoh("pj", 262, 184, "Pak Joko")),
      tambah("benda", ...deretKue("kl", 50, 46, 6, "klepon", 6, 12), ...deretKue("od", 140, 46, 3, "onde", 3, 12)),
      tambah("wadah", ...X_WADAH.flatMap((x, i) => kardus(`w${i}`, x, 88, 56, 40))),
      tambah("isi", ...X_WADAH.flatMap((x, i) => [kue(`kq${i}0`, x + 16, 102, "klepon"), kue(`kq${i}1`, x + 28, 102, "klepon"), kue(`oq${i}`, x + 22, 114, "onde")])),
    ),
    k(
      SUARA_BAGI3,
      tambah("wadah", teks("e1", 80, 68, "6 klepon : 3 = 2", 9, W.hijauTua)),
      tambah("semua", teks("e2", 220, 68, "3 onde-onde : 3 = 1", 9, W.onde)),
      tambah("sisa", teks("ts", 150, 144, "tanpa sisa", 10, W.hijauTua), emo("ok", 200, 144, E.benar, 16)),
    ),
    k(
      SUARA_BAGI4,
      bersih(0),
      tambah(0, judul("Coba dari yang Besar"), ...lantai("lt", 150), ...tokoh("pj", 262, 184, "Pak Joko")),
      tambah("besar", kotak("rb4", 30, 46, 180, 24, "#FEE2E2", W.merah, { rx: 4, z: 1 }), teks("r4", 120, 62, "4 wadah: ada sisa", 11, W.merahTua, { z: 2 }), emo("x4", 232, 62, E.salah, 18)),
      tambah("turun", panah("pn", 120, 74, 0, 18, W.biru, 2.4, { z: 3 })),
      tambah("tidak", kotak("rb3", 30, 96, 180, 24, "#DCFCE7", W.hijau, { rx: 4, z: 1 }), teks("r3", 120, 112, "3 wadah: tanpa sisa", 11, W.hijauTua, { z: 2 }), emo("x3", 232, 112, E.benar, 18)),
      tambah("sisa", teks("bn", 130, 144, "6 klepon dan 3 onde-onde", 9, W.coklat)),
    ),
  ],
};

/* ------------------------------ Share Equally: terapan Citra ------------------------------ */
const SUARA_BAGIT1 = "Citra membagi tiga puluh enam susu kotak dan empat puluh delapan lolipop ke bungkusan bingkisan.";
const SUARA_BAGIT2 = "Ia mencoba dua belas bungkusan: tiga susu kotak dan empat lolipop tiap bungkusan, tanpa sisa.";
const SUARA_BAGIT3 = "Cocok untuk cerita pembagian, karena hasilnya langsung terlihat sebagai isi tiap wadah.";
const SUARA_BAGIT4 = "Kurang cocok kalau hanya diberi dua bilangan polos, karena kita harus membayangkan bendanya.";

const BUNGKUS = Array.from({ length: 12 }, (_, i) => kardus(`bk${i}`, 30 + (i % 6) * 38, 46 + Math.floor(i / 6) * 32, 30, 22)).flat();
const ID_BUNGKUS = Array.from({ length: 12 }, (_, i) => [`bk${i}`, `bk${i}-p`]).flat();

export const ADEGAN_LUAR_BAGI_TERAPAN: AdeganStory = {
  id: "luar-bagi-terapan",
  judul: "Citra membagi bingkisan",
  sumber: "Metode global: Share Equally, terapan Citra",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_BAGIT1,
      tambah(0, judul("Citra Membagi Bingkisan"), ...lantai("lt", 150)),
      tambah("Citra", ...tokoh("ci", 262, 184, "Citra")),
      tambah("susu", kotak("sb", 20, 44, 260, 28, "#DBEAFE", W.biru, { rx: 5, z: 1 }), teks("s36", 150, 63, "36 susu kotak", 11, W.biru, { z: 2 })),
      tambah("lolipop", kotak("lb", 20, 82, 260, 28, "#FEE2E2", W.merah, { rx: 5, z: 1 }), teks("l48", 150, 101, "48 lolipop", 11, W.merahTua, { z: 2 })),
      tambah("bungkusan", ...kardus("pk", 120, 122, 60, 22), teks("tb", 150, 137, "bingkisan", 8.5, W.coklat, { z: 3 })),
    ),
    k(
      SUARA_BAGIT2,
      bersih(0),
      tambah(0, judul("Dua Belas Bungkusan"), ...lantai("lt", 150), ...tokoh("ci", 262, 184, "Citra")),
      tambah("dua", ...BUNGKUS, teks("c12", 150, 38, "12 bungkusan", 9.5, W.coklat)),
      tambah("tiga", teks("e36", 90, 118, "36 : 12 = 3", 10.5, W.biru)),
      tambah("empat", teks("e48", 210, 118, "48 : 12 = 4", 10.5, W.merahTua)),
      tambah("sisa", teks("ts", 150, 138, "tanpa sisa", 10, W.hijauTua), emo("ok", 205, 138, E.benar, 16)),
    ),
    k(
      SUARA_BAGIT3,
      sorotkan("hasilnya", ...ID_BUNGKUS),
      tambah("isi", ...kartu("zm", 100, 152, 100, 34, "#FEF9C3", ["3 susu + 4 lolipop"], 8.5)),
      tambah("Cocok", emo("ok2", 276, 70, E.jempol, 20)),
    ),
    k(
      SUARA_BAGIT4,
      bersih(0),
      tambah(0, judul("Hanya Dua Bilangan"), ...lantai("lt", 150), ...tokoh("ci", 262, 184, "Citra")),
      tambah("Kurang", emo("x1", 150, 140, E.salah, 20)),
      tambah("dua", ...kartu("p36", 60, 44, 80, 60, "#F1F5F9", ["36"], 34), ...kartu("p48", 160, 44, 80, 60, "#F1F5F9", ["48"], 34)),
      tambah("membayangkan", emo("pk", 150, 90, E.pikir, 24)),
    ),
  ],
};

/* ------------------------------ Biggest Match: konsep ------------------------------ */
const SUARA_TERBESAR1 = "Cara ketiga, Biggest Match, atau Terbesar yang Sama.";
const SUARA_TERBESAR2 = "Kita memeriksa faktor dari yang paling besar, lalu turun ke yang lebih kecil.";
const SUARA_TERBESAR3 = "Faktor pertama yang membagi kedua bilangan adalah FPB.";
const SUARA_TERBESAR4 = "Kita berhenti di sana, karena yang lebih kecil pasti bukan yang terbesar.";

const BATANG = [0, 1, 2, 3].map((i) => kotak(`bs${i}`, 30 + i * 60, 60 + i * 20, 50, 80 - i * 20, ["#FCA5A5", "#FDBA74", "#FDE68A", "#BBF7D0"][i], W.biru, { rx: 3, z: 1 }));

export const ADEGAN_LUAR_TERBESAR: AdeganStory = {
  id: "luar-terbesar",
  judul: "Cara ketiga: terbesar yang sama",
  sumber: "Metode global: Biggest Match, konsep",
  latar: "#FEFCE8",
  ketukan: [
    k(
      SUARA_TERBESAR1,
      tambah(0, judul("Biggest Match"), ...lantai("lt", 150), ...tokoh("pj", 262, 184, "Pak Joko")),
      tambah("ketiga", emo("tg", 40, 74, E.bintang, 26), teks("n1", 40, 96, "cara 3", 9, W.coklat)),
      tambah("Biggest", ...kartu("m", 70, 44, 190, 64, "#FEF9C3", [NAMA_METODE[2], NAMA_METODE_ID[2]], 12)),
      tambah("Terbesar", emo("sa", 150, 134, E.kilau, 16)),
    ),
    k(
      SUARA_TERBESAR2,
      bersih(0),
      tambah(0, judul("Dari Besar ke Kecil"), ...lantai("lt", 150), ...tokoh("pj", 262, 184, "Pak Joko")),
      tambah("memeriksa", ...BATANG),
      tambah("besar", teks("tb", 55, 54, "terbesar", 9, W.merahTua)),
      tambah("turun", panah("pn", 50, 146, 180, 0, W.biru, 2.4, { z: 3 }), teks("tr", 140, 160, "turun satu-satu", 9, W.coklat)),
      tambah("kecil", teks("tk", 235, 114, "terkecil", 9, W.hijauTua)),
    ),
    k(
      SUARA_TERBESAR3,
      ubah("pertama", { id: "bs0", warna: "#FECACA" }, { id: "bs1", warna: "#FECACA" }),
      tambah("membagi", emo("ok", 145, 92, E.benar, 18)),
      tambah("FPB", teks("fq", 145, 78, "FPB", 11, W.merah)),
    ),
    k(
      SUARA_TERBESAR4,
      tambah("berhenti", emo("st", 145, 44, E.tangan, 22)),
      pudarkan("kecil", "bs3", "tk"),
      tambah("bukan", emo("x1", 235, 100, E.salah, 18)),
    ),
  ],
};

/* ------------------------------ Biggest Match: terapan Fajar ------------------------------ */
const SUARA_TERBESART1 = "Fajar mencari FPB dua belas dan empat puluh dua.";
const SUARA_TERBESART2 = "Ia mencoba dua belas, enam, lalu berhenti karena enam membagi keduanya.";
const SUARA_TERBESART3 = "Cocok untuk bilangan yang satu lebih kecil, karena kita mulai dari faktor bilangan kecil.";
const SUARA_TERBESART4 = "Kurang cocok kalau kita lupa urutan, karena faktornya harus dicoba dari yang terbesar.";

export const ADEGAN_LUAR_TERBESAR_TERAPAN: AdeganStory = {
  id: "luar-terbesar-terapan",
  judul: "Fajar mencari FPB",
  sumber: "Metode global: Biggest Match, terapan Fajar",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_TERBESART1,
      tambah(0, judul("Fajar Mencari FPB"), ...lantai("lt", 150)),
      tambah("Fajar", ...tokoh("fa", 262, 184, "Fajar")),
      tambah("FPB", teks("fq", 150, 134, "FPB = ?", 13, W.merah)),
      tambah("dua", ...kartu("n12", 40, 46, 80, 60, "#FEF3C7", ["12"], 34)),
      tambah("empat", ...kartu("n42", 170, 46, 80, 60, "#DBEAFE", ["42"], 34)),
    ),
    k(
      SUARA_TERBESART2,
      bersih(0),
      tambah(0, judul("Mencoba dari Besar"), ...lantai("lt", 150), ...tokoh("fa", 262, 184, "Fajar")),
      tambah("dua", kotak("rb12", 20, 40, 220, 30, "#FEE2E2", W.merah, { rx: 4, z: 1 }), teks("r12", 130, 60, "12: tidak habis untuk 42", 10, W.merahTua, { z: 2 }), emo("x12", 262, 56, E.salah, 18)),
      tambah("enam", kotak("rb6", 20, 86, 220, 30, "#DCFCE7", W.hijau, { rx: 4, z: 1 }), teks("r6", 130, 106, "6: habis untuk 12 dan 42", 10, W.hijauTua, { z: 2 })),
      tambah("berhenti", emo("st", 130, 136, E.tangan, 20)),
      tambah("membagi", emo("x6", 262, 102, E.benar, 18)),
    ),
    k(
      SUARA_TERBESART3,
      bersih(0),
      tambah(0, judul("Mulai dari yang Kecil"), ...lantai("lt", 150), ...tokoh("fa", 262, 184, "Fajar")),
      tambah("Cocok", emo("ok", 262, 60, E.benar, 20)),
      tambah("satu", ...kartu("n42", 190, 44, 60, 40, "#DBEAFE", ["42"], 24)),
      tambah("kecil", ...kartu("n12", 50, 44, 60, 40, "#FEF3C7", ["12"], 24)),
      tambah("faktor", teks("mt", 100, 118, "mulai dari faktor 12", 10, W.coklat)),
    ),
    k(
      SUARA_TERBESART4,
      bersih(0),
      tambah(0, judul("Urutan Jangan Lupa"), ...lantai("lt", 150), ...tokoh("fa", 262, 184, "Fajar")),
      tambah("Kurang", emo("x1", 150, 50, E.salah, 22)),
      tambah("urutan", ...["6", "2", "12", "3"].flatMap((n, i) => kartu(`ac${i}`, 30 + i * 62, 70, 40, 32, "#F1F5F9", [n], 16))),
      tambah("terbesar", teks("hr", 150, 134, "harus dari 12 turun ke 2", 10, W.coklat)),
    ),
  ],
};

/* ------------------------------ Ringkasan ------------------------------ */
const SUARA_RINGKAS1 = "Tiga cara sudah kita pelajari bersama Pak Joko, dan masing-masing punya saat yang tepat.";
const SUARA_RINGKAS2 = "Bilangan sedang, pakai Dua Daftar. Cerita pembagian, pakai Bagi Sama Rata. Mencari yang terbesar, pakai Terbesar yang Sama.";
const SUARA_RINGKAS3 = "Apa pun caranya, FPB harus membagi kedua bilangan tanpa sisa.";
const SUARA_RINGKAS4 = "Menurutmu, untuk bilangan lima belas dan tiga puluh lima, cara mana yang paling cepat?";

const X_RINGKAS = [4, 104, 204];

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Tiga cara bersama Pak Joko",
  sumber: "Metode global: ringkasan tiga cara",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_RINGKAS1,
      tambah(0, judul("Tiga Cara, Tiga Saat"), ...lantai("lt", 150)),
      tambah("Tiga", ...X_RINGKAS.flatMap((x, i) => kartu(`c${i + 1}`, x, 40, 92, 64, WARNA_METODE[i], [NAMA_METODE_ID[i]], 8.4))),
      tambah("Joko", ...tokoh("pj", 150, 184, "Pak Joko")),
      tambah("saat", emo("ms", 150, 130, E.bintang, 16)),
    ),
    k(
      SUARA_RINGKAS2,
      tambah("Bilangan", teks("g1", 50, 124, "bilangan sedang", 8.5, W.coklat)),
      tambah("Cerita", teks("g2", 150, 124, "cerita pembagian", 8.5, W.coklat)),
      tambah("Mencari", teks("g3", 250, 124, "cari yang terbesar", 8.5, W.coklat)),
      sorotkan("Daftar", "c1-k"),
      sorotkan("Rata", "c2-k"),
      sorotkan("Sama@2", "c3-k"),
    ),
    k(
      SUARA_RINGKAS3,
      hapus("Apa", "ms"),
      tambah("FPB", teks("fq", 150, 142, "FPB membagi tanpa sisa", 10, W.merah)),
      tambah("tanpa", emo("ok", 240, 144, E.benar, 16)),
    ),
    k(
      SUARA_RINGKAS4,
      bersih(0),
      tambah(0, judul("Cara Mana yang Cepat?"), ...lantai("lt", 150), ...tokoh("pj", 150, 184, "Pak Joko")),
      tambah("lima", ...kartu("n15", 40, 46, 80, 60, "#FEF3C7", ["15"], 34)),
      tambah("tiga", ...kartu("n35", 180, 46, 80, 60, "#DBEAFE", ["35"], 34)),
      tambah("cara", emo("q", 150, 84, E.tanya, 26), teks("cq", 150, 134, "cara mana?", 11, W.ungu)),
    ),
  ],
};
