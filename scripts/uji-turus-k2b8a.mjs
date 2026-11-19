// Uji Mind-map (Peti Alat Musik), Infografis (Papan Catatan), Simulasi Meja Catat, dan tahap Concrete, Pictorial, Abstract Kelas 2 Bab 8 Sub-Bab A ("Alat Musik Pak Hendra"),
// awal cerita Pentas Seni Sekolah.
// Memeriksa: logika simulasi (pilah, turus, tabel, baca, data), misi (awal tidak memenuhi, wajib empat, bebas dua), peti alat musik (sembilan kartu geser Masalah, Cara, Hasil memuat semua
// metode Story), papan catatan dari data Story, CPA dua belas langkah per tahap (Klik, Kanvas, Suara x empat metode) dengan jawaban beragam dan Cari kesalahan di tiap tahap, kunci
// dihitung dari data, angka jawaban tidak kembar per tahap, tugas yang langsung siap (jebakan tombol macet), pengenal ucapan, petunjuk salah, batas rupa, emoji, kata terlarang, akhir baris.
// Jalankan: node --no-warnings scripts/uji-turus-k2b8a.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/turus-k2b8a/logika.ts");
const DP = await import("../src/components/modul/turus-k2b8a/data-peta.ts");
const DK = await import("../src/components/modul/turus-k2b8a/data-kartu.ts");
const LC = await import("../src/components/modul/turus-k2b8a/logika-cpa.ts");
const D = await import("../src/components/modul/turus-k2b8a/data.ts");
const K = await import("../src/components/modul/turus-k2b8a/periksa.ts");
const S = await import("../src/components/modul/misi-simulasi.ts");
const MK = await import("../src/components/modul/misi-k2bab8.ts");
const folderUrl = new URL("../src/components/modul/turus-k2b8a/", import.meta.url);

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

/* ------------------------------ Kata bilangan ------------------------------ */
{
  sama([0, 1, 9, 10, 11, 15, 20, 38, 100].map(LC.kataBil), ["nol", "satu", "sembilan", "sepuluh", "sebelas", "lima belas", "dua puluh", "tiga puluh delapan", "seratus"], "kata bilangan CPA");
  sama([L.kata(7), L.kata(12), L.kata(20)], ["tujuh", "dua belas", "dua puluh"], "kata bilangan simulasi");
  cek(LC.kata === LC.kataBil, "alias kata");
  for (let n = 1; n <= 99; n += 1) cek(tanpaDigit(LC.kataBil(n)) && LC.kataBil(n) === L.kata(n), `kata bilangan ${n} sama di simulasi dan CPA`);
}

