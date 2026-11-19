// Uji misi hibrida Matematika Kelas 2 (mulai Bab 1).
// Jalankan: node --no-warnings scripts/uji-lab-kelas2.mjs
import * as M0 from "../src/components/modul/misi-simulasi.ts";
import * as K2B1 from "../src/components/modul/misi-k2bab1.ts";
import * as K2B2 from "../src/components/modul/misi-k2bab2.ts";
import * as K2B3 from "../src/components/modul/misi-k2bab3.ts";
import * as K2B4 from "../src/components/modul/misi-k2bab4.ts";
import * as K2B5 from "../src/components/modul/misi-k2bab5.ts";
import * as K2B6 from "../src/components/modul/misi-k2bab6.ts";
import * as K2B7 from "../src/components/modul/misi-k2bab7.ts";
import * as K2B8 from "../src/components/modul/misi-k2bab8.ts";

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

/* --------------------------- Kelas 2 Bab 1: misi (Kue di Kantin Sekolah) --------------------------- */
{
  const kosong = new Set();
  // KERANGKA: agen Sub-Bab mengganti komentar BAGIAN-nya dengan ujinya (keadaan awal tidak memenuhi misi; ujiStruktur untuk sub-bab itu).
  // BAGIAN A (Kotak Kue: dua puluh tiga pastel, nomor antrean mulai empat puluh satu, tiga urutan karcis; rincian di scripts/uji-etalase-k2b1a.mjs)
  {
    const KT = (o = {}) => ({ alat: "etalase", mode: "kemas", dikemas: 0, selesai: false, papanDilihat: false, nomor: 41, maju: 0, mundur: 0, urutanSelesai: [], perkiraan: null, kiraTuntas: 0, ...o });
    const dA = K2B1.daftarMisiK2Bab1("A");
    ujiStruktur("k2bab1", K2B1.daftarMisiK2Bab1, ["A"], { A: KT() });
    cek(dA === K2B1.MISI_A && dA.filter((m) => m.wajib).length === 4 && dA.filter((m) => !m.wajib).length === 2 && dA.every((m) => m.id.startsWith("a-")), "k2bab1 A: empat wajib, dua bebas, id berawalan a-");
    cek(dA.every((m) => !/\d/.test(m.teks) && !/\b(buku|teman|kelompok|kelas|skor|nilai|soal|tebak|kunci|latihan)\b/i.test(m.teks)), "k2bab1 A: teks misi tanpa digit dan kata terlarang");
    cek(dA.every((m) => !m.cek({ alat: "kerangka" })), "k2bab1 A: alat lain tidak memenuhi misi");
    const adaKT = (o, id) => M0.misiBaru(dA, KT(o), kosong).includes(id);
    cek(!adaKT({ dikemas: 22 }, "a-kemas") && adaKT({ dikemas: 23, selesai: true }, "a-kemas"), "k2bab1 A: kemas semua kue");
    cek(!adaKT({ dikemas: 23 }, "a-papan") && adaKT({ papanDilihat: true }, "a-papan"), "k2bab1 A: papan dibuka setelah semua kue dikemas");
    cek(!adaKT({ maju: 3, mundur: 2 }, "a-antrean") && !adaKT({ maju: 2, mundur: 3 }, "a-antrean") && adaKT({ maju: 3, mundur: 3 }, "a-antrean"), "k2bab1 A: nomor antrean maju tiga kali dan mundur tiga kali");
    cek(!adaKT({}, "a-urutan") && adaKT({ urutanSelesai: [1] }, "a-urutan"), "k2bab1 A: lengkapi satu karcis");
    cek(!adaKT({ kiraTuntas: 0, perkiraan: 20 }, "a-kira") && adaKT({ kiraTuntas: 1 }, "a-kira") && !adaKT({ urutanSelesai: [0, 1] }, "a-semua") && adaKT({ urutanSelesai: [0, 1, 2] }, "a-semua"), "k2bab1 A: tantangan bebas (perkiraan dibuktikan, tiga urutan)");
  }
  // BAGIAN B (Meja Kasir: pesanan contoh tujuh belas, dua puluh enam, tiga puluh dua, empat puluh lima, lima puluh; kartu awal satu dan dua; rincian di scripts/uji-kasir-k2b1b.mjs)
  {
    const KS = (o = {}) => ({ alat: "kasir", mode: "meja", kotak: 0, lepas: 0, kartuP: 1, kartuS: 2, susun: false, kemas: 0, tabelDilihat: false, uraianDilihat: false, tukarTuntas: 0, nolDilihat: false, ...o });
    const dB = K2B1.daftarMisiK2Bab1("B");
    ujiStruktur("k2bab1", K2B1.daftarMisiK2Bab1, ["B"], { B: KS() });
    cek(dB === K2B1.MISI_B && dB.filter((m) => m.wajib).length === 4 && dB.filter((m) => !m.wajib).length === 2 && dB.every((m) => m.id.startsWith("b-")), "k2bab1 B: empat wajib, dua bebas, id berawalan b-");
    cek(dB.every((m) => !/\d/.test(m.teks) && !/\b(buku|teman|kelompok|kelas|skor|nilai|soal|tebak|kunci|latihan)\b/i.test(m.teks)), "k2bab1 B: teks misi tanpa digit dan kata terlarang");
    cek(dB.every((m) => !m.cek({ alat: "kerangka" }) && !m.cek({ alat: "etalase" }) && !m.cek({ alat: "pesta" })), "k2bab1 B: alat lain tidak memenuhi misi");
    const adaKS = (o, id) => M0.misiBaru(dB, KS(o), kosong).includes(id);
    cek(!adaKS({ kotak: 1 }, "b-susun") && !adaKS({ lepas: 3 }, "b-susun") && adaKS({ susun: true }, "b-susun"), "k2bab1 B: susun butuh kotak penuh dan kue lepas");
    cek(!adaKS({ kemas: 0 }, "b-kemas") && adaKS({ kemas: 1 }, "b-kemas"), "k2bab1 B: kemas sepuluh jadi satu kotak");
    cek(!adaKS({ mode: "tabel" }, "b-tabel") && adaKS({ tabelDilihat: true }, "b-tabel"), "k2bab1 B: tabel dibaca untuk pesanan yang tersusun");
    cek(!adaKS({ mode: "uraian" }, "b-panjang") && adaKS({ uraianDilihat: true }, "b-panjang"), "k2bab1 B: bentuk panjang dibuka untuk pesanan yang tersusun");
    cek(!adaKS({ tukarTuntas: 0 }, "b-tukar") && adaKS({ tukarTuntas: 1 }, "b-tukar") && !adaKS({ nolDilihat: false }, "b-nol") && adaKS({ nolDilihat: true }, "b-nol"), "k2bab1 B: tantangan bebas (tukar kartu, nol di satuan)");
  }
  // BAGIAN C (Meja Pesta: kukis 26, roti 18, pai 44, wafel 36, kue bulan 26, pretzel 39; rincian di scripts/uji-pesta-k2b1c.mjs)
  {
    const PS = (o = {}) => ({ alat: "pesta", mode: "banding", pilih: [], taksir: [], tabelDibuka: 0, tabel: false, tandaBenar: 0, samaBenar: 0, tandaSalah: 0, urut: [], urutTuntas: 0, tukar: 0, sudahTukar: false, ...o });
    const dC = K2B1.daftarMisiK2Bab1("C");
    ujiStruktur("k2bab1", K2B1.daftarMisiK2Bab1, ["C"], { C: PS() });
    cek(dC === K2B1.MISI_C && dC.filter((m) => m.wajib).length === 4 && dC.filter((m) => !m.wajib).length === 2 && dC.every((m) => m.id.startsWith("c-")), "k2bab1 C: empat wajib, dua bebas, id berawalan c-");
    cek(dC.every((m) => !/\d/.test(m.teks) && !/\b(buku|teman|kelompok|kelas|skor|nilai|soal|tebak|kunci|latihan)\b/i.test(m.teks)), "k2bab1 C: teks misi tanpa digit dan kata terlarang");
    cek(dC.every((m) => !m.cek({ alat: "kerangka" })), "k2bab1 C: alat lain tidak memenuhi misi");
    const adaPS = (o, id) => M0.misiBaru(dC, PS(o), kosong).includes(id);
    cek(!adaPS({}, "c-taksir") && adaPS({ taksir: [0] }, "c-taksir"), "k2bab1 C: perkiraan dulu");
    cek(!adaPS({ pilih: [0, 1] }, "c-tabel") && adaPS({ tabelDibuka: 1 }, "c-tabel"), "k2bab1 C: tabel puluhan dan satuan dibuka");
    cek(!adaPS({ tandaSalah: 2 }, "c-tanda") && !adaPS({ samaBenar: 1 }, "c-tanda") && adaPS({ tandaBenar: 1 }, "c-tanda"), "k2bab1 C: tanda lebih besar atau lebih kecil yang benar");
    cek(!adaPS({ urut: [0, 3] }, "c-urut") && adaPS({ urutTuntas: 1 }, "c-urut"), "k2bab1 C: tiga nampan terurut");
    cek(!adaPS({ tandaBenar: 1 }, "c-sama") && adaPS({ samaBenar: 1 }, "c-sama") && !adaPS({ sudahTukar: true }, "c-tukar") && adaPS({ tukar: 1 }, "c-tukar"), "k2bab1 C: tantangan bebas (sama dengan, tukar sepuluh)");
  }
  void kosong;
}

