import type { AdeganStory } from "./logika-story";
import {
  E,
  JUMLAH,
  KOSONG,
  KURSI,
  W,
  Y,
  angkaDi,
  bulat,
  digitBaris,
  emo,
  fmt,
  garis,
  garisHitung,
  judul,
  kartu,
  kotak,
  labelBaris,
  lajurKolom,
  lantai,
  panah,
  papanHitung,
  rumus,
  teks,
  tokoh,
} from "./k5b1d-gambar";
import { bersih, hapus, k, sorotkan, tambah, ubah } from "./k5b1d-bantu";

/*
 * Cerita orisinal IGIL "Hitungan Penonton Pak Darmo" (Kelas 5 Bab 1 Sub-Bab D), akhir cerita Hari Pertandingan di Stadion Kota.
 * Naskah suara dari naskah/story-naskah-k5b1d.md. Bagian ini: bagi per kolom (uang kas 64.000 : 4), cek dengan operasi kebalikan, dan perayaan penutup bab.
 */

/* ------------------------------ 7. Bagi per kolom ------------------------------ */
const SUARA_BAGI1 = "Pak Darmo punya uang kas enam puluh empat ribu rupiah untuk dibagi rata ke empat tribun.";
const SUARA_BAGI2 = "Citra membagi per kolom: enam puluh empat ribu dibagi empat sama dengan enam belas ribu.";
const SUARA_BAGI3 = "Jadi tiap tribun menerima enam belas ribu rupiah.";

const NAMA_TRIBUN = ["Utara", "Selatan", "Timur", "Barat"];
const Y_BAGI = 88;
const KARTU_TRIBUN = NAMA_TRIBUN.flatMap((n, i) => kartu(`tb${i}`, 12 + i * 58, 100, 52, 30, "#DCFCE7", [n, "?"], 8));

export const ADEGAN_BAGI: AdeganStory = {
  id: "bagi",
  judul: "Uang kas dibagi rata",
  sumber: "Materi: bagi per kolom dan hasilnya",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_BAGI1,
      tambah(0, judul("Uang Kas untuk Tribun"), ...lantai("lt", 150), papanHitung(), ...lajurKolom(), ...tokoh("pd", 266, 184, "Pak Darmo")),
      tambah("enam", emo("uk", 268, 76, "\u{1F4B0}", 22), labelBaris("kb-l", Y.r[0] + 3, "Kas 64.000"), ...digitBaris("kb", Y.r[0], 64000)),
      tambah("dibagi", labelBaris("bp-l", Y.r[1] + 3, ": 4 tribun"), ...digitBaris("bp", Y.r[1], 4), garisHitung("gh", 77)),
      tambah("tribun", ...KARTU_TRIBUN),
    ),
    k(
      SUARA_BAGI2,
      tambah("Citra", ...tokoh("ci", 222, 184, "Citra")),
      tambah("membagi", rumus("rm", "6 : 4 = 1 sisa 2", 139, 124, 8.5, W.krem)),
      ubah("dibagi", { id: "rm", isi: "6 : 4 = 1 sisa 2; 24 : 4 = 6" }),
      tambah("sama", ...[1, 6, 0, 0, 0].map((d, i) => angkaDi(`hb${4 - i}`, 4 - i, Y_BAGI, d, 11, W.emas))),
      tambah("belas", teks("hs", 268, Y_BAGI, "= 16.000", 11, W.merah)),
    ),
    k(
      SUARA_BAGI3,
      ubah("tiap", { id: "tb0-t1", isi: "16.000" }),
      ubah("tribun", { id: "tb1-t1", isi: "16.000" }),
      ubah("menerima", { id: "tb2-t1", isi: "16.000" }),
      ubah("enam", { id: "tb3-t1", isi: "16.000" }),
      tambah("rupiah", emo("ok", 268, 108, E.benar, 20)),
    ),
  ],
};

