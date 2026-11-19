import type { AdeganStory } from "./logika-story";
import {
  E,
  W,
  barisBungkus,
  barisKardus,
  catatan,
  emo,
  garis,
  idKartu,
  judul,
  kaleng,
  kapur,
  kardusKosong,
  kartu,
  kotak,
  panah,
  papanKapur,
  rakKayu,
  teks,
  tokoh,
  tokoLatar,
  troli,
} from "./k3b1E-gambar";
import { bersih, hapus, k, tambah, ubah } from "./k3b1E-bantu";

/*
 * Cerita orisinal IGIL "Sisa Stok Pak Anto" (Kelas 3 Bab 1 Sub-Bab E).
 * Naskah suara dari naskah/story-naskah-k3b1e.md. Bagian ini: cerita pengurangan (kaleng susu di gudang), hasil nol, dan penutup (jembatan ke Sub-Bab F).
 */

const KALENG_ATAS = (n: number) => Array.from({ length: n }, (_, i) => kaleng(`kl${i}`, 20 + i * 13, 52)).flat();

/* ------------------------------ 7. Cerita pengurangan ------------------------------ */
const SUARA_G1 = "Di gudang ada sembilan puluh kaleng susu, dikirim lima puluh empat ke toko cabang. Berapa sisanya?";
const SUARA_G2 = "Nol dikurangi empat tidak bisa, jadi pinjam satu puluhan. Sepuluh dikurangi empat sama dengan enam.";
const SUARA_G3 = "Puluhan tinggal delapan dikurangi lima sama dengan tiga. Sisa tiga puluh enam kaleng.";

export const ADEGAN_SOAL_CERITA_KURANG: AdeganStory = {
  id: "soal-cerita-kurang",
  judul: "Kaleng susu di gudang",
  sumber: "Materi: cerita pengurangan",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_G1,
      bersih(0),
      tambah(0, judul("Gudang Toko"), ...tokoLatar("tk"), ...rakKayu("rk", 14, 36, 130, 100, 3), ...tokoh("pa", 40, 172, "Pak Anto")),
      tambah("sembilan", ...KALENG_ATAS(9), ...kartu("ga", 154, 38, 70, 26, W.kuning, ["Ada 90"], 12)),
      tambah("dikirim", ...troli("tr", 168, 112, 60, 20), ...kartu("kr", 228, 38, 66, 26, W.merahMuda, ["Kirim 54"], 11)),
      tambah("toko", emo("cb", 270, 130, "\u{1F3EA}", 22), panah("pc", 232, 122, 24, 0, W.merah, 2.2)),
      tambah("Berapa", emo("tz", 200, 100, E.tanya, 20)),
    ),
    k(
      SUARA_G2,
      bersih(0),
      tambah(0, judul("Pinjam Satu Puluhan"), ...tokoLatar("tk"), ...papanKapur("pk", 14, 34, 150, 120), kapur("sn-a", 112, 76, "90", 26, { anchor: "end" }), kapur("sn-m", 70, 106, "-", 26), kapur("sn-b", 112, 106, "54", 26, { anchor: "end" }), garis("sn-g", 58, 113, 64, 0, "#F8FAFC", 1.8, { z: 3 })),
      tambah("empat", ...kartu("ka", 176, 44, 118, 28, W.merahMuda, ["0 - 4 = ?"], 13)),
      tambah("pinjam", ...kartu("kb", 176, 82, 118, 28, W.kuning, ["pinjam 1 puluhan"], 11), emo("x1", 276, 58, E.salah, 14)),
      tambah("Sepuluh", ...kartu("kc", 176, 120, 118, 28, W.hijauMuda, ["10 - 4 = 6"], 13)),
      tambah("enam.", kapur("hs", 112, 138, "6", 26, { anchor: "end" })),
    ),
    k(
      SUARA_G3,
      hapus("Puluhan", ...idKartu("ka"), ...idKartu("kb"), "x1"),
      tambah("delapan", ...kartu("kd", 176, 44, 118, 28, W.kuning, ["8 - 5 = 3"], 13)),
      ubah("Sisa", { id: "hs", isi: "36" }),
      tambah("kaleng.", ...kartu("ke", 176, 86, 118, 28, W.krem, ["36 kaleng"], 12), emo("ok", 262, 150, E.benar, 20)),
    ),
  ],
};

/* ------------------------------ 8. Hasil nol ------------------------------ */
const SUARA_H1 = "Rak mi hampir kosong. Ada dua puluh empat bungkus, terjual dua puluh empat.";
const SUARA_H2 = "Dua puluh empat dikurangi dua puluh empat hasilnya nol.";
const SUARA_H3 = "Pak Anto pun mencatat sisa stok dan mengirim mi baru.";

