import type { AdeganStory } from "./logika-story";
import { PETA, SEGITIGA_N3, SEGITIGA_PENUH, SEGITIGA_SETENGAH, W, emo, judul, kartu, kisiLatar, kotak, nomori, panah, penuh, sel, segitigaKisi, tabel, teks } from "./k4b4a-gambar";
import { bersih, idx, k, tambah, ubah } from "./k4b4a-bantu";
import { NAMA_METODE, NAMA_METODE_ID } from "./k4b4a-luar-1";

const WARNA_METODE = [W.hijauMuda, W.langit, W.krem, W.pink];
const kepala = (i: number) => kartu("hd", 6, 26, 288, 24, WARNA_METODE[i], [`${NAMA_METODE[i]} · ${NAMA_METODE_ID[i]}`], 8.8);

/* ------------------------------ 6. Nonstandard then Standard: konsep ------------------------------ */
const SUARA_G1 = "Metode ketiga, Nonstandard then Standard, atau Tak Baku ke Baku. Murid mulai dengan satuan buatan sendiri, seperti kertas atau uang kertas, lalu beralih ke satuan baku.";
const SUARA_G2 = "Tahap satu, satuan tidak baku. Hasilnya bergantung pada benda yang dipakai: meja yang sama, delapan uang kertas atau empat kertas origami.";
const SUARA_G3 = "Tahap dua, kita sadar hasil itu sulit dibandingkan, jadi dibuat satu satuan yang disepakati: persegi bersisi satu sentimeter, luasnya satu sentimeter persegi.";
const SUARA_G4 = "Untuk tempat yang besar dipakai meter persegi. Satu meter persegi sama dengan sepuluh ribu sentimeter persegi.";

export const ADEGAN_LUAR_TAK_BAKU: AdeganStory = {
  id: "luar-tak-baku",
  judul: "Nonstandard then Standard: dari satuan bebas ke satuan baku",
  sumber: "Metode luar: Nonstandard then Standard",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_G1,
      tambah(0, judul("Nonstandard then Standard")),
      tambah("ketiga,", kepala(2)),
      tambah("buatan", ...kartu("t1", 14, 70, 112, 50, W.pink, ["tahap 1", "satuan tak baku"], 9)),
      tambah("beralih", panah("ta", 130, 95, 40, 0, W.biru, 2.4), ...kartu("t2", 176, 70, 112, 50, W.hijauMuda, ["tahap 2", "satuan baku"], 9)),
    ),
    k(
      SUARA_G2,
      bersih(0),
      tambah(0, judul("Tahap 1: satuan tidak baku")),
      tambah("meja", teks("tm", 150, 44, "meja yang sama", 9.4, W.coklat)),
      tambah("delapan", emo("u1", 80, 92, "💵", 34), teks("u1t", 80, 112, "8 uang kertas", 9, W.hijau)),
      tambah("empat", emo("u2", 220, 92, "📄", 34), teks("u2t", 220, 112, "4 kertas origami", 9, W.hijau)),
      tambah("bergantung", teks("u3", 150, 156, "hasil bergantung pada bendanya", 9.4, W.merah)),
    ),
    k(
      SUARA_G3,
      bersih(0),
      tambah(0, judul("Tahap 2: satuan baku")),
      tambah("disepakati:", teks("v0", 150, 44, "satuan yang disepakati", 9.4, W.coklat)),
      tambah("persegi", ...sel("v1", 60, 58, penuh(1, 1), 50, W.kuning, W.coklat), teks("v2", 85, 52, "1 cm", 9, W.biru), teks("v3", 118, 86, "1 cm", 9, W.biru, { anchor: "start" })),
      tambah("luasnya", ...kartu("v4", 170, 66, 120, 38, W.krem, ["luasnya:", "1 cm²"], 9.6)),
    ),
    k(
      SUARA_G4,
      bersih(0),
      tambah(0, judul("Satuan untuk tempat besar")),
      tambah("tempat", emo("w1", 60, 84, "⚽", 40), teks("w1t", 60, 108, "lapangan", 8.6, W.biru)),
      tambah("Satu", ...kartu("w2", 120, 60, 170, 34, W.hijauMuda, ["1 m² = 10.000 cm²"], 10.4)),
      tambah("sepuluh", teks("w3", 205, 126, "100 × 100", 10, W.hijau)),
    ),
  ],
};

