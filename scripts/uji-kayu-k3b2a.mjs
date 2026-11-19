// Uji Mind-map (Keranjang Kayu), Infografis (Papan Kayu), Simulasi Tumpukan Kayu, dan tahap Concrete, Pictorial, Abstract Kelas 3 Bab 2 Sub-Bab A ("Kayu untuk Api Unggun"),
// awal cerita Perkemahan Akhir Pekan (kalimat Matematika penjumlahan).
// Memeriksa: logika simulasi (tambah dengan tukar sepuluh jadi satu bundel otomatis, bagan, isi titik-titik di depan dan di tengah, periksa, dua rak dengan pasangan), misi (awal tidak memenuhi,
// wajib empat, bebas dua), keranjang kayu (sembilan kartu geser Masalah, Cara, Hasil memuat semua metode Story), papan kayu dari kejadian Story, CPA dua belas langkah per tahap
// (Klik, Kanvas, Suara x empat metode) dengan jawaban beragam dan Cari kesalahan di tiap tahap, kunci dihitung dari data, angka jawaban tidak kembar per tahap, tugas yang langsung siap
// (jebakan tombol macet), pengenal ucapan, petunjuk salah, batas rupa, emoji, kata terlarang, akhir baris.
// Jalankan: node --no-warnings scripts/uji-kayu-k3b2a.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/kayu-k3b2a/logika.ts");
const DS = await import("../src/components/modul/kayu-k3b2a/data-sim.ts");
const DK = await import("../src/components/modul/kayu-k3b2a/data-kartu.ts");
const LC = await import("../src/components/modul/kayu-k3b2a/logika-cpa.ts");
const D = await import("../src/components/modul/kayu-k3b2a/data.ts");
const K = await import("../src/components/modul/kayu-k3b2a/periksa.ts");
const S = await import("../src/components/modul/misi-simulasi.ts");
const MK = await import("../src/components/modul/misi-k3bab2.ts");
const MT = await import("../src/components/modul/misi-teks-k3b2.ts");
const folderUrl = new URL("../src/components/modul/kayu-k3b2a/", import.meta.url);

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
/** Bilangan yang dipakai Story A (jangan dijadikan data CPA atau Simulasi). */
const CERITA = new Set([30, 50, 20, 25, 60, 35, 100, 75, 40, 80, 18, 12, 28]);

/* ------------------------------ Kata bilangan ------------------------------ */
{
  sama([0, 1, 9, 10, 11, 15, 20, 38, 100].map(LC.kataBil), ["nol", "satu", "sembilan", "sepuluh", "sebelas", "lima belas", "dua puluh", "tiga puluh delapan", "seratus"], "kata bilangan CPA");
  cek(LC.kata === LC.kataBil, "alias kata");
  for (let n = 1; n <= 100; n += 1) cek(tanpaDigit(LC.kataBil(n)) && LC.kataBil(n) === L.kata(n), `kata bilangan ${n} sama di simulasi dan CPA`);
  sama([LC.ucapkan("37 + 53"), LC.ucapkan("24 + … = 41"), LC.ucapkan("titik-titik"), LC.ucapkan("60 − 25")], ["tiga puluh tujuh tambah lima puluh tiga", "dua puluh empat tambah titik-titik sama dengan empat puluh satu", "titik-titik", "enam puluh kurang dua puluh lima"], "ucapkan: digit dan tanda menjadi kata, tanda hubung kata tetap");
}

