// Uji Mind-map (Rak Permen), Infografis (Papan Stok), Simulasi Rak Stok, dan tahap Concrete, Pictorial, Abstract Kelas 3 Bab 1 Sub-Bab A ("Toples Permen Pak Joko"),
// awal cerita Toko Kelontong Pak Joko.
// Memeriksa: logika simulasi (tuang dengan tukar sepuluh jadi satu otomatis, papan, baca, tulis dengan nol penjaga tempat), misi (awal tidak memenuhi, wajib empat, bebas dua),
// rak permen (sembilan kartu geser Masalah, Cara, Hasil memuat semua metode Story), papan stok dari kejadian Story, CPA dua belas langkah per tahap (Klik, Kanvas, Suara x empat metode)
// dengan jawaban beragam dan Cari kesalahan di tiap tahap, kunci dihitung dari data, angka jawaban tidak kembar per tahap, tugas yang langsung siap (jebakan tombol macet), pengenal ucapan,
// petunjuk salah, batas rupa, emoji, kata terlarang, akhir baris.
// Jalankan: node --no-warnings scripts/uji-tempat-k3b1a.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/tempat-k3b1a/logika.ts");
const DS = await import("../src/components/modul/tempat-k3b1a/data-sim.ts");
const DK = await import("../src/components/modul/tempat-k3b1a/data-kartu.ts");
const LC = await import("../src/components/modul/tempat-k3b1a/logika-cpa.ts");
const D = await import("../src/components/modul/tempat-k3b1a/data.ts");
const K = await import("../src/components/modul/tempat-k3b1a/periksa.ts");
const S = await import("../src/components/modul/misi-simulasi.ts");
const MK = await import("../src/components/modul/misi-k3bab1.ts");
const MT = await import("../src/components/modul/misi-teks-k3b1.ts");
const folderUrl = new URL("../src/components/modul/tempat-k3b1a/", import.meta.url);

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
const CERITA = new Set([634, 703, 405, 900, 530, 503, 73, 45, 700, 70, 325, 417, 508, 716, 302]);

/* ------------------------------ Kata bilangan ------------------------------ */
{
  sama([0, 1, 9, 10, 11, 15, 20, 38, 100, 101, 110, 205, 316, 999].map(LC.kataBil), ["nol", "satu", "sembilan", "sepuluh", "sebelas", "lima belas", "dua puluh", "tiga puluh delapan", "seratus", "seratus satu", "seratus sepuluh", "dua ratus lima", "tiga ratus enam belas", "sembilan ratus sembilan puluh sembilan"], "kata bilangan CPA");
  cek(LC.kata === LC.kataBil, "alias kata");
  for (let n = 1; n <= 999; n += 1) cek(tanpaDigit(LC.kataBil(n)) && LC.kataBil(n) === L.kata(n), `kata bilangan ${n} sama di simulasi dan CPA`);
}

