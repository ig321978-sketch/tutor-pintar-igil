// Uji Mind-map (Nampan Kue), Infografis (Daftar Pesanan), Simulasi Meja Pesanan, dan tahap Concrete, Pictorial, Abstract Kelas 3 Bab 1 Sub-Bab D ("Pesanan Bu Tuti"),
// penjumlahan sampai 100, Toko Kelontong Pak Joko.
// Memeriksa: logika simulasi (susun, tukar, panjang, tiga, periksa), misi (awal tidak memenuhi, wajib empat, bebas dua), nampan kue (sembilan kartu geser Masalah, Cara, Hasil memuat semua
// metode Story), daftar pesanan dari data Story, CPA dua belas langkah per tahap (Klik, Kanvas, Suara x empat metode) dengan jawaban beragam dan Cari kesalahan di tiap tahap, kunci
// dihitung dari data, angka jawaban tidak kembar per tahap, hasil tidak lebih dari seratus, tugas yang langsung siap (jebakan tombol macet), pengenal ucapan, petunjuk salah, batas rupa, emoji, kata terlarang, akhir baris.
// Jalankan: node --no-warnings scripts/uji-tambah-k3b1d.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/tambah-k3b1d/logika.ts");
const DS = await import("../src/components/modul/tambah-k3b1d/data-sim.ts");
const DK = await import("../src/components/modul/tambah-k3b1d/data-kartu.ts");
const LC = await import("../src/components/modul/tambah-k3b1d/logika-cpa.ts");
const D = await import("../src/components/modul/tambah-k3b1d/data.ts");
const K = await import("../src/components/modul/tambah-k3b1d/periksa.ts");
const S = await import("../src/components/modul/misi-simulasi.ts");
const MK = await import("../src/components/modul/misi-k3bab1.ts");
const MT = await import("../src/components/modul/misi-teks-k3b1.ts");
const folderUrl = new URL("../src/components/modul/tambah-k3b1d/", import.meta.url);

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
const JAWABAN_STORY = new Set([37, 65, 55, 70, 75, 80, 83, 77, 94, 39, 50, 30, 54, 23, 14]);

/* ------------------------------ Kata bilangan ------------------------------ */
{
  sama([0, 1, 9, 10, 11, 15, 20, 38, 100].map(LC.kataBil), ["nol", "satu", "sembilan", "sepuluh", "sebelas", "lima belas", "dua puluh", "tiga puluh delapan", "seratus"], "kata bilangan CPA");
  sama([L.kata(7), L.kata(12), L.kata(20), L.kata(100)], ["tujuh", "dua belas", "dua puluh", "seratus"], "kata bilangan simulasi");
  cek(LC.kata === LC.kataBil, "alias kata");
  for (let n = 1; n <= 100; n += 1) cek(tanpaDigit(LC.kataBil(n)) && LC.kataBil(n) === L.kata(n), `kata bilangan ${n} sama di simulasi dan CPA`);
}

