// Uji logika murni dan misi Matematika Kelas 2 Bab 5 (Pecahan): Lab Potong, Lab Kumpulan, Dinding Pecahan,
// Mesin Pemeriksa Bagian, Mesin Pembagi Adil, dan misi per sub-bab.
// Jalankan: node --no-warnings scripts/uji-lab-k2b5.mjs
import * as M0 from "../src/components/modul/misi-simulasi.ts";
import * as K2B5 from "../src/components/modul/misi-k2bab5.ts";
import * as LP from "../src/components/modul/lab-potong-k2b5.ts";
import * as LK from "../src/components/modul/lab-kumpulan-k2b5.ts";
import * as DD from "../src/components/modul/dinding-k2b5.ts";
import * as MB from "../src/components/modul/mesin-bagian-k2b5.ts";
import * as MK from "../src/components/modul/mesin-kumpulan-k2b5.ts";

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
const hampir = (a, b, pesan, eps = 1e-9) => cek(Math.abs(a - b) <= eps, `${pesan}: ${a} != ${b}`);
const kosong = new Set();

/* ------------------------------ Lab Potong ------------------------------ */
const G = (arah, langkah = 0) => ({ arah, langkah });
const info = (bentuk, garis) => {
  const keping = LP.potong(bentuk, garis);
  const rasio = LP.rasioBagian(keping);
  return { n: keping.length, rasio, sama: LP.samaBesar(rasio), nama: LP.namaBagian(rasio) };
};

for (const b of LP.URUT_BENTUK) {
  const l = LP.luas(LP.poligonBentuk(b));
  cek(l > 1000, `luas ${b} wajar: ${l}`);
  const awal = info(b, []);
  cek(awal.n === 1 && awal.nama === "utuh" && !awal.sama, `${b}: tanpa garis tetap utuh`);
}

// Garis lewat tengah: persegi, persegi panjang, dan lingkaran selalu dua bagian sama besar (simetri titik).
for (const b of ["persegi", "persegiPanjang", "lingkaran"]) {
  for (const a of LP.URUT_ARAH) {
    const x = info(b, [G(a, 0)]);
    cek(x.n === 2 && x.sama && x.nama === "setengah", `${b} ${a} tepat di tengah = setengah`);
    hampir(x.rasio[0], 0.5, `${b} ${a} rasio setengah`, 1e-9);
  }
}
// Segitiga: garis tegak di tengah sama besar, garis datar di tengah tinggi tidak sama besar.
{
  const t = info("segitiga", [G("tegak", 0)]);
  cek(t.n === 2 && t.sama && t.nama === "setengah", "segitiga tegak di tengah = setengah");
  const d = info("segitiga", [G("datar", 0)]);
  cek(d.n === 2 && !d.sama && d.nama === "lain", "segitiga datar di tengah = dua bagian tidak sama besar");
  hampir(Math.min(...d.rasio), 0.25, "segitiga datar: bagian atas seperempat luas", 1e-9);
}
// Empat bagian sama besar: dua garis lewat tengah pada bentuk bersimetri.
for (const b of ["persegi", "persegiPanjang", "lingkaran"]) {
  const x = info(b, [G("tegak", 0), G("datar", 0)]);
  cek(x.n === 4 && x.sama && x.nama === "seperempat", `${b} tegak+datar tengah = seperempat`);
}
for (const b of ["persegi", "lingkaran"]) {
  const x = info(b, [G("miring1", 0), G("miring2", 0)]);
  cek(x.n === 4 && x.sama && x.nama === "seperempat", `${b} dua miring tengah = seperempat`);
}
// Dua garis sejajar: tiga bagian, tidak pernah diberi nama pecahan.
{
  const x = info("persegi", [G("tegak", -2), G("tegak", 2)]);
  cek(x.n === 3 && !x.sama && x.nama === "lain", "dua garis tegak: tiga bagian tidak sama besar");
}
// Garis di luar bentuk tidak membelah.
sama(info("persegi", [G("tegak", 3)]).n === 2, true, "persegi tegak 3 masih membelah (x=80 di dalam)");
sama(info("segitiga", [G("datar", -3)]).n, 2, "segitiga datar -3 membelah (y=20)");
sama(info("segitiga", [G("datar", 3)]).n, 2, "segitiga datar 3 membelah (y=80)");

// Uji celah: tidak ada susunan yang selisihnya nyaris sama (antara toleransi dan 0,02). Tanpa celah, "sama besar" ambigu.
{
  const semua = [];
  for (const a of LP.URUT_ARAH) for (let l = -LP.LANGKAH_MAKS; l <= LP.LANGKAH_MAKS; l += 1) semua.push(G(a, l));
  let kasus = 0;
  let nyaris = 0;
  let sama2 = 0;
  let sama4 = 0;
  let segitiga4 = 0;
  const lihat = (b, garis) => {
    const x = info(b, garis);
    if (x.n < 2) return;
    kasus += 1;
    const dev = Math.max(...x.rasio.map((r) => Math.abs(r - 1 / x.n)));
    if (dev > LP.TOLERANSI && dev < 0.02) nyaris += 1;
    if (x.sama && x.n === 2) sama2 += 1;
    if (x.sama && x.n === 4) {
      sama4 += 1;
      if (b === "segitiga") segitiga4 += 1;
    }
    // Konsistensi: sama besar berarti selisih di bawah toleransi, dan sebaliknya.
    cek(x.sama === (dev <= LP.TOLERANSI), `konsistensi sama besar ${b} ${JSON.stringify(garis)}`);
    // Nama pecahan hanya untuk bagian sama besar.
    if (!x.sama) cek(x.nama === "lain", `${b} ${JSON.stringify(garis)}: tidak sama besar tidak diberi nama`);
  };
  for (const b of LP.URUT_BENTUK) {
    for (const g1 of semua) {
      lihat(b, [g1]);
      for (const g2 of semua) lihat(b, [g1, g2]);
    }
  }
  console.log(`Lab Potong: ${kasus} susunan, ${sama2} setengah, ${sama4} seperempat (segitiga ${segitiga4}), nyaris sama ${nyaris}`);
  cek(nyaris === 0, "tidak ada susunan nyaris sama (celah toleransi)");
  cek(sama2 > 20 && sama4 > 5, "ada cukup susunan setengah dan seperempat");
}

