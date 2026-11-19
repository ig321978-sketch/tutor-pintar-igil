// Uji Mind-map (Rangka Layang-layang), Infografis (Daftar Bilah), Simulasi Meja Bilah, dan tahap Concrete, Pictorial, Abstract Kelas 3 Bab 4 Sub-Bab A ("Rangka Layang-layang Bu Ratih"),
// awal cerita Festival Layang-layang Kampung (titik, sinar garis, garis, ruas garis, kurva, ukuran cm dan mm, sisi bangun datar).
// Memeriksa: logika simulasi (tarik ujung dan kenali jenis, benang terpendek, geser bilah ke angka nol dengan alat menolak membaca sebelum nol, ubah satuan, beri huruf dan hitung sisi),
// misi (awal tidak memenuhi, wajib empat, bebas dua), rangka layang-layang (sembilan kartu geser Masalah, Cara, Hasil memuat semua metode Story), daftar bilah dari kejadian Story,
// CPA dua belas langkah per tahap (Klik, Kanvas, Suara x empat metode) dengan jawaban beragam dan Cari kesalahan di tiap tahap, jawaban benar dihitung dari data, angka jawaban tidak kembar per tahap,
// tugas yang langsung siap (jebakan tombol macet), pengenal ucapan, petunjuk salah, batas rupa, emoji, kata terlarang, akhir baris.
// Jalankan: node --no-warnings scripts/uji-bilah-k3b4a.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/bilah-k3b4a/logika.ts");
const DS = await import("../src/components/modul/bilah-k3b4a/data-sim.ts");
const DK = await import("../src/components/modul/bilah-k3b4a/data-kartu.ts");
const LC = await import("../src/components/modul/bilah-k3b4a/logika-cpa.ts");
const D = await import("../src/components/modul/bilah-k3b4a/data.ts");
const K = await import("../src/components/modul/bilah-k3b4a/periksa.ts");
const S = await import("../src/components/modul/misi-simulasi.ts");
const MK = await import("../src/components/modul/misi-k3bab4.ts");
const MT = await import("../src/components/modul/misi-teks-k3b4.ts");
const folderUrl = new URL("../src/components/modul/bilah-k3b4a/", import.meta.url);
/** Benda beremoji pada GambarBilah.tsx (kunci EMOJI_BENDA), dibaca dari teks karena berkas tsx tidak bisa diimpor di Node. */
const DG_EMOJI = {};
{
  const gu = readFileSync(new URL("GambarBilah.tsx", folderUrl), "utf8");
  const blok = /export const EMOJI_BENDA[^=]*=\s*\{([\s\S]*?)\n\};/.exec(gu)?.[1] ?? "";
  for (const m of blok.matchAll(/(?:"([^"]+)"|([a-z]+)):\s*"/g)) DG_EMOJI[m[1] ?? m[2]] = "\u{1F300}";
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
const emojiSah = (s) => [...s].every((c) => c.codePointAt(0) <= 0x1fa95 && c.codePointAt(0) !== 0x200d && c.codePointAt(0) !== 0x1f6de);
const adaEmoji = (s) => /\p{Extended_Pictographic}/u.test(s);
/** Ukuran yang dipakai Story A dalam milimeter dan sentimeter (jangan dijadikan data CPA atau Simulasi, kecuali Cari kesalahan yang memakai seed dari alur). */
const CERITA_MM = new Set([55, 30, 300, 100]);
const CERITA_CM = new Set([3, 5]);

/* ------------------------------ Kata bilangan ------------------------------ */
{
  sama([0, 1, 9, 10, 11, 15, 20, 38, 100, 305].map(LC.kataBil), ["nol", "satu", "sembilan", "sepuluh", "sebelas", "lima belas", "dua puluh", "tiga puluh delapan", "seratus", "tiga ratus lima"], "kata bilangan CPA");
  cek(LC.kata === LC.kataBil, "alias kata");
  for (let n = 1; n <= 150; n += 1) cek(tanpaDigit(LC.kataBil(n)) && LC.kataBil(n) === L.kata(n), `kata bilangan ${n} sama di simulasi dan CPA`);
  sama([LC.ucapkan("45 mm"), LC.ucapkan("7 cm"), LC.ucapkan("70 mm"), LC.ucapkan("garis")], ["empat puluh lima milimeter", "tujuh sentimeter", "tujuh puluh milimeter", "garis"], "ucapkan: angka dan satuan menjadi kata");
  sama([LC.kataSat("cm"), LC.kataSat("mm"), LC.kataSat("sisi")], ["sentimeter", "milimeter", "sisi"], "kata satuan");
}

