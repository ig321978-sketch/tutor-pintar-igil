// Uji Mind-map (Papan Pameran), Infografis (Daftar Pameran), Simulasi Papan Pameran, dan tahap Concrete, Pictorial, Abstract Kelas 4 Bab 2 Sub-Bab E ("Papan Pameran Bu Tuti"),
// akhir cerita Sanggar Batik Kampung Mekar (desimal perseratusan dan persen).
// Selaras buku Sub-Bab E (bab Pecahan): persen per seratus, desimal ke persen lewat pecahan, persen di atas seratus, pecahan berpenyebut lain (20 dari 50), kali seratus persen atau geser koma, persen ke desimal.
// Memeriksa: logika simulasi (kisi seratus, geser koma termasuk di atas seratus persen dengan alat menolak menempel tanda persen terlalu dini, baca kisi seratus dan kisi dua puluh lima kotak), misi (awal tidak memenuhi, wajib empat, bebas dua),
// Mind-map (enam langkah bergambar sendiri, label kosong), Infografis (tabel papan pameran dan kotak aturan dari angka Story), CPA dua belas langkah per tahap (Klik, Kanvas, Suara x empat metode)
// dengan jawaban beragam dan Cari kesalahan di tiap tahap, jawaban benar dihitung dari data, angka jawaban tidak kembar per tahap, tugas yang langsung siap (jebakan tombol macet), pengenal ucapan,
// petunjuk salah tanpa bocoran, gambar kisi seratus sebanyak datanya, batas rupa, emoji, kata terlarang, akhir baris.
// Jalankan: node --no-warnings scripts/uji-pameran-k4b2e.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/pameran-k4b2e/logika.ts");
const DS = await import("../src/components/modul/pameran-k4b2e/data-sim.ts");
const DK = await import("../src/components/modul/pameran-k4b2e/data-kartu.ts");
const LC = await import("../src/components/modul/pameran-k4b2e/logika-cpa.ts");
const D = await import("../src/components/modul/pameran-k4b2e/data.ts");
const K = await import("../src/components/modul/pameran-k4b2e/periksa.ts");
const S = await import("../src/components/modul/misi-simulasi.ts");
const MK = await import("../src/components/modul/misi-k4bab2.ts");
const MT = await import("../src/components/modul/misi-teks-k4b2.ts");
const folderUrl = new URL("../src/components/modul/pameran-k4b2e/", import.meta.url);
/** Benda beremoji pada GambarPameran.tsx (kunci EMOJI_BENDA), dibaca dari teks karena berkas tsx tidak bisa diimpor di Node. */
const KUNCI_EMOJI = [];
{
  const gu = readFileSync(new URL("GambarPameran.tsx", folderUrl), "utf8");
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
/** Data Story yang tidak boleh dipakai lagi sebagai bilangan utama tugas CPA (persen). */
const STORY = new Set([75, 40, 60, 30, 55, 25, 80, 90]);
const desimalNilai = (t) => Number(t.replace(",", "."));

/* ------------------------------ Kata bilangan, desimal, persen ------------------------------ */
{
  sama([0, 1, 9, 10, 11, 15, 20, 38, 100, 305].map(LC.kataBil), ["nol", "satu", "sembilan", "sepuluh", "sebelas", "lima belas", "dua puluh", "tiga puluh delapan", "seratus", "tiga ratus lima"], "kata bilangan CPA");
  cek(LC.kata === LC.kataBil, "alias kata");
  for (let n = 1; n <= 150; n += 1) cek(tanpaDigit(LC.kataBil(n)) && LC.kataBil(n) === L.kata(n), `kata bilangan ${n} sama di simulasi dan CPA`);
  sama([LC.ucapkan("2 dan 9"), LC.ucapkan("13"), LC.ucapkan("persen")], ["dua dan sembilan", "tiga belas", "persen"], "ucapkan: angka menjadi kata");
  sama([LC.ucapkan("0,75"), LC.ucapkan("0,05"), LC.ucapkan("0,6"), LC.ucapkan("0,40")], ["nol koma tujuh lima", "nol koma nol lima", "nol koma enam", "nol koma empat nol"], "ucapkan: desimal dieja angka demi angka");
  sama([LC.ucapkan("75%"), LC.ucapkan("6,5%"), LC.ucapkan("35/100")], ["tujuh puluh lima persen", "enam koma lima persen", "tiga puluh lima per seratus"], "ucapkan: persen dan pecahan");
  sama(LC.ucapkan("Hasilnya 0,35 sama dengan 35%."), "Hasilnya nol koma tiga lima sama dengan tiga puluh lima persen.", "ucapkan: tanpa spasi sebelum tanda baca");
  sama([LC.desimalDari(5), LC.desimalDari(35), LC.desimalDari(70), LC.desimalDari(70, true), LC.desimalDari(9)], ["0,05", "0,35", "0,70", "0,7", "0,09"], "desimalDari");
  sama([LC.desimalDari(246), LC.desimalDari(312), LC.desimalDari(450), LC.desimalDari(100), LC.desimalDari(675), LC.desimalDari(2005)], ["2,46", "3,12", "4,50", "1,00", "6,75", "20,05"], "desimalDari: di atas seratus persen (buku: 2,46 sama dengan 246 persen)");
  sama([LC.pembilangDari(40, 50), LC.pembilangDari(36, 50), LC.pembilangDari(35, 20), LC.pembilangDari(44, 25), LC.pembilangDari(20, 10), LC.pecahanDari(40, 50), LC.pecahanDari(40)], [20, 18, 7, 11, 2, "20/50", "40/100"], "pecahan berpenyebut lain: pembilang dari persen dan penyebut (buku: 20 dari 50 sama dengan 40 persen)");
  sama([LC.angkaKanvasKiri(506), LC.angkaKanvasKiri(450), LC.angkaKanvasKiri(20), LC.angkaKanvasKiri(8)], [5, 4, 2, 8], "angka kanvas persen ke desimal: angka bulat di depan koma bila seratus persen atau lebih");
  sama([LC.persenDari(35), LC.pecahanDari(35)], ["35%", "35/100"], "persen dan pecahan tampilan");
  sama([LC.barisPenuh(50), LC.barisPenuh(27), LC.angkaBukanNol(8), LC.angkaBukanNol(20)], [5, 2, 8, 2], "baris penuh dan angka bukan nol");
  for (let p = 0; p <= 100; p += 1) {
    const sel = LC.kisiSel(p);
    cek(sel.length === 100 && sel.filter(Boolean).length === p && sel.slice(0, p).every(Boolean) && sel.slice(p).every((x) => !x), `kisiSel ${p}: seratus kotak, tepat ${p} berwarna`);
  }
  cek(LC.kisiSel(-5).filter(Boolean).length === 0 && LC.kisiSel(500).filter(Boolean).length === 100, "kisiSel: dibatasi nol sampai seratus");
}

/* ------------------------------ Simulasi: data dan logika ------------------------------ */
{
  cek(DS.KISI_SIM.length === 2 && DS.KISI_SIM.every((t) => t.p >= 10 && t.p <= 99 && !STORY.has(t.p)), "simulasi kisi: dua sasaran bukan data Story");
  cek(DS.GESER_SIM.length === 4 && DS.GESER_SIM.map((t) => t.arah).join() === "kanan,kiri,kanan,kiri" && DS.GESER_SIM.every((t) => t.p >= 1 && t.p <= 999 && !STORY.has(t.p)), "simulasi geser: empat sasaran bergantian kanan dan kiri, bukan data Story");
  cek(DS.GESER_SIM.slice(0, 2).every((t) => t.p <= 99) && DS.GESER_SIM.slice(2).every((t) => t.p > 100) && DS.GESER_SIM.some((t) => t.arah === "kanan" && t.p > 100) && DS.GESER_SIM.some((t) => t.arah === "kiri" && t.p > 100), "simulasi geser: dua sasaran terakhir di atas seratus persen, satu ke kanan dan satu ke kiri (buku: 2,46 sama dengan 246 persen)");
  cek(DS.BACA_SIM.length === 2 && DS.BACA_SIM.every((t) => !STORY.has(t.p) && t.persen.includes(`${t.p}%`) && t.desimal.includes(LC.desimalDari(t.p)) && new Set(t.persen).size === 3 && new Set(t.desimal).size === 3), "simulasi baca: dua kisi, pilihan memuat jawaban benar tanpa kembar");
  cek(DS.BACA_SIM[0].peny === undefined && DS.BACA_SIM[1].peny === 25 && DS.kisiBaca(DS.BACA_SIM[0]).jumlah === 100 && DS.kisiBaca(DS.BACA_SIM[0]).warna === 24 && DS.kisiBaca(DS.BACA_SIM[1]).jumlah === 25 && DS.kisiBaca(DS.BACA_SIM[1]).warna === 11 && DS.kisiBaca(DS.BACA_SIM[1]).kolom === 5, "simulasi baca: kisi kedua dua puluh lima kotak dengan sebelas berwarna (pecahan berpenyebut lain, sebelas dari dua puluh lima sama dengan empat puluh empat persen)");
  cek(DS.BACA_SIM[1].persen.some((x) => x === "11%") && DS.BACA_SIM[1].persen.indexOf("44%") !== 0, "simulasi baca: pembilang jadi pengecoh persen, jawaban benar bukan pilihan pertama");
  cek(DS.BACA_SIM.every((t) => t.persen.filter((x) => parseFloat(x.replace(",", ".")) === t.p).length === 1 && t.desimal.filter((x) => desimalNilai(x) === t.p / 100).length === 1), "simulasi baca: tepat satu pilihan sama besar dengan kisi");
  cek(new Set(DS.BACA_SIM.map((t) => t.persen.indexOf(`${t.p}%`))).size >= 2, "simulasi baca: posisi persen benar bervariasi");
  cek(tanpaDigit(DS.MISI_PAMERAN_TEKS) && bersih(DS.MISI_PAMERAN_TEKS) && DS.MISI_PAMERAN_TEKS === MT.MISI_K4B2.E && D.MISI_PAMERAN_TEKS === DS.MISI_PAMERAN_TEKS && DS.MISI_PAMERAN_TEKS.length >= 10 && DS.MISI_PAMERAN_TEKS.length <= 120, "simulasi: teks misi tanpa digit dan kata terlarang, sama dengan misi-teks-k4b2");

  const a = L.awalPameran();
  cek(a.alat === "pameran" && a.mode === "kisi" && a.kisiWarna.length === 0 && a.koma === 1 && a.persen === false && !a.tolak && a.bacaPersen === -1 && a.bacaDesimal === -1 && ["kisiBenar", "geserBenar", "balikBenar", "bacaBenar"].every((f) => a[f].length === 0) && a.salah === 0, "simulasi: keadaan awal");
  sama(L.mulaiLagiPameran(), a, "simulasi: mulai lagi kembali ke awal");
  sama(L.pilihModePameran(a, "baca").mode, "baca", "simulasi: ganti alat");
  // Kisi.
  cek(L.targetKisi(a).p === 36 && L.banyakWarna(a) === 0, "kisi: sasaran pertama tiga puluh enam persen");
  cek(L.warnaiKotak(a, 5).k.kisiWarna.join() === "5" && L.warnaiKotak(L.warnaiKotak(a, 5).k, 5).k.kisiWarna.length === 0 && !L.warnaiKotak(a, -1).ok && !L.warnaiKotak(a, 100).ok && !L.warnaiKotak(a, 2.5).ok, "kisi: warnai dan lepas warna, kotak di luar kisi ditolak");
  const baris0 = L.warnaiBaris(a, 0).k;
  cek(baris0.kisiWarna.length === 10 && L.warnaiBaris(baris0, 0).k.kisiWarna.length === 0 && !L.warnaiBaris(a, 10).ok && L.warnaiBaris(L.warnaiKotak(a, 3).k, 0).k.kisiWarna.length === 10, "kisi: satu baris penuh, ketuk lagi melepas, baris sebagian dilengkapi");
  cek(/Belum ada kotak yang diwarnai/.test(L.petunjukKisi(a)) && /Ketuk kotak/.test(L.petunjukKisi(a)) && !L.periksaKisi(a).ok && L.periksaKisi(a).k.salah === 1, "kisi: tanpa warna tidak benar, petunjuk menunjuk langkah yang belum dilakukan");
  let tiga = a;
  for (const r of [0, 1, 2]) tiga = L.warnaiBaris(tiga, r).k;
  cek(!L.periksaKisi(tiga).ok && /masih kurang/.test(L.petunjukKisi(tiga)) && tanpaDigit(L.petunjukKisi(tiga)), "kisi: tiga puluh kotak masih kurang dari sasaran, petunjuk tanpa digit");
  let lebih = tiga;
  for (const i of [30, 31, 32, 33, 34, 35, 36]) lebih = L.warnaiKotak(lebih, i).k;
  cek(L.banyakWarna(lebih) === 37 && !L.periksaKisi(lebih).ok && /sudah lebih dari sasaran/.test(L.petunjukKisi(lebih)), "kisi: tiga puluh tujuh kotak sudah lebih");
  let pas = tiga;
  for (const i of [30, 31, 32, 33, 34, 35]) pas = L.warnaiKotak(pas, i).k;
  const bK = L.periksaKisi(pas);
  cek(bK.ok && bK.k.kisiBenar.join() === "0" && bK.k.kisiKe === 1 && bK.k.kisiWarna.length === 0 && L.targetKisi(bK.k).p === 82, "kisi: tepat tiga puluh enam kotak membuka sasaran berikutnya");
  sama(S.misiBaru(MK.MISI_E, bK.k, new Set()), ["e-kisi"], "kisi: misi e-kisi");
  const acak = ["7", "93", "12", "40", "55", "61"].reduce((k0, i) => L.warnaiKotak(k0, Number(i)).k, a);
  cek(L.banyakWarna(acak) === 6 && !L.periksaKisi(acak).ok, "kisi: kotak sembarang dihitung banyaknya, tidak harus berurutan");
  const sepuluhBaris = Array.from({ length: 82 }, (_, i) => 99 - i).reduce((k0, i) => L.warnaiKotak({ ...k0, kisiKe: 1 }, i).k, { ...a, kisiKe: 1 });
  cek(L.targetKisi(sepuluhBaris).p === 82 && L.periksaKisi(sepuluhBaris).ok, "kisi: delapan puluh dua kotak dari bawah juga benar (susunan bebas)");
  const dua = L.periksaKisi({ ...L.periksaKisi(pas).k, kisiWarna: sepuluhBaris.kisiWarna });
  sama(S.misiBaru(MK.MISI_E, dua.k, new Set()), ["e-kisi", "e-dua"], "kisi: dua kisi memenuhi e-dua");
  cek(tanpaDigit(L.kalimatKisi(a)) && tanpaDigit(L.kalimatKisi(bK.k)) && /Betul/.test(L.kalimatKisi(bK.k)), "kisi: kalimat tanpa digit");
  // Geser.
  cek(L.targetGeser(a).p === 14 && L.targetGeser(a).arah === "kanan" && L.tampilGeser(a) === "0,14" && L.angkaGeser(a) === "014", "geser: sasaran pertama desimal nol koma satu empat");
  const g1 = L.geserKoma(a, 1);
  cek(g1.ok && L.tampilGeser(g1.k) === "1,4" && L.tampilGeser(L.geserKoma(g1.k, 1).k) === "14", "geser: koma ke kanan satu dan dua tempat");
  const g2 = L.geserKoma(g1.k, 1).k;
  cek(!L.geserKoma(g2, 1).ok && L.geserKoma(g2, 1).k.koma === 3 && !L.geserKoma({ ...a, koma: 0 }, -1).ok && L.tampilGeser({ ...a, koma: 0 }) === "0,014", "geser: batas koma nol sampai tiga, ditolak tanpa dihitung keliru");
  const tolakG = L.tandaPersen(a);
  cek(!tolakG.ok && tolakG.k.tolak === true && tolakG.k.salah === 0 && tolakG.k.persen === false, "geser: alat menolak menempel tanda persen sebelum koma sampai di ujung (bukan percobaan keliru)");
  sama(S.misiBaru(MK.MISI_E, tolakG.k, new Set()), ["e-tolak"], "geser: misi e-tolak");
  cek(!L.tandaPersen(g1.k).ok && L.tandaPersen(g1.k).k.tolak === true, "geser: menempel setelah satu geseran masih ditolak");
  const tempel = L.tandaPersen(g2);
  cek(tempel.ok && tempel.k.persen === true && L.tampilGeser(tempel.k) === "14%" && !tempel.k.tolak, "geser: koma di ujung kanan, tanda persen menempel");
  cek(L.tandaPersen(tempel.k).ok && L.tandaPersen(tempel.k).k.persen === false && !L.tandaPersen(tempel.k).k.tolak, "geser: tombol tanda persen melepas bila sudah menempel");
  cek(/Belum ada geseran/.test(L.petunjukGeser(a)) && /Geser koma ke kanan dulu/.test(L.petunjukGeser(a)) && !L.periksaGeser(a).ok && L.periksaGeser(a).k.salah === 1, "geser: tanpa geseran tidak benar, petunjuk menunjuk langkah yang belum dilakukan");
  cek(/belum sampai/.test(L.petunjukGeser(g1.k)) && /Tanda persen belum menempel/.test(L.petunjukGeser(g2)) && !L.periksaGeser(g2).ok, "geser: petunjuk koma belum sampai dan tanda persen belum menempel");
  for (const p of [L.petunjukGeser(a), L.petunjukGeser(g1.k), L.petunjukGeser(g2), L.petunjukGeser({ ...a, geserKe: 1, koma: 3, persen: true })]) cek(tanpaDigit(p) && p.length > 20, `geser: petunjuk tanpa digit (${p.slice(0, 30)})`);
  const bG = L.periksaGeser(tempel.k);
  cek(bG.ok && bG.k.geserBenar.join() === "0" && bG.k.balikBenar.length === 0 && bG.k.geserKe === 1 && bG.k.koma === 3 && bG.k.persen === true && L.tampilGeser(bG.k) === "57%", "geser: desimal ke persen tepat membuka sasaran kiri (persen lima puluh tujuh)");
  sama(S.misiBaru(MK.MISI_E, bG.k, new Set()), ["e-geser"], "geser: misi e-geser");
  cek(!L.periksaGeser(bG.k).ok && /masih menempel/.test(L.petunjukGeser(bG.k)), "geser: persen masih menempel, petunjuk menunjuk langkah lepas tanda");
  const lepas = L.tandaPersen(bG.k).k;
  cek(L.tampilGeser(lepas) === "57" && /Koma belum digeser/.test(L.petunjukGeser(lepas)) && !L.periksaGeser(lepas).ok, "geser: tanda dilepas tetapi koma belum digeser");
  const k1 = L.geserKoma(lepas, -1).k;
  cek(L.tampilGeser(k1) === "5,7" && /belum sampai/.test(L.petunjukGeser(k1)) && !L.tandaPersen(k1).ok, "geser: satu geseran kiri, menempel tanda ditolak");
  const k2 = L.geserKoma(k1, -1).k;
  cek(L.tampilGeser(k2) === "0,57" && L.periksaGeser(k2).ok, "geser: persen ke desimal tepat nol koma lima tujuh");
  cek(!L.periksaGeser(L.geserKoma(k2, -1).k).ok && /terlalu jauh/.test(L.petunjukGeser(L.geserKoma(k2, -1).k)) && L.tampilGeser(L.geserKoma(k2, -1).k) === "0,057", "geser: koma terlalu jauh ke kiri");
  const bB = L.periksaGeser(k2);
  cek(bB.k.balikBenar.join() === "1" && bB.k.geserBenar.join() === "0" && bB.k.geserKe === 2 && L.targetGeser(bB.k).p === 215 && L.angkaGeser(bB.k) === "0215" && L.tampilGeser(bB.k) === "2,15" && bB.k.koma === 2 && !bB.k.persen, "geser: persen ke desimal membuka sasaran kanan berikutnya di atas seratus persen (dua koma satu lima)");
  sama(S.misiBaru(MK.MISI_E, bB.k, new Set()), ["e-geser", "e-balik"], "geser: misi e-geser dan e-balik setelah dua sasaran");
  let g3 = bB.k;
  g3 = L.geserKoma(L.geserKoma(g3, 1).k, 1).k;
  cek(L.tampilGeser(g3) === "215" && L.tampilGeser(L.tandaPersen(g3).k) === "215%" && L.periksaGeser(L.tandaPersen(g3).k).ok, "geser: dua koma satu lima menjadi dua ratus lima belas persen");
  cek(!L.tandaPersen(L.geserKoma(bB.k, 1).k).ok && L.tandaPersen(L.geserKoma(bB.k, 1).k).k.tolak === true && L.geserKoma(L.geserKoma(L.geserKoma(bB.k, 1).k, 1).k, 1).ok === false && L.geserKoma(L.geserKoma(L.geserKoma(bB.k, 1).k, 1).k, 1).k.koma === 4, "geser: di atas seratus persen koma sampai di ujung kanan pada geseran keempat, menempel tanda persen sebelum itu ditolak");
  cek(/Belum ada geseran/.test(L.petunjukGeser(bB.k)) && /belum sampai/.test(L.petunjukGeser(L.geserKoma(bB.k, 1).k)) && /Tanda persen belum menempel/.test(L.petunjukGeser(g3)) && tanpaDigit(L.petunjukGeser(g3)), "geser: petunjuk di atas seratus persen mengikuti letak koma");
  const bG3 = L.periksaGeser(L.tandaPersen(g3).k);
  cek(L.targetGeser(bG3.k).p === 126 && L.targetGeser(bG3.k).arah === "kiri" && bG3.k.koma === 4 && bG3.k.persen === true && L.tampilGeser(bG3.k) === "126%" && bG3.k.geserBenar.join() === "0,2", "geser: seratus dua puluh enam persen siap diubah ke desimal");
  const kiri3 = L.geserKoma(L.geserKoma(L.tandaPersen(bG3.k).k, -1).k, -1).k;
  cek(L.tampilGeser(kiri3) === "1,26" && L.periksaGeser(kiri3).ok && !L.periksaGeser(L.geserKoma(kiri3, -1).k).ok && /terlalu jauh/.test(L.petunjukGeser(L.geserKoma(kiri3, -1).k)), "geser: seratus dua puluh enam persen menjadi satu koma dua enam");
  cek(L.targetGeser({ ...a, geserKe: 3 }).p === 126 && L.targetGeser({ ...a, geserKe: 4 }).p === 14, "geser: sasaran bergilir");
  cek(tanpaDigit(L.kalimatGeser(a)) && tanpaDigit(L.kalimatGeser(bG.k)) && /Betul/.test(L.kalimatGeser(bG.k)) && /Betul/.test(L.kalimatGeser(bB.k)), "geser: kalimat tanpa digit");
  // Baca.
  cek(L.targetBaca(a).p === 24 && L.kunciBaca(a).persen === 1 && L.kunciBaca(a).desimal === 0 && L.kunciBaca({ ...a, bacaKe: 1 }).persen === 2 && L.kunciBaca({ ...a, bacaKe: 1 }).desimal === 1, "baca: kunci pilihan dihitung dari banyak kotak");
  cek(L.targetBaca({ ...a, bacaKe: 1 }).p === 44 && L.targetBaca({ ...a, bacaKe: 1 }).peny === 25 && /bukan seratus kotak/.test(L.petunjukBaca(L.pilihBaca(L.pilihBaca({ ...a, bacaKe: 1 }, "persen", 0), "desimal", 0))) && tanpaDigit(L.petunjukBaca(L.pilihBaca(L.pilihBaca({ ...a, bacaKe: 1 }, "persen", 0), "desimal", 0))), "baca: kisi dua puluh lima kotak, petunjuk menyuruh menyamakan penyebut menjadi seratus tanpa membocorkan");
  cek(L.pilihBaca(a, "persen", 1).bacaPersen === 1 && L.pilihBaca(a, "desimal", 2).bacaDesimal === 2 && L.pilihBaca(a, "persen", 5).bacaPersen === -1, "baca: pilih persen dan desimal, di luar pilihan diabaikan");
  cek(/Belum ada pilihan/.test(L.petunjukBaca(a)) && /Hitung kotak berwarna/.test(L.petunjukBaca(a)) && !L.periksaBaca(a).ok && L.periksaBaca(a).k.salah === 1, "baca: tanpa pilihan tidak benar, petunjuk menunjuk langkah yang belum dilakukan");
  const sP = L.pilihBaca(a, "persen", 1);
  cek(/Desimal belum dipilih/.test(L.petunjukBaca(sP)) && !L.periksaBaca(sP).ok, "baca: persen saja belum cukup");
  const sD = L.pilihBaca(a, "desimal", 0);
  cek(/Persen belum dipilih/.test(L.petunjukBaca(sD)) && !L.periksaBaca(sD).ok, "baca: desimal saja belum cukup");
  const salahB = L.pilihBaca(L.pilihBaca(a, "persen", 0), "desimal", 0);
  cek(!L.periksaBaca(salahB).ok && /belum cocok/.test(L.petunjukBaca(salahB)) && tanpaDigit(L.petunjukBaca(salahB)), "baca: pilihan keliru");
  const benarB = L.periksaBaca(L.pilihBaca(L.pilihBaca(a, "persen", 1), "desimal", 0));
  cek(benarB.ok && benarB.k.bacaBenar.join() === "0" && benarB.k.bacaKe === 1 && benarB.k.bacaPersen === -1 && benarB.k.bacaDesimal === -1 && L.targetBaca(benarB.k).p === 44, "baca: persen dan desimal tepat membuka kisi berikutnya");
  sama(S.misiBaru(MK.MISI_E, benarB.k, new Set()), ["e-baca"], "baca: misi e-baca");
  cek(tanpaDigit(L.kalimatBaca(a)) && /Betul/.test(L.kalimatBaca(benarB.k)), "baca: kalimat tanpa digit");
  // Misi.
  const B = MK.MISI_E;
  cek(MK.daftarMisiK4Bab2("E") === B && B.length === 6 && B.filter((m) => m.wajib).length === 4 && B.filter((m) => !m.wajib).length === 2 && B.every((m) => m.id.startsWith("e-")), "misi E: enam misi, empat wajib, dua bebas, id berawalan e-");
  cek(B.every((m) => tanpaDigit(m.teks) && bersih(m.teks) && m.teks.length > 10 && m.teks.length < 120), "misi E: teks tanpa digit dan kata terlarang");
  sama(S.misiBaru(B, a, new Set()), [], "misi E: keadaan awal tanpa misi baru");
  cek(/ujung kanan/.test(B.find((m) => m.id === "e-tolak").teks) && /menempel/.test(B.find((m) => m.id === "e-tolak").teks), "misi E: tantangan tolak sesuai perilaku alat (menempel tanda persen sebelum koma di ujung kanan)");
  cek(S.misiBaru(B, { ...a, salah: 9, mode: "geser", kisiWarna: [0, 1, 2], koma: 3, persen: true, bacaPersen: 1, bacaDesimal: 0 }, new Set()).length === 0, "misi E: warna, geseran, dan pilihan yang belum diperiksa tidak dihitung sebagai misi");
  cek(B.every((m) => !m.cek({ alat: "kerangka" })), "misi E: alat lain tidak memenuhi misi");
}

/* ------------------------------ Mind-map: papan pameran (enam langkah bergambar, label kosong) ------------------------------ */
{
  const LP = DK.LANGKAH_PAMERAN;
  cek(LP.length === 6, "mind-map: enam langkah (jumlah label mengikuti isi)");
  cek(new Set(LP.map((l) => l.gambar)).size === LP.length && LP.map((l) => l.gambar).join() === "persen,ke-persen,lain,geser,kembali,lebih", "mind-map: tiap langkah punya gambar sendiri");
  const judul = LP.map((l) => l.judul);
  cek(new Set(judul).size === judul.length && judul.every((j) => j.length >= 12 && j.length <= 34 && bersih(j) && j.split(/\s+/).every((w) => w.length <= 12) && j.split(/\s+/).length <= 6), `mind-map: judul langkah pendek dan bersih (terpanjang ${Math.max(...judul.map((j) => j.length))} huruf)`);
  cek(LP.every((l) => l.arti.length > 40 && tanpaDigit(l.arti) && bersih(l.arti) && /^[A-Z]/.test(l.arti) && !/[=<>%\/×]/.test(l.arti) && !/\s[.,!?;:]/.test(l.arti) && /^Langkah (satu|dua|tiga|empat|lima|enam)\./.test(l.arti)), "mind-map: arti diucapkan tanpa digit dan lambang, diawali Langkah");
  const gab = LP.map((l) => `${l.judul} ${l.arti}`).join(" ").toLowerCase();
  for (const t of ["per seratus", "pecahan", "desimal", "persen", "penyebut", "pembilang", "geser koma dua tempat ke kanan", "geser koma dua tempat ke kiri", "dengan seratus persen", "lebih dari seratus", "dua puluh per lima puluh", "empat puluh per seratus", "lima per seratus", "satu kisi penuh", "dua puluh kotak"]) cek(gab.includes(t) || gab.includes(t.replace("kali", "kalikan")), `mind-map: memuat "${t}"`);
  cek(!new RegExp("\\b(satria|laras|genta|pak hendro|bu tuti|bu wulan|pak joyo|kak sekar|pak bagas|lampion|taruhan|sanggar)\\b", "i").test(gab), "mind-map: hanya poin pelajaran (tanpa tokoh dan benda cerita)");
  cek(tanpaDigit(DK.PETUNJUK_PETA + DK.SELESAI_PETA) && bersih(DK.PETUNJUK_PETA + DK.SELESAI_PETA) && emojiSah(DK.IKON_JUDUL_PETA) && DK.JUDUL_PETA.length > 5, "mind-map: petunjuk, pesan selesai, dan ikon bersih");
  const pm = readFileSync(new URL("PapanPameran.tsx", folderUrl), "utf8");
  cek(/LANGKAH_PAMERAN/.test(pm) && /Label kosong langkah/.test(pm) && /speakGuru\(LANGKAH_PAMERAN\[n\]\.arti\)/.test(pm) && /onLanjut/.test(pm) && /teksLanjut/.test(pm) && !/peta-kartu|peta-label|PetaKartu|PetaLabel/.test(pm), "mind-map: label kosong diketuk dibacakan, komponen sendiri (bukan PetaKartu atau PetaLabel)");
  cek(/export default function PapanPameranK4B2/.test(pm) && /export \{ PapanPameranK4B2 \}/.test(pm) && /speakGuru: \(t: string\) => void; onLanjut: \(\) => void; teksLanjut: string/.test(pm), "mind-map: ekspor dan props speakGuru, onLanjut, teksLanjut");
  // Gambar sesuai data: kisi 75 kotak, dua batang sama panjang, kisi penuh ditambah dua puluh.
  cek(/<Kisi x=\{4\} y=\{5\} s=\{7\} warna=\{75\} \/>/.test(pm) && /<Kisi x=\{14\} y=\{4\} s=\{5\} warna=\{100\} \/>/.test(pm) && /<Kisi x=\{84\} y=\{4\} s=\{5\} warna=\{20\} \/>/.test(pm) && /Array\.from\(\{ length: 100 \}/.test(pm), "mind-map: kisi seratus kotak sungguhan, tujuh puluh lima, seratus, dan dua puluh berwarna");
  cek((pm.match(/width=\{80\} height=\{18\}/g) ?? []).length === 2 && (pm.match(/width=\{32\} height=\{18\}/g) ?? []).length === 2, "mind-map: dua batang sama panjang dan sama terisi (dua puluh dari lima puluh sama dengan empat puluh dari seratus)");
  for (const t of ["0,75", "= 75/100", "= 75%", "20/50", "40/100", "× 2", "× 100%", "2 tempat", "60%", "geser kiri", "0,40 = 0,4", "1,2 = 120%"]) cek(pm.includes(t), `mind-map: gambar memuat tulisan ${t}`);
  // Teks gambar paling kecil sebelas satuan pada lebar seratus lima puluh (sekitar sebelas piksel di 344).
  const ukuranTeks = [...pm.matchAll(/<Teks [^>]*\bu=\{(\d+(?:\.\d+)?)\}/g)].map((m) => Number(m[1]));
  cek(ukuranTeks.length >= 15 && ukuranTeks.every((u) => u >= 14) && /viewBox="0 0 150 80"/.test(pm) && /max-w-\[150px\]/.test(pm), `mind-map: teks gambar paling kecil empat belas satuan pada lebar seratus lima puluh (sekitar sebelas piksel di 344) (${Math.min(...ukuranTeks)})`);
  // Perkiraan tinggi akhir di 344 px (area gulir 648): gambar 62 + label 44 + celah 6 tiga baris, bingkai 30, petunjuk 40, status 20, tombol lanjut 56, jarak 24.
  const tinggiPeta = 3 * (62 + 44 + 6) + 8 + 30 + 40 + 20 + 56 + 24;
  cek(tinggiPeta <= 640 && DK.PETUNJUK_PETA.length <= 66 && !/JUDUL_PETA/.test(pm), `mind-map: perkiraan tinggi akhir ${tinggiPeta} px paling banyak 640, petunjuk satu kalimat pendek, tanpa pill judul`);
  cek(DK.LANGKAH_PAMERAN.every((l) => l.judul.length <= 26), "mind-map: judul label paling banyak dua puluh enam huruf (dua baris)");
  cek(/min-h-\[44px\]/.test(pm) && /text-\[13px\]/.test(pm) && /grid-cols-2/.test(pm), "mind-map: dua kolom, label setinggi sentuhan dan huruf tiga belas piksel");
}

/* ------------------------------ Infografis: tabel papan pameran dan kotak aturan (dua kartu) ------------------------------ */
{
  const T = DK.TABEL_PAMERAN;
  const A = DK.KOTAK_ATURAN;
  cek(T.length === 4 && DK.KOLOM_TABEL.join() === "Desimal,Pecahan,Persen", "infografis: empat baris dan tiga kolom desimal, pecahan, persen");
  sama(T.map((b) => b.p), [75, 60, 40, 120], "infografis: persen dari Story (tujuh puluh lima, enam puluh, empat puluh, seratus dua puluh)");
  cek(T.every((b) => b.persen === `${b.p}%` && b.pecahan === `${b.p}/100` && b.desimal === LC.desimalDari(b.p) && Math.abs(desimalNilai(b.desimal) * 100 - b.p) < 1e-9), "infografis: desimal, pecahan, dan persen tiap baris sama besar (dihitung dari persen)");
  cek(T.every((b) => b.suara.length === 3 && b.suara.every((t) => tanpaDigit(t) && bersih(t) && /^[A-Z]/.test(t) && !/[=<>%\/]/.test(t) && !/\s[.,!?;:]/.test(t) && t.length > 10)), "infografis: suara tiap isi tabel tanpa digit dan lambang");
  cek(A.length === 6 && new Set(A.map((o) => o.id)).size === 6 && A.every((o) => o.label.length >= 8 && o.label.length <= 30 && bersih(o.label) && bersih(o.isi) && o.isi.length <= 6), "infografis: enam kotak aturan, label dan isi pendek");
  cek(A.every((o) => tanpaDigit(o.suara) && bersih(o.suara) && /^[A-Z]/.test(o.suara) && !/[=<>%\/×]/.test(o.suara) && !/\s[.,!?;:]/.test(o.suara) && o.suara.length > 20), "infografis: suara kotak aturan tanpa digit dan lambang");
  sama(A.map((o) => o.isi), ["40", "100", "40%", "5/100", "60%", "120%"], "infografis: isi kotak aturan (dua puluh kali dua, lima puluh kali dua, empat puluh persen, lima per seratus, kali seratus persen, seratus dua puluh persen)");
  cek(20 * 2 === 40 && 50 * 2 === 100 && 0.6 * 100 === 60 && Math.round(1.2 * 100) === 120, "infografis: hitungan kotak aturan benar");
  cek(tanpaDigit(DK.PETUNJUK_INFO_1 + DK.PETUNJUK_INFO_2 + DK.SELESAI_INFO_1 + DK.SELESAI_INFO_2 + DK.PESAN_INFO_2) && bersih(DK.PETUNJUK_INFO_1 + DK.PETUNJUK_INFO_2 + DK.SELESAI_INFO_1 + DK.SELESAI_INFO_2 + DK.PESAN_INFO_2), "infografis: petunjuk dan pesan tanpa digit dan kata terlarang");
  const dp = readFileSync(new URL("DaftarPameran.tsx", folderUrl), "utf8");
  cek(/export default function DaftarPameranK4B2/.test(dp) && /export \{ DaftarPameranK4B2 \}/.test(dp) && /speakGuru: \(t: string\) => void; onLanjut: \(\) => void; teksLanjut: string/.test(dp) && !/peta-kartu|peta-label|info-kartu|InfografisKartu|InfoKartu/.test(dp), "infografis: ekspor, props speakGuru, onLanjut, teksLanjut, komponen sendiri");
  cek(/Isi kosong, ketuk untuk membuka/.test(dp) && /speakGuru\(suara\)/.test(dp) && /Kartu \{kartu\} dari 2/.test(dp) && /setKartu\(2\)/.test(dp) && /setKartu\(1\)/.test(dp), "infografis: isi tertutup diketuk dibacakan, dua kartu dengan tombol Berikutnya dan Kembali");
  cek(/\(Math\.min\(p, 100\) \/ 100\) \* lebar/.test(dp) && /\(\(p - 100\) \/ 100\) \* lebar/.test(dp) && /dua = p > 100/.test(dp), "infografis: batang terisi sebanyak persennya, batang kedua untuk sisa di atas seratus persen");
  cek(/<rect x=\{10\} y=\{6\} width=\{120\} height=\{18\}/.test(dp) && /<rect x=\{10\} y=\{6\} width=\{48\} height=\{18\}/.test(dp) && /<rect x=\{10\} y=\{50\} width=\{120\} height=\{18\}/.test(dp) && /<rect x=\{10\} y=\{50\} width=\{48\} height=\{18\}/.test(dp) && 48 / 120 === 20 / 50 && 48 / 120 === 40 / 100, "infografis: dua batang sama panjang dan sama terisi, empat per sepuluh");
  const tg = [...dp.matchAll(/fontSize=\{(\d+)\}/g)].map((m) => Number(m[1]));
  cek(tg.length >= 3 && tg.every((u) => u >= 12) && /viewBox="0 0 220 72"/.test(dp) && /max-w-\[220px\]/.test(dp), `infografis: teks gambar paling kecil dua belas satuan pada lebar dua ratus dua puluh (${Math.min(...tg)})`);
  cek(/min-h-\[44px\]/.test(dp) && /text-\[13px\]/.test(dp) && /grid-cols-\[64px_repeat\(3,minmax\(0,1fr\)\)\]/.test(dp) && /grid-cols-2/.test(dp), "infografis: sel setinggi sentuhan, tabel empat kolom, kotak aturan dua kolom");
}

/* ------------------------------ Pengenal ucapan ------------------------------ */
{
  const nm = (nama) => ({ jenis: "nama", nama });
  const an = (n) => ({ jenis: "angka", n });
  for (const nama of ["persen", "koma", "seratus", "kanan", "kiri"]) cek(K.cocokUcapan(nama, nm(nama)).cocok && K.kataDariUcapan(nama).length === 1, `cocok: kata ${nama} dikenali tepat satu`);
  sama(K.kataDariUcapan("per sen"), ["persen"], "ucapan: per sen dikenali sebagai persen");
  sama(K.kataDariUcapan("bukan persen"), [], "ucapan: bukan persen tidak dihitung");
  sama(K.kataDariUcapan("tidak kanan"), [], "ucapan: tidak kanan tidak dihitung");
  cek(!K.cocokUcapan("kiri", nm("kanan")).cocok && K.cocokUcapan("ke kanan saja", nm("kanan")).cocok && !K.cocokUcapan("sepuluh", nm("seratus")).cocok && K.cocokUcapan("seratus", nm("seratus")).cocok, "ucapan: kata lain tidak cocok, kata di dalam kalimat dikenali, sepuluh bukan seratus");
  for (const [teks, n] of [["tujuh", 7], ["sebelas", 11], ["tiga belas", 13], ["dua puluh", 20], ["empat puluh lima", 45], ["tujuh puluh lima", 75], ["sembilan puluh satu", 91], ["empat", 4], ["12", 12]]) cek(K.cocokUcapan(teks, an(n)).cocok, `ucapan: ${teks} dikenali sebagai ${n}`);
  cek(!K.cocokUcapan("tiga", an(13)).cocok && !K.cocokUcapan("tiga belas", an(3)).cocok && !K.cocokUcapan("lima puluh empat", an(45)).cocok, "ucapan: tiga bukan tiga belas, angka terbalik bukan jawaban");
  sama(K.angkaDariUcapan("enam enam tiga lima belas"), [6, 3, 15], "ucapan: angka berurutan dan kembar");
  const mulai = K.cocokUcapan("hmm", nm("persen"));
  cek(!mulai.cocok && mulai.terdengar.length === 0, "ucapan: tidak terdengar");
}

/* ------------------------------ CPA: tiga tahap, dua belas langkah ------------------------------ */
{
  const TAHAP = { Concrete: ["benda", D.CONCRETE], Pictorial: ["diagram", D.PICTORIAL], Abstract: ["lambang", D.ABSTRACT] };
  const cara3 = ["klik", "kanvas", "suara"];
  const NOMOR = { Concrete: [2, 3, 4], Pictorial: [5, 6, 7], Abstract: [8, 9, 10] };
  const TIPE = { klik: ["ubah", "perseratus", "kisi", "jembatan"], kanvas: ["ubah", "perseratus", "kisi", "jembatan"], suara: ["sebut", "perseratus", "kisi", "jembatan"] };
  let jumlahSalah = 0;
  const posisiBenar = [];
  for (const [namaT, [rupa, soal]] of Object.entries(TAHAP)) {
    cek(soal.length === 3 && soal.map((s) => s.cara).join() === cara3.join(), `${namaT}: tiga misi Klik, Tulis di kanvas, Rekam suara`);
    sama(soal.map((s) => s.nomor), NOMOR[namaT], `${namaT}: nomor misi berlanjut`);
    cek(soal.every((s) => s.langkah.length === 4 && s.langkah.map((l) => l.metode).join() === "igil,perseratus,kisi,jembatan"), `${namaT}: empat langkah tiap misi berurut IGIL, Percent as Hundredths, Hundred Grid, Decimal Percent Bridge`);
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
        cek(Number.isInteger(d.p) && d.p >= 2 && d.p <= 999 && !STORY.has(d.p), `${tag}: persen dua sampai sembilan ratus sembilan puluh sembilan, bukan data Story (${d.p})`);
        if (d.p > 99) {
          // Di atas seratus persen (buku: 2,46 sama dengan 246 persen): hanya tugas ubah dan jembatan, hanya Pictorial dan Abstract, Pictorial paling banyak seratus sembilan puluh sembilan bila kisinya digambar.
          cek((d.tipe === "ubah" || d.tipe === "jembatan") && rupa !== "benda", `${tag}: persen di atas seratus hanya pada ubah atau jembatan di Pictorial atau Abstract (${d.p})`);
          cek(d.p % 100 !== 0 && (d.tipe !== "jembatan" || d.arah === "kiri" || s.cara !== "kanvas"), `${tag}: persen di atas seratus bukan kelipatan seratus (${d.p})`);
        } else if (rupa === "benda" || d.tipe !== "perseratus") cek(d.p <= 99, `${tag}: Concrete dan tugas selain perseratus berpenyebut lain tetap di bawah seratus persen`);
        if (d.tipe === "perseratus" && d.peny) {
          cek([2, 4, 5, 10, 20, 25, 50].includes(d.peny) && Number.isInteger(LC.pembilangDari(d.p, d.peny)) && LC.pembilangDari(d.p, d.peny) >= 1 && LC.pembilangDari(d.p, d.peny) < d.peny && 100 % d.peny === 0, `${tag}: pecahan berpenyebut lain ${LC.pembilangDari(d.p, d.peny)}/${d.peny} sama dengan ${d.p} persen`);
          cek(LC.pembilangDari(d.p, d.peny) !== d.p, `${tag}: pembilang bukan persennya sendiri (jebakan menyalin pembilang)`);
          if (s.cara === "kanvas") cek([20, 25, 50].includes(d.peny) && kunci.n === 100 / d.peny, `${tag}: kanvas berpenyebut lain menjawab pengali penyebut ke seratus (${kunci.n})`);
          if (s.cara === "klik") cek(kunci.jenis === "nama" && kunci.nama === `${d.p}%`, `${tag}: klik berpenyebut lain memilih persen`);
          cek(/dari/.test(ls.suara) && tanpaDigit(ls.suara) && LC.barisKartu(d, s.cara)[0] === `pecahan: ${d.pembilang ?? LC.pembilangDari(d.p, d.peny)}/${d.peny}`, `${tag}: instruksi memakai kata dari, kartu memuat pecahan`);
        } else if ((d.tipe === "ubah" || d.tipe === "perseratus") && s.cara === "kanvas") cek(d.p >= 2 && d.p <= 9, `${tag}: kanvas ${d.tipe} memakai persen satu angka (${d.p})`);
        if (d.tipe === "kisi" && s.cara === "kanvas") cek(d.p % 10 === 0 && d.p >= 20 && d.p <= 90, `${tag}: kanvas kisi memakai kelipatan sepuluh (${d.p})`);
        if (d.tipe === "jembatan" && s.cara === "kanvas") cek(d.arah === "kiri" && (d.p < 10 || d.p % 10 === 0 || d.p > 100), `${tag}: kanvas jembatan persen ke desimal dengan satu angka bukan nol atau angka bulat di depan koma (${d.p})`);
        if (d.tipe === "jembatan" && s.cara === "suara") cek(kunci.jenis === "nama" && kunci.nama === d.arah, `${tag}: suara jembatan menjawab arah geser`);
        if (d.tipe === "sebut") cek(s.cara === "suara" && ["persen", "koma", "seratus"].includes(d.kata) && kunci.nama === d.kata, `${tag}: sebut hanya pada suara, kata ${d.kata}`);
        if (kunci?.jenis === "angka") {
          if (s.cara === "kanvas") {
            kanvasAngka.push(kunci.n);
            cek(kunci.n >= 1 && kunci.n <= 9, `${tag}: jawaban kanvas satu angka satu sampai sembilan (${kunci.n})`);
          }
          if (s.cara === "suara") cek(kunci.n >= 2 && kunci.n <= 99, `${tag}: jawaban suara bilangan pendek (${kunci.n})`);
        }
        if (kunci?.jenis === "nama") cek(s.cara !== "kanvas", `${tag}: jawaban nama bukan pada kanvas`);
        // Pilihan klik: tiga pilihan unik, tepat satu sama besar, jawaban benar tidak di tombol pertama, jawaban tokoh ikut.
        if (s.cara === "klik" && kunci !== null) {
          const pil = LC.pilihanKlik(l);
          const benar = LC.teksKunciKlik(l);
          cek(pil.length === 3 && new Set(pil).size === 3 && pil.includes(benar) && pil[0] !== benar, `${tag}: pilihan klik unik dan jawaban benar bukan yang pertama (${pil.join("/")})`);
          const nilai = (t) => (t.endsWith("%") ? desimalNilai(t.slice(0, -1)) : desimalNilai(t) * 100);
          cek(pil.filter((t) => Math.abs(nilai(t) - d.p) < 1e-9).length === 1, `${tag}: tepat satu pilihan sama besar dengan jawaban (${pil.join("/")})`);
          if ((d.tipe === "perseratus" && !d.peny) || (d.tipe === "jembatan" && d.arah === "kiri")) cek(pil.every((t) => /^\d+(,\d+)?$/.test(t)) && benar === LC.desimalDari(d.p), `${tag}: pilihan desimal (${pil.join("/")})`);
          else cek(pil.every((t) => /^\d+(,\d+)?%$/.test(t)) && benar === `${d.p}%`, `${tag}: pilihan persen (${pil.join("/")})`);
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
        }
        const kt = LC.kalimatTanya(l, s.cara);
        cek(tanpaDigit(kt) && kt.length > 8 && /^[A-Z]/.test(kt) && !/\s[.,!?;:]/.test(kt), `${tag}: pertanyaan tanpa digit`);
        const pet = LC.petunjukSalah(l, s.cara, "x");
        cek(pet.length > 20 && tanpaDigit(pet) && bersih(pet) && /^[A-Z]/.test(pet), `${tag}: petunjuk salah ada, tanpa digit`);
        if (l.tipe === "salah") {
          cek(l.alasan.length === 3 && new Set(l.alasan).size === 3 && l.benar >= 0 && l.benar <= 2 && l.alasan.every((x) => tanpaDigit(x) && bersih(x) && /^[A-Z]/.test(x) && !/\s[.,!?;:]/.test(x)) && tanpaDigit(l.kataTokoh) && bersih(l.kataTokoh), `${tag}: Cari kesalahan bersih, tiga alasan berbeda berhuruf kapital`);
          cek(["Satria", "Laras", "Genta"].includes(l.tokoh), `${tag}: tokoh Cari kesalahan`);
          const pj = LC.petunjukSalah(l, "klik", l.jawabTokoh);
          cek(pj.includes(`Pikirkan lagi apa yang ${l.tokoh} lakukan`) && !l.alasan.some((a) => pj.includes(a)), `${tag}: petunjuk jawaban tokoh hanya mengarahkan (${pj})`);
          // Alasan dan petunjuk tidak menyebut hasil akhir tugas.
          const hasil = [LC.kataBil(d.p), LC.ucapkan(LC.desimalDari(d.p)), LC.ucapkan(LC.desimalDari(d.p, true))];
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
        }
      }
    }
    cek(new Set(kanvasAngka).size === kanvasAngka.length && kanvasAngka.length === 4, `${namaT}: empat angka jawaban Tulis di kanvas tidak kembar (${kanvasAngka.join(", ")})`);
  }
  cek(jumlahSalah === 3, "tiap tahap punya satu Cari kesalahan (tiga seluruhnya)");
  cek(new Set(posisiBenar.filter((x) => typeof x === "string")).size >= 2, `Cari kesalahan: alasan benar tidak selalu di tempat yang sama (${posisiBenar.filter((x) => typeof x === "string")})`);
  cek(new Set(posisiBenar.filter((x) => typeof x === "number")).size >= 2 && posisiBenar.filter((x) => x === 0).length === 0, "jawaban klik benar tidak pernah di tombol pertama dan posisinya bervariasi");
  cek(TAHAP.Pictorial[1][0].langkah[2].langkah.betul === true && !TAHAP.Concrete[1][0].langkah[0].langkah.betul && !TAHAP.Abstract[1][0].langkah[3].langkah.betul, "Cari kesalahan: Laras benar pada Pictorial, Satria salah pada Concrete dan Abstract");
  const kv = (nama) => TAHAP[nama][1].filter((s) => s.cara === "kanvas").flatMap((s) => s.langkah.map((l) => LC.kunciJawab(l.langkah, "kanvas").n));
  sama(kv("Concrete"), [4, 9, 5, 2], "angka kanvas Concrete");
  sama(kv("Pictorial"), [3, 7, 2, 5], "angka kanvas Pictorial");
  sama(kv("Abstract"), [2, 5, 7, 4], "angka kanvas Abstract");
  // Cakupan Sub-Bab E menurut kurikulum tersebar di tiga tahap: persen di atas seratus dan pecahan berpenyebut lain.
  const semuaDasar = Object.values(TAHAP).flatMap(([rp, soal]) => soal.flatMap((m) => m.langkah.map((l) => ({ rp, cara: m.cara, d: LC.dasarDari(l.langkah) }))));
  const atas = semuaDasar.filter((x) => x.d.p > 100);
  const lain = semuaDasar.filter((x) => x.d.tipe === "perseratus" && x.d.peny);
  cek(atas.length === 4 && atas.some((x) => x.d.tipe === "ubah") && atas.some((x) => x.d.tipe === "jembatan" && x.cara === "kanvas") && new Set(atas.map((x) => x.rp)).size === 2, `persen di atas seratus: empat tugas di Pictorial dan Abstract (${atas.map((x) => x.d.p).join(", ")})`);
  cek(lain.length === 5 && new Set(lain.map((x) => x.rp)).size === 3 && new Set(lain.map((x) => x.d.peny)).size >= 4 && lain.some((x) => x.cara === "klik") && lain.some((x) => x.cara === "kanvas") && lain.some((x) => x.cara === "suara"), `pecahan berpenyebut lain: lima tugas di tiga tahap, klik, kanvas, dan suara (${lain.map((x) => `${LC.pembilangDari(x.d.p, x.d.peny)}/${x.d.peny}`).join(", ")})`);
  for (const [namaT, [, soal]] of Object.entries(TAHAP)) {
    const ps = soal.flatMap((m) => m.langkah.map((l) => LC.dasarDari(l.langkah).p));
    cek(new Set(ps).size === ps.length, `${namaT}: tiga belas tugas tidak kembar, persen tiap tugas berbeda (${ps.join(", ")})`);
  }
  // Tugas suara bervariasi: kata dan bilangan.
  const kunciSuara = Object.values(TAHAP).flatMap(([, soal]) => soal[2].langkah.map((l) => LC.kunciJawab(l.langkah, "suara")));
  cek(kunciSuara.some((k) => k.jenis === "nama") && kunciSuara.some((k) => k.jenis === "angka"), "tugas suara: kata dan bilangan");
  const kataSuara = kunciSuara.filter((k) => k.jenis === "nama").map((k) => k.nama);
  for (const w of ["persen", "koma", "seratus", "kanan", "kiri"]) cek(kataSuara.includes(w), `tugas suara: kata ${w} muncul`);
  // Jenis jawaban klik beragam: persen dan desimal.
  const kunciKlik = Object.values(TAHAP).flatMap(([, soal]) => soal[0].langkah.map((l) => LC.kunciJawab(l.langkah, "klik")));
  cek(kunciKlik.some((k) => k.jenis === "nama" && k.nama.endsWith("%")) && kunciKlik.some((k) => k.jenis === "nama" && k.nama.startsWith("0,")), "tugas klik: persen dan desimal");
  // Poin penting dan penutup.
  cek(D.POIN_PENTING.length >= 6 && D.POIN_PENTING.every((p) => p.length > 20 && bersih(p)) && D.POIN_PENTING_SUARA.every((p) => tanpaDigit(p) && !/[=<>%\/]/.test(p) && !/\s[.,!?;:]/.test(p)), "poin penting: banyak, bersih, suara tanpa digit dan tanda");
  const poin = D.POIN_PENTING.join(" ").toLowerCase();
  for (const m of ["persen", "per seratus", "desimal", "dua angka di belakang koma", "geser koma dua tempat ke kanan", "geser koma dua tempat ke kiri", "kisi seratus", "persen perseratusan", "jembatan persen"]) cek(poin.includes(m), `poin penting memuat ${m}`);
  cek(tanpaDigit(D.PENUTUP_E) && bersih(D.PENUTUP_E) && ["Satria", "Laras", "Genta", "Pak Hendro", "Bu Wulan", "Pak Joyo", "Kak Sekar", "Pak Bagas", "Bu Tuti", "Pameran Batik Kampung Mekar", "bab berikutnya"].every((t) => D.PENUTUP_E.includes(t)), "penutup E: perayaan akhir bab dengan semua tamu dan tokoh, tanpa digit");
  cek(Object.values(D.TEMA_PAMERAN).every((t) => emojiSah(t.ikon) && t.nama.length >= 7 && t.cara.length > 20 && tanpaDigit(t.cara) && bersih(t.cara)), "tema tiga tahap sah");
  cek(D.TEMA_PAMERAN.pictorial.cara.includes("polos") && D.TEMA_PAMERAN.abstract.cara.includes("kartu"), "tema: Pictorial polos, Abstract kartu");
  cek(D.CONCRETE_PAMERAN === D.CONCRETE && D.PICTORIAL_PAMERAN === D.PICTORIAL && D.ABSTRACT_PAMERAN === D.ABSTRACT && D.MISI_PAMERAN_TEKS === DS.MISI_PAMERAN_TEKS, "nama ekspor untuk pemasang");
}