/* ------------------------------ Simulasi: data dan logika ------------------------------ */
{
  const semua = [...DS.TARGET_TAMBAH.flatMap((t) => [t.a, t.c]), ...DS.TARGET_BAGAN.flatMap((t) => [t.total, t.bagian]), ...DS.TARGET_ISI.flatMap((t) => [t.a, t.c]), ...DS.TARGET_PERIKSA.flatMap((t) => [t.a, t.u, t.c])];
  cek(semua.every((n) => n >= 1 && n <= 100 && !CERITA.has(n)), `simulasi: semua bilangan sampai seratus dan berbeda dari Story (${semua.filter((n) => CERITA.has(n))})`);
  cek(DS.TARGET_TAMBAH.length === 3 && DS.TARGET_TAMBAH.every((t) => t.c > t.a && t.c <= 100 && t.c - t.a >= 11), "simulasi: tiga sasaran tambah, perlu paling sedikit satu bundel");
  cek(DS.TARGET_TAMBAH.some((t) => t.c - t.a > 10 && (t.a % 10) + ((t.c - t.a) % 10) >= 10), "simulasi: ada sasaran yang menukar sepuluh batang lepas jadi satu bundel");
  cek(DS.TARGET_ISI.some((t) => t.depan) && DS.TARGET_ISI.some((t) => !t.depan), "simulasi: titik di depan dan di tengah");
  cek(DS.TARGET_PERIKSA.some((t) => t.a + t.u === t.c) && DS.TARGET_PERIKSA.some((t) => t.a + t.u !== t.c), "simulasi: periksa ada yang cocok dan ada yang tidak cocok");
  cek(DS.JUMLAH_RAK === 100 && DS.PASANGAN_CUKUP === 3, "simulasi: dua rak berjumlah seratus, tiga pasangan");
  cek(tanpaDigit(DS.MISI_KAYU_TEKS) && bersih(DS.MISI_KAYU_TEKS) && DS.MISI_KAYU_TEKS === MT.MISI_K3B2.A && D.MISI_KAYU_TEKS === DS.MISI_KAYU_TEKS && DS.MISI_KAYU_TEKS.length >= 10 && DS.MISI_KAYU_TEKS.length <= 120, "simulasi: teks misi tanpa digit dan kata terlarang, sama dengan misi-teks-k3b2");

  const a = L.awalKayu();
  cek(a.alat === "kayu" && a.mode === "tambah" && L.jumlahTumpukan(a) === 23 && !a.tukar && a.tambahBenar.length === 0 && a.baganBenar.length === 0 && a.isiBenar.length === 0 && a.periksaBenar.length === 0 && a.pasangan.length === 0, "simulasi: keadaan awal");
  // Tambah: sepuluh batang lepas menjadi satu bundel otomatis.
  let t = a;
  for (let i = 0; i < 6; i += 1) t = L.tambahSatu(t).k;
  cek(t.bundel === 2 && t.lepas === 9 && !t.tukar && L.jumlahTumpukan(t) === 29, "tambah: tujuh batang lepas belum ditukar");
  const r10 = L.tambahSatu(t);
  cek(r10.ok && r10.tukar && r10.k.bundel === 3 && r10.k.lepas === 0 && r10.k.tukar && L.jumlahTumpukan(r10.k) === 30, "tambah: batang kesepuluh langsung menjadi satu bundel");
  sama(S.misiBaru(MK.MISI_A, r10.k, new Set()), ["a-bundel"], "tambah: misi a-bundel");
  const b1 = L.tambahBundel(a);
  cek(b1.ok && !b1.tukar && b1.k.bundel === 3 && b1.k.lepas === 3 && !b1.k.tukar, "tambah: satu bundel penuh sepuluh batang");
  cek(!L.tambahBundel({ ...a, bundel: 9, lepas: 3 }).ok && !L.tambahSatu({ ...a, bundel: 10, lepas: 0 }).ok && L.tambahSatu({ ...a, bundel: 9, lepas: 8 }).ok, "tambah: tumpukan paling banyak seratus");
  // Periksa tumpukan.
  const salahT = L.periksaTambah(a);
  cek(!salahT.ok && salahT.k.salah === 1 && salahT.k.tambahBenar.length === 0 && /kurang/.test(L.petunjukTambah(a)) && tanpaDigit(L.petunjukTambah(a)), "tambah: tumpukan kurang dari papan dinyatakan keliru");
  cek(/melebihi/.test(L.petunjukTambah({ ...a, bundel: 6 })) && tanpaDigit(L.petunjukTambah({ ...a, bundel: 6 })), "tambah: petunjuk melebihi papan");
  let p = { ...a, bundel: 4, lepas: 7 };
  const bT = L.periksaTambah(p);
  cek(bT.ok && bT.k.tambahBenar.join() === "0" && bT.k.tambahKe === 1 && L.jumlahTumpukan(bT.k) === 38 && L.targetTambah(bT.k).c === 65, "tambah: tumpukan tepat membuka sasaran berikutnya dengan tumpukan awal baru");
  sama(S.misiBaru(MK.MISI_A, bT.k, new Set()), ["a-tambah"], "tambah: misi a-tambah");
  cek(L.jumlahTumpukan(L.ulangiTambah({ ...a, bundel: 6, lepas: 1 })) === 23, "tambah: ulangi kembali ke tumpukan awal sasaran");
  cek(tanpaDigit(L.kalimatTambah(a)) && tanpaDigit(L.kalimatTukarKayu()) && /Sepuluh jadi satu/.test(L.kalimatTukarKayu()) && L.kalimatTumpukan({ ...a, bundel: 2, lepas: 9 }) === "Dua bundel dan sembilan batang lepas. Tumpukan ada dua puluh sembilan batang." && tanpaDigit(L.kalimatTumpukan(a)), "tambah: kalimat tanpa digit");
  // Bagan.
  const tb = L.targetBagan(a);
  const pil = L.pilihanBagan(a);
  cek(tb.total === 71 && tb.bagian === 46 && pil.length === 3 && new Set(pil).size === 3 && pil.includes(25) && pil[0] !== 25 && pil.every((x) => x >= 1 && x <= 100), "bagan: tiga pilihan unik, yang benar bukan yang pertama");
  for (let i = 0; i < DS.TARGET_BAGAN.length; i += 1) {
    const k = { ...a, baganKe: i };
    const u = DS.TARGET_BAGAN[i].total - DS.TARGET_BAGAN[i].bagian;
    cek(L.pilihanBagan(k)[0] !== u && new Set(L.pilihanBagan(k)).size === 3 && L.pilihanBagan(k).includes(u), `bagan: pilihan sasaran ${i} unik dan benar bukan yang pertama`);
  }
  const salahB = L.periksaBagan(L.pilihBagan(a, pil.findIndex((x) => x !== 25)));
  cek(!salahB.ok && salahB.k.salah === 1 && /dikurangkan|mengurangkan/.test(L.petunjukBagan(L.pilihBagan(a, 0))) && tanpaDigit(L.petunjukBagan(L.pilihBagan(a, 0))), "bagan: bagian keliru");
  cek(/Pilih/.test(L.petunjukBagan(a)) && !L.periksaBagan(a).ok, "bagan: tanpa pilihan tidak benar");
  const bB = L.periksaBagan(L.pilihBagan(a, pil.indexOf(25)));
  cek(bB.ok && bB.k.baganBenar.join() === "0" && bB.k.baganKe === 1 && bB.k.baganPilih === -1, "bagan: bagian tepat membuka sasaran berikutnya");
  sama(S.misiBaru(MK.MISI_A, bB.k, new Set()), ["a-bagan"], "bagan: misi a-bagan");
  cek(L.pilihBagan(a, 7).baganPilih === -1 && tanpaDigit(L.kalimatBagan(bB.k)) && tanpaDigit(L.kalimatBagan(a)), "bagan: pilihan di luar daftar diabaikan");
  // Isi titik-titik di tengah dan di depan.
  const ti = L.targetIsi(a);
  const pi = L.pilihanIsi(a);
  cek(ti.a === 17 && ti.c === 52 && !ti.depan && pi.includes(35) && pi[0] !== 35 && new Set(pi).size === 3, "isi: sasaran pertama titik di tengah dengan tiga kartu");
  const salahI = L.periksaIsi(L.pilihIsi(a, pi.findIndex((x) => x !== 35)));
  cek(!salahI.ok && salahI.k.salah === 1 && tanpaDigit(L.petunjukIsi(L.pilihIsi(a, 0))) && /mengurangkan/.test(L.petunjukIsi(L.pilihIsi(a, 0))), "isi: kartu keliru");
  const bI = L.periksaIsi(L.pilihIsi(a, pi.indexOf(35)));
  cek(bI.ok && bI.k.isiBenar.join() === "0" && bI.k.isiKe === 1 && bI.k.tengahBenar && !bI.k.depanBenar, "isi: titik di tengah terisi tepat");
  sama(S.misiBaru(MK.MISI_A, bI.k, new Set()), ["a-isi"], "isi: misi a-isi");
  const kedua = { ...bI.k };
  const pi2 = L.pilihanIsi(kedua);
  const bI2 = L.periksaIsi(L.pilihIsi(kedua, pi2.indexOf(L.targetIsi(kedua).c - L.targetIsi(kedua).a)));
  cek(L.targetIsi(kedua).depan && bI2.ok && bI2.k.depanBenar && bI2.k.tengahBenar, "isi: titik di depan juga bisa terisi tepat");
  cek(tanpaDigit(L.kalimatIsi(bI.k)) && L.pilihIsi(a, 9).isiPilih === -1, "isi: kalimat tanpa digit, pilihan di luar daftar diabaikan");
  // Periksa.
  const tp = L.targetPeriksa(a);
  sama([tp.a, tp.u, tp.c, L.cocokPeriksa(tp.a, tp.u, tp.c), L.cocokPeriksa(44, 37, 82)], [29, 33, 62, true, false], "periksa: cocok dihitung dari penjumlahan");
  const salahP = L.periksaPeriksa(L.pilihPeriksa(a, 1));
  cek(!salahP.ok && salahP.k.salah === 1 && /Jumlahkan/.test(L.petunjukPeriksa(L.pilihPeriksa(a, 1))) && !L.periksaPeriksa(a).ok && /Jumlahkan dulu/.test(L.petunjukPeriksa(a)), "periksa: salah pilih dan tanpa pilihan");
  const bP = L.periksaPeriksa(L.pilihPeriksa(a, 0));
  cek(bP.ok && bP.k.periksaBenar.join() === "0" && bP.k.periksaKe === 1 && bP.k.periksaPilih === -1, "periksa: cocok dipilih tepat");
  sama(S.misiBaru(MK.MISI_A, bP.k, new Set()), ["a-periksa"], "periksa: misi a-periksa");
  const bP2 = L.periksaPeriksa(L.pilihPeriksa({ ...bP.k }, 1));
  cek(bP2.ok && bP2.k.periksaBenar.length === 2, "periksa: tidak cocok dipilih tepat untuk hasil yang keliru");
  cek(L.pilihPeriksa(a, 5).periksaPilih === -1 && tanpaDigit(L.kalimatPeriksa(bP.k)), "periksa: pilihan di luar daftar diabaikan");
  // Rak.
  cek(L.kananRak({ ...a, kiri: 35 }) === 65 && !L.geserKiri(a, -1).ok && !L.geserKiri({ ...a, kiri: 100 }, 1).ok && L.geserKiri(a, 10).k.kiri === 10, "rak: rak kanan ikut berubah, batas nol sampai seratus");
  cek(!L.catatPasangan(a).ok && L.catatPasangan(a).alasan === "kosong" && !L.catatPasangan({ ...a, kiri: 100 }).ok, "rak: rak kosong tidak dicatat");
  let r = L.catatPasangan({ ...a, kiri: 40 });
  cek(r.ok && r.k.pasangan.join() === "40" && !L.catatPasangan(r.k).ok && L.catatPasangan(r.k).alasan === "sudah", "rak: pasangan yang sama tidak dicatat dua kali");
  let k3 = a;
  for (const x of [10, 45, 90]) k3 = L.catatPasangan({ ...k3, kiri: x }).k;
  cek(k3.pasangan.join() === "10,45,90" && L.cukupPasangan(k3) && !L.cukupPasangan({ ...a, pasangan: [1, 2] }), "rak: tiga pasangan berbeda sudah cukup");
  sama(S.misiBaru(MK.MISI_A, k3, new Set()), ["a-rak"], "rak: misi a-rak");
  cek(tanpaDigit(L.kalimatRak(a)) && tanpaDigit(L.kalimatRak(k3)), "rak: kalimat tanpa digit");
  // Pengecoh dan mulai lagi.
  sama(L.pengecohKayu(24, 41), [65, 24], "pengecoh: jumlah dua bilangan dan bagian yang diketahui");
  cek(L.pengecohKayu(70, 95).every((x) => x !== 25 && x >= 1 && x <= 100) && L.pengecohKayu(70, 95).length === 2, "pengecoh: jumlah di atas seratus dibuang");
  cek(L.mulaiLagiKayu().tambahKe === 0 && L.jumlahTumpukan(L.mulaiLagiKayu()) === 23 && L.pilihModeKayu(a, "rak").mode === "rak", "mulai lagi dan ganti alat");
  // Misi.
  const A = MK.MISI_A;
  cek(A.filter((m) => m.wajib).length === 4 && A.filter((m) => !m.wajib).length === 2, "misi A: empat wajib, dua bebas");
  cek(new Set(A.map((m) => m.id)).size === 6 && A.every((m) => m.id.startsWith("a-") && m.teks.length >= 10 && m.teks.length <= 120 && tanpaDigit(m.teks) && bersih(m.teks)), "misi A: id berawalan a-, unik, 10 sampai 120 huruf, tanpa digit");
  sama(MK.daftarMisiK3Bab2("A"), A, "daftarMisiK3Bab2 A");
  cek(A.every((m) => !m.cek({ alat: "kerangka" })), "misi A: alat lain tidak memenuhi misi");
  sama(S.misiBaru(A, a, new Set()), [], "misi A: keadaan awal tanpa misi baru");
  cek(S.misiBaru(A, { ...a, salah: 9, mode: "isi", bundel: 9, lepas: 9, baganPilih: 1, isiPilih: 2, periksaPilih: 0, kiri: 40 }, new Set()).length === 0, "misi A: pilihan yang belum diperiksa dan benda di rak tidak dihitung sebagai misi");
}