/* ------------------------------ Simulasi: data dan logika ------------------------------ */
{
  const BS = DS.BARANG_STOK;
  cek(BS.length === 3 && new Set(BS.map((b) => b.id)).size === 3 && new Set(BS.map((b) => b.emoji)).size === 3, "simulasi: tiga barang stok unik");
  for (const b of BS) cek(emojiSah(b.emoji) && tanpaDigit(b.nama) && bersih(b.nama) && b.satuan.length === 3 && b.satuan.every((x) => tanpaDigit(x) && bersih(x) && x.length >= 3), `${b.id}: emoji dan nama sah, tiga satuan`);
  cek(!/permen|toples|bungkus|butir/i.test(BS.map((b) => b.nama).join(" ")), "simulasi: barang berbeda dari Story (permen)");
  for (const [nama, daftar] of [["papan", DS.TARGET_PAPAN], ["baca", DS.TARGET_BACA], ["tulis", DS.TARGET_TULIS]]) cek(daftar.length === 3 && daftar.every((n) => n >= 100 && n <= 999 && !CERITA.has(n)), `simulasi: tiga sasaran ${nama} tiga angka, berbeda dari Story`);
  cek(DS.TARGET_TULIS.filter((n) => String(n).includes("0")).length === 2, "simulasi: dua sasaran tulis memuat nol penjaga tempat");
  cek(tanpaDigit(DS.MISI_STOK_TEKS) && bersih(DS.MISI_STOK_TEKS) && DS.MISI_STOK_TEKS === MT.MISI_K3B1.A && D.MISI_STOK_TEKS === DS.MISI_STOK_TEKS, "simulasi: teks misi tanpa digit dan kata terlarang, sama dengan misi-teks-k3b1");

  const a = L.awalStok();
  cek(a.alat === "stok" && a.mode === "tuang" && L.jumlahStok(a) === 0 && !a.tukarButir && !a.tukarBungkus && a.papanBenar.length === 0 && a.bacaBenar.length === 0 && a.tulisBenar.length === 0, "simulasi: keadaan awal kosong");
  // Tuang: sepuluh butir lepas menjadi satu bungkus otomatis.
  let t = a;
  for (let i = 0; i < 9; i += 1) t = L.tambahButir(t).k;
  cek(t.butir === 9 && t.bungkus === 0 && !t.tukarButir && L.jumlahStok(t) === 9, "tuang: sembilan butir belum ditukar");
  const r10 = L.tambahButir(t);
  cek(r10.ok && r10.tukar === "butir" && r10.k.butir === 0 && r10.k.bungkus === 1 && r10.k.tukarButir && L.jumlahStok(r10.k) === 10, "tuang: butir kesepuluh langsung menjadi satu bungkus");
  sama(S.misiBaru(MK.MISI_A, r10.k, new Set()), ["a-tukar"], "tuang: misi a-tukar");
  // Sepuluh bungkus menjadi satu dus.
  let u = a;
  for (let i = 0; i < 9; i += 1) u = L.tambahBungkus(u).k;
  cek(u.bungkus === 9 && u.dus === 0 && !u.tukarBungkus, "tuang: sembilan bungkus belum ditukar");
  const b10 = L.tambahBungkus(u);
  cek(b10.ok && b10.tukar === "bungkus" && b10.k.bungkus === 0 && b10.k.dus === 1 && b10.k.tukarBungkus && !b10.k.tukarButir && L.jumlahStok(b10.k) === 100, "tuang: bungkus kesepuluh langsung menjadi satu dus");
  sama(S.misiBaru(MK.MISI_A, b10.k, new Set()), ["a-ratusan"], "tuang: misi a-ratusan");
  // Tuang butir sampai penukaran beruntun: 99 butir + 1.
  let w = { ...a, butir: 9, bungkus: 9, dus: 2 };
  const beruntun = L.tambahButir(w);
  cek(beruntun.ok && beruntun.k.butir === 0 && beruntun.k.bungkus === 0 && beruntun.k.dus === 3 && beruntun.tukar === "bungkus" && beruntun.k.tukarButir && beruntun.k.tukarBungkus, "tuang: penukaran beruntun, sepuluh butir dan sepuluh bungkus menjadi satu dus");
  cek(L.tambahDus(a).k.dus === 1 && L.jumlahStok(L.tambahDus(a).k) === 100 && !L.tambahDus(a).k.tukarButir, "tuang: satu dus penuh seratus");
  w = { ...a, butir: 9, bungkus: 9, dus: 9 };
  cek(!L.tambahButir(w).ok && !L.tambahBungkus(w).ok && !L.tambahDus(w).ok && L.jumlahStok(w) === 999, "tuang: rak penuh sampai sembilan ratus sembilan puluh sembilan");
  cek(!L.tambahBungkus({ ...a, dus: 9, bungkus: 9 }).ok && L.tambahBungkus({ ...a, dus: 9, bungkus: 8 }).ok, "tuang: bungkus terakhir muat sampai batas");
  cek(L.jumlahStok(L.kosongkanTuang({ ...w, tukarButir: true })) === 0 && L.kosongkanTuang({ ...w, tukarButir: true }).tukarButir, "tuang: kosongkan rak tidak menghapus catatan penukaran");
  cek(L.kalimatTuang(a).length > 10 && tanpaDigit(L.kalimatTuang(a)) && /tiga ratus dua puluh lima/.test(L.kalimatTuang({ ...a, dus: 3, bungkus: 2, butir: 5 })) && tanpaDigit(L.kalimatTuang({ ...a, dus: 3, bungkus: 2, butir: 5 })), "tuang: kalimat tanpa digit dan menyebut nama bilangan");
  cek(tanpaDigit(L.kalimatTukar("butir", a)) && tanpaDigit(L.kalimatTukar("bungkus", a)) && /Sepuluh jadi satu/.test(L.kalimatTukar("butir", a)), "tuang: kalimat penukaran");
  cek(L.pilihBarang(a, 2).barang === 2 && L.pilihBarang(a, 9).barang === 0 && L.satuanBarang(L.pilihBarang(a, 1))[2] === "kardus", "barang: pilih barang stok");
  cek(L.pilihModeStok(a, "baca").mode === "baca", "mode: ganti alat");
  // Papan: dari benda ke angka.
  const tp = L.targetPapan(a);
  sama([tp, L.digit(tp, 0), L.digit(tp, 1), L.digit(tp, 2)], [253, 2, 5, 3], "papan: sasaran pertama");
  let p = L.pilihModeStok(a, "papan");
  p = L.ubahPapan(L.ubahPapan(p, 0, 1).k, 0, 1).k;
  const salahP = L.periksaPapan(p);
  cek(!salahP.ok && salahP.k.salah === 1 && salahP.k.papanBenar.length === 0 && /puluhan|satuan|ratusan/.test(L.petunjukPapan(p)) && tanpaDigit(L.petunjukPapan(p)), "papan: isian keliru");
  cek(/ratusan/.test(L.petunjukPapan(L.pilihModeStok({ ...a, papan: [1, 5, 3] }, "papan"))) === true, "papan: petunjuk menyebut tempat yang keliru");
  p = { ...p, papan: [2, 5, 3] };
  const bP = L.periksaPapan(p);
  cek(bP.ok && bP.k.papanBenar.join() === "0" && bP.k.papanKe === 1 && bP.k.papan.join() === "0,0,0" && L.targetPapan(bP.k) === 416, "papan: isian tepat membuka sasaran berikutnya");
  sama(S.misiBaru(MK.MISI_A, bP.k, new Set()), ["a-papan"], "papan: misi a-papan");
  cek(!L.ubahPapan(a, 0, -1).ok && !L.ubahPapan({ ...a, papan: [9, 0, 0] }, 0, 1).ok && !L.ubahPapan(a, 5, 1).ok && L.ubahPapan(a, 1, 1).k.papan.join() === "0,1,0", "papan: angka nol sampai sembilan");
  cek(tanpaDigit(L.kalimatPapan(a)) && tanpaDigit(L.kalimatPapan(bP.k)), "papan: kalimat tanpa digit");
  // Baca.
  const tb = L.targetBaca(a);
  const pil = L.pilihanBaca(tb);
  cek(tb === 872 && pil.length === 3 && new Set(pil).size === 3 && pil.includes("delapan ratus tujuh puluh dua") && pil[0] !== "delapan ratus tujuh puluh dua" && pil.every(tanpaDigit), "baca: tiga cara baca, yang benar bukan yang pertama");
  for (const n of DS.TARGET_BACA) cek(L.pilihanBaca(n)[0] !== L.kata(n) && new Set(L.pilihanBaca(n)).size === 3, `baca: pilihan ${n} unik dan benar bukan yang pertama`);
  const salahB = L.periksaBaca(L.pilihBaca(a, pil.findIndex((x) => x !== "delapan ratus tujuh puluh dua")));
  cek(!salahB.ok && salahB.k.salah === 1 && /dari kiri/.test(L.petunjukBaca(L.pilihBaca(a, 0))), "baca: cara baca keliru");
  cek(/pilih/i.test(L.petunjukBaca(a)) && !L.periksaBaca(a).ok, "baca: tanpa pilihan tidak benar");
  const bB = L.periksaBaca(L.pilihBaca(a, pil.indexOf("delapan ratus tujuh puluh dua")));
  cek(bB.ok && bB.k.bacaBenar.join() === "0" && bB.k.bacaKe === 1 && bB.k.bacaPilih === -1, "baca: cara baca tepat membuka sasaran berikutnya");
  sama(S.misiBaru(MK.MISI_A, bB.k, new Set()), ["a-baca"], "baca: misi a-baca");
  cek(L.pilihBaca(a, 7).bacaPilih === -1 && tanpaDigit(L.kalimatBaca(bB.k)), "baca: pilihan di luar daftar diabaikan");
  // Tulis dengan nol penjaga tempat.
  const tt = L.targetTulis(a);
  let tl = L.pilihModeStok(a, "tulis");
  tl = { ...tl, tulis: [5, 6, 0] };
  const salahT = L.periksaTulis(tl);
  cek(tt === 506 && !salahT.ok && salahT.k.salah === 1 && /nol/.test(L.petunjukTulis(tl)) && /puluhan/.test(L.petunjukTulis(tl)) && tanpaDigit(L.petunjukTulis(tl)), "tulis: lima ratus enam ditulis tanpa nol penjaga dinyatakan keliru dengan petunjuk nol");
  cek(L.periksaTulis({ ...a, tulis: [5, 6, 0] }).ok === false && L.periksaTulis({ ...a, tulis: [5, 0, 0] }).ok === false && L.periksaTulis({ ...a, tulis: [5, 0, 6] }).ok, "tulis: hanya lima, nol, enam yang tepat");
  const bT = L.periksaTulis({ ...a, tulis: [5, 0, 6] });
  cek(bT.k.tulisBenar.join() === "0" && bT.k.tulisKe === 1 && L.targetTulis(bT.k) === 640 && bT.k.tulis.join() === "0,0,0", "tulis: isian tepat membuka sasaran berikutnya");
  sama(S.misiBaru(MK.MISI_A, bT.k, new Set()), ["a-tulis"], "tulis: misi a-tulis");
  let tiga = a;
  for (let i = 0; i < 3; i += 1) {
    const sas = L.targetTulis(tiga);
    tiga = L.periksaTulis({ ...tiga, tulis: [L.digit(sas, 0), L.digit(sas, 1), L.digit(sas, 2)] }).k;
  }
  cek(tiga.tulisBenar.join() === "0,1,2" && S.misiBaru(MK.MISI_A, tiga, new Set()).includes("a-nol") && /satuan|diisi angka nol/.test(L.petunjukTulis(L.pilihModeStok({ ...a, tulisKe: 1, tulis: [6, 4, 3] }, "tulis"))), "tulis: tiga bilangan dari kata, termasuk dua dengan nol, memenuhi a-nol");
  cek(L.ubahTulis(a, 0, -1).ok === false && L.ubahTulis(a, 2, 1).k.tulis.join() === "0,0,1" && tanpaDigit(L.kalimatTulis(bT.k)), "tulis: angka nol sampai sembilan");
  cek(L.mulaiLagiStok().tulisKe === 0 && L.mulaiLagiStok().butir === 0, "mulai lagi: kembali ke awal");
  // Pengecoh.
  sama(L.pengecohSim(703), [73, 730], "pengecoh: nol dibuang, tempat tertukar");
  cek(L.pengecohSim(872).length === 2 && L.pengecohSim(872).every((x) => x !== 872 && x >= 1 && x <= 999), "pengecoh: dua pengecoh sah");
  // Misi.
  const A = MK.MISI_A;
  cek(A.filter((m) => m.wajib).length === 4 && A.filter((m) => !m.wajib).length === 2, "misi A: empat wajib, dua bebas");
  cek(new Set(A.map((m) => m.id)).size === 6 && A.every((m) => m.id.startsWith("a-") && m.teks.length >= 10 && m.teks.length <= 120 && tanpaDigit(m.teks) && bersih(m.teks)), "misi A: id berawalan a-, unik, 10 sampai 120 huruf, tanpa digit");
  sama(MK.daftarMisiK3Bab1("A"), A, "daftarMisiK3Bab1 A");
  cek(A.every((m) => !m.cek({ alat: "kerangka" })), "misi A: alat lain tidak memenuhi misi");
  sama(S.misiBaru(A, a, new Set()), [], "misi A: keadaan awal tanpa misi baru");
  cek(S.misiBaru(A, { ...a, salah: 9, mode: "tulis", butir: 9, bungkus: 9, dus: 9, papan: [2, 5, 3], bacaPilih: 1, tulis: [5, 0, 6] }, new Set()).length === 0, "misi A: isian yang belum diperiksa dan benda di rak tidak dihitung sebagai misi");
}

