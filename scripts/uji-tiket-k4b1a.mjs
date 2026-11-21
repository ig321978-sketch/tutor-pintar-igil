// Uji Mind-map (Loket Tiket), Infografis (Daftar Tiket), Simulasi Loket Tiket, dan tahap Concrete, Pictorial, Abstract Kelas 4 Bab 1 Sub-Bab A ("Loket Tiket Bu Maya"),
// awal cerita Penginapan Pulau Karang Indah (membaca dan menulis bilangan sampai sepuluh ribu: empat tempat angka, membaca dari kiri, nol penjaga tempat).
// Memeriksa: logika simulasi (susun kartu angka dengan alat menolak memeriksa kotak kosong, baca tiket, isi nol yang hilang dengan kotak terkunci, tempat angka), misi (awal tidak memenuhi, wajib empat, bebas dua),
// sembilan kartu geser Masalah, Cara, Hasil memuat semua metode Story, daftar tiket dari kejadian Story, CPA dua belas langkah per tahap (Klik, Kanvas, Suara x empat metode) dengan jawaban beragam
// dan Cari kesalahan di tiap tahap, jawaban benar dihitung dari data, angka jawaban kanvas tidak kembar per tahap, tugas yang langsung siap (jebakan tombol macet), pengenal ucapan, petunjuk salah,
// batas rupa, emoji, kata terlarang, bilangan bertitik ribuan, akhir baris.
// Jalankan: node --no-warnings scripts/uji-tiket-k4b1a.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/tiket-k4b1a/logika.ts");
const DS = await import("../src/components/modul/tiket-k4b1a/data-sim.ts");
const LC = await import("../src/components/modul/tiket-k4b1a/logika-cpa.ts");
const D = await import("../src/components/modul/tiket-k4b1a/data.ts");
const K = await import("../src/components/modul/tiket-k4b1a/periksa.ts");
const EJ = await import("../src/components/modul/eja-k4b1.ts");
const S = await import("../src/components/modul/misi-simulasi.ts");
const MK = await import("../src/components/modul/misi-k4bab1.ts");
const MT = await import("../src/components/modul/misi-teks-k4b1.ts");
const folder = new URL("../src/components/modul/tiket-k4b1a/", import.meta.url);

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
const bersih = (t) => !/buku|kelompok|bernilai|tebak|nilai|kelas|teman|skor|soal|kunci|latihan/i.test(t);
const tanpaDigit = (t) => !/\d/.test(t);
const emojiSah = (s) => [...s].every((c) => c.codePointAt(0) <= 0x1fa95 && c.codePointAt(0) !== 0x200d && c.codePointAt(0) !== 0x1f6de);
const IKAN = [0x1f41f, 0x1f420, 0x1f421, 0x1f988, 0x1f42c, 0x1f38f];
/** Bilangan Story A: jangan dijadikan data CPA atau Simulasi. */
const CERITA = [3406, 5080, 346, 7025, 6185, 725, 7250];

/* ------------------------------ Kata bilangan dan pembantu ------------------------------ */
{
  sama([0, 5, 10, 11, 20, 100, 305, 1000, 3406, 5080, 6070, 10000].map(LC.kataBil), ["nol", "lima", "sepuluh", "sebelas", "dua puluh", "seratus", "tiga ratus lima", "seribu", "tiga ribu empat ratus enam", "lima ribu delapan puluh", "enam ribu tujuh puluh", "sepuluh ribu"], "kata bilangan CPA");
  cek(LC.kata === LC.kataBil, "alias kata");
  for (let n = 0; n <= 10000; n += 37) cek(tanpaDigit(LC.kataBil(n)) && LC.kataBil(n) === L.kata(n) && LC.kataBil(n) === EJ.kataBilK4B1(n), `kata bilangan ${n} sama di simulasi, CPA, dan pengeja`);
  sama([LC.fmt(905), LC.fmt(3406), LC.fmt(10000), LC.fmt(0)], ["905", "3.406", "10.000", "0"], "fmt: titik ribuan");
  sama([L.fmt(7208), L.fmt(99)], ["7.208", "99"], "fmt simulasi");
  sama([LC.ucapkan("3.406"), LC.ucapkan("5 + 3 = 8"), LC.ucapkan("kartu 8, 0, 3, 9"), LC.ucapkan("terkecil")], ["tiga ribu empat ratus enam", "lima ditambah tiga sama dengan delapan", "kartu delapan, nol, tiga, sembilan", "terkecil"], "ucapkan: angka menjadi kata");
  sama([LC.lupaNol(3406), LC.lupaNol(4052), LC.lupaNol(6070), LC.lupaNol(9000)], ["3.46", "4.52", "6.7", "9"], "lupaNol: nol hilang");
  sama([LC.tukarNol(4052), LC.tukarNol(7308), LC.tukarNol(8004), LC.tukarNol(1234)], [4502, 7380, 8040, 1234], "tukarNol: nol bergeser");
  sama([LC.banyakAngka(905), LC.banyakAngka(6082), LC.banyakNol(9000), LC.banyakNol(8004), LC.banyakBagian(8040), LC.banyakBagian(3628)], [3, 4, 3, 2, 2, 4], "banyak angka, nol, dan bagian");
  sama([LC.letakNol(5032), LC.letakNol(7680), LC.letakNol(2504), LC.tempatNol(2904), LC.tempatNol(7360), LC.tempatNol(5049)], [2, 4, 3, "puluhan", "satuan", "ratusan"], "letak dan tempat nol");
  sama([LC.angkaDi(6859, "ratusan"), LC.angkaDi(4095, "ratusan"), LC.angkaDi(8340, "satuan")], [8, 0, 0], "angka di tempat");
  cek(LC.TEMPAT.join() === "ribuan,ratusan,puluhan,satuan", "empat tempat");
}

