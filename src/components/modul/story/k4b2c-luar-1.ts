import type { AdeganStory } from "./logika-story";
import { W, batang, emo, garis, jembatan, judul, kartu, kisi, pecahan, teks } from "./k4b2c-gambar";
import { bersih, hapus, idx, k, tambah } from "./k4b2c-bantu";

export const NAMA_METODE = ["Equivalent Fractions", "Multiply Identity", "Simplify", "Fraction Wall"];
export const NAMA_METODE_ID = ["Pecahan Senilai", "Kali dengan Bentuk Satu", "Sederhanakan", "Dinding Pecahan"];
const WARNA_METODE = [W.hijauMuda, W.langit, W.krem, W.pink];
const IKON_METODE = ["🔎", "✖", "➗", "🧱"];

/** Kepala metode: kartu nama di bagian atas adegan konsep dan penerapan. */
export const kepala = (i: number) => kartu("hd", 6, 26, 288, 24, WARNA_METODE[i], [`${NAMA_METODE[i]} · ${NAMA_METODE_ID[i]}`], 8.8);

/** Satu pasang pecahan dihubungkan panah operasi, dengan dua hitungan di bawahnya dan dua batang model. Dipakai penerapan Multiply Identity dan Simplify. */
export function pasangan(id: string, p1: number, q1: number, p2: number, q2: number, op: string, hitungan: [string, string], y = 84, warna: string = W.hijau) {
  return {
    kiri: pecahan(`${id}1`, 50, y, p1, q1, 20),
    jembatan: jembatan(`${id}j`, 50, 250, y, op, 20, warna),
    kanan: pecahan(`${id}2`, 250, y, p2, q2, 20),
    hit1: teks(`${id}a`, 150, y + 52, hitungan[0], 10, warna),
    hit2: teks(`${id}b`, 150, y + 70, hitungan[1], 10, warna),
    batangKiri: batang(`${id}m`, 20, 168, 100, 18, q1, Array.from({ length: p1 }, (_, i) => i)),
    batangKanan: batang(`${id}n`, 180, 168, 100, 18, q2, Array.from({ length: p2 }, (_, i) => i)),
    sama: teks(`${id}s`, 150, 182, "=", 16, W.merah),
  };
}

/* ------------------------------ 1. Pembuka metode luar ------------------------------ */
const SUARA_O1 = "Bagaimana kita memastikan dua pecahan bernilai sama? Guru di berbagai negara punya cara berbeda. Dalam video ini kita lihat empat metode dari luar untuk mengenali pecahan senilai.";
const SUARA_O2 = "Empat metode itu: Equivalent Fractions, Multiply Identity, Simplify, dan Fraction Wall.";
const SUARA_O3 = "Nama dalam bahasa Indonesia: Pecahan Senilai, Kali dengan Bentuk Satu, Sederhanakan, dan Dinding Pecahan.";
const SUARA_O4 = "Semuanya menjawab satu pertanyaan: sama atau tidak? Dengan menunjuk bagian yang sama, mengalikan, membagi, dan menyusun dinding.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Empat metode dari luar untuk pecahan senilai",
  sumber: "Metode luar: pembuka",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_O1,
      tambah(0, judul("Empat metode dari luar")),
      tambah("pecahan", ...pecahan("po1", 100, 76, 2, 6, 18), teks("po2", 150, 80, "?", 22, W.merah), ...pecahan("po3", 200, 76, 1, 3, 18)),
      tambah("berbagai", emo("gl", 150, 140, "🌍", 40)),
      tambah("empat", ...kartu("pk4", 60, 164, 180, 28, W.emas, ["4 metode dari luar"], 9.4)),
    ),
    k(
      SUARA_O2,
      bersih(0),
      tambah(0, judul("Empat metode")),
      ...NAMA_METODE.map((m, i) => tambah(["Equivalent", "Multiply", "Simplify,", "Wall."][i], ...kartu(`m${i}`, 12, 34 + i * 38, 276, 30, WARNA_METODE[i], [`${i + 1}. ${m}`], 9.6))),
    ),
    k(
      SUARA_O3,
      bersih(0),
      tambah(0, judul("Nama dalam bahasa Indonesia")),
      ...NAMA_METODE_ID.map((m, i) => tambah(idx(SUARA_O3, ["Senilai", "Kali", "Sederhanakan", "Dinding"][i]), ...kartu(`n${i}`, 12, 34 + i * 38, 276, 30, WARNA_METODE[i], [`${i + 1}. ${m}`], 9.6))),
    ),
    k(
      SUARA_O4,
      bersih(0),
      tambah(0, judul("Satu pertanyaan, empat cara")),
      tambah("menunjuk", emo("i1", 45, 82, IKON_METODE[0], 32), teks("i1t", 45, 112, "menunjuk", 8.4, W.biru)),
      tambah("mengalikan,", emo("i2", 112, 82, IKON_METODE[1], 32), teks("i2t", 112, 112, "mengalikan", 8.4, W.biru)),
      tambah("membagi,", emo("i3", 188, 82, IKON_METODE[2], 32), teks("i3t", 188, 112, "membagi", 8.4, W.biru)),
      tambah("menyusun", emo("i4", 258, 82, IKON_METODE[3], 32), teks("i4t", 258, 112, "menyusun", 8.4, W.biru)),
      tambah("pertanyaan:", ...kartu("iq", 40, 136, 220, 30, W.emas, ["sama atau tidak?"], 9.6)),
    ),
  ],
};

