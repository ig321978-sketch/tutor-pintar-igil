import type { AdeganStory } from "./logika-story";
import { ANGKA_BERPIKIR, CONTOH_A, CONTOH_D, GUNUNG, URUT_KUNCI, URUT_SOAL, W, deret, emo, fmt, judul, kartu, kotak, selTabel, tabelKosong, tabelNilai, teks } from "./k4b1c-gambar";
import { bersih, hapus, idx, k, sorotkan, tambah, ubah } from "./k4b1c-bantu";

/* ------------------------------ 10. Ayo Mengamati: tinggi tiga gunung (Buku Siswa hlm. 21-22; Panduan Guru hlm. 42-43) ------------------------------ */
const SUARA_G1 = "Ayo Mengamati: mengurutkan bilangan dari terkecil ke terbesar. Indonesia adalah negara kepulauan, dan beberapa pulaunya memiliki gunung.";
const SUARA_G2 = "Pulau Sumatra memiliki Gunung Sinabung, Pulau Jawa memiliki Gunung Semeru, dan Pulau Lombok memiliki Gunung Rinjani. Ketiga gunung itu memiliki ketinggian yang berbeda.";
const SUARA_G3 = "Peta menuliskan tinggi tiap gunung dalam meter di atas permukaan laut: Sinabung dua ribu empat ratus enam puluh, Semeru tiga ribu enam ratus tujuh puluh enam, Rinjani tiga ribu tujuh ratus dua puluh enam.";
const SUARA_G4 = "Gunung manakah yang tertinggi, dan dapatkah kalian mengurutkannya dari yang terendah? Kita harus memperhatikan nilai tempat ribuan, ratusan, puluhan, dan satuan.";
const SUARA_G5 = "Bandingkan ribuannya: dua kurang dari tiga. Jadi dua ribu empat ratus enam puluh kurang dari tiga ribu enam ratus tujuh puluh enam, dan kurang dari tiga ribu tujuh ratus dua puluh enam.";

/** Batang tinggi gunung: skala satu sentimeter gambar untuk empat puluh meter (tinggi kotak = meter dibagi 40), alas di y = 150. */
const SKALA_GUNUNG = 40;
const ALAS = 150;
const urutBuku = [GUNUNG[1], GUNUNG[0], GUNUNG[2]] as const;