/* ------------------------------ Simulasi: data dan logika ------------------------------ */
{
  const BS = DP.BENDA_SIM;
  cek(BS.length === 4 && new Set(BS.map((b) => b.id)).size === 4 && new Set(BS.map((b) => b.nama)).size === 4 && new Set(BS.map((b) => b.emoji)).size === 4, "simulasi: empat jenis benda unik");
  for (const b of BS) cek(emojiSah(b.emoji) && tanpaDigit(b.nama) && bersih(b.nama) && b.banyak >= 3 && b.banyak <= 9, `${b.id}: emoji dan nama sah, banyak satu angka`);
  sama(BS.map((b) => b.banyak), [7, 5, 3, 5], "simulasi: banyak benda");
  cek(!/angklung|seruling|gendang|rebana|topi|selendang|sepatu/i.test(BS.map((b) => b.nama).join(" ")), "simulasi: benda berbeda dari Story");
  cek(L.TOTAL_BENDA === 20 && L.JENIS_BENDA.length === 20, "simulasi: dua puluh benda di tumpukan");
  sama([0, 1, 2, 3].map((j) => L.JENIS_BENDA.filter((x) => x === j).length), [7, 5, 3, 5], "simulasi: tumpukan memuat banyak tiap jenis");
  cek(L.JENIS_BENDA.some((j, i) => i > 0 && j !== L.JENIS_BENDA[i - 1]) && L.JENIS_BENDA.slice(0, 7).join() !== "0,0,0,0,0,0,0", "simulasi: tumpukan campur aduk, bukan urut jenis");
  sama([L.jenisTerbanyak(), L.jenisTersedikit(), L.lebihnya()], [0, 2, 4], "simulasi: paling banyak lampu, paling sedikit kabel, lebihnya empat");
  cek(DP.PILIHAN_LEBIH.length === 3 && DP.PILIHAN_LEBIH.includes(L.lebihnya()), "simulasi: tiga pilihan lebihnya memuat yang tepat");
  sama(DP.JAWABAN_DATA.length, 9, "simulasi: sembilan jawaban");
  sama([0, 1, 2].map((w) => DP.JAWABAN_DATA.filter((x) => x === w).length), [4, 3, 2], "simulasi: merah empat, biru tiga, kuning dua");
  cek(DP.WARNA_DATA.length === 3 && DP.WARNA_DATA.every((w) => emojiSah(w.emoji) && bersih(w.nama)), "simulasi: tiga warna sah");
  cek(tanpaDigit(DP.MISI_CATAT_TEKS) && bersih(DP.MISI_CATAT_TEKS), "simulasi: teks misi tanpa digit dan kata terlarang");

  const a = L.awalCatat();
  cek(a.alat === "catat" && a.mode === "pilah" && a.letak.every((x) => x === -1) && !a.pilahSelesai && a.turus.every((x) => x === 0) && !a.tabelBenar && !a.bacaBenar && !a.samaTemu && !a.dataSelesai, "simulasi: keadaan awal kosong");
  // Pilah.
  let z = a;
  const bukanLampu = L.JENIS_BENDA.findIndex((j) => j !== 0);
  z = L.pilihBenda(z, bukanLampu).k;
  cek(z.pilih === bukanLampu, "pilah: ketuk benda memilihnya");
  const r1 = L.taruhBenda(z, 0);
  cek(!r1.ok && r1.alasan === "keliru" && r1.k.salah === 1 && r1.k.letak[bukanLampu] === -1, "pilah: salah baris tidak memindahkan dan menambah hitungan keliru");
  cek(!L.taruhBenda(a, 0).ok && L.taruhBenda(a, 0).alasan === "belum", "pilah: taruh tanpa memilih benda tidak berjalan");
  const r2 = L.taruhBenda(z, L.JENIS_BENDA[bukanLampu]);
  cek(r2.ok && r2.k.letak[bukanLampu] === L.JENIS_BENDA[bukanLampu] && r2.k.pilih === -1, "pilah: baris tepat memindahkan benda");
  cek(!L.pilihBenda(r2.k, bukanLampu).ok, "pilah: benda yang sudah di baris tidak bisa dipilih lagi");
  cek(L.pilihBenda(L.pilihBenda(a, 3).k, 3).k.pilih === -1, "pilah: ketuk dua kali melepas pilihan");
  let p = a;
  for (let i = 0; i < L.TOTAL_BENDA; i += 1) {
    cek(!p.pilahSelesai, `pilah: belum selesai sebelum benda ke-${i}`);
    p = L.taruhBenda(L.pilihBenda(p, i).k, L.JENIS_BENDA[i]).k;
  }
  cek(p.pilahSelesai && L.sisaTumpukan(p) === 0 && [0, 1, 2, 3].every((j) => L.dibaris(p, j) === DP.BENDA_SIM[j].banyak), "pilah: semua terpilah memenuhi pilahSelesai");
  sama(S.misiBaru(MK.MISI_A, p, new Set()), ["a-pilah"], "pilah: misi a-pilah");
  cek(L.kalimatPilah(a).length > 10 && tanpaDigit(L.kalimatPilah(p)) && tanpaDigit(L.kalimatPilah(z)) && tanpaDigit(L.petunjukPilah(z)), "pilah: kalimat tanpa digit");
  // Turus.
  let t = L.pilihModeCatat(a, "turus");
  t = L.pilihJenisTurus(t, 2);
  for (let i = 0; i < 2; i += 1) t = L.ubahTurus(t, 1).k;
  const salahT = L.periksaTurus(t);
  cek(!salahT.ok && salahT.k.salah === 1 && salahT.k.turusBenar.length === 0 && /kurang/.test(L.petunjukTurus(t)), "turus: dua garis untuk kabel belum tepat (kurang)");
  t = L.ubahTurus(t, 1).k;
  cek(L.periksaTurus(t).ok && L.periksaTurus(t).k.turusBenar.join() === "2", "turus: tiga garis untuk kabel tepat");
  cek(/tiga garis/i.test(L.kalimatTurus(t)) && tanpaDigit(L.kalimatTurus(t)), "turus: kalimat tiga garis");
  let t2 = L.pilihJenisTurus(L.periksaTurus(t).k, 0);
  for (let i = 0; i < 7; i += 1) t2 = L.ubahTurus(t2, 1).k;
  cek(/satu bundel lima dan dua garis/i.test(L.kalimatTurus(L.ubahTurus(L.pilihJenisTurus(t2, 0), -1).k) + L.kalimatTurus(t2)) || /bundel lima dan dua garis/i.test(L.kalimatTurus(t2)), "turus: tujuh garis jadi satu bundel lima dan dua garis");
  cek(L.periksaTurus(t2).k.turusBenar.join() === "2,0", "turus: tujuh garis untuk lampu tepat");
  sama(S.misiBaru(MK.MISI_A, L.periksaTurus(t2).k, new Set()), ["a-turus"], "turus: dua jenis tepat memenuhi a-turus");
  cek(L.ubahTurus(L.pilihJenisTurus(a, 0), -1).ok === false, "turus: tidak bisa menghapus garis bila kosong");
  let t3 = L.pilihJenisTurus(a, 1);
  for (let i = 0; i < 10; i += 1) t3 = L.ubahTurus(t3, 1).k;
  cek(!L.ubahTurus(t3, 1).ok && t3.turus[1] === 10, "turus: paling banyak sepuluh garis");
  cek(!L.ubahTurus(L.periksaTurus(L.pilihJenisTurus({ ...t, turus: [0, 5, 3, 0] }, 1)).k, 1).k.turusBenar.includes(1), "turus: mengubah garis membatalkan tanda tepat");
  sama([L.bundelDi(7), L.sisaGaris(7), L.bundelDi(5), L.sisaGaris(5)], [1, 2, 1, 0], "turus: bundel dan sisa");
  // Tabel.
  let tb = L.pilihModeCatat(a, "tabel");
  tb = L.ubahTabel(L.ubahTabel(tb, 0, 1).k, 0, 1).k;
  cek(!L.periksaTabel(tb).ok && L.periksaTabel(tb).k.salah === 1 && /lampu/.test(L.petunjukTabel(tb)), "tabel: isian keliru");
  const penuh = { ...tb, tabel: [7, 5, 3, 5] };
  cek(L.periksaTabel(penuh).ok && L.periksaTabel(penuh).k.tabelBenar, "tabel: isian tepat benar");
  sama(S.misiBaru(MK.MISI_A, L.periksaTabel(penuh).k, new Set()), ["a-tabel"], "tabel: misi a-tabel");
  cek(!L.ubahTabel(a, 0, -1).ok && !L.ubahTabel({ ...a, tabel: [9, 0, 0, 0] }, 0, 1).ok, "tabel: kolom nol sampai sembilan");
  cek(!L.ubahTabel(L.periksaTabel(penuh).k, 0, 1).k.tabelBenar, "tabel: mengubah isian membatalkan tabel benar");
  // Baca.
  let b = L.pilihModeCatat(a, "baca");
  b = L.pilihLebih(L.pilihMax(b, 1), 4);
  cek(!L.periksaBaca(b).ok && /belum yang paling banyak/.test(L.petunjukBaca(b)), "baca: jenis keliru");
  b = L.pilihLebih(L.pilihMax(b, 0), 3);
  cek(!L.periksaBaca(b).ok && /Lebihnya belum tepat/.test(L.petunjukBaca(b)), "baca: lebihnya keliru");
  b = L.pilihLebih(b, 4);
  cek(L.periksaBaca(b).ok && L.periksaBaca(b).k.bacaBenar && tanpaDigit(L.kalimatBaca(L.periksaBaca(b).k)), "baca: jenis dan lebihnya tepat");
  sama(S.misiBaru(MK.MISI_A, L.periksaBaca(b).k, new Set()), ["a-baca"], "baca: misi a-baca");
  cek(L.pilihLebih(a, 9).bacaLebih === -1 && L.pilihMax(a, 9).bacaMax === -1, "baca: pilihan di luar daftar diabaikan");
  let bd = L.pilihBanding(L.pilihBanding(a, 1), 3);
  cek(bd.samaTemu && /sama banyak/.test(L.kalimatBanding(bd)) && tanpaDigit(L.kalimatBanding(bd)), "banding: kursi lipat dan mikrofon sama banyak");
  sama(S.misiBaru(MK.MISI_A, bd, new Set()), ["a-sama"], "banding: misi a-sama");
  bd = L.pilihBanding(L.pilihBanding(a, 0), 2);
  cek(!bd.samaTemu && /empat lebihnya/.test(L.kalimatBanding(bd)) && /empat kurangnya/.test(L.kalimatBanding(bd)), "banding: lampu empat lebihnya dari kabel");
  cek(L.pilihBanding(L.pilihBanding(L.pilihBanding(a, 0), 2), 1).banding.join() === "1", "banding: ketukan ketiga memulai pasangan baru");
  cek(L.pilihBanding(L.pilihBanding(a, 0), 0).banding.length === 1, "banding: jenis yang sama dua kali tidak dihitung");
  // Data sendiri.
  let d = L.pilihModeCatat(a, "data");
  const salahD = L.catatJawaban(d, 1);
  cek(!salahD.ok && salahD.k.salah === 1 && salahD.k.dataKe === 0 && /merah/.test(L.petunjukData(d)), "data: baris warna keliru");
  for (const w of DP.JAWABAN_DATA) {
    cek(!d.dataSelesai, "data: belum selesai sebelum semua jawaban");
    d = L.catatJawaban(d, w).k;
  }
  cek(d.dataSelesai && d.dataKe === 9 && d.dataGaris.join() === "4,3,2" && /Merah paling banyak/.test(L.kalimatData(d)) && tanpaDigit(L.kalimatData(d)), "data: sembilan jawaban tercatat, merah paling banyak");
  cek(!L.catatJawaban(d, 0).ok, "data: tidak ada jawaban lagi setelah selesai");
  sama(S.misiBaru(MK.MISI_A, d, new Set()), ["a-data"], "data: misi a-data");
  cek(tanpaDigit(L.kalimatData(L.pilihModeCatat(a, "data"))), "data: kalimat awal tanpa digit");
  cek(L.mulaiLagiCatat().letak.every((x) => x === -1) && L.mulaiLagiCatat().dataKe === 0, "mulai lagi: kembali ke awal");
  // Misi.
  const A = MK.MISI_A;
  cek(A.filter((m) => m.wajib).length === 4 && A.filter((m) => !m.wajib).length === 2, "misi A: empat wajib, dua bebas");
  cek(new Set(A.map((m) => m.id)).size === 6 && A.every((m) => m.id.startsWith("a-") && m.teks.length >= 10 && m.teks.length <= 120 && tanpaDigit(m.teks) && bersih(m.teks)), "misi A: id berawalan a-, unik, 10 sampai 120 huruf, tanpa digit");
  sama(MK.daftarMisiK2Bab8("A"), A, "daftarMisiK2Bab8 A");
  cek(A.every((m) => !m.cek({ alat: "kerangka" })), "misi A: alat lain tidak memenuhi misi");
  sama(S.misiBaru(A, a, new Set()), [], "misi A: keadaan awal tanpa misi baru");
  cek(S.misiBaru(A, { ...a, salah: 9, mode: "turus", turus: [4, 5, 3, 1], tabel: [7, 5, 3, 5], bacaMax: 0, bacaLebih: 4, banding: [0, 1], dataKe: 8 }, new Set()).length === 0, "misi A: isian yang belum diperiksa tidak dihitung sebagai misi");
}