/* ------------------------------ Mind-map: keranjang kayu (sembilan kartu geser) ------------------------------ */
{
  const KA = DK.KARTU_KAYU;
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
  for (const m of ["Bagan Batang", "Menghitung Maju", "Timbangan Seimbang", "Pakai titik-titik", "Depan atau tengah", "Jumlah dikurangi bagian", "Jumlahkan lagi", "Banyak pasangan"]) cek(cara.toLowerCase().includes(m.toLowerCase()), `kartu: cara memuat ${m}`);
  const gab = KA.map((k) => [k.judul, k.masalah.label, k.cara.label, k.hasil.label, k.masalah.arti, k.cara.arti, k.hasil.arti].join(" ")).join(" ").toLowerCase();
  for (const s of ["titik-titik", "kalimat matematika", "depan", "tengah", "mengurangkan", "jumlah semuanya", "bagian", "menjumlahkan", "banyak pasangan", "banyak kemungkinan", "lompat", "timbangan", "tanda sama dengan"]) cek(gab.includes(s), `kartu: memuat poin "${s}"`);
  cek(!new RegExp("\\b(raka|salsa|bima|pak joko|kak rina|pak darto|kayu|api unggun|biskuit|tenda)\\b", "i").test(gab), "kartu: hanya poin pelajaran (tanpa tokoh dan benda cerita)");
  cek(tanpaDigit(DK.SUARA_KARTU_KAYU + DK.SELESAI_KARTU_KAYU) && bersih(DK.SUARA_KARTU_KAYU + DK.SELESAI_KARTU_KAYU), "kartu: suara dan pesan selesai tanpa digit dan kata terlarang");
  cek(emojiSah(DK.TEMA_KARTU_KAYU.ikon) && DK.TEMA_KARTU_KAYU.judul.length > 5, "kartu: tema sah");
  const RG = DK.RINGKASAN_KAYU;
  cek(RG.ikon.length === DK.KARTU_KAYU.length && new Set(RG.ikon).size === RG.ikon.length && [...RG.ikon, RG.pusat].every((e) => emojiSah(e) && !/[A-Za-z0-9]/.test(e)), "peta radial: satu gambar unik per kartu, gambar sah tanpa huruf");
  cek(tanpaDigit(RG.suara) && bersih(RG.suara) && !RG.ikon.includes(RG.pusat), "peta radial: suara bersih dan pusat berbeda dari cabang");
}

