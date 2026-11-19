// Uji Mind-map (Keranjang Pakan), Infografis (Catatan Berat), Simulasi Gudang Timbang, dan tahap Concrete, Pictorial, Abstract Kelas 3 Bab 3 Sub-Bab C ("Pakan Bu Lastri"),
// tema Kebun Binatang Mini (mengukur berat dengan satuan baku).
// Memeriksa: logika simulasi (nol, timbang dengan alat menolak sebelum nol, pilih timbangan dan satuan, selisih), misi (awal tidak memenuhi, wajib empat, bebas dua),
// keranjang pakan (sembilan kartu geser Masalah, Cara, Hasil memuat semua metode Story), catatan berat dari kejadian Story, CPA dua belas langkah per tahap
// (Klik, Kanvas, Suara x empat metode) dengan jawaban beragam dan Cari kesalahan di tiap tahap, kunci dihitung dari data, angka jawaban tidak kembar per tahap, tugas yang langsung siap
// (jebakan tombol macet), pengenal ucapan, petunjuk salah, batas rupa, emoji, kata terlarang, akhir baris.
// Jalankan: node --no-warnings scripts/uji-timbang-k3b3c.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/timbang-k3b3c/logika.ts");
const DS = await import("../src/components/modul/timbang-k3b3c/data-sim.ts");
const DK = await import("../src/components/modul/timbang-k3b3c/data-kartu.ts");
const LC = await import("../src/components/modul/timbang-k3b3c/logika-cpa.ts");
const D = await import("../src/components/modul/timbang-k3b3c/data.ts");
const K = await import("../src/components/modul/timbang-k3b3c/periksa.ts");
const S = await import("../src/components/modul/misi-simulasi.ts");
const MK = await import("../src/components/modul/misi-k3bab3.ts");
const MT = await import("../src/components/modul/misi-teks-k3b3.ts");
const folderUrl = new URL("../src/components/modul/timbang-k3b3c/", import.meta.url);

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
const TERLARANG = /\b(kelas|buku|teman|kelompok|dikelompokkan|mengelompokkan|skor|nilai|bernilai|soal|tebak|tebakan|kunci|latihan)\b/i;
const tanpaDigit = (t) => !/\d/.test(t);
const bersih = (t) => !TERLARANG.test(t) && !/buku|kelompok|bernilai|tebak|nilai|kelas|teman|skor|soal|kunci|latihan/i.test(t);
const emojiSah = (s) => [...s].every((c) => c.codePointAt(0) <= 0x1fa95 && c.codePointAt(0) !== 0x200d && c.codePointAt(0) !== 0x1f6de);
const adaEmoji = (s) => /\p{Extended_Pictographic}/u.test(s);
/** Berat dan bilangan yang dipakai Story C (jangan dijadikan data CPA atau Simulasi). */
const CERITA = new Set([250, 4, 100, 500, 400, 200, 10, 11, 150, 5, 1]);

/* ------------------------------ Kata bilangan ------------------------------ */
{
  sama([0, 1, 9, 10, 11, 15, 20, 38, 100, 180, 350, 905].map(LC.kataBil), ["nol", "satu", "sembilan", "sepuluh", "sebelas", "lima belas", "dua puluh", "tiga puluh delapan", "seratus", "seratus delapan puluh", "tiga ratus lima puluh", "sembilan ratus lima"], "kata bilangan CPA");
  cek(LC.kata === LC.kataBil, "alias kata");
  for (let n = 0; n <= 999; n += 1) cek(tanpaDigit(LC.kataBil(n)) && LC.kataBil(n) === L.kata(n), `kata bilangan ${n} sama di simulasi dan CPA`);
  sama([LC.ucapkan("180 g"), LC.ucapkan("7 kg"), LC.ucapkan("60 g"), LC.ucapkan("kg")], ["seratus delapan puluh gram", "tujuh kilogram", "enam puluh gram", "kilogram"], "ucapkan: angka dan satuan menjadi kata");
  sama([L.ukuran(180, "g"), L.ukuranKata(180, "g"), L.ukuranKata(7, "kg"), L.namaSatuan("g"), L.namaSatuan("kg")], ["180 g", "seratus delapan puluh gram", "tujuh kilogram", "gram", "kilogram"], "ukuran dan nama satuan");
}