/* ------------------------------ Mind-map: peti alat musik (sembilan kartu geser) ------------------------------ */
{
  const KA = DK.KARTU_TURUS;
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
  for (const m of ["Alas Pilah", "Hitung Lima-Lima", "Diagram Benda Nyata", "Dipilah", "Satu benda satu garis", "Empat garis lalu coretan", "Tabel tiga kolom", "Bandingkan baris", "Tanya, catat satu garis"]) cek(cara.toLowerCase().includes(m.toLowerCase()), `kartu: cara memuat ${m}`);
  const gab = KA.map((k) => [k.judul, k.masalah.label, k.cara.label, k.hasil.label, k.masalah.arti, k.cara.arti, k.hasil.arti].join(" ")).join(" ").toLowerCase();
  for (const s of ["satu bundel berisi lima", "garis tegak", "tidak terlewat", "kolom nama, turus, dan banyaknya", "judul", "paling banyak", "paling sedikit", "sama banyak", "lebihnya", "kurangnya", "data sendiri", "lompat lima-lima", "garis dasar", "lajur terpanjang"]) cek(gab.includes(s), `kartu: memuat poin "${s}"`);
  cek(!new RegExp("\\b(chacha|dika|nia|bu sari|pak hendra|bu maya|angklung|seruling|gendang|rebana|peti|panggung)\\b", "i").test(gab.replace(/judul.*?peti alat musik/g, "")), "kartu: hanya poin pelajaran (tanpa tokoh dan benda cerita)");
  cek(tanpaDigit(DK.SUARA_KARTU_TURUS + DK.SELESAI_KARTU_TURUS) && bersih(DK.SUARA_KARTU_TURUS + DK.SELESAI_KARTU_TURUS), "kartu: suara dan pesan selesai tanpa digit dan kata terlarang");
  cek(emojiSah(DK.TEMA_KARTU_TURUS.ikon) && DK.TEMA_KARTU_TURUS.judul.length > 5, "kartu: tema sah");
  const RG = DK.RINGKASAN_TURUS;
  cek(RG.ikon.length === DK.KARTU_TURUS.length && new Set(RG.ikon).size === RG.ikon.length && [...RG.ikon, RG.pusat].every((e) => emojiSah(e) && !/[A-Za-z0-9]/.test(e)), "peta radial: satu gambar unik per kartu, gambar sah tanpa huruf");
  cek(tanpaDigit(RG.suara) && bersih(RG.suara) && !RG.ikon.includes(RG.pusat), "peta radial: suara bersih dan pusat berbeda dari cabang");
}

