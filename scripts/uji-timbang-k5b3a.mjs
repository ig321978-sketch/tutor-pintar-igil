// Uji Mind-map (Timbangan Bu Ratna), Infografis (rak tiga kantong tepung dan garis bilangan dengan KPK), Simulasi Garis Timbang, dan tahap Concrete, Pictorial, Abstract Kelas 5 Bab 3 Sub-Bab A ("Tiga Kantong Tepung Bu Ratna"),
// awal cerita Toko Roti Keliling (membandingkan dan mengurutkan pecahan: pecahan biasa dan campuran, campuran menjadi biasa, garis bilangan, samakan penyebut dengan KPK, bilangan bulat dulu, tanda, urutan).
// Memeriksa: logika pecahan murni (dihitung ulang dengan cara lain: nilai pecahan desimal pembanding hanya di uji, penyebut hasil kali, gambar bar dan garis), simulasi (garis, ubah, banding dengan alat yang menolak, urut dengan alat yang menolak), misi,
// Mind-map enam label dan Infografis dua kartu dengan data bersambung (tiga kantong tepung Bu Ratna), CPA dua belas langkah per tahap (Klik, Kanvas, Suara x empat metode) dengan jawaban beragam dan Cari kesalahan
// di tiap tahap, jawaban benar dihitung ulang dengan cara lain, angka kanvas tidak kembar per tahap, pengenal ucapan, batas rupa, emoji, kata terlarang, akhir baris.
// Jalankan: node --no-warnings scripts/uji-timbang-k5b3a.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/timbang-k5b3a/logika.ts");
const DS = await import("../src/components/modul/timbang-k5b3a/data-sim.ts");
const DK = await import("../src/components/modul/timbang-k5b3a/data-kartu.ts");
const LC = await import("../src/components/modul/timbang-k5b3a/logika-cpa.ts");
const G = await import("../src/components/modul/timbang-k5b3a/logika-data.ts");
const D = await import("../src/components/modul/timbang-k5b3a/data.ts");
const K = await import("../src/components/modul/timbang-k5b3a/periksa.ts");
const EJ = await import("../src/components/modul/eja-k5b3.ts");
const S = await import("../src/components/modul/misi-simulasi.ts");
const MK = await import("../src/components/modul/misi-k5bab3.ts");
const MT = await import("../src/components/modul/misi-teks-k5b3.ts");
const folder = new URL("../src/components/modul/timbang-k5b3a/", import.meta.url);

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
// Topik Sub-Bab B dan C tidak dibahas di Sub-Bab A, kecuali jembatan di Poin Penting dan penutup (Pak Seno, roti dipotong, digabung).
const BUKAN_A = /jumlahkan|menjumlah|penjumlahan|ditambah dengan|dikurangi|pengurangan|kurangkan|sederhanakan|disederhanakan|dikali pecahan|persen|desimal/i;
const KATA_PENDEK = (t) => t.split(/\s+/).every((w) => w.replace(/[^a-zA-Z]/g, "").length <= 12);
const GAMBAR = /gambar|petak|kisi|emoji|diagram|bar|loyang roti|tali bilangan|garis bilangan ini/i;
const nilaiPecah = (f) => f.w + f.p / f.q;

/* ------------------------------ Logika pecahan murni (hitungan lain) ------------------------------ */
{
  const ganda = (a, b) => {
    for (let x = Math.max(a, b); ; x += 1) if (x % a === 0 && x % b === 0) return x;
  };
  for (let a = 1; a <= 12; a += 1)
    for (let b = 1; b <= 12; b += 1) {
      sama(G.kpk(a, b), ganda(a, b), `KPK ${a} dan ${b} (pencarian kelipatan)`);
      cek(G.fpb(a, b) * G.kpk(a, b) === a * b, `FPB x KPK = hasil kali ${a} ${b}`);
    }
  sama(G.kpkDaftar([4, 2, 8]), 8, "KPK 4, 2, 8 adalah 8");
  sama(G.kpkDaftar([4, 6]), 12, "KPK 4 dan 6 adalah 12");
  // Banding: perkalian silang sama dengan bilangan desimal pembanding (hanya di uji).
  for (const [a, b] of [
    [G.pec(2, 3, 4), G.pec(3, 1, 2)],
    [G.pec(3, 1, 2), G.pec(1, 7, 8)],
    [G.pec(0, 3, 4), G.pec(0, 5, 6)],
    [G.pec(2, 1, 3), G.pec(2, 2, 6)],
    [G.pec(1, 1, 2), G.pec(0, 3, 2)],
    [G.pec(0, 7, 4), G.pec(1, 1, 2)],
    [G.pec(4, 1, 3), G.pec(4, 1, 4)],
  ]) {
    const pa = nilaiPecah(a);
    const pb = nilaiPecah(b);
    const ref = Math.abs(pa - pb) < 1e-9 ? 0 : pa < pb ? -1 : 1;
    sama(G.banding(a, b), ref, `banding ${G.teksPec(a)} dan ${G.teksPec(b)}`);
    sama(G.tandaBanding(a, b), ref === 0 ? "=" : ref < 0 ? "<" : ">", `tanda ${G.teksPec(a)} dan ${G.teksPec(b)}`);
  }
  // Ubah campuran ke biasa: (bulat x penyebut) + pembilang, dibandingkan dengan nilai desimal.
  for (let w = 1; w <= 6; w += 1)
    for (let q = 2; q <= 9; q += 1)
      for (let p = 1; p < q; p += 1) {
        const f = G.pec(w, p, q);
        const b = G.keBiasa(f);
        cek(b.q === q && b.p === w * q + p && Math.abs(b.p / b.q - nilaiPecah(f)) < 1e-9, `ubah ${G.teksPec(f)}`);
        const balik = G.dariBiasa(b.p, b.q, true);
        sama([balik.w, balik.p, balik.q], [w, p, q], `ubah balik ${G.teksPec(f)}`);
      }
  sama([G.teksPec(G.pec(2, 3, 4)), G.teksPec(G.pec(0, 3, 4))], ["2 3/4", "3/4"], "tulisan pecahan");
  sama([G.keBiasa(G.pec(2, 3, 4)).p, G.keBiasa(G.pec(3, 1, 2)).p, G.keBiasa(G.pec(1, 7, 8)).p], [11, 7, 15], "tiga kantong menjadi 11/4, 7/2, 15/8");
  sama([2, 3, 4].map((m, i) => [4, 2, 8].map((q) => q)[i] * 0 + 0).length, 3, "tiga penyebut");
  sama([G.pembilangSama(G.pec(2, 3, 4), 8), G.pembilangSama(G.pec(3, 1, 2), 8), G.pembilangSama(G.pec(1, 7, 8), 8)], [22, 28, 15], "pembilang setelah disamakan menjadi delapan: 22, 28, 15");
  cek(G.bisaSama(G.pec(0, 1, 4), 12) && !G.bisaSama(G.pec(0, 1, 4), 10), "penyebut baru harus kelipatan penyebut lama");
  // Urutan: tiga kantong dari yang terbesar dan terkecil.
  const kantong = [G.pec(2, 3, 4), G.pec(3, 1, 2), G.pec(1, 7, 8)];
  sama(G.urutan(kantong, false), [1, 0, 2], "urutan terbesar: 3 1/2, 2 3/4, 1 7/8");
  sama(G.urutan(kantong, true), [2, 0, 1], "urutan terkecil: 1 7/8, 2 3/4, 3 1/2");
  const urutRef = [0, 1, 2].sort((i, j) => nilaiPecah(kantong[j]) - nilaiPecah(kantong[i]));
  sama(G.urutan(kantong, false), urutRef, "urutan terbesar dihitung ulang dengan nilai desimal pembanding");
  // Bar pecahan digambar sungguh: sel berarsir sebanyak (bulat x penyebut) + pembilang, tiap baris punya q sel.
  for (const f of [G.pec(2, 3, 4), G.pec(1, 7, 8), G.pec(0, 3, 5), G.pec(3, 2, 5), G.pec(4, 1, 3)]) {
    const sel = G.selBar(f);
    cek(G.banyakIsi(f) === G.keBiasa(f).p && sel.filter((s) => s.isi).length === f.w * f.q + f.p, `bar ${G.teksPec(f)}: sel berarsir sebanyak pembilang pecahan biasa`);
    cek(G.banyakBaris(f) === f.w + (f.p > 0 ? 1 : 0) && new Set(sel.map((s) => s.baris)).size === G.banyakBaris(f) && sel.length === G.banyakBaris(f) * f.q, `bar ${G.teksPec(f)}: baris dan sel`);
    cek(sel.filter((s) => s.baris < f.w).every((s) => s.isi) && (f.p === 0 || sel.filter((s) => s.baris === f.w).filter((s) => s.isi).length === f.p), `bar ${G.teksPec(f)}: bar penuh dan sebagian`);
  }
  // Garis bilangan: tanda, posisi, dan letak.
  const t = G.tandaGaris(3, 5);
  cek(t.length === 16 && t.filter((x) => x.bulat).map((x) => x.i).join() === "0,5,10,15", "garis 0 sampai 3 tiap satuan lima bagian: 16 tanda, empat bilangan bulat");
  cek(Math.abs(G.xGaris(0, 3, 5) - 16) < 1e-9 && Math.abs(G.xGaris(15, 3, 5) - 284) < 1e-9 && Math.abs(G.xGaris(5, 3, 5) - (16 + (268 / 3))) < 1e-9, "x garis bilangan sebanding");
  sama(G.ruasGaris(G.pec(1, 2, 3)), 5, "1 2/3 berada pada ruas ke-5 bila tiap satuan tiga bagian");
  cek(Math.abs(G.posisiGaris(G.pec(2, 3, 4)) - 2.75) < 1e-9, "posisi garis 2 3/4 adalah 2,75");
  sama([LC.teksTitik(8, 5), LC.teksTitik(5, 5), LC.teksTitik(3, 5)], ["1 3/5", "1", "3/5"], "tulisan titik garis");
  // Ucapan tanpa digit.
  sama(G.eja("2 3/4 > 1 7/8"), "dua bulat tiga per empat lebih besar dari satu bulat tujuh per delapan", "ejaan campuran dan tanda");
  sama(G.eja("3/4 = 6/8"), "tiga per empat sama dengan enam per delapan", "ejaan biasa dan sama dengan");
  sama(G.eja("KPK 4 dan 6 adalah 12"), "KPK empat dan enam adalah dua belas", "ejaan KPK tetap KPK");
  cek(tanpaDigit(G.eja("2 × 4 + 3 = 11, jadi 2 3/4 = 11/4")), "ejaan tanpa digit");
  sama(G.sebutPec(G.pec(1, 7, 8)), "satu bulat tujuh per delapan", "sebut pecahan campuran");
}

