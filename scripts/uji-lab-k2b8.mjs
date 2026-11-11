// Uji logika murni dan misi Matematika Kelas 2 Bab 8 (Berbagai Diagram): Lab Turus, Lab Baca Turus, Mesin Catat Turus,
// Lab Diagram Gambar, Mesin Susun Diagram, serta misi per sub-bab. Skenario diuji di uji-skenario-umum.mjs.
// Jalankan: node --no-warnings scripts/uji-lab-k2b8.mjs
import * as M0 from "../src/components/modul/misi-simulasi.ts";
import * as K8 from "../src/components/modul/misi-k2bab8.ts";
import * as L from "../src/components/modul/lab-data-k2b8.ts";

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
const kosong = new Set();
const SEL = (id) => ({ alat: "selesai", id });
const ada = (sub, k, id) => M0.misiBaru(K8.daftarMisiK2Bab8(sub), k, kosong).includes(id);
const semuaMisi = (sub, keadaan) => {
  const s = new Set();
  for (const k of keadaan) for (const id of M0.misiBaru(K8.daftarMisiK2Bab8(sub), k, kosong)) s.add(id);
  return s;
};
const ulang = (f, x, n) => {
  let y = x;
  for (let i = 0; i < n; i += 1) y = f(y);
  return y;
};
const atur = (l, n) => n.reduce((x, c, i) => ulang((y) => L.tambahData(y, i), x, c), l);
const turus = (l) => L.laporanTurus(l);
const gambar = (l) => L.laporanGambar(l);
const tampilTurus = (n, o = {}) => ({ ...atur(L.awalLab("turus"), n), ...o });
const tampilGambar = (n, o = {}) => ({ ...atur(L.awalLab("gambar"), n), ...o });

/* ------------------------------ Struktur misi ------------------------------ */
for (const sub of ["A", "B"]) {
  const d = K8.daftarMisiK2Bab8(sub);
  cek(new Set(d.map((m) => m.id)).size === d.length, `k2bab8 ${sub}: id misi unik`);
  cek(d.filter((m) => m.wajib).length >= 3, `k2bab8 ${sub}: minimal tiga misi wajib`);
  cek(d.some((m) => !m.wajib), `k2bab8 ${sub}: ada tantangan bebas`);
  cek(d.every((m) => m.teks.length > 15), `k2bab8 ${sub}: teks misi cukup jelas`);
}
sama([K8.MISI_A.filter((m) => m.wajib).length, K8.MISI_B.filter((m) => m.wajib).length], [6, 5], "jumlah misi wajib A dan B");
sama([K8.MISI_A.filter((m) => !m.wajib).length, K8.MISI_B.filter((m) => !m.wajib).length], [5, 4], "jumlah tantangan bebas A dan B");
cek(K8.MISI_B.some((m) => m.wajib && m.id === "b-skenario"), "sub-bab akhir: skenario pencapaian misi bab ada di misi wajib");
cek(K8.MISI_A.some((m) => m.wajib && m.id === "a-catat") && K8.MISI_B.some((m) => m.wajib && m.id === "b-susun"), "mesin keadaan ada di misi wajib");

/* ------------------------------ Kumpulan data ------------------------------ */
{
  const urutan = {
    buah: ["anggur", "jeruk", "apel", "pisang"],
    hewan: ["ayam", "kambing", "sapi", "bebek"],
    bunga: ["mawar", "lili", "tulip", "aster"],
    warna: ["merah", "kuning", "biru", "hitam"],
    permainan: ["karet", "lompat", "petak", "benteng"],
  };
  for (const [id, ds] of Object.entries(L.SET)) {
    cek(ds.id === id && ds.kategori.length === 4 && ds.nyata.length === 4, `set ${id}: empat kategori dan empat nilai nyata`);
    cek(new Set(ds.kategori.map((k) => k.id)).size === 4 && new Set(ds.kategori.map((k) => k.nama)).size === 4, `set ${id}: kategori unik`);
    cek(ds.nyata.every((n) => Number.isInteger(n) && n > 0 && n <= 15), `set ${id}: nilai nyata dalam batas`);
    cek(ds.kategori.every((k) => ds.kalimat(k.nama, 3).includes("3")), `set ${id}: kalimat memuat banyaknya`);
  }
  for (const [id, ids] of Object.entries(urutan)) sama(L.SET[id].kategori.map((k) => k.id), ids, `urutan kategori ${id} (dipakai misi)`);
  sama(L.SET.buah.nyata, [2, 6, 4, 3], "nilai nyata buah");
  sama(L.SET.hewan.nyata, [10, 8, 6, 11], "nilai nyata hewan");
  sama(L.SET.bunga.nyata, [7, 4, 5, 4], "nilai nyata bunga");
  sama(L.SET.warna.nyata, [7, 3, 5, 2], "nilai nyata warna");
  sama(L.SET.permainan.nyata, [4, 6, 5, 7], "nilai nyata permainan");
  // Sub-Bab B tidak memakai gambar benda berwarna (batas Concrete dan Picture).
  for (const id of L.SET_GAMBAR) cek(L.SET[id].kategori.every((k) => k.ikon === ""), `set gambar ${id}: tanpa ikon benda`);
  cek(L.SET_TURUS.every((id) => L.SET[id].kategori.every((k) => k.ikon.length > 0)), "set turus: tiap kategori punya ikon benda");
  sama(L.DAFTAR_LAMBANG.map((x) => L.LAMBANG[x].glyph).length, 4, "empat lambang");
  cek(new Set(L.DAFTAR_LAMBANG.map((x) => L.LAMBANG[x].glyph)).size === 4, "lambang berbeda satu sama lain");
}

/* ------------------------------ Kelompok lima ------------------------------ */
{
  sama([0, 1, 4, 5, 6, 9, 10, 13, 15].map(L.teksKelompok), ["belum ada garis", "1 garis", "4 garis", "1 kelompok lima", "1 kelompok lima dan 1 garis", "1 kelompok lima dan 4 garis", "2 kelompok lima", "2 kelompok lima dan 3 garis", "3 kelompok lima"], "teks kelompok lima");
  for (let n = 0; n <= 15; n += 1) {
    const k = L.kelompokLima(n);
    cek(k.penuh * 5 + k.sisa === n && k.sisa < 5, `kelompok lima ${n} utuh`);
  }
}