/* ------------------------------ Simulasi: data dan logika ------------------------------ */
{
  const semua = [...DS.TARGET_TIMBANG.map((t) => t.angka), ...DS.TARGET_SELISIH.flatMap((t) => [t.wa, t.wb]), DS.JARUM_AWAL, DS.LAYAR_AWAL];
  cek(semua.every((n) => !CERITA.has(n)), `simulasi: berbeda dari Story (${semua.filter((n) => CERITA.has(n))})`);
  cek(DS.TARGET_TIMBANG.length === 4 && DS.TARGET_TIMBANG.every((t) => (t.alat === "duduk" ? t.satuan === "kg" && t.angka >= 1 && t.angka <= 9 : t.satuan === "g" && t.angka >= 10 && t.angka <= 999)), "simulasi: empat benda, timbangan duduk memakai kilogram sampai sembilan, timbangan digital memakai gram");
  cek(DS.TARGET_TIMBANG.some((t) => t.satuan === "g") && DS.TARGET_TIMBANG.some((t) => t.satuan === "kg") && DS.TARGET_TIMBANG.some((t) => t.alat === "duduk") && DS.TARGET_TIMBANG.some((t) => t.alat === "digital"), "simulasi: benda ringan dan berat, kedua timbangan");
  cek(DS.TARGET_PILIH.length === 4 && DS.TARGET_PILIH.some((t) => t.jenis === "digital") && DS.TARGET_PILIH.some((t) => t.jenis === "duduk") && DS.TARGET_PILIH.some((t) => t.jenis === "badan") && DS.TARGET_PILIH.some((t) => t.satuan === "g") && DS.TARGET_PILIH.some((t) => t.satuan === "kg"), "simulasi: pilih timbangan memuat tiga jenis dan dua satuan");
  cek(DS.TARGET_SELISIH.length === 3 && DS.TARGET_SELISIH.every((t) => t.wa > t.wb) && DS.TARGET_SELISIH.some((t) => t.satuan === "g") && DS.TARGET_SELISIH.some((t) => t.satuan === "kg"), "simulasi: tiga pasangan selisih, kilogram dan gram");
  cek(DS.JARUM_AWAL > 0 && DS.LAYAR_AWAL > 0 && DS.LAYAR_AWAL % DS.LAYAR_LANGKAH === 0 && DS.LAYAR_AWAL <= DS.LAYAR_MAKS, "simulasi: jarum dan layar awal belum di nol");
  cek(tanpaDigit(DS.MISI_TIMBANG_TEKS) && bersih(DS.MISI_TIMBANG_TEKS) && DS.MISI_TIMBANG_TEKS === MT.MISI_K3B3.C && D.MISI_TIMBANG_TEKS === DS.MISI_TIMBANG_TEKS && DS.MISI_TIMBANG_TEKS === L.MISI_TIMBANG_TEKS && DS.MISI_TIMBANG_TEKS.length >= 10 && DS.MISI_TIMBANG_TEKS.length <= 120, "simulasi: teks misi tanpa digit dan kata terlarang, sama dengan misi-teks-k3b3");

  const a = L.awalTimbang();
  cek(a.alat === "timbang" && a.mode === "nol" && a.jarum === 3 && a.layar === 40 && !a.nolJarum && !a.nolLayar && a.menolak === 0 && !a.diletakkan && a.bacaBenar.length === 0 && a.pilihBenar.length === 0 && a.selisihBenar.length === 0, "simulasi: keadaan awal");
  // Nol.
  const j0 = L.putarJarum(a, -3);
  cek(j0.ok && j0.k.jarum === 0 && j0.k.nolJarum && L.sudahNol(j0.k, "duduk") && !L.sudahNol(j0.k, "digital"), "nol: jarum diputar mundur sampai nol dicatat");
  cek(!L.putarJarum(a, -4).ok && !L.putarJarum({ ...a, jarum: 9 }, 1).ok && L.putarJarum(a, 1).k.jarum === 4 && !L.putarJarum(a, 1).k.nolJarum, "nol: jarum hanya nol sampai sembilan");
  const l0 = L.geserLayar(a, -4);
  cek(l0.ok && l0.k.layar === 0 && l0.k.nolLayar && L.sudahNol(l0.k, "digital"), "nol: layar bergeser per sepuluh sampai nol dicatat");
  cek(!L.geserLayar(a, -5).ok && !L.geserLayar({ ...a, layar: 90 }, 1).ok && L.geserLayar(a, 1).k.layar === 50, "nol: layar hanya nol sampai sembilan puluh");
  const tn = L.tekanNol(a);
  cek(tn.layar === 0 && tn.nolLayar && !tn.nolJarum, "nol: tombol nol pada timbangan digital");
  sama(S.misiBaru(MK.MISI_C, { ...j0.k, nolLayar: true }, new Set()), ["c-nol"], "nol: misi c-nol bila jarum dan layar di nol");
  sama(S.misiBaru(MK.MISI_C, j0.k, new Set()), [], "nol: jarum saja belum memenuhi c-nol");
  cek(tanpaDigit(L.kalimatNol(a)) && tanpaDigit(L.kalimatNol(j0.k)) && tanpaDigit(L.kalimatNol(tn)) && /belum di nol/.test(L.kalimatNol(a)) && /siap dipakai/.test(L.kalimatNol({ ...a, jarum: 0, layar: 0 })), "nol: kalimat tanpa digit");
  // Timbang: alat menolak sebelum nol.
  const t0 = L.targetTimbang(a);
  cek(t0.benda === "apel" && t0.alat === "digital" && t0.angka === 180 && t0.satuan === "g", "timbang: benda pertama apel di timbangan digital");
  const tolak = L.letakkanBenda(a);
  cek(!tolak.ok && tolak.alasan === "nol" && tolak.k.menolak === 1 && !tolak.k.diletakkan, "timbang: alat menolak menimbang sebelum layar di nol");
  sama(S.misiBaru(MK.MISI_C, tolak.k, new Set()), ["c-tolak"], "timbang: misi bebas c-tolak");
  cek(/menolak/.test(L.kalimatTolak(t0)) && /layar/i.test(L.kalimatTolak(t0)) && /jarum/i.test(L.kalimatTolak(DS.TARGET_TIMBANG[1])) && tanpaDigit(L.kalimatTolak(t0)) && tanpaDigit(L.kalimatTolak(DS.TARGET_TIMBANG[1])), "timbang: kalimat menolak menunjuk alat yang dipakai");
  const siapT = L.tekanNol(a);
  const ok = L.letakkanBenda(siapT);
  cek(ok.ok && ok.alasan === "ok" && ok.k.diletakkan && !L.letakkanBenda(ok.k).ok && L.letakkanBenda(ok.k).alasan === "sudah", "timbang: benda diletakkan setelah nol, tidak dua kali");
  const pil = L.pilihanBaca(ok.k);
  cek(pil.length === 3 && new Set(pil).size === 3 && pil.includes("180 g") && pil[0] !== "180 g" && pil.includes("180 kg") && pil.includes("18 g"), `timbang: tiga ukuran, benar bukan yang pertama (${pil})`);
  for (let i = 0; i < DS.TARGET_TIMBANG.length; i += 1) {
    const t = DS.TARGET_TIMBANG[i];
    const p = L.pilihanBaca({ ...a, timbangKe: i });
    cek(p.length === 3 && new Set(p).size === 3 && p.includes(L.ukuran(t.angka, t.satuan)) && p[0] !== L.ukuran(t.angka, t.satuan), `timbang: pilihan sasaran ${i} unik dan benar bukan yang pertama`);
  }
  const salahB = L.periksaBaca(L.pilihBaca(ok.k, pil.indexOf("180 kg")));
  cek(!salahB.ok && salahB.k.salah === 1 && /satuan/.test(L.petunjukBaca(L.pilihBaca(ok.k, 0))) && tanpaDigit(L.petunjukBaca(L.pilihBaca(ok.k, 0))), "timbang: ukuran keliru");
  cek(!L.periksaBaca(siapT).ok && /Letakkan/.test(L.petunjukBaca(siapT)) && /ke nol/.test(L.petunjukBaca(a)) && /Pilih/.test(L.petunjukBaca(ok.k)), "timbang: petunjuk menunjuk langkah yang belum dilakukan");
  cek(!L.periksaBaca(L.pilihBaca(siapT, pil.indexOf("180 g"))).ok, "timbang: tanpa benda di timbangan belum benar");
  const bB = L.periksaBaca(L.pilihBaca(ok.k, pil.indexOf("180 g")));
  cek(bB.ok && bB.k.bacaBenar.join() === "0" && bB.k.timbangKe === 1 && !bB.k.diletakkan && bB.k.bacaPilih === -1 && bB.k.ringanBenar && !bB.k.beratBenar, "timbang: ukuran tepat membuka benda berikutnya, benda ringan tercatat");
  sama(S.misiBaru(MK.MISI_C, bB.k, new Set()), ["c-baca"], "timbang: misi c-baca");
  // Benda berat di timbangan duduk.
  const berat = { ...bB.k, jarum: 0, nolJarum: true };
  const o2 = L.letakkanBenda(berat);
  cek(o2.ok && L.targetTimbang(berat).alat === "duduk" && L.targetTimbang(berat).angka === 6, "timbang: benda berat di timbangan duduk setelah jarum di nol");
  const pil2 = L.pilihanBaca(o2.k);
  const bB2 = L.periksaBaca(L.pilihBaca(o2.k, pil2.indexOf("6 kg")));
  cek(bB2.ok && bB2.k.ringanBenar && bB2.k.beratBenar, "timbang: benda berat tepat, ringan dan berat sama-sama tercatat");
  sama(S.misiBaru(MK.MISI_C, bB2.k, new Set()), ["c-nol", "c-baca", "c-dua"], "timbang: misi c-nol, c-baca, dan c-dua");
  cek(L.angkatBenda(o2.k).diletakkan === false && L.pilihBaca(a, 7).bacaPilih === -1 && tanpaDigit(L.kalimatTimbang(a)) && tanpaDigit(L.kalimatTimbang(ok.k)) && tanpaDigit(L.kalimatTimbang(bB.k)), "timbang: angkat benda, pilihan di luar daftar diabaikan, kalimat tanpa digit");
  // Pilih timbangan dan satuan.
  const tp = L.targetPilih(a);
  cek(tp.benda === "sebuah pensil" && tp.jenis === "digital" && tp.satuan === "g", "pilih: benda pertama pensil, timbangan digital, gram");
  cek(!L.periksaPilih(a).ok && /jenis timbangan/.test(L.petunjukPilih(a)) && /satuannya/.test(L.petunjukPilih(L.pilihJenis(a, 0))), "pilih: tanpa pilihan belum benar, petunjuk menunjuk yang belum dipilih");
  const salahP = L.periksaPilih(L.pilihSatuan(L.pilihJenis(a, 1), 0));
  cek(!salahP.ok && salahP.k.salah === 1 && /Sesuaikan timbangan/.test(L.petunjukPilih(L.pilihSatuan(L.pilihJenis(a, 1), 0))), "pilih: jenis timbangan keliru");
  cek(/ringan memakai gram/.test(L.petunjukPilih(L.pilihSatuan(L.pilihJenis(a, 0), 1))) && !L.periksaPilih(L.pilihSatuan(L.pilihJenis(a, 0), 1)).ok, "pilih: satuan keliru");
  const bP = L.periksaPilih(L.pilihSatuan(L.pilihJenis(a, 0), 0));
  cek(bP.ok && bP.k.pilihBenar.join() === "0" && bP.k.pilihKe === 1 && bP.k.pilihJenis === -1 && bP.k.pilihSatuan === -1, "pilih: timbangan dan satuan tepat membuka benda berikutnya");
  sama(S.misiBaru(MK.MISI_C, bP.k, new Set()), ["c-pilih"], "pilih: misi c-pilih");
  cek(L.pilihJenis(a, 9).pilihJenis === -1 && L.pilihSatuan(a, 5).pilihSatuan === -1 && tanpaDigit(L.kalimatPilih(bP.k)) && tanpaDigit(L.kalimatPilih(a)), "pilih: pilihan di luar daftar diabaikan, kalimat tanpa digit");
  const tpBadan = { ...a, pilihKe: 2 };
  cek(L.periksaPilih(L.pilihSatuan(L.pilihJenis(tpBadan, 2), 1)).ok, "pilih: anak rusa di timbangan badan dengan kilogram");
  // Selisih.
  const pilS = L.pilihanSelisih(a);
  cek(pilS.length === 3 && new Set(pilS).size === 3 && pilS.includes("6 kg") && pilS[0] !== "6 kg" && pilS.includes("12 kg") && pilS.includes("3 kg"), `selisih: tiga pilihan, benar bukan yang pertama (${pilS})`);
  for (let i = 0; i < DS.TARGET_SELISIH.length; i += 1) {
    const t = DS.TARGET_SELISIH[i];
    const p = L.pilihanSelisih({ ...a, selisihKe: i });
    cek(p.length === 3 && new Set(p).size === 3 && p.includes(L.ukuran(t.wa - t.wb, t.satuan)) && p[0] !== L.ukuran(t.wa - t.wb, t.satuan), `selisih: pilihan sasaran ${i} unik dan benar bukan yang pertama`);
  }
  const salahS = L.periksaSelisih(L.pilihSelisih(a, pilS.indexOf("12 kg")));
  cek(!salahS.ok && salahS.k.salah === 1 && /mengurangkan/.test(L.petunjukSelisih(L.pilihSelisih(a, 0))) && /Pilih/.test(L.petunjukSelisih(a)) && !L.periksaSelisih(a).ok, "selisih: ukuran keliru dan tanpa pilihan");
  const bS = L.periksaSelisih(L.pilihSelisih(a, pilS.indexOf("6 kg")));
  cek(bS.ok && bS.k.selisihBenar.join() === "0" && bS.k.selisihKe === 1 && bS.k.selisihPilih === -1, "selisih: selisih tepat membuka pasangan berikutnya");
  sama(S.misiBaru(MK.MISI_C, bS.k, new Set()), ["c-selisih"], "selisih: misi c-selisih");
  cek(L.pilihSelisih(a, 8).selisihPilih === -1 && tanpaDigit(L.kalimatSelisih(bS.k)) && tanpaDigit(L.kalimatSelisih(a)) && L.selisihDari(DS.TARGET_SELISIH[1]) === 550, "selisih: pilihan di luar daftar diabaikan, selisih dihitung");
  cek(L.mulaiLagiTimbang().jarum === 3 && L.mulaiLagiTimbang().layar === 40 && L.pilihModeTimbang(a, "selisih").mode === "selisih", "mulai lagi dan ganti alat");
  // Misi.
  const A = MK.MISI_C;
  cek(A.filter((m) => m.wajib).length === 4 && A.filter((m) => !m.wajib).length === 2, "misi C: empat wajib, dua bebas");
  cek(new Set(A.map((m) => m.id)).size === 6 && A.every((m) => m.id.startsWith("c-") && m.teks.length >= 10 && m.teks.length <= 120 && tanpaDigit(m.teks) && bersih(m.teks)), "misi C: id berawalan c-, unik, 10 sampai 120 huruf, tanpa digit");
  sama(MK.daftarMisiK3Bab3("C"), A, "daftarMisiK3Bab3 C");
  cek(A.every((m) => !m.cek({ alat: "kerangka" })), "misi C: alat lain tidak memenuhi misi");
  sama(S.misiBaru(A, a, new Set()), [], "misi C: keadaan awal tanpa misi baru");
  cek(S.misiBaru(A, { ...a, salah: 9, mode: "selisih", jarum: 7, layar: 90, diletakkan: true, bacaPilih: 2, pilihJenis: 1, pilihSatuan: 1, selisihPilih: 1 }, new Set()).length === 0, "misi C: pilihan yang belum diperiksa dan benda di timbangan tidak dihitung sebagai misi");
}