/* ------------------------------ Simulasi: data dan logika ------------------------------ */
{
  const ukuran = [...DS.TARGET_UKUR.flatMap((t) => [t.awal, t.panjang, t.awal + t.panjang]), ...DS.TARGET_UBAH.flatMap((t) => [t.cm * 10 + t.mm])];
  cek(ukuran.every((n) => n >= 5 && n <= 100 && !CERITA_MM.has(n)), `simulasi: semua ukuran milimeter berbeda dari Story (${ukuran.filter((n) => CERITA_MM.has(n))})`);
  cek(DS.TARGET_UBAH.every((t) => !CERITA_CM.has(t.cm) && t.cm >= 1 && t.cm <= 9 && t.mm >= 1 && t.mm <= 9) && DS.TARGET_UBAH.some((t) => t.bentuk === "mm") && DS.TARGET_UBAH.some((t) => t.bentuk === "desimal"), "simulasi: ukuran sentimeter berbeda dari Story, bentuk milimeter dan desimal ada");
  cek(DS.SKALA_BILAH === 100 && DS.TARGET_UKUR.length === 3 && DS.TARGET_UKUR.every((t) => t.awal >= 5 && t.awal % 5 === 0 && t.panjang % 5 === 0 && t.awal + t.panjang <= DS.SKALA_BILAH), "simulasi: tiga bilah kelipatan lima milimeter, masih muat di penggaris seratus milimeter");
  cek(DS.TARGET_KENALI.length === 4 && new Set(DS.TARGET_KENALI.map((t) => t.jenis)).size === 4, "simulasi: empat jenis garis untuk Kenali");
  cek(DS.TARGET_JALAN.length === 3 && DS.TARGET_JALAN.every((u) => new Set(u).size === 3 && u.includes("lurus")) && new Set(DS.TARGET_JALAN.map((u) => u.indexOf("lurus"))).size === 3, "simulasi: tiga sasaran Jalan, benang lurus di tempat berbeda");
  cek(DS.TARGET_SISI.length === 3 && DS.TARGET_SISI.some((t) => t.huruf.length === 0) && DS.TARGET_SISI.every((t) => new Set(t.huruf).size === t.huruf.length) && !DS.TARGET_SISI.some((t) => /EFG/.test(t.huruf.join(""))), "simulasi: tiga bangun, satu bundar, huruf berbeda dari Story");
  cek(tanpaDigit(DS.MISI_BILAH_TEKS) && bersih(DS.MISI_BILAH_TEKS) && DS.MISI_BILAH_TEKS === MT.MISI_K3B4.A && D.MISI_BILAH_TEKS === DS.MISI_BILAH_TEKS && DS.MISI_BILAH_TEKS.length >= 10 && DS.MISI_BILAH_TEKS.length <= 120, "simulasi: teks misi tanpa digit dan kata terlarang, sama dengan misi-teks-k3b4");

  const a = L.awalBilah();
  cek(a.alat === "bilah" && a.mode === "kenali" && a.posisi === 20 && !L.diNol(a) && !a.tolak && !a.sudahBaca && ["kenaliBenar", "jalanBenar", "ukurBenar", "ubahBenar", "sisiBenar"].every((f) => a[f].length === 0) && a.salah === 0 && a.huruf === 0, "simulasi: keadaan awal");
  // Kenali.
  cek(L.targetKenali(a).jenis === "ruas garis", "kenali: sasaran pertama ruas garis");
  for (let i = 0; i < 4; i += 1) {
    const k = { ...a, kenaliKe: i };
    const benar = DS.TARGET_KENALI[i].jenis;
    const p = L.pilihanKenali(k);
    cek(p.length === 3 && new Set(p).size === 3 && p.includes(benar) && p[0] !== benar && tanpaDigit(L.petunjukKenali(L.pilihKenali(k, 0))), `kenali: pilihan sasaran ${i} unik, benar bukan yang pertama (${p})`);
  }
  const r1 = L.tarikUjung(a, "kiri");
  cek(!r1.ok && r1.k.tarikTolak && !r1.k.tarikKiri && r1.k.salah === 0 && /dua titik ujung/.test(r1.pesan) && tanpaDigit(r1.pesan), "kenali: ruas garis tidak bisa ditarik, bukan percobaan keliru");
  const sinar = { ...a, kenaliKe: 1 };
  cek(!L.tarikUjung(sinar, "kiri").ok && /pangkal/.test(L.tarikUjung(sinar, "kiri").pesan) && L.tarikUjung(sinar, "kanan").ok && L.tarikUjung(sinar, "kanan").k.tarikKanan, "kenali: sinar garis hanya bisa ditarik dari ujung bebas (kanan)");
  const garis = { ...a, kenaliKe: 2 };
  cek(L.tarikUjung(garis, "kiri").ok && L.tarikUjung(L.tarikUjung(garis, "kiri").k, "kanan").k.tarikKiri && L.tarikUjung(garis, "kanan").ok, "kenali: garis bisa ditarik ke dua arah");
  const kurva = { ...a, kenaliKe: 3 };
  cek(!L.tarikUjung(kurva, "kanan").ok && /melengkung/.test(L.tarikUjung(kurva, "kanan").pesan), "kenali: kurva tidak menjadi garis lurus");
  sama(S.misiBaru(MK.MISI_A, r1.k, new Set()), [], "kenali: menarik ujung saja belum memenuhi misi");
  cek(/Pilih satu nama/.test(L.petunjukKenali(a)) && !L.periksaKenali(a).ok, "kenali: tanpa pilihan tidak benar");
  const pk = L.pilihanKenali(a);
  const salahK = L.periksaKenali(L.pilihKenali(a, pk.findIndex((x) => x !== "ruas garis")));
  cek(!salahK.ok && salahK.k.salah === 1 && salahK.k.kenaliBenar.length === 0, "kenali: nama keliru");
  const betulK = L.periksaKenali(L.pilihKenali({ ...a, tarikKiri: true, tarikTolak: true }, pk.indexOf("ruas garis")));
  cek(betulK.ok && betulK.k.kenaliBenar.join() === "0" && betulK.k.kenaliKe === 1 && betulK.k.kenaliPilih === -1 && !betulK.k.tarikKiri && !betulK.k.tarikTolak && L.targetKenali(betulK.k).jenis === "sinar garis", "kenali: nama tepat membuka gambar berikutnya dan menyegarkan tarikan");
  sama(S.misiBaru(MK.MISI_A, betulK.k, new Set()), ["a-kenali"], "kenali: misi a-kenali");
  cek(L.pilihKenali(a, 7).kenaliPilih === -1 && tanpaDigit(L.kalimatKenali(a)) && tanpaDigit(L.kalimatKenali(betulK.k)), "kenali: pilihan di luar daftar diabaikan, kalimat tanpa digit");
  // Jalan.
  const uj = L.urutanJalan(a);
  cek(uj.indexOf("lurus") === 1 && !L.periksaJalan(a).ok && /Pilih satu benang/.test(L.petunjukJalan(a)), "jalan: benang lurus di tempat kedua, tanpa pilihan tidak benar");
  const salahJ = L.periksaJalan(L.pilihJalan(a, 0));
  cek(!salahJ.ok && salahJ.k.salah === 1 && /paling pendek/.test(L.petunjukJalan(L.pilihJalan(a, 0))) && tanpaDigit(L.petunjukJalan(L.pilihJalan(a, 0))), "jalan: benang melengkung keliru");
  const betulJ = L.periksaJalan(L.pilihJalan(a, 1));
  cek(betulJ.ok && betulJ.k.jalanBenar.join() === "0" && betulJ.k.jalanKe === 1 && betulJ.k.jalanPilih === -1, "jalan: benang lurus tepat membuka sasaran berikutnya");
  sama(S.misiBaru(MK.MISI_A, betulJ.k, new Set()), ["a-jalan"], "jalan: misi a-jalan");
  cek(L.pilihJalan(a, 3).jalanPilih === -1 && tanpaDigit(L.kalimatJalan(a)) && tanpaDigit(L.kalimatJalan(betulJ.k)), "jalan: pilihan di luar daftar diabaikan");
  // Ukur.
  cek(L.ujungKananBilah(a) === 85 && L.targetUkur(a).benda === "bilah rangka", "ukur: ujung kanan bilah");
  const t1 = L.geserBilah(a, -5);
  cek(t1.ok && t1.k.posisi === 15 && L.ujungKananBilah(t1.k) === 80, "ukur: bilah digeser lima milimeter ke kiri");
  cek(!L.geserBilah({ ...a, posisi: 0 }, -5).ok && !L.geserBilah({ ...a, posisi: 35 }, 5).ok && L.geserBilah({ ...a, posisi: 30 }, 5).ok, "ukur: tidak bisa melewati nol dan ujung penggaris");
  const tolak = L.bacaUkur(a);
  cek(!tolak.ok && tolak.k.tolak === true && tolak.k.salah === 0 && !tolak.k.sudahBaca, "ukur: alat menolak membaca sebelum ujung kiri di nol (bukan percobaan keliru)");
  sama(S.misiBaru(MK.MISI_A, tolak.k, new Set()), ["a-tolak"], "ukur: misi a-tolak");
  cek(/Geser bilah ke kiri/.test(L.petunjukUkur(a)) && tanpaDigit(L.petunjukUkur(a)) && !L.periksaUkur(a).ok, "ukur: petunjuk saat belum di nol menunjuk langkah yang belum dilakukan");
  let g = a;
  for (let i = 0; i < 4; i += 1) g = L.geserBilah(g, -5).k;
  cek(L.diNol(g) && L.ujungKananBilah(g) === 65 && /Tekan Baca/.test(L.petunjukUkur(g)) && !L.periksaUkur(g).ok, "ukur: di nol tetapi belum membaca, petunjuk menunjuk langkah yang belum dilakukan");
  const bc = L.bacaUkur(g);
  cek(bc.ok && bc.k.sudahBaca && !bc.k.tolak, "ukur: di nol, alat mau membaca");
  const pg = L.pilihanUkur(bc.k);
  cek(pg.length === 3 && new Set(pg).size === 3 && pg.includes(65) && pg.includes(85) && pg[0] !== 65 && pg.every((x) => x >= 5 && x <= 100), `ukur: pilihan unik, memuat bacaan sebelum digeser (85), jawaban benar bukan yang pertama (${pg})`);
  for (let i = 0; i < 3; i += 1) cek(L.pilihanUkur({ ...a, ukurKe: i })[0] !== DS.TARGET_UKUR[i].panjang && L.pilihanUkur({ ...a, ukurKe: i }).includes(DS.TARGET_UKUR[i].panjang) && new Set(L.pilihanUkur({ ...a, ukurKe: i })).size === 3, `ukur: pilihan sasaran ${i} unik dan benar bukan yang pertama`);
  cek(/Pilih satu bacaan/.test(L.petunjukUkur(bc.k)) && !L.periksaUkur(bc.k).ok, "ukur: tanpa pilihan tidak benar");
  const salahU = L.periksaUkur(L.pilihUkur(bc.k, pg.findIndex((x) => x !== 65)));
  cek(!salahU.ok && salahU.k.salah === 1 && salahU.k.ukurBenar.length === 0, "ukur: bacaan keliru");
  const betulU = L.periksaUkur(L.pilihUkur(bc.k, pg.indexOf(65)));
  cek(betulU.ok && betulU.k.ukurBenar.join() === "0" && betulU.k.ukurKe === 1 && betulU.k.posisi === 25 && !betulU.k.sudahBaca && betulU.k.ukurPilih === -1 && L.targetUkur(betulU.k).benda === "bilah silang", "ukur: bacaan tepat membuka bilah berikutnya di posisi awalnya");
  sama(S.misiBaru(MK.MISI_A, betulU.k, new Set()), ["a-ukur"], "ukur: misi a-ukur");
  cek(L.pilihUkur(a, 0).ukurPilih === -1 && L.pilihUkur(bc.k, 9).ukurPilih === -1, "ukur: memilih sebelum membaca atau di luar daftar diabaikan");
  cek(!L.periksaUkur({ ...bc.k, posisi: 5, ukurPilih: pg.indexOf(65) }).ok && L.geserBilah(bc.k, 5).k.sudahBaca === false, "ukur: bilah yang digeser lagi dari nol tidak dihitung, menggeser membatalkan bacaan");
  cek(tanpaDigit(L.kalimatUkur(a)) && tanpaDigit(L.kalimatUkur(g)) && tanpaDigit(L.kalimatUkur(betulU.k)) && L.kalimatPosisi(a) === "Ujung kiri di dua puluh milimeter, ujung kanan di delapan puluh lima milimeter.", "ukur: kalimat tanpa digit");
  let tiga = a;
  for (let i = 0; i < 3; i += 1) {
    while (!L.diNol(tiga)) tiga = L.geserBilah(tiga, -5).k;
    tiga = L.bacaUkur(tiga).k;
    const p = L.pilihanUkur(tiga);
    tiga = L.periksaUkur(L.pilihUkur(tiga, p.indexOf(L.targetUkur(tiga).panjang))).k;
  }
  cek(tiga.ukurBenar.join() === "0,1,2" && L.targetUkur(tiga).benda === "bilah rangka", "ukur: tiga bilah berturut-turut lalu kembali ke bilah pertama");
  // Ubah.
  sama(L.pilihanUbah(a), ["705 mm", "12 mm", "75 mm"], "ubah: milimeter, yang benar bukan yang pertama");
  const u2 = { ...a, ubahKe: 1 };
  sama(L.pilihanUbah(u2), ["45 cm", "4,5 cm", "4,05 cm"], "ubah: sentimeter desimal, yang benar bukan yang pertama");
  cek(L.teksBenarUbah(a) === "75 mm" && L.teksBenarUbah(u2) === "4,5 cm" && L.teksBenarUbah({ ...a, ubahKe: 2 }) === "85 mm", "ubah: tulisan benar dihitung dari data");
  for (let i = 0; i < 3; i += 1) cek(L.pilihanUbah({ ...a, ubahKe: i })[0] !== L.teksBenarUbah({ ...a, ubahKe: i }) && new Set(L.pilihanUbah({ ...a, ubahKe: i })).size === 3, `ubah: pilihan sasaran ${i} unik dan benar bukan yang pertama`);
  cek(/Pilih satu tulisan/.test(L.petunjukUbah(a)) && !L.periksaUbah(a).ok && /sepuluh/.test(L.petunjukUbah(L.pilihUbah(a, 0))) && tanpaDigit(L.petunjukUbah(L.pilihUbah(a, 0))) && tanpaDigit(L.petunjukUbah(L.pilihUbah(u2, 0))), "ubah: tanpa pilihan tidak benar, petunjuk menyebut sepuluh");
  const salahUb = L.periksaUbah(L.pilihUbah(a, 0));
  cek(!salahUb.ok && salahUb.k.salah === 1, "ubah: seratus milimeter keliru");
  const betulUb = L.periksaUbah(L.pilihUbah(a, 2));
  cek(betulUb.ok && betulUb.k.ubahBenar.join() === "0" && betulUb.k.ubahKe === 1 && betulUb.k.ubahPilih === -1, "ubah: tulisan tepat membuka ukuran berikutnya");
  sama(S.misiBaru(MK.MISI_A, betulUb.k, new Set()), ["a-ubah"], "ubah: misi a-ubah");
  cek(L.pilihUbah(a, 5).ubahPilih === -1 && tanpaDigit(L.kalimatUbah(a)) && tanpaDigit(L.kalimatUbah(betulUb.k)), "ubah: pilihan di luar daftar diabaikan");
  // Sisi.
  cek(L.banyakSisiSim(a) === 4 && !L.periksaSisi(a).ok && /Beri huruf pada semua titik sudut/.test(L.petunjukSisi(a)), "sisi: sebelum diberi huruf tidak benar, petunjuk menunjuk langkah yang belum dilakukan");
  let h = a;
  for (let i = 0; i < 4; i += 1) {
    const r = L.beriHuruf(h);
    cek(r.ok && r.k.huruf === i + 1, `sisi: huruf ke-${i + 1} diberikan`);
    h = r.k;
  }
  cek(!L.beriHuruf(h).ok && L.sisiBernama(h).join() === "PQ,QR,RS,SP", `sisi: empat sisi bernama (${L.sisiBernama(h)})`);
  sama(L.sisiBernama(L.beriHuruf(L.beriHuruf(a).k).k), ["PQ"], "sisi: sisi pertama bernama setelah dua titik sudut");
  cek(L.sisiBernama(a).length === 0, "sisi: tanpa huruf belum ada sisi bernama");
  const ps = L.pilihanSisi(h);
  cek(ps.length === 3 && new Set(ps).size === 3 && ps.includes(4) && ps[0] !== 4, `sisi: tiga pilihan unik, benar bukan yang pertama (${ps})`);
  for (let i = 0; i < 3; i += 1) {
    const n = DS.TARGET_SISI[i].huruf.length;
    const p = L.pilihanSisi({ ...a, sisiKe: i });
    cek(p.length === 3 && new Set(p).size === 3 && p.includes(n) && p[0] !== n && p.every((x) => x >= 0), `sisi: pilihan sasaran ${i} unik dan benar bukan yang pertama (${p})`);
  }
  cek(/Pilih satu jumlah/.test(L.petunjukSisi(h)) && !L.periksaSisi(h).ok, "sisi: tanpa pilihan tidak benar");
  const salahS = L.periksaSisi(L.pilihSisi(h, ps.findIndex((x) => x !== 4)));
  cek(!salahS.ok && salahS.k.salah === 1 && /ruas garis/.test(L.petunjukSisi(L.pilihSisi(h, 0))) && tanpaDigit(L.petunjukSisi(L.pilihSisi(h, 0))), "sisi: jumlah keliru");
  const betulS = L.periksaSisi(L.pilihSisi(h, ps.indexOf(4)));
  cek(betulS.ok && betulS.k.sisiBenar.join() === "0" && betulS.k.sisiKe === 1 && betulS.k.huruf === 0 && betulS.k.sisiPilih === -1 && L.banyakSisiSim(betulS.k) === 5, "sisi: jumlah tepat membuka bangun berikutnya");
  sama(S.misiBaru(MK.MISI_A, betulS.k, new Set()), ["a-sisi"], "sisi: misi a-sisi");
  const bund = { ...a, sisiKe: 2 };
  cek(L.banyakSisiSim(bund) === 0 && !L.beriHuruf(bund).ok && L.periksaSisi(L.pilihSisi(bund, L.pilihanSisi(bund).indexOf(0))).ok && /bundar/.test(L.kalimatSisi(bund)) && /kurva/.test(L.petunjukSisi(L.pilihSisi(bund, 0))), "sisi: bangun bundar tidak punya sisi lurus dan tidak perlu huruf");
  cek(L.pilihSisi(a, 4).sisiPilih === -1 && tanpaDigit(L.kalimatSisi(a)) && tanpaDigit(L.kalimatSisi(h)) && tanpaDigit(L.kalimatSisi(betulS.k)), "sisi: pilihan di luar daftar diabaikan, kalimat tanpa digit");
  // Mulai lagi dan ganti alat.
  cek(L.mulaiLagiBilah().ukurKe === 0 && L.mulaiLagiBilah().posisi === 20 && !L.mulaiLagiBilah().tolak && L.pilihModeBilah(a, "sisi").mode === "sisi", "mulai lagi dan ganti alat");
  // Misi.
  const A = MK.MISI_A;
  cek(A.filter((m) => m.wajib).length === 4 && A.filter((m) => !m.wajib).length === 2, "misi A: empat wajib, dua bebas");
  cek(new Set(A.map((m) => m.id)).size === 6 && A.every((m) => m.id.startsWith("a-") && m.teks.length >= 10 && m.teks.length <= 120 && tanpaDigit(m.teks) && bersih(m.teks)), "misi A: id berawalan a-, unik, 10 sampai 120 huruf, tanpa digit");
  sama(MK.daftarMisiK3Bab4("A"), A, "daftarMisiK3Bab4 A");
  cek(A.every((m) => !m.cek({ alat: "kerangka" })), "misi A: alat lain tidak memenuhi misi");
  sama(S.misiBaru(A, a, new Set()), [], "misi A: keadaan awal tanpa misi baru");
  cek(S.misiBaru(A, { ...a, salah: 9, mode: "sisi", posisi: 0, sudahBaca: true, kenaliPilih: 2, tarikKiri: true, jalanPilih: 1, ukurPilih: 1, ubahPilih: 2, huruf: 3, sisiPilih: 0 }, new Set()).length === 0, "misi A: pilihan yang belum diperiksa dan bilah yang digeser tidak dihitung sebagai misi");
}

