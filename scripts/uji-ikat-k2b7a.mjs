// Uji Mind-map (Gerobak Botol), Infografis (Papan Setoran), Simulasi Gudang Ikat, dan tahap Concrete, Pictorial, Abstract Kelas 2 Bab 7 Sub-Bab A ("Botol Pak Ujang"),
// awal cerita Bank Sampah Sekolah.
// Memeriksa: logika simulasi (ikat, papan, tulis, kira), misi (awal tidak memenuhi, wajib empat, bebas dua), gerobak botol (sembilan kartu geser Masalah, Cara, Hasil memuat semua
// metode Story), papan setoran dari data Story, CPA dua belas langkah per tahap (Klik, Kanvas, Suara x empat metode) dengan jawaban beragam dan Cari kesalahan di tiap tahap, kunci
// dihitung dari data, angka jawaban tidak kembar per tahap, tugas yang langsung siap (jebakan tombol macet), pengenal ucapan bilangan sampai seratus, petunjuk salah, batas rupa,
// emoji, kata terlarang, akhir baris.
// Jalankan: node --no-warnings scripts/uji-ikat-k2b7a.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/ikat-k2b7a/logika.ts");
const DP = await import("../src/components/modul/ikat-k2b7a/data-peta.ts");
const DK = await import("../src/components/modul/ikat-k2b7a/data-kartu.ts");
const LC = await import("../src/components/modul/ikat-k2b7a/logika-cpa.ts");
const D = await import("../src/components/modul/ikat-k2b7a/data.ts");
const K = await import("../src/components/modul/ikat-k2b7a/periksa.ts");
const S = await import("../src/components/modul/misi-simulasi.ts");
const MK = await import("../src/components/modul/misi-k2bab7.ts");
const folderUrl = new URL("../src/components/modul/ikat-k2b7a/", import.meta.url);

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
const TERLARANG = /\b(kelas|buku|teman|kelompok|mengelompokkan|skor|nilai|bernilai|soal|tebak|tebakan|kunci|latihan)\b/i;
const tanpaDigit = (t) => !/\d/.test(t);
const bersih = (t) => !TERLARANG.test(t) && !/buku|kelompok|bernilai|tebak|nilai/i.test(t);
const emojiSah = (s) => [...s].every((c) => c.codePointAt(0) <= 0x1fa95 && c.codePointAt(0) !== 0x200d && c.codePointAt(0) !== 0x1f6de);
const STORY_ANGKA = [20, 26, 30, 34, 38, 40, 46, 50, 52, 83, 90, 100];

/* ------------------------------ Kata bilangan ------------------------------ */
{
  sama([0, 1, 9, 10, 11, 15, 20, 21, 38, 40, 99, 100].map(LC.kataBil), ["nol", "satu", "sembilan", "sepuluh", "sebelas", "lima belas", "dua puluh", "dua puluh satu", "tiga puluh delapan", "empat puluh", "sembilan puluh sembilan", "seratus"], "kata bilangan sampai seratus");
  sama([L.kata(27), L.kata(58), L.kata(100)], ["dua puluh tujuh", "lima puluh delapan", "seratus"], "kata bilangan simulasi");
  cek(LC.kata === LC.kataBil, "alias kata");
  for (let n = 1; n <= 100; n += 1) cek(tanpaDigit(LC.kataBil(n)) && LC.kataBil(n) === L.kata(n), `kata bilangan ${n} sama di simulasi dan CPA`);
}

