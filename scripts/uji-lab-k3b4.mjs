// Uji logika murni dan misi Matematika Kelas 3 Bab 4 (Unsur-Unsur Bangun Datar): Lab Ruas Garis, Lab Sudut, Lab Dua Garis
// (dua garis dan bangun), tiga Mesin Bertahap, skenario, pengeja suara, dan misi.
// Jalankan: node --no-warnings scripts/uji-lab-k3b4.mjs
import * as M0 from "../src/components/modul/misi-simulasi.ts";
import * as K3 from "../src/components/modul/misi-k3bab4.ts";
import * as TK from "../src/components/modul/misi-teks-k3b4.ts";
import * as R from "../src/components/modul/lab-ruas-k3b4.ts";
import * as S from "../src/components/modul/lab-sudut-k3b4.ts";
import * as G from "../src/components/modul/lab-garis-k3b4.ts";
import * as ME from "../src/components/modul/mesin-bertahap-k3b1.ts";
import * as MD from "../src/components/modul/mesin-data-k3b4.ts";
import * as SK from "../src/components/modul/skenario-k3b4.ts";
import * as EJ from "../src/components/modul/eja-k3b4.ts";

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
const sel = (id) => ({ alat: "selesai", id });
const acakDari = (seed0) => {
  let seed = seed0;
  return (n) => {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    return seed % n;
  };
};

/* ------------------------------ Pengeja suara ------------------------------ */
{
  const lihat = new Set();
  let rusak = 0;
  for (let n = 0; n <= 999; n += 1) {
    const t = EJ.kataBil(n);
    if (!t || /undefined|NaN/.test(t) || lihat.has(t)) rusak += 1;
    lihat.add(t);
  }
  cek(rusak === 0, `kataBil 0..999 terdefinisi dan unik (rusak ${rusak})`);
  sama(EJ.ejaK3B4("50°"), "lima puluh derajat", "50°");
  sama(EJ.ejaK3B4("5,5 cm"), "lima koma lima sentimeter", "5,5 cm");
  sama(EJ.ejaK3B4("55 mm"), "lima puluh lima milimeter", "55 mm");
  sama(EJ.ejaK3B4("AB ⊥ BC"), "AB tegak lurus BC", "⊥");
  sama(EJ.ejaK3B4("EF // GH"), "EF sejajar GH", "//");
  sama(EJ.ejaK3B4("∠AOB"), "sudut A O B", "∠AOB");
  sama(EJ.ejaK3B4("300° + 60° = 360°"), "tiga ratus derajat ditambah enam puluh derajat sama dengan tiga ratus enam puluh derajat", "jumlah sudut");
  sama(EJ.ejaK3B4("360° − 300° = 60°"), "tiga ratus enam puluh derajat dikurangi tiga ratus derajat sama dengan enam puluh derajat", "kurang sudut");
  sama(EJ.ejaK3B4("3 cm 7 mm"), "tiga sentimeter tujuh milimeter", "3 cm 7 mm");
  sama(EJ.ejaK3B4("50° < 90°"), "lima puluh derajat kurang dari sembilan puluh derajat", "banding");
  sama(EJ.ejaK3B4("14,5 cm"), "empat belas koma lima sentimeter", "14,5 cm");
  cek(!/[0-9°∠⊥]/.test(EJ.ejaK3B4("∠AOB = 135°, 5 cm 5 mm = 5,5 cm, AB ⊥ BC, EF // GH")), "tidak ada angka atau lambang tersisa setelah dieja");
}

/* ------------------------------ Lab Ruas Garis ------------------------------ */
const rr = (x, ...a) => a.reduce((s, ak) => R.langkahRuas(s, ak), x);
function geserRuas(x, target) {
  let s = x;
  for (let i = 0; i < 100 && s.awal !== target; i += 1) {
    const sel2 = target - s.awal;
    const d = Math.abs(sel2) >= 10 ? (sel2 > 0 ? 10 : -10) : sel2 > 0 ? 1 : -1;
    const t = R.langkahRuas(s, { t: "GESER", d });
    if (t.awal === s.awal) return t;
    s = t;
  }
  return s;
}
const ukurRuas = (x, id) => R.langkahRuas(geserRuas(R.langkahRuas(x, { t: "RUAS", id }), 0), { t: "BACA" });
const tandaiSemua = (x, id) => {
  let s = R.langkahRuas(x, { t: "BANGUN", id });
  for (let i = 0; i < R.cariBangunRuas(id).sisi.length; i += 1) s = R.langkahRuas(s, { t: "TANDAI", i });
  return s;
};
const kr = R.keadaanRuas;

