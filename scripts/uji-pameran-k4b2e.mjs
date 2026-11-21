// Uji Mind-map (Papan Pameran), Infografis (Daftar Pameran), Simulasi Papan Pameran, dan tahap Concrete, Pictorial, Abstract Kelas 4 Bab 2 Sub-Bab E ("Papan Pameran Bu Tuti"),
// akhir cerita Sanggar Batik Kampung Mekar (desimal perseratusan dan persen).
// Memeriksa: logika simulasi (kisi seratus, geser koma dengan alat menolak menempel tanda persen terlalu dini, baca kisi), misi (awal tidak memenuhi, wajib empat, bebas dua),
// Mind-map (sembilan kartu geser Masalah, Cara, Hasil memuat semua metode Story), Infografis dari kejadian Story, CPA dua belas langkah per tahap (Klik, Kanvas, Suara x empat metode)
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
  cek(DS.GESER_SIM.length === 4 && DS.GESER_SIM.map((t) => t.arah).join() === "kanan,kiri,kanan,kiri" && DS.GESER_SIM.every((t) => t.p >= 1 && t.p <= 99 && !STORY.has(t.p)), "simulasi geser: empat sasaran bergantian kanan dan kiri, bukan data Story");
  cek(DS.BACA_SIM.length === 2 && DS.BACA_SIM.every((t) => !STORY.has(t.p) && t.persen.includes(`${t.p}%`) && t.desimal.includes(LC.desimalDari(t.p)) && new Set(t.persen).size === 3 && new Set(t.desimal).size === 3), "simulasi baca: dua kisi, pilihan memuat jawaban benar tanpa kembar");
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
  cek(bB.k.balikBenar.join() === "1" && bB.k.geserBenar.join() === "0" && bB.k.geserKe === 2 && L.targetGeser(bB.k).p === 9 && L.tampilGeser(bB.k) === "0,09" && bB.k.koma === 1 && !bB.k.persen, "geser: persen ke desimal membuka sasaran kanan berikutnya (nol koma nol sembilan)");
  sama(S.misiBaru(MK.MISI_E, bB.k, new Set()), ["e-geser", "e-balik"], "geser: misi e-geser dan e-balik setelah dua sasaran");
  let g3 = bB.k;
  g3 = L.geserKoma(L.geserKoma(g3, 1).k, 1).k;
  cek(L.tampilGeser(g3) === "9" && L.tampilGeser(L.tandaPersen(g3).k) === "9%" && L.periksaGeser(L.tandaPersen(g3).k).ok, "geser: nol koma nol sembilan menjadi sembilan persen");
  cek(["kanvas"].length === 1 && L.targetGeser({ ...a, geserKe: 3 }).p === 48 && L.targetGeser({ ...a, geserKe: 4 }).p === 14, "geser: sasaran bergilir");
  cek(tanpaDigit(L.kalimatGeser(a)) && tanpaDigit(L.kalimatGeser(bG.k)) && /Betul/.test(L.kalimatGeser(bG.k)) && /Betul/.test(L.kalimatGeser(bB.k)), "geser: kalimat tanpa digit");
  // Baca.
  cek(L.targetBaca(a).p === 24 && L.kunciBaca(a).persen === 1 && L.kunciBaca(a).desimal === 0 && L.kunciBaca({ ...a, bacaKe: 1 }).persen === 2 && L.kunciBaca({ ...a, bacaKe: 1 }).desimal === 1, "baca: kunci pilihan dihitung dari banyak kotak");
  cek(L.pilihBaca(a, "persen", 1).bacaPersen === 1 && L.pilihBaca(a, "desimal", 2).bacaDesimal === 2 && L.pilihBaca(a, "persen", 5).bacaPersen === -1, "baca: pilih persen dan desimal, di luar pilihan diabaikan");
  cek(/Belum ada pilihan/.test(L.petunjukBaca(a)) && /Hitung kotak berwarna/.test(L.petunjukBaca(a)) && !L.periksaBaca(a).ok && L.periksaBaca(a).k.salah === 1, "baca: tanpa pilihan tidak benar, petunjuk menunjuk langkah yang belum dilakukan");
  const sP = L.pilihBaca(a, "persen", 1);
  cek(/Desimal belum dipilih/.test(L.petunjukBaca(sP)) && !L.periksaBaca(sP).ok, "baca: persen saja belum cukup");
  const sD = L.pilihBaca(a, "desimal", 0);
  cek(/Persen belum dipilih/.test(L.petunjukBaca(sD)) && !L.periksaBaca(sD).ok, "baca: desimal saja belum cukup");
  const salahB = L.pilihBaca(L.pilihBaca(a, "persen", 0), "desimal", 0);
  cek(!L.periksaBaca(salahB).ok && /belum cocok/.test(L.petunjukBaca(salahB)) && tanpaDigit(L.petunjukBaca(salahB)), "baca: pilihan keliru");
  const benarB = L.periksaBaca(L.pilihBaca(L.pilihBaca(a, "persen", 1), "desimal", 0));
  cek(benarB.ok && benarB.k.bacaBenar.join() === "0" && benarB.k.bacaKe === 1 && benarB.k.bacaPersen === -1 && benarB.k.bacaDesimal === -1 && L.targetBaca(benarB.k).p === 71, "baca: persen dan desimal tepat membuka kisi berikutnya");
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

