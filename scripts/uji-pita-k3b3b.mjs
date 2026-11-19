// Uji Mind-map (Gulungan Pita), Infografis (Tabel Pita), Simulasi Bengkel Pita, dan tahap Concrete, Pictorial, Abstract Kelas 3 Bab 3 Sub-Bab B ("Pita Pak Wayan"),
// hubungan sentimeter dan meter, Kebun Binatang Mini.
// Memeriksa: logika simulasi (tukar, ubah, gabung, sambung, banding), misi (awal tidak memenuhi, wajib empat, bebas dua),
// gulungan pita (sembilan kartu geser Masalah, Cara, Hasil memuat semua metode Story), tabel pita dari kejadian Story, CPA dua belas langkah per tahap (Klik, Kanvas, Suara x empat metode)
// dengan jawaban beragam dan Cari kesalahan di tiap tahap, kunci dihitung dari data, angka jawaban tidak kembar per tahap, tugas yang langsung siap (jebakan tombol macet), pengenal ucapan,
// petunjuk salah, batas rupa, emoji, kata terlarang, akhir baris, jembatan ke Sub-Bab C.
// Jalankan: node --no-warnings scripts/uji-pita-k3b3b.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/pita-k3b3b/logika.ts");
const DS = await import("../src/components/modul/pita-k3b3b/data-sim.ts");
const DK = await import("../src/components/modul/pita-k3b3b/data-kartu.ts");
const LC = await import("../src/components/modul/pita-k3b3b/logika-cpa.ts");
const D = await import("../src/components/modul/pita-k3b3b/data.ts");
const K = await import("../src/components/modul/pita-k3b3b/periksa.ts");
const S = await import("../src/components/modul/misi-simulasi.ts");
const MK = await import("../src/components/modul/misi-k3bab3.ts");
const MT = await import("../src/components/modul/misi-teks-k3b3.ts");
const folderUrl = new URL("../src/components/modul/pita-k3b3b/", import.meta.url);

let lulus = 0;
let gagal = 0;
const cek = (k, p) => {
  if (k) lulus += 1;
  else {
    gagal += 1;
    console.log("GAGAL:", p);
  }
};
const sama = (a, b, p) => cek(JSON.stringify(a) === JSON.stringify(b), `${p}: ${JSON.stringify(a)} != ${JSON.stringify(b)}`);
const TERLARANG = /\b(kelas|buku|teman|kelompok|dikelompokkan|mengelompokkan|skor|nilai|bernilai|soal|tebak|tebakan|kunci|latihan)\b/i;
const tanpaDigit = (t) => !/\d/.test(t);
const bersih = (t) => !TERLARANG.test(t) && !/buku|kelompok|bernilai|tebak|nilai|kelas|teman|skor|soal|kunci|latihan/i.test(t);
const emojiSah = (s) => [...s].every((c) => c.codePointAt(0) <= 0x1fa95 && c.codePointAt(0) !== 0x200d && c.codePointAt(0) !== 0x1f6de);
const adaEmoji = (s) => /\p{Extended_Pictographic}/u.test(s);
/** Bagian ukuran sentimeter yang dipakai Story B (tidak boleh dipakai sebagai data CPA dan Simulasi). Banyak meter bulat boleh sama (ruang satu sampai sembilan sempit). */
const CERITA = new Set([20, 22, 30, 35, 40, 50, 75, 80, 122, 150, 220, 230, 380, 430, 435, 650, 740, 1175]);

/* ------------------------------ Kata bilangan ------------------------------ */
{
  sama([0, 1, 9, 10, 11, 15, 20, 38, 100, 101, 110, 205, 316, 999].map(LC.kataBil), ["nol", "satu", "sembilan", "sepuluh", "sebelas", "lima belas", "dua puluh", "tiga puluh delapan", "seratus", "seratus satu", "seratus sepuluh", "dua ratus lima", "tiga ratus enam belas", "sembilan ratus sembilan puluh sembilan"], "kata bilangan CPA");
  cek(LC.kata === LC.kataBil, "alias kata");
  for (let n = 1; n <= 999; n += 1) cek(tanpaDigit(LC.kataBil(n)) && LC.kataBil(n) === L.kata(n), `kata bilangan ${n} sama di simulasi dan CPA`);
  sama([LC.labelBil(600, "cm"), LC.labelBil(6, "m"), LC.labelBil(3, ""), LC.kataBilSatuan(600, "cm"), LC.kataBilSatuan(6, "m"), LC.kataBilSatuan(3, "")], ["600 cm", "6 m", "3", "enam ratus sentimeter", "enam meter", "tiga"], "label dan kata ukuran");
  sama([LC.labelUkuran(308, true), LC.labelUkuran(300, true), LC.labelUkuran(372, false), LC.labelMc(2, 60), LC.labelMc(3, 0)], ["3 m 8 cm", "3 m", "372 cm", "2 m 60 cm", "3 m"], "label ukuran meter dan sentimeter");
  sama([LC.kataMc(2, 60), LC.kataMc(3, 0), L.kataUkuran(4, 55)], ["dua meter enam puluh sentimeter", "tiga meter", "empat meter lima puluh lima sentimeter"], "kata ukuran");
  sama([LC.totalCm(2, 60), LC.ratusan(345), LC.puluhan(345), LC.satuan(345)], [260, 3, 4, 5], "total dan digit");
}

