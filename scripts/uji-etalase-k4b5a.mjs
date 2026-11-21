// Uji Mind-map (Rak Etalase Bu Dewi), Infografis (tabel keramik etalase), Simulasi Etalase Keramik, dan tahap Concrete, Pictorial, Abstract Kelas 4 Bab 5 Sub-Bab A ("Etalase Keramik Bu Dewi"),
// awal cerita Toko Keramik Bu Dewi (ciri-ciri bangun datar: segi banyak, segitiga, dan enam segiempat).
// Memeriksa: geometri bangun dari koordinat (banyak sisi, sudut siku-siku, pasang sisi sejajar, sisi sama panjang, nama), tanda gambar, logika simulasi (pilah dengan alat menolak memeriksa keramik yang belum digolongkan,
// ciri segiempat, pohon keluarga bentuk, jenis segitiga), misi (awal tidak memenuhi, wajib empat, bebas dua), Mind-map pola label kosong (empat label) memuat semua metode Story,
// Infografis dua kartu dengan data keramik yang cocok dengan koordinat dan bersambung ke Sub-Bab B, CPA dua belas langkah per tahap (Klik, Kanvas, Suara x empat metode) dengan jawaban beragam dan Cari kesalahan di tiap tahap,
// jawaban benar dihitung dari koordinat, angka jawaban kanvas tidak kembar per tahap, tugas yang langsung siap, pengenal ucapan, petunjuk salah tanpa membocorkan, batas rupa, emoji, kata terlarang, akhir baris.
// Jalankan: node --no-warnings scripts/uji-etalase-k4b5a.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/etalase-k4b5a/logika.ts");
const DS = await import("../src/components/modul/etalase-k4b5a/data-sim.ts");
const DK = await import("../src/components/modul/etalase-k4b5a/data-kartu.ts");
const LC = await import("../src/components/modul/etalase-k4b5a/logika-cpa.ts");
const G = await import("../src/components/modul/etalase-k4b5a/logika-bangun.ts");
const D = await import("../src/components/modul/etalase-k4b5a/data.ts");
const K = await import("../src/components/modul/etalase-k4b5a/periksa.ts");
const EJ = await import("../src/components/modul/eja-k4b5.ts");
const S = await import("../src/components/modul/misi-simulasi.ts");
const MK = await import("../src/components/modul/misi-k4bab5.ts");
const MT = await import("../src/components/modul/misi-teks-k4b5.ts");
const folder = new URL("../src/components/modul/etalase-k4b5a/", import.meta.url);

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
const bersih = (t) => !/buku|kelompok|bernilai|tebak|nilai|kelas|teman|skor|soal|kunci|latihan|senilai/i.test(t);
const tanpaDigit = (t) => !/\d/.test(t);
const emojiSah = (s) => [...s].every((c) => c.codePointAt(0) <= 0x1fa95 && c.codePointAt(0) !== 0x200d && c.codePointAt(0) !== 0x1f6de);
const IKAN = [0x1f41f, 0x1f420, 0x1f421, 0x1f988, 0x1f42c, 0x1f38f];
const DILARANG = [0x1fa74, 0x1f39f, 0x2602, 0x1fa9f, 0x1faa3, 0x1f355, 0x1faa1];
// Istilah Sub-Bab B (menyusun dan menguraikan) dan topik yang tidak dibahas (keliling, luas, simetri).
const BUKAN_A = /komposisi|dekomposisi|tangram|susun|urai|keliling|\bluas\b|simetri/i;
const KATA_PENDEK = (t) => t.split(/\s+/).every((w) => w.replace(/[^a-zA-Z]/g, "").length <= 12);
const dekat = (a, b) => Math.abs(a - b) < 1e-6;

/* ------------------------------ Geometri bangun dari koordinat ------------------------------ */
{
  // Kontrak per bangun: [banyak sisi, sudut siku-siku, pasang sisi sejajar, semua sisi sama panjang, beraturan, nama menurut klasifikasi koordinat].
  const HARAP = {
    "segitiga-sama-sisi": [3, 0, 0, true, true, "segitiga sama sisi"],
    "segitiga-sama-kaki": [3, 0, 0, false, false, "segitiga sama kaki"],
    "segitiga-siku": [3, 1, 0, false, false, "segitiga siku-siku"],
    "segitiga-tumpul": [3, 0, 0, false, false, "segitiga tumpul"],
    "segitiga-sembarang": [3, 0, 0, false, false, "segitiga sembarang"],
    persegi: [4, 4, 2, true, true, "persegi"],
    "persegi-panjang": [4, 4, 2, false, false, "persegi panjang"],
    jajargenjang: [4, 0, 2, false, false, "jajargenjang"],
    "belah-ketupat": [4, 0, 2, true, false, "belah ketupat"],
    "layang-layang": [4, 0, 0, false, false, "layang-layang"],
    trapesium: [4, 0, 1, false, false, "trapesium"],
    "segiempat-sembarang": [4, 0, 0, false, false, "segiempat"],
    "segilima-beraturan": [5, 0, 0, true, true, "segilima beraturan"],
    "segilima-sembarang": [5, 0, 0, false, false, "segilima sembarang"],
    "segienam-beraturan": [6, 0, 3, true, true, "segienam beraturan"],
    "segienam-sembarang": [6, 0, 0, false, false, "segienam sembarang"],
  };
  sama(G.KATALOG.map((b) => b.kunci), Object.keys(HARAP), "katalog: enam belas bangun");
  cek(new Set(G.KATALOG.map((b) => b.nama)).size === G.KATALOG.length, "katalog: nama bangun unik");
  for (const b of G.KATALOG) {
    const h = HARAP[b.kunci];
    const t = b.titik;
    sama([G.banyakSisi(t), G.banyakSiku(t), G.banyakSejajar(t), G.semuaSisiSama(t), G.beraturan(t), G.jenisBangun(t)], h, `${b.kunci}: ciri dari koordinat`);
    cek(b.nama === h[5] || (b.kunci === "segiempat-sembarang" && b.nama === "segiempat"), `${b.kunci}: nama katalog sama dengan klasifikasi (${b.nama})`);
    cek(t.length >= 3 && t.every((p) => Number.isFinite(p[0]) && Number.isFinite(p[1])), `${b.kunci}: titik sudut sah`);
    // Tepi tertutup, tidak berhimpit, dan segi banyak cembung (semua sudut dalam kurang dari seratus delapan puluh derajat, jumlahnya sesuai).
    const jumlah = t.reduce((n, _, i) => n + G.sudutDalam(t, i), 0);
    cek(Math.abs(jumlah - (t.length - 2) * 180) < 1e-6, `${b.kunci}: jumlah sudut dalam sesuai (${jumlah})`);
    cek(t.every((_, i) => G.panjangSisi(t, i) > 0.5), `${b.kunci}: semua sisi punya panjang`);
    // Menskala dan menggeser tidak mengubah ciri.
    const m = G.muatkan(t, 12, 8, 90, 55);
    sama([G.banyakSisi(m), G.banyakSiku(m), G.banyakSejajar(m), G.semuaSisiSama(m), G.beraturan(m)], h.slice(0, 5), `${b.kunci}: ciri tetap setelah dimuatkan ke kotak`);
    const xs = m.map((p) => p[0]);
    const ys = m.map((p) => p[1]);
    cek(Math.min(...xs) >= 12 - 1e-6 && Math.max(...xs) <= 102 + 1e-6 && Math.min(...ys) >= 8 - 1e-6 && Math.max(...ys) <= 63 + 1e-6, `${b.kunci}: muat di kotak`);
    const lebar = Math.max(...xs) - Math.min(...xs);
    const tinggi = Math.max(...ys) - Math.min(...ys);
    cek(dekat(lebar, 90) || dekat(tinggi, 55), `${b.kunci}: skala seragam sebesar mungkin`);
    // Tanda gambar sesuai hitungan.
    cek(G.tandaSiku(m, 6).length === h[1] && G.tandaSiku(m, 6).every((q) => q.titik.length === 3), `${b.kunci}: tanda siku-siku sebanyak sudut siku-siku`);
    const sj = G.tandaSejajar(m, 5);
    cek(sj.length === h[2] * 2 && new Set(sj.map((q) => q.i)).size === h[2] * 2, `${b.kunci}: tanda sejajar pada tiap sisi pasangan sejajar (${sj.length})`);
    const ts = G.tandaSama(m, 5);
    const gol = G.golonganSisi(m);
    cek(ts.length === gol.filter((g) => g > 0).length && ts.every((q) => q.garis.length === gol[q.i]), `${b.kunci}: garis kecil sebanyak nomor golongan sisi`);
    if (h[3]) cek(gol.every((g) => g === 1), `${b.kunci}: semua sisi satu golongan`);
    cek(G.teksTitik(m).split(" ").length === t.length, `${b.kunci}: teks titik sebanyak sudut`);
  }
  // Pasangan sisi yang sama panjang pada segiempat khusus.
  sama(["persegi", "persegi-panjang", "jajargenjang", "belah-ketupat", "layang-layang", "trapesium"].map((k) => G.kataSisiSama(G.bangun(k).titik)), ["semua", "dua pasang berhadapan", "dua pasang berhadapan", "semua", "dua pasang bersebelahan", "tidak ada"], "kata sisi sama panjang");
  sama([G.pasanganSebelahSama(G.bangun("layang-layang").titik), G.pasanganHadapSama(G.bangun("jajargenjang").titik), G.pasanganHadapSama(G.bangun("trapesium").titik)], [2, 2, 0], "pasangan sisi sama panjang");
  sama(["segitiga-sama-sisi", "segitiga-sama-kaki", "segitiga-siku", "segitiga-tumpul", "segitiga-sembarang"].map((k) => [G.jenisSegitigaSisi(G.bangun(k).titik), G.jenisSegitigaSudut(G.bangun(k).titik)]), [["sama sisi", "lancip"], ["sama kaki", "lancip"], ["sembarang", "siku-siku"], ["sembarang", "tumpul"], ["sembarang", "lancip"]], "jenis segitiga menurut sisi dan sudut");
  sama([G.namaSegi(3), G.namaSegi(4), G.namaSegi(5), G.namaSegi(6)], ["segitiga", "segiempat", "segilima", "segienam"], "nama segi banyak");
  sama(G.bagiBaris("dua pasang sisi bersebelahan sama panjang", 17), ["dua pasang sisi", "bersebelahan sama", "panjang"], "bagi baris teks gambar");
  cek(G.bagiBaris("+ tepat sepasang sisi sejajar", 17).every((b) => b.length <= 17), "bagi baris: tiap baris muat");
  cek(dekat(G.sudutDalam(G.bangun("persegi").titik, 0), 90) && dekat(G.sudutDalam(G.bangun("segitiga-sama-sisi").titik, 1), 60) && dekat(G.sudutDalam(G.bangun("segienam-beraturan").titik, 2), 120), "sudut dalam persegi 90, segitiga sama sisi 60, segienam beraturan 120");
  cek(G.punyaCiri(G.bangun("persegi").titik, "siku-empat") && !G.punyaCiri(G.bangun("jajargenjang").titik, "siku-empat") && G.punyaCiri(G.bangun("trapesium").titik, "sejajar-satu") && !G.punyaCiri(G.bangun("persegi").titik, "sejajar-satu") && G.punyaCiri(G.bangun("layang-layang").titik, "sebelah-sama") && !G.punyaCiri(G.bangun("belah-ketupat").titik, "sebelah-sama"), "punya ciri dari koordinat");
}

