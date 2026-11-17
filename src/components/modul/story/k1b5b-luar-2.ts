import type { AdeganStory, Obj } from "./logika-story";
import { E, TIGA, W, angkaKisi, emo, ikan, isiKotak, judul, judulKotak, kartu, kisi, kotak, orang, selKisi, teks, tigaKotak } from "./k1b5b-gambar";
import { bersih, hapus, idx, k, sorotkan, tambah, ubah, urutBilangan } from "./k1b5b-bantu";
import { NAMA_METODE, WARNA_METODE, kepala } from "./k1b5b-luar-1";

/* Video metode global Sub-Bab B: Number Grid (Kisi Bilangan), Before and After (Sebelum dan Sesudah), dan ringkasan. */

const GK = { x: 20, y: 60, s: 26 };
const kisiGlobal = (tanpa: number[] = []): Obj[] => kisi("gk", GK.x, GK.y, GK.s, W.krem, W.pink, tanpa);
/** Bingkai penanda merah `pn` di sel n. */
const penanda = (n: number): Obj => {
  const p = selKisi(GK.x, GK.y, n, GK.s);
  return kotak("pn", p.x, p.y, GK.s, GK.s, "none", W.merah, { rx: 2, tebal: 3, z: 2 });
};
const geserPenanda = (n: number) => {
  const p = selKisi(GK.x, GK.y, n, GK.s);
  return { id: "pn", x: p.x, y: p.y };
};
/** Tutup abu-abu `tp{n}` di sel n. */
const tutup = (n: number): Obj => {
  const p = selKisi(GK.x, GK.y, n, GK.s);
  return kotak(`tp${n}`, p.x + 2, p.y + 2, GK.s - 4, GK.s - 4, "#94A3B8", W.biru, { rx: 3, tebal: 1, z: 1 });
};

/* ------------------------------ 4. Number Grid: konsep ------------------------------ */
const SUARA_C1 = "Metode kedua, Number Grid, atau Kisi Bilangan. Bilangan satu sampai dua puluh ditulis dalam dua baris, tiap baris sepuluh kotak.";
const SUARA_C2 = "Geser satu kotak ke kanan, bilangannya bertambah satu. Geser satu kotak ke kiri, bilangannya berkurang satu.";
const SUARA_C3 = "Turun satu kotak ke bawah, kita dapat sepuluh dan bilangan di atasnya. Di bawah empat ada empat belas.";
const SUARA_C4 = "Naik satu kotak, kita kembali ke bilangan atas. Di atas sembilan belas ada sembilan.";

export const ADEGAN_LUAR_KISI: AdeganStory = {
  id: "luar-kisi",
  judul: "Number Grid: kisi bilangan",
  sumber: "Metode global: Number Grid",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_C1,
      tambah("kedua,", ...kepala(1)),
      tambah(idx(SUARA_C1, "Bilangan", 2), ...kisiGlobal()),
      tambah("baris,", teks("b2", 90, 136, "2 baris", 10, W.ungu)),
      tambah("kotak.", teks("k10", 210, 136, "10 kotak tiap baris", 9.4, W.ungu)),
    ),
    k(
      SUARA_C2,
      hapus(0, "b2", "k10"),
      tambah(0, penanda(5)),
      ubah("kanan,", geserPenanda(6)),
      tambah("bertambah", teks("kn", 150, 140, "ke kanan: 5, lalu 6, bertambah 1", 9.4, W.merah)),
      ubah("kiri,", geserPenanda(5)),
      tambah("berkurang", teks("kr", 150, 158, "ke kiri: 6, lalu 5, berkurang 1", 9.4, W.ungu)),
    ),
    k(
      SUARA_C3,
      hapus(0, "kn", "kr"),
      ubah(0, geserPenanda(4)),
      ubah("Turun", geserPenanda(14)),
      tambah("sepuluh", teks("tb", 150, 140, "bawah: 10 dan bilangan atasnya", 9.4, W.merah)),
      sorotkan(urutBilangan(SUARA_C3, [4])[0], "gkc4"),
      sorotkan(urutBilangan(SUARA_C3, [14])[0], "gkc14"),
      tambah(urutBilangan(SUARA_C3, [14])[0], teks("t14", 150, 158, "14: 10 dan 4", 10, W.biru)),
    ),
    k(
      SUARA_C4,
      hapus(0, "tb", "t14"),
      ubah(0, geserPenanda(19)),
      ubah("Naik", geserPenanda(9)),
      tambah("atas.", teks("na", 150, 140, "naik: kembali ke bilangan atas", 9.4, W.ungu)),
      sorotkan(urutBilangan(SUARA_C4, [19])[0], "gkc19"),
      sorotkan(idx(SUARA_C4, "sembilan.", 2), "gkc9"),
      tambah(idx(SUARA_C4, "sembilan.", 2), teks("t9", 150, 158, "di atas 19 ada 9", 10, W.biru)),
    ),
  ],
};

