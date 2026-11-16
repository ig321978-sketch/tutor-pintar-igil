import type { AdeganStory } from "./logika-story";
import { W, anak, bagan, bagianEq, emo, judul, kartu } from "./k3b2A-gambar";
import { bersih, hapus, idKartu, idx, k, sorotkan, tambah, ubah } from "./k3b2A-bantu";

/* ------------------------------ 5. Halim dan Kira ------------------------------ */
const SUARA_H1 = "Halim dan Kira mengumpulkan bintang di dunia permainan.";
const SUARA_H2 = "Bintang Halim ada tiga puluh. Bintang Kira belum diketahui.";
const SUARA_H3 = "Kalau digabung, jumlah semuanya lima puluh bintang.";
const SUARA_H4 = "Kita tulis kalimatnya: tiga puluh tambah titik-titik sama dengan lima puluh.";

export const ADEGAN_HALIM_KIRA: AdeganStory = {
  id: "halim-kira",
  judul: "Bintang Halim dan Kira",
  sumber: "Materi: bintang Halim dan Kira",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_H1,
      tambah(0, judul("Halim dan Kira")),
      tambah(idx(SUARA_H1, "Halim"), ...anak("halim", 56, 70)),
      tambah(idx(SUARA_H1, "Kira"), ...anak("kira", 244, 70)),
      tambah(idx(SUARA_H1, "permainan."), emo("gm", 150, 90, "\u{1F3AE}", 40)),
    ),
    k(
      SUARA_H2,
      tambah(idx(SUARA_H2, "tiga"), ...kartu("kh", 14, 128, 84, 26, W.hijauMuda, ["30 bintang"], 10)),
      tambah(idx(SUARA_H2, "belum"), ...kartu("kk", 202, 128, 86, 26, W.merahMuda, ["belum diketahui"], 8.8)),
    ),
    k(
      SUARA_H3,
      tambah(idx(SUARA_H3, "digabung,"), emo("pl", 150, 160, "➕", 28)),
      tambah(idx(SUARA_H3, "lima"), ...kartu("jg", 90, 168, 120, 28, W.emas, ["jumlah 50"], 12)),
    ),
    k(
      SUARA_H4,
      bersih(0),
      tambah(0, judul("Kalimat Matematikanya")),
      tambah(idx(SUARA_H4, "tiga"), bagianEq("eq", 0, "30", 80)),
      tambah(idx(SUARA_H4, "tambah"), bagianEq("eq", 1, "+", 80, 24, W.emas)),
      tambah(idx(SUARA_H4, "titik-titik"), bagianEq("eq", 2, "…", 80, 24, W.merahMuda)),
      tambah(idx(SUARA_H4, "sama"), bagianEq("eq", 3, "=", 80, 24, W.emas)),
      tambah(idx(SUARA_H4, "lima"), bagianEq("eq", 4, "50", 80)),
      tambah(idx(SUARA_H4, "lima"), emo("st", 150, 158, "⭐", 44)),
    ),
  ],
};

/* ------------------------------ 6. Bagan jumlah ------------------------------ */
const SUARA_G1 = "Kita gambar bagan. Batang atas untuk jumlah semuanya.";
const SUARA_G2 = "Dua batang di bawahnya untuk dua bagian. Satu bagian milik Halim.";
const SUARA_G3 = "Bagian Kira belum diketahui, jadi diberi tanda tanya.";
const SUARA_G4 = "Jumlahnya lima puluh dan satu bagiannya tiga puluh. Berapa bagian Kira?";
const BG = bagan(36, "50", "30", "?", 0.6);
const bg = (p: string) => BG.filter((o) => o.id.startsWith(p));

export const ADEGAN_BAGAN: AdeganStory = {
  id: "bagan-jumlah",
  judul: "Bagan jumlah dan bagian",
  sumber: "Materi: bagan jumlah",
  latar: "#F0F9FF",
  ketukan: [
    k(SUARA_G1, tambah(0, judul("Bagan jumlah")), tambah(idx(SUARA_G1, "bagan."), emo("bgm", 150, 150, "\u{1F4CA}", 40)), tambah(idx(SUARA_G1, "jumlah"), bg("bg-a"))),
    k(
      SUARA_G2,
      hapus(0, "bgm"),
      tambah(idx(SUARA_G2, "bawahnya"), bg("bg-b"), bg("bg-c")),
      tambah(idx(SUARA_G2, "Halim."), ...kartu("lh", 30, 118, 140, 22, W.hijauMuda, ["bagian Halim: 30"], 9.6)),
    ),
    k(SUARA_G3, tambah(idx(SUARA_G3, "Kira"), ...kartu("lk", 176, 118, 94, 22, W.merahMuda, ["bagian Kira"], 9.6)), sorotkan(idx(SUARA_G3, "tanda"), "bg-c-k")),
    k(SUARA_G4, tambah(idx(SUARA_G4, "Berapa"), emo("tq", 150, 176, "❓", 34))),
  ],
};

