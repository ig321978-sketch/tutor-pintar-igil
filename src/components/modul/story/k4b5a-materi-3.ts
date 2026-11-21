import type { AdeganStory } from "./logika-story";
import { E, G, W, bangun, emo, judul, kotak, panah, tanah, teks, tokoh } from "./k4b5a-gambar";
import { bersih, hapus, k, tambah } from "./k4b5a-bantu";

/*
 * Cerita orisinal IGIL "Etalase Keramik Bu Dewi" (Kelas 4 Bab 5 Sub-Bab A, ciri-ciri bangun datar), awal cerita Toko Keramik Bu Dewi.
 * Naskah suara dari naskah/story-naskah-k4b5a.md. Bagian ini: keluarga segiempat, mengisi katalog, dan kedatangan Pak Rudi (jembatan ke Sub-Bab B).
 */

/** Satu kartu keluarga: bangun `${id}`, nama `${id}-n`, dan dua baris ciri `${id}-c1` dan `${id}-c2`. */
/** Pusat enam kartu keluarga (tiga kolom, dua baris) dan bingkai putus-putus penanda tempat keramik. */
const PUSAT: Record<string, [number, number]> = { pg: [50, 58], pp: [150, 58], bk: [250, 58], jg: [50, 138], ll: [150, 136], tr: [250, 138] };
const tempat = (id: string) => kotak(`ph-${id}`, PUSAT[id][0] - 24, PUSAT[id][1] - 22, 48, 44, undefined, W.kayu, { rx: 4, tebal: 1.2, putus: true, z: 0 });
const kartu = (id: string, x: number, y: number, kunci: string, s: number, warna: string, nama: string, yNama: number, c1: string, c2?: string) => [
  bangun(id, x, y, kunci, s, warna),
  teks(`${id}-n`, x, yNama, nama, 9, W.coklat),
  teks(`${id}-c1`, x, yNama + 10, c1, 7.5, W.merah),
  ...(c2 ? [teks(`${id}-c2`, x, yNama + 20, c2, 7.5, W.merah)] : []),
];

/* ------------------------------ 7. Keluarga segiempat ------------------------------ */
const SUARA_K1 = "Genta menata keluarga segiempat: persegi punya empat sisi sama panjang dan empat sudut siku-siku.";
const SUARA_K2 = "Persegi panjang punya dua pasang sisi sama panjang, belah ketupat punya empat sisi sama panjang, dan jajargenjang punya dua pasang sisi sejajar.";
const SUARA_K3 = "Layang-layang punya dua pasang sisi bersebelahan yang sama panjang, dan trapesium punya sepasang sisi sejajar.";

export const ADEGAN_KELUARGA: AdeganStory = {
  id: "keluarga",
  judul: "Keluarga segiempat",
  sumber: "Materi: keluarga segiempat",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_K1,
      tambah(0, judul("Keluarga Segiempat"), ...Object.keys(PUSAT).map(tempat), ...Object.keys(PUSAT).map((id) => teks(`tp-${id}`, PUSAT[id][0], PUSAT[id][1] + 5, "?", 16, W.kayu, { z: 1 }))),
      hapus("persegi", "ph-pg", "tp-pg"),
      tambah("persegi", ...kartu("pg", 50, 58, "persegi", 9, G.biru, "persegi", 90, "4 sisi sama", "4 siku-siku")),
    ),
    k(
      SUARA_K2,
      hapus("Persegi", "ph-pp", "tp-pp"),
      tambah("Persegi", ...kartu("pp", 150, 58, "persegi-panjang", 6, G.hijau, "persegi panjang", 90, "2 pasang sama")),
      hapus("belah", "ph-bk", "tp-bk"),
      tambah("belah", ...kartu("bk", 250, 58, "belah-ketupat", 9, G.pink, "belah ketupat", 90, "4 sisi sama")),
      hapus("jajargenjang", "ph-jg", "tp-jg"),
      tambah("jajargenjang", ...kartu("jg", 50, 138, "jajargenjang", 5, G.kuning, "jajargenjang", 168, "2 pasang sejajar")),
    ),
    k(
      SUARA_K3,
      hapus("Layang-layang", "ph-ll", "tp-ll"),
      tambah("Layang-layang", ...kartu("ll", 150, 136, "layang-layang", 5, G.ungu, "layang-layang", 168, "2 pasang sebelah")),
      hapus("trapesium", "ph-tr", "tp-tr"),
      tambah("trapesium", ...kartu("tr", 250, 138, "trapesium", 6, G.oranye, "trapesium", 168, "1 pasang sejajar")),
    ),
  ],
};

/* ------------------------------ 8. Katalog ------------------------------ */
const SUARA_L1 = "Bu Dewi menulis nama setiap bangun di katalog, lengkap dengan ciri sisi dan sudutnya.";
const SUARA_L2 = "Pak Hendro berpesan, kenali bangun dari cirinya, bukan hanya dari bentuknya sekilas.";
const SUARA_L3 = "Dengan ciri yang jelas, katalog itu bisa dibaca siapa pun tanpa salah paham.";
const BARIS_KATALOG: [string, string][] = [
  ["persegi", "4 sisi, 4 siku"],
  ["jajargenjang", "2 pasang sejajar"],
  ["trapesium", "1 pasang sejajar"],
  ["layang-layang", "2 pasang sebelah"],
];

