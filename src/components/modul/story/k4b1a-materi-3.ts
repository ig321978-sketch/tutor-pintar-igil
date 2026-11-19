import type { AdeganStory } from "./logika-story";
import { E, W, angkaKotak, emo, judul, kotak, panah, papanKotak, papanPengumuman, poligon, teks, tiket, tokoh } from "./k4b1a-gambar";
import { bersih, hapus, k, sorotkan, tambah, ubah } from "./k4b1a-bantu";

/*
 * Cerita orisinal IGIL "Loket Tiket Bu Maya" (Kelas 4 Bab 1 Sub-Bab A), awal cerita Penginapan Pulau Karang Indah.
 * Naskah suara dari naskah/story-naskah-k4b1a.md. Bagian ini: tiket kedua (lima ribu delapan puluh), membaca ulang, penutup (jembatan ke Sub-Bab B).
 */

/* ------------------------------ 7. Tiket kedua ------------------------------ */
const SUARA_K1 = "Bu Maya menunjukkan tiket kedua, yaitu lima ribu delapan puluh.";
const SUARA_K2 = "Laras mengisi papan, lima di ribuan, nol di ratusan, delapan di puluhan, nol di satuan.";
const SUARA_K3 = "Genta menulis lima ribu delapan puluh sebagai angka lima, nol, delapan, nol.";
const TK2 = tiket("tk", 70, 30, 130, "5.080", "#FDBA74", 22);

export const ADEGAN_KEDUA: AdeganStory = {
  id: "kedua",
  judul: "Tiket kedua",
  sumber: "Materi: tiket kedua",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_K1,
      tambah(0, judul("Tiket Kedua"), ...tokoh("bm", 40, 184, "Bu Maya")),
      tambah("tiket", ...TK2.filter((o) => o.id !== "tk-n")),
      tambah("kedua,", teks("pm", 135, 28, "PEMENANG KEDUA", 7, W.merah)),
      tambah("puluh.", ...TK2.filter((o) => o.id === "tk-n")),
    ),
    k(
      SUARA_K2,
      tambah(0, ...tokoh("lr", 76, 184, "Laras")),
      tambah("papan,", ...papanKotak("pk", 40, 92, { label: true })),
      tambah("lima", angkaKotak("pk", 0, "5", 40, 92)),
      tambah("nol", angkaKotak("pk", 1, "0", 40, 92)),
      tambah("delapan", angkaKotak("pk", 2, "8", 40, 92)),
      tambah("nol@2", angkaKotak("pk", 3, "0", 40, 92)),
    ),
    k(
      SUARA_K3,
      tambah(0, ...tokoh("ge", 112, 184, "Genta")),
      tambah("menulis", ...papanPengumuman("pn", 226, 56, 66, 76, "PENGUMUMAN")),
      tambah("puluh", teks("tu", 259, 100, "5.080", 13, W.merah)),
      sorotkan("angka", "pk-b0", "pk-b1", "pk-b2", "pk-b3"),
    ),
  ],
};

/* ------------------------------ 8. Membaca ulang ------------------------------ */
const SUARA_U1 = "Bu Maya meminta Satria membaca nomor itu sekali lagi.";
const SUARA_U2 = "Kali ini Satria membaca dari ribuan, dan nol tidak ia baca.";
const SUARA_U3 = "Bu Maya bertepuk tangan, karena kedua nomor sudah benar dan siap diumumkan.";

export const ADEGAN_ULANG: AdeganStory = {
  id: "ulang",
  judul: "Membaca sekali lagi",
  sumber: "Materi: membaca ulang",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_U1,
      tambah(0, judul("Membaca Sekali Lagi"), ...tokoh("bm", 40, 184, "Bu Maya")),
      tambah("Satria", ...tokoh("sa", 76, 184, "Satria")),
      tambah("nomor", teks("bn", 190, 72, "5.080", 34, W.biru)),
      tambah("sekali", emo("ul", 150, 160, E.ulang, 18)),
    ),
    k(
      SUARA_U2,
      tambah("membaca", panah("ar", 140, 92, 100, 0, W.merah, 3)),
      tambah("ribuan,", teks("b5", 160, 120, "5.000", 14, W.hijauTua)),
      tambah("nol", teks("b8", 215, 120, "80", 14, W.hijauTua), teks("b0", 262, 120, "0", 14, W.merah)),
      ubah("tidak", { id: "b0", op: 0.3 }),
    ),
    k(
      SUARA_U3,
      hapus(0, "bn", "b5", "b8", "b0", "ar", "ul"),
      tambah("bertepuk", emo("tp", 108, 160, E.tepuk, 18)),
      tambah("kedua", ...papanPengumuman("pn", 150, 34, 140, 84, "PENGUMUMAN"), teks("n1", 190, 80, "3.406", 14, W.biru), teks("n2", 252, 80, "5.080", 14, W.biru)),
      tambah("benar", emo("b1", 190, 100, E.benar, 16), emo("b2", 252, 100, E.benar, 16)),
      tambah("diumumkan.", emo("mf", 220, 150, E.megafon, 20)),
    ),
  ],
};

