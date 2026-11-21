/**
 * Data Mind-map dan Infografis Kelas 4 Bab 1 Sub-Bab E "Meja Resepsi Bu Rina" (dirancang ulang per Sub-Bab, tanpa komponen kartu bersama).
 * Mind-map: TUMPUKAN KOPER tamu di meja resepsi (bel dan koper di papan meja); enam koper, tiap koper membawa gambar kecil satu langkah (245 + 378 tersusun, panah dari kanan, 5 + 8 = 13 simpan 1 (susun pendek),
 * susun panjang 500 + 110 + 13 lalu 600 + 20 + 3, 378 jadi 400, 245 + 378 = 623) dan satu pelat nama kosong di tutupnya. Pelat diketuk: judul langkah muncul dan dibacakan Guru.
 * Infografis: dua kartu dari angka Story. Kartu 1 = lembar daftar tamu Bu Rina (jumlah, tulis, dan simpan tiap tempat; jumlah tamu, susun panjang, tiga bilangan, hasil keliru Satria).
 * Kartu 2 = kartu acuan: aturan sepuluh jadi satu dan tangga Genapkan Dulu (378 jadi 400, 245 + 400, dikurangi 22). Digital saja. Suara tanpa digit lewat ejaK4B1. Diuji: scripts/uji-visual-k4b1def.mjs.
 */
import { ejaK4B1 } from "../eja-k4b1";

/** Pecah judul menjadi baris pendek (paling banyak maks huruf per baris) agar muat di pelat nama. */
export function bungkusJudul(judul: string, maks: number): string[] {
  const baris: string[] = [];
  let b = "";
  for (const k of judul.split(" ")) {
    if (b && `${b} ${k}`.length > maks) {
      baris.push(b);
      b = k;
    } else b = b ? `${b} ${k}` : k;
  }
  if (b) baris.push(b);
  return baris;
}

export type LangkahPeta = { judul: string; arti: string };
/** Enam langkah Mind-map (urutan sama dengan koper dari atas ke bawah). Arti dibacakan Guru (diejakan, tanpa digit). */
export const LANGKAH_RESEPSI: LangkahPeta[] = [
  { judul: "Tulis ke bawah", arti: "Langkah satu, cara susun pendek. Tulis kedua bilangan ke bawah, satuan di bawah satuan, puluhan di bawah puluhan, ratusan di bawah ratusan. Beri garis di bawahnya." },
  { judul: "Mulai dari kanan", arti: "Langkah dua. Mulai menjumlahkan dari kanan, yaitu dari satuan, lalu puluhan, lalu ratusan." },
  { judul: "Tulis sisa, simpan satu", arti: "Langkah tiga. Kalau jumlah satu tempat sepuluh atau lebih, tulis sisanya dan simpan satu ke tempat di kirinya. Simpanan itu ikut dijumlahkan. Bisa satu kali menyimpan, bisa dua kali." },
  { judul: "Susun panjang", arti: "Langkah empat. Cara lain adalah susun panjang, disebut juga Tambah Per Tempat. Uraikan tiap bilangan menjadi ratusan, puluhan, dan satuan. Jumlahkan ratusan dengan ratusan, puluhan dengan puluhan, satuan dengan satuan. Bagian yang sepuluh atau lebih diuraikan lagi, lalu semua hasil digabung per tempat." },
  { judul: "Genapkan dulu", arti: "Langkah lima. Kalau ada bilangan yang hampir bulat, bulatkan dulu, jumlahkan, lalu kurangi kelebihannya." },
  { judul: "Periksa hasilnya", arti: "Langkah enam. Periksa hasilnya dengan cara lain. Kedua cara harus memberi jumlah yang sama." },
];

/** Geometri gambar (viewBox 300 x 358): tumpukan enam koper, pelat nama di sisi kanan koper bergantian dengan tergeser. */
export const LEBAR_GAMBAR_RESEPSI = 300;
export const JUMLAH_KOPER_RESEPSI = LANGKAH_RESEPSI.length;
export const Y_AWAL_KOPER = 44;
export const JARAK_KOPER = 52;
export const TINGGI_KOPER = 46;
export const TINGGI_GAMBAR_RESEPSI = Y_AWAL_KOPER + (JUMLAH_KOPER_RESEPSI - 1) * JARAK_KOPER + TINGGI_KOPER + 8;
export const UKURAN_FONT_RESEPSI = 12;
export const MAKS_HURUF_BARIS_RESEPSI = 12;
export type KotakGambar = { x: number; y: number; w: number; h: number };
/** Badan koper ke-k. */
export const koper = (k: number): KotakGambar => ({ x: k % 2 ? 16 : 4, y: Y_AWAL_KOPER + k * JARAK_KOPER, w: 280, h: TINGGI_KOPER });
/** Panel gambar langkah di koper ke-k (sisi kiri). */
export const panel = (k: number): KotakGambar => ({ x: koper(k).x + 10, y: koper(k).y + 6, w: 140, h: 34 });
/** Pelat nama kosong di koper ke-k (sisi kanan). */
export const pelat = (k: number): KotakGambar => ({ x: koper(k).x + 158, y: koper(k).y + 6, w: 114, h: 34 });
export const WARNA_KOPER = ["#0F766E", "#B45309", "#1D4ED8", "#7C3AED", "#BE123C", "#4D7C0F"];
export const JUDUL_PETA_RESEPSI = "Meja Resepsi Bu Rina";
export const PETUNJUK_PETA_RESEPSI = "Koper-koper tamu menumpuk di meja resepsi. Ketuk pelat tanda tanya di tiap koper untuk melihat langkahnya.";
export const SELESAI_PETA_RESEPSI = "Koper rapi! Enam langkah sudah kamu buka.";