/* ------------------------------ Infografis: papan kayu (satu tabel lima baris) ------------------------------ */
{
  const B = DK.BARIS_INFO_KAYU;
  cek(B.length === 5 && DK.KOLOM_INFO_KAYU.length === 3, "infografis: lima baris dan tiga kolom");
  cek(B.every((b) => b.isi.length === 3 && emojiSah(b.ikon) && b.nama.length > 4), "infografis: tiap baris tiga isian, emoji sah");
  const jumlahContoh = B.map((b) => b.contoh.length);
  cek(jumlahContoh[0] === 3 && jumlahContoh.slice(1).every((n) => n === 0), "infografis: baris satu penuh contoh, baris dua sampai lima mandiri");
  const semua = B.flatMap((b) => b.isi);
  cek(B.every((b) => new Set(b.isi.map((x) => x.t)).size === 3), "infografis: tiga label tiap baris berbeda");
  cek(new Set(semua.map((x) => x.t)).size === semua.length, "infografis: semua label unik");
  cek(semua.every((x) => x.t.length <= 28 && x.t.split(/\s+/).length <= 5 && bersih(x.t) && bersih(x.s ?? "")), "infografis: label pendek (paling banyak lima kata) dan tanpa kata terlarang");
  cek(semua.every((x) => tanpaDigit(x.s ?? x.t)), "infografis: ucapan label tanpa digit");
  const gab = B.map((b) => [b.nama, ...b.isi.map((x) => x.t)].join(" ")).join(" ").toLowerCase();
  for (const s of ["cerita dengan titik-titik", "mencari yang belum diketahui", "bagan batang", "memeriksa hasil", "banyak kemungkinan", "pakai titik-titik", "kalimat matematika", "jumlah dikurangi bagian", "bilangan ditemukan", "batang atas jumlah", "jumlahkan lagi", "hasil cocok", "banyak pasangan"]) cek(gab.includes(s), `infografis: memuat "${s}"`);
  cek(!new RegExp("\\b(raka|salsa|bima|pak joko|kak rina|pak darto)\\b", "i").test(gab), "infografis: tanpa nama tokoh");
  cek(tanpaDigit(DK.SUARA_INFO_KAYU + DK.SELESAI_INFO_KAYU) && bersih(DK.SUARA_INFO_KAYU + DK.SELESAI_INFO_KAYU) && emojiSah(DK.TEMA_INFO_KAYU.ikon), "infografis: suara dan tema bersih");
}

/* ------------------------------ Pengenal ucapan ------------------------------ */
{
  const nm = (nama) => ({ jenis: "nama", nama });
  const an = (n) => ({ jenis: "angka", n });
  for (const nama of ["jumlah", "bagian", "depan", "tengah", "akhir", "periksa"]) cek(K.cocokUcapan(nama, nm(nama)).cocok && K.kataDariUcapan(nama).length === 1, `cocok: kata ${nama} dikenali tepat satu`);
  sama(K.kataDariUcapan("di depan"), ["depan"], "ucapan: di depan berarti depan");
  sama(K.kataDariUcapan("bukan depan"), [], "ucapan: bukan depan tidak dihitung");
  sama(K.kataDariUcapan("halo"), [], "ucapan: kata lain tidak dikenali");
  cek(!K.cocokUcapan("depan", nm("tengah")).cocok && !K.cocokUcapan("jumlah", nm("bagian")).cocok, "cocok: kata berbeda tidak cocok");
  sama(K.angkaDariUcapan("lima"), [5], "angka: lima");
  sama(K.angkaDariUcapan("sembilan, 4 dan tiga"), [9, 4, 3], "angka: satuan dan angka tertulis");
  sama(K.angkaDariUcapan("lima belas"), [15], "angka: lima belas");
  sama(K.angkaDariUcapan("dua puluh dua"), [22], "angka: dua puluh dua");
  sama(K.angkaDariUcapan("tiga puluh tujuh"), [37], "angka: tiga puluh tujuh");
  sama(K.angkaDariUcapan("seratus"), [100], "angka: seratus");
  sama(K.angkaDariUcapan("sembilan puluh"), [90], "angka: sembilan puluh");
  sama(K.angkaDariUcapan("37"), [37], "angka: 37 tertulis");
  sama(K.angkaDariUcapan("nol"), [0], "angka: nol");
  for (let n = 1; n <= 100; n += 1) cek(K.angkaDariUcapan(LC.kataBil(n)).join() === String(n), `angka: kata bilangan ${n} dikenali utuh (${LC.kataBil(n)} -> ${K.angkaDariUcapan(LC.kataBil(n))})`);
  cek(K.cocokUcapan("lima", an(5)).cocok && K.cocokUcapan("5", an(5)).cocok && !K.cocokUcapan("enam", an(5)).cocok, "cocok: kunci angka lima");
  cek(K.cocokUcapan("dua puluh enam", an(26)).cocok && !K.cocokUcapan("dua puluh enam", an(6)).cocok && !K.cocokUcapan("tiga puluh enam", an(26)).cocok, "cocok: bilangan dua angka dikenali utuh");
}

