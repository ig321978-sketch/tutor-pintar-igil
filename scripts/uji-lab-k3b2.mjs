// Uji logika murni dan misi Matematika Kelas 3 Bab 2 (Kalimat Matematika): Lab Neraca Kalimat (neraca dan Papan
// Kemungkinan), Mesin Kalimat (dua definisi), skenario, dan misi per sub-bab.
// Jalankan: node --no-warnings scripts/uji-lab-k3b2.mjs
import * as M0 from "../src/components/modul/misi-simulasi.ts";
import * as K3 from "../src/components/modul/misi-k3bab2.ts";
import * as L from "../src/components/modul/lab-kalimat-k3b2.ts";
import * as ME from "../src/components/modul/mesin-bertahap-k3b1.ts";
import * as MD from "../src/components/modul/mesin-data-k3b2.ts";
import * as SK from "../src/components/modul/skenario-k3b2.ts";
import * as TK from "../src/components/modul/misi-teks-k3b2.ts";

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

/* ------------------------------ Pembantu ------------------------------ */

/** Geser satu bagian ke nilai target lewat tombol (±10 dan ±1). */
function geser(reducer, x, aksi, bagian, target) {
  let s = x;
  for (let i = 0; i < 400 && s[bagian] !== target; i += 1) {
    const sel = target - s[bagian];
    const d = Math.abs(sel) >= 10 ? (sel > 0 ? 10 : -10) : sel > 0 ? 1 : -1;
    const t = reducer(s, aksi(bagian, d));
    if (t[bagian] === s[bagian]) return t;
    s = t;
  }
  return s;
}
const ubahK = (b, d) => ({ t: "UBAH", bagian: b, d });
const ubahM = (b, d) => ({ t: "UBAH", bagian: b, d });
const gK = (x, b, n) => geser(L.langkahKal, x, ubahK, b, n);
const gM = (x, b, n) => geser(L.langkahMungkin, x, ubahM, b, n);
const kk = (x, ...a) => a.reduce((s, ak) => L.langkahKal(s, ak), x);

/** Atur bilangan diketahui dan hasil (urutan dicoba dua cara), lalu isi kotak. Tombol saja. */
function setKal(x, tahu, hasil, isi) {
  for (const urut of [["tahu", "hasil"], ["hasil", "tahu"]]) {
    let s = x;
    for (let putaran = 0; putaran < 2; putaran += 1) for (const b of urut) s = gK(s, b, b === "tahu" ? tahu : hasil);
    if (s.tahu === tahu && s.hasil === hasil) return gK(s, "isi", isi);
  }
  return null;
}
const k = (x) => L.keadaanKal(x);
const sel = (id) => ({ alat: "selesai", id });

/* ------------------------------ Logika kalimat ------------------------------ */

// Kalimat sah bila dan hanya bila ada isi 0..100 yang membuat neraca seimbang, dan isinya tunggal.
{
  let salahSah = 0;
  let salahTunggal = 0;
  let salahJawab = 0;
  let totalSah = 0;
  for (const op of ["tambah", "kurang"]) {
    for (const letak of ["tengah", "depan"]) {
      for (let tahu = 0; tahu <= 100; tahu += 1) {
        for (let hasil = 0; hasil <= 100; hasil += 1) {
          const cocok = [];
          for (let isi = 0; isi <= 100; isi += 1) if (L.nilaiKiri({ op, letak, tahu, isi }) === hasil) cocok.push(isi);
          const sah = L.sahKal({ op, letak, tahu, hasil });
          if (sah !== (cocok.length > 0)) salahSah += 1;
          if (cocok.length > 1) salahTunggal += 1;
          if (sah) {
            totalSah += 1;
            if (cocok[0] !== L.jawabKal({ op, letak, tahu, hasil })) salahJawab += 1;
          }
        }
      }
    }
  }
  cek(salahSah === 0, `sahKal sama dengan "ada isi yang membuat seimbang" (selisih ${salahSah})`);
  cek(salahTunggal === 0, `isi yang membuat seimbang selalu tunggal (selisih ${salahTunggal})`);
  cek(salahJawab === 0, `jawabKal sama dengan isi hasil pencarian (selisih ${salahJawab})`);
  cek(totalSah > 10000, `banyak kalimat sah ${totalSah}`);
}

// Kunci operasi kebalikan: ungkapan kebalikan dihitung dan hasilnya sama dengan jawab. Selalu bilangan cacah.
{
  let salah = 0;
  for (const op of ["tambah", "kurang"])
    for (const letak of ["tengah", "depan"])
      for (let tahu = 0; tahu <= 100; tahu += 1)
        for (let hasil = 0; hasil <= 100; hasil += 1) {
          const c = { op, letak, tahu, hasil };
          if (!L.sahKal(c)) continue;
          const m = L.ungkapanBalik(c).match(/^(\d+) ([+−]) (\d+)$/);
          if (!m) {
            salah += 1;
            continue;
          }
          const nilai = m[2] === "+" ? Number(m[1]) + Number(m[3]) : Number(m[1]) - Number(m[3]);
          if (nilai !== L.jawabKal(c) || nilai < 0 || nilai > 100 || m[2] !== L.tandaBalik(c)) salah += 1;
        }
  cek(salah === 0, `ungkapan kebalikan sama dengan jawab untuk semua kalimat sah (selisih ${salah})`);
  sama(L.kalimatBalik({ op: "tambah", letak: "tengah", tahu: 8, hasil: 19 }), "19 − 8 = 11", "kebalikan 8 + … = 19");
  sama(L.kalimatBalik({ op: "tambah", letak: "depan", tahu: 16, hasil: 54 }), "54 − 16 = 38", "kebalikan … + 16 = 54");
  sama(L.kalimatBalik({ op: "kurang", letak: "tengah", tahu: 80, hasil: 45 }), "80 − 45 = 35", "kebalikan 80 − … = 45");
  sama(L.kalimatBalik({ op: "kurang", letak: "depan", tahu: 45, hasil: 27 }), "45 + 27 = 72", "kebalikan … − 45 = 27");
  sama(L.kalimatKal({ op: "kurang", letak: "depan", tahu: 45, hasil: 27 }), "… − 45 = 27", "kalimat depan");
  sama(L.kalimatKal({ op: "tambah", letak: "tengah", tahu: 8, hasil: 19 }), "8 + … = 19", "kalimat tengah");
  sama(L.kalimatPeriksaKal({ op: "kurang", letak: "depan", tahu: 45, hasil: 27 }), "72 − 45 = 27", "kalimat periksa");
  cek(L.balikMengambil({ op: "tambah", letak: "tengah", tahu: 8, hasil: 19 }) === false, "19 − 8: satuan 9 cukup, tidak mengambil");
  cek(L.balikMengambil({ op: "tambah", letak: "depan", tahu: 16, hasil: 54 }) === true, "54 − 16: satuan 4 kurang dari 6, mengambil");
  cek(L.balikMengambil({ op: "kurang", letak: "depan", tahu: 45, hasil: 27 }) === false, "45 + 27 adalah penjumlahan, tidak mengambil");
}

