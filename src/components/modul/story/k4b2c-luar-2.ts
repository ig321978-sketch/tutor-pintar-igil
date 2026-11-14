import type { AdeganStory } from "./logika-story";
import { W, barisTabel, dinding, emo, garis, jembatan, judul, kartu, kotak, panah, pecahan, teks } from "./k4b2c-gambar";
import { bersih, hapus, idx, k, tambah } from "./k4b2c-bantu";
import { kepala, pasangan } from "./k4b2c-luar-1";

/* ------------------------------ 6. Simplify: konsep ------------------------------ */
const SUARA_P1 = "Metode ketiga, Simplify, atau Sederhanakan. Ini kebalikan dari mengalikan: bagi pembilang dan penyebut dengan bilangan yang sama, sampai tidak bisa dibagi lagi.";
const SUARA_P2 = "Faktor persekutuan terbesar, disingkat FPB, adalah bilangan terbesar yang membagi habis pembilang dan penyebut. Membagi dengan FPB menyederhanakan pecahan dalam satu langkah.";
const SUARA_P3 = "Cara mencari FPB: tulis faktor pembilang dan faktor penyebut, lalu pilih yang sama dan terbesar. Untuk dua dan enam, faktor dua adalah satu dan dua. Faktor enam adalah satu, dua, tiga, dan enam. Jadi FPB-nya dua.";
const SUARA_P4 = "Pecahan sudah sederhana bila pembilang dan penyebutnya tidak punya faktor yang sama selain satu. Satu per tiga sudah sederhana, sehingga tidak bisa dibagi lagi.";

export const ADEGAN_LUAR_SEDERHANA: AdeganStory = {
  id: "luar-sederhana",
  judul: "Simplify: bagi dengan FPB",
  sumber: "Metode luar: Simplify",
  latar: "#FEFCE8",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Metode 3 dari 4")),
      tambah("ketiga,", kepala(2)),
      tambah("kebalikan", ...pecahan("pa1", 60, 96, 6, 8, 20)),
      tambah("bagi", panah("pa2", 92, 88, 116, 0, W.hijau, 2), teks("pa3", 150, 80, "÷2", 10, W.hijau), teks("pa6", 150, 122, "÷2", 10, W.hijau), panah("pa7", 92, 108, 116, 0, W.hijau, 2)),
      tambah("sama,", ...pecahan("pa4", 240, 96, 3, 4, 20)),
      tambah("lagi.", ...kartu("pa5", 40, 140, 220, 34, W.emas, ["tidak bisa dibagi lagi: sederhana"], 9.4)),
    ),
    k(
      SUARA_P2,
      bersih(0),
      tambah(0, judul("FPB: faktor persekutuan terbesar")),
      tambah(0, kepala(2)),
      tambah("disingkat", ...kartu("pb1", 30, 56, 240, 28, W.langit, ["FPB = faktor persekutuan terbesar"], 9.4)),
      tambah("membagi@2", ...pecahan("pb2", 60, 140, 12, 18, 18), teks("pb3", 150, 102, "FPB dari 12 dan 18 = 6", 9.4, W.merah)),
      tambah("langkah.", ...jembatan("pbj", 60, 240, 140, "÷6", 18, W.hijau, 16), ...pecahan("pb4", 240, 140, 2, 3, 18)),
    ),
    k(
      SUARA_P3,
      bersih(0),
      tambah(0, judul("Mencari FPB dua dan enam")),
      tambah(0, kepala(2)),
      tambah(idx(SUARA_P3, "dua", 2), ...kartu("pc1", 14, 62, 272, 32, W.hijauMuda, ["faktor 2: 1, 2"], 9.6)),
      tambah(idx(SUARA_P3, "enam", 2), ...kartu("pc2", 14, 102, 272, 32, W.langit, ["faktor 6: 1, 2, 3, 6"], 9.6)),
      tambah("Jadi", ...kartu("pc3", 40, 146, 220, 34, W.emas, ["yang sama: 1 dan 2", "terbesar: FPB = 2"], 9.4)),
    ),
    k(
      SUARA_P4,
      bersih(0),
      tambah(0, judul("Pecahan yang sudah sederhana")),
      tambah(0, kepala(2)),
      tambah("tiga.", ...pecahan("pd1", 150, 90, 1, 3, 22)),
      tambah("faktor", ...kartu("pd2", 14, 120, 130, 32, W.hijauMuda, ["faktor 1: 1"], 9.4), ...kartu("pd3", 156, 120, 130, 32, W.langit, ["faktor 3: 1, 3"], 9.4)),
      tambah(idx(SUARA_P4, "sederhana", 2), teks("pd4", 150, 176, "FPB = 1: sudah sederhana", 10, W.hijau)),
    ),
  ],
};

