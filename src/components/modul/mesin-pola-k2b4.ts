/**
 * Mesin Tiga Pemeriksaan (Kelas 2 Bab 4, Sub-Bab B): mesin keadaan pemeriksa pola.
 * Tiap barisan melewati stasiun berurutan:
 *   Cek (berulang teratur, atau bukan pola?) -> Ciri -> Bukti -> barisan berikutnya.
 *   Jalur pola:  Ciri = satuan terpendek yang berulang dari awal, Bukti = unsur berikutnya.
 *   Jalur bukan: Ciri = alasan barisan bukan pola,                 Bukti = syarat supaya jadi pola.
 * Mesin menolak langkah yang melompati pertanyaan dan memberi petunjuk, tanpa hukuman.
 * Murni: tanpa React, tanpa jaringan, tanpa impor nilai. Diuji di scripts/uji-lab-k2b4.mjs.
 */

export type JenisMesin = "warna" | "bentuk" | "gerakan";
export type KeadaanMesinPola = "cek" | "ciri" | "bukti" | "sudah" | "selesai";
export type JalurMesin = "pola" | "bukan";

export type DefBarisanMesin = { id: string; nama: string; jenis: JenisMesin; seq: string[] };

const PALET_MESIN: Record<JenisMesin, string[]> = {
  warna: ["merah", "biru", "kuning", "hijau"],
  bentuk: ["lingkaran", "persegi", "segitiga", "bintang"],
  gerakan: ["berdiri", "tanganNaik", "membungkuk"],
};

export const NAMA_MESIN_UNSUR: Record<string, string> = {
  merah: "merah", biru: "biru", kuning: "kuning", hijau: "hijau",
  lingkaran: "lingkaran", persegi: "persegi", segitiga: "segitiga", bintang: "bintang",
  berdiri: "berdiri", tanganNaik: "tangan naik", membungkuk: "membungkuk",
};

export const sebutMesin = (seq: readonly string[]): string => seq.map((t) => NAMA_MESIN_UNSUR[t] ?? t).join(", ");

/** Empat barisan: dua pola (p = 3 dan p = 2) dan dua bukan pola (semua sama, kelompok tidak teratur). */
export const BARISAN_MESIN: DefBarisanMesin[] = [
  { id: "taplak", nama: "Taplak Panen", jenis: "warna", seq: ["merah", "biru", "biru", "merah", "biru", "biru", "merah", "biru"] },
  { id: "gelang-sama", nama: "Gelang Kuning", jenis: "warna", seq: ["kuning", "kuning", "kuning", "kuning", "kuning", "kuning"] },
  { id: "bendera", nama: "Bendera Hiasan", jenis: "bentuk", seq: ["lingkaran", "persegi", "lingkaran", "persegi", "lingkaran", "persegi", "lingkaran"] },
  { id: "tarian-acak", nama: "Gerakan Tarian", jenis: "gerakan", seq: ["berdiri", "tanganNaik", "tanganNaik", "berdiri", "tanganNaik", "berdiri", "berdiri"] },
];

export const STASIUN_MESIN_POLA = [
  { id: "cek", nama: "Cek", ikon: "🔍" },
  { id: "ciri", nama: "Ciri", ikon: "🧩" },
  { id: "bukti", nama: "Bukti", ikon: "🔎" },
  { id: "selesai", nama: "Selesai", ikon: "🏁" },
];

export const NAMA_KEADAAN_MESIN: Record<KeadaanMesinPola, string> = { cek: "Cek", ciri: "Ciri", bukti: "Bukti", sudah: "Selesai", selesai: "Selesai" };

/** Panjang satuan terpendek yang berulang dari awal, 0 bila tidak ada. */
export function terpendekMesin(seq: readonly string[]): number {
  for (let p = 1; p <= Math.floor(seq.length / 2); p += 1) if (seq.every((t, i) => t === seq[i % p])) return p;
  return 0;
}

const semuaSama = (seq: readonly string[]) => new Set(seq).size === 1;
const unitSah = (seq: readonly string[], q: number) => q >= 1 && q <= seq.length && seq.every((t, i) => t === seq[i % q]);

export const adalahPolaMesin = (d: DefBarisanMesin): boolean => terpendekMesin(d.seq) > 0 && !semuaSama(d.seq);
export const jalurBarisan = (d: DefBarisanMesin): JalurMesin => (adalahPolaMesin(d) ? "pola" : "bukan");

export type OpsiMesin = { kunci: string; label: string };

const rotasi = <T,>(a: T[], k: number): T[] => a.map((_, i) => a[(i + k) % a.length]);

/** Kunci satuan: unsur dipisah koma. */
export const kunciSatuan = (seq: readonly string[]): string => seq.join(",");