/* ------------------------------ CPA ------------------------------ */
const TAHAP = { Concrete: ["benda", D.CONCRETE], Pictorial: ["diagram", D.PICTORIAL], Abstract: ["lambang", D.ABSTRACT] };
const CARA = ["klik", "kanvas", "suara"];
const METODE = ["igil", "bagan", "maju", "timbang"];
const semuaTeksLangkah = (ls, rupa, cara) => [ls.judul, ls.suara, LC.instruksi(ls.langkah, rupa, cara, ls.metode), LC.kalimatTanya(ls.langkah, cara), LC.kalimatKunci(ls.langkah, cara), LC.petunjukSalah(ls.langkah, cara, 1)];
{
  sama(LC.URUT_METODE, METODE, "urutan metode");
  cek(LC.NAMA_METODE.igil.includes("Kurangi Jumlah, Periksa Jumlahnya") && LC.NAMA_METODE.bagan.includes("Bar Model") && LC.NAMA_METODE.maju.includes("Counting On") && LC.NAMA_METODE.timbang.includes("Balance Scale"), "nama metode IGIL dan tiga metode global");
  cek(METODE.every((m) => emojiSah(LC.IKON_METODE[m])), "ikon metode sah");
  let nomor = 2;
  for (const [nama, [rupa, soal]] of Object.entries(TAHAP)) {
    cek(soal.length === 3 && soal.map((s) => s.cara).join() === CARA.join(), `${nama}: tiga misi Klik, Kanvas, Suara`);
    cek(soal.every((s) => s.langkah.length === 4 && s.langkah.map((l) => l.metode).join() === METODE.join()), `${nama}: empat langkah per misi (IGIL, Bar Model, Counting On, Balance Scale)`);
    for (const s of soal) {
      cek(s.nomor === nomor, `${nama}: nomor misi berlanjut ${nomor}`);
      nomor += 1;
      cek(s.judul.startsWith("Misi Kayu") && s.cerita.length > 15 && bersih(s.judul) && bersih(s.cerita), `${nama} ${s.nomor}: judul dan cerita sah`);
      for (const ls of s.langkah) {
        cek(ls.cara === s.cara, `${nama} ${s.nomor}: cara langkah sama dengan misi`);
        const teks = semuaTeksLangkah(ls, rupa, s.cara);
        cek(teks.every((t) => tanpaDigit(t) && bersih(t)), `${nama} ${s.nomor} ${ls.metode}: teks tanpa digit dan kata terlarang (${teks.find((t) => !tanpaDigit(t) || !bersih(t)) ?? ""})`);
        cek(emojiSah(teks.join("")), `${nama} ${s.nomor} ${ls.metode}: emoji sah`);
        cek(ls.judul === ls.suara && ls.judul === LC.instruksi(ls.langkah, rupa, s.cara, ls.metode), `${nama} ${s.nomor} ${ls.metode}: judul dan suara sama dengan instruksi`);
        // Batas rupa: Pictorial dan Abstract tanpa emoji benda di teks tugas.
        if (rupa !== "benda") cek(!adaEmoji(teks.join(" ")), `${nama} ${s.nomor} ${ls.metode}: teks tugas tanpa emoji (batas rupa)`);
        cek(/Metode IGIL|Bar Model|Counting On|Balance Scale|sudah menjawab/.test(ls.judul), `${nama} ${s.nomor} ${ls.metode}: judul tugas memuat nama metode`);
      }
    }
    // Cari kesalahan di tiap tahap, di tugas klik IGIL.
    const salahL = soal.flatMap((s) => s.langkah.filter((l) => l.langkah.tipe === "salah"));
    cek(salahL.length === 1 && soal[0].langkah[0].langkah.tipe === "salah", `${nama}: satu Cari kesalahan, di Klik IGIL`);
    for (const l of salahL) {
      const x = l.langkah;
      cek(x.alasan.length === 3 && new Set(x.alasan).size === 3 && x.benar >= 0 && x.benar <= 2 && x.keliru.length > 20 && x.kataTokoh.length > 15 && ["Raka", "Salsa", "Bima"].includes(x.tokoh), `${nama}: Cari kesalahan lengkap`);
      cek(tanpaDigit(x.kataTokoh + x.alasan.join(" ") + x.keliru) && bersih(x.kataTokoh + x.alasan.join(" ") + x.keliru), `${nama}: Cari kesalahan tanpa digit dan kata terlarang`);
      const pil = LC.pilihanKlik(x);
      cek(pil.length === 3 && new Set(pil).size === 3 && pil.includes(String(x.jawabTokoh)), `${nama}: pilihan klik Cari kesalahan memuat jawaban tokoh (${pil.join("/")})`);
      const kunci = LC.kunciJawab(x, "klik");
      cek(kunci !== null && kunci.jenis === "angka", `${nama}: jawaban sendiri berupa bilangan`);
      if (x.betul) cek(String(kunci.n) === String(x.jawabTokoh), `${nama}: jawaban tokoh yang benar sama dengan kunci`);
      else cek(String(kunci.n) !== String(x.jawabTokoh), `${nama}: jawaban benar berbeda dari jawaban tokoh`);
      cek(LC.petunjukSalah(x, "klik", x.jawabTokoh).startsWith(`Itu jawaban ${x.tokoh}`) || x.betul === true, `${nama}: petunjuk menjelaskan kesalahan tokoh`);
    }
  }
  cek(nomor === 11, "nomor misi berlanjut sampai sepuluh");
  const dasarSalah = Object.values(TAHAP).map(([, soal]) => soal[0].langkah[0].langkah.dasar.tipe);
  sama(dasarSalah, ["kal", "bagan", "kal"], "Cari kesalahan: kalimat (Concrete), bagan (Pictorial), kalimat titik di depan (Abstract)");
  cek(D.PICTORIAL[0].langkah[0].langkah.betul === true && !D.CONCRETE[0].langkah[0].langkah.betul && !D.ABSTRACT[0].langkah[0].langkah.betul, "Cari kesalahan: satu jawaban tokoh benar (Pictorial), dua keliru");
  // Batas isi tiap tugas: bilangan sampai seratus, berbeda dari Story.
  for (const [nama, [, soal]] of Object.entries(TAHAP))
    for (const s of soal)
      for (const ls of s.langkah) {
        const d = LC.dasarDari(ls.langkah);
        const tag = `${nama} ${s.nomor} ${ls.metode}`;
        const angka = d.tipe === "kal" || d.tipe === "timbang" ? [d.a, d.c] : d.tipe === "bagan" ? [d.total, d.bagian] : d.tipe === "maju" ? [d.dari, d.ke] : [d.jumlah, d.a];
        cek(angka.every((n) => n >= 1 && n <= 100 && !CERITA.has(n)), `${tag}: bilangan sampai seratus dan berbeda dari Story (${angka})`);
        const u = LC.belumDiketahui(d);
        cek(u >= 1 && u <= 99 && !CERITA.has(u) || d.tipe === "kira", `${tag}: bilangan yang belum diketahui sah (${u})`);
        if (d.tipe === "kal" || d.tipe === "timbang") cek(d.c <= 100 && d.c > d.a, `${tag}: jumlah lebih besar dari bagian dan tidak melebihi seratus`);
        if (d.tipe === "bagan") cek(d.total > d.bagian, `${tag}: bagan jumlah lebih besar dari bagian`);
        if (d.tipe === "maju") cek(d.ke > d.dari && d.dari % 10 !== 0 && d.ke - d.dari >= 2, `${tag}: garis bilangan maju, awal bukan puluhan penuh`);
        if (d.tipe === "kira") cek(d.jumlah <= 100 && d.jumlah - d.a >= 11 && LC.pasangan(d).every((p) => { const [x, y] = p.split(" + ").map(Number); return x + y <= 100 && y >= 1; }), `${tag}: banyak kemungkinan, pasangan sampai seratus`);
        if (d.tipe === "kira") cek(s.cara === "klik", `${tag}: banyak kemungkinan hanya pada Klik`);
      }
  // Tiap metode global tampak di tiap tahap, dan titik di depan serta di tengah.
  for (const [nama, [, soal]] of Object.entries(TAHAP)) {
    const tipe = new Set(soal.flatMap((s) => s.langkah.map((l) => LC.dasarDari(l.langkah).tipe)));
    cek(["kal", "bagan", "maju"].every((t) => tipe.has(t)) && (tipe.has("timbang") || tipe.has("kira")), `${nama}: kalimat, bagan, garis bilangan, dan timbangan ada`);
    const kals = soal.flatMap((s) => s.langkah.map((l) => LC.dasarDari(l.langkah))).filter((d) => d.tipe === "kal");
    cek(kals.some((d) => d.depan) && kals.some((d) => !d.depan), `${nama}: titik-titik di depan dan di tengah`);
  }
}