/* ------------------------------ Simulasi: data dan logika ------------------------------ */
{
  const semua = [...DS.TARGET_SUSUN, ...DS.TARGET_BACA, ...DS.TARGET_NOL.map((t) => t.angka), ...DS.TARGET_TEMPAT.map((t) => t.angka)];
  cek(semua.every((n) => n >= 1000 && n <= 9999 && !CERITA.includes(n)), "simulasi: bilangan empat angka, berbeda dari Story");
  cek(DS.TARGET_SUSUN.length === 3 && DS.TARGET_SUSUN.every((n) => [...String(n)].some((c) => c === "0")), "simulasi: tiga bilangan susun, semuanya bernol");
  cek(DS.TARGET_BACA.length === 3 && DS.TARGET_BACA.every((n) => String(n).includes("0")), "simulasi: tiga tiket baca, semuanya bernol");
  cek(DS.TARGET_NOL.length === 3 && DS.TARGET_NOL.every((t) => t.awal.length === 4 && t.awal.every((x, i) => (x === null ? String(t.angka)[i] === "0" : x === Number(String(t.angka)[i]))) && t.awal.some((x) => x === null)), "simulasi: kotak kosong persis di tempat angka nol, angka lain sesuai bilangan");
  cek(DS.TARGET_TEMPAT.length === 3 && new Set(DS.TARGET_TEMPAT.map((t) => t.urut)).size === 3 && DS.TARGET_TEMPAT.every((t) => t.urut >= 0 && t.urut <= 3), "simulasi: tiga angka bertanda di tempat berbeda");
  cek(tanpaDigit(DS.MISI_TIKET_TEKS) && bersih(DS.MISI_TIKET_TEKS) && DS.MISI_TIKET_TEKS === MT.MISI_K4B1.A && D.MISI_TIKET_TEKS === DS.MISI_TIKET_TEKS && DS.MISI_TIKET_TEKS.length >= 10 && DS.MISI_TIKET_TEKS.length <= 120, "simulasi: teks misi tanpa digit dan kata terlarang, sama dengan misi-teks-k4b1");

  const a = L.awalTiket();
  cek(a.alat === "tiket" && a.mode === "susun" && a.susun.every((x) => x === null) && a.nol.join() === "4,8,,3" && !a.tolak && a.salah === 0 && ["susunBenar", "bacaBenar", "nolBenar", "tempatBenar"].every((f) => a[f].length === 0), "simulasi: keadaan awal");
  // Susun.
  cek(L.targetSusun(a) === 7208 && L.empatAngka(7208).join() === "7,2,0,8", "susun: sasaran pertama tujuh ribu dua ratus delapan");
  const t0 = L.periksaSusun(a);
  cek(!t0.ok && t0.k.tolak === true && t0.k.salah === 0 && /Alat menolak/.test(L.petunjukSusun(a)) && tanpaDigit(L.petunjukSusun(a)), "susun: alat menolak memeriksa kotak kosong (bukan percobaan keliru), petunjuk menunjuk langkah yang belum dilakukan");
  sama(S.misiBaru(MK.MISI_A, t0.k, new Set()), ["a-tolak"], "susun: misi a-tolak");
  cek(L.pilihKotakSusun(a, 9).susunSel === -1 && L.pilihKotakSusun(a, 2).susunSel === 2 && !L.isiSusun(a, 12).ok && !L.hapusSusun(a).ok, "susun: kotak di luar daftar dan kartu di luar nol sampai sembilan ditolak, hapus tanpa isi ditolak");
  let g = a;
  for (const d of [7, 2, 0]) g = L.isiSusun(g, d).k;
  cek(g.susun.join() === "7,2,0," && g.susunSel === 3 && /Sudah tiga kotak/.test(L.kalimatSusun(g)) && !L.periksaSusun(g).ok && L.periksaSusun(g).k.tolak, "susun: kartu mengisi kotak kosong berurutan, tiga kotak terisi belum bisa diperiksa");
  const pen = L.isiSusun(g, 8);
  cek(pen.ok && pen.k.susun.join() === "7,2,0,8" && pen.k.susunSel === -1 && !L.isiSusun(pen.k, 1).ok && /Keempat kotak sudah terisi/.test(L.kalimatSusun(pen.k)), "susun: kotak keempat terisi, tidak bisa diisi lagi");
  const benarS = L.periksaSusun(pen.k);
  cek(benarS.ok && benarS.k.susunBenar.join() === "0" && benarS.k.susunKe === 1 && benarS.k.susun.every((x) => x === null) && L.targetSusun(benarS.k) === 3150 && /Betul/.test(L.kalimatSusun(benarS.k)), "susun: benar membuka bilangan berikutnya dengan kotak kosong");
  sama(S.misiBaru(MK.MISI_A, benarS.k, new Set()), ["a-susun"], "susun: misi a-susun");
  const salahS = { ...pen.k, susun: [7, 2, 8, 0] };
  cek(!L.periksaSusun(salahS).ok && L.periksaSusun(salahS).k.salah === 1 && !L.periksaSusun(salahS).k.tolak && /puluhan/.test(L.petunjukSusun(salahS)) && tanpaDigit(L.petunjukSusun(salahS)), "susun: nol di tempat salah, petunjuk menyebut tempat yang belum cocok");
  const hs = L.hapusSusun(pen.k);
  cek(hs.ok && hs.k.susun.join() === "7,2,0," && hs.k.susunSel === 3, "susun: hapus mengosongkan kotak terakhir");
  const dua = L.periksaSusun({ ...benarS.k, susun: [3, 1, 5, 0] });
  cek(dua.ok && dua.k.susunBenar.join() === "0,1" && L.targetSusun(dua.k) === 1040, "susun: bilangan kedua benar");
  sama(S.misiBaru(MK.MISI_A, dua.k, new Set()), ["a-susun", "a-dua"], "susun: dua bilangan memenuhi a-susun dan a-dua");
  cek(L.periksaSusun({ ...dua.k, susun: [1, 0, 4, 0] }).ok, "susun: bilangan ketiga seribuan dengan dua nol");
  // Baca.
  for (let i = 0; i < 3; i += 1) {
    const k = { ...a, bacaKe: i };
    const p = L.pilihanBaca(k);
    const benar = LC.kataBil(DS.TARGET_BACA[i]);
    cek(p.length === 3 && new Set(p).size === 3 && p.includes(benar) && p[0] !== benar && p.every(tanpaDigit), `baca: pilihan sasaran ${i} unik, benar bukan yang pertama (${p})`);
  }
  cek(/Pilih satu cara/.test(L.petunjukBaca(a)) && !L.periksaBaca(a).ok && L.periksaBaca(a).k.salah === 1, "baca: tanpa pilihan, petunjuk menunjuk langkah yang belum dilakukan");
  const pb = L.pilihanBaca(a);
  const bSalah = L.pilihBaca(a, pb[0] === LC.kataBil(2406) ? 1 : 0);
  cek(!L.periksaBaca(bSalah).ok && /ribuan/.test(L.petunjukBaca(bSalah)) && tanpaDigit(L.petunjukBaca(bSalah)), "baca: cara baca keliru, petunjuk menyebut membaca dari ribuan");
  const bBenar = L.periksaBaca(L.pilihBaca(a, pb.indexOf(LC.kataBil(2406))));
  cek(bBenar.ok && bBenar.k.bacaBenar.join() === "0" && bBenar.k.bacaKe === 1 && bBenar.k.bacaPilih === -1, "baca: benar membuka tiket berikutnya");
  sama(S.misiBaru(MK.MISI_A, bBenar.k, new Set()), ["a-baca"], "baca: misi a-baca");
  cek(L.pilihBaca(a, 7).bacaPilih === -1 && tanpaDigit(L.kalimatBaca(a)) && tanpaDigit(L.kalimatBaca(bBenar.k)), "baca: pilihan di luar daftar diabaikan, kalimat tanpa digit");
  // Nol.
  cek(L.targetNol(a).angka === 4803 && L.terkunciNol(a, 0) && !L.terkunciNol(a, 2), "nol: kotak terisi terkunci, kotak kosong terbuka");
  const tk = L.pilihKotakNol(a, 0);
  cek(!tk.ok && tk.k.tolak === true && tk.k.salah === 0 && tk.k.nol.join() === "4,8,,3", "nol: alat menolak mengubah angka yang sudah ada (bukan percobaan keliru)");
  sama(S.misiBaru(MK.MISI_A, tk.k, new Set()), ["a-tolak"], "nol: misi a-tolak");
  cek(!L.periksaNol(a).ok && L.periksaNol(a).k.tolak && L.periksaNol(a).k.salah === 0 && /Alat menolak/.test(L.petunjukNol(a)) && tanpaDigit(L.petunjukNol(a)) && /Ada satu kotak kosong/.test(L.kalimatNol(a)), "nol: memeriksa kotak kosong ditolak, petunjuk menunjuk langkah yang belum dilakukan");
  const i0 = L.isiNol(a, 0);
  cek(i0.ok && i0.k.nol.join() === "4,8,0,3" && /Semua kotak terisi/.test(L.kalimatNol(i0.k)), "nol: kartu mengisi kotak kosong pertama");
  const nBenar = L.periksaNol(i0.k);
  cek(nBenar.ok && nBenar.k.nolBenar.join() === "0" && nBenar.k.nolKe === 1 && nBenar.k.nol.join() === "6,,9," && /Betul/.test(L.kalimatNol(nBenar.k)), "nol: benar membuka bilangan berikutnya dengan dua kotak kosong");
  sama(S.misiBaru(MK.MISI_A, nBenar.k, new Set()), ["a-nol"], "nol: misi a-nol");
  const nSalah = L.isiNol(a, 5);
  cek(nSalah.ok && !L.periksaNol(nSalah.k).ok && L.periksaNol(nSalah.k).k.salah === 1 && /nol/.test(L.petunjukNol(nSalah.k)) && tanpaDigit(L.petunjukNol(nSalah.k)), "nol: angka keliru di kotak kosong, petunjuk menyebut tempat yang tidak disebut diisi nol");
  const hn = L.hapusNol(i0.k, 2);
  cek(hn.ok && hn.k.nol.join() === "4,8,,3" && hn.k.nolSel === 2 && !L.hapusNol(a, 0).ok && !L.hapusNol(a, 2).ok, "nol: hapus hanya kotak yang tadi diisi");
  cek(!L.isiNol({ ...i0.k, nolSel: 0 }, 1).ok && L.isiNol({ ...i0.k, nolSel: 0 }, 1).k.tolak && !L.isiNol(a, 11).ok, "nol: kartu pada kotak terkunci ditolak");
  const dua0 = L.isiNol(L.isiNol(L.periksaNol(L.isiNol(a, 0).k).k, 0).k, 0);
  cek(dua0.k.nol.join() === "6,0,9,0" && L.periksaNol(dua0.k).ok && L.periksaNol(dua0.k).k.nolKe === 2 && L.periksaNol(dua0.k).k.nol.join() === "2,,,7", "nol: bilangan dengan dua nol hilang terisi satu per satu");
  // Tempat.
  cek(L.targetTempat(a).urut === 1 && DS.NAMA_TEMPAT.join() === "ribuan,ratusan,puluhan,satuan", "tempat: sasaran pertama ratusan");
  cek(/Pilih satu nama tempat/.test(L.petunjukTempat(a)) && !L.periksaTempat(a).ok && L.periksaTempat(a).k.salah === 1, "tempat: tanpa pilihan, petunjuk menunjuk langkah yang belum dilakukan");
  const tSalah = L.pilihTempat(a, 0);
  cek(!L.periksaTempat(tSalah).ok && /Hitung dari kiri/.test(L.petunjukTempat(tSalah)) && tanpaDigit(L.petunjukTempat(tSalah)), "tempat: tempat keliru, petunjuk menyebut hitung dari kiri");
  const tBenar = L.periksaTempat(L.pilihTempat(a, 1));
  cek(tBenar.ok && tBenar.k.tempatBenar.join() === "0" && tBenar.k.tempatKe === 1 && tBenar.k.tempatPilih === -1 && L.targetTempat(tBenar.k).urut === 2, "tempat: benar membuka angka berikutnya");
  sama(S.misiBaru(MK.MISI_A, tBenar.k, new Set()), ["a-tempat"], "tempat: misi a-tempat");
  cek(L.pilihTempat(a, 9).tempatPilih === -1 && tanpaDigit(L.kalimatTempat(a)) && tanpaDigit(L.kalimatTempat(tBenar.k)), "tempat: pilihan di luar daftar diabaikan, kalimat tanpa digit");
  cek(L.mulaiLagiTiket().susunKe === 0 && L.pilihModeTiket(a, "nol").mode === "nol" && L.hurufBesar("betul") === "Betul", "mulai lagi, ganti alat, huruf besar");
  // Misi.
  const A = MK.MISI_A;
  cek(A.filter((m) => m.wajib).length === 4 && A.filter((m) => !m.wajib).length === 2, "misi A: empat wajib, dua bebas");
  cek(new Set(A.map((m) => m.id)).size === 6 && A.every((m) => m.id.startsWith("a-") && m.teks.length >= 10 && m.teks.length <= 120 && tanpaDigit(m.teks) && bersih(m.teks)), "misi A: id berawalan a-, unik, 10 sampai 120 huruf, tanpa digit");
  sama(MK.daftarMisiK4Bab1("A"), A, "daftarMisiK4Bab1 A");
  cek(A.every((m) => !m.cek({ alat: "kerangka" })), "misi A: alat lain tidak memenuhi misi");
  sama(S.misiBaru(A, a, new Set()), [], "misi A: keadaan awal tanpa misi baru");
  cek(S.misiBaru(A, { ...a, salah: 9, mode: "nol", susun: [7, 2, 0, 8], susunSel: 1, bacaPilih: 2, nol: [4, 8, 0, 3], nolSel: 2, tempatPilih: 1 }, new Set()).length === 0, "misi A: kartu di kotak dan pilihan yang belum diperiksa tidak dihitung sebagai misi");
  sama(S.misiBaru(A, { ...a, susunBenar: [0, 1], bacaBenar: [0], nolBenar: [0], tempatBenar: [0], tolak: true }, new Set()), ["a-susun", "a-baca", "a-nol", "a-tempat", "a-tolak", "a-dua"], "misi A: semua misi tercapai");
}