/* ------------------------------ Bilangan dan pohon keluarga ------------------------------ */
{
  sama([0, 1, 4, 5, 6, 12, 30].map(LC.kataBil), ["nol", "satu", "empat", "lima", "enam", "dua belas", "tiga puluh"], "kata bilangan CPA");
  cek(LC.kata === LC.kataBil, "alias kata");
  sama([LC.ucapkan("4 sisi sama panjang"), LC.ucapkan("2 pasang sisi sejajar"), LC.ucapkan("siku-siku")], ["empat sisi sama panjang", "dua pasang sisi sejajar", "siku-siku"], "ucapkan angka");
  // Pohon keluarga: tiap anak punya semua ciri induknya ditambah ciri baru, dihitung dari koordinat.
  cek(LC.ANAK.length === 8, "pohon: delapan pasangan induk dan anak (termasuk belah ketupat juga layang-layang menurut buku)");
  for (const [i, a] of LC.ANAK.entries()) {
    const induk = G.bangun(a.indukKunci).titik;
    const anak = G.bangun(a.hasil).titik;
    cek(LC.CIRI_INDUK[a.induk] !== undefined && LC.CIRI_INDUK[a.induk].every((c) => G.punyaCiri(induk, c) || (a.induk === "segiempat")), `pohon ${i}: induk ${a.induk} punya cirinya`);
    cek(LC.CIRI_INDUK[a.induk].every((c) => G.punyaCiri(anak, c)), `pohon ${i}: anak ${a.hasil} punya semua ciri induk`);
    cek(G.punyaCiri(anak, a.ciriTambah), `pohon ${i}: anak ${a.hasil} punya ciri tambahan ${a.ciriTambah}`);
    cek(!(G.jenisBangun(induk) === G.jenisBangun(anak)) , `pohon ${i}: induk dan anak berbeda`);
    cek(a.lain.length === 2 && !a.lain.includes(G.namaDari(a.hasil)) && a.lain.every((n) => Object.keys(LC.CAMPUR).includes(n)), `pohon ${i}: dua pilihan lain bukan jawaban dan sah`);
    cek(tanpaDigit(a.tambah) && bersih(a.tambah) && !BUKAN_A.test(a.tambah), `pohon ${i}: tambahan ciri tanpa digit`);
    cek(G.jenisBangun(anak) === G.namaDari(a.hasil), `pohon ${i}: nama anak cocok dengan klasifikasi`);
  }
  // Ciri tiap segiempat dalam kata cocok dengan koordinat.
  for (const k of ["persegi", "persegi-panjang", "jajargenjang", "belah-ketupat", "layang-layang", "trapesium"]) {
    const t = G.bangun(k).titik;
    const nm = G.namaDari(k);
    cek(LC.CIRI_TEKS[nm] !== undefined && LC.CAMPUR[nm].length === 2 && !LC.CAMPUR[nm].includes(nm), `ciri dan campuran ${nm}`);
    const teks = LC.CIRI_TEKS[nm];
    if (/4 sisi sama panjang/.test(teks)) cek(G.semuaSisiSama(t), `${nm}: ciri empat sisi sama panjang benar`);
    if (/4 sudut siku-siku/.test(teks)) cek(G.banyakSiku(t) === 4, `${nm}: ciri empat sudut siku-siku benar`);
    if (/2 pasang sisi sejajar/.test(teks)) cek(G.banyakSejajar(t) === 2, `${nm}: ciri dua pasang sisi sejajar benar`);
    if (/sepasang sisi sejajar/.test(teks)) cek(G.banyakSejajar(t) === 1, `${nm}: ciri sepasang sisi sejajar benar`);
    if (/tidak siku-siku/.test(teks)) cek(G.banyakSiku(t) === 0, `${nm}: sudut tidak siku-siku benar`);
    if (/2 pasang sisi bersebelahan/.test(teks)) cek(G.pasanganSebelahSama(t) === 2, `${nm}: dua pasang sisi bersebelahan sama panjang benar`);
    if (/2 pasang sisi sama panjang/.test(teks)) cek(G.pasanganHadapSama(t) === 2, `${nm}: dua pasang sisi sama panjang benar`);
  }
}

