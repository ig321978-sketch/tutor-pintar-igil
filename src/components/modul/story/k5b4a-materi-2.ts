import type { AdeganStory, Obj } from "./logika-story";
import { FX, FY, LAP, RUTE, W, emo, garis, garisRute, jalur, judul, kartu, lapangan, panah, poligon, tabel, teks, titikStart, ukuranLapangan } from "./k5b4a-gambar";
import { bersih, hapus, k, tambah, ubah } from "./k5b4a-bantu";

/** Lapangan lengkap: rumput, garis tengah, titik start, dan ukuran 100 m kali 50 m. Id awalan `lp-`. */
const lapanganLengkap = (): Obj[] => [...lapangan("lp", FX, FY), ...titikStart("lp", FX, FY), ...ukuranLapangan("lp", FX, FY)];
/** Pelari di dekat titik start (pojok kiri-bawah lapangan). */
const pelari = (id = "rn"): Obj => emo(id, FX + 10, FY + LAP.ph - 8, "🏃", 16);

/* ------------------------------ 5. Eksplorasi 4.1A: soal berlari 300 m (Buku Siswa hlm. 109 dan 110; Panduan Guru hlm. 121 dan 122) ------------------------------ */
export const ADEGAN_SOAL: AdeganStory = {
  id: "eks-41a-soal",
  judul: "Eksplorasi 4.1A: berlari 300 m di lapangan",
  sumber: "Buku Siswa hlm. 109–110; Panduan Guru hlm. 121–122",
  latar: "#ECFDF5",
  kutipan: [
    "Eksplorasi 4.1A",
    "Suatu pagi, Asep bersama teman-teman mengikuti pelajaran",
    "olahraga. Kali ini, Pak Guru meminta anak-anak berlari sejauh 300",
    "m di lapangan sepak bola. Anak-anak bebas berlari ke arah mana",
    "saja asalkan setelahnya mereka kembali ke tempat semula untuk",
    "melapor kepada Pak Guru.",
    "Coba pikirkan. Bagaimana lintasan berlari Asep dan teman-teman",
    "agar mencapai jarak sejauh 300 m?",
    "kelompok, misalnya dengan undian",
  ],
  ketukan: [
    k(
      "Eksplorasi empat titik satu A. Suatu pagi, Asep bersama teman-teman mengikuti pelajaran olahraga. Pak Guru meminta anak-anak berlari sejauh tiga ratus meter di lapangan sepak bola.",
      tambah(0, judul("Eksplorasi 4.1A")),
      tambah("anak-anak", emo("as", 34, 100, "🏃", 22)),
      tambah("lapangan", ...lapangan("lp", FX, FY)),
      tambah("tiga", ...kartu("t3", 90, 156, 120, 30, W.krem, ["berlari sejauh 300 m"], 9.6)),
    ),
    k(
      "Anak-anak bebas berlari ke arah mana saja, asalkan setelahnya mereka kembali ke tempat semula untuk melapor kepada Pak Guru.",
      tambah("arah", panah("pa", 100, 104, 40, -30, W.abu, 2, { gambar: true }), panah("pb", 160, 76, -30, 34, W.abu, 2, { gambar: true }), panah("pc", 190, 114, 36, 8, W.abu, 2, { gambar: true })),
      tambah("kembali", ...titikStart("lp", FX, FY), teks("kbl", 150, 197, "setelah itu kembali ke titik start", 8.6, W.merah)),
      tambah("melapor", emo("pk", 30, 150, "🙋", 22), teks("pgu", 30, 168, "Pak Guru", 8, W.biru)),
    ),
    k(
      "Lapangannya berukuran seratus meter kali lima puluh meter, dengan titik start di pojok. Pertanyaannya: bagaimana lintasan berlari agar mencapai jarak tiga ratus meter?",
      bersih(0),
      tambah(0, judul("Eksplorasi 4.1A"), ...lapanganLengkap()),
      tambah("Pertanyaannya:", ...kartu("qq", 20, 164, 260, 28, W.langit, ["Lintasan seperti apa agar mencapai 300 m?"], 9)),
    ),
    k(
      "Guru membagi kelas menjadi empat kelompok, atau berpasangan bila siswanya sedikit. Setiap kelompok mendapat gambar lapangan untuk mencoret rute alternatif di kertas.",
      bersih(0),
      tambah(0, judul("Kerja kelompok")),
      ...[0, 1, 2, 3].map((i) => tambah(4, ...kartu(`gk${i}`, 8 + i * 72, 38, 66, 22, [W.hijauMuda, W.langit, W.krem, W.pink][i], [`Kelompok ${i + 1}`], 8.2))),
      ...[0, 1, 2, 3].map((i) => tambah(14, ...lapangan(`gl${i}`, 11 + i * 72, 70, 60, 30))),
      ...[0, 1, 2, 3].map((i) => tambah(18, jalur(`gr${i}`, 11 + i * 72, 70, ["M2 26 L30 6 L50 24", "M4 8 L56 26", "M6 24 L30 4 L56 20", "M3 14 L30 26 L57 8"][i], "none", W.merah, { tebal: 1.8, gambar: true }))),
      tambah("kertas.", teks("kr", 150, 128, "coretan rute alternatif di kertas", 8.8, W.ungu)),
    ),
    k(
      "Penting: guru memastikan siswa belum membuka halaman berikutnya, supaya ide mereka orisinal. Siswa mempresentasikan rute di depan kelas, lalu membandingkannya dengan rute tokoh di buku.",
      bersih(0),
      tambah(0, judul("Aturan guru")),
      tambah("belum", emo("mk", 50, 90, "🙈", 40), teks("mkt", 50, 112, "jangan buka dulu", 8.2, W.merah)),
      tambah("mempresentasikan", ...kartu("pr", 100, 48, 190, 34, W.langit, ["presentasi rute di depan kelas"], 9)),
      tambah("membandingkannya", ...kartu("bd", 100, 96, 190, 34, W.hijauMuda, ["bandingkan dengan rute di buku"], 9)),
    ),
  ],
};

