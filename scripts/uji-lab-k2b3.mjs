// Uji logika simulasi Matematika Kelas 2 Bab 3 (lab bentuk datar, bengkel urai 2D, lereng bangun ruang).
// Jalankan: node --no-warnings scripts/uji-lab-k2b3.mjs
import * as B from "../src/components/modul/lab-bentuk-k2b3.ts";
import * as U from "../src/components/modul/lab-urai-k2b3.ts";
import * as R from "../src/components/modul/lab-ruang-k2b3.ts";
import * as P from "../src/components/modul/lab-pola-k2b3.ts";
import * as C from "../src/components/modul/lab-cetak-k2b3.ts";
import * as D from "../src/components/modul/mesin-detektif-k2b3.ts";

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
const dekat = (a, b, pesan, tol = 1e-6) => cek(Math.abs(a - b) <= tol, `${pesan}: ${a} != ${b}`);

/* ------------------------------ Lab bentuk datar ------------------------- */
sama(B.batasSisi(2), 3, "batas bawah sisi");
sama(B.batasSisi(9), 6, "batas atas sisi");
for (const n of B.SEGI) {
  const t = B.titikSegi(n, 60, 0);
  sama(t.length, n, `titik segi-${n}`);
  const s = B.panjangSisi(t);
  cek(s.every((x) => Math.abs(x - s[0]) < 1e-6), `segi-${n} beraturan`);
  for (const putar of [30, 90, 330]) {
    const tp = B.titikSegi(n, 60, putar);
    dekat(B.panjangSisi(tp)[0], s[0], `putar ${putar} tidak mengubah sisi segi-${n}`);
  }
  const b = { tipe: "segi", n };
  sama(B.ciri(b), { sisiLurus: n, sudut: n, garisLengkung: false }, `ciri segi-${n}`);
  cek(B.kalimatBentuk(b).includes(`${n} sisi lurus`) && B.kalimatBentuk(b).includes(`${n} sudut`), `kalimat segi-${n}`);
  sama(B.titikNomorSisi(t, 8).length, n, `nomor sisi segi-${n}`);
}
sama(B.namaBentuk({ tipe: "segi", n: 3 }), "Segitiga", "nama 3");
sama(B.namaBentuk({ tipe: "segi", n: 4 }), "Segi empat", "nama 4");
sama(B.namaBentuk({ tipe: "segi", n: 5 }), "Segi lima", "nama 5");
sama(B.namaBentuk({ tipe: "segi", n: 6 }), "Segi enam", "nama 6");
for (const jenis of ["lingkaran", "lonjong"]) {
  const b = { tipe: "lengkung", jenis };
  sama(B.ciri(b), { sisiLurus: 0, sudut: 0, garisLengkung: true }, `ciri ${jenis}`);
  sama(B.kategori(b), "Bentuk lengkung", `kategori ${jenis}`);
}
sama(B.kategori({ tipe: "segi", n: 5 }), "Segi banyak", "kategori segi");
sama(B.putarBatas(45), 60, "putar dibulatkan ke 30");
sama(B.putarBatas(-30), 330, "putar negatif membungkus");
sama(B.putarBatas(360), 0, "putar 360 menjadi 0");
cek(B.ucapanBentuk({ tipe: "segi", n: 6 }, 90, 1).includes("tetap sama"), "ucapan menyebut ciri tetap setelah diputar");
cek(!B.ucapanBentuk({ tipe: "segi", n: 6 }, 0, 1).includes("tetap sama"), "tanpa putar tidak menyebut perubahan");
cek(B.SKALA.length === 3 && B.NAMA_SKALA.length === 3, "tiga ukuran");

/* ------------------------------ Bengkel urai 2D -------------------------- */
const jumlahLuas = (k) => k.reduce((s, x) => s + x.luas, 0);
const ring = (bentuk, garis) => U.ringkas(U.uraikan(bentuk, garis));