{
  const x = R.awalRuas();
  cek(x.jenis === "sinar" && x.pjgKiri === 0 && x.pjgKanan === 0 && x.kurva.length === 0 && !x.ruasLurus && x.ruas === "ab" && x.awal === 20 && x.pernah.length === 0 && x.pernahUkur.length === 0 && !x.pernahSalah && x.pernahLengkap.length === 0 && !x.tampil.mm && !x.tampil.desimal, "awal ruas: bersih, ruas AB di angka 20 mm (bukan nol)");

  // Teks ukuran dapat dibalik untuk semua mm.
  let salahTeks = 0;
  for (let mm = 0; mm <= 150; mm += 1) {
    const m = R.teksCmMm(mm).match(/^(?:(\d+) cm)?(?: ?(\d+) mm)?$/);
    if (!m || (m[1] ? Number(m[1]) * 10 : 0) + (m[2] ? Number(m[2]) : 0) !== mm) salahTeks += 1;
    const d = R.teksDesimalCm(mm).match(/^(\d+)(?:,(\d+))? cm$/);
    if (!d || Math.round((Number(d[1]) + (d[2] ? Number(`0.${d[2]}`) : 0)) * 10) !== mm) salahTeks += 1;
  }
  cek(salahTeks === 0, `teksCmMm dan teksDesimalCm dapat dibalik untuk 0..150 mm (selisih ${salahTeks})`);
  sama(R.teksCmMm(55), "5 cm 5 mm", "55 mm");
  sama(R.teksCmMm(50), "5 cm", "50 mm");
  sama(R.teksCmMm(37), "3 cm 7 mm", "37 mm");
  sama(R.teksCmMm(7), "7 mm", "7 mm");
  sama(R.teksDesimalCm(55), "5,5 cm", "55 mm desimal");
  sama(R.teksDesimalCm(50), "5 cm", "50 mm desimal");
  sama(R.teksDesimalCm(37), "3,7 cm", "37 mm desimal");
  sama(R.teksDesimalCm(145), "14,5 cm", "145 mm desimal");
  sama(R.uraianUkuran(55, { mm: true, desimal: true }), "5 cm 5 mm = 55 mm = 5,5 cm", "uraian 55");
  sama(R.uraianUkuran(50, { mm: true, desimal: true }), "5 cm = 50 mm", "uraian 50 tanpa pengulangan");
  sama(R.uraianUkuran(37, { mm: false, desimal: false }), "3 cm 7 mm", "uraian polos");
  cek(R.RUAS_UKUR.every((r) => r.mm >= 5 && r.mm <= 145 && r.nama.length === 2), "semua ruas 5 sampai 145 mm dan bernama dua huruf");

  // Sinar garis: hanya satu sisi.
  const k1 = rr(x, { t: "PERPANJANG", arah: "kanan" });
  cek(k1.pjgKanan === 1 && k1.pjgKiri === 0 && k1.pernah.includes("sinar-kanan") && !k1.pernah.includes("sinar-kiri-tolak"), "sinar diperpanjang ke kanan (menjauhi pangkal)");
  const k2 = rr(k1, { t: "PERPANJANG", arah: "kiri" });
  cek(k2.pjgKiri === 0 && k2.pernah.includes("sinar-kiri-tolak") && k2.pesan.includes("satu sisi"), "sinar tidak bisa diperpanjang ke arah pangkal");
  let sinarMaks = x;
  for (let i = 0; i < 6; i += 1) sinarMaks = rr(sinarMaks, { t: "PERPANJANG", arah: "kanan" });
  cek(sinarMaks.pjgKanan === R.MAKS_PJG && sinarMaks.pesan.length > 5, "sinar boleh terus, dibatasi tampilan, dengan penjelasan");
  // Garis: dua sisi.
  const g0 = rr(x, { t: "JENIS", jenis: "garis" });
  const g1 = rr(g0, { t: "PERPANJANG", arah: "kiri" }, { t: "PERPANJANG", arah: "kanan" });
  cek(g1.pjgKiri === 1 && g1.pjgKanan === 1 && g1.pernah.includes("garis-kiri") && g1.pernah.includes("garis-kanan"), "garis diperpanjang ke kedua sisi");
  cek(g1.pesan.includes("kedua sisi"), "pesan garis menyebut kedua sisi");
  let garisMaks = g0;
  for (let i = 0; i < 6; i += 1) garisMaks = rr(garisMaks, { t: "PERPANJANG", arah: "kiri" });
  cek(garisMaks.pjgKiri === R.MAKS_PJG && garisMaks.pesan.includes("tidak punya ujung"), "garis tidak punya ujung");
  // Ruas garis: tidak bisa.
  const rs = rr(x, { t: "JENIS", jenis: "ruas" }, { t: "PERPANJANG", arah: "kanan" });
  cek(rs.pjgKanan === 0 && rs.pjgKiri === 0 && rs.pernah.includes("ruas-tolak") && rs.pesan.includes("tidak bisa diperpanjang"), "ruas garis tidak bisa diperpanjang");
  cek(rr(rs, { t: "PERPANJANG", arah: "kiri" }).pjgKiri === 0, "ruas garis tidak bisa diperpanjang ke kiri juga");
  // Ganti jenis mengatur ulang perpanjangan.
  const ganti = rr(g1, { t: "JENIS", jenis: "sinar" });
  cek(ganti.pjgKiri === 0 && ganti.pjgKanan === 0 && ganti.pernah.length === g1.pernah.length, "ganti jenis mengosongkan perpanjangan tetapi menyimpan riwayat");

  // Dua titik: satu ruas lurus dan banyak kurva.
  let dt = rr(x, { t: "RUAS_LURUS" });
  cek(dt.ruasLurus && dt.pesan.includes("satu ruas garis lurus"), "ruas lurus antara dua titik hanya satu");
  for (const k of R.KURVA_DUA_TITIK) dt = rr(dt, { t: "KURVA", id: k.id });
  cek(dt.kurva.length === 4 && kr(dt).kurva === 4, "empat kurva berbeda dapat digambar");
  cek(rr(dt, { t: "KURVA", id: "busur" }).kurva.length === 3 && rr(dt, { t: "KURVA", id: "tidak-ada" }).kurva.length === 4, "kurva dapat dilepas, id tak dikenal diabaikan");

  // Memilih ruas: awal selalu sah.
  for (const r of R.RUAS_UKUR) {
    const s = rr(x, { t: "RUAS", id: r.id });
    cek(s.awal >= 0 && s.awal + r.mm <= R.PANJANG_PENGGARIS, `ruas ${r.nama}: awal ${s.awal} sah`);
  }
  // Batas geser.
  const kiri = rr(geserRuas(x, 0), { t: "GESER", d: -1 });
  cek(kiri.awal === 0 && kiri.pesan.length > 5, "tidak bisa digeser di kiri nol");
  const kanan = geserRuas(x, 100);
  cek(kanan.awal === 100 && rr(kanan, { t: "GESER", d: 1 }).awal === 100 && rr(kanan, { t: "GESER", d: 1 }).pesan.length > 5, "AB (50 mm) mentok di 100 mm");

  // Baca: hanya dari nol yang benar. Diuji untuk semua ruas dan semua posisi.
  const salah = rr(x, { t: "BACA" });
  cek(salah.pernahSalah && salah.pernahUkur.length === 0 && salah.hasil === "" && salah.pesan.includes("bukan angka 0"), "baca dari angka 20 mm: keliru, dengan penjelasan");
  cek(salah.pesan.includes("7 cm") || salah.pesan.includes("cm"), "pesan keliru menyebut bacaan");
  let salahPosisi = 0;
  for (const r of R.RUAS_UKUR)
    for (let awal = 0; awal + r.mm <= R.PANJANG_PENGGARIS; awal += 1) {
      const t = R.langkahRuas({ ...R.awalRuas(), ruas: r.id, awal }, { t: "BACA" });
      if ((awal === 0) !== (t.hasil !== "")) salahPosisi += 1;
      if (awal === 0 && !t.pernahUkur.includes(r.id)) salahPosisi += 1;
      if (awal !== 0 && (!t.pernahSalah || t.pernahUkur.length !== 0)) salahPosisi += 1;
      if (awal === 0 && !t.hasil.includes(R.teksCmMm(r.mm))) salahPosisi += 1;
    }
  cek(salahPosisi === 0, `semua ruas dan posisi: hanya dari nol yang benar (selisih ${salahPosisi})`);
  for (const r of R.RUAS_UKUR) cek(ukurRuas(x, r.id).pernahUkur.includes(r.id), `${r.nama}: dapat diukur lewat tombol`);

  // Sisi: tandai semua sisi.
  for (const b of R.BANGUN_RUAS) {
    const n = b.huruf.length;
    cek(b.sisi.length === n && n >= 3, `${b.id}: banyak sisi sama dengan banyak titik sudut (${n})`);
    cek(b.sisi.every((s) => s.length === 2 && [...s].every((c) => b.huruf.includes(c)) && s[0] !== s[1]) && new Set(b.sisi).size === n, `${b.id}: tiap sisi menghubungkan dua titik berbeda dan unik`);
    const lengkap = tandaiSemua(x, b.id);
    cek(lengkap.pernahLengkap.includes(b.id) && lengkap.tandai.every(Boolean) && lengkap.pesan.includes(String(n)), `${b.id}: tandai semua ${n} sisi`);
    const kurang = R.langkahRuas(lengkap, { t: "TANDAI", i: 0 });
    cek(!kurang.tandai.every(Boolean) && kurang.pernahLengkap.includes(b.id), `${b.id}: melepas tanda tidak menghapus riwayat`);
    const baru = R.langkahRuas(x, { t: "BANGUN", id: b.id });
    cek(baru.tandai.length === n && baru.tandai.every((t) => !t) && !baru.pernahLengkap.includes(b.id), `${b.id}: ganti bangun mengosongkan tanda`);
    if (n > 3) cek(!R.langkahRuas(x, { t: "BANGUN", id: b.id }).pernahLengkap.length, `${b.id}: belum lengkap tanpa menandai`);
  }
  cek(R.langkahRuas(x, { t: "TANDAI", i: 9 }) === x, "tandai sisi di luar bangun diabaikan");
  sama(R.cariBangunRuas("segitiga").sisi, ["EF", "FG", "EG"], "sisi segitiga EFG sesuai naskah");

  // Fuzz.
  const acak = acakDari(2024);
  let rusak = 0;
  let f = R.awalRuas();
  const ID_R = R.RUAS_UKUR.map((r) => r.id);
  const ID_B = R.BANGUN_RUAS.map((b) => b.id);
  for (let i = 0; i < 20000; i += 1) {
    const r = acak(12);
    const aksi =
      r === 0 ? { t: "JENIS", jenis: ["sinar", "garis", "ruas"][acak(3)] } : r === 1 ? { t: "PERPANJANG", arah: acak(2) ? "kiri" : "kanan" } : r === 2 ? { t: "KURVA", id: R.KURVA_DUA_TITIK[acak(4)].id } : r === 3 ? { t: "RUAS_LURUS" } : r === 4 ? { t: "RUAS", id: ID_R[acak(6)] } : r < 8 ? { t: "GESER", d: [1, -1, 10, -10][acak(4)] } : r === 8 ? { t: "BACA" } : r === 9 ? { t: "TOGGLE", rep: acak(2) ? "mm" : "desimal" } : r === 10 ? { t: "BANGUN", id: ID_B[acak(4)] } : { t: "TANDAI", i: acak(6) };
    f = R.langkahRuas(f, aksi);
    const ru = R.cariRuas(f.ruas);
    if (f.awal < 0 || f.awal + ru.mm > R.PANJANG_PENGGARIS) rusak += 1;
    if (f.pjgKiri < 0 || f.pjgKiri > R.MAKS_PJG || f.pjgKanan < 0 || f.pjgKanan > R.MAKS_PJG) rusak += 1;
    if (f.jenis === "sinar" && f.pjgKiri !== 0) rusak += 1;
    if (f.jenis === "ruas" && (f.pjgKiri !== 0 || f.pjgKanan !== 0)) rusak += 1;
    if (f.tandai.length !== R.cariBangunRuas(f.bangun).sisi.length) rusak += 1;
    for (const id of f.pernahUkur) if (!ID_R.includes(id)) rusak += 1;
    if (new Set(f.pernahUkur).size !== f.pernahUkur.length || new Set(f.pernah).size !== f.pernah.length) rusak += 1;
  }
  cek(rusak === 0, `fuzz ruas: invarian terjaga (pelanggaran ${rusak})`);
  sama(R.langkahRuas(ukurRuas(x, "mn"), { t: "RESET" }), R.awalRuas(), "reset ruas");
  cek(R.ucapRuas(x).includes("Geser") && R.ucapRuas(ukurRuas(x, "mn")).includes("lima sentimeter") === false && R.ucapRuas(ukurRuas(x, "mn")).includes("5 cm 5 mm"), "ucapan ruas");
}

/* ------------------------------ Lab Sudut ------------------------------ */
const ss = (x, ...a) => a.reduce((s, ak) => S.langkahSudut(s, ak), x);
function setSudut(x, target) {
  let s = x;
  for (let i = 0; i < 200 && s.sudut !== target; i += 1) {
    const sel2 = target - s.sudut;
    const d = Math.abs(sel2) >= 45 ? (sel2 > 0 ? 45 : -45) : Math.abs(sel2) >= 10 ? (sel2 > 0 ? 10 : -10) : sel2 > 0 ? 1 : -1;
    const t = S.langkahSudut(s, { t: "PUTAR", d });
    if (t.sudut === s.sudut) return t;
    s = t;
  }
  return s;
}
const ksd = S.keadaanSudut;