/* ------------------------------ Infografis ------------------------------ */
export const TAMU_PAGI = 245;
export const TAMU_SIANG = 378;
export const TAMU_SORE = 113;
export const TAMU_JUMLAH = TAMU_PAGI + TAMU_SIANG;
export const TAMU_SEMUA = TAMU_JUMLAH + TAMU_SORE;
export const TAMU_KELIRU = 513;
/** Susun panjang: jumlah tiap tempat sebelum diuraikan lagi (245 + 378: 200 + 300, 40 + 70, 5 + 8), dihitung dari tamu pagi dan siang. */
const jumlahPerTempat = [2, 1, 0].map((k) => (Math.floor(TAMU_PAGI / 10 ** k) % 10 + (Math.floor(TAMU_SIANG / 10 ** k) % 10)) * 10 ** k);

export type SelResepsi = { kunci: string; isi: string; suara: string; aria: string };
const digitDari = (n: number): number[] => String(n).padStart(3, "0").split("").map(Number);
const dP = digitDari(TAMU_PAGI);
const dS = digitDari(TAMU_SIANG);
/** Hitungan tiap tempat dari kanan: satuan 5 + 8 = 13, puluhan 4 + 7 + 1 = 12, ratusan 2 + 3 + 1 = 6 (dihitung, bukan diketik). */
export const BARIS_TEMPAT_RESEPSI = (() => {
  const hasil: { nama: string; tulis: string; jumlahTeks: string; tulisAngka: number; simpan: number }[] = [];
  let simpan = 0;
  const nama = ["satuan", "puluhan", "ratusan"];
  for (let k = 0; k < 3; k += 1) {
    const i = 2 - k;
    const jum = dP[i] + dS[i] + simpan;
    const teks = simpan > 0 ? `${dP[i]} + ${dS[i]} + ${simpan} = ${jum}` : `${dP[i]} + ${dS[i]} = ${jum}`;
    const tulisAngka = k === 2 ? jum : jum % 10;
    const baru = k === 2 ? 0 : Math.floor(jum / 10);
    hasil.push({ nama: nama[k], tulis: String(tulisAngka), jumlahTeks: teks, tulisAngka, simpan: baru });
    simpan = baru;
  }
  return hasil;
})();

