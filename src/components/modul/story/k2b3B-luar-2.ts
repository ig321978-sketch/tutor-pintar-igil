import type { AdeganStory, Obj } from "./logika-story";
import { OWL, W, WARNA_KEPING, bg, emo, hasilHitung, judul, kartu, pusat, tangram, teks, angkaKeping, type Titik } from "./k2b3B-gambar";
import { bersih, hapus, idx, k, pilihKata, redamkan, sorotkan, tambah, ubah, urutBilangan } from "./k2b3B-bantu";
import { NAMA_METODE_ID, WARNA_METODE, kepala } from "./k2b3B-luar-1";

/** Tujuh keping tangram pada persegi berpojok kiri-atas (110, 56); sisi persegi 80. */
export const TANGRAM = tangram(110, 56);
const PUSAT_PERSEGI = { x: 150, y: 96 };
/** Geseran keluar tiap keping dari pusat persegi (60 persen jarak pusat keping) supaya ketujuh keping terpisah. */
export const GESER_TANGRAM = TANGRAM.map((t) => {
  const c = pusat(t.pts);
  return { x: Math.round((c.x - PUSAT_PERSEGI.x) * 0.6), y: Math.round((c.y - PUSAT_PERSEGI.y) * 0.6) };
});
const keping = (i: number, o: Partial<Obj> = {}): Obj => bg(TANGRAM[i].id, TANGRAM[i].pts, WARNA_KEPING[i % WARNA_KEPING.length], { z: 1, ...o });
const geserPts = (i: number): Titik[] => TANGRAM[i].pts.map((p) => ({ x: p.x + GESER_TANGRAM[i].x, y: p.y + GESER_TANGRAM[i].y }));
const semua = TANGRAM.map((_, i) => i);
const hasil = (id: string, pts: Titik[]): Obj => bg(id, pts, "none", { tebal: 2.4, z: 2 });

/* ------------------------------ 6. Tangram: tujuh keping ------------------------------ */
const SUARA_G1 = "Metode ketiga bernama Tangram. Tangram adalah permainan menyusun bangun datar.";
const SUARA_G2 = "Satu persegi besar diurai menjadi tujuh keping.";
const SUARA_G3 = "Hitung kepingnya: satu, dua, tiga, empat, lima, enam, tujuh.";
const SUARA_G4 = "Ada lima segitiga, satu persegi, dan satu segi empat yang miring.";
const SUARA_G5 = "Segitiganya punya tiga ukuran: dua besar, satu sedang, dan dua kecil.";
const POS_G3 = urutBilangan(SUARA_G3, 1, 7, "kepingnya:");
const UKURAN: [number, string, string][] = [
  [0, "besar", "besar"],
  [1, "besar", "besar"],
  [2, "sedang", "sedang"],
  [5, "kecil", "kecil"],
  [6, "kecil", "kecil"],
];

export const ADEGAN_LUAR_TANGRAM: AdeganStory = {
  id: "luar-tangram",
  judul: "Tangram: satu persegi, tujuh keping",
  sumber: "Metode luar: Tangram",
  latar: "#FDF2F8",
  ketukan: [
    k(SUARA_G1, tambah(0, ...kepala(2)), tambah(idx(SUARA_G1, "permainan"), ...semua.map((i) => keping(i)))),
    k(SUARA_G2, ...semua.map((i) => ubah(idx(SUARA_G2, "diurai"), { id: TANGRAM[i].id, x: GESER_TANGRAM[i].x, y: GESER_TANGRAM[i].y }))),
    k(SUARA_G3, ...semua.map((i) => tambah(POS_G3[i], angkaKeping(i, geserPts(i), String(i + 1), 9)))),
    k(SUARA_G4, sorotkan(idx(SUARA_G4, "lima"), "kp0", "kp1", "kp2", "kp5", "kp6"), redamkan(idx(SUARA_G4, "persegi,"), "kp0", "kp1", "kp2", "kp5", "kp6"), sorotkan(idx(SUARA_G4, "persegi,"), "kp4"), redamkan(idx(SUARA_G4, "empat"), "kp4"), sorotkan(idx(SUARA_G4, "empat"), "kp3"), tambah(idx(SUARA_G4, "miring."), hasilHitung("5 segitiga + 2 segi empat", 182, 10.4))),
    k(SUARA_G5, redamkan(idx(SUARA_G5, "Segitiganya"), "kp4"), hapus(idx(SUARA_G5, "Segitiganya"), ...semua.map((i) => `kn${i}`)), ...UKURAN.map(([i, nama, pemicu], q) => tambah(idx(SUARA_G5, pemicu), teks(`uk${q}`, pusat(geserPts(i)).x, pusat(geserPts(i)).y + 2.5, nama, 7, W.ungu, { z: 7 })))),
  ],
};

