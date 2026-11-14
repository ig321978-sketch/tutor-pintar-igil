import type { AdeganStory } from "./logika-story";
import { W, bangunC, emo, judul, kartu, kotak, labelSisi, tabel, teks } from "./k5b4c-gambar";
import type { Obj } from "./logika-story";
import { bersih, k, sorotkan, tambah, ubah } from "./k5b4c-bantu";

/** Keliling menurut buku (Buku Siswa hlm. 118 sampai 121; Panduan Guru hlm. 141 sampai 165). Layang-layang dihitung ulang: 2 + 2 + 4 + 4 = 12. */
export const KUNCI_KELILING: Record<string, number> = { pp: 16, jg: 16, ll: 12, ps: 12, bk: 12, tr: 14, ss: 14 };

/* ------------------------------ 9. Eksplorasi 4.3E bagian trapesium (hlm. 121; Panduan Guru hlm. 151 sampai 153) ------------------------------ */
export const ADEGAN_EKS_43E_TRAPESIUM: AdeganStory = {
  id: "eks-43e-trapesium",
  judul: "Eksplorasi 4.3E: keliling trapesium",
  sumber: "Buku Siswa hlm. 121; Panduan Guru hlm. 151–153",
  latar: "#EFF6FF",
  kutipan: [
    "Eksplorasi 4.3E",
    "Perhatikan bangun-bangun datar berikut.",
    "Bangun apakah ini? .…",
    "Hitunglah kelilingnya.",
    "Keduanya tidak",
    "memiliki sisi yang",
    "sama panjang.",
    "Keliling = … + … + … + …",
    "Dengan demikian, diperoleh",
    "Apakah ada sisi-sisi yang sama panjang?",
    "Tidak ada",
    "Keliling = 4 + 2 + 5 + 3",
    "= 14",
    "sehingga diperoleh",
    "kelilingnya 14 cm.",
  ],
  ketukan: [
    k(
      "Eksplorasi empat titik tiga E, Ayo Menemukan. Bangun pertama memiliki sisi dua, lima, tiga, dan empat sentimeter. Bangun apakah ini? Ukur sisinya dan periksa, adakah yang sama panjang?",
      tambah(0, judul("Eksplorasi 4.3E")),
      tambah("pertama", bangunC("tr", 100, 40, "tr", 21, W.langit), ...labelSisi("tr", 100, 40, "tr", 21, ["2 cm", "5 cm", "3 cm", "4 cm"], 9)),
      tambah("apakah", teks("nm", 150, 170, "bangun apa ini? trapesium", 10, W.ungu)),
    ),
    k(
      "Tidak ada sisi yang sama panjang. Jadi tidak ada pasangan yang bisa dikelompokkan menjadi perkalian. Satu-satunya jalan adalah menjumlahkan semua sisinya.",
      ubah("Tidak", { id: "nm", isi: "tidak ada sisi yang sama panjang" }),
      tambah("pasangan", teks("pq", 252, 80, "2 × ?", 12, W.merah), emo("px", 252, 108, "❌", 22)),
      tambah("menjumlahkan", teks("pj", 252, 144, "jumlahkan", 10, W.hijau), teks("pj2", 252, 158, "semua sisi", 10, W.hijau)),
    ),
    k(
      "Keliling sama dengan empat ditambah dua ditambah lima ditambah tiga, yaitu empat belas. Jadi keliling trapesium ini empat belas sentimeter.",
      bersih(0),
      tambah(0, judul("Hitung kelilingnya")),
      tambah("Keliling", teks("h1", 150, 70, "4 + 2 + 5 + 3 = 14", 16, W.biru)),
      tambah("Jadi", teks("h2", 150, 110, "Keliling trapesium = 14 cm", 12, W.hijau)),
    ),
    k(
      "Urutan menjumlahkan tidak masalah. Kalau mulai dari sisi atas, dua, lima, tiga, dan empat, hasilnya tetap empat belas. Yang penting, tidak ada sisi yang terlewat.",
      sorotkan("Urutan", "h1"),
      tambah("mulai", teks("h3", 150, 144, "2 + 5 + 3 + 4 = 14", 14, W.merah)),
      tambah("terlewat.", emo("h4", 150, 178, "👀", 22)),
    ),
    k(
      "Satu catatan: bila empat sisi ini digambar dengan skala yang tepat, bangunnya tidak bisa menjadi trapesium sungguhan. Gambar di buku hanya skema, tetapi hitungan kelilingnya tetap benar.",
      bersih(0),
      tambah(0, judul("Catatan guru: gambar skema")),
      tambah("catatan:", ...kartu("cg", 14, 36, 272, 52, W.krem, ["Sisi sejajar 2 dan 3 selisih 1,", "sisi miring 4 dan 5: 1 + 4 = 5"], 9.4)),
      tambah("tidak", teks("cg2", 150, 118, "segitiganya rata, bukan trapesium nyata", 9.4, W.merah)),
      tambah("hitungan", teks("cg3", 150, 148, "4 + 2 + 5 + 3 = 14 tetap benar", 11, W.hijau)),
    ),
  ],
};

