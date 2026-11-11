// Uji logika murni dan misi Matematika Kelas 2 Bab 7 (Ayo Membilang sampai dengan 100): Lab Seratus, Tabel Seratus,
// Mesin Tebak Banyak, Lab Garis Seratus, Lab Banding dan Urut, serta misi per sub-bab. Skenario diuji di uji-skenario-umum.mjs.
// Jalankan: node --no-warnings scripts/uji-lab-k2b7.mjs
import * as M0 from "../src/components/modul/misi-simulasi.ts";
import * as K7 from "../src/components/modul/misi-k2bab7.ts";
import * as LS from "../src/components/modul/lab-seratus-k2b7.ts";
import * as LT from "../src/components/modul/lab-tabel-k2b7.ts";
import * as MT from "../src/components/modul/mesin-tebak-banyak-k2b7.ts";
import * as LG from "../src/components/modul/lab-garis-k2b7.ts";
import * as LB from "../src/components/modul/lab-banding-k2b7.ts";

let gagal = 0;
let lulus = 0;
const cek = (kondisi, pesan) => {
  if (kondisi) lulus += 1;
  else {
    gagal += 1;
    console.log("GAGAL:", pesan);
  }
};
const sama = (a, b, pesan) => cek(JSON.stringify(a) === JSON.stringify(b), `${pesan}: ${JSON.stringify(a)} != ${JSON.stringify(b)}`);
const kosong = new Set();
const SEL = (id) => ({ alat: "selesai", id });
const ada = (sub, k, id) => M0.misiBaru(K7.daftarMisiK2Bab7(sub), k, kosong).includes(id);
const semuaMisi = (sub, keadaan) => {
  const s = new Set();
  for (const k of keadaan) for (const id of M0.misiBaru(K7.daftarMisiK2Bab7(sub), k, kosong)) s.add(id);
  return s;
};
const ulang = (f, x, n) => {
  let y = x;
  for (let i = 0; i < n; i += 1) y = f(y);
  return y;
};
// Pembangkit acak deterministik.
let benih = 7;
const acak = (n) => {
  benih = (benih * 1103515245 + 12345) & 0x7fffffff;
  return benih % n;
};

/* ------------------------------ Struktur misi ------------------------------ */
for (const sub of ["A", "B"]) {
  const d = K7.daftarMisiK2Bab7(sub);
  cek(new Set(d.map((m) => m.id)).size === d.length, `k2bab7 ${sub}: id misi unik`);
  cek(d.filter((m) => m.wajib).length >= 3, `k2bab7 ${sub}: minimal tiga misi wajib`);
  cek(d.some((m) => !m.wajib), `k2bab7 ${sub}: ada tantangan bebas`);
  cek(d.every((m) => m.teks.length > 15), `k2bab7 ${sub}: teks misi cukup jelas`);
}
sama([K7.MISI_A.filter((m) => m.wajib).length, K7.MISI_B.filter((m) => m.wajib).length], [6, 7], "jumlah misi wajib A dan B");
cek(K7.MISI_B.some((m) => m.wajib && m.id === "b-skenario"), "sub-bab akhir: skenario pencapaian misi bab ada di misi wajib");