/* ------------------------------ 5. Number Grid: terapan pada label yang jatuh ------------------------------ */
const SUARA_D1 = "Abang menutup dua kotak pada kisi, seperti dua label yang pernah jatuh dari rak. Kotak mana saja yang tertutup?";
const SUARA_D2 = "Kotak pertama ada sesudah dua belas. Di atasnya ada tiga, jadi kotak itu tiga belas.";
const SUARA_D3 = "Kotak kedua ada sebelum delapan belas. Di atasnya ada tujuh, jadi kotak itu tujuh belas.";
const SUARA_D4 = "Dengan kisi, Abang cepat menemukan nomor akuarium dari kiri, kanan, atas, atau bawah.";

export const ADEGAN_LUAR_KISI_TERAPAN: AdeganStory = {
  id: "luar-kisi-terapan",
  judul: "Number Grid: label yang jatuh",
  sumber: "Metode global: Number Grid, terapan",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_D1,
      tambah(0, ...kepala(1), ...kisiGlobal([13, 17])),
      tambah("Abang", ...orang("ab", 30, 180, E.abang, "Abang")),
      tambah("menutup", tutup(13), tutup(17)),
      tambah(idx(SUARA_D1, "dua"), teks("d2", 150, 136, "2 kotak tertutup", 10, W.merah)),
      tambah("tertutup?", teks("tq", 150, 156, "nomor berapa?", 10, W.ungu)),
    ),
    k(
      SUARA_D2,
      hapus(0, "d2", "tq"),
      sorotkan(urutBilangan(SUARA_D2, [12])[0], "gkc12"),
      sorotkan(idx(SUARA_D2, "tiga,"), "gkc3"),
      hapus(urutBilangan(SUARA_D2, [13])[0], "tp13"),
      tambah(urutBilangan(SUARA_D2, [13])[0], angkaKisi("gk", GK.x, GK.y, GK.s, 13), teks("h13", 150, 140, "sesudah 12, di bawah 3: 13", 9.4, W.merah)),
    ),
    k(
      SUARA_D3,
      sorotkan(urutBilangan(SUARA_D3, [18])[0], "gkc18"),
      sorotkan(idx(SUARA_D3, "tujuh,"), "gkc7"),
      hapus(urutBilangan(SUARA_D3, [17])[0], "tp17"),
      tambah(urutBilangan(SUARA_D3, [17])[0], angkaKisi("gk", GK.x, GK.y, GK.s, 17), teks("h17", 150, 156, "sebelum 18, di bawah 7: 17", 9.4, W.merah)),
    ),
    k(
      SUARA_D4,
      hapus(0, "h13", "h17"),
      sorotkan("kiri,", "gkc12"),
      sorotkan("kanan,", "gkc14"),
      sorotkan("atas,", "gkc3"),
      sorotkan("bawah.", "gkc13"),
      tambah("akuarium", ...kartu("ok", 80, 136, 140, 24, W.emas, ["13 dan 17 ketemu"], 10)),
      tambah("bawah.", emo("jp", 270, 176, E.jempol, 18)),
    ),
  ],
};

