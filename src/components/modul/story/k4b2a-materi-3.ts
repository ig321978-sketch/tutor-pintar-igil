import type { AdeganStory } from "./logika-story";
import { BANDING_KUNCI, BANDING_SOAL, TIARA, W, barisTabel, emo, garis, judul, kartu, kisi, pecahan, segitigaBagi, teks } from "./k4b2a-gambar";
import { bersih, idx, k, sorotkan, tambah, hapus, ubah } from "./k4b2a-bantu";

/** Dua pecahan pembilang satu (penyebut a dan b) dengan tanda di antaranya; (cx, y) pusat garis pecahan. Id `${id}a`, `${id}b`, `${id}s`. */
const pasang = (id: string, a: number, b: number, tanda: string, y: number, u = 24) => [...pecahan(`${id}a`, 70, y, "1", a, u), teks(`${id}s`, 150, y + 9, tanda, u + 4, W.merah), ...pecahan(`${id}b`, 230, y, "1", b, u)];

/* ------------------------------ 9. Membandingkan: 1/10 dan 1/5 (Buku Siswa hlm. 61; Panduan Guru hlm. 95) ------------------------------ */
const SUARA_E1 = "Contoh kedua: satu batang dibagi sepuluh bagian sama dengan satu bagian diarsir. Batang lain dibagi lima bagian sama dengan satu bagian diarsir. Keduanya sama panjang.";
const SUARA_E2 = "Pertanyaan buku kali ini: daerah arsir mana yang lebih kecil? Arsiran satu per sepuluh lebih pendek daripada arsiran satu per lima, jadi lebih kecil.";
const SUARA_E3 = "Maka satu per sepuluh kurang dari satu per lima, ditulis dengan tanda kurang dari. Ujung runcing tanda itu menghadap ke pecahan yang lebih kecil.";
const SUARA_E4 = "Ringkasnya, dua pecahan dengan pembilang satu dibandingkan lewat penyebutnya. Penyebut dua melawan empat, dan penyebut lima melawan sepuluh. Penyebut yang lebih kecil memberi pecahan yang lebih besar.";

export const ADEGAN_BANDING_KECIL: AdeganStory = {
  id: "banding-kecil",
  judul: "Membandingkan: sepersepuluh dan seperlima",
  sumber: "Buku Siswa hlm. 61; Panduan Guru hlm. 95",
  latar: "#FFFBEB",
  kutipan: [
    "Amati gambar di atas. Bandingkan daerah arsir antara kedua pecahan tersebut.",
    "Daerah arsir mana yang lebih kecil?",
    "lebih kecil dari daerah arsir",
    "Atau dapat ditulis sebagai berikut:",
    "Peserta didik dapat menentukan mana pecahan yang lebih besar atau lebih kecil.",
  ],
  ketukan: [
    k(
      SUARA_E1,
      tambah(0, judul("Contoh kedua di buku")),
      tambah("sepuluh", ...kisi("e1", 30, 42, 10, 1, 18, 30, 1), ...pecahan("e1r", 245, 57, "1", "10", 24)),
      tambah("lima", ...kisi("e2", 30, 112, 5, 1, 36, 30, 1), ...pecahan("e2r", 245, 127, "1", "5", 24)),
      tambah("Keduanya", teks("esm", 105, 98, "dua batang sama panjang", 8, W.coklat)),
    ),
    k(
      SUARA_E2,
      hapus(0, "esm"),
      tambah("daerah", garis("ek1", 30, 80, 18, 0, W.merah, 2.6), teks("et1", 39, 92, "lebih pendek", 8.2, W.merah)),
      tambah("daripada", garis("ek2", 30, 150, 36, 0, W.merah, 2.6), teks("et2", 48, 162, "lebih panjang", 8.2, W.merah)),
      sorotkan("kecil?", "e1-c0"),
    ),
    k(
      SUARA_E3,
      bersih(0),
      tambah(0, judul("Kurang dari")),
      tambah("Maka", ...pecahan("e3a", 80, 90, "1", "10", 34), ...pecahan("e3b", 220, 90, "1", "5", 34), ...kisi("e3p", 20, 152, 10, 1, 6, 18, 1), ...kisi("e3q", 190, 152, 5, 1, 12, 18, 1)),
      tambah("tanda", teks("e3c", 150, 102, "<", 34, W.merah)),
      tambah("Ujung", teks("e3d", 150, 142, "ujung runcing menunjuk yang kecil", 8, W.coklat)),
    ),
    k(
      SUARA_E4,
      bersih(0),
      tambah(0, judul("Ringkas: lihat penyebutnya")),
      tambah("Ringkasnya,", ...barisTabel("er0", 20, 32, [100, 80, 80], ["pasangan", "penyebut", "lebih besar"], 24, 8.4, true)),
      tambah("empat,", ...barisTabel("er1", 20, 56, [100, 80, 80], ["1/2 dan 1/4", "2 dan 4", "1/2"], 24, 8.8)),
      tambah("sepuluh.", ...barisTabel("er2", 20, 80, [100, 80, 80], ["1/5 dan 1/10", "5 dan 10", "1/5"], 24, 8.8)),
      tambah("Penyebut@4", ...kartu("er3", 20, 124, 260, 40, W.emas, ["penyebut lebih kecil:", "pecahan lebih besar"], 9.2)),
    ),
  ],
};