/* ------------------------------ 6. Rute Nisa dan Lukas (Buku Siswa hlm. 110 dan 111; Panduan Guru hlm. 123) ------------------------------ */
export const ADEGAN_NISA_LUKAS: AdeganStory = {
  id: "rute-nisa-lukas",
  judul: "Rute Nisa dan Lukas: satu sisi lapangan",
  sumber: "Buku Siswa hlm. 110–111; Panduan Guru hlm. 123",
  latar: "#ECFDF5",
  kutipan: [
    "Lintasan Berlari Nisa",
    "100+100+100 = 300",
    "Jadi, aku sudah berlari",
    "Namun, aku harus berjalan kembali",
    "untuk melapor ke Pak Guru.",
    "Lintasan Berlari Lukas",
    "50+50+50+50+50+50 = 300",
    "Aku harus bolak-balik 6 kali agar",
    "bisa menempuh jarak yang diminta.",
  ],
  ketukan: [
    k(
      "Rute pertama milik Nisa. Ia berlari bolak-balik di sepanjang sisi lapangan: seratus tambah seratus tambah seratus sama dengan tiga ratus. Jadi ia sudah berlari tiga ratus meter.",
      tambah(0, judul("Lintasan Berlari Nisa"), ...lapanganLengkap(), pelari()),
      tambah("bolak-balik", garisRute("nr", RUTE.nisa, W.merah)),
      tambah("seratus", teks("ne", 150, 178, "100 + 100 + 100 = 300", 10.4, W.merah)),
      tambah("Jadi", teks("nj", 150, 192, "jarak lari 300 m", 8.6, W.hijau)),
    ),
    k(
      "Namun, kata Nisa, ia harus berjalan kembali untuk melapor ke Pak Guru, karena berhenti di sudut seberang, bukan di titik start.",
      hapus("Namun,", "ne", "nj"),
      ubah("berhenti", { id: "rn", x: FX + LAP.pw - 14 }),
      tambah("kembali", panah("bk", FX + LAP.pw - 6, FY + LAP.ph + 22, -(LAP.pw - 12), 0, W.merah, 2, { putus: true, gambar: true }), teks("bkt", 150, 184, "harus berjalan kembali ke Pak Guru", 8.8, W.merah)),
    ),
    k(
      "Rute kedua milik Lukas. Ia berlari bolak-balik di sisi lapangan yang pendek: lima puluh sebanyak enam kali, jumlahnya tiga ratus. Jadi ia sudah berlari tiga ratus meter.",
      hapus(0, "nr", "bk", "bkt", "rn"),
      ubah(0, { id: "jud", isi: "Lintasan Berlari Lukas" }),
      tambah(0, pelari()),
      tambah("bolak-balik", garisRute("lr", RUTE.lukas, W.ungu)),
      tambah("lima", teks("le", 150, 178, "50 + 50 + 50 + 50 + 50 + 50 = 300", 10, W.ungu)),
      tambah("Jadi", teks("lj", 150, 192, "jarak lari 300 m", 8.6, W.hijau)),
    ),
    k(
      "Lukas harus bolak-balik enam kali agar menempuh jarak yang diminta. Perhatikan, kedua rute ini hanya memakai satu sisi lapangan, jadi bukan rute yang mengelilingi.",
      tambah("enam", teks("n6", FX + 120, FY + 40, "6 kali", 12, W.ungu)),
      tambah("satu", garis("ts", FX, FY + LAP.ph, 0, -LAP.ph, W.merah, 4), teks("ss", 150, 165, "hanya memakai satu sisi lapangan", 8.6, W.merah)),
    ),
  ],
};