for (const bentuk of U.URUT_BENTUK) {
  const utuh = U.uraikan(bentuk, []);
  sama(utuh.length, 1, `${bentuk} utuh 1 keping`);
  dekat(utuh[0].luas, U.luasBentuk(bentuk), `${bentuk} luas utuh`, 1e-3);
  // semua kombinasi garis: luas total tetap, urutan tidak memengaruhi.
  const ids = U.GARIS_URAI[bentuk].map((g) => g.id);
  for (let m = 0; m < 1 << ids.length; m += 1) {
    const pilih = ids.filter((_, i) => m & (1 << i));
    const k = U.uraikan(bentuk, pilih);
    dekat(jumlahLuas(k), U.luasBentuk(bentuk), `${bentuk} ${pilih.join("+")} luas total`, 1e-2);
    const balik = U.uraikan(bentuk, [...pilih].reverse());
    sama(U.ringkas(balik), U.ringkas(k), `${bentuk} ${pilih.join("+")} urutan tidak berpengaruh`);
    cek(k.every((x) => x.luas > 1e-3 && x.titik.length >= 3), `${bentuk} ${pilih.join("+")} keping sah`);
  }
}

sama(ring("persegi", []), [{ nama: "Persegi", jumlah: 1 }], "persegi utuh dinamai persegi");
sama(ring("persegiPanjang", []), [{ nama: "Persegi panjang", jumlah: 1 }], "persegi panjang utuh");
sama(ring("segienam", []), [{ nama: "Segi enam", jumlah: 1 }], "segi enam utuh");
sama(ring("persegi", ["d1"]), [{ nama: "Segitiga", jumlah: 2 }], "persegi 1 diagonal");
sama(ring("persegi", ["d1", "d2"]), [{ nama: "Segitiga", jumlah: 4 }], "persegi 2 diagonal");
sama(ring("persegi", ["tegak"]), [{ nama: "Persegi panjang", jumlah: 2 }], "persegi garis tegak");
sama(ring("persegi", ["tegak", "datar"]), [{ nama: "Persegi", jumlah: 4 }], "persegi dua garis tengah");
sama(ring("persegi", ["d1", "tegak"]), [{ nama: "Segitiga", jumlah: 2 }, { nama: "Segi empat", jumlah: 2 }], "persegi diagonal + tegak");
sama(ring("persegiPanjang", ["tegak"]), [{ nama: "Persegi panjang", jumlah: 2 }], "persegi panjang garis tegak");
sama(ring("persegiPanjang", ["tegak", "datar"]), [{ nama: "Persegi panjang", jumlah: 4 }], "persegi panjang dua garis tengah");
sama(ring("persegiPanjang", ["d1", "d2"]), [{ nama: "Segitiga", jumlah: 4 }], "persegi panjang 2 diagonal");
sama(ring("segienam", ["AD", "BE", "CF"]), [{ nama: "Segitiga", jumlah: 6 }], "segi enam lewat tengah = 6 segitiga");
sama(ring("segienam", ["AC", "AD", "AE"]), [{ nama: "Segitiga", jumlah: 4 }], "segi enam dari satu titik = 4 segitiga");
sama(ring("segienam", ["AD"]), [{ nama: "Segi empat", jumlah: 2 }], "segi enam 1 garis tengah = 2 segi empat");
sama(ring("segienam", ["AC"]), [{ nama: "Segitiga", jumlah: 1 }, { nama: "Segi lima", jumlah: 1 }], "segi enam A-C = segitiga + segi lima");

// Pola n-2: dari satu titik pada segi enam menghasilkan 6-2 segitiga.
sama(U.uraikan("segienam", ["AC", "AD", "AE"]).length, 6 - 2, "pola banyak segitiga n-2");

// Contoh cepat memakai id garis yang ada.
for (const bentuk of U.URUT_BENTUK) {
  const ids = U.GARIS_URAI[bentuk].map((g) => g.id);
  for (const c of U.CONTOH_URAI[bentuk]) cek(c.garis.every((g) => ids.includes(g)), `contoh ${bentuk} ${c.nama} memakai garis sah`);
}

// Merenggangkan dan merapatkan.
const k4 = U.uraikan("persegi", ["d1", "d2"]);
const pusat = U.pusatBentuk("persegi");
sama(U.geserKeping(k4[0], pusat, 0), k4[0].titik, "rapat = posisi semula");
const geser = U.geserKeping(k4[0], pusat, 3);
cek(JSON.stringify(geser) !== JSON.stringify(k4[0].titik), "renggang menggeser keping");
dekat(U.luasPoligon(geser), k4[0].luas, "menggeser tidak mengubah luas keping", 1e-6);
const k1 = U.uraikan("persegi", []);
sama(U.geserKeping(k1[0], pusat, 3), k1[0].titik, "keping tunggal tidak bergeser");