{
  const x = S.awalSudut();
  cek(x.sudut === 30 && Object.values(x.tampil).every((v) => !v) && x.pernahJenis.length === 0 && x.sudutS === 90 && x.irisan === "besar" && x.pernahSatuan.length === 0, "awal sudut: 30°, semua tampilan mati, bersih");

  // Jenis sudut untuk semua 0..360, dibandingkan dengan klasifikasi mandiri.
  let salahJenis = 0;
  for (let d = 0; d <= 360; d += 1) {
    const harus = d === 0 ? "berimpit" : d < 90 ? "lancip" : d === 90 ? "siku-siku" : d < 180 ? "tumpul" : d === 180 ? "lurus" : d < 360 ? "refleks" : "penuh";
    if (S.jenisSudut(d) !== harus) salahJenis += 1;
    if (S.pasanganSudut(d) + d !== 360) salahJenis += 1;
    const b = S.bacaBusur(d);
    if (d <= 180 ? !(b.langsung && b.baca === d) : !(!b.langsung && b.baca === 360 - d && b.baca < 180)) salahJenis += 1;
    const bs = S.bandingSiku(d);
    if (bs !== (d < 90 ? "lebih kecil" : d === 90 ? "sama" : "lebih besar")) salahJenis += 1;
  }
  cek(salahJenis === 0, `jenis, pasangan, baca busur, dan banding siku untuk 0..360 (selisih ${salahJenis})`);
  cek(S.jenisSudut(89) === "lancip" && S.jenisSudut(91) === "tumpul" && S.jenisSudut(179) === "tumpul" && S.jenisSudut(181) === "refleks" && S.jenisSudut(359) === "refleks", "batas jenis sudut");
  sama(S.pasanganSudut(300), 60, "pasangan 300");
  sama(S.pasanganSudut(230), 130, "pasangan 230");
  cek(SUDUT_OK(), "sudut satuan kelipatan 30");
  function SUDUT_OK() {
    return S.SUDUT_SATUAN.every((d) => d % 30 === 0 && d % 15 === 0) && S.SUDUT_SATUAN.length === 6;
  }
  for (const d of S.SUDUT_SATUAN) {
    cek(S.banyakIrisan(d, "kecil") === 2 * S.banyakIrisan(d, "besar") && Number.isInteger(S.banyakIrisan(d, "besar")), `${d}°: irisan kecil dua kali irisan besar`);
  }
  sama([S.banyakIrisan(90, "besar"), S.banyakIrisan(90, "kecil")], [3, 6], "90° = 3 irisan besar = 6 irisan kecil");

  // Putar dan batas.
  cek(setSudut(x, 300).sudut === 300 && setSudut(x, 0).sudut === 0 && setSudut(x, 360).sudut === 360, "sudut dapat diputar ke 0, 300, dan 360 lewat tombol");
  const bawah = S.langkahSudut(setSudut(x, 0), { t: "PUTAR", d: -1 });
  cek(bawah.sudut === 0 && bawah.pesan.length > 5, "tidak di bawah 0°");
  const atas = S.langkahSudut(setSudut(x, 360), { t: "PUTAR", d: 1 });
  cek(atas.sudut === 360 && atas.pesan.includes("360"), "tidak lebih dari 360°");
  cek(S.langkahSudut(setSudut(x, 355), { t: "PUTAR", d: 10 }).sudut === 360, "melebihi 360° dipotong di 360°");

  // Jenis hanya dicatat saat Jenis sudut menyala.
  let b0 = setSudut(setSudut(x, 90), 120);
  cek(b0.pernahJenis.length === 0, "tanpa Jenis sudut tidak ada riwayat jenis");
  let j = ss(x, { t: "TOGGLE", rep: "jenis" });
  cek(j.pernahJenis.includes("lancip") && j.pernahJenis.length === 1, "menyalakan Jenis sudut mencatat jenis sekarang (30° lancip)");
  for (const d of [90, 120, 180, 250]) j = setSudut(j, d);
  sama(j.pernahJenis, ["lancip", "siku-siku", "tumpul", "lurus", "refleks"], "lima jenis bernama tercatat berurutan");
  cek(!setSudut(ss(x, { t: "TOGGLE", rep: "jenis" }), 0).pernahJenis.includes("berimpit"), "kaki berimpit bukan jenis sudut bernama");
  cek(!setSudut(ss(x, { t: "TOGGLE", rep: "jenis" }), 360).pernahJenis.includes("penuh"), "putaran penuh bukan jenis sudut bernama");

  // Satuan.
  let st = ss(x, { t: "IRISAN", irisan: "besar" });
  cek(st.pernahSatuan.includes("90:besar") && st.pernahSatuan.length === 1, "irisan besar pada 90° tercatat");
  st = ss(st, { t: "IRISAN", irisan: "kecil" });
  cek(st.pernahSatuan.includes("90:kecil") && K3.satuanGanda(st.pernahSatuan), "irisan kecil pada 90° juga: bilangannya berbeda");
  cek(!K3.satuanGanda(["90:besar", "60:kecil"]) && !K3.satuanGanda([]) && K3.satuanGanda(["30:besar", "30:kecil"]), "satuanGanda: harus sudut yang sama");
  cek(ss(x, { t: "SUDUT_S", d: 1 }).sudutS === 120 && ss(x, { t: "SUDUT_S", d: -1 }).sudutS === 60, "sudut satuan bergeser 30°");
  let batas = x;
  for (let i = 0; i < 8; i += 1) batas = ss(batas, { t: "SUDUT_S", d: 1 });
  cek(batas.sudutS === 180 && batas.pesan.length > 5, "sudut satuan paling besar 180°");
  for (let i = 0; i < 8; i += 1) batas = ss(batas, { t: "SUDUT_S", d: -1 });
  cek(batas.sudutS === 30, "sudut satuan paling kecil 30°");

  // Fuzz.
  const acak = acakDari(777);
  let rusak = 0;
  let f = S.awalSudut();
  for (let i = 0; i < 20000; i += 1) {
    const r = acak(6);
    const aksi = r < 3 ? { t: "PUTAR", d: [1, -1, 10, -10, 45, -45][acak(6)] } : r === 3 ? { t: "TOGGLE", rep: ["pojok", "busur", "jenis", "pasangan"][acak(4)] } : r === 4 ? { t: "SUDUT_S", d: acak(2) ? 1 : -1 } : { t: "IRISAN", irisan: acak(2) ? "besar" : "kecil" };
    f = S.langkahSudut(f, aksi);
    if (f.sudut < 0 || f.sudut > 360 || !S.SUDUT_SATUAN.includes(f.sudutS)) rusak += 1;
    for (const p of f.pernahSatuan) {
      const [d, ir] = p.split(":");
      if (!S.SUDUT_SATUAN.includes(Number(d)) || !["besar", "kecil"].includes(ir)) rusak += 1;
    }
    if (new Set(f.pernahJenis).size !== f.pernahJenis.length || !f.pernahJenis.every((q) => S.JENIS_BERNAMA.includes(q))) rusak += 1;
  }
  cek(rusak === 0, `fuzz sudut: invarian terjaga (pelanggaran ${rusak})`);
  sama(S.langkahSudut(st, { t: "RESET" }), S.awalSudut(), "reset sudut");
  cek(S.ucapSudut(setSudut(x, 300)).includes("60") && S.ucapSudut(setSudut(x, 300)).includes("refleks") && S.ucapSatuan(x).includes("3 irisan besar"), "ucapan sudut menyebut pasangan dan irisan");
}

/* ------------------------------ Lab Dua Garis ------------------------------ */
const gg = (x, ...a) => a.reduce((s, ak) => G.langkahGaris(s, ak), x);
/** Atur arah biru, arah merah, dan geser lewat tombol. */
function setGaris(x, ab, ar, g) {
  let s = x;
  for (let i = 0; i < 8 && s.ab !== ab; i += 1) s = G.langkahGaris(s, { t: "PUTAR", garis: "biru", d: 45 });
  for (let i = 0; i < 8 && s.ar !== ar; i += 1) s = G.langkahGaris(s, { t: "PUTAR", garis: "merah", d: 45 });
  for (let i = 0; i < 10 && s.g !== g; i += 1) s = G.langkahGaris(s, { t: "GESER", d: s.g < g ? 1 : -1 });
  return s;
}
const kg = G.keadaanGaris;
const cross = (u, v) => u[0] * v[1] - u[1] * v[0];

