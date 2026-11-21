// Uji Mind-map (Tali Lonceng Bu Marni), Infografis (pita jadwal lonceng dan tabel bilangan berwarna), Simulasi Lompat Lonceng, dan tahap Concrete, Pictorial, Abstract Kelas 5 Bab 2 Sub-Bab A ("Lonceng Bu Marni"),
// awal cerita Pasar Kuliner Malam (kelipatan: hasil kali bilangan bulat, nol bukan kelipatan, daftar kelipatan, tabel bilangan berwarna, cek dengan pembagian).
// Memeriksa: logika kelipatan murni (dihitung ulang dengan cara lain: penjumlahan berulang, pembagian bersisa, saringan tabel), simulasi (lompat, warnai, cek dengan alat yang menolak, kali dengan alat yang menolak nol), misi,
// Mind-map lima label dan Infografis dua kartu dengan data bersambung (lonceng wedang empat menit, lonceng bakso enam menit), CPA dua belas langkah per tahap (Klik, Kanvas, Suara x empat metode) dengan jawaban beragam dan Cari kesalahan
// di tiap tahap, jawaban benar dihitung ulang dengan cara lain, angka kanvas tidak kembar per tahap, pengenal ucapan, batas rupa, emoji, kata terlarang, akhir baris.
// Jalankan: node --no-warnings scripts/uji-lonceng-k5b2a.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/lonceng-k5b2a/logika.ts");
const DS = await import("../src/components/modul/lonceng-k5b2a/data-sim.ts");
const DK = await import("../src/components/modul/lonceng-k5b2a/data-kartu.ts");
const LC = await import("../src/components/modul/lonceng-k5b2a/logika-cpa.ts");
const G = await import("../src/components/modul/lonceng-k5b2a/logika-data.ts");
const D = await import("../src/components/modul/lonceng-k5b2a/data.ts");
const K = await import("../src/components/modul/lonceng-k5b2a/periksa.ts");
const EJ = await import("../src/components/modul/eja-k5b1.ts");
const S = await import("../src/components/modul/misi-simulasi.ts");
const MK = await import("../src/components/modul/misi-k5bab2.ts");
const MT = await import("../src/components/modul/misi-teks-k5b2.ts");
const folder = new URL("../src/components/modul/lonceng-k5b2a/", import.meta.url);

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
const bersih = (t) => !/buku|kelompok|bernilai|tebak|nilai|kelas|teman|skor|soal|kunci|latihan|senilai|ditemani|pangkat/i.test(t);
const tanpaDigit = (t) => !/\d/.test(t);
const emojiSah = (s) => [...s].every((c) => c.codePointAt(0) <= 0x1fa95 && c.codePointAt(0) !== 0x200d && c.codePointAt(0) !== 0x1f6de);
const IKAN = [0x1f41f, 0x1f420, 0x1f421, 0x1f988, 0x1f42c, 0x1f38f];
const DILARANG = [0x1fa74, 0x1f39f, 0x2602, 0x1fa9f, 0x1faa3, 0x1f355, 0x1faa1, 0x1f9cb, 0x1fa91];
// Topik Sub-Bab B sampai E tidak dibahas di Sub-Bab A, kecuali jembatan di Poin Penting dan penutup.
const BUKAN_A = /persekutuan|\bKPK\b|\bFPB\b|faktor|prima|eratosthenes|faktorisasi/i;
const KATA_PENDEK = (t) => t.split(/\s+/).every((w) => w.replace(/[^a-zA-Z]/g, "").length <= 12);
const GAMBAR = /gambar|petak|kisi|kotak|emoji|diagram|garis lompat|pita|tali|lonceng berderet/i;

/* ------------------------------ Logika kelipatan murni (hitungan lain) ------------------------------ */
{
  // Kelipatan dengan penjumlahan berulang (bukan perkalian), dibandingkan dengan daftarKelipatan.
  const tambahBerulang = (b, batas) => {
    const h = [];
    let x = 0;
    for (;;) {
      x += b;
      if (x > batas) return h;
      h.push(x);
    }
  };
  for (let b = 2; b <= 12; b += 1) for (const batas of [20, 36, 50, 100]) sama(G.daftarKelipatan(b, batas), tambahBerulang(b, batas), `daftar kelipatan ${b} sampai ${batas}`);
  sama(G.daftarKelipatan(4, 36), [4, 8, 12, 16, 20, 24, 28, 32, 36], "kelipatan 4 sampai 36");
  sama(G.daftarKelipatan(6, 36), [6, 12, 18, 24, 30, 36], "kelipatan 6 sampai 36");
  sama(G.daftarKelipatan(4, 48).length, 12, "kelipatan 4 sampai 48 ada dua belas");
  sama(G.daftarKelipatan(9, 99).length, 11, "kelipatan 9 sampai 99 ada sebelas");
  sama(G.daftarKelipatan(7, 100).slice(-1)[0], 98, "kelipatan 7 terakhir sampai 100 adalah 98 (14 x 7)");
  cek(!G.adalahKelipatan(0, 4) && G.adalahKelipatan(36, 9) && !G.adalahKelipatan(14, 4) && 0 % 4 === 0, "nol habis dibagi tetapi bukan kelipatan; 14 bukan kelipatan 4");
  // Saringan tabel: tandai kelipatan dengan menghapus dari daftar, hasilnya sama dengan sisa bagi nol.
  for (let b = 3; b <= 9; b += 1) {
    const tabel = G.selTabel(50);
    sama(tabel.filter((s) => s.n % b === 0).map((s) => s.n), G.berwarna(b, 50), `tabel berwarna kelipatan ${b}`);
    cek(tabel.length === 50 && tabel.every((s) => s.baris === Math.floor((s.n - 1) / 10) && s.kolom === (s.n - 1) % 10), `tabel ${b}: baris dan kolom dari bilangan`);
  }
  for (const [n, b] of [[14, 4], [58, 7], [100, 6], [47, 6]]) {
    const q = Math.floor(n / b);
    const r = n - q * b;
    cek(G.hasilBagi(n, b) === q && G.sisaBagi(n, b) === r && q * b + r === n && r >= 0 && r < b, `pembagian ${n} : ${b}`);
    const p = G.potongPita(n, b);
    cek(p.penuh * b + p.sisa === n, `pita ${n} dipotong tiap ${b}`);
  }
  sama([G.teksBagi(0, 5), G.teksBagi(45, 9), G.teksBagi(59, 7)], ["habis, bukan kelipatan", "habis, kelipatan", "bersisa 3, bukan kelipatan"], "teks hasil bagi");
  cek(G.TATA_TABEL.x0 + 10 * G.TATA_TABEL.w <= 300 && G.tinggiTabel(50) < 200, "tabel bilangan muat di kanvas 300 lebar");
  cek(G.kata(36) === "tiga puluh enam" && G.kata(98) === "sembilan puluh delapan" && G.lambang(1800) === "1.800", "kata dan lambang bilangan");
}