/* ------------------------------ Mind-map: keranjang pakan (sembilan kartu geser) ------------------------------ */
{
  const KA = DK.KARTU_TIMBANG;
  cek(KA.length === 9, "kartu: sembilan kartu");
  cek(KA.every((k) => k.contoh.length <= 1) && KA[0].contoh.join() === "masalah" && KA.slice(1).every((k) => k.contoh.length === 0), "kartu: satu kotak contoh di kartu pertama saja, sisanya mandiri");
  const semua = KA.flatMap((k) => [k.masalah, k.cara, k.hasil]);
  const label = semua.map((x) => x.label);
  cek(new Set(label).size === label.length, "kartu: label unik");
  cek(semua.every((x) => x.label.length >= 5 && x.label.length <= 36), `kartu: label pendek (terpanjang ${Math.max(...label.map((l) => l.length))} huruf)`);
  cek(KA.every((k) => [k.masalah.label, k.cara.label, k.hasil.label].every((l) => l.split(/\s+/).length <= 6)), "kartu: label paling banyak enam kata");
  cek(semua.every((x) => tanpaDigit(x.label) && tanpaDigit(x.arti) && bersih(x.label) && bersih(x.arti) && x.arti.length > 10), "kartu: label dan arti tanpa digit dan kata terlarang");
  cek(KA.every((k) => tanpaDigit(k.judul) && bersih(k.judul) && k.judul.length > 5), "kartu: judul bersih");
  const cara = KA.map((k) => k.cara.label).join(" | ");
  for (const m of ["Mengangkat dan Merasakan", "Berat Acuan", "Cek Angka Nol", "Pakai timbangan", "Setel ke nol", "Baca layar atau jarum", "Kurangi dua berat", "Ringan gram, berat kilogram"]) cek(cara.toLowerCase().includes(m.toLowerCase()), `kartu: cara memuat ${m}`);
  const gab = KA.map((k) => [k.judul, k.masalah.label, k.cara.label, k.hasil.label, k.masalah.arti, k.cara.arti, k.hasil.arti].join(" ")).join(" ").toLowerCase();
  for (const s of ["timbangan", "gram", "kilogram", "nol", "selisih", "satuan", "ringan", "berat", "digital", "angka", "layar", "jarum", "mengangkat dan merasakan", "berat acuan", "cek angka nol", "benda acuan"]) cek(gab.includes(s), `kartu: memuat poin "${s}"`);
  cek(!new RegExp("\\b(raka|salsa|bima|pak joko|bu lastri|dokter hana|pakan|karung|wortel|jagung|kelinci|beo|kebun binatang)\\b", "i").test(gab), "kartu: hanya poin pelajaran (tanpa tokoh dan benda cerita)");
  cek(tanpaDigit(DK.SUARA_KARTU_TIMBANG + DK.SELESAI_KARTU_TIMBANG) && bersih(DK.SUARA_KARTU_TIMBANG + DK.SELESAI_KARTU_TIMBANG), "kartu: suara dan pesan selesai tanpa digit dan kata terlarang");
  cek(emojiSah(DK.TEMA_KARTU_TIMBANG.ikon) && DK.TEMA_KARTU_TIMBANG.judul.length > 5, "kartu: tema sah");
  const RG = DK.RINGKASAN_TIMBANG;
  cek(RG.ikon.length === DK.KARTU_TIMBANG.length && new Set(RG.ikon).size === RG.ikon.length && [...RG.ikon, RG.pusat].every((e) => emojiSah(e) && !/[A-Za-z0-9]/.test(e)), "peta radial: satu gambar unik per kartu, gambar sah tanpa huruf");
  cek(tanpaDigit(RG.suara) && bersih(RG.suara) && !RG.ikon.includes(RG.pusat), "peta radial: suara bersih dan pusat berbeda dari cabang");
}