/** Sembilan kotak tabel (3 tempat x jumlah, tulis, simpan) dan empat kotak bawah (jumlah, susun panjang, tiga bilangan, hasil keliru). */
export const SEL_KARTU1_RESEPSI: SelResepsi[] = [
  ...BARIS_TEMPAT_RESEPSI.flatMap((b, i): SelResepsi[] => [
    {
      kunci: `t-${i}-jum`,
      isi: b.jumlahTeks,
      suara: ejaK4B1(`Di ${b.nama}: ${b.jumlahTeks}.`),
      aria: `Jumlah di ${b.nama}: ${b.jumlahTeks}`,
    },
    {
      kunci: `t-${i}-tulis`,
      isi: String(b.tulisAngka),
      suara: i === 2 ? ejaK4B1(`Di ${b.nama} hasilnya ${b.tulisAngka}, jadi ${b.tulisAngka} ditulis utuh.`) : ejaK4B1(`Tulis ${b.tulisAngka} di ${b.nama}.`),
      aria: `Ditulis di ${b.nama}: ${b.tulisAngka}`,
    },
    {
      kunci: `t-${i}-simpan`,
      isi: b.simpan > 0 ? String(b.simpan) : "tidak ada",
      suara: b.simpan > 0 ? ejaK4B1(`Simpan ${b.simpan} ke tempat di kirinya. Sepuluh ${b.nama} menjadi satu ${i === 0 ? "puluhan" : "ratusan"}.`) : "Tidak ada yang disimpan lagi, karena jumlahnya kurang dari sepuluh.",
      aria: `Disimpan dari ${b.nama}: ${b.simpan > 0 ? b.simpan : "tidak ada"}`,
    },
  ]),
  { kunci: "f-jumlah", isi: `${TAMU_PAGI} + ${TAMU_SIANG} = ${TAMU_JUMLAH}`, suara: ejaK4B1(`Tamu pagi dan siang: ${TAMU_PAGI} + ${TAMU_SIANG} = ${TAMU_JUMLAH} tamu.`), aria: `Jumlah pagi dan siang: ${TAMU_JUMLAH}` },
  {
    kunci: "f-panjang",
    isi: `${jumlahPerTempat.join(" + ")} = ${TAMU_JUMLAH}`,
    suara: ejaK4B1(`Susun panjang: ${TAMU_PAGI} = 200 + 40 + 5 dan ${TAMU_SIANG} = 300 + 70 + 8. Jumlah tiap tempat ${jumlahPerTempat.join(" + ")}. Diuraikan lagi dan digabung per tempat, jadi 600 + 20 + 3 = ${TAMU_JUMLAH}.`),
    aria: `Susun panjang: ${jumlahPerTempat.join(" + ")} = ${TAMU_JUMLAH}`,
  },
  { kunci: "f-tiga", isi: `${TAMU_JUMLAH} + ${TAMU_SORE} = ${TAMU_SEMUA}`, suara: ejaK4B1(`Tamu sore ikut dijumlahkan: ${TAMU_PAGI} + ${TAMU_SIANG} + ${TAMU_SORE} = ${TAMU_SEMUA} tamu.`), aria: `Tiga bilangan: ${TAMU_SEMUA}` },
  { kunci: "f-salah", isi: `${TAMU_KELIRU} (keliru)`, suara: ejaK4B1(`Hasil ${TAMU_KELIRU} keliru, karena tidak ada yang disimpan. Hasil yang benar ${TAMU_JUMLAH} lebih besar ${TAMU_JUMLAH - TAMU_KELIRU}.`), aria: `Hasil keliru: ${TAMU_KELIRU}` },
];
export const BATAS_BULAT = 400;
export const KELEBIHAN = BATAS_BULAT - TAMU_SIANG;
/** Kartu 2: aturan sepuluh jadi satu (satu kotak) dan tangga Genapkan Dulu (empat kotak). */
export const SEL_KARTU2_RESEPSI: SelResepsi[] = [
  { kunci: "g-aturan", isi: "10 satuan = 1 puluhan", suara: ejaK4B1("Aturan simpan: 10 satuan menjadi 1 puluhan, dan 10 puluhan menjadi 1 ratusan."), aria: "Aturan simpan: 10 satuan = 1 puluhan" },
  { kunci: "g-bulat", isi: `${TAMU_SIANG} jadi ${BATAS_BULAT}, lebih ${KELEBIHAN}`, suara: ejaK4B1(`Genapkan ${TAMU_SIANG} menjadi ${BATAS_BULAT}. Itu kelebihan ${KELEBIHAN}.`), aria: `Genapkan: ${TAMU_SIANG} jadi ${BATAS_BULAT}` },
  { kunci: "g-jumlah", isi: `${TAMU_PAGI} + ${BATAS_BULAT} = ${TAMU_PAGI + BATAS_BULAT}`, suara: ejaK4B1(`Jumlahkan: ${TAMU_PAGI} + ${BATAS_BULAT} = ${TAMU_PAGI + BATAS_BULAT}.`), aria: `Jumlahkan: ${TAMU_PAGI + BATAS_BULAT}` },
  { kunci: "g-kurang", isi: `${TAMU_PAGI + BATAS_BULAT} − ${KELEBIHAN} = ${TAMU_JUMLAH}`, suara: ejaK4B1(`Kurangi kelebihan: ${TAMU_PAGI + BATAS_BULAT} − ${KELEBIHAN} = ${TAMU_JUMLAH}.`), aria: `Kurangi kelebihan: ${TAMU_JUMLAH}` },
  { kunci: "g-sama", isi: `${TAMU_JUMLAH} = ${TAMU_JUMLAH}`, suara: ejaK4B1(`Hasilnya ${TAMU_JUMLAH}, sama dengan hasil susun ke bawah. Jadi jumlahnya benar.`), aria: `Sama dengan hasil susun: ${TAMU_JUMLAH}` },
];
export const LABEL_TANGGA_RESEPSI = ["Genapkan", "Jumlahkan", "Kurangi kelebihan", "Cocok dengan susun"] as const;
export const JUDUL_INFO1_RESEPSI = "Daftar tamu Bu Rina";
export const PETUNJUK1_INFO_RESEPSI = "Ketuk tanda tanya untuk membuka hitungannya.";
export const PETUNJUK2_INFO_RESEPSI = "Kartu acuan. Ketuk tanda tanya untuk melihat aturan simpan dan empat langkah Genapkan Dulu.";
export const SELESAI1_INFO_RESEPSI = "Daftar lengkap! Dari kanan, tulis sisa, dan simpan satu.";
export const SELESAI2_INFO_RESEPSI = "Kartu lengkap! Genapkan, jumlahkan, kurangi kelebihan, dan cocokkan.";