export const ADEGAN_GUNUNG: AdeganStory = {
  id: "gunung",
  judul: "Ayo Mengamati: tinggi tiga gunung",
  sumber: "Materi: tinggi tiga gunung",
  latar: "#F0FDF4",
  kutipan: [
    "Mengurutkan bilangan dari terkecil ke terbesar",
    "Indonesia merupakan negara kepulauan.",
    "Beberapa pulau di Indonesia memiliki gunung.",
    "Pulau Sumatra memiliki gunung aktif yaitu Gunung Sinabung.",
    "Pulau Jawa memiliki gunung tertinggi yaitu Gunung Semeru.",
    "Pulau Lombok memiliki Gunung Rinjani.",
    "Terdapat tiga gunung yang memiliki ketinggian berbeda-beda sebagai berikut.",
    "Gunung manakah yang tertinggi?",
    "Kita harus memperhatikan nilai tempat ribuan, ratusan, puluhan, dan satuan.",
    "Berdasarkan penjelasan di atas, diperoleh 2 kurang dari 3. Jadi, bilangan 2.460",
    "Guru memberikan contoh kontekstual, misalnya tinggi gunung di Indonesia.",
    "bilangan menggunakan nilai tempat.",
  ],
  ketukan: [
    k(
      SUARA_G1,
      tambah(0, judul("Ayo Mengamati: gunung")),
      tambah("Indonesia", emo("i1", 80, 80, "🏝", 40), ...kartu("i2", 120, 62, 160, 36, W.langit, ["negara kepulauan"], 10)),
      tambah("gunung.", emo("i3", 150, 148, "🌋", 40)),
    ),
    k(
      SUARA_G2,
      bersih(0),
      tambah(0, judul("Tiga pulau, tiga gunung")),
      tambah("Sumatra", ...kartu("p1", 14, 36, 272, 32, W.hijauMuda, ["Pulau Sumatra: Gunung Sinabung"], 9.6)),
      tambah("Jawa", ...kartu("p2", 14, 76, 272, 32, W.krem, ["Pulau Jawa: Gunung Semeru"], 9.6)),
      tambah("Lombok", ...kartu("p3", 14, 116, 272, 32, W.pink, ["Pulau Lombok: Gunung Rinjani"], 9.6)),
      tambah("berbeda.", teks("p4", 150, 176, "tinggi ketiganya berbeda", 10, W.merah)),
    ),
    k(
      SUARA_G3,
      bersih(0),
      tambah(0, judul("Tinggi gunung (meter di atas laut)")),
      ...GUNUNG.map((g, i) => tambah(g.nama, kotak(`gb${i}`, 40 + i * 80, ALAS - g.m / SKALA_GUNUNG, 60, g.m / SKALA_GUNUNG, W.langit, W.biru, { rx: 2 }), teks(`gn${i}`, 70 + i * 80, ALAS + 14, g.nama, 9.4), teks(`gt${i}`, 70 + i * 80, ALAS - g.m / SKALA_GUNUNG - 4, `${fmt(g.m)} m`, 10, W.hijau))),
    ),
    k(
      SUARA_G4,
      bersih(0),
      tambah(0, judul("Lihat nilai tempatnya")),
      ...urutBuku.map((g, i) => tambah(["tertinggi,", "terendah?", "nilai"][i], ...tabelNilai(`t${i}`, 14, 44 + i * 52, g.m, 28, 11), teks(`tn${i}`, 190, 44 + i * 52 + 24, g.nama, 10, W.coklat))),
    ),
    k(
      SUARA_G5,
      hapus(0, "tn0", "tn1", "tn2"),
      ubah("ribuannya:", selTabel("t0", 0), selTabel("t1", 0), selTabel("t2", 0)),
      tambah("dua", teks("r1", 222, 62, "2 < 3", 13, W.merah)),
      tambah(idx(SUARA_G5, "dua", 2), teks("r2", 222, 92, "2.460 < 3.676", 11, W.merah)),
      tambah(idx(SUARA_G5, "dan", 1), teks("r3", 222, 122, "2.460 < 3.726", 11, W.merah)),
      tambah("kurang@3", ...kartu("r4", 168, 146, 124, 36, W.emas, ["terendah:", "Sinabung"], 9.4)),
    ),
  ],
};

/* ------------------------------ 11. Mengurutkan 3.676 dan 3.726, lalu Ayo Berlatih mengurutkan (Buku Siswa hlm. 23; Panduan Guru hlm. 43) ------------------------------ */
const SUARA_V1 = "Selanjutnya bandingkan ratusan untuk tiga ribu enam ratus tujuh puluh enam dan tiga ribu tujuh ratus dua puluh enam, yang ribuannya sama. Enam kurang dari tujuh, jadi yang pertama lebih kecil.";
const SUARA_V2 = "Urutan dari terkecil ke terbesar: dua ribu empat ratus enam puluh, lalu tiga ribu enam ratus tujuh puluh enam, lalu tiga ribu tujuh ratus dua puluh enam. Gunung tertinggi adalah Rinjani.";
const SUARA_V3 = "Ayo Berlatih: isi tabel sesuai nilai tempat, lalu urutkan tujuh ribu lima ratus tujuh puluh, lima ribu dua ratus empat puluh, tiga ribu empat puluh satu, dan sembilan ribu sembilan ratus empat puluh satu.";
const SUARA_V4 = "Sekarang isi tabelnya: tabel kedua berisi lima, dua, empat, nol. Tabel ketiga berisi tiga, nol, empat, satu. Tabel keempat berisi sembilan, sembilan, empat, satu.";
const SUARA_V6 = "Jadi urutan dari terkecil ke terbesar: tiga ribu empat puluh satu, lima ribu dua ratus empat puluh, tujuh ribu lima ratus tujuh puluh, lalu sembilan ribu sembilan ratus empat puluh satu.";

const isiKolom = (at: string | number, id: string, n: number) => ubah(at, ...String(n).split("").map((d, c) => ({ id: `${id}-t${c}`, isi: d })));
const POS_URUT = [[14, 44], [174, 44], [14, 118], [174, 118]] as const;

