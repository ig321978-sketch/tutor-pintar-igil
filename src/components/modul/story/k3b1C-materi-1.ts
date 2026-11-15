import type { AdeganStory } from "./logika-story";
import { W, anak, emo, idAnak, judul, kartu, nb, papan, papanAngka, papanKerangka, papanLabel, tanda, tempatDua, teks } from "./k3b1C-gambar";
import { hapus, idKartu, idx, k, redamkan, sorotkan, tambah } from "./k3b1C-bantu";

/* ------------------------------ 2. Kira dan Upe ke sekolah ------------------------------ */
const SUARA_J1 = "Kira dan Upe berjalan ke sekolah dari tempat yang berbeda. Siapa yang jaraknya lebih jauh?";
const SUARA_J2 = "Jarak Kira ke sekolah adalah tiga ratus tiga puluh sembilan meter.";
const SUARA_J3 = "Jarak Upe ke sekolah adalah empat ratus dua puluh satu meter.";
const SUARA_J4 = "Dua jarak ini adalah bilangan tiga angka. Untuk tahu mana yang lebih jauh, kita bandingkan dua bilangan itu.";

export const ADEGAN_CERITA_JARAK: AdeganStory = {
  id: "cerita-jarak",
  judul: "Kira dan Upe berjalan ke sekolah",
  sumber: "Materi: jarak ke sekolah",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_J1,
      tambah(0, judul("Kira dan Upe ke sekolah")),
      tambah(idx(SUARA_J1, "Kira"), ...anak("kira", 40, 130)),
      tambah(idx(SUARA_J1, "Upe"), ...anak("upe", 260, 130)),
      tambah(idx(SUARA_J1, "sekolah"), emo("sk", 150, 124, "\u{1F3EB}", 56)),
      tambah(idx(SUARA_J1, "jauh?"), emo("tn", 150, 64, "❓", 34)),
    ),
    k(SUARA_J2, hapus(0, "tn"), tambah(idx(SUARA_J2, "tiga"), nb("kira", 40, 106, "339 meter", 12))),
    k(SUARA_J3, tambah(idx(SUARA_J3, "empat"), nb("upe", 260, 106, "421 meter", 12))),
    k(SUARA_J4, tambah(idx(SUARA_J4, "bandingkan"), emo("tm", 150, 64, "⚖️", 34)), tambah(idx(SUARA_J4, "bilangan", 2), ...kartu("kb", 60, 176, 180, 22, W.emas, ["bandingkan dua bilangan"], 11))),
  ],
};

/* ------------------------------ 3. Papan nilai tempat ------------------------------ */
const SUARA_P1 = "Kita taruh kedua bilangan pada papan nilai tempat. Papan ini punya tiga tempat, yaitu ratusan, puluhan, dan satuan.";
const SUARA_P2 = "Bilangan tiga ratus tiga puluh sembilan ditaruh di papan kiri. Ratusannya tiga, puluhannya tiga, dan satuannya sembilan.";
const SUARA_P3 = "Bilangan empat ratus dua puluh satu ditaruh di papan kanan. Ratusannya empat, puluhannya dua, dan satuannya satu.";
const SUARA_P4 = "Nilai tempat itu seperti rak. Ratusan paling kiri, lalu puluhan, lalu satuan paling kanan.";
const SUARA_P5 = "Sekarang kedua bilangan siap dibandingkan. Kita mulai dari tempat yang paling kiri, yaitu ratusan.";

