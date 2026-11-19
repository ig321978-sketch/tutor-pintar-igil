// Uji Mind-map (Peta Lintasan), Infografis (Papan Lomba), Simulasi Lintasan Lomba, dan tahap Concrete, Pictorial, Abstract Kelas 3 Bab 4 Sub-Bab C ("Lintasan Pak Samsul"),
// akhir cerita Festival Layang-layang Kampung.
// Memeriksa: geometri gambar (sudut sungguh sebesar derajatnya, jarak garis sejajar sungguh sama, sisi persegi sama panjang), logika simulasi (tegak lurus, sejajar, tanda, bangun),
// misi (awal tidak memenuhi, wajib empat, bebas dua), peta lintasan (sembilan kartu geser Masalah, Cara, Hasil memuat semua metode Story), papan lomba dari kejadian Story,
// CPA dua belas langkah per tahap (Klik, Kanvas, Suara x empat metode) dengan jawaban beragam dan Cari kesalahan di tiap tahap, kunci dihitung dari data, angka jawaban tidak kembar per tahap,
// tugas yang langsung siap (jebakan tombol macet), pengenal ucapan, petunjuk salah, batas rupa, emoji, kata terlarang, akhir baris, perayaan akhir cerita bab.
// Jalankan: node --no-warnings scripts/uji-lintasan-k3b4c.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/lintasan-k3b4c/logika.ts");
const DS = await import("../src/components/modul/lintasan-k3b4c/data-sim.ts");
const DK = await import("../src/components/modul/lintasan-k3b4c/data-kartu.ts");
const LC = await import("../src/components/modul/lintasan-k3b4c/logika-cpa.ts");
const D = await import("../src/components/modul/lintasan-k3b4c/data.ts");
const K = await import("../src/components/modul/lintasan-k3b4c/periksa.ts");
const G = await import("../src/components/modul/lintasan-k3b4c/geometri.ts");
const S = await import("../src/components/modul/misi-simulasi.ts");
const MK = await import("../src/components/modul/misi-k3bab4.ts");
const MT = await import("../src/components/modul/misi-teks-k3b4.ts");
const folderUrl = new URL("../src/components/modul/lintasan-k3b4c/", import.meta.url);

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
const hampir = (a, b, p, galat = 0.01) => cek(Math.abs(a - b) <= galat, `${p}: ${a} != ${b}`);
const TERLARANG = /\b(kelas|buku|teman|kelompok|dikelompokkan|mengelompokkan|skor|nilai|bernilai|soal|tebak|tebakan|kunci|latihan)\b/i;
const tanpaDigit = (t) => !/\d/.test(t);
const bersih = (t) => !TERLARANG.test(t) && !/buku|kelompok|bernilai|tebak|nilai|kelas|teman|skor|soal|kunci|latihan/i.test(t);
const emojiSah = (s) => [...s].every((c) => c.codePointAt(0) <= 0x1fa95 && c.codePointAt(0) !== 0x200d && c.codePointAt(0) !== 0x1f6de);
const adaEmoji = (s) => /\p{Extended_Pictographic}/u.test(s);

/* ------------------------------ Geometri gambar ------------------------------ */
{
  // Jarak tali sejajar sungguh sama di kedua ujung dan di tengah; tali tidak sejajar sungguh berbeda.
  for (const [kiri, kanan, miring] of [[4, 4, 1], [5, 5, 1], [2, 2, 0], [1, 1, 2], [3, 3, 2]]) {
    const t = G.duaTali(kiri, kanan, miring);
    hampir(G.jarakPetak(t, G.PETAK.x0), kiri, `jarak kiri ${kiri}`);
    hampir(G.jarakPetak(t, G.ujungKanan), kanan, `jarak kanan ${kanan}`);
    hampir(G.jarakPetak(t, 150), kiri, `jarak tengah ${kiri}`);
    hampir(G.kemiringan(t.atas), G.kemiringan(t.bawah), `tali sejajar punya kemiringan sama (${kiri},${kanan},${miring})`, 1e-9);
    cek(t.bawah[1][1] <= G.PETAK.y0 + G.PETAK.baris * G.PETAK.u + 0.001, `tali bawah di dalam kertas petak (${kiri},${kanan},${miring})`);
  }
  const tb = G.duaTali(5, 2, 0);
  hampir(G.jarakPetak(tb, G.PETAK.x0), 5, "tali tidak sejajar: jarak kiri lima");
  hampir(G.jarakPetak(tb, G.ujungKanan), 2, "tali tidak sejajar: jarak kanan dua");
  cek(G.kemiringan(tb.atas) !== G.kemiringan(tb.bawah), "tali tidak sejajar punya kemiringan berbeda");
  // Sudut sungguh sebesar derajatnya.
  for (const d of [45, 60, 90, 120, 135, 30, 75]) for (const [cx, cy, p] of [[150, 98, 42], [90, 98, 34], [150, 104, 92]]) {
    const { B, A, C } = G.titikTemu(cx, cy, d, p);
    hampir(G.sudutDi(B, A, C), d, `sudut ${d} derajat dua garis bertemu`, 0.5);
    cek(G.jarak(B, A) > p - 0.2 && G.jarak(B, A) < p + 0.2 && G.jarak(B, C) > p - 0.2 && G.jarak(B, C) < p + 0.2, `panjang kedua garis ${p} untuk sudut ${d}`);
  }
  // Pojok kertas persegi: sudut siku-siku di B dan sisi sama panjang.
  const pk = G.pojokKertas([100, 120], 30);
  sama(pk, [[100, 120], [130, 120], [130, 90], [100, 90]], "pojok kertas lipat");
  cek(G.banyakSikuPoligon(pk) === 4, "pojok kertas lipat: empat sudut siku-siku");
  // Titik temu 90 derajat pas dengan pojok kertas: garis kedua sejajar sisi tegak pojok.
  const t90 = G.titikTemu(150, 98, 90, 42);
  hampir(t90.C[0], t90.B[0], "garis kedua tegak lurus tepat di atas B (sudut 90)", 0.01);
  // Bangun datar.
  const seg = G.titikBangun("segitiga", 150, 100, 92);
  cek(seg.length === 3 && G.banyakSikuPoligon(seg) === 0, "segitiga: tiga titik sudut, tidak siku-siku");
  const per = G.titikBangun("persegi", 150, 100, 92);
  cek(per.length === 4 && G.banyakSikuPoligon(per) === 4 && Math.abs(G.jarak(per[0], per[1]) - G.jarak(per[1], per[2])) < 0.2 && Math.abs(G.jarak(per[2], per[3]) - G.jarak(per[0], per[1])) < 0.2, "persegi: empat sudut siku-siku dan keempat sisi sama panjang");
  const pp = G.titikBangun("persegiPanjang", 150, 100, 92);
  cek(pp.length === 4 && G.banyakSikuPoligon(pp) === 4 && G.jarak(pp[0], pp[1]) > G.jarak(pp[1], pp[2]) * 1.5 && Math.abs(G.jarak(pp[0], pp[1]) - G.jarak(pp[2], pp[3])) < 0.2, "persegi panjang: empat sudut siku-siku, sisi berhadapan sama, sisi panjang beda dari pendek");
  sama(G.titikBangun("lingkaran", 150, 100, 92), [], "lingkaran: tanpa titik sudut");
  for (const [b, tinggi] of [["segitiga", 92], ["persegi", 92], ["persegiPanjang", 92]]) {
    const t = G.titikBangun(b, 150, 100, tinggi);
    cek(t.every((p) => p[0] >= 20 && p[0] <= 280 && p[1] >= 30 && p[1] <= 180), `${b}: gambar muat di kanvas`);
  }
  // Sel titik temu muat di kanvas untuk semua sudut dan jumlah titik.
  for (const n of [2, 3, 4]) {
    const { pusat, panjang } = G.selTemu(n);
    cek(pusat.length === n && pusat.every((c, i) => i === 0 || c > pusat[i - 1]), `selTemu ${n}: pusat berurutan`);
    for (const d of LC.SUDUT_SAH) for (const cx of pusat) {
      const { B, A, C } = G.titikTemu(cx, 98, d, panjang);
      const lebar = 270 / n;
      cek([B, A, C].every((p) => p[0] >= cx - lebar / 2 - 0.5 && p[0] <= cx + lebar / 2 + 0.5 && p[1] >= 30 && p[1] <= 160), `selTemu ${n}: sudut ${d} muat dalam sel`);
    }
  }
}