/* ------------------------------ Lab Turus dan Lab Gambar ------------------------------ */
for (const jenis of ["turus", "gambar"]) {
  const a = L.awalLab(jenis);
  const maks = L.maksLab(jenis);
  sama([a.n, a.terakhir, a.ganti, a.catatan], [[0, 0, 0, 0], null, 0, ""], `awal ${jenis}`);
  sama([a.turus, a.gambar, a.benda, a.tabel, a.ket, a.kelompok], jenis === "turus" ? [true, false, false, false, false, true] : [false, true, false, false, false, true], `tampilan awal ${jenis}`);
  cek(L.kalimatLab(a) === "Belum ada data. Tambah data pada tiap jenis.", `kalimat awal ${jenis}`);
  cek(M0.misiBaru(jenis === "turus" ? K8.MISI_A : K8.MISI_B, jenis === "turus" ? turus(a) : gambar(a), kosong).length === 0, `awal Lab ${jenis} tidak memenuhi misi apa pun`);

  // Batas atas dan bawah.
  const penuh = ulang((x) => L.tambahData(x, 0), a, maks + 5);
  sama(penuh.n[0], maks, `${jenis}: baris berhenti di ${maks}`);
  cek(penuh.catatan.includes(String(maks)), `${jenis}: baris penuh diberi tahu`);
  cek(L.kurangData(a, 0).catatan.includes("Belum ada") && L.kurangData(a, 0).n[0] === 0, `${jenis}: kurang di nol diberi tahu`);
  sama(L.kurangData(L.tambahData(a, 2), 2).n, [0, 0, 0, 0], `${jenis}: tambah lalu kurang kembali`);
  sama(L.tambahData(a, 9), a, `${jenis}: indeks luar diabaikan`);
  sama(L.tambahData(a, -1), a, `${jenis}: indeks negatif diabaikan`);
  // Tiap tambah menambah tepat satu pada baris itu saja.
  for (let i = 0; i < 4; i += 1) {
    const x = atur(a, [1, 2, 3, 4]);
    const y = L.tambahData(x, i);
    cek(y.n.every((c, j) => c === x.n[j] + (i === j ? 1 : 0)), `${jenis}: tambah baris ${i} hanya mengubah baris ${i}`);
    sama(L.totalLab(y), L.totalLab(x) + 1, `${jenis}: total naik satu`);
  }
  // Ganti kumpulan data: banyaknya kembali nol, tampilan dipertahankan.
  const lain = L.daftarSetLab(jenis)[1];
  const ganti = L.pilihSetLab(L.nyalakanLab(atur(a, [3, 3, 3, 3]), "tabel", true), lain);
  sama([ganti.set, ganti.n, ganti.tabel], [lain, [0, 0, 0, 0], true], `${jenis}: ganti set menghapus data, tampilan tetap`);
  sama(L.pilihSetLab(a, "bunga"), a, `${jenis}: set di luar daftar alat ditolak`);
  sama(L.pilihSetLab(a, a.set), a, `${jenis}: pilih set yang sama tidak mengubah`);
  sama(L.resetLab(atur(a, [4, 4, 4, 4])), L.awalLab(jenis), `${jenis}: reset kembali ke awal`);
  // Kalimat memuat banyak dan nama.
  for (const id of L.daftarSetLab(jenis)) {
    const ds = L.SET[id];
    ds.kategori.forEach((k, i) => {
      let l = L.pilihSetLab(a, id);
      if (id !== a.set) l = L.pilihSetLab(a, id);
      else l = a;
      l = atur(l, [0, 0, 0, 0].map((_, j) => (j === i ? 6 : 0)));
      const kal = L.kalimatLab({ ...l, terakhir: i });
      cek(kal.includes("6") && kal.toLowerCase().includes(k.nama.toLowerCase()), `${jenis}/${id}/${k.id}: kalimat memuat 6 dan nama (${kal})`);
    });
  }
}

/* ------------------------------ Lab Turus: kalimat dan misi ------------------------------ */
{
  const a = L.awalLab("turus");
  const l7 = atur(a, [7, 0, 0, 0]);
  cek(L.kalimatLab({ ...l7, terakhir: 0 }).includes("1 kelompok lima dan 2 garis"), "kalimat turus 7: 1 kelompok lima dan 2 garis");
  cek(L.kalimatLab({ ...l7, terakhir: 0, kelompok: false }).includes("7 garis"), "kelompok mati: tujuh garis berjajar");
  cek(!L.kalimatLab({ ...l7, terakhir: 0, turus: false }).includes("garis"), "turus mati: kalimat tanpa garis");
  cek(L.kalimatLab({ ...l7, tabel: true, terakhir: 0 }).includes("Jumlah semuanya 7"), "tabel menyala: jumlah semuanya");
  cek(L.tambahData(atur(a, [4, 0, 0, 0]), 0).catatan.includes("kelompok lima"), "lima: catatan satu kelompok lima");
  cek(!L.tambahData(atur(a, [3, 0, 0, 0]), 0).catatan.includes("kelompok lima"), "empat: belum ada catatan kelompok lima");
  cek(!L.tambahData(L.setKelompokLab(atur(a, [4, 0, 0, 0]), false), 0).catatan.includes("kelompok lima"), "kelompok mati: tidak ada catatan kelompok lima");

  const m = (l) => M0.misiBaru(K8.MISI_A, turus(l), kosong);
  // a-lima
  cek(m(atur(a, [5, 0, 0, 0])).includes("a-lima") && !m(atur(a, [4, 0, 0, 0])).includes("a-lima") && !m(atur(a, [6, 0, 0, 0])).includes("a-lima"), "a-lima butuh tepat 5");
  cek(m(atur(a, [0, 0, 5, 0])).includes("a-lima"), "a-lima di baris mana pun");
  cek(!m(L.setKelompokLab(atur(a, [5, 0, 0, 0]), false)).includes("a-lima"), "a-lima butuh Kelompok lima menyala");
  cek(!m(L.nyalakanLab(atur(a, [5, 0, 0, 0]), "turus", false)).includes("a-lima"), "a-lima butuh Turus menyala");
  // a-sepuluh
  cek(m(atur(a, [0, 10, 0, 0])).includes("a-sepuluh") && !m(atur(a, [0, 9, 0, 0])).includes("a-sepuluh"), "a-sepuluh butuh tepat 10");
  cek(m(atur(L.pilihSetLab(a, "hewan"), [0, 0, 0, 10])).includes("a-sepuluh"), "a-sepuluh di set hewan");
  // a-buah
  const buah = atur(a, [2, 6, 4, 3]);
  cek(!m(buah).includes("a-buah"), "a-buah butuh Tabel menyala");
  cek(m(L.nyalakanLab(buah, "tabel", true)).includes("a-buah"), "a-buah: anggur 2, jeruk 6, apel 4, pisang 3, tabel nyala");
  cek(!m(L.nyalakanLab(atur(a, [2, 6, 4, 4]), "tabel", true)).includes("a-buah"), "a-buah butuh angka yang tepat");
  cek(!m(L.nyalakanLab(atur(L.pilihSetLab(a, "hewan"), [2, 6, 4, 3]), "tabel", true)).includes("a-buah"), "a-buah butuh set buah");
  // a-benda
  cek(!m(L.nyalakanLab(a, "benda", true)).includes("a-benda"), "a-benda butuh data");
  cek(m(L.nyalakanLab(atur(a, [1, 0, 0, 0]), "benda", true)).includes("a-benda"), "a-benda: benda nyala dan ada data");
  // a-matikan
  cek(m(L.setKelompokLab(atur(a, [9, 0, 0, 0]), false)).includes("a-matikan"), "a-matikan: kelompok mati dan 9");
  cek(!m(atur(a, [9, 0, 0, 0])).includes("a-matikan") && !m(L.setKelompokLab(atur(a, [8, 0, 0, 0]), false)).includes("a-matikan"), "a-matikan butuh kelompok mati dan tepat 9");
  // Jangkauan: set mana pun, baris mana pun, sampai 15 (hanya tiga set).
  for (const id of L.SET_TURUS) cek(atur(L.pilihSetLab(a, id), [15, 15, 15, 15]).n.every((c) => c === 15), `set ${id}: semua baris bisa sampai 15`);
}