export const ADEGAN_PAPAN_NILAI: AdeganStory = {
  id: "papan-nilai",
  judul: "Papan nilai tempat",
  sumber: "Materi: papan nilai tempat",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Papan nilai tempat")),
      tambah(idx(SUARA_P1, "papan"), ...papanKerangka("a"), ...papanKerangka("b")),
      sorotkan(idx(SUARA_P1, "ratusan,"), ...tempatDua(0)),
      redamkan(idx(SUARA_P1, "puluhan,"), ...tempatDua(0)),
      sorotkan(idx(SUARA_P1, "puluhan,"), ...tempatDua(1)),
      redamkan(idx(SUARA_P1, "satuan."), ...tempatDua(1)),
      sorotkan(idx(SUARA_P1, "satuan."), ...tempatDua(2)),
    ),
    k(
      SUARA_P2,
      redamkan(0, ...tempatDua(2)),
      tambah(idx(SUARA_P2, "sembilan"), papanLabel("a", 339)),
      tambah(idx(SUARA_P2, "Ratusannya"), ...papanAngka("a", 339, 44, 0, 0)),
      tambah(idx(SUARA_P2, "puluhannya"), ...papanAngka("a", 339, 44, 1, 1)),
      tambah(idx(SUARA_P2, "satuannya"), ...papanAngka("a", 339, 44, 2, 2)),
    ),
    k(
      SUARA_P3,
      tambah(idx(SUARA_P3, "satu"), papanLabel("b", 421)),
      tambah(idx(SUARA_P3, "Ratusannya"), ...papanAngka("b", 421, 44, 0, 0)),
      tambah(idx(SUARA_P3, "puluhannya"), ...papanAngka("b", 421, 44, 1, 1)),
      tambah(idx(SUARA_P3, "satuannya"), ...papanAngka("b", 421, 44, 2, 2)),
    ),
    k(
      SUARA_P4,
      tambah(idx(SUARA_P4, "rak."), emo("rk", 150, 150, "\u{1F5C4}️", 40)),
      tambah(idx(SUARA_P4, "paling"), teks("ar", 150, 192, "kiri: besar, kanan: kecil", 10.5, W.ungu)),
    ),
    k(SUARA_P5, hapus(0, "rk", "ar"), sorotkan(idx(SUARA_P5, "ratusan."), ...tempatDua(0)), tambah(idx(SUARA_P5, "kiri,"), ...kartu("mk", 60, 150, 180, 26, W.emas, ["mulai dari ratusan"], 11))),
  ],
};

/* ------------------------------ 4. Membandingkan ratusan ------------------------------ */
const SUARA_R1 = "Kita mulai dari tempat ratusan. Bilangan pertama punya tiga ratusan, bilangan kedua punya empat ratusan.";
const SUARA_R2 = "Tiga ratus kurang dari empat ratus. Karena itu, tiga ratus tiga puluh sembilan kurang dari empat ratus dua puluh satu.";
const SUARA_R3 = "Jadi jarak Kira lebih dekat dari jarak Upe. Upe berjalan lebih jauh ke sekolah.";
const SUARA_R4 = "Bandingkan ratusannya lebih dulu. Bila ratusannya berbeda, kita sudah tahu jawabannya.";
const SUARA_R5 = "Tidak perlu melihat puluhan dan satuan lagi. Satu tempat saja sudah cukup untuk memutuskan.";
const cp = (id: string, y: number, isi: string) => teks(id, 150, y, isi, 13, W.merah);

export const ADEGAN_BANDING_RATUSAN: AdeganStory = {
  id: "banding-ratusan",
  judul: "Membandingkan ratusan",
  sumber: "Materi: membandingkan ratusan",
  latar: "#FEFCE8",
  ketukan: [
    k(SUARA_R1, tambah(0, judul("Bandingkan ratusan"), ...papan("a", 339), ...papan("b", 421)), sorotkan(idx(SUARA_R1, "ratusan."), ...tempatDua(0))),
    k(SUARA_R2, tambah(idx(SUARA_R2, "Tiga"), cp("cp1", 140, "300 < 400")), tambah(idx(SUARA_R2, "itu,"), tanda("<")), tambah(idx(SUARA_R2, "Karena"), cp("cp2", 160, "339 < 421"))),
    k(
      SUARA_R3,
      tambah(idx(SUARA_R3, "Kira"), ...anak("kira", 40, 150), nb("kira", 40, 126, "339 meter", 12)),
      tambah(idx(SUARA_R3, "Upe"), ...anak("upe", 260, 150), nb("upe", 260, 126, "421 meter", 12)),
    ),
    k(SUARA_R4, hapus(0, "cp1", "cp2"), redamkan(0, ...tempatDua(0)), tambah(idx(SUARA_R4, "Bila"), ...kartu("rb", 75, 140, 150, 30, W.emas, ["ratusan berbeda: selesai"], 10.5))),
    k(SUARA_R5, hapus(0, ...idKartu("rb"), ...idAnak("kira"), ...idAnak("upe"), "nb-kira", "nb-upe"), tambah(idx(SUARA_R5, "Satu"), emo("ok", 150, 160, "✅", 34))),
  ],
};
