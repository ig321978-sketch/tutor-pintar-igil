import type { AdeganStory } from "./logika-story";
import { KUNCI_EMPAT, LATIHAN_EMPAT, W, barisTabel, batang, emo, judul, kartu, pecahan, segienam, teks } from "./k4b2b-gambar";
import { bersih, idx, k, sorotkan, tambah, warnai } from "./k4b2b-bantu";

/* ------------------------------ 5. Ayo Berlatih 3: tiga segi enam (Buku Siswa hlm. 65; Panduan Guru hlm. 98) ------------------------------ */
const SUARA_H1 = "Soal ketiga memakai tiga segi enam, masing-masing dibagi enam segitiga sama besar. Banyak segitiga yang diarsir: lima, tiga, dan satu.";
const SUARA_H2 = "Tulis pecahannya: lima per enam, tiga per enam, dan satu per enam.";
const SUARA_H3 = "Pembilangnya lima, tiga, dan satu. Urutan dari besar ke kecil: lima per enam lebih dari tiga per enam, dan tiga per enam lebih dari satu per enam.";
const SUARA_H4 = "Sekarang coba kamu urutkan dari kecil ke besar, dengan tiga pecahan yang sama. Caranya tetap sama: lihat pembilangnya, karena penyebutnya sama.";

const X_HEX = [55, 150, 245] as const;
const ARSIR_HEX = [[0, 1, 2, 3, 4], [2, 3, 4], [3]] as const;

export const ADEGAN_BERLATIH_TIGA: AdeganStory = {
  id: "berlatih-tiga",
  judul: "Latihan: tiga segi enam",
  sumber: "Materi: latihan tiga segi enam",
  latar: "#FEF2F2",
  kutipan: ["Lengkapi titik-titik dibawah ini!", "Bab 2 | Pecahan"],
  ketukan: [
    k(
      SUARA_H1,
      tambah(0, judul("Latihan ketiga: segi enam")),
      tambah("segi", ...X_HEX.flatMap((x, i) => segienam(`hx${i}`, x, 70, 36, []))),
      warnai("lima,", W.emas, ...ARSIR_HEX[0].map((j) => `hx0-h${j}`)),
      warnai(idx(SUARA_H1, "tiga", 2), W.emas, ...ARSIR_HEX[1].map((j) => `hx1-h${j}`)),
      warnai("satu.", W.emas, ...ARSIR_HEX[2].map((j) => `hx2-h${j}`)),
    ),
    k(
      SUARA_H2,
      tambah("lima", ...pecahan("hf0", 55, 146, 5, 6, 16)),
      tambah("tiga", ...pecahan("hf1", 150, 146, 3, 6, 16)),
      tambah("satu", ...pecahan("hf2", 245, 146, 1, 6, 16)),
    ),
    k(
      SUARA_H3,
      bersih(0),
      tambah(0, judul("Urut dari besar ke kecil")),
      tambah("Pembilangnya", ...kartu("hu", 50, 32, 200, 28, W.krem, ["pembilang: 5, 3, 1"], 9)),
      tambah(idx(SUARA_H3, "lima", 2), ...pecahan("hc0", 55, 100, 5, 6, 22)),
      tambah("lebih", teks("hs0", 102, 110, ">", 24, W.merah)),
      tambah(idx(SUARA_H3, "tiga", 2), ...pecahan("hc1", 150, 100, 3, 6, 22)),
      tambah("lebih@2", teks("hs1", 197, 110, ">", 24, W.merah)),
      tambah(idx(SUARA_H3, "satu", 2), ...pecahan("hc2", 245, 100, 1, 6, 22)),
      tambah(idx(SUARA_H3, "enam", 4), ...kartu("hk", 60, 152, 180, 30, W.hijauMuda, ["urut dari besar ke kecil"], 9.4)),
    ),
    k(
      SUARA_H4,
      bersih(0),
      tambah(0, judul("Urutkan dari kecil ke besar")),
      tambah("urutkan", ...pecahan("hn1", 55, 74, 1, 6, 22), teks("hn2", 102, 84, "<", 24, W.merah), ...pecahan("hn3", 150, 74, 3, 6, 22), teks("hn4", 197, 84, "<", 24, W.merah), ...pecahan("hn5", 245, 74, 5, 6, 22)),
      tambah("Caranya", ...kartu("hn6", 14, 118, 272, 34, W.langit, ["lihat pembilangnya"], 9)),
      tambah("penyebutnya", ...kartu("hn7", 14, 158, 272, 34, W.emas, ["penyebut sama: pembilang menentukan"], 9)),
    ),
  ],
};