/* ------------------------------ 10. Ayo Berlatih nomor 1 sampai 3 (Buku Siswa hlm. 62; Panduan Guru hlm. 95–96) ------------------------------ */
const SUARA_L1 = "Ayo berlatih: isi titik-titik dengan pecahan yang sesuai gambar, dan tanda lebih dari atau kurang dari. Nomor satu: dua segitiga sama besar, kiri dibagi dua, kanan dibagi tiga, masing-masing satu bagian diarsir.";
const SUARA_L2 = "Kunci panduan guru: satu per dua lebih dari satu per tiga. Penyebut dua lebih kecil daripada penyebut tiga, jadi bagian yang diarsir lebih besar.";
const SUARA_L3 = "Nomor dua: kiri kisi dengan dua baris dan tiga kolom, enam bagian sama, satu diarsir, jadi satu per enam. Kanan dibagi tiga, satu diarsir, jadi satu per tiga. Maka satu per enam kurang dari satu per tiga.";
const SUARA_L4 = "Nomor tiga memuat tiga batang, di video ini kita samakan panjangnya. Batang pertama dibagi dua, kedua dibagi tiga, ketiga dibagi empat, masing-masing satu bagian diarsir. Urutan dari besar ke kecil: satu per dua, satu per tiga, satu per empat.";

export const ADEGAN_BERLATIH_BANDING_SATU: AdeganStory = {
  id: "berlatih-banding-satu",
  judul: "Ayo Berlatih 1 sampai 3: bandingkan gambar",
  sumber: "Buku Siswa hlm. 62; Panduan Guru hlm. 95–96",
  latar: "#F5F3FF",
  kutipan: [
    "Ayo Berlatih",
    "Isilah titik-titik di bawah ini dengan bilangan pecahan yang sesuai dengan gambar serta notasi lebih dari ( > ) atau kurang dari ( < ).",
    "Lengkapi titik-titik di bawah ini!",
  ],
  ketukan: [
    k(
      SUARA_L1,
      tambah(0, judul("Nomor 1: dua segitiga")),
      tambah("titik-titik", ...pecahan("n1x", 75, 160, "…", "…", 16), ...pecahan("n1y", 225, 160, "…", "…", 16), teks("n1s", 150, 166, "…", 16, W.merah)),
      tambah("kiri", ...segitigaBagi("n1a", 25, 40, 100, 90, 2, 1)),
      tambah("kanan", ...segitigaBagi("n1b", 175, 40, 100, 90, 3, 1)),
    ),
    k(
      SUARA_L2,
      ubah("dua", { id: "n1x-a", isi: "1" }, { id: "n1x-b", isi: "2" }),
      ubah("tiga.", { id: "n1y-a", isi: "1" }, { id: "n1y-b", isi: "3" }),
      ubah("lebih", { id: "n1s", isi: ">", u: 22 }),
      tambah("Penyebut", teks("n1t", 150, 140, "penyebut kecil: arsir besar", 8, W.coklat)),
    ),
    k(
      SUARA_L3,
      bersih(0),
      tambah(0, judul("Nomor 2: kisi dan batang")),
      tambah(idx(SUARA_L3, "kisi"), ...kisi("n2a", 20, 44, 3, 2, 28, 26, 1)),
      tambah(idx(SUARA_L3, "jadi", 1), ...pecahan("n2ar", 62, 128, "1", "6", 22)),
      tambah("Kanan", ...kisi("n2b", 190, 44, 3, 1, 28, 52, 1)),
      tambah(idx(SUARA_L3, "jadi", 2), ...pecahan("n2br", 232, 128, "1", "3", 22)),
      tambah("Maka", teks("n2s", 150, 138, "<", 26, W.merah)),
    ),
    k(
      SUARA_L4,
      bersih(0),
      tambah(0, judul("Nomor 3: tiga batang")),
      tambah("pertama", ...kisi("n3a", 20, 34, 2, 1, 48, 24, 1)),
      tambah("kedua", ...kisi("n3b", 20, 76, 3, 1, 32, 24, 1)),
      tambah("ketiga", ...kisi("n3c", 20, 118, 4, 1, 24, 24, 1)),
      tambah("diarsir.", teks("n3x", 150, 51, "1/2", 12, W.biru), teks("n3y", 150, 93, "1/3", 12, W.biru), teks("n3z", 150, 135, "1/4", 12, W.biru)),
      tambah("Urutan", ...kartu("n3o", 20, 158, 260, 30, W.emas, ["1/2 > 1/3 > 1/4"], 12)),
    ),
  ],
};

