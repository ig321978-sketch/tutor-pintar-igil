// Uji Mind-map (Rak Gudang Bu Lestari), Infografis (papan rak bundel dan kartu tukar), Simulasi Tukar Bundel, dan tahap Concrete, Pictorial, Abstract Kelas 5 Bab 1 Sub-Bab C ("Bundel Tiket Bu Lestari"),
// lanjutan cerita Hari Pertandingan di Stadion Kota (uraian, tukar sepuluh antar kolom, banyak cara menyusun, kembali ke bentuk biasa dengan nol penjaga).
// Memeriksa: logika bundel murni (digit dari teks, uraian, tukar, tata letak bundel sungguh sebanyak data), simulasi (uraikan, tukar dengan alat menolak, susun dengan nol, samakan), misi,
// Mind-map empat label dan Infografis dua kartu dengan data bersambung (Utara 24.350, Barat 30.402), CPA dua belas langkah per tahap (Klik, Kanvas, Suara x empat metode) dengan jawaban beragam
// dan Cari kesalahan di tiap tahap, jawaban benar dihitung ulang dari data, angka kanvas tidak kembar per tahap, pengenal ucapan, batas rupa, emoji, kata terlarang, akhir baris.
// Jalankan: node --no-warnings scripts/uji-bundel-k5b1c.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/bundel-k5b1c/logika.ts");
const DS = await import("../src/components/modul/bundel-k5b1c/data-sim.ts");
const DK = await import("../src/components/modul/bundel-k5b1c/data-kartu.ts");
const LC = await import("../src/components/modul/bundel-k5b1c/logika-cpa.ts");
const G = await import("../src/components/modul/bundel-k5b1c/logika-data.ts");
const D = await import("../src/components/modul/bundel-k5b1c/data.ts");
const K = await import("../src/components/modul/bundel-k5b1c/periksa.ts");
const EJ = await import("../src/components/modul/eja-k5b1.ts");
const S = await import("../src/components/modul/misi-simulasi.ts");
const MK = await import("../src/components/modul/misi-k5bab1.ts");
const MT = await import("../src/components/modul/misi-teks-k5b1.ts");
const folder = new URL("../src/components/modul/bundel-k5b1c/", import.meta.url);

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
const bersih = (t) => !/buku|kelompok|bernilai|tebak|nilai|kelas|teman|skor|soal|kunci|latihan|senilai|ditemani/i.test(t);
const tanpaDigit = (t) => !/\d/.test(t);
const emojiSah = (s) => [...s].every((c) => c.codePointAt(0) <= 0x1fa95 && c.codePointAt(0) !== 0x200d && c.codePointAt(0) !== 0x1f6de);
const IKAN = [0x1f41f, 0x1f420, 0x1f421, 0x1f988, 0x1f42c, 0x1f38f];
const DILARANG = [0x1fa74, 0x1f39f, 0x2602, 0x1fa9f, 0x1faa3, 0x1f355, 0x1faa1, 0x1f9cb, 0x1fa91];
// Topik Sub-Bab D (hitung bersusun, pembulatan) dan Sub-Bab B (banding, urut) tidak dibahas di Sub-Bab C, kecuali jembatan di penutup.
const BUKAN_C = /bersusun|menyimpan|meminjam|pembulatan|dibulatkan|perkiraan|kira-kira|lebih besar|lebih kecil|garis bilangan|diurutkan|mengurutkan/i;
const KATA_PENDEK = (t) => t.split(/\s+/).every((w) => w.replace(/[^a-zA-Z]/g, "").length <= 12);
const GAMBAR = /gambar|petak|kisi|titik|kotak|emoji|diagram/i;
const NAMA = ["kardus", "dus", "pak", "ikat", "lembar"];
const TEMPAT = ["puluh ribuan", "ribuan", "ratusan", "puluhan", "satuan"];
const BOBOT = [10000, 1000, 100, 10, 1];

/* Pembanding independen: digit diambil dari TEKS, bukan dari sisa bagi. */
const digitTeks = (n) => String(n).padStart(5, "0").split("").map(Number);
const titik = (n) => (n >= 1000 ? `${String(n).slice(0, -3)}.${String(n).slice(-3)}` : String(n));
const uraianTeks = (n) => digitTeks(n).flatMap((c, i) => (c === 0 ? [] : [titik(c * BOBOT[i])])).join(" + ");
const susunanTeks = (s) => s.flatMap((c, i) => (c === 0 ? [] : [`${c} ${NAMA[i]}`])).join(", ");
const jumlahS = (s) => s.reduce((t, c, i) => t + c * BOBOT[i], 0);
/** Susunan dari teks "3 kardus, 5 dus, 14 pak" (kolom yang tidak disebut nol). */
const bacaSusunan = (t) => {
  const s = [0, 0, 0, 0, 0];
  for (const m of t.matchAll(/(\d+) (kardus|dus|pak|ikat|lembar)/g)) s[NAMA.indexOf(m[2])] = Number(m[1]);
  return s;
};
/** Jumlah dari uraian "40.000 + 200 + 5". */
const bacaUraian = (t) => t.split("+").reduce((a, b) => a + Number(b.trim().replace(/\./g, "")), 0);
const bacaBilangan = (t) => Number(t.replace(/\./g, ""));

// Bilangan yang dipakai Story dan Infografis tidak boleh dipakai CPA dan Simulasi.
const BILANGAN_STORY = [24350, 18705, 30402, 43206, 70580, 9060, 24305, 82517];

/* ------------------------------ Logika bundel murni ------------------------------ */
{
  sama(G.KOLOM.map((k) => k.bundel), NAMA, "nama bundel lima kolom");
  sama(G.KOLOM.map((k) => k.tempat), TEMPAT, "nama tempat lima kolom");
  sama(G.KOLOM.map((k) => k.bobot), BOBOT, "bobot lima kolom");
  cek(G.KOLOM.every((k) => emojiSah(k.ikon) && ![...k.ikon].some((c) => DILARANG.includes(c.codePointAt(0)) || IKAN.includes(c.codePointAt(0)))), "ikon bundel emoji lama");
  sama([G.lambang(0), G.lambang(5), G.lambang(999), G.lambang(1000), G.lambang(24350), G.lambang(90000)], ["0", "5", "999", "1.000", "24.350", "90.000"], "lambang titik ribuan");
  for (const n of [24350, 30402, 18705, 40205, 91704, 10000, 99999, 50007]) {
    sama(G.susunanDari(n), digitTeks(n), `susunan ${n} sama dengan digit dari teks`);
    sama(G.totalSusunan(G.susunanDari(n)), n, `total susunan ${n}`);
    sama(G.teksUraian(n), uraianTeks(n), `uraian ${n}`);
    cek(G.bentukBiasa(G.susunanDari(n)), `susunan ${n}: bentuk biasa`);
    sama(G.banyakNol(n), digitTeks(n).filter((c) => c === 0).length, `banyak nol ${n}`);
    sama(G.kolomNol(n), digitTeks(n).map((c, i) => (c === 0 ? i : -1)).filter((i) => i >= 0), `kolom nol ${n}`);
  }
  sama(G.bagianUraian(24350), ["20.000", "4.000", "300", "50"], "uraian 24.350");
  sama(G.teksUraian(30402), "30.000 + 400 + 2", "uraian 30.402 melewati kolom nol");
  sama(G.teksSusunan([2, 4, 3, 5, 0]), "2 kardus, 4 dus, 3 pak, 5 ikat", "teks susunan tanpa kolom kosong");
  // Tukar sepuluh.
  const s0 = [2, 4, 3, 5, 0];
  sama(G.tukarTurun(s0, 1), [2, 3, 13, 5, 0], "tukar turun satu dus menjadi sepuluh pak");
  sama(G.tukarNaik([2, 3, 13, 5, 0], 1), s0, "tukar naik sepuluh pak menjadi satu dus");
  cek(G.tukarTurun([0, 4, 3, 5, 0], 0) === null && G.tukarNaik(s0, 1) === null && G.tukarTurun(s0, 4) === null && G.tukarNaik(s0, -1) === null, "tukar ditolak bila bundel tidak cukup atau kolom di luar daftar");
  for (let i = 0; i < 4; i += 1) {
    const t = G.tukarTurun([3, 3, 3, 3, 3], i);
    cek(t !== null && G.totalSusunan(t) === 33333 && !G.bentukBiasa(t), `tukar turun kolom ${i}: jumlah tetap, bukan bentuk biasa`);
  }
  cek(G.samaSusunan([1, 2], [1, 2]) && !G.samaSusunan([1, 2], [2, 1]) && !G.samaSusunan([1, 2], [1, 2, 3]), "sama susunan");
  // Pengecoh.
  for (const n of [40205, 52640, 67420, 84916, 57106]) {
    const benar = G.teksUraian(n);
    cek(bacaUraian(G.uraianGeserKiri(n)) !== n && G.uraianGeserKiri(n) !== benar, `pengecoh geser kiri ${n}`);
    cek(bacaUraian(G.uraianKurangNol(n)) !== n && G.uraianKurangNol(n) !== benar, `pengecoh kurang nol ${n}`);
  }
  sama(G.uraianGeserKiri(40205), "40.000 + 200 + 50", "pengecoh seed Fajar: lima menjadi lima puluh");
  sama([G.bilanganTanpaNol(80305), G.bilanganNolBergeser(60904), G.bilanganTanpaNol(24351)], [8305, 69004, 24351], "pengecoh bilangan tanpa nol dan nol bergeser");
  // Tata letak bundel: sungguh sebanyak data.
  for (const s of [[2, 4, 3, 5, 0], [2, 3, 13, 5, 0], [0, 0, 243 > 15 ? 15 : 243, 5, 0], [9, 9, 9, 9, 9], [0, 0, 0, 0, 0], [3, 0, 4, 0, 2]]) {
    const t = G.tataBundel(s);
    sama(t.baris.map((b) => b.sel.length), s, `tata letak ${s.join()}: bundel digambar sungguh sebanyak data`);
    cek(t.baris.every((b) => b.sel.every((p, i, a) => p.x - b.cell / 2 >= G.TATA.xBundel - 1 && p.x + b.cell / 2 <= G.TATA.lebar - 4 && (i === 0 || p.x - a[i - 1].x >= b.cell - 0.01))), `tata letak ${s.join()}: bundel muat dan tidak bertumpuk`);
    cek(t.baris.every((b, i, a) => i === 0 || b.y - a[i - 1].y >= G.TATA.barisTinggi - 0.01) && t.tinggi > t.baris[4].y + 10 && t.tinggi <= 200, `tata letak ${s.join()}: baris tidak bertumpuk, tinggi muat`);
  }
  cek(G.TATA.xBundel + 9 * G.TATA.maksCell <= G.TATA.lebar - 4 && G.TINGGI_BUNDEL.every((h) => h <= G.TATA.barisTinggi - 6), "sembilan bundel muat satu baris, tinggi bundel muat baris");
  cek(G.TINGGI_BUNDEL.every((h, i, a) => i === 0 || h < a[i - 1]), "bundel mengecil dari kardus sampai lembar");
}