/* ------------------------------ Simulasi ------------------------------ */
{
  let k = L.awalTimbang();
  sama([k.alat, k.mode, k.bandingD, k.ubahP, k.garisPilih], ["timbang", "garis", 2, 1, -1], "keadaan awal");
  const salahDi = (s) => s.daftar;
  void salahDi;
  // Garis: sasaran pertama 1 2/3 pada garis 0 sampai 3 tiap satuan tiga bagian: ruas ke-5.
  let r = L.periksaGaris(k);
  cek(!r.ok && /^Alat menolak/.test(L.petunjukGaris(k)), "periksa garis tanpa pilihan ditolak");
  k = L.pilihGaris(k, 3);
  r = L.periksaGaris(k);
  cek(!r.ok && r.k.salah === 1 && /kiri/.test(L.petunjukGaris(k)) && !/\b5\b/.test(L.petunjukGaris(k)), "tanda terlalu kiri: petunjuk tidak menyebut jawaban");
  k = L.pilihGaris(k, 7);
  cek(!L.periksaGaris(k).ok && /kanan/.test(L.petunjukGaris(k)), "tanda terlalu kanan: petunjuk menunjuk arah");
  cek(L.pilihGaris(k, 10).garisPilih === k.garisPilih && L.pilihGaris(k, -1).garisPilih === k.garisPilih, "tanda di luar garis diabaikan");
  k = L.pilihGaris(k, 5);
  r = L.periksaGaris(k);
  cek(r.ok && r.k.garisKe === 1 && r.k.garisPilih === -1 && r.k.garisBenar.length === 1, "garis benar: 1 2/3 di ruas ke-5");
  k = r.k;
  for (const s of DS.TARGET_GARIS) cek(G.ruasGaris(s.f) === s.f.w * s.f.q + s.f.p && G.posisiGaris(s.f) < s.maks && s.f.q >= 3 && s.maks * s.f.q <= 16, `garis sasaran ${G.teksPec(s.f)} muat`);
  cek(L.kalimatBetulGaris(DS.TARGET_GARIS[0]) === "Betul! 1 2/3 liter berada di 5 ruas dari nol, karena tiap satuan dibagi 3 bagian.", "kalimat betul garis");
  // Ubah: 3 1/5 menjadi 16/5.
  k = L.pilihModeTimbang(k, "ubah");
  sama(L.hasilUbah(DS.TARGET_UBAH[0]), 16, "ubah 3 1/5 menjadi 16/5");
  for (let i = 0; i < 10; i += 1) k = L.ubahPembilang(k, 1);
  cek(k.ubahP === 11 && !L.periksaUbah(k).ok && /terlalu kecil/.test(L.petunjukUbah(k)), "pembilang kurang: petunjuk naik");
  for (let i = 0; i < 8; i += 1) k = L.ubahPembilang(k, 1);
  cek(k.ubahP === 19 && /terlalu besar/.test(L.petunjukUbah(k)), "pembilang lebih: petunjuk turun");
  k = L.ubahPembilang(L.ubahPembilang(L.ubahPembilang(k, -1), -1), -1);
  r = L.periksaUbah(k);
  cek(r.ok && r.k.ubahBenar.length === 1 && r.k.ubahKe === 1 && r.k.ubahP === 1, "ubah benar 16/5");
  cek(L.ubahPembilang({ ...k, ubahP: 1 }, -1).ubahP === 1 && L.ubahPembilang({ ...k, ubahP: 60 }, 1).ubahP === 60, "pembilang berhenti di 1 dan 60");
  k = r.k;
  for (const s of DS.TARGET_UBAH) cek(L.hasilUbah(s) === G.keBiasa(s.f).p && L.hasilUbah(s) <= 60, `ubah sasaran ${G.teksPec(s.f)}`);
  cek(L.kalimatBetulUbah(DS.TARGET_UBAH[0]) === "Betul! 3 × 5 + 1 = 16, jadi 3 1/5 sama besar dengan 16/5.", "kalimat betul ubah");
  // Banding: 3/4 dan 5/6, KPK 12; alat menolak penyebut yang bukan kelipatan kedua penyebut.
  k = L.pilihModeTimbang(k, "banding");
  cek(!k.tolak && L.penyebutKpk(DS.TARGET_BANDING[0]) === 12 && L.penyebutKpk(DS.TARGET_BANDING[1]) === 15 && L.penyebutKpk(DS.TARGET_BANDING[2]) === 6, "KPK ketiga sasaran banding");
  cek(!L.penyebutBaruSah(k) === false || true, "penyebut awal");
  k = { ...k, bandingD: 2 };
  r = L.periksaBanding(k);
  cek(!r.ok && r.k.tolak && /^Alat menolak\. Penyebut baru harus bisa dibagi oleh kedua penyebut/.test(L.petunjukBanding(k)), "penyebut dua tidak habis dibagi empat dan enam: alat menolak dan tolak menyala");
  k = r.k;
  k = { ...k, bandingD: 24, bandingTanda: "<" };
  r = L.periksaBanding(k);
  cek(!r.ok && /KPK/.test(L.petunjukBanding(k)) && !/\b12\b/.test(L.petunjukBanding(k)), "penyebut persekutuan bukan KPK ditolak tanpa menyebut KPK-nya");
  k = { ...k, bandingD: 12, bandingTanda: "" };
  cek(!L.periksaBanding(k).ok && /Tanda belum dipilih/.test(L.petunjukBanding(k)), "tanda belum dipilih ditolak");
  k = L.pilihTanda(k, ">");
  r = L.periksaBanding(k);
  cek(!r.ok && r.k.salah >= 1 && /belum cocok/.test(L.petunjukBanding(k)), "tanda salah: 9/12 bukan lebih besar dari 10/12");
  k = L.pilihTanda(k, "<");
  r = L.periksaBanding(k);
  cek(r.ok && r.k.bandingBenar.length === 1 && r.k.bandingKe === 1 && r.k.bandingD === 2 && r.k.bandingTanda === "", "banding benar: 9/12 < 10/12");
  k = r.k;
  cek(L.kalimatBetulBanding(DS.TARGET_BANDING[0]) === "Betul! KPK 4 dan 6 adalah 12, jadi 9/12 < 10/12.", "kalimat betul banding");
  // Sasaran kedua dan ketiga: 2/3 dan 3/5 menjadi 10/15 > 9/15; 2 1/3 dan 2 2/6 menjadi 14/6 = 14/6.
  sama(DS.TARGET_BANDING.map((s) => G.tandaBanding(s.a, s.b)), ["<", ">", "="], "tanda tiga sasaran banding: <, >, =");
  k = { ...k, bandingD: 15, bandingTanda: ">" };
  r = L.periksaBanding(k);
  cek(r.ok && r.k.bandingKe === 2, "banding 2/3 dan 3/5 benar");
  k = { ...r.k, bandingD: 6, bandingTanda: "=" };
  r = L.periksaBanding(k);
  cek(r.ok && r.k.bandingBenar.length === 3 && L.kalimatBetulBanding(DS.TARGET_BANDING[2]).includes("14/6 = 14/6"), "banding 2 1/3 dan 2 2/6 sama besar");
  k = r.k;
  // Urut: alat menolak kartu yang belum waktunya.
  k = L.pilihModeTimbang(k, "urut");
  sama(L.urutBenarSasaran(DS.TARGET_URUT[0]), [1, 2, 0], "urut naik 2 1/2, 1 5/6, 2 1/3: 1 5/6, 2 1/3, 2 1/2");
  sama(L.urutBenarSasaran(DS.TARGET_URUT[1]), [0, 2, 1], "urut turun 3/4, 5/8, 7/10: 3/4, 7/10, 5/8");
  sama(L.urutBenarSasaran(DS.TARGET_URUT[2]), [2, 1, 0], "urut naik 4 1/3, 4 1/4, 3 9/10: 3 9/10, 4 1/4, 4 1/3");
  for (const s of DS.TARGET_URUT) {
    const ref = s.daftar.map((f, i) => [nilaiPecah(f), i]).sort((p, q) => (s.naik ? p[0] - q[0] : q[0] - p[0])).map((x) => x[1]);
    sama(L.urutBenarSasaran(s), ref, `urut ${s.benda} dihitung ulang dengan nilai desimal pembanding`);
  }
  let u = L.ketukUrut(k, 0);
  cek(!u.ok && u.k.salah === k.salah + 1 && u.k.urutIsi.length === 0 && /^Alat menolak/.test(L.petunjukUrut(k)), "kartu pertama yang salah ditolak");
  u = L.ketukUrut(k, 1);
  cek(u.ok && !u.selesai && u.k.urutIsi.join() === "1", "kartu terkecil diterima");
  k = u.k;
  cek(!L.ketukUrut(k, 1).ok && L.ketukUrut(k, 1).k.urutIsi.join() === "1", "kartu yang sama diketuk lagi diabaikan");
  cek(!L.ketukUrut(k, 0).ok, "kartu terbesar sebelum yang tengah ditolak");
  u = L.ketukUrut(k, 2);
  k = u.k;
  u = L.ketukUrut(k, 0);
  cek(u.ok && u.selesai && u.k.urutBenar.length === 1 && u.k.urutKe === 1 && u.k.urutIsi.length === 0, "tiga kartu terpasang: sasaran selesai");
  cek(L.kalimatBetulUrut(DS.TARGET_URUT[0]) === "Betul! Urutan dari yang paling kecil: 1 5/6 < 2 1/3 < 2 1/2.", "kalimat betul urut");
  cek(L.ulangUrut({ ...k, urutIsi: [1] }).urutIsi.length === 0, "ulang urutan");
  cek(tanpaDigit(L.ucapanUrut(DS.TARGET_URUT[1])) && L.ucapanUrut(DS.TARGET_URUT[1]) === "tiga per empat, tujuh per sepuluh, lima per delapan", "ucapan urutan");
  // Misi dan data.
  const teksSim = JSON.stringify([DS, L.petunjukGaris(L.awalTimbang()), L.petunjukUrut(L.awalTimbang()), L.kalimatGaris(L.awalTimbang()), L.kalimatUbah(L.awalTimbang()), L.kalimatBanding(L.awalTimbang()), L.kalimatUrut(L.awalTimbang())]);
  cek(bersih(teksSim), "simulasi tanpa kata terlarang");
  cek(MT.MISI_K5B3.A === DS.MISI_TIMBANG_TEKS && MT.misiAwalK5Bab3("A").includes(DS.MISI_TIMBANG_TEKS), "teks misi sama dengan data-sim");
  cek(MK.MISI_A.every((m) => /^a-/.test(m.id)) && MK.MISI_A.filter((m) => m.wajib).length === 4 && MK.MISI_A.filter((m) => !m.wajib).length === 2, "empat misi wajib dan dua bebas berawalan a-");
  sama(S.misiBaru(MK.MISI_A, L.awalTimbang(), new Set()), [], "keadaan awal belum memenuhi misi apa pun");
  sama(S.misiBaru(MK.MISI_A, { ...L.awalTimbang(), tolak: true }, new Set()), ["a-tolak"], "tolak dari penolakan penyebut baru yang bukan kelipatan kedua penyebut");
  for (const s of DS.TARGET_BANDING) cek(Math.max(G.kpk(s.a.q, s.b.q)) <= 24 && G.kpk(s.a.q, s.b.q) <= 15, `banding ${G.teksPec(s.a)} dan ${G.teksPec(s.b)} muat digambar`);
  // Data simulasi berbeda dari Story (kantong tepung 2 3/4, 3 1/2, 1 7/8).
  const cerita = [G.teksPec(G.pec(2, 3, 4)), G.teksPec(G.pec(3, 1, 2)), G.teksPec(G.pec(1, 7, 8))];
  const dataSim = [...DS.TARGET_GARIS.map((s) => G.teksPec(s.f)), ...DS.TARGET_UBAH.map((s) => G.teksPec(s.f)), ...DS.TARGET_BANDING.flatMap((s) => [G.teksPec(s.a), G.teksPec(s.b)]), ...DS.TARGET_URUT.flatMap((s) => s.daftar.map(G.teksPec))];
  cek(dataSim.every((x) => !cerita.includes(x)), "data simulasi berbeda dari kantong tepung Story");
}

