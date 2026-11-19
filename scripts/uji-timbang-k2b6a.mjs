// Uji Mind-map (Rak Peralatan), Infografis (Papan Lapangan), Simulasi Pos Timbang, dan tahap Concrete, Pictorial, Abstract Kelas 2 Bab 6 Sub-Bab A ("Peralatan Lomba
// Pak Anton"), awal cerita Hari Olahraga Sekolah.
// Memeriksa: logika simulasi (jungkat, satuan, susun), misi (awal tidak memenuhi, wajib empat, bebas dua), rak peralatan (Masalah tiga, Penyelesaian tujuh bernomor memuat
// semua metode Story, Hasil empat), papan lapangan dari data Story, CPA dua belas langkah per tahap (Klik, Kanvas, Suara x empat metode) dengan jawaban beragam dan Cari
// kesalahan di tiap tahap, kunci dihitung dari berat, angka jawaban tidak kembar per tahap, tugas yang langsung siap (jebakan tombol macet), pengenal ucapan, petunjuk salah,
// batas rupa, emoji, kata terlarang, akhir baris.
// Jalankan: node --no-warnings scripts/uji-timbang-k2b6a.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/timbang-k2b6a/logika.ts");
const DP = await import("../src/components/modul/timbang-k2b6a/data-peta.ts");
const DK = await import("../src/components/modul/timbang-k2b6a/data-kartu.ts");
const LC = await import("../src/components/modul/timbang-k2b6a/logika-cpa.ts");
const D = await import("../src/components/modul/timbang-k2b6a/data.ts");
const K = await import("../src/components/modul/timbang-k2b6a/periksa.ts");
const S = await import("../src/components/modul/misi-simulasi.ts");
const MK = await import("../src/components/modul/misi-k2bab6.ts");
const LL = await import("../src/components/modul/lemari-k1b1a/logika.ts");
const folderUrl = new URL("../src/components/modul/timbang-k2b6a/", import.meta.url);

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
const bersih = (t) => !TERLARANG.test(t) && !/buku|kelompok|bernilai|tebak/i.test(t);
const emojiSah = (s) => [...s].every((c) => c.codePointAt(0) <= 0x1fa95 && c.codePointAt(0) !== 0x200d && c.codePointAt(0) !== 0x1f6de);

