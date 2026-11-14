import type { AdeganStory, Obj } from "./logika-story";
import { W, daftar, emo, judul, kartu, kotak, kubusDi, teks } from "./k4b4b-gambar";
import { bersih, k, tambah } from "./k4b4b-bantu";

/* ------------------------------ 1. Pembuka metode luar ------------------------------ */
export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Empat metode dari luar untuk mengukur volume",
  sumber: "Metode luar: pembuka; bangun dan angka Buku Siswa hlm. 122–138",
  latar: "#FFF7ED",
  ketukan: [
    k(
      "Bagaimana belajar mengukur volume dengan benar? Guru di berbagai negara punya cara berbeda. Dalam video ini kita lihat empat metode dari luar, memakai bangun dan angka dari buku.",
      bersih(0),
      tambah(0, judul("Empat metode dari luar")),
      tambah("berbagai", emo("gl", 150, 100, "🌍", 56)),
      tambah("empat", ...kartu("pa", 30, 128, 240, 34, W.krem, ["mengukur volume dengan benar"], 9.4)),
    ),
    k(
      "Empat metode itu: Volume as Filling, Layer Model, Displacement Idea, dan Benchmark Referents.",
      ...daftar("pm", "Empat metode", [
        { at: "Filling,", t: "1. Volume as Filling", w: W.hijauMuda, u: 9.6 },
        { at: "Layer", t: "2. Layer Model", w: W.langit, u: 9.6 },
        { at: "Displacement", t: "3. Displacement Idea", w: W.krem, u: 9.6 },
        { at: "Benchmark", t: "4. Benchmark Referents", w: W.pink, u: 9.6 },
      ]),
    ),
    k(
      "Masing-masing menjawab satu pertanyaan: berapa satuan yang mengisi benda, berapa lapisan kubusnya, berapa air yang terdesak, dan benda sehari-hari mana yang bisa jadi patokan?",
      ...daftar("pq", "Empat pertanyaan", [
        { at: "satuan", t: "berapa satuan yang mengisi benda?", w: W.hijauMuda, u: 9 },
        { at: "lapisan", t: "berapa lapisan kubusnya?", w: W.langit, u: 9.4 },
        { at: "terdesak,", t: "berapa air yang terdesak?", w: W.krem, u: 9.4 },
        { at: "patokan?", t: "benda mana yang jadi patokan?", w: W.pink, u: 9.4 },
      ]),
    ),
  ],
};

/** Wadah berisi satuan-satuan kecil (kotak) untuk gambar metode mengisi: kolom x baris. Id `${id}-w` dan `${id}-s{n}`. */
function wadahIsi(id: string, x: number, y: number, kolom: number, baris: number, sisi: number, warna: string): Obj[] {
  const out: Obj[] = [kotak(`${id}-w`, x, y, kolom * sisi + 8, baris * sisi + 8, W.putih, W.biru, { rx: 4 })];
  for (let r = 0; r < baris; r += 1) for (let c = 0; c < kolom; c += 1) out.push(kotak(`${id}-s${r * kolom + c}`, x + 4 + c * sisi, y + 4 + r * sisi, sisi, sisi, warna, W.biru, { rx: 1, tebal: 0.8 }));
  return out;
}

/* ------------------------------ 2. Volume as Filling: konsep ------------------------------ */
export const ADEGAN_LUAR_VF: AdeganStory = {
  id: "luar-vf",
  judul: "Volume as Filling (Volume sebagai Mengisi)",
  sumber: "Metode luar: Volume as Filling (Volume sebagai Mengisi)",
  latar: "#F0FDF4",
  ketukan: [
    k(
      "Metode pertama, Volume as Filling atau Volume sebagai Mengisi. Volume adalah banyak satuan yang mengisi ruang sampai penuh, tanpa celah.",
      bersih(0),
      tambah(0, judul("Volume as Filling")),
      tambah("Volume@2", ...wadahIsi("vf", 24, 44, 4, 4, 20, "#BBF7D0")),
      tambah("Volume@2", teks("vfn", 74, 150, "wadah penuh satuan", 8.4, W.coklat)),
      tambah("tanpa", ...kartu("vf1", 130, 56, 158, 34, W.hijauMuda, ["Volume sebagai Mengisi"], 8.8)),
      tambah("celah", ...kartu("vf2", 130, 100, 158, 34, W.krem, ["tanpa celah"], 9.6)),
    ),
    k(
      "Satuannya harus sama ukuran dan sama jenis. Hitung berapa satuan yang dibutuhkan sampai wadah penuh. Bilangan itulah volumenya.",
      ...daftar("vg", "Aturan mengisi", [
        { at: "sama", t: "satuan sama ukuran dan jenis", w: W.hijauMuda, u: 9 },
        { at: "Hitung", t: "hitung satuan sampai penuh", w: W.krem, u: 9.4 },
        { at: "Bilangan", t: "bilangan itu = volume", w: W.pink, u: 9.6 },
      ]),
    ),
    k(
      "Satuan berbeda memberi bilangan berbeda. Wadah yang sama bisa empat satuan besar, atau sepuluh satuan kecil, tetapi volumenya tetap sama.",
      bersih(0),
      tambah(0, judul("Satuan beda, bilangan beda")),
      tambah("empat", ...kartu("vh1", 12, 44, 276, 36, W.hijauMuda, ["4 satuan besar"], 11)),
      tambah("sepuluh", ...kartu("vh2", 12, 92, 276, 36, W.langit, ["10 satuan kecil"], 11)),
      tambah("tetap", ...kartu("vh3", 12, 140, 276, 36, W.krem, ["wadah sama, volume sama"], 10.4)),
    ),
  ],
};