export const ADEGAN_URUT: AdeganStory = {
  id: "urut",
  judul: "Mengurutkan bilangan dan Ayo Berlatih",
  sumber: "Materi: mengurutkan bilangan",
  latar: "#FFFBEB",
  kutipan: [
    "Selanjutnya, kita membandingkan untuk nilai tempat ratusan dari bilangan",
    "diperoleh 6 kurang dari 7, sehingga 3.676 <",
    "Urutan bilangan 3.676, 2.460, dan 3.726 dari terkecil ke terbesar sebagai berikut.",
    "Salinlah tabel berikut pada buku kalian.",
    "Isilah titik-titik pada tabel dengan",
    "angka sesuai nilai tempatnya, kemudian urutkan bilangan 7.570, 5.240, 3.041",
    "dan 9.941 dari yang terkecil ke terbesar.",
    "Peserta didik menyalin tabel berikut pada buku mereka masing-masing.",
    "Jadi, urutan bilangan 7.570, 5.240, 3.041 dan 9.941 dari terkecil ke terbesar",
  ],
  ketukan: [
    k(
      SUARA_V1,
      tambah(0, judul("3.676 dan 3.726")),
      tambah(idx(SUARA_V1, "enam", 2), ...tabelNilai("va", 14, 52, 3676, 28, 11)),
      tambah(idx(SUARA_V1, "enam", 3), ...tabelNilai("vb", 174, 52, 3726, 28, 11)),
      ubah("ribuannya", selTabel("va", 0, W.hijauMuda), selTabel("vb", 0, W.hijauMuda)),
      ubah(idx(SUARA_V1, "enam", 4), selTabel("va", 1), selTabel("vb", 1)),
      tambah(idx(SUARA_V1, "enam", 4), teks("vc", 150, 124, "6 < 7", 18, W.merah)),
      tambah("kecil.", teks("vd", 150, 152, "3.676 < 3.726", 18, W.merah)),
    ),
    k(
      SUARA_V2,
      bersih(0),
      tambah(0, judul("Urut dari terkecil ke terbesar")),
      tambah("dua", ...kartu("ua", 14, 60, 80, 44, W.hijauMuda, ["2.460"], 13)),
      tambah("lalu", ...kartu("ub", 110, 60, 80, 44, W.krem, ["3.676"], 13), teks("u1", 102, 86, "<", 18, W.merah)),
      tambah("lalu@2", ...kartu("uc", 206, 60, 80, 44, W.pink, ["3.726"], 13), teks("u2", 198, 86, "<", 18, W.merah)),
      tambah("Rinjani.", ...kartu("ur", 60, 128, 180, 34, W.emas, ["tertinggi: Rinjani"], 10.4)),
    ),
    k(
      SUARA_V3,
      bersih(0),
      tambah(0, judul("Ayo Berlatih: isi tabel, urutkan")),
      tambah(idx(SUARA_V3, "puluh", 1), ...tabelNilai("wa", POS_URUT[0][0], POS_URUT[0][1], URUT_SOAL[0], 28, 11)),
      tambah(idx(SUARA_V3, "puluh", 2), ...tabelKosong("wb", POS_URUT[1][0], POS_URUT[1][1], URUT_SOAL[1], [], 28, 11)),
      tambah(idx(SUARA_V3, "satu", 1), ...tabelKosong("wc", POS_URUT[2][0], POS_URUT[2][1], URUT_SOAL[2], [], 28, 11)),
      tambah(idx(SUARA_V3, "satu", 2), ...tabelKosong("wd", POS_URUT[3][0], POS_URUT[3][1], URUT_SOAL[3], [], 28, 11)),
    ),
    k(
      SUARA_V4,
      isiKolom("berisi", "wb", URUT_SOAL[1]),
      isiKolom("berisi@2", "wc", URUT_SOAL[2]),
      isiKolom("berisi@3", "wd", URUT_SOAL[3]),
      ubah(idx(SUARA_V4, "satu", 2), selTabel("wa", 0), selTabel("wb", 0), selTabel("wc", 0), selTabel("wd", 0)),
      tambah(idx(SUARA_V4, "satu", 2), teks("wu", 150, 176, "ribuan: 3 < 5 < 7 < 9", 12, W.merah)),
    ),
    k(
      SUARA_V6,
      bersih(0),
      tambah(0, judul("Urutan: terkecil ke terbesar")),
      ...URUT_KUNCI.map((n, i) => tambah(["tiga", "lima", "tujuh", "sembilan"][i], ...kartu(`vk${i}`, 8 + i * 74, 70, 68, 44, [W.hijauMuda, W.krem, W.pink, W.langit][i], [fmt(n)], 11.4))),
      tambah(idx(SUARA_V6, "satu", 2), teks("vm", 150, 150, "3.041 < 5.240 < 7.570 < 9.941", 12, W.merah)),
    ),
  ],
};

