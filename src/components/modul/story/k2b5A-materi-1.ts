import type { AdeganStory } from "./logika-story";
import { W, anak, bendaBagi, emo, hasilBagi, jalur, judul, kartu, labelBagian, lingkaranPoli, persegiPanjang, rapatkan, tarik, teks, titikTengah } from "./k2b5A-gambar";
import type { Titik } from "./k2b5A-gambar";
import { bersih, hapus, idx, k, redamkan, sorotkan, tambah, ubah } from "./k2b5A-bantu";

/** Martabak: lingkaran berpusat di (150, 92) berjari-jari 44. Titik atas dan bawah lingkaran menjadi ujung garis potong tegak di tengah. */
export const POLI_MARTABAK = lingkaranPoli(150, 92, 44);
const ATAS = POLI_MARTABAK[30];
const BAWAH = POLI_MARTABAK[10];
const WARNA_MARTABAK = "#FBBF24";
/** Posisi baru bagian dan tulisan setelah ditarik (nama sama, hanya koordinat dan isi yang berubah). */
const geserLabel = (poli: Titik[], a: Titik, b: Titik, isiA: string, isiB: string, jarak: number) => labelBagian(1, poli, a, b, isiA, isiB, jarak).map((o) => ({ id: o.id, x: o.x, y: o.y, isi: o.isi }));

/* ------------------------------ 2. Martabak Kira dan Malosi ------------------------------ */
const SUARA_C1 = "Hari ini Kira punya satu martabak manis di layar. Baunya harum sekali. Martabak itu masih utuh.";
const SUARA_C2 = "Malosi datang menghampiri Kira. Kira ingin berbagi martabak itu dengan Malosi.";
const SUARA_C3 = "Kira ingin membaginya dengan adil. Adil artinya kedua bagian sama besar.";
const SUARA_C4 = "Kalau satu bagian lebih besar, ada yang mendapat lebih sedikit. Itu tidak adil.";
const SUARA_C5 = "Jadi, bagaimana cara membagi martabak ini menjadi dua bagian yang sama? Kita pakai garis potong di layar.";

export const ADEGAN_CERITA_MARTABAK: AdeganStory = {
  id: "cerita-martabak",
  judul: "Martabak Kira dan Malosi",
  sumber: "Materi: martabak Kira dan Malosi",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_C1,
      tambah(0, judul("Martabak Kira")),
      tambah(idx(SUARA_C1, "martabak"), jalur("bn1-w", lingkaranPoli(150, 84, 40), WARNA_MARTABAK, { tebal: 2.2 })),
      tambah(idx(SUARA_C1, "utuh."), teks("nm", 150, 142, "martabak manis", 9.6, W.coklat)),
    ),
    k(SUARA_C2, tambah(idx(SUARA_C2, "Malosi"), ...anak("malosi", 254, 64)), tambah(idx(SUARA_C2, "Kira."), ...anak("kira", 46, 64))),
    k(SUARA_C3, tambah(idx(SUARA_C3, "Adil"), ...kartu("ad", 50, 164, 200, 26, W.emas, ["adil: sama besar"], 11))),
    k(SUARA_C4, hapus(idx(SUARA_C4, "Itu"), "ad-k", "ad-t0"), tambah(idx(SUARA_C4, "Itu"), teks("ta", 150, 176, "tidak adil", 12, W.merah))),
    k(SUARA_C5, hapus(0, "ta"), tambah(idx(SUARA_C5, "bagaimana"), emo("tn", 150, 98, "❓", 34)), tambah(idx(SUARA_C5, "garis"), ...kartu("gl", 40, 164, 220, 26, W.langit, ["garis potong di layar"], 11))),
  ],
};

/* ------------------------------ 3. Dua bagian sama besar ------------------------------ */
const M1 = bendaBagi(1, POLI_MARTABAK, ATAS, BAWAH, WARNA_MARTABAK);
const SUARA_B1 = "Sekarang kita bagi martabak ini. Satu garis potong lewat tepat di tengah.";
const SUARA_B2 = "Garis potong itu membuat martabak menjadi dua bagian. Ada bagian kiri dan bagian kanan.";
const SUARA_B3 = "Lihat, kedua bagian sama besar. Tidak ada yang lebih besar dan tidak ada yang lebih kecil.";
const SUARA_B4 = "Setiap bagian yang sama besar ini kita sebut setengah.";
const SUARA_B5 = "Kira mendapat satu bagian, yaitu setengah martabak. Malosi juga mendapat setengah martabak.";
const SUARA_B6 = "Cara menyebut bagian dari benda utuh seperti ini disebut pecahan.";

