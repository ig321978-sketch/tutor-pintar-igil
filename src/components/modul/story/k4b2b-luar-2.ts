import type { AdeganStory, Obj } from "./logika-story";
import { W, barisTabel, batang, emo, garis, judul, kartu, kotak, pecahan, teks } from "./k4b2b-gambar";
import { bersih, idx, k, sorotkan, tambah, warnai } from "./k4b2b-bantu";
import { NAMA_METODE_ID, kepala } from "./k4b2b-luar-1";

/** Kartu bertuliskan satu pecahan: kotak 56 kali 48 dengan pecahan bertingkat di tengahnya. Id `${id}-k` dan `${id}-n`, `${id}-g`, `${id}-d`. */
const kartuPecahan = (id: string, x: number, y: number, n: number, d: number, warna: string = W.putih): Obj[] => [kotak(`${id}-k`, x, y, 56, 48, warna, W.biru, { rx: 6 }), ...pecahan(id, x + 28, y + 26, n, d, 14)];

/* ------------------------------ 1. Fraction Bars: konsep ------------------------------ */
const SUARA_B1 = "Metode ketiga, Fraction Bars, atau Batang Pecahan. Gambarlah tiap pecahan sebagai batang yang panjangnya sama, lalu bagi batang menjadi bagian sama besar sesuai penyebut.";
const SUARA_B2 = "Arsir bagian sebanyak pembilang. Karena batang sama panjang dan penyebut sama, daerah arsir yang lebih panjang menunjukkan pecahan yang lebih besar.";
const SUARA_B3 = "Letakkan batang bertumpuk dan sejajar di kiri. Ujung daerah arsir yang lebih jauh ke kanan adalah pecahan yang lebih besar.";
const SUARA_B4 = "Batang pecahan mengubah angka menjadi panjang yang bisa dilihat, jadi murid tidak sekadar menghafal aturan.";

export const ADEGAN_LUAR_BATANG: AdeganStory = {
  id: "luar-batang",
  judul: "Fraction Bars: batang sama panjang",
  sumber: "Metode luar: Fraction Bars",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, judul("Fraction Bars")),
      tambah("ketiga,", kepala(2)),
      tambah("Gambarlah", ...batang("fb", 40, 76, 220, 34, 5, 0)),
      tambah("panjangnya", teks("fb1", 150, 134, "batang sama panjang", 9.4, W.biru)),
      tambah("bagi", teks("fb2", 150, 160, "dibagi 5 bagian sama besar", 9.4, W.hijau)),
    ),
    k(
      SUARA_B2,
      bersih(0),
      tambah(0, judul("Arsir sebanyak pembilang")),
      tambah("Arsir", ...batang("fc1", 50, 52, 200, 26, 5, 0), ...batang("fc2", 50, 96, 200, 26, 5, 0)),
      warnai("sebanyak", W.emas, "fc1-b0", "fc1-b1"),
      warnai("pembilang.", W.emas, "fc2-b0", "fc2-b1", "fc2-b2", "fc2-b3"),
      tambah("Karena", teks("fc3", 28, 69, "2/5", 8.6, W.biru), teks("fc4", 28, 113, "4/5", 8.6, W.biru)),
      sorotkan("panjang@2", "fc2-b0", "fc2-b1", "fc2-b2", "fc2-b3"),
      tambah("menunjukkan", ...kartu("fc5", 40, 144, 220, 34, W.emas, ["arsir lebih panjang = lebih besar"], 9)),
    ),
    k(
      SUARA_B3,
      bersih(0),
      tambah(0, judul("Sejajar di kiri, lihat ujungnya")),
      tambah("batang", ...batang("fd1", 50, 50, 200, 26, 5, 2), ...batang("fd2", 50, 94, 200, 26, 5, 4)),
      tambah("Ujung", garis("fd3", 130, 40, 0, 120, W.merah, 1.6, { putus: true }), garis("fd4", 210, 40, 0, 120, W.merah, 1.6, { putus: true }), teks("fd5", 130, 172, "ujung kecil", 8.6, W.merah), teks("fd6", 210, 172, "ujung besar", 8.6, W.merah)),
      tambah("kanan", teks("fd7", 150, 190, "makin ke kanan, makin besar", 8.6, W.coklat)),
    ),
    k(
      SUARA_B4,
      bersih(0),
      tambah(0, judul("Angka menjadi panjang")),
      tambah("angka", ...kartu("fe1", 40, 34, 220, 34, W.langit, ["angka pecahan"], 9.6)),
      tambah("panjang", ...kartu("fe2", 40, 86, 220, 34, W.hijauMuda, ["panjang batang yang terlihat"], 9.6)),
      tambah("menghafal", ...kartu("fe3", 40, 138, 220, 34, W.emas, ["bukan sekadar menghafal aturan"], 9.6)),
    ),
  ],
};