/* ------------------------------ Infografis: papan catatan (satu tabel lima baris) ------------------------------ */
{
  const B = DK.BARIS_INFO_TURUS;
  cek(B.length === 5 && DK.KOLOM_INFO_TURUS.length === 3, "infografis: lima baris dan tiga kolom");
  cek(B.every((b) => b.isi.length === 3 && emojiSah(b.ikon) && b.nama.length > 4), "infografis: tiap baris tiga isian, emoji sah");
  const jumlahContoh = B.map((b) => b.contoh.length);
  cek(jumlahContoh[0] === 3 && jumlahContoh.slice(1).every((n) => n === 0), "infografis: baris satu penuh contoh, baris dua sampai lima mandiri");
  const semua = B.flatMap((b) => b.isi);
  cek(B.every((b) => new Set(b.isi.map((x) => x.t)).size === 3), "infografis: tiga label tiap baris berbeda");
  cek(new Set(semua.map((x) => x.t)).size === semua.length, "infografis: semua label unik");
  cek(semua.every((x) => x.t.length <= 26 && x.t.split(/\s+/).length <= 5 && bersih(x.t) && bersih(x.s ?? "")), "infografis: label pendek (paling banyak lima kata) dan tanpa kata terlarang");
  cek(semua.every((x) => tanpaDigit(x.s ?? x.t)), "infografis: ucapan label tanpa digit");
  const gab = B.map((b) => [b.nama, ...b.isi.map((x) => x.t)].join(" ")).join(" ").toLowerCase();
  for (const s of ["peti campur", "angklung sembilan", "tabel alat musik", "gendang dan rebana", "penampilan pilihan", "dipilah menurut jenis", "satu bundel, empat garis", "sembilan turus", "nama, turus, banyaknya", "angklung paling banyak", "turus sama panjang", "sama banyak", "satu garis tiap jawaban", "tari paling banyak", "dua belas anak"]) cek(gab.includes(s), `infografis: memuat "${s}"`);
  cek(!new RegExp("\\b(chacha|dika|nia|bu sari|pak hendra)\\b", "i").test(gab), "infografis: tanpa nama tokoh");
  cek(tanpaDigit(DK.SUARA_INFO_TURUS + DK.SELESAI_INFO_TURUS) && bersih(DK.SUARA_INFO_TURUS + DK.SELESAI_INFO_TURUS) && emojiSah(DK.TEMA_INFO_TURUS.ikon), "infografis: suara dan tema bersih");
}

/* ------------------------------ Pengenal ucapan ------------------------------ */
{
  const nm = (nama) => ({ jenis: "nama", nama });
  const an = (n) => ({ jenis: "angka", n });
  sama(K.kataDariUcapan("turus"), ["turus"], "ucapan: turus");
  sama(K.kataDariUcapan("bundel"), ["bundel"], "ucapan: bundel");
  sama(K.kataDariUcapan("bundle"), ["bundel"], "ucapan: bundle berarti bundel");
  sama(K.kataDariUcapan("lebih banyak"), ["lebih"], "ucapan: lebih banyak berarti lebih");
  sama(K.kataDariUcapan("kurang"), ["kurang"], "ucapan: kurang");
  sama(K.kataDariUcapan("sama banyak!"), ["sama"], "ucapan: sama banyak");
  sama(K.kataDariUcapan("bukan sama"), [], "ucapan: bukan sama tidak dihitung");
  sama(K.kataDariUcapan("guitar"), ["gitar"], "ucapan: guitar berarti gitar");
  sama(K.kataDariUcapan("trompet"), ["terompet"], "ucapan: trompet berarti terompet");
  sama(K.kataDariUcapan("halo"), [], "ucapan: kata lain tidak dikenali");
  cek(K.cocokUcapan("turus", nm("turus")).cocok && !K.cocokUcapan("turus", nm("bundel")).cocok && K.cocokUcapan("bundel", nm("bundel")).cocok, "cocok: turus dan bundel");
  cek(K.cocokUcapan("lebih", nm("lebih")).cocok && K.cocokUcapan("kurang", nm("kurang")).cocok && !K.cocokUcapan("lebih", nm("kurang")).cocok && K.cocokUcapan("sama", nm("sama")).cocok, "cocok: lebih, kurang, sama");
  for (const o of LC.OBJEK) cek(K.cocokUcapan(o.nama, nm(o.nama)).cocok && K.kataDariUcapan(o.nama).length === 1, `cocok: nama jenis ${o.nama}`);
  sama(K.angkaDariUcapan("lima"), [5], "angka: lima");
  sama(K.angkaDariUcapan("sembilan, 4 dan tiga"), [9, 4, 3], "angka: satuan dan angka tertulis");
  sama(K.angkaDariUcapan("lima belas"), [15], "angka: lima belas");
  sama(K.angkaDariUcapan("dua puluh dua"), [22], "angka: dua puluh dua");
  cek(K.cocokUcapan("lima", an(5)).cocok && K.cocokUcapan("5", an(5)).cocok && !K.cocokUcapan("enam", an(5)).cocok, "cocok: kunci angka lima");
  cek(K.cocokUcapan("satu bundel berisi lima turus", an(5)).cocok, "cocok: kalimat memuat lima");
}