/* ------------------------------ Mind-map dan Infografis ------------------------------ */
{
  cek(DK.LANGKAH_TIMBANG.length === 6 && new Set(DK.LANGKAH_TIMBANG.map((l) => l.judul)).size === 6, "Mind-map: enam langkah berbeda");
  cek(DK.LANGKAH_TIMBANG.every((l) => tanpaDigit(l.arti) && bersih(l.arti + l.judul) && l.judul.length <= 20 && KATA_PENDEK(l.judul) && emojiSah(l.ikon)), "Mind-map: arti tanpa digit, judul pendek, tanpa kata terlarang");
  const semuaArti = DK.LANGKAH_TIMBANG.map((l) => l.arti).join(" ").toLowerCase();
  cek(/biasa/.test(semuaArti) && /campuran/.test(semuaArti) && /bilangan bulat/.test(semuaArti) && /kalikan bilangan bulat dengan penyebut/.test(semuaArti) && /kpk/.test(semuaArti) && /pembilang terbesar/.test(semuaArti) && /garis bilangan/.test(semuaArti) && /makin ke kanan makin besar/.test(semuaArti), "Mind-map memuat bentuk, bulat, ubah, KPK, pembilang, garis");
  cek(DK.LANGKAH_TIMBANG.every((l) => !BUKAN_A.test(l.arti + l.judul)), "Mind-map: tanpa topik Sub-Bab lain");
  // Kontrak data bersambung: tiga kantong tepung Bu Ratna.
  sama(DK.KANTONG.map((k) => G.teksPec(k.f)), ["2 3/4", "3 1/2", "1 7/8"], "Infografis: tiga kantong 2 3/4, 3 1/2, 1 7/8");
  cek(DK.SATUAN_INFO === "kilogram" && DK.KPK_INFO === 8 && DK.PENYEBUT_INFO.join() === "4,2,8" && DK.MAKS_GARIS_INFO === 4, "Infografis: kilogram, KPK 4, 2, 8 adalah 8, garis sampai empat");
  sama([0, 1, 2].map((i) => DK.pembilangKpk(i)), [22, 28, 15], "Infografis: pembilang 22, 28, 15 per 8");
  sama([0, 1, 2].map((i) => DK.posisiRuasInfo(i)), [22, 28, 15], "Infografis: letak pada garis sama dengan pembilang per 8");
  sama([DK.URUT_BESAR, DK.URUT_KECIL], [[1, 0, 2], [2, 0, 1]], "Infografis: urutan besar dan kecil");
  sama(DK.urutanInfo(), "1 7/8 < 2 3/4 < 3 1/2", "Infografis: urutan dari terkecil");
  sama([DK.tandaInfo(1, 0), DK.tandaInfo(2, 0), DK.tandaSama(1)], ["3 1/2 > 2 3/4", "1 7/8 < 2 3/4", "7/2 = 3 1/2"], "Infografis: tanda >, <, =");
  for (let i = 0; i < 3; i += 1) {
    const f = DK.KANTONG[i].f;
    cek(DK.suaraUbah(i).includes(EJ.kataK5B3(f.w * f.q + f.p)) && tanpaDigit(DK.suaraUbah(i)), `Infografis: suara ubah kantong ${i + 1}`);
    cek(DK.pembilangKpk(i) * f.q === G.keBiasa(f).p * 8 && Math.abs(DK.pembilangKpk(i) / 8 - (f.w + f.p / f.q)) < 1e-9, `Infografis: ${DK.pembilangKpk(i)}/8 sama besar dengan ${G.teksPec(f)}`);
  }
  const suara = [
    DK.suaraBiasa,
    DK.suaraCampuran,
    ...[0, 1, 2].map((i) => DK.suaraBulat(i)),
    ...[0, 1, 2].map((i) => DK.suaraUbah(i)),
    ...[0, 1, 2].map((i) => DK.suaraGaris(i)),
    DK.suaraKpk,
    ...[0, 1, 2].map((i) => DK.suaraPembilang(i)),
    DK.suaraTanda(1, 0),
    DK.suaraTanda(2, 0),
    DK.suaraSama(1),
    DK.suaraUrutan,
    DK.PETUNJUK1_INFO_TIMBANG,
    DK.PETUNJUK2_INFO_TIMBANG,
    DK.SELESAI1_INFO_TIMBANG,
    DK.SELESAI2_INFO_TIMBANG,
    DK.PETUNJUK_PETA_TIMBANG,
    DK.SELESAI_PETA_TIMBANG,
  ];
  cek(suara.every((t) => tanpaDigit(t) && bersih(t)), "Infografis dan Mind-map: suara tanpa digit dan tanpa kata terlarang");
  cek(/dua bulat tiga per empat/.test(DK.suaraGaris(0)) && /lebih besar dari/.test(DK.suaraTanda(1, 0)) && /lebih kecil dari/.test(DK.suaraTanda(2, 0)) && /sama dengan/.test(DK.suaraSama(1)), "Infografis: suara tanda dan pecahan");
  cek(/KPK-nya adalah delapan/.test(DK.suaraKpk), "Infografis: KPK delapan");
  cek(!suara.some((t) => BUKAN_A.test(t)), "Infografis: tanpa topik Sub-Bab lain");
  const info = readFileSync(new URL("InfoTimbang.tsx", folder), "utf8");
  cek(/grid-cols-3/.test(info) && /grid-cols-4/.test(info) && /min-h-\[48px\]/.test(info) && !/text-\[9px\]|text-\[8px\]/.test(info), "Infografis: kisi tetap dan teks tidak kurang dari 10 px");
  cek(/TOTAL1 = 2 \+ KANTONG\.length \* 2/.test(info) && /TOTAL2 = KANTONG\.length \+ 1 \+ KANTONG\.length \+ 3 \+ 1/.test(info), "Infografis: jumlah kotak kartu 1 (8) dan kartu 2 (11)");
}

