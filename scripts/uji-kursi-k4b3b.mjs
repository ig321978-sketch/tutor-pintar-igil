// Uji Mind-map (Barisan Kursi), Infografis (Daftar Kursi), Simulasi Papan Kursi, dan tahap Concrete, Pictorial, Abstract Kelas 4 Bab 3 Sub-Bab B ("Barisan Kursi Pak Gunawan"),
// akhir cerita Orkestra Angklung Kampung Senandung (pola bilangan).
// Memeriksa: logika simulasi (rantai loncat dengan alat menolak jumlah kursi kurang dari nol, mesin aturan, tabel urutan dengan n kurang satu lompatan), misi (awal tidak memenuhi, wajib empat, bebas dua),
// Mind-map (sembilan kartu geser Masalah, Cara, Hasil memuat semua metode Story), Infografis dari kejadian Story, CPA dua belas langkah per tahap (Klik, Kanvas, Suara x empat metode)
// dengan jawaban beragam dan Cari kesalahan di tiap tahap, jawaban benar dihitung dari data, angka jawaban tidak kembar per tahap, tugas yang langsung siap (jebakan tombol macet), pengenal ucapan,
// petunjuk salah tanpa bocoran, gambar baris benda dan titik sebanyak datanya, batas rupa, emoji, kata terlarang, akhir baris.
// Jalankan: node --no-warnings scripts/uji-kursi-k4b3b.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/kursi-k4b3b/logika.ts");
const DS = await import("../src/components/modul/kursi-k4b3b/data-sim.ts");
const DK = await import("../src/components/modul/kursi-k4b3b/data-kartu.ts");
const LC = await import("../src/components/modul/kursi-k4b3b/logika-cpa.ts");
const D = await import("../src/components/modul/kursi-k4b3b/data.ts");
const K = await import("../src/components/modul/kursi-k4b3b/periksa.ts");
const S = await import("../src/components/modul/misi-simulasi.ts");
const MK = await import("../src/components/modul/misi-k4bab3.ts");
const MT = await import("../src/components/modul/misi-teks-k4b3.ts");
const folderUrl = new URL("../src/components/modul/kursi-k4b3b/", import.meta.url);
/** Benda beremoji pada GambarKursi.tsx (kunci EMOJI_BENDA), dibaca dari teks karena berkas tsx tidak bisa diimpor di Node. */
const KUNCI_EMOJI = [];
{
  const gu = readFileSync(new URL("GambarKursi.tsx", folderUrl), "utf8");
  const blok = /export const EMOJI_BENDA[^=]*=\s*\{([\s\S]*?)\n\};/.exec(gu)?.[1] ?? "";
  for (const m of blok.matchAll(/(?:"([^"]+)"|([a-z]+)):\s*"/g)) KUNCI_EMOJI.push(m[1] ?? m[2]);
}

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
const emojiSah = (s) => [...s].every((c) => c.codePointAt(0) <= 0x1fa95 && c.codePointAt(0) !== 0x200d && c.codePointAt(0) !== 0x1f6de && c.codePointAt(0) !== 0x1fa74);
const adaEmoji = (s) => /\p{Extended_Pictographic}/u.test(s);
const MIN = "−";
/** Data Story yang tidak boleh dipakai lagi sebagai suku pertama pola CPA dan simulasi (kursi 12, 15, 18 dan nomor tampil 40, 35, 30), serta beda Story (tambah 3, kurang 5). */
const STORY = new Set([12, 15, 18, 21, 24, 25, 30, 35, 40]);
const bedaStory = (d, arah) => (arah === "naik" && d === 3) || (arah === "turun" && d === 5);
const nilaiAturan = (t) => Number(t.replace(MIN, "-"));

/* ------------------------------ Kata bilangan, aturan, dan pola ------------------------------ */
{
  sama([0, 1, 9, 10, 11, 15, 20, 38, 100, 305].map(LC.kataBil), ["nol", "satu", "sembilan", "sepuluh", "sebelas", "lima belas", "dua puluh", "tiga puluh delapan", "seratus", "tiga ratus lima"], "kata bilangan CPA");
  cek(LC.kata === LC.kataBil, "alias kata");
  for (let n = 1; n <= 150; n += 1) cek(tanpaDigit(LC.kataBil(n)) && LC.kataBil(n) === L.kata(n), `kata bilangan ${n} sama di simulasi dan CPA`);
  sama([LC.ucapkan("2 dan 9"), LC.ucapkan("13"), LC.ucapkan("kurang")], ["dua dan sembilan", "tiga belas", "kurang"], "ucapkan: angka menjadi kata");
  sama([LC.ucapkan("+4"), LC.ucapkan(`${MIN}6`), LC.ucapkan(`aturan +8 dan ${MIN}2.`)], ["tambah empat", "kurang enam", "aturan tambah delapan dan kurang dua."], "ucapkan: tanda tambah dan kurang menjadi kata");
  sama(LC.ucapkan("Pola: 5, 9, 13."), "Pola: lima, sembilan, tiga belas.", "ucapkan: daftar bilangan, tanpa spasi sebelum tanda baca");
  sama([LC.urut(1), LC.urut(2), LC.urut(5), LC.urut(7), LC.urut(10), LC.urut(12)], ["pertama", "kedua", "kelima", "ketujuh", "kesepuluh", "kedua belas"], "urutan dalam kata");
  // Pola: suku ke-n lewat n kurang satu lompatan.
  sama([LC.sukuKe(12, 3, "naik", 1), LC.sukuKe(12, 3, "naik", 5), LC.sukuKe(40, 5, "turun", 4), LC.sukuKe(7, 4, "naik", 6)], [12, 24, 25, 27], "suku ke-n dengan n kurang satu lompatan");
  sama([LC.lompatanKe(1), LC.lompatanKe(5), LC.lompatanKe(10)], [0, 4, 9], "banyak lompatan satu kurang dari nomor urutan");
  sama(LC.polaSuku(5, 4, "naik", 4), [5, 9, 13, 17], "pola suku naik");
  sama(LC.polaSuku(27, 4, "turun", 3), [27, 23, 19], "pola suku turun");
  sama([LC.aturanTeks(4, "naik"), LC.aturanTeks(4, "turun")], ["+4", `${MIN}4`], "aturan tertulis");
  sama([LC.jenisPola("naik"), LC.jenisPola("turun"), LC.operasiDari("naik"), LC.operasiDari("turun")], ["membesar", "mengecil", "tambah", "kurang"], "jenis pola dan operasi menurut beda, bukan menurut besarnya bilangan");
  cek(LC.jenisPola("turun") === "mengecil" && LC.polaSuku(1, 2, "naik", 3).join() === "1,3,5", "pola membesar walau bilangannya kecil, mengecil karena beda kurang");
  sama([LC.hasilMesin(7, 8, "naik", 2), LC.hasilMesin(28, 6, "turun", 2), LC.hasilMesin(9, 2, "turun", 4)], [23, 16, 1], "hasil mesin dipakai berkali-kali");
  sama([LC.susunBaris(23, 10), LC.susunBaris(10, 10), LC.susunBaris(0, 10), LC.susunBaris(50, 16)], [[10, 10, 3], [10], [], [16, 16, 16, 2]], "susun baris");
  for (let n = 0; n <= 80; n += 1) cek(LC.susunBaris(n, 10).reduce((s, x) => s + x, 0) === n && LC.susunBaris(n, 16).every((x) => x >= 1 && x <= 16), `susunBaris ${n}: jumlah sama dengan data`);
}