/* ------------------------------ Simulasi: data dan logika ------------------------------ */
{
  const BS = DP.BENDA_SIM;
  const ST = DP.SATUAN_SIM;
  cek(BS.length === 5 && new Set(BS.map((b) => b.id)).size === 5 && new Set(BS.map((b) => b.nama)).size === 5, "simulasi: lima benda unik");
  for (const b of BS) cek(emojiSah(b.emoji) && tanpaDigit(b.nama) && bersih(b.nama) && b.w >= 2 && b.w % 2 === 0, `${b.id}: emoji, nama, berat genap sah`);
  cek(BS.some((b) => b.besar) && BS.filter((b) => b.besar).every((b) => b.w === Math.min(...BS.map((x) => x.w))), "simulasi: benda besar adalah yang paling ringan");
  cek(BS.some((b, i) => BS.some((c, j) => i < j && b.w === c.w)), "simulasi: ada dua benda sama berat");
  cek(ST.length === 2 && ST.every((s) => emojiSah(s.emoji) && bersih(s.nama) && tanpaDigit(s.nama)) && ST[0].w === 1 && ST[1].w === 2, "simulasi: dua satuan, dadu dan es batu");
  const nama = BS.map((b) => b.nama).concat(ST.map((s) => s.nama)).join(" | ").toLowerCase();
  for (const s of ["kerucut", "kantong", "bola", "raket", "botol", "boneka", "kelereng", "koin", "balok", "pepaya", "mangga", "manggis", "balon", "batu bata", "ransel", "sepatu", "topi", "piala", "medali", "keranjang", "kardus", "gelas", "kaus"]) cek(!nama.includes(s), `benda simulasi bukan data Story atau CPA (${s})`);
  cek(DP.SUSUN_SIM.length === 4 && new Set(DP.SUSUN_SIM.map((i) => BS[i].w)).size === 4, "susun: empat benda beratnya berbeda");
  const a = L.awalTimbang();
  cek(a.alat === "timbang" && a.mode === "jungkat" && a.kiri === -1 && a.kanan === -1 && a.dibandingkan.length === 0 && !a.besarRingan && a.seimbang.length === 0 && a.tabel.length === 0 && a.urutanBenar === 0, "awal: kosong");
  sama(L.mulaiLagiTimbang(), a, "mulai lagi sama dengan awal");
  sama(L.pilihModeTimbang(a, "satuan").mode, "satuan", "ganti alat");
  // Jungkat.
  sama(L.arahPapan(a), "datar", "papan kosong datar");
  const k1 = L.taruhKiri(a, 4);
  sama([k1.kiri, k1.dibandingkan.length], [4, 0], "taruh kiri: belum dibandingkan bila kanan kosong");
  const k2 = L.taruhKanan(k1, 0);
  sama([k2.dibandingkan, k2.besarRingan, L.arahPapan(k2)], [["0-4"], true, "kiri"], "taruh kanan: pasangan tercatat, benda besar ringan, kiri turun");
  cek(L.taruhKanan(k1, 4) === k1 && L.taruhKiri(k2, 0) === k2 && L.taruhKiri(a, 99) === a, "taruh: benda sama di dua sisi atau nomor tidak sah ditolak");
  const k3 = L.taruhKiri(k2, 1);
  sama([k3.dibandingkan, L.arahPapan(k3)], [["0-4", "0-1"], "datar"], "layang-layang dan bulu tangkis sama berat, papan datar");
  cek(!L.taruhKanan(L.taruhKiri(a, 1), 2).besarRingan && L.taruhKanan(L.taruhKiri(a, 2), 0).besarRingan, "besar ringan hanya dicatat bila benda besar lebih ringan");
  sama(L.taruhKiri(k3, 2).dibandingkan.length, 3, "pasangan baru ditambah");
  sama(L.taruhKiri(L.taruhKiri(k3, 2), 1).dibandingkan.length, 3, "pasangan yang sama tidak tercatat dua kali");
  sama([L.kosongkanPapan(k3).kiri, L.kosongkanPapan(k3).kanan, L.kosongkanPapan(k3).dibandingkan], [-1, -1, k3.dibandingkan], "kosongkan papan tidak menghapus catatan");
  // Satuan.
  let s = L.pilihBendaSatuan(a, 3);
  cek(L.ubahJumlah(s, 1) === s && L.arahSatuan(s) === "datar", "satuan: perlu memilih satuan dulu");
  s = L.pilihSatuan(s, 1);
  sama(L.jumlahSeimbang(3, 1), 3, "tinju sama berat dengan tiga es batu");
  s = L.ubahJumlah(s, 1);
  sama([L.arahSatuan(s), L.seimbangSatuan(s)], ["kiri", false], "satu es batu: benda masih lebih berat");
  s = L.ubahJumlah(L.ubahJumlah(s, 1), 1);
  cek(L.seimbangSatuan(s) && s.seimbang.length === 1 && s.seimbang[0] === "3-1", "tiga es batu: seimbang tercatat");
  const lebih = L.ubahJumlah(s, 1);
  sama([L.arahSatuan(lebih), lebih.seimbang.length], ["kanan", 1], "empat es batu: terlalu banyak");
  sama(L.seimbangSatuan(L.ubahJumlah(lebih, -1)), true, "dikurangi satu: seimbang lagi");
  cek(L.ubahJumlah(L.pilihSatuan(s, 0), -1).jumlah === 0 && L.pilihSatuan(s, 0).jumlah === 0, "ganti satuan: jumlah dimulai lagi");
  let dadu = L.pilihSatuan(L.pilihBendaSatuan(a, 3), 0);
  for (let i = 0; i < DP.MAKS_SATUAN; i += 1) dadu = L.ubahJumlah(dadu, 1);
  cek(L.ubahJumlah(dadu, 1) === dadu && dadu.jumlah === DP.MAKS_SATUAN, "satuan: batas jumlah satuan");
  let enamDadu = L.pilihSatuan(L.pilihBendaSatuan(a, 3), 0);
  for (let i = 0; i < 6; i += 1) enamDadu = L.ubahJumlah(enamDadu, 1);
  cek(enamDadu.seimbang.includes("3-0") && L.jumlahSeimbang(3, 0) === 6, "tinju sama berat dengan enam dadu (satuan lebih ringan butuh lebih banyak)");
  cek(!L.catatTabel(s.jumlah === 3 ? L.ubahJumlah(s, 1) : s).ok && L.catatTabel(s).ok && L.catatTabel(s).k.tabel.join() === "3-1", "tabel: hanya hasil yang seimbang dicatat");
  const t2 = L.catatTabel(L.catatTabel(s).k).k;
  sama(t2.tabel, ["3-1"], "tabel: hasil yang sama tidak dicatat dua kali");
  let dua = L.catatTabel(s).k;
  dua = L.pilihSatuan(dua, 0);
  for (let i = 0; i < 6; i += 1) dua = L.ubahJumlah(dua, 1);
  dua = L.catatTabel(dua).k;
  sama([dua.tabel, L.bendaDuaSatuan(dua)], [["3-1", "3-0"], [3]], "satu benda dua satuan tercatat dua hasil ukur");
  // Susun.
  sama(L.urutanSusun(), [4, 3, 2, 1], "urutan susun: batu curling, sarung tinju, yoyo, bulu tangkis");
  const sal = L.ketukSusun(a, 1);
  cek(!sal.ok && sal.k.salahSusun === 1 && sal.k.susunPilih.length === 0 && !sal.selesai, "susun: benda paling ringan lebih dulu ditolak");
  let u = a;
  for (const i of [4, 3, 2]) {
    const r = L.ketukSusun(u, i);
    cek(r.ok && !r.selesai, `susun: ketukan benar ${i}`);
    u = r.k;
  }
  cek(L.ketukSusun(u, 4).k === u, "susun: benda yang sudah dipilih diabaikan");
  const akhir = L.ketukSusun(u, 1);
  cek(akhir.ok && akhir.selesai && akhir.k.urutanBenar === 1 && akhir.k.susunPilih.length === 4, "susun: urutan lengkap tercatat");
  sama(L.susunLagi(akhir.k).susunPilih, [], "susun lagi mengosongkan urutan");
  cek(L.ketukSusun(a, 0).k === a, "susun: benda di luar daftar susun diabaikan");
  // Petunjuk dan kalimat: tanpa digit dan tanpa kata terlarang.
  const semua = [L.kalimatPapan(a), L.kalimatPapan(L.taruhKiri(a, 1)), L.kalimatPapan(L.taruhKanan(a, 2)), L.kalimatPapan(k2), L.kalimatPapan(k3), L.kalimatBesarRingan(k2)];
  for (const x of [L.pilihModeTimbang(a, "satuan"), L.pilihBendaSatuan(L.pilihModeTimbang(a, "satuan"), 2), L.pilihSatuan(L.pilihBendaSatuan(a, 2), 0), L.ubahJumlah(L.pilihSatuan(L.pilihBendaSatuan(a, 2), 0), 1), s, lebih, L.ubahJumlah(L.pilihSatuan(L.pilihBendaSatuan(a, 4), 0), 1)]) semua.push(L.kalimatSatuan(x));
  for (const x of [a, u, akhir.k]) semua.push(L.kalimatSusun(x));
  for (const i of [1, 2, 3, 4]) semua.push(L.petunjukSusun(a, i), L.petunjukSusun(u, i === 4 ? 1 : i));
  cek(semua.every((t) => tanpaDigit(t) && bersih(t) && t.length > 10 || t === ""), `kalimat suara simulasi tanpa digit dan kata terlarang (${semua.length} kalimat)`);
  cek(tanpaDigit(DP.MISI_TIMBANG_TEKS) && bersih(DP.MISI_TIMBANG_TEKS) && DP.MISI_TIMBANG_TEKS.length > 40, "teks misi awal tanpa digit");
}