/* ------------------------------ Lab Diagram Gambar: kalimat, lambang, misi ------------------------------ */
{
  const a = L.awalLab("gambar");
  // Lambang berganti tanpa data tidak dihitung.
  const kosongGanti = L.pilihLambangLab(a, "hati");
  sama([kosongGanti.lambang, kosongGanti.ganti], ["hati", 0], "ganti lambang tanpa data tidak dihitung");
  const isi = atur(a, [3, 0, 0, 0]);
  const g1 = L.pilihLambangLab(isi, "hati");
  sama([g1.lambang, g1.ganti, g1.n], ["hati", 1, [3, 0, 0, 0]], "ganti lambang dengan data dihitung, banyaknya tetap");
  sama(L.pilihLambangLab(g1, "hati"), g1, "memilih lambang yang sama tidak mengubah");
  cek(L.kalimatLab({ ...isi, terakhir: 0 }).includes("Digambar 3 bintang"), "kalimat gambar: digambar 3 bintang");
  cek(L.kalimatLab({ ...isi, terakhir: 0, lambang: "hati", ket: true }).includes("Satu hati mewakili satu anak"), "kalimat keterangan: satu hati mewakili satu anak");
  cek(!L.kalimatLab({ ...isi, terakhir: 0, ket: false }).includes("mewakili"), "keterangan mati: tidak ada kalimat keterangan");

  const m = (l) => M0.misiBaru(K8.MISI_B, gambar(l), kosong);
  cek(m(g1).includes("b-lambang") && !m(isi).includes("b-lambang") && !m(kosongGanti).includes("b-lambang"), "b-lambang butuh data lalu ganti lambang");
  cek(!m(L.nyalakanLab(g1, "gambar", false)).includes("b-lambang"), "b-lambang butuh Diagram gambar menyala");
  // b-warna
  cek(m(atur(a, [7, 0, 0, 2])).includes("b-warna") && !m(atur(a, [7, 0, 0, 3])).includes("b-warna") && !m(atur(a, [6, 0, 0, 2])).includes("b-warna"), "b-warna: merah 7 dan hitam 2 tepat");
  cek(!m(atur(L.pilihSetLab(a, "permainan"), [7, 0, 0, 2])).includes("b-warna"), "b-warna butuh set warna");
  // b-dua-cara
  const dua = L.nyalakanLab(atur(a, [8, 0, 0, 0]), "turus", true);
  cek(m(dua).includes("b-dua-cara") && !m(atur(a, [8, 0, 0, 0])).includes("b-dua-cara") && !m(L.nyalakanLab(atur(a, [7, 0, 0, 0]), "turus", true)).includes("b-dua-cara"), "b-dua-cara: turus dan gambar nyala dengan 8");
  cek(!m(L.nyalakanLab(dua, "gambar", false)).includes("b-dua-cara"), "b-dua-cara butuh gambar menyala");
  // bebas
  cek(m(atur(a, [4, 4, 0, 0])).includes("b-sama") && !m(atur(a, [4, 5, 0, 0])).includes("b-sama") && !m(a).includes("b-sama"), "b-sama: dua baris sama banyak (bukan nol)");
  cek(m(atur(a, [0, 0, 12, 0])).includes("b-maks") && !m(atur(a, [0, 0, 11, 0])).includes("b-maks"), "b-maks: satu baris 12");
  cek(m(atur(L.pilihSetLab(a, "permainan"), [4, 0, 0, 7])).includes("b-permainan") && !m(atur(a, [4, 0, 0, 7])).includes("b-permainan"), "b-permainan: karet 4 dan benteng 7");
  cek(m(atur(a, [5, 5, 5, 5])).includes("b-jumlah") && !m(atur(a, [5, 5, 5, 4])).includes("b-jumlah") && m(atur(a, [12, 8, 0, 0])).includes("b-jumlah"), "b-jumlah: total 20");
}