/* ------------------------------ 7. Rute Yohana dan Asep (Buku Siswa hlm. 111; Panduan Guru hlm. 124) ------------------------------ */
export const ADEGAN_YOHANA_ASEP: AdeganStory = {
  id: "rute-yohana-asep",
  judul: "Rute Yohana dan Asep: tengah atau tepian",
  sumber: "Buku Siswa hlm. 111; Panduan Guru hlm. 124",
  latar: "#ECFDF5",
  kutipan: [
    "Lintasan Berlari Yohana",
    "Aku mencoba berlari",
    "melalui tengah lapangan.",
    "Namun, aku berhenti di tempat",
    "yang jauh dari Pak Guru.",
    "Lintasan Berlari Asep",
    "Aku berlari mengelilingi tepian",
    "100+50+100+50 = 300.",
    "berlari sejauh 300 m dan",
    "kembali ke tempat semula.",
    "Di akhir lintasan, aku langsung",
    "bisa melapor ke Pak Guru.",
  ],
  ketukan: [
    k(
      "Rute ketiga milik Yohana. Ia mencoba berlari melalui tengah lapangan: lima puluh sebanyak enam kali sama dengan tiga ratus. Jadi ia juga menempuh tiga ratus meter.",
      tambah(0, judul("Lintasan Berlari Yohana"), ...lapanganLengkap(), pelari()),
      tambah("tengah", garisRute("yr", RUTE.yohana, W.coklat)),
      tambah("lima", teks("ye", 150, 178, "50 + 50 + 50 + 50 + 50 + 50 = 300", 10, W.coklat)),
      tambah("Jadi", teks("yj", 150, 192, "jarak lari 300 m", 8.6, W.hijau)),
    ),
    k(
      "Namun Yohana berhenti di tempat yang jauh dari Pak Guru. Jaraknya sudah cukup, tetapi ia tidak kembali ke tempat semula.",
      hapus(0, "ye", "yj"),
      ubah("berhenti", { id: "rn", x: FX + 110, y: FY + 14 }),
      tambah("jauh", panah("yb", FX + 108, FY + 10, -(108 - 4), LAP.ph - 20, W.merah, 1.8, { putus: true, gambar: true }), teks("yt1", 150, 178, "berhenti jauh dari Pak Guru", 8.8, W.merah)),
      tambah("tidak", teks("yt2", 150, 192, "tidak kembali ke tempat semula", 8.8, W.merah)),
    ),
    k(
      "Rute keempat milik Asep. Ia berlari mengelilingi tepian lapangan: seratus tambah lima puluh tambah seratus tambah lima puluh sama dengan tiga ratus.",
      hapus(0, "yr", "yb", "yt1", "yt2", "rn"),
      ubah(0, { id: "jud", isi: "Lintasan Berlari Asep" }),
      tambah(0, pelari()),
      tambah("mengelilingi", garisRute("ar", RUTE.asep, W.biru)),
      tambah("seratus", teks("ae", 150, 178, "100 + 50 + 100 + 50 = 300", 10.4, W.biru)),
    ),
    k(
      "Dengan begitu Asep sudah berlari tiga ratus meter dan kembali ke tempat semula. Di akhir lintasan, ia langsung bisa melapor ke Pak Guru.",
      tambah("kembali", emo("ok", FX + 30, FY + LAP.ph - 14, "✅", 16), teks("akt", 150, 192, "kembali ke titik start", 8.8, W.hijau)),
      tambah("melapor", emo("pk", 30, 150, "🙋", 22), teks("pgu", 30, 168, "Pak Guru", 8, W.biru)),
    ),
  ],
};

/* ------------------------------ 8. Memilih cara dan munculnya kata keliling (Buku Siswa hlm. 112 dan 113; Panduan Guru hlm. 124) ------------------------------ */
const KOLOM = [56, 142, 82];
const baris = (r: number, sel: string[]): Obj[] => tabel(`rt${r}`, 10, 34 + r * 22, KOLOM, [sel], 22, 8.2, r === 0 ? W.krem : W.putih);

