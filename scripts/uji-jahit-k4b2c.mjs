// Uji Mind-map (Meja Jahit), Infografis (Deret Potongan dan Kotak Jahit), Simulasi Meja Jahit, dan tahap Concrete, Pictorial, Abstract Kelas 4 Bab 2 Sub-Bab C ("Meja Jahit Kak Sekar"),
// cerita Sanggar Batik Kampung Mekar (pecahan yang sama besar: dikali atau dibagi bilangan sama pada pembilang dan penyebut, menyederhanakan).
// Memeriksa: logika simulasi (arsir kain bawah sungguh sebanyak bagian yang diminta, kali dengan alat menolak cara tambah, bagi dengan alat menolak pembagi yang tidak membagi habis,
// pasang kartu yang sama besar), misi (awal tidak memenuhi, wajib empat, bebas dua, tolak hanya dari cara tambah), Mind-map meja jahit bergambar sendiri (lima label kosong memuat semua metode Story),
// Infografis dua kartu (deret potongan kain dan kotak jahit) dari kejadian Story, CPA dua belas langkah per tahap (Klik, Kanvas, Suara x empat metode) dengan jawaban beragam dan Cari kesalahan di tiap tahap, jawaban benar dihitung dari data,
// angka jawaban kanvas tidak kembar per tahap, tugas yang langsung siap, pengenal ucapan, petunjuk salah tanpa membocorkan jawaban, batas rupa, emoji, kata terlarang, akhir baris.
// Jalankan: node --no-warnings scripts/uji-jahit-k4b2c.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/jahit-k4b2c/logika.ts");
const DS = await import("../src/components/modul/jahit-k4b2c/data-sim.ts");
const DP = await import("../src/components/modul/jahit-k4b2c/data-peta.ts");
const DI = await import("../src/components/modul/jahit-k4b2c/data-info.ts");
const LC = await import("../src/components/modul/jahit-k4b2c/logika-cpa.ts");
const D = await import("../src/components/modul/jahit-k4b2c/data.ts");
const K = await import("../src/components/modul/jahit-k4b2c/periksa.ts");
const EJ = await import("../src/components/modul/eja-k4b2.ts");
const S = await import("../src/components/modul/misi-simulasi.ts");
const MK = await import("../src/components/modul/misi-k4bab2.ts");
const MT = await import("../src/components/modul/misi-teks-k4b2.ts");
const folder = new URL("../src/components/modul/jahit-k4b2c/", import.meta.url);

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
const bersih = (t) => !/buku|kelompok|bernilai|tebak|nilai|kelas|teman|skor|soal|kunci|latihan|senilai/i.test(t);
const tanpaDigit = (t) => !/\d/.test(t);
const emojiSah = (s) => [...s].every((c) => c.codePointAt(0) <= 0x1fa95 && c.codePointAt(0) !== 0x200d && c.codePointAt(0) !== 0x1f6de);
const IKAN = [0x1f41f, 0x1f420, 0x1f421, 0x1f988, 0x1f42c, 0x1f38f];
/** Pecahan Story C: jangan dijadikan data CPA atau Simulasi (kecuali seed Cari kesalahan dari alur). */
const CERITA = ["1/2", "2/4", "4/8", "3/4", "6/8", "1/3", "4/12", "8/12", "2/3", "10/15", "3/5", "6/10", "12/16", "2/2", "3/3", "3/10"];
const fpb = (a, b) => (b === 0 ? a : fpb(b, a % b));
const pc = (p, q) => `${p}/${q}`;

/* ------------------------------ Pembantu pecahan ------------------------------ */
{
  sama([LC.pec(3, 7), LC.fpb(12, 18), LC.fpb(15, 35)], ["3/7", 6, 5], "pec dan fpb");
  sama(LC.sederhana(20, 32), [5, 8], "sederhana");
  sama([LC.bandingkan(3, 10, 2, 5), LC.bandingkan(2, 12, 1, 6), LC.bandingkan(4, 10, 1, 5)], ["kecil", "sama", "besar"], "bandingkan: sama, besar, kecil");
  sama([LC.ucapkan("3/7"), LC.ucapkan("2/5 = 4/10"), LC.ucapkan("Pecahan 12/15 dikali 2/2")], ["tiga per tujuh", "dua per lima sama dengan empat per sepuluh", "Pecahan dua belas per lima belas dikali dua per dua"], "ucapkan: pecahan menjadi kata");
  cek(LC.kata === LC.kataBil && LC.kataBil(21) === EJ.kataBilK4B2(21) && tanpaDigit(LC.kataBil(28)), "kata bilangan");
}