/* ------------------------------ Reducer neraca ------------------------------ */

// Keadaan awal: tidak seimbang, tidak ada tampilan, tidak ada riwayat.
for (const mode of ["A", "B"]) {
  const x = L.awalKal(mode);
  const keadaan = k(x);
  cek(L.sahKal(x), `awal ${mode} sah`);
  cek(!keadaan.seimbang && !keadaan.bagan && !keadaan.kebalikan && !keadaan.periksa, `awal ${mode} tidak seimbang dan semua tampilan mati`);
  cek(x.isi === 0 && x.pernah.length === 0 && x.pernahBalik.length === 0 && !x.tukarSeimbang && !x.tukarDitolak, `awal ${mode} bersih`);
  cek(L.statusKal(x) === (mode === "A" ? "kurang" : "lebih"), `awal ${mode}: neraca belum seimbang (30 + 0 < 50, 32 − 0 > 15)`);
}
sama(L.kalimatKal(L.awalKal("A")), "30 + … = 50", "awal A");
sama(L.kalimatKal(L.awalKal("B")), "32 − … = 15", "awal B");
cek(L.awalKal("A").op === "tambah", "mode A mulai dari penjumlahan");

// Mode A tidak bisa berganti ke pengurangan.
cek(kk(L.awalKal("A"), { t: "OP", op: "kurang" }).op === "tambah", "mode A menolak ganti ke pengurangan");

// Neraca: kurang, seimbang, lebih.
{
  let x = L.awalKal("A");
  x = gK(x, "isi", 10);
  cek(L.statusKal(x) === "kurang" && !L.seimbangKal(x), "30 + 10 = 40 lebih kecil dari 50: kurang");
  x = gK(x, "isi", 20);
  cek(L.statusKal(x) === "seimbang" && L.seimbangKal(x), "30 + 20 = 50: seimbang");
  x = gK(x, "isi", 25);
  cek(L.statusKal(x) === "lebih", "30 + 25 = 55 lebih dari 50: lebih");
}

// Pengurangan di depan: isi lebih kecil dari yang dikurangkan tidak bisa dihitung.
{
  let x = kk(L.awalKal("B"), { t: "LETAK", letak: "depan" });
  x = gK(x, "isi", 3);
  cek(L.statusKal(x) === "takbisa" && L.nilaiKiri(x) === null, "3 − 32 tidak bisa dihitung (takbisa)");
  const p = L.langkahKal(x, { t: "PERIKSA" });
  cek(!p.periksa && p.pesan.length > 5, "Periksa ditolak saat takbisa");
}

// Periksa hanya saat seimbang, dan hilang bila angka diubah.
{
  let x = L.awalKal("A");
  const salah = L.langkahKal(x, { t: "PERIKSA" });
  cek(!salah.periksa && salah.pesan.length > 5, "Periksa ditolak saat belum seimbang");
  x = gK(x, "isi", 20);
  x = L.langkahKal(x, { t: "PERIKSA" });
  cek(x.periksa && k(x).periksa, "Periksa diterima saat seimbang");
  x = L.langkahKal(x, { t: "UBAH", bagian: "isi", d: 1 });
  cek(!x.periksa, "Periksa dicabut setelah isi diubah");
}

// Batas: bilangan 0 sampai 100, hasil pengurangan tidak negatif, dan tolak dengan pesan.
{
  let x = L.awalKal("A");
  const bawah = L.langkahKal(x, { t: "UBAH", bagian: "isi", d: -1 });
  cek(bawah.isi === 0 && bawah.pesan.length > 5, "isi tidak di bawah nol");
  x = gK(x, "isi", 100);
  const atas = L.langkahKal(x, { t: "UBAH", bagian: "isi", d: 1 });
  cek(atas.isi === 100 && atas.pesan.length > 5, "isi tidak melewati 100");
  // Jumlah tidak lebih kecil dari bagiannya: hasil tidak turun di bawah bilangan diketahui.
  const turun = gK(L.awalKal("A"), "hasil", 10);
  cek(turun.hasil >= turun.tahu, "penjumlahan: jumlah tidak lebih kecil dari bagian");
  const naik = gK(L.awalKal("A"), "tahu", 100);
  cek(naik.tahu <= naik.hasil, "penjumlahan: bagian tidak lebih besar dari jumlah");
  // Pengurangan: sisa tidak melebihi bilangan awal.
  const sisa = gK(L.awalKal("B"), "hasil", 100);
  cek(sisa.hasil <= sisa.tahu, "pengurangan: sisa tidak melebihi bilangan awal");
  const awalKecil = gK(L.awalKal("B"), "tahu", 0);
  cek(awalKecil.tahu >= awalKecil.hasil, "pengurangan: bilangan awal tidak di bawah sisa");
  // Pengurangan titik-titik di depan: bilangan awalnya tidak lebih dari 100.
  let d = kk(L.awalKal("B"), { t: "LETAK", letak: "depan" });
  d = gK(d, "tahu", 90);
  const lewat = gK(d, "hasil", 20);
  cek(lewat.tahu + lewat.hasil <= 100, "pengurangan depan: awal tidak lebih dari 100");
  const j = L.jawabKal(lewat);
  cek(j >= 0 && j <= 100, "jawaban selalu dalam 0 sampai 100");
}

// Tukar tempat: penjumlahan tetap seimbang, pengurangan ditolak dan tidak berubah.
{
  let x = gK(L.awalKal("A"), "isi", 20);
  const awal = L.seimbangKal(x);
  const y = L.langkahKal(x, { t: "TUKAR" });
  cek(awal && L.seimbangKal(y) && y.letak === "depan" && y.tukarSeimbang && k(y).tukarSeimbang, "penjumlahan: tukar tempat tetap seimbang (30 + 20 = 20 + 30)");
  cek(!L.langkahKal(L.awalKal("A"), { t: "TUKAR" }).tukarSeimbang, "tukar saat belum seimbang tidak dicatat sebagai seimbang");
  let b = gK(L.awalKal("B"), "isi", 17);
  cek(L.seimbangKal(b), "32 − 17 = 15 seimbang");
  const t = L.langkahKal(b, { t: "TUKAR" });
  cek(t.letak === b.letak && t.tahu === b.tahu && t.hasil === b.hasil && t.isi === b.isi && t.op === "kurang", "pengurangan: kalimat tidak berubah saat tukar");
  cek(t.tukarDitolak && k(t).tukarDitolak && t.pesan.includes("tidak boleh ditukar"), "pengurangan: tukar ditolak dengan alasan");
}