// Nama warna: hanya untuk bagian sama besar.
sama(LP.namaWarna(0, 2, true), "kosong", "nama warna 0 bagian");
sama(LP.namaWarna(1, 1, false), "utuh", "nama warna utuh tanpa garis");
sama(LP.namaWarna(1, 2, true), "setengah", "1 dari 2 sama besar");
sama(LP.namaWarna(2, 4, true), "setengah", "2 dari 4 sama besar");
sama(LP.namaWarna(1, 4, true), "seperempat", "1 dari 4 sama besar");
sama(LP.namaWarna(4, 4, true), "utuh", "4 dari 4 sama besar");
sama(LP.namaWarna(3, 4, true), "lain", "3 dari 4 sama besar");
sama(LP.namaWarna(1, 2, false), "lain", "1 dari 2 tidak sama besar bukan setengah");
sama(LP.namaWarna(2, 4, false), "lain", "2 dari 4 tidak sama besar bukan setengah");
sama(LP.namaWarna(1, 4, false), "lain", "1 dari 4 tidak sama besar bukan seperempat");

// Kalimat jujur.
cek(/setengah/.test(LP.kalimatPotong("persegi", true, 2, true)) && !/bukan/.test(LP.kalimatPotong("persegi", true, 2, true)), "kalimat dua sama besar menyebut setengah");
cek(/bukan setengah/.test(LP.kalimatPotong("persegi", true, 2, false)), "kalimat dua tidak sama besar: bukan setengah");
cek(/bukan seperempat/.test(LP.kalimatPotong("persegi", true, 4, false)), "kalimat empat tidak sama besar: bukan seperempat");
cek(/seperempat/.test(LP.kalimatPotong("persegi", true, 4, true)), "kalimat empat sama besar: seperempat");
cek(!/setengah|seperempat/.test(LP.kalimatPotong("persegi", true, 3, true)), "tiga bagian sama besar tidak diberi nama pecahan");
cek(/tidak diberi nama/.test(LP.kalimatWarna("lain", 1, 3, false)), "warna pada bagian tidak sama besar: tidak diberi nama");
cek(LP.lambangBagian("setengah") === "½" && LP.lambangBagian("seperempat") === "¼", "lambang pecahan");

/* ------------------------------ Lab Kumpulan ------------------------------ */
sama([LK.AWAL_N, LK.MIN_N, LK.MAKS_N], [6, 2, 12], "konstanta kumpulan");
cek(!LK.samaBanyak(LK.awalGrup(LK.AWAL_N)), "awal kumpulan belum sama banyak");
sama(LK.awalGrup(6).length, 6, "awalGrup 6");
sama(LK.ubahN(LK.awalGrup(6), 20).length, LK.MAKS_N, "ubahN dibatasi maks");
sama(LK.ubahN(LK.awalGrup(6), 0).length, LK.MIN_N, "ubahN dibatasi min");
sama(LK.ubahN(LK.pindah(LK.awalGrup(4), 0), 6).slice(0, 4), LK.pindah(LK.awalGrup(4), 0), "ubahN mempertahankan pembagian");
sama(LK.hitungGrup(LK.pindah(LK.awalGrup(5), 2)), { kiri: 4, kanan: 1 }, "pindah satu benda");
sama(LK.pindah(LK.pindah(LK.awalGrup(5), 2), 2), LK.awalGrup(5), "pindah dua kali kembali");
sama(LK.pindah(LK.awalGrup(5), 9), LK.awalGrup(5), "pindah di luar batas diabaikan");