/* ------------------------------ Lab Baca ------------------------------ */
{
  const a = L.awalBaca();
  sama([a.set, a.a, a.b, a.paling, a.selisih], ["hewan", null, null, false, false], "awal Lab Baca");
  cek(M0.misiBaru(K8.MISI_A, L.laporanBaca(a), kosong).length === 0, "awal Lab Baca tidak memenuhi misi apa pun");
  cek(L.kalimatBaca(a).startsWith("Ketuk dua baris"), "kalimat awal Lab Baca");

  // Ketuk: satu, dua, ketiga memulai pilihan baru, melepas.
  const x1 = L.ketukBaca(a, "bebek");
  const x2 = L.ketukBaca(x1, "ayam");
  sama([x1.a, x1.b, x2.a, x2.b], ["bebek", null, "bebek", "ayam"], "ketuk satu lalu dua baris");
  const x3 = L.ketukBaca(x2, "sapi");
  sama([x3.a, x3.b], ["sapi", null], "ketukan ketiga memulai pilihan baru");
  sama([L.ketukBaca(x2, "bebek").a, L.ketukBaca(x2, "bebek").b], ["ayam", null], "ketuk baris pertama melepasnya");
  sama([L.ketukBaca(x2, "ayam").a, L.ketukBaca(x2, "ayam").b], ["bebek", null], "ketuk baris kedua melepasnya");
  sama(L.ketukBaca(a, "tidak-ada"), a, "baris yang tidak ada diabaikan");
  sama(L.ketukBaca(a, "mawar"), a, "baris dari set lain diabaikan");

  // Ganti set menghapus pilihan. Set di luar daftar ditolak.
  const bunga = L.pilihSetBaca(x2, "bunga");
  sama([bunga.set, bunga.a, bunga.b], ["bunga", null, null], "ganti set menghapus pilihan");
  sama(L.pilihSetBaca(a, "warna"), a, "set gambar tidak ada di Lab Baca");
  sama(L.resetBaca(), a, "reset kembali ke awal");

  // Kalimat bandingan: arah lebihnya dan kurangnya benar untuk semua pasangan semua set.
  for (const id of L.SET_BACA) {
    const ds = L.SET[id];
    for (const p of ds.kategori) {
      for (const q of ds.kategori) {
        if (p.id === q.id) continue;
        const l = L.ketukBaca(L.ketukBaca(L.pilihSetBaca(a, id), p.id), q.id);
        const np = L.banyakBaca(id, p.id);
        const nq = L.banyakBaca(id, q.id);
        const kal = L.kalimatBaca({ ...l, selisih: true });
        if (np === nq) cek(kal.includes("sama") && !kal.includes("lebihnya"), `${id} ${p.id}/${q.id}: sama banyak (${kal})`);
        else {
          const [besar, kecil] = np > nq ? [p, q] : [q, p];
          const sel = Math.abs(np - nq);
          cek(kal.includes(`Banyak ${besar.nama} ${sel} lebihnya dari banyak ${kecil.nama}`) && kal.includes(`Banyak ${kecil.nama} ${sel} kurangnya dari banyak ${besar.nama}`), `${id} ${p.id}/${q.id}: arah lebihnya dan kurangnya (${kal})`);
          cek(kal.includes(`Selisihnya ${Math.max(np, nq)} dikurangi ${Math.min(np, nq)} sama dengan ${sel}`), `${id} ${p.id}/${q.id}: selisih ${sel}`);
          cek(!L.kalimatBaca(l).includes("Selisihnya"), `${id} ${p.id}/${q.id}: selisih mati tidak ditulis`);
        }
      }
    }
  }

  // Paling banyak dan paling sedikit: seri tidak punya satu yang "paling".
  const mxH = L.palingBaca("hewan", "banyak");
  const mnH = L.palingBaca("hewan", "sedikit");
  sama([mxH.tunggal, mxH.n, mnH.tunggal, mnH.n], ["bebek", 11, "sapi", 6], "hewan: paling banyak bebek 11, paling sedikit sapi 6");
  const mnB = L.palingBaca("bunga", "sedikit");
  sama([mnB.tunggal, mnB.sama, mnB.n], [null, ["lili", "aster"], 4], "bunga: paling sedikit seri lili dan aster, tidak ada tunggal");
  const kalBunga = L.kalimatBaca({ ...L.pilihSetBaca(a, "bunga"), paling: true });
  cek(kalBunga.includes("Paling sedikit: tidak ada satu, lili dan aster sama banyak") && kalBunga.includes("Paling banyak: mawar, 7"), `kalimat paling pada bunga: ${kalBunga}`);
  const kalHewan = L.kalimatBaca({ ...a, paling: true });
  cek(kalHewan.includes("Paling banyak: bebek, 11") && kalHewan.includes("Paling sedikit: sapi, 6"), `kalimat paling pada hewan: ${kalHewan}`);
  for (const id of L.SET_BACA) {
    const mx = L.palingBaca(id, "banyak");
    const mn = L.palingBaca(id, "sedikit");
    cek(mx.n === Math.max(...L.SET[id].nyata) && mn.n === Math.min(...L.SET[id].nyata), `${id}: nilai paling banyak dan paling sedikit`);
    cek((mx.tunggal === null) === (mx.sama.length > 1) && (mn.tunggal === null) === (mn.sama.length > 1), `${id}: tunggal null bila seri`);
  }

  // Misi
  const m = (l) => M0.misiBaru(K8.MISI_A, L.laporanBaca(l), kosong);
  const pasang = (set, p, q) => L.ketukBaca(L.ketukBaca(L.pilihSetBaca(a, set), p), q);
  cek(m(pasang("hewan", "bebek", "ayam")).includes("a-lebih") && m(pasang("hewan", "ayam", "bebek")).includes("a-lebih"), "a-lebih: bebek dan ayam, urutan bebas");
  cek(!m(pasang("hewan", "bebek", "sapi")).includes("a-lebih") && !m(L.ketukBaca(a, "bebek")).includes("a-lebih"), "a-lebih butuh pasangan bebek dan ayam");
  cek(m(L.nyalakanBaca(a, "paling", true)).includes("a-paling") && !m(a).includes("a-paling"), "a-paling: paling menyala pada hewan");
  cek(!m(L.nyalakanBaca(L.pilihSetBaca(a, "bunga"), "paling", true)).includes("a-paling"), "a-paling butuh set hewan");
  cek(m(pasang("bunga", "lili", "aster")).includes("a-sama") && !m(pasang("bunga", "lili", "tulip")).includes("a-sama"), "a-sama: lili dan aster pada bunga");
  cek(m(pasang("hewan", "kambing", "sapi")).includes("a-kambing") && !m(pasang("hewan", "ayam", "sapi")).includes("a-kambing"), "a-kambing: kambing dan sapi");
  cek(m(L.nyalakanBaca(pasang("hewan", "ayam", "sapi"), "selisih", true)).includes("a-selisih") && !m(L.nyalakanBaca(L.ketukBaca(a, "ayam"), "selisih", true)).includes("a-selisih") && !m(pasang("hewan", "ayam", "sapi")).includes("a-selisih"), "a-selisih butuh dua baris dan Selisih nyala");
}