/* ------------------------------ 2. Fraction Bars: penerapan pada nomor 2 dan tongkat (Buku Siswa hlm. 65) ------------------------------ */
const SUARA_BT1 = "Terapkan pada nomor dua di buku. Dua batang sama panjang, masing-masing dibagi enam. Batang atas diarsir dua bagian, batang bawah empat bagian.";
const SUARA_BT2 = "Daerah arsir batang bawah lebih panjang, jadi dua per enam kurang dari empat per enam, sesuai kunci.";
const SUARA_BT3 = "Sekarang tongkat Asep sepanjang tiga per enam meter dan tongkat Azizah dua per enam meter. Gambar keduanya sebagai batang yang dibagi enam.";
const SUARA_BT4 = "Batang Asep diarsir tiga bagian, batang Azizah dua bagian. Batang Asep lebih panjang, jadi tongkat Asep lebih panjang, selisihnya satu bagian.";

export const ADEGAN_LUAR_BATANG_TERAPAN: AdeganStory = {
  id: "luar-batang-terapan",
  judul: "Fraction Bars pada nomor dua dan tongkat Asep",
  sumber: "Metode luar: Fraction Bars; BS hlm. 65",
  latar: "#FEFCE8",
  ketukan: [
    k(
      SUARA_BT1,
      tambah(0, judul("Batang pecahan: nomor 2")),
      tambah("batang", ...batang("bu1", 40, 48, 210, 28, 6, 0), ...batang("bu2", 40, 100, 210, 28, 6, 0)),
      warnai("atas", W.emas, "bu1-b0", "bu1-b1"),
      tambah("atas", teks("bu3", 276, 66, "2/6", 9, W.biru)),
      warnai("bawah", W.emas, "bu2-b0", "bu2-b1", "bu2-b2", "bu2-b3"),
      tambah("bawah", teks("bu4", 276, 118, "4/6", 9, W.biru)),
    ),
    k(
      SUARA_BT2,
      bersih(0),
      tambah(0, judul("Batang bawah lebih panjang")),
      tambah(0, ...batang("bu1", 40, 40, 210, 26, 6, 2), ...batang("bu2", 40, 80, 210, 26, 6, 4)),
      tambah("Daerah", garis("bu5", 110, 34, 0, 80, W.merah, 1.6, { putus: true }), garis("bu6", 180, 34, 0, 80, W.merah, 1.6, { putus: true })),
      tambah("dua", ...pecahan("bv1", 90, 144, 2, 6, 18)),
      tambah("kurang", teks("bv2", 150, 152, "<", 24, W.merah)),
      tambah("empat", ...pecahan("bv3", 210, 144, 4, 6, 18)),
    ),
    k(
      SUARA_BT3,
      bersih(0),
      tambah(0, judul("Tongkat Asep dan Azizah")),
      tambah("Asep", teks("bw1", 34, 66, "Asep", 9, W.biru), teks("bw3", 150, 40, "3/6 meter", 9, W.coklat)),
      tambah("Azizah", teks("bw2", 34, 118, "Azizah", 9, W.biru), teks("bw4", 150, 92, "2/6 meter", 9, W.coklat)),
      tambah("batang", ...batang("bx1", 70, 50, 180, 26, 6, 0), ...batang("bx2", 70, 102, 180, 26, 6, 0)),
    ),
    k(
      SUARA_BT4,
      bersih(0),
      tambah(0, judul("Batang Asep lebih panjang")),
      tambah(0, teks("bw1", 34, 66, "Asep", 9, W.biru), ...batang("bx1", 70, 50, 180, 26, 6, 3)),
      tambah(0, teks("bw2", 34, 118, "Azizah", 9, W.biru), ...batang("bx2", 70, 102, 180, 26, 6, 2)),
      sorotkan("lebih", "bx1-b0", "bx1-b1", "bx1-b2"),
      tambah("selisihnya", teks("bx3", 150, 160, "selisih: 1 bagian = 1/6 meter", 9.4, W.coklat)),
      tambah(idx(SUARA_BT4, "bagian", 3), emo("bx4", 150, 188, "✅", 22)),
    ),
  ],
};