/* ------------------------------ Lab Seratus ------------------------------ */
{
  const namaDipakai = new Set();
  for (let n = 0; n <= 100; n += 1) namaDipakai.add(LS.namaBilangan(n));
  sama(namaDipakai.size, 101, "setiap bilangan 0 sampai 100 punya nama berbeda");
  sama([0, 1, 10, 11, 12, 19, 20, 21, 53, 90, 99, 100].map(LS.namaBilangan), ["nol", "satu", "sepuluh", "sebelas", "dua belas", "sembilan belas", "dua puluh", "dua puluh satu", "lima puluh tiga", "sembilan puluh", "sembilan puluh sembilan", "seratus"], "contoh nama bilangan");

  const a0 = LS.awalSeratus();
  sama([a0.p, a0.s, LS.nilaiSeratus(a0), a0.pernah.length, a0.ikat, a0.buka], [0, 0, 0, 0, 0, 0], "awal seratus kosong");
  cek(M0.misiBaru(K7.MISI_A, LS.laporanSeratus(a0), kosong).length === 0, "awal Lab Seratus tidak memenuhi misi apa pun");

  // Mengatur langsung: semua bilangan 0..100.
  for (let n = 0; n <= 100; n += 1) {
    const l = LS.aturBilangan(LS.awalSeratus(), n);
    sama([LS.nilaiSeratus(l), l.p, l.s, LS.terikatSeratus(l)], [n, Math.floor(n / 10), n % 10, true], `atur ${n}`);
    const pa = LS.papanSeratus(l);
    const ps = LS.pasanganSeratus(l);
    cek(pa !== null && pa.puluhan === l.p && pa.satuan === l.s, `papan jujur ${n}`);
    cek(ps !== null && ps.total === n && ps.a + ps.b === n, `pasangan jumlahnya ${n}`);
    const k = LS.kalimatSeratus({ ...l, nama: true, pasangan: true });
    if (n > 0) cek(k.includes(String(n)) && k.includes(LS.namaBilangan(n)), `kalimat memuat ${n} dan namanya: ${k}`);
  }
  cek(LS.kalimatSeratus(LS.aturBilangan(LS.awalSeratus(), 100)).includes("Sepuluh puluhan sama dengan seratus"), "kalimat seratus menyebut sepuluh puluhan");
  cek(LS.kalimatSeratus(LS.awalSeratus()).startsWith("Belum ada benda"), "kalimat awal belum ada benda");

  // Pembatas.
  const penuh = ulang(LS.tambahPuluh, LS.awalSeratus(), 10);
  sama([penuh.p, penuh.s, LS.nilaiSeratus(penuh)], [10, 0, 100], "sepuluh puluhan sama dengan seratus");
  const lewat = LS.tambahPuluh(penuh);
  sama([lewat.p, lewat.catatan.length > 0], [10, true], "tidak melewati seratus");
  cek(LS.tambahSatu(penuh).s === 0 && LS.tambahSatu(penuh).catatan.length > 0, "tidak menambah satuan di seratus");
  const lepas = ulang(LS.tambahSatu, LS.awalSeratus(), 40);
  sama([lepas.s, lepas.catatan.length > 0], [LS.MAKS_LEPAS, true], "satuan lepas dibatasi 19");
  cek(LS.kurangSatu(LS.awalSeratus()).catatan.length > 0 && LS.kurangPuluh(LS.awalSeratus()).catatan.length > 0, "kurang di nol diberi tahu");
  cek(LS.ikatSepuluh(ulang(LS.tambahSatu, LS.awalSeratus(), 9)).ikat === 0, "ikat butuh sepuluh satuan lepas");
  cek(LS.bukaPuluhan(LS.awalSeratus()).buka === 0, "buka butuh puluhan");
  cek(LS.bukaPuluhan(LS.aturBilangan(LS.awalSeratus(), 15)).buka === 1 && LS.bukaPuluhan(ulang(LS.tambahSatu, LS.tambahPuluh(LS.awalSeratus()), 15)).buka === 0, "buka ditolak bila satuan lepas jadi lebih dari 19");

  // Ikat dan buka tidak mengubah banyaknya; papan dan pasangan ditahan saat belum terikat.
  for (let s = 10; s <= 19; s += 1) {
    for (let p = 0; p <= 8; p += 1) {
      let l = LS.awalSeratus();
      l = ulang(LS.tambahPuluh, l, p);
      l = ulang(LS.tambahSatu, l, s);
      const n = LS.nilaiSeratus(l);
      cek(LS.papanSeratus(l) === null && LS.pasanganSeratus(l) === null && !LS.terikatSeratus(l), `belum terikat ${p},${s}: papan dan pasangan ditahan`);
      const i = LS.ikatSepuluh(l);
      sama([LS.nilaiSeratus(i), i.p, i.s, i.ikat], [n, p + 1, s - 10, 1], `ikat ${p},${s} menjaga banyaknya`);
      cek(i.catatan.includes(`Banyaknya tetap ${n}`), `catatan ikat menyebut banyaknya tetap ${n}`);
      const b = LS.bukaPuluhan(i);
      if (s - 10 + 10 <= LS.MAKS_LEPAS) sama([LS.nilaiSeratus(b), b.buka], [n, 1], `buka ${p},${s} menjaga banyaknya`);
    }
  }

  // Jalan acak: invarian selalu terjaga dan ikat serta buka tidak mengubah banyak.
  {
    let l = LS.awalSeratus();
    let baik = true;
    for (let i = 0; i < 4000; i += 1) {
      const sebelum = LS.nilaiSeratus(l);
      const a = acak(7);
      const f = [LS.tambahSatu, LS.kurangSatu, LS.tambahPuluh, LS.kurangPuluh, LS.ikatSepuluh, LS.bukaPuluhan, (x) => LS.aturBilangan(x, acak(101))][a];
      l = f(l);
      const n = LS.nilaiSeratus(l);
      if (n < 0 || n > 100 || l.s < 0 || l.s > LS.MAKS_LEPAS || l.p < 0 || l.p > 10) baik = false;
      if ((a === 4 || a === 5) && n !== sebelum) baik = false;
      if (!l.pernah.every((x) => x >= 1 && x <= 100)) baik = false;
    }
    cek(baik, "jalan acak Lab Seratus menjaga batas dan banyak saat ikat atau buka");
  }

  // Misi wajib dan bebas A di Lab Seratus lewat aksi nyata.
  {
    const m = (l) => M0.misiBaru(K7.MISI_A, LS.laporanSeratus(l), kosong);
    cek(m(penuh).includes("a-seratus"), "a-seratus dari sepuluh puluhan");
    const sembilanSepuluh = ulang(LS.tambahSatu, ulang(LS.tambahPuluh, LS.awalSeratus(), 9), 10);
    cek(!m(sembilanSepuluh).includes("a-seratus"), "9 puluhan dan 10 satuan lepas belum a-seratus (belum diikat)");
    cek(m(LS.ikatSepuluh(sembilanSepuluh)).includes("a-seratus") && m(LS.ikatSepuluh(sembilanSepuluh)).includes("a-ikat"), "mengikat sepuluh lepas menjadi seratus memenuhi a-seratus dan a-ikat");
    cek(!m(ulang(LS.tambahSatu, LS.awalSeratus(), 10)).includes("a-ikat"), "sepuluh lepas belum a-ikat");
    cek(m(LS.ikatSepuluh(ulang(LS.tambahSatu, LS.awalSeratus(), 10))).includes("a-ikat"), "ikat sepuluh lepas memenuhi a-ikat");
    const lt = (n, papan) => LS.nyalakanSeratus(LS.aturBilangan(LS.awalSeratus(), n), "papan", papan);
    cek(m(lt(53, true)).includes("a-lima-tiga") && !m(lt(53, false)).includes("a-lima-tiga") && !m(lt(35, true)).includes("a-lima-tiga"), "a-lima-tiga butuh papan nyala dan 53");
    const belumTerikat = LS.nyalakanSeratus(ulang(LS.tambahSatu, ulang(LS.tambahPuluh, LS.awalSeratus(), 4), 13), "papan", true);
    cek(!m(belumTerikat).includes("a-lima-tiga"), "5 puluhan dan 3 satuan via 4 puluhan dan 13 lepas belum a-lima-tiga sebelum diikat");
    cek(m(LS.ikatSepuluh(belumTerikat)).includes("a-lima-tiga"), "setelah diikat menjadi 5 puluhan 3 satuan, a-lima-tiga tercapai");
    let t = LS.aturBilangan(LS.awalSeratus(), 62);
    cek(!m(t).includes("a-tertukar"), "62 saja belum a-tertukar");
    t = LS.aturBilangan(t, 26);
    cek(m(t).includes("a-tertukar"), "62 lalu 26 memenuhi a-tertukar");
    cek(!m(LS.aturBilangan(LS.aturBilangan(LS.awalSeratus(), 62), 63)).includes("a-tertukar"), "62 lalu 63 bukan a-tertukar");
    const tukarLepas = LS.aturBilangan(LS.aturBilangan(LS.awalSeratus(), 62), 25);
    cek(!m(tukarLepas).includes("a-tertukar"), "62 lalu 25 bukan a-tertukar");
    cek(m(LS.nyalakanSeratus(LS.aturBilangan(LS.awalSeratus(), 67), "pasangan", true)).includes("a-pasangan") && !m(LS.aturBilangan(LS.awalSeratus(), 67)).includes("a-pasangan"), "a-pasangan butuh pasangan nyala dan 67");
    cek(m(LS.nyalakanSeratus(LS.aturBilangan(LS.awalSeratus(), 90), "nama", true)).includes("a-nama") && !m(LS.nyalakanSeratus(LS.aturBilangan(LS.awalSeratus(), 80), "nama", true)).includes("a-nama"), "a-nama butuh nama nyala dan 90");
    cek(m(LS.bukaPuluhan(LS.tambahPuluh(LS.awalSeratus()))).includes("a-buka") && !m(LS.tambahPuluh(LS.awalSeratus())).includes("a-buka"), "a-buka butuh membuka puluhan");
    // Perwakilan tidak mengubah banyaknya.
    for (const k of ["batang", "benda", "papan", "pasangan", "nama"]) {
      const x = LS.aturBilangan(LS.awalSeratus(), 74);
      sama(LS.nilaiSeratus(LS.nyalakanSeratus(x, k, true)), 74, `menyalakan ${k} tidak mengubah banyak`);
    }
    const jenis = LS.URUT_BENDA_SERATUS.map((j) => LS.nilaiSeratus(LS.pilihBendaSeratus(LS.aturBilangan(LS.awalSeratus(), 74), j)));
    sama(jenis, [74, 74, 74], "mengganti benda tidak mengubah banyak");
    sama(LS.resetSeratus(), LS.awalSeratus(), "reset seratus kembali ke awal");
    cek(LS.URUT_BENDA_SERATUS.every((j) => LS.INFO_BENDA_SERATUS[j].nama.length > 2 && LS.INFO_BENDA_SERATUS[j].wadah.length > 2), "benda seratus punya nama dan wadah");
  }
}

