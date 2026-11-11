/**
 * Mesin Pemeriksa Bagian (Kelas 2 Bab 5, Sub-Bab A): mesin keadaan.
 * Tiap bentuk yang sudah dibagi melewati stasiun berurutan: Hitung (berapa bagian?) -> Bandingkan (sama besar atau tidak?)
 * -> Sebut (setengah atau bukan?). Mesin menolak langkah yang melompat dan memberi petunjuk, tanpa hukuman.
 * Setengah berarti tepat dua bagian yang sama besar. Dua bagian tidak sama besar bukan setengah.
 * Empat bagian sama besar juga bukan setengah.
 * Murni: tanpa React, tanpa jaringan, tanpa impor nilai (hanya tipe). Diuji di scripts/uji-lab-k2b5.mjs.
 */

import type { BentukLab, GarisLab } from "./lab-potong-k2b5";

export type KeadaanMesinBagian = "hitung" | "banding" | "sebut" | "sudah" | "selesai";
export type KunciSebut = "setengah" | "tak-sama" | "bukan-dua";

export type DefBagian = {
  id: string;
  nama: string;
  bentuk: BentukLab;
  garis: GarisLab[];
  /** Banyak bagian dan apakah semuanya sama besar. Dicocokkan dengan lab-potong di skrip uji. */
  bagian: number;
  sama: boolean;
};

/** Lima bentuk: tiga setengah (dua sama besar) dan dua bukan, satu karena tidak sama besar, satu karena ada empat. */
export const KASUS_BAGIAN: DefBagian[] = [
  { id: "roti", nama: "Roti", bentuk: "persegi", garis: [{ arah: "tegak", langkah: 0 }], bagian: 2, sama: true },
  { id: "kue", nama: "Kue Bolu", bentuk: "persegiPanjang", garis: [{ arah: "tegak", langkah: 2 }], bagian: 2, sama: false },
  { id: "pizza", nama: "Pizza", bentuk: "lingkaran", garis: [{ arah: "miring1", langkah: 0 }], bagian: 2, sama: true },
  { id: "roti-segitiga", nama: "Roti Segitiga", bentuk: "segitiga", garis: [{ arah: "datar", langkah: 0 }], bagian: 2, sama: false },
  { id: "puding", nama: "Puding", bentuk: "persegi", garis: [{ arah: "tegak", langkah: 0 }, { arah: "datar", langkah: 0 }], bagian: 4, sama: true },
];

export const STASIUN_MESIN_BAGIAN = [
  { id: "hitung", nama: "Hitung", ikon: "🔢" },
  { id: "banding", nama: "Bandingkan", ikon: "⚖️" },
  { id: "sebut", nama: "Sebut", ikon: "💬" },
  { id: "selesai", nama: "Selesai", ikon: "🏁" },
];

export const NAMA_KEADAAN_BAGIAN: Record<KeadaanMesinBagian, string> = { hitung: "Hitung", banding: "Bandingkan", sebut: "Sebut", sudah: "Selesai", selesai: "Selesai" };

export type OpsiBagian = { kunci: string; label: string };

const rotasi = <T,>(a: T[], k: number): T[] => a.map((_, i) => a[(i + k) % a.length]);

export const kunciSebutBenar = (d: DefBagian): KunciSebut => (!d.sama ? "tak-sama" : d.bagian === 2 ? "setengah" : "bukan-dua");
export const adalahSetengah = (d: DefBagian): boolean => d.bagian === 2 && d.sama;

/** Tiga pilihan banyak bagian: yang benar dan dua yang lain di antara 1 sampai 4. Tepat satu yang benar. */
export function opsiHitung(d: DefBagian, misi: number): OpsiBagian[] {
  const lain = [1, 2, 3, 4].filter((n) => n !== d.bagian);
  const pilih = [d.bagian, ...(d.bagian === 2 ? [3, 4] : d.bagian === 4 ? [2, 3] : lain.slice(0, 2))];
  const semua = pilih.map((n) => ({ kunci: String(n), label: `${n} bagian` }));
  return rotasi(semua, misi % semua.length);
}

export const OPSI_BANDING: OpsiBagian[] = [
  { kunci: "sama", label: "Sama besar" },
  { kunci: "beda", label: "Tidak sama besar" },
];

export function opsiSebut(misi: number): OpsiBagian[] {
  const semua: OpsiBagian[] = [
    { kunci: "setengah", label: "Setiap bagian adalah setengah" },
    { kunci: "tak-sama", label: "Bukan setengah: bagiannya tidak sama besar" },
    { kunci: "bukan-dua", label: "Bukan setengah: bagiannya tidak ada dua" },
  ];
  return rotasi(semua, misi % semua.length);
}

export type MesinBagian = {
  daftar: DefBagian[];
  misi: number;
  keadaan: KeadaanMesinBagian;
  riwayat: string[];
  pesan: string;
  ditolak: number;
  selesai: boolean;
};

export type PeristiwaMesinBagian =
  | { t: "HITUNG"; nilai: number }
  | { t: "BANDING"; nilai: "sama" | "beda" }
  | { t: "SEBUT"; nilai: string }
  | { t: "LANJUT" }
  | { t: "LOMPAT"; ke: number }
  | { t: "ULANG" };

