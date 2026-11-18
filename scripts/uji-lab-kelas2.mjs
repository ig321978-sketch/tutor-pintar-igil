// Uji misi hibrida Matematika Kelas 2 (mulai Bab 1).
// Jalankan: node --no-warnings scripts/uji-lab-kelas2.mjs
import * as M0 from "../src/components/modul/misi-simulasi.ts";
import * as K2B1 from "../src/components/modul/misi-k2bab1.ts";
import * as K2B2 from "../src/components/modul/misi-k2bab2.ts";
import * as K2B3 from "../src/components/modul/misi-k2bab3.ts";
import * as K2B4 from "../src/components/modul/misi-k2bab4.ts";
import * as LPo from "../src/components/modul/lab-posisi-k2b4.ts";
import * as LPe from "../src/components/modul/lab-petunjuk-k2b4.ts";
import * as LPb from "../src/components/modul/lab-pabrik-k2b4.ts";

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

/* ---------------- Kelas 2 Bab 4: posisi benda (A) dan pola (B) ---------------- */
{
  const kosong = new Set();
  const SEL = (id) => ({ alat: "selesai", id });
  // Keadaan dibangun dari lab yang sebenarnya, bukan ditulis tangan.
  const Po = (o) => ({ alat: "posisi", acuan: LPo.AWAL_ACUAN, benda: LPo.AWAL_BENDA, kata: null, lawan: false, peta: false, anak: false, tabel: false, sudah: [], ...o });
  const Pet = (papan, mode, target, daftar) => ({ alat: "petunjuk", papan, mode, target, petunjuk: daftar.length, sisa: LPe.kandidat(papan, mode, daftar).length });
  const Pab = (atur, o = {}) => {
    const a = LPb.rapikanPabrik(atur);
    const st = LPb.statusPabrik(a.satuan, a.ulang);
    return { alat: "pabrik", jenis: a.jenis, n: a.satuan.length, kodeSatuan: st.kodeSatuan, ulang: a.ulang, terpendek: st.terpendek, pola: st.pola, kode: true, tanda: false, lanjut: false, didengar: false, ...o };
  };

  const awalPosisi = Po({});
  const awalPetunjuk = Pet("kamar", "mana", null, []);
  const awalPabrik = Pab(LPb.awalPabrik());
  sama(awalPetunjuk.sisa, 9, "k2bab4: awal petunjuk 9 benda cocok");

  // Struktur untuk dua sub-bab, dengan keadaan awal tiap alat.
  ujiStruktur("k2bab4", K2B4.daftarMisiK2Bab4, ["A", "B"], { A: awalPosisi, B: awalPabrik });
  for (const sub of ["A", "B"]) {
    for (const [nama, awal] of [["lab posisi", awalPosisi], ["lab petunjuk", awalPetunjuk], ["pabrik pola", awalPabrik]]) {
      cek(M0.misiBaru(K2B4.daftarMisiK2Bab4(sub), awal, kosong).length === 0, `k2bab4 ${sub}: awal ${nama} tidak memenuhi misi`);
    }
  }
  cek(K2B4.daftarMisiK2Bab4("A") === K2B4.MISI_A && K2B4.daftarMisiK2Bab4("B") === K2B4.MISI_B && K2B4.daftarMisiK2Bab4("Z") === K2B4.MISI_A, "k2bab4: daftar per sub-bab");
  const ada = (sub, k, id) => M0.misiBaru(K2B4.daftarMisiK2Bab4(sub), k, kosong).includes(id);

  // Alat awal sah menurut lab.
  sama([awalPabrik.kodeSatuan, awalPabrik.n, awalPabrik.didengar, awalPabrik.lanjut], ["AB", 2, false, false], "k2bab4: awal pabrik netral");

  // ---------------- Sub-Bab A: Lab Posisi ----------------
  cek(ada("A", Po({ kata: "atas", lawan: true }), "a-atas") && !ada("A", Po({ kata: "atas" }), "a-atas") && !ada("A", Po({ kata: "bawah", lawan: true }), "a-atas"), "k2bab4 A: atas butuh Lawan");
  cek(ada("A", Po({ kata: "depan", lawan: true }), "a-depan") && !ada("A", Po({ kata: "depan" }), "a-depan") && !ada("A", Po({ kata: "belakang", lawan: true }), "a-depan"), "k2bab4 A: depan butuh Lawan");
  cek(ada("A", Po({ kata: "kanan", anak: true }), "a-kanan") && !ada("A", Po({ kata: "kanan" }), "a-kanan") && !ada("A", Po({ kata: "kiri", anak: true }), "a-kanan"), "k2bab4 A: kanan butuh Anak");
  cek(ada("A", Po({ kata: "kiri", peta: true }), "a-peta") && !ada("A", Po({ kata: "kiri" }), "a-peta") && !ada("A", Po({ kata: "kanan", peta: true }), "a-peta"), "k2bab4 A: peta kotak, kiri");
  cek(ada("A", Po({ kata: "atas", sudah: LPo.URUT_KATA }), "a-enam") && !ada("A", Po({ kata: "atas", sudah: LPo.URUT_KATA.slice(0, 5) }), "a-enam"), "k2bab4 A: enam kata dicoba");
  cek(!ada("A", Po({ kata: "atas" }), "a-enam") && !ada("A", Po({}), "a-enam"), "k2bab4 A: satu kata bukan enam");
  // Ganti benda dan acuan tidak mengubah misi (misi tentang kata posisi, bukan benda tertentu).
  for (const acuan of LPo.URUT_ACUAN) for (const benda of LPo.URUT_BENDA) cek(ada("A", Po({ acuan, benda, kata: "atas", lawan: true }), "a-atas"), `k2bab4 A: atas lawan dengan ${benda} dan ${acuan}`);
  cek(LPo.URUT_KATA.every((k) => !ada("A", Po({ kata: k }), "a-atas") && !ada("A", Po({ kata: k }), "a-depan") && !ada("A", Po({ kata: k }), "a-kanan") && !ada("A", Po({ kata: k }), "a-peta")), "k2bab4 A: tanpa pengatur tidak ada misi posisi tercapai");

  // ---------------- Sub-Bab A: Lab Petunjuk Ganda ----------------
  const satu = [{ kata: "atas", acuan: "boneka" }];
  const duaJam = [{ kata: "atas", acuan: "boneka" }, { kata: "kiri", acuan: "buku" }];
  cek(ada("A", Pet("kamar", "mana", "jam", satu), "a-satu") && Pet("kamar", "mana", "jam", satu).sisa === 3, "k2bab4 A: satu petunjuk menyisakan banyak benda");
  cek(!ada("A", Pet("kamar", "mana", "jam", duaJam), "a-satu") && !ada("A", Pet("kamar", "mana", null, []), "a-satu") && !ada("A", Pet("kamar", "tepat", "kotak", [{ kata: "atas", acuan: "bola" }]), "a-satu"), "k2bab4 A: a-satu tidak tercapai oleh dua petunjuk, tanpa petunjuk, atau cara Tepat (sisa 1)");
  cek(ada("A", Pet("kamar", "mana", "jam", duaJam), "a-dua") && Pet("kamar", "mana", "jam", duaJam).sisa === 1, "k2bab4 A: dua petunjuk menyisakan satu");
  cek(!ada("A", Pet("kamar", "mana", "jam", satu), "a-dua"), "k2bab4 A: satu petunjuk belum cukup untuk a-dua");
  cek(!ada("A", Pet("kamar", "tepat", "kotak", [{ kata: "atas", acuan: "bola" }, { kata: "kiri", acuan: "pensil" }]), "a-dua"), "k2bab4 A: a-dua butuh cara Di mana saja");
  const tengah4 = [{ kata: "atas", acuan: "bola" }, { kata: "bawah", acuan: "buku" }, { kata: "kanan", acuan: "boneka" }, { kata: "kiri", acuan: "pensil" }];
  cek(ada("A", Pet("kamar", "mana", "kotak", tengah4), "a-dua"), "k2bab4 A: empat petunjuk untuk benda tengah menyisakan satu");
  cek(ada("A", Pet("kamar", "tepat", "kotak", [{ kata: "atas", acuan: "bola" }]), "a-tepat") && !ada("A", Pet("kamar", "mana", "kotak", [{ kata: "atas", acuan: "bola" }]), "a-tepat") && !ada("A", Pet("kamar", "tepat", "kotak", []), "a-tepat"), "k2bab4 A: cara Tepat satu petunjuk cukup");
  const tamanJauh = [{ kata: "atas", acuan: "rumput" }, { kata: "kiri", acuan: "burung" }];
  cek(ada("A", Pet("taman", "mana", "kupu", tamanJauh), "a-taman") && !ada("A", Pet("kamar", "mana", "jam", duaJam), "a-taman") && !ada("A", Pet("taman", "mana", "kupu", [tamanJauh[0]]), "a-taman"), "k2bab4 A: papan taman dengan dua petunjuk");

  // Alat tidak saling mencampuri.
  cek(K2B4.MISI_A.every((m) => !m.cek(awalPabrik) && !m.cek(Pab(LPb.awalPabrik(), { lanjut: true }))), "k2bab4 A: misi A tidak memakai Pabrik Pola");
  cek(K2B4.MISI_B.every((m) => !m.cek(Po({ kata: "atas", lawan: true, anak: true, peta: true })) && !m.cek(Pet("kamar", "mana", "jam", duaJam))), "k2bab4 B: misi B tidak memakai alat Sub-Bab A");

  // ---------------- Skenario dan mesin ----------------
  cek(ada("A", SEL("sawah"), "a-sawah") && !ada("A", SEL("pesta-pola"), "a-sawah") && !ada("A", SEL("mesin-pola"), "a-sawah"), "k2bab4 A: skenario Panen di Sawah Paman");
  cek(ada("B", SEL("pesta-pola"), "b-pesta") && !ada("B", SEL("sawah"), "b-pesta") && !ada("B", SEL("mesin-pola"), "b-pesta"), "k2bab4 B: skenario Pesta Pola");
  cek(ada("B", SEL("mesin-pola"), "b-mesin") && !ada("B", SEL("pesta-pola"), "b-mesin") && !ada("B", SEL("sawah"), "b-mesin"), "k2bab4 B: mesin tiga pemeriksaan");

  // ---------------- Sub-Bab B: Pabrik Pola ----------------
  cek(ada("B", Pab({ jenis: "warna", satuan: ["merah", "merah", "biru"], ulang: 3 }), "b-aab") && ada("B", Pab({ jenis: "bentuk", satuan: ["segitiga", "segitiga", "persegi"], ulang: 5 }), "b-aab"), "k2bab4 B: A A B pada warna dan bentuk");
  cek(!ada("B", Pab({ jenis: "warna", satuan: ["merah", "merah", "biru"], ulang: 2 }), "b-aab") && !ada("B", Pab({ jenis: "warna", satuan: ["merah", "biru", "merah"], ulang: 3 }), "b-aab") && !ada("B", Pab(LPb.awalPabrik()), "b-aab"), "k2bab4 B: A A B butuh ulang tiga kali dan kode yang tepat");
  cek(ada("B", Pab({ jenis: "warna", satuan: ["merah", "merah"], ulang: 3 }), "b-bukan") && ada("B", Pab({ jenis: "bentuk", satuan: ["persegi", "persegi", "persegi"], ulang: 3 }), "b-bukan"), "k2bab4 B: unsur sama saja bukan pola");
  cek(!ada("B", Pab({ jenis: "warna", satuan: ["merah"], ulang: 3 }), "b-bukan") && !ada("B", Pab(LPb.awalPabrik()), "b-bukan") && !ada("B", Pab({ jenis: "warna", satuan: ["merah", "merah", "biru"], ulang: 3 }), "b-bukan"), "k2bab4 B: satu unsur atau pola sungguhan bukan b-bukan");
  cek(ada("B", Pab({ jenis: "warna", satuan: ["merah", "biru", "merah", "biru"], ulang: 2 }), "b-pendek") && ada("B", Pab({ jenis: "gerakan", satuan: ["berdiri", "tanganNaik", "berdiri", "tanganNaik"], ulang: 3 }), "b-pendek"), "k2bab4 B: satuan empat unsur, terpendek dua");
  cek(!ada("B", Pab({ jenis: "warna", satuan: ["merah", "biru", "kuning", "merah"], ulang: 2 }), "b-pendek") && !ada("B", Pab({ jenis: "warna", satuan: ["merah", "merah", "biru", "biru"], ulang: 2 }), "b-pendek") && !ada("B", Pab(LPb.awalPabrik()), "b-pendek"), "k2bab4 B: terpendek dua butuh kode A B A B");
  const suara = { jenis: "suara", satuan: ["keras", "pelan", "diam"], ulang: 3 };
  cek(ada("B", Pab(suara, { didengar: true }), "b-suara") && !ada("B", Pab(suara), "b-suara") && !ada("B", Pab({ jenis: "warna", satuan: ["merah", "biru", "kuning"], ulang: 3 }, { didengar: true }), "b-suara") && !ada("B", Pab({ jenis: "suara", satuan: ["keras", "pelan"], ulang: 3 }, { didengar: true }), "b-suara"), "k2bab4 B: suara harus didengarkan, tiga unsur");
  cek(ada("B", Pab({ jenis: "bentuk", satuan: ["lingkaran", "persegi", "segitiga"], ulang: 3 }), "b-bentuk") && !ada("B", Pab({ jenis: "warna", satuan: ["merah", "biru", "kuning"], ulang: 3 }), "b-bentuk") && !ada("B", Pab({ jenis: "bentuk", satuan: ["lingkaran", "persegi"], ulang: 3 }), "b-bentuk"), "k2bab4 B: tiga bentuk berbeda");
  cek(ada("B", Pab(LPb.awalPabrik(), { lanjut: true }), "b-lanjut") && !ada("B", Pab(LPb.awalPabrik()), "b-lanjut") && !ada("B", Pab({ jenis: "warna", satuan: ["merah", "merah"], ulang: 3 }, { lanjut: true }), "b-lanjut"), "k2bab4 B: lanjutan hanya berarti pada pola");
  cek(ada("B", Pab({ jenis: "gerakan", satuan: ["berdiri", "tanganNaik"], ulang: 3 }), "b-gerak") && !ada("B", Pab(LPb.awalPabrik()), "b-gerak") && !ada("B", Pab({ jenis: "gerakan", satuan: ["berdiri", "berdiri"], ulang: 3 }), "b-gerak"), "k2bab4 B: pola gerakan");

  // Setiap misi wajib Sub-Bab B tercapai dari susunan yang memang bisa dibuat lab (palet dan batas).
  for (const m of K2B4.MISI_B.filter((x) => x.wajib && !x.id.startsWith("b-mesin") && !x.id.startsWith("b-pesta"))) {
    let bisa = false;
    for (const j of LPb.URUT_JENIS) {
      const palet = LPb.PALET[j];
      const bangun = (n, dasar) => (n === 0 ? [dasar] : palet.flatMap((t) => bangun(n - 1, [...dasar, t])));
      for (let n = 1; n <= 4; n += 1)
        for (const satuan of bangun(n, []))
          for (let u = LPb.MIN_ULANG; u <= LPb.maksUlang(n); u += 1) if (m.cek(Pab({ jenis: j, satuan, ulang: u }, { didengar: true }))) bisa = true;
    }
    cek(bisa, `k2bab4 B: misi ${m.id} bisa dicapai di lab`);
  }
  // Setiap misi wajib Sub-Bab A (petunjuk dan posisi) bisa dicapai dari lab sebenarnya.
  {
    let dua = false;
    let satuOk = false;
    for (const papan of LPe.URUT_PAPAN) {
      const semuaQ = [];
      for (const acuan of LPe.semuaNama(papan)) for (const kata of LPe.URUT_ARAH) semuaQ.push({ kata, acuan });
      for (const target of LPe.semuaNama(papan)) {
        const benar = semuaQ.filter((q) => LPe.kandidat(papan, "mana", [q]).includes(target));
        for (const q of benar) if (M0.misiBaru(K2B4.MISI_A, Pet(papan, "mana", target, [q]), kosong).includes("a-satu")) satuOk = true;
        for (const q1 of benar) for (const q2 of benar) if (q1 !== q2 && M0.misiBaru(K2B4.MISI_A, Pet(papan, "mana", target, [q1, q2]), kosong).includes("a-dua")) dua = true;
      }
    }
    cek(satuOk && dua, "k2bab4 A: a-satu dan a-dua bisa dicapai di lab petunjuk");
  }
}

console.log(gagal === 0 ? `SEMUA LULUS (${lulus} cek)` : `GAGAL ${gagal} dari ${lulus + gagal}`);
process.exit(gagal === 0 ? 0 : 1);