/* ------------------------------ Kata bilangan dan ucapan ------------------------------ */
{
  sama([0, 1, 4, 9, 10, 11, 15, 20, 38, 100, 101].map(LC.kataBil), ["nol", "satu", "empat", "sembilan", "sepuluh", "sebelas", "lima belas", "dua puluh", "tiga puluh delapan", "seratus", "seratus satu"], "kata bilangan CPA");
  cek(LC.kata === LC.kataBil, "alias kata");
  for (let n = 1; n <= 9; n += 1) cek(tanpaDigit(LC.kataBil(n)) && LC.kataBil(n) === L.kata(n), `kata bilangan ${n} sama di simulasi dan CPA`);
  sama(LC.ucap("EF // GH"), "E F sejajar G H", "ucap: sejajar dengan huruf titik dipisah");
  sama(LC.ucap("PQ ⊥ RS"), "P Q tegak lurus R S", "ucap: tegak lurus dengan huruf titik dipisah");
  sama(LC.ucap("KL dan MN tidak sejajar"), "K L dan M N tidak sejajar", "ucap: pernyataan tidak sejajar");
  sama(LC.ucap("titik 2"), "titik dua", "ucap: titik dua");
  sama(LC.ucap("nomor 3"), "nomor tiga", "ucap: nomor tiga");
  sama(LC.ucap("AB = CD"), "A B sama dengan C D", "ucap: sama dengan");
  sama([LC.tulisHubungan(["E", "F", "G", "H"], "sejajar"), LC.tulisHubungan(["A", "B", "B", "C"], "tegak")], ["EF // GH", "AB ⊥ BC"], "tulisan hubungan dua garis");
  sama([LC.jenisSudut(45), LC.jenisSudut(90), LC.jenisSudut(135)], ["lancip", "siku-siku", "tumpul"], "jenis sudut");
}

