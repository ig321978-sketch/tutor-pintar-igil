/**
 * Mesin Pembagi Adil (Kelas 2 Bab 5, Sub-Bab B): mesin keadaan.
 * Tiap kumpulan benda melewati stasiun berurutan: Hitung (berapa semuanya?) -> Cek (bisa dibagi dua sama banyak?)
 * -> Hasil (berapa setengahnya, atau mengapa tidak bisa?). Mesin menolak langkah yang melompat dan memberi petunjuk,
 * tanpa hukuman. Setengah dari kumpulan hanya ada bila banyak bendanya genap.
 * Murni: tanpa React, tanpa jaringan, tanpa impor nilai. Diuji di scripts/uji-lab-k2b5.mjs.
 */

export type KeadaanMesinKumpulan = "hitung" | "cek" | "hasil" | "sudah" | "selesai";
export type JenisBendaMesin = "kelereng" | "apel" | "pensil" | "ikan" | "jeruk" | "balon";

export type DefKumpulan = { id: string; nama: string; benda: JenisBendaMesin; n: number };

/** Empat kumpulan: dua genap (6 dan 10) dan dua ganjil (5 dan 7). */
export const KASUS_KUMPULAN: DefKumpulan[] = [
  { id: "kelereng-6", nama: "Kelereng Malosi", benda: "kelereng", n: 6 },
  { id: "apel-5", nama: "Apel Tika", benda: "apel", n: 5 },
  { id: "pensil-10", nama: "Pensil Upe", benda: "pensil", n: 10 },
  { id: "balon-7", nama: "Balon Kira", benda: "balon", n: 7 },
];

export const STASIUN_MESIN_KUMPULAN = [
  { id: "hitung", nama: "Hitung", ikon: "🔢" },
  { id: "cek", nama: "Cek", ikon: "🔍" },
  { id: "hasil", nama: "Hasil", ikon: "💬" },
  { id: "selesai", nama: "Selesai", ikon: "🏁" },
];

export const NAMA_KEADAAN_KUMPULAN: Record<KeadaanMesinKumpulan, string> = { hitung: "Hitung", cek: "Cek", hasil: "Hasil", sudah: "Selesai", selesai: "Selesai" };

export type OpsiKumpulan = { kunci: string; label: string };

const rotasi = <T,>(a: T[], k: number): T[] => a.map((_, i) => a[(i + k) % a.length]);

export const adalahGenap = (n: number) => n > 0 && n % 2 === 0;

/** Tiga pilihan banyak benda: yang benar, satu kurang, satu lebih. Tepat satu yang benar. */
export function opsiHitungKumpulan(d: DefKumpulan, misi: number): OpsiKumpulan[] {
  const semua = [d.n, d.n - 1, d.n + 1].map((n) => ({ kunci: String(n), label: String(n) }));
  return rotasi(semua, misi % semua.length);
}

export const OPSI_CEK: OpsiKumpulan[] = [
  { kunci: "bisa", label: "Bisa, sama banyak" },
  { kunci: "tidak", label: "Tidak bisa sama banyak" },
];

export const kunciHasilBenar = (d: DefKumpulan): string => (adalahGenap(d.n) ? String(d.n / 2) : "sisa");

/** Tiga pilihan hasil. Genap: setengahnya dan dua pengecoh. Ganjil: satu penjelasan benar dan dua penjelasan keliru. */
export function opsiHasil(d: DefKumpulan, misi: number): OpsiKumpulan[] {
  if (adalahGenap(d.n)) {
    const h = d.n / 2;
    const semua = [h, h - 1, h + 1].map((n) => ({ kunci: String(n), label: `${n} ${d.benda}` }));
    return rotasi(semua, misi % semua.length);
  }
  const bawah = (d.n - 1) / 2;
  const atas = (d.n + 1) / 2;
  const semua: OpsiKumpulan[] = [
    { kunci: "sisa", label: "Selalu ada 1 benda tersisa tanpa pasangan" },
    { kunci: String(atas), label: `Setiap kelompok ${atas} benda` },
    { kunci: String(bawah), label: `Setiap kelompok ${bawah} benda` },
  ];
  return rotasi(semua, misi % semua.length);
}

export type MesinKumpulan = {
  daftar: DefKumpulan[];
  misi: number;
  keadaan: KeadaanMesinKumpulan;
  riwayat: string[];
  pesan: string;
  ditolak: number;
  selesai: boolean;
};

export type PeristiwaMesinKumpulan =
  | { t: "HITUNG"; nilai: number }
  | { t: "CEK"; nilai: "bisa" | "tidak" }
  | { t: "HASIL"; nilai: string }
  | { t: "LANJUT" }
  | { t: "LOMPAT"; ke: number }
  | { t: "ULANG" };

export const awalMesinKumpulan = (daftar: DefKumpulan[] = KASUS_KUMPULAN): MesinKumpulan => ({ daftar, misi: 0, keadaan: "hitung", riwayat: [], pesan: "", ditolak: 0, selesai: false });