/* ------------------------------ 6. Ayo Berlatih 4: lima pasang pecahan (Buku Siswa hlm. 65; Panduan Guru hlm. 99) ------------------------------ */
const SUARA_E1 = "Soal keempat: lima pasang pecahan, isi dengan lebih dari atau kurang dari. Pasangan a: satu per lima dan tiga per lima. Satu kurang dari tiga, jadi kurang dari.";
const SUARA_E2 = "Pasangan b: dua per empat dan tiga per empat. Dua kurang dari tiga, jadi kurang dari. Pasangan c: tiga per delapan dan dua per delapan. Tiga lebih dari dua, jadi lebih dari.";
const SUARA_E3 = "Pasangan d: lima per sepuluh dan dua per sepuluh. Lima lebih dari dua, jadi lebih dari. Pasangan e: sebelas per tiga belas dan dua belas per tiga belas. Sebelas kurang dari dua belas, jadi kurang dari.";
const SUARA_E4 = "Jadi hasilnya berturut-turut: kurang dari, kurang dari, lebih dari, lebih dari, kurang dari. Periksa lagi hitunganmu dengan membandingkan pembilangnya.";

const SUARA_E5 = "Perhatikan caranya: pada tiap pasang, penyebutnya sama, jadi kita tidak perlu menggambar. Kita cukup menghitung pembilangnya, lalu melihat mana yang lebih banyak. Cara ini lebih cepat untuk penyebut yang besar.";

const HURUF = ["a", "b", "c", "d", "e"] as const;
const yBaris = (i: number): number => 46 + i * 32;
/** Satu baris pasangan: huruf dan dua pecahan; tanda dan alasan ditambahkan terpisah. */
const baris = (i: number) => {
  const [p, q, d] = LATIHAN_EMPAT[i];
  return [teks(`e${i}-h`, 24, yBaris(i) + 4, `${HURUF[i]}.`, 9, W.biru), ...pecahan(`e${i}-f1`, 90, yBaris(i), p, d, 9), ...pecahan(`e${i}-f2`, 210, yBaris(i), q, d, 9)];
};
const tanda = (i: number) => teks(`e${i}-s`, 150, yBaris(i) + 6, KUNCI_EMPAT[i], 20, W.merah);
const alasan = (i: number) => {
  const [p, q] = LATIHAN_EMPAT[i];
  return teks(`e${i}-a`, 262, yBaris(i) + 4, `${p} ${KUNCI_EMPAT[i]} ${q}`, 8.4, W.coklat);
};

export const ADEGAN_BERLATIH_EMPAT: AdeganStory = {
  id: "berlatih-empat",
  judul: "Latihan: lima pasang pecahan",
  sumber: "Materi: latihan lima pasang pecahan",
  latar: "#F5F3FF",
  kutipan: ["Isilah titik-titik berikut dengan notasi", "atau", "Bab 2 | Pecahan"],
  ketukan: [
    k(
      SUARA_E1,
      tambah(0, judul("Latihan keempat: lima pasang")),
      tambah("Pasangan", ...baris(0)),
      tambah(idx(SUARA_E1, "Satu", 2), alasan(0)),
      tambah("jadi", tanda(0)),
    ),
    k(
      SUARA_E2,
      tambah("Pasangan", ...baris(1)),
      tambah(idx(SUARA_E2, "Dua", 2), alasan(1)),
      tambah("jadi", tanda(1)),
      tambah(idx(SUARA_E2, "Pasangan", 2), ...baris(2)),
      tambah(idx(SUARA_E2, "Tiga", 3), alasan(2)),
      tambah("jadi@2", tanda(2)),
    ),
    k(
      SUARA_E3,
      tambah("Pasangan", ...baris(3)),
      tambah(idx(SUARA_E3, "Lima", 2), alasan(3)),
      tambah("jadi", tanda(3)),
      tambah(idx(SUARA_E3, "Pasangan", 2), ...baris(4)),
      tambah(idx(SUARA_E3, "Sebelas", 2), alasan(4)),
      tambah("jadi@2", tanda(4)),
    ),
    k(
      SUARA_E4,
      bersih(0),
      tambah(0, judul("Hasil lima pasang")),
      ...HURUF.map((h, i) => tambah(i < 2 ? idx(SUARA_E4, "kurang", i + 1) : i < 4 ? idx(SUARA_E4, "lebih", i - 1) : idx(SUARA_E4, "kurang", 3), ...kartu(`ez${i}`, 8 + i * 58, 60, 52, 44, W.langit, [`${h}.  ${KUNCI_EMPAT[i]}`], 12))),
      tambah("hitunganmu", emo("ez9", 150, 150, "✅", 30)),
    ),
    k(
      SUARA_E5,
      bersih(0),
      tambah(0, judul("Cara yang lebih cepat")),
      tambah("penyebutnya", ...kartu("ey1", 14, 34, 272, 34, W.hijauMuda, ["penyebut sama: tanpa menggambar"], 9)),
      tambah("menghitung", ...kartu("ey2", 14, 76, 272, 34, W.langit, ["hitung pembilangnya saja"], 9)),
      tambah("Cara", ...kartu("ey3", 14, 118, 272, 34, W.emas, ["cepat untuk penyebut yang besar"], 9)),
    ),
  ],
};