/* --------------------------- Kelas 2 Bab 2: misi (Toko Seragam dan Alat Tulis Sekolah) --------------------------- */
{
  const kosong = new Set();
  // KERANGKA: agen Sub-Bab mengganti komentar BAGIAN-nya dengan ujinya (keadaan awal tidak memenuhi misi; ujiStruktur untuk sub-bab itu).
  // BAGIAN A (Kardus Kiriman: tugas di meja dua belas dan lima, empat belas dan enam, enam belas dan tiga; rincian di scripts/uji-gudang-k2b2a.mjs)
  {
    const GD = (o = {}) => ({ alat: "gudang", mode: "gabung", tugas: 0, digabung: [], posisi: 0, jalurTuntas: [], pecah: 0, pasanganTuntas: [], tabelTahap: 0, tabelTuntas: [], tukarTuntas: [], ...o });
    const dA = K2B2.daftarMisiK2Bab2("A");
    ujiStruktur("k2bab2", K2B2.daftarMisiK2Bab2, ["A"], { A: GD() });
    cek(dA === K2B2.MISI_A && dA.filter((m) => m.wajib).length === 4 && dA.filter((m) => !m.wajib).length === 2 && dA.every((m) => m.id.startsWith("a-")), "k2bab2 A: empat wajib, dua bebas, id berawalan a-");
    cek(dA.every((m) => !/\d/.test(m.teks) && !/\b(buku|teman|kelompok|kelas|skor|nilai|soal|tebak|kunci|latihan)\b/i.test(m.teks)), "k2bab2 A: teks misi tanpa digit dan kata terlarang");
    cek(dA.every((m) => !m.cek({ alat: "kerangka" })), "k2bab2 A: alat lain tidak memenuhi misi");
    const adaGD = (o, id) => M0.misiBaru(dA, GD(o), kosong).includes(id);
    cek(!adaGD({}, "a-gabung") && adaGD({ digabung: [0] }, "a-gabung"), "k2bab2 A: gabung dua kardus");
    cek(!adaGD({ posisi: 4 }, "a-jalur") && adaGD({ jalurTuntas: [0] }, "a-jalur"), "k2bab2 A: maju di jalur sampai berhenti di jumlahnya");
    cek(!adaGD({ pecah: 2 }, "a-pasangan") && adaGD({ pasanganTuntas: [0] }, "a-pasangan"), "k2bab2 A: pecah jadi pasangan sampai hasil");
    cek(!adaGD({ tabelTahap: 2 }, "a-tabel") && adaGD({ tabelTuntas: [1] }, "a-tabel"), "k2bab2 A: tabel puluhan dan satuan sampai hasil");
    cek(!adaGD({}, "a-tukar") && adaGD({ tukarTuntas: [1] }, "a-tukar"), "k2bab2 A: tukar sepuluh satuan (bebas)");
    cek(!adaGD({ jalurTuntas: [0], pasanganTuntas: [1] }, "a-sama") && adaGD({ jalurTuntas: [0, 1], pasanganTuntas: [1] }, "a-sama") && adaGD({ pasanganTuntas: [2], tabelTuntas: [2] }, "a-sama"), "k2bab2 A: satu kardus dengan dua cara berbeda (bebas)");
  }
  // BAGIAN B (Meja Stok: contoh stok delapan belas dan sebelas, enam belas dan tujuh, dua puluh dan enam, tiga belas dan tiga; rincian di scripts/uji-stok-k2b2b.mjs)
  {
    const SB = (o = {}) => ({ alat: "stok", mode: "pasang", a: 18, b: 11, pasang: 0, selisihDilihat: false, p: 1, s: 8, diambil: 0, dibuka: 0, kurangTuntas: 0, bukaTuntas: 0, periksaTuntas: 0, keluargaMask: 0, keluargaTuntas: false, sepuluhLangkah: 0, sepuluhTuntas: false, ...o });
    const dB = K2B2.daftarMisiK2Bab2("B");
    ujiStruktur("k2bab2", K2B2.daftarMisiK2Bab2, ["B"], { B: SB() });
    cek(dB === K2B2.MISI_B && dB.filter((m) => m.wajib).length === 4 && dB.filter((m) => !m.wajib).length === 2 && dB.every((m) => m.id.startsWith("b-")), "k2bab2 B: empat wajib, dua bebas, id berawalan b-");
    cek(dB.every((m) => !/\d/.test(m.teks) && !/\b(buku|teman|kelompok|kelas|skor|nilai|soal|tebak|kunci|latihan)\b/i.test(m.teks)), "k2bab2 B: teks misi tanpa digit dan kata terlarang");
    cek(dB.every((m) => !m.cek({ alat: "kerangka" }) && !m.cek({ alat: "gudang" }) && !m.cek({ alat: "pembukaan" })), "k2bab2 B: alat lain tidak memenuhi misi");
    const adaSB = (o, id) => M0.misiBaru(dB, SB(o), kosong).includes(id);
    cek(!adaSB({ pasang: 11 }, "b-pasang") && adaSB({ pasang: 11, selisihDilihat: true }, "b-pasang"), "k2bab2 B: pasangkan sampai semua berpasangan");
    cek(!adaSB({ diambil: 11 }, "b-kurang") && adaSB({ kurangTuntas: 1 }, "b-kurang"), "k2bab2 B: kurangi sampai kartu stok menunjukkan sisa");
    cek(!adaSB({ dibuka: 1 }, "b-buka") && adaSB({ bukaTuntas: 1 }, "b-buka"), "k2bab2 B: buka satu puluhan lalu selesaikan pengurangan");
    cek(!adaSB({ mode: "periksa" }, "b-periksa") && adaSB({ periksaTuntas: 1 }, "b-periksa"), "k2bab2 B: periksa dengan penjumlahan");
    cek(!adaSB({ keluargaMask: 7 }, "b-keluarga") && adaSB({ keluargaTuntas: true }, "b-keluarga") && !adaSB({ sepuluhLangkah: 1 }, "b-sepuluh") && adaSB({ sepuluhTuntas: true }, "b-sepuluh"), "k2bab2 B: tantangan bebas (keluarga bilangan, Kurangi dari Sepuluh)");
  }
  // BAGIAN C (Meja Pesanan Besar: kertas topi dan dasi 5 dan 8, tas dan kotak pensil 16 dan 9, baju dan topi 8 dan 5, gunting dan klip 14 dan 6, tiga bilangan 4, 9, 6, baju tinggal 6 setelah 8 diambil; rincian di scripts/uji-pembukaan-k2b2c.mjs)
  {
    const PB = (o = {}) => ({ alat: "pembukaan", mode: "kata", slip: 0, kataBenar: [], tandaSalah: 0, urut: [], langkahTuntas: 0, urutSalah: 0, tiga: [], tigaTuntas: 0, tigaMudah: false, awalTanda: null, awalTuntas: 0, buat: { kata: "lebihnya", a: 6, b: 3, benda: 0 }, buatTuntas: 0, kataBuat: [], ...o });
    const dC = K2B2.daftarMisiK2Bab2("C");
    ujiStruktur("k2bab2", K2B2.daftarMisiK2Bab2, ["C"], { C: PB() });
    cek(dC === K2B2.MISI_C && dC.filter((m) => m.wajib).length === 4 && dC.filter((m) => !m.wajib).length === 2 && dC.every((m) => m.id.startsWith("c-")), "k2bab2 C: empat wajib, dua bebas, id berawalan c-");
    cek(dC.every((m) => !/\d/.test(m.teks) && !/\b(buku|teman|kelompok|kelas|skor|nilai|soal|tebak|kunci|latihan)\b/i.test(m.teks)), "k2bab2 C: teks misi tanpa digit dan kata terlarang");
    cek(dC.every((m) => !m.cek({ alat: "kerangka" }) && !m.cek({ alat: "gudang" }) && !m.cek({ alat: "stok" })), "k2bab2 C: alat lain tidak memenuhi misi");
    const adaPB = (o, id) => M0.misiBaru(dC, PB(o), kosong).includes(id);
    cek(!adaPB({ kataBenar: ["jumlah"] }, "c-kata") && adaPB({ kataBenar: ["jumlah", "selisih"] }, "c-kata") && !adaPB({ tandaSalah: 3 }, "c-kata"), "k2bab2 C: dua kata petunjuk dipasangkan dengan tanda yang benar");
    cek(!adaPB({ urut: [0, 1, 2, 3] }, "c-langkah") && adaPB({ langkahTuntas: 1 }, "c-langkah"), "k2bab2 C: empat langkah cerita tersusun berurutan");
    cek(!adaPB({ tiga: [0, 2] }, "c-tiga") && adaPB({ tigaTuntas: 1 }, "c-tiga"), "k2bab2 C: tiga bilangan dijumlahkan");
    cek(!adaPB({ awalTanda: null }, "c-awal") && adaPB({ awalTuntas: 1 }, "c-awal"), "k2bab2 C: bilangan awal dengan membalik langkah");
    cek(!adaPB({ buat: { kata: "jumlah", a: 5, b: 6, benda: 2 } }, "c-buat") && adaPB({ buatTuntas: 1 }, "c-buat") && !adaPB({ kataBenar: ["jumlah", "selisih", "lebihnya"] }, "c-semua") && adaPB({ kataBenar: ["jumlah", "selisih", "lebihnya", "kurangnya"] }, "c-semua"), "k2bab2 C: tantangan bebas (cerita buatan sendiri, keempat kata petunjuk)");
  }
  void K2B2;
  void kosong;
}

