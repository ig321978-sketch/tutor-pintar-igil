// Uji misi hibrida Matematika Kelas 3 Bab 5 (Bengkel Sepeda Pak Hasan).
// Jalankan: node --no-warnings scripts/uji-lab-k3b5.mjs
import * as M0 from "../src/components/modul/misi-simulasi.ts";
import * as K3 from "../src/components/modul/misi-k3bab5.ts";

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

/* --------------------------- Kelas 3 Bab 5: misi (Bengkel Sepeda Pak Hasan) --------------------------- */
{
  const kosong = new Set();
  // KERANGKA: agen Sub-Bab mengganti komentar BAGIAN-nya dengan ujinya (keadaan awal tidak memenuhi misi; ujiStruktur untuk sub-bab itu).
  // BAGIAN A (Meja Catat; rincian di scripts/uji-papan-k3b5a.mjs): keadaan awal ditulis langsung karena logika.ts folder memakai impor tanpa ekstensi.
  {
    const awalA = { alat: "catat", mode: "urut", urutKe: 0, susun: [4, 9, 1, 7, 3], urutSel: -1, urutBenar: [], ujungKe: 0, ujungSusun: [5, 12, 3, 9, 8], ujungUrut: false, ujungSel: -1, kecilTanda: -1, besarTanda: -1, tolak: false, ujungBenar: [], jangKe: 0, jangPilih: -1, jangCek: false, jangBenar: [], bandKe: 0, bandLebih: -1, bandPilih: -1, bandBenar: [], turusKe: 0, garis: 0, turusPilih: -1, turusBenar: [], salah: 0 };
    const dA = K3.daftarMisiK3Bab5("A");
    cek(dA === K3.MISI_A && dA.length === 6 && dA.filter((m) => m.wajib).length === 4 && dA.filter((m) => !m.wajib).length === 2 && dA.every((m) => m.id.startsWith("a-")), "A: enam misi, empat wajib, dua bebas, id berawalan a-");
    ujiStruktur("K3B5", K3.daftarMisiK3Bab5, ["A"], { A: awalA });
    cek(dA.every((m) => !m.cek({ alat: "kerangka" })), "A: alat lain tidak memenuhi misi");
    cek(dA.every((m) => !/\d/.test(m.teks) && !/(buku|teman|kelompok|kelas|skor|nilai|soal|tebak|kunci|latihan)/i.test(m.teks)), "A: teks misi tanpa digit dan kata terlarang");
    sama(M0.misiBaru(dA, { ...awalA, urutBenar: [0] }, kosong), ["a-urut"], "A: kartu data berurutan tepat memenuhi a-urut");
    sama(M0.misiBaru(dA, { ...awalA, ujungBenar: [1] }, kosong), ["a-ujung"], "A: data terkecil dan terbesar ditandai tepat memenuhi a-ujung");
    sama(M0.misiBaru(dA, { ...awalA, jangBenar: [0] }, kosong), ["a-jangkau"], "A: jangkauan dan Cek Jangkauan tepat memenuhi a-jangkau");
    sama(M0.misiBaru(dA, { ...awalA, turusBenar: [2] }, kosong), ["a-turus"], "A: banyak dari turus tepat memenuhi a-turus");
    sama(M0.misiBaru(dA, { ...awalA, bandBenar: [0] }, kosong), ["a-banding"], "A: dua hari dibandingkan tepat memenuhi tantangan bebas a-banding");
    sama(M0.misiBaru(dA, { ...awalA, tolak: true }, kosong), ["a-tolak"], "A: alat menolak menandai sebelum diurutkan memenuhi tantangan bebas a-tolak");
    sama(M0.misiBaru(dA, { ...awalA, urutBenar: [0], ujungBenar: [0], jangBenar: [0], turusBenar: [0], bandBenar: [0], tolak: true }, kosong), ["a-urut", "a-ujung", "a-jangkau", "a-turus", "a-banding", "a-tolak"], "A: semua misi tercapai");
    cek(M0.misiBaru(dA, { ...awalA, salah: 9, mode: "turus", susun: [1, 3, 4, 7, 9], urutSel: 2, ujungUrut: true, ujungSel: 1, kecilTanda: 0, besarTanda: 4, jangPilih: 1, jangCek: true, bandLebih: 0, bandPilih: 2, garis: 13, turusPilih: 2 }, kosong).length === 0, "A: percobaan keliru, kartu yang digeser, tanda, pilihan, dan garis yang belum diperiksa tidak dihitung sebagai misi");
  }
  // BAGIAN B (Papan Tabel; rincian di scripts/uji-tabel-k3b5b.mjs): keadaan awal ditulis langsung karena logika.ts folder memakai impor tanpa ekstensi.
  {
    const awalB = { alat: "tabel", mode: "cacah", cacahKe: 0, cacah: [0, 0, 0], cacahBenar: [], isiKe: 0, isi: [0, 0, 0], isiBenar: [], urutKe: 0, urut: [0, 1, 2], urutBenar: [], bacaKe: 0, sudahBaca: false, bacaPilih: -1, bacaBenar: [], tolak: false, salah: 0 };
    const dB = K3.daftarMisiK3Bab5("B");
    cek(dB === K3.MISI_B && dB.length === 6 && dB.filter((m) => m.wajib).length === 4 && dB.filter((m) => !m.wajib).length === 2 && dB.every((m) => m.id.startsWith("b-")), "B: enam misi, empat wajib, dua bebas, id berawalan b-");
    ujiStruktur("K3B5", K3.daftarMisiK3Bab5, ["B"], { B: awalB });
    cek(dB.every((m) => !m.cek({ alat: "kerangka" })), "B: alat lain tidak memenuhi misi");
    cek(dB.every((m) => !/\d/.test(m.teks) && !/(buku|teman|kelompok|kelas|skor|nilai|soal|tebak|kunci|latihan)/i.test(m.teks)), "B: teks misi tanpa digit dan kata terlarang");
    sama(M0.misiBaru(dB, { ...awalB, cacahBenar: [0] }, kosong), ["b-cacah"], "B: daftar tercatat dengan turus berlima tepat memenuhi b-cacah");
    sama(M0.misiBaru(dB, { ...awalB, isiBenar: [1] }, kosong), ["b-isi"], "B: kolom banyak terisi tepat memenuhi b-isi");
    sama(M0.misiBaru(dB, { ...awalB, urutBenar: [0] }, kosong), ["b-urut"], "B: baris diurutkan tepat memenuhi b-urut");
    sama(M0.misiBaru(dB, { ...awalB, bacaBenar: [2] }, kosong), ["b-baca"], "B: pertanyaan baca tabel tepat memenuhi b-baca");
    sama(M0.misiBaru(dB, { ...awalB, tolak: true }, kosong), ["b-tolak"], "B: alat menolak menjawab sebelum membaca memenuhi tantangan bebas b-tolak");
    sama(M0.misiBaru(dB, { ...awalB, bacaBenar: [0, 1, 2] }, kosong), ["b-baca"], "B: tiga pertanyaan belum memenuhi b-semua");
    sama(M0.misiBaru(dB, { ...awalB, bacaBenar: [0, 1, 2, 3] }, kosong), ["b-baca", "b-semua"], "B: empat pertanyaan memenuhi b-baca dan b-semua");
    sama(M0.misiBaru(dB, { ...awalB, cacahBenar: [0], isiBenar: [0], urutBenar: [0], bacaBenar: [0], tolak: true }, kosong), ["b-cacah", "b-isi", "b-urut", "b-baca", "b-tolak"], "B: semua misi wajib dan b-tolak tercapai");
    cek(M0.misiBaru(dB, { ...awalB, salah: 9, mode: "baca", cacah: [5, 3, 4], isi: [11, 4, 8], urut: [1, 0, 2], sudahBaca: true, bacaPilih: 2 }, kosong).length === 0, "B: percobaan keliru, isian, dan pilihan yang belum diperiksa tidak dihitung sebagai misi");
  }
  void kosong;
}

console.log(`Uji misi Kelas 3 Bab 5: ${lulus} lulus, ${gagal} gagal`);
if (gagal > 0) process.exit(1);