for (let n = LK.MIN_N; n <= LK.MAKS_N; n += 1) {
  const g = LK.bagiSatuSatu(n);
  const { kiri, kanan } = LK.hitungGrup(g);
  cek(kiri + kanan === n, `bagi satu-satu ${n}: jumlah utuh`);
  cek(LK.samaBanyak(g) === (n % 2 === 0), `bagi satu-satu ${n}: sama banyak hanya bila genap`);
  const p = LK.pasangan(g);
  cek(p.pasang.length === Math.floor(n / 2) && p.sisa.length === n % 2, `pasangan ${n}: ${p.pasang.length} pasang, sisa ${p.sisa.length}`);
  cek(LK.setengahDari(n) === (n % 2 === 0 ? n / 2 : null), `setengahDari ${n}`);
  // Tidak ada pembagian ganjil yang sama banyak.
  if (n % 2 === 1) {
    for (let m = 0; m < 1 << n; m += 1) {
      const gg = Array.from({ length: n }, (_, i) => (m & (1 << i) ? "kanan" : "kiri"));
      if (LK.samaBanyak(gg)) cek(false, `ganjil ${n} tidak boleh sama banyak (${m})`);
    }
  }
}
cek(!LK.samaBanyak(LK.awalGrup(6)) && !LK.samaBanyak(Array(4).fill("kanan")), "semua di satu kelompok bukan sama banyak");
sama(LK.tabelPola().length, 11, "tabel pola 2 sampai 12");
sama(LK.tabelPola().filter((r) => r.setengah === null).map((r) => r.n), [3, 5, 7, 9, 11], "tabel pola: ganjil tanpa setengah");
sama(LK.tandaiBilangan([2, 6], 4), [2, 4, 6], "tandai bilangan terurut");
sama(LK.tandaiBilangan([2, 4], 4), [2, 4], "tandai bilangan tanpa ganda");
cek(/Setengah dari 6/.test(LK.kalimatKumpulan("kelereng", LK.bagiSatuSatu(6))), "kalimat setengah dari 6");
cek(/ganjil/.test(LK.kalimatKumpulan("apel", LK.bagiSatuSatu(7))), "kalimat ganjil");
cek(/Pindahkan sebagian/.test(LK.kalimatKumpulan("apel", LK.awalGrup(6))), "kalimat belum dibagi");
cek(/belum setengah/.test(LK.kalimatKumpulan("apel", LK.pindah(LK.awalGrup(6), 0))), "kalimat belum sama banyak pada genap");

/* ------------------------------ Dinding Pecahan ------------------------------ */
{
  const d0 = DD.awalDinding();
  sama(DD.pasanganSama(d0), [], "awal dinding tanpa pasangan");
  sama(DD.panjangWarna(d0), { u: 0, s: 0, q: 0 }, "awal dinding panjang nol");
  let d = DD.ketukBagian(DD.ketukBagian(d0, "q", 0), "q", 1);
  d = DD.ketukBagian(d, "s", 0);
  sama(DD.panjangWarna(d), { u: 0, s: 2, q: 2 }, "dua seperempat = satu setengah");
  sama(DD.pasanganSama(d), [["s", "q"]], "pasangan setengah dan seperempat");
  cek(/1 setengah sama panjang dengan 2 seperempat/.test(DD.kalimatDinding(d)), `kalimat dinding: ${DD.kalimatDinding(d)}`);
  let u = DD.ketukBagian(d0, "u", 0);
  for (let i = 0; i < 4; i += 1) u = DD.ketukBagian(u, "q", i);
  cek(DD.pasanganSama(u).some(([a, b]) => a === "u" && b === "q"), "empat seperempat = satu utuh");
  cek(/satu utuh/.test(DD.kalimatDinding(DD.ketukBagian(DD.ketukBagian(DD.ketukBagian(DD.ketukBagian(DD.ketukBagian(d0, "q", 0), "q", 1), "q", 2), "q", 3), "u", 0))), "kalimat satu utuh");
  sama(DD.ketukBagian(d0, "s", 5), d0, "ketuk di luar batas diabaikan");
  sama(DD.ketukBagian(DD.ketukBagian(d0, "s", 1), "s", 1), d0, "ketuk dua kali membatalkan");
  // Satu seperempat tidak sama dengan batang lain.
  sama(DD.pasanganSama(DD.ketukBagian(d0, "q", 0)), [], "satu seperempat tidak sama panjang dengan batang lain");
  // Dua setengah = satu utuh = empat seperempat.
  const duaS = DD.ketukBagian(DD.ketukBagian(d0, "s", 0), "s", 1);
  sama(DD.panjangWarna(duaS).s, 4, "dua setengah menutup satu utuh");
  // Semua pasangan konsisten dengan panjang.
  for (let m = 0; m < 128; m += 1) {
    let x = d0;
    const bit = (i) => (m & (1 << i)) !== 0;
    if (bit(0)) x = DD.ketukBagian(x, "u", 0);
    for (let i = 0; i < 2; i += 1) if (bit(1 + i)) x = DD.ketukBagian(x, "s", i);
    for (let i = 0; i < 4; i += 1) if (bit(3 + i)) x = DD.ketukBagian(x, "q", i);
    const p = DD.panjangWarna(x);
    const ps = DD.pasanganSama(x);
    for (const [a, b] of ps) cek(p[a] === p[b] && p[a] > 0, `dinding ${m}: pasangan ${a}-${b} sama panjang`);
  }
}