export const ADEGAN_KATALOG: AdeganStory = {
  id: "katalog",
  judul: "Mengisi katalog Bu Dewi",
  sumber: "Materi: katalog bangun",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_L1,
      tambah(0, judul("Katalog Bu Dewi"), ...tanah("tn", 150)),
      tambah("Dewi", ...tokoh("bd", 40, 184, "Bu Dewi"), kotak("kat", 100, 34, 170, 100, "#FFF7ED", W.coklat, { rx: 4, tebal: 2, z: 1 })),
      tambah("nama", ...BARIS_KATALOG.map(([n], i) => teks(`ln${i}`, 112, 62 + i * 22, n, 8.4, W.coklat, { anchor: "start", z: 2 }))),
      tambah("ciri", ...BARIS_KATALOG.map(([, c], i) => teks(`lc${i}`, 190, 62 + i * 22, c, 7.5, W.merah, { anchor: "start", z: 2 }))),
      tambah("sudutnya.", emo("cat", 256, 120, E.catat, 18, { z: 3 })),
    ),
    k(
      SUARA_L2,
      hapus(0, "cat"),
      tambah("Hendro", ...tokoh("ph", 240, 184, "Pak Hendro")),
      tambah("kenali", teks("kn", 170, 146, "kenali dari ciri", 8, W.hijauTua)),
      tambah("bukan", emo("xs", 284, 150, E.salah, 18)),
      tambah("sekilas.", emo("my", 284, 126, E.mata, 18)),
    ),
    k(
      SUARA_L3,
      hapus(0, "kn", "xs", "my"),
      tambah("ciri", teks("cj", 170, 146, "ciri jelas", 8, W.hijauTua)),
      tambah("katalog", emo("ok", 284, 44, E.benar, 20)),
      tambah("dibaca", ...tokoh("sa", 80, 184, "Satria"), ...tokoh("lr", 118, 184, "Laras"), ...tokoh("ge", 156, 184, "Genta")),
      tambah("paham.", emo("jp", 284, 126, E.jempol, 18)),
    ),
  ],
};

/* ------------------------------ 9. Penutup: Pak Rudi dan keping pecah ------------------------------ */
const SUARA_P1 = "Pak Rudi, tukang pasang keramik, datang membawa kotak berisi keping keramik yang pecah.";
const SUARA_P2 = "Ia ingin keping-keping itu dirangkai menjadi mosaik yang indah untuk pameran.";
const SUARA_P3 = "Menurutmu, bagaimana keping kecil bisa dirangkai menjadi bentuk yang besar? Terima kasih, Satria, Laras, Genta, Pak Hendro, dan Bu Dewi!";
const WARNA_MOSAIK = [G.merah, G.biru, G.kuning, G.hijau, G.pink, G.ungu, G.oranye, G.tosca, G.nila];
const KEPING = ["kp1", "kp2", "kp3", "kp4"];

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Pak Rudi membawa keping",
  sumber: "Materi: jembatan ke mosaik",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Pak Rudi Datang"), ...tanah("tn", 150)),
      tambah("Rudi,", ...tokoh("pr", 60, 184, "Pak Rudi")),
      tambah("kotak", kotak("kk", 120, 100, 80, 42, G.kuning, W.kayuTua, { rx: 4, tebal: 2, z: 1 }), teks("kt", 160, 126, "kotak keping", 8.4, W.coklat, { z: 2 })),
      tambah("keping", bangun("kp1", 134, 84, "segitiga-sama-kaki", 3.4, G.merah), bangun("kp2", 154, 80, "trapesium", 3.4, G.biru), bangun("kp3", 174, 84, "segitiga-siku", 4.5, G.hijau), bangun("kp4", 192, 86, "persegi", 3.4, G.pink)),
      tambah("pecah.", teks("pc", 160, 62, "keping pecah", 9, W.merah)),
    ),
    k(
      SUARA_P2,
      hapus(0, "kk", "kt", "pc", ...KEPING),
      tambah("dirangkai", ...Array.from({ length: 9 }, (_, i) => kotak(`mz-c${i}`, 190 + (i % 3) * 22, 54 + Math.floor(i / 3) * 22, 22, 22, WARNA_MOSAIK[i], W.kayuTua, { rx: 0, tebal: 1.2, z: 2 }))),
      tambah("mosaik", teks("mo", 223, 44, "mosaik", 9, W.coklat)),
      tambah("indah", emo("sp", 270, 80, "\u{2728}", 20)),
      tambah("pameran.", teks("pm", 223, 134, "pameran", 9, W.hijauTua)),
    ),
    k(
      SUARA_P3,
      bersih(0),
      tambah(0, judul("Terima Kasih"), ...tanah("tn", 150), ...tokoh("pr", 260, 184, "Pak Rudi"), teks("tq", 150, 66, "?", 24, W.merah)),
      tambah("keping", bangun("k0", 84, 78, "persegi", 4, G.biru), teks("k1", 84, 104, "keping kecil", 9, W.coklat)),
      tambah("dirangkai", panah("ar", 118, 96, 38, 0, W.merah, 2)),
      tambah("besar?", bangun("k2", 216, 76, "segienam-beraturan", 7, G.tosca), teks("k3", 216, 104, "bentuk besar", 9, W.coklat)),
      tambah("Satria,", ...tokoh("sa", 30, 184, "Satria")),
      tambah("Laras,", ...tokoh("lr", 76, 184, "Laras")),
      tambah("Genta,", ...tokoh("ge", 122, 184, "Genta")),
      tambah("Hendro,", ...tokoh("ph", 168, 184, "Pak Hendro")),
      tambah("Dewi!", ...tokoh("bd", 214, 184, "Bu Dewi"), emo("lb", 150, 134, E.lambai, 20)),
    ),
  ],
};
