// Uji Mind-map (Papan Dermaga), Infografis (Daftar Dermaga), Simulasi Papan Dermaga, dan tahap Concrete, Pictorial, Abstract Kelas 4 Bab 1 Sub-Bab C ("Papan Dermaga Kak Tiara"),
// cerita Penginapan Pulau Karang Indah (membandingkan dan mengurutkan bilangan sampai sepuluh ribu: dari kiri, tanda, garis bilangan, urutan kartu).
// Memeriksa: logika simulasi (lihat tempat dari kiri, alat menolak memilih tanda sebelum angka berbeda pertama terlihat, urutkan kartu naik dan turun, geser titik pada garis bilangan),
// misi (awal tidak memenuhi, wajib empat, bebas dua), sembilan kartu geser Masalah, Cara, Hasil memuat semua metode Story, daftar dermaga dari kejadian Story,
// CPA dua belas langkah per tahap (Klik, Kanvas, Suara x empat metode) dengan jawaban beragam dan Cari kesalahan di tiap tahap, jawaban benar dihitung dari data, angka jawaban tidak kembar per tahap,
// tugas yang langsung siap (jebakan tombol macet), pengenal ucapan, petunjuk salah, batas rupa, emoji, kata terlarang, akhir baris.
// Jalankan: node --no-warnings scripts/uji-dermaga-k4b1c.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/dermaga-k4b1c/logika.ts");
const DS = await import("../src/components/modul/dermaga-k4b1c/data-sim.ts");
const LC = await import("../src/components/modul/dermaga-k4b1c/logika-cpa.ts");
const D = await import("../src/components/modul/dermaga-k4b1c/data.ts");
const K = await import("../src/components/modul/dermaga-k4b1c/periksa.ts");
const S = await import("../src/components/modul/misi-simulasi.ts");
const MK = await import("../src/components/modul/misi-k4bab1.ts");
const MT = await import("../src/components/modul/misi-teks-k4b1.ts");
const folderUrl = new URL("../src/components/modul/dermaga-k4b1c/", import.meta.url);
/** Benda beremoji pada GambarDermaga.tsx (kunci EMOJI_BENDA), dibaca dari teks karena berkas tsx tidak bisa diimpor di Node. */
const DG_EMOJI = {};
{
  const gu = readFileSync(new URL("GambarDermaga.tsx", folderUrl), "utf8");
  const blok = /export const EMOJI_BENDA[^=]*=\s*\{([\s\S]*?)\n\};/.exec(gu)?.[1] ?? "";
  for (const m of blok.matchAll(/(?:"([^"]+)"|([a-z]+)):\s*"([^"]*)"/g)) DG_EMOJI[m[1] ?? m[2]] = m[3];
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
/** Bilangan Story C (Barat 4.358, Timur 4.385, Selatan 4.538): jangan dijadikan data CPA atau Simulasi. */
const CERITA = [4358, 4385, 4538];
const urutNaik = (d) => [...d].sort((a, b) => a - b);

/* ------------------------------ Kata bilangan dan tampilan ------------------------------ */
{
  sama([0, 7, 10, 305, 1000, 4358, 6070, 10000].map(LC.kataBil), ["nol", "tujuh", "sepuluh", "tiga ratus lima", "seribu", "empat ribu tiga ratus lima puluh delapan", "enam ribu tujuh puluh", "sepuluh ribu"], "kata bilangan CPA");
  cek(LC.kata === LC.kataBil, "alias kata");
  for (const n of [1, 99, 100, 999, 1000, 1001, 2305, 5080, 9999, 10000]) cek(tanpaDigit(LC.kataBil(n)) && LC.kataBil(n) === L.kata(n), `kata bilangan ${n} sama di simulasi dan CPA`);
  sama([LC.rb(4358), LC.rb(100), LC.rb(1000), LC.rb(10000), L.rb(6070)], ["4.358", "100", "1.000", "10.000", "6.070"], "titik ribuan");
  sama([LC.ucapkan("<"), LC.ucapkan(">"), LC.ucapkan("="), LC.ucapkan("3.248, 3.482"), LC.ucapkan("6.051")], ["kurang dari", "lebih dari", "sama dengan", "tiga ribu dua ratus empat puluh delapan, tiga ribu empat ratus delapan puluh dua", "enam ribu lima puluh satu"], "ucapkan: bilangan dan tanda menjadi kata");
  sama([LC.angkaTempat(4358), LC.angkaTempat(1000), L.angkaTempat(6070)], [[4, 3, 5, 8], [1, 0, 0, 0], [6, 0, 7, 0]], "angka tempat dari kiri");
  sama([LC.bedaPertama(4358, 4385), LC.bedaPertama(4358, 4358), LC.bedaPertama(1478, 2478), L.bedaPertama(9246, 9249)], [2, -1, 0, 3], "tempat angka berbeda pertama");
  sama([LC.tandaDari(1, 2), LC.tandaDari(3, 2), LC.tandaDari(2, 2)], ["<", ">", "="], "tanda dari dua bilangan");
}

/* ------------------------------ Simulasi: data dan logika ------------------------------ */
{
  const semuaAngka = [...DS.TARGET_BANDING.flatMap((t) => [t.a, t.b]), ...DS.TARGET_URUT.flatMap((t) => t.data), ...DS.TARGET_GARIS.map((t) => t.nilai)];
  cek(semuaAngka.every((n) => n >= 1000 && n <= 9999 && !CERITA.includes(n)), "simulasi: semua bilangan empat angka dan berbeda dari Story");
  cek(DS.TARGET_BANDING.length === 3 && DS.TARGET_BANDING.slice(0, 2).every((t) => t.a !== t.b) && DS.TARGET_BANDING[2].a === DS.TARGET_BANDING[2].b, "simulasi: dua pasangan berbeda dan satu pasangan sama");
  sama(DS.TARGET_BANDING.map((t) => L.bedaPertama(t.a, t.b)), [2, 0, -1], "simulasi: angka berbeda pertama di puluhan, ribuan, dan tidak ada (sama)");
  cek(DS.TARGET_URUT.length === 3 && DS.TARGET_URUT.every((t) => urutNaik(t.data).join() !== t.data.join() && urutNaik(t.data).reverse().join() !== t.data.join() && new Set(t.data).size === t.data.length) && new Set(DS.TARGET_URUT.map((t) => t.arah)).size === 2, "simulasi: tiga kartu belum berurutan di awal, naik dan turun ada");
  cek(DS.TARGET_URUT.some((t) => t.data.length === 4) && DS.TARGET_URUT.some((t) => t.data.length === 3), "simulasi: tiga dan empat kartu");
  cek(DS.TARGET_GARIS.length === 3 && DS.TARGET_GARIS.every((t) => Number.isInteger((t.nilai - t.mulai) / t.langkah) && (t.nilai - t.mulai) / t.langkah >= 1 && (t.nilai - t.mulai) / t.langkah <= 9) && new Set(DS.TARGET_GARIS.map((t) => (t.nilai - t.mulai) / t.langkah)).size === 3 && new Set(DS.TARGET_GARIS.map((t) => t.langkah)).size === 2, "simulasi: tiga sasaran garis di tanda satu sampai sembilan, petak 10 dan 100");
  cek(tanpaDigit(DS.MISI_DERMAGA_TEKS) && bersih(DS.MISI_DERMAGA_TEKS) && DS.MISI_DERMAGA_TEKS === MT.MISI_K4B1.C && D.MISI_DERMAGA_TEKS === DS.MISI_DERMAGA_TEKS && DS.MISI_DERMAGA_TEKS.length >= 10 && DS.MISI_DERMAGA_TEKS.length <= 120, "simulasi: teks misi tanpa digit dan kata terlarang, sama dengan misi-teks-k4b1");

  const a = L.awalDermaga();
  cek(a.alat === "dermaga" && a.mode === "banding" && a.lihat === 0 && a.tandaPilih === -1 && !a.tolak && !a.samaBenar && a.susun.join() === DS.TARGET_URUT[0].data.join() && a.titik === 0 && ["bandBenar", "naikBenar", "turunBenar", "garisBenar"].every((f) => a[f].length === 0) && a.salah === 0, "simulasi: keadaan awal");
  // Banding dari kiri.
  cek(L.tempatPerlu(a) === 3 && L.tempatPerlu({ ...a, bandKe: 1 }) === 1 && L.tempatPerlu({ ...a, bandKe: 2 }) === 4, "banding: tempat yang harus dilihat dihitung dari data");
  sama([0, 1, 2].map((i) => L.tandaBenar({ ...a, bandKe: i })), [1, 0, 2], "banding: tanda benar dihitung dari data (lebih dari, kurang dari, sama dengan)");
  const t0 = L.pilihTanda(a, 1);
  cek(!t0.ok && t0.k.tolak === true && t0.k.salah === 0 && t0.k.tandaPilih === -1, "banding: alat menolak memilih tanda sebelum angka berbeda pertama terlihat (bukan percobaan keliru)");
  sama(S.misiBaru(MK.MISI_C, t0.k, new Set()), ["c-tolak"], "banding: misi c-tolak");
  cek(/Belum ada tempat yang dilihat/.test(L.petunjukBanding(a)) && /Lihat tempat berikutnya/.test(L.petunjukBanding(a)) && tanpaDigit(L.petunjukBanding(a)) && !L.periksaBanding(a).ok, "banding: petunjuk sebelum melihat menunjuk langkah yang belum dilakukan");
  const l1 = L.lihatBerikut(a).k;
  const l2 = L.lihatBerikut(l1).k;
  cek(l1.lihat === 1 && l2.lihat === 2 && /belum terlihat/.test(L.petunjukBanding(l2)) && !L.pilihTanda(l2, 1).ok && tanpaDigit(L.petunjukBanding(l2)), "banding: dua tempat dilihat, angka berbeda pertama belum terlihat");
  const l3 = L.lihatBerikut(l2).k;
  cek(l3.lihat === 3 && /Pilih satu tanda/.test(L.petunjukBanding(l3)) && !L.periksaBanding(l3).ok, "banding: angka berbeda terlihat, tanda belum dipilih");
  const pBeda = L.pilihTanda(l3, 1);
  cek(pBeda.ok && pBeda.k.tandaPilih === 1 && !pBeda.k.tolak, "banding: tanda dipilih setelah angka berbeda terlihat");
  const salahT = L.pilihTanda(l3, 0).k;
  cek(!L.periksaBanding(salahT).ok && L.periksaBanding(salahT).k.salah === 1 && /angka berbeda pertama/.test(L.petunjukBanding(salahT)) && tanpaDigit(L.petunjukBanding(salahT)), "banding: tanda keliru, petunjuk menunjuk angka berbeda pertama");
  const betul0 = L.periksaBanding(pBeda.k);
  cek(betul0.ok && betul0.k.bandBenar.join() === "0" && betul0.k.bandKe === 1 && betul0.k.lihat === 0 && betul0.k.tandaPilih === -1 && !betul0.k.samaBenar, "banding: benar membuka pasangan berikutnya dengan tempat belum dilihat");
  sama(S.misiBaru(MK.MISI_C, betul0.k, new Set()), ["c-banding"], "banding: misi c-banding");
  const t1 = L.pilihTanda(L.lihatBerikut(betul0.k).k, 0);
  cek(t1.ok && L.periksaBanding(t1.k).ok, "banding: pasangan kedua cukup satu tempat (ribuan berbeda)");
  cek(!L.lihatBerikut({ ...a, lihat: 4 }).ok && L.pilihTanda(a, 7).ok === false && L.pilihTanda(a, -1).k.tolak === false, "banding: berhenti di empat tempat, tanda di luar daftar diabaikan");
  const dua = { ...a, bandKe: 2, lihat: 3 };
  cek(!L.pilihTanda(dua, 2).ok && L.pilihTanda(dua, 2).k.tolak, "banding: pasangan sama harus dilihat sampai satuan, tiga tempat belum cukup");
  const sm = L.periksaBanding(L.pilihTanda({ ...dua, lihat: 4 }, 2).k);
  cek(sm.ok && sm.k.samaBenar === true && sm.k.bandBenar.join() === "2", "banding: pasangan sama dengan tanda sama dengan benar");
  sama(S.misiBaru(MK.MISI_C, sm.k, new Set()), ["c-banding", "c-sama"], "banding: misi c-sama (dan c-banding)");
  cek(/Semua tempat sama/.test(L.petunjukBanding({ ...dua, lihat: 4, tandaPilih: 0 })) && tanpaDigit(L.kalimatBanding(a)) && tanpaDigit(L.kalimatBanding(l2)) && tanpaDigit(L.kalimatBanding(l3)) && tanpaDigit(L.kalimatBanding(betul0.k)), "banding: kalimat tanpa digit");
  // Urutkan kartu.
  cek(L.urutanBenar(a).join() === "3248,3482,3824" && L.urutanBenar({ ...a, urutKe: 1 }).join() === "5610,5106,5061,5016" && L.urutanBenar({ ...a, urutKe: 2 }).join() === "8025,8205,8502", "urut: urutan benar dihitung dari data (naik dan turun)");
  cek(!L.periksaUrut(a).ok && /belum digeser/.test(L.petunjukUrut(a)) && tanpaDigit(L.petunjukUrut(a)), "urut: sebelum menggeser, petunjuk menunjuk langkah yang belum dilakukan");
  cek(!L.geserKartu(a, 1).ok && L.pilihKartu(a, 9).urutSel === -1 && L.pilihKartu(a, 2).urutSel === 2, "urut: menggeser tanpa memilih kartu ditolak, memilih di luar daftar diabaikan");
  const g1 = L.geserKartu(L.pilihKartu(a, 0), 1);
  cek(g1.ok && g1.k.susun.join() === "3248,3482,3824" && g1.k.urutSel === 1 && !L.geserKartu(L.pilihKartu(a, 0), -1).ok, "urut: kartu bertukar dengan tetangganya, tidak bisa keluar dari ujung");
  const urutkanSel = (k0) => {
    let k = k0;
    for (let n = 0; n < 60; n += 1) {
      const sasaran = L.urutanBenar(k);
      const i = k.susun.findIndex((x, q) => x !== sasaran[q]);
      if (i < 0) break;
      const j = k.susun.indexOf(sasaran[i]);
      k = L.pilihKartu(k, j);
      for (let m = j; m > i; m -= 1) k = L.geserKartu(k, -1).k;
    }
    return k;
  };
  const u0 = urutkanSel(a);
  cek(u0.susun.join() === "3248,3482,3824" && L.periksaUrut(u0).ok, "urut: kartu digeser sampai naik lalu benar");
  const terbalik = { ...a, susun: [3824, 3482, 3248] };
  cek(!L.periksaUrut(terbalik).ok && /terbalik/.test(L.petunjukUrut(terbalik)) && L.periksaUrut(terbalik).k.salah === 1, "urut: urutan terbalik keliru, petunjuk menyebut terbalik");
  const betulU = L.periksaUrut(u0);
  cek(betulU.k.naikBenar.join() === "0" && betulU.k.turunBenar.length === 0 && betulU.k.urutKe === 1 && betulU.k.susun.join() === "5061,5610,5016,5106" && betulU.k.urutSel === -1, "urut: naik benar membuka kartu turun berikutnya");
  sama(S.misiBaru(MK.MISI_C, betulU.k, new Set()), ["c-urut"], "urut: misi c-urut");
  const u1 = urutkanSel(betulU.k);
  const betulT = L.periksaUrut(u1);
  cek(u1.susun.join() === "5610,5106,5061,5016" && betulT.ok && betulT.k.turunBenar.join() === "1" && betulT.k.naikBenar.join() === "0", "urut: empat kartu diurutkan turun dan benar");
  sama(S.misiBaru(MK.MISI_C, betulT.k, new Set()), ["c-urut", "c-turun"], "urut: misi c-turun (dan c-urut)");
  cek(tanpaDigit(L.kalimatUrut(a)) && tanpaDigit(L.kalimatUrut(betulU.k)) && /terkecil ke yang terbesar/.test(L.kalimatUrut(a)) && /terbesar ke yang terkecil/.test(L.kalimatUrut({ ...betulU.k, naikBenar: [] })), "urut: kalimat tanpa digit, menyebut arah");
  // Garis bilangan.
  sama([0, 1, 2].map((i) => L.tandaSasaran({ ...a, garisKe: i })), [4, 7, 3], "garis: tanda sasaran dihitung dari data");
  sama([L.bilanganTanda(a, 0), L.bilanganTanda(a, 4), L.bilanganTanda(a, 10), L.bilanganTanda({ ...a, garisKe: 1 }, 7)], [6000, 6400, 7000, 7270], "garis: bilangan pada tanda");
  cek(/belum digeser/.test(L.petunjukGaris(a)) && !L.periksaGaris(a).ok && L.periksaGaris(a).k.salah === 1 && tanpaDigit(L.petunjukGaris(a)), "garis: sebelum menggeser, petunjuk menunjuk langkah yang belum dilakukan");
  cek(!L.geserTitik(a, -1).ok && L.geserTitik(a, 1).k.titik === 1 && !L.geserTitik({ ...a, titik: 10 }, 1).ok, "garis: titik berhenti di ujung garis");
  const g2 = { ...a, titik: 2 };
  cek(/kiri bilangan sasaran/.test(L.petunjukGaris(g2)) && /ke kanan/.test(L.petunjukGaris(g2)) && !L.periksaGaris(g2).ok, "garis: titik di kiri sasaran, petunjuk menyuruh ke kanan");
  const g3 = { ...a, titik: 6 };
  cek(/lewat/.test(L.petunjukGaris(g3)) && /ke kiri/.test(L.petunjukGaris(g3)) && !L.periksaGaris(g3).ok, "garis: titik melewati sasaran, petunjuk menyuruh ke kiri");
  let gk = a;
  for (let i = 0; i < 4; i += 1) gk = L.geserTitik(gk, 1).k;
  const betulG = L.periksaGaris(gk);
  cek(gk.titik === 4 && betulG.ok && betulG.k.garisBenar.join() === "0" && betulG.k.garisKe === 1 && betulG.k.titik === 0, "garis: titik di tanda sasaran benar, membuka garis berikutnya");
  sama(S.misiBaru(MK.MISI_C, betulG.k, new Set()), ["c-garis"], "garis: misi c-garis");
  cek(tanpaDigit(L.kalimatGaris(a)) && tanpaDigit(L.kalimatGaris(betulG.k)), "garis: kalimat tanpa digit");
  // Mulai lagi dan ganti alat.
  cek(L.mulaiLagiDermaga().bandKe === 0 && L.mulaiLagiDermaga().titik === 0 && !L.mulaiLagiDermaga().tolak && L.pilihModeDermaga(a, "garis").mode === "garis", "mulai lagi dan ganti alat");
  // Misi.
  const M = MK.MISI_C;
  cek(M.filter((m) => m.wajib).length === 4 && M.filter((m) => !m.wajib).length === 2, "misi C: empat wajib, dua bebas");
  cek(new Set(M.map((m) => m.id)).size === 6 && M.every((m) => m.id.startsWith("c-") && m.teks.length >= 10 && m.teks.length <= 120 && tanpaDigit(m.teks) && bersih(m.teks)), "misi C: id berawalan c-, unik, 10 sampai 120 huruf, tanpa digit");
  sama(MK.daftarMisiK4Bab1("C"), M, "daftarMisiK4Bab1 C");
  cek(M.every((m) => !m.cek({ alat: "kerangka" })), "misi C: alat lain tidak memenuhi misi");
  sama(S.misiBaru(M, a, new Set()), [], "misi C: keadaan awal tanpa misi baru");
  cek(S.misiBaru(M, { ...a, salah: 9, mode: "urut", lihat: 3, tandaPilih: 1, susun: [3248, 3482, 3824], urutSel: 1, titik: 4 }, new Set()).length === 0, "misi C: tempat yang dilihat, tanda, kartu yang digeser, dan titik yang belum diperiksa tidak dihitung sebagai misi");
  sama(S.misiBaru(M, { ...a, bandBenar: [0], naikBenar: [0], turunBenar: [1], garisBenar: [0], samaBenar: true, tolak: true }, new Set()), ["c-banding", "c-urut", "c-turun", "c-garis", "c-sama", "c-tolak"], "misi C: semua misi tercapai");
}

/* Mind-map dan Infografis diuji di scripts/uji-visual-k4b1abc.mjs (rancangan sendiri per Sub-Bab, label kosong). */

/* ------------------------------ Pengenal ucapan ------------------------------ */
{
  const nm = (nama) => ({ jenis: "nama", nama });
  for (const nama of ["kurang dari", "lebih dari", "ribuan", "ratusan", "puluhan", "satuan", "kiri", "kanan", "terkecil", "terbesar"]) cek(K.cocokUcapan(nama, nm(nama)).cocok, `cocok: kata ${nama} dikenali`);
  cek(K.cocokUcapan("sama", nm("sama dengan")).cocok && K.cocokUcapan("sama dengan", nm("sama dengan")).cocok, "cocok: sama dengan");
  sama(K.kataDariUcapan("lebih kecil"), ["kurang dari", "terkecil"], "ucapan: lebih kecil dikenali sebagai kurang dari");
  sama(K.kataDariUcapan("paling besar"), ["terbesar"], "ucapan: paling besar dikenali sebagai terbesar");
  sama(K.kataDariUcapan("tidak kiri"), [], "ucapan: tidak kiri tidak dihitung");
  sama(K.kataDariUcapan("halo"), [], "ucapan: kata lain tidak dikenali");
  cek(!K.cocokUcapan("lebih dari", nm("kurang dari")).cocok && !K.cocokUcapan("kurang dari", nm("lebih dari")).cocok && !K.cocokUcapan("ratusan", nm("ribuan")).cocok && !K.cocokUcapan("kiri", nm("kanan")).cocok && !K.cocokUcapan("terbesar", nm("terkecil")).cocok && !K.cocokUcapan("puluhan", nm("satuan")).cocok, "cocok: kata berbeda tidak cocok");
  cek(!K.cocokUcapan("lima", { jenis: "angka", n: 5 }).cocok, "cocok: bab ini tidak punya jawaban suara berupa angka");
}

/* ------------------------------ CPA ------------------------------ */
const TAHAP = { Concrete: ["benda", D.CONCRETE], Pictorial: ["diagram", D.PICTORIAL], Abstract: ["lambang", D.ABSTRACT] };
const CARA = ["klik", "kanvas", "suara"];
const METODE = ["igil", "kiri", "garis", "kartu"];
const TIPE_METODE = ["banding", "kiri", "garis", "kartu"];
/** Tempat Cari kesalahan: [indeks misi, indeks langkah]. */
const TEMPAT_SALAH = { Concrete: [[0, 0]], Pictorial: [[0, 0]], Abstract: [[0, 0]] };
const semuaTeksLangkah = (ls, rupa, cara) => [ls.judul, ls.suara, LC.instruksi(ls.langkah, rupa, cara, ls.metode), LC.kalimatTanya(ls.langkah, cara), LC.kalimatKunci(ls.langkah, cara), LC.petunjukSalah(ls.langkah, cara, 1)];
{
  sama(LC.URUT_METODE, METODE, "urutan metode");
  cek(LC.NAMA_METODE.igil.includes("Banding dari Kiri, Garis Bilangan, Urut Kartu") && LC.NAMA_METODE.kiri.includes("Left-to-Right Compare") && LC.NAMA_METODE.garis.includes("Number Line") && LC.NAMA_METODE.kartu.includes("Card Sort"), "nama metode IGIL dan tiga metode global");
  cek(METODE.every((m) => emojiSah(LC.IKON_METODE[m])), "ikon metode sah");
  let nomor = 2;
  for (const [nama, [rupa, soal]] of Object.entries(TAHAP)) {
    cek(soal.length === 3 && soal.map((s) => s.cara).join() === CARA.join(), `${nama}: tiga misi Klik, Kanvas, Suara`);
    cek(soal.every((s) => s.langkah.length === 4 && s.langkah.map((l) => l.metode).join() === METODE.join()), `${nama}: empat langkah per misi (IGIL, Left-to-Right Compare, Number Line, Card Sort)`);
    for (const s of soal) {
      cek(s.nomor === nomor, `${nama}: nomor misi berlanjut ${nomor}`);
      nomor += 1;
      cek(s.judul.startsWith("Misi Dermaga") && s.cerita.length > 15 && bersih(s.judul) && bersih(s.cerita) && tanpaDigit(s.cerita), `${nama} ${s.nomor}: judul dan cerita sah`);
      sama(s.langkah.map((l) => LC.dasarDari(l.langkah).tipe), TIPE_METODE, `${nama} ${s.nomor}: jenis tugas per metode`);
      for (const ls of s.langkah) {
        cek(ls.cara === s.cara, `${nama} ${s.nomor}: cara langkah sama dengan misi`);
        const teks = semuaTeksLangkah(ls, rupa, s.cara);
        cek(teks.every((t) => tanpaDigit(t) && bersih(t)), `${nama} ${s.nomor} ${ls.metode}: teks tanpa digit dan kata terlarang (${teks.find((t) => !tanpaDigit(t) || !bersih(t)) ?? ""})`);
        cek(emojiSah(teks.join("")), `${nama} ${s.nomor} ${ls.metode}: emoji sah`);
        cek(ls.judul === ls.suara && ls.judul === LC.instruksi(ls.langkah, rupa, s.cara, ls.metode), `${nama} ${s.nomor} ${ls.metode}: judul dan suara sama dengan instruksi`);
        if (rupa !== "benda") cek(!adaEmoji(teks.join(" ")), `${nama} ${s.nomor} ${ls.metode}: teks tugas tanpa emoji (batas rupa)`);
        cek(/Metode IGIL|Left-to-Right Compare|Number Line|Card Sort|sudah menjawab/.test(ls.judul), `${nama} ${s.nomor} ${ls.metode}: judul tugas memuat nama metode`);
        cek(!/(^|\s)kelas(\s|$)/i.test(ls.judul), `${nama} ${s.nomor} ${ls.metode}: tanpa kata kelas`);
      }
    }
    const salahL = soal.flatMap((s, si) => s.langkah.map((l, li) => [si, li, l])).filter(([, , l]) => l.langkah.tipe === "salah");
    sama(salahL.map(([si, li]) => [si, li]), TEMPAT_SALAH[nama], `${nama}: tempat Cari kesalahan`);
    for (const [, , l] of salahL) {
      const x = l.langkah;
      cek(x.alasan.length === 3 && new Set(x.alasan).size === 3 && x.benar >= 0 && x.benar <= 2 && x.keliru.length > 20 && x.kataTokoh.length > 15 && ["Satria", "Laras", "Genta"].includes(x.tokoh), `${nama}: Cari kesalahan lengkap`);
      cek(tanpaDigit(x.kataTokoh + x.alasan.join(" ") + x.keliru) && bersih(x.kataTokoh + x.alasan.join(" ") + x.keliru), `${nama}: Cari kesalahan tanpa digit dan kata terlarang`);
      const pil = LC.pilihanKlik(x);
      cek(pil.length === 3 && new Set(pil).size === 3 && pil.includes(String(x.jawabTokoh)), `${nama}: pilihan klik Cari kesalahan memuat jawaban tokoh (${pil.join("/")})`);
      const teksBenar = LC.teksKunciKlik(x);
      cek(teksBenar !== null && pil.includes(teksBenar) && pil[0] !== teksBenar, `${nama}: jawaban sendiri ada dan bukan pilihan pertama`);
      if (x.betul) cek(String(teksBenar) === String(x.jawabTokoh), `${nama}: jawaban tokoh yang benar sama dengan jawaban benar`);
      else cek(String(teksBenar) !== String(x.jawabTokoh), `${nama}: jawaban benar berbeda dari jawaban tokoh`);
      cek(LC.petunjukSalah(x, "klik", x.jawabTokoh).startsWith(`Itu jawaban ${x.tokoh}`), `${nama}: petunjuk menjelaskan jawaban tokoh`);
    }
  }
  cek(nomor === 11, "nomor misi berlanjut sampai sepuluh");
  // Seed Cari kesalahan dari alur.
  const sC = D.CONCRETE[0].langkah[0].langkah;
  cek(sC.tokoh === "Satria" && sC.dasar.tipe === "banding" && LC.bedaPertama(sC.dasar.a, sC.dasar.b) < 3 && sC.dasar.a % 10 > sC.dasar.b % 10 && sC.jawabTokoh === ">" && LC.teksKunciKlik(sC) === "<" && !sC.betul, "Cari kesalahan Concrete: Satria membandingkan dari satuan dan salah (seed alur)");
  const sP = D.PICTORIAL[0].langkah[0].langkah;
  cek(sP.tokoh === "Genta" && sP.dasar.tipe === "banding" && LC.angkaTempat(sP.dasar.a)[0] === LC.angkaTempat(sP.dasar.b)[0] && LC.bedaPertama(sP.dasar.a, sP.dasar.b) === 1 && sP.jawabTokoh === LC.teksKunciKlik(sP) && sP.betul === true, "Cari kesalahan Pictorial: Genta bilang ribuan sama jadi lihat ratusan, benar (seed alur)");
  const sA = D.ABSTRACT[0].langkah[0].langkah;
  cek(sA.tokoh === "Satria" && sA.dasar.tipe === "banding" && sA.dasar.a % 10 > sA.dasar.b % 10 && sA.jawabTokoh === ">" && LC.teksKunciKlik(sA) === "<" && !sA.betul, "Cari kesalahan Abstract: Satria membandingkan dari satuan dan salah");
  // Posisi alasan benar (rumus di LangkahDermaga): tidak selalu tombol pertama.
  {
    const posisiAlasan = (x) => Array.from(`${x.tokoh}${x.kataTokoh}${x.alasan[x.benar]}`).reduce((t, c) => t + c.charCodeAt(0), 0) % 3;
    const semuaSalah = Object.values(TAHAP).flatMap(([, soal]) => soal.flatMap((s) => s.langkah.map((l) => l.langkah)).filter((x) => x.tipe === "salah"));
    const pos = semuaSalah.map((x) => {
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
        cek(typeof d.benda === "string" && d.benda.length >= 3, `${tag}: benda bernama`);
        if (rupa === "benda") cek(!!DG_EMOJI[d.benda] && emojiSah(DG_EMOJI[d.benda]), `${tag}: Concrete memakai benda beremoji (${d.benda})`);
        if (d.tipe === "banding" || d.tipe === "kiri") {
          cek(d.a >= 1000 && d.a <= 9999 && d.b >= 1000 && d.b <= 9999 && d.a !== d.b && ![d.a, d.b].some((n) => CERITA.includes(n)), `${tag}: dua bilangan empat angka berbeda dan berbeda dari Story`);
          cek(s.cara !== "kanvas" || LC.bedaPertama(d.a, d.b) >= 0, `${tag}: bilangan berbeda`);
        }
        if (d.tipe === "garis") {
          const ia = (d.a - d.mulai) / d.langkah;
          const ib = (d.b - d.mulai) / d.langkah;
          cek(Number.isInteger(ia) && Number.isInteger(ib) && ia >= 1 && ia <= 9 && ib >= 1 && ib <= 9 && ia !== ib && [10, 100].includes(d.langkah), `${tag}: dua titik di tanda satu sampai sembilan pada garis petak 10 atau 100 (${ia}, ${ib})`);
          cek(![d.a, d.b].some((n) => CERITA.includes(n)) && d.mulai >= 1000 && d.mulai + 10 * d.langkah <= 10000, `${tag}: garis di dalam sepuluh ribu dan berbeda dari Story`);
        }
        if (d.tipe === "kartu") {
          cek(d.data.length >= 3 && d.data.length <= 4 && new Set(d.data).size === d.data.length && d.data.every((n) => n >= 1000 && n <= 9999 && !CERITA.includes(n)), `${tag}: tiga atau empat kartu berbeda dan berbeda dari Story`);
          cek(urutNaik(d.data).join() !== d.data.join() && urutNaik(d.data).reverse().join() !== d.data.join(), `${tag}: kartu belum berurutan di awal`);
        }
      }
  // Tiap tahap memuat semua jenis tugas, tanda kurang dari dan lebih dari, kata kiri dan kanan.
  for (const [nama, [, soal]] of Object.entries(TAHAP)) {
    const tipe = new Set(soal.flatMap((s) => s.langkah.map((l) => LC.dasarDari(l.langkah).tipe)));
    cek(["banding", "kiri", "garis", "kartu"].every((t) => tipe.has(t)), `${nama}: jenis tugas banding, kiri, garis, kartu ada`);
  }
  cek(new Set([...D.CONCRETE, ...D.PICTORIAL, ...D.ABSTRACT].flatMap((s) => s.langkah.map((l) => LC.dasarDari(l.langkah)).filter((d) => d.tipe === "kartu").map((d) => d.arah))).size === 2, "tugas kartu: naik dan turun ada");
}

/* ------------------------------ Tugas dihitung dari data ------------------------------ */
{
  const nama = (k) => (k ? (k.jenis === "nama" ? k.nama : k.n) : null);
  const bd = (a, b) => ({ tipe: "banding", benda: "x", a, b });
  const kr = (a, b) => ({ tipe: "kiri", benda: "x", a, b });
  const gr = (a, b, cari = "besar") => ({ tipe: "garis", benda: "x", mulai: 6000, langkah: 100, a, b, cari });
  const kt = (data, arah, cari = "kecil", tempat = "ratusan") => ({ tipe: "kartu", benda: "x", data, arah, cari, tempat });
  const tiga = (l) => ["klik", "kanvas", "suara"].map((c) => nama(LC.kunciJawab(l, c)));
  sama(tiga(bd(6274, 6247)), [">", 3, "lebih dari"], "kunci banding: tanda, tempat ke berapa, kata");
  sama(tiga(bd(2905, 3095)), ["<", 1, "kurang dari"], "kunci banding: ribuan berbeda");
  sama(["klik", "suara"].map((c) => nama(LC.kunciJawab(bd(7318, 7318), c))), ["=", "sama dengan"], "kunci banding: dua bilangan sama");
  sama(tiga(kr(5481, 5438)), ["puluhan", 8, "puluhan"], "kunci kiri: tempat, angka pada bilangan yang lebih besar, tempat");
  sama(tiga(gr(6300, 6700)), ["6.700", 4, "kiri"], "kunci garis besar: bilangan, petak, titik A di kiri");
  sama(tiga(gr(6700, 6300, "kecil")), ["6.300", 4, "kanan"], "kunci garis kecil: bilangan, petak, titik A di kanan");
  sama(tiga(kt([3482, 3248, 3824], "naik", "kecil", "ratusan")), ["3.248, 3.482, 3.824", 2, "terkecil"], "kunci kartu naik terkecil: urutan, angka, kata");
  sama(tiga(kt([3482, 3248, 3824], "turun", "besar", "puluhan")), ["3.824, 3.482, 3.248", 2, "terbesar"], "kunci kartu turun terbesar");
  sama([LC.petakAntara(gr(6300, 6700)), LC.tandaGaris(gr(6300, 6700), 6700), LC.digitTempat(5748, "puluhan"), LC.terkecil([5, 2, 9]), LC.terbesar([5, 2, 9])], [4, 7, 4, 2, 9], "pembantu data");
  sama([LC.urutkan([3, 1, 2]), LC.teksUrut([1200, 3400], "turun")], [[1, 2, 3], "3.400, 1.200"], "urutkan tidak mengubah data asli, teks urut dengan titik ribuan");
  // Pilihan klik.
  sama([">", "<", "="].map((t) => LC.pilihanKlik(bd(t === ">" ? 6274 : t === "<" ? 2905 : 7318, t === ">" ? 6247 : t === "<" ? 3095 : 7318)).join()), ["<,>,=", ">,=,<", ">,=,<"], "pilihan klik banding: tiga tanda, benar bukan yang pertama");
  const pk = LC.pilihanKlik(kr(5481, 5438));
  cek(pk.length === 3 && new Set(pk).size === 3 && pk.includes("puluhan") && pk[0] !== "puluhan" && pk.includes("satuan"), `pilihan klik kiri: tiga tempat, benar bukan yang pertama, satuan jadi pengecoh (${pk.join("/")})`);
  const pg = LC.pilihanKlik(gr(6300, 6700));
  cek(pg.length === 3 && new Set(pg).size === 3 && pg.includes("6.700") && pg[0] !== "6.700" && pg.includes("6.300"), `pilihan klik garis: tiga bilangan, benar bukan yang pertama, bilangan lain pada garis jadi pengecoh (${pg.join("/")})`);
  const pu = LC.pilihanKlik(kt([3482, 3248, 3824], "naik"));
  cek(pu.length === 3 && new Set(pu).size === 3 && pu.includes("3.248, 3.482, 3.824") && pu[0] !== "3.248, 3.482, 3.824" && pu.includes("3.824, 3.482, 3.248"), `pilihan klik kartu: tiga urutan, benar bukan yang pertama, memuat urutan terbalik (${pu.join("/")})`);
  sama([LC.pilihanSuara(bd(6274, 6247), "suara"), LC.pilihanSuara(gr(6300, 6700), "suara"), LC.pilihanSuara(kt([1, 2, 3], "naik", "kecil"), "suara")], [["kurang dari", "lebih dari"], ["kanan", "kiri"], ["terbesar", "terkecil"]], "pilihan suara: dua kata, benar bukan yang pertama");
  sama(LC.pilihanSuara(kr(5481, 5438), "suara").length, 3, "pilihan suara kiri: tiga nama tempat");
  cek(LC.pilihanSuara(kr(5481, 5438), "suara")[0] !== "puluhan" && LC.pilihanSuara(kr(5481, 5438), "suara").includes("puluhan"), "pilihan suara kiri: benar bukan yang pertama");

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
          cek(s.cara === "kanvas", `${tag}: jawaban angka hanya pada kanvas`);
          kanvasAngka.push(kunci.n);
          cek(kunci.n >= 1 && kunci.n <= 9, `${tag}: jawaban kanvas satu angka satu sampai sembilan (${kunci.n})`);
        }
        if (s.cara !== "kanvas") cek(kunci?.jenis === "nama", `${tag}: jawaban klik dan suara berupa nama`);
        if (s.cara === "klik" && kunci !== null) {
          const pil = LC.pilihanKlik(l);
          const benar = LC.teksKunciKlik(l);
          cek(pil.length === 3 && new Set(pil).size === 3 && pil.includes(benar) && pil[0] !== benar, `${tag}: pilihan klik unik dan jawaban benar bukan yang pertama (${pil.join("/")})`);
          if (d.tipe === "banding") cek(pil.every((p) => ["<", ">", "="].includes(p)), `${tag}: pilihan tanda`);
          if (d.tipe === "garis") cek(pil.every((p) => /^\d\.\d{3}$/.test(p)), `${tag}: pilihan bilangan berpemisah titik ribuan (${pil.join("/")})`);
          if (d.tipe === "kartu") cek(pil.every((p) => p.split(", ").every((q) => /^\d\.\d{3}$/.test(q)) && p.split(", ").length === d.data.length), `${tag}: pilihan urutan memuat semua kartu`);
        }
        if (s.cara === "suara" && kunci !== null) {
          const pil = LC.pilihanSuara(l, "suara");
          const benar = LC.teksKunciPilihan(kunci);
          cek(pil.includes(benar) && pil.length === (d.tipe === "kiri" ? 3 : 2) && new Set(pil).size === pil.length && tanpaDigit(pil.join(" ")), `${tag}: pilihan cadangan suara memuat jawaban benar (${pil.join("/")})`);
          cek(pil[0] !== benar, `${tag}: jawaban suara bukan pilihan pertama`);
          cek(K.cocokUcapan(benar, kunci).cocok, `${tag}: ucapan jawaban benar dikenali (${benar})`);
          for (const lain of pil.filter((p) => p !== benar)) cek(!K.cocokUcapan(lain, kunci).cocok, `${tag}: ucapan ${lain} bukan jawaban benar`);
        }
        if (kunci) cek(LC.kalimatKunci(l, s.cara).length > 12 && tanpaDigit(LC.kalimatKunci(l, s.cara)), `${tag}: kalimat penjelasan ada, tanpa digit`);
        cek(LC.petunjukSalah(l, s.cara, "x").length > 20, `${tag}: petunjuk salah ada`);
        if (rupa === "lambang") {
          const baris = LC.barisKartu(d, s.cara);
          cek(Array.isArray(baris) && baris.length >= 2 && baris.every((b) => typeof b === "string" && b.length > 3), `${tag}: kartu kata ada`);
          cek(baris.every((b) => !adaEmoji(b)), `${tag}: kartu kata tanpa emoji`);
        }
      }
    cek(new Set(kanvasAngka).size === kanvasAngka.length && kanvasAngka.length === 4, `${namaT}: empat angka jawaban Tulis di kanvas tidak kembar (${kanvasAngka.join(", ")})`);
  }
  const kv = (nm) => TAHAP[nm][1].filter((s) => s.cara === "kanvas").flatMap((s) => s.langkah.map((l) => LC.kunciJawab(l.langkah, "kanvas").n));
  sama(kv("Concrete"), [3, 8, 5, 2], "angka kanvas Concrete");
  sama(kv("Pictorial"), [4, 7, 6, 3], "angka kanvas Pictorial");
  sama(kv("Abstract"), [2, 1, 7, 3], "angka kanvas Abstract");
  const kl = (nm) => TAHAP[nm][1].filter((s) => s.cara === "klik").flatMap((s) => s.langkah.map((l) => LC.teksKunciKlik(l.langkah)));
  sama(kl("Concrete"), ["<", "puluhan", "6.700", "3.264, 3.426, 3.846"], "jawaban klik Concrete");
  sama(kl("Pictorial"), [">", "ratusan", "2.400", "6.051, 6.105, 6.150, 6.510"], "jawaban klik Pictorial");
  sama(kl("Abstract"), ["<", "satuan", "8.800", "8.091, 8.109, 8.910"], "jawaban klik Abstract");
  const su = (nm) => TAHAP[nm][1].filter((s) => s.cara === "suara").flatMap((s) => s.langkah.map((l) => nama(LC.kunciJawab(l.langkah, "suara"))));
  sama(su("Concrete"), ["lebih dari", "ratusan", "kanan", "terkecil"], "jawaban suara Concrete");
  sama(su("Pictorial"), ["kurang dari", "ribuan", "kiri", "terbesar"], "jawaban suara Pictorial");
  sama(su("Abstract"), ["kurang dari", "puluhan", "kanan", "terkecil"], "jawaban suara Abstract");
  const semuaKata = Object.keys(TAHAP).flatMap((nm) => su(nm));
  for (const w of ["kurang dari", "lebih dari", "ribuan", "ratusan", "puluhan", "kiri", "kanan", "terkecil", "terbesar"]) cek(semuaKata.includes(w), `tugas suara: kata ${w} muncul`);
  // Data CPA berbeda dari data Simulasi.
  const dataSim = new Set([...DS.TARGET_BANDING.flatMap((t) => [t.a, t.b]), ...DS.TARGET_URUT.flatMap((t) => t.data), ...DS.TARGET_GARIS.map((t) => t.nilai)]);
  const dataCpa = Object.values(TAHAP).flatMap(([, soal]) => soal.flatMap((s) => s.langkah.flatMap((l) => { const d = LC.dasarDari(l.langkah); return d.tipe === "kartu" ? d.data : d.tipe === "garis" ? [d.a, d.b] : [d.a, d.b]; })));
  cek(dataCpa.every((n) => !dataSim.has(n)), "data CPA berbeda dari data Simulasi");
  // Poin penting dan penutup.
  cek(D.POIN_PENTING.length >= 6 && D.POIN_PENTING.every((p) => p.length > 20 && bersih(p)) && D.POIN_PENTING_SUARA.every((p) => tanpaDigit(p) && !/[=<>+−]/.test(p)), "poin penting: banyak, bersih, suara tanpa digit dan tanda");
  const poin = D.POIN_PENTING.join(" ").toLowerCase();
  for (const m of ["dari kiri", "ribuan", "ratusan", "angka berbeda", "kurang dari", "lebih dari", "sama dengan", "garis bilangan", "kanan", "naik", "turun", "banding dari kiri", "urut kartu"]) cek(poin.includes(m), `poin penting memuat ${m}`);
  cek(tanpaDigit(D.PENUTUP_C) && bersih(D.PENUTUP_C) && /Pak Darwis/.test(D.PENUTUP_C) && /kelapa/.test(D.PENUTUP_C) && D.PENUTUP_C.endsWith("?"), "penutup C: jembatan ke Sub-Bab D tanpa digit");
  cek(Object.values(D.TEMA_DERMAGA).every((t) => emojiSah(t.ikon) && t.nama.length >= 7 && t.cara.length > 20 && tanpaDigit(t.cara) && bersih(t.cara)), "tema tiga tahap sah");
  cek(D.TEMA_DERMAGA.pictorial.cara.includes("polos") && D.TEMA_DERMAGA.abstract.cara.includes("kartu"), "tema: Pictorial polos, Abstract kartu");
  cek(D.CONCRETE_DERMAGA === D.CONCRETE && D.PICTORIAL_DERMAGA === D.PICTORIAL && D.ABSTRACT_DERMAGA === D.ABSTRACT && D.MISI_DERMAGA_TEKS === DS.MISI_DERMAGA_TEKS, "nama ekspor untuk pemasang");
}

/* ------------------------------ Berkas ------------------------------ */
{
  const berkas = readdirSync(folderUrl).filter((f) => /\.(ts|tsx)$/.test(f));
  for (const nama of ["logika.ts", "data-sim.ts", "data-peta.ts", "data-info.ts", "logika-cpa.ts", "data.ts", "periksa.ts", "JawabDermaga.tsx", "LangkahDermaga.tsx", "GambarDermaga.tsx", "TahapDermaga.tsx", "SimulasiPapanDermaga.tsx", "PapanDermaga.tsx", "DaftarDermaga.tsx"]) cek(berkas.includes(nama), `berkas ${nama} ada`);
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folderUrl), "utf8");
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d || c.codePointAt(0) === 0x1f6de), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}|\\u\{1FA91\}|\\u\{1FAB5\}|\\u\{1F6DF\}/i.test(s), `${f}: kode emoji tidak melewati U+1FA95 dan tanpa kursi, kayu, ban, pelampung`);
    cek(!/buku|kelompok|bernilai|tebak|nilai tempat/i.test(s), `${f}: tanpa kata buku, kelompok, bernilai, tebak, nilai tempat`);
    cek(!/\u{1F41F}|\u{1F420}|\u{1F421}|\u{1F988}|\u{1F42C}|\u{1F38F}|\\u\{1F41F\}|\\u\{1F420\}|\\u\{1F421\}|\\u\{1F988\}|\\u\{1F42C\}|\\u\{1F38F\}/iu.test(s), `${f}: tanpa emoji ikan atau 🎏`);
    if (/^(logika|logika-cpa|periksa|data|data-sim|data-peta|data-info).ts$/.test(f)) cek(!/from "react"|fetch\(/.test(s), `${f}: tanpa React dan jaringan`);
    cek(!/tiket-k4b1a|handuk-k4b1b|kelapa-k4b1d|resepsi-k4b1e|sisa-k4b1f|perahu-k4b1g|jatah-k4b1h|jadwal-k4b1i|papan-k3b5a|tabel-k3b5b|SubBabK4B1|kit-k4b1|infografis-k4b1|skenario-k4b1|mesin-k4b1|dasar-k4b1|diagram-k4b1|bantu-k4b1|papan-k4b1|skala-k4b1|naskah-k4b1|data-k4b1/.test(s), `${f}: tidak memakai folder sub-bab lain atau berkas lama Bab 1`);
  }
  // Teks layar tidak memuat kata terlarang, termasuk nama berkas data.
  const layar = ["LangkahDermaga.tsx", "TahapDermaga.tsx", "SimulasiPapanDermaga.tsx", "GambarDermaga.tsx"].map((f) => readFileSync(new URL(f, folderUrl), "utf8")).join("\n");
  const teksLayar = [...layar.matchAll(/>\s*([^<>{}\n]{4,})\s*</g)].map((m) => m[1]).join(" ");
  cek(!/\b(skor|nilai|soal|tebak|kunci|latihan|teman|kelompok|buku|kelas)\b/i.test(teksLayar), "teks layar komponen tanpa kata terlarang");
  cek(/\bTugas\b/.test(layar) && !/>\s*Soal/.test(layar), "teks layar CPA memakai Tugas");
  cek(!/capitalize/.test(layar), "teks layar: tanpa kelas capitalize");
  const th = readFileSync(new URL("TahapDermaga.tsx", folderUrl), "utf8");
  cek(/umum: Umum;\s*rupa: Rupa;\s*soal: SoalMisi\[\];\s*pita:/.test(th) && /teksAkhir: string/.test(th) && /poinPenting\?: boolean/.test(th), "TahapDermaga: props umum, rupa, soal, pita, teksAkhir, poinPenting");
  cek(/IKON_METODE\[ls\.metode\]/.test(th) && /rupa === "benda" \?/.test(th), "TahapDermaga: ikon metode hanya pada rupa benda (Pictorial dan Abstract tanpa emoji metode)");
  cek(/export default function TahapDermaga/.test(th) && /Cari kesalahan/.test(th) && /POIN_PENTING/.test(th) && /PENUTUP_C/.test(th), "TahapDermaga: ekspor, Cari kesalahan, Poin Penting, jembatan");
  cek(/"dermaga"/.test(th) && /"peta"/.test(th) && /"daftar"/.test(th) && !/"etalase"|"kapur"|"catatan"|"bambu"|"denah"|"tikar"|"tirai"|"jepit"|"bungkus"|"kain"/.test(th), "TahapDermaga: pola visual dermaga kayu, peta laut, daftar Kak Tiara (berbeda dari bab sebelumnya)");
  cek(/PAPAN DERMAGA/.test(th) && /Perahu \$\{/.test(th) && /Tanda \$\{/.test(th) && /Cap \$\{/.test(th), "TahapDermaga: kemajuan deret perahu, deret tanda, deret cap");
  const lg = readFileSync(new URL("LangkahDermaga.tsx", folderUrl), "utf8");
  cek(/export function LangkahDermaga/.test(lg) && /JawabSuaraDermaga/.test(lg) && /JawabTulis/.test(lg) && /pilihanSuara\(l, cara\)/.test(lg) && /TampilDasar/.test(lg), "LangkahDermaga: ekspor, jawab suara dengan pilihan ketuk, jawab tulis di kanvas");
  cek(/ucapkan\(/.test(lg), "LangkahDermaga: ucapan memakai kata, bukan digit");
  const jw = readFileSync(new URL("JawabDermaga.tsx", folderUrl), "utf8");
  cek(/gagalSekali/.test(jw) && /Ini jawaban yang benar|jawaban yang benar/.test(jw) && /PilihanKata/.test(jw) && /setCadangan\(true\)/.test(jw) && /e\.error === "not-allowed"/.test(jw), "JawabDermaga: galat mikrofon dihitung gagal, pilihan ketuk sebagai cadangan, jawaban benar setelah tiga kali salah");
  const gm = readFileSync(new URL("GambarDermaga.tsx", folderUrl), "utf8");
  cek(/export function TampilDasar/.test(gm) && /rupa === "lambang"/.test(gm) && /EMOJI_BENDA/.test(gm) && /GarisBilangan/.test(gm) && /KartuRak/.test(gm) && /PapanTempat/.test(gm), "GambarDermaga: papan tempat angka, garis bilangan, kartu bilangan, tampilan dasar, kartu untuk Abstract");
  const sim = readFileSync(new URL("SimulasiPapanDermaga.tsx", folderUrl), "utf8");
  cek(/export default function SimulasiPapanDermaga/.test(sim) && /onKeadaan/.test(sim) && /MISI_DERMAGA_TEKS/.test(sim) && /Lihat tempat berikutnya/.test(sim) && /Alat menolak/.test(sim), "SimulasiPapanDermaga: ekspor, onKeadaan, teks misi, lihat tempat berikutnya, alat menolak");
  for (const [f, nm] of [["PapanDermaga.tsx", "PapanDermagaK4B1"], ["DaftarDermaga.tsx", "DaftarDermagaK4B1"]]) {
    const s = readFileSync(new URL(f, folderUrl), "utf8");
    cek(/speakGuru/.test(s) && /onLanjut/.test(s) && /teksLanjut/.test(s) && !/peta-kartu\//.test(s) && new RegExp(`export default function ${nm}`).test(s) && new RegExp(`export \\{ ${nm} \\}`).test(s), `${f}: komponen sendiri tanpa peta-kartu, ekspor ${nm}`);
  }
  // Berkas bersama: Simulasi memasang Papan Dermaga.
  const sk = readFileSync(new URL("../src/components/modul/SimulasiK4Bab1.tsx", import.meta.url), "utf8");
  cek(/SimulasiPapanDermaga/.test(sk) && /laporMisiDermaga\(daftarMisiDermaga\("C"\), k, a\.capai\)/.test(sk) && !/judulBab=\{`Kelas/.test(sk), "SimulasiK4Bab1: langkahPapanDermagaC memasang Papan Dermaga, judul bab tanpa kata Kelas");
  const ej = readFileSync(new URL("../src/lib/ejaan-inggris-id.ts", import.meta.url), "utf8");
  cek(/left-to-right compare/i.test(ej) && /number line/i.test(ej) && /card sort/i.test(ej), "ejaan: tiga nama metode global ada");
  const vc = readFileSync(new URL("../src/components/modul/video-k4b1c.tsx", import.meta.url), "utf8");
  cek(/export function VideoK4B1C/.test(vc), "video-k4b1c.tsx mengekspor VideoK4B1C");
}

console.log(`Lulus ${lulus}, gagal ${gagal}`);
process.exit(gagal ? 1 : 0);