{
  const x = G.awalGaris();
  cek(x.ab === 0 && x.ar === 45 && x.g === 0 && Object.values(x.tampil).every((v) => !v) && Object.values(x.tampilB).every((v) => !v) && x.rakit === 0 && x.pernahRakit.length === 0, "awal garis: biru 0°, merah 45°, bersih");
  cek(kg(x).relasi === "bukan", "awal garis: bukan sejajar dan bukan tegak lurus");

  // Hubungan dua garis dihitung dari arah, dan dibandingkan dengan klasifikasi mandiri untuk semua kombinasi.
  let salahRel = 0;
  let jumlah = 0;
  const hit = { sejajar: 0, "tegak-lurus": 0, bukan: 0, berimpit: 0 };
  for (const ab of G.ARAH)
    for (const ar of G.ARAH)
      for (let g = -3; g <= 3; g += 1) {
        jumlah += 1;
        const beda = (((ar - ab) % 180) + 180) % 180;
        const harus = beda === 0 ? (g === 0 ? "berimpit" : "sejajar") : beda === 90 ? "tegak-lurus" : "bukan";
        const rel = G.relasiGaris(ab, ar, g);
        hit[rel] += 1;
        if (rel !== harus) salahRel += 1;
        const d1 = G.vektor(ab);
        const d2 = G.vektor(ar);
        const potong = G.titikPotong(ab, ar, g);
        const sejajarVek = cross(d1, d2) === 0;
        if ((potong === null) !== sejajarVek) salahRel += 1;
        if (potong) {
          // titik potong terletak pada kedua garis
          const p2 = G.titikMerah(ar, g);
          if (Math.abs(cross([potong[0] - G.TITIK_BIRU[0], potong[1] - G.TITIK_BIRU[1]], d1)) > 1e-9) salahRel += 1;
          if (Math.abs(cross([potong[0] - p2[0], potong[1] - p2[1]], d2)) > 1e-9) salahRel += 1;
        }
        const sel2 = G.selisihUjung(ab, ar, g);
        const vert = ab === 90 || ar === 90;
        if (ab === 90 && ar === 90) {
          if (!sel2 || sel2.kiri !== g || sel2.kanan !== g) salahRel += 1;
        } else if (vert) {
          if (sel2 !== null) salahRel += 1;
        } else if (rel === "sejajar") {
          if (!sel2 || sel2.kiri !== g || sel2.kanan !== g) salahRel += 1;
        } else if (rel === "berimpit") {
          if (!sel2 || sel2.kiri !== 0 || sel2.kanan !== 0) salahRel += 1;
        } else if (!sel2 || sel2.kiri === sel2.kanan) {
          salahRel += 1;
        }
      }
  cek(salahRel === 0 && jumlah === 4 * 4 * 7, `relasi, titik potong, dan selisih ujung untuk ${jumlah} kombinasi (selisih ${salahRel})`);
  cek(hit.sejajar > 0 && hit["tegak-lurus"] > 0 && hit.bukan > 0 && hit.berimpit > 0, "keempat hubungan dapat terjadi");
  cek(G.relasiGaris(0, 90, 0) === "tegak-lurus" && G.relasiGaris(45, 135, 2) === "tegak-lurus" && G.relasiGaris(0, 0, 0) === "berimpit" && G.relasiGaris(0, 0, 2) === "sejajar" && G.relasiGaris(0, 45, 0) === "bukan" && G.relasiGaris(90, 135, 1) === "bukan", "contoh hubungan");
  // Titik potong garis tegak lurus berada di dalam kertas untuk semua pergeseran.
  let dalam = true;
  for (const ab of G.ARAH) for (const ar of G.ARAH) for (let g = -3; g <= 3; g += 1) if (G.relasiGaris(ab, ar, g) === "tegak-lurus") {
    const p = G.titikPotong(ab, ar, g);
    if (!p || p[0] < 0 || p[0] > G.PETAK || p[1] < 0 || p[1] > G.PETAK) dalam = false;
  }
  cek(dalam, "titik siku-siku selalu di dalam kertas berpetak");
  sama(G.lambangRelasi("tegak-lurus"), "⊥", "lambang tegak lurus");
  sama(G.lambangRelasi("sejajar"), "//", "lambang sejajar");
  sama(G.lambangRelasi("bukan"), "", "bukan keduanya tanpa lambang");
  sama(G.lambangRelasi("berimpit"), "", "berimpit tanpa lambang");

  // Putar dan geser.
  cek(gg(x, { t: "PUTAR", garis: "merah", d: 45 }).ar === 90 && gg(x, { t: "PUTAR", garis: "merah", d: -45 }).ar === 0, "putar merah ±45°");
  cek(gg(G.awalGaris(), { t: "PUTAR", garis: "biru", d: -45 }).ab === 135 && gg(setGaris(x, 135, 45, 0), { t: "PUTAR", garis: "biru", d: 45 }).ab === 0, "arah melingkar 0, 45, 90, 135, kembali 0");
  const bunyi = setGaris(x, 0, 0, 3);
  cek(bunyi.g === 3 && G.langkahGaris(bunyi, { t: "GESER", d: 1 }).g === 3 && G.langkahGaris(bunyi, { t: "GESER", d: 1 }).pesan.length > 5, "geser paling jauh 3 petak");
  cek(setGaris(x, 0, 0, -3).g === -3 && G.langkahGaris(setGaris(x, 0, 0, -3), { t: "GESER", d: -1 }).g === -3, "geser paling jauh −3 petak");
  // Berimpit bukan sejajar.
  const bim = setGaris(x, 0, 0, 0);
  cek(kg(bim).relasi === "berimpit" && G.ceritaRelasi(bim).includes("bukan dua garis sejajar"), "dua garis berimpit tidak disebut sejajar");
  const sj = setGaris(x, 0, 0, 2);
  cek(kg(sj).relasi === "sejajar" && G.ceritaRelasi(sj).includes("2 petak") && G.ceritaRelasi(sj).includes("tidak pernah bertemu"), "sejajar: jarak 2 petak, tidak pernah bertemu");
  const tl = setGaris(x, 0, 90, 0);
  cek(kg(tl).relasi === "tegak-lurus" && G.ceritaRelasi(tl).includes("sudut siku-siku") && G.ceritaRelasi(tl).includes("kotak kecil"), "tegak lurus: sudut siku-siku dan tanda kotak");
  cek(G.ceritaRelasi(x).includes("bukan sejajar") && G.ceritaRelasi(x).includes("tidak tegak lurus"), "bukan keduanya dijelaskan");
  // Bukan keduanya pada garis yang jaraknya sama tetapi bersilang.
  cek(G.ceritaRelasi(x).includes("bersilang") && G.ceritaRelasi(x).includes("3 petak di bawah garis biru") && G.ceritaRelasi(x).includes("3 petak di atas garis biru"), "awal: kedudukan berlawanan dijelaskan (3 petak di bawah di kiri, di atas di kanan)");
  cek(G.teksJarak(x).includes("di bawah") && G.teksJarak(x).includes("di atas") && !G.teksJarak(x).includes("sama"), "jarak petak awal menyebut kedudukan, bukan 'sama'");
  cek(G.teksJarak(setGaris(x, 0, 0, 2)).includes("Jarak di ujung kiri: 2 petak") && G.teksJarak(setGaris(x, 0, 0, 2)).includes("Jaraknya sama"), "jarak petak sejajar: sama");
  cek(G.teksJarak(setGaris(x, 0, 0, 0)).includes("berimpit") && G.teksJarak(setGaris(x, 90, 45, 0)).includes("bertemu"), "jarak petak berimpit dan bertemu");
  const tidakSama = G.teksJarak(setGaris(x, 0, 135, 1));
  cek(tidakSama.includes("garis merah") && /\d petak/.test(tidakSama), "jarak petak garis lain menyebut kedudukan");

  // Bangun.
  for (const b of G.BANGUN_C) {
    cek(b.sisi === b.sudut || b.id === "lingkaran", `${b.id}: banyak sisi sama dengan banyak sudut`);
    cek(b.ciri.length > 10 && b.sama.length > 5, `${b.id}: ciri dan keterangan sisi ada`);
  }
  const bm = (id) => G.cariBangunC(id);
  cek(bm("segitiga").sisi === 3 && bm("persegi").sisi === 4 && bm("persegi").siku === 4 && bm("persegi-panjang").siku === 4 && bm("segilima").sisi === 5 && bm("segilima").siku === 0 && bm("lingkaran").sudut === 0 && bm("lingkaran").sisi === 0 && bm("segitiga").siku === 0, "ciri bangun sesuai naskah");
  cek(bm("persegi").sama.includes("sama panjang") && bm("persegi-panjang").sama.includes("berhadapan"), "persegi: semua sisi sama; persegi panjang: yang berhadapan");
  cek(bm("lingkaran").ciri.includes("garis lengkung") && bm("lingkaran").ciri.toLowerCase().includes("tidak punya sudut"), "lingkaran dibatasi garis lengkung dan tanpa sudut");

  // Rakit batang.
  let rk = x;
  for (let n = 1; n <= 8; n += 1) rk = G.langkahGaris(rk, { t: "RAKIT", d: 1 });
  cek(rk.rakit === 8 && rk.pernahRakit.length === 8 && G.langkahGaris(rk, { t: "RAKIT", d: 1 }).pesan.length > 5 && G.langkahGaris(rk, { t: "RAKIT", d: 1 }).rakit === 8, "rakit sampai 8 batang dan dibatasi");
  cek(G.langkahGaris(x, { t: "RAKIT", d: -1 }).rakit === 0 && G.langkahGaris(x, { t: "RAKIT", d: -1 }).pesan.length > 5, "tidak ada batang yang bisa diambil dari kosong");
  for (let n = 0; n <= 8; n += 1) {
    cek(G.rakitTertutup(n) === (n >= 3), `${n} batang: tertutup hanya bila paling sedikit 3`);
    cek(G.namaRakit(n).length > 5, `${n} batang: ada penjelasan`);
  }
  cek(G.namaRakit(2).includes("belum tertutup") && G.namaRakit(3).startsWith("Segitiga") && G.namaRakit(4).startsWith("Segiempat") && G.namaRakit(5).startsWith("Segilima") && G.namaRakit(6).startsWith("Segienam"), "nama rakitan");
  cek(G.namaRakit(6).includes("6 sisi") && G.namaRakit(6).includes("6 sudut"), "segienam: 6 sisi dan 6 sudut");
  const turun = gg(x, { t: "RAKIT", d: 1 }, { t: "RAKIT", d: 1 }, { t: "RAKIT", d: 1 }, { t: "RAKIT", d: -1 });
  cek(turun.rakit === 2 && turun.pernahRakit.includes(3) && turun.pernahRakit.includes(2), "mengurangi batang tidak menghapus riwayat");

  // Fuzz.
  const acak = acakDari(31415);
  let rusak = 0;
  let f = G.awalGaris();
  for (let i = 0; i < 20000; i += 1) {
    const r = acak(8);
    const aksi = r === 0 ? { t: "PUTAR", garis: acak(2) ? "biru" : "merah", d: acak(2) ? 45 : -45 } : r === 1 ? { t: "GESER", d: acak(2) ? 1 : -1 } : r === 2 ? { t: "TOGGLE", rep: ["lambang", "jarak", "pojok"][acak(3)] } : r === 3 ? { t: "BANGUN", id: G.BANGUN_C[acak(5)].id } : r === 4 ? { t: "TOGGLE_B", rep: ["sisi", "sudut", "sama", "siku"][acak(4)] } : { t: "RAKIT", d: acak(2) ? 1 : -1 };
    f = G.langkahGaris(f, aksi);
    if (!G.ARAH.includes(f.ab) || !G.ARAH.includes(f.ar) || f.g < -3 || f.g > 3 || f.rakit < 0 || f.rakit > 8) rusak += 1;
    const k = kg(f);
    const beda = (((f.ar - f.ab) % 180) + 180) % 180;
    if ((k.relasi === "tegak-lurus") !== (beda === 90)) rusak += 1;
    if ((k.relasi === "sejajar" || k.relasi === "berimpit") !== (beda === 0)) rusak += 1;
    if (k.relasi === "sejajar" && k.kiri !== null && k.kiri !== k.kanan) rusak += 1;
    if (k.relasi === "bukan" && k.kiri !== null && k.kiri === k.kanan) rusak += 1;
    if (new Set(f.pernahRakit).size !== f.pernahRakit.length || f.pernahRakit.some((n) => n < 1 || n > 8)) rusak += 1;
  }
  cek(rusak === 0, `fuzz garis: invarian terjaga (pelanggaran ${rusak})`);
  sama(G.langkahGaris(rk, { t: "RESET" }), G.awalGaris(), "reset garis");
  cek(G.ucapGaris(tl).includes("tegak lurus") && !G.ucapGaris(tl).includes("⊥") && G.ucapBangun(x).includes("Segitiga"), "ucapan garis tanpa lambang");
}

