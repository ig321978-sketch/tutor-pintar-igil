import type { AdeganStory, Obj } from "./logika-story";
import { ANIKE, CONTOH_A, CONTOH_B, CONTOH_C, CONTOH_D, W, emo, kartu, kubusMuka, panah, susunanIso, tampak, teks } from "./k6b3b-gambar";
import { bersih, k, pudarkan, tambah, ubah } from "./k6b3b-bantu";

/* ------------------------------ 3. Langkah 2 sampai 5 dan diskusi a sampai e (hlm. 86 dan 87) ------------------------------ */
const FRAME_AB = tampak("v", 0, 0, 16, ["bm"]).objs;
const geser = (objs: Obj[], x: number, y: number, awalan: string): Obj[] => objs.map((o) => ({ ...o, id: `${awalan}${o.id}`, x: (o.x ?? 0) + x, y: (o.y ?? 0) + y }));

export const ADEGAN_REKONSTRUKSI: AdeganStory = {
  id: "rekonstruksi-diskusi",
  judul: "Menggambar, bertukar gambar, dan merekonstruksi",
  sumber: "Buku Siswa hlm. 86–87; Buku Panduan Guru hlm. 98",
  latar: "#F1F9EE",
  kutipan: ["Cobalah menggambar seperti Anike untuk susunan kubus berikut", "Tukarkan gambar kalian dengan gambar kelompok lain", "Apakah rekonstruksi kalian berhasil?", "Bagaimana jika kalian hanya diberi tampilan dari dua arah?", "Apakah menggambarkan penampakan dari lebih banyak arah akan menolong?", "Dapatkah kalian menentukan susunan kubus yang dapat ditampilkan dengan tampilan dari satu arah saja?"],
  ketukan: [
    k(
      "Langkah 2: coba gambar seperti Anike untuk susunan kubus yang diberikan. Langkah 3: buatlah susunan kubusmu sendiri, lalu gambarkan dari tiga arah.",
      tambah("Langkah", kartu("s2", 24, 34, 252, 56, W.putih, ["langkah 2: gambar tampak", "dari susunan di buku"], 9.5), emo("pn", 262, 70, "✏", 20)),
      tambah("Langkah@2", kartu("s3", 24, 104, 252, 56, W.putih, ["langkah 3: susunan kubusmu sendiri", "digambar dari tiga arah"], 9.5), emo("bt", 262, 140, "🧱", 20)),
    ),
    k(
      "Langkah 4: tukarkan gambarmu dengan kelompok lain, lalu susun kubus dari gambar yang kamu terima. Langkah 5: bandingkan hasilnya dengan susunan mereka.",
      bersih(0),
      tambah(0, teks("l4", 150, 24, "langkah 4: tukar gambar", 11, W.ungu)),
      tambah("kelompok", emo("g1", 56, 90, "👥", 34), teks("g1t", 56, 108, "kelompok A", 8.5), emo("g2", 244, 90, "👥", 34), teks("g2t", 244, 108, "kelompok B", 8.5)),
      tambah("tukarkan", emo("k1", 120, 74, "📄", 22), panah("a1", 100, 80, 40, 0, W.hijau, 2.5, { gambar: true }), emo("k2", 180, 104, "📄", 22), panah("a2", 200, 96, -40, 0, W.hijau, 2.5, { gambar: true })),
      tambah("susun", emo("b1", 56, 150, "🧱", 24), emo("b2", 244, 150, "🧱", 24)),
      tambah("Langkah@2", teks("l5", 150, 186, "langkah 5: bandingkan hasilnya", 10.5, W.merah)),
    ),
    k(
      "Diskusi a dan b: apakah susunan kubusmu sama dengan susunan temanmu? Adakah susunan kubus lain yang juga cocok dengan gambar itu?",
      bersih(0),
      tambah(0, teks("jd", 150, 22, "dua susunan, satu gambar depan?", 10, W.ungu)),
      tambah("kubusmu", susunanIso("a", 34, 130, 18, CONTOH_A).objs, teks("at", 66, 84, "susunanmu: 2 kubus", 8.5)),
      tambah("temanmu", susunanIso("b", 176, 130, 18, CONTOH_B).objs, teks("bt", 208, 84, "susunan lain: 3 kubus", 8.5)),
      tambah("gambar", geser(FRAME_AB, 41, 152, "a"), geser(FRAME_AB, 191, 152, "b"), teks("sm", 150, 188, "tampak depan sama", 9.5, W.hijau)),
    ),
    k(
      "Diskusi c: apakah menggambar dari lebih banyak arah akan menolong? Diskusi d: cukupkah tampilan dari dua arah saja, untuk menentukan susunan kubus itu?",
      bersih(0),
      tambah("banyak", kartu("v1", 20, 50, 76, 60, W.putih, ["tampak", "depan"], 9), kartu("v2", 112, 50, 76, 60, W.putih, ["tampak", "kanan"], 9), kartu("v3", 204, 50, 76, 60, W.putih, ["tampak", "atas"], 9)),
      tambah("menolong?", emo("q1", 150, 150, "❓", 30)),
      tambah("dua", teks("c2", 150, 184, "dua tampak saja: cukup?", 10.5, W.merah)),
      pudarkan("saja,", "v3-k", "v3-t0", "v3-t1"),
    ),
    k(
      "Diskusi e: dapatkah kamu menentukan susunan kubus hanya dari satu tampilan? Coba selidiki: dua susunan berbeda bisa tampak sama dari satu arah.",
      bersih(0),
      tambah(0, teks("jd", 150, 22, "satu tampak depan", 10.5, W.ungu)),
      tambah("satu", susunanIso("c", 62, 118, 26, CONTOH_C).objs, teks("cn", 87, 140, "susunan pertama", 8.5)),
      tambah("selidiki:", susunanIso("d", 182, 118, 26, CONTOH_D).objs, teks("dn", 218, 140, "susunan kedua", 8.5)),
      tambah("tampak", tampak("w", 138, 160, 24, ["o"]).objs, teks("wt", 150, 154, "depan", 8.5, W.hijau)),
      ubah("sama", { id: "w-00", sorot: true }),
    ),
    k(
      "Panduan guru mengingatkan kesalahan yang sering terjadi: murid hanya memperhatikan satu atau dua sisi, lalu melupakan sisi lainnya. Mulailah dari tampak depan dan kanan, lalu periksa dengan tampak atas.",
      bersih(0),
      tambah("murid", emo("pk", 262, 42, "😕", 26)),
      tambah("depan", kartu("r1", 22, 36, 200, 36, "#BFDBFE", ["mulai: tampak depan"], 10)),
      tambah("kanan", kartu("r2", 22, 82, 200, 36, "#BBF7D0", ["lalu: tampak kanan"], 10)),
      tambah("atas", kartu("r3", 22, 128, 200, 36, "#FDE68A", ["periksa: tampak atas"], 10)),
      tambah("periksa", emo("ck", 250, 156, "✅", 28)),
    ),
  ],
};