/* ------------------------------ 12. Ayo Berpikir: empat angka satu, lima, sembilan, dua (Panduan Guru hlm. 43-44) ------------------------------ */
const SUARA_Y1 = "Ayo Berpikir: angka satu, lima, sembilan, dan dua disusun menjadi bilangan empat angka tanpa berulang.";
const SUARA_Y2 = "Contoh susunan yang bisa kita buat: seribu lima ratus sembilan puluh dua, dua ribu sembilan ratus lima puluh satu, lima ribu sembilan ratus dua puluh satu, sembilan ribu dua ratus lima belas, dan lima ribu seratus dua puluh sembilan.";
const SUARA_Y3 = "Soal b: dari susunan tadi, yang terbesar sembilan ribu dua ratus lima belas, dan yang terkecil seribu lima ratus sembilan puluh dua.";
const SUARA_Y4 = "Tetapi bila kita periksa semua susunan yang mungkin, bilangan terbesar sebenarnya sembilan ribu lima ratus dua puluh satu, dan terkecil seribu dua ratus lima puluh sembilan.";
const SUARA_Y5 = "Soal c: susunan tadi diurutkan dari terkecil, yaitu seribu lima ratus sembilan puluh dua sampai sembilan ribu dua ratus lima belas.";
const SUARA_Y6 = "Soal d dan e: angka boleh berulang. Contoh susunan d: terbesar sembilan ribu sembilan ratus dua puluh lima, terkecil seribu seratus lima puluh lima.";
const SUARA_Y7 = "Soal f: bilangan terbesar yang bisa dibuat adalah sembilan ribu sembilan ratus sembilan puluh sembilan, karena angka boleh berulang. Terkecil bila berulang adalah seribu seratus sebelas.";

/** Kotak sorot setinggi dua deret contoh miskonsepsi (deret di x 70, baris y 66 dan 106, lebar kolom 26) di kolom `c`. */
const kolom = (id: string, c: number, warna: string) => kotak(id, 70 + c * 26 - 13, 48, 26, 64, warna, W.merah, { rx: 4, tebal: 1.4, z: -1 });

const XA = [14, 70, 126, 182, 238] as const;
const WARNA5 = [W.hijauMuda, W.krem, W.pink, W.langit, W.lavender];