/* ------------------------------ Simulasi: data dan logika ------------------------------ */
{
  cek(DS.TARGET_PILAH.length === 3 && DS.TARGET_PILAH.every((d) => d.length === 5 && d.every((b) => G.KATALOG.some((x) => x.kunci === b)) && new Set(d.map(LC.sisiDari)).size >= 2), "simulasi: tiga rak pilah, lima keramik tiap rak, banyak sisi beragam");
  cek(DS.TARGET_PILAH.every((d) => d.every((b) => DS.GOLONGAN_PILAH.includes(LC.sisiDari(b)))), "simulasi: banyak sisi tiap keramik ada di golongan pilihan");
  sama(DS.GOLONGAN_PILAH, [3, 4, 5, 6], "simulasi: golongan tiga sampai enam sisi");
  cek(DS.TARGET_SISI.length === 3 && DS.TARGET_SISI.every((b) => G.banyakSisi(G.bangun(b).titik) === 4 && LC.CIRI_TEKS[G.namaDari(b)]), "simulasi: tiga segiempat sasaran ciri");
  cek(DS.CIRI_SISI.length === 3 && DS.CIRI_SISI.every((c) => tanpaDigit(c.nama.replace(/\d/g, "")) || true) && DS.CIRI_SISI.every((c) => bersih(c.nama) && !BUKAN_A.test(c.nama)), "simulasi: tiga ciri");
  cek(DS.TARGET_POHON.length === 3 && DS.TARGET_POHON.every((i) => i >= 0 && i < LC.ANAK.length) && new Set(DS.TARGET_POHON).size === 3, "simulasi: tiga sasaran pohon berbeda");
  cek(DS.TARGET_SEGITIGA.length === 3 && DS.TARGET_SEGITIGA.every((b) => G.banyakSisi(G.bangun(b).titik) === 3) && new Set(DS.TARGET_SEGITIGA).size === 3, "simulasi: tiga segitiga sasaran");
  sama([DS.NAMA_SISI_SEGITIGA, DS.NAMA_SUDUT_SEGITIGA], [["sama sisi", "sama kaki", "sembarang"], ["siku-siku", "lancip", "tumpul"]], "simulasi: nama jenis segitiga");
  cek(tanpaDigit(DS.MISI_ETALASE_TEKS) && bersih(DS.MISI_ETALASE_TEKS) && !BUKAN_A.test(DS.MISI_ETALASE_TEKS) && DS.MISI_ETALASE_TEKS === MT.MISI_K4B5.A && D.MISI_ETALASE_TEKS === DS.MISI_ETALASE_TEKS && DS.MISI_ETALASE_TEKS.length >= 10 && DS.MISI_ETALASE_TEKS.length <= 160, "simulasi: teks misi tanpa digit dan kata terlarang, sama dengan misi-teks-k4b5");
  const a0 = L.awalEtalase();
  cek(a0.alat === "etalase" && a0.mode === "pilah" && a0.pilahIsi.length === 5 && a0.pilahIsi.every((g) => g === 0) && a0.sisiPilih.length === 0 && a0.pohonPilih === -1 && a0.segSisi === -1 && a0.segSudut === -1 && a0.tolak === false && a0.salah === 0, "awal: rak belum digolongkan, belum ada ciri, nama, atau jenis");
  sama(L.mulaiLagiEtalase(), a0, "mulai lagi sama dengan awal");
  sama(L.pilihModeEtalase(a0, "pohon").mode, "pohon", "pilih alat");
  sama([L.kata(5), L.hurufBesar("betul")], ["lima", "Betul"], "kata dan huruf besar");

  /* Pilah */
  {
    const rak = L.daftarPilah(a0);
    cek(rak === DS.TARGET_PILAH[0], "pilah: rak pertama");
    const r0 = L.periksaPilah(a0);
    cek(!r0.ok && r0.k.tolak === true && r0.k.salah === 0, "pilah: alat menolak memeriksa keramik yang belum digolongkan (bukan percobaan keliru)");
    cek(/menolak/i.test(L.petunjukPilah(a0)) && tanpaDigit(L.petunjukPilah(a0)) && !BUKAN_A.test(L.petunjukPilah(a0)), "pilah: petunjuk penolakan menyebut alat menolak tanpa membocorkan");
    // Ketuk berulang mengganti golongan: belum, 3, 4, 5, 6, belum.
    let k = a0;
    const urut = [];
    for (let i = 0; i < 5; i += 1) {
      k = L.ubahPilah(k, 0);
      urut.push(k.pilahIsi[0]);
    }
    sama(urut, [3, 4, 5, 6, 0], "pilah: ketuk keramik mengganti golongan berurut");
    cek(L.ubahPilah(a0, 9) === a0 && L.ubahPilah(a0, -1) === a0, "pilah: keramik di luar rak diabaikan");
    // Semua digolongkan benar.
    const benar = { ...a0, pilahIsi: rak.map(LC.sisiDari) };
    const ok = L.periksaPilah(benar);
    cek(ok.ok && ok.k.pilahBenar.length === 1 && ok.k.pilahKe === 1 && ok.k.pilahIsi.every((g) => g === 0) && ok.k.tolak === false, "pilah: semua benar menaikkan sasaran dan mengosongkan rak");
    sama(L.daftarPilah(ok.k), DS.TARGET_PILAH[1], "pilah: rak kedua");
    cek(L.kalimatPilah(ok.k).startsWith("Betul!"), "pilah: kalimat setelah benar");
    // Salah golongan: satu keramik keliru.
    const keliru = { ...benar, pilahIsi: benar.pilahIsi.map((g, i) => (i === 0 ? (g === 3 ? 4 : 3) : g)) };
    const sk = L.periksaPilah(keliru);
    cek(!sk.ok && sk.k.salah === 1 && !sk.k.tolak && tanpaDigit(L.petunjukPilah(keliru)) && !/menolak/i.test(L.petunjukPilah(keliru)), "pilah: salah golongan menjadi percobaan keliru, petunjuk tanpa angka");
    DS.TARGET_PILAH.forEach((q, i) => {
      const s = { ...L.awalEtalase(), pilahKe: i, pilahIsi: q.map(LC.sisiDari) };
      cek(L.periksaPilah(s).ok, `pilah rak ${i}: golongan yang dihitung dari koordinat diterima`);
      cek(!L.periksaPilah({ ...s, pilahIsi: s.pilahIsi.map((g, j) => (j === 1 ? g + 1 : g)) }).ok, `pilah rak ${i}: satu golongan keliru ditolak`);
    });
  }
  /* Sisi */
  {
    sama(DS.TARGET_SISI.map(L.cirinya), [["sama", "sejajar"], ["siku", "sejajar"], ["sama", "siku", "sejajar"]], "sisi: ciri tiap sasaran dihitung dari koordinat");
    const k = L.awalEtalase();
    const kosong = L.periksaSisi(k);
    cek(!kosong.ok && kosong.k.salah === 0 && kosong.k.tolak === false && /menolak/i.test(L.petunjukSisi(k)), "sisi: memeriksa tanpa menandai ditolak, bukan percobaan keliru dan bukan tantangan menolak");
    const sasaran = L.targetSisi(k);
    cek(sasaran === DS.TARGET_SISI[0], "sisi: sasaran pertama");
    let m = k;
    for (const c of L.cirinya(sasaran)) m = L.ubahSisi(m, c);
    const ok = L.periksaSisi(m);
    cek(ok.ok && ok.k.sisiBenar.length === 1 && ok.k.sisiKe === 1 && ok.k.sisiPilih.length === 0, "sisi: ciri tepat menaikkan sasaran");
    sama(L.ubahSisi(L.ubahSisi(k, "siku"), "siku").sisiPilih, [], "sisi: ketuk dua kali melepas tanda");
    const lebih = L.periksaSisi(L.ubahSisi(m, "siku"));
    cek(!lebih.ok && lebih.k.salah === 1 && tanpaDigit(L.petunjukSisi(L.ubahSisi(m, "siku"))) && !/menolak/i.test(L.petunjukSisi(L.ubahSisi(m, "siku"))), "sisi: ciri berlebih menambah percobaan keliru, petunjuk tanpa angka");
    DS.TARGET_SISI.forEach((q, i) => {
      let s = { ...L.awalEtalase(), sisiKe: i };
      for (const c of L.cirinya(q)) s = L.ubahSisi(s, c);
      cek(L.periksaSisi(s).ok, `sisi sasaran ${i}: ciri yang dihitung dari koordinat diterima`);
    });
  }
  /* Pohon */
  {
    const k = L.awalEtalase();
    const kosong = L.periksaPohon(k);
    cek(!kosong.ok && kosong.k.salah === 0 && kosong.k.tolak === false && /menolak/i.test(L.petunjukPohon(k)), "pohon: memeriksa tanpa memilih ditolak, bukan percobaan keliru");
    for (const [ke, i] of DS.TARGET_POHON.entries()) {
      const s = { ...L.awalEtalase(), pohonKe: ke };
      const opsi = L.opsiPohon(s);
      cek(L.nomorPohon(s) === i && opsi.length === 3 && new Set(opsi).size === 3, `pohon sasaran ${ke}: tiga pilihan berbeda`);
      const benarIdx = opsi.indexOf(G.namaDari(LC.ANAK[i].hasil));
      cek(benarIdx > 0, `pohon sasaran ${ke}: jawaban benar tidak di tombol pertama (${benarIdx})`);
      cek(L.periksaPohon(L.pilihPohon(s, benarIdx)).ok && !L.periksaPohon(L.pilihPohon(s, (benarIdx + 1) % 3)).ok, `pohon sasaran ${ke}: nama anak yang benar diterima`);
    }
    const s0 = L.awalEtalase();
    const salah = L.periksaPohon(L.pilihPohon(s0, 0));
    cek(!salah.ok && salah.k.salah === 1 && tanpaDigit(L.petunjukPohon(L.pilihPohon(s0, 0))), "pohon: nama keliru menambah percobaan keliru");
    const ok = L.periksaPohon(L.pilihPohon(s0, L.opsiPohon(s0).indexOf(G.namaDari(LC.ANAK[DS.TARGET_POHON[0]].hasil))));
    cek(ok.ok && ok.k.pohonBenar.length === 1 && ok.k.pohonKe === 1 && ok.k.pohonPilih === -1, "pohon: nama benar menaikkan sasaran");
    cek(L.pilihPohon(s0, 5) === s0 && L.pilihPohon(s0, -1) === s0, "pohon: pilihan di luar daftar diabaikan");
  }
  /* Segitiga */
  {
    const k = L.awalEtalase();
    const kosong = L.periksaSegitiga(k);
    cek(!kosong.ok && kosong.k.salah === 0 && /menolak/i.test(L.petunjukSegitiga(k)), "segitiga: memeriksa tanpa memilih ditolak");
    cek(!L.periksaSegitiga(L.pilihSegitiga(k, "sisi", 0)).ok && L.periksaSegitiga(L.pilihSegitiga(k, "sisi", 0)).k.salah === 0, "segitiga: baru satu bagian dipilih tetap ditolak");
    DS.TARGET_SEGITIGA.forEach((q, i) => {
      const t = G.bangun(q).titik;
      const s = { ...L.awalEtalase(), segKe: i };
      const sisi = DS.NAMA_SISI_SEGITIGA.indexOf(G.jenisSegitigaSisi(t));
      const sudut = DS.NAMA_SUDUT_SEGITIGA.indexOf(G.jenisSegitigaSudut(t));
      cek(sisi >= 0 && sudut >= 0, `segitiga sasaran ${i}: jenis dihitung dari koordinat`);
      const ok = L.periksaSegitiga(L.pilihSegitiga(L.pilihSegitiga(s, "sisi", sisi), "sudut", sudut));
      cek(ok.ok && ok.k.segBenar.length === 1 && ok.k.segKe === i + 1 && ok.k.segSisi === -1, `segitiga sasaran ${i}: jenis tepat diterima`);
      cek(!L.periksaSegitiga(L.pilihSegitiga(L.pilihSegitiga(s, "sisi", (sisi + 1) % 3), "sudut", sudut)).ok, `segitiga sasaran ${i}: sisi keliru ditolak`);
    });
    cek(L.pilihSegitiga(k, "sisi", 4) === k, "segitiga: pilihan di luar daftar diabaikan");
  }
  /* Kalimat status tanpa awalan huruf kecil dan tanpa digit */
  {
    const k = L.awalEtalase();
    for (const f of [L.kalimatPilah, L.kalimatSisi, L.kalimatPohon, L.kalimatSegitiga]) cek(/^[A-Z]/.test(L.hurufBesar(f(k))) && tanpaDigit(f(k)) && bersih(f(k)) && !BUKAN_A.test(f(k)), `kalimat ${f.name}: awal huruf besar, tanpa digit`);
    cek(tanpaDigit(L.kalimatPilah({ ...k, pilahIsi: [3, 0, 0, 4, 0] })), "kalimat status banyak keramik dalam kata");
  }
  /* Misi */
  {
    const dA = MK.daftarMisiK4Bab5("A");
    cek(dA === MK.MISI_A && dA.length === 6 && dA.filter((m) => m.wajib).length === 4 && dA.filter((m) => !m.wajib).length === 2, "misi: enam misi, empat wajib, dua bebas");
    cek(dA.every((m) => m.id.startsWith("a-")) && new Set(dA.map((m) => m.id)).size === 6, "misi: id berawalan a- dan unik");
    cek(S.misiBaru(dA, L.awalEtalase(), new Set()).length === 0, "misi: keadaan awal tidak memenuhi misi");
    cek(dA.every((m) => !m.cek({ alat: "kerangka" })), "misi: alat lain tidak memenuhi misi");
    cek(dA.every((m) => tanpaDigit(m.teks) && bersih(m.teks) && !BUKAN_A.test(m.teks) && m.teks.length > 10 && m.teks.length < 120), "misi: teks tanpa digit, kata terlarang, dan istilah Sub-Bab B");
    const a = L.awalEtalase();
    sama(S.misiBaru(dA, { ...a, pilahBenar: [0] }, new Set()), ["a-pilah"], "misi: pilah");
    sama(S.misiBaru(dA, { ...a, sisiBenar: [0] }, new Set()), ["a-sisi"], "misi: sisi");
    sama(S.misiBaru(dA, { ...a, pohonBenar: [0] }, new Set()), ["a-pohon"], "misi: pohon");
    sama(S.misiBaru(dA, { ...a, segBenar: [0] }, new Set()), ["a-segitiga"], "misi: segitiga");
    sama(S.misiBaru(dA, { ...a, tolak: true }, new Set()), ["a-tolak"], "misi: tolak hanya dari penolakan memeriksa rak yang belum digolongkan");
    cek(S.misiBaru(dA, L.periksaSisi(a).k, new Set()).length === 0 && S.misiBaru(dA, L.periksaPohon(a).k, new Set()).length === 0 && S.misiBaru(dA, L.periksaSegitiga(a).k, new Set()).length === 0, "misi: penolakan alat sisi, pohon, dan segitiga tidak menghitung tantangan menolak");
    sama(S.misiBaru(dA, L.periksaPilah(a).k, new Set()), ["a-tolak"], "misi: penolakan alat pilah menghitung tantangan menolak");
    let k = { ...L.awalEtalase(), pilahIsi: DS.TARGET_PILAH[0].map(LC.sisiDari) };
    k = L.periksaPilah(k).k;
    sama(S.misiBaru(dA, k, new Set()), ["a-pilah"], "misi: rak benar lewat logika memenuhi a-pilah");
    sama(S.misiBaru(dA, { ...k, pilahBenar: [0, 1] }, new Set()), ["a-pilah", "a-dua"], "misi: dua rak benar memenuhi a-dua");
  }
}

