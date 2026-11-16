// Uji Mesin Soal Tindakan Opsi 2 (src/lib/opsi2): logika murni, tanpa React.
// Pakai: node --no-warnings scripts/uji-opsi2-mesin.mjs
// Tiap tindakan Concrete diuji untuk ribuan benih: instans sah, kunci dihitung ulang dengan kode TERPISAH dari pembangkit,
// jawaban benar diterima dan jawaban salah ditolak, aturan teks (tanpa digit, kalimat pendek, kata terlarang), batas tahap, tanpa skor.
import { register } from "node:module";
import fs from "node:fs";
import path from "node:path";
register(
  "data:text/javascript," +
    encodeURIComponent(
      "export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch { return n(s, c); } } return n(s, c); }",
    ),
  import.meta.url,
);
const M = await import("../src/lib/opsi2/index.ts");
const { CPA_K1B1A } = await import("../src/data/opsi2/k1b1a-cpa.ts");

let lulus = 0, gagal = 0;
const cek = (ok, ket) => { if (ok) lulus += 1; else { gagal += 1; if (gagal <= 40) console.log("GAGAL:", ket); } };
const BENIH = 2000;
const KATA = ["nol", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan", "sepuluh"];
const angkaDariKata = (t) => { const m = t.toLowerCase().split(/[^a-z]+/).map((w) => KATA.indexOf(w)).filter((i) => i >= 0); return m; };

/* ------------------------------ Pengacak, templat, registri ------------------------------ */
{
  const a = M.pengacak(7), b = M.pengacak(7), c = M.pengacak(8);
  const sa = [a.int(0, 99), a.int(0, 99), a.int(0, 99)], sb = [b.int(0, 99), b.int(0, 99), b.int(0, 99)], sc = [c.int(0, 99), c.int(0, 99), c.int(0, 99)];
  cek(JSON.stringify(sa) === JSON.stringify(sb), "pengacak berbenih dapat diulang");
  cek(JSON.stringify(sa) !== JSON.stringify(sc), "benih beda hasil beda");
  const k = M.pengacak(3).kocok([1, 2, 3, 4, 5]).sort();
  cek(JSON.stringify(k) === "[1,2,3,4,5]", "kocok mempertahankan unsur");
  cek(M.isiTemplat("Seret {n} apel.", { n: "tujuh" }) === "Seret tujuh apel.", "isiTemplat");
  let g = false; try { M.isiTemplat("Seret {x} apel.", { n: "a" }); } catch { g = true; }
  cek(g, "isiTemplat galat untuk sisipan tanpa isi");
  g = false; try { M.registrasiTindakan({ id: "c-ketuk-hitung", tahap: "picture", nama: "x", buat() {}, periksa() {}, jawabanBenar() {} }); } catch { g = true; }
  cek(g, "registri menolak id sama beda tahap");
  g = false; try { M.buatSoal({ nomor: 1, tindakan: "tidak-ada", instruksi: "x", param: {} }, 1); } catch { g = true; }
  cek(g, "buatSoal galat untuk tindakan tak terdaftar");
}
const ID_CONCRETE = ["c-ketuk-hitung", "c-geser-piring", "c-seret-keranjang", "c-melingkar-bendera", "c-sekilas", "c-pilah-apel", "c-jejer-deret", "c-isi-nampan", "c-keranjang-kosong", "c-cari-terlewat"];
cek(JSON.stringify(M.daftarTindakan("concrete").map((t) => t.id).sort()) === JSON.stringify([...ID_CONCRETE].sort()), "daftarTindakan(concrete) = sepuluh tindakan Kelas 1 Sub-Bab A");

/* ------------------------------ Validator katalog ------------------------------ */
const concrete = CPA_K1B1A.concrete.soal;
cek(M.validasiKatalog(concrete, "concrete").length === 0, `katalog Concrete valid: ${M.validasiKatalog(concrete, "concrete").join(" | ")}`);
{
  const sp = (n, t) => ({ nomor: n, tindakan: t, instruksi: "Ketuk apel.", param: {} });
  cek(M.validasiKatalog(concrete.slice(0, 9), "concrete").length > 0, "validator menolak sembilan soal");
  cek(M.validasiKatalog([...concrete, sp(11, "c-sekilas")], "concrete").length > 0, "validator menolak sebelas soal");
  const lompat = concrete.map((s, i) => (i === 9 ? { ...s, nomor: 11 } : s));
  cek(M.validasiKatalog(lompat, "concrete").length > 0, "validator menolak nomor melompat");
  const kembar = concrete.map((s, i) => (i === 9 ? { ...s, nomor: 9 } : s));
  cek(M.validasiKatalog(kembar, "concrete").length > 0, "validator menolak nomor kembar");
  const tindakanSama = concrete.map((s, i) => (i === 9 ? { ...s, tindakan: "c-sekilas" } : s));
  cek(M.validasiKatalog(tindakanSama, "concrete").some((x) => x.includes("lebih dari satu soal")), "validator menolak tindakan kembar");
  const asing = concrete.map((s, i) => (i === 9 ? { ...s, tindakan: "c-tidak-ada" } : s));
  cek(M.validasiKatalog(asing, "concrete").some((x) => x.includes("belum terdaftar")), "validator menolak tindakan tak terdaftar");
  cek(M.validasiKatalog(concrete, "picture").some((x) => x.includes("milik tahap concrete")), "validator menolak tindakan beda tahap");
  const kosong = concrete.map((s, i) => (i === 0 ? { ...s, instruksi: " " } : s));
  cek(M.validasiKatalog(kosong, "concrete").some((x) => x.includes("instruksi kosong")), "validator menolak instruksi kosong");
  for (const t of ["picture", "abstract"]) {
    cek(CPA_K1B1A[t].soal.length === 10 && (CPA_K1B1A[t].status === "belum-ditulis" || (CPA_K1B1A[t].status === "lengkap" && M.validasiKatalog(CPA_K1B1A[t].soal, t).length === 0)), `${t}: sepuluh soal, kerangka belum-ditulis atau lengkap dan sah`);
    cek(M.validasiKatalog(CPA_K1B1A[t].soal, t, { izinkanBelumTerdaftar: true }).length === 0, `${t}: kerangka sah secara struktur`);
  }
}

/* ------------------------------ Aturan teks ------------------------------ */
{
  cek(M.periksaTeks("Ketuk apel satu per satu.", "x").length === 0, "teks wajar lolos");
  cek(M.periksaTeks("Ada 7 apel.", "x").length > 0, "digit ditolak");
  cek(M.periksaTeks("Satu dua tiga empat lima enam tujuh delapan sembilan.", "x").length > 0, "kalimat sembilan kata ditolak");
  for (const k of ["kelompok", "kelas", "buku", "teman", "Pak", "Bu", "Ibu", "lebih", "kurang", "tambah", "maju", "mundur", "skor", "nilai", "poin"]) cek(M.periksaTeks(`Ayo ${k} sekarang.`, "x").length > 0, `kata terlarang "${k}" ditolak`);
  cek(M.periksaTeks("Kita bermain bukit dan ibunda.", "x").length === 0, "kata terlarang hanya cocok utuh (bukit dan ibunda lolos)");
  for (const u of M.semuaUmpan()) cek(M.periksaTeks(u, `umpan "${u}"`).length === 0, `umpan "${u}" lolos aturan teks: ${M.periksaTeks(u, "u").join(";")}`);
  for (const n of [1, 2, 3, 4, 5]) cek(M.umpanBenar(n).length > 0, "umpan benar ada");
}

/* ------------------------------ Pembantu independen (tidak memakai pembangkit) ------------------------------ */
const jarak = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
const semuaId = (s) => s.data.item.map((b) => b.id);
const salahPilih = (s) => s.pilihan.filter((p) => p.id !== s.kunciPilihan).map((p) => p.id);
const dalamPersen = (it) => it.x >= 0 && it.x <= 100 && it.y >= 0 && it.y <= 100;
const tdkBertumpuk = (items, min) => items.every((a, i) => items.every((b, j) => i >= j || jarak(a, b) >= min));
const unikId = (a) => new Set(a).size === a.length;

function periksaDasar(s, spec, benih, n0 = 0) {
  const ket = `${spec.tindakan}@${benih}`;
  const galat = M.periksaInstansUmum(s, "concrete");
  cek(galat.length === 0, `${ket}: ${galat.join(" | ")}`);
  cek(s.nomor === spec.nomor && s.tindakan === spec.tindakan && s.tahap === "concrete", `${ket}: identitas soal`);
  cek(JSON.stringify(JSON.parse(JSON.stringify(s))) === JSON.stringify(s), `${ket}: instans murni data JSON`);
  const ulang = M.buatSoal(spec, benih);
  cek(JSON.stringify(ulang) === JSON.stringify(s), `${ket}: benih sama soal sama`);
  const t = M.ambilTindakan(spec.tindakan);
  const benar = t.jawabanBenar(s);
  cek(t.periksa(s, benar).benar === true, `${ket}: jawaban benar diterima`);
  // Jawaban asing tidak boleh melempar galat dan harus ditolak.
  for (const asing of [null, undefined, 5, "x", [], {}, { pilih: "zzz" }, { ids: "x" }]) {
    let h;
    try { h = t.periksa(s, asing); } catch (e) { h = null; cek(false, `${ket}: periksa melempar untuk ${JSON.stringify(asing)}: ${e.message}`); }
    if (h) cek(h.benar === false, `${ket}: jawaban asing ${JSON.stringify(asing)} harus ditolak`);
    if (h && h.petunjuk) cek(M.periksaTeks(h.petunjuk.pesan, `${ket} pesan`).length === 0 && h.petunjuk.sasaran.every((x) => typeof x === "string"), `${ket}: petunjuk sah (${h.petunjuk.pesan})`);
  }
  return { t, benar };
}

const SPEC = Object.fromEntries(concrete.map((x) => [x.tindakan, x]));
const BANYAK = new Map(); // tindakan -> himpunan n yang muncul (keragaman)
const catat = (id, n) => { if (!BANYAK.has(id)) BANYAK.set(id, new Set()); BANYAK.get(id).add(n); };

for (let benih = 1; benih <= BENIH; benih += 1) {
  /* ---- 1 ketuk-hitung, 2 geser-piring, 7 jejer-deret: semua benda lalu pilih banyaknya ---- */
  for (const [id, kd] of [["c-ketuk-hitung", "urutan"], ["c-geser-piring", "dipindah"], ["c-jejer-deret", "deret"]]) {
    const spec = SPEC[id];
    const s = M.buatSoal(spec, benih);
    const { t, benar } = periksaDasar(s, spec, benih);
    const n = s.data.item.length;
    const [lo, hi] = spec.param.rentang;
    cek(n >= lo && n <= hi && n >= 1 && n <= 10, `${id}@${benih}: n ${n} dalam rentang`);
    catat(id, n);
    cek(s.data.item.every((b) => b.jenis === "apel") && unikId(semuaId(s)) && s.data.item.every(dalamPersen) && tdkBertumpuk(s.data.item, 15), `${id}@${benih}: benda tersebar sah dan tidak bertumpuk`);
    cek(s.kunciPilihan === String(n) && s.pilihan.find((p) => p.id === String(n)).label === KATA[n], `${id}@${benih}: kunci = banyaknya benda (${n})`);
    cek(s.kunci === n, `${id}@${benih}: kunci pembangkit sama dengan hitung ulang`);
    cek(s.pilihan.length === spec.param.jumlahPilihan && s.percobaan === s.pilihan.length, `${id}@${benih}: percobaan = jumlah pilihan`);
    cek(s.pilihan.every((p) => KATA.includes(p.label) && p.suara === p.label), `${id}@${benih}: pilihan berupa kata bilangan`);
    cek(s.pilihan.every((p) => Number(p.id) >= 0 && Number(p.id) <= 10), `${id}@${benih}: pilihan 0 sampai 10`);
    cek((s.pengecoh ?? []).length === s.pilihan.length - 1 && s.pengecoh.every((p) => p.alasan.length > 3), `${id}@${benih}: pengecoh bercatat kekeliruan`);
    cek(benar[kd].length === n, `${id}@${benih}: jawabanBenar memuat semua benda`);
    for (const w of salahPilih(s)) cek(t.periksa(s, { ...benar, pilih: w }).benar === false, `${id}@${benih}: pilihan salah ${w} ditolak`);
    cek(t.periksa(s, { ...benar, [kd]: benar[kd].slice(0, -1) }).benar === false, `${id}@${benih}: tindakan belum lengkap ditolak`);
    cek(t.periksa(s, { ...benar, [kd]: [] }).benar === false, `${id}@${benih}: tindakan kosong ditolak`);
    cek(t.periksa(s, { ...benar, [kd]: [...benar[kd].slice(0, -1), benar[kd][0]] }).benar === false, `${id}@${benih}: benda terhitung dua kali ditolak`);
    const h = t.periksa(s, { ...benar, [kd]: benar[kd].slice(0, -1) });
    cek(h.petunjuk && h.petunjuk.sasaran.length === 1 && h.petunjuk.sasaran[0] === benar[kd].at(-1), `${id}@${benih}: petunjuk menunjuk benda yang terlewat`);
  }

  /* ---- 3 seret-keranjang: tepat n ---- */
  {
    const spec = SPEC["c-seret-keranjang"];
    const s = M.buatSoal(spec, benih);
    const { t } = periksaDasar(s, spec, benih);
    const n = angkaDariKata(s.suara)[0];
    catat("c-seret-keranjang", n);
    cek(n >= spec.param.rentang[0] && n <= spec.param.rentang[1], `seret@${benih}: n ${n} dalam rentang`);
    cek(s.kunci === n && s.percobaan === 3 && !s.pilihan, `seret@${benih}: kunci n, tanpa pilihan, tiga percobaan`);
    const ids = semuaId(s);
    cek(ids.length >= n && ids.length <= 10 && s.data.item.every(dalamPersen) && tdkBertumpuk(s.data.item, 15), `seret@${benih}: tersedia cukup apel (paling banyak sepuluh)`);
    for (let k = 0; k <= ids.length; k += 1) {
      const h = t.periksa(s, { ids: ids.slice(0, k) });
      cek(h.benar === (k === n), `seret@${benih}: ${k} apel di keranjang ${k === n ? "benar" : "salah"}`);
      if (k > n) cek(h.petunjuk.sasaran.length === k - n && h.petunjuk.sasaran.every((x) => ids.slice(0, k).includes(x)), `seret@${benih}: petunjuk kelebihan`);
      if (k < n) cek(h.petunjuk.sasaran.length === n - k && h.petunjuk.sasaran.every((x) => !ids.slice(0, k).includes(x)), `seret@${benih}: petunjuk kekurangan`);
    }
    cek(t.periksa(s, { ids: [ids[0], ids[0]] }).benar === false, `seret@${benih}: apel kembar ditolak`);
    cek(M.periksaTeks(s.penjelasan, "p").length === 0 && KATA.some((k) => s.penjelasan.includes(k)), `seret@${benih}: penjelasan menyebut banyaknya`);
  }

  /* ---- 4 melingkar-bendera ---- */
  {
    const spec = SPEC["c-melingkar-bendera"];
    const s = M.buatSoal(spec, benih);
    const { t, benar } = periksaDasar(s, spec, benih);
    const items = s.data.item;
    const n = items.length;
    catat("c-melingkar-bendera", n);
    cek(n >= spec.param.rentang[0] && n <= spec.param.rentang[1] && n <= 10, `melingkar@${benih}: n ${n}`);
    // Benda benar-benar melingkar: jarak ke pusat hampir sama (elips 36 x 34).
    const pusat = { x: 50, y: 50 };
    cek(items.every((b) => { const d = jarak(b, pusat); return d > 30 && d < 40; }) && tdkBertumpuk(items, 15), `melingkar@${benih}: benda melingkar dan tidak bertumpuk`);
    cek(s.kunciPilihan === String(n) && s.kunci === n, `melingkar@${benih}: kunci n`);
    cek(s.percobaan === s.pilihan.length, `melingkar@${benih}: percobaan = pilihan`);
    cek(s.pengecoh.some((p) => /bendera/.test(p.alasan)) || !s.pilihan.some((p) => p.id === String(n + 1)), `melingkar@${benih}: pengecoh bendera dua kali`);
    // Berjalan searah dari benda mana pun, dua arah: benar. Meloncat atau berhenti di tengah: salah.
    const ids = items.map((b) => b.id);
    for (const mulai of [0, Math.floor(n / 2), n - 1]) {
      for (const arah of [1, -1]) {
        const urutan = ids.map((_, k) => ids[(((mulai + arah * k) % n) + n) % n]);
        cek(t.periksa(s, { bendera: urutan[0], urutan, pilih: s.kunciPilihan }).benar === true, `melingkar@${benih}: ${mulai}/${arah} benar`);
        cek(t.periksa(s, { bendera: urutan[1], urutan, pilih: s.kunciPilihan }).benar === false, `melingkar@${benih}: bendera bukan benda pertama ditolak`);
        cek(t.periksa(s, { bendera: urutan[0], urutan: urutan.slice(0, -1), pilih: s.kunciPilihan }).benar === false, `melingkar@${benih}: urutan belum selesai ditolak`);
        cek(t.periksa(s, { bendera: urutan[0], urutan: [...urutan.slice(0, -1), urutan[0]], pilih: s.kunciPilihan }).benar === false, `melingkar@${benih}: bendera terhitung dua kali ditolak`);
        const lompat = urutan.slice(); [lompat[1], lompat[2]] = [lompat[2], lompat[1]];
        cek(t.periksa(s, { bendera: lompat[0], urutan: lompat, pilih: s.kunciPilihan }).benar === false, `melingkar@${benih}: loncat ditolak`);
      }
    }
    for (const w of salahPilih(s)) cek(t.periksa(s, { ...benar, pilih: w }).benar === false, `melingkar@${benih}: pilihan salah ${w}`);
  }

  /* ---- 5 isi-nampan ---- */
  {
    const spec = SPEC["c-isi-nampan"];
    const s = M.buatSoal(spec, benih);
    const { t } = periksaDasar(s, spec, benih);
    const n = angkaDariKata(s.suara)[0];
    catat("c-isi-nampan", n);
    cek(n >= spec.param.rentang[0] && n <= 10 && s.kunci === n && s.percobaan === 3 && !s.pilihan, `nampan@${benih}: n ${n}, tiga percobaan`);
    cek(s.data.lubang === 10 && s.data.baris * s.data.kolom === 10 && s.data.bahan >= n, `nampan@${benih}: sepuluh lubang`);
    for (let k = 0; k <= 10; k += 1) {
      const h = t.periksa(s, { isi: k });
      cek(h.benar === (k === n), `nampan@${benih}: isi ${k}`);
      if (k < n) cek(h.petunjuk.sasaran.length === 1 && h.petunjuk.sasaran[0] === `l${k + 1}`, `nampan@${benih}: petunjuk lubang berikutnya`);
      if (k > n) cek(h.petunjuk.sasaran.length === k - n, `nampan@${benih}: petunjuk kelebihan`);
    }
    cek(t.periksa(s, { isi: -1 }).benar === false && t.periksa(s, { isi: 11 }).benar === false && t.periksa(s, { isi: 2.5 }).benar === false, `nampan@${benih}: isi tak sah ditolak`);
  }

  /* ---- 6 sekilas ---- */
  {
    const spec = SPEC["c-sekilas"];
    const s = M.buatSoal(spec, benih);
    const { t, benar } = periksaDasar(s, spec, benih);
    const n = s.data.item.length;
    catat("c-sekilas", n);
    cek(n >= 1 && n <= 4 && s.pilihan.every((p) => Number(p.id) >= 1 && Number(p.id) <= 4), `sekilas@${benih}: satu sampai empat`);
    cek(s.kunciPilihan === String(n) && s.kunci === n && s.percobaan === s.pilihan.length && s.pilihan.length === 3, `sekilas@${benih}: kunci dan percobaan`);
    cek(s.data.tampilMs >= 1000 && s.data.tampilMs <= 3000 && s.data.penutup === "daun", `sekilas@${benih}: benda tampil sebentar lalu tertutup`);
    cek(s.data.item.every(dalamPersen) && tdkBertumpuk(s.data.item, 15), `sekilas@${benih}: benda tidak bertumpuk`);
    for (const w of salahPilih(s)) { const h = t.periksa(s, { pilih: w }); cek(h.benar === false && h.petunjuk.sasaran.length === n, `sekilas@${benih}: pilihan salah ${w} ditolak dengan petunjuk putar ulang`); }
    cek(t.periksa(s, benar).benar, `sekilas@${benih}: benar`);
  }

  /* ---- 7 pilah-apel ---- */
  {
    const spec = SPEC["c-pilah-apel"];
    const s = M.buatSoal(spec, benih);
    const { t, benar } = periksaDasar(s, spec, benih);
    const apel = s.data.item.filter((b) => b.jenis === "apel");
    const jeruk = s.data.item.filter((b) => b.jenis === "jeruk");
    const a = apel.length;
    catat("c-pilah-apel", a);
    cek(a >= 2 && a <= 6 && jeruk.length >= 2 && a + jeruk.length <= 10, `pilah@${benih}: ${a} apel ${jeruk.length} jeruk, total paling banyak sepuluh`);
    cek(unikId(semuaId(s)) && s.data.item.every((b) => b.jenis === "apel" || b.jenis === "jeruk") && tdkBertumpuk(s.data.item, 15), `pilah@${benih}: benda sah`);
    cek(s.kunciPilihan === String(a) && s.kunci === a && s.percobaan === s.pilihan.length && s.pilihan.length === 4, `pilah@${benih}: kunci apel`);
    cek(s.pengecoh.some((p) => p.id === String(a + jeruk.length) && /jeruk/.test(p.alasan)) , `pilah@${benih}: pengecoh jeruk ikut terhitung`);
    const idA = apel.map((b) => b.id), idJ = jeruk.map((b) => b.id);
    cek(t.periksa(s, { dipilih: [...idA, idJ[0]], pilih: s.kunciPilihan }).benar === false, `pilah@${benih}: jeruk terpilih ditolak`);
    cek(t.periksa(s, { dipilih: idA.slice(0, -1), pilih: s.kunciPilihan }).benar === false, `pilah@${benih}: apel terlewat ditolak`);
    cek(t.periksa(s, { dipilih: [], pilih: s.kunciPilihan }).benar === false, `pilah@${benih}: tanpa pilihan ditolak`);
    const h = t.periksa(s, { dipilih: [...idA, idJ[0]], pilih: s.kunciPilihan });
    cek(h.petunjuk.sasaran.length === 1 && h.petunjuk.sasaran[0] === idJ[0], `pilah@${benih}: petunjuk menunjuk jeruk yang salah`);
    for (const w of salahPilih(s)) cek(t.periksa(s, { ...benar, pilih: w }).benar === false, `pilah@${benih}: pilihan ${w} ditolak`);
  }

  /* ---- 8 isi... keranjang-kosong (nol) ---- */
  {
    const spec = SPEC["c-keranjang-kosong"];
    const s = M.buatSoal(spec, benih);
    const { t } = periksaDasar(s, spec, benih);
    const kr = s.data.keranjang;
    const kosong = kr.filter((k) => k.isi === 0);
    catat("c-keranjang-kosong", kosong[0].id);
    cek(kr.length === 3 && kosong.length === 1 && kr.every((k) => k.isi >= 0 && k.isi <= 10) && unikId(kr.map((k) => k.id)), `kosong@${benih}: tiga keranjang, tepat satu kosong`);
    cek(s.kunciPilihan === kosong[0].id && s.kunci === kosong[0].id, `kosong@${benih}: kunci = keranjang kosong`);
    cek(s.pilihan.length === 3 && s.percobaan === 3, `kosong@${benih}: tiga pilihan tiga percobaan`);
    cek(kr.filter((k) => k.isi > 0).some((k) => k.isi <= 2), `kosong@${benih}: ada pengecoh hampir kosong (kekeliruan nyata)`);
    cek(/\bnol\b/.test(s.penjelasan), `kosong@${benih}: penjelasan mengenalkan nol`);
    for (const w of salahPilih(s)) { const h = t.periksa(s, { pilih: w }); cek(h.benar === false && h.petunjuk.sasaran[0] === kosong[0].id, `kosong@${benih}: ${w} ditolak, petunjuk ke keranjang kosong`); }
  }

  /* ---- 10 cari-terlewat ---- */
  {
    const spec = SPEC["c-cari-terlewat"];
    const s = M.buatSoal(spec, benih);
    const { t } = periksaDasar(s, spec, benih);
    const items = s.data.item;
    const lewat = items.filter((b) => b.hitung === false);
    catat("c-cari-terlewat", items.length);
    cek(items.length >= 4 && items.length <= 9 && lewat.length === 1 && s.kunci === lewat[0].id, `terlewat@${benih}: tepat satu apel terlewat`);
    cek(s.percobaan === 3 && !s.pilihan && tdkBertumpuk(items, 15) && items.every(dalamPersen), `terlewat@${benih}: tiga percobaan, benda sah`);
    for (const b of items) { const h = t.periksa(s, { pilih: b.id }); cek(h.benar === (b.id === lewat[0].id), `terlewat@${benih}: ketuk ${b.id}`); if (!h.benar) cek(h.petunjuk.sasaran[0] === lewat[0].id, `terlewat@${benih}: petunjuk ke apel terlewat`); }
  }
}

// Keragaman: nilai berbeda muncul lintas benih (variasi, bukan satu soal tetap).
for (const [id, himpunan] of BANYAK) cek(himpunan.size >= (id === "c-keranjang-kosong" ? 3 : id === "c-sekilas" ? 4 : 4), `${id}: keragaman parameter (${[...himpunan].join(",")})`);

/* ------------------------------ Bentuk dan batas Concrete ------------------------------ */
{
  // Sepuluh tindakan memakai bentuk jawaban yang masuk akal dan tidak satu pun memakai lambang sebagai jawaban utama.
  const sampel = concrete.map((sp) => M.buatSoal(sp, 11));
  cek(new Set(sampel.map((s) => s.tindakan)).size === 10, "sepuluh tindakan berbeda");
  cek(sampel.every((s) => (s.pilihan ?? []).every((p) => !/\d/.test(p.label) && !/\d/.test(p.suara))), "tak ada lambang (digit) pada pilihan jawaban Concrete");
  cek(sampel.every((s) => !/\d/.test(s.suara) && !/\d/.test(s.penjelasan) && !/\d/.test(s.layar)), "suara, layar, dan penjelasan tanpa digit");
  cek(sampel.every((s) => !/garis bilangan|diagram|bagan|tabel|lambang/i.test(`${s.suara} ${s.layar} ${s.penjelasan}`)), "tanpa diagram atau lambang pada teks Concrete");
  cek(sampel.some((s) => s.bentuk === "pilihan") && sampel.some((s) => s.bentuk === "gabungan") && sampel.some((s) => s.bentuk === "jumlah"), "beragam bentuk jawaban");
  // Penjelasan dan petunjuk kosong tidak ada; nol dipakai pada tepat soal keranjang kosong.
  cek(sampel.filter((s) => /\bnol\b/.test(s.penjelasan)).length === 1, "nol diperkenalkan pada satu soal");
}

/* ------------------------------ Tanpa penilaian: pindai sumber ------------------------------ */
{
  const tanpaKomentar = (t) => t.replace(/\/\*[\s\S]*?\*\//g, "").replace(/(^|[^:])\/\/.*$/gm, "$1");
  const POLA = /\b(skor|score|peringkat|ranking|nilai|jumlahBenar|totalBenar|catatBenar|benarCount|totalPoin|tambahPoin|poinSaya)\w*\s*(=|:|\(|\+\+|\+=)/i;
  const dirs = ["src/lib/opsi2", "src/components/modul/opsi2"];
  let berkas = 0;
  for (const d of dirs) {
    if (!fs.existsSync(d)) continue;
    for (const f of fs.readdirSync(d).filter((x) => /\.(ts|tsx)$/.test(x))) {
      berkas += 1;
      const isi = tanpaKomentar(fs.readFileSync(path.join(d, f), "utf8"));
      cek(!POLA.test(isi), `${d}/${f}: ada kode bernuansa skor atau penilaian`);
      cek(!/localStorage|sessionStorage|fetch\(|XMLHttpRequest/.test(isi), `${d}/${f}: tanpa jaringan dan tanpa penyimpanan hasil`);
    }
  }
  cek(berkas >= 7, "berkas sumber terpindai");
}

console.log(`Uji mesin Opsi 2: ${lulus} lulus, ${gagal} gagal.`);
process.exit(gagal ? 1 : 0);