/* ------------------------------ 7. Simplify: penerapan pada pecahan senilai ------------------------------ */
const SUARA_Q1 = "Pertama: dua per empat. FPB dua dan empat adalah dua. Dibagi dua, hasilnya satu per dua.";
const SUARA_Q2 = "Kedua: dua per enam. FPB dua dan enam adalah dua. Dibagi dua, hasilnya satu per tiga.";
const SUARA_Q3 = "Ketiga: tiga per sembilan. FPB tiga dan sembilan adalah tiga. Dibagi tiga, hasilnya satu per tiga.";
const SUARA_Q4 = "Keempat, pada kertas lipat: empat per enam belas. FPB empat dan enam belas adalah empat. Dibagi empat, hasilnya satu per empat.";

/** Satu ketukan penerapan Simplify: kalimat berpola "... FPB ... adalah ... Dibagi ..., hasilnya ...". */
function ketukanBagi(suara: string, id: string, p: number, q: number, n: number, kataQ: string) {
  const d = pasangan(id, p, q, p / n, q / n, `÷${n}`, [`${p} ÷ ${n} = ${p / n}`, `${q} ÷ ${n} = ${q / n}`], 84, W.merah);
  return k(
    suara,
    bersih(0),
    tambah(0, judul(`${p}/${q} dibagi ${n}`), ...d.kiri),
    tambah("FPB", ...kartu(`${id}f`, 100, 26, 100, 20, W.emas, [`FPB = ${n}`], 8.6)),
    tambah("Dibagi", ...d.jembatan),
    tambah(kataQ, d.hit1),
    tambah("hasilnya", d.hit2, ...d.kanan, ...d.batangKiri, ...d.batangKanan, d.sama),
  );
}
export const ADEGAN_LUAR_SEDERHANA_TERAPAN: AdeganStory = {
  id: "luar-sederhana-terapan",
  judul: "Simplify pada pecahan senilai",
  sumber: "Metode luar: Simplify",
  latar: "#FFFBEB",
  ketukan: [
    ketukanBagi(SUARA_Q1, "qa", 2, 4, 2, "adalah"),
    ketukanBagi(SUARA_Q2, "qb", 2, 6, 2, "adalah"),
    ketukanBagi(SUARA_Q3, "qc", 3, 9, 3, "adalah"),
    ketukanBagi(SUARA_Q4, "qd", 4, 16, 4, "adalah"),
  ],
};

/* ------------------------------ 8. Fraction Wall: konsep ------------------------------ */
const X_DINDING = 60;
const SUARA_W1 = "Metode keempat, Fraction Wall, atau Dinding Pecahan. Susun batang pecahan berlapis seperti dinding bata: satu lapis utuh, lalu lapis yang dibagi dua, tiga, empat, enam, dan sembilan.";
const SUARA_W2 = "Semua lapis sama panjang, jadi potongan dari lapis yang berbeda bisa dibandingkan langsung. Potongan yang ujungnya sejajar menunjukkan pecahan senilai.";
const SUARA_W3 = "Cara membacanya: pilih satu potong, tarik garis lurus ke bawah dari ujungnya, lalu cari potongan di lapis lain yang ujungnya tepat di garis itu. Potongan itu senilai.";
const SUARA_W4 = "Dinding menolong bila lapis yang dibutuhkan ada, jadi cocok untuk penyebut kecil. Untuk pecahan lain kita kembali ke mengalikan atau membagi.";