/* ------------------------------ Mind-map: rangka layang-layang (sembilan kartu geser) ------------------------------ */
{
  const KA = DK.KARTU_BILAH;
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
  for (const m of ["Cari yang Beda", "Ukur Dua Kali", "Beri Nama Huruf", "Dua titik ujung", "Lihat ujungnya", "Kurva melengkung", "Dibagi sepuluh bagian", "Ujung di angka nol", "Tulis dengan satuan"]) cek(cara.toLowerCase().includes(m.toLowerCase()), `kartu: cara memuat ${m}`);
  const gab = KA.map((k) => [k.judul, k.masalah.label, k.cara.label, k.hasil.label, k.masalah.arti, k.cara.arti, k.hasil.arti].join(" ")).join(" ").toLowerCase();
  for (const s of ["ruas garis", "sinar garis", "garis", "kurva", "sentimeter", "milimeter", "angka nol", "satuan", "sisi", "titik ujung", "sepuluh"]) cek(gab.includes(s), `kartu: memuat poin "${s}"`);
  cek(!new RegExp("\\b(raka|salsa|bima|pak joko|bu ratih|bilah|bambu|layang|benang|paku|segitiga efg)\\b", "i").test(gab), "kartu: hanya poin pelajaran (tanpa tokoh dan benda cerita)");
  cek(tanpaDigit(DK.SUARA_KARTU_BILAH + DK.SELESAI_KARTU_BILAH) && bersih(DK.SUARA_KARTU_BILAH + DK.SELESAI_KARTU_BILAH), "kartu: suara dan pesan selesai tanpa digit dan kata terlarang");
  cek(emojiSah(DK.TEMA_KARTU_BILAH.ikon) && DK.TEMA_KARTU_BILAH.judul.length > 5, "kartu: tema sah");
  const RG = DK.RINGKASAN_BILAH;
  cek(RG.ikon.length === DK.KARTU_BILAH.length && new Set(RG.ikon).size === RG.ikon.length && [...RG.ikon, RG.pusat].every((e) => emojiSah(e) && !/[A-Za-z0-9]/.test(e)), "peta radial: satu gambar unik per kartu, gambar sah tanpa huruf");
  cek(tanpaDigit(RG.suara) && bersih(RG.suara) && !RG.ikon.includes(RG.pusat), "peta radial: suara bersih dan pusat berbeda dari cabang");
}