/* ------------------------------ Mesin Catat Turus ------------------------------ */
{
  const awal = L.awalMesinCatat();
  sama([awal.keadaan, awal.misi, awal.selesai, awal.posisi, awal.turus], ["catat", 0, false, 0, [0, 0, 0]], "awal mesin catat");
  cek(M0.misiBaru(K8.MISI_A, SEL("lain"), kosong).length === 0, "keadaan selesai lain tidak memenuhi misi A");
  cek(L.KASUS_CATAT.length === 3, "tiga ronde catat");

  // Aliran data: acak tetap, tiap jenis tepat sebanyak n, bukan berurutan.
  L.KASUS_CATAT.forEach((d, misi) => {
    const al = L.aliranCatat(d, misi);
    sama(al.length, L.totalCatat(d), `ronde ${misi}: aliran sepanjang total`);
    sama([0, 1, 2].map((i) => al.filter((c) => c === i).length), d.n, `ronde ${misi}: aliran tepat sebanyak n`);
    sama(L.aliranCatat(d, misi), al, `ronde ${misi}: aliran tetap (tidak acak sungguhan)`);
    cek(al.some((c, k) => k > 0 && c !== al[k - 1]), `ronde ${misi}: aliran bercampur`);
    const terurut = [...al].sort((p, q) => p - q);
    cek(JSON.stringify(al) !== JSON.stringify(terurut), `ronde ${misi}: aliran tidak terurut per jenis`);
    cek(d.n.filter((c) => c === Math.max(...d.n)).length === 1, `ronde ${misi}: satu jenis paling banyak`);
    cek(L.totalCatat(d) === 9, `ronde ${misi}: sembilan data`);
    // Opsi
    const oj = L.opsiJumlahCatat(d, misi);
    cek(new Set(oj).size === 3 && oj.includes(L.totalCatat(d)), `ronde ${misi}: tiga pilihan jumlah termasuk benar`);
    const op = L.opsiPalingCatat(misi);
    cek(new Set(op).size === 3 && op.includes(L.terbanyakCatat(d)), `ronde ${misi}: tiga pilihan paling banyak termasuk benar`);
  });
  const posJ = L.KASUS_CATAT.map((d, i) => L.opsiJumlahCatat(d, i).indexOf(L.totalCatat(d)));
  const posP = L.KASUS_CATAT.map((d, i) => L.opsiPalingCatat(i).indexOf(L.terbanyakCatat(d)));
  cek(new Set(posJ).size >= 2 && new Set(posP).size >= 2, `letak jawaban benar bervariasi (${posJ.join("")} / ${posP.join("")})`);

  // Penolakan di stasiun Catat.
  {
    const b = L.dataBerikutCatat(awal);
    const salah = (b + 1) % 3;
    const x = L.langkahMesinCatat(awal, { t: "CATAT", i: salah });
    sama([x.keadaan, x.ditolak, x.posisi, x.salahRonde], ["catat", 1, 0, 1], "catat baris yang salah ditolak");
    cek(x.pesan.includes(L.namaCatat(L.kasusCatat(awal), b)), "penolakan menyebut baris yang benar");
    const j = L.langkahMesinCatat(awal, { t: "JUMLAH", nilai: 9 });
    sama([j.keadaan, j.ditolak], ["catat", 1], "menghitung sebelum semua tercatat ditolak");
    cek(j.pesan.includes("9"), "penolakan menyebut sisa data");
    sama(L.langkahMesinCatat(awal, { t: "PALING", i: 1 }).ditolak, 1, "membaca sebelum mencatat ditolak");
    sama(L.langkahMesinCatat(awal, { t: "LANJUT" }).ditolak, 1, "lanjut sebelum selesai ditolak");
    sama(L.langkahMesinCatat(awal, { t: "LOMPAT", ke: 2 }).ditolak, 1, "melompat stasiun ditolak");
    sama(L.langkahMesinCatat(awal, { t: "LOMPAT", ke: 0 }), awal, "melompat ke stasiun sendiri tidak apa-apa");
    sama(L.langkahMesinCatat(awal, { t: "CATAT", i: 7 }).ditolak, 1, "baris di luar pilihan ditolak");
  }

  // Satu putaran penuh tanpa kesalahan.
  const rekam = [];
  let x = awal;
  while (!x.selesai) {
    const d = L.kasusCatat(x);
    while (x.keadaan === "catat") x = L.langkahMesinCatat(x, { t: "CATAT", i: L.dataBerikutCatat(x) });
    sama([x.keadaan, x.posisi, x.turus], ["hitung", L.totalCatat(d), d.n], `ronde ${x.misi}: semua tercatat, turus sama dengan n`);
    // Menghitung salah, lalu membaca sebelum menghitung.
    const salahJ = L.langkahMesinCatat(x, { t: "JUMLAH", nilai: L.totalCatat(d) + 1 });
    cek(salahJ.keadaan === "hitung" && salahJ.ditolak === x.ditolak + 1, `ronde ${x.misi}: jumlah salah ditolak`);
    const lompatBaca = L.langkahMesinCatat(x, { t: "PALING", i: L.terbanyakCatat(d) });
    cek(lompatBaca.keadaan === "hitung" && lompatBaca.ditolak === x.ditolak + 1, `ronde ${x.misi}: membaca sebelum menghitung ditolak`);
    const catatLagi = L.langkahMesinCatat(x, { t: "CATAT", i: 0 });
    cek(catatLagi.keadaan === "hitung" && catatLagi.ditolak === x.ditolak + 1, `ronde ${x.misi}: mencatat setelah semua tercatat ditolak`);
    x = L.langkahMesinCatat(x, { t: "JUMLAH", nilai: L.totalCatat(d) });
    sama(x.keadaan, "baca", `ronde ${x.misi}: jumlah benar menuju baca`);
    const salahP = L.langkahMesinCatat(x, { t: "PALING", i: [0, 1, 2].find((i) => i !== L.terbanyakCatat(d)) });
    cek(salahP.keadaan === "baca" && salahP.ditolak === x.ditolak + 1, `ronde ${x.misi}: jenis yang bukan paling banyak ditolak`);
    x = L.langkahMesinCatat(x, { t: "PALING", i: L.terbanyakCatat(d) });
    sama(x.keadaan, "sudah", `ronde ${x.misi}: paling banyak benar menuju selesai ronde`);
    cek(L.petunjukMesinCatat(x).includes("Jumlah semuanya 9"), `ronde ${x.misi}: ringkasan memuat jumlah`);
    rekam.push(x.keadaan);
    x = L.langkahMesinCatat(x, { t: "LANJUT" });
  }
  sama([x.selesai, x.keadaan, x.misi, x.tepat], [true, "selesai", 2, 3], "putaran penuh selesai (penolakan hitung dan baca bukan salah catat, jadi tiga ronde tepat)");
  cek(M0.misiBaru(K8.MISI_A, SEL("mesin-catat"), kosong).includes("a-catat"), "a-catat tercapai dari selesai mesin-catat");
  sama(L.langkahMesinCatat(x, { t: "CATAT", i: 0 }).ditolak, x.ditolak + 1, "setelah selesai, mencatat ditolak");
  sama(L.langkahMesinCatat(x, { t: "ULANG" }), L.awalMesinCatat(), "ulang kembali ke awal");
  sama(L.langkahMesinCatat(awal, { t: "ULANG" }), awal, "ulang sebelum selesai tidak mengubah apa pun");

  // "tepat" hanya naik pada ronde tanpa salah catat.
  let y = awal;
  while (!y.selesai) {
    const d = L.kasusCatat(y);
    while (y.keadaan === "catat") y = L.langkahMesinCatat(y, { t: "CATAT", i: L.dataBerikutCatat(y) });
    y = L.langkahMesinCatat(L.langkahMesinCatat(y, { t: "JUMLAH", nilai: L.totalCatat(d) }), { t: "PALING", i: L.terbanyakCatat(d) });
    y = L.langkahMesinCatat(y, { t: "LANJUT" });
  }
  sama([y.tepat, y.ditolak], [3, 0], "putaran bersih: tiga ronde tepat dan nol penolakan");
  let z = awal;
  z = L.langkahMesinCatat(z, { t: "CATAT", i: (L.dataBerikutCatat(z) + 1) % 3 });
  while (z.keadaan === "catat") z = L.langkahMesinCatat(z, { t: "CATAT", i: L.dataBerikutCatat(z) });
  z = L.langkahMesinCatat(L.langkahMesinCatat(z, { t: "JUMLAH", nilai: 9 }), { t: "PALING", i: L.terbanyakCatat(L.kasusCatat(z)) });
  sama(z.tepat, 0, "ronde dengan satu salah catat tidak dihitung tepat");

  // Brute force: semua peristiwa di semua keadaan tidak merusak invarian.
  const bagi = [];
  let w = awal;
  bagi.push(w);
  while (w.keadaan === "catat") {
    w = L.langkahMesinCatat(w, { t: "CATAT", i: L.dataBerikutCatat(w) });
    bagi.push(w);
  }
  w = L.langkahMesinCatat(w, { t: "JUMLAH", nilai: 9 });
  bagi.push(w);
  w = L.langkahMesinCatat(w, { t: "PALING", i: L.terbanyakCatat(L.kasusCatat(w)) });
  bagi.push(w);
  const P = [
    ...[0, 1, 2, 3].map((i) => ({ t: "CATAT", i })),
    ...[0, 7, 8, 9, 10].map((nilai) => ({ t: "JUMLAH", nilai })),
    ...[0, 1, 2].map((i) => ({ t: "PALING", i })),
    { t: "LANJUT" },
    { t: "ULANG" },
    ...[0, 1, 2, 3].map((ke) => ({ t: "LOMPAT", ke })),
  ];
  for (const s of bagi) {
    for (const p of P) {
      const t = L.langkahMesinCatat(s, p);
      cek(t !== null && typeof t === "object" && t.turus.every((c) => c >= 0) && t.posisi >= 0 && t.posisi <= 9 && t.ditolak >= s.ditolak, `brute catat ${s.keadaan}/${s.posisi}/${JSON.stringify(p)}`);
      cek(t.turus[0] + t.turus[1] + t.turus[2] === t.posisi || t.misi !== s.misi || t.selesai, `brute catat: turus sama dengan posisi (${s.keadaan}/${JSON.stringify(p)})`);
    }
  }
}

