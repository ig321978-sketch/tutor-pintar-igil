import type { AdeganStory, Obj } from "./logika-story";
import { BANGUN_LATIHAN, W, bulat, emo, garis, geser, judul, kartu, kotak, panah, penandaSiku, poligon, putar, tabel, teks, titikPenggaris, type Titik } from "./k5b6a-gambar";
import { bersih, k, redamkan, sorotkan, tambah, ubah } from "./k5b6a-bantu";
import { KERTAS_LIPAT } from "./k5b6a-materi-2";

/* ------------------------------ Tata letak enam bangun Ayo Berlatih (Buku Siswa hlm. 169) ------------------------------ */
export const PUSAT: Titik[] = [[55, 70], [150, 70], [245, 70], [55, 150], [150, 150], [245, 150]];
/** Kunci Panduan Guru hlm. 256: banyak sudut siku-siku pada nomor 1 sampai 6. */
export const KUNCI_SIKU = [4, 2, 0, 0, 4, 2];
const WARNA_BANGUN = [W.langit, W.hijauMuda, W.krem, W.pink, W.jingga, W.merahMuda];

/** Titik mutlak bangun ke-i (0 sampai 5) pada layar, berpusat di sel masing-masing. */
export function titikBangun(i: number): Titik[] {
  const p = BANGUN_LATIHAN[i];
  const xs = p.map((t) => t[0]);
  const ys = p.map((t) => t[1]);
  return geser(p, PUSAT[i][0] - (Math.min(...xs) + Math.max(...xs)) / 2, PUSAT[i][1] - (Math.min(...ys) + Math.max(...ys)) / 2);
}

export const bangun = (i: number): Obj => poligon(`bg${i + 1}`, 0, 0, titikBangun(i), WARNA_BANGUN[i], W.biru);
export const lencana = (i: number): Obj[] => [bulat(`nb${i + 1}`, PUSAT[i][0], PUSAT[i][1] + 40, 8, W.jingga, W.coklat, { tebal: 1.2 }), teks(`nbt${i + 1}`, PUSAT[i][0], PUSAT[i][1] + 43.2, String(i + 1), 9, W.coklat)];
export const tandaSiku = (i: number, vi: number): Obj => penandaSiku(`m${i + 1}-${vi}`, titikBangun(i), vi, 7);
export const jawab = (i: number, nilai: number = KUNCI_SIKU[i]): Obj => teks(`jw${i + 1}`, PUSAT[i][0] + 28, PUSAT[i][1] + 44, String(nilai), 11, W.hijau);
/** Tanda silang di luar titik sudut ke-vi bangun ke-i. */
export function silang(i: number, vi: number): Obj {
  const p = titikBangun(i);
  const mx = p.reduce((t, q) => t + q[0], 0) / p.length;
  const my = p.reduce((t, q) => t + q[1], 0) / p.length;
  const v = p[vi];
  const d = Math.hypot(v[0] - mx, v[1] - my) || 1;
  return teks(`x${i + 1}-${vi}`, v[0] + ((v[0] - mx) / d) * 10, v[1] + ((v[1] - my) / d) * 10 + 3.5, "✗", 10, W.merah);
}
const redupBawah = [4, 5, 6].flatMap((n) => [`bg${n}`, `nb${n}`, `nbt${n}`]);

