// Uji misi hibrida Matematika Kelas 4 Bab 2 (Sanggar Batik Kampung Mekar).
// Jalankan: node --no-warnings scripts/uji-lab-k4b2.mjs
import * as M0 from "../src/components/modul/misi-simulasi.ts";
import * as K4 from "../src/components/modul/misi-k4bab2.ts";

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

/* --------------------------- Kelas 4 Bab 2: misi (Sanggar Batik Kampung Mekar) --------------------------- */
{
  const kosong = new Set();
  // KERANGKA: agen Sub-Bab mengganti komentar BAGIAN-nya dengan ujinya (keadaan awal tidak memenuhi misi; ujiStruktur untuk sub-bab itu).
  // BAGIAN A (Meja Lipat; rincian di scripts/uji-lipat-k4b2a.mjs): keadaan awal ditulis langsung karena logika.ts folder memakai impor tanpa ekstensi.
  {
    const awalA = { alat: "lipat", mode: "lipat", lipatKe: 0, lipatBagian: 1, lipatArsir: -1, lipatBenar: [], bandingKe: 0, bandingPilih: -1, bandingBenar: [], urutKe: 0, urutIsi: [], urutBenar: [], garisKe: 0, garisBagian: 1, garisJepit: 0, garisBenar: [], tolak: false, salah: 0 };
    const dA = K4.daftarMisiK4Bab2("A");
    cek(dA === K4.MISI_A && dA.length === 6 && dA.filter((m) => m.wajib).length === 4 && dA.filter((m) => !m.wajib).length === 2 && dA.every((m) => m.id.startsWith("a-")), "A: enam misi, empat wajib, dua bebas, id berawalan a-");
    ujiStruktur("K4B2", K4.daftarMisiK4Bab2, ["A"], { A: awalA });
    cek(dA.every((m) => !m.cek({ alat: "kerangka" })), "A: alat lain tidak memenuhi misi");
    cek(dA.every((m) => !/\d/.test(m.teks) && !/(buku|teman|kelompok|kelas|skor|nilai|soal|tebak|kunci|latihan)/i.test(m.teks)), "A: teks misi tanpa digit dan kata terlarang");
    sama(M0.misiBaru(dA, { ...awalA, lipatBenar: [0] }, kosong), ["a-lipat"], "A: kain terbagi tepat dan berarsir memenuhi a-lipat");
    sama(M0.misiBaru(dA, { ...awalA, bandingBenar: [1] }, kosong), ["a-banding"], "A: tanda yang tepat memenuhi a-banding");
    sama(M0.misiBaru(dA, { ...awalA, urutBenar: [2] }, kosong), ["a-urut"], "A: tiga pecahan terurut memenuhi a-urut");
    sama(M0.misiBaru(dA, { ...awalA, garisBenar: [0] }, kosong), ["a-garis"], "A: tanda pada garis yang dijepit tepat memenuhi a-garis");
    sama(M0.misiBaru(dA, { ...awalA, tolak: true }, kosong), ["a-tolak"], "A: alat menolak memeriksa kain tanpa bagian berarsir memenuhi tantangan bebas a-tolak");
    sama(M0.misiBaru(dA, { ...awalA, lipatBenar: [0, 1] }, kosong), ["a-lipat", "a-dua"], "A: dua pesanan kain benar memenuhi a-lipat dan a-dua");
    cek(M0.misiBaru(dA, { ...awalA, salah: 9, mode: "garis", lipatBagian: 5, lipatArsir: 2, bandingPilih: 1, urutIsi: [0, 2], garisBagian: 6, garisJepit: 3 }, kosong).length === 0, "A: percobaan keliru, bagian berarsir, tanda terpilih, kartu terletak, dan jepitan yang belum diperiksa tidak dihitung");
  }
  // BAGIAN B (Bak Warna; rincian di scripts/uji-warna-k4b2b.mjs): keadaan awal ditulis langsung karena logika.ts folder memakai impor tanpa ekstensi.
  {
    const awalB = { alat: "warna", mode: "banding", bandKe: 0, lihatA: false, lihatB: false, tandaPilih: -1, bandBenar: [], isiKe: 0, isi: [], isiBenar: [], urutKe: 0, susun: [5, 1, 3], urutSel: -1, naikBenar: [], turunBenar: [], garisKe: 0, titik: 0, garisBenar: [], tolak: false, salah: 0 };
    const dB = K4.daftarMisiK4Bab2("B");
    cek(dB === K4.MISI_B && dB.length === 6 && dB.filter((m) => m.wajib).length === 4 && dB.filter((m) => !m.wajib).length === 2 && dB.every((m) => m.id.startsWith("b-")), "B: enam misi, empat wajib, dua bebas, id berawalan b-");
    ujiStruktur("K4B2", K4.daftarMisiK4Bab2, ["B"], { B: awalB });
    cek(dB.every((m) => !m.cek({ alat: "kerangka" })), "B: alat lain tidak memenuhi misi");
    cek(dB.every((m) => !/\d/.test(m.teks) && !/(buku|teman|kelompok|kelas|skor|nilai|soal|tebak|kunci|latihan|senilai)/i.test(m.teks)), "B: teks misi tanpa digit dan kata terlarang");
    sama(M0.misiBaru(dB, { ...awalB, bandBenar: [0] }, kosong), ["b-banding"], "B: pasangan bak dibandingkan tepat memenuhi b-banding");
    sama(M0.misiBaru(dB, { ...awalB, isiBenar: [1] }, kosong), ["b-isi"], "B: bak terisi sebanyak pembilang memenuhi b-isi");
    sama(M0.misiBaru(dB, { ...awalB, naikBenar: [0] }, kosong), ["b-urut"], "B: kartu berurutan naik memenuhi b-urut");
    sama(M0.misiBaru(dB, { ...awalB, garisBenar: [2] }, kosong), ["b-garis"], "B: titik di pecahan sasaran memenuhi b-garis");
    sama(M0.misiBaru(dB, { ...awalB, turunBenar: [1] }, kosong), ["b-turun"], "B: kartu berurutan turun memenuhi tantangan bebas b-turun");
    sama(M0.misiBaru(dB, { ...awalB, tolak: true }, kosong), ["b-tolak"], "B: alat menolak memilih tanda sebelum kedua bak dihitung memenuhi tantangan bebas b-tolak");
    sama(M0.misiBaru(dB, { ...awalB, bandBenar: [0, 2], isiBenar: [0], naikBenar: [0], turunBenar: [1], garisBenar: [0], tolak: true }, kosong), ["b-banding", "b-isi", "b-urut", "b-garis", "b-turun", "b-tolak"], "B: semua misi tercapai");
    cek(M0.misiBaru(dB, { ...awalB, salah: 9, mode: "garis", lihatA: true, lihatB: true, tandaPilih: 1, isi: [0, 2], susun: [1, 3, 5], urutSel: 1, titik: 3 }, kosong).length === 0, "B: percobaan keliru, bak yang dihitung, tanda, bagian terisi, kartu yang digeser, dan titik yang belum diperiksa tidak dihitung sebagai misi");
  }
  // BAGIAN C (Meja Jahit; rincian di scripts/uji-jahit-k4b2c.mjs): keadaan awal ditulis langsung karena logika.ts folder memakai impor tanpa ekstensi.
  {
    const awalC = { alat: "jahit", mode: "arsir", arsirKe: 0, arsir: Array.from({ length: 14 }, () => false), arsirBenar: [], kaliKe: 0, kaliCara: "kali", kaliN: 0, kaliBenar: [], bagiKe: 0, bagiP: 15, bagiQ: 35, bagiBenar: [], pasangKe: 0, pasangPilih: [], pasangBenar: [], tolak: false, salah: 0 };
    const dC = K4.daftarMisiK4Bab2("C");
    cek(dC === K4.MISI_C && dC.length === 6 && dC.filter((m) => m.wajib).length === 4 && dC.filter((m) => !m.wajib).length === 2 && dC.every((m) => m.id.startsWith("c-")), "C: enam misi, empat wajib, dua bebas, id berawalan c-");
    ujiStruktur("K4B2", K4.daftarMisiK4Bab2, ["C"], { C: awalC });
    cek(dC.every((m) => !m.cek({ alat: "kerangka" })), "C: alat lain tidak memenuhi misi");
    cek(dC.every((m) => !/\d/.test(m.teks) && !/(buku|teman|kelompok|kelas|skor|nilai|soal|tebak|kunci|latihan)/i.test(m.teks)), "C: teks misi tanpa digit dan kata terlarang");
    sama(M0.misiBaru(dC, { ...awalC, arsirBenar: [0] }, kosong), ["c-arsir"], "C: arsiran sama panjang memenuhi c-arsir");
    sama(M0.misiBaru(dC, { ...awalC, kaliBenar: [0] }, kosong), ["c-kali"], "C: pengali yang tepat memenuhi c-kali");
    sama(M0.misiBaru(dC, { ...awalC, bagiBenar: [0] }, kosong), ["c-bagi"], "C: pecahan paling sederhana memenuhi c-bagi");
    sama(M0.misiBaru(dC, { ...awalC, pasangBenar: [0] }, kosong), ["c-pasang"], "C: kartu yang sama besar memenuhi c-pasang");
    sama(M0.misiBaru(dC, { ...awalC, tolak: true }, kosong), ["c-tolak"], "C: alat menolak cara tambah memenuhi tantangan bebas c-tolak");
    sama(M0.misiBaru(dC, { ...awalC, arsirBenar: [0, 1] }, kosong), ["c-arsir", "c-dua"], "C: dua kain benar memenuhi c-arsir dan c-dua");
    cek(M0.misiBaru(dC, { ...awalC, salah: 9, mode: "pasang", arsir: awalC.arsir.map((_, i) => i < 3), kaliN: 3, kaliCara: "tambah", bagiP: 3, bagiQ: 7, pasangPilih: [1, 3] }, kosong).length === 0, "C: percobaan keliru, arsiran, pilihan, dan pecahan yang belum diperiksa tidak dihitung");
  }
  // BAGIAN D (Meteran Kain; rincian di scripts/uji-meteran-k4b2d.mjs): keadaan awal ditulis langsung karena logika.ts folder memakai impor tanpa ekstensi.
  {
    const awalD = { alat: "meteran", mode: "sepuluh", sepKe: 0, sepWarna: 0, sepBenar: [], serKe: 0, serBaris: 0, serLepas: 0, serBenar: [], jemKe: 0, jemPilih: -1, jemCek: false, jemBenar: [], balKe: 0, balPilih: -1, balBenar: [], tolak: false, salah: 0 };
    const dD = K4.daftarMisiK4Bab2("D");
    cek(dD === K4.MISI_D && dD.length === 6 && dD.filter((m) => m.wajib).length === 4 && dD.filter((m) => !m.wajib).length === 2 && dD.every((m) => m.id.startsWith("d-")), "D: enam misi, empat wajib, dua bebas, id berawalan d-");
    ujiStruktur("K4B2", K4.daftarMisiK4Bab2, ["D"], { D: awalD });
    cek(dD.every((m) => !m.cek({ alat: "kerangka" })), "D: alat lain tidak memenuhi misi");
    cek(dD.every((m) => !/\d/.test(m.teks) && !/(buku|teman|kelompok|kelas|skor|nilai|soal|tebak|kunci|latihan)/i.test(m.teks)), "D: teks misi tanpa digit dan kata terlarang");
    sama(M0.misiBaru(dD, { ...awalD, sepBenar: [0] }, kosong), ["d-sepuluh"], "D: kolom berwarna sesuai desimal memenuhi d-sepuluh");
    sama(M0.misiBaru(dD, { ...awalD, serBenar: [0] }, kosong), ["d-seratus"], "D: baris penuh dan kotak lepas sesuai desimal memenuhi d-seratus");
    sama(M0.misiBaru(dD, { ...awalD, jemBenar: [1] }, kosong), ["d-jembatan"], "D: desimal yang sama dengan pecahan memenuhi d-jembatan");
    sama(M0.misiBaru(dD, { ...awalD, balBenar: [2] }, kosong), ["d-balik"], "D: pecahan yang sama besar dengan desimal memenuhi d-balik");
    sama(M0.misiBaru(dD, { ...awalD, tolak: true }, kosong), ["d-tolak"], "D: alat menolak sepuluh kotak lepas memenuhi tantangan bebas d-tolak");
    sama(M0.misiBaru(dD, { ...awalD, sepBenar: [0, 1, 2] }, kosong), ["d-sepuluh", "d-tiga"], "D: tiga kali mewarnai benar memenuhi d-sepuluh dan d-tiga");
    sama(M0.misiBaru(dD, { ...awalD, sepBenar: [0, 1, 2], serBenar: [0], jemBenar: [0], balBenar: [0], tolak: true }, kosong), ["d-sepuluh", "d-seratus", "d-jembatan", "d-balik", "d-tolak", "d-tiga"], "D: semua misi tercapai");
    cek(M0.misiBaru(dD, { ...awalD, salah: 9, mode: "balik", sepWarna: 6, serBaris: 4, serLepas: 8, jemPilih: 1, jemCek: true, balPilih: 2 }, kosong).length === 0, "D: percobaan keliru, kolom yang belum diperiksa, pilihan, dan Cek Jembatan yang belum diperiksa tidak dihitung sebagai misi");
  }
  // BAGIAN E (Papan Pameran; rincian di scripts/uji-pameran-k4b2e.mjs): keadaan awal ditulis langsung karena logika.ts folder memakai impor tanpa ekstensi.
  {
    const awalE = { alat: "pameran", mode: "kisi", kisiKe: 0, kisiWarna: [], kisiBenar: [], geserKe: 0, koma: 1, persen: false, geserBenar: [], balikBenar: [], bacaKe: 0, bacaPersen: -1, bacaDesimal: -1, bacaBenar: [], tolak: false, salah: 0 };
    const dE = K4.daftarMisiK4Bab2("E");
    cek(dE === K4.MISI_E && dE.length === 6 && dE.filter((m) => m.wajib).length === 4 && dE.filter((m) => !m.wajib).length === 2 && dE.every((m) => m.id.startsWith("e-")), "E: enam misi, empat wajib, dua bebas, id berawalan e-");
    ujiStruktur("K4B2", K4.daftarMisiK4Bab2, ["E"], { E: awalE });
    cek(dE.every((m) => !m.cek({ alat: "kerangka" })), "E: alat lain tidak memenuhi misi");
    cek(dE.every((m) => !/\d/.test(m.teks) && !/(buku|teman|kelompok|kelas|skor|nilai|soal|tebak|kunci|latihan)/i.test(m.teks)), "E: teks misi tanpa digit dan kata terlarang");
    sama(M0.misiBaru(dE, { ...awalE, kisiBenar: [0] }, kosong), ["e-kisi"], "E: kisi tepat memenuhi e-kisi");
    sama(M0.misiBaru(dE, { ...awalE, geserBenar: [0] }, kosong), ["e-geser"], "E: desimal ke persen tepat memenuhi e-geser");
    sama(M0.misiBaru(dE, { ...awalE, balikBenar: [1] }, kosong), ["e-balik"], "E: persen ke desimal tepat memenuhi e-balik");
    sama(M0.misiBaru(dE, { ...awalE, bacaBenar: [0] }, kosong), ["e-baca"], "E: baca kisi tepat memenuhi e-baca");
    sama(M0.misiBaru(dE, { ...awalE, tolak: true }, kosong), ["e-tolak"], "E: alat menolak memenuhi tantangan bebas e-tolak");
    sama(M0.misiBaru(dE, { ...awalE, kisiBenar: [0] }, kosong), ["e-kisi"], "E: satu kisi belum memenuhi e-dua");
    sama(M0.misiBaru(dE, { ...awalE, kisiBenar: [0, 1] }, kosong), ["e-kisi", "e-dua"], "E: dua kisi memenuhi e-kisi dan e-dua");
    sama(M0.misiBaru(dE, { ...awalE, kisiBenar: [0], geserBenar: [0], balikBenar: [1], bacaBenar: [0], tolak: true }, kosong), ["e-kisi", "e-geser", "e-balik", "e-baca", "e-tolak"], "E: semua misi wajib dan e-tolak tercapai");
    cek(M0.misiBaru(dE, { ...awalE, salah: 9, mode: "geser", kisiWarna: [0, 1, 2], koma: 3, persen: true, bacaPersen: 1, bacaDesimal: 0 }, kosong).length === 0, "E: percobaan keliru, warna, geseran, dan pilihan yang belum diperiksa tidak dihitung sebagai misi");
  }
  void kosong;
}

console.log(`Uji misi Kelas 4 Bab 2: ${lulus} lulus, ${gagal} gagal`);
if (gagal > 0) process.exit(1);