/* ------------------------------ Simulasi: data dan logika ------------------------------ */
{
  const BS = DP.BENDA_SIM;
  cek(BS.length === 3 && new Set(BS.map((b) => b.id)).size === 3 && new Set(BS.map((b) => b.nama)).size === 3 && new Set(BS.map((b) => b.emoji)).size === 3, "simulasi: tiga tumpukan unik");
  for (const b of BS) {
    cek(emojiSah(b.emoji) && tanpaDigit(b.nama) && bersih(b.nama), `${b.id}: emoji dan nama sah`);
    cek(b.banyak >= 21 && b.banyak <= 99 && b.banyak % 10 !== 0 && !STORY_ANGKA.includes(b.banyak), `${b.id}: banyak benda bukan data Story dan bukan kelipatan sepuluh`);
    cek(b.kira.length === 3 && new Set(b.kira).size === 3 && b.kira.filter((x) => Math.abs(x - b.banyak) <= DP.BATAS_DEKAT).length === 1, `${b.id}: tiga perkiraan, tepat satu dekat`);
    cek(b.kira.every((x) => x >= 10 && x <= 100), `${b.id}: perkiraan sepuluh sampai seratus`);
  }
  sama(BS.map((b) => b.banyak), [27, 58, 43], "simulasi: banyak benda");
  const nama = BS.map((b) => b.nama).join(" | ").toLowerCase();
  for (const s of ["botol", "kaleng", "koran", "gelas", "kotak jus", "tisu", "kotak makan", "kertas", "majalah", "tas"]) cek(s === "botol" ? !nama.replace("tutup botol", "").includes(s) : !nama.includes(s), `benda simulasi bukan data Story atau CPA (${s})`);
  const a = L.awalIkat();
  cek(a.alat === "ikat" && a.mode === "ikat" && a.jenis === 0 && a.diikat.join() === "0,0,0" && a.selesaiIkat.length === 0 && a.papanBenar.length === 0 && a.tulisBenar.length === 0 && !a.terbalik && a.kira.join() === "-1,-1,-1" && a.kiraTuntas.length === 0 && a.salah === 0, "awal: kosong");
  sama(L.mulaiLagiIkat(), a, "mulai lagi sama dengan awal");
  sama(L.pilihModeIkat(a, "papan").mode, "papan", "ganti alat");
  sama([L.banyakBenda(0), L.puluhanDi(0), L.satuanDi(0), L.puluhanDi(1), L.satuanDi(1)], [27, 2, 7, 5, 8], "puluhan dan satuan tiap tumpukan");
  // Ganti tumpukan.
  const g = L.pilihJenis({ ...a, papanP: 3, papanS: 4, tulisP: 1, tulisS: 2 }, 1);
  sama([g.jenis, g.papanP, g.papanS, g.tulisP, g.tulisS], [1, 0, 0, -1, -1], "ganti tumpukan mengosongkan papan dan pilihan angka");
  cek(L.pilihJenis(a, 0) === a && L.pilihJenis(a, 9) === a && L.pilihJenis(a, -1) === a, "ganti tumpukan: nomor sama atau tidak sah diabaikan");
  // Ikat.
  let z = a;
  sama(L.lepasDi(z, 0), 27, "kardus lepas semua di awal");
  const r1 = L.ikatSepuluh(z);
  cek(r1.ok && r1.k.diikat[0] === 1 && L.lepasDi(r1.k, 0) === 17 && r1.k.selesaiIkat.length === 0, "ikat: satu ikat, masih bisa diikat");
  const r2 = L.ikatSepuluh(r1.k);
  cek(r2.ok && r2.k.diikat[0] === 2 && L.lepasDi(r2.k, 0) === 7 && r2.k.selesaiIkat.join() === "0", "ikat: dua ikat, tujuh lepas, selesai diikat");
  const r3 = L.ikatSepuluh(r2.k);
  cek(!r3.ok && r3.k === r2.k, "ikat: tersisa kurang dari sepuluh tidak bisa diikat lagi");
  const l1 = L.lepasIkat(r2.k);
  cek(l1.ok && l1.k.diikat[0] === 1 && L.lepasDi(l1.k, 0) === 17 && l1.k.selesaiIkat.join() === "0", "lepas ikat: kembali menjadi benda lepas, catatan selesai tetap");
  cek(!L.lepasIkat(a).ok && L.lepasIkat(a).k === a, "lepas ikat: tanpa ikat ditolak");
  let tiga = a;
  for (const j of [0, 1, 2]) {
    tiga = L.pilihJenis(tiga, j);
    while (L.ikatSepuluh(tiga).ok) tiga = L.ikatSepuluh(tiga).k;
  }
  sama([tiga.diikat, tiga.selesaiIkat], [[2, 5, 4], [0, 1, 2]], "ikat tiga tumpukan sampai selesai");
  // Papan.
  const p0 = L.pilihModeIkat(a, "papan");
  cek(!L.ubahPapan(p0, "puluhan", -1).ok && L.ubahPapan(p0, "puluhan", -1).k === p0, "papan: tidak bisa kurang dari nol");
  let pk = p0;
  for (let i = 0; i < 9; i += 1) pk = L.ubahPapan(pk, "satuan", 1).k;
  cek(pk.papanS === 9 && !L.ubahPapan(pk, "satuan", 1).ok, "papan: satu kolom paling banyak sembilan");
  const papanSalah = L.periksaPapan(L.ubahPapan(L.ubahPapan(p0, "puluhan", 1).k, "satuan", 1).k);
  cek(!papanSalah.ok && papanSalah.k.salah === 1 && papanSalah.k.papanBenar.length === 0, "papan: salah menambah hitungan percobaan, belum dicatat");
  let pb = p0;
  for (let i = 0; i < 2; i += 1) pb = L.ubahPapan(pb, "puluhan", 1).k;
  for (let i = 0; i < 7; i += 1) pb = L.ubahPapan(pb, "satuan", 1).k;
  sama([L.bilanganPapan(pb), L.periksaPapan(pb).ok, L.periksaPapan(pb).k.papanBenar], [27, true, [0]], "papan: dua puluhan tujuh satuan sama dengan dua puluh tujuh");
  cek(L.periksaPapan(L.periksaPapan(pb).k).k.papanBenar.length === 1, "papan: catatan benar tidak ganda");
  // Tulis.
  const t0 = L.pilihModeIkat(a, "tulis");
  sama([L.bilanganTulis(t0), L.tukarAngka(t0).ok], [-1, false], "tulis: belum ada angka, tukar ditolak");
  let tw = L.pilihAngka(L.pilihAngka(t0, "puluhan", 7), "satuan", 2);
  sama([L.bilanganTulis(tw), L.periksaTulis(tw).ok, L.periksaTulis(tw).k.salah], [72, false, 1], "tulis: tujuh puluh dua bukan dua puluh tujuh");
  cek(L.petunjukTulis(tw).includes("tertukar"), "tulis: petunjuk menyebut angka tertukar");
  const tk = L.tukarAngka(tw);
  sama([tk.ok, tk.k.tulisP, tk.k.tulisS, tk.k.terbalik, L.bilanganTulis(tk.k)], [true, 2, 7, true, 27], "tulis: tukar angka menjadi dua puluh tujuh dan tercatat berbeda");
  sama(L.periksaTulis(tk.k).k.tulisBenar, [0], "tulis: dua puluh tujuh benar dicatat");
  const kembar = L.tukarAngka(L.pilihAngka(L.pilihAngka(t0, "puluhan", 4), "satuan", 4));
  cek(kembar.ok && !kembar.k.terbalik, "tulis: angka kembar ditukar tidak dihitung berbeda");
  cek(L.pilihAngka(t0, "puluhan", 10) === t0 && L.pilihAngka(t0, "satuan", -1) === t0, "tulis: angka di luar nol sampai sembilan ditolak");
  // Kira.
  const kr = L.pilihModeIkat(a, "kira");
  cek(L.pilihKira(kr, 99).k === kr && !L.pilihKira(kr, 99).ok, "kira: perkiraan di luar pilihan ditolak");
  const k30 = L.pilihKira(kr, 30);
  cek(k30.ok && k30.k.kira[0] === 30 && !L.pilihKira(k30.k, 10).ok, "kira: perkiraan dibuat sekali");
  const kBukti = L.ikatSepuluh(L.ikatSepuluh(k30.k).k);
  cek(kBukti.k.kiraTuntas.join() === "0" && kBukti.k.kiraDekat.join() === "0", "kira: tiga puluh dekat dengan dua puluh tujuh, terbukti setelah diikat");
  const kJauh = L.ikatSepuluh(L.ikatSepuluh(L.pilihKira(kr, 10).k).k);
  cek(kJauh.k.kiraTuntas.join() === "0" && kJauh.k.kiraDekat.length === 0, "kira: sepuluh jauh, terbukti tetapi tidak dekat");
  cek(!L.pilihKira(r1.k, 30).ok, "kira: setelah benda mulai diikat tidak bisa memperkirakan");
  cek(L.ikatSepuluh(r2.k).k.kiraTuntas.length === 0 && r2.k.kiraTuntas.length === 0, "kira: ikat tanpa perkiraan tidak membuktikan apa pun");
  // Kalimat dan petunjuk: tanpa digit dan tanpa kata terlarang.
  const semua = [];
  for (const x of [a, r1.k, r2.k, tiga]) semua.push(L.kalimatIkat(x), L.kalimatIkat(L.pilihJenis(x, 1)));
  for (const x of [p0, pb, L.ubahPapan(p0, "satuan", 1).k]) semua.push(L.kalimatPapan(x), L.petunjukPapan(x), L.petunjukPapan({ ...x, papanP: 2 }), L.petunjukPapan({ ...x, papanP: 9, papanS: 9 }), L.petunjukPapan({ ...x, papanS: 7, papanP: 1 }));
  for (const x of [t0, tw, tk.k]) semua.push(L.kalimatTulis(x), L.petunjukTulis(x), L.kalimatTukar(x));
  for (const x of [kr, k30.k, kBukti.k, kJauh.k, r1.k]) semua.push(L.kalimatKira(x));
  cek(semua.every((t) => t.length > 10 && tanpaDigit(t) && bersih(t)), `kalimat suara simulasi tanpa digit dan kata terlarang (${semua.length} kalimat)`);
  cek(tanpaDigit(DP.MISI_IKAT_TEKS) && bersih(DP.MISI_IKAT_TEKS) && DP.MISI_IKAT_TEKS.length > 40, "teks misi awal tanpa digit");
}