// Ganti operasi (mode B): satu bagan dibaca dua cara.
{
  let x = setKal(L.awalKal("B"), 80, 45, 35);
  cek(x !== null && L.seimbangKal(x), "B: 80 − … = 45 seimbang pada 35");
  const y = L.langkahKal(x, { t: "OP", op: "tambah" });
  cek(y.op === "tambah" && y.tahu === 45 && y.hasil === 80 && y.letak === "tengah" && y.isi === 0, "ganti ke Tambah: menjadi 45 + … = 80");
  cek(!L.seimbangKal(y), "setelah ganti operasi, isi dikosongkan dan belum seimbang");
  const z = gK(y, "isi", 35);
  cek(L.seimbangKal(z) && z.pernah.includes("tambah:tengah:45:80") && z.pernah.includes("kurang:tengah:80:45"), "kedua kalimat satu bagan tercatat");
  const d = L.langkahKal(setKal(kk(L.awalKal("B"), { t: "LETAK", letak: "depan" }), 45, 27, 72), { t: "OP", op: "tambah" });
  cek(d.op === "tambah" && d.tahu === 27 && d.hasil === 45, "… − 45 = 27 diganti ke Tambah menjadi … + 27 = 45");
}

// Kebalikan dicatat per bentuk hanya saat menyala dan seimbang.
{
  let x = gK(L.awalKal("A"), "isi", 20);
  cek(x.pernahBalik.length === 0, "seimbang tanpa Kebalikan tidak dicatat");
  x = L.langkahKal(x, { t: "TOGGLE", rep: "kebalikan" });
  cek(x.pernahBalik.includes("tambah:tengah"), "menyalakan Kebalikan pada kalimat seimbang dicatat");
  const mati = L.langkahKal(x, { t: "TOGGLE", rep: "kebalikan" });
  cek(mati.pernahBalik.includes("tambah:tengah"), "riwayat tidak dicabut saat Kebalikan dimatikan");
}

// Riwayat dibatasi.
{
  let x = L.awalKal("A");
  for (let i = 0; i < 100; i += 1) x = gK(gK(x, "hasil", 50 + (i % 40)), "isi", 20 + (i % 40));
  cek(x.pernah.length <= 60, `riwayat dibatasi 60 (ada ${x.pernah.length})`);
}

// Reset mengembalikan semuanya.
{
  const x = L.langkahKal(gK(kk(L.awalKal("B"), { t: "TOGGLE", rep: "bagan" }), "isi", 17), { t: "RESET" });
  sama(x, L.awalKal("B"), "reset neraca");
}

// Fuzz deterministik: invarian terjaga untuk 30.000 aksi acak di kedua mode.
{
  let seed = 12345;
  const acak = (n) => {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    return seed % n;
  };
  const LANGKAH = [1, -1, 10, -10];
  const BAG = ["tahu", "hasil", "isi"];
  for (const mode of ["A", "B"]) {
    let x = L.awalKal(mode);
    let rusak = 0;
    for (let i = 0; i < 15000; i += 1) {
      const r = acak(10);
      const aksi =
        r < 6
          ? { t: "UBAH", bagian: BAG[acak(3)], d: LANGKAH[acak(4)] }
          : r === 6
            ? { t: "LETAK", letak: acak(2) ? "depan" : "tengah" }
            : r === 7
              ? { t: "OP", op: acak(2) ? "tambah" : "kurang" }
              : r === 8
                ? { t: "TOGGLE", rep: acak(2) ? "bagan" : "kebalikan" }
                : acak(3) === 0
                  ? { t: "TUKAR" }
                  : { t: "PERIKSA" };
      x = L.langkahKal(x, aksi);
      const kiri = L.nilaiKiri(x);
      if (!L.sahKal(x)) rusak += 1;
      if (x.isi < 0 || x.isi > 100 || x.tahu < 0 || x.tahu > 100 || x.hasil < 0 || x.hasil > 100) rusak += 1;
      if (L.seimbangKal(x) !== (kiri !== null && kiri === x.hasil)) rusak += 1;
      if (x.periksa && !L.seimbangKal(x)) rusak += 1;
      if (mode === "A" && x.op !== "tambah") rusak += 1;
      if (L.seimbangKal(x) && L.jawabKal(x) !== x.isi) rusak += 1;
      if (x.pernah.length > 60) rusak += 1;
      if (kiri !== null && kiri < 0) rusak += 1;
    }
    cek(rusak === 0, `fuzz neraca mode ${mode}: invarian terjaga (pelanggaran ${rusak})`);
  }
}

/* ------------------------------ Bagan ------------------------------ */
{
  const b1 = L.baganKal({ op: "tambah", letak: "tengah", tahu: 30, hasil: 50 });
  cek(b1.atas.nilai === 50 && b1.bawah[0].nilai === 30 && b1.bawah[1].nilai === null, "bagan tambah tengah: jumlah di atas, bagian yang dicari bertanda tanya");
  const b2 = L.baganKal({ op: "kurang", letak: "tengah", tahu: 80, hasil: 45 });
  cek(b2.atas.nilai === 80 && b2.bawah[1].nilai === 45 && b2.bawah[0].nilai === null, "bagan kurang tengah: awal di atas, sisa diketahui");
  const b3 = L.baganKal({ op: "kurang", letak: "depan", tahu: 45, hasil: 27 });
  cek(b3.atas.nilai === null && b3.bawah[0].nilai === 45 && b3.bawah[1].nilai === 27, "bagan kurang depan: bilangan awal bertanda tanya");
  for (const op of ["tambah", "kurang"])
    for (const letak of ["tengah", "depan"]) {
      const c = { op, letak, tahu: op === "tambah" ? 8 : 40, hasil: op === "tambah" ? 19 : 25 };
      const b = L.baganKal(c);
      const kosong = [b.atas, ...b.bawah].filter((n) => n.nilai === null).length;
      cek(kosong === 1, `bagan ${op} ${letak}: tepat satu kotak bertanda tanya`);
    }
}