/* ------------------------------ Mind-map: rak bilangan (sembilan kartu geser) ------------------------------ */
{
  const KA = DK.KARTU_TEMPAT;
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
  for (const m of ["Balok Dienes", "Tabel Tiga Tempat", "Nama Bilangan", "Tukar sepuluh jadi satu", "Papan tiga tempat", "Baca dari kiri", "Nol tidak diucapkan", "Tulis angka tiap tempat"]) cek(cara.toLowerCase().includes(m.toLowerCase()), `kartu: cara memuat ${m}`);
  const gab = KA.map((k) => [k.judul, k.masalah.label, k.cara.label, k.hasil.label, k.masalah.arti, k.cara.arti, k.hasil.arti].join(" ")).join(" ").toLowerCase();
  for (const s of ["satuan", "puluhan", "ratusan", "sepuluh", "tiga tempat", "hijau", "biru", "merah", "dari kiri", "nol", "tidak diucapkan", "tempat yang kosong dengan nol", "kubus, batang, dan lempeng", "tiga kolom", "nama yang benar"]) cek(gab.includes(s), `kartu: memuat poin "${s}"`);
  cek(!new RegExp("\\b(raka|salsa|bima|pak joko|kak dewi|bu wati|toples|permen|bungkus|butir|gudang)\\b", "i").test(gab), "kartu: hanya poin pelajaran (tanpa tokoh dan benda cerita)");
  cek(tanpaDigit(DK.SUARA_KARTU_TEMPAT + DK.SELESAI_KARTU_TEMPAT) && bersih(DK.SUARA_KARTU_TEMPAT + DK.SELESAI_KARTU_TEMPAT), "kartu: suara dan pesan selesai tanpa digit dan kata terlarang");
  cek(emojiSah(DK.TEMA_KARTU_TEMPAT.ikon) && DK.TEMA_KARTU_TEMPAT.judul.length > 5, "kartu: tema sah");
  const RG = DK.RINGKASAN_TEMPAT;
  cek(RG.ikon.length === DK.KARTU_TEMPAT.length && new Set(RG.ikon).size === RG.ikon.length && [...RG.ikon, RG.pusat].every((e) => emojiSah(e) && !/[A-Za-z0-9]/.test(e)), "peta radial: satu gambar unik per kartu, gambar sah tanpa huruf");
  cek(tanpaDigit(RG.suara) && bersih(RG.suara) && !RG.ikon.includes(RG.pusat), "peta radial: suara bersih dan pusat berbeda dari cabang");
}