/* ------------------------------ Tabel Seratus ------------------------------ */
{
  sama(LT.awalTabel().n, 23, "awal tabel di 23");
  cek(M0.misiBaru(K7.MISI_A, LT.laporanTabel(LT.awalTabel()), kosong).length === 0, "awal Tabel Seratus tidak memenuhi misi apa pun");
  const nama = new Set();
  for (let n = 1; n <= 100; n += 1) nama.add(LT.namaTabel(n));
  sama(nama.size, 100, "nama tabel unik 1 sampai 100");
  // Batas dan tetangga untuk semua kotak.
  for (let n = 1; n <= 100; n += 1) {
    const kol = ((n - 1) % 10) + 1;
    const bar = Math.floor((n - 1) / 10) + 1;
    sama([LT.kolomTabel(n), LT.barisTabel(n)], [kol, bar], `kolom dan baris ${n}`);
    sama(LT.tetanggaDi(n, "bawah"), n + 10 <= 100 ? n + 10 : null, `bawah ${n}`);
    sama(LT.tetanggaDi(n, "atas"), n - 10 >= 1 ? n - 10 : null, `atas ${n}`);
    sama(LT.tetanggaDi(n, "kanan"), kol < 10 ? n + 1 : null, `kanan ${n}`);
    sama(LT.tetanggaDi(n, "kiri"), kol > 1 ? n - 1 : null, `kiri ${n}`);
    for (const a of LT.URUT_ARAH_TABEL) {
      const l = LT.ketukKotakTabel(LT.awalTabel(), n);
      const b = LT.gerakTabel(l, a);
      const ke = LT.tetanggaDi(n, a);
      sama(b.n, ke === null ? n : ke, `gerak ${a} dari ${n}`);
      cek(ke !== null || b.catatan.length > 8, `batas ${a} dari ${n} diberi penjelasan`);
      if (ke !== null && (a === "atas" || a === "bawah")) cek(LT.kolomTabel(ke) === LT.kolomTabel(n), `naik turun tetap sekolom ${n}`);
      if (ke !== null && (a === "kiri" || a === "kanan")) cek(LT.barisTabel(ke) === LT.barisTabel(n), `geser kiri kanan tetap sebaris ${n}`);
    }
    // Sekolom: berselisih sepuluh dan satuan sama.
    const sek = LT.bilanganSekolom(n);
    sama(sek.length, 10, `sepuluh bilangan sekolom ${n}`);
    cek(sek.every((x, i) => i === 0 || x - sek[i - 1] === 10) && sek.every((x) => x % 10 === n % 10), `sekolom berselisih sepuluh dan satuan sama ${n}`);
  }
  cek(LT.gerakTabel(LT.ketukKotakTabel(LT.awalTabel(), 10), "kanan").catatan.includes("11"), "ujung baris 10 menjelaskan bilangan berikutnya 11 ada di baris bawah");
  cek(LT.gerakTabel(LT.ketukKotakTabel(LT.awalTabel(), 11), "kiri").catatan.includes("10"), "awal baris 11 menjelaskan bilangan sebelumnya 10");
  cek(LT.gerakTabel(LT.ketukKotakTabel(LT.awalTabel(), 100), "kanan").catatan.includes("terakhir"), "seratus bilangan terakhir");
  cek(LT.gerakTabel(LT.ketukKotakTabel(LT.awalTabel(), 1), "kiri").catatan.includes("pertama"), "satu bilangan pertama");
  // Larian turun.
  {
    let l = LT.ketukKotakTabel(LT.awalTabel(), 3);
    l = ulang((x) => LT.gerakTabel(x, "bawah"), l, 4);
    sama([l.n, l.lariBawah, l.terbaikBawah], [43, 4, 4], "empat kali turun dari 3");
    l = LT.gerakTabel(l, "kanan");
    sama([l.lariBawah, l.terbaikBawah], [0, 4], "geser kanan memutus larian tetapi menyimpan terbaik");
    l = LT.ketukKotakTabel(l, 5);
    sama([l.lintasan, l.lariBawah, l.terbaikBawah], [[5], 0, 4], "ketuk kotak memulai lintasan baru tanpa mencabut terbaik");
    cek(LT.gerakTabel(LT.ketukKotakTabel(LT.awalTabel(), 95), "bawah").lariBawah === 0, "gagal turun di baris bawah tidak menambah larian");
    const naik = ulang((x) => LT.gerakTabel(x, "atas"), LT.ketukKotakTabel(LT.awalTabel(), 98), 9);
    sama([naik.n, naik.terbaikAtas], [8, 9], "sembilan kali naik dari 98");
    cek(LT.ketukKotakTabel(LT.awalTabel(), 0).n === 23 && LT.ketukKotakTabel(LT.awalTabel(), 101).n === 23 && LT.ketukKotakTabel(LT.awalTabel(), 5.5).n === 23, "ketuk kotak luar tabel diabaikan");
  }
  // Kalimat jujur.
  for (let n = 1; n <= 100; n += 1) {
    const l = LT.nyalakanTabel(LT.nyalakanTabel(LT.ketukKotakTabel(LT.awalTabel(), n), "tetangga", true), "kolom", true);
    const k = LT.kalimatTabel(l);
    cek(k.includes(`Kotak ${n}:`) && k.includes("berselisih sepuluh"), `kalimat tabel ${n}`);
    const x = LT.tetanggaTabel(l);
    for (const a of LT.URUT_ARAH_TABEL) if (x[a] !== null) cek(k.includes(String(x[a])), `kalimat memuat tetangga ${a} ${n}`);
    cek(!LT.kalimatTabel(LT.ketukKotakTabel(LT.awalTabel(), n)).includes("sekolom"), `kolom mati tidak ada kalimat ${n}`);
  }
  // Misi.
  {
    const m = (l) => M0.misiBaru(K7.MISI_A, LT.laporanTabel(l), kosong);
    const awal = LT.awalTabel();
    const empat = ulang((x) => LT.gerakTabel(x, "bawah"), awal, 4);
    cek(m(empat).includes("a-lompat") && !m(ulang((x) => LT.gerakTabel(x, "bawah"), awal, 3)).includes("a-lompat"), "a-lompat butuh empat turun berturut-turut");
    const putus = LT.gerakTabel(ulang((x) => LT.gerakTabel(x, "bawah"), awal, 2), "kanan");
    cek(!m(ulang((x) => LT.gerakTabel(x, "bawah"), putus, 2)).includes("a-lompat"), "dua turun, geser, dua turun belum a-lompat");
    cek(!m(ulang((x) => LT.gerakTabel(x, "atas"), awal, 2)).includes("a-lompat"), "naik bukan a-lompat");
    cek(m(LT.nyalakanTabel(LT.ketukKotakTabel(awal, 55), "tetangga", true)).includes("a-tetangga") && !m(LT.ketukKotakTabel(awal, 55)).includes("a-tetangga") && !m(LT.nyalakanTabel(LT.ketukKotakTabel(awal, 56), "tetangga", true)).includes("a-tetangga"), "a-tetangga butuh tetangga nyala di 55");
    cek(m(LT.nyalakanTabel(LT.ketukKotakTabel(awal, 47), "kolom", true)).includes("a-kolom") && !m(LT.ketukKotakTabel(awal, 47)).includes("a-kolom"), "a-kolom butuh kolom nyala di 47");
    // 55 dan 47 bisa dicapai lewat geser, tidak hanya ketuk.
    let g = LT.awalTabel();
    g = ulang((x) => LT.gerakTabel(x, "bawah"), g, 3);
    g = ulang((x) => LT.gerakTabel(x, "kanan"), g, 2);
    sama(g.n, 55, "23 turun tiga lalu kanan dua adalah 55");
    sama(LT.resetTabel(), LT.awalTabel(), "reset tabel kembali ke awal");
  }
}

