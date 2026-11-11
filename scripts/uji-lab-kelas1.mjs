// Uji logika simulasi Matematika Kelas 1 Bab 1 sampai 7 (lab PhET, lab 2D, mesin keadaan).
// Jalankan: node --no-warnings scripts/uji-lab-kelas1.mjs
import * as B1 from "../src/components/modul/lab-bilangan-bab1.ts";
import * as K1 from "../src/components/modul/mesin-katak-bab1.ts";
import * as T2 from "../src/components/modul/lab-tambah-bab2.ts";
import * as M2 from "../src/components/modul/mesin-tambah-bab2.ts";
import * as K3 from "../src/components/modul/lab-kurang-bab3.ts";
import * as B3 from "../src/components/modul/mesin-bus-bab3.ts";
import * as P4 from "../src/components/modul/lab-papan-paku-bab4.ts";
import * as C4 from "../src/components/modul/lab-ciri-bab4.ts";
import * as G4 from "../src/components/modul/lab-kelompok-bab4.ts";
import * as H4 from "../src/components/modul/lab-gabung-bab4.ts";
import * as D5 from "../src/components/modul/lab-deret-bab5.ts";
import * as B5 from "../src/components/modul/lab-banding-bab5.ts";
import * as P5 from "../src/components/modul/lab-puluhan-bab5.ts";
import * as O5 from "../src/components/modul/mesin-odometer-bab5.ts";
import * as L6 from "../src/components/modul/lab-loncat-bab6.ts";
import * as E6 from "../src/components/modul/lab-belasan-bab6.ts";
import * as J6 from "../src/components/modul/mesin-jembatan-bab6.ts";
import * as U7 from "../src/components/modul/lab-ukur-bab7.ts";
import * as D7 from "../src/components/modul/lab-banding-panjang-bab7.ts";
import * as Q7 from "../src/components/modul/lab-posisi-bab7.ts";
import * as M0 from "../src/components/modul/misi-simulasi.ts";
import * as M7 from "../src/components/modul/misi-bab7.ts";
import * as M1 from "../src/components/modul/misi-bab1.ts";
import * as X2 from "../src/components/modul/misi-bab2.ts";
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

/* ------------------------------- Bab 1: lab ------------------------------ */
for (let n = 0; n <= 10; n += 1) {
  for (let a = 0; a <= n; a += 1) {
    const sel = B1.selBingkai(n, a);
    cek(sel.length === 10, "bingkai 10 kotak");
    cek(sel.filter((s) => s === "a").length === a, `bingkai ${n}/${a}: a`);
    cek(sel.filter((s) => s === "b").length === n - a, `bingkai ${n}/${a}: b`);
    cek(sel.filter((s) => s === "kosong").length === 10 - n, `bingkai ${n}/${a}: kosong`);
    const p = B1.pasangan(n, a);
    cek(p.a + p.b === n && p.a === a, `pasangan ${n}/${a}`);
  }
  cek(B1.pasangan(n, 99).a === n && B1.pasangan(n, -5).a === 0, `pasangan dibatasi ${n}`);
}
sama(B1.batas(-3), 0, "batas bawah");
sama(B1.batas(14), 10, "batas atas");
sama(B1.hubungan(7, 4).simbol, ">", "7 > 4");
sama(B1.hubungan(4, 7).simbol, "<", "4 < 7");
sama(B1.hubungan(5, 5).simbol, "=", "5 = 5");
cek(/lebih banyak dari 4/.test(B1.hubungan(7, 4).kalimat) && /lebih sedikit dari 7/.test(B1.hubungan(7, 4).kalimat), "kalimat banding");
sama(B1.kalimatPasangan(8, 3), "8 = 3 + 5", "kalimat pasangan");
sama(B1.ketukKotak(5, 6), 7, "ketuk kotak ke-7");
sama(B1.ketukKotak(7, 6), 6, "ketuk kotak terakhir mengurangi");
sama(B1.ketukKotak(1, 0), 0, "ketuk kotak pertama saat n=1");
cek(/Bilangan 7\./.test(B1.ucapanLab(7, 2, false, 0)) && !/lebih/.test(B1.ucapanLab(7, 2, false, 0)), "ucapan lab tanpa banding");
cek(/lebih banyak/.test(B1.ucapanLab(7, 2, true, 3)), "ucapan lab dengan banding");

/* ------------------------------ Bab 1: katak ----------------------------- */
{
  let k = K1.awalKatak(0);
  sama([k.pos, k.tiba, k.selesai], [3, false, false], "katak awal misi 1");
  // misi 1: 3 -> 7
  k = K1.langkahKatak(k, { t: "MAJU", n: 2 });
  k = K1.langkahKatak(k, { t: "MAJU", n: 1 });
  sama(k.pos, 6, "katak 6");
  cek(!k.tiba, "belum tiba di 6");
  const lanjutDini = K1.langkahKatak(k, { t: "LANJUT" });
  cek(lanjutDini.misi === 0 && lanjutDini.pesan !== "", "LANJUT sebelum tiba ditolak");
  k = K1.langkahKatak(k, { t: "MAJU", n: 1 });
  cek(k.tiba && k.pos === 7, "tiba di 7");
  const lagi = K1.langkahKatak(k, { t: "MAJU", n: 1 });
  cek(lagi.pos === 7 && lagi.pesan !== "" && lagi.ditolak === 1, "gerak saat tiba ditolak");
  k = K1.langkahKatak(k, { t: "LANJUT" });
  sama([k.misi, k.pos, k.tiba], [1, 7, false], "misi 2");
  // batas sungai: dari 7 mundur 2 jadi 5, 3, 1, lalu mundur 2 ditolak
  for (let i = 0; i < 3; i += 1) k = K1.langkahKatak(k, { t: "MUNDUR", n: 2 });
  sama(k.pos, 1, "katak 1");
  const tolak0 = K1.langkahKatak(k, { t: "MUNDUR", n: 2 });
  cek(tolak0.pos === 1 && /batu paling awal/i.test(tolak0.pesan) && tolak0.ditolak === k.ditolak + 1, "mundur di bawah 0 ditolak");
  k = K1.langkahKatak(k, { t: "MUNDUR", n: 1 });
  sama(k.pos, 0, "katak 0");
  const tolak1 = K1.langkahKatak(k, { t: "MUNDUR", n: 1 });
  cek(tolak1.pos === 0 && tolak1.pesan !== "", "mundur dari 0 ditolak");
  k = K1.langkahKatak(k, { t: "MAJU", n: 2 });
  cek(k.pos === 2 && k.tiba, "tiba di 2 (misi 2)");
  k = K1.langkahKatak(k, { t: "LANJUT" });
  sama([k.misi, k.pos], [2, 2], "misi 3");
  // dari 2 ke 9: 7 langkah
  for (let i = 0; i < 3; i += 1) k = K1.langkahKatak(k, { t: "MAJU", n: 2 });
  sama(k.pos, 8, "katak 8");
  k = K1.langkahKatak(k, { t: "MAJU", n: 2 });
  sama(k.pos, 10, "katak 10 (batu paling ujung)");
  k = K1.langkahKatak(k, { t: "MAJU", n: 1 });
  cek(k.pos === 10 && /batu paling ujung/i.test(k.pesan), "maju melewati 10 ditolak");
  k = K1.langkahKatak(k, { t: "MUNDUR", n: 1 });
  cek(k.tiba && k.pos === 9, "tiba di 9");
  k = K1.langkahKatak(k, { t: "LANJUT" });
  cek(k.selesai, "semua misi selesai");
  cek(K1.langkahKatak(k, { t: "MAJU", n: 1 }).pesan !== "", "gerak setelah selesai ditolak");
  const ulang = K1.langkahKatak(k, { t: "ULANG" });
  sama([ulang.misi, ulang.pos, ulang.selesai, ulang.ditolak, ulang.langkah], [0, 3, false, 0, 0], "main lagi");
  cek(K1.langkahKatak(K1.awalKatak(0), { t: "ULANG" }).pesan !== "", "ULANG sebelum selesai ditolak");
  // petunjuk
  cek(/maju ke batu 7/.test(K1.petunjukMisi(K1.awalKatak(0))) && /mundur ke batu 2/.test(K1.petunjukMisi(K1.awalKatak(1))), "petunjuk misi");
  // setiap misi dapat diselesaikan dengan langkah 1 dan 2 saja
  for (const m of K1.MISI) cek(m.awal !== m.tujuan && m.awal >= 0 && m.tujuan <= 10 && m.tujuan >= 0, "misi sah");
}

/* --------------------------- Bab 2: lab penjumlahan ---------------------- */
{
  for (let a = 0; a <= 10; a += 1) {
    for (let b = 0; a + b <= 10; b += 1) {
      const sel = T2.selGabung(a, b);
      cek(sel.length === 10 && sel.filter((s) => s === "a").length === a && sel.filter((s) => s === "b").length === b, `selGabung ${a}+${b}`);
      const bg = T2.bendaGabung(a, b);
      cek(bg.length === a + b && bg.every((x, i) => x.no === i + 1) && bg.filter((x) => x.grup === "a").length === a, `bendaGabung ${a}+${b}`);
      const hm = T2.hitungMaju(a, b);
      cek(hm[0] === a && hm[hm.length - 1] === a + b && hm.length === b + 1, `hitungMaju ${a}+${b}`);
      cek(T2.kalimat(a, b) === `${a} + ${b} = ${a + b}` && T2.kalimatTukar(a, b) === `${b} + ${a} = ${a + b}`, `kalimat ${a}+${b}`);
      const t = T2.tukar({ a, b });
      cek(t.a === b && t.b === a && T2.jumlah(t.a, t.b) === T2.jumlah(a, b), `tukar tempat ${a}+${b} menjaga jumlah`);
    }
  }
  const penuh = T2.ubahKelompok({ a: 6, b: 4 }, "a", 1);
  cek(penuh.a === 6 && penuh.b === 4 && penuh.pesan !== "", "jumlah lebih dari 10 ditolak");
  const kurang = T2.ubahKelompok({ a: 0, b: 3 }, "a", -1);
  cek(kurang.a === 0 && kurang.pesan === "", "tidak di bawah nol");
  const tambah = T2.ubahKelompok({ a: 2, b: 3 }, "b", 1);
  cek(tambah.b === 4 && tambah.pesan === "", "tambah kelompok biru");
  cek(/ditambah 4 sama dengan 7/.test(T2.ucapanTambah(3, 4, true)) && /gabungkan/i.test(T2.ucapanTambah(3, 4, false)), "ucapan tambah");
}

/* ----------------------------- Bab 2: mesin tambah ----------------------- */
{
  for (let r = 0; r < M2.PESANAN.length; r += 1) {
    const p = M2.pesananRonde(r);
    cek(p.a >= 1 && p.b >= 1 && p.a + p.b <= 10, `pesanan ${r} dalam batas`);
    const o = M2.pilihanHasil(r);
    cek(o.includes(p.a + p.b) && new Set(o).size === 3 && o.every((n) => n >= 0 && n <= 10), `pilihan hasil ronde ${r}: ${o}`);
  }
  let m = M2.awalTambah(0);
  const p = M2.pesananRonde(0);
  const t = (mm, e) => M2.langkahTambah(mm, e);
  // melompat langsung ke hasil ditolak
  let x = t(m, { t: "LOMPAT", ke: "hasil" });
  cek(x.keadaan === "pesan" && /tidak bisa melompat/i.test(x.pesan) && x.ditolak === 1, "lompat ke Hasil ditolak");
  x = t(m, { t: "LOMPAT", ke: "kotakA" });
  cek(x.keadaan === "pesan" && /Terima pesanan/i.test(x.pesan), "maju sebelum terima ditolak");
  x = t(m, { t: "UBAH", k: "a", delta: 1 });
  cek(x.a === 0 && x.pesan !== "", "mengisi Kotak A di stasiun Pesanan ditolak");
  x = t(m, { t: "GABUNG" });
  cek(!x.digabung && x.pesan !== "", "gabung di stasiun Pesanan ditolak");
  x = t(m, { t: "JAWAB", nilai: 7 });
  cek(x.keadaan === "pesan" && x.pesan !== "", "menjawab di stasiun Pesanan ditolak");
  m = t(m, { t: "TERIMA" });
  cek(m.keadaan === "kotakA" && m.riwayat.length === 1, "pesanan diterima");
  cek(t(m, { t: "TERIMA" }).pesan !== "", "pesanan tidak diterima dua kali");
  // kotak A kurang dari pesanan: ditolak dengan alasan jumlah
  m = t(m, { t: "UBAH", k: "a", delta: 1 });
  x = t(m, { t: "LOMPAT", ke: "kotakB" });
  cek(x.keadaan === "kotakA" && x.pesan.includes(`${p.a}`) && x.pesan.includes("Sekarang isinya 1"), "Kotak A kurang ditolak dengan alasan");
  x = t(m, { t: "UBAH", k: "b", delta: 1 });
  cek(x.b === 0 && x.pesan !== "", "mengisi Kotak B di stasiun Kotak A ditolak");
  for (let i = 1; i < p.a; i += 1) m = t(m, { t: "UBAH", k: "a", delta: 1 });
  cek(m.a === p.a, "Kotak A sesuai pesanan");
  // terlalu banyak
  let lebih = m;
  for (let i = 0; i < 12; i += 1) lebih = t(lebih, { t: "UBAH", k: "a", delta: 1 });
  cek(lebih.a === 10, "kotak dibatasi 10");
  cek(t(m, { t: "UBAH", k: "a", delta: -1 }).a === p.a - 1, "kurangi Kotak A");
  cek(t({ ...m, a: 0 }, { t: "UBAH", k: "a", delta: -1 }).a === 0, "Kotak A tidak di bawah nol");
  m = t(m, { t: "LOMPAT", ke: "kotakB" });
  cek(m.keadaan === "kotakB", "pindah ke Kotak B");
  for (let i = 0; i < p.b; i += 1) m = t(m, { t: "UBAH", k: "b", delta: 1 });
  m = t(m, { t: "LOMPAT", ke: "gabung" });
  cek(m.keadaan === "gabung" && !m.digabung, "pindah ke Gabung");
  x = t(m, { t: "LOMPAT", ke: "hasil" });
  cek(x.keadaan === "gabung" && /Gabungkan/.test(x.pesan), "belum digabung tidak boleh ke Hasil");
  // kembali melihat stasiun sebelumnya boleh
  const balik = t(m, { t: "LOMPAT", ke: "kotakA" });
  cek(balik.keadaan === "kotakA" && balik.a === p.a, "kembali ke stasiun sebelumnya boleh");
  m = t(m, { t: "GABUNG" });
  cek(m.digabung, "digabung");
  m = t(m, { t: "LOMPAT", ke: "hasil" });
  cek(m.keadaan === "hasil", "pindah ke Hasil");
  x = t(m, { t: "JAWAB", nilai: p.a + p.b + 1 });
  cek(x.keadaan === "hasil" && x.pesan !== "" && x.ditolak > m.ditolak, "jawaban salah ditolak");
  x = t(m, { t: "LOMPAT", ke: "selesai" });
  cek(x.keadaan === "hasil" && /Jawab dulu/.test(x.pesan), "tidak bisa ke Selesai tanpa jawaban");
  m = t(m, { t: "JAWAB", nilai: p.a + p.b });
  cek(m.keadaan === "selesai", "selesai");
  cek(t(m, { t: "LOMPAT", ke: "kotakA" }).pesan !== "", "setelah selesai lompat ditolak");
  cek(t(awalTambah0(), { t: "ULANG" }).pesan !== "", "ULANG sebelum selesai ditolak");
  const baru = t(m, { t: "ULANG" });
  cek(baru.ronde === 1 && baru.keadaan === "pesan" && baru.a === 0 && baru.ditolak === 0 && !baru.digabung, "ronde baru bersih");
  const p1 = M2.pesananRonde(1);
  cek(p1.a !== p.a || p1.b !== p.b, "ronde baru berbeda pesanan");
  function awalTambah0() {
    return M2.awalTambah(0);
  }
}