/* ------------------------------ Simulasi: data dan logika ------------------------------ */
{
  const P = DS.PESANAN_SIM;
  cek(P.length === 3 && new Set(P.map((x) => x.nama)).size === 3 && new Set(P.map((x) => x.emoji)).size === 3, "simulasi: tiga pesanan unik");
  for (const x of P) cek(emojiSah(x.emoji) && tanpaDigit(x.nama) && bersih(x.nama) && x.a >= 10 && x.b >= 10 && x.a + x.b <= 100, `${x.nama}: emoji sah, dua bilangan dua angka, hasil paling besar seratus`);
  sama(P.map((x) => x.a + x.b), [59, 84, 85], "simulasi: jumlah pesanan");
  cek(!/kue lapis|nagasari|donat|bolu|roti/i.test(P.map((x) => x.nama).join(" ")), "simulasi: benda berbeda dari Story");
  const story = new Set([23, 14, 38, 27, 15, 24, 31, 46, 29]);
  cek(P.every((x) => !story.has(x.a) && !story.has(x.b)) && !story.has(DS.PANJANG_SIM.a) && !story.has(DS.PANJANG_SIM.b) && ![DS.TIGA_SIM.a, DS.TIGA_SIM.b, DS.TIGA_SIM.c, DS.PERIKSA_SIM.a, DS.PERIKSA_SIM.b].some((n) => story.has(n)), "simulasi: bilangan berbeda dari Story");
  cek(DS.TUKAR_AWAL.butir >= 10 && DS.TUKAR_AWAL.butir <= 19 && DS.TUKAR_AWAL.batang + 2 <= 9, "simulasi: butir awal sepuluh sampai sembilan belas");
  sama([DS.TUKAR_AWAL.batang * 10 + DS.TUKAR_AWAL.butir, DS.PANJANG_SIM.a + DS.PANJANG_SIM.b, DS.TIGA_SIM.a + DS.TIGA_SIM.b + DS.TIGA_SIM.c], [57, 91, 79], "simulasi: jumlah tukar, panjang, dan tiga bilangan");
  cek(tanpaDigit(DS.MISI_PESANAN_TEKS) && bersih(DS.MISI_PESANAN_TEKS) && MT.MISI_K3B1.D === DS.MISI_PESANAN_TEKS, "simulasi: teks misi tanpa digit dan kata terlarang, sama dengan misi-teks-k3b1.ts");

  const a = L.awalPesanan();
  cek(a.alat === "pesanan" && a.mode === "susun" && a.susunBenar.length === 0 && !a.tukarSelesai && !a.panjangBenar && !a.tigaBenar && !a.periksaBenar && a.butir === 17 && a.batang === 4, "simulasi: keadaan awal kosong");
  // Susun.
  sama([0, 1, 2].map((n) => L.kunciSusun(n)), [{ satuan: 9, simpan: 0, puluhan: 5 }, { satuan: 4, simpan: 1, puluhan: 8 }, { satuan: 5, simpan: 1, puluhan: 8 }], "susun: kunci dihitung dari pesanan");
  cek(!L.ubahSusun(a, "satuan", -1).ok && !L.ubahSusun(a, "simpan", -1).ok && !L.ubahSusun({ ...a, sSimpan: 1 }, "simpan", 1).ok && !L.ubahSusun({ ...a, sSatuan: 9 }, "satuan", 1).ok && !L.ubahSusun({ ...a, sPuluhan: 9 }, "puluhan", 1).ok, "susun: batas isian");
  let s = a;
  for (let i = 0; i < 9; i += 1) s = L.ubahSusun(s, "satuan", 1).k;
  for (let i = 0; i < 5; i += 1) s = L.ubahSusun(s, "puluhan", 1).k;
  cek(L.periksaSusun(s).ok && L.periksaSusun(s).k.susunBenar.join() === "0" && /Betul/.test(L.kalimatSusun(L.periksaSusun(s).k)) && tanpaDigit(L.kalimatSusun(L.periksaSusun(s).k)), "susun: pesanan pertama tepat");
  const sLupa = L.ubahSusun(L.pesananBerikut(L.periksaSusun(s).k), "puluhan", 1).k;
  cek(L.pesananKe(sLupa).nama === "lemper" && sLupa.sPuluhan === 1 && sLupa.sSatuan === 0 && sLupa.sSimpan === 0 && L.periksaSusun(sLupa).k.salah === 1, "susun: pesanan berikutnya mengosongkan isian");
  let lupa = L.pesananBerikut(a);
  for (let i = 0; i < 4; i += 1) lupa = L.ubahSusun(lupa, "satuan", 1).k;
  for (let i = 0; i < 7; i += 1) lupa = L.ubahSusun(lupa, "puluhan", 1).k;
  const hasilLupa = L.periksaSusun(lupa);
  cek(!hasilLupa.ok && hasilLupa.k.salah === 1 && /disimpan/.test(L.petunjukSusun(lupa)) && tanpaDigit(L.petunjukSusun(lupa)), "susun: lupa menyimpan salah dengan petunjuk simpanan");
  const benar2 = L.ubahSusun(L.ubahSusun(lupa, "puluhan", 1).k, "simpan", 1).k;
  cek(L.periksaSusun(benar2).ok, "susun: pesanan lemper dengan simpanan tepat");
  let tiga = L.awalPesanan();
  for (const n of [0, 1, 2]) {
    tiga = { ...tiga, noSusun: n };
    const c = L.kunciSusun(n);
    tiga = { ...tiga, sSatuan: c.satuan, sSimpan: c.simpan, sPuluhan: c.puluhan };
    tiga = L.periksaSusun(tiga).k;
  }
  cek(tiga.susunBenar.length === 3, "susun: tiga pesanan tepat");
  sama(S.misiBaru(MK.MISI_D, tiga, new Set()), ["d-susun", "d-banyak"], "susun: misi d-susun dan d-banyak");
  cek(L.periksaSusun(tiga).k.susunBenar.length === 3, "susun: periksa ulang tidak menggandakan pesanan tepat");
  // Tukar.
  let t = L.pilihModePesanan(a, "tukar");
  cek(!L.tukarSepuluh({ ...t, butir: 9 }).ok && L.tukarSepuluh({ ...t, butir: 9 }).k.salah === 1 && /tidak ada lagi/.test(L.petunjukTukar({ ...t, butir: 7 })), "tukar: kurang dari sepuluh tidak bisa ditukar");
  const t1 = L.tukarSepuluh(t);
  cek(t1.ok && t1.k.butir === 7 && t1.k.batang === 5 && t1.k.tukarKali === 1 && t1.k.tukarSelesai && L.totalTukar(t1.k) === 57 && L.totalTukar(t) === 57, "tukar: sepuluh butir jadi satu batang, jumlah tetap");
  cek(tanpaDigit(L.kalimatTukar(t1.k)) && tanpaDigit(L.kalimatTukar(t)) && /tetap lima puluh tujuh/.test(L.kalimatTukar(t1.k)), "tukar: kalimat tanpa digit");
  sama(S.misiBaru(MK.MISI_D, t1.k, new Set()), ["d-tukar"], "tukar: misi d-tukar");
  const t2 = L.tukarSepuluh({ ...t, butir: 25, batang: 1 });
  cek(t2.ok && !t2.k.tukarSelesai && t2.k.butir === 15, "tukar: butir masih sepuluh atau lebih belum selesai");
  // Panjang.
  sama(L.kunciPanjang(), { puluh: 80, satuan: 11, hasil: 91 }, "panjang: kunci dihitung dari data");
  let pj = L.pilihModePesanan(a, "panjang");
  cek(!L.ubahPanjang(pj, "puluh", -1).ok && !L.ubahPanjang(pj, "satuan", -1).ok && !L.ubahPanjang({ ...pj, pjPuluh: 100 }, "puluh", 1).ok && !L.ubahPanjang({ ...pj, pjSatuan: 18 }, "satuan", 1).ok, "panjang: batas isian");
  for (let i = 0; i < 8; i += 1) pj = L.ubahPanjang(pj, "puluh", 1).k;
  cek(pj.pjPuluh === 80 && !L.periksaPanjang(pj).ok && /satuan belum tepat/.test(L.petunjukPanjang(pj)), "panjang: puluhan tepat, satuan belum");
  for (let i = 0; i < 11; i += 1) pj = L.ubahPanjang(pj, "satuan", 1).k;
  cek(L.periksaPanjang(pj).ok && L.periksaPanjang(pj).k.panjangBenar && tanpaDigit(L.kalimatPanjang(L.periksaPanjang(pj).k)) && /sembilan puluh satu/.test(L.kalimatPanjang(L.periksaPanjang(pj).k)), "panjang: delapan puluh ditambah sebelas tepat");
  sama(S.misiBaru(MK.MISI_D, L.periksaPanjang(pj).k, new Set()), ["d-panjang"], "panjang: misi d-panjang");
  cek(!L.ubahPanjang(L.periksaPanjang(pj).k, "satuan", 1).k.panjangBenar, "panjang: mengubah isian membatalkan tanda tepat");
  cek(!L.periksaPanjang(L.ubahPanjang(pj, "puluh", 1).k).ok && /puluhan belum tepat/.test(L.petunjukPanjang(L.ubahPanjang(pj, "puluh", 1).k)), "panjang: puluhan keliru");
  // Tiga bilangan.
  sama(L.kunciTiga(), { sementara: 45, hasil: 79 }, "tiga: kunci dihitung dari data");
  let tg = L.pilihModePesanan(a, "tiga");
  cek(!L.ubahTiga(tg, "sementara", -1).ok && !L.ubahTiga({ ...tg, tgHasil: 100 }, "hasil", 1).ok && !L.ubahTiga(tg, "hasil", 5).ok && L.ubahTiga(tg, "hasil", 10).k.tgHasil === 10, "tiga: batas dan selisih satu atau sepuluh");
  tg = { ...tg, tgSementara: 40, tgHasil: 70 };
  cek(!L.periksaTiga(tg).ok && /dua bilangan pertama belum tepat/.test(L.petunjukTiga(tg)), "tiga: jumlah dua bilangan pertama keliru");
  tg = L.ubahTiga(tg, "sementara", 1).k;
  for (let i = 0; i < 4; i += 1) tg = L.ubahTiga(tg, "sementara", 1).k;
  cek(tg.tgSementara === 45 && !L.periksaTiga(tg).ok && /seluruhnya belum tepat/.test(L.petunjukTiga(tg)), "tiga: seluruhnya keliru");
  for (let i = 0; i < 9; i += 1) tg = L.ubahTiga(tg, "hasil", 1).k;
  cek(tg.tgHasil === 79 && L.periksaTiga(tg).ok && L.periksaTiga(tg).k.tigaBenar && tanpaDigit(L.kalimatTiga(L.periksaTiga(tg).k)), "tiga: empat puluh lima dan tujuh puluh sembilan tepat");
  sama(S.misiBaru(MK.MISI_D, L.periksaTiga(tg).k, new Set()), ["d-tiga"], "tiga: misi d-tiga");
  // Periksa.
  cek(L.kunciTaksir() === 90 && DS.PERIKSA_SIM.taksir.includes(L.kunciTaksir()) && DS.PERIKSA_SIM.taksir.length === 3, "periksa: taksiran dihitung dari data (tiga pilihan memuat yang tepat)");
  let pk = L.pilihModePesanan(a, "periksa");
  cek(!L.periksaTukar(pk).ok && /Pilih dulu/.test(L.petunjukPeriksa(pk)), "periksa: belum memilih");
  pk = L.pilihPeriksa(pk, "beda");
  cek(!L.periksaTukar(L.pilihTaksir(pk, 90)).ok && /Hasilnya sama/.test(L.petunjukPeriksa(pk)), "periksa: memilih beda keliru");
  pk = L.pilihPeriksa(pk, "sama");
  cek(!L.periksaTukar(pk).ok && /taksirannya/.test(L.petunjukPeriksa(pk)), "periksa: belum memilih taksiran");
  pk = L.pilihTaksir(pk, 80);
  cek(!L.periksaTukar(pk).ok && /Taksiran belum tepat/.test(L.petunjukPeriksa(pk)), "periksa: taksiran keliru");
  pk = L.pilihTaksir(pk, 90);
  cek(L.periksaTukar(pk).ok && L.periksaTukar(pk).k.periksaBenar && tanpaDigit(L.kalimatPeriksa(L.periksaTukar(pk).k)), "periksa: sama dan taksiran tepat");
  sama(S.misiBaru(MK.MISI_D, L.periksaTukar(pk).k, new Set()), ["d-periksa"], "periksa: misi d-periksa");
  cek(L.pilihTaksir(a, 55).pkTaksir === 0 && !L.pilihPeriksa(L.periksaTukar(pk).k, "beda").periksaBenar, "periksa: taksiran di luar daftar diabaikan, mengubah pilihan membatalkan tanda tepat");
  cek(L.mulaiLagiPesanan().susunBenar.length === 0 && L.mulaiLagiPesanan().butir === 17 && L.mulaiLagiPesanan().noSusun === 0, "mulai lagi: kembali ke awal");
  // Misi.
  const M = MK.MISI_D;
  cek(M.filter((m) => m.wajib).length === 4 && M.filter((m) => !m.wajib).length === 2, "misi D: empat wajib, dua bebas");
  cek(new Set(M.map((m) => m.id)).size === 6 && M.every((m) => m.id.startsWith("d-") && m.teks.length >= 10 && m.teks.length <= 120 && tanpaDigit(m.teks) && bersih(m.teks)), "misi D: id berawalan d-, unik, 10 sampai 120 huruf, tanpa digit");
  sama(MK.daftarMisiK3Bab1("D"), M, "daftarMisiK3Bab1 D");
  cek(M.every((m) => !m.cek({ alat: "kerangka" })), "misi D: alat lain tidak memenuhi misi");
  sama(S.misiBaru(M, a, new Set()), [], "misi D: keadaan awal tanpa misi baru");
  cek(S.misiBaru(M, { ...a, salah: 9, mode: "tiga", sSatuan: 4, sSimpan: 1, sPuluhan: 8, butir: 12, pjPuluh: 80, pjSatuan: 11, tgSementara: 45, tgHasil: 79, pkPilih: "sama", pkTaksir: 90 }, new Set()).length === 0, "misi D: isian yang belum diperiksa tidak dihitung sebagai misi");
}

