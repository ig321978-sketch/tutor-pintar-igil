/**
 * Data Mind-map dan Infografis Kelas 5 Bab 3 Sub-Bab A "Tiga Kantong Tepung Bu Ratna" (komponen milik Sub-Bab ini, bukan PetaLabel/InfoKartu).
 * Mind-map = timbangan Bu Ratna di atas rak dengan enam kantong tepung label kosong; kantong diketuk, judul langkah muncul dan dibacakan Guru.
 * Infografis = dua kartu. Kartu 1 = rak tiga kantong tepung: istilah pecahan biasa dan campuran, bilangan bulat tiap kantong, dan campuran diubah menjadi biasa (dua bulat tiga per empat, tiga bulat satu per dua, satu bulat tujuh per delapan kilogram).
 * Kartu 2 = garis bilangan nol sampai empat dengan tiga titik kantong, KPK penyebut (empat, dua, delapan menjadi delapan), pembilang setelah disamakan, tanda lebih besar, lebih kecil, sama dengan, dan urutan.
 * Kontrak data bersambung ke Sub-Bab B dan C: tiga kantong tepung Bu Ratna. Semua angka SELALU dihitung dari bilangan lewat logika-data.ts. Suara tanpa digit.
 * Diuji: scripts/uji-timbang-k5b3a.mjs.
 */
import { eja, keBiasa, kpkDaftar, pec, pembilangSama, tandaBanding, teksPec, urutan, type Pec } from "./logika-data";

export type LangkahPeta = { judul: string; arti: string; ikon: string };

/** Enam langkah Mind-map: kenali bentuk, lihat bulatnya, ubah ke biasa, samakan penyebut, bandingkan pembilang, letakkan di garis. Arti dibacakan Guru (tanpa digit). */
export const LANGKAH_TIMBANG: LangkahPeta[] = [
  {
    judul: "Kenali bentuk",
    arti: "Langkah satu. Kenali bentuk. Lihat dulu apakah pecahan itu biasa atau campuran. Pecahan biasa hanya punya pembilang dan penyebut. Pecahan campuran punya bilangan bulat dan pecahan biasa.",
    ikon: "\u{1F50D}",
  },
  {
    judul: "Lihat bulatnya",
    arti: "Langkah dua. Lihat bulatnya. Pada pecahan campuran, bandingkan bilangan bulatnya lebih dulu. Bilangan bulat yang lebih besar menunjukkan pecahan yang lebih besar.",
    ikon: "\u{1F440}",
  },
  {
    judul: "Ubah ke biasa",
    arti: "Langkah tiga. Ubah ke biasa. Kalikan bilangan bulat dengan penyebut, lalu tambahkan pembilang. Penyebutnya tetap.",
    ikon: "\u{1F504}",
  },
  {
    judul: "Samakan penyebut",
    arti: "Langkah empat. Samakan penyebut. Cari KPK dari semua penyebut, lalu ubah tiap pecahan menjadi pecahan yang sama besar dengan penyebut itu.",
    ikon: "\u{1F522}",
  },
  {
    judul: "Bandingkan pembilang",
    arti: "Langkah lima. Bandingkan pembilang. Kalau penyebut sudah sama, pecahan dengan pembilang terbesar adalah yang terbesar. Tulis hasilnya dengan tanda lebih besar, lebih kecil, atau sama dengan.",
    ikon: "⚖️",
  },
  {
    judul: "Letakkan di garis",
    arti: "Langkah enam. Letakkan di garis. Pada garis bilangan, makin ke kanan makin besar dan makin ke kiri makin kecil, jadi urutannya terbaca dari kiri ke kanan.",
    ikon: "\u{1F4CF}",
  },
];
export const JUDUL_PETA_TIMBANG = "Timbangan Bu Ratna";
export const IKON_JUDUL_PETA_TIMBANG = "\u{1F35E}";
export const PETUNJUK_PETA_TIMBANG = "Toko Roti Keliling Bu Ratna. Ketuk kantong tepung kosong untuk melihat langkahnya.";
export const SELESAI_PETA_TIMBANG = "Semua kantong terbuka! Enam langkah sudah kamu buka.";

/** Data Story yang bersambung ke Sub-Bab B dan C: tiga kantong tepung Bu Ratna (satuan kilogram). */
export const SATUAN_INFO = "kilogram";
export const KANTONG: readonly { nama: string; f: Pec }[] = [
  { nama: "pertama", f: pec(2, 3, 4) },
  { nama: "kedua", f: pec(3, 1, 2) },
  { nama: "ketiga", f: pec(1, 7, 8) },
];
export const PENYEBUT_INFO: number[] = KANTONG.map((k) => k.f.q);
export const KPK_INFO: number = kpkDaftar(PENYEBUT_INFO);
/** Urutan indeks kantong dari yang terbesar. */
export const URUT_BESAR: number[] = urutan(KANTONG.map((k) => k.f), false);
export const URUT_KECIL: number[] = urutan(KANTONG.map((k) => k.f), true);
/** Maksimum garis bilangan kartu 2 dan banyak ruas per satuan (KPK). */
export const MAKS_GARIS_INFO = 4;
export const pembilangKpk = (i: number): number => pembilangSama(KANTONG[i].f, KPK_INFO);
export const posisiRuasInfo = (i: number): number => keBiasa(KANTONG[i].f).p * (KPK_INFO / KANTONG[i].f.q);

