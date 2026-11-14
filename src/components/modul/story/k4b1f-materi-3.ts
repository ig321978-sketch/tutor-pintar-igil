import type { AdeganStory, Obj } from "./logika-story";
import { CERITA, LATIHAN_3, LATIHAN_4, W, barisTabel, batangSisa, emo, judul, kartu, panah, teks } from "./k4b1f-gambar";
import { bersih, idx, k, sebar, tambah } from "./k4b1f-bantu";

/** Nomor kata terakhir dalam kalimat suara (pemicu untuk gambar penutup ketukan). */
const akhir = (suara: string): number => suara.split(/\s+/).filter(Boolean).length - 1;

/* ------------------------------ 8. Ayo Berlatih 3: cara yang lebih mudah (Buku Siswa hlm. 38; Panduan Guru hlm. 57) ------------------------------ */
const SUARA_G1 = "Latihan tiga: pilih cara yang paling mudah menurut kamu. Caranya boleh kamu tentukan sendiri. Ada lima soal pengurangan.";
const SUARA_G2 = "Soal a: empat ratus lima puluh lima dikurangi tiga ratus dua puluh delapan sama dengan seratus dua puluh tujuh. Soal b: delapan ratus tiga puluh dua dikurangi enam ratus dua puluh dua sama dengan dua ratus sepuluh.";
const SUARA_G3 = "Soal c: tujuh ratus dua belas dikurangi delapan puluh sembilan sama dengan enam ratus dua puluh tiga. Soal d: enam ratus dikurangi dua ratus tiga puluh lima sama dengan tiga ratus enam puluh lima.";
const SUARA_G4 = "Soal e: lima ratus lima dikurangi tujuh puluh tujuh sama dengan empat ratus dua puluh delapan. Soal c, d, dan e paling menantang karena angka puluhan atau satuannya kecil atau nol.";

const HURUF = ["a", "b", "c", "d", "e"];
/** Baris soal nomor tiga huruf `i` (kartu berisi `a. 455 − 328 = ?` atau jawabannya) pada ketinggian `y`. */
const barisTiga = (i: number, y: number, dengan: boolean, warna: string = W.krem): Obj[] => {
  const [a, b, h] = LATIHAN_3[i];
  return kartu(`t${HURUF[i]}`, 20, y, 260, 28, warna, [dengan ? `${HURUF[i]}. ${a} − ${b} = ${h}` : `${HURUF[i]}. ${a} − ${b} = ?`], 11.4);
};

export const ADEGAN_LATIHAN_TIGA: AdeganStory = {
  id: "berlatih-tiga",
  judul: "Latihan 3: cara yang lebih mudah",
  sumber: "Materi: pilih cara yang mudah",
  latar: "#F0FDF4",
  kutipan: [
    "3. Gunakan cara yang lebih mudah menurut kalian untuk menyelesaikan operasi pengurangan berikut!",
    "a. 455 - 328 = 127",
    "b. 832 - 622 = 210",
    "c. 712 - 89 = 623",
    "d. 600 - 235 = 365",
    "e. 505 - 77 = 428",
  ],
  ketukan: [
    k(
      SUARA_G1,
      tambah(0, judul("Latihan 3: pilih cara termudah")),
      ...sebar(SUARA_G1, 5, 8).map((p, i) => tambah(p, ...barisTiga(i, 30 + i * 32, false))),
    ),
    k(
      SUARA_G2,
      bersih(0),
      tambah(0, judul("Soal a dan b")),
      tambah("Soal", ...barisTiga(0, 44, true, W.hijauMuda)),
      tambah(idx(SUARA_G2, "b", 1), ...barisTiga(1, 92, true, W.hijauMuda)),
      tambah(akhir(SUARA_G2), emo("g1", 150, 160, "✅", 24)),
    ),
    k(
      SUARA_G3,
      bersih(0),
      tambah(0, judul("Soal c dan d")),
      tambah("Soal", ...barisTiga(2, 44, true, W.hijauMuda)),
      tambah(idx(SUARA_G3, "d", 1), ...barisTiga(3, 92, true, W.hijauMuda)),
      tambah(akhir(SUARA_G3), emo("g2", 150, 160, "✅", 24)),
    ),
    k(
      SUARA_G4,
      bersih(0),
      tambah(0, judul("Soal e dan yang menantang")),
      tambah("Soal", ...barisTiga(4, 36, true, W.hijauMuda)),
      tambah("menantang", ...kartu("g4", 20, 90, 260, 52, W.krem, ["soal c, d, e paling menantang:", "puluhan atau satuan kecil atau nol"], 9.6)),
    ),
  ],
};

