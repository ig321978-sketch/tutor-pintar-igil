import type { AdeganStory } from "./logika-story";
import { KUNCI_EMPAT, LATIHAN_EMPAT, W, barisTabel, batang, emo, judul, kartu, pecahan, segienam, teks } from "./k4b2b-gambar";
import { bersih, idx, k, sorotkan, tambah, warnai } from "./k4b2b-bantu";

/* ------------------------------ 5. Ayo Berlatih 3: tiga segi enam (Buku Siswa hlm. 65; Panduan Guru hlm. 98) ------------------------------ */
const SUARA_H1 = "Nomor tiga memakai tiga segi enam, masing-masing dibagi enam segitiga sama besar. Banyak segitiga yang diarsir: lima, tiga, dan satu.";
const SUARA_H2 = "Tulis pecahannya: lima per enam, tiga per enam, dan satu per enam.";
const SUARA_H3 = "Pembilangnya lima, tiga, dan satu. Urutan dari besar ke kecil: lima per enam lebih dari tiga per enam, dan tiga per enam lebih dari satu per enam. Cocok dengan kunci.";
const SUARA_H4 = "Inilah satu-satunya soal yang mengurutkan tiga pecahan, padahal pengalaman belajar menyebut mengurutkan. Guru dapat menambah soal urutan lain.";

const X_HEX = [55, 150, 245] as const;
const ARSIR_HEX = [[0, 1, 2, 3, 4], [2, 3, 4], [3]] as const;

export const ADEGAN_BERLATIH_TIGA: AdeganStory = {
  id: "berlatih-tiga",
  judul: "Ayo Berlatih nomor 3: tiga segi enam",
  sumber: "Buku Siswa hlm. 65; Panduan Guru hlm. 98",
  latar: "#FEF2F2",
  kutipan: ["Lengkapi titik-titik dibawah ini!", "Bab 2 | Pecahan"],
  ketukan: [
    k(
      SUARA_H1,
      tambah(0, judul("Nomor 3: tiga segi enam")),
      tambah("segi", ...X_HEX.flatMap((x, i) => segienam(`hx${i}`, x, 70, 36, []))),
      warnai("lima,", W.emas, ...ARSIR_HEX[0].map((j) => `hx0-h${j}`)),
      warnai(idx(SUARA_H1, "tiga", 3), W.emas, ...ARSIR_HEX[1].map((j) => `hx1-h${j}`)),
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
      tambah("kunci.", ...kartu("hk", 60, 152, 180, 30, W.hijauMuda, ["cocok dengan kunci"], 9.4)),
    ),
    k(
      SUARA_H4,
      bersih(0),
      tambah(0, judul("Catatan: soal mengurutkan")),
      tambah("satu-satunya", ...kartu("hn1", 14, 34, 272, 34, W.merahMuda, ["hanya nomor 3 yang mengurutkan"], 9)),
      tambah("pengalaman", ...kartu("hn2", 14, 76, 272, 38, W.langit, ["pengalaman belajar: membandingkan", "dan mengurutkan"], 8.2)),
      tambah("menambah", ...kartu("hn3", 14, 122, 272, 34, W.emas, ["guru menambah soal urutan lain"], 9)),
    ),
  ],
};

/* ------------------------------ 6. Ayo Berlatih 4: lima pasang pecahan (Buku Siswa hlm. 65; Panduan Guru hlm. 99) ------------------------------ */
const SUARA_E1 = "Nomor empat: lima pasang pecahan, isi dengan lebih dari atau kurang dari. Pasangan a: satu per lima dan tiga per lima. Satu kurang dari tiga, jadi kurang dari.";
const SUARA_E2 = "Pasangan b: dua per empat dan tiga per empat. Dua kurang dari tiga, jadi kurang dari. Pasangan c: tiga per delapan dan dua per delapan. Tiga lebih dari dua, jadi lebih dari.";
const SUARA_E3 = "Pasangan d: lima per sepuluh dan dua per sepuluh. Lima lebih dari dua, jadi lebih dari. Pasangan e: sebelas per tiga belas dan dua belas per tiga belas. Sebelas kurang dari dua belas, jadi kurang dari.";
const SUARA_E4 = "Kunci panduan guru: kurang dari, kurang dari, lebih dari, lebih dari, kurang dari. Semua cocok dengan hitungan kita.";

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
  judul: "Ayo Berlatih nomor 4: lima pasang pecahan",
  sumber: "Buku Siswa hlm. 65; Panduan Guru hlm. 99",
  latar: "#F5F3FF",
  kutipan: ["Isilah titik-titik berikut dengan notasi", "atau", "Bab 2 | Pecahan"],
  ketukan: [
    k(
      SUARA_E1,
      tambah(0, judul("Nomor 4: lima pasang pecahan")),
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
      tambah(0, judul("Kunci nomor 4 cocok")),
      ...HURUF.map((h, i) => tambah(i < 2 ? idx(SUARA_E4, "kurang", i + 1) : i < 4 ? idx(SUARA_E4, "lebih", i - 1) : idx(SUARA_E4, "kurang", 3), ...kartu(`ez${i}`, 8 + i * 58, 60, 52, 44, W.langit, [`${h}.  ${KUNCI_EMPAT[i]}`], 12))),
      tambah("cocok", emo("ez9", 150, 150, "✅", 30)),
    ),
  ],
};

