// Uji misi hibrida Matematika Kelas 5 Bab 1 (Hari Pertandingan di Stadion Kota).
// Jalankan: node --no-warnings scripts/uji-lab-k5b1.mjs
import * as M0 from "../src/components/modul/misi-simulasi.ts";
import * as K5 from "../src/components/modul/misi-k5bab1.ts";

let gagal = 0;
let lulus = 0;
const cek = (kondisi, pesan) => {
  if (kondisi) lulus += 1;
  else {
    gagal += 1;
    console.log("GAGAL:", pesan);
  }
};
const sama = (a, b, pesan) => cek(JSON.stringify(a) === JSON.stringify(b), `${pesan}: ${JSON.stringify(a)} != ${JSON.stringify(b)}`);

function ujiStruktur(nama, daftarFn, subs, awalSub) {
  for (const sub of subs) {
    const daftar = daftarFn(sub);
    const awal = awalSub[sub];
    cek(M0.misiBaru(daftar, awal, new Set()).length === 0, `${nama} ${sub}: keadaan awal tidak memenuhi misi`);
    cek(daftar.filter((m) => m.wajib).length >= 3 && daftar.some((m) => !m.wajib), `${nama} ${sub}: ada misi wajib dan tantangan bebas`);
    cek(new Set(daftar.map((m) => m.id)).size === daftar.length, `${nama} ${sub}: id unik`);
    cek(daftar.every((m) => m.teks.length > 10 && m.teks.length < 120), `${nama} ${sub}: teks misi ringkas`);
  }
}