/* ------------------------------ Simulasi: data dan logika ------------------------------ */
{
  cek(DS.TARGET_URAI.length === 3 && DS.TARGET_TUKAR.length === 3 && DS.TARGET_SUSUN.length === 3 && DS.TARGET_SAMA.length === 3, "simulasi: tiga sasaran tiap alat");
  cek([...DS.TARGET_URAI, ...DS.TARGET_SUSUN, ...DS.TARGET_SAMA.map((x) => x.n)].every((n) => n >= 10000 && n <= 99999 && !BILANGAN_STORY.includes(n)), "simulasi: bilangan lima angka, bukan bilangan Story");
  cek(DS.TARGET_URAI.some((n) => G.banyakNol(n) >= 1) && DS.TARGET_SUSUN.every((n) => G.banyakNol(n) >= 1), "simulasi: nol penjaga ada pada sasaran uraikan dan semua sasaran susun");
  cek(DS.TARGET_TUKAR.every((x) => x.i >= 0 && x.i <= 3 && x.t !== 0 && x.s.length === 5), "simulasi tukar: pasangan dan arah sah");
  cek(DS.TARGET_TUKAR.every((x) => G.totalSusunan(DS.sasaranTukarS(x)) === G.totalSusunan(x.s) && !G.samaSusunan(DS.sasaranTukarS(x), x.s)), "simulasi tukar: sasaran dicapai dengan penukaran dan jumlah tetap");
  cek(new Set(DS.TARGET_TUKAR.map((x) => x.i)).size === 3 && DS.TARGET_TUKAR.some((x) => x.t > 0) && DS.TARGET_TUKAR.some((x) => x.t < 0), "simulasi tukar: pasangan berbeda, ada arah turun dan naik");
  cek(DS.TARGET_TUKAR.every((x) => x.s.every((c) => c >= 0 && c <= 20)), "simulasi tukar: banyak bundel muat satu baris");
  cek(DS.TARGET_SAMA.every((x) => x.opsi.length === 4 && x.opsi.every((s) => s.length === 5) && new Set(x.opsi.map(susunanTeks)).size === 4), "simulasi samakan: empat susunan berbeda");
  cek(DS.TARGET_SAMA.every((x) => L.susunanSama(x).length >= 1 && L.susunanSama(x).length <= 3), "simulasi samakan: ada yang sama dan ada yang tidak");
  sama(DS.TARGET_SAMA.map((x) => L.susunanSama(x)), DS.TARGET_SAMA.map((x) => x.opsi.map((s, i) => (jumlahS(s) === x.n ? i : -1)).filter((i) => i >= 0)), "simulasi samakan: susunan yang sama dihitung ulang");
  cek(new Set(DS.TARGET_SAMA.map((x) => L.susunanSama(x).length)).size >= 2, "simulasi samakan: banyak jawaban benar bervariasi");
  cek(DS.TARGET_SAMA.every((x) => x.opsi.every((s) => s.every((c) => c >= 0 && c <= 20 && Number.isInteger(c)))), "simulasi samakan: banyak bundel muat");
  cek(tanpaDigit(DS.MISI_BUNDEL_TEKS) && bersih(DS.MISI_BUNDEL_TEKS) && !BUKAN_C.test(DS.MISI_BUNDEL_TEKS) && DS.MISI_BUNDEL_TEKS === MT.MISI_K5B1.C && D.MISI_BUNDEL_TEKS === DS.MISI_BUNDEL_TEKS && DS.MISI_BUNDEL_TEKS.length >= 10 && DS.MISI_BUNDEL_TEKS.length <= 170, "simulasi: teks misi bersih dan sama dengan misi-teks-k5b1");
  const a0 = L.awalBundel();
  cek(a0.alat === "bundel" && a0.mode === "urai" && a0.uraiIsi.every((c) => c === 0) && a0.susunIsi.every((c) => c === -1) && a0.samaPilih.every((p) => !p) && G.samaSusunan(a0.tukarS, DS.TARGET_TUKAR[0].s) && !a0.tolak && a0.salah === 0 && a0.uraiBenar.length + a0.tukarBenar.length + a0.susunBenar.length + a0.samaBenar.length === 0, "awal: belum ada bundel, angka, pilihan, atau penolakan");
  sama(L.mulaiLagiBundel(), a0, "mulai lagi sama dengan awal");
  sama([L.pilihModeBundel(a0, "sama").mode, L.kata(24350), L.hurufBesar("betul")], ["sama", "dua puluh empat ribu tiga ratus lima puluh", "Betul"], "pilih alat, kata, huruf besar");

  /* Uraikan */
  {
    const kosong = L.periksaUrai(a0);
    cek(!kosong.ok && kosong.k.salah === 0 && !kosong.k.tolak && /menolak/i.test(L.petunjukUrai(a0)) && tanpaDigit(L.petunjukUrai(a0)), "uraikan: memeriksa tanpa bundel ditolak, bukan percobaan keliru dan bukan tantangan menolak");
    cek(L.ubahUrai(a0, 9, 1) === a0 && L.ubahUrai(a0, -1, 1) === a0, "uraikan: kolom di luar daftar diabaikan");
    cek(L.ubahUrai(a0, 0, -1).uraiIsi[0] === 0 && Array.from({ length: 12 }).reduce((q) => L.ubahUrai(q, 2, 1), a0).uraiIsi[2] === 9, "uraikan: bundel tidak kurang dari nol dan tidak lebih dari sembilan");
    DS.TARGET_URAI.forEach((n, i) => {
      let k = { ...L.awalBundel(), uraiKe: i };
      digitTeks(n).forEach((c, j) => {
        for (let m = 0; m < c; m += 1) k = L.ubahUrai(k, j, 1);
      });
      sama(L.totalUrai(k), n, `uraikan sasaran ${i}: jumlah tiket di rak sama dengan bilangan`);
      const ok = L.periksaUrai(k);
      cek(ok.ok && ok.k.uraiBenar.length === 1 && ok.k.uraiKe === i + 1 && ok.k.uraiIsi.every((c) => c === 0), `uraikan sasaran ${i}: bundel yang dihitung dari data diterima`);
      const keliru = L.periksaUrai(L.ubahUrai(k, 4, 1));
      cek(!keliru.ok && keliru.k.salah === 1 && tanpaDigit(L.petunjukUrai(k)) && !/menolak/i.test(L.petunjukUrai(k)), `uraikan sasaran ${i}: bundel keliru ditolak dengan petunjuk tanpa angka`);
    });
  }
  /* Tukar */
  {
    const s = L.sasaranTukar(a0);
    cek(G.samaSusunan(L.susunanAwalTukar(a0), DS.TARGET_TUKAR[0].s) && s.i === 1, "tukar: susunan awal sasaran pertama");
    // Tantangan menolak: sasaran pertama punya pak kurang dari sepuluh, jadi tukar naik ditolak.
    const naik = L.tukarSatu(a0, "naik");
    cek(!naik.ok && naik.k.tolak === true && G.samaSusunan(naik.k.tukarS, a0.tukarS) && /menolak/i.test(L.petunjukTukar(a0, "naik")) && tanpaDigit(L.petunjukTukar(a0, "naik")), "tukar: sepuluh bundel kecil belum ada, alat menolak dan menandai tantangan menolak");
    const turun = L.tukarSatu(a0, "turun");
    cek(turun.ok && !turun.k.tolak && G.totalSusunan(turun.k.tukarS) === G.totalSusunan(a0.tukarS) && /berhasil/i.test(L.petunjukTukar(a0, "turun")), "tukar: tukar turun diterima, jumlah tiket tetap");
    // Tolak turun: kolom besar kosong.
    const kosongBesar = { ...a0, tukarKe: 2, tukarS: [0, 15, 2, 8, 4] };
    const tolakT = L.tukarSatu(kosongBesar, "turun");
    cek(!tolakT.ok && tolakT.k.tolak && /menolak/i.test(L.petunjukTukar(kosongBesar, "turun")), "tukar: tidak ada bundel besar, alat menolak");
    // Periksa.
    const k0 = L.periksaTukar(a0);
    cek(!k0.ok && k0.k.salah === 0 && !k0.k.tolak && /menolak/i.test(L.petunjukPeriksaTukar(a0)) && tanpaDigit(L.petunjukPeriksaTukar(a0)), "tukar: memeriksa sebelum menukar ditolak, bukan percobaan keliru");
    DS.TARGET_TUKAR.forEach((x, i) => {
      const dasar = { ...L.awalBundel(), tukarKe: i, tukarS: [...x.s] };
      let k = dasar;
      for (let m = 0; m < Math.abs(x.t); m += 1) {
        const r = L.tukarSatu(k, x.t > 0 ? "turun" : "naik");
        cek(r.ok, `tukar sasaran ${i}: penukaran ${m + 1} diterima`);
        k = r.k;
      }
      cek(G.samaSusunan(k.tukarS, L.susunanSasaranTukar(dasar)), `tukar sasaran ${i}: susunan sama dengan sasaran`);
      const ok = L.periksaTukar(k);
      cek(ok.ok && ok.k.tukarBenar.length === 1 && ok.k.tukarKe === i + 1 && G.samaSusunan(ok.k.tukarS, DS.TARGET_TUKAR[(i + 1) % 3].s), `tukar sasaran ${i}: susunan tepat menaikkan sasaran`);
      // Penukaran ke arah berlawanan lebih dulu bila mungkin, lalu kembali: tetap tidak sama dengan sasaran bila arah salah.
      const arahSalah = L.tukarSatu(dasar, x.t > 0 ? "naik" : "turun");
      if (arahSalah.ok) {
        const keliru = L.periksaTukar(arahSalah.k);
        cek(!keliru.ok && keliru.k.salah === 1 && tanpaDigit(L.petunjukPeriksaTukar(arahSalah.k)) && !/menolak/i.test(L.petunjukPeriksaTukar(arahSalah.k)), `tukar sasaran ${i}: arah keliru ditolak dengan petunjuk`);
      }
    });
  }
  /* Susun */
  {
    const kosong = L.periksaSusun(a0);
    cek(!kosong.ok && kosong.k.salah === 0 && /menolak/i.test(L.petunjukSusun(a0)) && tanpaDigit(L.petunjukSusun(a0)), "susun: memeriksa tanpa mengisi ditolak");
    sama([L.ketukSusun(a0, 0).susunIsi[0], L.ketukSusun(L.ketukSusun(a0, 0), 0).susunIsi[0], Array.from({ length: 10 }).reduce((q) => L.ketukSusun(q, 2), a0).susunIsi[2], Array.from({ length: 11 }).reduce((q) => L.ketukSusun(q, 2), a0).susunIsi[2]], [0, 1, 9, 0], "susun: ketuk pertama nol, lalu naik sampai sembilan, lalu kembali ke nol");
    cek(L.ketukSusun(a0, 7) === a0, "susun: kolom di luar daftar diabaikan");
    const sebagian = L.ketukSusun(L.ketukSusun(a0, 0), 1);
    cek(!L.periksaSusun(sebagian).ok && L.periksaSusun(sebagian).k.salah === 0 && /menolak/i.test(L.petunjukSusun(sebagian)), "susun: kolom belum diisi ditolak, bukan percobaan keliru (kolom kosong harus diisi nol)");
    DS.TARGET_SUSUN.forEach((n, i) => {
      let k = { ...L.awalBundel(), susunKe: i };
      digitTeks(n).forEach((c, j) => {
        for (let m = 0; m <= c; m += 1) k = L.ketukSusun(k, j);
      });
      sama(k.susunIsi, digitTeks(n), `susun sasaran ${i}: isian dari digit teks`);
      const ok = L.periksaSusun(k);
      cek(ok.ok && ok.k.susunBenar.length === 1 && ok.k.susunKe === i + 1 && ok.k.susunIsi.every((c) => c === -1), `susun sasaran ${i}: bilangan tepat menaikkan sasaran`);
      const geser = { ...k, susunIsi: k.susunIsi.map((c, j) => (j === 4 ? (c + 1) % 10 : c)) };
      const keliru = L.periksaSusun(geser);
      cek(!keliru.ok && keliru.k.salah === 1 && tanpaDigit(L.petunjukSusun(geser)) && !/menolak/i.test(L.petunjukSusun(geser)), `susun sasaran ${i}: isian keliru ditolak dengan petunjuk`);
      sama(L.bilanganSusun({ ...L.awalBundel(), susunKe: i }), n, `susun sasaran ${i}: bilangan`);
    });
  }
  /* Samakan */
  {
    const k = L.awalBundel();
    cek(!L.periksaSama(k).ok && L.periksaSama(k).k.salah === 0 && /menolak/i.test(L.petunjukSama(k)) && tanpaDigit(L.petunjukSama(k)), "samakan: memeriksa tanpa memilih ditolak");
    cek(L.ubahSama(k, 0).samaPilih[0] === true && L.ubahSama(L.ubahSama(k, 0), 0).samaPilih[0] === false && L.ubahSama(k, 9) === k, "samakan: ketuk memilih dan membatalkan");
    DS.TARGET_SAMA.forEach((x, i) => {
      const dasar = { ...L.awalBundel(), samaKe: i, samaPilih: x.opsi.map(() => false) };
      const benar = x.opsi.map((s, j) => (jumlahS(s) === x.n ? j : -1)).filter((j) => j >= 0);
      let m = dasar;
      for (const j of benar) m = L.ubahSama(m, j);
      const ok = L.periksaSama(m);
      cek(ok.ok && ok.k.samaBenar.length === 1 && ok.k.samaKe === i + 1 && ok.k.samaPilih.every((p) => !p), `samakan sasaran ${i}: semua susunan yang sama diterima`);
      const kurang = L.periksaSama(L.ubahSama(dasar, benar[0]));
      cek(benar.length === 1 ? kurang.ok : !kurang.ok && kurang.k.salah === 1, `samakan sasaran ${i}: pilihan kurang ditolak bila masih ada yang sama`);
      const lebih = L.periksaSama(L.ubahSama(m, x.opsi.findIndex((s) => jumlahS(s) !== x.n)));
      cek(!lebih.ok && lebih.k.salah === 1 && tanpaDigit(L.petunjukSama(m)) && !/menolak/i.test(L.petunjukSama(m)), `samakan sasaran ${i}: susunan yang tidak sama ikut dipilih ditolak`);
    });
  }
  /* Kalimat status */
  for (const f of [L.kalimatUrai, L.kalimatTukar, L.kalimatSusun, L.kalimatSama]) cek(/^[A-Z]/.test(L.hurufBesar(f(a0))) && tanpaDigit(f(a0)) && bersih(f(a0)) && !BUKAN_C.test(f(a0)), `kalimat ${f.name}: awal huruf besar, tanpa digit`);
  /* Misi */
  {
    const dC = MK.daftarMisiK5Bab1("C");
    cek(dC === MK.MISI_C && dC.length === 6 && dC.filter((m) => m.wajib).length === 4 && dC.filter((m) => !m.wajib).length === 2, "misi: enam misi, empat wajib, dua bebas");
    cek(dC.every((m) => m.id.startsWith("c-")) && new Set(dC.map((m) => m.id)).size === 6, "misi: id berawalan c- dan unik");
    cek(S.misiBaru(dC, a0, new Set()).length === 0, "misi: keadaan awal tidak memenuhi misi");
    cek(dC.every((m) => !m.cek({ alat: "kerangka" })) && dC.every((m) => !m.cek({ alat: "tribun" })), "misi: alat lain tidak memenuhi misi");
    cek(dC.every((m) => tanpaDigit(m.teks) && bersih(m.teks) && !BUKAN_C.test(m.teks) && m.teks.length > 10 && m.teks.length < 120), "misi: teks tanpa digit, kata terlarang, dan istilah Sub-Bab lain");
    sama(S.misiBaru(dC, { ...a0, uraiBenar: [0] }, new Set()), ["c-urai"], "misi: uraikan");
    sama(S.misiBaru(dC, { ...a0, tukarBenar: [0] }, new Set()), ["c-tukar"], "misi: tukar");
    sama(S.misiBaru(dC, { ...a0, susunBenar: [0] }, new Set()), ["c-susun"], "misi: susun");
    sama(S.misiBaru(dC, { ...a0, samaBenar: [0] }, new Set()), ["c-sama"], "misi: samakan");
    sama(S.misiBaru(dC, { ...a0, tolak: true }, new Set()), ["c-tolak"], "misi: tolak");
    sama(S.misiBaru(dC, { ...a0, tukarBenar: [0, 1] }, new Set()), ["c-tukar", "c-dua"], "misi: dua susunan tukar benar");
    // Hanya penolakan penukaran yang bundelnya tidak cukup menghitung tantangan menolak.
    cek(S.misiBaru(dC, L.periksaUrai(a0).k, new Set()).length === 0 && S.misiBaru(dC, L.periksaTukar(a0).k, new Set()).length === 0 && S.misiBaru(dC, L.periksaSusun(a0).k, new Set()).length === 0 && S.misiBaru(dC, L.periksaSama(a0).k, new Set()).length === 0, "misi: penolakan alat lain tidak menghitung tantangan menolak");
    sama(S.misiBaru(dC, L.tukarSatu(a0, "naik").k, new Set()), ["c-tolak"], "misi: penolakan tukar menghitung tantangan menolak");
  }
}