/* --------------------------- Kelas 2 Bab 3: misi (Taman Bermain Sekolah) --------------------------- */
// Rincian misi tiap Sub-Bab diuji di scripts/uji-ubin-k2b3a.mjs, uji-puzzle-k2b3b.mjs, dan uji-gudang-k2b3c.mjs; di sini hanya struktur bersama.
{
  // Keadaan awal ditulis langsung (logika.ts folder memakai impor tanpa ekstensi; rinciannya diuji di skrip masing-masing).
  const awalSub = {
    A: { alat: "ubin", mode: "hitung", pilih: -1, langkah: 0, dihitung: [], namaDilihat: [], kuning: [], hijau: [], dipasang: [], salahHitung: 0, salahPilah: 0, salahPasang: 0 },
    B: { alat: "puzzle", mode: "urai", n: 5, garis: "pojok", uraiDilihat: [], kind: "x", terpasang: [], susunTuntas: [], tumpuk: 0, tangram: [], tangramPakai: [], tangramTuntas: false },
    C: { alat: "gudang", mode: "lereng", pilih: -1, lepas: [], lepasTotal: 0, guling: 0, diam: 0, rak: {}, rakSalah: 0, cetak: [], cetakLingkaran: false },
  };
  ujiStruktur("k2bab3", K2B3.daftarMisiK2Bab3, ["A", "B", "C"], awalSub);
  for (const [sub, daftar, awalan] of [["A", K2B3.MISI_A, "a-"], ["B", K2B3.MISI_B, "b-"], ["C", K2B3.MISI_C, "c-"]]) {
    cek(K2B3.daftarMisiK2Bab3(sub) === daftar && daftar.filter((m) => m.wajib).length === 4 && daftar.filter((m) => !m.wajib).length === 2 && daftar.every((m) => m.id.startsWith(awalan)), `k2bab3 ${sub}: empat wajib, dua bebas, id berawalan ${awalan}`);
    cek(daftar.every((m) => !/\d/.test(m.teks) && !/(buku|teman|kelompok|kelas|skor|nilai|soal|tebak|kunci|latihan)/i.test(m.teks)), `k2bab3 ${sub}: teks misi tanpa digit dan kata terlarang`);
    cek(daftar.every((m) => !m.cek({ alat: "kerangka" })), `k2bab3 ${sub}: alat lain tidak memenuhi misi`);
  }
}