/* ------------------------------ 7. Jumlah dikurangi bagian ------------------------------ */
const SUARA_D1 = "Untuk mencari bagian Kira, kurangi jumlah semuanya dengan bagian Halim.";
const SUARA_D2 = "Kita hitung lima puluh dikurangi tiga puluh.";
const SUARA_D3 = "Lima puluh dikurangi tiga puluh sama dengan dua puluh.";
const SUARA_D4 = "Jadi, bintang Kira ada dua puluh.";

export const ADEGAN_JUMLAH_DIKURANGI: AdeganStory = {
  id: "jumlah-dikurangi",
  judul: "Jumlah dikurangi bagian",
  sumber: "Materi: jumlah dikurangi bagian",
  latar: "#ECFDF5",
  ketukan: [
    k(
      SUARA_D1,
      tambah(0, judul("Jumlah dikurangi bagian"), BG_SEMUA()),
      tambah(idx(SUARA_D1, "kurangi"), emo("mn", 150, 136, "➖", 24)),
      tambah(idx(SUARA_D1, "semuanya"), ...kartu("jd", 30, 156, 240, 28, W.emas, ["jumlah dikurangi bagian"], 11)),
    ),
    k(
      SUARA_D2,
      hapus(0, "mn", ...idKartu("jd")),
      tambah(idx(SUARA_D2, "Lima"), bagianEq("eb", 0, "50", 140)),
      tambah(idx(SUARA_D2, "dikurangi"), bagianEq("eb", 1, "−", 140, 24, W.emas)),
      tambah(idx(SUARA_D2, "tiga"), bagianEq("eb", 2, "30", 140)),
      tambah(idx(SUARA_D2, "puluh.", 2), bagianEq("eb", 3, "=", 140, 24, W.emas), bagianEq("eb", 4, "?", 140, 24, W.merahMuda)),
    ),
    k(SUARA_D3, ubah(idx(SUARA_D3, "dua"), { id: "eb4-t", isi: "20" }, { id: "bg-c-t", isi: "20" }), sorotkan(idx(SUARA_D3, "dua"), "eb4-k")),
    k(SUARA_D4, tambah(idx(SUARA_D4, "Kira"), ...kartu("hs", 40, 170, 220, 26, W.hijauMuda, ["Kira punya 20 bintang"], 11)), tambah(idx(SUARA_D4, "dua"), emo("ra", 270, 188, "\u{1F389}", 20))),
  ],
};
function BG_SEMUA() {
  return bagan(30, "50", "30", "?", 0.6);
}

/* ------------------------------ 8. Memeriksa hasil ------------------------------ */
const SUARA_P1 = "Kita periksa hasilnya dengan menjumlahkan lagi.";
const SUARA_P2 = "Tiga puluh tambah dua puluh sama dengan lima puluh.";
const SUARA_P3 = "Hasilnya sama dengan jumlah semula, jadi jawabannya benar.";
const SUARA_P4 = "Penjumlahan dan pengurangan saling membantu. Yang satu memeriksa yang lain.";

export const ADEGAN_PERIKSA: AdeganStory = {
  id: "periksa",
  judul: "Memeriksa dengan menjumlahkan",
  sumber: "Materi: memeriksa hasil",
  latar: "#FEFCE8",
  ketukan: [
    k(SUARA_P1, bersih(0), tambah(0, judul("Periksa hasilnya")), tambah(idx(SUARA_P1, "periksa"), emo("lp", 150, 130, "\u{1F50E}", 46))),
    k(
      SUARA_P2,
      hapus(0, "lp"),
      tambah(idx(SUARA_P2, "Tiga"), bagianEq("ep", 0, "30", 80)),
      tambah(idx(SUARA_P2, "tambah"), bagianEq("ep", 1, "+", 80, 24, W.emas)),
      tambah(idx(SUARA_P2, "dua"), bagianEq("ep", 2, "20", 80)),
      tambah(idx(SUARA_P2, "sama"), bagianEq("ep", 3, "=", 80, 24, W.emas)),
      tambah(idx(SUARA_P2, "lima"), bagianEq("ep", 4, "50", 80)),
    ),
    k(SUARA_P3, sorotkan(idx(SUARA_P3, "sama"), "ep4-k"), tambah(idx(SUARA_P3, "benar."), emo("ok", 150, 150, "✅", 46))),
    k(
      SUARA_P4,
      hapus(0, "ok"),
      tambah(idx(SUARA_P4, "Penjumlahan"), ...kartu("p1", 14, 120, 130, 32, W.hijauMuda, ["30 + 20 = 50"], 12)),
      tambah(idx(SUARA_P4, "pengurangan"), ...kartu("p2", 156, 120, 130, 32, W.langit, ["50 − 20 = 30"], 12)),
      tambah(idx(SUARA_P4, "saling"), emo("sl", 150, 178, "\u{1F501}", 28)),
    ),
  ],
};