/* ------------------------------ Mesin Pemeriksa Bagian ------------------------------ */
{
  cek(MB.KASUS_BAGIAN.length === 5, "lima bentuk di mesin bagian");
  cek(new Set(MB.KASUS_BAGIAN.map((d) => d.id)).size === 5, "id kasus bagian unik");
  cek(MB.KASUS_BAGIAN.filter(MB.adalahSetengah).length >= 2 && MB.KASUS_BAGIAN.filter((d) => !MB.adalahSetengah(d)).length >= 2, "mesin bagian: ada setengah dan bukan setengah");
  cek(MB.KASUS_BAGIAN.some((d) => !d.sama) && MB.KASUS_BAGIAN.some((d) => d.sama && d.bagian !== 2), "mesin bagian: ada tidak sama besar dan sama besar bukan dua");
  for (const d of MB.KASUS_BAGIAN) {
    const x = info(d.bentuk, d.garis);
    cek(x.n === d.bagian && x.sama === d.sama, `${d.id}: data sesuai Lab Potong (${x.n}, ${x.sama})`);
    for (let misi = 0; misi < 3; misi += 1) {
      const oh = MB.opsiHitung(d, misi);
      cek(oh.length === 3 && new Set(oh.map((o) => o.kunci)).size === 3 && oh.filter((o) => Number(o.kunci) === d.bagian).length === 1, `${d.id} misi ${misi}: opsi hitung`);
      const os = MB.opsiSebut(misi);
      cek(os.length === 3 && new Set(os.map((o) => o.kunci)).size === 3 && os.filter((o) => o.kunci === MB.kunciSebutBenar(d)).length === 1, `${d.id} misi ${misi}: opsi sebut`);
    }
    cek(MB.kunciSebutBenar(d) === "setengah" ? MB.adalahSetengah(d) : !MB.adalahSetengah(d), `${d.id}: kunci sebut konsisten`);
  }
  let x = MB.awalMesinBagian();
  sama(x.keadaan, "hitung", "mesin bagian mulai di hitung");
  // Lompat dan salah tempat ditolak.
  let t = MB.langkahMesinBagian(x, { t: "SEBUT", nilai: "setengah" });
  cek(t.keadaan === "hitung" && t.ditolak === 1 && t.pesan.length > 5, "sebut sebelum hitung ditolak");
  t = MB.langkahMesinBagian(x, { t: "LOMPAT", ke: 2 });
  cek(t.keadaan === "hitung" && t.ditolak === 1, "lompat ke sebut ditolak");
  t = MB.langkahMesinBagian(x, { t: "LANJUT" });
  cek(t.keadaan === "hitung" && t.ditolak === 1, "lanjut sebelum selesai ditolak");
  t = MB.langkahMesinBagian(x, { t: "ULANG" });
  cek(t === x, "ulang sebelum selesai diabaikan");
  let semuaSelesai = false;
  for (let i = 0; i < MB.KASUS_BAGIAN.length; i += 1) {
    const d = MB.kasusAktif(x);
    cek(i === x.misi, `bentuk ke-${i + 1}`);
    const salahHitung = MB.langkahMesinBagian(x, { t: "HITUNG", nilai: d.bagian + 1 });
    cek(salahHitung.keadaan === "hitung" && salahHitung.ditolak === x.ditolak + 1, `${d.id}: hitung salah ditolak`);
    x = MB.langkahMesinBagian(x, { t: "HITUNG", nilai: d.bagian });
    sama(x.keadaan, "banding", `${d.id}: hitung benar maju`);
    const salahBanding = MB.langkahMesinBagian(x, { t: "BANDING", nilai: d.sama ? "beda" : "sama" });
    cek(salahBanding.keadaan === "banding", `${d.id}: banding salah ditolak`);
    x = MB.langkahMesinBagian(x, { t: "BANDING", nilai: d.sama ? "sama" : "beda" });
    sama(x.keadaan, "sebut", `${d.id}: banding benar maju`);
    for (const o of MB.opsiSebut(i)) {
      if (o.kunci === MB.kunciSebutBenar(d)) continue;
      const s = MB.langkahMesinBagian(x, { t: "SEBUT", nilai: o.kunci });
      cek(s.keadaan === "sebut" && s.pesan.length > 10, `${d.id}: sebut salah (${o.kunci}) ditolak dengan petunjuk`);
    }
    x = MB.langkahMesinBagian(x, { t: "SEBUT", nilai: MB.kunciSebutBenar(d) });
    sama(x.keadaan, "sudah", `${d.id}: sebut benar`);
    cek(MB.ringkasBagian(d).length > 20 && /setengah/.test(MB.ringkasBagian(d)), `${d.id}: ringkasan`);
    cek(MB.adalahSetengah(d) ? !/bukan setengah/.test(MB.ringkasBagian(d)) : /bukan setengah/.test(MB.ringkasBagian(d)) || /Itu bukan setengah/.test(MB.ringkasBagian(d)), `${d.id}: ringkasan jujur`);
    x = MB.langkahMesinBagian(x, { t: "LANJUT" });
  }
  semuaSelesai = x.selesai && x.keadaan === "selesai";
  cek(semuaSelesai, "semua bentuk selesai");
  cek(MB.langkahMesinBagian(x, { t: "ULANG" }).misi === 0 && !MB.langkahMesinBagian(x, { t: "ULANG" }).selesai, "main lagi kembali ke awal");
  sama(MB.indeksStasiunBagian("hitung"), 0, "indeks hitung");
  sama(MB.indeksStasiunBagian("selesai"), 3, "indeks selesai");
}

