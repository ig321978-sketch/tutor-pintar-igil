/**
 * Definisi Mesin Bertahap Kelas 6 Bab 3 Sub-Bab B (Visualisasi Spasial), dijalankan mesin berstasiun
 * mesin-bertahap-k3b1.ts dan dieja ejaK6B3. Semua pertanyaan, kunci, dan pengecoh DIHITUNG dari matriks tinggi tiap kasus.
 *  - MESIN_TAMPAK (B): Matriks → Depan → Samping → Atas   (kasus Susunan Anike, Tumpukan Empat, Pagar Kubus)
 *    Matriks : seluruh kubus dari tinggi tiap petak.
 *    Depan   : jumlah tinggi terbesar tiap kolom.
 *    Samping : jumlah tinggi terbesar tiap baris.
 *    Atas    : petak yang terisi, tinggi tidak terlihat.
 * Baris pertama paling depan. Murni: tanpa React, tanpa jaringan. Hanya impor tipe. Diuji di scripts/uji-lab-k6b3.mjs.
 */
import type { DefMesin, KasusMesin, LangkahMesin, StasiunDef } from "./mesin-bertahap-k3b1";

const putar = <T,>(a: T[], k: number): T[] => a.map((_, i) => a[(i + k) % a.length]);
const susunOpsi = (benar: string, salah: string[], idx: number): string[] => putar([benar, ...salah], idx % (1 + salah.length));

/** Dua pengecoh bilangan yang berbeda dari jawaban dan satu sama lain, tidak negatif. */
const pengecoh = (benar: number, calon: number[]): string[] => {
  const hasil: number[] = [];
  for (const c of [...calon, benar + 1, benar + 2, benar - 1, benar + 3, benar - 2]) {
    if (Number.isInteger(c) && c >= 0 && c !== benar && !hasil.includes(c)) hasil.push(c);
    if (hasil.length === 2) break;
  }
  return hasil.map(String);
};

const jumlah = (a: number[]): number => a.reduce((s, v) => s + v, 0);
const terbesar = (a: number[]): number => a.reduce((s, v) => (v > s ? v : s), 0);

export type KasusTampak = {
  id: string;
  nama: string;
  konteks: string;
  /** Matriks tinggi: baris pertama paling depan, tinggi 0 berarti petak kosong. */
  m: number[][];
};

export const KASUS_TAMPAK: KasusTampak[] = [
  { id: "susunan", nama: "Susunan Anike", konteks: "Anike menyusun kubus pada alas dua kali dua", m: [[2, 1], [3, 4]] },
  { id: "tumpukan", nama: "Tumpukan Empat", konteks: "Anike menumpuk empat kubus lurus ke atas", m: [[4]] },
  { id: "pagar", nama: "Pagar Kubus", konteks: "Anike membuat pagar kubus dengan satu petak kosong", m: [[2, 0], [2, 2]] },
];

export const STASIUN_TAMPAK: StasiunDef[] = [
  { id: "matriks", nama: "Matriks", ikon: "🔢" },
  { id: "depan", nama: "Depan", ikon: "👀" },
  { id: "samping", nama: "Samping", ikon: "➡️" },
  { id: "atas", nama: "Atas", ikon: "⬆️" },
];

const kataMatriks = (m: number[][]): string => m.map((b, r) => `baris ${r === 0 ? "depan" : "belakang"} ${b.join(" dan ")}`).join(", ");

export function kasusMesinTampak(c: KasusTampak, idx: number): KasusMesin {
  const m = c.m;
  const kolom = Math.max(...m.map((b) => b.length));
  const maksKolom = Array.from({ length: kolom }, (_, k) => terbesar(m.map((b) => b[k] ?? 0)));
  const maksBaris = m.map(terbesar);
  const total = jumlah(m.map(jumlah));
  const depan = jumlah(maksKolom);
  const samping = jumlah(maksBaris);
  const atas = m.reduce((s, b) => s + b.filter((h) => h > 0).length, 0);
  const langkah: LangkahMesin[] = [
    {
      stasiun: "matriks",
      tanya: `${c.konteks}. Tinggi tiap petak: ${kataMatriks(m)}. Seluruh kubus ada …`,
      opsi: susunOpsi(String(total), pengecoh(total, [jumlah(m[0]), depan]), idx),
      benar: String(total),
      petunjuk: "Angka pada matriks adalah tinggi tiap petak. Jumlahkan semua tinggi pada semua baris.",
    },
    {
      stasiun: "depan",
      tanya: `Dilihat dari depan, tiap kolom menampilkan tinggi terbesarnya. Tampak depan memuat … petak.`,
      opsi: susunOpsi(String(depan), pengecoh(depan, [total, samping]), idx + 1),
      benar: String(depan),
      petunjuk: "Pada tiap kolom, tumpukan yang lebih rendah tertutup. Ambil tinggi terbesar tiap kolom, lalu jumlahkan.",
    },
    {
      stasiun: "samping",
      tanya: `Dilihat dari samping, tiap baris menampilkan tinggi terbesarnya. Tampak samping memuat … petak.`,
      opsi: susunOpsi(String(samping), pengecoh(samping, [total, depan]), idx + 2),
      benar: String(samping),
      petunjuk: "Pada tiap baris, tumpukan yang lebih rendah tertutup. Ambil tinggi terbesar tiap baris, lalu jumlahkan.",
    },
    {
      stasiun: "atas",
      tanya: `Dilihat dari atas, hanya petak yang terisi yang terlihat. Tampak atas memuat … petak.`,
      opsi: susunOpsi(String(atas), pengecoh(atas, [total, depan]), idx + 3),
      benar: String(atas),
      petunjuk: "Dari atas, tinggi tumpukan tidak terlihat. Hitung petak yang tingginya lebih dari nol, masing-masing satu kali.",
    },
  ];
  return {
    id: c.id,
    nama: c.nama,
    ringkas: `${kataMatriks(m)}: seluruhnya ${total} kubus. Tampak depan ${depan} petak, tampak samping ${samping} petak, tampak atas ${atas} petak.`,
    langkah,
  };
}

export const MESIN_TAMPAK: DefMesin = {
  id: "mesin-tampak-k6b3",
  judul: "Mesin Tampak",
  selesaiId: "mesin-tampak",
  stasiun: STASIUN_TAMPAK,
  kasus: KASUS_TAMPAK.map(kasusMesinTampak),
};
