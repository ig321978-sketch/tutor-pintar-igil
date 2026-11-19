// Uji Mind-map (Papan Nama Kandang), Infografis (Daftar Ukuran), Simulasi Meja Ukur, dan tahap Concrete, Pictorial, Abstract Kelas 3 Bab 3 Sub-Bab A ("Ukuran Kandang Kak Tari"),
// awal cerita Kebun Binatang Mini (mengukur panjang dengan satuan baku).
// Memeriksa: logika simulasi (geser benda ke angka nol, alat menolak membaca sebelum nol, tulis hasil dengan satuan, pilih alat ukur, selisih dua batang), misi (awal tidak memenuhi,
// wajib empat, bebas dua), papan nama kandang (sembilan kartu geser Masalah, Cara, Hasil memuat semua metode Story), daftar ukuran dari kejadian Story, CPA dua belas langkah per tahap
// (Klik, Kanvas, Suara x empat metode) dengan jawaban beragam dan Cari kesalahan di tiap tahap, kunci dihitung dari data, angka jawaban tidak kembar per tahap, tugas yang langsung siap
// (jebakan tombol macet), pengenal ucapan, petunjuk salah, batas rupa, emoji, kata terlarang, akhir baris.
// Jalankan: node --no-warnings scripts/uji-ukur-k3b3a.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/ukur-k3b3a/logika.ts");
const DS = await import("../src/components/modul/ukur-k3b3a/data-sim.ts");
const DK = await import("../src/components/modul/ukur-k3b3a/data-kartu.ts");
const LC = await import("../src/components/modul/ukur-k3b3a/logika-cpa.ts");
const D = await import("../src/components/modul/ukur-k3b3a/data.ts");
const K = await import("../src/components/modul/ukur-k3b3a/periksa.ts");
const S = await import("../src/components/modul/misi-simulasi.ts");
const MK = await import("../src/components/modul/misi-k3bab3.ts");
const MT = await import("../src/components/modul/misi-teks-k3b3.ts");
const folderUrl = new URL("../src/components/modul/ukur-k3b3a/", import.meta.url);
/** Benda beremoji pada GambarUkur.tsx (kunci EMOJI_BENDA), dibaca dari teks karena berkas tsx tidak bisa diimpor di Node. */
const DG_EMOJI = {};
{
  const gu = readFileSync(new URL("GambarUkur.tsx", folderUrl), "utf8");
  const blok = /export const EMOJI_BENDA[^=]*=\s*\{([\s\S]*?)\n\};/.exec(gu)?.[1] ?? "";
  for (const m of blok.matchAll(/(?:"([^"]+)"|([a-z]+)):\s*"/g)) DG_EMOJI[m[1] ?? m[2]] = true;
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
const TERLARANG = /\b(kelas|buku|teman|kelompok|dikelompokkan|mengelompokkan|skor|nilai|bernilai|soal|tebak|tebakan|kunci|latihan)\b/i;
const tanpaDigit = (t) => !/\d/.test(t);
const bersih = (t) => !TERLARANG.test(t) && !/buku|kelompok|bernilai|tebak|nilai|kelas|teman|skor|soal|kunci|latihan/i.test(t);
const emojiSah = (s) => [...s].every((c) => c.codePointAt(0) <= 0x1fa95 && c.codePointAt(0) !== 0x200d && c.codePointAt(0) !== 0x1f6de);
const adaEmoji = (s) => /\p{Extended_Pictographic}/u.test(s);
/** Ukuran yang dipakai Story A (jangan dijadikan data CPA atau Simulasi, kecuali Cari kesalahan yang memakai seed dari alur). */
const CERITA = new Set([7, 6, 15, 17, 3, 20, 22, 40, 100]);

/* ------------------------------ Kata bilangan ------------------------------ */
{
  sama([0, 1, 9, 10, 11, 15, 20, 38, 100].map(LC.kataBil), ["nol", "satu", "sembilan", "sepuluh", "sebelas", "lima belas", "dua puluh", "tiga puluh delapan", "seratus"], "kata bilangan CPA");
  cek(LC.kata === LC.kataBil, "alias kata");
  for (let n = 1; n <= 100; n += 1) cek(tanpaDigit(LC.kataBil(n)) && LC.kataBil(n) === L.kata(n), `kata bilangan ${n} sama di simulasi dan CPA`);
  sama([LC.ucapkan("8 cm"), LC.ucapkan("6 m"), LC.ucapkan("25 m"), LC.ucapkan("penggaris")], ["delapan sentimeter", "enam meter", "dua puluh lima meter", "penggaris"], "ucapkan: angka dan satuan menjadi kata");
  sama([LC.kataSat("cm"), LC.kataSat("m")], ["sentimeter", "meter"], "kata satuan");
}

