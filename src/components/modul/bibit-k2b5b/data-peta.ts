/**
 * Isi Mind-map (Dua Bedeng), Infografis (Daftar Tanam), dan teks misi Simulasi (Bedeng Bibit) Kelas 2 Bab 5 Sub-Bab B "Bibit untuk Dua Petak"
 * (setengah dari kumpulan benda), tengah cerita Kebun Sekolah. Mind-map hanya memuat poin pelajaran. Infografis memakai data Story
 * (enam jadi tiga dan tiga, empat dan dua, delapan jadi empat dan empat, lima tersisa satu, sepuluh jadi lima dan lima). Diuji: scripts/uji-bibit-k2b5b.mjs.
 */
import type { Tempat } from "../lemari-k1b1a/logika";

const tp = (id: string, kelompok: string, kunci: string, urutan?: number): Tempat => (urutan === undefined ? { id, kelompok, kunci } : { id, kelompok, kunci, urutan });

/* ------------------------------ Mind-map: dua bedeng ------------------------------ */
export const PUSAT_BEDENG = "Setengah dari kumpulan benda";
export const KELOMPOK_BEDENG: Record<string, { nama: string; letak: string; ikon: string; isi: string; garis: string; petunjuk: string }> = {
  masalah: { nama: "Masalah", letak: "Petak masalah", ikon: "\u{1F9D0}", isi: "#FDE68A", garis: "#A16207", petunjuk: "Label ini kuning. Tanam di petak masalah." },
  metode: { nama: "Penyelesaian", letak: "Bedeng penyelesaian", ikon: "\u{1F331}", isi: "#BBF7D0", garis: "#15803D", petunjuk: "Label ini hijau. Tanam di petak bernomor yang pas." },
  hasil: { nama: "Hasil", letak: "Petak hasil", ikon: "\u{1F33B}", isi: "#FBCFE8", garis: "#BE185D", petunjuk: "Label ini merah muda. Tanam di petak hasil." },
};
export const TEMPAT_BEDENG: Tempat[] = [
  tp("bd-m1", "masalah", "Membagi benda sama banyak"),
  tp("bd-m2", "masalah", "Dua bagian tidak sama banyak"),
  tp("bd-m3", "masalah", "Bilangan ganjil tersisa satu"),
  tp("bd-p1", "metode", "Bagi satu-satu sampai habis", 1),
  tp("bd-p2", "metode", "Hitung benda di satu bagian", 2),
  tp("bd-p3", "metode", "Periksa kedua bagian sama banyak", 3),
  tp("bd-p4", "metode", "Bagi Satu-Satu: bergantian tiap putaran", 4),
  tp("bd-p5", "metode", "Neraca Seimbang: pindahkan sampai sama", 5),
  tp("bd-p6", "metode", "Cek Dua Kali Lipat: gandakan setengahnya", 6),
  tp("bd-p7", "metode", "Gabungkan dua setengah menjadi seluruhnya", 7),
  tp("bd-h1", "hasil", "Setengah: satu dari dua bagian sama banyak"),
  tp("bd-h2", "hasil", "Setengah dari empat, enam, delapan, sepuluh berpola"),
  tp("bd-h3", "hasil", "Tidak sama banyak berarti bukan setengah"),
  tp("bd-h4", "hasil", "Ganjil tidak punya setengah utuh"),
];
export const PETUNJUK_URUT_BEDENG = "Warnanya sudah benar. Nomor petaknya belum pas. Langkah mana yang lebih dulu?";
export const SUARA_BEDENG =
  "Ini dua bedeng tanah. Petak masalah berisi tiga masalah. Bedeng penyelesaian punya tujuh petak bernomor berisi langkah yang berurutan, ikuti nomornya dari satu sampai tujuh. Petak hasil berisi empat hasil. Ketuk label, lalu ketuk petak yang cocok.";

/* ------------------------------ Infografis: daftar tanam ------------------------------ */
export const KOLOM_DAFTAR = ["Pembagian", "Setiap bagian", "Hasil"] as const;
export const BARIS_DAFTAR: { ikon: string; nama: string; bagi: string; bagian: string; hasil: string }[] = [
  { ikon: "\u{1F331}", nama: "Bagi sama banyak", bagi: "enam jadi tiga dan tiga", bagian: "sama banyak", hasil: "setengah dari enam adalah tiga" },
  { ikon: "\u{274C}", nama: "Bagi tidak sama", bagi: "enam jadi empat dan dua", bagian: "tidak sama banyak", hasil: "bukan setengah" },
  { ikon: "\u{1F501}", nama: "Gabung dua setengah", bagi: "delapan jadi empat dan empat", bagian: "sama banyak, habis", hasil: "setengah dari delapan adalah empat" },
  { ikon: "\u{2753}", nama: "Bilangan ganjil", bagi: "lima jadi dua, dua, sisa satu", bagian: "tersisa satu benda", hasil: "tidak punya setengah utuh" },
  { ikon: "\u{1F522}", nama: "Pola setengah", bagi: "sepuluh jadi lima dan lima", bagian: "sama banyak, tidak tersisa", hasil: "setengah dari sepuluh adalah lima" },
];
export const TEMPAT_DAFTAR: Tempat[] = BARIS_DAFTAR.flatMap((b, i) => [tp(`d${i}-bagi`, "bagi", b.bagi), tp(`d${i}-bagian`, "bagian", b.bagian), tp(`d${i}-hasil`, "hasil", b.hasil)]);
export const KELOMPOK_DAFTAR: Record<string, string> = {
  bagi: "Label ini cara membagi dari cerita. Tempelkan di kolom Pembagian.",
  bagian: "Label ini keadaan tiap bagian: sama banyak atau tidak. Tempelkan di kolom Setiap bagian.",
  hasil: "Label ini hasilnya, setengah atau bukan. Tempelkan di kolom Hasil.",
};
export const SUARA_DAFTAR = "Ini daftar tanam dari cerita bibit. Tiap baris satu cara membagi. Tempelkan pembagiannya, keadaan tiap bagian, dan hasilnya.";

/* ------------------------------ Teks misi Simulasi ------------------------------ */
export const MISI_BIBIT_TEKS =
  "Misi Bedeng Bibit: bagikan benda satu-satu ke dua petak, seimbangkan neraca dengan memindahkan benda, dan gandakan setengahnya menjadi seluruhnya. Urutannya bebas.";