/* ------------------------------ 6. Before and After: konsep ------------------------------ */
const SUARA_E1 = "Metode ketiga, Before and After, atau Sebelum dan Sesudah. Ada tiga kotak berjajar: kiri, tengah, dan kanan.";
const SUARA_E2 = "Kotak tengah berisi bilangan pilihan kita, misalnya tujuh. Kotak kanan berisi bilangan sesudahnya, satu lebih banyak, yaitu delapan.";
const SUARA_E3 = "Kotak kiri berisi bilangan sebelumnya, satu lebih sedikit, yaitu enam.";
const SUARA_E4 = "Bilangan tengah berada di antara keduanya. Tujuh ada di antara enam dan delapan.";
const panah = (id: string, x: number, x2: number, warna: string): Obj => ({ id, t: "panah", x, y: TIGA.y + TIGA.h + 14, x2, y2: 0, warna, tebal: 2.2 });

export const ADEGAN_LUAR_SEBELUM: AdeganStory = {
  id: "luar-sebelum",
  judul: "Before and After: sebelum dan sesudah",
  sumber: "Metode global: Before and After",
  latar: "#FDF2F8",
  ketukan: [
    k(
      SUARA_E1,
      tambah("ketiga,", ...kepala(2)),
      tambah(idx(SUARA_E1, "tiga"), ...tigaKotak("bk"), teks("t3", 150, 168, "3 kotak", 10, W.ungu)),
      tambah("kiri,", judulKotak("bk", 0, "kiri")),
      tambah("tengah,", judulKotak("bk", 1, "tengah")),
      tambah("kanan.", judulKotak("bk", 2, "kanan")),
    ),
    k(
      SUARA_E2,
      hapus(0, "t3"),
      ubah("pilihan", { id: "bk1j", isi: "pilihan" }),
      tambah("tujuh.", isiKotak("bk", 1, "7")),
      ubah("sesudahnya,", { id: "bk2j", isi: "sesudah" }),
      tambah("satu", panah("ps", 160, 76, W.hijau), teks("pl", 236, 168, "1 lebih banyak", 9, W.hijau)),
      tambah("delapan.", isiKotak("bk", 2, "8", W.hijau)),
    ),
    k(
      SUARA_E3,
      ubah("sebelumnya,", { id: "bk0j", isi: "sebelum" }),
      tambah("satu", panah("pb", 140, -76, W.ungu), teks("ps2", 64, 168, "1 lebih sedikit", 9, W.ungu)),
      tambah("enam.", isiKotak("bk", 0, "6", W.ungu)),
    ),
    k(
      SUARA_E4,
      hapus(0, "ps", "pb", "pl", "ps2"),
      sorotkan("tengah", "bk1"),
      tambah(idx(SUARA_E4, "antara", 2), ...kartu("da", 70, 150, 160, 24, W.krem, ["7 di antara 6 dan 8"], 10)),
    ),
  ],
};

/* ------------------------------ 7. Before and After: terapan pada nomor akuarium ------------------------------ */
const SUARA_F1 = "Kaka memakai tiga kotak untuk akuarium sepuluh. Sebelum sepuluh adalah sembilan, sesudah sepuluh adalah sebelas.";
const SUARA_F2 = "Untuk akuarium sembilan belas, sebelumnya delapan belas, dan sesudahnya dua puluh, akuarium terakhir di rak.";
const SUARA_F3 = "Igil bertanya, apa yang ada di antara empat belas dan enam belas? Kotak tengah diisi lima belas.";
const SUARA_F4 = "Dengan tiga kotak ini, Igil dan Kaka cepat menemukan tetangga tiap nomor akuarium.";
const judulTiga = (): Obj[] => [judulKotak("bk", 0, "sebelum"), judulKotak("bk", 1, "nomor"), judulKotak("bk", 2, "sesudah")];
const ikanKecil = (): Obj[] => [0, 1, 2].flatMap((i) => ikan(`if${i}`, TIGA.x[i] + 62, TIGA.y + 12, ["#22D3EE", "#F59E0B", "#FB923C"][i], 0.5));

