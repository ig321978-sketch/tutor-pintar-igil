import type { AdeganStory, Obj } from "./logika-story";
import { BUAH, HEWAN, MAINAN, W, diagram, emo, judul, kartu, kotak, teks, turus } from "./k1b8B-gambar";
import { DM } from "./k1b8B-materi-2";
import { bersih, hapus, idx, k, redamkan, sorotHitung, sorotkan, tambah, ubah, urutBilangan } from "./k1b8B-bantu";

/* ------------------------------ 11. Paling banyak dan paling sedikit ------------------------------ */
const SUARA_A1 = "Ayo bandingkan data mainan di diagram ini.";
const SUARA_A2 = "Lihat kolom yang paling tinggi. Bola paling banyak, ada enam gambar.";
const SUARA_A3 = "Sekarang lihat kolom yang paling pendek. Boneka paling sedikit, hanya tiga gambar.";
const SUARA_A4 = "Paling banyak berarti jumlahnya terbesar. Paling sedikit berarti jumlahnya terkecil.";
const SUARA_A5 = "Mobil ada di tengah, empat gambar. Mobil tidak paling banyak, dan tidak paling sedikit.";

export const ADEGAN_PALING: AdeganStory = {
  id: "paling-banyak",
  judul: "Paling banyak dan paling sedikit",
  sumber: "Materi: paling banyak, paling sedikit",
  latar: "#FEFCE8",
  ketukan: [
    k(SUARA_A1, tambah(0, ...DM.semua)),
    k(SUARA_A2, sorotkan("Bola", ...DM.idGambar(0))),
    k(SUARA_A3, redamkan(0, ...DM.idGambar(0)), sorotkan("Boneka", ...DM.idGambar(2))),
    k(SUARA_A4, redamkan(0, ...DM.idGambar(2)), tambah("Paling", ...kartu("pk", 120, 28, 172, 34, W.emas, ["paling banyak: terbesar", "paling sedikit: terkecil"], 8.6))),
    k(SUARA_A5, hapus(0, "pk-k", "pk-t0", "pk-t1"), sorotkan("Mobil", ...DM.idGambar(1))),
  ],
};

/* ------------------------------ 12. Lebih banyak dan selisih ------------------------------ */
const SUARA_L1 = "Sekarang kita bandingkan dua kolom, bola dan boneka.";
const SUARA_L2 = "Kolom bola lebih tinggi daripada kolom boneka. Jadi bola lebih banyak dari boneka.";
const SUARA_L3 = "Berapa lebihnya? Hitung gambar bola yang tidak punya pasangan boneka. Satu, dua, tiga.";
const SUARA_L4 = "Bola lebih banyak tiga dari boneka. Boneka lebih sedikit tiga dari bola. Lebihnya disebut selisih.";
const SUARA_L5 = "Sekarang mobil dan boneka. Mobil lebih banyak satu dari boneka.";

export const ADEGAN_LEBIH: AdeganStory = {
  id: "lebih-banyak",
  judul: "Lebih banyak dan selisih",
  sumber: "Materi: lebih banyak, lebih sedikit, selisih",
  latar: "#FEF2F2",
  ketukan: [
    k(SUARA_L1, tambah(0, ...DM.semua), sorotkan("bola", ...DM.idGambar(0)), sorotkan("boneka.", ...DM.idGambar(2))),
    k(SUARA_L2, tambah("Jadi", ...kartu("lb", 170, 34, 122, 22, W.hijauMuda, ["bola lebih banyak"], 8.8))),
    k(SUARA_L3, redamkan(0, ...DM.idGambar(0), ...DM.idGambar(2)), ...sorotHitung(SUARA_L3, ["mtg0_3", "mtg0_4", "mtg0_5"], { setelah: "boneka." })),
    k(SUARA_L4, hapus(0, "lb-k", "lb-t0"), tambah("Lebihnya", ...kartu("sl", 170, 34, 122, 22, W.emas, ["selisih: 3"], 10))),
    k(SUARA_L5, redamkan(0, "mtg0_3", "mtg0_4", "mtg0_5"), hapus(0, "sl-k", "sl-t0"), sorotkan("Mobil", "mtg1_3"), tambah("lebih", ...kartu("sm", 170, 34, 122, 22, W.emas, ["selisih: 1"], 10))),
  ],
};

/* ------------------------------ 13. Sama banyak ------------------------------ */
const DB = diagram("bu", "datar", BUAH, "Buah Kesukaan", "anak");
const SUARA_S1 = "Ini diagram buah kesukaan. Lihat baris apel dan baris jeruk.";
const SUARA_S2 = "Apel ada empat gambar. Jeruk ada empat gambar. Pisang ada dua gambar.";
const SUARA_S3 = "Apel dan jeruk sama banyak, karena barisnya sama panjang.";
const SUARA_S4 = "Pisang lebih sedikit dari apel dan jeruk. Pisang paling sedikit.";
const SUARA_S5 = "Kalau dua baris sama panjang, berarti jumlahnya sama banyak.";

