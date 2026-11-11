// Uji logika simulasi Matematika Kelas 2 Bab 3 (lab bentuk datar, bengkel urai 2D, lereng bangun ruang).
// Jalankan: node --no-warnings scripts/uji-lab-k2b3.mjs
import * as B from "../src/components/modul/lab-bentuk-k2b3.ts";
import * as U from "../src/components/modul/lab-urai-k2b3.ts";
import * as R from "../src/components/modul/lab-ruang-k2b3.ts";

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

console.log(`Lulus ${lulus}, gagal ${gagal}`);
process.exit(gagal ? 1 : 0);
