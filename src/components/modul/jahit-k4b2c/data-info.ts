/**
 * Data Infografis Kelas 4 Bab 2 Sub-Bab C "Meja Jahit Kak Sekar": DUA kartu, tiap kartu satu layar tanpa gulir, dari potongan kain dan angka Story C.
 * Kartu 1 "Deret potongan" = lima potongan kain digambar sungguh (satu per dua, dua per empat, empat per delapan, enam per delapan, dan tiga per empat hasil tambah dua yang keliru);
 * tiap potongan punya dua isian tertutup (pecahan dan caranya) yang diketuk. Kartu 2 "Kotak jahit" = lima kantong aturan (Cocokkan Daerah, Kali Bentuk Satu, Bagi Keduanya, berhenti, jangan menambah),
 * angka dari video metode Story C (satu per tiga ke empat per dua belas, delapan per dua belas ke dua per tiga). Digital saja: suara dan kanvas hanya di CPA.
 * Diuji: scripts/uji-jahit-k4b2c.mjs.
 */
import { ucapkan as ucap } from "./logika-cpa";
import { BAGI_DUA, SALAH_TAMBAH, TUMPUKAN, hasilBagi, hasilTambah, type Pecah } from "./data-peta";

/** Ucapan tanpa digit yang diawali huruf kapital. */
const ucapkan = (t: string): string => {
  const u = ucap(t);
  return u.charAt(0).toUpperCase() + u.slice(1);
};

export type Sel = { t: string; pec?: [number, number]; suara: string };
export type Potongan = { id: string; nama: string; p: number; q: number; salah: boolean; sel: [Sel, Sel] };

const pc = (a: Pecah): [number, number] => [a.p, a.q];

/** Kartu 1: lima potongan. `salah` = potongan hasil tambah dua yang lebih panjang dari satu per dua. */
export const POTONGAN: Potongan[] = [
  { id: "setengah", nama: "potongan awal", p: TUMPUKAN[0].p, q: TUMPUKAN[0].q, salah: false, sel: [{ t: "1/2", pec: pc(TUMPUKAN[0]), suara: ucapkan("Satu bagian dari 2 bagian sama besar, 1/2.") }, { t: "awal", suara: ucapkan("Potongan awal ini jadi acuan untuk dibandingkan.") }] },
  { id: "dua-empat", nama: "ditumpuk", p: TUMPUKAN[1].p, q: TUMPUKAN[1].q, salah: false, sel: [{ t: "2/4", pec: pc(TUMPUKAN[1]), suara: ucapkan("Dua bagian dari 4 bagian, 2/4.") }, { t: "× 2", suara: ucapkan("Pembilang dan penyebut 1/2 dikali 2, hasilnya 2/4, sama besar.") }] },
  { id: "empat-delapan", nama: "ditumpuk lagi", p: TUMPUKAN[2].p, q: TUMPUKAN[2].q, salah: false, sel: [{ t: "4/8", pec: pc(TUMPUKAN[2]), suara: ucapkan("Empat bagian dari 8 bagian, 4/8.") }, { t: "× 4", suara: ucapkan("Pembilang dan penyebut 1/2 dikali 4, hasilnya 4/8, sama besar.") }] },
  {
    id: "enam-delapan",
    nama: "dibagi dua",
    p: BAGI_DUA.dari.p,
    q: BAGI_DUA.dari.q,
    salah: false,
    sel: [
      { t: "6/8", pec: pc(BAGI_DUA.dari), suara: ucapkan("Enam bagian dari 8 bagian, 6/8.") },
      { t: `÷ ${BAGI_DUA.pembagi} = ${hasilBagi().p}/${hasilBagi().q}`, suara: ucapkan(`Pembilang dan penyebut 6/8 dibagi ${BAGI_DUA.pembagi}, hasilnya ${hasilBagi().p}/${hasilBagi().q}, lebih sederhana.`) },
    ],
  },
  {
    id: "tambah",
    nama: "ditambah dua",
    p: hasilTambah().p,
    q: hasilTambah().q,
    salah: true,
    sel: [
      { t: `${hasilTambah().p}/${hasilTambah().q}`, pec: pc(hasilTambah()), suara: ucapkan(`1/2 ditambah ${SALAH_TAMBAH.tambah} pada pembilang dan penyebut menjadi ${hasilTambah().p}/${hasilTambah().q}.`) },
      { t: "≠ 1/2", suara: ucapkan("Potongan ini lebih panjang dari 1/2, jadi tidak sama besar. Cara menambah itu keliru.") },
    ],
  },
];

/** Kartu 2: lima kantong aturan. `gambar` = potongan kecil yang digambar (Cocokkan Daerah), `lihat` = pecahan yang terlihat. */
export type Kantong = { id: string; label: string; ikon: string; lihat?: [number, number]; gambar?: { n: number; k: number }[]; isi: string; suara: string };
export const KANTONG: Kantong[] = [
  { id: "daerah", label: "Cocokkan Daerah", ikon: "\u{1F4D0}", gambar: [{ n: 3, k: 1 }, { n: 6, k: 2 }], isi: "arsiran sama", suara: ucapkan("Satu dari 3 bagian dan dua dari 6 bagian punya arsiran sama panjang, jadi pecahan sama besar.") },
  { id: "kali", label: "Kali Bentuk Satu", ikon: "\u{1F522}", lihat: [1, 3], isi: "× 4/4 = 4/12", suara: ucapkan("1/3 dikali 4/4 sama dengan 4/12. Besarnya tetap.") },
  { id: "bagi", label: "Bagi Keduanya", ikon: "\u{2797}", lihat: [8, 12], isi: "÷ 4 = 2/3", suara: ucapkan("8/12 dibagi 4 pada pembilang dan penyebut sama dengan 2/3.") },
  { id: "henti", label: "Berhenti", ikon: "\u{2705}", lihat: [2, 3], isi: "tak terbagi lagi", suara: ucapkan("2 dan 3 tidak bisa dibagi lagi bersama, jadi 2/3 paling sederhana.") },
  { id: "tambah", label: "Jangan menambah", ikon: "\u{274C}", lihat: [3, 4], isi: "besar berubah", suara: ucapkan("Menambah bilangan sama pada pembilang dan penyebut membuat besar pecahan berubah.") },
];

export const PETUNJUK_INFO_1 = "Ketuk tanda tanya di bawah tiap potongan kain.";
export const PETUNJUK_INFO_2 = "Ketuk tanda tanya di tiap kantong untuk melihat aturannya.";
export const SELESAI_INFO_1 = "Semua isian terbuka! Dikali atau dibagi sama, besarnya tetap.";
export const SELESAI_INFO_2 = "Kotak jahit lengkap! Siap melanjutkan.";