/* ------------------------------ Infografis: daftar bilah (satu tabel lima baris) ------------------------------ */
{
  const B = DK.BARIS_INFO_BILAH;
  cek(B.length === 5 && DK.KOLOM_INFO_BILAH.length === 3, "infografis: lima baris dan tiga kolom");
  cek(B.every((b) => b.isi.length === 3 && emojiSah(b.ikon) && b.nama.length > 4), "infografis: tiap baris tiga isian, emoji sah");
  const jumlahContoh = B.map((b) => b.contoh.length);
  cek(jumlahContoh[0] === 3 && jumlahContoh.slice(1).every((n) => n === 0), "infografis: baris satu penuh contoh, baris dua sampai lima mandiri");
  const semua = B.flatMap((b) => b.isi);
  cek(B.every((b) => new Set(b.isi.map((x) => x.t)).size === 3), "infografis: tiga label tiap baris berbeda");
  cek(new Set(semua.map((x) => x.t)).size === semua.length, "infografis: semua label unik");
  cek(semua.every((x) => x.t.length <= 28 && x.t.split(/\s+/).length <= 5 && bersih(x.t) && bersih(x.s ?? "")), "infografis: label pendek (paling banyak lima kata) dan tanpa kata terlarang");
  cek(semua.every((x) => tanpaDigit(x.s ?? x.t)), "infografis: ucapan label tanpa digit");
  const gab = B.map((b) => [b.nama, ...b.isi.map((x) => x.t)].join(" ")).join(" ").toLowerCase();
  for (const s of ["mengenali jenis garis", "mengukur ruas garis", "mengubah satuan", "memeriksa ukuran", "menyebut sisi", "ujung di angka nol", "panjang terbaca", "ukur dua kali", "beri nama huruf", "kali sepuluh", "milimeter didapat"]) cek(gab.includes(s), `infografis: memuat "${s}"`);
  cek(!new RegExp("\\b(raka|salsa|bima|pak joko|bu ratih)\\b", "i").test(gab), "infografis: tanpa nama tokoh");
  cek(tanpaDigit(DK.SUARA_INFO_BILAH + DK.SELESAI_INFO_BILAH) && bersih(DK.SUARA_INFO_BILAH + DK.SELESAI_INFO_BILAH) && emojiSah(DK.TEMA_INFO_BILAH.ikon), "infografis: suara dan tema bersih");
}

/* ------------------------------ Pengenal ucapan ------------------------------ */
{
  const nm = (nama) => ({ jenis: "nama", nama });
  const an = (n) => ({ jenis: "angka", n });
  for (const nama of ["sinar garis", "garis", "ruas garis", "kurva", "sama", "berbeda"]) cek(K.cocokUcapan(nama, nm(nama)).cocok && K.kataDariUcapan(nama).length === 1, `cocok: kata ${nama} dikenali tepat satu`);
  sama(K.kataDariUcapan("sinar garis"), ["sinar garis"], "ucapan: sinar garis bukan garis");
  sama(K.kataDariUcapan("ruas garis"), ["ruas garis"], "ucapan: ruas garis bukan garis");
  sama(K.kataDariUcapan("garis"), ["garis"], "ucapan: garis");
  sama(K.kataDariUcapan("tidak sama"), [], "ucapan: tidak sama tidak dihitung");
  sama(K.kataDariUcapan("beda"), ["berbeda"], "ucapan: beda dikenali sebagai berbeda");
  sama(K.kataDariUcapan("halo"), [], "ucapan: kata lain tidak dikenali");
  cek(!K.cocokUcapan("sinar garis", nm("garis")).cocok && !K.cocokUcapan("ruas garis", nm("garis")).cocok && !K.cocokUcapan("garis", nm("ruas garis")).cocok && !K.cocokUcapan("sama", nm("berbeda")).cocok && !K.cocokUcapan("kurva", nm("garis")).cocok, "cocok: kata berbeda tidak cocok");
  sama(K.angkaDariUcapan("lima"), [5], "angka: lima");
  sama(K.angkaDariUcapan("sembilan, 4 dan tiga"), [9, 4, 3], "angka: satuan dan angka tertulis");
  sama(K.angkaDariUcapan("tujuh puluh milimeter"), [70], "angka: tujuh puluh milimeter");
  sama(K.angkaDariUcapan("enam puluh lima"), [65], "angka: enam puluh lima");
  sama(K.angkaDariUcapan("seratus"), [100], "angka: seratus");
  sama(K.angkaDariUcapan("empat ratus"), [400], "angka: empat ratus");
  sama(K.angkaDariUcapan("tujuh ratus lima"), [705], "angka: tujuh ratus lima");
  sama(K.angkaDariUcapan("25"), [25], "angka: 25 tertulis");
  sama(K.angkaDariUcapan("nol"), [0], "angka: nol");
  for (let n = 0; n <= 150; n += 1) cek(K.angkaDariUcapan(LC.kataBil(n)).join() === String(n), `angka: kata bilangan ${n} dikenali utuh (${LC.kataBil(n)} -> ${K.angkaDariUcapan(LC.kataBil(n))})`);
  cek(K.cocokUcapan("lima", an(5)).cocok && K.cocokUcapan("5", an(5)).cocok && !K.cocokUcapan("enam", an(5)).cocok, "cocok: bilangan lima");
  cek(K.cocokUcapan("dua puluh satu milimeter", an(21)).cocok && !K.cocokUcapan("dua puluh satu", an(1)).cocok && !K.cocokUcapan("tiga puluh satu", an(21)).cocok, "cocok: bilangan dua angka dikenali utuh");
}

