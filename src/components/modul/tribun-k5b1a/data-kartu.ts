/**
 * Data Mind-map dan Infografis Kelas 5 Bab 1 Sub-Bab A "Tiket Tribun Bu Ningsih" (komponen milik Sub-Bab ini, bukan PetaLabel/InfoKartu).
 * Mind-map = papan angka Stadion Kota di atas tribun bertangga: lima tiket label kosong di lima anak tangga; diketuk, judul langkah muncul dan dibacakan Guru.
 * Infografis = dua kartu. Kartu 1 = papan angka empat tribun: tiap tribun memuat nama, tabel tempat lima kolom (angka sungguh di kolomnya, nol penjaga berwarna kuning),
 * angka bertitik, dan bacaannya; judul kolom tampil, isi kotak kosong (?) sampai diketuk lalu dibacakan Guru. Kartu 2 = kartu acuan: tabel Barat dengan periode,
 * lalu lima kolom, nol penjaga, titik pemisah, baca per periode, uraian, dan bilangan paling besar seratus ribu.
 * Kontrak data bersambung ke Sub-Bab B sampai D: penonton Timur 9.060, Selatan 18.705, Utara 24.350, Barat 30.402 orang (jumlah 82.517).
 * Semua angka SELALU dihitung dari bilangan lewat logika-data.ts. Suara tanpa digit. Diuji: scripts/uji-tribun-k5b1a.mjs.
 */
import { ejaK5B1 } from "../eja-k5b1";
import { NAMA_KOLOM, angkaDari, angkaKolom, banyakAngka, banyakNol, kata, kolomNol, lambang, periodeKanan, periodeKiri, teksUraian } from "./logika-data";

export type LangkahPeta = { judul: string; arti: string; ikon: string };

/** Lima langkah Mind-map: isi kotak tempat, jaga nol, pasang titik, baca per periode, uraikan. Arti dibacakan Guru (tanpa digit). */
export const LANGKAH_TRIBUN: LangkahPeta[] = [
  {
    judul: "Isi kotak tempat",
    arti: "Langkah satu. Isi kotak tempat. Gambar tabel dengan lima kolom, yaitu satuan, puluhan, ratusan, ribuan, dan puluh ribuan. Isi satu angka di tiap kolom, mulai dari kanan.",
    ikon: "\u{1F522}",
  },
  {
    judul: "Jaga nol",
    arti: "Langkah dua. Jaga nol. Kolom yang tidak disebut diisi nol penjaga, supaya angka lain tetap berada di kolom yang benar. Banyak angka harus sama dengan banyak kolom.",
    ikon: "⭕",
  },
  {
    judul: "Pasang titik",
    arti: "Langkah tiga. Pasang titik. Beri titik pemisah setiap tiga angka dari kanan, sehingga bilangan terbagi menjadi dua periode.",
    ikon: "\u{1F4CD}",
  },
  {
    judul: "Baca per periode",
    arti: "Langkah empat. Baca per periode. Baca periode kiri dan sambung dengan kata ribu, lalu baca periode kanan seperti bilangan pendek.",
    ikon: "\u{1F4E3}",
  },
  {
    judul: "Uraikan tiap angka",
    arti: "Langkah lima. Uraikan tiap angka. Banyak yang diwakili tiap angka bergantung pada kolomnya. Jumlahkan semuanya, dan hasilnya kembali menjadi bilangan semula.",
    ikon: "➕",
  },
];
export const JUDUL_PETA_TRIBUN = "Papan Angka Stadion";
export const IKON_JUDUL_PETA_TRIBUN = "\u{1F3AB}";
export const PETUNJUK_PETA_TRIBUN = "Papan angka Stadion Kota. Ketuk tiket kosong di tiap anak tangga tribun untuk melihat langkahnya.";
export const SELESAI_PETA_TRIBUN = "Tribun penuh! Lima langkah sudah kamu buka.";

/** Data Story yang bersambung ke Sub-Bab B sampai D (satuan orang). */
export type Tribun = { nama: string; n: number };
export const DATA_INFO: readonly Tribun[] = [
  { nama: "Timur", n: 9060 },
  { nama: "Selatan", n: 18705 },
  { nama: "Utara", n: 24350 },
  { nama: "Barat", n: 30402 },
];
export const SATUAN_INFO = "orang";
export const KOLOM_INFO_TRIBUN = ["Tribun", "Angka", "Tabel tempat", "Dibaca"];
/** Lima kolom tabel dari kiri ke kanan (nama untuk judul kolom papan). */
export const KOLOM_PAPAN_NAMA: readonly string[] = [...NAMA_KOLOM].slice(0, 5).reverse();
/** Angka tiap kolom papan (lima, dari kiri); kolom di kiri angka pertama kosong (null). */
export const papanTribun = (i: number): (number | null)[] => {
  const n = DATA_INFO[i].n;
  return Array.from({ length: 5 }, (_, j) => (5 - 1 - j < banyakAngka(n) ? angkaKolom(n, 4 - j) : null));
};
export const teksTribun = (i: number): string => `Tribun ${DATA_INFO[i].nama}`;
export const teksBacaTribun = (i: number): string => kata(DATA_INFO[i].n);

