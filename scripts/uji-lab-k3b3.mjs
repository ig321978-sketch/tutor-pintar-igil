// Uji logika murni dan misi Matematika Kelas 3 Bab 3 (Pengukuran Panjang dan Berat): Lab Penggaris, Lab Meteran,
// Lab Timbangan, Lab Timbangan Kodok (bandul dan ubah berat), empat Mesin Bertahap, skenario, pengeja suara, dan misi.
// Jalankan: node --no-warnings scripts/uji-lab-k3b3.mjs
import * as M0 from "../src/components/modul/misi-simulasi.ts";
import * as K3 from "../src/components/modul/misi-k3bab3.ts";
import * as TK from "../src/components/modul/misi-teks-k3b3.ts";
import * as P from "../src/components/modul/lab-penggaris-k3b3.ts";
import * as MT from "../src/components/modul/lab-meteran-k3b3.ts";
import * as TB from "../src/components/modul/lab-timbang-k3b3.ts";
import * as KD from "../src/components/modul/lab-kodok-k3b3.ts";
import * as ME from "../src/components/modul/mesin-bertahap-k3b1.ts";
import * as MD from "../src/components/modul/mesin-data-k3b3.ts";
import * as SK from "../src/components/modul/skenario-k3b3.ts";
import * as EJ from "../src/components/modul/eja-k3b3.ts";

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

/* ------------------------------ Pengeja suara ------------------------------ */
{
  let rusak = 0;
  const lihat = new Set();
  for (let n = 0; n <= 20000; n += 1) {
    const t = EJ.kataBil(n);
    if (!t || /undefined|NaN/.test(t)) rusak += 1;
    if (lihat.has(t)) rusak += 1;
    lihat.add(t);
  }
  cek(rusak === 0, `kataBil 0..20000 terdefinisi dan unik (rusak ${rusak})`);
  sama(EJ.kataBil(1000), "seribu", "1000");
  sama(EJ.kataBil(1753), "seribu tujuh ratus lima puluh tiga", "1753");
  sama(EJ.kataBil(4150), "empat ribu seratus lima puluh", "4150");
  sama(EJ.kataBil(2000), "dua ribu", "2000");
  sama(EJ.kataBil(8000), "delapan ribu", "8000");
  sama(EJ.kataBil(10000), "sepuluh ribu", "10000");
  sama(EJ.kataBil(11000), "sebelas ribu", "11000");
  sama(EJ.kataBil(12500), "dua belas ribu lima ratus", "12500");
  sama(EJ.ejaK3B3("1.753 g"), "seribu tujuh ratus lima puluh tiga gram", "1.753 g");
  sama(EJ.ejaK3B3("3 m = 3 × 100 cm"), "tiga meter sama dengan tiga dikali seratus sentimeter", "3 m = 3 × 100 cm");
  sama(EJ.ejaK3B3("½ kg"), "setengah kilogram", "½ kg");
  sama(EJ.ejaK3B3("4 kg 150 g"), "empat kilogram seratus lima puluh gram", "4 kg 150 g");
  sama(EJ.ejaK3B3("1.753 − 1.000 = 753"), "seribu tujuh ratus lima puluh tiga dikurangi seribu sama dengan tujuh ratus lima puluh tiga", "kurang berangka ribuan");
  sama(EJ.ejaK3B3("… + 5"), "titik-titik ditambah lima", "titik-titik dieja");
  cek(!/[0-9]/.test(EJ.ejaK3B3("2 m 30 cm = 230 cm, 1.000 g, 10 ons")), "tidak ada angka tersisa setelah dieja");
}

/* ------------------------------ Lab Penggaris ------------------------------ */
const geserPeng = (x, target) => {
  let s = x;
  for (let i = 0; i < 100 && s.awal !== target; i += 1) {
    const sel2 = target - s.awal;
    const d = s.jenis === "meteran" && Math.abs(sel2) >= 10 ? (sel2 > 0 ? 10 : -10) : sel2 > 0 ? 1 : -1;
    const t = P.langkahPenggaris(s, { t: "GESER", d });
    if (t.awal === s.awal) return t;
    s = t;
  }
  return s;
};
const pp = (x, ...a) => a.reduce((s, ak) => P.langkahPenggaris(s, ak), x);
/** Ukur satu benda dengan alat tertentu sampai Baca dari nol. */
const ukur = (x, jenis, id) => P.langkahPenggaris(geserPeng(pp(x, { t: "ALAT", jenis }, { t: "BENDA", id }), 0), { t: "BACA" });

{
  const x = P.awalPenggaris();
  cek(x.jenis === "penggaris" && x.benda === "pensil" && x.awal === 3 && x.pernah.length === 0 && !x.pernahSalah && !x.pernahTerlalu, "awal penggaris: pensil di angka 3, bersih");
  cek(!P.keadaanPenggaris(x).dinol, "awal penggaris tidak di nol");
  sama(P.BENDA_UKUR.map((b) => b.cm), [5, 9, 15, 30, 120, 150, 200, 240], "daftar panjang benda");
  cek(P.alatTepatUkur(30) === "penggaris" && P.alatTepatUkur(31) === "meteran" && P.alatTepatUkur(150) === "meteran", "alat tepat: sampai 30 cm penggaris, selebihnya meteran");
  cek(P.ujungKanan(x) === 18, "ujung kanan pensil dari angka 3 adalah 18");

  // Baca tanpa nol: keliru, tidak dicatat sebagai pengukuran benar.
  const salah = P.langkahPenggaris(x, { t: "BACA" });
  cek(salah.pernahSalah && salah.pernah.length === 0 && salah.hasil === "" && salah.pesan.includes("18") && salah.pesan.includes("nol"), "baca dari angka 3 ditolak dengan penjelasan (18 bukan panjang)");
  // Baca dari nol: benar.
  const nol = geserPeng(x, 0);
  cek(nol.awal === 0 && P.keadaanPenggaris(nol).dinol, "geser ke angka 0");
  const baca = P.langkahPenggaris(nol, { t: "BACA" });
  cek(baca.pernah.includes("penggaris:pensil") && baca.hasil === "Pensil 15 cm", "baca dari nol: pensil 15 cm tercatat");

  // Batas geser.
  const kiri = P.langkahPenggaris(nol, { t: "GESER", d: -1 });
  cek(kiri.awal === 0 && kiri.pesan.length > 5, "tidak bisa digeser di kiri nol");
  const kanan = geserPeng(nol, 15);
  cek(kanan.awal === 15 && P.ujungKanan(kanan) === 30, "pensil bisa digeser sampai ujung penggaris (30)");
  const lewat = P.langkahPenggaris(kanan, { t: "GESER", d: 1 });
  cek(lewat.awal === 15 && lewat.pesan.length > 5, "tidak bisa digeser melewati ujung penggaris");

  // Benda panjang pada penggaris ditolak, pada meteran muat.
  const pintu = P.langkahPenggaris(x, { t: "BENDA", id: "pintu" });
  cek(!P.muat(pintu) && pintu.pernahTerlalu && pintu.pesan.includes("lebih panjang"), "pintu 200 cm tidak muat di penggaris");
  const bacaPintu = P.langkahPenggaris(pintu, { t: "BACA" });
  cek(bacaPintu.pernah.length === 0 && bacaPintu.pesan.includes("tidak muat"), "baca benda yang tidak muat ditolak");
  const gesPintu = P.langkahPenggaris(pintu, { t: "GESER", d: 1 });
  cek(gesPintu.awal === pintu.awal && gesPintu.pesan.length > 5, "geser benda yang tidak muat ditolak");
  const meter = P.langkahPenggaris(pintu, { t: "ALAT", jenis: "meteran" });
  cek(P.muat(meter) && meter.awal >= 0 && meter.awal + 200 <= 300, "pintu muat di meteran, awal sah");
  const ukurPintu = ukur(x, "meteran", "pintu");
  cek(ukurPintu.pernah.includes("meteran:pintu") && ukurPintu.hasil === "Pintu 200 cm", "pintu 200 cm diukur dengan meteran dari nol");
  // Alat kurang tepat: hasil benar tetapi tidak dihitung pengukuran yang tepat.
  const pensilMeteran = ukur(x, "meteran", "pensil");
  cek(pensilMeteran.hasil === "Pensil 15 cm" && pensilMeteran.pernah.length === 0 && pensilMeteran.pesan.includes("lebih tepat"), "pensil dengan meteran: hasil benar, tetapi tidak dihitung alat yang tepat");

  // Semua benda: ukur dari nol dengan alat yang tepat selalu memberi panjang yang benar.
  for (const b of P.BENDA_UKUR) {
    const alat = P.alatTepatUkur(b.cm);
    const s = ukur(P.awalPenggaris(), alat, b.id);
    cek(s.pernah.includes(`${alat}:${b.id}`) && s.hasil.endsWith(`${b.cm} cm`), `${b.id}: ukur ${alat} dari nol memberi ${b.cm} cm`);
    cek(P.muat({ jenis: alat, benda: b.id }) && b.cm <= P.BATAS_ALAT[alat], `${b.id} muat di alat yang tepat`);
  }
  // Setiap posisi awal yang sah: bacaan ujung kanan selalu awal + panjang, dan hanya dari nol dianggap benar.
  let salahPosisi = 0;
  for (const b of P.BENDA_UKUR)
    for (const jenis of ["penggaris", "meteran"]) {
      if (b.cm > P.BATAS_ALAT[jenis]) continue;
      for (let awal = 0; awal + b.cm <= P.BATAS_ALAT[jenis]; awal += jenis === "meteran" ? 10 : 1) {
        const s = { ...P.awalPenggaris(), jenis, benda: b.id, awal };
        const t = P.langkahPenggaris(s, { t: "BACA" });
        if (P.ujungKanan(s) !== awal + b.cm) salahPosisi += 1;
        if ((awal === 0) !== (t.hasil !== "")) salahPosisi += 1;
        if (awal !== 0 && !t.pernahSalah) salahPosisi += 1;
      }
    }
  cek(salahPosisi === 0, `semua posisi awal: hanya dari nol yang benar (selisih ${salahPosisi})`);

  // Fuzz: invarian terjaga.
  let seed = 4242;
  const acak = (n) => {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    return seed % n;
  };
  let rusak = 0;
  let s = P.awalPenggaris();
  for (let i = 0; i < 20000; i += 1) {
    const r = acak(6);
    const aksi = r === 0 ? { t: "ALAT", jenis: acak(2) ? "meteran" : "penggaris" } : r === 1 ? { t: "BENDA", id: P.BENDA_UKUR[acak(8)].id } : r < 5 ? { t: "GESER", d: [1, -1, 10, -10][acak(4)] } : { t: "BACA" };
    s = P.langkahPenggaris(s, aksi);
    const c = P.cariBenda(s.benda).cm;
    if (P.muat(s) && (s.awal < 0 || s.awal + c > P.BATAS_ALAT[s.jenis])) rusak += 1;
    for (const p of s.pernah) {
      const [j, id] = p.split(":");
      if (P.alatTepatUkur(P.cariBenda(id).cm) !== j) rusak += 1;
    }
    if (new Set(s.pernah).size !== s.pernah.length) rusak += 1;
  }
  cek(rusak === 0, `fuzz penggaris: invarian terjaga (pelanggaran ${rusak})`);
  sama(P.langkahPenggaris(ukurPintu, { t: "RESET" }), P.awalPenggaris(), "reset penggaris");
  cek(P.ucapPenggaris(x).includes("angka 3") && P.ucapPenggaris(baca).includes("15"), "ucapan penggaris menyebut angka");
}