/* ------------------------------ 8. Cek dengan kebalikan ------------------------------ */
const SUARA_CEK1 = "Pak Darmo mengecek dengan kebalikannya: enam belas ribu dikali empat sama dengan enam puluh empat ribu.";
const SUARA_CEK2 = "Kursi kosong ditambah penonton juga tepat sembilan puluh ribu, jadi pengurangan tadi benar.";
const SUARA_CEK3 = "Mengecek dengan operasi kebalikan membuat kita yakin sebelum mengumumkan angka.";

const Y_HASIL_CEK = 91;
export const ADEGAN_CEK: AdeganStory = {
  id: "cek",
  judul: "Cek dengan kebalikannya",
  sumber: "Materi: cek dengan operasi kebalikan",
  latar: "#F5F3FF",
  ketukan: [
    k(
      SUARA_CEK1,
      tambah(0, judul("Pak Darmo Mengecek"), ...lantai("lt", 150), papanHitung(), ...lajurKolom(), ...tokoh("pd", 266, 184, "Pak Darmo")),
      tambah("enam", labelBaris("a0-l", Y.r[0] + 3, "Bagian 16.000"), ...digitBaris("a0", Y.r[0], 16000)),
      tambah("dikali", labelBaris("a1-l", Y.r[1] + 3, "× 4 tribun"), ...digitBaris("a1", Y.r[1], 4), garisHitung("gh", 77)),
      tambah("sama", angkaDi("cr4", 4, Y.atas, 2, 9, W.oranye), labelBaris("a2-l", Y_HASIL_CEK + 3, "Hasil 64.000"), ...digitBaris("a2", Y_HASIL_CEK, 64000, { warna: W.emas })),
      tambah("empat@2", emo("ok", 268, 94, E.benar, 18)),
    ),
    k(
      SUARA_CEK2,
      bersih(0),
      tambah(0, judul("Cek Kursi Kosong"), ...lantai("lt", 150), papanHitung(), ...lajurKolom(), ...tokoh("pd", 266, 184, "Pak Darmo")),
      tambah("Kursi", labelBaris("b0-l", Y.r[0] + 3, `Kosong ${fmt(KOSONG)}`), ...digitBaris("b0", Y.r[0], KOSONG)),
      tambah("ditambah", labelBaris("b1-l", Y.r[1] + 3, `+ Penonton ${fmt(JUMLAH)}`), ...digitBaris("b1", Y.r[1], JUMLAH), garisHitung("gh", 77)),
      tambah("tepat", ...[1, 2, 3, 4].map((c) => angkaDi(`cs${c}`, c, Y.atas, 1, 9, W.oranye))),
      tambah("sembilan", angkaDi("h4", 4, Y_HASIL_CEK, 9, 11, W.emas), ...[0, 1, 2, 3].map((c) => angkaDi(`h${c}`, c, Y_HASIL_CEK, 0, 11, W.emas))),
      tambah("puluh", teks("jm", 268, Y_HASIL_CEK, fmt(KURSI), 12, W.merah)),
      tambah("benar", emo("ok", 268, 116, E.benar, 20)),
    ),
    k(
      SUARA_CEK3,
      bersih(0),
      tambah(0, judul("Hitung, Cek, Umumkan"), ...lantai("lt", 150), ...kartu("t1", 8, 50, 86, 44, "#DBEAFE", ["1", "hitung"], 10), ...kartu("t2", 107, 50, 86, 44, "#FEF9C3", ["2", "cek balik"], 10), ...kartu("t3", 206, 50, 86, 44, "#DCFCE7", ["3", "umumkan"], 10), ...tokoh("pd", 150, 184, "Pak Darmo")),
      tambah("operasi", panah("ar1", 96, 72, 9, 0, W.biru, 1.8), panah("ar2", 195, 72, 9, 0, W.biru, 1.8)),
      sorotkan("kebalikan", "t2-k"),
      tambah("yakin", emo("jm", 196, 168, E.jempol, 20)),
      tambah("mengumumkan", emo("cr", 236, 168, E.corong, 20), teks("an", 236, 148, "angka!", 8, W.merah)),
    ),
  ],
};

