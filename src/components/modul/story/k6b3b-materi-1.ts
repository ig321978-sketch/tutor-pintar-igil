import type { AdeganStory, Obj } from "./logika-story";
import { ANIKE, W, emo, kartu, kisi, panah, susunanIso, tampak, teks } from "./k6b3b-gambar";
import { bersih, k, pudarkan, redamkan, sorotkan, tambah } from "./k6b3b-bantu";

/* ------------------------------ 1. Arsitek, gambar tampak, dan pertanyaan pemantik (hlm. 78 dan 85) ------------------------------ */
const T_DEPAN = ".h.|bmk".split("|");
const T_KANAN = ["h", "k"];
const T_ATAS = ["bhk"];
const ambil = (objs: Obj[], ...ids: string[]) => objs.filter((o) => ids.includes(o.id));
const FD = tampak("d", 172, 96, 22, T_DEPAN).objs;
const FR = tampak("r", 200, 78, 28, T_KANAN).objs;
const FA = tampak("t", 172, 90, 26, T_ATAS).objs;

export const ADEGAN_ARSITEK: AdeganStory = {
  id: "arsitek-tampak",
  judul: "Arsitek, gambar tampak, dan pertanyaan pemantik",
  sumber: "Buku Siswa hlm. 78 dan 85; Buku Panduan Guru hlm. 96–97",
  latar: "#EEF4FF",
  kutipan: ["Umumnya bangunan memiliki tampilan yang berbeda-beda tergantung dilihat dari sisi mana", "arsitek membuat gambar tampak beberapa arah agar rancangannya dapat dipahami dan direalisasikan", "Apakah bangun ruang terlihat sama dari semua arah?"],
  ketukan: [
    k(
      "Sub-bab B: Visualisasi Spasial. Satu bangunan yang sama bisa tampak sangat berbeda, kalau kita memandangnya dari sisi yang berbeda.",
      tambah(0, teks("jud", 150, 24, "B. Visualisasi Spasial", 12, W.ungu)),
      tambah("Satu", susunanIso("a", 116, 124, 20, ANIKE).objs),
      tambah("sisi", emo("m1", 44, 112, "👀", 30), teks("l1", 44, 134, "dari kiri", 8), emo("m2", 256, 112, "👀", 30), teks("l2", 256, 134, "dari kanan", 8)),
    ),
    k(
      "Saat merancang bangunan, seorang arsitek membuat gambar tampak dari beberapa arah, supaya rancangannya dapat dipahami dan akhirnya diwujudkan.",
      bersih(0),
      tambah("arsitek", emo("ar", 40, 78, "📐", 34), teks("art", 40, 98, "arsitek", 8.5, W.ungu)),
      tambah("gambar", kartu("c1", 78, 46, 62, 54, W.putih, ["tampak", "depan"], 8.5), kartu("c2", 148, 46, 62, 54, W.putih, ["tampak", "kanan"], 8.5), kartu("c3", 218, 46, 62, 54, W.putih, ["tampak", "atas"], 8.5)),
      tambah("dipahami", emo("ok", 110, 150, "✅", 26), teks("okt", 110, 170, "dipahami", 9, W.hijau)),
      tambah("diwujudkan", emo("rm", 200, 150, "🏠", 26), teks("rmt", 200, 170, "diwujudkan", 9, W.ungu)),
    ),
    k(
      "Pertanyaan pemantik di awal bab: apakah bangun ruang terlihat sama dari semua arah? Mari kita cari tahu lewat susunan kubus.",
      bersih(0),
      tambah("Pertanyaan", teks("pp", 150, 26, "pertanyaan pemantik", 10.5, W.ungu)),
      tambah("bangun", susunanIso("c", 120, 132, 34, [{ u: 0, v: 0, z: 0, w: "o" }]).objs),
      tambah("sama", teks("q1", 62, 112, "?", 36, W.merah), teks("q2", 238, 112, "?", 36, W.merah)),
      tambah("Mari", teks("cr", 150, 178, "cari tahu lewat kubus", 10, W.ungu)),
    ),
    k(
      "Buku panduan guru menyarankan membawa foto gedung sekolah dari beberapa arah. Murid diminta menentukan, di mana pemotret berdiri saat memotret.",
      bersih(0),
      tambah("foto", emo("f1", 46, 62, "📷", 24), emo("f2", 254, 62, "📷", 24), emo("f3", 46, 172, "📷", 24), emo("f4", 254, 172, "📷", 24)),
      tambah("gedung", emo("sk", 150, 112, "🏫", 46)),
      tambah("Murid", emo("tn", 150, 52, "❓", 26)),
      tambah("pemotret", teks("pm", 150, 168, "di mana pemotret berdiri?", 10, W.merah)),
    ),
    k(
      "Tujuan sub-bab ini ada dua. Pertama, membuat gambar dua dimensi dari sebuah bangun ruang. Kedua, menyusun bangun ruang dari gambar tampaknya.",
      bersih(0),
      tambah("Tujuan", teks("tj", 150, 24, "dua tujuan", 12, W.ungu)),
      tambah("Pertama", susunanIso("m", 26, 120, 13, ANIKE).objs, teks("mt", 52, 150, "bangun ruang", 8.5), tampak("td", 222, 86, 14, T_DEPAN).objs, teks("tdt", 243, 150, "gambar 2D", 8.5), panah("p1", 100, 90, 100, 0, W.hijau, 3, { gambar: true }), teks("n1", 150, 82, "1", 14, W.hijau)),
      tambah("Kedua", panah("p2", 200, 110, -100, 0, W.merah, 3, { gambar: true }), teks("n2", 150, 128, "2", 14, W.merah)),
    ),
  ],
};

