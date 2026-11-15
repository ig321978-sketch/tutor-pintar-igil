import type { AdeganStory, Aksi } from "./logika-story";
import { W, benda, bola, emo, idPetak, judul, kartu, kotak, kotakBenda, lingkaranBiru, petaKotak, pusatPetak, teks } from "./k2b4A-gambar";
import { hapus, idx, k, redamkan, sorotkan, tambah, ubah } from "./k2b4A-bantu";

const nyala = (at: string | number | undefined, b: number, kol: number): Aksi => ubah(at, { id: idPetak(b, kol), sorot: true, warna: W.krem });
const padam = (at: string | number | undefined, b: number, kol: number): Aksi => ubah(at, { id: idPetak(b, kol), sorot: false, warna: W.putih });

/* ------------------------------ 10. Peta kotak dilihat dari atas ------------------------------ */
const SUARA_M1 = "Sekarang kita lihat peta dari atas. Peta ini punya sembilan petak.";
const SUARA_M2 = "Lingkaran biru ada di petak tengah.";
const SUARA_M3 = "Petak di atas lingkaran biru ada di baris pertama, kolom kedua.";
const SUARA_M4 = "Petak di bawah lingkaran biru ada di baris ketiga, kolom kedua.";
const SUARA_M5 = "Petak di kiri lingkaran biru ada di baris kedua, kolom pertama.";
const SUARA_M6 = "Petak di kanan lingkaran biru ada di baris kedua, kolom ketiga.";
const SUARA_M7 = "Sekarang lingkaran biru pindah ke baris ketiga, kolom pertama. Petak di atas lingkaran biru ada di baris kedua, kolom pertama. Tidak ada petak di kiri lingkaran biru.";

export const ADEGAN_PETA_KOTAK: AdeganStory = {
  id: "peta-kotak",
  judul: "Peta kotak dilihat dari atas",
  sumber: "Materi: peta kotak dari atas",
  latar: "#ECFEFF",
  ketukan: [
    k(SUARA_M1, tambah(0, judul("Peta dari atas")), tambah(idx(SUARA_M1, "petak."), ...petaKotak()), tambah(idx(SUARA_M1, "atas."), teks("dt", 150, 186, "dilihat dari atas", 10, W.ungu))),
    k(SUARA_M2, tambah(idx(SUARA_M2, "tengah."), lingkaranBiru(2, 2))),
    k(SUARA_M3, nyala(idx(SUARA_M3, "pertama,"), 1, 2)),
    k(SUARA_M4, padam(0, 1, 2), nyala(idx(SUARA_M4, "ketiga,"), 3, 2)),
    k(SUARA_M5, padam(0, 3, 2), nyala(idx(SUARA_M5, "kedua,"), 2, 1)),
    k(SUARA_M6, padam(0, 2, 1), nyala(idx(SUARA_M6, "ketiga."), 2, 3)),
    k(
      SUARA_M7,
      padam(0, 2, 3),
      ubah(idx(SUARA_M7, "pindah"), { id: "lb", x: pusatPetak(3, 1).x, y: pusatPetak(3, 1).y }),
      nyala(idx(SUARA_M7, "pertama.", 2), 2, 1),
    ),
  ],
};

/* ------------------------------ 11. Benda acuan sebagai patokan ------------------------------ */
const SUARA_A1 = "Untuk menyebut letak, pilih satu benda sebagai patokan. Di sini patokannya adalah pohon.";
const SUARA_A2 = "Burung ada di atas pohon. Letaknya lebih tinggi daripada pohon.";
const SUARA_A3 = "Kursi ada di sebelah kiri pohon.";
const SUARA_A4 = "Mobil-mobilan ada di sebelah kanan pohon.";
const SUARA_A5 = "Boneka ada di bawah pohon. Semua letak kita sebut dari patokan yang sama.";