/* ------------------------------ Berkas ------------------------------ */
{
  const berkas = readdirSync(folderUrl).filter((f) => /\.(ts|tsx)$/.test(f));
  for (const nama of ["logika.ts", "data-sim.ts", "data-kartu.ts", "logika-cpa.ts", "data.ts", "periksa.ts", "JawabPameran.tsx", "LangkahPameran.tsx", "GambarPameran.tsx", "TahapPameran.tsx", "SimulasiPapanPameran.tsx", "PapanPameran.tsx", "DaftarPameran.tsx"]) cek(berkas.includes(nama), `berkas ${nama} ada`);
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folderUrl), "utf8");
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d || c.codePointAt(0) === 0x1f6de || c.codePointAt(0) === 0x1fa74), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}|\\u\{1FA74\}|\\u\{1F39F\}|\\u\{2602\}|\\u\{1FA9F\}|\\u\{1FAA3\}/i.test(s), `${f}: kode emoji tidak melewati U+1FA95 dan tidak memakai emoji yang tampil kosong`);
    cek(!/senilai|nilai|buku|kelompok|bernilai|tebak/i.test(s), `${f}: tanpa kata senilai, nilai, buku, kelompok, tebak`);
    if (/^(logika|logika-cpa|periksa|data|data-sim|data-kartu)\.ts$/.test(f)) cek(!/from "react"|fetch\(/.test(s), `${f}: tanpa React dan jaringan`);
    cek(!/lipat-k4b2a|warna-k4b2b|jahit-k4b2c|meteran-k4b2d|jadwal-k4b1i|SubBabK4B2|lab-persen-k4b2e|SimulasiLabPersenK4B2|SimulasiLabSenilaiK4B2/.test(s), `${f}: tidak memakai folder Sub-Bab lain atau berkas lama`);
  }
  // Teks layar tidak memuat kata terlarang, termasuk nama berkas data.
  const layar = ["LangkahPameran.tsx", "TahapPameran.tsx", "SimulasiPapanPameran.tsx", "GambarPameran.tsx"].map((f) => readFileSync(new URL(f, folderUrl), "utf8")).join("\n");
  const teksLayar = [...layar.matchAll(/>\s*([^<>{}\n]{4,})\s*</g)].map((m) => m[1]).join(" ");
  cek(!/\b(skor|nilai|soal|tebak|kunci|latihan|teman|kelompok|buku|kelas)\b/i.test(teksLayar), "teks layar komponen tanpa kata terlarang");
  cek(/\bTugas\b/.test(layar) && !/>\s*Soal/.test(layar), "teks layar CPA memakai Tugas");
  cek(!/capitalize/.test(layar), "teks layar: tanpa kelas capitalize");
  const th = readFileSync(new URL("TahapPameran.tsx", folderUrl), "utf8");
  cek(/umum: Umum;\s*rupa: Rupa;\s*soal: SoalMisi\[\];\s*pita:/.test(th) && /teksAkhir: string/.test(th) && /poinPenting\?: boolean/.test(th), "TahapPameran: props umum, rupa, soal, pita, teksAkhir, poinPenting");
  cek(/IKON_METODE\[ls\.metode\]/.test(th) && /rupa === "benda" \?/.test(th), "TahapPameran: ikon metode hanya pada rupa benda (Pictorial dan Abstract tanpa emoji metode)");
  cek(/export default function TahapPameran/.test(th) && /Cari kesalahan/.test(th) && /POIN_PENTING/.test(th) && /PENUTUP_E/.test(th), "TahapPameran: ekspor, Cari kesalahan, Poin Penting, perayaan");
  cek(/"halaman"/.test(th) && /"kisi"/.test(th) && /"daftar"/.test(th) && !/"pantai"|"jadwal"|"lembar"|"klub"|"tabel"|"bambu"|"denah"|"cat"|"kapur"|"tikar"|"peta"|"rak"|"nota"|"tirai"|"jepit"|"bungkus"|"kain"/.test(th), "TahapPameran: pola visual halaman pameran, kertas kisi, lembar daftar (berbeda dari bab lain)");
  cek(/1F3EE/.test(th) && /PAMERAN BATIK KAMPUNG MEKAR/.test(th) && ["Bu Wulan", "Pak Joyo", "Kak Sekar", "Pak Bagas", "Bu Tuti", "Pak Hendro", "Satria", "Laras", "Genta"].every((n) => th.includes(`"${n}"`)) && /1F388/.test(th) && /1F389/.test(th), "TahapPameran: kemajuan Concrete berupa deret lampion, perayaan dengan spanduk, lampion, balon, konfeti, semua tamu dan tokoh");
  const lg = readFileSync(new URL("LangkahPameran.tsx", folderUrl), "utf8");
  cek(/export function LangkahPameran/.test(lg) && /JawabSuaraPameran/.test(lg) && /JawabTulis/.test(lg) && /pilihanSuara\(l, cara\)/.test(lg) && /TampilDasar/.test(lg), "LangkahPameran: ekspor, jawab suara dengan pilihan ketuk, jawab tulis di kanvas");
  cek(/ucapkan\(/.test(lg), "LangkahPameran: ucapan memakai kata, bukan digit");
  cek(!/l\.keliru/.test(lg) && (lg.match(/Pikirkan lagi apa yang \$\{l\.tokoh\} lakukan/g) ?? []).length === 2, "LangkahPameran: pesan setelah salah memilih benar-salah atau alasan hanya mengarahkan, tanpa menyebut alasan atau hasil");
  cek(/siap\(`Betul! \$\{l\.alasan\[i\]\}`\)/.test(lg), "LangkahPameran: pembenaran setelah Betul! memakai alasan benar yang diawali huruf kapital");
  const jw = readFileSync(new URL("JawabPameran.tsx", folderUrl), "utf8");
  cek(/gagalSekali/.test(jw) && /Ini jawaban yang benar|jawaban yang benar/.test(jw) && /PilihanKata/.test(jw) && /setCadangan\(true\)/.test(jw) && /e\.error === "not-allowed"/.test(jw), "JawabPameran: galat mikrofon dihitung gagal, pilihan ketuk sebagai cadangan, jawaban benar setelah tiga kali salah");
  const gm = readFileSync(new URL("GambarPameran.tsx", folderUrl), "utf8");
  cek(/export function KisiBenda/.test(gm) && /export function KisiSvg/.test(gm) && /export function GeserSvg/.test(gm) && /export function TampilDasar/.test(gm) && /rupa === "lambang"/.test(gm) && /EMOJI_BENDA/.test(gm) && /export function KartuKata/.test(gm) && /export function IsiBaris/.test(gm), "GambarPameran: kisi benda, kisi polos, geser koma, tampilan dasar, kartu untuk Abstract, pecahan bertingkat");
  const gb = gm.slice(gm.indexOf("export function KisiBenda"), gm.indexOf("export function KisiSvg"));
  const gs = gm.slice(gm.indexOf("export function KisiSvg"), gm.indexOf("export function GeserSvg"));
  cek(/const banyak = peny \?\? 100/.test(gb) && /pembilangDari\(p, peny\)/.test(gb) && /repeat\(\$\{kolom\}, 22px\)/.test(gb) && /kolomKisi = \(peny: number\)[^\n]*peny === 25 \? 5 : 10/.test(gm) && !/flex-wrap/.test(gb), "KisiBenda: kolom tetap (sepuluh, lima untuk dua puluh lima), seratus sel atau sebanyak penyebut dengan pembilang berwarna, tidak membungkus sendiri");
  cek(/kisiSel\(Math\.min\(100, p - g \* 100\)\)/.test(gs) && /width=\{s\} height=\{s\}/.test(gs) && /p > 100 \? 2 : 1/.test(gs) && /pembilangDari\(p, peny\)/.test(gs) && /Array\.from\(\{ length: peny \}/.test(gs), "KisiSvg: seratus kotak sama besar dari kisiSel, dua kisi di atas seratus persen, sebanyak penyebut bila pecahan berpenyebut lain");
  cek(/d\.p < 200 \? <KisiSvg/.test(gm) && /peny=\{d\.tipe === "perseratus" \? d\.peny : undefined\}/.test(gm), "TampilDasar: kisi digambar sampai seratus sembilan puluh sembilan persen, pecahan berpenyebut lain memakai penyebutnya");
  const sim = readFileSync(new URL("SimulasiPapanPameran.tsx", folderUrl), "utf8");
  cek(/export default function SimulasiPapanPameran/.test(sim) && /onKeadaan/.test(sim) && /MISI_PAMERAN_TEKS/.test(sim), "SimulasiPapanPameran: ekspor, onKeadaan, teks misi");
  cek(/nama: "Kisi"/.test(sim) && /nama: "Geser"/.test(sim) && /nama: "Baca"/.test(sim) && !/>\s*Baca\s*</.test(sim) && !/\} Baca\b/.test(sim.replace(/nama: "Baca"/, "")), "SimulasiPapanPameran: tab Baca tidak kembar dengan tombol");
  cek(/setCatatan\(ucap \?\? ""\)/.test(sim) && /Alat menolak/.test(sim) && /warnaiBaris/.test(sim) && /tampilGeser/.test(sim), "SimulasiPapanPameran: pesan lama dikosongkan tiap perubahan, pesan penolakan alat, baris dan geser koma");
  for (const [f, nm] of [["PapanPameran.tsx", "PapanPameranK4B2"], ["DaftarPameran.tsx", "DaftarPameranK4B2"]]) {
    const s = readFileSync(new URL(f, folderUrl), "utf8");
    cek(/speakGuru/.test(s) && /onLanjut/.test(s) && /teksLanjut/.test(s) && !/peta-kartu\//.test(s) && new RegExp(`export default function ${nm}`).test(s) && new RegExp(`export \\{ ${nm} \\}`).test(s), `${f}: komponen sendiri (bukan pembungkus peta-kartu), ekspor ${nm}`);
  }
  // Berkas bersama: Simulasi memasang Papan Pameran dengan misiDaftar.
  const sk = readFileSync(new URL("../src/components/modul/SimulasiK4Bab2.tsx", import.meta.url), "utf8");
  cek(/SimulasiPapanPameran/.test(sk) && /laporMisiPameran\(daftarMisiPameran\("E"\), k, a\.capai\)/.test(sk) && /misiDaftar: daftarMisiPameran\("E"\)/.test(sk) && !/judulBab=\{`Kelas/.test(sk), "SimulasiK4Bab2: langkahPapanPameranE memasang Papan Pameran dengan misiDaftar, judul bab tanpa kata Kelas");
  // Berkas lama yang dipertahankan ada (dipakai bab lain dan bank soal).
  for (const f of ["data-k4b2.ts", "naskah-k4b2.ts", "eja-k4b2.ts", "diagram-k4b2.tsx", "bantu-k4b2.tsx", "model-pecahan-k4b2.tsx", "video-k4b2-umum.tsx"]) cek(readdirSync(new URL("../src/components/modul/", import.meta.url)).includes(f), `berkas lama ${f} dipertahankan`);
  const ej = readFileSync(new URL("../src/lib/ejaan-inggris-id.ts", import.meta.url), "utf8");
  cek(/percent as hundredths/i.test(ej) && /hundred grid/i.test(ej) && /decimal percent bridge/i.test(ej), "ejaan: tiga nama metode global ada");
}

console.log(`Lulus ${lulus}, gagal ${gagal}`);
process.exit(gagal ? 1 : 0);