/* ------------------------------ 3. Volume as Filling: penerapan ------------------------------ */
export const ADEGAN_LUAR_VF_TERAPAN: AdeganStory = {
  id: "luar-vf-terapan",
  judul: "Volume as Filling diterapkan pada angka buku",
  sumber: "Metode luar: Volume as Filling pada botol sabun dan kubus, Buku Siswa hlm. 123–136",
  latar: "#F0FDF4",
  ketukan: [
    k(
      "Terapkan pada botol sabun. Botol A diisi botol B sampai penuh, empat kali. Jadi volume botol A adalah empat satuan botol B.",
      bersih(0),
      tambah(0, judul("Botol A diisi botol B")),
      tambah("sabun", emo("ta", 46, 108, "🧴", 56)),
      tambah("empat", ...[0, 1, 2, 3].map((i) => emo(`tb${i}`, 118 + i * 40, 98, "🧴", 30))),
      tambah("satuan", ...kartu("tk", 40, 138, 220, 32, W.krem, ["A = 4 satuan botol B"], 10.4)),
    ),
    k(
      "Diisi botol C: sepuluh kali. Jadi volume botol A adalah sepuluh satuan botol C. Satuannya berbeda, maka bilangannya berbeda.",
      bersih(0),
      tambah(0, judul("Botol A diisi botol C")),
      tambah("Diisi", emo("tc", 46, 108, "🧴", 56)),
      tambah("sepuluh", ...[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => emo(`td${i}`, 112 + (i % 5) * 36, 78 + Math.floor(i / 5) * 36, "🧴", 22))),
      tambah("Jadi", ...kartu("te", 40, 138, 220, 32, W.krem, ["A = 10 satuan botol C"], 10.4)),
    ),
    k(
      "Hand sanitizer: satu botol besar mengisi delapan botol kecil, jadi volumenya delapan satuan. Kubus: bangun dua tersusun dari sembilan kubus satuan, jadi sembilan sentimeter kubik.",
      bersih(0),
      tambah(0, judul("Satuan botol dan kubus")),
      tambah("Hand", ...kartu("tf", 8, 40, 136, 30, W.krem, ["1 botol = 8 satuan"], 9.4)),
      tambah("Hand", emo("tg", 76, 112, "🧴", 40)),
      tambah("Kubus:", ...kubusDi("th", "ii", 220, 128, 12)),
      tambah("sembilan@2", ...kartu("ti", 156, 40, 136, 30, W.hijauMuda, ["9 kubus = 9 cm³"], 9.4)),
    ),
    k(
      "Dengan kubus satuan, satuannya baku. Bangun A sembilan kubus, bangun D delapan belas kubus, jadi volume D dua kali volume A.",
      bersih(0),
      tambah(0, judul("Kubus satuan: satuan baku")),
      tambah("Bangun", ...kubusDi("tj", "A", 76, 108, 16), teks("tjt", 76, 124, "A: 9 cm³", 10, W.biru)),
      tambah("delapan", ...kubusDi("tl", "D", 214, 108, 16), teks("tlt", 214, 124, "D: 18 cm³", 10, W.biru)),
      tambah("dua@1", ...kartu("tm", 50, 144, 200, 32, W.pink, ["18 = 2 × 9"], 11)),
    ),
  ],
};