export const ADEGAN_LUAR_SEBELUM_TERAPAN: AdeganStory = {
  id: "luar-sebelum-terapan",
  judul: "Before and After: nomor akuarium",
  sumber: "Metode global: Before and After, terapan",
  latar: "#FDF2F8",
  ketukan: [
    k(
      SUARA_F1,
      tambah(0, ...kepala(2)),
      tambah("Kaka", ...orang("kk", 270, 182, E.kaka, "Kaka")),
      tambah(idx(SUARA_F1, "tiga"), ...tigaKotak("bk"), ...judulTiga(), ...ikanKecil(), teks("t3", 150, 172, "3 kotak", 10, W.ungu)),
      tambah(idx(SUARA_F1, "sepuluh."), isiKotak("bk", 1, "10")),
      tambah("sembilan,", isiKotak("bk", 0, "9", W.ungu)),
      tambah("sebelas.", isiKotak("bk", 2, "11", W.hijau)),
    ),
    k(
      SUARA_F2,
      hapus(0, "t3"),
      ubah(urutBilangan(SUARA_F2, [19])[0], { id: "bk1n", isi: "19" }),
      ubah(urutBilangan(SUARA_F2, [18])[0], { id: "bk0n", isi: "18" }),
      ubah(urutBilangan(SUARA_F2, [20])[0], { id: "bk2n", isi: "20" }),
      tambah("terakhir", teks("ta", 150, 172, "20: terakhir di rak", 9, W.hijau)),
    ),
    k(
      SUARA_F3,
      hapus(0, "ta"),
      tambah("Igil", ...orang("ig", 30, 182, E.igil, "Igil")),
      ubah("empat", { id: "bk0n", isi: "14" }),
      ubah("enam", { id: "bk2n", isi: "16" }),
      ubah("antara", { id: "bk1n", isi: "?", warna: W.merah }),
      ubah(urutBilangan(SUARA_F3, [15])[0], { id: "bk1n", isi: "15" }),
      sorotkan(urutBilangan(SUARA_F3, [15])[0], "bk1"),
    ),
    k(
      SUARA_F4,
      tambah(idx(SUARA_F4, "tiga"), teks("t3", 150, 160, "3 kotak", 10, W.ungu)),
      sorotkan("tetangga", "bk0", "bk2"),
      tambah("akuarium.", ...kartu("tt", 90, 166, 120, 22, W.emas, ["14, 15, 16"], 10)),
    ),
  ],
};

/* ------------------------------ 8. Ringkasan ------------------------------ */
const SUARA_Z1 = "Kita sudah melihat tiga metode global. Mana yang paling cepat untuk rak Abang? Itu tergantung pertanyaannya.";
const SUARA_Z2 = "Number Line Hop cocok untuk maju dan mundur beberapa langkah, tetapi lambat bila harus melompat jauh.";
const SUARA_Z3 = "Number Grid cocok untuk pindah ke rak bawah: turun satu kotak, bilangannya bertambah sepuluh. Tetapi kurang cocok untuk melompat jauh.";
const SUARA_Z4 = "Before and After paling cepat untuk mencari tetangga satu nomor. Menurutmu, kalau nomor akuarium hilang, alat mana yang paling cepat?";

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan tiga metode global",
  sumber: "Ringkasan metode global",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_Z1,
      tambah(0, judul("Ringkasan")),
      tambah("tiga", emo("rk", 150, 76, E.bintang, 40), ...kartu("rt", 60, 98, 180, 26, W.emas, ["3 metode global"], 10)),
      tambah("pertanyaannya.", teks("mm", 150, 144, "maju dan mundur", 10, W.ungu)),
      tambah("Abang?", ...ikan("ik0", 110, 174, "#FB923C", 1.1), ...ikan("ik1", 150, 174, "#F59E0B", 1.1), ...ikan("ik2", 190, 174, "#22D3EE", 1.1)),
    ),
    k(SUARA_Z2, bersih(0), tambah(0, judul("Ringkasan")), tambah("Line", ...kartu("r0", 14, 34, 272, 44, WARNA_METODE[0], [NAMA_METODE[0], "kanan untuk maju, kiri untuk mundur"], 9.4))),
    k(SUARA_Z3, tambah("Grid:", ...kartu("r1", 14, 86, 272, 44, WARNA_METODE[1], [NAMA_METODE[1], "kanan, kiri beda 1; bawah: 10 dan atasnya"], 9))),
    k(SUARA_Z4, tambah("Before", ...kartu("r2", 14, 138, 272, 44, WARNA_METODE[2], [NAMA_METODE[2], "sebelum 1 lebih sedikit, sesudah 1 lebih banyak"], 8.6))),
  ],
};