/* ------------------------------ Mesin Bertahap ------------------------------ */
const bersih = (t) => t.replace(/°/g, "");
const bandingBenar = (t) => {
  const m = bersih(t).match(/^(\d+) ([<=>]) (\d+)$/);
  if (!m) return null;
  const a = Number(m[1]);
  const b = Number(m[3]);
  return m[2] === "<" ? a < b : m[2] === ">" ? a > b : a === b;
};

cek(MD.SEMUA_MESIN_K3B4.length === 3, "ada tiga definisi mesin");
{
  const posisi = [];
  for (const def of MD.SEMUA_MESIN_K3B4) {
    cek(def.stasiun.length === 4 && def.kasus.length === 3, `${def.id}: 4 stasiun, 3 kasus`);
    cek(new Set(def.kasus.map((k) => k.id)).size === def.kasus.length, `${def.id}: id kasus unik`);
    const lokal = [];
    for (const kasus of def.kasus) {
      cek(kasus.langkah.length === def.stasiun.length, `${def.id}/${kasus.id}: satu langkah per stasiun`);
      kasus.langkah.forEach((l, i) => {
        cek(l.stasiun === def.stasiun[i].id, `${kasus.id}: stasiun ${i} bernama ${def.stasiun[i].id}`);
        cek(l.opsi.length === 3 && new Set(l.opsi).size === 3, `${kasus.id}/${l.stasiun}: tiga pilihan unik (${JSON.stringify(l.opsi)})`);
        cek(l.opsi.filter((o) => o === l.benar).length === 1, `${kasus.id}/${l.stasiun}: tepat satu kunci`);
        cek(l.petunjuk.length > 20 && l.tanya.length > 5, `${kasus.id}/${l.stasiun}: tanya dan petunjuk ada`);
        lokal.push(l.opsi.indexOf(l.benar));
      });
    }
    posisi.push(...lokal);
    cek(new Set(lokal).size === 3, `${def.id}: letak kunci bervariasi (${lokal.join("")})`);

    let x = ME.awalMesin(def);
    cek(ME.indeksStasiun(x) === 0 && x.ke === 0 && x.misi === 0 && !x.selesai, `${def.id}: awal di stasiun pertama`);
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
      x = ME.langkahMesin(x, { t: "LANJUT" });
    }
    cek(x.selesai && x.fase === "selesai", `${def.id}: semua kasus selesai`);
    const baru = ME.langkahMesin(x, { t: "ULANG" });
    cek(!baru.selesai && baru.misi === 0 && baru.ke === 0 && baru.ditolak === 0, `${def.id}: main lagi kembali ke awal`);
  }
  cek(new Set(posisi).size === 3, `letak kunci bervariasi di semua mesin (${posisi.join("")})`);
  sama(MD.SEMUA_MESIN_K3B4.map((d) => d.selesaiId), Object.values(K3.ID_MESIN_K3B4), "selesaiId mesin sama dengan id misi");

  // Kunci diperiksa mandiri.
  const cmmm = (mm) => {
    const cm = Math.floor(mm / 10);
    const s = mm % 10;
    return cm === 0 ? `${s} mm` : s === 0 ? `${cm} cm` : `${cm} cm ${s} mm`;
  };
  MD.KASUS_RUAS.forEach((k, idx) => {
    const [jenis, nol, baca, ubah] = MD.MESIN_RUAS.kasus[idx].langkah;
    cek(k.mm >= 5 && k.mm <= 145, `${k.id}: panjang dalam jangkauan penggaris`);
    cek(jenis.benar === "ruas garis" && jenis.opsi.includes("sinar garis") && jenis.opsi.includes("garis"), `${k.id}: jenis ruas garis dengan pengecoh sinar dan garis`);
    cek(nol.benar === "0", `${k.id}: mulai dari 0`);
    cek(baca.benar === cmmm(k.mm) && !baca.opsi.filter((o) => o !== baca.benar).includes(cmmm(k.mm)), `${k.id}: baca ${cmmm(k.mm)}`);
    for (const o of baca.opsi.filter((q) => q !== baca.benar)) cek(o === cmmm(k.mm + 10) || o === cmmm(k.mm + 1), `${k.id}: pengecoh baca "${o}" satu lebih atau sepuluh lebih`);
    if (idx % 2 === 1) {
      cek(ubah.benar === MD.teksDesimalMesin(k.mm) && ubah.benar.endsWith("cm") && ubah.benar.includes(","), `${k.id}: ubah ke cm desimal`);
      cek(ubah.opsi.some((o) => o === `${Math.floor(k.mm / 10)},0${k.mm % 10} cm`), `${k.id}: pengecoh salah nol (5,05 cm)`);
    } else {
      cek(ubah.benar === `${k.mm} mm`, `${k.id}: ubah ke ${k.mm} mm`);
      cek(ubah.opsi.some((o) => o === `${Math.floor(k.mm / 10) * 100 + (k.mm % 10)} mm`), `${k.id}: pengecoh salah seratus`);
    }
    cek(MD.teksCmMmMesin(k.mm) === cmmm(k.mm), `${k.id}: teksCmMmMesin`);
  });
  cek(MD.KASUS_RUAS.some((k) => k.mm % 10 === 0) && MD.KASUS_RUAS.some((k) => k.mm % 10 !== 0), "mesin ruas: ada yang tepat sentimeter dan ada yang bersisa milimeter");

  MD.KASUS_SUDUT.forEach((k, idx) => {
    const [letak, baca, jenis, periksa] = MD.MESIN_SUDUT.kasus[idx].langkah;
    const harus = k.d < 90 ? "lancip" : k.d === 90 ? "siku-siku" : k.d < 180 ? "tumpul" : k.d === 180 ? "lurus" : "refleks";
    cek(letak.benar === "O, titik sudut", `${k.id}: titik tengah busur di titik sudut`);
    cek(baca.benar === `${k.d}°`, `${k.id}: baca ${k.d}°`);
    if (k.d <= 180) cek(baca.opsi.includes(`${180 - k.d}°`) && baca.opsi.includes(`${k.d + 10}°`), `${k.id}: pengecoh skala salah (${180 - k.d}°) dan ${k.d + 10}°`);
    else cek(baca.tanya.includes(`${360 - k.d}°`) && baca.opsi.includes(`${180 - (360 - k.d)}°`) && baca.opsi.includes(`${360 + (360 - k.d)}°`), `${k.id}: refleks dibaca lewat pasangan ${360 - k.d}°`);
    cek(jenis.benar === harus && MD.jenisSudutMesin(k.d) === harus, `${k.id}: jenis ${harus}`);
    cek(!jenis.opsi.filter((o) => o !== jenis.benar).includes(harus), `${k.id}: pengecoh jenis berbeda`);
    cek(bandingBenar(periksa.benar) === true, `${k.id}: kalimat periksa benar "${periksa.benar}"`);
    for (const o of periksa.opsi.filter((q) => q !== periksa.benar)) cek(bandingBenar(o) === false, `${k.id}: pengecoh periksa salah "${o}"`);
  });
  cek(MD.KASUS_SUDUT.some((k) => k.d < 90) && MD.KASUS_SUDUT.some((k) => k.d > 90 && k.d < 180) && MD.KASUS_SUDUT.some((k) => k.d > 180), "mesin sudut: lancip, tumpul, dan refleks");

  MD.KASUS_GARIS.forEach((k, idx) => {
    const [cekS, hub, lambang, bukti] = MD.MESIN_GARIS.kasus[idx].langkah;
    const harus = k.tipe === "tegak" ? "tegak lurus" : k.tipe === "sejajar" ? "sejajar" : "bukan keduanya";
    cek(hub.benar === harus && hub.opsi.length === 3, `${k.id}: hubungan ${harus}`);
    cek(k.tipe === "tegak" ? cekS.benar === "pojok kertas lipat" : cekS.benar === "jarak petak", `${k.id}: cara memeriksa`);
    if (k.tipe === "tegak") {
      cek(lambang.benar === `${k.a} ⊥ ${k.b}` && lambang.opsi.includes(`${k.a} // ${k.b}`), `${k.id}: lambang ⊥ dengan pengecoh //`);
      cek(bukti.benar === "90° (siku-siku)", `${k.id}: bukti 90°`);
    } else {
      const sama2 = k.jarak[0] === k.jarak[1];
      cek(bukti.benar === (sama2 ? "sama, jadi sejajar" : "berbeda, jadi bukan sejajar"), `${k.id}: bukti jarak ${k.jarak.join(" dan ")}`);
      cek(sama2 === (k.tipe === "sejajar"), `${k.id}: tipe sesuai jarak`);
      if (k.tipe === "sejajar") cek(lambang.benar === `${k.a} // ${k.b}` && lambang.opsi.includes(`${k.a} ⊥ ${k.b}`), `${k.id}: lambang // dengan pengecoh ⊥`);
      else cek(lambang.benar.startsWith("tidak ada lambang") && lambang.opsi.includes(`${k.a} // ${k.b}`) && lambang.opsi.includes(`${k.a} ⊥ ${k.b}`), `${k.id}: bukan keduanya tanpa lambang`);
    }
  });
  cek(MD.KASUS_GARIS.map((k) => k.tipe).sort().join() === "bukan,sejajar,tegak", "mesin garis memuat tegak lurus, sejajar, dan bukan");
}