/* ------------------------------ CPA ------------------------------ */
const TAHAP = { Concrete: ["benda", D.CONCRETE], Pictorial: ["diagram", D.PICTORIAL], Abstract: ["lambang", D.ABSTRACT] };
const CARA = ["klik", "kanvas", "suara"];
const METODE = ["igil", "beda", "dua", "huruf"];
const SALAH_DASAR = { Concrete: "jenis", Pictorial: "baca", Abstract: "sisi" };
/** Jenis tugas dasar yang diharapkan per cara dan urutan metode. */
const tipeHarapan = (nama, cara) => ({ klik: [SALAH_DASAR[nama], "beda", "dua", "sisi"], kanvas: ["baca", "beda", "dua", "sisi"], suara: ["ubah", "beda", "dua", "sisi"] })[cara];
const semuaTeksLangkah = (ls, rupa, cara) => [ls.judul, ls.suara, LC.instruksi(ls.langkah, rupa, cara, ls.metode), LC.kalimatTanya(ls.langkah, cara), LC.kalimatKunci(ls.langkah, cara), LC.petunjukSalah(ls.langkah, cara, 1)];
const BANYAK = { segitiga: 3, persegi: 4, "persegi panjang": 4, segilima: 5, segienam: 6, lingkaran: 0 };
{
  sama(LC.URUT_METODE, METODE, "urutan metode");
  cek(LC.NAMA_METODE.igil.includes("Kenali, Ukur dari Nol, Beri Nama Huruf") && LC.NAMA_METODE.beda.includes("Odd One Out") && LC.NAMA_METODE.dua.includes("Measure Twice") && LC.NAMA_METODE.huruf.includes("Label and Name"), "nama metode IGIL dan tiga metode global");
  cek(METODE.every((m) => emojiSah(LC.IKON_METODE[m])), "ikon metode sah");
  let nomor = 2;
  for (const [nama, [rupa, soal]] of Object.entries(TAHAP)) {
    cek(soal.length === 3 && soal.map((s) => s.cara).join() === CARA.join(), `${nama}: tiga misi Klik, Kanvas, Suara`);
    cek(soal.every((s) => s.langkah.length === 4 && s.langkah.map((l) => l.metode).join() === METODE.join()), `${nama}: empat langkah per misi (IGIL, Odd One Out, Measure Twice, Label and Name)`);
    for (const s of soal) {
      cek(s.nomor === nomor, `${nama}: nomor misi berlanjut ${nomor}`);
      nomor += 1;
      cek(s.judul.startsWith("Misi Rangka") && s.cerita.length > 15 && bersih(s.judul) && bersih(s.cerita), `${nama} ${s.nomor}: judul dan cerita sah`);
      sama(s.langkah.map((l) => LC.dasarDari(l.langkah).tipe), tipeHarapan(nama, s.cara), `${nama} ${s.nomor}: jenis tugas per metode`);
      for (const ls of s.langkah) {
        cek(ls.cara === s.cara, `${nama} ${s.nomor}: cara langkah sama dengan misi`);
        const teks = semuaTeksLangkah(ls, rupa, s.cara);
        cek(teks.every((t) => tanpaDigit(t) && bersih(t)), `${nama} ${s.nomor} ${ls.metode}: teks tanpa digit dan kata terlarang (${teks.find((t) => !tanpaDigit(t) || !bersih(t)) ?? ""})`);
        cek(emojiSah(teks.join("")), `${nama} ${s.nomor} ${ls.metode}: emoji sah`);
        cek(ls.judul === ls.suara && ls.judul === LC.instruksi(ls.langkah, rupa, s.cara, ls.metode), `${nama} ${s.nomor} ${ls.metode}: judul dan suara sama dengan instruksi`);
        // Batas rupa: Pictorial dan Abstract tanpa emoji benda di teks tugas.
        if (rupa !== "benda") cek(!adaEmoji(teks.join(" ")), `${nama} ${s.nomor} ${ls.metode}: teks tugas tanpa emoji (batas rupa)`);
        cek(/Metode IGIL|Odd One Out|Measure Twice|Label and Name|sudah menjawab/.test(ls.judul), `${nama} ${s.nomor} ${ls.metode}: judul tugas memuat nama metode`);
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
      const kunciS = LC.kunciJawab(x, "klik");
      cek(kunciS !== null, `${nama}: jawaban sendiri ada`);
      const teksBenar = LC.teksKunciKlik(x);
      if (x.betul) cek(String(teksBenar) === String(x.jawabTokoh), `${nama}: jawaban tokoh yang benar sama dengan jawaban benar`);
      else cek(String(teksBenar) !== String(x.jawabTokoh), `${nama}: jawaban benar berbeda dari jawaban tokoh`);
      cek(LC.petunjukSalah(x, "klik", x.jawabTokoh).startsWith(`Itu jawaban ${x.tokoh}`) || x.betul === true, `${nama}: petunjuk menjelaskan kesalahan tokoh`);
    }
  }
  cek(nomor === 11, "nomor misi berlanjut sampai sepuluh");
  sama(Object.values(TAHAP).map(([, soal]) => soal[0].langkah[0].langkah.dasar.tipe), ["jenis", "baca", "sisi"], "Cari kesalahan: mengenali jenis garis (Concrete), membaca penggaris milimeter (Pictorial), menghitung sisi benda bundar (Abstract)");
  cek(Object.values(TAHAP).every(([, soal]) => !soal[0].langkah[0].langkah.betul), "Cari kesalahan: ketiganya jawaban tokoh yang keliru");
  const sC = D.CONCRETE[0].langkah[0].langkah;
  cek(sC.tokoh === "Salsa" && sC.dasar.jenis === "sinar garis" && sC.jawabTokoh === "garis" && LC.teksKunciKlik(sC) === "sinar garis", "Cari kesalahan Concrete: sinar senter disebut garis, yang benar sinar garis (seed alur)");
  const sP = D.PICTORIAL[0].langkah[0].langkah;
  cek(sP.tokoh === "Raka" && sP.dasar.ujung === 40 && sP.jawabTokoh === "400 mm" && LC.teksKunciKlik(sP) === "40 mm", "Cari kesalahan Pictorial: empat sentimeter disebut empat ratus milimeter, yang benar 40 mm (seed alur)");
  const sA = D.ABSTRACT[0].langkah[0].langkah;
  cek(sA.tokoh === "Raka" && sA.dasar.bangun.nama === "lingkaran" && sA.jawabTokoh === "1 sisi" && LC.teksKunciKlik(sA) === "0 sisi", "Cari kesalahan Abstract: tutup bundar satu sisi, yang benar 0 sisi (seed alur)");
  // Posisi alasan benar (rumus di LangkahBilah): tidak selalu tombol pertama.
  {
    const posisiAlasan = (x) => Array.from(`${x.tokoh}${x.kataTokoh}${x.alasan[x.benar]}`).reduce((t, c) => t + c.charCodeAt(0), 0) % 3;
    const pos = Object.values(TAHAP).map(([, soal]) => {
      const x = soal[0].langkah[0].langkah;
      const lain = [0, 1, 2].filter((i) => i !== x.benar);
      const p = posisiAlasan(x);
      return [...lain.slice(0, p), x.benar, ...lain.slice(p)].indexOf(x.benar);
    });
    cek(new Set(pos).size >= 2 && pos.some((p) => p !== 0), `Cari kesalahan: posisi alasan benar tidak selalu pertama (${pos})`);
  }
  // Batas isi tiap tugas.
  for (const [nama, [rupa, soal]] of Object.entries(TAHAP))
    for (const s of soal)
      for (const ls of s.langkah) {
        const d = LC.dasarDari(ls.langkah);
        const tag = `${nama} ${s.nomor} ${ls.metode}`;
        const seed = ls.langkah.tipe === "salah";
        cek(typeof d.benda === "string" && d.benda.length >= 3, `${tag}: benda bernama`);
        if (rupa === "benda") cek(!!DG_EMOJI[d.benda], `${tag}: Concrete memakai benda beremoji (${d.benda})`);
        if (d.tipe === "baca") {
          cek(d.ujung <= 100 && d.ujung > d.mulai && d.mulai === 0 && d.ujung % 5 === 0, `${tag}: membaca penggaris dari nol, kelipatan lima milimeter (${d.ujung})`);
          if (d.sat === "cm") cek(d.ujung % 10 === 0 && d.ujung >= 10 && !CERITA_CM.has(d.ujung / 10), `${tag}: sentimeter penuh berbeda dari Story`);
          else if (!seed) cek(false, `${tag}: baca milimeter hanya untuk Cari kesalahan`);
          if (!seed) cek(!CERITA_MM.has(d.ujung), `${tag}: ukuran berbeda dari Story`);
        }
        if (d.tipe === "ubah") cek(d.cm >= 2 && d.cm <= 9 && !CERITA_CM.has(d.cm), `${tag}: sentimeter yang diubah berbeda dari Story (${d.cm})`);
        if (d.tipe === "dua") {
          cek(d.panjang % 5 === 0 && d.panjang >= 20 && d.awal % 10 === 0 && d.awal + d.panjang <= 100 && !CERITA_MM.has(d.panjang) && !CERITA_MM.has(d.awal) && !CERITA_MM.has(d.awal + d.panjang), `${tag}: ukuran dua kali sah dan berbeda dari Story (${d.panjang}, ${d.awal})`);
          cek((d.awal === 0) === (s.cara === "suara" && LC.kunciJawab(d, "suara").nama === "sama"), `${tag}: ukuran kedua dari nol hanya pada jawaban sama`);
          if (s.cara !== "suara") cek(d.awal >= 10, `${tag}: kanvas dan klik memakai ukuran kedua yang tidak dari nol`);
        }
        if (d.tipe === "beda") {
          const hitung = {};
          for (const j of d.gambar) hitung[j] = (hitung[j] ?? 0) + 1;
          cek(Object.values(hitung).sort().join() === "1,3" && hitung[d.gambar[d.beda]] === 1 && d.beda >= 0 && d.beda <= 3, `${tag}: tiga gambar sejenis dan satu berbeda di nomor ${d.beda + 1}`);
          cek(LC.jenisSama(d) !== d.gambar[d.beda], `${tag}: jenis sama berbeda dari jenis yang berbeda`);
        }
        if (d.tipe === "sisi") {
          cek(BANYAK[d.bangun.nama] === d.bangun.huruf.length && new Set(d.bangun.huruf).size === d.bangun.huruf.length && d.bangun.huruf.every((h) => /^[A-Z]$/.test(h)), `${tag}: bangun ${d.bangun.nama} dengan huruf titik sudut unik`);
          cek(!/EFG/.test(d.bangun.huruf.join("")), `${tag}: huruf berbeda dari Story`);
          cek(LC.banyakSisi(d.bangun) === BANYAK[d.bangun.nama], `${tag}: banyak sisi dihitung dari bangun`);
        }
      }
  // Tiap metode tampak di tiap tahap: tiap tahap memuat semua jenis tugas.
  for (const [nama, [, soal]] of Object.entries(TAHAP)) {
    const tipe = new Set(soal.flatMap((s) => s.langkah.map((l) => LC.dasarDari(l.langkah).tipe)));
    cek(["baca", "ubah", "beda", "dua", "sisi"].every((t) => tipe.has(t)), `${nama}: jenis tugas baca, ubah, beda, dua, sisi ada`);
    const satu = new Set(soal.flatMap((s) => s.langkah.map((l) => LC.satuanDari(LC.dasarDari(l.langkah), s.cara))));
    cek(satu.has("cm") && satu.has("mm") && satu.has("sisi"), `${nama}: sentimeter, milimeter, dan sisi ada`);
    const bangunNama = new Set(soal.flatMap((s) => s.langkah.map((l) => LC.dasarDari(l.langkah)).filter((d) => d.tipe === "sisi").map((d) => d.bangun.nama)));
    cek(bangunNama.size >= 3, `${nama}: tiga bangun berbeda atau lebih (${[...bangunNama]})`);
    const jenisBeda = new Set(soal.flatMap((s) => s.langkah.map((l) => LC.dasarDari(l.langkah)).filter((d) => d.tipe === "beda").map((d) => d.gambar[d.beda])));
    cek(jenisBeda.size === 3, `${nama}: tiga jenis berbeda yang dicari (${[...jenisBeda]})`);
  }
}

/* ------------------------------ Tugas dihitung dari data ------------------------------ */
{
  const nama = (k) => (k ? (k.jenis === "nama" ? k.nama : k.n) : null);
  const bangunPQRS = { nama: "persegi panjang", huruf: ["P", "Q", "R", "S"] };
  // Jawaban benar tiap jenis tugas dihitung dari data.
  sama(["klik", "kanvas"].map((c) => nama(LC.kunciJawab({ tipe: "baca", benda: "x", mulai: 0, ujung: 80, sat: c === "klik" ? "mm" : "cm" }, c))), [80, 8], "kunci baca: milimeter atau sentimeter penuh");
  sama(nama(LC.kunciJawab({ tipe: "ubah", benda: "x", cm: 7 }, "suara")), 70, "kunci ubah: kali sepuluh");
  sama(["klik", "suara"].map((c) => nama(LC.kunciJawab({ tipe: "jenis", benda: "x", jenis: "kurva" }, c))), ["kurva", "kurva"], "kunci jenis");
  sama(["klik", "kanvas", "suara"].map((c) => nama(LC.kunciJawab({ tipe: "beda", benda: "x", gambar: ["ruas garis", "garis", "ruas garis", "ruas garis"], beda: 1 }, c))), ["garis", 2, "garis"], "kunci beda: nama jenis, nomor, nama jenis");
  sama(["klik", "kanvas", "suara"].map((c) => nama(LC.kunciJawab({ tipe: "dua", benda: "x", panjang: 45, awal: 20 }, c))), [45, 2, "berbeda"], "kunci dua: panjang, selisih sentimeter, berbeda");
  sama(nama(LC.kunciJawab({ tipe: "dua", benda: "x", panjang: 45, awal: 0 }, "suara")), "sama", "kunci dua: sama bila dari nol juga");
  sama(["klik", "kanvas", "suara"].map((c) => nama(LC.kunciJawab({ tipe: "sisi", benda: "x", bangun: bangunPQRS }, c))), ["QR", 4, 4], "kunci sisi: nama sisi, banyak sisi, banyak sisi");
  sama(["klik", "kanvas", "suara"].map((c) => nama(LC.kunciJawab({ tipe: "sisi", benda: "x", bangun: { nama: "lingkaran", huruf: [] } }, c))), [0, 0, 0], "kunci sisi: lingkaran tanpa sisi lurus");
  sama([LC.maksSkala(40), LC.maksSkala(95), LC.maksSkala(100), LC.maksSkala(110)], [10, 10, 10, 12], "skala penggaris");
  sama([LC.satuanDari({ tipe: "baca", benda: "x", mulai: 0, ujung: 40, sat: "mm" }), LC.satuanDari({ tipe: "baca", benda: "x", mulai: 0, ujung: 40, sat: "cm" }), LC.satuanDari({ tipe: "ubah", benda: "x", cm: 4 }), LC.satuanDari({ tipe: "dua", benda: "x", panjang: 5, awal: 0 }, "kanvas"), LC.satuanDari({ tipe: "dua", benda: "x", panjang: 5, awal: 0 }, "klik")], ["mm", "cm", "mm", "cm", "mm"], "satuan tugas");
  // Diagonal dan nama sisi.
  sama(LC.diagonal(bangunPQRS), ["PR", "QS"], "diagonal persegi panjang");
  sama(LC.diagonal({ nama: "segitiga", huruf: ["A", "B", "C"] }), [], "segitiga tanpa diagonal");
  sama([LC.namaSisi(bangunPQRS, 0), LC.namaSisi(bangunPQRS, 3), LC.sisiTanya(bangunPQRS)], ["PQ", "SP", "QR"], "nama sisi");
  // Pengecoh.
  sama(LC.pengecoh({ tipe: "dua", benda: "x", panjang: 45, awal: 20 }, "klik").slice(0, 2), [65, 20], "pengecoh dua: bacaan kedua dan ujung kiri");
  sama(LC.pengecoh({ tipe: "baca", benda: "x", mulai: 0, ujung: 40, sat: "mm" }, "klik", 400).slice(0, 2), [400, 4], "pengecoh baca dengan jawaban tokoh di depan: seratus kali keliru");
  cek(LC.pengecoh({ tipe: "ubah", benda: "x", cm: 7 }, "suara").every((x) => x !== 70 && x >= 1 && x <= 999), "pengecoh ubah: bukan jawaban benar dan sah");

  for (const [namaT, [rupa, soal]] of Object.entries(TAHAP)) {
    const kanvasAngka = [];
    for (const s of soal)
      for (const ls of s.langkah) {
        const l = ls.langkah;
        const d = LC.dasarDari(l);
        const kunci = LC.kunciJawab(l, s.cara);
        const tag = `${namaT} ${s.nomor} ${ls.metode}`;
        cek(kunci !== null, `${tag}: jawaban benar ada untuk semua tugas`);
        cek(LC.siapLangsung(l, rupa, s.cara) === (l.tipe !== "salah"), `${tag}: siap langsung kecuali Cari kesalahan (tombol tidak macet)`);
        for (const r of ["benda", "diagram", "lambang"]) cek(LC.siapLangsung(l, r, s.cara) === LC.siapLangsung(l, rupa, s.cara), `${tag}: siap langsung tidak bergantung rupa (${r})`);
        if (kunci?.jenis === "angka") {
          if (s.cara === "kanvas") {
            kanvasAngka.push(kunci.n);
            cek(kunci.n >= 1 && kunci.n <= 9, `${tag}: jawaban kanvas satu angka satu sampai sembilan (${kunci.n})`);
            cek(["baca", "beda", "dua", "sisi"].includes(d.tipe), `${tag}: kanvas hanya untuk jawaban angka`);
          }
          if (s.cara === "klik") cek(kunci.n >= 0 && kunci.n <= 999, `${tag}: jawaban klik bilangan sampai sembilan ratus sembilan puluh sembilan`);
          if (s.cara === "suara") cek(kunci.n >= 0 && kunci.n <= 999 && (d.tipe !== "ubah" || kunci.n === d.cm * 10), `${tag}: jawaban suara bilangan pendek`);
        }
        if (kunci?.jenis === "nama") cek(s.cara !== "kanvas" && tanpaDigit(kunci.nama), `${tag}: jawaban nama bukan pada kanvas`);
        // Pilihan klik: tiga pilihan unik, jawaban benar tidak di tombol pertama.
        if (s.cara === "klik" && kunci !== null) {
          const pil = LC.pilihanKlik(l);
          const benar = LC.teksKunciKlik(l);
          cek(pil.length === 3 && new Set(pil).size === 3 && pil.includes(benar) && pil[0] !== benar, `${tag}: pilihan klik unik dan jawaban benar bukan yang pertama (${pil.join("/")})`);
          if (kunci.jenis === "angka") cek(pil.every((p) => /^\d{1,3} (cm|mm|sisi)$/.test(p)) && benar === `${kunci.n} ${LC.satuanDari(d, "klik")}`, `${tag}: pilihan ukuran bersatuan (${pil.join("/")})`);
          else if (d.tipe === "sisi") cek(pil.every((p) => /^[A-Z]{2}$/.test(p)) && pil.filter((p) => LC.diagonal(d.bangun).includes(p)).length === 2 && !pil.filter((p) => p !== benar).some((p) => [...Array(d.bangun.huruf.length).keys()].some((i) => LC.namaSisi(d.bangun, i) === p)), `${tag}: pilihan nama sisi, pengecoh bukan sisi (${pil.join("/")})`);
          else cek(pil.every((p) => ["sinar garis", "garis", "ruas garis", "kurva"].includes(p)), `${tag}: pilihan nama jenis (${pil.join("/")})`);
        }
        if (s.cara === "suara" && kunci !== null) {
          const pil = LC.pilihanSuara(l, "suara");
          const benar = LC.teksKunciPilihan(kunci);
          cek(pil.includes(benar) && pil.length === (d.tipe === "dua" ? 2 : 3) && new Set(pil).size === pil.length && tanpaDigit(pil.join(" ")), `${tag}: pilihan cadangan suara memuat jawaban benar (${pil.join("/")})`);
          cek(pil[0] !== benar, `${tag}: jawaban suara bukan pilihan pertama`);
          cek(K.cocokUcapan(benar, kunci).cocok, `${tag}: ucapan jawaban benar dikenali (${benar})`);
          if (kunci.jenis === "angka") cek(K.cocokUcapan(`${benar} ${LC.kataSat(LC.satuanDari(d, "suara"))}`, kunci).cocok, `${tag}: ucapan dengan satuan juga dikenali`);
          for (const lain of pil.filter((p) => p !== benar)) cek(!K.cocokUcapan(lain, kunci).cocok, `${tag}: ucapan ${lain} bukan jawaban benar`);
        }
        if (kunci) cek(LC.kalimatKunci(l, s.cara).length > 12, `${tag}: kalimat penjelasan ada`);
        // Petunjuk salah menunjuk kesalahan (tidak kosong untuk tiap tugas dan cara).
        cek(LC.petunjukSalah(l, s.cara, "x").length > 20, `${tag}: petunjuk salah ada`);
        if (rupa === "lambang") {
          const baris = LC.barisKartu(d, s.cara);
          cek(Array.isArray(baris) && baris.length >= 3 && baris.every((b) => typeof b === "string" && b.length > 3), `${tag}: kartu kata ada`);
          cek(baris.every((b) => !adaEmoji(b)), `${tag}: kartu kata tanpa emoji`);
        }
      }
    cek(new Set(kanvasAngka).size === kanvasAngka.length && kanvasAngka.length === 4, `${namaT}: empat angka jawaban Tulis di kanvas tidak kembar (${kanvasAngka.join(", ")})`);
  }
  const kv = (nama) => TAHAP[nama][1].filter((s) => s.cara === "kanvas").flatMap((s) => s.langkah.map((l) => LC.kunciJawab(l.langkah, "kanvas").n));
  sama(kv("Concrete"), [6, 3, 2, 5], "angka kanvas Concrete");
  sama(kv("Pictorial"), [8, 2, 4, 6], "angka kanvas Pictorial");
  sama(kv("Abstract"), [7, 1, 6, 5], "angka kanvas Abstract");
  // Tugas suara bervariasi: kata dan bilangan.
  const suaraJenis = Object.values(TAHAP).flatMap(([, soal]) => soal[2].langkah.map((l) => LC.kunciJawab(l.langkah, "suara").jenis));
  cek(suaraJenis.includes("nama") && suaraJenis.includes("angka"), "tugas suara: kata dan bilangan");
  const kataSuara = Object.values(TAHAP).flatMap(([, soal]) => soal[2].langkah.flatMap((l) => (LC.kunciJawab(l.langkah, "suara").jenis === "nama" ? [LC.kunciJawab(l.langkah, "suara").nama] : [])));
  for (const w of ["sinar garis", "garis", "kurva", "sama", "berbeda"]) cek(kataSuara.includes(w), `tugas suara: kata ${w} muncul`);
  // Poin penting dan penutup.
  cek(D.POIN_PENTING.length >= 6 && D.POIN_PENTING.every((p) => p.length > 20 && bersih(p)) && D.POIN_PENTING_SUARA.every((p) => tanpaDigit(p) && !/\b(cm|mm)\b/.test(p) && !/[=<>]/.test(p)), "poin penting: banyak, bersih, suara tanpa digit, singkatan, dan tanda");
  const poin = D.POIN_PENTING.join(" ").toLowerCase();
  for (const m of ["titik", "ruas garis", "sinar garis", "kurva", "sentimeter".slice(0, 0) + "cm", "mm", "angka nol", "satuan", "sisi", "cari yang beda", "ukur dua kali", "beri nama huruf", "terpendek"]) cek(poin.includes(m), `poin penting memuat ${m}`);
  cek(tanpaDigit(D.PENUTUP_A) && bersih(D.PENUTUP_A) && /Kak Anton/.test(D.PENUTUP_A) && /busur derajat/.test(D.PENUTUP_A) && D.PENUTUP_A.endsWith("?"), "penutup A: jembatan ke Sub-Bab B tanpa digit");
  cek(Object.values(D.TEMA_BILAH).every((t) => emojiSah(t.ikon) && t.nama.length >= 7 && t.cara.length > 20 && tanpaDigit(t.cara) && bersih(t.cara)), "tema tiga tahap sah");
  cek(D.TEMA_BILAH.pictorial.cara.includes("polos") && D.TEMA_BILAH.abstract.cara.includes("kartu"), "tema: Pictorial polos, Abstract kartu");
  cek(D.CONCRETE_BILAH === D.CONCRETE && D.PICTORIAL_BILAH === D.PICTORIAL && D.ABSTRACT_BILAH === D.ABSTRACT && D.MISI_BILAH_TEKS === DS.MISI_BILAH_TEKS, "nama ekspor untuk pemasang");
}

/* ------------------------------ Berkas ------------------------------ */
{
  const berkas = readdirSync(folderUrl).filter((f) => /\.(ts|tsx)$/.test(f));
  for (const nama of ["logika.ts", "data-sim.ts", "data-kartu.ts", "logika-cpa.ts", "data.ts", "periksa.ts", "JawabBilah.tsx", "LangkahBilah.tsx", "GambarBilah.tsx", "TahapBilah.tsx", "SimulasiMejaBilah.tsx", "RangkaLayang.tsx", "DaftarBilah.tsx"]) cek(berkas.includes(nama), `berkas ${nama} ada`);
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folderUrl), "utf8");
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d || c.codePointAt(0) === 0x1f6de), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}/i.test(s), `${f}: kode emoji tidak melewati U+1FA95`);
    cek(!/buku|kelompok|bernilai|tebak/i.test(s), `${f}: tanpa kata buku, kelompok, bernilai, tebak`);
    if (/^(logika|logika-cpa|periksa|data|data-sim|data-kartu)\.ts$/.test(f)) cek(!/from "react"|fetch\(/.test(s), `${f}: tanpa React dan jaringan`);
    cek(!/turus-k2b8a|gambar-k2b8b|tempat-k3b1a|kartu-k3b1b|urut-k3b1c|tambah-k3b1d|kurang-k3b1e|kali-k3b1f|bagi-k3b1g|kayu-k3b2a|botol-k3b2b|ukur-k3b3a|pita-k3b3b|timbang-k3b3c|bandul-k3b3d|sudut-k3b4b|lintasan-k3b4c|SubBabK3B4/.test(s), `${f}: tidak memakai folder bab atau sub-bab lain`);
  }
  // Teks layar tidak memuat kata terlarang, termasuk nama berkas data.
  const layar = ["LangkahBilah.tsx", "TahapBilah.tsx", "SimulasiMejaBilah.tsx", "GambarBilah.tsx"].map((f) => readFileSync(new URL(f, folderUrl), "utf8")).join("\n");
  const teksLayar = [...layar.matchAll(/>\s*([^<>{}\n]{4,})\s*</g)].map((m) => m[1]).join(" ");
  cek(!/\b(skor|nilai|soal|tebak|kunci|latihan|teman|kelompok|buku)\b/i.test(teksLayar), "teks layar komponen tanpa kata terlarang");
  cek(/\bTugas\b/.test(layar) && !/>\s*Soal/.test(layar), "teks layar CPA memakai Tugas");
  cek(!/capitalize/.test(layar), "teks layar: tanpa kelas capitalize (cm dan mm tidak menjadi Cm)");
  const th = readFileSync(new URL("TahapBilah.tsx", folderUrl), "utf8");
  cek(/umum: Umum;\s*rupa: Rupa;\s*soal: SoalMisi\[\];\s*pita:/.test(th) && /teksAkhir: string/.test(th) && /poinPenting\?: boolean/.test(th), "TahapBilah: props umum, rupa, soal, pita, teksAkhir, poinPenting");
  cek(/IKON_METODE\[ls\.metode\]/.test(th) && /rupa === "benda" \?/.test(th), "TahapBilah: ikon metode hanya pada rupa benda (Pictorial dan Abstract tanpa emoji metode)");
  cek(/export default function TahapBilah/.test(th) && /Cari kesalahan/.test(th) && /POIN_PENTING/.test(th) && /PENUTUP_A/.test(th), "TahapBilah: ekspor, Cari kesalahan, Poin Penting, jembatan");
  cek(/"bambu"/.test(th) && /"denah"/.test(th) && /"daftar"/.test(th) && !/"cat"|"kapur"|"tikar"|"peta"|"papan"|"rak"|"nota"|"tirai"|"jepit"|"catatan"|"bungkus"|"kain"/.test(th), "TahapBilah: pola visual meja bengkel bambu, kertas denah rangka, papan daftar bengkel (berbeda dari bab sebelumnya)");
  cek(/\u{1FA81}/u.test(th) || /1FA81/.test(th), "TahapBilah: kemajuan Concrete berupa deret layang-layang");
  const lg = readFileSync(new URL("LangkahBilah.tsx", folderUrl), "utf8");
  cek(/export function LangkahBilah/.test(lg) && /JawabSuaraBilah/.test(lg) && /JawabTulis/.test(lg) && /pilihanSuara\(l, cara\)/.test(lg) && /TampilDasar/.test(lg), "LangkahBilah: ekspor, jawab suara dengan pilihan ketuk, jawab tulis di kanvas");
  cek(/ucapkan\(/.test(lg), "LangkahBilah: ucapan memakai kata, bukan digit");
  const jw = readFileSync(new URL("JawabBilah.tsx", folderUrl), "utf8");
  cek(/gagalSekali/.test(jw) && /Ini jawaban yang benar|jawaban yang benar/.test(jw) && /PilihanKata/.test(jw) && /setCadangan\(true\)/.test(jw) && /e\.error === "not-allowed"/.test(jw), "JawabBilah: galat mikrofon dihitung gagal, pilihan ketuk sebagai cadangan, jawaban benar setelah tiga kali salah");
  const gm = readFileSync(new URL("GambarBilah.tsx", folderUrl), "utf8");
  cek(/export function SkalaMm/.test(gm) && /export function TampilDasar/.test(gm) && /rupa === "lambang"/.test(gm) && /EMOJI_BENDA/.test(gm) && /export function JenisSvg/.test(gm) && /export function BangunSvg/.test(gm), "GambarBilah: penggaris milimeter, jenis garis, bangun datar, tampilan dasar, kartu untuk Abstract");
  const sim = readFileSync(new URL("SimulasiMejaBilah.tsx", folderUrl), "utf8");
  cek(/export default function SimulasiMejaBilah/.test(sim) && /onKeadaan/.test(sim) && /MISI_BILAH_TEKS/.test(sim), "SimulasiMejaBilah: ekspor, onKeadaan, teks misi");
  cek(!/>\s*Baca\s*</.test(sim.replace(/\{"\\u\{1F441\}"\} Baca/g, "")) && !/nama: "Baca"/.test(sim), "SimulasiMejaBilah: tidak ada tab dan tombol Baca kembar");
  for (const [f, nm] of [["RangkaLayang.tsx", "RangkaLayangK3B4"], ["DaftarBilah.tsx", "DaftarBilahK3B4"]]) {
    const s = readFileSync(new URL(f, folderUrl), "utf8");
    cek(/speakGuru/.test(s) && /onLanjut/.test(s) && /teksLanjut/.test(s) && /peta-kartu\//.test(s) && new RegExp(`export default function ${nm}`).test(s) && new RegExp(`export \\{ ${nm} \\}`).test(s), `${f}: pembungkus tipis komponen bersama peta-kartu, ekspor ${nm}`);
  }
  // Berkas bersama: Simulasi memasang Meja Bilah.
  const sk = readFileSync(new URL("../src/components/modul/SimulasiK3Bab4.tsx", import.meta.url), "utf8");
  cek(/SimulasiMejaBilah/.test(sk) && /laporMisiBilah\(daftarMisiK3Bab4\("A"\), k, a\.capai\)/.test(sk) && !/judulBab=\{`Kelas/.test(sk), "SimulasiK3Bab4: langkahMejaBilahA memasang Meja Bilah, judul bab tanpa kata Kelas");
  // Berkas lama yang dipertahankan ada (dipakai bab lain dan bank soal).
  for (const f of ["data-k3b4.ts", "naskah-k3b4.ts", "eja-k3b4.ts", "dasar-k3b4b.tsx", "dasar-k3b4c.tsx"]) cek(readdirSync(new URL("../src/components/modul/", import.meta.url)).includes(f), `berkas lama ${f} dipertahankan`);
  const ej = readFileSync(new URL("../src/lib/ejaan-inggris-id.ts", import.meta.url), "utf8");
  cek(/odd one out/i.test(ej) && /measure twice/i.test(ej) && /label and name/i.test(ej), "ejaan: tiga nama metode global ada");
}

console.log(`Lulus ${lulus}, gagal ${gagal}`);
process.exit(gagal ? 1 : 0);
