/**
 * Data diagram batang untuk tugas CPA Kelas 4 Bab 6 Sub-Bab B "Diagram Batang Pak Dodi". Berbeda dari data Story (jajanan Bu Rini) dan Infografis (risoles, pisang goreng, lemper, es cincau).
 * Concrete memakai papan data bazar beremoji lama; Pictorial memakai diagram polos; Abstract memakai tabel dan angka. Semua data habis dibagi tingkat sumbu (lihat diagramSah).
 * Diuji: scripts/uji-bazar-k4b6b.mjs.
 */
import type { Diagram } from "./logika-data";

export const DIAGRAM: Record<string, Diagram> = {
  /* Concrete: papan data bazar */
  buah: {
    id: "buah",
    judul: "Stan buah",
    satuan: "buah",
    tingkat: 5,
    arah: "tegak",
    batang: [
      { nama: "Pisang", banyak: 25, ikon: "\u{1F34C}" },
      { nama: "Apel", banyak: 15, ikon: "\u{1F34E}" },
      { nama: "Jeruk", banyak: 20, ikon: "\u{1F34A}" },
      { nama: "Semangka", banyak: 10, ikon: "\u{1F349}" },
    ],
  },
  bungkus: {
    id: "bungkus",
    judul: "Stan kue",
    satuan: "bungkus",
    tingkat: 10,
    arah: "tegak",
    batang: [
      { nama: "Donat", banyak: 30, ikon: "\u{1F369}" },
      { nama: "Roti", banyak: 50, ikon: "\u{1F35E}" },
      { nama: "Pangsit", banyak: 20, ikon: "\u{1F95F}" },
      { nama: "Sate", banyak: 40, ikon: "\u{1F362}" },
    ],
  },
  hiasan: {
    id: "hiasan",
    judul: "Hiasan bazar",
    satuan: "buah",
    tingkat: 2,
    arah: "datar",
    batang: [
      { nama: "Balon", banyak: 8, ikon: "\u{1F388}" },
      { nama: "Pita", banyak: 14, ikon: "\u{1F380}" },
      { nama: "Bendera", banyak: 10, ikon: "\u{1F6A9}" },
      { nama: "Lampion", banyak: 6, ikon: "\u{1F3EE}" },
    ],
  },
  /* Pictorial: diagram polos */
  hadir: {
    id: "hadir",
    judul: "Pengunjung per hari",
    satuan: "orang",
    tingkat: 10,
    arah: "tegak",
    batang: [
      { nama: "Kamis", banyak: 20 },
      { nama: "Jumat", banyak: 40 },
      { nama: "Sabtu", banyak: 70 },
      { nama: "Minggu", banyak: 60 },
    ],
  },
  loket: {
    id: "loket",
    judul: "Tiket per loket",
    satuan: "lembar",
    tingkat: 5,
    arah: "datar",
    batang: [
      { nama: "Utara", banyak: 35 },
      { nama: "Selatan", banyak: 20 },
      { nama: "Timur", banyak: 45 },
      { nama: "Barat", banyak: 30 },
    ],
  },
  kursi: {
    id: "kursi",
    judul: "Kursi per baris",
    satuan: "buah",
    tingkat: 2,
    arah: "tegak",
    batang: [
      { nama: "Depan", banyak: 12 },
      { nama: "Tengah", banyak: 16 },
      { nama: "Belakang", banyak: 8 },
      { nama: "Samping", banyak: 10 },
    ],
  },
  /* Abstract: tabel panitia */
  taplak: {
    id: "taplak",
    judul: "Taplak per warna",
    satuan: "lembar",
    tingkat: 5,
    arah: "tegak",
    batang: [
      { nama: "Merah", banyak: 15 },
      { nama: "Biru", banyak: 25 },
      { nama: "Kuning", banyak: 10 },
      { nama: "Hijau", banyak: 20 },
    ],
  },
  jam: {
    id: "jam",
    judul: "Pengunjung per waktu",
    satuan: "orang",
    tingkat: 10,
    arah: "datar",
    batang: [
      { nama: "Pagi", banyak: 30 },
      { nama: "Siang", banyak: 50 },
      { nama: "Sore", banyak: 40 },
      { nama: "Malam", banyak: 20 },
    ],
  },
  lampu: {
    id: "lampu",
    judul: "Lampu per tenda",
    satuan: "buah",
    tingkat: 2,
    arah: "tegak",
    batang: [
      { nama: "Mawar", banyak: 8 },
      { nama: "Melati", banyak: 12 },
      { nama: "Anggrek", banyak: 6 },
      { nama: "Kenanga", banyak: 10 },
    ],
  },
};
export const NAMA_JENIS: string[] = [...new Set(Object.values(DIAGRAM).flatMap((d) => d.batang.map((b) => b.nama.toLowerCase())))];