/* ------------------------------ Simulasi: data dan logika ------------------------------ */
{
  cek(DS.RANTAI_SIM.length === 4 && DS.RANTAI_SIM.map((t) => t.arah).join() === "naik,turun,naik,turun", "simulasi rantai: empat sasaran bergantian membesar dan mengecil");
  cek(DS.RANTAI_SIM.every((t) => !STORY.has(t.a) && !bedaStory(t.d, t.arah) && t.d >= 2 && t.d <= 9 && t.sampai >= 4 && t.sampai <= 8 && LC.polaSuku(t.a, t.d, t.arah, t.sampai).every((x) => x >= 0)), "simulasi rantai: bukan data Story, beda sah, tanpa bilangan negatif");
  cek(DS.MESIN_SIM.length === 4 && DS.MESIN_SIM.map((t) => t.arah).join() === "naik,turun,naik,turun" && DS.MESIN_SIM.every((t) => !STORY.has(t.a) && !bedaStory(t.d, t.arah) && t.d >= 2 && t.d <= 9 && LC.polaSuku(t.a, t.d, t.arah, 3).every((x) => x >= 0)), "simulasi mesin: empat sasaran, bukan data Story, tanpa bilangan negatif");
  cek(DS.TABEL_SIM.length === 2 && DS.TABEL_SIM.every((t) => !STORY.has(t.a) && !bedaStory(t.d, t.arah) && t.n >= 5 && t.n <= 12 && LC.sukuKe(t.a, t.d, t.arah, t.n) >= 0), "simulasi tabel: dua sasaran, bukan data Story, tanpa bilangan negatif");
  cek(DS.TABEL_SIM.every((t) => new Set(t.pil).size === 3 && t.pil.includes(String(LC.sukuKe(t.a, t.d, t.arah, t.n))) && t.pil.filter((p) => Number(p) === LC.sukuKe(t.a, t.d, t.arah, t.n)).length === 1), "simulasi tabel: tiga pilihan unik, tepat satu benar");
  cek(DS.TABEL_SIM.every((t) => t.pil.includes(String(LC.sukuKe(t.a, t.d, t.arah, t.n + 1))) && t.pil.includes(String(LC.sukuKe(t.a, t.d, t.arah, t.n - 1)))), "simulasi tabel: pilihan memuat kesalahan lazim (kelebihan dan kekurangan satu lompatan)");
  cek(new Set(DS.TABEL_SIM.map((t) => t.pil.indexOf(String(LC.sukuKe(t.a, t.d, t.arah, t.n))))).size === 2, "simulasi tabel: posisi pilihan benar bervariasi");
  cek(tanpaDigit(DS.MISI_KURSI_TEKS) && bersih(DS.MISI_KURSI_TEKS) && DS.MISI_KURSI_TEKS === MT.MISI_K4B3.B && D.MISI_KURSI_TEKS === DS.MISI_KURSI_TEKS && DS.MISI_KURSI_TEKS.length >= 10 && DS.MISI_KURSI_TEKS.length <= 120, "simulasi: teks misi tanpa digit dan kata terlarang, sama dengan misi-teks-k4b3");

  const a = L.awalKursi();
  cek(a.alat === "kursi" && a.mode === "rantai" && a.rantai.join() === "6,13,20" && a.beda === 0 && a.mesinOp === null && a.mesinBeda === 0 && a.lompat === 0 && a.tabelPilih === -1 && !a.tolak && ["rantaiBenar", "mesinBenar", "tabelBenar"].every((f) => a[f].length === 0) && a.salah === 0, "simulasi: keadaan awal");
  sama(L.mulaiLagiKursi(), a, "simulasi: mulai lagi kembali ke awal");
  sama(L.pilihModeKursi(a, "tabel").mode, "tabel", "simulasi: ganti alat");
  sama([L.awalRantai(0), L.awalRantai(1), L.awalRantai(4)], [[6, 13, 20], [50, 44, 38], [6, 13, 20]], "rantai: tiga bilangan pertama tiap sasaran");

  // Rantai.
  cek(L.targetRantai(a).sampai === 6 && L.rantaiBenarSekarang(a).join() === "6,13,20,27,34,41", "rantai: sasaran pertama sampai baris keenam");
  const ts = L.loncat(a, "tambah");
  cek(!ts.ok && ts.sebab === "belum" && ts.k === a && !ts.k.tolak && ts.k.salah === 0, "rantai: loncat sebelum beda dipilih ditolak tanpa dihitung keliru atau tolak");
  cek(L.pilihBeda(a, -1) === a && L.pilihBeda(a, 1).beda === 1, "rantai: beda tidak kurang dari nol");
  let b7 = a;
  for (let i = 0; i < 7; i += 1) b7 = L.pilihBeda(b7, 1);
  cek(b7.beda === 7 && L.pilihBeda({ ...b7, beda: 9 }, 1).beda === 9, "rantai: beda sampai sembilan paling banyak");
  cek(/Belum ada loncatan/.test(L.petunjukRantai(a)) && /Pilih bedanya dulu/.test(L.petunjukRantai(a)) && /Belum ada loncatan/.test(L.petunjukRantai(b7)) && /Tekan Loncat/.test(L.petunjukRantai(b7)), "rantai: tanpa loncatan, petunjuk menunjuk langkah yang belum dilakukan");
  cek(!L.periksaRantai(a).ok && L.periksaRantai(a).k.salah === 1, "rantai: tanpa loncatan tidak benar");
  const l1 = L.loncat(b7, "tambah");
  cek(l1.ok && l1.k.rantai.join() === "6,13,20,27", "rantai: loncat tambah menambah bilangan terakhir dengan beda");
  const l1k = L.loncat(b7, "kurang");
  cek(l1k.ok && l1k.k.rantai.join() === "6,13,20,13", "rantai: loncat kurang mengurangi bilangan terakhir dengan beda");
  cek(L.urungkanLoncat(l1.k).rantai.join() === "6,13,20" && L.urungkanLoncat(b7).rantai.length === 3 && L.ulangRantai(l1.k).rantai.join() === "6,13,20" && L.ulangRantai(l1.k).beda === 0, "rantai: urungkan, tiga bilangan pertama tetap, dan ulang");
  cek(/belum sampai baris keenam/.test(L.petunjukRantai(l1.k)) && !L.periksaRantai(l1.k).ok, "rantai: terlalu pendek, petunjuk menyebut baris sasaran");
  let r6 = b7;
  for (let i = 0; i < 3; i += 1) r6 = L.loncat(r6, "tambah").k;
  cek(r6.rantai.join() === "6,13,20,27,34,41", "rantai: tiga loncatan tambah sampai baris keenam");
  const rk = L.periksaRantai(r6);
  cek(rk.ok && rk.k.rantaiBenar.join() === "0" && rk.k.rantaiKe === 1 && rk.k.rantai.join() === "50,44,38" && rk.k.beda === 0, "rantai: rantai benar membuka sasaran pola mengecil");
  sama(S.misiBaru(MK.MISI_B, rk.k, new Set()), ["b-rantai"], "rantai: misi b-rantai");
  const lebihPanjang = L.loncat(r6, "tambah").k;
  cek(/terlalu panjang/.test(L.petunjukRantai(lebihPanjang)) && !L.periksaRantai(lebihPanjang).ok, "rantai: terlalu panjang");
  // Arah loncatan salah dan besar loncatan salah: petunjuk tanpa membocorkan.
  let salahArah = L.loncat(b7, "kurang").k;
  for (let i = 0; i < 2; i += 1) salahArah = L.loncat(salahArah, "tambah").k;
  cek(salahArah.rantai.length === 6 && !L.periksaRantai(salahArah).ok && /Arah loncatan belum cocok/.test(L.petunjukRantai(salahArah)) && tanpaDigit(L.petunjukRantai(salahArah)), "rantai: arah loncatan salah, petunjuk mengarahkan tanpa digit");
  let salahBesar = L.pilihBeda(b7, -1);
  for (let i = 0; i < 3; i += 1) salahBesar = L.loncat(salahBesar, "tambah").k;
  cek(salahBesar.rantai.length === 6 && !L.periksaRantai(salahBesar).ok && /Besar loncatan belum cocok/.test(L.petunjukRantai(salahBesar)) && !/tujuh|empat puluh satu/.test(L.petunjukRantai(salahBesar)), "rantai: besar loncatan salah, petunjuk tanpa membocorkan");
  // Pola mengecil: loncat kurang sampai baris sasaran kedua.
  let t2 = L.pilihBeda({ ...rk.k }, 1);
  for (let i = 0; i < 5; i += 1) t2 = L.pilihBeda(t2, 1);
  for (let i = 0; i < 3; i += 1) t2 = L.loncat(t2, "kurang").k;
  cek(t2.beda === 6 && t2.rantai.join() === "50,44,38,32,26,20" && L.periksaRantai(t2).ok, "rantai: pola mengecil dengan loncat kurang sampai baris keenam");
  const rk2 = L.periksaRantai(t2);
  cek(rk2.k.rantaiBenar.join() === "0,1" && rk2.k.rantaiKe === 2 && rk2.k.rantai.join() === "2,11,20", "rantai: dua sasaran benar, sasaran ketiga membesar lagi");
  sama(S.misiBaru(MK.MISI_B, rk2.k, new Set()), ["b-rantai", "b-turun"], "rantai: misi b-rantai dan b-turun");
  // Alat menolak: jumlah kursi tidak boleh kurang dari nol (hanya loncat kurang yang membuat bilangan negatif).
  const dekatNol = { ...a, rantai: [9, 7, 5], beda: 9 };
  const tolakR = L.loncat(dekatNol, "kurang");
  cek(!tolakR.ok && tolakR.sebab === "nol" && tolakR.k.tolak === true && tolakR.k.rantai.join() === "9,7,5" && tolakR.k.salah === 0, "rantai: alat menolak loncat kurang di bawah nol (bukan percobaan keliru)");
  sama(S.misiBaru(MK.MISI_B, tolakR.k, new Set()), ["b-tolak"], "rantai: misi b-tolak");
  const tepatNol = L.loncat({ ...dekatNol, beda: 5 }, "kurang");
  cek(tepatNol.ok && tepatNol.k.rantai.join() === "9,7,5,0" && !tepatNol.k.tolak, "rantai: tepat nol masih boleh (bendanya habis)");
  cek(!L.loncat({ ...a, beda: 9, rantai: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] }, "tambah").ok && L.loncat({ ...a, beda: 9, rantai: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] }, "tambah").sebab === "penuh", "rantai: rantai terpanjang dua belas bilangan");
  cek(tanpaDigit(L.kalimatRantai(a)) && /Betul/.test(L.kalimatRantai({ ...rk.k })), "rantai: kalimat tanpa digit");

  // Mesin.
  cek(L.targetMesin(a).a === 6 && L.pasanganMesin(a).map((p) => p.join()).join("|") === "6,14|14,22", "mesin: sasaran pertama dua pasangan masuk dan keluar");
  sama(L.pasanganMesin({ ...a, mesinKe: 1 }).map((p) => p.join()), ["45,38", "38,31"], "mesin: sasaran kedua mengecil");
  cek(L.pratinjauMesin(a) === null && L.pratinjauMesin({ ...a, mesinOp: "tambah" }) === null && L.pratinjauMesin({ ...a, mesinOp: "tambah", mesinBeda: 8 }) === 14, "mesin: pratinjau keluar hanya bila aturan lengkap");
  cek(/Belum ada aturan/.test(L.petunjukMesin(a)) && !L.periksaMesin(a).ok && L.periksaMesin(a).k.salah === 1, "mesin: tanpa aturan tidak benar, petunjuk menunjuk langkah yang belum dilakukan");
  const mOp = L.pilihAturan(a, "tambah").k;
  cek(/Besar aturan belum dipilih/.test(L.petunjukMesin(mOp)) && !L.periksaMesin(mOp).ok, "mesin: tambah saja belum cukup");
  const mBeda = L.bedaMesin(a, 1).k;
  cek(/Tambah atau kurang belum dipilih/.test(L.petunjukMesin(mBeda)) && !L.periksaMesin(mBeda).ok, "mesin: besar saja belum cukup");
  cek(L.bedaMesin(a, -1).ok && L.bedaMesin(a, -1).k === a && L.bedaMesin({ ...a, mesinBeda: 9 }, 1).k.mesinBeda === 9, "mesin: besar dibatasi nol sampai sembilan");
  let m8 = mOp;
  for (let i = 0; i < 8; i += 1) m8 = L.bedaMesin(m8, 1).k;
  cek(m8.mesinBeda === 8 && L.pratinjauMesin(m8) === 14, "mesin: tambah delapan, masuk enam keluar empat belas");
  const mKurang = L.pilihAturan(m8, "kurang").k;
  cek(L.pilihAturan(m8, "kurang").ok === false && L.pilihAturan(m8, "kurang").k.tolak === true && mKurang.mesinOp === "tambah", "mesin: aturan kurang delapan pada bilangan masuk enam ditolak alat");
  const kurangDulu = L.pilihAturan(a, "kurang");
  cek(kurangDulu.ok && kurangDulu.k.mesinOp === "kurang", "mesin: memilih kurang saat besar belum dipilih masih boleh");
  let mK = kurangDulu.k;
  for (let i = 0; i < 6; i += 1) mK = L.bedaMesin(mK, 1).k;
  const tolakM = L.bedaMesin(mK, 1);
  cek(mK.mesinBeda === 6 && L.pratinjauMesin(mK) === 0 && !tolakM.ok && tolakM.k.tolak === true && tolakM.k.mesinBeda === 6, "mesin: kurang enam masih boleh (hasil nol), kurang tujuh ditolak alat");
  sama(S.misiBaru(MK.MISI_B, tolakM.k, new Set()), ["b-tolak"], "mesin: misi b-tolak");
  const mSalahOp = L.periksaMesin({ ...m8, mesinOp: "kurang" });
  cek(!mSalahOp.ok && /Tambah atau kurang belum cocok/.test(L.petunjukMesin({ ...m8, mesinOp: "kurang" })), "mesin: tambah atau kurang keliru");
  const mSalahBeda = { ...m8, mesinBeda: 7 };
  cek(!L.periksaMesin(mSalahBeda).ok && /Besar aturan belum cocok/.test(L.petunjukMesin(mSalahBeda)) && tanpaDigit(L.petunjukMesin(mSalahBeda)), "mesin: besar aturan keliru, petunjuk tanpa digit");
  const mb = L.periksaMesin(m8);
  cek(mb.ok && mb.k.mesinBenar.join() === "0" && mb.k.mesinKe === 1 && mb.k.mesinOp === null && mb.k.mesinBeda === 0, "mesin: aturan cocok membuka mesin berikutnya");
  sama(S.misiBaru(MK.MISI_B, mb.k, new Set()), ["b-mesin"], "mesin: misi b-mesin");
  const m2 = L.periksaMesin({ ...mb.k, mesinOp: "kurang", mesinBeda: 7 });
  cek(m2.ok && m2.k.mesinBenar.join() === "0,1" && L.targetMesin(m2.k).a === 3, "mesin: sasaran pola mengecil dengan kurang tujuh");
  for (const p of [L.petunjukMesin(a), L.petunjukMesin(mOp), L.petunjukMesin(mBeda)]) cek(tanpaDigit(p) && p.length > 20, `mesin: petunjuk tanpa digit (${p.slice(0, 30)})`);
  cek(tanpaDigit(L.kalimatMesin(a)) && /Betul/.test(L.kalimatMesin(mb.k)), "mesin: kalimat tanpa digit");

  // Tabel.
  cek(L.targetTabel(a).n === 8 && L.jawabTabel(a) === 34 && L.lompatBenar(a) === 7 && L.kunciTabel(a) === 1, "tabel: urutan kedelapan lewat tujuh lompatan sama dengan tiga puluh empat");
  cek(L.jawabTabel({ ...a, tabelKe: 1 }) === 19 && L.lompatBenar({ ...a, tabelKe: 1 }) === 6 && L.kunciTabel({ ...a, tabelKe: 1 }) === 2, "tabel: sasaran kedua mengecil lewat enam lompatan");
  cek(L.lompatTabel(a, -1) === a && L.lompatTabel(a, 1).lompat === 1 && L.lompatTabel({ ...a, lompat: 12 }, 1).lompat === 12, "tabel: lompatan nol sampai dua belas");
  cek(L.pilihTabel(a, 1).tabelPilih === 1 && L.pilihTabel(a, 5).tabelPilih === -1, "tabel: pilih bilangan, di luar pilihan diabaikan");
  cek(/Belum ada pilihan/.test(L.petunjukTabel(a)) && /Hitung banyak lompatan/.test(L.petunjukTabel(a)) && !L.periksaTabel(a).ok && L.periksaTabel(a).k.salah === 1, "tabel: tanpa pilihan tidak benar, petunjuk menunjuk langkah yang belum dilakukan");
  const pil1 = L.pilihTabel(a, 1);
  cek(/Banyak lompatan belum diatur/.test(L.petunjukTabel(pil1)) && !L.periksaTabel(pil1).ok, "tabel: bilangan saja belum cukup");
  let lp7 = a;
  for (let i = 0; i < 7; i += 1) lp7 = L.lompatTabel(lp7, 1);
  cek(/Bilangannya belum dipilih/.test(L.petunjukTabel(lp7)) && !L.periksaTabel(lp7).ok, "tabel: lompatan saja belum cukup");
  // Kesalahan lazim: delapan lompatan (sama dengan nomor urutan) dengan bilangan yang cocok dengannya.
  let lp8 = lp7;
  lp8 = L.pilihTabel(L.lompatTabel(lp8, 1), 0);
  cek(lp8.lompat === 8 && !L.periksaTabel(lp8).ok && /satu kurang dari nomor urutan/.test(L.petunjukTabel(lp8)) && !/tujuh/.test(L.petunjukTabel(lp8)), "tabel: delapan lompatan (kesalahan satu lebih) ditolak, petunjuk tanpa membocorkan");
  const lpSalah = L.pilihTabel(lp7, 2);
  cek(!L.periksaTabel(lpSalah).ok && /belum cocok dengan lompatannya/.test(L.petunjukTabel(lpSalah)) && tanpaDigit(L.petunjukTabel(lpSalah)), "tabel: lompatan tepat tetapi bilangan keliru");
  const tb = L.periksaTabel(L.pilihTabel(lp7, 1));
  cek(tb.ok && tb.k.tabelBenar.join() === "0" && tb.k.tabelKe === 1 && tb.k.lompat === 0 && tb.k.tabelPilih === -1, "tabel: tujuh lompatan dan bilangan tiga puluh empat membuka tabel berikutnya");
  sama(S.misiBaru(MK.MISI_B, tb.k, new Set()), ["b-tabel"], "tabel: misi b-tabel");
  let lp6 = tb.k;
  for (let i = 0; i < 6; i += 1) lp6 = L.lompatTabel(lp6, 1);
  const tb2 = L.periksaTabel(L.pilihTabel(lp6, 2));
  cek(tb2.ok && tb2.k.tabelBenar.join() === "0,1", "tabel: sasaran kedua enam lompatan dan sembilan belas");
  sama(S.misiBaru(MK.MISI_B, tb2.k, new Set()), ["b-tabel", "b-dua"], "tabel: misi b-tabel dan b-dua");
  for (const p of [L.petunjukTabel(a), L.petunjukTabel(pil1), L.petunjukTabel(lp7), L.petunjukTabel(lp8)]) cek(tanpaDigit(p) && p.length > 20, `tabel: petunjuk tanpa digit (${p.slice(0, 30)})`);
  cek(tanpaDigit(L.kalimatTabel(a)) && /Betul/.test(L.kalimatTabel(tb.k)), "tabel: kalimat tanpa digit");

  // Misi.
  const B = MK.MISI_B;
  cek(MK.daftarMisiK4Bab3("B") === B && B.length === 6 && B.filter((m) => m.wajib).length === 4 && B.filter((m) => !m.wajib).length === 2 && B.every((m) => m.id.startsWith("b-")), "misi B: enam misi, empat wajib, dua bebas, id berawalan b-");
  cek(B.every((m) => tanpaDigit(m.teks) && bersih(m.teks) && m.teks.length > 10 && m.teks.length < 120), "misi B: teks tanpa digit dan kata terlarang");
  sama(S.misiBaru(B, a, new Set()), [], "misi B: keadaan awal tanpa misi baru");
  cek(/kurang dari nol/.test(B.find((m) => m.id === "b-tolak").teks) && /menolak/.test(B.find((m) => m.id === "b-tolak").teks), "misi B: tantangan tolak sesuai perilaku alat (mengurangi sampai kurang dari nol)");
  cek(S.misiBaru(B, { ...a, salah: 9, mode: "tabel", beda: 7, rantai: [6, 13, 20, 27], mesinOp: "tambah", mesinBeda: 8, lompat: 7, tabelPilih: 1 }, new Set()).length === 0, "misi B: beda, rantai, aturan, lompatan, dan pilihan yang belum diperiksa tidak dihitung sebagai misi");
  cek(B.every((m) => !m.cek({ alat: "kerangka" })), "misi B: alat lain tidak memenuhi misi");
  cek(B.every((m) => !m.cek({ alat: "angklung" })), "misi B: keadaan Sub-Bab A tidak memenuhi misi");
}

