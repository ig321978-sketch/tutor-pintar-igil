import type { AdeganStory } from "./logika-story";
import { E, W, angkaSus, bersusunDasar, busa, ember, emo, garisSus, judul, kotak, lorong, pintu, sikat, teks, tokoh } from "./k4b1h-gambar";
import { hapus, k, sorotkan, tambah, ubah } from "./k4b1h-bantu";

/*
 * Cerita orisinal IGIL "Papan Jatah Bu Ratna" (Kelas 4 Bab 1 Sub-Bab H), cerita Penginapan Pulau Karang Indah.
 * Naskah suara dari naskah/story-naskah-k4b1h.md. Bagian ini: membagi bergiliran, pembagian bersusun, menyikat lantai.
 */

/* ------------------------------ 4. Membagi bergiliran ------------------------------ */
const SUARA_G1 = "Genta membagikan tamu satu per satu bergiliran, empat kamar sekali putaran.";
const SUARA_G2 = "Tiap putaran memakai empat tamu, jadi lima puluh enam tamu habis dalam empat belas putaran.";
const SUARA_G3 = "Tiap kamar mendapat empat belas tamu.";
const PX = [100, 138, 176, 214];

export const ADEGAN_BAGI_RATA: AdeganStory = {
  id: "bagi-rata",
  judul: "Membagi tamu bergiliran",
  sumber: "Materi: membagi bergiliran",
  latar: "#ECFDF5",
  ketukan: [
    k(
      SUARA_G1,
      tambah(0, judul("Membagi Bergiliran"), ...lorong("lr", 150), ...tokoh("ge", 40, 184, "Genta"), ...PX.flatMap((x, i) => pintu(`p${i}`, x, 96, i + 1, 30, 52))),
      tambah("satu", teks("s1", 62, 104, "1 tamu, 1 kamar", 8, W.merah)),
      tambah("bergiliran,", ...PX.map((x, i) => ({ id: `g${i}`, t: "bulat" as const, x: x + 15, y: 142, r: 3, warna: i % 2 === 0 ? "#FDBA74" : "#93C5FD", garis: "#7C2D12", tebal: 0.7, z: 4 }))),
      tambah("putaran.", teks("pt", 150, 82, "1 putaran = 4 tamu", 9, W.coklat)),
    ),
    k(
      SUARA_G2,
      hapus("memakai", "pt"),
      tambah("memakai", teks("e4", 150, 82, "4 tamu per putaran", 9, W.coklat)),
      tambah("lima", teks("t56", 44, 60, "56 tamu", 10, W.merah)),
      tambah("dalam", ...Array.from({ length: 14 }, (_, i) => [kotak(`ct${i}`, 24 + i * 18, 28, 16, 12, "#FEF3C7", W.coklat, { rx: 2, tebal: 1 }), teks(`cn${i}`, 32 + i * 18, 37, String(i + 1), 6.4, W.biru)]).flat()),
      sorotkan("putaran.@2", "ct13", "cn13"),
    ),
    k(
      SUARA_G3,
      hapus("kamar", "e4"),
      tambah("kamar", ...[0, 1].map((i) => teks(`m${i}`, PX[i] + 15, 90, "14", 12, W.hijauTua))),
      tambah("empat", ...[2, 3].map((i) => teks(`m${i}`, PX[i] + 15, 90, "14", 12, W.hijauTua))),
      sorotkan("tamu.", "p0", "p1", "p2", "p3"),
    ),
  ],
};

/* ------------------------------ 5. Pembagian bersusun ------------------------------ */
const SUARA_B1 = "Laras membagi bersusun dari puluhan, lima dibagi empat sama dengan satu sisa satu.";
const SUARA_B2 = "Sisa satu puluhan menjadi sepuluh satuan, lalu angka enam diturunkan menjadi enam belas.";
const SUARA_B3 = "Enam belas dibagi empat sama dengan empat, jadi hasilnya satu empat, yaitu empat belas.";
const BX = 70;
const BY = 96;

export const ADEGAN_BERSUSUN: AdeganStory = {
  id: "bersusun",
  judul: "Pembagian bersusun",
  sumber: "Materi: pembagian bersusun",
  latar: "#F5F3FF",
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, judul("Membagi Bersusun"), ...bersusunDasar("bs", BX, BY, "56", "4"), ...tokoh("lr", 240, 184, "Laras")),
      tambah("puluhan,", teks("hp", 68, 62, "puluhan", 8, W.ungu), teks("hs", 102, 62, "satuan", 8, W.ungu)),
      sorotkan("lima", "bs-d0"),
      tambah("empat", angkaSus("pr", BX, BY, 0, 1, "4"), garisSus("gl1", BX, BY, 0, 0, 1)),
      tambah("satu", angkaSus("q1", BX, BY, 0, -1, "1", W.merah)),
      tambah("sisa", angkaSus("sr", BX, BY, 0, 2, "1", W.merah)),
    ),
    k(
      SUARA_B2,
      tambah("puluhan", teks("sp", 205, 70, "1 puluhan = 10 satuan", 9, W.coklat)),
      sorotkan("sepuluh", "sr"),
      tambah("diturunkan", angkaSus("tn", BX, BY, 1, 2, "6", W.merah)),
      tambah("belas.", teks("n16", 205, 100, "16", 20, W.merah)),
    ),
    k(
      SUARA_B3,
      tambah("empat", angkaSus("q2", BX, BY, 1, -1, "4", W.merah)),
      tambah("empat@2", angkaSus("a1", BX, BY, 0, 3, "1"), angkaSus("a2", BX, BY, 1, 3, "6"), garisSus("gl2", BX, BY, 0, 1, 3), angkaSus("sr2", BX, BY, 1, 4, "0", W.hijau)),
      sorotkan("hasilnya", "q1", "q2"),
      tambah("belas.@2", teks("h14", 205, 130, "14", 22, W.hijauTua)),
    ),
  ],
};

/* ------------------------------ 6. Menyikat lantai ------------------------------ */
const SUARA_T1 = "Satria sadar angka enam tadi terlupa, lalu mengambil sikat.";
const SUARA_T2 = "Ia menyikat lantai kamar pertama dengan semangat yang cepat habis.";
const SUARA_T3 = "Pak Hendro tertawa dan membantunya membilas lantai.";

export const ADEGAN_SIKAT: AdeganStory = {
  id: "sikat",
  judul: "Satria menyikat lantai",
  sumber: "Materi: menyikat lantai",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Sikat Lantai"), ...lorong("lr", 130), ...tokoh("sa", 80, 184, "Satria")),
      tambah("enam", teks("n6", 150, 64, "6", 36, W.merah)),
      tambah("terlupa,", emo("lp", 192, 60, E.tanya, 24)),
      tambah("sikat.", ...sikat("sk", 130, 168)),
    ),
    k(
      SUARA_T2,
      tambah("lantai", ...busa("bu", 110, 164, 6)),
      tambah("pertama", ...pintu("pt", 230, 84, 1, 34, 46)),
      ubah("cepat", { id: "sa", isi: E.cemberut }),
      ubah("habis.", { id: "sa", isi: E.lelah }),
    ),
    k(
      SUARA_T3,
      tambah("Hendro", ...tokoh("ph", 232, 184, "Pak Hendro")),
      tambah("tertawa", emo("tw", 262, 146, E.tawa, 18)),
      tambah("membilas", ...ember("em", 196, 152)),
      hapus("lantai.", ...[0, 1, 2, 3, 4, 5].map((i) => `bu${i}`)),
      tambah("lantai.", teks("bs", 150, 100, "bersih!", 12, W.hijauTua)),
    ),
  ],
};