/* -------------------------- Bab 3: lab pengurangan ----------------------- */
{
  for (let t = 0; t <= 10; t += 1) {
    for (let k = 0; k <= t; k += 1) {
      const s = K3.sisa(t, k);
      const sel = K3.selKurang(t, k);
      cek(sel.length === 10 && sel.filter((x) => x === "a").length === s && sel.filter((x) => x === "coret").length === k && sel.filter((x) => x === "kosong").length === 10 - t, `selKurang ${t}-${k}`);
      const awal = K3.awalCoret(t, k);
      cek(awal.length === t && K3.banyakDicoret(awal) === k, `awalCoret ${t}-${k}`);
      const fakta = K3.keluargaFakta(t, k);
      cek(fakta.length >= 2 && fakta.length <= 4 && new Set(fakta).size === fakta.length, `fakta unik ${t}-${k}`);
      // setiap kalimat fakta benar
      for (const f of fakta) {
        const m = f.match(/^(\d+) ([+−]) (\d+) = (\d+)$/);
        const hasil = m[2] === "+" ? Number(m[1]) + Number(m[3]) : Number(m[1]) - Number(m[3]);
        cek(hasil === Number(m[4]), `fakta benar: ${f}`);
        cek(f.includes(String(t)), `fakta memuat bilangan total ${t}: ${f}`);
      }
      cek(K3.kalimatKurang(t, k) === `${t} − ${k} = ${s}`, `kalimat ${t}-${k}`);
      for (let i = 0; i < t; i += 1) {
        const baru = K3.ketukBenda(awal, i);
        cek(baru.length === t && baru[i] !== awal[i], `ketuk benda ${i} membalik status (${t},${k})`);
        cek(Math.abs(K3.banyakDicoret(baru) - k) === 1, `ketuk benda ${i} mengubah k satu (${t},${k})`);
        cek(baru.every((x, j) => j === i || x === awal[j]), `ketuk benda ${i} tidak menyentuh yang lain`);
      }
    }
  }
  sama(K3.keluargaFakta(8, 4), ["4 + 4 = 8", "8 − 4 = 4"], "fakta kembar dibuang");
  sama(K3.keluargaFakta(8, 3), ["5 + 3 = 8", "3 + 5 = 8", "8 − 3 = 5", "8 − 5 = 3"], "keluarga fakta 8, 3");
  sama(K3.ubahTotal(K3.awalCoret(5, 5), -1), K3.awalCoret(4, 4), "total turun membuang benda paling kanan");
  sama(K3.ubahTotal(K3.awalCoret(10, 2), 1).length, 10, "total dibatasi 10");
  sama(K3.ubahTotal(K3.awalCoret(3, 1), 1), [false, false, true, false], "benda baru belum dicoret");
  sama(K3.ubahTotal([], -1), [], "total tidak di bawah nol");
  sama(K3.ubahAmbil(K3.awalCoret(4, 4), 1), K3.awalCoret(4, 4), "ambil dibatasi total");
  sama(K3.ubahAmbil(K3.awalCoret(4, 0), -1), K3.awalCoret(4, 0), "ambil tidak di bawah nol");
  sama(K3.ubahAmbil(K3.awalCoret(4, 1), 1), [false, false, true, true], "ambil mencoret dari kanan");
  sama(K3.ubahAmbil([true, false, false, true], 1), [true, false, true, true], "ambil mencoret yang belum dicoret paling kanan");
  sama(K3.ubahAmbil([true, false, false, true], -1), [false, false, false, true], "kurangi mengembalikan yang paling kiri");
  sama(K3.ketukBenda([false, true, false], 1), [false, false, false], "ketuk benda dicoret mengembalikannya");
  sama(K3.ketukBenda([false, true, false], 9), [false, true, false], "ketuk di luar daftar diabaikan");
  // pola campur: benda boleh dicoret sembarang dan jumlahnya tetap k
  const campur = K3.ketukBenda(K3.ketukBenda(K3.awalCoret(6, 0), 0), 3);
  cek(K3.banyakDicoret(campur) === 2 && campur[0] && campur[3], "coret benda sembarang");
  cek(/dikurangi 3 sama dengan 5/.test(K3.ucapanKurang(8, 3)), "ucapan kurang");
}

/* ----------------------------- Bab 3: mesin bus -------------------------- */
{
  for (let r = 0; r < B3.RUTE.length; r += 1) {
    const rute = B3.ruteRonde(r);
    let isi = rute.awal;
    cek(isi >= 0 && isi <= B3.KAPASITAS_BUS, `rute ${r} awal sah`);
    for (const h of rute.halte) {
      cek(h.turun <= isi, `rute ${r} ${h.nama}: turun ${h.turun} <= isi ${isi}`);
      isi -= h.turun;
      isi += h.naik;
      cek(isi <= B3.KAPASITAS_BUS && isi >= 0, `rute ${r} ${h.nama}: isi ${isi} dalam kapasitas`);
      cek(h.turun + h.naik > 0, `rute ${r} ${h.nama} punya tugas`);
    }
  }
  const t = (b, e) => B3.langkahBus(b, e);
  let b = B3.awalBus(0);
  sama([b.h, b.isi, b.turunSisa, b.naikSisa], [0, 9, 4, 0], "bus awal");
  let x = t(b, { t: "BERANGKAT" });
  cek(x.h === 0 && /Masih ada 4 anak yang harus turun/.test(x.pesan) && x.ditolak === 1, "berangkat sebelum turun ditolak");
  x = t(b, { t: "NAIK" });
  cek(x.isi === 9 && /turun dulu/i.test(x.pesan), "naik sebelum turun ditolak");
  for (let i = 0; i < 4; i += 1) b = t(b, { t: "TURUN" });
  sama([b.isi, b.turunSisa], [5, 0], "empat anak turun");
  x = t(b, { t: "TURUN" });
  cek(x.isi === 5 && /tidak ada lagi yang turun/.test(x.pesan), "turun melebihi tugas ditolak");
  x = t(b, { t: "NAIK" });
  cek(x.isi === 5 && /tidak ada lagi yang naik/.test(x.pesan), "naik di halte tanpa tugas naik ditolak");
  b = t(b, { t: "BERANGKAT" });
  sama([b.h, b.isiMasuk, b.turunSisa, b.naikSisa], [1, 5, 0, 3], "halte Sekolah");
  cek(b.riwayat[0] === "Pasar: 9 − 4 = 5", `riwayat 1: ${b.riwayat[0]}`);
  for (let i = 0; i < 3; i += 1) b = t(b, { t: "NAIK" });
  cek(b.isi === 8, "tiga anak naik");
  b = t(b, { t: "BERANGKAT" });
  cek(b.riwayat[1] === "Sekolah: 5 + 3 = 8", `riwayat 2: ${b.riwayat[1]}`);
  for (let i = 0; i < 6; i += 1) b = t(b, { t: "TURUN" });
  cek(b.isi === 2 && !b.selesai, "enam anak turun");
  b = t(b, { t: "BERANGKAT" });
  cek(b.selesai && b.isi === 2 && b.riwayat[2] === "Taman: 8 − 6 = 2", `selesai: ${b.riwayat[2]}`);
  cek(t(b, { t: "TURUN" }).pesan !== "" && t(b, { t: "BERANGKAT" }).pesan !== "", "setelah selesai ditolak");
  cek(/terminal dengan 2 penumpang/.test(B3.tugasHalte(b)), "tugas halte setelah selesai");
  cek(t(B3.awalBus(0), { t: "ULANG" }).pesan !== "", "ULANG sebelum selesai ditolak");
  const baru = t(b, { t: "ULANG" });
  sama([baru.ronde, baru.h, baru.isi, baru.selesai, baru.ditolak], [1, 0, 7, false, 0], "rute baru");
  // rute 2: halte Kantor punya turun dan naik; urutan turun dulu
  let c = B3.awalBus(1);
  for (let i = 0; i < 2; i += 1) c = t(c, { t: "TURUN" });
  c = t(c, { t: "BERANGKAT" });
  sama([c.h, c.isi, c.turunSisa, c.naikSisa], [1, 5, 3, 2], "halte Kantor");
  cek(t(c, { t: "NAIK" }).pesan !== "", "Kantor: naik dulu ditolak");
  for (let i = 0; i < 3; i += 1) c = t(c, { t: "TURUN" });
  for (let i = 0; i < 2; i += 1) c = t(c, { t: "NAIK" });
  c = t(c, { t: "BERANGKAT" });
  cek(c.riwayat[1] === "Kantor: 5 − 3 + 2 = 4", `riwayat Kantor: ${c.riwayat[1]}`);
  for (let i = 0; i < 4; i += 1) c = t(c, { t: "TURUN" });
  cek(c.isi === 0, "bus kosong");
  cek(/sudah kosong/.test(t(c, { t: "TURUN" }).pesan), "turun dari bus kosong ditolak");
  c = t(c, { t: "BERANGKAT" });
  cek(c.selesai && c.isi === 0, "rute 2 selesai dengan bus kosong");
  // bus penuh
  const penuh = { ...B3.awalBus(0), isi: 10, turunSisa: 0, naikSisa: 2 };
  cek(/Bus penuh/.test(t(penuh, { t: "NAIK" }).pesan), "naik ke bus penuh ditolak");
}

