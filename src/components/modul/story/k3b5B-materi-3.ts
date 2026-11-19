import type { AdeganStory, Obj } from "./logika-story";
import { E, W, ember, emo, garis, halaman, judul, kotak, papanNama, pindah, sepeda, spanduk, teks, tokoh, turus } from "./k3b5B-gambar";
import { hapus, k, sorotkan, tambah, ubah } from "./k3b5B-bantu";

/*
 * Cerita orisinal IGIL "Tabel Bu Wulan" (Kelas 3 Bab 5 Sub-Bab B), akhir cerita Bengkel Sepeda Pak Hasan.
 * Naskah suara dari naskah/story-naskah-k3b5b.md. Bagian ini: membaca tabel, mengurutkan dulu, dan perayaan akhir cerita bab di halaman bengkel.
 */

type Bar = { id: string; nama: string; n: number };
const A: Bar = { id: "a", nama: "ban bocor", n: 13 };
const B: Bar = { id: "b", nama: "rantai lepas", n: 10 };
const C: Bar = { id: "c", nama: "rem blong", n: 6 };
const X0 = 30;
const KOL: [number, number, number] = [64, 84, 56];

/** Kepala tabel `hd0` sampai `hd2` (kotak) dan `ht0` sampai `ht2` (teks), pojok kiri-atas (X0, y). */
function kepala(y: number): Obj[] {
  const nama = ["jenis", "turus", "banyak"];
  const out: Obj[] = [];
  let x = X0;
  KOL.forEach((w, c) => {
    out.push(kotak(`hd${c}`, x, y, w, 22, "#FDE68A", W.biru, { rx: 0, tebal: 1.3, z: 1 }));
    out.push(teks(`ht${c}`, x + w / 2, y + 14.5, nama[c], 8, W.biru, { z: 2 }));
    x += w;
  });
  return out;
}
/** Bagian baris `${r.id}`: kotak `${p}-c0..2`, nama `${p}-nm`, turus `${p}-u...`, banyak `${p}-bn`. */
function barisKotak(r: Bar, y: number): Obj[] {
  return KOL.map((w, c) => kotak(`${r.id}-c${c}`, X0 + KOL.slice(0, c).reduce((p, q) => p + q, 0), y, w, 22, W.putih, W.biru, { rx: 0, tebal: 1.1, z: 1 }));
}
const barisNama = (r: Bar, y: number): Obj => teks(`${r.id}-nm`, X0 + KOL[0] / 2, y + 14.5, r.nama, 7.6, W.biru, { z: 2 });
const barisTurus = (r: Bar, y: number): Obj[] => turus(`${r.id}-u`, X0 + KOL[0] + 4, y + 4, r.n, 14, 3.2);
const barisBanyak = (r: Bar, y: number): Obj => teks(`${r.id}-bn`, X0 + KOL[0] + KOL[1] + KOL[2] / 2, y + 15, String(r.n), 10, W.hijauTua, { z: 2 });
const barisPenuh = (r: Bar, y: number): Obj[] => [...barisKotak(r, y), barisNama(r, y), ...barisTurus(r, y), barisBanyak(r, y)];
const geser = (r: Bar, y: number) => pindah(barisPenuh(r, y));

/* ------------------------------ 7. Baca ------------------------------ */
const SUARA_Q1 = "Rantai lepas banyaknya sepuluh, dan rem blong banyaknya enam.";
const SUARA_Q2 = "Yang terbanyak adalah ban bocor, dan yang tersedikit adalah rem blong.";
const SUARA_Q3 = "Ban bocor lebih banyak tujuh daripada rem blong.";

export const ADEGAN_BACA: AdeganStory = {
  id: "baca",
  judul: "Membaca tabel",
  sumber: "Materi: membaca tabel",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_Q1,
      tambah(0, judul("Membaca Tabel"), ...kepala(30), ...barisPenuh(A, 52), ...tokoh("bw", 262, 184, "Bu Wulan")),
      tambah("Rantai", ...barisKotak(B, 74), barisNama(B, 74)),
      tambah("sepuluh,", ...barisTurus(B, 74), barisBanyak(B, 74)),
      tambah("rem", ...barisKotak(C, 96), barisNama(C, 96)),
      tambah("enam.", ...barisTurus(C, 96), barisBanyak(C, 96)),
    ),
    k(
      SUARA_Q2,
      tambah("terbanyak", teks("lt", 266, 66, "terbanyak", 7, W.hijauTua)),
      tambah("ban", kotak("ha", X0, 52, 204, 22, undefined, W.hijau, { tebal: 3, rx: 0, z: 5 })),
      tambah("tersedikit", teks("ls", 266, 110, "tersedikit", 7, W.merah)),
      tambah("rem", kotak("hc", X0, 96, 204, 22, undefined, W.merah, { tebal: 3, rx: 0, z: 5 })),
    ),
    k(
      SUARA_Q3,
      tambah("lebih", teks("s1", 118, 142, "13 − 6", 12, W.biru)),
      tambah("tujuh", teks("s2", 168, 142, "= 7", 12, W.merah), emo("ok", 206, 144, E.benar, 16)),
      sorotkan("rem", "a-c0", "c-c0"),
    ),
  ],
};

