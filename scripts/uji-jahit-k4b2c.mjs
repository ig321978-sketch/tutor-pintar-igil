// Uji Mind-map (Meja Jahit), Infografis (Nota Pesanan), Simulasi Meja Jahit, dan tahap Concrete, Pictorial, Abstract Kelas 4 Bab 2 Sub-Bab C ("Meja Jahit Kak Sekar"),
// cerita Sanggar Batik Kampung Mekar (pecahan yang sama besar: dikali atau dibagi bilangan sama pada pembilang dan penyebut, menyederhanakan).
// Memeriksa: logika simulasi (arsir kain bawah sungguh sebanyak bagian yang diminta, kali dengan alat menolak cara tambah, bagi dengan alat menolak pembagi yang tidak membagi habis,
// pasang kartu yang sama besar), misi (awal tidak memenuhi, wajib empat, bebas dua, tolak hanya dari cara tambah), sembilan kartu geser Masalah, Cara, Hasil memuat semua metode Story,
// nota pesanan dari kejadian Story, CPA dua belas langkah per tahap (Klik, Kanvas, Suara x empat metode) dengan jawaban beragam dan Cari kesalahan di tiap tahap, jawaban benar dihitung dari data,
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
const DK = await import("../src/components/modul/jahit-k4b2c/data-kartu.ts");
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

/* ------------------------------ Mind-map: meja jahit (sembilan kartu geser) ------------------------------ */
{
  const KA = DK.KARTU_JAHIT;
  cek(KA.length === 9, "kartu: sembilan kartu");
  cek(KA.every((k) => k.contoh.length <= 1) && KA[0].contoh.join() === "masalah" && KA.slice(1).every((k) => k.contoh.length === 0), "kartu: satu kotak contoh di kartu pertama saja, sisanya mandiri");
  const semua = KA.flatMap((k) => [k.masalah, k.cara, k.hasil]);
  const label = semua.map((x) => x.label);
  cek(new Set(label).size === label.length, "kartu: label unik");
  cek(semua.every((x) => x.label.length >= 5 && x.label.length <= 36), `kartu: label pendek (terpanjang ${Math.max(...label.map((l) => l.length))} huruf)`);
  cek(label.every((l) => l.split(/\s+/).every((w) => w.length <= 12)) && label.every((l) => l.split(/\s+/).length <= 6), "kartu: kata label paling banyak dua belas huruf dan label paling banyak enam kata (muat di 344 piksel)");
  cek(semua.every((x) => tanpaDigit(x.label) && tanpaDigit(x.arti) && bersih(x.label) && bersih(x.arti) && x.arti.length > 10), "kartu: label dan arti tanpa digit dan kata terlarang");
  cek(KA.every((k) => tanpaDigit(k.judul) && bersih(k.judul) && k.judul.length > 3), "kartu: judul bersih");
  cek(["Cocokkan Daerah", "Kali Bentuk Satu", "Bagi Keduanya"].every((m, i) => KA[6 + i].cara.label === m), "kartu: tiga metode global di tiga kartu terakhir dengan nama Indonesia");
  const gab = KA.map((k) => [k.judul, k.masalah.label, k.cara.label, k.hasil.label, k.masalah.arti, k.cara.arti, k.hasil.arti].join(" ")).join(" ").toLowerCase();
  for (const s of ["sama besar", "tumpuk", "menambah", "kalikan", "bagi", "sederhana", "pembilang", "penyebut", "bilangan yang sama", "arsiran"]) cek(gab.includes(s), `kartu: memuat poin "${s}"`);
  cek(!new RegExp("\\b(satria|laras|genta|pak hendro|kak sekar|pak bagas|kancing|mesin|benang|baju|meja)\\b", "i").test(gab), "kartu: hanya poin pelajaran (tanpa tokoh dan benda cerita)");
  cek(tanpaDigit(DK.SUARA_KARTU_JAHIT + DK.SELESAI_KARTU_JAHIT) && bersih(DK.SUARA_KARTU_JAHIT + DK.SELESAI_KARTU_JAHIT), "kartu: suara dan pesan selesai tanpa digit dan kata terlarang");
  cek(emojiSah(DK.TEMA_KARTU_JAHIT.ikon) && DK.TEMA_KARTU_JAHIT.judul.length > 5, "kartu: tema sah");
  const RG = DK.RINGKASAN_JAHIT;
  const luarTema = [0x1f6d1, 0x1f39f, 0x1fa74, 0x2602, 0x1f9a0];
  cek(RG.ikon.length === DK.KARTU_JAHIT.length && new Set(RG.ikon).size === RG.ikon.length && [...RG.ikon, RG.pusat].every((e) => emojiSah(e) && !/[A-Za-z0-9]/.test(e) && ![...e].some((c) => IKAN.includes(c.codePointAt(0)) || luarTema.includes(c.codePointAt(0)))), "peta radial: satu gambar unik per kartu, gambar sah tanpa huruf dan tanpa ikan");
  cek([RG.pusat, ...RG.ikon].every((e) => [...e].length === 1) && ![...RG.ikon, RG.pusat].some((e) => ["\u{2702}", "\u{2716}", "\u{2602}"].includes(e)), "peta radial: tiap gambar satu karakter emoji berwarna, tanpa yang tampil hitam");
  cek(tanpaDigit(RG.suara) && bersih(RG.suara) && !RG.ikon.includes(RG.pusat), "peta radial: suara bersih dan pusat berbeda dari cabang");
  const ikonTema = new Set(["\u{1F9F5}", "\u{1F4D1}", "\u{2795}", "\u{1F522}", "\u{2797}", "\u{270B}", "\u{1F4D0}", "\u{1F380}", "\u{1F4CF}", "\u{1F457}"]);
  cek([...RG.ikon, RG.pusat].every((e) => ikonTema.has(e)), "peta radial: ikon sesuai tema jahit, kain, dan pecahan (tanpa benda di luar tema)");
}