/* ------------------------------ Simulasi: data dan logika ------------------------------ */
{
  const semua = [...DS.TARGET_GESER.flatMap((t) => [t.awal, t.panjang]), ...DS.TARGET_BACA.map((t) => t.panjang), ...DS.TARGET_ALAT.map((t) => t.panjang), ...DS.TARGET_SELISIH.flatMap((t) => [t.a, t.b])];
  cek(semua.every((n) => n >= 1 && n <= 100 && !CERITA.has(n)), `simulasi: semua ukuran berbeda dari Story (${semua.filter((n) => CERITA.has(n))})`);
  cek(DS.SKALA_GESER === 20 && DS.TARGET_GESER.length === 3 && DS.TARGET_GESER.every((t) => t.awal >= 1 && t.awal + t.panjang <= DS.SKALA_GESER), "simulasi: tiga benda untuk Geser, masih muat di penggaris sepanjang dua puluh sentimeter");
  cek(DS.TARGET_BACA.some((t) => t.sat === "cm") && DS.TARGET_BACA.some((t) => t.sat === "m") && DS.TARGET_ALAT.some((t) => t.sat === "cm") && DS.TARGET_ALAT.some((t) => t.sat === "m"), "simulasi: Baca dan Alat memuat sentimeter dan meter");
  cek(DS.TARGET_SELISIH.length === 3 && DS.TARGET_SELISIH.every((t) => t.a > t.b && t.a <= 20), "simulasi: tiga pasang batang, a lebih panjang daripada b");
  cek(tanpaDigit(DS.MISI_UKUR_TEKS) && bersih(DS.MISI_UKUR_TEKS) && DS.MISI_UKUR_TEKS === MT.MISI_K3B3.A && D.MISI_UKUR_TEKS === DS.MISI_UKUR_TEKS && DS.MISI_UKUR_TEKS.length >= 10 && DS.MISI_UKUR_TEKS.length <= 120, "simulasi: teks misi tanpa digit dan kata terlarang, sama dengan misi-teks-k3b3");

  const a = L.awalUkur();
  cek(a.alat === "ukur" && a.mode === "geser" && a.posisi === 4 && !L.diNol(a) && !a.tolak && !a.sudahBaca && a.geserBenar.length === 0 && a.bacaBenar.length === 0 && a.alatBenar.length === 0 && a.selisihBenar.length === 0 && a.salah === 0, "simulasi: keadaan awal");
  // Geser.
  cek(L.ujungKanan(a) === 13 && L.targetGeser(a).benda === "kandang mini", "geser: ujung kanan benda");
  const t1 = L.geserBenda(a, -1);
  cek(t1.ok && t1.k.posisi === 3 && L.ujungKanan(t1.k) === 12, "geser: benda digeser satu sentimeter ke kiri");
  cek(!L.geserBenda({ ...a, posisi: 0 }, -1).ok && !L.geserBenda({ ...a, posisi: 11 }, 1).ok && L.geserBenda({ ...a, posisi: 10 }, 1).ok, "geser: tidak bisa melewati nol dan ujung penggaris");
  const tolak = L.bacaGeser(a);
  cek(!tolak.ok && tolak.k.tolak === true && tolak.k.salah === 0 && !tolak.k.sudahBaca, "geser: alat menolak membaca sebelum ujung kiri di nol (bukan percobaan keliru)");
  sama(S.misiBaru(MK.MISI_A, tolak.k, new Set()), ["a-tolak"], "geser: misi a-tolak");
  cek(/Geser benda ke kiri/.test(L.petunjukGeser(a)) && tanpaDigit(L.petunjukGeser(a)), "geser: petunjuk saat belum di nol");
  let g = a;
  for (let i = 0; i < 4; i += 1) g = L.geserBenda(g, -1).k;
  cek(L.diNol(g) && L.ujungKanan(g) === 9 && /Tekan Baca/.test(L.petunjukGeser(g)) && !L.periksaGeser(g).ok, "geser: di nol tetapi belum membaca, petunjuk menunjuk langkah yang belum dilakukan");
  const bc = L.bacaGeser(g);
  cek(bc.ok && bc.k.sudahBaca && !bc.k.tolak, "geser: di nol, alat mau membaca");
  const pg = L.pilihanGeser(bc.k);
  cek(pg.length === 3 && new Set(pg).size === 3 && pg.includes(9) && pg.includes(13) && pg[0] !== 9 && pg.every((x) => x >= 1 && x <= 20), `geser: pilihan unik, memuat bacaan sebelum digeser (13), jawaban benar bukan yang pertama (${pg})`);
  cek(/Pilih satu bacaan/.test(L.petunjukGeser(bc.k)) && !L.periksaGeser(bc.k).ok, "geser: tanpa pilihan tidak benar");
  const salahG = L.periksaGeser(L.pilihGeser(bc.k, pg.findIndex((x) => x !== 9)));
  cek(!salahG.ok && salahG.k.salah === 1 && salahG.k.geserBenar.length === 0, "geser: bacaan keliru");
  const betulG = L.periksaGeser(L.pilihGeser(bc.k, pg.indexOf(9)));
  cek(betulG.ok && betulG.k.geserBenar.join() === "0" && betulG.k.geserKe === 1 && betulG.k.posisi === 5 && !betulG.k.sudahBaca && betulG.k.geserPilih === -1 && L.targetGeser(betulG.k).benda === "papan", "geser: bacaan tepat membuka benda berikutnya di posisi awalnya");
  sama(S.misiBaru(MK.MISI_A, betulG.k, new Set()), ["a-geser"], "geser: misi a-geser");
  cek(L.pilihGeser(a, 0).geserPilih === -1 && L.pilihGeser(bc.k, 9).geserPilih === -1, "geser: memilih sebelum membaca atau di luar daftar diabaikan");
  cek(!L.periksaGeser({ ...bc.k, posisi: 2, geserPilih: pg.indexOf(9) }).ok, "geser: benda yang digeser lagi dari nol tidak dihitung");
  cek(L.geserBenda(bc.k, 1).k.sudahBaca === false, "geser: menggeser membatalkan bacaan");
  cek(tanpaDigit(L.kalimatGeser(a)) && tanpaDigit(L.kalimatGeser(g)) && tanpaDigit(L.kalimatGeser(betulG.k)) && L.kalimatPosisi(a) === "Ujung kiri di angka empat, ujung kanan di angka tiga belas.", "geser: kalimat tanpa digit");
  // Baca dan tulis satuan.
  const pb = L.pilihanBaca(a);
  sama(pb, ["12", "12 cm", "12 m"], "baca: tiga cara menulis, yang benar (angka dan satuan) bukan yang pertama");
  const salahB = L.periksaBaca(L.pilihBaca(a, 0));
  cek(!salahB.ok && salahB.k.salah === 1 && /satuan/.test(L.petunjukBaca(L.pilihBaca(a, 0))) && tanpaDigit(L.petunjukBaca(L.pilihBaca(a, 0))), "baca: angka tanpa satuan keliru");
  cek(/Satuannya belum cocok/.test(L.petunjukBaca(L.pilihBaca(a, 2))) && !L.periksaBaca(L.pilihBaca(a, 2)).ok, "baca: satuan keliru");
  cek(/Pilih satu tulisan/.test(L.petunjukBaca(a)) && !L.periksaBaca(a).ok, "baca: tanpa pilihan tidak benar");
  const bB = L.periksaBaca(L.pilihBaca(a, 1));
  cek(bB.ok && bB.k.bacaBenar.join() === "0" && bB.k.bacaKe === 1 && bB.k.bacaPilih === -1, "baca: angka dan satuan tepat membuka benda berikutnya");
  sama(S.misiBaru(MK.MISI_A, bB.k, new Set()), ["a-baca"], "baca: misi a-baca");
  sama(L.pilihanBaca(bB.k), ["5", "5 cm", "5 m"], "baca: benda kedua berukuran meter, pilihan menyesuaikan");
  cek(L.periksaBaca(L.pilihBaca(bB.k, 2)).ok && L.teksBenarBaca(bB.k) === "5 m", "baca: meter ditulis dengan m");
  cek(L.pilihBaca(a, 7).bacaPilih === -1 && tanpaDigit(L.kalimatBaca(a)) && tanpaDigit(L.kalimatBaca(bB.k)), "baca: pilihan di luar daftar diabaikan, kalimat tanpa digit");
  // Alat.
  const pal = L.pilihanAlat(a);
  cek(pal.length === 3 && new Set(pal).size === 3 && pal.includes("jengkal") && pal[0] !== "penggaris" && L.alatBenar(L.targetAlat(a)) === "penggaris", "alat: benda pendek memakai penggaris, pilihan memuat jengkal, yang benar bukan yang pertama");
  for (let i = 0; i < 4; i += 1) {
    const k = { ...a, alatKe: i };
    const benar = L.targetAlat(k).sat === "m" ? "meteran" : "penggaris";
    cek(L.pilihanAlat(k)[0] !== benar && L.pilihanAlat(k).includes(benar), `alat: pilihan sasaran ${i} memuat jawaban benar bukan yang pertama`);
  }
  const salahA = L.periksaAlat(L.pilihAlat(a, pal.indexOf("jengkal")));
  cek(!salahA.ok && salahA.k.salah === 1 && /bukan satuan baku/.test(L.petunjukAlat(L.pilihAlat(a, pal.indexOf("jengkal")))) && tanpaDigit(L.petunjukAlat(L.pilihAlat(a, 0))), "alat: jengkal keliru");
  cek(/Pilih satu alat/.test(L.petunjukAlat(a)) && !L.periksaAlat(a).ok, "alat: tanpa pilihan tidak benar");
  const salahA2 = L.pilihAlat(a, pal.indexOf("meteran"));
  cek(!L.periksaAlat(salahA2).ok && /benda pendek/.test(L.petunjukAlat(salahA2)), "alat: meteran untuk benda pendek keliru");
  const bA = L.periksaAlat(L.pilihAlat(a, pal.indexOf("penggaris")));
  cek(bA.ok && bA.k.alatBenar.join() === "0" && bA.k.alatKe === 1 && bA.k.alatPilih === -1, "alat: penggaris untuk benda pendek tepat");
  sama(S.misiBaru(MK.MISI_A, bA.k, new Set()), ["a-alat"], "alat: misi a-alat");
  cek(L.alatBenar(L.targetAlat(bA.k)) === "meteran" && L.periksaAlat(L.pilihAlat(bA.k, L.pilihanAlat(bA.k).indexOf("meteran"))).ok, "alat: benda panjang memakai meteran");
  cek(L.pilihAlat(a, 5).alatPilih === -1 && tanpaDigit(L.kalimatAlat(a)), "alat: pilihan di luar daftar diabaikan");
  // Selisih.
  const ps = L.pilihanSelisih(a);
  cek(ps.length === 3 && new Set(ps).size === 3 && ps.includes(5) && ps[0] !== 5 && L.selisihDari(L.targetSelisih(a)) === 5, `selisih: tiga pilihan unik, yang benar bukan yang pertama (${ps})`);
  for (let i = 0; i < 3; i += 1) {
    const k = { ...a, selisihKe: i };
    const n = DS.TARGET_SELISIH[i].a - DS.TARGET_SELISIH[i].b;
    cek(L.pilihanSelisih(k)[0] !== n && new Set(L.pilihanSelisih(k)).size === 3 && L.pilihanSelisih(k).includes(n), `selisih: pilihan sasaran ${i} unik dan benar bukan yang pertama`);
  }
  const salahS = L.periksaSelisih(L.pilihSelisih(a, ps.findIndex((x) => x !== 5)));
  cek(!salahS.ok && salahS.k.salah === 1 && /mengurangkan/.test(L.petunjukSelisih(L.pilihSelisih(a, 0))) && tanpaDigit(L.petunjukSelisih(L.pilihSelisih(a, 0))), "selisih: bilangan keliru");
  cek(/Pilih satu bilangan/.test(L.petunjukSelisih(a)) && !L.periksaSelisih(a).ok, "selisih: tanpa pilihan tidak benar");
  const bS = L.periksaSelisih(L.pilihSelisih(a, ps.indexOf(5)));
  cek(bS.ok && bS.k.selisihBenar.join() === "0" && bS.k.selisihKe === 1 && bS.k.selisihPilih === -1, "selisih: selisih tepat membuka dua batang berikutnya");
  sama(S.misiBaru(MK.MISI_A, bS.k, new Set()), ["a-selisih"], "selisih: misi a-selisih");
  cek(L.pilihSelisih(a, 8).selisihPilih === -1 && tanpaDigit(L.kalimatSelisih(a)) && tanpaDigit(L.kalimatSelisih(bS.k)), "selisih: pilihan di luar daftar diabaikan, kalimat tanpa digit");
  // Mulai lagi dan ganti alat; tiga benda.
  cek(L.mulaiLagiUkur().geserKe === 0 && L.mulaiLagiUkur().posisi === 4 && !L.mulaiLagiUkur().tolak && L.pilihModeUkur(a, "alat").mode === "alat", "mulai lagi dan ganti alat");
  let tiga = a;
  for (let i = 0; i < 3; i += 1) {
    while (!L.diNol(tiga)) tiga = L.geserBenda(tiga, -1).k;
    tiga = L.bacaGeser(tiga).k;
    const p = L.pilihanGeser(tiga);
    tiga = L.periksaGeser(L.pilihGeser(tiga, p.indexOf(L.targetGeser(tiga).panjang))).k;
  }
  cek(tiga.geserBenar.join() === "0,1,2" && L.targetGeser(tiga).benda === "kandang mini", "geser: tiga benda berturut-turut lalu kembali ke benda pertama");
  sama(S.misiBaru(MK.MISI_A, tiga, new Set()), ["a-geser", "a-tiga"], "geser: tiga benda memenuhi a-geser dan a-tiga");
  // Misi.
  const A = MK.MISI_A;
  cek(A.filter((m) => m.wajib).length === 4 && A.filter((m) => !m.wajib).length === 2, "misi A: empat wajib, dua bebas");
  cek(new Set(A.map((m) => m.id)).size === 6 && A.every((m) => m.id.startsWith("a-") && m.teks.length >= 10 && m.teks.length <= 120 && tanpaDigit(m.teks) && bersih(m.teks)), "misi A: id berawalan a-, unik, 10 sampai 120 huruf, tanpa digit");
  sama(MK.daftarMisiK3Bab3("A"), A, "daftarMisiK3Bab3 A");
  cek(A.every((m) => !m.cek({ alat: "kerangka" })), "misi A: alat lain tidak memenuhi misi");
  sama(S.misiBaru(A, a, new Set()), [], "misi A: keadaan awal tanpa misi baru");
  cek(S.misiBaru(A, { ...a, salah: 9, mode: "selisih", posisi: 0, sudahBaca: true, geserPilih: 2, bacaPilih: 1, alatPilih: 2, selisihPilih: 1 }, new Set()).length === 0, "misi A: pilihan yang belum diperiksa dan benda yang digeser tidak dihitung sebagai misi");
}

