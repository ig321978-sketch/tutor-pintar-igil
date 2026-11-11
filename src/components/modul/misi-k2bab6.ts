/**
 * Misi dan tantangan bebas Kelas 2 Bab 6 (Pengukuran: Berat dan Waktu). Murni: tanpa React, tanpa jaringan.
 * Diuji di scripts/uji-lab-k2b6.mjs.
 *
 * Simulasi bertahap per sub-bab (paling banyak tiga alat):
 *  A (Berat): Lab Neraca + Lab Satuan + Mesin Tebak dan Buktikan.
 *  B (Waktu, sub-bab akhir): Lab Jam + Lab Hariku + skenario Hari Minggu Kira, sekaligus pencapaian misi bab ini.
 */

// Hanya impor tipe: berkas ini diuji langsung di Node (tanpa pemaket), jadi tidak boleh mengimpor nilai dari berkas lain.
import type { DefMisi, KeadaanSelesai } from "./misi-simulasi";

export type RelMisi = "lebih berat" | "lebih ringan" | "sama berat";
export type CaraMisi = "jungkat" | "gantung" | "tangan";

export type KeadaanLabNeraca = {
  alat: "neraca";
  kiri: string | null;
  kanan: string | null;
  /** Hubungan benda kiri terhadap benda kanan, atau null bila belum ada dua benda. */
  hubungan: RelMisi | null;
  cara: CaraMisi;
  /** Ukuran asli benda ditampilkan. */
  ukuran: boolean;
  /** Dua benda terpasang dan yang lebih besar justru lebih ringan. */
  kontra: boolean;
  /** Dari catatan timbangan sudah pasti mana yang paling berat dan paling ringan (tiga benda atau lebih). */
  ekstrem: boolean;
  /** Cara menimbang yang pernah dipakai pada dua benda berbeda. */
  caraDipakai: string[];
};

export type KeadaanLabSatuan = {
  alat: "satuan";
  benda: string;
  satuan: string;
  n: number;
  /** "benda|satuan" -> banyak satuan saat neraca pernah seimbang. */
  hasil: Record<string, number>;
  titik: boolean;
  tabel: boolean;
  seimbang: boolean;
};

export type KeadaanLabJam = {
  alat: "jam";
  jam24: number;
  digital: boolean;
  bagian: boolean;
  /** Jam (0 sampai 23) yang pernah ditampilkan. */
  pernah: number[];
  /** Bagian hari yang pernah dilihat saat Bagian hari menyala. */
  bagianLihat: string[];
  /** Angka di muka jam yang pernah diketuk. */
  ketuk: number[];
};

export type KeadaanLabHari = {
  alat: "hari";
  urut: boolean;
  pilih: string[];
  banding: "lebih lama" | "lebih sebentar" | "sama lama" | null;
  /** Satu kegiatan menit dan satu kegiatan jam sedang dibandingkan. */
  menitJam: boolean;
};

export type KeadaanK2Bab6 = KeadaanLabNeraca | KeadaanLabSatuan | KeadaanLabJam | KeadaanLabHari | KeadaanSelesai;

const neraca = (k: KeadaanK2Bab6): k is KeadaanLabNeraca => k.alat === "neraca";
const satuan = (k: KeadaanK2Bab6): k is KeadaanLabSatuan => k.alat === "satuan";
const jam = (k: KeadaanK2Bab6): k is KeadaanLabJam => k.alat === "jam";
const hari = (k: KeadaanK2Bab6): k is KeadaanLabHari => k.alat === "hari";
const selesai = (k: KeadaanK2Bab6, id: string) => k.alat === "selesai" && k.id === id;

const jam12 = (j: number) => ((j + 11) % 12) + 1;
const bagianHari = (j: number): string => (j >= 4 && j <= 10 ? "pagi" : j >= 11 && j <= 14 ? "siang" : j >= 15 && j <= 17 ? "sore" : "malam");

