import type { AdeganStory } from "./logika-story";
import {
  E,
  JUMLAH,
  KOSONG,
  KURSI,
  W,
  Y,
  angkaDi,
  barisKurang,
  barisTribun,
  emo,
  fmt,
  garisHitung,
  judul,
  lajurKolom,
  lantai,
  panah,
  papanHitung,
  rumus,
  sorotKolom,
  teks,
  tokoh,
} from "./k5b1d-gambar";
import { hapus, k, tambah, ubah } from "./k5b1d-bantu";

/*
 * Cerita orisinal IGIL "Hitungan Penonton Pak Darmo" (Kelas 5 Bab 1 Sub-Bab D), akhir cerita Hari Pertandingan di Stadion Kota.
 * Naskah suara dari naskah/story-naskah-k5b1d.md (revisi: jumlah, kurang, kali, bagi, cek). Bagian ini: Pak Darmo mengumpulkan panitia, Bima menjumlah bersusun, dan Bima mengurang dengan pinjaman bergulir.
 */

/* ------------------------------ 1. Ketua panitia ------------------------------ */
const SUARA_KETUA1 = "Pak Darmo, ketua panitia, mengumpulkan Bima, Citra, Fajar, dan Pak Arif.";
const SUARA_KETUA2 = "Ia ingin tahu jumlah semua penonton keempat tribun, dan berapa kursi yang masih kosong.";
const SUARA_KETUA3 = "Stadion Kota punya sembilan puluh ribu kursi, dan peluit pertandingan hampir berbunyi.";

export const ADEGAN_KETUA: AdeganStory = {
  id: "ketua",
  judul: "Pak Darmo mengumpulkan panitia",
  sumber: "Materi: ketua panitia dan keempat tribun",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_KETUA1,
      tambah(0, judul("Pak Darmo dan Panitia"), ...lantai("lt", 150)),
      tambah("Darmo", ...tokoh("pd", 40, 184, "Pak Darmo")),
      tambah("Bima", ...tokoh("bi", 100, 184, "Bima")),
      tambah("Citra", ...tokoh("ci", 160, 184, "Citra")),
      tambah("Fajar", ...tokoh("fa", 220, 184, "Fajar")),
      tambah("Arif", ...tokoh("pa", 272, 184, "Pak Arif")),
    ),
    k(
      SUARA_KETUA2,
      tambah("penonton", papanHitung(), ...lajurKolom()),
      tambah("keempat", ...barisTribun()),
      tambah("kosong", rumus("kq", "kursi kosong = ?", Y.hasil, 124, 10, W.emas)),
    ),
    k(
      SUARA_KETUA3,
      tambah("sembilan", teks("kb", 268, 70, fmt(KURSI), 12, W.merah)),
      tambah("kursi", emo("ks", 268, 96, E.kursi, 18)),
      tambah("peluit", emo("pl", 268, 124, E.corong, 20)),
      tambah("berbunyi", teks("bb", 268, 134, "priiit!", 8, W.merah)),
    ),
  ],
};

/* ------------------------------ 2. Jumlah bersusun ------------------------------ */
const SUARA_JUMLAH1 = "Bima menyusun keempat bilangan penonton, satuan di bawah satuan, lalu menjumlahkan dari kanan.";
const SUARA_JUMLAH2 = "Satuan berjumlah tujuh; puluhan sebelas, jadi ditulis satu dan satu disimpan ke ratusan.";
const SUARA_JUMLAH3 = "Dengan simpanan itu, jumlahnya delapan puluh dua ribu lima ratus tujuh belas penonton.";