/* ------------------------------ 8. Urut dulu ------------------------------ */
const SUARA_U1 = "Bu Wulan mengurutkan baris tabel dari yang paling sedikit ke yang paling banyak.";
const SUARA_U2 = "Dengan data terurut, kita langsung tahu mana yang paling sedikit dan mana yang paling banyak.";
const SUARA_U3 = "Yang lebih dari sembilan hanya ban bocor dan rantai lepas, jadi urutkan dulu sebelum membaca.";

export const ADEGAN_URUT_DULU: AdeganStory = {
  id: "urut-dulu",
  judul: "Urutkan dulu",
  sumber: "Materi: urutkan dulu",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_U1,
      tambah(0, judul("Urutkan Dulu"), ...kepala(34), ...tokoh("bw", 262, 184, "Bu Wulan")),
      tambah("baris", ...barisPenuh(A, 56), ...barisPenuh(B, 78), ...barisPenuh(C, 100)),
      ubah("sedikit", ...geser(C, 56), ...geser(A, 100)),
      tambah("sedikit", teks("ls", 266, 70, "sedikit", 7, W.hijauTua)),
      tambah("banyak.", teks("lb", 266, 114, "banyak", 7, W.merah)),
    ),
    k(
      SUARA_U2,
      tambah("terurut,", emo("jp", 262, 144, E.jempol, 18)),
      tambah("sedikit", kotak("ho", X0, 56, 204, 22, undefined, W.hijau, { tebal: 3, rx: 0, z: 5 })),
      tambah("banyak.", kotak("hp", X0, 100, 204, 22, undefined, W.merah, { tebal: 3, rx: 0, z: 5 })),
    ),
    k(
      SUARA_U3,
      hapus(0, "ho", "hp", "jp"),
      tambah("lebih", teks("lm", 150, 146, "lebih dari 9", 10, W.ungu)),
      tambah("sembilan", garis("ac", 24, 78, 216, 0, W.merah, 2, { putus: true, z: 6 }), teks("n9", 252, 82, "9", 14, W.merah)),
      tambah("ban", kotak("hq", X0, 100, 204, 22, undefined, W.hijau, { tebal: 3, rx: 0, z: 5 })),
      tambah("rantai", kotak("hr", X0, 78, 204, 22, undefined, W.hijau, { tebal: 3, rx: 0, z: 5 })),
      tambah("urutkan", emo("ok", 262, 150, E.benar, 18)),
    ),
  ],
};

/* ------------------------------ 9. Penutup (perayaan akhir cerita bab) ------------------------------ */
const SUARA_P1 = "Raka mencuci semua sepeda sambil bersenandung kesal, dan sepeda pun berkilau.";
const SUARA_P2 = "Pak Hasan, Bu Wulan, dan semua anak berkumpul di halaman bengkel untuk pawai sepeda.";
const SUARA_P3 = "Terima kasih, Raka, Salsa, Bima, Pak Joko, Pak Hasan, dan Bu Wulan! Sampai jumpa di bab berikutnya!";
const EP = ember("em", 140, 168);
const BIKE = [70, 150, 230];

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Perayaan di halaman bengkel",
  sumber: "Materi: perayaan akhir bab",
  latar: "#FEF3C7",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Cuci Sepeda"), ...halaman("hl", 150), ...papanNama("pn", 150, 56), ...tokoh("rk", 174, 184, "Raka"), EP[0]),
      tambah("sepeda", ...sepeda("s1", BIKE[0], 138, 0.9), ...sepeda("s2", BIKE[1], 138, 0.9, "#2563EB"), ...sepeda("s3", BIKE[2], 138, 0.9, "#16A34A"), EP[1]),
      tambah("bersenandung", emo("mu", 205, 114, "\u{1F3B5}", 16)),
      tambah("berkilau.", ...BIKE.map((x, i) => emo(`kl${i}`, x, 112, "✨", 16))),
    ),
    k(
      SUARA_P2,
      tambah("Hasan,", ...tokoh("ph", 30, 184, "Pak Hasan")),
      tambah("Wulan,", ...tokoh("bw", 78, 184, "Bu Wulan")),
      tambah("anak", ...tokoh("sl", 222, 184, "Salsa"), ...tokoh("bm", 270, 184, "Bima")),
      tambah("berkumpul", ...tokoh("pj", 126, 184, "Pak Joko")),
      tambah("pawai", ...BIKE.map((x, i) => emo(`pt${i}`, x + 14, 122, E.pita, 14))),
    ),
    k(
      SUARA_P3,
      hapus(0, "mu"),
      tambah(0, judul("Sampai Jumpa!"), ...spanduk("sp", 150, 28, "KLUB SEPEDA KAMPUNG MERIAH", 180)),
      tambah("Raka,", emo("b1", 16, 96, E.balon, 20), emo("b2", 284, 96, E.balon, 20)),
      tambah("Bima,", emo("f1", 100, 100, E.konfeti, 18), emo("f2", 200, 100, E.konfeti, 18)),
      tambah("Wulan!", emo("bt", 150, 84, E.bintang, 18)),
      tambah("jumpa", emo("l1", 12, 122, E.lambai, 18), emo("l2", 288, 122, E.lambai, 18)),
    ),
  ],
};