/* ------------------------------ Mind-map: papan nama kandang (sembilan kartu geser) ------------------------------ */
{
  const KA = DK.KARTU_UKUR;
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
  for (const m of ["Perkirakan dan Periksa", "Ukuran Acuan", "Pita Penggaris", "Pakai satuan baku", "Sentimeter dan meter", "Penggaris atau meteran", "Ujung di angka nol", "Baca ujung lain", "Tulis dengan satuan"]) cek(cara.toLowerCase().includes(m.toLowerCase()), `kartu: cara memuat ${m}`);
  const gab = KA.map((k) => [k.judul, k.masalah.label, k.cara.label, k.hasil.label, k.masalah.arti, k.cara.arti, k.hasil.arti].join(" ")).join(" ").toLowerCase();
  for (const s of ["jengkal", "satuan baku", "sentimeter", "meter", "penggaris", "meteran", "angka nol", "ujung", "satuan", "perkiraan", "kuku jari", "pita"]) cek(gab.includes(s), `kartu: memuat poin "${s}"`);
  cek(!new RegExp("\\b(raka|salsa|bima|pak joko|kak tari|pak wayan|kandang|kelinci|kambing|kebun binatang)\\b", "i").test(gab), "kartu: hanya poin pelajaran (tanpa tokoh dan benda cerita)");
  cek(tanpaDigit(DK.SUARA_KARTU_UKUR + DK.SELESAI_KARTU_UKUR) && bersih(DK.SUARA_KARTU_UKUR + DK.SELESAI_KARTU_UKUR), "kartu: suara dan pesan selesai tanpa digit dan kata terlarang");
  cek(emojiSah(DK.TEMA_KARTU_UKUR.ikon) && DK.TEMA_KARTU_UKUR.judul.length > 5, "kartu: tema sah");
  const RG = DK.RINGKASAN_UKUR;
  cek(RG.ikon.length === DK.KARTU_UKUR.length && new Set(RG.ikon).size === RG.ikon.length && [...RG.ikon, RG.pusat].every((e) => emojiSah(e) && !/[A-Za-z0-9]/.test(e)), "peta radial: satu gambar unik per kartu, gambar sah tanpa huruf");
  cek(tanpaDigit(RG.suara) && bersih(RG.suara) && !RG.ikon.includes(RG.pusat), "peta radial: suara bersih dan pusat berbeda dari cabang");
}