/* ------------------------------ 9. Ayo Berlatih 4: tarik garis (Buku Siswa hlm. 38; Panduan Guru hlm. 58) ------------------------------ */
const SUARA_H1 = "Latihan empat: tarik garis dari soal ke jawaban. Jawabannya: delapan ratus empat puluh lima, dua ratus enam puluh enam, empat ratus lima puluh enam, empat puluh satu, dan enam ratus tiga puluh satu.";
const SUARA_H2 = "Soal a: enam ratus delapan puluh sembilan dikurangi dua ratus tiga puluh tiga sama dengan empat ratus lima puluh enam. Soal b: sembilan ratus dua belas dikurangi enam puluh tujuh sama dengan delapan ratus empat puluh lima.";
const SUARA_H3 = "Soal c punya dua pengurangan: tiga ratus sembilan puluh delapan dikurangi dua ratus sembilan puluh satu sama dengan seratus tujuh, lalu dikurangi enam puluh enam sama dengan empat puluh satu.";
const SUARA_H4 = "Soal d: tujuh ratus dua puluh dikurangi delapan puluh sembilan sama dengan enam ratus tiga puluh satu. Soal e: tiga ratus dikurangi tiga puluh empat sama dengan dua ratus enam puluh enam. Semua garisnya sudah benar.";

const RY = (i: number): number => 30 + i * 27;
const kartuEmpat: Obj[] = [];
LATIHAN_4.soal.forEach((s, i) => kartuEmpat.push(...kartu(`l${i}`, 10, RY(i), 124, 22, W.langit, [`${HURUF[i]}. ${s} =`], 9.6)));
const kartuJawab: Obj[] = [];
LATIHAN_4.jawabanKolom.forEach((v, j) => kartuJawab.push(...kartu(`r${j}`, 196, RY(j), 94, 22, W.krem, [String(v)], 11)));
/** Garis dari soal ke-i ke kartu jawaban yang ditarik buku (Panduan Guru hlm. 58). */
const garisEmpat = (i: number): Obj =>
  panah(`ln${i}`, 136, RY(i) + 11, 58, RY(LATIHAN_4.jawabanKolom.indexOf(LATIHAN_4.garis[i])) - RY(i), W.merah, 1.6);

export const ADEGAN_LATIHAN_EMPAT: AdeganStory = {
  id: "berlatih-empat",
  judul: "Latihan 4: tarik garis",
  sumber: "Materi: soal dan jawaban",
  latar: "#EFF6FF",
  kutipan: ["4. Tariklah garis untuk jawaban yang sesuai!", "689 - 233 =", "912 - 67 =", "720 - 89 =", "300 - 34 =", "5. Kerjakan soal cerita berikut!"],
  ketukan: [
    k(
      SUARA_H1,
      tambah(0, judul("Latihan 4: soal dan jawaban")),
      tambah("soal", ...kartuEmpat),
      tambah("Jawabannya:", ...kartuJawab),
    ),
    k(
      SUARA_H2,
      bersih(0),
      tambah(0, judul("Soal a dan b"), ...kartuEmpat, ...kartuJawab),
      tambah("Soal", garisEmpat(0)),
      tambah(idx(SUARA_H2, "b", 1), garisEmpat(1)),
    ),
    k(
      SUARA_H3,
      bersih(0),
      tambah(0, judul("Soal c: dua pengurangan"), ...kartuEmpat, ...kartuJawab, garisEmpat(0), garisEmpat(1)),
      tambah("Soal", garisEmpat(2)),
      tambah("tiga", teks("hc1", 150, 178, "398 − 291 = 107", 11.4, W.hijau)),
      tambah("lalu", teks("hc2", 150, 194, "107 − 66 = 41", 11.4, W.hijau)),
    ),
    k(
      SUARA_H4,
      bersih(0),
      tambah(0, judul("Soal d dan e"), ...kartuEmpat, ...kartuJawab, garisEmpat(0), garisEmpat(1), garisEmpat(2)),
      tambah("Soal", garisEmpat(3)),
      tambah(idx(SUARA_H4, "e", 1), garisEmpat(4)),
      tambah("Semua", emo("hz", 150, 192, "✅", 22)),
    ),
  ],
};

