// Uji misi hibrida Matematika Kelas 4 Bab 4 (Kolam Renang Tirta Ceria).
// Jalankan: node --no-warnings scripts/uji-lab-k4b4.mjs
import * as M0 from "../src/components/modul/misi-simulasi.ts";
import * as K4 from "../src/components/modul/misi-k4bab4.ts";

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

/* --------------------------- Kelas 4 Bab 4: misi (Kolam Renang Tirta Ceria) --------------------------- */
{
  const kosong = new Set();
  // KERANGKA: agen Sub-Bab mengganti komentar BAGIAN-nya dengan ujinya (keadaan awal tidak memenuhi misi; ujiStruktur untuk sub-bab itu).
  // BAGIAN A (Lantai Ubin; rincian di scripts/uji-ubin-k4b4a.mjs): keadaan awal ditulis langsung karena logika.ts folder memakai impor tanpa ekstensi.
  {
    const awalA = { alat: "ubin", mode: "tutup", tutupKe: 0, tutupIsi: 0, tutupBenar: [], barisKe: 0, barisIsi: 0, barisBenar: [], tanggaKe: 0, tanggaIsi: 0, tanggaBenar: [], satuanKe: 0, satuanPilih: -1, satuanBenar: [], tolak: false, salah: 0 };
    const dA = K4.daftarMisiK4Bab4("A");
    cek(dA === K4.MISI_A && dA.length === 6 && dA.filter((m) => m.wajib).length === 4 && dA.filter((m) => !m.wajib).length === 2 && dA.every((m) => m.id.startsWith("a-")), "A: enam misi, empat wajib, dua bebas, id berawalan a-");
    ujiStruktur("K4B4", K4.daftarMisiK4Bab4, ["A"], { A: awalA });
    cek(dA.every((m) => !m.cek({ alat: "kerangka" })), "A: alat lain tidak memenuhi misi");
    cek(dA.every((m) => !/\d/.test(m.teks) && !/(buku|teman|kelompok|kelas|skor|nilai|soal|tebak|kunci|latihan)/i.test(m.teks)), "A: teks misi tanpa digit dan kata terlarang");
    sama(M0.misiBaru(dA, { ...awalA, tutupBenar: [0] }, kosong), ["a-tutup"], "A: lantai tertutup pas memenuhi a-tutup");
    sama(M0.misiBaru(dA, { ...awalA, barisBenar: [1] }, kosong), ["a-baris"], "A: luas dari baris kali kolom yang tepat memenuhi a-baris");
    sama(M0.misiBaru(dA, { ...awalA, tanggaBenar: [2] }, kosong), ["a-tangga"], "A: hasil tangga satuan yang tepat memenuhi a-tangga");
    sama(M0.misiBaru(dA, { ...awalA, satuanBenar: [0] }, kosong), ["a-satuan"], "A: satuan luas yang tepat memenuhi a-satuan");
    sama(M0.misiBaru(dA, { ...awalA, tolak: true }, kosong), ["a-tolak"], "A: alat menolak memeriksa lantai yang kosong memenuhi tantangan bebas a-tolak");
    sama(M0.misiBaru(dA, { ...awalA, tutupBenar: [0, 1] }, kosong), ["a-tutup", "a-dua"], "A: dua lantai benar memenuhi a-tutup dan a-dua");
    cek(M0.misiBaru(dA, { ...awalA, salah: 9, mode: "tangga", tutupIsi: 5, barisIsi: 12, tanggaIsi: 4, satuanPilih: 1 }, kosong).length === 0, "A: percobaan keliru, ubin terpasang, luas, hasil tangga, dan satuan yang belum diperiksa tidak dihitung");
  }
  // BAGIAN B (Bak Ember; rincian di scripts/uji-ember-k4b4b.mjs): keadaan awal ditulis langsung karena logika.ts folder memakai impor tanpa ekstensi.
  {
    const awalB = { alat: "ember", mode: "tuang", tuangKe: 0, takar: 0, tuangan: [], tuangBenar: [], tolak: false, susunKe: 0, lapis: 0, susunBenar: [], tolakSusun: false, tanggaKe: 0, arah: null, pilih: -1, tanggaBenar: [], salah: 0 };
    const dB = K4.daftarMisiK4Bab4("B");
    cek(dB === K4.MISI_B && dB.length === 6 && dB.filter((m) => m.wajib).length === 4 && dB.filter((m) => !m.wajib).length === 2 && dB.every((m) => m.id.startsWith("b-")), "B: enam misi, empat wajib, dua bebas, id berawalan b-");
    ujiStruktur("K4B4", K4.daftarMisiK4Bab4, ["B"], { B: awalB });
    cek(dB.every((m) => !m.cek({ alat: "kerangka" })), "B: alat lain tidak memenuhi misi");
    cek(dB.every((m) => !/\d/.test(m.teks) && !/(buku|teman|kelompok|kelas|skor|nilai|soal|tebak|kunci|latihan)/i.test(m.teks)), "B: teks misi tanpa digit dan kata terlarang");
    sama(M0.misiBaru(dB, { ...awalB, tuangBenar: [0] }, kosong), ["b-tuang"], "B: ember terisi tepat memenuhi b-tuang");
    sama(M0.misiBaru(dB, { ...awalB, susunBenar: [0] }, kosong), ["b-susun"], "B: lapisan kubus yang tepat memenuhi b-susun");
    sama(M0.misiBaru(dB, { ...awalB, tanggaBenar: [0] }, kosong), ["b-turun"], "B: tangga turun yang tepat memenuhi b-turun");
    sama(M0.misiBaru(dB, { ...awalB, tanggaBenar: [1] }, kosong), ["b-naik"], "B: tangga naik yang tepat memenuhi b-naik");
    sama(M0.misiBaru(dB, { ...awalB, tolak: true }, kosong), ["b-tolak"], "B: alat menolak ember meluap memenuhi tantangan bebas b-tolak");
    sama(M0.misiBaru(dB, { ...awalB, tolakSusun: true }, kosong), [], "B: penolakan lapisan melebihi tinggi bak bukan b-tolak");
    sama(M0.misiBaru(dB, { ...awalB, tuangBenar: [0, 1] }, kosong), ["b-tuang", "b-dua"], "B: dua ember benar memenuhi b-tuang dan b-dua");
    cek(M0.misiBaru(dB, { ...awalB, salah: 9, mode: "tangga", takar: 500, tuangan: [500, 500], lapis: 2, arah: "turun", pilih: 1 }, kosong).length === 0, "B: percobaan keliru, gelas, tuangan, lapisan, arah, dan pilihan yang belum diperiksa tidak dihitung");
  }
}

console.log(`Uji misi Kelas 4 Bab 4: ${lulus} lulus, ${gagal} gagal`);
if (gagal > 0) process.exit(1);