/* ------------------------------ 2. Equivalent Fractions: konsep ------------------------------ */
const SUARA_S1 = "Metode pertama, Equivalent Fractions, atau Pecahan Senilai. Dua pecahan senilai bila menunjuk bagian yang sama dari keseluruhan yang sama, walau tulisannya berbeda.";
const SUARA_S2 = "Syaratnya, keseluruhannya harus sama besar. Setengah dari kue besar tidak sama dengan setengah dari kue kecil, jadi bandingkan pecahan pada keseluruhan yang sama.";
const SUARA_S3 = "Banyak bagiannya boleh berbeda. Satu bagian dari dua dan dua bagian dari empat menutupi daerah yang sama, jadi dua penulisan itu satu nilai.";
const SUARA_S4 = "Pecahan senilai bukan satu pecahan saja, melainkan satu keluarga tanpa ujung: satu per dua, dua per empat, tiga per enam, empat per delapan, dan seterusnya.";

export const ADEGAN_LUAR_SENILAI: AdeganStory = {
  id: "luar-senilai",
  judul: "Equivalent Fractions: bagian yang sama, tulisan berbeda",
  sumber: "Metode luar: Equivalent Fractions",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_S1,
      tambah(0, judul("Metode 1 dari 4")),
      tambah("pertama,", kepala(0)),
      tambah("menunjuk", ...batang("sa", 90, 66, 140, 26, 2, [0]), ...batang("sb", 90, 102, 140, 26, 4, [0, 1])),
      tambah("tulisannya", ...pecahan("sc", 50, 80, 1, 2, 13), ...pecahan("sd", 50, 116, 2, 4, 13), teks("se", 260, 102, "sama", 9, W.hijau)),
    ),
    k(
      SUARA_S2,
      bersih(0),
      tambah(0, judul("Syarat: keseluruhan sama besar")),
      tambah(0, kepala(0)),
      tambah("besar.", ...batang("ka", 30, 70, 90, 70, 2, [0]), teks("kat", 75, 156, "kue besar", 8.8)),
      tambah("kecil,", ...batang("kb", 190, 95, 50, 40, 2, [0]), teks("kbt", 215, 156, "kue kecil", 8.8), teks("kne", 150, 112, "≠", 20, W.merah)),
      tambah(idx(SUARA_S2, "sama", 3), ...kartu("kk", 60, 168, 180, 28, W.emas, ["bandingkan pada keseluruhan sama"], 9)),
    ),
    k(
      SUARA_S3,
      bersih(0),
      tambah(0, judul("Banyak bagian boleh berbeda")),
      tambah(0, kepala(0)),
      tambah("Satu", ...batang("ta", 70, 74, 160, 28, 2, [0]), ...pecahan("tc", 40, 86, 1, 2, 13)),
      tambah("empat", ...batang("tb", 70, 110, 160, 28, 4, [0, 1]), ...pecahan("td", 40, 122, 2, 4, 13)),
      tambah("menutupi", garis("tg", 150, 66, 0, 80, W.merah, 1.6, { putus: true })),
      tambah("nilai.", ...kartu("tk", 50, 160, 200, 30, W.emas, ["dua tulisan, satu nilai"], 9.6)),
    ),
    k(
      SUARA_S4,
      bersih(0),
      tambah(0, judul("Satu keluarga pecahan")),
      tambah(0, kepala(0)),
      tambah(idx(SUARA_S4, "dua", 1), ...pecahan("ua", 36, 100, 1, 2, 16)),
      tambah(idx(SUARA_S4, "empat", 1), teks("ub1", 67, 104, "=", 18, W.merah), ...pecahan("ub", 98, 100, 2, 4, 16)),
      tambah(idx(SUARA_S4, "enam", 1), teks("uc1", 129, 104, "=", 18, W.merah), ...pecahan("uc", 160, 100, 3, 6, 16)),
      tambah(idx(SUARA_S4, "delapan", 1), teks("ud1", 191, 104, "=", 18, W.merah), ...pecahan("ud", 222, 100, 4, 8, 16)),
      tambah("seterusnya.", teks("ue", 268, 104, "= ...", 14, W.merah), ...kartu("uf", 50, 150, 200, 30, W.emas, ["satu keluarga tanpa ujung"], 9.6)),
    ),
  ],
};