/** Sorotan sel dinding: kotak berwarna emas transparan di atas sel nomor `sel` lapis `n`. Id `${id}`. */
const sorotSel = (id: string, x: number, y: number, n: number, sel: number, h: number) => kotak(id, x + (sel * 216) / n, y, 216 / n, h, W.merah, W.merah, { rx: 0, op: 0.45, tebal: 2 });

export const ADEGAN_LUAR_DINDING: AdeganStory = {
  id: "luar-dinding",
  judul: "Fraction Wall: dinding pecahan",
  sumber: "Metode luar: Fraction Wall",
  latar: "#FDF2F8",
  ketukan: [
    k(
      SUARA_W1,
      tambah(0, judul("Fraction Wall · Dinding Pecahan")),
      tambah("utuh,", ...dinding("dd", X_DINDING, 34, [1], 20, 24)),
      ...[2, 3, 4, 6, 9].map((n, i) => tambah(idx(SUARA_W1, ["dua,", "tiga,", "empat,", "enam,", "sembilan."][i].replace(/[^a-z]/g, "")), ...dinding("dd", X_DINDING, 34 + (i + 1) * 24, [n], 20, 24))),
    ),
    k(
      SUARA_W2,
      tambah("sejajar", garis("dg", X_DINDING + 108, 28, 0, 150, W.merah, 1.6, { putus: true })),
      tambah("senilai.", sorotSel("hs1", X_DINDING, 58, 2, 0, 20), sorotSel("hs2", X_DINDING, 106, 4, 1, 20)),
    ),
    k(
      SUARA_W3,
      hapus(0, "dg", "hs1", "hs2"),
      tambah("tarik", garis("dh", X_DINDING + 72, 28, 0, 150, W.merah, 1.6, { putus: true })),
      tambah("potong,", sorotSel("ht1", X_DINDING, 82, 3, 0, 20)),
      tambah("tepat", sorotSel("ht2", X_DINDING, 130, 6, 1, 20)),
      tambah("senilai.", teks("ht3", 150, 192, "1/3 senilai 2/6", 10, W.merah)),
    ),
    k(
      SUARA_W4,
      bersih(0),
      tambah(0, judul("Kapan dinding dipakai?")),
      tambah("menolong", emo("hw", 150, 76, "🧱", 34)),
      tambah("kecil.", ...kartu("hk1", 14, 96, 272, 30, W.hijauMuda, ["penyebut kecil: dinding cukup"], 9.6)),
      tambah("kembali", ...kartu("hk2", 14, 136, 272, 30, W.langit, ["pecahan lain: kali atau bagi"], 9.6)),
    ),
  ],
};

/* ------------------------------ 9. Fraction Wall: penerapan pada pecahan senilai ------------------------------ */
const LAPIS_TERAPAN = [2, 3, 4, 6, 9] as const;
const X_TERAPAN = 48;
const Y_TERAPAN = 34;
const SUARA_V1 = "Pertama, pada dinding: ujung satu potongan lapis dua sejajar dengan ujung dua potongan lapis empat. Jadi dua per empat senilai dengan satu per dua.";
const SUARA_V2 = "Kedua, ujung satu potongan lapis tiga sejajar dengan ujung dua potongan lapis enam. Jadi dua per enam senilai dengan satu per tiga.";
const SUARA_V3 = "Ketiga, ujung tiga potongan lapis sembilan sejajar dengan ujung satu potongan lapis tiga. Jadi tiga per sembilan senilai dengan satu per tiga.";
const SUARA_V4 = "Garis di tengah dinding melewati lapis dua, empat, dan enam. Di sana ada satu per dua, dua per empat, dan tiga per enam, semuanya senilai. Lapis sembilan tidak sejajar di titik itu.";

