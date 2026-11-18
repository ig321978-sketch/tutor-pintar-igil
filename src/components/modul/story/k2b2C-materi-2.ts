import type { AdeganStory } from "./logika-story";
import { E, W, baris, deret, emo, gs, judul, kalimat, kartu, lantai, panah, rak, teks, tokoh } from "./k2b2C-gambar";
import { bersih, hapus, idx, k, sorotkan, tambah, ubah } from "./k2b2C-bantu";

/*
 * Cerita orisinal IGIL "Pesanan Besar Pak Budi" (Kelas 2 Bab 2 Sub-Bab C). Naskah suara dari naskah/story-naskah-k2b2c.md.
 * Bagian ini: jumlah dan selisih, menjumlahkan tiga bilangan, dan mencari bilangan awal.
 */

const MINUS = "−";

/* ------------------------------ 4. Jumlah dan selisih ------------------------------ */
const SUARA_S1 = "Bu Sari menambah pertanyaan. Berapa jumlah pensil dan penggaris, dan berapa selisihnya?";
const SUARA_S2 = "Jumlah berarti digabung, dua belas ditambah delapan sama dengan dua puluh.";
const SUARA_S3 = "Selisih berarti beda banyaknya, dua belas dikurangi delapan sama dengan empat.";

const KJ = kalimat("kj", 150, 164, ["12", "+", "8", "=", "20"], 20, 30);
const KS = kalimat("ks", 150, 164, ["12", MINUS, "8", "=", "4"], 20, 30);

export const ADEGAN_SELISIH_JUMLAH: AdeganStory = {
  id: "selisih-jumlah",
  judul: "Jumlah dan selisih",
  sumber: "Materi: kata jumlah dan selisih",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_S1,
      tambah(0, judul("Jumlah dan selisih"), lantai("lt", 150)),
      tambah(idx(SUARA_S1, "Sari"), ...tokoh("sr", 30, 176, "sari")),
      tambah(idx(SUARA_S1, "jumlah"), ...kartu("kj", 60, 32, 100, 26, W.hijauMuda, ["JUMLAH +"], 10)),
      tambah(idx(SUARA_S1, "pensil"), emo("pe", 100, 108, E.pensil, 28)),
      tambah(idx(SUARA_S1, "penggaris"), emo("pi", 200, 108, E.penggaris, 28)),
      tambah(idx(SUARA_S1, "selisihnya"), ...kartu("ks", 170, 32, 100, 26, W.pink, [`SELISIH ${MINUS}`], 10)),
    ),
    k(
      SUARA_S2,
      sorotkan(idx(SUARA_S2, "Jumlah"), "kj-k"),
      tambah(idx(SUARA_S2, "digabung"), panah("pa1", 100, 124, 138, 146), panah("pa2", 200, 124, 162, 146)),
      tambah(idx(SUARA_S2, "belas"), KJ[0]),
      tambah(idx(SUARA_S2, "ditambah"), KJ[1]),
      tambah(idx(SUARA_S2, "delapan"), KJ[2]),
      tambah(idx(SUARA_S2, "sama"), KJ[3]),
      tambah(idx(SUARA_S2, "puluh"), KJ[4]),
    ),
    k(
      SUARA_S3,
      hapus(0, "pa1", "pa2", ...KJ.map((o) => o.id)),
      sorotkan(idx(SUARA_S3, "Selisih"), "ks-k"),
      tambah(idx(SUARA_S3, "beda"), ...kartu("bd", 95, 116, 110, 20, W.krem, ["beda banyaknya"], 8.6)),
      tambah(idx(SUARA_S3, "belas"), KS[0]),
      tambah(idx(SUARA_S3, "dikurangi"), KS[1]),
      tambah(idx(SUARA_S3, "delapan"), KS[2]),
      tambah(idx(SUARA_S3, "sama"), KS[3]),
      tambah(idx(SUARA_S3, "empat"), KS[4]),
    ),
  ],
};

/* ------------------------------ 5. Tiga bilangan ------------------------------ */
const SUARA_B1 = "Pesanan berikutnya: ada tujuh penghapus, empat rautan, dan enam pensil warna.";
const SUARA_B2 = "Nia menjumlahkan dua bilangan dulu, tujuh ditambah empat sama dengan sebelas. Lalu sebelas ditambah enam sama dengan tujuh belas.";
const SUARA_B3 = "Jumlah semuanya tujuh belas, dan boleh dimulai dari dua bilangan yang paling mudah!";

const E1 = kalimat("e", 150, 86, ["7", "+", "4", "=", "11"], 22, 36);
const E2 = kalimat("g", 150, 132, ["11", "+", "6", "=", "17"], 22, 36);