/* ------------------------------ Mesin Pembagi Adil ------------------------------ */
{
  cek(MK.KASUS_KUMPULAN.length === 4, "empat kumpulan");
  cek(MK.KASUS_KUMPULAN.some((d) => d.n % 2 === 0) && MK.KASUS_KUMPULAN.some((d) => d.n % 2 === 1), "ada genap dan ganjil");
  cek(MK.KASUS_KUMPULAN.every((d) => d.n >= LK.MIN_N && d.n <= LK.MAKS_N), "banyak benda dalam jangkauan lab");
  for (const d of MK.KASUS_KUMPULAN) {
    for (let misi = 0; misi < 3; misi += 1) {
      const oh = MK.opsiHitungKumpulan(d, misi);
      cek(oh.length === 3 && new Set(oh.map((o) => o.kunci)).size === 3 && oh.some((o) => Number(o.kunci) === d.n), `${d.id} misi ${misi}: opsi hitung`);
      const os = MK.opsiHasil(d, misi);
      cek(os.length === 3 && new Set(os.map((o) => o.kunci)).size === 3 && os.filter((o) => o.kunci === MK.kunciHasilBenar(d)).length === 1, `${d.id} misi ${misi}: opsi hasil`);
    }
    // Kunci hasil konsisten dengan lab: genap punya setengah, ganjil tidak.
    cek(d.n % 2 === 0 ? MK.kunciHasilBenar(d) === String(LK.setengahDari(d.n)) : MK.kunciHasilBenar(d) === "sisa" && LK.setengahDari(d.n) === null, `${d.id}: kunci hasil sesuai Lab Kumpulan`);
    cek(MK.adalahGenap(d.n) === (d.n % 2 === 0), `${d.id}: genap`);
  }
  let x = MK.awalMesinKumpulan();
  let t = MK.langkahMesinKumpulan(x, { t: "HASIL", nilai: "3" });
  cek(t.keadaan === "hitung" && t.ditolak === 1, "hasil sebelum hitung ditolak");
  t = MK.langkahMesinKumpulan(x, { t: "LOMPAT", ke: 2 });
  cek(t.keadaan === "hitung" && t.ditolak === 1, "lompat ke hasil ditolak");
  for (let i = 0; i < MK.KASUS_KUMPULAN.length; i += 1) {
    const d = MK.kumpulanAktif(x);
    cek(MK.langkahMesinKumpulan(x, { t: "HITUNG", nilai: d.n + 1 }).keadaan === "hitung", `${d.id}: hitung salah ditolak`);
    x = MK.langkahMesinKumpulan(x, { t: "HITUNG", nilai: d.n });
    sama(x.keadaan, "cek", `${d.id}: hitung benar maju`);
    const benarCek = d.n % 2 === 0 ? "bisa" : "tidak";
    cek(MK.langkahMesinKumpulan(x, { t: "CEK", nilai: benarCek === "bisa" ? "tidak" : "bisa" }).keadaan === "cek", `${d.id}: cek salah ditolak`);
    x = MK.langkahMesinKumpulan(x, { t: "CEK", nilai: benarCek });
    sama(x.keadaan, "hasil", `${d.id}: cek benar maju`);
    for (const o of MK.opsiHasil(d, i)) {
      if (o.kunci === MK.kunciHasilBenar(d)) continue;
      const s = MK.langkahMesinKumpulan(x, { t: "HASIL", nilai: o.kunci });
      cek(s.keadaan === "hasil" && s.pesan.length > 10, `${d.id}: hasil salah (${o.kunci}) ditolak dengan petunjuk`);
    }
    x = MK.langkahMesinKumpulan(x, { t: "HASIL", nilai: MK.kunciHasilBenar(d) });
    sama(x.keadaan, "sudah", `${d.id}: hasil benar`);
    cek(MK.ringkasKumpulan(d).length > 20, `${d.id}: ringkasan`);
    cek(d.n % 2 === 0 ? !/tidak bisa/.test(MK.ringkasKumpulan(d)) : /tidak bisa/.test(MK.ringkasKumpulan(d)), `${d.id}: ringkasan jujur`);
    x = MK.langkahMesinKumpulan(x, { t: "LANJUT" });
  }
  cek(x.selesai, "semua kumpulan selesai");
  cek(!MK.langkahMesinKumpulan(x, { t: "ULANG" }).selesai, "main lagi kumpulan");
}

/* ------------------------------ Misi ------------------------------ */
const Pot = (bentuk, garis, mask = [], ekstra = {}) => {
  const keping = LP.potong(bentuk, garis);
  const rasio = LP.rasioBagian(keping);
  const n = keping.length;
  const sm = LP.samaBesar(rasio);
  const k = Array.from({ length: n }, (_, i) => mask[i] === true).filter(Boolean).length;
  return { alat: "potong", bentuk, garis: garis.length, arah: garis[0] ? garis[0].arah : null, bagian: n, sama: sm, nama: LP.namaBagian(rasio), warna: k, namaWarna: LP.namaWarna(k, n, sm), batang: false, tabel: false, setengahPada: [], ...ekstra };
};
const Kum = (n, jenis, grup, ekstra = {}) => {
  const { kiri, kanan } = LK.hitungGrup(grup);
  const p = LK.pasangan(grup);
  return { alat: "kumpulan", n, jenis, kiri, kanan, sama: LK.samaBanyak(grup), sisa: p.sisa.length, pasangan: false, tabel: false, berhasil: [], jenisBerhasil: [], ...ekstra };
};
const Din = (d) => {
  const h = DD.hitungWarna(d);
  return { alat: "dinding", u: h.u, s: h.s, q: h.q, pasangan: DD.pasanganSama(d).map(([a, b]) => `${a}-${b}`) };
};
const SEL = (id) => ({ alat: "selesai", id });
const ada = (sub, k, id) => M0.misiBaru(K2B5.daftarMisiK2Bab5(sub), k, kosong).includes(id);