/** Sorotan sel pada dinding terapan: lapis ke-`r` (penyebut n), sel nomor `sel` sampai `sel + banyak - 1`. */
const sorotLapis = (id: string, n: number, sel: number, banyak = 1) => {
  const r = LAPIS_TERAPAN.indexOf(n as (typeof LAPIS_TERAPAN)[number]);
  return kotak(id, X_TERAPAN + (sel * 216) / n, Y_TERAPAN + r * 26, (banyak * 216) / n, 22, W.merah, W.merah, { rx: 0, op: 0.45, tebal: 2 });
};

export const ADEGAN_LUAR_DINDING_TERAPAN: AdeganStory = {
  id: "luar-dinding-terapan",
  judul: "Fraction Wall pada pecahan senilai",
  sumber: "Metode luar: Fraction Wall",
  latar: "#FCE7F3",
  ketukan: [
    k(
      SUARA_V1,
      tambah(0, judul("Dinding: lapis 2, 3, 4, 6, 9")),
      tambah("Pertama,", ...dinding("dw", X_TERAPAN, Y_TERAPAN, LAPIS_TERAPAN, 22, 26)),
      tambah("sejajar", garis("vg", X_TERAPAN + 108, 28, 0, 142, W.merah, 1.6, { putus: true })),
      tambah("lapis", sorotLapis("v1", 2, 0)),
      tambah("empat.", sorotLapis("v2", 4, 0, 2)),
      tambah("Jadi", ...kartu("vk", 40, 176, 220, 24, W.emas, ["2/4 = 1/2"], 10)),
    ),
    k(
      SUARA_V2,
      hapus(0, "vg", "v1", "v2", "vk-k", "vk-t0"),
      tambah("Kedua,", garis("vh", X_TERAPAN + 72, 28, 0, 142, W.merah, 1.6, { putus: true })),
      tambah("lapis", sorotLapis("v3", 3, 0)),
      tambah("enam.", sorotLapis("v4", 6, 0, 2)),
      tambah("Jadi", ...kartu("vm", 40, 176, 220, 24, W.emas, ["2/6 = 1/3"], 10)),
    ),
    k(
      SUARA_V3,
      hapus(0, "vh", "v3", "v4", "vm-k", "vm-t0"),
      tambah("Ketiga,", garis("vi", X_TERAPAN + 72, 28, 0, 142, W.merah, 1.6, { putus: true })),
      tambah("sembilan", sorotLapis("v5", 9, 0, 3)),
      tambah(idx(SUARA_V3, "tiga", 3), sorotLapis("v6", 3, 0)),
      tambah("Jadi", ...kartu("vn", 40, 176, 220, 24, W.emas, ["3/9 = 1/3"], 10)),
    ),
    k(
      SUARA_V4,
      hapus(0, "vi", "v5", "v6", "vn-k", "vn-t0"),
      tambah("tengah", garis("vj", X_TERAPAN + 108, 28, 0, 134, W.merah, 1.6, { putus: true })),
      tambah("dua,", sorotLapis("v7", 2, 0)),
      tambah("empat,", sorotLapis("v8", 4, 0, 2)),
      tambah("enam.", sorotLapis("v9", 6, 0, 3)),
      tambah("semuanya", ...kartu("vo", 40, 176, 220, 24, W.emas, ["1/2 = 2/4 = 3/6"], 10)),
      tambah("sembilan", teks("vz", 150, 171, "lapis 9: ujung tidak di garis", 8.8, W.coklat)),
    ),
  ],
};