/* ------------------------------ 11. Ayo Berlatih nomor 4 dan 5 (Buku Siswa hlm. 62–63; Panduan Guru hlm. 96) ------------------------------ */
const SUARA_N1 = "Nomor empat: isi dengan tanda lebih dari atau kurang dari. Bagian a: satu per lima dan satu per tiga. Penyebut lima lebih besar, jadi satu per lima kurang dari satu per tiga.";
const SUARA_N2 = "Bagian b: satu per empat dan satu per lima. Penyebut empat lebih kecil, jadi satu per empat lebih dari satu per lima. Bagian c: satu per delapan dan satu per dua, jadi satu per delapan kurang dari satu per dua.";
const SUARA_N3 = "Bagian d: satu per sepuluh dan satu per lima, jadi satu per sepuluh kurang dari satu per lima. Bagian e: satu per sebelas dan satu per tiga belas, jadi satu per sebelas lebih dari satu per tiga belas.";
const SUARA_N4 = "Kunci panduan guru untuk lima bagian itu cocok dengan hitungan mandiri: kurang dari, lebih dari, kurang dari, kurang dari, dan lebih dari.";
const SUARA_N5 = "Nomor lima: Tiara mempunyai bawang putih satu per dua kilogram dan gula satu per empat kilogram. Manakah yang lebih berat? Penyebut dua lebih kecil daripada empat, jadi satu per dua lebih besar. Jawabannya bawang putih.";

const HURUF = ["a", "b", "c", "d", "e"] as const;
const labelBagian = (i: number, y: number) => teks(`n4l${i}`, 16, y + 4, `${HURUF[i]}.`, 10, W.coklat);

export const ADEGAN_BERLATIH_BANDING_DUA: AdeganStory = {
  id: "berlatih-banding-dua",
  judul: "Ayo Berlatih 4 dan 5: tanda dan cerita Tiara",
  sumber: "Buku Siswa hlm. 62–63; Panduan Guru hlm. 96",
  latar: "#F0F9FF",
  kutipan: [
    "Isilah titik-titik berikut dengan notasi \">\" atau \"<\"!",
    "Tiara mempunyai bawang putih",
    "Manakah yang lebih berat, bawang putih atau gula?",
    "Jawab: jadi yang lebih berat adalah bawang putih",
  ],
  ketukan: [
    k(
      SUARA_N1,
      tambah(0, judul("Nomor 4 bagian a")),
      tambah("Bagian", labelBagian(0, 100)),
      tambah("lima", ...pasang("n4a", BANDING_SOAL[0][0], BANDING_SOAL[0][1], "…", 100)),
      tambah(idx(SUARA_N1, "lebih", 2), teks("n4t", 150, 160, "penyebut besar: pecahan kecil", 8.6, W.coklat)),
      ubah(idx(SUARA_N1, "kurang", 2), { id: "n4as", isi: BANDING_KUNCI[0] }),
    ),
    k(
      SUARA_N2,
      bersih(0),
      tambah(0, judul("Nomor 4 bagian b dan c")),
      tambah("Bagian", labelBagian(1, 68), ...pasang("n4b", BANDING_SOAL[1][0], BANDING_SOAL[1][1], "…", 68)),
      ubah("lebih@2", { id: "n4bs", isi: BANDING_KUNCI[1] }),
      tambah(idx(SUARA_N2, "Bagian", 2), labelBagian(2, 144), ...pasang("n4c", BANDING_SOAL[2][0], BANDING_SOAL[2][1], "…", 144)),
      ubah("kurang", { id: "n4cs", isi: BANDING_KUNCI[2] }),
    ),
    k(
      SUARA_N3,
      bersih(0),
      tambah(0, judul("Nomor 4 bagian d dan e")),
      tambah("Bagian", labelBagian(3, 68), ...pasang("n4d", BANDING_SOAL[3][0], BANDING_SOAL[3][1], "…", 68)),
      ubah("kurang", { id: "n4ds", isi: BANDING_KUNCI[3] }),
      tambah(idx(SUARA_N3, "Bagian", 2), labelBagian(4, 144), ...pasang("n4e", BANDING_SOAL[4][0], BANDING_SOAL[4][1], "…", 144)),
      ubah("lebih", { id: "n4es", isi: BANDING_KUNCI[4] }),
    ),
    k(
      SUARA_N4,
      bersih(0),
      tambah(0, judul("Kunci nomor 4")),
      tambah("Kunci", ...barisTabel("nk0", 25, 30, [40, 150, 60], ["bagian", "pasangan", "tanda"], 22, 8.4, true)),
      ...BANDING_SOAL.map(([a, b], i) => tambah(["kurang", "lebih", "kurang@2", "kurang@3", "lebih@2"][i], ...barisTabel(`nk${i + 1}`, 25, 30 + (i + 1) * 22, [40, 150, 60], [HURUF[i], `1/${a} dan 1/${b}`, BANDING_KUNCI[i]], 22, 9))),
      tambah("cocok", emo("nkz", 150, 184, "✅", 20)),
    ),
    k(
      SUARA_N5,
      bersih(0),
      tambah(0, judul("Nomor 5: bawang putih dan gula")),
      tambah("bawang", ...kartu("tb", 14, 30, 130, 44, W.hijauMuda, ["bawang putih", `1/${TIARA.bawang} kg`], 9.4)),
      tambah("gula", ...kartu("tg", 156, 30, 130, 44, W.krem, ["gula", `1/${TIARA.gula} kg`], 9.4)),
      tambah("Penyebut", ...kisi("tbk", 14, 94, 2, 1, 65, 22, 1), ...kisi("tgk", 156, 94, 4, 1, 32.5, 22, 1)),
      tambah("Jawabannya", ...kartu("tj", 40, 140, 220, 34, W.emas, ["bawang putih lebih berat"], 10)),
      sorotkan("Jawabannya", "tb-k"),
    ),
  ],
};