/* ------------------------------ 7. Ayo Berlatih 5: tongkat Asep dan Azizah (Buku Siswa hlm. 65; Panduan Guru hlm. 99) ------------------------------ */
const SUARA_T1 = "Nomor lima. Asep punya tongkat sepanjang tiga per enam meter, dan Azizah punya tongkat dua per enam meter. Siapa yang tongkatnya lebih panjang?";
const SUARA_T2 = "Penyebutnya sama, yaitu enam, jadi cukup bandingkan pembilang. Tiga lebih dari dua, sehingga tiga per enam lebih dari dua per enam.";
const SUARA_T3 = "Jawaban panduan guru: tongkat yang lebih panjang adalah tongkat Asep. Cocok dengan hitungan kita. Selisihnya satu bagian, yaitu satu per enam meter.";

export const ADEGAN_BERLATIH_LIMA: AdeganStory = {
  id: "berlatih-lima",
  judul: "Ayo Berlatih nomor 5: tongkat Asep dan Azizah",
  sumber: "Buku Siswa hlm. 65; Panduan Guru hlm. 99",
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
      tambah(0, judul("Nomor 5: tongkat")),
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
      tambah("Cocok", emo("tj3", 150, 150, "✅", 26)),
      tambah("Selisihnya", teks("tj4", 150, 188, "selisih: 1 bagian = 1/6 m", 9.4, W.coklat)),
    ),
  ],
};

/* ------------------------------ 8. Diferensiasi (Panduan Guru hlm. 99) ------------------------------ */
const SUARA_D1 = "Diferensiasi di panduan guru: karakteristik murid tiap sekolah berbeda, dan hanya guru yang memahaminya. Model pembelajaran yang disarankan untuk bab ini adalah Problem Based Learning.";
const SUARA_D2 = "Kelompok dibentuk menurut karakteristik atau keberagaman murid. Ketua kelompok adalah murid berkemampuan tinggi, dengan anggota berkemampuan sedang atau kurang.";
const SUARA_D3 = "Murid yang kecepatan belajarnya tinggi mengerjakan latihan tanpa bantuan dan boleh diberi soal tambahan, sementara guru mendampingi murid yang mengalami kesulitan.";
const SUARA_D4 = "Bila tidak ada murid berkemampuan tinggi, semua anggota kelompok bekerja sama menyelesaikan soal dari guru. Bila model itu tidak memungkinkan, guru memakai metode diskusi tentang pecahan dengan penyebut yang sama.";