/* Mind-map dan Infografis diuji di scripts/uji-visual-k4b1abc.mjs (rancangan sendiri per Sub-Bab, label kosong). */

/* ------------------------------ Pengenal ucapan ------------------------------ */
{
  const nm = (nama) => ({ jenis: "nama", nama });
  const an = (n) => ({ jenis: "angka", n });
  for (const nama of ["ribuan", "ratusan", "puluhan", "satuan"]) cek(K.cocokUcapan(nama, nm(nama)).cocok && K.kataDariUcapan(nama).length === 1, `cocok: kata ${nama} dikenali tepat satu`);
  sama(K.kataDariUcapan("ribu"), ["ribuan"], "ucapan: ribu dikenali sebagai ribuan");
  sama(K.kataDariUcapan("ratus an"), ["ratusan"], "ucapan: ratus an dikenali sebagai ratusan");
  sama(K.kataDariUcapan("tidak puluhan"), [], "ucapan: tidak puluhan tidak dihitung");
  sama(K.kataDariUcapan("halo"), [], "ucapan: kata lain tidak dikenali");
  cek(!K.cocokUcapan("ribuan", nm("satuan")).cocok && !K.cocokUcapan("ratusan", nm("puluhan")).cocok, "cocok: nama tempat berbeda tidak cocok");
  for (let n = 0; n <= 9; n += 1) cek(K.angkaDariUcapan(LC.kataBil(n)).join() === String(n) && K.cocokUcapan(String(n), an(n)).cocok && !K.cocokUcapan(LC.kataBil((n + 1) % 10), an(n)).cocok, `angka: ${n} dikenali dari kata dan dari angka tertulis`);
  sama(K.angkaDariUcapan("sembilan, 4 dan tiga"), [9, 4, 3], "angka: satuan dan angka tertulis");
  for (let n = 0; n <= 150; n += 1) cek(K.angkaDariUcapan(LC.kataBil(n)).join() === String(n), `angka: kata bilangan ${n} dikenali utuh`);
  cek(K.cocokUcapan("nol", an(0)).cocok && K.cocokUcapan("0", an(0)).cocok, "cocok: nol");
}