export const ADEGAN_JUMLAH: AdeganStory = {
  id: "jumlah",
  judul: "Bima menjumlah bersusun",
  sumber: "Materi: jumlah bersusun dengan simpanan",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_JUMLAH1,
      tambah(0, judul("Bima Menjumlah Penonton"), ...lantai("lt", 150), papanHitung()),
      tambah("Bima", ...tokoh("bi", 266, 184, "Bima")),
      tambah("menyusun", ...lajurKolom(), ...barisTribun(), garisHitung("gh")),
      tambah("satuan", sorotKolom("sk", 0), teks("sl", 214, 141, "satuan", 8, W.emas, { z: 3 })),
      tambah("kanan", panah("pk", 232, 128, -70, 0, W.emas, 1.8, { z: 3 })),
    ),
    k(
      SUARA_JUMLAH2,
      tambah("berjumlah", rumus("rm", "0 + 5 + 0 + 2", Y.rumus, 100)),
      ubah("tujuh", { id: "rm", isi: "0 + 5 + 0 + 2 = 7" }),
      tambah("tujuh", angkaDi("h0", 0, Y.hasil, 7, 11, W.emas)),
      hapus("puluhan", "sk", "sl", "pk"),
      tambah("puluhan", sorotKolom("sk2", 1), teks("sl2", 186, 141, "puluhan", 8, W.emas, { z: 3 })),
      ubah("puluhan", { id: "rm", isi: "5 + 0 + 6 + 0" }),
      ubah("sebelas", { id: "rm", isi: "5 + 0 + 6 + 0 = 11" }),
      tambah("ditulis", angkaDi("h1", 1, Y.hasil, 1, 11, W.emas)),
      tambah("disimpan", angkaDi("cr2", 2, Y.atas, 1, 9, W.oranye)),
    ),
    k(
      SUARA_JUMLAH3,
      tambah("simpanan", angkaDi("cr3", 3, Y.atas, 1, 9, W.oranye), angkaDi("cr4", 4, Y.atas, 2, 9, W.oranye)),
      tambah("jumlahnya", angkaDi("h2", 2, Y.hasil, 5, 11, W.emas), angkaDi("h3", 3, Y.hasil, 2, 11, W.emas), angkaDi("h4", 4, Y.hasil, 8, 11, W.emas)),
      tambah("delapan", teks("jm", 268, 112, fmt(JUMLAH), 12, W.merah), teks("jo", 268, 125, "orang", 8, W.merah)),
      tambah("penonton", emo("kl", 268, 94, E.kilau, 20)),
    ),
  ],
};

/* ------------------------------ 3. Kurang bersusun ------------------------------ */
const SUARA_KURANG1 = "Kursi kosong sama dengan sembilan puluh ribu dikurangi delapan puluh dua ribu lima ratus tujuh belas.";
const SUARA_KURANG2 = "Nol tidak bisa dikurangi tujuh, jadi Bima meminjam, dan pinjaman bergulir dari puluh ribuan.";
const SUARA_KURANG3 = "Hasilnya tujuh ribu empat ratus delapan puluh tiga kursi kosong.";

const KURANG = barisKurang();
export const ADEGAN_KURANG: AdeganStory = {
  id: "kurang",
  judul: "Pinjaman bergulir melewati nol",
  sumber: "Materi: kurang bersusun dan meminjam",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_KURANG1,
      tambah(0, judul("Kursi Kosong Bima"), ...lantai("lt", 150), papanHitung(), ...lajurKolom(), garisHitung("gh"), ...tokoh("bi", 266, 184, "Bima")),
      tambah("Kursi", rumus("kq", "kursi kosong = ?", Y.hasil, 124, 10, W.emas)),
      tambah("sembilan", ...KURANG.slice(0, 6)),
      tambah("dikurangi", ...KURANG.slice(6)),
    ),
    k(
      SUARA_KURANG2,
      tambah("Nol", sorotKolom("sk", 0), rumus("rm", "0 < 7", Y.rumus, 124, 10, W.krem)),
      tambah("meminjam", panah("pj", 206, 39, -50, 0, W.oranye, 1.8, { z: 3 })),
      tambah("pinjaman", sorotKolom("s1", 1), sorotKolom("s2", 2), sorotKolom("s3", 3)),
      tambah("bergulir", angkaDi("p0", 0, Y.atas, 10, 9, W.oranye)),
      tambah("puluh", angkaDi("p4", 4, Y.atas, 8, 9, W.oranye), angkaDi("p3", 3, Y.atas, 9, 9, W.oranye), angkaDi("p2", 2, Y.atas, 9, 9, W.oranye), angkaDi("p1", 1, Y.atas, 9, 9, W.oranye)),
    ),
    k(
      SUARA_KURANG3,
      hapus("Hasilnya", "kq", "sk", "s1", "s2", "s3", "pj", "rm"),
      tambah("tujuh", angkaDi("h3", 3, Y.hasil, 7, 11, W.emas)),
      tambah("empat", angkaDi("h2", 2, Y.hasil, 4, 11, W.emas)),
      tambah("delapan", angkaDi("h1", 1, Y.hasil, 8, 11, W.emas)),
      tambah("tiga", angkaDi("h0", 0, Y.hasil, 3, 11, W.emas)),
      tambah("kosong", teks("ks", 268, 112, fmt(KOSONG), 12, W.merah), emo("ok", 268, 94, E.benar, 18)),
    ),
  ],
};