/** Tiga pilihan Ciri. Letak jawaban benar berputar menurut barisan ke-berapa. Tepat satu yang benar. */
export function opsiCiri(d: DefBarisanMesin, misi: number): OpsiMesin[] {
  if (adalahPolaMesin(d)) {
    const p = terpendekMesin(d.seq);
    const salah: number[] = [];
    for (const q of [p - 1, p + 1, p + 2, p - 2, p + 3]) {
      if (q >= 1 && q <= d.seq.length && q !== p && !unitSah(d.seq, q) && !salah.includes(q) && salah.length < 2) salah.push(q);
    }
    const semua = [p, ...salah].map((q) => ({ kunci: kunciSatuan(d.seq.slice(0, q)), label: sebutMesin(d.seq.slice(0, q)) }));
    return rotasi(semua, misi % semua.length);
  }
  const semua: OpsiMesin[] = [
    { kunci: "sama", label: "Semua unsurnya sama saja" },
    { kunci: "acak", label: "Kelompoknya tidak berulang dengan teratur" },
    { kunci: "panjang", label: "Barisannya terlalu panjang" },
  ];
  return rotasi(semua, misi % semua.length);
}

export const kunciCiriBenar = (d: DefBarisanMesin): string => (adalahPolaMesin(d) ? kunciSatuan(d.seq.slice(0, terpendekMesin(d.seq))) : semuaSama(d.seq) ? "sama" : "acak");

/** Unsur berikutnya pada barisan pola. */
export const unsurBerikut = (d: DefBarisanMesin): string | null => {
  const p = terpendekMesin(d.seq);
  return adalahPolaMesin(d) ? d.seq[d.seq.length % p] : null;
};

/** Tiga pilihan Bukti. Tepat satu yang benar. */
export function opsiBukti(d: DefBarisanMesin, misi: number): OpsiMesin[] {
  if (adalahPolaMesin(d)) {
    const benar = unsurBerikut(d)!;
    const lain = PALET_MESIN[d.jenis].filter((t) => t !== benar).slice(0, 2);
    const semua = [benar, ...lain].map((t) => ({ kunci: t, label: NAMA_MESIN_UNSUR[t] ?? t }));
    return rotasi(semua, misi % semua.length);
  }
  const semua: OpsiMesin[] = [
    { kunci: "syarat", label: "Berulang teratur dan punya dua unsur berbeda" },
    { kunci: "satu", label: "Semua unsurnya sama saja" },
    { kunci: "tanpaulang", label: "Tidak boleh ada kelompok yang berulang" },
  ];
  return rotasi(semua, misi % semua.length);
}

export const kunciBuktiBenar = (d: DefBarisanMesin): string => (adalahPolaMesin(d) ? unsurBerikut(d)! : "syarat");

export type MesinPola = {
  daftar: DefBarisanMesin[];
  misi: number;
  keadaan: KeadaanMesinPola;
  jalur: JalurMesin | null;
  riwayat: string[];
  pesan: string;
  ditolak: number;
  selesai: boolean;
};

export type PeristiwaMesinPola =
  | { t: "CEK"; nilai: JalurMesin }
  | { t: "CIRI"; nilai: string }
  | { t: "BUKTI"; nilai: string }
  | { t: "LANJUT" }
  | { t: "LOMPAT"; ke: number }
  | { t: "ULANG" };

export const awalMesinPola = (daftar: DefBarisanMesin[] = BARISAN_MESIN): MesinPola => ({
  daftar,
  misi: 0,
  keadaan: "cek",
  jalur: null,
  riwayat: [],
  pesan: "",
  ditolak: 0,
  selesai: false,
});

export const barisanAktif = (x: MesinPola): DefBarisanMesin => x.daftar[x.misi];

/** Indeks stasiun pada peta (Cek, Ciri, Bukti, Selesai). */
export const indeksStasiunPola = (k: KeadaanMesinPola): number => ({ cek: 0, ciri: 1, bukti: 2, sudah: 3, selesai: 3 })[k];

const tolak = (x: MesinPola, pesan: string): MesinPola => ({ ...x, pesan, ditolak: x.ditolak + 1 });
const pindah = (x: MesinPola, ke: KeadaanMesinPola, tambah: Partial<MesinPola> = {}): MesinPola => ({
  ...x,
  ...tambah,
  keadaan: ke,
  pesan: "",
  riwayat: [...x.riwayat, `${NAMA_KEADAAN_MESIN[x.keadaan]} → ${NAMA_KEADAAN_MESIN[ke]}`].slice(-10),
});