/* ------------------------------ Simulasi: data dan logika ------------------------------ */
{
  cek(DS.AWAL_TEGAK.length === 3 && DS.AWAL_TEGAK.every((s) => s % 15 === 0 && s !== 90 && s >= 15 && s <= 165), "simulasi: tiga sudut awal tegak lurus, kelipatan lima belas, bukan sembilan puluh");
  cek(DS.AWAL_SEJAJAR.length === 3 && DS.AWAL_SEJAJAR.every((p) => p.kiri >= 1 && p.kiri <= 5 && p.kanan >= 1 && p.kanan <= 5 && p.kiri !== p.kanan && p.kiri + p.miring <= 6 && p.kanan + p.miring <= 6 && p.miring >= 0 && p.miring <= 2), "simulasi: tiga pola sejajar, jarak awal berbeda, muat di kertas petak");
  cek(DS.PASANGAN_TANDA.length === 4 && DS.PASANGAN_TANDA.every((p) => (p.jenis === "tali" ? p.kiri + p.miring <= 6 && p.kanan + p.miring <= 6 : [60, 90, 120].includes(p.sudut))), "simulasi: empat pasang tanda sah");
  sama(DS.PASANGAN_TANDA.map(L.hubunganDari), ["bukan", "sejajar", "tegak", "bukan"], "simulasi: hubungan pasangan tanda dihitung dari data (tegak, sejajar, dan bukan keduanya ada)");
  cek(DS.TARGET_BANGUN.length === 4 && new Set(DS.TARGET_BANGUN.map((t) => t.bentuk)).size === 4 && DS.TARGET_BANGUN.every((t) => tanpaDigit(t.ciri) && bersih(t.ciri) && !/segitiga|persegi|lingkaran/.test(t.ciri)), "simulasi: empat bangun sasaran, ciri tanpa digit dan tanpa menyebut nama");
  // Berbeda dari Story: jarak tiga petak yang sejajar dan dua serta empat petak yang melebar tidak dipakai bersamaan.
  cek(!DS.AWAL_SEJAJAR.some((p) => (p.kiri === 2 && p.kanan === 4) || (p.kiri === 3 && p.kanan === 3)), "simulasi: pola sejajar berbeda dari Story");
  cek(tanpaDigit(DS.MISI_LINTASAN_TEKS) && bersih(DS.MISI_LINTASAN_TEKS) && DS.MISI_LINTASAN_TEKS === MT.MISI_K3B4.C && D.MISI_LINTASAN_TEKS === DS.MISI_LINTASAN_TEKS, "simulasi: teks misi tanpa digit dan kata terlarang, sama dengan misi-teks-k3b4");
  cek(tanpaDigit(MT.MISI_K3B4.C) && MT.hurufK3B4("C") === "C" && MT.misiAwalK3Bab4("C").includes(MT.MISI_K3B4.C), "misi-teks: misi awal C memuat teks misi tanpa digit");

  const a = L.awalLintasan();
  cek(a.alat === "lintasan" && a.mode === "tegak" && a.sudut === 60 && !a.pojok && !a.jarakDiukur && a.kanan === 5 && a.pilihan === null && a.batang === 0 && !a.lengkung && a.nama === null && a.menolak === 0 && a.salah === 0 && a.tegakBenar.length + a.sejajarBenar.length + a.tandaBenar.length + a.bangunBenar.length === 0, "simulasi: keadaan awal kosong");
  // Tegak lurus.
  const t0 = L.periksaTegak(a);
  cek(!t0.ok && t0.tolak && t0.k.menolak === 1 && t0.k.salah === 0 && /Pasang pojok kertas dulu/.test(L.petunjukTegak(a)) && tanpaDigit(L.petunjukTegak(a)), "tegak: memeriksa sebelum pojok kertas dipasang ditolak, petunjuk menunjuk langkah yang belum dilakukan");
  let t = L.pasangPojok(a);
  cek(t.pojok && !L.pasangPojok(t).pojok, "tegak: pojok kertas dipasang dan dilepas");
  const t1 = L.periksaTegak(t);
  cek(!t1.ok && !t1.tolak && t1.k.salah === 1 && /terlalu rapat/.test(L.petunjukTegak(t)) && /membuka/.test(L.petunjukTegak(t)), "tegak: sudut lancip belum pas, petunjuk membuka sudut");
  cek(/terlalu terbuka/.test(L.petunjukTegak({ ...t, sudut: 135 })) && /menutup/.test(L.petunjukTegak({ ...t, sudut: 135 })), "tegak: sudut tumpul belum pas, petunjuk menutup sudut");
  t = L.putarTali(L.putarTali(t, 1).k, 1).k;
  sama(t.sudut, 90, "tegak: dua kali buka dari enam puluh menjadi sembilan puluh");
  const t2 = L.periksaTegak(t);
  cek(t2.ok && t2.k.tegakBenar.join() === "0" && t2.k.tegakKe === 1 && t2.k.sudut === 135 && !t2.k.pojok && L.awalTegak(t2.k) === 135, "tegak: sudut siku-siku dengan pojok kertas tepat membuka sasaran berikutnya");
  sama(S.misiBaru(MK.MISI_C, t2.k, new Set()), ["c-tegak"], "tegak: misi c-tegak");
  sama(S.misiBaru(MK.MISI_C, t0.k, new Set()), ["c-tolak"], "tegak: alat menolak memenuhi tantangan bebas c-tolak");
  cek(!L.putarTali({ ...a, sudut: 15 }, -1).ok && !L.putarTali({ ...a, sudut: 165 }, 1).ok && L.putarTali(a, -1).k.sudut === 45, "tegak: sudut antara lima belas dan seratus enam puluh lima");
  cek(tanpaDigit(L.kalimatTegak(a)) && tanpaDigit(L.kalimatTegak(t)) && tanpaDigit(L.kalimatTegak(t2.k)) && /Betul/.test(L.kalimatTegak(t2.k)), "tegak: kalimat tanpa digit");
  // Sejajar.
  const sj0 = L.periksaSejajar(a);
  cek(!sj0.ok && sj0.tolak && sj0.k.menolak === 1 && /Ukur jarak kedua tali/.test(L.petunjukSejajar(a)) && tanpaDigit(L.petunjukSejajar(a)), "sejajar: memeriksa sebelum jarak diukur ditolak, petunjuk menunjuk langkah yang belum dilakukan");
  let sj = L.ukurJarak(a);
  const sj1 = L.periksaSejajar(sj);
  cek(!sj1.ok && !sj1.tolak && sj1.k.salah === 1 && /Naikkan ujung kanan/.test(L.petunjukSejajar(sj)) && tanpaDigit(L.petunjukSejajar(sj)), "sejajar: jarak kanan lebih besar belum sejajar, petunjuk menaikkan");
  cek(/Turunkan ujung kanan/.test(L.petunjukSejajar({ ...sj, kanan: 1 })), "sejajar: jarak kanan lebih kecil, petunjuk menurunkan");
  sj = L.geserKanan(sj, -1).k;
  cek(sj.kanan === 4 && !sj.jarakDiukur, "sejajar: menggeser ujung membuat jarak harus diukur lagi");
  for (let i = 0; i < 2; i += 1) sj = L.geserKanan(sj, -1).k;
  sama(sj.kanan, 2, "sejajar: jarak kanan sama dengan jarak kiri");
  cek(L.periksaSejajar(sj).tolak, "sejajar: sudah sama tetapi belum diukur, tetap ditolak");
  sj = L.ukurJarak(sj);
  const sj2 = L.periksaSejajar(sj);
  cek(sj2.ok && sj2.k.sejajarBenar.join() === "0" && sj2.k.sejajarKe === 1 && sj2.k.kanan === 1 && !sj2.k.jarakDiukur && L.polaSejajar(sj2.k).kiri === 4, "sejajar: jarak sama tepat membuka pola berikutnya");
  sama(S.misiBaru(MK.MISI_C, sj2.k, new Set()), ["c-sejajar"], "sejajar: misi c-sejajar");
  cek(!L.geserKanan({ ...a, kanan: 1 }, -1).ok && !L.geserKanan({ ...a, kanan: 5 }, 1).ok && !L.geserKanan({ ...a, kanan: 5, sejajarKe: 0 }, 1).ok && tanpaDigit(L.kalimatSejajar(a)) && tanpaDigit(L.kalimatSejajar(sj2.k)), "sejajar: jarak antara satu dan lima petak dan muat di kertas petak, kalimat tanpa digit");
  // Pola sejajar: tali kedua selalu bisa disamakan dalam batas geser.
  for (let i = 0; i < DS.AWAL_SEJAJAR.length; i += 1) {
    const p = DS.AWAL_SEJAJAR[i];
    let kk = { ...L.awalLintasan(), sejajarKe: i, kanan: p.kanan };
    while (kk.kanan !== p.kiri) kk = L.geserKanan(kk, kk.kanan > p.kiri ? -1 : 1).k;
    cek(L.periksaSejajar(L.ukurJarak(kk)).ok, `sejajar: pola ${i + 1} bisa diselesaikan dengan menggeser ujung kanan`);
  }
  // Tanda.
  const td0 = L.periksaTanda(a);
  cek(!td0.ok && td0.k.salah === 0 && /Pilih dulu tanda/.test(L.petunjukTanda(a)) && tanpaDigit(L.petunjukTanda(a)), "tanda: memeriksa tanpa pilihan, petunjuk menunjuk langkah yang belum dilakukan");
  sama(L.hubunganDari(L.pasanganTanda(a)), "bukan", "tanda: pasangan pertama bukan keduanya");
  const salahTd = L.periksaTanda(L.pilihTanda(a, "tegak"));
  cek(!salahTd.ok && salahTd.k.salah === 1 && /tidak tegak lurus/.test(L.petunjukTanda(L.pilihTanda(a, "tegak"))), "tanda: pilihan keliru, petunjuk menjelaskan pojok tidak pas");
  const benarTd = L.periksaTanda(L.pilihTanda(a, "bukan"));
  cek(benarTd.ok && benarTd.k.tandaBenar.join() === "0" && benarTd.k.tandaKe === 1 && benarTd.k.pilihan === null, "tanda: pilihan tepat membuka pasangan berikutnya");
  sama(L.hubunganDari(L.pasanganTanda(benarTd.k)), "sejajar", "tanda: pasangan kedua sejajar");
  sama(S.misiBaru(MK.MISI_C, benarTd.k, new Set()), ["c-tanda"], "tanda: misi c-tanda");
  let tdSemua = a;
  for (let i = 0; i < 3; i += 1) tdSemua = L.periksaTanda(L.pilihTanda(tdSemua, L.hubunganDari(L.pasanganTanda(tdSemua)))).k;
  cek(tdSemua.tandaBenar.join() === "0,1,2" && tanpaDigit(L.kalimatTanda(a)) && tanpaDigit(L.kalimatTanda(benarTd.k)), "tanda: tiga pasang berurutan tepat, kalimat tanpa digit");
  cek(/jarak kedua ujung sama/i.test(L.petunjukTanda(L.pilihTanda({ ...a, tandaKe: 1 }, "bukan"))) && /pas di titik temu/.test(L.petunjukTanda(L.pilihTanda({ ...a, tandaKe: 2 }, "sejajar"))), "tanda: petunjuk menyebut jarak sama untuk sejajar dan pojok pas untuk tegak lurus");
  // Bangun.
  cek(L.bentukRakitan(a) === null && L.bentukRakitan({ ...a, batang: 3 }) === "segitiga" && L.bentukRakitan({ ...a, batang: 4 }) === "persegiPanjang" && L.bentukRakitan({ ...a, batang: 4, sama: true }) === "persegi" && L.bentukRakitan({ ...a, lengkung: true }) === "lingkaran" && L.bentukRakitan({ ...a, batang: 2 }) === null, "bangun: bentuk rakitan dari batang");
  const b0 = L.periksaBangun(a);
  cek(!b0.ok && b0.k.salah === 1 && /Tambah batang atau pakai batang lengkung dulu/.test(L.petunjukBangun(a)) && tanpaDigit(L.petunjukBangun(a)), "bangun: belum ada batang, petunjuk menunjuk langkah yang belum dilakukan");
  let bg = L.tambahBatang(L.tambahBatang(a, 1).k, 1).k;
  cek(/belum membentuk bangun/.test(L.petunjukBangun(bg)) && L.ciriRakitan(bg).includes("belum menutup"), "bangun: dua batang belum menjadi bangun");
  bg = L.tambahBatang(bg, 1).k;
  cek(/belum cocok/.test(L.petunjukBangun(bg)), "bangun: segitiga belum cocok dengan sasaran persegi panjang");
  bg = L.tambahBatang(bg, 1).k;
  cek(L.bentukRakitan(bg) === "persegiPanjang" && /Sebut namanya dulu/.test(L.petunjukBangun(bg)), "bangun: persegi panjang cocok, petunjuk menyebut nama");
  const salahNama = L.periksaBangun(L.sebutNama(bg, "persegi"));
  cek(!salahNama.ok && salahNama.k.salah === 1 && !/bernama persegi panjang/.test(L.petunjukBangun(L.sebutNama(bg, "persegi"))) && /ciri/i.test(L.petunjukBangun(L.sebutNama(bg, "persegi"))), "bangun: nama keliru, petunjuk menunjuk ciri tanpa membocorkan nama");
  const b1 = L.periksaBangun(L.sebutNama(bg, "persegiPanjang"));
  cek(b1.ok && b1.k.bangunBenar.join() === "0" && b1.k.bangunKe === 1 && b1.k.batang === 0 && b1.k.nama === null && L.targetBangun(b1.k).bentuk === "segitiga", "bangun: rakitan dan nama tepat membuka bangun berikutnya");
  sama(S.misiBaru(MK.MISI_C, b1.k, new Set()), ["c-bangun"], "bangun: misi c-bangun");
  cek(!L.tambahBatang(a, -1).ok && !L.tambahBatang({ ...a, batang: 4 }, 1).ok && !L.samakanSisi({ ...a, batang: 3 }).ok && L.samakanSisi({ ...a, batang: 4 }).k.sama && L.pakaiLengkung(a).lengkung && L.pakaiLengkung(L.pakaiLengkung(a)).lengkung === false && L.kosongkanBangun({ ...bg, nama: "persegi" }).batang === 0, "bangun: batas batang, samakan sisi, batang lengkung, kosongkan");
  cek(L.tambahBatang({ ...a, lengkung: true }, 1).k.lengkung === false && L.tambahBatang({ ...a, batang: 4, sama: true }, -1).k.sama === false, "bangun: batang lengkung dilepas bila batang lurus ditambah, sisi tidak lagi sama bila batang kurang");
  // Semua bangun sasaran dapat dirakit.
  let semuaB = a;
  for (let i = 0; i < 4; i += 1) {
    const sasaran = L.targetBangun(semuaB).bentuk;
    let r = L.kosongkanBangun(semuaB);
    if (sasaran === "lingkaran") r = L.pakaiLengkung(r);
    else {
      for (let n = 0; n < (sasaran === "segitiga" ? 3 : 4); n += 1) r = L.tambahBatang(r, 1).k;
      if (sasaran === "persegi") r = L.samakanSisi(r).k;
    }
    const h = L.periksaBangun(L.sebutNama(r, sasaran));
    cek(h.ok, `bangun: sasaran ${sasaran} dapat dirakit`);
    semuaB = h.k;
  }
  cek(semuaB.bangunBenar.join() === "0,1,2,3" && tanpaDigit(L.kalimatBangun(a)) && tanpaDigit(L.kalimatBangun(semuaB)), "bangun: empat bangun tepat, kalimat tanpa digit");
  cek(L.ciriRakitan({ ...a, lengkung: true }).includes("garis lengkung") && L.ciriRakitan({ ...a, batang: 3 }).includes("3 sisi") && L.ciriRakitan({ ...a, batang: 4, sama: true }).includes("sama panjang"), "bangun: ciri rakitan ditampilkan");
  cek(L.pilihModeLintasan(a, "bangun").mode === "bangun", "mode: ganti alat");
  cek(L.mulaiLagiLintasan().tegakKe === 0 && L.mulaiLagiLintasan().tandaBenar.length === 0, "mulai lagi: kembali ke awal");
  // Misi.
  const M = MK.MISI_C;
  cek(M.filter((m) => m.wajib).length === 4 && M.filter((m) => !m.wajib).length === 2, "misi C: empat wajib, dua bebas");
  cek(new Set(M.map((m) => m.id)).size === 6 && M.every((m) => m.id.startsWith("c-") && m.teks.length >= 10 && m.teks.length <= 120 && tanpaDigit(m.teks) && bersih(m.teks)), "misi C: id berawalan c-, unik, 10 sampai 120 huruf, tanpa digit");
  sama(MK.daftarMisiK3Bab4("C"), M, "daftarMisiK3Bab4 C");
  cek(M.every((m) => !m.cek({ alat: "kerangka" })), "misi C: alat lain tidak memenuhi misi");
  sama(S.misiBaru(M, a, new Set()), [], "misi C: keadaan awal tanpa misi baru");
  cek(S.misiBaru(M, { ...a, salah: 9, mode: "bangun", sudut: 90, pojok: true, kanan: 2, jarakDiukur: true, pilihan: "tegak", batang: 4, sama: true, nama: "persegi" }, new Set()).length === 0, "misi C: isian yang belum diperiksa tidak dihitung sebagai misi");
  sama(S.misiBaru(M, { ...a, tandaBenar: [0, 1, 2], bangunBenar: [0, 1, 2], tegakBenar: [0], sejajarBenar: [0], menolak: 1 }, new Set()), ["c-tegak", "c-sejajar", "c-tanda", "c-bangun", "c-tolak", "c-semua"], "misi C: semua tercapai");
}