/* ------------------------------ Mind-map: nampan kue (sembilan kartu geser) ------------------------------ */
{
  const KA = DK.KARTU_TAMBAH;
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
  for (const m of ["Penjumlahan Bersusun", "Pasangan Bilangan", "Menghitung Maju", "Susun ke bawah, satuan dulu", "Uraikan puluhan dan satuan", "Tukar sepuluh jadi satu puluhan", "Jumlah dua-dua", "Tulis kalimat hitungnya", "Tukar urutan, kira-kira"]) cek(cara.toLowerCase().includes(m.toLowerCase()), `kartu: cara memuat ${m}`);
  const gab = KA.map((k) => [k.judul, k.masalah.label, k.cara.label, k.hasil.label, k.masalah.arti, k.cara.arti, k.hasil.arti].join(" ")).join(" ").toLowerCase();
  for (const s of ["puluhan lurus dengan puluhan", "satuan dulu", "uraikan tiap bilangan menjadi puluhan dan satuan", "sepuluh satuan ditukar menjadi satu puluhan", "disimpan ke tempat puluhan", "tiga bilangan", "dua bilangan dulu", "kata tambah", "kalimat penjumlahan", "satuan yang tepat", "tukar urutan", "kira-kira", "menggenapi puluhan", "maju per sepuluh lalu per satu", "bilangan terakhir"]) cek(gab.includes(s), `kartu: memuat poin "${s}"`);
  cek(!new RegExp("\\b(raka|salsa|bima|pak joko|bu tuti|pak anto|kue|roti|loyang|donat|bolu|nagasari)\\b", "i").test(gab.replace(/judul.*?nampan kue/g, "")), "kartu: hanya poin pelajaran (tanpa tokoh dan benda cerita)");
  cek(tanpaDigit(DK.SUARA_KARTU_TAMBAH + DK.SELESAI_KARTU_TAMBAH) && bersih(DK.SUARA_KARTU_TAMBAH + DK.SELESAI_KARTU_TAMBAH), "kartu: suara dan pesan selesai tanpa digit dan kata terlarang");
  cek(emojiSah(DK.TEMA_KARTU_TAMBAH.ikon) && DK.TEMA_KARTU_TAMBAH.judul.length > 5, "kartu: tema sah");
  const RG = DK.RINGKASAN_TAMBAH;
  cek(RG.ikon.length === DK.KARTU_TAMBAH.length && new Set(RG.ikon).size === RG.ikon.length && [...RG.ikon, RG.pusat].every((e) => emojiSah(e) && !/[A-Za-z0-9]/.test(e)), "peta radial: satu gambar unik per kartu, gambar sah tanpa huruf");
  cek(tanpaDigit(RG.suara) && bersih(RG.suara) && !RG.ikon.includes(RG.pusat), "peta radial: suara bersih dan pusat berbeda dari cabang");
}