/* ------------------------------ Mind-map: papan pameran (sembilan kartu geser) ------------------------------ */
{
  const KA = DK.KARTU_PAMERAN;
  cek(KA.length === 9, "kartu: sembilan kartu");
  cek(KA.every((k) => k.contoh.length <= 1) && KA[0].contoh.join() === "masalah" && KA.slice(1).every((k) => k.contoh.length === 0), "kartu: satu kotak contoh di kartu pertama saja, sisanya mandiri");
  const semua = KA.flatMap((k) => [k.masalah, k.cara, k.hasil]);
  const label = semua.map((x) => x.label);
  cek(new Set(label).size === label.length, "kartu: label unik");
  cek(semua.every((x) => x.label.length >= 5 && x.label.length <= 36), `kartu: label pendek (terpanjang ${Math.max(...label.map((l) => l.length))} huruf)`);
  cek(label.every((l) => l.split(/\s+/).every((w) => w.length <= 12)), "kartu: tiap kata label paling banyak dua belas huruf (muat di 344 px)");
  cek(KA.every((k) => [k.masalah.label, k.cara.label, k.hasil.label].every((l) => l.split(/\s+/).length <= 6)), "kartu: label paling banyak enam kata");
  cek(semua.every((x) => tanpaDigit(x.label) && tanpaDigit(x.arti) && bersih(x.label) && bersih(x.arti) && x.arti.length > 10), "kartu: label dan arti tanpa digit dan kata terlarang");
  cek(KA.every((k) => tanpaDigit(k.judul) && bersih(k.judul) && k.judul.length > 5), "kartu: judul bersih");
  const cara = KA.map((k) => k.cara.label).join(" | ");
  for (const m of ["Persen Perseratusan", "Kisi Seratus", "Jembatan Persen", "Per seratus", "Geser koma ke kanan", "Geser koma ke kiri"]) cek(cara.toLowerCase().includes(m.toLowerCase()), `kartu: cara memuat ${m}`);
  const gab = KA.map((k) => [k.judul, k.masalah.label, k.cara.label, k.hasil.label, k.masalah.arti, k.cara.arti, k.hasil.arti].join(" ")).join(" ").toLowerCase();
  for (const s of ["persen", "per seratus", "pecahan", "penyebut", "pembilang", "desimal", "koma", "geser", "dua tempat", "kisi", "kotak berwarna", "tanda persen", "nol di ujung", "dua arah"]) cek(gab.includes(s), `kartu: memuat poin "${s}"`);
  cek(!new RegExp("\\b(satria|laras|genta|pak hendro|bu tuti|bu wulan|pak joyo|kak sekar|pak bagas|lampion|taruhan|sanggar|pameran)\\b", "i").test(gab), "kartu: hanya poin pelajaran (tanpa tokoh dan benda cerita)");
  cek(tanpaDigit(DK.SUARA_KARTU_PAMERAN + DK.SELESAI_KARTU_PAMERAN) && bersih(DK.SUARA_KARTU_PAMERAN + DK.SELESAI_KARTU_PAMERAN), "kartu: suara dan pesan selesai tanpa digit dan kata terlarang");
  cek(emojiSah(DK.TEMA_KARTU_PAMERAN.ikon) && DK.TEMA_KARTU_PAMERAN.judul.length > 5, "kartu: tema sah");
  const RG = DK.RINGKASAN_PAMERAN;
  cek(RG.ikon.length === DK.KARTU_PAMERAN.length && new Set(RG.ikon).size === RG.ikon.length && [...RG.ikon, RG.pusat].every((e) => emojiSah(e) && !/[A-Za-z0-9]/.test(e)), "peta radial: satu gambar unik per kartu, gambar sah tanpa huruf");
  cek(tanpaDigit(RG.suara) && bersih(RG.suara) && !RG.ikon.includes(RG.pusat), "peta radial: suara bersih dan pusat berbeda dari cabang");
  // Ikon bertema pameran batik: pakaian, pita, tas, topi, palet, lampion, balon, konfeti, tanda seratus. Bukan benda di luar tema.
  const TEMA_OK = new Set([0x1f3a8, 0x1f4af, 0x1f455, 0x1f457, 0x1f380, 0x1f45c, 0x1f3ee, 0x1f388, 0x1f389, 0x1f452]);
  cek([...RG.ikon, RG.pusat].every((e) => TEMA_OK.has(e.codePointAt(0))), "peta radial: semua gambar bertema pameran batik (pakaian, pita, tas, topi, palet, lampion, balon, konfeti, seratus)");
}