/* ------------------------------ 3. Equivalent Fractions: penerapan pada coklat dan kertas ------------------------------ */
const SUARA_T1 = "Terapkan pada coklat tadi. Satu batang dibagi enam, satu batang dibagi tiga. Dua potong dari enam dan satu potong dari tiga menutupi panjang yang sama.";
const SUARA_T2 = "Jadi dua per enam senilai dengan satu per tiga. Bagian Putu pada kedua batang coklat sama besar, walau satu batang punya enam potong dan satu lagi tiga potong.";
const SUARA_T3 = "Terapkan pada kertas lipat tadi. Kertas pertama punya empat bagian dengan satu bagian diwarnai. Kertas kedua punya enam belas bagian dengan empat bagian diwarnai.";
const SUARA_T4 = "Daerah yang diwarnai sama luas, jadi satu per empat senilai dengan empat per enam belas. Dua tulisan, satu nilai yang sama.";

export const ADEGAN_LUAR_SENILAI_TERAPAN: AdeganStory = {
  id: "luar-senilai-terapan",
  judul: "Equivalent Fractions pada coklat dan kertas",
  sumber: "Metode luar: Equivalent Fractions",
  latar: "#ECFDF5",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Coklat: bagian Putu")),
      tambah(0, kepala(0)),
      tambah("enam,", ...batang("ca", 30, 70, 200, 26, 6, [0, 1], W.arsir, W.cok)),
      tambah("tiga.", ...batang("cb", 30, 110, 200, 26, 3, [0], W.arsir, W.cok)),
      tambah("menutupi", garis("cg", 96.7, 62, 0, 82, W.merah, 1.6, { putus: true }), teks("cq", 150, 160, "sama panjang?", 9.4, W.merah)),
    ),
    k(
      SUARA_T2,
      hapus(0, "cq"),
      tambah("enam", ...pecahan("cc", 262, 82, 2, 6, 12)),
      tambah("tiga", ...pecahan("cd", 262, 122, 1, 3, 12)),
      tambah("sama", ...kartu("ce", 40, 164, 220, 28, W.emas, ["2/6 senilai 1/3"], 10)),
    ),
    k(
      SUARA_T3,
      bersih(0),
      tambah(0, judul("Kertas lipat: satu bagian")),
      tambah(0, kepala(0)),
      tambah("pertama", ...kisi("w1", 40, 64, 36, 36, 2, 2, [0]), teks("w1t", 76, 150, "4 bagian", 8.8)),
      tambah("kedua", ...kisi("w2", 188, 64, 18, 18, 4, 4, [0, 1, 4, 5]), teks("w2t", 224, 150, "16 bagian", 8.8)),
      tambah(idx(SUARA_T3, "diwarnai", 2), teks("w3", 150, 178, "satu potong sama dengan empat potong kecil", 8.2, W.coklat)),
    ),
    k(
      SUARA_T4,
      hapus(0, "w3"),
      tambah("sama", ...pecahan("w4", 76, 172, 1, 4, 13), ...pecahan("w5", 224, 172, 4, 16, 13)),
      tambah("senilai", teks("w6", 150, 176, "=", 22, W.merah), emo("w7", 150, 116, "✅", 24)),
    ),
  ],
};

