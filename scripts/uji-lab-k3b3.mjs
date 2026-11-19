// Uji misi hibrida Matematika Kelas 3 Bab 3 (Kebun Binatang Mini).
// Jalankan: node --no-warnings scripts/uji-lab-k3b3.mjs
import * as M0 from "../src/components/modul/misi-simulasi.ts";
import * as K3 from "../src/components/modul/misi-k3bab3.ts";

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

/* --------------------------- Kelas 3 Bab 3: misi (Kebun Binatang Mini) --------------------------- */
{
  const kosong = new Set();
  // KERANGKA: agen Sub-Bab mengganti komentar BAGIAN-nya dengan ujinya (keadaan awal tidak memenuhi misi; ujiStruktur untuk sub-bab itu).
  // BAGIAN A (Meja Ukur; rincian di scripts/uji-ukur-k3b3a.mjs): keadaan awal ditulis langsung karena logika.ts folder memakai impor tanpa ekstensi.
  {
    const awalA = { alat: "ukur", mode: "geser", geserKe: 0, posisi: 4, tolak: false, sudahBaca: false, geserPilih: -1, geserBenar: [], bacaKe: 0, bacaPilih: -1, bacaBenar: [], alatKe: 0, alatPilih: -1, alatBenar: [], selisihKe: 0, selisihPilih: -1, selisihBenar: [], salah: 0 };
    const dA = K3.daftarMisiK3Bab3("A");
    cek(dA === K3.MISI_A && dA.length === 6 && dA.filter((m) => m.wajib).length === 4 && dA.filter((m) => !m.wajib).length === 2 && dA.every((m) => m.id.startsWith("a-")), "A: enam misi, empat wajib, dua bebas, id berawalan a-");
    ujiStruktur("K3B3", K3.daftarMisiK3Bab3, ["A"], { A: awalA });
    cek(dA.every((m) => !m.cek({ alat: "kerangka" })), "A: alat lain tidak memenuhi misi");
    cek(dA.every((m) => !/\d/.test(m.teks) && !/(buku|teman|kelompok|kelas|skor|nilai|soal|tebak|kunci|latihan)/i.test(m.teks)), "A: teks misi tanpa digit dan kata terlarang");
    sama(M0.misiBaru(dA, { ...awalA, geserBenar: [0] }, kosong), ["a-geser"], "A: benda tergeser ke nol dan terbaca tepat memenuhi a-geser");
    sama(M0.misiBaru(dA, { ...awalA, bacaBenar: [0] }, kosong), ["a-baca"], "A: hasil ukur dengan satuan tepat memenuhi a-baca");
    sama(M0.misiBaru(dA, { ...awalA, alatBenar: [0] }, kosong), ["a-alat"], "A: alat ukur tepat memenuhi a-alat");
    sama(M0.misiBaru(dA, { ...awalA, selisihBenar: [1] }, kosong), ["a-selisih"], "A: selisih dua batang tepat memenuhi a-selisih");
    sama(M0.misiBaru(dA, { ...awalA, tolak: true }, kosong), ["a-tolak"], "A: alat menolak membaca memenuhi tantangan bebas a-tolak");
    sama(M0.misiBaru(dA, { ...awalA, geserBenar: [0, 1] }, kosong), ["a-geser"], "A: dua benda belum memenuhi a-tiga");
    sama(M0.misiBaru(dA, { ...awalA, geserBenar: [0, 1, 2] }, kosong), ["a-geser", "a-tiga"], "A: tiga benda memenuhi a-geser dan a-tiga");
    sama(M0.misiBaru(dA, { ...awalA, geserBenar: [0, 1, 2], bacaBenar: [0], alatBenar: [0], selisihBenar: [0], tolak: true }, kosong), ["a-geser", "a-baca", "a-alat", "a-selisih", "a-tolak", "a-tiga"], "A: semua misi tercapai");
    cek(M0.misiBaru(dA, { ...awalA, salah: 9, mode: "selisih", posisi: 0, sudahBaca: true, geserPilih: 2, bacaPilih: 1, alatPilih: 2, selisihPilih: 1 }, kosong).length === 0, "A: percobaan keliru, pilihan yang belum diperiksa, dan benda yang digeser tidak dihitung sebagai misi");
  }
  // BAGIAN B (Bengkel Pita; rincian di scripts/uji-pita-k3b3b.mjs): keadaan awal ditulis langsung karena logika.ts folder memakai impor tanpa ekstensi.
  {
    const awalB = { alat: "pita", mode: "tukar", tukarKe: 0, potongan: [1, 14, 23], tukarBenar: [], ubahKe: 0, ubah: [0, 0, 0], ubahBenar: [], gabungKe: 0, gabung: [0, 0, 0], gabungBenar: [], sambungKe: 0, sambung: [0, 0, 0], sambungBenar: [], bandingKe: 0, bandingPilih: -1, bandingBenar: [], salah: 0 };
    const dB = K3.daftarMisiK3Bab3("B");
    cek(dB === K3.MISI_B && dB.length === 6 && dB.filter((m) => m.wajib).length === 4 && dB.filter((m) => !m.wajib).length === 2 && dB.every((m) => m.id.startsWith("b-")), "B: enam misi, empat wajib, dua bebas, id berawalan b-");
    ujiStruktur("K3B3", K3.daftarMisiK3Bab3, ["B"], { B: awalB });
    cek(dB.every((m) => !m.cek({ alat: "kerangka" })), "B: alat lain tidak memenuhi misi");
    cek(dB.every((m) => !/\d/.test(m.teks) && !/(buku|teman|kelompok|kelas|skor|nilai|soal|tebak|kunci|latihan)/i.test(m.teks)), "B: teks misi tanpa digit dan kata terlarang");
    sama(M0.misiBaru(dB, { ...awalB, tukarBenar: [0] }, kosong), ["b-tukar"], "B: pita ditukar tepat memenuhi b-tukar");
    sama(M0.misiBaru(dB, { ...awalB, ubahBenar: [0] }, kosong), ["b-ubah"], "B: ukuran diubah tepat memenuhi b-ubah");
    sama(M0.misiBaru(dB, { ...awalB, gabungBenar: [1] }, kosong), ["b-gabung"], "B: ukuran ditulis bersama tepat memenuhi b-gabung");
    sama(M0.misiBaru(dB, { ...awalB, sambungBenar: [2] }, kosong), ["b-sambung"], "B: sambung atau potong tepat memenuhi b-sambung");
    sama(M0.misiBaru(dB, { ...awalB, bandingBenar: [0, 1] }, kosong), ["b-banding"], "B: dua kumpulan pita memenuhi tantangan bebas b-banding");
    sama(M0.misiBaru(dB, { ...awalB, bandingBenar: [0] }, kosong), [], "B: satu kumpulan pita belum memenuhi b-banding");
    sama(M0.misiBaru(dB, { ...awalB, ubahBenar: [0, 1] }, kosong), ["b-ubah"], "B: dua ukuran belum memenuhi tantangan b-lengkap");
    sama(M0.misiBaru(dB, { ...awalB, ubahBenar: [0, 1, 2] }, kosong), ["b-ubah", "b-lengkap"], "B: tiga ukuran memenuhi b-ubah dan b-lengkap");
    sama(M0.misiBaru(dB, { ...awalB, tukarBenar: [0], ubahBenar: [0, 1, 2], gabungBenar: [0], sambungBenar: [0], bandingBenar: [1, 2] }, kosong), ["b-tukar", "b-ubah", "b-gabung", "b-sambung", "b-banding", "b-lengkap"], "B: semua misi tercapai");
    cek(M0.misiBaru(dB, { ...awalB, salah: 9, mode: "sambung", potongan: [0, 0, 5], ubah: [6, 0, 0], gabung: [3, 1, 7], sambung: [4, 5, 5], bandingPilih: 2 }, kosong).length === 0, "B: percobaan keliru dan isian yang belum diperiksa tidak dihitung sebagai misi");
  }
  // BAGIAN C (Gudang Timbang; rincian di scripts/uji-timbang-k3b3c.mjs): keadaan awal ditulis langsung karena logika.ts folder memakai impor tanpa ekstensi.
  {
    const awalC = { alat: "timbang", mode: "nol", jarum: 3, layar: 40, nolJarum: false, nolLayar: false, menolak: 0, timbangKe: 0, diletakkan: false, bacaPilih: -1, bacaBenar: [], ringanBenar: false, beratBenar: false, pilihKe: 0, pilihJenis: -1, pilihSatuan: -1, pilihBenar: [], selisihKe: 0, selisihPilih: -1, selisihBenar: [], salah: 0 };
    const dC = K3.daftarMisiK3Bab3("C");
    cek(dC === K3.MISI_C && dC.length === 6 && dC.filter((m) => m.wajib).length === 4 && dC.filter((m) => !m.wajib).length === 2 && dC.every((m) => m.id.startsWith("c-")), "C: enam misi, empat wajib, dua bebas, id berawalan c-");
    ujiStruktur("K3B3", K3.daftarMisiK3Bab3, ["C"], { C: awalC });
    cek(dC.every((m) => !m.cek({ alat: "kerangka" })), "C: alat lain tidak memenuhi misi");
    cek(dC.every((m) => !/\d/.test(m.teks) && !/(buku|teman|kelompok|kelas|skor|nilai|soal|tebak|kunci|latihan)/i.test(m.teks)), "C: teks misi tanpa digit dan kata terlarang");
    sama(M0.misiBaru(dC, { ...awalC, nolJarum: true }, kosong), [], "C: hanya jarum di nol belum memenuhi c-nol");
    sama(M0.misiBaru(dC, { ...awalC, nolJarum: true, nolLayar: true }, kosong), ["c-nol"], "C: jarum dan layar di nol memenuhi c-nol");
    sama(M0.misiBaru(dC, { ...awalC, bacaBenar: [0] }, kosong), ["c-baca"], "C: berat terbaca tepat memenuhi c-baca");
    sama(M0.misiBaru(dC, { ...awalC, pilihBenar: [0] }, kosong), ["c-pilih"], "C: timbangan dan satuan tepat memenuhi c-pilih");
    sama(M0.misiBaru(dC, { ...awalC, selisihBenar: [0] }, kosong), ["c-selisih"], "C: selisih tepat memenuhi c-selisih");
    sama(M0.misiBaru(dC, { ...awalC, menolak: 1 }, kosong), ["c-tolak"], "C: alat menolak memenuhi tantangan bebas c-tolak");
    sama(M0.misiBaru(dC, { ...awalC, ringanBenar: true }, kosong), [], "C: hanya benda ringan belum memenuhi c-dua");
    sama(M0.misiBaru(dC, { ...awalC, ringanBenar: true, beratBenar: true }, kosong), ["c-dua"], "C: benda ringan dan berat memenuhi c-dua");
    sama(M0.misiBaru(dC, { ...awalC, nolJarum: true, nolLayar: true, bacaBenar: [0, 1], pilihBenar: [0], selisihBenar: [0], menolak: 2, ringanBenar: true, beratBenar: true }, kosong), ["c-nol", "c-baca", "c-pilih", "c-selisih", "c-tolak", "c-dua"], "C: semua misi tercapai");
    cek(M0.misiBaru(dC, { ...awalC, salah: 9, mode: "selisih", jarum: 7, layar: 90, diletakkan: true, bacaPilih: 2, pilihJenis: 1, pilihSatuan: 1, selisihPilih: 1 }, kosong).length === 0, "C: percobaan keliru, pilihan yang belum diperiksa, dan benda di timbangan tidak dihitung sebagai misi");
  }
  // BAGIAN D (Meja Bandul; rincian di scripts/uji-bandul-k3b3d.mjs): keadaan awal ditulis langsung karena logika.ts folder memakai impor tanpa ekstensi.
  {
    const awalD = { alat: "bandul", mode: "rakit", benda: 0, pasang: [0, 0, 0, 0, 0], rakitKe: 0, rakitBenar: [], kggKe: 0, kgg: [0, 0, 0, 0], kggBenar: [], gkgKe: 0, gkg: [0, 0, 0, 0], gkgBenar: [], jumlahKe: 0, jumlah: [0, 0, 0, 0], jumlahBenar: [], kurangKe: 0, kurang: [0, 0, 0, 0], kurangBenar: [], salah: 0 };
    const dD = K3.daftarMisiK3Bab3("D");
    cek(dD === K3.MISI_D && dD.length === 6 && dD.filter((m) => m.wajib).length === 4 && dD.filter((m) => !m.wajib).length === 2 && dD.every((m) => m.id.startsWith("d-")), "D: enam misi, empat wajib, dua bebas, id berawalan d-");
    ujiStruktur("K3B3", K3.daftarMisiK3Bab3, ["D"], { D: awalD });
    cek(dD.every((m) => !m.cek({ alat: "kerangka" })), "D: alat lain tidak memenuhi misi");
    cek(dD.every((m) => !/\d/.test(m.teks) && !/(buku|teman|kelompok|kelas|skor|nilai|soal|tebak|kunci|latihan)/i.test(m.teks)), "D: teks misi tanpa digit dan kata terlarang");
    sama(M0.misiBaru(dD, { ...awalD, rakitBenar: [0] }, kosong), ["d-rakit"], "D: timbangan seimbang memenuhi d-rakit");
    sama(M0.misiBaru(dD, { ...awalD, kggBenar: [0] }, kosong), ["d-kgg"], "D: kilogram ke gram tepat memenuhi d-kgg");
    sama(M0.misiBaru(dD, { ...awalD, gkgBenar: [1] }, kosong), ["d-gkg"], "D: gram ke kilogram tepat memenuhi d-gkg");
    sama(M0.misiBaru(dD, { ...awalD, jumlahBenar: [2] }, kosong), ["d-jumlah"], "D: jumlah berat tepat memenuhi d-jumlah");
    sama(M0.misiBaru(dD, { ...awalD, kurangBenar: [0] }, kosong), ["d-kurang"], "D: kurang berat tepat memenuhi tantangan bebas d-kurang");
    sama(M0.misiBaru(dD, { ...awalD, rakitBenar: [0, 1] }, kosong), ["d-rakit"], "D: dua benda seimbang belum memenuhi d-lengkap");
    sama(M0.misiBaru(dD, { ...awalD, rakitBenar: [0, 1, 2] }, kosong), ["d-rakit", "d-lengkap"], "D: tiga benda seimbang memenuhi d-rakit dan d-lengkap");
    sama(M0.misiBaru(dD, { ...awalD, rakitBenar: [0, 1, 2], kggBenar: [0], gkgBenar: [0], jumlahBenar: [0], kurangBenar: [0] }, kosong), ["d-rakit", "d-kgg", "d-gkg", "d-jumlah", "d-kurang", "d-lengkap"], "D: semua misi tercapai");
    cek(M0.misiBaru(dD, { ...awalD, salah: 9, mode: "kurang", benda: 2, pasang: [1, 2, 3, 0, 1], kgg: [3, 5, 0, 0], gkg: [4, 5, 0, 0], jumlah: [3, 9, 0, 0], kurang: [4, 4, 0, 0] }, kosong).length === 0, "D: percobaan keliru, isian, dan bandul terpasang tidak dihitung sebagai misi");
  }
  void kosong;
}

console.log(`Uji misi Kelas 3 Bab 3: ${lulus} lulus, ${gagal} gagal`);
if (gagal > 0) process.exit(1);