export const ADEGAN_TIGA_BILANGAN: AdeganStory = {
  id: "tiga-bilangan",
  judul: "Menjumlahkan tiga bilangan",
  sumber: "Materi: tiga bilangan",
  latar: "#FDF4FF",
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, judul("Tiga rak kecil"), lantai("lt", 160)),
      tambah(idx(SUARA_B1, "penghapus"), ...deret("hapus", "hp", baris(7, 22, 52, 17)), teks("hp-n", 222, 56, "penghapus 7", 9.6)),
      tambah(idx(SUARA_B1, "rautan"), ...deret("rautan", "rt", baris(4, 22, 92, 17)), teks("rt-n", 222, 96, "rautan 4", 9.6)),
      tambah(idx(SUARA_B1, "pensil"), ...deret("warna", "pw", baris(6, 22, 132, 17), 14), teks("pw-n", 222, 136, "pensil warna 6", 9.6)),
    ),
    k(
      SUARA_B2,
      bersih(0),
      tambah(0, judul("Dua bilangan dulu"), lantai("lt", 160)),
      tambah(idx(SUARA_B2, "Nia"), ...tokoh("ni", 36, 176, "nia")),
      tambah(idx(SUARA_B2, "dua"), teks("d2", 150, 44, "2 bilangan dulu", 12, W.ungu)),
      tambah(idx(SUARA_B2, "tujuh"), E1[0]),
      tambah(idx(SUARA_B2, "ditambah"), E1[1]),
      tambah(idx(SUARA_B2, "empat"), E1[2]),
      tambah(idx(SUARA_B2, "sama"), E1[3]),
      tambah(idx(SUARA_B2, "sebelas"), E1[4]),
      tambah(idx(SUARA_B2, "Lalu"), E2[0]),
      tambah(idx(SUARA_B2, "ditambah", 2), E2[1]),
      tambah(idx(SUARA_B2, "enam"), E2[2]),
      tambah(idx(SUARA_B2, "sama", 2), E2[3]),
      tambah(idx(SUARA_B2, "belas"), E2[4]),
    ),
    k(
      SUARA_B3,
      sorotkan(idx(SUARA_B3, "Jumlah"), "g4"),
      tambah(idx(SUARA_B3, "boleh"), emo("jm", 270, 160, E.jempol, 22)),
      tambah(idx(SUARA_B3, "dimulai"), gs("bk", 78, 100, 186, 100, W.hijau, 3, { z: 2 })),
      tambah(idx(SUARA_B3, "mudah"), ...kartu("pm", 96, 150, 130, 20, W.krem, ["mulai dari yang mudah"], 8.6)),
    ),
  ],
};

/* ------------------------------ 6. Bilangan awal ------------------------------ */
const SUARA_A1 = "Rak penggaris tinggal sembilan setelah terjual enam, dan Pak Budi ingin tahu banyaknya mula-mula.";
const SUARA_A2 = "Chacha bingung, tapi Dika menjelaskan. Yang tadi diambil kita kembalikan, jadi sembilan ditambah enam.";
const SUARA_A3 = "Sembilan ditambah enam sama dengan lima belas, jadi mula-mula ada lima belas penggaris!";

const LAMPAU = baris(6, 196, 70, 15);
const KEMBALI = baris(6, 52, 94, 15);
const KA = kalimat("kk", 150, 150, ["9", "+", "6", "=", "15"], 16, 28);
const by = (y: number): number => Number((y + 15 * 0.35).toFixed(1));

export const ADEGAN_BILANGAN_AWAL: AdeganStory = {
  id: "bilangan-awal",
  judul: "Mencari bilangan awal",
  sumber: "Materi: bilangan awal dengan membalik",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_A1,
      tambah(0, judul("Bilangan awal"), lantai("lt", 160), ...rak("rk", 40, 44, 142, 64)),
      tambah(idx(SUARA_A1, "tinggal"), ...deret("penggaris", "pg", baris(9, 52, 72, 15), 15), teks("tg-n", 110, 40, "tinggal 9", 8.4, W.coklat)),
      tambah(idx(SUARA_A1, "terjual"), ...deret("penggaris", "gh", LAMPAU, 15, { op: 0.4 }), teks("tj-n", 233, 52, "terjual 6", 8.4, W.merah)),
      tambah(idx(SUARA_A1, "Pak"), ...tokoh("bd", 262, 176, "budi")),
      tambah(idx(SUARA_A1, "mula-mula"), teks("aw", 150, 130, "mula-mula = ?", 12, W.merah)),
    ),
    k(
      SUARA_A2,
      tambah(idx(SUARA_A2, "Chacha"), ...tokoh("ch", 36, 176, "chacha")),
      tambah(idx(SUARA_A2, "bingung"), emo("tn", 36, 148, E.tanya, 20)),
      tambah(idx(SUARA_A2, "Dika"), ...tokoh("dk", 90, 176, "dika")),
      tambah(idx(SUARA_A2, "kembalikan"), panah("pb", 214, 60, 186, 60, W.hijau)),
      ubah(idx(SUARA_A2, "kembalikan"), ...KEMBALI.map((p, i) => ({ id: `gh${i}`, x: p.x, y: by(p.y), op: 1 }))),
      hapus(idx(SUARA_A2, "jadi"), "tn"),
      tambah(idx(SUARA_A2, "sembilan"), KA[0]),
      tambah(idx(SUARA_A2, "ditambah"), KA[1]),
      tambah(idx(SUARA_A2, "enam"), KA[2]),
    ),
    k(
      SUARA_A3,
      tambah(idx(SUARA_A3, "sama"), KA[3]),
      tambah(idx(SUARA_A3, "belas"), KA[4]),
      ubah(idx(SUARA_A3, "mula-mula"), { id: "aw", isi: "mula-mula = 15", warna: W.hijau }),
      tambah(idx(SUARA_A3, "penggaris"), emo("ok", 150, 176, E.centang, 22)),
      hapus(idx(SUARA_A3, "penggaris"), "pb"),
    ),
  ],
};
