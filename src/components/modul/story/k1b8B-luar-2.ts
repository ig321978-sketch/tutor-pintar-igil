import type { AdeganStory } from "./logika-story";
import { E, JENIS, W, bintang, dasar, emo, garis, judul, kartu, kolomTitik, orang, panah, batang, teks } from "./k1b8B-gambar";
import { NAMA_METODE, NAMA_METODE_ID, WARNA_METODE, kepala } from "./k1b8B-luar-1";
import { bersih, hapus, k, sorotkan, tambah, ubah } from "./k1b8B-bantu";

/* Video metode global Sub-Bab B "Cerita Kesukaan Anak Kampung": Dot Plot (Diagram Titik), Bar Graph (Diagram Batang), dan ringkasan. */

const idTitik = (id: string, n: number): string[] => Array.from({ length: n }, (_, i) => `${id}${i}`);

/* ------------------------------ 4. Dot Plot: konsep ------------------------------ */
const SUARA_C1 = "Cara kedua, Dot Plot, atau Diagram Titik.";
const SUARA_C2 = "Gambar garis, tulis nama jenis di bawahnya, lalu beri satu titik untuk setiap data.";
const SUARA_C3 = "Titik ditumpuk ke atas dengan jarak yang sama.";
const SUARA_C4 = "Menggambar titik jauh lebih cepat daripada menggambar gambar.";

export const ADEGAN_LUAR_TITIK: AdeganStory = {
  id: "luar-titik",
  judul: "Dot Plot: titik bertumpuk",
  sumber: "Metode global: Dot Plot",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_C1,
      tambah("kedua,", ...kepala(1)),
      tambah("Dot", ...kolomTitik("tx", 1, 150, 120)),
      tambah("Plot,", teks("lb", 150, 146, "1 titik", 11, W.merah)),
      tambah("Titik.", emo("jp", 190, 118, E.mata, 20)),
    ),
    k(
      SUARA_C2,
      hapus(0, "lb", "jp"),
      tambah("garis,", dasar("ds", 40, 250, 150)),
      ubah("garis,", { id: "tx0", y: 143 }),
      tambah("jenis", emo("ne0", 90, 172, JENIS[0].e, 16), emo("ne1", 150, 172, JENIS[1].e, 16), emo("ne2", 210, 172, JENIS[2].e, 16)),
      tambah("satu", ...kartu("kb", 70, 56, 160, 22, W.krem, ["1 titik = 1 data"], 10)),
      tambah("setiap", ...kolomTitik("ta", 3, 90, 150), ...kolomTitik("tc", 2, 210, 150)),
      tambah("data.", ...kolomTitik("tx", 4, 150, 150).slice(1)),
    ),
    k(
      SUARA_C3,
      hapus(0, "kb-k", "kb-t0"),
      tambah("ditumpuk", panah("pu", 272, 146, 0, -50), teks("tu", 272, 160, "ke atas", 8.6, W.merah)),
      tambah("jarak", ...kartu("jk", 14, 56, 120, 22, W.krem, ["jarak sama"], 9.4)),
      sorotkan("sama.", ...idTitik("tx", 4), ...idTitik("ta", 3), ...idTitik("tc", 2)),
    ),
    k(
      SUARA_C4,
      bersih(0),
      tambah(0, ...kepala(1)),
      tambah("titik", ...kartu("ct", 14, 56, 128, 22, W.hijauMuda, ["titik: cepat"], 9.4), ...kolomTitik("td", 1, 78, 126)),
      tambah("menggambar@2", ...kartu("cg", 158, 56, 128, 22, W.merahMuda, ["gambar: lama"], 9.4), bintang("bsk", 222, 112, 16)),
    ),
  ],
};

/* ------------------------------ 5. Dot Plot: terapan pada hari hujan ------------------------------ */
const SUARA_D1 = "Igil membuat diagram titik hari hujan. Senin tiga titik, Selasa satu titik, Rabu lima titik.";
const SUARA_D2 = "Rabu paling banyak hujan, dan semuanya sembilan titik.";
const SUARA_D3 = "Cocok kalau kita ingin mencatat cepat saat anak-anak masih berdatangan.";
const SUARA_D4 = "Kurang menarik untuk dilihat orang lain, karena titik tidak bergambar.";