/* ------------------------------ 3. Fraction Card Sort: konsep ------------------------------ */
const SUARA_C1 = "Metode keempat, Fraction Card Sort, atau Susun Kartu Pecahan. Tulis tiap pecahan pada satu kartu, lalu acak kartunya.";
const SUARA_C2 = "Karena semua kartu berpenyebut sama, cukup lihat pembilangnya. Susun kartu dari pembilang terkecil ke terbesar.";
const SUARA_C3 = "Hasil susunan langsung memberi urutan. Kartu paling kiri adalah pecahan terkecil, kartu paling kanan pecahan terbesar, dan kartu dengan pembilang sama berdampingan sebagai pecahan sama besar.";
const SUARA_C4 = "Metode ini cocok untuk mengurutkan banyak pecahan sekaligus, dan bisa dimainkan berkelompok dengan kartu buatan sendiri.";

export const ADEGAN_LUAR_KARTU: AdeganStory = {
  id: "luar-kartu",
  judul: "Fraction Card Sort: menyusun kartu",
  sumber: "Metode luar: Fraction Card Sort",
  latar: "#FDF2F8",
  ketukan: [
    k(
      SUARA_C1,
      tambah(0, judul("Fraction Card Sort")),
      tambah("keempat,", kepala(3)),
      tambah("Tulis", ...kartuPecahan("cs1", 30, 80, 4, 7), ...kartuPecahan("cs2", 122, 80, 1, 7), ...kartuPecahan("cs3", 214, 80, 3, 7)),
      tambah("acak", emo("cs4", 150, 160, "🔀", 30)),
    ),
    k(
      SUARA_C2,
      bersih(0),
      tambah(0, judul("Lihat pembilangnya")),
      tambah(0, ...kartuPecahan("cs1", 30, 38, 4, 7), ...kartuPecahan("cs2", 122, 38, 1, 7), ...kartuPecahan("cs3", 214, 38, 3, 7)),
      tambah("Susun", teks("cs5", 150, 112, "disusun dari pembilang terkecil", 9, W.coklat)),
      tambah("terkecil", ...kartuPecahan("cu1", 30, 126, 1, 7, W.hijauMuda), ...kartuPecahan("cu2", 122, 126, 3, 7, W.hijauMuda)),
      tambah("terbesar.", ...kartuPecahan("cu3", 214, 126, 4, 7, W.hijauMuda)),
    ),
    k(
      SUARA_C3,
      bersih(0),
      tambah(0, judul("Hasil susunan memberi urutan")),
      tambah("urutan.", ...kartuPecahan("cv1", 30, 60, 1, 7, W.hijauMuda), ...kartuPecahan("cv2", 122, 60, 3, 7, W.hijauMuda), ...kartuPecahan("cv3", 214, 60, 4, 7, W.hijauMuda)),
      tambah("kiri", teks("cv4", 58, 130, "terkecil", 9, W.biru)),
      tambah("kanan", teks("cv5", 242, 130, "terbesar", 9, W.biru)),
      tambah("berdampingan", ...kartu("cv6", 30, 150, 240, 34, W.emas, ["pembilang sama: berdampingan"], 9.4)),
    ),
    k(
      SUARA_C4,
      bersih(0),
      tambah(0, judul("Cocok untuk banyak pecahan")),
      tambah("mengurutkan", ...kartu("cw1", 30, 36, 240, 34, W.langit, ["mengurutkan banyak pecahan"], 9.4)),
      tambah("berkelompok", emo("cw2", 150, 108, "👥", 34)),
      tambah("sendiri.", ...kartu("cw3", 30, 138, 240, 34, W.hijauMuda, ["kartu buatan sendiri"], 9.4)),
    ),
  ],
};

