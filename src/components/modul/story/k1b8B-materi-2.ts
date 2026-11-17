import type { AdeganStory } from "./logika-story";
import { DG, E, W, barisBintang, emo, garis, idKolom, judul, kartu, kolomBintang, namaBaris, namaKol, orang, panah, rapatkan, sumbuMendatar, sumbuTegak, teks, xKol, bintang } from "./k1b8B-gambar";
import { bersih, hapus, k, redamkan, sorotkan, tambah, ubah } from "./k1b8B-bantu";

/*
 * Cerita orisinal IGIL "Cerita Kesukaan Anak Kampung" (Kelas 1 Bab 8 Sub-Bab B), akhir cerita Perpustakaan Keliling.
 * Naskah suara dari naskah/story-naskah-k1b8b.md. Bagian ini: bintang renggang (salah langkah), bagian diagram tegak dan mendatar, dan membandingkan kolom.
 * Data survei: dinosaurus 5, robot 4, peri 2, sirkus 4.
 */

const DATA = [5, 4, 2, 4];
const kolomSemua = (id: string, dy4: number = DG.dy) => DATA.flatMap((n, i) => kolomBintang(id, i, n, i === 1 ? dy4 : DG.dy));
const namaSemua = (id: string) => DATA.map((_, i) => namaKol(`${id}${i}`, i));

/* ------------------------------ 4. Bintang renggang (salah langkah) ------------------------------ */
const SUARA_R1 = "Igil menggambar diagram gambar dengan buru-buru. Bintang robot ia renggangkan, jadi kolom robot tampak tinggi.";
const SUARA_R2 = "Kaka menggeleng. Robot hanya empat, dinosaurus lima, tetapi kolom robot kelihatan lebih tinggi!";
const SUARA_R3 = "Gambar harus sama besar, rapat, dan dimulai dari garis bawah. Mamah bertanya, mengapa? Karena yang dihitung banyak gambarnya, bukan tinggi kolomnya.";

export const ADEGAN_RENGGANG: AdeganStory = {
  id: "renggang",
  judul: "Bintang robot yang direnggangkan",
  sumber: "Materi: gambar harus sama besar dan rapat",
  latar: "#FEF2F2",
  ketukan: [
    k(
      SUARA_R1,
      tambah(0, judul("Diagram Igil")),
      tambah("Igil", ...orang("ig", 272, 120, E.igil, "Igil")),
      tambah("diagram", ...sumbuTegak("sb", 5, false), ...namaSemua("nm")),
      tambah("menggambar", ...[0, 2, 3].flatMap((i) => kolomBintang("gm", i, DATA[i]))),
      tambah("renggangkan,", ...kolomBintang("gm", 1, 4, 20)),
      tambah("tinggi.", emo("tq", xKol(1) + 22, 70, E.tanya, 18)),
    ),
    k(
      SUARA_R2,
      hapus("Kaka", "tq"),
      tambah("Kaka", ...orang("kk", 272, 172, E.kaka, "Kaka")),
      tambah("empat,", teks("r4", xKol(1), 66, "4", 12, W.merah)),
      tambah("lima,", teks("d5", xKol(0), 80, "5", 12, W.merah)),
      tambah("lebih", emo("sl", xKol(1) + 24, 100, E.salah, 18)),
    ),
    k(
      SUARA_R3,
      hapus(0, "r4", "d5", "sl"),
      tambah("Gambar", ...kartu("c0", 6, 28, 92, 20, W.hijauMuda, ["sama besar"], 8.2)),
      ubah("rapat,", ...rapatkan("gm", 1, 4)),
      tambah("rapat,", ...kartu("c1", 104, 28, 92, 20, W.hijauMuda, ["rapat"], 8.2)),
      tambah("garis", ...kartu("c2", 202, 28, 92, 20, W.hijauMuda, ["mulai garis bawah"], 8.2)),
      tambah("Mamah", ...orang("mm", 272, 76, E.mamah, "Mamah")),
      tambah("mengapa?", emo("tn", 246, 70, E.tanya, 20)),
      tambah("dihitung", teks("hg", 150, 66, "yang dihitung: banyak gambar", 9, W.ungu)),
    ),
  ],
};

/* ------------------------------ 5. Bagian diagram ------------------------------ */
const SUARA_G1 = "Diagram gambar yang benar punya judul di atas dan nama di bawah tiap kolom.";
const SUARA_G2 = "Angka di sisi kiri menunjukkan banyak gambar, dan keterangan menjelaskan satu bintang sama dengan satu anak.";
const SUARA_G3 = "Abang membuat bentuk lain. Gambarnya berjajar ke samping, itu diagram mendatar, dan datanya sama.";