/* ------------------------------ 9. Perayaan penutup bab ------------------------------ */
const SUARA_PENUTUP1 = "Peluit berbunyi, dan penonton di Stadion Kota bersorak menyambut pertandingan.";
const SUARA_PENUTUP2 = "Para tamu berdiri bersama Bima, Citra, Fajar, dan Pak Arif di tengah lapangan.";
const SUARA_PENUTUP3 = "Menurutmu, angka mana dari bab ini yang paling berkesan? Terima kasih, semuanya, selamat menonton!";

const BAND = [
  { id: "bu", nama: "Tribun Utara", warna: "#FCA5A5" },
  { id: "bs", nama: "Tribun Selatan", warna: "#93C5FD" },
  { id: "bt", nama: "Tribun Timur", warna: "#86EFAC" },
  { id: "bb", nama: "Tribun Barat", warna: "#FDE68A" },
];
const IDS_BAND = BAND.flatMap((b) => [b.id, `${b.id}-t`]);
const BENDERA = [0, 1, 2, 3, 4].map((i) => emo(`bd${i}`, 36 + i * 57, 40, E.bendera, 15));

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Hari Pertandingan Stadion Kota",
  sumber: "Materi: perayaan akhir bab bersama semua tokoh",
  latar: "#FEFCE8",
  ketukan: [
    k(
      SUARA_PENUTUP1,
      tambah(0, judul("Hari Pertandingan"), ...lantai("lt", 150)),
      tambah("Peluit", emo("pl", 24, 34, E.corong, 18)),
      tambah("penonton", ...BAND.flatMap((b, i) => [kotak(b.id, 10, 50 + i * 24, 280, 20, b.warna, W.coklat, { rx: 4, tebal: 1.4, z: 0 }), teks(`${b.id}-t`, 150, 63 + i * 24, b.nama, 8, W.biru, { z: 1 })])),
      tambah("bersorak", emo("t1", 40, 138, E.tangan, 16), emo("t2", 110, 138, E.tangan, 16), emo("t3", 190, 138, E.tangan, 16), emo("t4", 260, 138, E.tangan, 16)),
      tambah("menyambut", ...BENDERA, emo("ba", 150, 40, E.balon, 16)),
    ),
    k(
      SUARA_PENUTUP2,
      hapus("Para", ...IDS_BAND, "t1", "t2", "t3", "t4", "ba", "pl"),
      tambah("Para", kotak("pt", 6, 40, 288, 108, "#4ADE80", W.hijauTua, { rx: 6, tebal: 2, z: -2 }), garis("tg", 150, 42, 0, 104, W.putih, 1.6, { z: -1 }), bulat("tb", 150, 94, 16, undefined, W.putih, { tebal: 1.6, z: -1 })),
      tambah("tamu", ...tokoh("bn", 45, 82, "Bu Ningsih"), ...tokoh("ph", 110, 82, "Pak Hasto"), ...tokoh("bl", 190, 82, "Bu Lestari"), ...tokoh("pd", 255, 82, "Pak Darmo")),
      tambah("Bima", ...tokoh("bi", 110, 138, "Bima")),
      tambah("Citra", ...tokoh("ci", 190, 138, "Citra")),
      tambah("Fajar", ...tokoh("fa", 255, 138, "Fajar")),
      tambah("Arif", ...tokoh("pa", 45, 138, "Pak Arif")),
    ),
    k(
      SUARA_PENUTUP3,
      tambah("angka", teks("g1", 52, 52, fmt(JUMLAH), 11, W.merah), teks("g2", 150, 52, fmt(KOSONG), 11, W.biru), teks("g3", 248, 52, fmt(KURSI), 11, W.hijauTua), teks("tn", 150, 112, "?", 18, W.ungu)),
      tambah("Terima", emo("kf1", 24, 62, E.konfeti, 18), emo("kf2", 276, 62, E.konfeti, 18)),
      tambah("selamat", emo("bl", 150, 150, E.bola, 16), emo("pi", 150, 66, E.piala, 16)),
    ),
  ],
};