/* ------------------------------ 1. Ayo Berlatih nomor 1 sampai 3 (hlm. 169; Panduan Guru hlm. 256) ------------------------------ */
export const ADEGAN_LATIHAN_1: AdeganStory = {
  id: "latihan-1",
  judul: "Ayo Berlatih: nomor 1 sampai 3",
  sumber: "Buku Siswa hlm. 169; Panduan Guru hlm. 256",
  latar: "#F0FDF4",
  kutipan: [
    "Ayo Berlatih",
    "Perhatikan bangun datar berikut. Ayo, coba kalian temukan",
    "banyaknya sudut siku-siku pada setiap bangun berikut.",
    "Kunci Jawaban",
    "Memiliki 4 sudut siku-siku.",
    "Memiliki 2 sudut siku-siku.",
    "Tidak memiliki sudut siku-siku.",
  ],
  ketukan: [
    k(
      "Sekarang Ayo Berlatih. Perhatikan bangun datar berikut, lalu temukan banyaknya sudut siku-siku pada setiap bangun.",
      tambah(0, judul("Ayo Berlatih: hitung sudut siku-siku")),
      tambah("Perhatikan", ...[0, 1, 2, 3, 4, 5].flatMap((i) => [bangun(i), ...lencana(i)])),
      sorotkan("setiap", "nb1", "nb2", "nb3", "nb4", "nb5", "nb6"),
    ),
    k(
      "Nomor satu, persegi panjang. Keempat pojoknya siku-siku, jadi ada empat sudut siku-siku.",
      ubah(0, ...redupBawah.map((id) => ({ id, op: 0.3 }))),
      redamkan(0, "nb1", "nb2", "nb3", "nb4", "nb5", "nb6"),
      tambah("Keempat", tandaSiku(0, 0)),
      tambah("pojoknya", tandaSiku(0, 1)),
      tambah("siku-siku,", tandaSiku(0, 2)),
      tambah("jadi", tandaSiku(0, 3)),
      tambah("empat", jawab(0)),
    ),
    k(
      "Nomor dua punya enam pojok. Dua pojok bawah siku-siku, sedangkan empat pojok lainnya miring. Jadi ada dua sudut siku-siku.",
      tambah("bawah", tandaSiku(1, 4), tandaSiku(1, 5)),
      tambah("sedangkan", silang(1, 0), silang(1, 1), silang(1, 2), silang(1, 3)),
      tambah("Jadi", jawab(1)),
    ),
    k(
      "Nomor tiga, belah ketupat. Kita cek keempat pojoknya satu per satu. Tidak ada yang pas dengan lipatan kertas, jadi tidak ada sudut siku-siku.",
      tambah("keempat", silang(2, 0), silang(2, 1)),
      tambah("satu", silang(2, 2), silang(2, 3)),
      tambah("jadi", jawab(2)),
    ),
  ],
};

/* ------------------------------ 2. Ayo Berlatih nomor 4 sampai 6 dan kunci (hlm. 169; Panduan Guru hlm. 256) ------------------------------ */
export const ADEGAN_LATIHAN_2: AdeganStory = {
  id: "latihan-2",
  judul: "Ayo Berlatih: nomor 4 sampai 6 dan kunci jawaban",
  sumber: "Buku Siswa hlm. 169; Panduan Guru hlm. 256",
  latar: "#ECFDF5",
  kutipan: ["Kunci Jawaban", "Memiliki 4 sudut siku-siku.", "Memiliki 2 sudut siku-siku.", "Tidak memiliki sudut siku-siku.", "No. Gambar Banyak Sudut Siku-Siku"],
  ketukan: [
    k(
      "Lanjut ke nomor empat sampai enam. Hasil tiga nomor pertama kita simpan dulu: empat, dua, dan nol.",
      tambah(0, judul("Lanjut: nomor 4 sampai 6")),
      tambah(0, ...[0, 1, 2, 3, 4, 5].flatMap((i) => [bangun(i), ...lencana(i)])),
      tambah("tiga", ...[0, 1, 2].flatMap((i) => [jawab(i)])),
      tambah("nol.", ...[3, 4, 5].map((i) => teks(`ph${i + 1}`, PUSAT[i][0] + 28, PUSAT[i][1] + 44, "?", 11, W.merah))),
    ),
    k(
      "Nomor empat adalah segitiga. Ketiga pojoknya tidak ada yang siku-siku, jadi jawabannya nol.",
      tambah("Ketiga", silang(3, 0), silang(3, 1), silang(3, 2)),
      ubah("nol.", { id: "ph4", isi: "0", warna: W.hijau }),
    ),
    k(
      "Nomor lima adalah persegi yang posisinya miring. Walaupun miring, keempat pojoknya tetap siku-siku, jadi ada empat.",
      tambah(7, tandaSiku(4, 0)),
      tambah(9, tandaSiku(4, 1), tandaSiku(4, 2), tandaSiku(4, 3)),
      ubah(15, { id: "ph5", isi: "4", warna: W.hijau }),
    ),
    k(
      "Nomor enam punya empat pojok. Dua pojok bawahnya siku-siku, dua pojok atasnya tidak. Jadi ada dua sudut siku-siku.",
      tambah("bawahnya", tandaSiku(5, 2), tandaSiku(5, 3)),
      tambah("atasnya", silang(5, 0), silang(5, 1)),
      ubah(15, { id: "ph6", isi: "2", warna: W.hijau }),
    ),
    k(
      "Cocokkan dengan kunci panduan guru: empat, dua, nol, nol, empat, dan dua. Kalau semua cocok, kalian sudah pandai membedakan sudut siku-siku.",
      bersih(0),
      tambah(0, judul("Kunci Jawaban Ayo Berlatih")),
      tambah("kunci", ...tabel("kn", 13, 62, [64, 36, 36, 36, 36, 36, 36], [["No.", "1", "2", "3", "4", "5", "6"], ["Siku-siku", "4", "2", "0", "0", "4", "2"]], 30, 10)),
      sorotkan("pandai", "kn-s10", "kn-t10", "kn-s11", "kn-t11", "kn-s12", "kn-t12", "kn-s13", "kn-t13", "kn-s14", "kn-t14", "kn-s15", "kn-t15", "kn-s16", "kn-t16"),
    ),
  ],
};

