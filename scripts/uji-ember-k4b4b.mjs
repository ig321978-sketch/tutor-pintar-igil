// Uji Mind-map (Rak Ember, pola label kosong), Infografis (Daftar Ember, dua kartu), Simulasi Bak Ember, dan tahap Concrete, Pictorial, Abstract Kelas 4 Bab 4 Sub-Bab B ("Ember Pak Anto"),
// akhir cerita Kolam Renang Tirta Ceria (volume).
// Memeriksa: logika simulasi (tuang gelas takar dengan alat menolak ember meluap, susun lapisan kubus dengan alat menolak melebihi tinggi bak, tangga liter turun dan naik), misi (awal tidak memenuhi, wajib empat, bebas dua),
// Mind-map pola label kosong (empat langkah memuat semua metode Story), Infografis dua kartu (data bersambung dari Sub-Bab A: 12, 10, dan 16 kubus tiap lapisan, tinggi dua lapisan, 1 cm³ = 1 ml),
// CPA dua belas langkah per tahap (Klik, Kanvas, Suara x empat metode) dengan jawaban beragam dan Cari kesalahan di tiap tahap, jawaban benar dihitung dari data, angka jawaban tidak kembar per tahap,
// tugas yang langsung siap (jebakan tombol macet), pengenal ucapan, petunjuk salah tanpa bocoran, gambar gelas dan kubus sebanyak datanya, batas rupa, emoji, kata terlarang, akhir baris.
// Jalankan: node --no-warnings scripts/uji-ember-k4b4b.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/ember-k4b4b/logika.ts");
const DS = await import("../src/components/modul/ember-k4b4b/data-sim.ts");
const DP = await import("../src/components/modul/ember-k4b4b/data-peta.ts");
const DI = await import("../src/components/modul/ember-k4b4b/data-info.ts");
const LC = await import("../src/components/modul/ember-k4b4b/logika-cpa.ts");
const D = await import("../src/components/modul/ember-k4b4b/data.ts");
const K = await import("../src/components/modul/ember-k4b4b/periksa.ts");
const S = await import("../src/components/modul/misi-simulasi.ts");
const MK = await import("../src/components/modul/misi-k4bab4.ts");
const MT = await import("../src/components/modul/misi-teks-k4b4.ts");
const folderUrl = new URL("../src/components/modul/ember-k4b4b/", import.meta.url);
/** Benda beremoji pada GambarEmber.tsx (kunci EMOJI_BENDA), dibaca dari teks karena berkas tsx tidak bisa diimpor di Node. */
const KUNCI_EMOJI = [];
{
  const gu = readFileSync(new URL("GambarEmber.tsx", folderUrl), "utf8");
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
/** Data Story yang tidak boleh dipakai lagi sebagai data CPA dan simulasi: gelas 250 ml sebanyak 8, balok 3 x 2 x 2 dan 2 x 3 x 3, tiga liter, dua liter. */
const volStory = (k, b, p) => [k, b, p].sort().join() === "2,2,3" || [k, b, p].sort().join() === "2,3,3";
const mlDariTeks = (t) => Number(t.replace(/[^\d]/g, ""));

/* ------------------------------ Kata bilangan, satuan, dan ukuran ------------------------------ */
{
  sama([0, 1, 9, 10, 11, 15, 20, 38, 100, 305, 1000, 1200, 2500, 3000, 9000].map(LC.kataBil), ["nol", "satu", "sembilan", "sepuluh", "sebelas", "lima belas", "dua puluh", "tiga puluh delapan", "seratus", "tiga ratus lima", "seribu", "seribu dua ratus", "dua ribu lima ratus", "tiga ribu", "sembilan ribu"], "kata bilangan CPA sampai ribuan");
  cek(LC.kata === LC.kataBil, "alias kata");
  sama([LC.fmt(24), LC.fmt(1000), LC.fmt(12500), LC.fmt(900)], ["24", "1.000", "12.500", "900"], "titik ribuan");
  sama([LC.teksMl(1500), LC.teksL(3), LC.teksCm3(24)], ["1.500 ml", "3 l", "24 cm³"], "teks dengan satuan");
  sama([LC.ucapkan("1.000 ml"), LC.ucapkan("24 cm³"), LC.ucapkan("3 l"), LC.ucapkan("l"), LC.ucapkan("ml"), LC.ucapkan("cm²")], ["seribu mililiter", "dua puluh empat sentimeter kubik", "tiga liter", "liter", "mililiter", "sentimeter persegi"], "ucapkan: satuan dieja dengan kata");
  sama(LC.ucapkan("3 × 2 × 2 = 12 cm³."), "tiga kali dua kali dua sama dengan dua belas sentimeter kubik.", "ucapkan: tanda kali dan sama dengan, tanpa spasi sebelum tanda baca");
  sama(LC.ucapkan("Isi 2.500 ml, bukan 250 ml."), "Isi dua ribu lima ratus mililiter, bukan dua ratus lima puluh mililiter.", "ucapkan: ribuan dan ratusan");
  sama([LC.totalIsi(6, 200), LC.perLapisan(3, 4), LC.volumeBlok(3, 2, 2), LC.mlDariL(3), LC.lDariMl(5000)], [1200, 12, 12, 3000, 5], "isi, kubus tiap lapisan, volume balok, dan tangga liter");
  cek(LC.ML_PER_L === 1000 && LC.volumeBlok(3, 4, 2) === 24 && LC.volumeBlok(2, 5, 2) === 20 && LC.volumeBlok(4, 4, 2) === 32, "1 l = 1.000 ml dan volume = lapisan x tinggi");
  sama(LC.mukaBlok(3, 2, 2), { depan: 6, atas: 6, samping: 4 }, "sisi balok: depan, atas, samping sebanyak kotak kubus");
  for (let k = 1; k <= 6; k += 1) for (let b = 1; b <= 6; b += 1) for (let p = 1; p <= 6; p += 1) {
    const m = LC.mukaBlok(k, b, p);
    cek(m.atas === LC.perLapisan(k, b) && m.depan === k * p && m.samping === b * p && m.depan + m.atas + m.samping === k * p + k * b + b * p, `sisi balok ${k}x${b}x${p}: atas satu lapisan penuh`);
  }
  sama([LC.susunBaris(14, 9), LC.susunBaris(9, 9), LC.susunBaris(0, 9), LC.susunBaris(18, 9)], [[9, 5], [9], [], [9, 9]], "susun baris gelas");
  for (let n = 0; n <= 18; n += 1) cek(LC.susunBaris(n, 9).reduce((s, x) => s + x, 0) === n && LC.susunBaris(n, 9).every((x) => x >= 1 && x <= 9), `susunBaris ${n}: jumlah sama dengan data`);
}

/* ------------------------------ Simulasi: data dan logika ------------------------------ */
{
cek(DS.TUANG_SIM.length === 4 && DS.TUANG_SIM.every((t) => t.target < t.kapasitas && t.kapasitas % 1000 === 0 && t.kapasitas <= 3000 && t.target !== 2000 && !t.takar.includes(250) && new Set(t.takar).size === 3), "simulasi tuang: empat sasaran, bukan data Story, tiga ukuran gelas");
  for (const t of DS.TUANG_SIM) {
    let sampai = new Set([0]);
    for (let i = 0; i < 40; i += 1) for (const s of [...sampai]) for (const g of t.takar) if (s + g <= t.kapasitas) sampai.add(s + g);
    cek(sampai.has(t.target), `simulasi tuang: sasaran ${t.target} bisa dicapai dari gelas ${t.takar.join("/")}`);
  }
  cek(DS.SUSUN_SIM.length === 4 && DS.SUSUN_SIM.every((t) => t.target % (t.kolom * t.baris) === 0 && t.target / (t.kolom * t.baris) >= 2 && t.target / (t.kolom * t.baris) < t.tinggiMaks && !volStory(t.kolom, t.baris, t.target / (t.kolom * t.baris))), "simulasi susun: empat sasaran dari lapisan kali tinggi, bukan data Story, di bawah tinggi bak");
  cek(DS.TANGGA_SIM.length === 4 && DS.TANGGA_SIM.map((t) => t.arah).join() === "turun,naik,turun,naik", "simulasi tangga: empat sasaran bergantian turun dan naik");
  cek(DS.TANGGA_SIM.every((t) => new Set(t.pil).size === 3 && t.pil.includes(DS.hasilTangga(t)) && t.n >= 3 && t.n <= 9 && t.n !== 2), "simulasi tangga: tiga pilihan unik, hasil benar ikut, bukan data Story");
  cek(DS.TANGGA_SIM.every((t) => (t.arah === "turun" ? DS.hasilTangga(t) === `${LC.fmt(t.n * 1000)} ml` : DS.hasilTangga(t) === `${t.n} l`)), "simulasi tangga: hasil benar dihitung dari data");
  cek(new Set(DS.TANGGA_SIM.map((t) => t.pil.indexOf(DS.hasilTangga(t)))).size >= 2, "simulasi tangga: posisi pilihan benar bervariasi");
  cek(tanpaDigit(DS.MISI_EMBER_TEKS) && bersih(DS.MISI_EMBER_TEKS) && DS.MISI_EMBER_TEKS === MT.MISI_K4B4.B && D.MISI_EMBER_TEKS === DS.MISI_EMBER_TEKS && DS.MISI_EMBER_TEKS.length >= 10 && DS.MISI_EMBER_TEKS.length <= 120, "simulasi: teks misi tanpa digit dan kata terlarang, sama dengan misi-teks-k4b4");

  const a = L.awalEmber();
  cek(a.alat === "ember" && a.mode === "tuang" && a.takar === 0 && a.tuangan.length === 0 && a.lapis === 0 && a.arah === null && a.pilih === -1 && !a.tolak && !a.tolakSusun && ["tuangBenar", "susunBenar", "tanggaBenar"].every((f) => a[f].length === 0) && a.salah === 0, "simulasi: keadaan awal");
  sama(L.mulaiLagiEmber(), a, "simulasi: mulai lagi kembali ke awal");
  sama(L.pilihModeEmber(a, "tangga").mode, "tangga", "simulasi: ganti alat");

  // Tuang.
  cek(L.targetTuang(a).target === 1500 && L.isiEmber(a) === 0, "tuang: sasaran pertama seribu lima ratus");
  const tb = L.tuang(a);
  cek(!tb.ok && tb.sebab === "belum" && tb.k === a && !tb.k.tolak && tb.k.salah === 0, "tuang: tuang sebelum memilih gelas ditolak tanpa dihitung keliru atau tolak");
  cek(L.pilihTakar(a, 250) === a && L.pilihTakar(a, 500).takar === 500, "tuang: hanya ukuran gelas pada sasaran yang bisa dipilih");
  cek(/Belum ada air/.test(L.petunjukTuang(a)) && /Pilih ukuran gelas/.test(L.petunjukTuang(a)) && !L.periksaTuang(a).ok && L.periksaTuang(a).k.salah === 1, "tuang: tanpa air tidak benar, petunjuk menunjuk langkah yang belum dilakukan");
  const g5 = L.pilihTakar(a, 500);
  cek(/Belum ada air/.test(L.petunjukTuang(g5)) && /Tekan Tuang/.test(L.petunjukTuang(g5)), "tuang: gelas sudah dipilih, petunjuk menyuruh menuang");
  let t1 = g5;
  t1 = L.tuang(t1).k;
  cek(L.isiEmber(t1) === 500 && t1.tuangan.join() === "500" && /belum sampai garis sasaran/.test(L.petunjukTuang(t1)) && !L.periksaTuang(t1).ok, "tuang: satu gelas lima ratus, belum sampai garis sasaran");
  t1 = L.tuang(L.tuang(t1).k).k;
  cek(L.isiEmber(t1) === 1500, "tuang: tiga gelas lima ratus sama dengan seribu lima ratus");
  const tOk = L.periksaTuang(t1);
  cek(tOk.ok && tOk.k.tuangBenar.join() === "0" && tOk.k.tuangKe === 1 && tOk.k.tuangan.length === 0 && tOk.k.takar === 0, "tuang: air tepat membuka ember berikutnya");
  sama(S.misiBaru(MK.MISI_B, tOk.k, new Set()), ["b-tuang"], "tuang: misi b-tuang");
  // Lebih dari sasaran, diurungkan.
  let lebih = L.pilihTakar(a, 500);
  for (let i = 0; i < 4; i += 1) lebih = L.tuang(lebih).k;
  cek(L.isiEmber(lebih) === 2000 && !L.periksaTuang(lebih).ok && /melewati garis sasaran/.test(L.petunjukTuang(lebih)) && tanpaDigit(L.petunjukTuang(lebih)), "tuang: melewati sasaran, petunjuk mengarahkan tanpa digit");
  const luap = L.tuang(lebih);
  cek(!luap.ok && luap.sebab === "luap" && luap.k.tolak === true && L.isiEmber(luap.k) === 2000 && luap.k.salah === 0, "tuang: alat menolak tuangan yang membuat ember meluap (bukan percobaan keliru)");
  sama(S.misiBaru(MK.MISI_B, luap.k, new Set()), ["b-tolak"], "tuang: misi b-tolak");
  const tepatPenuh = L.tuang(L.urungkanTuang(lebih));
  cek(tepatPenuh.ok && L.isiEmber(tepatPenuh.k) === 2000 && !tepatPenuh.k.tolak, "tuang: tepat penuh masih boleh");
  cek(L.isiEmber(L.urungkanTuang(lebih)) === 1500 && L.urungkanTuang(a) === a && L.isiEmber(L.kosongkanEmber(lebih)) === 0 && L.kosongkanEmber(lebih).takar === 0, "tuang: urungkan dan kosongkan");
  // Gelas bergantian pada sasaran kedua (tujuh ratus = lima ratus + dua ratus).
  let sasaran2 = L.pilihTakar(tOk.k, 500);
  sasaran2 = L.tuang(sasaran2).k;
  sasaran2 = L.tuang(L.pilihTakar(sasaran2, 200)).k;
  cek(L.targetTuang(sasaran2).target === 700 && L.isiEmber(sasaran2) === 700 && sasaran2.tuangan.join() === "500,200", "tuang: gelas boleh bergantian ukuran");
  const dua = L.periksaTuang(sasaran2);
  cek(dua.ok && dua.k.tuangBenar.join() === "0,1", "tuang: dua ember benar");
  sama(S.misiBaru(MK.MISI_B, dua.k, new Set()), ["b-tuang", "b-dua"], "tuang: misi b-tuang dan b-dua");
  for (const p of [L.petunjukTuang(a), L.petunjukTuang(g5), L.petunjukTuang(t1), L.petunjukTuang(lebih)]) cek(tanpaDigit(p) && p.length > 20, `tuang: petunjuk tanpa digit (${p.slice(0, 30)})`);
  cek(/Betul/.test(L.kalimatTuang(tOk.k)) && /sasaran/.test(L.kalimatTuang(a)), "tuang: kalimat status");

  // Susun.
  cek(L.targetSusun(a).kolom === 4 && L.targetSusun(a).baris === 3 && L.kubusPerLapis(a) === 12 && L.volumeSusun(a) === 0 && L.lapisBenar(a) === 3, "susun: sasaran pertama empat kali tiga kubus tiap lapisan, tiga lapisan");
  cek(/Belum ada lapisan/.test(L.petunjukSusun(a)) && /Tambah lapisan/.test(L.petunjukSusun(a)) && !L.periksaSusun(a).ok && L.periksaSusun(a).k.salah === 1, "susun: tanpa lapisan tidak benar, petunjuk menunjuk langkah yang belum dilakukan");
  let s2 = a;
  for (let i = 0; i < 2; i += 1) s2 = L.tambahLapis(s2).k;
  cek(s2.lapis === 2 && L.volumeSusun(s2) === 24 && /belum sampai sasaran/.test(L.petunjukSusun(s2)) && !L.periksaSusun(s2).ok, "susun: dua lapisan dua puluh empat, belum sampai sasaran");
  const s3 = L.tambahLapis(s2).k;
  cek(s3.lapis === 3 && L.volumeSusun(s3) === 36, "susun: tiga lapisan, tiga puluh enam kubus");
  const sOk = L.periksaSusun(s3);
  cek(sOk.ok && sOk.k.susunBenar.join() === "0" && sOk.k.susunKe === 1 && sOk.k.lapis === 0, "susun: volume tepat membuka bak berikutnya");
  sama(S.misiBaru(MK.MISI_B, sOk.k, new Set()), ["b-susun"], "susun: misi b-susun");
  const s4 = L.tambahLapis(s3).k;
  cek(/melebihi sasaran/.test(L.petunjukSusun(s4)) && !L.periksaSusun(s4).ok && L.kurangiLapis(s4).lapis === 3 && L.kurangiLapis(a) === a, "susun: kelebihan lapisan, petunjuk mengarahkan, bisa dikurangi");
  let penuh = a;
  for (let i = 0; i < 6; i += 1) penuh = L.tambahLapis(penuh).k;
  const tolakS = L.tambahLapis(penuh);
  cek(penuh.lapis === 6 && !tolakS.ok && tolakS.k.tolakSusun === true && tolakS.k.lapis === 6 && tolakS.k.tolak === false && tolakS.k.salah === 0, "susun: alat menolak lapisan melebihi tinggi bak, tanpa mencatat tolak tuang");
  sama(S.misiBaru(MK.MISI_B, tolakS.k, new Set()), [], "susun: penolakan susun bukan penolakan tuang (b-tolak tidak terhitung)");
  for (const p of [L.petunjukSusun(a), L.petunjukSusun(s2), L.petunjukSusun(s4)]) cek(tanpaDigit(p) && p.length > 20, `susun: petunjuk tanpa digit (${p.slice(0, 30)})`);
  cek(/Betul/.test(L.kalimatSusun(sOk.k)), "susun: kalimat status");
  // Semua sasaran bisa dicapai dengan lapisan sungguhan.
  for (let i = 0; i < DS.SUSUN_SIM.length; i += 1) {
    let k = { ...a, susunKe: i };
    for (let j = 0; j < L.lapisBenar(k); j += 1) k = L.tambahLapis(k).k;
    cek(L.volumeSusun(k) === DS.SUSUN_SIM[i].target && L.periksaSusun(k).ok, `susun: sasaran ${i + 1} tercapai dengan ${L.lapisBenar(k)} lapisan`);
  }

  // Tangga.
  cek(L.targetTangga(a).arah === "turun" && L.kunciTangga(a) === 1, "tangga: sasaran pertama turun, hasil benar di pilihan kedua");
  cek(/Belum ada pilihan/.test(L.petunjukTangga(a)) && !L.periksaTangga(a).ok && L.periksaTangga(a).k.salah === 1, "tangga: tanpa pilihan tidak benar, petunjuk menunjuk langkah yang belum dilakukan");
  const arahSalah = L.pilihHasil(L.pilihArah(a, "naik"), 1);
  cek(!L.periksaTangga(arahSalah).ok && /Arah tangga belum cocok/.test(L.petunjukTangga(arahSalah)) && tanpaDigit(L.petunjukTangga(arahSalah)), "tangga: arah keliru, petunjuk mengarahkan tanpa membocorkan hasil");
  const tanpaArah = L.pilihHasil(a, 1);
  cek(!L.periksaTangga(tanpaArah).ok && /Arah tangga belum dipilih/.test(L.petunjukTangga(tanpaArah)), "tangga: hasil tanpa arah belum cukup");
  const tanpaHasil = L.pilihArah(a, "turun");
  cek(!L.periksaTangga(tanpaHasil).ok && /Hasilnya belum dipilih/.test(L.petunjukTangga(tanpaHasil)), "tangga: arah tanpa hasil belum cukup");
  const hasilSalah = L.pilihHasil(L.pilihArah(a, "turun"), 0);
  cek(!L.periksaTangga(hasilSalah).ok && /Hasil belum cocok/.test(L.petunjukTangga(hasilSalah)) && tanpaDigit(L.petunjukTangga(hasilSalah)), "tangga: hasil keliru, petunjuk mengarahkan tanpa digit");
  cek(L.pilihHasil(a, 7) === a && L.pilihHasil(a, -1) === a, "tangga: pilihan di luar tiga diabaikan");
  const gOk = L.periksaTangga(L.pilihHasil(L.pilihArah(a, "turun"), 1));
  cek(gOk.ok && gOk.k.tanggaBenar.join() === "0" && gOk.k.tanggaKe === 1 && gOk.k.arah === null && gOk.k.pilih === -1, "tangga: turun enam liter jadi enam ribu mililiter membuka tangga berikutnya");
  sama(S.misiBaru(MK.MISI_B, gOk.k, new Set()), ["b-turun"], "tangga: misi b-turun");
  const nOk = L.periksaTangga(L.pilihHasil(L.pilihArah(gOk.k, "naik"), 2));
  cek(L.targetTangga(gOk.k).arah === "naik" && nOk.ok && nOk.k.tanggaBenar.join() === "0,1", "tangga: naik delapan ribu mililiter jadi delapan liter");
  sama(S.misiBaru(MK.MISI_B, nOk.k, new Set()), ["b-turun", "b-naik"], "tangga: misi b-turun dan b-naik");
  for (const p of [L.petunjukTangga(a), L.petunjukTangga(tanpaArah), L.petunjukTangga(tanpaHasil)]) cek(tanpaDigit(p) && p.length > 20, `tangga: petunjuk tanpa digit (${p.slice(0, 30)})`);
  cek(/Betul/.test(L.kalimatTangga(gOk.k)), "tangga: kalimat status");

  // Misi.
  const B = MK.MISI_B;
  cek(MK.daftarMisiK4Bab4("B") === B && B.length === 6 && B.filter((m) => m.wajib).length === 4 && B.filter((m) => !m.wajib).length === 2 && B.every((m) => m.id.startsWith("b-")), "misi B: enam misi, empat wajib, dua bebas, id berawalan b-");
  cek(B.every((m) => tanpaDigit(m.teks) && bersih(m.teks) && m.teks.length > 10 && m.teks.length < 120), "misi B: teks tanpa digit dan kata terlarang");
  sama(S.misiBaru(B, a, new Set()), [], "misi B: keadaan awal tanpa misi baru");
  cek(/meluap/.test(B.find((m) => m.id === "b-tolak").teks) && /menolak/.test(B.find((m) => m.id === "b-tolak").teks), "misi B: tantangan tolak sesuai perilaku alat (ember meluap)");
  cek(S.misiBaru(B, { ...a, salah: 9, mode: "tangga", takar: 500, tuangan: [500, 500], lapis: 2, arah: "turun", pilih: 1 }, new Set()).length === 0, "misi B: gelas, tuangan, lapisan, arah, dan pilihan yang belum diperiksa tidak dihitung sebagai misi");
  cek(B.every((m) => !m.cek({ alat: "kerangka" })), "misi B: alat lain tidak memenuhi misi");
  cek(B.every((m) => !m.cek({ alat: "ubin" })), "misi B: keadaan Sub-Bab A tidak memenuhi misi");
}

/* ------------------------------ Mind-map: rak ember (pola label kosong) ------------------------------ */
{
  const P = DP.LANGKAH_EMBER;
  cek(P.length === 4, "mind-map: empat label kosong");
  cek(new Set(P.map((x) => x.judul)).size === 4 && P.every((x) => x.judul.length >= 10 && x.judul.length <= 36 && x.judul.split(/\s+/).every((w) => w.length <= 12)), "mind-map: judul langkah unik, pendek, tiap kata paling banyak dua belas huruf (muat di 344 px)");
  cek(P.every((x) => tanpaDigit(x.judul) && tanpaDigit(x.arti) && bersih(x.judul) && bersih(x.arti) && x.arti.length > 30 && /^Langkah (satu|dua|tiga|empat)\./.test(x.arti)), "mind-map: judul dan arti tanpa digit dan kata terlarang, arti diawali nomor langkah");
  cek(P.every((x) => emojiSah(x.ikon) && adaEmoji(x.ikon) && !/[A-Za-z0-9]/.test(x.ikon)), "mind-map: ikon sah (emoji lama tanpa huruf)");
  const gab = P.map((x) => `${x.judul} ${x.arti}`).join(" ").toLowerCase();
  for (const s of ["isi dan tuang", "gelas ukur", "mililiter", "lapisan", "tinggi", "volume", "tangga liter", "seribu", "kali", "bagi", "kubik", "satuan"]) cek(gab.includes(s), `mind-map: memuat "${s}"`);
  cek(!/\b(satria|laras|genta|pak hendro|bu sinta|pak anto|kolam|pesta)\b/.test(gab), "mind-map: hanya langkah pelajaran (tanpa tokoh)");
  cek(tanpaDigit(DP.PETUNJUK_PETA + DP.SELESAI_PETA + DP.JUDUL_PETA) && bersih(DP.PETUNJUK_PETA + DP.SELESAI_PETA + DP.JUDUL_PETA) && emojiSah(DP.IKON_JUDUL_PETA), "mind-map: petunjuk dan pesan bersih");
  const pt = readFileSync(new URL("PetaEmber.tsx", folderUrl), "utf8");
  cek(!/peta-label|PetaLabel|CSS_LEMARI.*PetaLabel/.test(pt) && /LANGKAH_EMBER/.test(pt) && /BlokSvg/.test(pt) && /data-alat=/.test(pt) && /speakGuru/.test(pt) && /onLanjut/.test(pt) && /teksLanjut/.test(pt) && /export default function PetaEmberK4B4/.test(pt) && /export \{ PetaEmberK4B4 \}/.test(pt) && /selesai \? \(/.test(pt), "PetaEmber: rak bergambar sendiri (bukan PetaLabel), empat alat, lanjut setelah semua terbuka, ekspor PetaEmberK4B4");
  cek(P.every((x) => ["gelas", "blok", "tangga", "kubik"].includes(x.gambar)) && new Set(P.map((x) => x.gambar)).size === 4, "mind-map: tiap langkah punya alatnya sendiri (gelas ukur, balok kubus, tangga, kubus kecil)");
  const rk = readFileSync(new URL("RakEmber.tsx", folderUrl), "utf8");
  cek(/from "\.\/PetaEmber"/.test(rk) && /export default/.test(rk) && /RakEmberK4B4/.test(rk), "RakEmber: nama dari alur, pembungkus PetaEmber");
}

/* ------------------------------ Infografis: deret takaran dan tangga dan kubus (dari benda dan angka Story B) ------------------------------ */
{
  const B = DI.BEJANA;
  cek(B.length === 4 && B.map((b) => b.bentuk).join() === "gelas,botol,ember,balok" && B.every((b) => b.angka.length === 2), "infografis kartu 1: empat bejana (gelas, botol, ember, balok), dua angka tertutup tiap bejana");
  cek(DI.TAKAR_GELAS === 250 && DI.SKALA_ML === 2000 && DI.KUBUS_STORY.kolom === 3 && DI.KUBUS_STORY.baris === 2 && DI.KUBUS_STORY.lapis === 2, "infografis: angka Story B (gelas 250 ml, ember 2 l, balok 3 x 2 x 2)");
  sama(B.map((b) => b.ml), [1000, 1000, 2000, 12], "infografis: isi tiap bejana dihitung dari data (4 x 250, 1 l, 8 x 250, 3 x 2 x 2)");
  sama(B.map((b) => b.angka.map((a) => a.teks)), [["1.000 ml", "1 l"], ["1 l", "1.000 ml"], ["2.000 ml", "2 l"], ["12 cm³", "12 ml"]], "infografis: angka tertutup bersatuan");
  cek(B.slice(0, 3).every((b) => Math.abs(b.pecah - b.ml / DI.SKALA_ML) < 1e-9 && b.pecah > 0 && b.pecah <= 1) && B[3].pecah === 0, "infografis: tinggi air sungguh sebanding isi (ember penuh, empat gelas dan botol setengah)");
  sama(B.map((b) => b.gelas), [4, 0, 8, 0], "infografis: banyak gelas takar yang digambar (4 gelas, 8 gelas)");
  cek(B[0].gelas * DI.TAKAR_GELAS === B[0].ml && B[2].gelas * DI.TAKAR_GELAS === B[2].ml, "infografis: banyak gelas kali 250 ml sama dengan isi bejana");
  {
    const inf0 = readFileSync(new URL("InfoEmber.tsx", folderUrl), "utf8");
    cek(/Array\.from\(\{ length: b\.gelas \}/.test(inf0) && (inf0.match(/Array\.from\(\{ length: b\.gelas \}/g) ?? []).length === 2 && /data-gelas="1"/.test(inf0) && /LapisanSvg/.test(inf0) && /data-lapisan=/.test(inf0) && /<BlokSvg kolom=\{KUBUS_STORY\.kolom\}/.test(inf0) && /data-uji="kubus-lapisan"/.test(inf0), "InfoEmber: gelas digambar sebanyak data, kartu 2 memuat satu lapisan 3 x 2 dan balok dua lapisan");
    const pt0 = readFileSync(new URL("PetaEmber.tsx", folderUrl), "utf8");
    cek(/3 × 2 = 6 kubus, 2 lapisan/.test(pt0) && /× 1\.000/.test(pt0) && /1\.000 ml/.test(pt0) && !/>\s*2 l\s*</.test(pt0), "PetaEmber: balok memuat kisi dan lapisan, tangga botol 1 l dikali 1.000 jadi 1.000 ml (konsisten)");
    cek(!/fontSize=\{([0-9]|10)\}/.test(inf0 + pt0) && !/text-\[(9|10)px\]/.test(inf0 + pt0), "Infografis dan Mind-map: teks paling kecil 11 px");
  }
  cek(B[0].pecah === B[1].pecah && B[2].pecah === 2 * B[0].pecah, "infografis: empat gelas sama tinggi dengan botol satu liter, ember dua kali lipat");
  cek(B.every((b) => b.nama.split(/\s+/).every((w) => w.length <= 12) && b.nama.length <= 14 && b.angka.every((a) => a.teks.length <= 9 && tanpaDigit(a.suara) && bersih(a.suara) && /^[A-Z]/.test(a.suara) && !/\s[.,!?;:]/.test(a.suara))), "infografis: label pendek dan suara tanpa digit");
  cek(/mililiter/.test(B[0].angka[0].suara) && /liter/.test(B[0].angka[1].suara) && /sentimeter kubik/.test(B[3].angka[0].suara) && /dua belas mililiter/.test(B[3].angka[1].suara) && /seribu mililiter/.test(B[1].angka[1].suara), "infografis: suara mengeja satuan dan ribuan");
  const T = DI.KOTAK_TANGGA;
  sama(T.map((t) => t.isi), ["× 1.000", "÷ 1.000", "= 1 ml", "3 × 2 = 6"], "infografis kartu 2: empat aturan tertutup (tangga turun dan naik, kubik, kubus tiap lapisan)");
  cek(T.every((t) => t.label.length <= 14 && tanpaDigit(t.suara) && bersih(t.suara) && /^[A-Z]/.test(t.suara)) && /dikali seribu/.test(T[0].suara) && /dibagi seribu/.test(T[1].suara) && /satu sentimeter kubik sama dengan satu mililiter/i.test(T[2].suara) && /enam kubus/.test(T[3].suara), "infografis kartu 2: label pendek, suara tanpa digit");
  cek(tanpaDigit(DI.PETUNJUK_INFO_1 + DI.PETUNJUK_INFO_2 + DI.SELESAI_INFO_1 + DI.SELESAI_INFO_2 + DI.PESAN_INFO_2_SAMA) && bersih(DI.PETUNJUK_INFO_1 + DI.PETUNJUK_INFO_2 + DI.SELESAI_INFO_1 + DI.SELESAI_INFO_2 + DI.PESAN_INFO_2_SAMA), "infografis: petunjuk dan pesan tanpa digit dan kata terlarang");
  const inf = readFileSync(new URL("InfoEmber.tsx", folderUrl), "utf8");
  cek(!/peta-label|InfoKartu|PetaLabel|<table|grid-cols-\[4\.6rem/.test(inf) && /BEJANA/.test(inf) && /KOTAK_TANGGA/.test(inf) && /GambarBejana/.test(inf) && /BlokSvg/.test(inf) && /speakGuru/.test(inf) && /onLanjut/.test(inf) && /teksLanjut/.test(inf) && /export default function InfoEmberK4B4/.test(inf) && /export \{ InfoEmberK4B4 \}/.test(inf), "InfoEmber: komponen sendiri (bukan InfoKartu, bukan tabel), bejana bergambar, ekspor InfoEmberK4B4");
  cek(/data-air=\{air\}/.test(inf) && /Math\.round\(tinggi \* b\.pecah\)/.test(inf) && /kartu === 1 && selesai/.test(inf) && /kartu === 2 && selesai/.test(inf), "InfoEmber: tinggi air dari data, Berikutnya dan Lanjut hanya setelah semua kotak terbuka");
  const dk = readFileSync(new URL("DaftarEmber.tsx", folderUrl), "utf8");
  cek(/from "\.\/InfoEmber"/.test(dk) && /export default/.test(dk) && /DaftarEmberK4B4/.test(dk), "DaftarEmber: nama dari alur, pembungkus InfoEmber");
}


/* ------------------------------ Pengenal ucapan ------------------------------ */
{
  const nm = (nama) => ({ jenis: "nama", nama });
  const an = (n) => ({ jenis: "angka", n });
  for (const nama of ["baku", "liter", "mililiter", "kubik"]) cek(K.cocokUcapan(nama, nm(nama)).cocok && K.kataDariUcapan(nama).length === 1, `cocok: kata ${nama} dikenali tepat satu`);
  sama(K.kataDariUcapan("mili liter"), ["mililiter"], "ucapan: mili liter dikenali sebagai mililiter saja");
  sama(K.kataDariUcapan("bukan baku"), [], "ucapan: bukan baku tidak dihitung");
  sama(K.kataDariUcapan("tidak liter"), [], "ucapan: tidak liter tidak dihitung");
  cek(!K.cocokUcapan("mililiter", nm("liter")).cocok && !K.cocokUcapan("liter", nm("mililiter")).cocok && K.cocokUcapan("satuan baku", nm("baku")).cocok && !K.cocokUcapan("kira kira", nm("baku")).cocok, "ucapan: liter dan mililiter dibedakan, kata di dalam kalimat dikenali");
  for (const [teks, n] of [["tujuh", 7], ["sebelas", 11], ["tiga belas", 13], ["dua puluh", 20], ["tiga puluh enam", 36], ["empat puluh", 40], ["lima puluh empat", 54], ["delapan belas", 18], ["sembilan ratus", 900], ["seribu", 1000], ["seribu enam ratus", 1600], ["dua ribu lima ratus", 2500], ["tujuh ribu", 7000], ["sembilan ribu", 9000], ["tiga ribu dua ratus lima puluh", 3250], ["seratus lima puluh", 150], ["sepuluh ribu", 10000], ["27", 27], ["3000", 3000], ["3.000", 3000], ["1.600", 1600]]) cek(K.cocokUcapan(teks, an(n)).cocok, `ucapan: ${teks} dikenali sebagai ${n}`);
  cek(!K.cocokUcapan("tiga", an(3000)).cocok && !K.cocokUcapan("tiga ribu", an(3)).cocok && !K.cocokUcapan("tujuh ribu", an(700)).cocok && !K.cocokUcapan("seribu", an(100)).cocok && !K.cocokUcapan("empat puluh", an(4)).cocok, "ucapan: tiga bukan tiga ribu, seribu bukan seratus, angka terbalik bukan jawaban");
  sama(K.angkaDariUcapan("enam enam tiga lima belas"), [6, 3, 15], "ucapan: angka berurutan dan kembar");
  sama(K.angkaDariUcapan("dua ribu lima ratus tiga"), [2503], "ucapan: ribuan, ratusan, satuan");
  const mulai = K.cocokUcapan("hmm", nm("baku"));
  cek(!mulai.cocok && mulai.terdengar.length === 0, "ucapan: tidak terdengar");
}

/* ------------------------------ CPA: tiga tahap, dua belas langkah ------------------------------ */
{
  const TAHAP = { Concrete: ["benda", D.CONCRETE], Pictorial: ["diagram", D.PICTORIAL], Abstract: ["lambang", D.ABSTRACT] };
  const cara3 = ["klik", "kanvas", "suara"];
  const NOMOR = { Concrete: [2, 3, 4], Pictorial: [5, 6, 7], Abstract: [8, 9, 10] };
  const TIPE = { klik: ["satuan", "isi", "lapisan", "tangga"], kanvas: ["gelas", "isi", "lapisan", "tangga"], suara: ["sebut", "isi", "lapisan", "tangga"] };
  const TIPE_SALAH = ["satuan", "isi", "lapisan", "tangga"];
  let jumlahSalah = 0;
  const posisiBenar = [];
  for (const [namaT, [rupa, soal]] of Object.entries(TAHAP)) {
    cek(soal.length === 3 && soal.map((s) => s.cara).join() === cara3.join(), `${namaT}: tiga misi Klik, Tulis di kanvas, Rekam suara`);
    sama(soal.map((s) => s.nomor), NOMOR[namaT], `${namaT}: nomor misi berlanjut`);
    cek(soal.every((s) => s.langkah.length === 4 && s.langkah.map((l) => l.metode).join() === "igil,isi,lapisan,tangga"), `${namaT}: empat langkah tiap misi berurut IGIL, Fill and Pour, Layer Cubes, Liter Ladder`);
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
        if (l.tipe === "salah") cek(s.cara === "klik" && TIPE_SALAH.includes(dasar.tipe) && dasar.tipe === TIPE.klik[i], `${namaT} ${s.nomor} langkah ${i + 1}: Cari kesalahan membungkus tugas klik yang sama`);
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
        // Data sah, satuan tertulis, dan bukan data Story.
        if (d.tipe === "isi") {
          cek(Number.isInteger(d.takar) && d.takar % 50 === 0 && d.takar >= 100 && d.takar <= 600 && d.gelas >= 2 && d.gelas <= 9 && !(d.takar === 250 && d.gelas === 8) && LC.totalIsi(d.gelas, d.takar) <= 9000, `${tag}: isi sah, bukan data Story (${d.gelas} gelas x ${d.takar} ml)`);
          if (s.cara === "kanvas") cek(LC.totalIsi(d.gelas, d.takar) % d.takar === 0 && d.gelas >= 1 && d.gelas <= 9, `${tag}: kanvas banyak gelas satu angka`);
        }
        if (d.tipe === "lapisan") cek([d.kolom, d.baris, d.lapis].every((x) => Number.isInteger(x) && x >= 1 && x <= 6) && !volStory(d.kolom, d.baris, d.lapis) && ![24, 20, 32].includes(LC.volumeBlok(d.kolom, d.baris, d.lapis)) || (s.cara === "kanvas" && LC.volumeBlok(d.kolom, d.baris, d.lapis) <= 9), `${tag}: balok sah, bukan data Story (${d.kolom}x${d.baris}x${d.lapis})`);
        if (d.tipe === "gelas") cek(d.kecil % d.per === 0 && d.kecil <= 18 && d.per >= 2 && d.per <= 5 && d.kecil / d.per >= 1 && d.kecil / d.per <= 9, `${tag}: gelas kecil habis dibagi isi gelas besar (${d.kecil}/${d.per})`);
        if (d.tipe === "tangga") cek(d.n >= 2 && d.n <= 99 && (d.jenis === "kubik" ? d.arah === "turun" : d.n <= 9 && d.n !== 2 && d.n !== 3), `${tag}: tangga sah, bukan data Story (${d.jenis} ${d.n} ${d.arah})`);
        if (d.tipe === "satuan") cek(KUNCI_EMOJI.includes(d.benda) || rupa !== "benda", `${tag}: benda ${d.benda} punya emoji pada Concrete`);
        if (d.tipe === "sebut") cek(s.cara === "suara" && ["baku", "liter", "mililiter", "kubik"].includes(d.kata) && kunci.jenis === "nama" && kunci.nama === d.kata, `${tag}: sebut hanya pada suara, kata ${d.kata}`);
        if (kunci?.jenis === "angka") {
          if (s.cara === "kanvas") {
            kanvasAngka.push(kunci.n);
            cek(kunci.n >= 1 && kunci.n <= 9, `${tag}: jawaban kanvas satu angka satu sampai sembilan (${kunci.n})`);
            if (d.tipe === "gelas") cek(kunci.n === d.kecil / d.per, `${tag}: kanvas gelas besar`);
            if (d.tipe === "isi") cek(kunci.n === d.gelas, `${tag}: kanvas banyak gelas`);
            if (d.tipe === "lapisan") cek(kunci.n === d.kolom * d.baris * d.lapis, `${tag}: kanvas volume`);
            if (d.tipe === "tangga") cek(d.arah === "naik" && d.jenis === "liter" && kunci.n === d.n, `${tag}: kanvas liter dari mililiter`);
          }
          if (s.cara === "suara") {
            cek(kunci.n >= 2 && kunci.n <= 9999, `${tag}: jawaban suara bilangan (${kunci.n})`);
            if (d.tipe === "isi") cek(kunci.n === d.gelas * d.takar, `${tag}: suara isi seluruhnya`);
            if (d.tipe === "lapisan") cek(kunci.n === d.kolom * d.baris * d.lapis && kunci.n >= 10, `${tag}: suara volume`);
            if (d.tipe === "tangga") cek(kunci.n === (d.jenis === "kubik" ? d.n : d.n * 1000), `${tag}: suara hasil tangga (kali seribu untuk liter, sama besar untuk kubik)`);
          }
        }
        if (kunci?.jenis === "nama") cek(s.cara !== "kanvas", `${tag}: jawaban nama bukan pada kanvas`);
        // Pilihan klik: tiga pilihan unik, jawaban benar tidak di tombol pertama, jawaban tokoh ikut, satuan tertulis.
        if (s.cara === "klik" && kunci !== null) {
          const pil = LC.pilihanKlik(l);
          const benar = LC.teksKunciKlik(l);
          cek(pil.length === 3 && new Set(pil).size === 3 && pil.includes(benar) && pil[0] !== benar, `${tag}: pilihan klik unik dan jawaban benar bukan yang pertama (${pil.join("/")})`);
          if (d.tipe === "satuan") cek(pil.every((t) => ["ml", "l", "cm²"].includes(t)) && benar === d.satuan && pil.includes("cm²") !== (d.satuan === "cm²"), `${tag}: pilihan satuan (${pil.join("/")})`);
          else cek(pil.every((t) => /^[\d.]+ (ml|l|cm³)$/.test(t)) && benar === LC.teksHasilKlik(d), `${tag}: pilihan bilangan dengan satuan (${pil.join("/")})`);
          if (d.tipe === "isi") {
            cek(pil.filter((t) => t === LC.teksMl(LC.totalIsi(d.gelas, d.takar))).length === 1 && pil.includes(LC.teksMl(d.gelas + d.takar)) && pil.includes(LC.teksMl(d.takar * (d.gelas - 1))), `${tag}: pilihan isi memuat jumlah dan satu gelas kurang (${pil.join("/")})`);
          }
          if (d.tipe === "lapisan") cek(pil.includes(LC.teksCm3(d.kolom + d.baris + d.lapis)) && pil.includes(LC.teksCm3(d.kolom * d.baris)) && pil.filter((t) => t === LC.teksCm3(LC.volumeBlok(d.kolom, d.baris, d.lapis))).length === 1, `${tag}: pilihan lapisan memuat jumlah dan satu lapisan (${pil.join("/")})`);
          if (d.tipe === "tangga" && d.jenis === "liter") cek(pil.includes(LC.teksMl(d.n * 100)) || pil.includes(LC.teksMl(d.n * 10)), `${tag}: pilihan tangga memuat salah satu nol (${pil.join("/")})`);
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
          cek(kk.length > 12 && tanpaDigit(kk) && bersih(kk) && /^[A-Z]/.test(kk) && !/\s[.,!?;:]/.test(kk) && !/[.?!]\s+[a-z]/.test(kk), `${tag}: kalimat penjelasan ada, berhuruf kapital, tanpa digit dan spasi sebelum tanda baca (${kk.slice(0, 50)})`);
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
          // Alasan benar dan petunjuk tidak menyebut hasil akhir tugas.
          const hasilKata = LC.kataBil(LC.hasilTugas(d));
          const bocor = new RegExp(`\\b${hasilKata}\\b`).test(`${l.alasan[l.benar]} ${pj}`);
          cek(!bocor, `${tag}: alasan benar dan petunjuk tidak menyebut hasil akhir (${hasilKata})`);
          posisiBenar.push(`alasan${l.benar}`);
        }
        // Batas rupa: Concrete benda beremoji, Pictorial dan Abstract tanpa emoji pada teks tugas.
        const teksTugas = [ls.judul, s.judul, s.cerita, ...(l.tipe === "salah" ? [l.kataTokoh, ...l.alasan] : [])].join(" ");
        if (rupa !== "benda") {
          cek(!adaEmoji(teksTugas), `${tag}: ${rupa} tanpa emoji pada teks tugas`);
          cek(!/emoji|\p{Extended_Pictographic}/u.test(ls.judul), `${tag}: judul tanpa ikon emoji`);
        }
        if (rupa === "lambang") {
          const bk = LC.barisKartu(d, s.cara);
          cek(Array.isArray(bk) && bk.length >= 3 && bk.every((b) => typeof b === "string" && b.length > 3), `${tag}: kartu kata ada`);
          cek(bk.every((b) => !adaEmoji(b) && bersih(b)), `${tag}: kartu kata tanpa emoji dan kata terlarang`);
          cek(bk[bk.length - 1].endsWith("?"), `${tag}: kartu kata berakhir pada hal yang dicari`);
          const hasil = LC.hasilTugas(d);
          cek(hasil === null || !new RegExp(`\\b${LC.fmt(hasil).replace(/\./g, "\\.")}\\b`).test(bk[bk.length - 1]), `${tag}: kartu kata tidak memuat jawaban pada baris yang dicari`);
        }
        // Gambar sungguh sebanyak data: gelas lewat susunBaris dan balok lewat tiga sisinya.
        if (d.tipe === "gelas") cek(LC.susunBaris(d.kecil, 9).reduce((x, y) => x + y, 0) === d.kecil, `${tag}: ${d.kecil} gelas kecil digambar sebanyak ${d.kecil}`);
        if (d.tipe === "isi" && s.cara !== "kanvas") cek(LC.susunBaris(d.gelas, 9).reduce((x, y) => x + y, 0) === d.gelas, `${tag}: ${d.gelas} gelas takar digambar sebanyak ${d.gelas}`);
        if (d.tipe === "lapisan") {
          const m = LC.mukaBlok(d.kolom, d.baris, d.lapis);
          cek(m.atas === d.kolom * d.baris && m.depan === d.kolom * d.lapis && m.samping === d.baris * d.lapis, `${tag}: balok digambar dari tiga sisi sebanyak kubusnya`);
        }
      }
    }
    cek(new Set(kanvasAngka).size === kanvasAngka.length && kanvasAngka.length === 4, `${namaT}: empat angka jawaban Tulis di kanvas tidak kembar (${kanvasAngka.join(", ")})`);
  }
  cek(jumlahSalah === 3, "tiap tahap punya satu Cari kesalahan (tiga seluruhnya)");
  cek(new Set(posisiBenar.filter((x) => typeof x === "string")).size >= 2, `Cari kesalahan: alasan benar tidak selalu di tempat yang sama (${posisiBenar.filter((x) => typeof x === "string")})`);
  cek(new Set(posisiBenar.filter((x) => typeof x === "number")).size >= 2 && posisiBenar.filter((x) => x === 0).length === 0, "jawaban klik benar tidak pernah di tombol pertama dan posisinya bervariasi");
  cek(TAHAP.Pictorial[1][0].langkah[3].langkah.betul === true && !TAHAP.Concrete[1][0].langkah[3].langkah.betul && !TAHAP.Abstract[1][0].langkah[2].langkah.betul, "Cari kesalahan: Laras benar pada Pictorial, Satria salah pada Concrete dan Abstract");
  const sC = TAHAP.Concrete[1][0].langkah[3].langkah;
  cek(sC.tokoh === "Satria" && sC.dasar.tipe === "tangga" && sC.jawabTokoh === LC.teksMl(sC.dasar.n * 100), "Cari kesalahan Concrete: Satria memakai seratus mililiter tiap liter (lupa seribu)");
  const sP = TAHAP.Pictorial[1][0].langkah[3].langkah;
  cek(sP.tokoh === "Laras" && sP.dasar.tipe === "tangga" && sP.jawabTokoh === LC.teksMl(sP.dasar.n * 1000), "Cari kesalahan Pictorial: Laras benar, seribu mililiter tiap liter");
  const sA = TAHAP.Abstract[1][0].langkah[2].langkah;
  cek(sA.tokoh === "Satria" && sA.dasar.tipe === "lapisan" && sA.jawabTokoh === LC.teksCm3(sA.dasar.kolom + sA.dasar.baris + sA.dasar.lapis), "Cari kesalahan Abstract: Satria menjumlah ukuran balok (lupa mengalikan)");
  const kv = (nama) => TAHAP[nama][1].filter((s) => s.cara === "kanvas").flatMap((s) => s.langkah.map((l) => LC.kunciJawab(l.langkah, "kanvas").n));
  sama(kv("Concrete"), [3, 6, 8, 5], "angka kanvas Concrete");
  sama(kv("Pictorial"), [2, 9, 6, 4], "angka kanvas Pictorial");
  sama(kv("Abstract"), [3, 7, 9, 8], "angka kanvas Abstract");
  // Tugas suara bervariasi: kata dan bilangan.
  const kunciSuara = Object.values(TAHAP).flatMap(([, soal]) => soal[2].langkah.map((l) => LC.kunciJawab(l.langkah, "suara")));
  cek(kunciSuara.some((k) => k.jenis === "nama") && kunciSuara.some((k) => k.jenis === "angka" && k.n >= 1000) && kunciSuara.some((k) => k.jenis === "angka" && k.n < 100), "tugas suara: kata, bilangan ribuan, dan bilangan pendek");
  const kataSuara = kunciSuara.filter((k) => k.jenis === "nama").map((k) => k.nama);
  for (const w of ["baku", "mililiter", "kubik"]) cek(kataSuara.includes(w), `tugas suara: kata ${w} muncul`);
  // Jenis jawaban klik beragam: satuan dan takaran.
  const kunciKlik = Object.values(TAHAP).flatMap(([, soal]) => soal[0].langkah.map((l) => LC.kunciJawab(l.langkah, "klik")));
  cek(kunciKlik.some((k) => ["ml", "l"].includes(k.nama)) && kunciKlik.some((k) => /^[\d.]+ ml$/.test(k.nama)) && kunciKlik.some((k) => /^[\d.]+ cm³$/.test(k.nama)), "tugas klik: satuan, mililiter, dan sentimeter kubik");
  // Satuan baku, tidak baku, kubus, dan tangga muncul di semua tahap.
  const semuaDasar = Object.values(TAHAP).flatMap(([, soal]) => soal.flatMap((s) => s.langkah.map((l) => LC.dasarDari(l.langkah))));
  cek(semuaDasar.some((d) => d.tipe === "tangga" && d.jenis === "kubik") && semuaDasar.some((d) => d.tipe === "tangga" && d.jenis === "liter" && d.arah === "naik") && semuaDasar.some((d) => d.tipe === "tangga" && d.jenis === "liter" && d.arah === "turun"), "tangga: liter turun, liter naik, dan kubik sama besar muncul");
  // Poin penting dan penutup.
  cek(D.POIN_PENTING.length >= 6 && D.POIN_PENTING.every((p) => p.length > 20 && bersih(p)) && D.POIN_PENTING_SUARA.every((p) => tanpaDigit(p) && !/[=<>%\/+×]/.test(p) && !/\s[.,!?;:]/.test(p)), "poin penting: banyak, bersih, suara tanpa digit dan tanda");
  const poin = D.POIN_PENTING.join(" ").toLowerCase();
  for (const m of ["1 l = 1.000 ml", "1 cm³ = 1 ml", "satuan baku", "lapisan", "dikali", "dibagi", "3 × 2 × 2 = 12 cm³ = 12 ml", "gelas", "satuan selalu ditulis"]) cek(poin.includes(m.toLowerCase()), `poin penting memuat ${m}`);
  const poinSuara = D.POIN_PENTING_SUARA.join(" ");
  cek(/seribu mililiter/.test(poinSuara) && /sentimeter kubik/.test(poinSuara) && /dua belas sentimeter kubik sama dengan dua belas mililiter/.test(poinSuara), "poin penting: suara mengeja satuan");
  cek(tanpaDigit(D.PENUTUP_B) && bersih(D.PENUTUP_B) && ["Satria", "Laras", "Genta", "Pak Hendro", "Bu Sinta", "Pak Anto", "Pesta Renang Tirta Ceria", "bab berikutnya"].every((t) => D.PENUTUP_B.includes(t)), "penutup B: perayaan akhir bab dengan kedua tamu dan semua tokoh, tanpa digit");
  cek(Object.values(D.TEMA_EMBER).every((t) => emojiSah(t.ikon) && t.nama.length >= 7 && t.cara.length > 20 && tanpaDigit(t.cara) && bersih(t.cara)), "tema tiga tahap sah");
  cek(D.TEMA_EMBER.pictorial.cara.includes("polos") && D.TEMA_EMBER.abstract.cara.includes("kartu") && /rak ember/i.test(D.TEMA_EMBER.concrete.cara), "tema: Concrete rak ember, Pictorial polos, Abstract kartu");
  cek(D.CONCRETE_EMBER === D.CONCRETE && D.PICTORIAL_EMBER === D.PICTORIAL && D.ABSTRACT_EMBER === D.ABSTRACT && D.MISI_EMBER_TEKS === DS.MISI_EMBER_TEKS, "nama ekspor untuk pemasang");
}

/* ------------------------------ Berkas ------------------------------ */
{
  const berkas = readdirSync(folderUrl).filter((f) => /\.(ts|tsx)$/.test(f));
  for (const nama of ["logika.ts", "data-sim.ts", "data-peta.ts", "data-info.ts", "logika-cpa.ts", "data.ts", "periksa.ts", "JawabEmber.tsx", "LangkahEmber.tsx", "GambarEmber.tsx", "TahapEmber.tsx", "SimulasiBakEmber.tsx", "PetaEmber.tsx", "InfoEmber.tsx", "RakEmber.tsx", "DaftarEmber.tsx"]) cek(berkas.includes(nama), `berkas ${nama} ada`);
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folderUrl), "utf8");
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d || c.codePointAt(0) === 0x1f6de || c.codePointAt(0) === 0x1fa74), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}|\\u\{1FA74\}|\\u\{1F39F\}|\\u\{2602\}|\\u\{1FA9F\}|\\u\{1FAA3\}|\\u\{1FA91\}/i.test(s), `${f}: kode emoji tidak melewati U+1FA95 dan tidak memakai emoji yang tampil kosong`);
    cek(!/senilai|nilai|buku|kelompok|bernilai|tebak/i.test(s), `${f}: tanpa kata senilai, nilai, buku, kelompok, tebak`);
    if (/^(logika|logika-cpa|periksa|data|data-sim|data-peta|data-info)\.ts$/.test(f)) cek(!/from "react"|fetch\(/.test(s), `${f}: tanpa React dan jaringan`);
    cek(!/ubin-k4b4a|SubBabK4B4|lab-luas-k4b4a|lab-volume-k4b4b|SimulasiLab(Luas|Volume)K4B4|kit-k4b4|infografis-k4b4|skenario-k4b4|mesin-data-k4b4|peta-kartu|PetaKartu|InfografisKartu/.test(s), `${f}: tidak memakai folder Sub-Bab lain, berkas lama, atau komponen kartu lama`);
    cek(!/🪣|🛟|\\u\{1FAA3\}|\\u\{1F6DF\}/.test(s), `${f}: tanpa emoji ember dan pelampung`);
  }
  // Teks layar tidak memuat kata terlarang, termasuk nama berkas data.
  const layar = ["LangkahEmber.tsx", "TahapEmber.tsx", "SimulasiBakEmber.tsx", "GambarEmber.tsx", "PetaEmber.tsx", "InfoEmber.tsx"].map((f) => readFileSync(new URL(f, folderUrl), "utf8")).join("\n");
  const teksLayar = [...layar.matchAll(/>\s*([^<>{}\n]{4,})\s*</g)].map((m) => m[1]).join(" ");
  cek(!/\b(skor|nilai|soal|tebak|kunci|latihan|teman|kelompok|buku|kelas)\b/i.test(teksLayar), "teks layar komponen tanpa kata terlarang");
  cek(/\bTugas\b/.test(layar) && !/>\s*Soal/.test(layar), "teks layar CPA memakai Tugas");
  cek(!/capitalize/.test(layar), "teks layar: tanpa kelas capitalize");
  const th = readFileSync(new URL("TahapEmber.tsx", folderUrl), "utf8");
  cek(/umum: Umum;\s*rupa: Rupa;\s*soal: SoalMisi\[\];\s*pita:/.test(th) && /teksAkhir: string/.test(th) && /poinPenting\?: boolean/.test(th), "TahapEmber: props umum, rupa, soal, pita, teksAkhir, poinPenting");
  cek(/IKON_METODE\[ls\.metode\]/.test(th) && /rupa === "benda" \?/.test(th), "TahapEmber: ikon metode hanya pada rupa benda (Pictorial dan Abstract tanpa emoji metode)");
  cek(/export default function TahapEmber/.test(th) && /Cari kesalahan/.test(th) && /POIN_PENTING/.test(th) && /PENUTUP_B/.test(th), "TahapEmber: ekspor, Cari kesalahan, Poin Penting, perayaan");
  cek(/"rak"/.test(th) && /"kertas"/.test(th) && /"daftar"/.test(th) && !/"lapangan"|"titik"|"program"|"halaman"|"kisi"|"pantai"|"jadwal"|"lembar"|"klub"|"bambu"|"denah"|"cat"|"kapur"|"tikar"|"peta"|"nota"|"tirai"|"jepit"|"bungkus"|"kain"/.test(th), "TahapEmber: pola visual rak ember, kertas milimeter, lembar daftar (berbeda dari bab lain)");
  cek(/1F95B/.test(th) && /PESTA RENANG TIRTA CERIA/.test(th) && ["Bu Sinta", "Pak Anto", "Pak Hendro", "Satria", "Laras", "Genta"].every((n) => th.includes(`"${n}"`)) && /1F388/.test(th) && /1F389/.test(th) && /DERET_PELAMPUNG/.test(th) && /data-uji="pelampung"/.test(th), "TahapEmber: kemajuan Concrete berupa deret gelas, perayaan dengan spanduk, pelampung berderet, balon, konfeti, kedua tamu dan semua tokoh");
  const lg = readFileSync(new URL("LangkahEmber.tsx", folderUrl), "utf8");
  cek(/export function LangkahEmber/.test(lg) && /JawabSuaraEmber/.test(lg) && /JawabTulis/.test(lg) && /pilihanSuara\(l, cara\)/.test(lg) && /TampilDasar/.test(lg), "LangkahEmber: ekspor, jawab suara dengan pilihan ketuk, jawab tulis di kanvas");
  cek(/ucapkan\(/.test(lg), "LangkahEmber: ucapan memakai kata, bukan digit");
  cek(!/l\.keliru/.test(lg) && (lg.match(/Pikirkan lagi apa yang \$\{l\.tokoh\} lakukan/g) ?? []).length === 2, "LangkahEmber: pesan setelah salah memilih benar-salah atau alasan hanya mengarahkan, tanpa menyebut alasan atau hasil");
  cek(/siap\(`Betul! \$\{l\.alasan\[i\]\}`\)/.test(lg), "LangkahEmber: pembenaran setelah Betul! memakai alasan benar yang diawali huruf kapital");
  const jw = readFileSync(new URL("JawabEmber.tsx", folderUrl), "utf8");
  cek(/gagalSekali/.test(jw) && /Ini jawaban yang benar|jawaban yang benar/.test(jw) && /PilihanKata/.test(jw) && /setCadangan\(true\)/.test(jw) && /e\.error === "not-allowed"/.test(jw), "JawabEmber: galat mikrofon dihitung gagal, pilihan ketuk sebagai cadangan, jawaban benar setelah tiga kali salah");
  const gm = readFileSync(new URL("GambarEmber.tsx", folderUrl), "utf8");
  cek(/export function BarisGelas/.test(gm) && /export function EmberSvg/.test(gm) && /export function BlokSvg/.test(gm) && /export function TanggaSvg/.test(gm) && /export function TampilDasar/.test(gm) && /rupa === "lambang"/.test(gm) && /EMOJI_BENDA/.test(gm) && /export function KartuKata/.test(gm), "GambarEmber: deret gelas, ember, balok kubus, tangga liter, tampilan dasar, kartu untuk Abstract");
  const irisGelas = gm.slice(gm.indexOf("export function BarisGelas"), gm.indexOf("/* ------------------------------ Ember"));
  cek(/Array\.from\(\{ length: n \}/.test(irisGelas) && /gridTemplateColumns: `repeat\(\$\{KOLOM_GELAS\}, \$\{sel\}px\)`/.test(irisGelas) && !/flex-wrap/.test(irisGelas), "BarisGelas: kisi tetap sembilan kolom, n gelas sungguhan, tidak membungkus sendiri");
  const irisBlok = gm.slice(gm.indexOf("export function BlokSvg"), gm.indexOf("/* ------------------------------ Tangga liter"));
  cek(/for \(let r = 0; r < lapis; r \+= 1\)/.test(irisBlok) && /for \(let c = 0; c < kolom; c \+= 1\)/.test(irisBlok) && /for \(let d = 0; d < baris; d \+= 1\)/.test(irisBlok) && /data-muka="depan"/.test(irisBlok) && /data-muka="atas"/.test(irisBlok) && /data-muka="samping"/.test(irisBlok) && /mukaBlok\(kolom, baris, lapis\)/.test(irisBlok), "BlokSvg: kotak kubus depan (kolom x lapisan), atas (kolom x baris), dan samping (baris x lapisan) sungguhan");
  cek(/totalIsi\(d\.gelas, d\.takar\)/.test(gm) && /mlDariL\(d\.n\)/.test(gm), "GambarEmber: isi dan tangga dihitung dari data");
  const sim = readFileSync(new URL("SimulasiBakEmber.tsx", folderUrl), "utf8");
  cek(/export default function SimulasiBakEmber/.test(sim) && /onKeadaan/.test(sim) && /MISI_EMBER_TEKS/.test(sim), "SimulasiBakEmber: ekspor, onKeadaan, teks misi");
  cek(/nama: "Tuang"/.test(sim) && /nama: "Susun"/.test(sim) && /nama: "Tangga"/.test(sim), "SimulasiBakEmber: tiga alat Tuang, Susun, Tangga");
  cek(/setCatatan\(ucap \?\? ""\)/.test(sim) && (sim.match(/Alat menolak/g) ?? []).length >= 2 && /meluap/.test(sim) && /tuang\(k\)/.test(sim) && /tambahLapis\(k\)/.test(sim) && /<BlokSvg kolom=\{ts\.kolom\} baris=\{ts\.baris\} lapis=\{k\.lapis\}/.test(sim), "SimulasiBakEmber: pesan lama dikosongkan tiap perubahan, pesan penolakan alat menjelaskan tanpa membocorkan, kubus digambar sebanyak lapisan");
  // Berkas bersama: Simulasi memasang Bak Ember dengan misiDaftar.
  const sk = readFileSync(new URL("../src/components/modul/SimulasiK4Bab4.tsx", import.meta.url), "utf8");
  cek(/SimulasiBakEmber/.test(sk) && /laporMisiEmber\(daftarMisiEmber\("B"\), k, a\.capai\)/.test(sk) && /misiDaftar: daftarMisiEmber\("B"\)/.test(sk) && !/judulBab=\{`Kelas/.test(sk), "SimulasiK4Bab4: langkahBakEmberB memasang Bak Ember dengan misiDaftar, judul bab tanpa kata Kelas");
  // Berkas lama yang dipertahankan ada (dipakai bab lain dan bank soal).
  for (const f of ["data-k4b4.ts", "naskah-k4b4.ts", "eja-k4b4.ts", "diagram-k4b4.tsx", "bantu-k4b4.tsx", "model-ukur-k4b4.tsx"]) cek(readdirSync(new URL("../src/components/modul/", import.meta.url)).includes(f), `berkas lama ${f} dipertahankan`);
  const ej = readFileSync(new URL("../src/lib/ejaan-inggris-id.ts", import.meta.url), "utf8");
  cek(/fill and pour/i.test(ej) && /layer cubes/i.test(ej) && /liter ladder/i.test(ej), "ejaan: tiga nama metode global ada");
}

console.log(`Lulus ${lulus}, gagal ${gagal}`);
process.exit(gagal ? 1 : 0);