/* ------------------------------ Simulasi: data dan logika ------------------------------ */
{
  cek(DS.TARGET_TUKAR.length === 3 && DS.TARGET_TUKAR.every((t) => t.awal.length === 3 && t.awal.every((x) => x >= 0) && !L.sudahDitukar(t.awal) && L.jumlahPotongan(t.awal) <= 999 && !CERITA.has(L.jumlahPotongan(t.awal))), "simulasi: tiga tumpukan potongan yang masih bisa ditukar, ukuran berbeda dari Story");
  cek(DS.TARGET_UBAH.length === 3 && DS.TARGET_UBAH.every((t) => t.m >= 1 && t.m <= 9 && t.c >= 0 && t.c <= 99 && !CERITA.has(t.c) && (t.arah === "ke-cm" || t.c === 0)) && DS.TARGET_UBAH.some((t) => t.arah === "ke-m") && DS.TARGET_UBAH.some((t) => t.arah === "ke-cm"), "simulasi: tiga ukuran ubah, dua arah, ukuran berbeda dari Story");
  cek(DS.TARGET_GABUNG.length === 3 && DS.TARGET_GABUNG.every((t) => t.total >= 101 && t.total <= 999 && t.total % 100 >= 11 && !CERITA.has(t.total) && !CERITA.has(t.total % 100)), "simulasi: tiga ukuran gabung, sentimeter sisa dua angka, berbeda dari Story");
  cek(DS.TARGET_SAMBUNG.length === 3 && DS.TARGET_SAMBUNG.every((t) => !CERITA.has(t.a[1]) && !CERITA.has(t.b[1]) && t.a[0] * 100 + t.a[1] <= 999), "simulasi: tiga pita sambung atau potong, berbeda dari Story");
  cek(DS.TARGET_SAMBUNG.some((t) => t.op === "tambah" && t.a[1] + t.b[1] >= 100) && DS.TARGET_SAMBUNG.some((t) => t.op === "kurang" && t.a[1] < t.b[1]), "simulasi: ada yang harus ditukar dan ada yang harus meminjam");
  cek(DS.TARGET_BANDING.length === 3 && DS.TARGET_BANDING.every((t) => new Set(t.ukuran).size === 3 && t.bentuk.some((b) => b) && t.ukuran.every((u) => u >= 101 && u <= 999 && !CERITA.has(u))), "simulasi: tiga kumpulan tiga pita, ukuran berbeda");
  cek(tanpaDigit(DS.MISI_PITA_TEKS) && bersih(DS.MISI_PITA_TEKS) && DS.MISI_PITA_TEKS === MT.MISI_K3B3.B && D.MISI_PITA_TEKS === DS.MISI_PITA_TEKS, "simulasi: teks misi tanpa digit dan kata terlarang, sama dengan misi-teks-k3b3");
  cek(tanpaDigit(MT.MISI_K3B3.B) && MT.hurufK3B3("B") === "B" && MT.misiAwalK3Bab3("B").includes(MT.MISI_K3B3.B), "misi-teks: misi awal B memuat teks misi tanpa digit");

  const a = L.awalPita();
  cek(a.alat === "pita" && a.mode === "tukar" && a.tukarBenar.length === 0 && a.ubahBenar.length === 0 && a.gabungBenar.length === 0 && a.sambungBenar.length === 0 && a.bandingBenar.length === 0 && a.bandingPilih === -1, "simulasi: keadaan awal kosong");
  cek(JSON.stringify(a.potongan) === JSON.stringify(DS.TARGET_TUKAR[0].awal) && a.potongan !== DS.TARGET_TUKAR[0].awal, "simulasi: potongan awal salinan sasaran pertama");
  // Tukar.
  sama(a.potongan, [1, 14, 23], "tukar: potongan awal");
  cek(!L.sudahDitukar(a.potongan) && L.sudahDitukar([2, 6, 3]) && !L.sudahDitukar([0, 3, 12]) && !L.sudahDitukar([0, 10, 4]), "tukar: sudah ditukar bila puluhan dan satuan kurang dari sepuluh");
  const salahT = L.periksaTukar(a);
  cek(!salahT.ok && salahT.k.salah === 1 && salahT.k.tukarBenar.length === 0 && /sepuluh potongan satu sentimeter/.test(L.petunjukTukar(a)) && tanpaDigit(L.petunjukTukar(a)), "tukar: belum ditukar keliru dengan petunjuk");
  let t = L.tukarSatuan(a).k;
  t = L.tukarSatuan(t).k;
  sama(t.potongan, [1, 16, 3], "tukar: dua kali tukar satuan");
  cek(L.jumlahPotongan(t.potongan) === 263 && !L.tukarSatuan(t).ok && /sepuluh potongan sepuluh sentimeter/.test(L.petunjukTukar(t)) && /satu meter/.test(L.petunjukTukar(t)), "tukar: panjang tetap, satuan tidak bisa ditukar lagi, petunjuk puluhan");
  const tp = L.tukarPuluhan(t);
  cek(tp.ok && JSON.stringify(tp.k.potongan) === "[2,6,3]" && !L.tukarPuluhan(tp.k).ok, "tukar: sepuluh potongan sepuluh sentimeter menjadi satu meter");
  const bT = L.periksaTukar(tp.k);
  cek(bT.ok && bT.k.tukarBenar.join() === "0" && bT.k.tukarKe === 1 && JSON.stringify(bT.k.potongan) === "[0,23,17]" && L.targetTukar(bT.k).awal[1] === 23, "tukar: ditukar tepat membuka tumpukan berikutnya");
  sama(S.misiBaru(MK.MISI_B, bT.k, new Set()), ["b-tukar"], "tukar: misi b-tukar");
  cek(L.kembalikanTukar(t).potongan.join() === "1,14,23" && tanpaDigit(L.kalimatTukar(a)) && tanpaDigit(L.kalimatTukar(bT.k)) && /satu potongan satu meter|satu meter/.test(L.kalimatTukar(a)), "tukar: kembalikan dan kalimat tanpa digit");
  cek(!L.tukarSatuan({ ...a, potongan: [0, 0, 5] }).ok && !L.tukarPuluhan({ ...a, potongan: [0, 5, 5] }).ok && L.tukarSatuan({ ...a, potongan: [0, 0, 10] }).k.potongan.join() === "0,1,0", "tukar: batas sepuluh");
  // Ubah.
  sama([L.jawabUbah(a), L.targetUbah(a).arah], [600, "ke-cm"], "ubah: sasaran pertama");
  const salahU = L.periksaUbah({ ...a, ubah: [0, 6, 0] });
  cek(!salahU.ok && salahU.k.salah === 1 && salahU.k.ubahBenar.length === 0 && /seratus/.test(L.petunjukUbah(a)) && tanpaDigit(L.petunjukUbah(a)), "ubah: isian keliru dengan petunjuk kali seratus");
  const bU = L.periksaUbah({ ...a, ubah: [6, 0, 0] });
  cek(bU.ok && bU.k.ubahBenar.join() === "0" && bU.k.ubahKe === 1 && bU.k.ubah.join() === "0,0,0" && L.jawabUbah(bU.k) === 8 && L.targetUbah(bU.k).arah === "ke-m", "ubah: isian tepat membuka ukuran berikutnya (sentimeter ke meter)");
  cek(/dibagi seratus/.test(L.petunjukUbah(bU.k)) && L.periksaUbah({ ...bU.k, ubah: [0, 0, 8] }).ok && L.jawabUbah({ ...a, ubahKe: 2 }) === 245, "ubah: sentimeter ke meter dibagi seratus, ukuran ketiga 245 sentimeter");
  sama(S.misiBaru(MK.MISI_B, bU.k, new Set()), ["b-ubah"], "ubah: misi b-ubah");
  cek(!L.ubahAngka(a, 0, -1).ok && !L.ubahAngka({ ...a, ubah: [9, 0, 0] }, 0, 1).ok && !L.ubahAngka(a, 5, 1).ok && L.ubahAngka(a, 2, 1).k.ubah.join() === "0,0,1", "ubah: angka nol sampai sembilan");
  let tiga = a;
  for (let i = 0; i < 3; i += 1) {
    const j = L.jawabUbah(tiga);
    tiga = L.periksaUbah({ ...tiga, ubah: [Math.floor(j / 100), Math.floor(j / 10) % 10, j % 10] }).k;
  }
  cek(tiga.ubahBenar.join() === "0,1,2" && S.misiBaru(MK.MISI_B, tiga, new Set()).includes("b-lengkap"), "ubah: tiga ukuran memenuhi b-lengkap");
  cek(tanpaDigit(L.kalimatUbah(a)) && tanpaDigit(L.kalimatUbah(bU.k)) && /enam meter/.test(L.kalimatUbah(a)), "ubah: kalimat tanpa digit");
  // Gabung.
  sama([L.bagianGabung(a), L.bagianGabung({ ...a, gabungKe: 1 }), L.bagianGabung({ ...a, gabungKe: 2 })], [[3, 17], [4, 52], [2, 69]], "gabung: meter dan sentimeter sasaran");
  const salahG = L.periksaGabung({ ...a, gabung: [0, 3, 1] });
  cek(!salahG.ok && salahG.k.salah === 1 && /seratus sentimeter menjadi satu meter/.test(L.petunjukGabung(a)) && tanpaDigit(L.petunjukGabung(a)), "gabung: isian keliru dengan petunjuk");
  cek(!L.periksaGabung({ ...a, gabung: [1, 1, 7] }).ok && !L.periksaGabung({ ...a, gabung: [3, 1, 8] }).ok, "gabung: meter atau sentimeter yang salah tidak diterima");
  const bG = L.periksaGabung({ ...a, gabung: [3, 1, 7] });
  cek(bG.ok && bG.k.gabungBenar.join() === "0" && bG.k.gabungKe === 1 && bG.k.gabung.join() === "0,0,0", "gabung: isian tepat membuka ukuran berikutnya");
  sama(S.misiBaru(MK.MISI_B, bG.k, new Set()), ["b-gabung"], "gabung: misi b-gabung");
  cek(L.ubahGabung(a, 0, 1).k.gabung.join() === "1,0,0" && !L.ubahGabung({ ...a, gabung: [9, 0, 0] }, 0, 1).ok && tanpaDigit(L.kalimatGabung(a)) && tanpaDigit(L.kalimatGabung(bG.k)), "gabung: ubah angka dan kalimat tanpa digit");
  // Sambung.
  sama([L.hasilSambung(a), L.hasilSambung({ ...a, sambungKe: 1 }), L.hasilSambung({ ...a, sambungKe: 2 })], [[4, 55], [2, 65], [6, 15]], "sambung: hasil tiga pita");
  const salahS = L.periksaSambung({ ...a, sambung: [3, 15, 5] });
  cek(!salahS.ok && salahS.k.salah === 1 && /ditukar menjadi satu meter/.test(L.petunjukSambung(a)) && /pinjam satu meter/.test(L.petunjukSambung({ ...a, sambungKe: 1 })) && tanpaDigit(L.petunjukSambung(a)) && tanpaDigit(L.petunjukSambung({ ...a, sambungKe: 1 })), "sambung: isian keliru dengan petunjuk tukar dan pinjam");
  const bS = L.periksaSambung({ ...a, sambung: [4, 5, 5] });
  cek(bS.ok && bS.k.sambungBenar.join() === "0" && bS.k.sambungKe === 1 && bS.k.sambung.join() === "0,0,0", "sambung: isian tepat membuka pita berikutnya");
  sama(S.misiBaru(MK.MISI_B, bS.k, new Set()), ["b-sambung"], "sambung: misi b-sambung");
  cek(L.periksaSambung({ ...a, sambungKe: 1, sambung: [2, 6, 5] }).ok && L.ubahSambung(a, 1, 1).k.sambung.join() === "0,1,0" && /Potong/.test(L.kalimatSambung({ ...a, sambungKe: 1 })) && tanpaDigit(L.kalimatSambung(a)) && tanpaDigit(L.kalimatSambung(bS.k)), "sambung: potong pita dan kalimat tanpa digit");
  // Banding.
  sama([L.nomorPanjang(a), L.nomorPanjang({ ...a, bandingKe: 1 }), L.nomorPanjang({ ...a, bandingKe: 2 })], [2, 1, 1], "banding: nomor pita terpanjang");
  cek(!L.periksaBanding(a).ok && /pilih/i.test(L.petunjukBanding(a)), "banding: tanpa pilihan tidak benar");
  const salahB = L.periksaBanding(L.pilihBanding(a, 0));
  cek(!salahB.ok && salahB.k.salah === 1 && /ke sentimeter/.test(L.petunjukBanding(L.pilihBanding(a, 0))) && tanpaDigit(L.petunjukBanding(L.pilihBanding(a, 0))), "banding: memilih pita yang lebih pendek keliru dengan petunjuk");
  const bB = L.periksaBanding(L.pilihBanding(a, 2));
  cek(bB.ok && bB.k.bandingBenar.join() === "0" && bB.k.bandingKe === 1 && bB.k.bandingPilih === -1, "banding: memilih pita terpanjang benar");
  cek(L.pilihBanding(a, 7).bandingPilih === -1 && tanpaDigit(L.kalimatBanding(bB.k)), "banding: pilihan di luar daftar diabaikan");
  const b2 = L.periksaBanding(L.pilihBanding(bB.k, 1));
  sama(S.misiBaru(MK.MISI_B, b2.k, new Set()), ["b-banding"], "banding: dua kumpulan pita memenuhi b-banding");
  cek(L.pilihModePita(a, "banding").mode === "banding" && L.mulaiLagiPita().ubahKe === 0 && L.mulaiLagiPita().tukarBenar.length === 0, "mode dan mulai lagi");
  // Misi.
  const B = MK.MISI_B;
  cek(B.filter((m) => m.wajib).length === 4 && B.filter((m) => !m.wajib).length === 2, "misi B: empat wajib, dua bebas");
  cek(new Set(B.map((m) => m.id)).size === 6 && B.every((m) => m.id.startsWith("b-") && m.teks.length >= 10 && m.teks.length <= 120 && tanpaDigit(m.teks) && bersih(m.teks)), "misi B: id berawalan b-, unik, 10 sampai 120 huruf, tanpa digit");
  sama(MK.daftarMisiK3Bab3("B"), B, "daftarMisiK3Bab3 B");
  cek(B.every((m) => !m.cek({ alat: "kerangka" })), "misi B: alat lain tidak memenuhi misi");
  sama(S.misiBaru(B, a, new Set()), [], "misi B: keadaan awal tanpa misi baru");
  cek(S.misiBaru(B, { ...a, salah: 9, mode: "banding", potongan: [0, 0, 5], ubah: [6, 0, 0], gabung: [3, 1, 7], sambung: [4, 5, 5], bandingPilih: 2 }, new Set()).length === 0, "misi B: isian yang belum diperiksa tidak dihitung sebagai misi");
}