/* ------------------------------ CPA ------------------------------ */
const TAHAP = { Concrete: ["benda", D.CONCRETE], Pictorial: ["diagram", D.PICTORIAL], Abstract: ["lambang", D.ABSTRACT] };
const CARA = ["klik", "kanvas", "suara"];
const METODE = ["igil", "kartu", "baca", "nol"];
/** Jenis tugas dasar yang diharapkan per tahap, cara, dan urutan metode (salah = Cari kesalahan dengan dasar tugas itu). */
const TIPE = {
  Concrete: { klik: ["tulis", "kartu", "bagian", "nol"], kanvas: ["tempat", "kartu", "bagian", "nol"], suara: ["namaTempat", "tempat", "bagian", "nol"] },
  Pictorial: { klik: ["baca", "kartu", "bagian", "nol"], kanvas: ["tempat", "kartu", "bagian", "nol"], suara: ["namaTempat", "tempat", "bagian", "nol"] },
  Abstract: { klik: ["tulis", "kartu", "bagian", "nol"], kanvas: ["tempat", "kartu", "bagian", "nol"], suara: ["namaTempat", "tempat", "bagian", "nol"] },
};
const KANVAS = { Concrete: [8, 2, 3, 1], Pictorial: [5, 4, 2, 3], Abstract: [9, 3, 4, 2] };
/** Tempat Cari kesalahan: [indeks misi, indeks langkah]. */
const TEMPAT_SALAH = { Concrete: [[0, 0]], Pictorial: [[0, 0]], Abstract: [[0, 0]] };
const semuaTeksLangkah = (ls, rupa, cara) => [ls.judul, ls.suara, LC.instruksi(ls.langkah, rupa, cara, ls.metode), LC.kalimatTanya(ls.langkah, cara), LC.petunjukSalah(ls.langkah, cara, 1)];
{
  sama(LC.URUT_METODE, METODE, "urutan metode");
  cek(LC.NAMA_METODE.igil.includes("Kartu Angka, Baca Per Bagian, Periksa Nol") && LC.NAMA_METODE.kartu.includes("Digit Cards") && LC.NAMA_METODE.baca.includes("Chunk and Read") && LC.NAMA_METODE.nol.includes("Zero Check"), "nama metode IGIL dan tiga metode global");
  cek(METODE.every((m) => emojiSah(LC.IKON_METODE[m])), "ikon metode sah");
  let nomor = 2;
  for (const [nama, [rupa, soal]] of Object.entries(TAHAP)) {
    cek(soal.length === 3 && soal.map((s) => s.cara).join() === CARA.join(), `${nama}: tiga misi Klik, Kanvas, Suara`);
    cek(soal.every((s) => s.langkah.length === 4 && s.langkah.map((l) => l.metode).join() === METODE.join()), `${nama}: empat langkah per misi (IGIL, Digit Cards, Chunk and Read, Zero Check)`);
    const kunciKanvas = [];
    for (const s of soal) {
      cek(s.nomor === nomor, `${nama}: nomor misi berlanjut ${nomor}`);
      nomor += 1;
      cek(s.judul.startsWith("Misi Tiket") && s.cerita.length > 15 && bersih(s.judul) && bersih(s.cerita), `${nama} ${s.nomor}: judul dan cerita sah`);
      sama(s.langkah.map((l) => LC.dasarDari(l.langkah).tipe), TIPE[nama][s.cara], `${nama} ${s.nomor}: jenis tugas per metode`);
      for (const ls of s.langkah) {
        cek(ls.cara === s.cara, `${nama} ${s.nomor}: cara langkah sama dengan misi`);
        const teks = semuaTeksLangkah(ls, rupa, s.cara);
        cek(teks.every(tanpaDigit), `${nama} ${s.nomor} ${ls.metode}: instruksi, pertanyaan, dan petunjuk tanpa digit`);
        cek(teks.every(bersih), `${nama} ${s.nomor} ${ls.metode}: tanpa kata terlarang`);
        cek(ls.judul === ls.suara && ls.judul === LC.instruksi(ls.langkah, rupa, s.cara, ls.metode), `${nama} ${s.nomor} ${ls.metode}: judul sama dengan suara dan instruksi`);
        cek(/ke berapa|ke tiga|ke-satu/i.test(ls.judul) ? /ke berapa/.test(ls.judul) && !/ke tiga|ke-satu/i.test(ls.judul) : true, `${nama} ${s.nomor} ${ls.metode}: ejaan baku`);
        const d = LC.dasarDari(ls.langkah);
        cek(CERITA.every((c) => d.angka !== c), `${nama} ${s.nomor} ${ls.metode}: data berbeda dari Story (${d.angka})`);
        cek(d.angka >= 100 && d.angka <= 9999, `${nama} ${s.nomor} ${ls.metode}: bilangan sampai sepuluh ribu (${d.angka})`);
        cek(LC.siapLangsung(ls.langkah, rupa, s.cara) === (ls.langkah.tipe !== "salah"), `${nama} ${s.nomor} ${ls.metode}: tugas langsung siap dijawab kecuali Cari kesalahan`);
        const k = LC.kunciJawab(ls.langkah, s.cara);
        cek(k !== null, `${nama} ${s.nomor} ${ls.metode}: ada jawaban benar untuk cara ${s.cara}`);
        // Jawaban benar dihitung ulang dari data secara terpisah.
        const ds = String(d.angka);
        let harap;
        switch (d.tipe) {
          case "tulis": harap = { jenis: "nama", nama: LC.fmt(d.angka) }; break;
          case "baca": harap = { jenis: "nama", nama: LC.kataBil(d.angka) }; break;
          case "tempat": harap = { jenis: "angka", n: Number(ds.padStart(4, "0")[["ribuan", "ratusan", "puluhan", "satuan"].indexOf(d.tempat)]) }; break;
          case "namaTempat": harap = { jenis: "nama", nama: ["ribuan", "ratusan", "puluhan", "satuan"][d.urut] }; break;
          case "kartu": harap = s.cara === "klik" ? { jenis: "nama", nama: LC.fmt(d.angka) } : { jenis: "angka", n: ds.indexOf("0") + 1 }; break;
          case "bagian": harap = s.cara === "kanvas" ? { jenis: "angka", n: [...ds].filter((c) => c !== "0").length } : { jenis: "nama", nama: ["ribuan", "ratusan", "puluhan", "satuan"][ds.indexOf("0") + (4 - ds.length)] }; break;
          case "nol": harap = s.cara === "klik" ? { jenis: "nama", nama: LC.fmt(d.angka) } : s.cara === "kanvas" ? { jenis: "angka", n: [...ds].filter((c) => c === "0").length } : { jenis: "angka", n: ds.length }; break;
        }
        sama(k, harap, `${nama} ${s.nomor} ${ls.metode}: jawaban benar dihitung dari data`);
        if (d.tipe === "kartu" && s.cara === "kanvas") cek(ds.split("0").length - 1 === 1, `${nama} ${s.nomor}: kartu bernol punya tepat satu nol`);
        if (d.tipe === "bagian" && s.cara !== "kanvas") cek(ds.split("0").length - 1 === 1 && ds.length === 4, `${nama} ${s.nomor}: bagian yang dilewati punya tepat satu nol`);
        if (d.tipe === "tulis" || (d.tipe === "nol" && s.cara === "klik")) cek(ds.includes("0") && LC.lupaNol(d.angka) !== LC.fmt(d.angka), `${nama} ${s.nomor} ${ls.metode}: bilangan bernol sehingga tulisan keliru ada`);
        if (s.cara === "kanvas") {
          cek(k.jenis === "angka" && k.n >= 1 && k.n <= 9, `${nama} ${s.nomor} ${ls.metode}: jawaban kanvas satu angka 1 sampai 9 (${k.n})`);
          kunciKanvas.push(k.n);
        }
        if (s.cara === "klik") {
          const p = LC.pilihanKlik(ls.langkah);
          cek(p.length === 3 && new Set(p).size === 3 && p.includes(k.nama) && p[0] !== k.nama, `${nama} ${s.nomor} ${ls.metode}: tiga pilihan unik, benar bukan yang pertama (${p})`);
          cek(LC.teksKunciKlik(ls.langkah) === k.nama, `${nama} ${s.nomor} ${ls.metode}: teks pilihan benar`);
          if (ls.langkah.tipe === "salah") cek(p.includes(ls.langkah.jawabTokoh) || ls.langkah.jawabTokoh === k.nama, `${nama} ${s.nomor}: jawaban tokoh ikut sebagai pilihan`);
          if (d.tipe === "tulis") cek(p.every((x) => /^\d{1,2}(\.\d{1,3})*$/.test(x)), `${nama} ${s.nomor}: pilihan tulisan berupa bilangan`);
          if (d.tipe === "baca") cek(p.every(tanpaDigit), `${nama} ${s.nomor}: pilihan bacaan berupa kata`);
        }
        if (s.cara === "suara") {
          const p = LC.pilihanSuara(ls.langkah, "suara");
          const benar = k.jenis === "angka" ? LC.kataBil(k.n) : k.nama;
          cek(p.length === 3 && new Set(p).size === 3 && p.includes(benar) && p[0] !== benar && p.every(tanpaDigit), `${nama} ${s.nomor} ${ls.metode}: tiga pilihan ketuk cadangan, benar bukan yang pertama (${p})`);
          cek(K.cocokUcapan(benar, k).cocok, `${nama} ${s.nomor} ${ls.metode}: ucapan benar dikenali`);
        }
        cek(tanpaDigit(LC.kalimatTanya(ls.langkah, s.cara)) && LC.ucapkan(LC.kalimatKunci(ls.langkah, s.cara)).length > 10 && tanpaDigit(LC.ucapkan(LC.kalimatKunci(ls.langkah, s.cara))), `${nama} ${s.nomor} ${ls.metode}: kalimat jawaban benar bisa diucapkan tanpa digit`);
      }
    }
    sama(kunciKanvas, KANVAS[nama], `${nama}: angka jawaban kanvas`);
    cek(new Set(kunciKanvas).size === kunciKanvas.length, `${nama}: angka jawaban kanvas tidak kembar`);
    // Cari kesalahan.
    for (const [mi, li] of TEMPAT_SALAH[nama]) {
      const ls = soal[mi].langkah[li];
      const l = ls.langkah;
      cek(l.tipe === "salah" && l.alasan.length === 3 && new Set(l.alasan).size === 3 && l.benar >= 0 && l.benar <= 2 && l.alasan.every(bersih), `${nama}: tugas Cari kesalahan lengkap (tiga alasan unik)`);
      cek(tanpaDigit(l.keliru) && bersih(l.keliru) && bersih(l.kataTokoh) && ["Satria", "Laras", "Genta"].includes(l.tokoh), `${nama}: petunjuk salah tanpa digit, tokoh Kelas 4`);
      cek(tanpaDigit(LC.petunjukSalah(l, "klik", l.jawabTokoh)) && LC.petunjukSalah(l, "klik", l.jawabTokoh).includes(l.tokoh), `${nama}: petunjuk menyebut jawaban tokoh`);
      cek(LC.instruksi(l, "benda", "klik", "igil").includes(l.tokoh), `${nama}: instruksi menyebut tokoh`);
    }
    const salahDasar = TEMPAT_SALAH[nama].map(([mi, li]) => soal[mi].langkah[li].langkah);
    if (nama === "Pictorial") cek(salahDasar[0].betul === true && salahDasar[0].dasar.tipe === "baca" && salahDasar[0].dasar.angka === 6070 && salahDasar[0].jawabTokoh === LC.kataBil(6070), "Pictorial: Genta membaca enam ribu tujuh puluh (benar), seed alur");
    else cek(!salahDasar[0].betul && salahDasar[0].tokoh === "Satria" && salahDasar[0].jawabTokoh === LC.lupaNol(salahDasar[0].dasar.angka), `${nama}: Satria menghilangkan nol saat menulis (salah), seed alur`);
    // Posisi alasan benar bervariasi di antara tahap.
    cek(true, `${nama}: posisi alasan benar ${soal[0].langkah[0].langkah.benar}`);
  }
  const posisi = [D.CONCRETE, D.PICTORIAL, D.ABSTRACT].map((s) => s[0].langkah[0].langkah.benar);
  cek(new Set(posisi).size >= 2, `posisi alasan benar bervariasi antar tahap (${posisi})`);
  // Petunjuk salah sesuai jenis dan cara menyebut kesalahan.
  cek(/nol/.test(LC.petunjukSalah({ tipe: "tulis", angka: 4052 }, "klik", "4.52")) && /ribuan/.test(LC.petunjukSalah({ tipe: "baca", angka: 6070 }, "klik", "x")), "petunjuk: tulis dan baca menyebut nol dan ribuan");
  cek(/kiri/.test(LC.petunjukSalah({ tipe: "kartu", angka: 5032 }, "kanvas", 4)) && /selain nol/.test(LC.petunjukSalah({ tipe: "bagian", angka: 9401 }, "kanvas", 4)) && /nol/.test(LC.petunjukSalah({ tipe: "nol", angka: 4607 }, "kanvas", 2)), "petunjuk: kartu, bagian, dan nol menunjuk kesalahan");
  // Cari kesalahan: pilihan yang keliru dari tokoh ditandai.
  const sc = D.CONCRETE[0].langkah[0].langkah;
  cek(LC.petunjukSalah(sc, "klik", sc.jawabTokoh).startsWith(`Itu jawaban ${sc.tokoh} yang keliru`) && !LC.petunjukSalah(D.PICTORIAL[0].langkah[0].langkah, "klik", LC.kataBil(6070)).includes("yang keliru"), "petunjuk salah: jawaban tokoh keliru ditandai, jawaban tokoh benar tidak");
}