/* ------------------------------ Infografis: daftar pameran (satu tabel lima baris) ------------------------------ */
{
  const B = DK.BARIS_INFO_PAMERAN;
  cek(B.length === 5 && DK.KOLOM_INFO_PAMERAN.length === 3, "infografis: lima baris dan tiga kolom");
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
  for (const s of ["mewarnai kisi", "menulis pecahan", "desimal ke persen", "persen ke desimal", "nol di ujung", "persen perseratusan", "kisi seratus", "jembatan persen", "geser koma"]) cek(gab.includes(s), `infografis: memuat "${s}"`);
  cek(!new RegExp("\\b(satria|laras|genta|pak hendro|bu tuti|bu wulan|pameran)\\b", "i").test(gab), "infografis: tanpa nama tokoh");
  cek(tanpaDigit(DK.SUARA_INFO_PAMERAN + DK.SELESAI_INFO_PAMERAN) && bersih(DK.SUARA_INFO_PAMERAN + DK.SELESAI_INFO_PAMERAN) && emojiSah(DK.TEMA_INFO_PAMERAN.ikon), "infografis: suara dan tema bersih");
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
        cek(Number.isInteger(d.p) && d.p >= 2 && d.p <= 99 && !STORY.has(d.p), `${tag}: persen dua sampai sembilan puluh sembilan, bukan data Story (${d.p})`);
        if (d.tipe === "ubah" || d.tipe === "perseratus") if (s.cara === "kanvas") cek(d.p >= 2 && d.p <= 9, `${tag}: kanvas ${d.tipe} memakai persen satu angka (${d.p})`);
        if (d.tipe === "kisi" && s.cara === "kanvas") cek(d.p % 10 === 0 && d.p >= 20 && d.p <= 90, `${tag}: kanvas kisi memakai kelipatan sepuluh (${d.p})`);
        if (d.tipe === "jembatan" && s.cara === "kanvas") cek(d.arah === "kiri" && (d.p < 10 || d.p % 10 === 0), `${tag}: kanvas jembatan persen ke desimal dengan satu angka bukan nol (${d.p})`);
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
          if (d.tipe === "perseratus" || (d.tipe === "jembatan" && d.arah === "kiri")) cek(pil.every((t) => /^\d+(,\d+)?$/.test(t)) && benar === LC.desimalDari(d.p), `${tag}: pilihan desimal (${pil.join("/")})`);
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
  sama(kv("Pictorial"), [3, 7, 2, 8], "angka kanvas Pictorial");
  sama(kv("Abstract"), [2, 8, 7, 1], "angka kanvas Abstract");
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
  cek(/kisiSel\(p\)/.test(gm.slice(gm.indexOf("export function KisiBenda"), gm.indexOf("export function KisiSvg"))) && /repeat\(10, 22px\)/.test(gm) && !/flex-wrap/.test(gm.slice(gm.indexOf("export function KisiBenda"), gm.indexOf("export function KisiSvg"))), "KisiBenda: kisi tetap sepuluh kolom, seratus kotak dari kisiSel, tidak membungkus sendiri");
  cek(/kisiSel\(p\)/.test(gm.slice(gm.indexOf("export function KisiSvg"), gm.indexOf("export function GeserSvg"))) && /width=\{s\} height=\{s\}/.test(gm), "KisiSvg: seratus kotak sama besar dari kisiSel");
  const sim = readFileSync(new URL("SimulasiPapanPameran.tsx", folderUrl), "utf8");
  cek(/export default function SimulasiPapanPameran/.test(sim) && /onKeadaan/.test(sim) && /MISI_PAMERAN_TEKS/.test(sim), "SimulasiPapanPameran: ekspor, onKeadaan, teks misi");
  cek(/nama: "Kisi"/.test(sim) && /nama: "Geser"/.test(sim) && /nama: "Baca"/.test(sim) && !/>\s*Baca\s*</.test(sim) && !/\} Baca\b/.test(sim.replace(/nama: "Baca"/, "")), "SimulasiPapanPameran: tab Baca tidak kembar dengan tombol");
  cek(/setCatatan\(ucap \?\? ""\)/.test(sim) && /Alat menolak/.test(sim) && /warnaiBaris/.test(sim) && /tampilGeser/.test(sim), "SimulasiPapanPameran: pesan lama dikosongkan tiap perubahan, pesan penolakan alat, baris dan geser koma");
  for (const [f, nm] of [["PapanPameran.tsx", "PapanPameranK4B2"], ["DaftarPameran.tsx", "DaftarPameranK4B2"]]) {
    const s = readFileSync(new URL(f, folderUrl), "utf8");
    cek(/speakGuru/.test(s) && /onLanjut/.test(s) && /teksLanjut/.test(s) && /peta-kartu\//.test(s) && new RegExp(`export default function ${nm}`).test(s) && new RegExp(`export \\{ ${nm} \\}`).test(s), `${f}: pembungkus tipis komponen bersama peta-kartu, ekspor ${nm}`);
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