/* ------------------------------ Infografis: nota pesanan (satu tabel lima baris) ------------------------------ */
{
  const B = DK.BARIS_INFO_JAHIT;
  cek(B.length === 5 && DK.KOLOM_INFO_JAHIT.length === 3, "infografis: lima baris dan tiga kolom");
  cek(B.every((b) => b.isi.length === 3 && emojiSah(b.ikon) && b.nama.length > 4), "infografis: tiap baris tiga isian, emoji sah");
  cek(B.map((b) => b.contoh.length).join() === "3,0,0,0,0", "infografis: baris satu penuh contoh, baris dua sampai lima mandiri");
  const semua = B.flatMap((b) => b.isi);
  cek(B.every((b) => new Set(b.isi.map((x) => x.t)).size === 3) && new Set(semua.map((x) => x.t)).size === semua.length, "infografis: semua label unik");
  cek(semua.every((x) => x.t.length <= 28 && x.t.split(/\s+/).length <= 5 && x.t.split(/\s+/).every((w) => w.length <= 12) && bersih(x.t) && bersih(x.s ?? "") && tanpaDigit(x.s ?? x.t)), "infografis: label pendek (paling banyak lima kata, tiap kata paling banyak dua belas huruf), tanpa kata terlarang dan tanpa digit");
  cek(B.every((b) => b.nama.split(/\s+/).every((w) => w.length <= 16)), "infografis: nama baris muat");
  const gab = B.map((b) => [b.nama, ...b.isi.map((x) => x.t)].join(" ")).join(" ").toLowerCase();
  for (const s of ["menumpuk potongan", "menambah angka", "mengalikan", "membagi", "sederhanakan", "pecahan sama besar", "besar berubah", "besar tetap sama", "tak bisa dibagi lagi"]) cek(gab.includes(s), `infografis: memuat "${s}"`);
  cek(!new RegExp("\\b(satria|laras|genta|pak hendro|kak sekar)\\b", "i").test(gab), "infografis: tanpa nama tokoh");
  cek(tanpaDigit(DK.SUARA_INFO_JAHIT + DK.SELESAI_INFO_JAHIT) && bersih(DK.SUARA_INFO_JAHIT + DK.SELESAI_INFO_JAHIT) && emojiSah(DK.TEMA_INFO_JAHIT.ikon), "infografis: suara dan tema bersih");
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
  for (const f of ["data.ts", "data-kartu.ts", "data-sim.ts", "logika.ts", "logika-cpa.ts", "periksa.ts", "GambarJahit.tsx", "JawabJahit.tsx", "LangkahJahit.tsx", "TahapJahit.tsx", "SimulasiMejaJahit.tsx", "MejaJahit.tsx", "DaftarJahit.tsx"]) cek(berkas.includes(f), `${f} ada`);
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
