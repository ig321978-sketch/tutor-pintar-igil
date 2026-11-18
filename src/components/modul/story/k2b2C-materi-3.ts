import type { AdeganStory } from "./logika-story";
import { E, W, baris, deret, emo, idTokoh, judul, kalimat, kartu, kertasPesanan, lantai, pintu, pitaPintu, rak, spanduk, gs, teks, tokoh } from "./k2b2C-gambar";
import { hapus, idx, k, sorotkan, tambah } from "./k2b2C-bantu";

/*
 * Cerita orisinal IGIL "Pesanan Besar Pak Budi" (Kelas 2 Bab 2 Sub-Bab C), akhir cerita Toko Seragam dan Alat Tulis Sekolah.
 * Naskah suara dari naskah/story-naskah-k2b2c.md. Bagian ini: cerita hitungan buatan Nia, pembukaan koperasi, dan penutup.
 */

/* ------------------------------ 7. Cerita buatan Nia ------------------------------ */
const SUARA_N1 = "Nia menggambar sebuah rak, lalu membuat cerita hitungan sendiri.";
const SUARA_N2 = "Rautan ada delapan, penghapus tiga lebihnya dari rautan. Berapa penghapus?";
const SUARA_N3 = "Chacha menjawab, delapan ditambah tiga sama dengan sebelas. Kali ini ia membaca kata petunjuknya dulu!";

const KN = kalimat("kn", 150, 164, ["8", "+", "3", "=", "11"], 16, 28);

export const ADEGAN_CERITA_NIA: AdeganStory = {
  id: "cerita-nia",
  judul: "Cerita hitungan buatan Nia",
  sumber: "Materi: membuat cerita hitungan sendiri",
  latar: "#FDF4FF",
  ketukan: [
    k(
      SUARA_N1,
      tambah(0, judul("Cerita buatan Nia"), lantai("lt", 156)),
      tambah(idx(SUARA_N1, "Nia"), ...tokoh("ni", 36, 176, "nia")),
      tambah(idx(SUARA_N1, "menggambar"), ...kertasPesanan("kt", 90, 34, 120, 104)),
      tambah(idx(SUARA_N1, "rak"), ...rak("rk", 104, 62, 92, 60)),
      tambah(idx(SUARA_N1, "cerita"), teks("jc", 150, 52, "cerita hitungan Nia", 8.4, W.ungu, { z: 3 })),
    ),
    k(
      SUARA_N2,
      tambah(idx(SUARA_N2, "Rautan"), ...deret("rautan", "rt", baris(8, 112, 71, 11), 14), teks("rt-n", 252, 70, "rautan 8", 9)),
      tambah(idx(SUARA_N2, "penghapus"), ...deret("hapus", "hp", baris(3, 116, 108, 13), 14), teks("hp-n", 252, 100, "penghapus 3", 9)),
      tambah(idx(SUARA_N2, "lebihnya"), teks("lb", 252, 118, "lebihnya", 11, W.hijau)),
      sorotkan(idx(SUARA_N2, "lebihnya"), "lb"),
      tambah(idx(SUARA_N2, "Berapa"), emo("tn", 160, 118, E.tanya, 18)),
    ),
    k(
      SUARA_N3,
      tambah(idx(SUARA_N3, "Chacha"), ...tokoh("ch", 270, 176, "chacha")),
      hapus(idx(SUARA_N3, "menjawab"), "tn"),
      tambah(idx(SUARA_N3, "delapan"), KN[0]),
      tambah(idx(SUARA_N3, "ditambah"), KN[1]),
      tambah(idx(SUARA_N3, "tiga"), KN[2]),
      tambah(idx(SUARA_N3, "sama"), KN[3]),
      tambah(idx(SUARA_N3, "sebelas"), KN[4]),
      tambah(idx(SUARA_N3, "petunjuknya"), emo("jm", 236, 150, E.jempol, 22)),
    ),
  ],
};

/* ------------------------------ 8. Pembukaan koperasi ------------------------------ */
const SUARA_M1 = "Hari pembukaan tiba. Pak Budi menggunting pita, dan koperasi sekolah resmi dibuka!";
const SUARA_M2 = "Semua pesanan lengkap dan pas, sampai anak terakhir mendapat topi dan pensil.";
const SUARA_M3 = "Chacha, Dika, dan Nia mendapat lencana penolong koperasi, dan Chacha memakainya terbalik karena terlalu senang!";