export const awalMesinBagian = (daftar: DefBagian[] = KASUS_BAGIAN): MesinBagian => ({ daftar, misi: 0, keadaan: "hitung", riwayat: [], pesan: "", ditolak: 0, selesai: false });

export const kasusAktif = (x: MesinBagian): DefBagian => x.daftar[x.misi];

/** Indeks stasiun pada peta (Hitung, Bandingkan, Sebut, Selesai). */
export const indeksStasiunBagian = (k: KeadaanMesinBagian): number => ({ hitung: 0, banding: 1, sebut: 2, sudah: 3, selesai: 3 })[k];

const tolak = (x: MesinBagian, pesan: string): MesinBagian => ({ ...x, pesan, ditolak: x.ditolak + 1 });
const pindah = (x: MesinBagian, ke: KeadaanMesinBagian, tambah: Partial<MesinBagian> = {}): MesinBagian => ({
  ...x,
  ...tambah,
  keadaan: ke,
  pesan: "",
  riwayat: [...x.riwayat, `${NAMA_KEADAAN_BAGIAN[x.keadaan]} → ${NAMA_KEADAAN_BAGIAN[ke]}`].slice(-10),
});

export function ringkasBagian(d: DefBagian): string {
  if (adalahSetengah(d)) return `${d.nama} terbagi dua sama besar, jadi setiap bagian adalah setengah.`;
  if (!d.sama) return `${d.nama} terbagi ${d.bagian}, tetapi bagiannya tidak sama besar, jadi bukan setengah.`;
  return `${d.nama} terbagi ${d.bagian} sama besar. Itu bukan setengah, karena setengah hanya untuk dua bagian sama besar.`;
}

export function petunjukMesinBagian(x: MesinBagian): string {
  const d = kasusAktif(x);
  switch (x.keadaan) {
    case "hitung":
      return "Pertanyaan satu: ada berapa bagian pada bentuk ini?";
    case "banding":
      return "Pertanyaan dua: apakah semua bagiannya sama besar?";
    case "sebut":
      return "Pertanyaan tiga: apakah setiap bagian ini setengah?";
    case "sudah":
      return `Betul! ${ringkasBagian(d)}`;
    default:
      return "Semua bentuk sudah diperiksa.";
  }
}

function tolakSalahTempat(x: MesinBagian): MesinBagian {
  switch (x.keadaan) {
    case "hitung":
      return tolak(x, "Hitung dulu bagiannya. Itu pertanyaan pertama.");
    case "banding":
      return tolak(x, "Bagian sudah dihitung. Sekarang bandingkan besarnya.");
    case "sebut":
      return tolak(x, "Besarnya sudah dibandingkan. Sekarang tentukan: setengah atau bukan?");
    case "sudah":
      return tolak(x, "Bentuk ini sudah diperiksa. Tekan lanjut ke bentuk berikutnya.");
    default:
      return tolak(x, "Semua bentuk sudah selesai. Main lagi kalau mau.");
  }
}

/** Satu langkah mesin. Selalu mengembalikan objek baru. */
export function langkahMesinBagian(x: MesinBagian, p: PeristiwaMesinBagian): MesinBagian {
  const d = kasusAktif(x);
  switch (p.t) {
    case "HITUNG": {
      if (x.keadaan !== "hitung") return tolakSalahTempat(x);
      if (p.nilai !== d.bagian) return tolak(x, "Hitung lagi satu per satu. Ketuk garis pemisahnya, lalu hitung bagian di antaranya.");
      return pindah(x, "banding");
    }
    case "BANDING": {
      if (x.keadaan !== "banding") return tolakSalahTempat(x);
      const benar = d.sama ? "sama" : "beda";
      if (p.nilai !== benar) {
        return tolak(x, d.sama ? "Lihat lagi. Semua bagiannya sama besar. Kalau digeser dan ditumpuk, akan pas." : "Lihat lagi. Ada bagian yang lebih besar dari bagian lain.");
      }
      return pindah(x, "sebut");
    }
    case "SEBUT": {
      if (x.keadaan !== "sebut") return tolakSalahTempat(x);
      if (p.nilai !== kunciSebutBenar(d)) {
        return tolak(
          x,
          d.sama && d.bagian === 2
            ? "Dua bagian sama besar itulah setengah. Coba lagi."
            : !d.sama
              ? "Bagian yang tidak sama besar tidak boleh disebut setengah. Coba lagi."
              : "Setengah hanya untuk dua bagian sama besar. Di sini bagiannya bukan dua. Coba lagi."
        );
      }
      return pindah(x, "sudah");
    }
    case "LANJUT": {
      if (x.keadaan !== "sudah") return tolakSalahTempat(x);
      if (x.misi + 1 < x.daftar.length) return pindah(x, "hitung", { misi: x.misi + 1 });
      return pindah(x, "selesai", { selesai: true });
    }
    case "LOMPAT": {
      if (p.ke === indeksStasiunBagian(x.keadaan)) return x;
      return tolak(x, "Mesin berjalan berurutan: hitung, bandingkan, sebut. Jawab pertanyaan yang sekarang dulu.");
    }
    case "ULANG":
      return x.selesai ? awalMesinBagian(x.daftar) : x;
  }
}