/* ------------------------------ 4. Fraction Card Sort: penerapan pada nomor 3 dan 4 (Buku Siswa hlm. 65) ------------------------------ */
const SUARA_CT1 = "Terapkan pada nomor tiga. Tiga kartu bertuliskan lima per enam, tiga per enam, dan satu per enam, tersusun acak.";
const SUARA_CT2 = "Lihat pembilangnya: tiga, lima, satu. Susun dari yang terkecil: satu, tiga, lima.";
const SUARA_CT3 = "Dari kiri ke kanan: satu per enam, tiga per enam, lima per enam. Dari besar ke kecil, urutannya lima per enam, tiga per enam, satu per enam, sama dengan kunci buku.";
const SUARA_CT4 = "Coba juga pasangan nomor empat: dua per delapan dan tiga per delapan, lalu sebelas per tiga belas dan dua belas per tiga belas. Tiap pasang cukup disusun dua kartu.";

export const ADEGAN_LUAR_KARTU_TERAPAN: AdeganStory = {
  id: "luar-kartu-terapan",
  judul: "Fraction Card Sort pada nomor tiga dan empat",
  sumber: "Metode luar: Fraction Card Sort; BS hlm. 65",
  latar: "#FAF5FF",
  ketukan: [
    k(
      SUARA_CT1,
      tambah(0, judul("Susun kartu: nomor 3")),
      tambah(idx(SUARA_CT1, "tiga", 3), ...kartuPecahan("ct1", 30, 66, 3, 6)),
      tambah(idx(SUARA_CT1, "lima"), ...kartuPecahan("ct2", 122, 66, 5, 6)),
      tambah("satu", ...kartuPecahan("ct3", 214, 66, 1, 6)),
      tambah("acak.", teks("ct4", 150, 140, "tersusun acak", 9.4, W.merah)),
    ),
    k(
      SUARA_CT2,
      bersih(0),
      tambah(0, judul("Lihat pembilangnya")),
      tambah(0, ...kartuPecahan("ct1", 30, 38, 3, 6), ...kartuPecahan("ct2", 122, 38, 5, 6), ...kartuPecahan("ct3", 214, 38, 1, 6)),
      tambah("tiga,", teks("ct5", 58, 104, "3", 10, W.biru)),
      tambah("lima,", teks("ct6", 150, 104, "5", 10, W.biru)),
      tambah("satu.", teks("ct7", 242, 104, "1", 10, W.biru)),
      tambah(idx(SUARA_CT2, "satu", 2), ...kartuPecahan("cu1", 30, 126, 1, 6, W.hijauMuda)),
      tambah(idx(SUARA_CT2, "tiga", 2), ...kartuPecahan("cu2", 122, 126, 3, 6, W.hijauMuda)),
      tambah(idx(SUARA_CT2, "lima", 2), ...kartuPecahan("cu3", 214, 126, 5, 6, W.hijauMuda)),
    ),
    k(
      SUARA_CT3,
      bersih(0),
      tambah(0, judul("Urutan kecil dan besar")),
      tambah("kiri", ...pecahan("cx1", 55, 56, 1, 6, 20), teks("cx2", 102, 66, "<", 22, W.merah), ...pecahan("cx3", 150, 56, 3, 6, 20), teks("cx4", 197, 66, "<", 22, W.merah), ...pecahan("cx5", 245, 56, 5, 6, 20)),
      tambah("besar", teks("cx6", 150, 112, "dari besar ke kecil", 9, W.coklat)),
      tambah("urutannya", ...pecahan("cy1", 55, 148, 5, 6, 20), teks("cy2", 102, 158, ">", 22, W.merah), ...pecahan("cy3", 150, 148, 3, 6, 20), teks("cy4", 197, 158, ">", 22, W.merah), ...pecahan("cy5", 245, 148, 1, 6, 20)),
      tambah("kunci", emo("cy6", 280, 128, "✅", 18)),
    ),
    k(
      SUARA_CT4,
      bersih(0),
      tambah(0, judul("Pasangan dari nomor 4")),
      tambah("dua", ...kartuPecahan("cz1", 70, 40, 2, 8, W.hijauMuda), teks("cz2", 150, 68, "<", 22, W.merah), ...kartuPecahan("cz3", 174, 40, 3, 8, W.hijauMuda)),
      tambah("sebelas", ...kartuPecahan("cz4", 70, 112, 11, 13, W.hijauMuda), teks("cz5", 150, 140, "<", 22, W.merah), ...kartuPecahan("cz6", 174, 112, 12, 13, W.hijauMuda)),
      tambah("Tiap", teks("cz7", 150, 190, "tiap pasang: dua kartu", 9, W.coklat)),
    ),
  ],
};

