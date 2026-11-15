import type { AdeganStory } from "./logika-story";
import { W, emo, judul, kartu, kelompok, pasang, teks } from "./k1b1b-gambar";
import { bersih, hapus, idx, k, redamkan, sebar, sorotkan, tambah, urutKata } from "./k1b1b-bantu";

/* ------------------------------ 1. Cerita di taman ------------------------------ */
const SUARA_C1 = "Pagi ini Malosi, Kira, Upe, dan Wei bermain di taman bersama Igil, si burung hantu. Banyak benda ada di taman itu.";
const SUARA_C2 = "Upe melihat tiga sepeda dan tiga burung. Wei melihat enam kursi dan empat balon.";
const SUARA_C3 = "Igil bertanya, mana yang lebih banyak? Untuk tahu, kita bisa memasangkan benda satu dengan satu.";
const SUARA_C4 = "Hari ini kita belajar tiga hal. Pertama, memasangkan benda. Kedua, mengenal banyak dan sedikit. Ketiga, memilih tanda yang tepat.";
const SUARA_C5 = "Kita memakai bilangan yang kecil saja. Pelan-pelan, ya. Kalau bingung, kita ulangi lagi, tidak apa-apa.";

const ANAK: [string, number][] = [["Malosi", 40], ["Kira", 95], ["Upe", 150], ["Wei", 205]];

export const ADEGAN_CERITA: AdeganStory = {
  id: "cerita-taman",
  judul: "Malosi, Kira, Upe, dan Wei di taman",
  sumber: "Materi: cerita di taman",
  latar: "#ECFCCB",
  ketukan: [
    k(
      SUARA_C1,
      tambah(0, judul("Di taman bermain"), { id: "tanah", t: "garis", x: 14, y: 142, x2: 272, y2: 0, warna: W.hijau, tebal: 3 }),
      ...ANAK.map(([nama, x]) => tambah(nama, emo(`a-${nama}`, x, 112, "\u{1F9D2}", 30), teks(`n-${nama}`, x, 132, nama, 8.6))),
      tambah("Igil,", emo("a-Igil", 262, 112, "\u{1F989}", 30), teks("n-Igil", 262, 132, "Igil", 8.6, W.ungu)),
    ),
    k(
      SUARA_C2,
      bersih(0),
      tambah(0, judul("Benda di taman")),
      tambah("Upe", ...kartu("cu", 10, 36, 135, 52, W.langit, ["Upe", "3 sepeda, 3 burung"], 9)),
      tambah("Wei", ...kartu("cw", 155, 36, 135, 52, W.krem, ["Wei", "6 kursi, 4 balon"], 9)),
      tambah("burung.", emo("cue", 77, 130, "\u{1F6B2}\u{1F426}", 26)),
      tambah("balon.", emo("cwe", 222, 130, "\u{1FA91}\u{1F388}", 26)),
    ),
    k(
      SUARA_C3,
      bersih(0),
      tambah(0, judul("Mana yang lebih banyak?"), emo("ig3", 150, 90, "\u{1F989}", 44)),
      tambah("memasangkan", ...kartu("pj", 50, 130, 200, 30, W.emas, ["Pasangkan satu dengan satu"], 10)),
    ),
    k(
      SUARA_C4,
      bersih(0),
      tambah(0, judul("Tiga hal hari ini")),
      tambah("Pertama,", ...kartu("h1", 20, 36, 260, 36, W.langit, ["Memasangkan benda"], 10)),
      tambah("Kedua,", ...kartu("h2", 20, 82, 260, 36, W.hijauMuda, ["Mengenal banyak dan sedikit"], 10)),
      tambah("Ketiga,", ...kartu("h3", 20, 128, 260, 36, W.pink, ["Memilih tanda yang tepat"], 10)),
    ),
    k(
      SUARA_C5,
      bersih(0),
      tambah(0, judul("Pelan-pelan saja"), emo("kura", 150, 100, "\u{1F422}", 50)),
      tambah(idx(SUARA_C5, "ulangi"), ...kartu("ap", 60, 130, 180, 30, W.krem, ["tidak apa-apa"], 11)),
    ),
  ],
};

/* ------------------------------ 2. Memasangkan satu per satu ------------------------------ */
const SUARA_P1 = "Lihat, ada tiga sepeda berjajar di taman. Semua sepeda ini milik Upe.";
const SUARA_P2 = "Lalu datang burung-burung. Burung pertama, burung kedua, burung ketiga.";
const SUARA_P3 = "Sekarang kita tarik garis. Satu sepeda dipasangkan dengan satu burung.";
const SUARA_P4 = "Tidak ada burung yang menganggur. Tidak ada sepeda yang kosong. Semua punya pasangan.";
const SUARA_PX = "Memasangkan itu mudah, tidak perlu menghitung. Kita cukup melihat, apakah ada yang bersisa atau tidak.";
const SUARA_P5 = "Karena semuanya berpasangan, sepeda dan burung sama banyak. Tiga sepeda, tiga burung.";
const SUARA_P6 = "Itulah cara memasangkan benda. Satu benda dipasangkan dengan satu benda, dan tidak boleh ada yang terlewat.";
const SEPEDA = kelompok("sepeda", "sp", 3, 66, 100, 50, 12);
const BURUNG = kelompok("burung", "br", 3, 128, 100, 50, 12);
const SEMUA3 = ["sp0", "sp1", "sp2", "br0", "br1", "br2"];
const posBurung = urutKata(SUARA_P2, ["pertama,", "kedua,", "ketiga."]);
const posGaris = sebar(SUARA_P3, "Satu", 3, 2);

