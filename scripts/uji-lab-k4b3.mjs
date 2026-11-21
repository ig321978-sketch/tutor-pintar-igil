// Uji misi hibrida Matematika Kelas 4 Bab 3 (Orkestra Angklung Kampung Senandung).
// Jalankan: node --no-warnings scripts/uji-lab-k4b3.mjs
import * as M0 from "../src/components/modul/misi-simulasi.ts";
import * as K4 from "../src/components/modul/misi-k4bab3.ts";

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

/* --------------------------- Kelas 4 Bab 3: misi (Orkestra Angklung Kampung Senandung) --------------------------- */
{
  const kosong = new Set();
  // KERANGKA: agen Sub-Bab mengganti komentar BAGIAN-nya dengan ujinya (keadaan awal tidak memenuhi misi; ujiStruktur untuk sub-bab itu).
  // BAGIAN A (Panggung Deret; rincian di scripts/uji-angklung-k4b3a.mjs): keadaan awal ditulis langsung karena logika.ts folder memakai impor tanpa ekstensi.
  {
    const awalA = { alat: "angklung", mode: "tata", tataKe: 0, tataIsi: 0, tataBenar: [], jenisKe: 0, jenisPilih: -1, jenisBenar: [], tabelKe: 0, tabelBeda: 0, tabelBenar: [], limaKe: 0, limaIsi: 0, limaBenar: [], tolak: false, salah: 0 };
    const dA = K4.daftarMisiK4Bab3("A");
    cek(dA === K4.MISI_A && dA.length === 6 && dA.filter((m) => m.wajib).length === 4 && dA.filter((m) => !m.wajib).length === 2 && dA.every((m) => m.id.startsWith("a-")), "A: enam misi, empat wajib, dua bebas, id berawalan a-");
    ujiStruktur("K4B3", K4.daftarMisiK4Bab3, ["A"], { A: awalA });
    cek(dA.every((m) => !m.cek({ alat: "kerangka" })), "A: alat lain tidak memenuhi misi");
    cek(dA.every((m) => !/\d/.test(m.teks) && !/(buku|teman|kelompok|kelas|skor|nilai|soal|tebak|kunci|latihan)/i.test(m.teks)), "A: teks misi tanpa digit dan kata terlarang");
    sama(M0.misiBaru(dA, { ...awalA, tataBenar: [0] }, kosong), ["a-tata"], "A: deret keempat tepat memenuhi a-tata");
    sama(M0.misiBaru(dA, { ...awalA, jenisBenar: [1] }, kosong), ["a-jenis"], "A: jenis pola yang tepat memenuhi a-jenis");
    sama(M0.misiBaru(dA, { ...awalA, tabelBenar: [2] }, kosong), ["a-tabel"], "A: selisih yang tepat memenuhi a-tabel");
    sama(M0.misiBaru(dA, { ...awalA, limaBenar: [0] }, kosong), ["a-lima"], "A: susunan per lima yang tepat memenuhi a-lima");
    sama(M0.misiBaru(dA, { ...awalA, tolak: true }, kosong), ["a-tolak"], "A: alat menolak memeriksa deret keempat yang kosong memenuhi tantangan bebas a-tolak");
    sama(M0.misiBaru(dA, { ...awalA, tataBenar: [0, 1] }, kosong), ["a-tata", "a-dua"], "A: dua rak benar memenuhi a-tata dan a-dua");
    cek(M0.misiBaru(dA, { ...awalA, salah: 9, mode: "lima", tataIsi: 5, jenisPilih: 1, tabelBeda: -3, limaIsi: 7 }, kosong).length === 0, "A: percobaan keliru, angklung yang ditata, jenis terpilih, selisih diisi, dan susunan yang belum diperiksa tidak dihitung");
  }
  // BAGIAN B (Papan Kursi; rincian di scripts/uji-kursi-k4b3b.mjs): keadaan awal ditulis langsung karena logika.ts folder memakai impor tanpa ekstensi.
  {
    const awalB = { alat: "kursi", mode: "rantai", rantaiKe: 0, beda: 0, rantai: [6, 13, 20], rantaiBenar: [], mesinKe: 0, mesinOp: null, mesinBeda: 0, mesinBenar: [], tabelKe: 0, lompat: 0, tabelPilih: -1, tabelBenar: [], tolak: false, salah: 0 };
    const dB = K4.daftarMisiK4Bab3("B");
    cek(dB === K4.MISI_B && dB.length === 6 && dB.filter((m) => m.wajib).length === 4 && dB.filter((m) => !m.wajib).length === 2 && dB.every((m) => m.id.startsWith("b-")), "B: enam misi, empat wajib, dua bebas, id berawalan b-");
    ujiStruktur("K4B3", K4.daftarMisiK4Bab3, ["B"], { B: awalB });
    cek(dB.every((m) => !m.cek({ alat: "kerangka" })), "B: alat lain tidak memenuhi misi");
    cek(dB.every((m) => !/\d/.test(m.teks) && !/(buku|teman|kelompok|kelas|skor|nilai|soal|tebak|kunci|latihan)/i.test(m.teks)), "B: teks misi tanpa digit dan kata terlarang");
    sama(M0.misiBaru(dB, { ...awalB, rantaiBenar: [0] }, kosong), ["b-rantai"], "B: rantai membesar yang tepat memenuhi b-rantai");
    sama(M0.misiBaru(dB, { ...awalB, rantaiBenar: [1] }, kosong), ["b-turun"], "B: rantai mengecil yang tepat memenuhi b-turun");
    sama(M0.misiBaru(dB, { ...awalB, mesinBenar: [0] }, kosong), ["b-mesin"], "B: aturan mesin yang tepat memenuhi b-mesin");
    sama(M0.misiBaru(dB, { ...awalB, tabelBenar: [0] }, kosong), ["b-tabel"], "B: lompatan dan bilangan pada tabel yang tepat memenuhi b-tabel");
    sama(M0.misiBaru(dB, { ...awalB, tolak: true }, kosong), ["b-tolak"], "B: alat menolak jumlah kursi kurang dari nol memenuhi tantangan bebas b-tolak");
    sama(M0.misiBaru(dB, { ...awalB, tabelBenar: [0, 1] }, kosong), ["b-tabel", "b-dua"], "B: dua tabel benar memenuhi b-tabel dan b-dua");
    cek(M0.misiBaru(dB, { ...awalB, salah: 9, mode: "tabel", beda: 7, rantai: [6, 13, 20, 27], mesinOp: "tambah", mesinBeda: 8, lompat: 7, tabelPilih: 1 }, kosong).length === 0, "B: percobaan keliru, beda, rantai, aturan, lompatan, dan pilihan yang belum diperiksa tidak dihitung");
  }
}

console.log(`Uji misi Kelas 4 Bab 3: ${lulus} lulus, ${gagal} gagal`);
if (gagal > 0) process.exit(1);