export const ADEGAN_LUAR_TITIK_TERAPAN: AdeganStory = {
  id: "luar-titik-terapan",
  judul: "Dot Plot: hari hujan",
  sumber: "Metode global: Dot Plot, terapan",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_D1,
      tambah(0, ...kepala(1), dasar("ds", 40, 250, 150)),
      tambah("Igil", ...orang("ig", 22, 100, E.igil, "Igil")),
      tambah("Senin", teks("n0", 90, 166, "Senin", 8, W.biru)),
      tambah("tiga", ...kolomTitik("ts", 3, 90, 150), teks("v0", 90, 112, "3", 11, W.merah)),
      tambah("Selasa", teks("n1", 150, 166, "Selasa", 8, W.biru)),
      tambah("satu", ...kolomTitik("tl", 1, 150, 150), teks("v1", 150, 134, "1", 11, W.merah)),
      tambah("Rabu", teks("n2", 210, 166, "Rabu", 8, W.biru)),
      tambah("lima", ...kolomTitik("tr", 5, 210, 150), teks("v2", 210, 90, "5", 11, W.merah)),
    ),
    k(
      SUARA_D2,
      sorotkan("banyak", ...idTitik("tr", 5)),
      tambah("Rabu", ...kartu("pb", 130, 56, 110, 20, W.merahMuda, ["Rabu paling banyak"], 8.6)),
      tambah("sembilan", ...kartu("js", 40, 174, 150, 20, W.krem, ["semuanya 9 titik"], 9.4)),
    ),
    k(
      SUARA_D3,
      hapus(0, "pb-k", "pb-t0", "js-k", "js-t0"),
      tambah("Cocok", ...kartu("cc", 40, 174, 220, 22, W.hijauMuda, ["cocok: mencatat cepat saat ramai"], 8.4)),
      tambah("anak-anak", emo("an0", 256, 90, E.anak, 20), emo("an1", 278, 112, E.anak, 20), emo("an2", 258, 132, E.anak, 20)),
    ),
    k(
      SUARA_D4,
      hapus(0, "cc-k", "cc-t0", "an0", "an1", "an2"),
      tambah("Kurang", ...kartu("kc", 40, 174, 220, 22, W.merahMuda, ["kurang menarik: titik tidak bergambar"], 8.4)),
      tambah("dilihat", emo("mt", 264, 100, E.mata, 22)),
      tambah("bergambar.", emo("kc2", 264, 132, E.kecewa, 22)),
    ),
  ],
};

/* ------------------------------ 6. Bar Graph: konsep ------------------------------ */
const SUARA_E1 = "Cara ketiga, Bar Graph, atau Diagram Batang.";
const SUARA_E2 = "Setiap jenis punya satu batang. Tinggi batang sama dengan banyak datanya.";
const SUARA_E3 = "Tinggi batang dibaca dari angka di samping.";
const SUARA_E4 = "Batang bisa mewakili data yang banyak dengan rapi.";
const U = 12;