/* ------------------------------ 7. Tangram terapan: dua segitiga besar dan persegi besar ------------------------------ */
const SUARA_H1 = "Sekarang giliranmu. Di layar ada dua segitiga besar dari tangram.";
const SUARA_H2 = "Kalau kedua segitiga besar ini disusun, bentuk apa yang jadi? Ketuk jawabannya.";
const SUARA_H3 = "Betul, sebuah segitiga yang lebih besar! Dua keping menjadi satu segitiga.";
const SUARA_H4 = "Sekarang ketujuh keping kita susun lagi menjadi satu persegi besar.";
const SUARA_H5 = "Pakai semua keping, tidak boleh bertumpuk, dan sisinya harus saling menempel.";
export const SEGITIGA_BESAR_HASIL = [TANGRAM[1].pts[1], TANGRAM[0].pts[1], TANGRAM[0].pts[0]];
export const PERSEGI_TANGRAM = [TANGRAM[1].pts[1], TANGRAM[2].pts[0], TANGRAM[0].pts[1], TANGRAM[0].pts[0]];

export const ADEGAN_LUAR_TANGRAM_TERAPAN: AdeganStory = {
  id: "luar-tangram-terapan",
  judul: "Tangram: menyusun segitiga dan persegi besar",
  sumber: "Metode luar: Tangram, terapan",
  latar: "#FDF2F8",
  ketukan: [
    k(SUARA_H1, tambah(0, ...kepala(2)), tambah(idx(SUARA_H1, "dua"), keping(0, { x: 36, y: -2 }), keping(1, { x: -36, y: -2 }))),
    k(SUARA_H2, tambah(idx(SUARA_H2, "Ketuk"), ...pilihKata(150, ["segitiga", "persegi", "segi lima"], 10.4))),
    k(SUARA_H3, sorotkan(idx(SUARA_H3, "Betul,"), "c1-k"), ubah(idx(SUARA_H3, "Dua"), { id: "kp0", x: 0, y: 0 }, { id: "kp1", x: 0, y: 0 }), tambah(idx(SUARA_H3, "segitiga", 2), hasil("ht", SEGITIGA_BESAR_HASIL))),
    k(SUARA_H4, bersih(0), tambah(0, ...kepala(2)), tambah(idx(SUARA_H4, "persegi"), ...semua.map((i) => keping(i)), hasil("ht", PERSEGI_TANGRAM))),
    k(SUARA_H5, tambah(idx(SUARA_H5, "Pakai"), ...kartu("rg", 20, 152, 260, 40, W.emas, ["pakai semua keping", "tidak bertumpuk, sisi menempel"], 9.6))),
  ],
};

/* ------------------------------ 8. Ringkasan ------------------------------ */
const SUARA_R1 = "Mari kita ingat lagi tiga metode dari luar.";
const SUARA_R2 = "Susun Bangun: gabung bangun kecil menjadi bangun besar.";
const SUARA_R3 = "Urai Bangun: pecah satu bangun menjadi beberapa bagian.";
const SUARA_R4 = "Tangram: tujuh keping yang bisa disusun menjadi banyak bentuk.";
const SUARA_R5 = "Pilih cara yang paling mudah untukmu. Terima kasih, sampai jumpa!";

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan tiga metode dari luar",
  sumber: "Ringkasan: tiga metode luar",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_R1, tambah(0, judul("Ringkasan tiga metode")), tambah(idx(SUARA_R1, "ingat"), emo("ib", 150, 110, "\u{1F4DD}", 44))),
    k(SUARA_R2, { at: 0, hapus: "ib" }, tambah(idx(SUARA_R2, "gabung"), ...kartu("r0", 14, 30, 272, 40, WARNA_METODE[0], [NAMA_METODE_ID[0], "gabung bangun kecil jadi besar"], 9.2))),
    k(SUARA_R3, tambah(idx(SUARA_R3, "pecah"), ...kartu("r1", 14, 78, 272, 40, WARNA_METODE[1], [NAMA_METODE_ID[1], "pecah bangun jadi bagian"], 9.2))),
    k(SUARA_R4, tambah(idx(SUARA_R4, "tujuh"), ...kartu("r2", 14, 126, 272, 40, WARNA_METODE[2], [NAMA_METODE_ID[2], "tujuh keping, banyak bentuk"], 9.2))),
    k(SUARA_R5, tambah(idx(SUARA_R5, "Terima"), emo("ow", 150, 190, OWL, 30))),
  ],
};