function ujiStruktur(nama, subs, awalSub) {
  for (const sub of subs) {
    const daftar = K2B5.daftarMisiK2Bab5(sub);
    cek(M0.misiBaru(daftar, awalSub[sub], new Set()).length === 0, `${nama} ${sub}: keadaan awal tidak memenuhi misi`);
    cek(daftar.filter((m) => m.wajib).length >= 3 && daftar.some((m) => !m.wajib), `${nama} ${sub}: ada misi wajib dan tantangan bebas`);
    cek(new Set(daftar.map((m) => m.id)).size === daftar.length, `${nama} ${sub}: id unik`);
    cek(daftar.every((m) => m.teks.length > 10 && m.teks.length < 120), `${nama} ${sub}: teks misi ringkas`);
  }
}

{
  const awalPotong = Pot(LP.AWAL_BENTUK, []);
  const awalKumpulan = Kum(LK.AWAL_N, LK.AWAL_JENIS, LK.awalGrup(LK.AWAL_N));
  const awalDinding = Din(DD.awalDinding());
  sama([awalPotong.bagian, awalPotong.nama, awalPotong.warna], [1, "utuh", 0], "awal Lab Potong netral");
  sama([awalKumpulan.sama, awalKumpulan.kiri, awalKumpulan.kanan], [false, 6, 0], "awal Lab Kumpulan netral");
  ujiStruktur("k2bab5", ["A", "B", "C"], { A: awalPotong, B: awalKumpulan, C: awalPotong });
  // Keadaan awal alat lain juga tidak memenuhi misi sub-bab itu.
  cek(M0.misiBaru(K2B5.daftarMisiK2Bab5("C"), awalDinding, kosong).length === 0, "k2bab5 C: awal dinding netral");
  cek(K2B5.daftarMisiK2Bab5("A") === K2B5.MISI_A && K2B5.daftarMisiK2Bab5("B") === K2B5.MISI_B && K2B5.daftarMisiK2Bab5("C") === K2B5.MISI_C && K2B5.daftarMisiK2Bab5("Z") === K2B5.MISI_A, "k2bab5: daftar per sub-bab");

  // Setiap misi wajib dan bebas bisa dicapai dari susunan lab sebenarnya.
  const semuaGaris = [];
  for (const a of LP.URUT_ARAH) for (let l = -LP.LANGKAH_MAKS; l <= LP.LANGKAH_MAKS; l += 1) semuaGaris.push(G(a, l));
  const susunan = (maksGaris) => {
    const hasil = [];
    for (const b of LP.URUT_BENTUK) {
      hasil.push([b, []]);
      for (const g1 of semuaGaris) {
        hasil.push([b, [g1]]);
        if (maksGaris >= 2) for (const g2 of semuaGaris) hasil.push([b, [g1, g2]]);
      }
    }
    return hasil;
  };
  const capai = (sub, maksGaris, tambahan) => {
    const dicapai = new Set();
    for (const [b, g] of susunan(maksGaris)) {
      const n = LP.potong(b, g).length;
      for (let m = 0; m < 1 << n; m += 1) {
        const mask = Array.from({ length: n }, (_, i) => (m & (1 << i)) !== 0);
        const k = Pot(b, g, mask, tambahan);
        for (const id of M0.misiBaru(K2B5.daftarMisiK2Bab5(sub), k, kosong)) dicapai.add(id);
      }
    }
    return dicapai;
  };
  const dA = capai("A", LP.MAKS_GARIS_A, { batang: true, setengahPada: ["persegi", "lingkaran", "segitiga"] });
  const dC = capai("C", LP.MAKS_GARIS_C, {});
  for (const id of ["a-persegi", "a-tidak", "a-lingkaran", "a-miring", "a-segitiga", "a-warna", "a-batang", "a-semua"]) cek(dA.has(id), `k2bab5 A: ${id} bisa dicapai di Lab Potong`);
  for (const id of ["c-empat", "c-satu", "c-dua", "c-tidak", "c-lingkaran", "c-sisa"]) cek(dC.has(id), `k2bab5 C: ${id} bisa dicapai di Lab Potong`);
  // Tanpa pengaturan yang tepat, misi A tidak otomatis tercapai.
  cek(!ada("A", Pot("persegi", [G("tegak", 2)]), "a-persegi") && !ada("A", Pot("persegi", []), "a-persegi"), "k2bab5 A: a-persegi butuh garis di tengah");
  cek(ada("A", Pot("persegi", [G("tegak", 0)]), "a-persegi") && ada("A", Pot("persegi", [G("miring1", 0)]), "a-persegi"), "k2bab5 A: a-persegi dengan tegak dan miring");
  cek(!ada("A", Pot("persegiPanjang", [G("tegak", 0)]), "a-persegi"), "k2bab5 A: a-persegi hanya untuk persegi");
  cek(ada("A", Pot("persegi", [G("tegak", 2)]), "a-tidak") && ada("A", Pot("segitiga", [G("datar", 0)]), "a-tidak") && !ada("A", Pot("persegi", [G("tegak", 0)]), "a-tidak"), "k2bab5 A: a-tidak hanya bila tidak sama besar");
  cek(ada("A", Pot("lingkaran", [G("miring2", 0)]), "a-lingkaran") && !ada("A", Pot("lingkaran", [G("tegak", 1)]), "a-lingkaran") && !ada("A", Pot("persegi", [G("tegak", 0)]), "a-lingkaran"), "k2bab5 A: a-lingkaran");
  cek(ada("A", Pot("persegi", [G("miring2", 0)]), "a-miring") && !ada("A", Pot("persegi", [G("tegak", 0)]), "a-miring") && !ada("A", Pot("persegi", [G("miring1", 1)]), "a-miring"), "k2bab5 A: a-miring");
  cek(ada("A", Pot("segitiga", [G("tegak", 0)]), "a-segitiga") && !ada("A", Pot("segitiga", [G("datar", 0)]), "a-segitiga"), "k2bab5 A: a-segitiga hanya garis yang sama besar");
  cek(ada("A", Pot("persegi", [G("tegak", 0)], [true, false]), "a-warna") && !ada("A", Pot("persegi", [G("tegak", 0)], [false, false]), "a-warna") && !ada("A", Pot("persegi", [G("tegak", 0)], [true, true]), "a-warna") && !ada("A", Pot("persegi", [G("tegak", 2)], [true, false]), "a-warna"), "k2bab5 A: a-warna satu dari dua sama besar");
  cek(!ada("A", Pot("persegi", [G("tegak", 0)]), "a-batang") && ada("A", Pot("persegi", [G("tegak", 0)], [], { batang: true }), "a-batang") && !ada("A", Pot("persegi", [G("tegak", 2)], [], { batang: true }), "a-batang"), "k2bab5 A: a-batang butuh batang dan sama besar");
  cek(!ada("A", Pot("persegi", [G("tegak", 0)], [], { setengahPada: ["persegi", "lingkaran"] }), "a-semua") && ada("A", Pot("persegi", [G("tegak", 0)], [], { setengahPada: ["persegi", "lingkaran", "segitiga"] }), "a-semua"), "k2bab5 A: a-semua butuh tiga bentuk");
  cek(ada("A", SEL("mesin-bagian"), "a-mesin") && !ada("A", SEL("roti-lili"), "a-mesin") && !ada("A", SEL("mesin-kumpulan"), "a-mesin"), "k2bab5 A: mesin bagian");
  cek(ada("A", SEL("roti-lili"), "a-roti") && !ada("A", SEL("bagi-adil"), "a-roti") && !ada("A", SEL("kue-upe"), "a-roti"), "k2bab5 A: skenario roti");

  // Sub-Bab C.
  const dua = [G("tegak", 0), G("datar", 0)];
  cek(ada("C", Pot("persegi", dua), "c-empat") && !ada("C", Pot("persegi", [G("tegak", 0), G("datar", 2)]), "c-empat") && !ada("C", Pot("persegi", [G("tegak", 0)]), "c-empat"), "k2bab5 C: c-empat butuh dua garis dan sama besar");
  cek(ada("C", Pot("persegi", dua, [true, false, false, false]), "c-satu") && !ada("C", Pot("persegi", dua, [true, true, false, false]), "c-satu") && !ada("C", Pot("persegi", [G("tegak", 0)], [true, false]), "c-satu"), "k2bab5 C: c-satu seperempat");
  cek(ada("C", Pot("persegi", dua, [true, true, false, false]), "c-dua") && !ada("C", Pot("persegi", dua, [true, false, false, false]), "c-dua") && !ada("C", Pot("persegi", [G("tegak", 0), G("datar", 2)], [true, true, false, false]), "c-dua"), "k2bab5 C: c-dua setengah dari empat sama besar");
  cek(ada("C", Pot("persegi", [G("tegak", 0), G("datar", 2)]), "c-tidak") && !ada("C", Pot("persegi", dua), "c-tidak"), "k2bab5 C: c-tidak");
  cek(ada("C", Pot("lingkaran", dua), "c-lingkaran") && !ada("C", Pot("persegi", dua), "c-lingkaran"), "k2bab5 C: c-lingkaran");
  cek(ada("C", Pot("persegi", dua, [true, true, true, false]), "c-sisa") && !ada("C", Pot("persegi", dua, [true, true, false, false]), "c-sisa"), "k2bab5 C: c-sisa tiga dari empat");
  const d0 = DD.awalDinding();
  const dQS = DD.ketukBagian(DD.ketukBagian(DD.ketukBagian(d0, "q", 0), "q", 1), "s", 0);
  cek(ada("C", Din(dQS), "c-dinding") && !ada("C", Din(DD.ketukBagian(DD.ketukBagian(d0, "q", 0), "s", 0)), "c-dinding") && !ada("C", Din(d0), "c-dinding"), "k2bab5 C: c-dinding dua seperempat dan satu setengah");
  let dU = DD.ketukBagian(d0, "u", 0);
  for (let i = 0; i < 4; i += 1) dU = DD.ketukBagian(dU, "q", i);
  cek(ada("C", Din(dU), "c-utuh") && !ada("C", Din(DD.ketukBagian(d0, "u", 0)), "c-utuh"), "k2bab5 C: c-utuh");
  cek(ada("C", SEL("kue-upe"), "c-kue") && !ada("C", SEL("roti-lili"), "c-kue") && !ada("C", SEL("bagi-adil"), "c-kue"), "k2bab5 C: skenario kue");
  cek(K2B5.MISI_C.every((m) => !m.cek(Kum(6, "kelereng", LK.bagiSatuSatu(6)))) && K2B5.MISI_A.every((m) => !m.cek(Kum(6, "kelereng", LK.bagiSatuSatu(6)))), "k2bab5: Lab Kumpulan tidak memenuhi misi A atau C");

  // Sub-Bab B: bisa dicapai lewat lab sebenarnya.
  const semuaJenis = LK.URUT_KUMPULAN;
  const dB = new Set();
  for (const j of semuaJenis) {
    for (let n = LK.MIN_N; n <= LK.MAKS_N; n += 1) {
      for (let m = 0; m < 1 << n; m += 1) {
        const g = Array.from({ length: n }, (_, i) => (m & (1 << i) ? "kanan" : "kiri"));
        const ek = { pasangan: true, tabel: true, berhasil: [2, 4, 6, 8], jenisBerhasil: ["kelereng", "apel"] };
        for (const id of M0.misiBaru(K2B5.MISI_B, Kum(n, j, g, ek), kosong)) dB.add(id);
        if (dB.size === K2B5.MISI_B.length - 2) break;
      }
    }
  }
  for (const m of K2B5.MISI_B.filter((x) => !x.id.startsWith("b-mesin") && !x.id.startsWith("b-tika"))) cek(dB.has(m.id), `k2bab5 B: ${m.id} bisa dicapai di Lab Kumpulan`);
  cek(ada("B", Kum(6, "kelereng", LK.bagiSatuSatu(6)), "b-enam") && !ada("B", Kum(6, "kelereng", LK.awalGrup(6)), "b-enam") && !ada("B", Kum(6, "kelereng", LK.pindah(LK.awalGrup(6), 0)), "b-enam") && !ada("B", Kum(8, "kelereng", LK.bagiSatuSatu(8)), "b-enam"), "k2bab5 B: b-enam tepat 3 dan 3");
  cek(ada("B", Kum(10, "apel", LK.bagiSatuSatu(10)), "b-sepuluh") && !ada("B", Kum(12, "apel", LK.bagiSatuSatu(12)), "b-sepuluh") && !ada("B", Kum(10, "apel", LK.awalGrup(10)), "b-sepuluh"), "k2bab5 B: b-sepuluh");
  cek(ada("B", Kum(7, "balon", LK.bagiSatuSatu(7)), "b-ganjil") && ada("B", Kum(5, "jeruk", LK.bagiSatuSatu(5)), "b-ganjil") && !ada("B", Kum(7, "balon", LK.awalGrup(7)), "b-ganjil") && !ada("B", Kum(8, "balon", LK.bagiSatuSatu(8)), "b-ganjil") && !ada("B", Kum(7, "balon", LK.pindah(LK.pindah(LK.bagiSatuSatu(7), 0), 2)), "b-ganjil"), "k2bab5 B: b-ganjil selalu sisa satu");
  cek(ada("B", Kum(4, "ikan", LK.bagiSatuSatu(4), { pasangan: true }), "b-pasang") && !ada("B", Kum(4, "ikan", LK.bagiSatuSatu(4)), "b-pasang") && !ada("B", Kum(5, "ikan", LK.bagiSatuSatu(5), { pasangan: true }), "b-pasang"), "k2bab5 B: b-pasang");
  cek(ada("B", Kum(4, "ikan", LK.bagiSatuSatu(4), { berhasil: [2, 4, 6, 8] }), "b-empat") && !ada("B", Kum(4, "ikan", LK.bagiSatuSatu(4), { berhasil: [2, 4, 6] }), "b-empat"), "k2bab5 B: b-empat");
  cek(ada("B", Kum(4, "ikan", LK.bagiSatuSatu(4), { jenisBerhasil: ["kelereng", "apel"] }), "b-jenis") && !ada("B", Kum(4, "ikan", LK.bagiSatuSatu(4), { jenisBerhasil: ["kelereng"] }), "b-jenis"), "k2bab5 B: b-jenis");
  cek(ada("B", Kum(4, "ikan", LK.bagiSatuSatu(4), { tabel: true }), "b-tabel") && !ada("B", Kum(4, "ikan", LK.bagiSatuSatu(4)), "b-tabel") && !ada("B", Kum(5, "ikan", LK.bagiSatuSatu(5), { tabel: true }), "b-tabel"), "k2bab5 B: b-tabel");
  cek(ada("B", SEL("mesin-kumpulan"), "b-mesin") && !ada("B", SEL("bagi-adil"), "b-mesin") && !ada("B", SEL("mesin-bagian"), "b-mesin"), "k2bab5 B: mesin kumpulan");
  cek(ada("B", SEL("bagi-adil"), "b-tika") && !ada("B", SEL("kue-upe"), "b-tika") && !ada("B", SEL("roti-lili"), "b-tika"), "k2bab5 B: skenario Tika");

  // Misi tidak dicabut: dicatat oleh laporMisi (diuji di uji-lab-kelas2), di sini hanya memastikan daftar tidak memakai impor nilai.
  cek(typeof M0.laporMisi === "function" && typeof M0.tampilMisi === "function", "misi-simulasi menyediakan laporMisi dan tampilMisi");
}

console.log(gagal === 0 ? `SEMUA LULUS (${lulus} cek)` : `GAGAL ${gagal} dari ${lulus + gagal}`);
process.exit(gagal === 0 ? 0 : 1);