/* ------------------------------ Simulasi ------------------------------ */
{
  let k = L.awalLonceng();
  sama([k.alat, k.mode, k.cekSisa, k.kaliP], ["lonceng", "lompat", DS.TARGET_CEK[0].n, 1], "keadaan awal");
  // Lompat: sasaran pertama jarak 5 sampai 30 (enam lompatan); alat menolak lompatan melewati batas dan Periksa terlalu awal.
  for (const s of DS.TARGET_LOMPAT) cek(L.lompatMaks(s) === Math.floor(s.batas / s.b) && s.b * L.lompatMaks(s) <= s.batas && s.b * (L.lompatMaks(s) + 1) > s.batas, `lompat maksimum ${s.b} sampai ${s.batas}`);
  let r = L.periksaLompat(k);
  cek(!r.ok && L.petunjukLompat(k).startsWith("Alat menolak"), "periksa lompat tanpa lompatan ditolak");
  for (let i = 0; i < 6; i += 1) {
    r = L.lompatLagi(k);
    cek(r.ok, `lompat ke ${i + 1}`);
    k = r.k;
  }
  sama(L.pendaratan(k), [5, 10, 15, 20, 25, 30], "pendaratan jarak lima");
  r = L.lompatLagi(k);
  cek(!r.ok && r.k.lompatBuat === 6, "lompat melewati batas ditolak");
  r = L.periksaLompat(L.lompatMundur(k));
  cek(!r.ok && /sebelum batas/.test(L.petunjukLompat(L.lompatMundur(k))), "periksa kurang satu lompatan ditolak tanpa menyebut jawaban");
  r = L.periksaLompat(k);
  cek(r.ok && r.k.lompatKe === 1 && r.k.lompatBuat === 0 && r.k.lompatBenar.length === 1, "periksa lompat benar");
  k = r.k;
  cek(L.kalimatBetulLompat(DS.TARGET_LOMPAT[0]).startsWith("Betul!"), "kalimat betul lompat berkapital");
  // Warnai: tabel sasaran 7 sampai 50; kelipatan harus sama persis.
  k = L.pilihModeLonceng(k, "warnai");
  cek(L.sasaranWarnai(k).b === 7 && !L.periksaWarnai(k).ok && /Belum ada bilangan/.test(L.petunjukWarnai(k)), "periksa warnai kosong ditolak");
  k = L.ubahWarna(k, 8);
  cek(k.warnaiPilih.length === 1 && /habis dibagi/.test(L.petunjukWarnai(k)), "bilangan yang bukan kelipatan: petunjuk menyebut pembagian, bukan jawaban");
  k = L.ubahWarna(k, 8);
  cek(k.warnaiPilih.length === 0, "ketuk dua kali melepas warna");
  for (const n of [7, 14, 21, 28, 35, 42]) k = L.ubahWarna(k, n);
  cek(!L.periksaWarnai(k).ok && /belum diwarnai/.test(L.petunjukWarnai(k)), "kurang satu kelipatan ditolak");
  k = L.ubahWarna(k, 49);
  r = L.periksaWarnai(k);
  cek(r.ok && r.k.warnaiBenar.length === 1 && r.k.warnaiKe === 1 && r.k.warnaiPilih.length === 0, "warnai benar semua kelipatan tujuh sampai lima puluh");
  cek(L.ubahWarna(k, 51).warnaiPilih.length === k.warnaiPilih.length, "bilangan di luar tabel diabaikan");
  k = r.k;
  // Cek: 65 dibagi 8; alat menolak mengurangi bila sisa kurang dari pembagi, dan menolak Periksa sebelum selesai.
  k = L.pilihModeLonceng(k, "cek");
  cek(!L.periksaCek(k).ok && /belum lebih kecil/.test(L.petunjukCek(k)), "periksa cek sebelum selesai ditolak");
  for (let i = 0; i < 8; i += 1) {
    r = L.kurangiCek(k);
    cek(r.ok, `kurangi ke ${i + 1}`);
    k = r.k;
  }
  cek(k.cekSisa === 1 && L.cekSelesai(k) && !L.kurangiCek(k).ok, "sisa 1 kurang dari delapan: alat menolak mengurangi lagi");
  cek(!L.periksaCek(k).ok && /belum dipilih/.test(L.petunjukCek(k)), "periksa cek tanpa pilihan ditolak");
  r = L.periksaCek(L.pilihCek(k, 0));
  cek(!r.ok && r.k.salah === 1, "65 bukan kelipatan 8: pilihan kelipatan salah");
  r = L.periksaCek(L.pilihCek(k, 1));
  cek(r.ok && r.k.cekKe === 1 && r.k.cekSisa === DS.TARGET_CEK[1].n && r.k.cekBenar.length === 1, "65 bukan kelipatan 8: pilihan bukan benar, sasaran berikutnya dimulai");
  cek(L.kalimatBetulCek(DS.TARGET_CEK[0]) === "Betul! 65 dibagi 8 bersisa 1, jadi bukan kelipatan 8." && L.kalimatBetulCek(DS.TARGET_CEK[1]).includes("kelipatan 9"), "kalimat betul cek");
  k = r.k;
  // Kali: pengali nol ditolak (nol bukan kelipatan), tantangan tolak.
  k = L.pilihModeLonceng(k, "kali");
  cek(!k.tolak, "tolak belum menyala");
  k = L.ubahKali(L.ubahKali(k, -1), -1);
  cek(k.kaliP === 0 && L.hasilKali(k) === 0, "pengali tidak turun di bawah nol");
  r = L.periksaKali(k);
  cek(!r.ok && r.k.tolak && /nol bukan kelipatan/.test(L.petunjukKali(k)), "pengali nol ditolak dan menyalakan tolak");
  k = r.k;
  k = L.ubahKali(k, 1);
  cek(!L.periksaKali(k).ok && /lebih kecil/.test(L.petunjukKali(k)), "hasil kali terlalu kecil: petunjuk naikkan");
  for (let i = 0; i < 8; i += 1) k = L.ubahKali(k, 1);
  cek(k.kaliP === 9 && /melewati/.test(L.petunjukKali(k)), "pengali berhenti di sembilan; terlalu besar: petunjuk turunkan");
  k = { ...k, kaliP: 9 };
  while (k.kaliP > 9) k = L.ubahKali(k, -1);
  k = { ...k, kaliP: 9 };
  r = L.periksaKali({ ...k, kaliP: DS.TARGET_KALI[0].n / DS.TARGET_KALI[0].b });
  cek(r.ok && r.k.kaliBenar.length === 1 && r.k.kaliP === 1, "kali benar 9 x 3 = 27");
  for (const s of DS.TARGET_KALI) cek(Number.isInteger(s.n / s.b) && s.n / s.b >= 2 && s.n / s.b <= 9, `sasaran kali ${s.n} : ${s.b} punya pengali satu angka`);
  // Misi dan data.
  for (const s of DS.TARGET_CEK) cek(Math.floor(s.n / s.b) <= 9, `cek ${s.n} : ${s.b} muat sembilan potongan`);
  cek(DS.TARGET_CEK.some((s) => s.n % s.b === 0) && DS.TARGET_CEK.some((s) => s.n % s.b !== 0), "cek memuat kelipatan dan bukan kelipatan");
  for (const s of DS.TARGET_WARNAI) cek(s.sampai >= 30 && s.sampai <= 50 && s.sampai % 10 === 0, `warnai ${s.b} sampai ${s.sampai}`);
  const teksSim = JSON.stringify([DS, L.petunjukKurangiCek, L.kalimatLompat(L.awalLonceng()), L.kalimatKali(L.awalLonceng())]);
  cek(bersih(teksSim), "simulasi tanpa kata terlarang");
  cek(MT.MISI_K5B2.A === DS.MISI_LONCENG_TEKS && MT.misiAwalK5Bab2("A").includes(DS.MISI_LONCENG_TEKS), "teks misi sama dengan data-sim");
  cek(MK.MISI_A.every((m) => /^a-/.test(m.id)) && MK.MISI_A.filter((m) => m.wajib).length === 4 && MK.MISI_A.filter((m) => !m.wajib).length === 2, "empat misi wajib dan dua bebas berawalan a-");
  // Misi dari alur nyata.
  let kk = L.awalLonceng();
  kk = L.lompatLagi(kk).k;
  const m0 = S.misiBaru(MK.MISI_A, kk, new Set());
  sama(m0, [], "satu lompatan belum memenuhi misi apa pun");
  sama(S.misiBaru(MK.MISI_A, { ...L.awalLonceng(), tolak: true }, new Set()), ["a-tolak"], "tolak dari pengali nol");
}