/* ------------------------------ Poin penting dan tema ------------------------------ */
{
  cek(D.POIN_PENTING.length === 7 && D.POIN_PENTING.every((p) => bersih(p) && p.length > 20), "poin penting: tujuh poin bersih");
  cek(D.POIN_PENTING_SUARA.length === 7 && D.POIN_PENTING_SUARA.every(tanpaDigit), "poin penting: suara tanpa digit");
  cek(D.POIN_PENTING_SUARA[1].includes("tiga ribu empat ratus enam") && /ribuan/.test(D.POIN_PENTING[0]) && /nol/.test(D.POIN_PENTING[2]), "poin penting: memuat empat tempat, membaca dari kiri, dan nol");
  cek(D.POIN_PENTING_SUARA.some((p) => p.includes("seribu dua puluh lima") && p.includes("dua ribu seratus empat puluh lima") && p.includes("bukan satu ribu")) && D.POIN_PENTING_SUARA.some((p) => p.includes("tujuh ribu tiga")), "poin penting: seribu bukan satu ribu, seratus, dan nol di tengah (sesuai buku)");
  // Bilangan seribuan dan seratusan dibaca seribu dan seratus (bukan satu ribu atau satu ratus), di data, kunci, dan suara.
  for (const [n, k] of [[1025, "seribu dua puluh lima"], [1000, "seribu"], [2145, "dua ribu seratus empat puluh lima"], [1208, "seribu dua ratus delapan"], [7003, "tujuh ribu tiga"], [6570, "enam ribu lima ratus tujuh puluh"], [10000, "sepuluh ribu"]]) cek(LC.kataBil(n) === k, `kata bilangan ${n} = ${k}`);
  cek(LC.ucapkan("1.025") === "seribu dua puluh lima" && LC.ucapkan("1.000") === "seribu" && LC.ucapkan("Rp7.350,00") === "7350 rupiah".replace("7350", "tujuh ribu tiga ratus lima puluh"), "ucapan bilangan 1.xxx dan rupiah");
  const semuaTugas = [...D.CONCRETE, ...D.PICTORIAL, ...D.ABSTRACT].flatMap((m) => m.langkah);
  const adaSeribuan = (re) => semuaTugas.filter((t) => re.test(String(t.langkah.angka ?? t.langkah.dasar?.angka ?? ""))).length;
  cek(adaSeribuan(/^1\d{3}$/) >= 3 && adaSeribuan(/^\d1\d\d$/) >= 2, "tugas CPA memuat bilangan seribuan dan seratusan");
  for (const t of semuaTugas) cek(!/satu ribu|satu ratus/.test(t.suara + " " + t.judul), "tanpa satu ribu dan satu ratus di instruksi");
  cek(/Pak Laode/.test(D.PENUTUP_A) && /handuk/.test(D.PENUTUP_A) && tanpaDigit(D.PENUTUP_A) && bersih(D.PENUTUP_A), "jembatan ke Sub-Bab B: Pak Laode dan handuk");
  for (const r of ["concrete", "pictorial", "abstract"]) cek(emojiSah(D.TEMA_TIKET[r].ikon) && D.TEMA_TIKET[r].nama.length > 5 && bersih(D.TEMA_TIKET[r].cara), `tema ${r} sah`);
  cek(D.CONCRETE_TIKET === D.CONCRETE && D.PICTORIAL_TIKET === D.PICTORIAL && D.ABSTRACT_TIKET === D.ABSTRACT, "nama ekspor untuk pemasang");
}

