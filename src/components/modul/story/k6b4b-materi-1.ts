import type { AdeganStory } from "./logika-story";
import { W, balon, emo, kotak, panah, teks } from "./k6b4a-gambar"
import { bersih, hapus, k, redamkan, sorotkan, tambah, ubah } from "./k6b4a-bantu";
import { daduTitik, kerumunan, koin } from "./k6b4b-gambar";

/* ------------------------------ 1. Dhien dan jumlah peserta lomba (hlm. 115 dan 116) ------------------------------ */
const SD = kerumunan("sd", 31, 68, 12, 4, 14, "#FDE68A", 4.5);
const SMP = kerumunan("smp", 116.5, 58, 35, 7, 10.5, "#BBF7D0", 3.8);
const SMA = kerumunan("sma", 209, 64, 27, 9, 9.5, "#BFDBFE", 3.6);
const kotakKategori = (id: string, x: number, w: number, judul: string) => [kotak(`${id}-k`, x, 36, w, 112, W.putih, W.biru, { rx: 8 }), teks(`${id}-j`, x + w / 2, 50, judul, 7.4, W.ungu)];

export const ADEGAN_LOMBA: AdeganStory = {
  id: "lomba-peserta",
  judul: "Dhien dan jumlah peserta lomba",
  sumber: "Buku Siswa hlm. 115–116",
  latar: "#FFF0F5",
  kutipan: ["Dhien akhirnya memberanikan diri untuk mengikuti lomba menyanyi", "total hanya ada 12 peserta", "ada 35 peserta"],
  ketukan: [
    k("Dhien akhirnya memberanikan diri untuk mengikuti lomba menyanyi. Di subbab B, kita belajar membandingkan peluang.", tambah(0, teks("jud", 150, 26, "Membandingkan Peluang Kejadian", 11, W.ungu)), tambah("Dhien", emo("dhien", 90, 110, "👧", 44)), tambah("menyanyi", emo("mik", 150, 110, "🎤", 40)), tambah("membandingkan", teks("bd", 150, 164, "peluang mana yang lebih besar?", 9.5, W.merah))),
    k("Di kategori 1 untuk siswa SD kelas empat sampai enam, total hanya ada 12 peserta.", bersih(0), tambah(0, kotakKategori("c1", 8, 88, "Kategori 1: SD kelas 4–6")), tambah("12", SD.objs, teks("n1", 52, 138, "12 peserta", 10, W.merah))),
    k("Di kategori 2 untuk siswa SMP ada 35 peserta, sedangkan kategori 3 untuk siswa SMA ada 27 peserta.", tambah("2", kotakKategori("c2", 100, 96, "Kategori 2: SMP")), tambah("35", SMP.objs, teks("n2", 148, 138, "35 peserta", 10, W.merah)), tambah("3", kotakKategori("c3", 202, 90, "Kategori 3: SMA")), tambah("27", SMA.objs, teks("n3", 247, 138, "27 peserta", 10, W.merah))),
    k("Ayah, Ibu, dan saudara Dhien datang untuk menyemangati. Dhien gugup dan berkata, peluang aku menang sangat kecil!", bersih(0), tambah("Ayah,", emo("kel", 60, 150, "👪", 42)), tambah("Dhien", emo("dhien", 130, 150, "👧", 34)), tambah("gugup", emo("keringat", 160, 130, "😰", 22)), tambah("peluang", balon("kata", 215, 52, ["Peluang aku", "menang sangat", "kecil!"], 92)), tambah("kecil!", teks("kc", 215, 120, "kecil?", 14, W.merah))),
    k(
      "Keluarganya menjawab: di kategori SMP ada 35 peserta dan SMA ada 27 peserta. Kamu hanya berkompetisi dengan 11 peserta lainnya.",
      bersih(0),
      tambah(0, kotakKategori("c1", 8, 88, "Kategori 1: SD"), SD.objs, kotakKategori("c2", 100, 96, "Kategori 2: SMP"), SMP.objs, kotakKategori("c3", 202, 90, "Kategori 3: SMA"), SMA.objs),
      redamkan(0, "c1-k"),
      sorotkan("35", ...SMP.ids),
      sorotkan("27", ...SMA.ids),
      redamkan("Kamu", ...SMP.ids, ...SMA.ids),
      ubah("Kamu", { id: "sd-0", warna: W.merah, r: 6 }),
      tambah("11", teks("sebelas", 52, 138, "Dhien + 11 lainnya", 8.5, W.merah)),
    ),
    k("Peluang kamu menang masih sangat besar, kata mereka. Suara nyanyianmu juga sangat merdu, jangan patah semangat dulu.", bersih(0), tambah("Peluang", teks("pb", 150, 56, "peluang menang", 13, W.ungu), teks("sb", 150, 84, "SANGAT BESAR", 20, W.hijau, { garis: W.emas })), tambah("merdu,", emo("n1", 70, 140, "🎵", 30), emo("n2", 150, 150, "🎶", 30), emo("n3", 230, 140, "🎵", 30)), tambah("semangat", teks("sm", 150, 190, "jangan patah semangat", 10, W.merah))),
    k("Ayo berpikir kritis: menurut kalian, apakah peluang menang Dhien termasuk besar atau kecil? Coba jelaskan alasan kalian.", bersih(0), tambah("kritis:", emo("pikir", 150, 56, "🧠", 38)), tambah("besar", kotak("pb", 24, 92, 110, 54, "#BBF7D0", W.hijau, { rx: 12 }), teks("pbt", 79, 126, "BESAR?", 16, W.hijau)), tambah("kecil?", kotak("pk", 166, 92, 110, 54, "#FECACA", W.merah, { rx: 12 }), teks("pkt", 221, 126, "KECIL?", 16, W.merah)), tambah("alasan", teks("al", 150, 180, "jelaskan alasanmu", 10, W.ungu))),
    k("Kalau Dhien sekarang sudah SMP, apakah peluang menangnya lebih besar atau lebih kecil? Diskusikan dengan teman sebangkumu.", bersih(0), tambah("SMP,", kotak("c2", 100, 40, 96, 90, W.putih, W.biru, { rx: 8 }), teks("c2j", 148, 54, "Kategori SMP", 8, W.ungu), ...SMP.objs.map((o) => ({ ...o, y: (o.y ?? 0) - 6 }))), tambah("lebih", teks("lb", 60, 170, "lebih besar?", 12, W.hijau), teks("lk", 240, 170, "lebih kecil?", 12, W.merah)), tambah("Diskusikan", emo("teman", 150, 190, "👥", 24))),
  ],
};

