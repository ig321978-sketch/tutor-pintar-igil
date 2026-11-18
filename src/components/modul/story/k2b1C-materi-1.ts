import type { AdeganStory } from "./logika-story";
import { E, W, angkaNampan, emo, etalase, garisBilangan, judul, kartu, lantai, mejaPesta, nampan, teks, titikBil, tokoh, xBil } from "./k2b1C-gambar";
import { hapus, k, sorotkan, tambah, ubah } from "./k2b1C-bantu";

/*
 * Cerita orisinal IGIL "Dua Nampan untuk Pesta Kue" (Kelas 2 Bab 1 Sub-Bab C, membandingkan bilangan sampai lima puluh), akhir cerita Kue di Kantin Sekolah.
 * Naskah suara dari naskah/story-naskah-k2b1c.md. Bagian ini: dua nampan di etalase, perkiraan dengan patokan, dan salah langkah membandingkan satuan dulu.
 */

/* ------------------------------ 1. Dua nampan di etalase ------------------------------ */
const SUARA_N1 = "Bu Dewi menaruh dua nampan di etalase. Nampan lapis berisi tiga puluh delapan kue, nampan donat empat puluh satu.";
const SUARA_N2 = "Bu Sari bertanya, nampan mana yang dibawa ke meja Pesta Kue? Meja itu butuh yang lebih banyak.";
const SUARA_N3 = "Kalau salah pilih, anak-anak di barisan belakang tidak kebagian kue!";

export const ADEGAN_DUA_NAMPAN: AdeganStory = {
  id: "dua-nampan",
  judul: "Dua nampan di etalase",
  sumber: "Materi: dua nampan dan meja Pesta Kue",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_N1,
      tambah(0, judul("2 nampan di etalase"), lantai("lt", 150), etalase("et", 40, 52, 220, 92)),
      tambah("Dewi", tokoh("dw", 20, 172, "dewi")),
      tambah("lapis", nampan("n1", 48, 84, 100, E.lapis), teks("nm1", 98, 76, "nampan lapis", 8.6)),
      tambah("delapan", angkaNampan("n1", 48, 84, 100, 38)),
      tambah("donat", nampan("n2", 152, 84, 100, E.donat), teks("nm2", 202, 76, "nampan donat", 8.6)),
      tambah("satu.", angkaNampan("n2", 152, 84, 100, 41)),
    ),
    k(
      SUARA_N2,
      tambah("Sari", tokoh("sr", 282, 172, "sari")),
      tambah("bertanya,", emo("tn", 282, 140, E.tanya, 22)),
      tambah("Pesta", ...mejaPesta("mj", 84, 150, 132), teks("mj-nm", 150, 175, "Meja Pesta Kue", 8.4, W.coklat)),
      tambah("butuh", ...kartu("bt", 60, 26, 180, 20, W.krem, ["meja butuh yang lebih banyak"], 8.6)),
      sorotkan("banyak.", "mj"),
    ),
    k(
      SUARA_N3,
      hapus("Kalau", "bt-k", "bt-t0", "tn"),
      tambah("salah", emo("sr2", 282, 140, E.seru, 22)),
      tambah("anak-anak", ...[60, 105, 150].map((x, i) => emo(`kd${i}`, x, 196, E.anak, 18))),
      tambah("barisan", ...[195, 240].map((x, i) => emo(`kd${i + 3}`, x, 196, E.anak, 18))),
      tambah("tidak", emo("sl", 240, 172, E.salah, 16)),
      tambah("kue!", emo("sd", 216, 170, E.sedih, 18)),
    ),
  ],
};

/* ------------------------------ 2. Perkiraan dengan patokan ------------------------------ */
const SUARA_K1 = "Nia memperkirakan dulu. Tiga puluh delapan hampir empat puluh, dan empat puluh satu sedikit lebih dari empat puluh.";
const SUARA_K2 = "Kira-kira keduanya hampir sama, jadi harus diteliti.";
const SUARA_K3 = "Dika mencatat perkiraan itu, lalu siap membuktikannya.";

const GB = { x: 24, w: 252, y: 110 };
const di = (n: number): number => xBil(GB.x, GB.w, 30, 50, n);