/* ------------------------------ Misi ------------------------------ */
const keadaanAwal = [kr(R.awalRuas()), ksd(S.awalSudut()), kg(G.awalGaris())];
const SEMUA_ID = [...Object.values(K3.ID_MESIN_K3B4), ...Object.values(K3.ID_SKENARIO_K3B4), "x"];
for (const h of ["A", "B", "C"]) {
  const daftar = K3.daftarMisiK3Bab4(h);
  const wajib = daftar.filter((m) => m.wajib);
  cek(wajib.length >= 3, `sub-bab ${h}: minimal 3 misi wajib (${wajib.length})`);
  cek(daftar.some((m) => !m.wajib), `sub-bab ${h}: ada tantangan bebas`);
  const idMisi = new Set();
  for (const m of daftar) {
    cek(!idMisi.has(m.id), `misi ${m.id}: id unik`);
    idMisi.add(m.id);
    cek(m.id.startsWith(`${h.toLowerCase()}-`), `misi ${m.id}: berawalan huruf sub-bab`);
    cek(m.teks.length >= 10 && m.teks.length <= 170, `misi ${m.id}: panjang teks ${m.teks.length}`);
    for (const ke of keadaanAwal) cek(!m.cek(ke), `misi ${m.id}: keadaan awal ${ke.alat} tidak memenuhinya`);
  }
  cek(!M0.wajibSelesai(M0.tampilMisi(daftar), new Set()), `sub-bab ${h}: gerbang tertutup di awal`);
  for (const m of daftar.filter((x) => x.id.endsWith("mesin") || x.id.endsWith("skenario"))) {
    const idBenar = m.id.endsWith("mesin") ? K3.ID_MESIN_K3B4[h] : K3.ID_SKENARIO_K3B4[h];
    cek(m.cek(sel(idBenar)), `misi ${m.id}: tercapai oleh ${idBenar}`);
    for (const lain of SEMUA_ID.filter((v) => v !== idBenar)) cek(!m.cek(sel(lain)), `misi ${m.id}: tidak boleh tercapai oleh ${lain}`);
  }
  for (const m of daftar.filter((x) => !x.id.endsWith("mesin") && !x.id.endsWith("skenario"))) for (const id of SEMUA_ID) cek(!m.cek(sel(id)), `misi ${m.id}: tidak tercapai oleh selesai ${id}`);
  sama(MD.SEMUA_MESIN_K3B4["ABC".indexOf(h)].selesaiId, K3.ID_MESIN_K3B4[h], `selesaiId mesin ${h}`);
  cek(TK.MISI_K3B4[h].length > 60 && TK.NAMA_SIM_K3B4[h].length > 10 && TK.misiAwalK3Bab4(h).startsWith("Simulasi 1. Misi:"), `teks misi ${h}`);
}
cek(TK.hurufK3B4("B") === "B" && TK.hurufK3B4("C") === "C" && TK.hurufK3B4("Z") === "A", "hurufK3B4 jatuh ke A bila tak dikenal");
cek([SK.SKENARIO_K3B4A, SK.SKENARIO_K3B4B, SK.SKENARIO_K3B4C].every((s) => s.adegan.length >= 5 && s.adegan.length <= 8), "tiga skenario ada dan cukup adegan");

const misiDi = (h, id) => K3.daftarMisiK3Bab4(h).find((m) => m.id === id);
const penuh = (h, id, ke) => cek(misiDi(h, id).cek(ke), `misi ${id} tercapai`);
const belum = (h, id, ke, ket) => cek(!misiDi(h, id).cek(ke), `misi ${id} belum tercapai: ${ket}`);

/* ---- Bukti tiap misi bisa dicapai dari alat sebenarnya, lewat tombol ---- */

// Sub-Bab A
{
  const a0 = R.awalRuas();
  const jenisLengkap = rr(a0, { t: "PERPANJANG", arah: "kanan" }, { t: "PERPANJANG", arah: "kiri" }, { t: "JENIS", jenis: "garis" }, { t: "PERPANJANG", arah: "kiri" }, { t: "PERPANJANG", arah: "kanan" });
  penuh("A", "a-jenis", kr(jenisLengkap));
  belum("A", "a-jenis", kr(rr(a0, { t: "PERPANJANG", arah: "kanan" }, { t: "PERPANJANG", arah: "kiri" })), "baru sinar");
  belum("A", "a-jenis", kr(rr(a0, { t: "JENIS", jenis: "garis" }, { t: "PERPANJANG", arah: "kiri" }, { t: "PERPANJANG", arah: "kanan" })), "baru garis");
  belum("A", "a-jenis", kr(rr(a0, { t: "PERPANJANG", arah: "kanan" }, { t: "JENIS", jenis: "garis" }, { t: "PERPANJANG", arah: "kiri" }, { t: "PERPANJANG", arah: "kanan" })), "sinar kiri belum ditolak");
  let dt = rr(a0, { t: "RUAS_LURUS" });
  for (const k of ["busur", "s"]) dt = rr(dt, { t: "KURVA", id: k });
  belum("A", "a-dua-titik", kr(dt), "baru dua kurva");
  dt = rr(dt, { t: "KURVA", id: "gelombang" });
  penuh("A", "a-dua-titik", kr(dt));
  belum("A", "a-dua-titik", kr(rr(a0, { t: "KURVA", id: "busur" }, { t: "KURVA", id: "s" }, { t: "KURVA", id: "gelombang" })), "tanpa ruas lurus");
  const mn = rr(ukurRuas(a0, "mn"), { t: "TOGGLE", rep: "mm" }, { t: "TOGGLE", rep: "desimal" });
  penuh("A", "a-ukur", kr(mn));
  belum("A", "a-ukur", kr(ukurRuas(a0, "mn")), "tampilan belum menyala");
  belum("A", "a-ukur", kr(rr(ukurRuas(a0, "ab"), { t: "TOGGLE", rep: "mm" }, { t: "TOGGLE", rep: "desimal" })), "bukan MN");
  belum("A", "a-ukur", kr(rr(rr(a0, { t: "RUAS", id: "mn" }), { t: "BACA" }, { t: "TOGGLE", rep: "mm" }, { t: "TOGGLE", rep: "desimal" })), "belum digeser ke nol");
  penuh("A", "a-salah", kr(rr(a0, { t: "BACA" })));
  belum("A", "a-salah", kr(ukurRuas(a0, "mn")), "dari nol tidak salah");
  let sisi = tandaiSemua(a0, "segitiga");
  belum("A", "a-sisi", kr(sisi), "baru segitiga");
  sisi = tandaiSemua(sisi, "segilima");
  penuh("A", "a-sisi", kr(sisi));
  belum("A", "a-sisi", kr(tandaiSemua(tandaiSemua(a0, "segitiga"), "segiempat")), "segiempat bukan segilima");
  penuh("A", "a-37", kr(ukurRuas(a0, "pq")));
  belum("A", "a-37", kr(ukurRuas(a0, "mn")), "bukan PQ");
  penuh("A", "a-ruas-tolak", kr(rr(a0, { t: "JENIS", jenis: "ruas" }, { t: "PERPANJANG", arah: "kanan" })));
  belum("A", "a-ruas-tolak", kr(rr(a0, { t: "PERPANJANG", arah: "kiri" })), "sinar bukan ruas");
  penuh("A", "a-enam", kr(tandaiSemua(a0, "segienam")));
  belum("A", "a-enam", kr(tandaiSemua(a0, "segilima")), "segilima bukan segienam");
  for (const ke of keadaanAwal.slice(1)) for (const m of K3.MISI_A) belum("A", m.id, ke, `alat ${ke.alat} bukan lab ruas`);
}