/* ------------------------------ 2. Eksplorasi 4.2: koin dan dadu (hlm. 116 dan 117) ------------------------------ */
const orang = (id: string, x: number, nama: string) => [emo(`${id}-e`, x, 78, "🧒", 32), teks(`${id}-n`, x, 98, nama, 8.5, W.ungu)];
const papanSkor = (p: number) => [teks(`sk${p}t`, 150, 134, "ulangi sampai ada yang menang 3 kali", 8.5, W.merah), ...[0, 1, 2].map((i) => kotak(`sk${p}a${i}`, 40 + i * 20, 144, 16, 16, W.putih, W.biru, { rx: 3 })), ...[0, 1, 2].map((i) => kotak(`sk${p}b${i}`, 204 + i * 20, 144, 16, 16, W.putih, W.biru, { rx: 3 })), teks("sk-a", 68, 176, "pemain 1", 8), teks("sk-b", 232, 176, "pemain 2", 8)];

export const ADEGAN_EKSPLORASI42: AdeganStory = {
  id: "eksplorasi-42",
  judul: "Eksplorasi 4.2: bermain lempar koin dan dadu",
  sumber: "Buku Siswa hlm. 116–117",
  latar: "#EAFBF0",
  kutipan: ["Bermain Lempar Koin dan Dadu", "Ronde 1: Koin", "Ronde 3: Koin dan Dadu"],
  ketukan: [
    k("Eksplorasi 4.2: bermain lempar koin dan dadu. Dalam kelompok dua orang, kalian bermain selama 3 ronde.", tambah(0, teks("jud", 150, 28, "Eksplorasi 4.2", 13, W.ungu)), tambah("kelompok", orang("o1", 90, "pemain 1"), orang("o2", 210, "pemain 2")), tambah("3", teks("r1", 80, 150, "ronde 1", 10), teks("r2", 150, 150, "ronde 2", 10), teks("r3", 220, 150, "ronde 3", 10))),
    k("Untuk menang, kalian harus melempar koin dengan sisi gambar, atau dadu dengan angka 6.", bersih(0), tambah("koin", koin("kg", 90, 80, "G", 26), teks("kgt", 90, 124, "gambar", 9)), tambah("gambar,", emo("ok1", 120, 52, "✅", 18)), tambah("dadu", ...daduTitik("d6", 210, 80, 6, 46), teks("dt", 210, 124, "angka 6", 9)), tambah("6.", emo("ok2", 238, 52, "✅", 18)), tambah("menang,", teks("mn", 150, 170, "syarat menang", 11, W.merah))),
    k("Ronde satu: koin. Tiap pemain menggenggam satu koin. Berhitung mundur bersamaan, lalu lempar koin kalian.", bersih(0), tambah("Ronde", teks("rj", 150, 28, "Ronde 1: koin", 12, W.ungu)), tambah("menggenggam", ...koin("a", 80, 90, "G", 22), ...koin("b", 220, 90, "A", 22)), tambah("Berhitung", teks("h3", 150, 70, "3", 28, W.merah)), ubah("mundur", { id: "h3", isi: "2" }), ubah("bersamaan,", { id: "h3", isi: "1" }), ubah("lempar", { id: "h3", isi: "lempar!", u: 16 }), tambah("lempar", panah("l1", 80, 66, 0, -24, W.hijau, 3, { gambar: true }), panah("l2", 220, 66, 0, -24, W.hijau, 3, { gambar: true }))),
    k("Tentukan apakah ada pemenangnya, dan siapa. Ulangi sampai salah satu pemain menang sebanyak 3 kali.", tambah("Tentukan", emo("trofi", 150, 118, "🏆", 30)), ubah("Tentukan", { id: "h3", op: 0 }), tambah("Ulangi", papanSkor(1)), ubah("3", { id: "sk1a0", warna: W.emas }, { id: "sk1a1", warna: W.emas }, { id: "sk1a2", warna: W.emas })),
    k("Diskusikan dengan temanmu: apakah peluangmu menang di ronde pertama ini cukup besar atau kecil? Mengapa?", bersih(0), tambah("Diskusikan", emo("diskusi", 150, 70, "💬", 34)), tambah("besar", teks("pb", 80, 130, "besar?", 16, W.hijau)), tambah("kecil?", teks("pk", 220, 130, "kecil?", 16, W.merah)), tambah("Mengapa?", teks("mw", 150, 180, "mengapa?", 12, W.ungu))),
    k("Ronde dua: dadu. Tiap pemain menggenggam satu dadu, berhitung mundur, lalu lempar, tentukan pemenang, dan ulangi sampai ada yang menang 3 kali.", bersih(0), tambah("Ronde", teks("rj", 150, 28, "Ronde 2: dadu", 12, W.ungu)), tambah("dadu.", ...daduTitik("pa", 90, 90, 4, 40), ...daduTitik("pb", 210, 90, 2, 40)), tambah("lempar,", panah("l1", 90, 64, 0, -22, W.hijau, 3, { gambar: true }), panah("l2", 210, 64, 0, -22, W.hijau, 3, { gambar: true })), tambah("ulangi", papanSkor(2))),
    k("Diskusikan: apakah peluangmu menang di ronde kedua ini cukup besar atau kecil, dan lebih besar atau lebih kecil dari ronde pertama?", bersih(0), tambah("ronde", ...koin("kk", 80, 90, "G", 24), teks("kt", 80, 128, "ronde 1: koin", 8.5)), tambah("kedua", ...daduTitik("dd", 220, 90, 6, 44), teks("dt", 220, 128, "ronde 2: dadu", 8.5)), tambah("lebih", teks("vs", 150, 96, "?", 30, W.merah)), tambah("kecil", teks("bk", 150, 170, "lebih besar atau lebih kecil?", 10, W.ungu))),
    k("Ronde tiga: koin dan dadu. Pemenang ronde satu memilih mau memakai koin atau dadu. Lalu lempar, tentukan pemenang, dan ulangi sampai ada yang menang 3 kali.", bersih(0), tambah("Ronde", teks("rj", 150, 28, "Ronde 3: koin dan dadu", 12, W.ungu)), tambah("Pemenang", emo("juara", 70, 76, "🏆", 28), teks("jt", 70, 100, "pemenang ronde 1", 7.5)), tambah("memilih", ...koin("kk", 150, 80, "G", 20), teks("kor", 150, 112, "atau", 9), ...daduTitik("dd", 150, 142, 3, 32)), tambah("lempar,", teks("l", 230, 80, "lempar", 12, W.hijau)), tambah("ulangi", teks("u", 230, 100, "sampai menang 3 kali", 7.5, W.merah))),
    k("Diskusikan: apakah peluang menangmu di ronde ketiga besar atau kecil, dan lebih besar atau lebih kecil dari teman mainmu? Simpan jawabanmu, kita bahas di bagian berikutnya.", bersih(0), tambah(0, emo("simpan", 150, 70, "📝", 36)), tambah("besar", teks("pb", 80, 132, "besar atau kecil?", 11, W.hijau)), tambah("lebih", teks("pl", 220, 132, "lebih besar dari teman?", 9, W.merah)), tambah("Simpan", teks("sp", 150, 180, "simpan jawabanmu dulu", 10, W.ungu))),
  ],
};