/* ------------------------------ 12. Diferensiasi dan catatan temuan buku (Panduan Guru hlm. 96) ------------------------------ */
const SUARA_F1 = "Diferensiasi di panduan guru: karakteristik murid tiap sekolah berbeda-beda, dan hanya guru yang memahaminya. Model yang disarankan untuk bab ini adalah Problem Based Learning.";
const SUARA_F2 = "Kelompok dibentuk dari murid yang beragam, ketua dari murid berkemampuan tinggi. Murid cepat mengerjakan latihan tanpa bantuan dan boleh mendapat soal tambahan, sementara guru mendampingi murid yang kesulitan.";
const SUARA_F3 = "Bila sekolah tidak punya murid berkemampuan tinggi, semua anggota kelompok bekerja sama menyelesaikan soal. Bila model itu tidak memungkinkan, guru memakai metode diskusi tentang pecahan dengan pembilang satu.";
const SUARA_F4 = "Catatan temuan buku. Semua kunci Ayo Berlatih cocok dengan hitungan mandiri, dari nomor satu sampai nomor lima, termasuk nomor empat bagian a sampai e dan soal Tiara.";
const SUARA_F5 = "Namun tabel Hasil Aktivitas pada Aktivitas satu tidak punya kunci, karena bergantung pada lingkaran tiap murid. Tujuan juga menyebut mengurutkan, padahal hanya nomor tiga yang memuat urutan, dan tidak ada soal yang menyuruh mengurutkan.";
const SUARA_F6 = "Dua temuan lain. Gambar nomor tiga di Buku Siswa memakai petak sama lebar, sehingga arsiran satu per tiga dan satu per empat sama luas, padahal batangnya tidak sama panjang. Buku Siswa juga menulis sepuluh tujuan bab, Panduan Guru tujuh.";

