// Uji misi hibrida Matematika Kelas 4 Bab 6 (Bazar Kuliner Sekolah).
// Jalankan: node --no-warnings scripts/uji-lab-k4b6.mjs
import * as M0 from "../src/components/modul/misi-simulasi.ts";
import * as K4 from "../src/components/modul/misi-k4bab6.ts";

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

/* --------------------------- Kelas 4 Bab 6: misi (Bazar Kuliner Sekolah) --------------------------- */
{
  const kosong = new Set();
  void kosong;
  void ujiStruktur;
  void sama;
  // KERANGKA: agen Sub-Bab mengganti komentar BAGIAN-nya dengan ujinya (keadaan awal tidak memenuhi misi; ujiStruktur untuk sub-bab itu).
  // BAGIAN A (Piktogram Jajanan; rincian di scripts/uji-jajanan-k4b6a.mjs): keadaan awal ditulis langsung karena logika.ts folder memakai impor tanpa ekstensi.
  const awalA = { alat: "jajanan", mode: "gambar", gambarKe: 0, gambarSkala: 0, gambarIkon: [0, 0, 0], gambarBenar: [], bacaKe: 0, bacaPilih: -1, bacaBenar: [], bandingKe: 0, bandingTanda: [0, 0, 0, 0], bandingBenar: [], jumlahKe: 0, jumlahMasuk: [false, false, false], jumlahPilih: -1, jumlahBenar: [], tolak: false, salah: 0 };
  ujiStruktur("K4B6", K4.daftarMisiK4Bab6, ["A"], { A: awalA });
  sama(K4.daftarMisiK4Bab6("A").map((m) => m.id), ["a-gambar", "a-baca", "a-banding", "a-jumlah", "a-tolak", "a-dua"], "K4B6 A: id misi");
  sama(M0.misiBaru(K4.daftarMisiK4Bab6("A"), { ...awalA, gambarBenar: [0] }, kosong), ["a-gambar"], "K4B6 A: tabel digambar memenuhi a-gambar");
  sama(M0.misiBaru(K4.daftarMisiK4Bab6("A"), { ...awalA, tolak: true }, kosong), ["a-tolak"], "K4B6 A: alat menolak keterangan yang tidak habis membagi memenuhi a-tolak");
  sama(M0.misiBaru(K4.daftarMisiK4Bab6("A"), { ...awalA, gambarBenar: [0, 1], bacaBenar: [0], bandingBenar: [0], jumlahBenar: [0] }, kosong), ["a-gambar", "a-baca", "a-banding", "a-jumlah", "a-dua"], "K4B6 A: semua alat memenuhi misi wajib");
  cek(K4.daftarMisiK4Bab6("A").every((m) => !m.cek({ alat: "kerangka" })), "K4B6 A: alat lain tidak memenuhi misi");
  // BAGIAN B (Batang Bazar; rincian di scripts/uji-bazar-k4b6b.mjs): keadaan awal ditulis langsung karena logika.ts folder memakai impor tanpa ekstensi.
  const awalB = { alat: "bazar", mode: "buat", buatKe: 0, garis: [0, 0, 0, 0], tolakBuat: false, buatBenar: [], bacaKe: 0, pilihBaca: -1, bacaBenar: [], bandingKe: 0, pilihBanding: -1, bandingBenar: [], putarKe: 0, diputar: false, pilihPutar: -1, tolakPutar: false, putarBenar: [], salah: 0 };
  ujiStruktur("K4B6", K4.daftarMisiK4Bab6, ["B"], { B: awalB });
  sama(K4.daftarMisiK4Bab6("B").map((m) => m.id), ["b-buat", "b-telusur", "b-banding", "b-arah", "b-tolak", "b-dua"], "K4B6 B: id misi");
  sama(M0.misiBaru(K4.daftarMisiK4Bab6("B"), { ...awalB, buatBenar: [0] }, kosong), ["b-buat"], "K4B6 B: diagram dibangun memenuhi b-buat");
  sama(M0.misiBaru(K4.daftarMisiK4Bab6("B"), { ...awalB, tolakBuat: true }, kosong), ["b-tolak"], "K4B6 B: alat menolak batang melewati garis atas memenuhi b-tolak");
  cek(K4.daftarMisiK4Bab6("B").every((m) => !m.cek({ alat: "kerangka" })), "K4B6 B: alat lain tidak memenuhi misi");
  cek(typeof K4.daftarMisiK4Bab6 === "function", "K4B6: daftarMisiK4Bab6 ada");
}

console.log(`Uji misi Kelas 4 Bab 6: ${lulus} lulus, ${gagal} gagal`);
if (gagal > 0) process.exit(1);