/* ------------------------------ Mind-map: gulungan pita (sembilan kartu geser) ------------------------------ */
{
  const KA = DK.KARTU_PITA;
  cek(KA.length === 9, "kartu: sembilan kartu");
  cek(KA.every((k) => k.contoh.length <= 1) && KA[0].contoh.join() === "masalah" && KA.slice(1).every((k) => k.contoh.length === 0), "kartu: satu kotak contoh di kartu pertama saja, sisanya mandiri");
  const semua = KA.flatMap((k) => [k.masalah, k.cara, k.hasil]);
  const label = semua.map((x) => x.label);
  cek(new Set(label).size === label.length, "kartu: label unik");
  cek(semua.every((x) => x.label.length >= 5 && x.label.length <= 36), `kartu: label pendek (terpanjang ${Math.max(...label.map((l) => l.length))} huruf)`);
  cek(KA.every((k) => [k.masalah.label, k.cara.label, k.hasil.label].every((l) => l.split(/\s+/).length <= 6)), "kartu: label paling banyak enam kata");
  cek(semua.every((x) => tanpaDigit(x.label) && tanpaDigit(x.arti) && bersih(x.label) && bersih(x.arti) && x.arti.length > 10), "kartu: label dan arti tanpa digit dan kata terlarang");
  cek(KA.every((k) => tanpaDigit(k.judul) && bersih(k.judul) && k.judul.length > 5), "kartu: judul bersih");
  const cara = KA.map((k) => k.cara.label).join(" | ");
  for (const m of ["Tabel Perbandingan", "Garis Bilangan", "Cara Memecah", "Kalikan seratus", "Bagi seratus", "Tarik meteran", "Ambil tiap seratus", "Jumlahkan sejenis", "Kurangkan sejenis"]) cek(cara.toLowerCase().includes(m.toLowerCase()), `kartu: cara memuat ${m}`);
  const gab = KA.map((k) => [k.judul, k.masalah.label, k.cara.label, k.hasil.label, k.masalah.arti, k.cara.arti, k.hasil.arti].join(" ")).join(" ").toLowerCase();
  for (const s of ["seratus sentimeter sama dengan satu meter", "dikalikan dengan seratus", "dibagi dengan seratus", "meter dan sentimeter bersama", "tukar seratus sentimeter menjadi satu meter", "pinjam satu meter", "lebih jauh dari nol", "bagian meter dan bagian sentimeter"]) cek(gab.includes(s), `kartu: memuat poin "${s}"`);
  cek(!new RegExp("\\b(raka|salsa|bima|pak joko|pak wayan|bu lastri|bengkel|beo|kandang|kura)\\b", "i").test(gab), "kartu: hanya poin pelajaran (tanpa tokoh dan benda cerita)");
  cek(tanpaDigit(DK.SUARA_KARTU_PITA + DK.SELESAI_KARTU_PITA) && bersih(DK.SUARA_KARTU_PITA + DK.SELESAI_KARTU_PITA), "kartu: suara dan pesan selesai tanpa digit dan kata terlarang");
  cek(emojiSah(DK.TEMA_KARTU_PITA.ikon) && DK.TEMA_KARTU_PITA.judul.length > 5, "kartu: tema sah");
  const RG = DK.RINGKASAN_PITA;
  cek(RG.ikon.length === DK.KARTU_PITA.length && new Set(RG.ikon).size === RG.ikon.length && [...RG.ikon, RG.pusat].every((e) => emojiSah(e) && !/[A-Za-z0-9]/.test(e)), "peta radial: satu gambar unik per kartu, gambar sah tanpa huruf");
  cek(tanpaDigit(RG.suara) && bersih(RG.suara) && !RG.ikon.includes(RG.pusat), "peta radial: suara bersih dan pusat berbeda dari cabang");
}