/* --------------------------- Kelas 2 Bab 4: misi (Pameran Kerajinan Sekolah) --------------------------- */
// Rincian misi tiap Sub-Bab diuji di scripts/uji-rak-k2b4a.mjs dan uji-hias-k2b4b.mjs; di sini hanya struktur bersama.
{
  // BAGIAN A (Rak Pameran: payung kertas, topi anyaman, bunga kertas, keranjang, layang-layang, lonceng; rincian di scripts/uji-rak-k2b4a.mjs)
  const awalA = { alat: "rak", mode: "taruh", pilih: -1, terpasang: [], lawanLihat: [], baca: [], kananBenar: 0, kiriBenar: 0, gabung: [], salahTaruh: 0, salahBaca: 0, salahGabung: 0 };
  ujiStruktur("k2bab4", K2B4.daftarMisiK2Bab4, ["A"], { A: awalA });
  const dA = K2B4.daftarMisiK2Bab4("A");
  cek(dA === K2B4.MISI_A && dA.filter((m) => m.wajib).length === 4 && dA.filter((m) => !m.wajib).length === 2 && dA.every((m) => m.id.startsWith("a-")), "k2bab4 A: empat wajib, dua bebas, id berawalan a-");
  cek(dA.every((m) => !/\d/.test(m.teks) && !/(buku|teman|kelompok|kelas|skor|nilai|soal|tebak|kunci|latihan)/i.test(m.teks)), "k2bab4 A: teks misi tanpa digit dan kata terlarang");
  cek(dA.every((m) => !m.cek({ alat: "kerangka" })), "k2bab4 A: alat lain tidak memenuhi misi");
  const baruA = (o) => M0.misiBaru(dA, { ...awalA, ...o }, new Set());
  sama(baruA({ terpasang: [0, 1, 2] }), ["a-taruh"], "k2bab4 A: tiga karya ditaruh memenuhi a-taruh");
  sama(baruA({ lawanLihat: [1] }), ["a-lawan"], "k2bab4 A: kalimat lawan dilihat memenuhi a-lawan");
  sama(baruA({ kananBenar: 1 }), [], "k2bab4 A: kanan saja belum memenuhi a-kanankiri");
  sama(baruA({ kananBenar: 1, kiriBenar: 1 }), ["a-kanankiri"], "k2bab4 A: kanan dan kiri memenuhi a-kanankiri");
  sama(baruA({ gabung: [0] }), ["a-gabung"], "k2bab4 A: satu teka-teki memenuhi a-gabung");
  sama(baruA({ terpasang: [0, 1, 2, 3, 4, 5], gabung: [0, 1, 2] }), ["a-taruh", "a-gabung", "a-semua", "a-teka"], "k2bab4 A: semua karya dan semua teka-teki memenuhi tantangan bebas");
  cek(M0.misiBaru(dA, { ...awalA, salahTaruh: 9, salahBaca: 9, salahGabung: 9 }, new Set()).length === 0, "k2bab4 A: percobaan keliru tidak dihitung sebagai misi");
  // BAGIAN B (Meja Rangkai: pita manik ungu hijau kuning cokelat, irama keras pelan diam, enam kartu pita; rincian di scripts/uji-hias-k2b4b.mjs)
  // Keadaan awal ditulis langsung (logika.ts folder memakai impor tanpa ekstensi).
  const awalB = { alat: "meja", mode: "rangkai", rangkai: [], irama: [], polaPita: [], polaIrama: [], kartu: -1, diputuskan: [], satuanDitandai: [], dilanjut: [], salahPeriksa: 0 };
  ujiStruktur("k2bab4", K2B4.daftarMisiK2Bab4, ["B"], { B: awalB });
  const dB = K2B4.daftarMisiK2Bab4("B");
  cek(dB === K2B4.MISI_B && dB.filter((m) => m.wajib).length === 4 && dB.filter((m) => !m.wajib).length === 2 && dB.every((m) => m.id.startsWith("b-")), "k2bab4 B: empat wajib, dua bebas, id berawalan b-");
  cek(dB.every((m) => !/\d/.test(m.teks) && !/(buku|teman|kelompok|kelas|skor|nilai|soal|tebak|kunci|latihan)/i.test(m.teks)), "k2bab4 B: teks misi tanpa digit dan kata terlarang");
  cek(dB.every((m) => !m.cek({ alat: "kerangka" })), "k2bab4 B: alat lain tidak memenuhi misi");
  const baruB = (o) => M0.misiBaru(dB, { ...awalB, ...o }, new Set());
  cek(baruB({ polaPita: ["ungu-hijau"] }).join() === "b-rangkai" && baruB({ diputuskan: [0] }).length === 0 && baruB({ diputuskan: [0, 1] }).join() === "b-putus", "k2bab4 B: misi rangkai pita dan memutuskan dua kartu");
}