cek(U.kalimatUrai(k4).includes("4 keping") && U.kalimatUrai(k4).includes("4 segitiga"), "kalimat persegi 2 diagonal");
cek(U.kalimatUrai(k1).includes("utuh"), "kalimat utuh");
cek(U.ucapanUrai("segienam", U.uraikan("segienam", ["AD", "BE", "CF"])).includes("Semua kepingnya segitiga"), "ucapan semua segitiga");
cek(U.ucapanUrai("persegi", k4).includes("kembali seperti semula"), "ucapan menyebut menyusun kembali");

/* ------------------------------ Lereng bangun ruang ---------------------- */
sama(R.URUT_RUANG.length, 5, "lima bangun ruang");
sama(R.CIRI_RUANG.kubus, { datar: 6, lengkung: 0, ditumpuk: true }, "ciri kubus");
sama(R.CIRI_RUANG.balok, { datar: 6, lengkung: 0, ditumpuk: true }, "ciri balok");
sama(R.CIRI_RUANG.tabung, { datar: 2, lengkung: 1, ditumpuk: true }, "ciri tabung");
sama(R.CIRI_RUANG.kerucut, { datar: 1, lengkung: 1, ditumpuk: false }, "ciri kerucut");
sama(R.CIRI_RUANG.bola, { datar: 0, lengkung: 1, ditumpuk: false }, "ciri bola");
sama(R.kelompokPermukaan("kubus"), "Permukaan datar saja", "kelompok kubus");
sama(R.kelompokPermukaan("bola"), "Permukaan lengkung saja", "kelompok bola");
sama(R.kelompokPermukaan("tabung"), "Permukaan datar dan lengkung", "kelompok tabung");
sama(R.lepas("bola", "berdiri").gerak, "menggelinding", "bola menggelinding");
sama(R.lepas("bola", "rebah").gerak, "menggelinding", "bola rebah menggelinding");
sama(R.lepas("kubus", "berdiri").gerak, "diam", "kubus diam");
sama(R.lepas("balok", "rebah").gerak, "diam", "balok rebah diam");
sama(R.lepas("tabung", "berdiri").gerak, "diam", "tabung berdiri diam");
sama(R.lepas("tabung", "rebah").gerak, "menggelinding", "tabung rebah menggelinding");
sama(R.lepas("kerucut", "berdiri").gerak, "diam", "kerucut berdiri diam");
sama(R.lepas("kerucut", "rebah").gerak, "melingkar", "kerucut rebah melingkar");
// Hasil menggelinding hanya bila permukaan lengkung yang menyentuh lereng: benda tanpa permukaan lengkung tidak pernah bergerak.
for (const r of R.URUT_RUANG) {
  for (const p of ["berdiri", "rebah"]) {
    const h = R.lepas(r, p);
    if (R.CIRI_RUANG[r].lengkung === 0) sama(h.gerak, "diam", `${r} ${p} tanpa lengkung tidak bergerak`);
    cek(h.alasan.length > 10, `alasan ${r} ${p}`);
  }
}
sama(R.gerakAnimasi("diam"), { jarak: 0, putar: 0 }, "animasi diam");
cek(R.gerakAnimasi("menggelinding").jarak > R.gerakAnimasi("melingkar").jarak, "menggelinding lebih jauh dari melingkar");
cek(R.kalimatRuang("tabung").includes("2 permukaan datar") && R.kalimatRuang("tabung").includes("1 permukaan lengkung"), "kalimat tabung");
cek(R.kalimatRuang("bola").includes("tidak punya permukaan datar"), "kalimat bola");
cek(R.ucapanRuang("bola", "berdiri", true).includes("menggelinding"), "ucapan setelah lepas");
cek(R.ucapanRuang("bola", "berdiri", false).includes("Tekan lepas"), "ucapan sebelum lepas");