/* ------------------------------ Infografis: tabel pita (satu tabel lima baris) ------------------------------ */
{
  const B = DK.BARIS_INFO_PITA;
  cek(B.length === 5 && DK.KOLOM_INFO_PITA.length === 3, "infografis: lima baris dan tiga kolom");
  cek(B.every((b) => b.isi.length === 3 && emojiSah(b.ikon) && b.nama.length > 4), "infografis: tiap baris tiga isian, emoji sah");
  const jumlahContoh = B.map((b) => b.contoh.length);
  cek(jumlahContoh[0] === 3 && jumlahContoh.slice(1).every((n) => n === 0), "infografis: baris satu penuh contoh, baris dua sampai lima mandiri");
  const semua = B.flatMap((b) => b.isi);
  cek(B.every((b) => new Set(b.isi.map((x) => x.t)).size === 3), "infografis: tiga label tiap baris berbeda");
  cek(new Set(semua.map((x) => x.t)).size === semua.length, "infografis: semua label unik");
  cek(semua.every((x) => x.t.length <= 28 && x.t.split(/\s+/).length <= 5 && bersih(x.t) && bersih(x.s ?? "")), "infografis: label pendek (paling banyak lima kata) dan tanpa kata terlarang");
  cek(semua.every((x) => tanpaDigit(x.s ?? x.t)), "infografis: ucapan label tanpa digit");
  const gab = B.map((b) => [b.nama, ...b.isi.map((x) => x.t)].join(" ")).join(" ").toLowerCase();
  for (const s of ["meter ke sentimeter", "sentimeter ke meter", "ukuran bersama", "menyambung pita", "memotong tali", "kalikan seratus", "bagi seratus", "ambil tiap seratus", "jumlahkan sejenis", "kurangkan sejenis", "tukar seratus jadi meter", "pinjam satu meter"]) cek(gab.includes(s), `infografis: memuat "${s}"`);
  cek(!new RegExp("\\b(raka|salsa|bima|pak joko|pak wayan|bu lastri)\\b", "i").test(gab), "infografis: tanpa nama tokoh");
  cek(tanpaDigit(DK.SUARA_INFO_PITA + DK.SELESAI_INFO_PITA) && bersih(DK.SUARA_INFO_PITA + DK.SELESAI_INFO_PITA) && emojiSah(DK.TEMA_INFO_PITA.ikon), "infografis: suara dan tema bersih");
}

/* ------------------------------ Pengenal ucapan ------------------------------ */
{
  const nm = (nama) => ({ jenis: "nama", nama });
  const an = (n, satuan = "") => ({ jenis: "angka", n, satuan });
  for (const nama of ["kali", "bagi", "tambah", "kurang"]) cek(K.cocokUcapan(nama, nm(nama)).cocok && K.kataDariUcapan(nama).length === 1, `cocok: kata ${nama} dikenali tepat satu`);
  sama(K.kataDariUcapan("dikalikan"), ["kali"], "ucapan: dikalikan berarti kali");
  sama(K.kataDariUcapan("dibagi"), ["bagi"], "ucapan: dibagi berarti bagi");
  sama(K.kataDariUcapan("menambahkan"), ["tambah"], "ucapan: menambahkan berarti tambah");
  sama(K.kataDariUcapan("dikurangi"), ["kurang"], "ucapan: dikurangi berarti kurang");
  sama(K.kataDariUcapan("tidak kali"), [], "ucapan: tidak kali tidak dihitung");
  sama(K.kataDariUcapan("bukan bagi"), [], "ucapan: bukan bagi tidak dihitung");
  sama(K.kataDariUcapan("halo"), [], "ucapan: kata lain tidak dikenali");
  cek(!K.cocokUcapan("kali", nm("bagi")).cocok && !K.cocokUcapan("tambah", nm("kurang")).cocok, "cocok: kata berbeda tidak cocok");
  sama(K.angkaDariUcapan("lima"), [5], "angka: lima");
  sama(K.angkaDariUcapan("enam ratus"), [600], "angka: enam ratus");
  sama(K.angkaDariUcapan("seratus enam puluh sentimeter"), [160], "angka: seratus enam puluh");
  sama(K.angkaDariUcapan("sembilan ratus sembilan puluh sembilan"), [999], "angka: sembilan ratus sembilan puluh sembilan");
  sama(K.angkaDariUcapan("600"), [600], "angka: 600 tertulis");
  sama(K.angkaDariUcapan("nol"), [0], "angka: nol");
  for (let n = 1; n <= 999; n += 1) cek(K.angkaDariUcapan(LC.kataBil(n)).join() === String(n), `angka: kata bilangan ${n} dikenali utuh (${LC.kataBil(n)} -> ${K.angkaDariUcapan(LC.kataBil(n))})`);
  cek(K.cocokUcapan("enam ratus sentimeter", an(600, "cm")).cocok && K.cocokUcapan("600", an(600, "cm")).cocok && !K.cocokUcapan("enam puluh sentimeter", an(600, "cm")).cocok, "cocok: kunci angka dengan satuan, satuan tidak ikut dinilai");
  cek(K.cocokUcapan("dua", an(2)).cocok && !K.cocokUcapan("tiga", an(2)).cocok, "cocok: kunci nomor pita");
}