/* --------------------------- Kelas 2 Bab 5: misi (Kebun Sekolah) --------------------------- */
// Rincian misi tiap Sub-Bab diuji di scripts/uji-semangka-k2b5a.mjs, uji-bibit-k2b5b.mjs, dan uji-panen-k2b5c.mjs; di sini hanya struktur bersama.
{
  // BAGIAN A (Meja Bagi: jeruk bali, keju, sosis, nasi kepal; kertas persegi panjang, segitiga, lingkaran; dua gelas susu; rincian di scripts/uji-semangka-k2b5a.mjs)
  // Keadaan awal ditulis langsung (logika.ts folder memakai impor tanpa ekstensi).
  const awalA = { alat: "semangka", mode: "belah", benda: -1, garis: -1, dibelah: [], ditumpuk: [], kertas: -1, lipat: -1, lipatBenar: [], gelasA: 6, gelasB: 0, putaran: 0, tuangBenar: [], salahBelah: 0, salahLipat: 0, salahTuang: 0 };
  ujiStruktur("k2bab5", K2B5.daftarMisiK2Bab5, ["A"], { A: awalA });
  const dA = K2B5.daftarMisiK2Bab5("A");
  cek(dA === K2B5.MISI_A && dA.filter((m) => m.wajib).length === 4 && dA.filter((m) => !m.wajib).length === 2 && dA.every((m) => m.id.startsWith("a-")), "k2bab5 A: empat wajib, dua bebas, id berawalan a-");
  cek(dA.every((m) => !/\d/.test(m.teks) && !/(buku|teman|kelompok|kelas|skor|nilai|soal|tebak|kunci|latihan)/i.test(m.teks)), "k2bab5 A: teks misi tanpa digit dan kata terlarang");
  cek(dA.every((m) => !m.cek({ alat: "kerangka" })), "k2bab5 A: alat lain tidak memenuhi misi");
  const baruA = (o) => M0.misiBaru(dA, { ...awalA, ...o }, new Set());
  sama(baruA({ dibelah: [1] }), ["a-belah"], "k2bab5 A: satu benda dibelah memenuhi a-belah");
  sama(baruA({ dibelah: [1], ditumpuk: [1] }), ["a-belah", "a-tumpuk"], "k2bab5 A: ditumpuk memenuhi a-tumpuk");
  sama(baruA({ tuangBenar: [0] }), ["a-tuang"], "k2bab5 A: tuang sama tinggi memenuhi a-tuang");
  sama(baruA({ lipatBenar: ["0-0"] }), ["a-lipat"], "k2bab5 A: lipatan pas memenuhi a-lipat");
  sama(baruA({ dibelah: [0, 2], ditumpuk: [0], tuangBenar: [0], lipatBenar: ["0-0", "1-0"] }), ["a-belah", "a-tumpuk", "a-tuang", "a-lipat", "a-belahdua", "a-lipatdua"], "k2bab5 A: semua wajib dan bebas");
  cek(M0.misiBaru(dA, { ...awalA, salahBelah: 9, salahLipat: 9, salahTuang: 9 }, new Set()).length === 0, "k2bab5 A: percobaan keliru tidak dihitung sebagai misi");
  // BAGIAN B (Bedeng Bibit: tumpukan jagung, wortel, terong, apel, bunga; empat paket neraca; setengah dua sampai lima; rincian di scripts/uji-bibit-k2b5b.mjs)
  // Keadaan awal ditulis langsung (logika.ts folder memakai impor tanpa ekstensi).
  const awalB = { alat: "bibit", mode: "bagi", tumpuk: 0, sisa: 4, kiri: 0, kanan: 0, terakhir: -1, terbagi: [], ganjilSelesai: [], paket: 0, piringKiri: 6, piringKanan: 2, neracaSet: [], setengah: 0, digandakanSekarang: false, digandakan: [], salahCoba: 0 };
  ujiStruktur("k2bab5", K2B5.daftarMisiK2Bab5, ["B"], { B: awalB });
  const dB = K2B5.daftarMisiK2Bab5("B");
  cek(dB === K2B5.MISI_B && dB.filter((m) => m.wajib).length === 4 && dB.filter((m) => !m.wajib).length === 2 && dB.every((m) => m.id.startsWith("b-")), "k2bab5 B: empat wajib, dua bebas, id berawalan b-");
  cek(dB.every((m) => !/\d/.test(m.teks) && !/(buku|teman|kelompok|kelas|skor|nilai|soal|tebak|kunci|latihan)/i.test(m.teks)), "k2bab5 B: teks misi tanpa digit dan kata terlarang");
  cek(dB.every((m) => !m.cek({ alat: "kerangka" })), "k2bab5 B: alat lain tidak memenuhi misi");
  const baruB = (o) => M0.misiBaru(dB, { ...awalB, ...o }, new Set());
  sama(baruB({ terbagi: [0] }), ["b-bagi"], "k2bab5 B: satu tumpukan terbagi memenuhi b-bagi");
  sama(baruB({ ganjilSelesai: [2] }), ["b-ganjil"], "k2bab5 B: tumpukan ganjil memenuhi b-ganjil");
  sama(baruB({ neracaSet: [1] }), ["b-neraca"], "k2bab5 B: neraca seimbang memenuhi b-neraca");
  sama(baruB({ digandakan: [3] }), ["b-gandakan"], "k2bab5 B: setengah digandakan memenuhi b-gandakan");
  sama(baruB({ terbagi: [0, 1, 4], neracaSet: [0, 2] }), ["b-bagi", "b-neraca", "b-semua", "b-dua"], "k2bab5 B: tantangan bebas");
  cek(M0.misiBaru(dB, { ...awalB, salahCoba: 9 }, new Set()).length === 0, "k2bab5 B: percobaan keliru tidak dihitung sebagai misi");
  // BAGIAN C (Meja Panen: pai apel, kain taplak, pita warna; rincian di scripts/uji-panen-sim-k2b5c.mjs)
  // Keadaan awal ditulis langsung (logika.ts folder memakai impor tanpa ekstensi).
  const awalC = { alat: "panen", mode: "pai", paiGaris: [], paiSeperempat: 0, paiTidakSama: 0, kainGaris: [], kainSeperempat: 0, kainSegitiga: 0, kainPersegi: 0, kainTidakSama: 0, susun: [], bukti: [], salah: 0 };
  ujiStruktur("k2bab5", K2B5.daftarMisiK2Bab5, ["C"], { C: awalC });
  const dC = K2B5.daftarMisiK2Bab5("C");
  cek(dC === K2B5.MISI_C && dC.filter((m) => m.wajib).length === 4 && dC.filter((m) => !m.wajib).length === 2 && dC.every((m) => m.id.startsWith("c-")), "k2bab5 C: empat wajib, dua bebas, id berawalan c-");
  cek(dC.every((m) => !/\d/.test(m.teks) && !/(buku|teman|kelompok|kelas|skor|nilai|soal|tebak|kunci|latihan)/i.test(m.teks)), "k2bab5 C: teks misi tanpa digit dan kata terlarang");
  cek(dC.every((m) => !m.cek({ alat: "kerangka" })), "k2bab5 C: alat lain tidak memenuhi misi");
  const baruC = (o) => M0.misiBaru(dC, { ...awalC, ...o }, new Set());
  sama(baruC({ paiSeperempat: 1 }), ["c-pai"], "k2bab5 C: pai empat sama besar memenuhi c-pai");
  sama(baruC({ paiTidakSama: 1 }), ["c-miring"], "k2bab5 C: pai tidak sama memenuhi c-miring");
  sama(baruC({ kainSeperempat: 1 }), ["c-kain"], "k2bab5 C: kain empat sama besar memenuhi c-kain");
  sama(baruC({ bukti: ["2s=1t"] }), ["c-pita"], "k2bab5 C: dua seperempat sama dengan setengah memenuhi c-pita");
  sama(baruC({ bukti: ["4s=1u"], kainSegitiga: 1, kainSeperempat: 1 }), ["c-kain", "c-utuh", "c-segitiga"], "k2bab5 C: tantangan bebas");
  cek(M0.misiBaru(dC, { ...awalC, salah: 9, kainTidakSama: 9, mode: "dinding" }, new Set()).length === 0, "k2bab5 C: percobaan keliru tidak dihitung sebagai misi");
  void K2B5;
}