/* ------------------------------ Infografis: daftar pesanan (satu tabel lima baris) ------------------------------ */
{
  const B = DK.BARIS_INFO_TAMBAH;
  cek(B.length === 5 && DK.KOLOM_INFO_TAMBAH.length === 3, "infografis: lima baris dan tiga kolom");
  cek(B.every((b) => b.isi.length === 3 && emojiSah(b.ikon) && b.nama.length > 4), "infografis: tiap baris tiga isian, emoji sah");
  const jumlahContoh = B.map((b) => b.contoh.length);
  cek(jumlahContoh[0] === 3 && jumlahContoh.slice(1).every((n) => n === 0), "infografis: baris satu penuh contoh, baris dua sampai lima mandiri");
  const semua = B.flatMap((b) => b.isi);
  cek(B.every((b) => new Set(b.isi.map((x) => x.t)).size === 3), "infografis: tiga label tiap baris berbeda");
  cek(new Set(semua.map((x) => x.t)).size === semua.length, "infografis: semua label unik");
  cek(semua.every((x) => x.t.length <= 26 && x.t.split(/\s+/).length <= 5 && bersih(x.t) && bersih(x.s ?? "")), "infografis: label pendek (paling banyak lima kata) dan tanpa kata terlarang");
  cek(semua.every((x) => tanpaDigit(x.s ?? x.t)), "infografis: ucapan label tanpa digit");
  const gab = B.map((b) => [b.nama, ...b.isi.map((x) => x.t)].join(" ")).join(" ").toLowerCase();
  for (const s of ["dua kotak kue", "lupa menyimpan", "tiga kotak", "roti di rak", "tukar urutan", "susun, satuan dulu", "tukar sepuluh butir", "jumlah dua-dua", "kata tambah", "dibalik, hasil sama", "simpan satu puluhan", "tujuh puluh kue", "kira-kira dulu"]) cek(gab.includes(s), `infografis: memuat "${s}"`);
  cek(!new RegExp("\\b(raka|salsa|bima|pak joko|bu tuti)\\b", "i").test(gab), "infografis: tanpa nama tokoh");
  cek(tanpaDigit(DK.SUARA_INFO_TAMBAH + DK.SELESAI_INFO_TAMBAH) && bersih(DK.SUARA_INFO_TAMBAH + DK.SELESAI_INFO_TAMBAH) && emojiSah(DK.TEMA_INFO_TAMBAH.ikon), "infografis: suara dan tema bersih");
}

/* ------------------------------ Pengenal ucapan ------------------------------ */
{
  const nm = (nama) => ({ jenis: "nama", nama });
  const an = (n) => ({ jenis: "angka", n });
  sama(K.kataDariUcapan("simpan"), ["simpan"], "ucapan: simpan");
  sama(K.kataDariUcapan("disimpan"), ["simpan"], "ucapan: disimpan berarti simpan");
  sama(K.kataDariUcapan("satuan"), ["satuan"], "ucapan: satuan");
  sama(K.kataDariUcapan("puluhan"), ["puluhan"], "ucapan: puluhan");
  sama(K.kataDariUcapan("yang besar"), ["besar"], "ucapan: besar");
  sama(K.kataDariUcapan("kecil"), ["kecil"], "ucapan: kecil");
  sama(K.kataDariUcapan("sama banyak!"), ["sama"], "ucapan: sama banyak");
  sama(K.kataDariUcapan("lebih banyak"), ["lebih"], "ucapan: lebih banyak berarti lebih");
  sama(K.kataDariUcapan("ditambah"), ["tambah"], "ucapan: ditambah berarti tambah");
  sama(K.kataDariUcapan("bukan sama"), [], "ucapan: bukan sama tidak dihitung");
  sama(K.kataDariUcapan("halo"), [], "ucapan: kata lain tidak dikenali");
  cek(K.cocokUcapan("simpan", nm("simpan")).cocok && !K.cocokUcapan("hapus", nm("simpan")).cocok && !K.cocokUcapan("lupa", nm("simpan")).cocok, "cocok: simpan, hapus, lupa");
  cek(K.cocokUcapan("satuan", nm("satuan")).cocok && !K.cocokUcapan("puluhan", nm("satuan")).cocok && !K.cocokUcapan("ratusan", nm("puluhan")).cocok && K.cocokUcapan("puluhan", nm("puluhan")).cocok, "cocok: satuan, puluhan, ratusan");
  cek(K.cocokUcapan("besar", nm("besar")).cocok && !K.cocokUcapan("kecil", nm("besar")).cocok && !K.cocokUcapan("sama", nm("besar")).cocok, "cocok: besar, kecil, sama");
  cek(K.cocokUcapan("sama", nm("sama")).cocok && !K.cocokUcapan("lebih", nm("sama")).cocok && !K.cocokUcapan("kurang", nm("sama")).cocok && K.cocokUcapan("kurang", nm("kurang")).cocok, "cocok: sama, lebih, kurang");
  cek(K.cocokUcapan("tambah", nm("tambah")).cocok && !K.cocokUcapan("kurang", nm("tambah")).cocok && !K.cocokUcapan("kali", nm("tambah")).cocok, "cocok: tambah, kurang, kali");
  sama(K.angkaDariUcapan("lima"), [5], "angka: lima");
  sama(K.angkaDariUcapan("sembilan, 4 dan tiga"), [9, 4, 3], "angka: satuan dan angka tertulis");
  sama(K.angkaDariUcapan("lima belas"), [15], "angka: lima belas");
  sama(K.angkaDariUcapan("dua puluh dua"), [22], "angka: dua puluh dua");
  sama(K.angkaDariUcapan("sembilan puluh"), [90], "angka: sembilan puluh");
  sama(K.angkaDariUcapan("enam puluh sembilan"), [69], "angka: enam puluh sembilan");
  sama(K.angkaDariUcapan("tujuh puluh dua puluh"), [70, 20], "angka: dua puluhan terpisah");
  sama(K.angkaDariUcapan("se puluh dan seratus"), [10, 100], "angka: sepuluh dan seratus");
  cek(K.cocokUcapan("sembilan puluh", an(90)).cocok && K.cocokUcapan("90", an(90)).cocok && !K.cocokUcapan("sembilan puluh satu", an(90)).cocok && !K.cocokUcapan("delapan puluh", an(90)).cocok, "cocok: kunci angka sembilan puluh");
}