/* ------------------------------ Misi ------------------------------ */
{
  const A = MK.MISI_A;
  cek(A.filter((m) => m.wajib).length === 4 && A.filter((m) => !m.wajib).length === 2, "misi A: empat wajib, dua bebas");
  cek(new Set(A.map((m) => m.id)).size === 6 && A.every((m) => m.id.startsWith("a-") && m.teks.length >= 10 && m.teks.length <= 120 && tanpaDigit(m.teks) && bersih(m.teks)), "misi A: id berawalan a-, unik, 10 sampai 120 huruf, tanpa digit");
  sama(MK.daftarMisiK2Bab7("A"), A, "daftarMisiK2Bab7 A");
  cek(A.every((m) => !m.cek({ alat: "kerangka" })), "misi A: alat lain tidak memenuhi misi");
  const a = L.awalIkat();
  sama(S.misiBaru(A, a, new Set()), [], "misi A: keadaan awal tanpa misi baru");
  const baru = (o) => S.misiBaru(A, { ...a, ...o }, new Set());
  sama(baru({ selesaiIkat: [1] }), ["a-ikat"], "misi: tumpukan selesai memenuhi a-ikat");
  sama(baru({ papanBenar: [0] }), ["a-papan"], "misi: papan benar memenuhi a-papan");
  sama(baru({ tulisBenar: [2] }), ["a-tulis"], "misi: tulisan benar memenuhi a-tulis");
  sama(baru({ kiraTuntas: [1] }), ["a-kira"], "misi: perkiraan terbukti memenuhi a-kira");
  sama(baru({ selesaiIkat: [0, 1, 2] }), ["a-ikat", "a-semua"], "misi: tiga tumpukan memenuhi tantangan bebas a-semua");
  sama(baru({ terbalik: true }), ["a-tukar"], "misi: angka tertukar memenuhi a-tukar");
  cek(S.misiBaru(A, { ...a, salah: 9, diikat: [2, 5, 4] }, new Set()).length === 0, "misi: percobaan keliru dan ikat yang belum selesai tidak dihitung sebagai misi");
  // Alur lengkap lewat logika.
  let z = L.pilihModeIkat(a, "ikat");
  z = L.ikatSepuluh(L.ikatSepuluh(z).k).k;
  let pb = L.pilihModeIkat(z, "papan");
  for (let i = 0; i < 2; i += 1) pb = L.ubahPapan(pb, "puluhan", 1).k;
  for (let i = 0; i < 7; i += 1) pb = L.ubahPapan(pb, "satuan", 1).k;
  pb = L.periksaPapan(pb).k;
  let tw = L.pilihAngka(L.pilihAngka(L.pilihModeIkat(pb, "tulis"), "puluhan", 2), "satuan", 7);
  tw = L.periksaTulis(tw).k;
  let kr = L.pilihJenis(L.pilihModeIkat(tw, "kira"), 2);
  kr = L.pilihKira(kr, 40).k;
  for (let i = 0; i < 4; i += 1) kr = L.ikatSepuluh(kr).k;
  sama(S.misiBaru(MK.MISI_A, kr, new Set()), ["a-ikat", "a-papan", "a-tulis", "a-kira"], "misi: alur lengkap memenuhi empat misi wajib");
}

/* ------------------------------ Mind-map: gerobak botol (sembilan kartu geser) ------------------------------ */
{
  const KA = DK.KARTU_IKAT;
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
  for (const m of ["Bingkai Sepuluh", "Hitung Loncat", "Balok Puluhan", "Diikat sepuluh", "Puluhan tambah satuan", "Papan dua kolom", "Dipecah jadi pasangan", "Puluhan dulu", "Ikat untuk membuktikan"]) cek(cara.toLowerCase().includes(m.toLowerCase()), `kartu: cara memuat ${m}`);
  const gab = KA.map((k) => [k.judul, k.masalah.label, k.cara.label, k.hasil.label, k.masalah.arti, k.cara.arti, k.hasil.arti].join(" ")).join(" ").toLowerCase();
  for (const s of ["satu puluhan", "sepuluh satuan", "bilangan dua angka", "puluhan di kiri", "tertukar", "perkiraan", "sepuluh puluhan seratus", "bingkai penuh", "sepuluh kotak", "kira-kira"]) cek(gab.includes(s), `kartu: memuat poin "${s}"`);
  cek(!new RegExp("\\b(chacha|dika|nia|bu sari|pak ujang|bu lia|botol|kaleng|gerobak|gudang|koran)\\b", "i").test(gab), "kartu: hanya poin pelajaran (tanpa tokoh dan benda cerita)");
  cek(tanpaDigit(DK.SUARA_KARTU_IKAT + DK.SELESAI_KARTU_IKAT) && bersih(DK.SUARA_KARTU_IKAT + DK.SELESAI_KARTU_IKAT), "kartu: suara dan pesan selesai tanpa digit dan kata terlarang");
  cek(emojiSah(DK.TEMA_KARTU_IKAT.ikon) && DK.TEMA_KARTU_IKAT.judul.length > 5, "kartu: tema sah");
  const RG = DK.RINGKASAN_IKAT;
  cek(RG.ikon.length === DK.KARTU_IKAT.length && new Set(RG.ikon).size === RG.ikon.length && [...RG.ikon, RG.pusat].every((e) => emojiSah(e) && !/[A-Za-z0-9]/.test(e)), "peta radial: satu gambar unik per kartu, gambar sah tanpa huruf");
  cek(tanpaDigit(RG.suara) && bersih(RG.suara) && !RG.ikon.includes(RG.pusat), "peta radial: suara bersih dan pusat berbeda dari cabang");
}