/* ------------------------------ Infografis: catatan berat (satu tabel lima baris) ------------------------------ */
{
  const B = DK.BARIS_INFO_TIMBANG;
  cek(B.length === 5 && DK.KOLOM_INFO_TIMBANG.length === 3, "infografis: lima baris dan tiga kolom");
  cek(B.every((b) => b.isi.length === 3 && emojiSah(b.ikon) && b.nama.length > 4), "infografis: tiap baris tiga isian, emoji sah");
  const jumlahContoh = B.map((b) => b.contoh.length);
  cek(jumlahContoh[0] === 3 && jumlahContoh.slice(1).every((n) => n === 0), "infografis: baris satu penuh contoh, baris dua sampai lima mandiri");
  const semua = B.flatMap((b) => b.isi);
  cek(B.every((b) => new Set(b.isi.map((x) => x.t)).size === 3), "infografis: tiga label tiap baris berbeda");
  cek(new Set(semua.map((x) => x.t)).size === semua.length, "infografis: semua label unik");
  cek(semua.every((x) => x.t.length <= 28 && x.t.split(/\s+/).length <= 5 && bersih(x.t) && bersih(x.s ?? "")), "infografis: label pendek (paling banyak lima kata) dan tanpa kata terlarang");
  cek(semua.every((x) => tanpaDigit(x.s ?? x.t)), "infografis: ucapan label tanpa digit");
  const gab = B.map((b) => [b.nama, ...b.isi.map((x) => x.t)].join(" ")).join(" ").toLowerCase();
  for (const s of ["menimbang benda", "mulai dari nol", "membaca berat", "memilih timbangan", "mencari selisih", "pakai timbangan", "setel ke nol", "baca layar atau jarum", "sesuaikan dengan benda", "kurangi dua berat", "satuan tetap sama", "gram atau kilogram", "selisih berat"]) cek(gab.includes(s), `infografis: memuat "${s}"`);
  cek(!new RegExp("\\b(raka|salsa|bima|pak joko|bu lastri|dokter hana)\\b", "i").test(gab), "infografis: tanpa nama tokoh");
  cek(tanpaDigit(DK.SUARA_INFO_TIMBANG + DK.SELESAI_INFO_TIMBANG) && bersih(DK.SUARA_INFO_TIMBANG + DK.SELESAI_INFO_TIMBANG) && emojiSah(DK.TEMA_INFO_TIMBANG.ikon), "infografis: suara dan tema bersih");
}

/* ------------------------------ Pengenal ucapan ------------------------------ */
{
  const nm = (nama) => ({ jenis: "nama", nama });
  const an = (n) => ({ jenis: "angka", n });
  for (const nama of ["gram", "kilogram", "meter", "kiri", "kanan", "sama", "digital", "duduk", "badan"]) cek(K.cocokUcapan(nama, nm(nama)).cocok && K.kataDariUcapan(nama).length === 1, `cocok: kata ${nama} dikenali tepat satu`);
  sama(K.kataDariUcapan("di kiri"), ["kiri"], "ucapan: di kiri berarti kiri");
  sama(K.kataDariUcapan("bukan kiri"), [], "ucapan: bukan kiri tidak dihitung");
  sama(K.kataDariUcapan("halo"), [], "ucapan: kata lain tidak dikenali");
  sama(K.kataDariUcapan("kilo gram"), ["kilogram"], "ucapan: kilo gram berarti kilogram");
  sama(K.kataDariUcapan("kg"), ["kilogram"], "ucapan: kg berarti kilogram");
  cek(!K.cocokUcapan("kilogram", nm("gram")).cocok && !K.cocokUcapan("gram", nm("kilogram")).cocok && !K.cocokUcapan("kiri", nm("kanan")).cocok && !K.cocokUcapan("duduk", nm("digital")).cocok, "cocok: kata berbeda tidak cocok (gram dan kilogram tidak tertukar)");
  sama(K.angkaDariUcapan("lima"), [5], "angka: lima");
  sama(K.angkaDariUcapan("sembilan, 4 dan tiga"), [9, 4, 3], "angka: satuan dan angka tertulis");
  sama(K.angkaDariUcapan("lima belas"), [15], "angka: lima belas");
  sama(K.angkaDariUcapan("dua puluh"), [20], "angka: dua puluh");
  sama(K.angkaDariUcapan("seratus"), [100], "angka: seratus");
  sama(K.angkaDariUcapan("20"), [20], "angka: 20 tertulis");
  sama(K.angkaDariUcapan("nol"), [0], "angka: nol");
  for (let n = 0; n <= 100; n += 1) cek(K.angkaDariUcapan(LC.kataBil(n)).join() === String(n), `angka: kata bilangan ${n} dikenali utuh (${LC.kataBil(n)} -> ${K.angkaDariUcapan(LC.kataBil(n))})`);
  cek(K.cocokUcapan("nol", an(0)).cocok && K.cocokUcapan("0", an(0)).cocok && !K.cocokUcapan("satu", an(0)).cocok, "cocok: kunci angka nol");
  cek(K.cocokUcapan("dua belas", an(12)).cocok && !K.cocokUcapan("dua puluh dua", an(12)).cocok && !K.cocokUcapan("dua puluh", an(12)).cocok, "cocok: bilangan dua angka dikenali utuh");
}