export const ADEGAN_BERPIKIR: AdeganStory = {
  id: "berpikir",
  judul: "Ayo Berpikir: menyusun bilangan dari empat angka",
  sumber: "Materi: menyusun bilangan dari angka",
  latar: "#F5F3FF",
  kutipan: [
    "Ayo Berpikir",
    "Diberikan empat angka: 1,5,9,2. Dari empat angka tersebut dapat disusun",
    "e. Tentukan bilangan terbesar dan terkecil yang disusun dari 4 angka dengan",
    "a. Susunlah 4 bilangan dari empat angka di atas.",
    "contoh jawaban: 1.592; 2.951; 5.921; 9.215; 5.129",
    "b. Tentukan bilangan terbesar dan bilangan terkecil yang disusun dari 4 angka",
    "dari jawaban a) bilangan terbesar: 9.215 bilangan terkecil: 1.592",
    "1.592; 2.951; 5.129; 5.921; 9.215",
    "d. Susunlah bilangan yang terdiri 4 angka di atas dengan syarat angkanya",
    "contoh jawaban: 1.155; 9.925; 5.119; 2.222; 9.225",
    "dari jawaban d) bilangan terbesar: 9.925 dan bilangan terkecil 1.155",
    "bilangan yang lebih besar adalah bilangan 9.999 karena syarat angka boleh",
  ],
  ketukan: [
    k(
      SUARA_Y1,
      tambah(0, judul("Ayo Berpikir: 1, 5, 9, 2")),
      ...ANGKA_BERPIKIR.map((d, i) => tambah([idx(SUARA_Y1, "satu"), idx(SUARA_Y1, "lima"), idx(SUARA_Y1, "sembilan"), idx(SUARA_Y1, "dua", 1)][i], ...kartu(`ya${i}`, 40 + i * 60, 50, 40, 40, [W.hijauMuda, W.krem, W.pink, W.langit][i], [String(d)], 18))),
      tambah("tanpa", ...kartu("yb", 40, 112, 220, 44, W.emas, ["susun bilangan empat angka", "tanpa angka berulang"], 9)),
    ),
    k(
      SUARA_Y2,
      bersih(0),
      tambah(0, judul("Contoh susunan a")),
      ...CONTOH_A.map((n, i) => tambah([idx(SUARA_Y2, "seribu"), idx(SUARA_Y2, "dua", 2), idx(SUARA_Y2, "lima", 3), idx(SUARA_Y2, "sembilan", 4), idx(SUARA_Y2, "dan")][i], ...kartu(`ye${i}`, XA[i], 60, 50, 30, WARNA5[i], [fmt(n)], 9.6))),
    ),
    k(
      SUARA_Y3,
      ubah(0, { id: "jud", isi: "Soal b: terbesar dan terkecil" }),
      sorotkan("terbesar", "ye3-k"),
      sorotkan("terkecil", "ye0-k"),
      tambah("terbesar", teks("yt", 182 + 25, 108, "terbesar", 9.4, W.merah)),
      tambah("terkecil", teks("yu", 14 + 25, 108, "terkecil", 9.4, W.merah)),
    ),
    k(
      SUARA_Y4,
      hapus(0, "yt", "yu"),
      tambah(0, ...kartu("yh", 14, 124, 272, 28, W.merahMuda, ["semua susunan yang mungkin"], 9)),
      tambah("terbesar", ...kartu("yi", 14, 160, 130, 34, W.hijauMuda, ["terbesar", fmt(9521)], 10.4)),
      tambah("terkecil", ...kartu("yj", 156, 160, 130, 34, W.langit, ["terkecil", fmt(1259)], 10.4)),
    ),
    k(
      SUARA_Y5,
      bersih(0),
      tambah(0, judul("Soal c: urut dari terkecil")),
      ...[1592, 2951, 5129, 5921, 9215].map((n, i) => tambah("diurutkan", ...kartu(`yc${i}`, XA[i], 60, 50, 30, WARNA5[i], [fmt(n)], 9.6))),
      tambah(idx(SUARA_Y5, "belas", 1), teks("yc9", 150, 118, "1.592 < 2.951 < 5.129 < 5.921 < 9.215", 9.4, W.merah)),
    ),
    k(
      SUARA_Y6,
      bersih(0),
      tambah(0, judul("Soal d dan e: boleh berulang")),
      ...CONTOH_D.map((n, i) => tambah(0, ...kartu(`yd${i}`, XA[i], 50, 50, 30, WARNA5[i], [fmt(n)], 9.6))),
      sorotkan("terbesar", "yd1-k"),
      sorotkan("terkecil", "yd0-k"),
      tambah("terbesar", teks("yv", 95, 98, "terbesar", 9.4, W.merah)),
      tambah("terkecil", teks("yw", 39, 98, "terkecil", 9.4, W.merah)),
    ),
    k(
      SUARA_Y7,
      bersih(0),
      tambah(0, judul("Soal f: boleh berulang")),
      tambah("sembilan@1", ...kartu("yf", 30, 44, 240, 40, W.hijauMuda, ["terbesar", fmt(9999)], 10.4)),
      tambah("Terkecil", ...kartu("yg", 30, 104, 240, 40, W.langit, ["terkecil", fmt(1111)], 10.4)),
    ),
  ],
};

/* ------------------------------ 13. Miskonsepsi, diferensiasi, dan ringkasan (Panduan Guru hlm. 44) ------------------------------ */
const SUARA_C1 = "Hati-hati, kesalahan yang sering terjadi: membandingkan bilangan empat angka mulai dari satuan, puluhan, ratusan, baru ribuan. Cara itu keliru.";
const SUARA_C2 = "Perhatikan contoh ini: seribu sembilan ratus delapan puluh tujuh dan dua ribu empat puluh lima. Dari satuan, tujuh lebih dari lima, jadi yang pertama dikira lebih besar. Padahal ribuannya lebih kecil.";
const SUARA_C3 = "Yang benar mulai dari ribuan. Satu kurang dari dua, jadi seribu sembilan ratus delapan puluh tujuh kurang dari dua ribu empat puluh lima, walau satuannya lebih besar.";
const SUARA_C4 = "Bagi yang cepat selesai, kerjakan latihan sendiri dan coba soal tambahan, sementara guru mendampingi yang kesulitan. Kita belajar lewat diskusi dan tanya jawab, dan saling bekerja sama dalam kelompok.";
const SUARA_C5 = "Ringkasnya: bandingkan dari ribuan ke satuan, tulis tanda lebih dari, kurang dari, atau sama dengan, dan urutkan bilangan dengan membandingkan nilai tempatnya.";