/* ------------------------------ 7. Nonstandard then Standard: penerapan (Buku Siswa hlm. 115, 118, 120) ------------------------------ */
const SUARA_H1 = "Di buku, gambar a memakai petak kecil dan luasnya tiga belas satuan. Gambar b memakai petak besar dan luasnya empat satuan. Karena satuannya berbeda, kita tidak bisa menyebut mana yang lebih luas.";
const SUARA_H2 = "Ganti dengan satuan baku: tiap petak satu sentimeter persegi. Dua bangun pada soal di buku sama-sama tiga belas sentimeter persegi, jadi bisa dibandingkan.";
const SUARA_H3 = "Pilih satuan baku yang cocok. Lapangan bola dan kolam renang memakai meter persegi, sedangkan bingkai dan buku tulis memakai sentimeter persegi.";
const SUARA_H4 = "Pindah satuan: dua meter persegi sama dengan dua puluh ribu sentimeter persegi. Dikali seratus saja belum benar, harus dikali seratus sebanyak dua kali.";

export const ADEGAN_LUAR_TAK_BAKU_TERAPAN: AdeganStory = {
  id: "luar-tak-baku-terapan",
  judul: "Tak Baku ke Baku pada bangun di buku",
  sumber: "Metode luar: Nonstandard then Standard; Buku Siswa hlm. 115, 117–118, 120",
  latar: "#FEF3C7",
  ketukan: [
    k(
      SUARA_H1,
      tambah(0, judul("Dua satuan berbeda")),
      tambah("gambar", ...sel("ha", 24, 44, PETA.A, 8, W.oranye), teks("hat", 36, 106, "a: 13 satuan", 8.6, W.hijau)),
      tambah("besar", ...sel("hb", 130, 44, penuh(2, 2), 26, W.pink), teks("hbt", 156, 106, "b: 4 satuan", 8.6, W.hijau)),
      tambah("berbeda,", teks("hq", 150, 150, "petak a lebih kecil dari petak b", 9, W.merah), teks("hq2", 150, 168, "tidak bisa dibandingkan", 9.4, W.coklat)),
    ),
    k(
      SUARA_H2,
      bersih(0),
      tambah(0, judul("Satu satuan baku")),
      tambah("satuan", ...sel("ia", 20, 46, PETA.A, 10, W.oranye), teks("iat", 35, 120, "(i) 13 cm²", 9.4, W.hijau)),
      tambah("bangun", ...sel("ib", 110, 46, PETA.B, 10, W.kuning), teks("ibt", 135, 120, "(ii) 13 cm²", 9.4, W.hijau)),
      tambah("bandingkan.", ...kartu("ik", 210, 60, 84, 40, W.emas, ["sama:", "13 cm²"], 9.4)),
    ),
    k(
      SUARA_H3,
      bersih(0),
      tambah(0, judul("Pilih satuan yang cocok")),
      tambah("Lapangan", emo("j1", 40, 70, "⚽", 30), emo("j2", 100, 70, "🏊", 30)),
      tambah("meter", ...kartu("jm", 20, 90, 110, 30, W.hijauMuda, ["meter persegi"], 8.8)),
      tambah("bingkai", emo("j3", 190, 70, "🖼", 30), emo("j4", 250, 70, "📓", 30)),
      tambah("sentimeter", ...kartu("jc", 170, 90, 110, 30, W.krem, ["sentimeter persegi"], 8.8)),
    ),
    k(
      SUARA_H4,
      bersih(0),
      tambah(0, judul("Pindah satuan")),
      tambah("dua", ...kartu("kp", 30, 36, 240, 36, W.langit, ["2 m² = ... cm²"], 10.4)),
      tambah("puluh", teks("kp2", 150, 98, "2 × 10.000 = 20.000 cm²", 11, W.hijau)),
      tambah("Dikali", teks("kp3", 150, 130, "× 100 saja: salah", 9.6, W.merah)),
      tambah(idx(SUARA_H4, "kali"), teks("kp4", 150, 148, "× 100 × 100: benar", 9.6, W.hijau)),
    ),
  ],
};

/* ------------------------------ 8. Grid Count: konsep ------------------------------ */
const SUARA_I1 = "Metode keempat, Grid Count, atau Hitung Petak. Letakkan bangun di atas kertas berpetak, lalu hitung petak yang tertutup.";
const SUARA_I2 = "Supaya tidak ada petak terlewat atau terhitung dua kali, beri nomor tiap petak dari kiri ke kanan, dari atas ke bawah. Nomor terakhir adalah luasnya.";
const SUARA_I3 = "Bangun yang miring tidak pas dengan petak. Hitung dulu petak yang penuh, lalu tandai potongan yang hanya setengah petak.";
const SUARA_I4 = "Dua setengah petak digabung menjadi satu petak penuh. Luas sama dengan petak penuh ditambah gabungan setengah petak itu.";