export const ADEGAN_PILIH: AdeganStory = {
  id: "pilih-keliling",
  judul: "Cara mana yang paling disukai dan kata keliling",
  sumber: "Buku Siswa hlm. 112–113; Panduan Guru hlm. 124",
  latar: "#FFFBEB",
  kutipan: [
    "Di antara cara Asep dan teman-temannya berlari untuk menempuh",
    "jarak sejauh 300 m, manakah cara yang paling kalian sukai?",
    "Nisa dan Lukas berlari hanya pada satu sisi lapangan sepak bola.",
    "Yohana berlari melalui tengah",
    "Asep berlari mengelilingi",
    "Untuk berlari sejauh 300 m, Asep memilih berlari \"mengelilingi\"",
    "lapangan. Artinya, ia berangkat dari satu titik, kemudian berlari",
    "menyusuri tepian lapangan, dan berhenti di titik semula. Dengan",
    "adalah sepanjang \"keliling\" lapangan sepak bola tersebut.",
    "Setiap sisi lapangan ia lalui satu kali.",
  ],
  ketukan: [
    k(
      "Di antara semua cara itu, manakah yang paling kalian sukai? Buku merangkum: Nisa dan Lukas berlari hanya pada satu sisi lapangan sepak bola.",
      tambah(0, judul("Cara mana yang kamu sukai?")),
      tambah(0, ...baris(0, ["Nama", "Rute", "Mengelilingi?"])),
      tambah("Nisa", ...baris(1, ["Nisa", "satu sisi lapangan", "tidak"])),
      tambah("Lukas", ...baris(2, ["Lukas", "satu sisi lapangan", "tidak"])),
    ),
    k(
      "Yohana berlari melalui tengah lapangan, sedangkan Asep berlari mengelilingi lapangan.",
      tambah("Yohana", ...baris(3, ["Yohana", "melalui tengah lapangan", "tidak"])),
      tambah("Asep", ...baris(4, ["Asep", "mengelilingi lapangan", "ya"])),
    ),
    k(
      "Untuk berlari sejauh tiga ratus meter, Asep memilih berlari mengelilingi lapangan. Artinya, ia berangkat dari satu titik, menyusuri tepian lapangan, dan berhenti di titik semula.",
      bersih(0),
      tambah(0, judul("Asep: mengelilingi lapangan"), ...lapanganLengkap()),
      tambah("berangkat", pelari()),
      tambah("menyusuri", garisRute("ar", RUTE.asep, W.biru)),
      tambah("berhenti", emo("ok", FX + 30, FY + LAP.ph - 14, "✅", 16), teks("akt", 150, 180, "berhenti di titik semula", 9, W.hijau)),
    ),
    k(
      "Panduan guru menambahkan: setiap sisi lapangan ia lalui satu kali. Mengelilingi tidak sama dengan bolak-balik pada sisi yang sama.",
      bersih(0),
      tambah(0, judul("Satu kali tiap sisi")),
      tambah("setiap", poligon("mr", 30, 52, [[0, 0], [100, 0], [100, 50], [0, 50]], W.rumput, W.biru, { tebal: 2 }), teks("m1", 80, 48, "1 kali", 8.2, W.biru), teks("m2", 142, 80, "1 kali", 8.2, W.biru, { anchor: "start" }), teks("m3", 80, 114, "1 kali", 8.2, W.biru), teks("m4", 24, 80, "1 kali", 8.2, W.biru, { anchor: "end" })),
      tambah("Mengelilingi", emo("m5", 80, 150, "✅", 18), teks("m6", 80, 168, "mengelilingi", 8.6, W.hijau)),
      tambah("bolak-balik", garis("bb1", 190, 80, 80, 0, W.merah, 2.4, { gambar: true }), garis("bb2", 190, 90, 80, 0, W.merah, 2.4, { gambar: true }), garis("bb3", 190, 100, 80, 0, W.merah, 2.4, { gambar: true }), teks("m7", 230, 128, "satu sisi berulang", 8.2, W.merah)),
      tambah("sama.@2", emo("m8", 230, 150, "❌", 18), teks("m9", 230, 168, "bukan mengelilingi", 8.6, W.merah)),
    ),
    k(
      "Karena itu jarak yang Asep tempuh adalah sepanjang keliling lapangan sepak bola. Kata keliling muncul dari rute yang mengelilingi tepian lapangan.",
      bersih(0),
      tambah(0, judul("Dari rute ke kata keliling")),
      tambah("Asep", ...kartu("rr", 14, 56, 120, 44, W.langit, ["rute mengelilingi", "tepian lapangan"], 8.8)),
      tambah("keliling", panah("rk", 138, 78, 26, 0, W.biru, 2.4, { gambar: true }), ...kartu("kk", 168, 54, 118, 48, W.emas, ["KELILING"], 12)),
      tambah("muncul", teks("rm", 150, 138, "kata keliling muncul dari rute", 9, W.ungu), teks("rm2", 150, 154, "yang mengelilingi tepian lapangan", 9, W.ungu)),
    ),
  ],
};