/* ------------------------------ Infografis: papan setoran (satu tabel lima baris) ------------------------------ */
{
  const B = DK.BARIS_INFO_IKAT;
  cek(B.length === 5 && DK.KOLOM_INFO_IKAT.length === 3, "infografis: lima baris dan tiga kolom");
  cek(B.every((b) => b.isi.length === 3 && emojiSah(b.ikon) && b.nama.length > 4), "infografis: tiap baris tiga isian, emoji sah");
  const jumlahContoh = B.map((b) => b.contoh.length);
  cek(jumlahContoh[0] === 3 && jumlahContoh.slice(1).every((n) => n === 0), "infografis: baris satu penuh contoh, baris dua sampai lima mandiri");
  const semua = B.flatMap((b) => b.isi);
  cek(B.every((b) => new Set(b.isi.map((x) => x.t)).size === 3), "infografis: tiga label tiap baris berbeda");
  cek(semua.every((x) => x.t.length <= 26 && x.t.split(/\s+/).length <= 5 && bersih(x.t) && bersih(x.s ?? "")), "infografis: label pendek (paling banyak lima kata) dan tanpa kata terlarang");
  cek(semua.every((x) => tanpaDigit(x.s ?? x.t)), "infografis: ucapan label tanpa digit");
  const gab = B.map((b) => [b.nama, ...b.isi.map((x) => x.t)].join(" ")).join(" ").toLowerCase();
  for (const s of ["sepuluh botol", "gerobak penuh", "tim kuning", "laporan terbalik", "setumpuk kaleng", "diikat tali rafia", "melompat sepuluh", "satu puluhan", "seratus botol", "tiga puluh delapan", "delapan puluh tiga", "empat puluh enam", "puluhan dulu, lalu satuan", "kira-kira lalu ikat"]) cek(gab.includes(s), `infografis: memuat "${s}"`);
  cek(!new RegExp("\\b(chacha|dika|nia|bu sari|pak ujang)\\b", "i").test(gab), "infografis: tanpa nama tokoh");
  cek(tanpaDigit(DK.SUARA_INFO_IKAT + DK.SELESAI_INFO_IKAT) && bersih(DK.SUARA_INFO_IKAT + DK.SELESAI_INFO_IKAT) && emojiSah(DK.TEMA_INFO_IKAT.ikon), "infografis: suara dan tema bersih");
}

/* ------------------------------ Pengenal ucapan ------------------------------ */
{
  const kn = (nama) => ({ jenis: "nama", nama });
  sama(K.kataDariUcapan("puluhan"), ["puluhan"], "ucapan: puluhan");
  sama(K.kataDariUcapan("Puluh"), ["puluhan"], "ucapan: puluh berarti puluhan");
  sama(K.kataDariUcapan("satuan!"), ["satuan"], "ucapan: satuan");
  sama(K.kataDariUcapan("ikat"), ["ikat"], "ucapan: ikat");
  sama(K.kataDariUcapan("ikatan"), ["ikat"], "ucapan: ikatan berarti ikat");
  sama(K.kataDariUcapan("bukan puluhan, satuan"), ["satuan"], "ucapan: bukan puluhan tidak dihitung");
  sama(K.kataDariUcapan("halo"), [], "ucapan: kata lain tidak dikenali");
  cek(K.cocokUcapan("satuan", kn("satuan")).cocok && !K.cocokUcapan("satuan", kn("puluhan")).cocok && K.cocokUcapan("puluhan", kn("puluhan")).cocok, "cocok: puluhan dan satuan");
  sama(K.angkaDariUcapan("empat puluh tujuh"), [47], "angka: empat puluh tujuh");
  sama(K.angkaDariUcapan("sepuluh, dua puluh, tiga puluh"), [10, 20, 30], "angka: deret puluhan");
  sama(K.angkaDariUcapan("seratus"), [100], "angka: seratus");
  sama(K.angkaDariUcapan("sebelas dan lima belas"), [11, 15], "angka: belasan");
  sama(K.angkaDariUcapan("tiga, 4 dan lima"), [3, 4, 5], "angka: satuan dan angka tertulis");
  sama(K.angkaDariUcapan("80 delapan puluh"), [80], "angka: 80 dan delapan puluh sama");
  sama(K.angkaDariUcapan("tiga puluh tiga puluh"), [30], "angka: tiga puluh tiga puluh hanya sekali");
  sama(K.angkaDariUcapan("dua puluh sembilan"), [29], "angka: dua puluh sembilan");
  sama(K.angkaDariUcapan("satuan puluhan"), [], "angka: satuan bukan bilangan");
  cek(K.cocokUcapan("dua puluh sembilan", { jenis: "angka", n: 29 }).cocok && K.cocokUcapan("29", { jenis: "angka", n: 29 }).cocok && !K.cocokUcapan("dua puluh", { jenis: "angka", n: 29 }).cocok, "cocok: kunci angka dua puluh sembilan");
  cek(K.cocokUcapan("delapan puluh", { jenis: "angka", n: 80 }).cocok && !K.cocokUcapan("delapan", { jenis: "angka", n: 80 }).cocok, "cocok: delapan puluh bukan delapan");
  cek(K.cocokUcapan("tujuh puluh", { jenis: "angka", n: 70 }).cocok && K.cocokUcapan("seratus", { jenis: "angka", n: 100 }).cocok, "cocok: tujuh puluh dan seratus");
}