/* ------------------------------ 10. Ayo Berlatih 5: soal cerita (Buku Siswa hlm. 39; Panduan Guru hlm. 58-59) ------------------------------ */
const SUARA_I1 = "Latihan lima, soal cerita. Soal a: penjual punya tiga ratus tiga puluh tiga apel, terjual seratus dua puluh sembilan. Sisanya: tiga ratus tiga puluh tiga dikurangi seratus dua puluh sembilan sama dengan dua ratus empat.";
const SUARA_I2 = "Soal b: panen mangga tujuh ratus enam puluh lima, busuk seratus tujuh puluh sembilan. Sisanya: tujuh ratus enam puluh lima dikurangi seratus tujuh puluh sembilan sama dengan lima ratus delapan puluh enam.";
const SUARA_I3 = "Soal c: peserta darmawisata empat ratus dua puluh tujuh, perempuan dua ratus delapan belas. Laki-laki: empat ratus dua puluh tujuh dikurangi dua ratus delapan belas sama dengan dua ratus sembilan.";
const SUARA_I4 = "Soal d: peserta upacara seratus dua puluh delapan, laki-laki tujuh puluh sembilan. Perempuan: seratus dua puluh delapan dikurangi tujuh puluh sembilan sama dengan empat puluh sembilan.";
const SUARA_I5 = "Menjawab soal cerita ada empat langkah: diketahui, ditanya, jawab, dan jadi. Hasilnya: dua ratus empat, lima ratus delapan puluh enam, dua ratus sembilan, dan empat puluh sembilan.";

const EMOJI_CERITA = ["🍎", "🥭", "🎒", "🚩"];
const SOAL_CERITA = ["a. apel dijual", "b. mangga busuk", "c. siswa perempuan", "d. siswa laki-laki"];
/** Gambar satu soal cerita: batang sepanjang total, bagian yang diambil (merah muda) dan sisa (hijau muda), dengan angka dan persamaan. */
const gambarCerita = (i: number, at: (string | number)[]): ReturnType<typeof tambah>[] => {
  const [t, b, h] = CERITA[i];
  return [
    tambah(at[0], emo(`ci${i}`, 40, 66, EMOJI_CERITA[i], 24), teks(`cs${i}`, 170, 48, SOAL_CERITA[i], 9.6, W.coklat), ...batangSisa(`cb${i}`, 30, 74, 240, 28, t, b), teks(`ct${i}`, 150, 66, String(t), 10.4, W.biru)),
    tambah(at[1], teks(`cp${i}`, 30 + (240 * b) / t / 2, 120, String(b), 11, W.merah)),
    tambah(at[2], teks(`cq${i}`, 30 + (240 * b) / t + (240 - (240 * b) / t) / 2, 120, String(h), 11, W.hijau)),
    tambah(at[3], ...kartu(`ce${i}`, 50, 138, 200, 34, W.emas, [`${t} − ${b} = ${h}`], 13)),
  ];
};