/** Contoh pecahan biasa dan istilah (kartu 1). */
export const CONTOH_BIASA = pec(0, 3, 4);

export const PETUNJUK1_INFO_TIMBANG = "Rak tiga kantong tepung. Ketuk tanda tanya di tiap kotak untuk melihat isinya.";
export const PETUNJUK2_INFO_TIMBANG = "Garis bilangan dan KPK. Ketuk tanda tanya untuk menaruh kantong di garis dan membandingkannya.";
export const SELESAI1_INFO_TIMBANG = "Rak lengkap! Tiap campuran bisa diubah menjadi pecahan biasa, dan bilangan bulat ikut menentukan.";
export const SELESAI2_INFO_TIMBANG = "Garis lengkap! Penyebut disamakan dengan KPK, pembilang dibandingkan, dan urutan terbaca dari kiri ke kanan.";

/* ------------------------------ Suara kartu 1 ------------------------------ */
export const suaraBiasa = eja(`Pecahan biasa hanya punya pembilang di atas dan penyebut di bawah, seperti ${teksPec(CONTOH_BIASA)}. Pembilangnya ${CONTOH_BIASA.p} dan penyebutnya ${CONTOH_BIASA.q}.`);
export const suaraCampuran = eja(`Pecahan campuran terdiri atas bilangan bulat dan pecahan biasa, seperti ${teksPec(KANTONG[0].f)}.`);
export function suaraBulat(i: number): string {
  const w = KANTONG[i].f.w;
  return i === 0
    ? eja(`Kantong ${KANTONG[i].nama} punya bilangan bulat ${w}. Bilangan bulat dibandingkan lebih dulu.`)
    : i === 1
      ? eja(`Kantong ${KANTONG[i].nama} punya bilangan bulat ${w}, yang lebih besar dari ${KANTONG[0].f.w}.`)
      : eja(`Kantong ${KANTONG[i].nama} punya bilangan bulat ${w}, yang paling kecil, jadi kantong ini paling ringan.`);
}
export function suaraUbah(i: number): string {
  const f = KANTONG[i].f;
  const b = keBiasa(f);
  return eja(`${f.w} × ${f.q} + ${f.p} = ${b.p}, jadi ${teksPec(f)} sama besar dengan ${b.p}/${b.q}. Penyebutnya tetap ${f.q}.`);
}

/* ------------------------------ Suara kartu 2 ------------------------------ */
export function suaraGaris(i: number): string {
  const f = KANTONG[i].f;
  return eja(`${teksPec(f)} ${SATUAN_INFO} ada di antara ${f.w} dan ${f.w + 1} pada garis bilangan. Makin ke kanan makin besar.`);
}
export const suaraKpk = eja(`Penyebutnya ${PENYEBUT_INFO.slice(0, -1).join(", ")}, dan ${PENYEBUT_INFO[PENYEBUT_INFO.length - 1]}. KPK-nya adalah ${KPK_INFO}, jadi penyebut disamakan menjadi ${KPK_INFO}.`);
export function suaraPembilang(i: number): string {
  const f = KANTONG[i].f;
  const b = keBiasa(f);
  const m = KPK_INFO / f.q;
  return eja(`${b.p}/${b.q} dikali ${m} di pembilang dan penyebut menjadi ${pembilangKpk(i)}/${KPK_INFO}.`);
}
/** Kotak tanda: besar (kantong pertama dan kedua), kecil (ketiga dan pertama), dan sama dengan (biasa dan campuran). */
export const tandaInfo = (i: number, j: number): string => `${teksPec(KANTONG[i].f)} ${tandaBanding(KANTONG[i].f, KANTONG[j].f)} ${teksPec(KANTONG[j].f)}`;
export const suaraTanda = (i: number, j: number): string => {
  const t = tandaBanding(KANTONG[i].f, KANTONG[j].f);
  return eja(`Pembilang ${pembilangKpk(i)} dibandingkan dengan ${pembilangKpk(j)}, jadi ${teksPec(KANTONG[i].f)} ${t} ${teksPec(KANTONG[j].f)}.`);
};
/** Tanda sama dengan: pecahan biasa hasil ubahan sama besar dengan pecahan campurannya. */
export const tandaSama = (i: number): string => `${keBiasa(KANTONG[i].f).p}/${KANTONG[i].f.q} = ${teksPec(KANTONG[i].f)}`;
export const suaraSama = (i: number): string => eja(`Tanda sama dengan dipakai kalau kedua pecahan sama besar: ${tandaSama(i)}.`);
export const urutanInfo = (): string => URUT_KECIL.map((i) => teksPec(KANTONG[i].f)).join(" < ");
export const suaraUrutan = eja(`Dari yang terkecil: ${urutanInfo()}. Dari yang terbesar, urutannya terbalik: ${URUT_BESAR.map((i) => teksPec(KANTONG[i].f)).join(" > ")}.`);