export const ADEGAN_DIFERENSIASI_B: AdeganStory = {
  id: "diferensiasi-b",
  judul: "Diferensiasi subbab B",
  sumber: "Panduan Guru hlm. 99",
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
      tambah(0, judul("Diferensiasi")),
      tambah("karakteristik", ...kartu("df1", 14, 32, 272, 34, W.hijauMuda, ["karakter murid tiap sekolah berbeda"], 9)),
      tambah("memahaminya.", ...kartu("df2", 14, 74, 272, 34, W.langit, ["hanya guru yang memahaminya"], 9)),
      tambah("Problem", ...kartu("df3", 14, 116, 272, 44, W.emas, ["model disarankan:", "Problem Based Learning"], 9.4)),
    ),
    k(
      SUARA_D2,
      bersih(0),
      tambah(0, judul("Kelompok")),
      tambah("Kelompok", ...kartu("dg1", 14, 34, 272, 34, W.hijauMuda, ["menurut karakteristik murid"], 9)),
      tambah("Ketua", ...kartu("dg2", 14, 76, 272, 34, W.langit, ["ketua: kemampuan tinggi"], 9)),
      tambah("anggota", ...kartu("dg3", 14, 118, 272, 34, W.krem, ["anggota: sedang atau kurang"], 9)),
    ),
    k(
      SUARA_D3,
      bersih(0),
      tambah(0, judul("Murid cepat dan murid kesulitan")),
      tambah("kecepatan", ...kartu("dh1", 14, 34, 272, 34, W.hijauMuda, ["cepat: latihan tanpa bantuan"], 9)),
      tambah("soal", ...kartu("dh2", 14, 76, 272, 34, W.langit, ["boleh diberi soal tambahan"], 9)),
      tambah("mendampingi", ...kartu("dh3", 14, 118, 272, 34, W.pink, ["guru mendampingi yang kesulitan"], 9)),
    ),
    k(
      SUARA_D4,
      bersih(0),
      tambah(0, judul("Bila kondisi kelas berbeda")),
      tambah("tinggi,", ...kartu("di1", 14, 34, 272, 40, W.hijauMuda, ["tanpa murid kemampuan tinggi:", "semua anggota bekerja sama"], 8.6)),
      tambah("memungkinkan,", ...kartu("di2", 14, 82, 272, 40, W.langit, ["model tidak memungkinkan:", "metode diskusi"], 8.6)),
      tambah("pecahan", ...kartu("di3", 14, 130, 272, 34, W.emas, ["tentang pecahan, penyebut sama"], 9)),
    ),
  ],
};

/* ------------------------------ 9. Rekap kunci, catatan temuan, dan ringkasan (Panduan Guru hlm. 98–99) ------------------------------ */
const SUARA_R1 = "Rekap kunci. Nomor satu lebih dari, nomor dua kurang dari, nomor tiga lima per enam, tiga per enam, satu per enam. Nomor empat: kurang, kurang, lebih, lebih, kurang. Nomor lima: tongkat Asep.";
const SUARA_R2 = "Catatan buku: kunci nomor satu menulis satu per tiga, seharusnya satu per empat. Subbab B juga tidak punya Ayo Beraktivitas atau Ayo Berpikir, dan pengurutan hanya muncul di nomor tiga.";
const SUARA_R3 = "Salah paham yang perlu dijaga, catatan kita bukan dari buku: murid melihat penyebut besar, seperti tiga belas, lalu mengira pecahannya besar. Padahal penyebut sama, jadi yang dibandingkan hanya pembilang.";
const SUARA_R4 = "Ringkasnya: penyebut sama berarti potongan sama besar. Pembilang yang lebih besar berarti pecahan yang lebih besar, dan pembilang yang lebih kecil berarti pecahan yang lebih kecil.";

export const ADEGAN_RINGKAS_B: AdeganStory = {
  id: "ringkas-b",
  judul: "Rekap kunci, catatan temuan, dan ringkasan",
  sumber: "Panduan Guru hlm. 98–99; catatan temuan",
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
      tambah(0, judul("Rekap kunci subbab B")),
      tambah(idx(SUARA_R1, "Nomor", 1), ...barisTabelKunci(0, ["1", "lebih dari: 2/4 > 1/4"])),
      tambah(idx(SUARA_R1, "nomor", 2), ...barisTabelKunci(1, ["2", "kurang dari: 2/6 < 4/6"])),
      tambah(idx(SUARA_R1, "nomor", 3), ...barisTabelKunci(2, ["3", "5/6 > 3/6 > 1/6"])),
      tambah(idx(SUARA_R1, "Nomor", 4), ...barisTabelKunci(3, ["4", "< < > > <"])),
      tambah(idx(SUARA_R1, "Nomor", 5), ...barisTabelKunci(4, ["5", "tongkat Asep (3/6 > 2/6)"])),
    ),
    k(
      SUARA_R2,
      bersih(0),
      tambah(0, judul("Catatan temuan buku")),
      tambah("kunci", ...kartu("rn1", 14, 32, 272, 44, W.merahMuda, ["kunci nomor 1: satu per tiga", "seharusnya satu per empat"], 8.8)),
      tambah("Subbab", ...kartu("rn2", 14, 84, 272, 44, W.langit, ["tanpa Ayo Beraktivitas dan", "tanpa Ayo Berpikir"], 8.8)),
      tambah("pengurutan", ...kartu("rn3", 14, 136, 272, 34, W.krem, ["mengurutkan hanya di nomor 3"], 9)),
    ),
    k(
      SUARA_R3,
      bersih(0),
      tambah(0, judul("Salah paham yang perlu dijaga")),
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