/* ------------------------------ Mesin Tebak Banyak ------------------------------ */
{
  sama(MT.KASUS_BANYAK.length, 5, "lima kumpulan");
  const awal = MT.awalMesinBanyak();
  sama([awal.keadaan, awal.misi, awal.selesai, awal.lepas], ["tebak", 0, false, 62], "awal mesin tebak banyak");
  cek(M0.misiBaru(K7.MISI_A, SEL("lain"), kosong).length === 0, "keadaan selesai lain tidak memenuhi misi A");
  for (const d of MT.KASUS_BANYAK) {
    sama(new Set(d.opsi).size, 3, `${d.id}: tiga tebakan berbeda`);
    const sel = d.opsi.map((o) => Math.abs(o - d.n)).sort((a, b) => a - b);
    cek(sel[0] < sel[1], `${d.id}: tebakan terdekat tunggal`);
    cek(d.opsi.includes(MT.terdekatBanyak(d)), `${d.id}: terdekat ada di pilihan`);
    cek(d.n >= 10 && d.n <= 100 && d.opsi.every((o) => o >= 10 && o <= 100), `${d.id}: bilangan dalam batas seratus`);
    for (let misi = 0; misi < 3; misi += 1) {
      const o = MT.opsiTebakBanyak(d, misi);
      sama([o.length, new Set(o).size, [...o].sort().join()], [3, 3, [...d.opsi].sort().join()], `${d.id}: opsi tebak berputar ${misi}`);
      const h = MT.opsiHitungBanyak(d, misi);
      cek(h.length === 3 && new Set(h).size === 3 && h.includes(d.n), `${d.id}: opsi hitung memuat benar dan berbeda (${h.join(",")})`);
      cek(h.every((x) => x >= 1 && x <= 100), `${d.id}: opsi hitung dalam batas`);
    }
  }
  // Letak jawaban benar bervariasi pada opsi hitung dan tebak.
  {
    const letakH = MT.KASUS_BANYAK.map((d, i) => MT.opsiHitungBanyak(d, i).indexOf(d.n));
    cek(new Set(letakH).size >= 2, `letak hitung bervariasi (${letakH.join("")})`);
  }
  // Urutan wajib: tiap peristiwa di keadaan yang salah ditolak tanpa mengubah keadaan.
  {
    const d = MT.kasusBanyak(awal);
    for (const p of [{ t: "IKAT" }, { t: "SIAP" }, { t: "JAWAB", nilai: d.n }, { t: "LANJUT" }]) {
      const x = MT.langkahMesinBanyak(awal, p);
      sama([x.keadaan, x.ditolak, x.pesan.length > 8], ["tebak", 1, true], `di Tebak, ${p.t} ditolak`);
    }
    sama(MT.langkahMesinBanyak(awal, { t: "TEBAK", nilai: 999 }).ditolak, 1, "tebakan di luar pilihan ditolak");
    const tebak = MT.langkahMesinBanyak(awal, { t: "TEBAK", nilai: d.opsi[0] });
    sama([tebak.keadaan, tebak.tebakan, tebak.ikat, tebak.lepas], ["kelompok", d.opsi[0], 0, 62], "menebak menerima tebakan apa pun");
    for (const p of [{ t: "TEBAK", nilai: d.opsi[1] }, { t: "JAWAB", nilai: d.n }, { t: "LANJUT" }]) {
      sama([MT.langkahMesinBanyak(tebak, p).keadaan, MT.langkahMesinBanyak(tebak, p).ditolak], ["kelompok", 1], `di Kelompokkan, ${p.t} ditolak`);
    }
    sama(MT.langkahMesinBanyak(tebak, { t: "SIAP" }).ditolak, 1, "siap ditolak selama masih ada sepuluh lepas");
    let k = ulang((x) => MT.langkahMesinBanyak(x, { t: "IKAT" }), tebak, 6);
    sama([k.ikat, k.lepas, k.ditolak], [6, 2, 0], "enam ikat dari 62 menyisakan dua lepas");
    sama(MT.langkahMesinBanyak(k, { t: "IKAT" }).ditolak, 1, "ikat ditolak bila kurang dari sepuluh");
    cek(MT.petunjukMesinBanyak(k).includes("Siap menghitung"), "petunjuk menyuruh Siap menghitung");
    k = MT.langkahMesinBanyak(k, { t: "SIAP" });
    sama(k.keadaan, "hitung", "siap menuju Hitung");
    sama(MT.langkahMesinBanyak(k, { t: "JAWAB", nilai: 26 }).keadaan, "hitung", "26 bukan jawaban 62");
    cek(MT.langkahMesinBanyak(k, { t: "JAWAB", nilai: 26 }).pesan.includes("6 puluhan"), "salah dijelaskan lewat puluhan");
    for (const p of [{ t: "TEBAK", nilai: d.opsi[0] }, { t: "IKAT" }, { t: "SIAP" }, { t: "LANJUT" }]) {
      sama(MT.langkahMesinBanyak(k, p).keadaan, "hitung", `di Hitung, ${p.t} ditolak`);
    }
    k = MT.langkahMesinBanyak(k, { t: "JAWAB", nilai: 62 });
    sama([k.keadaan, k.selesai], ["sudah", false], "jawaban benar menuju Selesai kumpulan");
    cek(MT.petunjukMesinBanyak(k).startsWith("Betul"), "petunjuk selesai kumpulan");
    sama(MT.langkahMesinBanyak(k, { t: "LOMPAT", ke: 0 }).ditolak, k.ditolak + 1, "lompat stasiun ditolak");
  }
  // Main sampai akhir untuk setiap kemungkinan tebakan.
  for (const pilih of [0, 1, 2]) {
    let x = MT.awalMesinBanyak();
    let tepat = 0;
    let langkah = 0;
    while (!x.selesai && langkah < 400) {
      langkah += 1;
      const d = MT.kasusBanyak(x);
      const opsi = MT.opsiTebakBanyak(d, x.misi);
      const tebakan = opsi[pilih];
      if (tebakan === MT.terdekatBanyak(d)) tepat += 1;
      x = MT.langkahMesinBanyak(x, { t: "TEBAK", nilai: tebakan });
      cek(x.keadaan === "kelompok", `tebakan ${tebakan} diterima untuk ${d.id}`);
      while (x.lepas >= 10) x = MT.langkahMesinBanyak(x, { t: "IKAT" });
      sama([x.ikat, x.lepas], [Math.floor(d.n / 10), d.n % 10], `${d.id}: ikat dan lepas sesuai puluhan dan satuan`);
      x = MT.langkahMesinBanyak(x, { t: "SIAP" });
      x = MT.langkahMesinBanyak(x, { t: "JAWAB", nilai: d.n });
      cek(x.keadaan === "sudah", `${d.id}: jawaban benar diterima`);
      cek(MT.ringkasBanyak(d, tebakan).includes(`${d.n}`), `${d.id}: ringkasan memuat banyaknya`);
      x = MT.langkahMesinBanyak(x, { t: "LANJUT" });
    }
    sama([x.selesai, x.keadaan, x.tepat], [true, "selesai", tepat], `tebakan pilihan ${pilih}: mesin selesai dan menghitung tebakan terdekat`);
    sama(x.misi, 4, "indeks kumpulan berhenti di terakhir");
    cek(MT.langkahMesinBanyak(x, { t: "TEBAK", nilai: 1 }).ditolak > 0, "setelah selesai, peristiwa lain ditolak");
    sama(MT.langkahMesinBanyak(x, { t: "ULANG" }), MT.awalMesinBanyak(), "ulang kembali ke awal");
  }
  sama(MT.langkahMesinBanyak(awal, { t: "ULANG" }), awal, "ulang sebelum selesai tidak mengubah apa pun");
  // Ringkasan jujur.
  {
    const d = MT.KASUS_BANYAK[0];
    cek(MT.ringkasBanyak(d, 60).includes("paling dekat") && MT.ringkasBanyak(d, 60).includes("selisihnya 2"), "60 untuk 62 paling dekat dengan selisih 2");
    cek(MT.ringkasBanyak(d, 80).includes("Menebak boleh keliru") && MT.ringkasBanyak(d, 80).includes("selisihnya 18"), "80 untuk 62 selisih 18 dan boleh keliru");
    cek(MT.ringkasBanyak({ ...d, opsi: [62, 80, 40] }, 62).includes("tepat sekali"), "tebakan sama dengan banyaknya disebut tepat");
  }
  // Misi A: tebak banyak.
  cek(ada("A", SEL("tebak-banyak"), "a-tebak") && !ada("A", SEL("kelereng-kira"), "a-tebak"), "a-tebak hanya dari mesin tebak banyak");
}