/* --------------------------- Kelas 5 Bab 1: misi (Hari Pertandingan di Stadion Kota) --------------------------- */
{
  const kosong = new Set();
  void kosong;
  void ujiStruktur;
  void sama;
  void K5;
  // KERANGKA: agen Sub-Bab mengganti komentar BAGIAN-nya dengan ujinya (keadaan awal tidak memenuhi misi; ujiStruktur untuk sub-bab itu).
  // BAGIAN A (Tabel Tribun; rincian di scripts/uji-tribun-k5b1a.mjs): keadaan awal ditulis langsung karena logika.ts folder memakai impor tanpa ekstensi.
  {
    const awalA = { alat: "tribun", mode: "isi", isiKe: 0, isiAngka: [0, 0, 0, 0, 0], isiBenar: [], nolKe: 0, nolTaruh: [false, false, false, false, false], nolBenar: [], titikKe: 0, titikPos: 0, titikPilih: -1, titikBenar: [], uraiKe: 0, uraiPilih: -1, uraiBenar: [], tolak: false, salah: 0 };
    ujiStruktur("K5B1", K5.daftarMisiK5Bab1, ["A"], { A: awalA });
    sama(K5.MISI_A.map((m) => m.id), ["a-isi", "a-nol", "a-titik", "a-urai", "a-tolak", "a-dua"], "K5B1 A: id misi");
    sama(M0.misiBaru(K5.MISI_A, { ...awalA, isiBenar: [0], nolBenar: [0], titikBenar: [0], uraiBenar: [0] }, new Set()), ["a-isi", "a-nol", "a-titik", "a-urai"], "K5B1 A: empat misi wajib");
    sama(M0.misiBaru(K5.MISI_A, { ...awalA, tolak: true }, new Set()), ["a-tolak"], "K5B1 A: tantangan tolak dari penolakan titik pemisah di tempat salah");
    sama(M0.misiBaru(K5.MISI_A, { ...awalA, isiBenar: [0, 1] }, new Set()), ["a-isi", "a-dua"], "K5B1 A: dua bilangan benar");
    sama(M0.misiBaru(K5.MISI_A, { alat: "hitung" }, new Set()), [], "K5B1 A: keadaan alat lain tidak memenuhi misi A");
  }
  // BAGIAN B (Garis Urutan; rincian di scripts/uji-urutan-k5b1b.mjs): keadaan awal ditulis langsung.
  {
    const awalB = {
      alat: "urutan", mode: "banding", bandingKe: 0, kolomPilih: -1, tandaPilih: -1, tolakBanding: false, bandingBenar: [], garisKe: 0, ruasPilih: -1, garisBenar: [],
      urutKe: 0, urutPilih: [], tolakUrut: false, urutBenar: [], patKe: 0, patPilih: -1, patBenar: [], salah: 0,
    };
    ujiStruktur("K5B1", K5.daftarMisiK5Bab1, ["B"], { B: awalB });
    sama(K5.MISI_B.map((m) => m.id), ["b-kiri", "b-garis", "b-urut", "b-patokan", "b-tolak", "b-dua"], "K5B1 B: id misi");
    sama(M0.misiBaru(K5.MISI_B, { ...awalB, bandingBenar: [0], garisBenar: [0], urutBenar: [0], patBenar: [0] }, new Set()), ["b-kiri", "b-garis", "b-urut", "b-patokan"], "K5B1 B: empat misi wajib");
    sama(M0.misiBaru(K5.MISI_B, { ...awalB, tolakUrut: true }, new Set()), ["b-tolak"], "K5B1 B: tantangan tolak dari penolakan bilangan yang belum gilirannya");
    sama(M0.misiBaru(K5.MISI_B, { ...awalB, tolakBanding: true, salah: 3 }, new Set()), [], "K5B1 B: penolakan banding dan percobaan keliru bukan misi");
    sama(M0.misiBaru(K5.MISI_B, { ...awalB, urutBenar: [0, 1] }, new Set()), ["b-urut", "b-dua"], "K5B1 B: dua kumpulan terurut benar");
    sama(M0.misiBaru(K5.MISI_B, { alat: "hitung" }, new Set()), [], "K5B1 B: keadaan alat lain tidak memenuhi misi B");
  }
  // BAGIAN C (Tukar Bundel; rincian di scripts/uji-bundel-k5b1c.mjs): keadaan awal ditulis langsung.
  {
    const awalC = {
      alat: "bundel", mode: "urai", uraiKe: 0, uraiIsi: [0, 0, 0, 0, 0], uraiBenar: [], tukarKe: 0, tukarS: [2, 4, 3, 0, 5], tukarBenar: [], susunKe: 0, susunIsi: [-1, -1, -1, -1, -1], susunBenar: [],
      samaKe: 0, samaPilih: [false, false, false, false], samaBenar: [], tolak: false, salah: 0,
    };
    ujiStruktur("K5B1", K5.daftarMisiK5Bab1, ["C"], { C: awalC });
    sama(K5.MISI_C.map((m) => m.id), ["c-urai", "c-tukar", "c-susun", "c-sama", "c-tolak", "c-dua"], "K5B1 C: id misi");
    sama(M0.misiBaru(K5.MISI_C, { ...awalC, uraiBenar: [0], tukarBenar: [0], susunBenar: [0], samaBenar: [0] }, new Set()), ["c-urai", "c-tukar", "c-susun", "c-sama"], "K5B1 C: empat misi wajib");
    sama(M0.misiBaru(K5.MISI_C, { ...awalC, tolak: true }, new Set()), ["c-tolak"], "K5B1 C: tantangan tolak dari penolakan penukaran yang bundelnya tidak cukup");
    sama(M0.misiBaru(K5.MISI_C, { ...awalC, salah: 3 }, new Set()), [], "K5B1 C: percobaan keliru bukan misi");
    sama(M0.misiBaru(K5.MISI_C, { ...awalC, tukarBenar: [0, 1] }, new Set()), ["c-tukar", "c-dua"], "K5B1 C: dua susunan tukar benar");
    sama(M0.misiBaru(K5.MISI_C, { alat: "hitung" }, new Set()), [], "K5B1 C: keadaan alat lain tidak memenuhi misi C");
  }
  // BAGIAN D (Susun Hitung; rincian di scripts/uji-hitung-k5b1d.mjs): keadaan awal ditulis langsung.
  {
    const awalD = {
      alat: "hitung", mode: "jumlah", jumlahKe: 0, kolJ: 0, tulisJ: 0, simpanJ: 0, tolakJumlah: false, jumlahBenar: [],
      kurangKe: 0, kolK: 0, atasK: [0, 0, 0, 0, 8], hasilK: [], tolakKurang: false, tolakPinjam: false, kurangBenar: [],
      kaliKe: 0, dipisah: false, pilihKali: -1, tolakKali: false, kaliBenar: [], bagiKe: 0, langkahB: 0, tulisB: 0, hasilB: [], tolakBagi: false, bagiBenar: [], salah: 0,
    };
    ujiStruktur("K5B1", K5.daftarMisiK5Bab1, ["D"], { D: awalD });
    sama(K5.MISI_D.map((m) => m.id), ["d-jumlah", "d-kurang", "d-kali", "d-bagi", "d-tolak", "d-dua"], "K5B1 D: id misi");
    sama(M0.misiBaru(K5.MISI_D, { ...awalD, jumlahBenar: [0], kurangBenar: [0], kaliBenar: [0], bagiBenar: [0] }, new Set()), ["d-jumlah", "d-kurang", "d-kali", "d-bagi"], "K5B1 D: empat misi wajib");
    sama(M0.misiBaru(K5.MISI_D, { ...awalD, tolakKali: true }, new Set()), ["d-tolak"], "K5B1 D: tantangan tolak dari penolakan Periksa perkalian sebelum pengali dipisah");
    sama(M0.misiBaru(K5.MISI_D, { ...awalD, tolakPinjam: true, tolakJumlah: true, tolakKurang: true, tolakBagi: true }, new Set()), [], "K5B1 D: penolakan lain bukan tantangan tolak");
    sama(M0.misiBaru(K5.MISI_D, { ...awalD, kurangBenar: [0, 1] }, new Set()), ["d-kurang", "d-dua"], "K5B1 D: dua pengurangan benar");
    sama(M0.misiBaru(K5.MISI_D, { alat: "tribun" }, new Set()), [], "K5B1 D: keadaan alat lain tidak memenuhi misi D");
  }
}

console.log(`Lulus ${lulus}, gagal ${gagal}`);
process.exit(gagal ? 1 : 0);
