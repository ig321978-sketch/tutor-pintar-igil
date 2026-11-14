// Uji logika susun tab (peta konsep dan tabel): pengacakan tanpa titik tetap, menempel/kembali, tab setara, pemeriksaan data.
const S = await import("../src/components/modul/susun-logika.ts");
let lulus = 0, gagal = 0;
const cek = (ok, ket) => { if (ok) lulus += 1; else { gagal += 1; console.log("GAGAL:", ket); } };

for (let n = 2; n <= 24; n += 1) for (let b = 1; b <= 200; b += 1) {
  const a = S.urutanAcak(n, b);
  if (new Set(a).size !== n || a.some((v) => v < 0 || v >= n)) cek(false, `permutasi sah n=${n} benih=${b}`);
  else if (a.some((v, i) => v === i)) cek(false, `titik tetap n=${n} benih=${b}`);
  else lulus += 1;
}
cek(JSON.stringify(S.urutanAcak(9, 65)) === JSON.stringify(S.urutanAcak(9, 65)), "pengacakan tetap (deterministik)");

const tabs = [{ id: "t1", teks: "Satu" }, { id: "t2", teks: "Dua" }, { id: "t3", teks: "dua " }];
const tempat = [{ id: "p1", jawaban: "satu", label: "nomor 1" }, { id: "p2", jawaban: "Dua", label: "nomor 2" }, { id: "p3", jawaban: "Dua", label: "nomor 3" }];
let k = S.awalSusun();
k = S.letakkanTab(tabs, tempat, k, "t1", "p2");
cek(k.salah === 1 && !k.pasang.p2 && k.kabar.jenis === "coba", "tab salah tempat kembali ke baki dengan petunjuk");
k = S.letakkanTab(tabs, tempat, k, "t1", "p1");
cek(k.pasang.p1 === "t1" && k.kabar.jenis === "benar", "tab cocok menempel");
k = S.letakkanTab(tabs, tempat, k, "t3", "p2");
cek(k.pasang.p2 === "t3", "tab berteks sama (huruf besar/spasi berbeda) setara");
const k2 = S.letakkanTab(tabs, tempat, k, "t2", "p2");
cek(k2.pasang.p2 === "t3" && k2.kabar.jenis === "info", "tempat terisi tidak ditimpa");
k = S.letakkanTab(tabs, tempat, k, "t2", "p3");
cek(S.semuaPasang(tempat, k) && S.tabDiBaki(tabs, k).length === 0, "semua terpasang");
k = S.kembalikanTab(k, "p3");
cek(!k.pasang.p3 && S.tabDiBaki(tabs, k).map((t) => t.id).join() === "t2", "tab dikembalikan ke baki");
let m = S.pilihTab(tabs, S.awalSusun(), "t2");
cek(m.dipilih === "t2", "tab dipegang");
m = S.pilihTab(tabs, m, "t2");
cek(m.dipilih === null, "ketuk lagi melepaskan");
cek(S.pilihTab(tabs, k, "t1") === k, "tab yang sudah menempel tidak bisa dipegang");
cek(S.letakkanTab(tabs, tempat, S.awalSusun(), "tx", "p1").salah === 0, "tab tak dikenal diabaikan");

const peta = { pusat: { judul: "x", ikon: "1", suara: "y" }, petunjuk: "z", simpul: [
  { id: "a", nomor: 1, induk: null, teks: "A" }, { id: "b", nomor: 2, induk: "a", teks: "B" }, { id: "c", nomor: 3, induk: "a", teks: "C" },
  { id: "d", nomor: 4, induk: null, teks: "D" }, { id: "e", nomor: 5, induk: "d", teks: "E" }] };
cek(S.periksaPeta(peta).length === 0, "peta contoh sah");
cek(S.periksaPeta({ ...peta, simpul: peta.simpul.slice(0, 4) }).length > 0, "peta terlalu kecil ditolak");
cek(S.periksaPeta({ ...peta, simpul: peta.simpul.map((s) => (s.id === "e" ? { ...s, teks: "d" } : s)) }).length > 0, "teks kembar ditolak");
cek(S.periksaPeta({ ...peta, simpul: peta.simpul.map((s) => (s.id === "b" ? { ...s, induk: "e" } : s)) }).length > 0, "induk yang muncul belakangan ditolak");
cek(S.periksaPeta({ ...peta, simpul: peta.simpul.map((s, i) => (i === 2 ? { ...s, nomor: 9 } : s)) }).length > 0, "nomor tidak berurutan ditolak");
const tabel = { judul: "j", petunjuk: "p", suara: "s", pojok: "t", kolom: ["K1", "K2"], baris: [{ label: "B1", sel: ["a", "b"] }, { label: "B2", sel: ["c", "d"] }] };
cek(S.periksaTabel(tabel).length === 0, "tabel contoh sah");
cek(S.periksaTabel({ ...tabel, baris: [{ label: "B1", sel: ["a"] }, tabel.baris[1]] }).length > 0, "baris dengan sel kurang ditolak");
cek(S.periksaTabel({ ...tabel, baris: [tabel.baris[0], { label: "B1", sel: ["c", "d"] }] }).length > 0, "label baris kembar ditolak");
cek(S.periksaTabel({ ...tabel, kolom: ["K1"] }).length > 0, "satu kolom ditolak");
cek(S.tabTabel(tabel).length === 4 && S.tempatTabel(tabel)[3].id === "s2-2", "tab dan tempat tabel dibentuk dari sel");
console.log(`uji-susun-logika: ${lulus} lulus, ${gagal} gagal`);
process.exit(gagal ? 1 : 0);