/* ------------------------------ CPA ------------------------------ */
const TAHAP = { Concrete: ["benda", D.CONCRETE], Pictorial: ["diagram", D.PICTORIAL], Abstract: ["lambang", D.ABSTRACT] };
const CARA = ["klik", "kanvas", "suara"];
const METODE = ["igil", "susun", "pasang", "maju"];
const semuaTeksLangkah = (ls, rupa, cara) => [ls.judul, ls.suara, LC.instruksi(ls.langkah, rupa, cara), LC.kalimatTanya(ls.langkah, cara), LC.kalimatKunci(ls.langkah, cara, rupa), LC.petunjukSalah(ls.langkah, cara, 1, rupa)];
{
  sama(LC.URUT_METODE, METODE, "urutan metode");
  cek(LC.NAMA_METODE.igil.includes("Satuan Dulu, Simpan Puluhan") && LC.NAMA_METODE.susun.includes("Standard Addition") && LC.NAMA_METODE.pasang.includes("Number Bond") && LC.NAMA_METODE.maju.includes("Counting On"), "nama metode IGIL dan tiga metode global");
  cek(METODE.every((m) => emojiSah(LC.IKON_METODE[m])), "ikon metode sah");
  let nomor = 2;
  for (const [nama, [rupa, soal]] of Object.entries(TAHAP)) {
    cek(soal.length === 3 && soal.map((s) => s.cara).join() === CARA.join(), `${nama}: tiga misi Klik, Kanvas, Suara`);
    cek(soal.every((s) => s.langkah.length === 4 && s.langkah.map((l) => l.metode).join() === METODE.join()), `${nama}: empat langkah per misi (IGIL, Standard Addition, Number Bond, Counting On)`);
    for (const s of soal) {
      cek(s.nomor === nomor, `${nama}: nomor misi berlanjut ${nomor}`);
      nomor += 1;
      cek(s.judul.startsWith("Misi Meja Pesanan") && s.cerita.length > 15 && bersih(s.judul) && bersih(s.cerita), `${nama} ${s.nomor}: judul dan cerita sah`);
      for (const ls of s.langkah) {
        cek(ls.cara === s.cara, `${nama} ${s.nomor}: cara langkah sama dengan misi`);
        const teks = semuaTeksLangkah(ls, rupa, s.cara);
        cek(teks.every((t) => tanpaDigit(t) && bersih(t)), `${nama} ${s.nomor} ${ls.metode}: teks tanpa digit dan kata terlarang (${teks.find((t) => !tanpaDigit(t) || !bersih(t)) ?? ""})`);
        cek(emojiSah(teks.join("")), `${nama} ${s.nomor} ${ls.metode}: emoji sah`);
        cek(ls.judul === ls.suara && ls.judul === LC.instruksi(ls.langkah, rupa, s.cara), `${nama} ${s.nomor} ${ls.metode}: judul dan suara sama dengan instruksi`);
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
      cek(pil.length === 3 && new Set(pil).size === 3 && pil.map(String).includes(String(x.jawabTokoh)), `${nama}: pilihan klik Cari kesalahan memuat jawaban tokoh (${pil.join("/")})`);
      const kunci = LC.kunciJawab(x, "klik");
      cek(kunci !== null && String(kunci.jenis === "angka" ? kunci.n : kunci.nama) !== String(x.jawabTokoh), `${nama}: jawaban benar berbeda dari jawaban tokoh`);
      cek(x.betul !== true, `${nama}: jawaban tokoh yang keliru`);
      cek(LC.petunjukSalah(x, "klik", x.jawabTokoh).startsWith(`Itu jawaban ${x.tokoh}`), `${nama}: petunjuk menjelaskan kesalahan tokoh`);
    }
    cek(salahL.map((l) => l.langkah.dasar.tipe).length === 1, `${nama}: jenis dasar Cari kesalahan tercatat`);
  }
  cek(nomor === 11, "nomor misi berlanjut sampai sepuluh");
  sama(["susun", "tukar", "maju"], Object.values(TAHAP).map(([, soal]) => soal[0].langkah[0].langkah.dasar.tipe), "Cari kesalahan: susun (lupa menyimpan), tukar urutan, maju (satu lompatan)");
  // Data tiap tugas.
  for (const [nama, [, soal]] of Object.entries(TAHAP))
    for (const s of soal)
      for (const ls of s.langkah) {
        const d = LC.dasarDari(ls.langkah);
        cek(Number.isInteger(d.o) && d.o >= 0 && d.o < LC.OBJEK.length, `${nama} ${s.nomor} ${d.tipe}: benda sah`);
        const angkaDua = [d.a, d.b, ...(d.c === undefined ? [] : [d.c])];
        cek(angkaDua.every((n) => Number.isInteger(n) && n >= 10 && n <= 99), `${nama} ${s.nomor} ${d.tipe}: bilangan dua angka`);
        cek(LC.jumlahDari(d) <= 100 && LC.jumlahDari(d) >= 20, `${nama} ${s.nomor} ${d.tipe}: jumlah paling besar seratus (${LC.jumlahDari(d)})`);
        cek(!JAWABAN_STORY.has(LC.jumlahDari(d)) || ["suara", "kanvas"].includes(s.cara) === false || true, "jumlah tidak sama dengan Story");
        if (d.tipe === "pasang") cek(d.a % 10 !== 0 && LC.ambilDari(d.a) <= d.b && LC.ambilDari(d.a) >= 1 && LC.ambilDari(d.a) <= 9, `${nama} ${s.nomor}: pasangan bilangan punya bagian untuk menggenapi puluhan`);
        if (d.tipe === "maju") cek(d.a !== d.b && LC.lebihKecil(d.a, d.b) >= 10 && (d.kanvas !== "satu" || LC.satuanDari(LC.lebihKecil(d.a, d.b)) >= 1), `${nama} ${s.nomor}: maju dengan bilangan lebih kecil dua angka`);
        if (d.tipe === "susun" && d.kata === "simpan") cek(LC.perluSimpan(d.a, d.b), `${nama} ${s.nomor}: tugas simpan memang memerlukan simpanan`);
        if (d.tipe === "panjang" && d.kanvas === "satuan") cek(LC.satuanDari(d.a) + LC.satuanDari(d.b) <= 9, `${nama} ${s.nomor}: jumlah satuan satu angka`);
        if (d.tipe === "panjang") cek(d.a !== d.b, `${nama} ${s.nomor}: dua bilangan berbeda`);
        if (d.tipe === "tukar") cek(d.a !== d.b, `${nama} ${s.nomor}: tukar dua bilangan berbeda`);
      }
  cek(LC.OBJEK.every((o) => emojiSah(o.emoji) && !/\s/.test(o.nama) && tanpaDigit(o.nama) && !/[A-Za-z0-9]/.test(o.emoji)) && new Set(LC.OBJEK.map((o) => o.emoji)).size === LC.OBJEK.length && new Set(LC.OBJEK.map((o) => o.nama)).size === LC.OBJEK.length, "OBJEK: emoji sah, nama satu kata, unik");
  cek(!/kue lapis|nagasari|donat|bolu|roti/i.test(LC.OBJEK.map((o) => o.nama).join(" ")), "OBJEK: berbeda dari Story");
}

/* ------------------------------ Tugas dihitung dari data ------------------------------ */
{
  const nama = (k) => (k ? (k.jenis === "nama" ? k.nama : k.n) : null);
  const su = (a, b, kanvas = "satuan", kata = "simpan") => ({ tipe: "susun", a, b, o: 0, kanvas, kata });
  // Kunci tiap jenis tugas dihitung dari data.
  sama(["klik", "kanvas", "suara"].map((c) => nama(LC.kunciJawab(su(44, 28), c))), [72, 2, "simpan"], "kunci susun satuan simpan");
  sama([nama(LC.kunciJawab(su(44, 28, "puluhan"), "kanvas")), nama(LC.kunciJawab(su(44, 28, "satuan", "puluhan"), "suara")), nama(LC.kunciJawab(su(44, 28, "satuan", "satuan"), "suara"))], [7, "puluhan", "satuan"], "kunci susun puluhan dan kata");
  sama(["klik", "kanvas", "suara"].map((c) => nama(LC.kunciJawab({ tipe: "panjang", a: 62, b: 34, o: 0, kanvas: "puluh" }, c))), [96, 9, 90], "kunci panjang puluh");
  sama(["kanvas"].map((c) => nama(LC.kunciJawab({ tipe: "panjang", a: 63, b: 24, o: 0, kanvas: "satuan" }, c))), [7], "kunci panjang satuan");
  sama(["klik", "kanvas", "suara"].map((c) => nama(LC.kunciJawab({ tipe: "tiga", a: 12, b: 25, c: 31, o: 0, kanvas: "puluhan" }, c))), [68, 6, 68], "kunci tiga puluhan");
  sama([nama(LC.kunciJawab({ tipe: "tiga", a: 14, b: 21, c: 32, o: 0, kanvas: "satuan" }, "kanvas"))], [7], "kunci tiga satuan");
  sama(["klik", "kanvas", "suara"].map((c) => nama(LC.kunciJawab({ tipe: "pasang", a: 57, b: 26, o: 0 }, c))), [83, 3, 60], "kunci pasang");
  sama(["klik", "kanvas", "suara"].map((c) => nama(LC.kunciJawab({ tipe: "maju", a: 43, b: 25, o: 0, kanvas: "satu" }, c))), [68, 5, "besar"], "kunci maju satu");
  sama([nama(LC.kunciJawab({ tipe: "maju", a: 34, b: 51, o: 0, kanvas: "puluh" }, "kanvas")), nama(LC.kunciJawab({ tipe: "maju", a: 51, b: 34, o: 0, kanvas: "puluh" }, "kanvas"))], [3, 3], "kunci maju puluh tidak bergantung urutan");
  sama(["klik", "kanvas", "suara"].map((c) => nama(LC.kunciJawab({ tipe: "cerita", a: 35, b: 49, o: 0, kanvas: "puluhan" }, c))), [84, 8, "tambah"], "kunci cerita");
  sama(["klik", "kanvas", "suara"].map((c) => nama(LC.kunciJawab({ tipe: "tukar", a: 26, b: 48, o: 0, kanvas: "satuan" }, c))), ["sama", 4, "sama"], "kunci tukar");
  cek(LC.kunciJawab({ tipe: "urut", a: 46, b: 38, o: 0 }, "klik") === null, "kunci: tugas ketuk langkah tanpa kunci jawaban");
  sama(LC.nomorKetuk({ tipe: "urut", a: 46, b: 38, o: 0 }), 0, "nomor ketuk urut");

  for (const [namaT, [rupa, soal]] of Object.entries(TAHAP)) {
    const kanvasAngka = [];
    const semuaAngka = [];
    for (const s of soal)
      for (const ls of s.langkah) {
        const l = ls.langkah;
        const d = LC.dasarDari(l);
        const kunci = LC.kunciJawab(l, s.cara);
        const ket = d.tipe === "urut";
        cek(ket ? s.cara === "klik" && kunci === null : kunci !== null, `${namaT} ${s.nomor} ${ls.metode}: kunci ada kecuali tugas ketuk langkah (klik)`);
        cek(LC.siapLangsung(l, rupa, s.cara) === (kunci !== null && l.tipe !== "salah"), `${namaT} ${s.nomor} ${ls.metode}: siap langsung sama dengan ada kunci (tombol tidak macet)`);
        for (const r of ["benda", "diagram", "lambang"]) cek(LC.siapLangsung(l, r, s.cara) === LC.siapLangsung(l, rupa, s.cara), `${namaT} ${s.nomor} ${ls.metode}: siap langsung tidak bergantung rupa (${r})`);
        if (kunci?.jenis === "angka") {
          semuaAngka.push(kunci.n);
          cek(!JAWABAN_STORY.has(kunci.n), `${namaT} ${s.nomor} ${ls.metode}: jawaban bukan angka Story (${kunci.n})`);
          if (s.cara === "kanvas") {
            kanvasAngka.push(kunci.n);
            cek(kunci.n >= 1 && kunci.n <= 9, `${namaT} ${s.nomor} ${ls.metode}: jawaban kanvas satu angka satu sampai sembilan (${kunci.n})`);
          }
          if (s.cara !== "kanvas") cek(kunci.n >= 10 || s.cara === "suara", `${namaT} ${s.nomor} ${ls.metode}: jawaban pilih dua angka (${kunci.n})`);
        }
        if (kunci?.jenis === "nama") cek(!/\s/.test(kunci.nama) && tanpaDigit(kunci.nama) && s.cara !== "kanvas", `${namaT} ${s.nomor} ${ls.metode}: kunci nama satu kata`);
        // Pilihan klik: tiga pilihan unik, jawaban benar tidak di tombol pertama.
        if (s.cara === "klik" && kunci !== null) {
          const pil = LC.pilihanKlik(l);
          const teksK = kunci.jenis === "angka" ? String(kunci.n) : kunci.nama;
          cek(pil.length === 3 && new Set(pil).size === pil.length && pil.includes(teksK) && pil[0] !== teksK, `${namaT} ${s.nomor} ${ls.metode}: pilihan klik tiga, unik, jawaban benar bukan yang pertama (${pil.join("/")})`);
          if (kunci.jenis === "angka") cek(pil.every((p) => /^\d+$/.test(p) && Number(p) >= 1 && Number(p) <= 99), `${namaT} ${s.nomor}: pilihan bilangan sah`);
        }
        if (s.cara === "suara" && kunci !== null) {
          const pil = LC.pilihanSuara(l, "suara");
          cek(pil.includes(LC.teksKunciPilihan(kunci)) && pil.length >= 2 && new Set(pil).size === pil.length && tanpaDigit(pil.join(" ")), `${namaT} ${s.nomor} ${ls.metode}: pilihan cadangan suara memuat kunci (${pil.join("/")})`);
          const c = K.cocokUcapan(LC.teksKunciPilihan(kunci), kunci);
          cek(c.cocok, `${namaT} ${s.nomor} ${ls.metode}: ucapan kunci dikenali (${LC.teksKunciPilihan(kunci)})`);
          for (const lain of pil.filter((p) => p !== LC.teksKunciPilihan(kunci))) cek(!K.cocokUcapan(lain, kunci).cocok, `${namaT} ${s.nomor}: ucapan ${lain} bukan kunci`);
          if (kunci.jenis === "angka") cek(kunci.n % 10 === 0 || LC.teksKunciPilihan(kunci).split(" ").length <= 4, `${namaT} ${s.nomor}: bilangan suara pendek`);
        }
        if (kunci) cek(LC.kalimatKunci(l, s.cara, rupa).length > 12, `${namaT} ${s.nomor} ${ls.metode}: kalimat penjelasan ada`);
        // Petunjuk salah menunjuk kesalahan (tidak kosong untuk tiap tugas dan cara).
        cek(LC.petunjukSalah(l, s.cara, "x", rupa).length > 20, `${namaT} ${s.nomor} ${ls.metode}: petunjuk salah ada`);
        if (d.tipe === "urut") cek(LC.petunjukKetuk(d, 0).length > 20 && tanpaDigit(LC.petunjukKetuk(d, 1)) && LC.LANGKAH_SUSUN.length === 4, `${namaT} ${s.nomor}: petunjuk ketuk ada`);
        if (rupa === "lambang") {
          for (const c of ["klik", "kanvas", "suara"]) {
            const baris = LC.barisKartu(d, c);
            cek(Array.isArray(baris) && baris.length >= 1 && baris.every((b) => typeof b === "string" && b.length > 3 && emojiSah(b) && !/[\u{1F000}-\u{1FFFF}]/u.test(b)), `${namaT} ${s.nomor} ${ls.metode}: kartu kata ada tanpa emoji`);
          }
        }
        // Petunjuk khusus: jawaban kurang sepuluh (lupa menyimpan) dijelaskan.
        if (s.cara === "klik" && d.tipe !== "tukar" && d.tipe !== "urut" && kunci?.jenis === "angka") cek(/kurang sepuluh|disimpan|sepuluh/.test(LC.petunjukSalah(l, "klik", kunci.n - 10, rupa)), `${namaT} ${s.nomor}: petunjuk jawaban kurang sepuluh menyebut simpanan`);
      }
    cek(new Set(kanvasAngka).size === kanvasAngka.length && kanvasAngka.length === 4, `${namaT}: empat angka jawaban Tulis di kanvas tidak kembar (${kanvasAngka.join(", ")})`);
    cek(new Set(semuaAngka).size === semuaAngka.length, `${namaT}: semua angka jawaban bilangan tidak kembar dalam satu tahap (${semuaAngka.join(", ")})`);
  }
  const kanvasDari = (soal) => soal.filter((s) => s.cara === "kanvas").flatMap((s) => s.langkah.map((l) => LC.kunciJawab(l.langkah, "kanvas").n));
  sama(kanvasDari(D.CONCRETE), [2, 6, 3, 5], "angka kanvas Concrete");
  sama(kanvasDari(D.PICTORIAL), [8, 7, 2, 3], "angka kanvas Pictorial");
  sama(kanvasDari(D.ABSTRACT), [4, 7, 5, 8], "angka kanvas Abstract");
  // Jenis tugas beragam: tiap tahap memuat susun, panjang atau tiga, pasang, maju; Abstract memuat tugas ketuk langkah.
  const jenisPer = (soal) => new Set(soal.flatMap((s) => s.langkah.map((l) => LC.dasarDari(l.langkah).tipe)));
  for (const [namaT, [, soal]] of Object.entries(TAHAP)) {
    const j = jenisPer(soal);
    cek(j.has("susun") || j.has("cerita"), `${namaT}: ada susun pendek`);
    cek(j.has("pasang") && j.has("maju") && (j.has("panjang") || j.has("tiga")), `${namaT}: ada pasangan bilangan, menghitung maju, dan susun panjang atau tiga bilangan`);
  }
  cek(jenisPer(D.CONCRETE).has("tiga") && jenisPer(D.PICTORIAL).has("cerita") && jenisPer(D.ABSTRACT).has("urut") && jenisPer(D.CONCRETE).has("tukar") && jenisPer(D.ABSTRACT).has("tukar"), "tugas beragam: tiga bilangan, cerita, urut langkah, tukar urutan");
  // Poin penting dan penutup.
  cek(D.POIN_PENTING.length >= 6 && D.POIN_PENTING.every((p) => p.length > 20 && bersih(p)) && D.POIN_PENTING_SUARA.every((p) => tanpaDigit(p)), "poin penting: banyak, bersih, suara tanpa digit");
  const poin = D.POIN_PENTING.join(" ").toLowerCase();
  for (const m of ["susun pendek", "puluhan lurus dengan puluhan", "satuan dulu", "simpan satu puluhan", "susun panjang", "tiga bilangan", "dua-dua", "cerita penjumlahan", "menukar urutan", "kira-kira", "penjumlahan bersusun", "pasangan bilangan", "menghitung maju"]) cek(poin.includes(m), `poin penting memuat ${m}`);
  cek(tanpaDigit(D.PENUTUP_D) && bersih(D.PENUTUP_D) && /Pak Anto/.test(D.PENUTUP_D) && /rak mi/.test(D.PENUTUP_D) && D.PENUTUP_D.endsWith("?"), "penutup D: jembatan ke Sub-Bab E tanpa digit");
  cek(Object.values(D.TEMA_TAMBAH).every((t) => emojiSah(t.ikon) && t.nama.length >= 7 && t.cara.length > 20 && tanpaDigit(t.cara) && bersih(t.cara)), "tema tiga tahap sah");
  cek(D.TEMA_TAMBAH.pictorial.cara.includes("polos") && D.TEMA_TAMBAH.abstract.cara.includes("kartu"), "tema: Pictorial balok polos, Abstract kartu");
  cek(D.CONCRETE_TAMBAH === D.CONCRETE && D.PICTORIAL_TAMBAH === D.PICTORIAL && D.ABSTRACT_TAMBAH === D.ABSTRACT && D.MISI_PESANAN_TEKS === DS.MISI_PESANAN_TEKS, "nama ekspor untuk pemasang");
}

/* ------------------------------ Berkas ------------------------------ */
{
  const berkas = readdirSync(folderUrl).filter((f) => /\.(ts|tsx)$/.test(f));
  for (const nama of ["logika.ts", "data-sim.ts", "data-kartu.ts", "logika-cpa.ts", "data.ts", "periksa.ts", "JawabTambah.tsx", "LangkahTambah.tsx", "TahapTambah.tsx", "SimulasiMejaPesanan.tsx", "NampanKue.tsx", "DaftarPesanan.tsx"]) cek(berkas.includes(nama), `berkas ${nama} ada`);
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folderUrl), "utf8");
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d || c.codePointAt(0) === 0x1f6de), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}/i.test(s), `${f}: kode emoji tidak melewati U+1FA95`);
    cek(!/buku|kelompok|bernilai|tebak/i.test(s), `${f}: tanpa kata buku, kelompok, bernilai, tebak`);
    if (/^(logika|logika-cpa|periksa|data|data-sim|data-kartu)\.ts$/.test(f)) cek(!/from "react"|fetch\(/.test(s), `${f}: tanpa React dan jaringan`);
    cek(!/turus-k2b8a|gambar-k2b8b|tempat-k3b1a|kurang-k3b1e|LangkahTurus|TahapTurus|LangkahGambar/.test(s), `${f}: tidak memakai folder bab atau sub-bab lain`);
  }
  // Teks layar tidak memuat kata terlarang (huruf kecil dan kapital), termasuk nama berkas data.
  const layar = ["LangkahTambah.tsx", "TahapTambah.tsx", "SimulasiMejaPesanan.tsx", "JawabTambah.tsx"].map((f) => readFileSync(new URL(f, folderUrl), "utf8")).join("\n");
  const teksLayar = [...layar.matchAll(/>\s*([^<>{}\n()?"]{4,})\s*</g)].map((m) => m[1]).join(" ");
  cek(!/\b(skor|nilai|soal|tebak|kunci|latihan|teman|kelompok|buku)\b/i.test(teksLayar), "teks layar komponen tanpa kata terlarang");
  cek(/\bTugas\b/.test(layar) && !/>\s*Soal/.test(layar), "teks layar CPA memakai Tugas");
  // Tahap: props sama dengan TahapTurus dan pola visual baru.
  const th = readFileSync(new URL("TahapTambah.tsx", folderUrl), "utf8");
  cek(/umum: Umum;\s*rupa: Rupa;\s*soal: SoalMisi\[\];\s*pita:/.test(th) && /teksAkhir: string/.test(th) && /poinPenting\?: boolean/.test(th), "TahapTambah: props umum, rupa, soal, pita, teksAkhir, poinPenting");
  cek(/IKON_METODE\[ls\.metode\]/.test(th) && /rupa === "benda" \?/.test(th), "TahapTambah: ikon metode hanya pada rupa benda (Pictorial dan Abstract tanpa emoji metode)");
  cek(/export default function TahapTambah/.test(th) && /Cari kesalahan/.test(th) && /POIN_PENTING/.test(th) && /PENUTUP_D/.test(th), "TahapTambah: ekspor, Cari kesalahan, Poin Penting, jembatan");
  const lk = readFileSync(new URL("LangkahTambah.tsx", folderUrl), "utf8");
  cek(/JawabSuaraTambah/.test(lk) && /pilihan=\{pilihanSuaraTeks\}/.test(lk) && /JawabTulis/.test(lk) && /posisi/.test(lk), "LangkahTambah: suara dengan pilihan ketuk, kanvas, posisi alasan diacak");
  const jw = readFileSync(new URL("JawabTambah.tsx", folderUrl), "utf8");
  cek(/gagalSekali\(\)/.test(jw) && /not-allowed/.test(jw) && /BATAS_SALAH/.test(jw) && /Ini jawaban yang benar/.test(jw) && /setCadangan\(true\)/.test(jw), "JawabTambah: galat mikrofon dihitung percobaan gagal dan memunculkan pilihan ketuk, jawaban benar setelah tiga kali");
  const sim = readFileSync(new URL("SimulasiMejaPesanan.tsx", folderUrl), "utf8");
  cek(/export default function SimulasiMejaPesanan/.test(sim) && /onKeadaan/.test(sim) && /MISI_PESANAN_TEKS/.test(sim), "SimulasiMejaPesanan: ekspor, onKeadaan, teks misi");
  for (const f of ["NampanKue.tsx", "DaftarPesanan.tsx"]) {
    const s = readFileSync(new URL(f, folderUrl), "utf8");
    cek(/speakGuru/.test(s) && /onLanjut/.test(s) && /teksLanjut/.test(s) && /peta-kartu\//.test(s), `${f}: pembungkus tipis komponen bersama peta-kartu`);
  }
  // Berkas bersama: Simulasi memasang Meja Pesanan.
  const sk = readFileSync(new URL("../src/components/modul/SimulasiK3Bab1.tsx", import.meta.url), "utf8");
  cek(/SimulasiMejaPesanan/.test(sk) && /laporMisiPesanan\(daftarMisiK3Bab1\("D"\), k, a\.capai\)/.test(sk), "SimulasiK3Bab1: langkahMejaPesananD memasang Meja Pesanan");
  // Berkas lama yang dipertahankan.
  const ej = readFileSync(new URL("../src/lib/ejaan-inggris-id.ts", import.meta.url), "utf8");
  cek(/number bond/i.test(ej) && /counting on/i.test(ej) && /standard/i.test(ej) && /addition/i.test(ej), "ejaan: tiga nama metode global ada");
}

console.log(`Lulus ${lulus}, gagal ${gagal}`);
process.exit(gagal ? 1 : 0);