/* ------------------------------ Papan Kemungkinan ------------------------------ */
{
  for (const mode of ["A", "B"]) {
    const m = L.awalMungkin(mode);
    cek(m.catat.length === 0 && !L.pasMungkin(m) && m.a === 0 && m.b === 0, `awal kemungkinan ${mode} kosong dan belum pas`);
    cek(!L.keadaanMungkin(m).pas && L.keadaanMungkin(m).banyak === 0, `keadaan awal kemungkinan ${mode} bersih`);
  }
  cek(L.awalMungkin("A").total === 50 && L.awalMungkin("B").total === 80, "total awal A 50 dan B 80");

  let m = L.awalMungkin("A");
  m = gM(L.langkahMungkin(m, { t: "UBAH", bagian: "total", d: 10 }), "total", 100);
  cek(m.total === 100, "total dapat dinaikkan ke 100");
  const catat = (s, a, b) => L.langkahMungkin(gM(gM(s, "a", a), "b", b), { t: "CATAT" });
  const kurangCatat = L.langkahMungkin(gM(gM(m, "a", 60), "b", 30), { t: "CATAT" });
  cek(kurangCatat.catat.length === 0 && kurangCatat.pesan.length > 5, "pasangan yang jumlahnya kurang ditolak");
  const lebihCatat = L.langkahMungkin(gM(gM(m, "a", 60), "b", 50), { t: "CATAT" });
  cek(lebihCatat.catat.length === 0 && lebihCatat.pesan.length > 5, "pasangan yang jumlahnya lebih ditolak");
  m = catat(m, 60, 40);
  cek(m.catat.length === 1, "60 + 40 dicatat");
  const ganda = L.langkahMungkin(m, { t: "CATAT" });
  cek(ganda.catat.length === 1 && ganda.pesan.length > 5, "pasangan sama tidak dicatat dua kali");
  const tukar = catat(m, 40, 60);
  cek(tukar.catat.length === 1, "A: 40 + 60 sama dengan 60 + 40 (penjumlahan boleh ditukar) dan tidak dihitung dua kali");
  m = catat(m, 75, 25);
  m = catat(m, 55, 45);
  cek(m.catat.length === 3 && L.keadaanMungkin(m).banyak === 3, "tiga pasangan berbeda tercatat");
  cek(L.keadaanMungkin(m).total === 100, "keadaan memuat total");
  const ubahTotal = L.langkahMungkin(m, { t: "UBAH", bagian: "total", d: -1 });
  cek(ubahTotal.catat.length === 0 && ubahTotal.total === 99, "mengganti jumlah mengosongkan catatan");
  const nolTotal = gM(L.awalMungkin("A"), "total", 2);
  cek(L.langkahMungkin(nolTotal, { t: "UBAH", bagian: "total", d: -1 }).total === 2, "total paling kecil 2");
  cek(L.langkahMungkin(gM(L.awalMungkin("A"), "total", 100), { t: "UBAH", bagian: "total", d: 1 }).total === 100, "total paling besar 100");

  // Mode B: terjual dan sisa berbeda peran, jadi urutan dihitung dua pasangan.
  let b = L.awalMungkin("B");
  b = gM(L.langkahMungkin(b, { t: "UBAH", bagian: "total", d: -10 }), "total", 100);
  b = L.langkahMungkin(gM(gM(b, "a", 45), "b", 55), { t: "CATAT" });
  b = L.langkahMungkin(gM(gM(b, "a", 55), "b", 45), { t: "CATAT" });
  cek(b.catat.length === 2, "B: 100 − 45 = 55 dan 100 − 55 = 45 dua pasangan berbeda");
  sama(L.kalimatMungkin("B", 100, [45, 55]), "100 − 45 = 55", "kalimat pasangan B");
  sama(L.kalimatMungkin("A", 100, [60, 40]), "60 + 40 = 100", "kalimat pasangan A");
  cek(L.ucapMungkin(m).includes("tidak hanya satu"), "ucapan menyebut jawaban tidak hanya satu");
  cek(L.langkahMungkin(m, { t: "RESET" }).catat.length === 0, "reset mengosongkan catatan");
}

/* ------------------------------ Mesin Kalimat ------------------------------ */
const parseEq = (t) => {
  const m = t.match(/^(\d+) ([+−]) (\d+) = (\d+)$/);
  if (!m) return null;
  const a = Number(m[1]);
  const b = Number(m[3]);
  return { a, b, op: m[2], z: Number(m[4]), nilai: m[2] === "+" ? a + b : a - b };
};
const benarEq = (t) => {
  const e = parseEq(t);
  return e !== null && e.nilai === e.z;
};
const isiKal = (t, n) => t.replace("…", String(n));