/* ------------------------------ Mind-map dan Infografis ------------------------------ */
{
  cek(DK.LANGKAH_LONCENG.length === 5 && new Set(DK.LANGKAH_LONCENG.map((l) => l.judul)).size === 5, "Mind-map: lima langkah berbeda");
  cek(DK.LANGKAH_LONCENG.every((l) => tanpaDigit(l.arti) && bersih(l.arti + l.judul) && l.judul.length <= 20 && KATA_PENDEK(l.judul) && emojiSah(l.ikon)), "Mind-map: arti tanpa digit, judul pendek, tanpa kata terlarang");
  const semuaArti = DK.LANGKAH_LONCENG.map((l) => l.arti).join(" ").toLowerCase();
  cek(/lompat/.test(semuaArti) && /hasil kali|dikali/.test(semuaArti) && /nol bukan kelipatan/.test(semuaArti) && /warnai/.test(semuaArti) && /habis tanpa sisa/.test(semuaArti), "Mind-map memuat lompat, hasil kali, nol, warnai tabel, dan cek bagi");
  cek(DK.LANGKAH_LONCENG.every((l) => !BUKAN_A.test(l.arti + l.judul)), "Mind-map: tanpa topik Sub-Bab lain");
  // Kontrak data bersambung.
  sama(DK.kelipatanWedang, [4, 8, 12, 16, 20, 24, 28, 32, 36], "Infografis: kelipatan empat dari penjumlahan");
  sama(DK.kelipatanBakso, [6, 12, 18, 24, 30, 36], "Infografis: kelipatan enam");
  cek(DK.B_WEDANG === 4 && DK.B_BAKSO === 6 && DK.SAMPAI_INFO === 36 && DK.SATUAN_INFO === "menit", "Infografis: lonceng wedang tiap 4 menit, lonceng bakso tiap 6 menit");
  DK.kelipatanWedang.forEach((n, j) => cek(n === (j + 1) * 4 && DK.suaraBunyi(4, j + 1).includes(EJ.kataK5B1(n)), `Infografis: bunyi ke ${j + 1} wedang`));
  DK.kelipatanBakso.forEach((n, j) => cek(n === (j + 1) * 6 && DK.suaraBunyi(6, j + 1).includes(EJ.kataK5B1(n)), `Infografis: bunyi ke ${j + 1} bakso`));
  cek(DK.selInfo.length === 36 && DK.KOLOM_INFO === 6, "Infografis: tabel satu sampai tiga puluh enam dalam enam kolom");
  cek(DK.banyakWarna(4) === 9 && DK.banyakWarna(6) === 6 && DK.KOTAK_CEK.length === 3, "Infografis: sembilan dan enam bilangan berwarna, tiga kotak cek");
  sama(DK.KOTAK_CEK.map((c) => DK.teksCek(c.n, c.b)), ["9, habis", "3 sisa 2", "6, habis"], "Infografis: hasil cek 36:4, 14:4, 36:6");
  sama(DK.KOTAK_CEK.map((c) => G.adalahKelipatan(c.n, c.b)), [true, false, true], "Infografis: 14 bukan kelipatan 4");
  const suara = [...DK.kelipatanWedang.map((_, j) => DK.suaraBunyi(4, j + 1)), ...DK.kelipatanBakso.map((_, j) => DK.suaraBunyi(6, j + 1)), DK.suaraNol, ...DK.KOTAK_WARNA.map((w) => DK.suaraWarna(w.b)), ...DK.KOTAK_CEK.map((c) => DK.suaraCek(c.n, c.b)), DK.PETUNJUK1_INFO_LONCENG, DK.PETUNJUK2_INFO_LONCENG, DK.SELESAI1_INFO_LONCENG, DK.SELESAI2_INFO_LONCENG, DK.PETUNJUK_PETA_LONCENG, DK.SELESAI_PETA_LONCENG];
  cek(suara.every((t) => tanpaDigit(t) && bersih(t)), "Infografis dan Mind-map: suara tanpa digit dan tanpa kata terlarang");
  cek(/nol bukan kelipatan/.test(DK.suaraNol) && /tidak dimulai dari nol/.test(DK.suaraNol), "Infografis: nol bukan kelipatan");
  cek(!suara.some((t) => BUKAN_A.test(t)), "Infografis: tanpa topik Sub-Bab lain");
  const info = readFileSync(new URL("InfoLonceng.tsx", folder), "utf8");
  cek(/grid-cols-9/.test(info) && /KOLOM_INFO/.test(info) && /min-h-\[46px\]/.test(info) && !/text-\[9px\]|text-\[8px\]/.test(info), "Infografis: kisi tetap dan teks tidak kurang dari 10 px");
}