/* ------------------------------ 7. Ayo Berlatih 5: tongkat Asep dan Azizah (Buku Siswa hlm. 65; Panduan Guru hlm. 99) ------------------------------ */
const SUARA_T1 = "Soal cerita terakhir. Asep punya tongkat sepanjang tiga per enam meter, dan Azizah punya tongkat dua per enam meter. Siapa yang tongkatnya lebih panjang?";
const SUARA_T2 = "Penyebutnya sama, yaitu enam, jadi cukup bandingkan pembilang. Tiga lebih dari dua, sehingga tiga per enam lebih dari dua per enam.";
const SUARA_T3 = "Jadi tongkat yang lebih panjang adalah tongkat Asep. Selisihnya satu bagian, yaitu satu per enam meter."
const SUARA_T4 = "Coba kamu cek lagi: kalau tongkat Asep dipotong satu bagian, panjangnya sama dengan tongkat Azizah. Jadi memang beda panjangnya satu bagian.";

export const ADEGAN_BERLATIH_LIMA: AdeganStory = {
  id: "berlatih-lima",
  judul: "Latihan: tongkat Asep dan Azizah",
  sumber: "Materi: soal cerita tongkat",
  latar: "#ECFDF5",
  kutipan: [
    "Asep mempunyai tongkat sepanjang",
    "Azizah mempunyai tongkat",
    "Bandingkan panjang tongkat keduanya. Tongkat",
    "siapakah yang lebih panjang?",
    "Jawab: jadi tongkat yang lebih Panjang adalah tongkat Asep",
  ],
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Soal cerita: tongkat")),
      tambah("Asep", teks("tl1", 34, 66, "Asep", 9, W.biru), ...batang("ta", 70, 50, 180, 26, 6, 0)),
      warnai("tiga", W.emas, "ta-b0", "ta-b1", "ta-b2"),
      tambah("tiga", teks("tm1", 276, 66, "3/6 m", 8.6, W.coklat)),
      tambah("Azizah", teks("tl2", 34, 112, "Azizah", 9, W.biru), ...batang("tz", 70, 96, 180, 26, 6, 0)),
      warnai("dua", W.emas, "tz-b0", "tz-b1"),
      tambah("dua", teks("tm2", 276, 112, "2/6 m", 8.6, W.coklat)),
      tambah("Siapa", teks("tq", 150, 160, "siapa yang lebih panjang?", 10, W.merah)),
    ),
    k(
      SUARA_T2,
      bersih(0),
      tambah(0, judul("Penyebut sama: bandingkan pembilang")),
      tambah("Penyebutnya", ...kartu("tc", 40, 30, 220, 30, W.krem, ["penyebut sama, yaitu 6"], 9)),
      tambah("sehingga", teks("td4", 90, 82, "Asep", 9, W.biru), teks("td5", 210, 82, "Azizah", 9, W.biru)),
      tambah(idx(SUARA_T2, "Tiga"), ...pecahan("td1", 90, 108, 3, 6, 24)),
      tambah("lebih", teks("td2", 150, 118, ">", 28, W.merah)),
      tambah(idx(SUARA_T2, "dua", 2), ...pecahan("td3", 210, 108, 2, 6, 24)),
    ),
    k(
      SUARA_T3,
      bersih(0),
      tambah(0, judul("Jawaban: tongkat Asep")),
      tambah(0, teks("tj1", 34, 66, "Asep", 9, W.biru), ...batang("ta", 70, 50, 180, 26, 6, 3)),
      tambah(0, teks("tj2", 34, 112, "Azizah", 9, W.biru), ...batang("tz", 70, 96, 180, 26, 6, 2)),
      sorotkan("Asep.", "ta-b0", "ta-b1", "ta-b2"),
      tambah("Jadi", emo("tj3", 150, 150, "✅", 26)),
      tambah("Selisihnya", teks("tj4", 150, 188, "selisih: 1 bagian = 1/6 m", 9.4, W.coklat)),
    ),
    k(
      SUARA_T4,
      bersih(0),
      tambah(0, judul("Cek: potong satu bagian")),
      tambah(0, teks("tk1", 34, 66, "Asep", 9, W.biru), ...batang("ta", 70, 50, 180, 26, 6, 3), teks("tk2", 34, 112, "Azizah", 9, W.biru), ...batang("tz", 70, 96, 180, 26, 6, 2)),
      tambah("dipotong", ...kartu("tk3", 40, 140, 220, 30, W.merahMuda, ["Asep dipotong 1 bagian"], 9)),
      tambah("sama", ...kartu("tk4", 40, 176, 220, 20, W.hijauMuda, ["jadi sama panjang"], 8.6)),
    ),
  ],
};