/* ------------------------------ Lab Garis Seratus ------------------------------ */
{
  const g0 = LG.awalGaris();
  sama([g0.n, g0.k, g0.terakhir, g0.riwayat.length], [50, 1, null, 0], "awal garis");
  cek(M0.misiBaru(K7.MISI_B, LG.laporanGaris(g0), kosong).length === 0, "awal Lab Garis tidak memenuhi misi apa pun");
  for (let n = 1; n <= 100; n += 1) {
    const dari = LG.awalJendela(n);
    cek(dari >= 1 && dari + LG.LEBAR_JENDELA - 1 <= 100 && n >= dari && n <= dari + LG.LEBAR_JENDELA - 1, `jendela garis memuat ${n} dan tetap 1..100`);
  }
  // Semua n, k: maju dan mundur.
  for (let n = 1; n <= 100; n += 1) {
    for (let k = 1; k <= 10; k += 1) {
      const l = { ...LG.aturPosisiGaris(g0, n), k };
      const mj = LG.majuGaris(l);
      const mn = LG.mundurGaris(l);
      if (n + k <= 100) {
        sama([mj.n, mj.terakhir?.arah, mj.terakhir?.k, mj.riwayat.length], [n + k, "maju", k, 1], `maju ${n}+${k}`);
        cek(LG.kalimatGaris(mj).includes("lebihnya") && !LG.kalimatGaris(mj).includes("kurangnya"), `maju memakai kata lebihnya ${n}+${k}`);
      } else {
        sama([mj.n, mj.terakhir, mj.catatan.length > 8], [n, null, true], `maju melewati 100 ditolak ${n}+${k}`);
        cek(!LG.bisaMaju(l), `bisaMaju salah ${n}+${k}`);
      }
      if (n - k >= 1) {
        sama([mn.n, mn.terakhir?.arah, mn.riwayat.length], [n - k, "mundur", 1], `mundur ${n}-${k}`);
        cek(LG.kalimatGaris(mn).includes("kurangnya") && !LG.kalimatGaris(mn).includes("lebihnya"), `mundur memakai kata kurangnya ${n}-${k}`);
      } else {
        sama([mn.n, mn.terakhir, mn.catatan.length > 8], [n, null, true], `mundur kurang dari 1 ditolak ${n}-${k}`);
        cek(!LG.bisaMundur(l), `bisaMundur salah ${n}-${k}`);
      }
    }
  }
  // Pengatur posisi dan banyak langkah.
  cek(LG.ubahPosisiGaris(LG.aturPosisiGaris(g0, 100), 1).catatan.includes("100") && LG.ubahPosisiGaris(LG.aturPosisiGaris(g0, 1), -1).catatan.includes("1"), "posisi berhenti di 1 dan 100 dengan penjelasan");
  sama(LG.ubahLangkahGaris(ulang((x) => LG.ubahLangkahGaris(x, 1), g0, 30), 1).k, 10, "langkah paling banyak 10");
  sama(LG.ubahLangkahGaris(g0, -1).k, 1, "langkah paling sedikit 1");
  sama(LG.ubahPosisiGaris(LG.majuGaris(g0), 1).terakhir, null, "mengubah posisi manual membatalkan lompatan terakhir");
  cek(LG.aturPosisiGaris(g0, 0).n === 50 && LG.aturPosisiGaris(g0, 101).n === 50, "ketuk di luar garis diabaikan");
  // Riwayat dibatasi.
  {
    let l = LG.aturPosisiGaris(g0, 1);
    for (let i = 0; i < 50; i += 1) l = LG.majuGaris(LG.mundurGaris(LG.majuGaris(l)));
    cek(l.riwayat.length <= 30, `riwayat garis dibatasi (${l.riwayat.length})`);
  }
  // Papan: puluhan berubah hanya bila melewati puluhan penuh.
  for (let n = 1; n <= 99; n += 1) {
    for (let k = 1; k <= 10 && n + k <= 100; k += 1) {
      const l = LG.nyalakanGaris(LG.majuGaris({ ...LG.aturPosisiGaris(g0, n), k }), "papan", true);
      const lintas = Math.floor(n / 10) !== Math.floor((n + k) / 10);
      sama(LG.lintasGaris(l.terakhir), lintas, `lintas ${n}+${k}`);
      cek(lintas ? LG.catatanPapanGaris(l).includes("Puluhan berubah") : LG.catatanPapanGaris(l).includes("Puluhan tetap"), `catatan papan ${n}+${k}`);
    }
  }
  cek(LG.catatanPapanGaris(g0).includes("Lompat dulu"), "catatan papan sebelum lompat");
  // Misi.
  {
    const m = (l) => M0.misiBaru(K7.MISI_B, LG.laporanGaris(l), kosong);
    let l = LG.aturPosisiGaris(g0, 58);
    l = LG.ubahLangkahGaris(l, 1);
    l = LG.majuGaris(l);
    cek(m(l).includes("b-maju"), "b-maju: 58 maju 2 langkah");
    cek(!m(LG.majuGaris(LG.aturPosisiGaris(g0, 58))).includes("b-maju"), "58 maju 1 langkah bukan b-maju");
    cek(!m(LG.majuGaris({ ...LG.aturPosisiGaris(g0, 57), k: 3 })).includes("b-maju"), "57 maju 3 langkah bukan b-maju");
    cek(!m(LG.mundurGaris({ ...LG.aturPosisiGaris(g0, 62), k: 2 })).includes("b-maju"), "mundur bukan b-maju");
    // 58 bisa dicapai lewat Pengatur ±1 dari 50.
    let p = ulang((x) => LG.ubahPosisiGaris(x, 1), g0, 8);
    sama(p.n, 58, "50 plus delapan langkah pengatur adalah 58");
    let md = { ...LG.aturPosisiGaris(g0, 75), k: 3 };
    md = LG.mundurGaris(md);
    cek(m(md).includes("b-mundur") && !m(LG.majuGaris({ ...LG.aturPosisiGaris(g0, 72), k: 3 })).includes("b-mundur"), "b-mundur: 75 mundur 3 langkah, bukan maju");
    const lintasPapan = LG.nyalakanGaris(LG.majuGaris({ ...LG.aturPosisiGaris(g0, 58), k: 4 }), "papan", true);
    cek(m(lintasPapan).includes("b-lintas"), "b-lintas: 58 maju 4 ke 62 dengan papan nyala");
    cek(!m(LG.majuGaris({ ...LG.aturPosisiGaris(g0, 58), k: 4 })).includes("b-lintas"), "b-lintas butuh papan nyala");
    cek(!m(LG.nyalakanGaris(LG.majuGaris({ ...LG.aturPosisiGaris(g0, 51), k: 4 }), "papan", true)).includes("b-lintas"), "55 tidak melewati puluhan");
    cek(!m(LG.nyalakanGaris(LG.mundurGaris({ ...LG.aturPosisiGaris(g0, 62), k: 4 }), "papan", true)).includes("b-lintas"), "mundur bukan b-lintas");
    cek(!m(LG.ubahPosisiGaris(lintasPapan, 1)).includes("b-lintas"), "setelah mengubah posisi manual, lompatan terakhir tidak ada lagi (misi dicatat saat tercapai)");
    sama(LG.resetGaris(), LG.awalGaris(), "reset garis kembali ke awal");
  }
}