/* ------------------------------ Lab Meteran ------------------------------ */
const mm = (x, ...a) => a.reduce((s, ak) => MT.langkahMet(s, ak), x);
/** Atur panjang pita (cm) lewat tombol meter dan sentimeter. */
function setCm(x, pita, target) {
  let s = x;
  for (let i = 0; i < 400 && s[pita] !== target; i += 1) {
    const sel2 = target - s[pita];
    const m = Math.trunc(sel2 / 100);
    let aksi;
    if (Math.abs(m) >= 10) aksi = { t: "UBAH", pita, satuan: "m", d: m > 0 ? 10 : -10 };
    else if (Math.abs(m) >= 1) aksi = { t: "UBAH", pita, satuan: "m", d: m > 0 ? 1 : -1 };
    else aksi = { t: "UBAH", pita, satuan: "cm", d: Math.abs(sel2) >= 10 ? (sel2 > 0 ? 10 : -10) : sel2 > 0 ? 1 : -1 };
    s = MT.langkahMet(s, aksi);
  }
  return s;
}
const km = (x) => MT.keadaanMet(x);

{
  const x = MT.awalMet();
  cek(x.mode === "satu" && x.a === 0 && x.b === 0 && !x.tukarSP && !x.tukarPM && Object.values(x.tampil).every((v) => !v), "awal meteran: kosong, semua tampilan mati");
  sama(MT.teksMC(230), "2 m 30 cm", "teksMC 230");
  sama(MT.teksMC(400), "4 m", "teksMC 400");
  sama(MT.teksMC(30), "30 cm", "teksMC 30");
  sama(MT.teksMC(117), "1 m 17 cm", "teksMC 117");
  sama(MT.teksMC(1000), "10 m", "teksMC 1000");
  sama(MT.titikMet(7580), "7.580", "titik ribuan");
  // teksMC dibalik: jumlah meter dan sentimeter selalu sama dengan cm.
  let salahMC = 0;
  for (let cm = 0; cm <= 10000; cm += 1) {
    const m = MT.teksMC(cm).match(/^(?:(\d+) m)?(?: ?(\d+) cm)?$/);
    if (!m) {
      salahMC += 1;
      continue;
    }
    const total = (m[1] ? Number(m[1]) * 100 : 0) + (m[2] ? Number(m[2]) : 0);
    if (total !== cm) salahMC += 1;
  }
  cek(salahMC === 0, `teksMC dapat dibalik untuk 0..10.000 (selisih ${salahMC})`);

  // Seratus sentimeter tertukar satu meter (potongan 10 cm dan 1 cm menjadi lebih besar).
  let s = setCm(x, "a", 99);
  cek(s.a === 99 && MT.meterDari(99) === 0 && MT.sisaDari(99) === 99, "99 cm: belum 1 m");
  cek(!s.tukarPM, "belum ada pertukaran sebelum 100 cm");
  s = MT.langkahMet(s, { t: "UBAH", pita: "a", satuan: "cm", d: 1 });
  cek(s.a === 100 && MT.meterDari(s.a) === 1 && MT.sisaDari(s.a) === 0 && s.tukarPM && s.tukarSP && s.pesan.length > 3, "99 + 1 = 100 cm ditukar 1 meter (potongan kuning dan biru ikut tertukar)");
  cek(km(s).tukarPM, "keadaan memuat tukarPM");
  const s2 = MT.langkahMet(setCm(x, "a", 95), { t: "UBAH", pita: "a", satuan: "cm", d: 10 });
  cek(s2.a === 105 && s2.tukarPM && !s2.tukarSP, "95 + 10 = 105 cm: ditukar 1 meter lewat potongan 10 cm");
  const s3 = setCm(x, "a", 9);
  const s4 = MT.langkahMet(s3, { t: "UBAH", pita: "a", satuan: "cm", d: 1 });
  cek(s4.a === 10 && s4.tukarSP && !s4.tukarPM, "9 + 1 = 10 cm: sepuluh potongan kecil ditukar satu potongan 10 cm");
  const meterSaja = MT.langkahMet(setCm(x, "a", 0), { t: "UBAH", pita: "a", satuan: "m", d: 1 });
  cek(!meterSaja.tukarSP && !meterSaja.tukarPM, "menambah meter tidak memicu pertukaran");

  // Batas.
  const bawah = MT.langkahMet(x, { t: "UBAH", pita: "a", satuan: "cm", d: -1 });
  cek(bawah.a === 0 && bawah.pesan.length > 5, "tidak di bawah nol");
  const atas = MT.langkahMet(setCm(x, "a", 10000), { t: "UBAH", pita: "a", satuan: "m", d: 1 });
  cek(atas.a === 10000 && atas.pesan.length > 5, "tidak lebih dari 100 m");
  cek(setCm(x, "a", 7580).a === 7580, "pita 75 m 80 cm dapat dirakit");

  // Sambung dan potong.
  const dua = (a, b, op) => mm(setCm(setCm(mm(x, { t: "MODE", mode: "dua" }, { t: "OP", op }), "a", a), "b", b));
  const sb = dua(437, 743, "sambung");
  cek(MT.hasilMet(sb) === 1180 && MT.teksMC(1180) === "11 m 80 cm", "4 m 37 cm + 7 m 43 cm = 11 m 80 cm");
  sama(MT.langkahHitung(sb), ["Meter: 4 + 7 = 11 m", "Sentimeter: 37 + 43 = 80 cm", "Hasil: 11 m 80 cm"], "langkah sambung 437 + 743");
  const kr = dua(7580, 3845, "potong");
  cek(MT.hasilMet(kr) === 3735 && MT.teksMC(3735) === "37 m 35 cm", "75 m 80 cm − 38 m 45 cm = 37 m 35 cm");
  sama(MT.langkahHitung(kr), ["Meter: 75 − 38 = 37 m", "Sentimeter: 80 − 45 = 35 cm", "Hasil: 37 m 35 cm"], "langkah potong 7580 − 3845");
  const simp = dua(60, 70, "sambung");
  cek(MT.hasilMet(simp) === 130 && MT.adaSimpanMet(simp) && km(simp).simpan && MT.langkahHitung(simp).some((l) => l.includes("Tukar 100 cm")), "60 + 70 = 130 cm: ditukar 1 m");
  const pin = dua(520, 250, "potong");
  cek(MT.hasilMet(pin) === 270 && MT.adaPinjamMet(pin) && km(pin).pinjam && MT.langkahHitung(pin).some((l) => l.includes("Pinjam 1 m")), "5 m 20 cm − 2 m 50 cm = 2 m 70 cm: pinjam 1 m");
  cek(!MT.adaSimpanMet(sb) && !MT.adaPinjamMet(kr), "tanpa simpan dan tanpa pinjam bila sentimeter cukup");
  // Tidak mungkin: yang dipotong lebih panjang, dan sambungan melebihi 100 m.
  const tak = dua(100, 300, "potong");
  cek(MT.hasilMet(tak) === null && MT.langkahHitung(tak).length === 0 && km(tak).hasil === -1, "memotong pita yang lebih panjang tidak mungkin");
  const lebih = dua(9000, 2000, "sambung");
  cek(MT.hasilMet(lebih) === null && km(lebih).hasil === -1, "sambungan lebih dari 100 m tidak mungkin");
  cek(MT.hasilMet(x) === null, "satu pita tidak punya hasil gabungan");

  // Periksa semua pasangan: hasil sambung dan potong benar, dan langkah hitung konsisten dengan hasil.
  let salahLangkah = 0;
  let totalPasang = 0;
  for (let a = 0; a <= 10000; a += 373)
    for (let b = 0; b <= 10000; b += 211) {
      for (const op of ["sambung", "potong"]) {
        const st = { mode: "dua", op, a, b };
        const h = MT.hasilMet(st);
        const harus = op === "sambung" ? (a + b <= 10000 ? a + b : null) : a >= b ? a - b : null;
        if (h !== harus) salahLangkah += 1;
        if (h === null) continue;
        totalPasang += 1;
        const baris = MT.langkahHitung(st);
        if (baris[baris.length - 1] !== `Hasil: ${MT.teksMC(h)}`) salahLangkah += 1;
        // Simpan dan pinjam sama dengan hitungan sisa sentimeter.
        const sa = a % 100;
        const sbb = b % 100;
        if (MT.adaSimpanMet(st) !== (op === "sambung" && sa + sbb >= 100)) salahLangkah += 1;
        if (MT.adaPinjamMet(st) !== (op === "potong" && sa < sbb)) salahLangkah += 1;
        // Hasil dalam meter dan sentimeter sama dengan hitung langsung per satuan.
        const m = op === "sambung" ? Math.floor(a / 100) + Math.floor(b / 100) + (sa + sbb >= 100 ? 1 : 0) : Math.floor(a / 100) - Math.floor(b / 100) - (sa < sbb ? 1 : 0);
        const c = op === "sambung" ? (sa + sbb) % 100 : (sa - sbb + 100) % 100;
        if (m * 100 + c !== h) salahLangkah += 1;
      }
    }
  cek(salahLangkah === 0 && totalPasang > 500, `sambung dan potong: ${totalPasang} pasangan benar, langkah hitung konsisten (selisih ${salahLangkah})`);

  // Ubah satuan.
  cek(MT.teksUbah(300).includes("3 × 100 cm") && MT.teksUbah(300).includes("300 cm : 100 = 3 m"), "ubah satuan 3 m dan 300 cm");
  cek(MT.teksUbah(400).includes("400 cm : 100 = 4 m"), "ubah satuan 400 cm");
  cek(MT.teksUbah(117).includes("100 cm + 17 cm = 117 cm"), "ubah satuan 1 m 17 cm");
  cek(MT.teksUbah(50).includes("belum sampai 1 m"), "50 cm belum sampai 1 m");
  cek(MT.teksUbah(0) === "Belum ada pita.", "ubah satuan kosong");

  // Fuzz.
  let seed = 777;
  const acak = (n) => {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    return seed % n;
  };
  let rusak = 0;
  let f = MT.awalMet();
  for (let i = 0; i < 20000; i += 1) {
    const r = acak(9);
    const aksi =
      r < 5 ? { t: "UBAH", pita: acak(2) ? "a" : "b", satuan: acak(2) ? "m" : "cm", d: [1, -1, 10, -10][acak(4)] } : r === 5 ? { t: "MODE", mode: acak(2) ? "dua" : "satu" } : r === 6 ? { t: "OP", op: acak(2) ? "sambung" : "potong" } : r === 7 ? { t: "TOGGLE", rep: ["meterCm", "senti", "garis", "ubah", "langkah"][acak(5)] } : { t: "UBAH", pita: "a", satuan: "cm", d: 1 };
    f = MT.langkahMet(f, aksi);
    if (f.a < 0 || f.a > 10000 || f.b < 0 || f.b > 10000) rusak += 1;
    const h = MT.hasilMet(f);
    if (h !== null && (h < 0 || h > 10000)) rusak += 1;
    if (MT.meterDari(f.a) * 100 + MT.sisaDari(f.a) !== f.a) rusak += 1;
  }
  cek(rusak === 0, `fuzz meteran: invarian terjaga (pelanggaran ${rusak})`);
  sama(MT.langkahMet(kr, { t: "RESET" }), MT.awalMet(), "reset meteran");
  cek(MT.ucapMet(x).includes("Belum ada pita") && MT.ucapMet(sb).includes("11 m 80 cm"), "ucapan meteran");
}