export const ADEGAN_LATIHAN_LIMA: AdeganStory = {
  id: "berlatih-lima",
  judul: "Latihan 5: soal cerita",
  sumber: "Materi: soal cerita pengurangan",
  latar: "#FFF7ED",
  kutipan: [
    "5. Kerjakan soal cerita berikut!",
    "Penjual buah mempunyai 333 buah apel, seorang pembeli datang membeli 129 buah apel.",
    "Berapakah sisa buah apel milik penjual?",
    "Kebun mangga Pak Joyo mengalami gagal panen.",
    "diperoleh 765 buah sedangkan buah yang busuk 179 buah.",
    "SD Bangkit mengadakan darmawisata.",
    "Sebanyak 218 diantaranya adalah siswa perempuan.",
    "Berapa jumlah siswa laki-laki yang mengikuti darmawisata?",
    "Pada kegiatan Upacara Bendera Hari Kemerdekaan RI, SD Harapan mengirimkan 128 siswa untuk mengikuti upacara di alun-alun kota.",
    "jadi sisa apel milik penjual adalah 204 buah",
    "jadi buah mangga yang tersisa adalah 586 buah.",
    "jadi siswa laki-laki yang mengikuti darmawisata adalah 209 siswa",
    "adalah 49 siswa.",
    "ditanya: sisa apel milik penjual?",
    "diketahui: hasil panen mangga = 765 buah",
  ],
  ketukan: [
    k(SUARA_I1, tambah(0, judul("Soal a: apel")), ...gambarCerita(0, ["Latihan", "terjual", idx(SUARA_I1, "sama", 1), akhir(SUARA_I1)])),
    k(SUARA_I2, bersih(0), tambah(0, judul("Soal b: mangga")), ...gambarCerita(1, ["Soal", "busuk", idx(SUARA_I2, "sama", 1), akhir(SUARA_I2)])),
    k(SUARA_I3, bersih(0), tambah(0, judul("Soal c: darmawisata")), ...gambarCerita(2, ["Soal", "perempuan", idx(SUARA_I3, "sama", 1), akhir(SUARA_I3)])),
    k(SUARA_I4, bersih(0), tambah(0, judul("Soal d: upacara")), ...gambarCerita(3, ["Soal", "laki-laki", idx(SUARA_I4, "sama", 1), akhir(SUARA_I4)])),
    k(
      SUARA_I5,
      bersih(0),
      tambah(0, judul("Empat langkah soal cerita")),
      tambah("Menjawab", ...barisTabel("ik0", 20, 34, [90, 170], ["langkah", "isinya"], 20, 8.6, true)),
      tambah("diketahui,", ...barisTabel("ik1", 20, 54, [90, 170], ["diketahui", "bilangan dalam soal"], 20, 8.6)),
      tambah("ditanya,", ...barisTabel("ik2", 20, 74, [90, 170], ["ditanya", "yang dicari"], 20, 8.6)),
      tambah("jawab,", ...barisTabel("ik3", 20, 94, [90, 170], ["jawab", "pengurangan dan hasilnya"], 20, 8.6)),
      tambah("jadi", ...barisTabel("ik4", 20, 114, [90, 170], ["jadi", "kalimat jawaban"], 20, 8.6)),
      tambah("Hasilnya", ...kartu("ik5", 20, 144, 260, 40, W.hijauMuda, ["204, 586, 209, 49", "hasil keempat soal cerita"], 10.4)),
    ),
  ],
};

/* ------------------------------ 11. Miskonsepsi dan diferensiasi (Panduan Guru hlm. 59-60) ------------------------------ */
const SUARA_J1 = "Hati-hati, ada kesalahan yang sering terjadi. Ingat, pengurangan dimulai dari nilai tempat satuan, yaitu dari kanan ke kiri.";
const SUARA_J2 = "Kesalahan kedua: bila satuan atau puluhan pada bilangan pertama lebih kecil, kita harus mengambil dari nilai tempat sebelumnya. Titik rawannya, ada yang lupa mengambil dan langsung mengurangkan angka kecil dari angka besar.";
const SUARA_J3 = "Untuk kalian yang cepat belajar, kerjakan latihan tanpa bantuan dan boleh mencoba soal tambahan, sementara guru mendampingi teman yang mengalami kesulitan.";
const SUARA_J4 = "Teman yang sedang dan tinggi boleh mencoba pengayaan. Teman yang masih rendah diberi latihan berulang atau penjelasan ulang, mulai dari pengurangan dua angka dan satu angka, lalu dua angka tanpa mengambil.";