cek(MD.SEMUA_MESIN_K3B2.length === 2, "ada dua definisi mesin");
{
  const posisi = [];
  for (const def of MD.SEMUA_MESIN_K3B2) {
    cek(def.stasiun.length === 5 && def.kasus.length === 3, `${def.id}: 5 stasiun, 3 kasus`);
    sama(def.stasiun.map((s) => s.id), ["cerita", "kalimat", "kebalikan", "hitung", "periksa"], `${def.id}: urutan stasiun`);
    cek(new Set(def.kasus.map((x) => x.id)).size === def.kasus.length, `${def.id}: id kasus unik`);
    for (const kasus of def.kasus) {
      cek(kasus.langkah.length === def.stasiun.length, `${def.id}/${kasus.id}: satu langkah per stasiun`);
      kasus.langkah.forEach((l, i) => {
        cek(l.stasiun === def.stasiun[i].id, `${kasus.id}: stasiun ${i} bernama ${def.stasiun[i].id}`);
        cek(l.opsi.length === 3 && new Set(l.opsi).size === 3, `${kasus.id}/${l.stasiun}: tiga pilihan unik`);
        cek(l.opsi.filter((o) => o === l.benar).length === 1, `${kasus.id}/${l.stasiun}: tepat satu kunci`);
        cek(l.petunjuk.length > 20 && l.tanya.length > 5, `${kasus.id}/${l.stasiun}: tanya dan petunjuk ada`);
        posisi.push(l.opsi.indexOf(l.benar));
      });
    }
    cek(new Set(posisi).size === 3, `${def.id}: letak kunci bervariasi`);
  }
  cek(new Set(posisi.slice(0, 15)).size >= 2 && new Set(posisi.slice(15)).size >= 2, `letak kunci bervariasi per mesin (${posisi.join("")})`);

  // Kunci diperiksa mandiri dari kasus sumber, bukan dari string.
  for (const [def, daftar] of [[MD.MESIN_KALIMAT_TAMBAH, MD.KASUS_TAMBAH], [MD.MESIN_KALIMAT_KURANG, MD.KASUS_KURANG]]) {
    daftar.forEach((kas, idx) => {
      const mesinKasus = def.kasus[idx];
      const z = MD.hasilKasus(kas);
      const j = MD.jawabKasus(kas);
      cek(z >= 0 && z <= 100 && kas.x <= 100 && kas.y <= 100 && j >= 0 && j <= 100, `${kas.id}: semua bilangan dalam 0 sampai 100`);
      cek(kas.op === "+" ? kas.x + kas.y === z : kas.x - kas.y === z && kas.x >= kas.y, `${kas.id}: hasil tepat dan pengurangan tidak negatif`);
      const [cerita, kalimat, balik, hitung, periksa] = mesinKasus.langkah;
      // Kalimat: kunci benar bila titik-titik diisi jawaban, pengecoh salah.
      cek(benarEq(isiKal(kalimat.benar, j)), `${kas.id}: kalimat kunci "${kalimat.benar}" benar saat diisi ${j}`);
      for (const o of kalimat.opsi.filter((x) => x !== kalimat.benar)) cek(!benarEq(isiKal(o, j)), `${kas.id}: pengecoh kalimat "${o}" salah saat diisi ${j}`);
      sama(kalimat.benar, MD.kalimatKasus(kas), `${kas.id}: kalimat kunci`);
      // Kebalikan: ungkapannya bernilai jawab, pengecoh tidak.
      const eb = (t) => {
        const m = t.match(/^(\d+) ([+−]) (\d+)$/);
        return m ? (m[2] === "+" ? Number(m[1]) + Number(m[3]) : Number(m[1]) - Number(m[3])) : NaN;
      };
      cek(eb(balik.benar) === j, `${kas.id}: kebalikan "${balik.benar}" bernilai ${j}`);
      for (const o of balik.opsi.filter((x) => x !== balik.benar)) cek(eb(o) !== j, `${kas.id}: pengecoh kebalikan "${o}" tidak bernilai ${j}`);
      // Pada penjumlahan, kebalikannya pengurangan. Pada pengurangan titik-titik di depan, penjumlahan.
      cek(balik.benar.includes(kas.op === "+" ? "−" : kas.hilang === "y" ? "−" : "+"), `${kas.id}: tanda kebalikan sesuai letak titik-titik`);
      // Hitung.
      const mh = hitung.tanya.match(/^(.+) = …$/);
      cek(mh !== null && eb(mh[1]) === j && hitung.benar === String(j), `${kas.id}: stasiun Hitung bernilai ${j}`);
      for (const o of hitung.opsi.filter((x) => x !== hitung.benar)) cek(Number(o) !== j && Number(o) >= 0 && Number(o) <= 100, `${kas.id}: pengecoh hitung ${o} berbeda dan dalam 0..100`);
      // Periksa.
      cek(benarEq(periksa.benar), `${kas.id}: kalimat periksa kunci benar`);
      for (const o of periksa.opsi.filter((x) => x !== periksa.benar)) cek(!benarEq(o), `${kas.id}: pengecoh periksa "${o}" salah`);
      // Cerita.
      cek(cerita.opsi.includes(cerita.benar) && cerita.tanya.includes(kas.cerita), `${kas.id}: stasiun Cerita memuat ceritanya`);
      cek(mesinKasus.ringkas.includes(String(j)), `${kas.id}: ringkasan memuat jawaban`);
    });
  }

  // Dua mesin memuat bentuk titik-titik di depan dan di tengah.
  cek(MD.KASUS_TAMBAH.some((x) => x.hilang === "x") && MD.KASUS_TAMBAH.some((x) => x.hilang === "y"), "mesin tambah: titik-titik di depan dan di tengah");
  cek(MD.KASUS_KURANG.some((x) => x.hilang === "x") && MD.KASUS_KURANG.some((x) => x.hilang === "y"), "mesin kurang: titik-titik di depan dan di tengah");
  cek(MD.KASUS_TAMBAH.every((x) => x.op === "+") && MD.KASUS_KURANG.every((x) => x.op === "−"), "mesin tambah hanya penjumlahan, mesin kurang hanya pengurangan");
  cek(MD.KASUS_TAMBAH.some((x) => x.id === "kelereng-galih" && x.x === 12 && x.y === 5), "mesin tambah memuat kelereng Galih … + 5 = 17");
  cek(MD.KASUS_TAMBAH.some((x) => x.x === 30 && x.y === 20), "mesin tambah memuat 30 + … = 50");
  cek(MD.KASUS_KURANG.some((x) => x.x === 80 && x.y === 35) && MD.KASUS_KURANG.some((x) => x.x === 72 && x.y === 45), "mesin kurang memuat 80 − … = 45 dan … − 45 = 27");

  // Pengecoh nilai: semua bilangan 0..100 punya dua pengecoh berbeda dan bukan kunci.
  let salahPengecoh = 0;
  for (let j = 0; j <= 100; j += 1) {
    const [a, b] = MD.pengecohNilai(j);
    if (a === b || a === j || b === j || a < 0 || b < 0 || a > 100 || b > 100) salahPengecoh += 1;
  }
  cek(salahPengecoh === 0, `pengecoh nilai valid untuk 0..100 (salah ${salahPengecoh})`);

  // Permainan penuh dan aturan mesin.
  for (const def of MD.SEMUA_MESIN_K3B2) {
    let x = ME.awalMesin(def);
    cek(ME.indeksStasiun(x) === 0 && x.ke === 0 && x.misi === 0 && !x.selesai, `${def.id}: awal di stasiun pertama`);
    cek(ME.petunjukMesin(x).includes("Pertanyaan 1 dari 5"), `${def.id}: petunjuk awal`);
    for (let mi = 0; mi < def.kasus.length; mi += 1) {
      for (let i = 0; i < def.stasiun.length; i += 1) {
        const l = ME.langkahAktif(x);
        cek(l !== null && x.misi === mi && x.ke === i, `${def.id}: kasus ${mi} stasiun ${i} aktif`);
        const lompat = ME.langkahMesin(x, { t: "LOMPAT", ke: i + 1 });
        cek(lompat.ke === x.ke && lompat.misi === x.misi && lompat.ditolak === x.ditolak + 1 && lompat.pesan.length > 5, `${def.id}: lompat stasiun ditolak`);
        const salahJ = l.opsi.find((o) => o !== l.benar);
        const t = ME.langkahMesin(x, { t: "JAWAB", nilai: salahJ });
        cek(t.ke === x.ke && t.misi === x.misi && t.ditolak === x.ditolak + 1 && t.pesan === l.petunjuk, `${def.id}: jawaban salah tinggal dengan petunjuk`);
        x = ME.langkahMesin(t, { t: "JAWAB", nilai: l.benar });
      }
      cek(x.fase === "sudah", `${def.id}: kasus ${mi} selesai`);
      cek(ME.langkahMesin(x, { t: "JAWAB", nilai: "x" }).ke === x.ke, `${def.id}: tidak bisa menjawab saat kasus sudah selesai`);
      x = ME.langkahMesin(x, { t: "LANJUT" });
    }
    cek(x.selesai && x.fase === "selesai", `${def.id}: semua kasus selesai`);
    const baru = ME.langkahMesin(x, { t: "ULANG" });
    cek(!baru.selesai && baru.misi === 0 && baru.ke === 0 && baru.ditolak === 0, `${def.id}: main lagi kembali ke awal`);
  }
  sama(MD.MESIN_KALIMAT_TAMBAH.selesaiId, K3.ID_MESIN_K3B2.A, "selesaiId mesin tambah sama dengan id misi");
  sama(MD.MESIN_KALIMAT_KURANG.selesaiId, K3.ID_MESIN_K3B2.B, "selesaiId mesin kurang sama dengan id misi");
}