/* ------------------------------ Mind-map dan Infografis ------------------------------ */
{
  const n = DK.LANGKAH_BUNDEL.length;
  cek(n >= 3 && n <= 6, `mind-map: jumlah label 3 sampai 6 (${n})`);
  const arti = DK.LANGKAH_BUNDEL.map((l) => l.arti).join(" ");
  const judulSemua = DK.LANGKAH_BUNDEL.map((l) => l.judul).join(" | ");
  cek([...DK.LANGKAH_BUNDEL.map((l) => l.judul), ...DK.LANGKAH_BUNDEL.map((l) => l.arti), DK.PETUNJUK_PETA_BUNDEL, DK.SELESAI_PETA_BUNDEL, DK.JUDUL_PETA_BUNDEL].every((t) => tanpaDigit(t) && bersih(t) && !BUKAN_C.test(t)), "mind-map: tanpa digit, kata terlarang, dan istilah Sub-Bab lain");
  cek(DK.LANGKAH_BUNDEL.every((l) => l.judul.length <= 26 && KATA_PENDEK(l.judul)), "mind-map: judul langkah pendek, tiap kata paling banyak dua belas huruf (muat di 344 px)");
  const URUT = ["satu", "dua", "tiga", "empat", "lima", "enam"];
  cek(DK.LANGKAH_BUNDEL.every((l, i) => l.arti.startsWith(`Langkah ${URUT[i]}.`)), "mind-map: arti dibacakan berurut");
  for (const m of ["urai", "tiap angka", "kolom", "jumlah", "tukar", "sepuluh bundel", "kolom sebelah kirinya", "banyak cara", "tidak berubah", "susun kembali", "isi nol", "bentuk biasa"]) cek(arti.toLowerCase().includes(m), `mind-map: memuat ${m}`);
  cek(judulSemua.includes("Urai") && judulSemua.includes("Tukar") && judulSemua.includes("Banyak susunan") && judulSemua.includes("Susun") && judulSemua.includes("nol"), "mind-map: langkah urai, tukar, banyak susunan, dan susun dengan nol");
  const TEMA_IKON = [0x1f4e6, 0x1f501, 0x1f500, 0x1f4dd, 0x1f3ab];
  cek(DK.LANGKAH_BUNDEL.every((l) => emojiSah(l.ikon)) && new Set(DK.LANGKAH_BUNDEL.map((l) => l.ikon)).size === n && emojiSah(DK.IKON_JUDUL_PETA_BUNDEL), "mind-map: ikon berbeda, emoji sah");
  cek(DK.LANGKAH_BUNDEL.every((l) => TEMA_IKON.includes(l.ikon.codePointAt(0))) && TEMA_IKON.includes(DK.IKON_JUDUL_PETA_BUNDEL.codePointAt(0)), "mind-map: ikon hanya benda tema gudang tiket");

  /* Infografis kartu 1: data bersambung dari Sub-Bab A dan B. */
  sama([DK.UTARA, DK.BARAT, DK.TRIBUN_INFO.map((t) => t.nama)], [24350, 30402, ["Utara", "Barat"]], "infografis: kontrak data Tribun Utara dan Tribun Barat");
  sama(DK.KOLOM_INFO_BUNDEL, ["Bundel", "Utara", "Barat"], "infografis: judul kolom tampil");
  for (const [t, nn] of [[0, 24350], [1, 30402]]) {
    sama([0, 1, 2, 3, 4].map((k) => DK.banyakInfo(t, k)), digitTeks(nn), `infografis tribun ${t}: banyak bundel dari digit teks`);
    sama([0, 1, 2, 3, 4].map((k) => DK.tiketInfo(t, k)), digitTeks(nn).map((c, i) => c * BOBOT[i]), `infografis tribun ${t}: tiket tiap kolom`);
    sama(DK.jumlahInfo(t), nn, `infografis tribun ${t}: jumlah`);
    sama([0, 1, 2, 3, 4].reduce((a, k) => a + DK.tiketInfo(t, k), 0), nn, `infografis tribun ${t}: uraian menjumlah ke bilangan`);
    for (let k = 0; k < 5; k += 1) {
      const su = DK.suaraBundel(t, k);
      cek(su.length > 10 && tanpaDigit(su) && bersih(su) && !BUKAN_C.test(su), `infografis tribun ${t} kolom ${k}: suara tanpa digit (${su})`);
    }
    const sj = DK.suaraJumlahInfo(t);
    cek(tanpaDigit(sj) && sj.includes("ditambah") && sj.includes("sama dengan") && bersih(sj), `infografis tribun ${t}: suara jumlah memuat uraian`);
  }
  cek(DK.suaraBundel(0, 0) === "Tribun Utara memakai dua kardus, yaitu dua puluh ribu tiket." && DK.suaraBundel(0, 4) === "Tribun Utara tidak memakai lembar sama sekali, jadi kolom satuan berisi nol." && /kolom ribuan berisi nol/.test(DK.suaraBundel(1, 1)) && /kolom puluhan berisi nol/.test(DK.suaraBundel(1, 3)), "infografis: suara sel mengeja bilangan dan menyebut nol penjaga");
  cek(DK.suaraJumlahInfo(0) === "Uraian Tribun Utara: dua puluh ribu ditambah empat ribu ditambah tiga ratus ditambah lima puluh sama dengan dua puluh empat ribu tiga ratus lima puluh." && /tiga puluh ribu ditambah empat ratus ditambah dua sama dengan tiga puluh ribu empat ratus dua/.test(DK.suaraJumlahInfo(1)), "infografis: suara jumlah mengeja uraian dan jumlahnya");
  cek(DK.banyakInfo(1, 1) === 0 && DK.banyakInfo(1, 3) === 0 && DK.banyakInfo(0, 4) === 0, "infografis: nol penjaga muncul pada data (ribuan dan puluhan Barat, satuan Utara)");
  cek([DK.PETUNJUK1_INFO_BUNDEL, DK.SELESAI1_INFO_BUNDEL, DK.PETUNJUK2_INFO_BUNDEL, DK.SELESAI2_INFO_BUNDEL].every((t) => tanpaDigit(t) && bersih(t) && !BUKAN_C.test(t)), "infografis: petunjuk dan pesan tanpa digit dan istilah Sub-Bab lain");
  /* Infografis kartu 2: tukar dan susun, jumlah tetap. */
  const br = DK.BARIS_TUKAR_INFO;
  cek(br.length === 5 && DK.KOLOM_INFO_TUKAR.length === 3, "infografis kartu 2: lima baris, tiga judul kolom");
  sama(br.slice(0, 4).map((b) => b.jumlah), [24350, 24350, 24350, 24350], "infografis kartu 2: semua cara menyusun Tribun Utara berjumlah sama");
  sama(br.slice(0, 4).map((b) => bacaSusunan(b.susunan)).map(jumlahS), [24350, 24350, 24350, 24350], "infografis kartu 2: susunan dihitung ulang dari teks");
  sama(br.map((b) => b.susunan), ["2 kardus, 4 dus, 3 pak, 5 ikat", "2 kardus, 3 dus, 13 pak, 5 ikat", "24 dus, 3 pak, 5 ikat", "243 pak, 5 ikat", "30.000 + 400 + 2"], "infografis kartu 2: teks susunan");
  sama([br[4].jumlah, bacaUraian(br[4].susunan)], [30402, 30402], "infografis kartu 2: uraian Tribun Barat disusun kembali menjadi bilangan");
  cek(new Set(br.map((b) => b.susunan)).size === 5 && br.every((b) => b.label.length <= 14 && KATA_PENDEK(b.label) && bersih(b.label)), "infografis kartu 2: susunan berbeda, label pendek");
  for (const b of br) {
    cek(b.suaraSusunan.length > 10 && b.suaraJumlah.length > 10 && tanpaDigit(b.suaraSusunan) && tanpaDigit(b.suaraJumlah) && bersih(b.suaraSusunan + b.suaraJumlah) && !BUKAN_C.test(b.suaraSusunan + b.suaraJumlah), `infografis kartu 2 ${b.label}: suara tanpa digit`);
  }
  cek(/dua puluh empat ribu tiga ratus lima puluh/.test(br[0].suaraJumlah) && /tidak mengubah jumlah/.test(br[1].suaraJumlah) && /ditukar sepuluh pak/.test(br[1].suaraSusunan) && /dua ratus empat puluh tiga pak/.test(br[3].suaraSusunan), "infografis kartu 2: suara menyebut tukar sepuluh, banyak cara, dan jumlah tetap");
  cek(/ribuan dan puluhan kosong/.test(br[4].suaraJumlah) && /diisi nol/.test(br[4].suaraJumlah) && /tiga puluh ribu empat ratus dua/.test(br[4].suaraJumlah), "infografis kartu 2: kembali ke bentuk biasa dengan nol penjaga");
  // Infografis memuat semua topik inti Sub-Bab C: uraian, tukar sepuluh, banyak cara, kembali dengan nol.
  const semuaSuara = [...br.map((b) => b.suaraSusunan + b.suaraJumlah), DK.suaraJumlahInfo(0), DK.suaraBundel(1, 1)].join(" ").toLowerCase();
  for (const m of ["uraian", "ditukar sepuluh", "tidak mengubah jumlah", "dua ratus empat puluh tiga pak", "diisi nol", "kolom ribuan berisi nol"]) cek(semuaSuara.includes(m), `infografis: memuat topik inti "${m}"`);
}