/* ------------------------------ Lab Banding dan Urut ------------------------------ */
{
  const b0 = LB.awalBanding();
  sama([b0.mode, b0.a, b0.b, b0.aturan, b0.tanda, b0.pasang.length, b0.urutSelesai.length], ["banding", 47, 38, false, false, 0, 0], "awal banding");
  cek(M0.misiBaru(K7.MISI_B, LB.laporanBanding(b0), kosong).length === 0, "awal Lab Banding tidak memenuhi misi apa pun");
  // Semua pasangan 1..100: hasil, penentu, jebakan.
  let jebakan = 0;
  for (let a = 1; a <= 100; a += 1) {
    for (let b = 1; b <= 100; b += 1) {
      const r = LB.alasanBanding(a, b);
      const hasil = a > b ? "lebih" : a < b ? "kurang" : "sama";
      sama(r.hasil, hasil, `hasil ${a} dan ${b}`);
      const pa = Math.floor(a / 10);
      const pb = Math.floor(b / 10);
      sama(r.penentu, a === b ? "sama" : pa !== pb ? "puluhan" : "satuan", `penentu ${a} dan ${b}`);
      const balik = LB.alasanBanding(b, a);
      cek(balik.hasil === (r.hasil === "lebih" ? "kurang" : r.hasil === "kurang" ? "lebih" : "sama"), `antisimetri ${a} ${b}`);
      sama(LB.tandaBanding(a, b), a > b ? ">" : a < b ? "<" : "=", `tanda ${a} ${b}`);
      sama(LB.tandaBanding(a, b), LB.tandaBanding(b, a) === ">" ? "<" : LB.tandaBanding(b, a) === "<" ? ">" : "=", `tanda berlawanan ${a} ${b}`);
      const jeb = r.penentu === "puluhan" && (a > b ? b % 10 > a % 10 : a % 10 > b % 10);
      cek(r.kalimat.includes("tetapi puluhan yang menentukan") === jeb, `kalimat jebakan hanya bila satuan melawan ${a} ${b}`);
      if (jeb) jebakan += 1;
      if (r.penentu === "puluhan") cek(!r.kalimat.includes("Satuan menentukan"), `puluhan menentukan, bukan satuan ${a} ${b}`);
      if (r.penentu === "satuan") cek(r.kalimat.includes("Satuan menentukan"), `satuan menentukan ${a} ${b}`);
      const besarKata = a > b ? a : b;
      if (a !== b) cek(r.kalimat.includes(`${besarKata} lebih besar dari ${a > b ? b : a}`), `kalimat menyebut yang lebih besar ${a} ${b}`);
    }
  }
  cek(jebakan > 100, `ada banyak jebakan satuan melawan puluhan (${jebakan})`);
  cek(LB.alasanBanding(59, 61).kalimat.includes("Satuan 59 (9) lebih besar dari satuan 61 (1)"), "contoh jebakan 59 dengan 61");
  sama(LB.kataBanding(56, 65), "56 lebih kecil dari 65", "kata banding 56 dan 65");
  sama(LB.kunciPasangan(65, 56), "56|65", "kunci pasangan terurut");

  // Mengubah bilangan.
  {
    let l = LB.ubahBanding(b0, "a", 10);
    sama(l.a, 57, "a plus sepuluh");
    l = LB.ubahBanding(LB.ubahBanding(LB.awalBanding(), "a", -100), "a", -1);
    sama([l.a, l.catatan.includes("1")], [1, true], "a berhenti di 1");
    l = ulang((x) => LB.ubahBanding(x, "b", 10), LB.awalBanding(), 20);
    sama([l.b, l.catatan.includes("100")], [100, true], "b berhenti di 100");
    sama(LB.ubahBanding(LB.awalBanding(), "a", 1).pasang.length, 0, "tanpa Aturan, tidak ada pasangan dicatat");
    const a1 = LB.nyalakanBanding(LB.awalBanding(), "aturan", true);
    sama(a1.pasang, ["38|47"], "menyalakan Aturan mencatat pasangan yang sedang tampil");
    sama(LB.nyalakanBanding(a1, "aturan", false).pasang, ["38|47"], "mematikan Aturan tidak mencabut pasangan");
    sama(LB.ubahBanding(a1, "a", 1).pasang, ["38|47", "38|48"], "Aturan nyala mencatat pasangan baru");
    sama(LB.nyalakanBanding(LB.awalBanding(), "tanda", true).pasang.length, 0, "menyalakan Tanda bukan mencatat pasangan");
    const k = LB.kalimatBanding({ ...LB.awalBanding(), tanda: true, aturan: true });
    cek(k.includes("47 lebih besar dari 38") && k.includes("47 > 38") && k.includes("Puluhan 47 ada 4"), "kalimat banding memuat kata, tanda, dan alasan");
    const kecil = LB.kalimatBanding(LB.awalBanding());
    cek(kecil === "47 lebih besar dari 38." && !kecil.includes(">") && !kecil.includes("Puluhan"), "tanpa Tanda dan Aturan hanya satu kalimat");
  }

  // Himpunan dan urutan.
  for (const h of LB.HIMPUNAN_URUT) {
    const asc = LB.urutanBenar(h.angka, "kecil");
    const desc = LB.urutanBenar(h.angka, "besar");
    cek(JSON.stringify(h.angka) !== JSON.stringify(asc) && JSON.stringify(h.angka) !== JSON.stringify(desc), `${h.id}: urutan tampilan acak, belum terurut`);
    sama(new Set(h.angka).size, h.angka.length, `${h.id}: bilangan unik`);
    cek(h.angka.every((x) => x >= 1 && x <= 100), `${h.id}: dalam batas`);
    sama(asc, [...desc].reverse(), `${h.id}: besar kebalikan kecil`);
    cek(asc.every((x, i) => i === 0 || x > asc[i - 1]), `${h.id}: menaik`);
    // Semua permutasi: hanya satu yang benar.
    const perm = (a) => (a.length <= 1 ? [a] : a.flatMap((x, i) => perm([...a.slice(0, i), ...a.slice(i + 1)]).map((r) => [x, ...r])));
    for (const arah of ["kecil", "besar"]) {
      const benar = LB.urutanBenar(h.angka, arah);
      let banyakBenar = 0;
      for (const p of perm(h.angka)) {
        let l = LB.pilihArahUrut(LB.pilihHimpunan(LB.ubahModeBanding(LB.awalBanding(), "urut"), h.id), arah);
        for (const x of p) l = LB.pilihUrut(l, x);
        const betul = JSON.stringify(p) === JSON.stringify(benar);
        sama(l.urutSelesai.includes(`${h.id}|${arah}`), betul, `${h.id} ${arah}: ${p.join()}`);
        sama(l.gagal === null, betul, `${h.id} ${arah}: gagal hanya bila salah ${p.join()}`);
        if (betul) banyakBenar += 1;
        else {
          const i = p.findIndex((x, j) => x !== benar[j]);
          cek(l.gagal.includes(`tempat ke-${i + 1}`) && l.gagal.includes(String(benar[i])), `${h.id} ${arah}: penjelasan menunjuk tempat pertama yang keliru ${p.join()}`);
          cek(l.isi.length === h.angka.length, "urutan salah tetap tampil sampai diulang");
          sama(LB.ulangUrut(l).isi, [], "ulang urutan mengosongkan");
          sama(LB.hapusTerakhirUrut(l).gagal, null, "hapus terakhir menghapus penjelasan");
          sama(LB.hapusTerakhirUrut(l).isi.length, h.angka.length - 1, "hapus terakhir mengurangi satu");
        }
      }
      sama(banyakBenar, 1, `${h.id} ${arah}: tepat satu urutan benar`);
    }
  }
  {
    let l = LB.pilihUrut(LB.awalBanding(), 76);
    cek(LB.pilihUrut(l, 76).catatan.includes("sudah ditaruh") && LB.pilihUrut(l, 76).isi.length === 1, "tidak boleh menaruh bilangan yang sama dua kali");
    sama(LB.pilihUrut(l, 11).isi, [76], "bilangan di luar himpunan diabaikan");
    l = [57, 76, 83].reduce((x, n) => LB.pilihUrut(x, n), LB.awalBanding());
    cek(LB.urutSelesaiAktif(l) && LB.pilihUrut(l, 57).isi.length === 3 && LB.pilihUrut(l, 57).urutSelesai.length === 1, "urutan penuh tidak berubah oleh ketukan lagi");
    sama(LB.pilihHimpunan(l, "lima").isi, [], "ganti himpunan mengosongkan susunan");
    sama(LB.pilihHimpunan(l, "lima").urutSelesai, ["tiga|kecil"], "ganti himpunan tidak mencabut urutan yang sudah benar");
    sama(LB.pilihHimpunan(LB.awalBanding(), "tidak-ada").himpunan, "tiga", "himpunan tidak dikenal kembali ke tiga");
    sama(LB.hapusTerakhirUrut(LB.awalBanding()).isi, [], "hapus terakhir saat kosong tidak apa-apa");
    sama(LB.resetBanding(), LB.awalBanding(), "reset banding kembali ke awal");
  }

  // Misi B di Lab Banding.
  {
    const m = (l) => M0.misiBaru(K7.MISI_B, LB.laporanBanding(l), kosong);
    const atur = (l, a, b) => ({ ...l, a, b });
    const aturan = LB.nyalakanBanding(LB.awalBanding(), "aturan", true);
    // Mengubah lewat Pengatur: 47 ke 56 dan 38 ke 65.
    let l = aturan;
    l = ulang((x) => LB.ubahBanding(x, "a", 1), l, 9);
    l = ulang((x) => LB.ubahBanding(x, "b", 10), l, 2);
    l = ulang((x) => LB.ubahBanding(x, "b", 1), l, 7);
    sama([l.a, l.b], [56, 65], "47 dan 38 bisa diatur ke 56 dan 65 lewat Pengatur");
    cek(m(l).includes("b-puluhan"), "b-puluhan: 56 dan 65 dengan Aturan nyala");
    const tanpa = ulang((x) => LB.ubahBanding(x, "b", 1), ulang((x) => LB.ubahBanding(x, "b", 10), ulang((x) => LB.ubahBanding(x, "a", 1), LB.awalBanding(), 9), 2), 7);
    sama([tanpa.a, tanpa.b], [56, 65], "tanpa Aturan, sampai di 56 dan 65");
    cek(!m(tanpa).includes("b-puluhan") && m(LB.nyalakanBanding(tanpa, "aturan", true)).includes("b-puluhan"), "b-puluhan butuh Aturan: menyalakannya sesudah mengatur pun sah");
    cek(m(atur(aturan, 54, 58)) .includes("b-puluhan") === false, "kunci pasangan mengikuti pencatatan, bukan keadaan sesaat");
    const ba = (a, b) => m(LB.nyalakanBanding(atur(LB.awalBanding(), a, b), "aturan", true));
    cek(ba(54, 58).includes("b-satuan") && ba(58, 54).includes("b-satuan") && !ba(54, 64).includes("b-satuan"), "b-satuan: 54 dan 58 (urutan bebas)");
    cek(ba(59, 61).includes("b-jebakan") && ba(61, 59).includes("b-jebakan") && !ba(59, 71).includes("b-jebakan"), "b-jebakan: 59 dan 61");
    cek(ba(56, 65).includes("b-puluhan") && ba(65, 56).includes("b-puluhan") && !ba(56, 66).includes("b-puluhan"), "b-puluhan dua urutan");
    cek(m(atur(LB.awalBanding(), 44, 44)).includes("b-sama") && !m(atur(LB.awalBanding(), 44, 45)).includes("b-sama"), "b-sama");
    cek(!m({ ...atur(LB.awalBanding(), 44, 44), mode: "urut" }).includes("b-sama"), "b-sama hanya di mode banding");
    const t = (a, b, tanda) => m(LB.nyalakanBanding(atur(LB.awalBanding(), a, b), "tanda", tanda));
    cek(t(91, 19, true).includes("b-tanda") && t(19, 91, true).includes("b-tanda") && !t(91, 19, false).includes("b-tanda") && !t(91, 29, true).includes("b-tanda"), "b-tanda");
    // Urutan.
    const urut = (id, arah, perm) => perm.reduce((x, n) => LB.pilihUrut(x, n), LB.pilihArahUrut(LB.pilihHimpunan(LB.ubahModeBanding(LB.awalBanding(), "urut"), id), arah));
    cek(m(urut("tiga", "kecil", [57, 76, 83])).includes("b-urut") && !m(urut("tiga", "besar", [83, 76, 57])).includes("b-urut") && !m(urut("tiga", "kecil", [76, 57, 83])).includes("b-urut"), "b-urut: tiga kecil");
    cek(m(urut("tiga", "besar", [83, 76, 57])).includes("b-besar") && !m(urut("tiga", "kecil", [57, 76, 83])).includes("b-besar"), "b-besar: urut besar");
    cek(m(urut("lima", "kecil", [28, 34, 47, 65, 90])).includes("b-lima") && !m(urut("lima", "besar", [90, 65, 47, 34, 28])).includes("b-lima"), "b-lima: lima kecil");
    cek(m(urut("empat", "besar", [84, 62, 48, 26])).includes("b-besar"), "b-besar dari himpunan empat");
    // 62 dan 26 (tertukar) ada di himpunan empat.
    cek(LB.HIMPUNAN_URUT.find((h) => h.id === "empat").angka.includes(62) && LB.HIMPUNAN_URUT.find((h) => h.id === "empat").angka.includes(26), "himpunan empat memuat 62 dan 26 (angka tertukar)");
  }
}