/* ------------------------------ Mesin Susun Diagram ------------------------------ */
{
  const awal = L.awalMesinSusun();
  sama([awal.keadaan, awal.misi, awal.selesai, awal.n], ["judul", 0, false, [0, 0, 0, 0]], "awal mesin susun");
  cek(L.KASUS_SUSUN.length === 3 && L.KASUS_SUSUN.every((d) => d.n.filter((c) => c === Math.max(...d.n)).length === 1), "tiga ronde dengan satu baris paling banyak");
  cek(L.KASUS_SUSUN.every((d) => JSON.stringify(d.n) === JSON.stringify(L.SET[d.set].nyata)), "data ronde sama dengan data nyata set");
  cek(L.KASUS_SUSUN.every((d) => L.SET_GAMBAR.includes(d.set)), "ronde memakai set diagram gambar");

  // Opsi.
  L.KASUS_SUSUN.forEach((d, misi) => {
    const j = L.opsiJudulSusun(L.KASUS_SUSUN, misi);
    cek(new Set(j).size === 3 && j.includes(L.SET[d.set].judul), `ronde ${misi}: tiga judul termasuk benar`);
    const k = L.opsiKetSusun(d, misi);
    cek(new Set(k).size === 3 && k.includes(L.ketBenarSusun(d)) && k.filter((s) => s.includes("satu " + L.SET[d.set].satuan)).length === 1, `ronde ${misi}: tiga keterangan dan satu yang benar`);
    const b = L.opsiBacaSusun(d, misi);
    cek(new Set(b).size === 3 && b.includes(L.terbanyakSusun(d)), `ronde ${misi}: tiga pilihan baca termasuk benar`);
  });
  const posJ = L.KASUS_SUSUN.map((d, i) => L.opsiJudulSusun(L.KASUS_SUSUN, i).indexOf(L.SET[d.set].judul));
  const posK = L.KASUS_SUSUN.map((d, i) => L.opsiKetSusun(d, i).indexOf(L.ketBenarSusun(d)));
  const posB = L.KASUS_SUSUN.map((d, i) => L.opsiBacaSusun(d, i).indexOf(L.terbanyakSusun(d)));
  cek(new Set(posJ).size >= 2 && new Set(posK).size >= 2 && new Set(posB).size >= 2, `letak jawaban benar bervariasi (${posJ.join("")} / ${posK.join("")} / ${posB.join("")})`);

  // Penolakan.
  const tolakBaru = (x, p) => {
    const y = L.langkahMesinSusun(x, p);
    return y.ditolak === x.ditolak + 1 && y.keadaan === x.keadaan && y.pesan.length > 10;
  };
  cek(tolakBaru(awal, { t: "TAMBAH", i: 0 }), "menggambar sebelum judul ditolak");
  cek(L.langkahMesinSusun(awal, { t: "TAMBAH", i: 0 }).pesan.includes("judul"), "penolakan menyebut judul");
  cek(tolakBaru(awal, { t: "PERIKSA" }), "periksa sebelum judul ditolak");
  cek(tolakBaru(awal, { t: "KET", nilai: L.ketBenarSusun(L.KASUS_SUSUN[0]) }), "keterangan sebelum judul ditolak");
  cek(tolakBaru(awal, { t: "JAWAB", i: 0 }), "membaca sebelum judul ditolak");
  cek(tolakBaru(awal, { t: "LANJUT" }), "lanjut sebelum selesai ditolak");
  cek(tolakBaru(awal, { t: "LOMPAT", ke: 3 }), "melompat stasiun ditolak");
  cek(tolakBaru(awal, { t: "JUDUL", nilai: L.SET.permainan.judul }), "judul milik data lain ditolak");
  cek(tolakBaru(awal, { t: "JUDUL", nilai: "apa saja" }), "judul asal-asalan ditolak");
  sama(L.langkahMesinSusun(awal, { t: "LOMPAT", ke: 0 }), awal, "melompat ke stasiun sendiri tidak apa-apa");

  const kJudul = L.langkahMesinSusun(awal, { t: "JUDUL", nilai: L.SET.warna.judul });
  sama(kJudul.keadaan, "ket", "judul benar menuju keterangan");
  cek(tolakBaru(kJudul, { t: "TAMBAH", i: 0 }) && kJudul.n.every((c) => c === 0), "menggambar sebelum keterangan ditolak");
  cek(L.langkahMesinSusun(kJudul, { t: "TAMBAH", i: 0 }).pesan.includes("keterangan"), "penolakan menyebut keterangan");
  cek(tolakBaru(kJudul, { t: "JUDUL", nilai: L.SET.warna.judul }), "judul ulang di stasiun keterangan ditolak");
  const ketSalah = L.langkahMesinSusun(kJudul, { t: "KET", nilai: "Satu bintang mewakili dua anak." });
  cek(ketSalah.keadaan === "ket" && ketSalah.ditolak === kJudul.ditolak + 1, "keterangan dua ditolak (satu gambar mewakili satu)");
  const isi = L.langkahMesinSusun(kJudul, { t: "KET", nilai: L.ketBenarSusun(L.KASUS_SUSUN[0]) });
  sama(isi.keadaan, "isi", "keterangan benar menuju gambar");

  // Menggambar.
  const g = (x, i, n) => ulang((y) => L.langkahMesinSusun(y, { t: "TAMBAH", i }), x, n);
  sama(g(isi, 0, 3).n, [3, 0, 0, 0], "tambah tiga gambar pada baris 0");
  sama(L.langkahMesinSusun(g(isi, 2, 2), { t: "KURANG", i: 2 }).n, [0, 0, 1, 0], "kurang satu gambar");
  cek(L.langkahMesinSusun(isi, { t: "KURANG", i: 1 }).pesan.includes("belum punya gambar") && L.langkahMesinSusun(isi, { t: "KURANG", i: 1 }).ditolak === isi.ditolak, "kurang di nol diberi tahu tanpa dihitung salah");
  sama(g(isi, 0, 20).n[0], 12, "baris berhenti di 12");
  sama(L.langkahMesinSusun(isi, { t: "TAMBAH", i: 9 }), isi, "baris di luar pilihan diabaikan");
  // Periksa: menyebut baris pertama yang berbeda dan selisihnya.
  const p0 = L.langkahMesinSusun(isi, { t: "PERIKSA" });
  cek(p0.keadaan === "isi" && p0.ditolak === isi.ditolak + 1 && p0.pesan.includes("merah") && p0.pesan.includes("Tambah 7"), `periksa kosong menyebut merah dan tambah 7: ${p0.pesan}`);
  const lebih = L.langkahMesinSusun(g(g(isi, 0, 9), 1, 3), { t: "PERIKSA" });
  cek(lebih.pesan.includes("merah") && lebih.pesan.includes("Kurangi 2"), `gambar lebih menyebut kurangi: ${lebih.pesan}`);
  const sisi = L.langkahMesinSusun(g(g(g(isi, 0, 7), 1, 3), 2, 5), { t: "PERIKSA" });
  cek(sisi.pesan.includes("hitam") && sisi.pesan.includes("Tambah 2"), `baris pertama yang beda disebut: ${sisi.pesan}`);
  const lengkap = g(g(g(g(isi, 0, 7), 1, 3), 2, 5), 3, 2);
  sama(L.barisBeda(lengkap), -1, "semua baris cocok");
  sama(L.barisBeda(isi), 0, "baris pertama beda pada gambar kosong");
  const baca = L.langkahMesinSusun(lengkap, { t: "PERIKSA" });
  sama(baca.keadaan, "baca", "diagram benar menuju baca");
  cek(tolakBaru(baca, { t: "TAMBAH", i: 0 }) && tolakBaru(baca, { t: "PERIKSA" }), "setelah benar, menggambar dan periksa ulang ditolak");
  const bSalah = L.langkahMesinSusun(baca, { t: "JAWAB", i: 3 });
  cek(bSalah.keadaan === "baca" && bSalah.ditolak === baca.ditolak + 1 && bSalah.pesan.toLowerCase().includes("hitam"), "baca: baris yang bukan paling banyak ditolak");
  const sudah = L.langkahMesinSusun(baca, { t: "JAWAB", i: 0 });
  sama(sudah.keadaan, "sudah", "baca benar menuju selesai ronde");
  cek(L.petunjukMesinSusun(sudah).includes("merah") , "ringkasan menyebut paling banyak");
  sama(L.langkahMesinSusun(sudah, { t: "LANJUT" }).misi, 1, "lanjut ke ronde berikutnya");
  sama(L.langkahMesinSusun(sudah, { t: "LANJUT" }).n, [0, 0, 0, 0], "ronde baru mulai dari gambar kosong");

  // Putaran penuh tanpa kesalahan.
  let x = awal;
  while (!x.selesai) {
    const d = L.kasusSusun(x);
    const judul = L.SET[d.set].judul;
    x = L.langkahMesinSusun(x, { t: "JUDUL", nilai: judul });
    x = L.langkahMesinSusun(x, { t: "KET", nilai: L.ketBenarSusun(d) });
    d.n.forEach((c, i) => {
      x = g(x, i, c);
    });
    x = L.langkahMesinSusun(x, { t: "PERIKSA" });
    x = L.langkahMesinSusun(x, { t: "JAWAB", i: L.terbanyakSusun(d) });
    x = L.langkahMesinSusun(x, { t: "LANJUT" });
  }
  sama([x.selesai, x.keadaan, x.misi, x.tepat, x.ditolak], [true, "selesai", 2, 3, 0], "putaran bersih: tiga diagram tepat");
  cek(M0.misiBaru(K8.MISI_B, SEL("susun-diagram"), kosong).includes("b-susun"), "b-susun tercapai dari selesai susun-diagram");
  sama(L.langkahMesinSusun(x, { t: "ULANG" }), L.awalMesinSusun(), "ulang kembali ke awal");
  sama(L.langkahMesinSusun(awal, { t: "ULANG" }), awal, "ulang sebelum selesai tidak mengubah apa pun");
  // Satu salah: tepat tidak naik.
  let y = L.langkahMesinSusun(awal, { t: "JUDUL", nilai: "salah" });
  y = L.langkahMesinSusun(y, { t: "JUDUL", nilai: L.SET.warna.judul });
  y = L.langkahMesinSusun(y, { t: "KET", nilai: L.ketBenarSusun(L.KASUS_SUSUN[0]) });
  L.KASUS_SUSUN[0].n.forEach((c, i) => {
    y = g(y, i, c);
  });
  y = L.langkahMesinSusun(L.langkahMesinSusun(y, { t: "PERIKSA" }), { t: "JAWAB", i: 0 });
  sama([y.keadaan, y.tepat], ["sudah", 0], "ronde dengan satu penolakan tidak dihitung tepat");

  // Brute force semua peristiwa di semua keadaan.
  const bagi = [awal, kJudul, isi, lengkap, baca, sudah];
  const P = [
    { t: "JUDUL", nilai: L.SET.warna.judul },
    { t: "JUDUL", nilai: "x" },
    { t: "KET", nilai: L.ketBenarSusun(L.KASUS_SUSUN[0]) },
    { t: "KET", nilai: "x" },
    ...[0, 1, 2, 3, 4].map((i) => ({ t: "TAMBAH", i })),
    ...[0, 1, 2, 3, 4].map((i) => ({ t: "KURANG", i })),
    { t: "PERIKSA" },
    ...[0, 1, 2, 3].map((i) => ({ t: "JAWAB", i })),
    { t: "LANJUT" },
    { t: "ULANG" },
    ...[0, 1, 2, 3, 4].map((ke) => ({ t: "LOMPAT", ke })),
  ];
  for (const s of bagi) {
    for (const p of P) {
      const t = L.langkahMesinSusun(s, p);
      cek(t !== null && typeof t === "object" && t.n.length === 4 && t.n.every((c) => c >= 0 && c <= 12) && t.ditolak >= s.ditolak, `brute susun ${s.keadaan}/${JSON.stringify(p)}`);
      if (s.keadaan !== "isi") cek(JSON.stringify(t.n) === JSON.stringify(s.n) || p.t === "LANJUT" || p.t === "KET" || p.t === "ULANG", `brute susun: gambar tidak berubah di luar stasiun Gambar (${s.keadaan}/${JSON.stringify(p)})`);
    }
  }
}

