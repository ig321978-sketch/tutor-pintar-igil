import type { AdeganStory, Obj } from "./logika-story";
import { E, LETAK_CAMPUR, W, WP, emo, garis, idAlat, idTurus, judul, lantai, letakBaris, semuaAlat, tabel, teks, tokoh, turus } from "./k2b8A-gambar";
import { bersih, k, tambah, ubah } from "./k2b8A-bantu";

/*
 * Cerita orisinal IGIL "Alat Musik Pak Hendra" (Kelas 2 Bab 8 Sub-Bab A, diagram turus), awal cerita Pentas Seni Sekolah.
 * Naskah suara dari naskah/story-naskah-k2b8a.md. Bagian ini: salah langkah menghitung sekaligus, bundel lima, dan membuat tabel diagram turus.
 */

/** Bagian benda dengan nomor alat `dari` sampai `sampai` (id berawalan `${awalan}${nomor}`). */
const nomorDari = (id: string, awalan: string): number => Number(id.slice(awalan.length).split("-")[0]);
const bagian = (objs: Obj[], awalan: string, dari: number, sampai: number): Obj[] => objs.filter((o) => nomorDari(o.id, awalan) >= dari && nomorDari(o.id, awalan) <= sampai);

/* ------------------------------ 4. Salah langkah: hitung semuanya sekaligus ------------------------------ */
const SUARA_S1 = "Chacha berseru, aku hitung semuanya sekaligus tanpa dipilah, pasti benar! Kalau salah, aku memakai kostum ayam!";
const SUARA_S2 = "Angklung terhitung dua kali dan seruling terlewat. Hasilnya berantakan, Pak Hendra pun bingung.";
const SUARA_S3 = "Dika menggeleng. Pilah dulu menurut jenis, lalu hitung satu per satu, Chacha.";

/** Letak campur aduk 23 alat musik, dirapatkan ke tengah (x 70-231). */
const letak = (n: number): [number, number] => [Math.round(70 + (LETAK_CAMPUR[n][0] - 70) * 0.85), LETAK_CAMPUR[n][1]];
const CAMPUR = semuaAlat("cm", (_r, _i, n) => letak(n));
const BARIS_Y = [62, 88, 114, 140] as const;

export const ADEGAN_SALAH_HITUNG: AdeganStory = {
  id: "salah-hitung",
  judul: "Salah hitung sekaligus",
  sumber: "Materi: salah langkah, hitung tanpa memilah",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_S1,
      tambah(0, judul("Hitung Sekaligus?"), ...lantai("lt", 150), ...tokoh("ch", 44, 184, "Chacha")),
      tambah("hitung", ...CAMPUR),
      tambah("pasti", emo("ts", 44, 128, E.seru, 20)),
      tambah("kostum", garis("gh", 276, 44, 0, 14, WP.besi, 1.6), emo("ay", 276, 92, E.ayam, 30)),
    ),
    k(
      SUARA_S2,
      tambah("Angklung", { id: "rg", t: "bulat", x: letak(0)[0], y: letak(0)[1], r: 12, warna: undefined, garis: W.merah, tebal: 2.2, z: 6 }),
      tambah("dua", teks("d2", letak(0)[0], letak(0)[1] - 17, "2 kali", 9, W.merah)),
      tambah("seruling", emo("xs", letak(9)[0], letak(9)[1] - 14, E.salah, 14)),
      ubah("seruling", ...idAlat("cm9", "seruling").map((id) => ({ id, op: 0.25 }))),
      tambah("berantakan,", teks("r1", 150, 48, "7", 11, W.merah), teks("r2", 200, 54, "12", 11, W.merah), teks("r3", 230, 100, "3", 11, W.merah)),
      tambah("Pak", ...tokoh("ph", 252, 184, "Pak Hendra")),
      tambah("bingung.", emo("tq", 252, 128, E.tanya, 22)),
    ),
    k(
      SUARA_S3,
      bersih(0),
      tambah(0, judul("Pilah Dulu"), ...lantai("lt", 150), ...tokoh("dk", 44, 184, "Dika")),
      ubah("menggeleng.", { id: "dk", isi: E.pikir }),
      tambah("Pilah", ...bagian(semuaAlat("rp", (r, i) => letakBaris(r, i, BARIS_Y, 88, 15)), "rp", 0, 14)),
      tambah("jenis,", ...bagian(semuaAlat("rp", (r, i) => letakBaris(r, i, BARIS_Y, 88, 15)), "rp", 15, 22)),
      tambah("hitung", ...[0, 1, 2, 3].map((r) => emo(`rc${r}`, 240, BARIS_Y[r], E.benar, 14))),
      tambah("satu", teks("sp", 150, 40, "1 per 1", 10, W.merah)),
    ),
  ],
};

/* ------------------------------ 5. Bundel lima ------------------------------ */
const SUARA_L1 = "Chacha menulis sembilan garis panjang-panjang, lalu menghitungnya menjadi sepuluh!";
const SUARA_L2 = "Pak Hendra menunjukkan caranya. Empat garis tegak, lalu garis kelima mencoret miring, itulah satu bundel lima.";
const SUARA_L3 = "Angklung ada sembilan: satu bundel lima dan empat garis. Dihitung lima, enam, tujuh, delapan, sembilan.";

const T9 = turus("tu", 90, 76, 9, W.biru, 36, 9, 2.6);
const ID_BUNDEL = new Set(idTurus("tu", 5));