/* ------------------------------ Infografis: papan stok (satu tabel lima baris) ------------------------------ */
{
  const B = DK.BARIS_INFO_TEMPAT;
  cek(B.length === 5 && DK.KOLOM_INFO_TEMPAT.length === 3, "infografis: lima baris dan tiga kolom");
  cek(B.every((b) => b.isi.length === 3 && emojiSah(b.ikon) && b.nama.length > 4), "infografis: tiap baris tiga isian, emoji sah");
  const jumlahContoh = B.map((b) => b.contoh.length);
  cek(jumlahContoh[0] === 3 && jumlahContoh.slice(1).every((n) => n === 0), "infografis: baris satu penuh contoh, baris dua sampai lima mandiri");
  const semua = B.flatMap((b) => b.isi);
  cek(B.every((b) => new Set(b.isi.map((x) => x.t)).size === 3), "infografis: tiga label tiap baris berbeda");
  cek(new Set(semua.map((x) => x.t)).size === semua.length, "infografis: semua label unik");
  cek(semua.every((x) => x.t.length <= 26 && x.t.split(/\s+/).length <= 5 && bersih(x.t) && bersih(x.s ?? "")), "infografis: label pendek (paling banyak lima kata) dan tanpa kata terlarang");
  cek(semua.every((x) => tanpaDigit(x.s ?? x.t)), "infografis: ucapan label tanpa digit");
  const gab = B.map((b) => [b.nama, ...b.isi.map((x) => x.t)].join(" ")).join(" ").toLowerCase();
  for (const s of ["tiga ukuran kemasan", "sepuluh yang lepas", "papan stok", "angka nol", "menulis dari kata", "satu, sepuluh, seratus", "ditukar jadi satu", "tempatnya naik", "hijau, biru, merah", "tidak diucapkan", "nol penjaga tempat", "tempat kosong diisi nol"]) cek(gab.includes(s), `infografis: memuat "${s}"`);
  cek(!new RegExp("\\b(raka|salsa|bima|pak joko|kak dewi|bu wati)\\b", "i").test(gab), "infografis: tanpa nama tokoh");
  cek(tanpaDigit(DK.SUARA_INFO_TEMPAT + DK.SELESAI_INFO_TEMPAT) && bersih(DK.SUARA_INFO_TEMPAT + DK.SELESAI_INFO_TEMPAT) && emojiSah(DK.TEMA_INFO_TEMPAT.ikon), "infografis: suara dan tema bersih");
}

/* ------------------------------ Pengenal ucapan ------------------------------ */
{
  const nm = (nama) => ({ jenis: "nama", nama });
  const an = (n) => ({ jenis: "angka", n });
  for (const nama of ["ratusan", "puluhan", "satuan", "toples", "bungkus", "butir", "lempeng", "batang", "kubus"]) cek(K.cocokUcapan(nama, nm(nama)).cocok && K.kataDariUcapan(nama).length === 1, `cocok: kata ${nama} dikenali tepat satu`);
  sama(K.kataDariUcapan("ratus an"), ["ratusan"], "ucapan: ratus an berarti ratusan");
  sama(K.kataDariUcapan("pulohan"), ["puluhan"], "ucapan: pulohan berarti puluhan");
  sama(K.kataDariUcapan("satu an"), ["satuan"], "ucapan: satu an berarti satuan");
  sama(K.kataDariUcapan("bukan puluhan"), [], "ucapan: bukan puluhan tidak dihitung");
  sama(K.kataDariUcapan("halo"), [], "ucapan: kata lain tidak dikenali");
  cek(!K.cocokUcapan("puluhan", nm("satuan")).cocok && !K.cocokUcapan("bungkus", nm("toples")).cocok && !K.cocokUcapan("kubus", nm("batang")).cocok, "cocok: kata berbeda tidak cocok");
  sama(K.angkaDariUcapan("lima"), [5], "angka: lima");
  sama(K.angkaDariUcapan("sembilan, 4 dan tiga"), [9, 4, 3], "angka: satuan dan angka tertulis");
  sama(K.angkaDariUcapan("lima belas"), [15], "angka: lima belas");
  sama(K.angkaDariUcapan("dua puluh dua"), [22], "angka: dua puluh dua");
  sama(K.angkaDariUcapan("tiga ratus lima"), [305], "angka: tiga ratus lima");
  sama(K.angkaDariUcapan("seratus"), [100], "angka: seratus");
  sama(K.angkaDariUcapan("seratus sebelas"), [111], "angka: seratus sebelas");
  sama(K.angkaDariUcapan("tujuh ratus enam belas"), [716], "angka: tujuh ratus enam belas");
  sama(K.angkaDariUcapan("sembilan ratus"), [900], "angka: sembilan ratus");
  sama(K.angkaDariUcapan("delapan ratus tujuh puluh dua"), [872], "angka: delapan ratus tujuh puluh dua");
  sama(K.angkaDariUcapan("305"), [305], "angka: 305 tertulis");
  sama(K.angkaDariUcapan("nol"), [0], "angka: nol");
  for (let n = 1; n <= 999; n += 1) cek(K.angkaDariUcapan(LC.kataBil(n)).join() === String(n), `angka: kata bilangan ${n} dikenali utuh (${LC.kataBil(n)} -> ${K.angkaDariUcapan(LC.kataBil(n))})`);
  cek(K.cocokUcapan("lima", an(5)).cocok && K.cocokUcapan("5", an(5)).cocok && !K.cocokUcapan("enam", an(5)).cocok, "cocok: kunci angka lima");
  cek(K.cocokUcapan("tiga ratus lima", an(305)).cocok && !K.cocokUcapan("tiga ratus lima", an(5)).cocok && !K.cocokUcapan("tiga puluh lima", an(305)).cocok, "cocok: bilangan tiga angka dikenali utuh");
}