/* ------------------------------ CPA ------------------------------ */
const TAHAP = { Concrete: ["benda", D.CONCRETE], Pictorial: ["diagram", D.PICTORIAL], Abstract: ["lambang", D.ABSTRACT] };
const objekDari = (l) => LC.dasarDari(l).o;
{
  const ANGKA_KANVAS = { Concrete: [7, 4, 8, 5], Pictorial: [9, 3, 7, 2], Abstract: [6, 4, 9, 3] };
  sama(D.CONCRETE.map((s) => s.nomor), [2, 3, 4], "nomor misi Concrete berlanjut dari simulasi");
  sama(D.PICTORIAL.map((s) => s.nomor), [5, 6, 7], "nomor misi Pictorial");
  sama(D.ABSTRACT.map((s) => s.nomor), [8, 9, 10], "nomor misi Abstract");
  sama(LC.URUT_METODE, ["igil", "bingkai", "loncat", "balok"], "urutan metode");
  cek(LC.NAMA_METODE.igil.includes("Ikat, Hitung Puluhan, Tambah Satuan") && LC.NAMA_METODE.bingkai.includes("Ten Frame") && LC.NAMA_METODE.loncat.includes("Skip Counting") && LC.NAMA_METODE.balok.includes("Base Ten Blocks"), "nama metode: IGIL dan tiga metode global");
  cek(Object.values(LC.IKON_METODE).every(emojiSah) && new Set(Object.values(LC.IKON_METODE)).size === 4, "ikon metode: emoji sah dan unik");
  for (const [nama, [rupa, soal]] of Object.entries(TAHAP)) {
    sama(soal.map((s) => s.cara), ["klik", "kanvas", "suara"], `${nama}: tiga soal Klik, Kanvas, Suara`);
    cek(soal.every((s) => s.langkah.length === 4), `${nama}: empat tugas tiap soal (dua belas tugas)`);
    for (const s of soal) sama(s.langkah.map((l) => l.metode), ["igil", "bingkai", "loncat", "balok"], `${nama} ${s.nomor}: empat metode berurutan`);
    cek(soal.every((s) => s.langkah.every((l) => l.cara === s.cara)), `${nama}: cara tiap tugas sama dengan soalnya`);
    // Cari kesalahan: tepat satu di soal Klik, pada tugas pertama.
    const salah = soal.flatMap((s) => s.langkah).filter((l) => l.langkah.tipe === "salah");
    cek(salah.length === 1 && soal[0].langkah[0].langkah.tipe === "salah", `${nama}: satu tugas Cari kesalahan di soal Klik`);
    for (const l of salah) {
      const sl = l.langkah;
      cek(sl.alasan.length === 3 && new Set(sl.alasan).size === 3 && sl.benar >= 0 && sl.benar <= 2 && sl.kataTokoh.length > 20 && sl.keliru.length > 20, `${nama}: tugas Cari kesalahan lengkap`);
      cek(sl.benar !== 0, `${nama}: alasan benar bukan tombol pertama`);
      const geser = (sl.benar + 1 + (sl.alasan[sl.benar].length % 2)) % 3;
      cek([0, 1, 2].map((i) => (i + geser) % 3)[0] !== sl.benar, `${nama}: setelah diputar, alasan benar tidak di tombol pertama`);
      cek(["Chacha", "Dika", "Nia"].includes(sl.tokoh), `${nama}: tokoh Kelas 2`);
      const kn = LC.kunciJawab(sl, "klik");
      cek(kn?.jenis === "angka" && kn.n === LC.totalIgil(sl.dasar), `${nama}: Cari kesalahan menjawab dengan bilangan`);
      cek(sl.betul ? sl.jawabTokoh === kn.n : sl.jawabTokoh !== kn.n, `${nama}: jawaban tokoh ${sl.betul ? "sama" : "berbeda"} dengan kunci`);
      for (const t of [...sl.alasan, sl.kataTokoh, sl.keliru]) cek(bersih(t) && tanpaDigit(t), `${nama}: teks Cari kesalahan bersih`);
    }
    // Tiap tugas: kunci, siap langsung, instruksi.
    for (const s of soal)
      for (const t of s.langkah) {
        const l = t.langkah;
        const nm = `${nama} ${s.nomor} ${t.metode}`;
        const d = LC.dasarDari(l);
        const kn = LC.kunciJawab(l, s.cara);
        cek(tanpaDigit(t.suara) && bersih(t.suara) && t.suara === t.judul && t.suara.length > 20, `${nm}: instruksi tanpa digit dan kata terlarang`);
        cek(tanpaDigit(s.judul.replace(/\d+/g, "")) && bersih(s.judul) && bersih(s.cerita) && tanpaDigit(s.cerita), `${nm}: judul dan cerita bersih`);
        if (s.cara === "kanvas") cek(kn?.jenis === "angka" && kn.n >= 1 && kn.n <= 9, `${nm}: kunci kanvas satu angka satu sampai sembilan`);
        else if (s.cara === "suara") cek((kn?.jenis === "nama" && LC.pilihanKataDari(kn.nama).length === 3) || (kn?.jenis === "angka" && kn.n >= 10 && kn.n <= 100), `${nm}: kunci suara satu kata atau satu bilangan sampai seratus`);
        else if (l.tipe !== "salah") cek(kn === null ? LC.nomorKetuk(d) >= 0 : kn.jenis === "angka" && kn.n >= 10 && kn.n <= 100, `${nm}: klik selesai dengan mengetuk atau memilih bilangan`);
        cek(LC.siapLangsung(l, rupa, s.cara) === (l.tipe !== "salah" && kn !== null), `${nm}: siapLangsung (tidak macet pada ${rupa})`);
        cek(["klik", "kanvas", "suara"].every((c) => LC.siapLangsung(l, rupa, c) === (l.tipe !== "salah" && LC.kunciJawab(l, c) !== null)), `${nm}: siapLangsung tidak bergantung pada rupa`);
        // Kalimat kunci dan petunjuk salah tanpa digit.
        const jawabKeliru = kn?.jenis === "angka" ? (kn.n % 9) + 1 : kn?.jenis === "nama" ? LC.pilihanKataDari(kn.nama).find((x) => x !== kn.nama) : "x";
        const teksUji = [LC.kalimatKunci(l, s.cara, rupa), LC.kalimatTanya(l, s.cara), LC.petunjukSalah(l, s.cara, jawabKeliru ?? "x", rupa)];
        if (l.tipe === "salah") teksUji.push(LC.petunjukSalah(l, s.cara, String(l.jawabTokoh ?? "x"), rupa));
        if (d.tipe === "bingkai" && d.mode === "penuh") for (let i = 0; i < d.isi.length; i += 1) if (i !== LC.nomorPenuh(d)) teksUji.push(LC.petunjukKetuk(d, i));
        if (d.tipe === "balok" && d.mode === "pilih") for (let i = 0; i < d.koleksi.length; i += 1) if (i !== LC.nomorSusunan(d)) teksUji.push(LC.petunjukKetuk(d, i));
        cek(teksUji.every((x) => x.length > 10 && tanpaDigit(x) && bersih(x)), `${nm}: kalimat kunci, tanya, dan petunjuk tanpa digit dan kata terlarang`);
        if (kn?.jenis === "nama") {
          const pil = LC.pilihanSuara(l, s.cara);
          cek(pil.includes(kn.nama) && pil.length === 3, `${nm}: pilihan kata memuat kunci`);
        }
        if (kn?.jenis === "angka" && s.cara === "suara") {
          const pil = LC.pilihanSuara(l, s.cara);
          cek(pil.includes(LC.kataBil(kn.n)) && pil.length === 3 && new Set(pil).size === 3, `${nm}: pilihan bilangan memuat kunci`);
        }
        if (kn?.jenis === "angka" && s.cara === "klik") {
          const pil = LC.pilihanKlik(l);
          cek(pil.includes(String(kn.n)) && pil.length === 3 && new Set(pil).size === 3 && pil.every((x) => Number(x) >= 1 && Number(x) <= 100), `${nm}: tiga pilihan bilangan memuat kunci`);
        }
      }
  }
  // Kunci dihitung dari data, bukan kunci tetap; angka kanvas unik per tahap.
  for (const [nama, [, soal]] of Object.entries(TAHAP)) {
    const angka = soal[1].langkah.map((t) => LC.kunciJawab(t.langkah, "kanvas").n);
    sama(angka, ANGKA_KANVAS[nama], `${nama}: angka jawaban Tulis di kanvas`);
    cek(new Set(angka).size === 4, `${nama}: angka jawaban Tulis di kanvas tidak kembar`);
  }
}