/* ------------------------------ Lab Timbangan ------------------------------ */
const tt = (x, ...a) => a.reduce((s, ak) => TB.langkahTimbang(s, ak), x);
/** Timbang satu benda dengan benar: pilih timbangan, atur nol, letakkan, baca. */
const timbang = (x, jenis, id) => tt(x, { t: "JENIS", jenis }, { t: "BENDA", id }, { t: "NOL" }, { t: "TARUH" }, { t: "BACA" });
const kt = (x) => TB.keadaanTimbang(x);

{
  const x = TB.awalTimbang();
  cek(x.jenis === "digital" && x.benda === "telur" && !x.ditaruh && x.awalDigital === 50 && x.awalDuduk === 1000 && x.pernah.length === 0 && !x.pernahSalah, "awal timbangan: tidak di nol, bersih");
  cek(!kt(x).dinol && !kt(tt(x, { t: "JENIS", jenis: "duduk" })).dinol, "awal kedua timbangan tidak di nol");
  sama(TB.BENDA_TIMBANG.map((b) => b.g), [100, 250, 500, 1000, 1250, 2000, 3000, 5000], "berat benda");
  sama(TB.teksBacaan("digital", 1250), "1.250 g", "teks digital");
  sama(TB.teksBacaan("duduk", 3000), "3 kg", "teks duduk bulat");
  sama(TB.teksBacaan("duduk", 1250), "antara 1 dan 2 kg", "teks duduk di antara");
  cek(TB.timbanganTepat(250) === "digital" && TB.timbanganTepat(3000) === "duduk" && TB.timbanganTepat(1250) === "digital" && TB.timbanganTepat(1000) === "digital" && TB.timbanganTepat(2000) === "duduk", "timbangan yang tepat menurut berat");

  // Menimbang tanpa nol: keliru.
  const sal = tt(x, { t: "TARUH" }, { t: "BACA" });
  cek(sal.pernahSalah && sal.pernah.length === 0 && sal.pesan.includes("300 g") && sal.pesan.includes("bukan berat"), "telur dari 50 g: layar 300 g, bukan berat telur");
  cek(TB.bacaanTimbang(tt(x, { t: "TARUH" })) === 300, "bacaan awal 50 + telur 250 = 300");
  // Baca tanpa meletakkan.
  const kosong = TB.langkahTimbang(x, { t: "BACA" });
  cek(kosong.pernah.length === 0 && !kosong.pernahSalah && kosong.pesan.includes("Letakkan"), "baca tanpa benda ditolak");
  // Atur nol lalu timbang benar.
  const telur = timbang(x, "digital", "telur");
  cek(telur.pernah.includes("digital:telur") && telur.hasil === "Telur 250 g" && telur.awalDigital === 0 && kt(telur).dinol, "telur 250 g di digital dari nol");
  // Nol pada satu timbangan tidak mengubah timbangan lain.
  cek(telur.awalDuduk === 1000, "nol digital tidak mengubah jarum timbangan duduk");
  const semangka = timbang(x, "duduk", "semangka");
  cek(semangka.pernah.includes("duduk:semangka") && semangka.hasil === "Semangka 3 kg", "semangka 3 kg di timbangan duduk dari nol");
  cek(TB.bacaanTimbang(tt(x, { t: "JENIS", jenis: "duduk" }, { t: "BENDA", id: "semangka" }, { t: "TARUH" })) === 4000, "jarum duduk dari 1 kg + semangka 3 kg menunjuk 4 kg (keliru)");
  // Jarum di antara dua angka.
  const antara = timbang(x, "duduk", "tepung");
  cek(antara.pernahDiantara && antara.pernah.length === 0 && antara.pesan.includes("antara 1 dan 2 kg"), "tepung 1.250 g di timbangan duduk: jarum di antara dua angka");
  // Melebihi batas.
  const lebih = tt(x, { t: "JENIS", jenis: "duduk" }, { t: "BENDA", id: "beras" }, { t: "TARUH" }, { t: "BACA" });
  cek(lebih.pernah.length === 0 && !lebih.pernahSalah && lebih.pesan.includes("melebihi"), "beras 5.000 g dari 1 kg melebihi batas timbangan");
  const beras = timbang(x, "duduk", "beras");
  cek(beras.pernah.includes("duduk:beras") && beras.hasil === "Beras 5 kg", "beras 5 kg di timbangan duduk dari nol");
  // Mengganti benda atau timbangan mengangkat benda.
  cek(!tt(x, { t: "TARUH" }, { t: "BENDA", id: "gula" }).ditaruh, "ganti benda mengangkat benda");
  cek(!tt(x, { t: "TARUH" }, { t: "JENIS", jenis: "duduk" }).ditaruh, "ganti timbangan mengangkat benda");
  cek(tt(x, { t: "NOL" }).pesan.includes("diatur ke angka 0") && tt(tt(x, { t: "NOL" }), { t: "NOL" }).pesan.includes("sudah tepat"), "pesan atur nol");

  // Semua pasangan timbangan dan benda yang dapat dibaca dari nol memberi berat yang benar.
  let salahSemua = 0;
  for (const b of TB.BENDA_TIMBANG)
    for (const jenis of ["digital", "duduk"]) {
      const s = timbang(TB.awalTimbang(), jenis, b.id);
      const bisa = jenis === "digital" || b.g % 1000 === 0;
      if (bisa !== (s.pernah.length === 1)) salahSemua += 1;
      if (bisa && !s.hasil.endsWith(TB.teksBacaan(jenis, b.g))) salahSemua += 1;
      if (!bisa && !s.pernahDiantara) salahSemua += 1;
      // Dari awal bukan nol selalu keliru, kecuali melebihi batas.
      const t = tt(TB.awalTimbang(), { t: "JENIS", jenis }, { t: "BENDA", id: b.id }, { t: "TARUH" }, { t: "BACA" });
      if (t.pernah.length !== 0) salahSemua += 1;
    }
  cek(salahSemua === 0, `semua benda dan timbangan: nol menentukan hasil (selisih ${salahSemua})`);

  // Fuzz.
  let seed = 99;
  const acak = (n) => {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    return seed % n;
  };
  let rusak = 0;
  let f = TB.awalTimbang();
  for (let i = 0; i < 20000; i += 1) {
    const r = acak(8);
    const aksi = r === 0 ? { t: "JENIS", jenis: acak(2) ? "duduk" : "digital" } : r === 1 ? { t: "BENDA", id: TB.BENDA_TIMBANG[acak(8)].id } : r === 2 ? { t: "NOL" } : r < 5 ? { t: "TARUH" } : { t: "BACA" };
    f = TB.langkahTimbang(f, aksi);
    if (TB.bacaanTimbang(f) < 0) rusak += 1;
    for (const p of f.pernah) {
      const [j, id] = p.split(":");
      const g = TB.cariBendaTimbang(id).g;
      if (j === "duduk" && g % 1000 !== 0) rusak += 1;
    }
    if (new Set(f.pernah).size !== f.pernah.length) rusak += 1;
  }
  cek(rusak === 0, `fuzz timbangan: invarian terjaga (pelanggaran ${rusak})`);
  sama(TB.langkahTimbang(semangka, { t: "RESET" }), TB.awalTimbang(), "reset timbangan");
  cek(TB.ucapTimbang(x).includes("belum di angka nol") && TB.ucapTimbang(telur).includes("250"), "ucapan timbangan");
}