export const ADEGAN_MISKONSEPSI: AdeganStory = {
  id: "miskonsepsi-diferensiasi",
  judul: "Miskonsepsi dan diferensiasi",
  sumber: "Pesan guru: kesalahan dan bantuan",
  latar: "#F0FDF4",
  kutipan: [
    "Miskonsepsi yang sering terjadi dalam operasi pengurangan, yaitu",
    "Pengurangan dua bilangan dimulai dari nilai tempat satuan.",
    "Ketika bilangan di nilai tempat satuan/puluhan pada bilangan pertama kurang dari bilangan kedua, maka harus mengambil bilangan di nilai tempat sebelumnya.",
    "Bagi peserta didik yang kecepatan belajarnya tinggi (advanced), minta mereka mengerjakan latihan tanpa bantuan.",
    "Guru juga dapat memberikan soal-soal tambahan.",
    "guru dapat mendampingi peserta didik yang mengalami kesulitan.",
    "Peserta didik yang memiliki kemampuan matematika sedang dan tinggi, guru dapat memberikan pengayaan.",
    "guru memberikan latihan secara berulang atau mengulangi penjelasan secara personal.",
    "Berikan pengurangan bilangan dua angka dan 1 angka terlebih dahulu, selanjutnya berikan contoh pengurangan bilangan dua angka tanpa mengambil.",
  ],
  ketukan: [
    k(
      SUARA_J1,
      tambah(0, judul("Kesalahan yang sering terjadi")),
      tambah("Hati-hati,", ...kartu("m1", 14, 30, 272, 40, W.merahMuda, ["kesalahan yang", "sering terjadi"], 9.6)),
      tambah("Ingat,", ...kartu("m2", 14, 82, 272, 30, W.hijauMuda, ["mulai dari satuan"], 10.4)),
      tambah("kanan", panah("m3", 250, 138, -200, 0, W.merah, 2.4), teks("m4", 150, 160, "dari kanan ke kiri", 10.4, W.merah)),
      tambah("kiri.", emo("m5", 150, 190, "✅", 20)),
    ),
    k(
      SUARA_J2,
      bersih(0),
      tambah(0, judul("Kesalahan kedua")),
      tambah("Kesalahan", ...kartu("n1", 14, 30, 272, 40, W.krem, ["satuan atau puluhan lebih kecil:", "harus mengambil"], 9.6)),
      tambah("rawannya,", ...kartu("n2", 14, 82, 272, 30, W.merahMuda, ["titik rawan: lupa mengambil"], 10.4)),
      tambah("mengurangkan", teks("n3", 150, 140, "7 − 9 ditulis 2", 12, W.merah)),
      tambah("besar.", teks("n4", 150, 168, "27 − 19 = 8, bukan 12", 12, W.hijau)),
    ),
    k(
      SUARA_J3,
      bersih(0),
      tambah(0, judul("Pesan guru: yang cepat belajar")),
      tambah("kalian", ...kartu("o1", 14, 32, 272, 36, W.langit, ["cepat belajar: latihan", "tanpa bantuan"], 9.8)),
      tambah("tambahan,", ...kartu("o2", 14, 80, 272, 30, W.emas, ["boleh diberi soal tambahan"], 10.2)),
      tambah("mendampingi", ...kartu("o3", 14, 122, 272, 36, W.hijauMuda, ["guru mendampingi siswa", "yang mengalami kesulitan"], 9.8)),
    ),
    k(
      SUARA_J4,
      bersih(0),
      tambah(0, judul("Pesan guru: sedang, tinggi, rendah")),
      tambah("sedang", ...kartu("p1", 14, 30, 272, 28, W.langit, ["sedang dan tinggi: pengayaan"], 10)),
      tambah("rendah", ...kartu("p2", 14, 66, 272, 40, W.krem, ["rendah: latihan berulang atau", "penjelasan ulang personal"], 9.6)),
      tambah("mulai", ...kartu("p3", 14, 114, 272, 28, W.hijauMuda, ["mulai: dua angka kurang satu angka"], 9.8)),
      tambah("lalu", ...kartu("p4", 14, 150, 272, 28, W.pink, ["lalu: dua angka tanpa mengambil"], 9.8)),
    ),
  ],
};