/* ------------------------------ 3. Membandingkan peluang dalam permainan (hlm. 118) ------------------------------ */
export const ADEGAN_BANDING: AdeganStory = {
  id: "banding-permainan",
  judul: "Membandingkan peluang dalam permainan",
  sumber: "Buku Siswa hlm. 118–119",
  latar: "#EEF2FF",
  kutipan: ["Peluang menang kamu ada 1 dari 2", "Permainan kurang adil adalah saat kemungkinan setiap pemain untuk menang tidak sama"],
  ketukan: [
    k("Saat melempar koin, peluang kalian untuk menang lebih besar, karena hanya ada 2 kemungkinan kejadian: menang atau kalah.", tambah(0, ...koin("k", 150, 52, "G", 22)), tambah("2", panah("a1", 130, 78, -50, 30, W.biru, 2.5, { gambar: true }), panah("a2", 170, 78, 50, 30, W.biru, 2.5, { gambar: true }), teks("n2", 150, 180, "2 kemungkinan", 10, W.ungu)), tambah("menang", kotak("m", 40, 118, 80, 40, "#BBF7D0", W.hijau, { rx: 10 }), teks("mt", 80, 144, "menang", 12, W.hijau)), tambah("kalah.", kotak("kl", 180, 118, 80, 40, "#FECACA", W.merah, { rx: 10 }), teks("klt", 220, 144, "kalah", 12, W.merah))),
    k("Peluang menang kamu ada 1 dari 2 jumlah kemungkinan yang ada. Cukup besar, bukan?", sorotkan("Peluang", "m"), tambah("1", teks("e1", 150, 100, "1 dari 2", 18, W.ungu, { garis: W.emas })), tambah("Cukup", emo("ok", 150, 184, "👍", 24))),
    k("Saat melempar dadu, peluang kalian untuk menang lebih kecil, karena ada 6 kemungkinan kejadian.", bersih(0), tambah(0, teks("jud", 150, 28, "Melempar dadu", 11, W.ungu)), ...[1, 2, 3, 4, 5, 6].map((n, i) => tambah(0, ...daduTitik(`f${n}`, 40 + i * 44, 80, n, 34))), tambah("6", ...[1, 2, 3, 4, 5].map((n, i) => teks(`kl${n}`, 40 + i * 44, 114, "kalah", 7.5, W.merah)), teks("mn6", 260, 114, "menang", 7.5, W.hijau)), tambah("kemungkinan", teks("sx", 150, 150, "6 kemungkinan kejadian", 11, W.ungu))),
    k("Peluang menang kamu ada 1 dari 6 jumlah kemungkinan yang ada. Jadi lebih kecil kemungkinannya.", sorotkan("Peluang", "f6-k"), tambah("1", teks("e1", 150, 176, "1 dari 6", 18, W.ungu, { garis: W.emas })), tambah("kecil", teks("lk", 150, 196, "lebih kecil dari koin", 9, W.merah))),
    k("Ingat kembali 3 ronde tadi. Pada ronde 1, kemungkinan setiap pemain untuk menang sama. Pada ronde 2, juga sama.", bersih(0), tambah(0, teks("jud", 150, 26, "3 ronde tadi", 10, W.ungu)), tambah("ronde@2", kotak("r1", 14, 40, 272, 44, W.putih, W.hijau, { rx: 10 }), ...koin("a", 60, 62, "G", 14), teks("v1", 150, 68, "=", 22, W.hijau), ...koin("b", 240, 62, "G", 14), teks("r1t", 150, 50, "ronde 1: koin lawan koin", 8, W.ungu)), tambah("ronde@3", kotak("r2", 14, 100, 272, 44, W.putih, W.hijau, { rx: 10 }), ...daduTitik("c", 60, 122, 6, 28), teks("v2", 150, 128, "=", 22, W.hijau), ...daduTitik("d", 240, 122, 6, 28), teks("r2t", 150, 110, "ronde 2: dadu lawan dadu", 8, W.ungu)), tambah("sama.", teks("sm", 150, 176, "peluang tiap pemain sama", 11, W.hijau))),
    k("Pada ronde 3, kemungkinan setiap pemain untuk menang berbeda. Saat itu kalian sedang melakukan permainan yang kurang adil.", hapus("3,", "sm"), tambah("3,", kotak("r3", 14, 150, 272, 44, W.putih, W.merah, { rx: 10 }), ...koin("e", 60, 172, "G", 14), teks("v3", 150, 178, "≠", 22, W.merah), ...daduTitik("f", 240, 172, 6, 28), teks("r3t", 150, 160, "ronde 3: koin lawan dadu", 8, W.ungu)), tambah("kurang", emo("awas", 262, 130, "⚠️", 22))),
    k("Permainan kurang adil adalah saat kemungkinan setiap pemain untuk menang tidak sama.", bersih(0), tambah(0, kotak("def", 16, 40, 268, 110, W.putih, W.merah, { rx: 14, tebal: 3 })), tambah("Permainan", teks("d1", 150, 70, "PERMAINAN KURANG ADIL", 14, W.merah)), tambah("kemungkinan", teks("d2", 150, 98, "kemungkinan setiap pemain", 10), teks("d3", 150, 114, "untuk menang tidak sama", 10)), tambah("sama.", emo("tak", 150, 176, "⚖️", 28))),
  ],
};