/* ------------------------------ 8. Diferensiasi (Panduan Guru hlm. 99) ------------------------------ */
const SUARA_D1 = "Sekarang waktunya belajar bersama. Setiap murid punya cara belajar yang berbeda, dan guru ikut memahaminya. Kita belajar dengan memecahkan masalah, jadi soal pecahan dikerjakan lewat diskusi.";
const SUARA_D2 = "Kita bekerja dalam kelompok. Murid yang sudah paham menjadi ketua, dan anggotanya teman yang masih belajar. Jangan ragu bertanya kepada ketua atau guru.";
const SUARA_D3 = "Yang sudah cepat boleh mengerjakan latihan tanpa bantuan dan menerima soal tambahan, sementara guru mendampingi teman yang masih kesulitan.";
const SUARA_D4 = "Bila dalam kelompok belum ada yang merasa paham, semua anggota bekerja sama menyelesaikan soal dari guru. Kita juga bisa berdiskusi tentang pecahan dengan penyebut yang sama.";

export const ADEGAN_DIFERENSIASI_B: AdeganStory = {
  id: "diferensiasi-b",
  judul: "Belajar bersama",
  sumber: "Materi: belajar bersama",
  latar: "#F5F3FF",
  kutipan: [
    "Diferensiasi",
    "Karakteristik peserta didik di masing-masing sekolah akan berbeda-beda",
    "kondisi seperti ini hanya guru yang memahami.",
    "Model pembelajaran yang",
    "disarankan untuk bab ini adalah Problem Based Learning.",
    "Pembentukan",
    "kelompok dapat berdasarkan pada karakteristik atau keberagaman",
    "ditentukan ketua kelompok adalah peserta didik dengan",
    "tingkat kemampuan tinggi dengan anggota kelompok tingkat kemampuan",
    "sedang atau kurang.",
    "(advanced), minta mereka mengerjakan latihan tanpa bantuan.",
    "dapat memberikan soal-soal tambahan.",
    "mendampingi peserta didik yang mengalami kesulitan.",
    "Apabila karakteristik peserta didik di sekolah/kelas tidak terdapat",
    "peserta didik dengan kemampuan tinggi",
    "semua anggota kelompok dapat bekerja sama untuk",
    "menyelesaikan masalah/soal yang diberikan oleh guru.",
    "menerapkan metode diskusi dengan melibatkan peserta didik dalam",
    "pecahan dengan penyebut yang sama.",
  ],
  ketukan: [
    k(
      SUARA_D1,
      tambah(0, judul("Belajar bersama")),
      tambah("berbeda,", ...kartu("df1", 14, 32, 272, 34, W.hijauMuda, ["tiap murid punya cara belajar sendiri"], 9)),
      tambah("memahaminya.", ...kartu("df2", 14, 74, 272, 34, W.langit, ["guru ikut memahami"], 9)),
      tambah("memecahkan", ...kartu("df3", 14, 116, 272, 44, W.emas, ["belajar dengan", "memecahkan masalah"], 9.4)),
    ),
    k(
      SUARA_D2,
      bersih(0),
      tambah(0, judul("Kerja kelompok")),
      tambah("kelompok.", ...kartu("dg1", 14, 34, 272, 34, W.hijauMuda, ["bekerja dalam kelompok"], 9)),
      tambah("ketua,", ...kartu("dg2", 14, 76, 272, 34, W.langit, ["ketua: yang sudah paham"], 9)),
      tambah("Jangan", ...kartu("dg3", 14, 118, 272, 34, W.krem, ["jangan ragu bertanya"], 9)),
    ),
    k(
      SUARA_D3,
      bersih(0),
      tambah(0, judul("Murid cepat dan murid kesulitan")),
      tambah("cepat", ...kartu("dh1", 14, 34, 272, 34, W.hijauMuda, ["cepat: latihan tanpa bantuan"], 9)),
      tambah("soal", ...kartu("dh2", 14, 76, 272, 34, W.langit, ["boleh dapat soal tambahan"], 9)),
      tambah("mendampingi", ...kartu("dh3", 14, 118, 272, 34, W.pink, ["guru mendampingi yang kesulitan"], 9)),
    ),
    k(
      SUARA_D4,
      bersih(0),
      tambah(0, judul("Bila belum ada yang paham")),
      tambah("paham,", ...kartu("di1", 14, 34, 272, 40, W.hijauMuda, ["belum ada yang paham:", "semua anggota bekerja sama"], 8.6)),
      tambah("berdiskusi", ...kartu("di2", 14, 82, 272, 40, W.langit, ["atau berdiskusi bersama"], 8.6)),
      tambah("pecahan", ...kartu("di3", 14, 130, 272, 34, W.emas, ["tentang pecahan, penyebut sama"], 9)),
    ),
  ],
};

