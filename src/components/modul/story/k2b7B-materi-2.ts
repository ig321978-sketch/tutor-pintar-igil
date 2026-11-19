import type { AdeganStory, Obj } from "./logika-story";
import { E, W, bulat, dinding, emo, ikatan, judul, kartu, mulutBuaya, panah, papanPS, papanTim, teks, tokoh } from "./k2b7B-gambar";
import { bersih, hapus, k, sorotkan, tambah, ubah } from "./k2b7B-bantu";

/*
 * Cerita orisinal IGIL "Pengumuman Bu Lia" (Kelas 2 Bab 7 Sub-Bab B), akhir cerita Bank Sampah Sekolah.
 * Naskah suara dari naskah/story-naskah-k2b7b.md. Bagian ini: puluhan sama lihat satuan, kata dan tanda perbandingan, mengurutkan tiga bilangan.
 */

/** Patch memindah kartu `${id}` (lebar w) ke x baru. */
const pindahKartu = (id: string, x: number, w: number): (Partial<Obj> & { id: string })[] => [
  { id: `${id}-k`, x },
  { id: `${id}-t0`, x: x + w / 2 },
];

/* ------------------------------ 4. Puluhan sama ------------------------------ */
const SUARA_S1 = "Nia membawa enam puluh tiga botol, Dika enam puluh delapan.";
const SUARA_S2 = "Keduanya punya enam puluhan. Karena puluhannya sama, kita lihat satuannya.";
const SUARA_S3 = "Delapan satuan lebih banyak dari tiga, jadi enam puluh delapan lebih besar.";

export const ADEGAN_PULUHAN_SAMA: AdeganStory = {
  id: "puluhan-sama",
  judul: "Puluhan sama, lihat satuan",
  sumber: "Materi: puluhan sama lihat satuan",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_S1,
      bersih(0),
      tambah(0, judul("Dua Papan Bilangan"), ...dinding("dn")),
      tambah("Nia", ...tokoh("ni", 62, 168, "Nia"), teks("nl", 75, 130, "Nia: 63", 10, W.ungu)),
      tambah("tiga", ...papanPS("pn", 40, 42, 6, 3), ...ikatan("in", 30, 92, 6, 3, 9)),
      tambah("Dika", ...tokoh("dk", 232, 168, "Dika"), teks("dl", 225, 130, "Dika: 68", 10, W.ungu)),
      tambah("delapan.", ...papanPS("pd", 190, 42, 6, 8), ...ikatan("id", 176, 92, 6, 8, 9)),
    ),
    k(
      SUARA_S2,
      sorotkan("enam", "pn-p", "pd-p"),
      tambah("puluhan.", ...kartu("ps", 104, 116, 92, 22, W.lavender, ["6 puluhan sama"], 9)),
      sorotkan("sama,", "ps-k"),
      ubah("satuannya.", { id: "pn-p", sorot: false }, { id: "pd-p", sorot: false }),
      sorotkan("satuannya.", "pn-s", "pd-s"),
    ),
    k(
      SUARA_S3,
      ubah(0, { id: "pn-s", sorot: false }, { id: "pd-s", sorot: false }),
      sorotkan("Delapan", "pd-s"),
      sorotkan("tiga,", "pn-s"),
      ubah("jadi", { id: "ps-t0", isi: "68 > 63" }, { id: "ps-k", warna: W.hijauMuda }),
      tambah("besar.", emo("ok", 282, 62, E.benar, 20)),
    ),
  ],
};

/* ------------------------------ 5. Kata dan tanda ------------------------------ */
const SUARA_T1 = "Ada tiga kata untuk membandingkan: lebih besar dari, lebih kecil dari, dan sama dengan.";
const SUARA_T2 = "Tujuh puluh empat lebih besar dari empat puluh tujuh. Empat puluh tujuh lebih kecil dari tujuh puluh empat.";
const SUARA_T3 = "Tanda perbandingan seperti mulut buaya, selalu terbuka ke arah bilangan yang lebih besar.";