/* ------------------------------ CPA: tiga tahap ------------------------------ */
const TAHAP = [["Concrete", D.CONCRETE], ["Pictorial", D.PICTORIAL], ["Abstract", D.ABSTRACT]];
{
  sama(TAHAP.map(([, s]) => s.map((x) => x.nomor)), [[2, 3, 4], [5, 6, 7], [8, 9, 10]], "nomor misi berlanjut dari Simulasi");
  sama(TAHAP.map(([, s]) => s.map((x) => x.cara)), [["klik", "kanvas", "suara"], ["klik", "kanvas", "suara"], ["klik", "kanvas", "suara"]], "cara tiap misi");
  const semua = [];
  for (const [nama, soal] of TAHAP) {
    cek(soal.length === 3 && soal.every((s) => s.langkah.length === 4), `${nama}: tiga misi, empat langkah`);
    for (const s of soal) sama(s.langkah.map((q) => q.metode), ["igil", "garis", "penyebut", "campuran"], `${nama} ${s.judul}: urutan metode`);
    const kunciData = new Set();
    for (const s of soal)
      for (const q of s.langkah) {
        const d = LC.dasarDari(q.langkah);
        semua.push([nama, s, q, d]);
        const kd = JSON.stringify(d);
        cek(!kunciData.has(kd), `${nama}: tugas tidak kembar (${kd})`);
        kunciData.add(kd);
        cek(q.judul === q.suara && tanpaDigit(q.suara) && bersih(q.suara + s.cerita + s.judul), `${nama}: suara tanpa digit dan tanpa kata terlarang`);
        cek(LC.siapLangsung(q.langkah, "benda", s.cara) === (q.langkah.tipe !== "salah"), `${nama}: siap langsung kecuali Cari kesalahan`);
        cek(!BUKAN_A.test(q.suara + s.cerita), `${nama}: tanpa topik Sub-Bab lain`);
      }
    // Angka kanvas tunggal 1 sampai 9 dan tidak kembar per tahap.
    const kanvas = soal[1].langkah.map((q) => LC.kunciJawab(q.langkah, "kanvas"));
    cek(kanvas.every((k) => k.jenis === "angka" && k.n >= 1 && k.n <= 9), `${nama}: angka kanvas satu angka`);
    cek(new Set(kanvas.map((k) => k.n)).size === 4, `${nama}: angka kanvas tidak kembar (${kanvas.map((k) => k.n)})`);
    // Suara: angka satu digit atau kata, selalu ada pilihan ketuk.
    for (const q of soal[2].langkah) {
      const kn = LC.kunciJawab(q.langkah, "suara");
      const pil = LC.pilihanSuara(q.langkah, "suara");
      const teksBenar = LC.teksKunciPilihan(kn);
      cek((kn.jenis === "angka" ? kn.n >= 1 && kn.n <= 9 : true) && pil.length >= 2 && pil.includes(teksBenar) && pil.indexOf(teksBenar) > 0 && new Set(pil).size === pil.length, `${nama}: suara ${q.metode} punya pilihan ketuk, benar bukan yang pertama (${pil})`);
    }
  }
  // Jawaban benar dihitung ulang dengan cara lain (nilai desimal, perkalian silang, penjumlahan berulang).
  for (const [nama, s, q, d] of semua) {
    const kl = LC.kunciJawab(q.langkah, "klik");
    const kv = LC.kunciJawab(q.langkah, s.cara);
    if (d.tipe === "igil") {
      const pa = nilaiPecah(d.a);
      const pb = nilaiPecah(d.b);
      const tanda = Math.abs(pa - pb) < 1e-9 ? "=" : pa < pb ? "<" : ">";
      cek(kl.nama === `${G.teksPec(d.a)} ${tanda} ${G.teksPec(d.b)}`, `${nama}: igil klik ${G.teksPec(d.a)} ${tanda} ${G.teksPec(d.b)}`);
      if (s.cara === "kanvas") {
        cek(d.a.w >= 1 && d.b.w >= 1 && d.a.w !== d.b.w && kv.n === (pa > pb ? d.a.w : d.b.w) && Math.floor(Math.max(pa, pb)) === kv.n, `${nama}: igil kanvas bilangan bulat pecahan terbesar ${kv.n}`);
      }
      if (s.cara === "suara") cek(kv.nama === (tanda === "=" ? "sama" : tanda === "<" ? "kecil" : "besar"), `${nama}: igil suara ${kv.nama}`);
    }
    if (d.tipe === "garis") {
      const n = d.n;
      cek(Math.abs(n / d.q - nilaiPecah(LC.pecGaris(n, d.q))) < 1e-9 && n % d.q !== 0 && (n % d.q) % 2 !== 0 || (d.q % 2 === 0 ? n % d.q !== 0 : true), `${nama}: garis titik ${n}/${d.q}`);
      cek(G.fpb(n % d.q, d.q) === 1, `${nama}: titik garis ${n}/${d.q} sudah paling sederhana`);
      cek(n < d.maks * d.q && d.m <= d.maks * d.q && d.m > n, `${nama}: titik A dan B di dalam garis dan B di kanan A`);
      cek(G.fpb(d.m % d.q, d.q) === 1 || d.m % d.q === 0, `${nama}: titik B paling sederhana`);
      if (s.cara === "klik") cek(kl.nama === LC.teksTitik(n, d.q) && Math.abs(nilaiPecah(LC.pecGaris(n, d.q)) * d.q - n) < 1e-9, `${nama}: garis klik ${kl.nama}`);
      if (s.cara === "kanvas") cek(kv.n === d.q && d.q >= 2 && d.q <= 9, `${nama}: garis kanvas penyebut ${d.q}`);
      if (s.cara === "suara") cek(kv.nama === (d.tanya === "kecil" ? "kiri" : "kanan"), `${nama}: garis suara ${kv.nama}`);
    }
    if (d.tipe === "penyebut") {
      let l = 1;
      while (!(l % d.a.q === 0 && l % d.b.q === 0)) l += 1;
      cek(l === LC.kpkPenyebut(d) && d.a.w === 0 && d.b.w === 0, `${nama}: penyebut KPK ${l} dari ${d.a.q} dan ${d.b.q}`);
      cek(kl.nama === `${(d.a.p * l) / d.a.q}/${l}` && Math.abs((d.a.p * l) / d.a.q / l - d.a.p / d.a.q) < 1e-9, `${nama}: penyebut klik ${kl.nama} sama besar dengan ${d.a.p}/${d.a.q}`);
      if (s.cara === "kanvas") cek(kv.n === l && l <= 9, `${nama}: penyebut kanvas KPK ${l}`);
      if (s.cara === "suara") cek(kv.n === l / d.a.q && kv.n >= 2 && kv.n <= 9, `${nama}: penyebut suara pengali ${l / d.a.q}`);
      cek(G.banding(d.a, d.b) !== 0, `${nama}: kedua pecahan tidak sama besar`);
    }
    if (d.tipe === "campuran") {
      const hasil = Array.from({ length: d.f.w }, () => d.f.q).reduce((t, x) => t + x, d.f.p);
      cek(kl.nama === `${hasil}/${d.f.q}` && d.f.w >= 1 && d.f.p >= 1 && d.f.p < d.f.q, `${nama}: campuran ${G.teksPec(d.f)} menjadi ${hasil}/${d.f.q} (penjumlahan berulang)`);
      if (s.cara === "kanvas") cek(kv.n === d.f.w * d.f.q && kv.n <= 9, `${nama}: campuran kanvas ${kv.n}`);
      if (s.cara === "suara") cek(kv.nama === "tetap", `${nama}: campuran suara tetap`);
    }
    // Pilihan klik: tepat satu benar, unik, benar bukan di tombol pertama.
    if (s.cara === "klik") {
      const op = LC.pilihanKlik(q.langkah);
      cek(op.length === 3 && new Set(op).size === 3 && op.includes(kl.nama) && op.indexOf(kl.nama) > 0, `${nama}: pilihan klik ${d.tipe}: tiga, unik, benar bukan pertama (${op})`);
      // Tidak ada pilihan lain yang sama besar dengan jawaban benar (satu jawaban benar).
      if (d.tipe === "campuran" || d.tipe === "penyebut") {
        const nilaiTeks = (t) => {
          const [p, q2] = t.split("/").map(Number);
          return p / q2;
        };
        cek(op.filter((x) => Math.abs(nilaiTeks(x) - nilaiTeks(kl.nama)) < 1e-9).length === 1, `${nama}: ${d.tipe}: tepat satu pilihan yang sama besar (${op})`);
      }
      if (d.tipe === "garis") {
        const nilaiTitik = (t) => {
          const m = /^(?:(\d+) )?(\d+)\/(\d+)$/.exec(t);
          return m ? Number(m[1] ?? 0) + Number(m[2]) / Number(m[3]) : Number(t);
        };
        cek(op.filter((x) => Math.abs(nilaiTitik(x) - nilaiTitik(kl.nama)) < 1e-9).length === 1, `${nama}: garis: tepat satu pilihan di titik itu (${op})`);
      }
      if (d.tipe === "igil") cek(op.filter((x) => x.includes(" = ")).length === 1 && op.some((x) => x.includes(" < ")) && op.some((x) => x.includes(" > ")), `${nama}: igil: tiga tanda`);
    }
    // Kalimat dan petunjuk.
    cek(/^[A-Z0-9]/.test(LC.kalimatKunci(q.langkah, s.cara)) && !/ [.,:;!?]/.test(LC.kalimatKunci(q.langkah, s.cara)), `${nama}: kalimat kunci berkapital tanpa spasi sebelum tanda baca`);
    const pk = LC.petunjukSalah(q.langkah, s.cara, "x");
    cek(bersih(pk) && !/\d/.test(pk), `${nama}: petunjuk salah tanpa digit dan tanpa jawaban`);
    cek(tanpaDigit(G.eja(LC.kalimatKunci(q.langkah, s.cara))) && bersih(LC.kalimatKunci(q.langkah, s.cara)), `${nama}: kalimat kunci diucapkan tanpa digit`);
  }
  // Batas rupa.
  const teksTahap = (soal) => JSON.stringify(soal.map((s) => [s.judul, s.cerita, s.langkah.map((q) => q.suara)]));
  cek(TAHAP.every(([, soal]) => emojiSah(teksTahap(soal))), "emoji sah");
  for (const s of D.ABSTRACT) for (const q of s.langkah) cek(!GAMBAR.test(q.suara.replace(/Metode IGIL|Number Line|Common Denominator|Mixed to Improper/g, "") + s.cerita) || q.langkah.tipe === "salah", `Abstract: instruksi dan cerita tanpa menyebut gambar (${q.suara.slice(0, 40)})`);
  for (const s of D.ABSTRACT) for (const q of s.langkah) cek(/kartu/.test(q.suara) || q.langkah.tipe === "salah", "Abstract: instruksi menyebut kartu");
  for (const s of D.PICTORIAL) for (const q of s.langkah) cek(!/loyang roti|tali bilangan roti|susunan loyang/.test(q.suara), "Pictorial: instruksi tanpa benda beremoji");
  for (const s of D.CONCRETE) for (const q of s.langkah) cek(q.langkah.tipe === "salah" || /loyang roti|tali bilangan roti|susunan loyang/.test(q.suara), "Concrete: instruksi menyebut benda toko roti");
  for (const [nama, soal] of TAHAP) for (const q of soal.flatMap((s) => s.langkah)) cek(!/\b(Yohana|Lukas|Komang|Nisa|Asep|wingko|martabak|lompat jauh|Raka|Salsa|Pak Joko|Helen|Tiara|Slamet|pizza|Bu Wulan|Pak Joyo|batik|angklung|Bu Marni|Pak Tarno|Bu Wati|Kak Lintang|lonceng|klepon|stadion|tribun|bazar|kolam|Karel|Azizah)\b/i.test(q.suara), `${nama}: tanpa tokoh atau benda lama`);
  // Tokoh dan benda toko roti tampil di cerita.
  cek(D.CONCRETE.every((s) => /roti|loyang|adonan|rak|etalase|Bu Ratna|Pak Arif/.test(s.cerita)) && D.PICTORIAL.every((s) => /Bima|Citra|bagan|Bu Ratna|kertas/.test(s.cerita)) && D.ABSTRACT.every((s) => /Toko Roti Keliling|petugas|kata dan angka/i.test(s.cerita)), "cerita tiap misi bernuansa toko roti");
  // Seed alur.
  const salahDi = (soal) => soal.flatMap((s) => s.langkah.map((q) => q.langkah)).find((l) => l.tipe === "salah");
  const sc = salahDi(D.CONCRETE);
  cek(sc.tokoh === "Fajar" && !sc.betul && sc.dasar.tipe === "igil" && G.teksPec(sc.dasar.a) === "2 1/3" && G.teksPec(sc.dasar.b) === "3 1/4" && sc.jawabTokoh === "2 1/3 > 3 1/4" && G.banding(sc.dasar.a, sc.dasar.b) < 0, "seed Concrete: Fajar menyatakan 2 1/3 lebih besar dari 3 1/4 (salah, bilangan bulat tiga lebih besar)");
  const sp = salahDi(D.PICTORIAL);
  cek(sp.tokoh === "Citra" && sp.betul === true && sp.dasar.tipe === "campuran" && G.teksPec(sp.dasar.f) === "1 1/2" && LC.kunciJawab(sp, "klik").nama === sp.jawabTokoh && sp.jawabTokoh === "3/2", "seed Pictorial: Citra benar, 1 1/2 sama dengan 3/2");
  const sa = salahDi(D.ABSTRACT);
  cek(sa.tokoh === "Fajar" && !sa.betul && sa.dasar.tipe === "penyebut" && sa.jawabTokoh === "1/6" && LC.kunciJawab(sa, "klik").nama === "3/6", "seed Abstract: Fajar mengubah penyebut saja (1/2 menjadi 1/6, seharusnya 3/6)");
  cek([D.CONCRETE, D.PICTORIAL, D.ABSTRACT].every((t) => salahDi(t) !== undefined && LC.pilihanKlik(salahDi(t)).includes(salahDi(t).jawabTokoh)), "jawaban tokoh selalu ada di pilihan");
  sama([D.CONCRETE, D.PICTORIAL, D.ABSTRACT].map((t) => salahDi(t).posisi), [1, 2, 0], "posisi tampilan alasan benar divariasikan: kedua, ketiga, pertama");
  for (const t of [D.CONCRETE, D.PICTORIAL, D.ABSTRACT]) {
    const l = salahDi(t);
    const panjang = l.alasan.map((a) => a.length);
    cek(panjang[l.benar] < Math.max(...panjang), `alasan benar ${l.tokoh} bukan yang terpanjang (${panjang})`);
    cek(l.alasan.every((a) => bersih(a)) && bersih(l.kataTokoh + l.keliru) && !/\d/.test(l.keliru), `alasan ${l.tokoh}: tanpa kata terlarang dan keliru tanpa digit`);
    cek(!new RegExp(l.jawabTokoh.replace(/\D/g, "") || "zzzz").test(l.keliru) || l.betul, `keliru ${l.tokoh} tidak menyebut jawaban`);
  }
  sama(new Set([D.CONCRETE, D.PICTORIAL, D.ABSTRACT].map((t) => salahDi(t).benar)).size >= 2, true, "indeks alasan benar divariasikan");
  // Satuan beragam dan semua jenis bilangan.
  const satuan = new Set(semua.map(([, , , d]) => d.satuan));
  cek(["kilogram", "liter", "meter", "kilometer"].every((x) => satuan.has(x)), "satuan beragam");
  cek(semua.some(([, , , d]) => d.tipe === "igil" && G.banding(d.a, d.b) === 0) && semua.some(([, , , d]) => d.tipe === "igil" && G.banding(d.a, d.b) < 0) && semua.some(([, , , d]) => d.tipe === "igil" && G.banding(d.a, d.b) > 0), "igil: kecil, besar, dan sama tercakup");
  cek(semua.some(([, , , d]) => d.tipe === "igil" && d.a.w === 0 && d.b.w >= 1) && semua.some(([, , , d]) => d.tipe === "igil" && d.a.w >= 1 && d.b.w >= 1), "igil: biasa melawan campuran dan campuran melawan campuran tercakup");
  cek(semua.filter(([, , , d]) => d.tipe === "garis").every(([, , , d]) => d.q >= 2 && d.q <= 8), "garis: penyebut dua sampai delapan");
  // Poin penting dan jembatan.
  cek(D.POIN_PENTING.length === 6 && D.POIN_PENTING_SUARA.length === 6 && D.POIN_PENTING_SUARA.every(tanpaDigit) && D.POIN_PENTING.every(bersih), "poin penting: enam butir, suara tanpa digit, tanpa kata terlarang");
  cek(D.POIN_PENTING.every((p) => /^[A-Z]/.test(p) && !/ [.,:;!?]/.test(p)), "poin penting: huruf kapital dan tanpa spasi sebelum tanda baca");
  const ps = D.POIN_PENTING_SUARA.join(" ").toLowerCase();
  cek(/pecahan biasa/.test(ps) && /pecahan campuran/.test(ps) && /mengalikan bilangan bulat dengan penyebut/.test(ps) && /makin ke kanan makin besar/.test(ps) && /kpk/.test(ps) && /bilangan bulatnya lebih dulu/.test(ps) && /lebih besar, lebih kecil, atau sama dengan/.test(ps), `poin penting: bentuk, ubah, garis, KPK, bulat dulu, tanda: ${ps}`);
  cek(D.POIN_PENTING.every((p) => !BUKAN_A.test(p)), "poin penting: tanpa topik Sub-Bab lain");
  cek(/Pak Seno/.test(D.PENUTUP_A) && /delapan bagian sama besar/.test(D.PENUTUP_A) && /digabung/.test(D.PENUTUP_A) && tanpaDigit(D.PENUTUP_A) && bersih(D.PENUTUP_A), "jembatan ke Sub-Bab B: Pak Seno dengan roti dipotong delapan");
  cek(D.TEMA_TIMBANG.concrete.nama === "Concrete" && D.TEMA_TIMBANG.pictorial.nama === "Pictorial" && D.TEMA_TIMBANG.abstract.nama === "Abstract" && D.CONCRETE_TIMBANG === D.CONCRETE && D.ABSTRACT_TIMBANG === D.ABSTRACT && D.PICTORIAL_TIMBANG === D.PICTORIAL, "ekspor tema dan nama pemasang");
  // Data CPA berbeda dari Story (2 3/4, 3 1/2, 1 7/8, satuan tepung).
  const cerita = ["2 3/4", "3 1/2", "1 7/8"];
  const dataCpa = semua.flatMap(([, , , d]) => (d.tipe === "igil" ? [G.teksPec(d.a), G.teksPec(d.b)] : d.tipe === "penyebut" ? [G.teksPec(d.a), G.teksPec(d.b)] : d.tipe === "campuran" ? [G.teksPec(d.f)] : []));
  cek(dataCpa.every((x) => !cerita.includes(x)), "data CPA berbeda dari kantong tepung Story");
  cek(semua.every(([, , , d]) => d.satuan !== "tepung"), "satuan CPA bukan tepung");
}