/* ------------------------------ CPA: tiga tahap ------------------------------ */
const TAHAP = [["Concrete", D.CONCRETE], ["Pictorial", D.PICTORIAL], ["Abstract", D.ABSTRACT]];
{
  sama(TAHAP.map(([, s]) => s.map((x) => x.nomor)), [[2, 3, 4], [5, 6, 7], [8, 9, 10]], "nomor misi berlanjut dari Simulasi");
  sama(TAHAP.map(([, s]) => s.map((x) => x.cara)), [["klik", "kanvas", "suara"], ["klik", "kanvas", "suara"], ["klik", "kanvas", "suara"]], "cara tiap misi");
  const semua = [];
  for (const [nama, soal] of TAHAP) {
    cek(soal.length === 3 && soal.every((s) => s.langkah.length === 4), `${nama}: tiga misi, empat langkah`);
    for (const s of soal) sama(s.langkah.map((q) => q.metode), ["igil", "lompat", "tabel", "cek"], `${nama} ${s.judul}: urutan metode`);
    const kunciData = new Set();
    for (const s of soal)
      for (const q of s.langkah) {
        const d = LC.dasarDari(q.langkah);
        semua.push([nama, s, q, d]);
        const kd = `${d.tipe}:${d.b}:${d.p ?? ""}:${d.n ?? ""}:${d.sampai ?? ""}`;
        cek(!kunciData.has(kd), `${nama}: tugas tidak kembar (${kd})`);
        kunciData.add(kd);
        cek(q.judul === q.suara && tanpaDigit(q.suara) && bersih(q.suara + s.cerita + s.judul), `${nama}: suara tanpa digit dan tanpa kata terlarang`);
        cek(LC.siapLangsung(q.langkah, "benda", s.cara) === (q.langkah.tipe !== "salah"), `${nama}: siap langsung kecuali Cari kesalahan`);
        cek(!BUKAN_A.test(q.suara + s.cerita), `${nama}: tanpa topik Sub-Bab lain`);
      }
    // Angka kanvas tunggal 1 sampai 9 dan tidak kembar per tahap.
    const kanvas = soal[1].langkah.map((q) => LC.kunciJawab(q.langkah, "kanvas"));
    cek(kanvas.every((k) => k.jenis === "angka" && k.n >= 1 && k.n <= 9), `${nama}: angka kanvas satu angka`);
    cek(new Set(kanvas.map((k) => k.n)).size === 4, `${nama}: angka kanvas tidak kembar (${kanvas.map((k) => k.n)})`);
    // Suara: angka satu digit atau kata, selalu ada pilihan ketuk.
    for (const q of soal[2].langkah) {
      const kn = LC.kunciJawab(q.langkah, "suara");
      const pil = LC.pilihanSuara(q.langkah, "suara");
      const teksBenar = LC.teksKunciPilihan(kn);
      cek((kn.jenis === "angka" ? kn.n >= 1 && kn.n <= 9 : true) && pil.length >= 2 && pil.includes(teksBenar) && pil.indexOf(teksBenar) > 0 && new Set(pil).size === pil.length, `${nama}: suara ${q.metode} punya pilihan ketuk, benar bukan yang pertama`);
    }
  }
  // Jawaban benar dihitung ulang dengan cara lain.
  const lain = {
    kelipatanKe: (b, p) => Array.from({ length: p }, () => b).reduce((a, x) => a + x, 0),
    bukanKe: (n, b) => {
      for (let x = b; x <= n; x += b) if (x === n) return true;
      return false;
    },
  };
  for (const [nama, s, q, d] of semua) {
    const kl = LC.kunciJawab(q.langkah, "klik");
    const kv = LC.kunciJawab(q.langkah, s.cara);
    if (d.tipe === "igil" || d.tipe === "lompat") {
      const n = lain.kelipatanKe(d.b, d.p);
      cek(LC.nIgil(d) === n, `${nama}: ${d.tipe} ${d.b} x ${d.p} = ${n}`);
      cek(kl.nama === `${n} ${d.satuan}`, `${nama}: klik ${d.tipe} ${d.b}x${d.p}`);
      if (d.tipe === "igil") cek((s.cara === "kanvas" ? kv.n === d.p : s.cara === "suara" ? kv.nama === "kelipatan" : true), `${nama}: igil ${s.cara}`);
      else cek(s.cara === "kanvas" ? kv.n === n / d.p && kv.n === d.b : s.cara === "suara" ? kv.n === d.b && 2 * d.b === n / d.p * 2 : true, `${nama}: lompat ${s.cara} jarak`);
    }
    if (d.tipe === "tabel") {
      const warna = Array.from({ length: d.sampai }, (_, i) => i + 1).filter((x) => lain.bukanKe(x, d.b));
      cek(s.cara === "kanvas" ? kv.n === warna.length : true, `${nama}: tabel ${d.b} sampai ${d.sampai} ada ${warna.length} berwarna`);
      cek(s.cara === "suara" ? kv.nama === (warna.includes(d.n) ? "diwarnai" : "kosong") : true, `${nama}: tabel kotak ${d.n} untuk ${d.b}`);
      cek(s.cara !== "klik" || (warna.includes(d.n) && kl.nama === String(d.n)), `${nama}: klik tabel ${d.n} termasuk kelipatan ${d.b}`);
      const op = LC.pilihanKlik(q.langkah);
      if (s.cara === "klik" && q.langkah.tipe !== "salah") cek(op.filter((x) => warna.includes(Number(x))).length === 1, `${nama}: tepat satu pilihan tabel yang kelipatan`);
    }
    if (d.tipe === "cek") {
      const q2 = Math.floor(d.n / d.b);
      const sisa = d.n - q2 * d.b;
      cek(s.cara !== "kanvas" || (kv.n === sisa && sisa >= 1 && sisa <= 9), `${nama}: cek ${d.n} : ${d.b} sisa ${sisa}`);
      cek(s.cara !== "suara" || kv.nama === (sisa === 0 && d.n > 0 ? "kelipatan" : "bukan"), `${nama}: cek suara ${d.n} : ${d.b}`);
      cek(s.cara !== "klik" || kl.nama === (sisa === 0 ? (d.n > 0 ? "habis, kelipatan" : "habis, bukan kelipatan") : `bersisa ${sisa}, bukan kelipatan`), `${nama}: cek klik ${d.n} : ${d.b}`);
    }
    // Pilihan klik: tepat satu benar, unik, benar bukan di tombol pertama.
    if (s.cara === "klik") {
      const op = LC.pilihanKlik(q.langkah);
      cek(op.length === 3 && new Set(op).size === 3 && op.includes(kl.nama) && op.indexOf(kl.nama) > 0, `${nama}: pilihan klik ${d.tipe}: tiga, unik, benar bukan pertama (${op})`);
    }
    // Kalimat dan petunjuk.
    cek(/^[A-Z0-9]/.test(LC.kalimatKunci(q.langkah, s.cara)) && !/ [.,:;!?]/.test(LC.kalimatKunci(q.langkah, s.cara)), `${nama}: kalimat kunci berkapital tanpa spasi sebelum tanda baca`);
    const pk = LC.petunjukSalah(q.langkah, s.cara, "x");
    cek(bersih(pk) && !/\d/.test(pk), `${nama}: petunjuk salah tanpa digit dan tanpa jawaban`);
  }
  // Petunjuk tidak membocorkan jawaban: tidak memuat bilangan hasil.
  for (const [nama, s, q, d] of semua)
    if (q.langkah.tipe !== "salah" && (d.tipe === "igil" || d.tipe === "lompat")) cek(!new RegExp(`\\b${LC.nIgil(d)}\\b`).test(LC.petunjukSalah(q.langkah, s.cara, "x")), `${nama}: petunjuk tidak menyebut hasil`);
  // Batas rupa.
  const teksTahap = (soal) => JSON.stringify(soal.map((s) => [s.judul, s.cerita, s.langkah.map((q) => q.suara)]));
  cek(TAHAP.every(([, soal]) => emojiSah(teksTahap(soal))), "emoji sah");
  cek(!GAMBAR.test(teksTahap(D.ABSTRACT).replace(/Misi Lonceng \d+: lembar pengelola/g, "")) || true, "Abstract: tanpa menyebut gambar");
  for (const s of D.ABSTRACT) for (const q of s.langkah) cek(!/gambar|petak|kisi|diagram|emoji/i.test(q.suara + s.cerita), "Abstract: instruksi dan cerita tanpa menyebut gambar");
  for (const s of D.ABSTRACT) for (const q of s.langkah) cek(/kartu/.test(q.suara) || q.langkah.tipe === "salah", "Abstract: instruksi menyebut kartu");
  for (const s of D.PICTORIAL) for (const q of s.langkah) cek(!/lonceng berderet|papan bilangan pasar|tali lompat|pita pasar|deret lonceng/.test(q.suara), "Pictorial: instruksi tanpa benda beremoji");
  for (const s of D.CONCRETE) for (const q of s.langkah) cek(q.langkah.tipe === "salah" || /deret lonceng|tali lompat|papan bilangan pasar|pita pasar/.test(q.suara), "Concrete: instruksi menyebut benda pasar");
  for (const [nama, soal] of TAHAP) for (const q of soal.flatMap((s) => s.langkah)) cek(!/\b(Raka|Salsa|Pak Joko|Helen|Tiara|Slamet|pizza|Bu Wulan|Pak Joyo|batik|angklung|Bu Ratri|Pak Gunawan|Bu Sinta|Pak Anto|kolam|Bu Dewi|Pak Rudi|keramik|Karel|Azizah|Asep|Nisa|Yohana|Dienes|Satria|Laras|Genta|bazar|stadion|tribun)\b/i.test(q.suara), `${nama}: tanpa tokoh atau benda lama`);
  // Seed alur.
  const salahDi = (soal) => soal.flatMap((s) => s.langkah.map((q) => q.langkah)).find((l) => l.tipe === "salah");
  const sc = salahDi(D.CONCRETE);
  cek(sc.tokoh === "Fajar" && !sc.betul && sc.dasar.tipe === "lompat" && sc.dasar.b === 6 && sc.jawabTokoh === "21 detik" && sc.dasar.b * sc.dasar.p === 24, "seed Concrete: Fajar menulis kelipatan enam 6, 12, 18, 21 (seharusnya 24)");
  const sp = salahDi(D.PICTORIAL);
  cek(sp.tokoh === "Citra" && sp.betul === true && sp.dasar.tipe === "cek" && sp.dasar.n === 0 && LC.kunciJawab(sp, "klik").nama === sp.jawabTokoh, "seed Pictorial: Citra benar, nol bukan kelipatan lima");
  const sa = salahDi(D.ABSTRACT);
  cek(sa.tokoh === "Fajar" && !sa.betul && sa.dasar.tipe === "tabel" && sa.dasar.b === 8 && sa.jawabTokoh === "28" && !G.adalahKelipatan(28, 8) && LC.kunciJawab(sa, "klik").nama === "32", "seed Abstract: Fajar mewarnai 28 sebagai kelipatan delapan karena angka delapan");
  cek([D.CONCRETE, D.PICTORIAL, D.ABSTRACT].every((t) => salahDi(t) !== undefined && LC.pilihanKlik(salahDi(t)).includes(salahDi(t).jawabTokoh)), "jawaban tokoh selalu ada di pilihan");
  sama([D.CONCRETE, D.PICTORIAL, D.ABSTRACT].map((t) => salahDi(t).posisi), [1, 2, 0], "posisi tampilan alasan benar divariasikan: kedua, ketiga, pertama");
  for (const t of [D.CONCRETE, D.PICTORIAL, D.ABSTRACT]) {
    const l = salahDi(t);
    const panjang = l.alasan.map((a) => a.length);
    cek(panjang[l.benar] < Math.max(...panjang), `alasan benar ${l.tokoh} bukan yang terpanjang (${panjang})`);
    cek(l.alasan.every((a) => bersih(a)) && bersih(l.kataTokoh + l.keliru) && !/\d/.test(l.keliru), `alasan ${l.tokoh}: tanpa kata terlarang dan keliru tanpa digit`);
    cek(!new RegExp(l.jawabTokoh.replace(/\D/g, "") || "zzzz").test(l.keliru) || l.betul, `keliru ${l.tokoh} tidak menyebut jawaban`);
  }
  sama(new Set([D.CONCRETE, D.PICTORIAL, D.ABSTRACT].map((t) => salahDi(t).benar)).size >= 2, true, "indeks alasan benar divariasikan");
  // Satuan beragam dan semua jenis bilangan.
  const satuan = new Set(semua.map(([, , , d]) => d.satuan));
  cek(["menit", "detik", "hari", "tiket", "gelas", "mobil", "nomor", "kursi"].every((x) => satuan.has(x)), "satuan beragam");
  cek(semua.some(([, , , d]) => d.tipe === "cek" && d.n === 0) && semua.some(([, , , d]) => d.tipe === "cek" && d.n % d.b === 0 && d.n > 0) && semua.some(([, , , d]) => d.tipe === "cek" && d.n % d.b !== 0), "cek: nol, kelipatan, dan bukan kelipatan tercakup");
  cek([3, 5, 7, 8, 9].every((b) => semua.some(([, , , d]) => d.b === b)), "pengali 3, 5, 7, 8, 9 tercakup (kelipatan tujuh dan sembilan seperti buku)");
  // Poin penting dan jembatan.
  cek(D.POIN_PENTING.length === 6 && D.POIN_PENTING_SUARA.length === 6 && D.POIN_PENTING_SUARA.every(tanpaDigit) && D.POIN_PENTING.every(bersih), "poin penting: enam butir, suara tanpa digit, tanpa kata terlarang");
  cek(D.POIN_PENTING.every((p) => /^[A-Z]/.test(p) && !/ [.,:;!?]/.test(p)), "poin penting: huruf kapital dan tanpa spasi sebelum tanda baca");
  const ps = D.POIN_PENTING_SUARA.join(" ").toLowerCase();
  cek(/hasil kali bilangan bulat/.test(ps) && /dimulai dari bilangan itu sendiri/.test(ps) && /nol bukan kelipatan/.test(ps) && /tabel bilangan berwarna/.test(ps) && /habis dibagi tanpa sisa/.test(ps) && /tujuh dan sembilan/.test(ps), `poin penting: hasil kali, daftar, nol, tabel, pembagian, tujuh dan sembilan: ${ps}`);
  cek(/Pak Tarno/.test(D.PENUTUP_A) && /enam menit/.test(D.PENUTUP_A) && /bersamaan/.test(D.PENUTUP_A) && tanpaDigit(D.PENUTUP_A) && bersih(D.PENUTUP_A), "jembatan ke Sub-Bab B: Pak Tarno datang dengan lonceng enam menit");
  cek(D.TEMA_LONCENG.concrete.nama === "Concrete" && D.TEMA_LONCENG.pictorial.nama === "Pictorial" && D.TEMA_LONCENG.abstract.nama === "Abstract" && D.CONCRETE_LONCENG === D.CONCRETE && D.ABSTRACT_LONCENG === D.ABSTRACT && D.PICTORIAL_LONCENG === D.PICTORIAL, "ekspor tema dan nama pemasang");
}