/* ------------------------------ Lab Timbangan Kodok ------------------------------ */
const kk = (x, ...a) => a.reduce((s, ak) => KD.langkahKodok(s, ak), x);
/** Susun bandul persis seperti `jumlah` dari keadaan kosong. */
function susun(x, jumlah) {
  let s = kk(x, { t: "KOSONG" });
  for (let i = 0; i < jumlah.length; i += 1) for (let n = 0; n < jumlah[i]; n += 1) s = KD.langkahKodok(s, { t: "BANDUL", i, d: 1 });
  return s;
}
/** Atur berat yang diubah (gram) lewat tombol kg dan g. */
function setTotal(x, total) {
  let s = x;
  const kgT = Math.floor(total / 1000);
  for (let i = 0; i < 100 && Math.floor(s.total / 1000) !== kgT; i += 1) {
    const sel2 = kgT - Math.floor(s.total / 1000);
    s = KD.langkahKodok(s, { t: "UBAH", satuan: "kg", d: Math.abs(sel2) >= 10 ? (sel2 > 0 ? 10 : -10) : sel2 > 0 ? 1 : -1 });
  }
  for (let i = 0; i < 400 && s.total % 1000 !== total % 1000; i += 1) {
    const sel2 = (total % 1000) - (s.total % 1000);
    s = KD.langkahKodok(s, { t: "UBAH", satuan: "g", d: Math.abs(sel2) >= 10 ? (sel2 > 0 ? 10 : -10) : sel2 > 0 ? 1 : -1 });
  }
  return s;
}

