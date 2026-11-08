// Uji logika simulasi Matematika Kelas 1 Bab 1 sampai 7 (lab PhET, lab 2D, mesin keadaan).
// Jalankan: node --no-warnings scripts/uji-lab-kelas1.mjs
import * as B1 from "../src/components/modul/lab-bilangan-bab1.ts";
import * as K1 from "../src/components/modul/mesin-katak-bab1.ts";
import * as T2 from "../src/components/modul/lab-tambah-bab2.ts";
import * as M2 from "../src/components/modul/mesin-tambah-bab2.ts";
import * as K3 from "../src/components/modul/lab-kurang-bab3.ts";
import * as B3 from "../src/components/modul/mesin-bus-bab3.ts";

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

console.log(`Lulus ${lulus}, gagal ${gagal}`);
process.exit(gagal ? 1 : 0);