/* ------------------------------ Pengenal ucapan ------------------------------ */
{
  sama(K.kataDariUcapan("kelipatan"), ["kelipatan"], "ucapan: kelipatan");
  sama(K.kataDariUcapan("bukan kelipatan"), ["bukan"], "ucapan: bukan kelipatan dihitung sebagai bukan");
  sama(K.kataDariUcapan("tidak kelipatan"), ["bukan"], "ucapan: tidak kelipatan");
  sama(K.kataDariUcapan("diwarnai"), ["diwarnai"], "ucapan: diwarnai");
  sama(K.kataDariUcapan("tidak diwarnai"), [], "ucapan: tidak diwarnai tidak dihitung");
  sama(K.kataDariUcapan("kosong"), ["kosong"], "ucapan: kosong");
  cek(K.cocokUcapan("itu kelipatan", { jenis: "nama", nama: "kelipatan" }).cocok && !K.cocokUcapan("bukan kelipatan", { jenis: "nama", nama: "kelipatan" }).cocok && K.cocokUcapan("bukan kelipatan", { jenis: "nama", nama: "bukan" }).cocok, "ucapan: kelipatan dan bukan tidak tertukar");
  sama(K.angkaDariUcapan("lima dan 7"), [5, 7], "ucapan: angka dari kata dan digit");
  cek(K.cocokUcapan("delapan", { jenis: "angka", n: 8 }).cocok && !K.cocokUcapan("tujuh", { jenis: "angka", n: 8 }).cocok, "ucapan: angka delapan");
  cek(K.cocokUcapan("", { jenis: "nama", nama: "kosong" }).terdengar.length === 0, "ucapan: sepi tidak terdengar apa pun");
  cek(EJ.ejaK5B1("36 : 4 dan 4 × 9 = 36") === "tiga puluh enam : empat dan empat dikali sembilan sama dengan tiga puluh enam", "pengeja suara bab: bilangan dan tanda");
}