/* ------------------------------ Misi ------------------------------ */
{
  const A = MK.MISI_A;
  cek(A.filter((m) => m.wajib).length === 4 && A.filter((m) => !m.wajib).length === 2, "misi A: empat wajib, dua bebas");
  cek(new Set(A.map((m) => m.id)).size === 6 && A.every((m) => m.id.startsWith("a-") && m.teks.length >= 10 && m.teks.length <= 120 && tanpaDigit(m.teks) && bersih(m.teks)), "misi A: id berawalan a-, unik, 10 sampai 120 huruf, tanpa digit");
  sama(MK.daftarMisiK2Bab6("A"), A, "daftarMisiK2Bab6 A");
  cek(A.every((m) => !m.cek({ alat: "kerangka" })), "misi A: alat lain tidak memenuhi misi");
  const a = L.awalTimbang();
  sama(S.misiBaru(A, a, new Set()), [], "misi A: keadaan awal tanpa misi baru");
  const baru = (o) => S.misiBaru(A, { ...a, ...o }, new Set());
  sama(baru({ dibandingkan: ["0-4"] }), ["a-banding"], "misi: satu pasangan ditimbang memenuhi a-banding");
  sama(baru({ besarRingan: true }), ["a-besar"], "misi: benda besar yang ringan memenuhi a-besar");
  sama(baru({ seimbang: ["3-1"] }), ["a-satuan"], "misi: seimbang memenuhi a-satuan");
  sama(baru({ urutanBenar: 1 }), ["a-susun"], "misi: urutan benar memenuhi a-susun");
  sama(baru({ tabel: ["3-0", "3-1"] }), ["a-dua"], "misi: dua satuan memenuhi a-dua");
  cek(S.misiBaru(A, { ...a, salahSusun: 9 }, new Set()).length === 0, "misi: percobaan keliru tidak dihitung sebagai misi");
  // Alur lengkap lewat logika.
  let z = L.taruhKanan(L.taruhKiri(a, 4), 0);
  z = L.pilihSatuan(L.pilihBendaSatuan(z, 3), 1);
  for (let i = 0; i < 3; i += 1) z = L.ubahJumlah(z, 1);
  for (const i of L.urutanSusun()) z = L.ketukSusun(z, i).k;
  sama(S.misiBaru(MK.MISI_A, z, new Set()), ["a-banding", "a-besar", "a-satuan", "a-susun"], "misi: alur lengkap memenuhi empat misi wajib");
}

/* ------------------------------ Mind-map: troli peralatan (sembilan kartu geser) ------------------------------ */
{
  const K = DK.KARTU_TIMBANG;
  cek(K.length === 9, "kartu: sembilan kartu");
  cek(K.every((k) => k.contoh.length <= 1) && K[0].contoh.join() === "masalah" && K[1].contoh.join() === "cara" && K.slice(2).every((k) => k.contoh.length === 0), "kartu: satu kotak contoh di dua kartu pertama, sisanya mandiri");
  const semua = K.flatMap((k) => [k.masalah, k.cara, k.hasil]);
  const label = semua.map((x) => x.label);
  cek(new Set(label).size === label.length, "kartu: label unik");
  cek(semua.every((x) => x.label.length >= 5 && x.label.length <= 36), `kartu: label pendek (terpanjang ${Math.max(...label.map((l) => l.length))} huruf)`);
  cek(K.every((k) => [k.masalah.label, k.cara.label, k.hasil.label].every((l) => l.split(/\s+/).length <= 6)), "kartu: label paling banyak enam kata");
  cek(semua.every((x) => tanpaDigit(x.label) && tanpaDigit(x.arti) && bersih(x.label) && bersih(x.arti) && x.arti.length > 10), "kartu: label dan arti tanpa digit dan kata terlarang");
  cek(K.every((k) => tanpaDigit(k.judul) && bersih(k.judul) && k.judul.length > 5), "kartu: judul bersih");
  cek(K.every((k) => /\?$/.test(k.masalah.label) || k.masalah.label.length > 0), "kartu: masalah terisi");
  const cara = K.map((k) => k.cara.label).join(" | ");
  for (const m of ["Model Batang","Neraca Titik","Berat di Dasar","Jungkat-jungkit","Timbang"]) cek(cara.toLowerCase().includes(m.toLowerCase()), `kartu: cara memuat ${m}`);
  const gab = K.map((k) => [k.judul, k.masalah.label, k.cara.label, k.hasil.label, k.masalah.arti, k.cara.arti, k.hasil.arti].join(" ")).join(" ").toLowerCase();
  for (const s of ["berapa beratnya","lebih berat","besar belum tentu berat","paling berat","satuan","seimbang","hitungan banyak","selisih"]) cek(gab.includes(s), `kartu: memuat poin "${s}"`);
  cek(!new RegExp("\\b(chacha|dika|nia|bu sari|pak anton|kerucut|kantong|troli|boneka|harimau|pepaya)\\b", "i").test(gab), "kartu: hanya poin pelajaran (tanpa tokoh dan benda cerita)");
  cek(tanpaDigit(DK.SUARA_KARTU_TIMBANG + DK.SELESAI_KARTU_TIMBANG) && bersih(DK.SUARA_KARTU_TIMBANG + DK.SELESAI_KARTU_TIMBANG), "kartu: suara dan pesan selesai tanpa digit dan kata terlarang");
  cek(emojiSah(DK.TEMA_KARTU_TIMBANG.ikon) && DK.TEMA_KARTU_TIMBANG.judul.length > 5, "kartu: tema sah");
  const RG = DK.RINGKASAN_TIMBANG;
  cek(RG.ikon.length === DK.KARTU_TIMBANG.length && new Set(RG.ikon).size === RG.ikon.length && [...RG.ikon, RG.pusat].every((e) => emojiSah(e) && !/[A-Za-z0-9]/.test(e)), "peta radial: satu gambar unik per kartu, gambar sah tanpa huruf");
  cek(tanpaDigit(RG.suara) && bersih(RG.suara) && !RG.ikon.includes(RG.pusat), "peta radial: suara bersih dan pusat berbeda dari cabang");
}