export const ADEGAN_SAMA: AdeganStory = {
  id: "sama-banyak",
  judul: "Sama banyak",
  sumber: "Materi: sama banyak",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_S1, tambah(0, ...DB.dasar), tambah("apel", DB.label(0)), tambah("jeruk.", DB.label(1)), tambah(0, DB.label(2))),
    k(SUARA_S2, tambah(idx(SUARA_S2, "empat", 1), ...DB.gambar(0)), tambah(idx(SUARA_S2, "empat", 2), ...DB.gambar(1)), tambah("dua", ...DB.gambar(2))),
    k(SUARA_S3, sorotkan("Apel", ...DB.idGambar(0), ...DB.idGambar(1))),
    k(SUARA_S4, redamkan(0, ...DB.idGambar(0), ...DB.idGambar(1)), sorotkan("Pisang", ...DB.idGambar(2))),
    k(SUARA_S5, redamkan(0, ...DB.idGambar(2)), tambah("Kalau", ...kartu("sb", 30, 140, 240, 22, W.emas, ["sama panjang = sama banyak"], 10))),
  ],
};

/* ------------------------------ 14. Jumlah semua data ------------------------------ */
const URUT_GAMBAR = MAINAN.flatMap((_, c) => DM.idGambar(c));
const SUARA_J1 = "Sekarang kita cari jumlah semua data. Kita hitung semua gambar di diagram.";
const SUARA_J2 = "Bola enam, mobil empat, boneka tiga.";
const SUARA_J3 = "Kita gabungkan. Enam dan empat jadi sepuluh. Sepuluh dan tiga jadi tiga belas.";
const SUARA_J4 = "Jumlah semuanya tiga belas. Ada tiga belas anak yang memilih mainan.";
const SUARA_J5 = "Kita periksa dengan menghitung semua gambar. Satu, dua, tiga, empat, lima, enam, tujuh, delapan, sembilan, sepuluh, sebelas, dua belas, tiga belas.";
const SUARA_J6 = "Hasilnya sama, tiga belas. Jadi jumlah semuanya tiga belas.";
const hitungSemua = (): ReturnType<typeof ubah>[] => {
  const pos = urutBilangan(SUARA_J5, 1, 13, "gambar.");
  return URUT_GAMBAR.flatMap((id, q) => [sorotkan(pos[q], id), ubah(pos[q], { id: "cn", isi: String(q + 1) })]);
};

export const ADEGAN_JUMLAH: AdeganStory = {
  id: "jumlah-semua",
  judul: "Jumlah semua data",
  sumber: "Materi: jumlah semua data",
  latar: "#F0F9FF",
  ketukan: [
    k(SUARA_J1, tambah(0, ...DM.semua)),
    k(SUARA_J2, tambah("Bola", DM.angka(0)), tambah("mobil", DM.angka(1)), tambah("boneka", DM.angka(2))),
    k(SUARA_J3, tambah("sepuluh.", teks("j1", 225, 40, "6 + 4 = 10", 10, W.coklat)), tambah(idx(SUARA_J3, "belas."), teks("j2", 225, 56, "10 + 3 = 13", 10, W.coklat))),
    k(SUARA_J4, hapus(0, "j1", "j2"), tambah("Jumlah", teks("jt", 225, 40, "jumlah: 13", 10.6, W.merah))),
    k(SUARA_J5, hapus(0, "jt"), tambah("Kita", teks("cn", 150, 56, "0", 14, W.merah)), ...hitungSemua()),
    k(SUARA_J6, redamkan(0, ...URUT_GAMBAR), tambah("Jadi", ...kartu("jh", 180, 34, 108, 22, W.hijauMuda, ["jumlah: 13"], 10))),
  ],
};