/* ------------------------------ Simulasi: data dan logika ------------------------------ */
{
  cek(DS.TARGET_ARSIR.length === 3 && DS.TARGET_ARSIR.every((t) => (t.p * t.r) % t.q === 0 && t.r % t.q === 0 && t.r <= 16 && t.p < t.q && !CERITA.includes(pc(t.p, t.q))), "simulasi arsir: tiga sasaran, r kelipatan q, berbeda dari Story");
  cek(DS.TARGET_KALI.length === 3 && DS.TARGET_KALI.every((t) => t.t % t.q === 0 && t.t / t.q >= 2 && t.t / t.q <= 6 && DS.PENGALI.includes(t.t / t.q) && !CERITA.includes(pc(t.p, t.q))), "simulasi kali: tiga sasaran, pengali tersedia, berbeda dari Story");
  cek(DS.TARGET_BAGI.length === 3 && DS.TARGET_BAGI.every((t) => fpb(t.P, t.Q) > 1 && DS.PEMBAGI.includes(fpb(t.P, t.Q)) === (fpb(t.P, t.Q) <= 7) && !CERITA.includes(pc(t.P, t.Q)) && !CERITA.includes(pc(t.P / fpb(t.P, t.Q), t.Q / fpb(t.P, t.Q)))), "simulasi bagi: tiga sasaran yang bisa disederhanakan, berbeda dari Story");
  cek(DS.TARGET_PASANG.length === 3 && DS.TARGET_PASANG.every((t) => t.kartu.length === 4 && t.benar.length === 2 && t.kartu.every(([a, b], i) => (a * t.q === b * t.p) === t.benar.includes(i)) && !CERITA.includes(pc(t.p, t.q)) && t.kartu.every(([a, b]) => !CERITA.includes(pc(a, b)))), "simulasi pasang: dua kartu sama besar tepat menurut hitungan silang, berbeda dari Story");
  cek(tanpaDigit(DS.MISI_JAHIT_TEKS) && bersih(DS.MISI_JAHIT_TEKS) && DS.MISI_JAHIT_TEKS === MT.MISI_K4B2.C && D.MISI_JAHIT_TEKS === DS.MISI_JAHIT_TEKS && DS.MISI_JAHIT_TEKS.length >= 10 && DS.MISI_JAHIT_TEKS.length <= 120, "simulasi: teks misi tanpa digit dan kata terlarang, sama dengan misi-teks-k4b2");

  const a = L.awalJahit();
  cek(a.alat === "jahit" && a.mode === "arsir" && a.arsir.length === 14 && a.arsir.every((x) => !x) && !a.tolak && a.salah === 0 && ["arsirBenar", "kaliBenar", "bagiBenar", "pasangBenar"].every((f) => a[f].length === 0) && a.bagiP === 15 && a.bagiQ === 35 && a.kaliN === 0 && a.kaliCara === "kali", "simulasi: keadaan awal");
  // Arsir.
  cek(L.perluArsir(a) === 2 && L.targetArsir(a).r === 14, "arsir: sasaran pertama satu per tujuh pada kain empat belas bagian perlu dua bagian");
  cek(!L.periksaArsir(a).ok && !L.periksaArsir(a).k.tolak && L.periksaArsir(a).k.salah === 0 && /Ketuk bagian/.test(L.petunjukArsir(a)) && tanpaDigit(L.petunjukArsir(a)), "arsir: tanpa arsiran hanya diingatkan (bukan tolak dan bukan percobaan keliru), petunjuk menunjuk langkah yang belum dilakukan");
  cek(L.ketukBagian(a, 99).arsir.every((x) => !x) && L.ketukBagian(a, -1) === a, "arsir: bagian di luar kain diabaikan");
  let g = L.ketukBagian(L.ketukBagian(L.ketukBagian(a, 0), 1), 2);
  cek(L.banyakArsir(g) === 3 && !L.periksaArsir(g).ok && L.periksaArsir(g).k.salah === 1 && /lebih panjang/.test(L.petunjukArsir(g)) && tanpaDigit(L.petunjukArsir(g)) && !/\b(dua|tiga)\b/.test(L.petunjukArsir(g)), "arsir: terlalu banyak bagian, petunjuk menyebut arahnya tanpa membocorkan banyaknya");
  g = L.ketukBagian(g, 2);
  cek(L.banyakArsir(g) === 2 && L.ketukBagian(g, 2).arsir[2] === true, "arsir: ketuk kedua kali membersihkan, ketuk lagi mengarsir");
  const g1 = L.ketukBagian(a, 5);
  cek(!L.periksaArsir(g1).ok && /lebih pendek/.test(L.petunjukArsir(g1)), "arsir: terlalu sedikit bagian, petunjuk menyebut lebih pendek");
  const benarA = L.periksaArsir({ ...g, arsir: g.arsir.map((_, i) => i === 3 || i === 9) });
  cek(benarA.ok && benarA.k.arsirBenar.join() === "0" && benarA.k.arsirKe === 1 && benarA.k.arsir.length === 16 && benarA.k.arsir.every((x) => !x) && /Betul/.test(L.kalimatArsir(benarA.k)), "arsir: bagian mana pun asal sebanyak yang diminta benar, membuka kain berikutnya dengan banyak bagian sesuai");
  sama(S.misiBaru(MK.MISI_C, benarA.k, new Set()), ["c-arsir"], "arsir: misi c-arsir");
  cek(L.perluArsir(benarA.k) === 6 && L.perluArsir({ ...a, arsirKe: 2 }) === 8, "arsir: kain kedua perlu enam bagian dari enam belas, kain ketiga delapan dari sepuluh");
  const duaA = L.periksaArsir({ ...benarA.k, arsir: benarA.k.arsir.map((_, i) => i < 6) });
  sama(S.misiBaru(MK.MISI_C, duaA.k, new Set()), ["c-arsir", "c-dua"], "arsir: dua kain memenuhi c-arsir dan c-dua");
  // Kali.
  cek(L.targetKali(a).t === 24 && L.pengaliBenar(a) === 3, "kali: sasaran pertama tiga per delapan ke penyebut dua puluh empat, pengali tiga");
  cek(!L.periksaKali(a).ok && !L.periksaKali(a).k.tolak && L.periksaKali(a).k.salah === 0 && /Pilih bilangan pengali/.test(L.petunjukKali(a)), "kali: tanpa pengali hanya diingatkan, bukan tolak");
  cek(L.pilihPengali(a, 1) === a && L.pilihPengali(a, 99) === a && L.pilihPengali(a, 4).kaliN === 4 && L.hasilKaliTampil(a) === null, "kali: pengali di luar daftar diabaikan, hasil tampil setelah memilih");
  sama(L.hasilKaliTampil(L.pilihPengali(a, 4)), [12, 32], "kali: tiga per delapan dikali empat menjadi dua belas per tiga puluh dua");
  const tambah = L.pilihPengali(L.pilihCaraKali(a, "tambah"), 3);
  sama(L.hasilKaliTampil(tambah), [6, 11], "kali: cara tambah memperlihatkan pecahan yang berubah besar");
  const tl = L.periksaKali(tambah);
  cek(!tl.ok && tl.k.tolak === true && tl.k.salah === 0 && /Alat menolak/.test(L.petunjukKali(tambah)) && tanpaDigit(L.petunjukKali(tambah)), "kali: alat menolak cara tambah (bukan percobaan keliru)");
  sama(S.misiBaru(MK.MISI_C, tl.k, new Set()), ["c-tolak"], "kali: misi c-tolak hanya dari cara tambah");
  const kSalah = L.pilihPengali(a, 4);
  cek(!L.periksaKali(kSalah).ok && L.periksaKali(kSalah).k.salah === 1 && !L.periksaKali(kSalah).k.tolak && /pesanan/.test(L.petunjukKali(kSalah)) && !/\b(tiga|dua puluh)\b/.test(L.petunjukKali(kSalah)) && tanpaDigit(L.petunjukKali(kSalah)), "kali: pengali keliru, petunjuk tanpa membocorkan pengali");
  const kBenar = L.periksaKali(L.pilihPengali(a, 3));
  cek(kBenar.ok && kBenar.k.kaliBenar.join() === "0" && kBenar.k.kaliKe === 1 && kBenar.k.kaliN === 0 && kBenar.k.kaliCara === "kali" && L.pengaliBenar(kBenar.k) === 2, "kali: pengali benar membuka pesanan berikutnya");
  sama(S.misiBaru(MK.MISI_C, kBenar.k, new Set()), ["c-kali"], "kali: misi c-kali");
  // Bagi.
  cek(L.targetBagi(a).P === 15 && !L.sudahDibagi(a) && L.bisaDibagi(a), "bagi: sasaran pertama lima belas per tiga puluh lima");
  cek(!L.periksaBagi(a).ok && L.periksaBagi(a).k.salah === 0 && /Bagi dulu/.test(L.petunjukBagi(a)) && tanpaDigit(L.petunjukBagi(a)), "bagi: tanpa pembagian hanya diingatkan, bukan percobaan keliru");
  const b2 = L.bagiDengan(a, 2);
  cek(!b2.ok && b2.k.bagiP === 15 && b2.k.bagiQ === 35 && !b2.k.tolak && /Alat menolak/.test(L.petunjukTolakBagi()) && tanpaDigit(L.petunjukTolakBagi()), "bagi: pembagi yang tidak membagi habis keduanya ditolak (bukan tolak tantangan)");
  cek(!L.bagiDengan(a, 9).ok && !L.bagiDengan(a, 1).ok, "bagi: pembagi di luar daftar ditolak");
  const b5 = L.bagiDengan(a, 5);
  cek(b5.ok && b5.k.bagiP === 3 && b5.k.bagiQ === 7 && L.sudahDibagi(b5.k) && !L.bisaDibagi(b5.k), "bagi: dibagi lima menjadi tiga per tujuh");
  const bBenar = L.periksaBagi(b5.k);
  cek(bBenar.ok && bBenar.k.bagiBenar.join() === "0" && bBenar.k.bagiKe === 1 && bBenar.k.bagiP === 12 && bBenar.k.bagiQ === 21, "bagi: paling sederhana benar, membuka pecahan berikutnya");
  sama(S.misiBaru(MK.MISI_C, bBenar.k, new Set()), ["c-bagi"], "bagi: misi c-bagi");
  const c3 = L.bagiDengan(L.periksaBagi(b5.k).k, 3);
  cek(c3.ok && c3.k.bagiP === 4 && c3.k.bagiQ === 7, "bagi: dua belas per dua puluh satu dibagi tiga menjadi empat per tujuh");
  let lambat = { ...a, bagiKe: 2, bagiP: 20, bagiQ: 32 };
  lambat = L.bagiDengan(lambat, 2).k;
  cek(lambat.bagiP === 10 && lambat.bagiQ === 16 && !L.periksaBagi(lambat).ok && L.periksaBagi(lambat).k.salah === 1 && /Masih ada/.test(L.petunjukBagi(lambat)) && tanpaDigit(L.petunjukBagi(lambat)), "bagi: baru sekali dibagi masih bisa dibagi, petunjuk menyuruh membagi lagi");
  lambat = L.bagiDengan(lambat, 2).k;
  cek(L.periksaBagi(lambat).ok && lambat.bagiP === 5 && lambat.bagiQ === 8, "bagi: dua kali dibagi dua menjadi lima per delapan, benar");
  cek(L.ulangBagi(lambat).bagiP === 20 && L.ulangBagi(lambat).bagiQ === 32, "bagi: ulangi mengembalikan pecahan awal");
  // Pasang.
  cek(L.targetPasang(a).p === 2 && !L.periksaPasang(a).ok && L.periksaPasang(a).k.salah === 0 && /Ketuk semua kartu/.test(L.petunjukPasang(a)) && tanpaDigit(L.petunjukPasang(a)), "pasang: tanpa pilihan hanya diingatkan, bukan percobaan keliru");
  cek(L.ketukKartu(a, 9) === a && L.ketukKartu(a, 1).pasangPilih.join() === "1" && L.ketukKartu(L.ketukKartu(a, 3), 1).pasangPilih.join() === "1,3" && L.ketukKartu(L.ketukKartu(a, 1), 1).pasangPilih.length === 0, "pasang: kartu bisa dipilih dan dilepas, di luar daftar diabaikan");
  const pSalah = L.ketukKartu(L.ketukKartu(a, 0), 1);
  cek(!L.periksaPasang(pSalah).ok && L.periksaPasang(pSalah).k.salah === 1 && !L.periksaPasang(pSalah).k.tolak && tanpaDigit(L.petunjukPasang(pSalah)), "pasang: pilihan keliru dihitung percobaan keliru");
  cek(!L.periksaPasang(L.ketukKartu(a, 1)).ok, "pasang: satu kartu benar saja belum cukup");
  const pBenar = L.periksaPasang(L.ketukKartu(L.ketukKartu(a, 3), 1));
  cek(pBenar.ok && pBenar.k.pasangBenar.join() === "0" && pBenar.k.pasangKe === 1 && pBenar.k.pasangPilih.length === 0 && L.targetPasang(pBenar.k).p === 5, "pasang: dua kartu benar membuka papan berikutnya");
  sama(S.misiBaru(MK.MISI_C, pBenar.k, new Set()), ["c-pasang"], "pasang: misi c-pasang");
  cek(L.mulaiLagiJahit().arsirKe === 0 && L.pilihModeJahit(a, "bagi").mode === "bagi" && L.hurufBesar("betul") === "Betul", "mulai lagi, ganti alat, huruf besar");
  cek([L.kalimatArsir(a), L.kalimatKali(a), L.kalimatBagi(a), L.kalimatPasang(a), L.kalimatArsir(g), L.kalimatPasang(L.ketukKartu(a, 1))].every(tanpaDigit), "kalimat status tanpa digit");
  // Misi.
  const M = MK.MISI_C;
  cek(M.filter((m) => m.wajib).length === 4 && M.filter((m) => !m.wajib).length === 2, "misi C: empat wajib, dua bebas");
  cek(new Set(M.map((m) => m.id)).size === 6 && M.every((m) => m.id.startsWith("c-") && m.teks.length >= 10 && m.teks.length <= 120 && tanpaDigit(m.teks) && bersih(m.teks)), "misi C: id berawalan c-, unik, 10 sampai 120 huruf, tanpa digit");
  cek(/tambah/.test(M.find((m) => m.id === "c-tolak").teks) && /Kali/.test(M.find((m) => m.id === "c-tolak").teks), "misi C: teks tantangan tolak sesuai perilaku alat (cara tambah pada alat Kali)");
  sama(MK.daftarMisiK4Bab2("C"), M, "daftarMisiK4Bab2 C");
  cek(M.every((m) => !m.cek({ alat: "kerangka" })), "misi C: alat lain tidak memenuhi misi");
  sama(S.misiBaru(M, a, new Set()), [], "misi C: keadaan awal tanpa misi baru");
  cek(S.misiBaru(M, { ...a, salah: 9, mode: "pasang", arsir: a.arsir.map((_, i) => i < 2), kaliN: 3, bagiP: 3, bagiQ: 7, pasangPilih: [1, 3] }, new Set()).length === 0, "misi C: arsiran, pilihan, dan pecahan yang belum diperiksa tidak dihitung");
  sama(S.misiBaru(M, { ...a, arsirBenar: [0, 1], kaliBenar: [0], bagiBenar: [0], pasangBenar: [0], tolak: true }, new Set()), ["c-arsir", "c-kali", "c-bagi", "c-pasang", "c-tolak", "c-dua"], "misi C: semua misi tercapai");
}