/* ------------------------------ 10. Eksplorasi 4.3E bagian segi empat sembarang dan kotak kesimpulan (hlm. 121; Panduan Guru hlm. 153 dan 165) ------------------------------ */
export const ADEGAN_EKS_43E_SEMBARANG: AdeganStory = {
  id: "eks-43e-sembarang",
  judul: "Eksplorasi 4.3E: keliling segi empat sembarang",
  sumber: "Buku Siswa hlm. 121; Panduan Guru hlm. 165",
  latar: "#FFF1F2",
  kutipan: [
    "Pada trapesium ataupun segi empat sembarang,",
    "keliling dihitung dengan menjumlahkan panjang",
    "semua sisinya.",
    "Keliling = 4 × panjang sisi",
    "Keliling = 2 + 3 + 4 + 5",
    "= 14.",
    "Jadi, kelilingnya 14 cm.",
    "Apa yang dapat kalian pahami?",
    "Segi empat dengan panjang sisi-",
    "sisi yang tidak sama dapat dihitung",
    "kelilingnya dengan menjumlahkan",
    "keempat sisinya.",
    "Keliling = sisi + sisi + sisi + sisi",
    "Keliling = sisi 1 + sisi 2 + sisi 3 + sisi 4",
  ],
  ketukan: [
    k(
      "Bangun kedua juga segi empat, tetapi sisinya tiga, lima, empat, dan dua sentimeter. Bangun apakah ini? Hitunglah kelilingnya.",
      tambah(0, judul("Segi empat sembarang")),
      tambah("kedua", bangunC("ss", 90, 50, "ss", 24, W.pink), ...labelSisi("ss", 90, 50, "ss", 24, ["5 cm", "4 cm", "2 cm", "3 cm"], 9)),
      tambah("Bangun@2", teks("nm", 150, 180, "bangun apa ini? segi empat sembarang", 9.6, W.ungu)),
    ),
    k(
      "Ini segi empat sembarang. Keempat sisinya tidak sama panjang, seperti kata anak di buku: keduanya tidak memiliki sisi yang sama panjang.",
      bersih(0),
      tambah(0, judul("Tidak ada sisi yang sama")),
      tambah("sembarang.", bangunC("ss", 20, 44, "ss", 18, W.pink), ...labelSisi("ss", 20, 44, "ss", 18, ["5 cm", "4 cm", "2 cm", "3 cm"], 8.6)),
      tambah("Keempat", ...kartu("cq", 160, 56, 130, 40, W.krem, ["keempat sisi", "tidak sama panjang"], 9)),
      tambah("keduanya", emo("ce", 224, 130, "🙅", 30)),
    ),
    k(
      "Jumlahkan: dua ditambah tiga ditambah empat ditambah lima sama dengan empat belas. Jadi kelilingnya empat belas sentimeter.",
      bersih(0),
      tambah(0, judul("Hitung kelilingnya")),
      tambah("Jumlahkan:", teks("j1", 150, 70, "2 + 3 + 4 + 5 = 14", 16, W.biru)),
      tambah("Jadi", teks("j2", 150, 110, "Keliling = 14 cm", 13, W.hijau)),
    ),
    k(
      "Apa yang dapat kalian pahami? Segi empat yang sisinya tidak sama panjang dihitung kelilingnya dengan menjumlahkan keempat sisinya: sisi satu ditambah sisi dua ditambah sisi tiga ditambah sisi empat.",
      bersih(0),
      tambah(0, judul("Apa yang dapat kalian pahami?")),
      tambah("Segi", ...kartu("pm", 14, 40, 272, 50, W.hijauMuda, ["Sisi tidak sama panjang:", "jumlahkan keempat sisinya"], 10)),
      tambah("sisi@2", ...kartu("pn", 14, 104, 272, 34, W.krem, ["Keliling = sisi 1 + sisi 2 + sisi 3 + sisi 4"], 9.6)),
    ),
    k(
      "Awas, di buku siswa kotak kesimpulan menulis keliling sama dengan empat kali panjang sisi. Itu keliru, karena sisinya tidak sama. Yang benar adalah menjumlahkan keempat sisi, seperti di buku panduan guru.",
      bersih(0),
      tambah(0, judul("Awas: kotak kesimpulan keliru")),
      tambah("Awas,", ...kartu("kk1", 14, 38, 272, 44, W.merahMuda, ["Buku Siswa hlm. 121:", "Keliling = 4 × panjang sisi"], 9.4), emo("kx", 262, 96, "❌", 22)),
      tambah("Itu", teks("kk2", 150, 108, "sisinya tidak sama, jadi tidak boleh dikali 4", 8.8, W.merah)),
      tambah("benar", ...kartu("kk3", 14, 122, 272, 44, W.hijauMuda, ["Yang benar (Panduan Guru hlm. 165):", "Keliling = sisi 1 + sisi 2 + sisi 3 + sisi 4"], 9.2), emo("kv", 262, 186, "✅", 20)),
    ),
  ],
};