/** Sub-Bab A: berat dibandingkan dengan neraca, lalu diukur dengan satuan tidak baku. */
export const MISI_A: DefMisi<KeadaanK2Bab6>[] = [
  {
    id: "a-turun",
    teks: "Taruh dua benda yang beratnya berbeda. Piringan benda yang lebih berat turun.",
    wajib: true,
    cek: (k) => neraca(k) && k.kiri !== null && k.kanan !== null && k.hubungan !== null && k.hubungan !== "sama berat",
  },
  {
    id: "a-sama",
    teks: "Cari dua benda yang sama berat. Neracanya seimbang.",
    wajib: true,
    cek: (k) => neraca(k) && k.kiri !== null && k.kanan !== null && k.kiri !== k.kanan && k.hubungan === "sama berat",
  },
  {
    id: "a-besar",
    teks: "Nyalakan Ukuran asli, lalu cari benda besar yang lebih ringan dari benda kecil.",
    wajib: true,
    cek: (k) => neraca(k) && k.ukuran && k.kontra,
  },
  {
    id: "a-bola",
    teks: "Ukur boneka dengan bola tenis sampai seimbang. Hitung bola tenisnya.",
    wajib: true,
    cek: (k) => satuan(k) && k.hasil["boneka|bolaTenis"] === 4,
  },
  {
    id: "a-dua-hasil",
    teks: "Ukur benda yang sama dengan dua satuan. Tabel menunjukkan dua hasil yang berbeda.",
    wajib: true,
    cek: (k) => {
      if (!satuan(k)) return false;
      const perBenda: Record<string, number> = {};
      for (const kunci of Object.keys(k.hasil)) {
        const b = kunci.split("|")[0];
        perBenda[b] = (perBenda[b] ?? 0) + 1;
      }
      return Object.values(perBenda).some((n) => n >= 2);
    },
  },
  { id: "a-mesin", teks: "Selesaikan Mesin Tebak dan Buktikan sampai semua benda diperiksa.", wajib: true, cek: (k) => selesai(k, "mesin-tebak") },
  {
    id: "a-cara",
    teks: "Coba ketiga cara menimbang: jungkat-jungkit, gantungan baju, dan dua tangan.",
    wajib: false,
    cek: (k) => neraca(k) && k.caraDipakai.length >= 3,
  },
  {
    id: "a-ekstrem",
    teks: "Timbang tiga benda sampai kamu tahu mana yang paling berat dan paling ringan.",
    wajib: false,
    cek: (k) => neraca(k) && k.ekstrem,
  },
  {
    id: "a-koin",
    teks: "Ukur satu benda dengan koin. Hitungannya paling banyak dibanding satuan lain.",
    wajib: false,
    cek: (k) => satuan(k) && Object.keys(k.hasil).some((x) => x.endsWith("|koin")),
  },
  {
    id: "a-tiga-benda",
    teks: "Ukur tiga benda yang berbeda dengan satu satuan yang sama.",
    wajib: false,
    cek: (k) => {
      if (!satuan(k)) return false;
      const perSatuan: Record<string, number> = {};
      for (const kunci of Object.keys(k.hasil)) {
        const s = kunci.split("|")[1];
        perSatuan[s] = (perSatuan[s] ?? 0) + 1;
      }
      return Object.values(perSatuan).some((n) => n >= 3);
    },
  },
  {
    id: "a-titik",
    teks: "Nyalakan Titik pada neraca yang seimbang. Hitung titiknya.",
    wajib: false,
    cek: (k) => satuan(k) && k.titik && k.seimbang,
  },
];

/** Sub-Bab B (sub-bab akhir): jam, bagian hari, urutan, dan lama kegiatan. Sekaligus pencapaian misi bab ini. */
export const MISI_B: DefMisi<KeadaanK2Bab6>[] = [
  {
    id: "j-lima",
    teks: "Atur jam ke pukul 5 tepat: jarum pendek di angka 5, jarum panjang di angka 12.",
    wajib: true,
    cek: (k) => jam(k) && jam12(k.jam24) === 5,
  },
  {
    id: "j-digital",
    teks: "Nyalakan Jam digital dan atur ke pukul 4 sore. Terbaca 16.00.",
    wajib: true,
    cek: (k) => jam(k) && k.digital && k.jam24 === 16,
  },
  {
    id: "j-dua-kali",
    teks: "Temukan dua waktu dengan jarum yang sama, misalnya pagi dan malam. Bagian harinya berbeda.",
    wajib: true,
    cek: (k) => jam(k) && k.pernah.some((a) => k.pernah.some((b) => a !== b && jam12(a) === jam12(b) && bagianHari(a) !== bagianHari(b))),
  },
  {
    id: "h-urut",
    teks: "Nyalakan Urut menurut waktu, lalu ketuk kegiatan pertama dan kegiatan terakhir dalam sehari.",
    wajib: true,
    cek: (k) => hari(k) && k.urut && k.pilih.includes("bangun") && k.pilih.includes("tidur"),
  },
  {
    id: "h-lama",
    teks: "Bandingkan dua kegiatan yang lamanya berbeda. Dengarkan kata lebih lama dan lebih sebentar.",
    wajib: true,
    cek: (k) => hari(k) && (k.banding === "lebih lama" || k.banding === "lebih sebentar"),
  },
  { id: "k-minggu", teks: "Selesaikan skenario Hari Minggu Kira sampai adegan akhir.", wajib: true, cek: (k) => selesai(k, "minggu-kira") },
  {
    id: "j-bagian",
    teks: "Nyalakan Bagian hari dan temukan satu jam untuk pagi, siang, sore, dan malam.",
    wajib: false,
    cek: (k) => jam(k) && ["pagi", "siang", "sore", "malam"].every((b) => k.bagianLihat.includes(b)),
  },
  {
    id: "j-ketuk",
    teks: "Ketuk tiga angka berbeda di muka jam. Jarum pendek ikut berpindah.",
    wajib: false,
    cek: (k) => jam(k) && k.ketuk.length >= 3,
  },
  {
    id: "h-sama",
    teks: "Temukan dua kegiatan yang sama lama, misalnya mandi pagi dan mandi sore.",
    wajib: false,
    cek: (k) => hari(k) && k.banding === "sama lama",
  },
  {
    id: "h-menit-jam",
    teks: "Bandingkan satu kegiatan yang hitungan menit dengan satu kegiatan yang hitungan jam.",
    wajib: false,
    cek: (k) => hari(k) && k.menitJam,
  },
  {
    id: "h-satu-jam",
    teks: "Pilih berolahraga. Jarum pendek bergerak satu jam dari mulai sampai selesai.",
    wajib: false,
    cek: (k) => hari(k) && k.pilih.includes("olahraga"),
  },
];

export const daftarMisiK2Bab6 = (sub: string): DefMisi<KeadaanK2Bab6>[] => (sub === "B" ? MISI_B : MISI_A);