/* ------------------------------ Misi ------------------------------ */
const awalKeadaan = [
  k(L.awalKal("A")),
  k(L.awalKal("B")),
  L.keadaanMungkin(L.awalMungkin("A")),
  L.keadaanMungkin(L.awalMungkin("B")),
];

for (const h of ["A", "B"]) {
  const daftar = K3.daftarMisiK3Bab2(h);
  const wajib = daftar.filter((m) => m.wajib);
  cek(wajib.length >= 3, `sub-bab ${h}: minimal 3 misi wajib (${wajib.length})`);
  cek(daftar.some((m) => !m.wajib), `sub-bab ${h}: ada tantangan bebas`);
  const idMisi = new Set();
  for (const m of daftar) {
    cek(!idMisi.has(m.id), `misi ${m.id}: id unik`);
    idMisi.add(m.id);
    cek(m.id.startsWith(`${h.toLowerCase()}-`), `misi ${m.id}: berawalan huruf sub-bab`);
    cek(m.teks.length >= 10 && m.teks.length <= 130, `misi ${m.id}: panjang teks ${m.teks.length}`);
    for (const ke of awalKeadaan) cek(!m.cek(ke), `misi ${m.id}: keadaan awal ${ke.alat}/${ke.mode ?? ""} tidak memenuhinya`);
  }
  const tampil = M0.tampilMisi(daftar);
  cek(!M0.wajibSelesai(tampil, new Set()), `sub-bab ${h}: gerbang tertutup di awal`);
  // Misi mesin dan skenario hanya tercapai oleh id yang tepat.
  for (const m of daftar.filter((x) => x.id.endsWith("mesin") || x.id.endsWith("skenario"))) {
    const idBenar = m.id.endsWith("mesin") ? K3.ID_MESIN_K3B2[h] : K3.ID_SKENARIO_K3B2[h];
    cek(m.cek(sel(idBenar)), `misi ${m.id}: tercapai oleh ${idBenar}`);
    for (const lain of [...Object.values(K3.ID_MESIN_K3B2), ...Object.values(K3.ID_SKENARIO_K3B2), "x"].filter((v) => v !== idBenar)) cek(!m.cek(sel(lain)), `misi ${m.id}: tidak boleh tercapai oleh ${lain}`);
    for (const ke of awalKeadaan) cek(!m.cek(ke), `misi ${m.id}: alat lain tidak memenuhi`);
  }
  // Misi alat tidak tercapai oleh selesai.
  for (const m of daftar.filter((x) => !x.id.endsWith("mesin") && !x.id.endsWith("skenario"))) {
    for (const id of [...Object.values(K3.ID_MESIN_K3B2), ...Object.values(K3.ID_SKENARIO_K3B2)]) cek(!m.cek(sel(id)), `misi ${m.id}: tidak tercapai oleh selesai ${id}`);
  }
}
for (const [h, def] of [["A", MD.MESIN_KALIMAT_TAMBAH], ["B", MD.MESIN_KALIMAT_KURANG]]) sama(def.selesaiId, K3.ID_MESIN_K3B2[h], `selesaiId mesin ${h}`);
cek(SK.SKENARIO_K3B2A.adegan.length >= 5 && SK.SKENARIO_K3B2B.adegan.length >= 5, "dua skenario ada dan cukup adegan");

const misiDi = (h, id) => K3.daftarMisiK3Bab2(h).find((m) => m.id === id);
const penuh = (h, id, ke) => cek(misiDi(h, id).cek(ke), `misi ${id} tercapai`);
const belum = (h, id, ke, ket) => cek(!misiDi(h, id).cek(ke), `misi ${id} belum tercapai: ${ket}`);

/* ---- Bukti tiap misi bisa dicapai dari alat sebenarnya, lewat tombol ---- */
const ke = L.keadaanKal;

// Sub-Bab A
{
  const a0 = L.awalKal("A");
  const t = setKal(a0, 8, 19, 11);
  cek(t !== null, "A: dapat mengatur 8 + … = 19 lewat tombol");
  penuh("A", "a-tengah", ke(t));
  belum("A", "a-tengah", ke(setKal(a0, 8, 19, 10)), "isi belum pas");
  belum("A", "a-tengah", ke(setKal(a0, 8, 19, 0)), "isi masih nol");
  belum("A", "a-tengah", ke(setKal(a0, 9, 19, 10)), "bilangan lain");

  const dp = kk(a0, { t: "LETAK", letak: "depan" });
  const d = setKal(dp, 16, 54, 38);
  cek(d !== null, "A: dapat mengatur … + 16 = 54 lewat tombol");
  penuh("A", "a-depan", ke(d));
  belum("A", "a-depan", ke(setKal(dp, 16, 54, 37)), "isi belum pas");
  belum("A", "a-depan", ke(setKal(a0, 16, 54, 38)), "titik-titik masih di tengah (16 + 38 = 54 bukan bentuk yang diminta)");

  // Kebalikan di dua bentuk.
  let b = kk(setKal(a0, 8, 19, 11), { t: "TOGGLE", rep: "kebalikan" });
  belum("A", "a-balik", ke(b), "baru satu bentuk");
  b = kk(setKal(kk(b, { t: "LETAK", letak: "depan" }), 16, 54, 38));
  penuh("A", "a-balik", ke(b));
  // Seimbang dulu, Kebalikan baru dinyalakan juga dihitung.
  const c = kk(setKal(kk(a0, { t: "LETAK", letak: "depan" }), 16, 54, 38), { t: "TOGGLE", rep: "kebalikan" });
  belum("A", "a-balik", ke(c), "satu bentuk saja");
  // Kebalikan menyala tetapi tidak pernah seimbang tidak cukup.
  belum("A", "a-balik", ke(kk(a0, { t: "TOGGLE", rep: "kebalikan" })), "kebalikan menyala tanpa seimbang");

  const p = kk(setKal(a0, 8, 19, 11), { t: "PERIKSA" });
  penuh("A", "a-periksa", ke(p));
  belum("A", "a-periksa", ke(setKal(a0, 8, 19, 10)), "belum Periksa");
  belum("A", "a-periksa", ke(kk(a0, { t: "PERIKSA" })), "Periksa ditolak saat belum seimbang");

  // Papan Kemungkinan.
  let m = L.awalMungkin("A");
  m = gM(m, "total", 100);
  const catat = (s, x, y) => L.langkahMungkin(gM(gM(s, "a", x), "b", y), { t: "CATAT" });
  m = catat(m, 60, 40);
  m = catat(m, 75, 25);
  belum("A", "a-banyak", L.keadaanMungkin(m), "baru dua pasangan");
  m = catat(m, 55, 45);
  penuh("A", "a-banyak", L.keadaanMungkin(m));
  let m2 = catat(catat(catat(gM(L.awalMungkin("A"), "total", 50), 30, 20), 25, 25), 34, 16);
  belum("A", "a-banyak", L.keadaanMungkin(m2), "tiga pasangan tetapi jumlah 50");
  // Dua pasangan yang sama ditukar tidak menambah hitungan.
  m2 = catat(catat(catat(gM(L.awalMungkin("A"), "total", 100), 60, 40), 40, 60), 60, 40);
  belum("A", "a-banyak", L.keadaanMungkin(m2), "pasangan sama ditukar tidak dihitung");

  // Tantangan bebas A.
  const tk = kk(setKal(a0, 30, 50, 20), { t: "TUKAR" });
  penuh("A", "a-tukar", ke(tk));
  belum("A", "a-tukar", ke(setKal(a0, 30, 50, 20)), "belum menukar");
  belum("A", "a-tukar", ke(kk(a0, { t: "TUKAR" })), "tukar saat belum seimbang");
  let n95 = gM(L.awalMungkin("A"), "total", 95);
  for (const [x, y] of [[50, 45], [60, 35], [48, 47], [39, 56], [70, 25]]) n95 = catat(n95, x, y);
  penuh("A", "a-95", L.keadaanMungkin(n95));
  belum("A", "a-95", L.keadaanMungkin(catat(gM(L.awalMungkin("A"), "total", 95), 50, 45)), "baru satu pasangan");
  const nol = setKal(a0, 17, 17, 0);
  cek(nol !== null, "A: dapat mengatur … + 17 = 17");
  penuh("A", "a-nol", ke(nol));
  belum("A", "a-nol", ke(setKal(a0, 17, 18, 1)), "bukan isi nol");
}