/* ------------------------------ Tugas dihitung dari data ------------------------------ */
{
  const nama = (k) => (k ? (k.jenis === "nama" ? k.nama : k.n) : null);
  // Kunci tiap jenis tugas dihitung dari data.
  sama(["klik", "kanvas", "suara"].map((c) => nama(LC.kunciJawab({ tipe: "kal", a: 17, c: 24, depan: true }, c))), [7, 7, 7], "kunci kal: c dikurangi a");
  sama(["isi", "periksa", "letak"].map((t) => nama(LC.kunciJawab({ tipe: "kal", a: 31, c: 57, depan: false, tanya: t }, "suara"))), [26, 57, "tengah"], "kunci kal suara: isi, periksa, letak");
  sama(nama(LC.kunciJawab({ tipe: "kal", a: 19, c: 63, depan: true, tanya: "letak" }, "suara")), "depan", "kunci kal letak depan");
  sama(["klik", "kanvas", "suara"].map((c) => nama(LC.kunciJawab({ tipe: "bagan", total: 62, bagian: 58, sorot: "bagian" }, c))), [4, 4, "bagian"], "kunci bagan: bagian dan nama batang");
  sama(nama(LC.kunciJawab({ tipe: "bagan", total: 86, bagian: 52 }, "suara")), "jumlah", "kunci bagan: batang atas jumlah (bawaan)");
  sama(["klik", "kanvas", "suara"].map((c) => nama(LC.kunciJawab({ tipe: "maju", dari: 54, ke: 63 }, c))), [9, 6, 9], "kunci maju: seluruhnya dan lompatan pertama ke puluhan");
  sama(["klik", "kanvas", "suara"].map((c) => nama(LC.kunciJawab({ tipe: "timbang", a: 36, c: 45 }, c))), [9, 9, 9], "kunci timbang");
  sama([nama(LC.kunciJawab({ tipe: "kira", jumlah: 90, a: 37 }, "klik")), LC.kunciJawab({ tipe: "kira", jumlah: 90, a: 37 }, "kanvas"), LC.kunciJawab({ tipe: "kira", jumlah: 90, a: 37 }, "suara")], ["37 + 53", null, null], "kunci kira: pasangan, hanya klik");
  sama([LC.puluhanBerikut(54), LC.puluhanBerikut(60), LC.puluhanBerikut(9)], [60, 70, 10], "puluhan terdekat di atas");
  sama(LC.pasangan({ tipe: "kira", jumlah: 90, a: 37 }), ["37 + 53", "37 + 63", "37 + 43"], "pasangan benar dan dua pengecoh");
  // Pengecoh.
  sama(LC.pengecoh({ tipe: "kal", a: 24, c: 41, depan: false }).slice(0, 3), [65, 24, 41], "pengecoh kal: jumlah dua bilangan lebih dulu");
  cek(LC.pengecoh({ tipe: "kal", a: 70, c: 95, depan: false }).every((x) => x !== 25 && x >= 1 && x <= 100), "pengecoh: tidak melebihi seratus dan bukan kunci");
  sama(LC.pengecoh({ tipe: "kal", a: 24, c: 41, depan: false }, 99).slice(0, 2), [99, 65], "pengecoh dengan jawaban tokoh di depan");

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
          if (s.cara === "klik") cek(kunci.n >= 1 && kunci.n <= 99, `${namaT} ${s.nomor} ${ls.metode}: jawaban klik bilangan sampai seratus`);
        }
        if (kunci?.jenis === "nama" && s.cara === "suara") cek(!/\s/.test(kunci.nama) && tanpaDigit(kunci.nama), `${namaT} ${s.nomor} ${ls.metode}: kunci nama satu kata pada suara`);
        if (kunci?.jenis === "nama" && s.cara === "klik") cek(d.tipe === "kira" && /^\d+ \+ \d+$/.test(kunci.nama), `${namaT} ${s.nomor} ${ls.metode}: kunci nama pada klik hanya pasangan`);
        // Pilihan klik: tiga pilihan unik, jawaban benar tidak di tombol pertama.
        if (s.cara === "klik" && kunci !== null) {
          const pil = LC.pilihanKlik(l);
          const benar = kunci.jenis === "angka" ? String(kunci.n) : kunci.nama;
          cek(pil.length === 3 && new Set(pil).size === 3 && pil.includes(benar) && pil[0] !== benar, `${namaT} ${s.nomor} ${ls.metode}: pilihan klik unik dan jawaban benar bukan yang pertama (${pil.join("/")})`);
          if (kunci.jenis === "angka") cek(pil.every((p) => /^\d{1,3}$/.test(p) && Number(p) >= 1 && Number(p) <= 100), `${namaT} ${s.nomor}: pilihan bilangan sah (${pil.join("/")})`);
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
  sama(TAHAP.Concrete[1].filter((s) => s.cara === "kanvas").flatMap((s) => s.langkah.map((l) => LC.kunciJawab(l.langkah, "kanvas").n)), [7, 4, 6, 9], "angka kanvas Concrete");
  sama(TAHAP.Pictorial[1].filter((s) => s.cara === "kanvas").flatMap((s) => s.langkah.map((l) => LC.kunciJawab(l.langkah, "kanvas").n)), [7, 4, 2, 9], "angka kanvas Pictorial");
  sama(TAHAP.Abstract[1].filter((s) => s.cara === "kanvas").flatMap((s) => s.langkah.map((l) => LC.kunciJawab(l.langkah, "kanvas").n)), [6, 5, 3, 8], "angka kanvas Abstract");
  // Soal suara bervariasi: kata (letak, nama batang) dan bilangan.
  const suaraJenis = Object.values(TAHAP).flatMap(([, soal]) => soal[2].langkah.map((l) => LC.kunciJawab(l.langkah, "suara").jenis));
  cek(suaraJenis.includes("nama") && suaraJenis.includes("angka"), "tugas suara: kata dan bilangan");
  // Poin penting dan penutup.
  cek(D.POIN_PENTING.length >= 6 && D.POIN_PENTING.every((p) => p.length > 20 && bersih(p)) && D.POIN_PENTING_SUARA.every((p) => tanpaDigit(p)), "poin penting: banyak, bersih, suara tanpa digit");
  const poin = D.POIN_PENTING.join(" ").toLowerCase();
  for (const m of ["titik-titik", "depan", "tengah", "mengurangkan jumlah semuanya", "bagan", "menjumlahkan", "banyak kemungkinan", "bagan batang", "menghitung maju", "timbangan seimbang"]) cek(poin.includes(m), `poin penting memuat ${m}`);
  cek(tanpaDigit(D.PENUTUP_A) && bersih(D.PENUTUP_A) && /Pak Darto/.test(D.PENUTUP_A) && /botol/.test(D.PENUTUP_A) && D.PENUTUP_A.endsWith("?"), "penutup A: jembatan ke Sub-Bab B tanpa digit");
  cek(Object.values(D.TEMA_KAYU).every((t) => emojiSah(t.ikon) && t.nama.length >= 7 && t.cara.length > 20 && tanpaDigit(t.cara) && bersih(t.cara)), "tema tiga tahap sah");
  cek(D.TEMA_KAYU.pictorial.cara.includes("polos") && D.TEMA_KAYU.abstract.cara.includes("kartu"), "tema: Pictorial polos, Abstract kartu");
  cek(D.CONCRETE_KAYU === D.CONCRETE && D.PICTORIAL_KAYU === D.PICTORIAL && D.ABSTRACT_KAYU === D.ABSTRACT && D.MISI_KAYU_TEKS === DS.MISI_KAYU_TEKS, "nama ekspor untuk pemasang");
}