/* --------------------------- Kelas 2 Bab 6: misi (Hari Olahraga Sekolah) --------------------------- */
// Rincian misi tiap Sub-Bab diuji di scripts/uji-timbang-k2b6a.mjs dan uji-jadwal-k2b6b.mjs; di sini hanya struktur bersama.
{
  // KERANGKA: agen Sub-Bab mengganti komentar BAGIAN-nya dengan ujinya (keadaan awal tidak memenuhi misi; ujiStruktur untuk sub-bab itu).
  // BAGIAN A (Pos Timbang: layang-layang, bulu tangkis, yoyo, sarung tinju, batu curling; satuan dadu dan es batu; rincian di scripts/uji-timbang-k2b6a.mjs)
  // Keadaan awal ditulis langsung (logika.ts folder memakai impor tanpa ekstensi).
  {
    const awalA6 = { alat: "timbang", mode: "jungkat", kiri: -1, kanan: -1, dibandingkan: [], besarRingan: false, benda: -1, satuan: -1, jumlah: 0, seimbang: [], tabel: [], susunPilih: [], urutanBenar: 0, salahSusun: 0 };
    ujiStruktur("k2bab6", K2B6.daftarMisiK2Bab6, ["A"], { A: awalA6 });
    const dA6 = K2B6.daftarMisiK2Bab6("A");
    cek(dA6 === K2B6.MISI_A && dA6.filter((m) => m.wajib).length === 4 && dA6.filter((m) => !m.wajib).length === 2 && dA6.every((m) => m.id.startsWith("a-")), "k2bab6 A: empat wajib, dua bebas, id berawalan a-");
    cek(dA6.every((m) => !/\d/.test(m.teks) && !/(buku|teman|kelompok|kelas|skor|nilai|soal|tebak|kunci|latihan)/i.test(m.teks)), "k2bab6 A: teks misi tanpa digit dan kata terlarang");
    cek(dA6.every((m) => !m.cek({ alat: "kerangka" })), "k2bab6 A: alat lain tidak memenuhi misi");
    const baruA6 = (o) => M0.misiBaru(dA6, { ...awalA6, ...o }, new Set());
    sama(baruA6({ dibandingkan: ["0-3"] }), ["a-banding"], "k2bab6 A: satu pasangan ditimbang memenuhi a-banding");
    sama(baruA6({ dibandingkan: ["0-3"], besarRingan: true }), ["a-banding", "a-besar"], "k2bab6 A: benda besar yang ringan memenuhi a-besar");
    sama(baruA6({ seimbang: ["2-0"] }), ["a-satuan"], "k2bab6 A: seimbang memenuhi a-satuan");
    sama(baruA6({ urutanBenar: 1 }), ["a-susun"], "k2bab6 A: urutan benar memenuhi a-susun");
    sama(baruA6({ dibandingkan: ["0-1", "0-2", "0-3", "0-4", "1-2", "1-3"] }), ["a-banding", "a-pasang"], "k2bab6 A: enam pasangan memenuhi tantangan bebas");
    sama(baruA6({ tabel: ["2-0", "2-1"] }), ["a-dua"], "k2bab6 A: dua satuan untuk satu benda memenuhi tantangan bebas");
    sama(baruA6({ tabel: ["2-0", "3-1"] }), [], "k2bab6 A: dua satuan untuk dua benda berbeda belum memenuhi");
    cek(M0.misiBaru(dA6, { ...awalA6, salahSusun: 9, mode: "susun" }, new Set()).length === 0, "k2bab6 A: percobaan keliru tidak dihitung sebagai misi");
  }
  // BAGIAN B (Pos Waktu: putar jarum, samakan jam, kegiatan pada bagian hari, lama dua kegiatan, selisih jam; rincian di scripts/uji-jadwal-k2b6b.mjs)
  // Keadaan awal ditulis langsung (logika.ts folder memakai impor tanpa ekstensi).
  const awalB6 = { alat: "jadwal", mode: "jarum", h24: 12, jamPernah: [], jamSama: 12, samaIndeks: 0, sudahSama: [], hariPilih: null, hariBenar: [], lamaIndeks: 0, lamaBenar: [], selIndeks: 0, selKotak: 0, selBenar: [], salah: 0 };
  ujiStruktur("k2bab6", K2B6.daftarMisiK2Bab6, ["B"], { B: awalB6 });
  const dB6 = K2B6.daftarMisiK2Bab6("B");
  cek(dB6 === K2B6.MISI_B && dB6.filter((m) => m.wajib).length === 4 && dB6.filter((m) => !m.wajib).length === 2 && dB6.every((m) => m.id.startsWith("b-")), "k2bab6 B: empat wajib, dua bebas, id berawalan b-");
  cek(dB6.every((m) => !/\d/.test(m.teks) && !/(buku|teman|kelompok|kelas|skor|nilai|soal|tebak|kunci|latihan)/i.test(m.teks)), "k2bab6 B: teks misi tanpa digit dan kata terlarang");
  cek(dB6.every((m) => !m.cek({ alat: "kerangka" })), "k2bab6 B: alat lain tidak memenuhi misi");
  const baruB6 = (o) => M0.misiBaru(dB6, { ...awalB6, ...o }, new Set());
  sama(baruB6({ jamPernah: [3] }), ["b-jarum"], "k2bab6 B: jarum pendek di tiga memenuhi b-jarum");
  sama(baruB6({ jamPernah: [4, 5] }), [], "k2bab6 B: jam lain tidak memenuhi b-jarum");
  sama(baruB6({ sudahSama: [0] }), ["b-samakan"], "k2bab6 B: jam dinding sama dengan digital memenuhi b-samakan");
  sama(baruB6({ hariBenar: ["Istirahat"] }), ["b-hari"], "k2bab6 B: kegiatan di bagian hari tepat memenuhi b-hari");
  sama(baruB6({ lamaBenar: [1] }), ["b-lama"], "k2bab6 B: batang lebih panjang memenuhi b-lama");
  sama(baruB6({ selBenar: [0] }), ["b-selisih"], "k2bab6 B: selisih jam benar memenuhi b-selisih");
  sama(baruB6({ jamPernah: [3], sudahSama: [1], hariBenar: ["a", "b", "c", "d"], lamaBenar: [0], selBenar: [2] }), ["b-jarum", "b-samakan", "b-hari", "b-lama", "b-selisih", "b-semua"], "k2bab6 B: semua wajib dan bebas");
  cek(M0.misiBaru(dB6, { ...awalB6, salah: 9, hariPilih: "Istirahat", selKotak: 5, mode: "selisih", h24: 15, jamSama: 3, samaIndeks: 2, lamaIndeks: 7, selIndeks: 1 }, new Set()).length === 0, "k2bab6 B: percobaan keliru dan geseran tidak dihitung sebagai misi");
  void K2B6;
}