// Sub-Bab B
{
  const b0 = L.awalKal("B");
  const t = setKal(b0, 80, 45, 35);
  cek(t !== null, "B: dapat mengatur 80 − … = 45 lewat tombol");
  penuh("B", "b-tengah", ke(t));
  belum("B", "b-tengah", ke(setKal(b0, 80, 45, 34)), "isi belum pas");
  belum("B", "b-tengah", ke(setKal(b0, 80, 45, 0)), "isi masih nol");

  const dp = kk(b0, { t: "LETAK", letak: "depan" });
  const d = setKal(dp, 45, 27, 72);
  cek(d !== null, "B: dapat mengatur … − 45 = 27 lewat tombol");
  penuh("B", "b-depan", ke(d));
  belum("B", "b-depan", ke(setKal(dp, 45, 27, 71)), "isi belum pas");
  belum("B", "b-depan", ke(setKal(b0, 80, 45, 35)), "masih titik-titik di tengah");
  const tambah = kk(b0, { t: "OP", op: "tambah" });
  belum("B", "b-depan", ke(tambah), "operasi tambah tidak memenuhi pengurangan");

  // Kebalikan di dua bentuk pengurangan.
  let b = kk(t, { t: "TOGGLE", rep: "kebalikan" });
  belum("B", "b-balik", ke(b), "baru titik-titik di tengah");
  // Dari 80 − … = 45 titik-titik belum bisa dipindah ke depan (awalnya lebih dari 100): kecilkan dulu bilangannya.
  cek(kk(b, { t: "LETAK", letak: "depan" }).letak === "tengah" && kk(b, { t: "LETAK", letak: "depan" }).pesan.length > 5, "B: pindah ke depan ditolak bila bilangan awalnya akan lebih dari 100");
  b = gK(kk(setKal(b, 45, 27, 0), { t: "LETAK", letak: "depan" }), "isi", 72);
  penuh("B", "b-balik", ke(b));
  // Penjumlahan dengan Kebalikan tidak mencukupi misi pengurangan.
  let tamb = kk(setKal(kk(b0, { t: "OP", op: "tambah" }), 12, 30, 18), { t: "TOGGLE", rep: "kebalikan" });
  tamb = setKal(kk(tamb, { t: "LETAK", letak: "depan" }), 12, 30, 18);
  belum("B", "b-balik", ke(tamb), "Kebalikan pada penjumlahan bukan pengurangan");

  const p = kk(t, { t: "PERIKSA" });
  penuh("B", "b-periksa", ke(p));
  belum("B", "b-periksa", ke(t), "belum Periksa");
  const pt = kk(setKal(kk(b0, { t: "OP", op: "tambah" }), 12, 30, 18), { t: "PERIKSA" });
  belum("B", "b-periksa", ke(pt), "Periksa pada penjumlahan bukan pengurangan");

  // Satu bagan, dua kalimat.
  let bg = t;
  belum("B", "b-bagan", ke(bg), "baru satu kalimat");
  bg = kk(bg, { t: "OP", op: "tambah" });
  belum("B", "b-bagan", ke(bg), "ganti operasi saja belum cukup");
  bg = gK(bg, "isi", 35);
  penuh("B", "b-bagan", ke(bg));
  // Dua kalimat tidak sebagian dari satu bagan.
  const lain = gK(kk(setKal(b0, 72, 27, 45), { t: "OP", op: "tambah" }), "isi", 45);
  belum("B", "b-bagan", ke(lain), "bagan lain (72 dan 27) bukan 80 dan 45");

  // Mode A tidak boleh mencapai misi pengurangan: tidak ada pengurangan di mode A.
  const a0 = L.awalKal("A");
  const adaKurang = [setKal(a0, 80, 100, 20), setKal(kk(a0, { t: "LETAK", letak: "depan" }), 45, 72, 27)].filter(Boolean);
  for (const s of adaKurang) belum("B", "b-tengah", ke(s), "mode A tidak punya pengurangan");

  // Tantangan bebas B.
  const tk = kk(setKal(b0, 32, 15, 17), { t: "TUKAR" });
  penuh("B", "b-tukar", ke(tk));
  belum("B", "b-tukar", ke(setKal(b0, 32, 15, 17)), "belum menukar");
  const tkTambah = kk(setKal(kk(b0, { t: "OP", op: "tambah" }), 12, 30, 18), { t: "TUKAR" });
  belum("B", "b-tukar", ke(tkTambah), "menukar penjumlahan tidak ditolak");

  const catat = (s, x, y) => L.langkahMungkin(gM(gM(s, "a", x), "b", y), { t: "CATAT" });
  let telur = gM(L.awalMungkin("B"), "total", 100);
  for (const [x, y] of [[45, 55], [60, 40], [72, 28]]) telur = catat(telur, x, y);
  penuh("B", "b-telur", L.keadaanMungkin(telur));
  belum("B", "b-telur", L.keadaanMungkin(catat(catat(gM(L.awalMungkin("B"), "total", 100), 45, 55), 60, 40)), "baru dua pasangan");
  // Mode A bukan mode B.
  let telurA = gM(L.awalMungkin("A"), "total", 100);
  for (const [x, y] of [[45, 55], [60, 40], [72, 28]]) telurA = catat(telurA, x, y);
  belum("B", "b-telur", L.keadaanMungkin(telurA), "papan mode A tidak dihitung");

  let tv = gM(L.awalMungkin("B"), "total", 40);
  for (const [x, y] of [[15, 25], [30, 10], [22, 18], [28, 12], [5, 35]]) tv = catat(tv, x, y);
  penuh("B", "b-televisi", L.keadaanMungkin(tv));
  belum("B", "b-televisi", L.keadaanMungkin(catat(gM(L.awalMungkin("B"), "total", 40), 15, 25)), "baru satu pasangan");
  // Terjual dan sisa berbeda peran: (15,25) dan (25,15) dua pasangan di mode B.
  const dua = catat(catat(gM(L.awalMungkin("B"), "total", 40), 15, 25), 25, 15);
  cek(dua.catat.length === 2, "B: (15, 25) dan (25, 15) adalah dua pasangan berbeda");

  const nol = setKal(b0, 32, 0, 32);
  cek(nol !== null && ke(nol).hasil === 0, "B: dapat mengatur 32 − … = 0");
  penuh("B", "b-nol", ke(nol));
  belum("B", "b-nol", ke(setKal(b0, 32, 15, 17)), "sisa bukan nol");
  belum("B", "b-nol", ke(setKal(b0, 32, 0, 31)), "belum seimbang");
}

