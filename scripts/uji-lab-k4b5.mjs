// Uji misi hibrida Matematika Kelas 4 Bab 5 (Toko Keramik Bu Dewi).
// Jalankan: node --no-warnings scripts/uji-lab-k4b5.mjs
import * as M0 from "../src/components/modul/misi-simulasi.ts";
import * as K4 from "../src/components/modul/misi-k4bab5.ts";

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

/* --------------------------- Kelas 4 Bab 5: misi (Toko Keramik Bu Dewi) --------------------------- */
{
  const kosong = new Set();
  // KERANGKA: agen Sub-Bab mengganti komentar BAGIAN-nya dengan ujinya (keadaan awal tidak memenuhi misi; ujiStruktur untuk sub-bab itu).
  // BAGIAN A (Etalase Keramik; rincian di scripts/uji-etalase-k4b5a.mjs): keadaan awal ditulis langsung karena logika.ts folder memakai impor tanpa ekstensi.
  const awalA = { alat: "etalase", mode: "pilah", pilahKe: 0, pilahIsi: [0, 0, 0, 0, 0], pilahBenar: [], sisiKe: 0, sisiPilih: [], sisiBenar: [], pohonKe: 0, pohonPilih: -1, pohonBenar: [], segKe: 0, segSisi: -1, segSudut: -1, segBenar: [], tolak: false, salah: 0 };
  ujiStruktur("K4B5", K4.daftarMisiK4Bab5, ["A"], { A: awalA });
  sama(K4.daftarMisiK4Bab5("A").map((m) => m.id), ["a-pilah", "a-sisi", "a-pohon", "a-segitiga", "a-tolak", "a-dua"], "K4B5 A: id misi");
  cek(K4.daftarMisiK4Bab5("A").every((m) => !m.cek({ alat: "kerangka" })), "K4B5 A: alat lain tidak memenuhi misi");
  // BAGIAN B (Mosaik Keramik; rincian di scripts/uji-mosaik-k4b5b.mjs): keadaan awal ditulis langsung karena logika.ts folder memakai impor tanpa ekstensi.
  const awalB = { alat: "mosaik", mode: "pasang", pasangKe: 0, pilih: [], sisi: null, terpasang: false, tolakPasang: false, pasangBenar: [], bagiKe: 0, garis: 0, pilihBagi: -1, tolakBagi: false, bagiBenar: [], sudutKe: 0, hubung: [], tolakSudut: false, sudutBenar: [], salah: 0 };
  ujiStruktur("K4B5", K4.daftarMisiK4Bab5, ["B"], { B: awalB });
  sama(K4.daftarMisiK4Bab5("B").map((m) => m.id), ["b-persegi", "b-segitiga", "b-bagi", "b-sudut", "b-tolak", "b-dua"], "K4B5 B: id misi");
  sama(M0.misiBaru(K4.daftarMisiK4Bab5("B"), { ...awalB, pasangBenar: [0] }, kosong), ["b-persegi"], "K4B5 B: persegi terpasang memenuhi b-persegi");
  sama(M0.misiBaru(K4.daftarMisiK4Bab5("B"), { ...awalB, tolakPasang: true }, kosong), ["b-tolak"], "K4B5 B: alat menolak keping tidak sama besar memenuhi b-tolak");
  cek(K4.daftarMisiK4Bab5("B").every((m) => !m.cek({ alat: "kerangka" })), "K4B5 B: alat lain tidak memenuhi misi");
}

console.log(`Uji misi Kelas 4 Bab 5: ${lulus} lulus, ${gagal} gagal`);
if (gagal > 0) process.exit(1);