export const ADEGAN_LUAR_PETAK: AdeganStory = {
  id: "luar-petak",
  judul: "Grid Count: menghitung petak pada kisi",
  sumber: "Metode luar: Grid Count",
  latar: "#FDF2F8",
  ketukan: [
    k(
      SUARA_I1,
      tambah(0, judul("Grid Count")),
      tambah("keempat,", kepala(3)),
      tambah("petak,", ...kisiLatar("gk", 84, 60, 8, 6, 16, W.putih, W.abu)),
      tambah("tertutup.", ...sel("gb", 84, 60, PETA.L2.slice(2, 6), 16, "#F9A8D4", W.biru)),
    ),
    k(
      SUARA_I2,
      bersih(0),
      tambah(0, judul("Beri nomor tiap petak")),
      tambah("Supaya", ...sel("nm", 90, 44, PETA.L2.slice(2, 6), 28, "#F9A8D4", W.biru)),
      tambah("nomor", ...nomori("nm", 90, 44, PETA.L2.slice(2, 6), 28, 10)),
      tambah("terakhir", ...kartu("nl", 70, 168, 160, 26, W.emas, ["nomor terakhir: 9"], 9.6)),
    ),
    k(
      SUARA_I3,
      bersih(0),
      tambah(0, judul("Petak penuh dan setengah petak")),
      tambah("miring", ...kisiLatar("sg", 78, 34, 8, 5, 18, W.putih, W.abu), segitigaKisi("sg", 78, 34, SEGITIGA_N3, 18, "#A3D154")),
      tambah("penuh,", ...SEGITIGA_PENUH.map(([r, c]) => kotak(`sf-c${r}-${c}`, 78 + c * 18, 34 + r * 18, 18, 18, "#16A34A", W.hijau, { rx: 0, op: 0.45 }))),
      tambah("setengah", ...SEGITIGA_SETENGAH.map(([r, c]) => kotak(`sh-c${r}-${c}`, 78 + c * 18, 34 + r * 18, 18, 18, W.emas, W.coklat, { rx: 0, op: 0.4 }))),
    ),
    k(
      SUARA_I4,
      ubah(0, { id: "sg@segitiga", op: 0.4 }),
      tambah("digabung", teks("sa", 150, 140, "6 petak penuh (hijau)", 9, W.hijau), teks("sb", 150, 156, "6 setengah petak (kuning)", 9, W.coklat)),
      tambah("Luas", teks("sc", 150, 176, "luas = penuh + gabungan setengah", 9.4, W.biru)),
    ),
  ],
};

/* ------------------------------ 9. Grid Count: penerapan (Buku Siswa hlm. 118 dan 121) ------------------------------ */
const SUARA_J1 = "Bangun kedua pada soal di buku. Beri nomor satu sampai tiga belas. Nomor terakhir, tiga belas, adalah luasnya dalam sentimeter persegi.";
const SUARA_J2 = "Soal nomor dua di buku, bangun yang diarsir. Nomor dari kiri ke kanan berakhir di dua belas, jadi luasnya dua belas sentimeter persegi.";
const SUARA_J3 = "Soal nomor tiga di buku, segitiga pada kisi. Petak penuh ada enam, dan setengah petak ada enam.";
const SUARA_J4 = "Enam setengah petak digabung menjadi tiga petak penuh. Enam ditambah tiga sama dengan sembilan sentimeter persegi, sama dengan kunci buku.";