export const ADEGAN_DUA_BAGIAN: AdeganStory = {
  id: "dua-bagian",
  judul: "Dua bagian sama besar",
  sumber: "Materi: dua bagian sama besar",
  latar: "#FEFCE8",
  ketukan: [
    k(SUARA_B1, tambah(0, judul("Dua bagian sama besar")), tambah(idx(SUARA_B1, "martabak"), M1.w), tambah(idx(SUARA_B1, "garis"), M1.gp, titikTengah(1, POLI_MARTABAK))),
    k(
      SUARA_B2,
      hapus(idx(SUARA_B2, "membuat"), "bn1-w"),
      tambah(idx(SUARA_B2, "membuat"), M1.a, M1.b),
      sorotkan(idx(SUARA_B2, "kiri"), "bn1-a"),
      redamkan(idx(SUARA_B2, "bagian", 3), "bn1-a"),
      sorotkan(idx(SUARA_B2, "kanan"), "bn1-b"),
    ),
    k(SUARA_B3, redamkan(0, "bn1-b"), ubah(idx(SUARA_B3, "kedua"), ...tarik(1, ATAS, BAWAH, 7)), tambah(idx(SUARA_B3, "besar."), hasilBagi(1, 150, 172, "sama besar"))),
    k(
      SUARA_B4,
      tambah(idx(SUARA_B4, "sebut"), ...labelBagian(1, POLI_MARTABAK, ATAS, BAWAH, "setengah", "setengah", 7)),
      ubah(idx(SUARA_B4, "setengah."), { id: "bn1-hs", isi: "setengah" }),
    ),
    k(SUARA_B5, tambah(idx(SUARA_B5, "Kira"), teks("nk", 112, 156, "Kira", 9.6, W.ungu)), tambah(idx(SUARA_B5, "Malosi"), teks("nl", 188, 156, "Malosi", 9.6, W.ungu))),
    k(SUARA_B6, bersih(idx(SUARA_B6, "disebut")), tambah(idx(SUARA_B6, "disebut"), judul("Pecahan"), ...kartu("pc", 75, 70, 150, 40, W.emas, ["pecahan"], 16), emo("ow", 150, 150, "\u{1F989}", 30))),
  ],
};

/* ------------------------------ 4. Bagian tidak sama besar bukan setengah ------------------------------ */
const ATAS_GESER: Titik = [124, 40];
const BAWAH_GESER: Titik = [124, 150];
const M2 = bendaBagi(1, POLI_MARTABAK, ATAS_GESER, BAWAH_GESER, WARNA_MARTABAK);
const SUARA_G1 = "Sekarang garis potong tidak lewat di tengah martabak. Garis itu bergeser ke kiri.";
const SUARA_G2 = "Martabak menjadi dua bagian lagi. Tetapi bagian kiri kecil dan bagian kanan besar.";
const SUARA_G3 = "Dua bagian ini tidak sama besar. Jadi ini bukan setengah.";
const SUARA_G4 = "Hanya bagian yang sama besar yang boleh disebut setengah. Walaupun jumlah bagiannya dua, ini bukan setengah.";
const SUARA_G5 = "Kalau garis potong digeser ke tengah martabak, kedua bagian jadi sama besar. Sekarang tiap bagian bernilai setengah.";
const T7 = tarik(1, ATAS, BAWAH, 7);