/* ------------------------------ 4. Layer Model: konsep ------------------------------ */
export const ADEGAN_LUAR_LM: AdeganStory = {
  id: "luar-lm",
  judul: "Layer Model (Model Lapisan)",
  sumber: "Metode luar: Layer Model (Model Lapisan)",
  latar: "#EFF6FF",
  ketukan: [
    k(
      "Metode kedua, Layer Model atau Model Lapisan. Bangun kubus dibagi menjadi lapisan datar. Hitung kubus pada satu lapisan, lalu jumlahkan semua lapisan.",
      bersih(0),
      tambah(0, judul("Layer Model")),
      tambah("Bangun", ...kubusDi("ma", "D", 76, 118, 18, true)),
      tambah("datar.", ...kartu("mb", 140, 44, 148, 30, W.langit, ["Model Lapisan"], 9.6)),
      tambah("satu", ...kartu("mc", 140, 84, 148, 30, W.krem, ["hitung satu lapisan"], 9)),
      tambah("jumlahkan", ...kartu("md", 140, 124, 148, 30, W.hijauMuda, ["jumlahkan lapisan"], 9)),
    ),
    k(
      "Jika lapisannya sama, kalikan: kubus tiap lapisan kali banyak lapisan. Alas panjang kali lebar memberi kubus tiap lapisan, tinggi memberi banyak lapisan.",
      ...daftar("me", "Lapisan sama: kalikan", [
        { at: "kubus", t: "kubus tiap lapisan × banyak lapisan", w: W.hijauMuda, u: 8.6 },
        { at: "Alas", t: "alas: panjang × lebar", w: W.krem, u: 9.6 },
        { at: "tinggi", t: "tinggi: banyak lapisan", w: W.langit, u: 9.6 },
      ]),
    ),
    k(
      "Jika lapisannya tidak sama, jumlahkan tiap lapisan. Boleh dihitung dari bawah ke atas, atau dari atas ke bawah, hasilnya sama.",
      ...daftar("mf", "Lapisan tak sama: jumlahkan", [
        { at: "jumlahkan", t: "lapisan 1 + lapisan 2 + lapisan 3", w: W.krem, u: 9 },
        { at: "bawah", t: "dari bawah ke atas", w: W.hijauMuda, u: 9.6 },
        { at: "atas@2", t: "atau dari atas ke bawah: sama", w: W.langit, u: 9.4 },
      ]),
    ),
  ],
};

/* ------------------------------ 5. Layer Model: penerapan ------------------------------ */
export const ADEGAN_LUAR_LM_TERAPAN: AdeganStory = {
  id: "luar-lm-terapan",
  judul: "Layer Model diterapkan pada bangun buku",
  sumber: "Metode luar: Layer Model pada bangun Buku Siswa hlm. 135–137",
  latar: "#EFF6FF",
  ketukan: [
    k(
      "Bangun B: tiap lapisan empat kubus, ada dua lapisan, jadi empat kali dua sama dengan delapan sentimeter kubik.",
      bersih(0),
      tambah(0, judul("Bangun B: dua lapisan")),
      tambah("Bangun", ...kubusDi("na", "B", 76, 112, 28, true)),
      tambah("tiap", ...kartu("nb", 150, 40, 138, 30, W.krem, ["tiap lapisan: 4 kubus"], 9)),
      tambah("dua", ...kartu("nc", 150, 80, 138, 30, W.langit, ["2 lapisan"], 9.6)),
      tambah("jadi", ...kartu("nd", 150, 120, 138, 34, W.hijauMuda, ["4 × 2 = 8 cm³"], 11)),
    ),
    k(
      "Bangun C: tiap lapisan enam kubus, dua lapisan, jadi dua belas. Bangun D: sembilan kubus tiap lapisan, dua lapisan, jadi delapan belas sentimeter kubik.",
      bersih(0),
      tambah(0, judul("Bangun C dan D")),
      tambah("Bangun", ...kubusDi("ne", "C", 70, 100, 18, true)),
      tambah("sembilan", ...kubusDi("nf", "D", 220, 100, 18, true)),
      tambah("jadi", ...kartu("ng", 8, 124, 136, 34, W.krem, ["C: 6 × 2 = 12"], 10.4)),
      tambah("jadi@2", ...kartu("nh", 156, 124, 136, 34, W.hijauMuda, ["D: 9 × 2 = 18"], 10.4)),
    ),
    k(
      "Bangun satu tidak seragam: lapisan bawah dua belas kubus, lalu enam, lalu enam. Jumlahnya dua puluh empat sentimeter kubik.",
      bersih(0),
      tambah(0, judul("Bangun (i): lapisan beda")),
      tambah("Bangun", ...kubusDi("ni", "i", 150, 104, 12, true)),
      tambah("bawah", ...kartu("nj", 30, 124, 240, 34, W.krem, ["12 + 6 + 6 = 24 cm³"], 11)),
    ),
    k(
      "Bangun e: alasnya empat kali tiga sama dengan dua belas kubus, ditambah lapisan atas dua kubus, jadi empat belas sentimeter kubik.",
      bersih(0),
      tambah(0, judul("Bangun e: alas + atas")),
      tambah("Bangun", ...kubusDi("nk", "e", 76, 114, 16, true)),
      tambah("alasnya", ...kartu("nl", 150, 44, 138, 30, W.krem, ["alas: 4 × 3 = 12"], 9.4)),
      tambah("lapisan", ...kartu("nm", 150, 84, 138, 30, W.langit, ["lapisan atas: 2"], 9.4)),
      tambah("jadi", ...kartu("nn", 150, 124, 138, 34, W.hijauMuda, ["12 + 2 = 14 cm³"], 10.4)),
    ),
  ],
};