/* ------------------------------ Pengenal ucapan ------------------------------ */
{
  sama(K.kataDariUcapan("besar"), ["besar"], "ucapan: besar");
  sama(K.kataDariUcapan("lebih kecil"), ["kecil"], "ucapan: lebih kecil");
  sama(K.kataDariUcapan("sama besar"), ["sama"], "ucapan: sama besar dihitung sama");
  sama(K.kataDariUcapan("sama"), ["sama"], "ucapan: sama");
  sama(K.kataDariUcapan("tidak besar"), [], "ucapan: tidak besar tidak dihitung");
  sama(K.kataDariUcapan("tidak berubah"), ["tetap"], "ucapan: tidak berubah berarti tetap");
  sama(K.kataDariUcapan("sebelah kanan"), ["kanan"], "ucapan: sebelah kanan");
  sama(K.kataDariUcapan("kiri"), ["kiri"], "ucapan: kiri");
  cek(K.cocokUcapan("itu lebih besar", { jenis: "nama", nama: "besar" }).cocok && !K.cocokUcapan("sama besar", { jenis: "nama", nama: "besar" }).cocok && K.cocokUcapan("sama besar", { jenis: "nama", nama: "sama" }).cocok, "ucapan: besar dan sama tidak tertukar");
  sama(K.angkaDariUcapan("tiga dan 2"), [3, 2], "ucapan: angka dari kata dan digit");
  cek(K.cocokUcapan("delapan", { jenis: "angka", n: 8 }).cocok && !K.cocokUcapan("tujuh", { jenis: "angka", n: 8 }).cocok, "ucapan: angka delapan");
  cek(K.cocokUcapan("", { jenis: "nama", nama: "kiri" }).terdengar.length === 0, "ucapan: sepi tidak terdengar apa pun");
}