/* ------------------------------ 10. Ringkasan ------------------------------ */
const SUARA_R1 = "Ringkasan empat metode. Pecahan Senilai menyamakan daerah bagian. Kali dengan Bentuk Satu mengalikan atas dan bawah. Sederhanakan membagi atas dan bawah. Dinding Pecahan menyejajarkan ujung potongan.";
const SUARA_R2 = "Pasangan senilai yang kita pakai: dua per empat dengan satu per dua, dua per enam dengan satu per tiga, tiga per sembilan dengan satu per tiga, dan satu per empat dengan empat per enam belas.";
const SUARA_R3 = "Kapan memakai yang mana? Mengalikan bila ingin pecahan yang lebih rinci, membagi bila ingin pecahan yang lebih sederhana, dan dinding atau gambar bila ingin melihat langsung.";
const SUARA_R4 = "Apa pun caranya, aturannya satu: pembilang dan penyebut diperlakukan dengan bilangan yang sama, sehingga nilai pecahan tetap.";
const WARNA_R = [W.hijauMuda, W.langit, W.krem, W.pink];

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan empat metode dari luar",
  sumber: "Ringkasan metode luar",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_R1,
      tambah(0, judul("Ringkasan empat metode")),
      tambah("Senilai", ...kartu("r1", 8, 30, 138, 66, WARNA_R[0], ["Pecahan Senilai", "samakan", "daerah bagian"], 8.8)),
      tambah("Kali", ...kartu("r2", 154, 30, 138, 66, WARNA_R[1], ["Kali Bentuk Satu", "kali atas", "dan bawah"], 8.8)),
      tambah("Sederhanakan", ...kartu("r3", 8, 104, 138, 66, WARNA_R[2], ["Sederhanakan", "bagi atas", "dan bawah"], 8.8)),
      tambah("Dinding", ...kartu("r4", 154, 104, 138, 66, WARNA_R[3], ["Dinding Pecahan", "sejajarkan", "ujung potongan"], 8.8)),
    ),
    k(
      SUARA_R2,
      bersih(0),
      tambah(0, judul("Pasangan senilai yang dipakai")),
      tambah("empat", ...barisTabel("rt0", 30, 34, [90, 150], ["contoh", "pasangan senilai"], 24, 9, true)),
      tambah(idx(SUARA_R2, "dua", 2), ...barisTabel("rt1", 30, 58, [90, 150], ["Pasangan 1", "2/4 = 1/2"], 24, 9)),
      tambah(idx(SUARA_R2, "enam", 1), ...barisTabel("rt2", 30, 82, [90, 150], ["Pasangan 2", "2/6 = 1/3"], 24, 9)),
      tambah(idx(SUARA_R2, "sembilan", 1), ...barisTabel("rt3", 30, 106, [90, 150], ["Pasangan 3", "3/9 = 1/3"], 24, 9)),
      tambah("belas.", ...barisTabel("rt4", 30, 130, [90, 150], ["kertas lipat", "1/4 = 4/16"], 24, 9)),
    ),
    k(
      SUARA_R3,
      bersih(0),
      tambah(0, judul("Kapan memakai yang mana?")),
      tambah("Mengalikan", ...kartu("s1", 14, 32, 272, 30, W.langit, ["kali: ingin pecahan lebih rinci"], 9.4)),
      tambah("membagi", ...kartu("s2", 14, 70, 272, 30, W.krem, ["bagi: ingin pecahan lebih sederhana"], 9.4)),
      tambah("dinding", ...kartu("s3", 14, 108, 272, 30, W.pink, ["dinding atau gambar: lihat langsung"], 9.4)),
      tambah("langsung.", emo("s4", 150, 176, "👀", 28)),
    ),
    k(
      SUARA_R4,
      bersih(0),
      tambah(0, judul("Satu aturan untuk semua cara")),
      tambah("pembilang", ...pecahan("u1", 80, 80, "atas", "bawah", 14), teks("u2", 150, 84, "×  atau  ÷", 14, W.merah)),
      tambah("bilangan", ...kartu("u3", 40, 110, 220, 32, W.emas, ["bilangan yang sama"], 10.4)),
      tambah("tetap.", teks("u4", 150, 170, "nilai pecahan tetap", 11, W.hijau)),
    ),
  ],
};