/* ------------------------------ 9. Rekap kunci, catatan temuan, dan ringkasan (Panduan Guru hlm. 98–99) ------------------------------ */
const SUARA_R1 = "Mari kita rekap jawabannya. Soal pertama lebih dari, soal kedua kurang dari, soal ketiga lima per enam, tiga per enam, satu per enam. Soal keempat: kurang, kurang, lebih, lebih, kurang. Soal kelima: tongkat Asep.";
const SUARA_R2 = "Sebelum selesai, coba kamu urutkan sendiri tiga pecahan ini dari kecil ke besar: dua per sembilan, tujuh per sembilan, dan lima per sembilan.";
const SUARA_R2B = "Lihat pembilangnya, lalu susun: dua per sembilan, lima per sembilan, tujuh per sembilan. Penyebutnya sama, jadi cukup pembilang yang kita urutkan.";
const SUARA_R3 = "Hati-hati, kesalahan yang sering terjadi: melihat penyebut yang besar, seperti tiga belas, lalu mengira pecahannya besar. Padahal penyebutnya sama, jadi yang dibandingkan hanya pembilang.";
const SUARA_R4 = "Ringkasnya: penyebut sama berarti potongan sama besar. Pembilang yang lebih besar berarti pecahan yang lebih besar, dan pembilang yang lebih kecil berarti pecahan yang lebih kecil.";