export const ADEGAN_BAGIAN: AdeganStory = {
  id: "bagian",
  judul: "Bagian-bagian diagram gambar",
  sumber: "Materi: judul, nama kolom, gambar, angka, keterangan; diagram mendatar",
  latar: "#F5F3FF",
  ketukan: [
    k(
      SUARA_G1,
      tambah(0, judul("Bagian diagram")),
      tambah("Diagram", ...sumbuTegak("sb", 5, false)),
      tambah("gambar", ...kolomSemua("bd")),
      tambah("judul", teks("dt", 140, 44, "Cerita Kesukaan Anak", 9.6, W.ungu), ...kartu("pj", 214, 36, 78, 20, W.merahMuda, ["judul"], 8.4), panah("pjp", 214, 46, -16, 2)),
      tambah("nama", ...namaSemua("nm"), ...kartu("pn", 252, 158, 46, 20, W.langit, ["nama kolom"], 7.2), panah("pnp", 252, 168, -8, 0)),
    ),
    k(
      SUARA_G2,
      hapus(0, "pj-k", "pj-t0", "pjp", "pn-k", "pn-t0", "pnp"),
      tambah("Angka", ...sumbuTegak("sb", 5, true).filter((o) => /^sba\d$/.test(o.id)), ...kartu("pa", 8, 92, 38, 18, W.krem, ["angka"], 8.2), panah("pap", 46, 101, 8, 0)),
      tambah("gambar,", ...kartu("pg", 246, 100, 46, 18, W.pink, ["gambar"], 8.2), panah("pgp", 246, 108, -12, 6)),
      tambah("keterangan", ...kartu("pk", 214, 178, 80, 20, W.hijauMuda, ["keterangan"], 8.2), teks("kt", 112, 191, "1 bintang = 1 anak", 8.6, W.biru), bintang("kb", 50, 188, 5)),
    ),
    k(
      SUARA_G3,
      bersih(0),
      tambah(0, judul("Diagram mendatar")),
      tambah("Abang", ...orang("ab", 250, 150, E.abang, "Abang")),
      tambah("Gambarnya", ...sumbuMendatar("sm", 5), ...DATA.map((_, i) => namaBaris(`nb${i}`, i))),
      tambah("berjajar", ...DATA.flatMap((n, i) => barisBintang("bm", i, n))),
      tambah("mendatar,", ...kartu("md", 180, 50, 112, 26, W.langit, ["diagram mendatar"], 9)),
      tambah("datanya", ...kartu("ds", 180, 90, 112, 26, W.krem, ["datanya sama"], 9)),
    ),
  ],
};

/* ------------------------------ 6. Membandingkan kolom ------------------------------ */
const SUARA_P1 = "Dinosaurus paling banyak, ada lima. Peri paling sedikit, ada dua.";
const SUARA_P2 = "Robot dan sirkus sama banyak, masing-masing empat.";
const SUARA_P3 = "Dinosaurus lebih banyak satu dari robot. Lima dikurangi dua sama dengan tiga, jadi dinosaurus lebih banyak tiga dari peri.";

const idDino = idKolom("bp", 0, 0, 4);
const idRobot = idKolom("bp", 1, 0, 3);
const idPeri = idKolom("bp", 2, 0, 1);
const idSirkus = idKolom("bp", 3, 0, 3);

export const ADEGAN_BANDING: AdeganStory = {
  id: "banding",
  judul: "Membandingkan banyak gambar",
  sumber: "Materi: paling banyak, paling sedikit, sama banyak, selisih",
  latar: "#ECFEFF",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Membandingkan kolom"), ...sumbuTegak("sb", 5, true), ...kolomSemua("bp"), ...namaSemua("nm")),
      sorotkan("Dinosaurus", ...idDino),
      tambah("banyak,", ...kartu("pb", 70, 56, 80, 20, W.hijauMuda, ["paling banyak"], 8)),
      tambah("lima.", teks("d5", xKol(0), 84, "5", 11, W.merah)),
      sorotkan("Peri", ...idPeri),
      tambah("sedikit,", ...kartu("ps", 146, 90, 76, 20, W.merahMuda, ["paling sedikit"], 8)),
      tambah("dua.", teks("p2", xKol(2), 118, "2", 11, W.merah)),
    ),
    k(
      SUARA_P2,
      hapus(0, "pb-k", "pb-t0", "d5", "ps-k", "ps-t0", "p2"),
      redamkan(0, ...idDino, ...idPeri),
      sorotkan("Robot", ...idRobot, ...idSirkus),
      tambah("sama", garis("gs", 120, 102, 130, 0, W.merah, 1.4, { putus: true })),
      tambah("empat.", teks("e4", xKol(2), 96, "4 = 4", 12, W.merah)),
    ),
    k(
      SUARA_P3,
      hapus(0, "gs", "e4"),
      redamkan("Dinosaurus", ...idRobot, ...idSirkus),
      sorotkan("Dinosaurus", ...idDino),
      tambah("satu", teks("k1", 150, 60, "5 – 4 = 1", 11, W.merah)),
      ubah("Lima", { id: "k1", isi: "5 – 2 = 3" }),
      sorotkan("tiga,", ...idPeri),
    ),
  ],
};