/* ------------------------------ 11. Ringkasan rumus dan Refleksi nomor 6 sampai 12 (hlm. 129; Panduan Guru hlm. 153) ------------------------------ */
const BARIS_RUMUS = [
  ["Bangun", "Cara menghitung keliling"],
  ["persegi panjang", "(2 × panjang) + (2 × lebar)"],
  ["jajargenjang", "(2 × sisi alas) + (2 × sisi samping)"],
  ["layang-layang", "(2 × sisi pendek) + (2 × sisi panjang)"],
  ["persegi", "4 × panjang sisi"],
  ["belah ketupat", "4 × panjang sisi"],
  ["trapesium", "sisi 1 + sisi 2 + sisi 3 + sisi 4"],
  ["segi empat sembarang", "sisi 1 + sisi 2 + sisi 3 + sisi 4"],
];
/** Baris tabel rumus dari r0 sampai sebelum r1 (id sel `tb-s{baris}{kolom}` dan `tb-t{baris}{kolom}`). */
const barisTabel = (r0: number, r1: number): Obj[] => tabel("tb", 6, 30, [100, 188], BARIS_RUMUS, 17, 8).filter((o) => {
  const r = Number(o.id.charAt(4));
  return r >= r0 && r < r1;
});
const REFLEKSI = [
  "6. menemukan keliling persegi panjang",
  "7. menemukan keliling jajargenjang",
  "8. menemukan keliling layang-layang",
  "9. menemukan keliling persegi",
  "10. menemukan keliling belah ketupat",
  "11. menemukan keliling trapesium",
  "12. menemukan keliling segi empat sembarang",
];
const barisRefleksi = (i: number) => [kotak(`rf${i}-k`, 14, 36 + i * 22, 272, 18, i % 2 === 0 ? W.krem : W.langit, W.biru, { rx: 4, tebal: 1 }), teks(`rf${i}-t0`, 24, 49 + i * 22, REFLEKSI[i], 8.8, W.biru, { anchor: "start" })];

