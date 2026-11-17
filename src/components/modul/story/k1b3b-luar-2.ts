import type { AdeganStory } from "./logika-story";
import { E, KURANG, W, emo, garisBilangan, judul, kalimatK, kartu, kotak, orang, panahObj, teks } from "./k1b3b-gambar";
import { bersih, k, sorotkan, tambah, ubah, urutKata } from "./k1b3b-bantu";
import { WARNA_METODE, kepala } from "./k1b3b-luar-1";

/* Video metode global Sub-Bab B: Number Line (Garis Bilangan), Make Ten (Pasangan Sepuluh), dan ringkasan. */

const GB = { x0: 25, y: 112, j: 25 };
const xg = (n: number) => GB.x0 + n * GB.j;

/* ------------------------------ 4. Number Line: konsep ------------------------------ */
const SUARA_C1 = "Metode kedua, Number Line, atau Garis Bilangan. Bilangan berderet dari nol sampai sepuluh.";
const SUARA_C2 = "Untuk mengurangi, letakkan penanda di bilangan pertama.";
const SUARA_C3 = "Lalu melompat ke kiri satu takik untuk setiap yang dikurangi.";
const SUARA_C4 = "Tempat penanda berhenti adalah hasilnya. Ke kiri berarti lebih kecil.";

export const ADEGAN_LUAR_GARIS: AdeganStory = {
  id: "luar-garis",
  judul: "Number Line: garis bilangan",
  sumber: "Metode global: Number Line",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_C1, tambah("kedua,", ...kepala(1)), tambah("berderet", ...garisBilangan("gb", GB.x0, GB.y, GB.j)), sorotkan("nol", "gb-a0"), sorotkan("sepuluh.", "gb-a10")),
    k(SUARA_C2, tambah("penanda", emo("pd", xg(6), 86, "\u{1F53B}", 18), ...kartu("sl", 110, 52, 80, 22, W.emas, [`6 ${KURANG} 2`], 12))),
    k(SUARA_C3, tambah("kiri", panahObj("l1", xg(6) - 4, 100, -(GB.j - 8), 0, W.merah)), tambah("takik", panahObj("l2", xg(5) - 4, 100, -(GB.j - 8), 0, W.merah)), ubah("dikurangi.", { id: "pd", x: xg(4) })),
    k(SUARA_C4, sorotkan("berhenti", "gb-a4"), ubah("hasilnya.", { id: "sl-t0", isi: `6 ${KURANG} 2 = 4` }), tambah("kecil.", ...kartu("kc", 50, 160, 200, 24, W.hijauMuda, ["ke kiri: lebih kecil"], 10))),
  ],
};

/* ------------------------------ 5. Number Line: terapan ------------------------------ */
const SUARA_D1 = "Ada tujuh stasiun sampai desa Nenek. Kereta sudah melewati empat stasiun.";
const SUARA_D2 = "Letakkan penanda di tujuh. Lalu lompat ke kiri empat kali.";
const SUARA_D3 = "Enam, lima, empat, tiga. Penanda berhenti di tiga.";
const SUARA_D4 = "Tujuh dikurangi empat sama dengan tiga. Tinggal tiga stasiun lagi.";
const posD3 = urutKata(SUARA_D3, ["Enam,", "lima,", "empat,", "tiga."]);

export const ADEGAN_LUAR_GARIS_TERAPAN: AdeganStory = {
  id: "luar-garis-terapan",
  judul: "Number Line: stasiun sampai desa",
  sumber: "Metode global: Number Line, terapan",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_D1, tambah(0, ...kepala(1)), tambah("tujuh", ...[0, 1, 2, 3, 4, 5, 6].map((i) => emo(`st${i}`, 40 + i * 36, 80, E.stasiun, 20))), tambah("Nenek.", emo("rm", 272, 80, E.rumah, 20)), ubah("melewati", ...[0, 1, 2, 3].map((i) => ({ id: `st${i}`, op: 0.3 }))), tambah("empat", teks("lw", 98, 106, "sudah lewat 4", 9, W.merah))),
    k(SUARA_D2, bersih(0), tambah(0, ...kepala(1), ...garisBilangan("gb", GB.x0, GB.y, GB.j)), tambah("penanda", emo("pd", xg(7), 86, "\u{1F53B}", 18)), tambah("kiri", teks("tk", 150, 58, "lompat ke kiri 4 kali", 10, W.merah))),
    k(SUARA_D3, ...[6, 5, 4, 3].flatMap((n, i) => [tambah(posD3[i], panahObj(`h${n}`, xg(n + 1) - 4, 100, -(GB.j - 8), 0, W.merah)), ubah(posD3[i], { id: "pd", x: xg(n) })]), sorotkan("berhenti", "gb-a3")),
    k(SUARA_D4, bersih(0), tambah(0, ...kepala(1)), tambah("Tujuh", ...kalimatK("kl", 150, 90, ["7", KURANG, "4", "=", "3"], 20, 28)), tambah("Tinggal", ...[0, 1, 2].map((i) => emo(`sg${i}`, 110 + i * 40, 146, E.stasiun, 24)), emo("rm", 230, 146, E.rumah, 24))),
  ],
};