/* ------------------------------ CPA: tiga tahap ------------------------------ */
const TAHAP = [
  ["Concrete", D.CONCRETE, "benda"],
  ["Pictorial", D.PICTORIAL, "diagram"],
  ["Abstract", D.ABSTRACT, "lambang"],
];
{
  cek(D.CONCRETE_BUNDEL === D.CONCRETE && D.PICTORIAL_BUNDEL === D.PICTORIAL && D.ABSTRACT_BUNDEL === D.ABSTRACT, "nama ekspor untuk pemasang");
  cek(D.TEMA_BUNDEL.concrete.nama === "Concrete" && D.TEMA_BUNDEL.pictorial.nama === "Pictorial" && D.TEMA_BUNDEL.abstract.nama === "Abstract", "tema tiga tahap");
  sama(D.CONCRETE.map((s) => s.nomor), [2, 3, 4], "nomor misi Concrete lanjut dari simulasi");
  sama(D.PICTORIAL.map((s) => s.nomor), [5, 6, 7], "nomor misi Pictorial");
  sama(D.ABSTRACT.map((s) => s.nomor), [8, 9, 10], "nomor misi Abstract");
  sama([LC.kataBil(0), LC.kataBil(30402), LC.kataBil(100), LC.ucapkan("24.350 tiket dan 20.000 + 4.000 = 24.000")], ["nol", "tiga puluh ribu empat ratus dua", "seratus", "dua puluh empat ribu tiga ratus lima puluh tiket dan dua puluh ribu ditambah empat ribu sama dengan dua puluh empat ribu"], "kata bilangan dan ucapan CPA");
  // Jawaban dihitung ulang dari data dengan cara lain (digit dari teks), tanpa memakai fungsi kunci.
  const hitung = (d, cara) => {
    switch (d.tipe) {
      case "igil":
        return cara === "klik" ? `${titik(BOBOT[d.j])} ${d.satuan}` : cara === "kanvas" ? digitTeks(d.n)[d.j] : NAMA[d.j];
      case "urai":
        return cara === "klik" ? uraianTeks(d.n) : cara === "kanvas" ? digitTeks(d.n)[d.j] : NAMA[digitTeks(d.n).indexOf(0)];
      case "tukar": {
        const s = [...d.s];
        if (d.arah === "turun") {
          s[d.i] -= 1;
          s[d.i + 1] += 10;
        } else {
          s[d.i] += 1;
          s[d.i + 1] -= 10;
        }
        return cara === "klik" ? susunanTeks(s) : cara === "kanvas" ? (d.arah === "turun" ? s[d.i] : s[d.i + 1]) : NAMA[d.arah === "turun" ? d.i + 1 : d.i];
      }
      case "susun":
        return cara === "klik" ? titik(d.n) : cara === "kanvas" ? digitTeks(d.n).filter((c) => c === 0).length : TEMPAT[digitTeks(d.n).indexOf(0)];
    }
  };
  const semuaData = [];
  for (const [nama, soal, rupa] of TAHAP) {
    sama(soal.map((s) => s.cara), ["klik", "kanvas", "suara"], `${nama}: tiga cara menjawab`);
    const kanvas = [];
    let adaSalah = 0;
    const posisiKlik = new Set();
    for (const s of soal) {
      cek(s.langkah.length === 4 && s.langkah.map((q) => q.metode).join() === "igil,urai,tukar,susun", `${nama} misi ${s.nomor}: empat metode IGIL, Break It Apart, Swap Bundles, Build It Back`);
      cek(bersih(s.judul) && bersih(s.cerita) && tanpaDigit(s.cerita) && !BUKAN_C.test(s.judul + s.cerita), `${nama} misi ${s.nomor}: judul dan cerita bersih`);
      cek(s.judul.startsWith(`Misi Bundel ${s.nomor}:`), `${nama} misi ${s.nomor}: judul berawalan Misi Bundel`);
      for (const q of s.langkah) {
        const l = q.langkah;
        const d = LC.dasarDari(l);
        const kunci = LC.kunciJawab(l, s.cara);
        cek(kunci !== null, `${nama} misi ${s.nomor} ${q.metode}: ada jawaban untuk cara ${s.cara}`);
        cek(LC.siapLangsung(l, rupa, s.cara) === (l.tipe !== "salah"), `${nama} misi ${s.nomor} ${q.metode}: siap langsung kecuali Cari kesalahan`);
        cek(q.suara === q.judul && tanpaDigit(q.suara) && bersih(q.suara) && !BUKAN_C.test(q.suara), `${nama} misi ${s.nomor} ${q.metode}: instruksi tanpa digit, kata terlarang, dan istilah Sub-Bab lain`);
        cek(emojiSah(q.suara) && emojiSah(q.judul), `${nama} misi ${s.nomor}: emoji sah`);
        if (rupa === "lambang") cek(!GAMBAR.test(q.suara), `${nama} misi ${s.nomor} ${q.metode}: tahap Abstract tanpa menyebut gambar, petak, atau kisi`);
        cek(d.tipe === q.metode, `${nama} misi ${s.nomor}: metode ${q.metode} memakai tugas ${q.metode}`);
        semuaData.push([nama, s.nomor, q.metode, d]);
        // Data sah.
        const bil = d.tipe === "tukar" ? jumlahS(d.s) : d.n;
        cek(bil >= 10000 && bil <= 99999 && !BILANGAN_STORY.includes(bil), `${nama} misi ${s.nomor} ${q.metode}: bilangan lima angka, bukan bilangan Story atau Infografis (${bil})`);
        cek(bersih(d.satuan) && ["tiket", "kupon", "stiker", "bendera"].includes(d.satuan), `${nama} misi ${s.nomor} ${q.metode}: satuan tertulis (${d.satuan})`);
        if (d.tipe === "tukar") {
          cek(d.s.length === 5 && d.s.every((c) => c >= 0 && c <= 20) && (d.arah === "turun" ? d.s[d.i] >= 1 : d.s[d.i + 1] >= 10), `${nama} misi ${s.nomor}: tukar mungkin dilakukan dan muat satu baris`);
          cek(d.i >= 0 && d.i <= 3, `${nama} misi ${s.nomor}: pasangan kolom sah`);
        } else cek(G.bentukBiasa(G.susunanDari(d.n)) && d.n === jumlahS(digitTeks(d.n)), `${nama} misi ${s.nomor} ${q.metode}: bilangan lima kolom`);
        // Jawaban dihitung dari data.
        const h = hitung(d, s.cara);
        sama(kunci, typeof h === "number" ? { jenis: "angka", n: h } : { jenis: "nama", nama: h }, `${nama} ${d.tipe} cara ${s.cara}: jawaban benar dihitung dari data`);
        // Syarat data tiap jenis tugas.
        if (d.tipe === "urai" && s.cara === "suara") cek(G.banyakNol(d.n) === 1 && G.kolomNol(d.n)[0] >= 1, `${nama} misi ${s.nomor}: tepat satu kolom nol (bukan kolom paling kiri)`);
        if (d.tipe === "susun" && s.cara === "suara") cek(G.banyakNol(d.n) === 1, `${nama} misi ${s.nomor}: tepat satu kolom yang diisi nol`);
        if (d.tipe === "susun") cek(G.banyakNol(d.n) >= 1, `${nama} misi ${s.nomor}: susun memuat nol penjaga`);
        if (d.tipe === "urai" && s.cara === "kanvas") cek(digitTeks(d.n)[d.j] >= 1, `${nama} misi ${s.nomor}: urai kanvas bertanya kolom yang bukan nol`);
        if (d.tipe === "igil" && s.cara === "kanvas") cek(digitTeks(d.n)[d.j] >= 1, `${nama} misi ${s.nomor}: igil kanvas bertanya kolom yang ada bundelnya`);
        if (d.tipe === "tukar" && s.cara === "kanvas") cek(Number(hitung(d, "kanvas")) >= 1 && Number(hitung(d, "kanvas")) <= 9, `${nama} misi ${s.nomor}: tukar kanvas satu digit`);
        // Pilihan klik.
        if (s.cara === "klik") {
          const pk = LC.pilihanKlik(l);
          cek(pk.length === 3 && new Set(pk).size === 3, `${nama} misi ${s.nomor} ${q.metode}: tiga pilihan klik berbeda (${pk.join(" | ")})`);
          cek(pk.includes(kunci.nama) && pk[0] !== kunci.nama, `${nama} misi ${s.nomor} ${q.metode}: jawaban benar ada dan tidak di tombol pertama`);
          cek(LC.teksKunciKlik(l) === kunci.nama, `${nama} misi ${s.nomor} ${q.metode}: teks jawaban klik`);
          posisiKlik.add(pk.indexOf(kunci.nama));
          if (l.tipe === "salah") cek(pk.includes(l.jawabTokoh), `${nama} misi ${s.nomor}: jawaban tokoh ada di pilihan`);
          cek(pk.every((x) => emojiSah(x) && bersih(x) && !BUKAN_C.test(x) && KATA_PENDEK(x) && x.length <= 42), `${nama} misi ${s.nomor} ${q.metode}: pilihan bersih dan pendek`);
          // Hanya jawaban benar yang cocok dengan data, dihitung ulang dari teks pilihan.
          if (d.tipe === "tukar") {
            const asal = jumlahS(d.s);
            sama(pk.map((x) => jumlahS(bacaSusunan(x)) === asal), pk.map((x) => x === kunci.nama), `${nama} misi ${s.nomor}: hanya susunan benar yang jumlahnya tetap`);
            cek(pk.every((x) => bacaSusunan(x).every((c) => c >= 0 && c <= 20)), `${nama} misi ${s.nomor}: pilihan tukar muat satu baris`);
          }
          if (d.tipe === "urai") sama(pk.map((x) => bacaUraian(x) === d.n), pk.map((x) => x === kunci.nama), `${nama} misi ${s.nomor}: hanya uraian benar yang berjumlah sama dengan bilangan`);
          if (d.tipe === "susun") sama(pk.map((x) => bacaBilangan(x) === d.n), pk.map((x) => x === kunci.nama), `${nama} misi ${s.nomor}: hanya bilangan benar yang sama dengan uraian`);
          if (d.tipe === "igil") sama(pk.map((x) => x.startsWith(titik(BOBOT[d.j]) + " ")), pk.map((x) => x === kunci.nama), `${nama} misi ${s.nomor}: hanya isi bundel benar`);
        }
        if (s.cara === "suara") {
          const pk = LC.pilihanSuara(l, s.cara);
          const teksBenar = LC.teksKunciPilihan(kunci);
          cek(pk.length === 3 && new Set(pk).size === 3 && pk.includes(teksBenar) && pk[0] !== teksBenar, `${nama} misi ${s.nomor} ${q.metode}: pilihan ketuk cadangan suara (${pk.join(" | ")})`);
          cek(K.cocokUcapan(teksBenar, kunci).cocok, `${nama} misi ${s.nomor}: pengenal ucapan mengenali jawaban`);
          cek(tanpaDigit(pk.join(" ")), `${nama} misi ${s.nomor}: pilihan suara tanpa digit`);
          cek(pk.filter((x) => x !== teksBenar).every((x) => !K.cocokUcapan(x, kunci).cocok), `${nama} misi ${s.nomor}: pilihan salah tidak dikenali sebagai jawaban benar`);
          cek(pk.every((x) => K.kataDariUcapan(x).includes(x)), `${nama} misi ${s.nomor}: semua pilihan suara dikenali pengenal ucapan`);
          cek(pk.every((x) => NAMA.includes(x)) || pk.every((x) => TEMPAT.includes(x)), `${nama} misi ${s.nomor}: pilihan suara satu keluarga (nama bundel atau nama kolom)`);
        }
        if (s.cara === "kanvas") {
          cek(kunci.jenis === "angka" && kunci.n >= 1 && kunci.n <= 9, `${nama} misi ${s.nomor} ${q.metode}: kanvas satu angka satu sampai sembilan (${kunci.n})`);
          kanvas.push(kunci.n);
          cek(LC.pilihanSuara(l, s.cara).length === 0, `${nama} misi ${s.nomor}: kanvas tanpa pilihan suara`);
        }
        // Kalimat benar diawali huruf kapital dan tanpa spasi sebelum tanda baca.
        const kk = LC.kalimatKunci(l, s.cara);
        cek(/^[A-Z]/.test(kk) && !/ [.,:;!?]/.test(kk) && /[.]$/.test(kk) && bersih(kk) && !BUKAN_C.test(kk), `${nama} misi ${s.nomor} ${q.metode}: kalimat pembenaran (${kk})`);
        cek(tanpaDigit(LC.ucapkan(kk)), `${nama} misi ${s.nomor} ${q.metode}: kalimat pembenaran dieja tanpa digit`);
        const pet = LC.petunjukSalah(l, s.cara, "x");
        if (rupa === "lambang") cek(!GAMBAR.test(kk + pet), `${nama} misi ${s.nomor} ${q.metode}: umpan balik Abstract tanpa menyebut gambar, petak, atau kisi`);
        cek(pet.length > 15 && bersih(pet) && tanpaDigit(pet) && !BUKAN_C.test(pet), `${nama} misi ${s.nomor} ${q.metode}: petunjuk salah tanpa digit`);
        if (l.tipe !== "salah") {
          const bocor = kunci.jenis === "angka" ? new RegExp(`\\b${kunci.n}\\b|\\b${LC.kataBil(kunci.n)}\\b`) : new RegExp(`\\b${kunci.nama}\\b`);
          cek(!bocor.test(pet), `${nama} misi ${s.nomor} ${q.metode}: petunjuk tidak menyebut jawaban (${pet})`);
        }
        const kt = LC.kalimatTanya(l, s.cara);
        cek(bersih(kt) && tanpaDigit(kt) && kt.endsWith("?"), `${nama} misi ${s.nomor} ${q.metode}: pertanyaan tanpa digit`);
        // Tampilan: bundel digambar sungguh dari data.
        if (rupa !== "lambang") {
          const tp = LC.tampilan(d, s.cara, rupa);
          const dasarS = d.tipe === "tukar" ? d.s : digitTeks(d.n);
          sama(tp.s, dasarS, `${nama} misi ${s.nomor} ${q.metode}: susunan yang digambar sama dengan data`);
          cek(tp.judul.length <= 38 && bersih(tp.judul) && tanpaDigit(tp.judul.replace(/[\d.+ ]/g, "")) && emojiSah(tp.judul), `${nama} misi ${s.nomor} ${q.metode}: judul gambar pendek (${tp.judul})`);
          cek(tp.tandai.every((i) => i >= 0 && i < 5) && (tp.legenda === "tampil" || tp.legenda === "nama"), `${nama} misi ${s.nomor} ${q.metode}: baris yang disorot sah`);
          if (d.tipe === "igil") cek(tp.legenda === "nama", `${nama} misi ${s.nomor}: igil tidak menulis isi bundel (jawaban klik dan suara)`);
          if (rupa === "diagram") cek(!/[\u{1F300}-\u{1FAFF}]/u.test(JSON.stringify(tp)), `${nama} misi ${s.nomor} ${q.metode}: bagan polos tanpa emoji`);
        }
        // Kartu data Abstract memuat data yang cukup untuk menjawab, dan menyisakan satu hal yang ditanyakan.
        if (rupa === "lambang") {
          const baris = LC.barisKartu(d, s.cara);
          cek(baris.length >= 2 && baris.every((x) => bersih(x) && !GAMBAR.test(x) && emojiSah(x) && !BUKAN_C.test(x)), `${nama} misi ${s.nomor} ${q.metode}: kartu data bersih`);
          cek(baris.filter((x) => x.includes("?")).length === 1, `${nama} misi ${s.nomor} ${q.metode}: kartu data menyisakan satu hal yang ditanyakan`);
          if (d.tipe === "susun") cek(baris[0] === `uraian: ${uraianTeks(d.n)}`, `${nama} misi ${s.nomor}: kartu susun memuat uraian dari data`);
          if (d.tipe === "urai") cek(baris[0] === `bilangan: ${titik(d.n)}`, `${nama} misi ${s.nomor}: kartu urai memuat bilangan dari data`);
          if (d.tipe === "tukar") cek(baris[0] === `susunan: ${susunanTeks(d.s)}`, `${nama} misi ${s.nomor}: kartu tukar memuat susunan dari data`);
          if (d.tipe === "igil" && s.cara === "kanvas") cek(baris[0] === `bilangan: ${titik(d.n)}`, `${nama} misi ${s.nomor}: kartu igil kanvas memuat bilangan`);
        }
        if (l.tipe === "salah") {
          adaSalah += 1;
          const w = l;
          cek(w.alasan.length === 3 && new Set(w.alasan).size === 3 && w.benar >= 0 && w.benar <= 2, `${nama}: tiga alasan berbeda, satu benar`);
          cek(w.alasan.every((a2) => /^[A-Z]/.test(a2) && !/ [.,:;!?]/.test(a2) && bersih(a2) && !BUKAN_C.test(a2) && tanpaDigit(a2)), `${nama}: alasan diawali huruf kapital, tanpa digit dan kata terlarang`);
          cek(/^[A-Z]/.test(w.keliru) && bersih(w.keliru) && /^[A-Z]/.test(w.kataTokoh) && bersih(w.kataTokoh) && tanpaDigit(w.kataTokoh) && !BUKAN_C.test(w.kataTokoh + w.keliru), `${nama}: kalimat tokoh dan penjelasan berhuruf kapital`);
          cek(["Bima", "Citra", "Fajar"].includes(w.tokoh) && w.alasan[w.benar].startsWith(w.tokoh) && /keliru|benar/.test(w.alasan[w.benar]), `${nama}: alasan benar menyebut tokoh`);
          cek(w.alasan.every((a2) => !new RegExp(`\\b${kunci.nama.replace(/[.+]/g, "\\$&")}\\b`).test(a2)), `${nama}: alasan tidak membocorkan jawaban benar (${kunci.nama})`);
          cek(LC.petunjukSalah(w, "klik", w.jawabTokoh).startsWith(`Itu jawaban ${w.tokoh}`), `${nama}: pilih jawaban tokoh mendapat petunjuk tokoh`);
          cek(w.betul === true ? w.jawabTokoh === kunci.nama : w.jawabTokoh !== kunci.nama, `${nama}: jawaban tokoh ${w.betul ? "benar" : "keliru"} sesuai jawaban`);
          cek(["urai", "tukar", "susun"].includes(q.metode), `${nama}: Cari kesalahan memakai metode Break It Apart, Swap Bundles, atau Build It Back`);
          const awal = w.alasan.map((a2) => a2.split(",")[0]);
          cek(new Set(awal).size === 1 && /^(Bima|Citra|Fajar) (keliru|benar)$/.test(awal[0]), `${nama}: tiga alasan berawalan sama (${awal.join(" | ")})`);
        }
      }
    }
    sama(new Set(kanvas).size, 4, `${nama}: empat angka kanvas tidak kembar (${kanvas.join(",")})`);
    cek(adaSalah === 1, `${nama}: tepat satu Cari kesalahan`);
    cek(posisiKlik.size >= 2, `${nama}: posisi jawaban benar bervariasi`);
    sama(soal.reduce((n, s) => n + s.langkah.length, 0), 12, `${nama}: dua belas tugas`);
    const suaraNama = soal[2].langkah.map((q) => LC.kunciJawab(q.langkah, "suara").nama);
    cek(new Set(suaraNama).size === 4, `${nama}: empat jawaban suara tidak kembar (${suaraNama.join(",")})`);
  }
  // Tidak ada dua tugas yang sama persis dalam seluruh bab ini, dan berbeda dari data Story, Infografis, dan Simulasi.
  const sidik = semuaData.map(([, , , d]) => JSON.stringify(d.tipe === "tukar" ? [d.s, d.i, d.arah] : [d.n, d.j ?? 0]));
  cek(new Set(sidik).size === sidik.length, "tidak ada dua tugas yang memakai data sama persis");
  const bilanganCpa = semuaData.map(([, , , d]) => (d.tipe === "tukar" ? jumlahS(d.s) : d.n));
  const bilanganSim = [...DS.TARGET_URAI, ...DS.TARGET_SUSUN, ...DS.TARGET_SAMA.map((x) => x.n), ...DS.TARGET_TUKAR.map((x) => jumlahS(x.s))];
  cek(bilanganCpa.every((n) => !bilanganSim.includes(n)), "data CPA berbeda dari data Simulasi");
  cek(semuaData.every(([, , , d]) => (d.tipe === "tukar" ? !d.s.every((c, i) => c === digitTeks(24350)[i] || c === digitTeks(30402)[i]) : d.n !== 24350 && d.n !== 30402)), "data CPA berbeda dari Story dan Infografis");
  for (const [nama, soal] of TAHAP) for (const s of soal) for (const q of s.langkah) cek(!/\b(Raka|Salsa|Bima Satria|Pak Joko|Helen|Tiara|Slamet|pizza|Bu Wulan|Pak Joyo|batik|angklung|Bu Ratri|Pak Gunawan|Bu Sinta|Pak Anto|kolam|ember|ubin|Bu Dewi|Pak Rudi|keramik|Karel|Azizah|Bu Rini|Pak Dodi|bazar|Satria|Laras|Genta|Asep|Nisa|Dienes|Bu Ningsih|Pak Hasto|Pak Darmo)\b/i.test(q.suara + s.cerita + s.judul), `${nama}: tanpa tokoh atau benda lama`);
  // Seed alur.
  const salahDi = (soal) => soal.flatMap((s) => s.langkah.map((q) => q.langkah)).find((l) => l.tipe === "salah");
  const sc = salahDi(D.CONCRETE);
  cek(sc.tokoh === "Fajar" && !sc.betul && sc.dasar.tipe === "urai" && sc.dasar.n === 40205 && sc.jawabTokoh === "40.000 + 200 + 50" && bacaUraian(sc.jawabTokoh) !== 40205, "seed Concrete: Fajar menguraikan 40.205 menjadi 40.000 + 200 + 50 (lima di puluhan)");
  const sp = salahDi(D.PICTORIAL);
  cek(sp.tokoh === "Bima" && sp.betul === true && sp.dasar.tipe === "tukar" && sp.dasar.arah === "naik" && sp.jawabTokoh === susunanTeks(LC.susunanBaru(sp.dasar)) && jumlahS(bacaSusunan(sp.jawabTokoh)) === jumlahS(sp.dasar.s), "seed Pictorial: Bima benar, sepuluh pak ditukar satu dus tanpa mengubah jumlah");
  const sa = salahDi(D.ABSTRACT);
  cek(sa.tokoh === "Fajar" && !sa.betul && sa.dasar.tipe === "susun" && sa.dasar.n === 80305 && sa.jawabTokoh === "8.305" && bacaBilangan(sa.jawabTokoh) !== 80305, "seed Abstract: Fajar menulis uraian 80.000 + 300 + 5 sebagai 8.305 (nol penjaga hilang)");
  sama([D.CONCRETE, D.PICTORIAL, D.ABSTRACT].map((t) => salahDi(t).benar), [0, 2, 1], "posisi alasan benar (indeks data) divariasikan antar tahap");
  sama([D.CONCRETE, D.PICTORIAL, D.ABSTRACT].map((t) => salahDi(t).posisi), [1, 0, 2], "posisi tampilan alasan benar: kedua, pertama, ketiga");
  // Metode dan arah beragam.
  const semuaTukar = semuaData.filter(([, , m]) => m === "tukar").map(([, , , d]) => d);
  cek(semuaTukar.some((d) => d.arah === "turun") && semuaTukar.some((d) => d.arah === "naik") && new Set(semuaTukar.map((d) => d.i)).size >= 3, "tukar beragam: arah turun dan naik, tiga pasangan kolom atau lebih");
  cek(new Set(semuaData.filter(([, , m]) => m === "igil").map(([, , , d]) => d.j)).size === 5, "igil: lima jenis bundel semuanya ditanyakan");
  cek(new Set(semuaData.map(([, , , d]) => d.satuan)).size >= 3, "satuan beragam");
  // Poin penting dan jembatan.
  cek(D.POIN_PENTING.length === 6 && D.POIN_PENTING_SUARA.length === 6 && D.POIN_PENTING_SUARA.every(tanpaDigit) && D.POIN_PENTING.every(bersih) && D.POIN_PENTING.every((p) => !BUKAN_C.test(p)), "poin penting: enam butir, suara tanpa digit, tanpa kata terlarang");
  cek(D.POIN_PENTING.every((p) => /^[A-Z]/.test(p) && !/ [,:;!?]/.test(p) && /\.$/.test(p)), "poin penting: huruf kapital dan tanpa spasi sebelum tanda baca");
  const ps = D.POIN_PENTING_SUARA.join(" ").toLowerCase();
  cek(/uraian/.test(ps) && /dua puluh empat ribu tiga ratus lima puluh sama dengan dua puluh ribu ditambah empat ribu ditambah tiga ratus ditambah lima puluh/.test(ps.replace("sama dengan dua puluh ribu", "sama dengan dua puluh ribu")) && /nol/.test(ps) && /sepuluh bundel/.test(ps) && /sebelah kirinya/.test(ps) && /tidak mengubah jumlah/.test(ps) && /banyak cara/.test(ps) && /isi nol/.test(ps), `poin penting: uraian, nol, tukar sepuluh, jumlah tetap, banyak cara, dan susun kembali diucapkan dengan kata: ${ps}`);
  cek(/Pak Darmo/.test(D.PENUTUP_C) && /papan jepit/.test(D.PENUTUP_C) && /pulpen/.test(D.PENUTUP_C) && /keempat tribun/.test(D.PENUTUP_C) && /kursi/.test(D.PENUTUP_C) && /menjumlahkan/.test(D.PENUTUP_C) && tanpaDigit(D.PENUTUP_C) && bersih(D.PENUTUP_C), "jembatan ke Sub-Bab D: Pak Darmo datang dengan papan jepit dan pulpen, ingin menjumlah penonton dan kursi kosong");
}