/* ------------------------------ Mind-map dan Infografis ------------------------------ */
{
  cek(DK.LANGKAH_ETALASE.length === 5, "mind-map: lima label kosong sesuai isi (banyak label mengikuti isi, tidak dikunci empat)");
  const arti = DK.LANGKAH_ETALASE.map((l) => l.arti).join(" ");
  const judulSemua = DK.LANGKAH_ETALASE.map((l) => l.judul).join(" | ");
  cek([...DK.LANGKAH_ETALASE.map((l) => l.judul), ...DK.LANGKAH_ETALASE.map((l) => l.arti), DK.PETUNJUK_PETA_ETALASE, DK.SELESAI_PETA_ETALASE, DK.JUDUL_PETA_ETALASE].every((t) => tanpaDigit(t) && bersih(t) && !BUKAN_A.test(t)), "mind-map: tanpa digit, kata terlarang, dan istilah Sub-Bab B");
  cek(DK.LANGKAH_ETALASE.every((l) => l.judul.length <= 26 && KATA_PENDEK(l.judul)), "mind-map: judul langkah pendek, tiap kata paling banyak dua belas huruf (muat di 344 px)");
  cek(DK.LANGKAH_ETALASE.every((l, i) => l.arti.startsWith(`Langkah ${["satu", "dua", "tiga", "empat", "lima"][i]}.`)), "mind-map: arti dibacakan berurut dari langkah satu sampai lima");
  for (const m of ["segi banyak", "beraturan", "bersisi tiga", "segitiga", "segiempat", "segilima", "sejajar", "siku-siku", "penggaris", "penyiku", "pohon keluarga", "ciri"]) cek((arti + judulSemua).toLowerCase().includes(m), `mind-map: memuat ${m}`);
  cek(judulSemua.includes("Kenali") && judulSemua.includes("Pilah") && judulSemua.includes("sisi dan sudut") && judulSemua.includes("pohon keluarga"), "mind-map: langkah mengenali, Pilah Keramik, Sisi dan Sudut, dan Pohon Keluarga Bentuk");
  const TEMA_IKON = [0x1f537, 0x1f53a, 0x1f4d0, 0x1f333, 0x1f3fa, 0x1f4cf, 0x1f9f1, 0x1f6aa];
  cek(DK.LANGKAH_ETALASE.every((l) => emojiSah(l.ikon)) && new Set(DK.LANGKAH_ETALASE.map((l) => l.ikon)).size === DK.LANGKAH_ETALASE.length && emojiSah(DK.IKON_JUDUL_PETA_ETALASE), "mind-map: ikon tiap label berbeda, emoji sah");
  cek(DK.LANGKAH_ETALASE.every((l) => TEMA_IKON.includes(l.ikon.codePointAt(0))) && TEMA_IKON.includes(DK.IKON_JUDUL_PETA_ETALASE.codePointAt(0)), "mind-map: ikon hanya benda tema keramik dan bangun");

  /* Infografis: data keramik bersambung ke Sub-Bab B. */
  sama(DK.KERAMIK_INFO.map((k) => [k.nama, DK.sisiInfo(k), DK.sejajarInfo(k)]), [["Persegi", 4, 2], ["Jajargenjang", 4, 2], ["Trapesium", 4, 1], ["Segienam beraturan", 6, 3], ["Segitiga sama sisi", 3, 0]], "infografis: kontrak data (nama, sisi, pasang sisi sejajar) dihitung dari koordinat");
  cek(DK.KERAMIK_INFO.every((k) => G.KATALOG.some((b) => b.kunci === k.bangun)), "infografis: tiap baris menunjuk bangun katalog");
  sama(DK.KOLOM_INFO_ETALASE, ["Keramik", "Nama", "Sisi", "Sisi sejajar"], "infografis: judul kolom tampil");
  cek(DK.KERAMIK_INFO.every((k) => k.nama.split(/\s+/).length <= 3 && KATA_PENDEK(k.nama) && k.nama.length <= 18), "infografis: nama keramik pendek");
  for (const k of DK.KERAMIK_INFO)
    for (const kol of [0, 1, 2, 3]) {
      const s = DK.suaraSel(k, kol);
      cek(s.length > 8 && tanpaDigit(s) && bersih(s) && !BUKAN_A.test(s), `infografis ${k.kunci} kolom ${kol}: suara tanpa digit (${s})`);
    }
  for (const k of DK.KERAMIK_INFO) {
    cek(DK.suaraSel(k, 2) === `Sisinya ada ${LC.kataBil(DK.sisiInfo(k))}.`, `infografis ${k.kunci}: suara banyak sisi dieja`);
    cek(DK.suaraSel(k, 3) === (DK.sejajarInfo(k) === 0 ? "Tidak ada sisi yang sejajar." : DK.sejajarInfo(k) === 1 ? "Ada sepasang sisi yang sejajar." : `Ada ${LC.kataBil(DK.sejajarInfo(k))} pasang sisi yang sejajar.`), `infografis ${k.kunci}: suara sisi sejajar dieja`);
  }
  cek([DK.PETUNJUK1_INFO_ETALASE, DK.PETUNJUK2_INFO_ETALASE, DK.SELESAI1_INFO_ETALASE, DK.PESAN2_INFO_ETALASE].every((t) => tanpaDigit(t) && bersih(t) && !BUKAN_A.test(t)), "infografis: petunjuk dan pesan tanpa digit dan istilah Sub-Bab B");
  const a = DK.ACUAN_ETALASE;
  cek(a.contoh === "persegi" && a.kalimat.length === 5 && a.kalimat.every((x) => tanpaDigit(x.suara) && bersih(x.suara) && !BUKAN_A.test(x.suara)), "infografis: kartu acuan persegi, segiempat lain, dan segitiga, suara tanpa digit");
  cek(/Segitiga sama sisi/.test(a.kalimat[3].teks) && G.semuaSisiSama(G.bangun("segitiga-sama-sisi").titik) && /Segitiga siku-siku/.test(a.kalimat[4].teks) && G.banyakSiku(G.bangun("segitiga-siku").titik) === 1, "infografis: acuan segitiga sama sisi dan siku-siku cocok dengan koordinat");
  cek(DK.KERAMIK_INFO.length <= 6, "infografis: paling banyak enam baris supaya satu layar tanpa gulir");
  cek(a.kalimat[0].teks === "Persegi: 4 sisi sama panjang, 4 sudut siku-siku" && G.semuaSisiSama(G.bangun("persegi").titik) && G.banyakSiku(G.bangun("persegi").titik) === 4, "infografis: acuan persegi cocok dengan koordinat");
  cek(a.kalimat[1].teks === "Jajargenjang: 2 pasang sisi sejajar" && G.banyakSejajar(G.bangun("jajargenjang").titik) === 2 && !a.kalimat.some((x) => /jajargenjang[^.]*tidak siku/i.test(x.teks + x.suara)), "infografis: acuan jajargenjang dua pasang sisi sejajar (bukan pernyataan sudut tidak siku-siku yang tidak berlaku bagi persegi panjang)");
  cek(DK.ACUAN_ETALASE.kalimat.every((x) => !/tidak siku/i.test(x.teks + x.suara)) && Object.values(LC.CIRI_TEKS).every((t) => !/tidak siku/.test(t)), "tidak ada ciri pembeda 'tidak siku-siku' yang bertentangan dengan hubungan antar bangun");
  cek(/4 sisi sama panjang/.test(a.kalimat[2].teks) && G.semuaSisiSama(G.bangun("belah-ketupat").titik), "infografis: acuan belah ketupat cocok dengan koordinat");
}