export const ADEGAN_LUAR_BATANG: AdeganStory = {
  id: "luar-batang",
  judul: "Bar Graph: batang bertinggi",
  sumber: "Metode global: Bar Graph",
  latar: "#FDF2F8",
  ketukan: [
    k(
      SUARA_E1,
      tambah("ketiga,", ...kepala(2)),
      tambah("Bar", batang("bg1", 160, 150, 4, U)),
      tambah("Graph,", dasar("ds", 56, 260, 150)),
      tambah("Batang.", teks("lb", 160, 172, "1 batang", 11, W.merah)),
    ),
    k(
      SUARA_E2,
      hapus(0, "lb"),
      tambah("jenis", batang("bg0", 100, 150, 3, U), batang("bg2", 220, 150, 5, U), emo("ne0", 100, 172, JENIS[0].e, 16), emo("ne1", 160, 172, JENIS[1].e, 16), emo("ne2", 220, 172, JENIS[2].e, 16)),
      tambah("satu", ...kartu("kb", 70, 56, 160, 22, W.krem, ["1 jenis = 1 batang"], 10)),
      tambah("sama", teks("v1", 160, 97, "4", 11, W.merah)),
      tambah("datanya.", teks("v0", 100, 109, "3", 11, W.merah), teks("v2", 220, 85, "5", 11, W.merah)),
    ),
    k(
      SUARA_E3,
      hapus(0, "kb-k", "kb-t0"),
      tambah("angka", garis("ay", 56, 150, 0, -78, W.biru, 2), ...[1, 2, 3, 4, 5, 6].map((n) => teks(`ax${n}`, 46, 153 - n * U, String(n), 8, W.biru))),
      tambah("samping.", garis("gb", 58, 102, 84, 0, W.merah, 1.4, { putus: true })),
      sorotkan("samping.", "bg1"),
    ),
    k(
      SUARA_E4,
      bersih(0),
      tambah(0, ...kepala(2), dasar("ds", 56, 260, 150), garis("ay", 56, 150, 0, -100, W.biru, 2)),
      tambah("mewakili", batang("bb0", 100, 150, 7, 8), batang("bb1", 160, 150, 11, 8), batang("bb2", 220, 150, 9, 8)),
      tambah("banyak", teks("w0", 100, 89, "7", 11, W.merah), teks("w1", 160, 57, "11", 11, W.merah), teks("w2", 220, 73, "9", 11, W.merah)),
      tambah("rapi.", emo("ok", 262, 100, E.benar, 20)),
    ),
  ],
};

/* ------------------------------ 7. Bar Graph: terapan pada kotak yang dipinjam ------------------------------ */
const SUARA_F1 = "Pak Pos membuat batang untuk kotak yang dipinjam. Senin delapan, Selasa lima, Rabu sebelas.";
const SUARA_F2 = "Batang Rabu paling tinggi, dan Selasa paling pendek.";
const SUARA_F3 = "Cocok untuk data yang banyak dan angkanya besar.";
const SUARA_F4 = "Kurang cocok kalau kita ingin tahu satu per satu siapa yang memilih, karena batang tidak menunjukkan orangnya.";

export const ADEGAN_LUAR_BATANG_TERAPAN: AdeganStory = {
  id: "luar-batang-terapan",
  judul: "Bar Graph: kotak yang dipinjam",
  sumber: "Metode global: Bar Graph, terapan",
  latar: "#FDF2F8",
  ketukan: [
    k(
      SUARA_F1,
      tambah(0, ...kepala(2), dasar("ds", 70, 270, 150)),
      tambah("Pak", ...orang("pp", 30, 110, E.pria, "Pak Pos")),
      tambah("Senin", teks("n0", 100, 166, "Senin", 8, W.biru)),
      tambah("delapan,", batang("bt0", 100, 150, 8, 8), teks("v0", 100, 81, "8", 11, W.merah)),
      tambah("Selasa", teks("n1", 170, 166, "Selasa", 8, W.biru)),
      tambah("lima,", batang("bt1", 170, 150, 5, 8), teks("v1", 170, 105, "5", 11, W.merah)),
      tambah("Rabu", teks("n2", 240, 166, "Rabu", 8, W.biru)),
      tambah("sebelas.", batang("bt2", 240, 150, 11, 8), teks("v2", 240, 57, "11", 11, W.merah)),
    ),
    k(
      SUARA_F2,
      sorotkan("tinggi,", "bt2"),
      tambah("tinggi,", ...kartu("pt", 126, 50, 86, 18, W.merahMuda, ["paling tinggi"], 8)),
      sorotkan("pendek.", "bt1"),
      tambah("pendek.", ...kartu("pd", 126, 74, 86, 18, W.hijauMuda, ["paling pendek"], 8)),
    ),
    k(
      SUARA_F3,
      hapus(0, "pt-k", "pt-t0", "pd-k", "pd-t0"),
      tambah("Cocok", ...kartu("cc", 40, 174, 220, 22, W.hijauMuda, ["cocok: data banyak, angka besar"], 8.4)),
      tambah("besar.", emo("ok", 280, 185, E.benar, 16)),
    ),
    k(
      SUARA_F4,
      hapus(0, "cc-k", "cc-t0", "ok"),
      tambah("Kurang", ...kartu("kc", 40, 174, 220, 22, W.merahMuda, ["kurang cocok: tidak tahu 1 per 1 siapa"], 8.4)),
      tambah("siapa", emo("an", 22, 76, E.anak, 20), emo("tn", 50, 74, E.tanya, 20)),
      tambah("orangnya.", emo("sl", 280, 185, E.salah, 16)),
    ),
  ],
};