export const ADEGAN_KURANG_SAMA: AdeganStory = {
  id: "kurang-sama",
  judul: "Rak mi habis terjual",
  sumber: "Materi: pengurangan dengan hasil nol",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_H1,
      bersih(0),
      tambah(0, judul("Rak Hampir Kosong"), ...tokoLatar("tk"), ...tokoh("pa", 40, 172, "Pak Anto")),
      tambah("hampir", ...rakKayu("rk", 100, 36, 190, 108, 3)),
      tambah("dua", ...barisKardus("kd", 108, 53, 2, 24), ...barisBungkus("bg", 108, 97, 4, 13), kotak("ad-k", 10, 40, 80, 46, W.kuning, W.biru, { rx: 8 }), teks("ad-t0", 50, 54, "Ada", 9), teks("ad-t1", 50, 79, "24", 20)),
      tambah("terjual", kotak("tj-k", 10, 92, 80, 46, W.merahMuda, W.biru, { rx: 8 }), teks("tj-t0", 50, 106, "Terjual", 9)),
      tambah("empat@2", teks("tj-t1", 50, 131, "24", 20), emo("kg", 78, 124, E.kaget, 14)),
    ),
    k(
      SUARA_H2,
      bersih(0),
      tambah(0, judul("Hasilnya Nol"), ...tokoLatar("tk"), ...papanKapur("pk", 30, 38, 240, 100), kapur("e1", 82, 100, "24", 28)),
      tambah("dikurangi", kapur("e2", 124, 100, "-", 28)),
      tambah("dua@2", kapur("e3", 166, 100, "24", 28)),
      tambah("hasilnya", kapur("e4", 208, 100, "=", 28)),
      tambah("nol.", kapur("e5", 240, 100, "0", 32, { warna: "#FDE047" }), emo("kl", 262, 130, E.kilau, 18)),
    ),
    k(
      SUARA_H3,
      bersih(0),
      tambah(0, judul("Sisa Stok Dicatat"), ...tokoLatar("tk"), ...tokoh("pa", 40, 172, "Pak Anto"), ...rakKayu("rk", 100, 36, 190, 108, 3)),
      tambah("mencatat", ...catatan("ct", 56, 146, 36, 22, 2)),
      tambah("stok", kapur("ko", 195, 96, "0", 34, { warna: W.merah, z: 4 }), teks("kt", 195, 112, "kosong", 9, W.coklat, { z: 4 })),
      tambah("mengirim", ...troli("tr", 124, 154, 44, 12), emo("kb", 146, 154, E.kardus, 16)),
      tambah("baru.", emo("kl", 226, 150, E.kilau, 20)),
    ),
  ],
};

/* ------------------------------ 9. Penutup ------------------------------ */
const SUARA_I1 = "Raka menepati taruhannya dan menata kardus kosong sampai rapi.";
const SUARA_I2 = "Bu Mirna, penjual telur, datang membawa keranjang.";
const SUARA_I3 = "Menurutmu, bagaimana cara cepat memeriksa hasil pengurangan? Terima kasih, Raka, Salsa, Bima, Pak Joko, dan Pak Anto!";

const TUMPUKAN = ["kt0", "kt1", "kt2", "kt3", "kt4", "kt5"];
export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Raka menata kardus, Bu Mirna datang",
  sumber: "Materi: penutup dan jembatan ke Sub-Bab F",
  latar: "#FEFCE8",
  ketukan: [
    k(
      SUARA_I1,
      bersih(0),
      tambah(0, judul("Taruhan Raka"), ...tokoLatar("tk"), ...tokoh("rk", 34, 172, "Raka"), emo("lh", 60, 150, E.lelah, 16)),
      tambah("menata", ...kardusKosong("kt0", 100, 150), ...kardusKosong("kt1", 126, 150), ...kardusKosong("kt2", 152, 150)),
      tambah("kosong", ...kardusKosong("kt3", 113, 130), ...kardusKosong("kt4", 139, 130)),
      tambah("rapi.", ...kardusKosong("kt5", 126, 110), emo("kl", 138, 98, E.kilau, 18)),
    ),
    k(
      SUARA_I2,
      tambah(0, kotak("pt", 214, 46, 80, 122, "#BFDBFE", W.coklat, { rx: 3, tebal: 2, z: -1 }), teks("pb", 254, 64, "BUKA", 9, W.coklat, { z: 0 })),
      tambah("telur,", ...tokoh("bm", 268, 172, "Bu Mirna")),
      tambah("membawa", emo("tl", 242, 150, E.telur, 16)),
      tambah("keranjang.", emo("lb", 254, 90, E.lambai, 22)),
    ),
    k(
      SUARA_I3,
      hapus(0, ...TUMPUKAN.flatMap((t) => [t, `${t}-c`]), "kl", "lh"),
      tambah("Salsa,", ...tokoh("sl", 80, 172, "Salsa")),
      tambah("Bima,", ...tokoh("bi", 126, 172, "Bima")),
      tambah("Joko,", ...tokoh("pj", 172, 172, "Pak Joko")),
      tambah("Anto!", ...tokoh("pa", 218, 172, "Pak Anto"), emo("lm", 150, 140, E.lambai, 22)),
    ),
  ],
};