/* ------------------------------ Berkas ------------------------------ */
{
  const berkas = readdirSync(folderUrl).filter((f) => /\.(ts|tsx)$/.test(f));
  for (const nama of ["logika.ts", "data-sim.ts", "data-kartu.ts", "logika-cpa.ts", "data.ts", "periksa.ts", "JawabKayu.tsx", "LangkahKayu.tsx", "TahapKayu.tsx", "SimulasiTumpukanKayu.tsx", "KeranjangKayu.tsx", "PapanKayu.tsx"]) cek(berkas.includes(nama), `berkas ${nama} ada`);
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folderUrl), "utf8");
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d || c.codePointAt(0) === 0x1f6de), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}/i.test(s), `${f}: kode emoji tidak melewati U+1FA95`);
    cek(!/buku|kelompok|bernilai|tebak/i.test(s), `${f}: tanpa kata buku, kelompok, bernilai, tebak`);
    if (/^(logika|logika-cpa|periksa|data|data-sim|data-kartu)\.ts$/.test(f)) cek(!/from "react"|fetch\(/.test(s), `${f}: tanpa React dan jaringan`);
    cek(!/turus-k2b8a|gambar-k2b8b|tempat-k3b1a|kartu-k3b1b|urut-k3b1c|tambah-k3b1d|kurang-k3b1e|kali-k3b1f|bagi-k3b1g|botol-k3b2b|SubBabK3B2/.test(s), `${f}: tidak memakai folder bab atau sub-bab lain`);
  }
  // Teks layar tidak memuat kata terlarang, termasuk nama berkas data.
  const layar = ["LangkahKayu.tsx", "TahapKayu.tsx", "SimulasiTumpukanKayu.tsx"].map((f) => readFileSync(new URL(f, folderUrl), "utf8")).join("\n");
  const teksLayar = [...layar.matchAll(/>\s*([^<>{}\n]{4,})\s*</g)].map((m) => m[1]).join(" ");
  cek(!/\b(skor|nilai|soal|tebak|kunci|latihan|teman|kelompok|buku)\b/i.test(teksLayar), "teks layar komponen tanpa kata terlarang");
  cek(/\bTugas\b/.test(layar) && !/>\s*Soal/.test(layar), "teks layar CPA memakai Tugas");
  const th = readFileSync(new URL("TahapKayu.tsx", folderUrl), "utf8");
  cek(/umum: Umum;\s*rupa: Rupa;\s*soal: SoalMisi\[\];\s*pita:/.test(th) && /teksAkhir: string/.test(th) && /poinPenting\?: boolean/.test(th), "TahapKayu: props umum, rupa, soal, pita, teksAkhir, poinPenting");
  cek(/IKON_METODE\[ls\.metode\]/.test(th) && /rupa === "benda" \?/.test(th), "TahapKayu: ikon metode hanya pada rupa benda (Pictorial dan Abstract tanpa emoji metode)");
  cek(/export default function TahapKayu/.test(th) && /Cari kesalahan/.test(th) && /POIN_PENTING/.test(th) && /PENUTUP_A/.test(th), "TahapKayu: ekspor, Cari kesalahan, Poin Penting, jembatan");
  cek(/"tikar"/.test(th) && /"peta"/.test(th) && /"papan"/.test(th) && !/"rak"|"kapur"|"nota"|"tirai"|"jepit"|"catatan"/.test(th), "TahapKayu: pola visual tikar kemah, peta kemah, papan pengumuman (berbeda dari bab sebelumnya)");
  const lg = readFileSync(new URL("LangkahKayu.tsx", folderUrl), "utf8");
  cek(/export function LangkahKayu/.test(lg) && /JawabSuaraKayu/.test(lg) && /JawabTulis/.test(lg) && /pilihanSuara\(l, cara\)/.test(lg), "LangkahKayu: ekspor, jawab suara dengan pilihan ketuk, jawab tulis di kanvas");
  cek(/ucapkan\(/.test(lg), "LangkahKayu: ucapan memakai kata, bukan digit");
  const jw = readFileSync(new URL("JawabKayu.tsx", folderUrl), "utf8");
  cek(/gagalSekali/.test(jw) && /Ini jawaban yang benar|jawaban yang benar/.test(jw) && /PilihanKata/.test(jw) && /setCadangan\(true\)/.test(jw) && /e\.error === "not-allowed"/.test(jw), "JawabKayu: galat mikrofon dihitung gagal, pilihan ketuk sebagai cadangan, jawaban benar setelah tiga kali salah");
  const sim = readFileSync(new URL("SimulasiTumpukanKayu.tsx", folderUrl), "utf8");
  cek(/export default function SimulasiTumpukanKayu/.test(sim) && /onKeadaan/.test(sim) && /MISI_KAYU_TEKS/.test(sim), "SimulasiTumpukanKayu: ekspor, onKeadaan, teks misi");
  for (const [f, nm] of [["KeranjangKayu.tsx", "KeranjangKayuK3B2"], ["PapanKayu.tsx", "PapanKayuK3B2"]]) {
    const s = readFileSync(new URL(f, folderUrl), "utf8");
    cek(/speakGuru/.test(s) && /onLanjut/.test(s) && /teksLanjut/.test(s) && /peta-kartu\//.test(s) && new RegExp(`export default function ${nm}`).test(s) && new RegExp(`export \\{ ${nm} \\}`).test(s), `${f}: pembungkus tipis komponen bersama peta-kartu, ekspor ${nm}`);
  }
  // Berkas bersama: Simulasi memasang Tumpukan Kayu.
  const sk = readFileSync(new URL("../src/components/modul/SimulasiK3Bab2.tsx", import.meta.url), "utf8");
  cek(/SimulasiTumpukanKayu/.test(sk) && /laporMisiKayu\(daftarMisiK3Bab2\("A"\), k, a\.capai\)/.test(sk) && !/judulBab=\{`Kelas/.test(sk), "SimulasiK3Bab2: langkahTumpukanKayuA memasang Tumpukan Kayu, judul bab tanpa kata Kelas");
  // Berkas lama yang dipertahankan ada (dipakai bab lain dan bank soal).
  for (const f of ["data-k3b2.ts", "dasar-k3b2.tsx", "naskah-k3b2.ts", "diagram-k3b2.tsx", "video-k3b2-umum.tsx"]) cek(readdirSync(new URL("../src/components/modul/", import.meta.url)).includes(f), `berkas lama ${f} dipertahankan`);
  const ej = readFileSync(new URL("../src/lib/ejaan-inggris-id.ts", import.meta.url), "utf8");
  cek(/bar model/i.test(ej) && /counting on/i.test(ej) && /balance scale/i.test(ej), "ejaan: tiga nama metode global ada");
}

console.log(`Lulus ${lulus}, gagal ${gagal}`);
process.exit(gagal ? 1 : 0);
