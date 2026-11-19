// Uji misi hibrida Matematika Kelas 4 Bab 1 (Penginapan Pulau Karang Indah).
// Jalankan: node --no-warnings scripts/uji-lab-k4b1.mjs
import * as M0 from "../src/components/modul/misi-simulasi.ts";
import * as K4 from "../src/components/modul/misi-k4bab1.ts";

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

/* --------------------------- Kelas 4 Bab 1: misi (Penginapan Pulau Karang Indah) --------------------------- */
{
  const kosong = new Set();
  // KERANGKA: agen Sub-Bab mengganti komentar BAGIAN-nya dengan ujinya (keadaan awal tidak memenuhi misi; ujiStruktur untuk sub-bab itu).
  // BAGIAN A (Loket Tiket; rincian di scripts/uji-tiket-k4b1a.mjs): keadaan awal ditulis langsung karena logika.ts folder memakai impor tanpa ekstensi.
  {
    const awalA = { alat: "tiket", mode: "susun", susunKe: 0, susun: [null, null, null, null], susunSel: -1, susunBenar: [], bacaKe: 0, bacaPilih: -1, bacaBenar: [], nolKe: 0, nol: [4, 8, null, 3], nolSel: -1, nolBenar: [], tempatKe: 0, tempatPilih: -1, tempatBenar: [], tolak: false, salah: 0 };
    const dA = K4.daftarMisiK4Bab1("A");
    cek(dA === K4.MISI_A && dA.length === 6 && dA.filter((m) => m.wajib).length === 4 && dA.filter((m) => !m.wajib).length === 2 && dA.every((m) => m.id.startsWith("a-")), "A: enam misi, empat wajib, dua bebas, id berawalan a-");
    ujiStruktur("K4B1", K4.daftarMisiK4Bab1, ["A"], { A: awalA });
    cek(dA.every((m) => !m.cek({ alat: "kerangka" })), "A: alat lain tidak memenuhi misi");
    cek(dA.every((m) => !/\d/.test(m.teks) && !/(buku|teman|kelompok|kelas|skor|nilai|soal|tebak|kunci|latihan)/i.test(m.teks)), "A: teks misi tanpa digit dan kata terlarang");
    sama(M0.misiBaru(dA, { ...awalA, susunBenar: [0] }, kosong), ["a-susun"], "A: kartu angka tersusun tepat memenuhi a-susun");
    sama(M0.misiBaru(dA, { ...awalA, bacaBenar: [1] }, kosong), ["a-baca"], "A: tiket terbaca tepat memenuhi a-baca");
    sama(M0.misiBaru(dA, { ...awalA, nolBenar: [0] }, kosong), ["a-nol"], "A: nol yang hilang terisi tepat memenuhi a-nol");
    sama(M0.misiBaru(dA, { ...awalA, tempatBenar: [2] }, kosong), ["a-tempat"], "A: tempat angka tepat memenuhi a-tempat");
    sama(M0.misiBaru(dA, { ...awalA, tolak: true }, kosong), ["a-tolak"], "A: alat menolak memeriksa kotak kosong memenuhi tantangan bebas a-tolak");
    sama(M0.misiBaru(dA, { ...awalA, susunBenar: [0, 1] }, kosong), ["a-susun", "a-dua"], "A: dua bilangan tersusun memenuhi a-susun dan a-dua");
    cek(M0.misiBaru(dA, { ...awalA, salah: 9, mode: "nol", susun: [7, 2, 0, 8], susunSel: 1, bacaPilih: 2, nol: [4, 8, 0, 3], nolSel: 2, tempatPilih: 1 }, kosong).length === 0, "A: percobaan keliru, kartu di kotak, dan pilihan yang belum diperiksa tidak dihitung sebagai misi");
  }
  // BAGIAN B (Gudang Handuk; rincian di scripts/uji-handuk-k4b1b.mjs): keadaan awal ditulis langsung karena logika.ts folder memakai impor tanpa ekstensi.
  {
    const awalB = { alat: "handuk", mode: "isi", isiKe: 0, isi: [0, 0, 0, 0], isiBenar: [], baganKe: 0, bagan: [0, 0, 0, 0], baganBenar: [], artiKe: 0, sudahLihat: false, artiPilih: -1, artiBenar: [], tukarKe: 0, tukarPilih: [], sudahTukar: false, bandingPilih: -1, tukarBenar: [], tolak: false, salah: 0 };
    const dB = K4.daftarMisiK4Bab1("B");
    cek(dB === K4.MISI_B && dB.length === 6 && dB.filter((m) => m.wajib).length === 4 && dB.filter((m) => !m.wajib).length === 2 && dB.every((m) => m.id.startsWith("b-")), "B: enam misi, empat wajib, dua bebas, id berawalan b-");
    ujiStruktur("K4B1", K4.daftarMisiK4Bab1, ["B"], { B: awalB });
    cek(dB.every((m) => !m.cek({ alat: "kerangka" })), "B: alat lain tidak memenuhi misi");
    cek(dB.every((m) => !/\d/.test(m.teks) && !/(buku|teman|kelompok|kelas|skor|nilai|soal|tebak|kunci|latihan)/i.test(m.teks)), "B: teks misi tanpa digit dan kata terlarang");
    sama(M0.misiBaru(dB, { ...awalB, isiBenar: [0] }, kosong), ["b-isi"], "B: gudang terisi tepat memenuhi b-isi");
    sama(M0.misiBaru(dB, { ...awalB, baganBenar: [1] }, kosong), ["b-bagan"], "B: bagan tempat tepat memenuhi b-bagan");
    sama(M0.misiBaru(dB, { ...awalB, artiBenar: [2] }, kosong), ["b-arti"], "B: arti angka tepat memenuhi b-arti");
    sama(M0.misiBaru(dB, { ...awalB, tukarBenar: [0] }, kosong), ["b-tukar"], "B: tukar tempat tepat memenuhi b-tukar");
    sama(M0.misiBaru(dB, { ...awalB, tolak: true }, kosong), ["b-tolak"], "B: alat menolak memeriksa sebelum bekerja memenuhi tantangan bebas b-tolak");
    sama(M0.misiBaru(dB, { ...awalB, artiBenar: [0, 1, 2] }, kosong), ["b-arti"], "B: tiga pertanyaan arti belum memenuhi b-semua");
    sama(M0.misiBaru(dB, { ...awalB, artiBenar: [0, 1, 2, 3] }, kosong), ["b-arti", "b-semua"], "B: empat pertanyaan arti memenuhi b-arti dan b-semua");
  }
  // BAGIAN C (Papan Dermaga; rincian di scripts/uji-dermaga-k4b1c.mjs): keadaan awal ditulis langsung karena logika.ts folder memakai impor tanpa ekstensi.
  {
    const awalC = { alat: "dermaga", mode: "banding", bandKe: 0, lihat: 0, tandaPilih: -1, bandBenar: [], samaBenar: false, urutKe: 0, susun: [3482, 3248, 3824], urutSel: -1, naikBenar: [], turunBenar: [], garisKe: 0, titik: 0, garisBenar: [], tolak: false, salah: 0 };
    const dC = K4.daftarMisiK4Bab1("C");
    cek(dC === K4.MISI_C && dC.length === 6 && dC.filter((m) => m.wajib).length === 4 && dC.filter((m) => !m.wajib).length === 2 && dC.every((m) => m.id.startsWith("c-")), "C: enam misi, empat wajib, dua bebas, id berawalan c-");
    ujiStruktur("K4B1", K4.daftarMisiK4Bab1, ["C"], { C: awalC });
    cek(dC.every((m) => !m.cek({ alat: "kerangka" })), "C: alat lain tidak memenuhi misi");
    cek(dC.every((m) => !/\d/.test(m.teks) && !/(buku|teman|kelompok|kelas|skor|nilai|soal|tebak|kunci|latihan)/i.test(m.teks)), "C: teks misi tanpa digit dan kata terlarang");
    sama(M0.misiBaru(dC, { ...awalC, bandBenar: [0] }, kosong), ["c-banding"], "C: pasangan bilangan dibandingkan tepat memenuhi c-banding");
    sama(M0.misiBaru(dC, { ...awalC, naikBenar: [0] }, kosong), ["c-urut"], "C: kartu berurutan naik tepat memenuhi c-urut");
    sama(M0.misiBaru(dC, { ...awalC, turunBenar: [1] }, kosong), ["c-turun"], "C: kartu berurutan turun tepat memenuhi c-turun");
    sama(M0.misiBaru(dC, { ...awalC, garisBenar: [2] }, kosong), ["c-garis"], "C: titik di bilangan sasaran tepat memenuhi c-garis");
    sama(M0.misiBaru(dC, { ...awalC, samaBenar: true }, kosong), ["c-sama"], "C: pasangan yang sama dijawab benar memenuhi tantangan bebas c-sama");
    sama(M0.misiBaru(dC, { ...awalC, tolak: true }, kosong), ["c-tolak"], "C: alat menolak memilih tanda sebelum angka berbeda terlihat memenuhi tantangan bebas c-tolak");
    sama(M0.misiBaru(dC, { ...awalC, bandBenar: [0, 2], naikBenar: [0], turunBenar: [1], garisBenar: [0], samaBenar: true, tolak: true }, kosong), ["c-banding", "c-urut", "c-turun", "c-garis", "c-sama", "c-tolak"], "C: semua misi tercapai");
    cek(M0.misiBaru(dC, { ...awalC, salah: 9, mode: "garis", lihat: 3, tandaPilih: 1, susun: [3248, 3482, 3824], urutSel: 1, titik: 4 }, kosong).length === 0, "C: percobaan keliru, tempat yang dilihat, tanda, kartu yang digeser, dan titik yang belum diperiksa tidak dihitung sebagai misi");
  }
  // BAGIAN D (Kios Kelapa; rincian di scripts/uji-kelapa-k4b1d.mjs): keadaan awal ditulis langsung karena logika.ts folder memakai impor tanpa ekstensi.
  {
    const awalD = { alat: "kelapa", mode: "pecah", pecahKe: 0, isi: [0, 0, 0, 0], pecahBenar: [], susunKe: 0, susunPilih: -1, susunBenar: [], bagKe: 0, bagPilih: -1, bagCek: false, bagBenar: [], lainKe: 0, lainA: 1, lainSimpan: [], lainBenar: [], tolak: false, salah: 0 };
    const dD = K4.daftarMisiK4Bab1("D");
    cek(dD === K4.MISI_D && dD.length === 6 && dD.filter((m) => m.wajib).length === 4 && dD.filter((m) => !m.wajib).length === 2 && dD.every((m) => m.id.startsWith("d-")), "D: enam misi, empat wajib, dua bebas, id berawalan d-");
    ujiStruktur("K4B1", K4.daftarMisiK4Bab1, ["D"], { D: awalD });
    cek(dD.every((m) => !m.cek({ alat: "kerangka" })), "D: alat lain tidak memenuhi misi");
    cek(dD.every((m) => !/\d/.test(m.teks) && !/(buku|teman|kelompok|kelas|skor|nilai|soal|tebak|kunci|latihan)/i.test(m.teks)), "D: teks misi tanpa digit dan kata terlarang");
    sama(M0.misiBaru(dD, { ...awalD, pecahBenar: [0] }, kosong), ["d-pecah"], "D: keranjang yang jumlahnya sama dengan bilangan memenuhi d-pecah");
    sama(M0.misiBaru(dD, { ...awalD, susunBenar: [0] }, kosong), ["d-susun"], "D: bilangan tersusun tepat memenuhi d-susun");
    sama(M0.misiBaru(dD, { ...awalD, bagBenar: [1] }, kosong), ["d-bagan"], "D: bagian yang hilang di bagan tepat memenuhi d-bagan");
    sama(M0.misiBaru(dD, { ...awalD, lainBenar: [0] }, kosong), ["d-lain"], "D: tiga cara berbeda tersimpan memenuhi d-lain");
    sama(M0.misiBaru(dD, { ...awalD, tolak: true }, kosong), ["d-tolak"], "D: alat menolak terlalu banyak keranjang atau cara yang sama memenuhi tantangan bebas d-tolak");
    sama(M0.misiBaru(dD, { ...awalD, pecahBenar: [0, 1, 2] }, kosong), ["d-pecah", "d-tiga"], "D: tiga bilangan dipecah benar memenuhi d-pecah dan d-tiga");
    sama(M0.misiBaru(dD, { ...awalD, pecahBenar: [0, 1, 2], susunBenar: [0], bagBenar: [0], lainBenar: [0], tolak: true }, kosong), ["d-pecah", "d-susun", "d-bagan", "d-lain", "d-tolak", "d-tiga"], "D: semua misi tercapai");
    cek(M0.misiBaru(dD, { ...awalD, salah: 9, mode: "lain", isi: [6, 4, 8, 2], susunPilih: 1, bagPilih: 1, bagCek: true, lainA: 3, lainSimpan: [1, 2] }, kosong).length === 0, "D: percobaan keliru, keranjang yang belum diperiksa, pilihan, dan cara yang belum selesai tidak dihitung sebagai misi");
  }
  // BAGIAN E (Meja Resepsi; rincian di scripts/uji-resepsi-k4b1e.mjs): keadaan awal ditulis langsung karena logika.ts folder memakai impor tanpa ekstensi.
  {
    const awalE = { alat: "resepsi", mode: "susun", susunKe: 0, kol: 0, tulis: [-1, -1, -1], masuk: [0, 0, 0], pilihTulis: -1, pilihSimpan: 0, susunBenar: [], simpanBenar: [], tukarKe: 0, tukar: [12, 14, 3], tukarBenar: [], genapKe: 0, bulat: false, arah: -1, genapBenar: [], tolak: false, salah: 0 };
    const dE = K4.daftarMisiK4Bab1("E");
    cek(dE === K4.MISI_E && dE.length === 6 && dE.filter((m) => m.wajib).length === 4 && dE.filter((m) => !m.wajib).length === 2 && dE.every((m) => m.id.startsWith("e-")), "E: enam misi, empat wajib, dua bebas, id berawalan e-");
    ujiStruktur("K4B1", K4.daftarMisiK4Bab1, ["E"], { E: awalE });
    cek(dE.every((m) => !m.cek({ alat: "kerangka" })), "E: alat lain tidak memenuhi misi");
    cek(dE.every((m) => !/\d/.test(m.teks) && !/(buku|teman|kelompok|kelas|skor|nilai|soal|tebak|kunci|latihan)/i.test(m.teks)), "E: teks misi tanpa digit dan kata terlarang");
    sama(M0.misiBaru(dE, { ...awalE, susunBenar: [0] }, kosong), ["e-susun"], "E: penjumlahan bersusun tanpa simpanan memenuhi e-susun");
    sama(M0.misiBaru(dE, { ...awalE, susunBenar: [1], simpanBenar: [1] }, kosong), ["e-susun", "e-simpan"], "E: penjumlahan dengan simpanan memenuhi e-susun dan e-simpan");
    sama(M0.misiBaru(dE, { ...awalE, tukarBenar: [0] }, kosong), ["e-tukar"], "E: balok tertukar tepat memenuhi e-tukar");
    sama(M0.misiBaru(dE, { ...awalE, genapBenar: [2] }, kosong), ["e-genap"], "E: genapkan dulu tepat memenuhi e-genap");
    sama(M0.misiBaru(dE, { ...awalE, tolak: true }, kosong), ["e-tolak"], "E: alat menolak kolom yang bukan satuan memenuhi tantangan bebas e-tolak");
    sama(M0.misiBaru(dE, { ...awalE, susunBenar: [0, 1] }, kosong), ["e-susun"], "E: dua penjumlahan belum memenuhi e-semua");
    sama(M0.misiBaru(dE, { ...awalE, susunBenar: [0, 1, 2], simpanBenar: [1, 2], tukarBenar: [0], genapBenar: [0], tolak: true }, kosong), ["e-susun", "e-simpan", "e-tukar", "e-genap", "e-tolak", "e-semua"], "E: semua misi tercapai");
    cek(M0.misiBaru(dE, { ...awalE, salah: 9, mode: "genap", kol: 2, tulis: [3, 5, -1], masuk: [0, 1, 1], pilihTulis: 4, pilihSimpan: 1, tukar: [2, 5, 9], bulat: true, arah: 1 }, kosong).length === 0, "E: percobaan keliru, kolom yang sedang dikerjakan, dan pilihan yang belum diperiksa tidak dihitung sebagai misi");
  }
  // BAGIAN F (Papan Sisa; rincian di scripts/uji-sisa-k4b1f.mjs): keadaan awal ditulis langsung karena logika.ts folder memakai impor tanpa ekstensi.
  {
    const awalF = { alat: "sisa", mode: "susun", susunKe: 0, atas: [6, 4, 8], ambil: [false, false, false], hasil: [-1, -1, -1], kolom: 2, susunBenar: [], majuKe: 0, posisi: 438, lompat: [], majuPilih: -1, majuBenar: [], cekKe: 0, sudahTambah: false, putus: -1, cekBenar: [], tangkap: 0, tolak: false, salah: 0 };
    const dF = K4.daftarMisiK4Bab1("F");
    cek(dF === K4.MISI_F && dF.length === 6 && dF.filter((m) => m.wajib).length === 4 && dF.filter((m) => !m.wajib).length === 2 && dF.every((m) => m.id.startsWith("f-")), "F: enam misi, empat wajib, dua bebas, id berawalan f-");
    ujiStruktur("K4B1", K4.daftarMisiK4Bab1, ["F"], { F: awalF });
    cek(dF.every((m) => !m.cek({ alat: "kerangka" })), "F: alat lain tidak memenuhi misi");
    cek(dF.every((m) => !/\d/.test(m.teks) && !/(buku|teman|kelompok|kelas|skor|nilai|soal|tebak|kunci|latihan)/i.test(m.teks)), "F: teks misi tanpa digit dan kata terlarang");
    sama(M0.misiBaru(dF, { ...awalF, susunBenar: [0] }, kosong), ["f-susun"], "F: satu pengurangan bersusun selesai memenuhi f-susun");
    sama(M0.misiBaru(dF, { ...awalF, susunBenar: [0, 1] }, kosong), ["f-susun", "f-ambil"], "F: pengurangan dengan dua kali mengambil selesai memenuhi f-ambil");
    sama(M0.misiBaru(dF, { ...awalF, majuBenar: [1] }, kosong), ["f-maju"], "F: hitung maju tepat memenuhi f-maju");
    sama(M0.misiBaru(dF, { ...awalF, cekBenar: [0] }, kosong), ["f-cek"], "F: periksa dengan tambah tepat memenuhi f-cek");
    sama(M0.misiBaru(dF, { ...awalF, tolak: true }, kosong), ["f-tolak"], "F: alat menolak langkah yang belum waktunya memenuhi tantangan bebas f-tolak");
    sama(M0.misiBaru(dF, { ...awalF, cekBenar: [1], tangkap: 1 }, kosong), ["f-cek", "f-tangkap"], "F: kesalahan tertangkap memenuhi tantangan bebas f-tangkap");
    sama(M0.misiBaru(dF, { ...awalF, susunBenar: [0, 1, 2], majuBenar: [0], cekBenar: [0], tolak: true, tangkap: 1 }, kosong), ["f-susun", "f-ambil", "f-maju", "f-cek", "f-tolak", "f-tangkap"], "F: semua misi tercapai");
    cek(M0.misiBaru(dF, { ...awalF, salah: 9, mode: "cek", atas: [5, 14, 13], ambil: [false, true, true], hasil: [-1, 8, 5], kolom: 0, posisi: 450, lompat: [2, 10], majuPilih: 1, sudahTambah: true, putus: 0 }, kosong).length === 0, "F: percobaan keliru, langkah setengah jalan, dan pilihan yang belum diperiksa tidak dihitung sebagai misi");
  }
  // BAGIAN G (Baris Perahu; rincian di scripts/uji-perahu-k4b1g.mjs): keadaan awal ditulis langsung karena logika.ts folder memakai impor tanpa ekstensi.
  {
    const awalG = { alat: "perahu", mode: "ulang", ulangKe: 0, perahu: 0, ulangBenar: [], uraiKe: 0, uraiP: -1, uraiS: -1, uraiBenar: [], susunKe: 0, sudahSatuan: false, tulis: 0, simpan: 0, susunPilih: -1, susunBenar: [], tolak: false, salah: 0 };
    const dG = K4.daftarMisiK4Bab1("G");
    cek(dG === K4.MISI_G && dG.length === 6 && dG.filter((m) => m.wajib).length === 4 && dG.filter((m) => !m.wajib).length === 2 && dG.every((m) => m.id.startsWith("g-")), "G: enam misi, empat wajib, dua bebas, id berawalan g-");
    ujiStruktur("K4B1", K4.daftarMisiK4Bab1, ["G"], { G: awalG });
    cek(dG.every((m) => !m.cek({ alat: "kerangka" })), "G: alat lain tidak memenuhi misi");
    cek(dG.every((m) => !/\d/.test(m.teks) && !/(buku|teman|kelompok|kelas|skor|nilai|soal|tebak|kunci|latihan)/i.test(m.teks)), "G: teks misi tanpa digit dan kata terlarang");
    sama(M0.misiBaru(dG, { ...awalG, ulangBenar: [0] }, kosong), ["g-ulang"], "G: baris perahu tepat memenuhi g-ulang");
    sama(M0.misiBaru(dG, { ...awalG, uraiBenar: [0] }, kosong), ["g-urai"], "G: uraian tepat memenuhi g-urai");
    sama(M0.misiBaru(dG, { ...awalG, susunBenar: [0] }, kosong), ["g-susun"], "G: hitung susun tepat memenuhi g-susun");
    sama(M0.misiBaru(dG, { ...awalG, ulangBenar: [0, 1] }, kosong), ["g-ulang", "g-dua"], "G: dua baris perahu memenuhi g-ulang dan g-dua");
    sama(M0.misiBaru(dG, { ...awalG, tolak: true }, kosong), ["g-tolak"], "G: alat menolak memeriksa susun sebelum satuan dikalikan memenuhi tantangan bebas g-tolak");
    sama(M0.misiBaru(dG, { ...awalG, ulangBenar: [0, 1], uraiBenar: [0, 1], susunBenar: [0, 1] }, kosong), ["g-ulang", "g-urai", "g-susun", "g-dua", "g-semua"], "G: dua tugas tiap alat memenuhi g-semua");
    cek(M0.misiBaru(dG, { ...awalG, salah: 9, mode: "susun", perahu: 3, uraiP: 1, uraiS: 2, sudahSatuan: true, tulis: 4, simpan: 2, susunPilih: 1 }, kosong).length === 0, "G: percobaan keliru, isian, dan pilihan yang belum diperiksa tidak dihitung sebagai misi");
  }
  // BAGIAN H (Papan Jatah; rincian di scripts/uji-jatah-k4b1h.mjs): keadaan awal ditulis langsung karena logika.ts folder memakai impor tanpa ekstensi.
  {
    const awalH = { alat: "jatah", mode: "rata", rataKe: 0, putaran: 0, rataPilih: -1, rataBenar: [], rataSisa: false, kurangKe: 0, kali: 0, kurangPilih: -1, kurangBenar: [], susunKe: 0, q1Pilih: -1, s1Pilih: -1, turun: false, q2Pilih: -1, susunBenar: [], kaliKe: 0, kaliCek: false, kaliPutus: -1, kaliBenar: [], tolak: false, salah: 0 };
    const dH = K4.daftarMisiK4Bab1("H");
    cek(dH === K4.MISI_H && dH.length === 6 && dH.filter((m) => m.wajib).length === 4 && dH.filter((m) => !m.wajib).length === 2 && dH.every((m) => m.id.startsWith("h-")), "H: enam misi, empat wajib, dua bebas, id berawalan h-");
    ujiStruktur("K4B1", K4.daftarMisiK4Bab1, ["H"], { H: awalH });
    cek(dH.every((m) => !m.cek({ alat: "kerangka" })), "H: alat lain tidak memenuhi misi");
    cek(dH.every((m) => !/\d/.test(m.teks) && !/(buku|teman|kelompok|kelas|skor|nilai|soal|tebak|kunci|latihan)/i.test(m.teks)), "H: teks misi tanpa digit dan kata terlarang");
    sama(M0.misiBaru(dH, { ...awalH, rataBenar: [0] }, kosong), ["h-rata"], "H: bagi rata tepat memenuhi h-rata");
    sama(M0.misiBaru(dH, { ...awalH, kurangBenar: [0] }, kosong), ["h-kurang"], "H: kurang berulang tepat memenuhi h-kurang");
    sama(M0.misiBaru(dH, { ...awalH, susunBenar: [1] }, kosong), ["h-susun"], "H: bagi susun tepat memenuhi h-susun");
    sama(M0.misiBaru(dH, { ...awalH, kaliBenar: [2] }, kosong), ["h-kali"], "H: periksa dengan perkalian tepat memenuhi h-kali");
    sama(M0.misiBaru(dH, { ...awalH, rataSisa: true }, kosong), ["h-sisa"], "H: tamu bersisa memenuhi tantangan bebas h-sisa");
    sama(M0.misiBaru(dH, { ...awalH, tolak: true }, kosong), ["h-tolak"], "H: alat menolak memenuhi tantangan bebas h-tolak");
    sama(M0.misiBaru(dH, { ...awalH, rataBenar: [0], kurangBenar: [0], susunBenar: [0], kaliBenar: [0], rataSisa: true, tolak: true }, kosong), ["h-rata", "h-kurang", "h-susun", "h-kali", "h-sisa", "h-tolak"], "H: semua misi tercapai");
    cek(M0.misiBaru(dH, { ...awalH, salah: 9, mode: "susun", putaran: 3, rataPilih: 1, kali: 2, kurangPilih: 1, q1Pilih: 0, s1Pilih: 1, turun: true, q2Pilih: 2, kaliCek: true, kaliPutus: 0 }, kosong).length === 0, "H: percobaan keliru, pilihan, dan langkah yang belum diperiksa tidak dihitung sebagai misi");
  }
  // BAGIAN I (Papan Jadwal; rincian di scripts/uji-jadwal-k4b1i.mjs): keadaan awal ditulis langsung karena logika.ts folder memakai impor tanpa ekstensi.
  {
    const awalI = { alat: "jadwal", mode: "pasang", baris: 1, pasangKe: 0, pasangCatat: [], pasangBenar: [], faktorKe: 0, faktorPilih: [], faktorBenar: [], jadwalKe: 0, jadwalTanda: [], jadwalBenar: [], ujiKe: 0, sudahBagi: false, ujiPilih: -1, ujiBenar: [], tolak: false, salah: 0 };
    const dI = K4.daftarMisiK4Bab1("I");
    cek(dI === K4.MISI_I && dI.length === 6 && dI.filter((m) => m.wajib).length === 4 && dI.filter((m) => !m.wajib).length === 2 && dI.every((m) => m.id.startsWith("i-")), "I: enam misi, empat wajib, dua bebas, id berawalan i-");
    ujiStruktur("K4B1", K4.daftarMisiK4Bab1, ["I"], { I: awalI });
    cek(dI.every((m) => !m.cek({ alat: "kerangka" })), "I: alat lain tidak memenuhi misi");
    cek(dI.every((m) => !/\d/.test(m.teks) && !/(buku|teman|kelompok|kelas|skor|nilai|soal|tebak|kunci|latihan)/i.test(m.teks)), "I: teks misi tanpa digit dan kata terlarang");
    sama(M0.misiBaru(dI, { ...awalI, pasangBenar: [0] }, kosong), ["i-pasang"], "I: pasangan faktor tercatat tepat memenuhi i-pasang");
    sama(M0.misiBaru(dI, { ...awalI, faktorBenar: [0] }, kosong), ["i-faktor"], "I: faktor ditandai tepat memenuhi i-faktor");
    sama(M0.misiBaru(dI, { ...awalI, jadwalBenar: [1] }, kosong), ["i-jadwal"], "I: kelipatan ditandai tepat memenuhi i-jadwal");
    sama(M0.misiBaru(dI, { ...awalI, ujiBenar: [0] }, kosong), ["i-uji"], "I: uji bagi tepat memenuhi i-uji");
    sama(M0.misiBaru(dI, { ...awalI, tolak: true }, kosong), ["i-tolak"], "I: alat menolak memenuhi tantangan bebas i-tolak");
    sama(M0.misiBaru(dI, { ...awalI, ujiBenar: [0, 1, 2] }, kosong), ["i-uji"], "I: tiga bilangan uji belum memenuhi i-semua");
    sama(M0.misiBaru(dI, { ...awalI, ujiBenar: [0, 1, 2, 3] }, kosong), ["i-uji", "i-semua"], "I: empat bilangan uji memenuhi i-uji dan i-semua");
    sama(M0.misiBaru(dI, { ...awalI, pasangBenar: [0], faktorBenar: [0], jadwalBenar: [0], ujiBenar: [0], tolak: true }, kosong), ["i-pasang", "i-faktor", "i-jadwal", "i-uji", "i-tolak"], "I: semua misi wajib dan i-tolak tercapai");
    cek(M0.misiBaru(dI, { ...awalI, salah: 9, mode: "jadwal", baris: 5, pasangCatat: [1, 5], faktorPilih: [1, 2], jadwalTanda: [7, 14], sudahBagi: true, ujiPilih: 0 }, kosong).length === 0, "I: percobaan keliru, catatan, tanda, dan putusan yang belum diperiksa tidak dihitung sebagai misi");
  }
  void kosong;
}

console.log(`Uji misi Kelas 4 Bab 1: ${lulus} lulus, ${gagal} gagal`);
if (gagal > 0) process.exit(1);