/* ------------------------------ CPA ------------------------------ */
const TAHAP = { Concrete: ["benda", D.CONCRETE], Pictorial: ["diagram", D.PICTORIAL], Abstract: ["lambang", D.ABSTRACT] };
const CARA = ["klik", "kanvas", "suara"];
const METODE = ["igil", "angkat", "acuan", "nol"];
const semuaTeksLangkah = (ls, rupa, cara) => [ls.judul, ls.suara, LC.instruksi(ls.langkah, rupa, cara, ls.metode), LC.kalimatTanya(ls.langkah, cara), LC.kalimatKunci(ls.langkah, cara), LC.petunjukSalah(ls.langkah, cara, 1)];
{
  sama(LC.URUT_METODE, METODE, "urutan metode");
  cek(LC.NAMA_METODE.igil.includes("Jarum di Nol, Baca, Tulis Satuan") && LC.NAMA_METODE.angkat.includes("Hefting") && LC.NAMA_METODE.acuan.includes("Benchmark Weights") && LC.NAMA_METODE.nol.includes("Zero Check"), "nama metode IGIL dan tiga metode global");
  cek(METODE.every((m) => emojiSah(LC.IKON_METODE[m])), "ikon metode sah");
  let nomor = 2;
  for (const [nama, [rupa, soal]] of Object.entries(TAHAP)) {
    cek(soal.length === 3 && soal.map((s) => s.cara).join() === CARA.join(), `${nama}: tiga misi Klik, Kanvas, Suara`);
    cek(soal.every((s) => s.langkah.length === 4 && s.langkah.map((l) => l.metode).join() === METODE.join()), `${nama}: empat langkah per misi (IGIL, Hefting, Benchmark Weights, Zero Check)`);
    for (const s of soal) {
      cek(s.nomor === nomor, `${nama}: nomor misi berlanjut ${nomor}`);
      nomor += 1;
      cek(s.judul.startsWith("Misi Pakan") && s.cerita.length > 15 && bersih(s.judul) && bersih(s.cerita), `${nama} ${s.nomor}: judul dan cerita sah`);
      for (const ls of s.langkah) {
        cek(ls.cara === s.cara, `${nama} ${s.nomor}: cara langkah sama dengan misi`);
        const teks = semuaTeksLangkah(ls, rupa, s.cara);
        cek(teks.every((t) => tanpaDigit(t) && bersih(t)), `${nama} ${s.nomor} ${ls.metode}: teks tanpa digit dan kata terlarang (${teks.find((t) => !tanpaDigit(t) || !bersih(t)) ?? ""})`);
        cek(emojiSah(teks.join("")), `${nama} ${s.nomor} ${ls.metode}: emoji sah`);
        cek(ls.judul === ls.suara && ls.judul === LC.instruksi(ls.langkah, rupa, s.cara, ls.metode), `${nama} ${s.nomor} ${ls.metode}: judul dan suara sama dengan instruksi`);
        // Batas rupa: Pictorial dan Abstract tanpa emoji benda di teks tugas.
        if (rupa !== "benda") cek(!adaEmoji(teks.join(" ")), `${nama} ${s.nomor} ${ls.metode}: teks tugas tanpa emoji (batas rupa)`);
        cek(/Metode IGIL|Hefting|Benchmark Weights|Zero Check|sudah menjawab/.test(ls.judul), `${nama} ${s.nomor} ${ls.metode}: judul tugas memuat nama metode`);
      }
    }
    // Cari kesalahan di tiap tahap, satu tugas klik.
    const salahL = soal.flatMap((s) => s.langkah.filter((l) => l.langkah.tipe === "salah"));
    cek(salahL.length === 1 && soal[0].langkah.some((l) => l.langkah.tipe === "salah"), `${nama}: satu Cari kesalahan, di tugas Klik`);
    for (const l of salahL) {
      const x = l.langkah;
      cek(x.alasan.length === 3 && new Set(x.alasan).size === 3 && x.benar >= 0 && x.benar <= 2 && x.keliru.length > 20 && x.kataTokoh.length > 15 && ["Raka", "Salsa", "Bima"].includes(x.tokoh), `${nama}: Cari kesalahan lengkap`);
      cek(tanpaDigit(x.kataTokoh + x.alasan.join(" ") + x.keliru) && bersih(x.kataTokoh + x.alasan.join(" ") + x.keliru), `${nama}: Cari kesalahan tanpa digit dan kata terlarang`);
      const pil = LC.pilihanKlik(x);
      cek(pil.length === 3 && new Set(pil).size === 3 && pil.includes(String(x.jawabTokoh)), `${nama}: pilihan klik Cari kesalahan memuat jawaban tokoh (${pil.join("/")})`);
      const kunci = LC.kunciJawab(x, "klik");
      cek(kunci !== null && kunci.jenis === "nama", `${nama}: jawaban sendiri berupa pilihan`);
      if (x.betul) cek(String(kunci.nama) === String(x.jawabTokoh), `${nama}: jawaban tokoh yang benar sama dengan kunci`);
      else cek(String(kunci.nama) !== String(x.jawabTokoh), `${nama}: jawaban benar berbeda dari jawaban tokoh`);
      cek(LC.petunjukSalah(x, "klik", x.jawabTokoh).startsWith(`Itu jawaban ${x.tokoh}`) || x.betul === true, `${nama}: petunjuk menjelaskan kesalahan tokoh`);
    }
  }
  cek(nomor === 11, "nomor misi berlanjut sampai sepuluh");
  const dasarSalah = Object.values(TAHAP).map(([, soal]) => soal.flatMap((s) => s.langkah).find((l) => l.langkah.tipe === "salah").langkah.dasar.tipe);
  sama(dasarSalah, ["nol", "baca", "baca"], "Cari kesalahan: jarum belum nol (Concrete), satuan telur (Pictorial), satuan karung beras (Abstract)");
  cek(D.PICTORIAL[0].langkah[0].langkah.betul === true && !D.ABSTRACT[0].langkah[0].langkah.betul && !D.CONCRETE[0].langkah[3].langkah.betul, "Cari kesalahan: satu jawaban tokoh benar (Pictorial), dua keliru");
  // Batas isi tiap tugas: berbeda dari Story, bilangan sah.
  for (const [nama, [, soal]] of Object.entries(TAHAP))
    for (const s of soal)
      for (const ls of s.langkah) {
        const d = LC.dasarDari(ls.langkah);
        const tag = `${nama} ${s.nomor} ${ls.metode}`;
        if (d.tipe === "baca") {
          cek(!CERITA.has(d.angka) && d.angka >= 1 && d.angka <= 999, `${tag}: berat berbeda dari Story (${d.angka})`);
          cek(d.alat === "jarum" ? d.satuan === "kg" && d.angka <= 9 : d.satuan === "g" && d.angka % 10 === 0 && d.angka >= 10, `${tag}: jarum memakai kilogram satu angka, layar memakai gram`);
          if (s.cara === "kanvas") cek(d.alat === "jarum", `${tag}: kanvas hanya membaca jarum satu angka`);
        }
        if (d.tipe === "banding") {
          cek(d.berat.every((n) => !CERITA.has(n) && n >= 1 && n <= 999) && d.berat[0] !== d.berat[1], `${tag}: dua berat berbeda dan berbeda dari Story (${d.berat})`);
          if (s.cara === "kanvas") cek(d.satuan === "kg" && LC.selisihBanding(d) >= 1 && LC.selisihBanding(d) <= 9, `${tag}: kanvas selisih kilogram satu angka`);
        }
        if (d.tipe === "acuan") {
          cek(d.n >= 1 && d.n <= 20 && !CERITA.has(d.n * LC.ACUAN[d.acuan].satu), `${tag}: banyaknya sah dan berat seluruhnya berbeda dari Story (${d.n})`);
          if (s.cara !== "klik") cek(d.acuan === "gula", `${tag}: kanvas dan suara memakai kantong gula`);
          if (s.cara === "kanvas") cek(d.n >= 1 && d.n <= 9, `${tag}: kanvas banyak kantong satu angka`);
          if (s.cara === "suara") cek(d.n >= 10 && d.n <= 100, `${tag}: suara banyak kantong bilangan dua angka`);
        }
        if (d.tipe === "nol") {
          cek(d.awal >= 1 && d.awal <= 9, `${tag}: awal belum di nol (${d.awal})`);
          if (s.cara === "kanvas") cek(d.alat === "jarum", `${tag}: kanvas jarum diputar mundur`);
        }
        if (d.tipe === "alat") cek(s.cara !== "kanvas", `${tag}: memilih timbangan hanya klik dan suara`);
      }
  // Tiap metode global tampak di tiap tahap.
  for (const [nama, [, soal]] of Object.entries(TAHAP)) {
    const tipe = new Set(soal.flatMap((s) => s.langkah.map((l) => LC.dasarDari(l.langkah).tipe)));
    cek(["banding", "acuan", "nol"].every((t) => tipe.has(t)) && (tipe.has("baca") || tipe.has("alat")), `${nama}: membaca timbangan, mengangkat, berat acuan, dan cek nol ada`);
    const baca = soal.flatMap((s) => s.langkah.map((l) => ({ d: LC.dasarDari(l.langkah), cara: s.cara }))).filter((x) => x.d.tipe === "baca");
    cek(baca.some((x) => x.d.alat === "jarum") && baca.some((x) => x.d.satuan === "g") && baca.some((x) => x.d.satuan === "kg"), `${nama}: baca timbangan jarum, gram, dan kilogram`);
  }
}