/* ------------------------------ Pengenal ucapan ------------------------------ */
{
  sama(K.kataDariUcapan("kardus"), ["kardus"], "ucapan: kardus saja (bukan dus)");
  sama(K.kataDariUcapan("dus"), ["dus"], "ucapan: dus");
  sama(K.kataDariUcapan("pak dan ikat"), ["pak", "ikat"], "ucapan: dua kata");
  sama(K.kataDariUcapan("bukan ribuan, ratusan"), ["ratusan"], "ucapan: bukan ribuan, ratusan");
  sama(K.kataDariUcapan("tidak lembar tapi satuan"), ["satuan"], "ucapan: kata yang didahului tidak diabaikan");
  cek(K.cocokUcapan("puluhan", { jenis: "nama", nama: "puluhan" }).cocok && !K.cocokUcapan("ratusan", { jenis: "nama", nama: "puluhan" }).cocok, "ucapan: cocok hanya bila sama");
  sama(K.angkaDariUcapan("lima dan 7"), [5, 7], "ucapan: angka dari kata dan digit");
  cek(K.cocokUcapan("delapan", { jenis: "angka", n: 8 }).cocok && !K.cocokUcapan("tujuh", { jenis: "angka", n: 8 }).cocok, "ucapan: angka delapan");
  cek(K.cocokUcapan("", { jenis: "nama", nama: "dus" }).terdengar.length === 0, "ucapan: sepi tidak terdengar apa pun");
  cek(EJ.ejaK5B1("24.350 + 6 = 24.356") === "dua puluh empat ribu tiga ratus lima puluh ditambah enam sama dengan dua puluh empat ribu tiga ratus lima puluh enam", "pengeja suara bab: bilangan lima angka dan tanda");
}

