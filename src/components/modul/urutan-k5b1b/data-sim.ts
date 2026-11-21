/**
 * Data Simulasi Garis Urutan Kelas 5 Bab 1 Sub-Bab B "Urutan Tribun Pak Hasto". Data berbeda dari Story (empat tribun), Infografis, dan tugas CPA
 * (lampu sorot, kursi VIP, kios, parkir, tangga, tenda). Eksplorasi bebas tanpa skor. Diuji: scripts/uji-urutan-k5b1b.mjs.
 */
export type SasaranBanding = { na: string; a: number; nb: string; b: number; kol: [string, string, string] };
/** Banding: dua bilangan; pilih kolom penentu (atau "banyak angka", "semua sama") lalu tanda. */
export const BANDING_SIM: readonly SasaranBanding[] = [
  { na: "Lampu", a: 23480, nb: "Kios", b: 23840, kol: ["puluhan", "ratusan", "satuan"] },
  { na: "Kursi VIP", a: 9870, nb: "Parkir", b: 10020, kol: ["ribuan", "banyak angka", "satuan"] },
  { na: "Bendera", a: 67305, nb: "Peluit", b: 67305, kol: ["semua sama", "puluhan", "satuan"] },
  { na: "Tangga", a: 51209, nb: "Tenda", b: 51290, kol: ["satuan", "ratusan", "puluhan"] },
];
export const TANDA_SIM = ["<", ">", "="] as const;
export const TEKS_TANDA_SIM = ["lebih kecil (<)", "lebih besar (>)", "sama dengan (=)"] as const;

export type SasaranGaris = { nama: string; n: number; lo: number; pil: [string, string, string] };
/** Garis: letakkan bilangan di garis berpatokan dengan memilih ruasnya. */
export const GARIS_SIM: readonly SasaranGaris[] = [
  { nama: "Lampu sorot", n: 27350, lo: 10000, pil: ["antara 30.000 dan 40.000", "antara 20.000 dan 30.000", "antara 10.000 dan 20.000"] },
  { nama: "Kursi VIP", n: 8640, lo: 0, pil: ["antara 10.000 dan 20.000", "antara 20.000 dan 30.000", "antara 0 dan 10.000"] },
  { nama: "Kios", n: 43900, lo: 30000, pil: ["antara 50.000 dan 60.000", "antara 30.000 dan 40.000", "antara 40.000 dan 50.000"] },
  { nama: "Parkir", n: 62015, lo: 50000, pil: ["antara 50.000 dan 60.000", "antara 60.000 dan 70.000", "antara 70.000 dan 80.000"] },
];

export type SasaranUrut = { arah: "naik" | "turun"; item: { nama: string; n: number }[]; acak: number[] };
/** Urut: ketuk empat bilangan dalam urutan naik atau turun (alat menolak bilangan yang bukan giliran). `acak` = urutan tampil kartu. */
export const URUT_SIM: readonly SasaranUrut[] = [
  { arah: "naik", item: [{ nama: "Lampu", n: 15600 }, { nama: "Kios", n: 9850 }, { nama: "Parkir", n: 15060 }, { nama: "Tiket", n: 41200 }], acak: [2, 0, 3, 1] },
  { arah: "turun", item: [{ nama: "Mobil", n: 52700 }, { nama: "Motor", n: 5230 }, { nama: "Bus", n: 52030 }, { nama: "Sepeda", n: 25300 }], acak: [1, 3, 0, 2] },
  { arah: "naik", item: [{ nama: "Bendera", n: 30100 }, { nama: "Syal", n: 3010 }, { nama: "Topi", n: 30010 }, { nama: "Tas", n: 13000 }], acak: [0, 2, 1, 3] },
  { arah: "turun", item: [{ nama: "Kios", n: 78400 }, { nama: "Parkir", n: 87400 }, { nama: "Lampu", n: 74800 }, { nama: "VIP", n: 47800 }], acak: [3, 0, 1, 2] },
];

export type SasaranPatokan = { nama: string; n: number; pil: [string, string, string] };
/** Patokan: pilih patokan sepuluh ribuan yang paling dekat dengan bilangan. */
export const PATOKAN_SIM: readonly SasaranPatokan[] = [
  { nama: "Lampu", n: 22800, pil: ["30.000", "20.000", "10.000"] },
  { nama: "Kios", n: 36100, pil: ["30.000", "50.000", "40.000"] },
  { nama: "Parkir", n: 73400, pil: ["80.000", "70.000", "60.000"] },
  { nama: "Kursi", n: 18200, pil: ["10.000", "30.000", "20.000"] },
];

export const MISI_URUTAN_TEKS = "Bandingkan dua bilangan dari kiri, pilih tandanya, letakkan bilangan di garis, dan urutkan tribun. Urutannya bebas.";