/* ------------------------------ CPA ------------------------------ */
const TAHAP = { Concrete: ["benda", D.CONCRETE], Pictorial: ["diagram", D.PICTORIAL], Abstract: ["lambang", D.ABSTRACT] };
const CARA = ["klik", "kanvas", "suara"];
const METODE = ["igil", "alas", "lima", "nyata"];
const semuaTeksLangkah = (ls, rupa, cara) => [ls.judul, ls.suara, LC.instruksi(ls.langkah, rupa, cara), LC.kalimatTanya(ls.langkah, cara), LC.kalimatKunci(ls.langkah, cara, rupa), LC.petunjukSalah(ls.langkah, cara, 1, rupa)];
{
  sama(LC.URUT_METODE, METODE, "urutan metode");
  cek(LC.NAMA_METODE.igil.includes("Pilah, Garis, Bundel Lima") && LC.NAMA_METODE.alas.includes("Sorting Mat") && LC.NAMA_METODE.lima.includes("Count by Fives") && LC.NAMA_METODE.nyata.includes("Real Graph"), "nama metode IGIL dan tiga metode global");
  cek(METODE.every((m) => emojiSah(LC.IKON_METODE[m])), "ikon metode sah");
  let nomor = 2;
  for (const [nama, [rupa, soal]] of Object.entries(TAHAP)) {
    cek(soal.length === 3 && soal.map((s) => s.cara).join() === CARA.join(), `${nama}: tiga misi Klik, Kanvas, Suara`);
    cek(soal.every((s) => s.langkah.length === 4 && s.langkah.map((l) => l.metode).join() === METODE.join()), `${nama}: empat langkah per misi (IGIL, Sorting Mat, Count by Fives, Real Graph)`);
    for (const s of soal) {
      cek(s.nomor === nomor, `${nama}: nomor misi berlanjut ${nomor}`);
      nomor += 1;
      cek(s.judul.startsWith("Misi Meja Catat") && s.cerita.length > 15 && bersih(s.judul) && bersih(s.cerita), `${nama} ${s.nomor}: judul dan cerita sah`);
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
      cek(x.alasan.length === 3 && new Set(x.alasan).size === 3 && x.benar >= 0 && x.benar <= 2 && x.keliru.length > 20 && x.kataTokoh.length > 15 && ["Chacha", "Dika", "Nia"].includes(x.tokoh), `${nama}: Cari kesalahan lengkap`);
      cek(tanpaDigit(x.kataTokoh + x.alasan.join(" ") + x.keliru) && bersih(x.kataTokoh + x.alasan.join(" ") + x.keliru), `${nama}: Cari kesalahan tanpa digit dan kata terlarang`);
      const pil = LC.pilihanKlik(x);
      cek(pil.length === 3 && new Set(pil).size === 3 && pil.map(String).includes(String(x.jawabTokoh)), `${nama}: pilihan klik Cari kesalahan memuat jawaban tokoh (${pil.join("/")})`);
      const kunci = LC.kunciJawab(x, "klik");
      cek(kunci !== null && String(kunci.jenis === "angka" ? kunci.n : kunci.nama) !== String(x.jawabTokoh), `${nama}: jawaban benar berbeda dari jawaban tokoh`);
      cek(x.betul !== true, `${nama}: jawaban tokoh yang keliru`);
      cek(LC.petunjukSalah(x, "klik", x.jawabTokoh).startsWith(`Itu jawaban ${x.tokoh}`), `${nama}: petunjuk menjelaskan kesalahan tokoh`);
    }
    // Alasan benar tidak selalu tombol pertama (urutan tombol diputar tetap di komponen).
    const idxBenar = salahL.map((l) => l.langkah.benar);
    cek(idxBenar.length === 1, `${nama}: indeks alasan benar tercatat`);
  }
  cek(nomor === 11, "nomor misi berlanjut sampai sepuluh");
  // Jenis dan benda tiap tahap.
  for (const [nama, [, soal]] of Object.entries(TAHAP)) {
    const jenisPakai = new Set();
    for (const s of soal)
      for (const ls of s.langkah) {
        const d = LC.dasarDari(ls.langkah);
        const js = d.jenis ?? (d.o !== undefined ? [{ o: d.o, n: d.n }] : []);
        for (const j of js) {
          cek(j.o >= 0 && j.o < LC.OBJEK.length && Number.isInteger(j.n) && j.n >= 1, `${nama} ${s.nomor}: jenis sah`);
          jenisPakai.add(j.o);
        }
        if (d.tipe === "pile" || d.tipe === "mat" || d.tipe === "urut" || d.tipe === "nyata" || d.tipe === "tabel") {
          cek(new Set(d.jenis.map((j) => j.o)).size === d.jenis.length && d.jenis.length >= 2 && d.jenis.length <= 4, `${nama} ${s.nomor} ${d.tipe}: jenis unik, dua sampai empat jenis`);
          cek(d.jenis.every((j) => j.n >= 1 && j.n <= 9), `${nama} ${s.nomor} ${d.tipe}: tiap jenis satu sampai sembilan (muat di baris)`);
        }
        if (d.tipe === "pile") cek(d.jenis.reduce((t, j) => t + j.n, 0) <= 18 && d.tanya >= 0 && d.tanya < d.jenis.length, `${nama} ${s.nomor}: tumpukan muat dan jenis tanya ada`);
        if (d.tipe === "turus" || d.tipe === "pilihTurus") cek(d.n >= 6 && d.n <= 24 && d.o >= 0 && d.o < LC.OBJEK.length, `${nama} ${s.nomor}: turus enam sampai dua puluh empat`);
      }
    cek(!jenisPakai.has(undefined), `${nama}: semua jenis terdefinisi`);
    cek(![...jenisPakai].some((o) => /angklung|seruling|gendang|rebana|topi|selendang|sepatu/i.test(LC.OBJEK[o].nama)), `${nama}: benda berbeda dari Story`);
  }
  cek(LC.OBJEK.every((o) => emojiSah(o.emoji) && !/\s/.test(o.nama) && tanpaDigit(o.nama) && /^#[0-9A-Fa-f]{6}$/.test(o.warna) && /^#[0-9A-Fa-f]{6}$/.test(o.garis)) && new Set(LC.OBJEK.map((o) => o.emoji)).size === LC.OBJEK.length && new Set(LC.OBJEK.map((o) => o.nama)).size === LC.OBJEK.length, "OBJEK: emoji sah, nama satu kata, unik");
}

/* ------------------------------ Tugas dihitung dari data ------------------------------ */
{
  const nama = (k) => (k ? (k.jenis === "nama" ? k.nama : k.n) : null);
  const J = (o, n) => ({ o, n });
  // Kunci tiap jenis tugas dihitung dari data.
  sama(nama(LC.kunciJawab({ tipe: "pile", jenis: [J(0, 7), J(1, 4)], tanya: 1 }, "klik")), 4, "kunci pile klik: banyak jenis yang ditanya");
  sama(nama(LC.kunciJawab({ tipe: "pile", jenis: [J(0, 7), J(1, 4)], tanya: 1 }, "kanvas")), 4, "kunci pile kanvas");
  sama(nama(LC.kunciJawab({ tipe: "pile", jenis: [J(0, 7), J(1, 4), J(2, 5)], tanya: 1 }, "suara")), "gitar", "kunci pile suara: jenis terbanyak");
  sama([13, 14, 5].map((n) => nama(LC.kunciJawab({ tipe: "turus", n, o: 0, kanvas: "bundel", kata: "turus" }, "klik"))), [13, 14, 5], "kunci turus klik: total");
  sama([17, 11, 24].map((n) => nama(LC.kunciJawab({ tipe: "turus", n, o: 0, kanvas: "bundel", kata: "turus" }, "kanvas"))), [3, 2, 4], "kunci turus kanvas: bundel penuh");
  sama([17, 11, 22].map((n) => nama(LC.kunciJawab({ tipe: "turus", n, o: 0, kanvas: "sisa", kata: "turus" }, "kanvas"))), [2, 1, 2], "kunci turus kanvas: garis sisa");
  sama(["bundel", "turus", "lima"].map((kata) => nama(LC.kunciJawab({ tipe: "turus", n: 11, o: 0, kanvas: "bundel", kata }, "suara"))), ["bundel", "turus", 5], "kunci turus suara: kata atau lima");
  sama([nama(LC.kunciJawab({ tipe: "mat", jenis: [J(0, 3), J(1, 6), J(2, 4)], klik: "terbanyak", suara: "tersedikit" }, "klik")), nama(LC.kunciJawab({ tipe: "mat", jenis: [J(0, 3), J(1, 6), J(2, 4)], klik: "terbanyak", suara: "tersedikit" }, "suara")), nama(LC.kunciJawab({ tipe: "mat", jenis: [J(0, 3), J(1, 6), J(2, 4)], klik: "terbanyak", suara: "tersedikit" }, "kanvas"))], ["biola", "gitar", 3], "kunci mat: terbanyak, tersedikit, banyak jenis");
  sama(["paling", "sedikit", "arah"].map((klik) => nama(LC.kunciJawab({ tipe: "nyata", jenis: [J(0, 3), J(1, 6), J(2, 4)], klik }, "klik"))), ["biola", "gitar", "kurang"], "kunci nyata klik");
  sama([nama(LC.kunciJawab({ tipe: "nyata", jenis: [J(0, 3), J(1, 6)], klik: "arah" }, "kanvas")), nama(LC.kunciJawab({ tipe: "nyata", jenis: [J(0, 6), J(1, 6)], klik: "arah" }, "suara")), nama(LC.kunciJawab({ tipe: "nyata", jenis: [J(0, 7), J(1, 6)], klik: "arah" }, "suara"))], [3, "sama", "lebih"], "kunci nyata kanvas dan suara");
  cek(LC.kunciJawab({ tipe: "pilihTurus", n: 13, o: 0, opsi: [8, 18, 13] }, "klik") === null && LC.kunciJawab({ tipe: "urut", jenis: [J(0, 3), J(1, 6)] }, "klik") === null && LC.kunciJawab({ tipe: "tabel", jenis: [J(0, 3)], opsi: [[3]], benar: 0 }, "klik") === null, "kunci: tugas ketuk tanpa kunci jawaban");
  sama([LC.nomorKetuk({ tipe: "pilihTurus", n: 13, o: 0, opsi: [8, 18, 13] }), LC.nomorKetuk({ tipe: "tabel", jenis: [J(0, 3)], opsi: [[3]], benar: 0 })], [2, 0], "nomor ketuk");
  sama(LC.urutanBenar([J(1, 4), J(6, 7), J(3, 2)]), [1, 0, 2], "urutan benar baris");
  sama([LC.arahJ(J(0, 3), J(1, 6)), LC.arahJ(J(0, 6), J(1, 6)), LC.arahJ(J(0, 7), J(1, 6))], ["kurang", "sama", "lebih"], "arah lebih, kurang, sama");

  for (const [namaT, [rupa, soal]] of Object.entries(TAHAP)) {
    const kanvasAngka = [];
    const semuaAngka = [];
    for (const s of soal)
      for (const ls of s.langkah) {
        const l = ls.langkah;
        const d = LC.dasarDari(l);
        const kunci = LC.kunciJawab(l, s.cara);
        const ket = d.tipe === "pilihTurus" || d.tipe === "urut" || d.tipe === "tabel";
        cek(ket ? s.cara === "klik" && kunci === null : kunci !== null, `${namaT} ${s.nomor} ${ls.metode}: kunci ada kecuali tugas ketuk (klik)`);
        cek(LC.siapLangsung(l, rupa, s.cara) === (kunci !== null && l.tipe !== "salah"), `${namaT} ${s.nomor} ${ls.metode}: siap langsung sama dengan ada kunci (tombol tidak macet)`);
        for (const r of ["benda", "diagram", "lambang"]) cek(LC.siapLangsung(l, r, s.cara) === LC.siapLangsung(l, rupa, s.cara), `${namaT} ${s.nomor} ${ls.metode}: siap langsung tidak bergantung rupa (${r})`);
        if (kunci?.jenis === "angka") {
          semuaAngka.push(kunci.n);
          if (s.cara === "kanvas") {
            kanvasAngka.push(kunci.n);
            cek(kunci.n >= 1 && kunci.n <= 9, `${namaT} ${s.nomor} ${ls.metode}: jawaban kanvas satu angka satu sampai sembilan (${kunci.n})`);
          }
        }
        if (kunci?.jenis === "nama") cek(!/\s/.test(kunci.nama) && tanpaDigit(kunci.nama) && s.cara !== "kanvas", `${namaT} ${s.nomor} ${ls.metode}: kunci nama satu kata`);
        // Kunci tunggal (tanpa seri) untuk tugas paling banyak dan paling sedikit.
        if (d.tipe === "pile" && s.cara === "suara") cek(LC.tunggalMaks(d.jenis), `${namaT} ${s.nomor}: jenis terbanyak pile tunggal`);
        if (d.tipe === "mat") {
          const sisi = s.cara === "klik" ? d.klik : s.cara === "suara" ? d.suara : null;
          if (sisi === "terbanyak") cek(LC.tunggalMaks(d.jenis), `${namaT} ${s.nomor}: mat terbanyak tunggal`);
          if (sisi === "tersedikit") cek(LC.tunggalMin(d.jenis), `${namaT} ${s.nomor}: mat tersedikit tunggal`);
        }
        if (d.tipe === "nyata") {
          if (s.cara === "klik" && d.klik === "paling") cek(LC.tunggalMaks(d.jenis), `${namaT} ${s.nomor}: nyata paling panjang tunggal`);
          if (s.cara === "klik" && d.klik === "sedikit") cek(LC.tunggalMin(d.jenis), `${namaT} ${s.nomor}: nyata paling pendek tunggal`);
          if (s.cara === "kanvas") cek(d.jenis[0].n !== d.jenis[1].n, `${namaT} ${s.nomor}: dua lajur berbeda banyak untuk lebihnya`);
        }
        if (d.tipe === "urut") cek(new Set(d.jenis.map((j) => j.n)).size === d.jenis.length && LC.urutanBenar(d.jenis).join() !== d.jenis.map((_, i) => i).join(), `${namaT} ${s.nomor}: baris urut berbeda banyak dan urutan awal sudah campur`);
        if (d.tipe === "pilihTurus") cek(d.opsi.length === 3 && new Set(d.opsi).size === 3 && LC.nomorTurus(d) >= 1 && LC.nomorTurus(d) <= 2, `${namaT} ${s.nomor}: tiga turus berbeda, yang tepat bukan yang pertama`);
        if (d.tipe === "tabel") {
          cek(d.opsi.length === 3 && new Set(d.opsi.map((o) => o.join())).size === 3 && d.opsi[d.benar].join() === d.jenis.map((j) => j.n).join(), `${namaT} ${s.nomor}: tabel yang benar sama dengan baris titik`);
          cek(d.benar >= 1 && d.opsi.every((o) => o.length === d.jenis.length) && d.opsi.filter((o, i) => i !== d.benar).every((o) => o.join() !== d.jenis.map((j) => j.n).join()), `${namaT} ${s.nomor}: pengecoh tabel berbeda dan yang benar bukan yang pertama`);
        }
        // Pilihan klik: tiga pilihan unik, jawaban benar tidak di tombol pertama.
        if (s.cara === "klik" && kunci !== null) {
          const pil = LC.pilihanKlik(l);
          const teksK = kunci.jenis === "angka" ? String(kunci.n) : kunci.nama;
          cek(pil.length >= 2 && pil.length <= 3 && new Set(pil).size === pil.length && pil.includes(teksK) && pil[0] !== teksK, `${namaT} ${s.nomor} ${ls.metode}: pilihan klik unik dan jawaban benar bukan yang pertama (${pil.join("/")})`);
          if (kunci.jenis === "angka") cek(pil.every((p) => /^\d+$/.test(p) && Number(p) >= 1 && Number(p) <= 99), `${namaT} ${s.nomor}: pilihan bilangan sah`);
        }
        if (s.cara === "suara" && kunci !== null) {
          const pil = LC.pilihanSuara(l, "suara");
          cek(pil.includes(LC.teksKunciPilihan(kunci)) && pil.length >= 2 && new Set(pil).size === pil.length && tanpaDigit(pil.join(" ")), `${namaT} ${s.nomor} ${ls.metode}: pilihan cadangan suara memuat kunci (${pil.join("/")})`);
          const c = K.cocokUcapan(LC.teksKunciPilihan(kunci), kunci);
          cek(c.cocok, `${namaT} ${s.nomor} ${ls.metode}: ucapan kunci dikenali (${LC.teksKunciPilihan(kunci)})`);
          for (const lain of pil.filter((p) => p !== LC.teksKunciPilihan(kunci))) cek(!K.cocokUcapan(lain, kunci).cocok, `${namaT} ${s.nomor}: ucapan ${lain} bukan kunci`);
        }
        if (kunci) cek(LC.kalimatKunci(l, s.cara, rupa).length > 12, `${namaT} ${s.nomor} ${ls.metode}: kalimat penjelasan ada`);
        // Petunjuk salah menunjuk kesalahan (tidak kosong untuk tiap tugas dan cara).
        cek(LC.petunjukSalah(l, s.cara, "x", rupa).length > 20, `${namaT} ${s.nomor} ${ls.metode}: petunjuk salah ada`);
        if (d.tipe === "pilihTurus" || d.tipe === "tabel" || d.tipe === "urut") cek(LC.petunjukKetuk(d, 0).length > 20 && tanpaDigit(LC.petunjukKetuk(d, 1)), `${namaT} ${s.nomor}: petunjuk ketuk ada`);
        if (rupa === "lambang") {
          const baris = LC.barisKartu(d);
          cek(Array.isArray(baris) && baris.length >= 1 && baris.every((b) => typeof b === "string" && b.length > 3), `${namaT} ${s.nomor} ${ls.metode}: kartu kata ada`);
        }
      }
    cek(new Set(kanvasAngka).size === kanvasAngka.length && kanvasAngka.length === 4, `${namaT}: empat angka jawaban Tulis di kanvas tidak kembar (${kanvasAngka.join(", ")})`);
    cek(new Set(semuaAngka).size === semuaAngka.length, `${namaT}: semua angka jawaban bilangan tidak kembar dalam satu tahap (${semuaAngka.join(", ")})`);
  }
  sama(TAHAP.Concrete[1].filter((s) => s.cara === "kanvas").flatMap((s) => s.langkah.map((l) => LC.kunciJawab(l.langkah, "kanvas").n)), [7, 4, 3, 2], "angka kanvas Concrete");
  sama(TAHAP.Pictorial[1].filter((s) => s.cara === "kanvas").flatMap((s) => s.langkah.map((l) => LC.kunciJawab(l.langkah, "kanvas").n)), [8, 3, 2, 5], "angka kanvas Pictorial");
  sama(TAHAP.Abstract[1].filter((s) => s.cara === "kanvas").flatMap((s) => s.langkah.map((l) => LC.kunciJawab(l.langkah, "kanvas").n)), [9, 2, 4, 3], "angka kanvas Abstract");
  // Batas rupa: Pictorial dan Abstract tanpa emoji benda di data teks; Concrete memakai emoji dari OBJEK.
  cek(LC.OBJEK.every((o) => !/[A-Za-z0-9]/.test(o.emoji)), "OBJEK: emoji tanpa huruf");
  // Poin penting dan penutup.
  cek(D.POIN_PENTING.length >= 6 && D.POIN_PENTING.every((p) => p.length > 20 && bersih(p)) && D.POIN_PENTING_SUARA.every((p) => tanpaDigit(p)), "poin penting: banyak, bersih, suara tanpa digit");
  const poin = D.POIN_PENTING.join(" ").toLowerCase();
  for (const m of ["pilah", "satu garis untuk satu benda", "bundel lima", "tabel tiga kolom", "paling banyak", "data sendiri", "alas pilah", "hitung lima-lima", "diagram benda nyata"]) cek(poin.includes(m), `poin penting memuat ${m}`);
  cek(tanpaDigit(D.PENUTUP_A) && bersih(D.PENUTUP_A) && /Bu Maya/.test(D.PENUTUP_A) && /papan layar/.test(D.PENUTUP_A) && D.PENUTUP_A.endsWith("?"), "penutup A: jembatan ke Sub-Bab B tanpa digit");
  cek(Object.values(D.TEMA_TURUS).every((t) => emojiSah(t.ikon) && t.nama.length >= 7 && t.cara.length > 20 && tanpaDigit(t.cara) && bersih(t.cara)), "tema tiga tahap sah");
  cek(D.TEMA_TURUS.pictorial.cara.includes("titik") && D.TEMA_TURUS.abstract.cara.includes("kartu"), "tema: Pictorial titik polos, Abstract kartu");
  cek(D.CONCRETE_TURUS === D.CONCRETE && D.PICTORIAL_TURUS === D.PICTORIAL && D.ABSTRACT_TURUS === D.ABSTRACT && D.MISI_CATAT_TEKS === DP.MISI_CATAT_TEKS, "nama ekspor untuk pemasang");
}

/* ------------------------------ Berkas ------------------------------ */
{
  const berkas = readdirSync(folderUrl).filter((f) => /\.(ts|tsx)$/.test(f));
  for (const nama of ["logika.ts", "data-peta.ts", "data-kartu.ts", "logika-cpa.ts", "data.ts", "periksa.ts", "JawabTurus.tsx", "LangkahTurus.tsx", "TahapTurus.tsx", "SimulasiMejaCatat.tsx", "PetiAlatMusik.tsx", "PapanCatatan.tsx"]) cek(berkas.includes(nama), `berkas ${nama} ada`);
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folderUrl), "utf8");
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d || c.codePointAt(0) === 0x1f6de), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}/i.test(s), `${f}: kode emoji tidak melewati U+1FA95`);
    cek(!/buku|kelompok|bernilai|tebak/i.test(s), `${f}: tanpa kata buku, kelompok, bernilai, tebak`);
    if (/^(logika|logika-cpa|periksa|data|data-peta|data-kartu)\.ts$/.test(f)) cek(!/from "react"|fetch\(/.test(s), `${f}: tanpa React dan jaringan`);
    cek(!/ikat-k2b7a|papan-k2b7b|gambar-k2b8b|SimulasiGudang|LangkahIkat|TahapIkat/.test(s), `${f}: tidak memakai folder bab atau sub-bab lain`);
  }
  // Teks layar tidak memuat kata terlarang (huruf kecil dan kapital), termasuk nama berkas data.
  const layar = ["LangkahTurus.tsx", "TahapTurus.tsx", "SimulasiMejaCatat.tsx"].map((f) => readFileSync(new URL(f, folderUrl), "utf8")).join("\n");
  const teksLayar = [...layar.matchAll(/>\s*([^<>{}\n]{4,})\s*</g)].map((m) => m[1]).join(" ");
  cek(!/\b(skor|nilai|soal|tebak|kunci|latihan|teman|kelompok|buku)\b/i.test(teksLayar), "teks layar komponen tanpa kata terlarang");
  cek(/\bTugas\b/.test(layar) && !/>\s*Soal/.test(layar), "teks layar CPA memakai Tugas");
  // Tahap: props sama dengan TahapIkat dan pola visual baru.
  const th = readFileSync(new URL("TahapTurus.tsx", folderUrl), "utf8");
  cek(/umum: Umum;\s*rupa: Rupa;\s*soal: SoalMisi\[\];\s*pita:/.test(th) && /teksAkhir: string/.test(th) && /poinPenting\?: boolean/.test(th), "TahapTurus: props umum, rupa, soal, pita, teksAkhir, poinPenting");
  cek(/IKON_METODE\[ls\.metode\]/.test(th) && /rupa === "benda" \?/.test(th), "TahapTurus: ikon metode hanya pada rupa benda (Pictorial dan Abstract tanpa emoji metode)");
  cek(/export default function TahapTurus/.test(th) && /Cari kesalahan/.test(th) && /POIN_PENTING/.test(th) && /PENUTUP_A/.test(th), "TahapTurus: ekspor, Cari kesalahan, Poin Penting, jembatan");
  const sim = readFileSync(new URL("SimulasiMejaCatat.tsx", folderUrl), "utf8");
  cek(/export default function SimulasiMejaCatat/.test(sim) && /onKeadaan/.test(sim) && /MISI_CATAT_TEKS/.test(sim), "SimulasiMejaCatat: ekspor, onKeadaan, teks misi");
  for (const f of ["PetiAlatMusik.tsx", "PapanCatatan.tsx"]) {
    const s = readFileSync(new URL(f, folderUrl), "utf8");
    cek(/speakGuru/.test(s) && /onLanjut/.test(s) && /teksLanjut/.test(s) && /peta-kartu\//.test(s), `${f}: pembungkus tipis komponen bersama peta-kartu`);
  }
  // Berkas bersama: Simulasi memasang Meja Catat.
  const sk = readFileSync(new URL("../src/components/modul/SimulasiK2Bab8.tsx", import.meta.url), "utf8");
  cek(/SimulasiMejaCatat/.test(sk) && /MISI_CATAT_TEKS/.test(sk) && /laporMisiCatat\(daftarMisiK2Bab8\("A"\), k, a\.capai\)/.test(sk), "SimulasiK2Bab8: langkahMejaCatatA memasang Meja Catat");
  // Berkas lama yang dipertahankan tidak diubah (dipakai bab lain).
  const ej = readFileSync(new URL("../src/lib/ejaan-inggris-id.ts", import.meta.url), "utf8");
  cek(/sorting mat/i.test(ej) && /count by fives/i.test(ej) && /real graph/i.test(ej), "ejaan: tiga nama metode global ada");
}

console.log(`Lulus ${lulus}, gagal ${gagal}`);
process.exit(gagal ? 1 : 0);