/* ------------------------------ CPA ------------------------------ */
const TAHAP = { Concrete: ["benda", D.CONCRETE], Pictorial: ["diagram", D.PICTORIAL], Abstract: ["lambang", D.ABSTRACT] };
const CARA = ["klik", "kanvas", "suara"];
const METODE = ["igil", "tabel", "garis", "pecah"];
const semuaTeksLangkah = (ls, rupa, cara) => [ls.judul, ls.suara, LC.instruksi(ls.langkah, rupa, cara), LC.kalimatTanya(ls.langkah, cara), LC.kalimatKunci(ls.langkah, cara), LC.petunjukSalah(ls.langkah, cara, 1)];
const LABEL_KLIK = /^(\d{1,3} (cm|m)|\d{1,3} m \d{1,2} cm)$/;
{
  sama(LC.URUT_METODE, METODE, "urutan metode");
  cek(LC.NAMA_METODE.igil.includes("Kali Seratus ke Sentimeter, Bagi Seratus ke Meter") && LC.NAMA_METODE.tabel.includes("Ratio Table") && LC.NAMA_METODE.garis.includes("Number Line") && LC.NAMA_METODE.pecah.includes("Split Strategy"), "nama metode IGIL dan tiga metode global");
  cek(METODE.every((m) => emojiSah(LC.IKON_METODE[m])), "ikon metode sah");
  let nomor = 2;
  for (const [nama, [rupa, soal]] of Object.entries(TAHAP)) {
    cek(soal.length === 3 && soal.map((s) => s.cara).join() === CARA.join(), `${nama}: tiga misi Klik, Kanvas, Suara`);
    cek(soal.every((s) => s.langkah.length === 4 && s.langkah.map((l) => l.metode).join() === METODE.join()), `${nama}: empat langkah per misi (IGIL, Ratio Table, Number Line, Split Strategy)`);
    for (const s of soal) {
      cek(s.nomor === nomor, `${nama}: nomor misi berlanjut ${nomor}`);
      nomor += 1;
      cek(s.judul.startsWith("Misi Bengkel Pita") && s.cerita.length > 15 && bersih(s.judul) && bersih(s.cerita), `${nama} ${s.nomor}: judul dan cerita sah`);
      for (const ls of s.langkah) {
        cek(ls.cara === s.cara, `${nama} ${s.nomor}: cara langkah sama dengan misi`);
        const teks = semuaTeksLangkah(ls, rupa, s.cara);
        cek(teks.every((t) => tanpaDigit(t) && bersih(t)), `${nama} ${s.nomor} ${ls.metode}: teks tanpa digit dan kata terlarang (${teks.find((t) => !tanpaDigit(t) || !bersih(t)) ?? ""})`);
        cek(emojiSah(teks.join("")), `${nama} ${s.nomor} ${ls.metode}: emoji sah`);
        cek(ls.judul === ls.suara && ls.judul === LC.instruksi(ls.langkah, rupa, s.cara), `${nama} ${s.nomor} ${ls.metode}: judul dan suara sama dengan instruksi`);
        // Batas rupa: Pictorial dan Abstract tanpa emoji benda di teks tugas.
        if (rupa !== "benda") cek(!adaEmoji(teks.join(" ")), `${nama} ${s.nomor} ${ls.metode}: teks tugas tanpa emoji (batas rupa)`);
        cek(LC.dataSah(LC.dasarDari(ls.langkah)), `${nama} ${s.nomor} ${ls.metode}: data sah dan konsisten`);
        // Tiap metode memakai jenis tugas yang sesuai.
        const tipe = LC.dasarDari(ls.langkah).tipe;
        if (ls.langkah.tipe !== "salah") cek((ls.metode === "igil" && tipe === "kali") || (ls.metode === "tabel" && tipe === "tabel") || (ls.metode === "garis" && (tipe === "jarak" || tipe === "banding")) || (ls.metode === "pecah" && tipe === "pecah"), `${nama} ${s.nomor} ${ls.metode}: jenis tugas sesuai metode (${tipe})`);
      }
    }
    // Cari kesalahan di tiap tahap, di tugas klik IGIL.
    const salahL = soal.flatMap((s) => s.langkah.filter((l) => l.langkah.tipe === "salah"));
    cek(salahL.length === 1 && soal[0].langkah[0].langkah.tipe === "salah", `${nama}: satu Cari kesalahan, di Klik IGIL`);
    for (const l of salahL) {
      const x = l.langkah;
      cek(x.alasan.length === 3 && new Set(x.alasan).size === 3 && x.benar >= 0 && x.benar <= 2 && x.keliru.length > 20 && x.kataTokoh.length > 15 && ["Raka", "Salsa", "Bima"].includes(x.tokoh), `${nama}: Cari kesalahan lengkap`);
      cek(tanpaDigit(x.kataTokoh + x.alasan.join(" ") + x.keliru) && bersih(x.kataTokoh + x.alasan.join(" ") + x.keliru), `${nama}: Cari kesalahan tanpa digit dan kata terlarang`);
      const pil = LC.pilihanKlik(x);
      cek(pil.length === 3 && new Set(pil).size === 3 && pil.includes(x.jawabTokoh) && pil.every((p) => LABEL_KLIK.test(p)), `${nama}: pilihan klik Cari kesalahan memuat jawaban tokoh bersatuan (${pil.join("/")})`);
      const kunci = LC.kunciJawab(x, "klik");
      cek(kunci !== null && kunci.jenis === "angka" && LC.labelKlik(x) === LC.labelBil(kunci.n, kunci.satuan), `${nama}: jawaban Cari kesalahan berupa ukuran bersatuan`);
      cek(x.betul === true ? LC.labelKlik(x) === x.jawabTokoh : LC.labelKlik(x) !== x.jawabTokoh, `${nama}: jawaban tokoh ${x.betul ? "benar" : "keliru"} sesuai data`);
      cek(LC.petunjukSalah(x, "klik", x.jawabTokoh).startsWith(`Itu jawaban ${x.tokoh}`), `${nama}: petunjuk menjelaskan jawaban tokoh`);
    }
  }
  cek(nomor === 11, "nomor misi berlanjut sampai sepuluh");
  sama(Object.values(TAHAP).map(([, soal]) => soal[0].langkah[0].langkah.betul === true), [false, true, false], "Cari kesalahan: dua jawaban keliru dan satu jawaban benar (Pictorial)");
  sama(Object.values(TAHAP).map(([, soal]) => soal[0].langkah[0].langkah.dasar.tipe + ":" + (soal[0].langkah[0].langkah.dasar.arah ?? soal[0].langkah[0].langkah.dasar.op)), ["kali:ke-cm", "kali:ke-m", "pecah:tambah"], "Cari kesalahan: meter ke sentimeter (Concrete), sentimeter ke meter (Pictorial), menyambung dengan menukar (Abstract)");
  // Posisi tombol alasan benar (rumus yang sama dengan CariSalah): tidak selalu tombol pertama.
  const posisiTombol = Object.values(TAHAP).map(([, soal]) => {
    const x = soal[0].langkah[0].langkah;
    return Array.from(`${x.tokoh}${x.kataTokoh}${x.alasan[x.benar]}`).reduce((t, c) => t + c.charCodeAt(0), 0) % 3;
  });
  cek(posisiTombol.some((p) => p !== 0) && posisiTombol.filter((p) => p === 0).length <= 1, `Cari kesalahan: alasan benar tidak selalu tombol pertama (${posisiTombol.join(",")})`);
  sama(Object.values(TAHAP).map(([, soal]) => soal[0].langkah[0].langkah.benar), [1, 2, 2], "Cari kesalahan: posisi alasan benar bervariasi");
}