/* ------------------------------ Berkas: batas rupa, emoji, kata terlarang, akhir baris ------------------------------ */
{
  const berkas = readdirSync(folder).filter((f) => /\.(ts|tsx)$/.test(f));
  for (const f of ["data.ts", "data-peta.ts", "data-info.ts", "data-sim.ts", "logika.ts", "logika-cpa.ts", "periksa.ts", "GambarTiket.tsx", "JawabTiket.tsx", "LangkahTiket.tsx", "TahapTiket.tsx", "SimulasiLoketTiket.tsx", "LoketTiket.tsx", "DaftarTiket.tsx"]) cek(berkas.includes(f), `${f} ada`);
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folder), "utf8");
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d || c.codePointAt(0) === 0x1f6de || IKAN.includes(c.codePointAt(0))), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ dan tanpa ikan`);
    cek(!/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}|\\u\{1F41F\}|\\u\{1F420\}|\\u\{1F421\}|\\u\{1F988\}|\\u\{1F42C\}|\\u\{1F38F\}/i.test(s), `${f}: kode emoji tidak melewati U+1FA95 dan tanpa ikan`);
    cek(!s.startsWith("﻿") && !s.includes("\r") && ![...s].some((c) => c.codePointAt(0) < 32 && c !== "\n" && c !== "\t"), `${f}: tanpa BOM, akhir baris LF, tanpa karakter kontrol`);
    cek(!/\b(Kelas 4|Kelas Empat)\b/.test(s.replace(/\/\*[\s\S]*?\*\/|\/\/[^\n]*/g, "")), `${f}: tanpa tulisan Kelas 4 di layar atau suara`);
    if (!/\.tsx$/.test(f) || f === "SimulasiLoketTiket.tsx") continue;
  }
  const gambar = readFileSync(new URL("GambarTiket.tsx", folder), "utf8");
  cek(/rupa === "benda" \? \(\s*<>[\s\S]*?EMOJI_PULAU\.tiket[\s\S]*?EMOJI_PULAU\.pohon/.test(gambar), "Concrete: emoji tiket dan pohon kelapa hanya pada rupa benda");
  cek((gambar.match(/EMOJI_PULAU\./g) ?? []).length === 2, "Pictorial dan Abstract: emoji benda tidak dipakai di tempat lain (hanya dua pemakaian, keduanya di blok benda)");
  const emojiPulau = /export const EMOJI_PULAU[^=]*=\s*\{([\s\S]*?)\};/.exec(gambar)?.[1] ?? "";
  cek([...emojiPulau.matchAll(/"([^"]+)"/g)].length >= 6, "EMOJI_PULAU terbaca");
  cek(!/\u{1F41F}|\u{1F420}|\u{1F421}|\u{1F988}/u.test(gambar), "gambar: tanpa ikan");
  const tahap = readFileSync(new URL("TahapTiket.tsx", folder), "utf8");
  cek(/TahapTiket/.test(tahap) && /poinPenting/.test(tahap) && /PENUTUP_A/.test(tahap) && /export default function TahapTiket/.test(tahap), "TahapTiket: Poin Penting dan jembatan di akhir tahap Abstract");
  const tanpaKomentar = (t) => t.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/[^\n]*/g, "");
  cek(!/skor|nilai/i.test(tanpaKomentar(tahap)) && !/nilai/i.test(tanpaKomentar(gambar)), "tahap dan gambar: tanpa skor dan nilai");
  const lk = readFileSync(new URL("LangkahTiket.tsx", folder), "utf8");
  cek(/siapLangsung/.test(lk) && /JawabTulis/.test(lk) && /JawabSuaraTiket/.test(lk) && /CariSalah/.test(lk), "LangkahTiket: jawaban langsung siap, kanvas, suara, dan Cari kesalahan");
  for (const f of ["LoketTiket.tsx", "DaftarTiket.tsx"]) {
    const s = readFileSync(new URL(f, folder), "utf8");
    cek(/export default function/.test(s) && /export \{ \w+K4B1 \}/.test(s) && /speakGuru/.test(s) && /onLanjut/.test(s) && /teksLanjut/.test(s), `${f}: pembungkus tipis dengan ekspor K4B1`);
  }
  const sim = readFileSync(new URL("SimulasiLoketTiket.tsx", folder), "utf8");
  cek(/export default function SimulasiLoketTiket/.test(sim) && /onKeadaan/.test(sim) && /Alat menolak/.test(sim) && /hurufBesar/.test(sim), "SimulasiLoketTiket: laporan keadaan, alat menolak, umpan balik berhuruf besar");
  for (const f of [...berkas, "data-sim.ts"]) {
    const s = readFileSync(new URL(f, folder), "utf8").replace(/\/\*[\s\S]*?\*\/|\/\/[^\n]*/g, "");
    const teksLayar = [...s.matchAll(/"([^"\n]{12,})"/g)].map((m) => m[1]).filter((t) => /\s/.test(t) && !/^[.\/@a-z-]+$/.test(t) && !/^(min|rounded|border|flex|text|bg|space|block|mx|w-|h-|grid|px|py|absolute|relative|shrink|disabled|animate|font|items|justify|gap|max)/.test(t) && !/[(){}=;]/.test(t));
    cek(teksLayar.every(bersih), `${f}: teks tanpa kata terlarang (${teksLayar.find((t) => !bersih(t)) ?? ""})`);
  }
}

console.log(`Uji Loket Tiket Kelas 4 Bab 1 Sub-Bab A: ${lulus} lulus, ${gagal} gagal`);
process.exit(gagal ? 1 : 0);