export const ADEGAN_KIRA_KIRA: AdeganStory = {
  id: "kira-kira",
  judul: "Perkiraan dengan patokan",
  sumber: "Materi: perkiraan, patokan empat puluh",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_K1,
      tambah(0, judul("Perkiraan dulu"), lantai("lt", 150), garisBilangan("gb", GB.x, GB.y, GB.w, 30, 50, 5)),
      tambah("Nia", tokoh("ni", 28, 172, "nia")),
      tambah("Tiga", titikBil("p38", di(38), GB.y, "38")),
      tambah("hampir", ...kartu("ha", 30, 44, 110, 20, W.krem, ["38 hampir 40"], 8.6)),
      sorotkan("empat", "gb-t40", "gb-l40"),
      tambah("satu", titikBil("p41", di(41), GB.y, "41", W.hijau)),
      tambah("sedikit", ...kartu("sl", 160, 44, 124, 20, W.hijauMuda, ["41 sedikit lebih dari 40"], 8.2)),
    ),
    k(
      SUARA_K2,
      tambah("Kira-kira", ...kartu("ks", 70, 68, 160, 20, W.emas, ["kira-kira hampir sama"], 8.8)),
      sorotkan("keduanya", "p38", "p41"),
      tambah("diteliti.", emo("kc", 150, 162, E.kaca, 22)),
    ),
    k(
      SUARA_K3,
      hapus("Dika", "kc"),
      tambah("Dika", ...tokoh("dk", 272, 172, "dika")),
      tambah("mencatat", emo("ct", 246, 152, E.catat, 20)),
      tambah("perkiraan", ...kartu("ps", 88, 152, 124, 22, W.hijauMuda, ["perkiraan: hampir sama"], 8.4)),
      tambah("membuktikannya.", emo("kt", 150, 192, E.kuat, 18)),
    ),
  ],
};

/* ------------------------------ 3. Salah langkah: satuan dulu ------------------------------ */
const SUARA_S1 = "Chacha terburu-buru. Delapan lebih besar dari satu, jadi nampan lapis lebih banyak!";
const SUARA_S2 = "Dika mengangkat tangan. Kamu membandingkan satuannya saja, padahal puluhannya belum dilihat.";
const SUARA_S3 = "Bu Sari bertanya, mengapa puluhan dulu? Karena satu puluhan berisi sepuluh kue, lebih banyak dari satuan mana pun.";

const angkaBesar = (id: string, x: number, isi: string) => teks(id, x, 84, isi, 30, W.biru);

export const ADEGAN_SATUAN_DULU: AdeganStory = {
  id: "satuan-dulu",
  judul: "Membandingkan satuannya saja",
  sumber: "Materi: salah langkah, satuan dulu",
  latar: "#FEFCE8",
  ketukan: [
    k(
      SUARA_S1,
      tambah(0, judul("Salah langkah!"), lantai("lt", 150), teks("nm1", 73, 44, "nampan lapis", 8.6), teks("nm2", 227, 44, "nampan donat", 8.6), angkaBesar("a3", 60, "3"), angkaBesar("a8", 86, "8"), angkaBesar("a4", 214, "4"), angkaBesar("a1", 240, "1")),
      tambah("Chacha", ...tokoh("ch", 28, 172, "chacha")),
      tambah("terburu-buru.", emo("ss", 58, 150, E.seru, 18)),
      ubah("Delapan", { id: "a8", warna: W.merah, sorot: true }),
      ubah("satu,", { id: "a1", warna: W.merah, sorot: true }),
      tambah("lapis", ...kartu("sy", 30, 110, 100, 20, W.merahMuda, ["lapis lebih banyak?"], 8.4)),
    ),
    k(
      SUARA_S2,
      hapus("Dika", "ss", "sy-k", "sy-t0"),
      tambah("Dika", ...tokoh("dk", 272, 172, "dika")),
      tambah("mengangkat", emo("tg", 272, 146, E.tangan, 18)),
      tambah("satuannya", emo("x1", 86, 108, E.salah, 16), emo("x2", 240, 108, E.salah, 16)),
      ubah("puluhannya", { id: "a3", warna: W.hijau, sorot: true }, { id: "a4", warna: W.hijau, sorot: true }),
      tambah("belum", ...kartu("bl", 60, 124, 180, 20, W.hijauMuda, ["puluhan belum dilihat"], 8.4)),
    ),
    k(
      SUARA_S3,
      hapus("Sari", "tg", "x1", "x2", "bl-k", "bl-t0"),
      tambah("Sari", ...tokoh("sr", 150, 172, "sari")),
      tambah("bertanya,", emo("tn", 196, 176, E.tanya, 20)),
      tambah("Karena", ...kartu("al", 84, 100, 132, 20, W.krem, ["aturan: puluhan dulu"], 8.6)),
      tambah("sepuluh", ...kartu("sp", 70, 124, 160, 20, W.emas, ["1 puluhan = 10 kue"], 8.6)),
      tambah("banyak", emo("bk", 232, 132, E.bintang, 16)),
    ),
  ],
};