/* ------------------------------ Gerbang dan keterjangkauan misi ------------------------------ */
{
  // Semua misi tercapai lewat aksi nyata alat masing-masing (dikumpulkan dari urutan aksi sungguhan).
  const k = [];
  const L = LS;
  // Lab Seratus.
  let s = L.awalSeratus();
  k.push(L.laporanSeratus(ulang(L.tambahPuluh, s, 10)));
  k.push(L.laporanSeratus(L.ikatSepuluh(ulang(L.tambahSatu, s, 10))));
  k.push(L.laporanSeratus(L.nyalakanSeratus(L.aturBilangan(s, 53), "papan", true)));
  k.push(L.laporanSeratus(L.aturBilangan(L.aturBilangan(s, 62), 26)));
  k.push(L.laporanSeratus(L.nyalakanSeratus(L.aturBilangan(s, 67), "pasangan", true)));
  k.push(L.laporanSeratus(L.nyalakanSeratus(L.aturBilangan(s, 90), "nama", true)));
  k.push(L.laporanSeratus(L.bukaPuluhan(L.tambahPuluh(s))));
  // Tabel.
  const t = LT.awalTabel();
  k.push(LT.laporanTabel(ulang((x) => LT.gerakTabel(x, "bawah"), t, 4)));
  k.push(LT.laporanTabel(LT.nyalakanTabel(LT.ketukKotakTabel(t, 55), "tetangga", true)));
  k.push(LT.laporanTabel(LT.nyalakanTabel(LT.ketukKotakTabel(t, 47), "kolom", true)));
  k.push(SEL("tebak-banyak"));
  // Perlu jalur aksi yang menyatukan: sekali lewat dengan keadaan yang terakumulasi (a-lima-tiga memakai papan, a-tertukar memakai pernah).
  const semuaA = semuaMisi("A", k);
  for (const m of K7.MISI_A) cek(semuaA.has(m.id), `k2bab7 A: ${m.id} tercapai`);

  const kb = [];
  const g0 = LG.awalGaris();
  kb.push(LG.laporanGaris(LG.majuGaris({ ...LG.aturPosisiGaris(g0, 58), k: 2 })));
  kb.push(LG.laporanGaris(LG.mundurGaris({ ...LG.aturPosisiGaris(g0, 75), k: 3 })));
  kb.push(LG.laporanGaris(LG.nyalakanGaris(LG.majuGaris({ ...LG.aturPosisiGaris(g0, 58), k: 4 }), "papan", true)));
  const b0 = LB.awalBanding();
  const ata = (a, b) => LB.nyalakanBanding({ ...b0, a, b }, "aturan", true);
  kb.push(LB.laporanBanding(ata(56, 65)), LB.laporanBanding(ata(54, 58)), LB.laporanBanding(ata(59, 61)));
  kb.push(LB.laporanBanding({ ...b0, a: 44, b: 44 }));
  kb.push(LB.laporanBanding(LB.nyalakanBanding({ ...b0, a: 91, b: 19 }, "tanda", true)));
  const urut = (id, arah, perm) => perm.reduce((x, n) => LB.pilihUrut(x, n), LB.pilihArahUrut(LB.pilihHimpunan(LB.ubahModeBanding(b0, "urut"), id), arah));
  kb.push(LB.laporanBanding(urut("tiga", "kecil", [57, 76, 83])), LB.laporanBanding(urut("tiga", "besar", [83, 76, 57])), LB.laporanBanding(urut("lima", "kecil", [28, 34, 47, 65, 90])));
  kb.push(SEL("kelereng-kira"));
  const semuaB = semuaMisi("B", kb);
  for (const m of K7.MISI_B) cek(semuaB.has(m.id), `k2bab7 B: ${m.id} tercapai`);

  // Keadaan selesai dari skenario lain tidak memenuhi misi B.
  cek(!ada("B", SEL("hari-minggu-kira-k2b6"), "b-skenario") && !ada("B", SEL("tebak-banyak"), "b-skenario"), "b-skenario hanya dari Kelereng Kira");
  // Keadaan alat A tidak memenuhi misi B, dan sebaliknya.
  cek(semuaMisi("B", [LS.laporanSeratus(LS.aturBilangan(LS.awalSeratus(), 53)), LT.laporanTabel(LT.awalTabel())]).size === 0, "alat sub-bab A tidak memenuhi misi B");
  cek(semuaMisi("A", [LG.laporanGaris(g0), LB.laporanBanding(b0)]).size === 0, "alat sub-bab B tidak memenuhi misi A");
  for (const sub of ["A", "B"]) {
    const tampil = M0.tampilMisi(K7.daftarMisiK2Bab7(sub));
    const wajibId = tampil.filter((x) => x.wajib).map((x) => x.id);
    cek(!M0.wajibSelesai(tampil, new Set(wajibId.slice(1))) && M0.wajibSelesai(tampil, new Set(wajibId)), `k2bab7 ${sub}: gerbang butuh semua misi wajib`);
    cek(M0.wajibSelesai(tampil, new Set(wajibId)) && !M0.wajibSelesai(tampil, new Set()), `k2bab7 ${sub}: gerbang tertutup tanpa misi`);
  }
}

console.log(gagal === 0 ? `SEMUA LULUS (${lulus} cek)` : `GAGAL ${gagal} dari ${lulus + gagal}`);
process.exit(gagal === 0 ? 0 : 1);