/* ------------------------------ Cetakan dan putar (Sub-Bab A) ------------- */
{
  const lingkaran = { tipe: "lengkung", jenis: "lingkaran" };
  const lonjong = { tipe: "lengkung", jenis: "lonjong" };
  for (let d = 0; d < 360; d += 30) cek(B.pasDenganCetakan(lingkaran, d), `lingkaran selalu pas (${d})`);
  sama(B.putaranPas(lingkaran).length, 12, "lingkaran pas di dua belas putaran");
  sama(B.putaranPas(lonjong), [0, 180], "lonjong hanya pas di 0 dan 180");
  sama(B.putaranPas({ tipe: "segi", n: 3 }), [0, 120, 240], "segitiga pas tiap 120");
  sama(B.putaranPas({ tipe: "segi", n: 4 }), [0, 90, 180, 270], "segi empat pas tiap 90");
  sama(B.putaranPas({ tipe: "segi", n: 5 }), [0], "segi lima hanya pas di 0 pada kelipatan 30");
  sama(B.putaranPas({ tipe: "segi", n: 6 }), [0, 60, 120, 180, 240, 300], "segi enam pas tiap 60");
  for (const n of B.SEGI) cek(B.pasDenganCetakan({ tipe: "segi", n }, 0) && B.pasDenganCetakan({ tipe: "segi", n }, 360), `segi-${n} pas bila tidak diputar`);
  cek(!B.pasDenganCetakan(lonjong, 30) && !B.pasDenganCetakan(lonjong, 90) && B.pasDenganCetakan(lonjong, 180), "lonjong 30 dan 90 tidak pas, 180 pas");
  cek(B.kalimatPas(lingkaran, 90).includes("pas ke arah mana pun"), "kalimat lingkaran");
  cek(B.kalimatPas(lonjong, 30).includes("tidak pas") && B.kalimatPas(lonjong, 180).includes("pas lagi"), "kalimat lonjong");
  cek(B.kalimatPas({ tipe: "segi", n: 5 }, 0).includes("belum diputar"), "kalimat belum diputar");
  cek(B.kalimatPas({ tipe: "segi", n: 6 }, 30).includes("tidak pas"), "kalimat segi enam tidak pas");
}

/* ------------------------------ Lab Pola Segitiga (Sub-Bab B) ------------- */
{
  sama(P.batasN(1), 3, "batas n bawah");
  sama(P.batasN(12), 8, "batas n atas");
  cek(P.AWAL_N === 4 && P.AWAL_N !== 5 && P.AWAL_N !== 7 && P.AWAL_N !== 8, "n awal bukan target misi");
  for (let n = P.MIN_N; n <= P.MAKS_N; n += 1) {
    const t = P.titikPola(n, 40, [50, 50]);
    sama(t.length, n, `titik segi-${n}`);
    const luasUtuh = P.luasSegi(t);
    for (const cara of P.URUT_CARA) {
      const tri = P.titikSegitiga(n, cara, 40, [50, 50]);
      sama(tri.length, P.banyakSegitiga(n, cara), `banyak segitiga n=${n} ${cara}`);
      dekat(tri.reduce((s, x) => s + P.luasSegi(x), 0), luasUtuh, `luas segitiga menutup segi-${n} ${cara}`, 1e-6);
      cek(tri.every((x) => x.length === 3 && P.luasSegi(x) > 1e-6), `segitiga sah n=${n} ${cara}`);
      sama(P.garisPola(n, cara).length, cara === "pojok" ? n - 3 : n, `banyak garis n=${n} ${cara}`);
    }
    sama(P.banyakSegitiga(n, "pojok"), n - 2, `pojok n-2 (${n})`);
    sama(P.banyakSegitiga(n, "tengah"), n, `tengah n (${n})`);
    sama(P.selisihCara(n), 2, `selisih dua cara selalu 2 (${n})`);
    cek(P.kalimatPola(n, "pojok").includes(String(n - 2)) && P.kalimatPola(n, "tengah").includes(`${n} segitiga`), `kalimat pola ${n}`);
    cek(P.rumusPola(n, "pojok") === `${n} − 2 = ${n - 2}`, `rumus pojok ${n}`);
    cek(P.NAMA_N[n].length > 3, `nama segi-${n}`);
  }
  sama(P.tabelPola().length, 6, "tabel pola enam baris");
  sama(P.tabelPola().map((r) => r.pojok), [1, 2, 3, 4, 5, 6], "kolom pojok 1 sampai 6");
  sama(P.tabelPola().map((r) => r.tengah), [3, 4, 5, 6, 7, 8], "kolom tengah 3 sampai 8");
  cek(P.ucapanPola(8, "pojok", true).includes("selisihnya 2") && !P.ucapanPola(8, "pojok", false).includes("selisihnya"), "ucapan banding");
  // Konsisten dengan Bengkel Urai: segi enam dari satu titik dan lewat tengah.
  sama(P.banyakSegitiga(6, "pojok"), U.uraikan("segienam", ["AC", "AD", "AE"]).length, "pola sama dengan bengkel (satu titik)");
  sama(P.banyakSegitiga(6, "tengah"), U.uraikan("segienam", ["AD", "BE", "CF"]).length, "pola sama dengan bengkel (tengah)");
}