export const ADEGAN_KATA_TANDA: AdeganStory = {
  id: "kata-tanda",
  judul: "Tiga kata dan tanda perbandingan",
  sumber: "Materi: kata dan tanda",
  latar: "#F5F3FF",
  ketukan: [
    k(
      SUARA_T1,
      bersih(0),
      tambah(0, judul("Kata Perbandingan"), ...dinding("dn")),
      tambah("tiga", teks("n3", 150, 42, "3 kata", 11, W.merah)),
      tambah("besar", ...kartu("w0", 10, 54, 86, 56, W.hijauMuda, ["lebih besar", "dari"], 9), teks("s0", 53, 134, ">", 26, W.hijau)),
      tambah("kecil", ...kartu("w1", 108, 54, 86, 56, W.merahMuda, ["lebih kecil", "dari"], 9), teks("s1", 151, 134, "<", 26, W.merah)),
      tambah("sama", ...kartu("w2", 206, 54, 86, 56, W.kuning, ["sama", "dengan"], 9), teks("s2", 249, 134, "=", 26, W.coklat)),
    ),
    k(
      SUARA_T2,
      hapus(0, "n3", "s0", "s1", "s2"),
      sorotkan("Tujuh", "w0-k"),
      tambah("besar", ...kartu("e0", 14, 140, 130, 26, W.hijauMuda, ["74 > 47"], 12)),
      ubah("besar", { id: "w0-k", sorot: false }),
      sorotkan("kecil", "w1-k"),
      tambah("kecil", ...kartu("e1", 156, 140, 130, 26, W.merahMuda, ["47 < 74"], 12)),
    ),
    k(
      SUARA_T3,
      bersih(0),
      tambah(0, judul("Mulut Buaya"), ...dinding("dn")),
      tambah("mulut", ...mulutBuaya("bu", 150, 96, "kanan", 2.4)),
      tambah("buaya,", teks("bk", 150, 150, "tanda > selalu terbuka ke yang besar", 9, W.hijau)),
      tambah("terbuka", panah("pa", 128, 128, -52, -24, W.merah, 2.4)),
      tambah("bilangan", teks("b74", 62, 100, "74", 22, W.biru), teks("b47", 238, 100, "47", 22, W.biru)),
      sorotkan("besar.", "b74"),
      tambah("besar.", emo("ok", 62, 66, E.benar, 20)),
    ),
  ],
};

/* ------------------------------ 6. Urutkan ------------------------------ */
const SUARA_U1 = "Tim Hijau punya lima puluh delapan botol. Ada tiga bilangan: empat puluh tujuh, tujuh puluh empat, lima puluh delapan.";
const SUARA_U2 = "Bandingkan puluhannya. Empat puluh tujuh paling kecil, dan tujuh puluh empat paling besar.";
const SUARA_U3 = "Urutan dari yang paling kecil: empat puluh tujuh, lima puluh delapan, tujuh puluh empat.";

export const ADEGAN_URUTKAN: AdeganStory = {
  id: "urutkan",
  judul: "Mengurutkan tiga bilangan",
  sumber: "Materi: mengurutkan bilangan",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_U1,
      bersih(0),
      tambah(0, judul("Tiga Papan Tim"), ...dinding("dn"), ...tokoh("bl", 40, 168, "Bu Lia")),
      tambah("Hijau", ...papanTim("ph", 106, 44, 88, "Tim Hijau", 58, W.hijauTim)),
      tambah("tiga", teks("n3", 170, 134, "3 bilangan", 11, W.merah)),
      tambah("empat", ...papanTim("pb", 8, 44, 88, "Tim Biru", 47, W.biruTim)),
      tambah("empat@2", ...papanTim("pk", 204, 44, 88, "Tim Kuning", 74, W.kuningTim)),
    ),
    k(
      SUARA_U2,
      hapus(0, "n3"),
      tambah("puluhannya.", teks("d4", 52, 110, "4 puluhan", 10, W.biru), teks("d5", 150, 110, "5 puluhan", 10, W.biru), teks("d7", 248, 110, "7 puluhan", 10, W.biru)),
      sorotkan("kecil,", "pb-k"),
      tambah("kecil,", teks("kc", 52, 130, "paling kecil", 9, W.hijau)),
      sorotkan("besar.", "pk-k"),
      tambah("besar.", teks("bs", 248, 130, "paling besar", 9, W.merah)),
    ),
    k(
      SUARA_U3,
      bersih(0),
      tambah(0, judul("Dari Kecil ke Besar"), ...dinding("dn")),
      tambah(0, ...kartu("u0", 112, 60, 76, 44, W.biruTim, ["47"], 18), ...kartu("u1", 200, 60, 76, 44, W.hijauTim, ["58"], 18), ...kartu("u2", 24, 60, 76, 44, W.kuningTim, ["74"], 18)),
      tambah("kecil:", panah("pa", 28, 134, 244, 0, W.ungu, 2.6), teks("kc", 50, 154, "paling kecil", 9, W.hijau), teks("bs", 252, 154, "paling besar", 9, W.merah)),
      /* Tiga kartu bergeser serentak di awal supaya tidak sempat bertumpuk lama. */
      ubah("kecil:", ...pindahKartu("u0", 24, 76), ...pindahKartu("u1", 112, 76), ...pindahKartu("u2", 200, 76)),
      sorotkan("empat@2", "u2-k"),
      tambah("empat@2", bulat("tt", 150, 184, 5, W.hijau, W.biru)),
    ),
  ],
};