export const ADEGAN_PATOKAN: AdeganStory = {
  id: "patokan",
  judul: "Benda acuan sebagai patokan",
  sumber: "Materi: benda acuan dan patokan",
  latar: "#F7FEE7",
  ketukan: [
    k(SUARA_A1, tambah(0, judul("Patokan")), tambah(idx(SUARA_A1, "pohon."), benda("pohon", 150, 104, 54), ...kartu("pk", 214, 150, 80, 22, W.emas, ["patokan"], 11)), sorotkan(idx(SUARA_A1, "pohon."), "ob-pohon")),
    k(SUARA_A2, redamkan(0, "ob-pohon"), tambah(idx(SUARA_A2, "Burung"), benda("burung", 150, 52, 32)), sorotkan(idx(SUARA_A2, "atas"), "ob-burung")),
    k(SUARA_A3, redamkan(0, "ob-burung"), tambah(idx(SUARA_A3, "Kursi"), benda("kursi", 62, 108, 36)), sorotkan(idx(SUARA_A3, "kiri"), "ob-kursi")),
    k(SUARA_A4, redamkan(0, "ob-kursi"), tambah(idx(SUARA_A4, "Mobil-mobilan"), benda("mobil", 238, 108, 34)), sorotkan(idx(SUARA_A4, "kanan"), "ob-mobil")),
    k(SUARA_A5, redamkan(0, "ob-mobil"), tambah(idx(SUARA_A5, "Boneka"), benda("boneka", 150, 164, 32)), sorotkan(idx(SUARA_A5, "bawah"), "ob-boneka"), sorotkan(idx(SUARA_A5, "patokan"), "ob-pohon")),
  ],
};

/* ------------------------------ 12. Menemukan benda dari dua petunjuk ------------------------------ */
const SUARA_G1 = "Sekarang kita bermain tebak. Ada sembilan benda di layar. Perhatikan letak tiap benda dengan teliti.";
const SUARA_G2 = "Petunjuk pertama, aku di atas ikan. Benda apa saja yang ada di atas ikan?";
const SUARA_G3 = "Burung ada di atas ikan, dan mobil-mobilan juga ada di atas ikan. Satu petunjuk belum cukup.";
const SUARA_G4 = "Petunjuk kedua, aku di sebelah kanan jam. Mobil-mobilan ada di sebelah kanan jam, dan boneka juga ada di sebelah kanan jam.";
const SUARA_G5 = "Hanya mobil-mobilan yang cocok dengan kedua petunjuk. Jadi aku adalah mobil-mobilan!";
/** Tiga kali tiga benda: baris 1 kupu, burung, bunga; baris 2 jam, mobil, boneka; baris 3 kursi, ikan, ayam. */
export const KISI_TEBAK: string[][] = [
  ["kupu", "burung", "bunga"],
  ["jam", "mobil", "boneka"],
  ["kursi", "ikan", "ayam"],
];
const XK = [90, 150, 210];
const YK = [56, 106, 156];
const semuaKisi = () => KISI_TEBAK.flatMap((baris, b) => baris.map((s, c) => benda(s, XK[c], YK[b], 30)));