/* ------------------------------ CPA: tiga tahap ------------------------------ */
const TAHAP = [
  ["Concrete", D.CONCRETE, "benda"],
  ["Pictorial", D.PICTORIAL, "diagram"],
  ["Abstract", D.ABSTRACT, "lambang"],
];
{
  cek(D.CONCRETE_ETALASE === D.CONCRETE && D.PICTORIAL_ETALASE === D.PICTORIAL && D.ABSTRACT_ETALASE === D.ABSTRACT, "nama ekspor untuk pemasang");
  cek(D.TEMA_ETALASE.concrete.nama === "Concrete" && D.TEMA_ETALASE.pictorial.nama === "Pictorial" && D.TEMA_ETALASE.abstract.nama === "Abstract", "tema tiga tahap");
  sama(D.CONCRETE.map((s) => s.nomor), [2, 3, 4], "nomor misi Concrete lanjut dari simulasi");
  sama(D.PICTORIAL.map((s) => s.nomor), [5, 6, 7], "nomor misi Pictorial");
  sama(D.ABSTRACT.map((s) => s.nomor), [8, 9, 10], "nomor misi Abstract");
  const SALAH = /gambar|petak|kisi|titik|kotak|emoji|diagram/i;
  const tanyaDari = (d) => (d.tipe === "sisi" ? d.tanya : null);
  // Jawaban dihitung ulang dari koordinat, tanpa memakai fungsi kunci.
  const hitung = (d, cara) => {
    const t = (b) => G.bangun(b).titik;
    switch (d.tipe) {
      case "kenali": {
        const n = t(d.b).length;
        return cara === "klik" ? ["", "", "", "segitiga", "segiempat", "segilima", "segienam"][n] : cara === "kanvas" ? n : d.tanya === "nama" ? ["", "", "", "segitiga", "segiempat", "segilima", "segienam"][n] : "beraturan";
      }
      case "pilah": {
        const n = d.daftar.map((b) => t(b).length);
        const odd = d.daftar.filter((_, i) => n.filter((x) => x === n[i]).length === 1);
        return cara === "klik" ? G.bangun(odd[0]).nama : cara === "kanvas" ? n.filter((x) => x === d.n).length : ["", "", "", "segitiga", "segiempat", "segilima", "segienam"][d.n];
      }
      case "sisi": {
        const ptk = t(d.b);
        if (cara === "kanvas") return d.tanya === "siku" ? G.indeksSiku(ptk).length : G.pasangSejajar(ptk).length;
        return G.bangun(d.b).nama;
      }
      case "jenis": {
        const ptk = t(d.b);
        const sd = G.hitungSudut(ptk);
        if (cara === "kanvas") return ptk.map((_, i) => G.sudutDalam(ptk, i)).filter((x) => x < 89.99).length;
        const sisiJ = G.jenisSegitigaSisi(ptk);
        const sudutJ = sd.siku === 1 ? "siku-siku" : sd.tumpul > 0 ? "tumpul" : "lancip";
        return d.menurut === "sisi" ? sisiJ : sudutJ;
      }
      case "pohon": {
        const a = LC.ANAK[d.i];
        return cara === "klik" ? G.bangun(a.hasil).nama : cara === "kanvas" ? G.pasangSejajar(t(a.hasil)).length : a.induk;
      }
    }
  };
  for (const [nama, soal, rupa] of TAHAP) {
    sama(soal.map((s) => s.cara), ["klik", "kanvas", "suara"], `${nama}: tiga cara menjawab`);
    const kanvas = [];
    let adaSalah = 0;
    const posisiKlik = new Set();
    for (const s of soal) {
      cek(s.langkah.length === 4 && s.langkah.map((q) => q.metode).join() === "igil,pilah,sisi,pohon", `${nama} misi ${s.nomor}: empat metode IGIL, Sort the Tiles, Sides and Corners, Shape Family Tree`);
      cek(bersih(s.judul) && bersih(s.cerita) && tanpaDigit(s.cerita) && !BUKAN_A.test(s.judul + s.cerita), `${nama} misi ${s.nomor}: judul dan cerita bersih`);
      cek(s.judul.startsWith(`Misi Etalase ${s.nomor}:`), `${nama} misi ${s.nomor}: judul berawalan Misi Etalase`);
      for (const q of s.langkah) {
        const l = q.langkah;
        const d = LC.dasarDari(l);
        const kunci = LC.kunciJawab(l, s.cara);
        cek(kunci !== null, `${nama} misi ${s.nomor} ${q.metode}: ada jawaban untuk cara ${s.cara}`);
        cek(LC.siapLangsung(l, rupa, s.cara) === (l.tipe !== "salah"), `${nama} misi ${s.nomor} ${q.metode}: siap langsung kecuali Cari kesalahan`);
        cek(q.suara === q.judul && tanpaDigit(q.suara) && bersih(q.suara) && !BUKAN_A.test(q.suara), `${nama} misi ${s.nomor} ${q.metode}: instruksi tanpa digit, kata terlarang, dan istilah Sub-Bab B`);
        cek(emojiSah(q.suara) && emojiSah(q.judul), `${nama} misi ${s.nomor}: emoji sah`);
        if (rupa === "lambang") cek(!SALAH.test(q.suara), `${nama} misi ${s.nomor} ${q.metode}: tahap Abstract tanpa menyebut gambar, petak, atau kisi`);
        const jenisMetode = { igil: ["kenali", "jenis"], pilah: ["pilah"], sisi: ["sisi"], pohon: ["pohon"] };
        cek(jenisMetode[q.metode].includes(d.tipe), `${nama} misi ${s.nomor}: metode ${q.metode} memakai tugas ${jenisMetode[q.metode]}`);
        // Bangun yang dipakai sah.
        const dipakai = d.tipe === "kenali" || d.tipe === "sisi" || d.tipe === "jenis" ? [d.b] : d.tipe === "pilah" ? d.daftar : [LC.ANAK[d.i].hasil, LC.ANAK[d.i].indukKunci];
        cek(dipakai.every((b) => G.KATALOG.some((x) => x.kunci === b)), `${nama} misi ${s.nomor} ${q.metode}: bangun ada di katalog`);
        // Jawaban dihitung dari koordinat.
        const h = hitung(d, s.cara);
        sama(kunci, typeof h === "number" ? { jenis: "angka", n: h } : { jenis: "nama", nama: h }, `${nama} ${d.tipe} cara ${s.cara}: jawaban benar dihitung dari koordinat`);
        // Syarat data tiap jenis tugas.
        if (d.tipe === "kenali" && s.cara === "suara" && d.tanya !== "nama") cek(G.beraturan(G.bangun(d.b).titik), `${nama} misi ${s.nomor}: bangun yang ditanya "beraturan" memang beraturan`);
        if (d.tipe === "kenali" && s.cara !== "suara") cek(G.banyakSisi(G.bangun(d.b).titik) >= 3 && G.banyakSisi(G.bangun(d.b).titik) <= 6, `${nama} misi ${s.nomor}: kenali satu sampai enam sisi`);
        if (d.tipe === "pilah") {
          cek(d.daftar.length >= 4 && d.daftar.length <= 6 && d.n >= 3 && d.n <= 6, `${nama} misi ${s.nomor}: rak berisi empat sampai enam keramik`);
          if (s.cara === "klik") {
            cek(LC.ganjil(d.daftar) !== "" && new Set(d.daftar).size === d.daftar.length && new Set(d.daftar.map((b) => G.bangun(b).nama)).size === d.daftar.length, `${nama} misi ${s.nomor}: tepat satu keramik tidak segolongan, nama unik`);
          }
          if (s.cara === "kanvas") cek(LC.banyakBersisi(d.daftar, d.n) >= 1 && LC.banyakBersisi(d.daftar, d.n) <= 6, `${nama} misi ${s.nomor}: banyak keramik hasil bagi satu angka`);
          if (s.cara === "suara") cek(LC.banyakBersisi(d.daftar, d.n) >= 1, `${nama} misi ${s.nomor}: ada keramik yang bersisi ${d.n}`);
        }
        if (d.tipe === "sisi") {
          if (s.cara === "kanvas") cek((d.tanya === "siku" ? G.banyakSiku(G.bangun(d.b).titik) : G.banyakSejajar(G.bangun(d.b).titik)) >= 1, `${nama} misi ${s.nomor}: jawaban sisi satu sampai sembilan`);
          if (s.cara !== "kanvas") cek(G.banyakSisi(G.bangun(d.b).titik) === 4 && Object.keys(LC.CAMPUR).includes(G.bangun(d.b).nama), `${nama} misi ${s.nomor}: klik dan suara memakai satu dari enam segiempat`);
        }
        if (d.tipe === "pohon" && s.cara === "kanvas") cek(G.banyakSejajar(G.bangun(LC.ANAK[d.i].hasil).titik) >= 1, `${nama} misi ${s.nomor}: bangun anak punya sisi sejajar`);
        if (d.tipe === "pohon" && s.cara === "suara") cek(["segiempat", "jajargenjang", "persegi panjang", "belah ketupat", "trapesium"].includes(kunci.nama), `${nama} misi ${s.nomor}: induk dapat diucapkan`);
        // Pilihan klik.
        if (s.cara === "klik") {
          const p = LC.pilihanKlik(l);
          cek(p.length === 3 && new Set(p).size === 3, `${nama} misi ${s.nomor} ${q.metode}: tiga pilihan klik berbeda (${p.join(" | ")})`);
          cek(p.includes(kunci.nama) && p[0] !== kunci.nama, `${nama} misi ${s.nomor} ${q.metode}: jawaban benar ada dan tidak di tombol pertama`);
          cek(LC.teksKunciKlik(l) === kunci.nama, `${nama} misi ${s.nomor} ${q.metode}: teks jawaban klik`);
          posisiKlik.add(p.indexOf(kunci.nama));
          if (l.tipe === "salah") cek(p.includes(l.jawabTokoh), `${nama} misi ${s.nomor}: jawaban tokoh ada di pilihan`);
          cek(p.every((x) => emojiSah(x) && bersih(x) && !BUKAN_A.test(x)), `${nama} misi ${s.nomor} ${q.metode}: pilihan bersih`);
          cek(p.every((x) => KATA_PENDEK(x) && x.length <= 20), `${nama} misi ${s.nomor} ${q.metode}: pilihan pendek`);
        }
        if (s.cara === "suara") {
          const p = LC.pilihanSuara(l, s.cara);
          const teksBenar = LC.teksKunciPilihan(kunci);
          cek(p.length === 3 && new Set(p).size === 3 && p.includes(teksBenar) && p[0] !== teksBenar, `${nama} misi ${s.nomor} ${q.metode}: pilihan ketuk cadangan suara (${p.join(" | ")})`);
          cek(K.cocokUcapan(teksBenar, kunci).cocok, `${nama} misi ${s.nomor}: pengenal ucapan mengenali jawaban`);
          cek(tanpaDigit(p.join(" ")), `${nama} misi ${s.nomor}: pilihan suara tanpa digit`);
          // Tiap pilihan suara bukan jawaban lain yang juga dikenali sebagai jawaban benar.
          cek(p.filter((x) => x !== teksBenar).every((x) => !K.cocokUcapan(x, kunci).cocok), `${nama} misi ${s.nomor}: pilihan salah tidak dikenali sebagai jawaban benar`);
        }
        if (s.cara === "kanvas") {
          cek(kunci.jenis === "angka" && kunci.n >= 1 && kunci.n <= 9, `${nama} misi ${s.nomor} ${q.metode}: kanvas satu angka satu sampai sembilan (${kunci.n})`);
          kanvas.push(kunci.n);
          cek(LC.pilihanSuara(l, s.cara).length === 0, `${nama} misi ${s.nomor}: kanvas tanpa pilihan suara`);
        }
        // Kalimat benar diawali huruf kapital dan tanpa spasi sebelum tanda baca.
        const kk = LC.kalimatKunci(l, s.cara);
        cek(/^[A-Z]/.test(kk) && !/ [.,:;!?]/.test(kk) && /[.]$/.test(kk) && bersih(kk) && !BUKAN_A.test(kk), `${nama} misi ${s.nomor} ${q.metode}: kalimat pembenaran (${kk})`);
        cek(tanpaDigit(LC.ucapkan(kk)), `${nama} misi ${s.nomor} ${q.metode}: kalimat pembenaran dieja tanpa digit (${LC.ucapkan(kk)})`);
        if (rupa === "lambang") cek(!SALAH.test(kk + LC.petunjukSalah(l, s.cara, "x")), `${nama} misi ${s.nomor} ${q.metode}: umpan balik Abstract tanpa menyebut gambar, petak, atau kisi`);
        // Petunjuk salah menunjuk kesalahan tanpa membocorkan.
        const pet = LC.petunjukSalah(l, s.cara, "x");
        cek(pet.length > 15 && bersih(pet) && tanpaDigit(pet) && !BUKAN_A.test(pet), `${nama} misi ${s.nomor} ${q.metode}: petunjuk salah tanpa digit`);
        if (l.tipe !== "salah") {
          const bocor = kunci.jenis === "angka" ? new RegExp(`\\b${kunci.n}\\b|\\b${LC.kataBil(kunci.n)}\\b`) : new RegExp(`\\b${kunci.nama}\\b`);
          cek(!bocor.test(pet), `${nama} misi ${s.nomor} ${q.metode}: petunjuk tidak menyebut jawaban (${pet})`);
        }
        cek(bersih(LC.kalimatTanya(l, s.cara)) && tanpaDigit(LC.kalimatTanya(l, s.cara)) && LC.kalimatTanya(l, s.cara).endsWith("?"), `${nama} misi ${s.nomor} ${q.metode}: pertanyaan tanpa digit`);
        // Kartu kata Abstract memuat ciri yang cukup untuk menjawab, dihitung dari koordinat, dan tidak menyebut gambar.
        if (rupa === "lambang") {
          const baris = LC.barisKartu(d, s.cara);
          cek(baris.length >= 2 && baris.every((x) => bersih(x) && !SALAH.test(x) && emojiSah(x)), `${nama} misi ${s.nomor} ${q.metode}: kartu kata bersih`);
          cek(baris.some((x) => x.includes("?")), `${nama} misi ${s.nomor} ${q.metode}: kartu kata menyisakan satu hal yang ditanyakan`);
          if (d.tipe === "sisi") {
            const t = G.bangun(d.b).titik;
            cek(baris.includes(`banyak sisi: ${t.length}`) && (s.cara === "kanvas" ? baris.includes(d.tanya === "siku" ? "sudut siku-siku: ?" : "pasang sisi sejajar: ?") : baris.includes(`pasang sisi sejajar: ${G.banyakSejajar(t)}`) && baris.includes(`sudut siku-siku: ${G.banyakSiku(t)}`) && baris.includes("nama bangun: ?")), `${nama} misi ${s.nomor}: kartu ciri sesuai koordinat`);
          }
          if (d.tipe === "pilah" && s.cara !== "suara") cek(d.daftar.every((b) => baris.includes(`${G.bangun(b).nama}: ${G.banyakSisi(G.bangun(b).titik)} sisi`)), `${nama} misi ${s.nomor}: kartu pilah memuat banyak sisi tiap keramik dari koordinat`);
        }
        void tanyaDari;
        if (l.tipe === "salah") {
          adaSalah += 1;
          const w = l;
          cek((w.dasar.tipe === "sisi" && q.metode === "sisi") || (w.dasar.tipe === "pohon" && q.metode === "pohon"), `${nama}: Cari kesalahan memakai metode yang sesuai dengan tugas dasarnya`);
          cek(w.alasan.length === 3 && new Set(w.alasan).size === 3 && w.benar >= 0 && w.benar <= 2, `${nama}: tiga alasan berbeda, satu benar`);
          cek(w.alasan.every((a2) => /^[A-Z]/.test(a2) && !/ [.,:;!?]/.test(a2) && bersih(a2) && !BUKAN_A.test(a2)), `${nama}: alasan diawali huruf kapital, tanpa spasi sebelum tanda baca, tanpa kata terlarang`);
          cek(/^[A-Z]/.test(w.keliru) && bersih(w.keliru) && /^[A-Z]/.test(w.kataTokoh) && bersih(w.kataTokoh) && !BUKAN_A.test(w.kataTokoh + w.keliru), `${nama}: kalimat tokoh dan penjelasan berhuruf kapital`);
          cek(["Satria", "Genta", "Laras"].includes(w.tokoh), `${nama}: tokoh Kelas 4`);
          cek(w.alasan[w.benar].startsWith(w.tokoh) && /keliru|benar/.test(w.alasan[w.benar]), `${nama}: alasan benar menyebut tokoh`);
          // Alasan tanpa digit dan tanpa menyebut jawaban akhir.
          cek(w.alasan.every((a2) => tanpaDigit(a2) && !new RegExp(`\\b${kunci.nama}\\b`).test(a2)), `${nama}: alasan tidak membocorkan jawaban benar (${kunci.nama})`);
          const dua = LC.petunjukSalah(w, "klik", w.jawabTokoh);
          cek(dua.startsWith(`Itu jawaban ${w.tokoh}`), `${nama}: pilih jawaban tokoh mendapat petunjuk tokoh`);
          cek(w.betul === true || w.jawabTokoh !== kunci.nama, `${nama}: jawaban tokoh ${w.betul ? "benar" : "keliru"} sesuai jawaban`);
          cek(w.betul ? w.jawabTokoh === kunci.nama : true, `${nama}: tokoh yang benar menjawab sama dengan jawaban`);
          cek(w.jawabTokoh === w.jawabTokoh.trim() && KATA_PENDEK(w.jawabTokoh), `${nama}: jawaban tokoh berupa nama bangun`);
        }
      }
    }
    sama(new Set(kanvas).size, 4, `${nama}: empat angka kanvas tidak kembar (${kanvas.join(",")})`);
    cek(adaSalah >= 1, `${nama}: ada Cari kesalahan`);
    cek(posisiKlik.size >= 2, `${nama}: posisi jawaban benar bervariasi`);
  }
  // Tidak ada tugas yang sama persis dalam satu tahap, dan jawaban "beraturan" lewat suara hanya sekali di seluruh bab.
  for (const [nama, soal] of TAHAP) {
    const sidik = soal.flatMap((s) => s.langkah.map((q) => JSON.stringify([LC.dasarDari(q.langkah), q.metode === "pohon" && s.cara === "kanvas" ? "" : ""]) + (LC.dasarDari(q.langkah).tipe === "pohon" ? "" : "")));
    cek(new Set(sidik).size === sidik.length, `${nama}: tidak ada tugas dasar yang sama persis`);
  }
  cek(TAHAP.flatMap(([, soal]) => soal.filter((s) => s.cara === "suara").flatMap((s) => s.langkah)).filter((q) => LC.kunciJawab(q.langkah, "suara")?.nama === "beraturan").length === 1, "jawaban beraturan lewat suara hanya sekali");
  const pohonSemua = TAHAP.flatMap(([, soal]) => soal.flatMap((s) => s.langkah.filter((q) => q.langkah.tipe === "pohon").map((q) => q.langkah.i + s.cara)));
  cek(pohonSemua.length === 8, "pohon: delapan tugas (satu lagi Cari kesalahan)");
  // Tugas suara untuk nama bangun meminta "nama bangunnya", dan pohon menyebut induk langsung.
  for (const [nama, soal] of TAHAP) for (const q of soal[2].langkah) {
    const d = LC.dasarDari(q.langkah);
    if (d.tipe === "sisi" || d.tipe === "pohon") cek(/Ucapkan nama bangun/.test(q.suara) && !/satu kata/.test(q.suara), `${nama}: tugas suara bernama dua kata meminta nama bangunnya`);
    if (d.tipe === "pohon") cek(/anak langsung/.test(q.suara) && /hanya kekurangan/.test(q.suara), `${nama}: pohon suara menyebut induk langsung`);
  }
  // Alasan Cari kesalahan sama-sama berawalan tokoh dan kata yang sama, dan tidak satu pun diawali kata yang membocorkan.
  for (const [nama, soal] of TAHAP) {
    const w = soal[0].langkah.map((q) => q.langkah).find((l) => l.tipe === "salah");
    const awal = w.alasan.map((a2) => a2.split(",")[0]);
    cek(new Set(awal).size === 1 && /^(Satria|Genta) (keliru|benar)$/.test(awal[0]), `${nama}: tiga alasan berawalan sama (${awal.join(" | ")})`);
  }
  cek(JSON.stringify(TAHAP.map(([, soal]) => soal[0].langkah.map((q) => q.langkah).find((l) => l.tipe === "salah").benar)) === "[0,2,1]", "posisi alasan benar divariasikan antar tahap");
  // Menurut buku: jenis segitiga (menurut sisi dan menurut sudut), segiempat sembarang, dan hubungan antar segiempat.
  const semuaTugas = TAHAP.flatMap(([, soal]) => soal.flatMap((s) => s.langkah.map((q) => ({ l: LC.dasarDari(q.langkah), cara: s.cara }))));
  const jenisTugas = semuaTugas.filter((t) => t.l.tipe === "jenis");
  cek(jenisTugas.length >= 4 && jenisTugas.some((t) => t.l.menurut === "sisi") && jenisTugas.some((t) => t.l.menurut === "sudut") && jenisTugas.some((t) => t.cara === "kanvas"), "buku: tugas jenis segitiga menurut sisi dan menurut sudut ada, juga satu lewat kanvas");
  cek(semuaTugas.some((t) => t.l.tipe === "sisi" && t.l.b === "segiempat-sembarang" && t.cara === "klik"), "buku: tugas segiempat sembarang (tidak ada sisi sama panjang)");
  cek(semuaTugas.some((t) => t.l.tipe === "pohon" && LC.ANAK[t.l.i].induk === "layang-layang" && LC.ANAK[t.l.i].hasil === "belah-ketupat"), "buku: tugas hubungan belah ketupat juga layang-layang");
  cek(LC.ANAK.some((a2) => a2.hasil === "persegi" && a2.induk === "persegi panjang") && LC.ANAK.some((a2) => a2.hasil === "persegi-panjang" && a2.induk === "jajargenjang"), "buku: persegi juga persegi panjang dan persegi panjang juga jajargenjang");
  cek(!G.punyaCiri(G.bangun("trapesium").titik, "sejajar-dua") && G.punyaCiri(G.bangun("trapesium").titik, "sejajar-satu"), "buku: trapesium tepat sepasang sisi sejajar, jadi bukan jajargenjang");
  for (const t of jenisTugas) {
    const tt = G.bangun(t.l.b).titik;
    cek(tt.length === 3, "jenis: bangun segitiga");
    if (t.cara === "kanvas") cek(LC.kunciJawab(t.l, "kanvas").n === G.hitungSudut(tt).lancip && G.hitungSudut(tt).lancip >= 1 && G.hitungSudut(tt).lancip <= 3, "jenis kanvas: banyak sudut lancip dari koordinat");
  }
  const psj = D.POIN_PENTING_SUARA.join(" ");
  cek(/tepat sepasang sisi sejajar/.test(psj) && /segiempat sembarang: tidak ada sisi yang sama panjang/i.test(psj) && /belah ketupat juga layang-layang/.test(psj) && /trapesium bukan jajargenjang/i.test(psj), "poin penting memuat trapesium tepat sepasang, segiempat sembarang, dan hubungan antar segiempat");
  // Satu jawaban benar menurut hubungan antar bangun di buku: pengecoh tidak boleh juga benar (persegi juga persegi panjang dan belah ketupat; persegi panjang juga jajargenjang; belah ketupat juga jajargenjang dan layang-layang).
  const BENAR_SEBAGAI = {
    persegi: ["persegi", "persegi panjang", "belah ketupat", "jajargenjang", "layang-layang", "segiempat"],
    "persegi-panjang": ["persegi panjang", "jajargenjang", "segiempat"],
    "belah-ketupat": ["belah ketupat", "jajargenjang", "layang-layang", "segiempat"],
    jajargenjang: ["jajargenjang", "segiempat"],
    "layang-layang": ["layang-layang", "segiempat"],
    trapesium: ["trapesium", "segiempat"],
    "segiempat-sembarang": ["segiempat"],
  };
  const SEGITIGA_BENAR = { "segitiga-sama-sisi": ["sama sisi", "sama kaki", "lancip"], "segitiga-sama-kaki": ["sama kaki", "lancip"], "segitiga-siku": ["sembarang", "siku-siku"], "segitiga-tumpul": ["sembarang", "tumpul"], "segitiga-sembarang": ["sembarang", "lancip"] };
  for (const [nama, soal] of TAHAP)
    for (const so of soal)
      for (const q of so.langkah) {
        const d = LC.dasarDari(q.langkah);
        const ket = `${nama} misi ${so.nomor} ${q.metode}`;
        if (d.tipe === "sisi" && so.cara !== "kanvas") {
          const opsi = so.cara === "klik" ? LC.pilihanKlik(q.langkah) : LC.pilihanSuara(q.langkah, "suara");
          const kunci = LC.kunciJawab(q.langkah, so.cara).nama;
          cek(opsi.filter((x) => x !== kunci).every((x) => !BENAR_SEBAGAI[d.b].includes(x)), `${ket}: pengecoh bukan jawaban benar menurut hubungan bangun (${opsi.join(" | ")})`);
        }
        if (d.tipe === "pohon" && so.cara === "klik") {
          const a2 = LC.ANAK[d.i];
          cek(a2.khusus === true || a2.lain.every((x) => !BENAR_SEBAGAI[a2.hasil].includes(x)), `${ket}: pengecoh pohon bukan jawaban benar menurut hubungan bangun`);
          if (a2.khusus) cek(/paling khusus/.test(q.suara) && /paling khusus/.test(LC.kalimatTanya(q.langkah, "klik")), `${ket}: soal meminta nama yang paling khusus`);
        }
        if (d.tipe === "pohon" && so.cara === "suara") {
          const a2 = LC.ANAK[d.i];
          cek(a2.khusus === true || a2.lain.every((x) => !BENAR_SEBAGAI[a2.hasil].includes(x)), `${ket}: pengecoh induk bukan induk yang benar`);
        }
        if (d.tipe === "jenis" && so.cara !== "kanvas") {
          const opsi = so.cara === "klik" ? LC.pilihanKlik(q.langkah) : LC.pilihanSuara(q.langkah, "suara");
          const kunci = LC.kunciJawab(q.langkah, so.cara).nama;
          cek(opsi.filter((x) => x !== kunci).every((x) => !SEGITIGA_BENAR[d.b].includes(x)), `${ket}: pengecoh jenis segitiga tidak juga benar (${opsi.join(" | ")})`);
        }
      }
  // Semua pasangan pohon: hasil punya ciri tambahan dan tidak ada pengecoh yang juga memenuhi hubungan (kecuali yang khusus).
  cek(LC.ANAK.filter((a2) => a2.hasil === "persegi").every((a2) => a2.khusus === true), "pohon: semua anak persegi bertanda paling khusus");
  // Segitiga sama kaki dibuat jelas: dua kaki jauh lebih panjang atau lebih pendek daripada alas (bukan hampir sama sisi).
  {
    const sk = G.bangun("segitiga-sama-kaki").titik;
    const sisiK = sk.map((_, i) => G.panjangSisi(sk, i)).sort((x, y) => x - y);
    cek(Math.max(sisiK[2] / sisiK[0], sisiK[0] / sisiK[0]) >= 1.5 || sisiK[1] / sisiK[0] >= 1.5, "segitiga sama kaki: alas jauh berbeda dari kaki (bukan hampir sama sisi)");
    cek(G.jenisSegitigaSisi(sk) === "sama kaki" && Math.abs(sisiK[1] - sisiK[2]) < 1e-9 || Math.abs(sisiK[0] - sisiK[1]) < 1e-9, "segitiga sama kaki: dua kaki tepat sama");
  }
  // Ukuran huruf gambar: SVG tugas tanpa teks kecil (>= 14 satuan pada viewBox 300) dan teks HTML paling kecil 12 px; Infografis >= 12 satuan.
  {
    const gm = readFileSync(new URL("GambarEtalase.tsx", folder), "utf8");
    const ukuranSvg = [...gm.matchAll(/fontSize=\{([\d.]+)\}/g)].map((m) => Number(m[1]));
    cek(ukuranSvg.every((u) => u >= 14), `gambar tugas: teks SVG paling kecil 14 satuan (${ukuranSvg.join(",")})`);
    const ukuranHtml = [...gm.matchAll(/text-\[(\d+(?:\.\d+)?)px\]/g)].map((m) => Number(m[1]));
    cek(ukuranHtml.length > 0 && ukuranHtml.every((u) => u >= 11), `gambar tugas: teks HTML paling kecil 11 px (${ukuranHtml.join(",")})`);
    const inf = readFileSync(new URL("InfoEtalase.tsx", folder), "utf8");
    cek([...inf.matchAll(/fontSize=\{([\d.]+)\}/g)].every((m) => Number(m[1]) >= 12), "infografis: teks SVG paling kecil 12 satuan");
    cek([...inf.matchAll(/text-\[(\d+(?:\.\d+)?)px\]/g)].every((m) => Number(m[1]) >= 10.5), "infografis: teks HTML paling kecil 10,5 px");
    const lg = readFileSync(new URL("LangkahEtalase.tsx", folder), "utf8");
    cek(/% 2 \+ 1/.test(lg) && /selalu di urutan kedua/.test(lg), "Cari kesalahan: alasan benar selalu di urutan kedua atau ketiga dan tombol benar atau salah yang benar di urutan kedua");
  }
  // Tahap: Concrete salah (Satria), Pictorial benar (Genta), Abstract salah (Satria).
  const salahDi = (soal) => soal[0].langkah.map((q) => q.langkah).find((l) => l.tipe === "salah");
  cek(salahDi(D.CONCRETE).tokoh === "Satria" && !salahDi(D.CONCRETE).betul && salahDi(D.CONCRETE).dasar.tipe === "sisi", "Concrete: Satria keliru menyebut layang-layang belah ketupat");
  cek(salahDi(D.PICTORIAL).tokoh === "Genta" && salahDi(D.PICTORIAL).betul === true && salahDi(D.PICTORIAL).dasar.tipe === "sisi", "Pictorial: Genta benar");
  cek(salahDi(D.ABSTRACT).tokoh === "Satria" && !salahDi(D.ABSTRACT).betul && salahDi(D.ABSTRACT).dasar.tipe === "pohon", "Abstract: Satria keliru pada pohon keluarga");
  const idxBenar = TAHAP.map(([, s]) => salahDi(s).benar);
  cek(new Set(idxBenar).size >= 2, "alasan benar tidak selalu pada indeks yang sama");
  // Seed alur: layang-layang yang dikira belah ketupat; trapesium punya sepasang sisi sejajar.
  const sc = salahDi(D.CONCRETE);
  cek(sc.dasar.b === "layang-layang" && sc.jawabTokoh === "belah ketupat" && /belah ketupat/.test(sc.kataTokoh) && /sisi yang sama panjang/.test(sc.kataTokoh) && G.pasanganSebelahSama(G.bangun("layang-layang").titik) === 2 && !G.semuaSisiSama(G.bangun("layang-layang").titik), "seed Concrete: layang-layang dikira belah ketupat karena sama-sama punya sisi sama panjang (hanya dua pasang bersebelahan)");
  const sp = salahDi(D.PICTORIAL);
  cek(sp.dasar.b === "trapesium" && sp.jawabTokoh === "trapesium" && /sepasang sisi yang sejajar/.test(sp.kataTokoh) && G.banyakSejajar(G.bangun("trapesium").titik) === 1, "seed Pictorial: trapesium punya sepasang sisi sejajar (benar)");
  const sa = salahDi(D.ABSTRACT);
  cek(sa.dasar.i === 1 && LC.ANAK[1].hasil === "belah-ketupat" && sa.jawabTokoh === "persegi panjang" && LC.pilihanKlik(sa.dasar).includes("persegi panjang"), "seed Abstract: jajargenjang ditambah empat sisi sama panjang menjadi belah ketupat, bukan persegi panjang");
  for (const [nama, soal] of TAHAP) sama(soal.reduce((n, s) => n + s.langkah.length, 0), 12, `${nama}: dua belas tugas`);
  // Semua bangun penting muncul di tiap tahap dan ada segi banyak beraturan serta tidak beraturan.
  for (const [nama, soal] of TAHAP) {
    const dipakai = new Set(soal.flatMap((s) => s.langkah).flatMap((q) => { const d = LC.dasarDari(q.langkah); return d.tipe === "kenali" || d.tipe === "sisi" || d.tipe === "jenis" ? [d.b] : d.tipe === "pilah" ? d.daftar : [LC.ANAK[d.i].hasil]; }));
    cek(dipakai.size >= 12, `${nama}: banyak ragam bangun (${dipakai.size})`);
    cek(["segilima-beraturan", "segienam-beraturan", "segitiga-sama-sisi", "segilima-sembarang", "segienam-sembarang"].some((b) => dipakai.has(b)), `${nama}: ada segi banyak beraturan atau tidak beraturan`);
  }
  // Poin penting dan jembatan.
  cek(D.POIN_PENTING.length === 7 && D.POIN_PENTING_SUARA.length === 7 && D.POIN_PENTING_SUARA.every(tanpaDigit) && D.POIN_PENTING.every(bersih) && D.POIN_PENTING.every((p) => !BUKAN_A.test(p)), "poin penting: tujuh butir, suara tanpa digit, tanpa istilah Sub-Bab B");
  cek(D.POIN_PENTING.every((p) => /^[A-Z]/.test(p) && !/ [.,:;!?]/.test(p)), "poin penting: huruf kapital dan tanpa spasi sebelum tanda baca");
  const ps = D.POIN_PENTING_SUARA.join(" ");
  cek(ps.includes("paling sedikit tiga ruas garis lurus") && /beraturan/.test(ps) && /sama sisi, sama kaki, dan sembarang/.test(ps) && /siku-siku, lancip, dan tumpul/.test(ps) && ps.includes("empat sisi sama panjang dan empat sudut siku-siku") && ps.includes("dua pasang sisi sejajar") && /sepasang sisi sejajar/.test(ps) && /layang-layang/i.test(ps), `poin penting: segi banyak, segitiga, persegi, jajargenjang, layang-layang, dan trapesium diucapkan dengan kata: ${ps}`);
  cek(D.POIN_PENTING.some((p) => p.includes("4 sisi sama panjang dan 4 sudut siku-siku")) && D.POIN_PENTING.some((p) => p.includes("2 pasang sisi sejajar")), "poin penting: ciri tertulis dengan angka");
  cek(/Pak Rudi/.test(D.PENUTUP_A) && /keping/.test(D.PENUTUP_A) && /mosaik/.test(D.PENUTUP_A) && /pecah/.test(D.PENUTUP_A) && tanpaDigit(D.PENUTUP_A) && bersih(D.PENUTUP_A) && !BUKAN_A.test(D.PENUTUP_A), "jembatan ke Sub-Bab B: Pak Rudi datang dengan keping keramik pecah");
  for (const [nama, soal] of TAHAP) for (const s of soal) for (const q of s.langkah) cek(!/\b(Raka|Salsa|Bima|Pak Joko|Helen|Tiara|Slamet|pizza|Bu Wulan|Pak Joyo|batik|kain|angklung|Bu Ratri|Pak Gunawan|kursi|Bu Sinta|Pak Anto|kolam|ember|ubin)\b/i.test(q.suara + s.cerita + s.judul), `${nama}: tanpa tokoh atau benda lama`);
}