/* ------------------------------ Lab Cetak Permukaan (Sub-Bab C) ----------- */
{
  sama(C.URUT_CETAK, R.URUT_RUANG, "urutan bangun ruang sama dengan lereng");
  for (const r of C.URUT_CETAK) {
    cek(C.PERMUKAAN[r].length >= 1 && C.PERMUKAAN[r].every((p) => p.id && p.nama), `permukaan ${r} terdefinisi`);
    sama(C.awalPermukaan(r), C.PERMUKAAN[r][0].id, `permukaan awal ${r}`);
    sama(C.banyakDatar(r), R.CIRI_RUANG[r].datar, `banyak datar ${r} sama dengan lereng`);
    const datar = C.PERMUKAAN[r].filter((p) => p.jenis === "datar").length;
    cek((R.CIRI_RUANG[r].datar > 0) === (datar > 0), `${r}: punya permukaan datar sesuai ciri`);
    cek((R.CIRI_RUANG[r].lengkung > 0) === C.PERMUKAAN[r].some((p) => p.jenis === "lengkung"), `${r}: punya permukaan lengkung sesuai ciri`);
    for (const p of C.PERMUKAAN[r]) {
      const c = C.cetak(r, p.id);
      cek(c.ada === (p.jenis === "datar"), `${r} ${p.id}: cetakan rapi hanya dari permukaan datar`);
      cek(c.catatan.length > 10 && c.nama.length > 3, `${r} ${p.id}: catatan cetakan`);
      cek(C.kalimatCetak(r, p.id, true) === c.catatan && C.kalimatCetak(r, p.id, false).includes("Tekan Cetak"), `${r} ${p.id}: kalimat cetak`);
      if (c.ada) {
        const u = C.ukuranCetakan(r, p.id);
        cek(u.w > 0 && u.h > 0 && u.w <= 80 && u.h <= 80, `${r} ${p.id}: ukuran cetakan sah`);
      } else sama(C.ukuranCetakan(r, p.id), { w: 0, h: 0 }, `${r} ${p.id}: tanpa ukuran`);
    }
  }
  sama(C.cetak("kubus", "sisi").bentuk, "persegi", "kubus dicetak persegi");
  sama(C.cetak("balok", "besar").bentuk, "persegiPanjang", "balok besar persegi panjang");
  sama(C.cetak("balok", "kecil").bentuk, "persegiPanjang", "balok kecil persegi panjang");
  cek(C.ukuranCetakan("balok", "besar").w > C.ukuranCetakan("balok", "kecil").w, "sisi besar lebih lebar dari sisi kecil");
  cek(C.ukuranCetakan("kubus", "sisi").w === C.ukuranCetakan("kubus", "sisi").h, "persegi sama sisi");
  sama(C.cetak("tabung", "alas").bentuk, "lingkaran", "alas tabung lingkaran");
  sama(C.cetak("kerucut", "alas").bentuk, "lingkaran", "alas kerucut lingkaran");
  sama(C.cetak("tabung", "selimut").bentuk, null, "selimut tabung tanpa cetakan");
  sama(C.cetak("bola", "kulit").bentuk, null, "bola tanpa cetakan");
  cek(C.cetak("bola", "kulit").catatan.includes("tidak punya permukaan datar"), "catatan bola");
  // Konsisten dengan Lab Bentuk Datar (Sub-Bab A): cetakan segi empat punya 4 sisi, lingkaran tanpa sisi lurus.
  sama(C.cetak("kubus", "sisi").sisiLurus, B.ciri({ tipe: "segi", n: 4 }).sisiLurus, "persegi 4 sisi seperti Lab Bentuk");
  sama(C.cetak("tabung", "alas").sisiLurus, B.ciri({ tipe: "lengkung", jenis: "lingkaran" }).sisiLurus, "lingkaran 0 sisi seperti Lab Bentuk");
  sama(C.tabelCetak().length, 5, "tabel cetak lima baris");
  sama(C.tabelCetak().map((b) => b.cetakan), ["Segi empat yang sama sisinya", "Segi empat yang berbeda sisinya", "Lingkaran", "Lingkaran", "Tidak ada"], "tabel cetak isi");
  cek(C.ucapanCetak("kubus", "sisi", true).startsWith("Kubus."), "ucapan cetak");
  // Pilihan permukaan yang tidak dikenal jatuh ke permukaan pertama.
  sama(C.cariPermukaan("tabung", "tidak-ada").id, "alas", "permukaan tak dikenal jatuh ke awal");
}