/* ------------------------------ Semua misi tercapai lewat alat nyata ------------------------------ */
{
  const a = L.awalLab("turus");
  const ka = [];
  ka.push(turus(atur(a, [5, 0, 0, 0])));
  ka.push(turus(atur(a, [0, 10, 0, 0])));
  ka.push(turus(L.nyalakanLab(atur(a, [2, 6, 4, 3]), "tabel", true)));
  ka.push(SEL("mesin-catat"));
  const b = L.awalBaca();
  const pas = (set, p, q) => L.ketukBaca(L.ketukBaca(L.pilihSetBaca(b, set), p), q);
  ka.push(L.laporanBaca(pas("hewan", "bebek", "ayam")));
  ka.push(L.laporanBaca(L.nyalakanBaca(b, "paling", true)));
  ka.push(L.laporanBaca(pas("bunga", "lili", "aster")), L.laporanBaca(pas("hewan", "kambing", "sapi")));
  ka.push(L.laporanBaca(L.nyalakanBaca(pas("hewan", "ayam", "sapi"), "selisih", true)));
  ka.push(turus(L.nyalakanLab(atur(a, [1, 0, 0, 0]), "benda", true)));
  ka.push(turus(L.setKelompokLab(atur(a, [9, 0, 0, 0]), false)));
  const semuaA = semuaMisi("A", ka);
  for (const m of K8.MISI_A) cek(semuaA.has(m.id), `k2bab8 A: ${m.id} tercapai`);

  const c = L.awalLab("gambar");
  const kb = [];
  kb.push(gambar(L.pilihLambangLab(atur(c, [3, 0, 0, 0]), "hati")));
  kb.push(gambar(atur(c, [7, 0, 0, 2])));
  kb.push(gambar(L.nyalakanLab(atur(c, [8, 0, 0, 0]), "turus", true)));
  kb.push(SEL("susun-diagram"), SEL("survei-kira"));
  kb.push(gambar(atur(c, [4, 4, 0, 0])), gambar(atur(c, [0, 12, 0, 0])), gambar(atur(L.pilihSetLab(c, "permainan"), [4, 0, 0, 7])), gambar(atur(c, [5, 5, 5, 5])));
  const semuaB = semuaMisi("B", kb);
  for (const m of K8.MISI_B) cek(semuaB.has(m.id), `k2bab8 B: ${m.id} tercapai`);

  // Keadaan selesai dari skenario atau mesin lain tidak memenuhi misi yang bukan miliknya.
  cek(!ada("B", SEL("tebak-banyak"), "b-skenario") && !ada("B", SEL("mesin-catat"), "b-skenario") && !ada("B", SEL("susun-diagram"), "b-skenario"), "b-skenario hanya dari Survei Kira");
  cek(!ada("A", SEL("susun-diagram"), "a-catat") && !ada("A", SEL("survei-kira"), "a-catat"), "a-catat hanya dari Mesin Catat");
  cek(!ada("B", SEL("mesin-catat"), "b-susun"), "b-susun hanya dari Mesin Susun");
  // Alat sub-bab A tidak memenuhi misi B, dan sebaliknya.
  cek(semuaMisi("B", [turus(atur(a, [5, 5, 5, 5])), L.laporanBaca(pas("hewan", "bebek", "ayam"))]).size === 0, "alat sub-bab A tidak memenuhi misi B");
  cek(semuaMisi("A", [gambar(atur(c, [5, 5, 5, 5])), gambar(atur(c, [5, 5, 0, 0]))]).size === 0, "alat sub-bab B tidak memenuhi misi A");
  // Awal semua alat: nol misi.
  cek(semuaMisi("A", [turus(a), L.laporanBaca(b)]).size === 0 && semuaMisi("B", [gambar(c)]).size === 0, "keadaan awal semua alat memenuhi nol misi");
  // Misi yang sudah tercapai tidak dicabut: misiBaru hanya menambah.
  const sudah = new Set(["a-lima"]);
  cek(!M0.misiBaru(K8.MISI_A, turus(atur(a, [5, 0, 0, 0])), sudah).includes("a-lima"), "misi yang sudah tercatat tidak dilaporkan ulang");
  // Gerbang.
  for (const sub of ["A", "B"]) {
    const tampil = M0.tampilMisi(K8.daftarMisiK2Bab8(sub));
    const wajibId = tampil.filter((x) => x.wajib).map((x) => x.id);
    cek(!M0.wajibSelesai(tampil, new Set(wajibId.slice(1))) && M0.wajibSelesai(tampil, new Set(wajibId)), `k2bab8 ${sub}: gerbang butuh semua misi wajib`);
    cek(!M0.wajibSelesai(tampil, new Set()), `k2bab8 ${sub}: gerbang tertutup tanpa misi`);
    const o = { adaMisi: true, wajibSelesai: false, dilewati: false, disentuh: false };
    cek(!M0.bolehLanjut(o) && !M0.bolehLewati(o), `k2bab8 ${sub}: belum disentuh, tidak bisa lanjut maupun lewati`);
    cek(M0.bolehLewati({ ...o, disentuh: true }) && M0.bolehLanjut({ ...o, disentuh: true, dilewati: true }), `k2bab8 ${sub}: setelah disentuh bisa lewati misi lalu lanjut`);
  }
}

console.log(gagal === 0 ? `SEMUA LULUS (${lulus} cek)` : `GAGAL ${gagal} dari ${lulus + gagal}`);
process.exit(gagal === 0 ? 0 : 1);