/* ------------------------------ Mind-map: barisan kursi (sembilan kartu geser) ------------------------------ */
{
  const KA = DK.KARTU_KURSI;
  cek(KA.length === 9, "kartu: sembilan kartu");
  cek(KA.every((k) => k.contoh.length <= 1) && KA[0].contoh.join() === "masalah" && KA.slice(1).every((k) => k.contoh.length === 0), "kartu: satu kotak contoh di kartu pertama saja, sisanya mandiri");
  const semua = KA.flatMap((k) => [k.masalah, k.cara, k.hasil]);
  const label = semua.map((x) => x.label);
  cek(new Set(label).size === label.length, "kartu: label unik");
  cek(semua.every((x) => x.label.length >= 5 && x.label.length <= 36), `kartu: label pendek (terpanjang ${Math.max(...label.map((l) => l.length))} huruf)`);
  cek(label.every((l) => l.split(/\s+/).every((w) => w.length <= 12)), "kartu: tiap kata label paling banyak dua belas huruf (muat di 344 px)");
  cek(KA.every((k) => [k.masalah.label, k.cara.label, k.hasil.label].every((l) => l.split(/\s+/).length <= 6)), "kartu: label paling banyak enam kata");
  cek(semua.every((x) => tanpaDigit(x.label) && tanpaDigit(x.arti) && bersih(x.label) && bersih(x.arti) && x.arti.length > 10), "kartu: label dan arti tanpa digit dan kata terlarang");
  cek(KA.every((k) => tanpaDigit(k.judul) && bersih(k.judul) && k.judul.length > 3), "kartu: judul bersih");
  const cara = KA.map((k) => k.cara.label).join(" | ");
  for (const m of ["Rantai Loncat", "Mesin Aturan", "Tabel Urutan", "Beda tambah", "Beda kurang", "Hitung lompatan"]) cek(cara.toLowerCase().includes(m.toLowerCase()), `kartu: cara memuat ${m}`);
  const gab = KA.map((k) => [k.judul, k.masalah.label, k.cara.label, k.hasil.label, k.masalah.arti, k.cara.arti, k.hasil.arti].join(" ")).join(" ").toLowerCase();
  for (const s of ["beda", "selisih", "membesar", "mengecil", "melanjutkan", "bilangan berikutnya", "lompatan", "nomor urutan", "nol", "rantai loncat", "mesin aturan", "tabel urutan", "tambah", "kurang"]) cek(gab.includes(s), `kartu: memuat poin "${s}"`);
  cek(!new RegExp("\\b(satria|laras|genta|pak hendro|pak gunawan|bu ratri|kursi|angklung|konser|spanduk|panggung)\\b", "i").test(gab), "kartu: hanya poin pelajaran (tanpa tokoh dan benda cerita)");
  cek(tanpaDigit(DK.SUARA_KARTU_KURSI + DK.SELESAI_KARTU_KURSI) && bersih(DK.SUARA_KARTU_KURSI + DK.SELESAI_KARTU_KURSI), "kartu: suara dan pesan selesai tanpa digit dan kata terlarang");
  cek(emojiSah(DK.TEMA_KARTU_KURSI.ikon) && DK.TEMA_KARTU_KURSI.judul.length > 5, "kartu: tema sah");
  const RG = DK.RINGKASAN_KURSI;
  cek(RG.ikon.length === DK.KARTU_KURSI.length && new Set(RG.ikon).size === RG.ikon.length && [...RG.ikon, RG.pusat].every((e) => emojiSah(e) && !/[A-Za-z0-9]/.test(e)), "peta radial: satu gambar unik per kartu, gambar sah tanpa huruf");
  cek(tanpaDigit(RG.suara) && bersih(RG.suara) && !RG.ikon.includes(RG.pusat), "peta radial: suara bersih dan pusat berbeda dari cabang");
  // Ikon bertema konser angklung: not, mikrofon, drum, piano, lonceng, lampu, balon, konfeti. Bukan benda di luar tema.
  const TEMA_OK = new Set([0x1f3bc, 0x1f3b6, 0x1f3b5, 0x1f3a4, 0x1f941, 0x1f3b9, 0x1f514, 0x1f4a1, 0x1f388, 0x1f389]);
  cek([...RG.ikon, RG.pusat].every((e) => TEMA_OK.has(e.codePointAt(0))), "peta radial: semua gambar bertema konser (not, mikrofon, drum, piano, lonceng, lampu, balon, konfeti)");
}