/* ------------------------------ Infografis: papan lapangan ------------------------------ */
{
  const T = DP.TEMPAT_PAPAN;
  cek(T.filter((x) => x.contoh).length === 7 && [0, 1, 2].every((c) => T[c].contoh) && T.filter((x, i) => x.contoh && i >= 3).length === 4 && T.filter((x) => !x.contoh).length === 8, "papan: satu baris contoh penuh dan satu sel contoh tiap baris lain");
  cek(DP.BARIS_PAPAN.length === 5 && T.length === 15 && DP.KOLOM_PAPAN.length === 3, "papan: lima baris, tiga kolom, lima belas kotak");
  cek(new Set(T.map((t) => t.kunci)).size === 15 && new Set(T.map((t) => t.id)).size === 15, "papan: label unik");
  cek(T.every((t) => t.kunci.length <= 34 && tanpaDigit(t.kunci) && bersih(t.kunci)), `papan: label pendek, tanpa digit dan kata terlarang (terpanjang ${Math.max(...T.map((t) => t.kunci.length))})`);
  const baris = DP.BARIS_PAPAN.map((b) => b.nama).join(" ");
  for (const s of ["Kerucut", "kantong", "Dua bola", "Boneka harimau", "Rantai buah"]) cek(baris.includes(s), `papan: baris ${s} dari data Story`);
  cek(DP.BARIS_PAPAN.every((b) => emojiSah(b.ikon)), "papan: emoji sah");
  cek(Object.keys(DP.KELOMPOK_PAPAN).join() === "cara,terjadi,hasil" && T.every((t) => DP.KELOMPOK_PAPAN[t.kelompok]), "papan: petunjuk tiap kolom");
  cek(DP.BARIS_PAPAN.some((b) => b.hasil === "sama berat") && DP.BARIS_PAPAN.some((b) => /lebih berat/.test(b.hasil)), "papan: hasil memakai kata berat");
  cek(tanpaDigit(DP.SUARA_PAPAN) && bersih(DP.SUARA_PAPAN), "papan: suara tanpa digit");
}

/* ------------------------------ Pengenal ucapan ------------------------------ */
{
  const kn = (nama) => ({ jenis: "nama", nama });
  sama(K.kataDariUcapan("berat"), ["berat"], "ucapan: berat");
  sama(K.kataDariUcapan("lebih berat!"), ["berat"], "ucapan: lebih berat");
  sama(K.kataDariUcapan("Ringan"), ["ringan"], "ucapan: ringan");
  sama(K.kataDariUcapan("sama berat"), ["sama"], "ucapan: sama berat hanya sama");
  sama(K.kataDariUcapan("sama"), ["sama"], "ucapan: sama");
  sama(K.kataDariUcapan("turun"), ["bawah"], "ucapan: turun berarti bawah");
  sama(K.kataDariUcapan("di atas"), ["atas"], "ucapan: di atas");
  sama(K.kataDariUcapan("naik"), ["atas"], "ucapan: naik berarti atas");
  sama(K.kataDariUcapan("seimbang"), ["seimbang"], "ucapan: seimbang");
  sama(K.kataDariUcapan("papan datar"), ["seimbang"], "ucapan: datar berarti seimbang");
  sama(K.kataDariUcapan("tidak ringan, berat"), ["berat"], "ucapan: tidak ringan tidak dihitung");
  sama(K.kataDariUcapan("halo"), [], "ucapan: kata lain tidak dikenali");
  cek(K.cocokUcapan("sama berat", kn("sama")).cocok && !K.cocokUcapan("sama berat", kn("berat")).cocok, "cocok: sama berat bukan berat");
  cek(K.cocokUcapan("lebih berat", kn("lebih berat")).cocok && K.cocokUcapan("berat", kn("lebih berat")).cocok && !K.cocokUcapan("ringan", kn("lebih berat")).cocok, "cocok: kunci lebih berat dijawab berat");
  cek(K.cocokUcapan("ringan sekali", kn("ringan")).cocok && !K.cocokUcapan("ringan", kn("berat")).cocok, "cocok: ringan");
  cek(K.cocokUcapan("bawah", kn("bawah")).cocok && K.cocokUcapan("atas", kn("atas")).cocok && !K.cocokUcapan("atas", kn("bawah")).cocok, "cocok: bawah dan atas");
  cek(K.cocokUcapan("dua 2", { jenis: "angka", n: 2 }).cocok && K.cocokUcapan("2", { jenis: "angka", n: 2 }).cocok && !K.cocokUcapan("tiga", { jenis: "angka", n: 2 }).cocok, "cocok: kunci angka dan angka 2");
  sama(K.angkaDariUcapan("tiga, 4 dan lima"), [3, 4, 5], "angka dari ucapan");
  cek(K.cocokUcapan("delapan", { jenis: "angka", n: 8 }).cocok && K.cocokUcapan("sembilan", { jenis: "angka", n: 9 }).cocok, "cocok: delapan dan sembilan");
}