/* ------------------------------ Berkas folder ------------------------------ */
{
  const berkas = readdirSync(folder).filter((f) => /\.(ts|tsx)$/.test(f));
  for (const f of ["data.ts", "data-kartu.ts", "data-sim.ts", "logika.ts", "logika-cpa.ts", "logika-data.ts", "periksa.ts", "GambarBundel.tsx", "JawabBundel.tsx", "LangkahBundel.tsx", "TahapBundel.tsx", "PetaBundel.tsx", "InfoBundel.tsx", "SimulasiTukarBundel.tsx"]) cek(berkas.includes(f), `${f} ada`);
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folder), "utf8");
    cek(emojiSah(s) && !DILARANG.some((c) => [...s].some((x) => x.codePointAt(0) === c)) && !IKAN.some((c) => [...s].some((x) => x.codePointAt(0) === c)), `${f}: emoji paling tinggi U+1FA95, tanpa ZWJ, ikan, dan emoji yang tampil kosong`);
    cek(!/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}|\\u\{1FA74\}|\\u\{1F39F\}|\\u2602|\\u\{1FA9F\}|\\u\{1FAA3\}|\\u\{1F9CB\}/i.test(s), `${f}: kode emoji sah`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(!/nilai|kunci/i.test(s.replace(/[A-Za-z]*[Kk]unci[A-Za-z]*/g, "")), `${f}: tanpa kata nilai dan tanpa kata kunci di teks`);
    cek(!/senilai/i.test(s), `${f}: tanpa kata senilai`);
    cek(!/jajanan-k4b6a|bazar-k4b6b|etalase-k4b5|mosaik-k4b5|ubin-k4b4|ember-k4b4|angklung|batik|keramik/i.test(s), `${f}: tidak merujuk bab lain`);
    cek(!/tribun-k5b1a|urutan-k5b1b|hitung-k5b1d|KeadaanTribun|KeadaanUrutan|KeadaanHitung/.test(s), `${f}: tanpa folder Sub-Bab lain`);
    const impor = [...s.matchAll(/from "([^"]+)"/g)].map((m) => m[1]);
    cek(impor.every((i) => !/SubBabK5B1|kit-k5b1|infografis-k5b1|skenario-k5b1|mesin-data-k5b1|lab-|SimulasiLab|model-(banding|operasi|susun|tempat)-k5b1|data-k5b1|naskah-k5b1|diagram-k5b1|bantu-k5b1|peta-label\/PetaLabel|peta-label\/InfoKartu/.test(i)), `${f}: tidak mengimpor berkas lama Bab 1, PetaLabel, InfoKartu, atau folder Sub-Bab lain`);
  }
  const gambar = readFileSync(new URL("GambarBundel.tsx", folder), "utf8");
  cek(/tataBundel/.test(gambar) && /PapanBundel/.test(gambar) && /KOLOM\[/.test(gambar), "gambar memakai logika bundel murni yang diuji (bundel digambar dari data)");
  cek(!/flex-wrap/.test(gambar) && !/<img/.test(gambar), "gambar tanpa flex-wrap");
  cek(!berkas.some((f) => /capitalize/.test(readFileSync(new URL(f, folder), "utf8"))), "tanpa CSS capitalize");
  const lang = readFileSync(new URL("LangkahBundel.tsx", folder), "utf8");
  cek(/Pikirkan lagi apa yang \$\{l\.tokoh\} lakukan/.test(lang) && !/Lihat lagi\. \$\{l\.keliru\}|belum tepat\. \$\{l\.keliru\}/.test(lang), "Cari kesalahan: salah memilih keputusan atau alasan hanya mengarahkan, tidak membocorkan");
  const sim = readFileSync(new URL("SimulasiTukarBundel.tsx", folder), "utf8");
  cek(/setCatatan\(ucap \?\? ""\)/.test(sim) && /PapanBundel/.test(sim) && /grid grid-cols-2 gap-2/.test(sim) && !/flex-wrap/.test(sim), "simulasi: pesan lama dikosongkan, empat alat dalam grid dua kali dua, bundel digambar dari data");
  cek(/grid-cols-5/.test(sim) && /Kurangi \$\{kol\.bundel\}/.test(sim) && /Tambah \$\{kol\.bundel\}/.test(sim), "simulasi: lima kolom tombol tambah dan kurang dengan nama di baris sendiri (tidak terjepit)");
  const mm = readFileSync(new URL("PetaBundel.tsx", folder), "utf8");
  cek(/export default function PetaBundel/.test(mm) && /export \{ PetaBundel \}/.test(mm) && !/PetaLabel|PetaKartu/.test(mm) && !/flex-wrap/.test(mm) && /grid-cols-\[/.test(mm) && /speakGuru/.test(mm) && /LANGKAH_BUNDEL/.test(mm), "Mind-map: komponen sendiri (rak gudang), kisi tetap, label kosong diketuk dibacakan Guru");
  const dl = readFileSync(new URL("InfoBundel.tsx", folder), "utf8");
  cek(/export default function InfoBundel/.test(dl) && /export \{ InfoBundel \}/.test(dl) && !/InfoKartu|InfografisKartu/.test(dl) && !/flex-wrap/.test(dl) && /grid-cols-\[/.test(dl) && /Kartu \{kartu\} dari 2/.test(dl) && /IkonBundel/.test(dl), "Infografis: komponen sendiri (papan rak bundel), dua kartu, kisi tetap");
  const th = readFileSync(new URL("TahapBundel.tsx", folder), "utf8");
  cek(/export default function TahapBundel/.test(th) && /poinPenting/.test(th) && /PENUTUP_C/.test(th) && !/flex-wrap/.test(th), "Tahap: ekspor default, Poin Penting dengan jembatan, kemajuan berupa kisi tetap");
  const sa2 = readFileSync(new URL("../SimulasiK5Bab1.tsx", folder), "utf8");
  cek(/misiDaftar: daftarMisiBundel\("C"\)/.test(sa2) && /SimulasiTukarBundel/.test(sa2) && /laporMisiBundel\(daftarMisiBundel\("C"\), k, a\.capai\)/.test(sa2), "SimulasiK5Bab1: Sub-Bab C memakai misiDaftar dan laporMisi");
  cek(MT.misiAwalK5Bab1("C").includes(DS.MISI_BUNDEL_TEKS), "misi awal Sub-Bab C memuat teks misi");
}

console.log(`Uji Bundel Tiket Kelas 5 Bab 1 C: ${lulus} lulus, ${gagal} gagal`);
process.exit(gagal ? 1 : 0);