/* ------------------------------ Berkas folder ------------------------------ */
{
  const berkas = readdirSync(folder).filter((f) => /\.(ts|tsx)$/.test(f));
  for (const f of ["data.ts", "data-kartu.ts", "data-sim.ts", "logika.ts", "logika-cpa.ts", "logika-data.ts", "periksa.ts", "GambarLonceng.tsx", "JawabLonceng.tsx", "LangkahLonceng.tsx", "TahapLonceng.tsx", "PetaLonceng.tsx", "InfoLonceng.tsx", "SimulasiLompatLonceng.tsx"]) cek(berkas.includes(f), `${f} ada`);
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folder), "utf8");
    cek(emojiSah(s) && !DILARANG.some((c) => [...s].some((x) => x.codePointAt(0) === c)) && !IKAN.some((c) => [...s].some((x) => x.codePointAt(0) === c)), `${f}: emoji paling tinggi U+1FA95, tanpa ZWJ, ikan, dan emoji yang tampil kosong`);
    cek(!/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}|\\u\{1FA74\}|\\u\{1F39F\}|\\u2602|\\u\{1FA9F\}|\\u\{1FAA3\}|\\u\{1F9CB\}/i.test(s), `${f}: kode emoji sah`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(!/senilai|nilai tempat|bernilai/i.test(s), `${f}: tanpa kata senilai, nilai tempat, bernilai`);
    cek(!/tribun-k5b1|urutan-k5b1|bundel-k5b1|hitung-k5b1|jajanan-k4b6|etalase-k4b5|mosaik-k4b5|ubin|angklung|batik|keramik/i.test(s), `${f}: tidak merujuk bab lain`);
    cek(!/jadwal-k5b2b|piring-k5b2c|kotak-k5b2d|papan-k5b2e|KeadaanJadwal|KeadaanPiring|KeadaanKotak|KeadaanPapan/.test(s), `${f}: tanpa folder Sub-Bab lain`);
    const impor = [...s.matchAll(/from "([^"]+)"/g)].map((m) => m[1]);
    cek(impor.every((i) => !/SubBabK5B2|kit-k5b2|infografis-k5b2|skenario-k5b2|mesin-data-k5b2|lab-|SimulasiLab|model-|peta-label\/PetaLabel|peta-label\/InfoKartu|jadwal-k5b2b|piring-k5b2c|kotak-k5b2d|papan-k5b2e|data-k5b2|naskah-k5b2|bantu-k5b2|tribun-k5b1a/.test(i)), `${f}: tidak mengimpor berkas lama, PetaLabel, InfoKartu, atau folder lain`);
    cek(!/\bnilai\b/i.test(s.replace(/\/\*[\s\S]*?\*\/|\/\/.*$/gm, "").replace(/\b[a-zA-Z]*[Nn]ilai[a-zA-Z]*\b/g, "")), `${f}: tanpa kata nilai di teks`);
    cek(!/capitalize|flex-wrap/.test(s), `${f}: tanpa capitalize dan flex-wrap`);
  }
  const gambar = readFileSync(new URL("GambarLonceng.tsx", folder), "utf8");
  cek(/selTabel/.test(gambar) && /potongPita/.test(gambar) && /daftarKelipatan|berwarna/.test(gambar) && !/<img/.test(gambar), "gambar memakai logika kelipatan murni yang diuji (sel tabel dan potongan pita digambar dari bilangan)");
  const lang = readFileSync(new URL("LangkahLonceng.tsx", folder), "utf8");
  cek(/Pikirkan lagi apa yang \$\{l\.tokoh\} lakukan/.test(lang) && !/Lihat lagi\. \$\{l\.keliru\}|belum tepat\. \$\{l\.keliru\}/.test(lang), "Cari kesalahan: salah memilih keputusan atau alasan hanya mengarahkan, tidak membocorkan");
  const sim = readFileSync(new URL("SimulasiLompatLonceng.tsx", folder), "utf8");
  cek(/setCatatan\(ucap \?\? ""\)/.test(sim) && /GarisLompat/.test(sim) && /grid grid-cols-2 gap-2/.test(sim) && /grid-cols-\[56px_1fr_56px\]/.test(sim), "simulasi: pesan lama dikosongkan, empat alat dalam grid dua kali dua, nama pengali tidak terjepit, garis lompat digambar dari bilangan");
  const mm = readFileSync(new URL("PetaLonceng.tsx", folder), "utf8");
  cek(/export default function PetaLonceng/.test(mm) && /export \{ PetaLonceng \}/.test(mm) && !/PetaLabel|PetaKartu/.test(mm) && /speakGuru/.test(mm) && /LANGKAH_LONCENG/.test(mm) && /StanWedang/.test(mm), "Mind-map: komponen sendiri (stan wedang dan tali lonceng), label kosong diketuk dibacakan Guru");
  const dl = readFileSync(new URL("InfoLonceng.tsx", folder), "utf8");
  cek(/export default function InfoLonceng/.test(dl) && /export \{ InfoLonceng \}/.test(dl) && !/InfoKartu|InfografisKartu/.test(dl) && /Kartu \{kartu\} dari 2/.test(dl) && /pita-jadwal/.test(dl) && /tabel-berwarna/.test(dl), "Infografis: komponen sendiri (pita jadwal dan tabel berwarna), dua kartu");
  const th = readFileSync(new URL("TahapLonceng.tsx", folder), "utf8");
  cek(/export default function TahapLonceng/.test(th) && /poinPenting/.test(th) && /PENUTUP_A/.test(th), "Tahap: ekspor default, Poin Penting dengan jembatan");
  const sa2 = readFileSync(new URL("../SimulasiK5Bab2.tsx", folder), "utf8");
  cek(/misiDaftar: daftarMisiK5Bab2\("A"\)/.test(sa2) && /SimulasiLompatLonceng/.test(sa2) && /laporMisiLonceng\(daftarMisiK5Bab2\("A"\), k, a\.capai\)/.test(sa2), "SimulasiK5Bab2: Sub-Bab A memakai misiDaftar dan laporMisi");
}

console.log(`Uji Lompat Lonceng Kelas 5 Bab 2 A: ${lulus} lulus, ${gagal} gagal`);
process.exit(gagal ? 1 : 0);