/* ------------------------------ 2. Eksplorasi 3.2: gambar Anike (hlm. 86) ------------------------------ */
const ANI = (p: string, ox: number, oy: number, s: number) => susunanIso(p, ox, oy, s, ANIKE);
const PANAH_LIHAT = (id: string, y: number, isi: string) => teks(id, 232, y, isi, 9.5, W.ungu);

export const ADEGAN_ANIKE: AdeganStory = {
  id: "eksplorasi-32",
  judul: "Eksplorasi 3.2: gambar Anike",
  sumber: "Buku Siswa hlm. 86; Buku Panduan Guru hlm. 97–98",
  latar: "#FFF6E5",
  kutipan: ["Saat istirahat, Tigor dan Tenri melihat Anike sedang menggambar di bukunya", "Aku sedang menggambar susunan kubus ini dari berbagai arah yang berbeda", "Terlihat berbeda jika dilihat dari arah berbeda", "Bantulah Anike mewarnai gambarnya sesuai warna kubus yang terlihat dari tiap arah"],
  ketukan: [
    k(
      "Eksplorasi 3.2: melihat dari berbagai sisi. Saat istirahat, Tigor dan Tenri melihat Anike sedang menggambar di bukunya.",
      tambah(0, teks("jud", 150, 24, "Eksplorasi 3.2", 13, W.ungu)),
      tambah("Tigor", emo("tg", 50, 78, "🧒", 32), teks("tgn", 50, 96, "Tigor", 8)),
      tambah("Tenri", emo("tn", 104, 78, "🧒", 32), teks("tnn", 104, 96, "Tenri", 8)),
      tambah("Anike", emo("an", 240, 78, "👧", 32), teks("ann", 240, 96, "Anike", 8)),
      tambah("bukunya", kartu("bk", 62, 110, 176, 66, W.putih, [], 8), teks("bd", 98, 124, "depan", 8), teks("bkn", 150, 124, "kanan", 8), teks("ba", 204, 124, "atas", 8), kisi("fd", 80, 132, 12, 3, 2), kisi("fk", 144, 132, 12, 1, 2), kisi("fa", 186, 138, 12, 3, 1)),
    ),
    k(
      "Anike menggambar susunan kubus ini dari tiga arah: depan, kanan, dan atas. Tenri berkata, ini seperti saat kita menggambar Fort Rotterdam!",
      bersih(0),
      tambah(0, ANI("a", 40, 118, 22).objs),
      tambah("tiga", teks("dl", 232, 52, "dilihat dari:", 9, W.biru)),
      tambah("depan,", PANAH_LIHAT("l1", 76, "depan")),
      tambah("kanan,", PANAH_LIHAT("l2", 100, "kanan")),
      tambah("atas.", PANAH_LIHAT("l3", 124, "atas")),
      tambah("Tenri", kartu("bn", 96, 150, 180, 30, W.putih, ["seperti menggambar Fort Rotterdam!"], 8)),
    ),
    k(
      "Tugas pertama: bantulah Anike mewarnai gambarnya, sesuai warna kubus yang terlihat dari tiap arah. Mari kita kerjakan satu per satu.",
      bersih(0),
      tambah(0, ANI("a", 20, 112, 20).objs),
      tambah("mewarnai", emo("pn", 150, 40, "🖍", 26), teks("pnt", 150, 56, "warnai sesuai kubus", 8.5, W.ungu)),
      tambah("sesuai", teks("kd", 176, 86, "depan", 8), kisi("fd", 160, 92, 18, 3, 2), teks("kk", 244, 86, "kanan", 8), kisi("fk", 238, 92, 18, 1, 2), teks("ka", 200, 150, "atas", 8), kisi("fa", 173, 156, 18, 3, 1)),
      tambah("satu", panah("sp", 100, 188, 130, 0, W.hijau, 2.5, { gambar: true })),
    ),
    k(
      "Dari depan kita melihat tiga kubus di bawah: biru, merah, dan kuning. Di atas kubus merah ada satu kubus hijau. Bentuknya seperti huruf T.",
      bersih(0),
      tambah(0, ANI("a", 20, 112, 20).objs, teks("dp", 205, 52, "tampak depan", 9.5, W.ungu)),
      tambah("biru,", ambil(FD, "d-10")),
      sorotkan("biru,", "a0-k", "a0-r", "a0-a"),
      tambah("merah,", ambil(FD, "d-11")),
      redamkan("merah,", "a0-k", "a0-r", "a0-a"),
      sorotkan("merah,", "a1-k", "a1-r", "a1-a"),
      tambah("kuning.", ambil(FD, "d-12")),
      redamkan("kuning.", "a1-k", "a1-r", "a1-a"),
      sorotkan("kuning.", "a2-k", "a2-r", "a2-a"),
      tambah("hijau.", ambil(FD, "d-01")),
      redamkan("hijau.", "a2-k", "a2-r", "a2-a"),
      sorotkan("hijau.", "a3-k", "a3-r", "a3-a"),
      tambah("huruf", teks("huruf", 238, 170, "T", 26, W.merah)),
    ),
    k(
      "Dari kanan kita melihat dua kubus bertumpuk: kuning di bawah, hijau di atas. Kubus biru dan kubus merah tertutup oleh kubus kuning.",
      bersih(0),
      tambah(0, ANI("a", 20, 112, 20).objs, teks("dp", 215, 52, "tampak kanan", 9.5, W.ungu)),
      tambah("kuning", ambil(FR, "r-10")),
      sorotkan("kuning", "a2-k", "a2-r", "a2-a"),
      tambah("hijau,", ambil(FR, "r-00")),
      redamkan("hijau,", "a2-k", "a2-r", "a2-a"),
      sorotkan("hijau,", "a3-k", "a3-r", "a3-a"),
      redamkan("tertutup", "a3-k", "a3-r", "a3-a"),
      pudarkan("tertutup", "a0-k", "a0-r", "a0-a", "a1-k", "a1-r", "a1-a"),
    ),
    k(
      "Dari atas kita melihat tiga kotak berjajar: biru, hijau, dan kuning. Kubus hijau menutupi kubus merah, sehingga warna merah tidak terlihat dari atas.",
      bersih(0),
      tambah(0, ANI("a", 20, 112, 20).objs, teks("dp", 215, 52, "tampak atas", 9.5, W.ungu)),
      tambah("biru,", ambil(FA, "t-00")),
      tambah("hijau,", ambil(FA, "t-01")),
      tambah("kuning.", ambil(FA, "t-02")),
      sorotkan("menutupi", "a3-k", "a3-r", "a3-a"),
      pudarkan("merah,", "a1-k", "a1-r", "a1-a"),
      tambah("tidak", teks("tm", 211, 140, "merah tertutup", 9, W.merah)),
    ),
    k(
      "Jadi susunan kubus Anike memakai 4 kubus. Tiga tampak itu saling cocok, karena semuanya berasal dari satu susunan yang sama.",
      bersih(0),
      tambah(0, ANI("a", 100, 128, 22).objs),
      tambah("Jadi", teks("jml", 150, 26, "4 kubus", 14, W.merah, { garis: W.emas })),
      tambah("Tiga", tampak("td", 24, 54, 12, T_DEPAN).objs, teks("tdt", 42, 92, "depan", 8), tampak("tk", 246, 54, 12, ["h", "k"]).objs, teks("tkt", 252, 92, "kanan", 8), tampak("ta", 228, 130, 12, T_ATAS).objs, teks("tat", 246, 156, "atas", 8)),
      tambah("cocok,", emo("cc", 60, 160, "✅", 24), emo("cd", 262, 188, "✅", 20)),
    ),
  ],
};