/* ---- Gerbang bekerja ---- */
for (const h of ["A", "B"]) {
  const daftar = K3.daftarMisiK3Bab2(h);
  const tampil = M0.tampilMisi(daftar);
  const sudah = new Set();
  const catatSemua = (keadaan) => {
    for (const id of M0.misiBaru(daftar, keadaan, sudah)) sudah.add(id);
  };
  const catat = (s, x, y) => L.langkahMungkin(gM(gM(s, "a", x), "b", y), { t: "CATAT" });
  if (h === "A") {
    const a0 = L.awalKal("A");
    catatSemua(ke(setKal(a0, 8, 19, 11)));
    cek(sudah.has("a-tengah") && !M0.wajibSelesai(tampil, sudah), "gerbang A masih tertutup setelah satu misi");
    let x = kk(setKal(a0, 8, 19, 11), { t: "TOGGLE", rep: "kebalikan" });
    catatSemua(ke(x));
    x = setKal(kk(x, { t: "LETAK", letak: "depan" }), 16, 54, 38);
    catatSemua(ke(x));
    catatSemua(ke(kk(x, { t: "PERIKSA" })));
    let m = gM(L.awalMungkin("A"), "total", 100);
    for (const [p, q] of [[60, 40], [75, 25], [55, 45]]) m = catat(m, p, q);
    catatSemua(L.keadaanMungkin(m));
    catatSemua(sel(K3.ID_MESIN_K3B2.A));
    cek(!M0.wajibSelesai(tampil, sudah), "gerbang A tertutup tanpa skenario");
    catatSemua(sel(K3.ID_SKENARIO_K3B2.A));
    cek(M0.wajibSelesai(tampil, sudah), "gerbang A terbuka setelah semua misi wajib");
    cek(sudah.has("a-tengah") && sudah.has("a-depan"), "misi yang tercapai tidak dicabut");
    // Mengubah alat setelahnya tidak mencabut misi (daftar hanya menambah).
    catatSemua(ke(L.awalKal("A")));
    cek(M0.wajibSelesai(tampil, sudah), "gerbang A tetap terbuka setelah alat diubah");
  } else {
    const b0 = L.awalKal("B");
    let x = setKal(b0, 80, 45, 35);
    catatSemua(ke(x));
    cek(sudah.has("b-tengah") && !M0.wajibSelesai(tampil, sudah), "gerbang B masih tertutup setelah satu misi");
    x = kk(x, { t: "TOGGLE", rep: "kebalikan" });
    catatSemua(ke(x));
    catatSemua(ke(kk(x, { t: "PERIKSA" })));
    x = gK(kk(setKal(x, 45, 27, 0), { t: "LETAK", letak: "depan" }), "isi", 72);
    catatSemua(ke(x));
    // b-bagan lewat riwayat: kurang 80/45 lalu tambah 45/80.
    let y = setKal(b0, 80, 45, 35);
    y = gK(kk(y, { t: "OP", op: "tambah" }), "isi", 35);
    catatSemua(ke(y));
    catatSemua(sel(K3.ID_MESIN_K3B2.B));
    cek(!M0.wajibSelesai(tampil, sudah), "gerbang B tertutup tanpa skenario");
    catatSemua(sel(K3.ID_SKENARIO_K3B2.B));
    cek(M0.wajibSelesai(tampil, sudah), "gerbang B terbuka setelah semua misi wajib");
  }
}

/* ---- Gerbang: lewati misi ---- */
{
  const tampil = M0.tampilMisi(K3.daftarMisiK3Bab2("A"));
  const kosong = new Set();
  const o = { adaMisi: true, wajibSelesai: M0.wajibSelesai(tampil, kosong), dilewati: false, disentuh: false };
  cek(!M0.bolehLanjut(o) && !M0.bolehLewati(o), "belum menyentuh: tidak boleh lanjut dan belum boleh lewati");
  const sentuh = { ...o, disentuh: true };
  cek(M0.bolehLewati(sentuh) && !M0.bolehLanjut(sentuh), "setelah menyentuh: boleh melewati misi");
  cek(M0.bolehLanjut({ ...sentuh, dilewati: true }), "setelah melewati: boleh lanjut");
}

/* ---- Teks misi ---- */
cek(TK.hurufK3B2("B") === "B" && TK.hurufK3B2("A") === "A" && TK.hurufK3B2("Z") === "A", "hurufK3B2 jatuh ke A bila tak dikenal");
for (const h of ["A", "B"]) {
  cek(TK.MISI_K3B2[h].length > 40 && TK.NAMA_SIM_K3B2[h].length > 10, `teks misi dan nama simulasi ${h} ada`);
  cek(TK.misiAwalK3Bab2(h).startsWith("Simulasi 1. Misi:"), `misiAwal ${h}`);
}
// Konsep sub-bab berikutnya tidak dipakai di sub-bab sebelumnya.
{
  const teksA = [TK.MISI_K3B2.A, TK.NAMA_SIM_K3B2.A, ...K3.MISI_A.map((m) => m.teks)].join(" ");
  cek(!/pengurangan|kurang|terjual|sisa/i.test(teksA.replace(/mengurangkan/gi, "")), "teks Sub-Bab A tidak membahas pengurangan");
  cek(!/pengurangan|dikurangi|terjual/i.test(JSON.stringify(SK.SKENARIO_K3B2A).replace(/dikurangi bilangan yang diketahui|17 − 5|dikurangi/g, "")), "skenario A tidak memakai kalimat pengurangan");
}

console.log(`Lulus ${lulus}, gagal ${gagal}`);
process.exit(gagal ? 1 : 0);