/* --------------------------- Kelas 2 Bab 7: misi (Bank Sampah Sekolah) --------------------------- */
// Rincian misi tiap Sub-Bab diuji di scripts/uji-ikat-k2b7a.mjs dan uji-papan-k2b7b.mjs; di sini hanya struktur bersama.
{
  // KERANGKA: agen Sub-Bab mengganti komentar BAGIAN-nya dengan ujinya (keadaan awal tidak memenuhi misi; ujiStruktur untuk sub-bab itu).
  // BAGIAN A (Gudang Ikat: kardus, tutup botol, kaus bekas; rincian di scripts/uji-ikat-k2b7a.mjs)
  // Keadaan awal ditulis langsung (logika.ts folder memakai impor tanpa ekstensi).
  {
    const awalA7 = { alat: "ikat", mode: "ikat", jenis: 0, diikat: [0, 0, 0], selesaiIkat: [], papanP: 0, papanS: 0, papanBenar: [], tulisP: -1, tulisS: -1, tulisBenar: [], terbalik: false, kira: [-1, -1, -1], kiraDekat: [], kiraTuntas: [], salah: 0 };
    ujiStruktur("k2bab7", K2B7.daftarMisiK2Bab7, ["A"], { A: awalA7 });
    const dA7 = K2B7.daftarMisiK2Bab7("A");
    cek(dA7 === K2B7.MISI_A && dA7.filter((m) => m.wajib).length === 4 && dA7.filter((m) => !m.wajib).length === 2 && dA7.every((m) => m.id.startsWith("a-")), "k2bab7 A: empat wajib, dua bebas, id berawalan a-");
    cek(dA7.every((m) => !/\d/.test(m.teks) && !/(buku|teman|kelompok|kelas|skor|nilai|soal|tebak|kunci|latihan)/i.test(m.teks)), "k2bab7 A: teks misi tanpa digit dan kata terlarang");
    cek(dA7.every((m) => !m.cek({ alat: "kerangka" })), "k2bab7 A: alat lain tidak memenuhi misi");
    const baruA7 = (o) => M0.misiBaru(dA7, { ...awalA7, ...o }, new Set());
    sama(baruA7({ selesaiIkat: [0] }), ["a-ikat"], "k2bab7 A: satu tumpukan selesai diikat memenuhi a-ikat");
    sama(baruA7({ papanBenar: [1] }), ["a-papan"], "k2bab7 A: papan benar memenuhi a-papan");
    sama(baruA7({ tulisBenar: [2] }), ["a-tulis"], "k2bab7 A: tulisan benar memenuhi a-tulis");
    sama(baruA7({ kiraTuntas: [0], kiraDekat: [0] }), ["a-kira"], "k2bab7 A: perkiraan terbukti memenuhi a-kira");
    sama(baruA7({ selesaiIkat: [0, 1, 2] }), ["a-ikat", "a-semua"], "k2bab7 A: tiga tumpukan selesai memenuhi tantangan bebas");
    sama(baruA7({ selesaiIkat: [0, 1] }), ["a-ikat"], "k2bab7 A: dua tumpukan belum memenuhi tantangan bebas");
    sama(baruA7({ terbalik: true }), ["a-tukar"], "k2bab7 A: angka tertukar memenuhi tantangan bebas");
    cek(M0.misiBaru(dA7, { ...awalA7, salah: 9, mode: "papan", jenis: 2, papanP: 4, papanS: 3, tulisP: 3, tulisS: 4, diikat: [1, 2, 3], kira: [30, -1, -1] }, new Set()).length === 0, "k2bab7 A: percobaan keliru dan geseran tidak dihitung sebagai misi");
  }
  // BAGIAN B (Papan Pengumuman: katak di tali, dua bilangan dengan kata, kartu bilangan, kartu angka; rincian di scripts/uji-papan-k2b7b.mjs)
  // Keadaan awal ditulis langsung (logika.ts folder memakai impor tanpa ekstensi).
  {
    const awalB7 = { alat: "papan", mode: "garis", garisIndeks: 0, pos: 15, garisBenar: [], mundurBenar: false, bandingIndeks: 0, bandingBenar: [], tandaSama: false, urutIndeks: 0, urutKetuk: [], urutBenar: [], kartuIndeks: 0, kartuPuluhan: null, kartuBenar: [], salah: 0 };
    ujiStruktur("k2bab7", K2B7.daftarMisiK2Bab7, ["B"], { B: awalB7 });
    const dB7 = K2B7.daftarMisiK2Bab7("B");
    cek(dB7 === K2B7.MISI_B && dB7.filter((m) => m.wajib).length === 4 && dB7.filter((m) => !m.wajib).length === 2 && dB7.every((m) => m.id.startsWith("b-")), "k2bab7 B: empat wajib, dua bebas, id berawalan b-");
    cek(dB7.every((m) => !/\d/.test(m.teks) && !/(buku|teman|kelompok|kelas|skor|nilai|soal|tebak|kunci|latihan)/i.test(m.teks)), "k2bab7 B: teks misi tanpa digit dan kata terlarang");
    cek(dB7.every((m) => !m.cek({ alat: "kerangka" })), "k2bab7 B: alat lain tidak memenuhi misi");
    const baruB7 = (o) => M0.misiBaru(dB7, { ...awalB7, ...o }, new Set());
    sama(baruB7({ garisBenar: [0] }), ["b-garis"], "k2bab7 B: katak tepat di tali memenuhi b-garis");
    sama(baruB7({ bandingBenar: [1] }), ["b-banding"], "k2bab7 B: kata tepat untuk dua bilangan memenuhi b-banding");
    sama(baruB7({ urutBenar: [0] }), ["b-urut"], "k2bab7 B: kartu bilangan berurutan memenuhi b-urut");
    sama(baruB7({ kartuBenar: [0] }), ["b-kartu"], "k2bab7 B: kartu angka tepat memenuhi b-kartu");
    sama(baruB7({ tandaSama: true }), ["b-sama"], "k2bab7 B: pasangan sama besar memenuhi tantangan bebas");
    sama(baruB7({ mundurBenar: true }), ["b-mundur"], "k2bab7 B: katak mundur tepat memenuhi tantangan bebas");
    sama(baruB7({ garisBenar: [1], bandingBenar: [0], urutBenar: [2], kartuBenar: [1], tandaSama: true, mundurBenar: true }), ["b-garis", "b-banding", "b-urut", "b-kartu", "b-sama", "b-mundur"], "k2bab7 B: semua wajib dan bebas");
    cek(M0.misiBaru(dB7, { ...awalB7, salah: 9, mode: "kartu", pos: 99, garisIndeks: 2, bandingIndeks: 3, urutIndeks: 1, urutKetuk: [0, 1], kartuIndeks: 2, kartuPuluhan: 3 }, new Set()).length === 0, "k2bab7 B: percobaan keliru dan geseran tidak dihitung sebagai misi");
  }
  void K2B7;
}