export const ADEGAN_PASANGKAN: AdeganStory = {
  id: "pasangkan",
  judul: "Memasangkan sepeda dengan burung",
  sumber: "Materi: memasangkan satu per satu",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_P1, tambah(0, judul("Sepeda dan burung")), tambah("sepeda", ...SEPEDA)),
    k(SUARA_P2, ...posBurung.map((p, i) => tambah(p, BURUNG[i]))),
    k(SUARA_P3, ...posGaris.map((p, i) => tambah(p, pasang("pg", i, 100 + i * 50, 84, 100 + i * 50, 110)))),
    k(
      SUARA_P4,
      sorotkan("menganggur.", "br0", "br1", "br2"),
      redamkan("kosong.", "br0", "br1", "br2"),
      sorotkan("kosong.", "sp0", "sp1", "sp2"),
      sorotkan("Semua", ...SEMUA3),
    ),
    k(SUARA_PX, tambah("melihat,", emo("mt", 250, 96, "\u{1F440}", 32)), tambah("bersisa", teks("as", 250, 122, "ada sisa?", 9, W.merah))),
    k(
      SUARA_P5,
      hapus(0, "mt", "as"),
      tambah("sama", ...kartu("sm", 70, 154, 160, 28, W.emas, ["Sama banyak"], 12)),
      tambah(idx(SUARA_P5, "tiga", 1), teks("l1", 52, 74, "3", 24, W.merah)),
      tambah(idx(SUARA_P5, "tiga", 2), teks("l2", 52, 136, "3", 24, W.merah)),
    ),
    k(
      SUARA_P6,
      bersih(0),
      tambah(0, judul("Pasangkan satu dengan satu"), emo("ow6", 150, 84, "\u{1F989}", 44)),
      tambah("Satu", ...kartu("pt", 30, 110, 240, 46, W.hijauMuda, ["satu benda, satu pasangan", "tidak boleh terlewat"], 10)),
    ),
  ],
};

/* ------------------------------ 3. Kursi lebih banyak dari balon ------------------------------ */
const SUARA_B1 = "Sekarang Wei menata enam kursi di bawah pohon. Kursi itu berjajar rapi.";
const SUARA_B2 = "Wei membawa balon. Satu balon diikat di satu kursi. Satu, dua, tiga, empat, lalu balonnya habis.";
const SUARA_B3 = "Dua kursi masih kosong dan tidak dapat balon. Dua kursi ini adalah sisanya.";
const SUARA_B4 = "Karena ada kursi yang bersisa, kursi lebih banyak dari balon.";
const SUARA_B5 = "Sebaliknya, balon lebih sedikit dari kursi, sebab balonnya habis lebih dulu.";
const SUARA_B6 = "Ingat, kelompok yang bersisa adalah yang lebih banyak. Kelompok yang habis lebih dulu adalah yang lebih sedikit.";
const KURSI = kelompok("kursi", "ks", 6, 66, 55, 38, 12);
const BALON = kelompok("balon", "bl", 4, 126, 55, 38, 11);
const posBalon = urutKata(SUARA_B2, ["satu", "dua", "tiga", "empat"], "kursi.");

export const ADEGAN_BANYAK: AdeganStory = {
  id: "lebih-banyak",
  judul: "Kursi lebih banyak dari balon",
  sumber: "Materi: lebih banyak dan lebih sedikit",
  latar: "#FEFCE8",
  ketukan: [
    k(SUARA_B1, tambah(0, judul("Kursi dan balon")), tambah("kursi", ...KURSI)),
    k(SUARA_B2, ...posBalon.map((p, i) => tambah(p, BALON[i * 2], BALON[i * 2 + 1], pasang("bg", i, 55 + i * 38, 84, 55 + i * 38, 110)))),
    k(
      SUARA_B3,
      sorotkan("kosong", "ks4", "ks5"),
      tambah("sisanya.", teks("sz4", 207, 135, "sisa", 9.4, W.merah), teks("sz5", 245, 135, "sisa", 9.4, W.merah)),
    ),
    k(SUARA_B4, tambah("kursi", ...kartu("k1", 50, 154, 200, 22, W.emas, ["Kursi lebih banyak"], 10))),
    k(SUARA_B5, tambah("balon", ...kartu("k2", 50, 178, 200, 20, W.langit, ["Balon lebih sedikit"], 10))),
    k(
      SUARA_B6,
      bersih(0),
      tambah(0, judul("Ingat!"), emo("ow", 150, 70, "\u{1F989}", 40)),
      tambah("bersisa", ...kartu("i1", 30, 90, 240, 38, W.hijauMuda, ["yang bersisa", "= lebih banyak"], 10)),
      tambah("habis", ...kartu("i2", 30, 140, 240, 38, W.pink, ["yang habis lebih dulu", "= lebih sedikit"], 10)),
    ),
  ],
};