/* ------------------------------ CPA ------------------------------ */
const TAHAP = { Concrete: ["benda", D.CONCRETE], Pictorial: ["diagram", D.PICTORIAL], Abstract: ["lambang", D.ABSTRACT] };
const benda = (l) => {
  const d = LC.dasarDari(l);
  if (d.tipe === "igil") return d.mode === "banding" ? [d.kiri, d.kanan] : [d.benda, d.satuan];
  if (d.tipe === "batang") return d.items;
  if (d.tipe === "titik") return d.pasang.flat();
  return d.mode === "urut" ? d.items : [d.a, d.b, d.c];
};
{
  const ANGKA_KANVAS = { Concrete: [5, 7, 2, 8], Pictorial: [7, 5, 3, 9], Abstract: [8, 3, 5, 6] };
  sama(D.CONCRETE.map((s) => s.nomor), [2, 3, 4], "nomor misi Concrete berlanjut dari simulasi");
  sama(D.PICTORIAL.map((s) => s.nomor), [5, 6, 7], "nomor misi Pictorial");
  sama(D.ABSTRACT.map((s) => s.nomor), [8, 9, 10], "nomor misi Abstract");
  sama(LC.URUT_METODE, ["igil", "batang", "titik", "dasar"], "urutan metode");
  cek(LC.NAMA_METODE.igil.includes("Angkat, Timbang, Bandingkan") && LC.NAMA_METODE.batang.includes("Bar Model") && LC.NAMA_METODE.titik.includes("Dot Balance") && LC.NAMA_METODE.dasar.includes("Heavy First"), "nama metode: IGIL dan tiga metode global");
  cek(Object.values(LC.IKON_METODE).every(emojiSah), "ikon metode: emoji sah");
  for (const [nama, [rupa, soal]] of Object.entries(TAHAP)) {
    sama(soal.map((s) => s.cara), ["klik", "kanvas", "suara"], `${nama}: tiga soal Klik, Kanvas, Suara`);
    cek(soal.every((s) => s.langkah.length === 4), `${nama}: empat tugas tiap soal (dua belas tugas)`);
    for (const s of soal) sama(s.langkah.map((l) => l.metode), ["igil", "batang", "titik", "dasar"], `${nama} ${s.nomor}: empat metode berurutan`);
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
      cek(kn?.jenis === "nama" && LC.pilihanKataDari(kn.nama).length === 3, `${nama}: Cari kesalahan menjawab dengan kata`);
      cek(sl.betul ? sl.jawabTokoh === kn.nama : sl.jawabTokoh !== kn.nama, `${nama}: jawaban tokoh ${sl.betul ? "sama" : "berbeda"} dengan kunci`);
      for (const t of [...sl.alasan, sl.kataTokoh, sl.keliru]) cek(bersih(t), `${nama}: teks Cari kesalahan bersih`);
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
        else if (s.cara === "suara") cek((kn?.jenis === "nama" && LC.pilihanKataDari(kn.nama).length === 3) || (kn?.jenis === "angka" && kn.n >= 1 && kn.n <= 9), `${nm}: kunci suara satu kata atau satu bilangan`);
        else if (l.tipe !== "salah") cek(kn === null && (d.tipe === "dasar" ? LC.urutBenar(d).length >= 3 : LC.nomorKetuk(d) >= 0), `${nm}: klik selesai dengan mengetuk`);
        cek(LC.siapLangsung(l, rupa, s.cara) === (l.tipe !== "salah" && kn !== null), `${nm}: siapLangsung (tidak macet pada ${rupa})`);
        cek(["klik", "kanvas", "suara"].every((c) => LC.siapLangsung(l, rupa, c) === (l.tipe !== "salah" && LC.kunciJawab(l, c) !== null)), `${nm}: siapLangsung tidak bergantung pada rupa`);
        // Kalimat kunci dan petunjuk salah tanpa digit.
        const jawabKeliru = kn?.jenis === "angka" ? (kn.n % 9) + 1 : kn?.jenis === "nama" ? LC.pilihanKataDari(kn.nama).find((x) => x !== kn.nama) : "x";
        const teksUji = [LC.kalimatKunci(l, s.cara, rupa), LC.kalimatTanya(l, s.cara), LC.petunjukSalah(l, s.cara, jawabKeliru ?? "x", rupa)];
        if (l.tipe === "salah") teksUji.push(LC.petunjukSalah(l, s.cara, l.jawabTokoh ?? "x", rupa));
        if (d.tipe === "batang" && s.cara === "klik") for (let i = 0; i < d.items.length; i += 1) if (i !== LC.nomorBatang(d)) teksUji.push(LC.petunjukKetuk(d, i));
        if (d.tipe === "titik" && s.cara === "klik") for (let i = 0; i < d.pasang.length; i += 1) if (i !== LC.nomorSeimbang(d)) teksUji.push(LC.petunjukKetuk(d, i));
        if (d.tipe === "dasar" && d.mode === "urut" && s.cara === "klik") for (let i = 1; i < d.items.length; i += 1) teksUji.push(LC.petunjukUrut(d, 0, LC.urutBenar(d)[i]));
        cek(teksUji.every((x) => x.length > 10 && tanpaDigit(x) && bersih(x)), `${nm}: kalimat kunci, tanya, dan petunjuk tanpa digit dan kata terlarang`);
        if (kn?.jenis === "nama") {
          const pil = LC.pilihanSuara(l, s.cara);
          cek(pil.includes(kn.nama) && pil.length === 3, `${nm}: pilihan kata memuat kunci`);
        }
        if (kn?.jenis === "angka" && s.cara === "suara") {
          const pil = LC.pilihanSuara(l, s.cara);
          cek(pil.includes(LC.kata(kn.n)) && pil.length === 3 && new Set(pil).size === 3, `${nm}: pilihan bilangan memuat kunci`);
        }
        // Berat: bilangan bulat satu sampai sembilan, tanpa tulisan angka di rupa Concrete (hanya lewat gambar).
        cek(benda(l).every((b) => Number.isInteger(b.w) && b.w >= 1 && b.w <= 16), `${nm}: berat bilangan bulat`);
      }
  }
  // Kunci dihitung dari data, bukan kunci tetap; angka kanvas unik per tahap.
  for (const [nama, [, soal]] of Object.entries(TAHAP)) {
    const angka = soal[1].langkah.map((t) => LC.kunciJawab(t.langkah, "kanvas").n);
    sama(angka, ANGKA_KANVAS[nama], `${nama}: angka jawaban Tulis di kanvas`);
    cek(new Set(angka).size === 4, `${nama}: angka jawaban Tulis di kanvas tidak kembar`);
  }
}