/* ------------------------------ 4. Pembahasan dan penguatan karakter (hlm. 88) ------------------------------ */
const TAMPAK_ORANG = (id: string, x: number, isi: string, warnaTeks: string) => [emo(`${id}-e`, x, 124, "🧒", 34), teks(`${id}-t`, x, 76, isi, 12, warnaTeks)];

export const ADEGAN_PEMBAHASAN: AdeganStory = {
  id: "pembahasan-perspektif",
  judul: "Pembahasan: dari arah berbeda dan perspektif orang lain",
  sumber: "Buku Siswa hlm. 88; Buku Panduan Guru hlm. 99–100",
  latar: "#FFF1F6",
  kutipan: ["Bangun ruang terlihat berbeda dari arah berbeda", "dengan mengetahui tampak bangun ruang dari berbagai arah", "orang melihat sisi atau perspektif", "penting bagi kita untuk melihat terlebih dahulu perspektif orang lain"],
  ketukan: [
    k(
      "Pembahasan buku: bangun ruang terlihat berbeda dari arah yang berbeda. Sebaliknya, kalau kita tahu tampaknya dari berbagai arah, kita dapat menentukan bangun ruang yang dimaksud.",
      tambah(0, susunanIso("a", 24, 124, 18, ANIKE).objs, teks("t3", 58, 172, "bangun ruang", 8.5)),
      tambah("berbeda", tampak("f", 204, 70, 14, [".h.", "bmk"]).objs, tampak("g", 264, 70, 14, ["h", "k"]).objs, teks("t2", 240, 120, "tampak", 8.5), panah("pa", 100, 96, 100, 0, W.hijau, 3, { gambar: true })),
      tambah("Sebaliknya,", panah("pb", 200, 116, -100, 0, W.merah, 3, { gambar: true })),
    ),
    k(
      "Penguatan karakter: kadang terjadi perdebatan, karena orang melihat sisi yang berbeda dari hal yang sama. Satu orang melihat biru, orang lain melihat kuning.",
      bersih(0),
      tambah(0, kubusMuka("kb", 124, 132, 30, { atas: "m", kiri: "b", kanan: "k" })),
      tambah("Satu", TAMPAK_ORANG("p1", 40, "Biru!", "#1D4ED8")),
      tambah("lain", TAMPAK_ORANG("p2", 260, "Kuning!", "#A16207")),
      tambah("perdebatan,", emo("db", 150, 54, "💬", 26)),
    ),
    k(
      "Karena itu, penting melihat terlebih dahulu perspektif orang lain, yang mungkin berbeda dari kita. Kalau kita bertukar tempat, ternyata keduanya sama-sama benar.",
      bersih(0),
      tambah(0, kubusMuka("kb", 124, 132, 30, { atas: "m", kiri: "b", kanan: "k" })),
      tambah(0, TAMPAK_ORANG("p1", 40, "Biru!", "#1D4ED8"), TAMPAK_ORANG("p2", 260, "Kuning!", "#A16207")),
      tambah("perspektif", panah("lk1", 66, 100, 50, 8, W.ungu, 2, { gambar: true }), panah("lk2", 234, 100, -50, 8, W.ungu, 2, { gambar: true })),
      ubah("bertukar", { id: "p1-e", x: 260, y: 124, skala: 1, op: 1 }, { id: "p2-e", x: 40, y: 124, skala: 1, op: 1 }, { id: "p1-t", x: 260, isi: "Kuning!", warna: "#A16207" }, { id: "p2-t", x: 40, isi: "Biru!", warna: "#1D4ED8" }),
      tambah("benar.", emo("bn", 150, 54, "✅", 28), teks("bt", 150, 176, "keduanya sama-sama benar", 10.5, W.hijau)),
    ),
    k(
      "Untuk murid yang kesulitan, panduan guru menyarankan menempel kertas berwarna pada sisi kubus, sesuai gambar. Murid yang mahir boleh mencoba bentuk dengan lebih banyak kubus.",
      bersih(0),
      tambah("menempel", kubusMuka("kc", 34, 126, 30, { atas: "m", kiri: "b", kanan: "k" }), emo("kr", 112, 74, "📎", 22), teks("kt", 70, 160, "tempel kertas warna", 8.5, W.ungu)),
      tambah("mahir", susunanIso("bb", 176, 130, 16, [
        { u: 0, v: 0, z: 0, w: "b" }, { u: 1, v: 0, z: 0, w: "m" }, { u: 2, v: 0, z: 0, w: "k" }, { u: 3, v: 0, z: 0, w: "o" },
        { u: 1, v: 0, z: 1, w: "h" }, { u: 2, v: 0, z: 1, w: "b" }, { u: 2, v: 0, z: 2, w: "m" },
      ]).objs),
      tambah("lebih", teks("lb", 236, 176, "lebih banyak kubus", 8.5, W.merah)),
    ),
  ],
};