export const ADEGAN_RINGKAS_B: AdeganStory = {
  id: "ringkas-b",
  judul: "Rekap dan ringkasan",
  sumber: "Materi: rekap dan ringkasan",
  latar: "#FFFBEB",
  kutipan: [
    "Lengkapi titik-titik dibawah ini!",
    "Jawab: jadi tongkat yang lebih Panjang adalah tongkat Asep",
    "Membandingkan dua pecahan yang lebih kecil, lebih besar, atau sama besar",
    "Membandingkan pecahan dengan penyebut yang sama",
  ],
  ketukan: [
    k(
      SUARA_R1,
      tambah(0, judul("Rekap jawaban")),
      tambah(idx(SUARA_R1, "pertama"), ...barisTabelKunci(0, ["1", "lebih dari: 2/4 > 1/4"])),
      tambah(idx(SUARA_R1, "kedua"), ...barisTabelKunci(1, ["2", "kurang dari: 2/6 < 4/6"])),
      tambah(idx(SUARA_R1, "ketiga"), ...barisTabelKunci(2, ["3", "5/6 > 3/6 > 1/6"])),
      tambah(idx(SUARA_R1, "keempat"), ...barisTabelKunci(3, ["4", "< < > > <"])),
      tambah(idx(SUARA_R1, "kelima"), ...barisTabelKunci(4, ["5", "tongkat Asep (3/6 > 2/6)"])),
    ),
    k(
      SUARA_R2,
      bersih(0),
      tambah(0, judul("Coba urutkan sendiri")),
      tambah("urutkan", ...kartu("rn1", 14, 32, 272, 30, W.krem, ["dari kecil ke besar"], 9)),
      tambah(idx(SUARA_R2, "dua"), ...pecahan("rn2", 60, 108, 2, 9, 22)),
      tambah(idx(SUARA_R2, "tujuh"), ...pecahan("rn3", 150, 108, 7, 9, 22)),
      tambah(idx(SUARA_R2, "lima"), ...pecahan("rn4", 240, 108, 5, 9, 22)),
      tambah(idx(SUARA_R2, "besar"), teks("rn5", 150, 170, "?  <  ?  <  ?", 16, W.merah)),
    ),
    k(
      SUARA_R2B,
      bersih(0),
      tambah(0, judul("Urutan dari kecil ke besar")),
      tambah("pembilangnya,", ...kartu("rn6", 14, 32, 272, 30, W.krem, ["lihat pembilangnya"], 9)),
      tambah(idx(SUARA_R2B, "dua"), ...pecahan("rq1", 55, 108, 2, 9, 22)),
      tambah(idx(SUARA_R2B, "lima"), teks("rq2", 102, 118, "<", 24, W.merah), ...pecahan("rq3", 150, 108, 5, 9, 22)),
      tambah(idx(SUARA_R2B, "tujuh"), teks("rq4", 197, 118, "<", 24, W.merah), ...pecahan("rq5", 245, 108, 7, 9, 22)),
      tambah("Penyebutnya", ...kartu("rq6", 40, 152, 220, 34, W.hijauMuda, ["penyebut sama: urutkan pembilang"], 9)),
    ),
    k(
      SUARA_R3,
      bersih(0),
      tambah(0, judul("Hati-hati: salah paham")),
      tambah("penyebut", ...kartu("rs1", 14, 32, 272, 34, W.merahMuda, ["penyebut 13 besar ≠ pecahan besar"], 9)),
      tambah(idx(SUARA_R3, "belas"), ...pecahan("rs2", 90, 100, 11, 13, 20), ...pecahan("rs3", 210, 100, 12, 13, 20), teks("rs4", 150, 110, "?", 24, W.merah)),
      tambah("sama,", ...kartu("rs5", 40, 152, 220, 34, W.hijauMuda, ["penyebut sama: lihat pembilang"], 9)),
    ),
    k(
      SUARA_R4,
      bersih(0),
      tambah(0, judul("Ringkasan subbab B")),
      tambah("penyebut", ...kartu("rr1", 14, 34, 272, 36, W.hijauMuda, ["penyebut sama: potongan sama besar"], 9)),
      tambah("lebih", ...kartu("rr2", 14, 78, 272, 36, W.merahMuda, ["pembilang besar: pecahan besar"], 9)),
      tambah("kecil", ...kartu("rr3", 14, 122, 272, 36, W.langit, ["pembilang kecil: pecahan kecil"], 9)),
      tambah(idx(SUARA_R4, "kecil", 2), emo("rr4", 150, 184, "✅", 22)),
    ),
  ],
};

/** Baris rekap kunci: dua kolom (nomor dan isi). */
function barisTabelKunci(i: number, isi: string[]) {
  return barisTabel(`rk${i}`, 30, 32 + i * 30, [34, 206], isi, 26, 9);
}