// Sub-Bab B
{
  const b0 = S.awalSudut();
  const k90 = ss(setSudut(b0, 90), { t: "TOGGLE", rep: "pojok" });
  penuh("B", "b-siku", ksd(k90));
  belum("B", "b-siku", ksd(setSudut(b0, 90)), "pojok belum menyala");
  belum("B", "b-siku", ksd(ss(setSudut(b0, 91), { t: "TOGGLE", rep: "pojok" })), "91° bukan siku-siku");
  belum("B", "b-siku", ksd(ss(setSudut(b0, 45), { t: "TOGGLE", rep: "pojok" })), "45° bukan siku-siku");
  penuh("B", "b-gambar", ksd(ss(setSudut(b0, 50), { t: "TOGGLE", rep: "busur" })));
  belum("B", "b-gambar", ksd(setSudut(b0, 50)), "Busur derajat belum menyala");
  belum("B", "b-gambar", ksd(ss(setSudut(b0, 130), { t: "TOGGLE", rep: "busur" })), "130° bukan 50°");
  let j = ss(b0, { t: "TOGGLE", rep: "jenis" });
  belum("B", "b-jenis", ksd(j), "baru lancip");
  for (const d of [90, 120]) j = setSudut(j, d);
  belum("B", "b-jenis", ksd(j), "belum lurus");
  j = setSudut(j, 180);
  penuh("B", "b-jenis", ksd(j));
  belum("B", "b-jenis", ksd(setSudut(setSudut(setSudut(setSudut(b0, 90), 120), 180), 30)), "Jenis sudut tidak menyala");
  penuh("B", "b-refleks", ksd(ss(setSudut(b0, 300), { t: "TOGGLE", rep: "pasangan" })));
  belum("B", "b-refleks", ksd(setSudut(b0, 300)), "Pasangan belum menyala");
  belum("B", "b-refleks", ksd(ss(setSudut(b0, 60), { t: "TOGGLE", rep: "pasangan" })), "60° bukan 300°");
  const sat = ss(b0, { t: "IRISAN", irisan: "besar" }, { t: "IRISAN", irisan: "kecil" });
  penuh("B", "b-satuan", ksd(sat));
  belum("B", "b-satuan", ksd(ss(b0, { t: "IRISAN", irisan: "besar" })), "baru satu irisan");
  belum("B", "b-satuan", ksd(ss(b0, { t: "IRISAN", irisan: "kecil" }, { t: "SUDUT_S", d: -1 })), "irisan kecil pada dua sudut berbeda, tanpa irisan besar");
  penuh("B", "b-satuan", ksd(ss(b0, { t: "IRISAN", irisan: "besar" }, { t: "SUDUT_S", d: 1 }, { t: "IRISAN", irisan: "kecil" })));
  penuh("B", "b-lurus", ksd(ss(setSudut(b0, 180), { t: "TOGGLE", rep: "pojok" })));
  belum("B", "b-lurus", ksd(setSudut(b0, 180)), "Pojok kertas belum menyala");
  penuh("B", "b-nol", ksd(ss(setSudut(setSudut(b0, 90), 0), { t: "TOGGLE", rep: "busur" })));
  belum("B", "b-nol", ksd(setSudut(b0, 0)), "Busur belum menyala");
  penuh("B", "b-135", ksd(ss(setSudut(b0, 135), { t: "TOGGLE", rep: "busur" })));
  belum("B", "b-135", ksd(ss(setSudut(b0, 134), { t: "TOGGLE", rep: "busur" })), "134° bukan 135°");
  penuh("B", "b-230", ksd(ss(setSudut(b0, 230), { t: "TOGGLE", rep: "pasangan" })));
  belum("B", "b-230", ksd(ss(setSudut(b0, 130), { t: "TOGGLE", rep: "pasangan" })), "130° bukan 230°");
  for (const ke of keadaanAwal.filter((k) => k.alat !== "sudut")) for (const m of K3.MISI_B) belum("B", m.id, ke, `alat ${ke.alat} bukan lab sudut`);
}

// Sub-Bab C
{
  const c0 = G.awalGaris();
  const tegak = gg(setGaris(c0, 0, 90, 0), { t: "TOGGLE", rep: "lambang" });
  penuh("C", "c-tegak", kg(tegak));
  belum("C", "c-tegak", kg(setGaris(c0, 0, 90, 0)), "Lambang belum menyala");
  belum("C", "c-tegak", kg(gg(setGaris(c0, 0, 0, 1), { t: "TOGGLE", rep: "lambang" })), "sejajar bukan tegak lurus");
  const tegakMiring = gg(setGaris(c0, 45, 135, 0), { t: "TOGGLE", rep: "lambang" });
  penuh("C", "c-tegak", kg(tegakMiring));
  const sej = gg(setGaris(c0, 0, 0, 1), { t: "TOGGLE", rep: "lambang" }, { t: "TOGGLE", rep: "jarak" });
  penuh("C", "c-sejajar", kg(sej));
  belum("C", "c-sejajar", kg(setGaris(c0, 0, 0, 1)), "Lambang dan Jarak belum menyala");
  belum("C", "c-sejajar", kg(gg(setGaris(c0, 0, 0, 1), { t: "TOGGLE", rep: "lambang" })), "Jarak petak belum menyala");
  belum("C", "c-sejajar", kg(gg(setGaris(c0, 0, 0, 0), { t: "TOGGLE", rep: "lambang" }, { t: "TOGGLE", rep: "jarak" })), "berimpit bukan sejajar");
  belum("C", "c-sejajar", kg(gg(c0, { t: "TOGGLE", rep: "lambang" }, { t: "TOGGLE", rep: "jarak" })), "awal bukan sejajar");
  const bukan = gg(c0, { t: "TOGGLE", rep: "jarak" });
  penuh("C", "c-bukan", kg(bukan));
  belum("C", "c-bukan", kg(c0), "Jarak petak belum menyala");
  belum("C", "c-bukan", kg(gg(setGaris(c0, 0, 90, 0), { t: "TOGGLE", rep: "jarak" })), "tegak lurus bukan 'bukan keduanya'");
  belum("C", "c-bukan", kg(gg(setGaris(c0, 0, 0, 1), { t: "TOGGLE", rep: "jarak" })), "sejajar bukan 'bukan keduanya'");
  belum("C", "c-bukan", kg(gg(setGaris(c0, 90, 45, 0), { t: "TOGGLE", rep: "jarak" })), "satu garis tegak: jarak tidak dibandingkan");
  let rk = gg(c0, { t: "RAKIT", d: 1 }, { t: "RAKIT", d: 1 });
  belum("C", "c-rakit", kg(rk), "baru dua batang");
  rk = gg(rk, { t: "RAKIT", d: 1 });
  penuh("C", "c-rakit", kg(rk));
  belum("C", "c-rakit", kg(gg(c0, { t: "RAKIT", d: 1 })), "baru satu batang");
  penuh("C", "c-rakit", kg(gg(c0, { t: "RAKIT", d: 1 }, { t: "RAKIT", d: 1 }, { t: "RAKIT", d: 1 }, { t: "RAKIT", d: 1 }, { t: "RAKIT", d: -1 }, { t: "RAKIT", d: -1 }, { t: "RAKIT", d: -1 }, { t: "RAKIT", d: -1 })));
  penuh("C", "c-lingkaran", kg(gg(c0, { t: "BANGUN", id: "lingkaran" }, { t: "TOGGLE_B", rep: "sudut" })));
  belum("C", "c-lingkaran", kg(gg(c0, { t: "BANGUN", id: "lingkaran" })), "Sudut belum menyala");
  belum("C", "c-lingkaran", kg(gg(c0, { t: "BANGUN", id: "persegi" }, { t: "TOGGLE_B", rep: "sudut" })), "persegi bukan lingkaran");
  const mir = gg(setGaris(c0, 45, 45, 1), { t: "TOGGLE", rep: "jarak" });
  penuh("C", "c-miring", kg(mir));
  belum("C", "c-miring", kg(gg(setGaris(c0, 0, 0, 1), { t: "TOGGLE", rep: "jarak" })), "sejajar mendatar bukan miring");
  belum("C", "c-miring", kg(setGaris(c0, 45, 45, 1)), "Jarak petak belum menyala");
  penuh("C", "c-miring", kg(gg(setGaris(c0, 135, 135, -2), { t: "TOGGLE", rep: "jarak" })));
  penuh("C", "c-berimpit", kg(setGaris(c0, 0, 0, 0)));
  belum("C", "c-berimpit", kg(setGaris(c0, 0, 0, 1)), "sejajar bukan berimpit");
  const persegi = gg(c0, { t: "BANGUN", id: "persegi" }, { t: "TOGGLE_B", rep: "sisi" }, { t: "TOGGLE_B", rep: "sudut" }, { t: "TOGGLE_B", rep: "sama" }, { t: "TOGGLE_B", rep: "siku" });
  penuh("C", "c-persegi", kg(persegi));
  belum("C", "c-persegi", kg(gg(c0, { t: "BANGUN", id: "persegi" }, { t: "TOGGLE_B", rep: "sisi" }, { t: "TOGGLE_B", rep: "sudut" }, { t: "TOGGLE_B", rep: "sama" })), "Siku-siku belum menyala");
  belum("C", "c-persegi", kg(gg(persegi, { t: "BANGUN", id: "persegi-panjang" })), "persegi panjang bukan persegi");
  let enam = c0;
  for (let i = 0; i < 6; i += 1) enam = gg(enam, { t: "RAKIT", d: 1 });
  penuh("C", "c-enam", kg(enam));
  belum("C", "c-enam", kg(gg(c0, { t: "RAKIT", d: 1 }, { t: "RAKIT", d: 1 }, { t: "RAKIT", d: 1 }, { t: "RAKIT", d: 1 }, { t: "RAKIT", d: 1 })), "lima batang");
  for (const ke of keadaanAwal.filter((k) => k.alat !== "garis")) for (const m of K3.MISI_C) belum("C", m.id, ke, `alat ${ke.alat} bukan lab garis`);
}