/* ------------------------------ Mind-map: peta lintasan (sembilan kartu geser) ------------------------------ */
{
  const KA = DK.KARTU_LINTASAN;
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
  for (const m of ["Pojok kertas lipat", "Lambang T terbalik", "Jarak selalu sama", "Cek jarak kedua ujung", "Hitung sisi dan sudut", "Periksa pojok dan sisi", "Cek Kertas Petak", "Lipat dan Cocokkan", "Pilah Bangun"]) cek(cara.toLowerCase().includes(m.toLowerCase()), `kartu: cara memuat ${m}`);
  const gab = KA.map((k) => [k.judul, k.masalah.label, k.cara.label, k.hasil.label, k.masalah.arti, k.cara.arti, k.hasil.arti].join(" ")).join(" ").toLowerCase();
  for (const s of ["pojok kertas lipat", "garis tegak lurus", "lambang yang seperti huruf t terbalik", "garis sejajar", "jaraknya selalu sama", "dua garis miring", "tiga sisi dan tiga sudut", "segitiga", "persegi panjang", "empat sisi dan empat sudut siku-siku", "keempat sisinya sama panjang", "lingkaran", "garis lengkung", "kertas berpetak"]) cek(gab.includes(s), `kartu: memuat poin "${s}"`);
  cek(!new RegExp("\\b(raka|salsa|bima|pak joko|pak samsul|bu ratih|kak anton|tiang bendera|patok|peluit|panji|spanduk)\\b", "i").test(gab), "kartu: hanya poin pelajaran (tanpa tokoh dan benda cerita)");
  cek(tanpaDigit(DK.SUARA_KARTU_LINTASAN + DK.SELESAI_KARTU_LINTASAN) && bersih(DK.SUARA_KARTU_LINTASAN + DK.SELESAI_KARTU_LINTASAN), "kartu: suara dan pesan selesai tanpa digit dan kata terlarang");
  cek(emojiSah(DK.TEMA_KARTU_LINTASAN.ikon) && DK.TEMA_KARTU_LINTASAN.judul.length > 5, "kartu: tema sah");
  const RG = DK.RINGKASAN_LINTASAN;
  cek(RG.ikon.length === DK.KARTU_LINTASAN.length && new Set(RG.ikon).size === RG.ikon.length && [...RG.ikon, RG.pusat].every((e) => emojiSah(e) && !/[A-Za-z0-9]/.test(e)), "peta radial: satu gambar unik per kartu, gambar sah tanpa huruf");
  cek(tanpaDigit(RG.suara) && bersih(RG.suara) && !RG.ikon.includes(RG.pusat), "peta radial: suara bersih dan pusat berbeda dari cabang");
}

/* ------------------------------ Infografis: papan lomba (satu tabel lima baris) ------------------------------ */
{
  const B = DK.BARIS_INFO_LINTASAN;
  cek(B.length === 5 && DK.KOLOM_INFO_LINTASAN.length === 3, "infografis: lima baris dan tiga kolom");
  cek(B.every((b) => b.isi.length === 3 && emojiSah(b.ikon) && b.nama.length > 4), "infografis: tiap baris tiga isian, emoji sah");
  const jumlahContoh = B.map((b) => b.contoh.length);
  cek(jumlahContoh[0] === 3 && jumlahContoh.slice(1).every((n) => n === 0), "infografis: baris satu penuh contoh, baris dua sampai lima mandiri");
  const semua = B.flatMap((b) => b.isi);
  cek(B.every((b) => new Set(b.isi.map((x) => x.t)).size === 3), "infografis: tiga label tiap baris berbeda");
  cek(new Set(semua.map((x) => x.t)).size === semua.length, "infografis: semua label unik");
  cek(semua.every((x) => x.t.length <= 26 && x.t.split(/\s+/).length <= 5 && bersih(x.t) && bersih(x.s ?? "")), "infografis: label pendek (paling banyak lima kata) dan tanpa kata terlarang");
  cek(semua.every((x) => tanpaDigit(x.s ?? x.t)), "infografis: ucapan label tanpa digit");
  const gab = B.map((b) => [b.nama, ...b.isi.map((x) => x.t)].join(" ")).join(" ").toLowerCase();
  for (const s of ["garis tegak lurus", "garis sejajar", "segitiga", "persegi panjang dan persegi", "lingkaran", "cek pojok kertas", "pojok pas", "sudut siku-siku", "cek jarak ujung", "jarak sama", "tidak pernah bertemu", "tiga sisi", "empat sisi", "garis lengkung", "tanpa sudut"]) cek(gab.includes(s), `infografis: memuat "${s}"`);
  cek(!new RegExp("\\b(raka|salsa|bima|pak joko|pak samsul|bu ratih|kak anton)\\b", "i").test(gab), "infografis: tanpa nama tokoh");
  cek(tanpaDigit(DK.SUARA_INFO_LINTASAN + DK.SELESAI_INFO_LINTASAN) && bersih(DK.SUARA_INFO_LINTASAN + DK.SELESAI_INFO_LINTASAN) && emojiSah(DK.TEMA_INFO_LINTASAN.ikon), "infografis: suara dan tema bersih");
}

/* ------------------------------ Pengenal ucapan ------------------------------ */
{
  const nm = (nama) => ({ jenis: "nama", nama });
  const an = (n) => ({ jenis: "angka", n });
  for (const nama of ["sejajar", "tegak lurus", "segitiga", "persegi", "persegi panjang", "lingkaran"]) cek(K.cocokUcapan(nama, nm(nama)).cocok && K.kataDariUcapan(nama).length === 1, `cocok: kata ${nama} dikenali tepat satu`);
  sama(K.kataDariUcapan("persegi panjang"), ["persegi panjang"], "ucapan: persegi panjang tidak menghitung persegi");
  sama(K.kataDariUcapan("persegi"), ["persegi"], "ucapan: persegi saja");
  sama(K.kataDariUcapan("segi tiga"), ["segitiga"], "ucapan: segi tiga berarti segitiga");
  sama(K.kataDariUcapan("tegaklurus"), ["tegak lurus"], "ucapan: tegaklurus berarti tegak lurus");
  sama(K.kataDariUcapan("paralel"), ["sejajar"], "ucapan: paralel berarti sejajar");
  sama(K.kataDariUcapan("tidak sejajar"), [], "ucapan: tidak sejajar tidak dihitung");
  sama(K.kataDariUcapan("bukan persegi"), [], "ucapan: bukan persegi tidak dihitung");
  sama(K.kataDariUcapan("bukan persegi panjang tetapi persegi"), ["persegi"], "ucapan: bukan persegi panjang, tetapi persegi");
  sama(K.kataDariUcapan("halo"), [], "ucapan: kata lain tidak dikenali");
  cek(!K.cocokUcapan("sejajar", nm("tegak lurus")).cocok && !K.cocokUcapan("persegi", nm("persegi panjang")).cocok && !K.cocokUcapan("persegi panjang", nm("persegi")).cocok && !K.cocokUcapan("segitiga", nm("lingkaran")).cocok, "cocok: kata berbeda tidak cocok");
  sama(K.angkaDariUcapan("lima"), [5], "angka: lima");
  sama(K.angkaDariUcapan("tiga puluh"), [30], "angka: tiga puluh");
  sama(K.angkaDariUcapan("4"), [4], "angka: 4 tertulis");
  sama(K.angkaDariUcapan("nol"), [0], "angka: nol");
  for (let n = 1; n <= 9; n += 1) cek(K.angkaDariUcapan(LC.kataBil(n)).join() === String(n), `angka: kata bilangan ${n} dikenali utuh`);
  cek(K.cocokUcapan("lima", an(5)).cocok && K.cocokUcapan("5", an(5)).cocok && !K.cocokUcapan("enam", an(5)).cocok, "cocok: kunci angka lima");
  cek(!K.cocokUcapan("lima", { jenis: "pilih", teks: "titik 2", kata: "titik dua" }).cocok, "cocok: kunci pilihan dijawab dengan ketukan, bukan suara");
}