/* ------------------------------ Tugas dihitung dari berat ------------------------------ */
{
  const lang = (soalIdx, metodeIdx, tahap) => TAHAP[tahap][1][soalIdx].langkah[metodeIdx].langkah;
  const kn = (l, cara) => LC.kunciJawab(l, cara);
  // Concrete.
  const c1 = lang(0, 0, "Concrete").dasar;
  sama(kn(c1, "klik"), { jenis: "nama", nama: "lebih ringan" }, "Concrete salah: balon besar lebih ringan daripada batu bata");
  cek(c1.kiri.besar && c1.kiri.w < c1.kanan.w, "Concrete salah: benda besar lebih ringan");
  sama(LC.nomorBatang(lang(0, 1, "Concrete")), 2, "Concrete batang klik: batang piala yang tertinggi");
  sama(LC.nomorSeimbang(lang(0, 2, "Concrete")), 1, "Concrete titik klik: neraca kedua seimbang");
  sama(LC.urutBenar(lang(0, 3, "Concrete")), [2, 0, 1], "Concrete dasar klik: kardus, ransel, sepatu");
  sama(kn(lang(1, 0, "Concrete"), "kanvas"), { jenis: "angka", n: 5 }, "Concrete igil kanvas: lima satuan");
  sama(kn(lang(1, 1, "Concrete"), "kanvas"), { jenis: "angka", n: 7 }, "Concrete batang kanvas: selisih tujuh");
  sama(kn(lang(1, 2, "Concrete"), "kanvas"), { jenis: "angka", n: 2 }, "Concrete titik kanvas: selisih dua");
  sama(kn(lang(1, 3, "Concrete"), "kanvas"), { jenis: "angka", n: 8 }, "Concrete rantai kanvas: dua kali empat");
  sama(kn(lang(2, 0, "Concrete"), "suara"), { jenis: "nama", nama: "sama" }, "Concrete igil suara: sama");
  sama(kn(lang(2, 1, "Concrete"), "suara"), { jenis: "angka", n: 8 }, "Concrete batang suara: delapan");
  sama(kn(lang(2, 2, "Concrete"), "suara"), { jenis: "nama", nama: "atas" }, "Concrete titik suara: piringan kiri di atas");
  sama(kn(lang(2, 3, "Concrete"), "suara"), { jenis: "angka", n: 2 }, "Concrete dasar suara: urutan kedua dari bawah");
  // Pictorial.
  const p1 = lang(0, 0, "Pictorial").dasar;
  sama(kn(p1, "klik"), { jenis: "nama", nama: "lebih ringan" }, "Pictorial salah: sisi kiri naik berarti lebih ringan");
  sama(LC.nomorBatang(lang(0, 1, "Pictorial")), 1, "Pictorial batang klik: batang terpendek");
  sama(LC.nomorSeimbang(lang(0, 2, "Pictorial")), 2, "Pictorial titik klik: neraca ketiga seimbang");
  sama(LC.urutBenar(lang(0, 3, "Pictorial")), [1, 2, 0], "Pictorial dasar klik: B, C, A");
  sama(kn(lang(2, 0, "Pictorial"), "suara"), { jenis: "nama", nama: "berat" }, "Pictorial igil suara: berat");
  sama(kn(lang(2, 1, "Pictorial"), "suara"), { jenis: "angka", n: 9 }, "Pictorial batang suara: sembilan");
  sama(kn(lang(2, 2, "Pictorial"), "suara"), { jenis: "nama", nama: "seimbang" }, "Pictorial titik suara: seimbang");
  sama(kn(lang(2, 3, "Pictorial"), "suara"), { jenis: "angka", n: 3 }, "Pictorial dasar suara: urutan ketiga");
  // Abstract.
  const a1 = lang(0, 0, "Abstract").dasar;
  sama(kn(a1, "klik"), { jenis: "nama", nama: "lebih berat" }, "Abstract salah: tokoh benar, sisi turun lebih berat");
  sama(LC.nomorBatang(lang(0, 1, "Abstract")), 1, "Abstract batang klik: batang ketujuh kotak");
  sama(LC.nomorSeimbang(lang(0, 2, "Abstract")), 2, "Abstract titik klik: neraca ketiga seimbang");
  sama(LC.urutBenar(lang(0, 3, "Abstract")), [2, 3, 0, 1], "Abstract dasar klik: C, D, A, B");
  sama(kn(lang(2, 0, "Abstract"), "suara"), { jenis: "nama", nama: "ringan" }, "Abstract igil suara: ringan");
  sama(kn(lang(2, 1, "Abstract"), "suara"), { jenis: "angka", n: 7 }, "Abstract batang suara: tujuh");
  sama(kn(lang(2, 2, "Abstract"), "suara"), { jenis: "nama", nama: "bawah" }, "Abstract titik suara: bawah");
  sama(kn(lang(2, 3, "Abstract"), "suara"), { jenis: "angka", n: 4 }, "Abstract dasar suara: urutan keempat");
  // Syarat soal: batang tunggal, neraca seimbang tunggal, hasil timbang berpasangan cukup, rantai.
  for (const tahap of Object.keys(TAHAP))
    for (const [si, s] of TAHAP[tahap][1].entries())
      for (const t of s.langkah) {
        const d = LC.dasarDari(t.langkah);
        const nm = `${tahap} ${s.nomor} ${t.metode}`;
        if (d.tipe === "batang") {
          const target = d.cari === "terberat" ? LC.tertinggi(d.items) : LC.terendah(d.items);
          cek(d.items.filter((b) => b.w === target).length === 1 && d.items.length >= 3 && d.items.length <= 4 && LC.tertinggi(d.items) <= 9, `${nm}: batang target tunggal, tiga atau empat batang, tidak lebih dari sembilan kotak`);
          cek(si === 0 ? d.items.length === 4 : true, `${nm}: klik punya empat batang`);
        }
        if (d.tipe === "titik") {
          cek(s.cara === "klik" ? d.pasang.length === 3 && d.pasang.filter(([x, y]) => x.w === y.w).length === 1 : d.pasang.length === 1, `${nm}: klik tiga neraca satu seimbang, selain itu satu neraca`);
          cek(d.pasang.every(([x, y]) => x.w <= 9 && y.w <= 9 && x.w >= 1 && y.w >= 1), `${nm}: titik paling banyak sembilan`);
          if (s.cara === "kanvas") cek(LC.selisihTitik(d) >= 1, `${nm}: selisih titik tidak nol`);
        }
        if (d.tipe === "dasar" && d.mode === "urut") cek(LC.pasanganCukup(d) && d.items.length >= 3 && d.items.length <= 4 && d.tanda >= 0 && d.tanda < d.items.length, `${nm}: hasil timbang berpasangan cukup untuk menentukan urutan`);
        if (d.tipe === "dasar" && d.mode === "rantai") cek(d.r1 >= 2 && d.r2 >= 2 && d.r1 * d.r2 <= 9 && d.a.w === d.b.w * d.r1 && d.b.w === d.c.w * d.r2, `${nm}: rantai dua kali dua sampai sembilan`);
        if (d.tipe === "igil" && d.mode === "satuan") cek(d.benda.w % d.satuan.w === 0 && LC.jumlahSatuan(d) >= 2 && LC.jumlahSatuan(d) <= 9, `${nm}: satuan membagi berat benda`);
      }
  // Cari kesalahan Concrete: benda besar lebih ringan (besar belum tentu berat), Pictorial: sisi naik.
  const salahC = D.CONCRETE[0].langkah[0].langkah;
  cek(salahC.dasar.kiri.besar && /besar/.test(salahC.kataTokoh) && /Besar belum tentu berat/.test(salahC.keliru), "Concrete Cari kesalahan: besar belum tentu berat");
  cek(/naik/.test(D.PICTORIAL[0].langkah[0].langkah.kataTokoh), "Pictorial Cari kesalahan: sisi yang naik");
  cek(D.ABSTRACT[0].langkah[0].langkah.betul === true, "Abstract Cari kesalahan: jawaban tokoh benar");
  // Lintas tahap: dua jenis jawaban suara (kata dan bilangan) di tiap tahap.
  for (const tahap of Object.keys(TAHAP)) {
    const jenis = TAHAP[tahap][1][2].langkah.map((t) => LC.kunciJawab(t.langkah, "suara").jenis);
    cek(jenis.includes("nama") && jenis.includes("angka"), `${tahap}: jawaban suara berupa kata dan bilangan`);
  }
  // Satuan bukan benda yang sama dengan Story dan rupa batas: Concrete memakai benda, lainnya tidak.
  for (const s of D.CONCRETE) for (const t of s.langkah) cek(benda(t.langkah).every((b) => b.o !== undefined && b.o >= 0 && b.o < LC.OBJEK.length), `Concrete ${s.nomor} ${t.metode}: gambar memakai benda`);
  for (const s of [...D.PICTORIAL, ...D.ABSTRACT]) for (const t of s.langkah) cek(benda(t.langkah).every((b) => b.o === undefined && !b.besar), `Pictorial dan Abstract ${s.nomor} ${t.metode}: tanpa benda beremoji`);
}