/* ------------------------------ 8. Ringkasan ------------------------------ */
const SUARA_G1 = "Tiga cara sudah kita lihat. Mana yang pas? Itu tergantung datanya.";
const SUARA_G2 = "Datanya sedikit dan ingin disusun, pakai Diagram Balok. Ingin cepat mencatat, pakai Diagram Titik.";
const SUARA_G3 = "Datanya banyak, pakai Diagram Batang. Apa pun caranya, beri judul dan nama pada setiap kolom.";
const SUARA_G4 = "Menurutmu, untuk menunjukkan jumlah anak di seluruh kampung, kamu pilih cara yang mana?";

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Memilih cara yang pas",
  sumber: "Metode global: ringkasan",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_G1,
      tambah(0, judul("3 cara menyajikan data")),
      ...NAMA_METODE_ID.map((m, i) => tambah(["Tiga", "sudah", "kita"][i], ...kartu(`m${i}`, 20, 34 + i * 40, 260, 32, WARNA_METODE[i], [`${i + 1}. ${NAMA_METODE[i]} · ${m}`], 10))),
      tambah("Mana", emo("tn", 150, 168, E.tanya, 26)),
      tambah("tergantung", ...kartu("tg", 70, 176, 160, 20, W.krem, ["tergantung datanya"], 9.4)),
    ),
    k(
      SUARA_G2,
      bersih(0),
      tambah(0, judul("Mana yang pas?")),
      tambah("sedikit", ...kartu("p0", 14, 40, 140, 40, W.krem, ["data sedikit,", "ingin disusun"], 9)),
      tambah("Balok.", panah("pa0", 158, 60, 24, 0), ...kartu("q0", 186, 48, 100, 24, WARNA_METODE[0], ["Diagram Balok"], 9)),
      tambah("cepat", ...kartu("p1", 14, 104, 140, 40, W.krem, ["ingin cepat", "mencatat"], 9)),
      tambah("Titik.", panah("pa1", 158, 124, 24, 0), ...kartu("q1", 186, 112, 100, 24, WARNA_METODE[1], ["Diagram Titik"], 9)),
    ),
    k(
      SUARA_G3,
      bersih(0),
      tambah(0, judul("Data banyak")),
      tambah("Datanya", ...kartu("p2", 14, 36, 140, 40, W.krem, ["data banyak"], 9.4)),
      tambah("Batang.", panah("pa2", 158, 56, 24, 0), ...kartu("q2", 186, 44, 100, 24, WARNA_METODE[2], ["Diagram Batang"], 9)),
      tambah("judul", ...kartu("pj", 40, 110, 220, 26, W.merahMuda, ["beri judul di atas diagram"], 9.4)),
      tambah("nama", ...kartu("pn", 40, 146, 220, 26, W.langit, ["beri nama pada setiap kolom"], 9.4)),
    ),
    k(
      SUARA_G4,
      bersih(0),
      tambah(0, judul("Pilih cara yang mana?")),
      tambah("jumlah", ...[0, 1, 2, 3, 4, 5].map((i) => emo(`an${i}`, 50 + i * 40, 56, E.anak, 24))),
      tambah("kampung,", emo("rm", 150, 92, E.rumah, 24)),
      ...NAMA_METODE_ID.map((m, i) => tambah(["kamu", "pilih", "cara"][i], ...kartu(`c${i}`, 8 + i * 96, 118, 92, 40, WARNA_METODE[i], [m.split(" ")[0], m.split(" ")[1]], 8.8))),
      tambah("mana?", emo("tq", 150, 184, E.tanya, 26)),
    ),
  ],
};