/* ------------------------------ CPA ------------------------------ */
const TAHAP = { Concrete: ["benda", D.CONCRETE], Pictorial: ["diagram", D.PICTORIAL], Abstract: ["lambang", D.ABSTRACT] };
const CARA = ["klik", "kanvas", "suara"];
const METODE = ["igil", "balok", "tabel", "nama"];
const semuaTeksLangkah = (ls, rupa, cara) => [ls.judul, ls.suara, LC.instruksi(ls.langkah, rupa, cara), LC.kalimatTanya(ls.langkah, cara, rupa), LC.kalimatKunci(ls.langkah, cara, rupa), LC.petunjukSalah(ls.langkah, cara, 1, rupa)];
{
  sama(LC.URUT_METODE, METODE, "urutan metode");
  cek(LC.NAMA_METODE.igil.includes("Tukar Sepuluh, Baca dari Kiri") && LC.NAMA_METODE.balok.includes("Dienes Blocks") && LC.NAMA_METODE.tabel.includes("Place-Value Chart") && LC.NAMA_METODE.nama.includes("Number Names"), "nama metode IGIL dan tiga metode global");
  cek(METODE.every((m) => emojiSah(LC.IKON_METODE[m])), "ikon metode sah");
  let nomor = 2;
  for (const [nama, [rupa, soal]] of Object.entries(TAHAP)) {
    cek(soal.length === 3 && soal.map((s) => s.cara).join() === CARA.join(), `${nama}: tiga misi Klik, Kanvas, Suara`);
    cek(soal.every((s) => s.langkah.length === 4 && s.langkah.map((l) => l.metode).join() === METODE.join()), `${nama}: empat langkah per misi (IGIL, Dienes Blocks, Place-Value Chart, Number Names)`);
    for (const s of soal) {
      cek(s.nomor === nomor, `${nama}: nomor misi berlanjut ${nomor}`);
      nomor += 1;
      cek(s.judul.startsWith("Misi Rak Stok") && s.cerita.length > 15 && bersih(s.judul) && bersih(s.cerita), `${nama} ${s.nomor}: judul dan cerita sah`);
      for (const ls of s.langkah) {
        cek(ls.cara === s.cara, `${nama} ${s.nomor}: cara langkah sama dengan misi`);
        const teks = semuaTeksLangkah(ls, rupa, s.cara);
        cek(teks.every((t) => tanpaDigit(t) && bersih(t)), `${nama} ${s.nomor} ${ls.metode}: teks tanpa digit dan kata terlarang (${teks.find((t) => !tanpaDigit(t) || !bersih(t)) ?? ""})`);
        cek(emojiSah(teks.join("")), `${nama} ${s.nomor} ${ls.metode}: emoji sah`);
        cek(ls.judul === ls.suara && ls.judul === LC.instruksi(ls.langkah, rupa, s.cara), `${nama} ${s.nomor} ${ls.metode}: judul dan suara sama dengan instruksi`);
        // Batas rupa: Pictorial dan Abstract tanpa emoji benda di teks tugas; kata satuan sesuai rupa.
        if (rupa !== "benda") cek(!adaEmoji(teks.join(" ")), `${nama} ${s.nomor} ${ls.metode}: teks tugas tanpa emoji (batas rupa)`);
        if (rupa === "diagram" && (ls.langkah.tipe === "tukar" || ls.langkah.tipe === "kem")) cek(/kubus|batang|lempeng/.test(teks.join(" ")) && !/butir|bungkus|toples/.test(teks.join(" ")), `${nama} ${s.nomor}: Pictorial memakai nama balok, bukan nama permen`);
        if (rupa !== "diagram" && ls.langkah.tipe === "tukar") cek(/butir|bungkus|toples/.test(teks.join(" ")) && !/kubus|batang|lempeng/.test(teks.join(" ")), `${nama} ${s.nomor}: Concrete dan Abstract memakai nama permen`);
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
      cek(pil.length === 3 && new Set(pil).size === 3 && pil.includes(String(x.jawabTokoh)), `${nama}: pilihan klik Cari kesalahan memuat jawaban tokoh (${pil.join("/")})`);
      const kunci = LC.kunciJawab(x, "klik");
      cek(kunci !== null && String(kunci.n) !== String(x.jawabTokoh) && kunci.jenis === "angka", `${nama}: jawaban benar berbeda dari jawaban tokoh`);
      cek(x.betul !== true, `${nama}: jawaban tokoh yang keliru`);
      cek(LC.petunjukSalah(x, "klik", x.jawabTokoh).startsWith(`Itu jawaban ${x.tokoh}`), `${nama}: petunjuk menjelaskan kesalahan tokoh`);
    }
  }
  cek(nomor === 11, "nomor misi berlanjut sampai sepuluh");
  const dasarSalah = Object.values(TAHAP).map(([, soal]) => soal[0].langkah[0].langkah.dasar.tipe);
  sama(dasarSalah, ["kem", "balok", "nama"], "Cari kesalahan: dasar kemasan (Concrete), balok (Pictorial), nama bilangan (Abstract)");
  // Batas isi tiap tugas.
  for (const [nama, [, soal]] of Object.entries(TAHAP))
    for (const s of soal)
      for (const ls of s.langkah) {
        const d = LC.dasarDari(ls.langkah);
        const tag = `${nama} ${s.nomor} ${ls.metode}`;
        if (d.tipe === "kem" || d.tipe === "tukar" || d.tipe === "balok") {
          cek(d.isi.r >= 0 && d.isi.r <= 9 && d.isi.p >= 0 && d.isi.p <= 18 && d.isi.s >= 0 && d.isi.s <= 19, `${tag}: isi muat di zona gambar`);
          cek(LC.jumlahIsi(d.isi) >= 100 && LC.jumlahIsi(d.isi) <= 999 && !CERITA.has(LC.jumlahIsi(d.isi)), `${tag}: bilangan tiga angka dan berbeda dari Story (${LC.jumlahIsi(d.isi)})`);
        }
        if (d.tipe === "balok") cek(d.isi.p <= 9 && d.isi.s <= 9 && d.kanvas !== d.suara, `${tag}: balok satu angka tiap tempat, tempat kanvas dan suara berbeda`);
        if (d.tipe === "tukar") cek(d.dari === "butir" ? d.isi.s >= 11 && d.isi.s <= 19 && d.isi.p <= 8 : d.isi.p >= 11 && d.isi.p <= 16 && d.isi.s <= 9, `${tag}: bilangan tukar sepuluh sah (${JSON.stringify(d.isi)} ${d.dari})`);
        if (d.tipe === "tabel" || d.tipe === "nama") cek(d.n >= 100 && d.n <= 999 && !CERITA.has(d.n), `${tag}: bilangan tiga angka berbeda dari Story (${d.n})`);
      }
}

/* ------------------------------ Tugas dihitung dari data ------------------------------ */
{
  const nama = (k) => (k ? (k.jenis === "nama" ? k.nama : k.n) : null);
  const I = (r, p, s) => ({ r, p, s });
  // Kunci tiap jenis tugas dihitung dari data.
  sama(nama(LC.kunciJawab({ tipe: "kem", isi: I(2, 0, 5) }, "klik")), 205, "kunci kem klik: bilangan dengan nol penjaga");
  sama([LC.kunciJawab({ tipe: "tukar", isi: I(1, 2, 14), dari: "butir" }, "klik"), LC.kunciJawab({ tipe: "tukar", isi: I(1, 2, 14), dari: "butir" }, "kanvas"), LC.kunciJawab({ tipe: "tukar", isi: I(1, 2, 14), dari: "butir" }, "suara", "benda"), LC.kunciJawab({ tipe: "tukar", isi: I(1, 2, 14), dari: "butir" }, "suara", "diagram")].map(nama), [134, 4, "bungkus", "batang"], "kunci tukar butir: bilangan, sisa, kemasan menurut rupa");
  sama([LC.kunciJawab({ tipe: "tukar", isi: I(2, 13, 5), dari: "bungkus" }, "kanvas"), LC.kunciJawab({ tipe: "tukar", isi: I(2, 13, 5), dari: "bungkus" }, "suara", "lambang"), LC.kunciJawab({ tipe: "tukar", isi: I(2, 13, 5), dari: "bungkus" }, "suara", "diagram")].map(nama), [3, "toples", "lempeng"], "kunci tukar bungkus");
  sama(["klik", "kanvas", "suara"].map((c) => nama(LC.kunciJawab({ tipe: "balok", isi: I(3, 1, 6), kanvas: 1, suara: 0 }, c))), [316, 1, 3], "kunci balok: bilangan, kanvas, suara");
  sama(["klik", "kanvas", "suara"].map((c) => nama(LC.kunciJawab({ tipe: "tabel", n: 782, kanvas: 0, suara: 1 }, c))), [782, 7, "puluhan"], "kunci tabel");
  sama(["klik", "kanvas", "suara"].map((c) => nama(LC.kunciJawab({ tipe: "nama", n: 291, kanvas: 2 }, c))), [291, 1, 291], "kunci nama");
  sama([LC.angkaDi(305, 0), LC.angkaDi(305, 1), LC.angkaDi(305, 2), LC.jumlahIsi({ r: 3, p: 0, s: 5 })], [3, 0, 5, 305], "angka per tempat dan jumlah isi");
  sama(LC.isiDari(716), { r: 7, p: 1, s: 6 }, "isi dari bilangan");
  // Pengecoh.
  sama(LC.pengecoh(205).slice(0, 3), [25, 250, 502], "pengecoh 205: nol dibuang, tempat tertukar");
  cek(LC.pengecoh(900).every((x) => x !== 900 && x >= 1 && x <= 999) && LC.pengecoh(900).length >= 2, "pengecoh 900: sah");
  sama(LC.pengecoh(340, 430).slice(0, 2), [430, 34], "pengecoh dengan jawaban tokoh di depan");

  for (const [namaT, [rupa, soal]] of Object.entries(TAHAP)) {
    const kanvasAngka = [];
    const semuaAngka = [];
    for (const s of soal)
      for (const ls of s.langkah) {
        const l = ls.langkah;
        const d = LC.dasarDari(l);
        const kunci = LC.kunciJawab(l, s.cara, rupa);
        cek(kunci !== null, `${namaT} ${s.nomor} ${ls.metode}: kunci ada untuk semua tugas`);
        cek(LC.siapLangsung(l, rupa, s.cara) === (l.tipe !== "salah"), `${namaT} ${s.nomor} ${ls.metode}: siap langsung kecuali Cari kesalahan (tombol tidak macet)`);
        for (const r of ["benda", "diagram", "lambang"]) cek(LC.siapLangsung(l, r, s.cara) === LC.siapLangsung(l, rupa, s.cara), `${namaT} ${s.nomor} ${ls.metode}: siap langsung tidak bergantung rupa (${r})`);
        if (kunci?.jenis === "angka") {
          semuaAngka.push(kunci.n);
          if (s.cara === "kanvas") {
            kanvasAngka.push(kunci.n);
            cek(kunci.n >= 1 && kunci.n <= 9, `${namaT} ${s.nomor} ${ls.metode}: jawaban kanvas satu angka satu sampai sembilan (${kunci.n})`);
          }
          if (s.cara === "klik") cek(kunci.n >= 100 && kunci.n <= 999, `${namaT} ${s.nomor} ${ls.metode}: jawaban klik bilangan tiga angka`);
        }
        if (kunci?.jenis === "nama") cek(!/\s/.test(kunci.nama) && tanpaDigit(kunci.nama) && s.cara === "suara", `${namaT} ${s.nomor} ${ls.metode}: kunci nama satu kata, hanya pada suara`);
        // Pilihan klik: tiga pilihan bilangan unik, jawaban benar tidak di tombol pertama.
        if (s.cara === "klik" && kunci !== null) {
          const pil = LC.pilihanKlik(l);
          cek(pil.length === 3 && new Set(pil).size === 3 && pil.includes(String(kunci.n)) && pil[0] !== String(kunci.n), `${namaT} ${s.nomor} ${ls.metode}: pilihan klik unik dan jawaban benar bukan yang pertama (${pil.join("/")})`);
          cek(pil.every((p) => /^\d{1,3}$/.test(p) && Number(p) >= 1 && Number(p) <= 999), `${namaT} ${s.nomor}: pilihan bilangan sah`);
          if (/0/.test(String(kunci.n)) && l.tipe !== "salah") cek(pil.some((p) => p.length === 2), `${namaT} ${s.nomor} ${ls.metode}: bilangan bernol punya pengecoh tanpa nol (${pil.join("/")})`);
        }
        if (s.cara === "suara" && kunci !== null) {
          const pil = LC.pilihanSuara(l, "suara", rupa);
          cek(pil.includes(LC.teksKunciPilihan(kunci)) && pil.length === 3 && new Set(pil).size === pil.length && tanpaDigit(pil.join(" ")), `${namaT} ${s.nomor} ${ls.metode}: pilihan cadangan suara memuat kunci (${pil.join("/")})`);
          cek(pil[0] !== LC.teksKunciPilihan(kunci), `${namaT} ${s.nomor} ${ls.metode}: kunci suara bukan pilihan pertama`);
          const c = K.cocokUcapan(LC.teksKunciPilihan(kunci), kunci);
          cek(c.cocok, `${namaT} ${s.nomor} ${ls.metode}: ucapan kunci dikenali (${LC.teksKunciPilihan(kunci)})`);
          for (const lain of pil.filter((p) => p !== LC.teksKunciPilihan(kunci))) cek(!K.cocokUcapan(lain, kunci).cocok, `${namaT} ${s.nomor}: ucapan ${lain} bukan kunci`);
        }
        if (kunci) cek(LC.kalimatKunci(l, s.cara, rupa).length > 12, `${namaT} ${s.nomor} ${ls.metode}: kalimat penjelasan ada`);
        // Petunjuk salah menunjuk kesalahan (tidak kosong untuk tiap tugas dan cara).
        cek(LC.petunjukSalah(l, s.cara, "x", rupa).length > 20, `${namaT} ${s.nomor} ${ls.metode}: petunjuk salah ada`);
        if (rupa === "lambang") {
          const baris = LC.barisKartu(d, rupa);
          cek(Array.isArray(baris) && baris.length >= 1 && baris.every((b) => typeof b === "string" && b.length > 3), `${namaT} ${s.nomor} ${ls.metode}: kartu kata ada`);
          cek(baris.every((b) => !adaEmoji(b)), `${namaT} ${s.nomor} ${ls.metode}: kartu kata tanpa emoji`);
        }
      }
    cek(new Set(kanvasAngka).size === kanvasAngka.length && kanvasAngka.length === 4, `${namaT}: empat angka jawaban Tulis di kanvas tidak kembar (${kanvasAngka.join(", ")})`);
    cek(new Set(semuaAngka).size === semuaAngka.length, `${namaT}: semua angka jawaban bilangan tidak kembar dalam satu tahap (${semuaAngka.join(", ")})`);
  }
  sama(TAHAP.Concrete[1].filter((s) => s.cara === "kanvas").flatMap((s) => s.langkah.map((l) => LC.kunciJawab(l.langkah, "kanvas").n)), [4, 6, 7, 2], "angka kanvas Concrete");
  sama(TAHAP.Pictorial[1].filter((s) => s.cara === "kanvas").flatMap((s) => s.langkah.map((l) => LC.kunciJawab(l.langkah, "kanvas").n)), [7, 8, 3, 6], "angka kanvas Pictorial");
  sama(TAHAP.Abstract[1].filter((s) => s.cara === "kanvas").flatMap((s) => s.langkah.map((l) => LC.kunciJawab(l.langkah, "kanvas").n)), [5, 9, 4, 8], "angka kanvas Abstract");
  // Tiap tahap memuat bilangan bernol sebagai jawaban atau bahan tugas (nol penjaga tempat).
  for (const [namaT, [, soal]] of Object.entries(TAHAP)) {
    const semua = soal.flatMap((s) => s.langkah.map((l) => LC.dasarDari(l.langkah)));
    const bernol = semua.filter((d) => (d.n !== undefined && /0/.test(String(d.n))) || (d.isi !== undefined && /0/.test(String(LC.jumlahIsi(d.isi))))).length;
    cek(bernol >= 3, `${namaT}: sedikitnya tiga tugas memuat bilangan dengan angka nol (${bernol})`);
  }
  // Poin penting dan penutup.
  cek(D.POIN_PENTING.length >= 6 && D.POIN_PENTING.every((p) => p.length > 20 && bersih(p)) && D.POIN_PENTING_SUARA.every((p) => tanpaDigit(p)), "poin penting: banyak, bersih, suara tanpa digit");
  const poin = D.POIN_PENTING.join(" ").toLowerCase();
  for (const m of ["satuan", "puluhan", "ratusan", "sepuluh", "dari kiri", "angka nol", "tempat yang kosong dengan nol", "balok dienes", "tabel tiga tempat", "nama bilangan"]) cek(poin.includes(m), `poin penting memuat ${m}`);
  cek(tanpaDigit(D.PENUTUP_A) && bersih(D.PENUTUP_A) && /Bu Wati/.test(D.PENUTUP_A) && /kartu angka/.test(D.PENUTUP_A) && D.PENUTUP_A.endsWith("?"), "penutup A: jembatan ke Sub-Bab B tanpa digit");
  cek(Object.values(D.TEMA_TEMPAT).every((t) => emojiSah(t.ikon) && t.nama.length >= 7 && t.cara.length > 20 && tanpaDigit(t.cara) && bersih(t.cara)), "tema tiga tahap sah");
  cek(D.TEMA_TEMPAT.pictorial.cara.includes("polos") && D.TEMA_TEMPAT.abstract.cara.includes("kartu"), "tema: Pictorial polos, Abstract kartu");
  cek(D.CONCRETE_TEMPAT === D.CONCRETE && D.PICTORIAL_TEMPAT === D.PICTORIAL && D.ABSTRACT_TEMPAT === D.ABSTRACT && D.MISI_STOK_TEKS === DS.MISI_STOK_TEKS, "nama ekspor untuk pemasang");
}

/* ------------------------------ Berkas ------------------------------ */
{
  const berkas = readdirSync(folderUrl).filter((f) => /\.(ts|tsx)$/.test(f));
  for (const nama of ["logika.ts", "data-sim.ts", "data-kartu.ts", "logika-cpa.ts", "data.ts", "periksa.ts", "JawabTempat.tsx", "LangkahTempat.tsx", "TahapTempat.tsx", "SimulasiRakStok.tsx", "RakPermen.tsx", "PapanStok.tsx"]) cek(berkas.includes(nama), `berkas ${nama} ada`);
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folderUrl), "utf8");
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d || c.codePointAt(0) === 0x1f6de), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}/i.test(s), `${f}: kode emoji tidak melewati U+1FA95`);
    cek(!/buku|kelompok|bernilai|tebak/i.test(s), `${f}: tanpa kata buku, kelompok, bernilai, tebak`);
    if (/^(logika|logika-cpa|periksa|data|data-sim|data-kartu)\.ts$/.test(f)) cek(!/from "react"|fetch\(/.test(s), `${f}: tanpa React dan jaringan`);
    cek(!/turus-k2b8a|gambar-k2b8b|kartu-k3b1b|urut-k3b1c|tambah-k3b1d|kurang-k3b1e|kali-k3b1f|bagi-k3b1g|LangkahTurus|TahapTurus|SubBabK3B1/.test(s), `${f}: tidak memakai folder bab atau sub-bab lain`);
  }
  // Teks layar tidak memuat kata terlarang, termasuk nama berkas data.
  const layar = ["LangkahTempat.tsx", "TahapTempat.tsx", "SimulasiRakStok.tsx"].map((f) => readFileSync(new URL(f, folderUrl), "utf8")).join("\n");
  const teksLayar = [...layar.matchAll(/>\s*([^<>{}\n]{4,})\s*</g)].map((m) => m[1]).join(" ");
  cek(!/\b(skor|nilai|soal|tebak|kunci|latihan|teman|kelompok|buku)\b/i.test(teksLayar), "teks layar komponen tanpa kata terlarang");
  cek(/\bTugas\b/.test(layar) && !/>\s*Soal/.test(layar), "teks layar CPA memakai Tugas");
  // Tahap: props sama dengan TahapTurus dan pola visual baru.
  const th = readFileSync(new URL("TahapTempat.tsx", folderUrl), "utf8");
  cek(/umum: Umum;\s*rupa: Rupa;\s*soal: SoalMisi\[\];\s*pita:/.test(th) && /teksAkhir: string/.test(th) && /poinPenting\?: boolean/.test(th), "TahapTempat: props umum, rupa, soal, pita, teksAkhir, poinPenting");
  cek(/IKON_METODE\[ls\.metode\]/.test(th) && /rupa === "benda" \?/.test(th), "TahapTempat: ikon metode hanya pada rupa benda (Pictorial dan Abstract tanpa emoji metode)");
  cek(/export default function TahapTempat/.test(th) && /Cari kesalahan/.test(th) && /POIN_PENTING/.test(th) && /PENUTUP_A/.test(th), "TahapTempat: ekspor, Cari kesalahan, Poin Penting, jembatan");
  cek(/"rak"/.test(th) && /"kapur"/.test(th) && /"nota"/.test(th) && !/"tirai"|"jepit"|"catatan"/.test(th), "TahapTempat: pola visual rak, papan kapur, nota stok (berbeda dari bab sebelumnya)");
  const lg = readFileSync(new URL("LangkahTempat.tsx", folderUrl), "utf8");
  cek(/export function LangkahTempat/.test(lg) && /JawabSuaraTempat/.test(lg) && /JawabTulis/.test(lg) && /pilihanSuara\(l, cara, rupa\)/.test(lg), "LangkahTempat: ekspor, jawab suara dengan pilihan ketuk, jawab tulis di kanvas");
  const jw = readFileSync(new URL("JawabTempat.tsx", folderUrl), "utf8");
  cek(/gagalSekali/.test(jw) && /Ini jawaban yang benar|jawaban yang benar/.test(jw) && /PilihanKata/.test(jw) && /setCadangan\(true\)/.test(jw) && /e\.error === "not-allowed"/.test(jw), "JawabTempat: galat mikrofon dihitung gagal, pilihan ketuk sebagai cadangan, jawaban benar setelah tiga kali salah");
  const sim = readFileSync(new URL("SimulasiRakStok.tsx", folderUrl), "utf8");
  cek(/export default function SimulasiRakStok/.test(sim) && /onKeadaan/.test(sim) && /MISI_STOK_TEKS/.test(sim), "SimulasiRakStok: ekspor, onKeadaan, teks misi");
  for (const [f, nm] of [["RakPermen.tsx", "RakPermenK3B1"], ["PapanStok.tsx", "PapanStokK3B1"]]) {
    const s = readFileSync(new URL(f, folderUrl), "utf8");
    cek(/speakGuru/.test(s) && /onLanjut/.test(s) && /teksLanjut/.test(s) && /peta-kartu\//.test(s) && new RegExp(`export default function ${nm}`).test(s) && new RegExp(`export \\{ ${nm} \\}`).test(s), `${f}: pembungkus tipis komponen bersama peta-kartu, ekspor ${nm}`);
  }
  // Berkas bersama: Simulasi memasang Rak Stok.
  const sk = readFileSync(new URL("../src/components/modul/SimulasiK3Bab1.tsx", import.meta.url), "utf8");
  cek(/SimulasiRakStok/.test(sk) && /laporMisiStok\(daftarMisiK3Bab1\("A"\), k, a\.capai\)/.test(sk), "SimulasiK3Bab1: langkahRakStokA memasang Rak Stok");
  // Berkas lama yang dipertahankan ada (dipakai bab lain dan bank soal).
  for (const f of ["data-k3b1.ts", "dasar-k3b1.tsx", "naskah-k3b1.ts", "video-k3b1-umum.tsx", "bantu-k3b1.tsx", "diagram-k3b1.tsx", "mesin-k3b1.tsx", "lab-tempat-k3b1.ts", "mesin-bertahap-k3b1.ts"]) cek(readdirSync(new URL("../src/components/modul/", import.meta.url)).includes(f), `berkas lama ${f} dipertahankan`);
  const ej = readFileSync(new URL("../src/lib/ejaan-inggris-id.ts", import.meta.url), "utf8");
  cek(/dienes blocks/i.test(ej) && /place-value chart/i.test(ej) && /number names/i.test(ej), "ejaan: tiga nama metode global ada");
}

console.log(`Lulus ${lulus}, gagal ${gagal}`);
process.exit(gagal ? 1 : 0);