export const ADEGAN_CATATAN: AdeganStory = {
  id: "catatan",
  judul: "Pesan guru dan ringkasan",
  sumber: "Materi: pesan guru dan ringkasan",
  latar: "#FEF2F2",
  kutipan: [
    "Miskonsepsi",
    "Miskonsepsi materi membandingkan mengurutkan bilangan cacah terjadi",
    "pada membandingkan dua bilangan cacah 4 angka yang dimulai dari",
    "satuan, puluhan, ratusan baru ribuan.",
    "Diferensiasi",
    "minta mereka mengerjakan Latihan tanpa bantuan",
    "Guru juga dapat memberikan soal-soal tambahan",
    "adalah Diskusi dan Tanya Jawab",
    "Apabila karakteristik peserta didik di sekolah/kelas tidak terdapat",
    "melalui metode diskusi",
  ],
  ketukan: [
    k(
      SUARA_C1,
      tambah(0, judul("Hati-hati: jangan mulai dari satuan")),
      tambah("satuan,", ...kartu("m1", 14, 40, 272, 30, W.merahMuda, ["keliru: satuan, puluhan, ratusan, ribuan"], 8.8)),
      tambah("ribuan.", teks("m2", 150, 112, "4  ←  3  ←  5  ←  2", 18, W.merah), teks("m3", 150, 140, "ribuan ← ratusan ← puluhan ← satuan", 8.8, W.merah)),
      tambah("keliru.", emo("m4", 150, 180, "❌", 24)),
    ),
    k(
      SUARA_C2,
      bersih(0),
      tambah(0, judul("Contoh: salah langkah")),
      tambah(idx(SUARA_C2, "tujuh", 2), ...deret("ma", 70, 66, 1987, 26, 20), ...deret("mb", 70, 106, 2045, 26, 20), teks("mac", 230, 66, "1.987", 11, W.hijau), teks("mbc", 230, 106, "2.045", 11, W.hijau)),
      tambah("satuan,", kolom("mc", 3, W.merahMuda)),
      tambah("dikira", teks("md", 150, 150, "7 > 5, dikira 1.987 lebih besar", 10, W.merah)),
      tambah("ribuannya", teks("me", 150, 172, "padahal ribuan: 1 < 2", 10, W.hijau)),
    ),
    k(
      SUARA_C3,
      hapus(0, "mc", "md", "me"),
      tambah(0, kolom("mf", 0, W.hijauMuda)),
      tambah("kurang@2", teks("mg", 150, 150, "1.987 < 2.045", 18, W.merah)),
      tambah("walau", emo("mh", 150, 182, "✅", 24)),
    ),
    k(
      SUARA_C4,
      bersih(0),
      tambah(0, judul("Belajar sesuai kebutuhan")),
      tambah("cepat", ...kartu("d1", 14, 40, 272, 36, W.hijauMuda, ["cepat: latihan mandiri,", "soal tambahan"], 9)),
      tambah("kesulitan.", ...kartu("d2", 14, 86, 272, 36, W.krem, ["butuh bantuan: didampingi guru"], 9)),
      tambah("diskusi", ...kartu("d3", 14, 128, 272, 32, W.langit, ["metode: diskusi dan tanya jawab"], 9)),
      tambah("kelompok.", ...kartu("d4", 14, 166, 272, 30, W.pink, ["kerja sama dalam kelompok"], 8.6)),
    ),
    k(
      SUARA_C5,
      bersih(0),
      tambah(0, judul("Ringkasan subbab C")),
      tambah("bandingkan", ...kartu("s1", 14, 36, 272, 34, W.merahMuda, ["bandingkan dari ribuan ke satuan"], 9.6)),
      tambah("tulis", ...kartu("s2", 14, 80, 272, 34, W.krem, ["tanda >, <, atau ="], 9.6)),
      tambah("urutkan", ...kartu("s3", 14, 124, 272, 34, W.hijauMuda, ["urutkan lewat nilai tempat"], 9.6)),
    ),
  ],
};
