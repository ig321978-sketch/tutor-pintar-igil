import type { AdeganStory } from "./logika-story";
import { E, W, angkaKotak, dermaga, emo, labelTempat, loket, panah, pantai, papanKotak, papanPengumuman, penginapan, teks, tiket, tokoh, judul } from "./k4b1a-gambar";
import { k, redamkan, sorotkan, tambah } from "./k4b1a-bantu";

/*
 * Cerita orisinal IGIL "Loket Tiket Bu Maya" (Kelas 4 Bab 1 Sub-Bab A, membaca dan menulis bilangan sampai sepuluh ribu), awal cerita Penginapan Pulau Karang Indah.
 * Naskah suara dari naskah/story-naskah-k4b1a.md. Bagian ini: pulau, tiket pemenang, papan empat kotak.
 */

/* ------------------------------ 1. Pulau ------------------------------ */
const SUARA_P1 = "Pak Hendro mengajak Satria, Laras, dan Genta naik perahu ke Pulau Karang Indah untuk membantu Bu Maya.";
const SUARA_P2 = "Di tepi pantai berdiri Penginapan Pulau Karang Indah dengan loket tiket beratap rumbia.";
const SUARA_P3 = "Bu Maya tampak sibuk, karena nomor tiket undian harus diumumkan sore ini.";

export const ADEGAN_PULAU: AdeganStory = {
  id: "pulau",
  judul: "Tiba di Pulau Karang Indah",
  sumber: "Materi: pulau dan penginapan",
  latar: "#E0F2FE",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Pulau Karang Indah"), ...pantai("pn", 126, 150)),
      tambah("Hendro", ...tokoh("ph", 28, 184, "Pak Hendro")),
      tambah("Satria,", ...tokoh("sa", 72, 184, "Satria")),
      tambah("Laras,", ...tokoh("lr", 108, 184, "Laras")),
      tambah("Genta", ...tokoh("ge", 144, 184, "Genta")),
      tambah("perahu", ...dermaga("dm", 214, 124, 76), emo("pr", 258, 142, E.perahu, 24)),
    ),
    k(
      SUARA_P2,
      tambah("pantai", emo("po", 284, 104, E.pohon, 24)),
      tambah("Penginapan", ...penginapan("pg", 14, 84, 120, 56)),
      tambah("loket", ...loket("lk", 150, 100, 52, 40)),
      tambah("rumbia.", teks("rb", 176, 72, "beratap rumbia", 7, W.coklat)),
    ),
    k(
      SUARA_P3,
      tambah(0, ...tokoh("bm", 186, 184, "Bu Maya")),
      tambah("sibuk,", emo("sb", 212, 160, E.keringat, 16)),
      tambah("nomor", ...tiket("tk", 216, 70, 70, "No. ?", "#FDBA74", 13)),
      tambah("undian", teks("ud", 251, 60, "UNDIAN", 9, W.merah)),
      tambah("diumumkan", emo("mf", 252, 124, E.megafon, 18)),
      tambah("sore", teks("sr", 70, 50, "sore ini", 9, W.oranye)),
    ),
  ],
};

/* ------------------------------ 2. Tiket pemenang ------------------------------ */
const SUARA_T1 = "Bu Maya menunjukkan tiket pemenang pertama, bernomor tiga ribu empat ratus enam.";
const SUARA_T2 = "Nomor itu terdiri atas empat angka, dari ribuan sampai satuan.";
const SUARA_T3 = "Bu Maya meminta mereka menuliskan nomor itu besar-besar di papan pengumuman.";
const TK = tiket("tk", 70, 30, 130, "3.406", "#FDBA74", 22);
const TK_BADAN = TK.filter((o) => o.id !== "tk-n");
const TK_NOMOR = TK.filter((o) => o.id === "tk-n");

export const ADEGAN_TIKET: AdeganStory = {
  id: "tiket",
  judul: "Tiket pemenang pertama",
  sumber: "Materi: tiket pemenang",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Tiket Pemenang"), ...tokoh("bm", 40, 184, "Bu Maya")),
      tambah("tiket", ...TK_BADAN),
      tambah("pemenang", teks("pm", 135, 28, "PEMENANG", 7, W.merah)),
      tambah("enam.", ...TK_NOMOR),
    ),
    k(
      SUARA_T2,
      tambah("terdiri", ...papanKotak("pk", 40, 92, { label: true })),
      tambah("empat", teks("n4", 150, 156, "4 angka", 11, W.ungu)),
      tambah("ribuan", angkaKotak("pk", 0, "3", 40, 92)),
      tambah("sampai", angkaKotak("pk", 1, "4", 40, 92), angkaKotak("pk", 2, "0", 40, 92)),
      tambah("satuan", angkaKotak("pk", 3, "6", 40, 92)),
    ),
    k(
      SUARA_T3,
      tambah("meminta", emo("mn", 110, 160, E.tangan, 16)),
      tambah("menuliskan", ...papanPengumuman("pn", 226, 60, 66, 76, "PENGUMUMAN"), emo("ct", 76, 160, E.catat, 16)),
      tambah("besar-besar", teks("bb", 259, 108, "BESAR", 11, W.merah)),
      tambah("papan", panah("ar", 184, 48, 38, 20, W.merah, 2)),
    ),
  ],
};

/* ------------------------------ 3. Papan empat kotak ------------------------------ */
const SUARA_K1 = "Laras menggambar papan empat kotak, yaitu ribuan, ratusan, puluhan, dan satuan.";
const SUARA_K2 = "Tiga ribu berarti angka tiga di kotak ribuan.";
const SUARA_K3 = "Empat ratus berarti angka empat di kotak ratusan.";

export const ADEGAN_PAPAN: AdeganStory = {
  id: "papan",
  judul: "Papan empat kotak",
  sumber: "Materi: papan tempat angka",
  latar: "#FEF3C7",
  ketukan: [
    k(
      SUARA_K1,
      tambah(0, judul("Papan Empat Kotak"), ...tokoh("lr", 40, 184, "Laras")),
      tambah("papan", ...papanKotak("pk", 40, 70, { label: false })),
      tambah("empat", teks("n4", 150, 140, "4 kotak", 11, W.ungu)),
      tambah("ribuan,", labelTempat("pk", 0, 40, 70)),
      tambah("ratusan,", labelTempat("pk", 1, 40, 70)),
      tambah("puluhan,", labelTempat("pk", 2, 40, 70)),
      tambah("satuan", labelTempat("pk", 3, 40, 70)),
    ),
    k(
      SUARA_K2,
      tambah(0, teks("m3", 258, 90, "3.000", 14, W.merah)),
      tambah("angka", emo("jr", 258, 112, E.jari, 16)),
      tambah("tiga@2", angkaKotak("pk", 0, "3", 40, 70)),
      sorotkan("ribuan", "pk-b0"),
    ),
    k(
      SUARA_K3,
      tambah(0, teks("m4", 258, 130, "400", 14, W.merah)),
      tambah("empat@2", angkaKotak("pk", 1, "4", 40, 70)),
      redamkan("ratusan", "pk-b0"),
      sorotkan("ratusan", "pk-b1"),
    ),
  ],
};