/* ------------------------------ Infografis: daftar kursi (satu tabel lima baris) ------------------------------ */
{
  const B = DK.BARIS_INFO_KURSI;
  cek(B.length === 5 && DK.KOLOM_INFO_KURSI.length === 3, "infografis: lima baris dan tiga kolom");
  cek(B.every((b) => b.isi.length === 3 && emojiSah(b.ikon) && b.nama.length > 4), "infografis: tiap baris tiga isian, emoji sah");
  const jumlahContoh = B.map((b) => b.contoh.length);
  cek(jumlahContoh[0] === 3 && jumlahContoh.slice(1).every((n) => n === 0), "infografis: baris satu penuh contoh, baris dua sampai lima mandiri");
  const semua = B.flatMap((b) => b.isi);
  cek(B.every((b) => new Set(b.isi.map((x) => x.t)).size === 3), "infografis: tiga label tiap baris berbeda");
  cek(new Set(semua.map((x) => x.t)).size === semua.length, "infografis: semua label unik");
  cek(semua.every((x) => x.t.length <= 28 && x.t.split(/\s+/).length <= 5 && x.t.split(/\s+/).every((w) => w.length <= 12) && bersih(x.t) && bersih(x.s ?? "")), "infografis: label pendek (paling banyak lima kata, tiap kata paling banyak dua belas huruf) dan tanpa kata terlarang");
  cek(semua.every((x) => tanpaDigit(x.s ?? x.t)), "infografis: ucapan label tanpa digit");
  cek(B.every((b) => b.nama.split(/\s+/).every((w) => w.length <= 12)), "infografis: nama baris kata pendek");
  const gab = B.map((b) => [b.nama, ...b.isi.map((x) => x.t)].join(" ")).join(" ").toLowerCase();
  for (const s of ["mencari beda", "melanjutkan", "memakai mesin", "urutan jauh", "mengecil", "rantai loncat", "mesin aturan", "tabel urutan", "hitung lompatan", "kurangi beda"]) cek(gab.includes(s), `infografis: memuat "${s}"`);
  cek(!new RegExp("\\b(satria|laras|genta|pak hendro|pak gunawan|bu ratri|konser)\\b", "i").test(gab), "infografis: tanpa nama tokoh");
  cek(tanpaDigit(DK.SUARA_INFO_KURSI + DK.SELESAI_INFO_KURSI) && bersih(DK.SUARA_INFO_KURSI + DK.SELESAI_INFO_KURSI) && emojiSah(DK.TEMA_INFO_KURSI.ikon), "infografis: suara dan tema bersih");
}

