import type { AdeganStory } from "./logika-story";
import { E, W, dinding, emo, judul, karung, kartu, kepik, konfeti, panah, panggung, papanUmum, pindahKepik, spanduk, tali, teks, tokoh } from "./k2b7B-gambar";
import { bersih, hapus, k, sorotkan, tambah, ubah } from "./k2b7B-bantu";

/*
 * Cerita orisinal IGIL "Pengumuman Bu Lia" (Kelas 2 Bab 7 Sub-Bab B), akhir cerita Bank Sampah Sekolah.
 * Naskah suara dari naskah/story-naskah-k2b7b.md. Bagian ini: dua teka-teki (maju dan berpikir mundur) dan penutup (pengumuman, taruhan, spanduk).
 */

/* ------------------------------ 7. Teka-teki lebih ------------------------------ */
const SUARA_L1 = "Nia membuat teka-teki. Aku dua lebihnya dari tujuh puluh sembilan.";
const SUARA_L2 = "Maju dua langkah dari tujuh puluh sembilan: delapan puluh, delapan puluh satu.";
const SUARA_L3 = "Jadi aku delapan puluh satu. Chacha bertepuk tangan!";

export const ADEGAN_TEKA_LEBIH: AdeganStory = {
  id: "teka-teki-lebih",
  judul: "Teka-teki dua lebihnya",
  sumber: "Materi: teka-teki lebihnya",
  latar: "#FDF4FF",
  ketukan: [
    k(
      SUARA_L1,
      bersih(0),
      tambah(0, judul("Teka-teki Nia"), ...dinding("dn")),
      tambah("Nia", ...tokoh("ni", 40, 168, "Nia")),
      tambah("Aku", ...kartu("gb", 84, 40, 206, 26, W.lavender, ["Aku: 2 lebihnya dari 79"], 11)),
      tambah("tujuh", ...tali("tl", 112, 76, 82)),
      tambah("sembilan.", kepik("kp", 112, 79, 76, 82)),
      sorotkan("sembilan.", "tlp79"),
    ),
    k(
      SUARA_L2,
      tambah("Maju", panah("pm", 108, 92, 84, 0, W.merah, 2.4)),
      tambah("dua", teks("lg", 150, 84, "2 langkah", 10, W.merah)),
      ubah("delapan", ...pindahKepik("kp", 80, 76, 82)),
      sorotkan("delapan", "tlp80"),
      ubah("delapan@2", ...pindahKepik("kp", 81, 76, 82)),
      sorotkan("delapan@2", "tlp81"),
    ),
    k(
      SUARA_L3,
      hapus(0, "lg", "pm"),
      ubah(0, { id: "tlp79", sorot: false }, { id: "tlp80", sorot: false }),
      ubah("Jadi", { id: "gb-t0", isi: "Aku = 81" }, { id: "gb-k", warna: W.hijauMuda }),
      tambah("Chacha", ...tokoh("ch", 100, 168, "Chacha")),
      tambah("bertepuk", emo("tp", 190, 84, E.tepuk, 20)),
      tambah("tangan!", emo("sr", 222, 84, E.sorak, 20)),
    ),
  ],
};

/* ------------------------------ 8. Teka-teki mundur ------------------------------ */
const SUARA_B1 = "Teka-teki Dika: setelah maju tiga langkah, bilanganku enam puluh dua.";
const SUARA_B2 = "Kita mundur dulu dari enam puluh dua: enam puluh satu, enam puluh, lima puluh sembilan.";
const SUARA_B3 = "Jadi aku mulai dari lima puluh sembilan. Berpikir terbalik itu seru!";