/* ------------------------------ 9. Penutup ------------------------------ */
const SUARA_P1 = "Pak Laode, penjaga gudang, datang dan bilang handuk tamu menumpuk tanpa hitungan.";
const SUARA_P2 = "Tiap angka pada sebuah bilangan ternyata punya tempat dan harga berbeda.";
const SUARA_P3 = "Menurutmu, berapa banyak handuk di gudang itu? Terima kasih, Satria, Laras, Genta, Pak Hendro, dan Bu Maya!";
const WARNA_HANDUK = ["#FCA5A5", "#93C5FD", "#86EFAC", "#FDE047", "#C4B5FD", "#FDBA74"];
const handuk = (id: string, x: number, yDasar: number, n: number) => Array.from({ length: n }, (_, i) => kotak(`${id}${i}`, x, yDasar - (i + 1) * 10, 36, 9, WARNA_HANDUK[i % WARNA_HANDUK.length], W.coklat, { rx: 2, tebal: 1, z: 2 }));

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Gudang handuk Pak Laode",
  sumber: "Materi: penutup dan jembatan",
  latar: "#E0F2FE",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Gudang Handuk"), kotak("ps", 2, 150, 296, 50, W.pasir, undefined, { rx: 0, tebal: 0, z: -3 })),
      tambah("Laode,", ...tokoh("pl", 240, 184, "Pak Laode")),
      tambah("gudang,", kotak("gd", 90, 92, 110, 56, "#E5E7EB", W.kayuTua, { rx: 2 }), poligon("gd-a", [[84, 92], [145, 66], [206, 92]], W.rumbia, "#713F12", { z: 1 }), teks("gt", 145, 124, "GUDANG", 9, W.biru, { z: 3 })),
      tambah("handuk", ...handuk("hd", 232, 148, 3)),
      tambah("menumpuk", ...handuk("hm", 232, 148, 6).slice(3)),
      tambah("hitungan", teks("hq", 250, 70, "?", 24, W.merah)),
    ),
    k(
      SUARA_P2,
      bersih(0),
      tambah(0, judul("Tempat dan Harga")),
      tambah("bilangan", ...papanKotak("pk", 40, 70, { label: true }), angkaKotak("pk", 0, "6", 40, 70), angkaKotak("pk", 1, "1", 40, 70), angkaKotak("pk", 2, "8", 40, 70), angkaKotak("pk", 3, "5", 40, 70)),
      tambah("tempat", emo("jr", 126, 144, E.jari, 18)),
      tambah("harga", teks("h0", 60, 144, "1.000", 9, W.coklat), teks("h1", 104, 144, "100", 9, W.coklat), teks("h2", 148, 144, "10", 9, W.coklat), teks("h3", 192, 144, "1", 9, W.coklat)),
    ),
    k(
      SUARA_P3,
      bersih(0),
      tambah(0, ...handuk("hd", 250, 148, 4), teks("hq", 268, 70, "?", 30, W.merah)),
      tambah("Satria,", ...tokoh("sa", 30, 184, "Satria")),
      tambah("Laras,", ...tokoh("lr", 72, 184, "Laras")),
      tambah("Genta,", ...tokoh("ge", 112, 184, "Genta")),
      tambah("Hendro,", ...tokoh("ph", 158, 184, "Pak Hendro")),
      tambah("Maya!", ...tokoh("bm", 214, 184, "Bu Maya"), emo("lb", 190, 140, E.lambai, 20)),
    ),
  ],
};