/* ------------------------------ Tugas dihitung dari data ------------------------------ */
{
  const nama = (k) => (k ? (k.jenis === "nama" ? k.nama : k.n) : null);
  const kal = (arah, m, c, kanvas, suara = "hasil", bagian = "meter") => ({ tipe: "kali", arah, m, c, bagian, benda: "kelinci", kanvas, suara });
  const tab = (dikenal, m, tanya) => ({ tipe: "tabel", dikenal, m, tanya, benda: "kura", kanvas: tanya === "cm" ? "ratusan" : "hilang", suara: "hasil" });
  const jar = (dari, ke) => ({ tipe: "jarak", dari, ke, benda: "rusa", kanvas: "lompat", suara: "jarak" });
  const ban = (ukuran, bentuk) => ({ tipe: "banding", ukuran, bentuk, benda: "beo", kanvas: "nomor", suara: "nomor" });
  const pec = (op, a, b, tanya, kanvas, suara = "hasil") => ({ tipe: "pecah", op, a, b, tanya, benda: "kambing", kanvas, suara });
  // Kunci tiap jenis tugas dihitung dari data.
  sama(["klik", "kanvas", "suara"].map((c) => nama(LC.kunciJawab(kal("ke-cm", 7, 25, "ratusan"), c))), [725, 7, 725], "kunci kali ke-cm: ukuran, ratusan, hasil");
  sama(["klik", "kanvas", "suara"].map((c) => nama(LC.kunciJawab(kal("ke-cm", 6, 0, "ratusan", "operasi"), c))), [600, 6, "kali"], "kunci kali ke-cm operasi: kali");
  sama(["klik", "kanvas", "suara"].map((c) => nama(LC.kunciJawab(kal("ke-m", 8, 0, "hilang", "operasi"), c))), [8, 8, "bagi"], "kunci kali ke-m operasi: bagi");
  sama(["klik", "kanvas", "suara"].map((c) => nama(LC.kunciJawab(kal("pisah", 2, 38, "puluhan", "hasil", "cm"), c))), [38, 3, 38], "kunci kali pisah: sentimeter sisa dan angka puluhan");
  sama(["klik", "kanvas", "suara"].map((c) => nama(LC.kunciJawab(kal("pisah", 2, 38, "hilang", "operasi", "meter"), c))), [2, 2, "bagi"], "kunci kali pisah meter: bagi");
  sama(["klik", "kanvas", "suara"].map((c) => nama(LC.kunciJawab(tab([2, 3], 9, "cm"), c))), [900, 9, 900], "kunci tabel cm: ukuran dan ratusan");
  sama(["klik", "kanvas", "suara"].map((c) => nama(LC.kunciJawab(tab([2, 3], 6, "m"), c))), [6, 6, 6], "kunci tabel m: banyak meter");
  sama(["klik", "kanvas", "suara"].map((c) => nama(LC.kunciJawab(jar(3, 8), c))), [500, 5, 500], "kunci jarak: sentimeter dan lompatan");
  sama(["klik", "kanvas", "suara"].map((c) => nama(LC.kunciJawab(ban([300, 360, 330], [false, true, false]), c))), [360, 2, 2], "kunci banding: ukuran terpanjang dan nomor pita");
  sama(["klik", "kanvas", "suara"].map((c) => nama(LC.kunciJawab(pec("tambah", [2, 60], [1, 85], "meter", "hilang", "operasi"), c))), [4, 4, "tambah"], "kunci pecah meter tukar: 4 m dan tambah");
  sama(["klik", "kanvas", "suara"].map((c) => nama(LC.kunciJawab(pec("kurang", [6, 25], [2, 60], "cm", "puluhan"), c))), [65, 6, 65], "kunci pecah cm pinjam: 65 cm dan puluhan");
  sama([LC.hasilPecah(pec("kurang", [8, 15], [3, 45], "meter", "hilang")), LC.hasilPecah(pec("tambah", [3, 85], [4, 70], "meter", "hilang")), LC.adaTukar(pec("kurang", [8, 15], [3, 45], "meter", "hilang")), LC.adaTukar(pec("tambah", [2, 10], [1, 20], "meter", "hilang"))], [[4, 70], [8, 55], true, false], "hasil pecah dan tukar");
  sama([LC.labelKlik(kal("ke-cm", 7, 25, "ratusan")), LC.labelKlik(ban([300, 360, 330], [false, true, false])), LC.labelKlik(pec("kurang", [8, 15], [3, 45], "meter", "hilang"))], ["725 cm", "3 m 60 cm", "4 m"], "label klik dengan satuan");
  // Data sah dan tolak data yang salah.
  cek(LC.dataSah(kal("ke-cm", 9, 0, "ratusan")) && !LC.dataSah(kal("ke-cm", 9, 0, "hilang")) && !LC.dataSah(kal("ke-m", 6, 5, "hilang")) && !LC.dataSah(kal("ke-m", 6, 0, "ratusan")) && !LC.dataSah(kal("ke-cm", 3, 45, "puluhan", "operasi")) && !LC.dataSah(kal("pisah", 2, 10, "puluhan", "hasil", "cm")) && !LC.dataSah(kal("ke-cm", 10, 0, "ratusan")), "dataSah kali: kanvas satu angka, ke-m tanpa sisa, operasi hanya untuk meter bulat");
  cek(LC.dataSah(tab([1, 6], 8, "cm")) && !LC.dataSah(tab([1, 1], 8, "cm")) && !LC.dataSah(tab([1, 8], 8, "cm")) && !LC.dataSah(tab([1, 2], 12, "cm")), "dataSah tabel: dua kolom dikenal berbeda dari kolom kosong");
  cek(LC.dataSah(jar(0, 9)) && !LC.dataSah(jar(5, 5)) && !LC.dataSah(jar(6, 4)) && !LC.dataSah(jar(0, 10)), "dataSah jarak: titik kedua di kanan titik pertama, lompatan satu sampai sembilan");
  cek(LC.dataSah(ban([300, 360, 330], [false, true, false])) && !LC.dataSah(ban([360, 300, 330], [false, true, false])) && !LC.dataSah(ban([300, 360, 360], [false, true, false])) && !LC.dataSah(ban([300, 360, 330], [false, false, false])), "dataSah banding: terpanjang bukan pita pertama, tiga ukuran berbeda, ada yang ditulis bersama");
  cek(LC.dataSah(pec("kurang", [6, 25], [2, 60], "cm", "puluhan")) && !LC.dataSah(pec("kurang", [2, 60], [6, 25], "cm", "puluhan")) && !LC.dataSah(pec("tambah", [6, 25], [5, 60], "cm", "puluhan")) && !LC.dataSah(pec("tambah", [2, 60], [1, 40], "cm", "puluhan")), "dataSah pecah: selisih positif, jumlah paling banyak 999, sentimeter hasil dua angka");
  // Pengecoh.
  sama(LC.pengecoh(900, 90, [90]).slice(0, 3), [90, 800, 910], "pengecoh dengan jawaban tokoh di depan");
  cek(LC.pengecoh(999).every((x) => x !== 999 && x >= 1 && x <= 999) && LC.pengecoh(1).every((x) => x >= 1) && LC.pengecoh(50).length >= 4, "pengecoh: sah, 1 sampai 999");
  cek(LC.pilihanKlik(kal("ke-cm", 9, 0, "ratusan")).includes("900 cm") && LC.pilihanKlik(kal("ke-cm", 9, 0, "ratusan")).every((p) => LABEL_KLIK.test(p)), "pilihan klik: memuat kunci bersatuan");
  sama(LC.pilihanKlik(ban([300, 360, 330], [false, true, false])), ["300 cm", "3 m 60 cm", "330 cm"], "pilihan klik banding: tiga ukuran pita");
  sama(LC.kalimatLayar === undefined, true, "kalimatLayar tidak dipakai");

  const KANVAS = { Concrete: [6, 9, 5, 4], Pictorial: [4, 6, 7, 8], Abstract: [3, 1, 9, 4] };
  for (const [namaT, [rupa, soal]] of Object.entries(TAHAP)) {
    const kanvasAngka = [];
    const semuaAngka = [];
    const jenisKunci = [];
    for (const s of soal)
      for (const ls of s.langkah) {
        const l = ls.langkah;
        const d = LC.dasarDari(l);
        const kunci = LC.kunciJawab(l, s.cara);
        const tag = `${namaT} ${s.nomor} ${ls.metode}`;
        cek(kunci !== null, `${tag}: kunci ada untuk semua tugas`);
        cek(LC.siapLangsung(l, rupa, s.cara) === (l.tipe !== "salah"), `${tag}: siap langsung kecuali Cari kesalahan (tombol tidak macet)`);
        for (const r of ["benda", "diagram", "lambang"]) cek(LC.siapLangsung(l, r, s.cara) === LC.siapLangsung(l, rupa, s.cara), `${tag}: siap langsung tidak bergantung rupa (${r})`);
        // Ukuran berbeda dari Story: bagian sentimeter, total, dan hasil yang ditanya.
        const nilai = [];
        if (d.tipe === "kali") {
          if (d.c > 0) nilai.push(d.c, d.m * 100 + d.c);
          if (d.arah !== "ke-m" && LC.satuanKali(d) === "cm") nilai.push(LC.nilaiKali(d));
        }
        if (d.tipe === "banding") nilai.push(...d.ukuran);
        if (d.tipe === "pecah") {
          nilai.push(d.a[1], d.b[1]);
          if (d.tanya === "cm") nilai.push(LC.nilaiPecah(d));
        }
        cek(nilai.every((n) => !CERITA.has(n)), `${tag}: ukuran berbeda dari Story (${nilai.join(", ")})`);
        cek(nilai.every((n) => n >= 1 && n <= 999), `${tag}: ukuran paling panjang 999 cm`);
        if (kunci?.jenis === "angka") {
          semuaAngka.push(`${s.cara}:${kunci.n}`);
          if (s.cara === "kanvas") {
            kanvasAngka.push(kunci.n);
            cek(kunci.n >= 1 && kunci.n <= 9 && kunci.satuan === "", `${tag}: jawaban kanvas satu angka satu sampai sembilan (${kunci.n})`);
          }
          if (s.cara === "klik") cek(kunci.n >= 2 && kunci.n <= 999 && (d.tipe === "banding" ? kunci.satuan === "cm" : kunci.satuan === "cm" || kunci.satuan === "m"), `${tag}: jawaban klik ukuran bersatuan (${LC.labelKlik(l)})`);
          if (s.cara === "suara") cek(kunci.n >= 1 && kunci.n <= 999, `${tag}: jawaban suara bilangan pendek`);
        }
        if (kunci?.jenis === "nama") {
          cek(!/\s/.test(kunci.nama) && tanpaDigit(kunci.nama) && s.cara === "suara", `${tag}: kunci nama satu kata, hanya pada suara`);
          jenisKunci.push(kunci.nama);
        }
        // Pilihan klik: tiga ukuran bersatuan unik, jawaban benar tidak di tombol pertama.
        if (s.cara === "klik" && kunci !== null) {
          const pil = LC.pilihanKlik(l);
          const benar = LC.labelKlik(l);
          cek(pil.length === 3 && new Set(pil).size === 3 && pil.includes(benar) && pil[0] !== benar, `${tag}: pilihan klik unik dan jawaban benar bukan yang pertama (${pil.join("/")})`);
          cek(pil.every((p) => LABEL_KLIK.test(p)), `${tag}: pilihan klik tiap ukuran bersatuan (${pil.join("/")})`);
        }
        if (s.cara !== "klik" && kunci !== null) {
          const pil = LC.pilihanSuara(l, s.cara);
          cek(pil.includes(LC.teksKunciPilihan(kunci)) && pil.length === 3 && new Set(pil).size === pil.length && tanpaDigit(pil.join(" ")), `${tag}: pilihan ketuk memuat kunci (${pil.join("/")})`);
          cek(pil[0] !== LC.teksKunciPilihan(kunci), `${tag}: kunci bukan pilihan pertama`);
          if (s.cara === "suara") {
            const c = K.cocokUcapan(LC.teksKunciPilihan(kunci), kunci);
            cek(c.cocok, `${tag}: ucapan kunci dikenali (${LC.teksKunciPilihan(kunci)})`);
            for (const lain of pil.filter((p) => p !== LC.teksKunciPilihan(kunci))) cek(!K.cocokUcapan(lain, kunci).cocok, `${tag}: ucapan ${lain} bukan kunci`);
          }
        }
        if (kunci) cek(LC.kalimatKunci(l, s.cara).length > 12, `${tag}: kalimat penjelasan ada`);
        // Petunjuk salah menunjuk kesalahan (tidak kosong untuk tiap tugas dan cara).
        cek(LC.petunjukSalah(l, s.cara, "x").length > 20, `${tag}: petunjuk salah ada`);
        if (rupa === "lambang") {
          const baris = LC.barisKartu(d);
          cek(Array.isArray(baris) && baris.length >= 1 && baris.every((b) => typeof b === "string" && b.length > 3), `${tag}: kartu kata ada`);
          cek(baris.every((b) => !adaEmoji(b)), `${tag}: kartu kata tanpa emoji`);
        }
      }
    cek(new Set(kanvasAngka).size === kanvasAngka.length && kanvasAngka.length === 4, `${namaT}: empat angka jawaban Tulis di kanvas tidak kembar (${kanvasAngka.join(", ")})`);
    sama(kanvasAngka, KANVAS[namaT], `angka kanvas ${namaT}`);
    const bukanKanvas = semuaAngka.filter((x) => !x.startsWith("kanvas"));
    cek(new Set(bukanKanvas).size === bukanKanvas.length, `${namaT}: jawaban ukuran klik dan suara tidak kembar dalam satu tahap (${semuaAngka.join(", ")})`);
    const bilKlikSuara = bukanKanvas.map((x) => x.split(":")[1]);
    cek(new Set(bilKlikSuara).size === bilKlikSuara.length, `${namaT}: bilangan jawaban klik dan suara berbeda satu sama lain (${bilKlikSuara.join(", ")})`);
    // Semua jenis tugas tampak di tiap tahap.
    const dasar = soal.flatMap((s) => s.langkah.map((l) => LC.dasarDari(l.langkah)));
    cek(["kali", "tabel", "jarak", "banding", "pecah"].every((t) => dasar.some((d) => d.tipe === t)), `${namaT}: kali, tabel, jarak, banding, dan pecah ada`);
    cek(dasar.some((d) => d.tipe === "pecah" && LC.adaTukar(d) && d.op === "tambah") && dasar.some((d) => d.tipe === "pecah" && LC.adaTukar(d) && d.op === "kurang") || namaT === "Concrete" && dasar.some((d) => d.tipe === "pecah" && LC.adaTukar(d)), `${namaT}: ada tugas yang memakai tukar atau pinjam`);
    cek(jenisKunci.length >= 1, `${namaT}: ada jawaban berupa kata (${jenisKunci.join(", ")})`);
    cek(dasar.some((d) => d.tipe === "kali" && d.arah === "ke-cm") || dasar.some((d) => d.tipe === "kali" && d.arah === "ke-m"), `${namaT}: mengubah meter ke sentimeter atau sebaliknya ada`);
  }
  const semuaKali = Object.values(TAHAP).flatMap(([, soal]) => soal.flatMap((s) => s.langkah.map((l) => LC.dasarDari(l.langkah)).filter((d) => d.tipe === "kali")));
  cek(["ke-cm", "ke-m", "pisah"].every((a) => semuaKali.some((d) => d.arah === a)), "semua tahap: ke-cm, ke-m, dan pisah (tulis bersama) ada");
  // Poin penting dan penutup.
  cek(D.POIN_PENTING.length >= 6 && D.POIN_PENTING.every((p) => p.length > 20 && bersih(p)) && D.POIN_PENTING_SUARA.every((p) => tanpaDigit(p)), "poin penting: banyak, bersih, suara tanpa digit");
  const poin = D.POIN_PENTING.join(" ").toLowerCase();
  for (const m of ["satu meter sama dengan seratus sentimeter", "dikalikan dengan seratus", "dibagi dengan seratus", "meter dan sentimeter bersama", "tukar 100 cm menjadi 1 m", "pinjam 1 m menjadi 100 cm", "tabel perbandingan", "garis bilangan", "cara memecah"]) cek(poin.includes(m), `poin penting memuat ${m}`);
  cek(D.POIN_PENTING_SUARA.join(" ").includes("seratus"), "poin penting: suara mengeja seratus");
  cek(tanpaDigit(D.PENUTUP_B) && bersih(D.PENUTUP_B) && /Pak Wayan/.test(D.PENUTUP_B) && /Bu Lastri/.test(D.PENUTUP_B) && /timbangan/.test(D.PENUTUP_B), "penutup B: jembatan ke Sub-Bab C (Bu Lastri membawa timbangan) tanpa digit");
  cek(Object.values(D.TEMA_PITA).every((t) => emojiSah(t.ikon) && t.nama.length >= 7 && t.cara.length > 20 && tanpaDigit(t.cara) && bersih(t.cara)), "tema tiga tahap sah");
  cek(D.TEMA_PITA.pictorial.cara.includes("polos") && D.TEMA_PITA.abstract.cara.includes("kartu"), "tema: Pictorial polos, Abstract kartu");
  cek(D.CONCRETE_PITA === D.CONCRETE && D.PICTORIAL_PITA === D.PICTORIAL && D.ABSTRACT_PITA === D.ABSTRACT && D.MISI_PITA_TEKS === DS.MISI_PITA_TEKS, "nama ekspor untuk pemasang");
}