export const kumpulanAktif = (x: MesinKumpulan): DefKumpulan => x.daftar[x.misi];

export const indeksStasiunKumpulan = (k: KeadaanMesinKumpulan): number => ({ hitung: 0, cek: 1, hasil: 2, sudah: 3, selesai: 3 })[k];

const tolak = (x: MesinKumpulan, pesan: string): MesinKumpulan => ({ ...x, pesan, ditolak: x.ditolak + 1 });
const pindah = (x: MesinKumpulan, ke: KeadaanMesinKumpulan, tambah: Partial<MesinKumpulan> = {}): MesinKumpulan => ({
  ...x,
  ...tambah,
  keadaan: ke,
  pesan: "",
  riwayat: [...x.riwayat, `${NAMA_KEADAAN_KUMPULAN[x.keadaan]} → ${NAMA_KEADAAN_KUMPULAN[ke]}`].slice(-10),
});

export function ringkasKumpulan(d: DefKumpulan): string {
  return adalahGenap(d.n)
    ? `${d.nama}: ${d.n} ${d.benda} bisa dibagi dua sama banyak. Setengah dari ${d.n} adalah ${d.n / 2}.`
    : `${d.nama}: ${d.n} ${d.benda} tidak bisa dibagi dua sama banyak, karena ${d.n} ganjil. Selalu ada satu yang tersisa.`;
}

export function petunjukMesinKumpulan(x: MesinKumpulan): string {
  const d = kumpulanAktif(x);
  switch (x.keadaan) {
    case "hitung":
      return "Pertanyaan satu: ada berapa semua bendanya?";
    case "cek":
      return "Pertanyaan dua: bisakah dibagi menjadi dua kelompok yang sama banyak?";
    case "hasil":
      return adalahGenap(d.n) ? "Pertanyaan tiga: berapa banyak benda di setiap kelompok?" : "Pertanyaan tiga: apa yang terjadi bila dibagi dua?";
    case "sudah":
      return `Betul! ${ringkasKumpulan(d)}`;
    default:
      return "Semua kumpulan sudah diperiksa.";
  }
}

function tolakSalahTempat(x: MesinKumpulan): MesinKumpulan {
  switch (x.keadaan) {
    case "hitung":
      return tolak(x, "Hitung dulu semua bendanya. Itu pertanyaan pertama.");
    case "cek":
      return tolak(x, "Benda sudah dihitung. Sekarang cek: bisakah dibagi dua sama banyak?");
    case "hasil":
      return tolak(x, "Pengecekan sudah selesai. Sekarang tentukan hasilnya.");
    case "sudah":
      return tolak(x, "Kumpulan ini sudah diperiksa. Tekan lanjut ke kumpulan berikutnya.");
    default:
      return tolak(x, "Semua kumpulan sudah selesai. Main lagi kalau mau.");
  }
}

/** Satu langkah mesin. Selalu mengembalikan objek baru. */
export function langkahMesinKumpulan(x: MesinKumpulan, p: PeristiwaMesinKumpulan): MesinKumpulan {
  const d = kumpulanAktif(x);
  switch (p.t) {
    case "HITUNG": {
      if (x.keadaan !== "hitung") return tolakSalahTempat(x);
      if (p.nilai !== d.n) return tolak(x, "Hitung lagi satu per satu. Sentuh tiap benda sekali saja.");
      return pindah(x, "cek");
    }
    case "CEK": {
      if (x.keadaan !== "cek") return tolakSalahTempat(x);
      const benar = adalahGenap(d.n) ? "bisa" : "tidak";
      if (p.nilai !== benar) {
        return tolak(
          x,
          adalahGenap(d.n)
            ? "Coba pasangkan benda satu-satu. Semuanya punya pasangan, jadi bisa sama banyak."
            : "Coba pasangkan benda satu-satu. Ada satu benda yang tidak punya pasangan, jadi tidak bisa sama banyak."
        );
      }
      return pindah(x, "hasil");
    }
    case "HASIL": {
      if (x.keadaan !== "hasil") return tolakSalahTempat(x);
      if (p.nilai !== kunciHasilBenar(d)) {
        return tolak(
          x,
          adalahGenap(d.n)
            ? `Dua kelompok yang sama banyak, jadi jumlahnya harus ${d.n}. Coba hitung dua kali.`
            : "Kalau setiap kelompok punya jumlah yang sama, jumlah kedua kelompok harus tepat sama dengan semua benda. Coba lagi."
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
      if (p.ke === indeksStasiunKumpulan(x.keadaan)) return x;
      return tolak(x, "Mesin berjalan berurutan: hitung, cek, hasil. Jawab pertanyaan yang sekarang dulu.");
    }
    case "ULANG":
      return x.selesai ? awalMesinKumpulan(x.daftar) : x;
  }
}