/** Ringkasan setelah barisan dikenali. */
export function ringkasMesin(d: DefBarisanMesin): string {
  if (adalahPolaMesin(d)) {
    const p = terpendekMesin(d.seq);
    return `${d.nama} adalah pola. Satuannya ${sebutMesin(d.seq.slice(0, p))}, dan unsur berikutnya ${NAMA_MESIN_UNSUR[unsurBerikut(d)!]}.`;
  }
  return semuaSama(d.seq) ? `${d.nama} bukan pola, karena semua unsurnya sama.` : `${d.nama} bukan pola, karena kelompoknya tidak berulang dengan teratur.`;
}

export function petunjukMesinPola(x: MesinPola): string {
  const d = barisanAktif(x);
  switch (x.keadaan) {
    case "cek":
      return "Pertanyaan satu: barisan ini berulang dengan teratur, atau bukan pola?";
    case "ciri":
      return x.jalur === "pola" ? "Pertanyaan dua: kelompok terpendek mana yang berulang dari awal?" : "Pertanyaan dua: apa alasan barisan ini bukan pola?";
    case "bukti":
      return x.jalur === "pola" ? "Pertanyaan tiga: unsur apa yang datang berikutnya?" : "Pertanyaan tiga: supaya jadi pola, barisan harus bagaimana?";
    case "sudah":
      return `Betul! ${ringkasMesin(d)}`;
    default:
      return "Semua barisan sudah diperiksa.";
  }
}

function tolakSalahTempat(x: MesinPola): MesinPola {
  switch (x.keadaan) {
    case "cek":
      return tolak(x, "Tanya pertama dulu: barisan ini pola atau bukan?");
    case "ciri":
      return tolak(x, x.jalur === "pola" ? "Barisan ini pola, jadi cari dulu kelompok terpendek yang berulang." : "Barisan ini bukan pola, jadi cari dulu alasannya.");
    case "bukti":
      return tolak(x, x.jalur === "pola" ? "Satuan sudah ditemukan. Sekarang tentukan unsur berikutnya." : "Alasan sudah ditemukan. Sekarang tentukan syaratnya.");
    case "sudah":
      return tolak(x, "Barisan ini sudah diperiksa. Tekan lanjut ke barisan berikutnya.");
    default:
      return tolak(x, "Semua barisan sudah selesai. Main lagi kalau mau.");
  }
}

/** Satu langkah mesin. Selalu mengembalikan objek baru. */
export function langkahMesinPola(x: MesinPola, p: PeristiwaMesinPola): MesinPola {
  const d = barisanAktif(x);
  switch (p.t) {
    case "CEK": {
      if (x.keadaan !== "cek") return tolakSalahTempat(x);
      if (p.nilai !== jalurBarisan(d)) {
        if (jalurBarisan(d) === "pola") return tolak(x, "Baca barisan dari awal. Ada kelompok yang berulang lagi dan lagi dengan teratur. Itu pola.");
        return tolak(x, semuaSama(d.seq) ? "Baca barisan dari awal. Semua unsurnya sama saja. Pola butuh dua unsur yang berbeda." : "Baca barisan dari awal. Kelompoknya tidak berulang dengan teratur, jadi ini bukan pola.");
      }
      return pindah(x, "ciri", { jalur: p.nilai });
    }
    case "CIRI": {
      if (x.keadaan !== "ciri") return tolakSalahTempat(x);
      if (p.nilai !== kunciCiriBenar(d)) {
        return tolak(
          x,
          x.jalur === "pola"
            ? "Ulangi kelompok itu dari awal. Apakah hasilnya sama dengan barisan yang kamu lihat? Pilih kelompok terpendek yang cocok."
            : "Perhatikan barisannya lagi. Apakah semua unsurnya sama, atau kelompoknya yang tidak teratur?"
        );
      }
      return pindah(x, "bukti");
    }
    case "BUKTI": {
      if (x.keadaan !== "bukti") return tolakSalahTempat(x);
      if (p.nilai !== kunciBuktiBenar(d)) {
        return tolak(x, x.jalur === "pola" ? `Ulangi satuan ${sebutMesin(d.seq.slice(0, terpendekMesin(d.seq)))} dari awal. Ke mana urutannya lanjut setelah unsur terakhir?` : "Ingat: pola berulang dengan teratur dan punya paling sedikit dua unsur yang berbeda.");
      }
      return pindah(x, "sudah");
    }
    case "LANJUT": {
      if (x.keadaan !== "sudah") return tolakSalahTempat(x);
      if (x.misi + 1 < x.daftar.length) return pindah(x, "cek", { misi: x.misi + 1, jalur: null });
      return pindah(x, "selesai", { selesai: true });
    }
    case "LOMPAT": {
      if (p.ke === indeksStasiunPola(x.keadaan)) return x;
      return tolak(x, "Mesin berjalan berurutan: cek, ciri, bukti. Jawab pertanyaan yang sekarang dulu.");
    }
    case "ULANG":
      return x.selesai ? awalMesinPola(x.daftar) : x;
  }
}