/* --------------------------- Bab 4: papan paku --------------------------- */
{
  const rakit = (titik, tutup = true) => {
    let p = P4.papanKosong();
    for (const t of titik) p = P4.pasangPaku(p, t);
    return tutup ? P4.tutupBentuk(p) : p;
  };
  const nama = (titik) => {
    const p = rakit(titik);
    return p.tertutup ? P4.analisis(p.titik) : null;
  };
  const persegi = nama([[0, 0], [2, 0], [2, 2], [0, 2]]);
  cek(persegi && persegi.nama === "Persegi" && persegi.siku === 4 && persegi.sisiSama && persegi.sisi === 4, "persegi 2x2");
  const persegiMiring = nama([[2, 0], [4, 2], [2, 4], [0, 2]]);
  cek(persegiMiring && persegiMiring.nama === "Persegi" && persegiMiring.siku === 4, "persegi miring tetap persegi");
  const panjang = nama([[0, 0], [3, 0], [3, 1], [0, 1]]);
  cek(panjang && panjang.nama === "Persegi panjang" && panjang.siku === 4 && !panjang.sisiSama, "persegi panjang 3x1");
  const segitiga = nama([[0, 0], [4, 0], [0, 3]]);
  cek(segitiga && segitiga.nama === "Segitiga" && segitiga.sisi === 3 && segitiga.sudut === 3, "segitiga");
  const jajar = nama([[0, 0], [2, 0], [3, 1], [1, 1]]);
  cek(jajar && jajar.nama === "Segiempat" && jajar.siku === 0, "jajar genjang disebut segiempat");
  const belah = nama([[2, 0], [3, 2], [2, 4], [1, 2]]);
  cek(belah && belah.nama === "Segiempat" && belah.sisiSama && belah.siku === 0, "belah ketupat disebut segiempat");
  const lima = nama([[0, 0], [4, 0], [4, 2], [2, 4], [0, 2]]);
  cek(lima && lima.nama === "Segilima" && lima.sisi === 5, "segilima");
  const enam = nama([[0, 1], [1, 0], [3, 0], [4, 1], [3, 3], [1, 3]]);
  cek(enam && enam.nama === "Segienam", "segienam");
  // penolakan
  let p = P4.papanKosong();
  p = P4.pasangPaku(p, [0, 0]);
  const dobel = P4.pasangPaku(p, [0, 0]);
  cek(dobel.titik.length === 1 && /sudah dipakai/.test(dobel.pesan), "paku ganda ditolak");
  p = P4.pasangPaku(p, [1, 0]);
  const lurus = P4.pasangPaku(p, [2, 0]);
  cek(lurus.titik.length === 2 && /segaris/.test(lurus.pesan), "tiga paku segaris ditolak");
  const luar = P4.pasangPaku(p, [9, 9]);
  cek(luar.titik.length === 2, "paku di luar papan diabaikan");
  const dini = P4.tutupBentuk(p);
  cek(!dini.tertutup && /paling sedikit 3/.test(dini.pesan), "tutup dengan kurang dari 3 paku ditolak");
  // bowtie
  const dasi = rakit([[0, 0], [2, 2], [2, 0]], false);
  const silang4 = P4.pasangPaku(dasi, [0, 2]);
  cek(silang4.titik.length === 3 && /menyilang/.test(silang4.pesan), "karet menyilang ditolak");
  // menutup bentuk lewat ketuk paku pertama
  let q = rakit([[0, 0], [2, 0], [2, 2]], false);
  q = P4.pasangPaku(q, [0, 0]);
  cek(q.tertutup && P4.analisis(q.titik).nama === "Segitiga", "ketuk paku ke-1 menutup bentuk");
  const lagi = P4.pasangPaku(q, [3, 3]);
  cek(lagi.titik.length === 3 && /sudah tertutup/.test(lagi.pesan), "paku setelah tertutup ditolak");
  const buka = P4.hapusPakuTerakhir(q);
  cek(!buka.tertutup && buka.titik.length === 3, "hapus paku terakhir membuka karet");
  const kurang = P4.hapusPakuTerakhir(buka);
  cek(kurang.titik.length === 2, "hapus paku terakhir mengurangi satu");
  // penutup yang membuat paku terakhir segaris dengan paku pertama
  const segarisAkhir = rakit([[0, 0], [2, 0], [2, 2], [0, 2], [0, 1]], true);
  cek(!segarisAkhir.tertutup && /segaris/.test(segarisAkhir.pesan), "paku terakhir segaris dengan paku pertama ditolak saat menutup");
  // batas paku
  let banyak = P4.papanKosong();
  const lingkar = [[1, 0], [3, 0], [4, 1], [4, 3], [3, 4], [1, 4], [0, 3], [0, 1], [2, 2]];
  for (const t of lingkar) banyak = P4.pasangPaku(banyak, t);
  cek(banyak.titik.length === 8 && /Paling banyak 8/.test(banyak.pesan), "paling banyak 8 paku");
  cek(P4.tutupBentuk(banyak).tertutup && P4.analisis(banyak.titik).nama === "Segidelapan", "segidelapan");
  // ruas
  cek(P4.ruasBertemu([0, 0], [2, 2], [0, 2], [2, 0]), "ruas bersilang");
  cek(P4.ruasBertemu([0, 0], [2, 0], [2, 0], [2, 3]), "ruas bersentuhan di ujung");
  cek(P4.ruasBertemu([0, 0], [4, 0], [1, 0], [3, 0]), "ruas segaris tumpang tindih");
  cek(!P4.ruasBertemu([0, 0], [1, 0], [2, 0], [3, 0]), "ruas segaris terpisah");
  cek(!P4.ruasBertemu([0, 0], [4, 0], [0, 1], [4, 1]), "ruas sejajar");
  // jalur
  const t4 = rakit([[0, 0], [2, 0], [2, 2], [0, 2]]);
  const jl = P4.jalurKaret(t4.titik, true, false, (x) => [x[0] * 10, x[1] * 10]);
  cek(jl.startsWith("M 0 0") && (jl.match(/ L /g) ?? []).length === 3 && jl.endsWith(" Z"), `jalur lurus: ${jl}`);
  const jk = P4.jalurKaret(t4.titik, true, true, (x) => [x[0] * 10, x[1] * 10]);
  cek((jk.match(/ Q /g) ?? []).length === 4 && jk.endsWith(" Z") && !jk.includes(" L "), `jalur lengkung: ${jk}`);
  cek(P4.jalurKaret([], false, false, (x) => x) === "", "jalur kosong");
  cek(P4.ANALISIS_LENGKUNG.sisi === 0 && P4.ANALISIS_LENGKUNG.sudut === 0, "bentuk lengkung tanpa sisi lurus dan sudut");
  cek(P4.TANTANGAN.every((t) => ["Persegi", "Persegi panjang", "Segitiga", "Bentuk lengkung"].includes(t)), "tantangan sah");
  cek(/persegi/.test(P4.ucapanBentuk(rakit([[0, 0], [2, 0], [2, 2], [0, 2]]), false)) && /melengkung|lengkung/.test(P4.ucapanBentuk(t4, true)) && /Pasang karet/.test(P4.ucapanBentuk(P4.papanKosong(), false)), "ucapan bentuk");
  // semua bentuk yang bisa dirakit dari kisi punya nama yang masuk akal: acak ringan, deterministik
  let acak = 12345;
  const rnd = () => (acak = (acak * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff;
  let dicoba = 0;
  for (let i = 0; i < 400; i += 1) {
    let pp = P4.papanKosong();
    const n = 3 + Math.floor(rnd() * 4);
    for (let k = 0; k < 30 && pp.titik.length < n; k += 1) pp = P4.pasangPaku(pp, [Math.floor(rnd() * 5), Math.floor(rnd() * 5)]);
    pp = P4.tutupBentuk(pp);
    if (!pp.tertutup) continue;
    dicoba += 1;
    const a = P4.analisis(pp.titik);
    cek(a.sisi === pp.titik.length && a.sudut === a.sisi && a.siku >= 0 && a.siku <= a.sisi, "analisis acak konsisten");
    if (a.nama === "Persegi" || a.nama === "Persegi panjang") cek(a.siku === 4 && a.sisi === 4, "nama persegi hanya untuk 4 sudut siku");
    if (a.nama === "Persegi") cek(a.sisiSama, "persegi sisi sama");
  }
  cek(dicoba > 50, `cukup bentuk acak terbentuk (${dicoba})`);
}

/* ---------------------------- Bab 4: ciri bentuk ------------------------- */
{
  const ids = C4.BENTUK.map((b) => b.id);
  cek(new Set(ids).size === ids.length && ids.length === 5, "lima bentuk unik");
  for (const b of C4.BENTUK) {
    cek(C4.bentukDari(b.id).nama === b.nama, `bentukDari ${b.id}`);
    cek(b.ciri.length >= 2 && b.sudut >= 0, `ciri ${b.id}`);
    const lurus = b.sisiLurus;
    cek(b.sudut === 0 ? lurus === 0 : true, `${b.id}: tanpa sudut berarti tanpa sisi lurus`);
    // ciri tetap saat diputar dan dibesarkan
    let pose = C4.poseAwal;
    for (let i = 0; i < 6; i += 1) pose = C4.ubahSkala(C4.putar90(pose), i % 2 === 0 ? 1 : -1);
    sama(C4.ciriBentuk(b.id), { sisiLurus: b.sisiLurus, sisiLengkung: b.sisiLengkung, sudut: b.sudut }, `ciri tetap ${b.id}`);
    cek(/Bentuknya sudah diputar/.test(C4.ucapanCiri(b.id, { putar: 90, skala: 1 })) && !/diputar/.test(C4.ucapanCiri(b.id, C4.poseAwal)), `ucapan ciri ${b.id}`);
  }
  let pz = C4.poseAwal;
  for (let i = 0; i < 4; i += 1) pz = C4.putar90(pz);
  sama(pz.putar, 0, "putar empat kali kembali ke nol");
  sama(C4.putar90({ putar: 270, skala: 2 }), { putar: 0, skala: 2 }, "putar 270 + 90");
  sama(C4.ubahSkala({ putar: 0, skala: 3 }, 1).skala, 3, "skala maks 3");
  sama(C4.ubahSkala({ putar: 0, skala: 1 }, -1).skala, 1, "skala min 1");
  // susunan
  for (const s of C4.SUSUNAN) {
    cek(C4.BENTUK.some((b) => b.id === s.hasil), `${s.id}: hasil dikenal`);
    cek(s.bagian.length >= 2 && s.bagian.every((p) => p.dx !== 0 || p.dy !== 0), `${s.id}: bagian bergeser saat dipisah`);
    cek(/menjadi/.test(s.kalimat), `${s.id}: kalimat`);
    if (s.poligon) {
      cek(s.poligon.length === s.bagian.length, `${s.id}: poligon sebanyak bagian`);
      const jumlahLuas = s.poligon.reduce((a, p) => a + C4.luasPoligon(p), 0);
      const k = C4.kotakGabungan(s.poligon);
      const luasKotak = (k.x2 - k.x1) * (k.y2 - k.y1);
      cek(jumlahLuas === luasKotak, `${s.id}: bagian menutup persegi/persegi panjang tanpa celah (${jumlahLuas} vs ${luasKotak})`);
      const lebar = k.x2 - k.x1;
      const tinggi = k.y2 - k.y1;
      cek((s.hasil === "persegi") === (lebar === tinggi), `${s.id}: hasil ${s.hasil} cocok dengan ukuran ${lebar}x${tinggi}`);
    }
  }
  sama(new Set(C4.SUSUNAN.map((s) => s.id)).size, C4.SUSUNAN.length, "id susunan unik");
  sama(C4.luasPoligon([[0, 0], [4, 0], [4, 3], [0, 3]]), 12, "luas poligon");
}

/* ----------------------- Bab 5: lab puluhan dan satuan ------------------- */
{
  for (let n = 0; n <= 20; n += 1) {
    const u = P5.uraiNilai(n);
    cek(u.puluhan * 10 + u.satuan === n && u.satuan >= 0 && u.satuan <= 9, `urai ${n}`);
    const [a, b] = P5.selDuaBingkai(n);
    cek(a.length === 10 && b.length === 10, `dua bingkai ${n}`);
    cek(a.filter((x) => x === "a").length === Math.min(n, 10) && b.filter((x) => x === "b").length === Math.max(0, n - 10), `isi bingkai ${n}`);
    cek(b.every((x) => x !== "a") && a.every((x) => x !== "b"), `warna bingkai ${n}`);
    cek(P5.kalimatNilai(n) === `${n} = ${u.puluhan} puluhan + ${u.satuan} satuan`, `kalimat ${n}`);
    cek(P5.bisaIkat(n) === n >= 10, `bisaIkat ${n}`);
    cek(P5.ucapanPuluhan(n, true).startsWith(`Bilangan ${n}.`), `ucapan ${n}`);
    for (let m = 0; m <= 20; m += 1) {
      const k = P5.bandingkanNilaiTempat(n, m);
      const harus = n > m ? ">" : n < m ? "<" : "=";
      cek(k.simbol === harus, `banding ${n} dan ${m}: ${k.simbol}`);
      cek(k.alasan.length > 20, `alasan banding ${n} dan ${m}`);
      if (n !== m) cek(k.alasan.includes(`${Math.max(n, m)} lebih besar dari ${Math.min(n, m)}`), `alasan menyebut yang besar ${n},${m}`);
      const a1 = P5.uraiNilai(n);
      const b1 = P5.uraiNilai(m);
      if (n !== m && a1.puluhan === b1.puluhan) cek(/Lihat satuan/.test(k.alasan), `puluhan sama lihat satuan ${n},${m}`);
      if (a1.puluhan !== b1.puluhan) cek(/Puluhan lebih banyak/.test(k.alasan), `puluhan beda ${n},${m}`);
    }
  }
  sama(P5.batas(25), 20, "batas 20");
  sama(P5.batas(-2), 0, "batas 0");
  sama(P5.ketukBenda(14, 16), 17, "ketuk benda ke-17");
  sama(P5.ketukBenda(17, 16), 16, "ketuk benda terakhir mengurangi");
}

/* ----------------------------- Bab 5: odometer --------------------------- */
{
  const t = (o, e) => O5.langkahOdo(o, e);
  const S = (d) => ({ t: "SATUAN", d });
  const P = (d) => ({ t: "PULUHAN", d });
  for (const m of O5.MISI_ODO) cek(m.awal !== m.tujuan && m.awal >= 0 && m.tujuan <= 20, "misi odometer sah");
  let o = O5.awalOdo(0);
  sama([o.n, O5.uraiOdo(o.n)], [7, { p: 0, s: 7 }], "odometer awal");
  // misi 1: 7 -> 13 dengan bawa di 9 -> 10
  for (let i = 0; i < 2; i += 1) o = t(o, S(1));
  sama(o.n, 9, "odometer 9");
  cek(o.info === "", "belum ada bawa");
  o = t(o, S(1));
  cek(o.n === 10 && /diikat menjadi 1 puluhan/.test(o.info) && o.pesan === "", "bawa 9 -> 10 memberi keterangan");
  sama(O5.uraiOdo(o.n), { p: 1, s: 0 }, "10 = 1 puluhan 0 satuan");
  o = t(o, S(1));
  cek(o.info === "", "keterangan bawa hilang");
  o = t(o, S(1));
  o = t(o, S(1));
  cek(o.tiba && o.n === 13, "tiba di 13");
  cek(/sudah tiba/.test(t(o, S(1)).pesan) && t(o, S(1)).n === 13, "putar saat tiba ditolak");
  cek(/sudah tiba/.test(t(o, P(1)).pesan), "puluhan saat tiba ditolak");
  o = t(o, { t: "LANJUT" });
  sama([o.misi, o.n, o.tiba], [1, 13, false], "misi 2");
  cek(/belum tiba/.test(t(o, { t: "LANJUT" }).pesan), "LANJUT sebelum tiba ditolak");
  // misi 2: 13 -> 8 dengan pinjam di 10 -> 9
  for (let i = 0; i < 3; i += 1) o = t(o, S(-1));
  sama(o.n, 10, "odometer 10 saat turun");
  o = t(o, S(-1));
  cek(o.n === 9 && /dibuka menjadi 10 satuan/.test(o.info), "pinjam 10 -> 9 memberi keterangan");
  sama(O5.uraiOdo(9), { p: 0, s: 9 }, "9 = 0 puluhan 9 satuan");
  o = t(o, S(-1));
  cek(o.tiba && o.n === 8, "tiba di 8");
  o = t(o, { t: "LANJUT" });
  sama([o.misi, o.n], [2, 8], "misi 3");
  // puluhan naik menambah 10; batas atas
  const tolakAtas = t(o, P(1));
  cek(tolakAtas.n === 18 && tolakAtas.pesan === "", "puluhan naik dari 8 ke 18");
  o = tolakAtas;
  const gagalPuluhan = t(o, P(1));
  cek(gagalPuluhan.n === 18 && /melebihi 20/.test(gagalPuluhan.pesan) && gagalPuluhan.ditolak === o.ditolak + 1, "puluhan naik melebihi 20 ditolak");
  o = t(o, S(1));
  o = t(o, S(1));
  cek(o.tiba && o.n === 20, "tiba di 20");
  o = t(o, { t: "LANJUT" });
  cek(o.selesai, "semua misi odometer selesai");
  cek(t(o, S(1)).pesan !== "", "putar setelah selesai ditolak");
  const ulang = t(o, { t: "ULANG" });
  sama([ulang.misi, ulang.n, ulang.selesai, ulang.ditolak, ulang.langkah], [0, 7, false, 0, 0], "main lagi odometer");
  cek(t(O5.awalOdo(0), { t: "ULANG" }).pesan !== "", "ULANG sebelum selesai ditolak");
  // batas bawah dan atas langsung
  const nol = { ...O5.awalOdo(0), n: 0 };
  cek(/paling kecil adalah 0/.test(t(nol, S(-1)).pesan), "satuan turun di 0 ditolak");
  cek(/Puluhan sudah 0/.test(t(nol, P(-1)).pesan), "puluhan turun di 0 ditolak");
  const dua = { ...O5.awalOdo(0), n: 20 };
  cek(/paling besar di bab ini 20/.test(t(dua, S(1)).pesan), "satuan naik di 20 ditolak");
  const dua2 = t({ ...O5.awalOdo(0), n: 14 }, P(-1));
  cek(dua2.n === 4 && dua2.pesan === "", "puluhan turun 14 -> 4");
  // setiap angka 0..20 dapat dicapai dan uraiannya benar
  for (let n = 0; n <= 20; n += 1) {
    const u = O5.uraiOdo(n);
    cek(u.p * 10 + u.s === n, `uraiOdo ${n}`);
  }
  cek(/bertambah/.test(O5.petunjukOdo(O5.awalOdo(0))) && /berkurang/.test(O5.petunjukOdo(O5.awalOdo(1))), "petunjuk odometer");
}

/* ------------------------- Bab 6: garis bilangan loncat ------------------ */
{
  for (const op of ["tambah", "kurang", "selisih"]) {
    for (let a = 0; a <= 20; a += 1) {
      cek(L6.batasOperan(a, op) === (op === "tambah" ? 20 - a : op === "kurang" ? a : 20), `batas operan ${op} ${a}`);
      for (let b = 0; b <= L6.batasOperan(a, op); b += 1) {
        const p = { a, b };
        cek(JSON.stringify(L6.rapikan(p, op)) === JSON.stringify(p), `rapikan menjaga pasangan sah ${op} ${a},${b}`);
        const hasil = L6.hasilLoncat(p, op);
        cek(hasil >= 0 && hasil <= 20, `hasil ${op} ${a},${b} dalam 0..20`);
        const kalimat = L6.kalimatLoncat(p, op);
        const m = kalimat.match(/^(\d+) ([+−]) (\d+) = (\d+)$/);
        cek(!!m && (m[2] === "+" ? Number(m[1]) + Number(m[3]) : Number(m[1]) - Number(m[3])) === Number(m[4]) && Number(m[4]) === hasil, `kalimat ${kalimat}`);
        for (const st of ["satuan", "sepuluh"]) {
          const hops = L6.rencana(p, op, st);
          if (op === "selisih") {
            cek(hops.length === (a === b ? 0 : 1), `selisih hop ${a},${b}`);
            if (hops.length === 1) cek(hops[0].dari === Math.min(a, b) && hops[0].ke === Math.max(a, b) && hops[0].label === String(hasil), `selisih hop isi ${a},${b}`);
            continue;
          }
          if (b === 0) {
            cek(hops.length === 0, `tanpa lompatan ${op} ${a},0`);
            continue;
          }
          cek(hops[0].dari === a && hops[hops.length - 1].ke === hasil, `rantai hop ${op} ${st} ${a},${b}`);
          for (let i = 1; i < hops.length; i += 1) cek(hops[i].dari === hops[i - 1].ke, `hop bersambung ${op} ${st} ${a},${b}`);
          const total = hops.reduce((x, h) => x + Math.abs(h.ke - h.dari), 0);
          cek(total === b, `jumlah lompatan ${op} ${st} ${a},${b}`);
          cek(hops.every((h) => (op === "tambah" ? h.ke > h.dari : h.ke < h.dari)), `arah lompatan ${op} ${a},${b}`);
          if (st === "satuan") cek(hops.length === b && hops.every((h) => Math.abs(h.ke - h.dari) === 1), `satu-satu ${op} ${a},${b}`);
          if (st === "sepuluh") {
            const melewati = op === "tambah" ? a < 10 && hasil > 10 : a > 10 && hasil < 10;
            cek(hops.length === (melewati ? 2 : 1), `lewat sepuluh ${op} ${a},${b}: ${hops.length} hop`);
            if (melewati) cek(hops[0].ke === 10, `hop pertama berhenti di 10 ${op} ${a},${b}`);
          }
        }
      }
    }
  }
  sama(L6.rapikan({ a: 18, b: 9 }, "tambah"), { a: 18, b: 2 }, "rapikan tambah menjepit b");
  sama(L6.rapikan({ a: 5, b: 9 }, "kurang"), { a: 5, b: 5 }, "rapikan kurang menjepit b");
  sama(L6.rapikan({ a: 25, b: 30 }, "selisih"), { a: 20, b: 20 }, "rapikan selisih menjepit keduanya");
  sama(L6.catatanLoncat(L6.rencana({ a: 8, b: 5 }, "tambah", "sepuluh")), "8 → 10 (+2), 10 → 13 (+3)", "catatan loncat lewat sepuluh");
  sama(L6.catatanLoncat(L6.rencana({ a: 15, b: 6 }, "kurang", "sepuluh")), "15 → 10 (−5), 10 → 9 (−1)", "catatan loncat mundur lewat sepuluh");
  cek(/2 lompatan/.test(L6.ucapanLoncat({ a: 8, b: 5 }, "tambah", "sepuluh")) && /5 lompatan/.test(L6.ucapanLoncat({ a: 8, b: 5 }, "tambah", "satuan")), "ucapan loncat");
  cek(/Selisih 3 dan 9 adalah 6/.test(L6.ucapanLoncat({ a: 3, b: 9 }, "selisih", "satuan")) && /sama besar/.test(L6.ucapanLoncat({ a: 4, b: 4 }, "selisih", "satuan")), "ucapan selisih");
}

/* --------------------------- Bab 6: jembatan sepuluh --------------------- */
{
  for (let r = 0; r < J6.SOAL_JEMBATAN.length; r += 1) {
    const s = J6.soalRonde(r);
    cek(s.a < 10 && s.a + s.b > 10 && s.a + s.b <= 20, `soal jembatan ${r} melewati 10 dan tidak lebih dari 20`);
    cek(J6.bagianPertama(s.a) + s.a === 10 && s.b - J6.bagianPertama(s.a) > 0, `soal jembatan ${r} bagian pertama sah`);
    const o = J6.pilihanSisa(r);
    cek(o.includes(s.a + s.b) && new Set(o).size === 3 && o.every((n) => n >= 0 && n <= 21), `pilihan sisa ${r}: ${o}`);
  }
  cek(new Set(J6.SOAL_JEMBATAN.map((s) => s.a + s.b)).size === 3, "jumlah soal jembatan bervariasi");
  const t = (m, e) => J6.langkahJembatan(m, e);
  let m = J6.awalJembatan(0);
  const s = J6.soalRonde(0);
  let x = t(m, { t: "LOMPAT", ke: "sisa" });
  cek(x.keadaan === "soal" && /tidak bisa melompat/.test(x.pesan) && x.ditolak === 1, "lompat ke Sisa ditolak");
  x = t(m, { t: "LOMPAT", ke: "pecah" });
  cek(x.keadaan === "soal" && /Baca soalnya/.test(x.pesan), "maju sebelum baca ditolak");
  cek(t(m, { t: "PECAH", delta: 1 }).pesan !== "" && t(m, { t: "GENAPKAN" }).pesan !== "" && t(m, { t: "JAWAB", nilai: 13 }).pesan !== "", "aksi di stasiun Soal ditolak");
  m = t(m, { t: "BACA" });
  cek(m.keadaan === "pecah", "soal dibaca");
  cek(t(m, { t: "BACA" }).pesan !== "", "soal tidak dibaca dua kali");
  cek(t(m, { t: "GENAPKAN" }).pesan !== "" && t(m, { t: "JAWAB", nilai: 13 }).pesan !== "", "genapkan dan jawab di stasiun Pecah ditolak");
  // pecah salah
  m = t(m, { t: "PECAH", delta: 1 });
  m = t(m, { t: "PECAH", delta: 1 });
  m = t(m, { t: "PECAH", delta: 1 });
  sama(m.x, 3, "bagian pertama 3");
  x = t(m, { t: "LOMPAT", ke: "genapkan" });
  cek(x.keadaan === "pecah" && x.pesan.includes("harus 2") && x.pesan.includes("Sekarang 3"), `pecah salah ditolak: ${x.pesan}`);
  cek(t({ ...m, x: 0 }, { t: "PECAH", delta: -1 }).x === 0, "bagian pertama tidak di bawah nol");
  cek(/tidak boleh lebih dari 5/.test(t({ ...m, x: 5 }, { t: "PECAH", delta: 1 }).pesan), "bagian pertama tidak melebihi b");
  m = t(m, { t: "PECAH", delta: -1 });
  m = t(m, { t: "LOMPAT", ke: "genapkan" });
  cek(m.keadaan === "genapkan", "pindah ke Genapkan");
  x = t(m, { t: "LOMPAT", ke: "sisa" });
  cek(x.keadaan === "genapkan" && /Genapkan dulu/.test(x.pesan), "belum digenapkan tidak boleh ke Sisa");
  const balik = t(m, { t: "LOMPAT", ke: "pecah" });
  cek(balik.keadaan === "pecah" && balik.x === 2, "kembali ke Pecah boleh");
  m = t(m, { t: "GENAPKAN" });
  cek(m.genap && m.riwayat[m.riwayat.length - 1] === "8 + 2 = 10", `digenapkan: ${m.riwayat[m.riwayat.length - 1]}`);
  m = t(m, { t: "LOMPAT", ke: "sisa" });
  cek(m.keadaan === "sisa", "pindah ke Sisa");
  x = t(m, { t: "JAWAB", nilai: s.a + s.b + 1 });
  cek(x.keadaan === "sisa" && /10 \+ 3/.test(x.pesan) && x.ditolak > m.ditolak, "hasil salah ditolak dengan petunjuk");
  x = t(m, { t: "LOMPAT", ke: "selesai" });
  cek(x.keadaan === "sisa" && /Pilih dulu/.test(x.pesan), "tidak bisa ke Selesai tanpa jawaban");
  m = t(m, { t: "JAWAB", nilai: s.a + s.b });
  cek(m.keadaan === "selesai" && m.riwayat.includes("10 + 3 = 13") && m.riwayat.filter((r) => r === "Sisa → Selesai").length === 1, "selesai dengan catatan");
  cek(t(m, { t: "LOMPAT", ke: "pecah" }).pesan !== "", "setelah selesai lompat ditolak");
  cek(t(J6.awalJembatan(0), { t: "ULANG" }).pesan !== "", "ULANG sebelum selesai ditolak");
  const baru = t(m, { t: "ULANG" });
  cek(baru.ronde === 1 && baru.keadaan === "soal" && baru.x === 0 && !baru.genap && baru.ditolak === 0, "soal baru bersih");
  cek(J6.soalRonde(1).a !== s.a, "soal baru berbeda");
}

/* ------------------------------ Bab 7: meja ukur ------------------------- */
{
  for (const sat of U7.SATUAN) {
    cek(U7.PANJANG_BENDA % sat.panjang === 0, `${sat.id}: panjang benda habis dibagi satuan`);
    const benar = U7.hasilBenar(sat.id);
    cek(benar <= U7.MAKS_SATUAN, `${sat.id}: hasil benar ${benar} muat di batas`);
    const dasar = { id: sat.id, dariTengah: false, celah: false, tumpuk: false };
    const pas = U7.susun({ ...dasar, n: benar });
    cek(pas.status === "tepat" && pas.akhir === U7.PANJANG_BENDA && pas.masalah.length === 0 && pas.kotak.length === benar, `${sat.id}: pas`);
    cek(pas.kotak.every((k, i) => k.x === i * sat.panjang && k.lebar === sat.panjang && k.baris === 0), `${sat.id}: kotak rapat dari ujung`);
    cek(new RegExp(`${benar} ${sat.nama.toLowerCase()}`).test(pas.pesan), `${sat.id}: pesan tepat menyebut hasil`);
    for (let n = 0; n <= U7.MAKS_SATUAN; n += 1) {
      const h = U7.susun({ ...dasar, n });
      const harus = n < benar ? "kurang" : n > benar ? "lebih" : "tepat";
      cek(h.status === harus, `${sat.id} n=${n}: ${h.status} != ${harus}`);
      cek(h.akhir === n * sat.panjang, `${sat.id} n=${n}: akhir ${h.akhir}`);
    }
    // setiap kebiasaan salah membuat hasil tidak pernah "tepat", seberapa pun satuannya
    for (const salah of [{ dariTengah: true }, { celah: true }, { tumpuk: true }, { dariTengah: true, celah: true, tumpuk: true }]) {
      for (let n = 0; n <= U7.MAKS_SATUAN; n += 1) {
        const h = U7.susun({ ...dasar, ...salah, n });
        cek(h.status === "salah-cara" && h.masalah.length === Object.keys(salah).length, `${sat.id} ${JSON.stringify(salah)} n=${n}: salah cara`);
      }
    }
    const tumpuk = U7.susun({ ...dasar, tumpuk: true, n: 3 });
    cek(tumpuk.kotak.map((k) => k.baris).join("") === "010" && tumpuk.kotak[1].x === sat.panjang - 1, `${sat.id}: tumpukan menggeser mundur dan berselang-seling`);
    const celah = U7.susun({ ...dasar, celah: true, n: 3 });
    cek(celah.kotak[1].x === sat.panjang + 1, `${sat.id}: celah menggeser maju`);
    const tengah = U7.susun({ ...dasar, dariTengah: true, n: 2 });
    cek(tengah.kotak[0].x === U7.GESER_TENGAH, `${sat.id}: mulai dari tengah bergeser`);
  }
  const tabel = U7.tabelHasil();
  sama(tabel.map((t) => t.n), [3, 4, 6], "tabel hasil balok, stik, klip");
  cek(tabel.every((t, i) => i === 0 || tabel[i - 1].n < t.n), "satuan lebih pendek, bilangan lebih banyak");
  cek(U7.susun({ id: "stik", n: 99, dariTengah: false, celah: false, tumpuk: false }).kotak.length === U7.MAKS_SATUAN, "n dibatasi maksimum");
  cek(U7.susun({ id: "stik", n: -3, dariTengah: false, celah: false, tumpuk: false }).kotak.length === 0, "n tidak negatif");
  cek(/Letakkan satuan pertama/.test(U7.susun({ id: "stik", n: 0, dariTengah: false, celah: false, tumpuk: false }).pesan), "pesan awal");
  cek(/Pita diukur dengan 4 stik/.test(U7.ucapanUkur({ id: "stik", n: 4, dariTengah: false, celah: false, tumpuk: false })) && /belum benar/.test(U7.ucapanUkur({ id: "stik", n: 4, dariTengah: false, celah: true, tumpuk: false })), "ucapan ukur");
}

/* ------------------------- Bab 7: bandingkan panjang --------------------- */
{
  sama(D7.PITA.length, 4, "empat pita");
  cek(D7.PANJANG_AWAL.length === 4 && D7.PANJANG_AWAL.every((p) => p >= 1 && p <= 10) && new Set(D7.PANJANG_AWAL).size === 4, "panjang awal sah dan berbeda");
  cek(D7.GESER_TAK_SEJAJAR.length === 4 && D7.GESER_TAK_SEJAJAR.some((g) => g > 0), "geseran tidak sejajar bervariasi");
  // lebar total muat di gambar: X0 54 + geser maks*10 + 10*26 + angka
  cek(54 + Math.max(...D7.GESER_TAK_SEJAJAR) * 10 + 10 * 26 + 24 <= 380, "pita terpanjang muat di gambar");
  sama(D7.ubahPanjang([5, 8, 3, 6], 2, 1), [5, 8, 4, 6], "ubah panjang pita hijau");
  sama(D7.ubahPanjang([5, 8, 3, 6], 0, -1), [4, 8, 3, 6], "kurangi pita merah");
  sama(D7.ubahPanjang([1, 8, 3, 6], 0, -1), [1, 8, 3, 6], "panjang minimal 1");
  sama(D7.ubahPanjang([5, 10, 3, 6], 1, 1), [5, 10, 3, 6], "panjang maksimal 10");
  sama(D7.ubahPanjang([5, 8, 3, 6], 9, 1), [5, 8, 3, 6], "indeks di luar daftar diabaikan");
  sama(D7.urutanTampil([5, 8, 3, 6], false), [0, 1, 2, 3], "urutan asli");
  sama(D7.urutanTampil([5, 8, 3, 6], true), [2, 0, 3, 1], "urut dari terpendek");
  sama(D7.urutanTampil([4, 4, 2, 4], true), [2, 0, 1, 3], "panjang sama tetap urutan semula");
  sama(D7.terpendek([5, 8, 3, 6]), [2], "terpendek");
  sama(D7.terpanjang([5, 8, 3, 6]), [1], "terpanjang");
  sama(D7.terpendek([3, 8, 3, 6]), [0, 2], "terpendek kembar");
  sama(D7.terpanjang([8, 8, 3, 6]), [0, 1], "terpanjang kembar");
  // semua pasangan: kalimat sesuai
  for (let i = 0; i < 4; i += 1) {
    for (let j = 0; j < 4; j += 1) {
      const k = D7.bandingDua([5, 8, 3, 6], i, j);
      if (i === j) cek(/dirinya sendiri/.test(k), `banding diri sendiri ${i}`);
      else {
        const sel = Math.abs([5, 8, 3, 6][i] - [5, 8, 3, 6][j]);
        const lebihI = [5, 8, 3, 6][i] > [5, 8, 3, 6][j];
        const lebih = D7.PITA[lebihI ? i : j].nama;
        const kurang = D7.PITA[lebihI ? j : i].nama;
        cek(k.includes(`Pita ${lebih} lebih panjang ${sel} stik dari pita ${kurang}`) && k.includes(`lebih pendek ${sel} stik`), `banding ${i},${j}: ${k}`);
      }
    }
  }
  cek(/sama panjang, masing-masing 5 stik/.test(D7.bandingDua([5, 5, 3, 6], 0, 1)), "banding sama panjang");
  sama(D7.pilihPita([], 2), [2], "pilih pita pertama");
  sama(D7.pilihPita([2], 0), [2, 0], "pilih pita kedua");
  sama(D7.pilihPita([2, 0], 3), [0, 3], "pilih pita ketiga menggeser yang tertua");
  sama(D7.pilihPita([2, 0], 2), [0], "ketuk lagi melepas");
  cek(/Biru dan Hijau|Biru/.test(D7.ucapanBanding([5, 8, 3, 6], false, true)) && /belum sejajar/.test(D7.ucapanBanding([5, 8, 3, 6], false, false)) && !/belum sejajar/.test(D7.ucapanBanding([5, 8, 3, 6], true, true)) && /diurutkan/.test(D7.ucapanBanding([5, 8, 3, 6], true, true)), "ucapan banding");
}

/* ----------------- Bab 4 (Materi): kelompok, gabungan, kelompok bentuk ----------------- */
{
  // Laboratorium Kelompok: tiap aturan memecah sembilan balok tanpa sisa dan tanpa ganda.
  for (const a of G4.SEMUA_ATURAN) {
    const k = G4.kelompokkan(a);
    cek(k.reduce((s, x) => s + x.jumlah, 0) === G4.BLOK.length, `kelompok ${a}: jumlah semua = ${G4.BLOK.length}`);
    cek(new Set(k.flatMap((x) => x.anggota.map((b) => b.id))).size === G4.BLOK.length, `kelompok ${a}: tiap balok tepat di satu kelompok`);
    cek(k.every((x) => x.anggota.every((b) => G4.nilaiBlok(b, a) === x.id)), `kelompok ${a}: anggota cocok dengan aturan`);
    const kal = G4.kalimatJumlah(a);
    const [kiri, kanan] = kal.split(" = ");
    cek(kiri.split(" + ").map(Number).reduce((s, n) => s + n, 0) === Number(kanan) && Number(kanan) === G4.BLOK.length, `kalimat jumlah ${a}: ${kal}`);
  }
  sama(G4.kelompokkan("bentuk").map((x) => x.jumlah), [4, 2, 3], "sebaran bentuk");
  sama(G4.kelompokkan("warna").map((x) => x.jumlah), [3, 4, 2], "sebaran warna");
  sama(G4.kelompokkan("ukuran").map((x) => x.jumlah), [5, 4], "sebaran ukuran");
  cek(new Set(["bentuk", "warna", "ukuran"].map((a) => JSON.stringify(G4.kelompokkan(a).map((x) => x.jumlah)))).size === 3, "tiga aturan memberi sebaran berbeda");
  cek(G4.BLOK.some((b) => G4.nilaiBlok(b, "bentuk") === "lengkung") && G4.BLOK.some((b) => G4.nilaiBlok(b, "warna") === "kuning"), "ada balok lengkung dan kuning");
  // Satu balok yang sama masuk kelompok berbeda menurut aturan.
  const talam = G4.BLOK[2];
  const kb = G4.kelompokBlok(talam);
  sama(kb.map((x) => x.aturan), ["bentuk", "warna", "ukuran"], "kelompok balok urut aturan");
  sama(kb.map((x) => x.nama), ["Segitiga", "Kuning", "Besar"], "balok 3 menurut tiga aturan");
  cek(kb.every((x) => x.jumlah >= 1), "kelompok balok punya anggota");
  cek(/segitiga kuning besar/.test(G4.namaBlok(talam)), "nama balok");
  cek(/Menurut warna: merah 3, biru 4, kuning 2\./.test(G4.kalimatKelompok("warna")), "kalimat kelompok warna");
  cek(/Semuanya ada 9\./.test(G4.ucapanKelompok("bentuk")) && /Kelompok lengkung ada 4\./.test(G4.ucapanKelompok("bentuk")), "ucapan kelompok bentuk");
  cek(/ia masuk kelompok segitiga/.test(G4.ucapanBlok(talam, "warna")) && /kelompok kuning/.test(G4.ucapanBlok(talam, "warna")) && /sedang dipakai: warna/.test(G4.ucapanBlok(talam, "warna")), "ucapan balok");
  // Kelompok kosong dilewati pada kalimat (balok sebagian).
  const sedikit = G4.BLOK.filter((b) => b.bentuk !== "segitiga");
  sama(G4.kalimatJumlah("bentuk", sedikit), "4 + 3 = 7", "kalimat jumlah tanpa kelompok kosong");
}

{
  // Laboratorium Bangun Gabungan: jumlah semua jenis sama dengan jumlah bagian, kalimat benar.
  for (const b of H4.BANGUN) {
    const h = H4.hitungJenis(b);
    cek(h.reduce((s, x) => s + x.jumlah, 0) === H4.totalBagian(b), `bangun ${b.id}: jumlah jenis = jumlah bagian`);
    cek(b.bagian.every((p) => b.jenis.some((j) => j.id === p.jenis)), `bangun ${b.id}: jenis tiap bagian terdaftar`);
    cek(new Set(b.bagian.map((p) => p.id)).size === b.bagian.length, `bangun ${b.id}: id bagian unik`);
    const [kiri, kanan] = H4.kalimatTambah(b).split(" = ");
    cek(kiri.split(" + ").map(Number).reduce((s, n) => s + n, 0) === Number(kanan) && Number(kanan) === H4.totalBagian(b), `kalimat tambah ${b.id}: ${H4.kalimatTambah(b)}`);
    for (const j of h) {
      const kur = H4.kalimatKurang(b, j.id);
      cek(kur === `${H4.totalBagian(b)} − ${j.jumlah} = ${H4.totalBagian(b) - j.jumlah}`, `kalimat kurang ${b.id}/${j.id}: ${kur}`);
    }
    cek(H4.kalimatKurang(b, "tidak-ada") === null, `kalimat kurang jenis tak dikenal ${b.id}`);
    cek(b.bagian.every((p) => /^M/.test(p.d)), `bangun ${b.id}: jalur SVG`);
  }
  const kereta = H4.bangunDari("kereta");
  sama(H4.hitungJenis(kereta).map((x) => x.jumlah), [5, 1, 3], "kereta: 5 segi empat, 1 segitiga, 3 lengkung");
  sama(H4.kalimatTambah(kereta), "5 + 1 + 3 = 9", "kalimat kereta");
  sama(H4.kalimatKurang(kereta, "lengkung"), "9 − 3 = 6", "kereta tanpa roda");
  const rumah = H4.bangunDari("rumah");
  sama(H4.hitungJenis(rumah).map((x) => x.jumlah), [3, 1], "rumah: 3 segi empat, 1 segitiga");
  const lidi = H4.bangunDari("rumah-lidi");
  sama(H4.kalimatTambah(lidi), "4 + 2 = 6", "rumah lidi: 4 + 2 = 6");
  sama(lidi.satuan, "lidi", "satuan lidi");
  sama(H4.bangunDari("tak-dikenal").id, "kereta", "bangun tak dikenal jatuh ke kereta");
  cek(/9 bagian/.test(H4.ucapanBangun(kereta, false, null, false)) && /5 \+ 1 \+ 3 = 9/.test(H4.ucapanBangun(kereta, false, null, false)), "ucapan kereta");
  cek(/diuraikan/.test(H4.ucapanBangun(kereta, true, null, false)) && !/diuraikan/.test(H4.ucapanBangun(kereta, false, null, false)), "ucapan urai");
  cek(/9 − 3 = 6/.test(H4.ucapanBangun(kereta, false, "lengkung", true)) && !/9 − 3/.test(H4.ucapanBangun(kereta, false, "lengkung", false)), "ucapan ambil jenis");
}

{
  // Laboratorium Ciri Bentuk di Sub-Bab A: kelompok bentuk memakai kata Sub-Bab A.
  sama(C4.kelompokBentuk("lingkaran"), "Bentuk lengkung", "kelompok lingkaran");
  sama(C4.kelompokBentuk("segitiga"), "Segitiga", "kelompok segitiga");
  sama(C4.kelompokBentuk("persegi"), "Segi empat", "kelompok persegi");
  sama(C4.kelompokBentuk("persegi-panjang"), "Segi empat", "kelompok persegi panjang");
  cek(/Campuran/.test(C4.kelompokBentuk("setengah-lingkaran")), "kelompok setengah lingkaran");
  for (const s of C4.SUSUNAN) {
    cek(/Ada \d bagian/.test(C4.ucapanSusun(s, false)), `ucapan susun terpisah ${s.id}`);
    cek(C4.ucapanSusun(s, true).includes(s.kalimat) && /menguraikannya lagi/.test(C4.ucapanSusun(s, true)), `ucapan susun gabung ${s.id}`);
  }
  // Papan paku: sudut siku boleh dihilangkan dari ucapan (Sub-Bab A).
  let papan = P4.papanKosong();
  for (const t of [[0, 0], [2, 0], [2, 2], [0, 2]]) papan = P4.pasangPaku(papan, t);
  papan = P4.tutupBentuk(papan);
  cek(/Sudut siku ada 4/.test(P4.ucapanBentuk(papan, false)) && /Sudut siku ada 4/.test(P4.ucapanBentuk(papan, false, true)), "ucapan papan paku memuat sudut siku bawaan");
  cek(!/siku/.test(P4.ucapanBentuk(papan, false, false)) && /persegi/.test(P4.ucapanBentuk(papan, false, false)), "ucapan papan paku tanpa sudut siku");
}
{
  // Bab 5 Sub-Bab A: kalimat sepuluh dulu, tanpa istilah puluhan dan satuan.
  sama(P5.kalimatSepuluh(13), "10 + 3 = 13", "kalimat sepuluh 13");
  sama(P5.kalimatSepuluh(20), "10 + 10 = 20", "kalimat sepuluh 20");
  sama(P5.kalimatSepuluh(10), "10 + 0 = 10", "kalimat sepuluh 10");
  cek(/belum ada sepuluh/.test(P5.kalimatSepuluh(7)), "kalimat sepuluh di bawah 10");
  sama(P5.kalimatSepuluh(99), "10 + 10 = 20", "kalimat sepuluh dibatasi 20");
  for (let n = 0; n <= 20; n++) {
    for (const ikat of [false, true]) {
      const a = P5.ucapanPuluhan(n, ikat, false);
      cek(!/puluhan|satuan/.test(a), `ucapan Sub-Bab A ${n}/${ikat} tanpa istilah puluhan dan satuan`);
      cek(a.includes(`Bilangan ${n}.`), `ucapan Sub-Bab A ${n} menyebut bilangannya`);
      cek(n < 10 || a.includes(`Sepuluh ditambah ${n - 10} sama dengan ${n}`), `ucapan Sub-Bab A ${n} menyebut sepuluh dan sisanya`);
      const c = P5.ucapanPuluhan(n, ikat, true);
      cek(n < 10 ? /satuan/.test(c) : /puluhan dan/.test(c), `ucapan nilai tempat ${n}`);
    }
  }
  cek(/satu kotak/.test(P5.ucapanPuluhan(12, true, false)) && !/satu kotak/.test(P5.ucapanPuluhan(12, false, false)), "ucapan Sub-Bab A menyebut kotak hanya saat diikat");
}

{
  // Bab 5 Sub-Bab B: maju dan mundur satu demi satu, kisi 1 sampai 20, ulat, tetangga.
  let d = D5.mulaiDari(12);
  sama(D5.sekarang(d), 12, "mulai dari 12");
  sama(D5.ringkasan(d), "Mulai dari 12. Tekan Maju atau Mundur.", "ringkasan awal");
  d = D5.maju(D5.maju(D5.maju(d)));
  sama(D5.sekarang(d), 15, "maju tiga kali dari 12");
  sama(D5.ringkasan(d), "Dari 12 maju 3 langkah sampai 15.", "ringkasan maju");
  sama(D5.urutan(d), "12 → 13 → 14 → 15", "urutan maju");
  d = D5.mundur(D5.mundur(d));
  sama(D5.sekarang(d), 13, "mundur dua kali dari 15");
  sama(D5.ringkasan(d), "Dari 12: maju 3 langkah dan mundur 2 langkah, sampai 13.", "ringkasan campuran");
  sama(D5.hitungLangkah(d), { maju: 3, mundur: 2 }, "hitung langkah");
  const turun = D5.mundur(D5.mundur(D5.mulaiDari(15)));
  sama(D5.ringkasan(turun), "Dari 15 mundur 2 langkah sampai 13.", "ringkasan mundur");
  // Ujung kisi: berhenti dengan petunjuk, bilangan tidak berubah.
  const atas = D5.maju(D5.mulaiDari(20));
  sama(D5.sekarang(atas), 20, "maju di 20 tidak berubah");
  cek(/ujung kisi/.test(atas.pesan), "petunjuk di ujung atas");
  const bawah = D5.mundur(D5.mulaiDari(1));
  sama(D5.sekarang(bawah), 1, "mundur di 1 tidak berubah");
  cek(/awal kisi/.test(bawah.pesan), "petunjuk di awal kisi");
  cek(D5.maju(D5.mulaiDari(5)).pesan === "", "gerak sah tanpa pesan");
  sama(D5.sekarang(D5.mulaiDari(99)), 20, "mulai dibatasi 20");
  sama(D5.sekarang(D5.mulaiDari(-4)), 1, "mulai dibatasi 1");
  // Setiap bilangan 1 sampai 20: maju lalu mundur kembali, dan tetangga benar.
  for (let n = 1; n <= 20; n++) {
    const t = D5.tetangga(n);
    sama(t.sebelum, n > 1 ? n - 1 : null, `sebelum ${n}`);
    sama(t.sesudah, n < 20 ? n + 1 : null, `sesudah ${n}`);
    if (n < 20) sama(D5.sekarang(D5.mundur(D5.maju(D5.mulaiDari(n)))), n, `maju lalu mundur kembali ke ${n}`);
    const w = D5.jendelaUlat(n);
    cek(w.length === 5 && w.includes(n) && w[0] >= 1 && w[4] <= 20 && w.every((x, i) => i === 0 || x === w[i - 1] + 1), `jendela ulat ${n}: ${w.join(",")}`);
    cek(/di antara|Tidak ada bilangan/.test(D5.kalimatTetangga(n)), `kalimat tetangga ${n}`);
    cek(!D5.kalimatUlat(n, true).includes(`${n}.`) || n === 1 || n === 20, `ulat tersembunyi ${n} tidak membocorkan bilangannya`);
  }
  sama(D5.kalimatTetangga(12), "Sebelum 12 adalah 11. Sesudah 12 adalah 13. 12 ada di antara 11 dan 13.", "kalimat tetangga 12");
  sama(D5.kalimatUlat(12, true), "Satu bilangan hilang. Sebelumnya 11, sesudahnya 13. Bilangan apa di antaranya?", "ulat 12 tersembunyi");
  sama(D5.kalimatUlat(12, false), "Deret: 10, 11, 12, 13, 14.", "ulat 12 terbuka");
  sama(D5.jendelaUlat(1), [1, 2, 3, 4, 5], "ulat di ujung bawah");
  sama(D5.jendelaUlat(20), [16, 17, 18, 19, 20], "ulat di ujung atas");
  const kisi = D5.kisiBaris();
  sama(kisi.length, 4, "kisi 4 baris");
  cek(kisi.every((b) => b.length === 5), "kisi 5 per baris");
  sama(kisi.flat(), Array.from({ length: 20 }, (_, i) => i + 1), "kisi 1 sampai 20 berurutan");
  const lompat = D5.jejakLompatan(D5.maju(D5.mundur(D5.maju(D5.mulaiDari(10)))));
  sama(lompat.map((l) => l.maju), [true, false, true], "arah lompatan");
  cek(D5.jejakLompatan(Array.from({ length: 12 }).reduce((x) => D5.maju(x), D5.mulaiDari(1)), 6).length === 6, "lompatan dibatasi");
  cek(D5.ucapanDeret(d, true).includes("Sebelum 13") && !D5.ucapanDeret(d, false).includes("Sebelum"), "ucapan deret memuat tetangga hanya bila diminta");
  cek(D5.urutan(Array.from({ length: 15 }).reduce((x) => D5.maju(x), D5.mulaiDari(1))).startsWith("… "), "urutan panjang dipotong");
}

{
  // Bab 5 Sub-Bab D: banding, pasangkan satu-satu, paling banyak dan sedikit, urutan.
  sama(B5.simbol(12, 15), "<", "simbol kurang dari");
  sama(B5.simbol(15, 12), ">", "simbol lebih dari");
  sama(B5.simbol(7, 7), "=", "simbol sama");
  for (let a = 0; a <= 20; a++) {
    for (let b = 0; b <= 20; b++) {
      const p = B5.pasangkan(a, b);
      if (p.berpasangan !== Math.min(a, b) || p.sisa !== Math.abs(a - b) || p.berpasangan + p.sisa !== Math.max(a, b)) cek(false, `pasangkan ${a},${b}`);
      if ((p.pemilikSisa === "a") !== (a > b) || (p.pemilikSisa === "b") !== (b > a) || (p.pemilikSisa === null) !== (a === b)) cek(false, `pemilik sisa ${a},${b}`);
    }
  }
  cek(true, "pasangkan semua 441 pasangan konsisten");
  sama(B5.kalimatDua("Kira", 12, "Tika", 15), "Tika punya 15, Kira punya 12. Tika lebih banyak. Kira lebih sedikit.", "kalimat dua");
  sama(B5.kalimatDua("Kira", 9, "Wei", 9), "Kira dan Wei sama banyak, masing-masing 9.", "kalimat dua sama");
  sama(B5.kalimatPasangan("Kira", 12, "Tika", 15), "12 jeruk berpasangan. Tika punya sisa 3, jadi Tika lebih banyak dari Kira.", "kalimat pasangan");
  cek(/tidak ada sisa/.test(B5.kalimatPasangan("Kira", 5, "Wei", 5)), "kalimat pasangan sama");
  sama(B5.kalimatPaling([12, 15, 9]), "Paling banyak: Tika (15). Paling sedikit: Wei (9).", "paling awal");
  sama(B5.kalimatPaling([15, 15, 9]), "Paling banyak: Kira dan Tika (15). Paling sedikit: Wei (9).", "paling banyak kembar");
  sama(B5.kalimatPaling([9, 15, 9]), "Paling banyak: Tika (15). Paling sedikit: Kira dan Wei (9).", "paling sedikit kembar");
  sama(B5.kalimatPaling([7, 7, 7]), "Ketiganya sama banyak, masing-masing 7.", "ketiganya sama");
  sama(B5.urutkan([12, 15, 9], true).map((x) => x.n), [9, 12, 15], "urut naik");
  sama(B5.urutkan([12, 15, 9], false).map((x) => x.n), [15, 12, 9], "urut turun");
  sama(B5.urutkan([12, 15, 9], true).map((x) => x.nama), ["Wei", "Kira", "Tika"], "nama mengikuti urutan");
  sama(B5.urutkan([8, 8, 3], true).map((x) => x.nama), ["Wei", "Kira", "Tika"], "yang sama banyak urut menurut nama");
  sama(B5.kalimatUrut([12, 15, 9], true), "Dari terkecil: 9, 12, 15.", "kalimat urut naik");
  sama(B5.kalimatUrut([12, 15, 9], false), "Dari terbesar: 15, 12, 9.", "kalimat urut turun");
  sama(B5.batasBanding(99), 20, "batas atas");
  sama(B5.batasBanding(-3), 0, "batas bawah");
  sama(B5.PASANGAN.length, 3, "tiga pasangan anak");
  cek(/lebih kecil dari/.test(B5.ucapanPasang([12, 15, 9], [0, 1], { pasangan: false, tanda: true })), "ucapan tanda kurang dari");
  cek(!/berpasangan/.test(B5.ucapanPasang([12, 15, 9], [0, 1], { pasangan: false, tanda: true })), "ucapan tanpa pasangan bila dimatikan");
  sama(B5.ucapanTiga([12, 15, 9], { paling: false, urut: false }), "", "ucapan tiga kosong bila semua mati");
}
{
  // Bab 6: selisih pada banding (Sub-Bab A).
  for (let a = 0; a <= 20; a++) {
    for (let b = 0; b <= 20; b++) {
      if (B5.selisihDua(a, b) !== Math.abs(a - b)) cek(false, `selisih ${a},${b}`);
      if (B5.kalimatKurangSelisih(a, b) !== `${Math.max(a, b)} − ${Math.min(a, b)} = ${Math.abs(a - b)}`) cek(false, `kalimat kurang selisih ${a},${b}`);
      const k = B5.kalimatSelisih("Kira", a, "Tika", b);
      if (a === b ? !/sama banyak, jadi selisihnya 0/.test(k) : !k.includes(`Selisihnya ${Math.abs(a - b)}.`)) cek(false, `kalimat selisih ${a},${b}: ${k}`);
    }
  }
  cek(true, "selisih 441 pasangan konsisten");
  sama(B5.kalimatKurangSelisih(6, 9), "9 − 6 = 3", "kurang selisih urut dibalik");
  cek(/Tika 3 lebihnya dari Kira|3 lebihnya dari/.test(B5.kalimatSelisih("Kira", 6, "Tika", 9)) || /lebihnya/.test(B5.kalimatSelisih("Kira", 6, "Tika", 9)), "kalimat selisih memuat lebihnya");
  cek(/kurangnya/.test(B5.kalimatSelisih("Kira", 6, "Tika", 9)), "kalimat selisih memuat kurangnya");
  cek(/selisih/i.test(B5.ucapanPasang([12, 15, 9], [0, 1], { pasangan: true, tanda: false, selisih: true })), "ucapan pasang memuat selisih bila dinyalakan");
  cek(!/selisih/i.test(B5.ucapanPasang([12, 15, 9], [0, 1], { pasangan: true, tanda: false })), "ucapan pasang tanpa selisih bila tidak diminta");
}

{
  // Bab 6 Sub-Bab B dan C: belasan dan satuan, semua pasangan sah, dua operasi.
  for (const op of ["tambah", "kurang"]) {
    let n = 0;
    for (let a = -3; a <= 25; a++) {
      for (let b = -3; b <= 25; b++) {
        const m = E6.rapikanBelasan({ a, b }, op);
        const h = E6.hasilBelasan(m, op);
        if (m.a < E6.minAwal(op) || m.a > E6.maksAwal(op) || m.b < 1) cek(false, `rapikan ${op} ${a},${b}: ${JSON.stringify(m)}`);
        if (h < 10 || h > 19) cek(false, `hasil belasan ${op} ${a},${b}: ${h}`);
        const t = E6.tabelBelasan(m, op);
        if (t[0].puluhan !== 1 || t[1].puluhan !== 1) cek(false, `puluhan tetap ${op} ${m.a},${m.b}`);
        if (t[0].satuan !== m.a - 10 || t[1].satuan !== h - 10) cek(false, `satuan tabel ${op} ${m.a},${m.b}`);
        const p = E6.kalimatPecah(m, op);
        if (p.length !== 3 || p[0] !== `${m.a} = 10 + ${m.a - 10}` || !p[2].endsWith(`= ${h}`)) cek(false, `pecah ${op} ${m.a},${m.b}: ${p}`);
        const rap = E6.rapikanBelasan(m, op);
        if (rap.a !== m.a || rap.b !== m.b) cek(false, `rapikan idempoten ${op} ${m.a},${m.b}`);
        if (op === "kurang") {
          const per = E6.kalimatPeriksa(m);
          if (per !== `${h} + ${m.b} = ${m.a}`) cek(false, `periksa ${m.a},${m.b}: ${per}`);
        }
        const u = E6.ucapanBelasan(m, op, { tabel: true, pecah: true, periksa: true });
        if (!u.includes(`sama dengan ${h}.`)) cek(false, `ucapan ${op} ${m.a},${m.b}`);
        if ((op === "kurang") !== /Periksa:/.test(u)) cek(false, `periksa hanya untuk kurang ${op}`);
        n += 1;
      }
    }
    cek(n === 29 * 29, `belasan ${op}: semua kombinasi diperiksa`);
  }
  sama(E6.awalBelasan("tambah"), { a: 12, b: 3 }, "awal tambah");
  sama(E6.awalBelasan("kurang"), { a: 15, b: 3 }, "awal kurang");
  sama(E6.kalimatBelasan({ a: 12, b: 3 }, "tambah"), "12 + 3 = 15", "kalimat tambah");
  sama(E6.kalimatBelasan({ a: 15, b: 3 }, "kurang"), "15 − 3 = 12", "kalimat kurang");
  sama(E6.kalimatPecah({ a: 12, b: 3 }, "tambah"), ["12 = 10 + 2", "2 + 3 = 5", "10 + 5 = 15"], "pecah tambah");
  sama(E6.kalimatPecah({ a: 15, b: 3 }, "kurang"), ["15 = 10 + 5", "5 − 3 = 2", "10 + 2 = 12"], "pecah kurang");
  sama(E6.batasB(12, "tambah"), 7, "batas penambah 12");
  sama(E6.batasB(15, "kurang"), 5, "batas pengurang 15");
  sama(E6.rapikanBelasan({ a: 19, b: 5 }, "tambah"), { a: 18, b: 1 }, "19 tambah dijepit jadi 18 + 1");
  sama(E6.rapikanBelasan({ a: 10, b: 2 }, "kurang"), { a: 11, b: 1 }, "10 kurang dijepit jadi 11 − 1");
  sama(E6.hasilBelasan({ a: 16, b: 6 }, "kurang"), 10, "satuan habis: 16 − 6 = 10");
  sama(E6.tabelBelasan({ a: 16, b: 6 }, "kurang")[1], { nama: "10", puluhan: 1, satuan: 0 }, "satuan habis di tabel");
}{
  // Bab 7 Sub-Bab A: banding tanpa angka (hanya mata), pensil, dan dua benda.
  const A = { benda: "pita", satuan: "stik", angka: false };
  const P = { benda: "pensil", satuan: "kotak", angka: true };
  for (let i = 0; i < 4; i += 1) {
    for (let j = 0; j < 4; j += 1) {
      const pj = [5, 8, 3, 6];
      const k = D7.bandingDua(pj, i, j, A);
      if (i === j) {
        if (!/dirinya sendiri/.test(k) || !/Pilih pita lain/.test(k)) cek(false, `tanpa angka diri sendiri ${i}`);
      } else {
        if (/\d/.test(k)) cek(false, `tanpa angka tidak boleh memuat angka: ${k}`);
        if (/stik/.test(k)) cek(false, `tanpa angka tidak boleh memuat satuan: ${k}`);
        const lebihI = pj[i] > pj[j];
        const lebih = D7.PITA[lebihI ? i : j].nama;
        const kurang = D7.PITA[lebihI ? j : i].nama;
        if (!k.includes(`Pita ${lebih} lebih panjang dari pita ${kurang}`) || !k.includes(`Pita ${kurang} lebih pendek dari pita ${lebih}`)) cek(false, `tanpa angka kalimat ${i},${j}: ${k}`);
        const kp = D7.bandingDua(pj, i, j, P);
        if (!kp.includes(`Pensil ${lebih} lebih panjang ${Math.abs(pj[i] - pj[j])} kotak dari pensil ${kurang}`)) cek(false, `pensil kotak ${i},${j}: ${kp}`);
      }
    }
  }
  cek(true, "kalimat banding tanpa angka dan pensil kotak untuk semua pasangan");
  sama(D7.bandingDua([5, 5, 3, 6], 0, 1, A), "Pita Merah dan pita Biru sama panjang.", "sama panjang tanpa angka");
  sama(D7.bandingDua([5, 5, 3, 6], 0, 1, P), "Pensil Merah dan pensil Biru sama panjang, masing-masing 5 kotak.", "sama panjang pensil kotak");
  sama(D7.kalimatPaling([5, 8, 3, 6], A), "Terpanjang: pita Biru. Terpendek: pita Hijau.", "paling tanpa angka");
  sama(D7.kalimatPaling([5, 8, 3, 6]), "Terpanjang: pita Biru (8 stik). Terpendek: pita Hijau (3 stik).", "paling bawaan berangka");
  sama(D7.kalimatPaling([8, 8, 3, 3], A), "Terpanjang: pita Merah dan Biru. Terpendek: pita Hijau dan Kuning.", "paling kembar");
  sama(D7.kalimatPaling([9, 9, 3, 6], P), "Terpanjang: pensil Merah dan Biru (9 kotak). Terpendek: pensil Hijau (3 kotak).", "paling pensil kotak");
  cek(!/\d/.test(D7.ucapanBanding([5, 8, 3, 6], true, false, A)) && /belum sejajar/.test(D7.ucapanBanding([5, 8, 3, 6], true, false, A)) && /Pensil/.test(D7.ucapanBanding([5, 8, 3, 6], false, true, { ...A, benda: "pensil" })), "ucapan banding tanpa angka");
  cek(/Ketuk kedua pita/.test(D7.ucapanDua([5, 8], true, [], A)) && !/belum sejajar/.test(D7.ucapanDua([5, 8], true, [], A)) && /belum sejajar/.test(D7.ucapanDua([5, 8], false, [0, 1], A)) && /Pita Biru lebih panjang dari pita Merah/.test(D7.ucapanDua([5, 8], true, [0, 1], A)), "ucapan dua pita");
  sama(D7.GAYA_BAWAAN, { benda: "pita", satuan: "stik", angka: true }, "gaya bawaan berangka");
  // dua pita: geseran tidak sejajar ada untuk dua yang pertama dan muat
  cek(D7.GESER_TAK_SEJAJAR.slice(0, 2).some((g) => g > 0), "dua pita pertama tidak sejajar di awal");
}

{
  // Bab 7 Sub-Bab A: tinggi dan rendah (posisi kupu-kupu).
  sama(Q7.KUPU.length, 3, "tiga kupu-kupu");
  sama(Q7.TINGGI_AWAL, [3, 6, 9], "awal mengikuti cerita buku");
  sama(Q7.ubahTinggi([3, 6, 9], 0, 1), [4, 6, 9], "naikkan kuning");
  sama(Q7.ubahTinggi([1, 6, 9], 0, -1), [1, 6, 9], "tinggi minimal 1");
  sama(Q7.ubahTinggi([3, 6, 10], 2, 1), [3, 6, 10], "tinggi maksimal 10");
  sama(Q7.ubahTinggi([3, 6, 9], 7, 1), [3, 6, 9], "indeks di luar daftar diabaikan");
  sama(Q7.tertinggi([3, 6, 9]), [2], "tertinggi");
  sama(Q7.terendah([3, 6, 9]), [0], "terendah");
  sama(Q7.tertinggi([9, 6, 9]), [0, 2], "tertinggi kembar");
  sama(Q7.terendah([3, 3, 9]), [0, 1], "terendah kembar");
  sama(Q7.kalimatPalingPosisi([3, 6, 9]), "Paling tinggi: kupu-kupu hijau. Paling rendah: kupu-kupu kuning.", "kalimat paling awal");
  sama(Q7.kalimatPalingPosisi([9, 6, 9]), "Paling tinggi: kupu-kupu kuning dan kupu-kupu hijau. Paling rendah: kupu-kupu merah.", "kalimat paling kembar");
  sama(Q7.kalimatPalingPosisi([5, 5, 5]), "Ketiga kupu-kupu sama tinggi.", "ketiganya sama tinggi");
  for (let i = 0; i < 3; i += 1) {
    for (let j = 0; j < 3; j += 1) {
      const t = [3, 6, 9];
      const k = Q7.bandingPosisi(t, i, j);
      if (i === j) {
        if (!/dirinya sendiri/.test(k)) cek(false, `posisi diri sendiri ${i}`);
      } else {
        const atas = Q7.KUPU[t[i] > t[j] ? i : j].nama;
        const bawah = Q7.KUPU[t[i] > t[j] ? j : i].nama;
        if (!k.includes(`Kupu-kupu ${atas} terbang lebih tinggi dari kupu-kupu ${bawah}`) || !k.includes(`Kupu-kupu ${bawah} terbang lebih rendah dari kupu-kupu ${atas}`)) cek(false, `posisi ${i},${j}: ${k}`);
        if (/\d/.test(k)) cek(false, `posisi tanpa angka ${i},${j}`);
      }
    }
  }
  cek(true, "banding posisi semua pasangan konsisten");
  cek(/sama tinggi/.test(Q7.bandingPosisi([5, 5, 9], 0, 1)), "dua kupu-kupu sama tinggi");
  sama(Q7.pilihKupu([], 1), [1], "pilih kupu pertama");
  sama(Q7.pilihKupu([1], 2), [1, 2], "pilih kupu kedua");
  sama(Q7.pilihKupu([1, 2], 0), [2, 0], "pilih kupu ketiga menggeser yang tertua");
  sama(Q7.pilihKupu([1, 2], 1), [2], "ketuk lagi melepas");
  cek(/Paling tinggi/.test(Q7.ucapanPosisi([3, 6, 9], [])) && /lebih tinggi/.test(Q7.ucapanPosisi([3, 6, 9], [0, 2])), "ucapan posisi");
}

{
  // Bab 7 Sub-Bab B: tebak dan campur alat ukur di Meja Ukur.
  sama(U7.kalimatTebak(4, 5, "Stik"), "Tebakanmu 4 stik, hasil ukurnya 5 stik. Selisihnya 5 − 4 = 1.", "tebak kurang");
  sama(U7.kalimatTebak(7, 4, "Stik"), "Tebakanmu 7 stik, hasil ukurnya 4 stik. Selisihnya 7 − 4 = 3.", "tebak lebih");
  sama(U7.kalimatTebak(4, 4, "Klip kecil"), "Tebakanmu 4 klip kecil, hasil ukurnya 4 klip kecil. Tebakanmu tepat!", "tebak tepat");
  for (const id of ["balok", "stik", "klip"]) {
    const lain = U7.satuanLain(id);
    cek(lain.id !== id, `satuan lain berbeda dari ${id}`);
    for (let n = 0; n <= 9; n += 1) {
      const dasar = { id, n, dariTengah: false, celah: false, tumpuk: false };
      const h0 = U7.susun(dasar);
      const h1 = U7.susun({ ...dasar, campur: false });
      if (JSON.stringify(h0) !== JSON.stringify(h1)) cek(false, `campur mati sama dengan bawaan ${id} ${n}`);
      if (!h0.kotak.every((k) => k.id === id)) cek(false, `semua kotak satu jenis ${id} ${n}`);
      const hc = U7.susun({ ...dasar, campur: true });
      const jenis = new Set(hc.kotak.map((k) => k.id));
      if (n >= 2) {
        if (jenis.size !== 2 || hc.status !== "salah-cara" || !hc.masalah.some((m) => /dicampur/.test(m))) cek(false, `campur dianggap salah ${id} ${n}`);
      } else if (hc.masalah.some((m) => /dicampur/.test(m))) cek(false, `satu alat belum bisa dicampur ${id} ${n}`);
      // kotak tetap berderet rapat tanpa celah dan tanpa tumpukan
      for (let i = 1; i < hc.kotak.length; i += 1) if (hc.kotak[i].x !== hc.kotak[i - 1].x + hc.kotak[i - 1].lebar) cek(false, `deret rapat ${id} ${n}`);
    }
  }
  cek(true, "campur alat ukur diperiksa untuk semua satuan dan jumlah");
  cek(/Tebakanmu 3 stik/.test(U7.ucapanUkur({ id: "stik", n: 4, dariTengah: false, celah: false, tumpuk: false }, 3)) && !/Tebakanmu/.test(U7.ucapanUkur({ id: "stik", n: 4, dariTengah: false, celah: false, tumpuk: false })), "ucapan ukur memuat tebakan bila diminta");
  cek(!/Tebakanmu/.test(U7.ucapanUkur({ id: "stik", n: 2, dariTengah: false, celah: false, tumpuk: false }, 3)), "ucapan belum pas tidak memuat tebakan");
}

/* ---------------- Misi dan tantangan bebas (pola hibrida) ---------------- */
{
  const kosong = new Set();
  const U = (id, n, status, tebak) => ({ alat: "ukur", id, n, status, tebak });
  const Bd = (o) => ({ alat: "banding", panjang: [5, 8, 3, 6], sejajar: false, urut: false, dipilih: [], satuan: "stik", angka: false, ...o });
  const BdB = (o) => Bd({ panjang: [5, 9, 3, 6], satuan: "kotak", angka: true, ...o });
  const Ps = (o) => ({ alat: "posisi", tinggi: [3, 6, 9], dipilih: [], ...o });

  // Keadaan awal tiap alat tidak boleh langsung memenuhi misi apa pun.
  for (const sub of ["A", "B"]) {
    const daftar = M7.daftarMisiBab7(sub);
    const awal = [Bd({}), BdB({}), Ps({}), U("stik", 0, "kurang", 5), U("klip", 0, "kurang", 5)];
    for (const k of awal) cek(M0.misiBaru(daftar, k, kosong).length === 0, `bab7 ${sub}: keadaan awal ${k.alat}/${k.satuan ?? k.id ?? ""} tidak memenuhi misi`);
    cek(daftar.filter((m) => m.wajib).length >= 4, `bab7 ${sub}: minimal 4 misi wajib`);
    cek(daftar.some((m) => !m.wajib), `bab7 ${sub}: ada tantangan bebas`);
    cek(new Set(daftar.map((m) => m.id)).size === daftar.length, `bab7 ${sub}: id misi unik`);
  }
  cek(M7.daftarMisiBab7("A") === M7.MISI_A && M7.daftarMisiBab7("B") === M7.MISI_B, "bab7: daftarMisi per sub-bab");

  const ada = (sub, k, id) => M0.misiBaru(M7.daftarMisiBab7(sub), k, kosong).includes(id);
  // Sub-Bab A
  cek(ada("A", Bd({ dipilih: [0, 1] }), "a-dua"), "A: dua pensil dipilih");
  cek(!ada("A", Bd({ dipilih: [0] }), "a-dua"), "A: satu pensil belum cukup");
  cek(ada("A", Bd({ sejajar: true }), "a-sejajar"), "A: sejajar");
  cek(ada("A", Bd({ panjang: [5, 5, 3, 6] }), "a-sama"), "A: dua sama panjang");
  cek(ada("A", Bd({ urut: true }), "a-urut"), "A: urut");
  cek(ada("A", Ps({ tinggi: [7, 6, 9] }), "a-kupu"), "A: kuning lebih tinggi dari merah");
  cek(!ada("A", Ps({ tinggi: [6, 6, 9] }), "a-kupu"), "A: sama tinggi belum cukup");
  cek(ada("A", Bd({ panjang: [5, 8, 9, 6] }), "a-hijau"), "A: hijau paling panjang sendirian");
  cek(!ada("A", Bd({ panjang: [5, 9, 9, 6] }), "a-hijau"), "A: hijau kembar dengan biru bukan tantangan");
  cek(ada("A", Ps({ tinggi: [10, 6, 9] }), "a-puncak"), "A: kuning paling tinggi sendirian");
  cek(!ada("A", Ps({ tinggi: [9, 6, 9] }), "a-puncak"), "A: kuning kembar di puncak bukan tantangan");
  // Sub-Bab B
  cek(ada("B", U("stik", 4, "tepat", 5), "b-stik"), "B: stik tepat");
  cek(!ada("B", U("balok", 3, "tepat", 5), "b-stik"), "B: balok bukan misi stik");
  cek(!ada("B", U("stik", 3, "kurang", 5), "b-stik"), "B: stik kurang belum");
  cek(ada("B", U("stik", 4, "tepat", 4), "b-tebak"), "B: tebakan sama dengan hasil");
  cek(!ada("B", U("stik", 4, "tepat", 5), "b-tebak"), "B: tebakan beda tidak lulus");
  cek(ada("B", U("stik", 4, "salah-cara", 4), "b-salah"), "B: cara salah dicoba");
  cek(ada("B", U("klip", 6, "tepat", 5), "b-klip"), "B: klip tepat");
  cek(ada("B", U("balok", 3, "tepat", 5), "b-balok"), "B: balok tepat");
  cek(ada("B", BdB({ panjang: [5, 9, 7, 6] }), "b-kotak"), "B: hijau 2 kotak lebih panjang dari merah");
  cek(!ada("B", BdB({ panjang: [5, 9, 6, 6] }), "b-kotak"), "B: selisih 1 belum");
  cek(!ada("B", Bd({ panjang: [5, 9, 7, 6] }), "b-kotak"), "B: pensil tanpa angka belum cukup");
  cek(ada("B", BdB({ sejajar: true, urut: true }), "b-ingat"), "B: sejajar dan urut");
  cek(!ada("B", BdB({ sejajar: true }), "b-ingat"), "B: hanya sejajar belum");
  // Hasil benar ketiga satuan dan tebakan awal tidak kebetulan.
  cek(["balok", "stik", "klip"].every((id) => U7.hasilBenar(id) !== 5), "tebakan awal 5 tidak sama dengan hasil benar satuan mana pun");
  for (const id of ["balok", "stik", "klip"]) {
    const n = U7.hasilBenar(id);
    const st = U7.susun({ id, n, dariTengah: false, celah: false, tumpuk: false, campur: false }).status;
    cek(st === "tepat", `ukur ${id} ${n} berstatus tepat`);
  }
  cek(M7.puncakTunggal([1, 3, 2]) === 1 && M7.puncakTunggal([3, 3, 2]) === -1, "puncakTunggal");

  // misiBaru: tidak mengulang yang sudah tercatat, dan tidak mencabut.
  const dA = M7.daftarMisiBab7("A");
  const k1 = Bd({ sejajar: true, urut: true });
  const b1 = M0.misiBaru(dA, k1, kosong);
  sama(b1.sort(), ["a-sejajar", "a-urut"].sort(), "misiBaru memuat yang baru");
  cek(M0.misiBaru(dA, k1, new Set(b1)).length === 0, "misiBaru idempoten");

  // Gerbang
  const tamp = dA.map(({ id, teks, wajib }) => ({ id, teks, wajib }));
  const wajibIds = tamp.filter((m) => m.wajib).map((m) => m.id);
  cek(!M0.wajibSelesai(tamp, kosong), "wajibSelesai: awal belum");
  cek(!M0.wajibSelesai(tamp, new Set(wajibIds.slice(1))), "wajibSelesai: kurang satu belum");
  cek(M0.wajibSelesai(tamp, new Set(wajibIds)), "wajibSelesai: semua wajib");
  cek(M0.wajibSelesai([], kosong), "wajibSelesai: tanpa misi dianggap selesai");
  const h = M0.hitungMisi(tamp, new Set([wajibIds[0], "a-hijau"]));
  sama([h.wajibTercapai, h.wajibTotal, h.bebasTercapai, h.bebasTotal], [1, wajibIds.length, 1, tamp.length - wajibIds.length], "hitungMisi");
  const G = (adaMisi, wajibSelesai, dilewati, disentuh) => ({ adaMisi, wajibSelesai, dilewati, disentuh });
  cek(M0.bolehLanjut(G(false, false, false, true)) && !M0.bolehLanjut(G(false, false, false, false)), "bolehLanjut tanpa misi = disentuh");
  cek(!M0.bolehLanjut(G(true, false, false, true)), "bolehLanjut: misi belum, belum dilewati");
  cek(M0.bolehLanjut(G(true, true, false, true)), "bolehLanjut: wajib selesai");
  cek(M0.bolehLanjut(G(true, false, true, true)), "bolehLanjut: dilewati setelah disentuh");
  cek(!M0.bolehLanjut(G(true, false, true, false)), "bolehLanjut: dilewati tanpa menyentuh tidak cukup");
  cek(M0.bolehLewati(G(true, false, false, true)), "bolehLewati: muncul setelah disentuh");
  cek(!M0.bolehLewati(G(true, false, false, false)), "bolehLewati: belum disentuh");
  cek(!M0.bolehLewati(G(true, true, false, true)) && !M0.bolehLewati(G(true, false, true, true)) && !M0.bolehLewati(G(false, false, false, true)), "bolehLewati: tidak muncul saat sudah selesai, sudah dilewati, atau tanpa misi");
  const u0 = M0.ucapanMisi(tamp, kosong);
  cek(u0.startsWith("Misi wajib 0 dari ") && u0.includes(tamp[0].teks), "ucapanMisi: awal menyebut misi berikutnya");
  cek(M0.ucapanMisi(tamp, new Set(wajibIds)).startsWith("Hebat!"), "ucapanMisi: selesai memuji");
}

/* ---------------- Misi Bab 1 (hibrida) ---------------- */
{
  const kosong = new Set();
  const L = (o) => ({ alat: "bilangan", n: 6, m: 4, a: 2, benda: true, bingkai: false, garis: false, pasangan: false, banding: false, ...o });
  const awalSub = { A: L({}), B: L({ bingkai: true, garis: true, banding: true }), C: L({ bingkai: true, garis: true }), D: L({ bingkai: true, garis: true, pasangan: true }) };
  for (const sub of ["A", "B", "C", "D"]) {
    const daftar = M1.daftarMisiBab1(sub);
    cek(M0.misiBaru(daftar, awalSub[sub], kosong).length === 0, `bab1 ${sub}: keadaan awal tidak memenuhi misi`);
    cek(daftar.filter((m) => m.wajib).length >= 3 && daftar.some((m) => !m.wajib), `bab1 ${sub}: ada misi wajib dan tantangan bebas`);
    cek(new Set(daftar.map((m) => m.id)).size === daftar.length, `bab1 ${sub}: id unik`);
    // Tiap misi harus bisa dicapai: tidak ada misi yang mustahil.
  }
  const ada = (sub, k, id) => M0.misiBaru(M1.daftarMisiBab1(sub), k, kosong).includes(id);
  const SEL = (id) => ({ alat: "selesai", id });
  cek(ada("A", L({ n: 5 }), "a-lima") && ada("A", L({ n: 0 }), "a-nol") && ada("A", L({ n: 10 }), "a-sepuluh") && ada("A", L({ n: 7 }), "a-tujuh"), "bab1 A: wajib");
  cek(ada("A", L({ n: 9 }), "a-sembilan") && ada("A", L({ n: 2 }), "a-dua"), "bab1 A: bebas");
  const B = (o) => L({ bingkai: true, garis: true, banding: true, ...o });
  cek(ada("B", B({ n: 4, m: 4 }), "b-sama") && !ada("B", L({ n: 4, m: 4 }), "b-sama"), "bab1 B: sama hanya bila Bandingkan menyala");
  cek(ada("B", B({ n: 2, m: 7 }), "b-kecil") && !ada("B", B({ n: 7, m: 7 }), "b-kecil"), "bab1 B: kedua lebih besar");
  cek(ada("B", B({ n: 9, m: 4 }), "b-jauh") && !ada("B", B({ n: 8, m: 4 }), "b-jauh"), "bab1 B: selisih lima");
  cek(ada("B", B({ n: 8 }), "b-bingkai") && !ada("B", B({ n: 8, bingkai: false }), "b-bingkai"), "bab1 B: bingkai harus tampil");
  cek(ada("B", B({ n: 3, m: 9 }), "b-garis") && !ada("B", B({ n: 3, m: 9, garis: false }), "b-garis"), "bab1 B: garis harus tampil");
  cek(ada("B", B({ n: 5, m: 4 }), "b-selisih") && !ada("B", B({ n: 6, m: 4 }), "b-selisih"), "bab1 B: beda satu");
  cek(ada("B", B({ n: 10, m: 0 }), "b-ujung") && ada("B", B({ n: 0, m: 10 }), "b-ujung"), "bab1 B: nol dan sepuluh");
  const C = (o) => L({ bingkai: true, garis: true, ...o });
  cek(ada("C", C({ n: 9 }), "c-sembilan") && ada("C", C({ n: 1 }), "c-satu") && ada("C", C({ n: 0 }), "c-nol"), "bab1 C: garis");
  cek(ada("C", SEL("katak"), "c-katak") && !ada("C", SEL("kasir"), "c-katak"), "bab1 C: katak");
  cek(ada("C", C({ banding: true, n: 5, m: 4 }), "c-sebelah") && !ada("C", C({ n: 5, m: 4 }), "c-sebelah"), "bab1 C: bersebelahan");
  const D = (o) => L({ bingkai: true, garis: true, pasangan: true, ...o });
  cek(ada("D", D({ n: 10, a: 6 }), "d-sepuluh") && !ada("D", D({ n: 10, a: 4 }), "d-sepuluh"), "bab1 D: 6 dan 4");
  cek(ada("D", D({ n: 8, a: 4 }), "d-sama") && ada("D", D({ n: 7, a: 0 }), "d-nol"), "bab1 D: sama dan nol");
  cek(!ada("D", D({ n: 8, a: 4, pasangan: false }), "d-sama"), "bab1 D: pasangan harus tampil");
  cek(ada("D", D({ n: 7, a: 9 }), "d-nol") === false, "bab1 D: a dibatasi oleh batasPecah (a besar bukan nol)");
  cek(ada("D", SEL("kasir"), "d-kasir") && ada("D", SEL("katak"), "d-ingat-katak"), "bab1 D: skenario dan katak");
  cek(ada("D", D({ banding: true, n: 5, m: 5 }), "d-ingat-banding"), "bab1 D: ingat banding");
}

/* ---------------- Misi Bab 2 (hibrida) ---------------- */
// Pemeriksa struktur bersama: keadaan awal tidak memenuhi misi, ada wajib dan bebas, id unik.
function ujiStruktur(nama, daftarFn, subs, awalSub) {
  for (const sub of subs) {
    const daftar = daftarFn(sub);
    const awal = awalSub[sub];
    cek(M0.misiBaru(daftar, awal, new Set()).length === 0, `${nama} ${sub}: keadaan awal tidak memenuhi misi`);
    cek(daftar.filter((m) => m.wajib).length >= 3 && daftar.some((m) => !m.wajib), `${nama} ${sub}: ada misi wajib dan tantangan bebas`);
    cek(new Set(daftar.map((m) => m.id)).size === daftar.length, `${nama} ${sub}: id unik`);
    cek(daftar.every((m) => m.teks.length > 10 && m.teks.length < 120), `${nama} ${sub}: teks misi ringkas`);
  }
}
{
  const kosong = new Set();
  const T2 = (o) => ({ alat: "tambah", a: 3, b: 4, ditukar: 0, gabung: false, benda: true, kalimat: true, bingkai: true, garis: false, bagan: false, ...o });
  ujiStruktur("bab2", X2.daftarMisiBab2, ["A", "B", "C"], { A: T2({}), B: T2({ garis: true, bagan: true }), C: T2({ garis: true, bagan: true }) });
  const ada = (sub, k, id) => M0.misiBaru(X2.daftarMisiBab2(sub), k, kosong).includes(id);
  const SEL = (id) => ({ alat: "selesai", id });
  cek(ada("A", T2({ gabung: true }), "a-gabung") && !ada("A", T2({ gabung: true, benda: false }), "a-gabung"), "bab2 A: gabung");
  cek(ada("A", T2({ a: 2, b: 3 }), "a-lima") && ada("A", T2({ a: 5, b: 0 }), "a-nol") && !ada("A", T2({ a: 0, b: 0 }), "a-nol"), "bab2 A: lima dan nol");
  cek(ada("A", T2({ a: 6, b: 4 }), "a-sepuluh") && !ada("A", T2({ a: 6, b: 4, bingkai: false }), "a-sepuluh"), "bab2 A: sepuluh");
  cek(ada("A", SEL("mesin"), "a-mesin") && ada("A", T2({ a: 4, b: 4 }), "a-kembar") && !ada("A", T2({ a: 0, b: 0 }), "a-kembar") && ada("A", T2({ a: 5, b: 4 }), "a-sembilan"), "bab2 A: mesin, kembar, sembilan");
  cek(ada("B", T2({ ditukar: 1 }), "b-tukar") && !ada("B", T2({}), "b-tukar"), "bab2 B: tukar");
  cek(ada("B", T2({ garis: true, a: 6, b: 3 }), "b-garis") && !ada("B", T2({ garis: false, a: 6, b: 3 }), "b-garis"), "bab2 B: garis");
  cek(ada("B", T2({ a: 5, b: 5 }), "b-kembar") && ada("B", T2({ a: 8, b: 2 }), "b-sepuluh") && ada("B", T2({ bagan: true, a: 4, b: 3 }), "b-bagan"), "bab2 B: kembar, sepuluh, bagan");
  cek(ada("B", T2({ ditukar: 1, a: 1, b: 9 }), "b-sembilan") && !ada("B", T2({ a: 1, b: 9 }), "b-sembilan") && ada("B", SEL("mesin"), "b-ingat-mesin"), "bab2 B: bebas");
  cek(ada("C", T2({ a: 5, b: 3 }), "c-cerita") && ada("C", T2({ garis: true, a: 4, b: 2 }), "c-garis") && ada("C", T2({ ditukar: 2, a: 6, b: 2 }), "c-tukar"), "bab2 C: periksa");
  cek(!ada("C", T2({ a: 6, b: 2 }), "c-tukar"), "bab2 C: tukar harus ditekan");
  cek(ada("C", SEL("kantin"), "c-kantin") && ada("C", SEL("mesin"), "c-mesin") && ada("C", T2({ a: 7, b: 3 }), "c-sepuluh"), "bab2 C: kantin, mesin, sepuluh");
}
console.log(`Lulus ${lulus}, gagal ${gagal}`);
process.exit(gagal ? 1 : 0);