/* ------------------------------ Tugas dihitung dari data ------------------------------ */
{
  const lang = (soalIdx, metodeIdx, tahap) => TAHAP[tahap][1][soalIdx].langkah[metodeIdx].langkah;
  const kn = (l, cara) => LC.kunciJawab(l, cara);
  // Concrete.
  const c1 = lang(0, 0, "Concrete");
  sama(kn(c1, "klik"), { jenis: "angka", n: 60 }, "Concrete salah: enam ikat koran adalah enam puluh");
  cek(c1.jawabTokoh === 6 && !c1.betul && c1.dasar.p === 6 && c1.dasar.s === 0, "Concrete salah: Chacha hanya menghitung ikatnya");
  sama(LC.nomorPenuh(lang(0, 1, "Concrete")), 1, "Concrete bingkai klik: bingkai kedua penuh");
  sama(kn(lang(0, 2, "Concrete"), "klik"), { jenis: "angka", n: 70 }, "Concrete loncat klik: dua puluh lalu lima lompatan sampai tujuh puluh");
  sama(LC.nomorSusunan(lang(0, 3, "Concrete")), 1, "Concrete balok klik: susunan kedua adalah dua puluh tujuh");
  sama(kn(lang(1, 0, "Concrete"), "kanvas"), { jenis: "angka", n: 7 }, "Concrete igil kanvas: tujuh benda lepas");
  sama(kn(lang(1, 1, "Concrete"), "kanvas"), { jenis: "angka", n: 4 }, "Concrete bingkai kanvas: empat bingkai penuh");
  sama(kn(lang(1, 2, "Concrete"), "kanvas"), { jenis: "angka", n: 8 }, "Concrete loncat kanvas: delapan lompatan");
  sama(kn(lang(1, 3, "Concrete"), "kanvas"), { jenis: "angka", n: 5 }, "Concrete balok kanvas: lima belas kotak ditukar, sisa lima");
  sama(kn(lang(2, 0, "Concrete"), "suara"), { jenis: "nama", nama: "puluhan" }, "Concrete igil suara: ikat dibaca puluhan");
  sama(kn(lang(2, 1, "Concrete"), "suara"), { jenis: "angka", n: 29 }, "Concrete bingkai suara: dua puluh sembilan");
  sama(kn(lang(2, 2, "Concrete"), "suara"), { jenis: "angka", n: 80 }, "Concrete loncat suara: delapan puluh");
  sama(kn(lang(2, 3, "Concrete"), "suara"), { jenis: "nama", nama: "satuan" }, "Concrete balok suara: kotak kecil satuan");
  // Pictorial.
  const p1 = lang(0, 0, "Pictorial");
  sama(kn(p1, "klik"), { jenis: "angka", n: 49 }, "Pictorial salah: empat puluhan sembilan satuan adalah empat puluh sembilan");
  cek(p1.jawabTokoh === 94 && LC.pengecoh(p1).includes(94), "Pictorial salah: angka tertukar ada di antara pilihan");
  sama(LC.nomorPenuh(lang(0, 1, "Pictorial")), 2, "Pictorial bingkai klik: bingkai ketiga penuh");
  sama(kn(lang(0, 2, "Pictorial"), "klik"), { jenis: "angka", n: 70 }, "Pictorial loncat klik: tujuh puluh");
  sama(LC.nomorSusunan(lang(0, 3, "Pictorial")), 3, "Pictorial balok klik: susunan keempat adalah lima puluh empat");
  sama(kn(lang(2, 0, "Pictorial"), "suara"), { jenis: "nama", nama: "satuan" }, "Pictorial igil suara: lepas dibaca satuan");
  sama(kn(lang(2, 1, "Pictorial"), "suara"), { jenis: "angka", n: 32 }, "Pictorial bingkai suara: tiga puluh dua");
  sama(kn(lang(2, 2, "Pictorial"), "suara"), { jenis: "angka", n: 60 }, "Pictorial loncat suara: enam puluh");
  sama(kn(lang(2, 3, "Pictorial"), "suara"), { jenis: "nama", nama: "puluhan" }, "Pictorial balok suara: batang puluhan");
  // Abstract.
  const a1 = lang(0, 0, "Abstract");
  sama(kn(a1, "klik"), { jenis: "angka", n: 100 }, "Abstract salah: sepuluh puluhan sama dengan seratus");
  cek(a1.betul === true && a1.jawabTokoh === 100, "Abstract Cari kesalahan: jawaban tokoh benar");
  sama(LC.nomorPenuh(lang(0, 1, "Abstract")), 2, "Abstract bingkai klik: bingkai ketiga penuh");
  sama(kn(lang(0, 2, "Abstract"), "klik"), { jenis: "angka", n: 80 }, "Abstract loncat klik: sepuluh lalu tujuh lompatan sampai delapan puluh");
  sama(LC.nomorSusunan(lang(0, 3, "Abstract")), 1, "Abstract balok klik: susunan kedua adalah tujuh puluh tiga");
  sama(kn(lang(2, 0, "Abstract"), "suara"), { jenis: "nama", nama: "puluhan" }, "Abstract igil suara: ikat dibaca puluhan");
  sama(kn(lang(2, 1, "Abstract"), "suara"), { jenis: "angka", n: 58 }, "Abstract bingkai suara: lima puluh delapan");
  sama(kn(lang(2, 2, "Abstract"), "suara"), { jenis: "angka", n: 70 }, "Abstract loncat suara: tujuh puluh");
  sama(kn(lang(2, 3, "Abstract"), "suara"), { jenis: "nama", nama: "satuan" }, "Abstract balok suara: kotak kecil satuan");
  // Syarat soal: bingkai penuh tunggal, susunan balok tunggal, rentang aman.
  for (const tahap of Object.keys(TAHAP))
    for (const [si, s] of TAHAP[tahap][1].entries())
      for (const t of s.langkah) {
        const d = LC.dasarDari(t.langkah);
        const nm = `${tahap} ${s.nomor} ${t.metode}`;
        if (d.tipe === "igil") cek(d.p >= 1 && d.p <= 10 && d.s >= 0 && d.s <= 9 && (s.cara !== "kanvas" || (d.s >= 1 && d.p <= 7)) && (s.cara !== "suara" || (d.tanya && d.s >= 1 && d.p >= 1)) && (tahap === "Concrete" ? d.p <= 7 : true), `${nm}: ikat dan lepas dalam rentang`);
        if (d.tipe === "bingkai" && d.mode === "penuh") cek(d.isi.length === 4 && d.isi.filter((n) => n === 10).length === 1 && d.isi.every((n) => n >= 1 && n <= 10) && s.cara === "klik", `${nm}: empat bingkai, tepat satu penuh`);
        if (d.tipe === "bingkai" && d.mode === "hitung") cek(d.p >= 1 && d.p <= 5 && d.s >= 1 && d.s <= 9 && (tahap !== "Concrete" || d.p <= 4), `${nm}: bingkai penuh dan bingkai terakhir dalam rentang`);
        if (d.tipe === "loncat") cek(d.awal % 10 === 0 && d.k >= 2 && d.k <= 9 && LC.hasilLoncat(d) <= 100 && (s.cara !== "kanvas" || d.awal === 0), `${nm}: awal kelipatan sepuluh, hasil tidak lebih dari seratus, kanvas dari nol`);
        if (d.tipe === "balok" && d.mode === "pilih") cek(d.koleksi.length === 4 && d.koleksi.filter((b) => LC.nilaiBalok(b) === d.target).length === 1 && d.koleksi.some((b) => b[0] === d.target % 10 && b[1] === Math.floor(d.target / 10) && LC.nilaiBalok(b) !== d.target) === (d.target % 10 !== 0 && d.target % 11 !== 0) && d.koleksi.every((b) => b[0] <= 9 && b[1] <= 9), `${nm}: empat susunan, satu sama dengan bilangan, angka tertukar jadi pengecoh`);
        if (d.tipe === "balok" && d.mode === "tukar") cek(d.p >= 1 && d.p <= 3 && d.k >= 11 && d.k <= 19, `${nm}: tukar sepuluh kotak, sisa satu sampai sembilan`);
        if (d.tipe === "balok" && d.mode === "kata") cek(d.p >= 1 && d.p <= 9 && d.s >= 1 && d.s <= 9 && ["batang", "kotak"].includes(d.tanya), `${nm}: batang atau kotak ditanyakan`);
      }
  // Cari kesalahan: Concrete tokoh hanya menghitung ikat, Pictorial angka tertukar, Abstract tokoh benar.
  cek(/ikat/.test(D.CONCRETE[0].langkah[0].langkah.kataTokoh) && /sepuluh/.test(D.CONCRETE[0].langkah[0].langkah.keliru), "Concrete Cari kesalahan: satu ikat berisi sepuluh");
  cek(/[Pp]uluhan dibaca lebih dulu/.test(D.PICTORIAL[0].langkah[0].langkah.keliru), "Pictorial Cari kesalahan: puluhan dibaca lebih dulu");
  // Lintas tahap: dua jenis jawaban suara (kata dan bilangan) di tiap tahap.
  for (const tahap of Object.keys(TAHAP)) {
    const jenis = TAHAP[tahap][1][2].langkah.map((t) => LC.kunciJawab(t.langkah, "suara").jenis);
    cek(jenis.includes("nama") && jenis.includes("angka"), `${tahap}: jawaban suara berupa kata dan bilangan`);
  }
  // Jawaban klik beragam: memilih bilangan dan mengetuk.
  for (const tahap of Object.keys(TAHAP)) {
    const k = TAHAP[tahap][1][0].langkah.map((t) => LC.kunciJawab(t.langkah, "klik"));
    cek(k.some((x) => x === null) && k.some((x) => x?.jenis === "angka"), `${tahap}: jawaban klik berupa memilih bilangan dan mengetuk`);
  }
  // Rupa: Concrete memakai benda (emoji), lainnya tidak.
  for (const s of D.CONCRETE) for (const t of s.langkah) cek(objekDari(t.langkah) !== undefined && objekDari(t.langkah) >= 0 && objekDari(t.langkah) < LC.OBJEK.length, `Concrete ${s.nomor} ${t.metode}: gambar memakai benda`);
  for (const s of [...D.PICTORIAL, ...D.ABSTRACT]) for (const t of s.langkah) cek(objekDari(t.langkah) === undefined, `Pictorial dan Abstract ${s.nomor} ${t.metode}: tanpa benda beremoji`);
  // Data dasar bukan angka Story pada kunci kanvas.
  for (const [nama, [, soal]] of Object.entries(TAHAP)) cek(soal[1].langkah.every((t) => LC.kunciJawab(t.langkah, "kanvas").n >= 1), `${nama}: kanvas bernilai angka`);
}