/* ------------------------------ 6. Make Ten: konsep ------------------------------ */
const SUARA_F1 = "Metode ketiga, Make Ten, atau Pasangan Sepuluh. Ada pasangan bilangan yang bersama-sama menjadi sepuluh.";
const SUARA_F2 = "Satu dan sembilan, dua dan delapan, tiga dan tujuh, empat dan enam, lima dan lima.";
const SUARA_F3 = "Kalau sepuluh dikurangi satu bilangan, jawabannya pasangan sepuluhnya.";
const SUARA_F4 = "Hafalkan pasangan sepuluh supaya pengurangan dari sepuluh cepat.";
const PASANGAN = [
  [1, 9],
  [2, 8],
  [3, 7],
  [4, 6],
  [5, 5],
];

export const ADEGAN_LUAR_SEPULUH: AdeganStory = {
  id: "luar-sepuluh",
  judul: "Make Ten: pasangan sepuluh",
  sumber: "Metode global: Make Ten",
  latar: "#FEFCE8",
  ketukan: [
    k(SUARA_F1, tambah("ketiga,", ...kepala(2)), tambah("sepuluh.", teks("t10", 150, 80, "10", 30, W.merah))),
    k(SUARA_F2, ...PASANGAN.map(([a, b], i) => tambah(["Satu", "dua", "tiga", "empat", "lima"][i], ...kartu(`p${i}`, 14 + i * 56, 110, 50, 30, W.emas, [`${a} dan ${b}`], 10)))),
    k(SUARA_F3, tambah("dikurangi", ...kartu("rm", 30, 156, 240, 26, W.langit, [`10 ${KURANG} 3 = 7`], 12)), sorotkan("pasangan", "p2-k")),
    k(SUARA_F4, tambah("Hafalkan", emo("ot", 262, 80, "\u{1F9E0}", 24)), tambah("cepat.", emo("jm", 38, 80, "\u{23F0}", 24))),
  ],
};

/* ------------------------------ 7. Make Ten: terapan ------------------------------ */
const SUARA_G1 = "Di gerbong ada sepuluh jendela. Delapan jendela sudah ditutup tirainya.";
const SUARA_G2 = "Pasangan sepuluh dari delapan adalah dua.";
const SUARA_G3 = "Jadi, sepuluh dikurangi delapan sama dengan dua. Dua jendela masih terbuka.";
const SUARA_G4 = "Igil memeriksa: dua jendela terbuka, delapan tertutup, semuanya sepuluh.";
const jendela = (i: number, tutup: boolean) => kotak(`jd${i}`, 22 + i * 26, 76, 22, 30, tutup ? "#FCA5A5" : "#BAE6FD", W.biru, { rx: 4, tebal: 1.4 });

export const ADEGAN_LUAR_SEPULUH_TERAPAN: AdeganStory = {
  id: "luar-sepuluh-terapan",
  judul: "Make Ten: jendela gerbong",
  sumber: "Metode global: Make Ten, terapan",
  latar: "#FEFCE8",
  ketukan: [
    k(SUARA_G1, tambah(0, ...kepala(2), kotak("gb", 12, 66, 276, 50, "#DBEAFE", W.biru, { rx: 14, z: -1 })), tambah("sepuluh", ...Array.from({ length: 10 }, (_, i) => jendela(i, false))), ubah("ditutup", ...Array.from({ length: 8 }, (_, i) => ({ id: `jd${i}`, warna: "#FCA5A5" })))),
    k(SUARA_G2, tambah("Pasangan", ...kartu("ps", 90, 132, 120, 26, W.emas, ["8 dan 2"], 12))),
    k(SUARA_G3, tambah("dikurangi", ...kalimatK("kl", 150, 182, ["10", KURANG, "8", "=", "2"], 18, 28)), sorotkan("terbuka.", "jd8", "jd9")),
    k(SUARA_G4, tambah("Igil", ...orang("ig", 30, 150, E.igil, "Igil")), tambah("sepuluh.", teks("sm", 250, 150, "semuanya 10", 9, W.ungu))),
  ],
};

/* ------------------------------ 8. Ringkasan ------------------------------ */
const SUARA_Z1 = "Kita sudah melihat tiga metode global untuk mengurangi dengan cepat di perjalanan.";
const SUARA_Z2 = "Number Bond: utuh dikurangi satu bagian sama dengan bagian yang lain.";
const SUARA_Z3 = "Number Line: letakkan penanda di bilangan pertama, lalu lompat ke kiri.";
const SUARA_Z4 = "Make Ten: sepuluh dikurangi satu bilangan sama dengan pasangan sepuluhnya.";

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan tiga metode global",
  sumber: "Ringkasan metode global",
  latar: "#EEF2FF",
  ketukan: [
    k(SUARA_Z1, tambah(0, judul("Ringkasan")), tambah("tiga", emo("rk", 150, 96, E.bintang, 44)), tambah("perjalanan.", ...kartu("rt", 60, 124, 180, 26, W.emas, ["3 metode global"], 10))),
    k(SUARA_Z2, bersih(0), tambah(0, judul("Ringkasan")), tambah("Number", ...kartu("r0", 14, 34, 272, 44, WARNA_METODE[0], ["Number Bond", "utuh dikurangi bagian = bagian lain"], 9.4))),
    k(SUARA_Z3, tambah("Line:", ...kartu("r1", 14, 86, 272, 44, WARNA_METODE[1], ["Number Line", "mulai dari bilangan pertama, ke kiri"], 9.4))),
    k(SUARA_Z4, tambah("Make", ...kartu("r2", 14, 138, 272, 44, WARNA_METODE[2], ["Make Ten", "10 dikurangi bilangan = pasangannya"], 9.4))),
  ],
};