/* ------------------------------ Berkas ------------------------------ */
{
  const berkas = readdirSync(folderUrl).filter((f) => /\.(ts|tsx)$/.test(f));
  for (const nama of ["logika.ts", "data-sim.ts", "data-kartu.ts", "logika-cpa.ts", "data.ts", "periksa.ts", "JawabPita.tsx", "LangkahPita.tsx", "TahapPita.tsx", "SimulasiBengkelPita.tsx", "GulunganPita.tsx", "TabelPita.tsx"]) cek(berkas.includes(nama), `berkas ${nama} ada`);
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folderUrl), "utf8");
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d || c.codePointAt(0) === 0x1f6de), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}/i.test(s), `${f}: kode emoji tidak melewati U+1FA95`);
    cek(!/buku|kelompok|bernilai|tebak/i.test(s), `${f}: tanpa kata buku, kelompok, bernilai, tebak`);
    cek(!s.includes("\b"), `${f}: tanpa karakter kendali`);
    if (/^(logika|logika-cpa|periksa|data|data-sim|data-kartu)\.ts$/.test(f)) cek(!/from "react"|fetch\(/.test(s), `${f}: tanpa React dan jaringan`);
    cek(!/tempat-k3b1a|kayu-k3b2a|botol-k3b2b|turus-k2b8a|gambar-k2b8b|kartu-k3b1b|urut-k3b1c|tambah-k3b1d|kurang-k3b1e|kali-k3b1f|bagi-k3b1g|ukur-k3b3a|timbang-k3b3c|bandul-k3b3d|LangkahTempat|LangkahKayu|LangkahBotol|SubBabK3B3/.test(s), `${f}: tidak memakai folder bab atau sub-bab lain`);
  }
  // Teks layar tidak memuat kata terlarang.
  const layar = ["LangkahPita.tsx", "TahapPita.tsx", "SimulasiBengkelPita.tsx"].map((f) => readFileSync(new URL(f, folderUrl), "utf8")).join("\n");
  const teksLayar = [...layar.matchAll(/>\s*([^<>{}\n]{4,})\s*</g)].map((m) => m[1]).join(" ");
  cek(!/\b(skor|nilai|soal|tebak|kunci|latihan|teman|kelompok|buku)\b/i.test(teksLayar), "teks layar komponen tanpa kata terlarang");
  cek(/\bTugas\b/.test(layar) && !/>\s*Soal/.test(layar), "teks layar CPA memakai Tugas");
  // Tahap: props sama dengan TahapKayu dan pola visual baru.
  const th = readFileSync(new URL("TahapPita.tsx", folderUrl), "utf8");
  cek(/umum: Umum;\s*rupa: Rupa;\s*soal: SoalMisi\[\];\s*pita:/.test(th) && /teksAkhir: string/.test(th) && /poinPenting\?: boolean/.test(th), "TahapPita: props umum, rupa, soal, pita, teksAkhir, poinPenting");
  cek(/IKON_METODE\[ls\.metode\]/.test(th) && /rupa === "benda" \?/.test(th), "TahapPita: ikon metode hanya pada rupa benda (Pictorial dan Abstract tanpa emoji metode)");
  cek(/export default function TahapPita/.test(th) && /Cari kesalahan/.test(th) && /POIN_PENTING/.test(th) && /PENUTUP_B/.test(th) && /jembatan-sub-bab-c/.test(th), "TahapPita: ekspor, Cari kesalahan, Poin Penting, jembatan ke Sub-Bab C");
  cek(/"bengkel"/.test(th) && /"milimeter"/.test(th) && /"pesanan"/.test(th) && !/"rak"|"kapur"|"nota"|"tirai"|"pos"|"catatan"/.test(th), "TahapPita: pola visual meja bengkel, kertas milimeter, lembar pesanan (berbeda dari bab sebelumnya)");
  cek(!/Perayaan|KEBUN BINATANG MINI MERIAH|konfeti/.test(th), "TahapPita: tanpa perayaan (perayaan akhir bab hanya di Sub-Bab D)");
  const lg = readFileSync(new URL("LangkahPita.tsx", folderUrl), "utf8");
  cek(/export function LangkahPita/.test(lg) && /JawabSuaraPita/.test(lg) && /JawabTulis/.test(lg) && /pilihanSuara\(l, cara\)/.test(lg) && /labelKlik\(l\)/.test(lg), "LangkahPita: ekspor, jawab suara dengan pilihan ketuk, jawab tulis di kanvas, ukuran bersatuan");
  const jw = readFileSync(new URL("JawabPita.tsx", folderUrl), "utf8");
  cek(/gagalSekali/.test(jw) && /Ini jawaban yang benar|jawaban yang benar/.test(jw) && /PilihanKata/.test(jw) && /setCadangan\(true\)/.test(jw) && /e\.error === "not-allowed"/.test(jw), "JawabPita: galat mikrofon dihitung gagal, pilihan ketuk sebagai cadangan, jawaban benar setelah tiga kali salah");
  const sim = readFileSync(new URL("SimulasiBengkelPita.tsx", folderUrl), "utf8");
  cek(/export default function SimulasiBengkelPita/.test(sim) && /onKeadaan/.test(sim) && /MISI_PITA_TEKS/.test(sim), "SimulasiBengkelPita: ekspor, onKeadaan, teks misi");
  for (const [f, nm] of [["GulunganPita.tsx", "GulunganPitaK3B3"], ["TabelPita.tsx", "TabelPitaK3B3"]]) {
    const s = readFileSync(new URL(f, folderUrl), "utf8");
    cek(/speakGuru/.test(s) && /onLanjut/.test(s) && /teksLanjut/.test(s) && /peta-kartu\//.test(s) && new RegExp(`export default function ${nm}`).test(s) && new RegExp(`export \\{ ${nm} \\}`).test(s), `${f}: pembungkus tipis komponen bersama peta-kartu, ekspor ${nm}`);
  }
  // Berkas bersama: Simulasi memasang Bengkel Pita.
  const sk = readFileSync(new URL("../src/components/modul/SimulasiK3Bab3.tsx", import.meta.url), "utf8");
  cek(/SimulasiBengkelPita/.test(sk) && /laporMisiPita\(daftarMisiK3Bab3\("B"\), k, a\.capai\)/.test(sk) && !/Kelas 3 Bab 3 ·/.test(sk), "SimulasiK3Bab3: langkahBengkelPitaB memasang Bengkel Pita, judul tanpa kata Kelas");
  // Berkas lama yang dipertahankan ada (dipakai bab lain dan bank soal).
  for (const f of ["data-k3b3.ts", "dasar-k3b3.tsx", "diagram-k3b3.tsx", "naskah-k3b3.ts", "video-k3b3-umum.tsx", "atur-k3b3.tsx", "eja-k3b3.ts"]) cek(readdirSync(new URL("../src/components/modul/", import.meta.url)).includes(f), `berkas lama ${f} dipertahankan`);
  const ej = readFileSync(new URL("../src/lib/ejaan-inggris-id.ts", import.meta.url), "utf8");
  cek(/ratio table/i.test(ej) && /number line/i.test(ej) && /split strategy/i.test(ej), "ejaan: tiga nama metode global ada");
}

console.log(`Lulus ${lulus}, gagal ${gagal}`);
process.exit(gagal ? 1 : 0);