/* ------------------------------ Pengenal ucapan ------------------------------ */
{
  const nm = (nama) => ({ jenis: "nama", nama });
  const an = (n) => ({ jenis: "angka", n });
  for (const nama of ["membesar", "mengecil", "beda", "tambah", "kurang"]) cek(K.cocokUcapan(nama, nm(nama)).cocok && K.kataDariUcapan(nama).length === 1, `cocok: kata ${nama} dikenali tepat satu`);
  sama(K.kataDariUcapan("mem besar"), ["membesar"], "ucapan: mem besar dikenali sebagai membesar");
  sama(K.kataDariUcapan("bukan membesar"), [], "ucapan: bukan membesar tidak dihitung");
  sama(K.kataDariUcapan("tidak kurang"), [], "ucapan: tidak kurang tidak dihitung");
  cek(!K.cocokUcapan("mengecil", nm("membesar")).cocok && K.cocokUcapan("pola ini membesar", nm("membesar")).cocok && !K.cocokUcapan("tetap", nm("beda")).cocok && !K.cocokUcapan("kurang", nm("tambah")).cocok, "ucapan: kata lain tidak cocok, kata di dalam kalimat dikenali");
  for (const [teks, n] of [["tujuh", 7], ["sebelas", 11], ["tiga belas", 13], ["dua puluh", 20], ["dua puluh tujuh", 27], ["empat puluh satu", 41], ["tiga puluh sembilan", 39], ["empat", 4], ["27", 27]]) cek(K.cocokUcapan(teks, an(n)).cocok, `ucapan: ${teks} dikenali sebagai ${n}`);
  cek(!K.cocokUcapan("tiga", an(13)).cocok && !K.cocokUcapan("tiga belas", an(3)).cocok && !K.cocokUcapan("tujuh puluh dua", an(27)).cocok, "ucapan: tiga bukan tiga belas, angka terbalik bukan jawaban");
  sama(K.angkaDariUcapan("enam enam tiga lima belas"), [6, 3, 15], "ucapan: angka berurutan dan kembar");
  const mulai = K.cocokUcapan("hmm", nm("membesar"));
  cek(!mulai.cocok && mulai.terdengar.length === 0, "ucapan: tidak terdengar");
}