/* ------------------------------ 5. Ringkasan metode luar ------------------------------ */
const SUARA_R1 = "Ringkasan empat metode dari luar. Penyebut Sama: potongan sama besar. Banding Pembilang: pembilang yang menentukan. Batang Pecahan: lihat panjang arsir. Susun Kartu Pecahan: urutkan kartu.";
const SUARA_R2 = "Angka buku yang dipakai: satu per tiga dan dua per tiga, dua per sepuluh dan satu per sepuluh; nomor empat, lima pasang; nomor dua dan tongkat Asep; serta nomor tiga, lima per enam, tiga per enam, satu per enam.";
const SUARA_R3 = "Pesan akhirnya: apa pun metodenya, penyebut sama berarti potongan sama besar, dan pembilang yang lebih besar berarti pecahan yang lebih besar.";
const RINGKAS = ["potongan sama besar", "pembilang menentukan", "lihat panjang arsir", "urutkan kartu"] as const;
const WARNA = [W.hijauMuda, W.langit, W.krem, W.pink] as const;

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan empat metode dari luar",
  sumber: "Ringkasan metode luar",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_R1,
      tambah(0, judul("Ringkasan empat metode")),
      ...NAMA_METODE_ID.map((m, i) => tambah(["Penyebut", "Banding", "Batang", "Susun"][i], ...kartu(`rg${i}`, 12, 34 + i * 38, 276, 30, WARNA[i], [`${m}: ${RINGKAS[i]}`], 8.8))),
    ),
    k(
      SUARA_R2,
      bersih(0),
      tambah(0, judul("Angka dari buku")),
      tambah("satu", ...barisTabel("rt0", 14, 36, [100, 172], ["Penyebut Sama", "1/3 < 2/3 ; 2/10 > 1/10"], 26, 8.2)),
      tambah("empat,", ...barisTabel("rt1", 14, 66, [100, 172], ["Banding Pembilang", "nomor 4: < < > > <"], 26, 8.2)),
      tambah("tongkat", ...barisTabel("rt2", 14, 96, [100, 172], ["Batang Pecahan", "2/6 < 4/6 ; 3/6 > 2/6"], 26, 8.2)),
      tambah("serta", ...barisTabel("rt3", 14, 126, [100, 172], ["Susun Kartu", "5/6 > 3/6 > 1/6"], 26, 8.2)),
    ),
    k(
      SUARA_R3,
      bersih(0),
      tambah(0, judul("Pesan akhir")),
      tambah("penyebut", ...kartu("rp1", 20, 38, 260, 40, W.hijauMuda, ["penyebut sama", "= potongan sama besar"], 9.4)),
      tambah("pembilang", ...kartu("rp2", 20, 88, 260, 40, W.langit, ["pembilang lebih besar", "= pecahan lebih besar"], 9.4)),
      tambah(idx(SUARA_R3, "besar", 3), emo("rp3", 150, 168, "✅", 26)),
    ),
  ],
};