export const ADEGAN_LUAR_PETAK_TERAPAN: AdeganStory = {
  id: "luar-petak-terapan",
  judul: "Grid Count pada bangun hlm. 118 dan 121",
  sumber: "Metode luar: Grid Count; Buku Siswa hlm. 118, 121",
  latar: "#FFF1F2",
  ketukan: [
    k(
      SUARA_J1,
      tambah(0, judul("Hitung petak bangun (ii)")),
      tambah("kedua", ...sel("pa", 104, 40, PETA.II, 18, W.kuning, W.coklat)),
      tambah("nomor", ...nomori("pa", 104, 40, PETA.II, 18, 8)),
      tambah("luasnya", ...kartu("pl", 90, 140, 120, 30, W.emas, ["luas = 13 cm²"], 10)),
    ),
    k(
      SUARA_J2,
      bersih(0),
      tambah(0, judul("Hitung petak yang diarsir")),
      tambah("diarsir.", ...kisiLatar("pn", 78, 40, 8, 5, 18, W.putih, W.abu), ...sel("pm", 78, 40, PETA.N2, 18, W.emas, W.coklat)),
      tambah("Nomor", ...nomori("pm", 78, 40, PETA.N2, 18, 8)),
      tambah("luasnya", ...kartu("pj", 70, 150, 160, 30, W.hijauMuda, ["luas = 12 cm²"], 10)),
    ),
    k(
      SUARA_J3,
      bersih(0),
      tambah(0, judul("Segitiga pada kisi")),
      tambah("segitiga", ...kisiLatar("tg", 78, 40, 8, 5, 18, W.putih, W.abu), segitigaKisi("tg", 78, 40, SEGITIGA_N3, 18, "#A3D154")),
      tambah("penuh", ...SEGITIGA_PENUH.map(([r, c]) => kotak(`tf-c${r}-${c}`, 78 + c * 18, 40 + r * 18, 18, 18, "#16A34A", W.hijau, { rx: 0, op: 0.45 }))),
      tambah("setengah", ...SEGITIGA_SETENGAH.map(([r, c]) => kotak(`th-c${r}-${c}`, 78 + c * 18, 40 + r * 18, 18, 18, W.emas, W.coklat, { rx: 0, op: 0.4 }))),
    ),
    k(
      SUARA_J4,
      bersih(0),
      tambah(0, judul("Gabungkan setengah petak")),
      tambah("Enam", ...kartu("ug1", 20, 40, 260, 34, W.krem, ["6 setengah petak = 3 petak penuh"], 9)),
      tambah("ditambah", teks("ug2", 150, 108, "6 + 3 = 9 cm²", 14, W.hijau)),
      tambah("kunci", ...kartu("ug3", 50, 134, 200, 32, W.hijauMuda, ["sama dengan kunci buku: 9 cm²"], 9)),
    ),
  ],
};

/* ------------------------------ 10. Ringkasan metode luar ------------------------------ */
const SUARA_R1 = "Ringkasnya, empat metode dari luar: menutupi daerah, menyusun baris dan kolom, berpindah dari satuan tak baku ke baku, dan menghitung petak.";
const SUARA_R2 = "Angka buku yang dipakai tadi: bangun A sampai D tiga belas, tiga belas, sebelas, dan lima belas; kunci dua belas dan sembilan sentimeter persegi; serta satu meter persegi sama dengan sepuluh ribu sentimeter persegi.";
const SUARA_R3 = "Pilih metode menurut bentuknya: susunan penuh pakai baris dikali kolom, bentuk bebas pakai hitung petak, dan selalu sebutkan satuannya.";

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan empat metode luar",
  sumber: "Ringkasan metode luar",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_R1,
      tambah(0, judul("Ringkasan empat metode")),
      ...NAMA_METODE.map((m, i) => tambah(["menutupi", "menyusun", "berpindah", "menghitung"][i], ...kartu(`r${i}`, 12, 32 + i * 38, 276, 30, WARNA_METODE[i], [`${m} · ${NAMA_METODE_ID[i]}`], 8.8))),
    ),
    k(
      SUARA_R2,
      bersih(0),
      tambah(0, judul("Angka buku yang dipakai")),
      tambah("bangun", ...tabel("rt", 20, 34, [140, 120], [["bangun", "luas"], ["A, B, C, D", "13, 13, 11, 15"], ["diarsir (nomor 2)", "12 cm²"], ["segitiga (nomor 3)", "9 cm²"], ["1 m²", "10.000 cm²"]], 22, 8.6)),
    ),
    k(
      SUARA_R3,
      bersih(0),
      tambah(0, judul("Memilih metode")),
      tambah("susunan", ...kartu("p1", 14, 36, 272, 34, W.langit, ["susunan penuh: baris dikali kolom"], 9)),
      tambah("bebas", ...kartu("p2", 14, 82, 272, 34, W.pink, ["bentuk bebas: hitung petak"], 9)),
      tambah("satuannya.", ...kartu("p3", 14, 128, 272, 34, W.emas, ["selalu sebut satuannya: cm² atau m²"], 9)),
      tambah("Pilih", emo("p4", 150, 184, "✅", 22)),
    ),
  ],
};