/* ------------------------------ Data lain ------------------------------ */
{
  cek(D.POIN_PENTING.length >= 5 && D.POIN_PENTING.every((p) => tanpaDigit(p) && bersih(p)) && D.POIN_PENTING_SUARA.every(tanpaDigit), "poin penting tanpa digit dan kata terlarang");
  cek(/Bu Ratna/.test(D.PENUTUP_A) && /\?$/.test(D.PENUTUP_A) && bersih(D.PENUTUP_A) && tanpaDigit(D.PENUTUP_A), "penutup: jembatan ke Sub-Bab B berupa pertanyaan");
  cek(Object.keys(D.TEMA_TIMBANG).join() === "concrete,pictorial,abstract" && Object.values(D.TEMA_TIMBANG).every((t) => emojiSah(t.ikon) && t.nama && t.cara && bersih(t.cara)), "tema tiga tahap");
  cek(D.CONCRETE_TIMBANG === D.CONCRETE && D.PICTORIAL_TIMBANG === D.PICTORIAL && D.ABSTRACT_TIMBANG === D.ABSTRACT && D.MISI_TIMBANG_TEKS === DP.MISI_TIMBANG_TEKS, "nama ekspor untuk pemasang");
  cek(LC.OBJEK.every((o) => emojiSah(o.emoji) && /^#[0-9A-Fa-f]{6}$/.test(o.warna)) && LC.OBJEK.length >= 12, "objek Concrete beremoji sah");
  const semuaObj = LC.OBJEK.map((o) => o.nama).join(" ");
  for (const s of ["kerucut", "kantong", "bola", "raket", "botol", "boneka", "kelereng", "koin", "balok", "pepaya", "mangga", "manggis"]) cek(!semuaObj.includes(s), `benda Concrete bukan data Story (${s})`);
  cek(new Set(LC.OBJEK.map((o) => o.emoji)).size === LC.OBJEK.length, "emoji benda Concrete unik");
}

/* ------------------------------ Berkas ------------------------------ */
{
  const berkas = readdirSync(folderUrl).filter((f) => /\.(ts|tsx)$/.test(f));
  const perlu = ["logika.ts", "logika-cpa.ts", "data.ts", "data-peta.ts", "periksa.ts", "JawabTimbang.tsx", "LangkahTimbang.tsx", "TahapTimbang.tsx", "RakPeralatan.tsx", "PapanLapangan.tsx", "SimulasiPosTimbang.tsx"];
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
  const langkah = ui("LangkahTimbang.tsx");
  cek(/rupa === "benda"/.test(langkah) && /rupa === "lambang"/.test(langkah) && /OBJEK/.test(langkah) && /KartuKata/.test(langkah) && /Neraca/.test(langkah) && /Batang/.test(langkah), "LangkahTimbang: tiga rupa (benda beremoji, balok polos, kartu kata)");
  cek(/BATAS_SALAH|JawabSuaraTimbang/.test(ui("JawabTimbang.tsx")) && /Ini jawaban yang benar/.test(ui("JawabTimbang.tsx")) && /Ini jawaban yang benar/.test(langkah), "pesan Ini jawaban yang benar dipakai");
  const tahap = ui("TahapTimbang.tsx");
  cek(/poinPenting/.test(tahap) && /POIN_PENTING/.test(tahap) && /teksAkhir/.test(tahap) && /umum/.test(tahap) && /rupa/.test(tahap) && /soal/.test(tahap) && /pita/.test(tahap), "TahapTimbang: props umum, rupa, soal, pita, teksAkhir, poinPenting");
  cek(/PetaKartu/.test(ui("RakPeralatan.tsx")) && /onLanjut/.test(ui("RakPeralatan.tsx")) && /teksLanjut/.test(ui("RakPeralatan.tsx")), "RakPeralatan.tsx: kartu geser lewat PetaKartu");
  for (const f of ["PapanLapangan.tsx"]) cek(/useTempel/.test(ui(f)) && /BakiLabel/.test(ui(f)) && /onLanjut/.test(ui(f)) && /teksLanjut/.test(ui(f)), `${f}: tempel label dengan baki`);
  for (const f of ["RakPeralatan.tsx", "PapanLapangan.tsx", "SimulasiPosTimbang.tsx", "LangkahTimbang.tsx", "TahapTimbang.tsx", "JawabTimbang.tsx"]) {
    const s = ui(f);
    const teksLayar = [...s.matchAll(/>\s*([^<>{}\n]{6,})\s*</g)].map((m) => m[1]).concat([...s.matchAll(/"([^"\n]{12,})"/g)].map((m) => m[1]));
    for (const t of teksLayar) if (/[a-z]{3}/.test(t) && !/^[a-z:/.\-_0-9[\]]+$/.test(t) && !/&&|===|=>|\|\|/.test(t)) cek(!TERLARANG.test(t) && !/tebak/i.test(t), `${f}: teks layar tanpa kata terlarang ("${t.slice(0, 40)}")`);
  }
  const sim = ui("SimulasiPosTimbang.tsx");
  cek(/onKeadaan/.test(sim) && /speakGuru/.test(sim), "SimulasiPosTimbang: melapor keadaan dan bersuara");
  cek(/export default function/.test(sim) && /export default function/.test(tahap) && /export default function/.test(ui("RakPeralatan.tsx")) && /export default function/.test(ui("PapanLapangan.tsx")), "ekspor bawaan komponen");
  // Abstract: tanpa emoji benda pada kartu (kartu kata hanya teks dan angka).
  cek(!/KartuKata[^\n]*OBJEK/.test(langkah), "kartu kata tanpa emoji benda");
}

console.log(`Lulus ${lulus}, gagal ${gagal}`);
process.exit(gagal ? 1 : 0);