/* ------------------------------ 4. Multiply Identity: konsep ------------------------------ */
const SUARA_K1 = "Metode kedua, Multiply Identity, atau Kali dengan Bentuk Satu. Bilangan apa pun dikali satu tetap sama, dan angka satu bisa ditulis sebagai dua per dua, tiga per tiga, atau empat per empat.";
const SUARA_K2 = "Mengalikan satu per lima dengan dua per dua tidak mengubah nilai, karena sama saja dengan mengalikan satu. Yang berubah hanya tulisannya: pembilang dan penyebut sama-sama dikali dua.";
const SUARA_K3 = "Pilih bentuk satu sesuai tujuan. Ingin penyebut tiga menjadi enam? Kalikan dua per dua. Ingin penyebut tiga menjadi sembilan? Kalikan tiga per tiga.";
const SUARA_K4 = "Langkahnya: tentukan pengali, kalikan pembilang, lalu kalikan penyebut. Pengali yang sama untuk keduanya membuat nilai pecahan tetap.";

export const ADEGAN_LUAR_KALI: AdeganStory = {
  id: "luar-kali",
  judul: "Multiply Identity: dikali bentuk satu",
  sumber: "Metode luar: Multiply Identity",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_K1,
      tambah(0, judul("Metode 2 dari 4")),
      tambah("kedua,", kepala(1)),
      tambah(idx(SUARA_K1, "satu", 2), teks("ka0", 30, 94, "1", 20, W.hijau)),
      tambah(idx(SUARA_K1, "dua", 2), teks("ka1", 58, 94, "=", 18, W.merah), ...pecahan("ka2", 90, 90, 2, 2, 16)),
      tambah(idx(SUARA_K1, "tiga", 2), teks("ka3", 122, 94, "=", 18, W.merah), ...pecahan("ka4", 154, 90, 3, 3, 16)),
      tambah(idx(SUARA_K1, "empat", 2), teks("ka5", 186, 94, "=", 18, W.merah), ...pecahan("ka6", 218, 90, 4, 4, 16)),
      tambah(idx(SUARA_K1, "atau", 2), ...kartu("kak", 50, 140, 200, 30, W.emas, ["dikali 1, nilainya tetap"], 9.6)),
    ),
    k(
      SUARA_K2,
      bersih(0),
      tambah(0, judul("Dikali dua per dua")),
      tambah(0, kepala(1)),
      tambah("Mengalikan", ...pecahan("kb1", 45, 96, 1, 5, 20), teks("kb2", 80, 100, "×", 18, W.biru)),
      tambah("dua@2", ...pecahan("kb3", 115, 96, 2, 2, 20), teks("kb4", 150, 100, "=", 20, W.merah)),
      tambah("tulisannya:", ...pecahan("kb5", 190, 96, 2, 10, 20)),
      tambah("dikali", teks("kb6", 150, 150, "1 × 2 = 2", 10, W.hijau), teks("kb7", 150, 168, "5 × 2 = 10", 10, W.hijau)),
    ),
    k(
      SUARA_K3,
      bersih(0),
      tambah(0, judul("Pilih bentuk satu")),
      tambah(0, kepala(1)),
      tambah("enam?", ...kartu("kc1", 14, 62, 272, 44, W.hijauMuda, ["penyebut 3 menjadi 6", "pakai bentuk 2/2 (3 × 2 = 6)"], 9.4)),
      tambah("sembilan?", ...kartu("kc2", 14, 120, 272, 44, W.langit, ["penyebut 3 menjadi 9", "pakai bentuk 3/3 (3 × 3 = 9)"], 9.4)),
    ),
    k(
      SUARA_K4,
      bersih(0),
      tambah(0, judul("Tiga langkah mengalikan")),
      tambah(0, kepala(1)),
      tambah("tentukan", ...kartu("kd1", 14, 62, 272, 28, W.hijauMuda, ["1. tentukan pengali"], 9.6)),
      tambah("pembilang,", ...kartu("kd2", 14, 98, 272, 28, W.langit, ["2. kalikan pembilang"], 9.6)),
      tambah("penyebut.", ...kartu("kd3", 14, 134, 272, 28, W.krem, ["3. kalikan penyebut"], 9.6)),
      tambah("tetap.", ...kartu("kd4", 40, 170, 220, 26, W.emas, ["pengali sama: nilai tetap"], 9.4)),
    ),
  ],
};