/* ------------------------------ Infografis: daftar ukuran (satu tabel lima baris) ------------------------------ */
{
  const B = DK.BARIS_INFO_UKUR;
  cek(B.length === 5 && DK.KOLOM_INFO_UKUR.length === 3, "infografis: lima baris dan tiga kolom");
  cek(B.every((b) => b.isi.length === 3 && emojiSah(b.ikon) && b.nama.length > 4), "infografis: tiap baris tiga isian, emoji sah");
  const jumlahContoh = B.map((b) => b.contoh.length);
  cek(jumlahContoh[0] === 3 && jumlahContoh.slice(1).every((n) => n === 0), "infografis: baris satu penuh contoh, baris dua sampai lima mandiri");
  const semua = B.flatMap((b) => b.isi);
  cek(B.every((b) => new Set(b.isi.map((x) => x.t)).size === 3), "infografis: tiga label tiap baris berbeda");
  cek(new Set(semua.map((x) => x.t)).size === semua.length, "infografis: semua label unik");
  cek(semua.every((x) => x.t.length <= 28 && x.t.split(/\s+/).length <= 5 && bersih(x.t) && bersih(x.s ?? "")), "infografis: label pendek (paling banyak lima kata) dan tanpa kata terlarang");
  cek(semua.every((x) => tanpaDigit(x.s ?? x.t)), "infografis: ucapan label tanpa digit");
  const gab = B.map((b) => [b.nama, ...b.isi.map((x) => x.t)].join(" ")).join(" ").toLowerCase();
  for (const s of ["mengukur dengan penggaris", "memilih alat ukur", "menulis hasil ukur", "memeriksa hasil ukur", "mengukur benda panjang", "ujung di angka nol", "panjang terbaca", "penggaris atau meteran", "angka dan satuan", "perkirakan dulu", "tempel ujung pita", "baca ujung lain"]) cek(gab.includes(s), `infografis: memuat "${s}"`);
  cek(!new RegExp("\\b(raka|salsa|bima|pak joko|kak tari|pak wayan)\\b", "i").test(gab), "infografis: tanpa nama tokoh");
  cek(tanpaDigit(DK.SUARA_INFO_UKUR + DK.SELESAI_INFO_UKUR) && bersih(DK.SUARA_INFO_UKUR + DK.SELESAI_INFO_UKUR) && emojiSah(DK.TEMA_INFO_UKUR.ikon), "infografis: suara dan tema bersih");
}

/* ------------------------------ Pengenal ucapan ------------------------------ */
{
  const nm = (nama) => ({ jenis: "nama", nama });
  const an = (n) => ({ jenis: "angka", n });
  for (const nama of ["penggaris", "meteran", "sentimeter", "meter", "dekat", "jauh"]) cek(K.cocokUcapan(nama, nm(nama)).cocok && K.kataDariUcapan(nama).length === 1, `cocok: kata ${nama} dikenali tepat satu`);
  sama(K.kataDariUcapan("sentimeter"), ["sentimeter"], "ucapan: sentimeter bukan meter");
  sama(K.kataDariUcapan("senti meter"), ["sentimeter"], "ucapan: senti meter dikenali sebagai sentimeter");
  sama(K.kataDariUcapan("meteran"), ["meteran"], "ucapan: meteran bukan meter");
  sama(K.kataDariUcapan("meter"), ["meter"], "ucapan: meter");
  sama(K.kataDariUcapan("tidak jauh"), [], "ucapan: tidak jauh tidak dihitung");
  sama(K.kataDariUcapan("halo"), [], "ucapan: kata lain tidak dikenali");
  cek(!K.cocokUcapan("sentimeter", nm("meter")).cocok && !K.cocokUcapan("meteran", nm("meter")).cocok && !K.cocokUcapan("meter", nm("sentimeter")).cocok && !K.cocokUcapan("dekat", nm("jauh")).cocok, "cocok: kata berbeda tidak cocok");
  sama(K.angkaDariUcapan("lima"), [5], "angka: lima");
  sama(K.angkaDariUcapan("sembilan, 4 dan tiga"), [9, 4, 3], "angka: satuan dan angka tertulis");
  sama(K.angkaDariUcapan("empat belas sentimeter"), [14], "angka: empat belas sentimeter");
  sama(K.angkaDariUcapan("dua puluh tiga"), [23], "angka: dua puluh tiga");
  sama(K.angkaDariUcapan("seratus"), [100], "angka: seratus");
  sama(K.angkaDariUcapan("25"), [25], "angka: 25 tertulis");
  sama(K.angkaDariUcapan("nol"), [0], "angka: nol");
  for (let n = 1; n <= 100; n += 1) cek(K.angkaDariUcapan(LC.kataBil(n)).join() === String(n), `angka: kata bilangan ${n} dikenali utuh (${LC.kataBil(n)} -> ${K.angkaDariUcapan(LC.kataBil(n))})`);
  cek(K.cocokUcapan("lima", an(5)).cocok && K.cocokUcapan("5", an(5)).cocok && !K.cocokUcapan("enam", an(5)).cocok, "cocok: kunci angka lima");
  cek(K.cocokUcapan("dua puluh satu sentimeter", an(21)).cocok && !K.cocokUcapan("dua puluh satu", an(1)).cocok && !K.cocokUcapan("tiga puluh satu", an(21)).cocok, "cocok: bilangan dua angka dikenali utuh");
}

