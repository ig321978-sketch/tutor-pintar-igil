import type { AdeganStory, Obj } from "./logika-story";
import { E, RAK, TIGA, W, akuariumBesar, cxAq, emo, judul, kartu, kotak, nyala, orang, pakan, posAq, rakLengkap, rentang, teks, yNomor } from "./k1b5b-gambar";
import { hapus, idx, k, sorotkan, tambah, ubah, urutBilangan } from "./k1b5b-bantu";

/* Lanjutan "Rak Akuarium Bernomor": bilangan sesudah, sebelum, dan di antara pada akuarium besar, lalu dua label nomor jatuh dan ditemukan dari tetangganya. */

const KOKI = "#F59E0B";
const GUPPY = "#FB923C";
const NEON = "#22D3EE";
const Y_AQ = 34;
const besar = (i: number, isi: string, warna: string): Obj[] => akuariumBesar(`a${i}`, TIGA.x[i], Y_AQ, TIGA.w, 56, isi, warna);
const panah = (id: string, x: number, x2: number, warna: string): Obj => ({ id, t: "panah", x, y: 134, x2, y2: 0, warna, tebal: 2.4 });

/* ------------------------------ 4. Sesudah, sebelum, di antara ------------------------------ */
const SUARA_B1 = "Igil berhenti di lima belas. Sesudah lima belas adalah enam belas, satu nomor lebih banyak.";
const SUARA_B2 = "Kaka berhenti di dua belas. Sebelum dua belas adalah sebelas, satu nomor lebih sedikit.";
const SUARA_B3 = "Lima belas ada di antara empat belas dan enam belas, tepat di tengah keduanya.";
const [B3_15, B3_14, B3_16] = urutBilangan(SUARA_B3, [15, 14, 16]);

export const ADEGAN_SEBELUM_SESUDAH: AdeganStory = {
  id: "sebelum-sesudah",
  judul: "Sesudah, sebelum, dan di antara",
  sumber: "Materi: sesudah, sebelum, di antara",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, judul("Sesudah dan sebelum"), ...besar(1, "15", KOKI)),
      tambah("Igil", ...orang("ig", 22, 182, E.igil, "Igil")),
      tambah("Sesudah", ...besar(2, "?", GUPPY), panah("ps", 162, 62, W.hijau), teks("psj", 193, 150, "sesudah", 9, W.hijau)),
      ubah("enam", { id: "a2-n", isi: "16", warna: W.merah }),
      tambah(idx(SUARA_B1, "satu"), teks("pl", 236, 166, "1 lebih banyak", 9, W.hijau)),
    ),
    k(
      SUARA_B2,
      hapus(0, "ps", "psj", "pl", "ig", "ig-n"),
      tambah("Kaka", ...orang("kk", 278, 182, E.kaka, "Kaka")),
      ubah(idx(SUARA_B2, "belas."), { id: "a1-n", isi: "12" }, { id: "a2-n", isi: "13", warna: W.biru }),
      tambah("Sebelum", ...besar(0, "?", NEON), panah("pb", 138, -62, W.ungu), teks("pbj", 107, 150, "sebelum", 9, W.ungu)),
      ubah("sebelas,", { id: "a0-n", isi: "11", warna: W.merah }),
      tambah(idx(SUARA_B2, "satu"), teks("pl", 64, 166, "1 lebih sedikit", 9, W.ungu)),
    ),
    k(
      SUARA_B3,
      hapus(0, "pb", "pbj", "pl", "kk", "kk-n", "kk-pita"),
      ubah(B3_15, { id: "a1-n", isi: "15", warna: W.merah }),
      ubah(B3_14, { id: "a0-n", isi: "14", warna: W.biru }),
      ubah(B3_16, { id: "a2-n", isi: "16", warna: W.biru }),
      tambah("antara", ...kartu("da", 75, 136, 150, 22, W.krem, ["15 di antara 14 dan 16"], 9.4)),
      sorotkan("tengah", "a1", "a1-l"),
      tambah("keduanya.", ...orang("ig", 22, 182, E.igil, "Igil"), ...orang("kk", 278, 182, E.kaka, "Kaka")),
    ),
  ],
};

/* ------------------------------ 5. Dua label nomor jatuh ------------------------------ */
const SUARA_L1 = "Saat Abang mengelap rak, dua label nomor jatuh. Dua akuarium kini tanpa nomor.";
const SUARA_L2 = "Akuarium pertama ada sesudah dua belas dan sebelum empat belas. Jadi nomornya tiga belas.";
const SUARA_L3 = "Akuarium kedua ada di antara enam belas dan delapan belas, jadi tujuh belas. Abang memasang label lagi.";
const yTag = (n: number): number => posAq(n).y + RAK.h + 7;
const tanya = (n: number): Obj => teks(`q${n}`, cxAq(n), yNomor(n), "?", 9, W.merah);
const SUDAH_PAKAN = rentang(8, 15);
const SUDAH_NYALA = rentang(12, 20);

export const ADEGAN_LABEL_HILANG: AdeganStory = {
  id: "label-hilang",
  judul: "Dua label nomor jatuh",
  sumber: "Materi: mencari nomor yang hilang",
  latar: "#FDF4FF",
  ketukan: [
    k(
      SUARA_L1,
      tambah(0, judul("Label nomor yang hilang"), ...rakLengkap(), ...SUDAH_PAKAN.flatMap(pakan), kotak("lt", 6, 160, 288, 36, "#E7E5E4", "#A8A29E", { rx: 4, tebal: 1.6, z: -6 })),
      ubah(0, ...SUDAH_NYALA.map(nyala)),
      tambah("Abang", ...orang("ab", 30, 184, E.abang, "Abang")),
      tambah("mengelap", emo("lp", cxAq(15), 102, E.lap, 14)),
      hapus("jatuh.", "no13", "no17"),
      ubah("jatuh.", { id: "tg13", x: 110, y: 176, rot: 25 }, { id: "tg17", x: 160, y: 180, rot: -20 }),
      tambah("jatuh.", tanya(13), tanya(17), teks("j2", 236, 182, "2 label jatuh", 9, W.merah)),
      sorotkan(idx(SUARA_L1, "Dua", 2), "aq13", "aq17"),
    ),
    k(
      SUARA_L2,
      hapus(0, "lp"),
      sorotkan("sesudah", "no12"),
      sorotkan("sebelum", "no14"),
      ubah(urutBilangan(SUARA_L2, [13])[0], { id: "q13", isi: "13" }),
      tambah(urutBilangan(SUARA_L2, [13])[0], teks("c13", 236, 166, "12, 13, 14", 9, W.ungu)),
    ),
    k(
      SUARA_L3,
      sorotkan("enam", "no16"),
      sorotkan("delapan", "no18"),
      ubah("tujuh", { id: "q17", isi: "17" }),
      ubah("tujuh", { id: "c13", isi: "16, 17, 18" }),
      ubah("memasang", { id: "tg13", x: cxAq(13) - 10, y: yTag(13), rot: 0 }, { id: "tg17", x: cxAq(17) - 10, y: yTag(17), rot: 0 }),
      hapus("memasang", "j2"),
      tambah("lagi.", emo("ok", 150, 186, E.benar, 14)),
    ),
  ],
};