/** Suara satu kotak (tanpa digit): angka dieja. kol 0 = tribun, 1 = angka, 2 = tabel tempat, 3 = dibaca. */
export function suaraSel(i: number, kol: 0 | 1 | 2 | 3): string {
  const t = DATA_INFO[i];
  const nama = t.nama.toLowerCase();
  if (kol === 0) return `Inilah tribun ${nama}.`;
  if (kol === 1) return ejaK5B1(`Tribun ${nama} dihuni ${lambang(t.n)} ${SATUAN_INFO}. Titik pemisah ada setelah ribuan, tiga angka dari kanan.`);
  if (kol === 3) return `Dibaca ${kata(t.n)}.`;
  const s = String(t.n);
  const kolom = (j: number): string => NAMA_KOLOM[s.length - 1 - j];
  const bagian = Array.from(s, (c, j) => `${c === "0" ? "nol" : kata(Number(c))} di ${kolom(j)}`);
  const nolKalimat = banyakNol(t.n) > 0 ? ` Nol di ${kolomNol(t.n).map((k) => NAMA_KOLOM[k]).join(" dan ")} adalah nol penjaga.` : "";
  return `Isi tabelnya: ${bagian.join(", ")}.${nolKalimat}`;
}

export const PETUNJUK1_INFO_TRIBUN = "Papan angka stadion. Ketuk tanda tanya di tiap kotak untuk melihat isinya.";
export const PETUNJUK2_INFO_TRIBUN = "Kartu acuan. Ketuk kalimat hijau untuk mendengar cara membaca bilangan besar.";
export const SELESAI1_INFO_TRIBUN = "Papan lengkap! Tiap angka duduk di kolomnya, dan nol penjaga menjaga tempat.";
export const PESAN2_INFO_TRIBUN = "Ketuk kalimat hijau untuk mendengarnya.";

/** Tribun contoh pada kartu acuan: Barat (dua nol penjaga, di ribuan dan puluhan). */
export const BARAT_I = 3;
/** Bilangan paling besar yang dibahas. */
export const BATAS_INFO = 100000;
/** Kartu 2: tabel Barat dengan periode kiri dan kanan. */
export const periodeBarat = (): { kiri: string; kanan: string; kataKiri: string; kataKanan: string } => {
  const n = DATA_INFO[BARAT_I].n;
  return { kiri: periodeKiri(n), kanan: periodeKanan(n), kataKiri: kata(Number(periodeKiri(n))), kataKanan: kata(Number(periodeKanan(n))) };
};
export const digitBarat = (): number[] => angkaDari(DATA_INFO[BARAT_I].n);

/** Kartu acuan: enam kalimat, mencakup lima kolom, nol penjaga, titik pemisah, baca per periode, uraian, dan bilangan paling besar. */
export function kalimatAcuan(): { teks: string; suara: string }[] {
  const n = DATA_INFO[BARAT_I].n;
  const p = periodeBarat();
  const nolK = kolomNol(n).map((k) => NAMA_KOLOM[k]);
  return [
    {
      teks: "Lima kolom: puluh ribuan, ribuan, ratusan, puluhan, satuan",
      suara: "Tabel tempat punya lima kolom, dari kiri ke kanan: puluh ribuan, ribuan, ratusan, puluhan, dan satuan. Satu kolom diisi satu angka.",
    },
    {
      teks: `Nol penjaga: ${lambang(n)} memakai dua nol`,
      suara: ejaK5B1(`Bilangan ${lambang(n)} memakai ${banyakNol(n)} nol penjaga, yaitu di ${nolK.join(" dan ")}. Nol itu menjaga supaya angka lain tetap di kolomnya.`),
    },
    {
      teks: `Titik pemisah: ${lambang(n)}, tiga angka dari kanan`,
      suara: ejaK5B1(`Titik pemisah ditaruh tiga angka dari kanan, jadi tulisannya ${lambang(n)}. Bilangan terbagi menjadi dua periode.`),
    },
    {
      teks: `Baca per periode: ${p.kiri} | ${p.kanan}`,
      suara: `Periode kiri dibaca ${p.kataKiri} dan disambung kata ribu. Lalu periode kanan dibaca ${p.kataKanan}. Jadi bacaannya ${kata(n)}.`,
    },
    {
      teks: `Uraian: ${lambang(n)} = ${teksUraian(n).replace(/ \+ /g, " + ")}`,
      suara: ejaK5B1(`Uraiannya ${teksUraian(n).replace(/ \+ /g, " ditambah ")}. Tiap angka mewakili banyak yang sesuai dengan kolomnya, dan jumlahnya kembali menjadi ${lambang(n)}.`),
    },
    {
      teks: `Paling besar: ${lambang(BATAS_INFO)}, kolom ratusan ribu`,
      suara: ejaK5B1(`Bilangan paling besar di sini adalah ${lambang(BATAS_INFO)}. Bilangan itu memerlukan kolom baru di kiri, yaitu ratusan ribu.`),
    },
  ];
}