/* ------------------------------ 5. Multiply Identity: penerapan pada pecahan senilai ------------------------------ */
const SUARA_M1 = "Pertama: satu per tiga dikali dua per dua. Satu kali dua jadi dua, tiga kali dua jadi enam. Hasilnya dua per enam.";
const SUARA_M2 = "Kedua: satu per dua dikali dua per dua. Satu kali dua jadi dua, dua kali dua jadi empat. Hasilnya dua per empat.";
const SUARA_M3 = "Ketiga, pada kertas lipat: satu per empat dikali empat per empat. Satu kali empat jadi empat, empat kali empat jadi enam belas. Hasilnya empat per enam belas.";
const SUARA_M4 = "Keempat: satu per tiga dikali tiga per tiga. Satu kali tiga jadi tiga, tiga kali tiga jadi sembilan. Hasilnya tiga per sembilan.";

/** Satu ketukan penerapan: pecahan awal, bentuk satu, dua hitungan, hasil, dan dua batang model. Kalimat berpola "dikali ... jadi ... jadi ... Hasilnya". */
function ketukanKali(suara: string, id: string, q: number, n: number) {
  const d = pasangan(id, 1, q, n, q * n, `×${n}`, [`1 × ${n} = ${n}`, `${q} × ${n} = ${q * n}`]);
  return k(
    suara,
    bersih(0),
    tambah(0, judul(`1/${q} dikali ${n}/${n}`), ...d.kiri),
    tambah("dikali", ...d.jembatan),
    tambah(idx(suara, "jadi", 1), d.hit1),
    tambah(idx(suara, "jadi", 2), d.hit2),
    tambah("Hasilnya", ...d.kanan, ...d.batangKiri, ...d.batangKanan, d.sama),
  );
}
export const ADEGAN_LUAR_KALI_TERAPAN: AdeganStory = {
  id: "luar-kali-terapan",
  judul: "Multiply Identity pada pecahan senilai",
  sumber: "Metode luar: Multiply Identity",
  latar: "#E0F2FE",
  ketukan: [
    ketukanKali(SUARA_M1, "ma", 3, 2),
    ketukanKali(SUARA_M2, "mb", 2, 2),
    ketukanKali(SUARA_M3, "mc", 4, 4),
    ketukanKali(SUARA_M4, "md", 3, 3),
  ],
};