export const ADEGAN_DUA_PETUNJUK: AdeganStory = {
  id: "dua-petunjuk",
  judul: "Menemukan benda dari dua petunjuk",
  sumber: "Materi: menebak dari dua petunjuk",
  latar: "#FDF4FF",
  ketukan: [
    k(SUARA_G1, tambah(0, judul("Tebak aku apa?"), kotak("gr", 62, 32, 176, 150, "#FFFBEB", W.abu, { rx: 8, z: -2 })), tambah(idx(SUARA_G1, "sembilan"), ...semuaKisi())),
    k(
      SUARA_G2,
      tambah(idx(SUARA_G2, "Petunjuk"), ...kartu("pt", 40, 178, 220, 22, W.krem, ["aku di atas ikan"], 10)),
      sorotkan(idx(SUARA_G2, "ikan."), "ob-ikan"),
      sorotkan(idx(SUARA_G2, "saja"), "ob-burung", "ob-mobil"),
    ),
    k(SUARA_G3, redamkan(0, "ob-ikan", "ob-burung", "ob-mobil"), sorotkan(idx(SUARA_G3, "Burung"), "ob-burung"), sorotkan(idx(SUARA_G3, "mobil-mobilan"), "ob-mobil")),
    k(
      SUARA_G4,
      redamkan(idx(SUARA_G4, "kedua,"), "ob-burung", "ob-mobil"),
      hapus(idx(SUARA_G4, "kedua,"), "pt-k", "pt-t0"),
      tambah(idx(SUARA_G4, "kedua,"), ...kartu("pu", 40, 178, 220, 22, W.krem, ["aku di sebelah kanan jam"], 10)),
      sorotkan(idx(SUARA_G4, "jam."), "ob-jam"),
      sorotkan(idx(SUARA_G4, "Mobil-mobilan"), "ob-mobil"),
      sorotkan(idx(SUARA_G4, "boneka"), "ob-boneka"),
    ),
    k(SUARA_G5, redamkan(0, "ob-jam", "ob-boneka"), sorotkan(idx(SUARA_G5, "cocok"), "ob-mobil"), tambah(idx(SUARA_G5, "adalah"), emo("ok", 178, 92, "✅", 16))),
  ],
};

/* ------------------------------ 13. Posisi setelah dipindah berurutan ------------------------------ */
const SUARA_D1 = "Sekarang bola akan dipindah-pindah. Awalnya bola ada di atas kotak.";
const SUARA_D2 = "Pindahkan bola ke sebelah kanan kotak. Sekarang bola ada di sebelah kanan kotak.";
const SUARA_D3 = "Pindahkan lagi bola ke bawah kotak. Sekarang bola ada di bawah kotak.";
const SUARA_D4 = "Di mana bola sekarang? Bola ada di bawah kotak. Itulah posisi terakhir bola.";
const SUARA_D5 = "Kalau bola dipindah ke sebelah kiri kotak, bola ada di sebelah kiri kotak.";
/** Pusat kotak dan tiga tempat bola berurutan: atas, kanan, bawah. */
export const PUSAT_DIPINDAH = { kotak: [150, 112], atas: [150, 62], kanan: [232, 112], bawah: [150, 164], kiri: [68, 112] };

export const ADEGAN_DIPINDAH: AdeganStory = {
  id: "dipindah",
  judul: "Posisi setelah dipindah",
  sumber: "Materi: posisi setelah dipindah",
  latar: "#FFF1F2",
  ketukan: [
    k(
      SUARA_D1,
      tambah(0, judul("Bola dipindah")),
      tambah(idx(SUARA_D1, "dipindah-pindah."), kotakBenda(PUSAT_DIPINDAH.kotak[0], PUSAT_DIPINDAH.kotak[1], 50, 40)),
      tambah(idx(SUARA_D1, "Awalnya"), bola(PUSAT_DIPINDAH.atas[0], PUSAT_DIPINDAH.atas[1], 13)),
    ),
    k(SUARA_D2, ubah(idx(SUARA_D2, "kanan"), { id: "ob-bola", x: PUSAT_DIPINDAH.kanan[0], y: PUSAT_DIPINDAH.kanan[1] }), sorotkan(idx(SUARA_D2, "Sekarang"), "ob-bola")),
    k(SUARA_D3, ubah(idx(SUARA_D3, "bawah"), { id: "ob-bola", x: PUSAT_DIPINDAH.bawah[0], y: PUSAT_DIPINDAH.bawah[1] })),
    k(SUARA_D4, redamkan(0, "ob-bola"), tambah(idx(SUARA_D4, "Itulah"), ...kartu("kal0", 60, 176, 180, 22, W.krem, ["bola di bawah kotak"], 9)), sorotkan(idx(SUARA_D4, "terakhir"), "ob-bola")),
    k(SUARA_D5, hapus(0, "kal0-k", "kal0-t0"), redamkan(0, "ob-bola"), ubah(idx(SUARA_D5, "kiri"), { id: "ob-bola", x: PUSAT_DIPINDAH.kiri[0], y: PUSAT_DIPINDAH.kiri[1] })),
  ],
};