export const ADEGAN_TEKA_MUNDUR: AdeganStory = {
  id: "teka-teki-mundur",
  judul: "Teka-teki berpikir mundur",
  sumber: "Materi: teka-teki mundur",
  latar: "#F0FDFA",
  ketukan: [
    k(
      SUARA_B1,
      bersih(0),
      tambah(0, judul("Teka-teki Dika"), ...dinding("dn"), ...tali("tl", 112, 58, 64)),
      tambah("Dika:", ...tokoh("dk", 40, 168, "Dika")),
      tambah("maju", panah("pm", 40, 92, 120, 0, W.merah, 2.4), teks("tq", 28, 86, "?", 12, W.merah)),
      tambah("tiga", teks("lg", 100, 82, "3 langkah", 10, W.merah)),
      tambah("dua.", kepik("kp", 112, 62, 58, 64)),
      sorotkan("dua.", "tlp62"),
    ),
    k(
      SUARA_B2,
      hapus(0, "lg", "pm", "tq"),
      tambah("mundur", panah("pb", 192, 92, -126, 0, W.hijau, 2.4)),
      ubah("satu,", ...pindahKepik("kp", 61, 58, 64)),
      sorotkan("satu,", "tlp61"),
      ubah("puluh@3", ...pindahKepik("kp", 60, 58, 64)),
      sorotkan("puluh@3", "tlp60"),
      ubah("sembilan.", ...pindahKepik("kp", 59, 58, 64)),
      sorotkan("sembilan.", "tlp59"),
    ),
    k(
      SUARA_B3,
      ubah(0, { id: "tlp62", sorot: false }, { id: "tlp61", sorot: false }, { id: "tlp60", sorot: false }),
      tambah("Jadi", ...kartu("gb", 84, 40, 206, 26, W.hijauMuda, ["Aku mulai dari 59"], 11)),
      ubah("Berpikir", ...pindahKepik("kp", 62, 58, 64)),
      tambah("terbalik", panah("pc", 66, 92, 126, 0, W.biru, 2.4), emo("pk", 150, 150, E.pikir, 22)),
      tambah("seru!", emo("sr", 190, 150, E.sorak, 22)),
    ),
  ],
};

/* ------------------------------ 9. Penutup ------------------------------ */
const SUARA_N1 = "Bu Lia mengumumkan, tim Kuning paling banyak, lalu tim Hijau, dan tim Biru.";
const SUARA_N2 = "Chacha menepati taruhannya, memikul karung sampai topinya menutupi mata, dan semua tertawa.";
const SUARA_N3 = "Spanduk SEKOLAH BERSIH dipasang! Menurutmu, benda apa lagi yang bisa kita kumpulkan dan bandingkan? Terima kasih, Chacha, Dika, Nia, Bu Sari, dan Bu Lia!";

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Pengumuman dan spanduk Sekolah Bersih",
  sumber: "Materi: pengumuman dan penutup",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_N1,
      bersih(0),
      tambah(0, judul("Pengumuman Bu Lia"), ...dinding("dn"), ...papanUmum("pu", 40, 34, 220, 100)),
      tambah("Lia", ...tokoh("bl", 272, 168, "Bu Lia")),
      tambah("Kuning", ...kartu("r0", 52, 44, 196, 24, W.kuningTim, ["1. Tim Kuning: 74"], 11), emo("pi", 30, 62, E.piala, 20)),
      tambah("Hijau,", ...kartu("r1", 52, 72, 196, 24, W.hijauTim, ["2. Tim Hijau: 58"], 11)),
      tambah("Biru.", ...kartu("r2", 52, 100, 196, 24, W.biruTim, ["3. Tim Biru: 47"], 11)),
    ),
    k(
      SUARA_N2,
      bersih(0),
      tambah(0, judul("Taruhan Chacha"), ...dinding("dn")),
      tambah("menepati", ...tokoh("ch", 110, 168, "Chacha")),
      tambah("memikul", ...karung("kg", 94, 126, 6)),
      tambah("topinya", emo("tp", 110, 158, E.topi, 22)),
      tambah("menutupi", emo("tz", 110, 98, E.tanya, 18)),
      tambah("tertawa.", ...tokoh("dk", 190, 168, "Dika"), ...tokoh("ni", 240, 168, "Nia"), emo("t1", 190, 132, E.tertawa, 20), emo("t2", 240, 132, E.tertawa, 20)),
    ),
    k(
      SUARA_N3,
      bersih(0),
      tambah(0, ...panggung("pg")),
      tambah("Spanduk", ...spanduk("sp", 40, 30, 220, "SEKOLAH BERSIH", 13)),
      tambah("dipasang!", ...konfeti("kf", 56, 10)),
      tambah("benda", emo("b1", 90, 112, E.botol, 24), emo("b2", 130, 112, E.kaleng, 24), emo("b3", 170, 112, E.koran, 24), emo("b4", 210, 112, E.kardus, 24)),
      tambah("kumpulkan", teks("qq", 150, 138, "dikumpulkan dan dibandingkan?", 9, W.hijau)),
      tambah("kumpulkan", ...tokoh("ch", 40, 172, "Chacha")),
      tambah("bandingkan?", ...tokoh("dk", 94, 172, "Dika")),
      tambah("Terima", ...tokoh("ni", 148, 172, "Nia")),
      tambah("kasih,", ...tokoh("bs", 202, 172, "Bu Sari")),
      tambah("Chacha,", ...tokoh("bl", 262, 172, "Bu Lia"), emo("lb", 262, 138, E.lambai, 20)),
    ),
  ],
};