{
  const x = KD.awalKodok();
  cek(x.benda === "tepung" && x.jumlah.every((n) => n === 0) && x.total === 0 && x.pernah.length === 0 && Object.values(x.tampil).every((v) => !v), "awal kodok: tepung 750 g, tanpa bandul, semua tampilan mati");
  cek(!KD.keadaanKodok(x).seimbang && KD.arahKodok(x) === "benda-berat", "awal kodok tidak seimbang");
  sama(KD.BANDUL.map((b) => b.g), [50, 100, 200, 500, 1000], "berat bandul");
  sama(KD.BENDA_KODOK.map((b) => b.g), [450, 750, 1250, 1750, 2000], "berat benda");
  cek(KD.BENDA_KODOK.every((b) => b.g % 50 === 0), "semua benda kelipatan 50 g, bisa diseimbangkan");

  // Seimbang bila dan hanya bila jumlah bandul tepat sama dengan berat benda.
  const a = susun(x, [1, 0, 1, 1, 0]);
  cek(KD.jumlahBandulG(a.jumlah) === 750 && KD.seimbangKodok(a) && KD.arahKodok(a) === "seimbang", "½ ons + 2 ons + ½ kg = 750 g seimbang");
  sama(KD.teksSusunan(a.jumlah), "½ kg + 2 ons + ½ ons", "teks susunan");
  const kurang = susun(x, [0, 1, 0, 1, 0]);
  cek(KD.jumlahBandulG(kurang.jumlah) === 600 && KD.arahKodok(kurang) === "benda-berat", "600 g: benda masih lebih berat");
  const lebihK = susun(x, [0, 0, 0, 0, 1]);
  cek(KD.arahKodok(lebihK) === "bandul-berat" && !KD.seimbangKodok(lebihK), "1.000 g bandul lebih berat dari tepung 750 g");

  // Banyak susunan seimbang untuk satu benda, dicatat tanpa pengulangan.
  const b = susun(a, [1, 7, 0, 0, 0]);
  cek(KD.seimbangKodok(b), "½ ons + 7 ons = 750 g seimbang");
  const c = susun(b, [3, 1, 0, 1, 0]);
  cek(KD.seimbangKodok(c), "3 × ½ ons + 1 ons + ½ kg = 750 g seimbang");
  cek(c.pernah.length === 3 && KD.susunanBenda(c.pernah, "tepung") === 3, "tiga susunan seimbang berbeda tercatat");
  const ulang = susun(c, [1, 0, 1, 1, 0]);
  cek(ulang.pernah.length === 3, "susunan yang sama tidak dicatat dua kali");
  cek(KD.susunanTerbanyak === undefined, "susunanTerbanyak tidak diekspor dari logika lab (ada di misi)");
  // Benda lain: catatan terpisah.
  const jeruk = susun(kk(c, { t: "BENDA", id: "jeruk" }), [0, 1, 2, 1, 1]);
  cek(KD.seimbangKodok(jeruk) && KD.banyakBandul(jeruk.jumlah) === 5 && KD.susunanBenda(jeruk.pernah, "jeruk") === 1 && KD.susunanBenda(jeruk.pernah, "tepung") === 3, "jeruk 2.000 g dengan lima bandul, catatan per benda");
  cek(K3.susunanTerbanyak(jeruk.pernah) === 3, "susunan terbanyak adalah tiga (tepung)");
  cek(kk(c, { t: "BENDA", id: "gula" }).jumlah.every((n) => n === 0), "ganti benda mengosongkan bandul");

  // Batas bandul.
  const nol = KD.langkahKodok(x, { t: "BANDUL", i: 0, d: -1 });
  cek(nol.jumlah[0] === 0 && nol.pesan.length > 5, "bandul tidak di bawah nol");
  let penuh = x;
  for (let n = 0; n < 12; n += 1) penuh = KD.langkahKodok(penuh, { t: "BANDUL", i: 4, d: 1 });
  cek(penuh.jumlah[4] === 10 && penuh.pesan.length > 5, "paling banyak 10 bandul tiap jenis");

  // Hitung susunan terhadap pencacahan mandiri.
  const mandiri = (g) => {
    let cara = 0;
    for (let a0 = 0; a0 <= 10; a0 += 1)
      for (let b0 = 0; b0 <= 10; b0 += 1)
        for (let c0 = 0; c0 <= 10; c0 += 1)
          for (let d0 = 0; d0 <= 10; d0 += 1)
            for (let e0 = 0; e0 <= 10; e0 += 1) if (50 * a0 + 100 * b0 + 200 * c0 + 500 * d0 + 1000 * e0 === g) cara += 1;
    return cara;
  };
  for (const bd of KD.BENDA_KODOK) {
    cek(KD.hitungSusunan(bd.g) === mandiri(bd.g), `hitungSusunan(${bd.g}) sama dengan pencacahan mandiri`);
    cek(KD.hitungSusunan(bd.g) >= 3, `${bd.id}: paling sedikit tiga susunan seimbang`);
  }

  // Satuan: kilogram dan gram, dan ons, dapat dibalik untuk semua berat 0..20.000.
  let salahSatuan = 0;
  for (let g = 0; g <= 20000; g += 1) {
    const m = KD.teksKgG(g).match(/^(?:(\d+) kg)?(?: ?(\d+) g)?$/);
    if (!m || (m[1] ? Number(m[1]) * 1000 : 0) + (m[2] ? Number(m[2]) : 0) !== g) salahSatuan += 1;
    const o = KD.teksOns(g);
    const mo = o.match(/^(\d+) ons(?: (\d+) g)?$/);
    if (g >= 100 && (!mo || Number(mo[1]) * 100 + (mo[2] ? Number(mo[2]) : 0) !== g)) salahSatuan += 1;
    if (g < 100 && !o.includes("belum sampai 1 ons")) salahSatuan += 1;
  }
  cek(salahSatuan === 0, `teksKgG dan teksOns dapat dibalik untuk 0..20.000 (selisih ${salahSatuan})`);
  sama(KD.teksKgG(1753), "1 kg 753 g", "1.753 g");
  sama(KD.teksKgG(4150), "4 kg 150 g", "4.150 g");
  sama(KD.teksKgG(8000), "8 kg", "8.000 g");
  sama(KD.teksKgG(3000), "3 kg", "3.000 g");
  sama(KD.teksKgG(1200), "1 kg 200 g", "1.200 g");
  sama(KD.teksOns(1000), "10 ons", "1.000 g = 10 ons");
  sama(KD.teksOns(300), "3 ons", "300 g = 3 ons");
  sama(KD.titikKodok(1753), "1.753", "titik ribuan");
  cek(KD.teksUbahBerat(3000).includes("3 × 1.000 g = 3.000 g") && KD.teksUbahBerat(3000).includes("3.000 g : 1.000 = 3 kg"), "ubah berat 3 kg dan 3.000 g");
  cek(KD.teksUbahBerat(1753).includes("1.000 g + 753 g = 1 kg 753 g"), "ubah berat 1.753 g");
  cek(KD.teksUbahBerat(500).includes("belum sampai 1 kg"), "500 g belum sampai 1 kg");

  // Ubah berat lewat tombol.
  const u = setTotal(x, 1753);
  cek(u.total === 1753, "dapat mengatur 1.753 g lewat tombol");
  cek(setTotal(x, 4150).total === 4150 && setTotal(x, 8000).total === 8000 && setTotal(x, 1000).total === 1000, "dapat mengatur 4.150, 8.000, dan 1.000 g");
  const bw = KD.langkahKodok(x, { t: "UBAH", satuan: "g", d: -1 });
  cek(bw.total === 0 && bw.pesan.length > 5, "berat tidak di bawah nol");
  const at = KD.langkahKodok(setTotal(x, 20000), { t: "UBAH", satuan: "kg", d: 1 });
  cek(at.total === 20000 && at.pesan.length > 5, "berat paling besar 20.000 g");

  // Fuzz.
  let seed = 31337;
  const acak = (n) => {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    return seed % n;
  };
  let rusak = 0;
  let f = KD.awalKodok();
  for (let i = 0; i < 20000; i += 1) {
    const r = acak(7);
    const aksi = r < 3 ? { t: "BANDUL", i: acak(5), d: acak(2) ? 1 : -1 } : r === 3 ? { t: "BENDA", id: KD.BENDA_KODOK[acak(5)].id } : r === 4 ? { t: "UBAH", satuan: acak(2) ? "kg" : "g", d: [1, -1, 10, -10][acak(4)] } : r === 5 ? { t: "TOGGLE", rep: ["gram", "ons", "kgg"][acak(3)] } : { t: "KOSONG" };
    f = KD.langkahKodok(f, aksi);
    if (f.jumlah.some((n) => n < 0 || n > 10) || f.total < 0 || f.total > 20000) rusak += 1;
    if (KD.seimbangKodok(f) !== (KD.jumlahBandulG(f.jumlah) === KD.cariBendaKodok(f.benda).g)) rusak += 1;
    if (KD.keadaanKodok(f).seimbang !== KD.seimbangKodok(f)) rusak += 1;
    for (const p of f.pernah) {
      const [benda, daftar] = p.split("|");
      if (KD.jumlahBandulG(daftar.split(",").map(Number)) !== KD.cariBendaKodok(benda).g) rusak += 1;
    }
    if (new Set(f.pernah).size !== f.pernah.length) rusak += 1;
  }
  cek(rusak === 0, `fuzz kodok: invarian terjaga (pelanggaran ${rusak})`);
  sama(KD.langkahKodok(c, { t: "RESET" }), KD.awalKodok(), "reset kodok");
  cek(KD.ucapKodok(a).includes("Seimbang") && KD.ucapUbah(u).includes("1 kilogram 753 gram"), "ucapan kodok dan ubah");
}

/* ------------------------------ Mesin Bertahap ------------------------------ */
// Hitung kalimat sederhana "a op b = c" (titik ribuan dibuang). null bila bukan bentuk itu.
const bersih = (t) => t.replace(/(\d)\.(?=\d{3}(?!\d))/g, "$1");
const parseEq = (t) => {
  const m = bersih(t).match(/^(\d+) ([+−×:]) (\d+) = (\d+)$/);
  if (!m) return null;
  const a = Number(m[1]);
  const b = Number(m[3]);
  const op = m[2];
  const nilai = op === "+" ? a + b : op === "−" ? a - b : op === "×" ? a * b : a % b === 0 ? a / b : NaN;
  return { nilai, z: Number(m[4]) };
};
const benarEq = (t) => {
  const e = parseEq(t);
  return e !== null && e.nilai === e.z;
};
const hitungEks = (t) => {
  const m = bersih(t).match(/^(\d+) ([+−×:]) (\d+)(?: ([+−]) (\d+))?$/);
  if (!m) return NaN;
  const f = (a, op, b) => (op === "+" ? a + b : op === "−" ? a - b : op === "×" ? a * b : a / b);
  let nilai = f(Number(m[1]), m[2], Number(m[3]));
  if (m[4]) nilai = f(nilai, m[4], Number(m[5]));
  return nilai;
};