/* ------------------------------ 3. Miskonsepsi dan diferensiasi (Panduan Guru hlm. 255) ------------------------------ */
/** Segitiga siku-siku sebagai contoh sudut siku-siku dalam beberapa posisi: titik sudut di (vx, vy), diputar `derajat`. */
const segiSiku = (n: number, vx: number, vy: number, derajat: number, warna: string): { poli: Obj; titik: Titik[] } => {
  const titik = geser(putar(titikPenggaris(36, 32), derajat, 0, 0), vx, vy);
  return { poli: poligon(`ms${n}`, 0, 0, titik, warna), titik };
};
const POSISI = [segiSiku(1, 50, 118, 0, W.langit), segiSiku(2, 112, 82, 90, W.hijauMuda), segiSiku(3, 192, 118, 180, W.krem), segiSiku(4, 250, 82, 270, W.pink)];

export const ADEGAN_MISKONSEPSI: AdeganStory = {
  id: "miskonsepsi",
  judul: "Kesalahan yang mungkin terjadi dan diferensiasi",
  sumber: "Panduan Guru hlm. 255",
  latar: "#FFF1F2",
  kutipan: [
    "Miskonsepsi",
    "ada peserta didik yang tidak tepat menempatkan kertas",
    "tidak berimpit dengan kaki sudut benda",
    "siku-siku selalu digambar dengan posisi seperti gambar di samping",
    "Semua gambar di atas adalah sudut siku-siku.",
    "Diferensiasi",
    "mengerjakan latihan tanpa bantuan. Pada saat yang sama, guru dapat mendampingi siswa yang mengalami kesulitan.",
    "Berikan kesempatan kepada setiap kelompok untuk menyampaikan hasil",
  ],
  ketukan: [
    k(
      "Hati-hati dengan kesalahan yang mungkin muncul. Saat memakai kertas lipat, ada yang menempatkan kertasnya dengan tidak tepat.",
      tambah(0, judul("Miskonsepsi: kertas tidak tepat")),
      tambah("kertas", kotak("bk", 120, 50, 110, 76, W.langit, W.biru, { rx: 0, tebal: 2 }), teks("bkt", 175, 92, "buku", 10, W.biru)),
      tambah("menempatkan", poligon("kp", 136, 126, KERTAS_LIPAT, W.putih, W.coklat)),
      tambah("tepat.", garis("cl", 120, 140, 16, 0, W.merah, 3.4, { gambar: true }), teks("ct", 96, 144, "celah", 8.8, W.merah)),
    ),
    k(
      "Misalnya, salah satu sisi kertas tidak berimpit dengan sisi pojok benda. Akibatnya, jenis sudutnya bisa salah dikenali.",
      tambah("tidak", teks("tb", 190, 150, "tidak berimpit", 9.6, W.merah)),
      tambah("Akibatnya,", ...kartu("sl", 80, 164, 140, 26, W.merahMuda, ["hasil periksa bisa salah"], 8.8)),
    ),
    k(
      "Kesalahan lain, sudut siku-siku dianggap selalu digambar dengan posisi seperti ini: satu sisi mendatar, satu sisi tegak ke atas.",
      bersih(0),
      tambah(0, judul("Miskonsepsi: posisi sudut")),
      tambah("seperti", garis("pa", 90, 140, 100, 0, W.biru, 4, { gambar: true }), garis("pb", 90, 140, 0, -88, W.biru, 4, { gambar: true })),
      tambah("mendatar,", teks("mt", 180, 160, "mendatar", 9, W.biru)),
      tambah("tegak", teks("tg", 60, 94, "tegak", 9, W.biru)),
      tambah("dianggap", teks("sx", 220, 90, "selalu begini?", 9.6, W.merah)),
    ),
    k(
      "Karena itu, guru sebaiknya memberi berbagai posisi sudut siku-siku, supaya kalian tidak mengira sudut harus digambar seperti tadi.",
      bersih(0),
      tambah(0, judul("Berbagai posisi siku-siku")),
      tambah("berbagai", POSISI[0].poli, penandaSiku("mm1", POSISI[0].titik, 0, 8)),
      tambah("posisi", POSISI[1].poli, penandaSiku("mm2", POSISI[1].titik, 0, 8)),
      tambah("supaya", POSISI[2].poli, penandaSiku("mm3", POSISI[2].titik, 0, 8)),
      tambah("tadi.", POSISI[3].poli, penandaSiku("mm4", POSISI[3].titik, 0, 8)),
    ),
    k(
      "Semua gambar ini adalah sudut siku-siku, walaupun arahnya berbeda-beda. Yang menentukan adalah pas atau tidaknya dengan lipatan kertas.",
      tambah("sudut", ...[0, 1, 2, 3].map((i) => teks(`ya${i}`, [96, 160, 214, 270][i], [108, 106, 138, 100][i], "✓", 14, W.hijau))),
      tambah("pas", ...kartu("sm", 40, 168, 220, 26, W.hijauMuda, ["bukan arahnya, tetapi pas atau tidak"], 8.8)),
    ),
    k(
      "Untuk diferensiasi, kalian yang cepat belajar mengerjakan latihan tanpa bantuan. Pada saat yang sama, guru mendampingi kawan yang mengalami kesulitan.",
      bersih(0),
      tambah(0, judul("Diferensiasi")),
      tambah("cepat", emo("rk", 70, 80, "🚀", 40), ...kartu("d1", 24, 98, 120, 52, W.langit, ["Cepat belajar:", "kerjakan sendiri"], 9)),
      tambah("guru", emo("hd", 230, 80, "🤝", 40), ...kartu("d2", 156, 98, 120, 52, W.krem, ["Butuh bantuan:", "didampingi guru"], 9)),
    ),
    k(
      "Di akhir pembelajaran, setiap kelompok mendapat kesempatan menyampaikan hasil diskusi dan menanggapi. Jadi tidak semua kelompok harus menjadi presenter.",
      bersih(0),
      tambah(0, judul("Akhir pembelajaran")),
      tambah("setiap", emo("pr", 60, 90, "🗣", 36), ...kartu("hs", 100, 70, 170, 40, W.hijauMuda, ["menyampaikan hasil diskusi"], 9)),
      tambah("semua", ...kartu("tg", 100, 126, 170, 40, W.langit, ["sebagian kelompok", "boleh menanggapi saja"], 9)),
    ),
  ],
};