/* ------------------------------ Tugas dihitung dari data ------------------------------ */
{
  const nama = (k) => (k ? (k.jenis === "nama" ? k.nama : k.n) : null);
  const bc = (alat, angka, satuan) => ({ tipe: "baca", alat, angka, satuan, benda: "x", emoji: "" });
  const bd = (berat, satuan = "kg") => ({ tipe: "banding", benda: ["a", "b"], emoji: ["", ""], berat, satuan });
  // Kunci tiap jenis tugas dihitung dari data.
  sama(["klik", "kanvas", "suara"].map((c) => nama(LC.kunciJawab(bc("jarum", 7, "kg"), c))), ["7 kg", 7, "kilogram"], "kunci baca jarum: ukuran, angka, satuan");
  sama(["klik", "suara"].map((c) => nama(LC.kunciJawab(bc("digital", 320, "g"), c))), ["320 g", "gram"], "kunci baca layar: ukuran dan satuan");
  sama(["klik", "kanvas", "suara"].map((c) => nama(LC.kunciJawab(bd([700, 450], "g"), c))), ["kiri", 250, "kanan"], "kunci banding: yang berat, selisih, yang ringan");
  sama(["klik", "suara"].map((c) => nama(LC.kunciJawab(bd([3, 8]), c))), ["kanan", "kiri"], "kunci banding: kanan berat, kiri ringan");
  sama(["klik", "kanvas", "suara"].map((c) => nama(LC.kunciJawab({ tipe: "acuan", acuan: "gula", n: 8 }, c))), ["8 kg", 8, 8], "kunci acuan gula");
  sama(nama(LC.kunciJawab({ tipe: "acuan", acuan: "telur", n: 7 }, "klik")), "350 g", "kunci acuan telur: lima puluh gram tiap butir");
  sama([LC.beratAcuan({ tipe: "acuan", acuan: "gula", n: 6 }), LC.beratAcuan({ tipe: "acuan", acuan: "telur", n: 6 })], [6, 300], "berat acuan");
  sama(["klik", "kanvas", "suara"].map((c) => nama(LC.kunciJawab({ tipe: "nol", alat: "jarum", awal: 3 }, c))), ["setel ke nol", 3, 0], "kunci nol: langkah pertama, jarum mundur, angka nol");
  sama(["klik", "suara"].map((c) => nama(LC.kunciJawab({ tipe: "alat", benda: "x", emoji: "", alat: "badan" }, c))), ["timbangan badan", "badan"], "kunci alat");
  sama([LC.selisihBanding(bd([9, 3])), LC.lebihBerat(bd([9, 3])), LC.lebihBerat(bd([3, 9]))], [6, 0, 1], "selisih dan tangan yang berat");
  sama(LC.pilihanKlik(bc("digital", 320, "g")).slice().sort(), ["32 g", "320 g", "320 kg"], "pilihan baca: benar, satuan keliru, bilangan keliru");
  sama(LC.pilihanKlik(bc("jarum", 7, "kg")).slice().sort(), ["7 g", "7 kg", "70 kg"], "pilihan baca kilogram");
  sama(LC.pilihanKlik({ tipe: "nol", alat: "jarum", awal: 3 }).slice().sort(), ["baca angka", "letakkan benda", "setel ke nol"], "pilihan nol");
  sama(LC.pilihanKlik({ tipe: "alat", benda: "x", emoji: "", alat: "duduk" }).slice().sort(), ["timbangan badan", "timbangan digital", "timbangan duduk"], "pilihan alat");
  sama(LC.pilihanKlik({ tipe: "acuan", acuan: "telur", n: 4 }).slice().sort(), ["20 g", "200 g", "200 kg"], "pilihan acuan telur");
  cek(LC.kunciJawab(bc("jarum", 7, "kg"), "kanvas").jenis === "angka" && LC.angkaJawab(bc("jarum", 7, "kg"), "kanvas") === 7 && LC.angkaJawab(bc("jarum", 7, "kg"), "klik") === null, "angka jawab");

  for (const [namaT, [rupa, soal]] of Object.entries(TAHAP)) {
    const kanvasAngka = [];
    for (const s of soal)
      for (const ls of s.langkah) {
        const l = ls.langkah;
        const d = LC.dasarDari(l);
        const kunci = LC.kunciJawab(l, s.cara);
        cek(kunci !== null, `${namaT} ${s.nomor} ${ls.metode}: kunci ada untuk semua tugas`);
        cek(LC.siapLangsung(l, rupa, s.cara) === (l.tipe !== "salah"), `${namaT} ${s.nomor} ${ls.metode}: siap langsung kecuali Cari kesalahan (tombol tidak macet)`);
        for (const r of ["benda", "diagram", "lambang"]) cek(LC.siapLangsung(l, r, s.cara) === LC.siapLangsung(l, rupa, s.cara), `${namaT} ${s.nomor} ${ls.metode}: siap langsung tidak bergantung rupa (${r})`);
        if (kunci?.jenis === "angka") {
          if (s.cara === "kanvas") {
            kanvasAngka.push(kunci.n);
            cek(kunci.n >= 1 && kunci.n <= 9, `${namaT} ${s.nomor} ${ls.metode}: jawaban kanvas satu angka satu sampai sembilan (${kunci.n})`);
          }
          cek(s.cara !== "klik", `${namaT} ${s.nomor} ${ls.metode}: klik tidak berjawaban angka tunggal`);
        }
        if (kunci?.jenis === "nama" && s.cara === "suara") cek(!/\s/.test(kunci.nama) && tanpaDigit(kunci.nama), `${namaT} ${s.nomor} ${ls.metode}: kunci nama satu kata pada suara`);
        if (kunci?.jenis === "nama") cek(s.cara !== "kanvas", `${namaT} ${s.nomor} ${ls.metode}: kanvas berjawaban angka`);
        // Pilihan klik: tiga pilihan unik, jawaban benar tidak di tombol pertama.
        if (s.cara === "klik" && kunci !== null) {
          const pil = LC.pilihanKlik(l);
          cek(pil.length === 3 && new Set(pil).size === 3 && pil.includes(kunci.nama) && pil[0] !== kunci.nama, `${namaT} ${s.nomor} ${ls.metode}: pilihan klik unik dan jawaban benar bukan yang pertama (${pil.join("/")})`);
        }
        if (s.cara === "suara" && kunci !== null) {
          const pil = LC.pilihanSuara(l, "suara");
          cek(pil.includes(LC.teksKunciPilihan(kunci)) && pil.length === 3 && new Set(pil).size === pil.length && tanpaDigit(pil.join(" ")), `${namaT} ${s.nomor} ${ls.metode}: pilihan cadangan suara memuat kunci (${pil.join("/")})`);
          cek(pil[0] !== LC.teksKunciPilihan(kunci), `${namaT} ${s.nomor} ${ls.metode}: kunci suara bukan pilihan pertama`);
          const c = K.cocokUcapan(LC.teksKunciPilihan(kunci), kunci);
          cek(c.cocok, `${namaT} ${s.nomor} ${ls.metode}: ucapan kunci dikenali (${LC.teksKunciPilihan(kunci)})`);
          for (const lain of pil.filter((p) => p !== LC.teksKunciPilihan(kunci))) cek(!K.cocokUcapan(lain, kunci).cocok, `${namaT} ${s.nomor}: ucapan ${lain} bukan kunci`);
        }
        if (kunci) cek(LC.kalimatKunci(l, s.cara).length > 12, `${namaT} ${s.nomor} ${ls.metode}: kalimat penjelasan ada`);
        // Petunjuk salah menunjuk kesalahan (tidak kosong untuk tiap tugas dan cara).
        cek(LC.petunjukSalah(l, s.cara, "x").length > 20, `${namaT} ${s.nomor} ${ls.metode}: petunjuk salah ada`);
        if (rupa === "lambang") {
          const baris = LC.barisKartu(d, s.cara);
          cek(Array.isArray(baris) && baris.length >= 1 && baris.every((b) => typeof b === "string" && b.length > 3), `${namaT} ${s.nomor} ${ls.metode}: kartu kata ada`);
          cek(baris.every((b) => !adaEmoji(b)), `${namaT} ${s.nomor} ${ls.metode}: kartu kata tanpa emoji`);
        }
      }
    cek(new Set(kanvasAngka).size === kanvasAngka.length && kanvasAngka.length === 4, `${namaT}: empat angka jawaban Tulis di kanvas tidak kembar (${kanvasAngka.join(", ")})`);
  }
  sama(TAHAP.Concrete[1].filter((s) => s.cara === "kanvas").flatMap((s) => s.langkah.map((l) => LC.kunciJawab(l.langkah, "kanvas").n)), [7, 6, 8, 3], "angka kanvas Concrete");
  sama(TAHAP.Pictorial[1].filter((s) => s.cara === "kanvas").flatMap((s) => s.langkah.map((l) => LC.kunciJawab(l.langkah, "kanvas").n)), [9, 2, 6, 8], "angka kanvas Pictorial");
  sama(TAHAP.Abstract[1].filter((s) => s.cara === "kanvas").flatMap((s) => s.langkah.map((l) => LC.kunciJawab(l.langkah, "kanvas").n)), [6, 3, 9, 7], "angka kanvas Abstract");
  // Soal suara bervariasi: kata (satuan, tangan, jenis timbangan) dan bilangan.
  const suaraJenis = Object.values(TAHAP).flatMap(([, soal]) => soal[2].langkah.map((l) => LC.kunciJawab(l.langkah, "suara").jenis));
  cek(suaraJenis.includes("nama") && suaraJenis.includes("angka"), "tugas suara: kata dan bilangan");
  const suaraNama = new Set(Object.values(TAHAP).flatMap(([, soal]) => soal[2].langkah.map((l) => LC.kunciJawab(l.langkah, "suara")).filter((k) => k.jenis === "nama").map((k) => k.nama)));
  cek(["gram", "kilogram", "kiri", "kanan", "digital"].every((x) => suaraNama.has(x)) || ["gram", "kiri", "kanan", "digital"].every((x) => suaraNama.has(x)), `tugas suara: satuan, tangan, dan jenis timbangan (${[...suaraNama].join(", ")})`);
  // Poin penting dan penutup.
  cek(D.POIN_PENTING.length >= 6 && D.POIN_PENTING.every((p) => p.length > 20 && bersih(p)) && D.POIN_PENTING_SUARA.every((p) => tanpaDigit(p)), "poin penting: banyak, bersih, suara tanpa digit");
  const poin = D.POIN_PENTING.join(" ").toLowerCase();
  for (const m of ["timbangan", "gram", "kilogram", "angka nol", "satuan", "selisih", "mengurangkan", "mengangkat dan merasakan", "berat acuan", "cek angka nol", "benda ringan", "benda berat"]) cek(poin.includes(m), `poin penting memuat ${m}`);
  cek(tanpaDigit(D.PENUTUP_C) && bersih(D.PENUTUP_C) && /Dokter Hana/.test(D.PENUTUP_C) && /timbangan kodok/.test(D.PENUTUP_C) && /bandul/.test(D.PENUTUP_C) && D.PENUTUP_C.endsWith("?"), "penutup C: jembatan ke Sub-Bab D tanpa digit");
  cek(Object.values(D.TEMA_TIMBANG).every((t) => emojiSah(t.ikon) && t.nama.length >= 7 && t.cara.length > 20 && tanpaDigit(t.cara) && bersih(t.cara)), "tema tiga tahap sah");
  cek(D.TEMA_TIMBANG.pictorial.cara.includes("polos") && D.TEMA_TIMBANG.abstract.cara.includes("kartu"), "tema: Pictorial polos, Abstract kartu");
  cek(D.CONCRETE_TIMBANG === D.CONCRETE && D.PICTORIAL_TIMBANG === D.PICTORIAL && D.ABSTRACT_TIMBANG === D.ABSTRACT && D.MISI_TIMBANG_TEKS === DS.MISI_TIMBANG_TEKS, "nama ekspor untuk pemasang");
}

