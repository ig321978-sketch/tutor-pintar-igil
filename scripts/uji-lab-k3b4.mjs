// Uji misi hibrida Matematika Kelas 3 Bab 4 (Festival Layang-layang Kampung).
// Jalankan: node --no-warnings scripts/uji-lab-k3b4.mjs
import * as M0 from "../src/components/modul/misi-simulasi.ts";
import * as K3 from "../src/components/modul/misi-k3bab4.ts";

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

/* --------------------------- Kelas 3 Bab 4: misi (Festival Layang-layang Kampung) --------------------------- */
{
  const kosong = new Set();
  // KERANGKA: agen Sub-Bab mengganti komentar BAGIAN-nya dengan ujinya (keadaan awal tidak memenuhi misi; ujiStruktur untuk sub-bab itu).
  // BAGIAN A (Meja Bilah; rincian di scripts/uji-bilah-k3b4a.mjs): keadaan awal ditulis langsung karena logika.ts folder memakai impor tanpa ekstensi.
  {
    const awalA = { alat: "bilah", mode: "kenali", kenaliKe: 0, tarikKiri: false, tarikKanan: false, tarikTolak: false, kenaliPilih: -1, kenaliBenar: [], jalanKe: 0, jalanPilih: -1, jalanBenar: [], ukurKe: 0, posisi: 20, tolak: false, sudahBaca: false, ukurPilih: -1, ukurBenar: [], ubahKe: 0, ubahPilih: -1, ubahBenar: [], sisiKe: 0, huruf: 0, sisiPilih: -1, sisiBenar: [], salah: 0 };
    const dA = K3.daftarMisiK3Bab4("A");
    cek(dA === K3.MISI_A && dA.length === 6 && dA.filter((m) => m.wajib).length === 4 && dA.filter((m) => !m.wajib).length === 2 && dA.every((m) => m.id.startsWith("a-")), "A: enam misi, empat wajib, dua bebas, id berawalan a-");
    ujiStruktur("K3B4", K3.daftarMisiK3Bab4, ["A"], { A: awalA });
    cek(dA.every((m) => !m.cek({ alat: "kerangka" })), "A: alat lain tidak memenuhi misi");
    cek(dA.every((m) => !/\d/.test(m.teks) && !/(buku|teman|kelompok|kelas|skor|nilai|soal|tebak|kunci|latihan)/i.test(m.teks)), "A: teks misi tanpa digit dan kata terlarang");
    sama(M0.misiBaru(dA, { ...awalA, kenaliBenar: [0] }, kosong), ["a-kenali"], "A: jenis garis tepat memenuhi a-kenali");
    sama(M0.misiBaru(dA, { ...awalA, ukurBenar: [0] }, kosong), ["a-ukur"], "A: bilah digeser ke nol dan terbaca tepat memenuhi a-ukur");
    sama(M0.misiBaru(dA, { ...awalA, ubahBenar: [1] }, kosong), ["a-ubah"], "A: ukuran ditulis ulang tepat memenuhi a-ubah");
    sama(M0.misiBaru(dA, { ...awalA, sisiBenar: [2] }, kosong), ["a-sisi"], "A: banyak sisi tepat memenuhi a-sisi");
    sama(M0.misiBaru(dA, { ...awalA, jalanBenar: [0] }, kosong), ["a-jalan"], "A: benang terpendek tepat memenuhi tantangan bebas a-jalan");
    sama(M0.misiBaru(dA, { ...awalA, tolak: true }, kosong), ["a-tolak"], "A: alat menolak membaca memenuhi tantangan bebas a-tolak");
    sama(M0.misiBaru(dA, { ...awalA, kenaliBenar: [0], ukurBenar: [0], ubahBenar: [0], sisiBenar: [0], jalanBenar: [0], tolak: true }, kosong), ["a-kenali", "a-ukur", "a-ubah", "a-sisi", "a-jalan", "a-tolak"], "A: semua misi tercapai");
    cek(M0.misiBaru(dA, { ...awalA, salah: 9, mode: "sisi", posisi: 0, sudahBaca: true, kenaliPilih: 2, tarikKiri: true, tarikKanan: true, jalanPilih: 1, ukurPilih: 1, ubahPilih: 2, huruf: 3, sisiPilih: 0 }, kosong).length === 0, "A: percobaan keliru, pilihan yang belum diperiksa, dan benda yang digeser tidak dihitung sebagai misi");
  }
  // BAGIAN B (Lapangan Sudut; rincian di scripts/uji-sudut-k3b4b.mjs): keadaan awal ditulis langsung karena logika.ts folder memakai impor tanpa ekstensi.
  {
    const awalB = { alat: "sudut", mode: "putar", putarKe: 0, deg: 30, putarBenar: [], busurKe: 0, tengah: false, nol: false, tolak: false, sudahBaca: false, bacaPilih: -1, busurBenar: [], jenisKe: 0, jenisPilih: -1, jenisBenar: [], pasangKe: 0, pasangPilih: -1, pasangBenar: [], salah: 0 };
    const dB = K3.daftarMisiK3Bab4("B");
    cek(dB === K3.MISI_B && dB.length === 6 && dB.filter((m) => m.wajib).length === 4 && dB.filter((m) => !m.wajib).length === 2 && dB.every((m) => m.id.startsWith("b-")), "B: enam misi, empat wajib, dua bebas, id berawalan b-");
    ujiStruktur("K3B4", K3.daftarMisiK3Bab4, ["B"], { B: awalB });
    cek(dB.every((m) => !m.cek({ alat: "kerangka" })), "B: alat lain tidak memenuhi misi");
    cek(dB.every((m) => !/\d/.test(m.teks) && !/(buku|teman|kelompok|kelas|skor|nilai|soal|tebak|kunci|latihan)/i.test(m.teks)), "B: teks misi tanpa digit dan kata terlarang");
    sama(M0.misiBaru(dB, { ...awalB, putarBenar: [0] }, kosong), ["b-putar"], "B: sudut sasaran ditemukan memenuhi b-putar");
    sama(M0.misiBaru(dB, { ...awalB, busurBenar: [0] }, kosong), ["b-busur"], "B: busur terpasang dan terbaca tepat memenuhi b-busur");
    sama(M0.misiBaru(dB, { ...awalB, jenisBenar: [0] }, kosong), ["b-jenis"], "B: jenis sudut tepat memenuhi b-jenis");
    sama(M0.misiBaru(dB, { ...awalB, pasangBenar: [1] }, kosong), ["b-pasang"], "B: pasangan satu putaran tepat memenuhi b-pasang");
    sama(M0.misiBaru(dB, { ...awalB, tolak: true }, kosong), ["b-tolak"], "B: alat menolak membaca memenuhi tantangan bebas b-tolak");
    sama(M0.misiBaru(dB, { ...awalB, putarBenar: [0, 1] }, kosong), ["b-putar"], "B: dua jenis belum memenuhi b-tiga");
    sama(M0.misiBaru(dB, { ...awalB, putarBenar: [0, 1, 2] }, kosong), ["b-putar", "b-tiga"], "B: tiga jenis memenuhi b-putar dan b-tiga");
    sama(M0.misiBaru(dB, { ...awalB, putarBenar: [0, 1, 2], busurBenar: [0], jenisBenar: [0], pasangBenar: [0], tolak: true }, kosong), ["b-putar", "b-busur", "b-jenis", "b-pasang", "b-tolak", "b-tiga"], "B: semua misi tercapai");
    cek(M0.misiBaru(dB, { ...awalB, salah: 9, mode: "pasang", deg: 140, tengah: true, nol: true, sudahBaca: true, bacaPilih: 2, jenisPilih: 1, pasangPilih: 0 }, kosong).length === 0, "B: percobaan keliru, pilihan yang belum diperiksa, dan sudut yang diputar tidak dihitung sebagai misi");
  }
  // BAGIAN C (Lintasan Lomba; rincian di scripts/uji-lintasan-k3b4c.mjs): keadaan awal ditulis langsung karena logika.ts folder memakai impor tanpa ekstensi.
  {
    const awalC = { alat: "lintasan", mode: "tegak", sudut: 60, pojok: false, tegakKe: 0, tegakBenar: [], kanan: 5, jarakDiukur: false, sejajarKe: 0, sejajarBenar: [], tandaKe: 0, pilihan: null, tandaBenar: [], batang: 0, sama: false, lengkung: false, nama: null, bangunKe: 0, bangunBenar: [], menolak: 0, salah: 0 };
    const dC = K3.daftarMisiK3Bab4("C");
    cek(dC === K3.MISI_C && dC.length === 6 && dC.filter((m) => m.wajib).length === 4 && dC.filter((m) => !m.wajib).length === 2 && dC.every((m) => m.id.startsWith("c-")), "C: enam misi, empat wajib, dua bebas, id berawalan c-");
    ujiStruktur("K3B4", K3.daftarMisiK3Bab4, ["C"], { C: awalC });
    cek(dC.every((m) => !m.cek({ alat: "kerangka" })), "C: alat lain tidak memenuhi misi");
    cek(dC.every((m) => !/\d/.test(m.teks) && !/(buku|teman|kelompok|kelas|skor|nilai|soal|tebak|kunci|latihan)/i.test(m.teks)), "C: teks misi tanpa digit dan kata terlarang");
    sama(M0.misiBaru(dC, { ...awalC, tegakBenar: [0] }, kosong), ["c-tegak"], "C: tali tegak lurus memenuhi c-tegak");
    sama(M0.misiBaru(dC, { ...awalC, sejajarBenar: [1] }, kosong), ["c-sejajar"], "C: tali sejajar memenuhi c-sejajar");
    sama(M0.misiBaru(dC, { ...awalC, tandaBenar: [2] }, kosong), ["c-tanda"], "C: tanda tepat memenuhi c-tanda");
    sama(M0.misiBaru(dC, { ...awalC, bangunBenar: [0] }, kosong), ["c-bangun"], "C: bangun tepat memenuhi c-bangun");
    sama(M0.misiBaru(dC, { ...awalC, menolak: 1 }, kosong), ["c-tolak"], "C: alat menolak memenuhi tantangan bebas c-tolak");
    sama(M0.misiBaru(dC, { ...awalC, tandaBenar: [0, 1], bangunBenar: [0, 1, 2] }, kosong), ["c-tanda", "c-bangun"], "C: dua tanda belum memenuhi c-semua");
    sama(M0.misiBaru(dC, { ...awalC, tandaBenar: [0, 1, 2], bangunBenar: [0, 1, 2] }, kosong), ["c-tanda", "c-bangun", "c-semua"], "C: tiga tanda dan tiga bangun memenuhi c-semua");
    sama(M0.misiBaru(dC, { ...awalC, tegakBenar: [0], sejajarBenar: [0], tandaBenar: [0], bangunBenar: [0], menolak: 2 }, kosong), ["c-tegak", "c-sejajar", "c-tanda", "c-bangun", "c-tolak"], "C: semua misi wajib dan c-tolak tercapai");
    cek(M0.misiBaru(dC, { ...awalC, salah: 9, mode: "bangun", sudut: 90, pojok: true, kanan: 2, jarakDiukur: true, pilihan: "tegak", batang: 4, sama: true, lengkung: false, nama: "persegi" }, kosong).length === 0, "C: percobaan keliru, isian, dan rakitan yang belum diperiksa tidak dihitung sebagai misi");
  }
  void kosong;
}

console.log(`Uji misi Kelas 3 Bab 4: ${lulus} lulus, ${gagal} gagal`);
if (gagal > 0) process.exit(1);