export const ADEGAN_TIDAK_SAMA: AdeganStory = {
  id: "tidak-sama",
  judul: "Bagian tidak sama besar",
  sumber: "Materi: bagian tidak sama besar",
  latar: "#FEF2F2",
  ketukan: [
    k(SUARA_G1, tambah(0, judul("Garis tidak di tengah")), tambah(idx(SUARA_G1, "martabak"), M2.w), tambah(idx(SUARA_G1, "garis"), M2.gp, titikTengah(1, POLI_MARTABAK))),
    k(
      SUARA_G2,
      hapus(idx(SUARA_G2, "menjadi"), "bn1-w"),
      tambah(idx(SUARA_G2, "menjadi"), M2.a, M2.b),
      tambah(idx(SUARA_G2, "kecil"), ...labelBagian(1, POLI_MARTABAK, ATAS_GESER, BAWAH_GESER, "kecil", "besar", 0)),
    ),
    k(
      SUARA_G3,
      ubah(idx(SUARA_G3, "tidak"), ...tarik(1, ATAS_GESER, BAWAH_GESER, 7), ...geserLabel(POLI_MARTABAK, ATAS_GESER, BAWAH_GESER, "kecil", "besar", 7)),
      tambah(idx(SUARA_G3, "setengah."), hasilBagi(1, 150, 172, "bukan setengah")),
    ),
    k(SUARA_G4, hapus(0, "bn1-hs"), tambah(idx(SUARA_G4, "Hanya"), ...kartu("hk", 50, 160, 200, 28, W.emas, ["harus sama besar"], 12))),
    k(
      SUARA_G5,
      hapus(0, "hk-k", "hk-t0"),
      ubah(
        idx(SUARA_G5, "Sekarang"),
        { id: "bn1-a", d: M1.a.d, x: T7[0].x, y: T7[0].y },
        { id: "bn1-b", d: M1.b.d, x: T7[1].x, y: T7[1].y },
        { id: "bn1-gp", x: M1.gp.x, y: M1.gp.y, x2: M1.gp.x2, y2: M1.gp.y2 },
        ...geserLabel(POLI_MARTABAK, ATAS, BAWAH, "setengah", "setengah", 7),
      ),
      tambah(idx(SUARA_G5, "Sekarang"), hasilBagi(1, 150, 172, "setengah")),
    ),
  ],
};

/* ------------------------------ 5. Dua setengah menjadi satu utuh ------------------------------ */
export const POLI_BOLU = persegiPanjang(70, 62, 160, 72);
const BOLU_ATAS: Titik = [150, 50];
const BOLU_BAWAH: Titik = [150, 146];
const M3 = bendaBagi(1, POLI_BOLU, BOLU_ATAS, BOLU_BAWAH, "#FDE68A", "#FCA5A5", "#93C5FD");
const SUARA_U1 = "Igil menunjukkan satu kue bolu di layar. Kue bolu ini masih utuh.";
const SUARA_U2 = "Garis potong membagi kue bolu menjadi dua bagian sama besar.";
const SUARA_U3 = "Setiap bagian adalah setengah kue bolu.";
const SUARA_U4 = "Sekarang kita satukan dua setengah ini lagi.";
const SUARA_U5 = "Dua setengah disatukan menjadi satu kue bolu utuh.";
const SUARA_U6 = "Jadi dua setengah sama dengan satu utuh.";

export const ADEGAN_DUA_UTUH: AdeganStory = {
  id: "dua-utuh",
  judul: "Dua setengah menjadi satu utuh",
  sumber: "Materi: dua setengah menjadi satu utuh",
  latar: "#FFFBEB",
  ketukan: [
    k(SUARA_U1, tambah(0, judul("Dua setengah jadi utuh")), tambah(idx(SUARA_U1, "kue"), M3.w), tambah(idx(SUARA_U1, "utuh."), teks("nm", 150, 160, "kue bolu", 10, W.coklat))),
    k(SUARA_U2, tambah(idx(SUARA_U2, "Garis"), M3.gp), hapus(idx(SUARA_U2, "menjadi"), "bn1-w"), tambah(idx(SUARA_U2, "menjadi"), M3.a, M3.b)),
    k(
      SUARA_U3,
      hapus(0, "nm"),
      ubah(idx(SUARA_U3, "bagian"), ...tarik(1, BOLU_ATAS, BOLU_BAWAH, 9)),
      tambah(idx(SUARA_U3, "setengah"), ...labelBagian(1, POLI_BOLU, BOLU_ATAS, BOLU_BAWAH, "setengah", "setengah", 9)),
    ),
    k(SUARA_U4, hapus(idx(SUARA_U4, "satukan"), "bn1-gp"), ubah(idx(SUARA_U4, "satukan"), ...rapatkan(1), ...geserLabel(POLI_BOLU, BOLU_ATAS, BOLU_BAWAH, "setengah", "setengah", 0))),
    k(SUARA_U5, tambah(idx(SUARA_U5, "utuh."), M3.w, teks("nu", 150, 160, "satu kue bolu utuh", 10, W.coklat))),
    k(SUARA_U6, hapus(0, "nu"), tambah(idx(SUARA_U6, "Jadi"), ...kartu("sm", 40, 152, 220, 30, W.emas, ["setengah + setengah = utuh"], 10.5))),
  ],
};
