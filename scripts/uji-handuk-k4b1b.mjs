// Uji Mind-map (Gudang Handuk), Infografis (Daftar Handuk), Simulasi Gudang Handuk, dan tahap Concrete, Pictorial, Abstract Kelas 4 Bab 1 Sub-Bab B ("Gudang Handuk Pak Laode"),
// cerita Penginapan Pulau Karang Indah (tempat angka dan banyaknya tiap angka, bilangan sampai 10.000).
// Memeriksa: logika simulasi (isi gudang dengan tukar sepuluh ke satu, bagan tempat, arti angka dengan alat menolak menjawab sebelum Lihat tempat, tukar dua tempat dengan alat menolak memeriksa sebelum menukar),
// misi (awal tidak memenuhi, wajib empat, bebas dua), Mind-map (sembilan kartu geser Masalah, Cara, Hasil memuat semua metode Story), Infografis dari kejadian Story,
// CPA dua belas langkah per tahap (Klik, Kanvas, Suara x empat metode) dengan jawaban beragam dan Cari kesalahan di tiap tahap, jawaban benar dihitung dari data, angka jawaban tidak kembar per tahap,
// tugas yang langsung siap (jebakan tombol macet), tata letak balok sungguh sebanyak datanya, pengenal ucapan, petunjuk salah, batas rupa, emoji, kata terlarang, akhir baris.
// Jalankan: node --no-warnings scripts/uji-handuk-k4b1b.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/handuk-k4b1b/logika.ts");
const DS = await import("../src/components/modul/handuk-k4b1b/data-sim.ts");
const LC = await import("../src/components/modul/handuk-k4b1b/logika-cpa.ts");
const D = await import("../src/components/modul/handuk-k4b1b/data.ts");
const K = await import("../src/components/modul/handuk-k4b1b/periksa.ts");
const TA = await import("../src/components/modul/handuk-k4b1b/tata.ts");
const S = await import("../src/components/modul/misi-simulasi.ts");
const MK = await import("../src/components/modul/misi-k4bab1.ts");
const MT = await import("../src/components/modul/misi-teks-k4b1.ts");
const folderUrl = new URL("../src/components/modul/handuk-k4b1b/", import.meta.url);
/** Benda beremoji pada GambarHanduk.tsx (kunci EMOJI_BENDA), dibaca dari teks karena berkas tsx tidak bisa diimpor di Node. */
const KUNCI_EMOJI = [];
{
  const gu = readFileSync(new URL("GambarHanduk.tsx", folderUrl), "utf8");
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
const emojiSah = (s) => [...s].every((c) => c.codePointAt(0) <= 0x1fa95 && c.codePointAt(0) !== 0x200d && c.codePointAt(0) !== 0x1f6de && c.codePointAt(0) !== 0x1f6df);
const adaEmoji = (s) => /\p{Extended_Pictographic}/u.test(s);
/** Bilangan Story B (jangan dijadikan data Simulasi atau CPA). */
const BIL_CERITA = [2304, 3204, 3124, 4162, 4612, 5072, 4035, 234];
const dgt = (n) => [Math.floor(n / 1000) % 10, Math.floor(n / 100) % 10, Math.floor(n / 10) % 10, n % 10];
const FORMAT_BIL = /^\d{1,3}(\.\d{3})*$/;

/* ------------------------------ Kata bilangan dan tempat angka ------------------------------ */
{
  sama([0, 1, 9, 10, 11, 15, 20, 38, 100, 305, 1000, 2304, 5072, 9999, 10000].map(LC.kataBil), ["nol", "satu", "sembilan", "sepuluh", "sebelas", "lima belas", "dua puluh", "tiga puluh delapan", "seratus", "tiga ratus lima", "seribu", "dua ribu tiga ratus empat", "lima ribu tujuh puluh dua", "sembilan ribu sembilan ratus sembilan puluh sembilan", "sepuluh ribu"], "kata bilangan CPA");
  cek(LC.kata === LC.kataBil, "alias kata");
  for (const n of [0, 7, 43, 100, 365, 1000, 1234, 4070, 5500, 9999]) cek(tanpaDigit(LC.kataBil(n)) && LC.kataBil(n) === L.kata(n), `kata bilangan ${n} sama di simulasi dan CPA`);
  sama([LC.ucapkan("angka 3 di 4.305"), LC.ucapkan("5.080"), LC.ucapkan("garis")], ["angka tiga di empat ribu tiga ratus lima", "lima ribu delapan puluh", "garis"], "ucapkan: angka menjadi kata, titik ribuan dihilangkan");
  sama([0, 5, 999, 1000, 4358, 10000].map(LC.formatBil), ["0", "5", "999", "1.000", "4.358", "10.000"], "format titik ribuan");
  sama([4358, 1000, 7].map((n) => L.formatBilSim(n)), ["4.358", "1.000", "7"], "format titik ribuan simulasi");
  sama([LC.digitDari(4358), LC.digitDari(7), LC.bilDari([6, 0, 3, 5])], [[4, 3, 5, 8], [0, 0, 0, 7], 6035], "empat angka dan bilangan dari angka");
  sama([LC.tukarBil(6147, 1, 3), LC.tukarBil(9350, 0, 1), LC.tukarBil(2304, 0, 1)], [6741, 3950, 3204], "tukar dua tempat");
  sama([LC.banyakNol(7003), LC.banyakNol(9540), LC.banyakNol(3456), LC.tempatNol(6305), LC.tempatNol(1234)], [2, 1, 0, 2, -1], "banyak dan tempat angka nol");
  sama([LC.banyaknya(6318, 1), LC.banyaknya(6318, 0), LC.banyaknya(6318, 3), LC.banyaknya(8052, 2)], [300, 6000, 8, 50], "banyaknya angka: angka dikali tempatnya");
  cek(LC.NAMA_TEMPAT.join() === "ribuan,ratusan,puluhan,satuan" && LC.HARGA_TEMPAT.join() === "1000,100,10,1", "nama dan harga tempat");
}

/* ------------------------------ Tata letak balok ------------------------------ */
{
  for (const rupa of ["benda", "diagram"])
    for (const n of [1000, 2304, 5060, 9999, 4010, 7003, 1111, 8000]) {
      const ikon = TA.susunBalok(n, rupa);
      const d = dgt(n);
      sama(TA.hitungBaris(ikon), d, `balok ${rupa} ${n}: banyak balok tiap baris sama dengan angka tiap tempat`);
      cek(ikon.length === d.reduce((a, b) => a + b, 0), `balok ${rupa} ${n}: jumlah balok`);
      cek(ikon.every((x) => x.x >= TA.MULAI && x.x + x.w <= 298 && x.y >= TA.ATAS && x.y + x.h <= TA.TINGGI_BALOK - 4), `balok ${rupa} ${n}: semua balok di dalam bingkai`);
      cek(new Set(ikon.map((x) => `${x.baris}-${x.i}`)).size === ikon.length && ikon.every((x) => x.baris >= 0 && x.baris <= 3), `balok ${rupa} ${n}: balok tidak kembar`);
      for (let b = 0; b < 4; b += 1) {
        const baris = ikon.filter((x) => x.baris === b).sort((p, q) => p.x - q.x);
        cek(baris.every((x, i) => i === 0 || x.x >= baris[i - 1].x + baris[i - 1].w), `balok ${rupa} ${n} baris ${b}: balok tidak bertumpuk`);
      }
    }
  const ukuran = TA.UKURAN_POLOS;
  cek(ukuran[0][0] >= ukuran[1][0] && ukuran[1][0] >= ukuran[3][0] && ukuran[2][1] < ukuran[1][1], "balok polos: kubus besar, lempeng, batang pipih, kubus kecil");
  sama([TA.tengahKolom(0), TA.tengahKolom(3)], [TA.PX + TA.PK / 2, TA.PX + TA.PK * 3.5], "papan: titik tengah kolom");
}

/* ------------------------------ Simulasi: data dan logika ------------------------------ */
{
  cek(DS.TARGET_ISI.length === 2 && DS.TARGET_ISI.every((n) => n >= 1000 && n <= 9999 && !BIL_CERITA.includes(n)) && DS.TARGET_ISI.some((n) => dgt(n).includes(0)), "simulasi: dua bilangan isi, empat angka, bukan bilangan Story, ada yang bernol");
  cek(DS.TARGET_BAGAN.length === 2 && DS.TARGET_BAGAN.every((t) => t.isi.length === 4 && t.isi.every((x) => x >= 0 && x <= 9) && t.isi[0] >= 1 && !BIL_CERITA.includes(L.bilSim(t.isi))) && DS.TARGET_BAGAN.every((t) => t.isi.includes(0)), "simulasi: dua susunan bagan, angka nol sampai sembilan, tiap susunan punya kolom kosong");
  cek(DS.TARGET_ARTI.length === 4 && DS.TARGET_ARTI.every((t) => dgt(t.n)[t.tanda] > 0 && t.n >= 1000 && !BIL_CERITA.includes(t.n)) && new Set(DS.TARGET_ARTI.map((t) => t.tanda)).size === 4, "simulasi: empat pertanyaan arti, tiap tempat satu kali, angka dilingkari bukan nol");
  cek(DS.TARGET_TUKAR.length === 2 && DS.TARGET_TUKAR.every((t) => t.a !== t.b && dgt(t.n)[t.a] !== dgt(t.n)[t.b] && !BIL_CERITA.includes(t.n)) && new Set(DS.TARGET_TUKAR.map((t) => (L.digitSim(t.n), (() => { const d = dgt(t.n); [d[t.a], d[t.b]] = [d[t.b], d[t.a]]; return d[0] * 1000 + d[1] * 100 + d[2] * 10 + d[3] > t.n; })()))).size === 2, "simulasi: dua sasaran tukar, angka berbeda, satu menjadi lebih dan satu menjadi kurang");
  cek(tanpaDigit(DS.MISI_HANDUK_TEKS) && bersih(DS.MISI_HANDUK_TEKS) && DS.MISI_HANDUK_TEKS === MT.MISI_K4B1.B && D.MISI_HANDUK_TEKS === DS.MISI_HANDUK_TEKS && DS.MISI_HANDUK_TEKS.length >= 10 && DS.MISI_HANDUK_TEKS.length <= 120, "simulasi: teks misi tanpa digit dan kata terlarang, sama dengan misi-teks-k4b1");

  const a = L.awalHanduk();
  cek(a.alat === "handuk" && a.mode === "isi" && a.isi.join() === "0,0,0,0" && a.bagan.join() === "0,0,0,0" && a.tukarPilih.length === 0 && !a.sudahLihat && !a.sudahTukar && !a.tolak && a.artiPilih === -1 && a.bandingPilih === -1 && ["isiBenar", "baganBenar", "artiBenar", "tukarBenar"].every((f) => a[f].length === 0) && a.salah === 0, "simulasi: keadaan awal");
  sama(L.mulaiLagiHanduk(), a, "simulasi: mulai lagi kembali ke awal");
  sama(L.pilihModeHanduk(a, "tukar").mode, "tukar", "simulasi: ganti alat");
  // Isi.
  cek(L.targetIsi(a) === 3427 && L.bilanganIsi(a) === 0, "isi: sasaran pertama 3.427, gudang kosong");
  const t1 = L.tambahIsi(a, 3);
  cek(t1.ok && t1.k.isi.join() === "0,0,0,1" && t1.tukar === -1 && L.bilanganIsi(t1.k) === 1, "isi: tambah satu lembar");
  let k = { ...a, isi: [0, 0, 0, 9] };
  const t10 = L.tambahIsi(k, 3);
  cek(t10.ok && t10.k.isi.join() === "0,0,1,0" && t10.tukar === 2, "isi: sepuluh lembar otomatis menjadi satu ikat");
  const tCascade = L.tambahIsi({ ...a, isi: [0, 9, 9, 9] }, 3);
  cek(tCascade.ok && tCascade.k.isi.join() === "1,0,0,0", "isi: tukar berantai sampai satu peti");
  cek(!L.tambahIsi({ ...a, isi: [9, 0, 0, 0] }, 0).ok && !L.tambahIsi({ ...a, isi: [9, 9, 9, 9] }, 3).ok && !L.tambahIsi(a, 7).ok, "isi: peti paling banyak sembilan, jenis di luar daftar ditolak");
  cek(L.kurangIsi({ ...a, isi: [0, 2, 0, 0] }, 1).k.isi[1] === 1 && !L.kurangIsi(a, 1).ok && !L.kurangIsi(a, 9).ok, "isi: kurang satu balok, tidak bisa di bawah nol");
  cek(/Gudang masih kosong/.test(L.petunjukIsi(a)) && /sesuai angka pada tiap tempat/.test(L.petunjukIsi(a)) && !L.periksaIsi(a).ok && L.periksaIsi(a).k.salah === 1, "isi: gudang kosong, petunjuk menunjuk langkah yang belum dilakukan");
  const isiSalah = { ...a, isi: [3, 4, 3, 7] };
  cek(/Banyak ikat belum sama dengan angka pada tempat puluhan/.test(L.petunjukIsi(isiSalah)) && tanpaDigit(L.petunjukIsi(isiSalah)) && !L.periksaIsi(isiSalah).ok, "isi: petunjuk menunjuk jenis yang keliru tanpa membocorkan angka");
  const bI = L.periksaIsi({ ...a, isi: [3, 4, 2, 7] });
  cek(bI.ok && bI.k.isiBenar.join() === "0" && bI.k.isiKe === 1 && bI.k.isi.join() === "0,0,0,0" && L.targetIsi(bI.k) === 5060, "isi: bilangan tepat membuka bilangan berikutnya");
  sama(S.misiBaru(MK.MISI_B, bI.k, new Set()), ["b-isi"], "isi: misi b-isi");
  // Isi lewat tukar otomatis menghasilkan bilangan yang sama: 2 puluh 7 lembar dengan menekan lembar 27 kali.
  let ke = { ...a, isi: [3, 4, 0, 0] };
  for (let i = 0; i < 27; i += 1) ke = L.tambahIsi(ke, 3).k;
  cek(ke.isi.join() === "3,4,2,7" && L.periksaIsi(ke).ok, "isi: dua puluh tujuh ketukan lembar menjadi dua ikat dan tujuh lembar");
  cek(tanpaDigit(L.kalimatIsi(a)) && tanpaDigit(L.kalimatIsi(bI.k)) && L.kosongkanIsi({ ...a, isi: [1, 2, 3, 4] }).isi.join() === "0,0,0,0", "isi: kalimat tanpa digit, kosongkan");
  // Bagan.
  cek(L.targetBagan(a).join() === "6,0,3,5" && L.bilanganBagan({ ...a, bagan: [6, 0, 3, 5] }) === 6035, "bagan: susunan pertama 6, 0, 3, 5");
  cek(L.ubahBagan(a, 0, 1).ok && L.ubahBagan(a, 0, 1).k.bagan[0] === 1 && !L.ubahBagan(a, 0, -1).ok && !L.ubahBagan({ ...a, bagan: [9, 0, 0, 0] }, 0, 1).ok && !L.ubahBagan(a, 5, 1).ok, "bagan: angka antara nol dan sembilan, kolom di luar bagan ditolak");
  cek(/Bagan masih kosong/.test(L.petunjukBagan(a)) && /Hitung balok pada tiap baris/.test(L.petunjukBagan(a)) && !L.periksaBagan(a).ok && L.periksaBagan(a).k.salah === 1, "bagan: bagan kosong, petunjuk menunjuk langkah yang belum dilakukan");
  const baganSalah = { ...a, bagan: [6, 1, 3, 5] };
  cek(/Baris kotak tidak punya balok, jadi kolom ratusan harus diisi nol/.test(L.petunjukBagan(baganSalah)) && tanpaDigit(L.petunjukBagan(baganSalah)), "bagan: kolom kosong harus nol, tanpa membocorkan angka");
  cek(/Kolom satuan belum sama dengan banyak balok pada baris lembar/.test(L.petunjukBagan({ ...a, bagan: [6, 0, 3, 4] })), "bagan: petunjuk menunjuk kolom yang keliru");
  const bB = L.periksaBagan({ ...a, bagan: [6, 0, 3, 5] });
  cek(bB.ok && bB.k.baganBenar.join() === "0" && bB.k.baganKe === 1 && bB.k.bagan.join() === "0,0,0,0" && L.targetBagan(bB.k).join() === "4,8,0,1", "bagan: susunan tepat membuka susunan berikutnya");
  sama(S.misiBaru(MK.MISI_B, bB.k, new Set()), ["b-bagan"], "bagan: misi b-bagan");
  cek(tanpaDigit(L.kalimatBagan(a)) && tanpaDigit(L.kalimatBagan(bB.k)), "bagan: kalimat tanpa digit");
  // Arti.
  cek(L.targetArti(a).n === 6318 && L.jawabanArti(a) === 300 && L.pertanyaanArti(a) === "Angka yang dilingkari pada tempat ratusan berarti berapa?", "arti: pertanyaan pertama, jawabannya tiga ratus");
  sama([0, 1, 2, 3].map((i) => L.jawabanArti({ ...a, artiKe: i })), [300, 50, 4000, 4], "arti: jawaban empat pertanyaan (angka dikali tempatnya)");
  for (let i = 0; i < 4; i += 1) {
    const p = L.pilihanArti({ ...a, artiKe: i });
    const benar = L.jawabanArti({ ...a, artiKe: i });
    cek(p.length === 3 && new Set(p).size === 3 && p.includes(benar) && p[0] !== benar, `arti: pilihan pertanyaan ${i} unik, benar bukan yang pertama (${p})`);
    cek(p.includes(dgt(L.targetArti({ ...a, artiKe: i }).n)[L.targetArti({ ...a, artiKe: i }).tanda]), `arti: pengecoh memuat angkanya saja (${p})`);
  }
  const tolakA = L.periksaArti(a);
  cek(!tolakA.ok && tolakA.k.tolak === true && tolakA.k.salah === 0 && !tolakA.k.sudahLihat, "arti: alat menolak menjawab sebelum Lihat tempat (bukan percobaan keliru)");
  sama(S.misiBaru(MK.MISI_B, tolakA.k, new Set()), ["b-tolak"], "arti: misi b-tolak");
  cek(/Tekan Lihat tempat dulu/.test(L.petunjukArti(a)) && tanpaDigit(L.petunjukArti(a)) && L.pilihArti(a, 0).artiPilih === -1, "arti: petunjuk menunjuk langkah yang belum dilakukan, memilih sebelum melihat diabaikan");
  const sudah = L.lihatTempat(a);
  cek(sudah.sudahLihat && /Pilih satu jawaban/.test(L.petunjukArti(sudah)) && !L.periksaArti(sudah).ok && L.periksaArti(sudah).k.salah === 1 && !L.periksaArti(sudah).k.tolak, "arti: sudah melihat tanpa pilihan tidak benar");
  const pil = L.pilihanArti(sudah);
  const salahA = L.periksaArti(L.pilihArti(sudah, pil.findIndex((x) => x !== 300)));
  cek(!salahA.ok && salahA.k.salah === 1 && salahA.k.artiBenar.length === 0 && /angka dikali tempatnya/.test(L.petunjukArti(L.pilihArti(sudah, 0))), "arti: jawaban keliru");
  const betulA = L.periksaArti(L.pilihArti(sudah, pil.indexOf(300)));
  cek(betulA.ok && betulA.k.artiBenar.join() === "0" && betulA.k.artiKe === 1 && !betulA.k.sudahLihat && betulA.k.artiPilih === -1 && L.targetArti(betulA.k).n === 8052, "arti: jawaban tepat membuka pertanyaan berikutnya");
  sama(S.misiBaru(MK.MISI_B, betulA.k, new Set()), ["b-arti"], "arti: misi b-arti");
  cek(L.pilihArti(sudah, 9).artiPilih === -1 && tanpaDigit(L.kalimatArti(a)) && tanpaDigit(L.kalimatArti(betulA.k)) && tanpaDigit(L.pertanyaanArti(a)), "arti: pilihan di luar daftar diabaikan, kalimat tanpa digit");
  let semua = a;
  for (let i = 0; i < 4; i += 1) {
    semua = L.lihatTempat(semua);
    semua = L.periksaArti(L.pilihArti(semua, L.pilihanArti(semua).indexOf(L.jawabanArti(semua)))).k;
  }
  cek(semua.artiBenar.join() === "0,1,2,3", "arti: empat pertanyaan terjawab");
  sama(S.misiBaru(MK.MISI_B, semua, new Set()), ["b-arti", "b-semua"], "arti: misi b-arti dan b-semua");
  // Tukar.
  cek(L.targetTukar(a).n === 7240 && L.bilanganTukar(a) === 7240 && L.jawabanBanding(a) === "kurang" && L.jawabanBanding({ ...a, tukarKe: 1 }) === "lebih", "tukar: sasaran pertama kurang, kedua lebih");
  cek(L.pilihTempatTukar(a, 0).k.tukarPilih.join() === "0" && L.pilihTempatTukar(L.pilihTempatTukar(a, 0).k, 0).k.tukarPilih.length === 0 && !L.pilihTempatTukar({ ...a, tukarPilih: [0, 1] }, 2).ok && !L.pilihTempatTukar(a, 9).ok && !L.pilihTempatTukar({ ...a, sudahTukar: true, tukarPilih: [0, 1] }, 2).ok, "tukar: pilih paling banyak dua tempat, ketuk lagi membatalkan, tidak berubah setelah menukar");
  cek(!L.tukarTempat(a).ok && !L.tukarTempat({ ...a, tukarPilih: [0] }).ok && L.tukarTempat({ ...a, tukarPilih: [0, 1] }).ok && L.tukarTempat({ ...a, tukarPilih: [0, 1] }).k.sudahTukar, "tukar: Tukar sekarang butuh dua tempat");
  const dipilih = { ...a, tukarPilih: [0, 1], sudahTukar: true };
  cek(L.bilanganTukar(dipilih) === 2740 && L.bilanganTukar({ ...dipilih, tukarPilih: [1, 0] }) === 2740 && L.bilanganTukar({ ...dipilih, tukarPilih: [0, 3] }) === 247, "tukar: bilangan baru setelah ditukar");
  const tolakT = L.periksaTukar(a);
  cek(!tolakT.ok && tolakT.k.tolak === true && tolakT.k.salah === 0 && !tolakT.k.sudahTukar, "tukar: alat menolak memeriksa sebelum menukar (bukan percobaan keliru)");
  cek(/Pilih dulu dua tempat yang harus ditukar: tempat ribuan dan tempat ratusan/.test(L.petunjukTukar(a)) && /Alat belum menukar/.test(L.petunjukTukar({ ...a, tukarPilih: [0, 1] })) && tanpaDigit(L.petunjukTukar(a)), "tukar: petunjuk menunjuk langkah yang belum dilakukan");
  cek(L.pilihBanding(a, 0).bandingPilih === -1 && L.pilihBanding(dipilih, 0).bandingPilih === 0 && L.pilihBanding(dipilih, 9).bandingPilih === -1, "tukar: memilih banding hanya setelah menukar");
  const salahPasang = L.periksaTukar({ ...a, tukarPilih: [0, 2], sudahTukar: true, bandingPilih: 1 });
  cek(!salahPasang.ok && salahPasang.k.salah === 1 && /Tempat yang ditukar belum sesuai/.test(L.petunjukTukar({ ...a, tukarPilih: [0, 2], sudahTukar: true, bandingPilih: 1 })), "tukar: tempat yang ditukar keliru");
  const salahBanding = L.periksaTukar({ ...dipilih, bandingPilih: 0 });
  cek(!salahBanding.ok && salahBanding.k.salah === 1 && /mulai dari tempat paling kiri/.test(L.petunjukTukar({ ...dipilih, bandingPilih: 0 })), "tukar: banding keliru, petunjuk menyebut tempat paling kiri");
  cek(/Pilih lebih, kurang, atau sama dulu/.test(L.petunjukTukar(dipilih)) && !L.periksaTukar(dipilih).ok, "tukar: belum memilih banding");
  const bT = L.periksaTukar({ ...dipilih, bandingPilih: 1 });
  cek(bT.ok && bT.k.tukarBenar.join() === "0" && bT.k.tukarKe === 1 && bT.k.tukarPilih.length === 0 && !bT.k.sudahTukar && bT.k.bandingPilih === -1 && L.targetTukar(bT.k).n === 3518, "tukar: tepat membuka sasaran berikutnya");
  sama(S.misiBaru(MK.MISI_B, bT.k, new Set()), ["b-tukar"], "tukar: misi b-tukar");
  cek(L.periksaTukar({ ...a, tukarKe: 1, tukarPilih: [3, 2], sudahTukar: true, bandingPilih: 0 }).ok, "tukar: urutan ketukan tempat tidak penting, sasaran kedua lebih");
  cek(L.ulangTukar(dipilih).tukarPilih.length === 0 && !L.ulangTukar(dipilih).sudahTukar && tanpaDigit(L.kalimatTukar(a)) && tanpaDigit(L.kalimatTukar(dipilih)) && tanpaDigit(L.kalimatTukar(bT.k)), "tukar: ulang, kalimat tanpa digit");
  sama(L.PILIHAN_BANDING, ["lebih", "kurang", "sama"], "tukar: tiga pilihan banding");
  // Misi.
  const B = MK.MISI_B;
  cek(MK.daftarMisiK4Bab1("B") === B && B.length === 6 && B.filter((m) => m.wajib).length === 4 && B.filter((m) => !m.wajib).length === 2 && B.every((m) => m.id.startsWith("b-")), "misi B: enam misi, empat wajib, dua bebas, id berawalan b-");
  cek(B.every((m) => tanpaDigit(m.teks) && bersih(m.teks) && m.teks.length > 10 && m.teks.length < 120), "misi B: teks tanpa digit dan kata terlarang");
  sama(S.misiBaru(B, a, new Set()), [], "misi B: keadaan awal tanpa misi baru");
  cek(B.every((m) => !m.cek({ alat: "kerangka" })), "misi B: alat lain tidak memenuhi misi");
  cek(S.misiBaru(B, { ...a, salah: 9, mode: "tukar", isi: [3, 4, 2, 7], bagan: [6, 0, 3, 5], sudahLihat: true, artiPilih: 1, tukarPilih: [0, 1], sudahTukar: true, bandingPilih: 1 }, new Set()).length === 0, "misi B: isian, pilihan, dan penukaran yang belum diperiksa tidak dihitung sebagai misi");
}

/* Mind-map dan Infografis diuji di scripts/uji-visual-k4b1abc.mjs (rancangan sendiri per Sub-Bab, label kosong). */

/* ------------------------------ Pengenal ucapan ------------------------------ */
{
  const nm = (nama) => ({ jenis: "nama", nama });
  const an = (n) => ({ jenis: "angka", n });
  for (const nama of ["ribuan", "ratusan", "puluhan", "satuan", "lebih", "kurang", "sama"]) cek(K.cocokUcapan(nama, nm(nama)).cocok && K.kataDariUcapan(nama).length === 1, `cocok: kata ${nama} dikenali tepat satu`);
  sama(K.kataDariUcapan("ribu an"), ["ribuan"], "ucapan: ribu an dikenali sebagai ribuan");
  sama(K.kataDariUcapan("tidak lebih"), [], "ucapan: tidak lebih tidak dihitung");
  sama(K.kataDariUcapan("bukan puluhan"), [], "ucapan: bukan puluhan tidak dihitung");
  sama(K.kataDariUcapan("lebih dari"), ["lebih"], "ucapan: lebih dari dikenali sebagai lebih");
  cek(!K.cocokUcapan("ratusan", nm("puluhan")).cocok && K.cocokUcapan("saya kira satuan", nm("satuan")).cocok, "ucapan: kata lain tidak cocok, kata di dalam kalimat dikenali");
  for (const [teks, n] of [["tujuh", 7], ["sebelas", 11], ["tiga belas", 13], ["dua puluh lima", 25], ["seratus", 100], ["tiga ratus", 300], ["enam ratus", 600], ["delapan ratus lima puluh", 850], ["seribu", 1000], ["dua ribu", 2000], ["empat ribu", 4000], ["empat ribu dua ratus lima", 4205], ["tiga ribu enam ratus delapan puluh satu", 3681], ["12", 12], ["4205", 4205], ["4.205", 4205], ["3.000", 3000]]) cek(K.cocokUcapan(teks, an(n)).cocok, `ucapan: ${teks} dikenali sebagai ${n}`);
  cek(!K.cocokUcapan("tiga", an(300)).cocok && !K.cocokUcapan("tiga ratus", an(3)).cocok && !K.cocokUcapan("dua ribu", an(200)).cocok && !K.cocokUcapan("tiga puluh", an(300)).cocok, "ucapan: tiga, tiga puluh, tiga ratus, dan dua ribu dibedakan");
  sama(K.angkaDariUcapan("lima nol tujuh"), [5, 0, 7], "ucapan: angka berurutan");
  const mulai = K.cocokUcapan("hmm", nm("lebih"));
  cek(!mulai.cocok && mulai.terdengar.length === 0, "ucapan: tidak terdengar");
}

/* ------------------------------ CPA: tiga tahap, dua belas langkah ------------------------------ */
{
  const TAHAP = { Concrete: ["benda", D.CONCRETE], Pictorial: ["diagram", D.PICTORIAL], Abstract: ["lambang", D.ABSTRACT] };
  const cara3 = ["klik", "kanvas", "suara"];
  const NOMOR = { Concrete: [2, 3, 4], Pictorial: [5, 6, 7], Abstract: [8, 9, 10] };
  const URUT_TIPE = ["tempat", "balok", "bagan", "tukar"];
  const posisiBenar = [];
  let jumlahSalah = 0;
  let adaBetul = 0;
  for (const [namaT, [rupa, soal]] of Object.entries(TAHAP)) {
    cek(soal.length === 3 && soal.map((s) => s.cara).join() === cara3.join(), `${namaT}: tiga misi Klik, Tulis di kanvas, Rekam suara`);
    sama(soal.map((s) => s.nomor), NOMOR[namaT], `${namaT}: nomor misi berlanjut`);
    cek(soal.every((s) => s.langkah.length === 4 && s.langkah.map((l) => l.metode).join() === "igil,balok,bagan,tukar"), `${namaT}: empat langkah tiap misi berurut IGIL, Base-Ten Blocks, Place Chart, Digit Swap`);
    cek(soal.every((s) => tanpaDigit(s.judul.replace(/\d+/g, "")) && bersih(s.judul) && bersih(s.cerita) && tanpaDigit(s.cerita) && /^Misi Handuk \d+:/.test(s.judul)), `${namaT}: judul dan cerita misi bersih`);
    const salahT = soal.flatMap((s) => s.langkah.filter((l) => l.langkah.tipe === "salah"));
    cek(salahT.length === 1 && soal[0].langkah.includes(salahT[0]), `${namaT}: satu tugas Cari kesalahan pada misi Klik`);
    jumlahSalah += salahT.length;
    const kanvasAngka = [];
    for (const s of soal) {
      cek(s.langkah.every((ls, i) => LC.dasarDari(ls.langkah).tipe === URUT_TIPE[i]), `${namaT} ${s.nomor}: empat jenis tugas berurut tempat, balok, bagan, tukar`);
      for (const ls of s.langkah) {
        const l = ls.langkah;
        const d = LC.dasarDari(l);
        const kunci = LC.kunciJawab(l, s.cara);
        const tag = `${namaT} ${s.nomor} ${ls.metode}`;
        cek(kunci !== null, `${tag}: jawaban benar ada untuk semua tugas`);
        cek(ls.judul === ls.suara && tanpaDigit(ls.suara) && bersih(ls.suara) && ls.suara.length > 20, `${tag}: instruksi tanpa digit dan kata terlarang`);
        cek(LC.siapLangsung(l, rupa, s.cara) === (l.tipe !== "salah"), `${tag}: siap langsung kecuali Cari kesalahan (tombol tidak macet)`);
        for (const r of ["benda", "diagram", "lambang"]) cek(LC.siapLangsung(l, r, s.cara) === LC.siapLangsung(l, rupa, s.cara), `${tag}: siap langsung tidak bergantung rupa (${r})`);
        // Data sah.
        const dg = dgt(d.n);
        cek(d.n >= 1000 && d.n <= 9999 && !BIL_CERITA.includes(d.n), `${tag}: bilangan empat angka, bukan bilangan Story (${d.n})`);
        if (d.tipe === "tempat" || d.tipe === "balok") cek(d.tanda >= 0 && d.tanda <= 3 && dg[d.tanda] > 0, `${tag}: tempat yang dilingkari berangka bukan nol`);
        if (d.tipe === "bagan") cek(LC.banyakNol(d.n) >= 1 || s.cara === "klik", `${tag}: bagan memuat angka nol`);
        if (d.tipe === "bagan" && s.cara === "suara") cek(LC.banyakNol(d.n) === 1, `${tag}: bagan suara tepat satu kolom berangka nol`);
        if (d.tipe === "bagan" && s.cara === "kanvas") cek(LC.banyakNol(d.n) >= 1 && LC.banyakNol(d.n) <= 3, `${tag}: bagan kanvas menghitung kolom nol (satu sampai tiga)`);
        if (d.tipe === "tukar") cek(d.a !== d.b && dg[d.a] !== dg[d.b] && LC.tukarBil(d.n, d.a, d.b) !== d.n && d.a >= 0 && d.b <= 3, `${tag}: dua tempat berbeda dengan angka berbeda`);
        if (d.tipe === "tukar" && s.cara === "kanvas") cek(dg[d.b] > 0, `${tag}: angka yang pindah ke tempat pertama bukan nol`);
        if (kunci?.jenis === "angka") {
          if (s.cara === "kanvas") {
            kanvasAngka.push(kunci.n);
            cek(kunci.n >= 1 && kunci.n <= 9, `${tag}: jawaban kanvas satu angka satu sampai sembilan (${kunci.n})`);
          }
          if (s.cara === "klik") cek(kunci.n >= 1 && kunci.n <= 9999, `${tag}: jawaban klik bilangan sampai sembilan ribu sembilan ratus sembilan puluh sembilan`);
          if (s.cara === "suara") cek(kunci.n >= 1 && kunci.n <= 9000 && kunci.n % 10 === 0 || (s.cara === "suara" && kunci.n >= 1 && kunci.n <= 9000), `${tag}: jawaban suara bilangan pendek (${kunci.n})`);
          if (s.cara === "suara") cek(LC.kataBil(kunci.n).split(" ").length <= 4, `${tag}: ucapan jawaban pendek (${LC.kataBil(kunci.n)})`);
        }
        if (kunci?.jenis === "nama") cek(s.cara === "suara" && ["ribuan", "ratusan", "puluhan", "satuan", "lebih", "kurang"].includes(kunci.nama), `${tag}: jawaban nama hanya pada suara (${kunci.nama})`);
        if (s.cara === "kanvas") cek(kunci?.jenis === "angka", `${tag}: kanvas hanya untuk jawaban angka`);
        // Pilihan klik: tiga pilihan unik berformat titik ribuan, jawaban benar tidak di tombol pertama, jawaban tokoh ikut.
        if (s.cara === "klik" && kunci !== null) {
          const pil = LC.pilihanKlik(l);
          const benar = LC.teksKunciKlik(l);
          cek(pil.length === 3 && new Set(pil).size === 3 && pil.includes(benar) && pil[0] !== benar, `${tag}: pilihan klik unik dan jawaban benar bukan yang pertama (${pil.join("/")})`);
          cek(pil.every((p) => FORMAT_BIL.test(p)), `${tag}: pilihan klik berformat titik ribuan (${pil.join("/")})`);
          cek(benar === LC.formatBil(kunci.n), `${tag}: teks jawaban benar berformat titik ribuan`);
          if (l.tipe === "salah") {
            cek(pil.includes(l.jawabTokoh) || l.betul === true, `${tag}: jawaban tokoh ikut sebagai pilihan (${l.jawabTokoh})`);
            cek(l.betul === true ? l.jawabTokoh === benar : l.jawabTokoh !== benar, `${tag}: jawaban tokoh ${l.betul ? "benar" : "keliru"}`);
          }
          if (d.tipe === "tempat") cek(pil.some((p) => p === String(dg[d.tanda])) && pil.every((p) => [1, 10, 100, 1000].some((h) => Number(p.replace(/\./g, "")) === dg[d.tanda] * h)), `${tag}: pilihan tempat angka memuat angka tanpa tempatnya (${pil.join("/")})`);
        }
        if (s.cara === "suara" && kunci !== null) {
          const pil = LC.pilihanSuara(l, "suara");
          const benar = LC.teksKunciPilihan(kunci);
          cek(pil.includes(benar) && pil.length === 3 && new Set(pil).size === pil.length && tanpaDigit(pil.join(" ")), `${tag}: pilihan cadangan suara memuat jawaban benar (${pil.join("/")})`);
          cek(pil[0] !== benar, `${tag}: jawaban suara bukan pilihan pertama`);
          cek(K.cocokUcapan(benar, kunci).cocok, `${tag}: ucapan jawaban benar dikenali (${benar})`);
          for (const lain of pil.filter((p) => p !== benar)) cek(!K.cocokUcapan(lain, kunci).cocok, `${tag}: ucapan ${lain} bukan jawaban benar`);
        }
        if (kunci) cek(LC.kalimatKunci(l, s.cara).length > 12 && tanpaDigit(LC.kalimatKunci(l, s.cara)) && bersih(LC.kalimatKunci(l, s.cara)), `${tag}: kalimat penjelasan ada, tanpa digit`);
        cek(tanpaDigit(LC.kalimatTanya(l, s.cara)) && LC.kalimatTanya(l, s.cara).length > 8, `${tag}: pertanyaan tanpa digit`);
        // Petunjuk salah menunjuk kesalahan (tidak kosong, tanpa digit, tanpa kata terlarang).
        const pet = LC.petunjukSalah(l, s.cara, "x");
        cek(pet.length > 20 && tanpaDigit(pet) && bersih(pet), `${tag}: petunjuk salah ada, tanpa digit`);
        if (l.tipe === "salah") {
          cek(l.alasan.length === 3 && new Set(l.alasan).size === 3 && l.benar >= 0 && l.benar <= 2 && l.alasan.every((x) => tanpaDigit(x) && bersih(x)) && tanpaDigit(l.kataTokoh) && bersih(l.kataTokoh) && bersih(l.keliru) && tanpaDigit(l.keliru), `${tag}: Cari kesalahan bersih, tiga alasan berbeda`);
          cek(LC.petunjukSalah(l, "klik", l.jawabTokoh).includes(l.keliru) && ["Satria", "Laras", "Genta"].includes(l.tokoh), `${tag}: petunjuk jawaban tokoh menjelaskan kesalahan tokoh`);
          posisiBenar.push(l.benar);
          if (l.betul) adaBetul += 1;
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
          cek(bk.every((b) => !adaEmoji(b)), `${tag}: kartu kata tanpa emoji`);
          cek(bk.every((b) => bersih(b)), `${tag}: kartu kata tanpa kata terlarang`);
        }
      }
    }
    cek(new Set(kanvasAngka).size === kanvasAngka.length && kanvasAngka.length === 4, `${namaT}: empat angka jawaban Tulis di kanvas tidak kembar (${kanvasAngka.join(", ")})`);
  }
  cek(jumlahSalah === 3, "tiap tahap punya satu Cari kesalahan (tiga seluruhnya)");
  cek(adaBetul === 1, "satu Cari kesalahan memuat tokoh yang benar (Abstract)");
  cek(new Set(posisiBenar).size >= 2, `Cari kesalahan: alasan benar tidak selalu di tempat yang sama (${posisiBenar})`);
  const kv = (nama) => TAHAP[nama][1].filter((s) => s.cara === "kanvas").flatMap((s) => s.langkah.map((l) => LC.kunciJawab(l.langkah, "kanvas").n));
  sama(kv("Concrete"), [4, 6, 2, 3], "angka kanvas Concrete");
  sama(kv("Pictorial"), [5, 3, 2, 8], "angka kanvas Pictorial");
  sama(kv("Abstract"), [5, 8, 3, 1], "angka kanvas Abstract");
  // Tugas suara bervariasi: nama tempat, kata, dan bilangan.
  const kunciSuara = Object.values(TAHAP).flatMap(([, soal]) => soal[2].langkah.map((l) => LC.kunciJawab(l.langkah, "suara")));
  cek(kunciSuara.some((k) => k.jenis === "nama") && kunciSuara.some((k) => k.jenis === "angka"), "tugas suara: nama dan bilangan");
  const kataSuara = kunciSuara.filter((k) => k.jenis === "nama").map((k) => k.nama);
  for (const w of ["ribuan", "puluhan", "satuan", "lebih", "kurang"]) cek(kataSuara.includes(w), `tugas suara: kata ${w} muncul`);
  cek(kunciSuara.filter((k) => k.jenis === "angka").every((k) => [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000].includes(k.n)), "tugas suara: bilangan pendek kelipatan seratus atau seribu");
  // Jenis jawaban klik beragam: banyaknya angka, bilangan pada balok dan bagan, bilangan hasil tukar.
  const kunciKlik = Object.values(TAHAP).flatMap(([, soal]) => soal[0].langkah.map((l) => LC.kunciJawab(l.langkah, "klik")));
  cek(kunciKlik.every((k) => k.jenis === "angka") && kunciKlik.some((k) => k.n < 1000) && kunciKlik.some((k) => k.n >= 1000), "tugas klik: bilangan berbagai besar");
  // Fungsi bantu pengecoh.
  sama(LC.pengecoh({ tipe: "tempat", benda: "x", n: 7052, tanda: 2 }, "klik", 5).slice(0, 2), [5, 500], "pengecoh tempat angka dengan jawaban tokoh di depan: angka tanpa tempatnya");
  sama(LC.pengecoh({ tipe: "bagan", benda: "x", n: 3045 }, "klik", 345).slice(0, 1), [345], "pengecoh bagan: nol hilang");
  cek(LC.pengecoh({ tipe: "tukar", benda: "x", n: 5206, a: 0, b: 3 }, "klik").includes(5206), "pengecoh tukar: bilangan semula ikut");
  // Poin penting dan jembatan.
  cek(D.POIN_PENTING.length >= 6 && D.POIN_PENTING.every((p) => p.length > 20 && bersih(p)) && D.POIN_PENTING_SUARA.every((p) => tanpaDigit(p) && !/[=<>]/.test(p)), "poin penting: banyak, bersih, suara tanpa digit dan tanda");
  const poin = D.POIN_PENTING.join(" ").toLowerCase();
  for (const m of ["satuan, puluhan, ratusan, dan ribuan", "sepuluh kali", "angka dikali tempatnya", "angka yang sama berarti lain", "angka nol menjaga", "tabel tempat angka", "balok cacah, bagan tempat, dan tukar tempat"]) cek(poin.includes(m), `poin penting memuat ${m}`);
  cek(tanpaDigit(D.JEMBATAN_C) && bersih(D.JEMBATAN_C) && ["Kak Tiara", "papan dermaga", "pantai", "Sub-Bab berikutnya"].every((t) => D.JEMBATAN_C.includes(t)), "jembatan ke Sub-Bab C: Kak Tiara dan papan dermaga, tanpa digit");
  cek(Object.values(D.TEMA_HANDUK).every((t) => emojiSah(t.ikon) && t.nama.length >= 7 && t.cara.length > 20 && tanpaDigit(t.cara) && bersih(t.cara)), "tema tiga tahap sah");
  cek(D.TEMA_HANDUK.pictorial.cara.includes("polos") && D.TEMA_HANDUK.abstract.cara.includes("kartu") && D.TEMA_HANDUK.concrete.cara.includes("emoji"), "tema: Concrete beremoji, Pictorial polos, Abstract kartu");
  cek(D.CONCRETE_HANDUK === D.CONCRETE && D.PICTORIAL_HANDUK === D.PICTORIAL && D.ABSTRACT_HANDUK === D.ABSTRACT && D.MISI_HANDUK_TEKS === DS.MISI_HANDUK_TEKS, "nama ekspor untuk pemasang");
}

/* ------------------------------ Berkas ------------------------------ */
{
  const berkas = readdirSync(folderUrl).filter((f) => /\.(ts|tsx)$/.test(f));
  for (const nama of ["logika.ts", "data-sim.ts", "data-peta.ts", "data-info.ts", "logika-cpa.ts", "data.ts", "periksa.ts", "tata.ts", "JawabHanduk.tsx", "LangkahHanduk.tsx", "GambarHanduk.tsx", "TahapHanduk.tsx", "SimulasiGudangHanduk.tsx", "GudangHanduk.tsx", "DaftarHanduk.tsx"]) cek(berkas.includes(nama), `berkas ${nama} ada`);
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folderUrl), "utf8");
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d || c.codePointAt(0) === 0x1f6de), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}|\\u\{1F6DF\}/i.test(s), `${f}: kode emoji tidak melewati U+1FA95`);
    cek(!/\\u\{1FAB5\}|\\u\{1FA91\}|\\u\{1F41F\}|\\u\{1F420\}|\\u\{1F421\}|\\u\{1F988\}|\\u\{1F42C\}|\\u\{1F38F\}/i.test(s) && !["\u{1FAB5}", "\u{1FA91}", "\u{1F6DE}", "\u{1F6DF}", "\u{1F41F}", "\u{1F420}", "\u{1F421}", "\u{1F988}", "\u{1F42C}", "\u{1F38F}"].some((c) => s.includes(c)), `${f}: tanpa emoji terlarang (kayu, kursi, ban, pelampung, ikan)`);
    cek(!/buku|kelompok|bernilai|tebak/i.test(s), `${f}: tanpa kata buku, kelompok, bernilai, tebak`);
    cek(!/\bkelas\b|nilai tempat|Kelas 4/i.test(s.replace(/^\s*(\/\/|\*|\/\*).*$/gm, "")), `${f}: tanpa kata kelas dan nilai tempat di luar komentar`);
    if (/^(logika|logika-cpa|periksa|data|data-sim|data-peta|data-info|tata)\.ts$/.test(f)) cek(!/from "react"|fetch\(/.test(s), `${f}: tanpa React dan jaringan`);
    cek(!/tiket-k4b1a|dermaga-k4b1c|kelapa-k4b1d|resepsi-k4b1e|sisa-k4b1f|perahu-k4b1g|jatah-k4b1h|jadwal-k4b1i|papan-k3b5a|tabel-k3b5b|SubBabK4B1|lab-nilai-k4b1b|SimulasiLabNilai/.test(s), `${f}: tidak memakai folder Sub-Bab lain atau berkas lama`);
  }
  // Teks layar tidak memuat kata terlarang, termasuk nama berkas data.
  const layar = ["LangkahHanduk.tsx", "TahapHanduk.tsx", "SimulasiGudangHanduk.tsx", "GambarHanduk.tsx", "JawabHanduk.tsx"].map((f) => readFileSync(new URL(f, folderUrl), "utf8")).join("\n");
  const teksLayar = [...layar.matchAll(/>\s*([^<>{}\n]{4,})\s*</g)].map((m) => m[1]).join(" ");
  cek(!/\b(skor|nilai|soal|tebak|kunci|latihan|teman|kelompok|buku|kelas)\b/i.test(teksLayar), "teks layar komponen tanpa kata terlarang");
  cek(/\bTugas\b/.test(layar) && !/>\s*Soal/.test(layar), "teks layar CPA memakai Tugas");
  cek(!/capitalize/.test(layar), "teks layar: tanpa kelas capitalize");
  const th = readFileSync(new URL("TahapHanduk.tsx", folderUrl), "utf8");
  cek(/umum: Umum;\s*rupa: Rupa;\s*soal: SoalMisi\[\];\s*pita:/.test(th) && /teksAkhir: string/.test(th) && /poinPenting\?: boolean/.test(th), "TahapHanduk: props umum, rupa, soal, pita, teksAkhir, poinPenting");
  cek(/IKON_METODE\[ls\.metode\]/.test(th) && /rupa === "benda" \?/.test(th), "TahapHanduk: ikon metode hanya pada rupa benda (Pictorial dan Abstract tanpa emoji metode)");
  cek(/export default function TahapHanduk/.test(th) && /Cari kesalahan/.test(th) && /POIN_PENTING/.test(th) && /JEMBATAN_C/.test(th), "TahapHanduk: ekspor, Cari kesalahan, Poin Penting, jembatan ke Sub-Bab C");
  cek(/"rak"/.test(th) && /"denah"/.test(th) && /"stok"/.test(th) && !/"bambu"|"klub"|"tabel"|"lembar"|"kapur"|"tikar"|"peta"|"papan"|"nota"|"tirai"|"jepit"|"catatan"|"bungkus"|"kain"/.test(th), "TahapHanduk: pola visual rak gudang, kertas denah biru, catatan stok (berbeda dari bab sebelumnya)");
  cek(/1F9FA/.test(th) && !/KLUB SEPEDA|PERAYAAN|data-uji="perayaan"/.test(th) && /PAPAN DERMAGA/.test(th), "TahapHanduk: kemajuan Concrete berupa deret keranjang, akhir bab berupa jembatan (bukan perayaan)");
  const lg = readFileSync(new URL("LangkahHanduk.tsx", folderUrl), "utf8");
  cek(/export function LangkahHanduk/.test(lg) && /JawabSuaraHanduk/.test(lg) && /JawabTulis/.test(lg) && /pilihanSuara\(l, cara\)/.test(lg) && /TampilDasar/.test(lg), "LangkahHanduk: ekspor, jawab suara dengan pilihan ketuk, jawab tulis di kanvas");
  cek(/ucapkan\(/.test(lg), "LangkahHanduk: ucapan memakai kata, bukan digit");
  const jw = readFileSync(new URL("JawabHanduk.tsx", folderUrl), "utf8");
  cek(/gagalSekali/.test(jw) && /Ini jawaban yang benar|jawaban yang benar/.test(jw) && /PilihanKata/.test(jw) && /setCadangan\(true\)/.test(jw) && /e\.error === "not-allowed"/.test(jw), "JawabHanduk: galat mikrofon dihitung gagal, pilihan ketuk sebagai cadangan, jawaban benar setelah tiga kali salah");
  const gm = readFileSync(new URL("GambarHanduk.tsx", folderUrl), "utf8");
  cek(/export function BalokSvg/.test(gm) && /export function PapanSvg/.test(gm) && /export function TampilDasar/.test(gm) && /rupa === "lambang"/.test(gm) && /EMOJI_BENDA/.test(gm) && /susunBalok/.test(gm) && /data-balok/.test(gm) && /export function KartuKata/.test(gm), "GambarHanduk: balok cacah, papan empat kotak, tampilan dasar, kartu untuk Abstract");
  cek(/ribuan/.test(readFileSync(new URL("logika-cpa.ts", folderUrl), "utf8")) && /NAMA_TEMPAT\[c\]/.test(gm), "GambarHanduk: kepala papan memakai nama tempat ribuan sampai satuan");
  const sim = readFileSync(new URL("SimulasiGudangHanduk.tsx", folderUrl), "utf8");
  cek(/export default function SimulasiGudangHanduk/.test(sim) && /onKeadaan/.test(sim) && /MISI_HANDUK_TEKS/.test(sim), "SimulasiGudangHanduk: ekspor, onKeadaan, teks misi");
  cek(!/nama: "Tukar"/.test(sim) && /nama: "Tukar tempat"/.test(sim) && (sim.match(/Tukar sekarang/g) ?? []).length >= 1 && !/nama: "Lihat"/.test(sim), "SimulasiGudangHanduk: tab Tukar tempat dan tombol Tukar sekarang tidak kembar");
  for (const [f, nm] of [["GudangHanduk.tsx", "GudangHandukK4B1"], ["DaftarHanduk.tsx", "DaftarHandukK4B1"]]) {
    const s = readFileSync(new URL(f, folderUrl), "utf8");
    cek(/speakGuru/.test(s) && /onLanjut/.test(s) && /teksLanjut/.test(s) && !/peta-kartu\//.test(s) && /export default function (GudangHandukK4B1|DaftarHandukK4B1)/.test(s) && new RegExp(`export \\{ ${nm} \\}`).test(s), `${f}: komponen sendiri tanpa peta-kartu, ekspor ${nm}`);
  }
  // Berkas bersama: Simulasi memasang Gudang Handuk.
  const sk = readFileSync(new URL("../src/components/modul/SimulasiK4Bab1.tsx", import.meta.url), "utf8");
  cek(/SimulasiGudangHanduk/.test(sk) && /laporMisiHanduk\(daftarMisiHanduk\("B"\), k, a\.capai\)/.test(sk) && !/judulBab=\{`Kelas/.test(sk), "SimulasiK4Bab1: langkahGudangHandukB memasang Gudang Handuk, judul bab tanpa kata Kelas");
  // Berkas lama yang dipertahankan ada (dipakai bab lain dan bank soal).
  for (const f of ["data-k4b1.ts", "naskah-k4b1.ts", "eja-k4b1.ts", "dasar-k4b1.tsx", "diagram-k4b1.tsx", "bantu-k4b1.tsx", "papan-k4b1.tsx", "skala-k4b1.ts", "video-k4b1-umum.tsx"]) cek(readdirSync(new URL("../src/components/modul/", import.meta.url)).includes(f), `berkas lama ${f} dipertahankan`);
  const ej = readFileSync(new URL("../src/lib/ejaan-inggris-id.ts", import.meta.url), "utf8");
  cek(/base-ten blocks/i.test(ej) && /place chart/i.test(ej) && /digit swap/i.test(ej), "ejaan: tiga nama metode global ada");
}

console.log(`Lulus ${lulus}, gagal ${gagal}`);
process.exit(gagal ? 1 : 0);