export const ADEGAN_REFLEKSI_C: AdeganStory = {
  id: "ringkasan-refleksi",
  judul: "Ringkasan rumus dan Refleksi nomor 6 sampai 12",
  sumber: "Buku Siswa hlm. 129; Panduan Guru hlm. 153",
  latar: "#F5F3FF",
  kutipan: [
    "Releksi",
    "Setelah mempelajari materi terkait keliling bangun datar, isilah tabel",
    "berikut sesuai dengan pemahaman kalian. Berilah tanda centang",
    "6 Aku bisa menemukan cara menghitung keliling persegi panjang.",
    "7 Aku bisa menemukan cara menghitung keliling jajar genjang.",
    "8 Aku bisa menemukan cara menghitung keliling layang-layang.",
    "9 Aku bisa menemukan cara menghitung keliling persegi.",
    "10 Aku bisa menemukan cara menghitung keliling belah ketupat.",
    "11 Aku bisa menemukan cara menghitung keliling trapesium.",
    "12 Aku bisa menemukan cara menghitung keliling segi empat sembarang.",
    "materi Subbab C dengan menjawab pertanyaan releksi nomor 6 sampai 12",
  ],
  ketukan: [
    k(
      "Mari rangkum rumus subbab C dalam satu tabel. Persegi panjang, jajargenjang, dan layang-layang punya dua pasang sisi sama. Persegi dan belah ketupat punya empat sisi sama. Trapesium dan segi empat sembarang tidak punya.",
      tambah(0, judul("Rangkuman rumus subbab C")),
      tambah("Mari", ...barisTabel(0, 1)),
      tambah("Persegi", ...barisTabel(1, 4)),
      tambah("Persegi@2", ...barisTabel(4, 6)),
      tambah("Trapesium", ...barisTabel(6, 8)),
    ),
    k(
      "Sekarang Refleksi, nomor enam sampai dua belas. Centang ya atau tidak sesuai pemahamanmu. Nomor enam: aku bisa menemukan cara menghitung keliling persegi panjang.",
      bersih(0),
      tambah(0, judul("Refleksi nomor 6 sampai 12")),
      tambah("Sekarang", ...barisRefleksi(0)),
      tambah("Nomor@2", emo("rv0", 270, 49, "✅", 12)),
    ),
    k(
      "Nomor tujuh: jajargenjang. Nomor delapan: layang-layang. Kalau belum yakin, ukur sisinya lagi dan tuliskan jumlahannya.",
      tambah("tujuh:", ...barisRefleksi(1)),
      tambah("delapan:", ...barisRefleksi(2)),
      sorotkan("ukur", "rf1-t0", "rf2-t0"),
    ),
    k(
      "Nomor sembilan: persegi. Nomor sepuluh: belah ketupat. Ingat, keduanya punya empat sisi yang sama panjang.",
      tambah("sembilan:", ...barisRefleksi(3)),
      tambah("sepuluh:", ...barisRefleksi(4)),
      ubah("Ingat,", { id: "rf1-t0", sorot: false }, { id: "rf2-t0", sorot: false }, { id: "rf3-t0", sorot: true }, { id: "rf4-t0", sorot: true }),
    ),
    k(
      "Nomor sebelas: trapesium. Nomor dua belas: segi empat sembarang. Untuk dua bangun ini, kuncinya menjumlahkan semua sisi.",
      tambah("sebelas:", ...barisRefleksi(5)),
      tambah("belas@2", ...barisRefleksi(6)),
      ubah("kuncinya", { id: "rf3-t0", sorot: false }, { id: "rf4-t0", sorot: false }, { id: "rf5-t0", sorot: true }, { id: "rf6-t0", sorot: true }),
    ),
    k(
      "Itu seluruh isi subbab C menurut buku. Kuncinya satu: lihat dulu adakah sisi yang sama panjang, lalu jumlahkan, dan bila bisa ubah menjadi perkalian. Jangan lupa satuan sentimeter.",
      bersih(0),
      tambah(0, judul("Kunci subbab C")),
      tambah("Kuncinya", ...kartu("kc1", 20, 36, 260, 30, W.hijauMuda, ["1. ada sisi yang sama panjang?"], 9.6)),
      tambah("jumlahkan,", ...kartu("kc2", 20, 76, 260, 30, W.langit, ["2. jumlahkan panjang semua sisi"], 9.6)),
      tambah("perkalian.", ...kartu("kc3", 20, 116, 260, 30, W.krem, ["3. bila bisa, ubah menjadi perkalian"], 9.6)),
      tambah("satuan", teks("kc4", 150, 174, "satuan keliling: cm", 11, W.merah)),
    ),
  ],
};