/* ------------------------------ Mesin Tiga Pertanyaan (Sub-Bab A) --------- */
{
  sama(D.BENTUK_DETEKTIF.length, 4, "empat bentuk misterius");
  cek(D.BENTUK_DETEKTIF.some((d) => d.tepi === "lurus") && D.BENTUK_DETEKTIF.some((d) => d.tepi === "lengkung"), "kedua jalur dilewati");
  cek(new Set(D.BENTUK_DETEKTIF.map((d) => d.id)).size === 4, "id bentuk unik");
  // Cocok dengan Lab Bentuk Datar: nama, sisi, dan uji putar.
  for (const d of D.BENTUK_DETEKTIF) {
    const b = d.tepi === "lurus" ? { tipe: "segi", n: d.sisi } : { tipe: "lengkung", jenis: d.id };
    sama(B.namaBentuk(b), d.nama, `${d.id}: nama sama dengan Lab Bentuk`);
    sama(B.ciri(b).sisiLurus, d.sisi, `${d.id}: sisi sama dengan Lab Bentuk`);
    if (d.tepi === "lengkung") cek(B.pasDenganCetakan(b, 30) === d.pas, `${d.id}: uji putar sama dengan Lab Bentuk`);
    cek(!d.pengecoh.includes(d.nama) && d.pengecoh[0] !== d.pengecoh[1], `${d.id}: pengecoh bukan jawaban`);
  }

  const awal = D.awalDetektif();
  sama([awal.keadaan, awal.misi, awal.selesai, awal.ditolak], ["tepi", 0, false, 0], "keadaan awal mesin");
  sama(D.indeksStasiun(awal.keadaan), 0, "stasiun awal");

  // Salah lebih dulu di tiap stasiun, lalu jalur benar sampai selesai.
  let x = awal;
  const letakBenar = [];
  const nolak = [];
  for (let i = 0; i < D.BENTUK_DETEKTIF.length; i += 1) {
    const d = D.bentukAktif(x);
    // melompati pertanyaan ditolak
    const lompat = D.langkahDet(x, { t: "NAMA", nilai: d.nama });
    cek(lompat.keadaan === "tepi" && lompat.ditolak === x.ditolak + 1 && lompat.pesan.length > 10, `${d.id}: menjawab nama sebelum tepi ditolak`);
    const lompat2 = D.langkahDet(lompat, { t: "LOMPAT", ke: 2 });
    cek(lompat2.keadaan === "tepi" && lompat2.ditolak === lompat.ditolak + 1, `${d.id}: lompat stasiun ditolak`);
    cek(D.langkahDet(lompat2, { t: "LOMPAT", ke: 0 }) === lompat2, `${d.id}: lompat ke stasiun sekarang tidak mengubah apa pun`);
    // tepi salah
    const tepiSalah = D.langkahDet(lompat2, { t: "TEPI", nilai: d.tepi === "lurus" ? "lengkung" : "lurus" });
    cek(tepiSalah.keadaan === "tepi" && tepiSalah.ditolak === lompat2.ditolak + 1, `${d.id}: tepi salah ditolak`);
    // tepi benar
    x = D.langkahDet(tepiSalah, { t: "TEPI", nilai: d.tepi });
    cek(x.keadaan === "ciri" && x.jalur === d.tepi && x.pesan === "", `${d.id}: tepi benar membuka ciri`);
    // jalur yang tidak cocok ditolak
    const salahJalur = D.langkahDet(x, d.tepi === "lurus" ? { t: "PUTAR", nilai: "selalu" } : { t: "SISI", nilai: 4 });
    cek(salahJalur.keadaan === "ciri" && salahJalur.ditolak === x.ditolak + 1, `${d.id}: pertanyaan jalur lain ditolak`);
    if (d.tepi === "lurus") {
      const p = D.pilihanSisi(d, x.misi);
      cek(p.length === 3 && new Set(p).size === 3 && p.includes(d.sisi) && p.every((n) => n >= 2), `${d.id}: pilihan sisi sah`);
      letakBenar.push(p.indexOf(d.sisi));
      const salah = D.langkahDet(salahJalur, { t: "SISI", nilai: p.find((n) => n !== d.sisi) });
      cek(salah.keadaan === "ciri" && salah.ditolak === salahJalur.ditolak + 1, `${d.id}: sisi salah ditolak`);
      x = D.langkahDet(salah, { t: "SISI", nilai: d.sisi });
    } else {
      const salah = D.langkahDet(salahJalur, { t: "PUTAR", nilai: d.pas ? "tidak" : "selalu" });
      cek(salah.keadaan === "ciri" && salah.ditolak === salahJalur.ditolak + 1, `${d.id}: uji putar salah ditolak`);
      x = D.langkahDet(salah, { t: "PUTAR", nilai: d.pas ? "selalu" : "tidak" });
    }
    cek(x.keadaan === "nama", `${d.id}: ciri benar membuka nama`);
    const pn = D.pilihanNama(d, x.misi);
    cek(pn.length === 3 && new Set(pn).size === 3 && pn.includes(d.nama), `${d.id}: pilihan nama sah`);
    letakBenar.push(pn.indexOf(d.nama));
    const namaSalah = D.langkahDet(x, { t: "NAMA", nilai: pn.find((n) => n !== d.nama) });
    cek(namaSalah.keadaan === "nama" && namaSalah.pesan.includes("Cocokkan"), `${d.id}: nama salah ditolak`);
    nolak.push(namaSalah.ditolak);
    x = D.langkahDet(namaSalah, { t: "NAMA", nilai: d.nama });
    cek(x.keadaan === "sudah" && D.petunjukDet(x).includes(d.nama), `${d.id}: nama benar menuntaskan bentuk`);
    cek(D.langkahDet(x, { t: "TEPI", nilai: d.tepi }).ditolak === x.ditolak + 1, `${d.id}: tidak bisa mundur ke tepi`);
    x = D.langkahDet(x, { t: "LANJUT" });
  }
  cek(x.selesai && x.keadaan === "selesai" && x.ditolak > 0, "mesin selesai setelah semua bentuk");
  cek(D.indeksStasiun(x.keadaan) === 3, "stasiun akhir");
  cek(new Set(letakBenar).size >= 2, `letak jawaban benar bervariasi (${letakBenar.join("")})`);
  cek(nolak.every((v, i) => i === 0 || v > nolak[i - 1]), "jumlah penolakan terus bertambah");
  cek(D.langkahDet(x, { t: "LANJUT" }).ditolak === x.ditolak + 1, "lanjut setelah selesai ditolak");
  const ulang = D.langkahDet(x, { t: "ULANG" });
  sama([ulang.keadaan, ulang.misi, ulang.selesai, ulang.ditolak], ["tepi", 0, false, 0], "Main lagi kembali ke awal");
  cek(D.langkahDet(awal, { t: "ULANG" }) === awal, "ULANG sebelum selesai tidak berpengaruh");
  cek(D.petunjukDet(awal).includes("garis lurus atau garis lengkung"), "petunjuk pertanyaan satu");
  cek(D.ciriRingkas(D.BENTUK_DETEKTIF[0]).includes("5 sisi lurus") && D.ciriRingkas(D.BENTUK_DETEKTIF[1]).includes("selalu pas") && D.ciriRingkas(D.BENTUK_DETEKTIF[3]).includes("tidak selalu pas"), "ciri ringkas");
  cek(x.riwayat.length === 10 && x.riwayat.every((r) => r.includes("→")), "riwayat dibatasi sepuluh");
  // Mesin tidak pernah mengubah objek lama.
  cek(awal.keadaan === "tepi" && awal.riwayat.length === 0, "objek awal tidak berubah");
}

console.log(`Lulus ${lulus}, gagal ${gagal}`);
process.exit(gagal ? 1 : 0);