cek(MD.SEMUA_MESIN_K3B3.length === 4, "ada empat definisi mesin");
{
  const posisi = [];
  for (const def of MD.SEMUA_MESIN_K3B3) {
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

    // Permainan penuh dan aturan mesin.
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
  sama(MD.SEMUA_MESIN_K3B3.map((d) => d.selesaiId), Object.values(K3.ID_MESIN_K3B3), "selesaiId mesin sama dengan id misi");

  // Kunci diperiksa mandiri, dari kasus sumber.
  MD.KASUS_UKUR.forEach((k, idx) => {
    const [alat, nol, baca, tulis] = MD.MESIN_UKUR.kasus[idx].langkah;
    cek(alat.benar === (k.cm <= 30 ? "Penggaris" : "Meteran") && alat.opsi.includes("Timbangan"), `${k.id}: alat ukur tepat menurut batas 30 cm, timbangan sebagai pengecoh`);
    cek(nol.benar === "0" && !nol.opsi.slice().filter((o) => o !== "0").includes("0"), `${k.id}: ujung kiri di angka 0`);
    cek(baca.benar === `${k.cm} cm` && baca.opsi.includes(`${k.cm + 1} cm`) && baca.opsi.includes(`${k.cm - 1} cm`), `${k.id}: baca ${k.cm} cm dengan pengecoh satu lebih dan satu kurang`);
    cek(tulis.benar === `${k.cm} cm` && tulis.opsi.every((o) => o.startsWith(`${k.cm} `)), `${k.id}: tulis dengan satuan cm`);
    cek(MD.alatUkurTepat(k.cm) === alat.benar, `${k.id}: alatUkurTepat sama dengan kunci`);
    cek(MD.MESIN_UKUR.kasus[idx].ringkas.includes(`${k.cm} cm`), `${k.id}: ringkasan memuat panjang`);
  });
  cek(MD.KASUS_UKUR.some((k) => k.cm <= 30) && MD.KASUS_UKUR.some((k) => k.cm > 30), "mesin ukur memuat benda pendek dan benda panjang");
  cek(MD.KASUS_UKUR.some((k) => k.cm === 30), "mesin ukur memuat batas 30 cm");

  MD.KASUS_UBAH_PANJANG.forEach((k, idx) => {
    const [hub, cara, hitung, periksa] = MD.MESIN_UBAH_PANJANG.kasus[idx].langkah;
    cek(hub.benar === "100 cm" && hub.opsi.includes("1.000 cm") && hub.opsi.includes("10 cm"), `${k.id}: 1 m = 100 cm dengan pengecoh 10 dan 1.000`);
    const harus = k.tipe === "m-cm" ? k.m * 100 : k.tipe === "cm-m" ? k.cm / 100 : k.m * 100 + k.s;
    cek(hitungEks(cara.benar) === (k.tipe === "m-cm" ? k.m * 100 : k.tipe === "cm-m" ? k.cm / 100 : k.m * 100 + k.s), `${k.id}: cara "${cara.benar}" bernilai ${harus}`);
    for (const o of cara.opsi.filter((x) => x !== cara.benar)) cek(hitungEks(o) !== harus, `${k.id}: pengecoh cara "${o}" tidak bernilai ${harus}`);
    cek(hitung.benar === MT.titikMet(harus) || hitung.benar === String(harus), `${k.id}: hitung bernilai ${harus} (${hitung.benar})`);
    cek(benarEq(periksa.benar), `${k.id}: kalimat periksa benar "${periksa.benar}"`);
    for (const o of periksa.opsi.filter((x) => x !== periksa.benar)) cek(!benarEq(o), `${k.id}: pengecoh periksa salah "${o}"`);
    cek(k.tipe !== "m-cm" || cara.benar.includes("×"), `${k.id}: meter ke sentimeter dikali`);
    cek(k.tipe !== "cm-m" || cara.benar.includes(":"), `${k.id}: sentimeter ke meter dibagi`);
  });
  cek(MD.KASUS_UBAH_PANJANG.map((k) => k.tipe).sort().join() === "cm-m,m-cm,mcm-cm", "mesin ubah panjang memuat tiga tipe");

  MD.KASUS_TIMBANG.forEach((k, idx) => {
    const [nol, tepat, baca, satuan] = MD.MESIN_TIMBANG.kasus[idx].langkah;
    const duduk = k.g >= 2000 && k.g % 1000 === 0;
    cek(nol.benar === "0" && nol.opsi.includes(duduk ? "1" : "50"), `${k.id}: mulai dari nol, pengecoh angka awal`);
    cek(tepat.benar === (duduk ? "Timbangan duduk" : "Timbangan digital") && tepat.opsi.includes("Penggaris"), `${k.id}: timbangan tepat, penggaris sebagai pengecoh`);
    cek(MD.timbanganTepatMesin(k.g) === tepat.benar, `${k.id}: timbanganTepatMesin sama dengan kunci`);
    cek(baca.benar === (duduk ? `${k.g / 1000} kg` : `${MD.titikMesin(k.g)} g`) && satuan.benar === baca.benar, `${k.id}: bacaan dan satuan`);
    for (const o of satuan.opsi.filter((x) => x !== satuan.benar)) cek(/cm|m$/.test(o), `${k.id}: pengecoh satuan memakai satuan panjang "${o}"`);
  });
  cek(MD.KASUS_TIMBANG.some((k) => k.g % 1000 === 0 && k.g >= 2000) && MD.KASUS_TIMBANG.some((k) => k.g < 1000) && MD.KASUS_TIMBANG.some((k) => k.g > 1000 && k.g % 1000 !== 0), "mesin timbang: bulat kilogram, ringan, dan tidak bulat");

  MD.KASUS_UBAH_BERAT.forEach((k, idx) => {
    const [hub, cara, hitung, periksa] = MD.MESIN_UBAH_BERAT.kasus[idx].langkah;
    cek(["1.000 g", "10 ons", "100 g"].includes(hub.benar), `${k.id}: hubungan benar (${hub.benar})`);
    if (hub.benar === "1.000 g") cek(hub.opsi.includes("100 g") && hub.opsi.includes("10 g"), `${k.id}: pengecoh 100 dan 10`);
    const harus = k.tipe === "kg-g" ? k.kg * 1000 : k.tipe === "kgg-g" ? k.kg * 1000 + k.s : null;
    if (harus !== null) {
      cek(hitungEks(cara.benar) === harus, `${k.id}: cara "${cara.benar}" bernilai ${harus}`);
      for (const o of cara.opsi.filter((x) => x !== cara.benar)) cek(hitungEks(o) !== harus, `${k.id}: pengecoh cara "${o}" tidak bernilai ${harus}`);
      cek(hitung.benar === MD.titikMesin(harus), `${k.id}: hitung ${hitung.benar}`);
    } else {
      cek(hitungEks(cara.benar) === k.g - 1000, `${k.id}: cara "${cara.benar}" mengambil seribu pertama`);
      const kg = Math.floor(k.g / 1000);
      cek(hitung.benar === `${kg} kg ${k.g % 1000} g`, `${k.id}: hitung ${hitung.benar}`);
    }
    cek(benarEq(periksa.benar), `${k.id}: kalimat periksa benar "${periksa.benar}"`);
    for (const o of periksa.opsi.filter((x) => x !== periksa.benar)) cek(!benarEq(o), `${k.id}: pengecoh periksa salah "${o}"`);
  });
  cek(MD.KASUS_UBAH_BERAT.map((k) => k.tipe).sort().join() === "g-kgg,kg-g,kgg-g", "mesin ubah berat memuat tiga tipe");
  cek(MD.KASUS_UBAH_BERAT.some((k) => k.tipe === "g-kgg" && k.g === 1753) && MD.KASUS_UBAH_BERAT.some((k) => k.tipe === "kgg-g" && k.kg === 4 && k.s === 150), "mesin ubah berat memuat 1.753 g dan 4 kg 150 g");
}

/* ------------------------------ Misi ------------------------------ */
const keadaanAwal = [
  P.keadaanPenggaris(P.awalPenggaris()),
  MT.keadaanMet(MT.awalMet()),
  TB.keadaanTimbang(TB.awalTimbang()),
  TB.keadaanTimbang(TB.langkahTimbang(TB.awalTimbang(), { t: "JENIS", jenis: "duduk" })),
  KD.keadaanKodok(KD.awalKodok()),
  KD.keadaanUbah(KD.awalKodok()),
];

const SEMUA_ID = [...Object.values(K3.ID_MESIN_K3B3), ...Object.values(K3.ID_SKENARIO_K3B3), "x"];
for (const h of ["A", "B", "C", "D"]) {
  const daftar = K3.daftarMisiK3Bab3(h);
  const wajib = daftar.filter((m) => m.wajib);
  cek(wajib.length >= 3, `sub-bab ${h}: minimal 3 misi wajib (${wajib.length})`);
  cek(daftar.some((m) => !m.wajib), `sub-bab ${h}: ada tantangan bebas`);
  const idMisi = new Set();
  for (const m of daftar) {
    cek(!idMisi.has(m.id), `misi ${m.id}: id unik`);
    idMisi.add(m.id);
    cek(m.id.startsWith(`${h.toLowerCase()}-`), `misi ${m.id}: berawalan huruf sub-bab`);
    cek(m.teks.length >= 10 && m.teks.length <= 150, `misi ${m.id}: panjang teks ${m.teks.length}`);
    for (const ke of keadaanAwal) cek(!m.cek(ke), `misi ${m.id}: keadaan awal ${ke.alat} tidak memenuhinya`);
  }
  const tampil = M0.tampilMisi(daftar);
  cek(!M0.wajibSelesai(tampil, new Set()), `sub-bab ${h}: gerbang tertutup di awal`);
  for (const m of daftar.filter((x) => x.id.endsWith("mesin") || x.id.endsWith("skenario"))) {
    const idBenar = m.id.endsWith("mesin") ? K3.ID_MESIN_K3B3[h] : K3.ID_SKENARIO_K3B3[h];
    cek(m.cek(sel(idBenar)), `misi ${m.id}: tercapai oleh ${idBenar}`);
    for (const lain of SEMUA_ID.filter((v) => v !== idBenar)) cek(!m.cek(sel(lain)), `misi ${m.id}: tidak boleh tercapai oleh ${lain}`);
  }
  for (const m of daftar.filter((x) => !x.id.endsWith("mesin") && !x.id.endsWith("skenario"))) {
    for (const id of SEMUA_ID) cek(!m.cek(sel(id)), `misi ${m.id}: tidak tercapai oleh selesai ${id}`);
  }
  sama(MD.SEMUA_MESIN_K3B3["ABCD".indexOf(h)].selesaiId, K3.ID_MESIN_K3B3[h], `selesaiId mesin ${h}`);
  cek(TK.MISI_K3B3[h].length > 60 && TK.NAMA_SIM_K3B3[h].length > 10 && TK.misiAwalK3Bab3(h).startsWith("Simulasi 1. Misi:"), `teks misi ${h}`);
}
cek(TK.hurufK3B3("C") === "C" && TK.hurufK3B3("D") === "D" && TK.hurufK3B3("B") === "B" && TK.hurufK3B3("Z") === "A", "hurufK3B3 jatuh ke A bila tak dikenal");
cek([SK.SKENARIO_K3B3A, SK.SKENARIO_K3B3B, SK.SKENARIO_K3B3C, SK.SKENARIO_K3B3D].every((s) => s.adegan.length >= 5 && s.adegan.length <= 8), "empat skenario ada dan cukup adegan");

const misiDi = (h, id) => K3.daftarMisiK3Bab3(h).find((m) => m.id === id);
const penuh = (h, id, ke) => cek(misiDi(h, id).cek(ke), `misi ${id} tercapai`);
const belum = (h, id, ke, ket) => cek(!misiDi(h, id).cek(ke), `misi ${id} belum tercapai: ${ket}`);
const kp = P.keadaanPenggaris;

/* ---- Bukti tiap misi bisa dicapai dari alat sebenarnya, lewat tombol ---- */

// Sub-Bab A
{
  const a0 = P.awalPenggaris();
  const pensil = ukur(a0, "penggaris", "pensil");
  penuh("A", "a-nol", kp(pensil));
  belum("A", "a-nol", kp(geserPeng(a0, 0)), "belum Baca panjang");
  belum("A", "a-nol", kp(P.langkahPenggaris(a0, { t: "BACA" })), "Baca saat belum di nol");
  belum("A", "a-nol", kp(ukur(a0, "meteran", "pensil")), "pensil dengan meteran bukan alat yang tepat");
  penuh("A", "a-salah", kp(P.langkahPenggaris(a0, { t: "BACA" })));
  belum("A", "a-salah", kp(pensil), "dari nol tidak salah");
  const pintu = ukur(a0, "meteran", "pintu");
  penuh("A", "a-meteran", kp(pintu));
  belum("A", "a-meteran", kp(pensil), "pensil bukan benda panjang");
  belum("A", "a-meteran", kp(P.langkahPenggaris(pp(a0, { t: "ALAT", jenis: "meteran" }, { t: "BENDA", id: "pintu" }), { t: "BACA" })), "belum digeser ke nol");
  let tiga = pensil;
  tiga = ukur(tiga, "penggaris", "krayon");
  belum("A", "a-tiga", kp(tiga), "baru dua benda");
  tiga = ukur(tiga, "penggaris", "penghapus");
  penuh("A", "a-tiga", kp(tiga));
  belum("A", "a-tiga", kp(ukur(ukur(pensil, "penggaris", "pensil"), "penggaris", "pensil")), "benda sama tidak dihitung dua kali");
  const buku = ukur(a0, "penggaris", "buku");
  penuh("A", "a-30", kp(buku));
  belum("A", "a-30", kp(pensil), "bukan buku tulis");
  penuh("A", "a-terlalu", kp(P.langkahPenggaris(a0, { t: "BENDA", id: "pintu" })));
  belum("A", "a-terlalu", kp(pensil), "tidak mencoba benda panjang di penggaris");
  let lima = tiga;
  lima = ukur(lima, "penggaris", "buku");
  belum("A", "a-lima", kp(lima), "baru empat benda");
  lima = ukur(lima, "meteran", "meja");
  penuh("A", "a-lima", kp(lima));
  // Misi alat Sub-Bab A tidak tercapai oleh alat lain.
  for (const ke of keadaanAwal.slice(1)) for (const m of K3.MISI_A) belum("A", m.id, ke, `alat ${ke.alat} bukan penggaris`);
}

// Sub-Bab B
{
  const b0 = MT.awalMet();
  const k117 = mm(setCm(b0, "a", 117), { t: "TOGGLE", rep: "meterCm" }, { t: "TOGGLE", rep: "senti" });
  penuh("B", "b-117", km(k117));
  belum("B", "b-117", km(setCm(b0, "a", 117)), "tampilan belum menyala");
  belum("B", "b-117", km(mm(setCm(b0, "a", 118), { t: "TOGGLE", rep: "meterCm" }, { t: "TOGGLE", rep: "senti" })), "118 bukan 117");
  const k400 = mm(setCm(b0, "a", 400), { t: "TOGGLE", rep: "ubah" });
  penuh("B", "b-bagi", km(k400));
  belum("B", "b-bagi", km(setCm(b0, "a", 400)), "Ubah satuan belum menyala");
  const tuk = MT.langkahMet(setCm(b0, "a", 99), { t: "UBAH", pita: "a", satuan: "cm", d: 1 });
  penuh("B", "b-tukar", km(tuk));
  belum("B", "b-tukar", km(setCm(b0, "a", 99)), "belum menambah sampai 100");
  belum("B", "b-tukar", km(setCm(b0, "a", 9)), "baru 10 cm");
  belum("B", "b-tukar", km(MT.langkahMet(setCm(b0, "a", 90), { t: "UBAH", pita: "a", satuan: "m", d: 1 })), "menambah meter tidak menukar");
  const duaPita = (a, b, op) => mm(setCm(setCm(mm(b0, { t: "MODE", mode: "dua" }, { t: "OP", op }), "a", a), "b", b), { t: "TOGGLE", rep: "langkah" });
  penuh("B", "b-sambung", km(duaPita(437, 743, "sambung")));
  belum("B", "b-sambung", km(duaPita(437, 744, "sambung")), "743 salah satu");
  belum("B", "b-sambung", km(mm(setCm(setCm(mm(b0, { t: "MODE", mode: "dua" }), "a", 437), "b", 743))), "Langkah hitung belum menyala");
  belum("B", "b-sambung", km(duaPita(437, 743, "potong")), "potong bukan sambung");
  penuh("B", "b-kurang", km(duaPita(7580, 3845, "potong")));
  belum("B", "b-kurang", km(duaPita(7580, 3845, "sambung")), "sambung bukan potong");
  belum("B", "b-kurang", km(duaPita(7580, 3846, "potong")), "3.846 salah satu");
  penuh("B", "b-simpan", km(duaPita(60, 70, "sambung")));
  belum("B", "b-simpan", km(duaPita(437, 743, "sambung")), "tidak ada simpan");
  penuh("B", "b-pinjam", km(duaPita(520, 250, "potong")));
  belum("B", "b-pinjam", km(duaPita(7580, 3845, "potong")), "tidak ada pinjam");
  penuh("B", "b-seribu", km(mm(setCm(b0, "a", 1000), { t: "TOGGLE", rep: "senti" })));
  belum("B", "b-seribu", km(setCm(b0, "a", 1000)), "Sentimeter belum menyala");
  for (const ke of keadaanAwal.filter((k) => k.alat !== "meteran")) for (const m of K3.MISI_B) belum("B", m.id, ke, `alat ${ke.alat} bukan meteran`);
}

// Sub-Bab C
{
  const c0 = TB.awalTimbang();
  const kt2 = TB.keadaanTimbang;
  penuh("C", "c-nol", kt2(tt(c0, { t: "NOL" })));
  belum("C", "c-nol", kt2(c0), "belum diatur ke nol");
  const telur = timbang(c0, "digital", "telur");
  penuh("C", "c-telur", kt2(telur));
  belum("C", "c-telur", kt2(tt(c0, { t: "NOL" }, { t: "TARUH" })), "belum Baca berat");
  belum("C", "c-telur", kt2(tt(c0, { t: "TARUH" }, { t: "BACA" })), "tanpa nol");
  const semangka = timbang(c0, "duduk", "semangka");
  penuh("C", "c-jarum", kt2(semangka));
  belum("C", "c-jarum", kt2(timbang(c0, "digital", "semangka")), "semangka di timbangan digital bukan timbangan duduk");
  penuh("C", "c-salah", kt2(tt(c0, { t: "TARUH" }, { t: "BACA" })));
  belum("C", "c-salah", kt2(telur), "dari nol tidak salah");
  belum("C", "c-salah", kt2(tt(c0, { t: "BACA" })), "tanpa benda");
  let tiga = telur;
  tiga = timbang(tiga, "digital", "stroberi");
  belum("C", "c-tiga", kt2(tiga), "baru dua benda");
  tiga = timbang(tiga, "digital", "gula");
  penuh("C", "c-tiga", kt2(tiga));
  penuh("C", "c-seribu", kt2(timbang(c0, "digital", "gula")));
  belum("C", "c-seribu", kt2(telur), "bukan gula");
  let selisih = timbang(c0, "digital", "stroberi");
  belum("C", "c-selisih", kt2(selisih), "baru satu stroberi");
  selisih = timbang(selisih, "digital", "stroberi2");
  penuh("C", "c-selisih", kt2(selisih));
  penuh("C", "c-diantara", kt2(timbang(c0, "duduk", "tepung")));
  belum("C", "c-diantara", kt2(semangka), "jarum tepat di angka");
  belum("C", "c-diantara", kt2(timbang(c0, "digital", "tepung")), "digital tidak di antara");
  for (const ke of keadaanAwal.filter((k) => k.alat !== "timbang")) for (const m of K3.MISI_C) belum("C", m.id, ke, `alat ${ke.alat} bukan timbangan`);
}

// Sub-Bab D
{
  const d0 = KD.awalKodok();
  const kd = KD.keadaanKodok;
  const ku = KD.keadaanUbah;
  const s1 = susun(d0, [1, 0, 1, 1, 0]);
  penuh("D", "d-750", kd(s1));
  belum("D", "d-750", kd(susun(d0, [0, 1, 0, 1, 0])), "600 g belum seimbang");
  belum("D", "d-750", kd(susun(kk(d0, { t: "BENDA", id: "gula" }), [1, 0, 1, 1, 0])), "benda lain");
  belum("D", "d-dua", kd(s1), "baru satu susunan");
  const s2 = susun(s1, [1, 7, 0, 0, 0]);
  penuh("D", "d-dua", kd(s2));
  belum("D", "d-tiga", kd(s2), "baru dua susunan");
  const s3 = susun(s2, [3, 1, 0, 1, 0]);
  penuh("D", "d-tiga", kd(s3));
  // Dua susunan pada dua benda berbeda belum cukup untuk satu benda.
  const campur = susun(kk(s1, { t: "BENDA", id: "gula" }), [1, 0, 1, 1, 1]);
  belum("D", "d-dua", kd(campur), "dua susunan pada dua benda berbeda");
  const jeruk = susun(kk(d0, { t: "BENDA", id: "jeruk" }), [0, 1, 2, 1, 1]);
  penuh("D", "d-lima", kd(jeruk));
  belum("D", "d-lima", kd(susun(kk(d0, { t: "BENDA", id: "jeruk" }), [0, 0, 0, 0, 2])), "dua bandul 1 kg bukan lima bandul");
  belum("D", "d-lima", kd(susun(kk(d0, { t: "BENDA", id: "jeruk" }), [0, 0, 0, 4, 0])), "empat bandul ½ kg");
  const ubahD = (total, ...tog) => kk(setTotal(d0, total), ...tog.map((rep) => ({ t: "TOGGLE", rep })));
  penuh("D", "d-kg", ku(ubahD(1000, "gram", "ons")));
  belum("D", "d-kg", ku(ubahD(1000, "gram")), "Ons belum menyala");
  belum("D", "d-kg", ku(ubahD(1100, "gram", "ons")), "1.100 g bukan 1 kg");
  penuh("D", "d-1753", ku(ubahD(1753, "kgg")));
  belum("D", "d-1753", ku(ubahD(1753, "gram")), "Kilogram dan gram belum menyala");
  penuh("D", "d-4150", ku(ubahD(4150, "gram")));
  belum("D", "d-4150", ku(ubahD(4150)), "Gram belum menyala");
  penuh("D", "d-mangga", ku(ubahD(8000, "kgg")));
  belum("D", "d-mangga", ku(ubahD(8000, "gram")), "Kilogram dan gram belum menyala");
  for (const ke of keadaanAwal.filter((k) => k.alat !== "kodok" && k.alat !== "ubahberat")) for (const m of K3.MISI_D) belum("D", m.id, ke, `alat ${ke.alat} bukan lab kodok`);
}

/* ---- Gerbang bekerja ---- */
for (const h of ["A", "B", "C", "D"]) {
  const daftar = K3.daftarMisiK3Bab3(h);
  const tampil = M0.tampilMisi(daftar);
  const sudah = new Set();
  const catat = (keadaan) => {
    for (const id of M0.misiBaru(daftar, keadaan, sudah)) sudah.add(id);
  };
  const urut = daftar.filter((m) => m.wajib).map((m) => m.id);
  // Capai semua misi wajib berurutan dengan keadaan nyata; gerbang baru terbuka di akhir.
  if (h === "A") {
    const a0 = P.awalPenggaris();
    let s = ukur(a0, "penggaris", "pensil");
    catat(kp(s));
    s = ukur(s, "meteran", "pintu");
    catat(kp(s));
    s = ukur(s, "penggaris", "krayon");
    catat(kp(s));
    catat(kp(P.langkahPenggaris(P.awalPenggaris(), { t: "BACA" })));
  } else if (h === "B") {
    const b0 = MT.awalMet();
    catat(km(mm(setCm(b0, "a", 117), { t: "TOGGLE", rep: "meterCm" }, { t: "TOGGLE", rep: "senti" })));
    catat(km(mm(setCm(b0, "a", 400), { t: "TOGGLE", rep: "ubah" })));
    catat(km(MT.langkahMet(setCm(b0, "a", 99), { t: "UBAH", pita: "a", satuan: "cm", d: 1 })));
    const dp = (a, b, op) => mm(setCm(setCm(mm(b0, { t: "MODE", mode: "dua" }, { t: "OP", op }), "a", a), "b", b), { t: "TOGGLE", rep: "langkah" });
    catat(km(dp(437, 743, "sambung")));
    catat(km(dp(7580, 3845, "potong")));
  } else if (h === "C") {
    const c0 = TB.awalTimbang();
    catat(TB.keadaanTimbang(tt(c0, { t: "NOL" })));
    let s = timbang(c0, "digital", "telur");
    catat(TB.keadaanTimbang(s));
    s = timbang(s, "duduk", "semangka");
    catat(TB.keadaanTimbang(s));
    s = timbang(s, "digital", "gula");
    catat(TB.keadaanTimbang(s));
    catat(TB.keadaanTimbang(tt(c0, { t: "TARUH" }, { t: "BACA" })));
  } else {
    const d0 = KD.awalKodok();
    let s = susun(d0, [1, 0, 1, 1, 0]);
    catat(KD.keadaanKodok(s));
    s = susun(s, [1, 7, 0, 0, 0]);
    catat(KD.keadaanKodok(s));
    const ubahD = (total, ...tog) => kk(setTotal(d0, total), ...tog.map((rep) => ({ t: "TOGGLE", rep })));
    catat(KD.keadaanUbah(ubahD(1000, "gram", "ons")));
    catat(KD.keadaanUbah(ubahD(1753, "kgg")));
    catat(KD.keadaanUbah(ubahD(4150, "gram")));
  }
  cek(!M0.wajibSelesai(tampil, sudah) && sudah.size >= 3, `gerbang ${h}: masih tertutup setelah misi alat saja`);
  catat(sel(K3.ID_MESIN_K3B3[h]));
  cek(!M0.wajibSelesai(tampil, sudah), `gerbang ${h}: tertutup tanpa skenario`);
  catat(sel(K3.ID_SKENARIO_K3B3[h]));
  cek(M0.wajibSelesai(tampil, sudah), `gerbang ${h}: terbuka setelah semua misi wajib (belum: ${urut.filter((id) => !sudah.has(id)).join(",")})`);
  catat(keadaanAwal[0]);
  cek(M0.wajibSelesai(tampil, sudah), `gerbang ${h}: tetap terbuka setelah alat diubah`);
}

/* ---- Konsep sub-bab berikutnya tidak dipakai di sub-bab sebelumnya ---- */
{
  const teks = (h, lab) => [TK.MISI_K3B3[h], TK.NAMA_SIM_K3B3[h], ...K3.daftarMisiK3Bab3(h).map((m) => m.teks), JSON.stringify(lab)].join(" ");
  // Skenario boleh memakai gram dan timbangan hanya sebagai pengecoh (membedakan panjang dari berat).
  const teksA = [TK.MISI_K3B3.A, TK.NAMA_SIM_K3B3.A, ...K3.daftarMisiK3Bab3("A").map((m) => m.teks)].join(" ");
  cek(!/(100 cm|1 meter|1 m\b|× 100|\bgram\b|\bkilogram\b|\bons\b|bandul|timbangan)/i.test(teksA), "misi Sub-Bab A tidak memakai hubungan meter dan sentimeter, atau satuan berat");
  cek(!/(100 cm|1 meter|1 m\b|× 100|\bkilogram\b|\bons\b|bandul)/i.test(JSON.stringify(SK.SKENARIO_K3B3A)), "skenario A tidak memakai hubungan meter dan sentimeter, kilogram, ons, atau bandul");
  teks("A", SK.SKENARIO_K3B3A);
  const B = teks("B", SK.SKENARIO_K3B3B);
  cek(!/(\bgram\b|\bkilogram\b|\bons\b|bandul|timbangan)/i.test(B), "Sub-Bab B tidak membahas berat");
  const C = teks("C", SK.SKENARIO_K3B3C);
  cek(!/(\bons\b|bandul|kodok|1\.000 g sama|10 ons|kg ke gram|kilogram ke gram)/i.test(C), "Sub-Bab C tidak memakai ons, bandul, atau ubah kilogram ke gram");
  cek(!/(sentimeter|meteran|penggaris|\bcm\b)/i.test(JSON.stringify(SK.SKENARIO_K3B3C.adegan.filter((a) => a.jenis !== "soal" && a.id !== "pilih-satuan"))), "skenario C tidak memakai alat ukur panjang (selain sebagai pengecoh)");
}

console.log(`Lulus ${lulus}, gagal ${gagal}`);
process.exit(gagal ? 1 : 0);