/* ------------------------------ Mind-map: meja jahit (gambar sendiri, label kosong) ------------------------------ */
{
  const P = DP.LANGKAH_JAHIT;
  const nama = (f) => readFileSync(new URL(f, folder), "utf8");
  const pt = nama("PetaJahit.tsx");
  const inf = nama("InfoJahit.tsx");
  cek(P.length === 5 && P.length >= 3 && P.length <= 6, "mind-map: lima langkah (jumlah mengikuti materi, antara tiga dan enam)");
  cek(new Set(P.map((x) => x.judul)).size === P.length && P.every((x) => x.judul.split(/\s+/).every((w) => w.length <= 12) && x.judul.length <= 26), "mind-map: judul unik, kata paling panjang dua belas huruf, muat di label sempit");
  cek(P.every((x) => tanpaDigit(x.judul) && tanpaDigit(x.arti) && bersih(x.judul) && bersih(x.arti) && x.arti.length > 30 && /^Langkah (satu|dua|tiga|empat|lima)\./.test(x.arti)), "mind-map: judul dan arti tanpa digit dan kata terlarang, arti diawali nomor langkah");
  const gab = P.map((x) => `${x.judul} ${x.arti}`).join(" ").toLowerCase();
  for (const s of ["cocokkan daerah", "kali bentuk satu", "bagi keduanya", "menambah", "tumpuk", "sama besar", "pembilang dan penyebut", "sederhana", "membagi habis"]) cek(gab.includes(s), `mind-map: memuat poin "${s}"`);
  cek(tanpaDigit(DP.PETUNJUK_PETA + DP.SELESAI_PETA + DP.JUDUL_PETA) && bersih(DP.PETUNJUK_PETA + DP.SELESAI_PETA + DP.JUDUL_PETA) && emojiSah(DP.IKON_JUDUL_PETA), "mind-map: petunjuk dan pesan bersih");
  // Angka gambar dari Story C dan hitungan benar.
  sama(DP.TUMPUKAN.map((t) => pc(t.p, t.q)), ["1/2", "2/4", "4/8"], "gambar tumpuk: satu per dua, dua per empat, empat per delapan (Story)");
  cek(DP.TUMPUKAN.every((t) => t.p * 2 === t.q), "gambar tumpuk: ketiganya sama besar (setengah)");
  sama(pc(DP.hasilTambah().p, DP.hasilTambah().q), "3/4", "gambar tambah: satu per dua ditambah dua pada keduanya jadi tiga per empat (salah Satria)");
  cek(DP.hasilTambah().p * 2 !== DP.hasilTambah().q, "gambar tambah: hasil tambah tidak sama besar dengan satu per dua");
  sama(DP.rantaiKali().map((t) => pc(t.p, t.q)), ["1/2", "2/4", "4/8"], "gambar kali: rantai dikali dua dua kali (1/2, 2/4, 4/8)");
  sama([pc(DP.BAGI_DUA.dari.p, DP.BAGI_DUA.dari.q), pc(DP.hasilBagi().p, DP.hasilBagi().q)], ["6/8", "3/4"], "gambar bagi: enam per delapan dibagi dua jadi tiga per empat (Story)");
  cek(DP.fpbPeta(DP.hasilBagi().p, DP.hasilBagi().q) === 1, "gambar henti: tiga per empat sudah paling sederhana");
  // Kode komponen: bukan PetaKartu/PetaLabel, gambar sebanyak data, perilaku label kosong.
  cek(!/peta-kartu|peta-label|PetaKartu|PetaLabel|InfografisKartu|InfoKartu|data-kartu/.test(pt + inf), "PetaJahit dan InfoJahit: komponen sendiri (bukan PetaKartu, PetaLabel, InfoKartu)");
  cek(/Array\.from\(\{ length: n \}/.test(pt) && /data-kain=/.test(pt) && /data-arsir=/.test(pt) && /<Kain /.test(pt) && /TUMPUKAN\.map/.test(pt) && /rantaiKali\(\)/.test(pt) && /hasilTambah\(\)/.test(pt) && /hasilBagi\(\)/.test(pt), "PetaJahit: potongan kain digambar sebanyak bagiannya dari data (tumpukan, tambah, rantai kali, bagi)");
  cek(/LANGKAH_JAHIT\.map/.test(pt) && /speakGuru\(LANGKAH_JAHIT\[n\]\.arti\)/.test(pt) && /terbuka \? l\.judul : "\?"/.test(pt) && /selesai \? \(/.test(pt) && /onLanjut/.test(pt) && /teksLanjut/.test(pt), "PetaJahit: label kosong diketuk memunculkan judul dan dibacakan, tombol lanjut setelah semua terbuka");
  cek(/export default function PetaJahitK4B2/.test(pt) && /export \{ PetaJahitK4B2 \}/.test(pt) && /from "\.\/PetaJahit"/.test(nama("MejaJahit.tsx")) && /export default function MejaJahitK4B2/.test(nama("MejaJahit.tsx")) && /export \{ MejaJahitK4B2 \}/.test(nama("MejaJahit.tsx")), "MejaJahit: nama dari alur dipertahankan, pembungkus PetaJahit");
  // Ukuran huruf SVG: render minimal 0,8 dari viewBox (kolom gambar sekitar 134 dari 160), jadi efektif = font x 0,8 harus >= 10.
  const fontPt = [...pt.matchAll(/fontSize=\{(\d+)\}/g)].map((m) => Number(m[1]));
  const fsTingkat = [...pt.matchAll(/fs = (\d+)/g), ...pt.matchAll(/fs=\{(\d+)\}/g)].map((m) => Number(m[1]));
  cek(fontPt.length >= 4 && fsTingkat.length >= 2 && Math.min(...fontPt, ...fsTingkat) * 0.75 >= 10.5, `PetaJahit: teks SVG paling kecil ${Math.min(...fontPt, ...fsTingkat)} (efektif >= 10)`);
  cek([...pt.matchAll(/viewBox="0 0 (\d+) \d+"/g)].every((m) => Number(m[1]) <= 160) && !/text-\[(9|10)px\]/.test(pt + inf), "PetaJahit: lebar viewBox paling besar 160 (kolom gambar tidak mengecil) dan teks HTML paling kecil 11 px");
}

/* ------------------------------ Infografis: deret potongan dan kotak jahit (dari benda dan angka Story C) ------------------------------ */
{
  const nama = (f) => readFileSync(new URL(f, folder), "utf8");
  const inf = nama("InfoJahit.tsx");
  const PT = DI.POTONGAN;
  const KT = DI.KANTONG;
  cek(PT.length === 5 && PT.every((p) => p.sel.length === 2), "infografis kartu 1: lima potongan kain, dua isian tertutup tiap potongan");
  sama(PT.map((p) => pc(p.p, p.q)), ["1/2", "2/4", "4/8", "6/8", "3/4"], "infografis kartu 1: potongan Story (1/2, 2/4, 4/8, 6/8, dan 3/4 hasil tambah dua)");
  sama(PT.map((p) => p.salah), [false, false, false, false, true], "infografis kartu 1: hanya potongan hasil tambah yang keliru");
  sama(PT.map((p) => p.sel.map((s) => s.t)), [["1/2", "awal"], ["2/4", "× 2"], ["4/8", "× 4"], ["6/8", "÷ 2 = 3/4"], ["3/4", "≠ 1/2"]], "infografis kartu 1: isian tertutup");
  cek(PT.slice(0, 3).every((p) => p.p * 2 === p.q) && PT[0].q * 2 === PT[1].q && PT[0].q * 4 === PT[2].q && PT[3].p / PT[3].q === 0.75 && PT[4].p / PT[4].q === 0.75 && PT[4].p * 2 !== PT[4].q, "infografis kartu 1: hitungan benar (x2 dan x4 sama besar, 6/8 sama dengan 3/4, tambah dua tidak sama dengan 1/2)");
  const semuaSuara = [...PT.flatMap((p) => p.sel.map((s) => s.suara)), ...KT.map((k) => k.suara), DI.PETUNJUK_INFO_1, DI.PETUNJUK_INFO_2, DI.SELESAI_INFO_1, DI.SELESAI_INFO_2];
  cek(semuaSuara.every((t) => tanpaDigit(t) && bersih(t) && /^[A-Z]/.test(t) && !/\s[.,!?;:]/.test(t)), "infografis: semua suara tanpa digit dan kata terlarang, diawali huruf kapital");
  cek(/dikali dua/.test(PT[1].sel[1].suara) && /dikali empat/.test(PT[2].sel[1].suara) && /dibagi dua/.test(PT[3].sel[1].suara) && /tiga per empat/.test(PT[3].sel[1].suara) && /keliru/.test(PT[4].sel[1].suara), "infografis kartu 1: suara mengeja kali, bagi, dan cara keliru");
  cek(KT.length === 5 && KT.map((k) => k.label).join() === "Cocokkan Daerah,Kali Bentuk Satu,Bagi Keduanya,Berhenti,Jangan menambah", "infografis kartu 2: lima kantong (tiga metode, berhenti, jangan menambah)");
  cek(KT.every((k) => emojiSah(k.ikon) && k.label.split(/\s+/).every((w) => w.length <= 12) && k.isi.length <= 16), "infografis kartu 2: ikon sah, label dan isi pendek");
  sama(KT.map((k) => k.isi), ["arsiran sama", "× 4/4 = 4/12", "÷ 4 = 2/3", "tak terbagi lagi", "besar berubah"], "infografis kartu 2: isi tertutup dari video metode Story");
  cek(KT[1].lihat.join("/") === "1/3" && 1 * 4 === 4 && 3 * 4 === 12 && KT[2].lihat.join("/") === "8/12" && 8 / 4 === 2 && 12 / 4 === 3 && KT[3].lihat.join("/") === "2/3" && fpb(2, 3) === 1, "infografis kartu 2: hitungan benar (1/3 x 4/4 = 4/12, 8/12 : 4 = 2/3, 2/3 paling sederhana)");
  cek(KT[0].gambar.length === 2 && KT[0].gambar[0].n === 3 && KT[0].gambar[0].k === 1 && KT[0].gambar[1].n === 6 && KT[0].gambar[1].k === 2 && KT[0].gambar[0].k / KT[0].gambar[0].n === KT[0].gambar[1].k / KT[0].gambar[1].n, "infografis kartu 2: Cocokkan Daerah digambar dua potongan (sepertiga dan dua per enam) sama panjang arsirannya");
  cek(!/peta-kartu|peta-label|InfoKartu|InfografisKartu|PetaLabel|<table/.test(inf) && /POTONGAN\.map/.test(inf) && /KANTONG\.map/.test(inf) && /Array\.from\(\{ length: n \}/.test(inf) && /Array\.from\(\{ length: s\.n \}/.test(inf) && /data-kain=/.test(inf) && /data-arsir=/.test(inf) && /DuaPotongan/.test(inf) && /KainGantung/.test(inf), "InfoJahit: komponen sendiri (bukan InfoKartu, bukan tabel), potongan kain digambar sebanyak bagiannya");
  cek(/speakGuru/.test(inf) && /onLanjut/.test(inf) && /teksLanjut/.test(inf) && /kartu === 1 && selesai/.test(inf) && /kartu === 2 && selesai/.test(inf) && /export default function InfoJahitK4B2/.test(inf) && /export \{ InfoJahitK4B2 \}/.test(inf), "InfoJahit: Berikutnya dan Lanjut hanya setelah semua kotak terbuka, ekspor InfoJahitK4B2");
  const dk = nama("DaftarJahit.tsx");
  cek(/from "\.\/InfoJahit"/.test(dk) && /export default function DaftarJahitK4B2/.test(dk) && /export \{ DaftarJahitK4B2 \}/.test(dk), "DaftarJahit: nama dari alur dipertahankan, pembungkus InfoJahit");
  cek(!/<text/.test(inf) && !/fontSize=\{/.test(inf) && !/text-\[(9|10)px\]/.test(inf), "InfoJahit: tanpa teks SVG, teks HTML paling kecil 11 px");
  cek(!/(²|³)/.test(inf), "InfoJahit: tanpa pangkat");
}

/* ------------------------------ Hasil ukur peramban: tinggi, kata utuh, aria ------------------------------ */
{
  const nama = (f) => readFileSync(new URL(f, folder), "utf8");
  const pt = nama("PetaJahit.tsx");
  const inf = nama("InfoJahit.tsx");
  const petunjuk = [DP.PETUNJUK_PETA, DI.PETUNJUK_INFO_1, DI.PETUNJUK_INFO_2];
  cek(petunjuk.every((t) => t.length <= 66 && (t.match(/[.!?]/g) ?? []).length === 1 && tanpaDigit(t) && bersih(t)), "petunjuk: satu kalimat, paling banyak 66 huruf");
  cek(!/rounded-lg bg-\[#[0-9A-F]+\] py-1 text-center/.test(pt + inf) && !/Kartu \{kartu\} dari 2/.test(inf) && !/JUDUL_PETA|IKON_JUDUL_PETA/.test(pt), "tanpa pill judul dan tanpa penanda Kartu x dari 2 (hemat tinggi)");
  // Ukur peramban 344x760 sebelum perapian: Mind-map 694, Infografis kartu 2 702 (batas 640). Penghematan yang diklaim hanya yang terbukti dari kode: pill 36, petunjuk 25, penanda kartu 24.
  const hemat = (pill, kartu) => (pill ? 36 : 0) + 25 + (kartu ? 24 : 0);
  cek(694 - hemat(true, false) <= 640 && 702 - hemat(true, true) <= 640, `perkiraan tinggi: Mind-map ${694 - hemat(true, false)}, Infografis kartu 2 ${702 - hemat(true, true)} (<= 640)`);
  cek(/_8\.5rem\]/.test(pt), "PetaJahit: kolom label 8,5 rem supaya kata utuh");
  const lebarTeks = 136 - 6 - 12 - 20 - 6;
  const kataMax = Math.max(...DP.LANGKAH_JAHIT.flatMap((x) => x.judul.split(/\s+/).map((w) => w.length)));
  cek(kataMax * 7.6 <= lebarTeks, `kata label terpanjang ${kataMax} huruf muat utuh di ${lebarTeks} px (tanpa patah)`);
  cek(DI.POTONGAN.flatMap((p) => p.sel.filter((s) => !s.pec).flatMap((s) => s.t.split(/\s+/))).every((w) => w.length * 7.4 <= 37), "sel Infografis: tiap kata muat di sel 37 px (tanpa meluap)");
  cek(/tutup=\{`/.test(inf) && !/Isi kosong, ketuk untuk membuka/.test(inf) && /Pecahan" : "Cara"/.test(inf) && /Aturan kantong/.test(inf), "aria-label sel tertutup menyebut kolom dan isinya (bukan kalimat generik)");
}

/* ------------------------------ Pengenal ucapan ------------------------------ */
{
  const nm = (nama) => ({ jenis: "nama", nama });
  const an = (n) => ({ jenis: "angka", n });
  for (const nama of ["sama", "besar", "kecil"]) cek(K.cocokUcapan(nama, nm(nama)).cocok && K.kataDariUcapan(nama).length === 1, `cocok: kata ${nama} dikenali tepat satu`);
  sama(K.kataDariUcapan("sama besar"), ["sama"], "ucapan: sama besar dihitung sama saja");
  sama(K.kataDariUcapan("lebih besar"), ["besar"], "ucapan: lebih besar dikenali sebagai besar");
  sama(K.kataDariUcapan("lebih kecil"), ["kecil"], "ucapan: lebih kecil dikenali sebagai kecil");
  sama(K.kataDariUcapan("tidak sama"), [], "ucapan: tidak sama tidak dihitung");
  sama(K.kataDariUcapan("halo"), [], "ucapan: kata lain tidak dikenali");
  cek(!K.cocokUcapan("sama besar", nm("besar")).cocok && K.cocokUcapan("sama besar", nm("sama")).cocok && !K.cocokUcapan("kecil", nm("besar")).cocok, "cocok: sama besar tidak dianggap besar");
  for (let n = 0; n <= 9; n += 1) cek(K.angkaDariUcapan(LC.kataBil(n)).join() === String(n) && K.cocokUcapan(String(n), an(n)).cocok && !K.cocokUcapan(LC.kataBil((n + 1) % 10), an(n)).cocok, `angka: ${n} dikenali dari kata dan dari angka tertulis`);
  sama(K.angkaDariUcapan("sembilan, 4 dan tiga"), [9, 4, 3], "angka: satuan dan angka tertulis");
  for (let n = 0; n <= 150; n += 1) cek(K.angkaDariUcapan(LC.kataBil(n)).join() === String(n), `angka: kata bilangan ${n} dikenali utuh`);
  cek(K.cocokUcapan("dua puluh satu", an(21)).cocok && K.cocokUcapan("delapan belas", an(18)).cocok, "cocok: bilangan dua angka dari kata");
}

/* ------------------------------ CPA ------------------------------ */
const TAHAP = { Concrete: ["benda", D.CONCRETE], Pictorial: ["diagram", D.PICTORIAL], Abstract: ["lambang", D.ABSTRACT] };
const CARA = ["klik", "kanvas", "suara"];
const METODE = ["igil", "daerah", "kali", "bagi"];
const TIPE_METODE = ["ekuiv", "daerah", "kali", "bagi"];
const KANVAS = { Concrete: [4, 6, 3, 5], Pictorial: [6, 2, 5, 4], Abstract: [8, 6, 7, 9] };
const semuaTeksLangkah = (ls, rupa, cara) => [ls.judul, ls.suara, LC.instruksi(ls.langkah, rupa, cara, ls.metode), LC.kalimatTanya(ls.langkah, cara), LC.petunjukSalah(ls.langkah, cara, 1)];
const jawabanBenar = (d, cara) => {
  switch (d.tipe) {
    case "ekuiv": return cara === "klik" ? { jenis: "nama", nama: pc(d.p * d.m, d.q * d.m) } : cara === "kanvas" ? { jenis: "angka", n: d.p * d.m } : { jenis: "angka", n: d.m };
    case "daerah": {
      const a = (d.p * d.r) / d.q;
      const banding = d.t === undefined ? "" : d.t * d.q === d.p * d.r ? "sama" : d.t * d.q > d.p * d.r ? "besar" : "kecil";
      return cara === "klik" ? { jenis: "nama", nama: pc(a, d.r) } : cara === "kanvas" ? { jenis: "angka", n: a } : { jenis: "nama", nama: banding };
    }
    case "kali": return cara === "klik" ? { jenis: "nama", nama: pc(d.m, d.m) } : cara === "kanvas" ? { jenis: "angka", n: d.m } : { jenis: "angka", n: d.q * d.m };
    case "bagi": return cara === "klik" ? { jenis: "nama", nama: pc(d.P / d.d, d.Q / d.d) } : cara === "kanvas" ? { jenis: "angka", n: d.Q / d.d } : { jenis: "angka", n: d.P / d.d };
  }
};
{
  sama(LC.URUT_METODE, METODE, "urutan metode");
  cek(LC.NAMA_METODE.igil.includes("Cocokkan Daerah, Kali Bentuk Satu, Bagi Keduanya") && LC.NAMA_METODE.daerah.includes("Area Model Match") && LC.NAMA_METODE.kali.includes("Multiply by One") && LC.NAMA_METODE.bagi.includes("Divide Both"), "nama metode IGIL dan tiga metode global");
  cek(METODE.every((m) => emojiSah(LC.IKON_METODE[m])), "ikon metode sah");
  let nomor = 2;
  for (const [nama, [rupa, soal]] of Object.entries(TAHAP)) {
    cek(soal.length === 3 && soal.map((s) => s.cara).join() === CARA.join(), `${nama}: tiga misi Klik, Kanvas, Suara`);
    cek(soal.every((s) => s.langkah.length === 4 && s.langkah.map((l) => l.metode).join() === METODE.join()), `${nama}: empat langkah per misi (IGIL, Area Model Match, Multiply by One, Divide Both)`);
    const kunciKanvas = [];
    for (const s of soal) {
      cek(s.nomor === nomor, `${nama}: nomor misi berlanjut ${nomor}`);
      nomor += 1;
      cek(s.judul.startsWith("Misi Jahit") && s.cerita.length > 15 && bersih(s.judul) && bersih(s.cerita), `${nama} ${s.nomor}: judul dan cerita sah`);
      sama(s.langkah.map((l) => LC.dasarDari(l.langkah).tipe), TIPE_METODE, `${nama} ${s.nomor}: jenis tugas per metode`);
      for (const ls of s.langkah) {
        cek(ls.cara === s.cara, `${nama} ${s.nomor}: cara langkah sama dengan misi`);
        const teks = semuaTeksLangkah(ls, rupa, s.cara);
        cek(teks.every(tanpaDigit), `${nama} ${s.nomor} ${ls.metode}: instruksi, pertanyaan, dan petunjuk tanpa digit`);
        cek(teks.every(bersih), `${nama} ${s.nomor} ${ls.metode}: tanpa kata terlarang`);
        cek(ls.judul === ls.suara && ls.judul === LC.instruksi(ls.langkah, s.cara === "klik" ? rupa : rupa, s.cara, ls.metode), `${nama} ${s.nomor} ${ls.metode}: judul sama dengan suara dan instruksi`);
        if (rupa === "lambang") cek(!/gambar|petak|kisi/i.test([...teks, LC.kalimatKunci(ls.langkah, s.cara), LC.petunjukSalah(ls.langkah, s.cara, "x")].join(" ")), `${nama} ${s.nomor} ${ls.metode}: umpan balik Abstract tanpa menyebut gambar, petak, atau kisi`);
        const d = LC.dasarDari(ls.langkah);
        const pecahDasar = d.tipe === "bagi" ? [pc(d.P, d.Q)] : [pc(d.p, d.q)];
        const seed = ls.langkah.tipe === "salah" && ls.langkah.dasar.p === 2 && ls.langkah.dasar.q === 3;
        cek(seed || pecahDasar.every((x) => !CERITA.includes(x)), `${nama} ${s.nomor} ${ls.metode}: data berbeda dari Story (${pecahDasar})`);
        const k = LC.kunciJawab(ls.langkah, s.cara);
        cek(k !== null, `${nama} ${s.nomor} ${ls.metode}: ada jawaban benar untuk cara ${s.cara}`);
        sama(k, jawabanBenar(d, s.cara), `${nama} ${s.nomor} ${ls.metode}: jawaban benar dihitung dari data`);
        cek(LC.siapLangsung(ls.langkah, rupa, s.cara) === (ls.langkah.tipe !== "salah"), `${nama} ${s.nomor} ${ls.metode}: tugas langsung siap dijawab kecuali Cari kesalahan`);
        // Pecahan sungguh sama besar menurut hitungan silang.
        if (d.tipe === "ekuiv") cek(d.p * d.q * d.m === d.p * d.q * d.m && LC.hasilEkuiv(d)[0] * d.q === LC.hasilEkuiv(d)[1] * d.p, `${nama} ${s.nomor}: pecahan ekuivalen sama besar`);
        if (d.tipe === "daerah") cek(Number.isInteger((d.p * d.r) / d.q) && d.r % d.q === 0 && d.r <= 21 && d.p < d.q, `${nama} ${s.nomor}: kain bawah dibagi kelipatan penyebut, bagian arsir bulat (${d.r})`);
        if (d.tipe === "bagi") cek(d.P % d.d === 0 && d.Q % d.d === 0, `${nama} ${s.nomor}: pembagi membagi habis keduanya`);
        if (s.cara === "kanvas") {
          cek(k.jenis === "angka" && k.n >= 1 && k.n <= 9, `${nama} ${s.nomor} ${ls.metode}: jawaban kanvas satu angka 1 sampai 9 (${k.n})`);
          kunciKanvas.push(k.n);
        }
        if (s.cara === "klik") {
          const p = LC.pilihanKlik(ls.langkah);
          cek(p.length === 3 && new Set(p).size === 3 && p.includes(k.nama) && p[0] !== k.nama && p.every((x) => /^\d+\/\d+$/.test(x)), `${nama} ${s.nomor} ${ls.metode}: tiga pilihan pecahan unik, benar bukan yang pertama (${p})`);
          cek(LC.teksKunciKlik(ls.langkah) === k.nama, `${nama} ${s.nomor} ${ls.metode}: teks pilihan benar`);
          if (ls.langkah.tipe === "salah") cek(p.includes(ls.langkah.jawabTokoh) || ls.langkah.jawabTokoh === k.nama, `${nama} ${s.nomor}: jawaban tokoh ikut sebagai pilihan`);
        }
        if (s.cara === "suara") {
          const p = LC.pilihanSuara(ls.langkah, "suara");
          const benar = k.jenis === "angka" ? LC.kataBil(k.n) : k.nama;
          cek(p.length === 3 && new Set(p).size === 3 && p.includes(benar) && p[0] !== benar && p.every(tanpaDigit), `${nama} ${s.nomor} ${ls.metode}: tiga pilihan ketuk cadangan, benar bukan yang pertama (${p})`);
          cek(K.cocokUcapan(benar, k).cocok, `${nama} ${s.nomor} ${ls.metode}: ucapan benar dikenali`);
          if (k.jenis === "angka") cek(k.n >= 1 && k.n <= 30, `${nama} ${s.nomor} ${ls.metode}: jawaban suara bilangan pendek (${k.n})`);
        }
        const kal = LC.kalimatKunci(ls.langkah, s.cara);
        cek(/^[A-Z]/.test(kal) && !/ [.,!?]/.test(kal) && tanpaDigit(LC.ucapkan(kal)) && LC.ucapkan(kal).length > 10, `${nama} ${s.nomor} ${ls.metode}: kalimat jawaban benar diawali huruf kapital, tanpa spasi sebelum tanda baca, bisa diucapkan tanpa digit`);
        cek(tanpaDigit(LC.kalimatTanya(ls.langkah, s.cara)), `${nama} ${s.nomor} ${ls.metode}: pertanyaan tanpa digit`);
      }
    }
    sama(kunciKanvas, KANVAS[nama], `${nama}: angka jawaban kanvas`);
    cek(new Set(kunciKanvas).size === kunciKanvas.length, `${nama}: angka jawaban kanvas tidak kembar`);
    // Cari kesalahan.
    const ls = soal[0].langkah[0];
    const l = ls.langkah;
    cek(l.tipe === "salah" && l.alasan.length === 3 && new Set(l.alasan).size === 3 && l.benar >= 0 && l.benar <= 2 && l.alasan.every(bersih) && l.alasan.every((a) => /^[A-Z]/.test(a) && !/ [.,!?]/.test(a)), `${nama}: tugas Cari kesalahan lengkap (tiga alasan unik, diawali huruf kapital)`);
    cek(tanpaDigit(l.keliru) && bersih(l.keliru) && bersih(l.kataTokoh) && ["Satria", "Laras", "Genta"].includes(l.tokoh), `${nama}: petunjuk salah tanpa digit, tokoh Kelas 4`);
    cek(tanpaDigit(LC.petunjukSalah(l, "klik", l.jawabTokoh)) && LC.petunjukSalah(l, "klik", l.jawabTokoh).includes(l.tokoh), `${nama}: petunjuk menyebut jawaban tokoh`);
    cek(LC.instruksi(l, "benda", "klik", "igil").includes(l.tokoh), `${nama}: instruksi menyebut tokoh`);
    cek(l.dasar.tipe === "ekuiv" && LC.kunciJawab(l, "klik").nama === pc(l.dasar.p * l.dasar.m, l.dasar.q * l.dasar.m), `${nama}: Cari kesalahan memakai pecahan sama besar yang dihitung`);
    cek(!!l.betul === (l.jawabTokoh === LC.kunciJawab(l, "klik").nama), `${nama}: tanda betul sesuai jawaban tokoh`);
    if (nama === "Concrete") cek(!l.betul && l.tokoh === "Satria" && l.jawabTokoh === "3/4" && l.dasar.p === 2 && l.dasar.q === 3 && /ditambah/.test(l.kataTokoh), "Concrete: Satria menambah satu pada dua per tiga menjadi tiga per empat (salah), seed alur");
    if (nama === "Pictorial") cek(l.betul === true && l.tokoh === "Genta" && /dikali/.test(l.kataTokoh), "Pictorial: Genta mengalikan pembilang dan penyebut dengan bilangan sama (benar), seed alur");
    if (nama === "Abstract") cek(!l.betul && l.tokoh === "Satria", "Abstract: Satria salah (hanya pembilang dikali)");
  }
  const posisi = [D.CONCRETE, D.PICTORIAL, D.ABSTRACT].map((s) => s[0].langkah[0].langkah.benar);
  cek(new Set(posisi).size >= 2, `posisi alasan benar bervariasi antar tahap (${posisi})`);
  // Petunjuk salah tidak membocorkan: tidak memuat jawaban benar dalam kata.
  for (const [nama, [rupa, soal]] of Object.entries(TAHAP))
    for (const s of soal)
      for (const ls of s.langkah) {
        const k = LC.kunciJawab(ls.langkah, s.cara);
        const petunjuk = LC.petunjukSalah(ls.langkah, s.cara, "x");
        cek(!(k.jenis === "angka" && petunjuk.includes(LC.kataBil(k.n))) && !(k.jenis === "nama" && /^[a-z]+$/.test(k.nama) && s.cara === "suara" && new RegExp(`\\b${k.nama}\\b`).test(petunjuk)), `${nama} ${s.nomor} ${ls.metode}: petunjuk salah tidak menyebut jawaban benar`);
      }
  // Petunjuk Cari kesalahan tidak memuat alasan benar atau hasil benar: pesan di komponen hanya mengarahkan.
  const lj = readFileSync(new URL("LangkahJahit.tsx", folder), "utf8");
  cek(/Pikirkan lagi apa yang \$\{l\.tokoh\} lakukan/.test(lj) && !/salah\(`Lihat lagi\. \$\{l\.keliru\}`\)/.test(lj) && !/Alasan itu belum tepat\. \$\{l\.keliru\}/.test(lj), "Cari kesalahan: pesan setelah salah hanya mengarahkan, tanpa alasan atau hasil benar");
  cek(/Betul! \$\{kapital\(/.test(lj), "Cari kesalahan: pembenaran setelah Betul! diawali huruf kapital");
  cek(/petunjukSalah\(l\.dasar/.test(readFileSync(new URL("logika-cpa.ts", folder), "utf8")), "petunjuk salah untuk jawaban lain memakai tugas dasar");
}

/* ------------------------------ Poin penting dan tema ------------------------------ */
{
  cek(D.POIN_PENTING.length === 6 && D.POIN_PENTING.every((p) => bersih(p) && p.length > 20), "poin penting: enam poin bersih");
  cek(D.POIN_PENTING_SUARA.length === 6 && D.POIN_PENTING_SUARA.every(tanpaDigit), "poin penting: suara tanpa digit");
  cek(D.POIN_PENTING_SUARA[0].includes("satu per dua sama besar dengan dua per empat") && /menjaga besar/.test(D.POIN_PENTING[3]) && /Menyederhanakan/.test(D.POIN_PENTING[4]), "poin penting: memuat sama besar, mengalikan atau membagi, dan menyederhanakan");
  cek(/Pak Bagas/.test(D.PENUTUP_C) && /koma/.test(D.PENUTUP_C) && tanpaDigit(D.PENUTUP_C) && bersih(D.PENUTUP_C), "jembatan ke Sub-Bab D: Pak Bagas dan koma");
  for (const r of ["concrete", "pictorial", "abstract"]) cek(emojiSah(D.TEMA_JAHIT[r].ikon) && D.TEMA_JAHIT[r].nama.length > 5 && bersih(D.TEMA_JAHIT[r].cara), `tema ${r} sah`);
  cek(D.CONCRETE_JAHIT === D.CONCRETE && D.PICTORIAL_JAHIT === D.PICTORIAL && D.ABSTRACT_JAHIT === D.ABSTRACT, "nama ekspor untuk pemasang");
}

/* ------------------------------ Berkas: batas rupa, emoji, kata terlarang, akhir baris ------------------------------ */
{
  const berkas = readdirSync(folder).filter((f) => /\.(ts|tsx)$/.test(f));
  for (const f of ["data.ts", "data-peta.ts", "data-info.ts", "PetaJahit.tsx", "InfoJahit.tsx", "data-sim.ts", "logika.ts", "logika-cpa.ts", "periksa.ts", "GambarJahit.tsx", "JawabJahit.tsx", "LangkahJahit.tsx", "TahapJahit.tsx", "SimulasiMejaJahit.tsx", "MejaJahit.tsx", "DaftarJahit.tsx"]) cek(berkas.includes(f), `${f} ada`);
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folder), "utf8");
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d || c.codePointAt(0) === 0x1f6de || IKAN.includes(c.codePointAt(0))), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ dan tanpa ikan`);
    cek(!/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}|\\u\{1F41F\}|\\u\{1F420\}|\\u\{1F421\}|\\u\{1F988\}|\\u\{1F42C\}|\\u\{1F38F\}/i.test(s), `${f}: kode emoji tidak melewati U+1FA95 dan tanpa ikan`);
    cek(!/\\u\{1FA74\}|\\u\{1F39F\}|\\u\{2602\}|\\u\{1FA9F\}|\\u\{1FAA3\}|\\u\{2702\}|\\u\{2716\}/i.test(s) && ![...s].some((c) => [0x1fa74, 0x1f39f, 0x2602, 0x1fa9f, 0x1faa3].includes(c.codePointAt(0))), `${f}: tanpa emoji yang tampil kosong atau hitam`);
    cek(!s.startsWith("﻿") && !s.includes("\r") && ![...s].some((c) => c.codePointAt(0) < 32 && c !== "\n" && c !== "\t"), `${f}: tanpa BOM, akhir baris LF, tanpa karakter kontrol`);
    cek(!/\b(Kelas 4|Kelas Empat)\b/.test(s.replace(/\/\*[\s\S]*?\*\/|\/\/[^\n]*/g, "")), `${f}: tanpa tulisan Kelas 4 di layar atau suara`);
  }
  const gambar = readFileSync(new URL("GambarJahit.tsx", folder), "utf8");
  cek((gambar.match(/EMOJI_JAHIT\./g) ?? []).length === 3 && /rupa !== "benda"\) return null/.test(gambar), "Concrete: emoji benda hanya pada rupa benda (tiga pemakaian dalam DekorBenda)");
  const emojiJahit = /export const EMOJI_JAHIT[^=]*=\s*\{([\s\S]*?)\};/.exec(gambar)?.[1] ?? "";
  cek([...emojiJahit.matchAll(/"([^"]+)"/g)].length === 3, "EMOJI_JAHIT terbaca");
  cek(/arsir=\{d\.p\}/.test(gambar) && /q=\{d\.q\}/.test(gambar) && /q=\{b\}/.test(gambar) && /const lebar = w \/ q/.test(gambar) && /i < arsir/.test(gambar), "gambar: batang kain dibagi q bagian sama besar dan arsiran sungguh sebanyak pembilang");
  cek(!/\u{1F41F}|\u{1F420}|\u{1F421}|\u{1F988}/u.test(gambar), "gambar: tanpa ikan");
  const tahap = readFileSync(new URL("TahapJahit.tsx", folder), "utf8");
  cek(/TahapJahit/.test(tahap) && /poinPenting/.test(tahap) && /PENUTUP_C/.test(tahap) && /export default function TahapJahit/.test(tahap), "TahapJahit: Poin Penting dan jembatan di akhir tahap Abstract");
  const tanpaKomentar = (t) => t.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/[^\n]*/g, "");
  cek(!/skor|nilai/i.test(tanpaKomentar(tahap)) && !/nilai/i.test(tanpaKomentar(gambar)), "tahap dan gambar: tanpa skor dan nilai");
  cek(/rupa === "benda" \? `\$\{IKON_METODE/.test(tahap), "Pictorial dan Abstract: label tugas tanpa ikon metode");
  cek(/siapLangsung/.test(lj0()) && /JawabTulis/.test(lj0()) && /JawabSuaraJahit/.test(lj0()) && /CariSalah/.test(lj0()), "LangkahJahit: jawaban langsung siap, kanvas, suara, dan Cari kesalahan");
  for (const f of ["MejaJahit.tsx", "DaftarJahit.tsx"]) {
    const s = readFileSync(new URL(f, folder), "utf8");
    cek(/export default function/.test(s) && /export \{ \w+K4B2 \}/.test(s) && /speakGuru/.test(s) && /onLanjut/.test(s) && /teksLanjut/.test(s), `${f}: pembungkus tipis dengan ekspor K4B2`);
  }
  const sim = readFileSync(new URL("SimulasiMejaJahit.tsx", folder), "utf8");
  cek(/export default function SimulasiMejaJahit/.test(sim) && /onKeadaan/.test(sim) && /hurufBesar/.test(sim) && /setCatatan\(ucap \?\? ""\)/.test(sim), "SimulasiMejaJahit: laporan keadaan, pesan lama dikosongkan saat pilihan berganti, umpan balik berhuruf besar");
  const lg = readFileSync(new URL("logika.ts", folder), "utf8");
  cek(/Alat menolak/.test(lg) && !/from "react"/.test(lg), "logika: pesan alat menolak dan tanpa React");
  const misiSim = readFileSync(new URL("../src/components/modul/SimulasiK4Bab2.tsx", import.meta.url), "utf8");
  cek(/misiDaftar: daftarMisiJahit\("C"\)/.test(misiSim) && /SimulasiMejaJahit/.test(misiSim) && /laporMisiJahit\(daftarMisiJahit\("C"\), k, a\.capai\)/.test(misiSim), "SimulasiK4Bab2: Sub-Bab C memakai misiDaftar dan melaporkan keadaan");
  for (const f of [...berkas, "data-sim.ts"]) {
    const s = readFileSync(new URL(f, folder), "utf8").replace(/\/\*[\s\S]*?\*\/|\/\/[^\n]*/g, "");
    const teksLayar = [...s.matchAll(/"([^"\n]{12,})"/g)].map((m) => m[1]).filter((t) => /\s/.test(t) && !/^[.\/@a-z-]+$/.test(t) && !/^(min|rounded|border|flex|text|bg|space|block|mx|w-|h-|grid|px|py|absolute|relative|shrink|disabled|animate|font|items|justify|gap|max|inline|my-)/.test(t) && !/[(){}=;]/.test(t));
    cek(teksLayar.every(bersih), `${f}: teks tanpa kata terlarang (${teksLayar.find((t) => !bersih(t)) ?? ""})`);
  }
}
function lj0() {
  return readFileSync(new URL("LangkahJahit.tsx", folder), "utf8");
}

console.log(`Uji Meja Jahit Kelas 4 Bab 2 Sub-Bab C: ${lulus} lulus, ${gagal} gagal`);
process.exit(gagal ? 1 : 0);
