// Uji misi hibrida Matematika Kelas 3 Bab 2 (Perkemahan Akhir Pekan).
// Jalankan: node --no-warnings scripts/uji-lab-k3b2.mjs
import * as M0 from "../src/components/modul/misi-simulasi.ts";
import * as K3 from "../src/components/modul/misi-k3bab2.ts";

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

/* --------------------------- Kelas 3 Bab 2: misi (Perkemahan Akhir Pekan) --------------------------- */
{
  const kosong = new Set();
  // KERANGKA: agen Sub-Bab mengganti komentar BAGIAN-nya dengan ujinya (keadaan awal tidak memenuhi misi; ujiStruktur untuk sub-bab itu).
  // BAGIAN A (Tumpukan Kayu; rincian di scripts/uji-kayu-k3b2a.mjs): keadaan awal ditulis langsung karena logika.ts folder memakai impor tanpa ekstensi.
  {
    const awalA = { alat: "kayu", mode: "tambah", tambahKe: 0, bundel: 2, lepas: 3, tukar: false, tambahBenar: [], baganKe: 0, baganPilih: -1, baganBenar: [], isiKe: 0, isiPilih: -1, isiBenar: [], depanBenar: false, tengahBenar: false, periksaKe: 0, periksaPilih: -1, periksaBenar: [], kiri: 0, pasangan: [], salah: 0 };
    const dA = K3.daftarMisiK3Bab2("A");
    cek(dA === K3.MISI_A && dA.length === 6 && dA.filter((m) => m.wajib).length === 4 && dA.every((m) => m.id.startsWith("a-")), "A: enam misi, empat wajib, id berawalan a-");
    ujiStruktur("K3B2", K3.daftarMisiK3Bab2, ["A"], { A: awalA });
    cek(dA.every((m) => !m.cek({ alat: "kerangka" })), "A: alat lain tidak memenuhi misi");
    cek(dA.every((m) => !/\d/.test(m.teks) && !/(buku|teman|kelompok|kelas|skor|nilai|soal|tebak|kunci|latihan)/i.test(m.teks)), "A: teks misi tanpa digit dan kata terlarang");
    sama(M0.misiBaru(dA, { ...awalA, tambahBenar: [0] }, kosong), ["a-tambah"], "A: tumpukan tepat memenuhi a-tambah");
    sama(M0.misiBaru(dA, { ...awalA, baganBenar: [0] }, kosong), ["a-bagan"], "A: bagan benar memenuhi a-bagan");
    sama(M0.misiBaru(dA, { ...awalA, isiBenar: [0] }, kosong), ["a-isi"], "A: titik-titik terisi tepat memenuhi a-isi");
    sama(M0.misiBaru(dA, { ...awalA, periksaBenar: [0] }, kosong), ["a-periksa"], "A: pemeriksaan tepat memenuhi a-periksa");
    sama(M0.misiBaru(dA, { ...awalA, tukar: true }, kosong), ["a-bundel"], "A: menukar sepuluh batang lepas memenuhi a-bundel");
    sama(M0.misiBaru(dA, { ...awalA, pasangan: [10, 40, 65] }, kosong), ["a-rak"], "A: tiga pasangan memenuhi a-rak");
    sama(M0.misiBaru(dA, { ...awalA, tambahBenar: [0], baganBenar: [0], isiBenar: [0], periksaBenar: [0], tukar: true, pasangan: [1, 2, 3] }, kosong), ["a-tambah", "a-bagan", "a-isi", "a-periksa", "a-bundel", "a-rak"], "A: semua misi tercapai");
    cek(M0.misiBaru(dA, { ...awalA, salah: 9, mode: "isi", bundel: 9, lepas: 9, baganPilih: 1, isiPilih: 2, periksaPilih: 0, kiri: 40, pasangan: [10, 40] }, kosong).length === 0, "A: percobaan keliru, pilihan, dan benda di rak tidak dihitung sebagai misi");
  }
  // BAGIAN B (Pos Persediaan; rincian di scripts/uji-botol-k3b2b.mjs): keadaan awal ditulis langsung karena logika.ts folder memakai impor tanpa ekstensi.
  {
    const awalB = { alat: "persediaan", mode: "bagikan", barang: 0, bagikanKe: 0, dibagikan: 0, bagikanBenar: [], kurangKe: 0, kurang: [0, 0], kurangBenar: [], awalKe: 0, awal: [0, 0], awalBenar: [], periksaKe: 0, periksaPilih: -1, periksaBenar: [], terjual: [0, 0], pasangan: [], salah: 0 };
    const dB = K3.daftarMisiK3Bab2("B");
    cek(dB === K3.MISI_B && dB.length === 6 && dB.filter((m) => m.wajib).length === 4 && dB.filter((m) => !m.wajib).length === 2 && dB.every((m) => m.id.startsWith("b-")), "B: enam misi, empat wajib, dua bebas, id berawalan b-");
    ujiStruktur("K3B2", K3.daftarMisiK3Bab2, ["B"], { B: awalB });
    cek(dB.every((m) => !m.cek({ alat: "kerangka" })), "B: alat lain tidak memenuhi misi");
    cek(dB.every((m) => !/\d/.test(m.teks) && !/(buku|teman|kelompok|kelas|skor|nilai|soal|tebak|kunci|latihan)/i.test(m.teks)), "B: teks misi tanpa digit dan kata terlarang");
    sama(M0.misiBaru(dB, { ...awalB, bagikanBenar: [0] }, kosong), ["b-bagikan"], "B: sisa sesuai sasaran memenuhi b-bagikan");
    sama(M0.misiBaru(dB, { ...awalB, kurangBenar: [0] }, kosong), ["b-kurang"], "B: bilangan yang dikurangkan tepat memenuhi b-kurang");
    sama(M0.misiBaru(dB, { ...awalB, awalBenar: [1] }, kosong), ["b-awal"], "B: bilangan awal tepat memenuhi b-awal");
    sama(M0.misiBaru(dB, { ...awalB, periksaBenar: [2] }, kosong), ["b-periksa"], "B: pemeriksaan tepat memenuhi b-periksa");
    sama(M0.misiBaru(dB, { ...awalB, pasangan: [30, 45] }, kosong), ["b-pasangan"], "B: dua pasangan memenuhi tantangan bebas b-pasangan");
    sama(M0.misiBaru(dB, { ...awalB, pasangan: [30] }, kosong), [], "B: satu pasangan belum memenuhi b-pasangan");
    sama(M0.misiBaru(dB, { ...awalB, kurangBenar: [0, 1] }, kosong), ["b-kurang"], "B: dua kalimat belum memenuhi tantangan b-lengkap");
    sama(M0.misiBaru(dB, { ...awalB, kurangBenar: [0, 1, 2] }, kosong), ["b-kurang", "b-lengkap"], "B: tiga kalimat memenuhi b-kurang dan b-lengkap");
    sama(M0.misiBaru(dB, { ...awalB, bagikanBenar: [0], kurangBenar: [0, 1, 2], awalBenar: [0], periksaBenar: [0], pasangan: [1, 2] }, kosong), ["b-bagikan", "b-kurang", "b-awal", "b-periksa", "b-pasangan", "b-lengkap"], "B: semua misi tercapai");
    cek(M0.misiBaru(dB, { ...awalB, salah: 9, mode: "pasangan", barang: 2, dibagikan: 20, kurang: [4, 7], awal: [8, 1], periksaPilih: 0, terjual: [3, 0] }, kosong).length === 0, "B: percobaan keliru, isian, dan benda di rak tidak dihitung sebagai misi");
  }
  void kosong;
}

console.log(`Uji misi Kelas 3 Bab 2: ${lulus} lulus, ${gagal} gagal`);
if (gagal > 0) process.exit(1);