/* ------------------------------ CPA: tiga tahap, dua belas langkah ------------------------------ */
{
  const TAHAP = { Concrete: ["benda", D.CONCRETE], Pictorial: ["diagram", D.PICTORIAL], Abstract: ["lambang", D.ABSTRACT] };
  const cara3 = ["klik", "kanvas", "suara"];
  const NOMOR = { Concrete: [2, 3, 4], Pictorial: [5, 6, 7], Abstract: [8, 9, 10] };
  const TIPE = { klik: ["beda", "rantai", "mesin", "tabel"], kanvas: ["beda", "rantai", "mesin", "tabel"], suara: ["sebut", "rantai", "mesin", "tabel"] };
  let jumlahSalah = 0;
  const posisiBenar = [];
  for (const [namaT, [rupa, soal]] of Object.entries(TAHAP)) {
    cek(soal.length === 3 && soal.map((s) => s.cara).join() === cara3.join(), `${namaT}: tiga misi Klik, Tulis di kanvas, Rekam suara`);
    sama(soal.map((s) => s.nomor), NOMOR[namaT], `${namaT}: nomor misi berlanjut`);
    cek(soal.every((s) => s.langkah.length === 4 && s.langkah.map((l) => l.metode).join() === "igil,rantai,mesin,tabel"), `${namaT}: empat langkah tiap misi berurut IGIL, Jump Chain, Rule Machine, Position Table`);
    cek(soal.every((s) => tanpaDigit(s.judul.replace(/\d+/g, "")) && bersih(s.judul) && bersih(s.cerita) && tanpaDigit(s.cerita)), `${namaT}: judul dan cerita misi bersih`);
    const salahT = soal.flatMap((s) => s.langkah.filter((l) => l.langkah.tipe === "salah"));
    cek(salahT.length === 1 && soal[0].langkah.includes(salahT[0]), `${namaT}: satu tugas Cari kesalahan pada misi Klik`);
    jumlahSalah += salahT.length;
    const kanvasAngka = [];
    for (const s of soal) {
      for (let i = 0; i < 4; i += 1) {
        const l = s.langkah[i].langkah;
        const dasar = LC.dasarDari(l);
        cek(dasar.tipe === TIPE[s.cara][i], `${namaT} ${s.nomor} langkah ${i + 1}: jenis tugas ${TIPE[s.cara][i]} (${dasar.tipe})`);
      }
      for (const ls of s.langkah) {
        const l = ls.langkah;
        const d = LC.dasarDari(l);
        const kunci = LC.kunciJawab(l, s.cara);
        const tag = `${namaT} ${s.nomor} ${ls.metode}`;
        cek(kunci !== null, `${tag}: jawaban benar ada untuk semua tugas`);
        cek(ls.judul === ls.suara && tanpaDigit(ls.suara) && bersih(ls.suara) && ls.suara.length > 20, `${tag}: instruksi tanpa digit dan kata terlarang`);
        cek(!/\s[.,!?;:]/.test(ls.suara) && /^[A-Z]/.test(ls.suara) && !/[.?!]\s+[a-z]/.test(ls.suara), `${tag}: instruksi berhuruf kapital dan tanpa spasi sebelum tanda baca`);
        cek(LC.siapLangsung(l, rupa, s.cara) === (l.tipe !== "salah"), `${tag}: siap langsung kecuali Cari kesalahan (tombol tidak macet)`);
        for (const r of ["benda", "diagram", "lambang"]) cek(LC.siapLangsung(l, r, s.cara) === LC.siapLangsung(l, rupa, s.cara), `${tag}: siap langsung tidak bergantung rupa (${r})`);
        // Data sah dan bukan data Story.
        const pola = LC.polaSuku(d.a, d.d, d.arah, 12);
        cek(Number.isInteger(d.a) && Number.isInteger(d.d) && d.a >= 1 && d.a <= 80 && d.d >= 2 && d.d <= 9 && !STORY.has(d.a) && !bedaStory(d.d, d.arah), `${tag}: suku pertama dan beda sah, bukan data Story (${d.a}, ${d.d}, ${d.arah})`);
        const dipakai = d.tipe === "tabel" ? d.n : d.tipe === "mesin" ? d.kali + 1 : 4;
        cek(pola.slice(0, dipakai).every((x) => x >= 0), `${tag}: tanpa bilangan negatif`);
        if (d.tipe === "tabel") cek(d.n >= 4 && d.n <= 10 && LC.lompatanKe(d.n) === d.n - 1, `${tag}: urutan keempat sampai kesepuluh (${d.n})`);
        if (d.tipe === "mesin") cek(d.kali >= 2 && d.kali <= 4, `${tag}: mesin dipakai dua sampai empat kali (${d.kali})`);
        if (d.tipe === "sebut") cek(s.cara === "suara" && ["membesar", "mengecil", "beda"].includes(d.kata) && kunci.nama === d.kata && (d.kata === "beda" || LC.jenisPola(d.arah) === d.kata), `${tag}: sebut hanya pada suara, kata ${d.kata} sesuai arah pola`);
        if (kunci?.jenis === "angka") {
          if (s.cara === "kanvas") {
            kanvasAngka.push(kunci.n);
            cek(kunci.n >= 1 && kunci.n <= 9, `${tag}: jawaban kanvas satu angka satu sampai sembilan (${kunci.n})`);
            if (d.tipe === "beda") cek(kunci.n === d.d, `${tag}: kanvas beda`);
            if (d.tipe === "rantai") cek(kunci.n === LC.sukuKe(d.a, d.d, d.arah, 4), `${tag}: kanvas bilangan berikutnya`);
            if (d.tipe === "mesin") cek(kunci.n === LC.hasilMesin(d.a, d.d, d.arah, d.kali), `${tag}: kanvas hasil mesin`);
            if (d.tipe === "tabel") cek(kunci.n === d.n - 1, `${tag}: kanvas banyak lompatan satu kurang dari nomor urutan`);
          }
          if (s.cara === "suara") {
            cek(kunci.n >= 2 && kunci.n <= 99, `${tag}: jawaban suara bilangan pendek (${kunci.n})`);
            if (d.tipe === "rantai") cek(kunci.n === d.a + (d.arah === "naik" ? 3 : -3) * d.d, `${tag}: suara bilangan berikutnya`);
            if (d.tipe === "tabel") cek(kunci.n === LC.sukuKe(d.a, d.d, d.arah, d.n) && kunci.n === d.a + (d.arah === "naik" ? 1 : -1) * d.d * (d.n - 1), `${tag}: suara bilangan pada urutan ke-n lewat n kurang satu lompatan`);
          }
        }
        if (kunci?.jenis === "nama") cek(s.cara !== "kanvas", `${tag}: jawaban nama bukan pada kanvas`);
        if (d.tipe === "mesin" && s.cara === "suara") cek((d.operasi === true) === (kunci.jenis === "nama") && (!d.operasi || kunci.nama === LC.operasiDari(d.arah)), `${tag}: mesin suara menjawab kata aturan bila operasi, bilangan bila tidak`);
        // Pilihan klik: tiga pilihan unik, tepat satu sama besar, jawaban benar tidak di tombol pertama, jawaban tokoh ikut.
        if (s.cara === "klik" && kunci !== null) {
          const pil = LC.pilihanKlik(l);
          const benar = LC.teksKunciKlik(l);
          cek(pil.length === 3 && new Set(pil).size === 3 && pil.includes(benar) && pil[0] !== benar, `${tag}: pilihan klik unik dan jawaban benar bukan yang pertama (${pil.join("/")})`);
          const hasil = d.tipe === "beda" ? (d.arah === "naik" ? d.d : -d.d) : LC.hasilTugas(d);
          cek(pil.filter((t) => nilaiAturan(t) === hasil).length === 1, `${tag}: tepat satu pilihan sama besar dengan jawaban (${pil.join("/")})`);
          if (d.tipe === "beda") cek(pil.every((t) => /^[+−]\d$/.test(t)) && benar === LC.aturanTeks(d.d, d.arah), `${tag}: pilihan aturan (${pil.join("/")})`);
          else cek(pil.every((t) => /^\d+$/.test(t)) && benar === String(LC.hasilTugas(d)), `${tag}: pilihan bilangan (${pil.join("/")})`);
          if (d.tipe === "tabel") cek(pil.includes(String(LC.sukuKe(d.a, d.d, d.arah, d.n + 1))), `${tag}: pilihan memuat kesalahan lazim (satu lompatan terlalu banyak)`);
          if (d.tipe === "rantai") cek(pil.includes(String(LC.sukuKe(d.a, d.d, d.arah, 3))), `${tag}: pilihan memuat bilangan terakhir yang sudah ada`);
          if (d.tipe === "mesin") cek(pil.includes(String(LC.hasilMesin(d.a, d.d, d.arah, d.kali - 1))), `${tag}: pilihan memuat hasil pemakaian yang kurang satu kali`);
          if (l.tipe === "salah") cek(pil.includes(l.jawabTokoh) && (l.betul ? l.jawabTokoh === benar : l.jawabTokoh !== benar), `${tag}: jawaban tokoh ikut sebagai pilihan (${l.jawabTokoh})`);
          posisiBenar.push(pil.indexOf(benar));
        }
        if (s.cara === "suara" && kunci !== null) {
          const pil = LC.pilihanSuara(l, "suara");
          const benar = LC.teksKunciPilihan(kunci);
          cek(pil.includes(benar) && pil.length === 3 && new Set(pil).size === pil.length && tanpaDigit(pil.join(" ")), `${tag}: pilihan cadangan suara memuat jawaban benar (${pil.join("/")})`);
          cek(pil[0] !== benar, `${tag}: jawaban suara bukan pilihan pertama`);
          cek(K.cocokUcapan(benar, kunci).cocok, `${tag}: ucapan jawaban benar dikenali (${benar})`);
          for (const lain of pil.filter((p) => p !== benar)) cek(!K.cocokUcapan(lain, kunci).cocok, `${tag}: ucapan ${lain} bukan jawaban benar`);
        }
        if (kunci) {
          const kk = LC.kalimatKunci(l, s.cara);
          cek(kk.length > 12 && tanpaDigit(kk) && bersih(kk) && /^[A-Z]/.test(kk) && !/\s[.,!?;:]/.test(kk) && !/[.?!]\s+[a-z]/.test(kk), `${tag}: kalimat penjelasan ada, berhuruf kapital, tanpa digit dan spasi sebelum tanda baca`);
          if (rupa === "lambang") cek(!/gambar|petak|kisi|titik|baris benda/i.test(kk), `${tag}: umpan balik Abstract tanpa menyebut gambar, petak, atau kisi`);
        }
        const kt = LC.kalimatTanya(l, s.cara);
        cek(tanpaDigit(kt) && kt.length > 8 && /^[A-Z]/.test(kt) && !/\s[.,!?;:]/.test(kt), `${tag}: pertanyaan tanpa digit`);
        const pet = LC.petunjukSalah(l, s.cara, "x");
        cek(pet.length > 20 && tanpaDigit(pet) && bersih(pet) && /^[A-Z]/.test(pet), `${tag}: petunjuk salah ada, tanpa digit`);
        if (rupa === "lambang") cek(!/gambar|petak|kisi/i.test(pet + LC.kalimatTanya(l, s.cara)), `${tag}: petunjuk dan pertanyaan Abstract tanpa menyebut gambar, petak, atau kisi`);
        if (l.tipe === "salah") {
          cek(l.alasan.length === 3 && new Set(l.alasan).size === 3 && l.benar >= 0 && l.benar <= 2 && l.alasan.every((x) => tanpaDigit(x) && bersih(x) && /^[A-Z]/.test(x) && !/\s[.,!?;:]/.test(x)) && tanpaDigit(l.kataTokoh) && bersih(l.kataTokoh), `${tag}: Cari kesalahan bersih, tiga alasan berbeda berhuruf kapital`);
          cek(["Satria", "Laras", "Genta"].includes(l.tokoh), `${tag}: tokoh Cari kesalahan`);
          const pj = LC.petunjukSalah(l, "klik", l.jawabTokoh);
          cek(pj.includes(`Pikirkan lagi apa yang ${l.tokoh} lakukan`) && !l.alasan.some((a) => pj.includes(a)), `${tag}: petunjuk jawaban tokoh hanya mengarahkan (${pj})`);
          // Alasan dan petunjuk tidak menyebut hasil akhir tugas.
          const hasil = d.tipe === "beda" ? [LC.kataBil(d.d)] : [LC.kataBil(LC.hasilTugas(d))];
          const bocor = hasil.some((h) => new RegExp(`\\b${h}\\b`).test(`${l.alasan[l.benar]} ${pj}`));
          cek(!bocor, `${tag}: alasan benar dan petunjuk tidak menyebut hasil akhir (${hasil.join(" / ")})`);
          posisiBenar.push(`alasan${l.benar}`);
        }
        // Batas rupa: Concrete benda beremoji di dalam EMOJI_BENDA, Pictorial dan Abstract tanpa emoji.
        const teksTugas = [ls.judul, s.judul, s.cerita, ...(l.tipe === "salah" ? [l.kataTokoh, ...l.alasan] : [])].join(" ");
        if (rupa === "benda") cek(KUNCI_EMOJI.includes(d.benda), `${tag}: benda ${d.benda} punya emoji`);
        else {
          cek(!adaEmoji(teksTugas), `${tag}: ${rupa} tanpa emoji pada teks tugas`);
          cek(!/emoji|\p{Extended_Pictographic}/u.test(ls.judul), `${tag}: judul tanpa ikon emoji`);
        }
        if (rupa === "lambang") {
          const bk = LC.barisKartu(d, s.cara);
          cek(Array.isArray(bk) && bk.length >= 3 && bk.every((b) => typeof b === "string" && b.length > 3), `${tag}: kartu kata ada`);
          cek(bk.every((b) => !adaEmoji(b) && bersih(b)), `${tag}: kartu kata tanpa emoji dan kata terlarang`);
          cek(bk[bk.length - 1].endsWith("?"), `${tag}: kartu kata berakhir pada hal yang dicari`);
          cek(!bk.slice(-1)[0].includes(String(LC.hasilTugas(d))) || d.tipe === "beda" || d.tipe === "sebut", `${tag}: kartu kata tidak memuat jawaban pada baris yang dicari`);
        }
        // Gambar sungguh sebanyak data: baris benda dan titik memakai susunBaris dari bilangan pada data.
        for (const n of LC.tigaPertama(d)) cek(LC.susunBaris(n, 10).reduce((x, y) => x + y, 0) === n && LC.susunBaris(n, 16).reduce((x, y) => x + y, 0) === n, `${tag}: baris ${n} digambar sebanyak ${n}`);
      }
    }
    cek(new Set(kanvasAngka).size === kanvasAngka.length && kanvasAngka.length === 4, `${namaT}: empat angka jawaban Tulis di kanvas tidak kembar (${kanvasAngka.join(", ")})`);
  }
  cek(jumlahSalah === 3, "tiap tahap punya satu Cari kesalahan (tiga seluruhnya)");
  cek(new Set(posisiBenar.filter((x) => typeof x === "string")).size >= 2, `Cari kesalahan: alasan benar tidak selalu di tempat yang sama (${posisiBenar.filter((x) => typeof x === "string")})`);
  cek(new Set(posisiBenar.filter((x) => typeof x === "number")).size >= 2 && posisiBenar.filter((x) => x === 0).length === 0, "jawaban klik benar tidak pernah di tombol pertama dan posisinya bervariasi");
  cek(TAHAP.Pictorial[1][0].langkah[2].langkah.betul === true && !TAHAP.Concrete[1][0].langkah[0].langkah.betul && !TAHAP.Abstract[1][0].langkah[3].langkah.betul, "Cari kesalahan: Laras benar pada Pictorial, Satria salah pada Concrete dan Abstract");
  // Kesalahan Satria: beda dari bilangan pertama ke terakhir (dua kali beda) pada Concrete, dan n kali beda (lupa n kurang satu) pada Abstract.
  const sC = TAHAP.Concrete[1][0].langkah[0].langkah;
  cek(sC.jawabTokoh === LC.aturanTeks(2 * sC.dasar.d, sC.dasar.arah) && sC.tokoh === "Satria", "Cari kesalahan Concrete: Satria menghitung beda dari bilangan pertama ke ketiga (dua kali beda)");
  const sA = TAHAP.Abstract[1][0].langkah[3].langkah;
  cek(sA.jawabTokoh === String(LC.sukuKe(sA.dasar.a, sA.dasar.d, sA.dasar.arah, sA.dasar.n + 1)) && sA.tokoh === "Satria", "Cari kesalahan Abstract: Satria menambah beda sebanyak nomor urutan (lupa n kurang satu)");
  const kv = (nama) => TAHAP[nama][1].filter((s) => s.cara === "kanvas").flatMap((s) => s.langkah.map((l) => LC.kunciJawab(l.langkah, "kanvas").n));
  sama(kv("Concrete"), [4, 7, 9, 6], "angka kanvas Concrete");
  sama(kv("Pictorial"), [6, 3, 2, 8], "angka kanvas Pictorial");
  sama(kv("Abstract"), [8, 5, 1, 7], "angka kanvas Abstract");
  // Tugas suara bervariasi: kata dan bilangan.
  const kunciSuara = Object.values(TAHAP).flatMap(([, soal]) => soal[2].langkah.map((l) => LC.kunciJawab(l.langkah, "suara")));
  cek(kunciSuara.some((k) => k.jenis === "nama") && kunciSuara.some((k) => k.jenis === "angka"), "tugas suara: kata dan bilangan");
  const kataSuara = kunciSuara.filter((k) => k.jenis === "nama").map((k) => k.nama);
  for (const w of ["membesar", "mengecil", "beda", "tambah", "kurang"]) cek(kataSuara.includes(w), `tugas suara: kata ${w} muncul`);
  // Jenis jawaban klik beragam: aturan dan bilangan.
  const kunciKlik = Object.values(TAHAP).flatMap(([, soal]) => soal[0].langkah.map((l) => LC.kunciJawab(l.langkah, "klik")));
  cek(kunciKlik.some((k) => k.jenis === "nama" && /^[+−]\d$/.test(k.nama)) && kunciKlik.some((k) => k.jenis === "nama" && /^\d+$/.test(k.nama)), "tugas klik: aturan dan bilangan");
  // Pola membesar dan mengecil sama-sama muncul, jenis ditentukan beda (bukan besar kecilnya bilangan).
  const semuaDasar = Object.values(TAHAP).flatMap(([, soal]) => soal.flatMap((s) => s.langkah.map((l) => LC.dasarDari(l.langkah))));
  cek(semuaDasar.some((d) => d.arah === "naik") && semuaDasar.some((d) => d.arah === "turun"), "pola membesar dan mengecil sama-sama muncul");
  cek(semuaDasar.some((d) => d.arah === "naik" && LC.polaSuku(d.a, d.d, d.arah, 3)[2] < 10) && semuaDasar.some((d) => d.arah === "turun" && d.a > 40), "jenis pola tidak ditentukan besar kecilnya bilangan (naik dengan bilangan kecil, turun dengan bilangan besar)");
  // Poin penting dan penutup.
  cek(D.POIN_PENTING.length >= 6 && D.POIN_PENTING.every((p) => p.length > 20 && bersih(p)) && D.POIN_PENTING_SUARA.every((p) => tanpaDigit(p) && !/[=<>%\/+]/.test(p) && !/\s[.,!?;:]/.test(p)), "poin penting: banyak, bersih, suara tanpa digit dan tanda");
  const poin = D.POIN_PENTING.join(" ").toLowerCase();
  for (const m of ["beda tetap", "selisih", "membesar", "mengecil", "melanjutkan pola", "lompatan", "satu kurang dari nomor urutan", "nol", "rantai loncat", "mesin aturan", "tabel urutan"]) cek(poin.includes(m), `poin penting memuat ${m}`);
  cek(tanpaDigit(D.PENUTUP_B) && bersih(D.PENUTUP_B) && ["Satria", "Laras", "Genta", "Pak Hendro", "Bu Ratri", "Pak Gunawan", "Konser Angklung Kampung Senandung", "bab berikutnya"].every((t) => D.PENUTUP_B.includes(t)), "penutup B: perayaan akhir bab dengan kedua tamu dan semua tokoh, tanpa digit");
  cek(Object.values(D.TEMA_KURSI).every((t) => emojiSah(t.ikon) && t.nama.length >= 7 && t.cara.length > 20 && tanpaDigit(t.cara) && bersih(t.cara)), "tema tiga tahap sah");
  cek(D.TEMA_KURSI.pictorial.cara.includes("polos") && D.TEMA_KURSI.abstract.cara.includes("kartu"), "tema: Pictorial polos, Abstract kartu");
  cek(D.CONCRETE_KURSI === D.CONCRETE && D.PICTORIAL_KURSI === D.PICTORIAL && D.ABSTRACT_KURSI === D.ABSTRACT && D.MISI_KURSI_TEKS === DS.MISI_KURSI_TEKS, "nama ekspor untuk pemasang");
}