/* ------------------------------ Pengenal ucapan ------------------------------ */
{
  sama(K.kataDariUcapan("jajar genjang"), ["jajargenjang"], "ucapan: jajargenjang");
  sama(K.kataDariUcapan("persegi panjang"), ["persegi panjang"], "ucapan: persegi panjang bukan persegi");
  sama(K.kataDariUcapan("persegi"), ["persegi"], "ucapan: persegi");
  sama(K.kataDariUcapan("belah ketupat"), ["belah ketupat"], "ucapan: belah ketupat");
  sama(K.kataDariUcapan("layang-layang"), ["layang-layang"], "ucapan: layang-layang");
  sama(K.kataDariUcapan("segi lima"), ["segilima"], "ucapan: segi lima");
  sama(K.kataDariUcapan("tidak beraturan tapi sejajar"), ["sejajar"], "ucapan: kata yang didahului tidak diabaikan");
  sama(K.kataDariUcapan("bukan trapesium, jajargenjang"), ["jajargenjang"], "ucapan: bukan trapesium, jajargenjang");
  cek(K.cocokUcapan("beraturan", { jenis: "nama", nama: "beraturan" }).cocok && !K.cocokUcapan("sejajar", { jenis: "nama", nama: "beraturan" }).cocok, "ucapan: cocok hanya bila sama");
  cek(!K.cocokUcapan("persegi panjang", { jenis: "nama", nama: "persegi" }).cocok && K.cocokUcapan("persegi panjang", { jenis: "nama", nama: "persegi panjang" }).cocok, "ucapan: persegi panjang tidak dihitung persegi");
  sama(K.angkaDariUcapan("lima dan 7"), [5, 7], "ucapan: angka dari kata dan digit");
  cek(K.cocokUcapan("delapan", { jenis: "angka", n: 8 }).cocok && !K.cocokUcapan("tujuh", { jenis: "angka", n: 8 }).cocok, "ucapan: angka delapan");
  cek(K.cocokUcapan("", { jenis: "nama", nama: "segitiga" }).terdengar.length === 0, "ucapan: sepi tidak terdengar apa pun");
  cek(EJ.ejaK4B5("4 sisi sama panjang dan 2 pasang sisi") === "empat sisi sama panjang dan dua pasang sisi", "pengeja suara bab: bilangan");
}