export const ADEGAN_DIFERENSIASI: AdeganStory = {
  id: "diferensiasi",
  judul: "Diferensiasi dan catatan temuan buku",
  sumber: "Panduan Guru hlm. 96; catatan temuan",
  latar: "#F5F3FF",
  kutipan: [
    "Diferensiasi",
    "Karakteristik peserta didik di masing-masing sekolah akan berbeda-beda,",
    "kondisi seperti ini hanya guru yang memahami.",
    "Model pembelajaran yang disarankan untuk bab ini adalah Problem Based Learning.",
    "ditentukan ketua kelompok adalah peserta didik dengan tingkat kemampuan tinggi",
    "Bagi peserta didik yang kecepatan belajarnya tinggi (advanced), minta mereka mengerjakan latihan tanpa bantuan.",
    "Guru juga dapat memberikan soal-soal tambahan.",
    "guru dapat mendampingi peserta didik yang mengalami kesulitan.",
    "tidak terdapat peserta didik dengan kemampuan tinggi",
    "semua anggota kelompok dapat bekerja sama untuk menyelesaikan masalah/soal yang diberikan oleh guru.",
    "guru dapat menerapkan metode diskusi dengan melibatkan peserta didik dalam pecahan dengan pembilang satu.",
    "mengurutkan beberapa pecahan dengan pembilang satu",
    "Hasil Aktivitas",
    "1.1 membandingkan dua pecahan dengan pembilang satu",
  ],
  ketukan: [
    k(
      SUARA_F1,
      tambah(0, judul("Diferensiasi")),
      tambah("karakteristik", emo("df1", 150, 62, "🧑", 28)),
      tambah("berbeda-beda,", ...kartu("df2", 14, 74, 272, 34, W.hijauMuda, ["karakteristik murid tiap sekolah berbeda"], 9)),
      tambah("Model", ...kartu("df3", 14, 118, 272, 44, W.langit, ["model yang disarankan:", "Problem Based Learning"], 9.4)),
    ),
    k(
      SUARA_F2,
      bersih(0),
      tambah(0, judul("Kelompok dan murid cepat")),
      tambah("beragam,", ...kartu("dg1", 14, 32, 272, 30, W.hijauMuda, ["kelompok beragam, ketua kemampuan tinggi"], 8.6)),
      tambah("cepat", ...kartu("dg2", 14, 70, 272, 40, W.langit, ["murid cepat: latihan tanpa bantuan,", "boleh soal tambahan"], 8.8)),
      tambah("mendampingi", ...kartu("dg3", 14, 118, 272, 30, W.pink, ["guru mendampingi yang kesulitan"], 9)),
    ),
    k(
      SUARA_F3,
      bersih(0),
      tambah(0, judul("Bila tidak ada murid cepat")),
      tambah("Bila", ...kartu("dh1", 14, 32, 272, 44, W.krem, ["tanpa murid berkemampuan tinggi:", "semua anggota bekerja sama"], 8.8)),
      tambah(idx(SUARA_F3, "Bila", 2), ...kartu("dh2", 14, 86, 272, 44, W.langit, ["bila model tidak memungkinkan:", "metode diskusi pembilang satu"], 8.8)),
    ),
    k(
      SUARA_F4,
      bersih(0),
      tambah(0, judul("Catatan: kunci cocok")),
      tambah("satu", ...kartu("dk1", 14, 34, 272, 30, W.hijauMuda, ["nomor 1 sampai 3: cocok"], 9.2)),
      tambah("empat", ...kartu("dk2", 14, 74, 272, 30, W.hijauMuda, ["nomor 4 bagian a sampai e: cocok"], 9.2)),
      tambah("Tiara.", ...kartu("dk3", 14, 114, 272, 30, W.hijauMuda, ["nomor 5, soal Tiara: cocok"], 9.2)),
      tambah("Tiara.", emo("dk4", 150, 178, "✅", 22)),
    ),
    k(
      SUARA_F5,
      bersih(0),
      tambah(0, judul("Catatan: tanpa kunci, tanpa soal")),
      tambah("tabel", ...kartu("dn1", 14, 32, 272, 44, W.merahMuda, ["tabel Hasil Aktivitas 1:", "tanpa kunci"], 9)),
      tambah("Tujuan", ...kartu("dn2", 14, 86, 272, 44, W.krem, ["tujuan menyebut mengurutkan,", "hanya nomor 3 yang memuat urutan"], 8.8)),
      tambah("menyuruh", ...kartu("dn3", 14, 140, 272, 38, W.merahMuda, ["tak ada soal yang meminta", "mengurutkan"], 8.8)),
    ),
    k(
      SUARA_F6,
      bersih(0),
      tambah(0, judul("Dua temuan lain")),
      tambah("Gambar", ...kartu("dm1", 14, 32, 272, 56, W.merahMuda, ["gambar nomor 3: petak sama lebar,", "arsiran 1/3 dan 1/4 sama luas,", "batang tidak sama panjang"], 8.6)),
      tambah("sepuluh", ...kartu("dm2", 14, 100, 272, 44, W.krem, ["tujuan bab: 10 di Buku Siswa,", "7 di Panduan Guru"], 8.8)),
      tambah("tujuh.", emo("dm3", 150, 180, "✅", 22)),
    ),
  ],
};