export const ADEGAN_PEMBUKAAN: AdeganStory = {
  id: "pembukaan",
  judul: "Koperasi sekolah dibuka",
  sumber: "Materi: perayaan pembukaan koperasi",
  latar: "#FFF1F2",
  ketukan: [
    k(
      SUARA_M1,
      tambah(0, judul("Hari pembukaan"), lantai("lt", 152), ...pintu("pn", 110, 62, 80, 88), ...pitaPintu("pt", 110, 108, 190)),
      tambah(idx(SUARA_M1, "Pak"), ...tokoh("bd", 50, 176, "budi")),
      tambah(idx(SUARA_M1, "menggunting"), emo("gt", 84, 152, E.gunting, 20)),
      hapus(idx(SUARA_M1, "pita"), "pt", "pt-s"),
      tambah(idx(SUARA_M1, "pita"), gs("pa", 110, 108, 142, 120, "#DC2626", 5, { z: 1 }), gs("pb", 190, 108, 158, 120, "#DC2626", 5, { z: 1 })),
      tambah(idx(SUARA_M1, "dibuka"), ...spanduk("sp", 50, 30, 200, "Koperasi Dibuka", 11), emo("kf0", 26, 72, E.konfeti, 22), emo("kf1", 274, 72, E.konfeti2, 22)),
    ),
    k(
      SUARA_M2,
      tambah(idx(SUARA_M2, "lengkap"), ...kartu("lk", 6, 72, 100, 34, W.hijauMuda, ["pesanan lengkap", "dan pas"], 8.4)),
      tambah(idx(SUARA_M2, "pas"), emo("ok", 56, 122, E.centang, 20)),
      tambah(idx(SUARA_M2, "anak"), ...[218, 246, 274].map((x, i) => emo(`ak${i}`, x, 176, E.anakAnak, 24))),
      tambah(idx(SUARA_M2, "topi"), emo("tp", 274, 150, E.topi, 18)),
      tambah(idx(SUARA_M2, "pensil"), emo("pe", 246, 150, E.pensil, 18)),
    ),
    k(
      SUARA_M3,
      hapus(0, ...idTokoh("bd", "budi"), "gt", "ok", "lk-k", "lk-t0", "lk-t1", "ak0", "ak1", "ak2", "tp", "pe"),
      tambah(idx(SUARA_M3, "Chacha"), ...tokoh("ch", 70, 176, "chacha")),
      tambah(idx(SUARA_M3, "Dika"), ...tokoh("dk", 150, 176, "dika")),
      tambah(idx(SUARA_M3, "Nia"), ...tokoh("ni", 230, 176, "nia")),
      tambah(idx(SUARA_M3, "lencana"), emo("lc1", 150, 152, E.medali, 18), emo("lc2", 230, 152, E.medali, 18)),
      tambah(idx(SUARA_M3, "terbalik"), emo("lc0", 70, 152, E.medali, 18, { rot: 180 })),
      tambah(idx(SUARA_M3, "senang"), emo("tw", 100, 144, E.tertawa, 22)),
    ),
  ],
};

/* ------------------------------ 9. Penutup ------------------------------ */
const SUARA_Z1 = "Bu Sari tersenyum bangga. Koperasi sekolah sekarang siap melayani semua anak.";
const SUARA_Z2 = "Dika merangkum. Baca pelan-pelan, tulis diketahui dan ditanya, pilih tambah atau kurang, lalu simpulkan.";
const SUARA_Z3 = "Menurutmu, kalau cerita memakai kata selisih, kamu menambah atau mengurangi? Terima kasih, Chacha, Dika, Nia, dan Bu Sari!";

const LANGKAH_AKHIR = [
  { id: "r1", y: 60, isi: "1. Baca pelan-pelan", warna: W.langit },
  { id: "r2", y: 84, isi: "2. Tulis diketahui, ditanya", warna: W.krem },
  { id: "r3", y: 108, isi: "3. Pilih tambah atau kurang", warna: W.hijauMuda },
  { id: "r4", y: 132, isi: "4. Simpulkan", warna: W.pink },
];

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Koperasi siap melayani",
  sumber: "Materi: penutup dan rangkuman",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_Z1,
      tambah(0, judul("Koperasi siap"), lantai("lt", 152)),
      tambah(idx(SUARA_Z1, "Sari"), ...tokoh("sr", 150, 176, "sari")),
      tambah(idx(SUARA_Z1, "tersenyum"), emo("sy", 150, 146, E.senyum, 22)),
      tambah(idx(SUARA_Z1, "Koperasi"), ...spanduk("sp", 40, 28, 220, "Koperasi Sekolah", 11), emo("tk", 60, 112, E.toko, 44)),
      tambah(idx(SUARA_Z1, "anak"), ...[198, 230, 262].map((x, i) => emo(`ak${i}`, x, 176, E.anakAnak, 24))),
    ),
    k(
      SUARA_Z2,
      tambah(idx(SUARA_Z2, "Dika"), ...tokoh("dk", 90, 176, "dika")),
      ...LANGKAH_AKHIR.map((l, i) => tambah(idx(SUARA_Z2, ["Baca", "tulis", "pilih", "simpulkan"][i]), ...kartu(l.id, 120, l.y, 170, 20, l.warna, [l.isi], 8.6))),
    ),
    k(
      SUARA_Z3,
      hapus(0, ...LANGKAH_AKHIR.flatMap((l) => [`${l.id}-k`, `${l.id}-t0`])),
      tambah(idx(SUARA_Z3, "selisih"), ...kartu("pt", 60, 60, 200, 24, W.krem, ["selisih: tambah atau kurang?"], 9.6)),
      tambah(idx(SUARA_Z3, "mengurangi"), emo("tn", 150, 120, E.tanya, 22)),
      tambah(idx(SUARA_Z3, "Terima"), emo("lb", 40, 148, E.lambai, 20)),
      tambah(idx(SUARA_Z3, "Chacha"), ...tokoh("ch", 30, 176, "chacha")),
      tambah(idx(SUARA_Z3, "Nia"), ...tokoh("ni", 120, 176, "nia")),
    ),
  ],
};