/* ------------------------------ 4. Refleksi nomor 1 dan rangkuman Subbab A (Buku Siswa hlm. 187; Panduan Guru hlm. 257) ------------------------------ */
export const ADEGAN_REFLEKSI: AdeganStory = {
  id: "refleksi-rangkuman",
  judul: "Refleksi nomor 1 dan rangkuman Subbab A",
  sumber: "Buku Siswa hlm. 187; Panduan Guru hlm. 257",
  latar: "#F5F3FF",
  kutipan: [
    "Setelah mempelajari materi terkait sudut, isilah tabel berikut sesuai",
    "Berilah tanda centang",
    "Aku dapat menemukan sudut siku-siku di",
    "lingkungan sekitarku.",
    "Akhiri pembelajaran dengan meminta siswa melakukan",
    "nomor 1 terkait kemampuan peserta didik dalam menemukan sudut",
    "ini membantu mengetahui jika masih",
    "kesulitan membedakan sudut siku-siku dan bukan sudut siku-siku.",
  ],
  ketukan: [
    k(
      "Di akhir subbab, lakukan refleksi. Refleksi di buku siswa berupa tabel pernyataan dengan kolom ya dan tidak, yang diisi dengan tanda centang.",
      tambah(0, judul("Refleksi")),
      tambah("tabel", ...kartu("pn", 14, 40, 190, 56, W.krem, ["Pernyataan nomor 1", "..."], 9)),
      tambah("kolom", ...kartu("ya", 214, 40, 34, 56, W.hijauMuda, ["Ya"], 9.4), ...kartu("td", 252, 40, 38, 56, W.merahMuda, ["Tidak"], 9.4)),
      tambah("centang.", teks("cg", 150, 126, "isi dengan tanda centang", 9.6, W.ungu)),
    ),
    k(
      "Pernyataan nomor satu berbunyi, aku dapat menemukan sudut siku-siku di lingkungan sekitarku. Centang ya, kalau kalian sudah bisa.",
      ubah("berbunyi,", { id: "pn-t0", isi: "Aku dapat menemukan sudut" }, { id: "pn-t1", isi: "siku-siku di lingkungan sekitarku." }),
      tambah("Centang", teks("c1", 231, 92, "✓", 18, W.hijau)),
      tambah("bisa.", teks("sd", 150, 160, "sudah bisa? centang ya", 10, W.hijau)),
    ),
    k(
      "Menurut panduan guru, refleksi nomor satu menilai kemampuan kalian menemukan sudut siku-siku di sekitar. Ini membantu guru tahu siapa yang masih sulit membedakan sudut siku-siku dan bukan.",
      bersih(0),
      tambah(0, judul("Untuk apa refleksi nomor 1?")),
      tambah("guru", emo("gu", 50, 90, "🧑", 40), emo("lp", 92, 80, "🔍", 24)),
      tambah("membantu", ...kartu("sb", 130, 50, 150, 34, W.hijauMuda, ["sudah bisa membedakan"], 8.8)),
      tambah("masih", ...kartu("ms", 130, 100, 150, 34, W.merahMuda, ["masih sulit membedakan"], 8.8)),
    ),
    k(
      "Rangkuman subbab A. Sudut siku-siku bisa kita temukan di sekitar, misalnya pada pojok bingkai, pojok meja, dan pojok buku.",
      bersih(0),
      tambah(0, judul("Rangkuman Subbab A")),
      tambah("bingkai,", ...bingkaiMini()),
      tambah("meja,", kotak("rm", 112, 56, 70, 50, W.kayu, W.coklat, { rx: 1 }), teks("rmt", 147, 124, "pojok meja", 8.8, W.coklat)),
      tambah("buku.", kotak("rb", 212, 58, 56, 46, W.langit, W.biru, { rx: 1 }), teks("rbt", 240, 124, "pojok buku", 8.8, W.biru)),
    ),
    k(
      "Alatnya sederhana, yaitu kertas yang dilipat mendatar lalu vertikal. Pojok lipatan itu kita cocokkan dengan sudut benda, dan sisi-sisinya harus berimpit.",
      bersih(0),
      tambah(0, judul("Alat: lipatan kertas")),
      tambah("mendatar", poligon("s1", 20, 70, [[0, 0], [64, 3], [60, 46], [2, 42]], W.putih), teks("n1", 52, 130, "lipat mendatar", 8.2, W.biru)),
      tambah("vertikal.", panah("ar", 96, 94, 26, 0, W.hijau, 2.4, { gambar: true }), poligon("s2", 132, 98, KERTAS_LIPAT.map(([a, b]): Titik => [a * 0.75, b * 0.75]), W.putih), teks("n2", 150, 130, "lipat vertikal", 8.2, W.biru)),
      tambah("cocokkan", kotak("bk", 220, 60, 64, 46, W.langit, W.biru, { rx: 0, tebal: 1.8 }), poligon("s3", 220, 106, KERTAS_LIPAT.map(([a, b]): Titik => [a * 0.75, b * 0.75]), W.putih, W.coklat)),
      tambah("berimpit.", teks("n3", 252, 130, "sisi berimpit", 8.2, W.hijau)),
    ),
    k(
      "Sekarang kalian punya patokan sudut siku-siku. Patokan ini akan berguna di subbab berikutnya, saat kita mengenal pengertian sudut.",
      bersih(0),
      tambah(0, judul("Selesai Subbab A")),
      tambah("patokan", ...kartu("pa", 20, 56, 110, 56, W.hijauMuda, ["Subbab A", "sudut siku-siku", "✓"], 9.2)),
      tambah("berguna", panah("pn", 134, 84, 36, 0, W.biru, 3, { gambar: true })),
      tambah("pengertian", ...kartu("pb", 176, 56, 110, 56, W.langit, ["Subbab B", "pengertian sudut"], 9.2)),
    ),
  ],
};

function bingkaiMini(): Obj[] {
  return [kotak("rf-l", 22, 56, 70, 50, W.kayu, W.coklat, { rx: 0, tebal: 2 }), kotak("rf-d", 28, 62, 58, 38, W.langit, W.coklat, { rx: 0, tebal: 1 }), teks("rft", 57, 124, "pojok bingkai", 8.8, W.coklat)];
}