/* ------------------------------ Berkas folder ------------------------------ */
{
  const berkas = readdirSync(folder).filter((f) => /\.(ts|tsx)$/.test(f));
  for (const f of ["data.ts", "data-kartu.ts", "data-sim.ts", "logika.ts", "logika-cpa.ts", "logika-bangun.ts", "periksa.ts", "GambarEtalase.tsx", "JawabEtalase.tsx", "LangkahEtalase.tsx", "TahapEtalase.tsx", "PetaEtalase.tsx", "InfoEtalase.tsx", "SimulasiEtalaseKeramik.tsx"]) cek(berkas.includes(f), `${f} ada`);
  cek(!berkas.some((f) => /Peta(Kartu)?Kartu|Infografis/.test(f)), "tidak memakai komponen kartu lama");
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folder), "utf8");
    cek(emojiSah(s) && !DILARANG.some((c) => [...s].some((x) => x.codePointAt(0) === c)) && !IKAN.some((c) => [...s].some((x) => x.codePointAt(0) === c)), `${f}: emoji paling tinggi U+1FA95, tanpa ZWJ, ikan, dan emoji yang tampil kosong`);
    cek(!/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}|\\u\{1FA74\}|\\u\{1F39F\}|\\u2602|\\u\{1FA9F\}|\\u\{1FAA3\}/i.test(s), `${f}: kode emoji sah`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(!/senilai/i.test(s), `${f}: tanpa kata senilai`);
    cek(!/ubin|k4b4|ember-k4b4b|angklung|batik/i.test(s), `${f}: tidak merujuk Bab 4 atau bab lain`);
    cek(!/dekomposisi|komposisi|tangram|susun|mosaik-k4b5b|mosaik_k4b5b|KeadaanMosaik/i.test(s), `${f}: tanpa istilah dan folder Sub-Bab B`);
    const impor = [...s.matchAll(/from "([^"]+)"/g)].map((m) => m[1]);
    cek(impor.every((i) => !/SubBabK4B5|kit-k4b5|infografis-k4b5|skenario-k4b5|mesin-data-k4b5|lab-ciri|lab-susun|SimulasiLabCiri|SimulasiLabSusun|model-bangun-k4b5|model-susun-k4b5|peta-kartu|mosaik-k4b5b/.test(i)), `${f}: tidak mengimpor berkas lama Bab 5, komponen kartu lama, atau folder Sub-Bab B`);
  }
  const gambar = readFileSync(new URL("GambarEtalase.tsx", folder), "utf8");
  cek(/muatkan/.test(gambar) && /tandaSiku/.test(gambar) && /tandaSejajar/.test(gambar) && /tandaSama/.test(gambar), "gambar memakai geometri murni yang diuji (bangun dari koordinat titik sudut)");
  cek(!/flex-wrap/.test(gambar) && !/<img/.test(gambar), "gambar tanpa flex-wrap");
  cek(!berkas.some((f) => /capitalize/.test(readFileSync(new URL(f, folder), "utf8"))), "tanpa CSS capitalize");
  const lang = readFileSync(new URL("LangkahEtalase.tsx", folder), "utf8");
  cek(/Pikirkan lagi apa yang \$\{l\.tokoh\} lakukan/.test(lang) && !/Lihat lagi\. \$\{l\.keliru\}|belum tepat\. \$\{l\.keliru\}/.test(lang), "Cari kesalahan: salah memilih keputusan atau alasan hanya mengarahkan, tidak membocorkan");
  const sim = readFileSync(new URL("SimulasiEtalaseKeramik.tsx", folder), "utf8");
  cek(/setCatatan\(ucap \?\? ""\)/.test(sim) && /Keramik/.test(sim) && /grid grid-cols-2 gap-2/.test(sim) && !/flex-wrap/.test(sim), "simulasi: pesan lama dikosongkan, empat alat dalam grid dua kali dua, bangun digambar dari koordinat");
  const mm = readFileSync(new URL("PetaEtalase.tsx", folder), "utf8");
  cek(/export default function PetaEtalase/.test(mm) && /export \{ PetaEtalase \}/.test(mm) && /speakGuru, onLanjut, teksLanjut/.test(mm) && !/PetaLabel|PetaKartu/.test(mm), "Mind-map: rancangan sendiri (bukan PetaLabel) dengan ekspor default dan bernama dan props speakGuru, onLanjut, teksLanjut");
  cek(/<Keramik/.test(mm) && /BENTUK\[i\]/.test(mm) && /RAK/.test(mm) && /LANGKAH_ETALASE\.length/.test(mm) && !/flex-wrap/.test(mm) && /etalase-kaca/.test(mm), "Mind-map: etalase kaca berisi keramik SVG dari koordinat, label sebanyak langkah, tanpa flex-wrap");
  const pm = /const BENTUK = \[([^\]]+)\]/.exec(mm);
  const bentukMm = pm ? pm[1].split(",").map((x) => x.trim().replace(/"/g, "")) : [];
  cek(bentukMm.length === DK.LANGKAH_ETALASE.length && bentukMm.every((b) => G.KATALOG.some((x) => x.kunci === b)) && new Set(bentukMm).size === bentukMm.length, "Mind-map: satu keramik katalog berbeda untuk tiap label");
  const dl = readFileSync(new URL("InfoEtalase.tsx", folder), "utf8");
  cek(/export default function InfoEtalase/.test(dl) && /export \{ InfoEtalase \}/.test(dl) && /speakGuru, onLanjut, teksLanjut/.test(dl) && !/InfoKartu|InfografisKartu/.test(dl) && !/flex-wrap/.test(dl), "Infografis: rancangan sendiri (bukan InfoKartu) dengan ekspor default dan bernama dan props speakGuru, onLanjut, teksLanjut, tanpa flex-wrap");
  cek(/lembar-katalog/.test(dl) && /kartuBangun/.test(dl) && /KERAMIK_INFO\.map\(kartuBangun\)/.test(dl) && /<Keramik/.test(dl) && /sisiInfo\(k\)/.test(dl) && /sejajarInfo\(k\)/.test(dl) && /selesai/.test(dl) && /kartu === 1 && selesai/.test(dl), "Infografis: lembar katalog berisi kartu bangun dari koordinat, nama dan angka tertutup, BERIKUTNYA hanya setelah semua terbuka");
  const pohonSrc = /const POHON[^=]*= \[([\s\S]*?)\n\];/.exec(dl);
  const kunciPohon = pohonSrc ? [...pohonSrc[1].matchAll(/b: "([^"]+)"/g)].map((m) => m[1]) : [];
  cek(kunciPohon.length === 7 && kunciPohon.every((b) => G.KATALOG.some((x) => x.kunci === b)) && /CABANG/.test(dl) && /SEGITIGA/.test(dl) && /ACUAN_ETALASE/.test(dl), "Infografis kartu 2: pohon keluarga segiempat dan jenis segitiga dari bangun katalog");
  const th = readFileSync(new URL("TahapEtalase.tsx", folder), "utf8");
  cek(/export default function TahapEtalase/.test(th) && /poinPenting/.test(th) && /PENUTUP_A/.test(th), "Tahap: ekspor default dan Poin Penting dengan jembatan");
  cek(!/flex-wrap/.test(th), "tahap tanpa flex-wrap (kemajuan berupa kisi tetap)");
  const sa2 = readFileSync(new URL("../SimulasiK4Bab5.tsx", folder), "utf8");
  cek(/misiDaftar: daftarMisiEtalase\("A"\)/.test(sa2) && /SimulasiEtalaseKeramik/.test(sa2) && /laporMisiEtalase\(daftarMisiEtalase\("A"\), k, a\.capai\)/.test(sa2), "SimulasiK4Bab5: Sub-Bab A memakai misiDaftar dan laporMisi");
  cek(MT.misiAwalK4Bab5("A").includes(DS.MISI_ETALASE_TEKS), "misi awal Sub-Bab A memuat teks misi");
}

console.log(`Uji Etalase Keramik Kelas 4 Bab 5 A: ${lulus} lulus, ${gagal} gagal`);
process.exit(gagal ? 1 : 0);