/* ------------------------------ Berkas ------------------------------ */
{
  const berkas = readdirSync(folderUrl).filter((f) => /\.(ts|tsx)$/.test(f));
  for (const nama of ["logika.ts", "data-sim.ts", "data-kartu.ts", "logika-cpa.ts", "data.ts", "periksa.ts", "JawabKursi.tsx", "LangkahKursi.tsx", "GambarKursi.tsx", "TahapKursi.tsx", "SimulasiPapanKursi.tsx", "BarisKursi.tsx", "DaftarKursi.tsx"]) cek(berkas.includes(nama), `berkas ${nama} ada`);
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folderUrl), "utf8");
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d || c.codePointAt(0) === 0x1f6de || c.codePointAt(0) === 0x1fa74), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}|\\u\{1FA74\}|\\u\{1F39F\}|\\u\{2602\}|\\u\{1FA9F\}|\\u\{1FAA3\}|\\u\{1FA91\}/i.test(s), `${f}: kode emoji tidak melewati U+1FA95 dan tidak memakai emoji yang tampil kosong`);
    cek(!/senilai|nilai|buku|kelompok|bernilai|tebak/i.test(s), `${f}: tanpa kata senilai, nilai, buku, kelompok, tebak`);
    if (/^(logika|logika-cpa|periksa|data|data-sim|data-kartu)\.ts$/.test(f)) cek(!/from "react"|fetch\(/.test(s), `${f}: tanpa React dan jaringan`);
    cek(!/angklung-k4b3a|SubBabK4B3|lab-pola-bilangan-k4b3b|lab-pola-gambar-k4b3a|SimulasiLabPola|kit-k4b3|infografis-k4b3|skenario-k4b3|mesin-data-k4b3/.test(s), `${f}: tidak memakai folder Sub-Bab lain atau berkas lama`);
  }
  // Teks layar tidak memuat kata terlarang, termasuk nama berkas data.
  const layar = ["LangkahKursi.tsx", "TahapKursi.tsx", "SimulasiPapanKursi.tsx", "GambarKursi.tsx"].map((f) => readFileSync(new URL(f, folderUrl), "utf8")).join("\n");
  const teksLayar = [...layar.matchAll(/>\s*([^<>{}\n]{4,})\s*</g)].map((m) => m[1]).join(" ");
  cek(!/\b(skor|nilai|soal|tebak|kunci|latihan|teman|kelompok|buku|kelas)\b/i.test(teksLayar), "teks layar komponen tanpa kata terlarang");
  cek(/\bTugas\b/.test(layar) && !/>\s*Soal/.test(layar), "teks layar CPA memakai Tugas");
  cek(!/capitalize/.test(layar), "teks layar: tanpa kelas capitalize");
  const th = readFileSync(new URL("TahapKursi.tsx", folderUrl), "utf8");
  cek(/umum: Umum;\s*rupa: Rupa;\s*soal: SoalMisi\[\];\s*pita:/.test(th) && /teksAkhir: string/.test(th) && /poinPenting\?: boolean/.test(th), "TahapKursi: props umum, rupa, soal, pita, teksAkhir, poinPenting");
  cek(/IKON_METODE\[ls\.metode\]/.test(th) && /rupa === "benda" \?/.test(th), "TahapKursi: ikon metode hanya pada rupa benda (Pictorial dan Abstract tanpa emoji metode)");
  cek(/export default function TahapKursi/.test(th) && /Cari kesalahan/.test(th) && /POIN_PENTING/.test(th) && /PENUTUP_B/.test(th), "TahapKursi: ekspor, Cari kesalahan, Poin Penting, perayaan");
  cek(/"lapangan"/.test(th) && /"titik"/.test(th) && /"program"/.test(th) && !/"halaman"|"kisi"|"daftar"|"pantai"|"jadwal"|"lembar"|"klub"|"tabel"|"bambu"|"denah"|"cat"|"kapur"|"tikar"|"peta"|"rak"|"nota"|"tirai"|"jepit"|"bungkus"|"kain"/.test(th), "TahapKursi: pola visual lapangan konser, kertas titik, lembar program (berbeda dari bab lain)");
  cek(/1F4A1/.test(th) && /KONSER ANGKLUNG KAMPUNG SENANDUNG/.test(th) && ["Bu Ratri", "Pak Gunawan", "Pak Hendro", "Satria", "Laras", "Genta"].every((n) => th.includes(`"${n}"`)) && /1F388/.test(th) && /1F389/.test(th) && /DERET_ANGKLUNG/.test(th), "TahapKursi: kemajuan Concrete berupa deret lampu, perayaan dengan spanduk, angklung berderet, lampu, balon, konfeti, kedua tamu dan semua tokoh");
  const lg = readFileSync(new URL("LangkahKursi.tsx", folderUrl), "utf8");
  cek(/export function LangkahKursi/.test(lg) && /JawabSuaraKursi/.test(lg) && /JawabTulis/.test(lg) && /pilihanSuara\(l, cara\)/.test(lg) && /TampilDasar/.test(lg), "LangkahKursi: ekspor, jawab suara dengan pilihan ketuk, jawab tulis di kanvas");
  cek(/ucapkan\(/.test(lg), "LangkahKursi: ucapan memakai kata, bukan digit");
  cek(!/l\.keliru/.test(lg) && (lg.match(/Pikirkan lagi apa yang \$\{l\.tokoh\} lakukan/g) ?? []).length === 2, "LangkahKursi: pesan setelah salah memilih benar-salah atau alasan hanya mengarahkan, tanpa menyebut alasan atau hasil");
  cek(/siap\(`Betul! \$\{l\.alasan\[i\]\}`\)/.test(lg), "LangkahKursi: pembenaran setelah Betul! memakai alasan benar yang diawali huruf kapital");
  const jw = readFileSync(new URL("JawabKursi.tsx", folderUrl), "utf8");
  cek(/gagalSekali/.test(jw) && /Ini jawaban yang benar|jawaban yang benar/.test(jw) && /PilihanKata/.test(jw) && /setCadangan\(true\)/.test(jw) && /e\.error === "not-allowed"/.test(jw), "JawabKursi: galat mikrofon dihitung gagal, pilihan ketuk sebagai cadangan, jawaban benar setelah tiga kali salah");
  const gm = readFileSync(new URL("GambarKursi.tsx", folderUrl), "utf8");
  cek(/export function BarisBenda/.test(gm) && /export function TitikSvg/.test(gm) && /export function RantaiSvg/.test(gm) && /export function MesinSvg/.test(gm) && /export function TabelSvg/.test(gm) && /export function TampilDasar/.test(gm) && /rupa === "lambang"/.test(gm) && /EMOJI_BENDA/.test(gm) && /export function KartuKata/.test(gm), "GambarKursi: baris benda, titik polos, rantai loncat, mesin, tabel urutan, tampilan dasar, kartu untuk Abstract");
  const irisBenda = gm.slice(gm.indexOf("export function BarisBenda"), gm.indexOf("export function TitikSvg"));
  cek(/Array\.from\(\{ length: n \}/.test(irisBenda) && /gridTemplateColumns: `repeat\(\$\{KOLOM_BENDA\}, 18px\)`/.test(irisBenda) && !/flex-wrap/.test(irisBenda), "BarisBenda: kisi tetap tujuh kolom, n benda sungguhan, tidak membungkus sendiri");
  cek(/susunBaris\(n, KOLOM_TITIK\)/.test(gm.slice(gm.indexOf("export function TitikSvg"), gm.indexOf("const WARNA_RUPA"))) && /for \(let i = 0; i < banyak; i \+= 1\)/.test(gm), "TitikSvg: n titik sungguhan dari susunBaris");
  cek(/aturanTeks\(m\.d, m\.arah\)/.test(gm) && /tigaPertama\(d\)/.test(gm), "GambarKursi: aturan mesin dan tiga bilangan pertama dihitung dari data");
  const sim = readFileSync(new URL("SimulasiPapanKursi.tsx", folderUrl), "utf8");
  cek(/export default function SimulasiPapanKursi/.test(sim) && /onKeadaan/.test(sim) && /MISI_KURSI_TEKS/.test(sim), "SimulasiPapanKursi: ekspor, onKeadaan, teks misi");
  cek(/nama: "Rantai"/.test(sim) && /nama: "Mesin"/.test(sim) && /nama: "Tabel"/.test(sim), "SimulasiPapanKursi: tiga alat Rantai, Mesin, Tabel");
  cek(/setCatatan\(ucap \?\? ""\)/.test(sim) && /Alat menolak/.test(sim) && /kurang dari nol/.test(sim) && /loncat\(k, op\)/.test(sim) && /pilihAturan/.test(sim), "SimulasiPapanKursi: pesan lama dikosongkan tiap perubahan, pesan penolakan alat menjelaskan tanpa membocorkan, loncat dan aturan");
  for (const [f, nm] of [["BarisKursi.tsx", "BarisKursiK4B3"], ["DaftarKursi.tsx", "DaftarKursiK4B3"]]) {
    const s = readFileSync(new URL(f, folderUrl), "utf8");
    cek(/speakGuru/.test(s) && /onLanjut/.test(s) && /teksLanjut/.test(s) && /peta-kartu\//.test(s) && new RegExp(`export default function ${nm}`).test(s) && new RegExp(`export \\{ ${nm} \\}`).test(s), `${f}: pembungkus tipis komponen bersama peta-kartu, ekspor ${nm}`);
  }
  // Berkas bersama: Simulasi memasang Papan Kursi dengan misiDaftar.
  const sk = readFileSync(new URL("../src/components/modul/SimulasiK4Bab3.tsx", import.meta.url), "utf8");
  cek(/SimulasiPapanKursi/.test(sk) && /laporMisiKursi\(daftarMisiKursi\("B"\), k, a\.capai\)/.test(sk) && /misiDaftar: daftarMisiKursi\("B"\)/.test(sk) && !/judulBab=\{`Kelas/.test(sk), "SimulasiK4Bab3: langkahPapanKursiB memasang Papan Kursi dengan misiDaftar, judul bab tanpa kata Kelas");
  // Berkas lama yang dipertahankan ada (dipakai bab lain dan bank soal).
  for (const f of ["data-k4b3.ts", "naskah-k4b3.ts", "eja-k4b3.ts", "diagram-k4b3.tsx", "bantu-k4b3.tsx", "model-pola-k4b3.tsx"]) cek(readdirSync(new URL("../src/components/modul/", import.meta.url)).includes(f), `berkas lama ${f} dipertahankan`);
  const ej = readFileSync(new URL("../src/lib/ejaan-inggris-id.ts", import.meta.url), "utf8");
  cek(/jump chain/i.test(ej) && /rule machine/i.test(ej) && /position table/i.test(ej), "ejaan: tiga nama metode global ada");
}

console.log(`Lulus ${lulus}, gagal ${gagal}`);
process.exit(gagal ? 1 : 0);