export const ADEGAN_BUNDEL_LIMA: AdeganStory = {
  id: "bundel-lima",
  judul: "Bundel lima",
  sumber: "Materi: bundel lima turus",
  latar: "#F5F3FF",
  ketukan: [
    k(
      SUARA_L1,
      tambah(0, judul("Sembilan Garis Panjang"), ...lantai("lt", 150), ...tokoh("ch", 44, 184, "Chacha")),
      tambah("sembilan", teks("n9", 150, 44, "9 garis", 10, W.ungu)),
      tambah("garis", ...Array.from({ length: 9 }, (_, i) => garis(`pg${i}`, Math.round((135.6 + i * 3.6) * 10) / 10, 56, 0, 56, W.biru, 1.6, { z: 2 }))),
      ubah("menghitungnya", { id: "ch", isi: E.pikir }),
      tambah("sepuluh!", teks("n10", 230, 84, "10", 16, W.merah), emo("xs", 230, 112, E.salah, 22)),
    ),
    k(
      SUARA_L2,
      bersih(0),
      tambah(0, judul("Satu Bundel Lima"), ...lantai("lt", 150), ...tokoh("ph", 44, 184, "Pak Hendra")),
      tambah("Empat", teks("n4", 150, 42, "4 garis tegak", 10, W.ungu)),
      tambah("tegak,", ...[0, 1, 2, 3].map((i) => garis(`bg${i}`, 126 + i * 12, 56, 0, 52, W.biru, 3.5, { z: 2 }))),
      tambah("mencoret", garis("bm", 120, 102, 50, -48, W.merah, 3.5, { z: 3 })),
      tambah("satu", teks("n1", 150, 128, "1 bundel", 11, W.ungu)),
      tambah("lima.@2", teks("n5", 150, 146, "= 5", 11, W.merah)),
    ),
    k(
      SUARA_L3,
      bersih(0),
      tambah(0, judul("Sembilan Angklung"), ...lantai("lt", 150), ...tokoh("ph", 44, 184, "Pak Hendra")),
      tambah("sembilan", teks("n9", 150, 44, "9 angklung", 10, W.ungu)),
      tambah("satu", ...T9.filter((o) => ID_BUNDEL.has(o.id)), teks("lb", 105, 130, "1 bundel", 9, W.ungu)),
      tambah("empat", ...T9.filter((o) => !ID_BUNDEL.has(o.id)), teks("lg", 148, 130, "4 garis", 9, W.ungu)),
      tambah("lima@2", teks("c5", 105, 68, "5", 10, W.merah)),
      tambah("enam,", teks("c6", 130, 68, "6", 10, W.merah)),
      tambah("tujuh,", teks("c7", 139, 68, "7", 10, W.merah)),
      tambah("delapan,", teks("c8", 148, 68, "8", 10, W.merah)),
      tambah("sembilan@2", teks("c9", 157, 68, "9", 10, W.merah)),
    ),
  ],
};

/* ------------------------------ 6. Membuat diagram turus ------------------------------ */
const SUARA_D1 = "Nia membuat tabel tiga kolom: nama, turus, dan banyaknya.";
const SUARA_D2 = "Ia menulis judul, Alat Musik Pentas, supaya pembaca tahu isi diagramnya.";
const SUARA_D3 = "Angklung sembilan, seruling enam, gendang empat, dan rebana empat ditulis di kolom banyaknya.";

/** Satu baris tabel turus (nama di kolom kiri, turus di tengah): tinggi baris 22 mulai y = 64. Id `${id}n` dan turus `${id}-t`. */
export const barisTurus = (id: string, r: number, nama: string, n: number): Obj[] => [teks(`${id}n`, 55, 78 + 22 * r, nama, 9, W.biru), ...turus(`${id}-t`, 110, 66 + 22 * r, n, W.biru, 16, 4.2, 1.8)];

export const ADEGAN_DIAGRAM_TURUS: AdeganStory = {
  id: "diagram-turus",
  judul: "Membuat diagram turus",
  sumber: "Materi: tabel tiga kolom diagram turus",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_D1,
      tambah(0, judul("Tabel Turus"), ...tokoh("ni", 30, 184, "Nia", 20), emo("sp", 56, 182, E.pensil, 12)),
      tambah("tabel", ...tabel("tb", 15, 44, [80, 120, 70], 20, 22, 4)),
      tambah("tiga", teks("n3", 250, 168, "3 kolom", 10, W.ungu)),
      tambah("nama,", teks("hn", 55, 58, "Nama", 9, W.biru)),
      tambah("turus", teks("ht", 155, 58, "Turus", 9, W.biru)),
      tambah("banyaknya.", teks("hb", 250, 58, "Banyaknya", 9, W.biru)),
    ),
    k(
      SUARA_D2,
      ubah("judul,", { id: "sp", x: 224, y: 44 }),
      tambah("Alat", teks("jj", 150, 38, "Alat Musik Pentas", 10, W.merah)),
      tambah("pembaca", emo("mt", 236, 36, E.mata, 16)),
      tambah("diagramnya.", emo("ct", 36, 36, E.catat, 16)),
    ),
    k(
      SUARA_D3,
      tambah("Angklung", ...barisTurus("r0", 0, "Angklung", 9)),
      tambah("seruling", ...barisTurus("r1", 1, "Seruling", 6)),
      tambah("gendang", ...barisTurus("r2", 2, "Gendang", 4)),
      tambah("rebana", ...barisTurus("r3", 3, "Rebana", 4)),
      tambah("banyaknya.", ...[9, 6, 4, 4].map((n, r) => teks(`rb${r}`, 250, 79 + 22 * r, String(n), 11, W.merah))),
    ),
  ],
};