/* ---- Gerbang bekerja ---- */
for (const h of ["A", "B", "C"]) {
  const daftar = K3.daftarMisiK3Bab4(h);
  const tampil = M0.tampilMisi(daftar);
  const sudah = new Set();
  const catat = (keadaan) => {
    for (const id of M0.misiBaru(daftar, keadaan, sudah)) sudah.add(id);
  };
  const urut = daftar.filter((m) => m.wajib).map((m) => m.id);
  if (h === "A") {
    const a0 = R.awalRuas();
    let s = rr(a0, { t: "PERPANJANG", arah: "kanan" }, { t: "PERPANJANG", arah: "kiri" }, { t: "JENIS", jenis: "garis" }, { t: "PERPANJANG", arah: "kiri" }, { t: "PERPANJANG", arah: "kanan" });
    catat(kr(s));
    s = rr(s, { t: "RUAS_LURUS" }, { t: "KURVA", id: "busur" }, { t: "KURVA", id: "s" }, { t: "KURVA", id: "gelombang" });
    catat(kr(s));
    s = rr(ukurRuas(s, "mn"), { t: "TOGGLE", rep: "mm" }, { t: "TOGGLE", rep: "desimal" });
    catat(kr(s));
    catat(kr(rr(a0, { t: "BACA" })));
    s = tandaiSemua(tandaiSemua(s, "segitiga"), "segilima");
    catat(kr(s));
  } else if (h === "B") {
    const b0 = S.awalSudut();
    catat(ksd(ss(setSudut(b0, 90), { t: "TOGGLE", rep: "pojok" })));
    catat(ksd(ss(setSudut(b0, 50), { t: "TOGGLE", rep: "busur" })));
    let j = ss(b0, { t: "TOGGLE", rep: "jenis" });
    for (const d of [90, 120, 180]) {
      j = setSudut(j, d);
      catat(ksd(j));
    }
    catat(ksd(ss(setSudut(b0, 300), { t: "TOGGLE", rep: "pasangan" })));
    catat(ksd(ss(b0, { t: "IRISAN", irisan: "besar" }, { t: "IRISAN", irisan: "kecil" })));
  } else {
    const c0 = G.awalGaris();
    catat(kg(gg(setGaris(c0, 0, 90, 0), { t: "TOGGLE", rep: "lambang" })));
    catat(kg(gg(setGaris(c0, 0, 0, 1), { t: "TOGGLE", rep: "lambang" }, { t: "TOGGLE", rep: "jarak" })));
    catat(kg(gg(c0, { t: "TOGGLE", rep: "jarak" })));
    catat(kg(gg(c0, { t: "RAKIT", d: 1 }, { t: "RAKIT", d: 1 }, { t: "RAKIT", d: 1 })));
    catat(kg(gg(c0, { t: "BANGUN", id: "lingkaran" }, { t: "TOGGLE_B", rep: "sudut" })));
  }
  cek(!M0.wajibSelesai(tampil, sudah) && sudah.size >= 3, `gerbang ${h}: masih tertutup setelah misi alat saja`);
  catat(sel(K3.ID_MESIN_K3B4[h]));
  cek(!M0.wajibSelesai(tampil, sudah), `gerbang ${h}: tertutup tanpa skenario`);
  catat(sel(K3.ID_SKENARIO_K3B4[h]));
  cek(M0.wajibSelesai(tampil, sudah), `gerbang ${h}: terbuka setelah semua misi wajib (belum: ${urut.filter((id) => !sudah.has(id)).join(",")})`);
  catat(keadaanAwal[0]);
  cek(M0.wajibSelesai(tampil, sudah), `gerbang ${h}: tetap terbuka setelah alat diubah`);
}
{
  const tampil = M0.tampilMisi(K3.daftarMisiK3Bab4("A"));
  const o = { adaMisi: true, wajibSelesai: M0.wajibSelesai(tampil, new Set()), dilewati: false, disentuh: false };
  cek(!M0.bolehLanjut(o) && !M0.bolehLewati(o), "belum menyentuh: tidak boleh lanjut dan belum boleh lewati");
  cek(M0.bolehLewati({ ...o, disentuh: true }) && !M0.bolehLanjut({ ...o, disentuh: true }), "setelah menyentuh: boleh melewati misi");
  cek(M0.bolehLanjut({ ...o, disentuh: true, dilewati: true }), "setelah melewati: boleh lanjut");
}

/* ---- Konsep sub-bab berikutnya tidak dipakai di sub-bab sebelumnya ---- */
{
  const teksMisi = (h) => [TK.MISI_K3B4[h], TK.NAMA_SIM_K3B4[h], ...K3.daftarMisiK3Bab4(h).map((m) => m.teks)].join(" ");
  const skenario = { A: SK.SKENARIO_K3B4A, B: SK.SKENARIO_K3B4B, C: SK.SKENARIO_K3B4C };
  const mesin = { A: MD.MESIN_RUAS, B: MD.MESIN_SUDUT, C: MD.MESIN_GARIS };
  const bocorA = /(sudut|derajat|°|tegak lurus|⊥|\/\/|persegi|lingkaran|siku-siku)/i;
  cek(!bocorA.test(teksMisi("A")), "misi Sub-Bab A tidak memakai sudut, derajat, atau garis tegak lurus dan sejajar");
  cek(!bocorA.test(JSON.stringify(skenario.A)), "skenario A tidak memakai sudut, derajat, atau garis tegak lurus dan sejajar");
  cek(!bocorA.test(JSON.stringify(mesin.A)), "mesin A tidak memakai sudut, derajat, atau garis tegak lurus dan sejajar");
  const bocorB = /(tegak lurus|⊥|\/\/|garis sejajar|jarak petak|persegi panjang|lingkaran)/i;
  cek(!bocorB.test(teksMisi("B")), "misi Sub-Bab B tidak memakai garis tegak lurus atau sejajar");
  cek(!bocorB.test(JSON.stringify(skenario.B)), "skenario B tidak memakai garis tegak lurus atau sejajar");
  cek(!bocorB.test(JSON.stringify(mesin.B)), "mesin B tidak memakai garis tegak lurus atau sejajar");
  // Sub-Bab C memakai sudut siku-siku dan ruas garis dari bab sebelumnya (pencapaian bab).
  cek(/ruas garis/i.test(JSON.stringify(skenario.C)) && /siku-siku/i.test(JSON.stringify(skenario.C)) && /55 mm/.test(JSON.stringify(skenario.C)), "skenario C mengulang ruas garis, sudut siku-siku, dan ukuran milimeter");
}

console.log(`Lulus ${lulus}, gagal ${gagal}`);
process.exit(gagal ? 1 : 0);