/* ------------------------------ Berkas ------------------------------ */
{
  const berkas = readdirSync(folderUrl).filter((f) => /\.(ts|tsx)$/.test(f));
  for (const nama of ["logika.ts", "data-sim.ts", "data-kartu.ts", "logika-cpa.ts", "data.ts", "periksa.ts", "JawabTimbang.tsx", "LangkahTimbang.tsx", "TahapTimbang.tsx", "SimulasiGudangTimbang.tsx", "KeranjangPakan.tsx", "CatatanBerat.tsx"]) cek(berkas.includes(nama), `berkas ${nama} ada`);
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folderUrl), "utf8");
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d || c.codePointAt(0) === 0x1f6de), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}/i.test(s), `${f}: kode emoji tidak melewati U+1FA95`);
    cek(!/\\u\{1FAB5\}|\\u\{1FA91\}/i.test(s) && !s.includes("\u{1FAB5}") && !s.includes("\u{1FA91}"), `${f}: tanpa emoji kayu dan kursi`);
    cek(!/buku|kelompok|bernilai|tebak/i.test(s), `${f}: tanpa kata buku, kelompok, bernilai, tebak`);
    if (/^(logika|logika-cpa|periksa|data|data-sim|data-kartu)\.ts$/.test(f)) cek(!/from "react"|fetch\(/.test(s), `${f}: tanpa React dan jaringan`);
    cek(!/turus-k2b8a|gambar-k2b8b|tempat-k3b1a|kartu-k3b1b|urut-k3b1c|tambah-k3b1d|kurang-k3b1e|kali-k3b1f|bagi-k3b1g|kayu-k3b2a|botol-k3b2b|SubBabK3B3/.test(s), `${f}: tidak memakai folder bab atau sub-bab lain`);
  }
  // Teks layar tidak memuat kata terlarang, termasuk nama berkas data.
  const layar = ["LangkahTimbang.tsx", "TahapTimbang.tsx", "SimulasiGudangTimbang.tsx"].map((f) => readFileSync(new URL(f, folderUrl), "utf8")).join("\n");
  const teksLayar = [...layar.matchAll(/>\s*([^<>{}\n]{4,})\s*</g)].map((m) => m[1]).join(" ");
  cek(!/\b(skor|nilai|soal|tebak|kunci|latihan|teman|kelompok|buku)\b/i.test(teksLayar), "teks layar komponen tanpa kata terlarang");
  cek(/\bTugas\b/.test(layar) && !/>\s*Soal/.test(layar), "teks layar CPA memakai Tugas");
  const th = readFileSync(new URL("TahapTimbang.tsx", folderUrl), "utf8");
  cek(/umum: Umum;\s*rupa: Rupa;\s*soal: SoalMisi\[\];\s*pita:/.test(th) && /teksAkhir: string/.test(th) && /poinPenting\?: boolean/.test(th), "TahapTimbang: props umum, rupa, soal, pita, teksAkhir, poinPenting");
  cek(/IKON_METODE\[ls\.metode\]/.test(th) && /rupa === "benda" \?/.test(th), "TahapTimbang: ikon metode hanya pada rupa benda (Pictorial dan Abstract tanpa emoji metode)");
  cek(/export default function TahapTimbang/.test(th) && /Cari kesalahan/.test(th) && /POIN_PENTING/.test(th) && /PENUTUP_C/.test(th), "TahapTimbang: ekspor, Cari kesalahan, Poin Penting, jembatan");
  cek(/"goni"/.test(th) && /"layar"/.test(th) && /"catatan"/.test(th) && !/"tikar"|"peta"|"papan"|"rak"|"kapur"|"nota"|"tirai"|"jepit"/.test(th), "TahapTimbang: pola visual karung goni, layar timbangan, catatan juru pakan (berbeda dari bab sebelumnya)");
  const lg = readFileSync(new URL("LangkahTimbang.tsx", folderUrl), "utf8");
  cek(/export function LangkahTimbang/.test(lg) && /JawabSuaraTimbang/.test(lg) && /JawabTulis/.test(lg) && /pilihanSuara\(l, cara\)/.test(lg), "LangkahTimbang: ekspor, jawab suara dengan pilihan ketuk, jawab tulis di kanvas");
  cek(/ucapkan\(/.test(lg), "LangkahTimbang: ucapan memakai kata, bukan digit");
  const jw = readFileSync(new URL("JawabTimbang.tsx", folderUrl), "utf8");
  cek(/gagalSekali/.test(jw) && /Ini jawaban yang benar|jawaban yang benar/.test(jw) && /PilihanKata/.test(jw) && /setCadangan\(true\)/.test(jw) && /e\.error === "not-allowed"/.test(jw) && !/capitalize/.test(jw), "JawabTimbang: galat mikrofon dihitung gagal, pilihan ketuk sebagai cadangan, jawaban benar setelah tiga kali salah, satuan tidak diubah huruf besar");
  const sim = readFileSync(new URL("SimulasiGudangTimbang.tsx", folderUrl), "utf8");
  cek(/export default function SimulasiGudangTimbang/.test(sim) && /onKeadaan/.test(sim) && /MISI_TIMBANG_TEKS/.test(sim), "SimulasiGudangTimbang: ekspor, onKeadaan, teks misi");
  for (const [f, nm] of [["KeranjangPakan.tsx", "KeranjangPakanK3B3"], ["CatatanBerat.tsx", "CatatanBeratK3B3"]]) {
    const s = readFileSync(new URL(f, folderUrl), "utf8");
    cek(/speakGuru/.test(s) && /onLanjut/.test(s) && /teksLanjut/.test(s) && /peta-kartu\//.test(s) && new RegExp(`export default function ${nm}`).test(s) && new RegExp(`export \\{ ${nm} \\}`).test(s), `${f}: pembungkus tipis komponen bersama peta-kartu, ekspor ${nm}`);
  }
  // Berkas bersama: Simulasi memasang Gudang Timbang.
  const sk = readFileSync(new URL("../src/components/modul/SimulasiK3Bab3.tsx", import.meta.url), "utf8");
  cek(/SimulasiGudangTimbang/.test(sk) && /laporMisiTimbang\(daftarMisiK3Bab3\("C"\), k, a\.capai\)/.test(sk) && !/judulBab=\{`Kelas/.test(sk), "SimulasiK3Bab3: langkahGudangTimbangC memasang Gudang Timbang, judul bab tanpa kata Kelas");
  // Berkas lama yang dipertahankan ada (dipakai bab lain dan bank soal).
  for (const f of ["data-k3b3.ts", "dasar-k3b3.tsx", "diagram-k3b3.tsx", "naskah-k3b3.ts", "video-k3b3-umum.tsx", "atur-k3b3.tsx", "eja-k3b3.ts"]) cek(readdirSync(new URL("../src/components/modul/", import.meta.url)).includes(f), `berkas lama ${f} dipertahankan`);
  const ej = readFileSync(new URL("../src/lib/ejaan-inggris-id.ts", import.meta.url), "utf8");
  cek(/hefting/i.test(ej) && /benchmark weights/i.test(ej) && /zero check/i.test(ej), "ejaan: tiga nama metode global ada");
}

console.log(`Lulus ${lulus}, gagal ${gagal}`);
process.exit(gagal ? 1 : 0);