/* ------------------------------ CPA ------------------------------ */
const TAHAP = { Concrete: ["benda", D.CONCRETE], Pictorial: ["diagram", D.PICTORIAL], Abstract: ["lambang", D.ABSTRACT] };
const CARA = ["klik", "kanvas", "suara"];
const METODE = ["igil", "kira", "acuan", "pita"];
/** Jenis tugas dasar yang diharapkan per cara dan urutan metode. */
const TIPE = { klik: ["baca", "kira", "acuan", "pita"], kanvas: ["baca", "kira", "acuan", "selisih"], suara: ["alat", "kira", "acuan", "satuan"] };
const semuaTeksLangkah = (ls, rupa, cara) => [ls.judul, ls.suara, LC.instruksi(ls.langkah, rupa, cara, ls.metode), LC.kalimatTanya(ls.langkah, cara), LC.kalimatKunci(ls.langkah, cara), LC.petunjukSalah(ls.langkah, cara, 1)];
{
  sama(LC.URUT_METODE, METODE, "urutan metode");
  cek(LC.NAMA_METODE.igil.includes("Nol di Ujung, Baca Ujung Lain") && LC.NAMA_METODE.kira.includes("Estimate and Check") && LC.NAMA_METODE.acuan.includes("Benchmark Measuring") && LC.NAMA_METODE.pita.includes("Strip Ruler"), "nama metode IGIL dan tiga metode global");
  cek(METODE.every((m) => emojiSah(LC.IKON_METODE[m])), "ikon metode sah");
  let nomor = 2;
  for (const [nama, [rupa, soal]] of Object.entries(TAHAP)) {
    cek(soal.length === 3 && soal.map((s) => s.cara).join() === CARA.join(), `${nama}: tiga misi Klik, Kanvas, Suara`);
    cek(soal.every((s) => s.langkah.length === 4 && s.langkah.map((l) => l.metode).join() === METODE.join()), `${nama}: empat langkah per misi (IGIL, Estimate and Check, Benchmark Measuring, Strip Ruler)`);
    for (const s of soal) {
      cek(s.nomor === nomor, `${nama}: nomor misi berlanjut ${nomor}`);
      nomor += 1;
      cek(s.judul.startsWith("Misi Ukur") && s.cerita.length > 15 && bersih(s.judul) && bersih(s.cerita), `${nama} ${s.nomor}: judul dan cerita sah`);
      sama(s.langkah.map((l) => LC.dasarDari(l.langkah).tipe), nama === "Abstract" && s.cara === "klik" ? ["alat", "kira", "acuan", "pita"] : TIPE[s.cara], `${nama} ${s.nomor}: jenis tugas per metode`);
      for (const ls of s.langkah) {
        cek(ls.cara === s.cara, `${nama} ${s.nomor}: cara langkah sama dengan misi`);
        const teks = semuaTeksLangkah(ls, rupa, s.cara);
        cek(teks.every((t) => tanpaDigit(t) && bersih(t)), `${nama} ${s.nomor} ${ls.metode}: teks tanpa digit dan kata terlarang (${teks.find((t) => !tanpaDigit(t) || !bersih(t)) ?? ""})`);
        cek(emojiSah(teks.join("")), `${nama} ${s.nomor} ${ls.metode}: emoji sah`);
        cek(ls.judul === ls.suara && ls.judul === LC.instruksi(ls.langkah, rupa, s.cara, ls.metode), `${nama} ${s.nomor} ${ls.metode}: judul dan suara sama dengan instruksi`);
        // Batas rupa: Pictorial dan Abstract tanpa emoji benda di teks tugas.
        if (rupa !== "benda") cek(!adaEmoji(teks.join(" ")), `${nama} ${s.nomor} ${ls.metode}: teks tugas tanpa emoji (batas rupa)`);
        cek(/Metode IGIL|Estimate and Check|Benchmark Measuring|Strip Ruler|sudah menjawab/.test(ls.judul), `${nama} ${s.nomor} ${ls.metode}: judul tugas memuat nama metode`);
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
      if (x.betul) cek(String(teksBenar) === String(x.jawabTokoh), `${nama}: jawaban tokoh yang benar sama dengan kunci`);
      else cek(String(teksBenar) !== String(x.jawabTokoh), `${nama}: jawaban benar berbeda dari jawaban tokoh`);
      cek(LC.petunjukSalah(x, "klik", x.jawabTokoh).startsWith(`Itu jawaban ${x.tokoh}`) || x.betul === true, `${nama}: petunjuk menjelaskan kesalahan tokoh`);
    }
  }
  cek(nomor === 11, "nomor misi berlanjut sampai sepuluh");
  const dasarSalah = Object.values(TAHAP).map(([, soal]) => soal[0].langkah[0].langkah.dasar.tipe);
  sama(dasarSalah, ["baca", "baca", "alat"], "Cari kesalahan: membaca penggaris (Concrete dan Pictorial), memilih alat ukur (Abstract)");
  cek(D.PICTORIAL[0].langkah[0].langkah.betul === true && !D.CONCRETE[0].langkah[0].langkah.betul && !D.ABSTRACT[0].langkah[0].langkah.betul, "Cari kesalahan: satu jawaban tokoh benar (Pictorial), dua keliru");
  const sC = D.CONCRETE[0].langkah[0].langkah;
  cek(sC.dasar.mulai === 3 && sC.dasar.ujung === 11 && sC.jawabTokoh === "11 cm" && LC.teksKunciKlik(sC) === "8 cm", "Cari kesalahan Concrete: ujung krayon di angka 3, bacaan 11, jawaban benar 8 cm (seed alur)");
  const sA = D.ABSTRACT[0].langkah[0].langkah;
  cek(sA.dasar.sat === "m" && sA.dasar.panjang === 6 && sA.jawabTokoh === "penggaris" && LC.teksKunciKlik(sA) === "meteran", "Cari kesalahan Abstract: pagar 6 m dengan penggaris keliru, meteran (seed alur)");
  // Batas isi tiap tugas: ukuran sampai sembilan puluh sembilan, berbeda dari Story (kecuali seed Cari kesalahan).
  const benda = (nama) => nama;
  for (const [nama, [rupa, soal]] of Object.entries(TAHAP))
    for (const s of soal)
      for (const ls of s.langkah) {
        const d = LC.dasarDari(ls.langkah);
        const tag = `${nama} ${s.nomor} ${ls.metode}`;
        const angka = d.tipe === "baca" ? [d.mulai, d.ujung] : d.tipe === "alat" || d.tipe === "satuan" || d.tipe === "pita" ? [d.panjang] : d.tipe === "kira" ? [d.perkiraan, d.ukur] : d.tipe === "acuan" ? [d.kuku] : [d.a, d.b];
        cek(angka.every((n) => n >= 0 && n <= 99), `${tag}: ukuran sampai sembilan puluh sembilan (${angka})`);
        if (ls.langkah.tipe !== "salah") cek(angka.every((n) => !CERITA.has(n)), `${tag}: ukuran berbeda dari Story (${angka})`);
        cek(typeof benda(d.benda) === "string" && d.benda.length >= 3, `${tag}: benda bernama`);
        if (rupa === "benda" && d.tipe !== "selisih") cek(!!(DG_EMOJI[d.benda] ?? null), `${tag}: Concrete memakai benda beremoji (${d.benda})`);
        if (d.tipe === "baca") cek(d.mulai >= 0 && d.ujung > d.mulai && (d.mulai === 0 || ls.langkah.tipe === "salah"), `${tag}: membaca penggaris, mulai dari nol kecuali Cari kesalahan`);
        if (d.tipe === "kira") cek(d.perkiraan !== d.ukur && Math.abs(d.ukur - d.perkiraan) <= 12 && d.ukur <= 40, `${tag}: perkiraan berbeda dari hasil ukur (${d.perkiraan}, ${d.ukur})`);
        if (d.tipe === "acuan") cek(d.kuku >= 4 && d.kuku <= 25, `${tag}: banyak kuku (${d.kuku})`);
        if (d.tipe === "selisih") cek(d.a > d.b && d.a - d.b <= 9 && d.a <= 40, `${tag}: selisih dua batang`);
        if (d.tipe === "pita") cek(d.sat === "m" ? d.panjang <= 10 : d.panjang <= 40, `${tag}: pita sampai skala`);
        if (d.tipe === "alat" || d.tipe === "satuan") cek(d.sat === "m" ? d.panjang >= 4 : d.panjang <= 19, `${tag}: panjang masuk akal untuk satuannya (${d.panjang} ${d.sat})`);
      }
  // Tiap metode global tampak di tiap tahap: tiap tahap memuat semua jenis tugas.
  for (const [nama, [, soal]] of Object.entries(TAHAP)) {
    const tipe = new Set(soal.flatMap((s) => s.langkah.map((l) => LC.dasarDari(l.langkah).tipe)));
    cek(["baca", "alat", "kira", "acuan", "pita", "selisih", "satuan"].every((t) => tipe.has(t)), `${nama}: semua jenis tugas (baca, alat, perkiraan, acuan, pita, selisih, satuan) ada`);
    const sat = new Set(soal.flatMap((s) => s.langkah.map((l) => LC.satuanDari(LC.dasarDari(l.langkah)))));
    cek(sat.has("cm") && sat.has("m"), `${nama}: sentimeter dan meter ada`);
  }
}

/* ------------------------------ Tugas dihitung dari data ------------------------------ */
{
  const nama = (k) => (k ? (k.jenis === "nama" ? k.nama : k.n) : null);
  // Kunci tiap jenis tugas dihitung dari data.
  sama(["klik", "kanvas", "suara"].map((c) => nama(LC.kunciJawab({ tipe: "baca", benda: "x", mulai: 0, ujung: 8 }, c))), [8, 8, 8], "kunci baca: ujung dikurangi mulai (mulai nol)");
  sama(nama(LC.kunciJawab({ tipe: "baca", benda: "x", mulai: 3, ujung: 11 }, "klik")), 8, "kunci baca: mulai bukan nol");
  sama(["klik", "suara"].map((c) => nama(LC.kunciJawab({ tipe: "alat", benda: "x", panjang: 6, sat: "m" }, c))), ["meteran", "meteran"], "kunci alat: meter berarti meteran");
  sama(nama(LC.kunciJawab({ tipe: "alat", benda: "x", panjang: 6, sat: "cm" }, "klik")), "penggaris", "kunci alat: sentimeter berarti penggaris");
  sama(["klik", "kanvas", "suara"].map((c) => nama(LC.kunciJawab({ tipe: "kira", benda: "x", perkiraan: 12, ukur: 14 }, c))), [14, 2, "dekat"], "kunci kira: hasil ukur, selisih, dekat bila selisih paling banyak dua");
  sama(nama(LC.kunciJawab({ tipe: "kira", benda: "x", perkiraan: 16, ukur: 25 }, "suara")), "jauh", "kunci kira: jauh bila selisih lebih dari dua");
  sama(["klik", "kanvas", "suara"].map((c) => nama(LC.kunciJawab({ tipe: "acuan", benda: "x", kuku: 8 }, c))), [8, 8, 8], "kunci acuan: banyak kuku");
  sama(["klik", "kanvas", "suara"].map((c) => nama(LC.kunciJawab({ tipe: "pita", benda: "x", panjang: 27, sat: "cm" }, c))), [27, 27, 27], "kunci pita");
  sama(nama(LC.kunciJawab({ tipe: "selisih", benda: "x", a: 29, b: 25, sat: "cm" }, "kanvas")), 4, "kunci selisih");
  sama(["klik", "suara"].map((c) => nama(LC.kunciJawab({ tipe: "satuan", benda: "x", panjang: 5, sat: "m" }, c))), ["meter", "meter"], "kunci satuan: meter");
  sama([LC.maksSkala(11, "cm"), LC.maksSkala(27, "cm"), LC.maksSkala(8, "m"), LC.tiapSkala(15, "cm"), LC.tiapSkala(30, "cm"), LC.tiapSkala(8, "m")], [12, 30, 8, 1, 5, 1], "skala penggaris dan meteran");
  sama([LC.satuanDari({ tipe: "baca", benda: "x", mulai: 0, ujung: 4 }), LC.satuanDari({ tipe: "pita", benda: "x", panjang: 4, sat: "m" }), LC.satuanDari({ tipe: "kira", benda: "x", perkiraan: 1, ukur: 2 })], ["cm", "m", "cm"], "satuan tugas");
  // Pengecoh.
  sama(LC.pengecoh({ tipe: "baca", benda: "x", mulai: 3, ujung: 11 }).slice(0, 3), [11, 3, 14], "pengecoh baca: bacaan di ujung kanan, angka di ujung kiri, jumlah");
  cek(LC.pengecoh({ tipe: "acuan", benda: "x", kuku: 12 }).every((x) => x !== 12 && x >= 1 && x <= 99), "pengecoh: bukan kunci dan sah");
  sama(LC.pengecoh({ tipe: "baca", benda: "x", mulai: 3, ujung: 11 }, 11).slice(0, 2), [11, 3], "pengecoh dengan jawaban tokoh di depan");

  for (const [namaT, [rupa, soal]] of Object.entries(TAHAP)) {
    const kanvasAngka = [];
    for (const s of soal)
      for (const ls of s.langkah) {
        const l = ls.langkah;
        const d = LC.dasarDari(l);
        const kunci = LC.kunciJawab(l, s.cara);
        cek(kunci !== null, `${namaT} ${s.nomor} ${ls.metode}: kunci ada untuk semua tugas`);
        cek(LC.siapLangsung(l, rupa, s.cara) === (l.tipe !== "salah"), `${namaT} ${s.nomor} ${ls.metode}: siap langsung kecuali Cari kesalahan (tombol tidak macet)`);
        for (const r of ["benda", "diagram", "lambang"]) cek(LC.siapLangsung(l, r, s.cara) === LC.siapLangsung(l, rupa, s.cara), `${namaT} ${s.nomor} ${ls.metode}: siap langsung tidak bergantung rupa (${r})`);
        if (kunci?.jenis === "angka") {
          if (s.cara === "kanvas") {
            kanvasAngka.push(kunci.n);
            cek(kunci.n >= 1 && kunci.n <= 9, `${namaT} ${s.nomor} ${ls.metode}: jawaban kanvas satu angka satu sampai sembilan (${kunci.n})`);
            cek(["baca", "kira", "acuan", "selisih"].includes(d.tipe), `${namaT} ${s.nomor} ${ls.metode}: kanvas hanya untuk jawaban angka`);
          }
          if (s.cara === "klik") cek(kunci.n >= 1 && kunci.n <= 99, `${namaT} ${s.nomor} ${ls.metode}: jawaban klik bilangan sampai sembilan puluh sembilan`);
        }
        if (kunci?.jenis === "nama") cek(s.cara !== "kanvas" && !/\s/.test(kunci.nama) && tanpaDigit(kunci.nama), `${namaT} ${s.nomor} ${ls.metode}: kunci nama satu kata, bukan pada kanvas`);
        // Pilihan klik: tiga pilihan unik, jawaban benar tidak di tombol pertama.
        if (s.cara === "klik" && kunci !== null) {
          const pil = LC.pilihanKlik(l);
          const benar = LC.teksKunciKlik(l);
          cek(pil.length === 3 && new Set(pil).size === 3 && pil.includes(benar) && pil[0] !== benar, `${namaT} ${s.nomor} ${ls.metode}: pilihan klik unik dan jawaban benar bukan yang pertama (${pil.join("/")})`);
          if (kunci.jenis === "angka") cek(pil.every((p) => /^\d{1,2} (cm|m)$/.test(p)) && benar === `${kunci.n} ${LC.satuanDari(d)}`, `${namaT} ${s.nomor}: pilihan ukuran bersatuan (${pil.join("/")})`);
          else cek(pil.every((p) => /^[a-z]+$/.test(p)), `${namaT} ${s.nomor}: pilihan nama alat atau satuan (${pil.join("/")})`);
        }
        if (s.cara === "suara" && kunci !== null) {
          const pil = LC.pilihanSuara(l, "suara");
          cek(pil.includes(LC.teksKunciPilihan(kunci)) && pil.length === 3 && new Set(pil).size === pil.length && tanpaDigit(pil.join(" ")), `${namaT} ${s.nomor} ${ls.metode}: pilihan cadangan suara memuat kunci (${pil.join("/")})`);
          cek(pil[0] !== LC.teksKunciPilihan(kunci), `${namaT} ${s.nomor} ${ls.metode}: kunci suara bukan pilihan pertama`);
          const c = K.cocokUcapan(LC.teksKunciPilihan(kunci), kunci);
          cek(c.cocok, `${namaT} ${s.nomor} ${ls.metode}: ucapan kunci dikenali (${LC.teksKunciPilihan(kunci)})`);
          if (kunci.jenis === "angka") cek(K.cocokUcapan(`${LC.teksKunciPilihan(kunci)} ${LC.kataSat(LC.satuanDari(d))}`, kunci).cocok, `${namaT} ${s.nomor} ${ls.metode}: ucapan dengan satuan juga dikenali`);
          for (const lain of pil.filter((p) => p !== LC.teksKunciPilihan(kunci))) cek(!K.cocokUcapan(lain, kunci).cocok, `${namaT} ${s.nomor}: ucapan ${lain} bukan kunci`);
        }
        if (kunci) cek(LC.kalimatKunci(l, s.cara).length > 12, `${namaT} ${s.nomor} ${ls.metode}: kalimat penjelasan ada`);
        // Petunjuk salah menunjuk kesalahan (tidak kosong untuk tiap tugas dan cara).
        cek(LC.petunjukSalah(l, s.cara, "x").length > 20, `${namaT} ${s.nomor} ${ls.metode}: petunjuk salah ada`);
        if (rupa === "lambang") {
          const baris = LC.barisKartu(d, s.cara);
          cek(Array.isArray(baris) && baris.length >= 3 && baris.every((b) => typeof b === "string" && b.length > 3), `${namaT} ${s.nomor} ${ls.metode}: kartu kata ada`);
          cek(baris.every((b) => !adaEmoji(b)), `${namaT} ${s.nomor} ${ls.metode}: kartu kata tanpa emoji`);
        }
      }
    cek(new Set(kanvasAngka).size === kanvasAngka.length && kanvasAngka.length === 4, `${namaT}: empat angka jawaban Tulis di kanvas tidak kembar (${kanvasAngka.join(", ")})`);
  }
  sama(TAHAP.Concrete[1].filter((s) => s.cara === "kanvas").flatMap((s) => s.langkah.map((l) => LC.kunciJawab(l.langkah, "kanvas").n)), [5, 4, 8, 9], "angka kanvas Concrete");
  sama(TAHAP.Pictorial[1].filter((s) => s.cara === "kanvas").flatMap((s) => s.langkah.map((l) => LC.kunciJawab(l.langkah, "kanvas").n)), [8, 5, 9, 4], "angka kanvas Pictorial");
  sama(TAHAP.Abstract[1].filter((s) => s.cara === "kanvas").flatMap((s) => s.langkah.map((l) => LC.kunciJawab(l.langkah, "kanvas").n)), [4, 9, 5, 8], "angka kanvas Abstract");
  // Tugas suara bervariasi: kata dan bilangan.
  const suaraJenis = Object.values(TAHAP).flatMap(([, soal]) => soal[2].langkah.map((l) => LC.kunciJawab(l.langkah, "suara").jenis));
  cek(suaraJenis.includes("nama") && suaraJenis.includes("angka"), "tugas suara: kata dan bilangan");
  const kataSuara = Object.values(TAHAP).flatMap(([, soal]) => soal[2].langkah.flatMap((l) => (LC.kunciJawab(l.langkah, "suara").jenis === "nama" ? [LC.kunciJawab(l.langkah, "suara").nama] : [])));
  for (const w of ["penggaris", "meteran", "sentimeter", "meter", "dekat", "jauh"]) cek(kataSuara.includes(w), `tugas suara: kata ${w} muncul`);
  // Poin penting dan penutup.
  cek(D.POIN_PENTING.length >= 6 && D.POIN_PENTING.every((p) => p.length > 20 && bersih(p)) && D.POIN_PENTING_SUARA.every((p) => tanpaDigit(p) && !/\b(cm|m)\b/.test(p)), "poin penting: banyak, bersih, suara tanpa digit dan singkatan");
  const poin = D.POIN_PENTING.join(" ").toLowerCase();
  for (const m of ["satuan baku", "sentimeter", "meter", "penggaris", "meteran", "angka nol", "satuan", "selisih", "mengurangkan", "perkirakan dan periksa", "ukuran acuan", "pita penggaris", "jengkal"]) cek(poin.includes(m), `poin penting memuat ${m}`);
  cek(tanpaDigit(D.PENUTUP_A) && bersih(D.PENUTUP_A) && /Pak Wayan/.test(D.PENUTUP_A) && /pita/.test(D.PENUTUP_A) && D.PENUTUP_A.endsWith("?"), "penutup A: jembatan ke Sub-Bab B tanpa digit");
  cek(Object.values(D.TEMA_UKUR).every((t) => emojiSah(t.ikon) && t.nama.length >= 7 && t.cara.length > 20 && tanpaDigit(t.cara) && bersih(t.cara)), "tema tiga tahap sah");
  cek(D.TEMA_UKUR.pictorial.cara.includes("polos") && D.TEMA_UKUR.abstract.cara.includes("kartu"), "tema: Pictorial polos, Abstract kartu");
  cek(D.CONCRETE_UKUR === D.CONCRETE && D.PICTORIAL_UKUR === D.PICTORIAL && D.ABSTRACT_UKUR === D.ABSTRACT && D.MISI_UKUR_TEKS === DS.MISI_UKUR_TEKS, "nama ekspor untuk pemasang");
}

/* ------------------------------ Berkas ------------------------------ */
{
  const berkas = readdirSync(folderUrl).filter((f) => /\.(ts|tsx)$/.test(f));
  for (const nama of ["logika.ts", "data-sim.ts", "data-kartu.ts", "logika-cpa.ts", "data.ts", "periksa.ts", "JawabPanjang.tsx", "LangkahUkur.tsx", "GambarUkur.tsx", "TahapUkur.tsx", "SimulasiMejaUkur.tsx", "PapanNamaKandang.tsx", "DaftarUkuran.tsx"]) cek(berkas.includes(nama), `berkas ${nama} ada`);
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folderUrl), "utf8");
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d || c.codePointAt(0) === 0x1f6de), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}/i.test(s), `${f}: kode emoji tidak melewati U+1FA95`);
    cek(!/buku|kelompok|bernilai|tebak/i.test(s), `${f}: tanpa kata buku, kelompok, bernilai, tebak`);
    if (/^(logika|logika-cpa|periksa|data|data-sim|data-kartu)\.ts$/.test(f)) cek(!/from "react"|fetch\(/.test(s), `${f}: tanpa React dan jaringan`);
    cek(!/turus-k2b8a|gambar-k2b8b|tempat-k3b1a|kartu-k3b1b|urut-k3b1c|tambah-k3b1d|kurang-k3b1e|kali-k3b1f|bagi-k3b1g|kayu-k3b2a|botol-k3b2b|pita-k3b3b|timbang-k3b3c|bandul-k3b3d|SubBabK3B3/.test(s), `${f}: tidak memakai folder bab atau sub-bab lain`);
  }
  // Teks layar tidak memuat kata terlarang, termasuk nama berkas data.
  const layar = ["LangkahUkur.tsx", "TahapUkur.tsx", "SimulasiMejaUkur.tsx", "GambarUkur.tsx"].map((f) => readFileSync(new URL(f, folderUrl), "utf8")).join("\n");
  const teksLayar = [...layar.matchAll(/>\s*([^<>{}\n]{4,})\s*</g)].map((m) => m[1]).join(" ");
  cek(!/\b(skor|nilai|soal|tebak|kunci|latihan|teman|kelompok|buku)\b/i.test(teksLayar), "teks layar komponen tanpa kata terlarang");
  cek(/\bTugas\b/.test(layar) && !/>\s*Soal/.test(layar), "teks layar CPA memakai Tugas");
  const th = readFileSync(new URL("TahapUkur.tsx", folderUrl), "utf8");
  cek(/umum: Umum;\s*rupa: Rupa;\s*soal: SoalMisi\[\];\s*pita:/.test(th) && /teksAkhir: string/.test(th) && /poinPenting\?: boolean/.test(th), "TahapUkur: props umum, rupa, soal, pita, teksAkhir, poinPenting");
  cek(/IKON_METODE\[ls\.metode\]/.test(th) && /rupa === "benda" \?/.test(th), "TahapUkur: ikon metode hanya pada rupa benda (Pictorial dan Abstract tanpa emoji metode)");
  cek(/export default function TahapUkur/.test(th) && /Cari kesalahan/.test(th) && /POIN_PENTING/.test(th) && /PENUTUP_A/.test(th), "TahapUkur: ekspor, Cari kesalahan, Poin Penting, jembatan");
  cek(/"cat"/.test(th) && /"denah"/.test(th) && /"kapur"/.test(th) && !/"tikar"|"peta"|"papan"|"rak"|"nota"|"tirai"|"jepit"|"catatan"|"bungkus"|"kain"/.test(th), "TahapUkur: pola visual papan kayu bercat, kertas denah, papan kapur (berbeda dari bab sebelumnya)");
  cek(/\u{1F43E}/u.test(th) || /1F43E/.test(th), "TahapUkur: kemajuan Concrete berupa jejak kaki");
  const lg = readFileSync(new URL("LangkahUkur.tsx", folderUrl), "utf8");
  cek(/export function LangkahUkur/.test(lg) && /JawabSuaraPanjang/.test(lg) && /JawabTulis/.test(lg) && /pilihanSuara\(l, cara\)/.test(lg) && /TampilDasar/.test(lg), "LangkahUkur: ekspor, jawab suara dengan pilihan ketuk, jawab tulis di kanvas");
  cek(/ucapkan\(/.test(lg), "LangkahUkur: ucapan memakai kata, bukan digit");
  const jw = readFileSync(new URL("JawabPanjang.tsx", folderUrl), "utf8");
  cek(/gagalSekali/.test(jw) && /Ini jawaban yang benar|jawaban yang benar/.test(jw) && /PilihanKata/.test(jw) && /setCadangan\(true\)/.test(jw) && /e\.error === "not-allowed"/.test(jw), "JawabPanjang: galat mikrofon dihitung gagal, pilihan ketuk sebagai cadangan, jawaban benar setelah tiga kali salah");
  const gm = readFileSync(new URL("GambarUkur.tsx", folderUrl), "utf8");
  cek(/export function SkalaSvg/.test(gm) && /export function TampilDasar/.test(gm) && /rupa === "lambang"/.test(gm) && /EMOJI_BENDA/.test(gm), "GambarUkur: skala penggaris dan meteran, tampilan dasar, kartu untuk Abstract");
  const sim = readFileSync(new URL("SimulasiMejaUkur.tsx", folderUrl), "utf8");
  cek(/export default function SimulasiMejaUkur/.test(sim) && /onKeadaan/.test(sim) && /MISI_UKUR_TEKS/.test(sim), "SimulasiMejaUkur: ekspor, onKeadaan, teks misi");
  for (const [f, nm] of [["PapanNamaKandang.tsx", "PapanNamaKandangK3B3"], ["DaftarUkuran.tsx", "DaftarUkuranK3B3"]]) {
    const s = readFileSync(new URL(f, folderUrl), "utf8");
    cek(/speakGuru/.test(s) && /onLanjut/.test(s) && /teksLanjut/.test(s) && /peta-kartu\//.test(s) && new RegExp(`export default function ${nm}`).test(s) && new RegExp(`export \\{ ${nm} \\}`).test(s), `${f}: pembungkus tipis komponen bersama peta-kartu, ekspor ${nm}`);
  }
  // Berkas bersama: Simulasi memasang Meja Ukur.
  const sk = readFileSync(new URL("../src/components/modul/SimulasiK3Bab3.tsx", import.meta.url), "utf8");
  cek(/SimulasiMejaUkur/.test(sk) && /laporMisiUkur\(daftarMisiK3Bab3\("A"\), k, a\.capai\)/.test(sk) && !/judulBab=\{`Kelas/.test(sk), "SimulasiK3Bab3: langkahMejaUkurA memasang Meja Ukur, judul bab tanpa kata Kelas");
  // Berkas lama yang dipertahankan ada (dipakai bab lain dan bank soal).
  for (const f of ["data-k3b3.ts", "dasar-k3b3.tsx", "diagram-k3b3.tsx", "naskah-k3b3.ts", "video-k3b3-umum.tsx", "atur-k3b3.tsx", "eja-k3b3.ts"]) cek(readdirSync(new URL("../src/components/modul/", import.meta.url)).includes(f), `berkas lama ${f} dipertahankan`);
  const ej = readFileSync(new URL("../src/lib/ejaan-inggris-id.ts", import.meta.url), "utf8");
  cek(/estimate and check/i.test(ej) && /benchmark measuring/i.test(ej) && /strip ruler/i.test(ej), "ejaan: tiga nama metode global ada");
}

console.log(`Lulus ${lulus}, gagal ${gagal}`);
process.exit(gagal ? 1 : 0);