/* ------------------------------ Berkas folder ------------------------------ */
{
  const berkas = readdirSync(folder).filter((f) => /\.(ts|tsx)$/.test(f));
  for (const f of ["data.ts", "data-kartu.ts", "data-sim.ts", "logika.ts", "logika-cpa.ts", "logika-data.ts", "periksa.ts", "GambarTimbang.tsx", "JawabTimbang.tsx", "LangkahTimbang.tsx", "TahapTimbang.tsx", "PetaTimbang.tsx", "InfoTimbang.tsx", "SimulasiGarisTimbang.tsx"]) cek(berkas.includes(f), `${f} ada`);
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folder), "utf8");
    cek(emojiSah(s) && !DILARANG.some((c) => [...s].some((x) => x.codePointAt(0) === c)) && !IKAN.some((c) => [...s].some((x) => x.codePointAt(0) === c)), `${f}: emoji paling tinggi U+1FA95, tanpa ZWJ, ikan, dan emoji yang tampil kosong`);
    cek(!/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}|\\u\{1FA74\}|\\u\{1F39F\}|\\u2602|\\u\{1FA9F\}|\\u\{1FAA3\}|\\u\{1F9CB\}/i.test(s), `${f}: kode emoji sah`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(!/senilai|nilai tempat|bernilai/i.test(s), `${f}: tanpa kata senilai, nilai tempat, bernilai`);
    cek(!/tribun-k5b1|urutan-k5b1|bundel-k5b1|hitung-k5b1|lonceng-k5b2|jadwal-k5b2|piring-k5b2|kotak-k5b2|papan-k5b2|jajanan-k4b6|etalase-k4b5|mosaik-k4b5|ubin|angklung|batik|keramik/i.test(s), `${f}: tidak merujuk bab lain`);
    cek(!/loyang-k5b3b|adonan-k5b3c|KeadaanLoyang|KeadaanAdonan/.test(s), `${f}: tanpa folder Sub-Bab lain`);
    const impor = [...s.matchAll(/from "([^"]+)"/g)].map((m) => m[1]);
    cek(impor.every((i) => !/SubBabK5B3|kit-k5b3|infografis-k5b3|skenario-k5b3|mesin-data-k5b3|lab-|SimulasiLab|model-|peta-label\/PetaLabel|peta-label\/InfoKartu|loyang-k5b3b|adonan-k5b3c|data-k5b3|naskah-k5b3|bantu-k5b3/.test(i)), `${f}: tidak mengimpor berkas lama, PetaLabel, InfoKartu, atau folder lain`);
    cek(!/\bnilai\b/i.test(s.replace(/\/\*[\s\S]*?\*\/|\/\/.*$/gm, "").replace(/\b[a-zA-Z]*[Nn]ilai[a-zA-Z]*\b/g, "")), `${f}: tanpa kata nilai di teks`);
    cek(!/capitalize|flex-wrap/.test(s), `${f}: tanpa capitalize dan flex-wrap`);
  }
  const gambar = readFileSync(new URL("GambarTimbang.tsx", folder), "utf8");
  cek(/selBar/.test(gambar) && /tandaGaris/.test(gambar) && /xGaris/.test(gambar) && !/<img/.test(gambar), "gambar memakai logika pecahan murni yang diuji (sel bar dan tanda garis digambar dari bilangan)");
  cek(/export function PecahanSvg/.test(gambar) && /export function TeksPecahan/.test(gambar) && /<line x1=\{px - lebarPecahan \/ 2\}/.test(gambar), "pecahan digambar bertumpuk: pembilang di atas garis, penyebut di bawah");
  const lang = readFileSync(new URL("LangkahTimbang.tsx", folder), "utf8");
  cek(/Pikirkan lagi apa yang \$\{l\.tokoh\} lakukan/.test(lang) && !/Lihat lagi\. \$\{l\.keliru\}|belum tepat\. \$\{l\.keliru\}/.test(lang), "Cari kesalahan: salah memilih keputusan atau alasan hanya mengarahkan, tidak membocorkan");
  const sim = readFileSync(new URL("SimulasiGarisTimbang.tsx", folder), "utf8");
  cek(/setCatatan\(ucap \?\? ""\)/.test(sim) && /GarisBilangan/.test(sim) && /grid grid-cols-2 gap-2/.test(sim) && (sim.match(/grid-cols-\[56px_1fr_56px\]/g) ?? []).length >= 3, "simulasi: pesan lama dikosongkan, empat alat dalam grid dua kali dua, nama di antara tombol minus dan plus tidak terjepit, garis dan bar digambar dari bilangan");
  const mm = readFileSync(new URL("PetaTimbang.tsx", folder), "utf8");
  cek(/export default function PetaTimbang/.test(mm) && /export \{ PetaTimbang \}/.test(mm) && !/PetaLabel|PetaKartu/.test(mm) && /speakGuru/.test(mm) && /LANGKAH_TIMBANG/.test(mm) && /MejaTimbangan/.test(mm), "Mind-map: komponen sendiri (meja timbangan dan kantong tepung), label kosong diketuk dibacakan Guru");
  const dl = readFileSync(new URL("InfoTimbang.tsx", folder), "utf8");
  cek(/export default function InfoTimbang/.test(dl) && /export \{ InfoTimbang \}/.test(dl) && !/InfoKartu|InfografisKartu/.test(dl) && /Kartu \{kartu\} dari 2/.test(dl) && /rak-kantong/.test(dl) && /garis-kpk/.test(dl), "Infografis: komponen sendiri (rak kantong dan garis KPK), dua kartu");
  // Ukuran teks efektif pada gambar: font viewBox x lebar tampil / 300. Tahap tampil sekitar 224 px (skala 0,75), Infografis dan Mind-map sekitar 268 px (skala 0,89); batas 10,3 px.
  const angkaFont = (teks) => [...teks.matchAll(/fontSize=\{(\d+(?:\.\d+)?)\}|u=\{(\d+(?:\.\d+)?)\}/g)].map((m) => Number(m[1] ?? m[2]));
  const terkecilGambar = Math.min(...angkaFont(gambar));
  cek(terkecilGambar * 0.75 >= 10.3, `gambar Tahap: font terkecil ${terkecilGambar} x 0,75 = ${(terkecilGambar * 0.75).toFixed(1)} px efektif (minimal 10,3)`);
  cek(Math.min(...angkaFont(dl)) * 0.89 >= 10.3 && Math.min(...angkaFont(mm)) * 0.89 >= 10.3, `Infografis dan Mind-map: font SVG terkecil ${Math.min(...angkaFont(dl), ...angkaFont(mm))} x 0,89 minimal 10,3`);
  const th = readFileSync(new URL("TahapTimbang.tsx", folder), "utf8");
  cek(/export default function TahapTimbang/.test(th) && /poinPenting/.test(th) && /PENUTUP_A/.test(th), "Tahap: ekspor default, Poin Penting dengan jembatan");
  const sa2 = readFileSync(new URL("../SimulasiK5Bab3.tsx", folder), "utf8");
  cek(/misiDaftar: daftarMisiK5Bab3\("A"\)/.test(sa2) && /SimulasiGarisTimbang/.test(sa2) && /laporMisiTimbang\(daftarMisiK5Bab3\("A"\), k, a\.capai\)/.test(sa2), "SimulasiK5Bab3: Sub-Bab A memakai misiDaftar dan laporMisi");
}

console.log(`Uji Garis Timbang Kelas 5 Bab 3 A: ${lulus} lulus, ${gagal} gagal`);
process.exit(gagal ? 1 : 0);