/* ------------------------------ Data lain ------------------------------ */
{
  cek(D.POIN_PENTING.length >= 5 && D.POIN_PENTING.every((p) => tanpaDigit(p) && bersih(p)) && D.POIN_PENTING_SUARA.every(tanpaDigit), "poin penting tanpa digit dan kata terlarang");
  cek(/Bu Lia/.test(D.PENUTUP_A) && /\?$/.test(D.PENUTUP_A) && bersih(D.PENUTUP_A) && tanpaDigit(D.PENUTUP_A), "penutup: jembatan ke Sub-Bab B berupa pertanyaan");
  cek(Object.keys(D.TEMA_IKAT).join() === "concrete,pictorial,abstract" && Object.values(D.TEMA_IKAT).every((t) => emojiSah(t.ikon) && t.nama && t.cara && bersih(t.cara)), "tema tiga tahap");
  cek(D.CONCRETE_IKAT === D.CONCRETE && D.PICTORIAL_IKAT === D.PICTORIAL && D.ABSTRACT_IKAT === D.ABSTRACT && D.MISI_IKAT_TEKS === DP.MISI_IKAT_TEKS, "nama ekspor untuk pemasang");
  cek(LC.OBJEK.every((o) => emojiSah(o.emoji) && /^#[0-9A-Fa-f]{6}$/.test(o.warna)) && LC.OBJEK.length >= 7, "objek Concrete beremoji sah");
  const semuaObj = LC.OBJEK.map((o) => o.nama).join(" ");
  for (const s of ["botol", "kaleng", "kardus", "kaus bekas"]) cek(!semuaObj.includes(s), `benda Concrete bukan data Story atau Simulasi (${s})`);
  cek(new Set(LC.OBJEK.map((o) => o.emoji)).size === LC.OBJEK.length && !LC.OBJEK.some((o) => DP.BENDA_SIM.some((b) => b.emoji === o.emoji)), "emoji benda Concrete unik dan berbeda dari simulasi");
}

/* ------------------------------ Berkas ------------------------------ */
{
  const berkas = readdirSync(folderUrl).filter((f) => /\.(ts|tsx)$/.test(f));
  const perlu = ["logika.ts", "logika-cpa.ts", "data.ts", "data-peta.ts", "data-kartu.ts", "periksa.ts", "JawabIkat.tsx", "LangkahIkat.tsx", "TahapIkat.tsx", "GerobakBotol.tsx", "PapanSetoran.tsx", "SimulasiGudangIkat.tsx"];
  for (const f of perlu) cek(berkas.includes(f), `berkas ${f} ada`);
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folderUrl), "utf8");
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d || c.codePointAt(0) === 0x1f6de), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}/i.test(s), `${f}: kode emoji tidak melewati U+1FA95`);
    cek(!s.startsWith("\uFEFF") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    if (/\.ts$/.test(f) && !/data-peta|logika\.ts$/.test(f)) cek(!/from "react"|fetch\(/.test(s), `${f}: logika tanpa React dan jaringan`);
    cek(!/\btebak(an)?\b/i.test(s), `${f}: tanpa kata tebak`);
  }
  // Tahap UI: batas rupa dan kata terlarang di teks layar.
  const ui = (f) => readFileSync(new URL(f, folderUrl), "utf8");
  const langkah = ui("LangkahIkat.tsx");
  cek(/rupa === "benda"/.test(langkah) && /rupa === "lambang"/.test(langkah) && /OBJEK/.test(langkah) && /KartuKata/.test(langkah) && /Bingkai/.test(langkah) && /Loncat/.test(langkah) && /Balok/.test(langkah) && /Ikatan/.test(langkah), "LangkahIkat: tiga rupa (benda beremoji, ikat dan balok polos, kartu kata)");
  cek(/BATAS_SALAH|JawabSuaraIkat/.test(ui("JawabIkat.tsx")) && /Ini jawaban yang benar/.test(ui("JawabIkat.tsx")) && /Ini jawaban yang benar/.test(langkah), "pesan Ini jawaban yang benar dipakai");
  const tahap = ui("TahapIkat.tsx");
  cek(/poinPenting/.test(tahap) && /POIN_PENTING/.test(tahap) && /teksAkhir/.test(tahap) && /umum/.test(tahap) && /rupa/.test(tahap) && /soal/.test(tahap) && /pita/.test(tahap), "TahapIkat: props umum, rupa, soal, pita, teksAkhir, poinPenting");
  cek(/PetaKartu/.test(ui("GerobakBotol.tsx")) && /onLanjut/.test(ui("GerobakBotol.tsx")) && /teksLanjut/.test(ui("GerobakBotol.tsx")), "GerobakBotol.tsx: kartu geser lewat PetaKartu");
  cek(/InfografisKartu/.test(ui("PapanSetoran.tsx")) && /onLanjut/.test(ui("PapanSetoran.tsx")) && /teksLanjut/.test(ui("PapanSetoran.tsx")), "PapanSetoran.tsx: tabel lewat InfografisKartu");
  for (const f of ["GerobakBotol.tsx", "PapanSetoran.tsx", "SimulasiGudangIkat.tsx", "LangkahIkat.tsx", "TahapIkat.tsx", "JawabIkat.tsx"]) {
    const s = ui(f);
    const teksLayar = [...s.matchAll(/>\s*([^<>{}\n]{6,})\s*</g)].map((m) => m[1]).concat([...s.matchAll(/"([^"\n]{12,})"/g)].map((m) => m[1]));
    for (const t of teksLayar) if (/[a-z]{3}/.test(t) && !/^[a-z:/.\-_0-9[\]]+$/.test(t) && !/&&|===|=>|\|\|/.test(t)) cek(!TERLARANG.test(t) && !/tebak/i.test(t), `${f}: teks layar tanpa kata terlarang ("${t.slice(0, 40)}")`);
  }
  const sim = ui("SimulasiGudangIkat.tsx");
  cek(/onKeadaan/.test(sim) && /speakGuru/.test(sim), "SimulasiGudangIkat: melapor keadaan dan bersuara");
  cek(/export default function/.test(sim) && /export default function/.test(tahap) && /export default function/.test(ui("GerobakBotol.tsx")) && /export default function/.test(ui("PapanSetoran.tsx")), "ekspor bawaan komponen");
  // Abstract: tanpa emoji benda pada kartu (kartu kata hanya teks dan angka).
  cek(!/KartuKata[^\n]*OBJEK/.test(langkah), "kartu kata tanpa emoji benda");
}

console.log(`Lulus ${lulus}, gagal ${gagal}`);
process.exit(gagal ? 1 : 0);