/* --------------------------- Kelas 2 Bab 8: misi (Pentas Seni Sekolah) --------------------------- */
// Rincian misi tiap Sub-Bab diuji di scripts/uji-turus-k2b8a.mjs dan uji-gambar-k2b8b.mjs; di sini hanya struktur bersama.
{
  // KERANGKA: agen Sub-Bab mengganti komentar BAGIAN-nya dengan ujinya (keadaan awal tidak memenuhi misi; ujiStruktur untuk sub-bab itu).
  // BAGIAN A (Meja Catat: lampu 7, kursi lipat 5, kabel 3, mikrofon 5; warna kostum sembilan jawaban; rincian di scripts/uji-turus-k2b8a.mjs)
  // Keadaan awal ditulis langsung (logika.ts folder memakai impor tanpa ekstensi).
  {
    const awalA8 = { alat: "catat", mode: "pilah", letak: Array(20).fill(-1), pilih: -1, pilahSelesai: false, jenis: 0, turus: [0, 0, 0, 0], turusBenar: [], tabel: [0, 0, 0, 0], tabelBenar: false, bacaMax: -1, bacaLebih: -1, bacaBenar: false, banding: [], samaTemu: false, dataKe: 0, dataGaris: [0, 0, 0], dataSelesai: false, salah: 0 };
    ujiStruktur("k2bab8", K2B8.daftarMisiK2Bab8, ["A"], { A: awalA8 });
    const dA8 = K2B8.daftarMisiK2Bab8("A");
    cek(dA8 === K2B8.MISI_A && dA8.filter((m) => m.wajib).length === 4 && dA8.filter((m) => !m.wajib).length === 2 && dA8.every((m) => m.id.startsWith("a-")), "k2bab8 A: empat wajib, dua bebas, id berawalan a-");
    cek(dA8.every((m) => !/\d/.test(m.teks) && !/(buku|teman|kelompok|kelas|skor|nilai|soal|tebak|kunci|latihan)/i.test(m.teks)), "k2bab8 A: teks misi tanpa digit dan kata terlarang");
    cek(dA8.every((m) => !m.cek({ alat: "kerangka" })), "k2bab8 A: alat lain tidak memenuhi misi");
    const baruA8 = (o) => M0.misiBaru(dA8, { ...awalA8, ...o }, new Set());
    sama(baruA8({ pilahSelesai: true }), ["a-pilah"], "k2bab8 A: tumpukan terpilah semua memenuhi a-pilah");
    sama(baruA8({ turusBenar: [0, 2] }), ["a-turus"], "k2bab8 A: dua turus tepat memenuhi a-turus");
    sama(baruA8({ turusBenar: [1] }), [], "k2bab8 A: satu turus tepat belum memenuhi a-turus");
    sama(baruA8({ tabelBenar: true }), ["a-tabel"], "k2bab8 A: tabel benar memenuhi a-tabel");
    sama(baruA8({ bacaBenar: true }), ["a-baca"], "k2bab8 A: bacaan benar memenuhi a-baca");
    sama(baruA8({ dataSelesai: true }), ["a-data"], "k2bab8 A: data selesai dicatat memenuhi tantangan bebas");
    sama(baruA8({ samaTemu: true }), ["a-sama"], "k2bab8 A: dua jenis sama banyak memenuhi tantangan bebas");
    cek(M0.misiBaru(dA8, { ...awalA8, salah: 9, mode: "turus", jenis: 2, pilih: 3, turus: [4, 1, 2, 0], tabel: [7, 5, 3, 5], bacaMax: 0, bacaLebih: 3, banding: [0, 1], dataKe: 4, dataGaris: [2, 1, 1] }, new Set()).length === 0, "k2bab8 A: percobaan keliru dan isian yang belum diperiksa tidak dihitung sebagai misi");
  }
  // BAGIAN B (Papan Layar: tempel lambang pada tabel camilan, balon, kursi; judul dan keterangan; banding dua baris; jumlah baris; rincian di scripts/uji-gambar-k2b8b.mjs)
  // Keadaan awal ditulis langsung (logika.ts folder memakai impor tanpa ekstensi).
  {
    const awalB8 = { alat: "layar", mode: "tempel", tempelIndeks: 0, tempel: [0, 0, 0], lambang: "bintang", lambangGanti: false, tempelBenar: [], judulIndeks: 0, judulPilih: null, ketPilih: null, judulBenar: [], bandingIndeks: 0, bandingKata: null, bandingSelisih: 0, bandingBenar: [], jumlahIndeks: 0, jumlahPilih: 0, jumlahBenar: [], salah: 0 };
    ujiStruktur("k2bab8", K2B8.daftarMisiK2Bab8, ["B"], { B: awalB8 });
    const dB8 = K2B8.daftarMisiK2Bab8("B");
    cek(dB8 === K2B8.MISI_B && dB8.filter((m) => m.wajib).length === 4 && dB8.filter((m) => !m.wajib).length === 2 && dB8.every((m) => m.id.startsWith("b-")), "k2bab8 B: empat wajib, dua bebas, id berawalan b-");
    cek(dB8.every((m) => !/\d/.test(m.teks) && !/(buku|teman|kelompok|kelas|skor|nilai|soal|tebak|kunci|latihan)/i.test(m.teks)), "k2bab8 B: teks misi tanpa digit dan kata terlarang");
    cek(dB8.every((m) => !m.cek({ alat: "kerangka" })), "k2bab8 B: alat lain tidak memenuhi misi");
    const baruB8 = (o) => M0.misiBaru(dB8, { ...awalB8, ...o }, new Set());
    sama(baruB8({ tempelBenar: [0] }), ["b-tempel"], "k2bab8 B: tabel tempel sesuai memenuhi b-tempel");
    sama(baruB8({ judulBenar: [1] }), ["b-judul"], "k2bab8 B: judul dan keterangan tepat memenuhi b-judul");
    sama(baruB8({ bandingBenar: [0] }), ["b-banding"], "k2bab8 B: kata dan lebihnya tepat memenuhi b-banding");
    sama(baruB8({ jumlahBenar: [2] }), ["b-jumlah"], "k2bab8 B: jumlah tepat memenuhi b-jumlah");
    sama(baruB8({ lambangGanti: true }), ["b-ganti"], "k2bab8 B: lambang diganti memenuhi tantangan bebas");
    sama(baruB8({ tempelBenar: [0, 1] }), ["b-tempel"], "k2bab8 B: dua tabel belum memenuhi tantangan lengkap");
    sama(baruB8({ tempelBenar: [0, 1, 2] }), ["b-tempel", "b-lengkap"], "k2bab8 B: tiga tabel memenuhi tantangan lengkap");
    cek(M0.misiBaru(dB8, { ...awalB8, salah: 9, mode: "jumlah", tempel: [3, 4, 5], tempelIndeks: 2, judulIndeks: 1, judulPilih: 1, ketPilih: 2, bandingIndeks: 2, bandingKata: "sama", bandingSelisih: 4, jumlahIndeks: 1, jumlahPilih: 12 }, new Set()).length === 0, "k2bab8 B: percobaan keliru dan isian yang belum diperiksa tidak dihitung sebagai misi");
  }
  void K2B8;
}

console.log(gagal === 0 ? `SEMUA LULUS (${lulus} cek)` : `GAGAL ${gagal} dari ${lulus + gagal}`);
process.exit(gagal === 0 ? 0 : 1);
