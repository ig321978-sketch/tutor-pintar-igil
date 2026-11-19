// Uji misi hibrida Matematika Kelas 3 Bab 1 (Toko Kelontong Pak Joko).
// Jalankan: node --no-warnings scripts/uji-lab-k3b1.mjs
import * as M0 from "../src/components/modul/misi-simulasi.ts";
import * as K3 from "../src/components/modul/misi-k3bab1.ts";

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

/* --------------------------- Kelas 3 Bab 1: misi (Toko Kelontong Pak Joko) --------------------------- */
{
  const kosong = new Set();
  // KERANGKA: agen Sub-Bab mengganti komentar BAGIAN-nya dengan ujinya (keadaan awal tidak memenuhi misi; ujiStruktur untuk sub-bab itu).
  // BAGIAN A (Rak Stok; rincian di scripts/uji-tempat-k3b1a.mjs): keadaan awal ditulis langsung karena logika.ts folder memakai impor tanpa ekstensi.
  {
    const awalA = { alat: "stok", mode: "tuang", barang: 0, butir: 0, bungkus: 0, dus: 0, tukarButir: false, tukarBungkus: false, papanKe: 0, papan: [0, 0, 0], papanBenar: [], bacaKe: 0, bacaPilih: -1, bacaBenar: [], tulisKe: 0, tulis: [0, 0, 0], tulisBenar: [], salah: 0 };
    const dA = K3.daftarMisiK3Bab1("A");
    cek(dA === K3.MISI_A && dA.length === 6 && dA.filter((m) => m.wajib).length === 4 && dA.every((m) => m.id.startsWith("a-")), "A: enam misi, empat wajib, id berawalan a-");
    ujiStruktur("K3B1", K3.daftarMisiK3Bab1, ["A"], { A: awalA });
    cek(dA.every((m) => !m.cek({ alat: "kerangka" })), "A: alat lain tidak memenuhi misi");
    cek(dA.every((m) => !/\d/.test(m.teks) && !/(buku|teman|kelompok|kelas|skor|nilai|soal|tebak|kunci|latihan)/i.test(m.teks)), "A: teks misi tanpa digit dan kata terlarang");
    sama(M0.misiBaru(dA, { ...awalA, tukarButir: true }, kosong), ["a-tukar"], "A: menukar sepuluh butir memenuhi a-tukar");
    sama(M0.misiBaru(dA, { ...awalA, papanBenar: [0] }, kosong), ["a-papan"], "A: papan benar memenuhi a-papan");
    sama(M0.misiBaru(dA, { ...awalA, bacaBenar: [0] }, kosong), ["a-baca"], "A: bacaan benar memenuhi a-baca");
    sama(M0.misiBaru(dA, { ...awalA, tulisBenar: [0] }, kosong), ["a-tulis"], "A: tulisan benar memenuhi a-tulis");
    sama(M0.misiBaru(dA, { ...awalA, tulisBenar: [0, 1, 2], tukarBungkus: true, tukarButir: true, papanBenar: [0], bacaBenar: [0] }, kosong), ["a-tukar", "a-papan", "a-baca", "a-tulis", "a-ratusan", "a-nol"], "A: semua misi tercapai");
    cek(M0.misiBaru(dA, { ...awalA, salah: 9, mode: "tulis", butir: 9, bungkus: 9, dus: 9, papan: [2, 5, 3], bacaPilih: 1, tulis: [5, 0, 6] }, kosong).length === 0, "A: percobaan keliru, isian, dan benda di rak tidak dihitung sebagai misi");
  }
  // BAGIAN B (Meja Label: susun kartu, uraikan, isi tabel dengan angka, nol penjaga tempat, angka sama; rincian di scripts/uji-kartu-k3b1b.mjs)
  // Keadaan awal ditulis langsung karena logika.ts folder memakai impor tanpa ekstensi.
  {
    const awalB = { alat: "label", mode: "susun", susunIndeks: 0, susun: [0, 0, 0], susunBenar: [], uraiIndeks: 0, urai: [0, 0, 0], uraiBenar: [], tabelIndeks: 0, tabel: [0, 0, 0], tabelBenar: [], nolIndeks: 0, nol: [1, 1, 1], nolBenar: [], samaIndeks: 0, samaPilih: null, samaBenar: [], salah: 0 };
    ujiStruktur("K3B1", K3.daftarMisiK3Bab1, ["B"], { B: awalB });
    const dB = K3.daftarMisiK3Bab1("B");
    cek(dB === K3.MISI_B && dB.filter((m) => m.wajib).length === 4 && dB.filter((m) => !m.wajib).length === 2 && dB.every((m) => m.id.startsWith("b-")), "K3B1 B: empat wajib, dua bebas, id berawalan b-");
    cek(dB.every((m) => !/\d/.test(m.teks) && !/(buku|teman|kelompok|kelas|skor|nilai|soal|tebak|kunci|latihan)/i.test(m.teks)), "K3B1 B: teks misi tanpa digit dan kata terlarang");
    cek(dB.every((m) => !m.cek({ alat: "kerangka" })), "K3B1 B: alat lain tidak memenuhi misi");
    const baruB = (o) => M0.misiBaru(dB, { ...awalB, ...o }, new Set());
    sama(baruB({ susunBenar: [0] }), ["b-susun"], "K3B1 B: satu label tersusun memenuhi b-susun");
    sama(baruB({ uraiBenar: [1] }), ["b-uraikan"], "K3B1 B: bilangan terurai memenuhi b-uraikan");
    sama(baruB({ tabelBenar: [2] }), ["b-tabel"], "K3B1 B: tabel terisi angka memenuhi b-tabel");
    sama(baruB({ nolBenar: [0] }), ["b-nol"], "K3B1 B: label dengan nol memenuhi b-nol");
    sama(baruB({ samaBenar: [3] }), ["b-sama"], "K3B1 B: tempat terbesar untuk angka sama memenuhi tantangan bebas");
    sama(baruB({ susunBenar: [0, 1] }), ["b-susun"], "K3B1 B: dua label belum memenuhi tantangan lengkap");
    sama(baruB({ susunBenar: [0, 1, 2] }), ["b-susun", "b-lengkap"], "K3B1 B: tiga label memenuhi tantangan lengkap");
    cek(M0.misiBaru(dB, { ...awalB, salah: 9, mode: "nol", susun: [3, 4, 5], susunIndeks: 2, urai: [100, 20, 3], uraiIndeks: 1, tabel: [1, 2, 3], tabelIndeks: 2, nol: [5, 0, 9], nolIndeks: 1, samaPilih: 1, samaIndeks: 3 }, new Set()).length === 0, "K3B1 B: percobaan keliru dan isian yang belum diperiksa tidak dihitung sebagai misi");
  }
  // BAGIAN C (Papan Urut; rincian di scripts/uji-urut-k3b1c.mjs): keadaan awal ditulis langsung karena logika.ts folder memakai impor tanpa ekstensi.
  {
    const awalC = { alat: "urutan", mode: "tempat", tempatIndeks: 0, tempatPilih: -1, tempatBenar: [], tandaIndeks: 0, tandaPilih: "", tandaBenar: [], samaTemu: false, garisIndeks: 0, garisPilih: 0, garisBenar: [], urutIndeks: 0, urutArah: "naik", urutSudah: [], urutNaikBenar: [], urutTurunBenar: [], salah: 0 };
    const dC = K3.daftarMisiK3Bab1("C");
    cek(dC === K3.MISI_C && dC.length === 6 && dC.filter((m) => m.wajib).length === 4 && dC.every((m) => m.id.startsWith("c-")), "C: enam misi, empat wajib, id berawalan c-");
    ujiStruktur("K3B1", K3.daftarMisiK3Bab1, ["C"], { C: awalC });
    cek(dC.every((m) => !m.cek({ alat: "kerangka" })), "C: alat lain tidak memenuhi misi");
    cek(dC.every((m) => !/\d/.test(m.teks) && !/(buku|teman|kelompok|kelas|skor|nilai|soal|tebak|kunci|latihan)/i.test(m.teks)), "C: teks misi tanpa digit dan kata terlarang");
    sama(M0.misiBaru(dC, { ...awalC, tempatBenar: [0] }, kosong), ["c-tempat"], "C: tempat penentu benar memenuhi c-tempat");
    sama(M0.misiBaru(dC, { ...awalC, tandaBenar: [0] }, kosong), ["c-tanda"], "C: tanda benar memenuhi c-tanda");
    sama(M0.misiBaru(dC, { ...awalC, garisBenar: [1] }, kosong), ["c-garis"], "C: titik di garis benar memenuhi c-garis");
    sama(M0.misiBaru(dC, { ...awalC, urutNaikBenar: [2] }, kosong), ["c-naik"], "C: urutan naik benar memenuhi c-naik");
    sama(M0.misiBaru(dC, { ...awalC, urutTurunBenar: [0] }, kosong), ["c-turun"], "C: urutan turun benar memenuhi tantangan bebas");
    sama(M0.misiBaru(dC, { ...awalC, samaTemu: true }, kosong), ["c-sama"], "C: pasangan sama besar memenuhi tantangan bebas");
    sama(M0.misiBaru(dC, { ...awalC, tempatBenar: [0, 1], tandaBenar: [3], garisBenar: [0], urutNaikBenar: [0], urutTurunBenar: [1], samaTemu: true }, kosong), ["c-tempat", "c-tanda", "c-garis", "c-naik", "c-turun", "c-sama"], "C: semua misi tercapai");
    cek(M0.misiBaru(dC, { ...awalC, salah: 9, mode: "urut", tempatIndeks: 3, tempatPilih: 2, tandaIndeks: 2, tandaPilih: ">", garisIndeks: 1, garisPilih: 5, urutIndeks: 1, urutArah: "turun", urutSudah: [0, 1] }, kosong).length === 0, "C: percobaan keliru dan isian yang belum diperiksa tidak dihitung sebagai misi");
  }
  // BAGIAN D (Meja Pesanan; rincian di scripts/uji-tambah-k3b1d.mjs): keadaan awal ditulis langsung karena logika.ts folder memakai impor tanpa ekstensi.
  {
    const awalD = {
      alat: "pesanan", mode: "susun", noSusun: 0, sSatuan: 0, sSimpan: 0, sPuluhan: 0, susunBenar: [], butir: 17, batang: 4, tukarKali: 0, tukarSelesai: false,
      pjPuluh: 0, pjSatuan: 0, panjangBenar: false, tgSementara: 0, tgHasil: 0, tigaBenar: false, pkPilih: "", pkTaksir: 0, periksaBenar: false, salah: 0,
    };
    const dD = K3.daftarMisiK3Bab1("D");
    cek(dD === K3.MISI_D && dD.length === 6 && dD.filter((m) => m.wajib).length === 4 && dD.every((m) => m.id.startsWith("d-")), "D: enam misi, empat wajib, id berawalan d-");
    ujiStruktur("K3B1", K3.daftarMisiK3Bab1, ["D"], { D: awalD });
    cek(dD.every((m) => !m.cek({ alat: "kerangka" })), "D: alat lain tidak memenuhi misi");
    cek(dD.every((m) => !/\d/.test(m.teks) && !/(buku|teman|kelompok|kelas|skor|nilai|soal|tebak|kunci|latihan)/i.test(m.teks)), "D: teks misi tanpa digit dan kata terlarang");
    sama(M0.misiBaru(dD, { ...awalD, susunBenar: [0] }, kosong), ["d-susun"], "D: susun benar memenuhi d-susun");
    sama(M0.misiBaru(dD, { ...awalD, tukarSelesai: true, butir: 7, batang: 5 }, kosong), ["d-tukar"], "D: menukar sepuluh butir sampai habis memenuhi d-tukar");
    sama(M0.misiBaru(dD, { ...awalD, panjangBenar: true }, kosong), ["d-panjang"], "D: susun panjang benar memenuhi d-panjang");
    sama(M0.misiBaru(dD, { ...awalD, periksaBenar: true }, kosong), ["d-periksa"], "D: periksa tukar benar memenuhi d-periksa");
    sama(M0.misiBaru(dD, { ...awalD, tigaBenar: true }, kosong), ["d-tiga"], "D: tiga bilangan benar memenuhi d-tiga");
    sama(M0.misiBaru(dD, { ...awalD, susunBenar: [0, 1, 2] }, kosong), ["d-susun", "d-banyak"], "D: tiga pesanan tepat memenuhi d-susun dan d-banyak");
    sama(M0.misiBaru(dD, { ...awalD, susunBenar: [0], tukarSelesai: true, panjangBenar: true, periksaBenar: true, tigaBenar: true }, kosong), ["d-susun", "d-tukar", "d-panjang", "d-periksa", "d-tiga"], "D: semua misi tercapai");
    cek(M0.misiBaru(dD, { ...awalD, salah: 9, mode: "tiga", sSatuan: 4, sSimpan: 1, sPuluhan: 8, butir: 12, pjPuluh: 80, pjSatuan: 12, tgSementara: 45, tgHasil: 79, pkPilih: "sama", pkTaksir: 90 }, kosong).length === 0, "D: percobaan keliru dan isian yang belum diperiksa tidak dihitung sebagai misi");
  }
  // BAGIAN E (Rak Sisa; rincian di scripts/uji-kurang-k3b1e.mjs): keadaan awal ditulis langsung karena logika.ts folder memakai impor tanpa ekstensi.
  {
    const awalE = {
      alat: "sisa", mode: "susun", susunIndeks: 0, susunP: 0, susunS: 0, susunPinjam: false, susunBenar: [], panjangIndeks: 0, panjangP: 0, panjangS: 0, panjangBenar: [],
      blokIndeks: 0, blokBatang: 4, blokButir: 7, ambilBatang: 0, ambilButir: 0, blokPecah: false, blokBenar: [], pinjamSelesai: false,
      periksaIndeks: 0, jumP: 0, jumS: 0, vonis: null, periksaBenar: [], kosongIndeks: 0, kosongP: 0, kosongS: 0, kosongBenar: [], salah: 0,
    };
    const dE = K3.daftarMisiK3Bab1("E");
    cek(dE === K3.MISI_E && dE.length === 6 && dE.filter((m) => m.wajib).length === 4 && dE.every((m) => m.id.startsWith("e-")), "E: enam misi, empat wajib, id berawalan e-");
    ujiStruktur("K3B1", K3.daftarMisiK3Bab1, ["E"], { E: awalE });
    cek(dE.every((m) => !m.cek({ alat: "kerangka" })), "E: alat lain tidak memenuhi misi");
    sama(M0.misiBaru(dE, { ...awalE, susunBenar: [0] }, kosong), ["e-susun"], "E: satu susun pendek benar memenuhi e-susun");
    sama(M0.misiBaru(dE, { ...awalE, pinjamSelesai: true, blokBenar: [1] }, kosong), ["e-pinjam"], "E: meminjam dengan benar memenuhi e-pinjam");
    sama(M0.misiBaru(dE, { ...awalE, blokBenar: [0] }, kosong), [], "E: ambil tanpa memecah batang tidak memenuhi e-pinjam");
    sama(M0.misiBaru(dE, { ...awalE, kosongBenar: [0], panjangBenar: [1], periksaBenar: [2], susunBenar: [0, 1, 2], pinjamSelesai: true }, kosong), ["e-susun", "e-panjang", "e-pinjam", "e-periksa", "e-nol", "e-lengkap"], "E: semua misi tercapai");
    cek(M0.misiBaru(dE, { ...awalE, salah: 9, mode: "kosong", susunP: 5, susunS: 4, jumP: 3, vonis: "cocok", kosongP: 2 }, kosong).length === 0, "E: percobaan keliru dan geseran tidak dihitung sebagai misi");
  }
  // BAGIAN F (Rak Kotak: kotak isi sama, tulis perkalian, susun baris kolom lalu putar, lompat hitung; rincian di scripts/uji-kali-k3b1f.mjs): keadaan awal ditulis langsung karena logika.ts folder memakai impor tanpa ekstensi.
  {
    const awalF = { alat: "isi", mode: "isi", isiIndeks: 0, kotak: 0, isi: 0, isiBenar: [], tulisIndeks: 0, tulisA: 0, tulisB: 0, tulisBenar: [], susunIndeks: 0, baris: 0, kolom: 0, sudahPutar: false, susunBenar: [], putarBenar: false, lompatIndeks: 0, besar: 2, posisi: 0, lompatan: 0, lompatBenar: [], salah: 0 };
    ujiStruktur("K3B1", K3.daftarMisiK3Bab1, ["F"], { F: awalF });
    const dF = K3.daftarMisiK3Bab1("F");
    cek(dF === K3.MISI_F && dF.length === 6 && dF.filter((m) => m.wajib).length === 4 && dF.filter((m) => !m.wajib).length === 2 && dF.every((m) => m.id.startsWith("f-")), "K3B1 F: empat wajib, dua bebas, id berawalan f-");
    cek(dF.every((m) => !/\d/.test(m.teks) && !/(buku|teman|kelompok|kelas|skor|nilai|soal|tebak|kunci|latihan)/i.test(m.teks)), "K3B1 F: teks misi tanpa digit dan kata terlarang");
    cek(dF.every((m) => !m.cek({ alat: "kerangka" })), "K3B1 F: alat lain tidak memenuhi misi");
    const baruF = (o) => M0.misiBaru(dF, { ...awalF, ...o }, new Set());
    sama(baruF({ isiBenar: [0] }), ["f-isi"], "K3B1 F: satu sasaran isi memenuhi f-isi");
    sama(baruF({ tulisBenar: [1] }), ["f-tulis"], "K3B1 F: perkalian tepat memenuhi f-tulis");
    sama(baruF({ susunBenar: [0] }), ["f-susun"], "K3B1 F: susunan baris kolom tepat memenuhi f-susun");
    sama(baruF({ lompatBenar: [2] }), ["f-lompat"], "K3B1 F: mendarat tepat di sasaran memenuhi f-lompat");
    sama(baruF({ putarBenar: true }), ["f-putar"], "K3B1 F: susunan diputar dan diperiksa memenuhi tantangan bebas");
    sama(baruF({ isiBenar: [0, 1] }), ["f-isi"], "K3B1 F: dua sasaran isi belum memenuhi tantangan lengkap");
    sama(baruF({ isiBenar: [0, 1, 2] }), ["f-isi", "f-lengkap"], "K3B1 F: tiga sasaran isi memenuhi tantangan lengkap");
    cek(M0.misiBaru(dF, { ...awalF, salah: 9, mode: "lompat", kotak: 5, isi: 6, isiIndeks: 2, tulisA: 3, tulisB: 4, tulisIndeks: 1, baris: 6, kolom: 7, sudahPutar: true, susunIndeks: 1, besar: 5, posisi: 25, lompatan: 5, lompatIndeks: 2 }, new Set()).length === 0, "K3B1 F: percobaan keliru dan isian yang belum diperiksa tidak dihitung sebagai misi");
  }
  // BAGIAN G (Meja Bingkisan; rincian di scripts/uji-bagi-k3b1g.mjs): keadaan awal ditulis langsung karena logika.ts folder memakai impor tanpa ekstensi.
  {
    const awalG = {
      alat: "bagi", mode: "bagi", bagiIndeks: 0, bagiPutaran: 0, bagiIsi: 0, bagiBenar: [], kurangIndeks: 0, kurangLompat: 0, kurangHitung: 0, kurangBenar: [],
      tulisIndeks: 0, tulisA: 0, tulisB: 0, tulisC: 0, tulisBenar: [], keluargaIndeks: 0, keluargaPilih: [], keluargaBenar: [], periksaIndeks: 0, periksaKali: 0, periksaBenar: [], salah: 0,
    };
    const dG = K3.daftarMisiK3Bab1("G");
    cek(dG === K3.MISI_G && dG.length === 6 && dG.filter((m) => m.wajib).length === 4 && dG.filter((m) => !m.wajib).length === 2 && dG.every((m) => m.id.startsWith("g-")), "G: enam misi, empat wajib, dua bebas, id berawalan g-");
    ujiStruktur("K3B1", K3.daftarMisiK3Bab1, ["G"], { G: awalG });
    cek(dG.every((m) => !m.cek({ alat: "kerangka" })), "G: alat lain tidak memenuhi misi");
    cek(dG.every((m) => !/\d/.test(m.teks) && !/(buku|teman|kelompok|kelas|skor|nilai|soal|tebak|kunci|latihan)/i.test(m.teks)), "G: teks misi tanpa digit dan kata terlarang");
    sama(M0.misiBaru(dG, { ...awalG, bagiBenar: [0] }, kosong), ["g-bagi"], "G: satu tumpukan dibagi benar memenuhi g-bagi");
    sama(M0.misiBaru(dG, { ...awalG, kurangBenar: [0] }, kosong), ["g-kurang"], "G: lompat mundur benar memenuhi g-kurang");
    sama(M0.misiBaru(dG, { ...awalG, tulisBenar: [1] }, kosong), ["g-tulis"], "G: pembagian tertulis benar memenuhi g-tulis");
    sama(M0.misiBaru(dG, { ...awalG, keluargaBenar: [2] }, kosong), ["g-keluarga"], "G: keluarga fakta benar memenuhi g-keluarga");
    sama(M0.misiBaru(dG, { ...awalG, periksaBenar: [0] }, kosong), ["g-periksa"], "G: periksa dengan kali benar memenuhi tantangan bebas");
    sama(M0.misiBaru(dG, { ...awalG, bagiBenar: [0, 1, 2] }, kosong), ["g-bagi", "g-lengkap"], "G: tiga tumpukan dibagi benar memenuhi g-lengkap");
    sama(M0.misiBaru(dG, { ...awalG, bagiBenar: [0, 1, 2], kurangBenar: [0], tulisBenar: [0], keluargaBenar: [0], periksaBenar: [0] }, kosong), ["g-bagi", "g-kurang", "g-tulis", "g-keluarga", "g-periksa", "g-lengkap"], "G: semua misi tercapai");
    cek(M0.misiBaru(dG, { ...awalG, salah: 9, mode: "periksa", bagiPutaran: 2, bagiIsi: 3, kurangLompat: 1, kurangHitung: 2, tulisA: 5, tulisB: 2, tulisC: 4, keluargaPilih: [0, 1], periksaKali: 40, bagiIndeks: 2 }, kosong).length === 0, "G: percobaan keliru dan geseran tidak dihitung sebagai misi");
  }
  void kosong;
}

console.log(`Uji misi Kelas 3 Bab 1: ${lulus} lulus, ${gagal} gagal`);
if (gagal > 0) process.exit(1);