/* ------------------------------ CPA ------------------------------ */
const TAHAP = { Concrete: ["benda", D.CONCRETE], Pictorial: ["diagram", D.PICTORIAL], Abstract: ["lambang", D.ABSTRACT] };
const CARA = ["klik", "kanvas", "suara"];
const METODE = ["igil", "petak", "lipat", "pilah"];
const semuaTeksLangkah = (ls, rupa, cara) => [ls.judul, ls.suara, LC.instruksi(ls.langkah, rupa, cara), LC.kalimatTanya(ls.langkah, cara), LC.kalimatKunci(ls.langkah, cara), LC.petunjukSalah(ls.langkah, cara, 1)];
{
  sama(LC.URUT_METODE, METODE, "urutan metode");
  cek(LC.NAMA_METODE.igil.includes("Cek Jarak, Cek Pojok, Sebut Ciri") && LC.NAMA_METODE.petak.includes("Grid Paper Check") && LC.NAMA_METODE.lipat.includes("Fold and Match") && LC.NAMA_METODE.pilah.includes("Shape Sort"), "nama metode IGIL dan tiga metode global");
  cek(METODE.every((m) => emojiSah(LC.IKON_METODE[m])), "ikon metode sah");
  let nomor = 2;
  const tipeMetode = { igil: ["bangun", "lambang", "salah", "sejajar", "tegak", "pilah"], petak: ["sejajar"], lipat: ["tegak"], pilah: ["pilah"] };
  for (const [nama, [rupa, soal]] of Object.entries(TAHAP)) {
    cek(soal.length === 3 && soal.map((s) => s.cara).join() === CARA.join(), `${nama}: tiga misi Klik, Kanvas, Suara`);
    cek(soal.every((s) => s.langkah.length === 4 && s.langkah.map((l) => l.metode).join() === METODE.join()), `${nama}: empat langkah per misi (IGIL, Grid Paper Check, Fold and Match, Shape Sort)`);
    for (const s of soal) {
      cek(s.nomor === nomor, `${nama}: nomor misi berlanjut ${nomor}`);
      nomor += 1;
      cek(s.judul.startsWith("Misi Lintasan") && s.cerita.length > 15 && bersih(s.judul) && bersih(s.cerita), `${nama} ${s.nomor}: judul dan cerita sah`);
      for (const ls of s.langkah) {
        cek(ls.cara === s.cara, `${nama} ${s.nomor}: cara langkah sama dengan misi`);
        const teks = semuaTeksLangkah(ls, rupa, s.cara);
        cek(teks.every((t) => tanpaDigit(t) && bersih(t)), `${nama} ${s.nomor} ${ls.metode}: teks tanpa digit dan kata terlarang (${teks.find((t) => !tanpaDigit(t) || !bersih(t)) ?? ""})`);
        cek(teks.every((t) => !/[⊥∠°=<>]|\/\//.test(t)), `${nama} ${s.nomor} ${ls.metode}: teks suara tanpa lambang (lambang dieja dengan kata)`);
        cek(emojiSah(teks.join("")), `${nama} ${s.nomor} ${ls.metode}: emoji sah`);
        cek(ls.judul === ls.suara && ls.judul === LC.instruksi(ls.langkah, rupa, s.cara), `${nama} ${s.nomor} ${ls.metode}: judul dan suara sama dengan instruksi`);
        // Batas rupa: Pictorial dan Abstract tanpa emoji benda di teks tugas.
        if (rupa !== "benda") cek(!adaEmoji(teks.join(" ")), `${nama} ${s.nomor} ${ls.metode}: teks tugas tanpa emoji (batas rupa)`);
        const dasar = LC.dasarDari(ls.langkah);
        cek(LC.dataSah(dasar, s.cara), `${nama} ${s.nomor} ${ls.metode}: data sah dan konsisten`);
        cek(tipeMetode[ls.metode].includes(ls.langkah.tipe === "salah" ? "salah" : dasar.tipe), `${nama} ${s.nomor} ${ls.metode}: jenis tugas cocok dengan metode (${dasar.tipe})`);
        if (ls.metode !== "igil") cek(dasar.tipe === { petak: "sejajar", lipat: "tegak", pilah: "pilah" }[ls.metode], `${nama} ${s.nomor} ${ls.metode}: metode global memakai jenis tugasnya sendiri`);
      }
    }
    // Cari kesalahan di tiap tahap, di tugas klik IGIL.
    const salahL = soal.flatMap((s) => s.langkah.filter((l) => l.langkah.tipe === "salah"));
    cek(salahL.length === 1 && soal[0].langkah[0].langkah.tipe === "salah", `${nama}: satu Cari kesalahan, di Klik IGIL`);
    for (const l of salahL) {
      const x = l.langkah;
      cek(x.alasan.length === 3 && new Set(x.alasan).size === 3 && x.benar >= 0 && x.benar <= 2 && x.keliru.length > 20 && x.kataTokoh.length > 15 && ["Raka", "Salsa", "Bima"].includes(x.tokoh), `${nama}: Cari kesalahan lengkap`);
      cek(tanpaDigit(x.alasan.join(" ") + x.keliru) && bersih(x.kataTokoh + x.alasan.join(" ") + x.keliru), `${nama}: Cari kesalahan tanpa digit dan kata terlarang`);
      const pil = LC.pilihanKlik(x);
      cek(pil.length === 3 && new Set(pil).size === 3 && pil.includes(String(x.jawabTokoh)), `${nama}: pilihan klik Cari kesalahan memuat jawaban tokoh (${pil.join("/")})`);
      const kunci = LC.kunciJawab(x, "klik");
      cek(kunci !== null && kunci.jenis === "pilih", `${nama}: jawaban Cari kesalahan berupa pernyataan pilihan`);
      cek(x.betul === true ? kunci.teks === x.jawabTokoh : kunci.teks !== x.jawabTokoh, `${nama}: jawaban tokoh ${x.betul ? "benar" : "keliru"} sesuai data`);
      cek(LC.petunjukSalah(x, "klik", x.jawabTokoh).startsWith(`Itu jawaban ${x.tokoh}`), `${nama}: petunjuk menjelaskan jawaban tokoh`);
    }
  }
  cek(nomor === 11, "nomor misi berlanjut sampai sepuluh");
  sama(Object.values(TAHAP).map(([, soal]) => soal[0].langkah[0].langkah.betul === true), [false, true, false], "Cari kesalahan: dua jawaban keliru dan satu jawaban benar (Pictorial)");
  sama(Object.values(TAHAP).map(([, soal]) => soal[0].langkah[0].langkah.dasar.tipe), ["sejajar", "bangun", "lambang"], "Cari kesalahan: tali sejajar (Concrete), persegi panjang (Pictorial), lambang (Abstract)");
  sama(Object.values(TAHAP).map(([, soal]) => soal[0].langkah[0].langkah.tokoh), ["Raka", "Bima", "Salsa"], "Cari kesalahan: Raka, Bima, Salsa");
  sama(Object.values(TAHAP).map(([, soal]) => soal[0].langkah[0].langkah.benar), [1, 2, 1], "Cari kesalahan: posisi alasan benar bervariasi");
  // Posisi tombol alasan benar (rumus yang sama dengan CariSalah): tidak selalu tombol pertama.
  const posisiTombol = Object.values(TAHAP).map(([, soal]) => {
    const x = soal[0].langkah[0].langkah;
    return Array.from(`${x.tokoh}${x.kataTokoh}${x.alasan[x.benar]}`).reduce((t, c) => t + c.charCodeAt(0), 0) % 3;
  });
  cek(posisiTombol.some((p) => p !== 0) && posisiTombol.filter((p) => p === 0).length <= 1, `Cari kesalahan: alasan benar tidak selalu tombol pertama (${posisiTombol.join(",")})`);
}

/* ------------------------------ Tugas dihitung dari data ------------------------------ */
{
  const nama = (k) => (k ? (k.jenis === "nama" ? k.nama : k.jenis === "pilih" ? k.teks : k.n) : null);
  const sj = (dKiri, dKanan, miring, kanvas, suara = "hubungan") => ({ tipe: "sejajar", hrf: ["K", "L", "M", "N"], dKiri, dKanan, miring, benda: "benang", kanvas, suara });
  const tg = (sudut, suara = "hubungan") => ({ tipe: "tegak", sudut, benda: "layang", suara });
  const bg = (bentuk, kanvas) => ({ tipe: "bangun", bentuk, benda: "bendera", kanvas });
  const pl = (bentuk, ciri) => ({ tipe: "pilah", bentuk, ciri, benda: "pita" });
  const lb = (rel) => ({ tipe: "lambang", rel, hrf: ["P", "Q", "R", "S"], benda: "balon" });
  const tiga = (l) => ["klik", "kanvas", "suara"].map((c) => nama(LC.kunciJawab(l, c)));
  // Kunci tiap jenis tugas dihitung dari data.
  sama(tiga(sj(3, 3, 0, "kiri", "jarak")), ["KL // MN", 3, 3], "kunci sejajar: pernyataan sejajar, jarak kiri, jarak lewat suara");
  sama(tiga(sj(3, 3, 0, "kanan")), ["KL // MN", 3, "sejajar"], "kunci sejajar: kata sejajar lewat suara");
  sama([nama(LC.kunciJawab(sj(1, 4, 0, "selisih"), "klik")), nama(LC.kunciJawab(sj(1, 4, 0, "selisih"), "kanvas"))], ["KL dan MN tidak sejajar", 3], "kunci sejajar: tidak sejajar dan selisih jarak");
  sama(tiga(tg([60, 90, 120])), ["titik 2", 1, "tegak lurus"], "kunci tegak: titik, banyak titik, kata tegak lurus");
  sama(tiga(tg([90, 135, 90, 60], "banyak")), ["titik 1", 2, 2], "kunci tegak: banyak titik pas");
  sama(tiga(bg("segitiga", "sisi")), ["segitiga", 3, "segitiga"], "kunci bangun: segitiga tiga sisi");
  sama(tiga(bg("persegiPanjang", "siku")), ["persegi panjang", 4, "persegi panjang"], "kunci bangun: persegi panjang empat sudut siku-siku");
  sama([nama(LC.kunciJawab(bg("lingkaran", "sisi"), "klik")), nama(LC.kunciJawab(bg("lingkaran", "sisi"), "suara"))], ["lingkaran", "lingkaran"], "kunci bangun: lingkaran");
  sama(tiga(pl(["segitiga", "lingkaran", "persegi"], "tanpaSudut")), ["nomor 2", 1, null], "kunci pilah klik: nomor bangun yang cocok, suara tanpa bangun terbanyak tunggal");
  sama([nama(LC.kunciJawab(pl(["persegi", "lingkaran", "persegi", "segitiga", "persegi"], "empatSisi"), "kanvas")), nama(LC.kunciJawab(pl(["persegi", "lingkaran", "persegi", "segitiga", "persegi"], "empatSisi"), "suara"))], [3, "persegi"], "kunci pilah: banyak yang cocok dan bangun terbanyak");
  sama(LC.kunciJawab(pl(["persegi", "persegi", "segitiga", "segitiga"], "tigaSisi"), "suara"), null, "kunci pilah: bangun terbanyak seri tidak punya kunci");
  sama([nama(LC.kunciJawab(lb("tegak"), "klik")), nama(LC.kunciJawab(lb("tegak"), "suara")), nama(LC.kunciJawab(lb("sejajar"), "klik")), nama(LC.kunciJawab(lb("sejajar"), "suara"))], ["PQ ⊥ RS", "tegak lurus", "PQ // RS", "sejajar"], "kunci lambang: tulisan dan kata");
  sama(LC.kunciJawab(lb("tegak"), "kanvas"), { jenis: "angka", n: 0 }, "lambang tidak punya jawaban kanvas yang sah");
  // Data sah dan tolak data yang salah.
  cek(LC.dataSah(sj(3, 3, 0, "kiri"), "kanvas") && !LC.dataSah(sj(2, 4, 0, "kiri"), "kanvas") && !LC.dataSah(sj(3, 3, 0, "selisih"), "kanvas") && LC.dataSah(sj(1, 4, 0, "selisih"), "kanvas") && !LC.dataSah(sj(3, 3, 0, "kiri"), "suara") === false && !LC.dataSah(sj(2, 4, 0, "kiri"), "suara") && LC.dataSah(sj(2, 4, 0, "kiri"), "klik"), "dataSah sejajar: jarak kiri hanya bila sejajar, selisih hanya bila tidak sejajar, suara hanya bila sejajar");
  cek(!LC.dataSah(sj(6, 6, 0, "kiri"), "klik") && !LC.dataSah(sj(5, 5, 2, "kiri"), "klik") && !LC.dataSah(sj(3, 3, 3, "kiri"), "klik") && !LC.dataSah({ ...sj(3, 3, 0, "kiri"), hrf: ["K", "K", "M", "N"] }, "klik"), "dataSah sejajar: jarak paling banyak lima, muat di kertas petak, huruf titik berbeda");
  cek(LC.dataSah(tg([60, 90, 120]), "klik") && !LC.dataSah(tg([90, 90, 60]), "klik") && !LC.dataSah(tg([60, 45, 120]), "klik") && !LC.dataSah(tg([60, 90]), "klik") && LC.dataSah(tg([90, 45, 90, 60]), "kanvas") && !LC.dataSah(tg([60, 45, 120]), "kanvas") && !LC.dataSah(tg([75, 90, 60]), "klik"), "dataSah tegak: klik tepat satu titik siku-siku dari tiga, kanvas satu sampai empat, sudut hanya yang sah");
  cek(LC.dataSah(bg("persegi", "siku"), "kanvas") && !LC.dataSah(bg("segitiga", "siku"), "kanvas") && !LC.dataSah(bg("lingkaran", "sisi"), "kanvas") && LC.dataSah(bg("lingkaran", "sisi"), "klik"), "dataSah bangun: lingkaran tidak punya jawaban kanvas, segitiga tidak punya sudut siku-siku");
  cek(LC.dataSah(pl(["segitiga", "lingkaran", "persegi"], "tigaSisi"), "klik") && !LC.dataSah(pl(["segitiga", "segitiga", "persegi"], "tigaSisi"), "klik") && !LC.dataSah(pl(["persegi", "persegiPanjang", "lingkaran"], "empatSisi"), "klik") && LC.dataSah(pl(["persegi", "lingkaran", "persegi", "persegiPanjang"], "empatSisi"), "kanvas") && !LC.dataSah(pl(["persegi", "lingkaran", "segitiga"], "empatSisi"), "kanvas") && LC.dataSah(pl(["lingkaran", "lingkaran", "segitiga", "persegi"], "tanpaSudut"), "suara") && !LC.dataSah(pl(["persegi", "persegi", "segitiga", "segitiga"], "tanpaSudut"), "suara"), "dataSah pilah: klik tepat satu cocok dari tiga bangun berbeda, kanvas paling sedikit dua cocok dari empat, suara bangun terbanyak tunggal");
  cek(LC.dataSah(lb("tegak"), "klik") && LC.dataSah(lb("tegak"), "suara") && !LC.dataSah(lb("tegak"), "kanvas"), "dataSah lambang: tanpa kanvas");
  // Pengecoh dan pilihan.
  sama(LC.pilihanKlik({ ...sj(3, 3, 0, "kiri") }).includes("KL // MN"), true, "pilihan klik sejajar: memuat kunci");
  sama(LC.pilihanKlik(sj(1, 4, 0, "selisih")).includes("KL // MN") && LC.pilihanKlik(sj(1, 4, 0, "selisih")).includes("KL dan MN tidak sejajar"), true, "pilihan klik tidak sejajar: pengecoh sejajar ikut");
  sama(LC.pilihanKlik(tg([60, 90, 120])), ["titik 1", "titik 2", "titik 3"], "pilihan klik tegak: titik bernomor");
  sama(LC.pilihanKlik(pl(["segitiga", "lingkaran", "persegi"], "tanpaSudut")), ["nomor 1", "nomor 2", "nomor 3"], "pilihan klik pilah: nomor bangun");
  cek(LC.pilihanKlik(bg("persegiPanjang", "sisi")).includes("persegi") && LC.pilihanKlik(bg("persegiPanjang", "sisi")).includes("persegi panjang"), "pilihan klik bangun: pengecoh persegi untuk persegi panjang");
  cek(LC.pilihanKlik(lb("tegak")).includes("PQ // RS") && LC.pilihanKlik(lb("tegak")).includes("PQ = RS") && LC.pilihanKlik(lb("sejajar")).includes("PQ ⊥ RS"), "pilihan klik lambang: pengecoh lambang lain dan tanda sama dengan");
  sama(LC.barisKartu(sj(3, 3, 0, "kiri"), "kanvas"), ["KL dan MN pada kertas petak", "jarak kiri: … petak", "jarak kanan: 3 petak", "KL // MN"], "kartu kata sejajar kanvas: jarak yang ditanyakan tertutup");
  sama(LC.barisKartu(tg([60, 90, 120]), "klik"), ["titik 1: sudut lancip", "titik 2: sudut siku-siku", "titik 3: sudut tumpul", "tegak lurus di titik: …"], "kartu kata tegak: jenis sudut tiap titik");
  sama(LC.barisKartu(bg("lingkaran", "sisi"), "klik"), ["bangun: …", "garis lengkung, tanpa sisi lurus, tanpa sudut"], "kartu kata bangun: ciri lingkaran");
  sama(LC.barisKartu(bg("persegiPanjang", "siku"), "kanvas"), ["bangun: persegi panjang", "sudut siku-siku: …"], "kartu kata bangun kanvas: nama bangun diberikan");

  const kanvasPerTahap = {};
  for (const [namaT, [rupa, soal]] of Object.entries(TAHAP)) {
    const kanvasAngka = [];
    const klikPilihan = [];
    const suaraAngka = [];
    const tipeAda = new Set();
    const posisiBenar = [];
    for (const s of soal)
      for (const ls of s.langkah) {
        const l = ls.langkah;
        const d = LC.dasarDari(l);
        tipeAda.add(d.tipe);
        const kunci = LC.kunciJawab(l, s.cara);
        const tag = `${namaT} ${s.nomor} ${ls.metode}`;
        cek(kunci !== null, `${tag}: kunci ada untuk semua tugas`);
        cek(LC.siapLangsung(l, rupa, s.cara) === (l.tipe !== "salah"), `${tag}: siap langsung kecuali Cari kesalahan (tombol tidak macet)`);
        for (const r of ["benda", "diagram", "lambang"]) cek(LC.siapLangsung(l, r, s.cara) === LC.siapLangsung(l, rupa, s.cara), `${tag}: siap langsung tidak bergantung rupa (${r})`);
        // Huruf titik berbeda dari Story (A, B, C, E, F, G, H).
        if ("hrf" in d) cek(!d.hrf.some((h) => "ABCEFGH".includes(h)), `${tag}: huruf titik berbeda dari Story (${d.hrf.join("")})`);
        if (kunci?.jenis === "angka") {
          if (s.cara === "kanvas") {
            kanvasAngka.push(kunci.n);
            cek(kunci.n >= 1 && kunci.n <= 9, `${tag}: jawaban kanvas satu angka satu sampai sembilan (${kunci.n})`);
          } else suaraAngka.push(kunci.n);
        }
        if (kunci?.jenis === "pilih") {
          klikPilihan.push(kunci.teks);
          cek(s.cara === "klik" && tanpaDigit(kunci.kata) && !/[⊥]|\/\//.test(kunci.kata), `${tag}: kunci pilihan hanya pada klik, ucapannya tanpa digit dan lambang (${kunci.kata})`);
        }
        if (kunci?.jenis === "nama") cek(tanpaDigit(kunci.nama) && s.cara === "suara", `${tag}: kunci nama hanya pada suara`);
        // Pilihan klik: tiga pernyataan unik.
        if (s.cara === "klik" && kunci !== null) {
          const pil = LC.pilihanKlik(l);
          cek(pil.length === 3 && new Set(pil).size === 3 && pil.includes(kunci.teks), `${tag}: pilihan klik unik dan memuat jawaban benar (${pil.join("/")})`);
          posisiBenar.push(pil.indexOf(kunci.teks));
          cek(pil.every((p) => tanpaDigit(LC.ucap(p))), `${tag}: pilihan klik dapat diucapkan tanpa digit`);
        }
        if (s.cara !== "klik" && kunci !== null) {
          const pil = LC.pilihanSuara(l, s.cara);
          cek(pil.includes(LC.teksKunciPilihan(kunci)) && pil.length === 3 && new Set(pil).size === pil.length && tanpaDigit(pil.join(" ")), `${tag}: pilihan ketuk memuat kunci (${pil.join("/")})`);
          cek(pil[0] !== LC.teksKunciPilihan(kunci), `${tag}: kunci bukan pilihan pertama`);
          if (s.cara === "suara") {
            const c = K.cocokUcapan(LC.teksKunciPilihan(kunci), kunci);
            cek(c.cocok, `${tag}: ucapan kunci dikenali (${LC.teksKunciPilihan(kunci)})`);
            for (const lain of pil.filter((p) => p !== LC.teksKunciPilihan(kunci))) cek(!K.cocokUcapan(lain, kunci).cocok, `${tag}: ucapan ${lain} bukan kunci`);
          }
        }
        if (kunci) cek(LC.kalimatKunci(l, s.cara).length > 12, `${tag}: kalimat penjelasan ada`);
        cek(LC.petunjukSalah(l, s.cara, "x").length > 20, `${tag}: petunjuk salah ada`);
        if (rupa === "lambang") {
          const baris = LC.barisKartu(d, s.cara);
          cek(Array.isArray(baris) && baris.length >= 2 && baris.every((b) => typeof b === "string" && b.length > 3), `${tag}: kartu kata ada`);
          cek(baris.every((b) => !adaEmoji(b)), `${tag}: kartu kata tanpa emoji`);
          // Jawaban yang ditanyakan tidak tertulis di kartu kata.
          if (s.cara === "kanvas") cek(!baris.join(" ").includes(`: ${kunci.n}`) || d.tipe === "sejajar", `${tag}: kartu kanvas tidak membocorkan jawaban`);
        }
      }
    kanvasPerTahap[namaT] = kanvasAngka;
    cek(new Set(kanvasAngka).size === kanvasAngka.length && kanvasAngka.length === 4, `${namaT}: empat angka jawaban Tulis di kanvas tidak kembar (${kanvasAngka.join(", ")})`);
    cek(new Set(klikPilihan).size === klikPilihan.length && klikPilihan.length === 4, `${namaT}: empat jawaban pilihan Klik tidak kembar (${klikPilihan.join(", ")})`);
    cek(["sejajar", "tegak", "bangun", "pilah", "lambang"].every((t) => tipeAda.has(t)), `${namaT}: sejajar, tegak, bangun, pilah, dan lambang ada`);
    cek(soal.flatMap((s) => s.langkah.map((l) => LC.kunciJawab(l.langkah, s.cara))).some((k) => k?.jenis === "nama"), `${namaT}: ada jawaban berupa kata`);
    cek(new Set(posisiBenar).size >= 2 && posisiBenar.some((p) => p !== 2), `${namaT}: jawaban benar Klik tidak selalu pilihan terakhir (${posisiBenar.join(",")})`);
  }
  sama(kanvasPerTahap, { Concrete: [3, 5, 2, 4], Pictorial: [4, 1, 3, 2], Abstract: [3, 4, 1, 2] }, "angka kanvas tiap tahap");
  // Posisi jawaban benar pada klik tegak dan pilah berbeda antar tahap.
  const posTegak = Object.values(TAHAP).map(([, soal]) => LC.titikSiku(soal[0].langkah[2].langkah));
  sama(posTegak, [2, 0, 1], "klik tegak: titik siku-siku di tempat berbeda tiap tahap");
  const semuaDasar = Object.values(TAHAP).flatMap(([, soal]) => soal.flatMap((s) => s.langkah.map((l) => LC.dasarDari(l.langkah))));
  cek(["sejajar", "tegak", "bangun", "pilah", "lambang"].every((t) => semuaDasar.some((d) => d.tipe === t)), "semua lima jenis tugas dipakai: sejajar, tegak, bangun, pilah, lambang");
  cek(semuaDasar.some((d) => d.tipe === "sejajar" && !LC.sejajarBenar(d)) && semuaDasar.some((d) => d.tipe === "sejajar" && LC.sejajarBenar(d)) && semuaDasar.some((d) => d.tipe === "lambang" && d.rel === "tegak") && semuaDasar.some((d) => d.tipe === "lambang" && d.rel === "sejajar"), "tali sejajar dan tidak sejajar, lambang tegak lurus dan sejajar sama-sama ada");
  cek(["segitiga", "persegi", "persegiPanjang", "lingkaran"].every((b) => semuaDasar.some((d) => (d.tipe === "bangun" && d.bentuk === b) || (d.tipe === "pilah" && d.bentuk.includes(b)))), "keempat bangun datar dipakai");
  cek(semuaDasar.some((d) => d.tipe === "sejajar" && d.miring > 0) && semuaDasar.some((d) => d.tipe === "sejajar" && d.miring === 0), "tali sejajar miring dan datar sama-sama ada");
  // Gambar tiap tugas Concrete dan Pictorial sungguh sesuai data.
  for (const d of semuaDasar) {
    if (d.tipe === "sejajar") {
      const t = G.duaTali(d.dKiri, d.dKanan, d.miring);
      hampir(G.jarakPetak(t, G.PETAK.x0), d.dKiri, "gambar tali: jarak kiri sesuai data");
      hampir(G.jarakPetak(t, G.ujungKanan), d.dKanan, "gambar tali: jarak kanan sesuai data");
      cek((G.kemiringan(t.atas) === G.kemiringan(t.bawah)) === LC.sejajarBenar(d), "gambar tali: sejajar hanya bila jarak sama");
    }
    if (d.tipe === "tegak") for (const s of d.sudut) { const { B, A, C } = G.titikTemu(150, 98, s, 40); hampir(G.sudutDi(B, A, C), s, "gambar titik temu: sudut sesuai data", 0.5); }
    if (d.tipe === "bangun") cek(d.bentuk === "lingkaran" || G.banyakSikuPoligon(G.titikBangun(d.bentuk, 150, 100, 92)) === LC.SIKU[d.bentuk], `gambar bangun ${d.bentuk}: banyak sudut siku-siku sesuai data`);
  }
  // Poin penting dan penutup.
  cek(D.POIN_PENTING.length >= 6 && D.POIN_PENTING.every((p) => p.length > 20 && bersih(p)) && D.POIN_PENTING_SUARA.every((p) => tanpaDigit(p) && !/[⊥∠°=<>]|\/\//.test(p)), "poin penting: banyak, bersih, suara tanpa digit dan lambang");
  const poin = D.POIN_PENTING.join(" ").toLowerCase();
  for (const m of ["sudut siku-siku", "garis tegak lurus", "pojok kertas lipat", "garis sejajar", "kertas petak", "3 sisi dan 3 sudut", "4 sisi dan 4 sudut siku-siku", "sisinya sama panjang", "lingkaran", "garis lengkung", "pilah bangun"]) cek(poin.includes(m), `poin penting memuat ${m}`);
  cek(D.POIN_PENTING_SUARA.join(" ").includes("tegak lurus") && D.POIN_PENTING_SUARA.join(" ").includes("sejajar") && D.POIN_PENTING_SUARA.join(" ").includes("tiga sisi dan tiga sudut") && D.POIN_PENTING_SUARA.join(" ").includes("A B tegak lurus B C"), "poin penting: suara mengeja lambang dan bilangan");
  cek(tanpaDigit(D.PENUTUP_C) && bersih(D.PENUTUP_C) && /Festival Layang-layang Kampung/.test(D.PENUTUP_C) && ["Raka", "Salsa", "Bima", "Pak Joko", "Bu Ratih", "Kak Anton", "Pak Samsul"].every((n) => D.PENUTUP_C.includes(n)), "penutup C: akhir cerita bab tanpa digit, semua tokoh disebut");
  cek(Object.values(D.TEMA_LINTASAN).every((t) => emojiSah(t.ikon) && t.nama.length >= 7 && t.cara.length > 20 && tanpaDigit(t.cara) && bersih(t.cara)), "tema tiga tahap sah");
  cek(D.TEMA_LINTASAN.pictorial.cara.includes("polos") && D.TEMA_LINTASAN.abstract.cara.includes("kartu") && D.TEMA_LINTASAN.concrete.cara.includes("patok oranye"), "tema: Concrete patok oranye, Pictorial polos, Abstract kartu");
  cek(D.CONCRETE_LINTASAN === D.CONCRETE && D.PICTORIAL_LINTASAN === D.PICTORIAL && D.ABSTRACT_LINTASAN === D.ABSTRACT && D.MISI_LINTASAN_TEKS === DS.MISI_LINTASAN_TEKS, "nama ekspor untuk pemasang");
}

/* ------------------------------ Berkas ------------------------------ */
{
  const berkas = readdirSync(folderUrl).filter((f) => /\.(ts|tsx)$/.test(f));
  for (const nama of ["logika.ts", "geometri.ts", "data-sim.ts", "data-kartu.ts", "logika-cpa.ts", "data.ts", "periksa.ts", "GambarLintasan.tsx", "JawabLintasan.tsx", "LangkahLintasan.tsx", "TahapLintasan.tsx", "SimulasiLintasanLomba.tsx", "PetaLintasan.tsx", "PapanLomba.tsx"]) cek(berkas.includes(nama), `berkas ${nama} ada`);
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folderUrl), "utf8");
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d || c.codePointAt(0) === 0x1f6de), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}/i.test(s), `${f}: kode emoji tidak melewati U+1FA95`);
    cek(!/buku|kelompok|bernilai|tebak/i.test(s), `${f}: tanpa kata buku, kelompok, bernilai, tebak`);
    if (/^(logika|logika-cpa|periksa|data|data-sim|data-kartu|geometri)\.ts$/.test(f)) cek(!/from "react"|fetch\(/.test(s), `${f}: tanpa React dan jaringan`);
    cek(!/tempat-k3b1a|kayu-k3b2a|botol-k3b2b|turus-k2b8a|gambar-k2b8b|kartu-k3b1b|urut-k3b1c|tambah-k3b1d|kurang-k3b1e|kali-k3b1f|bagi-k3b1g|ukur-k3b3a|pita-k3b3b|timbang-k3b3c|bandul-k3b3d|bilah-k3b4a|sudut-k3b4b|SubBabK3B4|kit-k3b4|diagram-k3b4/.test(s), `${f}: tidak memakai folder bab atau sub-bab lain`);
  }
  // Teks layar tidak memuat kata terlarang.
  const layar = ["LangkahLintasan.tsx", "TahapLintasan.tsx", "SimulasiLintasanLomba.tsx", "GambarLintasan.tsx"].map((f) => readFileSync(new URL(f, folderUrl), "utf8")).join("\n");
  const teksLayar = [...layar.matchAll(/>\s*([^<>{}\n]{4,})\s*</g)].map((m) => m[1]).join(" ");
  cek(!/\b(skor|nilai|soal|tebak|kunci|latihan|teman|kelompok|buku)\b/i.test(teksLayar), "teks layar komponen tanpa kata terlarang");
  cek(!/\bcapitalize\b/.test(layar) && !/className="[^"]*capitalize/.test(readFileSync(new URL("JawabLintasan.tsx", folderUrl), "utf8")), "tanpa kelas capitalize (satuan dan huruf titik tidak berubah)");
  cek(/\bTugas\b/.test(layar) && !/>\s*Soal/.test(layar), "teks layar CPA memakai Tugas");
  // Tahap: props sama dengan TahapBandul dan pola visual baru.
  const th = readFileSync(new URL("TahapLintasan.tsx", folderUrl), "utf8");
  cek(/umum: Umum;\s*rupa: Rupa;\s*soal: SoalMisi\[\];\s*pita:/.test(th) && /teksAkhir: string/.test(th) && /poinPenting\?: boolean/.test(th), "TahapLintasan: props umum, rupa, soal, pita, teksAkhir, poinPenting");
  cek(/IKON_METODE\[ls\.metode\]/.test(th) && /rupa === "benda" \?/.test(th), "TahapLintasan: ikon metode hanya pada rupa benda (Pictorial dan Abstract tanpa emoji metode)");
  cek(/export default function TahapLintasan/.test(th) && /Cari kesalahan/.test(th) && /POIN_PENTING/.test(th) && /PENUTUP_C/.test(th), "TahapLintasan: ekspor, Cari kesalahan, Poin Penting, penutup");
  cek(/"lintasan"/.test(th) && /"petak"/.test(th) && /"panitia"/.test(th) && !/"meja"|"biru"|"rekam"|"pos"|"milimeter"|"catatan"|"rak"|"kapur"|"nota"|"tirai"/.test(th), "TahapLintasan: pola visual lintasan lomba, kertas petak hijau muda, lembar panitia (berbeda dari bab sebelumnya)");
  cek(/FESTIVAL LAYANG-LAYANG MERIAH/.test(th) && /\\u\{1F388\}/.test(th) && /konfeti/.test(th) && /perayaan-akhir-bab/.test(th), "TahapLintasan: perayaan akhir bab (spanduk, balon, konfeti)");
  cek(/prefers-reduced-motion/.test(th), "TahapLintasan: perayaan menghormati gerak berkurang");
  cek(/konfeti-jatuh-c/.test(th) && !/konfeti-jatuh-d/.test(th), "TahapLintasan: nama animasi khusus sub-bab ini");
  const lg = readFileSync(new URL("LangkahLintasan.tsx", folderUrl), "utf8");
  cek(/export function LangkahLintasan/.test(lg) && /JawabSuaraLintasan/.test(lg) && /JawabTulis/.test(lg) && /pilihanSuara\(l, cara\)/.test(lg) && /pilihanKlik\(l\)/.test(lg), "LangkahLintasan: ekspor, jawab suara dengan pilihan ketuk, jawab tulis di kanvas, pilihan klik");
  cek(/GambarSejajar/.test(lg) && /GambarTegak/.test(lg) && /GambarBangun/.test(lg) && /GambarPilah/.test(lg) && /GambarLambang/.test(lg) && /KartuKata/.test(lg), "LangkahLintasan: gambar tiap jenis tugas dan kartu kata");
  const jw = readFileSync(new URL("JawabLintasan.tsx", folderUrl), "utf8");
  cek(/gagalSekali/.test(jw) && /Ini jawaban yang benar|jawaban yang benar/.test(jw) && /PilihanKata/.test(jw) && /setCadangan\(true\)/.test(jw) && /e\.error === "not-allowed"/.test(jw), "JawabLintasan: galat mikrofon dihitung gagal, pilihan ketuk sebagai cadangan, jawaban benar setelah tiga kali salah");
  const sim = readFileSync(new URL("SimulasiLintasanLomba.tsx", folderUrl), "utf8");
  cek(/export default function SimulasiLintasanLomba/.test(sim) && /onKeadaan/.test(sim) && /MISI_LINTASAN_TEKS/.test(sim), "SimulasiLintasanLomba: ekspor, onKeadaan, teks misi");
  cek(/petunjukTegak\(k\)/.test(sim) && /petunjukSejajar\(k\)/.test(sim) && /petunjukTanda\(k\)/.test(sim) && /petunjukBangun\(k\)/.test(sim), "SimulasiLintasanLomba: Periksa memakai petunjuk yang menunjuk langkah yang belum dilakukan");
  for (const [f, nm] of [["PetaLintasan.tsx", "PetaLintasanK3B4"], ["PapanLomba.tsx", "PapanLombaK3B4"]]) {
    const s = readFileSync(new URL(f, folderUrl), "utf8");
    cek(/speakGuru/.test(s) && /onLanjut/.test(s) && /teksLanjut/.test(s) && /peta-kartu\//.test(s) && new RegExp(`export default function ${nm}`).test(s) && new RegExp(`export \\{ ${nm} \\}`).test(s), `${f}: pembungkus tipis komponen bersama peta-kartu, ekspor ${nm}`);
  }
  // Berkas bersama: Simulasi memasang Lintasan Lomba.
  const sk = readFileSync(new URL("../src/components/modul/SimulasiK3Bab4.tsx", import.meta.url), "utf8");
  cek(/SimulasiLintasanLomba/.test(sk) && /laporMisiLintasan\(daftarMisiK3Bab4\("C"\), k, a\.capai\)/.test(sk) && !/Kelas 3 Bab 4 ·/.test(sk), "SimulasiK3Bab4: langkahLintasanLombaC memasang Lintasan Lomba, judul tanpa kata Kelas");
  // Berkas lama yang dipertahankan ada (dipakai bab lain dan bank soal).
  for (const f of ["data-k3b4.ts", "naskah-k3b4.ts", "eja-k3b4.ts", "dasar-k3b4b.tsx", "dasar-k3b4c.tsx"]) cek(readdirSync(new URL("../src/components/modul/", import.meta.url)).includes(f), `berkas lama ${f} dipertahankan`);
  const ej = readFileSync(new URL("../src/lib/ejaan-inggris-id.ts", import.meta.url), "utf8");
  cek(/grid paper check/i.test(ej) && /fold and match/i.test(ej) && /shape sort/i.test(ej), "ejaan: tiga nama metode global ada");
}

console.log(`Lulus ${lulus}, gagal ${gagal}`);
process.exit(gagal ? 1 : 0);