/* ------------------------------ 15. Data di layar: pilihan hewan ------------------------------ */
const TOKOH = ["Malosi", "Kira", "Upe", "Wei", "Halim", "Igil"];
const PILIH = [HEWAN[0].emo, HEWAN[1].emo, HEWAN[0].emo, HEWAN[2].emo, HEWAN[0].emo, HEWAN[1].emo];
const KX = [8, 106, 204];
const KY = [44, 112];
const kartuTokoh = (i: number): Obj[] => {
  const x = KX[i % 3];
  const y = KY[Math.floor(i / 3)];
  return [kotak(`pk${i}`, x, y, 88, 56, [W.hijauMuda, W.pink, W.langit][i % 3], W.biru, { rx: 8 }), teks(`pn${i}`, x + 44, y + 14, TOKOH[i], 9.6), teks(`pe${i}`, x + 44, y + 46, "?", 22, W.merah)];
};
export const TR2 = turus("hw", HEWAN, "Hewan Kesukaan");
const SUARA_H1 = "Malosi, Kira, Upe, Wei, Halim, dan Igil memilih hewan kesukaan di layar.";
const SUARA_H2 = "Malosi memilih kucing. Kira memilih kelinci. Upe memilih kucing.";
const SUARA_H3 = "Wei memilih ikan. Halim memilih kucing. Igil memilih kelinci.";
const SUARA_H4 = "Sekarang kita catat dengan turus. Kucing ada tiga, kelinci ada dua, dan ikan ada satu.";
const SUARA_H5 = "Jumlah semuanya enam, sama dengan banyaknya anak yang memilih.";
const NAMA_AT = ["Malosi,", "Kira,", "Upe,", "Wei,", "Halim,", "Igil"];

export const ADEGAN_PILIHAN: AdeganStory = {
  id: "pilihan-hewan",
  judul: "Data hewan kesukaan di layar",
  sumber: "Materi: data pilihan di layar",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_H1, tambah(0, judul("Hewan kesukaan")), ...TOKOH.map((_, i) => tambah(NAMA_AT[i], ...kartuTokoh(i)))),
    k(SUARA_H2, ubah("kucing.", { id: "pe0", isi: PILIH[0], u: 26 }), ubah("kelinci.", { id: "pe1", isi: PILIH[1], u: 26 }), ubah(idx(SUARA_H2, "kucing", 2), { id: "pe2", isi: PILIH[2], u: 26 })),
    k(SUARA_H3, ubah("ikan.", { id: "pe3", isi: PILIH[3], u: 26 }), ubah(idx(SUARA_H3, "kucing"), { id: "pe4", isi: PILIH[4], u: 26 }), ubah(idx(SUARA_H3, "kelinci."), { id: "pe5", isi: PILIH[5], u: 26 })),
    k(
      SUARA_H4,
      bersih(0),
      tambah(0, TR2.jd),
      tambah("Kucing", TR2.label(0)),
      tambah(idx(SUARA_H4, "tiga"), ...TR2.goresan(0), TR2.angka(0)),
      tambah("kelinci", TR2.label(1)),
      tambah(idx(SUARA_H4, "dua"), ...TR2.goresan(1), TR2.angka(1)),
      tambah("ikan", TR2.label(2)),
      tambah(idx(SUARA_H4, "satu"), ...TR2.goresan(2), TR2.angka(2)),
    ),
    k(SUARA_H5, tambah("Jumlah", teks("jm", 150, 166, "3 + 2 + 1 = 6", 13, W.coklat))),
  ],
};

/* ------------------------------ 16. Diagram gambar dari data hewan ------------------------------ */
const DH = diagram("hx", "datar", HEWAN, "Hewan Kesukaan", "anak");
const SUARA_Z1 = "Sekarang kita buat diagram gambar dari data hewan tadi.";
const SUARA_Z2 = "Kucing ada tiga, jadi tiga gambar kucing. Kelinci ada dua, jadi dua gambar kelinci.";
const SUARA_Z3 = "Ikan ada satu, jadi satu gambar ikan.";
const SUARA_Z4 = "Kucing paling banyak, dan ikan paling sedikit. Kelinci lebih banyak satu dari ikan.";
const SUARA_Z5 = "Diagram ini kita baca dengan cara yang sama. Satu gambar sama dengan satu anak.";

export const ADEGAN_DIAGRAM_HEWAN: AdeganStory = {
  id: "diagram-hewan",
  judul: "Diagram gambar hewan kesukaan",
  sumber: "Materi: membuat diagram dari data",
  latar: "#F0FDFA",
  ketukan: [
    k(SUARA_Z1, tambah(0, ...DH.dasar)),
    k(SUARA_Z2, tambah("Kucing", DH.label(0)), tambah(idx(SUARA_Z2, "tiga"), ...DH.gambar(0)), tambah("Kelinci", DH.label(1)), tambah(idx(SUARA_Z2, "dua"), ...DH.gambar(1))),
    k(SUARA_Z3, tambah("Ikan", DH.label(2)), tambah("satu", ...DH.gambar(2))),
    k(SUARA_Z4, sorotkan("Kucing", ...DH.idGambar(0)), sorotkan("ikan", ...DH.idGambar(2)), tambah("Kelinci", ...kartu("zk", 120, 160, 172, 22, W.emas, ["kelinci lebih banyak satu"], 9))),
    k(SUARA_Z5, redamkan(0, ...DH.idGambar(0), ...DH.idGambar(2)), tambah("Diagram", emo("ow", 262, 110, "\u{1F989}", 30))),
  ],
};
